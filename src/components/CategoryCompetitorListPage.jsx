import React, { useState, useMemo } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  LayoutGrid, 
  Table2, 
  ArrowUpDown, 
  ArrowUp, 
  ArrowDown, 
  RotateCcw,
  ExternalLink,
  ChevronDown,
  Cpu,
  HeartHandshake,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { 
  MARKET_CATEGORIES, 
  getOrganisationsForCategory,
  PARTNER_ECOSYSTEM,
  SCHOOL_SKILL_CATEGORIES,
  getCompetitorSkillCategories
} from '../data/categoryRelationships';
import { useData } from '../context/DataContext';

export function CategoryCompetitorListPage({ 
  categoryId, 
  onBackToCategories, 
  onSelectOrg, 
  onNavigateHome 
}) {
  const { organisations } = useData();

  // Find category metadata
  const category = useMemo(() => {
    return MARKET_CATEGORIES.find(c => c.id === categoryId) || MARKET_CATEGORIES[0];
  }, [categoryId]);

  // Query organisations belonging to this category (deduplicated by ID)
  const categoryOrganisations = useMemo(() => {
    const raw = getOrganisationsForCategory(categoryId, organisations);
    const seen = new Set();
    return raw.filter(o => {
      if (!o || !o.id || seen.has(o.id)) return false;
      seen.add(o.id);
      return true;
    });
  }, [categoryId, organisations]);

  // View Mode: 'card' or 'table'
  const [viewMode, setViewMode] = useState('card');

  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting State for Table View
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'

  // ==========================================
  // CATEGORY-SPECIFIC FILTER STATES
  // ==========================================

  // Schools Filters
  const [schoolSkillCategory, setSchoolSkillCategory] = useState('All'); // 'All' | 'Technical Skills' | 'Soft Skills & Personal Development'
  const [schoolDistrict, setSchoolDistrict] = useState('All');
  const [schoolLocation, setSchoolLocation] = useState('All');
  const [schoolProgType, setSchoolProgType] = useState('All');
  const [schoolService, setSchoolService] = useState('All');
  const [schoolTargetClasses, setSchoolTargetClasses] = useState('All');
  const [schoolDeliveryMode, setSchoolDeliveryMode] = useState('All');
  const [schoolVerification, setSchoolVerification] = useState('All');

  // Live Counts for School Skill Categories
  const techCount = useMemo(() => {
    return categoryOrganisations.filter(org => getCompetitorSkillCategories(org).includes('Technical Skills')).length;
  }, [categoryOrganisations]);

  const softCount = useMemo(() => {
    return categoryOrganisations.filter(org => getCompetitorSkillCategories(org).includes('Soft Skills & Personal Development')).length;
  }, [categoryOrganisations]);

  // Colleges Filters
  const [collegeLocation, setCollegeLocation] = useState('All');
  const [collegeInstType, setCollegeInstType] = useState('All');
  const [collegeProgType, setCollegeProgType] = useState('All');
  const [collegeService, setCollegeService] = useState('All');
  const [collegeVerification, setCollegeVerification] = useState('All');

  // Corporate Filters
  const [corporateIndustry, setCorporateIndustry] = useState('All');
  const [corporateLocation, setCorporateLocation] = useState('All');
  const [corporateServiceType, setCorporateServiceType] = useState('All');
  const [corporateTrainingType, setCorporateTrainingType] = useState('All');
  const [corporateVerification, setCorporateVerification] = useState('All');

  // Other Partnerships Filters
  const [otherPtnType, setOtherPtnType] = useState('All');
  const [otherOrgType, setOtherOrgType] = useState('All');
  const [otherLocation, setOtherLocation] = useState('All');
  const [otherRelatedProg, setOtherRelatedProg] = useState('All');
  const [otherVerification, setOtherVerification] = useState('All');

  // ==========================================
  // EXTRACT DYNAMIC FILTER OPTIONS
  // ==========================================

  // Schools Options
  const schoolDistricts = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.district).filter(Boolean))].sort(), [categoryOrganisations]);
  const schoolLocations = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.city).filter(Boolean))].sort(), [categoryOrganisations]);
  const schoolDeliveryModes = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.deliveryMethod || o.deliveryMode).filter(Boolean))].sort(), [categoryOrganisations]);

  // Colleges Options
  const collegeLocations = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.city || o.district).filter(Boolean))].sort(), [categoryOrganisations]);
  const collegeInstTypes = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.type || o.orgType).filter(Boolean))].sort(), [categoryOrganisations]);

  // Corporate Options
  const corporateLocations = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.city || o.district).filter(Boolean))].sort(), [categoryOrganisations]);
  const corporateIndustries = useMemo(() => {
    const list = new Set();
    categoryOrganisations.forEach(o => {
      if (Array.isArray(o.industry)) o.industry.forEach(i => list.add(i));
      else if (o.type) list.add(o.type);
    });
    return ['All', ...Array.from(list)].sort();
  }, [categoryOrganisations]);

  // Other Partnerships Options
  const otherLocations = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.city || o.district).filter(Boolean))].sort(), [categoryOrganisations]);
  const otherOrgTypes = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.type || o.orgType).filter(Boolean))].sort(), [categoryOrganisations]);
  const otherPtnTypes = useMemo(() => ['All', ...new Set(categoryOrganisations.map(o => o.partnershipType || o.categoryRelationship?.relationshipType).filter(Boolean))].sort(), [categoryOrganisations]);

  // ==========================================
  // RESET HANDLER
  // ==========================================
  const handleResetFilters = () => {
    setSearchQuery('');
    setSchoolSkillCategory('All');
    setSchoolDistrict('All');
    setSchoolLocation('All');
    setSchoolProgType('All');
    setSchoolService('All');
    setSchoolTargetClasses('All');
    setSchoolDeliveryMode('All');
    setSchoolVerification('All');

    setCollegeLocation('All');
    setCollegeInstType('All');
    setCollegeProgType('All');
    setCollegeService('All');
    setCollegeVerification('All');

    setCorporateIndustry('All');
    setCorporateLocation('All');
    setCorporateServiceType('All');
    setCorporateTrainingType('All');
    setCorporateVerification('All');

    setOtherPtnType('All');
    setOtherOrgType('All');
    setOtherLocation('All');
    setOtherRelatedProg('All');
    setOtherVerification('All');
  };

  const isFilterActive = useMemo(() => {
    if (searchQuery.trim() !== '') return true;
    if (categoryId === 'schools') {
      return schoolSkillCategory !== 'All' || schoolDistrict !== 'All' || schoolLocation !== 'All' || schoolProgType !== 'All' || schoolService !== 'All' || schoolTargetClasses !== 'All' || schoolDeliveryMode !== 'All' || schoolVerification !== 'All';
    }
    if (categoryId === 'colleges') {
      return collegeLocation !== 'All' || collegeInstType !== 'All' || collegeProgType !== 'All' || collegeService !== 'All' || collegeVerification !== 'All';
    }
    if (categoryId === 'corporate') {
      return corporateIndustry !== 'All' || corporateLocation !== 'All' || corporateServiceType !== 'All' || corporateTrainingType !== 'All' || corporateVerification !== 'All';
    }
    if (categoryId === 'other_partnerships') {
      return otherPtnType !== 'All' || otherOrgType !== 'All' || otherLocation !== 'All' || otherRelatedProg !== 'All' || otherVerification !== 'All';
    }
    return false;
  }, [
    searchQuery, categoryId,
    schoolSkillCategory, schoolDistrict, schoolLocation, schoolProgType, schoolService, schoolTargetClasses, schoolDeliveryMode, schoolVerification,
    collegeLocation, collegeInstType, collegeProgType, collegeService, collegeVerification,
    corporateIndustry, corporateLocation, corporateServiceType, corporateTrainingType, corporateVerification,
    otherPtnType, otherOrgType, otherLocation, otherRelatedProg, otherVerification
  ]);

  // ==========================================
  // FILTERING & SEARCHING
  // ==========================================
  const filteredOrganisations = useMemo(() => {
    return categoryOrganisations.filter(org => {
      // Functional Search: Organisation name, Location, Services, Programmes
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = org.name?.toLowerCase().includes(q);
        const matchesCity = org.city?.toLowerCase().includes(q);
        const matchesDistrict = org.district?.toLowerCase().includes(q);
        const matchesServices = (
          (typeof org.services === 'string' && org.services.toLowerCase().includes(q)) ||
          (typeof org.servicesOffered === 'string' && org.servicesOffered.toLowerCase().includes(q)) ||
          (Array.isArray(org.services) && org.services.some(s => typeof s === 'string' && s.toLowerCase().includes(q)))
        );
        const matchesProgrammes = (org.relevantProgrammes || []).some(p => p.toLowerCase().includes(q));

        if (!matchesName && !matchesCity && !matchesDistrict && !matchesServices && !matchesProgrammes) {
          return false;
        }
      }

      // Schools Filters
      if (categoryId === 'schools') {
        if (schoolSkillCategory !== 'All') {
          const orgSkillCats = getCompetitorSkillCategories(org);
          if (!orgSkillCats.includes(schoolSkillCategory)) return false;
        }
        if (schoolDistrict !== 'All' && org.district !== schoolDistrict) return false;
        if (schoolLocation !== 'All' && org.city !== schoolLocation) return false;
        if (schoolVerification !== 'All' && org.verificationStatus !== schoolVerification) return false;
        if (schoolDeliveryMode !== 'All') {
          const mode = org.deliveryMethod || org.deliveryMode || '';
          if (!mode.toLowerCase().includes(schoolDeliveryMode.toLowerCase())) return false;
        }
        if (schoolProgType !== 'All') {
          const progs = (org.relevantProgrammes || []).join(' ').toLowerCase();
          if (!progs.includes(schoolProgType.toLowerCase())) return false;
        }
        if (schoolService !== 'All') {
          const srv = `${org.services || ''} ${org.servicesOffered || ''}`.toLowerCase();
          if (!srv.includes(schoolService.toLowerCase())) return false;
        }
        if (schoolTargetClasses !== 'All') {
          const target = `${org.targetClasses || ''} ${org.targetAudience || ''}`.toLowerCase();
          if (!target.includes(schoolTargetClasses.toLowerCase())) return false;
        }
      }

      // Colleges Filters
      if (categoryId === 'colleges') {
        if (collegeLocation !== 'All') {
          const loc = `${org.city || ''} ${org.district || ''}`.toLowerCase();
          if (!loc.includes(collegeLocation.toLowerCase())) return false;
        }
        if (collegeInstType !== 'All') {
          const type = (org.type || org.orgType || '').toLowerCase();
          if (!type.includes(collegeInstType.toLowerCase())) return false;
        }
        if (collegeVerification !== 'All' && org.verificationStatus !== collegeVerification) return false;
        if (collegeProgType !== 'All') {
          const progs = (org.relevantProgrammes || []).join(' ').toLowerCase();
          if (!progs.includes(collegeProgType.toLowerCase())) return false;
        }
        if (collegeService !== 'All') {
          const srv = `${org.services || ''} ${org.servicesOffered || ''}`.toLowerCase();
          if (!srv.includes(collegeService.toLowerCase())) return false;
        }
      }

      // Corporate Filters
      if (categoryId === 'corporate') {
        if (corporateLocation !== 'All') {
          const loc = `${org.city || ''} ${org.district || ''}`.toLowerCase();
          if (!loc.includes(corporateLocation.toLowerCase())) return false;
        }
        if (corporateIndustry !== 'All') {
          const ind = Array.isArray(org.industry) ? org.industry.join(' ').toLowerCase() : (org.type || '').toLowerCase();
          if (!ind.includes(corporateIndustry.toLowerCase())) return false;
        }
        if (corporateVerification !== 'All' && org.verificationStatus !== corporateVerification) return false;
        if (corporateServiceType !== 'All') {
          const srv = `${org.services || ''} ${org.servicesOffered || ''}`.toLowerCase();
          if (!srv.includes(corporateServiceType.toLowerCase())) return false;
        }
        if (corporateTrainingType !== 'All') {
          const prog = (org.relevantProgrammes || []).join(' ').toLowerCase();
          if (!prog.includes(corporateTrainingType.toLowerCase())) return false;
        }
      }

      // Other Partnerships Filters
      if (categoryId === 'other_partnerships') {
        if (otherLocation !== 'All') {
          const loc = `${org.city || ''} ${org.district || ''}`.toLowerCase();
          if (!loc.includes(otherLocation.toLowerCase())) return false;
        }
        if (otherPtnType !== 'All') {
          const rel = (org.partnershipType || org.categoryRelationship?.relationshipType || '').toLowerCase();
          if (!rel.includes(otherPtnType.toLowerCase())) return false;
        }
        if (otherOrgType !== 'All') {
          const type = (org.type || org.orgType || '').toLowerCase();
          if (!type.includes(otherOrgType.toLowerCase())) return false;
        }
        if (otherVerification !== 'All' && org.verificationStatus !== otherVerification) return false;
        if (otherRelatedProg !== 'All') {
          const progs = (org.relevantProgrammes || []).join(' ').toLowerCase();
          if (!progs.includes(otherRelatedProg.toLowerCase())) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Handle Column Sorting
      let valA = a[sortField] || '';
      let valB = b[sortField] || '';

      if (sortField === 'name') {
        valA = a.name || '';
        valB = b.name || '';
      } else if (sortField === 'location') {
        valA = a.city || '';
        valB = b.city || '';
      } else if (sortField === 'district') {
        valA = a.district || '';
        valB = b.district || '';
      } else if (sortField === 'status') {
        valA = a.verificationStatus || '';
        valB = b.verificationStatus || '';
      }

      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return 0;
    });
  }, [
    categoryOrganisations, searchQuery, sortField, sortDirection, categoryId,
    schoolDistrict, schoolLocation, schoolProgType, schoolService, schoolTargetClasses, schoolDeliveryMode, schoolVerification,
    collegeLocation, collegeInstType, collegeProgType, collegeService, collegeVerification,
    corporateIndustry, corporateLocation, corporateServiceType, corporateTrainingType, corporateVerification,
    otherPtnType, otherOrgType, otherLocation, otherRelatedProg, otherVerification
  ]);

  // Handle Sort Toggle
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Category Page Title
  const getPageHeading = () => {
    switch (categoryId) {
      case 'schools':
        return 'Schools';
      case 'colleges':
        return 'Colleges';
      case 'corporate':
        return 'Corporate';
      case 'other_partnerships':
        return 'Other Partnerships';
      default:
        return category.title;
    }
  };

  // Helper to extract services text
  const getServicesSnippet = (org) => {
    if (typeof org.services === 'string') return org.services;
    if (typeof org.servicesOffered === 'string') return org.servicesOffered;
    if (Array.isArray(org.services)) return org.services.join(', ');
    return 'Curriculum & Institutional Solutions';
  };

  // Helper for partner organisations column in table
  const getPartnerOrgsSnippet = (org) => {
    if (org.id === 'org-delead-01') {
      return 'Walkaroo Foundation, DIETs, NITC TBI, Nlightened ZenSolutions';
    }
    if (org.id === 'org-qfactory-01') {
      return "Sree Gokulam Public School, Bhavan's School Chevayur";
    }
    if (org.id === 'org-ulspaceclub-01') {
      return "GHSS Karapparamba, General Education Dept, DIET Kozhikode";
    }
    if (org.id === 'org-robuverse-01' || org.id === 'org-stemxpert-01' || org.id === 'org-youngminds-01') {
      return 'School partnerships: Specific school names not publicly disclosed';
    }
    if (org.id === 'org-evolve-01' || org.id === 'org-isq-01' || org.id === 'org-naturenurture-01') {
      return 'School partnerships: Not independently verified';
    }
    const connected = PARTNER_ECOSYSTEM.filter(p => p.connectedOrganisations.includes(org.name));
    if (connected.length > 0) return connected.map(c => c.name).join(', ');
    if (org.institutionalPartnerships && org.institutionalPartnerships.length > 0) {
      return `${org.institutionalPartnerships.length} Institutional MoUs`;
    }
    return 'None reported';
  };

  // Helper for school partnerships count/text
  const getSchoolPartnershipsSnippet = (org) => {
    if (org.id === 'org-delead-01') return '44 Government & Aided High Schools (Walk2Lead)';
    if (org.id === 'org-qfactory-01') return "2 Documented Schools (Sree Gokulam, Bhavan's Chevayur)";
    if (org.id === 'org-ulspaceclub-01') return "Documented School Outreach & Space Club @ Campus";
    if (org.id === 'org-robuverse-01' || org.id === 'org-stemxpert-01' || org.id === 'org-youngminds-01') return 'School partnerships: Specific school names not publicly disclosed';
    if (org.id === 'org-evolve-01' || org.id === 'org-isq-01' || org.id === 'org-naturenurture-01') return 'School partnerships: Not independently verified';
    if (Array.isArray(org.institutionalPartnerships)) {
      const schools = org.institutionalPartnerships.filter(p => typeof p === 'string' && (p.includes('School') || p.includes('GHSS') || p.includes('GHS') || p.includes('GUPS')));
      if (schools.length > 0) return `${schools.length} Schools`;
    }
    return 'Direct Campus Operations';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* ========================================================================= */}
      {/* 1. CLEAN BREADCRUMB & BACK NAVIGATION                                    */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-purple-100/80">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <button
            onClick={onBackToCategories}
            className="text-purple-700 hover:text-purple-900 hover:underline font-semibold"
          >
            Competitor Categories
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold">{category.title}</span>
        </nav>

        <button
          onClick={onBackToCategories}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold text-purple-800 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Categories</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. MINIMAL HEADING & VIEW SWITCHER                                        */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {getPageHeading()}
        </h1>

        {/* View Switcher: Card View vs Table View */}
        <div className="flex items-center p-1 bg-purple-50/80 rounded-xl border border-purple-200/80 shrink-0 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('card')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'card'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-purple-900 hover:text-purple-700'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Card View</span>
          </button>

          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'table'
                ? 'bg-purple-700 text-white shadow-xs'
                : 'text-purple-900 hover:text-purple-700'
            }`}
          >
            <Table2 className="w-3.5 h-3.5" />
            <span>Table View</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. FUNCTIONAL SEARCH & RELEVANT CATEGORY FILTERS                          */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-purple-100 shadow-2xs space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${category.title.toLowerCase()} by organisation name, location, services, programmes...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-purple-50/30 border border-purple-200/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all text-slate-900 placeholder-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ×
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SKILL CATEGORY FILTER BAR (SCHOOLS SECTION ONLY)                          */}
        {/* ========================================================================= */}
        {categoryId === 'schools' && (
          <div className="pt-2 pb-1 border-t border-purple-100/70">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-700" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                  Skill Category:
                </span>
              </div>

              {/* 3 Interactive Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-purple-50/70 rounded-xl border border-purple-200/80">
                {/* 1. All Categories */}
                <button
                  onClick={() => setSchoolSkillCategory('All')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    schoolSkillCategory === 'All'
                      ? 'bg-purple-700 text-white shadow-xs'
                      : 'text-purple-900 hover:text-purple-700 hover:bg-white/60'
                  }`}
                >
                  <span>All Categories</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    schoolSkillCategory === 'All'
                      ? 'bg-purple-900 text-purple-100'
                      : 'bg-purple-200/80 text-purple-800'
                  }`}>
                    {categoryOrganisations.length}
                  </span>
                </button>

                {/* 2. Technical Skills */}
                <button
                  onClick={() => setSchoolSkillCategory('Technical Skills')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    schoolSkillCategory === 'Technical Skills'
                      ? 'bg-indigo-700 text-white shadow-xs'
                      : 'text-indigo-900 hover:text-indigo-700 hover:bg-white/60'
                  }`}
                  title="Artificial Intelligence, Coding, Robotics, Data Analytics, STEM Education"
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Technical Skills</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    schoolSkillCategory === 'Technical Skills'
                      ? 'bg-indigo-900 text-indigo-100'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {techCount}
                  </span>
                </button>

                {/* 3. Soft Skills & Personal Development */}
                <button
                  onClick={() => setSchoolSkillCategory('Soft Skills & Personal Development')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    schoolSkillCategory === 'Soft Skills & Personal Development'
                      ? 'bg-rose-700 text-white shadow-xs'
                      : 'text-rose-900 hover:text-rose-700 hover:bg-white/60'
                  }`}
                  title="Communication Skills, Leadership, Teamwork, Confidence Building, Emotional Intelligence, Life Skills"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Soft Skills & Personal Development</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    schoolSkillCategory === 'Soft Skills & Personal Development'
                      ? 'bg-rose-900 text-rose-100'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {softCount}
                  </span>
                </button>
              </div>
            </div>

            {/* Micro Helper Tagline showing the scope of the active category */}
            <div className="pt-2 flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
              <span className="font-semibold text-slate-700 font-mono">Scope:</span>
              {schoolSkillCategory === 'All' && (
                <span>Showing all {categoryOrganisations.length} verified and registered school competitors.</span>
              )}
              {schoolSkillCategory === 'Technical Skills' && (
                <span className="text-indigo-800 font-medium">Artificial Intelligence, Coding & Programming, Robotics, Data Analytics, Digital Marketing, Cloud Computing & STEM.</span>
              )}
              {schoolSkillCategory === 'Soft Skills & Personal Development' && (
                <span className="text-rose-800 font-medium">Communication Skills, Leadership, Teamwork, Confidence Building, Emotional Intelligence, Cognitive & Life Skills.</span>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Category Filters Row */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-purple-50">
          
          {/* Schools Filters */}
          {categoryId === 'schools' && (
            <>
              {/* District */}
              <div className="relative">
                <select
                  value={schoolDistrict}
                  onChange={(e) => setSchoolDistrict(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">District: All</option>
                  {schoolDistricts.filter(d => d !== 'All').map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Location (City) */}
              <div className="relative">
                <select
                  value={schoolLocation}
                  onChange={(e) => setSchoolLocation(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Location: All</option>
                  {schoolLocations.filter(l => l !== 'All').map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Programme Type */}
              <div className="relative">
                <select
                  value={schoolProgType}
                  onChange={(e) => setSchoolProgType(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Programme Type: All</option>
                  <option value="Robotics">Robotics & STEM</option>
                  <option value="TinkerChamps">Experiential Camps</option>
                  <option value="MakerChamps">Bootcamps (NITC)</option>
                  <option value="Curricular">Curricular Add-ons</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Services */}
              <div className="relative">
                <select
                  value={schoolService}
                  onChange={(e) => setSchoolService(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Services: All</option>
                  <option value="STEM">STEM Labs & Kits</option>
                  <option value="Coding">Coding & AI</option>
                  <option value="Tinkering">Tinkering Labs</option>
                  <option value="Workshops">Teacher Workshops</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Target Classes */}
              <div className="relative">
                <select
                  value={schoolTargetClasses}
                  onChange={(e) => setSchoolTargetClasses(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Target Classes: All</option>
                  <option value="Classes 6–12">Classes 6–12 (High School)</option>
                  <option value="Classes 4 to 10">Classes 4–10 (Primary/Sec)</option>
                  <option value="K-12">K-12 Comprehensive</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Delivery Mode */}
              <div className="relative">
                <select
                  value={schoolDeliveryMode}
                  onChange={(e) => setSchoolDeliveryMode(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Delivery Mode: All</option>
                  {schoolDeliveryModes.filter(m => m !== 'All').map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Verification Status */}
              <div className="relative">
                <select
                  value={schoolVerification}
                  onChange={(e) => setSchoolVerification(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Verification: All</option>
                  <option value="verified">Verified</option>
                  <option value="partially_verified">Partially Verified</option>
                  <option value="official_source">Official Source</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </>
          )}

          {/* Colleges Filters */}
          {categoryId === 'colleges' && (
            <>
              {/* Location */}
              <div className="relative">
                <select
                  value={collegeLocation}
                  onChange={(e) => setCollegeLocation(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Location: All</option>
                  {collegeLocations.filter(l => l !== 'All').map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Institution Type */}
              <div className="relative">
                <select
                  value={collegeInstType}
                  onChange={(e) => setCollegeInstType(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Institution Type: All</option>
                  {collegeInstTypes.filter(t => t !== 'All').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Programme Type */}
              <div className="relative">
                <select
                  value={collegeProgType}
                  onChange={(e) => setCollegeProgType(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Programme Type: All</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="MCA">MCA / Computer Science</option>
                  <option value="Full-Stack">Full-Stack / Python</option>
                  <option value="Finishing">Finishing School</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Services */}
              <div className="relative">
                <select
                  value={collegeService}
                  onChange={(e) => setCollegeService(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Services: All</option>
                  <option value="Degree">Degree Add-ons</option>
                  <option value="IEDC">IEDC Innovation Cell</option>
                  <option value="Placements">Campus Placements</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Verification Status */}
              <div className="relative">
                <select
                  value={collegeVerification}
                  onChange={(e) => setCollegeVerification(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Verification: All</option>
                  <option value="verified">Verified</option>
                  <option value="official_source">Official Source</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </>
          )}

          {/* Corporate Filters */}
          {categoryId === 'corporate' && (
            <>
              {/* Industry */}
              <div className="relative">
                <select
                  value={corporateIndustry}
                  onChange={(e) => setCorporateIndustry(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Industry: All</option>
                  {corporateIndustries.filter(i => i !== 'All').map(i => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Location */}
              <div className="relative">
                <select
                  value={corporateLocation}
                  onChange={(e) => setCorporateLocation(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Location: All</option>
                  {corporateLocations.filter(l => l !== 'All').map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Service Type */}
              <div className="relative">
                <select
                  value={corporateServiceType}
                  onChange={(e) => setCorporateServiceType(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Service Type: All</option>
                  <option value="Upskilling">Corporate Upskilling</option>
                  <option value="Strategy">Strategy & Leadership</option>
                  <option value="Marketing">Performance Marketing</option>
                  <option value="Development">IT Services</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Training Type */}
              <div className="relative">
                <select
                  value={corporateTrainingType}
                  onChange={(e) => setCorporateTrainingType(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Training Type: All</option>
                  <option value="Leadership">Executive Leadership</option>
                  <option value="Generative AI">GenAI for Teams & HR</option>
                  <option value="Outbound">Outbound Strategy</option>
                  <option value="Bootcamp">Corporate Bootcamps</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Verification Status */}
              <div className="relative">
                <select
                  value={corporateVerification}
                  onChange={(e) => setCorporateVerification(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Verification: All</option>
                  <option value="verified">Verified</option>
                  <option value="official_source">Official Source</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </>
          )}

          {/* Other Partnerships Filters */}
          {categoryId === 'other_partnerships' && (
            <>
              {/* Partnership Type */}
              <div className="relative">
                <select
                  value={otherPtnType}
                  onChange={(e) => setOtherPtnType(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Partnership Type: All</option>
                  {otherPtnTypes.filter(p => p !== 'All').map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Organisation Type */}
              <div className="relative">
                <select
                  value={otherOrgType}
                  onChange={(e) => setOtherOrgType(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Org Type: All</option>
                  {otherOrgTypes.filter(t => t !== 'All').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Location */}
              <div className="relative">
                <select
                  value={otherLocation}
                  onChange={(e) => setOtherLocation(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Location: All</option>
                  {otherLocations.filter(l => l !== 'All').map(l => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Related Programme */}
              <div className="relative">
                <select
                  value={otherRelatedProg}
                  onChange={(e) => setOtherRelatedProg(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Related Programme: All</option>
                  <option value="Walk2Lead">Walk2Lead CSR Consortium</option>
                  <option value="MakerChamps">MakerChamps Ecosystem</option>
                  <option value="ASAP">ASAP Kerala / Govt</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Verification Status */}
              <div className="relative">
                <select
                  value={otherVerification}
                  onChange={(e) => setOtherVerification(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-250 rounded-lg text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-purple-600 cursor-pointer"
                >
                  <option value="All">Verification: All</option>
                  <option value="verified">Verified</option>
                  <option value="official_source">Official Source</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </>
          )}

          {/* Reset Filters */}
          {isFilterActive && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DIRECTORY: ZERO RESULTS STATE                                          */}
      {/* ========================================================================= */}
      {filteredOrganisations.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center border border-purple-100 max-w-md mx-auto space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 mx-auto flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">No Competitors Found</h3>
          <p className="text-xs text-slate-500">
            No organisations matched your current search and filter criteria.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-3.5 py-1.5 text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. DIRECTORY: CARD VIEW OPTION (CLEAN BATTLECARD LIBRARY LAYOUT)           */}
      {/* ========================================================================= */}
      {viewMode === 'card' && filteredOrganisations.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredOrganisations.map(org => {
            const cleanIndustry = org.orgType || org.type || (Array.isArray(org.industry) ? org.industry[0] : org.industry) || org.category || 'Education & Technology';
            const cleanLocation = (() => {
              if (org.city && org.district && org.city.toLowerCase().includes(org.district.toLowerCase())) {
                return org.city.split('/')[0].trim();
              }
              if (org.city && org.district) {
                return `${org.city.split('/')[0].trim()}, ${org.district}`;
              }
              return org.city || org.district || 'Kerala';
            })();

            return (
              <div
                key={org.id}
                onClick={() => onSelectOrg(org)}
                className="group bg-white rounded-2xl border border-purple-100 hover:border-purple-300 shadow-2xs hover:shadow-lg transition-all duration-200 p-5 flex flex-col justify-between min-h-[195px] cursor-pointer"
              >
                <div>
                  {/* Top: Logo / Monogram + Prominent Competitor Name */}
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
                      <span className="truncate">{cleanIndustry}</span>
                    </div>

                    {/* Item 2: Location */}
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span className="truncate">{cleanLocation}</span>
                    </div>

                    {/* Item 3: Skill Category Badge(s) (For Schools Section) */}
                    {categoryId === 'schools' && (
                      <div className="flex flex-wrap gap-1 pt-1.5">
                        {getCompetitorSkillCategories(org).map((cat, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                              cat === 'Technical Skills'
                                ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {cat === 'Technical Skills' ? (
                              <Cpu className="w-3 h-3 text-indigo-600 shrink-0" />
                            ) : (
                              <HeartHandshake className="w-3 h-3 text-rose-600 shrink-0" />
                            )}
                            <span>{cat}</span>
                          </span>
                        ))}
                      </div>
                    )}
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
      )}

      {/* ========================================================================= */}
      {/* 6. DIRECTORY: TABLE VIEW OPTION (SPREADSHEET-STYLE COMPARISON)            */}
      {/* ========================================================================= */}
      {viewMode === 'table' && filteredOrganisations.length > 0 && (
        <div className="bg-white rounded-2xl border border-purple-100 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto max-w-full">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-purple-50/70 border-b border-purple-100 text-[11px] font-bold text-slate-700 select-none">
                  
                  {/* 1. Organisation Name (Sticky Column) */}
                  <th
                    onClick={() => handleSort('name')}
                    className="py-3 px-4 sticky left-0 bg-purple-50/95 backdrop-blur-xs z-10 cursor-pointer hover:text-purple-900"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Organisation Name</span>
                      {sortField === 'name' ? (
                        sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-purple-600" /> : <ArrowDown className="w-3 h-3 text-purple-600" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 text-slate-400" />
                      )}
                    </div>
                  </th>

                  {/* 2. Location */}
                  <th
                    onClick={() => handleSort('location')}
                    className="py-3 px-3 cursor-pointer hover:text-purple-900 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Location</span>
                      {sortField === 'location' && (
                        sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-purple-600" /> : <ArrowDown className="w-3 h-3 text-purple-600" />
                      )}
                    </div>
                  </th>

                  {/* 3. District */}
                  <th
                    onClick={() => handleSort('district')}
                    className="py-3 px-3 cursor-pointer hover:text-purple-900 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-1.5">
                      <span>District</span>
                      {sortField === 'district' && (
                        sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-purple-600" /> : <ArrowDown className="w-3 h-3 text-purple-600" />
                      )}
                    </div>
                  </th>

                  {/* Category-Specific Table Columns */}
                  {categoryId === 'schools' && (
                    <>
                      <th className="py-3 px-3 min-w-[170px]">Skill Category</th>
                      <th className="py-3 px-3 min-w-[200px]">Main Services</th>
                      <th className="py-3 px-3 min-w-[180px]">Programmes</th>
                      <th className="py-3 px-3 min-w-[150px]">Target Classes</th>
                      <th className="py-3 px-3 min-w-[140px]">Delivery Mode</th>
                      <th className="py-3 px-3 min-w-[180px]">School Partnerships</th>
                      <th className="py-3 px-3 min-w-[180px]">Partner Organisations</th>
                    </>
                  )}

                  {categoryId === 'colleges' && (
                    <>
                      <th className="py-3 px-3 min-w-[160px]">Institution Type</th>
                      <th className="py-3 px-3 min-w-[200px]">Main Services</th>
                      <th className="py-3 px-3 min-w-[180px]">Programmes</th>
                      <th className="py-3 px-3 min-w-[180px]">Academic MoUs / Partnerships</th>
                    </>
                  )}

                  {categoryId === 'corporate' && (
                    <>
                      <th className="py-3 px-3 min-w-[160px]">Industry</th>
                      <th className="py-3 px-3 min-w-[200px]">Services</th>
                      <th className="py-3 px-3 min-w-[180px]">Corporate Training Offerings</th>
                      <th className="py-3 px-3 min-w-[160px]">Target Clients</th>
                    </>
                  )}

                  {categoryId === 'other_partnerships' && (
                    <>
                      <th className="py-3 px-3 min-w-[160px]">Organisation Type</th>
                      <th className="py-3 px-3 min-w-[160px]">Partnership Role</th>
                      <th className="py-3 px-3 min-w-[180px]">Related Programmes</th>
                      <th className="py-3 px-3 min-w-[180px]">Connected Partners</th>
                    </>
                  )}

                  {/* Status Column */}
                  <th
                    onClick={() => handleSort('status')}
                    className="py-3 px-3 cursor-pointer hover:text-purple-900 whitespace-nowrap text-center"
                  >
                    <div className="flex items-center justify-center gap-1.5">
                      <span>Verification</span>
                      {sortField === 'status' && (
                        sortDirection === 'asc' ? <ArrowUp className="w-3 h-3 text-purple-600" /> : <ArrowDown className="w-3 h-3 text-purple-600" />
                      )}
                    </div>
                  </th>

                  {/* Action Column */}
                  <th className="py-3 px-4 text-right whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-purple-50">
                {filteredOrganisations.map((org, rowIndex) => {
                  const isDeLead = org.id === 'org-delead-01';
                  const programmes = org.relevantProgrammes || [];

                  return (
                    <tr
                      key={org.id}
                      onClick={() => onSelectOrg(org)}
                      className={`hover:bg-purple-50/50 transition-colors cursor-pointer group ${
                        isDeLead ? 'bg-purple-50/20' : rowIndex % 2 === 1 ? 'bg-slate-50/30' : 'bg-white'
                      }`}
                    >
                      {/* 1. Name & Monogram (Sticky Left Column) */}
                      <td className="py-3 px-4 sticky left-0 bg-white group-hover:bg-purple-50/90 transition-colors z-10 font-bold text-slate-900 whitespace-nowrap border-r border-purple-50">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-800 border border-purple-200 flex items-center justify-center font-black text-[10px] shrink-0">
                            {org.logoText || org.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="group-hover:text-purple-700 transition-colors">
                            {org.name}
                          </span>
                        </div>
                      </td>

                      {/* 2. Location */}
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap font-medium">
                        {org.city || '—'}
                      </td>

                      {/* 3. District */}
                      <td className="py-3 px-3 text-slate-700 whitespace-nowrap font-medium">
                        {org.district || '—'}
                      </td>

                      {/* Category Specific Rows */}
                      {categoryId === 'schools' && (
                        <>
                          <td className="py-3 px-3">
                            <div className="flex flex-wrap gap-1">
                              {getCompetitorSkillCategories(org).map((cat, idx) => (
                                <span
                                  key={idx}
                                  className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold border whitespace-nowrap ${
                                    cat === 'Technical Skills'
                                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                      : 'bg-rose-50 text-rose-700 border-rose-200'
                                  }`}
                                >
                                  {cat === 'Technical Skills' ? (
                                    <Cpu className="w-2.5 h-2.5 text-indigo-600 shrink-0" />
                                  ) : (
                                    <HeartHandshake className="w-2.5 h-2.5 text-rose-600 shrink-0" />
                                  )}
                                  <span>{cat}</span>
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-600 max-w-[260px]">
                            <span className="line-clamp-2">{getServicesSnippet(org)}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-800">
                            <div className="flex flex-wrap gap-1">
                              {programmes.map((p, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-900 border border-purple-200/60 font-semibold text-[11px] whitespace-nowrap">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-600 max-w-[180px]">
                            <span className="line-clamp-2">{org.targetClasses || org.targetAudience || 'Classes 6–12'}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-600 whitespace-nowrap">
                            {org.deliveryMethod || org.deliveryMode || 'Offline (Lab)'}
                          </td>
                          <td className="py-3 px-3 text-slate-800 font-medium">
                            {getSchoolPartnershipsSnippet(org)}
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {getPartnerOrgsSnippet(org)}
                          </td>
                        </>
                      )}

                      {categoryId === 'colleges' && (
                        <>
                          <td className="py-3 px-3 text-slate-700 font-medium">
                            {org.type || org.orgType || 'College'}
                          </td>
                          <td className="py-3 px-3 text-slate-600 max-w-[260px]">
                            <span className="line-clamp-2">{getServicesSnippet(org)}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-800">
                            <div className="flex flex-wrap gap-1">
                              {programmes.map((p, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 border border-blue-200/60 font-semibold text-[11px] whitespace-nowrap">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-700">
                            {(org.institutionalPartnerships || []).join(', ') || 'Independent Degree Operations'}
                          </td>
                        </>
                      )}

                      {categoryId === 'corporate' && (
                        <>
                          <td className="py-3 px-3 text-slate-700 font-medium">
                            {Array.isArray(org.industry) ? org.industry.slice(0, 2).join(', ') : (org.type || 'Corporate')}
                          </td>
                          <td className="py-3 px-3 text-slate-600 max-w-[260px]">
                            <span className="line-clamp-2">{getServicesSnippet(org)}</span>
                          </td>
                          <td className="py-3 px-3 text-slate-800">
                            <div className="flex flex-wrap gap-1">
                              {programmes.map((p, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded bg-fuchsia-50 text-fuchsia-900 border border-fuchsia-200/60 font-semibold text-[11px] whitespace-nowrap">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {org.id === 'org-delead-01' ? 'India & UAE Enterprises' : (org.targetAudience || 'Corporate Teams')}
                          </td>
                        </>
                      )}

                      {categoryId === 'other_partnerships' && (
                        <>
                          <td className="py-3 px-3 text-slate-700 font-medium">
                            {org.type || org.orgType || 'Training Institute'}
                          </td>
                          <td className="py-3 px-3 text-slate-800 font-semibold">
                            {org.partnershipType || org.categoryRelationship?.relationshipType || 'Ecosystem Partner'}
                          </td>
                          <td className="py-3 px-3 text-slate-800">
                            <div className="flex flex-wrap gap-1">
                              {programmes.map((p, idx) => (
                                <span key={idx} className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200/60 font-semibold text-[11px] whitespace-nowrap">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-slate-600">
                            {getPartnerOrgsSnippet(org)}
                          </td>
                        </>
                      )}

                      {/* Status */}
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{org.verificationStatus === 'verified' ? 'Verified' : 'Official'}</span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectOrg(org);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold text-purple-700 hover:text-white hover:bg-purple-700 border border-purple-200 transition-all cursor-pointer"
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
  );
}
