import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { useMusic } from "../context/MusicContext";
import { celebrate } from "../lib/celebrate";
import { CelebrationDecor } from "./Celebration";

export default function OpeningGate({ entered, onEnter }) {
  const { start } = useMusic();
  const [gone, setGone] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!entered) return undefined;
    const timer = window.setTimeout(() => setGone(true), 800);
    return () => window.clearTimeout(timer);
  }, [entered]);

  useEffect(() => {
    if (!entered) buttonRef.current?.focus({ preventScroll: true });
  }, [entered]);

  function enter(event) {
    start();
    celebrate(event.currentTarget, 72);
    onEnter();
  }

  if (gone) return null;

  return (
    <div
      aria-hidden={entered}
      role="dialog"
      aria-modal="true"
      aria-label="Open Ijeoma’s birthday picnic"
      className={`fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-plum-deep px-6 text-cream transition-all duration-700 ${
        entered ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="pointer-events-none absolute -left-[20vw] -top-[20vw] h-[55vw] w-[55vw] rounded-full border border-lilac/15" />
      <span className="pointer-events-none absolute -bottom-[25vw] -right-[15vw] h-[60vw] w-[60vw] rounded-full border border-lilac/15" />
      <span className="pointer-events-none absolute left-1/2 top-[12%] h-2 w-2 -translate-x-1/2 rotate-45 bg-lilac" />

      <CelebrationDecor section="gate" />
      <Icon name="heart" filled className="gate-heart pointer-events-none absolute left-[12%] top-[25%] h-8 w-8 text-lilac/15" />
      <Icon name="heart" filled className="gate-heart pointer-events-none absolute right-[14%] top-[58%] h-5 w-5 text-lilac/20 [animation-delay:-2.4s]" />
      <Icon name="heart" filled className="gate-heart pointer-events-none absolute bottom-[18%] left-[20%] h-4 w-4 text-lilac/15 [animation-delay:-4.2s]" />
      <span className="pointer-events-none absolute right-[18%] top-[30%] text-[0.7rem] text-lilac/30">✦</span>

      <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center text-center">
        <p
          className="gate-rise mb-5 font-serif text-[clamp(1.15rem,2.3vw,1.75rem)] font-medium tracking-[-0.01em] text-lilac-pale"
          style={{ animationDelay: "0.08s" }}
        >
          A birthday picnic for
        </p>
        <h1
          className="gate-rise font-serif text-[clamp(4.8rem,15vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.03em] text-cream"
          style={{ animationDelay: "0.2s" }}
        >
          Ijeoma
        </h1>
        <p
          className="gate-rise mt-7 max-w-[460px] text-[1.04rem] leading-[1.7] text-cream/88"
          style={{ animationDelay: "0.36s" }}
        >
          A garden full of love, a table full of treats, and all her favourite
          people.
        </p>

        <p
          className="gate-rise mt-8 text-[0.82rem] font-medium tracking-[0.12em] text-lilac-pale"
          style={{ animationDelay: "0.5s" }}
        >
          A little secret — there’s cake inside.
        </p>

        <div
          className="gate-rise relative mt-4"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="pointer-events-none absolute -inset-2 rounded-full border border-lilac/30 animate-[gate-pulse_3s_ease-in-out_infinite]" />
          <button
            ref={buttonRef}
            type="button"
            onClick={enter}
            className="group relative inline-flex min-h-[3.6rem] items-center gap-3 rounded-full border border-lilac bg-lilac px-7 py-4 text-[0.82rem] font-medium uppercase tracking-[0.16em] text-plum-deep transition duration-500 hover:scale-[1.025] hover:bg-cream"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-plum-deep text-lilac">
              <Icon name="heart" filled className="gate-beat h-4 w-4" />
            </span>
            Open the garden gate
          </button>
        </div>

        <p
          className="gate-rise mt-6 text-[0.76rem] tracking-[0.06em] text-cream/58"
          style={{ animationDelay: "0.74s" }}
        >
          Come in, stay awhile.
        </p>
      </div>
    </div>
  );
}
