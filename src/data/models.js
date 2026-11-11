// Standard taxonomies and constants for EDGE Competitor Intelligence
import { 
  PARTNERSHIP_CLASSIFICATION_MAP, 
  orgMatchesPartnershipCategory as checkOrgMatchesPartnershipCategory,
  isExternalProvider as checkIsExternalProvider,
  isEducationalInstitution as checkIsEducationalInstitution
} from './partnershipClassificationData.js';

export const MAIN_CATEGORIES = [
  {
    id: "schools",
    name: "Schools",
    icon: "GraduationCap",
    tagline: "K-12, CBSE, ICSE & High Schools",
    description: "Competitors providing educational services, technology solutions, AI education, training programs, workshops, or institutional partnerships to schools.",
    segments: ["schools", "higher_secondary"]
  },
  {
    id: "colleges",
    name: "Colleges & Universities",
    icon: "Landmark",
    tagline: "Higher Education & Academic MoUs",
    description: "Competitors providing services to colleges, universities, higher education institutions, and academic organizations.",
    segments: ["colleges"]
  },
  {
    id: "corporate",
    name: "Corporate",
    icon: "Briefcase",
    tagline: "Upskilling, Automation & B2B Tech",
    description: "Companies providing corporate training, employee upskilling, AI training, automation, digital transformation, and business technology solutions.",
    segments: ["agencies_edtech"]
  },
  {
    id: "other_partnerships",
    name: "Other Partnerships",
    icon: "Users",
    tagline: "NGOs, Govt Bodies & Skill Centres",
    description: "Competitors working with NGOs, government institutions, training institutes, skill development centres, and other organizations.",
    segments: ["training_institutes"]
  }
];

export const ENTITY_NATURES = [
  { id: "all", label: "All Entity Types", shortLabel: "All" },
  { id: "external_provider", label: "External Service Providers", shortLabel: "External Providers" },
  { id: "institution", label: "Educational Institutions Themselves", shortLabel: "Institutions Themselves" }
];

export function getOrgCategory(org) {
  if (!org) return 'Other Partnerships';
  if (org.category) return org.category;
  
  const classification = PARTNERSHIP_CLASSIFICATION_MAP[org.id] || org.partnershipClassification;
  if (classification && classification.partnershipCategories && classification.partnershipCategories.length > 0) {
    const primary = classification.partnershipCategories[0];
    if (primary === 'schools') return 'Schools';
    if (primary === 'colleges') return 'Colleges & Universities';
    if (primary === 'corporate') return 'Corporate';
    if (primary === 'other_partnerships') return 'Other Partnerships';
  }

  if (org.segment === 'schools' || org.segment === 'higher_secondary') return 'Schools';
  if (org.segment === 'colleges') return 'Colleges & Universities';
  if (org.segment === 'agencies_edtech') return 'Corporate';
  if (org.segment === 'training_institutes') return 'Other Partnerships';
  return 'Other Partnerships';
}

export function orgMatchesCategory(org, categoryName) {
  return checkOrgMatchesPartnershipCategory(org, categoryName);
}

export function isExternalProvider(org) {
  return checkIsExternalProvider(org);
}

export function isEducationalInstitution(org) {
  return checkIsEducationalInstitution(org);
}

export function getOrgPartnershipCategories(org) {
  if (!org || !org.id) return [];
  const classification = PARTNERSHIP_CLASSIFICATION_MAP[org.id] || org.partnershipClassification;
  if (classification && classification.partnershipCategories) {
    return classification.partnershipCategories;
  }
  return [org.segment || 'schools'];
}

export const SEGMENTS = [
  { id: "schools", name: "Schools", code: "A", icon: "GraduationCap", desc: "Schools offering AI, robotics, coding labs and STEM programmes" },
  { id: "higher_secondary", name: "Higher Secondary Schools", code: "B", icon: "BookOpen", desc: "Plus One & Plus Two schools with tech add-ons and Python/AI training" },
  { id: "colleges", name: "Colleges", code: "C", icon: "Landmark", desc: "Engineering, Arts & Science, and Management institutions with industry add-ons" },
  { id: "training_institutes", name: "Independent Training & Skill Institutes", code: "D", icon: "Building2", desc: "Private academies offering career diplomas in AI, Python, Data and Tech" },
  { id: "agencies_edtech", name: "Agencies, IT Companies & EdTech", code: "E", icon: "Cpu", desc: "Digital agencies with academies, IT firms with internships & EdTech platforms" }
];

