import { useMusic } from "../context/MusicContext";

export default function SoundButton({ hidden = false }) {
  const { playing, toggle } = useMusic();

  if (hidden) return null;

  return (
    <button
      type="button"
      aria-pressed={playing}
      aria-label={playing ? "Pause Toast by Koffee" : "Play Toast by Koffee"}
      onClick={toggle}
      className="group fixed bottom-4 right-4 z-[96] flex h-[3rem] items-center gap-2.5 rounded-full border border-lilac/55 bg-plum px-4 text-cream shadow-[0_10px_35px_rgba(40,24,46,0.22)] transition hover:bg-plum-deep hover:shadow-[0_14px_40px_rgba(40,24,46,0.32)] disabled:opacity-50 max-[760px]:h-[2.7rem] max-[760px]:px-3"
    >
      <span className="sound-bars" data-playing={playing} aria-hidden="true">
        <i /> <i /> <i /> <i />
      </span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.76rem] font-medium uppercase tracking-[0.13em] opacity-0 transition-all duration-500 group-hover:max-w-[200px] group-hover:opacity-100 group-focus-visible:max-w-[200px] group-focus-visible:opacity-100 max-[760px]:hidden">
        {playing ? "Pause the music" : "Play Toast by Koffee"}
      </span>
    </button>
  );
}
