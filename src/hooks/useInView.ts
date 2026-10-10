import { useEffect, useRef, useState } from "react"

/**
 * Returns [ref, seen]. `seen` flips to true (once) when the element
 * scrolls into view. Used for reveal-on-scroll and count-up animations.
 */
export function useInView<T extends HTMLElement>(
  threshold = 0.18,
  rootMargin = "0px 0px -6% 0px",
) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])
  return [ref, seen] as const
}
