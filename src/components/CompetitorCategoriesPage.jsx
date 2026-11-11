import React from 'react';
import { 
  GraduationCap, 
  Landmark, 
  Briefcase, 
  Users, 
  ArrowRight
} from 'lucide-react';
import { getCategoryCompetitorCounts } from '../data/categoryRelationships';
import { useData } from '../context/DataContext';

/**
 * CompetitorCategoriesPage:
 * Pure four-card category selection screen.
 * Contains ONLY the four category cards: SCHOOLS, COLLEGES & UNIVERSITIES, CORPORATE, OTHER PARTNERSHIPS.
 * No descriptions, no extra headings, no subtitles, no search, no filters.
 */
export function CompetitorCategoriesPage({ onSelectCategory }) {
  const { organisations } = useData();

  // Dynamic counts for each of the 4 categories from verified database
  const categoryCounts = React.useMemo(() => {
    return getCategoryCompetitorCounts(organisations);
  }, [organisations]);

  const CATEGORIES = [
    {
      id: 'schools',
      name: 'SCHOOLS',
      icon: GraduationCap,
      countKey: 'schools'
    },
    {
      id: 'colleges',
      name: 'COLLEGES & UNIVERSITIES',
      icon: Landmark,
      countKey: 'colleges'
    },
    {
      id: 'corporate',
      name: 'CORPORATE',
      icon: Briefcase,
      countKey: 'corporate'
    },
    {
      id: 'other_partnerships',
      name: 'OTHER PARTNERSHIPS',
      icon: Users,
      countKey: 'other_partnerships'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      {/* Balanced 2x2 Category Cards Grid - Refined & Compact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const count = categoryCounts[cat.countKey] || 0;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative rounded-xl p-5 sm:p-7 bg-white border border-slate-200/90 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-950/10 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden text-left hover:-translate-y-1 min-h-[190px]"
            >
              {/* Subtle Watermark Icon */}
              <Icon 
                className="absolute -right-3 -bottom-3 w-32 h-32 pointer-events-none text-slate-900/[0.025] group-hover:text-purple-600/[0.05] group-hover:scale-105 transition-all duration-500" 
                aria-hidden="true"
              />

              {/* Top Accent Highlight */}
              <div className="absolute inset-x-0 top-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:via-purple-600 group-hover:to-indigo-600 transition-all duration-300" />

              <div>
                {/* Top Row: Refined Icon + Entity Count Indicator */}
                <div className="flex items-center justify-between gap-3 mb-3.5 relative z-10">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-purple-50 text-purple-700 ring-1 ring-purple-100/90 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-tight bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-purple-50 group-hover:text-purple-900 group-hover:border-purple-200 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{count} {count === 1 ? 'Entity' : 'Entities'}</span>
                  </span>
                </div>

                {/* Refined Category Name */}
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-purple-700 uppercase transition-colors relative z-10 font-sans mt-2">
                  {cat.name}
                </h2>
              </div>

              {/* Bottom Row: Clear Explore Interaction */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-900 transition-colors relative z-10">
                <span className="tracking-wide">Explore {cat.name}</span>
                <div className="flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider">Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600 group-hover:text-purple-900" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
