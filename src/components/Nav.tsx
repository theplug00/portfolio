import { useEffect, useState } from "react";
import { EMAIL, NAV_LINKS } from "../data/content";
import { useClock, useScrollProgress } from "../hooks";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progress = useScrollProgress();
  const time = useClock("Europe/Brussels");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] border-b bg-coal/90 backdrop-blur-md transition-colors duration-500 ${
          scrolled ? "border-fog/12" : "border-transparent"
        }`}
      >
        {/* scroll progress */}
        <div
          className="absolute left-0 top-0 h-[2px] bg-ultra transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-6 px-5 sm:px-8">
          <a
            href="#top"
            className="stretch font-display text-lg font-extrabold uppercase tracking-tight text-fog"
            aria-label="AARON.DEV — back to top"
          >
            AARON<span className="text-ultra">.DEV</span>
            <span className="blink ml-0.5 inline-block h-[0.72em] w-[0.42em] translate-y-[0.08em] bg-ultra" />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-sweep font-mono text-[11px] uppercase tracking-[0.24em] text-fog/65 transition-colors hover:text-fog"
                >
                  <span className="mr-1.5 text-ultra">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <p className="hidden font-mono text-[11px] tracking-[0.18em] text-fog/45 md:block" aria-label={`Local time in Antwerp: ${time}`}>
              ANTWERP — {time}
            </p>
            <a
              href="#contact"
              className="hidden bg-ultra px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-fog transition-colors duration-300 hover:bg-fog hover:text-ink sm:block"
            >
              Start a project
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[7px] border border-fog/20 lg:hidden"
            >
              <span
                className={`h-[2px] w-4 bg-fog transition-transform duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "translate-y-[4.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-4 bg-fog transition-transform duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "-translate-y-[4.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* mobile overlay menu */}
      <div
        className={`fixed inset-0 z-[75] flex flex-col justify-between bg-coal px-6 pb-8 pt-24 transition-[opacity,visibility] duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="bg-blueprint-dark pointer-events-none absolute inset-0 opacity-60" />
        <ul className="relative">
          {NAV_LINKS.map((l, i) => (
            <li
              key={l.href}
              className={`border-b border-fog/10 transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="stretch flex items-baseline gap-4 py-4 font-display text-4xl font-extrabold uppercase text-fog transition-colors hover:text-ultra"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-ultra">0{i + 1}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="relative flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-fog/50">
          <a href={`mailto:${EMAIL}`} className="link-sweep text-fog/80">
            {EMAIL}
          </a>
          <span>ANT — {time}</span>
        </div>
      </div>
    </>
  );
}
