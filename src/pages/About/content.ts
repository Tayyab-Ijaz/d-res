import imgFlowMethods from "../../assets/fallbacks/flow-methods.jpg"
import imgExplainable from "../../assets/fallbacks/explainable-ai.png"
import imgPostpartum from "../../assets/fallbacks/postpartum.png"
import imgPathogen from "../../assets/fallbacks/pathogen.png"
import imgPredictive from "../../assets/fallbacks/predictive.png"
import imgThemePathogen from "../../assets/topics/pathogen.jpg"
import imgThemeBio from "../../assets/home/area-bioinformatics.jpg"
import imgThemeMaternal from "../../assets/home/area-maternal.jpg"
import imgThemeDiagnostics from "../../assets/home/area-ai.jpg"
import imgThemeEpi from "../../assets/topics/predictive.jpg"

export const stats = [
  { to: 6, suffix: "", label: "Investigators" },
  { to: 5, suffix: "", label: "Research themes" },
  { to: 26, suffix: "", label: "Research projects since 2020" },
  { to: 550, suffix: "+", label: "Publications by our group lead" },
]

export const pillars = [
  {
    title: "Computational science",
    text: "Bioinformatics, machine learning, scientific computing and industrial mathematics.",
  },
  {
    title: "Biomedical research",
    text: "Molecular genetics, neuroscience, biotechnology and clinical psychology.",
  },
  {
    title: "Clinical & nursing practice",
    text: "Pediatric, maternal-child and community health, from diagnostics to decision support.",
  },
] as const

export const missionItems = [
  "Apply machine learning, deep learning and explainable AI to mental health, infectious disease, oncology, maternal-child health and chronic disease management.",
  "Integrate bioinformatics and multi-omics approaches with clinical, healthcare and nursing research.",
  "Build a multidisciplinary pipeline from molecular and computational biology to clinical nursing and healthcare science.",
  "Secure and deliver funded research grants in health-AI integration.",
  "Mentor early-career researchers and postgraduate students in data-driven health research.",
]

export const themes = [
  {
    tag: "Infectious disease",
    title: "AI in disease surveillance",
    text: "Real-time metagenomic surveillance and predictive modelling of respiratory pathogen transmission, including explainable AI for vaccination uptake.",
    image: imgThemePathogen,
    fallback: imgPathogen,
    alt: "Staff in protective equipment at a mobile testing laboratory",
  },
  {
    tag: "Computational biology",
    title: "Bioinformatics & computational biology",
    text: "Multi-omics biomarker discovery, structure-guided drug discovery, immunoinformatics and vaccine design.",
    image: imgThemeBio,
    fallback: imgFlowMethods,
    alt: "Researchers analysing data at a computer",
  },
  {
    tag: "Maternal & child health",
    title: "AI in nursing & maternal-child health",
    text: "Machine learning for autism screening in toddlers, maternal work stress and infant attachment, and AI in pediatric nursing practice.",
    image: imgThemeMaternal,
    fallback: imgPostpartum,
    alt: "Newborn infant held by a healthcare professional in a hospital",
  },
  {
    tag: "Diagnostics",
    title: "Deep learning for diagnostics",
    text: "Image-based diagnostic models, including skin cancer detection and automated dental-image analysis.",
    image: imgThemeDiagnostics,
    fallback: imgExplainable,
    alt: "Doctor reviewing a brain scan on a tablet",
  },
  {
    tag: "Epidemiology",
    title: "Theragnostics & computational epidemiology",
    text: "Statistical and computational synthesis across infectious, chronic, lifestyle and mental-health conditions.",
    image: imgThemeEpi,
    fallback: imgPredictive,
    alt: "Illustration of a coronavirus particle",
  },
] as const

export type Member = {
  name: string
  initials: string
  role: string
  lead?: boolean
  degrees: string
  affiliation?: string
  summary: string
  focus: string[]
  bio: string
  photo?: string // add a portrait path or URL to replace the initials avatar
  scholar?: string
  scopus?: string
}

