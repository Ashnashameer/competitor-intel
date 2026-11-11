import React, { useState, useMemo } from 'react';
import {
  Clock,
  Search,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Filter,
  Sparkles,
  Layers,
  CheckCircle2,
  Activity,
  Briefcase
} from 'lucide-react';
import { COMPETITOR_ACTIVITIES_DATA } from '../data/strategicIntelligenceData';
import { useData } from '../context/DataContext';

const ACTIVITY_CATEGORIES = [
  'All',
  'School Partnerships',
  'Programme Launch',
  'Regional Expansion',
  'New Services',
  'Company Announcements'
];

export function CompetitorActivityTracker({ onSelectOrg, onNavigateHome }) {
  const { organisations } = useData();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [competitorFilter, setCompetitorFilter] = useState('All');

  // Extract unique competitor names for filter dropdown
  const uniqueCompetitors = useMemo(() => {
    const set = new Set(COMPETITOR_ACTIVITIES_DATA.map(a => a.competitorName));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered Activities sorted chronologically (newest first)
  const filteredActivities = useMemo(() => {
    return COMPETITOR_ACTIVITIES_DATA.filter(item => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesComp = item.competitorName.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesRel = item.relevanceToMyst.toLowerCase().includes(q);
        if (!matchesTitle && !matchesComp && !matchesDesc && !matchesRel) return false;
      }
      if (categoryFilter !== 'All') {
        if (item.category !== categoryFilter) return false;
      }
      if (competitorFilter !== 'All') {
        if (item.competitorName !== competitorFilter) return false;
      }
      return true;
    }).sort((a, b) => new Date(b.publicationDate) - new Date(a.publicationDate));
  }, [searchQuery, categoryFilter, competitorFilter]);

  // Helper to open competitor's master profile if registered
  const handleOpenCompetitorProfile = (competitorId, competitorName) => {
    if (!onSelectOrg || !organisations) return;
    const found = organisations.find(o => 
      o.id === competitorId || 
      o.name.toLowerCase() === competitorName.toLowerCase() ||
      o.name.toLowerCase().includes(competitorName.toLowerCase()) ||
      competitorName.toLowerCase().includes(o.name.toLowerCase())
    );
    if (found) {
      onSelectOrg(found);
    }
  };

  // =========================================================================
  // DETAILED VIEW: DEDICATED ACTIVITY DOSSIER
  // =========================================================================
  if (selectedActivity) {
    return (
      <div className="space-y-6 pb-16 animate-in fade-in duration-200">
        
        {/* Breadcrumb Navigation & Back */}
        <div className="flex items-center justify-between pb-2 border-b border-purple-100">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <button
              onClick={() => setSelectedActivity(null)}
              className="text-purple-700 hover:text-purple-900 hover:underline font-semibold"
            >
              Competitor Activity Tracker
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold line-clamp-1">{selectedActivity.title}</span>
          </nav>

          <button
            onClick={() => setSelectedActivity(null)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Tracker</span>
          </button>
        </div>

        {/* Activity Header Dossier */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  {selectedActivity.category}
                </span>
                <span className="text-purple-300">•</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {selectedActivity.verificationStatus} Evidence
                </span>
              </div>

              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                {selectedActivity.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                <button
                  onClick={() => handleOpenCompetitorProfile(selectedActivity.competitorId, selectedActivity.competitorName)}
                  className="flex items-center gap-1.5 font-bold text-purple-700 hover:text-purple-900 hover:underline cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>{selectedActivity.competitorName}</span>
                </button>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <Briefcase className="w-3.5 h-3.5 text-purple-600" />
                  {selectedActivity.industry}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-purple-600" />
                  {selectedActivity.publicationDate}
                </span>
              </div>
            </div>

            {selectedActivity.sourceLink && (
              <a
                href={selectedActivity.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-700 to-purple-700 hover:from-purple-800 hover:to-purple-800 shadow-xs transition-all self-start md:self-center shrink-0"
              >
                <span>Verified Source Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Detailed Intelligence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Description (2 Cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-purple-100">
                <Activity className="w-4 h-4 text-purple-700" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Activity Intelligence & Context
                </h3>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {selectedActivity.description}
              </p>

              {/* Activity Metadata Table */}
              <div className="pt-4 border-t border-purple-50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100/70">
                  <div className="text-slate-400 font-mono text-[10px] uppercase font-bold mb-1">Competitor Identity</div>
                  <div className="font-bold text-slate-900">{selectedActivity.competitorName}</div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100/70">
                  <div className="text-slate-400 font-mono text-[10px] uppercase font-bold mb-1">Activity Classification</div>
                  <div className="font-bold text-slate-900">{selectedActivity.category}</div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100/70">
                  <div className="text-slate-400 font-mono text-[10px] uppercase font-bold mb-1">Target Sector</div>
                  <div className="font-bold text-slate-900">{selectedActivity.industry}</div>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/50 border border-purple-100/70">
                  <div className="text-slate-400 font-mono text-[10px] uppercase font-bold mb-1">Recorded Date</div>
                  <div className="font-bold text-slate-900">{selectedActivity.publicationDate}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Strategic Relevance to MYST */}
          <div className="space-y-6">
            
            {/* Relevance to MYST Card */}
            <div className="bg-gradient-to-br from-[#120f26] via-[#1a1438] to-[#0d0a1f] text-white rounded-2xl border border-purple-500/30 p-6 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center gap-2 pb-3 border-b border-purple-400/20 mb-3.5">
                <Sparkles className="w-4 h-4 text-purple-300" />
                <h3 className="text-xs font-bold text-purple-200 uppercase tracking-widest font-mono">
                  Relevance to MYST International
                </h3>
              </div>

              <div className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider mb-2 font-mono">
                Counter-Positioning Insight
              </div>

              <p className="text-sm text-purple-100 leading-relaxed">
                {selectedActivity.relevanceToMyst}
              </p>

              <div className="mt-5 pt-4 border-t border-purple-400/20 flex items-center justify-between text-[11px] text-purple-300">
                <span>Verified Strategic Threat / Opp</span>
                <span className="font-mono font-bold text-white">Monitored</span>
              </div>
            </div>

            {/* Traceable Source Link */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5 shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Source Reference</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <a
                  href={selectedActivity.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-purple-700 hover:text-purple-900 hover:underline break-all font-mono font-medium"
                >
                  <span>{selectedActivity.sourceLink}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>
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
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Activity Tracking
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Live Competitor Movements
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Competitor Activity Tracker
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Track real-time moves across competitors in Kerala: newly launched programmes, school partnerships, regional expansions, and service announcements.
          </p>
        </div>
      </div>

      {/* Search & Filters Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search activities by title, competitor name, description, or relevance..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-250 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium"
          />
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {ACTIVITY_CATEGORIES.map(cat => {
              const isSelected = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Competitor Filter Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] font-medium text-slate-500">Competitor:</span>
            <select
              value={competitorFilter}
              onChange={(e) => setCompetitorFilter(e.target.value)}
              className="px-2.5 py-1 rounded-md text-xs font-medium border border-slate-250 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
            >
              {uniqueCompetitors.map(comp => (
                <option key={comp} value={comp}>{comp}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Battlecard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map(act => {
          return (
            <div
              key={act.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:shadow-md hover:border-slate-350 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* 1. Prominent Title */}
                <h3 className="text-sm font-semibold text-slate-900 leading-snug group-hover:text-purple-600 transition-colors line-clamp-2">
                  {act.title}
                </h3>

                {/* 2. Exactly Two Key Information Items Beneath Title */}
                <div className="mt-3 pt-3 border-t border-slate-150 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                      Competitor
                    </span>
                    <span className="font-medium text-slate-800 truncate">
                      {act.competitorName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                      Category
                    </span>
                    <span className="text-slate-600 truncate">
                      {act.category} • {act.publicationDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. View Button */}
              <div className="mt-4 pt-3 border-t border-slate-150">
                <button
                  onClick={() => setSelectedActivity(act)}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium text-slate-700 hover:text-white bg-slate-50 hover:bg-purple-600 border border-slate-200 hover:border-purple-600 transition-all cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}

        {filteredActivities.length === 0 && (
          <div className="col-span-full bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-900 mb-1">No activities match your filters</h3>
            <p className="text-xs text-slate-500 mb-4">Try clearing the search query or changing the category or competitor filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setCategoryFilter('All');
                setCompetitorFilter('All');
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

