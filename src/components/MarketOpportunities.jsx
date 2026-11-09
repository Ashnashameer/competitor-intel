import React from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Target, 
  MapPin, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  ArrowRight,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useData } from '../context/DataContext';

export function MarketOpportunities({ setActiveTab }) {
  const { marketOpportunities } = useData();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-purple-100 p-5 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-purple-50 text-purple-700 rounded border border-purple-200">
            A MYST INITIATIVE • STRATEGIC PLAYBOOK
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Evidence-Based Gaps & White Spaces
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          Market Opportunities & EDGE Differentiation Playbook
        </h1>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Identified structural whitespace across technology syllabi, institutional partnerships, student segments, and physical delivery models in Kozhikode and Kerala. Every recommendation is anchored directly to empirical research records.
        </p>
      </div>

      {/* 5 Core Opportunity Vectors */}
      <div className="space-y-5">
        {marketOpportunities.map((opp, idx) => (
          <div
            key={opp.id}
            className="bg-white rounded-xl border border-purple-100 p-5 shadow-xs hover:border-purple-300 hover:shadow-md transition-all space-y-4"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-purple-50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-purple-800 text-white font-black text-xs flex items-center justify-center shadow-xs">
                  0{idx + 1}
                </div>
                <div>
                  <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
                    {opp.category}
                  </span>
                  <h2 className="text-sm font-bold text-slate-900">
                    {opp.title}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-600" />
                  {opp.districtFocus}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  {opp.severity} Impact
                </span>
              </div>
            </div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Empirical Market Observation */}
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Empirical Market Observation
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {opp.observation}
                </p>
                <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Evidence: {opp.evidenceData}</span>
                </div>
              </div>

              {/* The EDGE Opportunity & Actionable Play */}
              <div className="bg-purple-50/70 p-3.5 rounded-lg border border-purple-200/80 space-y-2">
                <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  EDGE Value Proposition
                </span>
                <p className="text-slate-800 font-medium leading-relaxed">
                  {opp.edgeOpportunity}
                </p>
                <div className="pt-2 border-t border-purple-200/60 text-[11px] text-purple-950 font-semibold">
                  <strong>Actionable Execution:</strong> {opp.actionablePlay}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Strategic Summary Matrix: Why EDGE Wins in Kozhikode & Kerala */}
      <div className="bg-[#0c0a17] text-white rounded-xl p-6 border border-[#221c38] shadow-lg">
        <h2 className="text-base font-bold mb-3 flex items-center gap-2">
          <Target className="w-5 h-5 text-amber-400" />
          The EDGE Strategic Moat in Technology Education
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-[#161226] p-4 rounded-lg border border-[#2d244a] space-y-1.5">
            <h3 className="font-bold text-purple-300 text-sm">1. Modernity of Curriculum</h3>
            <p className="text-slate-300 leading-relaxed">
              While existing institutes in Kozhikode remain stuck in basic pandas/sklearn syntax, EDGE focuses on <strong>Autonomous AI Agents, Generative AI Orchestration, and Production-Grade Software Development</strong>.
            </p>
          </div>
          <div className="bg-[#161226] p-4 rounded-lg border border-[#2d244a] space-y-1.5">
            <h3 className="font-bold text-amber-300 text-sm">2. Institutional Trust (MYST)</h3>
            <p className="text-slate-300 leading-relaxed">
              Backed by <strong>MYST International</strong>, EDGE brings institutional gravitas to school and college MoUs, bypassing the 'coaching centre' stigma that hampers commercial training academies.
            </p>
          </div>
          <div className="bg-[#161226] p-4 rounded-lg border border-[#2d244a] space-y-1.5">
            <h3 className="font-bold text-emerald-300 text-sm">3. Verified Portfolio Outcomes</h3>
            <p className="text-slate-300 leading-relaxed">
              Zero deceptive placement slogans. EDGE mandates public GitHub portfolios, live deployed agent swarms, and tangible client projects that prove competence directly to high-paying tech employers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
