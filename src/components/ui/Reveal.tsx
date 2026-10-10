import type { CSSProperties, ReactNode } from "react"
import { useInView } from "../../hooks/useInView"
import "./reveal.css"

/** Fade/slide-in wrapper that triggers when scrolled into view. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const [ref, seen] = useInView<HTMLDivElement>(0.2)
  return (
    <div
      ref={ref}
      className={`rv ${seen ? "rv-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
