import { useEffect, useRef, useState } from "react"
import type { CSSProperties, PointerEvent as RPointerEvent, ReactNode } from "react"
import "./mentalpage.css"
import imgHero from "../../assets/mental/hero-wide.jpg"
import imgWoman from "../../assets/mental/hero.jpg"
import imgBrain from "../../assets/mental/project-ai.jpg"
import imgWorkers from "../../assets/mental/project-workers.jpg"
import imgFallbackA from "../../assets/fallbacks/postpartum.png"
import imgFallbackB from "../../assets/fallbacks/flow-insight.jpg"

/* ------------------------------------------------------------------
   Mental health: dedicated page.
   Calm, warm, light design with its own look. Section order matches the
   other Tools pages: hero, focus areas, applied research, selected
   studies, closing. All selectors are prefixed mp- and scoped to .mp.
   No pictogram icons and no decorative rules.
------------------------------------------------------------------- */

export type MpTopic = {
  number: string
  title: string
  subtitle: string
  detail: string
  image: string
  tags: string[]
  context: string
  link?: string
}
export type MpProject = { title: string; text: string; tags: string[]; alt: string }
export type MpOther = { key: string; label: string; path: string; lead: string; count: number; fallback: string }

/* wording follows the DASHRES group profile document */
const funded = [
  {
    year: "2025",
    title:
      "Statistical Synthesis and Computational Approaches in Nursing: Applications in Healthcare Practice and Education with a Focus on Pediatric, Mental, Women's, and Community Health",
    role: "Principal investigator",
    who: "Dr. Darin Mansor Mathkor",
    funder: "Jazan University",
  },
  {
    year: "2022",
    title: "A critical pooled appraisal of the impact of COVID‑19 pandemic on the mental health of Saudi Nurses",
    role: "Principal investigator",
    who: "Dr. Darin Mansor Mathkor",
    funder: "Jazan University",
  },
  {
    year: "2022",
    title:
      "Anxiety, readiness, coping strategies and economic challenges because of COVID‑19 outbreak among dentists of Hail province of Saudi Arabia",
    role: "Co-investigator",
    who: "Prof. Shafiul Haque",
    funder: "University of Ha'il",
  },
]

/* ---------- helpers ---------- */
const reducedMotion = () =>
  typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches

const go = (path: string) => {
  window.history.pushState({}, "", path)
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
}

