import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const PORT = Number(process.env.PORT || 3000);
const WHATSAPP_NUMBER = String(process.env.WHATSAPP_NUMBER || "2347035628526").replace(/\D/g, "");
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(ROOT, "data");

fs.mkdirSync(DATA_DIR, { recursive: true });

const VISITS_FILE = path.join(DATA_DIR, "visits.json");
const RSVPS_FILE = path.join(DATA_DIR, "rsvps.json");

function readJson(file, fallback) {
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

const visits = readJson(VISITS_FILE, []);
const rsvps = readJson(RSVPS_FILE, []);

const writeQueues = new Map();
function persist(file, data) {
  const previous = writeQueues.get(file) || Promise.resolve();
  const next = previous
    .catch(() => {})
    .then(async () => {
      const temp = `${file}.${process.pid}.tmp`;
      await fs.promises.writeFile(temp, JSON.stringify(data, null, 2));
      await fs.promises.rename(temp, file);
    });
  writeQueues.set(file, next);
  return next.catch((error) => console.error(`Could not persist ${file}`, error));
}

function trim(list, max = 5000) {
  if (list.length > max) list.splice(0, list.length - max);
}

function readOrCreateSecret(file, bytes = 32) {
  try {
    return fs.readFileSync(file, "utf8").trim();
  } catch {
    const value = crypto.randomBytes(bytes).toString("hex");
    fs.writeFileSync(file, value, { mode: 0o600 });
    return value;
  }
}

const ADMIN_SECRET =
  process.env.ADMIN_SECRET || readOrCreateSecret(path.join(DATA_DIR, "admin-secret"));

let generatedAdminPassword = false;
let adminPassword = process.env.ADMIN_PASSWORD || "";
if (!adminPassword) {
  const passwordFile = path.join(DATA_DIR, "admin-password.txt");
  try {
    adminPassword = fs.readFileSync(passwordFile, "utf8").trim();
  } catch {
    adminPassword = crypto.randomBytes(9).toString("base64url");
    fs.writeFileSync(passwordFile, `${adminPassword}\n`, { mode: 0o600 });
    generatedAdminPassword = true;
  }
}

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(express.json({ limit: "40kb" }));

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  return String(
    req.headers["cf-connecting-ip"] ||
      (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0]) ||
      req.socket.remoteAddress ||
      ""
  ).trim();
}

function ipHash(req) {
  return crypto.createHash("sha256").update(`${clientIp(req)}|${ADMIN_SECRET}`).digest("hex").slice(0, 20);
}

function clean(value, max = 300) {
  return String(value ?? "").trim().slice(0, max);
}

app.post("/api/visit", (req, res) => {
  const body = req.body || {};
  const visitorId = clean(body.visitorId, 120);
  if (!visitorId) return res.status(400).json({ error: "Missing visitor id" });

  const visit = {
    id: crypto.randomUUID(),
    visitorId,
    path: clean(body.path, 300) || "/",
    referrer: clean(body.referrer, 500),
    title: clean(body.title, 200),
    language: clean(body.language, 30),
    timezone: clean(body.timezone, 60),
    screen: clean(body.screen, 40),
    viewport: clean(body.viewport, 40),
    utm: {
      source: clean(body.utm?.source, 120),
      medium: clean(body.utm?.medium, 120),
      campaign: clean(body.utm?.campaign, 120),
    },
    userAgent: clean(req.headers["user-agent"], 500),
    ipHash: ipHash(req),
    createdAt: new Date().toISOString(),
  };

  visits.push(visit);
  trim(visits);
  persist(VISITS_FILE, visits);
  res.status(202).json({ ok: true });
});

app.post("/api/rsvp", (req, res) => {
  const body = req.body || {};
  const name = clean(body.name, 120);
  if (!name) return res.status(400).json({ error: "Name is required" });

  const attending = body.attending === "no" ? "no" : "yes";
  const guests = Math.min(20, Math.max(1, Number.parseInt(body.guests, 10) || 1));

  const rsvp = {
    id: crypto.randomUUID(),
    name,
    contact: clean(body.contact, 200),
    attending,
    guests,
    note: clean(body.note, 600),
    visitorId: clean(body.visitorId, 120),
    userAgent: clean(req.headers["user-agent"], 500),
    ipHash: ipHash(req),
    submittedAt: new Date().toISOString(),
  };

  rsvps.push(rsvp);
  trim(rsvps);
  persist(RSVPS_FILE, rsvps);
  res.status(201).json({ ok: true, id: rsvp.id });
});

