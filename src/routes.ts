import type { ReactNode } from "react"
import { areas as hubAreas } from "./pages/Tools/ToolsHub"
import type { HubPage } from "./pages/Tools/ToolsHub"

export type Page = "home" | "about" | "projects" | HubPage

/** Renders an in-app link; provided by <App /> to every page. */
export type LinkFn = (next: Page, children: ReactNode, className?: string) => ReactNode

/** Pages that live under the "Tools" nav item. */
export const toolPages: Page[] = ["tools", ...hubAreas.map((a) => a.page)]

export const pagePath = (p: Page) =>
  p === "home"
    ? "/"
    : p === "tools"
      ? "/tools"
      : (hubAreas.find((a) => a.page === p)?.path ?? `/${p}`)

export const pageFromPath = (): Page => {
  const path = window.location.pathname.replace(/\/$/, "").slice(1)
  const area = hubAreas.find((a) => a.path === "/" + path)
  if (area) return area.page
  return path === "about" || path === "projects" || path === "tools" ? path : "home"
}

export const navItems: [Page, string][] = [
  ["home", "Home"],
  ["about", "About"],
  ["projects", "Projects"],
  ["tools", "Tools"],
]
