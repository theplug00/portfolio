import { useState } from "react";
import { PROCESS, SERVICES, STACK_GROUPS } from "../data/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const Plus = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    className={`h-5 w-5 shrink-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
      open ? "rotate-45 text-ultra" : "text-ink/50"
    }`}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <path d="M10 2v16M2 10h16" />
  </svg>
);

/** Rotating stamp — the studio mantra. */
const Stamp = () => (
  <div className="relative h-32 w-32" aria-hidden="true">
    <svg viewBox="0 0 100 100" className="spin-slow h-full w-full">
      <defs>
        <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-ink/60 font-mono text-[8.2px] uppercase" style={{ letterSpacing: "0.32em" }}>
        <textPath href="#circ">prototype in the real medium — ship weekly — </textPath>
      </text>
    </svg>
    <svg viewBox="0 0 24 24" className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 fill-ultra">
      <path d="M12 0l2.4 9.6L24 12l-9.6 2.4L12 24l-2.4-9.6L0 12l9.6-2.4L12 0z" />
    </svg>
  </div>
);

function ServiceRow({ s, open, onToggle }: { s: (typeof SERVICES)[number]; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-t border-ink/15 last:border-b">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="row-slide grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-7 text-left hover:bg-mist hover:pl-5 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-6 sm:py-8"
      >
        <span className={`font-mono text-xs tracking-[0.2em] ${open ? "text-ultra" : "text-mute"}`}>({s.index})</span>
        <span
          className={`stretch font-display text-2xl font-extrabold uppercase leading-none tracking-tight transition-colors duration-300 sm:text-4xl lg:text-5xl ${
            open ? "text-ink" : "text-ink/80"
          }`}
        >
          {s.title}
        </span>
        <Plus open={open} />
      </button>
      <div
        className={`grid transition-all duration-600 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-6 pb-9 pl-[3rem] pr-4 sm:pl-[4.5rem] lg:grid-cols-2 lg:gap-12 lg:pr-24">
            <p className="max-w-xl leading-relaxed text-ink/70">{s.body}</p>
            <div className="flex flex-wrap content-start gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="chip-hover rounded-full border border-ink/20 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/70 hover:border-ultra hover:bg-ultra hover:text-fog"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Studio() {
  const [open, setOpen] = useState(0);

  return (
    <section id="studio" className="relative scroll-mt-16 border-t border-ink/10 bg-paper">
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-32">
        <SectionHead
          no="02"
          kicker="Capabilities"
          lines={[{ text: "Five services," }, { text: "one standard.", outline: true }]}
          right="Engineering × Craft"
        />

        {/* expandable services */}
        <Reveal className="mt-16 lg:mt-20">
          {SERVICES.map((s, i) => (
            <ServiceRow key={s.index} s={s} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
          ))}
        </Reveal>

        {/* process — sticky two column */}
        <div className="mt-28 grid gap-14 lg:mt-36 lg:grid-cols-2 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
                <span className="text-ultra">(02.2)</span> — Process
              </p>
              <h3 className="stretch mt-6 font-display text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                From brief
                <br />
                to <span className="text-outline">shipped.</span>
              </h3>
              <p className="mt-6 max-w-md leading-relaxed text-ink/70">
                No black-box phases, no big-reveal theatrics. You watch the product assemble itself
                against a living preview URL — every decision arguable, every week shippable.
              </p>
              <div className="mt-10">
                <Stamp />
              </div>
            </Reveal>
          </div>

          <div>
            {PROCESS.map((p, i) => (
              <Reveal key={p.step} delay={i * 60}>
                <div className="row-slide group border-t border-ink/15 py-10 pl-2 hover:bg-mist hover:pl-6 last:border-b">
                  <div className="flex items-start gap-6 sm:gap-10">
                    <span className="stretch font-display text-6xl font-black leading-none text-outline transition-colors duration-500 group-hover:text-ultra sm:text-7xl" style={{ WebkitTextStroke: undefined }}>
                      {p.step}
                    </span>
                    <div>
                      <h4 className="stretch font-display text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
                        {p.title}
                      </h4>
                      <p className="mt-3 max-w-lg leading-relaxed text-ink/70">{p.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* toolbelt */}
        <Reveal className="mt-28 lg:mt-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-mute">
            <span className="text-ultra">(02.3)</span> — Toolbelt
          </p>
          <div className="mt-8 grid gap-x-10 gap-y-10 border-t border-ink/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {STACK_GROUPS.map((g) => (
              <div key={g.label}>
                <p className="stretch font-display text-lg font-extrabold uppercase tracking-tight text-ink">
                  {g.label}
                  <span className="text-ultra">_</span>
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="chip-hover rounded-full border border-ink/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/70 hover:border-ultra hover:bg-ultra hover:text-fog"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
