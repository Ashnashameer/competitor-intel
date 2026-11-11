import React from 'react';
import { 
  SlidersHorizontal, 
  Plus, 
  Download 
} from 'lucide-react';
import { useData } from '../context/DataContext';
import edgeCircleLogo from '../assets/edge_logo_circle.png';

/**
 * Header:
 * Clean, human product header for EDGE Competitor Intel.
 * Provides a self-explanatory title and concise subtitle for every view.
 */
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

  const getPageMeta = () => {
    switch (activeTab) {
      case 'categories':
        return {
          title: 'Competitor Directory',
          subtitle: 'Institutional Category Selection'
        };
      case 'category-detail':
      case 'schools':
        if (selectedCategory === 'schools' || activeTab === 'schools') {
          return {
            title: 'School Partner Directory',
            subtitle: 'External providers, AI & coding curricula, robotics labs, and student programmes.'
          };
        }
        if (selectedCategory === 'colleges' || activeTab === 'colleges') {
          return {
            title: 'College Competitors',
            subtitle: 'Engineering, arts & science colleges, and campus technical training providers.'
          };
        }
        if (selectedCategory === 'corporate' || activeTab === 'corporate') {
          return {
            title: 'Corporate Training Competitors',
            subtitle: 'Professional bootcamps, IT academies, and corporate upskilling firms.'
          };
        }
        if (selectedCategory === 'other_partnerships' || activeTab === 'other_partnerships') {
          return {
            title: 'Partner & Ecosystem Network',
            subtitle: 'Incubators, government skill programs, and institutional partners.'
          };
        }
        return {
          title: 'Category Competitors',
          subtitle: 'Targeted competitive intelligence for selected market vertical.'
        };
      case 'colleges':
        return {
          title: 'College Competitors',
          subtitle: 'Engineering, arts & science colleges, and campus technical training providers.'
        };
      case 'corporate':
        return {
          title: 'Corporate Training Competitors',
          subtitle: 'Professional bootcamps, IT academies, and corporate upskilling firms.'
        };
      case 'other_partnerships':
        return {
          title: 'Partner & Ecosystem Network',
          subtitle: 'Incubators, government skill programs, and institutional partners.'
        };
      case 'overview':
        return {
          title: 'Market Overview',
          subtitle: 'Summary statistics, verified research coverage, and recently audited competitors.'
        };
      case 'organisations':
      case 'directory':
        return {
          title: 'Find Competitors',
          subtitle: 'Search and benchmark 51 verified technology education providers across Kerala.'
        };
      case 'organisation-detail':
        return {
          title: 'Competitor Profile',
          subtitle: 'Detailed institutional dossier, programs, fees, and verified evidence.'
        };
      case 'compare':
      case 'comparison':
        return {
          title: 'Compare Competitors',
          subtitle: 'Side-by-side benchmark across programs, pricing, technologies, and positioning.'
        };
      case 'courses':
        return {
          title: 'Courses & Pricing Database',
          subtitle: 'Verified tech training courses, fees, and program durations.'
        };
      case 'sources':
        return {
          title: 'Research Sources & Evidence',
          subtitle: 'Verifiable citations, official brochures, gazettes, and documentation links.'
        };
      case 'strategy':
        return {
          title: 'Strategy Battlecards',
          subtitle: 'Direct differentiation analysis, competitor strengths, and competitive advantages.'
        };
      case 'trends':
        return {
          title: 'Market Trends & Policy Directives',
          subtitle: 'NEP 2020 guidelines, CBSE circulars, and emerging technology adoption.'
        };
      case 'activities':
        return {
          title: 'Competitor Activity Tracker',
          subtitle: 'Recent competitor announcements, school MoUs, and strategic movements.'
        };
      default:
        return {
          title: 'Competitor Intelligence Hub',
          subtitle: 'Market research and competitive intelligence platform.'
        };
    }
  };

  const meta = getPageMeta();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-2xs">
      <div className="px-3.5 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Section Title & Human Subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setActiveTab && setActiveTab('welcome')}
            className="hidden sm:block w-8 h-8 rounded-full overflow-hidden ring-1 ring-purple-200 hover:ring-purple-500 shrink-0 cursor-pointer transition-all shadow-xs"
            title="Return to Landing Page"
          >
            <img 
              src={edgeCircleLogo} 
              alt="EDGE" 
              className="w-full h-full object-cover" 
            />
          </button>
          <div className="min-w-0">
            <h1 className="text-sm xs:text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate leading-tight">
              {meta.title}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500 truncate mt-0.5 hidden xs:block">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Right Actions: Restrained, Standard Web Controls (Matching Purple Theme) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Filters Toggle Button (Hidden on pure category selection page) */}
          {activeTab !== 'categories' && (
            <button
              onClick={() => setIsSlicerOpen(!isSlicerOpen)}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                activeFilterCount > 0
                  ? 'bg-purple-50 text-purple-700 border-purple-200 font-semibold'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-purple-600" />
              <span className="hidden xs:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-purple-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          )}

          {/* Export CSV Button */}
          <button
            onClick={exportToCSV}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
            title="Export competitor records to CSV spreadsheet"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          {/* Primary Action: Add Competitor */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add<span className="hidden sm:inline"> Competitor</span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
