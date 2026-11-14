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
const TRACKS = ["p8HoEvDh70Y", "VIoPTujr11M", "uJri0mNq8IQ"];
const TRACK_SECONDS = 10;

function embedFor(id) {
  return (
    `https://www.youtube.com/embed/${id}` +
    "?autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1"
  );
}

export function MusicProvider({ children }) {
  const [started, setStarted] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [src, setSrc] = useState("");
  const iframeRef = useRef(null);

  const start = useCallback(() => {
    setTrackIndex(0);
    setSrc(embedFor(TRACKS[0]));
    setStarted(true);
  }, []);

  useEffect(() => {
    if (!started) return undefined;

    const timer = window.setInterval(() => {
      setTrackIndex((current) => {
        const next = (current + 1) % TRACKS.length;
        setSrc(embedFor(TRACKS[next]));
        return next;
      });
    }, TRACK_SECONDS * 1000);

    return () => window.clearInterval(timer);
  }, [started]);

  useEffect(() => {
    if (!started || !src) return undefined;

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
  }, [src, started]);

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
            key={trackIndex}
            ref={iframeRef}
            title="Celebration"
            src={src}
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
