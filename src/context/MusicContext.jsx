import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const MusicContext = createContext(null);
const TRACK_ID = "Z3Zvr_oZ2Q8";

const EMBED_SRC =
  `https://www.youtube.com/embed/${TRACK_ID}` +
  "?autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1";

export function MusicProvider({ children }) {
  const [started, setStarted] = useState(false);
  const iframeRef = useRef(null);

  const start = useCallback(() => setStarted(true), []);

  useEffect(() => {
    if (!started) return undefined;

    const nudge = window.setTimeout(() => {
      try {
        iframeRef.current?.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "playVideo", args: [] }),
          "*"
        );
      } catch {
        // Autoplay may be refused by the browser; the page remains usable.
      }
    }, 1200);

    return () => window.clearTimeout(nudge);
  }, [started]);

  const resume = useCallback(() => {
    if (!started) {
      start();
      return;
    }
    try {
      const playerWindow = iframeRef.current?.contentWindow;
      playerWindow?.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [100] }),
        "*"
      );
      playerWindow?.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*"
      );
    } catch {
      // No-op: the icon is a helpful nudge, never a stop control.
    }
  }, [started, start]);

  const value = useMemo(
    () => ({ ready: true, failed: false, start, resume }),
    [start, resume]
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
