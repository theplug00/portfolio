import { useEffect, useRef, useState } from "react";

/* prefers-reduced-motion */
export function usePRM(): boolean {
  const [prm, setPrm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrm(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrm(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return prm;
}

/* fine pointer detection (desktop cursor effects) */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setFine(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return fine;
}

/* one-shot intersection reveal */
export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -8% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

/* scramble / decode text effect */
const GLYPHS = "#@%&$?!/\\<>[]{}=+*^~";

export function useScramble(text: string, play: boolean, speed = 1): string {
  const prm = usePRM();
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (!play || prm) {
      setOut(text);
      return;
    }
    let raf = 0;
    let frame = 0;
    const totalFrames = Math.max(18, text.length * 2.4) / speed;
    const tick = () => {
      frame += 1;
      const revealed = Math.floor((frame / totalFrames) * text.length * 1.25);
      if (revealed >= text.length) {
        setOut(text);
        return;
      }
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === " " || c === "." || i < revealed) s += c;
        else s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      setOut(s);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, text, prm, speed]);
  return out;
}

/* live clock in a timezone */
export function useClock(timeZone = "Europe/Brussels"): string {
  const [now, setNow] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);
  return now;
}

/* page scroll progress 0..1 */
export function useScrollProgress(): number {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

/* lock body scroll while `locked` */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
