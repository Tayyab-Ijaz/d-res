import imgTopicPpd from "../assets/topics/ppd.jpg"
import imgTopicStress from "../assets/topics/stress.jpg"
import imgTopicPediatric from "../assets/topics/pediatric.jpg"
import imgTopicEarly from "../assets/topics/early.jpg"
import imgTopicPathogen from "../assets/topics/pathogen.jpg"
import imgTopicPredictive from "../assets/topics/predictive.jpg"
import imgTopicOmics from "../assets/topics/omics.jpg"
import imgTopicExplainable from "../assets/topics/explainable.jpg"

export type ToolCategory = "Mental health" | "Maternal & child health" | "Infectious disease" | "AI & bioinformatics"

export const tools: {
  title: string
  category: ToolCategory
  subtitle: string
  description: string
  detail: string
  number: string
  image: string
  tags: string[]
  context: string
  project?: string
  link?: string
}[] = [
  {
    number: "01",
    title: "Postpartum depression (PPD)",
    category: "Mental health",
    subtitle: "Maternal mental health",
    description:
      "Research on postpartum depression and maternal wellbeing, using data-driven approaches to support understanding and care.",
    detail:
      "Our research on maternal mental health examines postpartum depression, maternal work stress, breastfeeding and infant attachment, using data-driven models to better understand maternal wellbeing and support care.",
    image: imgTopicPpd,
    tags: ["Maternal wellbeing", "Mental health", "Data analytics"],
    context:
      "This focus sits within DASHRES's commitment to the health of mothers and children. It is a research overview, not a diagnostic or screening tool.",
    link: "https://ppd.dashres.net/",
  },
  {
    number: "02",
    title: "Stress & depression research",
    category: "Mental health",
    subtitle: "Molecular neurobiology",
    description:
      "Research linking the molecular neurobiology of stress and depression with behavioral and clinical health studies.",
    detail:
      "We study the molecular neurobiology of stress and depression, connecting laboratory findings on brain disease mechanisms with behavioral science and clinical psychology.",
    image: imgTopicStress,
    tags: ["Neurobiology", "Behavioral science", "Clinical psychology"],
    context:
      "Our neuroscience and mental health expertise is applied to uncover disease mechanisms that can be targeted for diagnosis and therapy, with a growing focus on AI for psychological health.",
  },
  {
    number: "03",
    title: "Pediatric nursing AI",
    category: "Maternal & child health",
    subtitle: "Clinical nursing",
    description:
      "Research on the application of artificial intelligence in pediatric nursing and contemporary pediatric healthcare challenges.",
    detail:
      "We explore AI methods to support pediatric nursing and patient care.",
    image: imgTopicPediatric,
    tags: ["Nursing practice", "Pediatric care", "AI integration"],
    context:
      "Research on AI applications in pediatric and maternal-child care.",
    project: "Funded project JU-RP2026-053 · In progress",
  },
  {
    number: "04",
    title: "Early childhood screening",
    category: "Maternal & child health",
    subtitle: "Child development",
    description:
      "Machine learning approaches to autism spectrum disorder screening in toddlers, supporting earlier identification.",
    detail:
      "We study machine learning for earlier autism screening in toddlers.",
    image: imgTopicEarly,
    tags: ["Autism screening", "Machine learning", "Toddlers"],
    context:
      "Research focus, not a clinical tool. Seek professional advice about developmental concerns.",
  },
  {
    number: "05",
    title: "Pathogen surveillance",
    category: "Infectious disease",
    subtitle: "Public health",
    description:
      "Real-time metagenomic surveillance and predictive modelling of respiratory pathogen transmission during Hajj.",
    detail:
      "We apply real-time metagenomic surveillance and AI-driven predictive modelling to understand the transmission of respiratory pathogens during Hajj.",
    image: imgTopicPathogen,
    tags: ["Metagenomics", "Respiratory pathogens", "Hajj"],
    context:
      "Genomic and computational methods are combined to support public health preparedness and decision-making.",
    project: "Saudi National Institute of Health, Hajj Grant 2025 · In progress",
  },
  {
    number: "06",
    title: "Predictive health modelling",
    category: "Infectious disease",
    subtitle: "Disease prediction",
    description:
      "Statistics, epidemiology and AI applied to infectious disease prediction and public health decision-making.",
    detail:
      "We use machine learning, statistics and computational epidemiology to support disease surveillance and prediction across infectious, chronic, lifestyle and mental-health-related conditions.",
    image: imgTopicPredictive,
    tags: ["Machine learning", "Epidemiology", "Statistical synthesis"],
    context:
      "Statistical and computational synthesis helps translate evidence into theragnostic and public health strategies.",
  },
  {
    number: "07",
    title: "Multi-omics discovery",
    category: "AI & bioinformatics",
    subtitle: "Biomarker research",
    description:
      "Integrated molecular data used to identify biomarkers and potential therapeutic targets.",
    detail:
      "We integrate multi-omics data to discover biomarkers and therapeutic targets, including structure-guided drug discovery and immunoinformatics for vaccine design.",
    image: imgTopicOmics,
    tags: ["Biomarkers", "Drug discovery", "Immunoinformatics"],
    context:
      "Applications include biomarker discovery in pancreatic cancer and gliomas, linking computational biology with translational research.",
  },
  {
    number: "08",
    title: "Explainable AI",
    category: "AI & bioinformatics",
    subtitle: "Responsible methods",
    description:
      "Interpretable machine learning applied to health questions, including vaccination uptake and clinical decision support.",
    detail:
      "We apply interpretable machine learning to health questions, such as predicting adolescent vaccination uptake, so that model outputs can inform clinical and public health decision support.",
    image: imgTopicExplainable,
    tags: ["Interpretable ML", "Vaccination uptake", "Decision support"],
    context:
      "Explainable approaches help clinicians and practitioners understand why a model reaches its conclusions.",
  },
]
