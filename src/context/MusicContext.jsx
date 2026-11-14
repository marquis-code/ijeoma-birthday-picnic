import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";

const MusicContext = createContext(null);
const VIDEO_ID = "p8HoEvDh70Y";
const NEXT_VIDEO_ID = "VIoPTujr11M"; // second track in the opening sequence

const EMBED_SRC =
  `https://www.youtube.com/embed/${VIDEO_ID}` +
  `?autoplay=1&loop=1&playlist=${NEXT_VIDEO_ID}` +
  "&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1";

export function MusicProvider({ children }) {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef(null);

  const command = useCallback((func) => {
    try {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "*"
      );
    } catch {
      // If the embed is blocked, the site still works without sound.
    }
  }, []);

  const start = useCallback(() => {
    setStarted(true);
    setPlaying(true);
  }, []);

  const pause = useCallback(() => {
    command("pauseVideo");
    setPlaying(false);
  }, [command]);

  const toggle = useCallback(() => {
    if (playing) {
      pause();
    } else {
      command("playVideo");
      setPlaying(true);
    }
  }, [command, pause, playing]);

  const value = useMemo(
    () => ({ ready: true, failed: false, playing, start, pause, toggle }),
    [playing, start, pause, toggle]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      {started && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-[-9999px] top-0 h-[135px] w-[240px] overflow-hidden opacity-0"
        >
          <iframe
            ref={iframeRef}
            title="Celebration"
            src={EMBED_SRC}
            width="240"
            height="135"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            className="h-[135px] w-[240px] border-0"
          />
        </div>
      )}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used inside MusicProvider");
  return context;
}
