import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  MapPin, 
  Building, 
  Globe, 
  ShieldCheck, 
  Clock, 
  Briefcase, 
  Award, 
  Handshake, 
  Target, 
  FileCheck2, 
  AlertTriangle,
  Sparkles,
  Layers
} from 'lucide-react';
import { VERIFICATION_STATUSES } from '../data/models';

export function CompetitorProfileModal({ 
  org, 
  onClose, 
  onEdit, 
  onDelete 
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'education', 'partnerships', 'swot', 'sources'

  if (!org) return null;

  const verificationBadge = VERIFICATION_STATUSES.find(v => v.id === org.verificationStatus) || VERIFICATION_STATUSES[2];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Profile Header */}
        <div className="p-5 sm:p-6 bg-[#0c0a17] text-white border-b border-purple-950 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-900 text-white font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-950/60 border border-purple-400/30">
              {org.logoText || org.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950 text-purple-200 border border-purple-700">
                  {org.segment.replace('_', ' ')}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  org.competitiveRelevance === 'Direct'
                    ? 'bg-rose-950 text-rose-200 border-rose-700'
                    : org.competitiveRelevance === 'Potential Partner'
                    ? 'bg-amber-950 text-amber-200 border-amber-700'
                    : 'bg-purple-950/80 text-purple-300 border-purple-800'
                }`}>
                  {org.competitiveRelevance} Competitor
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border flex items-center gap-1 ${
                  org.verificationStatus === 'verified'
                    ? 'bg-emerald-950 text-emerald-200 border-emerald-700'
                    : 'bg-amber-950 text-amber-200 border-amber-700'
                }`}>
                  <CheckCircle2 className="w-3 h-3" />
                  {org.verificationStatus === 'verified' ? 'Verified Evidence' : 'Company Reported'}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {org.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-purple-300/80 mt-1.5">
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  {org.city}, {org.district}, {org.state}, {org.country}
                </span>
                {org.website && (
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-purple-300 hover:text-white hover:underline"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Official Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onEdit(org)}
              className="p-2 text-purple-400 hover:text-white hover:bg-purple-950/60 rounded-lg transition-all"
              title="Edit Profile"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(org.id, org.name)}
              className="p-2 text-purple-400 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition-all"
              title="Delete Record"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-purple-400 hover:text-white hover:bg-purple-950/60 rounded-lg transition-all"
              title="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="px-6 bg-purple-50/50 border-b border-purple-100 flex items-center gap-4 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-purple-600 text-purple-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-purple-950'
            }`}
          >
            Overview & Organisation Details
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`py-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'education'
                ? 'border-purple-600 text-purple-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-purple-950'
            }`}
          >
            Educational & Tech Offerings
          </button>
          <button
            onClick={() => setActiveTab('partnerships')}
            className={`py-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'partnerships'
                ? 'border-purple-600 text-purple-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-purple-950'
            }`}
          >
            Institutional Partnerships
          </button>
          <button
            onClick={() => setActiveTab('swot')}
            className={`py-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'swot'
                ? 'border-purple-600 text-purple-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-purple-950'
            }`}
          >
            SWOT & EDGE Relevance
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`py-3 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'sources'
                ? 'border-purple-600 text-purple-900 font-bold'
                : 'border-transparent text-slate-600 hover:text-purple-950'
            }`}
          >
            Research Citations & Audit
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs text-slate-700">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">Company Overview</h3>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {org.companyOverview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Target Student / Client Audience
                  </span>
                  <p className="font-medium text-slate-900">
                    {org.targetAudience}
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Address & Campus Location
                  </span>
                  <p className="font-medium text-slate-900">
                    {org.address}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5">Commercial & Core Services Offered</h3>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  {org.servicesOffered}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: EDUCATIONAL OFFERINGS */}
          {activeTab === 'education' && (
            <div className="space-y-4">
              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200">
                <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block mb-1">
                  Educational & Training Activities (Assessed Separately from Business Services)
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {org.educationalActivities || org.servicesOffered}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-2">Technologies & Curriculum Focus:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {(org.coursesTechnologies || []).map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg font-semibold bg-slate-100 text-slate-800 border border-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Programme Durations</span>
                  <strong className="text-slate-900 mt-1 block">
                    {(org.programmeDurations || []).join(', ')}
                  </strong>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Delivery Method</span>
                  <strong className="text-slate-900 mt-1 block">
                    {org.deliveryMethod}
                  </strong>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Pricing / Tuition</span>
                  <strong className="text-slate-900 mt-1 block">
                    {org.pricing || 'Upon enquiry'}
                  </strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Internships</span>
                  <span className={`mt-1 font-bold inline-block ${org.internships ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {org.internships ? 'Yes, Included' : 'None'}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{org.internshipsDetails}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Certifications</span>
                  <span className={`mt-1 font-bold inline-block ${org.certifications ? 'text-purple-700' : 'text-slate-400'}`}>
                    {org.certifications ? 'Yes, Issued' : 'None'}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{org.certificationsDetails}</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Placement Support</span>
                  <span className={`mt-1 font-bold inline-block ${org.placementSupport ? 'text-blue-700' : 'text-slate-400'}`}>
                    {org.placementSupport ? 'Active Assistance' : 'None'}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-0.5">{org.placementDetails}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PARTNERSHIPS */}
          {activeTab === 'partnerships' && (
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Institutional Linkages & MoUs:</h3>
              {(!org.institutionalPartnerships || org.institutionalPartnerships.length === 0) ? (
                <div className="p-6 bg-slate-50 rounded-xl text-center text-slate-500 text-xs">
                  No active institutional partnerships documented for this organisation.
                </div>
              ) : (
                <div className="space-y-2">
                  {org.institutionalPartnerships.map((ptn, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Handshake className="w-4 h-4 text-blue-700" />
                        <span className="font-semibold text-slate-900">{ptn}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Documented
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SWOT & EDGE RELEVANCE */}
          {activeTab === 'swot' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-1.5">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                    Core Strengths & Market Advantages
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {org.strengths}
                  </p>
                </div>

                <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200 space-y-1.5">
                  <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                    Weaknesses, Gaps & Vulnerabilities
                  </span>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {org.weaknesses}
                  </p>
                </div>
              </div>

              <div className="bg-[#0c0a17] text-white p-5 rounded-2xl border border-purple-900/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
                  <Target className="w-4 h-4 text-amber-300" />
                  <span>Strategic Relevance & Positioning for MYST Edge</span>
                </div>
                <h4 className="text-sm font-bold text-white">
                  Classification: {org.competitiveRelevance} Competitor
                </h4>
                <p className="text-xs text-purple-200/80 leading-relaxed">
                  {org.relevanceReason}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: CITATIONS & AUDIT */}
          {activeTab === 'sources' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Audited Research Sources:</h3>
                <span className="text-xs text-slate-500">
                  Verification: <strong className="text-purple-900 capitalize">{org.verificationStatus.replace('_', ' ')}</strong>
                </span>
              </div>

              {(!org.researchSources || org.researchSources.length === 0) ? (
                <div className="p-6 bg-purple-50/40 rounded-xl text-center text-slate-500 text-xs">
                  No source citations recorded.
                </div>
              ) : (
                <div className="space-y-3">
                  {org.researchSources.map((src, idx) => (
                    <div key={idx} className="p-3.5 bg-purple-50/30 rounded-xl border border-purple-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{src.title}</span>
                        <span className="text-[11px] text-slate-400">{src.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 italic">"{src.notes}"</p>
                      {src.url && (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-purple-700 hover:text-purple-900 hover:underline flex items-center gap-1 text-[11px] pt-1 font-semibold"
                        >
                          <span>Evidence URL</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-purple-50/50 border-t border-purple-100 flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">
            Record ID: <code className="font-mono text-purple-700">{org.id}</code>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg text-xs shadow-xs"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

