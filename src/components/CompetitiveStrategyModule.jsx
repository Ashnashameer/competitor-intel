import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  ChevronRight,
  Compass,
  Lightbulb
} from 'lucide-react';
import { COMPETITIVE_STRATEGY_DATA } from '../data/strategicIntelligenceData';

export function CompetitiveStrategyModule({ onSelectOrg, onNavigateHome }) {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  // Filtered Competitors List
  const filteredList = useMemo(() => {
    return COMPETITIVE_STRATEGY_DATA.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.competitorName.toLowerCase().includes(q);
        const matchesSector = item.primarySector.toLowerCase().includes(q);
        const matchesArch = item.strategicArchetype.toLowerCase().includes(q);
        if (!matchesName && !matchesSector && !matchesArch) return false;
      }
      if (sectorFilter !== 'All') {
        if (!item.primarySector.toLowerCase().includes(sectorFilter.toLowerCase())) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, sectorFilter]);

  // =========================================================================
  // DETAILED VIEW: DEDICATED COMPETITOR STRATEGY & POSITIONING DOSSIER
  // =========================================================================
  if (selectedStrategy) {
    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-200">
        
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between pb-2 border-b border-purple-100">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button
              onClick={() => setSelectedStrategy(null)}
              className="text-purple-700 hover:text-purple-900 hover:underline font-semibold"
            >
              Competitive Strategy Hub
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{selectedStrategy.competitorName}</span>
          </nav>

          <button
            onClick={() => setSelectedStrategy(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Strategy Overview</span>
          </button>
        </div>

        {/* Header Banner */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  STRATEGIC POSITIONING DOSSIER
                </span>
                <span className="text-purple-300">•</span>
                <span className="text-xs text-slate-500 font-semibold">
                  Evidence-Based Assessment
                </span>
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {selectedStrategy.competitorName}
              </h1>
              <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  {selectedStrategy.primarySector}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  {selectedStrategy.marketPresence}
                </span>
              </div>
            </div>

            {onSelectOrg && (
              <button
                onClick={() => onSelectOrg({ id: selectedStrategy.competitorId, name: selectedStrategy.competitorName })}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-purple-950 text-white shadow-xs transition-colors cursor-pointer self-start md:self-auto"
              >
                <span>Full Competitor Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* 1. Market Positioning */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
            <Compass className="w-5 h-5 text-purple-600" />
            <span>Market Positioning Analysis</span>
          </h2>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            {selectedStrategy.positioningSummary}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
            <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Strategic Archetype
              </span>
              <span className="font-bold text-slate-900 block text-xs">
                {selectedStrategy.strategicArchetype}
              </span>
            </div>
            <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Target Audience
              </span>
              <span className="font-bold text-slate-900 block text-xs">
                {selectedStrategy.targetAudience}
              </span>
            </div>
            <div className="p-3 bg-purple-50/40 rounded-xl border border-purple-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Pricing & Commercial Tier
              </span>
              <span className="font-bold text-slate-900 block text-xs">
                {selectedStrategy.pricingTier}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Opportunities for MYST */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Opportunities for MYST (Market Gaps & Underserved Segments)</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedStrategy.opportunities.map(opp => (
              <div key={opp.id} className="p-4 bg-amber-50/40 rounded-xl border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-950 text-xs">{opp.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900">
                    {opp.potentialImpact} Impact
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {opp.description}
                </p>
                <div className="text-[10px] text-slate-400 italic pt-1 border-t border-amber-100">
                  Evidence: {opp.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Threats to MYST */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
            <AlertTriangle className="w-5 h-5 text-rose-600" />
            <span>Threats & Competitive Risks to MYST</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedStrategy.threats.map(thr => (
              <div key={thr.id} className="p-4 bg-rose-50/40 rounded-xl border border-rose-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-950 text-xs">{thr.title}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-100 text-rose-900">
                    {thr.severity} Severity
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {thr.description}
                </p>
                <div className="text-[10px] text-slate-400 italic pt-1 border-t border-rose-100">
                  Evidence: {thr.source}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Differentiation from MYST */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-purple-50 pb-2.5">
            <Target className="w-5 h-5 text-purple-600" />
            <span>Differentiation from MYST</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-purple-50/70 border-b border-purple-100 text-[11px] font-bold text-slate-700">
                  <th className="py-2.5 px-3 min-w-[140px]">Strategic Dimension</th>
                  <th className="py-2.5 px-3 min-w-[220px] text-slate-600">{selectedStrategy.competitorName}</th>
                  <th className="py-2.5 px-3 min-w-[220px] text-purple-900 font-extrabold bg-purple-100/40">MYST International Advantage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {selectedStrategy.differentiation.map((diff, idx) => (
                  <tr key={idx} className="hover:bg-purple-50/30 transition-colors">
                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">{diff.pillar}</td>
                    <td className="py-3 px-3 text-slate-600">{diff.competitor}</td>
                    <td className="py-3 px-3 font-semibold text-purple-950 bg-purple-50/30">{diff.myst}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Verified Facts vs AI Strategic Assessments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Verified Facts */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Verified Facts (Traceable Sources)</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {selectedStrategy.verifiedFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Strategic Assessments */}
          <div className="bg-white rounded-2xl border border-purple-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-purple-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI Strategic Assessments</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-700">
              {selectedStrategy.aiAssessments.map((ai, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{ai}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sources Footer */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Audit Date:</span>
            <span>{selectedStrategy.lastUpdated}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">Traceable URLs:</span>
            {selectedStrategy.sources.map((src, i) => (
              <a
                key={i}
                href={src}
                target="_blank"
                rel="noreferrer"
                className="text-purple-700 hover:text-purple-900 underline inline-flex items-center gap-0.5 text-[11px]"
              >
                <span>Source {i + 1}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ))}
          </div>
        </div>

      </div>
    );
  }

  // =========================================================================
  // MAIN VIEW: CLEAN BATTLECARD COMPETITOR STRATEGY DIRECTORY
  // =========================================================================
  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-100">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Competitive Strategy & Market Positioning
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Evidence-based competitor positioning, opportunities for MYST, and competitive threats.
          </p>
        </div>
      </div>

      {/* Search & Sector Filters */}
      <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search competitor strategy by name or archetype..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-purple-50/30 border border-purple-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900 font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['All', 'Schools', 'Corporate', 'Colleges'].map((sec) => (
            <button
              key={sec}
              onClick={() => setSectorFilter(sec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                sectorFilter === sec
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-purple-50 border border-slate-200'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Battlecard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredList.map(item => (
          <div
            key={item.competitorId}
            onClick={() => setSelectedStrategy(item)}
            className="group bg-white rounded-2xl border border-purple-100 hover:border-purple-300 shadow-2xs hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between min-h-[195px] cursor-pointer"
          >
            <div>
              {/* Top: Monogram + Name */}
              <div className="flex items-center gap-3 mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c0a1a] via-[#1a1236] to-[#261f42] text-purple-300 font-black text-sm flex items-center justify-center shrink-0 border border-purple-900/40 shadow-xs group-hover:scale-105 transition-transform">
                  {item.competitorName.substring(0, 2).toUpperCase()}
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-purple-700 transition-colors line-clamp-1 leading-snug">
                  {item.competitorName}
                </h3>
              </div>

              {/* Exactly Two Key Information Items */}
              <div className="space-y-1.5 pl-0.5">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">{item.primarySector}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">{item.marketPresence.split(',')[0]}</span>
                </div>
              </div>
            </div>

            {/* Single Prominent View Button */}
            <div className="pt-4 mt-3 border-t border-purple-50">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedStrategy(item);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Strategy</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

