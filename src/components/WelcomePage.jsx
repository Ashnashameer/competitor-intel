import React, { useEffect } from 'react';
import { 
  ArrowRight, 
  Compass,
  GraduationCap,
  Building2,
  Briefcase,
  Users,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Layers,
  MapPin,
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
  FileText,
  Scale,
  ChevronDown
} from 'lucide-react';
import edgeCircleLogo from '../assets/edge_logo_circle.png';
import heroUnifiedWebp from '../assets/edge_hero_unified_cinematic_2x.webp';
import heroUnifiedPng from '../assets/edge_hero_unified_cinematic_2x.png';

/**
 * WelcomePage:
 * Modern High-Impact SaaS Intelligence Website Model for EDGE Competitor Intel.
 * 
 * Features:
 * - Sticky Glassmorphism Global Header with Quick Navigation & Launch CTA
 * - 4K Cinematic Hero with Iconic Two-Word "COMPETITOR INTEL" Gradient Typography
 * - Real-Time Kerala Ecosystem Metrics Bar (51 Entities • 4 Sectors • 1,000+ Schools)
 * - Four Interactive Market Sector Portals (Schools, Colleges, Corporate, Partnerships)
 * - Strategic Intelligence Capabilities Grid (6 Deep-Dive Modules)
 * - Featured Competitor Dossier Spotlights (Cyber Square, De' Lead, IRI, Evolve)
 * - Two-Tier Verification Methodology Showcase (Lavender Verified vs Clean White)
 * - High-Conversion Launch Banner & Comprehensive Enterprise Footer
 */

