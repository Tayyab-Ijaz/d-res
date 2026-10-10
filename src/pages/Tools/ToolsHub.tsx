import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import "./toolshub.css"
import imgMhHero from "../../assets/mental/hero.jpg"
import imgOvhPoster from "../../assets/tools-hub/overview-frame.jpg"
import imgFlowCare from "../../assets/fallbacks/flow-care.jpg"
import imgFlowData from "../../assets/fallbacks/flow-data.jpg"
import imgFlowMethods from "../../assets/fallbacks/flow-methods.jpg"
import imgCampus from "../../assets/shared/campus.jpg"
import imgAreaMental from "../../assets/tools-hub/area-mental.jpg"
import imgAreaMaternalWide from "../../assets/tools-hub/area-maternal.jpg"
import imgAreaInfectious from "../../assets/tools-hub/area-infectious.jpg"
import imgAreaAiWide from "../../assets/tools-hub/area-ai.jpg"
import imgFlowDataReal from "../../assets/tools-hub/process-data.jpg"
import imgFlowMethodsReal from "../../assets/tools-hub/process-methods.jpg"
import imgFlowInsightReal from "../../assets/tools-hub/process-insight.jpg"
import imgFlowCareReal from "../../assets/tools-hub/process-care.jpg"
import MentalHealthPage from "./MentalHealthPage"
import InfectiousPage from "./InfectiousPage"
import AIPage from "./AIPage"
import MaternalPage from "./MaternalPage"
import { projects as allProjects } from "../../data/projects"

export type HubPage = "tools" | "mental-health" | "maternal" | "infectious" | "ai"

export type HubTool = {
  number: string
  title: string
  category: string
  subtitle: string
  detail: string
  image: string
  tags: string[]
  context: string
  project?: string
}

/* Each area = one page. `photo` is a free-licence Unsplash image, `fallback` is a local copy. */
export const areas = [
  {
    page: "mental-health" as HubPage,
    path: "/tools/mental-health",
    label: "Mental health",
    category: "Mental health",
    photo: imgAreaMental,
    fallback: imgMhHero,
    h1: ["Mental health", "research."],
    lead: "Research on postpartum depression and the molecular neurobiology of stress, linking laboratory findings with behavioral and clinical studies.",
  },
  {
    page: "maternal" as HubPage,
    path: "/tools/maternal-child-health",
    label: "Maternal & child health",
    category: "Maternal & child health",
    photo: imgAreaMaternalWide,
    fallback: imgFlowCare,
    h1: ["Maternal and", "child health."],
    lead: "Research on the health of mothers, infants and children, including AI in pediatric nursing and developmental screening.",
  },
  {
    page: "infectious" as HubPage,
    path: "/tools/infectious-disease",
    label: "Infectious disease",
    category: "Infectious disease",
    photo: imgAreaInfectious,
    fallback: imgFlowData,
    h1: ["Infectious disease", "research."],
    lead: "Genomic surveillance and predictive modelling of respiratory pathogens to support public health preparedness.",
  },
  {
    page: "ai" as HubPage,
    path: "/tools/ai-bioinformatics",
    label: "AI & bioinformatics",
    category: "AI & bioinformatics",
    photo: imgAreaAiWide,
    fallback: imgFlowMethods,
    h1: ["AI and", "bioinformatics."],
    lead: "Multi-omics discovery and interpretable machine learning applied to molecular and clinical data.",
  },
]

