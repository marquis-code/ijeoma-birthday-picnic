import { useEffect, useState } from "react";
import Effects from "./components/Effects";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import Loader from "./components/Loader";
import Marquee from "./components/Marquee";
import Nav from "./components/Nav";
import ProgressBar from "./components/ProgressBar";
import Rsvp from "./components/Rsvp";
import SoundButton from "./components/SoundButton";
import Story from "./components/Story";
import Venue from "./components/Venue";
import Wishlist from "./components/Wishlist";
import Countdown from "./components/Countdown";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const finish = () => {
      if (mounted) setReady(true);
    };
    const fallback = window.setTimeout(finish, 3200);
    const onLoad = () => {
      window.setTimeout(finish, 700);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    document.fonts?.ready.then(() => {
      window.setTimeout(finish, 500);
    });

    return () => {
      mounted = false;
      window.clearTimeout(fallback);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[1000] -translate-y-[150%] bg-plum px-4 py-2 text-[0.7rem] uppercase tracking-[0.12em] text-cream transition focus:translate-y-0"
      >
        Skip to the celebration
      </a>
      <Loader ready={ready} />
      <ProgressBar />
      <Effects />
      <Nav />
      <main id="main">
        <Hero ready={ready} />
        <Marquee />
        <Invitation />
        <Countdown />
        <Story />
        <Wishlist />
        <Venue />
        <Rsvp />
      </main>
      <Footer />
      <SoundButton />
    </>
  );
}
