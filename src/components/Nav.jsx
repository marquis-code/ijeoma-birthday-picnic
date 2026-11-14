import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const links = [
  { href: "#invitation", label: "The Invitation" },
  { href: "#story", label: "The Birthday Girl" },
  { href: "#wishlist", label: "Wish List" },
  { href: "#venue", label: "The Venue" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      const timer = window.setTimeout(() => firstLinkRef.current?.focus(), 360);
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 900) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const closeAndGo = (event, href) => {
    if (!open) return;
    event.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      const target = document.querySelector(href);
      target?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    }, 80);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-8 px-[clamp(1.25rem,3vw,3.2rem)] transition-all duration-500 ${
          open
            ? "bg-transparent py-6 text-cream shadow-none"
            : scrolled
              ? "bg-cream/90 py-3 text-ink shadow-[0_1px_0_rgba(40,24,46,0.1)] backdrop-blur-xl"
              : "bg-transparent py-6 text-ink"
        }`}
      >
        <a
          href="#top"
          aria-label="Ijeoma’s birthday picnic — back to the top"
          onClick={() => setOpen(false)}
          className="relative z-[102] inline-flex items-center gap-3"
        >
          <span
            className={`grid h-[2.45rem] w-[2.45rem] place-items-center rounded-full border font-serif text-[1.28rem] leading-none transition ${
              open
                ? "border-lilac/55 bg-transparent text-lilac-pale"
                : "border-orchid/70 bg-plum text-lilac-pale"
            }`}
          >
            I
          </span>
          <span className="flex flex-col gap-0.5 leading-none">
            <strong className="font-serif text-[1.02rem] font-medium tracking-[0.01em]">
              Ijeoma
            </strong>
            <small
              className={`text-[0.66rem] tracking-[0.22em] ${
                open ? "text-cream/92" : "text-ink-soft"
              }`}
            >
              05 · 12 · 26
            </small>
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-[clamp(1.2rem,2.4vw,2.6rem)] min-[901px]:flex"
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-1 text-[0.74rem] uppercase tracking-[0.18em] text-ink-soft transition hover:text-plum"
            >
              {link.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-orchid-dark transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="#rsvp"
          className={`hidden items-center gap-2 rounded-full border px-4 py-[0.65rem] text-[0.74rem] uppercase tracking-[0.2em] transition md:inline-flex ${
            open
              ? "pointer-events-none opacity-0"
              : "border-ink/30 hover:border-plum hover:bg-plum hover:text-cream"
          }`}
        >
          RSVP <Icon name="arrow" className="h-3.5 w-3.5" />
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
          className={`relative z-[102] h-11 w-11 rounded-full border transition min-[901px]:hidden ${
            open ? "border-lilac-pale/35" : "border-ink/25"
          }`}
        >
          <span
            className={`absolute left-1/2 h-px w-4 -translate-x-1/2 transition-all duration-500 ${
              open ? "top-[1.3rem] rotate-45 bg-cream" : "top-[1.02rem] bg-ink"
            }`}
          />
          <span
            className={`absolute left-1/2 h-px w-4 -translate-x-1/2 transition-all duration-500 ${
              open ? "top-[1.3rem] -rotate-45 bg-cream" : "top-[1.55rem] bg-ink"
            }`}
          />
        </button>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-0 z-[99] grid min-[901px]:hidden place-items-center overflow-y-auto bg-plum px-6 pb-8 pt-28 text-cream transition-all duration-500 ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-[2%] opacity-0"
        }`}
      >
        <span className="pointer-events-none absolute -bottom-[20vw] -right-[30vw] h-[70vw] w-[70vw] rounded-full border border-lilac/10" />
        <div className="relative z-10 w-full max-w-[520px]">
          <p className="mb-10 font-serif text-[clamp(3.2rem,12vw,5rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
            Ijeoma
          </p>
          <nav aria-label="Mobile" className="flex flex-col border-t border-lilac-pale/20">
            {[...links, { href: "#rsvp", label: "RSVP" }].map((link, index) => (
              <a
                key={link.href}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                onClick={(event) => closeAndGo(event, link.href)}
                className="flex items-baseline gap-5 border-b border-lilac-pale/20 py-4 font-serif text-[clamp(1.5rem,5vw,2rem)] font-medium transition hover:pl-1.5 hover:text-lilac-pale"
              >
                <span className="text-[0.68rem] tracking-[0.2em] text-lilac">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 text-[0.82rem] font-medium uppercase leading-8 tracking-[0.12em] text-cream/92">
            <p>5 December 2026 · Lagos</p>
          </div>
        </div>
      </div>
    </>
  );
}
