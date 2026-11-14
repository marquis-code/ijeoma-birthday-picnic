import { useEffect, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { downloadCalendar } from "../lib/calendar";

const TARGET = new Date("2026-12-05T13:30:00+01:00").getTime();

function useCountdown() {
  const [time, setTime] = useState({ days: "00", hours: "00", minutes: "00" });
  useEffect(() => {
    const update = () => {
      const distance = TARGET - Date.now();
      if (distance <= 0) {
        setTime({ days: "00", hours: "00", minutes: "00" });
        return;
      }
      const total = Math.floor(distance / 1000);
      const pad = (value) => String(value).padStart(2, "0");
      setTime({
        days: pad(Math.floor(total / 86400)),
        hours: pad(Math.floor((total % 86400) / 3600)),
        minutes: pad(Math.floor((total % 3600) / 60)),
      });
    };
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return time;
}

export default function Invitation() {
  const countdown = useCountdown();

  return (
    <section id="invitation" className="relative bg-cream py-16 min-[761px]:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(199,155,200,0.2),transparent_42%),radial-gradient(ellipse_at_90%_80%,rgba(203,163,222,0.16),transparent_45%)]" />
      <div className="container-page relative">
        <Reveal className="mx-auto mb-10 max-w-[850px] text-center">
          <p className="mb-4 text-[0.8rem] font-medium uppercase tracking-[0.24em] text-orchid-dark">
            A picnic invitation
          </p>
          <h2 className="font-serif text-[clamp(2.4rem,8vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.025em] text-ink">
            Come for the cake.
            <br />
            <span className="text-plum">Stay for the magic.</span>
          </h2>
        </Reveal>

        <Reveal
          delay={100}
          className="mx-auto max-w-[1020px] overflow-hidden border border-orchid/35 bg-paper shadow-paper"
        >
          <div className="relative flex flex-wrap items-center justify-between gap-5 overflow-hidden bg-plum px-6 py-6 text-cream md:px-10">
            <span className="pointer-events-none absolute -right-3 -top-12 select-none font-serif text-[10rem] font-semibold leading-none text-lilac-pale/[0.07] md:text-[14rem]">
              05
            </span>
            <div className="relative">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.24em] text-lilac">
                Saturday
              </p>
              <p className="mt-1 font-serif text-[1.75rem] font-medium leading-none tracking-[-0.02em] md:text-[2.25rem]">
                05 December 2026
              </p>
            </div>
            <div className="relative flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.88rem] font-medium">
              <span className="rounded-full border border-lilac/30 px-4 py-2 text-lilac-pale">
                1:30 PM
              </span>
              <span className="text-cream/90">Lagos, Nigeria</span>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.15fr_0.85fr] md:px-10 md:py-10">
            <div>
              <p className="text-[0.78rem] font-medium uppercase tracking-[0.22em] text-orchid-dark">
                You are warmly invited
              </p>
              <h3 className="mt-2 font-serif text-[clamp(3.5rem,8vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-ink">
                Ijeoma
              </h3>
              <p className="mt-5 max-w-[470px] text-[1rem] leading-[1.7] text-ink-soft">
                Join us in the garden for a birthday picnic in her honour. There
                will be good food, soft light and all her favourite people — we’d
                love for you to be there.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#rsvp"
                  className="inline-flex min-h-[3.2rem] items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-cream transition hover:bg-plum"
                >
                  RSVP <Icon name="arrow" className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={downloadCalendar}
                  className="inline-flex min-h-[3.2rem] items-center gap-2 rounded-full border border-ink/25 px-5 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-ink transition hover:border-ink hover:bg-ink hover:text-cream"
                >
                  Add to calendar <Icon name="calendar" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid content-start gap-5 border-t border-ink/10 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div>
                <span className="mb-1.5 block text-[0.78rem] font-medium uppercase tracking-[0.2em] text-orchid-dark">
                  Dress cutesy &amp; comfortable
                </span>
                <p className="text-[1rem] leading-[1.65] text-ink-soft">
                  Soft colours, easy fabrics, happy feet.
                </p>
              </div>
              <div>
                <span className="mb-1.5 block text-[0.78rem] font-medium uppercase tracking-[0.2em] text-orchid-dark">
                  Bring something edible
                </span>
                <p className="text-[1rem] leading-[1.65] text-ink-soft">
                  Sweet, savoury or both — enough to share.
                </p>
              </div>
              <div className="rounded-sm bg-cream px-4 py-3">
                <p className="text-[0.78rem] font-medium uppercase tracking-[0.18em] text-orchid-dark">
                  {countdown.days} days · {countdown.hours} hrs ·{" "}
                  {countdown.minutes} min
                </p>
                <p className="mt-1 text-[0.88rem] text-ink-soft">
                  until the picnic
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