export function WelcomePage({ onExplore }) {

  // Global keyboard shortcut: Enter or Space launches into Directory or Overview
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is interacting with an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        onExplore('categories');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onExplore]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#070314] text-white flex flex-col overflow-x-hidden selection:bg-purple-600 selection:text-white font-sans antialiased scroll-smooth">
      
      {/* =========================================================================
          1. STICKY GLOBAL WEBSITE HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070314]/85 border-b border-white/10 transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-18 sm:h-20 flex items-center justify-between">
          
          {/* Brand Identity Lockup */}
          <button 
            onClick={scrollToTop} 
            className="flex items-center gap-3.5 group text-left cursor-pointer transition-transform duration-200 active:scale-95"
            aria-label="EDGE Home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-xl shadow-purple-950/80 ring-1.5 ring-purple-400/60 shrink-0 bg-purple-950/90 backdrop-blur-md group-hover:ring-purple-300 transition-all">
              <img 
                src={edgeCircleLogo} 
                alt="EDGE Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black tracking-wider text-white font-mono leading-none">
                  EDGE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider font-semibold">
                  HUB
                </span>
              </div>
              <span className="text-[9px] sm:text-[9.5px] font-bold tracking-[0.26em] text-purple-300/80 uppercase font-mono leading-none mt-1">
                A MYST INITIATIVE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono font-medium tracking-wider text-purple-200/80">
            <button 
              onClick={() => scrollToSection('sectors')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              SECTORS
            </button>
            <button 
              onClick={() => scrollToSection('capabilities')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              CAPABILITIES
            </button>
            <button 
              onClick={() => scrollToSection('spotlight')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              COMPETITORS
            </button>
            <button 
              onClick={() => scrollToSection('methodology')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              VERIFICATION
            </button>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onExplore('compare')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-purple-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-purple-400" />
              <span>Compare</span>
            </button>

            <button
              onClick={() => onExplore('categories')}
              className="group relative inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-purple-950/60 border border-purple-400/40 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span className="tracking-wide">Explore Directory</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 text-purple-200" />
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          2. CINEMATIC 4K HERO SECTION (HERO STAGE)
          ========================================================================= */}
      <section className="relative w-full min-h-[660px] lg:min-h-[760px] flex flex-col justify-center overflow-hidden">
        
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <picture>
            <source srcSet={heroUnifiedWebp} type="image/webp" />
            <img 
              src={heroUnifiedPng} 
              alt="EDGE Competitor Intel 4K Atmospheric Canvas" 
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover object-[72%_center] lg:object-center select-none"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </picture>

          {/* Volumetric Radial Violet & Cobalt Fog */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 75% 75% at 24% 38%, rgba(55, 30, 185, 0.48) 0%, rgba(30, 15, 110, 0.38) 45%, transparent 75%),
                linear-gradient(to right, rgba(7, 3, 20, 0.70) 0%, rgba(10, 5, 28, 0.45) 40%, rgba(6, 2, 18, 0.35) 100%),
                linear-gradient(to bottom, rgba(6, 2, 16, 0.50) 0%, transparent 20%, transparent 75%, rgba(7, 3, 20, 0.98) 100%)
              `
            }}
          />

          {/* 35mm Subtle Sensor Film Grain */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        {/* Hero Content Stage */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-20 lg:py-24 flex flex-col justify-center">
          
          <div className="max-w-4xl flex flex-col items-start text-left">
            
            {/* Live Intelligence Ecosystem Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300 text-xs font-mono font-medium tracking-wide mb-6 backdrop-blur-md shadow-lg shadow-purple-950/50">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>KERALA COMPETITOR INTELLIGENCE HUB</span>
              <span className="text-purple-400/40">•</span>
              <span className="text-white font-semibold">51 AUDITED ENTITIES</span>
            </div>

            {/* Editorial Typographic Hero Statement: COMPETITOR INTEL */}
            <div className="relative mb-6 sm:mb-8 select-text">
              
              {/* Luminous Volumetric Aura */}
              <div 
                className="absolute -inset-6 sm:-inset-10 pointer-events-none opacity-85 blur-[60px] sm:blur-[85px]"
                style={{
                  background: 'radial-gradient(ellipse at 35% 45%, rgba(255, 255, 255, 0.38) 0%, rgba(147, 51, 234, 0.38) 35%, rgba(88, 28, 135, 0.25) 65%, transparent 80%)'
                }}
                aria-hidden="true"
              />

              <h1 className="relative font-display text-[32px] xs:text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] xl:text-[100px] font-black tracking-[-0.01em] leading-none select-text flex flex-col gap-1.5 sm:gap-2.5 md:gap-3.5">
                
                {/* Word 1: COMPETITOR */}
                <span 
                  className="block uppercase drop-shadow-[0_0_45px_rgba(168,85,247,0.50)]"
                  style={{
                    background: 'linear-gradient(180deg, #ffffff 15%, #d8b4fe 45%, #9333ea 85%, #6b21a8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  COMPETITOR
                </span>

                {/* Word 2: INTEL */}
                <span 
                  className="block uppercase drop-shadow-[0_0_45px_rgba(168,85,247,0.50)]"
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

            {/* Tagline */}
            <p className="font-sans font-light text-lg sm:text-xl md:text-2xl text-purple-200/90 tracking-[0.03em] mb-4 max-w-2xl leading-relaxed">
              <span>Know Your Competition. </span>
              <span className="text-white font-normal">See Beyond the Market.</span>
            </p>

            {/* Sub-description */}
            <p className="font-sans text-sm sm:text-base text-purple-200/70 max-w-xl leading-relaxed mb-9">
              The verified intelligence platform mapping Kerala's K-12 STEM providers, college robotics labs, enterprise upskilling firms, and accredited institutional partnerships.
            </p>

            {/* Tactical Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 w-full sm:w-auto">
              
              {/* Primary: Illuminated Tactical Trigger */}
              <button
                onClick={() => onExplore('categories')}
                className="group relative inline-flex items-center justify-center gap-3.5 px-8 sm:px-9 py-4 rounded-full bg-gradient-to-r from-[#581c87] via-[#6b21a8] to-[#9333ea] hover:from-[#4c1d95] hover:via-[#581c87] hover:to-[#7e22ce] text-white text-sm sm:text-base font-bold shadow-2xl shadow-purple-950/90 hover:shadow-purple-900 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden border border-purple-400/50"
              >
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-200/80 to-transparent pointer-events-none" />
                <span className="relative z-10 tracking-wide font-sans">Explore Directory</span>
                <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 text-purple-200" />
              </button>

              {/* Secondary: Compare Rivals */}
              <button
                onClick={() => onExplore('compare')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-purple-300 text-sm sm:text-base font-semibold shadow-md backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-purple-300" />
                <span>Compare Rivals</span>
              </button>

              {/* Tertiary: Overview Command Center */}
              <button
                onClick={() => onExplore('overview')}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full text-purple-300 hover:text-white hover:bg-white/5 text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Overview Dashboard</span>
              </button>

            </div>

            {/* Keyboard shortcut hint */}
            <div className="mt-8 flex items-center gap-2.5 text-xs font-mono text-purple-300/60">
              <span className="hidden sm:inline">Press</span>
              <kbd className="hidden sm:inline px-2 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono text-[10px]">enter</kbd>
              <span className="hidden sm:inline">to explore directory</span>
              <span className="hidden sm:inline text-purple-500">•</span>
              <button 
                onClick={() => scrollToSection('sectors')} 
                className="inline-flex items-center gap-1 text-purple-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Scroll to browse platform</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================================================
          3. LIVE MARKET METRICS & ECOSYSTEM PULSE
          ========================================================================= */}
      <section className="relative z-30 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 -mt-6 sm:-mt-8 mb-16">
        <div className="rounded-2xl bg-gradient-to-r from-purple-950/60 via-purple-900/40 to-indigo-950/60 border border-purple-500/20 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-purple-950/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-purple-500/15">
            
            <div className="flex flex-col pt-4 lg:pt-0">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                51
              </span>
              <span className="text-xs sm:text-sm font-semibold text-purple-200 mt-1">
                Audited Kerala Entities
              </span>
              <span className="text-[11px] font-mono text-purple-300/60 mt-0.5">
                Covering 14 Kerala districts
              </span>
            </div>

            <div className="flex flex-col pt-4 lg:pt-0 lg:pl-8">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                4
              </span>
              <span className="text-xs sm:text-sm font-semibold text-purple-200 mt-1">
                Core Market Sectors
              </span>
              <span className="text-[11px] font-mono text-purple-300/60 mt-0.5">
                Schools, Colleges, Corporate, CSR
              </span>
            </div>

            <div className="flex flex-col pt-4 lg:pt-0 lg:pl-8">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
                1,000+
              </span>
              <span className="text-xs sm:text-sm font-semibold text-purple-200 mt-1">
                Institutional Deployments
              </span>
              <span className="text-[11px] font-mono text-purple-300/60 mt-0.5">
                Documented school & college tie-ups
              </span>
            </div>

            <div className="flex flex-col pt-4 lg:pt-0 lg:pl-8">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-purple-300 tracking-tight flex items-center gap-2">
                100%
                <ShieldCheck className="w-6 h-6 text-purple-400 inline" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-purple-200 mt-1">
                Public Evidence Audit
              </span>
              <span className="text-[11px] font-mono text-purple-300/60 mt-0.5">
                MoUs, news records, & photo proofs
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          4. MARKET SECTORS (THE FOUR PILLARS OF COMPETITIVE INTELLIGENCE)
          ========================================================================= */}
      <section id="sectors" className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              <span>MARKET SECTORS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
              Four Pillars of Market Intelligence
            </h2>
            <p className="text-sm sm:text-base text-purple-200/70 mt-3 leading-relaxed">
              Curated intelligence directories segmented strictly by delivery model, institutional accreditation, and verified service contracts.
            </p>
          </div>

          <button
            onClick={() => onExplore('categories')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>VIEW ALL DIRECTORIES</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Four Sector Gateway Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Card 1: Schools */}
          <div 
            onClick={() => onExplore('schools')}
            className="group relative rounded-2xl bg-gradient-to-b from-[#140b33]/90 to-[#0e0724]/90 border border-purple-500/20 hover:border-purple-400/60 p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/80 cursor-pointer flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/20 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 group-hover:scale-105 group-hover:bg-purple-500/30 transition-all">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-200">
                  16 Verified Entities
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-purple-200 transition-colors">
                Schools & K-12
              </h3>
              <p className="text-xs sm:text-sm font-mono text-purple-300/80 mt-1 mb-4">
                K-12, CBSE, ICSE, International & State Curricula
              </p>
              <p className="text-sm text-purple-200/70 leading-relaxed mb-6">
                External service and training providers delivering in-school robotics laboratories, AI curriculum, coding education, and Atal Tinkering Labs.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">AI / Coding Labs</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">Robotics Kits</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">Teacher Enablement</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-purple-300/70">Lead: Cyber Square, De' Lead, IRI</span>
              <span className="text-xs font-semibold text-white group-hover:text-purple-300 flex items-center gap-1.5 transition-colors">
                <span>Explore School Partners</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Card 2: Colleges */}
          <div 
            onClick={() => onExplore('colleges')}
            className="group relative rounded-2xl bg-gradient-to-b from-[#140b33]/90 to-[#0e0724]/90 border border-purple-500/20 hover:border-purple-400/60 p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/80 cursor-pointer flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-blue-500/20 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 group-hover:scale-105 group-hover:bg-blue-500/30 transition-all">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200">
                  35 Documented Entities
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-blue-200 transition-colors">
                Colleges & Universities
              </h3>
              <p className="text-xs sm:text-sm font-mono text-blue-300/80 mt-1 mb-4">
                Engineering Colleges, Autonomous Institutions & KTU Hubs
              </p>
              <p className="text-sm text-purple-200/70 leading-relaxed mb-6">
                Competitors providing academic MoUs, IEDC incubation, industrial automation labs, IoT testbeds, and accredited placement training programs.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">KTU Credit Add-ons</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">IEDC Tech Hubs</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">Industrial IoT</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-purple-300/70">Focus: Engineering & Polytechnic</span>
              <span className="text-xs font-semibold text-white group-hover:text-blue-300 flex items-center gap-1.5 transition-colors">
                <span>Explore College Partners</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Card 3: Corporate */}
          <div 
            onClick={() => onExplore('corporate')}
            className="group relative rounded-2xl bg-gradient-to-b from-[#140b33]/90 to-[#0e0724]/90 border border-purple-500/20 hover:border-purple-400/60 p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/80 cursor-pointer flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-fuchsia-500/20 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/40 flex items-center justify-center text-fuchsia-300 group-hover:scale-105 group-hover:bg-fuchsia-500/30 transition-all">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-400/30 text-fuchsia-200">
                  35 Documented Entities
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-fuchsia-200 transition-colors">
                Corporate Training
              </h3>
              <p className="text-xs sm:text-sm font-mono text-fuchsia-300/80 mt-1 mb-4">
                Enterprise Upskilling & B2B Workforce Development
              </p>
              <p className="text-sm text-purple-200/70 leading-relaxed mb-6">
                Commercial providers delivering professional employee training, AI workflows, enterprise automation, and custom corporate talent pipelines.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">Enterprise AI</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">Full-Stack Cohorts</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">B2B Upskilling</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-purple-300/70">Focus: Infopark, Cyberpark & Technopark</span>
              <span className="text-xs font-semibold text-white group-hover:text-fuchsia-300 flex items-center gap-1.5 transition-colors">
                <span>Explore Corporate Partners</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

          {/* Card 4: Other Partnerships */}
          <div 
            onClick={() => onExplore('other_partnerships')}
            className="group relative rounded-2xl bg-gradient-to-b from-[#140b33]/90 to-[#0e0724]/90 border border-purple-500/20 hover:border-purple-400/60 p-7 sm:p-9 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-950/80 cursor-pointer flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 group-hover:scale-105 group-hover:bg-emerald-500/30 transition-all">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-200">
                  50 Documented Entities
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-emerald-200 transition-colors">
                Other Partnerships
              </h3>
              <p className="text-xs sm:text-sm font-mono text-emerald-300/80 mt-1 mb-4">
                CSR Foundations, Government & Ecosystem Alliances
              </p>
              <p className="text-sm text-purple-200/70 leading-relaxed mb-6">
                Organisations operating through government skill missions (ASAP Kerala, KSUM), CSR foundation grants, community clubs, and student tech hubs.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">CSR Deployments</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">ASAP Kerala / KSUM</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-purple-200">Community Hubs</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs font-mono text-purple-300/70">Focus: Public-Private & Philanthropy</span>
              <span className="text-xs font-semibold text-white group-hover:text-emerald-300 flex items-center gap-1.5 transition-colors">
                <span>Explore Other Partnerships</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          5. STRATEGIC INTELLIGENCE CAPABILITIES GRID
          ========================================================================= */}
      <section id="capabilities" className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-t border-purple-500/15">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>PLATFORM CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Engineered for Market Foresight
          </h2>
          <p className="text-sm sm:text-base text-purple-200/70 mt-3 leading-relaxed">
            Move beyond marketing hype. Access audited institutional tie-ups, fee transparency, and regional market penetration across Kerala.
          </p>
        </div>

        {/* 6 Capabilities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-5">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Audited School Rosters</h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed mb-4">
              Comprehensive lists of verified client schools, district locations, curriculum alignments (CBSE/ICSE/State), and deployment models.
            </p>
            <span className="text-[11px] font-mono text-purple-300 mt-auto">44+ verified schools for key leaders</span>
          </div>

          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-5">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Side-by-Side Rival Matrix</h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed mb-4">
              Benchmark rivals simultaneously across technology kits, trainer credentials, per-student pricing, and accreditation support.
            </p>
            <button 
              onClick={() => onExplore('compare')} 
              className="text-[11px] font-mono text-purple-300 hover:text-white inline-flex items-center gap-1 mt-auto cursor-pointer"
            >
              <span>Launch Comparison Matrix</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-5">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Commercial & Pricing Intelligence</h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed mb-4">
              Granular fee transparency detailing student billing brackets, lab setup capital requirements, and annual licensing structures.
            </p>
            <span className="text-[11px] font-mono text-purple-300 mt-auto">₹1,500 – ₹5,000 / student benchmarks</span>
          </div>

          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-5">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Geographic Saturation Mapping</h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed mb-4">
              Pinpoint competitor strongholds and white spaces across Kochi, Kozhikode, Malappuram, Trivandrum, and suburban belts.
            </p>
            <span className="text-[11px] font-mono text-purple-300 mt-auto">14 districts audited</span>
          </div>

          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Primary Audit Trail</h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed mb-4">
              Every profile links directly to institutional MoUs, school announcements, verified social releases, and photographic evidence.
            </p>
            <span className="text-[11px] font-mono text-purple-300 mt-auto">Zero speculation or synthetic claims</span>
          </div>

          <div className="p-7 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-400/40 transition-all duration-300 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 mb-5">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Excel Multi-Slicers & Export</h3>
            <p className="text-xs sm:text-sm text-purple-200/70 leading-relaxed mb-4">
              Slice data on the fly by district, customer segment, hardware tier, or export clean dossiers for executive presentations.
            </p>
            <span className="text-[11px] font-mono text-purple-300 mt-auto">Instant CSV & JSON data access</span>
          </div>

        </div>

      </section>

      {/* =========================================================================
          6. FEATURED COMPETITOR DOSSIER SPOTLIGHTS
          ========================================================================= */}
      <section id="spotlight" className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-t border-purple-500/15">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wider mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
              <span>FEATURED DOSSIERS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
              High-Impact Kerala Competitors
            </h2>
            <p className="text-sm sm:text-base text-purple-200/70 mt-3 leading-relaxed">
              Examine live profiles with documented school rosters, commercial fee estimates, and partnership audits.
            </p>
          </div>

          <button
            onClick={() => onExplore('schools')}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>VIEW ALL 16 SCHOOL PARTNERS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Cyber Square */}
          <div 
            onClick={() => onExplore('schools')}
            className="group rounded-2xl bg-gradient-to-b from-[#180d3d] to-[#0c0520] border border-purple-500/20 hover:border-purple-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-semibold">
                  VERIFIED
                </span>
                <span className="text-xs font-mono text-purple-300/60">Kozhikode</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">Cyber Square</h4>
              <p className="text-xs text-purple-200/70 mt-1 mb-4">Global K-12 coding curriculum, AI learning platform & UK/GCC expansion.</p>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/70 block">School Reach</span>
                <span className="text-base font-bold text-purple-200 font-display">1,000+ Schools</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300 font-semibold">
              <span>Inspect Profile</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* De' Lead International */}
          <div 
            onClick={() => onExplore('schools')}
            className="group rounded-2xl bg-gradient-to-b from-[#180d3d] to-[#0c0520] border border-purple-500/20 hover:border-purple-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-semibold">
                  VERIFIED
                </span>
                <span className="text-xs font-mono text-purple-300/60">Malappuram</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">De' Lead International</h4>
              <p className="text-xs text-purple-200/70 mt-1 mb-4">Walk2Lead CSR initiative, STEM robotics labs & 44 verified school deployments.</p>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/70 block">School Reach</span>
                <span className="text-base font-bold text-purple-200 font-display">44 Verified Schools</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300 font-semibold">
              <span>Inspect Profile</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Industrial Robotics Institute */}
          <div 
            onClick={() => onExplore('schools')}
            className="group rounded-2xl bg-gradient-to-b from-[#180d3d] to-[#0c0520] border border-purple-500/20 hover:border-purple-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-semibold">
                  VERIFIED
                </span>
                <span className="text-xs font-mono text-purple-300/60">Kochi</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">Industrial Robotics (IRI)</h4>
              <p className="text-xs text-purple-200/70 mt-1 mb-4">Industrial robotic arms, KUKA/ABB automation kits & hands-on STEM school labs.</p>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/70 block">School Reach</span>
                <span className="text-base font-bold text-purple-200 font-display">100+ Schools</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300 font-semibold">
              <span>Inspect Profile</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Evolve Robotics */}
          <div 
            onClick={() => onExplore('schools')}
            className="group rounded-2xl bg-gradient-to-b from-[#180d3d] to-[#0c0520] border border-purple-500/20 hover:border-purple-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 font-semibold">
                  VERIFIED
                </span>
                <span className="text-xs font-mono text-purple-300/60">Kochi</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">Evolve Robotics</h4>
              <p className="text-xs text-purple-200/70 mt-1 mb-4">Integrated STEM lab curricula, Atal Tinkering Lab setup & teacher mentorship.</p>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 mb-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300/70 block">School Reach</span>
                <span className="text-base font-bold text-purple-200 font-display">25+ Partner Schools</span>
              </div>
            </div>
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-300 font-semibold">
              <span>Inspect Profile</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          7. TWO-TIER VERIFICATION METHODOLOGY SHOWCASE
          ========================================================================= */}
      <section id="methodology" className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-t border-purple-500/15">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>AUDIT STANDARDS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
            Our Two-Tier Verification Standard
          </h2>
          <p className="text-sm sm:text-base text-purple-200/70 mt-3 leading-relaxed">
            In our directories, card background treatment immediately communicates the strength of publicly available partnership evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* State 1: Verified (Soft Lavender) */}
          <div className="p-8 rounded-2xl bg-[#f8f5fc] text-slate-900 border border-purple-200 shadow-xl shadow-purple-900/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-purple-100 border-l border-b border-purple-200 text-purple-800 text-[10px] font-mono font-bold uppercase tracking-wider">
              Lavender Card System
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-800 text-xs font-bold font-mono uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                <span>VERIFIED</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
                Publicly Verified School Partner
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Applied to competitors where there is third-party documented proof of school deployments, active MoUs, school client directories, press releases, or official media.
              </p>
              <ul className="space-y-2 text-xs font-mono text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>Documented partnership count displayed (e.g. "1,000+ Schools", "44 Verified Schools")</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>Soft light lavender background (#f8f5fc) with ambient purple glow</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-purple-100 flex items-center justify-between text-xs text-purple-700 font-semibold">
              <span>Applies to 14 Verified School Providers</span>
              <span className="font-mono text-[11px]">Audit Grade: A</span>
            </div>
          </div>

          {/* State 2: Not Publicly Verified (Clean Pure White) */}
          <div className="p-8 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-xl bg-slate-100 border-l border-b border-slate-200 text-slate-600 text-[10px] font-mono font-bold uppercase tracking-wider">
              White Card System
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold font-mono uppercase tracking-wider mb-4">
                <span>NOT PUBLICLY VERIFIED</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
                Unverified School Tie-ups
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Applied to legitimate, active operating businesses whose specific school partnership counts or client lists are not verifiable via independent public disclosures.
              </p>
              <ul className="space-y-2 text-xs font-mono text-slate-700 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>School Partnerships: "Not publicly verified"</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span>Clean neutral white card styling (never disabled or rejected)</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-semibold">
              <span>AiBonic Innovations & YM Innovations</span>
              <span className="font-mono text-[11px]">Audit Grade: Under Review</span>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          8. HIGH-CONVERSION LAUNCH CALL TO ACTION
          ========================================================================= */}
      <section className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
        <div className="relative rounded-3xl bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 border border-purple-400/40 p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl shadow-purple-950/90 text-center">
          
          {/* Ambient Specular Highlight */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/20 text-purple-200 uppercase tracking-widest mb-6">
              READY FOR STRATEGIC ACTION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight leading-tight mb-4">
              Inspect Kerala's EdTech & STEM Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-purple-200/80 leading-relaxed mb-8">
              Gain instant access to 51 competitor profiles, verified school lists, pricing estimates, curriculum structures, and side-by-side comparison tables.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onExplore('categories')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-purple-950 hover:bg-purple-100 font-bold text-sm sm:text-base shadow-xl shadow-purple-950/80 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Launch Directory Categories</span>
                <ArrowRight className="w-4 h-4 text-purple-900" />
              </button>
              
              <button
                onClick={() => onExplore('overview')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm sm:text-base font-semibold backdrop-blur-md transition-all duration-200 cursor-pointer"
              >
                <BarChart3 className="w-4 h-4 text-purple-300" />
                <span>Command Center Overview</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          9. COMPREHENSIVE ENTERPRISE WEBSITE FOOTER
          ========================================================================= */}
      <footer className="relative z-20 w-full bg-[#05020e] border-t border-white/10 pt-16 pb-12 text-xs">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col gap-12">
          
          {/* Top Row: Brand & Multi-Column Sitemap */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            
            {/* Column 1: Brand Info (2 cols wide on desktop) */}
            <div className="md:col-span-2 flex flex-col items-start pr-0 md:pr-8">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-9 h-9 rounded-full overflow-hidden ring-1.5 ring-purple-400/60 shrink-0 bg-purple-950">
                  <img src={edgeCircleLogo} alt="EDGE" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-wider text-white font-mono leading-none">
                    EDGE
                  </span>
                  <span className="text-[9.5px] font-bold tracking-[0.26em] text-purple-300/80 uppercase font-mono leading-none mt-1">
                    A MYST INITIATIVE
                  </span>
                </div>
              </div>
              <p className="text-xs text-purple-300/70 leading-relaxed mb-6 max-w-sm">
                Kerala's premier competitive intelligence hub tracking institutional partnerships, commercial fee models, and robotics curriculum providers.
              </p>
              <div className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 text-[10.5px] font-mono tracking-[0.2em] uppercase text-white/90 backdrop-blur-md">
                A MYST INITIATIVE • KERALA
              </div>
            </div>

            {/* Column 2: Directories */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-1">
                Directories
              </span>
              <button 
                onClick={() => onExplore('schools')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Schools & K-12 (16)
              </button>
              <button 
                onClick={() => onExplore('colleges')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Colleges & Universities (35)
              </button>
              <button 
                onClick={() => onExplore('corporate')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Corporate Training (35)
              </button>
              <button 
                onClick={() => onExplore('other_partnerships')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Other Partnerships (50)
              </button>
            </div>

            {/* Column 3: Platform Tools */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-1">
                Intelligence Tools
              </span>
              <button 
                onClick={() => onExplore('overview')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Command Center Overview
              </button>
              <button 
                onClick={() => onExplore('compare')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Competitor Comparison Matrix
              </button>
              <button 
                onClick={() => onExplore('courses')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Course & Syllabi Database
              </button>
              <button 
                onClick={() => onExplore('sources')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Research Evidence Sources
              </button>
            </div>

            {/* Column 4: Standards & System */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-white mb-1">
                Standards
              </span>
              <button 
                onClick={() => scrollToSection('methodology')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Verification Methodology
              </button>
              <button 
                onClick={() => scrollToSection('capabilities')} 
                className="text-left text-purple-300/80 hover:text-white transition-colors cursor-pointer"
              >
                Audited School Rosters
              </button>
              <span className="text-purple-300/50">Primary Disclosures Only</span>
              <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>51 Profiles Active</span>
              </div>
            </div>

          </div>

          {/* Research & Data Ethics Notice */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-purple-300/60 leading-relaxed">
            <span className="font-semibold text-purple-200">Data Ethics & Transparency Notice: </span>
            EDGE Competitor Intel compiles publicly available institutional disclosures, school newsletters, registered MoUs, corporate registries, and verifiable field reports. Information is maintained strictly for strategic research and benchmarking.
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-purple-300/70">
            <div>
              © 2026 EDGE • Competitor Intelligence Hub. A MYST Initiative. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => onExplore('categories')} 
                className="hover:text-white transition-colors cursor-pointer"
              >
                Directory Index
              </button>
              <button 
                onClick={scrollToTop} 
                className="hover:text-white text-purple-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Back to top</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
