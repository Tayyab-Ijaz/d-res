import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import "./infectious.css"
import type { Project } from "../../data/projects"

export type InfTopic = {
  title: string
  subtitle: string
  detail: string
  context: string
  tags: string[]
  project?: string
}
type NavItem = { label: string; path: string; active: boolean }
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
  <img src={pic[0]} alt="" className={className} loading="lazy" onError={(e) => { if (e.currentTarget.src !== pic[1]) e.currentTarget.src = pic[1] }} />
)

/* reveal on scroll */
function Rv({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") return setSeen(true)
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setSeen(true), io.disconnect()), { threshold: 0.18 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`id-rv ${seen ? "id-in" : ""} ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>{children}</div>
}

/* headline: words rise out of a mask */
const Words = ({ text, start = 0.15, em }: { text: string; start?: number; em?: boolean }) => (
  <>
    {text.split(" ").map((w, i) => (
      <span key={i}>
        <span className="id-w"><span style={{ "--d": `${start + i * 0.09}s` } as CSSProperties}>{em ? <em>{w}</em> : w}</span></span>{" "}
      </span>
    ))}
  </>
)

const jump = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault()
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}
/* cursor spotlight for cards */
const spot = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`)
}

/* ==================================================================
   COSMOS: starfield + 3D orbits (canvas). Pauses off-screen, static for
   reduced motion.
================================================================== */
type Star = { x: number; y: number; z: number; vx: number; vy: number; ph: number; warm: boolean; sx: number; sy: number }

