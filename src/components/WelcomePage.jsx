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
 * High-End Editorial Brand Landing Page for Competitor Intel.
 * 
 * Art Direction & Craftsmanship:
 * - Bold editorial hero statement ("COMPETITOR INTEL") as two clearly separated words
 * - Pure typographic composition with expansive whitespace (zero decorative cards/badges)
 * - Single focused brand tagline: "Know Your Competition. See Beyond the Market."
 * - Luminous diffused atmospheric typography with soft radiant bloom
 * - Deep cobalt / royal violet atmospheric lighting (#1d1266 / #2a178c / #080417)
 * - 100% preservation of all 51 competitor profiles, Kerala districts, and research citations
 */

export function WelcomePage({ onExplore }) {

  // Global keyboard listener: Enter launches into Overview Command Center
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onExplore('overview');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExplore]);

  return (
    <div className="relative min-h-screen w-full bg-[#070314] text-white flex flex-col justify-between overflow-x-hidden selection:bg-purple-600 selection:text-white font-sans antialiased">
      
      {/* =========================================================================
          1. DEEP COBALT & VOLUMETRIC VIOLET CANVAS (MASTER 4K ENVIRONMENT)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        {/* Master 4K Ultra-HD Artwork Layer with High Real Clarity */}
        <img 
          src={heroUnifiedWebp} 
          alt="EDGE Competitor Intel 4K Atmospheric Environment" 
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[72%_center] lg:object-center select-none"
          style={{ imageRendering: '-webkit-optimize-contrast' }}
        />

        {/* Unified Cinematic Atmosphere - One cohesive, continuous environment across the full canvas */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 95% 85% at 50% 50%, transparent 40%, rgba(7, 3, 20, 0.40) 80%, rgba(7, 3, 20, 0.75) 100%),
              linear-gradient(to bottom, rgba(6, 2, 16, 0.45) 0%, transparent 15%, transparent 85%, rgba(6, 2, 16, 0.75) 100%)
            `
          }}
        />

        {/* Subtle Ambient Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
      </div>

      {/* =========================================================================
          2. TOP MASTHEAD & EDITORIAL REGISTRATION
          ========================================================================= */}
      <header className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-6 sm:pt-8 flex items-center justify-between">
        
        {/* Left: Brand Identity Lockup */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-xl shadow-purple-950/80 ring-1.5 ring-purple-400/60 shrink-0 bg-purple-950/90 backdrop-blur-md">
            <img 
              src={edgeCircleLogo} 
              alt="EDGE" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-black tracking-wider text-white font-mono leading-none drop-shadow-xs">
              EDGE
            </span>
            <span className="text-[9px] sm:text-[9.5px] font-bold tracking-[0.26em] text-purple-300/80 uppercase font-mono leading-none mt-1">
              A MYST INITIATIVE
            </span>
          </div>
        </div>

        {/* Right: Direct Platform Entry Key */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => onExplore('categories')}
            className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-purple-300 text-xs font-semibold backdrop-blur-md shadow-lg shadow-purple-950/50 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span className="tracking-wide">Explore Directory</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-purple-300" />
          </button>
        </div>

      </header>

      {/* =========================================================================
          3. MAIN HERO STAGE: PURE EDITORIAL TYPOGRAPHY & INTENTIONAL WHITESPACE
          (Clean, focused hero: COMPETITOR INTEL + single tagline + CTA)
          ========================================================================= */}
      <main className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-center py-10 sm:py-16 lg:py-24">
        
        <div className="max-w-4xl flex flex-col items-start text-left relative z-20">
          
          {/* =====================================================================
              OVERSIZED TYPOGRAPHIC HERO STATEMENT (THE DESIGNED OBJECT)
              Two clearly separated words: COMPETITOR and INTEL (no period)
              ===================================================================== */}
          <div className="relative mb-6 sm:mb-8 select-text">
            
            {/* Soft Ambient Diffuse Glow seamlessly blending into the environment (No localized ball) */}
            <div 
              className="absolute -inset-10 pointer-events-none opacity-40 blur-[90px]"
              style={{
                background: 'radial-gradient(circle at 40% 50%, rgba(147, 51, 234, 0.35) 0%, rgba(88, 28, 135, 0.15) 50%, transparent 80%)'
              }}
              aria-hidden="true"
            />

            <h1 className="relative font-display text-[28px] xs:text-[36px] sm:text-[54px] md:text-[68px] lg:text-[84px] xl:text-[96px] font-black tracking-[-0.01em] leading-none select-text flex flex-col gap-1.5 sm:gap-2.5 md:gap-3.5">
              
              {/* Word 1: COMPETITOR (Matching INTEL's purple + white gradient treatment) */}
              <span 
                className="block uppercase drop-shadow-[0_0_40px_rgba(168,85,247,0.50)]"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 15%, #d8b4fe 45%, #9333ea 85%, #6b21a8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                COMPETITOR
              </span>

              {/* Word 2: INTEL (Clearly separated, unified purple + white gradient treatment) */}
              <span 
                className="block uppercase drop-shadow-[0_0_40px_rgba(168,85,247,0.50)]"
                style={{
                  background: 'linear-gradient(180deg, #ffffff 15%, #d8b4fe 45%, #9333ea 85%, #6b21a8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                INTEL
              </span>

            </h1>

          </div>

          {/* =====================================================================
              REFINED SUPPORTING TAGLINE (THIN, LIGHT, SPACIOUS & EDITORIAL)
              Completely different, elegant typographic system from the heavy heading
              ===================================================================== */}
          <p className="font-sans font-light text-base sm:text-lg md:text-xl text-purple-200/80 tracking-[0.035em] mb-8 sm:mb-11 max-w-xl leading-relaxed">
            <span>Know Your Competition. </span>
            <span className="text-purple-300/90 font-normal">See Beyond the Market.</span>
          </p>

          {/* =====================================================================
              CINEMATIC ACTION TRIGGERS (TACTILE MILLED KEYS)
              ===================================================================== */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
            
            {/* Primary: Illuminated Tactical Trigger */}
            <button
              onClick={() => onExplore('categories')}
              className="group relative inline-flex items-center justify-center gap-3.5 px-8 sm:px-9 py-4 rounded-full bg-gradient-to-r from-[#581c87] via-[#6b21a8] to-[#9333ea] hover:from-[#4c1d95] hover:via-[#581c87] hover:to-[#7e22ce] text-white text-sm sm:text-base font-bold shadow-2xl shadow-purple-950/90 hover:shadow-purple-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden border border-purple-400/50"
            >
              {/* Top specular reflection sheen */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-200/80 to-transparent pointer-events-none" />
              
              <span className="relative z-10 tracking-wide font-sans">Explore Directory</span>
              <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 text-purple-200" />
            </button>

            {/* Secondary: Smoked Frosted Glass Capsule */}
            <button
              onClick={() => onExplore('compare')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-purple-300 text-sm sm:text-base font-semibold shadow-md backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-purple-300" />
              <span>Compare Rivals</span>
            </button>

          </div>

        </div>

      </main>

      {/* =========================================================================
          4. EDITORIAL FOOTER & BOTTOM CAPSULE WATERMARK (WEALTHKEM STYLE)
          ========================================================================= */}
      <footer className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
        
        {/* Left: System Attribution */}
        <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-purple-300/80 uppercase">
          <span className="font-bold text-white">EDGE</span>
          <span className="text-purple-500">•</span>
          <span>COMPETITOR INTEL</span>
        </div>

        {/* Center: Reference-Inspired Capsule Watermark ("wealthkem"-style minimal pill) */}
        <div className="px-4 py-1.5 rounded-full bg-black/60 border border-white/20 text-[10.5px] font-mono tracking-[0.2em] uppercase text-white/90 backdrop-blur-md shadow-xs">
          A MYST INITIATIVE
        </div>

        {/* Right: Quick Entry Link */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-purple-300/70 hidden md:inline">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono text-[10px]">enter</kbd>
          </span>
          <button 
            onClick={() => onExplore('categories')}
            className="text-purple-300 hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Enter Platform</span>
            <span>→</span>
          </button>
        </div>

      </footer>

    </div>
  );
}
