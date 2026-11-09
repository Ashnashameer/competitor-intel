import React from 'react';
import { 
  X, 
  RotateCcw, 
  SlidersHorizontal, 
  Check, 
  MapPin,
  Building2, 
  Clock, 
  ShieldCheck, 
  Target
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { KERALA_DISTRICTS } from '../data/geographicData';
import { 
  SEGMENTS, 
  TECHNOLOGIES, 
  DURATIONS, 
  DELIVERY_METHODS, 
  VERIFICATION_STATUSES,
  COMPETITOR_RELEVANCE
} from '../data/models';

export function ExcelSlicersPanel({ isOpen, onClose }) {
  const { 
    organisations,
    filters, 
    toggleArrayFilter, 
    clearAllFilters, 
    activeFilterCount
  } = useData();

  if (!isOpen) return null;

  const getDistrictCount = (districtName) => {
    return organisations.filter(o => o.district === districtName).length;
  };

  const getSegmentCount = (segId) => {
    return organisations.filter(o => o.segment === segId).length;
  };

  const getTechCount = (tech) => {
    return organisations.filter(o => (o.coursesTechnologies || []).includes(tech)).length;
  };

  const getDurationCount = (dur) => {
    return organisations.filter(o => (o.programmeDurations || []).includes(dur)).length;
  };

  const getRelevanceCount = (rel) => {
    return organisations.filter(o => o.competitiveRelevance === rel).length;
  };

  return (
    <div className="bg-white border-b border-slate-200 text-slate-800 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-4">
        {/* Slicer Header & Active Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
              Advanced Filters
            </h3>
            {activeFilterCount > 0 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {activeFilterCount} Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-rose-600 hover:text-rose-800 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slicer Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-3 text-xs">
          {/* Slicer 1: Segment */}
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1.5">
              Segment
            </span>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {SEGMENTS.map(seg => {
                const isActive = filters.segments.includes(seg.id);
                const count = getSegmentCount(seg.id);
                return (
                  <button
                    key={seg.id}
                    onClick={() => toggleArrayFilter('segments', seg.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg text-left transition-all text-[11px] ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-purple-50/60'
                    }`}
                  >
                    <span className="truncate">{seg.name}</span>
                    <span className="text-[10px] opacity-70 ml-1">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slicer 2: Kerala Districts (14) */}
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1.5">
              District
            </span>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {KERALA_DISTRICTS.map(dist => {
                const isActive = filters.districts.includes(dist);
                const count = getDistrictCount(dist);
                const isKozhikode = dist === 'Kozhikode';
                return (
                  <button
                    key={dist}
                    onClick={() => toggleArrayFilter('districts', dist)}
                    className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg text-left transition-all text-[11px] ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-purple-50/60'
                    }`}
                  >
                    <span className="truncate">{dist} {isKozhikode && '★'}</span>
                    <span className="text-[10px] opacity-70 ml-1">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slicer 3: Technologies */}
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1.5">
              Technology
            </span>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {TECHNOLOGIES.slice(0, 8).map(tech => {
                const isActive = filters.technologies.includes(tech);
                const count = getTechCount(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleArrayFilter('technologies', tech)}
                    className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg text-left transition-all text-[11px] ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-purple-50/60'
                    }`}
                  >
                    <span className="truncate">{tech}</span>
                    <span className="text-[10px] opacity-70 ml-1">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slicer 4: Duration */}
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1.5">
              Programme Duration
            </span>
            <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {DURATIONS.map(dur => {
                const isActive = filters.durations.includes(dur);
                const count = getDurationCount(dur);
                return (
                  <button
                    key={dur}
                    onClick={() => toggleArrayFilter('durations', dur)}
                    className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg text-left transition-all text-[11px] ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-purple-50/60'
                    }`}
                  >
                    <span className="truncate">{dur}</span>
                    <span className="text-[10px] opacity-70 ml-1">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slicer 5: Relationship & Practical */}
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block mb-1.5">
              EDGE Relationship
            </span>
            <div className="space-y-1">
              {COMPETITOR_RELEVANCE.map(rel => {
                const isActive = filters.relevance.includes(rel.id);
                const count = getRelevanceCount(rel.id);
                return (
                  <button
                    key={rel.id}
                    onClick={() => toggleArrayFilter('relevance', rel.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1 rounded-lg text-left transition-all text-[11px] ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-purple-50/60'
                    }`}
                  >
                    <span className="truncate">{rel.label}</span>
                    <span className="text-[10px] opacity-70 ml-1">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
