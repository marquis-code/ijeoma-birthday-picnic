import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { useMusic } from "../context/MusicContext";

export default function OpeningGate({ entered, onEnter }) {
  const { ready, failed, start } = useMusic();
  const [gone, setGone] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!entered) return undefined;
    const timer = window.setTimeout(() => setGone(true), 800);
    return () => window.clearTimeout(timer);
  }, [entered]);

  useEffect(() => {
    if (entered) return;
    if (ready || failed) {
      buttonRef.current?.focus({ preventScroll: true });
    }
  }, [ready, failed, entered]);

  if (gone) return null;

  function enter() {
    if (!ready && !failed) return;
    if (!failed) start();
    onEnter();
  }

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

      <div className="relative z-10 mx-auto flex max-w-[760px] flex-col items-center text-center">
        <p className="mb-5 text-[0.78rem] font-medium uppercase tracking-[0.28em] text-lilac">
          A birthday picnic
        </p>
        <h1 className="font-serif text-[clamp(4.8rem,15vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.03em] text-cream">
          Ijeoma
        </h1>
        <p className="mt-8 max-w-[420px] text-[1rem] leading-[1.7] text-cream/90">
          One tap, one song, and a garden full of people who adore her.
        </p>

        <button
          ref={buttonRef}
          type="button"
          onClick={enter}
          disabled={!ready && !failed}
          className="group mt-9 inline-flex min-h-[3.5rem] items-center gap-3 rounded-full border border-lilac bg-lilac px-7 py-4 text-[0.84rem] font-medium uppercase tracking-[0.18em] text-plum-deep transition hover:bg-cream disabled:cursor-wait disabled:opacity-70"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-plum-deep text-lilac">
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </span>
          {failed ? "Open the invitation" : ready ? "Tap to open with music" : "Tuning the music…"}
        </button>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[0.82rem] text-cream/78">
          <span className="h-px w-6 bg-lilac/50" />
          Opening song: <span className="text-lilac-pale">Toast</span> by Koffee
          <span className="h-px w-6 bg-lilac/50" />
        </p>
        <p className="mt-2 text-[0.78rem] text-cream/72">
          {failed
            ? "The music could not load — the celebration is still ready for you."
            : "Best experienced with sound. One tap starts the song."}
        </p>
      </div>
    </div>
  );
}
