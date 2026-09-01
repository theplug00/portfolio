import { EMAIL, MARQUEE_ITEMS } from "../data/content";
import { useInView, useScramble } from "../hooks";

type Props = { booted: boolean };

const CODE_LINES: { indent: number; jsx: React.ReactNode }[] = [
  { indent: 0, jsx: <><span className="text-mute2">{"// aaron.ts — vol.04 / 2026"}</span></> },
  { indent: 0, jsx: <><span className="text-ultra">const</span> <span className="text-fog">aaron</span> <span className="text-fog/50">=</span> <span className="text-fog/50">{"{"}</span></> },
  { indent: 1, jsx: <><span className="text-fog/70">role</span><span className="text-fog/50">:</span> <span className="text-fog">"design engineer"</span><span className="text-fog/50">,</span></> },
  { indent: 1, jsx: <><span className="text-fog/70">base</span><span className="text-fog/50">:</span> <span className="text-fog">"antwerp, be"</span><span className="text-fog/50">,</span></> },
  { indent: 1, jsx: <><span className="text-fog/70">stack</span><span className="text-fog/50">:</span> <span className="text-fog/50">[</span><span className="text-fog">"react"</span><span className="text-fog/50">,</span> <span className="text-fog">"webgl"</span><span className="text-fog/50">,</span> <span className="text-fog">"motion"</span><span className="text-fog/50">],</span></> },
  { indent: 1, jsx: <><span className="text-fog/70">frameBudget</span><span className="text-fog/50">:</span> <span className="text-ultra">16</span><span className="text-fog/50">,</span> <span className="text-mute2">{"// ms, non-negotiable"}</span></> },
  { indent: 0, jsx: <span className="text-fog/50">{"};"}</span> },
  { indent: 0, jsx: <>&nbsp;</> },
  { indent: 0, jsx: <><span className="text-ultra">export function</span> <span className="text-fog">ship</span><span className="text-fog/50">(</span><span className="text-fog/70">idea</span><span className="text-fog/50">:</span> <span className="text-fog">Idea</span><span className="text-fog/50">) {"{"}</span></> },
  { indent: 1, jsx: <><span className="text-ultra">const</span> <span className="text-fog">product</span> <span className="text-fog/50">=</span> <span className="text-fog">prototype</span><span className="text-fog/50">(</span><span className="text-fog/70">idea</span><span className="text-fog/50">);</span> <span className="text-mute2">{"// days, not weeks"}</span></> },
  { indent: 1, jsx: <><span className="text-ultra">return</span> <span className="text-fog">polish</span><span className="text-fog/50">(</span><span className="text-fog/70">product</span><span className="text-fog/50">,</span> <span className="text-fog/70">aaron</span><span className="text-fog/50">.</span><span className="text-fog/70">frameBudget</span><span className="text-fog/50">);</span></> },
  { indent: 0, jsx: <span className="text-fog/50">{"}"}</span> },
];

const Spark = () => (
  <svg viewBox="0 0 24 24" className="h-[0.6em] w-[0.6em] shrink-0 fill-ultra" aria-hidden="true">
    <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4L12 0z" />
  </svg>
);

