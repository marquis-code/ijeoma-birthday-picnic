import { useRef, useState } from "react";
import Icon from "./Icon";
import { celebrate } from "../lib/celebrate";

export default function Footer() {
  const [line, setLine] = useState("Here’s to a year as radiant as you are.");
  const timerRef = useRef(null);

  const hug = (event) => {
    celebrate(event.currentTarget, 100);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setLine("Consider yourself hugged. ✦");
    timerRef.current = window.setTimeout(() => {
      setLine("Here’s to a year as radiant as you are.");
      timerRef.current = null;
    }, 3600);
  };

  return (
    <footer className="footer-surface relative overflow-hidden px-6 pb-7 pt-20 text-center text-cream min-[761px]:pt-32">
      <span className="pointer-events-none absolute left-1/2 top-[-16rem] h-[40rem] w-[40rem] -translate-x-1/2 rounded-full border border-lilac-pale/[0.08]" />
      <div className="relative">
        <div className="mb-9 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-lilac-pale/25" />
          <i className="text-[0.6rem] not-italic text-lilac">✦</i>
          <span className="h-px w-16 bg-lilac-pale/25" />
        </div>

        <p className="mb-5 flex flex-wrap items-center justify-center gap-3 text-[0.56rem] uppercase tracking-[0.24em] text-cream/60">
          <span className="h-px w-8 bg-orchid" />
          Ijeoma’s Birthday Picnic · 05 December 2026
        </p>
        <p className="font-script text-[clamp(2rem,4vw,3.4rem)] leading-none text-lilac-pale">
          Happy Birthday,
        </p>
        <h2 className="mt-1 font-serif text-[clamp(5.5rem,15.5vw,14.5rem)] leading-[0.8] tracking-[-0.06em] text-cream max-[520px]:text-[5.4rem]">
          Tweety
        </h2>
        <p className="mt-7 font-serif text-[clamp(1rem,1.5vw,1.2rem)] italic text-cream/60">
          {line}
        </p>

        <button
          type="button"
          onClick={hug}
          aria-label="Send Tweety a little love"
          className="mx-auto mt-10 flex flex-col items-center gap-2 p-1 text-lilac"
        >
          <Icon name="bird" className="h-8 w-8 transition-transform duration-500 hover:-translate-y-1 hover:-rotate-3" />
          <span className="text-[0.48rem] uppercase tracking-[0.2em] text-cream/40 max-[760px]:opacity-60">
            psst — tap the bird
          </span>
        </button>

        <div className="mx-auto mt-16 flex flex-col items-center justify-between gap-4 border-t border-lilac-pale/[0.17] pt-6 text-left text-[0.52rem] uppercase tracking-[0.16em] text-cream/50 min-[761px]:flex-row">
          <a href="#top" aria-label="Back to the top" className="transition hover:text-lilac-pale">
            Ijeoma <span>·</span> 2026
          </a>
          <p className="text-center">Jaekel House · Railway Compound · Ebute Metta</p>
          <a href="#top" className="inline-flex items-center gap-2 transition hover:text-lilac-pale">
            Back to top <Icon name="arrowUp" className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
