import { useEffect, useState } from "react"
import imgPediatric from "../../assets/fallbacks/pediatric-nursing.png"
import imgPathogen from "../../assets/fallbacks/pathogen.png"
import imgPredictive from "../../assets/fallbacks/predictive.png"
import imgOmics from "../../assets/fallbacks/multi-omics.png"
import imgExplainable from "../../assets/fallbacks/explainable-ai.png"
import imgCampus from "../../assets/shared/campus.jpg"
import imgFlowData from "../../assets/fallbacks/flow-data.jpg"
import imgFlowMethods from "../../assets/fallbacks/flow-methods.jpg"
import imgHero3 from "../../assets/home/hero-3.jpg"
import imgAreaAi from "../../assets/home/area-ai.jpg"
import imgAreaMaternal from "../../assets/home/area-maternal.jpg"
import imgAreaDiagnostics from "../../assets/home/area-diagnostics.jpg"
import imgAreaBio from "../../assets/home/area-bioinformatics.jpg"
import imgTopicPathogen from "../../assets/topics/pathogen.jpg"
import imgTopicOmics from "../../assets/topics/omics.jpg"
import { Arrow } from "../../components/ui/Arrow"
import { SafeImg } from "../../components/ui/SafeImg"
import { CountUp } from "../../components/ui/CountUp"
import { Reveal } from "../../components/ui/Reveal"
import { useInView } from "../../hooks/useInView"
import { projects } from "../../data/projects"
import type { ProjectCategory } from "../../data/projects"
import "./projects.css"

const projectAreas: {
  name: ProjectCategory
  color: string
  image: string
  fallback: string
  alt: string
}[] = [
  {
    name: "Nursing & maternal health",
    color: "#f48a4f",
    image: imgAreaMaternal,
    fallback: imgPediatric,
    alt: "Newborn infant held by a healthcare professional in a hospital",
  },
  {
    name: "Infectious disease",
    color: "#1fb5bd",
    image: imgTopicPathogen,
    fallback: imgPathogen,
    alt: "Staff in protective equipment at a mobile testing laboratory",
  },
  {
    name: "Cancer & genomics",
    color: "#3b6fe0",
    image: imgTopicOmics,
    fallback: imgOmics,
    alt: "Fluorescence microscopy image of stained cell nuclei",
  },
  {
    name: "Computational health",
    color: "#7a5ce0",
    image: imgAreaAi,
    fallback: imgExplainable,
    alt: "Medical scan displayed on a monitor",
  },
]

const projectYears = projects.map((p) => p.year)
const firstYear = Math.min(...projectYears)
const lastYear = Math.max(...projectYears)

