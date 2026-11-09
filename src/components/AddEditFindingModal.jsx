import React, { useState, useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  CheckCircle2, 
  Calendar, 
  Tag, 
  FileCheck2, 
  Info, 
  ShieldCheck, 
  Link as LinkIcon, 
  Image as ImageIcon,
  FileText
} from 'lucide-react';
import { FINDING_CATEGORIES, FINDING_VERIFICATION_STATUSES } from '../data/models';

export function AddEditFindingModal({
  isOpen,
  onClose,
  org,
  finding,
  availableEvidence = [],
  onSave
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(FINDING_CATEGORIES[0]);
  const [researchDate, setResearchDate] = useState(new Date().toISOString().split('T')[0]);
  const [verificationStatus, setVerificationStatus] = useState('unverified');
  const [notes, setNotes] = useState('');
  const [selectedEvidenceIds, setSelectedEvidenceIds] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (finding) {
        setTitle(finding.title || '');
        setDescription(finding.description || '');
        setCategory(finding.category || FINDING_CATEGORIES[0]);
        setResearchDate(finding.researchDate || new Date().toISOString().split('T')[0]);
        setVerificationStatus(finding.verificationStatus || 'unverified');
        setNotes(finding.notes || '');
        setSelectedEvidenceIds(finding.linkedEvidenceIds || []);
      } else {
        setTitle('');
        setDescription('');
        setCategory(FINDING_CATEGORIES[0]);
        setResearchDate(new Date().toISOString().split('T')[0]);
        setVerificationStatus('official_source');
        setNotes('');
        setSelectedEvidenceIds([]);
      }
      setError('');
    }
  }, [isOpen, finding]);

  if (!isOpen) return null;

  const toggleEvidence = (evId) => {
    setSelectedEvidenceIds(prev => 
      prev.includes(evId) 
        ? prev.filter(id => id !== evId) 
        : [...prev, evId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a finding title.');
      return;
    }
    if (!description.trim()) {
      setError('Please provide a description of this finding.');
      return;
    }

    const findingData = {
      ...(finding || {}),
      id: finding?.id || `fnd-${Date.now()}`,
      orgId: org.id,
      orgName: org.name,
      title: title.trim(),
      description: description.trim(),
      category,
      researchDate,
      verificationStatus,
      notes: notes.trim(),
      linkedEvidenceIds: selectedEvidenceIds
    };

    onSave(findingData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-50/50 via-white to-purple-50/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center shadow-xs">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {finding ? 'Edit Research Finding' : 'Record Research Finding'}
              </h2>
              <p className="text-xs text-slate-500">
                Organising competitor intelligence for <span className="font-semibold text-purple-900">{org?.name}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <form id="finding-form" onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-medium flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Finding Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Finding Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mandatory junior robotics labs active for grades 6-10"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-semibold"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Research Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 bg-white font-medium"
              >
                {FINDING_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Verification Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Verification Status <span className="text-rose-500">*</span></span>
                <span className="text-[10px] text-purple-700 font-normal">Audit Criteria</span>
              </label>
              <select
                value={verificationStatus}
                onChange={(e) => setVerificationStatus(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 bg-white font-medium"
              >
                {FINDING_VERIFICATION_STATUSES.map(st => (
                  <option key={st.id} value={st.id}>{st.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Finding Description & Analysis <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              required
              placeholder="Explain the specific intelligence discovered: what programmes, agreements, or activities were observed..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all leading-relaxed"
            />
          </div>

          {/* Strategic Researcher Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
              <span>EDGE Strategic Opportunity / Notes</span>
              <span className="text-[10px] text-slate-400 font-normal">Optional</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Candidate for MYST MoU / Differentiate with production AI multi-agents"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
            />
          </div>

          {/* Link Evidence Section (Multi-Select with Thumbnails) */}
          <div className="pt-3 border-t border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-purple-600" />
                <span>Supporting Visual Evidence ({selectedEvidenceIds.length} linked)</span>
              </label>
              <span className="text-[11px] text-slate-500">
                Connect 1 or more uploaded clippings
              </span>
            </div>

            {availableEvidence.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto p-1 scrollbar-thin">
                {availableEvidence.map(ev => {
                  const isChecked = selectedEvidenceIds.includes(ev.id);
                  const isPdf = ev.fileType === 'application/pdf' || (ev.fileName && ev.fileName.toLowerCase().endsWith('.pdf'));

                  return (
                    <div
                      key={ev.id}
                      onClick={() => toggleEvidence(ev.id)}
                      className={`p-2 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isChecked 
                          ? 'bg-purple-50/70 border-purple-300 ring-1 ring-purple-500/30' 
                          : 'bg-white border-slate-200 hover:border-purple-200 hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        {/* Thumbnail */}
                        <div className="w-10 h-10 rounded-lg bg-slate-900 shrink-0 overflow-hidden flex items-center justify-center">
                          {isPdf ? (
                            <FileText className="w-5 h-5 text-rose-500" />
                          ) : (
                            <img src={ev.fileUrl} alt={ev.title} className="w-full h-full object-cover" />
                          )}
                        </div>

                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-900 truncate">{ev.title}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                            <span className="font-medium text-purple-700">{ev.category}</span>
                            <span>•</span>
                            <span>{ev.collectedDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by parent div onClick
                        className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500 shrink-0 pointer-events-none"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 text-center bg-slate-50 border border-dashed border-slate-200 rounded-lg text-xs text-slate-500">
                No visual evidence items uploaded yet. You can still save this finding and attach evidence later.
              </div>
            )}
          </div>
        </form>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-purple-100 flex items-center justify-between bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            form="finding-form"
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg shadow-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{finding ? 'Save Changes' : 'Record Research Finding'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

