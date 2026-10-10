import imgPostpartum from "../../assets/fallbacks/postpartum.png"
import imgPathogen from "../../assets/fallbacks/pathogen.png"
import imgOmics from "../../assets/fallbacks/multi-omics.png"
import imgExplainable from "../../assets/fallbacks/explainable-ai.png"
import imgFlowData from "../../assets/fallbacks/flow-data.jpg"
import imgFlowMethods from "../../assets/fallbacks/flow-methods.jpg"
import imgFlowInsight from "../../assets/fallbacks/flow-insight.jpg"
import imgFlowCare from "../../assets/fallbacks/flow-care.jpg"
import imgHero1 from "../../assets/home/hero-1.jpg"
import imgHero2 from "../../assets/home/hero-2.jpg"
import imgHero3 from "../../assets/home/hero-3.jpg"
import imgAreaAi from "../../assets/home/area-ai.jpg"
import imgAreaMaternal from "../../assets/home/area-maternal.jpg"
import imgAreaDiagnostics from "../../assets/home/area-diagnostics.jpg"
import imgAreaBio from "../../assets/home/area-bioinformatics.jpg"
import imgJourneyData from "../../assets/home/journey-data.jpg"
import imgJourneyDiscovery from "../../assets/home/journey-discovery.jpg"
import imgJourneyEvidence from "../../assets/home/journey-evidence.jpg"
import imgJourneyImpact from "../../assets/home/journey-impact.jpg"

export const heroSlides = [
  {
    image: imgHero1,
    alt: "Researcher loading a sample plate with a pipette in a laboratory",
    label: "Laboratory research",
  },
  {
    image: imgHero2,
    alt: "Nurse and child sharing a high five during a clinic visit",
    label: "Pediatric and maternal health",
  },
  {
    image: imgHero3,
    alt: "Scientist at a microscope silhouetted against blue light",
    label: "Biomedical discovery",
  },
]

export const homeAreas = [
  {
    number: "01",
    title: "AI in Healthcare",
    text: "Machine learning and explainable AI applied to health data for clinical and public health decision support.",
    image: imgAreaAi,
    fallback: imgExplainable,
    alt: "Doctor reviewing a brain scan on a tablet",
  },
  {
    number: "02",
    title: "Maternal & Child Health",
    text: "Research on maternal mental health, pediatric nursing and early childhood screening.",
    image: imgAreaMaternal,
    fallback: imgPostpartum,
    alt: "Newborn infant held by a healthcare professional in a hospital",
  },
  {
    number: "03",
    title: "Disease & Diagnostics",
    text: "Pathogen surveillance, disease prediction and diagnostic modelling.",
    image: imgAreaDiagnostics,
    fallback: imgPathogen,
    alt: "Gloved hands handling a sample tube in protective clothing",
  },
  {
    number: "04",
    title: "Bioinformatics",
    text: "Multi-omics, biomarker discovery and structure-guided drug discovery.",
    image: imgAreaBio,
    fallback: imgOmics,
    alt: "Researchers analysing data at a computer",
  },
]

export const journeySteps = [
  {
    title: "Data",
    text: "Clinical & genomic data",
    image: imgJourneyData,
    fallback: imgFlowData,
    alt: "Laptop displaying a health data analytics dashboard",
    color: "#14245c",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="16" cy="8" rx="9" ry="3.5" />
        <path d="M7 8v8c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V8M7 16v8c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5v-8" />
      </svg>
    ),
  },
  {
    title: "Discovery",
    text: "Computational research",
    image: imgJourneyDiscovery,
    fallback: imgFlowMethods,
    alt: "Researcher working at a microscope in the lab",
    color: "#1fb5bd",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="24" height="16" rx="2" />
        <path d="M12 27h8M16 21v6" />
        <circle cx="16" cy="13" r="3" />
        <path d="M16 8v2M16 16v2M11 13h2M19 13h2" />
      </svg>
    ),
  },
  {
    title: "Evidence",
    text: "Biological & clinical insight",
    image: imgJourneyEvidence,
    fallback: imgFlowInsight,
    alt: "Electron microscopy image of virus particles",
    color: "#3b6fe0",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 4c0 6 12 6 12 12s-12 6-12 12M22 4c0 6-12 6-12 12s12 6 12 12" />
        <path d="M12 8h8M12 24h8M11 16h10" />
      </svg>
    ),
  },
  {
    title: "Application",
    text: "Clinical & public health use",
    image: imgJourneyImpact,
    fallback: imgFlowCare,
    alt: "Nurse vaccinating an infant held by their mother",
    color: "#f48a4f",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="13" cy="10" r="4.5" />
        <path d="M4 27c0-5.5 4-9 9-9 2 0 3.7.6 5 1.6" />
        <circle cx="23.5" cy="22.5" r="5" />
        <path d="M23.5 20v5M21 22.5h5" />
      </svg>
    ),
  },
]

export const statIcon = {
  users: (
    <svg viewBox="0 0 32 32" fill="none"><circle cx="12" cy="11" r="4" stroke="currentColor" strokeWidth="1.6"/><circle cx="22" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/><path d="M4 26c0-5 3.5-8 8-8s8 3 8 8M20 19c4-.6 8 1.5 8 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  doc: (
    <svg viewBox="0 0 32 32" fill="none"><path d="M9 4h10l6 6v18H9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M19 4v6h6M13 16h8M13 20h8M13 24h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
  ),
  book: (
    <svg viewBox="0 0 32 32" fill="none"><path d="M5 7c4-1.5 8-1 11 2 3-3 7-3.5 11-2v18c-4-1.5-8-1-11 2-3-3-7-3.5-11-2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M16 9v18" stroke="currentColor" strokeWidth="1.6"/></svg>
  ),
}

export const homeStats = [
  { value: 26, plus: true, label: "RESEARCH PROJECTS", icon: statIcon.doc },
  { value: 6, plus: false, label: "INVESTIGATORS", icon: statIcon.users },
  { value: 5, plus: false, label: "RESEARCH THEMES", icon: statIcon.book },
]
