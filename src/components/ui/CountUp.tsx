import { useEffect, useState } from "react"

/**
 * Animated counter. Starts when `run` becomes true; respects
 * prefers-reduced-motion. `pad` left-pads with zeros (e.g. 06).
 */
export function CountUp({
  to,
  run,
  suffix = "",
  pad = 0,
  duration = 1400,
}: {
  to: number
  run: boolean
  suffix?: string
  pad?: number
  duration?: number
}) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(to)
      return
    }
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to, duration])
  return (
    <>
      {pad ? String(n).padStart(pad, "0") : n}
      {suffix}
    </>
  )
}
