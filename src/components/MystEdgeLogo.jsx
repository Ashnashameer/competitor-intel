import React from 'react';
import edgeCircleLogo from '../assets/edge_logo_circle.png';
import edge3dWordmark from '../assets/edge_3d_logo_transparent.png';

export function MystEdgeLogo({ 
  size = "md", 
  showSub = true, 
  variant = "default", 
  className = "" 
}) {
  const sizeMap = {
    xs: { box: "w-6 h-6", text: "text-xs", sub: "text-[8px]", wordmarkH: "h-5" },
    sm: { box: "w-8 h-8", text: "text-sm", sub: "text-[8px]", wordmarkH: "h-6" },
    md: { box: "w-10 h-10", text: "text-base", sub: "text-[9px]", wordmarkH: "h-8" },
    lg: { box: "w-12 h-12", text: "text-xl", sub: "text-[10px]", wordmarkH: "h-10" },
    xl: { box: "w-16 h-16", text: "text-2xl", sub: "text-xs", wordmarkH: "h-14" },
    hero: { box: "w-20 h-20", text: "text-3xl", sub: "text-sm", wordmarkH: "h-16" }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Variant: Circle emblem only (for compact buttons, avatars, favicon)
  if (variant === "circle-only") {
    return (
      <div className={`relative ${currentSize.box} shrink-0 rounded-full overflow-hidden shadow-md shadow-purple-950/60 ring-1 ring-purple-500/40 ${className}`}>
        <img 
          src={edgeCircleLogo} 
          alt="EDGE Official Logo" 
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>
    );
  }

  // Variant: 3D Wordmark only
  if (variant === "wordmark-only") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img 
          src={edge3dWordmark} 
          alt="edge" 
          className={`${currentSize.wordmarkH} w-auto object-contain select-none pointer-events-none filter drop-shadow-[0_2px_8px_rgba(147,51,234,0.4)]`}
        />
      </div>
    );
  }

  // Variant: Default (Exact circular emblem with refined brand typography and sub-label)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Exact Official Circular Emblem from EDGE Brand Reference */}
      <div className={`relative ${currentSize.box} shrink-0 rounded-full overflow-hidden shadow-lg shadow-purple-950/70 ring-1.5 ring-purple-500/50 hover:ring-purple-400 transition-all group`}>
        <img 
          src={edgeCircleLogo} 
          alt="EDGE - Competitor Intelligence Hub" 
          className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white ${currentSize.text} flex items-center`}>
            <span>EDGE</span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Hub
          </span>
        </div>

        {showSub && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className="font-mono text-[9px] tracking-[0.22em] uppercase font-bold text-purple-300/80">
              A MYST INITIATIVE
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
