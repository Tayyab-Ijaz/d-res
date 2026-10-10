import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import "./maternalpage.css"

export type McTopic = {
  title: string
  subtitle: string
  detail: string
  context: string
  tags: string[]
  project?: string
}
type Pic = [string, string] // [photo, local fallback]

const go = (path: string) => {
  window.history.pushState({}, "", path)
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
}

const Arrow = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Photo = ({ pic, className }: { pic: Pic; className?: string }) => (
  <img
    src={pic[0]}
    alt=""
    className={className}
    loading="lazy"
    onError={(e) => {
      if (e.currentTarget.src !== pic[1]) e.currentTarget.src = pic[1]
    }}
  />
)

/* reveal on scroll */
function Rv({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`mc-rv ${seen ? "mc-in" : ""} ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}

/* headline: words rise out of a mask */
const Words = ({ text, start = 0.15, em }: { text: string; start?: number; em?: boolean }) => (
  <>
    {text.split(" ").map((w, i) => (
      <span key={i}>
        <span className="mc-w">
          <span style={{ "--d": `${start + i * 0.09}s` } as CSSProperties}>{em ? <em>{w}</em> : w}</span>
        </span>{" "}
      </span>
    ))}
  </>
)

const jump = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

/* ---------- hero ---------- */
function Hero({ photos, hero }: { photos: Pic[]; hero: Pic }) {
  const root = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0, visible = true
    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2
      ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    const loop = () => {
      x += (tx - x) * 0.06
      y += (ty - y) * 0.06
      if (visible) {
        el.style.setProperty("--mx", x.toFixed(3))
        el.style.setProperty("--my", y.toFixed(3))
      }
      raf = requestAnimationFrame(loop)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(el)
    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
    }
  }, [])

  const [a, b] = [photos[0] ?? hero, photos[1] ?? hero]
  return (
    <>
      <section className={`mc-hero ${ready ? "mc-ready" : ""}`} ref={root} aria-label="Maternal and child health">
        <div className="mc-glow" aria-hidden="true"><i /><i /><i /></div>
        <div className="mc-bubbles" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => <i key={i} style={{ "--i": i } as CSSProperties} />)}
        </div>

        <div className="container mc-hero-grid">
          <div className="mc-hero-copy">
            <a href="/tools" className="mc-crumb" onClick={(e) => { e.preventDefault(); go("/tools") }}>
              Research tools <i>/</i> Maternal &amp; child health
            </a>
            <h1>
              <span className="mc-line"><Words text="Maternal and" start={0.15} /></span>
              <span className="mc-line"><Words text="child health." start={0.4} em /></span>
            </h1>
            <p className="mc-lead">
              Research on the health of mothers, infants and children, including AI in pediatric nursing and developmental screening.
            </p>
            <div className="mc-actions">
              <a href="#mc-focus" className="mc-btn" onClick={jump("mc-focus")}>Explore focus areas <Arrow /></a>
            </div>
          </div>

          <div className="mc-collage" aria-hidden="true">
            <span className="mc-ring mc-ring-1" />
            <span className="mc-ring mc-ring-2" />
            <div className="mc-pic mc-pic-main"><Photo pic={hero} /></div>
            <div className="mc-pic mc-pic-a"><Photo pic={a} /></div>
            <div className="mc-pic mc-pic-b"><Photo pic={b} /></div>
            <span className="mc-chip mc-chip-1"><u />Pediatric nursing AI</span>
            <span className="mc-chip mc-chip-2"><u />Early childhood screening</span>
            <span className="mc-dot mc-dot-1" />
            <span className="mc-dot mc-dot-2" />
          </div>
        </div>

        <svg className="mc-ecg" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
          <path
            pathLength={1}
            d="M0 70 H210 l14-8 l14 8 H330 l12 8 l16-58 l18 92 l16-60 l10 26 H560 l14-10 l14 10 H760 l12 8 l16-58 l18 92 l16-60 l10 26 H1010 l14-10 l14 10 H1180 l12 8 l16-58 l18 92 l16-60 l10 26 H1440"
          />
        </svg>
      </section>
    </>
  )
}

/* ---------- focus areas ---------- */
function Focus({ topics, photos, fallback }: { topics: McTopic[]; photos: Pic[]; fallback: string }) {
  return (
    <section id="mc-focus" className="mc-focus">
      <div className="container">
        {topics.map((t, i) => {
          const [grant, status] = (t.project ?? "").split(" · ")
          const pic = photos[i % photos.length] ?? ([fallback, fallback] as Pic)
          return (
            <article key={t.title} className={`mc-case ${i % 2 ? "mc-flip" : ""}`}>
              <Rv className="mc-case-media">
                <div className="mc-media-pin">
                  <span className="mc-blob" aria-hidden="true" />
                  <div className="mc-frame">
                    <Photo pic={pic} />
                    <span className="mc-frame-shade" aria-hidden="true" />
                    <span className="mc-frame-tag"><b>0{i + 1}</b>{t.subtitle}</span>
                  </div>
                  <span className="mc-pulse" aria-hidden="true"><i /><i /><i /></span>
                </div>
              </Rv>

              <div className="mc-case-body">
                <Rv>
                  <span className="mc-kicker"><i />0{i + 1} · {t.subtitle}</span>
                  <h2>{t.title}</h2>
                  <p className="mc-detail">{t.detail}</p>
                </Rv>
                <Rv delay={80}>
                  <ol className="mc-rows">
                    {t.tags.map((x, k) => (
                      <li key={x}>
                        <span>0{k + 1}</span>
                        <strong>{x}</strong>
                        <Arrow size={15} />
                      </li>
                    ))}
                  </ol>
                </Rv>
                <Rv delay={140}>
                  <p className="mc-note">{t.context}</p>
                  {t.project && (
                    <div className="mc-ticket">
                      <span className="mc-ticket-k">Funded</span>
                      <span className="mc-ticket-v">{grant}</span>
                      {status && <em><u />{status}</em>}
                    </div>
                  )}
                </Rv>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default function MaternalPage(props: {
  topics: McTopic[]
  photos: Pic[]
  hero: Pic
  campus: Pic
  next: { label: string; path: string }
}) {
  const { topics, photos, hero, campus, next } = props
  return (
    <div className="mc">
      <Hero photos={photos} hero={hero} />
      <Focus topics={topics} photos={photos} fallback={hero[1]} />
      <section className="mc-next">
        <Photo pic={campus} />
        <a href={next.path} className="container mc-next-in" onClick={(e) => { e.preventDefault(); go(next.path) }}>
          <span>Continue exploring</span><strong>{next.label}</strong><i><Arrow /></i>
        </a>
      </section>
    </div>
  )
}
