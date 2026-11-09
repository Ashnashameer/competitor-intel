// Seed Research Findings for EDGE Competitor Intelligence Hub
// Demonstrates 1-to-many and many-to-many linking between evidence items and research findings

export const SEED_FINDINGS = [
  {
    id: "fnd-01",
    orgId: "org-tra-01",
    orgName: "Luminar Technolab",
    title: "Formal Academic MoU with Regional Engineering College for Python & ML Training",
    description: "Verified institutional collaboration where Luminar delivers credit-aligned Python, Data Science, and Machine Learning training directly to final-year B.Tech engineering students.",
    category: "Institutional Partnerships",
    researchDate: "2026-02-22",
    verificationStatus: "official_source",
    linkedEvidenceIds: ["ev-01"],
    notes: "Direct competitor strategy: Luminar signs institutional MoUs to lock in annual student cohorts before graduation."
  },
  {
    id: "fnd-02",
    orgId: "org-tra-01",
    orgName: "Luminar Technolab",
    title: "Campus Technology Workshops & Hands-on Coding Bootcamps for Engineering Students",
    description: "The institute conducts 2-day on-campus coding bootcamps and faculty workshops as an outreach channel to funnel college students into 6-month career diplomas.",
    category: "Workshops & Events",
    researchDate: "2026-02-22",
    verificationStatus: "official_source",
    linkedEvidenceIds: ["ev-01"],
    notes: "Same MoU agreement and signing press release confirms recurring on-campus workshop series."
  },
  {
    id: "fnd-03",
    orgId: "org-tra-01",
    orgName: "Luminar Technolab",
    title: "Generative AI, LangChain & Prompt Engineering Integrated into 6-Month Diploma",
    description: "Curriculum expansion adds introductory Generative AI and prompt engineering into their existing Python full-stack syllabus, aiming to market modern AI credentials.",
    category: "Courses & Programmes",
    researchDate: "2026-02-15",
    verificationStatus: "official_source",
    linkedEvidenceIds: ["ev-02"],
    notes: "EDGE curriculum differentiation: Luminar covers basic syntax and LangChain wrappers, while EDGE teaches production multi-agent systems and real deployment pipelines."
  },
  {
    id: "fnd-04",
    orgId: "org-tra-01",
    orgName: "Luminar Technolab",
    title: "Placement Bootcamp & 100% Hiring Support Across Calicut Cyberpark & Kochi Infopark",
    description: "Competitor advertises mandatory placement grooming with dedicated campus drives in regional IT parks, positioning itself heavily on job placement guarantees.",
    category: "Placement Activities",
    researchDate: "2026-03-05",
    verificationStatus: "company_reported",
    linkedEvidenceIds: ["ev-02", "ev-05"],
    notes: "Supported by both their course syllabus prospectus and verified IT recruitment flyers from Cyberpark Calicut."
  },
  {
    id: "fnd-05",
    orgId: "org-tra-01",
    orgName: "Luminar Technolab",
    title: "Cyberpark Kozhikode Mega Recruitment Drive Involving 18 Local IT Companies",
    description: "Organised dedicated IT placement drive inside Government Cyberpark Kozhikode for 2025-2026 batch graduates.",
    category: "Placement Activities",
    researchDate: "2026-03-05",
    verificationStatus: "company_reported",
    linkedEvidenceIds: ["ev-05"],
    notes: "Demonstrates strong corporate relationships with small and medium software houses in Malabar."
  },
  {
    id: "fnd-06",
    orgId: "org-col-01",
    orgName: "Farook College (Autonomous)",
    title: "New 60-Seat High-Performance Computing & GPU Lab for Machine Learning",
    description: "Official circular confirms newly inaugurated computer science lab with GPU workstations, giving the college physical infrastructure for advanced AI.",
    category: "Technology Initiatives",
    researchDate: "2026-02-12",
    verificationStatus: "official_source",
    linkedEvidenceIds: ["ev-03"],
    notes: "Prime candidate for an EDGE partnership because physical hardware is already in place."
  },
  {
    id: "fnd-07",
    orgId: "org-col-01",
    orgName: "Farook College (Autonomous)",
    title: "High Institutional Readiness for Accredited EDGE AI & Agentic Curriculum MoU",
    description: "Autonomous academic status allows Farook College to introduce industry add-on diplomas without university syllabus approval delays.",
    category: "Institutional Partnerships",
    researchDate: "2026-02-12",
    verificationStatus: "official_source",
    linkedEvidenceIds: ["ev-03"],
    notes: "Verified through academic gazette and computing council announcements."
  },
  {
    id: "fnd-08",
    orgId: "org-sch-01",
    orgName: "Silver Hills Public School",
    title: "Mandatory Robotics & STEM Block-Coding Club Active for Classes 6 to 10",
    description: "School prospectus documents active third-party STEM partner integration with mandatory weekly coding sessions for junior students.",
    category: "School Partnerships",
    researchDate: "2026-02-01",
    verificationStatus: "official_source",
    linkedEvidenceIds: ["ev-04"],
    notes: "Proves school administration actively allocates budget to external technology education providers."
  },
  {
    id: "fnd-09",
    orgId: "org-sch-01",
    orgName: "Silver Hills Public School",
    title: "Extracurricular Python & STEM Discovery Model for Secondary Students",
    description: "School operates an after-school discovery club model which could be upgraded to the EDGE junior AI curriculum.",
    category: "Courses & Programmes",
    researchDate: "2026-02-01",
    verificationStatus: "official_source",
    linkedEvidenceIds: ["ev-04"],
    notes: "Same prospectus clipping serves as direct evidence for school partner willingness."
  }
];

