import type { ReactNode } from "react"
import logo from "../../assets/brand/logo.png"
import { Arrow } from "../ui/Arrow"
import { ADDRESS_LINES, SOCIAL_LINKS } from "../../data/site"
import type { LinkFn, Page } from "../../routes"
import "./footer.css"

const socialIcons: Record<string, ReactNode> = {
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
    </svg>
  ),
  Medium: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6.8" cy="12" r="5.3" />
      <ellipse cx="16.4" cy="12" rx="2.7" ry="5" />
      <rect x="21" y="7.2" width="1.8" height="9.6" rx=".9" />
    </svg>
  ),
}

export function Footer({ link, page }: { link: LinkFn; page: Page }) {
  const explore: { page: Page; label: string }[] = [
    { page: "home", label: "Home" },
    { page: "about", label: "About us" },
    { page: "projects", label: "Our projects" },
    { page: "tools", label: "Research tools" },
  ]
  return (
    <footer className="site-footer">
      <div className="container ft-main">
        <div className="ft-col ft-brand-col">
          <div className="ft-brand">
            <img src={logo} alt="" />
            <span>
              <strong>
                DASHRES<i>.</i>
              </strong>
              <small>RESEARCH GROUP</small>
            </span>
          </div>
          <p>
            Advancing health through the thoughtful intersection of data,
            discovery and care.
          </p>
        </div>

        <nav className="ft-col" aria-label="Footer navigation">
          <span className="ft-label">EXPLORE</span>
          {explore.map((item) =>
            link(
              item.page,
              <>
                {item.label}
                <Arrow />
              </>,
              `ft-link ${page === item.page ? "ft-link-active" : ""}`,
            ),
          )}
        </nav>

        <div className="ft-col">
          <span className="ft-label">GET IN TOUCH</span>
          <div className="ft-contact">
            <span className="ft-ico" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.7" />
              </svg>
            </span>
            <address>
              {ADDRESS_LINES.map((line, i) => (
                <span key={line}>
                  {i > 0 && <br />}
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>

        <div className="ft-col">
          <span className="ft-label">FOLLOW US</span>
          <div className="ft-social">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`DASHRES on ${item.name}`}
              >
                {socialIcons[item.name]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="container ft-bottom">
        <span>© {new Date().getFullYear()} DASHRES Research Group</span>
        <span>Research for a healthier tomorrow.</span>
      </div>
    </footer>
  )
}
