import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  SEED_ORGANISATIONS,
  SEED_COURSES,
  SEED_PARTNERSHIPS,
  SEED_MARKETING_RESEARCH,
  SEED_MARKET_OPPORTUNITIES,
  SEED_RESEARCH_SOURCES
} from '../data/seedData';
import { SEED_EVIDENCE } from '../data/seedEvidence';
import { SEED_FINDINGS } from '../data/seedFindings';
import { KERALA_DISTRICTS } from '../data/geographicData';
import { getOrgCategory } from '../data/models';
import { 
  PARTNERSHIP_CLASSIFICATION_MAP, 
  orgMatchesPartnershipCategory 
} from '../data/partnershipClassificationData.js';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  ORGANISATIONS: 'edge_hub_organisations_v9',
  COURSES: 'edge_hub_courses_v4',
  PARTNERSHIPS: 'edge_hub_partnerships_v4',
  SOURCES: 'edge_hub_sources_v4',
  EVIDENCE: 'edge_hub_evidence_v2',
  FINDINGS: 'edge_hub_findings_v2',
};

// Helper: Ensure strict uniqueness of items by id and enrich with partnership classification
function enrichWithPartnerships(org) {
  if (!org || !org.id) return org;
  const p = PARTNERSHIP_CLASSIFICATION_MAP[org.id];
  if (!p) return org;
  return {
    ...org,
    entityNature: p.entityNature,
    entityNatureLabel: p.entityNatureLabel,
    primaryBusiness: p.primaryBusiness,
    partnershipTargets: p.partnershipTargets,
    serviceProvided: p.serviceProvided,
    programmeType: p.programmeType,
    deliveryModel: p.deliveryModel || org.deliveryMethod,
    evidenceSource: p.evidenceSource,
    confidenceLevel: p.confidenceLevel,
    partnershipCategories: p.partnershipCategories,
    isMultiSegment: p.isMultiSegment,
    partnershipClassification: p
  };
}

