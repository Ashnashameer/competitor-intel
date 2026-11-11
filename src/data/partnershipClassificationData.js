// Dedicated Partnership Classification & Institutional Target Matrix
// Restructuring based on actual verified services, training, programmes, and institutional targets.
// Distinguishes:
// 1. Schools (K-12, robotics, coding, AI, STEM, personality, leadership, life skills)
// 2. Colleges & Universities (technical programmes, MoUs, faculty development, placement training)
// 3. Corporate (upskilling, automation, consulting, workforce training, recruitment partners)
// 4. Other Partnerships (Government, NGOs, CSR, DIETs, Skill India, K-DISC, KSUM)
// Also distinguishes: Educational Institution Itself vs. External Service Provider

export const PARTNERSHIP_CLASSIFICATION_MAP = {
  // ==================== SCHOOLS (INSTITUTIONS THEMSELVES) ====================
  "org-sch-01": {
    orgId: "org-sch-01",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "K-12 Formal CBSE Schooling, Science Labs & Student Tech Clubs",
    partnershipTargets: {
      schools: "No",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Formal K-12 schooling, ATL science labs, inter-school robotics symposia (Luminescence)",
    programmeType: "CBSE Curriculum Schooling, STEM Clubs, Science Exhibitions",
    deliveryModel: "On-Campus / Lab",
    evidenceSource: "https://silverhillspublicschool.org/curriculum-infrastructure",
    confidenceLevel: "High",
    partnershipCategories: ["other_partnerships"],
    isMultiSegment: false
  },
  "org-sch-02": {
    orgId: "org-sch-02",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "IB & Cambridge International K-12 Education, Digital Fabrication",
    partnershipTargets: {
      schools: "No",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "IB/Cambridge education, HiLITE Maker Hub digital fabrication workshops",
    programmeType: "International Curriculum, Maker Hub Digital Design",
    deliveryModel: "On-Campus / Studio",
    evidenceSource: "https://thewhiteschool.org/maker-hub",
    confidenceLevel: "High",
    partnershipCategories: ["other_partnerships"],
    isMultiSegment: false
  },
  "org-sch-03": {
    orgId: "org-sch-03",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Central Government CBSE Schooling, NITI Aayog Atal Tinkering Lab",
    partnershipTargets: {
      schools: "No",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Formal schooling, NITI Aayog ATL robotics & electronics tinkering",
    programmeType: "Central Government Curriculum, Atal Tinkering Lab",
    deliveryModel: "On-Campus / ATL Lab",
    evidenceSource: "https://no1calicut.kvs.ac.in/academic/atal-tinkering-lab",
    confidenceLevel: "High",
    partnershipCategories: ["other_partnerships"],
    isMultiSegment: false
  },
  "org-sch-04": {
    orgId: "org-sch-04",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "K-12 Elite CBSE Schooling & Technology Integration",
    partnershipTargets: {
      schools: "No",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Formal schooling, Lego robotics curriculum, Microsoft digital classroom",
    programmeType: "K-12 Curriculum, Lego Education, Microsoft Showcase",
    deliveryModel: "On-Campus / Smart Classrooms",
    evidenceSource: "https://choiceschool.com/curriculum",
    confidenceLevel: "High",
    partnershipCategories: ["other_partnerships"],
    isMultiSegment: false
  },
  "org-sch-05": {
    orgId: "org-sch-05",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "ICSE/ISC Formal Residential Schooling & STEM Clubs",
    partnershipTargets: {
      schools: "No",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Formal schooling, robotics add-on modules, science exhibitions",
    programmeType: "ICSE/ISC Curriculum, RoboTech Junior Lab",
    deliveryModel: "On-Campus / Residential",
    evidenceSource: "https://sttrs.in/",
    confidenceLevel: "High",
    partnershipCategories: ["other_partnerships"],
    isMultiSegment: false
  },

  // ==================== HIGHER SECONDARY SCHOOLS (INSTITUTIONS THEMSELVES) ====================
  "org-hss-01": {
    orgId: "org-hss-01",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "State Board Secondary & Higher Secondary Education (Classes 8-12)",
    partnershipTargets: {
      schools: "No",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Plus One & Two Science/Commerce education, Kite Kerala IT labs",
    programmeType: "Higher Secondary Curriculum, Kite Kerala IT Clubs",
    deliveryModel: "On-Campus / Lab",
    evidenceSource: "https://stjosephshsscalicut.org/",
    confidenceLevel: "High",
    partnershipCategories: ["other_partnerships"],
    isMultiSegment: false
  },
  "org-hss-02": {
    orgId: "org-hss-02",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "K-12 & Senior Secondary CBSE Education, Intel AI for Youth",
    partnershipTargets: {
      schools: "No",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Senior secondary schooling, Intel AI for Youth pilot workshops",
    programmeType: "CBSE Senior Secondary, Intel AI Modules",
    deliveryModel: "On-Campus",
    evidenceSource: "https://devagiricmischool.edu.in/",
    confidenceLevel: "High",
    partnershipCategories: ["other_partnerships"],
    isMultiSegment: false
  },
  "org-hss-03": {
    orgId: "org-hss-03",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Plus Two Education & Markaz Knowledge City Vocational Wings",
    partnershipTargets: {
      schools: "No",
      colleges: "Unverified",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Higher secondary education, Markaz Skill Academy foundational IT",
    programmeType: "Higher Secondary & Vocational Foundation",
    deliveryModel: "On-Campus",
    evidenceSource: "https://markaz.in/institutions/",
    confidenceLevel: "High",
    partnershipCategories: ["other_partnerships"],
    isMultiSegment: false
  },

  // ==================== COLLEGES & UNIVERSITIES (INSTITUTIONS THEMSELVES) ====================
  "org-col-01": {
    orgId: "org-col-01",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Autonomous Higher Education (UG/PG/Doctoral) & KSUM IEDC Incubation",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Autonomous degree curricula, computer science labs, IEDC entrepreneurship bootcamps, campus recruitment drives",
    programmeType: "Undergraduate & Postgraduate Degrees, ASAP Skill Add-ons, Campus Placement",
    deliveryModel: "On-Campus / Collegiate",
    evidenceSource: "https://farookcollege.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-02": {
    orgId: "org-col-02",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Premier Engineering, Technology & Advanced Research Education",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Advanced engineering programmes, Tathva tech fest, MakerChamps school innovation outreach, Intel/Nvidia sponsored labs",
    programmeType: "B.Tech/M.Tech/Ph.D., Community STEM Outreach, Corporate R&D MoUs",
    deliveryModel: "On-Campus / R&D Labs / Outreach",
    evidenceSource: "https://nitc.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-03": {
    orgId: "org-col-03",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Undergraduate & Postgraduate Engineering Education",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "B.Tech degrees, Keltron technical training add-ons, corporate campus placements",
    programmeType: "Engineering Degrees, Keltron Add-on Modules, Campus Placement",
    deliveryModel: "On-Campus / Labs",
    evidenceSource: "https://geckkd.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-04": {
    orgId: "org-col-04",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Autonomous Technical Higher Education, Industry Centers of Excellence",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Autonomous technical degrees, IBM Software Lab, AWS Academy modules, corporate recruitment tie-ups (Cognizant, Infosys, TCS)",
    programmeType: "Autonomous Technical Degrees, Industry Certifications, Corporate Hiring",
    deliveryModel: "On-Campus / Centers of Excellence",
    evidenceSource: "https://rajagiritech.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-05": {
    orgId: "org-col-05",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "State Government Technical & Engineering Education",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Engineering degrees, KTU academic curricula, corporate campus placements, KSUM IEDC incubation",
    programmeType: "B.Tech/M.Tech Degrees, Collegiate Research, Campus Placements",
    deliveryModel: "On-Campus / Labs",
    evidenceSource: "https://gcek.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-06": {
    orgId: "org-col-06",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Premier Government Arts & Science Higher Education (Est. 1857)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "UG/PG degree curricula, ASAP skill programmes, corporate campus hiring",
    programmeType: "Arts & Science Degrees, ASAP Skill Add-ons, Placement Drives",
    deliveryModel: "On-Campus",
    evidenceSource: "https://victoriacollege.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-07": {
    orgId: "org-col-07",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Premier State Engineering Education & Industry Research (Est. 1957)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Engineering degrees, industry research MoUs, corporate recruitment, KSUM TBI incubation",
    programmeType: "B.Tech/M.Tech/Ph.D. Degrees, Industry Sponsored Labs, Placements",
    deliveryModel: "On-Campus / R&D Labs",
    evidenceSource: "https://gectcr.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-08": {
    orgId: "org-col-08",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Aided Arts & Science College, ASAP Skill Hub",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "UG/PG degrees, ASAP Kerala advanced skill training, campus placement drives",
    programmeType: "Degree Programmes, ASAP Skill Courses, Campus Hiring",
    deliveryModel: "On-Campus",
    evidenceSource: "https://psmocollege.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-09": {
    orgId: "org-col-09",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Autonomous Heritage Higher Education & Research (Est. 1817)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Autonomous degree curricula, computer science labs, corporate hiring drives, KSUM incubation",
    programmeType: "Autonomous Degrees, Industry Incubation, Placement Drives",
    deliveryModel: "On-Campus",
    evidenceSource: "https://cmscollege.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-10": {
    orgId: "org-col-10",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Premier Autonomous Engineering & Technology Research Institution",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Autonomous engineering curricula, corporate R&D MoUs, TBI incubation, campus placements",
    programmeType: "Autonomous Engineering Degrees, Corporate Placement Drives",
    deliveryModel: "On-Campus / Centers of Excellence",
    evidenceSource: "https://tkmce.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-11": {
    orgId: "org-col-11",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "State Technical Education & Rural Tech Innovation in High Range",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "B.Tech degrees, ASAP technical modules, campus placement drives",
    programmeType: "Engineering Degrees, ASAP Skill Add-ons, Placements",
    deliveryModel: "On-Campus",
    evidenceSource: "https://gecwyd.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-12": {
    orgId: "org-col-12",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Govt-Controlled Engineering Education & Technical Training",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "B.Tech engineering degrees, industry training, corporate campus recruitment",
    programmeType: "Engineering Degrees, Industry Training Add-ons, Placements",
    deliveryModel: "On-Campus",
    evidenceSource: "https://lbscek.ac.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-13": {
    orgId: "org-col-13",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Autonomous Higher Education (BCA, MCA, Management), Industry Add-on Courses",
    partnershipTargets: {
      schools: "Unverified",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Autonomous degree curricula, collegiate MoUs, Infosys Springboard integration, corporate placement drives (TCS, Infosys, Wipro)",
    programmeType: "Autonomous Degree Programmes, Infosys Springboard Modules, Corporate Recruitment",
    deliveryModel: "Hybrid / On-Campus",
    evidenceSource: "https://mariancollege.org/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-14": {
    orgId: "org-col-14",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Aided Arts & Science College & Research Center (Est. 1946)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "UG/PG degree courses, ASAP skill modules, corporate campus placements",
    programmeType: "Degree Programmes, ASAP Skill Courses, Placements",
    deliveryModel: "On-Campus",
    evidenceSource: "https://sdcollege.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-col-15": {
    orgId: "org-col-15",
    entityNature: "institution",
    entityNatureLabel: "Educational Institution Itself",
    primaryBusiness: "Autonomous Post-Graduate Professional Degrees (MCA, MBA, Biosciences)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Postgraduate professional degrees, Technopark corporate partner tie-ups, community radio education",
    programmeType: "MCA / MBA Degrees, Corporate Finishing, Placement Drives",
    deliveryModel: "On-Campus / Corporate Tie-ups",
    evidenceSource: "https://macfast.org/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },

  // ==================== TRAINING INSTITUTES (EXTERNAL SERVICE PROVIDERS) ====================
  "org-trn-01": {
    orgId: "org-trn-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "IT Software & Data Science Finishing Academy (Python, MEARN, Flutter, AI)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Full-stack development, Python Data Science/AI, college campus workshops, corporate talent supply (200+ IT hiring partners)",
    programmeType: "Professional Finishing Bootcamp, College Seminars, Corporate Recruitment",
    deliveryModel: "Offline (Lab) & Online Interactive",
    evidenceSource: "https://luminartechnolab.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-trn-02": {
    orgId: "org-trn-02",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Global IT Education & Skill Training Network (500+ Centres)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Foundation computing, individual student courses, college campus skill partnerships, corporate IT certifications",
    programmeType: "Retail Computing Courses, College Add-on Diplomas, Corporate IT Training",
    deliveryModel: "Franchise Centers, College Add-on Labs",
    evidenceSource: "https://gteceducation.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-trn-03": {
    orgId: "org-trn-03",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Alternative Tech Finishing School (Zero Upfront Fee, Post-Placement Model)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "No"
    },
    serviceProvided: "Intensive 7-month coding bootcamp, web development, college campus orientation talks, 500+ corporate hiring partners",
    programmeType: "Full-Time Intensive Bootcamp, Corporate Talent Supply",
    deliveryModel: "Offline Hubs (Kochi, Calicut, Trivandrum, Bangalore)",
    evidenceSource: "https://brototype.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate"],
    isMultiSegment: true
  },
  "org-trn-04": {
    orgId: "org-trn-04",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Industrial Automation, Robotics, Embedded Systems, IoT & PLC/SCADA Training",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "College campus workshops, PLC/SCADA lab setups, corporate automation training for manufacturing & process industries, TUV Rheinland certification",
    programmeType: "College Technical MoUs, Corporate Automation Training, Professional Certification",
    deliveryModel: "Specialized Hardware Lab & Corporate On-site",
    evidenceSource: "https://ipcsglobal.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-trn-05": {
    orgId: "org-trn-05",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "IT Training and Software Apprenticeship Division of Massbytes Inc.",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Campus recruitment training, college project mentoring, software development talent supply, corporate induction",
    programmeType: "College Project Mentoring, Corporate Apprenticeship",
    deliveryModel: "Offline (Cyberpark / Calicut Lab) & Online",
    evidenceSource: "https://baabtra.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-trn-06": {
    orgId: "org-trn-06",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Hardware & Embedded Systems, Industrial IoT, and AI Training Institute",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "College IEEE student branch technical workshops, final-year engineering projects, embedded firmware corporate upskilling",
    programmeType: "College Technical Workshops, Corporate Embedded Upskilling",
    deliveryModel: "Offline (Lab) & On-Campus College Workshops",
    evidenceSource: "https://questinnovative.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-trn-07": {
    orgId: "org-trn-07",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Kerala State PSU Electronics Development Corporation Technical Training Division",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Individual vacation tech modules, engineering college MoUs & add-on certifications, corporate training for public/private firms, Kerala PSC recognised diplomas",
    programmeType: "Public Training Modules, College Add-on Diplomas, Corporate IT Training, Govt Certifications",
    deliveryModel: "State-wide Network of Centres & On-Campus Modules",
    evidenceSource: "https://eit.keltron.org/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-trn-08": {
    orgId: "org-trn-08",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Enterprise B2B Upskilling & Advanced IT Finishing (Cloud, DevOps, RPA, AI)",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "College campus placement readiness bootcamps, B2B corporate upskilling for Infopark tech enterprises, customized employee bootcamps",
    programmeType: "Campus Bootcamps, Corporate B2B Upskilling",
    deliveryModel: "Corporate Campus (Infopark Kochi) & Live Virtual",
    evidenceSource: "https://techmindz.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },

  // ==================== AGENCIES & EDTECH (EXTERNAL SERVICE PROVIDERS) ====================
  "org-agn-01": {
    orgId: "org-agn-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Digital Marketing & Creative Media Performance Agency Academy",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "College campus digital marketing seminars, performance marketing training for corporate brands across GCC & Kerala",
    programmeType: "Campus Seminars, Corporate Agency Upskilling",
    deliveryModel: "Offline Studios & Online Cohorts",
    evidenceSource: "https://harisandcoacademy.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-agn-02": {
    orgId: "org-agn-02",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "IT Services, Mobile App & Web Development with In-House Developer Internship Wing",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Engineering college internships, live tech project mentoring, enterprise B2B software engineering",
    programmeType: "College Internships, Corporate Software Solutions",
    deliveryModel: "Corporate Office / Hybrid",
    evidenceSource: "https://lilacinfotech.com/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-agn-03": {
    orgId: "org-agn-03",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Vernacular EdTech Upskilling, Test Prep & Coding Bootcamps",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Individual learner upskilling app, college campus ambassador drives, Entri Elevate corporate placements, NSDC/K-DISC skill programs",
    programmeType: "B2C Consumer App, College Placement Prep, Corporate Talent Supply, Govt Skill Projects",
    deliveryModel: "Mobile App & Online Live Cohorts",
    evidenceSource: "https://entri.app/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-agn-04": {
    orgId: "org-agn-04",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Digital Agency, UI/UX Design, Web Applications & Brand Consulting",
    partnershipTargets: {
      schools: "No",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "College design workshops, guest masterclasses, enterprise digital transformation, corporate web architecture",
    programmeType: "College Guest Lectures, Enterprise Digital Solutions",
    deliveryModel: "Agency Studio & Client On-site",
    evidenceSource: "https://acodez.in/",
    confidenceLevel: "High",
    partnershipCategories: ["colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-agn-05": {
    orgId: "org-agn-05",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Turnkey K-12 STEM, Robotics, and Coding Curriculum & Lab Setup for Schools",
    partnershipTargets: {
      schools: "Yes",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Turnkey in-school robotics labs, CBSE-aligned coding curriculum, trainer placement, annual school science exhibitions",
    programmeType: "Turnkey In-School Labs, Embedded Trainers, School STEM Curriculum",
    deliveryModel: "In-School Lab Setup & Embedded Trainers",
    evidenceSource: "https://stemxsolutions.in/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "other_partnerships"],
    isMultiSegment: true
  },

  // ==================== DEEP SCHOOL & INSTITUTIONAL SERVICE PROVIDERS ====================
  "org-delead-01": {
    orgId: "org-delead-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Experiential Learning, CSR Robotics Programs, Innovation Bootcamps, and Corporate Training",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Unverified",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Walk2Lead Robotics TechQuest in 100+ schools, TinkerChamps camps, MakerChamps innovation camps, corporate outbound leadership strategy retreats (India & UAE)",
    programmeType: "School CSR Robotics Labs, Corporate Leadership Retreats, Innovation Bootcamps",
    deliveryModel: "In-School Labs, CSR Deployments, Corporate Retreats",
    evidenceSource: "https://deleadint.com/ | https://w2l.deleadint.com/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-cybersquare-01": {
    orgId: "org-cybersquare-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Turnkey K-12 Coding, AI & Robotics Curriculum Provider",
    partnershipTargets: {
      schools: "Yes",
      colleges: "No",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Turnkey K-12 coding/AI curriculum, school LMS, teacher training, British Computer Society accreditation, corporate learning franchises",
    programmeType: "In-School Curricular Replacement, Cloud LMS, Franchise Hubs",
    deliveryModel: "Turnkey In-School Curriculum + Cloud LMS",
    evidenceSource: "https://cybersquare.org/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-aibonic-01": {
    orgId: "org-aibonic-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Turnkey School AI & Robotics Labs, School ERP, and Campus Management",
    partnershipTargets: {
      schools: "Yes",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Turnkey robotics & AI labs, student coding kits, school management ERP, Reach EduFoundation sponsorship",
    programmeType: "Turnkey School Labs, School ERP & Campus Solutions",
    deliveryModel: "In-School Lab Setup & Embedded Curriculum",
    evidenceSource: "https://aibonic.com/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "other_partnerships"],
    isMultiSegment: true
  },
  "org-kokos-01": {
    orgId: "org-kokos-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "K-12 AI & Robotics Curriculum, School Robolabs & Cloud LMS",
    partnershipTargets: {
      schools: "Yes",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Turnkey robolabs, AI curriculum, teacher training, online learning platform, KSUM accredited enterprise",
    programmeType: "In-School Robolabs, Cloud AI Curriculum",
    deliveryModel: "In-School Labs & Cloud Platform",
    evidenceSource: "https://kokos.ai/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "other_partnerships"],
    isMultiSegment: true
  },
  "org-iri-01": {
    orgId: "org-iri-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "School Robotics & AI Innovation Labs AND College/Institutional Automation Training",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Turnkey school robotics & AI labs (100+ schools), college engineering automation workshops, industrial robotics training for manufacturing plants",
    programmeType: "5-Tier School Robotics Labs, College Technical Workshops, Industrial Automation",
    deliveryModel: "In-School Labs, College Campus Workshops, Industrial Lab Centers",
    evidenceSource: "https://iri.org.in/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-pappiyon-01": {
    orgId: "org-pappiyon-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "School Mentoring, Quality Gap Analysis, Early Childhood Education & Institutional Consulting",
    partnershipTargets: {
      schools: "Yes",
      colleges: "No",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Pappiyon School Mentoring, academic audits, ECCE early childhood curriculum, faculty pedagogical development masterclasses for school trust chains",
    programmeType: "School Academic Audits, Curriculum Consulting, Faculty Masterclasses",
    deliveryModel: "On-Campus Consulting & Institutional Audits",
    evidenceSource: "https://pappiyonsolutions.com/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-rotech-01": {
    orgId: "org-rotech-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "K-12 STEAM & AI Education, School Robolabs, and College IoT Workshops",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Yes",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Turnkey school robolabs (70+ schools), STEAM kits, teacher training, college engineering workshops on Arduino and IoT",
    programmeType: "School Robolabs, College IoT Workshops",
    deliveryModel: "In-School Labs & College Workshops",
    evidenceSource: "https://rotechlearning.com/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "colleges", "other_partnerships"],
    isMultiSegment: true
  },
  "org-evolve-01": {
    orgId: "org-evolve-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Robotics Education, STEM Lab Hardware Kits, and College Technical Seminars",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Yes",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Turnkey school STEM kits, junior robotics after-school workshops, college engineering robotics competitions",
    programmeType: "School STEM Kits, College Robotics Workshops",
    deliveryModel: "Workshop-based & Lab Kits",
    evidenceSource: "https://evolverobotics.in/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "colleges", "other_partnerships"],
    isMultiSegment: true
  },
  "org-isq-01": {
    orgId: "org-isq-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Student Emotional Wellbeing, Life Skills, Mental Health, and In-School Mentoring",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "In-school life skills & emotional wellbeing curricula, campus youth mental wellness workshops, workplace stress management seminars",
    programmeType: "School Emotional Wellness, College Youth Workshops, Corporate Stress Management",
    deliveryModel: "On-Campus Sessions & Interactive Workshops",
    evidenceSource: "https://isqmindschool.com/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-naturenurture-01": {
    orgId: "org-naturenurture-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Turnkey Integrated School Curriculum, Experiential Learning, and Complete School Transformation",
    partnershipTargets: {
      schools: "Yes",
      colleges: "No",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "360-degree proprietary school curriculum, books, labs, teacher professional development, turnkey school setup for corporate builders/trust chains",
    programmeType: "Turnkey In-School Curriculum, Corporate School Setup",
    deliveryModel: "Turnkey Institutional Partnership & In-School Curriculum",
    evidenceSource: "https://naturenurture.in/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-robuverse-01": {
    orgId: "org-robuverse-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Robotics R&D, Turnkey STEM/AI School Labs, and Mechatronics Prototyping",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "School STEM/AI lab setup, college mechatronics prototyping & drone workshops, corporate hardware IoT development",
    programmeType: "School Labs, College Mechatronics Bootcamps, Corporate Prototyping",
    deliveryModel: "In-School Labs, College Campus Bootcamps, Prototyping Facility",
    evidenceSource: "https://robuverse.com/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-stemxpert-01": {
    orgId: "org-stemxpert-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Turnkey School Innovation Labs, Atal Tinkering Lab Setup, and STEM Add-on Programs",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Yes",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "ATL lab setup, 3D printing, electronics kits, teacher training college workshops on STEM pedagogy",
    programmeType: "Turnkey School ATL Labs, Teacher Training Workshops",
    deliveryModel: "In-School Turnkey Lab Setup & Maintenance",
    evidenceSource: "https://stemxpert.in/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "colleges", "other_partnerships"],
    isMultiSegment: true
  },
  "org-qfactory-01": {
    orgId: "org-qfactory-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Independent Knowledge Services, Professional Quizzing, Quiz Leagues, and Academic Edutainment",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Yes",
      corporate: "Yes",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Q Positive school quiz league, university campus quiz fests, corporate team-building quizzes, Govt/public agency knowledge events",
    programmeType: "School Quiz Leagues, Collegiate Knowledge Fests, Corporate Quizzes, Govt Fests",
    deliveryModel: "On-Campus Events, Stage Shows, Hybrid & Virtual Quiz Platforms",
    evidenceSource: "https://qfactory.in/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "colleges", "corporate", "other_partnerships"],
    isMultiSegment: true
  },
  "org-youngminds-01": {
    orgId: "org-youngminds-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "B2C Learning App & B2B School Innovation Partner (IoT Kits, Student Innovation Challenges)",
    partnershipTargets: {
      schools: "Yes",
      colleges: "No",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "Mobile student app, DIY electronics kits, school innovation challenges, science fair partner",
    programmeType: "B2B School Workshops, Student Maker Kits",
    deliveryModel: "B2B School Workshops & B2C App",
    evidenceSource: "https://youngminds.app/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "other_partnerships"],
    isMultiSegment: true
  },
  "org-ulspaceclub-01": {
    orgId: "org-ulspaceclub-01",
    entityNature: "external_provider",
    entityNatureLabel: "External Service / Training Provider",
    primaryBusiness: "Space Science, Astronomy, STEM Education & ISRO Space Tutor Outreach",
    partnershipTargets: {
      schools: "Yes",
      colleges: "Yes",
      corporate: "No",
      otherInstitutions: "Yes"
    },
    serviceProvided: "School space science curriculum, telescope observation nights (200+ schools), college space tech symposiums with NITC, ISRO interactive sessions",
    programmeType: "School Space Clubs, College Tech Symposiums, Community Astronomy",
    deliveryModel: "In-School Clubs, Mobile Astronomy Vans, Space Camps",
    evidenceSource: "https://ulspaceclub.org/",
    confidenceLevel: "High",
    partnershipCategories: ["schools", "colleges", "other_partnerships"],
    isMultiSegment: true
  }
};

// Helper: Get classification for an organisation ID
export function getPartnershipClassification(orgId) {
  return PARTNERSHIP_CLASSIFICATION_MAP[orgId] || null;
}

// Helper: Check if an organisation matches a specific category (supports multi-category memberships)
export function orgMatchesPartnershipCategory(org, categoryIdOrName) {
  if (!org || !org.id) return false;
  const classification = PARTNERSHIP_CLASSIFICATION_MAP[org.id] || org.partnershipClassification;
  
  const norm = String(categoryIdOrName || '').toLowerCase().trim();
  if (norm === 'all' || !norm) return true;

  // Handle Multi-Segment filter
  if (norm === 'multi-segment' || norm === 'multisegment' || norm === 'multi_segment') {
    if (classification && classification.partnershipCategories) {
      return classification.partnershipCategories.length >= 2;
    }
    return Boolean(org.isMultiSegment);
  }

  // Handle Schools
  if (norm === 'schools' || norm === 'school') {
    if (classification) {
      return classification.partnershipTargets.schools === 'Yes' || classification.partnershipCategories.includes('schools');
    }
    return org.segment === 'schools' || org.segment === 'higher_secondary';
  }

  // Handle Colleges
  if (norm === 'colleges' || norm === 'college' || norm.includes('universit')) {
    if (classification) {
      return classification.partnershipTargets.colleges === 'Yes' || classification.partnershipCategories.includes('colleges');
    }
    return org.segment === 'colleges';
  }

  // Handle Corporate
  if (norm === 'corporate' || norm === 'corp') {
    if (classification) {
      return classification.partnershipTargets.corporate === 'Yes' || classification.partnershipCategories.includes('corporate');
    }
    return org.segment === 'agencies_edtech';
  }

  // Handle Other Partnerships
  if (norm === 'other_partnerships' || norm === 'other' || norm.includes('partner')) {
    if (classification) {
      return classification.partnershipTargets.otherInstitutions === 'Yes' || classification.partnershipCategories.includes('other_partnerships');
    }
    return org.segment === 'training_institutes';
  }

  return false;
}

// Helper: Check if an organisation is an external provider
export function isExternalProvider(org) {
  if (!org || !org.id) return false;
  const classification = PARTNERSHIP_CLASSIFICATION_MAP[org.id] || org.partnershipClassification;
  if (classification) {
    return classification.entityNature === 'external_provider';
  }
  return org.segment === 'training_institutes' || org.segment === 'agencies_edtech';
}

// Helper: Check if an organisation is an educational institution itself
export function isEducationalInstitution(org) {
  if (!org || !org.id) return false;
  const classification = PARTNERSHIP_CLASSIFICATION_MAP[org.id] || org.partnershipClassification;
  if (classification) {
    return classification.entityNature === 'institution';
  }
  return org.segment === 'schools' || org.segment === 'higher_secondary' || org.segment === 'colleges';
}

