// Central Relational Schema for Many-to-Many Market Categories
// An organisation has ONE master record and can belong to multiple categories without duplication.

export const MARKET_CATEGORIES = [
  {
    id: "schools",
    title: "Schools",
    shortCode: "SCH",
    tagline: "K-12, CBSE, ICSE & High Schools",
    icon: "GraduationCap",
    accentGradient: "from-purple-600 via-violet-600 to-indigo-600",
    lightBg: "bg-purple-50/60",
    border: "border-purple-200/80",
    badge: "text-purple-700 bg-purple-100/80 border-purple-200",
    description: "Competitors providing educational services, training, technology programmes, STEM, robotics, coding, AI education and other solutions to schools."
  },
  {
    id: "colleges",
    title: "Colleges",
    shortCode: "COL",
    tagline: "Universities, Autonomous Colleges & Technical Institutions",
    icon: "Landmark",
    accentGradient: "from-blue-600 via-indigo-600 to-violet-600",
    lightBg: "bg-blue-50/60",
    border: "border-blue-200/80",
    badge: "text-blue-700 bg-blue-100/80 border-blue-200",
    description: "Competitors partnering with colleges, universities, higher education institutions and technical institutions for academic MoUs and tech add-ons."
  },
  {
    id: "corporate",
    title: "Corporate",
    shortCode: "CORP",
    tagline: "Enterprise Upskilling, Automation & B2B Solutions",
    icon: "Briefcase",
    accentGradient: "from-fuchsia-600 via-purple-600 to-pink-600",
    lightBg: "bg-fuchsia-50/60",
    border: "border-fuchsia-200/80",
    badge: "text-fuchsia-700 bg-fuchsia-100/80 border-fuchsia-200",
    description: "Competitors providing corporate training, employee development, AI solutions, business technology, automation and organisational services."
  },
  {
    id: "other_partnerships",
    title: "Other Partnerships",
    shortCode: "PTN",
    tagline: "CSR Foundations, NGOs, Government Bodies & Ecosystems",
    icon: "Users",
    accentGradient: "from-emerald-600 via-teal-600 to-cyan-600",
    lightBg: "bg-emerald-50/60",
    border: "border-emerald-200/80",
    badge: "text-emerald-700 bg-emerald-100/80 border-emerald-200",
    description: "Organisations working with CSR foundations, NGOs, government departments, educational associations, ecosystem partners and other institutions."
  }
];

