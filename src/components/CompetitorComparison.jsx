import React, { useState } from 'react';
import { 
  GitCompare, 
  Check, 
  X, 
  Building2, 
  MapPin,
  Clock,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { SEGMENTS } from '../data/models';
import { KERALA_DISTRICTS } from '../data/geographicData';

/**
 * CompetitorComparison:
 * Clean, human-designed side-by-side benchmarking tool.
 * Enables clear, distraction-free analysis of curricula, fees, audience, and strengths.
 */
export function CompetitorComparison({ onSelectOrg }) {
  const { organisations } = useData();

  const [selectedSegment, setSelectedSegment] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');

  const availableInSegment = organisations.filter(o => {
    if (selectedSegment !== 'All' && o.segment !== selectedSegment) return false;
    if (selectedDistrict !== 'All' && o.district !== selectedDistrict) return false;
    return true;
  });

  const [selectedOrgIds, setSelectedOrgIds] = useState(() => {
    return availableInSegment.slice(0, 3).map(o => o.id);
  });

  const toggleSelectOrg = (id) => {
    if (selectedOrgIds.includes(id)) {
      if (selectedOrgIds.length > 1) {
        setSelectedOrgIds(prev => prev.filter(item => item !== id));
      }
    } else {
      if (selectedOrgIds.length < 4) {
        setSelectedOrgIds(prev => [...prev, id]);
      } else {
        alert('You can compare up to 4 competitors side-by-side.');
      }
    }
  };

  const selectedOrgs = organisations.filter(o => selectedOrgIds.includes(o.id));

  return (
    <div className="space-y-5">
      {/* Selector and Filter Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-purple-600" />
              Side-by-Side Competitor Comparison
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select 2 to 4 competitors to benchmark their curricula, target audience, pricing, and positioning.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <select
              value={selectedSegment}
              onChange={(e) => {
                setSelectedSegment(e.target.value);
                const matching = organisations.filter(o => e.target.value === 'All' || o.segment === e.target.value);
                setSelectedOrgIds(matching.slice(0, 3).map(o => o.id));
              }}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {SEGMENTS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
            >
              <option value="All">All Districts</option>
              <option value="Kozhikode">Kozhikode (Priority)</option>
              {KERALA_DISTRICTS.filter(d => d !== 'Kozhikode').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Competitor Selection Pills */}
        <div className="pt-3 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-600 mb-2.5 flex items-center justify-between">
            <span>Choose competitors to compare:</span>
            <span className="text-purple-600 font-semibold font-mono text-[11px]">
              {selectedOrgs.length} / 4 Selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableInSegment.map(org => {
              const isSelected = selectedOrgIds.includes(org.id);
              return (
                <button
                  key={org.id}
                  onClick={() => toggleSelectOrg(org.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 font-medium'
                  }`}
                >
                  <span>{org.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      {selectedOrgs.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-xs text-slate-500">
          Please select at least two competitors from above to compare.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 w-44 font-bold text-slate-700 bg-slate-50 sticky left-0 z-10 border-r border-slate-200">
                    Attribute
                  </th>
                  {selectedOrgs.map(org => (
                    <th key={org.id} className="p-4 min-w-[220px] max-w-[280px] align-top border-r border-slate-100 last:border-r-0">
                      <div className="font-bold text-slate-900 text-sm">{org.name}</div>
                      <div className="text-xs text-slate-500 font-normal mt-0.5">
                        {org.city}, {org.district}
                      </div>
                      <div className="mt-2.5 flex items-center gap-3">
                        <button
                          onClick={() => onSelectOrg(org)}
                          className="text-xs font-semibold text-purple-600 hover:text-purple-800 cursor-pointer"
                        >
                          View Profile →
                        </button>
                        {org.website && org.website !== '#' && (
                          <a
                            href={org.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-700"
                            title="Visit website"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {/* 1. Category */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/70 sticky left-0 border-r border-slate-200">
                    Market Category
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-slate-100 last:border-r-0 font-medium text-slate-900">
                      {org.orgType}
                    </td>
                  ))}
                </tr>

                {/* 2. Courses & Offerings */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/70 sticky left-0 border-r border-slate-200">
                    Curricula & Services
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-slate-100 last:border-r-0 leading-relaxed text-slate-600">
                      {org.educationalActivities || (org.servicesOffered || []).join(', ') || 'Technology training and lab courses'}
                    </td>
                  ))}
                </tr>

                {/* 3. Technologies */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/70 sticky left-0 border-r border-slate-200">
                    Technologies
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-slate-100 last:border-r-0">
                      <div className="flex flex-wrap gap-1.5">
                        {(org.coursesTechnologies || []).map(tech => (
                          <span key={tech} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium border border-slate-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 4. Target Audience */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/70 sticky left-0 border-r border-slate-200">
                    Target Audience
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-slate-100 last:border-r-0 font-medium text-slate-800">
                      {org.targetAudience || 'Students, graduates, and professionals'}
                    </td>
                  ))}
                </tr>

                {/* 5. Course Duration */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/70 sticky left-0 border-r border-slate-200">
                    Typical Duration
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-slate-100 last:border-r-0">
                      <div className="flex flex-wrap gap-1.5">
                        {(org.programmeDurations || ['3 Months', '6 Months']).map((d, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-medium">
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 6. Pricing & Commercials */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/70 sticky left-0 border-r border-slate-200">
                    Pricing & Commercials
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-slate-100 last:border-r-0 font-medium text-slate-900">
                      {org.pricingModel || org.feeStructure || 'Custom institutional pricing'}
                    </td>
                  ))}
                </tr>

                {/* 7. Institutional MoUs */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/70 sticky left-0 border-r border-slate-200">
                    Partner Schools / MoUs
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-slate-100 last:border-r-0 text-slate-600 text-xs leading-relaxed">
                      {(org.partnerSchools && org.partnerSchools.length > 0)
                        ? org.partnerSchools.slice(0, 3).map(p => typeof p === 'string' ? p : p.schoolName || p.name).join(', ')
                        : (org.institutionPartnerships || 'Institutional MoUs documented')}
                    </td>
                  ))}
                </tr>

                {/* 8. Verified Sources */}
                <tr>
                  <td className="p-4 font-semibold text-slate-900 bg-slate-50/70 sticky left-0 border-r border-slate-200">
                    Research Status
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-slate-100 last:border-r-0">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${
                        org.verificationStatus === 'verified'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {org.verificationStatus === 'verified' ? 'Verified Evidence' : 'Public Listing'}
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