export const ORGANISATION_TYPES = [
  "CBSE / ICSE School",
  "Kerala State Syllabus School",
  "International School",
  "Higher Secondary School (Plus One/Two)",
  "Engineering College",
  "Arts & Science College",
  "Autonomous Academic Institution",
  "Independent Training Academy",
  "Digital Marketing Agency & Academy",
  "IT Services & Development Company",
  "EdTech Platform & Solution Provider"
];

export const TECHNOLOGIES = [
  "Artificial Intelligence",
  "Generative AI",
  "Data Analytics",
  "Data Science",
  "Python",
  "Automation",
  "AI Agents",
  "Robotics",
  "IoT",
  "Software Development",
  "Web Development",
  "Digital Marketing",
  "Graphic Design",
  "Cybersecurity",
  "Emerging Technologies"
];

// EDGE Core Programme Focus
export const EDGE_CORE_PROGRAMMES = [
  "Artificial Intelligence",
  "Generative AI",
  "Data Analytics",
  "Automation and AI Agents",
  "Python and Software Development",
  "Web and Digital Technology",
  "Emerging Technologies"
];

export const DURATIONS = [
  "Short-term (1-4 Weeks)",
  "3 Months",
  "4 Months",
  "6 Months",
  "8 Months",
  "12 Months",
  "Multi-Year Curriculum"
];

export const DELIVERY_METHODS = [
  "Offline (Classroom / Lab)",
  "Online (Live Interactive)",
  "Hybrid (Campus + Online)",
  "In-Campus Institutional Delivery"
];

export const VERIFICATION_STATUSES = [
  { id: "verified", label: "Verified through published evidence", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-300 ring-emerald-500/20" },
  { id: "company_reported", label: "Company-reported", badgeClass: "bg-amber-50 text-amber-700 border-amber-300 ring-amber-500/20" },
  { id: "unverified", label: "Unverified", badgeClass: "bg-slate-100 text-slate-700 border-slate-300 ring-slate-500/20" },
  { id: "unavailable", label: "Information unavailable", badgeClass: "bg-rose-50 text-rose-700 border-rose-300 ring-rose-500/20" }
];

export const COMPETITOR_RELEVANCE = [
  { id: "Direct", label: "Direct Competitor", desc: "Offers matching AI, Data, Python, or EdTech programmes targeting same audience" },
  { id: "Indirect", label: "Indirect Competitor", desc: "Offers complementary services, peripheral tech courses, or generic degrees" },
  { id: "Potential Partner", label: "Potential Institutional Partner", desc: "Schools, colleges or IT firms suitable for EDGE curriculum delivery" }
];


export const EVIDENCE_CATEGORIES = [
  "School Partnerships",
  "College Partnerships",
  "Institutional Collaborations",
  "Campus Activities",
  "Workshops & Events",
  "Courses & Programmes",
  "Student Projects",
  "Internships",
  "Placement Activities",
  "Technology Initiatives",
  "Awards & Achievements",
  "Marketing & Promotions",
  "Other"
];

export const FINDING_VERIFICATION_STATUSES = [
  { id: "official_source", label: "Verified from official source", badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-300 ring-emerald-500/20" },
  { id: "company_reported", label: "Company-reported", badgeClass: "bg-amber-50 text-amber-700 border-amber-300 ring-amber-500/20" },
  { id: "third_party", label: "Third-party reported", badgeClass: "bg-blue-50 text-blue-700 border-blue-300 ring-blue-500/20" },
  { id: "unverified", label: "Unverified", badgeClass: "bg-slate-100 text-slate-700 border-slate-300 ring-slate-500/20" }
];

export const FINDING_CATEGORIES = [
  "Institutional Partnerships",
  "Courses & Programmes",
  "Technology Initiatives",
  "Workshops & Events",
  "Placement Activities",
  "Internships",
  "School Partnerships",
  "Campus Activities",
  "Student Projects",
  "Pricing & Commercials",
  "Marketing & Promotions",
  "Other"
];

