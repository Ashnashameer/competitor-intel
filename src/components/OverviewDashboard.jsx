import React from 'react';
import { 
  Building2, 
  Target, 
  Handshake, 
  CheckCircle2, 
  ArrowRight,
  MapPin
} from 'lucide-react';
import { useData } from '../context/DataContext';

export function OverviewDashboard({ onSelectOrg, setActiveTab }) {
  const { organisations } = useData();

  // Exactly 4 key statistics
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

  // Recently added / audited organisations
  const recentOrganisations = [...organisations]
    .sort((a, b) => (b.researchDate || '').localeCompare(a.researchDate || ''))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* 4 Important Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Organisations */}
        <div className="bg-white rounded-xl p-5 border border-purple-100/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Organisations
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-700">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalOrganisations}</span>
            <span className="text-xs text-slate-500 font-medium">active records</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">All 14 Kerala districts</p>
        </div>

        {/* Stat 2: Direct Competitors */}
        <div className="bg-white rounded-xl p-5 border border-purple-100/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Direct Competitors
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{directCompetitors}</span>
            <span className="text-xs text-rose-600 font-semibold">direct overlap</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">AI, Python & Tech training</p>
        </div>

        {/* Stat 3: Potential Partners */}
        <div className="bg-white rounded-xl p-5 border border-purple-100/80 shadow-xs">
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
            <span className="text-xs text-purple-700 font-semibold">institutional</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Colleges & schools for MoUs</p>
        </div>

        {/* Stat 4: Research Completion */}
        <div className="bg-white rounded-xl p-5 border border-purple-100/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Research Completion
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{completionPercentage}%</span>
            <span className="text-xs text-emerald-600 font-semibold">{verifiedCount} verified</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Empirical documentation</p>
        </div>
      </div>

      {/* Small Recently Added Organisations Section */}
      <div className="bg-white rounded-xl border border-purple-100/80 shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-purple-100/60 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Recently Added Organisations</h3>
          <button
            onClick={() => setActiveTab('organisations')}
            className="text-xs font-semibold text-purple-700 hover:text-purple-900 flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Clean Airtable-style Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/30 text-slate-600 font-semibold border-b border-purple-100/60">
              <tr>
                <th className="px-5 py-3">Organisation Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">EDGE Relationship</th>
                <th className="px-4 py-3">Date Added</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {recentOrganisations.map(org => (
                <tr 
                  key={org.id}
                  onClick={() => onSelectOrg(org)}
                  className="hover:bg-purple-50/30 transition-colors cursor-pointer group"
                >
                  <td className="px-5 py-3 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0c0a1a] to-[#261f42] text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {org.logoText || org.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {org.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-slate-600">
                    {org.orgType}
                  </td>

                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-purple-500 shrink-0" />
                      {org.city}, {org.district}
                    </span>
                  </td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
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
                    <span className="text-purple-700 group-hover:text-purple-900 font-semibold inline-flex items-center gap-1">
                      Open Profile →
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