function parseCookies(header = "") {
  return Object.fromEntries(
    header
      .split(";")
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf("=");
        return index === -1 ? [part, ""] : [decodeURIComponent(part.slice(0, index)), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

function makeToken() {
  const expires = Date.now() + 1000 * 60 * 60 * 12;
  const signature = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(String(expires))
    .digest("base64url");
  return `${expires}.${signature}`;
}

function isAdmin(req) {
  const token = parseCookies(req.headers.cookie || "").ijeoma_admin;
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < Date.now()) return false;
  const expected = crypto
    .createHmac("sha256", ADMIN_SECRET)
    .update(String(expires))
    .digest("base64url");
  try {
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
  } catch {
    return false;
  }
}

function adminCookie(req) {
  const secure = req.secure || req.headers["x-forwarded-proto"] === "https";
  return `ijeoma_admin=${makeToken()}; Path=/; HttpOnly; SameSite=Strict; Max-Age=43200${secure ? "; Secure" : ""}`;
}

const loginAttempts = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.reset) {
    loginAttempts.set(ip, { count: 0, reset: now + 15 * 60 * 1000 });
    return false;
  }
  return entry.count >= 8;
}
function recordFailure(ip) {
  const entry = loginAttempts.get(ip) || { count: 0, reset: Date.now() + 15 * 60 * 1000 };
  entry.count += 1;
  loginAttempts.set(ip, entry);
}

app.post("/api/admin/login", (req, res) => {
  const ip = clientIp(req) || "unknown";
  if (rateLimited(ip)) return res.status(429).json({ error: "Too many attempts. Try again later." });
  const candidate = String(req.body?.password || "");
  const expected = Buffer.from(adminPassword);
  const supplied = Buffer.from(candidate);
  const matches =
    supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
  if (!matches) {
    recordFailure(ip);
    return res.status(401).json({ error: "Incorrect password" });
  }
  loginAttempts.delete(ip);
  res.setHeader("Set-Cookie", adminCookie(req));
  res.json({ ok: true });
});

app.post("/api/admin/logout", (req, res) => {
  res.setHeader("Set-Cookie", "ijeoma_admin=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0");
  res.json({ ok: true });
});

app.get("/api/admin/session", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.json({ authenticated: isAdmin(req) });
});

function requireAdmin(req, res, next) {
  if (!isAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
  next();
}

app.get("/api/admin/data", requireAdmin, (req, res) => {
  const uniqueVisitors = new Set(visits.map((visit) => visit.visitorId)).size;
  const yes = rsvps.filter((rsvp) => rsvp.attending === "yes");
  const stats = {
    pageViews: visits.length,
    uniqueVisitors,
    rsvps: rsvps.length,
    attendingYes: yes.length,
    attendingNo: rsvps.length - yes.length,
    guestCount: yes.reduce((sum, rsvp) => sum + (Number(rsvp.guests) || 1), 0),
    lastVisit: visits[visits.length - 1]?.createdAt || null,
    lastRsvp: rsvps[rsvps.length - 1]?.submittedAt || null,
  };
  res.setHeader("Cache-Control", "no-store");
  res.json({
    stats,
    rsvps: [...rsvps].reverse().slice(0, 500),
    visits: [...visits].reverse().slice(0, 500),
    whatsappNumber: WHATSAPP_NUMBER,
    generatedAt: new Date().toISOString(),
  });
});

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

app.get("/api/admin/export.csv", requireAdmin, (req, res) => {
  const type = req.query.type === "visits" ? "visits" : "rsvps";
  const rows =
    type === "visits"
      ? [
          ["Opened at", "Visitor ID", "Path", "Referrer", "Language", "Timezone", "Screen", "IP hash"],
          ...visits.map((visit) => [
            visit.createdAt,
            visit.visitorId,
            visit.path,
            visit.referrer,
            visit.language,
            visit.timezone,
            visit.screen,
            visit.ipHash,
          ]),
        ]
      : [
          ["Submitted at", "Name", "Attending", "Guests", "Contact", "Note", "Visitor ID", "IP hash"],
          ...rsvps.map((rsvp) => [
            rsvp.submittedAt,
            rsvp.name,
            rsvp.attending,
            rsvp.guests,
            rsvp.contact,
            rsvp.note,
            rsvp.visitorId,
            rsvp.ipHash,
          ]),
        ];
  const csv = `\uFEFF${rows.map((row) => row.map(csvEscape).join(",")).join("\r\n")}`;
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="ijeoma-${type}.csv"`);
  res.send(csv);
});

app.get(["/admin", "/admin/"], (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.get("/healthz", (req, res) => res.json({ ok: true }));

if (fs.existsSync(DIST)) {
  app.use(
    express.static(DIST, {
      index: false,
      maxAge: "1h",
      setHeaders(res, file) {
        if (file.endsWith("index.html")) res.setHeader("Cache-Control", "no-store");
      },
    })
  );
}

app.use("/api", (req, res) => res.status(404).json({ error: "Not found" }));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/admin")) return next();
  const index = path.join(DIST, "index.html");
  if (!fs.existsSync(index)) return res.status(503).send("Build not found. Run npm run build.");
  res.setHeader("Cache-Control", "no-store");
  res.sendFile(index);
});

app.use((error, req, res, next) => {
  console.error(error);
  if (res.headersSent) return next(error);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Ijeoma birthday server on port ${PORT}`);
  console.log(`Admin dashboard: /admin`);
  console.log(`WhatsApp number: ${WHATSAPP_NUMBER}`);
  console.log(`Data directory: ${DATA_DIR}`);
  if (generatedAdminPassword) {
    console.log(`Generated admin password: ${adminPassword}`);
    console.log("Set ADMIN_PASSWORD in production and change this password.");
  } else {
    console.log("Admin password is set from ADMIN_PASSWORD.");
  }
});
