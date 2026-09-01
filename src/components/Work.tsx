import { useEffect, useState } from "react";
import { PROJECTS, type Project } from "../data/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const ArrowNE = ({ className = "h-3.5 w-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M3 13L13 3M5.5 3H13v7.5" />
  </svg>
);

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="chip-hover rounded-full border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70 hover:border-ultra hover:bg-ultra hover:text-fog">
      {children}
    </span>
  );
}

function CaseCard({
  p,
  onOpen,
  delay,
  featured,
}: {
  p: Project;
  onOpen: () => void;
  delay: number;
  featured?: boolean;
}) {
  return (
    <Reveal delay={delay}>
      <button
        onClick={onOpen}
        className="group/card block w-full text-left"
        aria-label={`Open case study: ${p.title}`}
      >
        <div className={`relative overflow-hidden bg-ink ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          <img
            src={p.cover}
            alt={`${p.title} — ${p.category}`}
            loading="lazy"
            className="img-zoom h-full w-full object-cover opacity-95"
          />
          <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover/card:bg-ink/20" />
          <span className="absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.22em] text-fog/90 mix-blend-difference">
            ({p.index})
          </span>
          <span className="absolute bottom-4 right-4 flex translate-y-2 items-center gap-2 bg-ultra px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog opacity-0 transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/card:translate-y-0 group-hover/card:opacity-100">
            Open case <ArrowNE className="h-3 w-3" />
          </span>
        </div>
        <div className={`mt-5 flex items-start justify-between gap-6 ${featured ? "lg:items-end" : ""}`}>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className={`stretch font-display font-extrabold uppercase leading-none text-ink ${featured ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"}`}>
                {p.title}
              </h3>
              <span className="font-mono text-[11px] tracking-[0.18em] text-mute">{p.year}</span>
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{p.category}</p>
            {featured && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">{p.summary}</p>
            )}
          </div>
          <ArrowNE className="mt-1 h-5 w-5 shrink-0 text-ink/40 transition-all duration-400 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-1 group-hover/card:translate-x-1 group-hover/card:text-ultra" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </button>
    </Reveal>
  );
}

function CaseModal({
  p,
  onClose,
  onPrev,
  onNext,
}: {
  p: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="overlay-in fixed inset-0 z-[100] overflow-y-auto bg-coal/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Case study: ${p.title}`}
    >
      <div
        className="rise-in mx-auto my-[4vh] w-[min(1060px,94vw)] bg-fog text-ink shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* modal header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-fog/95 px-6 py-4 backdrop-blur-sm sm:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-mute">
            Case <span className="text-ultra">({p.index})</span> — {p.client}
          </p>
          <button
            onClick={onClose}
            aria-label="Close case study"
            className="group flex h-10 w-10 items-center justify-center border border-ink/15 transition-colors hover:border-ultra hover:bg-ultra"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink transition-colors group-hover:text-fog" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-10 sm:px-10 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h3 className="stretch font-display text-5xl font-black uppercase leading-[0.9] text-ink sm:text-7xl">
              {p.title}
              <span className="text-ultra">.</span>
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">
              {p.year} · {p.role}
            </p>
          </div>

          <div className="mt-8 overflow-hidden bg-ink">
            <img src={p.cover} alt={`${p.title} interface`} className="kenburns h-full w-full object-cover" />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <dl className="divide-y divide-ink/10 border-y border-ink/10 font-mono text-[12px]">
                {[
                  ["Client", p.client],
                  ["Year", p.year],
                  ["Category", p.category],
                  ["Role", p.role],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-3">
                    <dt className="uppercase tracking-[0.18em] text-mute">{k}</dt>
                    <dd className="text-right text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <p className="text-xl leading-relaxed text-ink sm:text-2xl">{p.summary}</p>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-ultra">The challenge</p>
              <p className="mt-3 leading-relaxed text-ink/75">{p.challenge}</p>

              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-ultra">What I built</p>
              <ul className="mt-3 space-y-4">
                {p.solution.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="stretch shrink-0 font-display text-lg font-extrabold text-ultra">0{i + 1}</span>
                    <span className="leading-relaxed text-ink/75">{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 grid grid-cols-3 divide-x divide-ink/10 border-y border-ink/10">
                {p.metrics.map((m) => (
                  <div key={m.label} className="px-4 py-6 first:pl-0">
                    <p className="stretch font-display text-3xl font-black text-ink sm:text-4xl">{m.value}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-mute">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* modal footer nav */}
          <div className="mt-12 flex items-center justify-between border-t border-ink/10 pt-6">
            <button
              onClick={onPrev}
              className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-ink"
            >
              <ArrowNE className="h-3.5 w-3.5 -rotate-[135deg] transition-transform group-hover:-translate-x-1" />
              Prev case
            </button>
            <p className="font-mono text-[11px] tracking-[0.2em] text-mute">
              {p.index} / 0{PROJECTS.length}
            </p>
            <button
              onClick={onNext}
              className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-ink"
            >
              Next case
              <ArrowNE className="h-3.5 w-3.5 rotate-45 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [sel, setSel] = useState<number | null>(null);
  const [featured, ...rest] = PROJECTS;

  return (
    <section id="work" className="relative scroll-mt-16 bg-fog">
      <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-32">
        <SectionHead
          no="01"
          kicker="Selected work"
          lines={[{ text: "Cases that" }, { text: "shipped.", outline: true }]}
          right="2019 — 2026 · 06 projects"
        />

        {/* featured case */}
        <div className="mt-20">
          <CaseCard p={featured} onOpen={() => setSel(0)} delay={0} featured />
        </div>

        {/* editorial staggered grid */}
        <div className="mt-24 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-28">
          {rest.map((p, i) => (
            <div key={p.id} className={i % 2 === 1 ? "md:translate-y-20" : ""}>
              <CaseCard p={p} onOpen={() => setSel(i + 1)} delay={i % 2 === 0 ? 0 : 120} />
            </div>
          ))}
        </div>

        <Reveal className="mt-32 flex justify-center md:mt-44" delay={100}>
          <button
            onClick={() => setSel(0)}
            className="group inline-flex items-center gap-3 border border-ink/25 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:border-ultra hover:bg-ultra hover:text-fog"
          >
            Replay from case 01
            <ArrowNE className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </Reveal>
      </div>

      {sel !== null && (
        <CaseModal
          p={PROJECTS[sel]}
          onClose={() => setSel(null)}
          onPrev={() => setSel((s) => (s! + PROJECTS.length - 1) % PROJECTS.length)}
          onNext={() => setSel((s) => (s! + 1) % PROJECTS.length)}
        />
      )}
    </section>
  );
}
