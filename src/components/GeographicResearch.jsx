import React, { useState } from 'react';
import { 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  Target, 
  Handshake, 
  ExternalLink,
  Layers,
  ArrowRight,
  Compass
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { GEOGRAPHIC_HIERARCHY, KERALA_DISTRICTS } from '../data/geographicData';

export function GeographicResearch({ onSelectOrg, setActiveTab }) {
  const { 
    organisations, 
    statistics, 
    filters, 
    setFilterValue, 
    toggleArrayFilter,
    setKozhikodePreset 
  } = useData();

  const [selectedState, setSelectedState] = useState('Kerala');
  const [selectedDistrict, setSelectedDistrict] = useState('Kozhikode');

  const stateData = GEOGRAPHIC_HIERARCHY.states.find(s => s.name === selectedState) || GEOGRAPHIC_HIERARCHY.states[0];
  const districtData = stateData.districts.find(d => d.name === selectedDistrict) || stateData.districts[0];

  // Organisations in currently selected district
  const districtOrgs = organisations.filter(o => o.district === selectedDistrict);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-purple-100 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200">
                A MYST INITIATIVE • GEOGRAPHIC INTELLIGENCE
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Hierarchical Territorial Structure
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-purple-600" />
              Hierarchical Geographic Research: India → State → District → Locality
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Active research focus across all 14 districts of Kerala, prioritizing <strong>Kozhikode District</strong>. The hierarchy is architected to scale seamlessly to Karnataka, Tamil Nadu, and all Indian states without code redesign.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={setKozhikodePreset}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 rounded-lg shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Set Kozhikode Priority</span>
            </button>
          </div>
        </div>

        {/* Hierarchy Breadcrumb Strip */}
        <div className="mt-4 p-3 bg-[#0c0a17] text-slate-200 rounded-lg border border-[#221c38] text-xs flex flex-wrap items-center gap-2">
          <span className="text-slate-400 font-semibold">Hierarchy:</span>
          <span className="px-2 py-0.5 rounded bg-[#1a1430] text-purple-300 border border-[#352b5e] font-bold">
            Country: India
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-200 border border-purple-800/60 font-bold">
            State: {selectedState} (14 Districts)
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="px-2 py-0.5 rounded bg-gradient-to-r from-violet-600 to-purple-700 text-white font-bold flex items-center gap-1 shadow-xs">
            <Sparkles className="w-3 h-3 text-amber-300" />
            District: {selectedDistrict}
          </span>
        </div>
      </div>

      {/* State Switcher Tabs (Demonstrating Scalability to All India) */}
      <div className="bg-white p-3 rounded-xl border border-purple-100 shadow-xs flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-semibold px-2">Select State:</span>
          {GEOGRAPHIC_HIERARCHY.states.map(st => (
            <button
              key={st.name}
              onClick={() => {
                setSelectedState(st.name);
                setSelectedDistrict(st.districts[0].name);
              }}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                selectedState === st.name
                  ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-purple-50 hover:text-purple-700'
              }`}
            >
              {st.name} {st.focus && '★ (Primary Focus)'}
            </button>
          ))}
        </div>
        <span className="text-[11px] text-purple-500 font-medium hidden md:inline">
          Scalable pan-India architecture
        </span>
      </div>

      {/* Kerala 14 Districts Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {stateData.districts.map(dist => {
          const isSelected = selectedDistrict === dist.name;
          const isKozhikode = dist.name === 'Kozhikode';
          const count = organisations.filter(o => o.district === dist.name).length;
          const direct = organisations.filter(o => o.district === dist.name && o.competitiveRelevance === 'Direct').length;
          const partner = organisations.filter(o => o.district === dist.name && o.competitiveRelevance === 'Potential Partner').length;

          return (
            <div
              key={dist.name}
              onClick={() => setSelectedDistrict(dist.name)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-50/70 border-purple-500 shadow-sm ring-1 ring-purple-500'
                  : 'bg-white border-purple-100 hover:border-purple-300 hover:shadow-md shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-1 mb-1.5">
                  <h3 className={`font-bold text-sm ${isKozhikode ? 'text-purple-950 font-black' : 'text-slate-900'}`}>
                    {dist.name}
                  </h3>
                  {isKozhikode && (
                    <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded font-bold text-[9px] uppercase tracking-wider border border-amber-300">
                      Initial Priority
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-slate-500 mb-3">
                  {dist.priority}
                </div>

                <div className="grid grid-cols-3 gap-1.5 text-center text-xs mb-3">
                  <div className="bg-slate-50 p-1.5 rounded border border-slate-150">
                    <span className="text-[10px] text-slate-400 block">Total</span>
                    <strong className="text-slate-900">{count}</strong>
                  </div>
                  <div className="bg-rose-50 p-1.5 rounded border border-rose-150">
                    <span className="text-[10px] text-rose-500 block">Direct</span>
                    <strong className="text-rose-700">{direct}</strong>
                  </div>
                  <div className="bg-amber-50 p-1.5 rounded border border-amber-150">
                    <span className="text-[10px] text-amber-600 block">Partner</span>
                    <strong className="text-amber-700">{partner}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-purple-50 flex items-center justify-between text-[11px]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleArrayFilter('districts', dist.name);
                    setActiveTab('directory');
                  }}
                  className="text-purple-700 font-semibold hover:underline"
                >
                  Apply as Slicer →
                </button>
                <span className="text-slate-400">
                  {dist.cities ? `${dist.cities.length} Localities` : ''}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected District Drilldown: Localities and Entities */}
      <div className="bg-white rounded-xl border border-purple-100 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Locality Drilldown
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">
                {selectedDistrict} District
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Key Education & IT Corridors in {selectedDistrict}
            </h2>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            {districtOrgs.length} Researched Entities Active
          </span>
        </div>

        {/* Known cities / clusters */}
        {districtData && districtData.cities && (
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Key Localities & Clusters Monitored:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {districtData.cities.map(city => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-purple-50/70 text-purple-800 border border-purple-200"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* List of organisations active in this district */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Organisations in {selectedDistrict}:
          </span>
          {districtOrgs.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-lg text-center text-xs text-slate-500">
              No organisations currently logged for {selectedDistrict}. You can add one via the "Add Competitor" button!
            </div>
          ) : (
            <div className="divide-y divide-purple-50 border border-purple-100 rounded-xl overflow-hidden">
              {districtOrgs.map(org => (
                <div
                  key={org.id}
                  onClick={() => onSelectOrg(org)}
                  className="p-3.5 hover:bg-purple-50/40 transition-all cursor-pointer flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0c0a17] text-purple-300 font-bold text-xs flex items-center justify-center border border-[#221c38]">
                      {org.logoText || org.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 hover:text-purple-700">
                        {org.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {org.city} • {org.orgType}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      org.competitiveRelevance === 'Direct'
                        ? 'bg-rose-50 text-rose-700 border-rose-200'
                        : org.competitiveRelevance === 'Potential Partner'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {org.competitiveRelevance}
                    </span>
                    <span className="text-purple-700 font-semibold hover:underline">
                      Inspect →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