export const team: Member[] = [
  {
    name: "Prof. Shafiul Haque",
    initials: "SH",
    role: "Group Lead / Principal Investigator",
    lead: true,
    degrees: "PhD, MBA, MTech, MSc",
    affiliation: "Jazan University, Saudi Arabia",
    summary:
      "Professor of Microbiology and Molecular Genetics and an accomplished research leader, scientific manager and mentor. His work spans infection biology, oncology, antimicrobial resistance, bioinformatics and AI-driven healthcare.",
    focus: ["Microbiology & molecular genetics", "Oncology", "AI-driven healthcare"],
    bio: "Professor of Microbiology and Molecular Genetics at Jazan University with over 16 years of experience in biomedical and health sciences research. He has authored more than 550 peer-reviewed publications and is listed among the World's Top 2% Scientists (Stanford–Elsevier). His work spans infection biology, oncology, antimicrobial resistance, bioinformatics, translational medicine, public health and AI-driven healthcare. He led Jazan University's Research and Scientific Studies Unit for over a decade and has worked with institutions in Europe, the Middle East and South America.",
    scholar:
      "https://scholar.google.com/citations?hl=en&user=-9eMlYkAAAAJ&view_op=list_works&sortby=pubdate",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=35793732800",
  },
  {
    name: "Dr. Darin Mansor Mathkor",
    initials: "DM",
    role: "Group Member / Investigator",
    degrees: "PhD, MSN, RN, BSN",
    affiliation: "Jazan University, Saudi Arabia",
    summary:
      "Pediatric nursing scientist and former Vice Dean of Research and Development, applying explainable AI to pediatric and maternal-infant health.",
    focus: ["Pediatric nursing", "Maternal-infant health"],
    bio: "Assistant Professor of Pediatric Nursing at Jazan University and a licensed Registered Nurse in Saudi Arabia and the United States. A Wayne State University PhD graduate, she has served as Vice Dean of Research and Development and Head of Department at the College of Nursing. Her research brings together nursing science, infectious disease surveillance, health behaviour and explainable AI in pediatric and maternal-infant health, supported by competitive grants including the Saudi NIH Hajj grant.",
    scholar:
      "https://scholar.google.com/citations?hl=ar&user=VD8ExhoAAAAJ&view_op=list_works&sortby=pubdate",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=57844682400",
  },
  {
    name: "Dr. Faraz Ahmad",
    initials: "FA",
    role: "International Investigator",
    degrees: "PhD, MSc",
    affiliation: "Vellore Institute of Technology, India",
    summary:
      "Molecular neuroscientist studying brain disease and neurotoxicity, with a focus on AI for mental health.",
    focus: ["Molecular neuroscience", "Mental health"],
    bio: "Associate Professor in the School of Bio Sciences and Technology at Vellore Institute of Technology. He earned his PhD at the University of Helsinki and completed postdoctoral work in Korea and New Zealand. A cellular and molecular neuroscientist studying the neurobiology of brain disease and neurotoxicity, he has authored more than 100 publications. At DASHRES he contributes expertise in molecular neuroscience, psychology and AI for mental health.",
    scholar:
      "https://scholar.google.com/citations?hl=en&user=07KInx0AAAAJ&view_op=list_works&sortby=pubdate",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=7101861867",
  },
  {
    name: "Dr. Sandeep K. Singh",
    initials: "SS",
    role: "International Investigator",
    degrees: "PhD, MTech",
    affiliation: "O.P. Jindal Global University, India",
    summary:
      "AI researcher applying machine learning and mathematical modelling to healthcare problems.",
    focus: ["Artificial intelligence", "Mathematical modelling"],
    bio: "Associate Professor of Artificial Intelligence at Jindal Global Business School, O.P. Jindal Global University. He holds a PhD in Computational Physics from the University of Antwerp and an M.Tech in Industrial Mathematics and Scientific Computing from IIT Madras, and worked as a Research Scientist in Sweden. With over fifty research publications, he contributes to DASHRES by applying AI and machine learning to healthcare problems.",
    scholar:
      "https://scholar.google.com/citations?hl=en&user=HiUIY5gAAAAJ&view_op=list_works&sortby=pubdate",
    scopus: "https://www.scopus.com/authid/detail.uri?authorId=58180533500",
  },
  {
    name: "Dr. Raju K. Mandal",
    initials: "RM",
    role: "Group Member / Investigator",
    degrees: "PhD, MSc",
    summary:
      "Investigator leading research on meta-synthesis, cancer genomic markers and phytochemicals in oncology.",
    focus: ["Cancer genomics", "Meta-analysis"],
    bio: "Group member and investigator at DASHRES. Dr. Mandal has led funded research projects on meta-synthesis for theragnostic strategies, genomic markers for the detection and treatment of cancer, TAP2 gene polymorphism in cancer, and the role of phytochemicals in targeting oncogenic signalling.",
  },
  {
    name: "Dr. Mohd Wahid",
    initials: "MW",
    role: "Group Member / Investigator",
    degrees: "PhD, MSc",
    summary:
      "Investigator leading research on precision drug targeting for cancer, diabetes and metabolic disorders.",
    focus: ["Precision drug targeting", "Chronic disease"],
    bio: "Group member and investigator at DASHRES. Dr. Wahid has led funded research projects on precision drug-targeting approaches for the treatment of chronic conditions, including cancer, diabetes and metabolic disorders.",
  },
]
