import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Edit3, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  Handshake, 
  Clock, 
  Sparkles, 
  Layers, 
  FileCheck2, 
  BookOpen, 
  Plus, 
  Camera, 
  FileText, 
  Maximize2, 
  ShieldCheck,
  Tag,
  Bookmark,
  Calendar,
  DollarSign,
  Target,
  Globe,
  Award,
  Users,
  Briefcase,
  GraduationCap,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Compass,
  Bot,
  Cpu,
  Code,
  Laptop,
  Zap,
  Check,
  XCircle,
  Flame,
  ArrowUpRight,
  BarChart3,
  School,
  Activity,
  CreditCard,
  Shield,
  Search,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { 
  VERIFICATION_STATUSES, 
  EVIDENCE_CATEGORIES, 
  FINDING_CATEGORIES, 
  FINDING_VERIFICATION_STATUSES 
} from '../data/models';
import { 
  getCategoriesForOrganisation, 
  PARTNER_ECOSYSTEM,
  getCategoryPartnershipMetrics,
  getOrganisationPartnerSchools
} from '../data/categoryRelationships';
import { COMPETITIVE_STRATEGY_DATA } from '../data/strategicIntelligenceData';
import { 
  PROGRAMME_SCHOOL_PARTNERSHIPS, 
  SCHOOL_PROGRAMMES, 
  SCHOOLS_DATABASE, 
  SCHOOL_RESEARCH_FINDINGS 
} from '../data/schoolResearchData';
import { EvidenceCropModal } from './EvidenceCropModal';
import { EvidenceViewerModal } from './EvidenceViewerModal';
import { AddEditFindingModal } from './AddEditFindingModal';
import { LinkFindingToEvidenceModal } from './LinkFindingToEvidenceModal';
import { SchoolDetailModal } from './SchoolDetailModal';
import { CyberSquareDashboard } from './CyberSquareDashboard';

/**
 * Helper to split text strings into clean visual items
 */
function splitToVisualItems(str) {
  if (!str) return [];
  if (Array.isArray(str)) return str.filter(Boolean);
  return str.split(/[,;•\n]+/).map(s => s.trim()).filter(s => s.length > 0);
}

/**
 * Helper to assign appropriate icon to programme/service
 */
function getProgrammeIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('robot') || t.includes('kit') || t.includes('hardware') || t.includes('tinker') || t.includes('maker') || t.includes('iot')) {
    return { icon: Bot, color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' };
  }
  if (t.includes('ai') || t.includes('artificial') || t.includes('intelligence') || t.includes('vision') || t.includes('smart')) {
    return { icon: Sparkles, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' };
  }
  if (t.includes('code') || t.includes('coding') || t.includes('python') || t.includes('scratch') || t.includes('software') || t.includes('tech track')) {
    return { icon: Code, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' };
  }
  if (t.includes('textbook') || t.includes('curriculum') || t.includes('syllabus') || t.includes('book')) {
    return { icon: BookOpen, color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' };
  }
  if (t.includes('teacher') || t.includes('mentor') || t.includes('train') || t.includes('faculty') || t.includes('educator') || t.includes('audit')) {
    return { icon: GraduationCap, color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' };
  }
  if (t.includes('career') || t.includes('leadership') || t.includes('corporate') || t.includes('consulting') || t.includes('ecce')) {
    return { icon: Compass, color: 'text-rose-700', bg: 'bg-rose-50', border: 'border-rose-200' };
  }
  return { icon: Cpu, color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200' };
}

export function OrganisationProfilePage({ 
  org, 
  onBack, 
  onEdit,
  categoryContext = 'schools'
}) {
  const { 
    courses = [], 
    partnerships = [], 
    evidenceItems = [], 
    findings = [],
    addEvidence, 
    updateEvidence, 
    deleteEvidence,
    addFinding,
    updateFinding,
    deleteFinding,
    setFindingsForEvidence
  } = useData();

  // Modals state
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [isFindingModalOpen, setIsFindingModalOpen] = useState(false);
  const [editingFinding, setEditingFinding] = useState(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkingEvidence, setLinkingEvidence] = useState(null);

  // School detail modal state
  const [selectedSchoolForModal, setSelectedSchoolForModal] = useState(null);
  const [schoolSearchQuery, setSchoolSearchQuery] = useState('');
  const [selectedSchoolDistrict, setSelectedSchoolDistrict] = useState('All');

  if (!org) return null;

  // Render dedicated Cyber Square Intelligence Dashboard
  if (org.id === 'org-cybersquare-01' || (org.name && org.name.toLowerCase().includes('cyber square'))) {
    return <CyberSquareDashboard org={org} onBack={onBack} onEdit={onEdit} />;
  }

  const verificationItem = VERIFICATION_STATUSES.find(v => v.id === org.verificationStatus) || VERIFICATION_STATUSES[2];
  const orgCategories = getCategoriesForOrganisation(org.id);

  // Compute partnership metrics based on category context
  const metrics = useMemo(() => {
    return getCategoryPartnershipMetrics(org, categoryContext);
  }, [org, categoryContext]);

  // Query verified partner schools from structured database
  const partnerSchools = useMemo(() => {
    return getOrganisationPartnerSchools(org);
  }, [org]);

  // Filtered partner schools based on search and district pills
  const filteredPartnerSchools = useMemo(() => {
    return partnerSchools.filter(s => {
      if (selectedSchoolDistrict !== 'All' && s.district !== selectedSchoolDistrict) return false;
      if (schoolSearchQuery.trim()) {
        const q = schoolSearchQuery.toLowerCase();
        return (
          (s.name && s.name.toLowerCase().includes(q)) ||
          (s.district && s.district.toLowerCase().includes(q)) ||
          (s.location && s.location.toLowerCase().includes(q)) ||
          (s.programme && s.programme.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [partnerSchools, selectedSchoolDistrict, schoolSearchQuery]);

  // Specific courses linked to this organisation in central database
  const orgCourses = courses.filter(c => c.orgId === org.id || (c.orgName && c.orgName.toLowerCase() === org.name.toLowerCase()));

  // Comprehensive list of programmes from both SCHOOL_PROGRAMMES and central courses
  const allProgrammes = useMemo(() => {
    const fromResearch = SCHOOL_PROGRAMMES.filter(p => 
      p.orgId === org.id || 
      (p.orgName && p.orgName.toLowerCase() === org.name.toLowerCase()) ||
      (org.id === 'org-delead-01' && p.orgId === 'org-delead-01')
    );
    const researchNames = new Set(fromResearch.map(p => (p.name || '').toLowerCase()));
    
    const fromCourses = (orgCourses || []).filter(c => {
      const name = (c.courseName || c.name || '').toLowerCase();
      return !researchNames.has(name);
    }).map(c => ({
      id: c.id,
      name: c.courseName || c.name,
      description: c.skillsTaught ? `Covers ${c.skillsTaught}. Target cohort: ${c.targetAudience || 'Students'}.` : org.companyOverview,
      category: c.techCategory || c.category || 'Technical',
      targetGrades: c.targetAudience || 'Classes 6–12',
      duration: c.duration || 'Flexible',
      deliveryMode: c.deliveryMethod || 'Offline (Classroom / Lab)',
      isRecurring: true,
      targetAudience: c.targetAudience || 'Students & Professionals',
      evidenceUrl: org.website || 'https://deleadint.com/'
    }));

    return [...fromResearch, ...fromCourses];
  }, [org, orgCourses]);

  // Strategic Strategy Dossier for this organisation
  const strategyRecord = useMemo(() => {
    return COMPETITIVE_STRATEGY_DATA.find(s => 
      s.competitorId === org.id || 
      s.competitorName.toLowerCase() === org.name.toLowerCase() ||
      org.name.toLowerCase().includes(s.competitorName.toLowerCase()) ||
      s.competitorName.toLowerCase().includes(org.name.toLowerCase())
    );
  }, [org]);

  // Dynamic back button label
  const backLabel = useMemo(() => {
    if (categoryContext === 'schools') return 'Back to School Partner Directory';
    if (categoryContext === 'colleges') return 'Back to Colleges & Universities Directory';
    if (categoryContext === 'corporate') return 'Back to Corporate Partner Directory';
    if (categoryContext === 'other_partnerships') return 'Back to Other Partnerships Directory';
    return 'Back to Directory';
  }, [categoryContext]);

  // Table of Contents Sections
  const activeSections = [
    { id: 'sec-overview', number: 1, title: 'Overview' },
    { id: 'sec-partnerships', number: 2, title: 'Partnership Intelligence' },
    { id: 'sec-programmes', number: 3, title: 'Programmes & Services' },
    { id: 'sec-schools-directory', number: 4, title: 'Partner School Directory' },
    { id: 'sec-geography', number: 5, title: 'Geographic Reach' },
    { id: 'sec-pricing', number: 6, title: 'Commercial & Pricing' },
    { id: 'sec-positioning', number: 7, title: 'Competitive Positioning' },
    { id: 'sec-sources', number: 8, title: 'Evidence & Sources' }
  ];

  const scrollToSection = (secId) => {
    const el = document.getElementById(secId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Evidence handlers
  const handleSaveEvidence = (evidenceRecord, linkedFindingIds = []) => {
    const saved = addEvidence(evidenceRecord);
    if (linkedFindingIds && linkedFindingIds.length > 0) {
      setFindingsForEvidence(saved.id, linkedFindingIds);
    }
  };

  const handleSaveFinding = (findingRecord, linkedEvidenceIds = []) => {
    if (editingFinding) {
      updateFinding(findingRecord);
    } else {
      addFinding(findingRecord);
    }
  };

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* ========================================================================= */}
      {/* TOP RESEARCH HEADER & INTELLIGENCE SUMMARY BAR                            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs">
        {/* Dynamic Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors mb-4 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← {backLabel}</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0c0a1a] via-[#16122d] to-[#261f42] text-purple-300 font-black text-2xl flex items-center justify-center shrink-0 border border-purple-900/50 shadow-md">
              {org.logoText || org.name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase font-sans">
                  {org.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200">
                  {org.entityNatureLabel || 'External Service / Training Provider'}
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${verificationItem.badgeClass}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {verificationItem.label}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  {org.orgType || org.type || 'EdTech & Technical Training'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  {org.city ? `${org.city}, ` : ''}{org.district}, {org.state || 'Kerala'}
                </span>
                {org.website && (
                  <>
                    <span>•</span>
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-purple-700 hover:text-purple-900 font-semibold inline-flex items-center gap-1 hover:underline"
                    >
                      <Globe className="w-3 h-3" />
                      <span>{org.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setEditingFinding(null);
                setIsFindingModalOpen(true);
              }}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-purple-800 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>+ Finding</span>
            </button>

            <button
              onClick={() => setIsAddEvidenceOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Evidence</span>
            </button>

            <button
              onClick={() => onEdit(org)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>
        </div>

        {/* Compact Intelligence Summary Bar */}
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {categoryContext === 'schools' ? 'School Partnerships' : categoryContext === 'colleges' ? 'College Partnerships' : categoryContext === 'corporate' ? 'Corporate Clients' : 'Verified Partnerships'}
            </span>
            <div className="text-sm font-black text-slate-900 font-mono">
              {metrics.verifiedCount}
            </div>
            <span className="text-[10px] text-slate-500 block truncate">
              {partnerSchools.length > 0 ? `${partnerSchools.length} Individual Schools In Directory` : metrics.status}
            </span>
          </div>

          <div className="space-y-0.5 border-l border-slate-200/80 pl-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Districts Covered</span>
            <div className="text-sm font-black text-slate-900 font-mono">
              {metrics.districts && metrics.districts.length > 0 ? `${metrics.districts.length} Districts` : 'Kerala'}
            </div>
            <span className="text-[10px] text-slate-500 block truncate">
              {metrics.districts && metrics.districts.length > 0 ? metrics.districts.join(', ') : org.district || 'Kerala'}
            </span>
          </div>

          <div className="space-y-0.5 border-l border-slate-200/80 pl-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Programmes Delivered</span>
            <div className="text-sm font-black text-slate-900 font-mono">
              {allProgrammes.length > 0 ? `${allProgrammes.length} Active Tracks` : `${metrics.programmes.length} Tracks`}
            </div>
            <span className="text-[10px] text-slate-500 block truncate">
              {metrics.programmes && metrics.programmes.length > 0 ? metrics.programmes.slice(0, 2).join(' • ') : 'Technical Modules'}
            </span>
          </div>

          <div className="space-y-0.5 border-l border-slate-200/80 pl-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Partnership Status</span>
            <div className="text-sm font-black text-emerald-700 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{metrics.status || 'Active / Ongoing'}</span>
            </div>
            <span className="text-[10px] text-slate-500 block truncate">
              {metrics.confidence}
            </span>
          </div>
        </div>

        {/* Table of Contents Jump Links */}
        <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Jump to Section:
          </span>
          {activeSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200/80 font-semibold whitespace-nowrap text-[11px] transition-colors cursor-pointer"
            >
              {sec.number}. {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 8 COMPREHENSIVE INTELLIGENCE SECTIONS                                     */}
      {/* ========================================================================= */}
      <div className="space-y-6">

        {/* ------------------------------------------------------------------------- */}
        {/* 01. ORGANISATION OVERVIEW                                                 */}
        {/* ------------------------------------------------------------------------- */}
        <div id="sec-overview" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  Section 01
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Corporate Architecture
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Organisation Overview
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              ID: {org.id}
            </span>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Building2 className="w-3 h-3 text-purple-600" />
                <span>Organisation Type</span>
              </span>
              <div className="font-bold text-slate-900">
                {org.orgType || org.type || 'Education & Technology Training Company'}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {org.entityNatureLabel || 'External Service / Training Provider'}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3 text-purple-600" />
                <span>Headquarters</span>
              </span>
              <div className="font-bold text-slate-900">
                {org.city ? `${org.city}, ` : ''}{org.district}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {org.address || `${org.district}, Kerala, India`}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-600" />
                <span>Founded Year</span>
              </span>
              <div className="font-bold text-slate-900 font-mono">
                {org.founded || 'Not publicly verified'}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {org.founded ? `Operating since ${org.founded}` : 'Verified via portal records'}
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3 h-3 text-purple-600" />
                <span>Geographic Coverage</span>
              </span>
              <div className="font-bold text-slate-900 truncate">
                {org.geographicPresence ? org.geographicPresence.join(', ') : 'Kerala (Pan-State)'}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {metrics.districts && metrics.districts.length > 0 ? `${metrics.districts.length} Verified Districts` : 'India'}
              </span>
            </div>
          </div>

          {/* Detailed Narrative */}
          <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/80 space-y-2 text-xs leading-relaxed text-slate-700">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Executive Summary & Business Model
            </span>
            <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
              {org.companyOverview || org.overview || 'Detailed institutional intelligence dossier.'}
            </p>
            {org.targetAudience && (
              <p className="text-slate-600 text-xs pt-1">
                <span className="font-bold text-slate-700">Target Audience:</span> {org.targetAudience}
              </p>
            )}
            {org.primaryBusiness && (
              <p className="text-slate-600 text-xs">
                <span className="font-bold text-slate-700">Core Business Verticals:</span> {org.primaryBusiness}
              </p>
            )}
          </div>

          {/* Reported Company Metrics If Available */}
          {org.companyWideMetrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {org.companyWideMetrics.studentsImpactedReported && (
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200/80">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block font-mono">Reported Student Reach</span>
                  <span className="text-xl font-black text-slate-900 font-mono">{org.companyWideMetrics.studentsImpactedReported}</span>
                  <span className="text-[10px] text-slate-500 block">Students impacted company-wide</span>
                </div>
              )}
              {org.companyWideMetrics.professionalsTrainedReported && (
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200/80">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block font-mono">Corporate Outreach</span>
                  <span className="text-xl font-black text-slate-900 font-mono">{org.companyWideMetrics.professionalsTrainedReported}</span>
                  <span className="text-[10px] text-slate-500 block">Professionals & educators trained</span>
                </div>
              )}
              {org.companyWideMetrics.organisationsCollaboratedReported && (
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-200/80">
                  <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block font-mono">Institutional Footprint</span>
                  <span className="text-xl font-black text-slate-900 font-mono">{org.companyWideMetrics.organisationsCollaboratedReported}</span>
                  <span className="text-[10px] text-slate-500 block">Schools, colleges & enterprises</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* 02. PARTNERSHIP INTELLIGENCE                                              */}
        {/* ------------------------------------------------------------------------- */}
        <div id="sec-partnerships" className="bg-white rounded-2xl border border-purple-200/80 p-6 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  Section 02
                </span>
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                  Target & Delivery Analysis
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Partnership Intelligence
              </h2>
              <p className="text-xs text-slate-500">
                Who {org.name} actually works with, contractual relationships, cohort demographics, and delivery models.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{metrics.status}</span>
              </span>
            </div>
          </div>

          {/* 6 Structured Intelligence Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
            {/* Card 1: Total Verified Partnerships */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-purple-600" />
                <span>Total Verified Partnerships</span>
              </span>
              <div className="text-base font-black text-slate-900 font-mono">
                {metrics.verifiedCount}
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {org.id === 'org-delead-01' 
                  ? 'Official Walk2Lead programme snapshot reports 44 government schools across 4 districts, with 23 individually verified in this database.'
                  : `${org.name} institutional partner coverage across documented deployments.`}
              </p>
            </div>

            {/* Card 2: Institutional Classification */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Institutional Classification</span>
              </span>
              <div className="text-sm font-bold text-slate-900">
                {org.id === 'org-delead-01' ? 'Government & Aided Primary/High Schools' : 'CBSE, ICSE, Government & Aided'}
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {org.id === 'org-delead-01'
                  ? 'Walk2Lead focuses strictly on rural and coastal government upper primary schools (GUPS/GMUPS). TinkerChamps extends into private/CBSE student delegates.'
                  : 'Blended institutional reach across premier private institutions and aided schools.'}
              </p>
            </div>

            {/* Card 3: Target Student Cohorts */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-purple-600" />
                <span>Target Student Cohort</span>
              </span>
              <div className="text-sm font-bold text-slate-900">
                {org.targetClasses || 'Classes 6 to 12'}
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Walk2Lead: Classes 6–7 • MakerChamps: Classes 8–12 • TinkerChamps: Grades 6–12 • DLI & Corporate: Higher Secondary & Adults.
              </p>
            </div>

            {/* Card 4: Programme Duration & Frequency */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                <span>Duration & Frequency</span>
              </span>
              <div className="text-sm font-bold text-slate-900">
                {org.id === 'org-delead-01' ? '3 Months (52 Lab Hours) + Multi-Day Camps' : 'Academic Year / Modular Cohorts'}
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Structured curricular interventions run weekly; residential innovation bootcamps run 2–3 days over weekends and school holidays.
              </p>
            </div>

            {/* Card 5: Delivery Model */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-600" />
                <span>Delivery Model</span>
              </span>
              <div className="text-sm font-bold text-slate-900">
                In-School Labs, Campus Bootcamps & Outbound Retreats
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Deploy physical hardware kits directly to school classrooms; host flagship residential programs inside premier partner campuses like NIT Calicut.
              </p>
            </div>

            {/* Card 6: Relationship & Legal Structure */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Handshake className="w-3.5 h-3.5 text-purple-600" />
                <span>Relationship Structure</span>
              </span>
              <div className="text-sm font-bold text-slate-900">
                Tripartite CSR MoU & Institutional Deployments
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                CSR grant funding (Walkaroo Foundation) with DIET Kozhikode & Malappuram academic oversight; institutional agreements for university bootcamp hosting.
              </p>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* 03. PROGRAMMES & SERVICES                                                 */}
        {/* ------------------------------------------------------------------------- */}
        <div id="sec-programmes" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  Section 03
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Curricular Offerings
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Programmes & Services
              </h2>
              <p className="text-xs text-slate-500">
                All structured educational programs, robotics modules, leadership camps, and institutional services provided by {org.name}.
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              {allProgrammes.length} Documented Tracks
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {allProgrammes.map((prog, idx) => {
              const iconData = getProgrammeIcon(prog.name || '');
              const Icon = iconData.icon;

              return (
                <div 
                  key={prog.id || idx}
                  className="p-4 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all bg-white flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-lg ${iconData.bg} ${iconData.color} border ${iconData.border} flex items-center justify-center shrink-0`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm leading-snug">
                            {prog.name || prog.courseName}
                          </h4>
                          <span className="text-[10px] font-mono text-purple-700 font-semibold">
                            {prog.category || 'STEM & Leadership'}
                          </span>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded text-[9.5px] font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                        {prog.targetGrades || 'Classes 6–12'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                      {prog.description}
                    </p>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono pt-2 border-t border-slate-100">
                      <div className="text-slate-500">
                        <span className="font-bold text-slate-700">Duration:</span> {prog.duration || '3 Months'}
                      </div>
                      <div className="text-slate-500">
                        <span className="font-bold text-slate-700">Format:</span> {prog.deliveryMode || 'Offline (Lab)'}
                      </div>
                      <div className="text-slate-500">
                        <span className="font-bold text-slate-700">Model:</span> {prog.isRecurring ? 'Recurring Annual' : 'Modular Cohort'}
                      </div>
                      <div className="text-slate-500">
                        <span className="font-bold text-slate-700">Audience:</span> {prog.targetAudience ? prog.targetAudience.split('(')[0] : 'Students'}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Verified Programme</span>
                    </span>

                    {prog.evidenceUrl && (
                      <a
                        href={prog.evidenceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-purple-700 hover:underline font-mono"
                      >
                        <span>Evidence Source</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* 04. PARTNER SCHOOL DIRECTORY (DEDICATED RESEARCH TABLE)                   */}
        {/* ------------------------------------------------------------------------- */}
        <div id="sec-schools-directory" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  Section 04
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Institutional Directory
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Partner School Directory
              </h3>
              <p className="text-xs text-slate-500">
                Verified schools, government institutions, and partner campuses running {org.name} programmes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-50 text-purple-800 border border-purple-200">
                <School className="w-3.5 h-3.5 text-purple-600" />
                <span>{partnerSchools.length > 0 ? `${partnerSchools.length} Documented Schools` : metrics.verifiedCount}</span>
              </span>
            </div>
          </div>

          {partnerSchools.length > 0 ? (
            <div className="space-y-3">
              {/* Search and District Filter Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={schoolSearchQuery}
                    onChange={(e) => setSchoolSearchQuery(e.target.value)}
                    placeholder="Search school name or district..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-purple-500 bg-slate-50/50"
                  />
                </div>

                {/* District Pills Filter */}
                <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 text-xs">
                  {['All', ...new Set(partnerSchools.map(s => s.district))].map(dist => (
                    <button
                      key={dist}
                      onClick={() => setSelectedSchoolDistrict(dist)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap border transition-colors cursor-pointer ${
                        selectedSchoolDistrict === dist
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {dist} {dist === 'All' ? `(${partnerSchools.length})` : `(${partnerSchools.filter(s => s.district === dist).length})`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Structured School Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">School</th>
                      <th className="py-2.5 px-3">District</th>
                      <th className="py-2.5 px-3">Programme</th>
                      <th className="py-2.5 px-3">Partnership Type</th>
                      <th className="py-2.5 px-3">Year</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Evidence</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPartnerSchools.map((s, idx) => (
                      <tr 
                        key={s.id || idx} 
                        onClick={() => setSelectedSchoolForModal(s)}
                        className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                      >
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                            {s.name}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">
                            {s.location} • {s.classification}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-medium text-slate-700">
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px]">
                            {s.district}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-800 font-semibold">
                          <span className="truncate max-w-[200px] block">
                            {s.programme}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                          {s.partnershipType}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-slate-700">
                          {s.year}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>{s.status}</span>
                          </span>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          {s.evidence ? (
                            <a
                              href={s.evidence}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1 text-[11px] text-purple-600 hover:text-purple-800 hover:underline font-mono"
                            >
                              <span>Source</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSchoolForModal(s);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white font-bold text-[10px] border border-purple-200 hover:border-purple-600 transition-all cursor-pointer"
                          >
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                Click any school row to inspect full partnership history, participating grades, and verified student counts.
              </p>
            </div>
          ) : (
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
              <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-sm font-bold text-slate-700">
                Individual School Names Not Publicly Disclosed
              </div>
              <p className="text-xs text-slate-500 max-w-lg mx-auto">
                {org.name} operates on an aggregate institutional partnership model ({metrics.verifiedCount}). 
                Individual school names are held under commercial agreements or institutional privacy covenants.
              </p>
              {metrics.evidenceUrl && (
                <a
                  href={metrics.evidenceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-purple-700 hover:underline font-bold pt-1"
                >
                  <span>View Verified Outreach Evidence Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* 05. GEOGRAPHIC REACH                                                      */}
        {/* ------------------------------------------------------------------------- */}
        <div id="sec-geography" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  Section 05
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Territorial Footprint
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Geographic Reach
              </h2>
              <p className="text-xs text-slate-500">
                Verified districts covered, school concentrations, and multi-state operations.
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              {metrics.districts && metrics.districts.length > 0 ? `${metrics.districts.length} Verified Districts` : 'State-Wide'}
            </span>
          </div>

          {/* District Concentration Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {Object.entries(
              partnerSchools.reduce((acc, s) => {
                acc[s.district] = (acc[s.district] || 0) + 1;
                return acc;
              }, {})
            ).map(([dist, count]) => (
              <div key={dist} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-600" />
                  <span>{dist} District</span>
                </span>
                <div className="text-xl font-black text-slate-900 font-mono">
                  {count} {count === 1 ? 'School' : 'Schools'}
                </div>
                <p className="text-[10px] text-slate-500">
                  Documented in database
                </p>
              </div>
            ))}

            {/* International Footprint if any */}
            {org.geographicPresence && org.geographicPresence.includes('UAE') && (
              <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-200 space-y-1">
                <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider font-mono flex items-center gap-1">
                  <Globe className="w-3 h-3 text-purple-600" />
                  <span>United Arab Emirates</span>
                </span>
                <div className="text-xl font-black text-purple-900 font-mono">
                  International Track
                </div>
                <p className="text-[10px] text-purple-600">
                  Dubai & Sharjah corporate leadership outbound
                </p>
              </div>
            )}
          </div>

          {/* Geographic Summary Bar */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-bold text-slate-900">Primary Concentration:</span>{' '}
              Northern Kerala (Malabar Region) spanning Kozhikode, Malappuram, Kannur, and Wayanad districts.
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold shrink-0">
              <CheckCircle2 className="w-3 h-3" />
              <span>High Density in Kozhikode & Malappuram</span>
            </span>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* 06. COMMERCIAL / PRICING INTELLIGENCE                                     */}
        {/* ------------------------------------------------------------------------- */}
        <div id="sec-pricing" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  Section 06
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Commercial Architecture
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Commercial / Pricing Intelligence
              </h2>
              <p className="text-xs text-slate-500">
                Verified fee models, CSR subsidies, and commercial arrangements. (Never fabricated).
              </p>
            </div>

            <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Strict Evidence Rule</span>
            </span>
          </div>

          {/* Pricing Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
            {/* Card 1: School In-Lab Pricing */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-1">
                  In-School Programme Fees
                </span>
                <div className="font-black text-slate-900 text-sm">
                  {org.id === 'org-delead-01' ? 'Free for Government School Students (CSR Sponsored)' : (org.pricing || 'Pricing not publicly disclosed.')}
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {org.id === 'org-delead-01'
                  ? 'Walk2Lead implementations are funded through CSR grants (Walkaroo Foundation) with zero fees charged to rural and coastal government schools.'
                  : 'Commercial licensing contracts are executed directly with institutional managements without open retail pricing.'}
              </p>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 w-fit">
                {org.id === 'org-delead-01' ? 'CSR-Funded Subsidy' : 'B2B Institutional Contract'}
              </span>
            </div>

            {/* Card 2: Camps & Bootcamps Pricing */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-1">
                  Camps & Bootcamps Pricing
                </span>
                <div className="font-black text-slate-900 text-sm">
                  Pricing not publicly disclosed.
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                {org.id === 'org-delead-01'
                  ? 'TinkerChamps residential camps and MakerChamps (NIT Calicut) bootcamps are billed per student seat upon cohort registration. Exact tariff is modular per season.'
                  : 'Seasonal camp delegate fees are published per cohort circular.'}
              </p>
              <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-fit">
                Per-Delegate Modular
              </span>
            </div>

            {/* Card 3: Corporate Retainers */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block mb-1">
                  Corporate Training Retainers
                </span>
                <div className="font-black text-slate-900 text-sm">
                  Pricing not publicly disclosed.
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Corporate executive leadership retreats and Generative AI workshops in India and UAE operate on enterprise B2B service retainers.
              </p>
              <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 w-fit">
                Enterprise Retainer
              </span>
            </div>
          </div>

          {/* Verification Alert */}
          <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200/80 text-xs flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-purple-700 shrink-0" />
            <div className="text-purple-900">
              <span className="font-bold">Evidence Disclosure Note:</span> Open-market per-student fee schedules are not publicly disclosed by {org.name}. Revenue model is anchored in corporate CSR underwriting, B2B school lab contracts, and direct workshop registrations.
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* 07. COMPETITIVE POSITIONING                                               */}
        {/* ------------------------------------------------------------------------- */}
        <div id="sec-positioning" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  Section 07
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Strategic Intelligence
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Competitive Positioning
              </h2>
              <p className="text-xs text-slate-500">
                Core market positioning, strategic advantages, and vulnerability assessment against MYST.
              </p>
            </div>

            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              {org.competitiveRelevance === 'Direct' ? 'Direct Competitor' : 'Service Provider'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Positioning & Differentiators */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-purple-600" />
                <span>Core Positioning & Differentiators</span>
              </h3>
              <p className="text-slate-700 leading-relaxed font-medium">
                {strategyRecord?.corePositioning || 'High-touch experiential leadership camps combined with CSR-backed in-school robotics lab implementations.'}
              </p>
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Key Differentiators:</span>
                <ul className="space-y-1 list-disc list-inside text-slate-600">
                  <li>CSR funding pipeline (Walkaroo Foundation) enabling frictionless entry into rural/coastal government schools.</li>
                  <li>Exclusive association with NIT Calicut for residential MakerChamps innovation camps.</li>
                  <li>20+ season legacy of TinkerChamps leadership camps with active student alumni network.</li>
                </ul>
              </div>
            </div>

            {/* Advantages vs Vulnerabilities */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span>Competitive Advantages vs Gaps</span>
              </h3>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                  <span className="font-bold block text-[11px]">Primary Advantage:</span>
                  Deep grassroots relationships with DIET Kozhikode and Malappuram, backed by multi-year CSR capital.
                </div>
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
                  <span className="font-bold block text-[11px]">Potential Gap / Vulnerability:</span>
                  Heavily dependent on corporate CSR grants; hardware-centric curriculum with lower proprietary cloud LMS / AI software IP compared to pure SaaS competitors.
                </div>
              </div>
            </div>
          </div>

          {/* Relevant Competitors in Same Segment */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="font-bold text-slate-700 shrink-0">
              Relevant Competitors in Same Segment:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['Cyber Square', 'StemX Solutions', 'RoboLab STEM', 'Evolve Robotics', 'Kokos.ai', 'Rotech'].map(comp => (
                <span key={comp} className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 font-semibold text-slate-800 text-[11px]">
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* 08. EVIDENCE & SOURCES                                                    */}
        {/* ------------------------------------------------------------------------- */}
        <div id="sec-sources" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                  Section 08
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Verifiable Documentation
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Evidence & Sources
              </h2>
              <p className="text-xs text-slate-500">
                Traceable primary citations, official disclosures, and verification confidence levels.
              </p>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Strict Evidence Sourced</span>
            </span>
          </div>

          {/* Evidence Table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3">Source Name</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Extracted Finding / Evidence Note</th>
                  <th className="py-2.5 px-3">Confidence</th>
                  <th className="py-2.5 px-3 text-right">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    source: "Walk2Lead Official Program Portal",
                    type: "Official Portal",
                    url: "https://w2l.deleadint.com/",
                    quote: "Walk2Lead Robotics TechQuest: 44 government schools across Kozhikode, Malappuram, Kannur, Wayanad; 1,300+ students trained in robotics & electronics.",
                    confidence: "Verified"
                  },
                  {
                    source: "Walkaroo Foundation CSR Education Portal",
                    type: "CSR Foundation Report",
                    url: "https://walkaroofoundation.in/index.php/education/",
                    quote: "CSR implementation partnership with De' Lead International, DIET Kozhikode, and DIET Malappuram for robotics education in rural schools.",
                    confidence: "Verified"
                  },
                  {
                    source: "TinkerChamps Official Website",
                    type: "Official Portal",
                    url: "https://tc.deleadint.com/",
                    quote: "Over 20+ seasonal editions completed; 500+ student alumni across experiential leadership and wilderness camps.",
                    confidence: "Verified"
                  },
                  {
                    source: "NIT Calicut MakerChamps Portal",
                    type: "Institutional Host",
                    url: "https://deleadint.com/journal/a-bootcamp-that-runs-from-inside-nit-calicut",
                    quote: "MakerChamps 2-day innovation and prototyping bootcamp hosted inside NIT Calicut campus in association with Nlightened ZenSolutions.",
                    confidence: "Verified"
                  },
                  {
                    source: "De' Lead International Main Website",
                    type: "Company Website",
                    url: "https://deleadint.com/",
                    quote: "Founded in 2022; Kozhikode headquarters with UAE overseas presence; 5,000+ students impacted, 1,000+ professionals trained.",
                    confidence: "Verified"
                  }
                ].map((ev, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {ev.source}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-500 font-mono text-[10px]">
                      {ev.type}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 max-w-[400px]">
                      {ev.quote}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{ev.confidence}</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900 font-mono text-[11px] font-semibold hover:underline"
                      >
                        <span>Visit</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* CONNECTED SCHOOL DETAIL MODAL                                             */}
      {/* ========================================================================= */}
      <SchoolDetailModal
        school={selectedSchoolForModal}
        isOpen={Boolean(selectedSchoolForModal)}
        onClose={() => setSelectedSchoolForModal(null)}
      />

      {/* Evidence & Findings Modals */}
      <EvidenceCropModal
        isOpen={isAddEvidenceOpen}
        onClose={() => setIsAddEvidenceOpen(false)}
        onSave={handleSaveEvidence}
        defaultOrgId={org.id}
        defaultOrgName={org.name}
        availableFindings={findings}
      />

      <EvidenceViewerModal
        evidence={selectedEvidence}
        isOpen={Boolean(selectedEvidence)}
        onClose={() => setSelectedEvidence(null)}
        onDelete={deleteEvidence}
        onUpdate={updateEvidence}
        onLinkFinding={(ev) => {
          setSelectedEvidence(null);
          setLinkingEvidence(ev);
          setIsLinkModalOpen(true);
        }}
        allFindings={findings}
      />

      <AddEditFindingModal
        isOpen={isFindingModalOpen}
        onClose={() => setIsFindingModalOpen(false)}
        onSave={handleSaveFinding}
        finding={editingFinding}
        defaultOrgId={org.id}
        defaultOrgName={org.name}
        availableEvidence={evidenceItems}
      />

      <LinkFindingToEvidenceModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        evidence={linkingEvidence}
        availableFindings={findings}
        onSaveLinks={setFindingsForEvidence}
      />
    </div>
  );
}
