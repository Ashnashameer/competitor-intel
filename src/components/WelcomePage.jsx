import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Compass
} from 'lucide-react';
import edgeCircleLogo from '../assets/edge_logo_circle.png';
import heroUnifiedWebp from '../assets/edge_hero_unified_cinematic_2x.webp';
import heroUnifiedPng from '../assets/edge_hero_unified_cinematic_2x.png';

/**
 * WelcomePage:
 * Unified Cinematic SaaS landing page for EDGE Competitor Intel.
 * 
 * - Continuous atmospheric environment (lavender-blue mist to deep electric blue)
 * - Zero split-screen / zero visible boundary
 * - Floating intelligence screens & strategist silhouette naturally embedded in volumetric haze
 * - Crisp, selectable HTML typography & interactive buttons living inside the environment
 * - Bold Editorial Serif Headline (New York style) + Modern Sans Supporting Copy
 * - Fully responsive across mobile, tablet, and 4K desktop
 */
export function WelcomePage({ onExplore }) {
  // Global keyboard listener: Enter or Space launches into the platform
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onExplore('categories');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExplore]);

  return (
    <div className="relative min-h-screen w-full bg-[#0a0618] text-slate-900 flex flex-col justify-between overflow-x-hidden selection:bg-purple-600 selection:text-white font-sans">
      
      {/* =========================================================================
          1. CONTINUOUS CINEMATIC ENVIRONMENT (ONE UNIFIED CANVAS)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Master 4K Ultra-HD Cinematic Artwork */}
        <picture>
          <source srcSet={heroUnifiedWebp} type="image/webp" />
          <img 
            src={heroUnifiedPng} 
            alt="EDGE Competitor Intel 4K Atmospheric Environment" 
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-[70%_center] lg:object-center select-none"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
          />
        </picture>

        {/* Ambient Volumetric Atmosphere (Soft Bloom Behind Text Area - NOT A CARD) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 65% 75% at 22% 48%, rgba(245, 240, 255, 0.22) 0%, rgba(215, 225, 255, 0.08) 45%, transparent 75%),
              linear-gradient(to bottom, rgba(10, 6, 24, 0.40) 0%, transparent 18%, transparent 82%, rgba(8, 4, 20, 0.65) 100%)
            `
          }}
        />
      </div>

      {/* =========================================================================
          2. TOP NAVIGATION BAR (EMBEDDED IN AMBIENT LIGHT)
          ========================================================================= */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Left: Brand Identity (EDGE Logo + A MYST INITIATIVE) */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden shadow-md shadow-purple-950/40 ring-1 ring-purple-400/40 shrink-0">
            <img 
              src={edgeCircleLogo} 
              alt="EDGE" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-black tracking-wider text-slate-950 font-mono leading-none">
              EDGE
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.24em] text-slate-700 uppercase font-mono leading-none mt-1">
              A MYST INITIATIVE
            </span>
          </div>
        </div>

        {/* Right: Telemetry Indicator & Fast Action */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d0722]/60 border border-emerald-400/30 text-emerald-300 text-xs font-semibold shadow-xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="text-[11px] font-mono tracking-tight font-bold">System Live</span>
          </div>

          <button
            onClick={() => onExplore('categories')}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0d0722]/50 hover:bg-[#1a0f3d]/80 text-white border border-purple-400/40 hover:border-purple-300 text-xs font-semibold backdrop-blur-md shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Launch App</span>
            <span className="text-purple-300">→</span>
          </button>
        </div>
      </header>

      {/* =========================================================================
          3. MAIN HERO COMPOSITION (INTEGRATED INTO THE ATMOSPHERE)
          ========================================================================= */}
      <main className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center py-10 sm:py-16">
        <div className="max-w-2xl flex flex-col items-start text-left relative z-20">
          
          {/* Main Headline: Competitor Intel (Bold High-contrast editorial serif, New York typeface style - Dark Colorway) */}
          <h1 className="font-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[96px] font-bold tracking-[-0.015em] leading-[0.96] mb-8 select-text">
            <span className="text-[#09041a]">
              Competitor
            </span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4c1d95] via-[#3730a3] to-[#1e1b4b]">
              Intel
            </span>
          </h1>

          {/* Supporting Copy (Clean Modern Sans-Serif pairing for high readability & editorial balance) */}
          <p className="font-sans text-xl sm:text-2xl md:text-[26px] font-medium text-[#11082e] tracking-tight leading-snug mb-10 select-text">
            Know your competition, <br className="hidden sm:inline" />
            see beyond the market.
          </p>

          {/* Interactive CTA Action Buttons (Belonging to the same visual system) */}
          <div className="flex flex-wrap items-center gap-4 mb-9">
            <button
              onClick={() => onExplore('categories')}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#4c1d95] via-[#4338ca] to-[#2563eb] hover:from-[#3b0764] hover:via-[#3730a3] hover:to-[#1d4ed8] text-white text-base font-bold shadow-xl shadow-indigo-950/35 hover:shadow-indigo-900/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden z-20"
            >
              <span className="relative z-10 tracking-wide">Explore Intel</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onExplore('compare')}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white/70 hover:bg-white/90 text-slate-900 border border-indigo-200/70 hover:border-indigo-300 text-base font-semibold shadow-xs hover:shadow-md backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Compare Rivals</span>
            </button>
          </div>

        </div>
      </main>

      {/* =========================================================================
          4. FOOTER STRIP
          ========================================================================= */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
        {/* Left: Brand name */}
        <div className="flex items-center gap-2.5 font-bold tracking-wider text-slate-900 font-mono text-[11px]">
          <span>EDGE</span>
          <span className="text-slate-400">•</span>
          <span>COMPETITOR INTEL</span>
        </div>

        {/* Right: Keyboard shortcut & Launch */}
        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <span className="text-purple-200/80">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-900/60 border border-purple-400/30 text-purple-200 font-mono text-[10px]">enter</kbd> to search
          </span>
          <button 
            onClick={() => onExplore('categories')}
            className="text-purple-300 hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Launch App</span>
            <span>→</span>
          </button>
        </div>
      </footer>

    </div>
  );
}
