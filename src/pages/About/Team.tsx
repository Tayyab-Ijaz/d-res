import { useEffect, useRef } from "react"
import { Arrow } from "../../components/ui/Arrow"
import { Icon } from "./icons"
import { Reveal } from "./Reveal"
import type { Member } from "./content"

export function Avatar({ member, large }: { member: Member; large?: boolean }) {
  return (
    <div className={`ab-avatar-ring ${large ? "ab-avatar-ring-lg" : ""}`}>
      <div className="ab-avatar">
        {member.photo ? (
          <img src={member.photo} alt={member.name} />
        ) : (
          <span>{member.initials}</span>
        )}
      </div>
    </div>
  )
}

export function LeadCard({ member, onOpen }: { member: Member; onOpen: () => void }) {
  return (
    <Reveal className="ab-lead-wrap">
      <article className="ab-lead-card">
        <div className="ab-lead-glow" aria-hidden="true" />
        <div className="ab-lead-avatar">
          <Avatar member={member} large />
        </div>
        <div className="ab-lead-main">
          <span className="ab-role ab-role-light">{member.role}</span>
          <h3>{member.name}</h3>
          <p className="ab-lead-meta">
            {member.degrees}
            <span aria-hidden="true" className="ab-dot" />
            {member.affiliation}
          </p>
          <p className="ab-lead-text">{member.summary}</p>
          <ul className="ab-tags ab-tags-light">
            {member.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="ab-lead-actions">
            <button type="button" className="ab-btn ab-btn-accent" onClick={onOpen} aria-haspopup="dialog">
              Read full profile <Arrow />
            </button>
            {member.scholar && (
              <a href={member.scholar} target="_blank" rel="noopener noreferrer" className="ab-btn ab-btn-outline-light">
                Google Scholar
              </a>
            )}
          </div>
        </div>
        <div className="ab-lead-stats">
          <div>
            <strong>550+</strong>
            <span>Peer-reviewed publications</span>
          </div>
          <div>
            <strong>16+</strong>
            <span>Years in biomedical research</span>
          </div>
          <div>
            <strong>Top 2%</strong>
            <span>World scientists, Stanford–Elsevier</span>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export function TeamCard({
  member,
  index,
  tone,
  onOpen,
}: {
  member: Member
  index: number
  tone: number
  onOpen: () => void
}) {
  return (
    <Reveal
      as="article"
      delay={(index % 3) * 110}
      className={`ab-member-wrap ${index < 3 ? "ab-span-2" : "ab-span-3"}`}
    >
      <div className={`ab-member ab-tone-${tone}`}>
        <div className="ab-member-top">
          <Avatar member={member} />
          <div>
            <h3>{member.name}</h3>
            <span className="ab-role">{member.role}</span>
          </div>
        </div>
        <div className="ab-member-line" aria-hidden="true" />
        <p className="ab-degrees">
          {member.degrees}
          {member.affiliation && (
            <>
              <span aria-hidden="true" className="ab-dot" />
              {member.affiliation}
            </>
          )}
        </p>
        <p className="ab-summary">{member.summary}</p>
        <ul className="ab-tags">
          {member.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        <button type="button" className="ab-member-btn" onClick={onOpen} aria-haspopup="dialog">
          View profile <Arrow />
        </button>
      </div>
    </Reveal>
  )
}

export function ProfileDialog({ member, onClose }: { member: Member; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeRef.current?.focus()
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
      previouslyFocused?.focus?.()
    }
  }, [onClose])

  return (
    <div
      className="ab-modal"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="ab-dialog" role="dialog" aria-modal="true" aria-label={`${member.name} profile`}>
        <button ref={closeRef} type="button" className="ab-dialog-close" onClick={onClose} aria-label="Close profile">
          <Icon name="close" size={18} />
        </button>
        <div className="ab-dialog-head">
          <Avatar member={member} large />
          <div>
            <span className="ab-role">{member.role}</span>
            <h3>{member.name}</h3>
            <p className="ab-degrees">
              {member.degrees}
              {member.affiliation && (
                <>
                  <span aria-hidden="true" className="ab-dot" />
                  {member.affiliation}
                </>
              )}
            </p>
          </div>
        </div>
        <p className="ab-dialog-bio">{member.bio}</p>
        <ul className="ab-tags">
          {member.focus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
        {(member.scholar || member.scopus) && (
          <div className="ab-dialog-links">
            {member.scholar && (
              <a href={member.scholar} target="_blank" rel="noopener noreferrer">
                Google Scholar <Arrow />
              </a>
            )}
            {member.scopus && (
              <a href={member.scopus} target="_blank" rel="noopener noreferrer">
                Scopus <Arrow />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