// Many-to-Many Relationship Mappings: Organisation <-> Category
// Exactly 1 organisation ID can be associated with multiple categories.
export const ORGANISATION_CATEGORY_RELATIONSHIPS = [
  // ==================== DE' LEAD INTERNATIONAL ====================
  // Appears in Schools, Corporate, and Other Partnerships (NOT in Colleges because no college MoU exists yet)
  {
    id: "ocr-sch-delead",
    orgId: "org-delead-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Walk2Lead Robotics TechQuest (CSR)",
      "TinkerChamps Experiential Learning Camps",
      "MakerChamps Innovation Bootcamp (NIT Calicut)",
      "Teacher Capacity Building Workshops"
    ],
    relationshipType: "Competitor / Service Provider",
    evidenceSource: "https://w2l.deleadint.com/",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-corp-delead",
    orgId: "org-delead-01",
    categoryId: "corporate",
    relevantProgrammes: [
      "Corporate Leadership & Outbound Strategy Training",
      "Executive Team Building (India & UAE)",
      "Professional Generative AI for Educators & HR"
    ],
    relationshipType: "Service Provider / Corporate Trainer",
    evidenceSource: "https://deleadint.com/",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-ptn-delead",
    orgId: "org-delead-01",
    categoryId: "other_partnerships",
    relevantProgrammes: [
      "Walk2Lead CSR Consortium (Walkaroo Foundation, DIETs, General Education Dept)",
      "MakerChamps Ecosystem (NIT Calicut TBI, Nlightened ZenSolutions)"
    ],
    relationshipType: "Ecosystem Implementation Partner",
    evidenceSource: "https://walkaroofoundation.in/index.php/education/",
    verificationStatus: "Verified"
  },

  // ==================== PAPPIYON SOLUTIONS ====================
  // Appears in Schools, Corporate, and Other Partnerships
  {
    id: "ocr-sch-pappiyon",
    orgId: "org-pappiyon-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Pappiyon School Mentoring & Academic Excellence Programme",
      "Quality Gap Analysis & Institutional Academic Audits",
      "ECCE Mentorship & Early Childhood Curriculum",
      "Skill Map & Future Makers Student Guidance"
    ],
    relationshipType: "Direct Competitor / School Mentoring & Curriculum Consulting",
    evidenceSource: "https://pappiyonsolutions.com/projects/",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-corp-pappiyon",
    orgId: "org-pappiyon-01",
    categoryId: "corporate",
    relevantProgrammes: [
      "EC SET (Early Childhood Skill Enhancement Training)",
      "Institutional Leadership & Academic Governance Seminars",
      "Faculty Pedagogical Development Masterclasses"
    ],
    relationshipType: "Service Provider / Faculty Development",
    evidenceSource: "https://pappiyonsolutions.com/",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-ptn-pappiyon",
    orgId: "org-pappiyon-01",
    categoryId: "other_partnerships",
    relevantProgrammes: [
      "Kinfra Techno Park Kakkanchery Educational Hub",
      "SVN Higher Secondary School Strategic Transformation",
      "Kerala School Principals & Trustees Network"
    ],
    relationshipType: "Ecosystem Partner / Institutional Consultant",
    evidenceSource: "https://pappiyonsolutions.com/projects/",
    verificationStatus: "Verified"
  },
  // ==================== INDUSTRIAL ROBOTICS INSTITUTE (IRI) ====================
  // Appears in Schools and Corporate Categories
  {
    id: "ocr-sch-iri",
    orgId: "org-iri-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Turnkey School Robotics & AI Innovation Lab Setup",
      "NEP 2020 Aligned 5-Tier Robotics Curriculum (Classes 1-12)",
      "Deputed In-Campus Robotics Instructors (40+ Annual Classes)",
      "Printed Grade-Wise Textbooks & Hardware Kits"
    ],
    relationshipType: "Direct Competitor / Turnkey School Robotics Lab Provider",
    evidenceSource: "https://industrialroboticsin.com/",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-corp-iri",
    orgId: "org-iri-01",
    categoryId: "corporate",
    relevantProgrammes: [
      "Train the Teacher (Faculty Development Programme)",
      "School Lab Conversion & Technical Equipment Servicing",
      "Institutional STEM Equipment Procurement"
    ],
    relationshipType: "Service Provider / Faculty Enablement",
    evidenceSource: "https://industrialroboticsin.com/",
    verificationStatus: "Verified"
  },
  // ==================== KOKOS.AI ====================
  // Appears in Schools, Corporate, and Other Partnerships
  {
    id: "ocr-sch-kokos",
    orgId: "org-kokos-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Kokos K-12 AI & Robotics Curriculum & Textbooks",
      "Kokos Turnkey AI Robolab Hardware Suite",
      "Kokos Advanced AI, Python & Applied Robotics Track",
      "AI Summer Bootcamps & Global Skill Certifications"
    ],
    relationshipType: "Direct Competitor / K-12 AI & Robolab Provider",
    evidenceSource: "https://kokos.ai/school-programs",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-corp-kokos",
    orgId: "org-kokos-01",
    categoryId: "corporate",
    relevantProgrammes: [
      "Kokos Educator AI Enablement & Robolab Mentor Programme",
      "School Faculty AI Literacy Masterclasses",
      "B2B Institutional Curriculum Licensing"
    ],
    relationshipType: "Service Provider / Faculty Enablement",
    evidenceSource: "https://kokos.ai/school-programs",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-ptn-kokos",
    orgId: "org-kokos-01",
    categoryId: "other_partnerships",
    relevantProgrammes: [
      "Kerala Startup Mission (KSUM) Technology Ecosystem",
      "Kinfra Technopark Kakkanchery Innovation Hub",
      "International AI Education Network (USA, UK, UAE, KSA)"
    ],
    relationshipType: "Ecosystem Partner / Incubated Startup",
    evidenceSource: "https://startupmission.in/",
    verificationStatus: "Verified"
  },
  // ==================== CYBER SQUARE ====================
  // Appears in Schools, Corporate, and Other Partnerships
  {
    id: "ocr-sch-cybersquare",
    orgId: "org-cybersquare-01",
    categoryId: "schools",
    relevantProgrammes: [
      "K-12 AI & Coding Curriculum (Textbooks + Cloud Lab)",
      "Cyber Square AI Cloud Labs & Automated Assessment",
      "Hands-on Robotics & IoT Lab Suite",
      "Little Coder & Junior Python Developer Track"
    ],
    relationshipType: "Direct Competitor / K-12 Curriculum Provider",
    evidenceSource: "https://cybersquare.org/",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-corp-cybersquare",
    orgId: "org-cybersquare-01",
    categoryId: "corporate",
    relevantProgrammes: [
      "Smart AI Teacher Tools & CPD Certification",
      "School Educator AI Literacy Masterclasses",
      "Corporate Digital Literacy & Tech Enablement"
    ],
    relationshipType: "Service Provider / Educator Training",
    evidenceSource: "https://cybersquare.org/ai-teacher-tools",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-ptn-cybersquare",
    orgId: "org-cybersquare-01",
    categoryId: "other_partnerships",
    relevantProgrammes: [
      "CAFIT IT Ecosystem (HiLITE Business Park)",
      "UK CPD Certification Services",
      "Global Digital Fest School Consortium"
    ],
    relationshipType: "Ecosystem Partner / International Publishing",
    evidenceSource: "https://cybersquare.pro/",
    verificationStatus: "Verified"
  },

  // ==================== ROTECH (ROTECHEDU / AI TUTE) ====================
  // Appears in Schools, Colleges, and Corporate
  {
    id: "ocr-sch-rotech",
    orgId: "org-rotech-01",
    categoryId: "schools",
    relevantProgrammes: [
      "AI Tute K-12 AI & STEAM Curriculum",
      "Turnkey School Robotics Labs (Arduino & ESP32)",
      "Standard & Advanced School Package Bundles",
      "Teacher AI Enablement Masterclasses"
    ],
    relationshipType: "Direct Competitor / K-12 AI & STEAM Lab Provider",
    evidenceSource: "https://www.rotechedu.com/",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-col-rotech",
    orgId: "org-rotech-01",
    categoryId: "colleges",
    relevantProgrammes: [
      "AI Tute IT Incubation Labs",
      "Collegiate Emerging Tech Bootcamps",
      "Python & Machine Learning Hands-On Workshops",
      "Practical Technical Projects & UI/UX"
    ],
    relationshipType: "Service Provider / Technical Bootcamp & Incubation",
    evidenceSource: "https://aitutelearning.com/",
    verificationStatus: "Verified"
  },
  {
    id: "ocr-corp-rotech",
    orgId: "org-rotech-01",
    categoryId: "corporate",
    relevantProgrammes: [
      "Corporate AI Productivity Masterclasses",
      "Data Analytics & Power BI for Teams",
      "Digital Workflow Enhancement",
      "Executive Tech Literacy"
    ],
    relationshipType: "Service Provider / Corporate Upskilling",
    evidenceSource: "https://www.rotechedu.com/",
    verificationStatus: "Verified"
  },

  // ==================== EVOLVE ROBOTICS ====================
  // Appears in Schools (Evolve Infinity Lab 4-Year MoU model)
  {
    id: "ocr-sch-evolve",
    orgId: "org-evolve-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Evolve Infinity Lab (Integrated Robotics & AI Lab)",
      "Four-Year School MOU Framework",
      "K-12 Tech Curriculum (Robotics, AI, Python, IoT, Drones)",
      "Turnkey Equipment, Kits & Deputed Trainer Support"
    ],
    relationshipType: "Competitor / School Robotics & AI Lab Provider",
    evidenceSource: "https://www.evolveroboticsindia.com/infinity-lab",
    verificationStatus: "Company Reported"
  },

  // ==================== ISQ MIND SCHOOL ====================
  // Appears in Schools (Soft Skills & Personal Development)
  {
    id: "ocr-sch-isq",
    orgId: "org-isq-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Student Emotional Wellbeing Programmes",
      "In-School Life-Skills Mentoring (Classes 5–10)",
      "ISQ Mobile App Digital Support Tools",
      "One-on-One Counseling & Adolescent Guidance"
    ],
    relationshipType: "Competitor / Student Wellbeing & Mentoring",
    evidenceSource: "https://isqmindschool.com/",
    verificationStatus: "Company Reported"
  },

  // ==================== NATURENURTURE ====================
  // Appears in Schools (Technical Skills & Soft Skills)
  {
    id: "ocr-sch-nn",
    orgId: "org-naturenurture-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Turnkey Makerspaces & STEAM Innovation Labs",
      "Integrated Board-Aligned K-12 Curriculum (NEP 2020)",
      "Teacher Professional Development & Leadership Mentorship",
      "Experiential STEM, Robotics & Design Thinking Labs"
    ],
    relationshipType: "Competitor / K-12 Experiential Curriculum & Makerspace Provider",
    evidenceSource: "https://www.naturenurture.org/makerspace",
    verificationStatus: "Company Reported"
  },

  // ==================== ROBUVERSE ====================
  // Appears in Schools (Technical Skills)
  {
    id: "ocr-sch-rbv",
    orgId: "org-robuverse-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Turnkey Robotics & AI School Labs (Package 01)",
      "Hands-On STEM & Microcontroller Workshops",
      "Campus STEM Day Expos & Robotics Arenas",
      "Open Hardware Kits (Arduino, ESP32, Raspberry Pi) & 3D Prototyping"
    ],
    relationshipType: "Competitor / School Robotics & AI Lab Provider",
    evidenceSource: "https://www.robuverse.com/services",
    verificationStatus: "Verified"
  },

  // ==================== STEM-XPERT ====================
  // Appears in Schools (Technical Skills)
  {
    id: "ocr-sch-stemxpert",
    orgId: "org-stemxpert-01",
    categoryId: "schools",
    relevantProgrammes: [
      "STEM-as-a-Service K-12 Institutional Lab & Curriculum",
      "Composite Skill Labs & Kaushal Bodh (CBSE Aligned)",
      "Proprietary Crinnoboard AIoT Development Hardware",
      "STEM Facilitator & AI for Teachers Enablement"
    ],
    relationshipType: "Potential Competitor / School STEM & AI Lab Provider (Evidence Pending)",
    evidenceSource: "https://stem-xpert.com/",
    verificationStatus: "Verified"
  },

  // ==================== Q FACTORY ====================
  // Appears in Schools (Soft Skills & Personal Development)
  {
    id: "ocr-sch-qfactory",
    orgId: "org-qfactory-01",
    categoryId: "schools",
    relevantProgrammes: [
      "Q Positive Flagship Quiz Training Programme",
      "Break the Shell Foundational Quiz Workshop",
      "Quiz Chemistry Advanced Analytical Workshop",
      "School Quiz Club Setup, Year-Round Mentorship & Teacher Training"
    ],
    relationshipType: "Competitor / Student Development & Knowledge Enhancement Provider",
    evidenceSource: "https://qfactory.in/training/",
    verificationStatus: "Verified"
  },

  // ==================== YM INNOVATIONS (YOUNGMINDS.APP) ====================
  // Appears in Schools (Dual: Technical Skills & Soft Skills / Entrepreneurship)
  {
    id: "ocr-sch-youngminds",
    orgId: "org-youngminds-01",
    categoryId: "schools",
    relevantProgrammes: [
      "IEH - Innovation & Entrepreneurship Hub School Model",
      "TinkerPark Innovation Labs & Maker Spaces",
      "YoungPreneurs Student Startup Incubation & Annual Innovation Fest",
      "Design Thinking & 3-Stage Progression (Tinker it -> Prototype it -> Startup it)",
      "Teacher Capacity Building & Emerging Technology Modules"
    ],
    relationshipType: "Competitor / School Innovation, Entrepreneurship & STEM Lab Provider",
    evidenceSource: "https://www.youngminds.app/",
    verificationStatus: "Verified"
  },

  // ==================== UL SPACE CLUB ====================
  // Appears in Schools (Dual: Technical Skills & Soft Skills / Science Inquiry)
  {
    id: "ocr-sch-ulspaceclub",
    orgId: "org-ulspaceclub-01",
    categoryId: "schools",
    relevantProgrammes: [
      "School Astronomy, Stargazing & SkySafari Outreach",
      "Space Club @ Campus School Chapters & Ambassador Network",
      "CanSat Micro-Satellite, Model Rocketry & Rover Robotics Labs",
      "Student Space Research, Dataset Analysis & Scientific Papers",
      "Model Space Startup Challenge & ISRO Scientist Masterclasses"
    ],
    relationshipType: "Competitor / Non-Profit Space Science & STEM Education Partner (ISRO Space Tutor)",
    evidenceSource: "https://ulspaceclub.org/programs/outreach-programs",
    verificationStatus: "Verified"
  }
];

