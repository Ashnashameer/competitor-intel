// Seed Visual Evidence Collection for EDGE Competitor Intelligence Hub
// Realistic screenshot clippings linked to demo organisations in Kerala

const createMockScreenshotSvg = ({ domain, title, subtitle, tag, highlightText, accentColor = "#7c3aed" }) => {
  const svg = `
<svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Window Background -->
  <rect width="600" height="400" rx="8" fill="#FFFFFF"/>
  <rect width="600" height="400" rx="8" stroke="#E2E8F0" stroke-width="2"/>
  
  <!-- Browser Header Bar -->
  <path d="M0 8C0 3.58172 3.58172 0 8 0H592C596.418 0 600 3.58172 600 8V38H0V8Z" fill="#0F172A"/>
  <circle cx="20" cy="19" r="4.5" fill="#EF4444"/>
  <circle cx="34" cy="19" r="4.5" fill="#F59E0B"/>
  <circle cx="48" cy="19" r="4.5" fill="#10B981"/>
  
  <!-- URL Address Bar -->
  <rect x="70" y="8" width="460" height="22" rx="4" fill="#1E293B"/>
  <text x="85" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#94A3B8">https://${domain}</text>
  
  <!-- Web Content Area -->
  <rect x="0" y="38" width="600" height="362" fill="#F8FAFC"/>
  
  <!-- Content Container -->
  <rect x="25" y="55" width="550" height="325" rx="6" fill="#FFFFFF" stroke="#E2E8F0"/>
  
  <!-- Tag / Badge -->
  <rect x="45" y="75" width="160" height="22" rx="4" fill="#FAF5FF" stroke="#E9D5FF"/>
  <text x="55" y="90" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="bold" fill="${accentColor}">${tag.toUpperCase()}</text>
  
  <!-- Headline -->
  <text x="45" y="125" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="bold" fill="#0F172A">${title}</text>
  <text x="45" y="148" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#64748B">${subtitle}</text>
  
  <!-- Highlighted Observation Callout Box -->
  <rect x="45" y="175" width="510" height="110" rx="6" fill="#F8F7FF" stroke="${accentColor}" stroke-dasharray="4 4"/>
  <text x="60" y="200" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="bold" fill="${accentColor}">EVIDENCE CLIPPING &amp; RESEARCH NOTE:</text>
  <text x="60" y="224" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#1E293B">${highlightText.slice(0, 75)}</text>
  <text x="60" y="244" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#1E293B">${highlightText.slice(75, 150)}</text>
  <text x="60" y="264" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#1E293B">${highlightText.slice(150, 220)}</text>
  
  <!-- Watermark / Footer -->
  <line x1="45" y1="310" x2="555" y2="310" stroke="#F1F5F9"/>
  <text x="45" y="335" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" fill="#94A3B8">Verified Digital Snapshot • Captured for EDGE Competitor Intelligence Hub</text>
  <circle cx="535" cy="332" r="5" fill="#10B981"/>
  <text x="505" y="335" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="bold" fill="#10B981">AUDITED</text>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
};

export const SEED_EVIDENCE = [
  {
    id: "ev-01",
    orgId: "org-tra-01",
    orgName: "Luminar Technolab",
    title: "MoU Announcement with College CS Department",
    category: "College Partnerships",
    fileUrl: createMockScreenshotSvg({
      domain: "luminartechnolab.com/news/mou-college-partnerships",
      title: "Strategic Academic MoU Signed for Technology Training",
      subtitle: "Official website press release documenting formal institutional engagement.",
      tag: "College Partnerships",
      highlightText: "Luminar Technolab has executed a memorandum of understanding with regional engineering college to deliver structured 6-month offline training in Python Full Stack, Machine Learning, and Placement Bootcamps.",
      accentColor: "#7c3aed"
    }),
    fileType: "image/svg+xml",
    fileName: "luminar-mou-announcement.png",
    fileSize: "142 KB",
    sourceUrl: "https://luminartechnolab.com/news/mou-college-partnerships",
    description: "The institute conducted an official signing ceremony and published photos showing campus MoU exchange for student tech add-on batches.",
    publishedDate: "2026-02-18",
    collectedDate: "2026-02-22",
    verificationStatus: "verified"
  },
  {
    id: "ev-02",
    orgId: "org-tra-01",
    orgName: "Luminar Technolab",
    title: "Generative AI & Data Analytics Course Syllabus Snapshot",
    category: "Courses & Programmes",
    fileUrl: createMockScreenshotSvg({
      domain: "luminartechnolab.com/courses/data-science-ai",
      title: "Master Program in Data Science, AI & Generative AI",
      subtitle: "Course landing page outlining curriculum breakdown and practical project deliverables.",
      tag: "Courses & Programmes",
      highlightText: "Syllabus covers Python core, Pandas, Scikit-Learn machine learning, LangChain introduction, and prompt engineering. Total course duration advertised as 6 months with 100% placement assistance in Calicut & Kochi.",
      accentColor: "#9333ea"
    }),
    fileType: "image/svg+xml",
    fileName: "luminar-genai-curriculum.png",
    fileSize: "188 KB",
    sourceUrl: "https://luminartechnolab.com/courses/data-science-ai",
    description: "Screenshot of course modules proves competitor is offering Generative AI topics, though largely introductory syntax without autonomous multi-agent systems.",
    publishedDate: "2026-01-10",
    collectedDate: "2026-02-15",
    verificationStatus: "verified"
  },
  {
    id: "ev-03",
    orgId: "org-col-01",
    orgName: "Farook College (Autonomous)",
    title: "Autonomous AI & Data Science Discovery Lab Gazette",
    category: "Technology Initiatives",
    fileUrl: createMockScreenshotSvg({
      domain: "farookcollege.ac.in/announcements/ai-lab-inauguration",
      title: "Inauguration of New High-Performance Computing & AI Lab",
      subtitle: "Official circular by Academic Council regarding expanded computing facilities.",
      tag: "Technology Initiatives",
      highlightText: "Farook College Computer Science Council inaugurated a dedicated 60-seat computing facility equipped with GPU workstations for Data Science, Python programming, and student machine learning research.",
      accentColor: "#6d28d9"
    }),
    fileType: "image/svg+xml",
    fileName: "farook-ai-lab-gazette.png",
    fileSize: "165 KB",
    sourceUrl: "https://farookcollege.ac.in/announcements/ai-lab-inauguration",
    description: "Gazette notice confirms college has modern physical lab infrastructure, making it an exceptional candidate for an EDGE institutional MoU.",
    publishedDate: "2026-02-05",
    collectedDate: "2026-02-12",
    verificationStatus: "verified"
  },
  {
    id: "ev-04",
    orgId: "org-sch-01",
    orgName: "Silver Hills Public School",
    title: "Robotics and Junior Coding STEM Lab Notification",
    category: "School Partnerships",
    fileUrl: createMockScreenshotSvg({
      domain: "silverhillspublicschool.org/curriculum-infrastructure",
      title: "Extracurricular Robotics & STEM Discovery Club Announcement",
      subtitle: "Annual parent prospectus detailing third-party STEM partner integration.",
      tag: "School Partnerships",
      highlightText: "Classes 6 through 10 have mandatory weekend STEM and robotics discovery sessions. Lab equipped with micro-controller kits and introductory block-coding platforms managed in collaboration with external trainers.",
      accentColor: "#7c3aed"
    }),
    fileType: "image/svg+xml",
    fileName: "silverhills-stem-notice.png",
    fileSize: "135 KB",
    sourceUrl: "https://silverhillspublicschool.org/curriculum-infrastructure",
    description: "Confirms school is paying an external provider for robotics labs, establishing clear willingness to invest in technology education partnerships.",
    publishedDate: "2026-01-15",
    collectedDate: "2026-02-01",
    verificationStatus: "verified"
  },
  {
    id: "ev-05",
    orgId: "org-tra-01",
    orgName: "Luminar Technolab",
    title: "Cyberpark Calicut Recruitment Drive Poster",
    category: "Placement Activities",
    fileUrl: createMockScreenshotSvg({
      domain: "luminartechnolab.com/placements/cyberpark-drive",
      title: "Mega IT Placement Drive at Govt Cyberpark Kozhikode",
      subtitle: "Social media promotional poster highlighting candidate placement numbers.",
      tag: "Placement Activities",
      highlightText: "Promotional flyer announcing on-campus placement drive for 2025-2026 graduates with participation from 18 IT and software development companies across Calicut Cyberpark and Hilite Business Park.",
      accentColor: "#2563eb"
    }),
    fileType: "image/svg+xml",
    fileName: "luminar-placement-flyer.png",
    fileSize: "210 KB",
    sourceUrl: "https://luminartechnolab.com/placements/cyberpark-drive",
    description: "Visual promotional flyer verifying regular recruitment drives conducted in Kozhikode.",
    publishedDate: "2026-03-01",
    collectedDate: "2026-03-05",
    verificationStatus: "company_reported"
  }
];

