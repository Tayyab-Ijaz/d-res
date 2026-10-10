import { useEffect, useState } from "react"
import imgCampus from "../../assets/shared/campus.jpg"
import imgFlowData from "../../assets/fallbacks/flow-data.jpg"
import imgFlowMethods from "../../assets/fallbacks/flow-methods.jpg"
import imgAboutMainLocal from "../../assets/home/about-main.jpg"
import imgAboutSmallLocal from "../../assets/home/about-small.jpg"
import { Arrow } from "../../components/ui/Arrow"
import { SafeImg } from "../../components/ui/SafeImg"
import { CountUp } from "../../components/ui/CountUp"
import { Reveal } from "../../components/ui/Reveal"
import { useInView } from "../../hooks/useInView"
import { projects } from "../../data/projects"
import type { LinkFn } from "../../routes"
import { heroSlides, homeAreas, journeySteps, homeStats } from "./content"
import "./home.css"

export default function Home({ link }: { link: LinkFn }) {
  const [statsRef, statsSeen] = useInView<HTMLElement>(0.3)
  const [flowRef, flowSeen] = useInView<HTMLElement>(0.15)
  const [activeSlide, setActiveSlide] = useState(0)
  const [sliderPaused, setSliderPaused] = useState(false)
  const [activeArea, setActiveArea] = useState(0)

  useEffect(() => {
    if (sliderPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [sliderPaused])

  const moveSlide = (direction: number) => {
    setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length)
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="eyebrow">
              INTERDISCIPLINARY HEALTH RESEARCH
            </div>
            <h1>
              Health research
              <br />
              driven by <em>data.</em>
            </h1>
            <p className="hero-text">
              DASHRES is an interdisciplinary research group applying artificial
              intelligence, statistics and the health sciences to questions in
              clinical and public health.
            </p>
            <div className="hero-actions">
              {link(
                "projects",
                <>
                  View our research <Arrow />
                </>,
                "button button-dark",
              )}
              {link(
                "about",
                <>
                  About the group <Arrow diagonal />
                </>,
                "text-link",
              )}
            </div>
          </div>
          <div
            className="hero-visual"
            role="region"
            aria-roledescription="carousel"
            aria-label="DASHRES research and care photographs"
            onMouseEnter={() => setSliderPaused(true)}
            onMouseLeave={() => setSliderPaused(false)}
            onFocusCapture={() => setSliderPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setSliderPaused(false)
            }}
          >
            <div className="hero-image-wrap">
              {heroSlides.map((slide, index) => (
                <div
                  className={`hero-slide ${activeSlide === index ? "hero-slide-active" : ""}`}
                  aria-hidden={activeSlide !== index}
                  key={slide.image}
                >
                  <img src={slide.image} alt={slide.alt} />
                </div>
              ))}
              <div className="image-tint" />
            </div>
            <div className="hero-image-number">
              {String(activeSlide + 1).padStart(2, "0")} / 0{heroSlides.length}
            </div>
            <div className="slider-controls" aria-label="Slideshow controls">
              <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous image">
                <span className="slider-prev-icon"><Arrow /></span>
              </button>
              <div className="slider-dots">
                {heroSlides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.image}
                    className={activeSlide === index ? "active" : ""}
                    aria-label={`Show image ${index + 1}: ${slide.label}`}
                    aria-current={activeSlide === index ? "true" : undefined}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
              </div>
              <button type="button" onClick={() => moveSlide(1)} aria-label="Next image">
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS ============ */}
      <section className="hm-stats" ref={statsRef}>
        <div className="container hm-stats-inner">
          {homeStats.map((s, i) => (
            <div className="hm-stat" key={s.label} style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
              <span className="hm-stat-icon" aria-hidden="true">{s.icon}</span>
              <div>
                <strong>
                  <CountUp to={s.value} run={statsSeen} pad={2} />
                  {s.plus && <i>+</i>}
                </strong>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ RESEARCH AREAS ============ */}
      <section className="hm-section hm-areas">
        <div className="container">
          <div className="hm-head hm-areas-head">
            <Reveal>
              <div className="hm-eyebrow">RESEARCH AREAS</div>
              <h2 className="hm-h2">
                Four areas of
                <br />
                <em>focused research.</em>
              </h2>
            </Reveal>
            <Reveal delay={150} className="hm-areas-aside">
              <p className="hm-lead">
                Our work connects laboratory science, computation and clinical
                practice across four research areas.
              </p>
              {link(
                "tools",
                <>
                  View all research topics <Arrow />
                </>,
                "hm-textlink",
              )}
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div className="hm-panels">
              {homeAreas.map((a, i) => (
                <div
                  key={a.title}
                  className={`hm-panel ${activeArea === i ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveArea(i)}
                  onFocusCapture={() => setActiveArea(i)}
                >
                  {link(
                    "tools",
                    <>
                      <SafeImg src={a.image} fallback={a.fallback} alt={a.alt} loading="lazy" />
                      <span className="hm-panel-shade" aria-hidden="true" />
                      <span className="hm-panel-vtitle" aria-hidden="true">
                        <b>{a.number}</b>
                        <span>{a.title}</span>
                      </span>
                      <span className="hm-panel-main">
                        <span className="hm-panel-no">{a.number}</span>
                        <h3>{a.title}</h3>
                        <p>{a.text}</p>
                        <span className="hm-area-link">
                          Explore research <Arrow />
                        </span>
                      </span>
                    </>,
                    "hm-panel-link",
                  )}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ ABOUT ============ */}
      <section className="hm-section hm-about">
        <div className="container hm-about-grid">
          <Reveal className="hm-collage-wrap">
            <div className="hm-collage">
              <div className="hm-collage-main">
                <SafeImg src={imgAboutMainLocal} fallback={imgFlowData} alt="Research team meeting around a table with laptops" loading="lazy" />
              </div>
              <div className="hm-collage-small">
                <SafeImg src={imgAboutSmallLocal} fallback={imgFlowMethods} alt="Researchers taking notes during a team discussion" loading="lazy" />
              </div>
            </div>
          </Reveal>
          <div className="hm-about-copy">
            <Reveal>
              <div className="hm-eyebrow">ABOUT DASHRES</div>
              <h2 className="hm-h2">
                An interdisciplinary group <em>in health and AI.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p>
                DASHRES is an international, interdisciplinary research group
                at the intersection of informatics, artificial intelligence and
                health sciences. We apply computational and statistical methods
                to biomedical, clinical and nursing research questions.
              </p>
            </Reveal>
            <Reveal delay={220}>
              {link(
                "about",
                <>
                  More about our group <Arrow />
                </>,
                "hm-btn",
              )}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="hm-section hm-projects">
        <div className="container">
          <div className="hm-head hm-head-row">
            <Reveal>
              <div className="hm-eyebrow">RESEARCH PROJECTS</div>
              <h2 className="hm-h2 hm-h2-single">Recent projects</h2>
            </Reveal>
            <Reveal delay={120}>
              {link(
                "projects",
                <>
                  View all projects <Arrow />
                </>,
                "hm-textlink",
              )}
            </Reveal>
          </div>
          <div className="hm-plist">
            {projects.slice(0, 3).map((project, index) => (
              <Reveal key={project.code} delay={index * 120}>
                {link(
                  "projects",
                  <>
                    <span className="hm-pno">0{index + 1}</span>
                    <span className="hm-pmain">
                      <span className="hm-pmeta">
                        {project.category.toUpperCase()} <i>|</i> {project.year}
                      </span>
                      <span className="hm-ptitle">{project.title}</span>
                    </span>
                    <span className="hm-parrow">
                      <Arrow diagonal />
                    </span>
                  </>,
                  "hm-prow",
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RESEARCH JOURNEY ============ */}
      <section className="hm-journey" ref={flowRef}>
        <div className={`container hm-journey-grid ${flowSeen ? "hm-journey-in" : ""}`}>
          <div className="hm-journey-intro">
            <div className="hm-eyebrow">RESEARCH PROCESS</div>
            <h2 className="hm-h2">
              From data to
              <br />
              <em>evidence.</em>
            </h2>
            <p>
              How our work progresses from data to evidence for clinical and
              public health application.
            </p>
          </div>
          <ol className="hm-jsteps">
            {journeySteps.map((s, i) => (
              <li
                key={s.title}
                style={{ "--i": i, "--c": s.color } as React.CSSProperties}
              >
                <div className="hm-jtop">
                  <span className="hm-jnum">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hm-jline" aria-hidden="true" />
                  {i < journeySteps.length - 1 && (
                    <span className="hm-jarrow" aria-hidden="true">
                      <Arrow />
                    </span>
                  )}
                </div>
                <div className="hm-jtitle">
                  <strong>{s.title}</strong>
                  <span className="hm-jicon" aria-hidden="true">{s.icon}</span>
                </div>
                <div className="hm-jphoto">
                  <SafeImg src={s.image} fallback={s.fallback} alt={s.alt} loading="lazy" />
                </div>
                <p>{s.text}</p>
                <span className="hm-jdot" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="hm-cta">
        <div className="hm-cta-bg" aria-hidden="true">
          <img src={imgCampus} alt="" loading="lazy" />
        </div>
        <div className="container hm-cta-inner">
          <Reveal>
            <div className="hm-eyebrow hm-eyebrow-light"><span /> COLLABORATION</div>
            <h2 className="hm-h2 hm-h2-light">
              Collaborate with
              <br />
              <em>our group.</em>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p>
              We welcome collaborations with researchers, clinicians, students
              and institutions.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
