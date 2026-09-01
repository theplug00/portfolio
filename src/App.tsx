import { useCallback, useEffect, useState } from "react";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import Nav from "./components/Nav";
import Preloader from "./components/Preloader";
import Profile from "./components/Profile";
import Studio from "./components/Studio";
import Work from "./components/Work";
import Writing from "./components/Writing";
import { usePRM } from "./hooks";

export default function App() {
  const prm = usePRM();
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    if (prm) setBooted(true);
  }, [prm]);

  const onBootDone = useCallback(() => setBooted(true), []);

  return (
    <div className="relative min-h-screen bg-fog text-ink">
      <Preloader active={!prm} onDone={onBootDone} />
      <Cursor />
      <div className="noise-layer" aria-hidden="true" />
      <Nav />
      <main>
        <Hero booted={booted} />
        <Work />
        <Studio />
        <Profile />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}
