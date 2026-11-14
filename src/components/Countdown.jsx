import { useEffect, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";

const TARGET = new Date("2026-12-05T13:30:00+01:00").getTime();

function getRemaining() {
  const distance = TARGET - Date.now();
  if (distance <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00", done: true };
  }
  const total = Math.floor(distance / 1000);
  const pad = (value) => String(value).padStart(2, "0");
  return {
    days: pad(Math.floor(total / 86400)),
    hours: pad(Math.floor((total % 86400) / 3600)),
    minutes: pad(Math.floor((total % 3600) / 60)),
    seconds: pad(total % 60),
    done: false,
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    [time.days, "Days"],
    [time.hours, "Hours"],
    [time.minutes, "Minutes"],
    [time.seconds, "Seconds"],
  ];

  return (
    <section
      id="countdown"
      aria-label="Countdown to Ijeoma's birthday picnic"
      className="countdown-surface relative overflow-hidden py-24 text-center min-[761px]:py-32"
    >
      <span className="pointer-events-none absolute inset-[1.2rem] border border-lilac-pale/[0.13] max-[760px]:inset-[0.7rem]" />
      <span className="text-outline pointer-events-none absolute right-[-1.5rem] top-1/2 -translate-y-1/2 select-none font-serif text-[clamp(18rem,36vw,34rem)] leading-none max-[760px]:right-[-3rem] max-[760px]:text-[17rem]">
        05
      </span>
      <Icon name="bird" className="absolute left-1/2 top-10 h-8 w-8 -translate-x-1/2 text-orchid opacity-80" />

      <div className="container-page relative z-[2]">
        <Reveal>
          <p className="mb-5 flex items-center justify-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-cream/60">
            <span className="h-px w-8 bg-orchid" />
            The countdown
            <span className="h-px w-8 bg-orchid" />
          </p>
          <p className="mb-1 font-script text-[clamp(1.75rem,3vw,2.6rem)] leading-tight text-lilac">
            the wait is almost over
          </p>
          <h2 className="font-serif text-[clamp(2.9rem,6.4vw,6.3rem)] leading-[0.98] tracking-[-0.035em] text-cream">
            A little more
            <br />
            <em className="italic text-lilac">violet time.</em>
          </h2>
        </Reveal>

        <Reveal delay={100} className="mx-auto mt-12 max-w-[990px]">
          <div className="grid grid-cols-2 border-y border-lilac-pale/25 min-[761px]:grid-cols-4">
            {units.map(([value, label], index) => (
              <div
                key={label}
                className={`relative border-lilac-pale/20 px-4 py-[clamp(1.6rem,4vw,2.6rem)] ${
                  index % 2 === 0 ? "border-r" : ""
                } ${index < 2 ? "border-b" : ""} min-[761px]:border-b-0 ${
                  index < 3 ? "min-[761px]:border-r" : ""
                }`}
              >
                <span className="block font-serif text-[clamp(3.1rem,14vw,6.3rem)] leading-none tracking-[-0.04em] text-cream tabular-nums min-[761px]:text-[clamp(3.3rem,7vw,6.3rem)]">
                  {value}
                </span>
                <small className="mt-3 block text-[0.52rem] uppercase tracking-[0.3em] text-lilac">
                  {label}
                </small>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-8 text-[0.57rem] uppercase tracking-[0.22em] text-cream/60">
            {time.done
              ? "Today is the day — happy birthday, Tweety!"
              : "Saturday · 5 December 2026 · 1:30 PM · Lagos, Nigeria"}
          </p>
        </Reveal>
      </div>
      <span className="absolute bottom-5 left-9 text-[0.7rem] text-orchid opacity-60">
        ✦
      </span>
    </section>
  );
}