// Skill Categories inside the School Section
export const SCHOOL_SKILL_CATEGORIES = [
  {
    id: "All",
    label: "All Categories",
    description: "Display all school-focused competitors"
  },
  {
    id: "Technical Skills",
    label: "Technical Skills",
    shortLabel: "Technical",
    icon: "Cpu",
    badgeColor: "text-indigo-700 bg-indigo-50 border-indigo-200",
    description: "AI, Coding, Robotics, Data Analytics, Digital Marketing, Cloud Computing & STEM",
    skills: [
      "Artificial Intelligence",
      "Coding and Programming",
      "Robotics",
      "Data Analytics",
      "Digital Marketing",
      "Cloud Computing",
      "STEM Education",
      "Other technology-related training"
    ]
  },
  {
    id: "Soft Skills & Personal Development",
    label: "Soft Skills & Personal Development",
    shortLabel: "Soft Skills",
    icon: "HeartHandshake",
    badgeColor: "text-rose-700 bg-rose-50 border-rose-200",
    description: "Emotional Intelligence, Leadership, Mentoring, Life Skills, Confidence & Teamwork",
    skills: [
      "Communication Skills",
      "Leadership",
      "Teamwork",
      "Confidence Building",
      "Personality Development",
      "Emotional Intelligence",
      "Cognitive Skills",
      "Life Skills",
      "Character Development"
    ]
  }
];

