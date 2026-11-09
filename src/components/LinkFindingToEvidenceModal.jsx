import React, { useState, useEffect } from 'react';
import { 
  X, 
  Link as LinkIcon, 
  Bookmark, 
  CheckCircle2, 
  Plus, 
  Save, 
  Info,
  ShieldCheck,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { FINDING_VERIFICATION_STATUSES } from '../data/models';

export function LinkFindingToEvidenceModal({
  isOpen,
  onClose,
  evidence,
  org,
  orgFindings = [],
  onSaveLinks,
  onCreateNewFinding
}) {
  const [selectedFindingIds, setSelectedFindingIds] = useState([]);

  useEffect(() => {
    if (isOpen && evidence) {
      // Find all findings that currently have evidence.id in their linkedEvidenceIds
      const linked = orgFindings
        .filter(f => (f.linkedEvidenceIds || []).includes(evidence.id))
        .map(f => f.id);
      setSelectedFindingIds(linked);
    }
  }, [isOpen, evidence, orgFindings]);

  if (!isOpen || !evidence) return null;

  const toggleFinding = (findingId) => {
    setSelectedFindingIds(prev => 
      prev.includes(findingId)
        ? prev.filter(id => id !== findingId)
        : [...prev, findingId]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveLinks(evidence.id, selectedFindingIds);
    onClose();
  };

  const isPdf = evidence.fileType === 'application/pdf' || (evidence.fileName && evidence.fileName.toLowerCase().endsWith('.pdf'));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-50/50 via-white to-purple-50/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center shadow-xs">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Connect Evidence to Research Findings
              </h2>
              <p className="text-xs text-slate-500">
                Link this visual asset to one or multiple findings without duplicating files
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

        {/* Evidence Banner */}
        <div className="p-4 bg-purple-50/50 border-b border-purple-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-slate-900 shrink-0 overflow-hidden flex items-center justify-center">
            {isPdf ? (
              <FileText className="w-6 h-6 text-rose-500" />
            ) : (
              <img src={evidence.fileUrl} alt={evidence.title} className="w-full h-full object-cover" />
            )}
          </div>
          <div className="overflow-hidden flex-1">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
              Active Evidence Item
            </span>
            <h4 className="text-xs font-bold text-slate-900 truncate">{evidence.title}</h4>
            <p className="text-[11px] text-slate-500 truncate">
              {evidence.category} • Captured: {evidence.collectedDate}
            </p>
          </div>
        </div>

        {/* Findings Selection List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Select Supporting Research Findings ({selectedFindingIds.length} connected)
            </span>

            {onCreateNewFinding && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onCreateNewFinding(evidence.id);
                }}
                className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Finding</span>
              </button>
            )}
          </div>

          {orgFindings.length > 0 ? (
            <div className="space-y-2">
              {orgFindings.map(finding => {
                const isSelected = selectedFindingIds.includes(finding.id);
                const verification = FINDING_VERIFICATION_STATUSES.find(v => v.id === finding.verificationStatus) || FINDING_VERIFICATION_STATUSES[3];

                return (
                  <div
                    key={finding.id}
                    onClick={() => toggleFinding(finding.id)}
                    className={`p-3 rounded-xl border flex items-start justify-between gap-3 cursor-pointer transition-all ${
                      isSelected 
                        ? 'bg-purple-50/80 border-purple-400 ring-1 ring-purple-500/20' 
                        : 'bg-white border-slate-200 hover:border-purple-200 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="space-y-1 overflow-hidden flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
                          {finding.category}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${verification.badgeClass}`}>
                          {verification.label}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold text-slate-900 leading-snug">{finding.title}</h5>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{finding.description}</p>
                    </div>

                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500 shrink-0 mt-1 pointer-events-none"
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-6 text-center bg-slate-50 border border-dashed border-slate-200 rounded-xl space-y-2">
              <Bookmark className="w-8 h-8 text-purple-400 mx-auto" />
              <p className="text-xs text-slate-600 font-medium">No research findings recorded for this organisation yet.</p>
              {onCreateNewFinding && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onCreateNewFinding(evidence.id);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Research Finding</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-purple-100 flex items-center justify-between bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg shadow-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Save Finding Connections</span>
          </button>
        </div>
      </div>
    </div>
  );
}

