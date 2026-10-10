import type { CSSProperties, ReactNode } from "react"
import { useInView } from "../../hooks/useInView"

/** About-page reveal wrapper (uses the ab-rv / ab-in classes from about.css). */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "article"
}) {
  const [ref, seen] = useInView<HTMLElement>(0.15, "0px 0px -8% 0px")
  const Tag = as as "div"
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`ab-rv ${seen ? "ab-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