export default function Projects() {
  const [filter, setFilter] = useState<ProjectCategory | null>(null)
  const [query, setQuery] = useState("")
  const [activeOnly, setActiveOnly] = useState(false)
  const [openId, setOpenId] = useState<number | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [statsRef, statsSeen] = useInView<HTMLElement>(0.3)

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const all = projects.map((project, id) => ({ ...project, id }))
  const running = projects.filter((p) => p.status === "In progress").length
  const visible = all.filter(
    (project) =>
      (!filter || project.category === filter) &&
      (!activeOnly || project.status === "In progress") &&
      `${project.title} ${project.lead} ${project.year} ${project.code}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  )
  const areaOf = (name: ProjectCategory) =>
    projectAreas.find((area) => area.name === name) ?? projectAreas[0]

  const pickArea = (name: ProjectCategory) => {
    setFilter((current) => (current === name ? null : name))
    setOpenId(null)
  }

  return (
    <>
      {/* ============ HERO ============ */}
      <section className={`pj-hero ${loaded ? "pj-hero-in" : ""}`}>
        <div className="container pj-hero-grid">
          <div className="pj-hero-copy">
            <div className="pj-eyebrow">RESEARCH PROJECTS</div>
            <h1>
              Funded research
              <em>and collaborations.</em>
            </h1>
            <p>
              Projects led by DASHRES members and collaborators, spanning
              nursing, mental health, genomics and infectious disease.
            </p>
            <div className="pj-hero-actions">
              <a href="#pj-directory" className="pj-btn">
                Browse projects <Arrow />
              </a>
            </div>
          </div>
          <div className="pj-collage">
            <figure className="pj-shot pj-shot-a" style={{ "--d": "0.1s" } as React.CSSProperties}>
              <SafeImg
                src={imgAreaBio}
                fallback={imgFlowMethods}
                alt="Researchers working at a computer in a laboratory"
                loading="eager"
              />
            </figure>
            <figure className="pj-shot pj-shot-b" style={{ "--d": "0.35s" } as React.CSSProperties}>
              <SafeImg
                src={imgAreaDiagnostics}
                fallback={imgPredictive}
                alt="Gloved hands handling a sample tube in protective clothing"
                loading="eager"
              />
            </figure>
            <figure className="pj-shot pj-shot-c" style={{ "--d": "0.6s" } as React.CSSProperties}>
              <SafeImg
                src={imgHero3}
                fallback={imgFlowData}
                alt="Scientist at a microscope silhouetted against blue light"
                loading="eager"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ============ NUMBERS ============ */}
      <section className="pj-stats" ref={statsRef}>
        <div className="container pj-stats-inner">
          <div className="pj-stat">
            <strong>
              <CountUp to={projects.length} run={statsSeen} pad={2} />
            </strong>
            <span>Research projects</span>
          </div>
          <div className="pj-stat">
            <strong>
              <CountUp to={projectAreas.length} run={statsSeen} pad={2} />
            </strong>
            <span>Research areas</span>
          </div>
          <div className="pj-stat">
            <strong>
              <CountUp to={running} run={statsSeen} pad={2} />
            </strong>
            <span>Currently in progress</span>
          </div>
          <div className="pj-stat">
            <strong>
              {firstYear}
              <i>&ndash;</i>
              {String(lastYear).slice(2)}
            </strong>
            <span>Years of funded work</span>
          </div>
        </div>
      </section>

      {/* ============ DIRECTORY ============ */}
      <section className="pj-section" id="pj-directory">
        <div className="container">
          <Reveal>
            <div className="pj-head">
              <div>
                <div className="hm-eyebrow">PROJECT DIRECTORY</div>
                <h2 className="hm-h2">
                  Project <em>directory.</em>
                </h2>
              </div>
              <label className="pj-search">
                <svg width="19" height="19" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="8.8" cy="8.8" r="5.9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="m13.3 13.3 4.3 4.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search title, lead or reference"
                  aria-label="Search projects"
                />
              </label>
            </div>
          </Reveal>

          <div className="pj-areas" role="group" aria-label="Filter projects by research area">
            {projectAreas.map((area, i) => {
              const count = projects.filter((p) => p.category === area.name).length
              const on = filter === area.name
              return (
                <Reveal key={area.name} delay={i * 90} className="pj-tile-wrap">
                  <button
                    type="button"
                    aria-pressed={on}
                    className={`pj-tile ${on ? "is-on" : ""} ${filter && !on ? "is-dim" : ""}`}
                    style={{ "--c": area.color } as React.CSSProperties}
                    onClick={() => pickArea(area.name)}
                  >
                    <SafeImg src={area.image} fallback={area.fallback} alt={area.alt} loading="lazy" />
                    <span className="pj-tile-shade" aria-hidden="true" />
                    <span className="pj-tile-body">
                      <span className="pj-tile-count">{String(count).padStart(2, "0")} projects</span>
                      <span className="pj-tile-name">{area.name}</span>
                    </span>
                  </button>
                </Reveal>
              )
            })}
          </div>

          <div className="pj-bar">
            <div className="pj-count">
              Showing <b>{visible.length}</b> of {projects.length} projects
              {filter && (
                <button type="button" className="pj-chip" onClick={() => setFilter(null)}>
                  {filter} <span aria-hidden="true">&times;</span>
                  <span className="pj-sr">Clear filter</span>
                </button>
              )}
            </div>
            <label className="pj-switch">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(event) => setActiveOnly(event.target.checked)}
              />
              <span className="pj-switch-ui" aria-hidden="true" />
              In progress only
            </label>
          </div>

          <div className="pj-list" key={`${filter}-${activeOnly}`}>
            {visible.map((project, index) => {
              const area = areaOf(project.category)
              const open = openId === project.id
              return (
                <Reveal key={project.id} delay={(index % 4) * 60} className="pj-item-wrap">
                  <article
                    className={`pj-item ${open ? "is-open" : ""}`}
                    style={{ "--c": area.color } as React.CSSProperties}
                  >
                    <button
                      type="button"
                      className="pj-row"
                      aria-expanded={open}
                      aria-controls={`pj-panel-${project.id}`}
                      onClick={() => setOpenId(open ? null : project.id)}
                    >
                      <span className="pj-no">{String(index + 1).padStart(2, "0")}</span>
                      <span className="pj-body">
                        <span className="pj-meta">
                          <span className="pj-cat">{project.category}</span>
                          <span className="pj-year">{project.year}</span>
                          {project.status === "In progress" && (
                            <span className="pj-status">In progress</span>
                          )}
                        </span>
                        <span className="pj-title">{project.title}</span>
                      </span>
                      <span className="pj-toggle" aria-hidden="true">
                        <i />
                        <i />
                      </span>
                    </button>
                    <div className="pj-panel" id={`pj-panel-${project.id}`} role="region">
                      <div className="pj-panel-clip">
                        <div className="pj-panel-in">
                          <div className="pj-thumb">
                            <SafeImg src={area.image} fallback={area.fallback} alt={area.alt} loading="lazy" />
                          </div>
                          <dl className="pj-facts">
                            <div>
                              <dt>Project reference</dt>
                              <dd>{project.code}</dd>
                            </div>
                            <div>
                              <dt>Researcher / role</dt>
                              <dd>{project.lead}</dd>
                            </div>
                            <div>
                              <dt>Funding agency</dt>
                              <dd>{project.funder}</dd>
                            </div>
                            <div>
                              <dt>Status</dt>
                              <dd>{project.status === "Not specified" ? "—" : project.status}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </article>
                </Reveal>
              )
            })}
            {visible.length === 0 && (
              <div className="pj-empty">
                <h3>No projects found.</h3>
                <p>Try a different search term or research area.</p>
                <button
                  type="button"
                  onClick={() => {
                    setFilter(null)
                    setQuery("")
                    setActiveOnly(false)
                  }}
                >
                  Clear filters <Arrow />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="hm-cta">
        <div className="hm-cta-bg" aria-hidden="true">
          <img src={imgCampus} alt="" loading="lazy" />
        </div>
        <div className="container hm-cta-inner">
          <Reveal>
            <div className="hm-eyebrow hm-eyebrow-light">COLLABORATION</div>
            <h2 className="hm-h2 hm-h2-light">
              Propose a
              <br />
              <em>collaboration.</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p>
              We partner with researchers, clinicians, students and institutions
              on funded, data-driven health research.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
