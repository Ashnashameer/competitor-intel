import React from 'react';
import { 
  X, 
  School, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  BookOpen, 
  Users, 
  Calendar, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { PROGRAMME_SCHOOL_PARTNERSHIPS, SCHOOL_PROGRAMMES } from '../data/schoolResearchData';

export function SchoolDetailModal({ school, isOpen, onClose, onSelectProgramme }) {
  if (!isOpen || !school) return null;

  // Find all partnerships involving this school
  const partnerships = PROGRAMME_SCHOOL_PARTNERSHIPS.filter(
    p => p.schoolId === school.id || p.schoolName.toLowerCase() === school.name.toLowerCase()
  );

  // Unique organisations in this school
  const uniqueOrgs = Array.from(new Set(partnerships.map(p => p.orgName)));

  // Total verified students across all programmes in this school
  const totalStudentsInvolved = partnerships.reduce(
    (sum, p) => sum + (p.verifiedStudentsCount || 0), 0
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white min-h-screen shadow-2xl flex flex-col border-l border-purple-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-[#0c0a1a] via-[#16122d] to-[#0c0a1a] text-white px-6 py-4 flex items-center justify-between border-b border-purple-900/60 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold">
              <School className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[9px] tracking-widest text-purple-300 uppercase font-bold">
                INSTITUTIONAL DOSSIER
              </span>
              <h2 className="text-base font-bold text-white line-clamp-1">
                {school.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-purple-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* School Overview Strip */}
        <div className="bg-purple-50/50 p-6 border-b border-purple-100/80">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-purple-900 border border-purple-200 shadow-2xs">
              {school.classification}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-purple-600" />
              <span>{school.city}, {school.district} District</span>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-3 text-center mt-4">
            <div className="p-3 bg-white rounded-xl border border-purple-100">
              <div className="text-lg font-black text-slate-900 font-mono">
                {school.totalStudentsApprox?.toLocaleString() || 'Not Available'}
              </div>
              <div className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">
                Total Enrolled
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-purple-100">
              <div className="text-lg font-black text-purple-900 font-mono">
                {uniqueOrgs.length}
              </div>
              <div className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">
                Competitor Vendors
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-purple-100">
              <div className="text-lg font-black text-emerald-700 font-mono">
                {totalStudentsInvolved > 0 ? totalStudentsInvolved : 'Not Disclosed'}
              </div>
              <div className="text-[10px] text-slate-500 font-medium uppercase mt-0.5">
                Students in Tech Tracks
              </div>
            </div>
          </div>

          {/* Infrastructure */}
          {school.facilities && (
            <div className="mt-4 pt-3 border-t border-purple-100/60">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Campus Tech Infrastructure:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {school.facilities.map((fac, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white text-slate-700 border border-purple-100">
                    {fac}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Connected Programmes & Competitors */}
        <div className="flex-1 p-6 overflow-y-auto space-y-5 text-xs text-slate-800">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>Associated Competitors & Programmes</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                  {partnerships.length} Active MoUs
                </span>
              </h3>
            </div>

            {partnerships.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-xs mb-1">
                  No partnership identified in available research
                </h4>
                <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                  No public third-party robotics or coding providers are currently recorded at this school. This represents a potential greenfield partnership opportunity for EDGE.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {partnerships.map((p) => {
                  const progDetail = SCHOOL_PROGRAMMES.find(prog => prog.id === p.programmeId);

                  return (
                    <div
                      key={p.id}
                      className="p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 shadow-2xs space-y-2.5 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                            <Building2 className="w-3 h-3" />
                            <span>{p.orgName}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">
                            {p.programmeName}
                          </h4>
                        </div>

                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {p.partnershipStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-purple-50/30 p-2.5 rounded-lg border border-purple-50">
                        <div>
                          <span className="text-slate-400">Classes:</span>
                          <span className="font-semibold text-slate-800 ml-1">{p.classesParticipating}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Academic Year:</span>
                          <span className="font-semibold text-slate-800 ml-1">{p.academicYear}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Students Reached:</span>
                          <span className="font-bold text-purple-900 ml-1">
                            {p.verifiedStudentsCount ? `${p.verifiedStudentsCount} pupils` : 'Not Publicly Available'}
                          </span>
                        </div>
                        {progDetail && (
                          <div>
                            <span className="text-slate-400">Category:</span>
                            <span className="font-semibold text-slate-800 ml-1">{progDetail.category}</span>
                          </div>
                        )}
                      </div>

                      {p.evidenceNotes && (
                        <p className="text-[11px] text-slate-600 italic">
                          "{p.evidenceNotes}"
                        </p>
                      )}

                      {p.evidenceUrl && (
                        <div className="pt-2 border-t border-purple-50 flex items-center justify-between">
                          <a
                            href={p.evidenceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-purple-700 hover:text-purple-900 font-semibold hover:underline"
                          >
                            <span>Verified Source Evidence</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          {onSelectProgramme && progDetail && (
                            <button
                              onClick={() => onSelectProgramme(progDetail)}
                              className="text-[11px] font-bold text-purple-900 hover:text-purple-700 flex items-center gap-1"
                            >
                              <span>View Programme Specs</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Strategic Opportunity Assessment */}
          <div className="p-4 bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-2xl shadow-sm space-y-2">
            <div className="flex items-center gap-1.5 text-purple-300 text-xs font-mono uppercase tracking-wider font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EDGE Strategic Opportunity</span>
            </div>
            <p className="text-purple-100 text-xs leading-relaxed">
              {partnerships.length > 0
                ? `${school.name} already hosts ${uniqueOrgs.join(' and ')}, primarily teaching standard robotics and block coding. EDGE can propose an advanced 'Generative AI & Autonomous Systems' track for High School Grades 9-12, positioning EDGE above routine hardware vendors without directly competing on elementary kits.`
                : `${school.name} has no third-party tech provider identified in public research. Ideal greenfield opportunity for EDGE to establish an exclusive AI & STEM innovation partner MoU.`}
            </p>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="sticky bottom-0 bg-white border-t border-purple-100 p-4 px-6 flex items-center justify-between shadow-lg">
          <span className="text-[11px] text-slate-400 font-mono">
            Institution ID: {school.id}
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}

