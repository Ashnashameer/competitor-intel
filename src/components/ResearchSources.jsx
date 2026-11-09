import React, { useState } from 'react';
import { 
  FileCheck2, 
  ExternalLink, 
  Plus, 
  CheckCircle2, 
  Search,
  Filter
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { VERIFICATION_STATUSES } from '../data/models';

export function ResearchSources() {
  const { researchSources, addSource } = useData();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    sourceTitle: '',
    sourceUrl: '',
    relatedOrg: '',
    evidenceDescription: '',
    verificationStatus: 'verified',
    researcherNotes: ''
  });

  const handleCreateSource = (e) => {
    e.preventDefault();
    if (!formData.sourceTitle) return;
    addSource(formData);
    setIsAddModalOpen(false);
    setFormData({
      sourceTitle: '',
      sourceUrl: '',
      relatedOrg: '',
      evidenceDescription: '',
      verificationStatus: 'verified',
      researcherNotes: ''
    });
  };

  const filtered = researchSources.filter(s => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = (s.sourceTitle || '').toLowerCase().includes(q);
      const matchOrg = (s.relatedOrg || '').toLowerCase().includes(q);
      const matchDesc = (s.evidenceDescription || '').toLowerCase().includes(q);
      if (!matchTitle && !matchOrg && !matchDesc) return false;
    }
    if (statusFilter !== 'All' && s.verificationStatus !== statusFilter) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (statusId) => {
    const item = VERIFICATION_STATUSES.find(v => v.id === statusId) || VERIFICATION_STATUSES[2];
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium border ${item.badgeClass}`}>
        <CheckCircle2 className="w-3 h-3" />
        {item.label}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Banner and Controls */}
      <div className="bg-white rounded-2xl border border-purple-100 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-purple-600" />
              Research Sources & Verification Audit
            </h1>
            <p className="text-xs text-slate-500">
              Verifiable citations, university gazettes, brochures, and audit trail records.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 rounded-xl shadow-xs transition-all shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Citation</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-purple-50">
          <div className="flex-1 max-w-sm relative">
            <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search citations or related entities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-purple-50/30 border border-purple-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-purple-50/40 border border-purple-200/80 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer"
            >
              <option value="All">All Verification Statuses</option>
              <option value="verified">Verified Evidence</option>
              <option value="company_reported">Company-Reported</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sources List / Table */}
      <div className="bg-white rounded-2xl border border-purple-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-purple-50/40 text-slate-600 font-bold border-b border-purple-100">
              <tr>
                <th className="px-5 py-3.5">Source Citation</th>
                <th className="px-4 py-3.5">Related Organisation</th>
                <th className="px-4 py-3.5">Documentation Details</th>
                <th className="px-4 py-3.5">Verification Level</th>
                <th className="px-4 py-3.5">Audit Date</th>
                <th className="px-5 py-3.5 text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-50">
              {filtered.map(src => (
                <tr key={src.id} className="hover:bg-purple-50/30 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-900">
                    <div className="font-bold text-slate-900">{src.sourceTitle}</div>
                  </td>

                  <td className="px-4 py-3.5 text-purple-700 font-bold">
                    {src.relatedOrg}
                  </td>

                  <td className="px-4 py-3.5 text-slate-600 max-w-sm">
                    <p className="line-clamp-2">{src.evidenceDescription}</p>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    {getStatusBadge(src.verificationStatus)}
                  </td>

                  <td className="px-4 py-3.5 text-slate-500 whitespace-nowrap">
                    {src.researchDate}
                  </td>

                  <td className="px-5 py-3.5 text-right whitespace-nowrap">
                    {src.sourceUrl ? (
                      <a
                        href={src.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-purple-700 hover:text-purple-900 font-bold inline-flex items-center gap-1 hover:underline"
                      >
                        <span>Open</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-slate-400">Offline</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Source Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold text-slate-900 mb-1">Add Source Citation</h2>
            <p className="text-xs text-slate-500 mb-4">Register an audit document or official link.</p>

            <form onSubmit={handleCreateSource} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Source Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kerala Cyberpark Directory Listing"
                  value={formData.sourceTitle}
                  onChange={(e) => setFormData({ ...formData, sourceTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Related Organisation</label>
                <input
                  type="text"
                  placeholder="e.g. Farook College"
                  value={formData.relatedOrg}
                  onChange={(e) => setFormData({ ...formData, relatedOrg: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
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

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Evidence Description</label>
                <textarea
                  rows={2}
                  placeholder="Document details..."
                  value={formData.evidenceDescription}
                  onChange={(e) => setFormData({ ...formData, evidenceDescription: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Verification Status</label>
                <select
                  value={formData.verificationStatus}
                  onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="verified">Verified through published evidence</option>
                  <option value="company_reported">Company-reported</option>
                  <option value="unverified">Unverified</option>
                  <option value="unavailable">Information unavailable</option>
                </select>
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
                  Save Citation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
