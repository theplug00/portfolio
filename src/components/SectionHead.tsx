import type { ReactNode } from "react";
import { useInView } from "../hooks";

export type TitleLine = { text: string; outline?: boolean };

type Props = {
  no: string;
  kicker: string;
  lines: TitleLine[];
  right?: ReactNode;
  dark?: boolean;
};

/** Editorial section header: mono index line + oversized display title with line-mask reveal. */
export default function SectionHead({ no, kicker, lines, right, dark = false }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`rv ${inView ? "rv-in" : ""}`}>
      <div
        className={`flex items-end justify-between gap-6 border-t pb-5 pt-4 ${
          dark ? "border-fog/15" : "border-ink/15"
        }`}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.28em]">
          <span className={dark ? "text-ultra" : "text-ultra"}>({no})</span>{" "}
          <span className={dark ? "text-fog/60" : "text-mute"}>— {kicker}</span>
        </p>
        {right && (
          <p
            className={`hidden font-mono text-[11px] uppercase tracking-[0.28em] sm:block ${
              dark ? "text-fog/40" : "text-mute"
            }`}
          >
            {right}
          </p>
        )}
      </div>
      <h2
        className={`stretch mt-8 font-display text-[13.5vw] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] sm:text-6xl lg:text-[4.6rem] 2xl:text-[5.8rem] ${
          dark ? "text-fog" : "text-ink"
        }`}
      >
        {lines.map((l, i) => (
          <span key={l.text} className="mask-line">
            <span
              style={{ transitionDelay: `${i * 110}ms` }}
              className={l.outline ? (dark ? "text-outline-fog" : "text-outline") : ""}
            >
              {l.text}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
