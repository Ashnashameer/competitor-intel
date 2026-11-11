import React from 'react';
import { 
  Building2, 
  Target, 
  Handshake, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  GraduationCap,
  Landmark,
  Briefcase,
  Users,
  Search,
  GitCompare,
  FileCheck2,
  Compass
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { getCategoryCompetitorCounts } from '../data/categoryRelationships';

/**
 * OverviewDashboard:
 * Human-designed Command Center for the Competitor Intelligence Hub.
 * 
 * Answers immediately for any first-time visitor:
 * 1. What is this?
 * 2. Why does it exist?
 * 3. What can I do here?
 * 4. Where should I start?
 * 5. What information am I looking at?
 */
export function OverviewDashboard({ onSelectOrg, setActiveTab }) {
  const { organisations } = useData();

  const totalOrganisations = organisations.length;
  const directCompetitors = organisations.filter(
    o => o.competitiveRelevance === 'Direct'
  ).length;
  const potentialPartners = organisations.filter(
    o => o.competitiveRelevance === 'Potential Partner'
  ).length;
  const verifiedCount = organisations.filter(
    o => o.verificationStatus === 'verified'
  ).length;
  const completionPercentage = totalOrganisations > 0 
    ? Math.round((verifiedCount / totalOrganisations) * 100) 
    : 0;

  const categoryCounts = React.useMemo(() => {
    return getCategoryCompetitorCounts(organisations);
  }, [organisations]);

  // Recently audited organisations
  const recentOrganisations = [...organisations]
    .sort((a, b) => (b.researchDate || '').localeCompare(a.researchDate || ''))
    .slice(0, 8);

  return (
    <div className="space-y-6">
      
      {/* =========================================================================
          1. WELCOME & GETTING STARTED COMMAND BANNER
          Answers: What is this? Why does it exist? Where should I start?
          ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
              Kerala Market Research
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              A MYST Initiative
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Competitor Intelligence Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            This hub analyzes <strong>{totalOrganisations} technology education providers</strong> across Kerala—including K-12 robotics curricula, university engineering labs, corporate finishing schools, and startup incubators.
          </p>
        </div>

        {/* 4 Clear Starting Actions: "Where should I start?" */}
        <div className="mt-6 pt-5 border-t border-slate-150 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Action 1: Find Competitors */}
          <button
            onClick={() => setActiveTab('organisations')}
            className="flex flex-col justify-between p-3.5 rounded-lg bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition-all text-left group cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-md bg-white border border-slate-200 text-purple-600 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
                <Search className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">Find Competitors</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Search all {totalOrganisations} profiles & locations</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-purple-600">
              <span>Open directory</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Action 2: Schools */}
          <button
            onClick={() => setActiveTab('schools')}
            className="flex flex-col justify-between p-3.5 rounded-lg bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition-all text-left group cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-md bg-white border border-slate-200 text-purple-600 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">Schools Segment</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">{categoryCounts.schools} K-12 AI & coding curricula</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-purple-600">
              <span>Browse schools</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Action 3: Compare Rivals */}
          <button
            onClick={() => setActiveTab('compare')}
            className="flex flex-col justify-between p-3.5 rounded-lg bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition-all text-left group cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-md bg-white border border-slate-200 text-purple-600 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
                <GitCompare className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">Compare Competitors</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Benchmark pricing, curricula & tech</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-purple-600">
              <span>Compare rivals</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Action 4: Research Sources */}
          <button
            onClick={() => setActiveTab('sources')}
            className="flex flex-col justify-between p-3.5 rounded-lg bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 transition-all text-left group cursor-pointer"
          >
            <div>
              <div className="w-8 h-8 rounded-md bg-white border border-slate-200 text-purple-600 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-slate-900 group-hover:text-purple-700">Research Evidence</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">50 citations, links & gazettes</p>
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-purple-600">
              <span>View sources</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. SUMMARY METRICS ROW
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Competitors
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalOrganisations}</span>
            <span className="text-xs text-slate-500 font-medium">active profiles</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">All 14 Kerala districts</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Direct Rivals
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{directCompetitors}</span>
            <span className="text-xs text-rose-600 font-semibold">direct overlap</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">AI, coding & robotics curricula</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Potential Partners
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
              <Handshake className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{potentialPartners}</span>
            <span className="text-xs text-purple-700 font-semibold">collaborators</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Colleges & school ecosystems</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Research Verified
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{completionPercentage}%</span>
            <span className="text-xs text-emerald-700 font-semibold">{verifiedCount} verified</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">Public evidence & documentation</p>
        </div>
      </div>

      {/* =========================================================================
          3. RECENTLY AUDITED COMPETITORS SECTION
          ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Recently Audited Competitors</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest intelligence profiles added or updated in the database.</p>
          </div>
          <button
            onClick={() => setActiveTab('organisations')}
            className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All ({totalOrganisations})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Standard Clean Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-5 py-3">Competitor</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Market Position</th>
                <th className="px-4 py-3">Audit Date</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150">
              {recentOrganisations.map(org => (
                <tr 
                  key={org.id}
                  onClick={() => onSelectOrg(org)}
                  className="hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-3 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                        {org.logoText || (org.name ? org.name.substring(0, 2).toUpperCase() : 'CO')}
                      </div>
                      <span className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                        {org.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {org.orgType}
                  </td>

                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      {org.city}, {org.district}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                      org.competitiveRelevance === 'Direct'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : org.competitiveRelevance === 'Potential Partner'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {org.competitiveRelevance}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-500 text-[11px] whitespace-nowrap">
                    {org.researchDate || 'Verified'}
                  </td>

                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <span className="text-purple-600 group-hover:text-purple-800 font-medium inline-flex items-center gap-1">
                      <span>View Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
