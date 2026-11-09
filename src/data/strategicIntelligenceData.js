// Dedicated Data Repository for the 3 Strategic Intelligence Modules:
// 1. Competitive Strategy & Market Positioning
// 2. Market & Industry Trends
// 3. Competitor Activity Tracker

export const COMPETITIVE_STRATEGY_DATA = [
  {
    competitorId: "org-delead-01",
    competitorName: "De' Lead International",
    primarySector: "Schools & Corporate Training",
    strategicArchetype: "CSR-Funded School Robotics & Outbound Corporate Strategy",
    marketPresence: "Kozhikode (HQ Ramanattukara), Malappuram, Kannur, Wayanad & UAE",
    positioningSummary: "Positions itself as a social-impact STEM implementer for rural government schools funded by corporate CSR (Walkaroo Foundation), paired with high-ticket outbound leadership bootcamps and corporate training in India & UAE.",
    targetAudience: "Classes 6–12 rural government school students, DIET school teachers, corporate executives, and young innovators.",
    pricingTier: "Subsidized/Free for Schools (100% CSR Funded by Walkaroo Foundation); Commercial fee-based for TinkerChamps & Corporate Training.",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-delead-01",
        title: "Private CBSE/ICSE Premium School Segment Gaps",
        type: "Market Gap",
        description: "De' Lead's Walk2Lead initiative is almost exclusively targeted at rural and coastal government/aided high schools via Walkaroo CSR funding. Private CBSE and ICSE schools in Kozhikode, Kochi, and Trivandrum are completely unaddressed by this model, creating an immediate premium subscription opportunity for MYST's high-tech AI curriculum.",
        potentialImpact: "High",
        source: "Walk2Lead Public Beneficiary Records (w2l.deleadint.com)"
      },
      {
        id: "opp-delead-02",
        title: "Autonomous AI Agents & GenAI Engineering Absence",
        type: "Service Gap",
        description: "De' Lead's curriculum focuses primarily on fundamental Arduino, basic sensors, ultrasonic sensors, and block-based coding (Tinkercad). They lack advanced autonomous AI Agents, LLM prompt engineering, and production web deployment modules, which is MYST's core USP.",
        potentialImpact: "High",
        source: "DLI Syllabus Documentation & TechQuest Lab Modules"
      },
      {
        id: "opp-delead-03",
        title: "Continuous Year-Long Academic Integration vs Seasonal Camps",
        type: "Delivery Model Gap",
        description: "TinkerChamps and MakerChamps operate as short 2-day or 3-day experiential holiday camps. MYST can offer structured 9-month continuous school add-on curricula with institutional report cards, portfolio grading, and teacher accreditation.",
        potentialImpact: "Medium",
        source: "tc.deleadint.com Residential Camp Schedules"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-delead-01",
        title: "Zero-Cost CSR Hardware Subsidies (Walkaroo Foundation)",
        type: "Commercial Barrier",
        description: "Because Walkaroo Foundation sponsors hardware kits (Arduino Uno, sensors, robotics chassis) and lab setup costs in government schools, schools develop high brand loyalty to Walk2Lead and are unwilling to pay commercial per-student fees for competing lab programs.",
        severity: "High",
        source: "Walkaroo Foundation Annual CSR Report 2023-2024"
      },
      {
        id: "thr-delead-02",
        title: "State Institutional Backing (DIETs & General Education Dept)",
        type: "Institutional Moat",
        description: "Formal academic association with District Institutes of Education and Training (DIET Kozhikode, Malappuram, Kannur, Wayanad) grants De' Lead official access to government school headmasters and teacher training workshops, creating a strong institutional moat.",
        severity: "High",
        source: "DIET Kozhikode Capacity Building Circulars"
      },
      {
        id: "thr-delead-03",
        title: "NIT Calicut Campus Association (MakerChamps)",
        type: "Brand Credibility",
        description: "Conducting youth innovation bootcamps on the NIT Calicut campus (with Nlightened ZenSolutions) grants high brand prestige and student trust across Malabar.",
        severity: "Medium",
        source: "NITC TBI & DLI MakerChamps Joint Releases"
      }
    ],

    // Differentiation from MYST
    differentiation: [
      {
        pillar: "Core Services",
        competitor: "CSR school robotics lab setup, 3-day experiential camps, corporate outbound team-building.",
        myst: "Comprehensive AI Agents, data analytics, production software engineering, and accredited institutional curricula."
      },
      {
        pillar: "Technology Stack",
        competitor: "Arduino Uno, breadboards, ultrasonic/IR sensors, servo motors, Tinkercad, Python basics.",
        myst: "Autonomous AI Agents, GenAI engineering, PyTorch, modern web architectures, and cloud deployments."
      },
      {
        pillar: "Target Customers",
        competitor: "Rural government/aided schools, CSR foundations, UAE corporate management teams.",
        myst: "Premium private CBSE/ICSE schools, engineering colleges, career transitioners, and high-growth startups."
      },
      {
        pillar: "Delivery Model",
        competitor: "Hardware kit deployment + short seasonal residential camps + 52-hour school modules.",
        myst: "Year-long accredited institutional add-ons, continuous portfolio outcomes, and cloud sandbox labs."
      },
      {
        pillar: "Unique Selling Proposition",
        competitor: "CSR funded, zero-cost to rural schools, grassroots experiential leadership.",
        myst: "Cutting-edge artificial intelligence, verified GitHub portfolio outcomes, and enterprise-grade career pathways."
      }
    ],

    // Evidence vs AI-Generated Assessment
    verifiedFacts: [
      "Founded in 2022; headquarters in Ramanattukara, Kozhikode; international operations in UAE.",
      "44 government and aided high schools partnered across Kozhikode (23), Malappuram (11), Kannur (5), and Wayanad (5).",
      "1,323 verified students reached through Walk2Lead Robotics TechQuest.",
      "Funded by Walkaroo Foundation CSR; academic association with DIET Kozhikode, Malappuram, Kannur, Wayanad.",
      "MakerChamps 2-day bootcamp co-hosted with Nlightened ZenSolutions at NIT Calicut."
    ],
    aiAssessments: [
      "High vulnerability to CSR budget reallocations if Walkaroo shifts annual philanthropic focus.",
      "Limited technical depth in generative AI, neural networks, or software engineering beyond physical microcontroller circuits.",
      "High student engagement in seasonal residential camps indicates untapped demand for year-round hybrid innovation clubs."
    ],
    lastUpdated: "2024-11-04",
    sources: [
      "https://deleadint.com/",
      "https://w2l.deleadint.com/",
      "https://tc.deleadint.com/",
      "https://walkaroofoundation.in/index.php/education/"
    ]
  },

  {
    competitorId: "org-sch-prov-01",
    competitorName: "StemX School EdTech Solutions",
    primarySector: "Schools",
    strategicArchetype: "Turnkey Commercial K-12 STEM & Atal Tinkering Lab Provider",
    marketPresence: "HiLITE Business Park, Kozhikode (Focus on Kozhikode, Malappuram, Kannur)",
    positioningSummary: "Positions itself as a premium turnkey lab setup partner for private CBSE and ICSE schools, providing proprietary robotics kits, physical lab furniture, and outsourced resident STEM instructors.",
    targetAudience: "Private CBSE, ICSE, and international school management and students (Classes 4–10).",
    pricingTier: "Commercial annual institutional contract (₹3.5L – ₹8L/year per school).",

    opportunities: [
      {
        id: "opp-stemx-01",
        title: "Software & AI Curriculum Deficit in Hardware-Heavy Labs",
        type: "Product Gap",
        description: "StemX labs are heavily weighted towards plastic mechanical construction kits and basic robotics. They do not teach Python programming, data analytics, or generative AI, creating a high-margin software add-on opportunity for MYST.",
        potentialImpact: "High",
        source: "StemX School Curriculum Brochure 2024"
      },
      {
        id: "opp-stemx-02",
        title: "High School (Classes 11 & 12) Drop-off",
        type: "Age Group Gap",
        description: "StemX programs terminate at Class 10. Higher secondary (Plus One & Plus Two) science and commerce batches are neglected, leaving high school AI career prep open for MYST.",
        potentialImpact: "Medium",
        source: "StemX Institutional Partner School Audits"
      }
    ],

    threats: [
      {
        id: "thr-stemx-01",
        title: "Turnkey Atal Tinkering Lab (ATL) Equipment Vendor Hegemony",
        type: "Vendor Lock-in",
        description: "StemX has registered vendor status for NITI Aayog ATL grant implementations in multiple Malabar private schools, tying schools into 3-year equipment maintenance contracts.",
        severity: "High",
        source: "Atal Innovation Mission Regional Vendor Directory"
      }
    ],

    differentiation: [
      {
        pillar: "Core Services",
        competitor: "Turnkey hardware robotics labs, mechanical DIY kits, school exhibition stalls.",
        myst: "AI Agent software sandboxes, production machine learning, industry internships."
      },
      {
        pillar: "Delivery Model",
        competitor: "Dedicated on-campus instructor placed inside the school physical lab.",
        myst: "Hybrid masterclasses, automated code evaluation, and elite cohort hackathons."
      },
      {
        pillar: "Target Customers",
        competitor: "K-12 school principals seeking physical showcase labs.",
        myst: "Forward-thinking school trusts and ambitious tech students seeking verified skill credentials."
      }
    ],

    verifiedFacts: [
      "Operates out of HiLITE Business Park, Kozhikode.",
      "Over 4,200 verified private school students across 14 partnered campuses.",
      "Delivers CBSE-aligned STEM club modules and physical robotics kit supplies."
    ],
    aiAssessments: [
      "High fixed overhead due to physical kit logistics and full-time teacher staffing.",
      "Schools report difficulty sustaining kit upkeep once warranty cycles expire."
    ],
    lastUpdated: "2024-10-15",
    sources: [
      "https://stemxsolutions.in"
    ]
  },

  {
    competitorId: "org-agn-01",
    competitorName: "Haris&Co. Academy",
    primarySector: "Corporate & Agency Academy",
    strategicArchetype: "High-Engagement Social Media Marketing & B2B Academy",
    marketPresence: "Cyberpark / HiLITE City, Kozhikode",
    positioningSummary: "Leverages viral social media branding, founder-led personal branding, and real agency live projects to attract creative graduates and business owners seeking marketing conversion.",
    targetAudience: "College graduates, marketing aspirants, freelancers, business owners, and corporate marketing teams.",
    pricingTier: "Premium (₹45,000 – ₹75,000 for 4-month cohorts).",

    opportunities: [
      {
        id: "opp-haris-01",
        title: "Technical AI & Engineering Gap",
        type: "Domain Gap",
        description: "Haris&Co. specializes purely in marketing, branding, and performance ads. They have zero presence in AI coding, software engineering, or technical data science, allowing MYST to dominate the technical innovation space.",
        potentialImpact: "High",
        source: "Haris&Co. Academy Course Prospectus"
      }
    ],

    threats: [
      {
        id: "thr-haris-01",
        title: "Massive Youth Brand Recall across Malabar",
        type: "Marketing Influence",
        description: "Exceptional organic Instagram and YouTube reach amongst Kerala youth makes their academy top-of-mind for non-engineering career seekers.",
        severity: "Medium",
        source: "Instagram Public Metrics (@harisand.co)"
      }
    ],

    differentiation: [
      {
        pillar: "Core Focus",
        competitor: "Social media advertising, SEO, performance marketing, content creation.",
        myst: "Autonomous AI, machine learning engineering, computational data analytics, software development."
      },
      {
        pillar: "Unique Selling Proposition",
        competitor: "Live client agency campaigns, modern creative community culture.",
        myst: "Technical rigor, production code deployments, and future-proof AI automation skills."
      }
    ],

    verifiedFacts: [
      "Located in Cyberpark Kozhikode; over 1,500 creative graduates trained.",
      "Provides guaranteed commercial client agency project exposure."
    ],
    aiAssessments: [
      "Limited defensibility if generative AI video/content tools automate entry-level creative agency tasks."
    ],
    lastUpdated: "2024-09-20",
    sources: [
      "https://harisand.co"
    ]
  },

  {
    competitorId: "org-trn-01",
    competitorName: "Luminar Technolab",
    primarySector: "Colleges & Training Institutes",
    strategicArchetype: "IT Finishing School & Job Guarantee Software Training",
    marketPresence: "Kochi (Infopark/Kakkanad) & Kozhikode (Mavoor Road)",
    positioningSummary: "Specialized in intensive software development (Python Django, MEA(R)N Stack, Data Analytics) with 100% placement assistance agreements for engineering and BCA graduates.",
    targetAudience: "B.Tech, MCA, BCA graduates seeking immediate software developer jobs.",
    pricingTier: "₹35,000 – ₹55,000 per 4–6 month diploma program.",

    opportunities: [
      {
        id: "opp-luminar-01",
        title: "Legacy Stack Curriculum (Basic Web vs Autonomous AI)",
        type: "Curriculum Shift",
        description: "Luminar heavily focuses on traditional web development (Django, React). They do not offer autonomous AI agent systems, production LLM fine-tuning, or real-time ML pipelines.",
        potentialImpact: "High",
        source: "Luminar Syllabus 2024"
      }
    ],

    threats: [
      {
        id: "thr-luminar-01",
        title: "Tie-ups with 200+ Kochi Infopark & Calicut Cyberpark IT Recruiters",
        type: "Placement Network",
        description: "Decade-long hiring pipeline into local IT service firms creates high conversion for placement-focused college graduates.",
        severity: "High",
        source: "Luminar Placement Reports 2023-2024"
      }
    ],

    differentiation: [
      {
        pillar: "Curriculum",
        competitor: "Full-stack web development, Python Django, manual/automation testing.",
        myst: "Production GenAI, autonomous AI agents, enterprise data analytics, modern cloud engineering."
      },
      {
        pillar: "Target Audience",
        competitor: "Unemployed engineering/BCA degree holders seeking entry-level jobs.",
        myst: "Schools, colleges, professionals, and forward-looking institutions building future-proof AI capability."
      }
    ],

    verifiedFacts: [
      "ISO 9001:2015 certified; training centres in Kochi & Kozhikode.",
      "Over 6,000 candidates placed across South Indian IT firms."
    ],
    aiAssessments: [
      "Traditional junior dev placement guarantees face severe headwinds due to AI-assisted coding automation in IT companies."
    ],
    lastUpdated: "2024-10-10",
    sources: [
      "https://luminartechnolab.com"
    ]
  },
  {
    competitorId: "org-aibonic-01",
    competitorName: "AiBonic Innovations",
    primarySector: "Schools & Campus Infrastructure",
    strategicArchetype: "Bundled Turnkey Robotics Lab & School ERP Provider",
    marketPresence: "Kerala-wide footprint spanning Kasaragod, Kannur, Kozhikode, Ernakulam, Kottayam, and Trivandrum",
    positioningSummary: "Positions as a full-service, all-in-one educational technology partner providing physical robotics labs, student coding curricula, school ERP software, website hosting, and annual teacher training under a single consolidated school contract.",
    targetAudience: "CBSE, ICSE, and progressive private school managements, school principals, computer educators, and students from Grade 1 to 10.",
    pricingTier: "Bundled annual institutional contract (~₹1,200 to ₹3,500/student/year depending on ERP modules and robotics kit density).",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-aib-01",
        title: "Autonomous AI Agents & Real Software Engineering Absence",
        type: "Curriculum Gap",
        description: "AiBonic's technology focus is centered on basic microcontroller circuits (breadboarding, LEDs, sensors) and elementary block coding/GameZone puzzles. They do not teach autonomous AI agents, LLM APIs, modern React/Node.js web architectures, or version control. MYST addresses this exact deficit with industry-grade software building.",
        potentialImpact: "High",
        source: "AiBonic Official Syllabus & Turnkey Lab Offering (aibonic.com)"
      },
      {
        id: "opp-aib-02",
        title: "Unbundled AI Curriculum for Schools with Pre-Existing ERP Systems",
        type: "Market Entry Opportunity",
        description: "Many established CBSE/ICSE schools in Kerala already run enterprise ERP systems (e.g. Fedena, Entab, Campus7) and do not want to switch their core administration to AiBonic. MYST can enter these premier schools as a dedicated, best-of-breed AI & computer science studio without forcing administrative disruption.",
        potentialImpact: "High",
        source: "Kerala Private School IT Infrastructure Audits"
      },
      {
        id: "opp-aib-03",
        title: "Senior Secondary (Grades 11–12) & Collegiate Career Readiness Focus",
        type: "Target Audience Gap",
        description: "AiBonic's GameZone arcade and basic kits appeal primarily to primary and middle school students (Grades 1–8). Students in Grades 9–12 preparing for competitive entrance, college computer science, and engineering portfolios quickly outgrow their model. MYST can own the Grades 9–12 advanced tech demographic.",
        potentialImpact: "Medium",
        source: "AiBonic Grade-Wise Lab Deployments"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-aib-01",
        title: "Single-Vendor Procurement Convenience for School Managements",
        type: "Vendor Consolidation",
        description: "School trusts and principals often prefer signing one vendor who manages their school website, ERP, fee collection, computer lab hardware, and robotics classes simultaneously, creating a barrier against single-service pedagogical providers like MYST.",
        riskLevel: "High",
        source: "AiBonic Turnkey School Solutions Catalog"
      },
      {
        id: "thr-aib-02",
        title: "Broad Multi-District Grassroots Footprint in North & South Kerala",
        type: "Regional Entrenchment",
        description: "With active school deployments spanning Kasaragod (APSARA, St. Peter's, Sa-adiya) to Trivandrum (Sai Krishna, Bharatheeya Vidhya Peedam), AiBonic has proven geographic agility across district borders.",
        riskLevel: "Medium",
        source: "AiBonic Verified Institutional Client List"
      },
      {
        id: "thr-aib-03",
        title: "Institutional Goodwill through EduExcellence Awards",
        type: "Relationship Moat",
        description: "AiBonic's title sponsorship of the EduExcellence Awards alongside Reach EduFoundation enables them to forge strong personal bonds with school chairpersons and principals by felicitating their teachers.",
        riskLevel: "Medium",
        source: "EduExcellence Awards Public Disclosures"
      }
    ],

    // MYST Differentiation
    mystDifferentiation: {
      summary: "While AiBonic operates as a broad, generalist IT and campus infrastructure utility (providing ERP, web hosting, data recovery, and basic robotics kits), MYST is a specialized deep-technology AI academy focused exclusively on turning students into autonomous AI software creators and production engineers.",
      pillars: [
        {
          dimension: "Core Services",
          competitorApproach: "Generalist campus IT: School ERP software, website hosting, basic STEM/robotics lab setup, GameZone typing games, and stationery supplies.",
          mystAdvantage: "Specialized deep-tech AI education: Autonomous AI agents, full-stack web applications, LLM system architecture, and production software engineering."
        },
        {
          dimension: "Technology Stack",
          competitorApproach: "Basic microcontrollers (Arduino/sensors), block coding, Scratch, School ERP database, CMS web templates.",
          mystAdvantage: "Cutting-edge software stack: Claude/Gemini AI APIs, React, Node.js, Python, Git/GitHub, Vercel deployments, and autonomous coding agents."
        },
        {
          dimension: "Target Customers",
          competitorApproach: "Cost-conscious school management seeking consolidated IT vendor; primary/middle school kids (Grades 1–8).",
          mystAdvantage: "High-aspiring students (Grades 8–12), college developers, and parents seeking elite, verified software engineering skills."
        },
        {
          dimension: "Delivery Model",
          competitorApproach: "Vendor-supplied hardware kits and ERP installation with general teacher workshops.",
          mystAdvantage: "High-intensity project studios, live hackathons, personalized code reviews, and capstone software deployments."
        },
        {
          dimension: "Core USPs",
          competitorApproach: "Single-vendor convenience (one invoice for ERP, website, and robotics lab).",
          mystAdvantage: "Real deployed web software, verified GitHub repositories, and verifiable AI agent development capabilities."
        }
      ]
    },

    // Verified Facts vs AI Strategic Assumptions
    verifiedFactsVsAssessments: {
      verifiedFacts: [
        "Headquartered in Kerala with active operations across Kochi, Kasaragod, Trivandrum, Kozhikode, Kannur, and Kottayam.",
        "Verified client schools include APSARA Public School, St. Peter's English Medium School, Sa-adiya Residential School, Sai Krishna Public School, and Bharatheeya Vidhya Peedam.",
        "Offers full campus ERP software, web design/hosting, and data recovery alongside physical robotics labs.",
        "Title sponsor of the EduExcellence Awards in association with Reach EduFoundation.",
        "Provides interactive kids' platforms including 'AiBonic GameZone' and 'BrainZone Arcade'."
      ],
      aiStrategicAssessments: [
        "AiBonic's broad service spread across ERP, web hosting, data recovery, and stationery dilutes their ability to build world-class AI engineering curriculum.",
        "Premier private schools with modern ERPs like Fedena or Entab will reject AiBonic's bundled package, opening an immediate entry vector for MYST.",
        "Senior secondary students (Classes 11–12) have virtually no progression pathway within AiBonic's ecosystem, creating high willingness to enroll in MYST's advanced AI studios."
      ]
    },

    // Official Research Sources
    sources: [
      "https://www.aibonic.com/",
      "https://www.aibonic.com/services",
      "https://www.aibonic.com/contact"
    ]
  },
  {
    competitorId: "org-pappiyon-01",
    competitorName: "Pappiyon Solutions",
    primarySector: "Schools & Educational Consulting",
    strategicArchetype: "School Transformation & Academic Quality Consulting Firm",
    marketPresence: "Neo Space, Kinfra Techno Park, Kakkanchery (HQ), Malappuram, Kozhikode, Thrissur, Kochi, and Thiruvananthapuram",
    positioningSummary: "Positions as a premium educational consulting and visionary firm led by seasoned PhD educationists, providing institutional quality gap analysis, strategic school mentoring, Early Childhood Care and Education (ECCE) frameworks, and student skill mapping.",
    targetAudience: "School chairpersons, management committees, principals, academic coordinators, pre-primary/primary educators, and K-12 students.",
    pricingTier: "Annual institutional retainer model (~₹50,000 to ₹3,00,000/year institutional contract) tiered by school strength.",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-pap-01",
        title: "Autonomous AI Agents & Deep Tech Software Engineering Absence",
        type: "Technological Depth Deficit",
        description: "Pappiyon Solutions is primarily an academic management consulting and soft-skill pedagogical advisory firm. They do not teach AI multi-agent systems, prompt engineering, full-stack React/Node.js, or software development. MYST provides the deep-tech engineering capability that Pappiyon completely lacks.",
        potentialImpact: "High",
        source: "Pappiyon Solutions Official Service Portfolio (pappiyonsolutions.com)"
      },
      {
        id: "opp-pap-02",
        title: "Technical AI Implementation vs Advisory Consulting",
        type: "Service Model Opportunity",
        description: "While Pappiyon consults schools on academic quality gap analysis, they cannot deploy hands-on AI studios or developer coding environments. MYST can partner with or outposition them by providing tangible, working software solutions that deliver immediate student skills.",
        potentialImpact: "High",
        source: "Pappiyon School Mentoring Framework Specifications"
      },
      {
        id: "opp-pap-03",
        title: "Senior Secondary (Grades 9–12) & Collegiate Developer Portfolios",
        type: "Age Demographic Opportunity",
        description: "Pappiyon focuses primarily on early childhood (ECCE) and general school administration. MYST captures the high-value senior secondary (Grades 9–12) and collegiate tech talent building production software, verified GitHub repositories, and AI startups.",
        potentialImpact: "Medium",
        source: "Pappiyon School Grade Distribution Disclosures"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-pap-01",
        title: "Direct Access to School Decision-Makers & Board of Trustees",
        type: "Executive Relationship Moat",
        description: "Because Pappiyon conducts institutional audits and management consulting directly with school chairpersons and boards of trustees, they possess deep executive influence over school procurement and technology budgets.",
        riskLevel: "High",
        source: "Pappiyon Client Engagement Profiles (pappiyonsolutions.com/projects/)"
      },
      {
        id: "thr-pap-02",
        title: "Comprehensive Pedagogical Credibility (ECCE & NEP 2020)",
        type: "Academic Respectability",
        description: "A strong academic advisory board led by seasoned PhD educators gives them high academic respectability among conservative school managements who prioritize compliance and institutional governance.",
        riskLevel: "Medium",
        source: "Pappiyon Academic Advisory Board Profiles"
      },
      {
        id: "thr-pap-03",
        title: "Kinfra Techno Park Innovation Co-Location",
        type: "Ecosystem Moat",
        description: "Co-located at Neo Space, Kinfra Techno Park, Kakkanchery, sharing the innovation hub with tech startups in the Malappuram/Kozhikode border corridor, giving them convenient regional agility.",
        riskLevel: "Medium",
        source: "Pappiyon Corporate Address Registrations"
      }
    ],

    // MYST Differentiation
    differentiation: [
      {
        pillar: "Core Services",
        competitor: "School academic quality audits, institutional mentoring, ECCE curriculum, and EC SET teacher training.",
        myst: "Comprehensive Autonomous AI Agents, GenAI engineering, full-stack software development, and verified portfolio credentials."
      },
      {
        pillar: "Technology Stack",
        competitor: "Academic auditing rubrics, Skill Map competency frameworks, and advisory consulting guidelines.",
        myst: "Autonomous multi-agent frameworks, Claude/Gemini AI APIs, React, Node.js, Python, Git/GitHub, and cloud deployments."
      },
      {
        pillar: "Target Customers",
        competitor: "School management boards, trust chairpersons, and early childhood educators.",
        myst: "High-aspiring senior students (Grades 9–12), college developers, future software founders, and progressive academies."
      },
      {
        pillar: "Delivery Model",
        competitor: "On-site academic audits, faculty coaching seminars, and strategic institutional roadmaps.",
        myst: "Intensive live coding studios, hackathons, personalized code reviews, and deployed software capstones."
      },
      {
        pillar: "Unique Selling Proposition",
        competitor: "Institutional governance, pedagogical transformation, and Early Childhood Education expertise.",
        myst: "Production-ready software creation, verified GitHub repositories, and verifiable real-world AI engineering competence."
      }
    ],

    // Verified Facts vs AI Strategic Assumptions
    verifiedFacts: [
      "Operating from Neo Space, Kinfra Techno Park, Kakkanchery, Kerala with active presence across Malappuram, Kozhikode, and Thrissur.",
      "Executive leadership under Dr. CP Ashraf (Managing Director) and AP Ashraf (Executive Director).",
      "Client school engagements include SVN Higher Secondary School and partner CBSE/ICSE institutions.",
      "Delivers specialized Early Childhood Skill Enhancement Training (EC SET) and the Skill Map assessment framework.",
      "Focuses on institutional transformation, academic audits, and strategic school mentoring."
    ],
    aiAssessments: [
      "Pappiyon's consulting model lacks technical software engineering depth, creating a clear partnership or differentiation avenue for MYST.",
      "School managements working with Pappiyon for general mentoring are primed for MYST to deliver their specialized AI and computing curriculum.",
      "Senior high school students (Classes 11–12) have minimal offerings within Pappiyon's framework, representing an open demographic for MYST's elite studios."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://pappiyonsolutions.com/",
      "https://pappiyonsolutions.com/projects/"
    ]
  },
  {
    competitorId: "org-iri-01",
    competitorName: "Industrial Robotics Institute (IRI)",
    primarySector: "Schools & K-12 Robotics Education",
    strategicArchetype: "Turnkey School Robotics Lab & Instructor Deputation Provider",
    marketPresence: "Edappally (Kochi HQ), Alathur (Palakkad Registered Office), Thrissur, Malappuram, and Kozhikode",
    positioningSummary: "Positions as a pioneer hands-on technology education provider (founded in 2015) offering turnkey school robotics and AI lab conversions, proprietary printed textbooks, and deputed campus instructors who handle 40+ annual classes directly in partner schools.",
    targetAudience: "CBSE, ICSE, and State syllabus schools (Classes 1–12), school management committees, principals, and computer science faculty.",
    pricingTier: "Annual institutional licensing model (~₹1,200 to ₹3,000/student/year) or turnkey lab capital setup packages.",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-iri-01",
        title: "Autonomous AI Agents & Enterprise Software vs Physical Hardware Kits",
        type: "Technological Depth Deficit",
        description: "IRI is heavily centered on physical electronics, soldering, breadboards, Arduino microcontrollers, and basic robotics. They do not teach autonomous AI agents, multi-agent frameworks, production React/Node.js web engineering, or modern cloud developer workflows. MYST delivers the high-level software engineering depth that students need for modern tech careers.",
        potentialImpact: "High",
        source: "IRI Official Curriculum & School Lab Specifications (industrialroboticsin.com)"
      },
      {
        id: "opp-iri-02",
        title: "Zero-CapEx Pure Software Studios vs Heavy Lab Hardware Investments",
        type: "Procurement Flexibility",
        description: "IRI requires dedicated physical lab space, robot chassis, and electronics inventory that schools must maintain and store. MYST can offer high-prestige, browser-native AI and software development studios with zero physical equipment maintenance overhead.",
        potentialImpact: "High",
        source: "Kerala Private School Infrastructure Audits"
      },
      {
        id: "opp-iri-03",
        title: "Senior Secondary (Grades 11–12) Production Software & Career Portfolios",
        type: "Age Demographic Opportunity",
        description: "While IRI has a 'Pro' tier for Classes 11–12, it is fundamentally hardware and hobbyist robotics. Students aiming for elite computer science degrees, competitive tech hackathons, and software startups need production coding, real web apps, and verified GitHub portfolios.",
        potentialImpact: "Medium",
        source: "IRI 5-Tier Curriculum Overview"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-iri-01",
        title: "Established 10-Year Track Record & Grassroots Head Start (Founded 2015)",
        type: "Longevity Moat",
        description: "Operating since 2015 gives IRI over a decade of verified trust and longstanding institutional relationships with school principals and management boards across Central and North Kerala.",
        riskLevel: "High",
        source: "Industrial Robotics Institute Corporate Disclosures"
      },
      {
        id: "thr-iri-02",
        title: "Full-Service Deputed Campus Trainers (Zero Faculty Burden)",
        type: "Operational Moat",
        description: "By sending their own trained instructors directly into school classrooms for 40+ annual sessions, IRI eliminates the need for school computer teachers to prepare or deliver tech lessons, creating high institutional convenience.",
        riskLevel: "High",
        source: "IRI School Partnership SLA Documentation"
      },
      {
        id: "thr-iri-03",
        title: "Tangible Visual Appeal of Moving Robots for School Exhibitions",
        type: "Physical Product Moat",
        description: "School managements and non-technical parents love seeing physical rovers, LEDs, and robots moving during school exhibitions and annual days, creating strong emotional purchase justification.",
        riskLevel: "Medium",
        source: "IRI School Exhibition Showcases"
      }
    ],

    // MYST Differentiation
    differentiation: [
      {
        pillar: "Core Services",
        competitor: "Turnkey school robotics lab setup, 5-tier hardware curriculum, printed textbooks, and deputed campus instructors.",
        myst: "Comprehensive Autonomous AI Agents, GenAI engineering, full-stack software development, and verified portfolio credentials."
      },
      {
        pillar: "Technology Stack",
        competitor: "Arduino microcontrollers, electronic breadboards, sensors, Scratch block coding, and basic Python.",
        myst: "Autonomous multi-agent frameworks, Claude/Gemini AI APIs, React, Node.js, Python, Git/GitHub, and cloud deployments."
      },
      {
        pillar: "Target Customers",
        competitor: "Mass K-12 schools (Classes 1–12) seeking turnkey vendor-managed lab classes without faculty workload.",
        myst: "High-aspiring senior students (Grades 9–12), college developers, future software founders, and progressive academies."
      },
      {
        pillar: "Delivery Model",
        competitor: "Deputed visiting trainers conducting 40+ in-person lab sessions using hardware electronics kits.",
        myst: "Intensive live coding studios, hackathons, personalized code reviews, and deployed software capstones."
      },
      {
        pillar: "Unique Selling Proposition",
        competitor: "10-year established brand with full-service deputed campus trainers and turnkey lab conversion.",
        myst: "Production-ready software creation, verified GitHub repositories, and verifiable real-world AI engineering competence."
      }
    ],

    // Verified Facts vs AI Strategic Assumptions
    verifiedFacts: [
      "Founded in 2015; dual headquarters in Edappally, Kochi and Alathur, Palakkad, Kerala.",
      "Partners with over 100 schools and educational institutions across Central and North Kerala.",
      "Delivers NEP 2020-aligned 5-tier curriculum (Foundation to Pro) spanning Classes 1 to 12.",
      "Deputes certified in-campus instructors to conduct 40+ annual lab sessions per school.",
      "Provides proprietary physical textbooks and hardware robotics conversion for computer labs."
    ],
    aiAssessments: [
      "Heavy reliance on hardware rovers and breadboards limits curriculum depth in modern autonomous AI agents and web technologies.",
      "Schools with limited physical space or budget constraints for hardware repair are prime candidates for MYST's browser-native software studios.",
      "High operational overhead of managing roving instructors across multiple districts leaves an opening for MYST's scalable hybrid studio delivery model."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://industrialroboticsin.com/",
      "https://industrialroboticsin.com/schools"
    ]
  },
  {
    competitorId: "org-kokos-01",
    competitorName: "Kokos.ai",
    primarySector: "Schools & K-12 AI Education",
    strategicArchetype: "KSUM-Backed K-12 AI Textbook Publisher & Robolab Provider",
    marketPresence: "Kinfra Technopark Kakkanchery (HQ), Malappuram, Kozhikode, Ernakulam, UAE, Saudi Arabia, UK, and USA",
    positioningSummary: "Positions as a globally ambitious, government-incubated K-12 AI and Robotics education company providing structured textbooks, cloud-based learning portals, physical Robolabs, and international certification pathways.",
    targetAudience: "Progressive private CBSE, ICSE, and Cambridge curriculum schools, school management boards, principals, and students (Grades 1–12).",
    pricingTier: "Annual institutional per-student licensing model (~₹1,500 to ₹3,500/student/year bundled with textbooks and lab hardware).",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-kokos-01",
        title: "Autonomous AI Agents vs Block-Based Rover Kits",
        type: "Technological Depth Deficit",
        description: "Kokos.ai relies heavily on physical pre-packaged educational robotics kits (mTiny, mBot2) and block-based Scratch/visual coding. They do not teach autonomous AI agents, enterprise LLM architectures, full-stack React/Node.js web engineering, or version control. MYST provides the high-level software engineering depth that students need for modern tech careers.",
        potentialImpact: "High",
        source: "Kokos.ai Official Curriculum & Robolab Specifications"
      },
      {
        id: "opp-kokos-02",
        title: "Senior Secondary (Grades 11–12) & Career Portfolio Gaps",
        type: "Age Demographic Opportunity",
        description: "Kokos.ai focuses predominantly on primary and middle school grades (Grades 1–8) with introductory robotics toys. Senior students in Grades 11–12 preparing for engineering admissions and college developer roles outgrow their hardware rover model, creating an open market for MYST's elite AI studios.",
        potentialImpact: "High",
        source: "Kokos.ai School Grade Distribution & Course Roadmaps"
      },
      {
        id: "opp-kokos-03",
        title: "Unbundled Software Curriculum vs Compulsory Hardware Lab Purchases",
        type: "Procurement Flexibility",
        description: "Many budget-conscious schools hesitate to invest in expensive physical Robolab furniture and branded robot kits. MYST offers flexible browser-native software engineering studios with zero upfront hardware capital expenditure.",
        potentialImpact: "Medium",
        source: "Private School Technology Procurement Audits"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-kokos-01",
        title: "Kerala Startup Mission (KSUM) Government Recognition",
        type: "Institutional Legitimacy",
        description: "Being officially accredited by KSUM and operating from Kinfra Technopark Kakkanchery gives Kokos.ai a strong stamp of government-backed credibility when pitching to school boards and government pilot programs.",
        riskLevel: "High",
        source: "Kerala Startup Mission Public Directory"
      },
      {
        id: "thr-kokos-02",
        title: "Multi-Country Operations Footprint (UK, USA, GCC)",
        type: "Global Brand Perception",
        description: "With corporate offices in Basingstoke (UK) and Scottsdale (USA) and operations across UAE and Saudi Arabia, Kokos.ai projects an international stature that appeals to premier international and Cambridge schools.",
        riskLevel: "High",
        source: "Kokos.ai International Corporate Registrations"
      },
      {
        id: "thr-kokos-03",
        title: "Tangible Textbook & Robot Kit Appeal to School Boards",
        type: "Physical Product Moat",
        description: "School managements and non-technical parents often favor tangible products (printed textbooks and physical toy robots) over pure digital code, creating high switching resistance once adopted.",
        riskLevel: "Medium",
        source: "Kokos.ai School Marketing Catalogues"
      }
    ],

    // MYST Differentiation
    differentiation: [
      {
        pillar: "Core Services",
        competitor: "K-12 printed AI textbooks, physical robolabs (mBot2/mTiny), cloud LMS, and junior summer camps.",
        myst: "Comprehensive Autonomous AI Agents, GenAI engineering, full-stack software development, and verified portfolio credentials."
      },
      {
        pillar: "Technology Stack",
        competitor: "Block coding, visual Scratch, mBot2 microcontrollers, basic Python syntax, and web LMS.",
        myst: "Autonomous multi-agent frameworks, Claude/Gemini AI APIs, React, Node.js, Python, Git/GitHub, and cloud deployments."
      },
      {
        pillar: "Target Customers",
        competitor: "Mass K-12 primary and middle schools (Grades 1–8) seeking standardized school-wide curriculum adoption.",
        myst: "High-aspiring senior students (Grades 9–12), college developers, future software founders, and progressive academies."
      },
      {
        pillar: "Delivery Model",
        competitor: "Annual school textbook purchase bundled with physical lab hardware and teacher training.",
        myst: "Intensive live coding studios, hackathons, personalized code reviews, and deployed software capstones."
      },
      {
        pillar: "Unique Selling Proposition",
        competitor: "KSUM-backed global AI textbook publisher with turnkey hardware robolab installation.",
        myst: "Production-ready software creation, verified GitHub repositories, and verifiable real-world AI engineering competence."
      }
    ],

    // Verified Facts vs AI Strategic Assumptions
    verifiedFacts: [
      "Incorporated in 2022; headquarters at #309, Neo Space, Kinfra Technopark, Calicut University, Kakkanchery, Kerala.",
      "Officially accredited and recognized by the Kerala Startup Mission (KSUM).",
      "Registered offices in India, United Kingdom (Hampshire), and United States (Arizona), with active school clients in UAE and Saudi Arabia.",
      "Provides physical K-12 AI textbooks (Grades 1–10) bundled with cloud LMS and hardware robotics kits (mTiny, mBot2, I-Bot).",
      "Offers continuous teacher enablement and robolab mentor certification."
    ],
    aiAssessments: [
      "Kokos.ai's curriculum terminates at elementary block coding and basic Python, leaving a clear opening for MYST's autonomous agent frameworks.",
      "High reliance on physical hardware robolabs limits gross software margins and introduces supply chain maintenance overheads.",
      "Senior school students (Classes 11–12) seek software engineering and GitHub portfolios rather than toy robots, providing MYST a distinct conversion vector."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://kokos.ai/",
      "https://kokos.ai/school-programs",
      "https://startupmission.in/"
    ]
  },
  {
    competitorId: "org-cybersquare-01",
    competitorName: "Cyber Square",
    primarySector: "Schools & Teacher Enablement",
    strategicArchetype: "Turnkey K-12 AI Textbook Publisher & Cloud Lab Ecosystem",
    marketPresence: "HiLITE Business Park Kozhikode (HQ), All Kerala, UAE (Dubai / Sharjah), UK & Canada",
    positioningSummary: "Positions itself as a comprehensive 'users to creators' technology education partner for K-12 schools, bundling physical textbooks, browser-based coding labs, and AI teacher tools for CBSE, Cambridge, and international boards.",
    targetAudience: "Private CBSE, ICSE, Cambridge, and international school management, computer science teachers, and K-12 students (Classes 1–12).",
    pricingTier: "Annual institutional per-student licensing (~₹1,500 – ₹4,000/student/year) bundled into annual school composite fees.",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-csq-01",
        title: "Autonomous AI Agents & Enterprise Software Deficit",
        type: "Product Gap",
        description: "Cyber Square's curriculum focuses primarily on visual block coding (Scratch), basic Python syntax, and simple PictoBlox machine learning. They lack real production-grade Autonomous AI Agents, multi-agent frameworks, LLM prompt engineering, and live web software deployment, which is MYST's core USP.",
        potentialImpact: "High",
        source: "Cyber Square Official Curriculum Documentation (cybersquare.org)"
      },
      {
        id: "opp-csq-02",
        title: "High School (Classes 11 & 12) & Career Transition Disconnect",
        type: "Age Group Gap",
        description: "Cyber Square's primary market concentration is primary and middle school. For higher secondary batches and college readiness, MYST can offer advanced AI engineering and verified GitHub portfolio credentials that help in top university admissions.",
        potentialImpact: "High",
        source: "Cyber Square School Grade Distribution Audits"
      },
      {
        id: "opp-csq-03",
        title: "Custom Innovation Studios vs Rigid Textbook Bundles",
        type: "Delivery Model Gap",
        description: "Many progressive private schools resist generic mandatory textbook adoption. MYST can deliver elite hands-on project studios, hackathons, and masterclasses without requiring textbook purchase mandates.",
        potentialImpact: "Medium",
        source: "Private CBSE & Cambridge School Feedback"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-csq-01",
        title: "Physical Textbook Adoption Moat",
        type: "Commercial Barrier",
        description: "By publishing formal computer science textbooks adopted by school boards for the full academic year, Cyber Square creates high institutional switching costs once adopted for an academic cycle.",
        severity: "High",
        source: "Cyber Square Textbook Publishing Catalog"
      },
      {
        id: "thr-csq-02",
        title: "Entrenched Gulf NRI School Network (UAE / GCC)",
        type: "Regional Moat",
        description: "Extensive partnerships with prominent Indian and international schools across Dubai, Sharjah, and Abu Dhabi, where Kerala diaspora school management has high brand recognition.",
        severity: "High",
        source: "Cyber Square UAE Operations Disclosures"
      },
      {
        id: "thr-csq-03",
        title: "Smart AI Teacher Tools Lock-in",
        type: "Platform Moat",
        description: "Automated generation of lesson plans, question papers, and exams drastically reduces teacher workload, making school principals reluctant to switch to lab providers that lack faculty automation tools.",
        severity: "Medium",
        source: "Cyber Square AI Teacher Tool Documentation"
      }
    ],

    // Differentiation from MYST
    differentiation: [
      {
        pillar: "Core Services",
        competitor: "Textbook publishing + browser coding lab + basic robotics + AI teacher tools.",
        myst: "Comprehensive Autonomous AI Agents, GenAI engineering, and accredited institutional curricula."
      },
      {
        pillar: "Technology Stack",
        competitor: "Scratch, block coding, basic Python, PictoBlox, Micro:bit, HTML/CSS.",
        myst: "Autonomous AI Agents, PyTorch, modern web architectures, and production cloud sandboxes."
      },
      {
        pillar: "Target Customers",
        competitor: "Mass K-12 school textbook adoptions (Kindergarten to Grade 10).",
        myst: "Premium private CBSE/ICSE schools, engineering colleges, and career transitioners."
      },
      {
        pillar: "Delivery Model",
        competitor: "Annual textbook bundle + cloud lab + automated lab exams.",
        myst: "Year-long accredited add-ons, continuous project portfolios, and verified GitHub credentials."
      },
      {
        pillar: "Unique Selling Proposition",
        competitor: "Turnkey school computer science textbook & teacher workload reduction suite.",
        myst: "Cutting-edge artificial intelligence, verified real-world code output, and elite corporate readiness."
      }
    ],

    // Evidence vs AI-Generated Assessment
    verifiedFacts: [
      "Founded in 2014 by N.P. Haris; headquarters at HiLITE Business Park, Kozhikode with UAE office in Sharjah Publishing City.",
      "Over 1,000 schools partnered, 200,000+ students reached, 3,500+ teachers trained across India, UAE, UK, and Canada.",
      "Browser-based AI Cloud Lab with zero local installation supporting Python, Scratch, JavaScript, HTML, SQL.",
      "Smart AI Teacher Tools for automatic lesson plans, question papers, and code evaluations.",
      "Aligned with NEP 2020, CBSE, ICSE, Cambridge, and UAE MOE frameworks."
    ],
    aiAssessments: [
      "Heavy reliance on physical textbook sales makes rapid curriculum updates to cutting-edge GenAI/LLM topics slower than pure software platforms.",
      "Strong brand loyalty among school principals due to teacher workload reduction toolkits.",
      "High school students outgrow basic block/Python syntax by Grade 9, creating an opening for MYST's advanced engineering track."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://cybersquare.org/",
      "https://cybersquare.pro/",
      "https://cybersquare.org/cloud-lab",
      "https://cybersquare.org/ai-teacher-tools"
    ]
  },
  {
    competitorId: "org-rotech-01",
    competitorName: "Rotech",
    primarySector: "Schools, Colleges & Corporate Training",
    strategicArchetype: "Turnkey School AI & STEAM Lab Provider (AI Tute Framework)",
    marketPresence: "1st Floor, Onyx Building, Chevayoor, Kozhikode (HQ), Malappuram, Wayanad, Kannur",
    positioningSummary: "Positions as a localized, hands-on STEAM and AI education provider recognized by Kerala Startup Mission, deploying the AI Tute three-pillar curriculum (Technology, Creativity, Business) with turnkey robotics labs, textbooks, and teacher portals.",
    targetAudience: "Private CBSE & ICSE school managements, computer science educators, K-12 students (Grades 1–12), college technical students, and corporate teams.",
    pricingTier: "Estimated Institutional School Lab Setup & Annual Student Seat Licensing (~₹1,200 – ₹3,200/student/year).",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-rot-01",
        title: "Autonomous AI Agents vs Basic Microcontroller & Syntax Coding",
        type: "Product Depth Deficit",
        description: "Rotech's school curriculum relies primarily on basic block coding, introductory Python, and elementary Arduino/ESP32 sensor wiring. They completely lack production-grade Autonomous AI Agents, multi-agent frameworks, LLM engineering, and real-world software deployments, which is MYST's core competitive advantage.",
        potentialImpact: "High",
        source: "AI Tute Platform Curriculum Catalog (aitutelearning.com)"
      },
      {
        id: "opp-rot-02",
        title: "Verified Software Engineering Portfolios vs Physical Kit Demos",
        type: "Outcome Quality Gap",
        description: "While Rotech provides kit-based hardware demos that often remain static after workshops, MYST enables students to build live web applications, production AI assistants, and verified GitHub engineering portfolios that provide tangible admissions advantages for premier global universities.",
        potentialImpact: "High",
        source: "K-12 School STEAM Competition Feedback"
      },
      {
        id: "opp-rot-03",
        title: "Statewide & GCC Enterprise Scale vs Local Regional Footprint",
        type: "Geographic Expansion Opportunity",
        description: "Rotech's physical footprint is concentrated largely within Kozhikode and Northern Kerala. MYST possesses the infrastructure and positioning to capture high-value Tier-1 private institutions across Central Kerala, South Kerala, and the GCC diaspora.",
        potentialImpact: "Medium",
        source: "Regional EdTech Operational Footprint Analysis"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-rot-01",
        title: "Hyper-Local Kozhikode Grassroots Relationships & Proximity",
        type: "Regional Relationship Moat",
        description: "Headquartered in Chevayoor, Kozhikode since 2017, Rotech maintains deep direct relationships with local CBSE school principals and school management committees across the Kozhikode and Malappuram districts.",
        severity: "High",
        source: "Kozhikode District Private School Network Disclosures"
      },
      {
        id: "thr-rot-02",
        title: "Turnkey Physical Hardware Robolabs (Arduino, ESP32, 3D Printing)",
        type: "Tangible Lab Moat",
        description: "Schools frequently seek visible, physical maker spaces with tangible electronics, breadboards, and robotics hardware to showcase to prospective parents during admissions. Rotech's turnkey hardware lab packages fulfill this visual demand directly.",
        severity: "Medium",
        source: "Rotech School Robotics Lab Infrastructure Specifications"
      },
      {
        id: "thr-rot-03",
        title: "Holistic Three-Pillar AI Tute Framework (Tech + Creativity + Business)",
        type: "Curriculum Breadth Moat",
        description: "By integrating UI/UX design in Figma, digital media, and youth entrepreneurship alongside coding, AI Tute appeals to progressive school boards seeking multidisciplinary STEAM programs.",
        severity: "Medium",
        source: "AI Tute Learning Platform Architecture (aitutelearning.com)"
      }
    ],

    // Differentiation from MYST
    differentiation: [
      {
        pillar: "Core Technology Focus",
        competitor: "Introductory block/Python coding, basic Arduino/ESP32 hardware kits, and introductory design.",
        myst: "Autonomous AI Agents, multi-agent LLM systems, full-stack software development, and cloud-native computing."
      },
      {
        pillar: "Student Deliverables",
        competitor: "Breadboard sensor circuits, toy robot prototypes, and school-level certificates.",
        myst: "Verifiable production software applications, live GitHub repositories, and accredited software engineering credentials."
      },
      {
        pillar: "Curricular Sophistication",
        competitor: "Standardized K-12 school curriculum bundled with physical kits.",
        myst: "Elite software engineering studio cohorts, frontier generative AI apprenticeships, and enterprise-grade code sandboxes."
      },
      {
        pillar: "Institutional Footprint",
        competitor: "Regional North Kerala concentration (Kozhikode, Malappuram, Wayanad).",
        myst: "Scalable pan-Kerala and international institutional reach with premium tier positioning."
      }
    ],

    keyStrengths: [
      "Physical presence in Kozhikode since 2017 with Kerala Startup Mission (KSUM) recognition.",
      "AI Tute smart learning platform integrating LMS, textbooks, and hardware component kits.",
      "Comprehensive three-pillar curriculum covering Technology, Creativity (Figma/3D design), and Business/Entrepreneurship.",
      "Active teacher enablement masterclasses supporting school computer science staff."
    ],
    aiAssessments: [
      "Heavy reliance on basic hobbyist microcontrollers and introductory coding makes their offering vulnerable to MYST's superior Autonomous AI Agent engineering modules.",
      "Strong grassroots rapport in Calicut gives them resilience in local private CBSE schools.",
      "Collegiate and corporate offerings provide an existing multi-vertical footprint across education and enterprise."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://www.rotechedu.com/",
      "https://aitutelearning.com/",
      "https://startupmission.in/"
    ]
  },
  {
    competitorId: "org-evolve-01",
    competitorName: "Evolve Robotics",
    primarySector: "Schools & Robotics Education",
    strategicArchetype: "Turnkey School Robotics & AI Lab Provider (Evolve Infinity Lab)",
    marketPresence: "Kozhikode & Kochi, Kerala",
    positioningSummary: "Positions as a turnkey robotics and technology education partner for K-12 schools, promoting its 'Evolve Infinity Lab' model under a four-year MOU with integrated equipment, kits, broad multi-disciplinary curriculum (Drones, IoT, AI, Python), and deputed trainer support.",
    targetAudience: "K-12 School Management, Principals, Science/CS Teachers, and Students (Classes 1–12).",
    pricingTier: "Four-Year Institutional MOU Framework (Commercial fees not publicly disclosed on website).",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-evo-01",
        title: "Verified School Partner Credibility Gap",
        type: "Evidence & Verification Advantage",
        description: "While Evolve Robotics advertises a comprehensive 4-year MOU Infinity Lab model, specific partner schools in Kozhikode and across Kerala remain not independently verified. MYST can leverage fully transparent, verifiable institutional partnerships and evidence-backed case studies to win school leadership trust.",
        potentialImpact: "High",
        source: "Evolve Robotics Official Disclosures (School partnerships: Not independently verified)"
      },
      {
        id: "opp-evo-02",
        title: "Autonomous AI Agents vs Generic Broad Hardware Topics",
        type: "Technological Specialization",
        description: "Evolve Robotics spreads its curriculum across 8+ diverse topics (Drones, IoT, Robotics, Game Dev, App Dev, Python, AI, Data Science), resulting in introductory surface-level breadth. MYST specializes deeply in production Autonomous AI Agents, multi-agent frameworks, LLM engineering, and deployable software applications.",
        potentialImpact: "High",
        source: "Evolve Infinity Lab Curriculum Catalog (evolveroboticsindia.com/infinity-lab)"
      },
      {
        id: "opp-evo-03",
        title: "Flexible Engagement Models vs Rigid Four-Year Lock-In",
        type: "Commercial Flexibility",
        description: "A mandatory four-year MOU creates high contractual friction and hesitation for school management committees reluctant to lock in long-term capital. MYST offers flexible academic year modules, semester cohorts, and modular AI studio add-ons.",
        potentialImpact: "Medium",
        source: "Evolve Infinity Lab Four-Year MOU Specifications"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-evo-01",
        title: "All-in-One Turnkey Lab Convenience",
        type: "Operational Convenience Moat",
        description: "By bundling physical lab installation, equipment, kits, curriculum, and deputed on-campus trainers into a single package, Evolve Robotics removes operational friction for non-technical school principals seeking a ready-made lab.",
        severity: "High",
        source: "Evolve Robotics Infinity Lab Delivery Model"
      },
      {
        id: "thr-evo-02",
        title: "Attractive Buzzword Curricular Breadth (Drones + IoT + AI)",
        type: "Marketing Appeal Moat",
        description: "Marketing cutting-edge buzzwords like Drone Technology, IoT, and Game Development appeals strongly to school admission brochures and prospective parents during school open houses.",
        severity: "Medium",
        source: "Evolve Robotics Programme Marketing Disclosures"
      },
      {
        id: "thr-evo-03",
        title: "Four-Year MOU Customer Retention Lock-In",
        type: "Contractual Lock-In Moat",
        description: "If a school enters a 4-year institutional MOU, it locks out competing technology education vendors for nearly half a decade.",
        severity: "Medium",
        source: "Evolve Infinity Lab Partnership Agreement Guidelines"
      }
    ],

    // Differentiation from MYST
    differentiation: [
      {
        pillar: "Institutional Verification",
        competitor: "Services advertised online; Kozhikode school partnerships not independently verified.",
        myst: "Strictly verified institutional engagements, published evidence, and verifiable student outcomes."
      },
      {
        pillar: "Curricular Philosophy",
        competitor: "Broad generalist buffet (Robotics, Drones, IoT, Game Dev, App Dev, Data Science).",
        myst: "Deep frontier engineering: Autonomous AI Agents, multi-agent LLM systems, full-stack software development."
      },
      {
        pillar: "Student Output",
        competitor: "Lab kit assembly, introductory code snippets, and STEM hobbyist projects.",
        myst: "Production web applications, verified GitHub software engineering portfolios, and university admission advantages."
      },
      {
        pillar: "Partnership Framework",
        competitor: "Rigid four-year institutional MOU with turnkey hardware installation.",
        myst: "Agile institutional partnerships with high software updates and zero redundant hardware overheads."
      }
    ],

    keyStrengths: [
      "Evolve Infinity Lab offers turnkey physical lab installation and all-in-one equipment/kits.",
      "Extensive advertised curriculum covering Robotics, AI, Python, IoT, Data Science, Drones, App & Game Dev.",
      "Four-year MOU model structured for continuous multi-year student progression.",
      "Deputed on-campus trainer deployment and teacher enablement sessions."
    ],
    aiAssessments: [
      "Lack of verified partner schools in Kozhikode presents a major credibility challenge against entrenched providers like Cyber Square and De Lead.",
      "Broad curriculum breadth may dilute learning depth unless supported by highly qualified on-campus instructors.",
      "Four-year lock-in creates high barrier to entry for cautious school boards."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://www.evolveroboticsindia.com/",
      "https://www.evolveroboticsindia.com/infinity-lab"
    ]
  },
  {
    competitorId: "org-isq-01",
    competitorName: "ISQ Mind School",
    primarySector: "Schools & Student Personal Development",
    strategicArchetype: "Student Emotional Wellbeing & In-School Mentoring Provider",
    marketPresence: "HiLITE Business Park Kozhikode (HQ), Kerala",
    positioningSummary: "Positions as a specialized emotional wellbeing, life-skills, and mental resilience partner for schools, delivering weekly one-on-one student mentoring for Classes 5–10, interactive digital app tools, and parental involvement.",
    targetAudience: "School students (Classes 5–10 / ages 10–15), School Management, Academic Counselors, and Parents.",
    pricingTier: "School Retainer / Institutional Module Model (Not Publicly Disclosed).",

    // Opportunities for MYST
    opportunities: [
      {
        id: "opp-isq-01",
        title: "Complete Absence of Technical, AI & Software Engineering Depth",
        type: "Curricular Domain Deficit",
        description: "ISQ Mind School focuses exclusively on soft skills, emotional wellbeing, and counseling. They completely lack technical education, coding, Autonomous AI Agents, or engineering modules. MYST provides the technical software engineering frontier that complements or supersedes basic counseling modules.",
        potentialImpact: "High",
        source: "ISQ Mind School Official Service Portfolio (isqmindschool.com)"
      },
      {
        id: "opp-isq-02",
        title: "Technical AI Building as an Agency and Confidence Builder",
        type: "Pedagogical Integration",
        description: "While ISQ Mind School approaches confidence through reflective psychological talks, MYST builds student self-efficacy and resilience by empowering them to actually build and deploy working AI software and publish real apps, creating tangible self-worth.",
        potentialImpact: "High",
        source: "MYST Experiential Learning Framework"
      },
      {
        id: "opp-isq-03",
        title: "Unverified School Partnership Vulnerability",
        type: "Institutional Credibility Advantage",
        description: "Actual school implementations and named school partners for ISQ Mind School remain unverified. MYST can showcase proven institutional credibility, verified MoUs, and published evidence.",
        potentialImpact: "Medium",
        source: "ISQ Mind School Verification Audit"
      }
    ],

    // Threats to MYST
    threats: [
      {
        id: "thr-isq-01",
        title: "Rising Parental & Institutional Demand for Adolescent Mental Health",
        type: "Market Trend Threat",
        description: "Schools face growing pressure from parents and education boards to address student stress, mobile addiction, and emotional wellbeing, potentially diverting extracurricular school budgets toward counseling programs like ISQ.",
        severity: "High",
        source: "Adolescent Mental Health in Kerala Schools Research"
      },
      {
        id: "thr-isq-02",
        title: "HiLITE Business Park Co-Location & Proximity",
        type: "Local Ecosystem Moat",
        description: "Co-located at HiLITE Business Park Kozhikode alongside prominent EdTech and corporate offices, giving them convenient regional access to private school managements.",
        severity: "Medium",
        source: "ISQ Mind School Corporate Address"
      },
      {
        id: "thr-isq-03",
        title: "Integrated Mobile App for Continuous Student Engagement",
        type: "Product Stickiness Moat",
        description: "The ISQ Mind School app provides daily reflective tasks, mood check-ins, and direct parental feedback loops, creating consistent student and parent engagement outside the classroom.",
        severity: "Medium",
        source: "ISQ Mind School Mobile Platform"
      }
    ],

    // Differentiation from MYST
    differentiation: [
      {
        pillar: "Primary Educational Focus",
        competitor: "Adolescent emotional wellbeing, stress management, interpersonal communication, and life-skills mentoring.",
        myst: "Autonomous AI Agents, frontier software engineering, full-stack application development, and computational logic."
      },
      {
        pillar: "Skill Category",
        competitor: "Soft Skills & Personal Development (Psychological & Emotional Growth).",
        myst: "Technical Skills & Frontier Engineering (Deep Tech, AI & Software Architecture)."
      },
      {
        pillar: "Delivery Medium",
        competitor: "One-on-one counseling discussions + mobile habit reflection app.",
        myst: "Interactive code sandboxes, live software deployments, and GitHub portfolio creation."
      },
      {
        pillar: "Target Outcomes",
        competitor: "Emotional regulation, confidence enhancement, and social conflict resolution.",
        myst: "Deployable software products, AI agents, and credentialed tech portfolios for university admissions."
      }
    ],

    keyStrengths: [
      "Addresses the critical, high-demand area of student mental health and emotional resilience in Classes 5–10.",
      "Blended approach combining in-school weekly mentoring with a dedicated mobile application.",
      "Strategic headquarters in HiLITE Business Park, Kozhikode.",
      "Involves parents actively through progress reports and home alignment exercises."
    ],
    aiAssessments: [
      "Occupies a purely non-technical niche (Soft Skills & Personal Development), meaning it does not compete on software or STEM but competes for school timetable hours and student activity budgets.",
      "Lack of verified school partnerships presents an opportunity for MYST to emphasize transparency and verifiable outcomes.",
      "Potential partner opportunity: MYST could theoretically integrate soft-skills confidence into its engineering demo days."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://isqmindschool.com/"
    ]
  },
  {
    competitorId: "org-naturenurture-01",
    competitorName: "NatureNurture",
    primarySector: "Schools (Turnkey K-12 Curriculum, Makerspaces & Teacher CPD)",
    strategicArchetype: "National Turnkey K-12 Curriculum & Experiential Makerspace Ecosystem",
    marketPresence: "New Delhi (HQ), Pan-India (350+ to 500+ Schools), Kozhikode & Kerala (Advertised Service Coverage)",
    positioningSummary: "Positions as a full-stack educational transformation partner offering NEP 2020 board-aligned curricula, turnkey on-campus Makerspaces and STEAM labs, continuous teacher professional development, and digital LMS classrooms.",
    targetAudience: "K-12 School Trusts, Edu-Entrepreneurs, School Founders, Principals, Curriculum Coordinators, STEM/Science Teachers, and Students from Early Childhood to Grade 10/12.",
    pricingTier: "Institutional B2B Retainer / Licensing Model (Tailored per institution; Not Publicly Disclosed).",

    // Opportunities for MYST / Edge
    opportunities: [
      {
        id: "opp-nn-01",
        title: "Frontier AI & Autonomous Agent Specialization Advantage",
        type: "Curricular Technical Depth",
        description: "NatureNurture's curriculum is broad, traditional, and textbook-centric, with introductory robotics and basic maker tools. Edge delivers cutting-edge Autonomous AI Agents, modern LLM prompting, and practical software engineering that NatureNurture does not offer.",
        potentialImpact: "High",
        source: "NatureNurture Makerspace & Curriculum Portfolios"
      },
      {
        id: "opp-nn-02",
        title: "Unverified Local School Footprint in Kozhikode & Kerala",
        type: "Local Market Exploitation",
        description: "While NatureNurture operates regional landing pages for Kozhikode and Kerala, it has zero publicly confirmed school partnerships in Malabar. Edge can establish deep grassroots credibility with local school managements in Kozhikode.",
        potentialImpact: "High",
        source: "NatureNurture Regional Verification Audit"
      },
      {
        id: "opp-nn-03",
        title: "Agile Modular Integration vs Heavy Turnkey Curriculum Lock-in",
        type: "Commercial Flexibility Advantage",
        description: "NatureNurture typically seeks full-school textbook and curriculum adoption, which carries high switching friction for established schools. Edge offers lightweight, high-impact AI/tech add-on modules and labs without forcing schools to discard their existing textbooks.",
        potentialImpact: "High",
        source: "Edge School Partnership Strategy"
      }
    ],

    // Threats to MYST / Edge
    threats: [
      {
        id: "thr-nn-01",
        title: "Massive Institutional Scale & National Brand Pedigree",
        type: "Incumbent Brand Threat",
        description: "With 350+ to 500+ partner schools nationwide, proven CBSE/ICSE alignment, and strong founder credentials (Oxford & Harvard executive alumni), NatureNurture possesses formidable institutional trust among corporate school chains.",
        severity: "High",
        source: "NatureNurture Corporate Filings & Media Profiles"
      },
      {
        id: "thr-nn-02",
        title: "Full-Stack Turnkey Value Proposition for New Schools",
        type: "Turnkey Package Moat",
        description: "For new or greenfield school startups, NatureNurture provides everything from interior lab design, furniture, and books to teacher hiring and LMS software, locking out single-subject vendors.",
        severity: "Medium",
        source: "NatureNurture School Solutions Overview"
      },
      {
        id: "thr-nn-03",
        title: "Comprehensive Teacher Professional Development (CPD)",
        type: "Teacher Enablement Moat",
        description: "Their strong emphasis on teacher training, classroom observations, and leadership coaching appeals deeply to principals seeking school accreditation improvements.",
        severity: "Medium",
        source: "NatureNurture Teacher Training Portfolios"
      }
    ],

    // Differentiation from Edge
    differentiation: [
      {
        pillar: "Primary Educational Focus",
        competitor: "Holistic K-12 integrated textbook curriculum, general STEM makerspaces, and early childhood to secondary academic schooling.",
        myst: "Specialized high-tech software engineering, Autonomous AI Agents, modern programming, and real-world project portfolios."
      },
      {
        pillar: "School Adoption Model",
        competitor: "High-commitment full turnkey curriculum replacement, school interior lab design, and publisher textbook adoption.",
        myst: "Flexible, agile modular AI and STEM lab integrations that complement existing school curriculums with zero textbook friction."
      },
      {
        pillar: "Kozhikode Ground Presence",
        competitor: "Digital service marketing and SEO landing pages; no independently verified school partner campus in Kozhikode.",
        myst: "Active local Malabar presence, direct institutional engagements, and locally accessible student showcases."
      }
    ],

    // Strategic Insights & Battlecard Summary
    battlecardSummary: [
      "NatureNurture is an established national giant in holistic K-12 school education with 350+ to 500+ schools, combining textbooks, makerspaces, and teacher training.",
      "In Kozhikode and Kerala, its makerspace and edtech offerings are actively advertised online, but specific named school partnerships remain unverified.",
      "Edge should position itself as the nimble, frontier AI specialist that provides what NatureNurture's broad curriculum lacks: deep Autonomous AI Agents, modern coding stacks, and frictionless modular lab deployment."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://www.naturenurture.org/",
      "https://www.naturenurture.org/about-us",
      "https://www.naturenurture.org/makerspace",
      "https://www.naturenurture.org/school-company",
      "https://www.naturenurture.org/kozhikode/makerspace",
      "https://www.naturenurture.org/kerala/makerspace",
      "https://www.naturenurture.org/kozhikode/edutech-company",
      "https://www.naturenurture.org/contact"
    ]
  },
  {
    competitorId: "org-robuverse-01",
    competitorName: "Robuverse",
    primarySector: "Schools & Robotics R&D",
    strategicArchetype: "Turnkey Robotics & AI Labs, STEM Hardware & Humanoid R&D Provider",
    marketPresence: "Kattangal, Chathamangalam, Kozhikode (HQ near NIT Calicut), Kerala & South India",
    positioningSummary: "Positions as an authentic engineering-led robotics ecosystem providing turnkey K-12 Robotics & AI labs, open-standard microcontroller hardware (Arduino, ESP32, Raspberry Pi), 3D printing equipment, campus STEM Day expositions, and humanoid robotics R&D (Torres).",
    targetAudience: "K-12 School Managements, Principals, Science Educators, STEM Club Coordinators, and Students (Classes 3–12).",
    pricingTier: "Modular Institutional Package Tiers (Tailored per lab setup; Not Publicly Disclosed).",

    // Opportunities for MYST / Edge
    opportunities: [
      {
        id: "opp-rbv-01",
        title: "Software & Cloud AI Depth vs Hardware-Centric Mechatronics",
        type: "Curricular Domain Differentiation",
        description: "Robuverse focuses overwhelmingly on physical robotics hardware, microcontrollers, breadboards, 3D printing, and combat arenas. Edge provides the higher-level Autonomous AI Agents, software engineering, modern web architectures, and full-stack computational thinking that Robuverse's mechatronics stack omits.",
        potentialImpact: "High",
        source: "Robuverse Technical Portfolio Analysis"
      },
      {
        id: "opp-rbv-02",
        title: "Daily Structured Curriculum vs Event/Exhibition Driven Engagement",
        type: "Partnership Model Opportunity",
        description: "A large portion of Robuverse's institutional visibility is driven by campus STEM Day expos and 1-2 day event sprints. Edge can win long-term recurring school contracts by embedding a 32-week accredited syllabus with continuous weekly periods, graded projects, and student portfolios.",
        potentialImpact: "High",
        source: "Edge School Partnership Strategy"
      },
      {
        id: "opp-rbv-03",
        title: "Unverified School Partner Client List Vulnerability",
        type: "Transparency & Credibility Advantage",
        description: "Robuverse does not publicly disclose named school partnerships or client school counts on its web portal. Edge can emphasize full transparent credentials, verified institutional MoUs, and documented student case studies in Kozhikode.",
        potentialImpact: "Medium",
        source: "Robuverse Verification Audit"
      }
    ],

    // Threats to MYST / Edge
    threats: [
      {
        id: "thr-rbv-01",
        title: "Direct Physical Proximity in Kattangal / NIT Calicut Corridor",
        type: "Hyper-Local Moat",
        description: "Located right in Kattangal (Chathamangalam, Kozhikode), Robuverse is embedded in the NIT Calicut tech ecosystem, enabling fast on-ground response and rapid physical lab support to schools across Kozhikode district.",
        severity: "High",
        source: "Robuverse Headquarters Location"
      },
      {
        id: "thr-rbv-02",
        title: "High-Impact Visual Demonstration Assets (Torres Humanoid & Arenas)",
        type: "Marketing & Engagement Threat",
        description: "Their live humanoid robotics assets (Torres platform), bionic quadruped dogs, and combat robot arenas create immediate spectacle and excitement during school science fairs, capturing school management interest.",
        severity: "Medium",
        source: "Robuverse Event & Robot Fleet Portfolio"
      },
      {
        id: "thr-rbv-03",
        title: "In-House 3D Printing & Mechatronics Prototyping",
        type: "Fabrication Capability Moat",
        description: "Robuverse manufactures and prints custom robot chassis and hardware parts in-house, giving them lower bill-of-materials costs for physical STEM lab equipment setups.",
        severity: "Medium",
        source: "Robuverse Prototyping Services"
      }
    ],

    // Differentiation from Edge
    differentiation: [
      {
        pillar: "Primary Technology Focus",
        competitor: "Microcontrollers (Arduino, ESP32, Raspberry Pi), circuit wiring, robotics mechanics, 3D printing, and combat arenas.",
        myst: "Autonomous AI Agents, modern software engineering, generative AI prompting, full-stack web/app development, and algorithms."
      },
      {
        pillar: "Institutional Delivery Architecture",
        competitor: "Turnkey hardware room installation, maker lab benches, and campus STEM Day expos / exhibitions.",
        myst: "Lightweight software sandboxes, structured academic timetabling, and portfolio-driven student coding credentials."
      },
      {
        pillar: "Hardware Dependency",
        competitor: "High hardware overhead requiring physical components, ongoing workbench maintenance, and tool safety oversight.",
        myst: "Cloud-native computational environments and deployable software projects with zero physical equipment failure points."
      }
    ],

    // Strategic Insights & Battlecard Summary
    battlecardSummary: [
      "Robuverse is an authentic engineering and robotics R&D company based right in Kattangal, Kozhikode, providing turnkey K-12 robotics labs and live tech expos.",
      "While strong in physical hardware, mechatronics, and visual spectacles (humanoids and combat arenas), it lacks depth in full-stack software development and Autonomous AI Agents.",
      "Edge should position as the premier software and AI brain that empowers students to build real intelligent systems, presenting a modern alternative or software complement to pure hardware robotics labs."
    ],
    lastUpdated: "2026-03-24",
    sources: [
      "https://www.robuverse.com/",
      "https://www.robuverse.com/services",
      "https://www.robuverse.com/solutions",
      "https://www.robuverse.com/contact"
    ]
  },
  {
    competitorId: "org-stemxpert-01",
    competitorName: "STEM-Xpert",
    primarySector: "Schools & STEM Lab Infrastructure",
    strategicArchetype: "STEM-as-a-Service, Composite Skill Labs & Crinnoboard AIoT Provider",
    marketPresence: "KINFRA Advanced Technology Park, Ramanattukara, Kozhikode (Asia HQ), Pan-India & Middle East (Sharjah, Doha)",
    positioningSummary: "Positions as a comprehensive 'STEM-as-a-Service' institutional partner for K-12 schools, integrating turnkey Composite Skill Labs (Kaushal Bodh), AIoT labs, proprietary Crinnoboard development hardware, Grade 1–12 curricula, and teacher upskilling (AI for Teachers).",
    targetAudience: "CBSE & ICSE School Managements, Principals, STEM Coordinators, and Students (Grades 1–12).",
    pricingTier: "Modular Institutional Package Tiers (B2B quotes provided upon institutional consultation; Not Publicly Disclosed).",

    // Opportunities for MYST / Edge
    opportunities: [
      {
        id: "opp-sx-01",
        title: "Autonomous AI Agents & GenAI Engineering vs Physical Electronics",
        type: "Curricular Domain Differentiation",
        description: "STEM-Xpert's technical curriculum centers on basic electronics, microcontroller circuits (Crinnoboard/Arduino), and introductory Python. Edge specializes in cutting-edge Autonomous AI Agents, LLM prompt engineering, modern web architectures, and full-stack software development that hardware tinkering kits do not deliver.",
        potentialImpact: "High",
        source: "STEM-Xpert Curriculum & Laboratory Analysis"
      },
      {
        id: "opp-sx-02",
        title: "Zero Hardware CapEx Barrier vs Expensive Lab Installation & Maintenance",
        type: "Commercial Model Opportunity",
        description: "STEM-Xpert's model requires dedicated physical room space, workbench furniture, and costly hardware kits subject to component breakage and obsolescence. Edge operates with zero hardware CapEx inside existing school computer labs, reducing institutional financial risk.",
        potentialImpact: "High",
        source: "Edge Commercial Strategy"
      },
      {
        id: "opp-sx-03",
        title: "Verified Kozhikode School Track Record Transparency",
        type: "Credibility Advantage",
        description: "While STEM-Xpert maintains an Asia corporate office at KINFRA Ramanattukara, its specific partner school names across Kozhikode district remain undisclosed on public portals. Edge can differentiate through transparent institutional MoUs, local school references, and published student achievements.",
        potentialImpact: "Medium",
        source: "STEM-Xpert Institutional Verification Audit"
      }
    ],

    // Threats to MYST / Edge
    threats: [
      {
        id: "thr-sx-01",
        title: "All-in-One 'STEM-as-a-Service' Institutional Bundle",
        type: "Convenience Moat",
        description: "STEM-Xpert's bundled approach—packaging lab equipment, syllabus, trainer supply, digital LMS, and teacher training under a single service agreement—appeals strongly to school principals who prefer dealing with a single vendor.",
        severity: "High",
        source: "STEM-Xpert Service Portal (stem-as-a-service)"
      },
      {
        id: "thr-sx-02",
        title: "CBSE Composite Skill Lab (Kaushal Bodh) Regulatory Alignment",
        type: "Institutional Alignment",
        description: "By specifically branding lab offerings around the CBSE Kaushal Bodh directive and NEP 2020 skill recommendations, STEM-Xpert creates high regulatory relevance for CBSE schools seeking compliance.",
        severity: "Medium",
        source: "CBSE Skill Education Frameworks"
      },
      {
        id: "thr-sx-03",
        title: "Proprietary Hardware Lock-In (Crinnoboard)",
        type: "Platform Moat",
        description: "Schools that adopt STEM-Xpert's proprietary Crinnoboard development ecosystem face high switching costs due to tailored lesson plans and board-specific wiring routines.",
        severity: "Medium",
        source: "STEM-Xpert Product Portfolio"
      }
    ],

    // Head-to-Head Differentiation Matrix
    differentiation: [
      {
        pillar: "Core Educational Focus",
        competitor: "Physical STEM tinkering labs, Crinnoboard circuits, beginner robotics, and basic Python.",
        myst: "Advanced Autonomous AI Agents, modern software engineering, web architectures, and full-stack computational thinking."
      },
      {
        pillar: "Infrastructure Requirement",
        competitor: "Requires dedicated lab room, electronics workbenches, soldering gear, and physical hardware kits.",
        myst: "Zero hardware CapEx; runs directly inside existing school computer labs with cloud development environments."
      },
      {
        pillar: "Institutional Value Proposition",
        competitor: "Turnkey CBSE Kaushal Bodh lab compliance, ATL maintenance, and all-in-one vendor bundling.",
        myst: "Elite future-ready tech leadership, deployable portfolio projects, and direct pathways to top university admissions."
      },
      {
        pillar: "School Partnership Verification",
        competitor: "Specific partner school names across Kozhikode and Kerala remain undisclosed on public portals.",
        myst: "Transparent institutional MoUs, verified campus deployments, and documented student case studies."
      }
    ],

    // Strategic Insights & Battlecard Summary
    battlecardSummary: [
      "STEM-Xpert operates an ambitious STEM-as-a-Service model from KINFRA Advanced Technology Park in Ramanattukara, Kozhikode, targeting CBSE schools with Composite Skill Labs and proprietary Crinnoboard hardware.",
      "While strong in lab bundling and regulatory NEP/CBSE positioning, it relies heavily on physical hardware kits that create high maintenance overhead and inventory headaches for schools.",
      "Edge should position as the software intelligence partner—requiring zero hardware CapEx, providing elite Autonomous AI Agent curricula, and avoiding physical hardware maintenance burdens."
    ],
    lastUpdated: "2026-03-25",
    sources: [
      "https://stem-xpert.com/",
      "https://stem-xpert.com/stem-as-a-service",
      "https://stem-xpert.com/stem-facilitator",
      "https://stem-xpert.com/contact-us"
    ]
  },
  {
    competitorId: "org-qfactory-01",
    competitorName: "Q Factory",
    primarySector: "Schools & Student Development",
    strategicArchetype: "Student Development, Knowledge Enhancement & Quizzing Pedagogy Provider",
    marketPresence: "Kozhikode (HQ) & Statewide Kerala Quizzing Circuit",
    positioningSummary: "Positions as Kerala's premier professional knowledge-services and quizzing firm, delivering high-energy cognitive inquiry, critical thinking workshops (Break the Shell, Quiz Chemistry), flagship student mentoring camps (Q Positive), and school quiz club management.",
    targetAudience: "School Managements, Principals, Quiz Club Mentors, and Students (Classes 2–12).",
    pricingTier: "Modular Institutional Engagement Packages (Per-workshop fee or annual quiz club retainer; Not Publicly Disclosed).",

    // Opportunities for MYST / Edge
    opportunities: [
      {
        id: "opp-qf-01",
        title: "Complementary Cognitive Partnership & Student Pipeline",
        type: "Co-Existence & Collaboration Opportunity",
        description: "Q Factory cultivates general awareness, lateral deduction, and critical thinking through competitive quizzing. Edge can engage school quiz club cohorts—who are already high-aptitude critical thinkers—and transition them into advanced Autonomous AI Agents, algorithmic problem-solving, and computational engineering.",
        potentialImpact: "High",
        source: "Q Factory Educational Portfolio Analysis"
      },
      {
        id: "opp-qf-02",
        title: "AI-Powered Quizzing & Interactive Learning Platform Gaps",
        type: "Technology Gap",
        description: "Q Factory primarily operates offline in-person stage quizzes, buzzer mechanics, and printed question banks. Edge can position modern AI-generated adaptive quizzing, interactive knowledge agents, and cloud platforms as the technological evolution of traditional quizzing.",
        potentialImpact: "Medium",
        source: "Edge Digital Learning Strategy"
      },
      {
        id: "opp-qf-03",
        title: "Full Academic Year Integrated Curriculum vs Periodic Workshops",
        type: "Curricular Model Advantage",
        description: "Q Factory's school engagements primarily take the form of periodic camps (Q Positive) or club meetings. Edge provides schools with an accredited 32-week core technology syllabus integrated directly into weekly academic timetables.",
        potentialImpact: "High",
        source: "Edge School Curriculum Architecture"
      }
    ],

    // Threats to MYST / Edge
    threats: [
      {
        id: "thr-qf-01",
        title: "Deep Entrenchment & Goodwill in Prestigious Kozhikode Schools",
        type: "Relationship Moat",
        description: "With roots in Quiz Kerala and decades of veteran quizmaster goodwill, Q Factory holds trusted access to top private school principals across Kozhikode (e.g., Sree Gokulam Public School, Bhavan's School Chevayur).",
        severity: "Medium",
        source: "Kozhikode School Quizzing Circuit Records"
      },
      {
        id: "thr-qf-02",
        title: "High Sensory & Public Spectacle Appeal",
        type: "Brand Visibility Moat",
        description: "Live stage quiz tournaments with buzzers, cheering audiences, and inter-school trophies create high immediate visibility and parent enthusiasm that conventional classroom subjects struggle to match.",
        severity: "Medium",
        source: "Inter-School Tournament Reports"
      }
    ],

    // Head-to-Head Differentiation Matrix
    differentiation: [
      {
        pillar: "Core Educational Focus",
        competitor: "General knowledge, lateral trivia, observation, and competitive stage quizzing.",
        myst: "Autonomous AI Agents, production software engineering, web architectures, and full-stack computing."
      },
      {
        pillar: "Delivery Architecture",
        competitor: "Stage quiz tournaments, multi-day camps (Q Positive), and periodic school quiz club sessions.",
        myst: "Weekly timetabled academic periods, cloud coding sandbox, graded portfolios, and terminal assessments."
      },
      {
        pillar: "Institutional Value Proposition",
        competitor: "Cognitive agility, public speaking confidence, and competitive exam readiness.",
        myst: "Future-ready technology leadership, deployable software applications, and top university admissions portfolios."
      },
      {
        pillar: "Competitive Relationship",
        competitor: "Complementary knowledge & cognitive partner (non-technical).",
        myst: "Flagship technical & AI curriculum provider."
      }
    ],

    // Strategic Insights & Battlecard Summary
    battlecardSummary: [
      "Q Factory is a specialized knowledge-services and quizzing organisation in Kozhikode with documented partnerships at Sree Gokulam Public School and Bhavan's School Chevayur.",
      "It does not compete in robotics, coding, or AI training; rather, it develops student cognitive agility, observation, and lateral thinking through gamified quizzing.",
      "Edge should treat Q Factory as a complementary knowledge provider and explore co-branding or engaging their quiz club students as ideal candidates for advanced AI Agent cohorts."
    ],
    lastUpdated: "2026-03-25",
    sources: [
      "https://qfactory.in/",
      "https://qfactory.in/training/",
      "https://qfactory.in/quizzes/"
    ]
  },
  {
    orgId: "org-youngminds-01",
    orgName: "YoungMinds.app (YM Innovations)",
    archetype: "Student Innovation, Entrepreneurship & STEM Labs",
    tier: "Tier 2",
    threatLevel: "Moderate",
    threatScore: 68,
    marketShareEstimate: "Growing presence in student entrepreneurship and school maker spaces across Kerala",
    coreAdvantage: "Pioneer in blending K-12 STEM tinkering with startup venture creation, Design Thinking, and the YoungPreneurs Fest.",

    // Edge Strategic Advantages over YoungMinds
    mystAdvantages: [
      {
        title: "Deep Software Engineering & Autonomous Multi-Agent AI",
        description: "While YoungMinds focuses on broad ideation, pitch decks, and entry-level breadboard electronics, Edge provides rigorous, full-stack software development, generative AI orchestration, and production-grade engineering without requiring schools to purchase expensive physical kits.",
        category: "Curriculum Depth"
      },
      {
        title: "Zero Hardware CapEx & Immediate Cloud Scalability",
        description: "YoungMinds' TinkerPark relies on physical hardware lab setups and recurring component supplies. Edge operates on pure cloud IDEs and accessible browser environments, eliminating hardware depreciation, breakage costs, and lab maintenance friction for partner schools.",
        category: "Operational Efficiency"
      },
      {
        title: "Verified Industry Apprenticeship vs Pitch Competitions",
        description: "YoungMinds students build theoretical pitches and early prototypes for demo days. Edge students develop live, deployable production applications, open-source repositories, and verified engineering credentials evaluated by active industry tech leads.",
        category: "Outcome Rigour"
      }
    ],

    // Competitor Strengths
    competitorStrengths: [
      {
        title: "Strong Entrepreneurship & Pitch Storytelling Focus",
        description: "YoungMinds effectively demystifies venture creation, teaching children financial literacy, Business Model Canvas, and persuasive presentation skills that appeal strongly to progressive school principals and parents.",
        category: "Pedagogy"
      },
      {
        title: "KSUM Ecosystem Affiliation & High-Energy Fests",
        description: "Official incubation under Kerala Startup Mission (p6rdj) and the annual YoungPreneurs Fest give YoungMinds strong regional credibility and a vibrant community showcase for student ventures.",
        category: "Ecosystem"
      }
    ],

    // Vulnerabilities & Gaps
    vulnerabilities: [
      {
        title: "Unverified School Partner Client Names",
        description: "Although YoungMinds advertises institutional school programmes and IEH hubs, specific partner school names remain undisclosed on public portals, creating a verification gap during institutional procurement evaluations.",
        category: "Market Transparency"
      },
      {
        title: "Superficial Technical Depth in Coding & AI",
        description: "Because the curriculum divides limited hours across design thinking, business models, public speaking, and tinkering, technical depth in real programming and scalable AI architecture remains introductory.",
        category: "Technical Rigour"
      }
    ],

    // Strategic Threats
    threats: [
      {
        title: "Early Institutional Lock-in via School Entrepreneurship Hubs",
        description: "By pitching comprehensive Innovation & Entrepreneurship Hubs (IEH) to schools, YoungMinds can occupy school innovation committees and ATL lab allocations before technical AI providers enter.",
        severity: "Medium",
        source: "Institutional EdTech Landscape"
      }
    ],

    // Head-to-Head Differentiation Matrix
    differentiation: [
      {
        pillar: "Core Educational Focus",
        competitor: "Design Thinking, student venture pitches, business models, and introductory maker tinkering.",
        myst: "Autonomous multi-agent AI systems, full-stack software engineering, algorithmic logic, and production cloud code."
      },
      {
        pillar: "Delivery Architecture",
        competitor: "Physical TinkerPark maker spaces, B2C YoungPreneur.ai portal, and annual YoungPreneurs Fest.",
        myst: "Curricular timetabled computing periods, browser-native cloud IDEs, and project-based software sprints."
      },
      {
        pillar: "Institutional Value Proposition",
        competitor: "Youth entrepreneurial mindset, pitch confidence, and regional demo days.",
        myst: "Deep computational literacy, industry-grade developer portfolios, and Ivy-league/Tier-1 college readiness."
      },
      {
        pillar: "Competitive Relationship",
        competitor: "Direct competitor for school innovation lab mindshare; complementary in entrepreneurship vs deep software.",
        myst: "Premier AI & Computer Science academic partner."
      }
    ],

    // Strategic Insights & Battlecard Summary
    battlecardSummary: [
      "YoungMinds.app (YM Innovations Pvt Ltd) is an active Kozhikode EdTech company headquartered at HiLITE Business Park and incubated under Kerala Startup Mission.",
      "Their primary strength is positioning STEM as a springboard for entrepreneurship ('Tinker it -> Prototype it -> Startup it') and hosting high-profile student pitch showcases.",
      "Edge counter-positions by highlighting that sustainable tech startups require deep engineering substance rather than just pitch decks—offering schools real multi-agent AI engineering that empowers students to build actual working digital products."
    ],
    lastUpdated: "2026-03-25",
    sources: [
      "https://www.youngminds.app/",
      "https://startups.startupmission.in/startups/p6rdj",
      "https://in.linkedin.com/company/youngmindsapp"
    ]
  },
  {
    orgId: "org-ulspaceclub-01",
    orgName: "UL Space Club",
    archetype: "Space Science, Astronomy & ISRO Space Tutor",
    tier: "Tier 2",
    threatLevel: "Moderate",
    threatScore: 65,
    marketShareEstimate: "Dominant community brand in school space science and astronomy across Kozhikode and Malabar",
    coreAdvantage: "Official ISRO Space Tutor status, mentorship by former ISRO Directors, and non-profit backing from ULCCS Foundation.",

    // Edge Strategic Advantages over UL Space Club
    mystAdvantages: [
      {
        title: "Deep Software Engineering & Autonomous Multi-Agent AI",
        description: "While UL Space Club focuses primarily on observational astronomy, model rocketry, and physical science demonstrations, Edge delivers rigorous, full-stack software development, generative AI orchestration, and production-grade engineering without requiring schools to acquire optical hardware or launch sites.",
        category: "Curriculum Depth"
      },
      {
        title: "Structured Academic Timetable vs Event-Based Camps",
        description: "UL Space Club relies heavily on weekend stargazing nights, episodic vacation camps, and voluntary club sessions. Edge embeds directly into the school's weekly academic timetable with graded credit periods, project sprints, and continuous terminal assessments.",
        category: "Curricular Rigour"
      },
      {
        title: "Industry Software Apprenticeship & Production Codebases",
        description: "UL Space Club prepares students for science fairs and space startup simulations. Edge students build live, deployable production applications, open-source repositories, and verified engineering credentials evaluated by active industry tech leads.",
        category: "Career & College Readiness"
      }
    ],

    // Competitor Strengths
    competitorStrengths: [
      {
        title: "Official ISRO Space Tutor Accreditation & Veteran Mentorship",
        description: "Accredited by ISRO as a registered Space Tutor, guided by former ISRO Director E.K. Kutty and former Deputy Director K. Jayaram, granting unmatched institutional credibility and student access to national space initiatives (such as ISRO Yuvika).",
        category: "Institutional Prestige"
      },
      {
        title: "ULCCS Foundation Backing & High Community Goodwill",
        description: "Backed by the century-old Uralungal Labour Contract Co-operative Society (ULCCS) Foundation, enabling subsidized community reach, rural school demos, and government education department integration.",
        category: "Patronage & Reach"
      }
    ],

    // Vulnerabilities & Gaps
    vulnerabilities: [
      {
        title: "Absence of Core Software & Modern AI Curriculum",
        description: "UL Space Club's scope is strictly confined to space science, astronomy, and rocketry hardware; it lacks curriculum in modern full-stack web software, production databases, and autonomous multi-agent AI systems.",
        category: "Technical Breadth"
      },
      {
        title: "Voluntary Non-Profit Delivery Friction",
        description: "Because it functions as a non-profit voluntary initiative, delivering continuous multi-year progressive curricula across multiple grade levels simultaneously can be challenging compared to a dedicated institutional provider.",
        category: "Delivery Model"
      }
    ],

    // Strategic Threats
    threats: [
      {
        title: "High-Visibility Stargazing Camps Capturing School STEM Mindshare",
        description: "Night-sky telescope observation sessions and rocket launches generate massive excitement among parents and school management, potentially occupying the school's annual STEM budget and event calendar.",
        severity: "Medium",
        source: "Experiential School Events"
      }
    ],

    // Head-to-Head Differentiation Matrix
    differentiation: [
      {
        pillar: "Core Educational Focus",
        competitor: "Space sciences, observational astronomy, model rocketry, and ISRO mission science.",
        myst: "Autonomous multi-agent AI systems, full-stack software engineering, algorithmic logic, and cloud computing."
      },
      {
        pillar: "Delivery Architecture",
        competitor: "Mobile school telescope stargazing nights, Space Club @ Campus chapters, and holiday camps at UL CyberPark.",
        myst: "Curricular timetabled computing periods, browser-native cloud IDEs, and weekly project-based software sprints."
      },
      {
        pillar: "Institutional Value Proposition",
        competitor: "Scientific inquiry, cosmic curiosity, ISRO exposure, and peer science ambassador multiplier.",
        myst: "Deep computational literacy, industry-grade developer portfolios, and Ivy-league/Tier-1 CS admissions readiness."
      },
      {
        pillar: "Competitive Relationship",
        competitor: "Complementary STEM partner (space/physics vs software/AI) and peer collaborator for satellite dataset engineering.",
        myst: "Premier AI & Computer Science academic partner."
      }
    ],

    // Strategic Insights & Battlecard Summary
    battlecardSummary: [
      "UL Space Club is an esteemed non-profit space science and astronomy organisation in Kozhikode, backed by the ULCCS Foundation and registered as an ISRO Space Tutor.",
      "It commands exceptional community goodwill and leadership prestige through former ISRO Directors E.K. Kutty and K. Jayaram, operating outreach at schools like GHSS Karapparamba.",
      "Edge should position itself not as a direct rival to space astronomy, but as the premier technical software and AI intelligence partner—highlighting that modern space exploration and satellite data analysis require advanced software engineering and autonomous AI, areas where Edge is the unrivaled leader."
    ],
    lastUpdated: "2026-03-25",
    sources: [
      "https://ulspaceclub.org/",
      "https://ulspaceclub.org/programs/outreach-programs",
      "https://ulspaceclub.in/",
      "https://ulspaceclub.org/about"
    ]
  }
];

