import { useEffect, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { CelebrationDecor, Bow } from "./Celebration";
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
    <section id="invitation" className="relative overflow-hidden bg-cream py-16 min-[761px]:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(199,155,200,0.2),transparent_42%),radial-gradient(ellipse_at_90%_80%,rgba(203,163,222,0.16),transparent_45%)]" />
      <CelebrationDecor section="invitation" />
      <div className="container-page relative z-[2]">
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

        <Reveal delay={100} className="mx-auto max-w-[1060px]">
          <div className="relative bg-paper p-2 shadow-paper">
            <Bow className="decor-sway pointer-events-none absolute -right-3 -top-4 z-[3] h-12 w-12 rotate-12 text-blush/75" style={{ animationDelay: "-2s" }} />
            <div className="pointer-events-none absolute inset-2 border border-orchid/25" />
            <div className="relative grid overflow-hidden md:grid-cols-[0.92fr_1.08fr]">
              <aside className="relative overflow-hidden bg-plum px-6 py-8 text-cream md:px-10 md:py-12">
                <span className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-lilac/15" />
                <span className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full border border-lilac/10" />
                <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-lilac/35 text-lilac">
                  <Icon name="heart" filled className="h-4 w-4" />
                </span>

                <p className="text-[0.76rem] font-medium uppercase tracking-[0.24em] text-lilac">
                  The details
                </p>
                <p className="mt-4 text-[0.82rem] font-medium uppercase tracking-[0.2em] text-cream/70">
                  Saturday
                </p>
                <div className="mt-1 flex items-end gap-3">
                  <span className="font-serif text-[clamp(3.6rem,7vw,4.8rem)] font-semibold leading-[0.8] tracking-[-0.04em] text-cream">
                    05
                  </span>
                  <div className="pb-1">
                    <p className="font-serif text-[1.35rem] font-medium leading-none text-cream">
                      December
                    </p>
                    <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-cream/60">
                      2026
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-5">
                  <div>
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-lilac">
                      Time
                    </p>
                    <p className="mt-1 font-serif text-[1.6rem] font-medium leading-none text-cream">
                      1:30 PM
                      <span className="ml-2 font-sans text-[0.72rem] uppercase tracking-[0.14em] text-cream/55">
                        arrival
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-lilac">
                      Place
                    </p>
                    <p className="mt-1 font-serif text-[1.35rem] font-medium leading-[1.2] text-cream">
                      Jaekel House
                    </p>
                    <p className="mt-1 max-w-[310px] text-[0.9rem] leading-[1.55] text-cream/78">
                      Nigerian Railway Corporation Compound, Ebute Metta, Lagos
                    </p>
                  </div>
                </div>

                <div className="mt-7 border-t border-lilac/20 pt-5">
                  <p className="text-[0.78rem] font-medium uppercase tracking-[0.16em] text-lilac-pale">
                    {countdown.days} days · {countdown.hours} hrs ·{" "}
                    {countdown.minutes} min
                  </p>
                  <p className="mt-1 text-[0.82rem] text-cream/58">
                    until the picnic
                  </p>
                </div>
              </aside>

              <div className="relative bg-paper px-6 py-8 md:px-10 md:py-12">
                <p className="text-[0.76rem] font-medium uppercase tracking-[0.22em] text-orchid-dark">
                  You are warmly invited
                </p>
                <p className="mt-5 max-w-[470px] text-[1.04rem] leading-[1.75] text-ink-soft">
                  Join us at Jaekel House for a birthday picnic in her honour. There
                  will be good food, games and all her favourite people — we’d love
                  for you to be there.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href="#rsvp"
                    aria-label="RSVP to Ijeoma’s birthday picnic"
                    style={{
                      backgroundColor: "#28182e",
                      color: "#f8f3fa",
                      border: "1px solid #28182e",
                      isolation: "isolate",
                    }}
                    className="relative z-20 inline-flex min-h-[3.2rem] items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.82rem] font-medium uppercase tracking-[0.16em] shadow-[0_10px_24px_-14px_rgba(40,24,46,0.65)] transition hover:brightness-110"
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

                <div className="mt-8 grid gap-5 border-t border-ink/10 pt-6 min-[521px]:grid-cols-2">
                  <div>
                    <p className="mb-1.5 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-orchid-dark">
                      Dress cutesy &amp; comfortable
                    </p>
                    <p className="text-[0.96rem] leading-[1.65] text-ink-soft">
                      Soft colours, easy fabrics, happy feet.
                    </p>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[0.76rem] font-medium uppercase tracking-[0.18em] text-orchid-dark">
                      Bring something edible
                    </p>
                    <p className="text-[0.96rem] leading-[1.65] text-ink-soft">
                      Sweet, savoury or both — enough to share.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
