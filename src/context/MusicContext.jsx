import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const MusicContext = createContext(null);
const VIDEO_ID = "G1ykz9Rv3iw"; // Koffee — Toast (Official Video)
let apiPromise = null;

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previous?.();
      resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () => reject(new Error("YouTube could not be loaded."));
    document.head.appendChild(script);
  });
  return apiPromise;
}

export function MusicProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const playerRef = useRef(null);
  const wantsPlayRef = useRef(false);

  useEffect(() => {
    if (ready) return undefined;
    const timer = window.setTimeout(() => {
      setFailed(true);
      setReady(true);
    }, 3500);
    return () => window.clearTimeout(timer);
  }, [ready]);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        playerRef.current = new YT.Player("toast-youtube-player", {
          videoId: VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: VIDEO_ID,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              event.target.setVolume(55);
              setFailed(false);
              setReady(true);
              if (wantsPlayRef.current) {
                event.target.playVideo();
              }
            },
            onStateChange: (event) => {
              setPlaying(event.data === window.YT.PlayerState.PLAYING);
            },
            onError: () => {
              setFailed(true);
              setReady(true);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) {
          setFailed(true);
          setReady(true);
        }
      });

    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {
        // The player can already be gone on a fast unmount.
      }
    };
  }, []);

  const start = useCallback(() => {
    if (!playerRef.current) return;
    wantsPlayRef.current = true;
    try {
      playerRef.current.unMute?.();
      playerRef.current.setVolume?.(55);
      playerRef.current.playVideo?.();
    } catch {
      setFailed(true);
    }
  }, []);

  const pause = useCallback(() => {
    try {
      playerRef.current?.pauseVideo?.();
    } catch {
      // no-op
    }
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else start();
  }, [pause, playing, start]);

  const value = useMemo(
    () => ({ ready, playing, failed, start, pause, toggle }),
    [ready, playing, failed, start, pause, toggle]
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[-9999px] top-0 h-[135px] w-[240px] overflow-hidden opacity-0"
      >
        <div id="toast-youtube-player" />
      </div>
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error("useMusic must be used inside MusicProvider");
  return context;
}
