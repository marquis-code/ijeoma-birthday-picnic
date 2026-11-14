import { useEffect, useState } from "react";
import Effects from "./components/Effects";
import { AmbientCelebration } from "./components/Celebration";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Invitation from "./components/Invitation";
import Nav from "./components/Nav";
import OpeningGate from "./components/OpeningGate";
import ProgressBar from "./components/ProgressBar";
import Rsvp from "./components/Rsvp";
import Story from "./components/Story";
import Venue from "./components/Venue";
import Wishlist from "./components/Wishlist";
import { MusicProvider } from "./context/MusicContext";

function Page() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    document.body.style.overflow = entered ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entered]);

  return (
    <>
      <a
        href="#main"
        className="fixed left-3 top-3 z-[1000] -translate-y-[150%] bg-plum px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-cream transition focus:translate-y-0"
      >
        Skip to the celebration
      </a>
      <OpeningGate entered={entered} onEnter={() => setEntered(true)} />
      <ProgressBar />
      <Effects />
      <AmbientCelebration />
      <Nav />
      <main id="main">
        <Hero ready={entered} />
        <Invitation />
        <Story />
        <Wishlist />
        <Venue />
        <Rsvp />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <MusicProvider>
      <Page />
    </MusicProvider>
  );
}
