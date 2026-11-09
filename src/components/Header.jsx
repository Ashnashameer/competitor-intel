import React from 'react';
import { 
  SlidersHorizontal, 
  Plus, 
  Download, 
  MapPin, 
  Sparkles
} from 'lucide-react';
import { useData } from '../context/DataContext';
import edgeCircleLogo from '../assets/edge_logo_circle.png';

export function Header({ 
  activeTab, 
  setActiveTab,
  selectedCategory,
  isSlicerOpen, 
  setIsSlicerOpen, 
  onOpenAddModal 
}) {
  const { 
    activeFilterCount, 
    exportToCSV
  } = useData();

  const getPageTitle = () => {
    switch (activeTab) {
      case 'categories':
        return 'Competitor Categories';
      case 'category-detail':
        if (selectedCategory === 'schools') return 'Schools Competitor Intelligence';
        if (selectedCategory === 'colleges') return 'Colleges Competitor Intelligence';
        if (selectedCategory === 'corporate') return 'Corporate Competitor Intelligence';
        if (selectedCategory === 'other_partnerships') return 'Other Partnerships Intelligence';
        return 'Category Competitor Intelligence';
      case 'schools':
        return 'Schools Competitor Intelligence';
      case 'colleges':
        return 'Colleges Competitor Intelligence';
      case 'corporate':
        return 'Corporate Competitor Intelligence';
      case 'other_partnerships':
        return 'Other Partnerships Intelligence';
      case 'overview':
        return 'Market Analysis Overview';
      case 'organisations':
        return 'Competitor Intelligence Directory';
      case 'organisation-detail':
        return 'Competitor Intelligence Profile';
      case 'compare':
      case 'comparison':
        return 'Compare Competitors';
      case 'sources':
        return 'Research Sources & Evidence';
      case 'strategy':
        return 'Competitive Strategy & Market Positioning';
      case 'trends':
        return 'Market & Industry Trends';
      case 'activities':
        return 'Competitor Activity Tracker';
      default:
        return 'Competitor Intelligence Hub';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-purple-100 shadow-xs">
      <div className="px-5 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Section Title with Brand Overline & Official Logo Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab && setActiveTab('welcome')}
            className="hidden sm:block w-9 h-9 rounded-full overflow-hidden shadow-xs ring-1 ring-purple-200/80 hover:ring-purple-500 shrink-0 cursor-pointer transition-all group"
            title="Return to Welcome Screen"
          >
            <img 
              src={edgeCircleLogo} 
              alt="EDGE Logo" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
            />
          </button>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-mono text-[9px] tracking-[0.22em] uppercase font-bold text-slate-500">
                A MYST INITIATIVE
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              {getPageTitle()}
            </h2>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Filters Toggle Button */}
          <button
            onClick={() => setIsSlicerOpen(!isSlicerOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              activeFilterCount > 0
                ? 'bg-purple-50 text-purple-700 border-purple-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-purple-50/50 hover:border-purple-200'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Export CSV Button */}
          <button
            onClick={exportToCSV}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:bg-purple-50/50 hover:border-purple-200 transition-colors"
            title="Export organisations to CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          {/* Primary Action: Add Organisation */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-800 shadow-xs transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Organisation</span>
          </button>
        </div>
      </div>
    </header>
  );
}
