import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  Save, 
  Calendar, 
  Tag, 
  Globe, 
  CheckCircle2, 
  FileText, 
  ZoomIn, 
  ZoomOut,
  Building2,
  Check,
  AlertTriangle,
  Link as LinkIcon,
  Bookmark,
  Share2
} from 'lucide-react';
import { EVIDENCE_CATEGORIES, VERIFICATION_STATUSES, FINDING_VERIFICATION_STATUSES } from '../data/models';

export function EvidenceViewerModal({
  isOpen,
  onClose,
  evidence,
  linkedFindings = [],
  onUpdate,
  onDelete,
  onOpenLinkModal
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editSourceUrl, setEditSourceUrl] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editVerification, setEditVerification] = useState('verified');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Sync edit state when evidence changes
  React.useEffect(() => {
    if (evidence) {
      setEditTitle(evidence.title || '');
      setEditCategory(evidence.category || EVIDENCE_CATEGORIES[0]);
      setEditSourceUrl(evidence.sourceUrl || '');
      setEditDescription(evidence.description || '');
      setEditVerification(evidence.verificationStatus || 'verified');
      setIsEditing(false);
      setConfirmDelete(false);
      setIsZoomed(false);
    }
  }, [evidence]);

  if (!isOpen || !evidence) return null;

  const isPdf = evidence.fileType === 'application/pdf' || (evidence.fileName && evidence.fileName.toLowerCase().endsWith('.pdf'));

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    onUpdate({
      ...evidence,
      title: editTitle.trim(),
      category: editCategory,
      sourceUrl: editSourceUrl.trim(),
      description: editDescription.trim(),
      verificationStatus: editVerification
    });
    setIsEditing(false);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = evidence.fileUrl;
    link.download = evidence.fileName || `${evidence.title.replace(/\s+/g, '-').toLowerCase()}.${isPdf ? 'pdf' : 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = () => {
    onDelete(evidence.id);
    onClose();
  };

  const verificationObj = VERIFICATION_STATUSES.find(v => v.id === (isEditing ? editVerification : evidence.verificationStatus)) || VERIFICATION_STATUSES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-purple-200 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-purple-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              {isPdf ? <FileText className="w-4 h-4 text-rose-600" /> : <Tag className="w-4 h-4" />}
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-bold text-slate-900 truncate">
                {evidence.title}
              </h2>
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-semibold text-purple-800">{evidence.orgName}</span>
                <span>•</span>
                <span className="bg-purple-50 text-purple-700 border border-purple-200/60 px-2 py-0.2 rounded-full font-medium">
                  {evidence.category}
                </span>
                <span>•</span>
                <span className="font-medium text-slate-600">
                  {linkedFindings.length} {linkedFindings.length === 1 ? 'Finding' : 'Findings'} Connected
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Link to Findings button */}
            {onOpenLinkModal && (
              <button
                onClick={() => onOpenLinkModal(evidence)}
                title="Connect this evidence to findings"
                className="p-1.5 text-purple-700 hover:text-purple-900 hover:bg-purple-50 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors border border-purple-200/70"
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Connect Findings ({linkedFindings.length})</span>
              </button>
            )}

            {/* Download Button */}
            <button
              onClick={handleDownload}
              title="Download original file"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download</span>
            </button>

            {/* External URL Button */}
            {evidence.sourceUrl && (
              <a
                href={evidence.sourceUrl}
                target="_blank"
                rel="noreferrer"
                title="Open Source Website"
                className="p-1.5 text-purple-700 hover:text-purple-900 hover:bg-purple-50 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">Open Source</span>
              </a>
            )}

            {/* Toggle Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                isEditing 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">{isEditing ? 'Editing' : 'Edit'}</span>
            </button>

            {/* Delete Button with Safety Warning */}
            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                title="Delete this evidence record"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-1 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
                <span className="text-[11px] font-bold text-rose-700">Delete?</span>
                <button
                  onClick={handleDelete}
                  className="px-1.5 py-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-[10px] font-bold"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[10px]"
                >
                  No
                </button>
              </div>
            )}

            <div className="h-4 w-px bg-slate-200 mx-1" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Side: Visual Viewer (7 or 8 cols) */}
          <div className="lg:col-span-7 bg-slate-950/95 flex flex-col items-center justify-center p-4 relative overflow-auto min-h-[350px] max-h-[60vh] lg:max-h-[75vh]">
            {isPdf ? (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{evidence.fileName || 'Competitor Document / Brochure.pdf'}</h3>
                  <p className="text-xs text-slate-400 mt-1">Archived PDF Document ({evidence.fileSize || 'Standard PDF'})</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-md transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Original PDF</span>
                  </button>
                  {evidence.sourceUrl && (
                    <a
                      href={evidence.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Online</span>
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative max-w-full max-h-full flex items-center justify-center">
                <img
                  src={evidence.fileUrl}
                  alt={evidence.title}
                  className={`rounded-lg object-contain transition-all duration-200 ${
                    isZoomed 
                      ? 'scale-125 cursor-zoom-out shadow-2xl' 
                      : 'max-h-[65vh] max-w-full cursor-zoom-in shadow-lg'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                
                {/* Floating zoom hint */}
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 hover:bg-black/80 text-white/90 rounded-md text-[10px] font-mono flex items-center gap-1 backdrop-blur-xs transition-colors"
                >
                  {isZoomed ? <ZoomOut className="w-3 h-3" /> : <ZoomIn className="w-3 h-3" />}
                  <span>{isZoomed ? 'Reset Zoom' : 'Click to Zoom'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Metadata, Notes & Connected Findings (5 cols) */}
          <div className="lg:col-span-5 bg-white border-t lg:border-t-0 lg:border-l border-purple-100 flex flex-col p-5 overflow-y-auto max-h-[60vh] lg:max-h-[75vh]">
            {confirmDelete && linkedFindings.length > 0 && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-300 text-amber-900 rounded-lg text-xs space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Important Note on Deletion</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  This evidence is currently connected to <span className="font-bold">{linkedFindings.length}</span> research findings. Deleting it will detach the visual file, but the findings themselves will remain safe and intact.
                </p>
              </div>
            )}

            {isEditing ? (
              /* Inline Edit Mode */
              <form onSubmit={handleSaveEdit} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-purple-100">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Edit Evidence Details
                  </span>
                  <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    Active Edit
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600 bg-white font-medium"
                  >
                    {EVIDENCE_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Source URL</label>
                  <input
                    type="url"
                    value={editSourceUrl}
                    onChange={(e) => setEditSourceUrl(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Verification Level</label>
                  <select
                    value={editVerification}
                    onChange={(e) => setEditVerification(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600 bg-white font-medium"
                  >
                    <option value="verified">Verified through published evidence</option>
                    <option value="company_reported">Company-reported</option>
                    <option value="unverified">Unverified</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Research Observation</label>
                  <textarea
                    rows={3}
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              /* View Metadata & Connected Findings Mode */
              <div className="space-y-4">
                {/* Connected Research Findings Section (Key Feature) */}
                <div className="p-3 bg-purple-50/50 border border-purple-200/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                      <Bookmark className="w-3.5 h-3.5 text-purple-700" />
                      <span>Connected Findings ({linkedFindings.length})</span>
                    </span>

                    {onOpenLinkModal && (
                      <button
                        onClick={() => onOpenLinkModal(evidence)}
                        className="text-[11px] font-bold text-purple-700 hover:text-purple-900 underline"
                      >
                        Manage Links
                      </button>
                    )}
                  </div>

                  {linkedFindings.length > 0 ? (
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {linkedFindings.map(f => {
                        const statusObj = FINDING_VERIFICATION_STATUSES.find(s => s.id === f.verificationStatus) || FINDING_VERIFICATION_STATUSES[3];
                        return (
                          <div key={f.id} className="p-2 bg-white rounded-lg border border-purple-100 text-xs shadow-2xs space-y-0.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-purple-700">{f.category}</span>
                              <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded border ${statusObj.badgeClass}`}>
                                {statusObj.label}
                              </span>
                            </div>
                            <p className="font-semibold text-slate-900 text-[11px] leading-tight line-clamp-2">
                              {f.title}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-2 text-slate-500 text-[11px]">
                      <span>Not linked to any research finding yet.</span>
                      {onOpenLinkModal && (
                        <button
                          onClick={() => onOpenLinkModal(evidence)}
                          className="block mx-auto mt-1 text-purple-700 font-bold hover:underline"
                        >
                          + Connect to Finding
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Verification Audit
                  </span>
                  <div className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-2 ${verificationObj.badgeClass}`}>
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{verificationObj.label}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Research Observation
                  </span>
                  <div className="p-3 bg-purple-50/40 border border-purple-100 rounded-lg text-xs text-slate-800 leading-relaxed font-normal">
                    {evidence.description || 'No specific researcher observations attached to this visual clipping.'}
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-purple-50 text-xs">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-purple-600" />
                      Category:
                    </span>
                    <span className="font-bold text-slate-800">{evidence.category}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Date Collected:
                    </span>
                    <span className="font-semibold text-slate-700">{evidence.collectedDate}</span>
                  </div>

                  {evidence.publishedDate && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        Date Published:
                      </span>
                      <span className="font-semibold text-slate-700">{evidence.publishedDate}</span>
                    </div>
                  )}

                  {evidence.fileName && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-slate-500">File Name:</span>
                      <span className="font-mono text-[11px] text-slate-600 truncate max-w-[170px]" title={evidence.fileName}>
                        {evidence.fileName}
                      </span>
                    </div>
                  )}
                </div>

                {evidence.sourceUrl && (
                  <div className="pt-2 border-t border-purple-50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Online Source Link
                    </span>
                    <a
                      href={evidence.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2.5 bg-slate-50 hover:bg-purple-50/60 rounded-lg border border-slate-200 hover:border-purple-200 text-xs text-purple-700 font-semibold flex items-center justify-between group transition-colors"
                    >
                      <span className="truncate max-w-[200px] font-mono text-[11px]">{evidence.sourceUrl}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