// Helper to determine the skill categories for an organisation
export function getCompetitorSkillCategories(org) {
  if (Array.isArray(org.skillCategories) && org.skillCategories.length > 0) {
    return org.skillCategories;
  }
  const cats = [];
  const text = `${org.name || ''} ${org.orgType || ''} ${org.servicesOffered || ''} ${org.services || ''} ${Array.isArray(org.industry) ? org.industry.join(' ') : (org.industry || '')} ${(org.coursesTechnologies || []).join(' ')} ${(org.relevantProgrammes || []).join(' ')}`.toLowerCase();

  // Technical Skills test
  if (/ai|artificial intelligence|robot|coding|programming|python|data science|data analytics|digital marketing|cloud|stem|tinker|hardware|microcontroller|drone|iot|scratch|software/.test(text)) {
    cats.push('Technical Skills');
  }

  // Soft Skills & Personal Development test
  if (/soft skills|wellbeing|emotional|mentoring|life skills|life-skills|leadership|teamwork|confidence|personality|cognitive|character|psychological|counseling|ecce|pedagogy|ec set/.test(text)) {
    cats.push('Soft Skills & Personal Development');
  }

  if (cats.length === 0) {
    cats.push('Technical Skills');
  }
  return cats;
}

// Connected Ecosystem Partner Organisations (NOT competitors)
export const PARTNER_ECOSYSTEM = [
  {
    id: "part-01",
    name: "Walkaroo Foundation",
    relationshipType: "Funding / CSR Partner",
    role: "Programme funding and CSR support for rural and coastal government schools",
    connectedProgrammes: ["Walk2Lead Robotics TechQuest"],
    connectedOrganisations: ["De' Lead International"],
    website: "https://walkaroofoundation.in/",
    districts: ["Kozhikode", "Malappuram", "Kannur", "Wayanad"],
    verificationStatus: "Verified",
    notes: "CSR arm of Walkaroo International Ltd. Funds 100% of student kits and instructor dispatch in 44+ government schools."
  },
  {
    id: "part-02",
    name: "DIET Kozhikode",
    relationshipType: "Academic Partner",
    role: "District academic curriculum monitoring, school selection and teacher development support",
    connectedProgrammes: ["Walk2Lead Robotics TechQuest"],
    connectedOrganisations: ["De' Lead International"],
    district: "Kozhikode",
    verificationStatus: "Verified",
    notes: "District Institute of Education and Training under General Education Department, Kerala."
  },
  {
    id: "part-03",
    name: "DIET Malappuram",
    relationshipType: "Academic Partner",
    role: "Teacher development workshops and student evaluation support across Malappuram coastal schools",
    connectedProgrammes: ["Walk2Lead Robotics TechQuest"],
    connectedOrganisations: ["De' Lead International"],
    district: "Malappuram",
    verificationStatus: "Verified",
    notes: "Co-conducted 33-teacher robotics capacity building workshop in March 2026."
  },
  {
    id: "part-04",
    name: "DIET Kannur (Palayad)",
    relationshipType: "Academic Partner",
    role: "Teacher capacity building host and lab school implementation",
    connectedProgrammes: ["Walk2Lead Robotics TechQuest"],
    connectedOrganisations: ["De' Lead International"],
    district: "Kannur",
    verificationStatus: "Verified",
    notes: "Conducted teacher training on 7 March 2026 for 15 educators on robotics and digital tools."
  },
  {
    id: "part-05",
    name: "DIET Wayanad",
    relationshipType: "Academic Partner",
    role: "Tribal and rural school STEM outreach monitoring",
    connectedProgrammes: ["Walk2Lead Robotics TechQuest"],
    connectedOrganisations: ["De' Lead International"],
    district: "Wayanad",
    verificationStatus: "Verified",
    notes: "Oversees Walk2Lead implementation in Mananthavady."
  },
  {
    id: "part-06",
    name: "General Education Department, Government of Kerala",
    relationshipType: "Government Association",
    role: "State policy sanction and administrative facilitation for government school innovation programs",
    connectedProgrammes: ["Walk2Lead Robotics TechQuest"],
    connectedOrganisations: ["De' Lead International"],
    district: "Statewide (Kerala)",
    verificationStatus: "Verified",
    notes: "Official governmental administrative endorsement for Walkaroo CSR implementation."
  },
  {
    id: "part-07",
    name: "Nlightened ZenSolutions",
    relationshipType: "Co-host / Implementation Association",
    role: "Co-hosting MakerChamps innovation bootcamp for high school students",
    connectedProgrammes: ["MakerChamps"],
    connectedOrganisations: ["De' Lead International"],
    district: "Kozhikode",
    verificationStatus: "Verified",
    notes: "Jointly organises the 2-day hands-on bootcamp at NIT Calicut."
  },
  {
    id: "part-08",
    name: "NIT Calicut Technology Business Incubator",
    relationshipType: "Ecosystem Connection",
    role: "Campus ecosystem association for MakerChamps bootcamp (not a direct funding or programme owner)",
    connectedProgrammes: ["MakerChamps"],
    connectedOrganisations: ["De' Lead International"],
    district: "Kozhikode",
    verificationStatus: "Verified",
    notes: "Provides campus ecosystem access and lab tours during bootcamp; not a formal co-owner."
  },
  {
    id: "part-09",
    name: "Centre for Holistic Teaching and Learning",
    relationshipType: "Academic / Learning Association",
    role: "Pedagogy and holistic learning association for student innovation exercises",
    connectedProgrammes: ["MakerChamps"],
    connectedOrganisations: ["De' Lead International"],
    district: "Kozhikode",
    verificationStatus: "Verified",
    notes: "Collaborates on experiential problem-solving modules."
  }
];

