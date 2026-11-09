import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Cpu,
  GraduationCap,
  Sparkles,
  Layers,
  Calendar,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MARKET_TRENDS_DATA } from '../data/strategicIntelligenceData';

const TREND_CATEGORIES = [
  'All',
  'Emerging Technologies',
  'New Education Programmes',
  'Industry Demand',
  'New Competitors',
  'Changes in School Requirements'
];

export function MarketTrendsModule({ onNavigateHome }) {
  const [selectedTrend, setSelectedTrend] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filteredTrends = useMemo(() => {
    return MARKET_TRENDS_DATA.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesTech = item.technologyFocus.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSource = item.source.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTech && !matchesDesc && !matchesSource) return false;
      }
      if (categoryFilter !== 'All') {
        if (item.category !== categoryFilter) return false;
      }
      return true;
    });
  }, [searchQuery, categoryFilter]);

  // =========================================================================
  // DETAILED VIEW: DEDICATED MARKET TREND INTELLIGENCE DOSSIER
  // =========================================================================
  if (selectedTrend) {
    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-200">
        
        {/* Breadcrumb Navigation & Back */}
        <div className="flex items-center justify-between pb-2 border-b border-purple-100">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button
              onClick={() => setSelectedTrend(null)}
              className="text-purple-700 hover:text-purple-900 hover:underline font-semibold"
            >
              Market & Industry Trends
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold line-clamp-1">{selectedTrend.title}</span>
          </nav>

          <button
            onClick={() => setSelectedTrend(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Trends</span>
          </button>
        </div>

        {/* Trend Header Dossier */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  {selectedTrend.category}
                </span>
                <span className="text-purple-300">•</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {selectedTrend.verificationStatus}
                </span>
              </div>

              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {selectedTrend.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <Cpu className="w-3.5 h-3.5 text-purple-600" />
                  <strong className="text-slate-700">Tech Focus:</strong> {selectedTrend.technologyFocus}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  <strong className="text-slate-700">Timeline:</strong> {selectedTrend.timeline}
                </span>
                <span>•</span>
                <span className="text-slate-500">
                  Published: {selectedTrend.publicationDate}
                </span>
              </div>
            </div>

            {selectedTrend.sourceUrl && (
              <a
                href={selectedTrend.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 shadow-xs transition-all self-start md:self-center shrink-0"
              >
                <span>View Official Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Grid: Trend Description & Strategic Impact on MYST */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview & Analysis */}
            <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-100">
                <TrendingUp className="w-4 h-4 text-purple-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Industry Trend Analysis & Synthesis
                </h3>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {selectedTrend.description}
              </p>

              {/* Key Drivers */}
              <div className="pt-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-2.5">
                  Underlying Market Drivers
                </h4>
                <div className="space-y-2">
                  {selectedTrend.keyDrivers.map((driver, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-purple-50/50 border border-purple-100/70 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{driver}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* School & Institutional Requirements Impact */}
            <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-100 mb-3">
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Impact on School & Academic Requirements
                </h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/80">
                {selectedTrend.schoolRequirementsImpact}
              </p>
            </div>
          </div>

          {/* Right Column: Strategic Impact on MYST & Citation */}
          <div className="space-y-6">
            
            {/* Potential Impact on MYST */}
            <div className="bg-gradient-to-br from-[#120f26] via-[#1a1438] to-[#0d0a1f] text-white rounded-2xl border border-purple-500/30 p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 pb-3 border-b border-purple-400/20 mb-3.5">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <h3 className="text-xs font-bold text-purple-200 uppercase tracking-widest font-mono">
                  Potential Impact on MYST
                </h3>
              </div>

              <div className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider mb-2 font-mono">
                Strategic Growth Engine
              </div>

              <p className="text-sm text-purple-100 leading-relaxed">
                {selectedTrend.impactOnMyst}
              </p>

              <div className="mt-5 pt-4 border-t border-purple-400/20 flex items-center justify-between text-[11px] text-purple-300">
                <span>Actionability: Immediate</span>
                <span className="font-mono font-bold text-white">Priority 1</span>
              </div>
            </div>

            {/* Citation & Source Verification Card */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Source Citation</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="text-xs font-bold text-slate-800">
                  {selectedTrend.source}
                </div>
                {selectedTrend.sourceUrl && (
                  <a
                    href={selectedTrend.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-purple-700 hover:text-purple-900 hover:underline break-all font-mono"
                  >
                    <span>{selectedTrend.sourceUrl}</span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </a>
                )}
              </div>

              <p className="text-[11px] text-slate-500 leading-normal">
                All trends are tied to official circulars, state education surveys, and disclosed corporate CSR filings.
              </p>
            </div>

          </div>

        </div>

      </div>
    );
  }

  // =========================================================================
  // MAIN LISTING: CLEAN MINIMAL BATTLECARD LAYOUT
  // Prominent Title, Exactly 2 Key Info Items Beneath, Single Prominent View Button
  // =========================================================================
  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Header Overline */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
              STRATEGIC INDUSTRY SCAN
            </span>
            <span className="text-purple-300">•</span>
            <span className="text-xs text-slate-500 font-semibold">
              EdTech & Institutional Policy Trends
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Market & Industry Trends
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            Monitor structural shifts in K-12 education, state syllabus mandates (NEP 2020), teacher capacity demands, and autonomous AI emergence across Kerala.
          </p>
        </div>
      </div>

      {/* Search and Category Filter Tabs */}
      <div className="bg-white rounded-2xl border border-purple-100 p-4 shadow-2xs space-y-3.5">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search market trends by topic, technology focus, policy guidelines, or source..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-purple-200 bg-purple-50/20 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {TREND_CATEGORIES.map(cat => {
            const isSelected = categoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-purple-50/70 text-slate-600 hover:text-slate-900 hover:bg-purple-100/70 border border-purple-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Battlecard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTrends.map(trend => {
          return (
            <div
              key={trend.id}
              className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* 1. Prominent Title */}
                <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-purple-700 transition-colors">
                  {trend.title}
                </h3>

                {/* 2. Exactly Two Key Information Items Beneath Title */}
                <div className="mt-3 pt-3 border-t border-purple-50 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 shrink-0">
                      Category
                    </span>
                    <span className="font-semibold text-slate-800 truncate">
                      {trend.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100 shrink-0">
                      Focus
                    </span>
                    <span className="text-slate-700 truncate">
                      {trend.technologyFocus}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Single Prominent View Button */}
              <div className="mt-6 pt-4 border-t border-purple-50">
                <button
                  onClick={() => setSelectedTrend(trend)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 transition-all shadow-xs group-hover:shadow-md cursor-pointer"
                >
                  <span>View Trend</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTrends.length === 0 && (
          <div className="col-span-full bg-white rounded-2xl border border-purple-100 p-12 text-center">
            <TrendingUp className="w-10 h-10 text-purple-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 mb-1">No market trends match your search</h3>
            <p className="text-xs text-slate-500 mb-4">Try clearing the search query or changing the category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