function Stars({ quiet = false }: { quiet?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current
    const ctx = cv?.getContext("2d")
    if (!cv || !ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let w = 0, h = 0, raf = 0, visible = true
    let ps: Star[] = []
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, tx: 0, ty: 0 }
    const shoot = { x: 0, y: 0, vx: 0, vy: 0, life: 0 }
    let nextShoot = 2800 + Math.random() * 3000

    const size = () => {
      const r = cv.getBoundingClientRect()
      w = r.width; h = r.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.max(1, w * dpr); cv.height = Math.max(1, h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.min(quiet ? 90 : 140, Math.round((w * h) / (quiet ? 12000 : 9000)))
      ps = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h, z: 0.2 + Math.random() * 0.8,
        vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14,
        ph: Math.random() * 6.28, warm: Math.random() < 0.12, sx: 0, sy: 0,
      }))
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      mouse.nx += (mouse.tx - mouse.nx) * 0.05
      mouse.ny += (mouse.ty - mouse.ny) * 0.05
      for (const p of ps) {
        if (!reduce) {
          p.x += p.vx * p.z; p.y += p.vy * p.z
          if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10
        }
        p.sx = p.x - mouse.nx * 46 * p.z
        p.sy = p.y - mouse.ny * 46 * p.z
        const tw = reduce ? 1 : 0.7 + 0.3 * Math.sin(t * 0.0012 * (0.6 + p.z) + p.ph)
        const a = (0.25 + 0.75 * p.z) * tw * (quiet ? 0.75 : 1)
        ctx.fillStyle = p.warm ? `rgba(255,205,170,${a})` : `rgba(200,214,255,${a})`
        ctx.beginPath(); ctx.arc(p.sx, p.sy, 0.5 + p.z * 1.25, 0, 6.283); ctx.fill()
      }
      if (quiet) return
      /* constellation links */
      const R = 125
      ctx.lineWidth = 1
      for (let i = 0; i < ps.length; i++) {
        const a = ps[i]
        if (a.z < 0.5) continue
        for (let j = i + 1; j < ps.length; j++) {
          const b = ps[j]
          if (b.z < 0.5) continue
          const dx = a.sx - b.sx, dy = a.sy - b.sy
          const d2 = dx * dx + dy * dy
          if (d2 < R * R) {
            ctx.strokeStyle = `rgba(143,166,255,${(1 - Math.sqrt(d2) / R) * 0.17})`
            ctx.beginPath(); ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.stroke()
          }
        }
      }
      /* cursor glow + links */
      if (mouse.x > -999) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160)
        g.addColorStop(0, "rgba(111,139,255,.13)"); g.addColorStop(1, "rgba(111,139,255,0)")
        ctx.fillStyle = g; ctx.fillRect(mouse.x - 160, mouse.y - 160, 320, 320)
        for (const p of ps) {
          const d = Math.hypot(p.sx - mouse.x, p.sy - mouse.y)
          if (d < 170) {
            ctx.strokeStyle = `rgba(255,186,148,${(1 - d / 170) * 0.42})`
            ctx.beginPath(); ctx.moveTo(p.sx, p.sy); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
          }
        }
      }
      /* shooting star */
      if (!reduce) {
        if (t > nextShoot && shoot.life <= 0) {
          shoot.x = w * (0.35 + Math.random() * 0.65); shoot.y = Math.random() * h * 0.4
          shoot.vx = -(9 + Math.random() * 4); shoot.vy = 4 + Math.random() * 2; shoot.life = 1
          nextShoot = t + 6500 + Math.random() * 6000
        }
        if (shoot.life > 0) {
          const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - shoot.vx * 7, shoot.y - shoot.vy * 7)
          g.addColorStop(0, `rgba(255,255,255,${shoot.life * 0.9})`); g.addColorStop(1, "rgba(255,255,255,0)")
          ctx.strokeStyle = g; ctx.lineWidth = 1.6
          ctx.beginPath(); ctx.moveTo(shoot.x, shoot.y); ctx.lineTo(shoot.x - shoot.vx * 7, shoot.y - shoot.vy * 7); ctx.stroke()
          shoot.x += shoot.vx; shoot.y += shoot.vy; shoot.life -= 0.018
        }
      }
    }

    const loop = (t: number) => { if (visible) draw(t); raf = requestAnimationFrame(loop) }
    const onMove = (e: PointerEvent) => {
      const r = cv.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
      mouse.tx = e.clientX / window.innerWidth - 0.5; mouse.ty = e.clientY / window.innerHeight - 0.5
    }
    const onLeave = () => { mouse.x = mouse.y = -9999; mouse.tx = mouse.ty = 0 }
    size()
    const ro = new ResizeObserver(() => { size(); if (reduce) draw(0) })
    ro.observe(cv)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(cv)
    if (reduce) draw(0)
    else {
      raf = requestAnimationFrame(loop)
      if (!quiet) { window.addEventListener("pointermove", onMove, { passive: true }); document.addEventListener("pointerleave", onLeave) }
    }
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect()
      window.removeEventListener("pointermove", onMove); document.removeEventListener("pointerleave", onLeave)
    }
  }, [quiet])
  return <canvas ref={ref} className={`id-stars${quiet ? " id-stars-q" : ""}`} aria-hidden="true" />
}

/* orbit system: ky = how flat the ellipse looks, rot = tilt in the screen plane */
type Body = { o: number; s: number; c: string; ring?: boolean }
const ORBITS: { r: number; ky: number; rot: number; sp: number; bodies: Body[] }[] = [
  { r: 1.3, ky: 0.3, rot: -0.38, sp: 0.34, bodies: [{ o: 0, s: 4.5, c: "255,186,148" }, { o: Math.PI, s: 3, c: "230,238,255" }] },
  { r: 1.66, ky: 0.38, rot: 0.42, sp: -0.2, bodies: [{ o: 1.3, s: 7, c: "143,166,255", ring: true }] },
  { r: 2.05, ky: 0.27, rot: -0.92, sp: 0.12, bodies: [{ o: 0.4, s: 3, c: "255,186,148" }, { o: 2.6, s: 2.4, c: "200,215,255" }, { o: 4.5, s: 3.6, c: "143,166,255" }] },
]

