import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Upload, 
  Crop, 
  RotateCcw, 
  Check, 
  Image as ImageIcon, 
  FileText, 
  Globe, 
  Calendar, 
  Tag, 
  Info, 
  Sparkles,
  Scissors,
  Maximize2,
  ZoomIn,
  ClipboardPaste,
  ShieldCheck
} from 'lucide-react';
import { EVIDENCE_CATEGORIES, VERIFICATION_STATUSES } from '../data/models';

export function EvidenceCropModal({
  isOpen,
  onClose,
  org,
  orgFindings = [],
  onSave
}) {
  const [fileData, setFileData] = useState(null); // { name, type, size, dataUrl, isPdf }
  const [cropBox, setCropBox] = useState({ x: 10, y: 10, w: 80, h: 80 }); // in percentages (0-100)
  const [isCropped, setIsCropped] = useState(false);
  const [croppedDataUrl, setCroppedDataUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragMode, setDragMode] = useState('new'); // 'new', 'move', 'nw', 'ne', 'sw', 'se'

  // Metadata Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(EVIDENCE_CATEGORIES[0]);
  const [sourceUrl, setSourceUrl] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [collectedDate, setCollectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [verificationStatus, setVerificationStatus] = useState('verified');
  const [selectedFindingIds, setSelectedFindingIds] = useState([]);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageContainerRef = useRef(null);
  const imgElementRef = useRef(null);
  const fileInputRef = useRef(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFileData(null);
      setCroppedDataUrl(null);
      setIsCropped(false);
      setTitle('');
      setCategory(EVIDENCE_CATEGORIES[0]);
      setSourceUrl(org?.website || '');
      setDescription('');
      setPublishedDate('');
      setCollectedDate(new Date().toISOString().split('T')[0]);
      setVerificationStatus('verified');
      setSelectedFindingIds([]);
      setValidationError('');
      setCropBox({ x: 5, y: 5, w: 90, h: 90 });
    }
  }, [isOpen, org]);

  // Handle global paste (Cmd+V / Ctrl+V) for instant screenshot capture
  useEffect(() => {
    if (!isOpen) return;

    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file, 'Pasted-Screenshot-' + new Date().toLocaleTimeString().replace(/:/g, '-') + '.png');
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [isOpen]);

  const processFile = (file, fallbackName) => {
    setValidationError('');
    const fileName = file.name || fallbackName || 'evidence-capture.png';
    const isPdf = file.type === 'application/pdf' || fileName.toLowerCase().endsWith('.pdf');
    const fileSizeKb = Math.round(file.size / 1024) + ' KB';

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setFileData({
        name: fileName,
        type: file.type || (isPdf ? 'application/pdf' : 'image/png'),
        size: fileSizeKb,
        dataUrl,
        isPdf
      });
      setIsCropped(false);
      setCroppedDataUrl(null);
      setCropBox({ x: 5, y: 5, w: 90, h: 90 });

      // Auto-populate title if empty
      if (!title) {
        const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
        setTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Preset Crop Ratios
  const applyPresetRatio = (ratioType) => {
    if (!imgElementRef.current) return;
    setIsCropped(false);
    setCroppedDataUrl(null);

    if (ratioType === 'full') {
      setCropBox({ x: 0, y: 0, w: 100, h: 100 });
      return;
    }

    const img = imgElementRef.current;
    const containerW = img.clientWidth;
    const containerH = img.clientHeight;

    let targetRatio = 16 / 9;
    if (ratioType === '4:3') targetRatio = 4 / 3;
    if (ratioType === '1:1') targetRatio = 1;

    let boxW = 85;
    let boxH = (boxW * containerW) / (targetRatio * containerH);

    if (boxH > 90) {
      boxH = 85;
      boxW = (boxH * containerH * targetRatio) / containerW;
    }

    const x = Math.max(0, (100 - boxW) / 2);
    const y = Math.max(0, (100 - boxH) / 2);

    setCropBox({
      x: Math.round(x),
      y: Math.round(y),
      w: Math.round(boxW),
      h: Math.round(boxH)
    });
  };

  // Perform the actual crop operation onto an offscreen canvas
  const handlePerformCrop = () => {
    if (!imgElementRef.current || !fileData || fileData.isPdf) return;

    const img = imgElementRef.current;
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    const cropX = (cropBox.x / 100) * naturalW;
    const cropY = (cropBox.y / 100) * naturalH;
    const cropW = (cropBox.w / 100) * naturalW;
    const cropH = (cropBox.h / 100) * naturalH;

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(cropW));
    canvas.height = Math.max(1, Math.round(cropH));

    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      img,
      cropX,
      cropY,
      cropW,
      cropH,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const resultDataUrl = canvas.toDataURL(fileData.type.startsWith('image/') ? fileData.type : 'image/png', 0.95);
    setCroppedDataUrl(resultDataUrl);
    setIsCropped(true);
  };

  const handleResetCrop = () => {
    setIsCropped(false);
    setCroppedDataUrl(null);
    setCropBox({ x: 5, y: 5, w: 90, h: 90 });
  };

  // Interactive mouse events on crop overlay
  const handleMouseDown = (e, mode = 'new') => {
    if (!imageContainerRef.current || isCropped) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const xPct = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

    setIsDragging(true);
    setDragMode(mode);
    setDragStart({ x: xPct, y: yPct, startBox: { ...cropBox } });
  };

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !imageContainerRef.current || isCropped) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const xPct = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100));
    const yPct = Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100));

    if (dragMode === 'new') {
      const left = Math.min(dragStart.x, xPct);
      const top = Math.min(dragStart.y, yPct);
      const w = Math.max(5, Math.abs(xPct - dragStart.x));
      const h = Math.max(5, Math.abs(yPct - dragStart.y));
      setCropBox({ x: left, y: top, w, h });
    } else if (dragMode === 'move') {
      const dx = xPct - dragStart.x;
      const dy = yPct - dragStart.y;
      const initial = dragStart.startBox;

      const newX = Math.min(100 - initial.w, Math.max(0, initial.x + dx));
      const newY = Math.min(100 - initial.h, Math.max(0, initial.y + dy));
      setCropBox({ ...initial, x: newX, y: newY });
    } else if (dragMode === 'se') {
      const w = Math.min(100 - cropBox.x, Math.max(10, xPct - cropBox.x));
      const h = Math.min(100 - cropBox.y, Math.max(10, yPct - cropBox.y));
      setCropBox(prev => ({ ...prev, w, h }));
    }
  }, [isDragging, dragMode, dragStart, isCropped, cropBox]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fileData) {
      setValidationError('Please select or paste an image or PDF document.');
      return;
    }
    if (!title.trim()) {
      setValidationError('Please enter an evidence title.');
      return;
    }

    setIsSubmitting(true);

    const finalFileUrl = isCropped && croppedDataUrl ? croppedDataUrl : fileData.dataUrl;

    const evidenceRecord = {
      id: `ev-${Date.now()}`,
      orgId: org.id,
      orgName: org.name,
      title: title.trim(),
      category,
      fileUrl: finalFileUrl,
      fileType: fileData.type,
      fileName: fileData.name,
      fileSize: fileData.size,
      sourceUrl: sourceUrl.trim(),
      description: description.trim(),
      publishedDate: publishedDate || null,
      collectedDate: collectedDate || new Date().toISOString().split('T')[0],
      verificationStatus,
      isDemonstrationData: false
    };

    onSave(evidenceRecord, selectedFindingIds);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-purple-100 flex items-center justify-between bg-gradient-to-r from-purple-50/50 via-white to-purple-50/30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center shadow-xs">
              <Crop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Evidence & Research Collection</span>
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
                  Capture & Trim
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Saving visual evidence for <span className="font-semibold text-purple-900">{org?.name}</span>
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
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {validationError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs font-medium flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Upload / Paste Area */}
          {!fileData ? (
            <div 
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-purple-200 hover:border-purple-500 hover:bg-purple-50/30 rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/png,image/jpeg,image/webp,application/pdf"
                className="hidden" 
                onChange={handleFileInputChange}
              />
              
              <div className="w-14 h-14 rounded-2xl bg-purple-100 group-hover:bg-purple-200/70 text-purple-700 flex items-center justify-center transition-colors">
                <Upload className="w-7 h-7" />
              </div>

              <div>
                <p className="text-sm font-bold text-slate-900">
                  Drop screenshot or document here, or <span className="text-purple-700 underline underline-offset-2">browse file</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Supports JPG, PNG, WEBP and PDF documents (up to 15MB)
                </p>
              </div>

              {/* Clipboard Paste Callout */}
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                <ClipboardPaste className="w-3.5 h-3.5 text-purple-600" />
                <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Cmd + V</kbd> or <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Ctrl + V</kbd> anywhere to paste screenshot</span>
              </div>
            </div>
          ) : (
            /* File Uploaded & Interactive Cropper View */
            <div className="space-y-4">
              {/* File Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  {fileData.isPdf ? (
                    <FileText className="w-5 h-5 text-rose-600 shrink-0" />
                  ) : (
                    <ImageIcon className="w-5 h-5 text-purple-600 shrink-0" />
                  )}
                  <span className="font-bold text-slate-900 truncate max-w-xs">{fileData.name}</span>
                  <span className="text-slate-400">({fileData.size})</span>
                  {isCropped && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" /> Cropped Selection
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFileData(null);
                      setCroppedDataUrl(null);
                      setIsCropped(false);
                    }}
                    className="text-xs text-slate-600 hover:text-rose-700 font-semibold px-2 py-1 rounded hover:bg-slate-200/60 transition-colors"
                  >
                    Replace File
                  </button>
                </div>
              </div>

              {/* If Image: Show Interactive Canvas Cropper Controls */}
              {!fileData.isPdf && (
                <div className="space-y-3">
                  {/* Cropper Toolbar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-purple-50/50 p-2.5 rounded-xl border border-purple-100">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-slate-600 font-bold mr-1 flex items-center gap-1">
                        <Scissors className="w-3.5 h-3.5 text-purple-700" />
                        Crop Tool:
                      </span>
                      <button
                        type="button"
                        onClick={() => applyPresetRatio('full')}
                        className="px-2 py-1 text-[11px] font-semibold bg-white border border-slate-200 rounded hover:bg-purple-50 text-slate-700"
                      >
                        Full
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetRatio('16:9')}
                        className="px-2 py-1 text-[11px] font-semibold bg-white border border-slate-200 rounded hover:bg-purple-50 text-slate-700"
                      >
                        16:9
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetRatio('4:3')}
                        className="px-2 py-1 text-[11px] font-semibold bg-white border border-slate-200 rounded hover:bg-purple-50 text-slate-700"
                      >
                        4:3
                      </button>
                      <button
                        type="button"
                        onClick={() => applyPresetRatio('1:1')}
                        className="px-2 py-1 text-[11px] font-semibold bg-white border border-slate-200 rounded hover:bg-purple-50 text-slate-700"
                      >
                        1:1
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCropped ? (
                        <button
                          type="button"
                          onClick={handleResetCrop}
                          className="flex items-center gap-1 px-3 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset Crop</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handlePerformCrop}
                          className="flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 rounded-lg transition-colors shadow-xs"
                        >
                          <Crop className="w-3.5 h-3.5" />
                          <span>Apply Crop Selection</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Cropper Viewport */}
                  <div className="relative bg-slate-900 rounded-xl overflow-hidden border border-slate-300 flex items-center justify-center min-h-[260px] max-h-[380px]">
                    {isCropped && croppedDataUrl ? (
                      <div className="p-4 flex flex-col items-center">
                        <img 
                          src={croppedDataUrl} 
                          alt="Cropped Preview" 
                          className="max-h-[300px] object-contain rounded shadow-lg border border-purple-200"
                        />
                        <span className="text-[11px] text-purple-300 font-medium mt-2">
                          Selection trimmed. Click "Reset Crop" above to adjust.
                        </span>
                      </div>
                    ) : (
                      <div 
                        ref={imageContainerRef}
                        className="relative select-none cursor-crosshair overflow-hidden inline-block"
                        onMouseDown={(e) => handleMouseDown(e, 'new')}
                      >
                        <img 
                          ref={imgElementRef}
                          src={fileData.dataUrl} 
                          alt="Original Evidence" 
                          className="max-h-[340px] max-w-full object-contain pointer-events-none block"
                        />

                        {/* Darkened Mask Outside Crop Box */}
                        <div 
                          className="absolute inset-0 bg-black/55 pointer-events-none"
                        />

                        {/* Highlighted Crop Box */}
                        <div
                          style={{
                            left: `${cropBox.x}%`,
                            top: `${cropBox.y}%`,
                            width: `${cropBox.w}%`,
                            height: `${cropBox.h}%`,
                          }}
                          className="absolute border-2 border-purple-400 bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.55)] cursor-move"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleMouseDown(e, 'move');
                          }}
                        >
                          {/* Grid Lines inside crop box */}
                          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-40">
                            <div className="border-r border-b border-white/60"></div>
                            <div className="border-r border-b border-white/60"></div>
                            <div className="border-b border-white/60"></div>
                            <div className="border-r border-b border-white/60"></div>
                            <div className="border-r border-b border-white/60"></div>
                            <div className="border-b border-white/60"></div>
                            <div className="border-r border-white/60"></div>
                            <div className="border-r border-white/60"></div>
                            <div></div>
                          </div>

                          {/* Resize Handle at Bottom-Right */}
                          <div
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              handleMouseDown(e, 'se');
                            }}
                            className="absolute -right-2 -bottom-2 w-4 h-4 bg-purple-600 border-2 border-white rounded-full cursor-se-resize shadow-md"
                          />

                          {/* Top Tag */}
                          <div className="absolute top-1 left-1.5 px-1.5 py-0.5 bg-purple-900/80 text-white rounded text-[9px] font-mono font-bold tracking-wider pointer-events-none">
                            DRAG TO TRIM
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* If PDF Document: Show Document Notice */}
              {fileData.isPdf && (
                <div className="p-6 bg-purple-50/50 rounded-xl border border-purple-200 text-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{fileData.name}</h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    PDF Document verified ({fileData.size}). The full original document will be archived and viewable directly in the profile gallery.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Evidence Metadata Form */}
          <form id="evidence-form" onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-purple-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-purple-600" />
              <span>Evidence Details & Research Observation</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Evidence Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Evidence Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MoU with Engineering College / AI Course Syllabus"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                />
              </div>

              {/* Evidence Category */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Evidence Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 bg-white transition-all font-medium"
                >
                  {EVIDENCE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Source URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Source URL</span>
                  <span className="text-[10px] text-slate-400 font-normal">Link to competitor website / post</span>
                </label>
                <div className="relative">
                  <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="url"
                    placeholder="https://example.com/programs/ai-course"
                    value={sourceUrl}
                    onChange={(e) => setSourceUrl(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Verification Level</span>
                  <span className="text-[10px] text-purple-600 font-medium">Audit Confidence</span>
                </label>
                <select
                  value={verificationStatus}
                  onChange={(e) => setVerificationStatus(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 bg-white transition-all font-medium"
                >
                  <option value="verified">Verified through published evidence</option>
                  <option value="company_reported">Company-reported</option>
                  <option value="unverified">Unverified</option>
                </select>
              </div>

              {/* Published Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Date Published</span>
                  <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                </label>
                <input
                  type="date"
                  value={publishedDate}
                  onChange={(e) => setPublishedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
                />
              </div>

              {/* Collected Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Date Collected <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={collectedDate}
                  onChange={(e) => setCollectedDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-medium"
                />
              </div>
            </div>

            {/* Description & Research Observation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Description & Research Observation
              </label>
              <textarea
                rows={3}
                placeholder="Key insights, claims verified, fee amounts mentioned, specific tools used, or competitive intelligence notes..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all"
              />
            </div>

            {/* Link to Existing Research Findings (Optional) */}
            {orgFindings.length > 0 && (
              <div className="pt-3 border-t border-purple-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Bookmark className="w-3.5 h-3.5 text-purple-600" />
                    <span>Connect to Existing Research Findings ({selectedFindingIds.length} selected)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                </div>

                <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                  {orgFindings.map(f => {
                    const isChecked = selectedFindingIds.includes(f.id);
                    return (
                      <div
                        key={f.id}
                        onClick={() => {
                          setSelectedFindingIds(prev => 
                            prev.includes(f.id) ? prev.filter(id => id !== f.id) : [...prev, f.id]
                          );
                        }}
                        className={`p-2 rounded-lg border flex items-center justify-between gap-2 text-xs cursor-pointer transition-all ${
                          isChecked 
                            ? 'bg-purple-50/80 border-purple-300 ring-1 ring-purple-500/20' 
                            : 'bg-white border-slate-200 hover:border-purple-200'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <span className="text-[10px] font-bold text-purple-700 block">{f.category}</span>
                          <span className="font-semibold text-slate-900 truncate block text-[11px]">{f.title}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 text-purple-600 rounded border-slate-300 pointer-events-none shrink-0"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </form>
        </div>

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
            form="evidence-form"
            disabled={isSubmitting || !fileData}
            className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Save to Organisation Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

