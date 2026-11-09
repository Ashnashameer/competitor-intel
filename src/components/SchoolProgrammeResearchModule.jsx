import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  School, 
  BookOpen, 
  GitCompare, 
  TrendingUp, 
  Sparkles, 
  MapPin, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Clock, 
  DollarSign, 
  Laptop, 
  Cpu, 
  Award, 
  Layers, 
  Users, 
  Calendar, 
  Globe, 
  ArrowRight, 
  ChevronRight, 
  X, 
  RotateCcw,
  ShieldCheck,
  Tag,
  HelpCircle,
  FileText,
  Compass
} from 'lucide-react';
import { 
  SCHOOL_ORGANISATIONS, 
  SCHOOL_PROGRAMMES, 
  SCHOOLS_DATABASE, 
  PROGRAMME_SCHOOL_PARTNERSHIPS, 
  SCHOOL_RESEARCH_FINDINGS, 
  EDGE_SCHOOL_OPPORTUNITIES 
} from '../data/schoolResearchData';
import { SchoolDetailModal } from './SchoolDetailModal';
import { KERALA_DISTRICTS } from '../data/geographicData';

export function SchoolProgrammeResearchModule({ activeDistrict, onDistrictChange }) {
  // Navigation tabs for the School Research Module
  // 'organisations' | 'programmes' | 'schools' | 'compare' | 'findings' | 'opportunities'
  const [subTab, setSubTab] = useState('organisations');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState(activeDistrict || 'All');
  const [selectedClassification, setSelectedClassification] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All');

  // Modal State
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedProgrammeDetail, setSelectedProgrammeDetail] = useState(null);

  // Comparison State (array of programme IDs)
  const [comparedProgrammeIds, setComparedProgrammeIds] = useState(['prog-sx-01', 'prog-rl-01']);

  // Sync external district changes if passed
  React.useEffect(() => {
    if (activeDistrict && activeDistrict !== selectedDistrict) {
      setSelectedDistrict(activeDistrict);
    }
  }, [activeDistrict]);

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    if (onDistrictChange) onDistrictChange(district);
  };

  // =========================================================================
  // SECTION A: ORGANISATION-LEVEL DATA (COUNTING UNIQUE SCHOOLS SEPARATELY)
  // =========================================================================
  const organisationsData = useMemo(() => {
    return SCHOOL_ORGANISATIONS.map(org => {
      // Find all partnerships for this organisation
      const orgPartnerships = PROGRAMME_SCHOOL_PARTNERSHIPS.filter(p => p.orgId === org.id);

      // CRITICAL: Count unique schools separately from programme occurrences!
      // If an org conducts 5 programmes in 1 school, it counts as 1 school partnership.
      const uniqueSchoolIds = new Set(orgPartnerships.map(p => p.schoolId));
      const uniqueSchoolsCount = uniqueSchoolIds.size;

      // Filter by district if selected
      const matchesDistrict = selectedDistrict === 'All' || 
        org.districtsOfOperation.includes(selectedDistrict) || 
        org.districtsOfOperation.includes('All 14 Districts');

      // Programmes offered by this org
      const programmes = SCHOOL_PROGRAMMES.filter(p => p.orgId === org.id);

      return {
        ...org,
        uniqueSchoolsCount,
        programmes,
        orgPartnerships,
        matchesDistrict
      };
    }).filter(org => {
      if (!org.matchesDistrict) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return org.name.toLowerCase().includes(q) || org.headquarters.toLowerCase().includes(q);
      }
      return true;
    });
  }, [selectedDistrict, searchQuery]);

  // =========================================================================
  // SECTION B: PROGRAMME-LEVEL RESEARCH
  // =========================================================================
  const programmesData = useMemo(() => {
    return SCHOOL_PROGRAMMES.filter(prog => {
      const org = SCHOOL_ORGANISATIONS.find(o => o.id === prog.orgId);
      if (selectedDistrict !== 'All' && org) {
        if (!org.districtsOfOperation.includes(selectedDistrict) && !org.districtsOfOperation.includes('All 14 Districts')) {
          return false;
        }
      }
      if (selectedCategory !== 'All' && prog.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          prog.name.toLowerCase().includes(q) ||
          prog.description.toLowerCase().includes(q) ||
          prog.orgName.toLowerCase().includes(q) ||
          prog.subjectsAndSkillsTaught.some(s => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [selectedDistrict, selectedCategory, searchQuery]);

  // =========================================================================
  // SECTION C: SCHOOLS DATABASE & PARTNERSHIPS
  // =========================================================================
  const schoolsData = useMemo(() => {
    return SCHOOLS_DATABASE.filter(school => {
      if (selectedDistrict !== 'All' && school.district !== selectedDistrict) {
        return false;
      }
      if (selectedClassification !== 'All' && !school.classification.includes(selectedClassification)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          school.name.toLowerCase().includes(q) ||
          school.city.toLowerCase().includes(q) ||
          school.district.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedDistrict, selectedClassification, searchQuery]);

  // =========================================================================
  // SECTION E: RESEARCH FINDINGS
  // =========================================================================
  const findingsData = useMemo(() => {
    return SCHOOL_RESEARCH_FINDINGS.filter(f => {
      if (selectedDistrict !== 'All' && f.district !== 'All Districts' && f.district !== selectedDistrict) {
        return false;
      }
      if (selectedAcademicYear !== 'All' && f.academicYear !== selectedAcademicYear) {
        return false;
      }
      if (selectedCategory !== 'All' && f.category !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [selectedDistrict, selectedAcademicYear, selectedCategory]);

  // Toggle programme for comparison (max 4)
  const toggleProgrammeComparison = (progId) => {
    setComparedProgrammeIds(prev => {
      if (prev.includes(progId)) {
        return prev.filter(id => id !== progId);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), progId]; // drop oldest if exceeding 4
      }
      return [...prev, progId];
    });
  };

  // Compared programme items
  const comparedProgrammes = useMemo(() => {
    return SCHOOL_PROGRAMMES.filter(p => comparedProgrammeIds.includes(p.id));
  }, [comparedProgrammeIds]);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-purple-200/90 shadow-sm overflow-hidden mb-8 transition-all">
      {/* ========================================================================= */}
      {/* MODULE HEADER BANNER                                                      */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-[#0c0a1a] via-[#1a1236] to-[#0c0a1a] text-white p-6 lg:p-7 border-b border-purple-900/60 relative overflow-hidden">
        {/* Subtle decorative purple glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase font-bold text-purple-300 bg-purple-900/60 px-2.5 py-0.5 rounded-full border border-purple-700/60">
                SPECIALIZED RESEARCH MODULE
              </span>
              <span className="text-purple-400">•</span>
              <span className="text-xs text-purple-200 font-semibold">
                K-12 School Partnerships & Programme Intelligence
              </span>
            </div>

            <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span>School Programme Research & Findings</span>
              <span className="text-xs font-mono font-bold text-purple-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                8 Providers • 15 Schools Mapped
              </span>
            </h2>

            <p className="text-xs text-purple-200/80 mt-1 max-w-2xl leading-relaxed">
              Granular intelligence on what competitors deliver to schools: syllabus modules, target grades (1–12), pricing models, school partnership networks, and verified research findings for MYST International.
            </p>
          </div>

          {/* Quick Scope Presets */}
          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            <div className="bg-white/10 backdrop-blur-xs border border-white/20 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-purple-300" />
              <span className="text-purple-200 font-medium">Focus District:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictSelect(e.target.value)}
                className="bg-transparent font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-[#1a1236]">All 14 Districts</option>
                {KERALA_DISTRICTS.map((d) => (
                  <option key={d} value={d} className="bg-[#1a1236]">{d}</option>
                ))}
              </select>
            </div>

            {selectedDistrict !== 'All' && (
              <button
                onClick={() => handleDistrictSelect('All')}
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white/20 hover:bg-white/30 text-white transition-colors"
              >
                Reset Scope
              </button>
            )}
          </div>
        </div>

        {/* 6 Section Navigation Tabs */}
        <div className="mt-6 pt-4 border-t border-purple-800/60 flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'organisations', label: 'A. Organisations', icon: Building2, count: organisationsData.length },
            { id: 'programmes', label: 'B. Programmes Directory', icon: BookOpen, count: programmesData.length },
            { id: 'schools', label: 'C. School Partnerships', icon: School, count: schoolsData.length },
            { id: 'compare', label: 'D. Programme Comparison', icon: GitCompare, count: comparedProgrammeIds.length },
            { id: 'findings', label: 'E. Research Findings', icon: TrendingUp, count: findingsData.length },
            { id: 'opportunities', label: 'G. Opportunities for Edge', icon: Sparkles, count: EDGE_SCHOOL_OPPORTUNITIES.length }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = subTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setSubTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-950/60 ring-2 ring-purple-400/30'
                    : 'text-purple-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-300'}`} />
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] ${
                  isActive ? 'bg-purple-900/60 text-white' : 'bg-white/10 text-purple-200'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* FILTER & SEARCH SUB-BAR                                                   */}
      {/* ========================================================================= */}
      <div className="px-6 py-3.5 bg-purple-50/40 border-b border-purple-100/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 max-w-md relative">
          <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search school organisations, curricula, skills, or schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-white border border-purple-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {subTab === 'programmes' && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-purple-200 px-3 py-1.5 rounded-xl font-semibold text-slate-700"
            >
              <option value="All">All Programme Categories</option>
              <option value="Robotics">Robotics</option>
              <option value="AI">AI</option>
              <option value="Coding">Coding</option>
              <option value="STEM">STEM</option>
              <option value="Digital Literacy">Digital Literacy</option>
              <option value="Soft Skills & Tech">Soft Skills & Tech</option>
            </select>
          )}

          {subTab === 'schools' && (
            <select
              value={selectedClassification}
              onChange={(e) => setSelectedClassification(e.target.value)}
              className="bg-white border border-purple-200 px-3 py-1.5 rounded-xl font-semibold text-slate-700"
            >
              <option value="All">All Classifications</option>
              <option value="Private">Private (CBSE / ICSE / Cambridge)</option>
              <option value="Aided">Government Aided</option>
              <option value="Government">Government Schools</option>
            </select>
          )}

          {(searchQuery || selectedCategory !== 'All' || selectedClassification !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedClassification('All');
              }}
              className="text-purple-700 font-bold hover:underline ml-1"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB CONTENT PANELS                                                        */}
      {/* ========================================================================= */}
      <div className="p-6">
        {/* ===================================================================== */}
        {/* TAB 1: SECTION A - ORGANISATION-LEVEL RESEARCH                        */}
        {/* ===================================================================== */}
        {subTab === 'organisations' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>
                Displaying <strong>{organisationsData.length}</strong> organisations serving Kerala schools. 
                <span className="text-purple-700 font-bold ml-1">
                  Unique schools counted separately from multiple programme runs.
                </span>
              </span>
              <span className="hidden sm:inline text-slate-400">
                Click any organisation card to explore full syllabus & MoUs
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {organisationsData.map((org) => (
                <div
                  key={org.id}
                  className="bg-white rounded-2xl p-5 border border-purple-100 hover:border-purple-300 shadow-2xs hover:shadow-xs transition-all space-y-3.5"
                >
                  {/* Top Bar: Name + Type + Location */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {org.orgType}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-1 line-clamp-1">
                        {org.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>HQ: {org.headquarters}</span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{org.verificationStatus === 'verified' ? 'Verified' : 'Preliminary'}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {org.companyOverview}
                  </p>

                  {/* 4 Critical Metrics Strip */}
                  <div className="grid grid-cols-4 gap-2 bg-purple-50/40 p-3 rounded-xl border border-purple-100/70 text-center">
                    <div>
                      <div className="text-base font-black text-purple-900 font-mono">
                        {org.uniqueSchoolsCount}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tight" title="Counted uniquely, even if conducting multiple programmes per school">
                        Unique Schools
                      </div>
                    </div>

                    <div>
                      <div className="text-base font-black text-slate-800 font-mono">
                        {org.totalProgrammesCount}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                        Programmes
                      </div>
                    </div>

                    <div>
                      <div className="text-base font-black text-emerald-700 font-mono">
                        {org.activeProgrammesCount}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                        Active Now
                      </div>
                    </div>

                    <div>
                      <div className="text-base font-black text-slate-800 font-mono">
                        {org.verifiedStudentsCount ? org.verifiedStudentsCount.toLocaleString() : 'N/A'}
                      </div>
                      <div className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">
                        Pupils Reached
                      </div>
                    </div>
                  </div>

                  {/* School Coverage Breakdown (Govt / Aided / Private) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                      <span>School Classification Coverage:</span>
                      <span className="text-purple-900">
                        {org.governmentPrivateCoverage.private}% Private • {org.governmentPrivateCoverage.aided}% Aided • {org.governmentPrivateCoverage.government}% Govt
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                      <div style={{ width: `${org.governmentPrivateCoverage.private}%` }} className="bg-purple-600 h-full" title={`Private: ${org.governmentPrivateCoverage.private}%`} />
                      <div style={{ width: `${org.governmentPrivateCoverage.aided}%` }} className="bg-indigo-400 h-full" title={`Aided: ${org.governmentPrivateCoverage.aided}%`} />
                      <div style={{ width: `${org.governmentPrivateCoverage.government}%` }} className="bg-emerald-400 h-full" title={`Govt: ${org.governmentPrivateCoverage.government}%`} />
                    </div>
                  </div>

                  {/* Districts & Web Links Footer */}
                  <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-[11px]">
                    <div className="text-slate-500 truncate max-w-[220px]">
                      Districts: <span className="font-semibold text-slate-700">{org.districtsOfOperation.join(', ')}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {org.website && (
                        <a
                          href={org.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-700 hover:text-purple-900 font-bold hover:underline flex items-center gap-0.5"
                        >
                          <span>Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        onClick={() => {
                          setSubTab('programmes');
                          setSearchQuery(org.name);
                        }}
                        className="text-purple-900 hover:text-purple-700 font-bold flex items-center gap-0.5"
                      >
                        <span>View Programmes ({org.programmes.length})</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 2: SECTION B - PROGRAMME-LEVEL RESEARCH (ALL 15 ATTRIBUTES)       */}
        {/* ===================================================================== */}
        {subTab === 'programmes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>
                Showing <strong>{programmesData.length}</strong> individual school programmes catalogued with all 15 operational attributes.
              </span>
              <span className="text-purple-700 font-bold">
                Check box to compare up to 4 programmes side-by-side
              </span>
            </div>

            <div className="space-y-4">
              {programmesData.map((prog) => {
                const isCompared = comparedProgrammeIds.includes(prog.id);

                return (
                  <div
                    key={prog.id}
                    className={`bg-white rounded-2xl p-5 border transition-all ${
                      isCompared
                        ? 'border-purple-500 ring-2 ring-purple-400/20 shadow-xs'
                        : 'border-purple-100 hover:border-purple-200 shadow-2xs'
                    }`}
                  >
                    {/* Programme Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="font-bold text-xs text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                            {prog.category}
                          </span>
                          <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                            {prog.targetGrades}
                          </span>
                          <span className="text-xs text-slate-400">• Provided by <strong>{prog.orgName}</strong></span>
                        </div>

                        <h3 className="text-base font-bold text-slate-900 tracking-tight">
                          {prog.name}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 cursor-pointer bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl border border-purple-200 transition-colors">
                          <input
                            type="checkbox"
                            checked={isCompared}
                            onChange={() => toggleProgrammeComparison(prog.id)}
                            className="rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                          />
                          <span>Compare</span>
                        </label>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {prog.description}
                    </p>

                    {/* All 15 Required Operational Attributes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-purple-50/30 p-4 rounded-xl border border-purple-100/70 text-xs text-slate-800">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          Duration & Sessions
                        </span>
                        <div className="font-semibold text-slate-900">{prog.duration}</div>
                        <div className="text-[11px] text-slate-500">{prog.numberOfSessions} sessions • {prog.sessionDuration}</div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          Cost & Fees
                        </span>
                        <div className="font-bold text-purple-950 font-mono">{prog.cost}</div>
                        <div className="text-[11px] text-slate-500">{prog.pricingModel}</div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          Mode & Methodology
                        </span>
                        <div className="font-semibold text-slate-900">{prog.learningMode}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1" title={prog.teachingMethodology}>
                          {prog.teachingMethodology}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                          Certification
                        </span>
                        <div className="font-semibold text-emerald-800 line-clamp-1" title={prog.certificationOffered}>
                          {prog.certificationOffered}
                        </div>
                        <div className="text-[11px] text-slate-500">Verified institutional credential</div>
                      </div>
                    </div>

                    {/* Tools, Skills & Deliverables */}
                    <div className="mt-3.5 pt-3 border-t border-purple-50 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Hardware, Software & Tools:
                        </span>
                        <span className="text-slate-700 font-medium">{prog.hardwareSoftwareTools}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Subjects & Skills Taught:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {prog.subjectsAndSkillsTaught.map((s, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Student Deliverables / Outcomes:
                        </span>
                        <span className="text-slate-700 font-medium">{prog.studentDeliverables}</span>
                      </div>
                    </div>

                    {/* Source Proof Link */}
                    {prog.evidenceUrl && (
                      <div className="mt-3 pt-2 border-t border-purple-50 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">
                          Proof Source: <span className="text-slate-600">{prog.evidenceNotes}</span>
                        </span>
                        <a
                          href={prog.evidenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-700 hover:text-purple-900 font-bold hover:underline flex items-center gap-1"
                        >
                          <span>View Public Evidence</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 3: SECTION C - SCHOOL PARTNERSHIP INTELLIGENCE                    */}
        {/* ===================================================================== */}
        {subTab === 'schools' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>
                Tracking <strong>{schoolsData.length}</strong> schools across Kerala. 
                <strong className="text-purple-700 ml-1">Click any school name to view all associated competitors and programmes.</strong>
              </span>
              <span className="text-slate-400">
                Sorted by known partner integrations
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schoolsData.map((school) => {
                const partnerships = PROGRAMME_SCHOOL_PARTNERSHIPS.filter(
                  p => p.schoolId === school.id || p.schoolName.toLowerCase() === school.name.toLowerCase()
                );
                const uniqueOrgs = Array.from(new Set(partnerships.map(p => p.orgName)));

                return (
                  <div
                    key={school.id}
                    onClick={() => setSelectedSchool(school)}
                    className="bg-white rounded-2xl p-5 border border-purple-100 hover:border-purple-300 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                          {school.classification}
                        </span>
                        <span className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-full ${
                          partnerships.length > 0 ? 'bg-purple-100 text-purple-900' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {partnerships.length} Active MoUs
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-700 transition-colors line-clamp-1 mb-1">
                        {school.name}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>{school.city}, {school.district}</span>
                      </div>

                      {/* Associated Competitor Providers */}
                      <div className="space-y-1 mb-3">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Connected Competitors:
                        </span>
                        {uniqueOrgs.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {uniqueOrgs.map((orgName, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-50 text-purple-900 border border-purple-100">
                                {orgName}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[11px] text-amber-700 font-medium italic">
                            No partnership identified in available research
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-purple-50 flex items-center justify-between text-xs font-semibold text-purple-700">
                      <span>Click to open school dossier</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 4: SECTION D - PROGRAMME COMPARISON                               */}
        {/* ===================================================================== */}
        {subTab === 'compare' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 mb-2">
              <div>
                Comparing <strong>{comparedProgrammes.length}</strong> selected programmes. 
                <span> Select programmes in Tab B to compare up to 4 curricula side-by-side.</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setComparedProgrammeIds(['prog-sx-01', 'prog-rl-01', 'prog-bt-01'])}
                  className="text-purple-700 font-bold hover:underline"
                >
                  Load STEM vs Robotics vs Python Preset
                </button>
              </div>
            </div>

            {comparedProgrammes.length === 0 ? (
              <div className="p-10 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                <GitCompare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-slate-800 text-sm">No programmes currently selected for comparison</h4>
                <p className="text-xs text-slate-500 mt-1">Navigate to Tab B (Programmes Directory) and click "Compare" on 2 or more programmes.</p>
              </div>
            ) : (
              <div className="overflow-x-auto bg-white rounded-2xl border border-purple-200/80 shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-purple-900 text-white">
                      <th className="p-4 w-48 font-bold border-r border-purple-800">Comparison Dimension</th>
                      {comparedProgrammes.map(prog => (
                        <th key={prog.id} className="p-4 min-w-[240px] font-bold border-r border-purple-800 last:border-r-0">
                          <div className="text-[10px] uppercase tracking-wider text-purple-300">{prog.orgName}</div>
                          <div className="text-sm font-bold text-white mt-0.5">{prog.name}</div>
                          <button
                            onClick={() => toggleProgrammeComparison(prog.id)}
                            className="mt-2 text-[10px] text-purple-200 hover:text-white underline"
                          >
                            Remove from Compare
                          </button>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-purple-100 text-slate-800">
                    <tr className="bg-purple-50/20">
                      <td className="p-3.5 font-bold text-purple-950 border-r border-purple-100">Programme Category</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 font-semibold text-purple-700 border-r border-purple-100 last:border-r-0">
                          {p.category}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Classes / Grades Targeted</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 font-bold font-mono text-slate-900 border-r border-purple-100 last:border-r-0">
                          {p.targetGrades}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-purple-50/20">
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Duration & Sessions</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 border-r border-purple-100 last:border-r-0">
                          <div className="font-semibold text-slate-900">{p.duration}</div>
                          <div className="text-slate-500 text-[11px]">{p.numberOfSessions} sessions • {p.sessionDuration}</div>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Programme Cost / Fees</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 font-bold font-mono text-purple-900 border-r border-purple-100 last:border-r-0">
                          {p.cost}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-purple-50/20">
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Pricing Model</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 text-slate-700 border-r border-purple-100 last:border-r-0">
                          {p.pricingModel}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Learning Mode</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 font-semibold text-slate-800 border-r border-purple-100 last:border-r-0">
                          {p.learningMode}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-purple-50/20">
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Teaching Methodology</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 text-slate-700 leading-relaxed border-r border-purple-100 last:border-r-0">
                          {p.teachingMethodology}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Hardware & Software Tools</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 font-medium text-slate-800 border-r border-purple-100 last:border-r-0">
                          {p.hardwareSoftwareTools}
                        </td>
                      ))}
                    </tr>

                    <tr className="bg-purple-50/20">
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Student Deliverables</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 text-slate-700 border-r border-purple-100 last:border-r-0">
                          {p.studentDeliverables}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td className="p-3.5 font-bold text-slate-900 border-r border-purple-100">Certification Offered</td>
                      {comparedProgrammes.map(p => (
                        <td key={p.id} className="p-3.5 font-semibold text-emerald-800 border-r border-purple-100 last:border-r-0">
                          {p.certificationOffered}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 5: SECTION E & F - RESEARCH FINDINGS & VERIFICATION               */}
        {/* ===================================================================== */}
        {subTab === 'findings' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span>
                Derived research insights addressing the 8 core school market questions for MYST.
              </span>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All findings backed by verified public sources</span>
              </span>
            </div>

            <div className="space-y-4">
              {findingsData.map((f, i) => (
                <div
                  key={f.id}
                  className="bg-white rounded-2xl p-5 border border-purple-100 shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-900 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {f.question}
                      </h4>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      {f.verificationStatus}
                    </span>
                  </div>

                  {/* Core Insight */}
                  <div className="p-3.5 bg-purple-50/40 rounded-xl border border-purple-100/70">
                    <div className="text-xs font-bold text-purple-950 mb-1">
                      {f.finding}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {f.details}
                    </p>
                  </div>

                  {/* Evidence & Verification Metadata (Section F) */}
                  <div className="pt-2 border-t border-purple-50 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                    <div className="flex items-center gap-3">
                      <span>Source: <strong>{f.sourceType}</strong></span>
                      <span>•</span>
                      <span>Researched: {f.researchDate}</span>
                      <span>•</span>
                      <span>Verified: {f.lastVerificationDate}</span>
                    </div>

                    {f.sourceUrl && (
                      <a
                        href={f.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-700 hover:text-purple-900 font-bold hover:underline flex items-center gap-1"
                      >
                        <span>Inspect Source Evidence</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* TAB 6: SECTION G - STRATEGIC OPPORTUNITIES FOR EDGE                   */}
        {/* ===================================================================== */}
        {subTab === 'opportunities' && (
          <div className="space-y-5">
            <div className="bg-gradient-to-r from-purple-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-purple-300 text-xs font-mono uppercase tracking-wider font-bold">
                <Sparkles className="w-4 h-4" />
                <span>MYST Executive Strategic Brief</span>
              </div>
              <h3 className="text-base font-bold text-white">
                How EDGE Can Capture School Partnerships in Kerala
              </h3>
              <p className="text-xs text-purple-100/90 leading-relaxed">
                Existing school providers in Kerala are overwhelmingly hardware-focused (Arduino kits, plastic robots, and basic Scratch). None teach real-world Generative AI, autonomous agents, modern Python software engineering, or AI literacy. EDGE's primary opportunity is to deliver high-end AI Fellowships that elevate school prestige.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EDGE_SCHOOL_OPPORTUNITIES.map((opp) => (
                <div
                  key={opp.id}
                  className="bg-white rounded-2xl p-5 border border-purple-100 hover:border-purple-300 shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
                        {opp.type}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {opp.targetSegment}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">
                      {opp.title}
                    </h4>

                    {/* Underserved Need */}
                    <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/70 text-xs mb-2.5">
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
                        Identified Market Gap:
                      </span>
                      <p className="text-amber-950 leading-relaxed">
                        {opp.underservedNeed}
                      </p>
                    </div>

                    {/* Strategic Play */}
                    <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100 text-xs">
                      <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block mb-0.5">
                        EDGE Recommended Play:
                      </span>
                      <p className="text-purple-950 leading-relaxed font-medium">
                        {opp.strategicPlay}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-[11px] text-slate-500">
                    <div>
                      Priority: <strong className="text-slate-800">{opp.priorityDistricts.join(', ')}</strong>
                    </div>
                    <span className="text-purple-700 font-bold">
                      {opp.targetSchools.length} Target Schools Identified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CONNECTED SCHOOL DETAIL MODAL (SECTION C)                                 */}
      {/* ========================================================================= */}
      <SchoolDetailModal
        school={selectedSchool}
        isOpen={Boolean(selectedSchool)}
        onClose={() => setSelectedSchool(null)}
        onSelectProgramme={(prog) => {
          setSelectedSchool(null);
          setSubTab('programmes');
          setSearchQuery(prog.name);
        }}
      />
    </div>
  );
}