export default function Hero({ booted }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>("0px");
  const kicker = useScramble("// DESIGN ENGINEER — INTERFACES, MOTION, WEBGL", booted && inView, 1.15);
  const on = booted && inView;

  return (
    <section id="top" ref={ref} className="relative overflow-hidden bg-ink pt-16 text-fog">
      {/* ambient layers */}
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[46rem] w-[46rem] rounded-full opacity-[0.16] blur-[130px]"
        style={{ background: "radial-gradient(circle, #2b45ff 0%, transparent 62%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-52 bottom-0 h-[34rem] w-[34rem] rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: "radial-gradient(circle, #f2f2ee 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8">
        {/* coordinate strip */}
        <div
          className={`rv ${on ? "rv-in" : ""} flex items-center justify-between border-b border-fog/10 py-4 font-mono text-[10px] uppercase tracking-[0.26em] text-fog/40 sm:text-[11px]`}
        >
          <span className="hidden sm:inline">51.2194° N — 4.4025° E</span>
          <a href="#contact" className="group flex items-center gap-2.5 text-fog/70 transition-colors hover:text-fog">
            <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-ultra" />
            Available Q3 2026 — one slot
          </a>
          <span>Portfolio — Vol.04 / 2026</span>
        </div>

        <div className="grid gap-14 pb-20 pt-12 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
          {/* left — type */}
          <div className={`rv ${on ? "rv-in" : ""} lg:col-span-7`}>
            <p className="min-h-[1.5em] font-mono text-[11px] uppercase tracking-[0.24em] text-ultra sm:text-xs">
              {kicker}
            </p>

            <h1 className="stretch mt-7 font-display text-[13.8vw] font-black uppercase leading-[0.84] tracking-[-0.025em] sm:text-7xl lg:text-[4.6rem] xl:text-[5.6rem] 2xl:text-[6.8rem]">
              <span className="mask-line">
                <span style={{ transitionDelay: "80ms" }} className="text-outline-fog">Creative</span>
              </span>
              <span className="mask-line">
                <span style={{ transitionDelay: "190ms" }}>
                  Developer<span className="text-ultra">.</span>
                </span>
              </span>
            </h1>

            <div className={`rv ${on ? "rv-in" : ""} mt-9 max-w-xl`} style={{ transitionDelay: "420ms" }}>
              <p className="text-base leading-relaxed text-fog/70 sm:text-lg">
                I&rsquo;m <span className="font-semibold text-fog">Aaron Vandenbroeck</span> — an independent
                design engineer building interfaces that hold a 16-millisecond frame budget and a
                much higher standard. Strategy in the brief, shaders in the details.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-3 bg-ultra px-6 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fog transition-colors duration-300 hover:bg-fog hover:text-ink"
                >
                  View selected work
                  <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-[3px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M8 1v13M2.5 9L8 14.5 13.5 9" />
                  </svg>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="link-sweep font-mono text-[11px] uppercase tracking-[0.22em] text-fog/70 transition-colors hover:text-fog"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

            {/* stat strip */}
            <div
              className={`rv ${on ? "rv-in" : ""} mt-14 grid max-w-xl grid-cols-3 divide-x divide-fog/10 border-y border-fog/10`}
              style={{ transitionDelay: "560ms" }}
            >
              {[
                ["09+", "years shipping"],
                ["64", "projects built"],
                ["14", "industry awards"],
              ].map(([v, l]) => (
                <div key={l} className="px-4 py-5 first:pl-0">
                  <p className="stretch font-display text-3xl font-extrabold text-fog sm:text-4xl">
                    {v.replace("+", "")}
                    {v.includes("+") && <span className="text-ultra">+</span>}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/45">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right — code window */}
          <div className="lg:col-span-5">
            <div
              className={`rv ${on ? "rv-in" : ""} relative`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-ultra" aria-hidden="true" />
              <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-ultra" aria-hidden="true" />
              <div className="border border-fog/15 bg-coal/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-fog/10 px-4 py-3">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-fog/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-fog/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-ultra" />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/45">aaron.ts</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/30">UTF-8 · TS</p>
                </div>
                <div className="overflow-x-auto px-5 py-5 font-mono text-[12px] leading-[1.85] sm:text-[12.5px]">
                  {CODE_LINES.map((l, i) => (
                    <div key={i} className="mask-line !pb-0">
                      <span
                        style={{ transitionDelay: `${500 + i * 95}ms` }}
                        className={`${on ? "" : ""} flex whitespace-pre ${i < 6 ? "rv-line" : ""}`}
                      >
                        <span className="mr-4 inline-block w-4 select-none text-right text-fog/20">{i + 1}</span>
                        <span style={{ paddingLeft: `${l.indent * 1.25}em` }} className="whitespace-pre">{l.jsx}</span>
                      </span>
                    </div>
                  ))}
                  <div className="mask-line !pb-0">
                    <span style={{ transitionDelay: `${500 + CODE_LINES.length * 95}ms` }}>
                      <span className="mr-4 inline-block w-4 select-none text-right text-fog/20">{CODE_LINES.length + 1}</span>
                      <span className="blink inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-ultra" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className={`rv ${on ? "rv-in" : ""} mt-6 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-fog/35`} style={{ transitionDelay: "700ms" }}>
              fig. 01 — the entire business plan
            </p>
          </div>
        </div>
      </div>

      {/* marquee */}
      <div className="marquee relative overflow-hidden border-t border-fog/10 bg-coal/60 py-4" aria-hidden="true">
        <div className="marquee-track items-center gap-8 pr-8">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-8">
              {MARQUEE_ITEMS.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center gap-8">
                  <span className="stretch font-display text-2xl font-bold uppercase tracking-tight text-fog/80">
                    {item}
                  </span>
                  <Spark />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
