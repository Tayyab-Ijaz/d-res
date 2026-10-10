export type ProjectCategory = "Nursing & maternal health" | "Infectious disease" | "Cancer & genomics" | "Computational health"

export type Project = {
  title: string
  year: number
  category: ProjectCategory
  code: string
  lead: string
  funder: string
  status: "In progress" | "Closed" | "Not specified"
}

export const projects: Project[] = [
  {
    title:
      "Integrating Artificial Intelligence in Pediatric Nursing: Emerging Solutions to Contemporary Pediatric Healthcare Challenges",
    year: 2026,
    category: "Nursing & maternal health",
    code: "JU-RP2026-053",
    lead: "Darin Mansor Mathkor",
    funder: "DGSSR, Jazan University",
    status: "In progress",
  },
  {
    title:
      "Precision Drug Targeting Approaches for the Treatment of Chronic Conditions Including Cancer, Diabetes, and Metabolic Disorders",
    year: 2026,
    category: "Cancer & genomics",
    code: "JU-RP2026-158",
    lead: "Mohd Wahid",
    funder: "DGSSR, Jazan University",
    status: "In progress",
  },
  {
    title:
      "Real-Time Metagenomic Surveillance and AI-Driven Predictive Modelling of Respiratory Pathogen Transmission During Hajj",
    year: 2025,
    category: "Infectious disease",
    code: "RO/280525-6",
    lead: "Turki Alamri",
    funder: "Saudi National Institute of Health – Hajj Grant 2025",
    status: "In progress",
  },
  {
    title:
      "Theragnostic Management of Infectious, Chronic and Life Style Diseases Through Experimental and Advanced Computational Approaches from Genetic, Epidemiological, and Public Health Perspectives",
    year: 2025,
    category: "Computational health",
    code: "JU-202505363-DGSSR-ORA-2025",
    lead: "Shafiul Haque",
    funder: "DGSSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Qualitative and Quantitative Meta-Syntheses as a Potential Tool for Theragnostic Strategies Targeting Chronic, Infectious, and Lifestyle-Related Diseases",
    year: 2025,
    category: "Computational health",
    code: "JU-202503332-DGSSR-RP-2025",
    lead: "Raju K. Mandal",
    funder: "DGSSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Statistical Synthesis and Computational Approaches in Nursing: Applications in Healthcare Practice and Education with a Focus on Pediatric, Mental, Women’s, and Community Health",
    year: 2025,
    category: "Nursing & maternal health",
    code: "JU-202503322-DGSSR-RP-2025",
    lead: "Darin Mansor Mathkor",
    funder: "DGSSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Therapeutic Efficacy of Compounds Targeting Signaling Pathways for Disease Management: Insights from Experimental and Computational Approaches with a Genetics, Epidemiological, and Public Health Perspective",
    year: 2024,
    category: "Computational health",
    code: "RG24-L06",
    lead: "Shafiul Haque",
    funder: "DGSSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Drug Targeting for Managing Chronic Diseases like Cancer, Diabetes and Metabolic Disorders",
    year: 2024,
    category: "Cancer & genomics",
    code: "RG24-S093",
    lead: "Mohd Wahid",
    funder: "DGSSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Comparative Genotype Variation and Meta-Analysis Approach for the Correlation of Genomic Markers for Therapeutic and Detection of Cancer",
    year: 2024,
    category: "Cancer & genomics",
    code: "RG24-S0220",
    lead: "Raju K. Mandal",
    funder: "DGSSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Evaluating the Role, Implication, and Interplay of Synthesis (Quantitative and Qualitative) and Informatics Studies in Nursing Healthcare",
    year: 2024,
    category: "Nursing & maternal health",
    code: "RG24-S080",
    lead: "Darin Mansor Mathkor",
    funder: "DGSSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Exploring the Potential of Natural Compounds Targeting Various Signaling Pathways to Curb Diseases: Elucidation from Non-clinical/Pre-clinical Experimental Models",
    year: 2023,
    category: "Computational health",
    code: "ISP23-101",
    lead: "Shafiul Haque",
    funder: "DSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "A Critical Pooled Appraisal of the Impact of COVID-19 Pandemic on the Mental Health of Saudi Nurses",
    year: 2022,
    category: "Nursing & maternal health",
    code: "RUP3-7",
    lead: "Darin Mansor Mathkor",
    funder: "DSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Role of Phytochemicals in Targeting Oncogenic Signaling to Prevent Cancer: From Nonclinical to Preclinical Models",
    year: 2022,
    category: "Cancer & genomics",
    code: "ISP22-9",
    lead: "Raju K. Mandal",
    funder: "DSR, Jazan University",
    status: "Not specified",
  },
  {
    title: "Research Group (Directed Research Program) – Water Research",
    year: 2022,
    category: "Computational health",
    code: "ISP22-5",
    lead: "Shafiul Haque",
    funder: "DSR, Jazan University",
    status: "Not specified",
  },
  {
    title:
      "Knowledge, Attitude and Practice Related to Breast Cancer and Its Screening Method Among Nursing Staff in Jazan Region: A Cross-Sectional Study",
    year: 2022,
    category: "Nursing & maternal health",
    code: "RUP-6",
    lead: "Shafiul Haque",
    funder: "DSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Energetic and Frustration Analysis of SARS-CoV-2 Nucleocapsid Protein Mutations",
    year: 2022,
    category: "Infectious disease",
    code: "RUP 2-04",
    lead: "Shafiul Haque",
    funder: "DSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Cyclin D1 (CCND1) G870A Polymorphism and Risk of Oral Carcinoma: A Meta-Analysis and Trial Sequential Analysis",
    year: 2021,
    category: "Cancer & genomics",
    code: "RUP-5",
    lead: "Shafiul Haque",
    funder: "DSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Current and Future Perspective of Transporter Associated with Antigen Processing (TAP2) Gene Polymorphism on Incidence and Progression in Cancer",
    year: 2021,
    category: "Cancer & genomics",
    code: "RUP-5",
    lead: "Raju K. Mandal",
    funder: "DSR, Jazan University",
    status: "Closed",
  },
  {
    title:
      "Anxiety, Readiness, Coping Strategies and Economic Challenges Because of COVID-19 Outbreak Among Dentists of Ha’il Province of Saudi Arabia",
    year: 2022,
    category: "Nursing & maternal health",
    code: "RD-21 061",
    lead: "Shafiul Haque (co-investigator)",
    funder: "University of Ha’il",
    status: "Closed",
  },
  {
    title:
      "Multi-Omics Data Driven Approach Towards Genomic Alteration Profiles in Breast Cancer Patients and Proposing Drug Targets",
    year: 2022,
    category: "Cancer & genomics",
    code: "MDR-22 023",
    lead: "Saif Khan",
    funder: "University of Ha’il",
    status: "Closed",
  },
  {
    title:
      "Insights into Host Responses Against Mycobacterium leprae from Integrative Transcriptome Meta-Analysis",
    year: 2021,
    category: "Infectious disease",
    code: "RG-21110",
    lead: "Saif Khan",
    funder: "University of Ha’il",
    status: "Closed",
  },
  {
    title: "Mining Native Fungal Consortia for Natural Bioactives",
    year: 2021,
    category: "Computational health",
    code: "IFPRC-168-141-2020",
    lead: "Shafiul Haque (research consultant)",
    funder: "King Abdulaziz University",
    status: "Not specified",
  },
  {
    title:
      "Gene-Disease Association of Galectin-1 Using Random Walk with Restart Algorithm and Its Prioritization",
    year: 2020,
    category: "Computational health",
    code: "IFPHI-124-141-2020",
    lead: "GMA (principal investigator)",
    funder: "King Abdulaziz University",
    status: "Not specified",
  },
  {
    title: "Pan-Genome Analysis of Plastic Degrading Pseudomonas sp.",
    year: 2020,
    category: "Infectious disease",
    code: "IFPHI-134-141-2020",
    lead: "Shafiul Haque (research consultant)",
    funder: "King Abdulaziz University",
    status: "Not specified",
  },
  {
    title:
      "Development of Potential Pharmacophore Models Against Cystalysin of Treponema denticola: Combating Periodontitis",
    year: 2020,
    category: "Infectious disease",
    code: "RG-20011",
    lead: "Shafiul Haque (research group member)",
    funder: "University of Ha’il",
    status: "Closed",
  },
  {
    title:
      "Repurposing of US-FDA Approved Drugs Against Novel Coronavirus (COVID-19) Infection Using In Silico Systems Biology Approach",
    year: 2020,
    category: "Infectious disease",
    code: "Cov-47",
    lead: "Shafiul Haque",
    funder: "DSR, Jazan University",
    status: "Closed",
  },
]
