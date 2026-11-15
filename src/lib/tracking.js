const VISITOR_KEY = "ijeoma-birthday-visitor-v1";
const ENDPOINT = "/api/visit";
let trackedThisLoad = false;

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function getVisitorId() {
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const next = makeId();
    window.localStorage.setItem(VISITOR_KEY, next);
    return next;
  } catch {
    return makeId();
  }
}

export function trackVisit() {
  if (typeof window === "undefined" || trackedThisLoad) return;
  trackedThisLoad = true;
  try {
    const params = new URLSearchParams(window.location.search);
    const payload = {
      visitorId: getVisitorId(),
      path: window.location.pathname,
      referrer: document.referrer || "",
      title: document.title,
      language: navigator.language || "",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
      screen: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      utm: {
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || "",
      },
    };
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never interfere with the invitation.
  }
}
