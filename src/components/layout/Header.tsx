import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import logo from "../../assets/brand/logo.png"
import { navItems, toolPages } from "../../routes"
import type { LinkFn, Page } from "../../routes"
import "./header.css"

export function Header({ page, link }: { page: Page; link: LinkFn }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const progressRef = useRef<HTMLSpanElement>(null)

  // close the mobile menu whenever the page changes
  useEffect(() => setMenuOpen(false), [page])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [page])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const navLinkArrow: ReactNode = (
    <svg className="nav-link-arrow" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )

  return (
    <>
      <div
        className={`nav-backdrop ${menuOpen ? "show" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          {link(
            "home",
            <>
              <img src={logo} alt="" className="brand-symbol" />
              <span className="brand-copy">
                <strong>
                  DASHRES<span className="brand-dot">.</span>
                </strong>
                <small>RESEARCH GROUP</small>
              </span>
            </>,
            "brand",
          )}
          <nav className={`nav ${menuOpen ? "nav-open" : ""}`} aria-label="Main navigation">
            <div className="nav-pill">
              {navItems.map(([item, label]) =>
                link(
                  item,
                  <>
                    <span>{label}</span>
                    {navLinkArrow}
                  </>,
                  `nav-link ${page === item || (item === "tools" && toolPages.includes(page)) ? "active" : ""}`,
                ),
              )}
            </div>
          </nav>
          <div className="header-actions">
            <button
              className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <span className="scroll-progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
      </header>
    </>
  )
}
