import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Landmark, 
  Building2, 
  Cpu, 
  Plus, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Briefcase, 
  AlertTriangle,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { SEGMENTS } from '../data/models';

export function SegmentView({ 
  segmentId, 
  onSelectOrg, 
  onEditOrg, 
  onOpenAddModal 
}) {
  const { filteredOrganisations, exportToCSV } = useData();

  const segmentConfig = SEGMENTS.find(s => s.id === segmentId) || SEGMENTS[0];

  // Filter organisations belonging to this segment and matching active slicers
  const segmentOrgs = filteredOrganisations.filter(o => o.segment === segmentId);

  // Dynamic metrics for this segment
  const directCount = segmentOrgs.filter(o => o.competitiveRelevance === 'Direct').length;
  const partnerCount = segmentOrgs.filter(o => o.competitiveRelevance === 'Potential Partner').length;
  const internshipCount = segmentOrgs.filter(o => o.internships).length;
  const verifiedCount = segmentOrgs.filter(o => o.verificationStatus === 'verified').length;

  // Segment-specific guidance instructions
  const getSegmentGuidance = () => {
    switch (segmentId) {
      case 'schools':
        return {
          title: "Category A: Schools (K-12)",
          description: "Schools offering AI, coding, robotics, and technology labs. Focus on external education providers working with schools, Atal Tinkering Labs (ATLs), and teacher training gaps.",
          edgeAngle: "EDGE Opportunity: Turnkey 'Young AI Technologists' curriculum licensing and certified teacher enablement without heavy hardware costs.",
          warning: null
        };
      case 'higher_secondary':
        return {
          title: "Category B: Higher Secondary Schools (Plus One & Plus Two)",
          description: "Plus One and Plus Two institutions offering Computer Science, Informatics Practices, AI add-on programmes, and vacation bridge courses.",
          edgeAngle: "EDGE Opportunity: Vacation accelerators and weekend foundation cohorts in Python, Generative AI, and Data Analytics before students enter university.",
          warning: null
        };
      case 'colleges':
        return {
          title: "Category C: Colleges & Higher Education",
          description: "Arts & Science colleges, Engineering institutions, and Autonomous academic bodies. Includes industry-academia partnerships, add-on diplomas, and KTU/University credit courses.",
          edgeAngle: "EDGE Opportunity: Accredited 3 to 6-month Add-on Diplomas in AI Agents and Data Analytics for final-year students, particularly non-engineering quantitative grads.",
          warning: null
        };
      case 'training_institutes':
        return {
          title: "Category D: Independent Training & Skill Development Institutes",
          description: "Private academies, finishing schools, and coding bootcamps. Focus on 3, 4, 6, 8, and 12-month career-oriented programmes in AI, Data Science, Python, and Full Stack.",
          edgeAngle: "EDGE Opportunity: Direct competitor benchmark. Differentiate via cutting-edge Generative AI & Autonomous Agent curricula vs their outdated 2019 machine learning syllabi.",
          warning: null
        };
      case 'agencies_edtech':
        return {
          title: "Category E: Agencies, IT Companies & EdTech Providers",
          description: "Organisations combining business services (digital marketing, custom software development) with training academies or corporate internships; plus EdTech learning platforms.",
          edgeAngle: "EDGE Opportunity: Corporate apprenticeships and agency guest evaluations. Distinguish pure B2B IT/marketing services from genuine training programs.",
          warning: "Strict Categorisation Rule: Do not classify a company that solely provides commercial client services as a direct EDGE competitor. Assess its educational and training activities separately."
        };
      default:
        return { title: "", description: "", edgeAngle: "", warning: null };
    }
  };

  const guidance = getSegmentGuidance();

  return (
    <div className="space-y-6">
      {/* Category Banner */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-purple-700 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md shadow-purple-600/30">
              {segmentConfig.code}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-purple-50 text-purple-900 rounded border border-purple-200">
                  Segment {segmentConfig.code}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {segmentConfig.name}
                </span>
              </div>
              <h1 className="text-lg lg:text-xl font-bold text-slate-900">
                {guidance.title}
              </h1>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                {guidance.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => exportToCSV('organisations')}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-purple-50/50 border border-slate-200 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Segment CSV</span>
            </button>
            <button
              onClick={onOpenAddModal}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-lg shadow-sm shadow-purple-600/30 flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Record</span>
            </button>
          </div>
        </div>

        {/* Warning Banner for Agencies & IT Companies */}
        {guidance.warning && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Classification Protocol:</strong> {guidance.warning}
            </div>
          </div>
        )}

        {/* Strategic Angle Callout */}
        <div className="mt-3 p-3 rounded-xl bg-purple-50/50 border border-purple-200/80 flex items-start gap-2.5 text-xs text-slate-700">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-purple-950">Strategic Positioning for MYST Edge:</strong>{' '}
            {guidance.edgeAngle}
          </div>
        </div>
      </div>

      {/* Segment Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">Total in Segment</span>
          <div className="text-xl font-bold text-slate-900 mt-0.5">{segmentOrgs.length}</div>
          <span className="text-[10px] text-slate-400">Researched entities</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">Direct Competitors</span>
          <div className="text-xl font-bold text-rose-700 mt-0.5">{directCount}</div>
          <span className="text-[10px] text-slate-400">Competing directly with EDGE</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">Potential Partners</span>
          <div className="text-xl font-bold text-amber-700 mt-0.5">{partnerCount}</div>
          <span className="text-[10px] text-slate-400">Suitable for institutional MoUs</span>
        </div>
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-medium text-slate-500">Verified Evidence</span>
          <div className="text-xl font-bold text-emerald-700 mt-0.5">{verifiedCount}</div>
          <span className="text-[10px] text-slate-400">Supported by published audit</span>
        </div>
      </div>

      {/* Organisations in this Segment */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
          <h2 className="text-sm font-bold text-slate-900">
            Researched Entities in {segmentConfig.name} ({segmentOrgs.length})
          </h2>
          <span className="text-xs text-slate-500">
            Sorted by relevance to EDGE
          </span>
        </div>

        {segmentOrgs.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No organisations in this segment match the current active slicers. Try adjusting your district or tech filters.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {segmentOrgs.map(org => (
              <div
                key={org.id}
                onClick={() => onSelectOrg(org)}
                className="p-4 hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {org.logoText || org.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm hover:text-blue-700">
                        {org.name}
                      </h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                        org.competitiveRelevance === 'Direct'
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : org.competitiveRelevance === 'Potential Partner'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {org.competitiveRelevance}
                      </span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-slate-500 text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {org.city}, {org.district}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
                      {org.companyOverview}
                    </p>

                    {/* Educational activities */}
                    <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-150">
                      <strong className="text-slate-800">Training & Educational Arm:</strong>{' '}
                      {org.educationalActivities || org.servicesOffered}
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap items-center gap-1 mt-2.5">
                      {(org.coursesTechnologies || []).map(t => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side info */}
                <div className="flex lg:flex-col items-end justify-between lg:justify-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-0 border-slate-100">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 border ${
                    org.verificationStatus === 'verified'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : org.verificationStatus === 'company_reported'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}>
                    <CheckCircle2 className="w-3 h-3" />
                    {org.verificationStatus === 'verified' ? 'Verified Evidence' : 'Company Reported'}
                  </span>
                  
                  <div className="text-[11px] text-slate-500 font-medium">
                    Duration: {(org.programmeDurations || []).slice(0, 1).join('') || 'Modular'}
                  </div>

                  <span className="text-xs text-blue-700 font-semibold hover:underline flex items-center gap-1">
                    <span>Inspect Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