export const MARKET_TRENDS_DATA = [
  {
    id: "trend-01",
    title: "Mandatory AI & Computational Thinking in K-12 Curricula",
    category: "Changes in School Requirements",
    technologyFocus: "Artificial Intelligence, Block Coding & Python",
    timeline: "2024 – 2026 Academic Cycles",
    publicationDate: "2024-07-15",
    source: "CBSE Skill Education Circular Acad-12/2024 & NEP 2020 Guidelines",
    sourceUrl: "https://cbseacademic.nic.in/skill-education.html",
    verificationStatus: "Verified Policy Directive",
    description: "The Central Board of Secondary Education (CBSE) and National Education Policy (NEP 2020) have mandated Artificial Intelligence as a skill subject starting from Class 6. Schools across Kerala are actively seeking accredited partners to deliver structured 40-hour AI modules without burdening regular school IT staff.",
    keyDrivers: [
      "National Education Policy 2020 experiential learning mandates",
      "CBSE Subject Code 417 (AI for Class 9–10) and Subject Code 843 (AI for Class 11–12)",
      "Parental demand for early technological literacy beyond basic MS Office"
    ],
    schoolRequirementsImpact: "Schools must report active STEM/AI lab hours and certified teacher training to maintain high CBSE accreditation ratings.",
    impactOnMyst: "Primary growth engine. MYST can offer turn-key accredited AI curricula to private CBSE schools, providing student workbooks, software sandboxes, and teacher certification."
  },
  {
    id: "trend-02",
    title: "Rise of Autonomous AI Agents & Generative AI in School Education",
    category: "Emerging Technologies",
    technologyFocus: "Autonomous AI Agents, Prompt Engineering & Large Language Models",
    timeline: "Rapid Acceleration (2024–2025)",
    publicationDate: "2024-09-01",
    source: "Kerala Infrastructure and Technology for Education (KITE) GenAI Teacher Training Pilot",
    sourceUrl: "https://kite.kerala.gov.in/",
    verificationStatus: "Verified Industry Data",
    description: "Generative AI is shifting from a consumer curiosity to an institutional imperative. Following KITE's initiative in training 80,000 government school teachers in AI tools, schools require student-safe AI agents and educational bots that assist in research, coding, and mathematical reasoning.",
    keyDrivers: [
      "Widespread adoption of AI tools by high school students",
      "Demand for ethical AI governance, copyright awareness, and fact-checking pedagogy",
      "Transition from syntax memorization to prompt architecture and AI workflow design"
    ],
    schoolRequirementsImpact: "Institutions require clear ethical AI guidelines and sandboxed educational tools rather than unrestricted web LLMs.",
    impactOnMyst: "Huge differentiator. While competitors (StemX, De' Lead) are stuck in physical Arduino circuits, MYST can pioneer production-grade autonomous agent and prompt engineering masterclasses."
  },
  {
    id: "trend-03",
    title: "Corporate CSR Influx into Rural High School Robotics Labs",
    category: "Industry Demand",
    technologyFocus: "IoT Hardware, Arduino, Renewable Energy & Robotics Kits",
    timeline: "Ongoing 2023–2026",
    publicationDate: "2024-04-10",
    source: "Walkaroo Foundation Education CSR Disclosures & DIET Partnerships",
    sourceUrl: "https://walkaroofoundation.in/index.php/education/",
    verificationStatus: "Verified Corporate Report",
    description: "Leading corporate foundations (Walkaroo International Ltd, Aster DM Foundation, Faizal & Shabana Foundation) are allocating mandatory 2% CSR budgets into rural government school technology labs, creating subsidized programs like Walk2Lead across coastal and rural belts.",
    keyDrivers: [
      "Companies Act CSR mandates favoring STEM education in underprivileged taluks",
      "High visibility annual school robotics exhibitions for corporate brand enhancement",
      "District educational administration collaboration with non-profit trusts"
    ],
    schoolRequirementsImpact: "Government schools expect 100% subsidized equipment and zero student registration fees.",
    impactOnMyst: "MYST should avoid price competition in rural government school hardware grants; instead, position as the premium partner for CSR foundations requiring advanced software and monitoring dashboards."
  },
  {
    id: "trend-04",
    title: "Demand for Teacher AI Capacity Building & Pedagogical Certification",
    category: "New Education Programmes",
    technologyFocus: "GenAI for Educators, Lesson Automation & Digital Portfolios",
    timeline: "High Demand (2024–2025)",
    publicationDate: "2024-08-25",
    source: "District Institute of Education and Training (DIET) Kerala Teacher Capacity Surveys",
    sourceUrl: "https://dietkozhikode.kerala.gov.in/",
    verificationStatus: "Verified Academic Survey",
    description: "School administrators report that over 78% of school IT teachers feel unequipped to teach modern Artificial Intelligence and Machine Learning without external vendor support. Institutions prioritize EdTech partners who provide faculty development programs alongside student workshops.",
    keyDrivers: [
      "Rapid obsolescence of traditional computer science textbooks",
      "Teacher burnout in preparing lesson plans, question banks, and visual aids",
      "Institutional demand for certified external master trainers"
    ],
    schoolRequirementsImpact: "Schools will not sign student training agreements unless teacher orientation and faculty toolkits are bundled.",
    impactOnMyst: "MYST can launch a certified 'AI for Educators' masterclass track as a strategic Trojan horse to win long-term institutional contracts."
  },
  {
    id: "trend-05",
    title: "Shift from Theoretical Computer Science to Project Portfolio Credentials",
    category: "New Competitors",
    technologyFocus: "GitHub Repositories, Live Web Apps, Prototype Showcases",
    timeline: "2024 Onwards",
    publicationDate: "2024-06-18",
    source: "ASAP Kerala & Kerala Startup Mission (KSUM) Student Innovator Index",
    sourceUrl: "https://asapkerala.gov.in/",
    verificationStatus: "Verified Industry Data",
    description: "Parents and students increasingly reject rote certificate courses. Competitors (Brototype, Baabtra, TinkerChamps) compete on experiential project proof—live prototypes, robotics hackathons, and published web software.",
    keyDrivers: [
      "College admissions abroad and top Indian universities weighting student project portfolios",
      "Rise of school-level hackathons and state student startup challenges",
      "Employer skepticism of paper certificates without verified code repositories"
    ],
    schoolRequirementsImpact: "Schools require tangible demo days, annual science exhibition prototypes, and portfolio links for outgoing batches.",
    impactOnMyst: "MYST's core philosophy of deploying real AI systems aligns 100% with this market demand."
  }
];

