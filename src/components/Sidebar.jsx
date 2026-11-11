import React from 'react';
import {
  LayoutDashboard,
  Building2,
  GitCompare,
  FileCheck2,
  TrendingUp,
  RotateCcw,
  ArrowLeft,
  X
} from 'lucide-react';
import { useData } from '../context/DataContext';
import edgeCircleLogo from '../assets/edge_logo_circle.png';
import { getCategoryCompetitorCounts } from '../data/categoryRelationships';

/**
 * Sidebar:
 * Clean, human-designed navigation for EDGE Competitor Intel.
 * 
 * Features:
 * - Reduced to 5 crystal-clear, human-friendly primary options:
 *   1. Overview (Dashboard, metrics, quick start)
 *   2. Find Competitors (All 51 organisations + instant category filtering)
 *   3. Compare Competitors (Side-by-side benchmark & courses)
 *   4. Market Insights (Strategy battlecards, trends, activity tracker)
 *   5. Research Sources (50 verified citations & audit records)
 * - Clean light neutral SaaS styling (Slate-50 background, crisp borders)
 * - Obvious active states with solid indigo accents
 * - Responsive mobile drawer
 */
export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  isOpen, 
  setIsOpen,
  selectedCategory,
  onSelectCategory
}) {
  const { organisations, statistics, researchSources, resetToDemoData } = useData();

  const categoryCounts = React.useMemo(() => {
    return getCategoryCompetitorCounts(organisations);
  }, [organisations]);

  // Exactly 5 human-understandable primary navigation items
  const NAV_ITEMS = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      description: 'Summary & quick start'
    },
    {
      id: 'categories',
      label: 'Find Competitors',
      icon: Building2,
      count: statistics.total || organisations.length,
      description: 'Search all 51 organisations',
      matchTabs: ['organisations', 'directory', 'categories', 'category-detail', 'schools', 'colleges', 'corporate', 'other_partnerships']
    },
    {
      id: 'compare',
      label: 'Compare Competitors',
      icon: GitCompare,
      description: 'Side-by-side benchmark',
      matchTabs: ['compare', 'comparison', 'courses']
    },
    {
      id: 'insights',
      label: 'Market Insights',
      icon: TrendingUp,
      description: 'Trends & battlecards',
      matchTabs: ['strategy', 'trends', 'activities', 'insights']
    },
    {
      id: 'sources',
      label: 'Research Sources',
      icon: FileCheck2,
      count: researchSources ? researchSources.length : 50,
      description: 'Verified citations & evidence',
      matchTabs: ['sources']
    }
  ];

  const handleItemClick = (item) => {
    if (item.id === 'insights') {
      setActiveTab('strategy');
    } else {
      setActiveTab(item.id);
    }
    setIsOpen(false);
  };

  const isItemActive = (item) => {
    if (item.matchTabs) {
      return item.matchTabs.includes(activeTab);
    }
    return activeTab === item.id;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container: Selective Dark Purple Gradient */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0c0a1a] via-[#120f26] to-[#0a0817] text-slate-200 flex flex-col border-r border-[#241e3d] shadow-xl lg:shadow-none transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-[#241e3d]/80 bg-[#090714]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-purple-400/40 shadow-xs shrink-0">
                <img 
                  src={edgeCircleLogo} 
                  alt="EDGE Logo" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-white tracking-wider font-mono">
                  EDGE INTEL
                </span>
                <span className="text-[9px] font-semibold text-purple-300 tracking-wider uppercase font-mono">
                  A MYST INITIATIVE
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Return to Landing Page */}
          <button
            onClick={() => {
              setActiveTab('welcome');
              setIsOpen(false);
            }}
            className="mt-3 w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer border border-[#241e3d]"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowLeft className="w-3 h-3 text-purple-400" />
              <span>Landing Page</span>
            </span>
            <span className="text-[10px] text-purple-300/80 font-mono">Exit</span>
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-2 pb-1.5">
            <span className="text-[9.5px] font-mono font-bold text-purple-300/60 tracking-wider uppercase">
              MAIN MENU
            </span>
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item);

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all text-left cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-md shadow-purple-950/60 ring-1 ring-purple-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.06] font-medium'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-purple-300/70'}`} />
                  <div className="min-w-0">
                    <div className="truncate">{item.label}</div>
                    <div className={`text-[10px] font-normal truncate ${active ? 'text-purple-100' : 'text-slate-400'}`}>{item.description}</div>
                  </div>
                </div>

                {item.count !== undefined && item.count !== null && (
                  <span
                    className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium shrink-0 ${
                      active
                        ? 'bg-white/20 text-white border border-white/30'
                        : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Category Jump Sub-Section */}
          <div className="pt-4 mt-4 border-t border-[#241e3d]">
            <div className="px-2 pb-2">
              <span className="text-[9.5px] font-mono font-bold text-purple-300/60 tracking-wider uppercase">
                BROWSE BY SEGMENT
              </span>
            </div>

            <div className="space-y-0.5">
              {[
                { id: 'schools', label: 'Schools', count: categoryCounts.schools },
                { id: 'colleges', label: 'Colleges', count: categoryCounts.colleges },
                { id: 'corporate', label: 'Corporate', count: categoryCounts.corporate },
                { id: 'other_partnerships', label: 'Partnerships', count: categoryCounts.other_partnerships },
              ].map(cat => {
                const isCatActive = (activeTab === 'category-detail' && selectedCategory === cat.id) || activeTab === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.id);
                      else setActiveTab('category-detail');
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-[11px] transition-colors text-left cursor-pointer ${
                      isCatActive
                        ? 'bg-purple-950/70 text-purple-200 font-semibold border border-purple-800/40 shadow-xs'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="truncate">{cat.label}</span>
                    <span className="text-[10px] font-mono text-purple-300/70">
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer: Status & Reset Baseline */}
        <div className="p-3 border-t border-[#241e3d]/80 bg-[#090714]/80 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            <span className="text-[10px] font-mono tracking-wider text-purple-300 font-semibold">EDGE // RESEARCH</span>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all records to default verified research state?')) {
                resetToDemoData();
              }
            }}
            title="Restore baseline verified research dataset"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
}
