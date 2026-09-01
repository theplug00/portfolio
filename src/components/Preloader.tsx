import { useEffect, useRef, useState } from "react";

type Props = { active: boolean; onDone: () => void };

const LINES = [
  "$ whoami",
  "aaron — design engineer, antwerp",
  "$ load portfolio --vol 04 --year 2026",
  "mounting interfaces, motion, shaders … ok",
  "$ status",
  "available for Q3 2026 · 1 slot",
];

/** Terminal boot sequence that wipes away into the page. Skipped entirely under reduced motion. */
export default function Preloader({ active, onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    let p = 0;
    const id = window.setInterval(() => {
      p = Math.min(100, p + 2.5 + Math.random() * 6.5);
      setProgress(p);
      if (p >= 100 && !doneRef.current) {
        doneRef.current = true;
        window.clearInterval(id);
        window.setTimeout(() => setLeaving(true), 380);
        window.setTimeout(() => {
          setGone(true);
          onDone();
        }, 1150);
      }
    }, 42);
    return () => window.clearInterval(id);
  }, [active, onDone]);

  useEffect(() => {
    if (!active) return;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [active]);

  if (!active || gone) return null;

  const shown = Math.floor((progress / 100) * LINES.length);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[130] flex flex-col justify-between bg-coal px-6 py-6 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] sm:px-10 ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-fog/40">
        <span>AARON.DEV</span>
        <span>boot sequence</span>
      </div>

      <div className="mx-auto w-full max-w-xl font-mono text-[13px] leading-7 text-fog/80">
        {LINES.slice(0, shown).map((l, i) => (
          <p key={l} className={i % 2 === 0 ? "text-ultra" : "text-fog/70"}>
            {l}
          </p>
        ))}
        <p className="text-fog">
          <span className="blink inline-block h-[1.05em] w-[0.6em] translate-y-[0.18em] bg-ultra" />
        </p>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="h-[3px] flex-1 bg-fog/10">
          <div
            className="h-full bg-ultra transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="stretch font-display text-4xl font-extrabold tabular-nums text-fog sm:text-5xl">
          {Math.floor(progress)}
          <span className="text-ultra">%</span>
        </p>
      </div>
    </div>
  );
}
