import React, { useState, useEffect } from 'react';
import { 
  X, 
  Building, 
  Save, 
  Plus, 
  Trash2, 
  Sparkles,
  MapPin,
  ShieldCheck,
  Target
} from 'lucide-react';
import { 
  SEGMENTS, 
  ORGANISATION_TYPES, 
  TECHNOLOGIES, 
  DURATIONS, 
  DELIVERY_METHODS, 
  VERIFICATION_STATUSES,
  COMPETITOR_RELEVANCE
} from '../data/models';
import { KERALA_DISTRICTS } from '../data/geographicData';

export function AddEditCompetitorModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData 
}) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: '',
    logoText: '',
    website: '',
    country: 'India',
    state: 'Kerala',
    district: 'Kozhikode',
    city: 'Kozhikode City',
    address: '',
    orgType: 'Independent Training Academy',
    segment: 'training_institutes',
    companyOverview: '',
    targetAudience: '',
    servicesOffered: '',
    educationalActivities: '',
    coursesTechnologies: ['Artificial Intelligence', 'Python'],
    programmeDurations: ['6 Months'],
    deliveryMethod: 'Offline (Classroom / Lab)',
    pricing: '',
    internships: true,
    internshipsDetails: 'Practical project internship provided',
    certifications: true,
    certificationsDetails: 'Course completion credential',
    placementSupport: true,
    placementDetails: 'Placement assistance wing active',
    institutionalPartnerships: '',
    strengths: '',
    weaknesses: '',
    competitiveRelevance: 'Direct',
    relevanceReason: '',
    verificationStatus: 'verified',
    sourceTitle: '',
    sourceUrl: '',
    sourceNotes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        institutionalPartnerships: Array.isArray(initialData.institutionalPartnerships) 
          ? initialData.institutionalPartnerships.join(', ') 
          : initialData.institutionalPartnerships || '',
        sourceTitle: initialData.researchSources?.[0]?.title || '',
        sourceUrl: initialData.researchSources?.[0]?.url || '',
        sourceNotes: initialData.researchSources?.[0]?.notes || ''
      });
    } else {
      // Default new record
      setFormData({
        name: '',
        logoText: '',
        website: '',
        country: 'India',
        state: 'Kerala',
        district: 'Kozhikode',
        city: 'Kozhikode City',
        address: '',
        orgType: 'Independent Training Academy',
        segment: 'training_institutes',
        companyOverview: '',
        targetAudience: '',
        servicesOffered: '',
        educationalActivities: '',
        coursesTechnologies: ['Artificial Intelligence', 'Python'],
        programmeDurations: ['6 Months'],
        deliveryMethod: 'Offline (Classroom / Lab)',
        pricing: '',
        internships: true,
        internshipsDetails: 'Practical project internship provided',
        certifications: true,
        certificationsDetails: 'Course completion credential',
        placementSupport: true,
        placementDetails: 'Placement assistance wing active',
        institutionalPartnerships: '',
        strengths: '',
        weaknesses: '',
        competitiveRelevance: 'Direct',
        relevanceReason: '',
        verificationStatus: 'verified',
        sourceTitle: '',
        sourceUrl: '',
        sourceNotes: ''
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const toggleTech = (tech) => {
    setFormData(prev => {
      const exists = prev.coursesTechnologies.includes(tech);
      return {
        ...prev,
        coursesTechnologies: exists 
          ? prev.coursesTechnologies.filter(t => t !== tech)
          : [...prev.coursesTechnologies, tech]
      };
    });
  };

  const toggleDuration = (dur) => {
    setFormData(prev => {
      const exists = prev.programmeDurations.includes(dur);
      return {
        ...prev,
        programmeDurations: exists 
          ? prev.programmeDurations.filter(d => d !== dur)
          : [...prev.programmeDurations, dur]
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Organisation name is required.');
      return;
    }

    const cleanedPartnerships = formData.institutionalPartnerships
      ? formData.institutionalPartnerships.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const sources = formData.sourceTitle ? [{
      title: formData.sourceTitle,
      url: formData.sourceUrl,
      date: new Date().toISOString().split('T')[0],
      notes: formData.sourceNotes || 'Empirical audit'
    }] : (initialData?.researchSources || []);

    const payload = {
      ...(initialData || {}),
      name: formData.name,
      logoText: formData.logoText || formData.name.substring(0, 3).toUpperCase(),
      website: formData.website,
      country: formData.country,
      state: formData.state,
      district: formData.district,
      city: formData.city,
      address: formData.address,
      orgType: formData.orgType,
      segment: formData.segment,
      companyOverview: formData.companyOverview,
      targetAudience: formData.targetAudience,
      servicesOffered: formData.servicesOffered,
      educationalActivities: formData.educationalActivities,
      coursesTechnologies: formData.coursesTechnologies,
      programmeDurations: formData.programmeDurations,
      deliveryMethod: formData.deliveryMethod,
      pricing: formData.pricing,
      internships: formData.internships,
      internshipsDetails: formData.internshipsDetails,
      certifications: formData.certifications,
      certificationsDetails: formData.certificationsDetails,
      placementSupport: formData.placementSupport,
      placementDetails: formData.placementDetails,
      institutionalPartnerships: cleanedPartnerships,
      strengths: formData.strengths,
      weaknesses: formData.weaknesses,
      competitiveRelevance: formData.competitiveRelevance,
      relevanceReason: formData.relevanceReason,
      verificationStatus: formData.verificationStatus,
      researchSources: sources
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-400" />
              {isEditing ? 'Edit Competitor Intelligence Record' : 'Add New Competitor Record'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Enter verified institutional data across all 24 standardized fields.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-slate-700">
          {/* SECTION 1: IDENTITY & GEOGRAPHY */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-1">
              1. Identity, Web & Geographic Hierarchy
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-800 mb-1">Organisation Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luminar Technolab"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Logo Monogram / Code</label>
                <input
                  type="text"
                  maxLength={5}
                  placeholder="e.g. LT"
                  value={formData.logoText}
                  onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Official Website</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Address / Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Cyberpark, Mavoor Road, Calicut"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Geographic hierarchy: India -> State -> District -> City */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">District (Kerala)</label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white font-medium"
                >
                  {KERALA_DISTRICTS.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">City / Locality</label>
                <input
                  type="text"
                  placeholder="e.g. Kozhikode City"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: CATEGORY & CLASSIFICATION */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-1">
              2. Segment & Relevance Classification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Competitor Segment (5) *</label>
                <select
                  value={formData.segment}
                  onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold"
                >
                  {SEGMENTS.map(s => (
                    <option key={s.id} value={s.id}>[{s.code}] {s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Organisation Type</label>
                <select
                  value={formData.orgType}
                  onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  {ORGANISATION_TYPES.map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Relevance to EDGE *</label>
                <select
                  value={formData.competitiveRelevance}
                  onChange={(e) => setFormData({ ...formData, competitiveRelevance: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-bold text-blue-900"
                >
                  {COMPETITOR_RELEVANCE.map(r => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Company Overview</label>
              <textarea
                rows={2}
                placeholder="Core background, history, and institutional positioning..."
                value={formData.companyOverview}
                onChange={(e) => setFormData({ ...formData, companyOverview: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Target Audience</label>
              <input
                type="text"
                placeholder="e.g. Higher secondary science students, B.Tech graduates, career pivoters"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* SECTION 3: SERVICES & EDUCATION ARM */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-1">
              3. Services & Educational Activities (Assessed Separately)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Commercial / Core Services</label>
                <textarea
                  rows={2}
                  placeholder="General client services, software dev, marketing agency..."
                  value={formData.servicesOffered}
                  onChange={(e) => setFormData({ ...formData, servicesOffered: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Educational & Training Arm (Specific to EDGE assessment)
                </label>
                <textarea
                  rows={2}
                  placeholder="Detail exact coding bootcamps, workshops, labs..."
                  value={formData.educationalActivities}
                  onChange={(e) => setFormData({ ...formData, educationalActivities: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Technology Matrix Multi-Select */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">
                Technologies & Courses (Click to toggle):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {TECHNOLOGIES.map(tech => {
                  const isSelected = formData.coursesTechnologies.includes(tech);
                  return (
                    <button
                      type="button"
                      key={tech}
                      onClick={() => toggleTech(tech)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-blue-700 text-white font-semibold shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Programme Durations Multi-Select */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">
                Programme Durations (Click to toggle):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DURATIONS.map(dur => {
                  const isSelected = formData.programmeDurations.includes(dur);
                  return (
                    <button
                      type="button"
                      key={dur}
                      onClick={() => toggleDuration(dur)}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-blue-700 text-white font-semibold shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      {dur}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Delivery Method</label>
                <select
                  value={formData.deliveryMethod}
                  onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  {DELIVERY_METHODS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Pricing / Fees</label>
                <input
                  type="text"
                  placeholder="e.g. ₹45,000 or Upon enquiry"
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: OUTCOMES & PARTNERSHIPS */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-1">
              4. Practical Outcomes, Partnerships & SWOT
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.internships}
                    onChange={(e) => setFormData({ ...formData, internships: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span>Offers Internships</span>
                </label>
                <input
                  type="text"
                  placeholder="Details..."
                  value={formData.internshipsDetails}
                  onChange={(e) => setFormData({ ...formData, internshipsDetails: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-[11px] bg-white"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.certifications}
                    onChange={(e) => setFormData({ ...formData, certifications: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span>Offers Certifications</span>
                </label>
                <input
                  type="text"
                  placeholder="Issuing body..."
                  value={formData.certificationsDetails}
                  onChange={(e) => setFormData({ ...formData, certificationsDetails: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-[11px] bg-white"
                />
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={formData.placementSupport}
                    onChange={(e) => setFormData({ ...formData, placementSupport: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-0"
                  />
                  <span>Placement Assistance</span>
                </label>
                <input
                  type="text"
                  placeholder="Placement claims..."
                  value={formData.placementDetails}
                  onChange={(e) => setFormData({ ...formData, placementDetails: e.target.value })}
                  className="w-full px-2 py-1 border border-slate-300 rounded text-[11px] bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Institutional Partnerships (Comma-separated)
              </label>
              <input
                type="text"
                placeholder="e.g. KSUM IEDC, ASAP Kerala, Intel AI for Youth"
                value={formData.institutionalPartnerships}
                onChange={(e) => setFormData({ ...formData, institutionalPartnerships: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Strengths</label>
                <textarea
                  rows={2}
                  placeholder="Key competitive advantages..."
                  value={formData.strengths}
                  onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Weaknesses & Gaps</label>
                <textarea
                  rows={2}
                  placeholder="Curriculum limitations, dropouts, weak tech stack..."
                  value={formData.weaknesses}
                  onChange={(e) => setFormData({ ...formData, weaknesses: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Competitive Relevance to EDGE (Strategic Reason)
              </label>
              <input
                type="text"
                placeholder="e.g. Major commercial competitor in Kozhikode for 6-month graduate diplomas"
                value={formData.relevanceReason}
                onChange={(e) => setFormData({ ...formData, relevanceReason: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* SECTION 5: VERIFICATION AUDIT & CITATIONS */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-1">
              5. Research Verification & Source Citation
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Verification Status *</label>
                <select
                  value={formData.verificationStatus}
                  onChange={(e) => setFormData({ ...formData, verificationStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold bg-white"
                >
                  {VERIFICATION_STATUSES.map(v => (
                    <option key={v.id} value={v.id}>{v.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Source Title</label>
                <input
                  type="text"
                  placeholder="e.g. Official Course Prospectus / Cyberpark Directory"
                  value={formData.sourceTitle}
                  onChange={(e) => setFormData({ ...formData, sourceTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">Source URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.sourceUrl}
                  onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Audit Notes</label>
                <input
                  type="text"
                  placeholder="Audited date, evidence location..."
                  value={formData.sourceNotes}
                  onChange={(e) => setFormData({ ...formData, sourceNotes: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>{isEditing ? 'Save Changes' : 'Create Competitor Record'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

