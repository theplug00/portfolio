import type { CSSProperties, ReactNode } from "react";
import { useInView } from "../hooks";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

/** Scroll-reveal wrapper — fades / rises content in once, honoring reduced motion via CSS. */
export default function Reveal({ children, className = "", delay = 0, id }: Props) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}ms` }
    : undefined;
  return (
    <div
      id={id}
      ref={ref}
      style={style}
      className={`rv ${inView ? "rv-in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
