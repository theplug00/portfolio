import { useEffect, useRef, useState } from "react";
import { FACTS, IMAGES, TESTIMONIALS } from "../data/content";
import { useInView, usePRM } from "../hooks";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

function Stat({ value, label, delay }: { value: number; label: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const prm = usePRM();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (prm) {
      setN(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(2, -10 * p);
      setN(Math.round(value * (p === 1 ? 1 : eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, prm]);

  return (
    <div ref={ref} className={`rv ${inView ? "rv-in" : ""} px-2 py-6 text-center sm:px-4`} style={{ transitionDelay: `${delay}ms` }}>
      <p className="stretch font-display text-4xl font-black tabular-nums text-fog sm:text-5xl">
        {String(n).padStart(2, "0")}
        <span className="text-ultra">+</span>
      </p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog/45">{label}</p>
    </div>
  );
}

const QuoteMark = () => (
  <svg viewBox="0 0 40 32" className="h-8 w-10 fill-ultra" aria-hidden="true">
    <path d="M0 32V19.2C0 8 6.4 1.6 16 0l2.4 5.6C12 7.2 9.6 10.4 9.6 15.2H17V32H0zm23 0V19.2C23 8 29.4 1.6 39 0l1 5.6C33.6 7.2 31.2 10.4 31.2 15.2H40V32H23z" transform="scale(0.98)" />
  </svg>
);

export default function Profile() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const prm = usePRM();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (prm || paused) return;
    timer.current = window.setInterval(() => setIdx((i) => (i + 1) % TESTIMONIALS.length), 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [prm, paused, idx]);

  const t = TESTIMONIALS[idx];

  return (
    <section id="profile" className="relative scroll-mt-16 overflow-hidden bg-ink text-fog">
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 top-20 h-[40rem] w-[40rem] rounded-full opacity-[0.12] blur-[130px]"
        style={{ background: "radial-gradient(circle, #2b45ff 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-32">
        <SectionHead
          dark
          no="03"
          kicker="Profile"
          lines={[{ text: "Human in" }, { text: "the loop.", outline: true }]}
          right="Antwerp, BE — worldwide"
        />

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* portrait */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-ultra" aria-hidden="true" />
              <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-ultra" aria-hidden="true" />
              <div className="overflow-hidden border border-fog/15">
                <img
                  src={IMAGES.portrait}
                  alt="Aaron Vandenbroeck in his Antwerp studio"
                  className="kenburns aspect-[4/5] w-full object-cover"
                />
              </div>
              <p className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-fog/40">
                <span>fig. 02 — the operator</span>
                <span>Antwerp studio, 2026</span>
              </p>
            </div>
          </Reveal>

          {/* bio + facts */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xl leading-relaxed text-fog/85 sm:text-2xl">
                I learned this craft inside studios and scale-ups — Antwerp, Berlin, Amsterdam —
                building campaign sites, trading floors and design systems for teams that measure
                everything. Now I run <span className="font-semibold text-fog">AARON.DEV</span> as a
                one-person engineering practice for clients across four timezones.
              </p>
              <p className="mt-6 max-w-2xl leading-relaxed text-fog/60">
                The pitch is simple: design decisions prototyped in the real medium within days,
                engineering rigour applied where it compounds — types, budgets, tests — and motion
                treated as a material, not a garnish. If it doesn&rsquo;t hold 60fps on your
                customer&rsquo;s five-year-old phone, it isn&rsquo;t finished.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <dl className="divide-y divide-fog/10 border-y border-fog/10">
                {FACTS.map((f) => (
                  <div key={f.k} className="flex items-baseline justify-between gap-6 py-3.5">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog/40">{f.k}</dt>
                    <dd className="text-right font-mono text-[12px] tracking-[0.06em] text-fog/85">{f.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 divide-x divide-fog/10 border border-fog/10 sm:grid-cols-4">
              <Stat value={9} label="years shipping" delay={0} />
              <Stat value={64} label="projects built" delay={90} />
              <Stat value={14} label="industry awards" delay={180} />
              <Stat value={4} label="timezones served" delay={270} />
            </div>
          </div>
        </div>

        {/* testimonials */}
        <Reveal className="mt-24 border-t border-fog/10 pt-12 lg:mt-32">
          <div className="flex items-center justify-between gap-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog/40">
              <span className="text-ultra">(03.2)</span> — Kind words
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIdx((idx + TESTIMONIALS.length - 1) % TESTIMONIALS.length)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center border border-fog/20 text-fog/70 transition-colors hover:border-ultra hover:bg-ultra hover:text-fog"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M13 8H3M7.5 3.5L3 8l4.5 4.5" />
                </svg>
              </button>
              <button
                onClick={() => setIdx((idx + 1) % TESTIMONIALS.length)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center border border-fog/20 text-fog/70 transition-colors hover:border-ultra hover:bg-ultra hover:text-fog"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M3 8h10M8.5 3.5L13 8l-4.5 4.5" />
                </svg>
              </button>
            </div>
          </div>

          <div
            className="mt-10 min-h-[16rem] sm:min-h-[13rem] lg:min-h-[11rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <figure key={idx} className="rise-in">
              <QuoteMark />
              <blockquote className="mt-6 max-w-4xl text-xl leading-snug text-fog sm:text-2xl lg:text-[1.7rem]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="stretch font-display text-lg font-extrabold uppercase tracking-tight text-fog">
                  {t.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog/45">{t.title}</span>
              </figcaption>
            </figure>
          </div>

          <div className="mt-8 flex items-center gap-2" role="tablist" aria-label="Testimonial selector">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-[3px] transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                  i === idx ? "w-12 bg-ultra" : "w-6 bg-fog/20 hover:bg-fog/40"
                }`}
              />
            ))}
            <span className="ml-4 font-mono text-[11px] tabular-nums tracking-[0.2em] text-fog/40">
              0{idx + 1} / 0{TESTIMONIALS.length}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
