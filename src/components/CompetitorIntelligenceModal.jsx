import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  MapPin, 
  Globe, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  GraduationCap, 
  Briefcase, 
  Cpu, 
  BookOpen, 
  Handshake, 
  Layers, 
  Sparkles, 
  Target, 
  Compass, 
  Linkedin, 
  Youtube, 
  Instagram, 
  ArrowRight,
  Bookmark,
  Camera,
  FileText
} from 'lucide-react';
import { getOrgCategory } from '../data/models';

export function CompetitorIntelligenceModal({ 
  org, 
  isOpen, 
  onClose, 
  onOpenFullDossier 
}) {
  const [activeSection, setActiveSection] = useState('overview'); // 'overview' | 'services' | 'presence' | 'intelligence' | 'sources'

  if (!isOpen || !org) return null;

  const category = getOrgCategory(org);
  const isVerified = org.verificationStatus === 'verified';
  const foundedYear = org.foundedYear || (org.createdDate ? 'Est. Verified' : 'Not Available');
  const hqLocation = org.address || `${org.city || 'Kozhikode'}, ${org.district}, Kerala, India`;

  // Safely extract client institutions
  const clientList = Array.isArray(org.institutionalPartnerships)
    ? org.institutionalPartnerships
    : org.institutionalPartnerships
    ? [org.institutionalPartnerships]
    : [];

  const socialLinks = org.socialLinks || {
    linkedin: org.website ? `${org.website.replace(/\/$/, '')}/company` : null,
    youtube: null,
    instagram: null
  };

  const getRelevanceBadge = () => {
    switch (org.competitiveRelevance) {
      case 'Direct':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            Direct Competitor
          </span>
        );
      case 'Potential Partner':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
            Potential Institutional Partner
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Indirect Rival
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-white min-h-screen shadow-2xl flex flex-col border-l border-purple-200/80 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Drawer Top Bar */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-[#0c0a1a] via-[#16122d] to-[#0c0a1a] text-white px-6 py-4 flex items-center justify-between border-b border-purple-900/60 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 text-white font-black text-sm flex items-center justify-center shadow-inner">
              {org.logoText || org.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[9px] tracking-widest text-purple-300 uppercase font-bold">
                  INTELLIGENCE DOSSIER
                </span>
                <span className="text-purple-400">•</span>
                <span className="text-[11px] font-semibold text-purple-200">
                  {category}
                </span>
              </div>
              <h2 className="text-base font-bold text-white tracking-tight line-clamp-1">
                {org.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenFullDossier && onOpenFullDossier(org)}
              className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Open Complete Research Studio & Evidence Vault"
            >
              <span>Full Dossier</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        <div className={`px-6 py-2.5 text-xs font-medium flex items-center justify-between border-b ${
          isVerified 
            ? 'bg-emerald-50/90 text-emerald-800 border-emerald-200' 
            : 'bg-amber-50/90 text-amber-800 border-amber-200'
        }`}>
          <div className="flex items-center gap-2">
            {isVerified ? (
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>
              {isVerified
                ? 'Verified Intelligence: Cross-referenced with published prospectuses, institutional MoUs, and public records.'
                : 'Preliminary Intelligence: Company-reported or under active verification by Edge research desk.'}
            </span>
          </div>
          <span className="font-mono text-[11px] font-bold shrink-0 ml-2">
            {org.district}, Kerala
          </span>
        </div>

        {/* Intelligence Navigation Tabs */}
        <div className="px-6 border-b border-purple-100 bg-purple-50/30 flex items-center gap-1 overflow-x-auto text-xs py-2">
          {[
            { id: 'overview', label: 'Overview', icon: Building2 },
            { id: 'services', label: 'Services & Tech', icon: Cpu },
            { id: 'presence', label: 'Market Presence', icon: MapPin },
            { id: 'intelligence', label: 'Competitive Strategy', icon: Target },
            { id: 'sources', label: 'Sources & Evidence', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-purple-900 hover:bg-purple-100/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-300' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Intelligence Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-slate-800 text-xs leading-relaxed">
          {/* TAB 1: OVERVIEW */}
          {activeSection === 'overview' && (
            <div className="space-y-5">
              {/* Top Summary Card */}
              <div className="bg-purple-50/40 rounded-2xl p-5 border border-purple-100/80">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {getRelevanceBadge()}
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-purple-900 border border-purple-200">
                      {org.orgType || category}
                    </span>
                  </div>
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 hover:text-purple-900 hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{org.website.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed">
                  {org.companyOverview || 'Detailed company overview under active compilation by Edge research analysts.'}
                </p>
              </div>

              {/* Key Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Headquarters & Location
                  </span>
                  <div className="flex items-start gap-2 text-slate-800 font-medium">
                    <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{hqLocation}</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Target Audience
                  </span>
                  <div className="flex items-start gap-2 text-slate-800 font-medium">
                    <Users className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{org.targetAudience || 'Students and academic institutions'}</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Delivery Model
                  </span>
                  <div className="flex items-start gap-2 text-slate-800 font-medium">
                    <Briefcase className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>{org.deliveryMethod || 'Offline (Classroom / Lab)'}</span>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Establishment / Research Date
                  </span>
                  <div className="flex items-start gap-2 text-slate-800 font-medium">
                    <Calendar className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <span>Last Verified: {org.createdDate || '2026-03-01'}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Presence */}
              <div className="p-4 bg-white rounded-xl border border-purple-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Digital Footprint & Social Links
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Official Website</span>
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn Profile</span>
                    </a>
                  )}
                  <span className="text-[11px] text-slate-400 italic">
                    Public channels actively monitored for curriculum announcements.
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SERVICES & TECH */}
          {activeSection === 'services' && (
            <div className="space-y-5">
              {/* Technologies Covered */}
              <div className="p-4 bg-white rounded-xl border border-purple-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Core Technologies & Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {(org.coursesTechnologies || []).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-900 border border-purple-200 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                      {tech}
                    </span>
                  ))}
                  {(!org.coursesTechnologies || org.coursesTechnologies.length === 0) && (
                    <span className="text-slate-400 italic">No specific technologies catalogued yet.</span>
                  )}
                </div>
              </div>

              {/* Services Offered */}
              <div className="p-4 bg-white rounded-xl border border-purple-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Services & Solutions Delivered
                </span>
                <p className="text-slate-800 text-xs font-medium leading-relaxed">
                  {org.servicesOffered || 'Not Available'}
                </p>
              </div>

              {/* Educational Activities / Training Programs */}
              <div className="p-4 bg-white rounded-xl border border-purple-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Educational & Academic Offerings
                </span>
                <p className="text-slate-800 text-xs leading-relaxed">
                  {org.educationalActivities || 'Not Available'}
                </p>
              </div>

              {/* Programme Durations & Pricing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Programme Durations
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(org.programmeDurations || ['Short-term (1-4 Weeks)']).map((dur, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                        {dur}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Commercials & Pricing Structure
                  </span>
                  <p className="text-slate-800 text-xs font-semibold mt-1">
                    {org.pricing || 'Not Available (Institutional Negotiation)'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MARKET PRESENCE */}
          {activeSection === 'presence' && (
            <div className="space-y-5">
              {/* Geographic Footprint */}
              <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-100">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Operating Districts & Coverage
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {org.district} District • {org.city}
                    </div>
                    <div className="text-xs text-slate-500">
                      Primary presence in Malabar / Kerala Central region
                    </div>
                  </div>
                </div>
              </div>

              {/* Institutional Partnerships & Clients */}
              <div className="p-4 bg-white rounded-xl border border-purple-100">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                  Known Client Institutions & Strategic MoUs ({clientList.length})
                </span>

                {clientList.length > 0 ? (
                  <div className="space-y-2">
                    {clientList.map((partner, index) => {
                      const name = typeof partner === 'string' ? partner : (partner.name || partner.institutionName);
                      return (
                        <div
                          key={index}
                          className="p-3 bg-purple-50/30 rounded-lg border border-purple-100/80 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-2">
                            <Handshake className="w-4 h-4 text-purple-600 shrink-0" />
                            <span className="font-semibold text-slate-900">{name}</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                            Verified MoU
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-xs">
                    No public institutional MoUs published. Serves direct consumer / student walk-ins.
                  </p>
                )}
              </div>

              {/* Placement & Internship Capabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Internship Integration
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className={`w-4 h-4 ${org.internships ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>{org.internships ? 'Mandatory Project Internship' : 'Not Provided'}</span>
                  </div>
                  {org.internshipsDetails && (
                    <p className="text-[11px] text-slate-500 mt-1">{org.internshipsDetails}</p>
                  )}
                </div>

                <div className="p-4 bg-white rounded-xl border border-purple-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Placement Support
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className={`w-4 h-4 ${org.placementSupport ? 'text-emerald-600' : 'text-slate-300'}`} />
                    <span>{org.placementSupport ? 'Placement Support Active' : 'No Direct Placement'}</span>
                  </div>
                  {org.placementDetails && (
                    <p className="text-[11px] text-slate-500 mt-1">{org.placementDetails}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: COMPETITIVE STRATEGY */}
          {activeSection === 'intelligence' && (
            <div className="space-y-5">
              {/* Strategic Relevance to EDGE */}
              <div className="p-5 bg-gradient-to-br from-purple-900 to-purple-950 text-white rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-mono uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4" />
                  <span>Strategic Positioning for Edge</span>
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  Relationship: {org.competitiveRelevance}
                </div>
                <p className="text-purple-200/90 text-xs leading-relaxed">
                  {org.relevanceReason || 'Competitor offers overlapping educational modules in regional hubs; monitoring required.'}
                </p>
              </div>

              {/* Strengths & Differentiation */}
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Market Strengths & Advantages</span>
                </span>
                <p className="text-emerald-950 text-xs leading-relaxed">
                  {org.strengths || 'Strong local footprint and recognized regional brand.'}
                </p>
              </div>

              {/* Weaknesses / Opportunities for Edge */}
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-amber-600" />
                  <span>Gaps & Opportunities for EDGE Intervention</span>
                </span>
                <p className="text-amber-950 text-xs leading-relaxed">
                  {org.weaknesses || 'Curriculum updates lag behind frontier generative AI and agentic workflow standards.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: SOURCES & EVIDENCE */}
          {activeSection === 'sources' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold text-slate-700">
                Verified Public Documentation & Evidence References
              </div>

              {Array.isArray(org.researchSources) && org.researchSources.length > 0 ? (
                org.researchSources.map((source, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white rounded-xl border border-purple-100 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs">
                        {source.title || 'Institutional Publication'}
                      </span>
                      {source.date && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {source.date}
                        </span>
                      )}
                    </div>

                    {source.notes && (
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {source.notes}
                      </p>
                    )}

                    {source.url && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] text-purple-700 hover:text-purple-900 font-medium hover:underline pt-1"
                      >
                        <Globe className="w-3 h-3" />
                        <span>{source.url}</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center text-slate-500">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-medium">Public intelligence derived from official website listings.</p>
                  {org.website && (
                    <a
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-purple-700 font-semibold mt-2 hover:underline"
                    >
                      <span>Visit {org.website}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-purple-100 p-4 px-6 flex items-center justify-between gap-3 shadow-lg">
          <div className="text-[11px] text-slate-500">
            Competitor ID: <span className="font-mono font-semibold text-slate-700">{org.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => onOpenFullDossier && onOpenFullDossier(org)}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-purple-700 hover:from-purple-600 hover:to-purple-600 transition-all flex items-center gap-1.5 shadow-sm shadow-purple-900/20"
            >
              <span>Open Deep Dossier & Evidence Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

