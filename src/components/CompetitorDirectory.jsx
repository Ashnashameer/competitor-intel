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
import { 
  MAIN_CATEGORIES, 
  getOrgCategory, 
  orgMatchesCategory, 
  isExternalProvider, 
  isEducationalInstitution, 
  ENTITY_NATURES,
  TECHNOLOGIES, 
  DELIVERY_METHODS, 
  COMPETITOR_RELEVANCE 
} from '../data/models';
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
  const [selectedEntityNature, setSelectedEntityNature] = useState('all'); // 'all' | 'external_provider' | 'institution'
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
    setSelectedEntityNature('all');
    setSelectedDistrict('All');
    setSelectedRelevance('All');
    setSelectedDeliveryMethod('All');
    setSelectedTech('All');
    clearAllFilters();
  };

  // Filter and sort the displayed organisations
  const displayedOrganisations = useMemo(() => {
    let list = [...filteredOrganisations];

    // Local refinements (supports multi-category matching)
    if (selectedCategory !== 'All') {
      list = list.filter(org => orgMatchesCategory(org, selectedCategory));
    }
    if (selectedEntityNature !== 'all') {
      list = list.filter(org => (org.entityNature || (isExternalProvider(org) ? 'external_provider' : 'institution')) === selectedEntityNature);
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

  // Dynamic category counts across currently active dataset (supports multi-category memberships)
  const categoryCounts = useMemo(() => {
    const baseList = selectedDistrict !== 'All' 
      ? organisations.filter(o => o.district === selectedDistrict)
      : organisations;

    return {
      'All': baseList.length,
      'Schools': baseList.filter(o => orgMatchesCategory(o, 'Schools')).length,
      'Colleges & Universities': baseList.filter(o => orgMatchesCategory(o, 'Colleges & Universities')).length,
      'Corporate': baseList.filter(o => orgMatchesCategory(o, 'Corporate')).length,
      'Other Partnerships': baseList.filter(o => orgMatchesCategory(o, 'Other Partnerships')).length,
      'Multi-Segment': baseList.filter(o => orgMatchesCategory(o, 'Multi-Segment')).length,
    };
  }, [organisations, selectedDistrict]);

  const getRelevanceBadge = (relevance) => {
    switch (relevance) {
      case 'Direct':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Direct Competitor
          </span>
        );
      case 'Potential Partner':
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            Potential Partner
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200">
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

  const FOUR_CATEGORY_CARDS = [
    {
      id: 'Schools',
      name: 'SCHOOLS',
      icon: GraduationCap,
      description: 'Show competitors, providers, organisations, and programmes that work with or provide services to schools / K-12 institutions / school students.',
      focusHighlights: 'Robotics · STEM Labs · Coding Curriculum · School Add-ons',
    },
    {
      id: 'Colleges & Universities',
      name: 'COLLEGES & UNIVERSITIES',
      icon: Landmark,
      description: 'Show competitors, training providers, organisations, and institutions that work with or provide services to colleges, universities, engineering colleges, higher-education institutions, or college students.',
      focusHighlights: 'Campus MoUs · Technical Labs · Faculty Development · Placement Training',
    },
    {
      id: 'Corporate',
      name: 'CORPORATE',
      icon: Briefcase,
      description: 'Show organisations and providers that work with companies, businesses, corporate employees, HR/L&D teams, or corporate training programmes.',
      focusHighlights: 'Enterprise Upskilling · Automation Consulting · B2B L&D · Professional Certs',
    },
    {
      id: 'Other Partnerships',
      name: 'OTHER PARTNERSHIPS',
      icon: Users,
      description: 'Show organisations whose relevant partnerships do not fit neatly into the first three categories, including government institutions, NGOs, community organisations, specialised institutional partnerships, clubs, associations, and other verified partnership models.',
      focusHighlights: 'Govt / K-DISC · NGOs · Skill Development · Ecosystem Networks',
    }
  ];

  return (
    <div className="space-y-6">
      {/* =========================================================================
          TOP NAVIGATION LAYER: 4-CARD CATEGORY SELECTION (BALANCED 2x2 EDITORIAL GRID)
          Restructured based on verified service delivery and institutional partnerships
          ========================================================================= */}
      <section className="space-y-3">
        {/* Section Headline & Meta */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-purple-700">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span>MARKET SEGMENT TAXONOMY</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mt-1 font-sans">
              Competitor Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Explore {organisations.length} verified technology education providers classified across verified target groups. Select a category card below to filter the directory.
            </p>
          </div>

          {/* Quick Global Reset Action */}
          <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
            {selectedCategory !== 'All' ? (
              <button
                onClick={() => handleCategoryClick('All')}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-900 hover:bg-purple-200 border border-purple-300 transition-all cursor-pointer shadow-xs"
              >
                <span>Filter: <strong className="font-mono">{selectedCategory.toUpperCase()}</strong> ({categoryCounts[selectedCategory] || 0})</span>
                <X className="w-3.5 h-3.5 text-purple-700" />
                <span className="text-[11px] font-normal underline">Show All 51</span>
              </button>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>All {organisations.length} Entities Active</span>
              </span>
            )}
          </div>
        </div>

        {/* Four Large Sophisticated Cards in a Balanced 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 pt-1">
          {FOUR_CATEGORY_CARDS.map((cat) => {
            const Icon = cat.icon;
            const count = categoryCounts[cat.id] || 0;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden text-left border ${
                  isSelected
                    ? 'bg-gradient-to-br from-purple-50/95 via-white to-purple-100/50 border-2 border-purple-600 shadow-xl shadow-purple-950/10 ring-4 ring-purple-100 -translate-y-0.5'
                    : 'bg-white border-slate-200/90 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-950/5 hover:-translate-y-1'
                }`}
              >
                {/* Subtle Oversized Background Watermark Icon */}
                <Icon 
                  className={`absolute -right-3 -bottom-3 w-36 h-36 pointer-events-none transition-all duration-500 ${
                    isSelected 
                      ? 'text-purple-600/[0.08] scale-110' 
                      : 'text-slate-900/[0.03] group-hover:text-purple-600/[0.06] group-hover:scale-105'
                  }`} 
                  aria-hidden="true"
                />

                {/* Subtle top reflective accent line */}
                <div className={`absolute inset-x-0 top-0 h-1 transition-colors ${
                  isSelected ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600' : 'bg-transparent group-hover:bg-purple-300/50'
                }`} />

                <div>
                  {/* Top Row: Refined Icon + Entity Count Indicator */}
                  <div className="flex items-center justify-between gap-3 mb-4 relative z-10">
                    <div 
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 ${
                        isSelected 
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-300' 
                          : 'bg-purple-50 text-purple-700 ring-1 ring-purple-100/80 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-md group-hover:shadow-purple-500/20'
                      }`}
                    >
                      <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider bg-purple-600 text-white uppercase shadow-xs">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>ACTIVE</span>
                        </span>
                      )}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-tight border transition-colors ${
                        isSelected
                          ? 'bg-purple-100 text-purple-950 border-purple-300 shadow-xs'
                          : 'bg-slate-100/90 text-slate-700 border-slate-200 group-hover:bg-purple-50 group-hover:text-purple-900 group-hover:border-purple-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-purple-600' : 'bg-emerald-500'}`} />
                        <span>{count} {count === 1 ? 'Entity' : 'Entities'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Large Category Name */}
                  <h3 className={`text-xl sm:text-2xl font-black tracking-tight uppercase transition-colors relative z-10 ${
                    isSelected ? 'text-purple-950 font-sans' : 'text-slate-900 group-hover:text-purple-700 font-sans'
                  }`}>
                    {cat.name}
                  </h3>

                  {/* Short One-Line Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal relative z-10">
                    {cat.description}
                  </p>

                  {/* Sub-Focus Highlights */}
                  <div className="mt-3.5 relative z-10">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-50 text-slate-600 border border-slate-200/70 group-hover:border-purple-200/80 group-hover:bg-purple-50/40 transition-colors">
                      {cat.focusHighlights}
                    </span>
                  </div>
                </div>

                {/* Bottom Row: Clear Explore Interaction */}
                <div className={`pt-5 mt-5 border-t flex items-center justify-between text-xs sm:text-sm font-bold transition-all relative z-10 ${
                  isSelected 
                    ? 'border-purple-200/80 text-purple-900' 
                    : 'border-slate-100 text-purple-700 group-hover:text-purple-900'
                }`}>
                  <span className="flex items-center gap-1.5 tracking-wide">
                    <span>{isSelected ? `Explore ${cat.name} (Active Filter)` : `Explore ${cat.name}`}</span>
                  </span>
                  <div className={`flex items-center gap-1.5 transition-transform duration-300 ${
                    isSelected ? 'translate-x-1' : 'group-hover:translate-x-1.5'
                  }`}>
                    <span className="text-xs font-mono font-semibold">{isSelected ? 'Click to Reset' : 'Explore'}</span>
                    <ArrowRight className="w-4 h-4 text-purple-600 group-hover:text-purple-900" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* DIRECTORY CONTROLS & REFINEMENTS                          */}
      {/* ========================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500">
            DIRECTORY RESULTS:
          </span>
          <span className="text-xs font-semibold text-slate-800">
            Showing {displayedOrganisations.length} of {organisations.length} organisations
            {selectedCategory !== 'All' && (
              <span className="text-purple-700 font-bold ml-1">in {selectedCategory}</span>
            )}
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Card Grid View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Structured Table View"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* Entity Nature Filter Pills (Distinguish Providers vs Institutions) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
        <div className="flex items-center gap-1.5 p-0.5 bg-slate-100 rounded-lg border border-slate-250 text-xs">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2">
            Entity Type:
          </span>
          <button
            onClick={() => setSelectedEntityNature('all')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer ${
              selectedEntityNature === 'all'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Entities ({organisations.length})
          </button>
          <button
            onClick={() => setSelectedEntityNature('external_provider')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedEntityNature === 'external_provider'
                ? 'bg-white text-purple-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            External Service Providers ({organisations.filter(o => isExternalProvider(o)).length})
          </button>
          <button
            onClick={() => setSelectedEntityNature('institution')}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedEntityNature === 'institution'
                ? 'bg-white text-blue-700 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Institutions Themselves ({organisations.filter(o => isEducationalInstitution(o)).length})
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* ADVANCED FILTERS & SEARCH PANEL                          */}
      {/* ========================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        {/* Top Filter Bar: Search + Key Dropdowns */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex-1 max-w-lg relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by company name, technology, services, or location..."
              value={filters.search}
              onChange={(e) => setFilterValue('search', e.target.value)}
              className="w-full pl-10 pr-9 py-2 text-xs bg-slate-50 border border-slate-250 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-medium"
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
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-250 px-3 py-1.5 rounded-lg text-xs">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-500 font-medium">District:</span>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="All">All 14 Districts</option>
                {KERALA_DISTRICTS.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-250 px-3 py-1.5 rounded-lg text-xs">
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
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
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border ${
                showAnalytics
                  ? 'bg-slate-100 text-slate-900 border-slate-300 font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
              <span>{showAnalytics ? 'Hide Analytics' : 'Analytics'}</span>
            </button>

            {/* Add Competitor Button */}
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Record</span>
              </button>
            )}
          </div>
        </div>

        {/* Secondary Slicers Row: Presets, Relevance & Clear */}
        <div className="pt-2 border-t border-slate-150 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Quick Filter:
            </span>

            {/* Kozhikode Priority Preset */}
            <button
              onClick={() => handleDistrictChange('Kozhikode')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedDistrict === 'Kozhikode'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Kozhikode District
            </button>

            {/* All Kerala Preset */}
            <button
              onClick={() => handleDistrictChange('All')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                selectedDistrict === 'All'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All 14 Districts
            </button>

            {/* Delivery Method Filter */}
            <select
              value={selectedDeliveryMethod}
              onChange={(e) => setSelectedDeliveryMethod(e.target.value)}
              className="bg-slate-50 border border-slate-250 px-2.5 py-1 rounded-md text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
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
              className="bg-slate-50 border border-slate-250 px-2.5 py-1 rounded-md text-xs text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-purple-500"
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
              className="text-xs text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 underline ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
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
        <div className="flex items-center justify-between mb-3 text-xs text-slate-500 font-medium">
          <div>
            Showing <span className="font-semibold text-slate-900">{displayedOrganisations.length}</span> of <span className="font-semibold text-slate-900">{organisations.length}</span> competitors
            {selectedCategory !== 'All' && <span> • Category: <strong className="text-slate-800">{selectedCategory}</strong></span>}
            {selectedDistrict !== 'All' && <span> • District: <strong className="text-slate-800">{selectedDistrict}</strong></span>}
          </div>

          <div className="hidden sm:block text-[11px] text-slate-400">
            Click any competitor to inspect their profile & intelligence
          </div>
        </div>

        {displayedOrganisations.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-900 mb-1">No competitors match your criteria</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Try adjusting your district, sector, or search keyword, or reset all active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-3.5 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-medium hover:bg-purple-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* ======================================================= */
          /* CARD GRID VIEW (CLEAN SAAS CARDS)                       */
          /* ======================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedOrganisations.map((org) => {
              const industryOrCategory = org.orgType || org.type || (Array.isArray(org.industry) ? org.industry[0] : org.industry) || org.category || 'Education & Technology';
              const locationText = `${org.city || org.district}, ${org.district}`;

              return (
                <div
                  key={org.id}
                  onClick={() => onSelectOrg(org)}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-slate-350 hover:shadow-md transition-all duration-200 p-4 flex flex-col justify-between min-h-[190px] cursor-pointer"
                >
                  <div>
                    {/* Top: Monogram + Prominent Competitor Name */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-9 h-9 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                        {org.logoText || org.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-semibold text-slate-900 text-sm group-hover:text-purple-600 transition-colors line-clamp-1 leading-snug">
                            {org.name}
                          </h3>
                          {org.isMultiSegment && (
                            <span className="px-1.5 py-0.2 rounded text-[9.5px] font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                              Multi-Sector
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate">{locationText}</p>
                      </div>
                    </div>

                    {/* Entity Nature & Primary Business */}
                    <div className="space-y-2 pl-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold border ${
                          org.entityNature === 'institution'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${org.entityNature === 'institution' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                          {org.entityNatureLabel || (org.entityNature === 'institution' ? 'Educational Institution Itself' : 'External Service Provider')}
                        </span>
                      </div>

                      {org.primaryBusiness && (
                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {org.primaryBusiness}
                        </p>
                      )}

                      {/* 4-Target Partnership Matrix */}
                      {org.partnershipTargets && (
                        <div className="pt-0.5">
                          <div className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
                            Verified Institutional Targets:
                          </div>
                          <div className="grid grid-cols-4 gap-1 text-[9.5px] font-mono text-center">
                            <span 
                              className={`px-1 py-0.5 rounded border ${
                                org.partnershipTargets.schools === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' :
                                org.partnershipTargets.schools === 'Unverified' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`} 
                              title={`Schools: ${org.partnershipTargets.schools}`}
                            >
                              SCH: {org.partnershipTargets.schools}
                            </span>
                            <span 
                              className={`px-1 py-0.5 rounded border ${
                                org.partnershipTargets.colleges === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' :
                                org.partnershipTargets.colleges === 'Unverified' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`} 
                              title={`Colleges & Universities: ${org.partnershipTargets.colleges}`}
                            >
                              COL: {org.partnershipTargets.colleges}
                            </span>
                            <span 
                              className={`px-1 py-0.5 rounded border ${
                                org.partnershipTargets.corporate === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' :
                                org.partnershipTargets.corporate === 'Unverified' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`} 
                              title={`Corporate: ${org.partnershipTargets.corporate}`}
                            >
                              CORP: {org.partnershipTargets.corporate}
                            </span>
                            <span 
                              className={`px-1 py-0.5 rounded border ${
                                org.partnershipTargets.otherInstitutions === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' :
                                org.partnershipTargets.otherInstitutions === 'Unverified' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`} 
                              title={`Other Institutions: ${org.partnershipTargets.otherInstitutions}`}
                            >
                              PTN: {org.partnershipTargets.otherInstitutions}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="truncate">{industryOrCategory}</span>
                        {getRelevanceBadge(org.competitiveRelevance)}
                      </div>
                    </div>
                  </div>

                  {/* Single View Button */}
                  <div className="pt-3 mt-3 border-t border-slate-150">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOrg(org);
                      }}
                      className="w-full py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-purple-600 text-slate-700 hover:text-white font-medium text-xs border border-slate-200 hover:border-purple-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ======================================================= */
          /* STRUCTURED TABLE VIEW                                   */
          /* ======================================================= */
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-4 py-3 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">Company</th>
                    <th className="px-3 py-3">Entity Type</th>
                    <th className="px-3 py-3">Category</th>
                    <th className="px-3 py-3">Target Matrix</th>
                    <th className="px-3 py-3">Location</th>
                    <th className="px-3 py-3">Key Services & Tech</th>
                    <th className="px-3 py-3">Target Audience</th>
                    <th className="px-3 py-3">Partnerships</th>
                    <th className="px-3 py-3">Position</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {displayedOrganisations.map((org) => {
                    const category = getOrgCategory(org);
                    const partnerCount = Array.isArray(org.institutionalPartnerships)
                      ? org.institutionalPartnerships.length
                      : (org.institutionalPartnerships ? 1 : 0);

                    return (
                      <tr 
                        key={org.id}
                        className="hover:bg-slate-50 transition-colors group cursor-pointer"
                        onClick={() => onSelectOrg(org)}
                      >
                        {/* 1. Name & Website */}
                        <td className="px-4 py-3 font-medium text-slate-900 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-10 border-r border-slate-200">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-md bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                              {org.logoText || org.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-1">
                                {org.name}
                              </div>
                              {org.website && (
                                <a
                                  href={org.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-[11px] text-slate-400 hover:text-purple-600 flex items-center gap-1 hover:underline"
                                >
                                  <span>{org.website.replace(/^https?:\/\//, '')}</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 2. Entity Type */}
                        <td className="px-3 py-3 text-slate-700 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10.5px] font-semibold border ${
                            org.entityNature === 'institution'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-purple-50 text-purple-700 border-purple-200'
                          }`}>
                            {org.entityNature === 'institution' ? 'Institution Itself' : 'External Provider'}
                          </span>
                        </td>

                        {/* 3. Category */}
                        <td className="px-3 py-3 text-slate-700 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                            {category}
                          </span>
                        </td>

                        {/* 4. Target Matrix */}
                        <td className="px-3 py-3 text-slate-700 whitespace-nowrap">
                          {org.partnershipTargets ? (
                            <div className="flex items-center gap-1 text-[9.5px] font-mono">
                              <span className={`px-1 py-0.2 rounded border ${
                                org.partnershipTargets.schools === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' :
                                org.partnershipTargets.schools === 'Unverified' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`} title={`Schools: ${org.partnershipTargets.schools}`}>
                                SCH:{org.partnershipTargets.schools[0]}
                              </span>
                              <span className={`px-1 py-0.2 rounded border ${
                                org.partnershipTargets.colleges === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' :
                                org.partnershipTargets.colleges === 'Unverified' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`} title={`Colleges: ${org.partnershipTargets.colleges}`}>
                                COL:{org.partnershipTargets.colleges[0]}
                              </span>
                              <span className={`px-1 py-0.2 rounded border ${
                                org.partnershipTargets.corporate === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' :
                                org.partnershipTargets.corporate === 'Unverified' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`} title={`Corporate: ${org.partnershipTargets.corporate}`}>
                                CORP:{org.partnershipTargets.corporate[0]}
                              </span>
                              <span className={`px-1 py-0.2 rounded border ${
                                org.partnershipTargets.otherInstitutions === 'Yes' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 font-bold' :
                                org.partnershipTargets.otherInstitutions === 'Unverified' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-slate-50 text-slate-400 border-slate-200'
                              }`} title={`Other: ${org.partnershipTargets.otherInstitutions}`}>
                                PTN:{org.partnershipTargets.otherInstitutions[0]}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[10px]">—</span>
                          )}
                        </td>

                        {/* 3. Location */}
                        <td className="px-3 py-3 text-slate-600 whitespace-nowrap font-medium">
                          {org.city}, {org.district}
                        </td>

                        {/* 4. Services & Tech */}
                        <td className="px-3 py-3 text-slate-700 max-w-[200px]">
                          <span className="line-clamp-1 text-slate-700">
                            {(org.coursesTechnologies || []).slice(0, 3).join(', ') || org.servicesOffered || 'Technology Education'}
                          </span>
                        </td>

                        {/* 5. Target Audience */}
                        <td className="px-3 py-3 text-slate-600 max-w-[180px]">
                          <span className="line-clamp-1">
                            {org.targetAudience || 'Students & Professionals'}
                          </span>
                        </td>

                        {/* 6. Partnerships */}
                        <td className="px-3 py-3 text-slate-700 whitespace-nowrap">
                          <span className="font-medium text-slate-900">
                            {partnerCount > 0 ? `${partnerCount} Institutional MoUs` : 'Direct Delivery'}
                          </span>
                        </td>

                        {/* 7. Relationship */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          {getRelevanceBadge(org.competitiveRelevance)}
                        </td>

                        {/* 8. Action CTA */}
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedIntelligenceOrg(org);
                            }}
                            className="px-2.5 py-1 rounded-md text-xs font-medium text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-200 transition-all inline-flex items-center gap-1"
                          >
                            <span>Profile</span>
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
