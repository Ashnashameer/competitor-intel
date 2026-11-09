import React from 'react';
import { 
  GraduationCap, 
  Landmark, 
  Briefcase, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { MARKET_CATEGORIES, getCategoryCompetitorCounts } from '../data/categoryRelationships';
import { useData } from '../context/DataContext';

export function CompetitorCategoriesPage({ onSelectCategory }) {
  const { organisations } = useData();

  // Dynamic counts for each of the 4 categories from existing database
  const categoryCounts = React.useMemo(() => {
    return getCategoryCompetitorCounts(organisations);
  }, [organisations]);

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap':
        return GraduationCap;
      case 'Landmark':
        return Landmark;
      case 'Briefcase':
        return Briefcase;
      case 'Users':
      default:
        return Users;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-10 lg:py-14 animate-in fade-in duration-300">
      {/* Only Four Category Cards: Clean, Spacious, and Premium Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {MARKET_CATEGORIES.map((cat) => {
          const Icon = getCategoryIcon(cat.icon);
          const count = categoryCounts[cat.id] || 0;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-7 lg:p-8 border border-purple-100/90 hover:border-purple-300 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] overflow-hidden hover:scale-[1.01]"
            >
              {/* Subtle ambient hover glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-600/5 group-hover:bg-purple-600/15 rounded-full blur-2xl transition-all pointer-events-none" />

              <div>
                {/* Top Row: Icon Emblem + Dynamic Count Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.accentGradient} text-white flex items-center justify-center shadow-md shadow-purple-900/15 group-hover:scale-105 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold font-mono tracking-tight bg-purple-50 text-purple-900 border border-purple-200/80 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                    {count} {count === 1 ? 'Competitor' : 'Competitors'}
                  </span>
                </div>

                {/* Category Title Only */}
                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">
                  {cat.title}
                </h2>
              </div>

              {/* Bottom Explore CTA Action */}
              <div className="pt-5 border-t border-purple-100/80 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-900 mt-6">
                <span className="group-hover:underline">
                  Explore {cat.title}
                </span>
                <div className="w-8 h-8 rounded-full bg-purple-50 group-hover:bg-purple-600 text-purple-700 group-hover:text-white flex items-center justify-center transition-all shadow-2xs group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