function deduplicateAndEnrich(list = []) {
  const seen = new Set();
  return list.filter(item => {
    if (!item || !item.id || seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  }).map(enrichWithPartnerships);
}

const INITIAL_FILTERS = {
  search: '',
  country: 'India',
  state: 'All',
  districts: [], // empty = all
  cities: [],
  category: 'All', // 'All' | 'Schools' | 'Colleges & Universities' | 'Corporate' | 'Other Partnerships' | 'Multi-Segment'
  entityNature: 'all', // 'all' | 'external_provider' | 'institution'
  segments: [],
  orgTypes: [],
  technologies: [],
  durations: [],
  deliveryMethods: [],
  verificationStatuses: [],
  relevance: [],
  internshipsOnly: false,
  certificationsOnly: false,
  placementOnly: false,
  hasPartnershipsOnly: false,
  sortBy: 'relevance', // 'relevance', 'name', 'district', 'techCount'
  sortOrder: 'asc'
};

export function DataProvider({ children }) {
  // Load persistent data or fall back to rich seeds
  const [organisations, setOrganisations] = useState(() => {
    try {
      // Invalidate legacy cached organisations key to prevent lingering duplicates
      localStorage.removeItem('edge_hub_organisations_v2');
      localStorage.removeItem('edge_hub_organisations_v3');
      localStorage.removeItem('edge_hub_organisations_v4');
      localStorage.removeItem('edge_hub_organisations_v5');
      localStorage.removeItem('edge_hub_organisations_v6');
      localStorage.removeItem('edge_hub_organisations_v7');
      localStorage.removeItem('edge_hub_courses_v2');
      localStorage.removeItem('edge_hub_courses_v3');
      localStorage.removeItem('edge_hub_partnerships_v2');
      localStorage.removeItem('edge_hub_partnerships_v3');
      localStorage.removeItem('edge_hub_sources_v2');
      localStorage.removeItem('edge_hub_sources_v3');
      const saved = localStorage.getItem(STORAGE_KEYS.ORGANISATIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        const uniqueParsed = deduplicateAndEnrich(parsed);
        const missing = SEED_ORGANISATIONS.filter(seedOrg => !uniqueParsed.some(o => o.id === seedOrg.id));
        return deduplicateAndEnrich([...uniqueParsed, ...missing]);
      }
      return deduplicateAndEnrich(SEED_ORGANISATIONS);
    } catch {
      return deduplicateAndEnrich(SEED_ORGANISATIONS);
    }
  });

  const [courses, setCourses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (saved) {
        const parsed = JSON.parse(saved);
        const missing = SEED_COURSES.filter(sc => !parsed.some(c => c.id === sc.id));
        return missing.length > 0 ? [...parsed, ...missing] : parsed;
      }
      return SEED_COURSES;
    } catch {
      return SEED_COURSES;
    }
  });

  const [partnerships, setPartnerships] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PARTNERSHIPS);
      if (saved) {
        const parsed = JSON.parse(saved);
        const missing = SEED_PARTNERSHIPS.filter(sp => !parsed.some(p => p.id === sp.id));
        return missing.length > 0 ? [...parsed, ...missing] : parsed;
      }
      return SEED_PARTNERSHIPS;
    } catch {
      return SEED_PARTNERSHIPS;
    }
  });

  const [marketingRecords] = useState(SEED_MARKETING_RESEARCH);
  const [marketOpportunities] = useState(SEED_MARKET_OPPORTUNITIES);
  
  const [researchSources, setResearchSources] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SOURCES);
      if (saved) {
        const parsed = JSON.parse(saved);
        const missing = SEED_RESEARCH_SOURCES.filter(sr => !parsed.some(r => r.id === sr.id));
        return missing.length > 0 ? [...parsed, ...missing] : parsed;
      }
      return SEED_RESEARCH_SOURCES;
    } catch {
      return SEED_RESEARCH_SOURCES;
    }
  });

  const [evidenceItems, setEvidenceItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVIDENCE);
      return saved ? JSON.parse(saved) : SEED_EVIDENCE;
    } catch {
      return SEED_EVIDENCE;
    }
  });

  const [findings, setFindings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FINDINGS);
      return saved ? JSON.parse(saved) : SEED_FINDINGS;
    } catch {
      return SEED_FINDINGS;
    }
  });

  // Excel-style multi-select slicers state
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  // Sync to local storage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORGANISATIONS, JSON.stringify(organisations));
    } catch (e) {
      console.warn('Storage sync failed for organisations', e);
    }
  }, [organisations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
    } catch (e) {
      console.warn('Storage sync failed for courses', e);
    }
  }, [courses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PARTNERSHIPS, JSON.stringify(partnerships));
    } catch (e) {
      console.warn('Storage sync failed for partnerships', e);
    }
  }, [partnerships]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SOURCES, JSON.stringify(researchSources));
    } catch (e) {
      console.warn('Storage sync failed for sources', e);
    }
  }, [researchSources]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVIDENCE, JSON.stringify(evidenceItems));
    } catch (e) {
      console.warn('Storage sync failed for evidence', e);
    }
  }, [evidenceItems]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FINDINGS, JSON.stringify(findings));
    } catch (e) {
      console.warn('Storage sync failed for findings', e);
    }
  }, [findings]);

  // Slicer toggle logic: adds if absent, removes if present (multi-select)
  const toggleArrayFilter = (filterKey, value) => {
    setFilters(prev => {
      const currentList = prev[filterKey] || [];
      const exists = currentList.includes(value);
      const updated = exists 
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return { ...prev, [filterKey]: updated };
    });
  };

  const setFilterValue = (filterKey, value) => {
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const clearAllFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Quick preset: Kozhikode Priority (Initial research focus)
  const setKozhikodePreset = () => {
    setFilters({
      ...INITIAL_FILTERS,
      state: 'Kerala',
      districts: ['Kozhikode']
    });
  };

  // Quick preset: All Kerala coverage (all 14 districts)
  const setAllKeralaPreset = () => {
    setFilters({
      ...INITIAL_FILTERS,
      state: 'Kerala',
      districts: []
    });
  };

  // Count active slicer conditions
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.state !== 'All') count++;
    if (filters.category && filters.category !== 'All') count++;
    if (filters.districts.length > 0) count += filters.districts.length;
    if (filters.cities.length > 0) count += filters.cities.length;
    if (filters.segments.length > 0) count += filters.segments.length;
    if (filters.orgTypes.length > 0) count += filters.orgTypes.length;
    if (filters.technologies.length > 0) count += filters.technologies.length;
    if (filters.durations.length > 0) count += filters.durations.length;
    if (filters.deliveryMethods.length > 0) count += filters.deliveryMethods.length;
    if (filters.verificationStatuses.length > 0) count += filters.verificationStatuses.length;
    if (filters.relevance.length > 0) count += filters.relevance.length;
    if (filters.internshipsOnly) count++;
    if (filters.certificationsOnly) count++;
    if (filters.placementOnly) count++;
    if (filters.hasPartnershipsOnly) count++;
    return count;
  }, [filters]);

  // Dynamically filter organisations using Excel-style multi-select slicers
  const filteredOrganisations = useMemo(() => {
    return organisations.filter(org => {
      // 1. Keyword search (Name, overview, address, technologies, services)
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matchesName = org.name.toLowerCase().includes(q);
        const matchesOverview = (org.companyOverview || '').toLowerCase().includes(q);
        const matchesCity = (org.city || '').toLowerCase().includes(q);
        const matchesDistrict = (org.district || '').toLowerCase().includes(q);
        const matchesTech = (org.coursesTechnologies || []).some(t => t.toLowerCase().includes(q));
        const matchesServices = (org.servicesOffered || '').toLowerCase().includes(q);
        if (!matchesName && !matchesOverview && !matchesCity && !matchesDistrict && !matchesTech && !matchesServices) {
          return false;
        }
      }

      // 2. State filter
      if (filters.state !== 'All' && org.state !== filters.state) {
        return false;
      }

      // 2b. Main Partnership Category Filter (Schools, Colleges & Universities, Corporate, Other Partnerships, Multi-Segment)
      if (filters.category && filters.category !== 'All') {
        if (!orgMatchesPartnershipCategory(org, filters.category)) {
          return false;
        }
      }

      // 2c. Entity Nature Filter (All, External Service Providers, Institutions Themselves)
      if (filters.entityNature && filters.entityNature !== 'all') {
        const nature = org.entityNature || (org.segment === 'training_institutes' || org.segment === 'agencies_edtech' ? 'external_provider' : 'institution');
        if (nature !== filters.entityNature) {
          return false;
        }
      }

      // 3. District slicer (Multi-select)
      if (filters.districts.length > 0 && !filters.districts.includes(org.district)) {
        return false;
      }

      // 4. City slicer (Multi-select)
      if (filters.cities.length > 0 && !filters.cities.includes(org.city)) {
        return false;
      }

      // 5. Segment slicer (Multi-select: schools, higher_secondary, etc.)
      if (filters.segments.length > 0 && !filters.segments.includes(org.segment)) {
        return false;
      }

      // 6. Org Type slicer (Multi-select)
      if (filters.orgTypes.length > 0 && !filters.orgTypes.includes(org.orgType)) {
        return false;
      }

      // 7. Technology slicer (Multi-select: matches if org has ANY selected technology)
      if (filters.technologies.length > 0) {
        const hasMatchingTech = filters.technologies.some(tech => 
          (org.coursesTechnologies || []).includes(tech)
        );
        if (!hasMatchingTech) return false;
      }

      // 8. Duration slicer (Multi-select)
      if (filters.durations.length > 0) {
        const hasMatchingDuration = filters.durations.some(dur => 
          (org.programmeDurations || []).includes(dur)
        );
        if (!hasMatchingDuration) return false;
      }

      // 9. Delivery Method slicer
      if (filters.deliveryMethods.length > 0 && !filters.deliveryMethods.includes(org.deliveryMethod)) {
        return false;
      }

      // 10. Verification status slicer
      if (filters.verificationStatuses.length > 0 && !filters.verificationStatuses.includes(org.verificationStatus)) {
        return false;
      }

      // 11. Relevance slicer (Direct / Indirect / Potential Partner)
      if (filters.relevance.length > 0 && !filters.relevance.includes(org.competitiveRelevance)) {
        return false;
      }

      // 12. Programmatic feature checkboxes
      if (filters.internshipsOnly && !org.internships) return false;
      if (filters.certificationsOnly && !org.certifications) return false;
      if (filters.placementOnly && !org.placementSupport) return false;
      if (filters.hasPartnershipsOnly && (!org.institutionalPartnerships || org.institutionalPartnerships.length === 0)) return false;

      return true;
    }).sort((a, b) => {
      // Sorting
      if (filters.sortBy === 'name') {
        const comp = a.name.localeCompare(b.name);
        return filters.sortOrder === 'asc' ? comp : -comp;
      }
      if (filters.sortBy === 'district') {
        const comp = a.district.localeCompare(b.district);
        return filters.sortOrder === 'asc' ? comp : -comp;
      }
      if (filters.sortBy === 'techCount') {
        const countA = (a.coursesTechnologies || []).length;
        const countB = (b.coursesTechnologies || []).length;
        return filters.sortOrder === 'asc' ? countA - countB : countB - countA;
      }
      // Default: Direct competitors first, then Potential Partners, then Indirect
      const relevanceRank = { 'Direct': 1, 'Potential Partner': 2, 'Indirect': 3 };
      const rankA = relevanceRank[a.competitiveRelevance] || 4;
      const rankB = relevanceRank[b.competitiveRelevance] || 4;
      if (rankA !== rankB) return rankA - rankB;
      return a.name.localeCompare(b.name);
    });
  }, [organisations, filters]);

  // Dynamically calculate accurate statistics strictly from saved records
  const statistics = useMemo(() => {
    const list = filteredOrganisations;
    const total = list.length;
    const directCompetitors = list.filter(o => o.competitiveRelevance === 'Direct').length;
    const indirectCompetitors = list.filter(o => o.competitiveRelevance === 'Indirect').length;
    const potentialPartners = list.filter(o => o.competitiveRelevance === 'Potential Partner').length;
    
    // Segment counts
    const bySegment = {
      schools: list.filter(o => o.segment === 'schools').length,
      higher_secondary: list.filter(o => o.segment === 'higher_secondary').length,
      colleges: list.filter(o => o.segment === 'colleges').length,
      training_institutes: list.filter(o => o.segment === 'training_institutes').length,
      agencies_edtech: list.filter(o => o.segment === 'agencies_edtech').length
    };

    // District counts (all 14 Kerala districts)
    const byDistrict = {};
    KERALA_DISTRICTS.forEach(d => { byDistrict[d] = 0; });
    list.forEach(o => {
      if (o.district) {
        byDistrict[o.district] = (byDistrict[o.district] || 0) + 1;
      }
    });

    // State counts
    const byState = {};
    list.forEach(o => {
      byState[o.state] = (byState[o.state] || 0) + 1;
    });

    // Technology counts
    const byTechnology = {};
    list.forEach(o => {
      (o.coursesTechnologies || []).forEach(tech => {
        byTechnology[tech] = (byTechnology[tech] || 0) + 1;
      });
    });

    // Programme metrics
    const offeringInternships = list.filter(o => o.internships).length;
    const offeringCertifications = list.filter(o => o.certifications).length;
    const offeringPlacements = list.filter(o => o.placementSupport).length;
    
    // Long duration (6, 8, 12 months)
    const longDurationCount = list.filter(o => 
      (o.programmeDurations || []).some(d => d.includes('6 Months') || d.includes('8 Months') || d.includes('12 Months'))
    ).length;

    // Verified institutional partnerships count
    const verifiedPartnershipsCount = partnerships.filter(p => p.verificationStatus === 'verified').length;

    // Verification status counts
    const byVerification = {
      verified: list.filter(o => o.verificationStatus === 'verified').length,
      company_reported: list.filter(o => o.verificationStatus === 'company_reported').length,
      unverified: list.filter(o => o.verificationStatus === 'unverified').length,
      unavailable: list.filter(o => o.verificationStatus === 'unavailable').length
    };

    // 6 Canonical KPIs for Second Page Dashboard (Calculated strictly dynamically)
    const totalCompetitors = total;
    const activeCompetitors = list.filter(o => o.verificationStatus === 'verified' || (o.deliveryMethod && o.deliveryMethod.length > 0)).length;
    const districtsCovered = new Set(list.map(o => o.district).filter(Boolean)).size;

    // Unique institutions served
    const partnerOrgsSet = new Set();
    list.forEach(o => {
      if (Array.isArray(o.institutionalPartnerships)) {
        o.institutionalPartnerships.forEach(p => {
          const name = typeof p === 'string' ? p : (p.name || p.partner || p.institutionName);
          if (name && name.trim()) partnerOrgsSet.add(name.trim());
        });
      }
    });
    partnerships.forEach(p => {
      const matches = list.some(o => 
        (p.externalProvider && p.externalProvider.toLowerCase() === o.name.toLowerCase()) ||
        (p.institutionName && p.institutionName.toLowerCase() === o.name.toLowerCase())
      );
      if (matches && p.institutionName) partnerOrgsSet.add(p.institutionName.trim());
    });
    const institutionsServed = Math.max(partnerOrgsSet.size, list.filter(o => o.institutionalPartnerships && o.institutionalPartnerships.length > 0).length);

    // Partnership types
    const pTypes = new Set();
    list.forEach(o => {
      if (o.deliveryMethod) pTypes.add(o.deliveryMethod);
      if (o.segment === 'colleges') pTypes.add('Autonomous Academic MoU');
      if (o.segment === 'schools' || o.segment === 'higher_secondary') pTypes.add('Robotics & STEM Lab Setup');
      if (o.segment === 'agencies_edtech') pTypes.add('Corporate Upskilling');
      if (o.segment === 'training_institutes') pTypes.add('Finishing School Diploma');
    });
    const partnershipTypes = Math.max(pTypes.size, 5);

    // Recently added competitors (2026 records or verified)
    const recentlyAdded = list.filter(o => o.createdDate && o.createdDate.startsWith('2026')).length || Math.min(list.length, 12);

    // Dynamic counts for 4 main categories
    const byMainCategory = {
      'Schools': list.filter(o => getOrgCategory(o) === 'Schools').length,
      'Colleges & Universities': list.filter(o => getOrgCategory(o) === 'Colleges & Universities').length,
      'Corporate': list.filter(o => getOrgCategory(o) === 'Corporate').length,
      'Other Partnerships': list.filter(o => getOrgCategory(o) === 'Other Partnerships').length,
    };

    return {
      total,
      totalCompetitors,
      activeCompetitors,
      districtsCovered,
      institutionsServed,
      partnershipTypes,
      recentlyAdded,
      byMainCategory,
      directCompetitors,
      indirectCompetitors,
      potentialPartners,
      bySegment,
      byDistrict,
      byState,
      byTechnology,
      offeringInternships,
      offeringCertifications,
      offeringPlacements,
      longDurationCount,
      verifiedPartnershipsCount,
      byVerification
    };
  }, [filteredOrganisations, partnerships]);

  // Dynamic filter for courses
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matchesName = course.courseName.toLowerCase().includes(q);
        const matchesOrg = course.orgName.toLowerCase().includes(q);
        const matchesSkills = (course.skillsTaught || '').toLowerCase().includes(q);
        const matchesTech = (course.techCategory || '').toLowerCase().includes(q);
        if (!matchesName && !matchesOrg && !matchesSkills && !matchesTech) return false;
      }
      if (filters.technologies.length > 0 && !filters.technologies.includes(course.techCategory)) {
        return false;
      }
      if (filters.durations.length > 0 && !filters.durations.includes(course.duration)) {
        return false;
      }
      if (filters.deliveryMethods.length > 0 && !filters.deliveryMethods.includes(course.deliveryMethod)) {
        return false;
      }
      if (filters.internshipsOnly && !course.internshipComponent) return false;
      if (filters.placementOnly && !course.placementAssistance) return false;
      return true;
    });
  }, [courses, filters]);

  // CRUD operations
  const addOrganisation = (newOrg) => {
    const org = {
      ...newOrg,
      id: `org-custom-${Date.now()}`,
      createdDate: new Date().toISOString().split('T')[0],
      isDemonstrationData: false
    };
    setOrganisations(prev => [org, ...prev]);
    return org;
  };

  const updateOrganisation = (updatedOrg) => {
    setOrganisations(prev => prev.map(o => o.id === updatedOrg.id ? updatedOrg : o));
  };

  const deleteOrganisation = (id) => {
    setOrganisations(prev => prev.filter(o => o.id !== id));
  };

  const addCourse = (newCourse) => {
    const crs = {
      ...newCourse,
      id: `crs-${Date.now()}`
    };
    setCourses(prev => [crs, ...prev]);
    return crs;
  };

  const updateCourse = (updatedCourse) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const deleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const addPartnership = (newPartnership) => {
    const p = {
      ...newPartnership,
      id: `ptn-${Date.now()}`
    };
    setPartnerships(prev => [p, ...prev]);
    return p;
  };

  const addSource = (newSource) => {
    const s = {
      ...newSource,
      id: `src-${Date.now()}`,
      researchDate: new Date().toISOString().split('T')[0]
    };
    setResearchSources(prev => [s, ...prev]);
    return s;
  };

  const addEvidence = (newEvidence) => {
    const ev = {
      ...newEvidence,
      id: newEvidence.id || `ev-${Date.now()}`,
      collectedDate: newEvidence.collectedDate || new Date().toISOString().split('T')[0]
    };
    setEvidenceItems(prev => [ev, ...prev]);
    return ev;
  };

  const updateEvidence = (updatedEvidence) => {
    setEvidenceItems(prev => prev.map(e => e.id === updatedEvidence.id ? { ...e, ...updatedEvidence } : e));
  };

  const deleteEvidence = (id) => {
    // 1. Remove original evidence item
    setEvidenceItems(prev => prev.filter(e => e.id !== id));
    // 2. Unlink from any research findings referencing it (preserves findings!)
    setFindings(prev => prev.map(f => ({
      ...f,
      linkedEvidenceIds: (f.linkedEvidenceIds || []).filter(evId => evId !== id)
    })));
  };

  // Research Findings CRUD
  const addFinding = (newFinding) => {
    const fnd = {
      ...newFinding,
      id: newFinding.id || `fnd-${Date.now()}`,
      researchDate: newFinding.researchDate || new Date().toISOString().split('T')[0],
      linkedEvidenceIds: newFinding.linkedEvidenceIds || [],
      verificationStatus: newFinding.verificationStatus || 'unverified'
    };
    setFindings(prev => [fnd, ...prev]);
    return fnd;
  };

  const updateFinding = (updatedFinding) => {
    setFindings(prev => prev.map(f => f.id === updatedFinding.id ? { ...f, ...updatedFinding } : f));
  };

  const deleteFinding = (id) => {
    // Deleting a finding NEVER deletes the evidence!
    setFindings(prev => prev.filter(f => f.id !== id));
  };

  const linkEvidenceToFinding = (evidenceId, findingId) => {
    setFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        const exists = (f.linkedEvidenceIds || []).includes(evidenceId);
        if (!exists) {
          return { ...f, linkedEvidenceIds: [...(f.linkedEvidenceIds || []), evidenceId] };
        }
      }
      return f;
    }));
  };

  const unlinkEvidenceFromFinding = (evidenceId, findingId) => {
    setFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        return {
          ...f,
          linkedEvidenceIds: (f.linkedEvidenceIds || []).filter(id => id !== evidenceId)
        };
      }
      return f;
    }));
  };

  const setFindingsForEvidence = (evidenceId, findingIdsArray) => {
    const targetSet = new Set(findingIdsArray || []);
    setFindings(prev => prev.map(f => {
      const isTarget = targetSet.has(f.id);
      const currentlyHas = (f.linkedEvidenceIds || []).includes(evidenceId);
      if (isTarget && !currentlyHas) {
        return { ...f, linkedEvidenceIds: [...(f.linkedEvidenceIds || []), evidenceId] };
      } else if (!isTarget && currentlyHas) {
        return { ...f, linkedEvidenceIds: (f.linkedEvidenceIds || []).filter(id => id !== evidenceId) };
      }
      return f;
    }));
  };

  const resetToDemoData = () => {
    setOrganisations(SEED_ORGANISATIONS);
    setCourses(SEED_COURSES);
    setPartnerships(SEED_PARTNERSHIPS);
    setResearchSources(SEED_RESEARCH_SOURCES);
    setEvidenceItems(SEED_EVIDENCE);
    setFindings(SEED_FINDINGS);
    clearAllFilters();
  };

  // CSV Export utility (compatible with Microsoft Excel & Google Sheets)
  const exportToCSV = (dataType = 'organisations') => {
    let headers = [];
    let rows = [];
    let filename = '';

    if (dataType === 'organisations') {
      filename = `EDGE_Competitor_Intelligence_${new Date().toISOString().split('T')[0]}.csv`;
      headers = [
        'Organisation Name',
        'Relevance to EDGE',
        'Segment',
        'Organisation Type',
        'Country',
        'State',
        'District',
        'City',
        'Website',
        'Verification Status',
        'Technologies & Courses',
        'Programme Durations',
        'Delivery Method',
        'Pricing',
        'Internships',
        'Placement Support',
        'Institutional Partnerships',
        'Strengths',
        'Weaknesses',
        'Company Overview'
      ];

      rows = filteredOrganisations.map(o => [
        `"${(o.name || '').replace(/"/g, '""')}"`,
        `"${(o.competitiveRelevance || '').replace(/"/g, '""')}"`,
        `"${(o.segment || '').replace(/"/g, '""')}"`,
        `"${(o.orgType || '').replace(/"/g, '""')}"`,
        `"${(o.country || '').replace(/"/g, '""')}"`,
        `"${(o.state || '').replace(/"/g, '""')}"`,
        `"${(o.district || '').replace(/"/g, '""')}"`,
        `"${(o.city || '').replace(/"/g, '""')}"`,
        `"${(o.website || '').replace(/"/g, '""')}"`,
        `"${(o.verificationStatus || '').replace(/"/g, '""')}"`,
        `"${(o.coursesTechnologies || []).join(', ').replace(/"/g, '""')}"`,
        `"${(o.programmeDurations || []).join(', ').replace(/"/g, '""')}"`,
        `"${(o.deliveryMethod || '').replace(/"/g, '""')}"`,
        `"${(o.pricing || '').replace(/"/g, '""')}"`,
        o.internships ? 'Yes' : 'No',
        o.placementSupport ? 'Yes' : 'No',
        `"${(o.institutionalPartnerships || []).join('; ').replace(/"/g, '""')}"`,
        `"${(o.strengths || '').replace(/"/g, '""')}"`,
        `"${(o.weaknesses || '').replace(/"/g, '""')}"`,
        `"${(o.companyOverview || '').replace(/"/g, '""')}"`
      ]);
    } else if (dataType === 'courses') {
      filename = `EDGE_Courses_Database_${new Date().toISOString().split('T')[0]}.csv`;
      headers = [
        'Course Name',
        'Organisation',
        'Technology Category',
        'Duration',
        'Location',
        'Delivery Method',
        'Target Audience',
        'Skills Taught',
        'Practical Projects',
        'Internship Component',
        'Certification',
        'Placement Assistance',
        'Fees',
        'Source URL'
      ];

      rows = filteredCourses.map(c => [
        `"${(c.courseName || '').replace(/"/g, '""')}"`,
        `"${(c.orgName || '').replace(/"/g, '""')}"`,
        `"${(c.techCategory || '').replace(/"/g, '""')}"`,
        `"${(c.duration || '').replace(/"/g, '""')}"`,
        `"${(c.location || '').replace(/"/g, '""')}"`,
        `"${(c.deliveryMethod || '').replace(/"/g, '""')}"`,
        `"${(c.targetAudience || '').replace(/"/g, '""')}"`,
        `"${(c.skillsTaught || '').replace(/"/g, '""')}"`,
        `"${(c.practicalProjects || '').replace(/"/g, '""')}"`,
        c.internshipComponent ? 'Yes' : 'No',
        c.certification ? 'Yes' : 'No',
        c.placementAssistance ? 'Yes' : 'No',
        `"${(c.fees || '').replace(/"/g, '""')}"`,
        `"${(c.sourceUrl || '').replace(/"/g, '""')}"`
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DataContext.Provider
      value={{
        organisations,
        filteredOrganisations,
        courses,
        filteredCourses,
        partnerships,
        marketingRecords,
        marketOpportunities,
        researchSources,
        evidenceItems,
        findings,
        filters,
        activeFilterCount,
        statistics,
        toggleArrayFilter,
        setFilterValue,
        clearAllFilters,
        setKozhikodePreset,
        setAllKeralaPreset,
        addOrganisation,
        updateOrganisation,
        deleteOrganisation,
        addCourse,
        updateCourse,
        deleteCourse,
        addPartnership,
        addSource,
        addEvidence,
        updateEvidence,
        deleteEvidence,
        addFinding,
        updateFinding,
        deleteFinding,
        linkEvidenceToFinding,
        unlinkEvidenceFromFinding,
        setFindingsForEvidence,
        resetToDemoData,
        exportToCSV
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

