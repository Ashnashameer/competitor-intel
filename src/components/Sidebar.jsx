import React from 'react';
import {
  Home,
  LayoutDashboard,
  Building2,
  GraduationCap,
  Briefcase,
  Users,
  Landmark,
  GitCompare,
  FileCheck2,
  RotateCcw,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { MystEdgeLogo } from './MystEdgeLogo';
import { getCategoryCompetitorCounts } from '../data/categoryRelationships';

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

  const CATEGORY_ITEMS = [
    { id: 'schools', label: 'Schools', icon: GraduationCap, count: categoryCounts.schools },
    { id: 'colleges', label: 'Colleges', icon: Landmark, count: categoryCounts.colleges },
    { id: 'corporate', label: 'Corporate', icon: Briefcase, count: categoryCounts.corporate },
    { id: 'other_partnerships', label: 'Other Partnerships', icon: Users, count: categoryCounts.other_partnerships },
  ];

  const TOOL_ITEMS = [
    { id: 'overview', label: 'Market Overview', icon: LayoutDashboard },
    { id: 'organisations', label: 'All Organisations', icon: Building2, count: statistics.total },
    { id: 'compare', label: 'Compare Rivals', icon: GitCompare },
    { id: 'sources', label: 'Research Sources', icon: FileCheck2, count: researchSources ? researchSources.length : null },
  ];

  const STRATEGIC_ITEMS = [
    { id: 'strategy', label: 'Competitive Strategy', icon: Target },
    { id: 'trends', label: 'Market Trends', icon: TrendingUp },
    { id: 'activities', label: 'Activity Tracker', icon: Activity },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container: Selective Dark Purple Gradient */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0c0a1a] via-[#120f26] to-[#0a0817] text-slate-200 flex flex-col border-r border-[#241e3d] shadow-xl transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div 
          onClick={() => {
            setActiveTab('welcome');
            setIsOpen(false);
          }}
          className="p-4 border-b border-[#241e3d]/80 bg-[#090714]/60 cursor-pointer hover:bg-white/[0.02] transition-colors"
          title="Return to Welcome Screen"
        >
          <MystEdgeLogo size="lg" showSub={true} />

          <div className="mt-3 pt-2.5 border-t border-[#241e3d]/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Competitive Intelligence</span>
            <span className="text-purple-300 font-semibold tracking-wide">Kerala Focus</span>
          </div>
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
          
          {/* Home Link */}
          <button
            onClick={() => {
              setActiveTab('welcome');
              setIsOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.06] transition-colors text-left cursor-pointer"
          >
            <Home className="w-4 h-4 text-purple-300/70" />
            <span>Hero Landing</span>
          </button>

          {/* Primary Hub: Competitor Categories */}
          <div>
            <div className="px-3 mb-1.5 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-wider text-purple-300/60 uppercase font-bold">
                PRIMARY ENTRY POINTS
              </span>
            </div>

            <button
              onClick={() => {
                setActiveTab('categories');
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs transition-all text-left mb-1.5 cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-purple-950/60 ring-1 ring-purple-400/40'
                  : 'text-slate-200 hover:text-white hover:bg-white/[0.06] font-semibold bg-white/[0.02] border border-[#241e3d]/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className={`w-4 h-4 ${activeTab === 'categories' ? 'text-white' : 'text-purple-400'}`} />
                <span>Competitor Categories</span>
              </div>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                4 Verticals
              </span>
            </button>

            {/* 4 Category Sub-Links */}
            <div className="space-y-1 pl-2">
              {CATEGORY_ITEMS.map(item => {
                const Icon = item.icon;
                const isSelected = (activeTab === 'category-detail' && selectedCategory === item.id) || activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (onSelectCategory) {
                        onSelectCategory(item.id);
                      } else {
                        setActiveTab(item.id);
                      }
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-purple-700/80 text-white font-bold shadow-xs border border-purple-500/50'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple-400/70'}`} />
                      <span>{item.label}</span>
                    </div>

                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-semibold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-purple-950/80 text-purple-300 border border-purple-800/60'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Analysis & Market Tools */}
          <div className="pt-2 border-t border-[#241e3d]/60">
            <div className="px-3 mb-2">
              <span className="font-mono text-[9px] tracking-wider text-purple-300/60 uppercase font-bold">
                ANALYSIS & TOOLS
              </span>
            </div>

            <div className="space-y-1">
              {TOOL_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id || (activeTab === 'comparison' && item.id === 'compare');

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-300/70'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.count !== undefined && item.count !== null && (
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-semibold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-purple-950/80 text-purple-300 border border-purple-800/60'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Strategic Intelligence Section */}
          <div className="pt-2 border-t border-[#241e3d]/60">
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-wider text-purple-300/60 uppercase font-bold">
                STRATEGIC INTELLIGENCE
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-violet-500/20 text-violet-300 border border-violet-400/30">
                MODULES
              </span>
            </div>

            <div className="space-y-1">
              {STRATEGIC_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs transition-all text-left cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.05] font-medium'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-300/70'}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#241e3d]/80 bg-[#090714]/80 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            <span className="font-mono text-[10px] tracking-wider text-purple-300">#EDGEHUB</span>
          </div>
          <button
            onClick={() => {
              if (window.confirm('Reset all records to default verified research state?')) {
                resetToDemoData();
              }
            }}
            title="Reset dataset"
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
}
