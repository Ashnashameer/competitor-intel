import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  MapPin, 
  Layers, 
  Cpu, 
  Handshake, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Filter
} from 'lucide-react';
import { MAIN_CATEGORIES, getOrgCategory } from '../data/models';
import { KERALA_DISTRICTS } from '../data/geographicData';

export function VisualAnalyticsDeck({ 
  organisations, 
  statistics, 
  selectedDistrict, 
  onSelectDistrict,
  selectedCategory,
  onSelectCategory
}) {
  const [activeTab, setActiveTab] = useState('districts'); // 'districts' | 'categories' | 'technologies' | 'delivery'

  // 1. District Distribution
  const districtCounts = React.useMemo(() => {
    const counts = {};
    KERALA_DISTRICTS.forEach(d => { counts[d] = 0; });
    organisations.forEach(o => {
      if (o.district && counts[o.district] !== undefined) {
        counts[o.district]++;
      }
    });
    // Filter districts that have at least 1 org or are major hubs
    return Object.entries(counts)
      .map(([district, count]) => ({ district, count }))
      .sort((a, b) => b.count - a.count);
  }, [organisations]);

  const maxDistrictCount = Math.max(...districtCounts.map(d => d.count), 1);

  // 2. Category Distribution
  const categoryCounts = React.useMemo(() => {
    return MAIN_CATEGORIES.map(cat => {
      const count = organisations.filter(o => getOrgCategory(o) === cat.name).length;
      const percentage = organisations.length > 0 ? Math.round((count / organisations.length) * 100) : 0;
      return {
        ...cat,
        count,
        percentage
      };
    });
  }, [organisations]);

  // 3. Technology / Service Distribution
  const techCounts = React.useMemo(() => {
    const counts = {};
    organisations.forEach(o => {
      (o.coursesTechnologies || []).forEach(tech => {
        counts[tech] = (counts[tech] || 0) + 1;
      });
      if (o.servicesOffered) {
        if (o.servicesOffered.toLowerCase().includes('robotics')) counts['Robotics'] = (counts['Robotics'] || 0) + 1;
        if (o.servicesOffered.toLowerCase().includes('stem')) counts['STEM Labs'] = (counts['STEM Labs'] || 0) + 1;
        if (o.servicesOffered.toLowerCase().includes('marketing')) counts['Digital Marketing'] = (counts['Digital Marketing'] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([tech, count]) => ({ tech, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, [organisations]);

  const maxTechCount = Math.max(...techCounts.map(t => t.count), 1);

  // 4. Delivery Method & Market Relevance
  const deliveryCounts = React.useMemo(() => {
    const methods = {
      'Offline (Classroom / Lab)': 0,
      'In-Campus Institutional Delivery': 0,
      'Online (Live Interactive)': 0,
      'Hybrid (Campus + Online)': 0
    };
    organisations.forEach(o => {
      const m = o.deliveryMethod || 'Offline (Classroom / Lab)';
      methods[m] = (methods[m] || 0) + 1;
    });
    return Object.entries(methods).map(([method, count]) => ({
      method,
      count,
      percentage: organisations.length > 0 ? Math.round((count / organisations.length) * 100) : 0
    }));
  }, [organisations]);

  const relevanceCounts = React.useMemo(() => {
    const counts = { 'Direct': 0, 'Potential Partner': 0, 'Indirect': 0 };
    organisations.forEach(o => {
      const r = o.competitiveRelevance || 'Indirect';
      counts[r] = (counts[r] || 0) + 1;
    });
    return counts;
  }, [organisations]);

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-purple-100 shadow-sm overflow-hidden mb-6">
      {/* Analytics Deck Header */}
      <div className="px-5 py-4 border-b border-purple-100/80 bg-gradient-to-r from-purple-50/50 via-white to-purple-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-600 text-white flex items-center justify-center shadow-xs">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Market Intelligence Analytics
            </h3>
            <p className="text-[11px] text-slate-500">
              Interactive breakdowns responding live to currently active filters
            </p>
          </div>
        </div>

        {/* Analytics Mode Tabs */}
        <div className="flex items-center gap-1 bg-purple-100/40 p-1 rounded-xl border border-purple-200/60 self-start sm:self-auto text-xs">
          <button
            onClick={() => setActiveTab('districts')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'districts'
                ? 'bg-white text-purple-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-purple-600" />
            <span>Districts</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'bg-white text-purple-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('technologies')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'technologies'
                ? 'bg-white text-purple-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-purple-600" />
            <span>Tech & Services</span>
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'delivery'
                ? 'bg-white text-purple-900 font-bold shadow-xs'
                : 'text-slate-600 hover:text-purple-700'
            }`}
          >
            <Handshake className="w-3.5 h-3.5 text-purple-600" />
            <span>Delivery & Models</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {/* 1. Districts Tab */}
        {activeTab === 'districts' && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-700">
                Competitor Concentration by District (Click bar to filter)
              </span>
              {selectedDistrict && selectedDistrict !== 'All' && (
                <button
                  onClick={() => onSelectDistrict('All')}
                  className="text-[11px] font-semibold text-purple-700 hover:text-purple-900 underline"
                >
                  Reset District ({selectedDistrict})
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
              {districtCounts.map(({ district, count }) => {
                const isSelected = selectedDistrict === district;
                const percent = Math.round((count / maxDistrictCount) * 100);

                return (
                  <div
                    key={district}
                    onClick={() => onSelectDistrict(isSelected ? 'All' : district)}
                    className={`group flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-purple-50/80 border-purple-300 ring-2 ring-purple-400/20'
                        : 'hover:bg-purple-50/40 border-transparent hover:border-purple-100'
                    }`}
                  >
                    <div className="w-28 text-xs font-medium text-slate-700 truncate group-hover:text-purple-900 flex items-center gap-1">
                      <span className={isSelected ? 'font-bold text-purple-900' : ''}>
                        {district}
                      </span>
                    </div>

                    <div className="flex-1 bg-slate-100 h-4 rounded-full overflow-hidden p-0.5 relative">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isSelected
                            ? 'bg-gradient-to-r from-purple-600 to-purple-600'
                            : count > 0
                            ? 'bg-gradient-to-r from-purple-400 to-purple-600 group-hover:from-purple-500 group-hover:to-purple-500'
                            : 'bg-transparent'
                        }`}
                        style={{ width: `${Math.max(percent, count > 0 ? 8 : 0)}%` }}
                      />
                    </div>

                    <span className={`w-8 text-right text-xs font-mono font-bold ${
                      count > 0 ? 'text-purple-950' : 'text-slate-300'
                    }`}>
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-3">
              Distribution Across Partnership Segments
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categoryCounts.map((cat) => {
                const isSelected = selectedCategory === cat.name;

                return (
                  <div
                    key={cat.id}
                    onClick={() => onSelectCategory(isSelected ? 'All' : cat.name)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50/90 border-purple-300 ring-2 ring-purple-400/20 shadow-xs'
                        : 'bg-white hover:bg-purple-50/30 border-purple-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-900">
                        {cat.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full">
                        {cat.count} orgs
                      </span>
                    </div>

                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full bg-gradient-to-r from-purple-600 to-purple-600 rounded-full transition-all duration-500"
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{cat.tagline}</span>
                      <span className="font-bold text-slate-700">{cat.percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Technologies & Services Tab */}
        {activeTab === 'technologies' && (
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-3">
              Top Technologies & Services Delivered by Competitors
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {techCounts.map(({ tech, count }) => {
                const percent = Math.round((count / maxTechCount) * 100);

                return (
                  <div key={tech} className="p-3 bg-white rounded-xl border border-purple-100 flex items-center gap-3">
                    <div className="w-36 text-xs font-semibold text-slate-800 truncate">
                      {tech}
                    </div>

                    <div className="flex-1 bg-slate-100 h-3 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <span className="text-xs font-mono font-bold text-purple-900 w-12 text-right">
                      {count} orgs
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Delivery & Models Tab */}
        {activeTab === 'delivery' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Delivery Methods */}
              <div className="p-4 bg-purple-50/30 rounded-xl border border-purple-100">
                <h4 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                  <Handshake className="w-3.5 h-3.5 text-purple-600" />
                  <span>Delivery Method Share</span>
                </h4>
                <div className="space-y-3">
                  {deliveryCounts.map(({ method, count, percentage }) => (
                    <div key={method}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-700 font-medium">{method}</span>
                        <span className="font-mono font-bold text-purple-900">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-200/70 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitive Relationship */}
              <div className="p-4 bg-purple-50/30 rounded-xl border border-purple-100">
                <h4 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-600" />
                  <span>Competitive Relevance to EDGE</span>
                </h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200/80">
                    <div className="text-xl font-bold text-rose-700 font-mono">
                      {relevanceCounts['Direct'] || 0}
                    </div>
                    <div className="text-[11px] font-bold text-rose-800 mt-1">Direct Competitors</div>
                    <p className="text-[10px] text-rose-600 mt-0.5">High offering overlap</p>
                  </div>

                  <div className="p-3 bg-purple-50/80 rounded-xl border border-purple-200/80">
                    <div className="text-xl font-bold text-purple-700 font-mono">
                      {relevanceCounts['Potential Partner'] || 0}
                    </div>
                    <div className="text-[11px] font-bold text-purple-800 mt-1">Potential Partners</div>
                    <p className="text-[10px] text-purple-600 mt-0.5">Institutions for MoUs</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="text-xl font-bold text-slate-700 font-mono">
                      {relevanceCounts['Indirect'] || 0}
                    </div>
                    <div className="text-[11px] font-bold text-slate-800 mt-1">Indirect Rivals</div>
                    <p className="text-[10px] text-slate-500 mt-0.5">Peripheral tech courses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

