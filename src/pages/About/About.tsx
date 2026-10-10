import { useCallback, useEffect, useState } from "react"
import type { CSSProperties } from "react"
import imgCampus from "../../assets/shared/campus.jpg"
import imgFlowData from "../../assets/fallbacks/flow-data.jpg"
import imgFlowCare from "../../assets/fallbacks/flow-care.jpg"
import imgToolsHero from "../../assets/fallbacks/tools-hero.webp"
import imgAboutHero from "../../assets/about/hero.jpg"
import imgAboutVision from "../../assets/about/vision.jpg"
import imgAboutCta from "../../assets/about/cta.jpg"
import { Arrow } from "../../components/ui/Arrow"
import { SafeImg } from "../../components/ui/SafeImg"
import { CountUp } from "../../components/ui/CountUp"
import { useInView } from "../../hooks/useInView"
import type { LinkFn } from "../../routes"
import { Icon } from "./icons"
import { Reveal } from "./Reveal"
import { LeadCard, TeamCard, ProfileDialog } from "./Team"
import { stats, pillars, missionItems, themes, team } from "./content"
import "./about.css"

const IMG = {
  hero: imgAboutHero,
  heroFallback: imgFlowData,
  campus: imgCampus,
  vision: imgAboutVision,
  visionFallback: imgFlowCare,
  cta: imgAboutCta,
  ctaFallback: imgToolsHero,
}

