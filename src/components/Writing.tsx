import { useState } from "react";
import { POSTS } from "../data/content";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

export default function Writing() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="writing" className="relative scroll-mt-16 border-t border-ink/10 bg-fog">
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 sm:px-8 lg:py-32">
        <SectionHead
          no="04"
          kicker="Writing"
          lines={[{ text: "Notes from" }, { text: "the workbench.", outline: true }]}
          right="Essays · 2025 — 2026"
        />

        <Reveal className="mt-16 lg:mt-20">
          {POSTS.map((post) => {
            const open = openId === post.id;
            return (
              <article key={post.id} className="border-t border-ink/15 last:border-b">
                <button
                  onClick={() => setOpenId(open ? null : post.id)}
                  aria-expanded={open}
                  className="row-slide grid w-full grid-cols-1 items-baseline gap-3 py-7 text-left hover:bg-mist hover:pl-5 sm:grid-cols-[9rem_1fr_auto] sm:gap-8"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute">{post.date}</span>
                  <span>
                    <span
                      className={`stretch block font-display text-2xl font-extrabold uppercase leading-tight tracking-tight transition-colors duration-300 sm:text-3xl lg:text-4xl ${
                        open ? "text-ultra" : "text-ink"
                      }`}
                    >
                      {post.title}
                    </span>
                    <span className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-ink/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-mute"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    className={`hidden h-5 w-5 justify-self-end transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] sm:block ${
                      open ? "rotate-45 text-ultra" : "text-ink/40"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M10 2v16M2 10h16" />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-600 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="max-w-3xl pb-9 sm:pl-[9rem] sm:pr-16">
                      <p className="border-l-2 border-ultra pl-5 leading-relaxed text-ink/70">{post.excerpt}</p>
                      <p className="mt-4 pl-5 font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
                        ~6 min read — full essay ships with the newsletter
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
