import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { Header } from "./components/layout/Header"
import { Footer } from "./components/layout/Footer"
import Home from "./pages/Home/Home"
import About from "./pages/About/About"
import Projects from "./pages/Projects/Projects"
import ToolsHub from "./pages/Tools/ToolsHub"
import type { HubPage } from "./pages/Tools/ToolsHub"
import { tools } from "./data/tools"
import { mhProjects } from "./data/mental-health-projects"
import { pageFromPath, pagePath } from "./routes"
import type { LinkFn, Page } from "./routes"

/**
 * App shell: tiny history-API router + site chrome (header / footer).
 * Pages live in src/pages/*.
 */
export default function App() {
  const [page, setPage] = useState<Page>(pageFromPath)

  // keep state in sync with the browser back/forward buttons
  useEffect(() => {
    const onPopState = () => setPage(pageFromPath())
    window.addEventListener("popstate", onPopState)
    return () => window.removeEventListener("popstate", onPopState)
  }, [])

  const navigate = (next: Page) => {
    window.history.pushState({}, "", pagePath(next))
    setPage(next)
    window.scrollTo({ top: 0, behavior: "instant" })
  }

  const link: LinkFn = (next: Page, children: ReactNode, className = "") => (
    <a
      href={pagePath(next)}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        navigate(next)
      }}
    >
      {children}
    </a>
  )

  return (
    <div className="site-shell">
      <Header page={page} link={link} />
      <main>
        {page === "home" ? (
          <Home link={link} />
        ) : page === "about" ? (
          <About link={link} />
        ) : page === "projects" ? (
          <Projects />
        ) : page === "mental-health" ? (
          <ToolsHub page="mental-health" tools={tools} projects={mhProjects} />
        ) : (
          <ToolsHub page={page as HubPage} tools={tools} />
        )}
      </main>
      <Footer link={link} page={page} />
    </div>
  )
}
