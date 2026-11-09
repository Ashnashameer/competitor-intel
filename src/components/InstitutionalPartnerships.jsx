import React, { useState } from 'react';
import { 
  Handshake, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  FileCheck2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building,
  GraduationCap
} from 'lucide-react';
import { useData } from '../context/DataContext';

export function InstitutionalPartnerships() {
  const { partnerships, addPartnership } = useData();

  const [activeSubTab, setActiveSubTab] = useState('all'); // 'all', 'verified', 'company_reported', 'unverified'
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

  const filteredPartnerships = partnerships.filter(p => {
    if (activeSubTab === 'verified') return p.verificationStatus === 'verified';
    if (activeSubTab === 'company_reported') return p.verificationStatus === 'company_reported';
    if (activeSubTab === 'unverified') return p.verificationStatus === 'unverified';
    return true;
  });

  const verifiedCount = partnerships.filter(p => p.verificationStatus === 'verified').length;
  const reportedCount = partnerships.filter(p => p.verificationStatus === 'company_reported').length;
  const unverifiedCount = partnerships.filter(p => p.verificationStatus === 'unverified').length;

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-purple-50 text-purple-900 rounded border border-purple-200">
                Institutional Linkages
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Academic Audit
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-purple-700" />
              Institutional Partnerships & MoUs
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Tracking verified tie-ups between schools, colleges, and external educational vendors. Confirmed institutional partnerships are audited against official college councils, school circulars, and university gazettes.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:to-purple-700 rounded-lg shadow-sm shadow-purple-600/30 transition-all shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Partnership Record</span>
          </button>
        </div>

        {/* Verification Rule Notice */}
        <div className="mt-4 p-3 rounded-xl bg-purple-50/60 border border-purple-200/80 flex items-start gap-2.5 text-xs text-purple-950">
          <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Research Verification Protocol:</strong> We keep confirmed institutional partnerships strictly separate from companies that merely advertise institutional services on their marketing flyers without a published academic agreement.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-purple-100 text-xs font-semibold">
          <button
            onClick={() => setActiveSubTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'all'
                ? 'bg-purple-950 text-white'
                : 'text-slate-600 hover:bg-purple-50'
            }`}
          >
            All Partnerships ({partnerships.length})
          </button>
          <button
            onClick={() => setActiveSubTab('verified')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'verified'
                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                : 'text-purple-700 hover:bg-purple-50'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Confirmed & Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setActiveSubTab('company_reported')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'company_reported'
                ? 'bg-amber-700 text-white'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Company-Reported Claims ({reportedCount})
          </button>
          <button
            onClick={() => setActiveSubTab('unverified')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeSubTab === 'unverified'
                ? 'bg-rose-700 text-white'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Unverified / Disputed ({unverifiedCount})
          </button>
        </div>
      </div>

      {/* Partnerships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPartnerships.map(ptn => (
          <div
            key={ptn.id}
            className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {ptn.institutionName}
                  </h3>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    {ptn.city}, {ptn.district} • {ptn.institutionType}
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${
                  ptn.verificationStatus === 'verified'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : ptn.verificationStatus === 'company_reported'
                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                    : 'bg-rose-50 text-rose-800 border-rose-300'
                }`}>
                  {ptn.verificationStatus === 'verified' ? 'Verified MoU' : ptn.verificationStatus === 'company_reported' ? 'Company Claim' : 'Unverified'}
                </span>
              </div>

              {/* Provider & Programme Box */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 my-3 space-y-1.5 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    External Education Partner:
                  </span>
                  <span className="font-bold text-blue-900">
                    {ptn.externalProvider}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Delivered Programme:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {ptn.programme}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <strong className="text-slate-700">Student Target:</strong> {ptn.studentGroup}
                </div>
                <div className="text-[11px] text-slate-600">
                  <strong className="text-slate-700">Delivery Model:</strong> {ptn.deliveryModel}
                </div>
              </div>

              {/* Published Evidence Box */}
              <div className="p-2.5 rounded bg-blue-50/50 border border-blue-100 text-xs space-y-1 mb-3">
                <div className="text-[10px] font-bold text-blue-800 uppercase flex items-center gap-1">
                  <FileCheck2 className="w-3 h-3 text-blue-600" />
                  Audit Evidence:
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed italic">
                  "{ptn.evidence}"
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 truncate max-w-xs">
                {ptn.partnershipDetails}
              </span>
              {ptn.sourceUrl && (
                <a
                  href={ptn.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 font-semibold flex items-center gap-1 hover:underline text-[11px] shrink-0"
                >
                  <span>Evidence Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Partnership Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-blue-700" />
              Add Institutional Partnership
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Enter verified evidence and partnership terms.
            </p>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Host Institution Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Farook College (Autonomous)"
                  value={formData.institutionName}
                  onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Institution Type
                  </label>
                  <select
                    value={formData.institutionType}
                    onChange={(e) => setFormData({ ...formData, institutionType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="CBSE / ICSE School">CBSE / ICSE School</option>
                    <option value="Higher Secondary School (Plus One/Two)">Higher Secondary School</option>
                    <option value="Engineering College">Engineering College</option>
                    <option value="Arts & Science College">Arts & Science College</option>
                    <option value="Autonomous Academic Institution">Autonomous Academic Institution</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    District
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  External Provider Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ASAP Kerala, IBM Labs, Keltron"
                  value={formData.externalProvider}
                  onChange={(e) => setFormData({ ...formData, externalProvider: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Programme Delivered
                </label>
                <input
                  type="text"
                  placeholder="e.g. 150-hour Machine Learning & Data Analytics Add-on"
                  value={formData.programme}
                  onChange={(e) => setFormData({ ...formData, programme: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Audited Evidence Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Official MoU signed on 12-08-2024, published in College Annual Report p.42"
                  value={formData.evidence}
                  onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Verification Status
                  </label>
                  <select
                    value={formData.verificationStatus}
                    onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="verified">Verified through published evidence</option>
                    <option value="company_reported">Company-reported</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Evidence Source URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={formData.sourceUrl}
                    onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-semibold text-xs"
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

