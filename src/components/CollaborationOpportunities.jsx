import React, { useState } from 'react';
import { 
  Handshake, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Building2,
  TrendingUp,
  Sparkles,
  Target
} from 'lucide-react';
import { useData } from '../context/DataContext';

export function CollaborationOpportunities() {
  const { partnerships, addPartnership, marketOpportunities } = useData();

  const [activeTab, setActiveTab] = useState('partnerships'); // 'partnerships' or 'opportunities'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    institutionName: '',
    institutionType: 'Engineering College',
    country: 'India',
    state: 'Kerala',
    district: 'Kozhikode',
    city: 'Kozhikode City',
    externalProvider: '',
    programme: '',
    studentGroup: '',
    partnershipDetails: '',
    deliveryModel: 'On-campus school lab delivery',
    evidence: '',
    sourceUrl: '',
    verificationStatus: 'verified'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!formData.institutionName || !formData.externalProvider) {
      alert('Please fill required fields');
      return;
    }
    addPartnership(formData);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="bg-white rounded-2xl border border-purple-100 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Handshake className="w-4 h-4 text-purple-600" />
              Collaboration & Market Opportunities
            </h1>
            <p className="text-xs text-slate-500">
              Institutional academic alliances, MoUs, and strategic market whitespace in Kerala.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Tab Pills */}
            <div className="flex bg-purple-50/70 p-0.5 rounded-xl border border-purple-200/80 text-xs">
              <button
                onClick={() => setActiveTab('partnerships')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'partnerships'
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-xs'
                    : 'text-purple-900 hover:text-purple-700'
                }`}
              >
                Institutional MoUs ({partnerships.length})
              </button>
              <button
                onClick={() => setActiveTab('opportunities')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === 'opportunities'
                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-xs'
                    : 'text-purple-900 hover:text-purple-700'
                }`}
              >
                Market Gaps ({marketOpportunities.length})
              </button>
            </div>

            {activeTab === 'partnerships' && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 rounded-xl shadow-xs transition-all shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Partnership</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab 1: Institutional Partnerships Table */}
      {activeTab === 'partnerships' && (
        <div className="bg-white rounded-2xl border border-purple-100 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-purple-50/40 text-slate-600 font-bold border-b border-purple-100">
                <tr>
                  <th className="px-5 py-3.5">Academic Institution</th>
                  <th className="px-4 py-3.5">External Provider</th>
                  <th className="px-4 py-3.5">Programme Focus</th>
                  <th className="px-4 py-3.5">Location</th>
                  <th className="px-4 py-3.5">Delivery Model</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Evidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-50">
                {partnerships.map(p => (
                  <tr key={p.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-slate-900">
                      <div className="font-bold text-slate-900">{p.institutionName}</div>
                      <div className="text-[11px] text-slate-400">{p.institutionType}</div>
                    </td>

                    <td className="px-4 py-3.5 text-slate-700 font-semibold">
                      {p.externalProvider}
                    </td>

                    <td className="px-4 py-3.5 text-slate-700">
                      {p.programme}
                    </td>

                    <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                      {p.city}, {p.district}
                    </td>

                    <td className="px-4 py-3.5 text-slate-600">
                      {p.deliveryModel}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        p.verificationStatus === 'verified'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        <CheckCircle2 className="w-3 h-3" />
                        {p.verificationStatus === 'verified' ? 'Verified MoU' : 'Reported'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      {p.sourceUrl ? (
                        <a
                          href={p.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-purple-700 hover:text-purple-900 font-bold inline-flex items-center gap-1 hover:underline"
                        >
                          <span>Evidence</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400">Archived</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Market Opportunities Cards */}
      {activeTab === 'opportunities' && (
        <div className="space-y-4">
          {marketOpportunities.map((opp, idx) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl border border-purple-100 p-5 shadow-xs space-y-3 hover:border-purple-200 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-purple-50">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#0c0a1a] to-[#261f42] text-purple-300 font-black text-xs flex items-center justify-center border border-purple-900/40">
                    0{idx + 1}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                      {opp.category}
                    </span>
                    <h2 className="text-sm font-bold text-slate-900">
                      {opp.title}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200">
                    {opp.districtFocus}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    {opp.severity} Impact
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Market Observation
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {opp.observation}
                  </p>
                  <div className="text-[11px] text-slate-500 pt-1">
                    <strong>Evidence:</strong> {opp.evidenceData}
                  </div>
                </div>

                <div className="bg-purple-50/50 p-3.5 rounded-xl border border-purple-200 space-y-1.5">
                  <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
                    EDGE Strategic Opportunity
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    {opp.edgeOpportunity}
                  </p>
                  <div className="text-[11px] text-purple-950 font-semibold pt-1">
                    <strong>Action Play:</strong> {opp.actionablePlay}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Partnership Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold text-slate-900 mb-1">Add Institutional Partnership</h2>
            <p className="text-xs text-slate-500 mb-4">Record a school or college technology MoU.</p>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institution Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farook College / Silver Hills School"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">External Training Provider *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luminar Technolab / EdTech Provider"
                  value={formData.externalProvider}
                  onChange={(e) => setFormData({ ...formData, externalProvider: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Programme Focus</label>
                  <input
                    type="text"
                    placeholder="e.g. AI & Python Add-on"
                    value={formData.programme}
                    onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location District</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Evidence URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.sourceUrl}
                  onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold shadow-xs"
                >
                  Save Partnership
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

