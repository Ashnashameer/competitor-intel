import React from 'react';
import { 
  Megaphone, 
  Share2, 
  TrendingUp, 
  Users, 
  Award, 
  Sparkles, 
  Eye, 
  ExternalLink,
  Target,
  FileText,
  Video,
  Lightbulb
} from 'lucide-react';
import { useData } from '../context/DataContext';

export function MarketingResearch({ onSelectOrg }) {
  const { marketingRecords, organisations } = useData();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 bg-purple-50 text-purple-900 rounded border border-purple-200">
            Market Intelligence
          </span>
          <span className="text-xs text-slate-500 font-semibold">
            Promotion & Growth Audit
          </span>
        </div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-purple-700" />
          Competitor Marketing & Acquisition Funnel Analysis
        </h1>
        <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Comprehensive analysis of competitors' website positioning, digital ads, social media engagement (Instagram, YouTube, LinkedIn), promotional webinars, student testimonial framing, and placement messaging across Kerala.
        </p>
      </div>

      {/* Strategic Takeaway Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0c0a17] text-white p-5 rounded-2xl border border-purple-900/60 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-2">
            <Share2 className="w-4 h-4 text-purple-400" />
            Social Media Dominance
          </div>
          <p className="text-xs text-purple-200/80 leading-relaxed">
            Haris&Co (HiLITE Calicut) and Brototype have unlocked massive organic pipelines via Malayalam short-form video and founder charisma. Formal traditional institutes (G-TEC) lag drastically with static flyers.
          </p>
        </div>

        <div className="bg-[#12101f] text-white p-5 rounded-2xl border border-purple-900/60 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
            <Target className="w-4 h-4 text-amber-300" />
            The Free Workshop Funnel
          </div>
          <p className="text-xs text-purple-200/80 leading-relaxed">
            Top conversion funnels in Kozhikode rely on free weekend '2-Day AI & Tech Masterclasses' hosted in physical conference halls to build trust before selling ₹45k - ₹65k flagship diplomas.
          </p>
        </div>

        <div className="bg-[#1a162b] text-white p-5 rounded-2xl border border-purple-900/60 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-emerald-300" />
            Placement Messaging Shift
          </div>
          <p className="text-xs text-purple-200/80 leading-relaxed">
            Candidates are growing skeptical of generic '100% Placement' badges. Real proof (salary slips, GitHub projects, and live client ad dashboards) commands the highest conversion rate.
          </p>
        </div>
      </div>

      {/* Detailed Entity Marketing Profiles */}
      <div className="space-y-4">
        {marketingRecords.map((mkt, idx) => {
          const linkedOrg = organisations.find(o => o.id === mkt.orgId);
          return (
            <div
              key={mkt.id || idx}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-150">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {mkt.orgName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">
                      {mkt.orgName}
                    </h2>
                    <span className="text-xs text-slate-500">
                      Website & Digital Brand Audit
                    </span>
                  </div>
                </div>

                {linkedOrg && (
                  <button
                    onClick={() => onSelectOrg(linkedOrg)}
                    className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1"
                  >
                    <span>View Organisation Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Marketing Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {/* 1. Website & Messaging */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Website Positioning
                  </span>
                  <p className="text-slate-800 font-medium leading-relaxed">
                    "{mkt.websitePositioning}"
                  </p>
                  <div className="pt-2 border-t border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Core Brand Narrative:
                    </span>
                    <p className="text-slate-600 italic mt-0.5">
                      {mkt.brandMessaging}
                    </p>
                  </div>
                </div>

                {/* 2. Social Media & Digital Ads */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Social Footprint
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {mkt.socialMediaPresence}
                  </p>
                  <div className="pt-2 border-t border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Paid Ad Strategy (Meta & Google):
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      {mkt.digitalAdStrategy}
                    </p>
                  </div>
                </div>

                {/* 3. Funnels & Placement Messaging */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Promotional Funnel
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {mkt.promotionalFunnel}
                  </p>
                  <div className="pt-2 border-t border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                      Placement & Testimonial Framing:
                    </span>
                    <p className="text-slate-600 mt-0.5">
                      {mkt.studentTestimonials} — {mkt.placementMessaging}
                    </p>
                  </div>
                </div>
              </div>

              {/* Strategic Implications for EDGE Callout */}
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-950">
                <Lightbulb className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-semibold text-blue-900">Strategic Playbook for EDGE:</strong>{' '}
                  {mkt.strategicImplicationsForEdge}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

