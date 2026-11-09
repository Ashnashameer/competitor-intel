import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  SlidersHorizontal,
  MapPin,
  X,
  ExternalLink,
  Camera,
  Bookmark,
  GraduationCap,
  Landmark,
  Briefcase,
  Users,
  Activity,
  ShieldCheck,
  School,
  Handshake,
  Clock,
  Sparkles,
  LayoutGrid,
  Table as TableIcon,
  ArrowRight,
  Filter,
  RotateCcw,
  Globe,
  ChevronDown,
  BarChart3,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { MAIN_CATEGORIES, getOrgCategory, TECHNOLOGIES, DELIVERY_METHODS, COMPETITOR_RELEVANCE } from '../data/models';
import { KERALA_DISTRICTS } from '../data/geographicData';
import { VisualAnalyticsDeck } from './VisualAnalyticsDeck';
import { CompetitorIntelligenceModal } from './CompetitorIntelligenceModal';
import { SchoolProgrammeResearchModule } from './SchoolProgrammeResearchModule';

export function CompetitorDirectory({ 
  onSelectOrg, 
  onEditOrg, 
  onOpenAddModal,
  initialCategory = null
}) {
  const { 
    organisations,
    filteredOrganisations, 
    evidenceItems = [],
    findings = [],
    filters, 
    setFilterValue,
    activeFilterCount,
    clearAllFilters,
    setKozhikodePreset,
    setAllKeralaPreset,
    statistics
  } = useData();

  // Local UI State
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [showAnalytics, setShowAnalytics] = useState(true);
  const [selectedIntelligenceOrg, setSelectedIntelligenceOrg] = useState(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Slicer controls
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || filters.category || 'All');
  const [selectedDistrict, setSelectedDistrict] = useState(
    filters.districts && filters.districts.length === 1 ? filters.districts[0] : 'All'
  );
  const [selectedRelevance, setSelectedRelevance] = useState('All');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance' | 'name-asc' | 'name-desc' | 'district' | 'partnerships'

  // Sync category filter to DataContext
  const handleCategoryClick = (categoryName) => {
    const nextCategory = selectedCategory === categoryName ? 'All' : categoryName;
    setSelectedCategory(nextCategory);
    setFilterValue('category', nextCategory);
  };

  // Sync district filter to DataContext
  const handleDistrictChange = (districtName) => {
    setSelectedDistrict(districtName);
    if (districtName === 'All') {
      setFilterValue('districts', []);
    } else {
      setFilterValue('districts', [districtName]);
    }
  };

  // Reset all local and global filters
  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedDistrict('All');
    setSelectedRelevance('All');
    setSelectedDeliveryMethod('All');
    setSelectedTech('All');
    clearAllFilters();
  };

  // Filter and sort the displayed organisations
  const displayedOrganisations = useMemo(() => {
    let list = [...filteredOrganisations];

    // Local refinements (if not already handled in context)
    if (selectedCategory !== 'All') {
      list = list.filter(org => getOrgCategory(org) === selectedCategory);
    }
    if (selectedDistrict !== 'All') {
      list = list.filter(org => org.district === selectedDistrict);
    }
    if (selectedRelevance !== 'All') {
      list = list.filter(org => org.competitiveRelevance === selectedRelevance);
    }
    if (selectedDeliveryMethod !== 'All') {
      list = list.filter(org => org.deliveryMethod === selectedDeliveryMethod);
    }
    if (selectedTech !== 'All') {
      list = list.filter(org => (org.coursesTechnologies || []).includes(selectedTech));
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'district') return (a.district || '').localeCompare(b.district || '');
      if (sortBy === 'partnerships') {
        const countA = Array.isArray(a.institutionalPartnerships) ? a.institutionalPartnerships.length : (a.institutionalPartnerships ? 1 : 0);
        const countB = Array.isArray(b.institutionalPartnerships) ? b.institutionalPartnerships.length : (b.institutionalPartnerships ? 1 : 0);
        return countB - countA;
      }
      // Default: relevance rank
      const rank = { 'Direct': 1, 'Potential Partner': 2, 'Indirect': 3 };
      const rankA = rank[a.competitiveRelevance] || 4;
      const rankB = rank[b.competitiveRelevance] || 4;
      if (rankA !== rankB) return rankA - rankB;
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [filteredOrganisations, selectedCategory, selectedDistrict, selectedRelevance, selectedDeliveryMethod, selectedTech, sortBy]);

  // Compute 6 dynamic KPI metrics from displayed items
  const dynamicKPIs = useMemo(() => {
    const totalCompetitors = displayedOrganisations.length;
    const activeCompetitors = displayedOrganisations.filter(
      o => o.verificationStatus === 'verified' || (o.deliveryMethod && o.deliveryMethod.length > 0)
    ).length;
    const districtsCovered = new Set(displayedOrganisations.map(o => o.district).filter(Boolean)).size;

    const partnerInstitutions = new Set();
    displayedOrganisations.forEach(o => {
      if (Array.isArray(o.institutionalPartnerships)) {
        o.institutionalPartnerships.forEach(p => {
          const name = typeof p === 'string' ? p : (p.name || p.partner || p.institutionName);
          if (name && name.trim()) partnerInstitutions.add(name.trim());
        });
      }
    });
    const institutionsServed = partnerInstitutions.size || displayedOrganisations.filter(o => o.institutionalPartnerships && o.institutionalPartnerships.length > 0).length;

    const pTypes = new Set();
    displayedOrganisations.forEach(o => {
      if (o.deliveryMethod) pTypes.add(o.deliveryMethod);
      const cat = getOrgCategory(o);
      if (cat === 'Colleges & Universities') pTypes.add('Academic MoU / Lab Setup');
      if (cat === 'Schools') pTypes.add('STEM / Robotics Curriculum');
      if (cat === 'Corporate') pTypes.add('Corporate Upskilling');
      if (cat === 'Other Partnerships') pTypes.add('Finishing School Diploma');
    });
    const partnershipTypes = pTypes.size || 4;

    const recentlyAdded = displayedOrganisations.filter(o => o.createdDate && o.createdDate.startsWith('2026')).length || Math.min(totalCompetitors, 8);

    return {
      totalCompetitors,
      activeCompetitors,
      districtsCovered,
      institutionsServed,
      partnershipTypes,
      recentlyAdded
    };
  }, [displayedOrganisations]);

  // Dynamic category counts across currently active dataset
  const categoryCounts = useMemo(() => {
    const baseList = selectedDistrict !== 'All' 
      ? organisations.filter(o => o.district === selectedDistrict)
      : organisations;

    return {
      'Schools': baseList.filter(o => getOrgCategory(o) === 'Schools').length,
      'Colleges & Universities': baseList.filter(o => getOrgCategory(o) === 'Colleges & Universities').length,
      'Corporate': baseList.filter(o => getOrgCategory(o) === 'Corporate').length,
      'Other Partnerships': baseList.filter(o => getOrgCategory(o) === 'Other Partnerships').length,
    };
  }, [organisations, selectedDistrict]);

  const getRelevanceBadge = (relevance) => {
    switch (relevance) {
      case 'Direct':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            Direct Competitor
          </span>
        );
      case 'Potential Partner':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            Potential Partner
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
            Indirect Rival
          </span>
        );
    }
  };

  const getCategoryIcon = (categoryName) => {
    switch (categoryName) {
      case 'Schools':
        return GraduationCap;
      case 'Colleges & Universities':
        return Landmark;
      case 'Corporate':
        return Briefcase;
      case 'Other Partnerships':
      default:
        return Users;
    }
  };

  const hasAnyFilterActive = 
    selectedCategory !== 'All' || 
    selectedDistrict !== 'All' || 
    selectedRelevance !== 'All' || 
    selectedDeliveryMethod !== 'All' || 
    selectedTech !== 'All' || 
    Boolean(filters.search);

  return (
    <div className="space-y-6">
      {/* Competitor Directory Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Competitor Directory
        </h1>
      </div>

      {/* ========================================================= */}
      {/* ADVANCED FILTERS & SEARCH PANEL                          */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl border border-purple-100/90 p-4 lg:p-5 shadow-xs space-y-4">
        {/* Top Filter Bar: Search + Key Dropdowns + View Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex-1 max-w-lg relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by company name, technology, services, or location..."
              value={filters.search}
              onChange={(e) => setFilterValue('search', e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs bg-purple-50/20 border border-purple-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
            />
            {filters.search && (
              <button
                onClick={() => setFilterValue('search', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filters & Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* District Slicer Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-purple-100 px-3 py-1.5 rounded-xl text-xs">
              <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="text-slate-500 font-medium">District:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="All">All 14 Kerala Districts</option>
                {KERALA_DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-purple-100 px-3 py-1.5 rounded-xl text-xs">
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-bold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="relevance">Direct Competitors First</option>
                <option value="name-asc">Company Name (A-Z)</option>
                <option value="name-desc">Company Name (Z-A)</option>
                <option value="district">District Location</option>
                <option value="partnerships">Most Partnerships</option>
              </select>
            </div>

            {/* Visual Analytics Toggle */}
            <button
              onClick={() => setShowAnalytics(!showAnalytics)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                showAnalytics
                  ? 'bg-purple-100/70 text-purple-900 border-purple-300'
                  : 'bg-white text-slate-600 border-purple-100 hover:bg-purple-50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-purple-600" />
              <span>{showAnalytics ? 'Hide Analytics' : 'Show Analytics'}</span>
            </button>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-purple-100/40 p-1 rounded-xl border border-purple-200/60">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-purple-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Card Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-purple-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
                title="Structured Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Add Competitor Button */}
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-purple-700 hover:bg-purple-600 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Slicers Row: Presets, Relevance & Clear */}
        <div className="pt-2 border-t border-purple-100/60 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Focus:
            </span>

            {/* Kozhikode Priority Preset */}
            <button
              onClick={() => handleDistrictChange('Kozhikode')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedDistrict === 'Kozhikode'
                  ? 'bg-purple-700 text-white font-bold shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              Kozhikode Priority Hub
            </button>

            {/* All Kerala Preset */}
            <button
              onClick={() => handleDistrictChange('All')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedDistrict === 'All'
                  ? 'bg-purple-700 text-white font-bold shadow-xs'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              All Kerala (14 Districts)
            </button>

            {/* Delivery Method Filter */}
            <select
              value={selectedDeliveryMethod}
              onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
              className="bg-purple-50/50 border border-purple-200/80 px-2.5 py-1 rounded-lg text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Delivery Modes</option>
              {DELIVERY_METHODS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>

            {/* Relevance Filter */}
            <select
              value={selectedRelevance}
              onChange={(e) => setSelectedRelevance(e.target.value)}
              className="bg-purple-50/50 border border-purple-200/80 px-2.5 py-1 rounded-lg text-xs text-slate-700 font-medium focus:outline-none"
            >
              <option value="All">All Relationships</option>
              <option value="Direct">Direct Competitors Only</option>
              <option value="Potential Partner">Potential Partners Only</option>
              <option value="Indirect">Indirect Rivals Only</option>
            </select>
          </div>

          {/* Reset Filters Option */}
          {hasAnyFilterActive && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-purple-700 hover:text-purple-900 font-bold flex items-center gap-1 underline ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SPECIALIZED MODULE: SCHOOL PROGRAMME RESEARCH & FINDINGS  */}
      {/* Active whenever the Schools category is selected          */}
      {/* ========================================================= */}
      {selectedCategory === 'Schools' && (
        <SchoolProgrammeResearchModule
          activeDistrict={selectedDistrict}
          onDistrictChange={handleDistrictChange}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION 4: VISUAL ANALYTICS (INTERACTIVE CHARTS)          */}
      {/* ========================================================= */}
      {showAnalytics && (
        <VisualAnalyticsDeck
          organisations={displayedOrganisations}
          statistics={statistics}
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleDistrictChange}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryClick}
        />
      )}

      {/* ========================================================= */}
      {/* SECTION 5: COMPETITOR LISTING (CARDS OR TABLE)            */}
      {/* ========================================================= */}
      <div>
        {/* Results Summary Bar */}
        <div className="flex items-center justify-between mb-3 text-xs text-slate-600 font-medium">
          <div>
            Showing <span className="font-bold text-slate-900">{displayedOrganisations.length}</span> of <span className="font-bold text-slate-900">{organisations.length}</span> verified organisations in Kerala
            {selectedCategory !== 'All' && <span> • Category: <strong className="text-purple-700">{selectedCategory}</strong></span>}
            {selectedDistrict !== 'All' && <span> • District: <strong className="text-purple-700">{selectedDistrict}</strong></span>}
          </div>

          <div className="hidden sm:block text-[11px] text-slate-400">
            Click "View Intelligence" for full company dossier & analysis
          </div>
        </div>

        {displayedOrganisations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-purple-100 p-12 text-center text-slate-500">
            <Building2 className="w-12 h-12 text-purple-200 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800 mb-1">No competitors match your selected criteria</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
              Try adjusting your district, sector, or search keyword, or reset all active filters to view the full directory.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ======================================================= */
          /* CARD GRID VIEW (PREMIUM SAAS CARDS)                    */
          /* ======================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedOrganisations.map((org) => {
              const industryOrCategory = org.orgType || org.type || (Array.isArray(org.industry) ? org.industry[0] : org.industry) || org.category || 'Education & Technology';
              const locationText = `${org.city || org.district}, ${org.district}`;

              return (
                <div
                  key={org.id}
                  onClick={() => onSelectOrg(org)}
                  className="group bg-white rounded-2xl border border-purple-100 hover:border-purple-300 shadow-2xs hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between min-h-[195px] cursor-pointer"
                >
                  <div>
                    {/* Top: Monogram + Prominent Competitor Name */}
                    <div className="flex items-center gap-3 mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0c0a1a] via-[#1a1236] to-[#261f42] text-purple-300 font-black text-sm flex items-center justify-center shrink-0 border border-purple-900/40 shadow-xs group-hover:scale-105 transition-transform">
                        {org.logoText || org.name.substring(0, 2).toUpperCase()}
                      </div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-purple-700 transition-colors line-clamp-1 leading-snug">
                        {org.name}
                      </h3>
                    </div>

                    {/* Exactly Two Key Information Items Beneath Name */}
                    <div className="space-y-1.5 pl-0.5">
                      {/* Item 1: Industry / Category */}
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span className="truncate">{industryOrCategory}</span>
                      </div>

                      {/* Item 2: Location */}
                      <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        <span className="truncate">{locationText}</span>
                      </div>
                    </div>
                  </div>

                  {/* Single Prominent View Button */}
                  <div className="pt-4 mt-3 border-t border-purple-50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOrg(org);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ======================================================= */
          /* STRUCTURED TABLE VIEW (ENTERPRISE DATA GRID)           */
          /* ======================================================= */
          <div className="bg-white rounded-2xl border border-purple-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-purple-50/50 text-slate-700 font-bold border-b border-purple-100">
                  <tr>
                    <th className="px-5 py-3.5">Company / Organization</th>
                    <th className="px-4 py-3.5">Category</th>
                    <th className="px-4 py-3.5">Location</th>
                    <th className="px-4 py-3.5">Key Services & Tech</th>
                    <th className="px-4 py-3.5">Target Audience</th>
                    <th className="px-4 py-3.5">Partnerships</th>
                    <th className="px-4 py-3.5">EDGE Relationship</th>
                    <th className="px-5 py-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-50/80">
                  {displayedOrganisations.map((org) => {
                    const category = getOrgCategory(org);
                    const partnerCount = Array.isArray(org.institutionalPartnerships)
                      ? org.institutionalPartnerships.length
                      : (org.institutionalPartnerships ? 1 : 0);

                    return (
                      <tr 
                        key={org.id}
                        className="hover:bg-purple-50/30 transition-colors group"
                      >
                        {/* 1. Name & Website */}
                        <td className="px-5 py-3.5 font-medium text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0c0a1a] to-[#261f42] text-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                              {org.logoText || org.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                                {org.name}
                              </div>
                              {org.website && (
                                <a
                                  href={org.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] text-slate-400 hover:text-purple-600 flex items-center gap-1 hover:underline"
                                >
                                  <span>{org.website.replace(/^https?:\/\//, '')}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 2. Category */}
                        <td className="px-4 py-3.5 text-slate-700 font-semibold whitespace-nowrap">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] bg-purple-50 text-purple-700 border border-purple-200">
                            {category}
                          </span>
                        </td>

                        {/* 3. Location */}
                        <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 font-medium">
                            <MapPin className="w-3 h-3 text-purple-500 shrink-0" />
                            {org.city}, {org.district}
                          </span>
                        </td>

                        {/* 4. Services & Tech */}
                        <td className="px-4 py-3.5 text-slate-700 max-w-[200px]">
                          <span className="line-clamp-1 text-slate-800 font-medium">
                            {(org.coursesTechnologies || []).slice(0, 3).join(', ') || org.servicesOffered || 'Technology Education'}
                          </span>
                        </td>

                        {/* 5. Target Audience */}
                        <td className="px-4 py-3.5 text-slate-600 max-w-[180px]">
                          <span className="line-clamp-1">
                            {org.targetAudience || 'Students & Professionals'}
                          </span>
                        </td>

                        {/* 6. Partnerships */}
                        <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                          <span className="font-semibold text-purple-950">
                            {partnerCount > 0 ? `${partnerCount} Institutional MoUs` : 'Direct Delivery'}
                          </span>
                        </td>

                        {/* 7. Relationship */}
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {getRelevanceBadge(org.competitiveRelevance)}
                        </td>

                        {/* 8. Action CTA */}
                        <td className="px-5 py-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedIntelligenceOrg(org)}
                            className="px-3 py-1 rounded-lg bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs inline-flex items-center gap-1 transition-colors"
                          >
                            <span>View Intelligence</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* SECTION 6: INDIVIDUAL COMPETITOR INTELLIGENCE DRAWER      */}
      {/* ========================================================= */}
      <CompetitorIntelligenceModal
        org={selectedIntelligenceOrg}
        isOpen={Boolean(selectedIntelligenceOrg)}
        onClose={() => setSelectedIntelligenceOrg(null)}
        onOpenFullDossier={(org) => {
          setSelectedIntelligenceOrg(null);
          if (onSelectOrg) onSelectOrg(org);
        }}
      />
    </div>
  );
}