const go = (path: string) => {
  window.history.pushState({}, "", path)
  window.dispatchEvent(new PopStateEvent("popstate"))
  window.scrollTo({ top: 0, behavior: "instant" })
}

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function Rv({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`th-rv ${seen ? "th-in" : ""} ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}

const flow = [
  { t: "Data", d: "Clinical, genomic and environmental data", img: imgFlowDataReal, c: "#14245c" },
  { t: "Computational methods", d: "AI/ML, statistics and bioinformatics", img: imgFlowMethodsReal, c: "#1fb5bd" },
  { t: "Biological & health insight", d: "Biomarkers, mechanisms and risk prediction", img: imgFlowInsightReal, c: "#3b6fe0" },
  { t: "Clinical & public health application", d: "Better decisions, healthier communities", img: imgFlowCareReal, c: "#f48a4f" },
]

/* Tools overview: "From data to better care" (light, same style as Home's Research journey) */
function Journey() {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <section className="th-flow-sec" ref={ref}>
      <div className={`container ${seen ? "th-jin" : ""}`}>
        <div className="th-jhead">
          <div>
            <div className="th-eyebrow">RESEARCH APPROACH</div>
            <h2>From data to <em>application.</em></h2>
          </div>
          <p>We combine computational methods with biomedical research to generate insights that inform clinical and public health decisions.</p>
        </div>
        <ol className="th-jsteps">
          {flow.map((f, i) => (
            <li key={f.t} style={{ "--i": i, "--c": f.c } as CSSProperties}>
              <div className="th-jtop">
                <span className="th-jnum">0{i + 1}</span>
                <span className="th-jline" aria-hidden="true" />
                {i < flow.length - 1 && <span className="th-jarrow" aria-hidden="true"><Arrow /></span>}
              </div>
              <strong className="th-jtitle">{f.t}</strong>
              <div className="th-jphoto"><img src={f.img} alt="" loading="lazy" /></div>
              <p>{f.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* Free stock clips (Mixkit Stock Video Free License: commercial use, no attribution needed).
   To self-host, download them from mixkit.co and replace `src` with e.g. "/videos/cells.mp4"
   (put the files in /public/videos). */
const heroVideos = [
  { label: "Cellular environment", src: "https://assets.mixkit.co/videos/3968/3968-720.mp4", alt: "https://assets.mixkit.co/videos/3968/3968-360.mp4" },
  { label: "Scientists analysing samples", src: "https://assets.mixkit.co/videos/46747/46747-720.mp4", alt: "https://assets.mixkit.co/videos/46747/46747-360.mp4" },
  { label: "Biologist at work", src: "https://assets.mixkit.co/videos/47584/47584-720.mp4", alt: "https://assets.mixkit.co/videos/47584/47584-360.mp4" },
]

/* Overview hero: looping lab-footage background with headline, no cards */
function OverviewHero() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const [active, setActive] = useState(0)
  const playing = !reduce
  const [ready, setReady] = useState(false)
  const vids = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return
      if (i === active && playing) { v.currentTime = 0; v.play().catch(() => {}) }
      else if (i !== active) { const t = setTimeout(() => v.pause(), 1300); return () => clearTimeout(t) }
      else v.pause()
    })
  }, [active, playing])

  const go2 = (i: number) => setActive(((i % heroVideos.length) + heroVideos.length) % heroVideos.length)

  return (
    <section className="th-vh" aria-label="Research areas and topics">
      <div className="th-vh-media" aria-hidden="true">
        <img className="th-vh-poster" src={imgOvhPoster} alt="" />
        {heroVideos.map((v, i) => (
          <video
            key={v.src}
            ref={(el) => { vids.current[i] = el }}
            className={`${i === active ? "on" : ""} ${ready ? "rdy" : ""}`}
            muted
            playsInline
            preload={i === 0 ? "auto" : "metadata"}
            poster={imgOvhPoster}
            onLoadedData={() => i === 0 && setReady(true)}
            onEnded={() => i === active && go2(active + 1)}
            onError={(e) => { const el = e.currentTarget; if (!el.src.endsWith(v.alt.split("/").pop() as string)) { el.src = v.alt; el.load(); if (i === active && playing) el.play().catch(() => {}) } }}
            src={v.src}
          />
        ))}
      </div>
      <div className="th-vh-shade" aria-hidden="true" />
      <div className="th-vh-lines" aria-hidden="true"><i /><i /><i /></div>

      <div className="container th-vh-in">
        <span className="th-vh-tag"><i />Research tools &amp; topics</span>
        <h1>
          <span className="ln" style={{ "--d": ".1s" } as CSSProperties}><span>Research areas</span></span>
          <span className="ln" style={{ "--d": ".25s" } as CSSProperties}><em>and topics.</em></span>
        </h1>
        <p>Four research areas that share a common approach. Select an area to view its topics, methods and related projects.</p>
        <div className="th-vh-actions">
          <a href="#areas" className="th-ovh-scroll" onClick={(e) => { e.preventDefault(); document.getElementById("areas")?.scrollIntoView({ behavior: "smooth" }) }}>
            Explore the areas <Arrow />
          </a>
          <a href="mailto:shafiul.haque@hotmail.com" className="th-vh-ghost">Collaborate with us</a>
        </div>
      </div>
    </section>
  )
}

/* Scrolling strip of research topics (replaces the tab bar on the overview) */
function Ticker({ tools }: { tools: HubTool[] }) {
  const items = [...tools.map((t) => t.title), "DASHRES research"]
  const row = (k: string) => (
    <ul key={k} aria-hidden={k === "b"}>
      {items.map((t) => (<li key={t}><i />{t}</li>))}
    </ul>
  )
  return (
    <div className="th-ticker" role="presentation">
      <div className="th-ticker-track">{row("a")}{row("b")}</div>
    </div>
  )
}

function Photo({ src, fallback, alt = "" }: { src: string; fallback: string; alt?: string }) {
  return <img src={src} alt={alt} loading="lazy" onError={(e) => { if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback }} />
}

/* ---------- Horizontal topic navigation (replaces the 5 filter pills) ---------- */
export function TopicNav({ active }: { active: HubPage }) {
  const items: { page: HubPage; path: string; label: string }[] = [
    { page: "tools", path: "/tools", label: "Overview" },
    ...areas,
  ]
  const wrap = useRef<HTMLDivElement>(null)
  const [bar, setBar] = useState({ x: 0, w: 0 })
  useLayoutEffect(() => {
    const place = () => {
      const el = wrap.current?.querySelector<HTMLElement>("[aria-current='page']")
      if (!el) return
      setBar({ x: el.offsetLeft, w: el.offsetWidth })
      wrap.current?.scrollTo({ left: Math.max(0, el.offsetLeft - 24), behavior: "smooth" })
    }
    place()
    window.addEventListener("resize", place)
    return () => window.removeEventListener("resize", place)
  }, [active])
  return (
    <nav className="th-nav" aria-label="Research areas">
      <div className="container th-nav-scroll" ref={wrap}>
        {items.map((it) => (
          <a
            key={it.page}
            href={it.path}
            className="th-tab"
            aria-current={it.page === active ? "page" : undefined}
            onClick={(e) => { e.preventDefault(); if (it.page !== active) go(it.path) }}
          >
            {it.label}
          </a>
        ))}
        <span className="th-ink" style={{ transform: `translateX(${bar.x}px)`, width: bar.w }} aria-hidden="true" />
      </div>
    </nav>
  )
}

type MhProject = { title: string; text: string; tags: string[]; alt: string }

export default function ToolsHub({ page, tools, projects = [] }: { page: HubPage; tools: HubTool[]; projects?: MhProject[] }) {
  const idx = areas.findIndex((a) => a.page === page)
  const area = areas[idx]

  if (!area) {
    return (
      <div className="th-page th-hub" key="overview">
        <OverviewHero />
        <Ticker tools={tools} />
        <section id="areas" className="container th-list" aria-label="Research areas">
          <div className="th-listhead">
            <div>
              <div className="th-eyebrow">RESEARCH AREAS</div>
              <h2>Browse by <em>area.</em></h2>
            </div>
            <p>An overview of the topics behind our research, from mental health to molecular discovery.</p>
          </div>
          {areas.map((a, i) => (
            <Rv key={a.page} delay={i * 70}>
              <a href={a.path} className="th-item" onClick={(e) => { e.preventDefault(); go(a.path) }}>
                <span className="th-item-no">0{i + 1}</span>
                <span className="th-item-text">
                  <h2>{a.label}</h2>
                  <p>{a.lead}</p>
                  <span className="th-item-topics">
                    {tools.filter((t) => t.category === a.category).map((t) => <em key={t.title}>{t.title}</em>)}
                  </span>
                </span>
                <span className="th-item-img"><Photo src={a.photo} fallback={a.fallback} /></span>
                <span className="th-item-go"><Arrow /></span>
              </a>
            </Rv>
          ))}
        </section>

        <Journey />

        <section className="th-cta">
          <Photo src={imgCampus} fallback={imgCampus} alt="Jazan University campus" />
          <div className="container th-cta-in">
            <Rv>
              <div className="th-eyebrow th-eyebrow-light">COLLABORATION</div>
              <h2>Collaborate with <em>our group.</em></h2>
              <p>We welcome collaboration with researchers, clinicians, students and institutions.</p>
              <a href="mailto:shafiul.haque@hotmail.com" className="th-ovh-scroll">Contact us <Arrow /></a>
            </Rv>
          </div>
        </section>
      </div>
    )
  }

  /* ===== Mental health: dedicated page (see MentalHealthPage.tsx / mentalpage.css) ===== */
  if (page === "mental-health") {
    const topics = tools.filter((t) => t.category === "Mental health")
    const others = areas
      .filter((a) => a.page !== "mental-health")
      .map((a) => ({
        key: a.page as string,
        label: a.label,
        path: a.path,
        lead: a.lead,
        count: tools.filter((t) => t.category === a.category).length,
        fallback: a.fallback as string,
      }))
    return <MentalHealthPage key={page} topics={topics} projects={projects} others={others} />
  }

  const list = tools.filter((t) => t.category === area.category)
  const next = areas[(idx + 1) % areas.length]
  const ph = (t: HubTool): [string, string] => [t.image, area.fallback]
  /* ===== Maternal & child health: dedicated page (see MaternalPage.tsx / maternalpage.css) ===== */
  if (page === "maternal") {
    return (
      <MaternalPage
        key={page}
        topics={list}
        photos={list.map((t) => ph(t) as [string, string])}
        hero={[area.photo, area.fallback]}
        campus={[imgCampus, imgCampus]}
        next={{ label: next.label, path: next.path }}
      />
    )
  }

  /* ===== Infectious disease: dedicated page (see InfectiousPage.tsx / infectious.css) ===== */
  if (page === "infectious") {
    return (
      <InfectiousPage
        key={page}
        topics={list}
        projects={allProjects.filter((p) => p.category === "Infectious disease")}
        photos={list.map((t) => ph(t) as [string, string])}
        hero={[area.photo, area.fallback]}
        campus={[imgCampus, imgCampus]}
        nav={areas.map((a) => ({ label: a.label, path: a.path, active: a.page === page }))}
        next={{ label: next.label, path: next.path }}
      />
    )
  }

  /* ===== AI & bioinformatics: dedicated page (see AIPage.tsx / aipage.css) ===== */
  return (
    <AIPage
      key={page}
      topics={list.map((t) => ({ ...t, image: t.image }))}
      projects={allProjects.filter((p) => p.category === "Cancer & genomics" || p.category === "Computational health")}
      hero={[area.photo, area.fallback]}
      fallback={area.fallback}
      campus={imgCampus}
      next={{ label: next.label, path: next.path }}
    />
  )
}