// Helper: Query all competitor organisations belonging to a specific category
// Strictly guarantees each competitor appears at most once per category view.
export function getOrganisationsForCategory(categoryId, allOrganisations = []) {
  const matchingRelationships = ORGANISATION_CATEGORY_RELATIONSHIPS.filter(
    rel => rel.categoryId === categoryId
  );

  const matchedOrgIds = new Set(matchingRelationships.map(rel => rel.orgId));
  const seenOrgIds = new Set();

  return allOrganisations
    .filter(org => {
      if (!org || !org.id || !matchedOrgIds.has(org.id)) return false;
      if (seenOrgIds.has(org.id)) return false;
      seenOrgIds.add(org.id);
      return true;
    })
    .map(org => {
      const rel = matchingRelationships.find(r => r.orgId === org.id);
      return {
        ...org,
        categoryRelationship: rel,
        relevantProgrammes: rel?.relevantProgrammes || [],
        partnershipType: rel?.relationshipType || org.competitiveRelevance || "Direct Competitor"
      };
    });
}

// Helper: Query all categories that an organisation belongs to
export function getCategoriesForOrganisation(orgId) {
  const rels = ORGANISATION_CATEGORY_RELATIONSHIPS.filter(rel => rel.orgId === orgId);
  return rels.map(r => {
    const cat = MARKET_CATEGORIES.find(c => c.id === r.categoryId);
    return {
      ...cat,
      relationship: r
    };
  });
}

// Helper: Get live counts for all 4 categories dynamically from database
export function getCategoryCompetitorCounts(allOrganisations = []) {
  const counts = {};
  MARKET_CATEGORIES.forEach(cat => {
    const orgs = getOrganisationsForCategory(cat.id, allOrganisations);
    counts[cat.id] = orgs.length;
  });
  return counts;
}