function Cosmos({ children }: { children: ReactNode }) {
  const art = useRef<HTMLDivElement>(null)
  const back = useRef<HTMLCanvasElement>(null)
  const front = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const A = art.current, cb = back.current, cf = front.current
    const b = cb?.getContext("2d"), f = cf?.getContext("2d")
    if (!A || !cb || !cf || !b || !f) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let S = 0, raf = 0, visible = true
    const m = { tx: 0, ty: 0, x: 0, y: 0 }

    const size = () => {
      S = cb.getBoundingClientRect().width
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      for (const c of [cb, cf]) { c.width = Math.max(1, S * dpr); c.height = Math.max(1, S * dpr) }
      b.setTransform(dpr, 0, 0, dpr, 0, 0); f.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      m.x += (m.tx - m.x) * 0.05; m.y += (m.ty - m.y) * 0.05
      A.style.setProperty("--px", m.x.toFixed(3)); A.style.setProperty("--py", m.y.toFixed(3))
      b.clearRect(0, 0, S, S); f.clearRect(0, 0, S, S)
      const c = S / 2
      const R = (S / 1.8) * 0.37
      const sec = reduce ? 0 : t / 1000
      for (const o of ORBITS) {
        const ky = o.ky - m.y * 0.06, rot = o.rot + m.x * 0.16, rr = o.r * R
        const cr = Math.cos(rot), sr = Math.sin(rot)
        const ring = (g: CanvasRenderingContext2D, fr: boolean) => {
          g.save(); g.translate(c, c); g.rotate(rot)
          g.beginPath(); g.ellipse(0, 0, rr, rr * ky, 0, fr ? 0 : Math.PI, fr ? Math.PI : Math.PI * 2)
          g.strokeStyle = fr ? "rgba(190,205,255,.28)" : "rgba(190,205,255,.1)"; g.lineWidth = 1; g.stroke(); g.restore()
        }
        ring(b, false); ring(f, true)
        const pt = (a: number): [number, number] => {
          const ex = rr * Math.cos(a), ey = rr * Math.sin(a) * ky
          return [c + ex * cr - ey * sr, c + ex * sr + ey * cr]
        }
        for (const bd of o.bodies) {
          const a = bd.o + sec * o.sp
          const dir = o.sp > 0 ? 1 : -1
          const depth = Math.sin(a)
          const sc = 1 + depth * 0.3
          /* trail */
          for (let k = 1; k <= 26; k++) {
            const aa = a - dir * k * 0.04
            const sd = Math.sin(aa)
            const [x, y] = pt(aa)
            const g = sd > 0 ? f : b
            g.fillStyle = `rgba(${bd.c},${(1 - k / 26) * 0.42 * (sd > 0 ? 1 : 0.45)})`
            g.beginPath(); g.arc(x, y, Math.max(0.3, bd.s * (1 - k / 30) * 0.5 * sc), 0, 6.283); g.fill()
          }
          const [x, y] = pt(a)
          const g = depth > 0 ? f : b
          const s = bd.s * sc
          g.globalAlpha = depth > 0 ? 1 : 0.7
          const gr = g.createRadialGradient(x, y, 0, x, y, s * 5)
          gr.addColorStop(0, `rgba(${bd.c},.55)`); gr.addColorStop(1, `rgba(${bd.c},0)`)
          g.fillStyle = gr; g.beginPath(); g.arc(x, y, s * 5, 0, 6.283); g.fill()
          g.fillStyle = `rgb(${bd.c})`; g.beginPath(); g.arc(x, y, s, 0, 6.283); g.fill()
          g.fillStyle = "rgba(255,255,255,.85)"; g.beginPath(); g.arc(x - s * 0.25, y - s * 0.25, s * 0.45, 0, 6.283); g.fill()
          if (bd.ring) {
            g.save(); g.translate(x, y); g.rotate(-0.45)
            g.strokeStyle = "rgba(255,255,255,.6)"; g.lineWidth = 1.1
            g.beginPath(); g.ellipse(0, 0, s * 2.4, s * 0.8, 0, 0, 6.283); g.stroke(); g.restore()
          }
          g.globalAlpha = 1
        }
      }
    }

    const loop = (t: number) => { if (visible) draw(t); raf = requestAnimationFrame(loop) }
    const onMove = (e: PointerEvent) => { m.tx = (e.clientX / window.innerWidth - 0.5) * 2; m.ty = (e.clientY / window.innerHeight - 0.5) * 2 }
    size()
    const ro = new ResizeObserver(() => { size(); if (reduce) draw(0) })
    ro.observe(cb)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(A)
    if (reduce) draw(0)
    else { raf = requestAnimationFrame(loop); window.addEventListener("pointermove", onMove, { passive: true }) }
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener("pointermove", onMove) }
  }, [])
  return (
    <div className="id-hero-art" ref={art} aria-hidden="true">
      <canvas ref={back} className="id-orb id-orb-back" />
      <span className="id-halo" />
      {children}
      <canvas ref={front} className="id-orb id-orb-front" />
    </div>
  )
}

