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
  CheckCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { 
  VERIFICATION_STATUSES, 
  EVIDENCE_CATEGORIES, 
  FINDING_CATEGORIES, 
  FINDING_VERIFICATION_STATUSES 
} from '../data/models';
import { getCategoriesForOrganisation, PARTNER_ECOSYSTEM } from '../data/categoryRelationships';
import { COMPETITIVE_STRATEGY_DATA } from '../data/strategicIntelligenceData';
import { EvidenceCropModal } from './EvidenceCropModal';
import { EvidenceViewerModal } from './EvidenceViewerModal';
import { AddEditFindingModal } from './AddEditFindingModal';
import { LinkFindingToEvidenceModal } from './LinkFindingToEvidenceModal';
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
    return { icon: Code, color: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-200' };
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
  onEdit 
}) {
  const { 
    courses, 
    partnerships, 
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

  if (!org) return null;

  // Render dedicated Cyber Square Intelligence Dashboard
  if (org.id === 'org-cybersquare-01' || (org.name && org.name.toLowerCase().includes('cyber square'))) {
    return <CyberSquareDashboard org={org} onBack={onBack} onEdit={onEdit} />;
  }

  const verificationItem = VERIFICATION_STATUSES.find(v => v.id === org.verificationStatus) || VERIFICATION_STATUSES[2];
  const orgCategories = getCategoriesForOrganisation(org.id);

  // Specific courses linked to this organisation in central database
  const orgCourses = courses.filter(c => c.orgId === org.id || (c.orgName && c.orgName.toLowerCase() === org.name.toLowerCase()));

  // Specific MoUs linked to this organisation
  const orgMoUs = partnerships.filter(p => 
    (p.institutionName && p.institutionName.toLowerCase() === org.name.toLowerCase()) ||
    (p.externalProvider && p.externalProvider.toLowerCase() === org.name.toLowerCase())
  );

  // Evidence items captured specifically for this organisation
  const orgEvidence = evidenceItems.filter(e => 
    e.orgId === org.id || 
    (e.orgName && e.orgName.toLowerCase() === org.name.toLowerCase())
  );

  // Research findings recorded specifically for this organisation
  const orgFindings = findings.filter(f => 
    f.orgId === org.id || 
    (f.orgName && f.orgName.toLowerCase() === org.name.toLowerCase())
  );

  // Ecosystem partner entities connected to this organisation
  const connectedEcosystemPartners = PARTNER_ECOSYSTEM.filter(p => 
    p.connectedOrganisations.includes(org.name)
  );

  // Strategic Strategy Dossier for this organisation
  const strategyRecord = useMemo(() => {
    return COMPETITIVE_STRATEGY_DATA.find(s => 
      s.competitorId === org.id || 
      s.competitorName.toLowerCase() === org.name.toLowerCase() ||
      org.name.toLowerCase().includes(s.competitorName.toLowerCase()) ||
      s.competitorName.toLowerCase().includes(org.name.toLowerCase())
    );
  }, [org]);

  // ==========================================
  // SECTION CONDITIONAL VISIBILITY (11 SECTIONS)
  // ==========================================
  // 1. Overview
  const hasOverview = Boolean(org.overview || org.companyOverview || org.companyWideMetrics);

  // 2. Business Verticals
  const hasVerticals = Boolean(
    (orgCategories && orgCategories.length > 0) || 
    (org.businessModel && org.businessModel.length > 0) || 
    org.verticals
  );

  // 3. Programmes and Services
  const hasProgrammesServices = Boolean(
    org.services || 
    org.servicesOffered || 
    (org.relevantProgrammes && org.relevantProgrammes.length > 0) || 
    (orgCourses && orgCourses.length > 0) || 
    (org.coursesTechnologies && org.coursesTechnologies.length > 0)
  );

  // 4. Institutional Partnerships
  const hasInstitutionalPartnerships = Boolean(
    (org.institutionalPartnerships && org.institutionalPartnerships.length > 0) || 
    orgMoUs.length > 0
  );

  // 5. School / College / Corporate Relationships (Sector-specific)
  const hasSchoolRel = Boolean(
    org.id === 'org-delead-01' || 
    org.id === 'org-cybersquare-01' ||
    org.id === 'org-iri-01' ||
    org.id === 'org-kokos-01' ||
    org.id === 'org-pappiyon-01' ||
    org.id === 'org-rotech-01' ||
    org.id === 'org-evolve-01' ||
    org.id === 'org-isq-01' ||
    org.id === 'org-naturenurture-01' ||
    org.id === 'org-robuverse-01' ||
    org.id === 'org-stemxpert-01' ||
    org.id === 'org-qfactory-01' ||
    org.id === 'org-youngminds-01' ||
    org.id === 'org-ulspaceclub-01' ||
    orgCategories.some(c => c.id === 'schools') ||
    (org.institutionalPartnerships || []).some(p => typeof p === 'string' && (p.includes('School') || p.includes('GHSS') || p.includes('GHS') || p.includes('GUPS')))
  );
  const hasCollegeRel = Boolean(
    org.id === 'org-rotech-01' ||
    orgCategories.some(c => c.id === 'colleges') ||
    (org.institutionalPartnerships || []).some(p => typeof p === 'string' && (p.includes('College') || p.includes('University') || p.includes('Institute of Tech'))) ||
    orgMoUs.some(m => (m.institutionName || '').includes('College') || (m.institutionName || '').includes('University')) ||
    (org.companyWideMetrics?.organisationsCollaboratedReported && org.companyWideMetrics.organisationsCollaboratedReported.includes('Colleges'))
  );
  const hasCorporateRel = Boolean(
    org.id === 'org-delead-01' || 
    org.id === 'org-rotech-01' ||
    orgCategories.some(c => c.id === 'corporate') || 
    org.corporateClients
  );
  const hasSectorRelationships = hasSchoolRel || hasCollegeRel || hasCorporateRel;

  // 6. District and Geographic Coverage
  const hasGeographicCoverage = Boolean(
    org.district || 
    org.city || 
    org.geographicPresence || 
    org.districtCoverage || 
    org.targetDistricts
  );

  // 7. Partner Organisations
  const hasPartnerOrganisations = Boolean(
    org.id === 'org-delead-01' || 
    connectedEcosystemPartners.length > 0 || 
    org.partnerOrganisations ||
    org.fundingPartners
  );

  // 8. Programme Duration and Pricing
  const hasDurationPricing = Boolean(
    org.pricing || 
    (org.programmeDurations && org.programmeDurations.length > 0) || 
    org.deliveryMethod
  );

  // 9. Competitive Strategy, Positioning, Opportunities & Threats
  const hasCompetitivePositioning = Boolean(
    strategyRecord ||
    org.competitiveRelevance || 
    org.strengths || 
    org.weaknesses || 
    org.relevanceReason
  );

  // 10. Research Findings
  const hasFindings = Boolean(orgFindings && orgFindings.length > 0);

  // 11. Sources and Verification
  const hasSourcesVerification = Boolean(
    org.website || 
    org.walk2leadWebsite || 
    org.tinkerChampsWebsite || 
    org.evidenceUrl || 
    orgEvidence.length > 0 || 
    org.verificationStatus
  );

  // Dynamic Navigation Sections
  const activeSections = [
    hasOverview && { id: 'sec-overview', number: 1, title: 'Overview Architecture' },
    hasVerticals && { id: 'sec-verticals', number: 2, title: 'Business Verticals' },
    hasProgrammesServices && { id: 'sec-programmes', number: 3, title: 'Programmes & Services' },
    hasInstitutionalPartnerships && { id: 'sec-institutional', number: 4, title: 'Institutional Partnerships' },
    hasSectorRelationships && { id: 'sec-relationships', number: 5, title: 'Sector Relationships' },
    hasGeographicCoverage && { id: 'sec-geography', number: 6, title: 'Geographic Coverage' },
    hasPartnerOrganisations && { id: 'sec-partners', number: 7, title: 'Partner Ecosystem' },
    hasDurationPricing && { id: 'sec-pricing', number: 8, title: 'Pricing & Durations' },
    hasCompetitivePositioning && { id: 'sec-positioning', number: 9, title: 'Strategy & Positioning' },
    hasFindings && { id: 'sec-findings', number: 10, title: 'Research Findings' },
    hasSourcesVerification && { id: 'sec-sources', number: 11, title: 'Sources & Verification' },
  ].filter(Boolean);

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

  const handleSaveFinding = (findingData) => {
    if (editingFinding && editingFinding.id) {
      updateFinding(findingData);
    } else {
      addFinding(findingData);
    }
  };

  const handleOpenLinkModal = (ev) => {
    setLinkingEvidence(ev);
    setIsLinkModalOpen(true);
  };

  const handleCreateNewFindingForEvidence = (evId) => {
    setEditingFinding({
      title: '',
      category: 'General',
      description: '',
      verificationStatus: 'verified',
      linkedEvidenceIds: [evId],
      orgId: org.id,
      orgName: org.name
    });
    setIsFindingModalOpen(true);
  };

  // Extract parsed services array
  const rawServices = org.servicesOffered || org.services || '';
  const parsedServicesList = useMemo(() => {
    const fromServices = splitToVisualItems(rawServices);
    const fromProgrammes = org.relevantProgrammes || [];
    const combined = Array.from(new Set([...fromServices, ...fromProgrammes]));
    return combined.length > 0 ? combined : [org.name + ' Core Technical Programmes'];
  }, [rawServices, org.relevantProgrammes, org.name]);

  // Extract parsed technologies
  const parsedTechList = useMemo(() => {
    return org.coursesTechnologies && org.coursesTechnologies.length > 0
      ? org.coursesTechnologies
      : ['Robotics Hardware', 'Python Syntax', 'Scratch & PictoBlox', 'STEM Fundamentals'];
  }, [org.coursesTechnologies]);

  // Determine Primary Operating Archetype
  const primaryArchetype = useMemo(() => {
    if (org.id === 'org-cybersquare-01') return 'K-12 AI & Coding Platform & Textbooks';
    if (org.id === 'org-iri-01') return 'Turnkey Robotics & AI School Labs';
    if (org.id === 'org-kokos-01') return 'Global AI Textbooks & School Robolabs';
    if (org.id === 'org-pappiyon-01') return 'School Academic Mentoring & Quality Auditing';
    if (org.id === 'org-rotech-01') return 'AI Tute STEAM Labs & K-12 Robotics';
    if (org.id === 'org-evolve-01') return 'Evolve Infinity Lab (Robotics & AI 4-Year MoU)';
    if (org.id === 'org-isq-01') return 'Student Emotional Wellbeing & In-School Mentoring';
    if (org.id === 'org-naturenurture-01') return 'Turnkey K-12 Makerspaces & Experiential Curriculum';
    if (org.id === 'org-robuverse-01') return 'Turnkey Robotics & AI Labs, STEM Hardware & Humanoid R&D';
    if (org.id === 'org-stemxpert-01') return 'STEM-as-a-Service, Composite Skill Labs & Crinnoboard AIoT';
    if (org.id === 'org-qfactory-01') return 'Student Development, Knowledge Enhancement & Quizzing';
    if (org.id === 'org-youngminds-01') return 'Student Innovation, Entrepreneurship & STEM Labs';
    if (org.id === 'org-ulspaceclub-01') return 'Space Science, Astronomy & ISRO Space Tutor';
    if (org.id === 'org-delead-01') return 'Youth STEM Robotics & Leadership Outreach';
    return org.orgType || 'EdTech & Technical Services';
  }, [org.id, org.orgType]);

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-200">
      
      {/* ========================================================================= */}
      {/* TOP HEADER & MONOGRAM BANNER                                              */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        {/* Back Link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors mb-4 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Category Directory</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0c0a1a] via-[#16122d] to-[#261f42] text-purple-300 font-black text-xl flex items-center justify-center shrink-0 border border-purple-900/50 shadow-sm">
              {org.logoText || org.name.substring(0, 2).toUpperCase()}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{org.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  org.competitiveRelevance === 'Direct'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : org.competitiveRelevance === 'Potential Partner'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {org.competitiveRelevance === 'Direct' ? 'Direct Competitor' : (org.competitiveRelevance || 'Service Provider')}
                </span>

                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${verificationItem.badgeClass}`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {verificationItem.label}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  {org.orgType || org.type}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  {org.city}, {org.district}, {org.state || 'Kerala'}
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
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-800 rounded-lg border border-purple-200 transition-colors cursor-pointer"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>+ Finding</span>
            </button>

            <button
              onClick={() => setIsAddEvidenceOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white rounded-lg shadow-xs transition-colors cursor-pointer"
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

        {/* Sticky Table of Contents Navigation (Only active sections shown) */}
        <div className="mt-5 pt-4 border-t border-purple-100 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            Jump to Section:
          </span>
          {activeSections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-purple-100 text-slate-700 hover:text-purple-900 border border-slate-200/80 font-semibold whitespace-nowrap text-[11px] transition-colors cursor-pointer"
            >
              {sec.number}. {sec.title}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 11 SECTIONS CONTAINER (STRICTLY VISUALISED & CARD-DRIVEN)                 */}
      {/* ========================================================================= */}
      <div className="space-y-6">

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 1: ORGANISATION OVERVIEW (VISUAL ARCHITECTURE)                    */}
        {/* ------------------------------------------------------------------------- */}
        {hasOverview && (
          <div id="sec-overview" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-purple-50 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">1</span>
                <span>Organisation Overview & Scale Architecture</span>
              </h2>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Visual Telemetry
              </span>
            </div>

            {/* A. 4 Visual KPI Metric Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Metric 1: Students Impacted */}
              <div className="p-4 bg-gradient-to-br from-purple-50/80 to-purple-100/30 rounded-2xl border border-purple-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider">Students Impacted</span>
                  <div className="w-7 h-7 rounded-xl bg-purple-200/70 text-purple-800 flex items-center justify-center">
                    <Users className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-purple-950 font-mono tracking-tight">
                    {org.companyWideMetrics?.studentsImpactedReported || (
                      org.id === 'org-cybersquare-01' ? '200,000+' :
                      org.id === 'org-iri-01' ? '40,000+' :
                      org.id === 'org-kokos-01' ? '35,000+' :
                      org.id === 'org-pappiyon-01' ? '20,000+' : '5,000+'
                    )}
                  </div>
                  <span className="text-[10px] text-purple-700 font-medium">Learners & Young Coders</span>
                </div>
              </div>

              {/* Metric 2: Partner Institutions */}
              <div className="p-4 bg-gradient-to-br from-emerald-50/80 to-emerald-100/30 rounded-2xl border border-emerald-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider">Partner Campuses</span>
                  <div className="w-7 h-7 rounded-xl bg-emerald-200/70 text-emerald-800 flex items-center justify-center">
                    <School className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-950 font-mono tracking-tight">
                    {org.companyWideMetrics?.organisationsCollaboratedReported || (
                      org.id === 'org-cybersquare-01' ? '1,000+ Schools' :
                      org.id === 'org-iri-01' ? '100+ Campuses' :
                      org.id === 'org-kokos-01' ? '100+ Schools' :
                      org.id === 'org-pappiyon-01' ? '60+ Institutions' : '50+ Partner Orgs'
                    )}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">Active Academic MoUs</span>
                </div>
              </div>

              {/* Metric 3: Educators & Faculty */}
              <div className="p-4 bg-gradient-to-br from-amber-50/80 to-amber-100/30 rounded-2xl border border-amber-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">Educators Enabled</span>
                  <div className="w-7 h-7 rounded-xl bg-amber-200/70 text-amber-800 flex items-center justify-center">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-950 font-mono tracking-tight">
                    {org.companyWideMetrics?.professionalsTrainedReported || (
                      org.id === 'org-cybersquare-01' ? '3,500+ Teachers' :
                      org.id === 'org-iri-01' ? 'Deputed Staff' :
                      org.id === 'org-pappiyon-01' ? '500+ Teachers' : '1,000+ Trained'
                    )}
                  </div>
                  <span className="text-[10px] text-amber-700 font-medium">Certified Instructors</span>
                </div>
              </div>

              {/* Metric 4: Geographic Scope */}
              <div className="p-4 bg-gradient-to-br from-blue-50/80 to-blue-100/30 rounded-2xl border border-blue-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">Geographic Footprint</span>
                  <div className="w-7 h-7 rounded-xl bg-blue-200/70 text-blue-800 flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-xl font-black text-blue-950 font-mono tracking-tight truncate">
                    {org.id === 'org-cybersquare-01' ? '4 Global Nations' :
                     org.id === 'org-kokos-01' ? '5 Nations (GCC & West)' :
                     org.id === 'org-iri-01' ? 'Statewide Kerala' :
                     org.id === 'org-pappiyon-01' ? 'Central & North Kerala' :
                     org.id === 'org-rotech-01' ? 'North Kerala (Kozhikode HQ)' :
                     org.id === 'org-evolve-01' ? 'Kozhikode & Kochi Hubs' :
                     org.id === 'org-isq-01' ? 'HiLITE Business Park, Kozhikode' :
                     org.id === 'org-naturenurture-01' ? 'Pan-India (350+ Schools) & Kozhikode' :
                     org.id === 'org-robuverse-01' ? 'Kattangal, Kozhikode & South India' :
                     org.id === 'org-stemxpert-01' ? 'KINFRA Ramanattukara, Kozhikode & Middle East' :
                     org.id === 'org-qfactory-01' ? 'Kozhikode HQ & Statewide Kerala' :
                     org.id === 'org-youngminds-01' ? 'HiLITE Business Park, Kozhikode & Kerala' :
                     org.id === 'org-ulspaceclub-01' ? 'Karaparamba, Kozhikode HQ & Pan-Kerala Schools' :
                     '4 Districts + UAE'}
                  </div>
                  <span className="text-[10px] text-blue-700 font-medium">Headquarters: {org.city}</span>
                </div>
              </div>
            </div>

            {/* B. Visual Core Architecture Deck (3 Structured Capability Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
              {/* Pillar 1: Core Domain Archetype */}
              <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Cpu className="w-4 h-4 text-purple-700 shrink-0" />
                    <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider font-mono">
                      Operating Archetype
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {primaryArchetype}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-white text-purple-800 text-[10px] font-bold border border-purple-200">
                    Institutional B2B
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white text-slate-700 text-[10px] font-semibold border border-purple-100">
                    Turnkey Conversion
                  </span>
                </div>
              </div>

              {/* Pillar 2: Curricular Compliance & Standards */}
              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Award className="w-4 h-4 text-indigo-700 shrink-0" />
                    <span className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider font-mono">
                      Curricular Framework
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    NEP 2020 & Regional Syllabi Alignment
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-white text-indigo-800 text-[10px] font-bold border border-indigo-200">
                    CBSE / ICSE Ready
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white text-slate-700 text-[10px] font-semibold border border-indigo-100">
                    Age-Graded Books
                  </span>
                </div>
              </div>

              {/* Pillar 3: Delivery Infrastructure */}
              <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Layers className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-[10px] font-bold text-emerald-900 uppercase tracking-wider font-mono">
                      Delivery Infrastructure
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    On-Campus Labs & Digital Portals
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 rounded-md bg-white text-emerald-800 text-[10px] font-bold border border-emerald-200">
                    Hands-On Hardware
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white text-slate-700 text-[10px] font-semibold border border-emerald-100">
                    LMS Cloud Sandboxes
                  </span>
                </div>
              </div>
            </div>

            {/* C. Verified High-Impact Takeaways (Pill Row) */}
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono mr-1">
                Verified Intelligence Badges:
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Primary Base: <strong>{org.city}, {org.district}</strong></span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>Market Stance: <strong>{org.competitiveRelevance || 'Direct Competitor'}</strong></span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Target: <strong>{org.targetClasses || org.targetAudience || 'K-12 Schools'}</strong></span>
              </span>
            </div>

            {org.companyWideMetrics?.note && (
              <div className="text-[11px] text-slate-500 italic flex items-center gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                <span>{org.companyWideMetrics.note}</span>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 2: BUSINESS VERTICALS (VISUAL CARDS)                              */}
        {/* ------------------------------------------------------------------------- */}
        {hasVerticals && (
          <div id="sec-verticals" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">2</span>
              <span>Business Verticals & Operating Models</span>
            </h2>

            {/* Visual Vertical Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {orgCategories.map(cat => {
                const isSchools = cat.id === 'schools';
                const isColleges = cat.id === 'colleges';
                const isCorporate = cat.id === 'corporate';
                
                return (
                  <div 
                    key={cat.id} 
                    className="p-4 rounded-xl border border-purple-200/80 bg-gradient-to-br from-white to-purple-50/30 flex flex-col justify-between space-y-3 shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-purple-100 text-purple-900 font-mono">
                          Active Vertical
                        </span>
                        <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                          {isSchools ? <GraduationCap className="w-4 h-4" /> :
                           isColleges ? <Building2 className="w-4 h-4" /> :
                           isCorporate ? <Briefcase className="w-4 h-4" /> :
                           <Handshake className="w-4 h-4" />}
                        </div>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm">{cat.title}</h3>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">{cat.description || cat.tagline}</p>
                    </div>

                    <div className="pt-2 border-t border-purple-100/60 flex flex-wrap gap-1 text-[10px]">
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                        Primary Target
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                        Institutional MoUs
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Operating Models as Visual Badges */}
              {org.businessModel && Array.isArray(org.businessModel) && org.businessModel.length > 0 && (
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between space-y-2 sm:col-span-2 lg:col-span-1">
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block mb-1">
                      Operating Architecture
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">Delivery Formats</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {org.businessModel.map((model, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-white text-slate-800 border border-slate-250 shadow-2xs"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 3: PROGRAMMES AND SERVICES (VISUAL CARDS & TECH STACK)             */}
        {/* ------------------------------------------------------------------------- */}
        {hasProgrammesServices && (
          <div id="sec-programmes" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-5">
            <div className="flex items-center justify-between border-b border-purple-50 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">3</span>
                <span>Programmes and Services Catalogue</span>
              </h2>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                {parsedServicesList.length} Active Tracks
              </span>
            </div>

            {/* A. Grid of Visual Service / Programme Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {parsedServicesList.map((serviceName, idx) => {
                const conf = getProgrammeIcon(serviceName);
                const IconComp = conf.icon;

                return (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl border border-purple-100/90 bg-white hover:border-purple-300 hover:shadow-xs transition-all flex items-start gap-3"
                  >
                    <div className={`w-9 h-9 rounded-xl ${conf.bg} ${conf.color} ${conf.border} border flex items-center justify-center shrink-0 mt-0.5`}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                          Verified Track
                        </span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs leading-snug break-words">
                        {serviceName}
                      </h4>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-purple-50 text-purple-800 border border-purple-100">
                          {serviceName.toLowerCase().includes('teacher') ? 'Educators' : 'K-12 Students'}
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-slate-100 text-slate-700">
                          {serviceName.toLowerCase().includes('textbook') ? 'Print & Digital' : 'Hands-on'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* B. Technology Stack Visual Matrix */}
            <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-100 space-y-2.5">
              <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-purple-700" />
                <span>Technologies, Toolkits & Learning Tracks:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {parsedTechList.map((tech, idx) => (
                  <span 
                    key={idx} 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-white text-slate-800 border border-purple-200/80 shadow-2xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* C. Catalogued Modules from Central Database */}
            {orgCourses.length > 0 && (
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
                  Catalogued Database Modules ({orgCourses.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {orgCourses.map(crs => (
                    <div key={crs.id} className="p-3.5 rounded-xl border border-purple-100 bg-white shadow-2xs flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="font-bold text-slate-900 text-xs">{crs.courseName}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 shrink-0">
                          {crs.techCategory}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-purple-50">
                        <span>Duration: <strong>{crs.duration}</strong></span>
                        <span>Mode: <strong>{crs.deliveryMethod}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 4: INSTITUTIONAL PARTNERSHIPS (VISUAL CARDS)                      */}
        {/* ------------------------------------------------------------------------- */}
        {hasInstitutionalPartnerships && (
          <div id="sec-institutional" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-purple-50 pb-2.5">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">4</span>
                <span>Institutional Partnerships & Academic MoUs</span>
              </h2>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {(org.institutionalPartnerships || []).length + orgMoUs.length} Verified Institutions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
              {(org.institutionalPartnerships || []).map((p, idx) => (
                <div key={idx} className="p-3 bg-purple-50/30 hover:bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between gap-2 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <School className="w-4 h-4 text-purple-600 shrink-0" />
                    <span className="font-bold text-slate-900 truncate">{p}</span>
                  </div>
                  <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 shrink-0">
                    Campus Partner
                  </span>
                </div>
              ))}
              {orgMoUs.map(mou => (
                <div key={mou.id} className="p-3 bg-blue-50/30 hover:bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between gap-2 transition-colors">
                  <div className="flex items-center gap-2 min-w-0">
                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-900 truncate">{mou.institutionName}</span>
                  </div>
                  <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 shrink-0">
                    {mou.scope || 'Academic MoU'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 5: SECTOR RELATIONSHIPS (VISUAL DASHBOARDS)                       */}
        {/* ------------------------------------------------------------------------- */}
        {hasSectorRelationships && (
          <div id="sec-relationships" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">5</span>
              <span>School / College / Corporate Sector Telemetry</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* School Sector Card */}
              {hasSchoolRel && (
                <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-100 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <GraduationCap className="w-4 h-4 text-purple-700" />
                      <span>Schools Sector</span>
                    </span>
                    <div className="mt-2 space-y-1">
                      <div className="text-xl font-black text-purple-950 font-mono">
                        {org.id === 'org-delead-01' ? '44 High Schools' :
                         org.id === 'org-cybersquare-01' ? '1,000+ Schools' :
                         org.id === 'org-iri-01' ? '100+ Schools' :
                         org.id === 'org-kokos-01' ? '100+ Schools' :
                         org.id === 'org-pappiyon-01' ? '60+ Institutions' :
                         org.id === 'org-rotech-01' ? '70+ Partner Schools' :
                         org.id === 'org-evolve-01' ? 'School partnerships: Not independently verified' :
                         org.id === 'org-isq-01' ? 'School partnerships: Not independently verified' :
                         org.id === 'org-naturenurture-01' ? 'School partnerships: Not independently verified in Kozhikode (350+ National)' :
                         org.id === 'org-robuverse-01' ? 'School partnerships: Specific school names not publicly disclosed' :
                         org.id === 'org-stemxpert-01' ? 'School partnerships: Specific school names not publicly disclosed' :
                         org.id === 'org-qfactory-01' ? '2 Documented Schools (Sree Gokulam, Bhavan\'s Chevayur)' :
                         org.id === 'org-youngminds-01' ? 'School partnerships: Specific school names not publicly disclosed' :
                         org.id === 'org-ulspaceclub-01' ? 'Documented Schools (GHSS Karapparamba & Outreach Chapters)' : 'Active School Network'}
                      </div>
                      <span className="text-xs text-slate-600 block">
                        {org.id === 'org-delead-01' ? 'Walk2Lead Robotics TechQuest' :
                         org.id === 'org-rotech-01' ? 'AI Tute K-12 STEAM & Robolabs' :
                         org.id === 'org-evolve-01' ? 'Evolve Infinity Lab (4-Year MoU Model)' :
                         org.id === 'org-isq-01' ? 'In-School Mentoring & Life-Skills Support' :
                         org.id === 'org-naturenurture-01' ? 'Turnkey Makerspaces, STEAM Labs & Integrated Curricula' :
                         org.id === 'org-robuverse-01' ? 'Turnkey Robotics & AI Labs (Package 01)' :
                         org.id === 'org-stemxpert-01' ? 'STEM-as-a-Service (Composite Skill Labs)' :
                         org.id === 'org-qfactory-01' ? 'Q Positive & School Quiz Clubs' :
                         org.id === 'org-youngminds-01' ? 'IEH School Hubs & TinkerPark Labs' :
                         org.id === 'org-ulspaceclub-01' ? 'School Astronomy & Space Club @ Campus' : 'K-12 Robotics & AI Curricula'}
                      </span>
                    </div>
                  </div>

                  {org.id === 'org-delead-01' && (
                    <div className="space-y-1 pt-2 border-t border-purple-100">
                      <span className="text-[9px] font-bold text-slate-500 uppercase">District Distribution:</span>
                      <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-white border border-purple-100">Kozhikode: 23</span>
                        <span className="px-1.5 py-0.5 rounded bg-white border border-purple-100">Malappuram: 11</span>
                        <span className="px-1.5 py-0.5 rounded bg-white border border-purple-100">Kannur: 5</span>
                        <span className="px-1.5 py-0.5 rounded bg-white border border-purple-100">Wayanad: 5</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* College Sector Card */}
              {hasCollegeRel && (
                <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Building2 className="w-4 h-4 text-blue-700" />
                      <span>Colleges & Higher Ed</span>
                    </span>
                    <div className="mt-2 space-y-1">
                      <div className="text-xl font-black text-blue-950 font-mono">
                        Academic MoUs
                      </div>
                      <span className="text-xs text-slate-600 block">
                        Faculty workshops & campus technical bootcamps
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-white text-blue-800 font-semibold border border-blue-200">
                      Engineering MoUs
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-semibold border border-blue-100">
                      Credit Courses
                    </span>
                  </div>
                </div>
              )}

              {/* Corporate Sector Card */}
              {hasCorporateRel && (
                <div className="p-4 bg-fuchsia-50/40 rounded-xl border border-fuchsia-100 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-fuchsia-900 uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Briefcase className="w-4 h-4 text-fuchsia-700" />
                      <span>Corporate & Enterprise</span>
                    </span>
                    <div className="mt-2 space-y-1">
                      <div className="text-xl font-black text-fuchsia-950 font-mono">
                        {org.id === 'org-delead-01' ? '4+ Global Clients' :
                         org.id === 'org-rotech-01' ? 'Corporate Upskilling' : 'B2B Training'}
                      </div>
                      <span className="text-xs text-slate-600 block">
                        {org.id === 'org-delead-01' ? 'India & United Arab Emirates (UAE)' :
                         org.id === 'org-rotech-01' ? 'AI Productivity & Analytics Workshops' : 'Executive Leadership & Upskilling'}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-white text-fuchsia-800 font-semibold border border-fuchsia-200">
                      Executive Programs
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-semibold border border-fuchsia-100">
                      UAE Operations
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 6: DISTRICT & GEOGRAPHIC COVERAGE (VISUAL CHIPS)                  */}
        {/* ------------------------------------------------------------------------- */}
        {hasGeographicCoverage && (
          <div id="sec-geography" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">6</span>
              <span>District & Geographic Deployment Matrix</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              {/* HQ Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Primary Headquarters:
                </span>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                  <span className="font-bold text-slate-900 text-sm">
                    {org.city}, {org.district}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">State: {org.state || 'Kerala, India'}</span>
              </div>

              {/* Regional Districts */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Active Regional Districts:
                </span>
                <div className="flex flex-wrap gap-1">
                  {splitToVisualItems(Array.isArray(org.targetDistricts) ? org.targetDistricts.join(', ') : (org.districtCoverage || org.district)).map((d, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-800 text-[11px] font-semibold">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* Global Scope */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Global & State Reach:
                </span>
                <div className="flex flex-wrap gap-1">
                  {org.id === 'org-cybersquare-01' ? (
                    ['India 🇮🇳', 'UAE 🇦🇪', 'United Kingdom 🇬🇧', 'Canada 🇨🇦'].map((cntry, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {cntry}
                      </span>
                    ))
                  ) : org.id === 'org-kokos-01' ? (
                    ['India 🇮🇳', 'UAE 🇦🇪', 'Saudi Arabia 🇸🇦', 'UK 🇬🇧', 'USA 🇺🇸'].map((cntry, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {cntry}
                      </span>
                    ))
                  ) : org.id === 'org-rotech-01' ? (
                    ['Kozhikode (HQ)', 'Malappuram', 'Kannur', 'Wayanad', 'Palakkad'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-evolve-01' ? (
                    ['Kozhikode (Hub)', 'Kochi / Ernakulam', 'Kerala'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-isq-01' ? (
                    ['Kozhikode (HQ)', 'HiLITE Business Park', 'Kerala'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-naturenurture-01' ? (
                    ['New Delhi (HQ)', 'Kozhikode (Advertised Service)', 'Kerala Regional Coverage', 'Pan-India (350+ Schools)'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-robuverse-01' ? (
                    ['Kattangal (HQ)', 'Chathamangalam / NIT Hub', 'Kozhikode District', 'South India'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-stemxpert-01' ? (
                    ['KINFRA Ramanattukara (Asia HQ)', 'Kozhikode District', 'Pan-India', 'Sharjah (UAE)', 'Doha (Qatar)'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-qfactory-01' ? (
                    ['Kozhikode (HQ)', 'Sree Gokulam Public School', "Bhavan's School Chevayur", 'Kerala Quizzing Circuit'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-youngminds-01' ? (
                    ['Kozhikode HQ (HiLITE Business Park)', 'Kerala Startup Mission Incubated', 'Kochi & Malappuram Cohorts', 'Pan-Kerala Schools'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-ulspaceclub-01' ? (
                    ['Karaparamba HQ (Vagbhadananda Mandiram)', 'UL CyberPark Tech Center', 'ISRO Registered Space Tutor', 'GHSS Karapparamba & State Schools'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : org.id === 'org-delead-01' ? (
                    ['Kerala (4 Districts)', 'UAE Corporate Track'].map((reg, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                        {reg}
                      </span>
                    ))
                  ) : (
                    <span className="px-2 py-0.5 rounded-md bg-white border border-purple-200 text-purple-900 text-[11px] font-bold">
                      Kerala Statewide Deployment
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 7: PARTNER ORGANISATIONS (VISUAL CARDS)                           */}
        {/* ------------------------------------------------------------------------- */}
        {hasPartnerOrganisations && (
          <div id="sec-partners" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">7</span>
              <span>Partner Ecosystem & Collaborations</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {connectedEcosystemPartners.map(partner => (
                <div key={partner.id} className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">{partner.name}</span>
                    <span className="text-slate-600 text-[11px]">{partner.role}</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0 font-mono">
                    {partner.relationshipType}
                  </span>
                </div>
              ))}
              {org.fundingPartners && (
                <div className="p-3.5 bg-purple-50/40 rounded-xl border border-purple-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="font-bold text-purple-950 text-xs block">Funding & CSR Sponsor</span>
                    <span className="text-slate-600 text-[11px]">{org.fundingPartners}</span>
                  </div>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 shrink-0 font-mono">
                    CSR Grant
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 8: PROGRAMME DURATION & PRICING (VISUAL COMMERCIAL CARDS)         */}
        {/* ------------------------------------------------------------------------- */}
        {hasDurationPricing && (
          <div id="sec-pricing" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-purple-50 pb-2.5">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">8</span>
                <span>Commercial Pricing & Duration Architecture</span>
              </h2>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Institutional Licensing
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
              {/* 1. Commercial Pricing Tier Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1 mb-1">
                    <DollarSign className="w-3.5 h-3.5 text-purple-600" />
                    <span>Pricing Architecture</span>
                  </span>
                  <div className="font-bold text-slate-900 text-sm leading-snug">
                    {org.pricing || 'Institutional Annual Subscription Tier'}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-semibold border border-purple-200">
                    Annual Licensing
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-semibold border border-slate-200">
                    Per-Student Bundled
                  </span>
                </div>
              </div>

              {/* 2. Delivery Format Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1 mb-1">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Deployment Format</span>
                  </span>
                  <div className="font-bold text-slate-900 text-sm leading-snug">
                    {org.deliveryMethod || 'On-Campus Labs + Digital LMS Platform'}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                    Turnkey Lab Setup
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-slate-700 font-semibold border border-slate-200">
                    Deputed Mentors
                  </span>
                </div>
              </div>

              {/* 3. Duration Spectrum Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Duration Spectrum</span>
                  </span>
                  <div className="space-y-1.5 mt-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600">⚡ Short Bootcamps:</span>
                      <strong className="text-slate-900">1–3 Days</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600">📅 Term Add-ons:</span>
                      <strong className="text-slate-900">3–6 Months</strong>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-600">🎓 Academic Curricula:</span>
                      <strong className="text-slate-900">9–12 Months</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 9: COMPETITIVE STRATEGY, OPPORTUNITIES & THREATS (BATTLECARDS)   */}
        {/* ------------------------------------------------------------------------- */}
        {hasCompetitivePositioning && (
          <div id="sec-positioning" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-purple-50 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">9</span>
                <span>Competitive Battlecard & MYST Strategic Radar</span>
              </h2>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Actionable Intelligence
              </span>
            </div>

            {/* A. Strategic Role & Market Positioning Card */}
            <div className="p-4 bg-gradient-to-r from-purple-50/60 via-slate-50 to-purple-50/40 rounded-xl border border-purple-200/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-purple-950 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-purple-700" />
                  <span>Strategic Archetype Profile</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-700 text-white font-mono">
                  {strategyRecord?.threats?.[0]?.severity === 'High' ? 'High Threat Competitor' : 'Active Market Player'}
                </span>
              </div>

              {/* 3 Metric Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-purple-100">
                  <span className="text-slate-400 font-bold uppercase block text-[9px] font-mono">Target Audience</span>
                  <span className="text-slate-900 font-bold block truncate">{strategyRecord?.targetAudience || org.targetAudience || 'K-12 Students & Management'}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-purple-100">
                  <span className="text-slate-400 font-bold uppercase block text-[9px] font-mono">Commercial Tier</span>
                  <span className="text-slate-900 font-bold block truncate">{strategyRecord?.pricingTier || org.pricing || 'Annual School Retainer'}</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-purple-100">
                  <span className="text-slate-400 font-bold uppercase block text-[9px] font-mono">Market Footprint</span>
                  <span className="text-slate-900 font-bold block truncate">{strategyRecord?.marketPresence || `${org.city || org.district}, Kerala`}</span>
                </div>
              </div>
            </div>

            {/* B. Visual Battlecards Grid: Opportunities vs Threats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* Opportunities for MYST (Emerald Visual Battlecards) */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-emerald-900">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
                    Opportunities for MYST (Attack Vectors)
                  </h3>
                </div>

                <div className="space-y-3">
                  {(strategyRecord?.opportunities || [
                    {
                      id: 'opp-def-01',
                      title: 'Autonomous AI Agents & Modern Software Engineering Gaps',
                      type: 'Product Gap',
                      description: `While ${org.name} concentrates on standard syllabi or traditional training, MYST can capture premium schools and learners with production-grade AI Agent and full-stack modules.`,
                      potentialImpact: 'High',
                      source: 'Curriculum Audit'
                    },
                    {
                      id: 'opp-def-02',
                      title: 'Continuous Accredited Year-Long Academic Partnerships',
                      type: 'Model Gap',
                      description: 'Offer structured 9-month institutional curriculum add-ons with student GitHub credentials, grading portfolios, and teacher accreditation.',
                      potentialImpact: 'Medium',
                      source: 'Market Intelligence'
                    }
                  ]).map((opp, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-white rounded-xl border-l-4 border-l-emerald-500 border border-emerald-100/80 shadow-2xs space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{opp.title}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-emerald-100 text-emerald-900 shrink-0">
                          {opp.type}
                        </span>
                      </div>

                      {/* MYST Play / Opportunity Container */}
                      <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-200/80 text-[11px] text-emerald-950 font-medium">
                        <strong>MYST Advantage Move:</strong> {opp.description}
                      </div>

                      <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span className="text-emerald-800 font-bold">●●● Impact: {opp.potentialImpact}</span>
                        <span>Source: {opp.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threats & Competitive Risks (Rose Visual Risk Cards) */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-rose-900">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider font-mono">
                    Threats & Competitor Moats (Defense Vectors)
                  </h3>
                </div>

                <div className="space-y-3">
                  {(strategyRecord?.threats || [
                    {
                      id: 'thr-def-01',
                      title: 'Established Local Footprint & Brand Familiarity',
                      type: 'Market Barrier',
                      description: `${org.name} has existing relationships, campus presence, and alumni trust in ${org.district || 'the region'}, creating resistance for external entrants.`,
                      severity: 'Medium',
                      source: 'Institutional Footprint'
                    },
                    {
                      id: 'thr-def-02',
                      title: 'Aggressive Pricing / Subsidized Institutional Moats',
                      type: 'Commercial Risk',
                      description: org.strengths || 'Competitor leverages established brand reputation and low-barrier entry programs to lock in partner institutions.',
                      severity: 'Medium',
                      source: 'Industry Audit'
                    }
                  ]).map((thr, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 bg-white rounded-xl border-l-4 border-l-rose-500 border border-rose-100/80 shadow-2xs space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>{thr.title}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-black font-mono bg-rose-100 text-rose-900 shrink-0">
                          {thr.type}
                        </span>
                      </div>

                      {/* Competitor Moat Container */}
                      <div className="p-2.5 bg-rose-50/70 rounded-lg border border-rose-200/80 text-[11px] text-rose-950 font-medium">
                        <strong>Competitor Defense:</strong> {thr.description}
                      </div>

                      <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span className="text-rose-800 font-bold">●●○ Severity: {thr.severity}</span>
                        <span>Source: {thr.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* C. Side-by-Side Visual Differentiation Matrix */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-purple-600" />
                  <span>Head-to-Head Visual Differentiation vs MYST International</span>
                </h3>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  MYST Superiority Index
                </span>
              </div>

              <div className="space-y-2.5">
                {(strategyRecord?.differentiation || [
                  {
                    pillar: 'Core Services',
                    competitor: org.services || org.servicesOffered || 'Syllabus-bound coaching and conventional STEM/IT workshops.',
                    myst: 'Comprehensive Autonomous AI Agents, GenAI engineering, and accredited institutional curricula.'
                  },
                  {
                    pillar: 'Technology Stack',
                    competitor: org.coursesTechnologies?.join(', ') || 'Basic programming, standard electronics kits, or foundational web dev.',
                    myst: 'Autonomous AI Agents, PyTorch, modern web architectures, and production cloud sandboxes.'
                  },
                  {
                    pillar: 'Target Customers',
                    competitor: org.targetAudience || 'General student batches and local institutional inquiries.',
                    myst: 'Premium CBSE/ICSE schools, engineering colleges, and career transitioners.'
                  },
                  {
                    pillar: 'Delivery Model',
                    competitor: org.deliveryMethod || 'Traditional classroom sessions and short camp workshops.',
                    myst: 'Year-long accredited add-ons, continuous software portfolios, and verified GitHub credentials.'
                  },
                  {
                    pillar: 'Unique Selling Proposition',
                    competitor: org.strengths || 'Established regional presence and trusted local identity.',
                    myst: 'Cutting-edge AI engineering, verified real-world code output, and elite corporate readiness.'
                  }
                ]).map((row, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl border border-purple-100 bg-white grid grid-cols-1 md:grid-cols-12 gap-3 items-center shadow-2xs"
                  >
                    {/* Pillar Badge */}
                    <div className="md:col-span-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono block">
                        Strategic Pillar
                      </span>
                      <strong className="text-slate-900 text-xs font-bold">{row.pillar}</strong>
                    </div>

                    {/* Competitor Limitation */}
                    <div className="md:col-span-4 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                      <span className="text-[9px] font-bold text-slate-500 uppercase block mb-0.5 flex items-center gap-1 font-mono">
                        <XCircle className="w-3 h-3 text-slate-400" />
                        <span>{org.name}</span>
                      </span>
                      <span className="text-slate-700 leading-snug text-[11px] block">{row.competitor}</span>
                    </div>

                    {/* MYST Advantage */}
                    <div className="md:col-span-5 p-2.5 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 text-xs">
                      <span className="text-[9px] font-black text-purple-900 uppercase block mb-0.5 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
                        <span>MYST International Decisive Advantage</span>
                      </span>
                      <span className="text-purple-950 font-bold leading-snug text-[11px] block">{row.myst}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* D. Evidence-Based Breakdown (Verified Facts vs AI Assessments) */}
            {(strategyRecord?.verifiedFacts || strategyRecord?.aiAssessments) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 uppercase font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Factual Discoveries</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {strategyRecord.verifiedFacts.map((fact, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/30 border border-purple-200/70 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 uppercase font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>AI Strategic Assessments</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {strategyRecord.aiAssessments.map((ass, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5" />
                        <span className="leading-snug">{ass}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 10: RESEARCH FINDINGS (VISUAL DISCOVERY CARDS)                    */}
        {/* ------------------------------------------------------------------------- */}
        {hasFindings && (
          <div id="sec-findings" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">10</span>
              <span>Research Findings ({orgFindings.length})</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {orgFindings.map(f => (
                <div key={f.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{f.title}</span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      {f.category}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* SECTION 11: SOURCES AND VERIFICATION (VISUAL TILES)                       */}
        {/* ------------------------------------------------------------------------- */}
        {hasSourcesVerification && (
          <div id="sec-sources" className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
              <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 font-mono text-xs flex items-center justify-center font-bold">11</span>
              <span>Sources and Verification Dossier</span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                {org.website && (
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 font-bold border border-purple-200 hover:bg-purple-100 transition-colors shadow-2xs"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {org.walk2leadWebsite && (
                  <a
                    href={org.walk2leadWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 hover:bg-indigo-100 transition-colors shadow-2xs"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Walk2Lead Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {org.tinkerChampsWebsite && (
                  <a
                    href={org.tinkerChampsWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 text-violet-700 font-bold border border-violet-200 hover:bg-violet-100 transition-colors shadow-2xs"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>TinkerChamps Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Visual Evidence Items if any */}
              {orgEvidence.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 font-mono">
                    Verified Visual Evidence Artifacts ({orgEvidence.length}):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {orgEvidence.map(item => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedEvidence(item)}
                        className="group cursor-pointer rounded-xl border border-purple-100 overflow-hidden bg-slate-900 h-24 relative shadow-2xs"
                      >
                        <img src={item.fileUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-purple-900/40 flex items-center justify-center transition-colors">
                          <Maximize2 className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* EVIDENCE & FINDINGS MODALS                                                */}
      {/* ========================================================================= */}
      {isAddEvidenceOpen && (
        <EvidenceCropModal
          isOpen={isAddEvidenceOpen}
          onClose={() => setIsAddEvidenceOpen(false)}
          onSave={handleSaveEvidence}
          currentOrgId={org.id}
          currentOrgName={org.name}
          availableFindings={orgFindings}
        />
      )}

      {selectedEvidence && (
        <EvidenceViewerModal
          evidence={selectedEvidence}
          isOpen={!!selectedEvidence}
          onClose={() => setSelectedEvidence(null)}
          onDelete={(id) => {
            deleteEvidence(id);
            setSelectedEvidence(null);
          }}
          onLinkFindings={() => {
            const ev = selectedEvidence;
            setSelectedEvidence(null);
            handleOpenLinkModal(ev);
          }}
          onCreateFinding={() => {
            const evId = selectedEvidence.id;
            setSelectedEvidence(null);
            handleCreateNewFindingForEvidence(evId);
          }}
        />
      )}

      {isFindingModalOpen && (
        <AddEditFindingModal
          isOpen={isFindingModalOpen}
          onClose={() => {
            setIsFindingModalOpen(false);
            setEditingFinding(null);
          }}
          onSave={handleSaveFinding}
          initialData={editingFinding}
          currentOrgId={org.id}
          currentOrgName={org.name}
          availableEvidence={orgEvidence}
        />
      )}

      {isLinkModalOpen && linkingEvidence && (
        <LinkFindingToEvidenceModal
          isOpen={isLinkModalOpen}
          onClose={() => {
            setIsLinkModalOpen(false);
            setLinkingEvidence(null);
          }}
          evidence={linkingEvidence}
          findings={findings}
          onSave={(evidenceId, linkedFindingIds) => {
            setFindingsForEvidence(evidenceId, linkedFindingIds);
            setIsLinkModalOpen(false);
            setLinkingEvidence(null);
          }}
        />
      )}

    </div>
  );
}
