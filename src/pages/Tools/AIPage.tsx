import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties, PointerEvent as RPointerEvent, ReactNode } from "react"
import "./aipage.css"
import { CountUp } from "../../components/ui/CountUp"
import type { Project } from "../../data/projects"
import imgHeroMain from "../../assets/home/hero-3.jpg"
import imgSide from "../../assets/home/area-bioinformatics.jpg"
import imgStageData from "../../assets/home/area-diagnostics.jpg"
import imgStageMethods from "../../assets/home/journey-discovery.jpg"
import imgStageInsight from "../../assets/home/journey-evidence.jpg"
import imgStageImpact from "../../assets/home/journey-impact.jpg"

/* ------------------------------------------------------------------
   AI & bioinformatics: dedicated page.
   All selectors live under .ai (prefix ai-) in aipage.css, so no other
   page is affected. No pictogram icons: type, photographs, colour and
   motion carry the design.
------------------------------------------------------------------- */

export type AiTopic = {
  number: string
  title: string
  subtitle: string
  detail: string
  image: string
  tags: string[]
  context: string
}

type Props = {
  topics: AiTopic[]
  projects: Project[]
  hero: [string, string]
  fallback: string
  campus: string
  next: { label: string; path: string }
}

/* ---------- content (grounded in the group profile) ---------- */
const stages = [
  {
    n: "01",
    title: "Data",
    sub: "Clinical, genomic and environmental data",
    text: "Molecular and clinical datasets are the starting point for every analysis we run.",
    img: imgStageData,
    pos: "50% 40%",
  },
  {
    n: "02",
    title: "Computational methods",
    sub: "AI/ML, statistics and bioinformatics",
    text: "Integrated multi-omics analysis, structure-guided drug discovery and interpretable machine learning.",
    img: imgStageMethods,
    pos: "50% 35%",
  },
  {
    n: "03",
    title: "Biological and health insight",
    sub: "Biomarkers, mechanisms and risk prediction",
    text: "Candidate biomarkers and therapeutic targets, including work on pancreatic cancer and gliomas.",
    img: imgStageInsight,
    pos: "50% 50%",
  },
  {
    n: "04",
    title: "Clinical and public health application",
    sub: "Better decisions, healthier communities",
    text: "Explainable outputs that can inform clinical and public health decision support, such as adolescent vaccination uptake.",
    img: imgStageImpact,
    pos: "50% 18%",
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

/** true once the element has entered the viewport (one-shot) */
function useSeen<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
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
      { threshold: Math.min(threshold, 0.05), rootMargin: "0px 0px -5% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

/** live "is on screen" flag (not one-shot) */
function useOnScreen<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") return
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, on] as const
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const [ref, seen] = useSeen<HTMLDivElement>()
  return (
    <div ref={ref} className={`ai-rv ${seen ? "ai-in" : ""} ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}

function Photo({ src, fallback, alt = "" }: { src: string; fallback: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={(e) => {
        if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback
      }}
    />
  )
}

/* ==================================================================
   1. HERO
================================================================== */
function Hero({ topics, projects, hero }: Pick<Props, "topics" | "projects" | "hero">) {
  const root = useRef<HTMLElement>(null)
  const [i, setI] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 650)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (reducedMotion() || topics.length < 2) return
    const id = setInterval(() => setI((v) => (v + 1) % topics.length), 3600)
    return () => clearInterval(id)
  }, [topics.length])

  const onMove = (e: RPointerEvent<HTMLElement>) => {
    const el = root.current
    if (!el || reducedMotion()) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }

  const since = projects.length ? Math.min(...projects.map((p) => p.year)) : null
  const active = topics[i] ?? topics[0]

  return (
    <section className="ai-hero" ref={root} onPointerMove={onMove} aria-label="AI and bioinformatics">
      <div className="ai-aurora" aria-hidden="true">
        <i className="a" />
        <i className="b" />
        <i className="c" />
      </div>
      <div className="ai-dots" aria-hidden="true" />

      <div className="container ai-hero-grid">
        <div className="ai-hero-copy">
          <a
            href="/tools"
            className="ai-crumb"
            onClick={(e) => {
              e.preventDefault()
              go("/tools")
            }}
          >
            Research tools <b>/</b> AI &amp; bioinformatics
          </a>
          <h1>
            <span className="ai-ln" style={{ "--d": ".1s" } as CSSProperties}>
              <span>AI and</span>
            </span>
            <span className="ai-ln" style={{ "--d": ".26s" } as CSSProperties}>
              <span>
                <em>bioinformatics.</em>
              </span>
            </span>
          </h1>
          <p className="ai-lead">
            Multi-omics discovery and interpretable machine learning applied to molecular and clinical data, from candidate biomarkers to decisions that
            can be explained.
          </p>
          <div className="ai-actions">
            <a href="#ai-focus" className="ai-btn ai-btn-light" onClick={jump("ai-focus")}>
              Explore the topics <Arrow />
            </a>
          </div>

          <ul className="ai-stats">
            <li>
              <strong>
                <CountUp to={topics.length} run={ready} pad={2} />
              </strong>
              <span>Research topics</span>
            </li>
            <li>
              <strong>
                <CountUp to={projects.length} run={ready} pad={2} />
              </strong>
              <span>Related projects</span>
            </li>
            {since && (
              <li>
                <strong>{since}</strong>
                <span>Working in this area since</span>
              </li>
            )}
          </ul>
        </div>

        <div className="ai-visual" aria-hidden="true">
          <div className="ai-v-main">
            <Photo src={imgHeroMain} fallback={hero[0]} />
            <span className="ai-scan" />
          </div>
          <div className="ai-v-side">
            <img src={imgSide} alt="" />
          </div>
          <div className="ai-chip" key={i}>
            <small>
              {String(i + 1).padStart(2, "0")} · {active?.subtitle}
            </small>
            <strong>{active?.title}</strong>
            <span className="ai-chip-dots">
              {topics.map((t, k) => (
                <b key={t.title} className={k === i ? "on" : ""} />
              ))}
            </span>
          </div>
          <div className="ai-orb" />
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   2. FOCUS: tilt cards, detail slides up inside the card (no layout shift)
================================================================== */
function TopicCard({ t, i, fallback }: { t: AiTopic; i: number; fallback: string }) {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)

  const move = (e: RPointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el || reducedMotion() || e.pointerType === "touch") return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty("--rx", `${(x * 5).toFixed(2)}deg`)
    el.style.setProperty("--ry", `${(-y * 4).toFixed(2)}deg`)
    el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`)
    el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`)
  }
  const leave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--rx", "0deg")
    el.style.setProperty("--ry", "0deg")
  }

  return (
    <article
      ref={ref}
      className={`ai-card ${open ? "is-open" : ""}`}
      onPointerMove={move}
      onPointerLeave={leave}
      style={{ "--k": i } as CSSProperties}
    >
      <div className="ai-card-media">
        <Photo src={t.image} fallback={fallback} />
      </div>
      <div className="ai-card-shade" aria-hidden="true" />
      <div className="ai-card-glow" aria-hidden="true" />

      <div className="ai-card-top">
        <span className="ai-card-no">{String(i + 1).padStart(2, "0")}</span>
        <span className="ai-card-sub">{t.subtitle}</span>
      </div>

      <div className="ai-card-bottom">
        <h3>{t.title}</h3>
        <ul className="ai-card-tags">
          {t.tags.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div className="ai-card-more">
          <div>
            <p>{t.detail}</p>
            <p className="ai-card-ctx">{t.context}</p>
          </div>
        </div>
        <button type="button" className="ai-card-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span>{open ? "Hide details" : "Read details"}</span>
          <i aria-hidden="true" />
        </button>
      </div>
    </article>
  )
}

function Focus({ topics, fallback }: { topics: AiTopic[]; fallback: string }) {
  return (
    <section className="ai-section ai-focus" id="ai-focus">
      <div className="container">
        <Reveal className="ai-head">
          <div>
            <span className="ai-eyebrow">
              <i />
              Research focus
            </span>
            <h2>
              What we <em>investigate.</em>
            </h2>
          </div>
          <p>Two connected directions: discovering molecular signals, and making machine learning understandable to the people who rely on it.</p>
        </Reveal>

        <div className="ai-cards">
          {topics.map((t, i) => (
            <Reveal key={t.title} delay={i * 140} className="ai-card-slot">
              <TopicCard t={t} i={i} fallback={fallback} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   3. PIPELINE: auto-playing stages (pauses on hover / when off-screen)
================================================================== */
const STAGE_MS = 6500

function Pipeline() {
  const [active, setActive] = useState(0)
  const [hold, setHold] = useState(false)
  const [ref, onScreen] = useOnScreen<HTMLElement>(0.3)
  const still = reducedMotion()
  const playing = onScreen && !hold && !still

  useEffect(() => {
    if (!playing) return
    const id = setTimeout(() => setActive((a) => (a + 1) % stages.length), STAGE_MS)
    return () => clearTimeout(id)
  }, [active, playing])

  return (
    <section className="ai-section ai-pipe" ref={ref} aria-label="From data to application">
      <div className="ai-pipe-glow" aria-hidden="true" />
      <div className="container">
        <Reveal className="ai-head ai-head-dark">
          <div>
            <span className="ai-eyebrow ai-eyebrow-dark">
              <i />
              Research approach
            </span>
            <h2>
              From data to <em>application.</em>
            </h2>
          </div>
          <p>Every project follows the same path: careful data, suitable methods, reliable insight and a result that helps real decisions.</p>
        </Reveal>

        <Reveal className="ai-pipe-body">
          <div className="ai-pipe-grid" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
            <div className="ai-tabs" role="tablist" aria-label="Research approach stages">
              {stages.map((s, i) => (
                <button
                  key={s.n}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`ai-tab ${i === active ? "on" : ""} ${i < active ? "done" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <i
                    className="ai-tab-fill"
                    key={i === active ? `${active}-${playing}` : i}
                    style={{ "--ms": `${STAGE_MS}ms` } as CSSProperties}
                    data-run={i === active && playing ? "1" : "0"}
                  />
                  <span className="ai-tab-no">{s.n}</span>
                  <span className="ai-tab-txt">
                    <strong>{s.title}</strong>
                    <small>{s.sub}</small>
                  </span>
                </button>
              ))}
            </div>

            <div className="ai-stagebox">
              {stages.map((s, i) => (
                <figure key={s.n} className={`ai-stage ${i === active ? "on" : ""}`} aria-hidden={i !== active}>
                  <img src={s.img} alt="" loading="lazy" style={{ objectPosition: s.pos }} />
                  <figcaption>
                    <span>
                      {s.n} / 0{stages.length}
                    </span>
                    <strong>{s.sub}</strong>
                    <p>{s.text}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ==================================================================
   4. PROJECTS: filterable horizontal rail
================================================================== */
function Rail({ projects }: { projects: Project[] }) {
  const cats = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects])
  const [cat, setCat] = useState("All")
  const track = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const [pos, setPos] = useState(1)
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null)
  const [dragging, setDragging] = useState(false)

  const list = useMemo(
    () => projects.filter((p) => cat === "All" || p.category === cat).sort((a, b) => b.year - a.year),
    [projects, cat],
  )

  const measure = () => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
    const card = el.querySelector<HTMLElement>(".ai-proj")
    const w = (card?.offsetWidth ?? 360) + 22
    setPos(Math.min(Math.round(el.scrollLeft / w) + 1, Math.max(list.length, 1)))
  }

  const down = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !track.current) return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
    window.getSelection()?.removeAllRanges()
  }
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || !track.current) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true
      setDragging(true)
    }
    if (d.moved) {
      window.getSelection()?.removeAllRanges()
      track.current.scrollLeft = d.left - dx
    }
  }
  const up = () => {
    drag.current = null
    setDragging(false)
  }

  useEffect(() => {
    track.current?.scrollTo({ left: 0 })
    measure()
  }, [cat])

  const step = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(".ai-proj")
    const w = (card?.offsetWidth ?? 360) + 22
    el.scrollBy({ left: dir * w, behavior: "smooth" })
  }

  return (
    <section className="ai-section ai-projects" id="ai-projects">
      <div className="container">
        <Reveal className="ai-head">
          <div>
            <span className="ai-eyebrow">
              <i />
              Related projects
            </span>
            <h2>
              Research <em>in practice.</em>
            </h2>
          </div>
          <p>Funded and collaborative projects in cancer genomics and computational health that connect to this area.</p>
        </Reveal>

        <div className="ai-rail-bar">
          <div className="ai-filters" role="tablist" aria-label="Filter projects">
            {cats.map((c) => (
              <button key={c} type="button" role="tab" aria-selected={c === cat} className={c === cat ? "on" : ""} onClick={() => setCat(c)}>
                {c}
                <em>{c === "All" ? projects.length : projects.filter((p) => p.category === c).length}</em>
              </button>
            ))}
          </div>
          <div className="ai-rail-nav">
            <span className="ai-count" aria-live="polite">
              <strong>{String(pos).padStart(2, "0")}</strong> / {String(list.length).padStart(2, "0")}
            </span>
            <button type="button" onClick={() => step(-1)} disabled={edge.start} aria-label="Previous projects">
              <span style={{ display: "grid", transform: "rotate(180deg)" }}>
                <Arrow size={16} />
              </span>
            </button>
            <button type="button" onClick={() => step(1)} disabled={edge.end} aria-label="Next projects">
              <Arrow size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="ai-track-wrap">
        <div className={`ai-track ${dragging ? "is-drag" : ""}`} ref={track} onScroll={measure} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up} onPointerCancel={up} tabIndex={0} role="region" aria-label="Project list, scrollable">
          {list.map((p, i) => (
            <article className="ai-proj" key={`${cat}-${p.code}-${i}`} style={{ "--i": i } as CSSProperties}>
              <div className="ai-proj-top">
                <span className="ai-proj-year">{p.year}</span>
                <span className={`ai-proj-status s-${p.status === "In progress" ? "on" : p.status === "Closed" ? "done" : "na"}`}>{p.status}</span>
              </div>
              <h3 title={p.title}>{p.title}</h3>
              <dl>
                <div>
                  <dt>Lead</dt>
                  <dd>{p.lead}</dd>
                </div>
                <div>
                  <dt>Funder</dt>
                  <dd>{p.funder}</dd>
                </div>
              </dl>
              <footer>
                <span>{p.category}</span>
                <code>{p.code}</code>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ==================================================================
   5. CLOSING
================================================================== */
function Closing({ campus, next }: Pick<Props, "campus" | "next">) {
  return (
    <section className="ai-cta">
      <img src={campus} alt="" loading="lazy" />
      <div className="ai-cta-shade" aria-hidden="true" />
      <div className="container ai-cta-in">
        <Reveal className="ai-cta-copy">
          <span className="ai-eyebrow ai-eyebrow-dark">
            <i />
            Collaboration
          </span>
          <h2>
            Let&rsquo;s discover <em>together.</em>
          </h2>
          <p>We welcome collaboration with researchers, clinicians, students and institutions working on molecular and clinical data.</p>
        </Reveal>
        <Reveal delay={160} className="ai-cta-side">
          <a
            href={next.path}
            className="ai-next"
            onClick={(e) => {
              e.preventDefault()
              go(next.path)
            }}
          >
            <span>Continue exploring</span>
            <strong>{next.label}</strong>
            <i aria-hidden="true">
              <Arrow />
            </i>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ==================================================================
   PAGE
================================================================== */
export default function AIPage({ topics, projects, hero, fallback, campus, next }: Props) {
  return (
    <div className="ai">
      <Hero topics={topics} projects={projects} hero={hero} />
      <Focus topics={topics} fallback={fallback} />
      <Pipeline />
      <Rail projects={projects} />
      <Closing campus={campus} next={next} />
    </div>
  )
}