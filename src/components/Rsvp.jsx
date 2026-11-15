import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import GuestSelect from "./GuestSelect";
import Reveal from "./Reveal";
import { CelebrationDecor } from "./Celebration";
import { downloadCalendar } from "../lib/calendar";
import { celebrateAt } from "../lib/celebrate";
import { readJSON, writeJSON } from "../lib/storage";
import { getVisitorId } from "../lib/tracking";
import { apiUrl } from "../lib/api";

const STORAGE_KEY = "ijeoma-birthday-picnic-rsvp-v1";
const CONFIG = {
  rsvpEndpoint: apiUrl("/api/rsvp"),
  whatsappNumber: "2347035628526",
  ...(typeof window !== "undefined" ? window.IJEOMA_CONFIG || {} : {}),
};

const EMPTY = {
  name: "",
  contact: "",
  attending: "yes",
  guests: "1",
  note: "",
};

function composeMessage(rsvp) {
  if (!rsvp) return "";
  const firstName = rsvp.name.split(/\s+/)[0];
  const guestLine =
    rsvp.attending === "yes"
      ? `I'll be there with ${rsvp.guests} ${Number(rsvp.guests) === 1 ? "seat" : "seats"} reserved.`
      : "I'm sending my love from afar.";

  return [
    `Hi! This is ${rsvp.name}.`,
    `${rsvp.attending === "yes" ? "Yes" : "Sadly, no"} — I've RSVP'd for Ijeoma's (Tweety's) birthday picnic.`,
    guestLine,
    "Saturday, 5 December 2026 · 1:30 PM · Jaekel House, Ebute Metta, Lagos.",
    rsvp.note ? `A note for her: “${rsvp.note}”` : "",
    `Can't wait to celebrate ${firstName === "Ijeoma" ? "you" : "our girl"}! ✦`,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function Rsvp() {
  const [form, setForm] = useState(() => {
    const saved = readJSON(STORAGE_KEY, null);
    if (!saved || typeof saved !== "object") return EMPTY;
    return {
      name: saved.name || "",
      contact: saved.contact || "",
      attending: saved.attending === "no" ? "no" : "yes",
      guests: saved.guests || "1",
      note: saved.note || "",
    };
  });
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [copied, setCopied] = useState(false);
  const nameRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => {
      successRef.current?.focus({ preventScroll: true });
      successRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = form.name.trim();
    if (!name) {
      setError("Please tell us your name.");
      nameRef.current?.focus();
      return;
    }
    setError("");
    setCopied(false);

    const rsvp = {
      ...form,
      name,
      note: form.note.trim(),
      visitorId: getVisitorId(),
      submittedAt: new Date().toISOString(),
    };
    writeJSON(STORAGE_KEY, rsvp);
    setSubmitted(rsvp);

    window.setTimeout(() => {
      celebrateAt(window.innerWidth / 2, window.innerHeight * 0.36, 90);
    }, 120);

    if (CONFIG.rsvpEndpoint) {
      try {
        await fetch(CONFIG.rsvpEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(rsvp),
        });
      } catch (fetchError) {
        console.warn("RSVP delivery could not be completed.", fetchError);
      }
    }
  };

  const shareReply = async () => {
    const text = composeMessage(submitted);
    if (!text) return;

    if (CONFIG.whatsappNumber) {
      const number = String(CONFIG.whatsappNumber).replace(/\D/g, "");
      window.open(
        `https://wa.me/${number}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noopener"
      );
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Ijeoma’s Birthday Picnic · 05.12.2026",
          text,
        });
        return;
      } catch (shareError) {
        if (shareError?.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.prompt("Copy your RSVP message:", text);
    }
  };

  const editReply = () => {
    setSubmitted(null);
    setCopied(false);
    window.setTimeout(() => {
      nameRef.current?.focus({ preventScroll: true });
      nameRef.current?.select();
    }, 50);
  };

  const attending = submitted?.attending !== "no";
  const firstName = submitted?.name?.split(/\s+/)[0] || "";

  return (
    <section id="rsvp" className="rsvp-surface relative overflow-hidden py-16 min-[761px]:py-24">
      <span className="pointer-events-none absolute -left-8 top-4 -rotate-[7deg] select-none whitespace-nowrap font-script text-[clamp(12rem,29vw,30rem)] leading-[0.8] text-plum/[0.045]">
        say yes
      </span>

      <CelebrationDecor section="rsvp" />
      <div className="container-page relative z-[2] grid items-center gap-14 min-[1024px]:grid-cols-[0.9fr_1.1fr] min-[1024px]:gap-24">
        <div className="max-w-[680px]">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 text-[0.76rem] uppercase tracking-[0.24em] text-ink-soft">
              <span className="h-px w-8 bg-orchid" />
              <span className="text-orchid-dark">Be our guest</span>
            </p>
            <h2 className="font-serif text-[clamp(2.9rem,10.5vw,6.3rem)] leading-[0.98] tracking-[-0.025em] text-ink min-[761px]:text-[clamp(2.9rem,6.4vw,6.3rem)]">
              Will you
              <br />
              <em className="italic text-plum">join us?</em>
            </h2>
          </Reveal>

          <Reveal as="p" delay={100} className="mt-6 max-w-[430px] text-[1rem] leading-[1.7] text-ink-soft">
            The only thing missing is you. Let us know you’re coming — and leave a
            little note for her.
          </Reveal>
        </div>

        <Reveal delay={150} className="relative border border-orchid/40 bg-paper p-6 shadow-soft md:p-10">
          <span className="pointer-events-none absolute inset-2.5 border border-orchid/20" />

          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate className="relative">
              <p className="mb-8 text-[0.74rem] uppercase tracking-[0.24em] text-orchid-dark">
                Your reply
              </p>

              <div className="grid gap-5 min-[521px]:grid-cols-2">
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="mb-1.5 flex items-baseline gap-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft"
                  >
                    Your name <em className="not-italic text-plum">*</em>
                  </label>
                  <input
                    ref={nameRef}
                    id="rsvp-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your beautiful name"
                    maxLength={80}
                    value={form.name}
                    onChange={update("name")}
                    aria-invalid={error ? "true" : undefined}
                    aria-describedby={error ? "rsvp-name-error" : undefined}
                    className={`field-input ${error ? "border-[#7c2d5a]" : ""}`}
                    required
                  />
                  <span id="rsvp-name-error" className="mt-1 block min-h-4 text-[0.78rem] text-[#7c2d5a]">
                    {error}
                  </span>
                </div>
                <div>
                  <label
                    htmlFor="rsvp-contact"
                    className="mb-1.5 flex items-baseline gap-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft"
                  >
                    Email or phone <span className="text-[0.66rem] normal-case tracking-normal text-ink-soft/80">(optional)</span>
                  </label>
                  <input
                    id="rsvp-contact"
                    name="contact"
                    type="text"
                    autoComplete="email"
                    placeholder="So we can reach you"
                    maxLength={120}
                    value={form.contact}
                    onChange={update("contact")}
                    className="field-input"
                  />
                  <span className="mt-1 block min-h-4" />
                </div>
              </div>

              <fieldset className="mt-2">
                <legend className="mb-1.5 flex items-baseline gap-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft">
                  Will you be there? <em className="not-italic text-plum">*</em>
                </legend>
                <div className="grid gap-2.5 min-[521px]:grid-cols-2">
                  {[
                    ["yes", "Yes, with bells on", "I wouldn’t miss it for the world."],
                    ["no", "Sending love from afar", "I’ll be there in spirit."],
                  ].map(([value, title, copy]) => (
                    <label key={value} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name="attending"
                        value={value}
                        checked={form.attending === value}
                        onChange={update("attending")}
                        className="peer sr-only"
                      />
                      <span className="choice-box">
                        <strong className="font-serif text-[1rem] font-normal tracking-[-0.01em]">
                          {title}
                        </strong>
                        <small className="text-[0.8rem] leading-[1.4] text-ink-soft">
                          {copy}
                        </small>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-5 grid gap-5 min-[521px]:grid-cols-2">
                <div className="relative">
                  <label
                    htmlFor="rsvp-guests"
                    className="mb-1.5 flex items-baseline gap-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft"
                  >
                    Guests <span className="text-[0.66rem] normal-case tracking-normal text-ink-soft/80">(including you)</span>
                  </label>
                  <GuestSelect
                    value={form.guests}
                    onChange={(guests) =>
                      setForm((current) => ({ ...current, guests }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="rsvp-note"
                    className="mb-1.5 flex items-baseline gap-1.5 text-[0.72rem] uppercase tracking-[0.16em] text-ink-soft"
                  >
                    A note for her <span className="text-[0.66rem] normal-case tracking-normal text-ink-soft/80">(optional)</span>
                  </label>
                  <input
                    id="rsvp-note"
                    name="note"
                    type="text"
                    placeholder="A little birthday wish…"
                    maxLength={160}
                    value={form.note}
                    onChange={update("note")}
                    className="field-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-7 inline-flex min-h-[3.2rem] w-full items-center justify-center gap-3 rounded-full border border-ink bg-ink px-6 py-[0.95rem] text-[0.78rem] uppercase tracking-[0.19em] text-cream transition hover:border-plum hover:bg-plum"
              >
                Send my RSVP <Icon name="arrow" className="h-[17px] w-[17px]" />
              </button>
              <p className="mt-4 text-center text-[0.74rem] leading-[1.7] tracking-[0.06em] text-ink-soft">
                With love, Ijeoma’s people. <span className="px-1 text-orchid">✦</span>{" "}
                Kindly reply before the big day.
              </p>
            </form>
          ) : (
            <div className="relative py-4 text-center">
              <div className="mx-auto mb-4 grid h-[3.4rem] w-[3.4rem] place-items-center rounded-full border border-orchid text-plum">
                <Icon name="bird" className="h-[26px] w-[26px]" />
              </div>
              <p className="font-script text-[2rem] leading-tight text-plum">
                {attending ? "you’re on the list" : "sending love right back"}
              </p>
              <h3
                ref={successRef}
                tabIndex={-1}
                className="mx-auto mb-3 mt-1.5 max-w-full [overflow-wrap:anywhere] font-serif text-[clamp(1.9rem,3.5vw,2.8rem)] leading-[1.1] tracking-[-0.03em] text-plum"
              >
                {attending
                  ? `We can’t wait to see you, ${firstName}.`
                  : `You’ll be missed, ${firstName}.`}
              </h3>
              <p className="mx-auto max-w-[390px] text-[1rem] leading-[1.75] text-ink-soft">
                {attending
                  ? "Thank you for replying. Bring your best cutesy-comfortable outfit, something delicious to share, and a little room for cake."
                  : "Your love will be in the room even if you can’t be. Thank you for letting us know — and for being part of her story."}
              </p>
              <div className="mx-auto mt-7 flex max-w-[340px] flex-col gap-2.5">
                <button
                  type="button"
                  onClick={shareReply}
                  className="inline-flex min-h-[3.2rem] items-center justify-center gap-3 rounded-full bg-[#128c7e] px-6 py-[0.95rem] text-[0.78rem] uppercase tracking-[0.19em] text-white transition hover:bg-[#0d6f63]"
                >
                  {copied ? "Copied to clipboard" : "Send RSVP on WhatsApp"}
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={downloadCalendar}
                  className="inline-flex min-h-[3.2rem] items-center justify-center gap-3 rounded-full border border-ink/30 px-6 py-[0.95rem] text-[0.78rem] uppercase tracking-[0.19em] transition hover:border-ink hover:bg-ink hover:text-cream"
                >
                  Add to calendar <Icon name="calendar" className="h-4 w-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={editReply}
                className="mx-auto mt-4 border-b border-orchid/55 pb-1.5 text-[0.74rem] uppercase tracking-[0.18em] text-ink-soft transition hover:border-plum hover:text-plum"
              >
                Edit my reply
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
