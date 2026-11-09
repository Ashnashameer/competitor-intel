import React, { useState } from 'react';
import { 
  GitCompare, 
  Check, 
  X, 
  Building2, 
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { SEGMENTS } from '../data/models';
import { KERALA_DISTRICTS } from '../data/geographicData';

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
        alert('You can compare up to 4 organisations side-by-side.');
      }
    }
  };

  const selectedOrgs = organisations.filter(o => selectedOrgIds.includes(o.id));

  return (
    <div className="space-y-4">
      {/* Selector and Filter Bar */}
      <div className="bg-white rounded-xl border border-purple-100/80 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <GitCompare className="w-4 h-4 text-purple-600" />
              Compare Competitors
            </h1>
            <p className="text-xs text-slate-500">
              Side-by-side benchmark of curricula, audience, pricing, and strategic positioning.
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
              className="bg-purple-50/40 border border-purple-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
            >
              <option value="All">All Categories</option>
              {SEGMENTS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-purple-50/40 border border-purple-200/80 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
            >
              <option value="All">All Districts</option>
              <option value="Kozhikode">Kozhikode (Priority)</option>
              {KERALA_DISTRICTS.filter(d => d !== 'Kozhikode').map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Organisation Selector Pills */}
        <div className="pt-2 border-t border-purple-50">
          <div className="text-xs font-semibold text-slate-600 mb-2 flex items-center justify-between">
            <span>Select 2 or more organisations to compare:</span>
            <span className="text-purple-700 font-bold">{selectedOrgs.length} / 4 Selected</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {availableInSegment.map(org => {
              const isSelected = selectedOrgIds.includes(org.id);
              return (
                <button
                  key={org.id}
                  onClick={() => toggleSelectOrg(org.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-xs'
                      : 'bg-purple-50/50 text-slate-700 hover:bg-purple-100/60 border border-purple-200/60 font-medium'
                  }`}
                >
                  <span>{org.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Table (Clean Airtable/Similarweb Style) */}
      {selectedOrgs.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-purple-100 text-center text-xs text-slate-500">
          Please select at least two organisations from above to compare.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-purple-100/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-purple-50/30 border-b border-purple-100/80">
                  <th className="p-4 w-44 font-bold text-slate-700 bg-purple-50/30 sticky left-0 z-10 border-r border-purple-100">
                    Attribute
                  </th>
                  {selectedOrgs.map(org => (
                    <th key={org.id} className="p-4 min-w-[220px] max-w-[280px] align-top border-r border-purple-50 last:border-r-0">
                      <div className="font-bold text-slate-900 text-sm">{org.name}</div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                        {org.city}, {org.district}
                      </div>
                      <div className="mt-2">
                        <button
                          onClick={() => onSelectOrg(org)}
                          className="text-[11px] font-bold text-purple-700 hover:text-purple-900"
                        >
                          View Profile →
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50 text-slate-700">
                {/* 1. Organisation Type */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Organisation Type
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-purple-50 last:border-r-0 font-medium text-slate-900">
                      {org.orgType}
                    </td>
                  ))}
                </tr>

                {/* 2. Courses and Services */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Courses & Services
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-purple-50 last:border-r-0 leading-relaxed text-slate-700">
                      {org.educationalActivities || (org.servicesOffered || []).join(', ') || 'Technology training and lab courses'}
                    </td>
                  ))}
                </tr>

                {/* 3. Technologies */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Technologies
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-purple-50 last:border-r-0">
                      <div className="flex flex-wrap gap-1">
                        {(org.coursesTechnologies || []).map(tech => (
                          <span key={tech} className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[10px] font-semibold border border-purple-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 4. Target Audience */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Target Audience
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-purple-50 last:border-r-0 font-medium">
                      {org.targetAudience || 'Students, graduates and professionals'}
                    </td>
                  ))}
                </tr>

                {/* 5. Course Duration */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Course Duration
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-purple-50 last:border-r-0">
                      <div className="flex flex-wrap gap-1">
                        {(org.programmeDurations || ['3 Months', '6 Months']).map((d, i) => (
                          <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-150 rounded text-[11px] font-medium">
                            {d}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 6. Pricing, if available */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Pricing
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 font-bold text-slate-900 border-r border-purple-50 last:border-r-0">
                      {org.pricingStructure || 'On Direct Inquiry'}
                    </td>
                  ))}
                </tr>

                {/* 7. Internship and Placement Opportunities */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Internship & Placement
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-purple-50 last:border-r-0">
                      <div className="space-y-1">
                        <div>
                          <strong>Internship:</strong>{' '}
                          {org.internships ? (
                            <span className="text-emerald-700 font-semibold">Yes, Included</span>
                          ) : (
                            <span className="text-slate-400">No</span>
                          )}
                        </div>
                        <div>
                          <strong>Placement Assistance:</strong>{' '}
                          {org.placementSupport ? (
                            <span className="text-purple-700 font-semibold">Offered</span>
                          ) : (
                            <span className="text-slate-400">None</span>
                          )}
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 8. Strengths and Weaknesses */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Strengths & Weaknesses
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-purple-50 last:border-r-0 text-[11px] space-y-1.5">
                      <div>
                        <strong className="text-emerald-700 block">Strength:</strong>
                        <span>{org.swotAnalysis?.strengths || 'Established market footprint.'}</span>
                      </div>
                      <div>
                        <strong className="text-rose-700 block">Gap / Weakness:</strong>
                        <span>{org.swotAnalysis?.weaknesses || 'Traditional curriculum without agent automation.'}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 9. Potential Collaboration Opportunities */}
                <tr>
                  <td className="p-4 font-bold text-slate-700 bg-purple-50/20 sticky left-0 border-r border-purple-100">
                    Collaboration Opportunities
                  </td>
                  {selectedOrgs.map(org => (
                    <td key={org.id} className="p-4 border-r border-purple-50 last:border-r-0 text-slate-700 leading-relaxed text-[11px]">
                      {org.competitiveRelevance === 'Potential Partner'
                        ? 'Candidate for MYST International institutional MoU to deliver accredited AI Agents & Data Analytics add-on curriculum.'
                        : 'Direct technology competitor. Position EDGE with verified public GitHub portfolios and industry placement outcomes.'}
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
