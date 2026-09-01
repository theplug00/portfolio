import { useState, type FormEvent } from "react";
import { EMAIL, NAV_LINKS, SOCIALS } from "../data/content";
import { useClock } from "../hooks";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const BUDGETS = ["< €5K", "€5–15K", "€15–40K", "€40K+"];

type Errors = { name?: string; email?: string; message?: string };

export default function Contact() {
  const time = useClock("Europe/Brussels");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "required — who am I writing back to?";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "required — a valid address";
    if (form.message.trim().length < 10) next.message = "give me at least a sentence";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1100);
  };

  const field =
    "w-full border border-fog/15 bg-transparent px-4 py-3.5 font-mono text-[13px] text-fog placeholder:text-fog/30 transition-colors duration-300 focus:border-ultra focus:outline-none";

  return (
    <section id="contact" className="relative scroll-mt-16 overflow-hidden bg-ink text-fog">
      <div className="bg-blueprint-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -bottom-56 -right-40 h-[46rem] w-[46rem] rounded-full opacity-[0.14] blur-[130px]"
        style={{ background: "radial-gradient(circle, #2b45ff 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 pb-10 pt-24 sm:px-8 lg:pt-32">
        <SectionHead
          dark
          no="05"
          kicker="Contact"
          lines={[{ text: "Let’s build" }, { text: "something rare.", outline: true }]}
          right="Replies within 48h"
        />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          {/* left — direct lines */}
          <div className="lg:col-span-6">
            <Reveal>
              <p className="max-w-xl text-lg leading-relaxed text-fog/70 sm:text-xl">
                One slot opens in <span className="font-semibold text-fog">Q3 2026</span>. If you
                have a product that deserves better than a template — a dashboard, a storefront, an
                experience — tell me what it should feel like.
              </p>
            </Reveal>

            <Reveal delay={120} className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/40">Email — fastest route</p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="link-sweep font-mono text-xl tracking-tight text-fog sm:text-2xl"
                >
                  {EMAIL}
                </a>
                <button
                  onClick={copy}
                  className={`border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
                    copied
                      ? "border-ultra bg-ultra text-fog"
                      : "border-fog/25 text-fog/70 hover:border-ultra hover:text-fog"
                  }`}
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </Reveal>

            <Reveal delay={200} className="mt-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/40">Elsewhere</p>
              <ul className="mt-3 divide-y divide-fog/10 border-y border-fog/10">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="row-slide group flex items-center justify-between gap-6 py-4 hover:bg-fog/5 hover:pl-4"
                    >
                      <span className="stretch font-display text-xl font-extrabold uppercase tracking-tight text-fog/85 transition-colors group-hover:text-fog sm:text-2xl">
                        {s.label}
                      </span>
                      <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.12em] text-fog/45">
                        {s.handle}
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-fog/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ultra" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M3 13L13 3M5.5 3H13v7.5" />
                        </svg>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={260} className="mt-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fog/55">
              <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-ultra" />
              Studio time — Antwerp {time}
            </Reveal>
          </div>

          {/* right — form */}
          <Reveal delay={140} className="lg:col-span-6">
            <div className="relative border border-fog/15 bg-coal/70 p-6 backdrop-blur-sm sm:p-9">
              <div className="absolute -left-3 -top-3 h-6 w-6 border-l-2 border-t-2 border-ultra" aria-hidden="true" />
              <div className="absolute -bottom-3 -right-3 h-6 w-6 border-b-2 border-r-2 border-ultra" aria-hidden="true" />

              {status === "sent" ? (
                <div className="rise-in py-10 text-center">
                  <p className="font-mono text-sm text-ultra">&gt; transmission received_</p>
                  <p className="stretch mt-6 font-display text-3xl font-extrabold uppercase leading-tight text-fog sm:text-4xl">
                    Talk soon, {form.name.split(" ")[0] || "friend"}.
                  </p>
                  <p className="mx-auto mt-4 max-w-sm font-mono text-[12px] leading-relaxed text-fog/55">
                    Expect a reply within 48 hours — usually faster. Meanwhile, the coffee machine
                    has been notified.
                  </p>
                  <button
                    onClick={() => {
                      setForm({ name: "", email: "", budget: "", message: "" });
                      setStatus("idle");
                    }}
                    className="mt-8 border border-fog/25 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70 transition-colors hover:border-ultra hover:text-fog"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate>
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/40">
                    Project brief — 60 seconds
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cf-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog/50">
                        Name *
                      </label>
                      <input
                        id="cf-name"
                        className={`${field} ${errors.name ? "border-ultra" : ""}`}
                        placeholder="Ada Lovelace"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                      {errors.name && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ultra">▲ {errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="cf-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog/50">
                        Email *
                      </label>
                      <input
                        id="cf-email"
                        type="email"
                        className={`${field} ${errors.email ? "border-ultra" : ""}`}
                        placeholder="ada@company.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                      {errors.email && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ultra">▲ {errors.email}</p>}
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/50">Budget range</p>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm({ ...form, budget: form.budget === b ? "" : b })}
                          aria-pressed={form.budget === b}
                          className={`chip-hover rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.1em] ${
                            form.budget === b
                              ? "border-ultra bg-ultra text-fog"
                              : "border-fog/20 text-fog/60 hover:border-fog/50 hover:text-fog"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label htmlFor="cf-msg" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog/50">
                      The project *
                    </label>
                    <textarea
                      id="cf-msg"
                      rows={5}
                      className={`${field} resize-none ${errors.message ? "border-ultra" : ""}`}
                      placeholder="What are we building, and what should it feel like?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                    {errors.message && <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ultra">▲ {errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group mt-7 flex w-full items-center justify-center gap-3 bg-ultra px-6 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-fog transition-colors duration-300 hover:bg-fog hover:text-ink disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        Sending
                        <span className="blink inline-block h-[0.9em] w-[0.5em] bg-fog" />
                      </>
                    ) : (
                      <>
                        Transmit brief
                        <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M3 13L13 3M5.5 3H13v7.5" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-fog/35">
                    No retainers pitched · no decks requested · humans only
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* footer */}
        <footer className="mt-24 border-t border-fog/10 pt-10 lg:mt-32">
          <div
            className="select-none overflow-hidden"
            aria-hidden="true"
          >
            <p className="text-outline-fog stretch-max whitespace-nowrap font-display text-[17.5vw] font-black uppercase leading-[0.82] tracking-[-0.02em] opacity-70 transition-transform duration-[1.2s] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:translate-x-[-2%]">
              Aaron.dev
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-6 border-t border-fog/10 py-8 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fog/40">
              © 2026 Aaron Vandenbroeck — Antwerp, BE
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>Designed &amp; built by hand · React, Vite, Tailwind
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link-sweep font-mono text-[10px] uppercase tracking-[0.2em] text-fog/55 hover:text-fog">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex w-fit items-center gap-2 border border-fog/20 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60 transition-colors hover:border-ultra hover:bg-ultra hover:text-fog"
            >
              Back to top
              <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 13V3M3.5 7L8 2.5 12.5 7" />
              </svg>
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