const steps = [
  {
    t: "Collect",
    d: "Clinical, environmental and epidemiological data from the field.",
    c: "#2457e6",
  },
  {
    t: "Sequence",
    d: "Real-time metagenomics shows which pathogens are circulating.",
    c: "#3d7bf0",
  },
  {
    t: "Model",
    d: "Machine learning and statistics estimate transmission and risk.",
    c: "#6f7cf0",
  },
  {
    t: "Decide",
    d: "Findings inform public health preparedness and action.",
    c: "#f4a24c",
  },
]

export default function InfectiousPage(props: {
  topics: InfTopic[]
  projects: Project[]
  photos: Pic[]
  hero: Pic
  campus: Pic
  nav?: NavItem[]
  next: { label: string; path: string }
}) {
  const { topics, projects, photos, hero, campus, next } = props
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])
  const feat = projects.find((p) => p.status === "In progress") ?? projects[0]
  const rest = projects.filter((p) => p !== feat)
  const rem = rest.length % 3
  const spanOf = (i: number) => (rem && i >= rest.length - rem ? (rem === 1 ? "id-s6" : "id-s3") : "id-s2")

  return (
    <div className={`id ${ready ? "id-ready" : ""}`}>
      {/* ===== HERO ===== */}
      <section className="id-hero">
        <div className="id-nebula" aria-hidden="true"><i /><i /><i /></div>
        <Stars />
        <div className="container id-hero-grid">
          <div className="id-hero-copy">
            <a href="/tools" className="id-crumb" onClick={(e) => { e.preventDefault(); go("/tools") }}>Research tools <i>/</i> Infectious disease</a>
            <h1>
              <span className="id-line"><Words text="Infectious disease" start={0.15} /></span>
              <span className="id-line"><Words text="research." start={0.45} em /></span>
            </h1>
            <p className="id-lead">Genomic surveillance and predictive modelling of respiratory pathogens to support public health preparedness.</p>
            <div className="id-actions">
              <a href="#id-cases" className="id-btn" onClick={jump("id-cases")}>Explore focus areas <Arrow /></a>
              <a href="#id-proj" className="id-textlink" onClick={jump("id-proj")}>Related projects</a>
            </div>
          </div>
          <Cosmos>
            <div className="id-photo"><Photo pic={hero} /></div>
          </Cosmos>
        </div>
      </section>

      {/* ===== CASE FILES ===== */}
      <section id="id-cases" className="id-cases">
        <Stars quiet />
        <div className="container">
          {topics.map((t, i) => {
            const [grant, status] = (t.project ?? "").split(" · ")
            return (
              <Rv key={t.title} className="id-case-wrap">
                <article className={`id-case ${i % 2 ? "id-flip" : ""}`} onMouseMove={spot}>
                  <span className="id-spot" aria-hidden="true" />
                  <div className="id-media">
                    <Photo pic={photos[i % photos.length]} />
                    <span className="id-scan" aria-hidden="true" />
                    <span className="id-num">0{i + 1}</span>
                  </div>
                  <div className="id-body">
                    <span className="id-kicker"><i />{t.subtitle}</span>
                    <h2>{t.title}</h2>
                    <p>{t.detail}</p>
                    <ul>{t.tags.map((x) => <li key={x}>{x}</li>)}</ul>
                    <p className="id-ctx">{t.context}</p>
                    {t.project && (
                      <div className="id-ticket">
                        <span className="id-ticket-k">Funded</span>
                        <span className="id-ticket-v">{grant}</span>
                        {status && <em><u />{status}</em>}
                      </div>
                    )}
                  </div>
                </article>
              </Rv>
            )
          })}
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section className="id-flow">
        <div className="container">
          <Rv className="id-head id-head-row">
            <div>
              <div className="id-eyebrow"><span />HOW WE WORK</div>
              <h2>From sample to <em>analysis.</em></h2>
            </div>
            <p className="id-head-note">Four connected steps that turn field samples into evidence public health teams can act on.</p>
          </Rv>
          <Rv>
            <ol className="id-flist">
              {steps.map((s, i) => (
                <li key={s.t} className="id-fstep" style={{ "--i": i, "--c": s.c } as CSSProperties}>
                  <div className="id-fcard">
                    <span className="id-fnum">0{i + 1}</span>
                    <strong>{s.t}</strong>
                    <p>{s.d}</p>
                  </div>
                  {i < steps.length - 1 && <span className="id-fjoin" aria-hidden="true"><Arrow size={15} /></span>}
                </li>
              ))}
            </ol>
          </Rv>
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section id="id-proj" className="id-proj">
        <div className="container">
          <Rv className="id-head id-head-row">
            <div>
              <div className="id-eyebrow"><span />OUR WORK IN ACTION</div>
              <h2>Related <em>projects.</em></h2>
            </div>
            <a href="/projects" className="id-link" onClick={(e) => { e.preventDefault(); go("/projects") }}>View all projects <Arrow /></a>
          </Rv>
          <div className="id-pgrid">
            {feat && (
              <Rv className="id-pwrap id-s6">
                <a href="/projects" className="id-pfeat" onClick={(e) => { e.preventDefault(); go("/projects") }}>
                  <span className="id-pfeat-year" aria-hidden="true">{feat.year}</span>
                  <span className="id-pfeat-body">
                    <span className="id-ptop">
                      <span className="id-pcode">{feat.code}</span>
                      {feat.status === "In progress" && <em className="id-live"><u />In progress</em>}
                    </span>
                    <strong>{feat.title}</strong>
                    <span className="id-pfeat-foot">
                      <span>{feat.funder}</span>
                      <span className="id-pbtn">View project <Arrow size={16} /></span>
                    </span>
                  </span>
                </a>
              </Rv>
            )}
            {rest.map((p, i) => (
              <Rv key={p.code} delay={(i % 3) * 100} className={`id-pwrap ${spanOf(i)}`}>
                <a href="/projects" className="id-pcard" onClick={(e) => { e.preventDefault(); go("/projects") }}>
                  <span className="id-ptop">
                    <span className="id-pyr">{p.year}</span>
                    <span className="id-pcode">{p.code}</span>
                  </span>
                  <strong>{p.title}</strong>
                  <span className="id-pfoot"><span>{p.funder}</span><span className="id-go"><Arrow size={15} /></span></span>
                </a>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEXT ===== */}
      <section className="id-next">
        <Photo pic={campus} />
        <a href={next.path} className="container id-next-in" onClick={(e) => { e.preventDefault(); go(next.path) }}>
          <span>Continue exploring</span><strong>{next.label}</strong><i><Arrow /></i>
        </a>
      </section>
    </div>
  )
}