export const COMPETITOR_ACTIVITIES_DATA = [
  {
    id: "act-qf-01",
    competitorId: "org-qfactory-01",
    competitorName: "Q Factory",
    title: "Execution of Q Positive Quiz Training & School Quiz Club Sessions in Kozhikode",
    category: "Student Development",
    industry: "Schools & Quizzing",
    publicationDate: "2024-10-10",
    description: "Q Factory delivered its signature Q Positive quiz training camp and continuous quiz club mentoring for Kozhikode institutions including Sree Gokulam Public School and Bhavan's School Chevayur, focusing on cognitive observation, critical thinking, and competitive quiz mastery.",
    sourceLink: "https://qfactory.in/training/",
    verificationStatus: "Verified",
    relevanceToMyst: "Highlights established institutional presence in top Kozhikode private CBSE schools for student cognitive skill development."
  },
  {
    id: "act-stemxpert-01",
    competitorId: "org-stemxpert-01",
    competitorName: "STEM-Xpert",
    title: "Promotion of STEM-as-a-Service and CBSE Composite Skill Labs from KINFRA Ramanattukara",
    category: "Institutional Offering",
    industry: "Schools & STEM Labs",
    publicationDate: "2025-01-20",
    description: "STEM-Xpert launched focused outreach for its 'STEM-as-a-Service' model, pitching CBSE-aligned Composite Skill Labs (Kaushal Bodh), proprietary Crinnoboard hardware, and 'AI for Teachers' certifications to schools from its KINFRA Advanced Technology Park Asia headquarters.",
    sourceLink: "https://stem-xpert.com/stem-as-a-service",
    verificationStatus: "Company Reported",
    relevanceToMyst: "Directly validates local institutional marketing in Kozhikode district for turnkey K-12 STEM and skill lab infrastructure."
  },
  {
    id: "act-rbv-01",
    competitorId: "org-robuverse-01",
    competitorName: "Robuverse",
    title: "Deployment of Turnkey K-12 Robotics & AI Labs from Kattangal Engineering Base",
    category: "Institutional Deployment",
    industry: "Schools & Robotics",
    publicationDate: "2024-11-15",
    description: "Robuverse expanded its turnkey school solutions, offering K-12 schools integrated Robotics and AI laboratories featuring modular open-source hardware (Arduino, ESP32, Raspberry Pi), 3D printing equipment, and campus STEM Day expos from its Kattangal, Kozhikode facility.",
    sourceLink: "https://www.robuverse.com/services",
    verificationStatus: "Verified",
    relevanceToMyst: "Confirms active local competition in Kozhikode district for turnkey school robotics lab installations and campus science day showcases."
  },
  {
    id: "act-nn-01",
    competitorId: "org-naturenurture-01",
    competitorName: "NatureNurture",
    title: "Regional Promotion of Turnkey Makerspace & EdTech Solutions in Kozhikode & Kerala",
    category: "Market Expansion",
    industry: "Schools & Makerspaces",
    publicationDate: "2024-11-20",
    description: "NatureNurture deployed targeted regional landing pages advertising customized Makerspaces, STEAM innovation labs, teacher professional development, and NEP 2020-aligned school setups for Kozhikode and Kerala institutions (named local school partnerships remain not independently verified).",
    sourceLink: "https://www.naturenurture.org/kozhikode/makerspace",
    verificationStatus: "Company Reported",
    relevanceToMyst: "Signals proactive marketing targeting Malabar private schools with hands-on maker and lab infrastructure solutions."
  },
  {
    id: "act-isq-01",
    competitorId: "org-isq-01",
    competitorName: "ISQ Mind School",
    title: "Rollout of In-School Life-Skills & Emotional Wellbeing Mentoring for Classes 5–10",
    category: "Programme Launch",
    industry: "Schools & Student Wellbeing",
    publicationDate: "2024-11-25",
    description: "ISQ Mind School introduced its structured in-school mentoring framework and companion mobile app, focusing on emotional resilience, confidence building, and adolescent stress coping for students aged 10–15 (named school partnerships remain not independently verified).",
    sourceLink: "https://isqmindschool.com/",
    verificationStatus: "Company Reported",
    relevanceToMyst: "Signals growing appetite among school principals for student personal development and mental health initiatives alongside academic curricula."
  },
  {
    id: "act-evo-01",
    competitorId: "org-evolve-01",
    competitorName: "Evolve Robotics",
    title: "Promotion of Evolve Infinity Lab 4-Year School MOU Model",
    category: "Programme Launch",
    industry: "Schools",
    publicationDate: "2024-11-20",
    description: "Evolve Robotics promoted its Evolve Infinity Lab turnkey offering, pitching a 4-year integrated Robotics, AI, Python, IoT, Drone, and Data Science lab package with deputed trainers to K-12 schools (specific Kozhikode school partnerships remain not independently verified).",
    sourceLink: "https://www.evolveroboticsindia.com/infinity-lab",
    verificationStatus: "Company Reported",
    relevanceToMyst: "Signals active competitive pitches targeting private school management with turnkey lab hardware and long-term lock-in MOUs."
  },
  {
    id: "act-rot-01",
    competitorId: "org-rotech-01",
    competitorName: "Rotech",
    title: "Deployment of AI Tute K-12 Robotics & STEAM Labs Across North Kerala CBSE Schools",
    category: "Institutional Deployment",
    industry: "Schools",
    publicationDate: "2024-11-12",
    description: "Rotech deployed its AI Tute STEAM curriculum and turnkey robotics hardware labs across partner CBSE and private schools in Kozhikode and Malappuram, providing Arduino/ESP32 kits and digital tracking portals.",
    sourceLink: "https://aitutelearning.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Validates continuing demand for in-school STEAM labs in Kozhikode, highlighting the opportunity for MYST to pitch advanced Autonomous AI software studios."
  },
  {
    id: "act-rot-02",
    competitorId: "org-rotech-01",
    competitorName: "Rotech",
    title: "Launch of AI Tute IT Incubation & Collegiate Emerging Tech Bootcamps",
    category: "Programme Launch",
    industry: "Schools & Colleges",
    publicationDate: "2024-08-15",
    description: "Introduced the IT Incubation track enabling senior students and collegiate graduates to build practical web apps, UI/UX designs in Figma, and explore tech entrepreneurship.",
    sourceLink: "https://www.rotechedu.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Confirms that school and college students are hungry for practical project incubation and entrepreneurship beyond theoretical textbooks."
  },
  {
    id: "act-pap-01",
    competitorId: "org-pappiyon-01",
    competitorName: "Pappiyon Solutions",
    title: "Strategic School Mentoring & Institutional Modernization at SVN HSS",
    category: "Institutional Engagement",
    industry: "Schools",
    publicationDate: "2024-10-28",
    description: "Pappiyon Solutions executed a strategic school mentoring initiative at SVN Higher Secondary School, providing academic quality gap analysis, faculty pedagogical coaching, and institutional roadmap governance.",
    sourceLink: "https://pappiyonsolutions.com/projects/",
    verificationStatus: "Verified",
    relevanceToMyst: "Demonstrates that school leadership responds favorably to institutional transformation programs, indicating MYST can position its AI studios as a strategic prestige asset for school boards."
  },
  {
    id: "act-pap-02",
    competitorId: "org-pappiyon-01",
    competitorName: "Pappiyon Solutions",
    title: "Rollout of EC SET (Early Childhood Skill Enhancement Training) for Kerala Schools",
    category: "Teacher Enablement",
    industry: "Schools & Early Childhood",
    publicationDate: "2024-06-18",
    description: "Launched modular teacher training cohorts under its EC SET framework across partner schools in Malappuram, Kozhikode, and Thrissur, training pre-primary and primary educators in developmental psychology and modern classroom facilitation.",
    sourceLink: "https://pappiyonsolutions.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Highlights heavy demand for accredited teacher training among school managements, confirming that educator enablement is an effective entry door into schools."
  },
  {
    id: "act-iri-01",
    competitorId: "org-iri-01",
    competitorName: "Industrial Robotics Institute (IRI)",
    title: "Turnkey Robotics & AI Lab Modernization Across 100+ Kerala Schools",
    category: "Institutional Deployment",
    industry: "Schools",
    publicationDate: "2024-11-05",
    description: "Industrial Robotics Institute expanded its turnkey school computer lab conversion program across over 100 CBSE and private institutions in Palakkad, Kochi, Thrissur, and Malappuram, installing electronics kits, sensors, and 3D printing equipment.",
    sourceLink: "https://industrialroboticsin.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Demonstrates entrenched hardware lab adoption in Central Kerala schools, reinforcing MYST's counter-strategy of offering high-level autonomous AI software studios without hardware maintenance overheads."
  },
  {
    id: "act-iri-02",
    competitorId: "org-iri-01",
    competitorName: "Industrial Robotics Institute (IRI)",
    title: "Expansion of On-Campus Instructor Deputation Model in Central & North Kerala",
    category: "Service Model Expansion",
    industry: "Schools & Faculty",
    publicationDate: "2024-08-12",
    description: "Scaled its full-service visiting instructor model to conduct over 40 structured annual periods per school, absorbing 100% of the robotics and coding teaching workload for affiliated school managements.",
    sourceLink: "https://industrialroboticsin.com/schools",
    verificationStatus: "Verified",
    relevanceToMyst: "Highlights that school principals value turn-key instructor solutions that do not burden internal faculty, indicating MYST should provide structured mentorship and turn-key delivery."
  },
  {
    id: "act-kokos-01",
    competitorId: "org-kokos-01",
    competitorName: "Kokos.ai",
    title: "Expansion of Turnkey AI Robolabs Across North Kerala & GCC Schools",
    category: "Institutional Expansion",
    industry: "Schools & International",
    publicationDate: "2024-10-15",
    description: "Kokos.ai expanded installations of its turnkey AI Robolabs featuring mBot2 hardware and KSUM-recognized AI textbooks across premier CBSE and international schools in Kerala, UAE, and Saudi Arabia from its Kinfra Technopark Kakkanchery operations base.",
    sourceLink: "https://kokos.ai/",
    verificationStatus: "Verified",
    relevanceToMyst: "Confirms school demand for structured AI lab suites, while highlighting an opportunity for MYST to deliver advanced autonomous AI agents without costly hardware kits."
  },
  {
    id: "act-kokos-02",
    competitorId: "org-kokos-01",
    competitorName: "Kokos.ai",
    title: "International Expansion into UK and USA Educational Markets",
    category: "Corporate Expansion",
    industry: "International EdTech",
    publicationDate: "2024-07-20",
    description: "Established corporate entities and regional distribution channels in Hampshire, UK and Arizona, USA to scale global licensing of its K-12 AI curriculum and cloud LMS platform.",
    sourceLink: "https://kokos.ai/",
    verificationStatus: "Verified",
    relevanceToMyst: "Demonstrates aggressive geographic reach by a local Kerala-founded company, reinforcing the need for MYST's distinct positioning around elite software development."
  },
  {
    id: "act-aib-01",
    competitorId: "org-aibonic-01",
    competitorName: "AiBonic Innovations",
    title: "Deployment of Turnkey AI & Robotics Labs Across North & South Kerala Schools",
    category: "Institutional Deployment",
    industry: "Schools",
    publicationDate: "2024-11-10",
    description: "AiBonic Innovations completed full turnkey lab installations and curriculum rollouts across multiple CBSE and ICSE institutions including APSARA Public School (Kasaragod) and Sai Krishna Public School (Trivandrum), packaging microcontrollers, sensor kits, and campus management software.",
    sourceLink: "https://www.aibonic.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Confirms demand for turnkey laboratory environments in CBSE/ICSE institutions, but reveals an absence of modern AI Agent and production web programming in their kit offerings."
  },
  {
    id: "act-aib-02",
    competitorId: "org-aibonic-01",
    competitorName: "AiBonic Innovations",
    title: "Title Sponsorship and Execution of EduExcellence Awards with Reach EduFoundation",
    category: "Industry Association",
    industry: "Institutional Partnerships",
    publicationDate: "2024-08-18",
    description: "Served as title sponsor for the EduExcellence Awards honoring outstanding teaching methodologies, academic leadership, and classroom innovation across Kerala schools in collaboration with Reach EduFoundation.",
    sourceLink: "https://www.aibonic.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Demonstrates an effective relationship-building channel with school principals and management trustees through academic awards and faculty felicitation."
  },
  {
    id: "act-csq-01",
    competitorId: "org-cybersquare-01",
    competitorName: "Cyber Square",
    title: "Deployment of Smart AI Teacher Tools Across 1,000+ K-12 Partner Schools",
    category: "New Services",
    industry: "Schools",
    publicationDate: "2024-10-25",
    description: "Cyber Square rolled out its Generative AI Teacher Tool suite across over 1,000 affiliated private CBSE and international schools in India and the UAE, allowing computer science educators to auto-generate lesson plans, interactive quizzes, and examination papers.",
    sourceLink: "https://cybersquare.org/ai-teacher-tools",
    verificationStatus: "Verified",
    relevanceToMyst: "Demonstrates that teacher workload reduction tools are a decisive factor in winning multi-year school contracts. MYST should offer teacher enablement toolkits alongside its advanced student AI curriculum."
  },
  {
    id: "act-csq-02",
    competitorId: "org-cybersquare-01",
    competitorName: "Cyber Square",
    title: "Expansion of AI Cloud Coding Labs into UAE and GCC Cambridge Schools",
    category: "Regional Expansion",
    industry: "Schools & International",
    publicationDate: "2024-09-08",
    description: "Expanded institutional licensing of its browser-based multi-language AI Cloud Lab across premier British and CBSE curriculum schools in Dubai and Sharjah from its regional hub in Sharjah Publishing City.",
    sourceLink: "https://cybersquare.org/",
    verificationStatus: "Verified",
    relevanceToMyst: "Confirms heavy demand for browser-based, zero-installation coding environments in the Gulf NRI school ecosystem."
  },
  {
    id: "act-01",
    competitorId: "org-delead-01",
    competitorName: "De' Lead International",
    title: "Phase 4 Rollout of Walk2Lead Robotics TechQuest Across North Malabar",
    category: "School Partnerships",
    industry: "Schools & CSR",
    publicationDate: "2024-11-02",
    description: "Announced the expansion of the Walk2Lead CSR-funded robotics program into 10 additional government high schools in Kannur and Wayanad districts in partnership with Walkaroo Foundation and local DIETs, taking total reached schools to 44.",
    sourceLink: "https://w2l.deleadint.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Strengthens De' Lead's grip on northern government schools. Confirms MYST's strategic priority should remain focused on private CBSE/ICSE institutions where commercial willingness-to-pay is high."
  },
  {
    id: "act-02",
    competitorId: "org-delead-01",
    competitorName: "De' Lead International",
    title: "MakerChamps 2-Day Innovation Bootcamp Hosted at NIT Calicut",
    category: "Programme Launch",
    industry: "Schools & Colleges",
    publicationDate: "2024-10-18",
    description: "Conducted the MakerChamps hands-on innovation and prototyping bootcamp at NIT Calicut in association with Nlightened ZenSolutions and NITC TBI, training over 120 student delegates in hardware design and creative problem solving.",
    sourceLink: "https://deleadint.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "High student prestige associated with NIT Calicut campus access. MYST can explore similar campus collaborations with premier institutions like IIM Kozhikode or CUSAT."
  },
  {
    id: "act-03",
    competitorId: "org-sch-prov-01",
    competitorName: "StemX School EdTech Solutions",
    title: "Signed 5 Turnkey Atal Tinkering Lab Setup Contracts in Ernakulam",
    category: "School Partnerships",
    industry: "Schools",
    publicationDate: "2024-09-12",
    description: "StemX secured five multi-year turnkey lab supply and instructor maintenance agreements with private CBSE schools in Kochi, expanding beyond their primary Kozhikode base.",
    sourceLink: "https://stemxsolutions.in",
    verificationStatus: "Verified",
    relevanceToMyst: "Indicates aggressive expansion into central Kerala private schools. MYST should pitch superior AI-software modules to schools dissatisfied with hardware-only labs."
  },
  {
    id: "act-04",
    competitorId: "org-delead-01",
    competitorName: "De' Lead International",
    title: "Launch of Corporate Generative AI & Leadership Outbound in Dubai, UAE",
    category: "New Services",
    industry: "Corporate",
    publicationDate: "2024-08-20",
    description: "Announced international corporate executive training cohorts in Dubai and Sharjah focusing on workplace productivity and Generative AI tools for human resources and leadership teams.",
    sourceLink: "https://deleadint.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Demonstrates international commercial ambitions to subsidize local non-profit educational operations."
  },
  {
    id: "act-05",
    competitorId: "org-agn-01",
    competitorName: "Haris&Co. Academy",
    title: "Inauguration of New Creative Tech Campus at Cyberpark Kozhikode",
    category: "Regional Expansion",
    industry: "Corporate & Academy",
    publicationDate: "2024-07-08",
    description: "Expanded physical footprint inside Government Cyberpark Kozhikode with an expanded 150-seat multimedia cohort studio to accommodate rising demand for performance marketing diplomas.",
    sourceLink: "https://harisand.co",
    verificationStatus: "Verified",
    relevanceToMyst: "Reinforces Cyberpark Kozhikode as the premier technology and skill ecosystem hub in North Kerala."
  },
  {
    id: "act-06",
    competitorId: "org-trn-01",
    competitorName: "Luminar Technolab",
    title: "Placement Tie-up with 40 New IT Firms for Python & Data Analytics",
    category: "Company Announcements",
    industry: "Colleges & Training",
    publicationDate: "2024-06-15",
    description: "Announced formal recruitment MoUs with 40 software service and product companies in Infopark Kochi and Cyberpark Calicut to hire graduates from their 6-month Data Analytics program.",
    sourceLink: "https://luminartechnolab.com",
    verificationStatus: "Verified",
    relevanceToMyst: "Validates continuing employer demand for Python and Data Analytics skillsets in the Kerala tech corridor."
  },
  {
    id: "act-07",
    competitorId: "org-trn-03",
    competitorName: "Brototype (MashupStack)",
    title: "Launch of Brototype AI Finishing School Track in Kochi",
    category: "Programme Launch",
    industry: "Colleges & Training",
    publicationDate: "2024-05-22",
    description: "Introduced an intensive 7-month zero-upfront-fee income share agreement (ISA) cohort focusing on full-stack web and basic AI integration for engineering graduates.",
    sourceLink: "https://brototype.com",
    verificationStatus: "Verified",
    relevanceToMyst: "Direct competitor in software career conversions; their ISA model creates aggressive recruitment amongst college final years."
  },
  {
    id: "act-08",
    competitorId: "org-delead-01",
    competitorName: "De' Lead International",
    title: "Season 22 of TinkerChamps Residential Leadership Camp Completed",
    category: "Programme Launch",
    industry: "Schools",
    publicationDate: "2024-04-30",
    description: "Completed the 22nd seasonal edition of TinkerChamps 3-day experiential learning camp for high school students, featuring robotics team challenges, wilderness leadership, and creative design thinking.",
    sourceLink: "https://tc.deleadint.com/",
    verificationStatus: "Verified",
    relevanceToMyst: "Demonstrates sustained seasonal community loyalty; over 500 alumni across northern Kerala."
  },
  {
    id: "act-ym-01",
    competitorId: "org-youngminds-01",
    competitorName: "YoungMinds.app (YM Innovations)",
    title: "Expansion of Innovation & Entrepreneurship Hubs (IEH) Across Kerala Schools",
    category: "Programme Launch",
    industry: "Schools",
    publicationDate: "2024-06-15",
    description: "Expanded school-focused Innovation & Entrepreneurship Hub (IEH) model and TinkerPark maker spaces into secondary schools across northern Kerala, integrating Design Thinking and student venture incubation.",
    sourceLink: "https://www.youngminds.app/",
    verificationStatus: "Verified",
    relevanceToMyst: "Direct institutional competitor for school innovation lab allocations and entrepreneurship club mandates."
  },
  {
    id: "act-ulsc-01",
    competitorId: "org-ulspaceclub-01",
    competitorName: "UL Space Club",
    title: "Launch of Space Club @ Campus Chapters & Statewide Astronomy Outreach",
    category: "Programme Launch",
    industry: "Schools",
    publicationDate: "2024-05-10",
    description: "Expanded Space Club @ Campus autonomous school chapter model and mobile telescope stargazing nights across Kozhikode and regional schools, empowering student ambassadors in peer-to-peer astronomy education.",
    sourceLink: "https://ulspaceclub.org/programs/outreach-programs",
    verificationStatus: "Verified",
    relevanceToMyst: "High-visibility school STEM engagement occupying school event calendars and student science club mandates across Malabar."
  }
];

