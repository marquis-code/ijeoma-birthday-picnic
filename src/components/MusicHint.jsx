import { useMusic } from "../context/MusicContext";
import Icon from "./Icon";

export default function MusicHint({ visible }) {
  const { resume } = useMusic();

  return (
    <div
      className={`fixed bottom-4 right-4 z-[90] flex flex-col items-center transition duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span className="music-arrow pointer-events-none mb-1.5 grid h-7 w-7 place-items-center rounded-full border border-lilac/25 bg-plum-deep/85 text-lilac shadow-[0_5px_18px_rgba(40,16,49,0.22)] backdrop-blur">
        <Icon name="arrow" className="h-4 w-4 rotate-90" strokeWidth={2} />
      </span>
      <button
        type="button"
        onClick={resume}
        aria-label="Start or resume the music"
        title="Tap for music"
        className="music-button group relative grid h-12 w-12 place-items-center rounded-full border border-lilac/50 bg-plum-deep/90 text-lilac shadow-[0_8px_24px_rgba(40,16,49,0.28)] backdrop-blur transition hover:scale-105 hover:border-lilac hover:bg-plum-deep hover:text-lilac-pale focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
      >
        <span className="music-ring pointer-events-none absolute -inset-1 rounded-full border border-lilac/35" />
        <Icon name="music" className="h-5 w-5" strokeWidth={1.6} />
      </button>
    </div>
  );
}