export default function About({ link }: { link: LinkFn }) {
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState<number | null>(null)
  const [statsRef, statsSeen] = useInView<HTMLDivElement>(0.4, "0px 0px -8% 0px")
  const close = useCallback(() => setOpen(null), [])

  useEffect(() => {
    const id = requestAnimationFrame(() => setLoaded(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const lead = team[0]
  const others = team.slice(1)

  return (
    <div className="ab">
      {/* ================= HERO ================= */}
      <section className={`ab-hero ${loaded ? "ab-hero-in" : ""}`}>
        <div className="ab-orb ab-orb-a" aria-hidden="true" />
        <div className="ab-orb ab-orb-b" aria-hidden="true" />
        <div className="container ab-hero-inner">
          <div className="ab-hero-copy">
            <div className="ab-eyebrow ab-h1">
              About DASHRES
            </div>
            <h1 className="ab-h2">
              An interdisciplinary group
              <em>in health and AI.</em>
            </h1>
            <p className="ab-lead ab-h3">
              DASHRES is an international, interdisciplinary research group working where
              informatics, artificial intelligence and the health sciences meet. Our work applies
              scientific data and computational methods to clinical and public health questions.
            </p>
            <div className="ab-hero-actions ab-h4">
              {link(
                "projects",
                <>
                  Explore our projects <Arrow />
                </>,
                "ab-btn ab-btn-primary",
              )}
              <a href="#ab-team" className="ab-btn ab-btn-ghost">
                Meet the researchers
              </a>
            </div>
          </div>

          <div className="ab-hero-visual">
            <div className="ab-hero-photo">
              <SafeImg
                src={IMG.hero}
                fallback={IMG.heroFallback}
                alt="Researcher working at a laboratory bench with a laptop"
                loading="eager"
              />
              <div className="ab-hero-shade" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="ab-stats-wrap">
        <div className="container">
          <div ref={statsRef} className={`ab-stats ab-rv ${statsSeen ? "ab-in" : ""}`}>
            {stats.map((s) => (
              <div className="ab-stat" key={s.label}>
                <strong>
                  <CountUp to={s.to} suffix={s.suffix} run={statsSeen} pad={2} duration={1500} />
                </strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= STORY ================= */}
      <section className="ab-section ab-story">
        <div className="container ab-story-grid">
          <Reveal className="ab-story-photo-wrap">
            <div className="ab-story-photo">
              <img
                src={IMG.campus}
                alt="Modern university campus with palm-lined walkways"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="ab-floating-note">
              <span>
                <strong>Jazan, Saudi Arabia</strong>
                Where our research is based
              </span>
            </div>
          </Reveal>

          <div className="ab-story-right">
            <Reveal>
              <div className="ab-eyebrow">
                About the group
              </div>
              <h2 className="ab-h-xl">
                Computational, biomedical <em>and clinical.</em>
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="ab-story-lead">
                DASHRES brings together researchers, clinicians and students from computational,
                biomedical and nursing disciplines to address health research questions.
              </p>
              <p>
                Our research applies data and AI to patient and community health, connecting
                laboratory and computational findings to diagnostics, decision support and
                nursing and healthcare practice.
              </p>
            </Reveal>
            <ul className="ab-pillars">
              {pillars.map((p, i) => (
                <Reveal as="li" key={p.title} delay={180 + i * 110} className="ab-pillar">
                  <span>
                    <strong>{p.title}</strong>
                    {p.text}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}
      <section className="ab-section ab-vm">
        <div className="container ab-vm-grid">
          <Reveal className="ab-vision-wrap">
            <div className="ab-vision">
              <SafeImg src={IMG.vision} fallback={IMG.visionFallback} alt="Researchers and clinicians in a conference room presentation" loading="lazy" />
              <div className="ab-vision-shade" />
              <div className="ab-vision-body">
                <div className="ab-vm-label">
                  <span className="ab-vm-ico">
                    <Icon name="eye" size={24} />
                  </span>
                  Our vision
                </div>
                <h3>AI-enabled health research.</h3>
                <p>
                  To be a leading AI- and informatics-enabled biomedical, healthcare and nursing
                  research group in the region, translating computational innovation into
                  improved patient outcomes and public health practice.
                </p>
              </div>
            </div>
          </Reveal>

          <MissionCard />
        </div>
      </section>

      {/* ================= THEMES ================= */}
      <section className="ab-section ab-themes">
        <div className="container">
          <Reveal>
            <div className="ab-head-row">
              <div>
                <div className="ab-eyebrow">
                  What we work on
                </div>
                <h2 className="ab-h-xl">
                  Our <em>research themes.</em>
                </h2>
              </div>
              <p>
                Five research themes that link laboratory discovery, computation and clinical
                practice.
              </p>
            </div>
          </Reveal>
          <div className="ab-theme-grid">
            {themes.map((t, i) => (
              <Reveal
                as="article"
                key={t.title}
                delay={(i % 3) * 110}
                className={`ab-theme-wrap ${i < 3 ? "ab-span-2" : "ab-span-3"}`}
              >
                <div className="ab-theme">
                  <div className="ab-theme-img">
                    <SafeImg src={t.image} fallback={t.fallback} alt={t.alt} loading="lazy" />
                    <span className="ab-theme-tag">{t.tag}</span>
                  </div>
                  <div className="ab-theme-text">
                    <h3>{t.title}</h3>
                    <p>{t.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="ab-section ab-team" id="ab-team">
        <div className="container">
          <Reveal>
            <div className="ab-head-row">
              <div>
                <div className="ab-eyebrow">
                  Our research team
                </div>
                <h2 className="ab-h-xl">
                  Meet the <em>researchers.</em>
                </h2>
              </div>
              <p>A multidisciplinary team spanning computational science, biomedical research and clinical nursing.</p>
            </div>
          </Reveal>

          <LeadCard member={lead} onOpen={() => setOpen(0)} />

          <div className="ab-team-grid">
            {others.map((m, i) => (
              <TeamCard key={m.name} member={m} index={i} tone={i % 5} onOpen={() => setOpen(i + 1)} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="ab-cta">
        <div className="ab-cta-bg" aria-hidden="true">
          <SafeImg src={IMG.cta} fallback={IMG.ctaFallback} alt="" loading="lazy" />
        </div>
        <div className="ab-cta-shade" aria-hidden="true" />
        <div className="container ab-cta-inner">
          <Reveal>
            <div className="ab-eyebrow ab-eyebrow-light">
              Collaboration
            </div>
            <h2 className="ab-h-xl">
              Collaborate with <em>our group.</em>
            </h2>
            <div className="ab-cta-contact">
              <span>
                <small>Based at</small>
                College of Nursing and Health Sciences, Jazan University
              </span>
            </div>
          </Reveal>
          <Reveal delay={140} className="ab-cta-side">
            <p>
              We welcome collaboration with researchers, clinicians, students and institutions
              with an interest in applying data-driven and AI methods to health research.
            </p>
            <div className="ab-cta-actions">
              {link("projects", "View our projects", "ab-btn ab-btn-outline-light")}
            </div>
          </Reveal>
        </div>
      </section>

      {open !== null && <ProfileDialog member={team[open]} onClose={close} />}
    </div>
  )
}

function MissionCard() {
  const [ref, seen] = useInView<HTMLDivElement>(0.2, "0px 0px -8% 0px")
  return (
    <div
      ref={ref}
      className={`ab-mission ab-rv ab-rv-right ${seen ? "ab-in" : ""}`}
      style={{ "--d": "120ms" } as CSSProperties}
    >
      <div className="ab-vm-label ab-vm-label-dark">
        <span className="ab-vm-ico">
          <Icon name="target" size={24} />
        </span>
        Our mission
      </div>
      <h3>Research aims.</h3>
      <ul className="ab-checks">
        {missionItems.map((item, i) => (
          <li key={item} style={{ "--i": i } as CSSProperties}>
            <span className="ab-check" aria-hidden="true">
              <svg viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.14" />
                <path
                  d="M6.2 10.4l2.5 2.5 5-5.4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