const jump = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function Arrow({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "article"
}) {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -5% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const T = Tag as "div"
  return (
    <T
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`mp-rv ${seen ? "mp-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </T>
  )
}

function Photo({ src, fallback, alt = "" }: { src: string; fallback: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        if (e.currentTarget.src !== new URL(fallback, window.location.href).href) e.currentTarget.src = fallback
      }}
    />
  )
}

function Head({ tag, title, note, dark }: { tag: string; title: ReactNode; note?: string; dark?: boolean }) {
  return (
    <Reveal className={`mp-head ${dark ? "mp-head-dark" : ""}`}>
      <div>
        <span className="mp-tag">{tag}</span>
        <h2>{title}</h2>
      </div>
      {note && <p>{note}</p>}
    </Reveal>
  )
}

/** writes --py (-1..1) on every [data-par] element while it scrolls through the viewport */
function useScrollVars(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current
    if (!el || reducedMotion()) return
    let raf = 0
    const update = () => {
      raf = 0
      const vh = window.innerHeight
      el.querySelectorAll<HTMLElement>("[data-par]").forEach((n) => {
        const r = n.getBoundingClientRect()
        if (r.bottom < -80 || r.top > vh + 80) return
        const p = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh))
        n.style.setProperty("--py", p.toFixed(3))
      })
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", on, { passive: true })
    window.addEventListener("resize", on)
    return () => {
      window.removeEventListener("scroll", on)
      window.removeEventListener("resize", on)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [root])
}

/* ==================================================================
   1. HERO
================================================================== */
function Hero({ featured }: { featured: string }) {
  const root = useRef<HTMLElement>(null)

  const onMove = (e: RPointerEvent<HTMLElement>) => {
    const el = root.current
    if (!el || reducedMotion() || e.pointerType === "touch") return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }

  return (
    <section className="mp-hero" ref={root} onPointerMove={onMove} aria-label="Mental health research">
      <div className="mp-blobs" aria-hidden="true">
        <i className="a" />
        <i className="b" />
        <i className="c" />
      </div>

      <div className="container mp-hero-grid">
        <div className="mp-hero-copy">
          <span className="mp-tag mp-hero-tag">Mental health research</span>
          <h1>
            <span className="mp-ln" style={{ "--d": ".1s" } as CSSProperties}>
              <span>Mental health</span>
            </span>
            <span className="mp-ln" style={{ "--d": ".26s" } as CSSProperties}>
              <span>
                <em>research.</em>
              </span>
            </span>
          </h1>
          <p className="mp-lead">
            We combine laboratory neuroscience, behavioral science and machine learning to study mental health conditions.
          </p>
          <div className="mp-actions">
            <a href="#mp-projects" className="mp-btn mp-btn-ink" onClick={jump("mp-projects")}>
              Explore our projects <Arrow />
            </a>
            <a href="#mp-study" className="mp-btn mp-btn-ghost" onClick={jump("mp-study")}>
              What we study
            </a>
          </div>
        </div>

        <div className="mp-visual" aria-hidden="true">
          <i className="mp-ring r1" />
          <i className="mp-ring r2" />
          <i className="mp-ring r3" />
          <div className="mp-arch">
            <img src={imgHero} alt="" />
          </div>
          <div className="mp-orb o1">
            <img src={imgBrain} alt="" />
          </div>
          <div className="mp-orb o2">
            <img src={imgWoman} alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   2. WHAT WE STUDY: tinted panels with arch photos
================================================================== */
function Study({ topics }: { topics: MpTopic[] }) {
  const tints = ["#e6edff", "#fff0e6"]
  const fallbacks = [imgFallbackA, imgFallbackB]
  return (
    <section id="mp-study" className="mp-section mp-study">
      <div className="container">
        <Head
          tag="Focus areas"
          title={
            <>
              What we <em>study.</em>
            </>
          }
          note="Research focus areas within mental health. These are overviews, not diagnostic tools."
        />
        <div className="mp-panels">
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={i * 120} className="mp-panel-slot">
              <article className={`mp-panel ${i % 2 ? "mp-flip" : ""}`} style={{ "--tint": tints[i % 2] } as CSSProperties}>
                <div className="mp-panel-photo" data-par>
                  <div className="mp-arch-sm">
                    <Photo src={t.image} fallback={fallbacks[i % 2]} alt={`${t.title} research illustration`} />
                  </div>
                  <span className="mp-panel-no">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="mp-panel-copy">
                  <span className="mp-kicker">{t.subtitle}</span>
                  <h3>{t.title}</h3>
                  <p>{t.detail}</p>
                  <ul className="mp-tags">
                    {t.tags.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <p className="mp-context">{t.context}</p>
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mp-btn mp-btn-ink mp-panel-link"
                    >
                      Visit {t.title.replace(/^.*\(([^)]+)\)$/, "$1")} site <Arrow />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   3. APPLIED RESEARCH (dark band)
================================================================== */
function Applied({ projects }: { projects: MpProject[] }) {
  const imgs = [imgBrain, imgWorkers]
  return (
    <section id="mp-projects" className="mp-section mp-applied">
      <div className="mp-applied-glow" aria-hidden="true" />
      <div className="container">
        <Head
          dark
          tag="Our projects"
          title={
            <>
              Applied <em>research.</em>
            </>
          }
          note="Research that applies AI and evidence synthesis to mental health questions."
        />
        <div className="mp-pgrid">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 140} className="mp-pslot">
              <article className="mp-pcard">
                <div className="mp-pimg">
                  <img src={imgs[i % imgs.length]} alt={p.alt} loading="lazy" />
                  <span>Project {String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="mp-pbody">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <ul className="mp-tags">
                    {p.tags.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                  <a
                    href="/projects"
                    className="mp-btn mp-btn-soft"
                    onClick={(e) => {
                      e.preventDefault()
                      go("/projects")
                    }}
                  >
                    View project <Arrow />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   4. SELECTED STUDIES
================================================================== */
function StudyRow({ f, i }: { f: (typeof funded)[number]; i: number }) {
  const lead = f.role.toLowerCase().startsWith("principal")
  return (
    <li className={`mp-card${i === 0 ? " mp-card-lead" : ""}`}>
      <Reveal delay={i * 110} className="mp-card-in">
        <div className="mp-card-top">
          <span className="mp-card-year">{f.year}</span>
          <b className={lead ? "mp-role" : "mp-role mp-role-co"}>{f.role}</b>
        </div>
        <h3>{f.title}</h3>
        <div className="mp-card-foot">
          <div>
            <small>Investigator</small>
            <strong>{f.who}</strong>
          </div>
          <div>
            <small>Funded by</small>
            <strong>{f.funder}</strong>
          </div>
        </div>
      </Reveal>
    </li>
  )
}

function Studies() {
  return (
    <section className="mp-section mp-studies">
      <div className="container">
        <Head
          tag="Funded research"
          title={
            <>
              Selected <em>studies.</em>
            </>
          }
          note="University-funded studies from our group that address mental health."
        />
        <ol className="mp-cards">
          {funded.map((f, i) => (
            <StudyRow key={f.title} f={f} i={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ==================================================================
   5. CLOSING
================================================================== */
function Closing({ next }: { next?: MpOther }) {
  return (
    <section className="mp-cta">
      <div className="mp-cta-blobs" aria-hidden="true">
        <i className="a" />
        <i className="b" />
      </div>
      <div className="container">
        <div className="mp-cta-grid">
          <Reveal>
            <span className="mp-tag">Collaboration</span>
            <h2>
              Collaborate with <em>our group.</em>
            </h2>
            <p>We welcome collaboration with researchers, clinicians, students and institutions.</p>
            <div className="mp-actions">
              <a
                href="/projects"
                className="mp-btn mp-btn-ink"
                onClick={(e) => {
                  e.preventDefault()
                  go("/projects")
                }}
              >
                View our projects
              </a>
            </div>
          </Reveal>
          {next && (
            <Reveal delay={150} className="mp-next-slot">
              <a
                href={next.path}
                className="mp-next"
                onClick={(e) => {
                  e.preventDefault()
                  go(next.path)
                }}
              >
                <span>Continue exploring</span>
                <strong>{next.label}</strong>
                <em>{next.lead}</em>
                <i aria-hidden="true">
                  <Arrow />
                </i>
              </a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   PAGE
================================================================== */
export default function MentalHealthPage({
  topics,
  projects,
  others,
}: {
  topics: MpTopic[]
  projects: MpProject[]
  others?: MpOther[]
  nav?: ReactNode
}) {
  const root = useRef<HTMLDivElement>(null)
  useScrollVars(root)
  return (
    <div className="mp" ref={root}>
      <Hero featured={projects[0]?.title ?? "AI for Psychological Health"} />
      <Study topics={topics} />
      <Applied projects={projects} />
      <Studies />
      <Closing next={others?.[0]} />
    </div>
  )
}