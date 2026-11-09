import React from 'react';

/**
 * CubesProgressionVisual:
 * A pure vector SVG standalone visual component rendering the storytelling progression:
 * Multiple minimal black silhouette figures pushing translucent purple cubes of increasing size,
 * with contact shadows and reflections on the glossy floor plane.
 * 
 * - 100% Vector SVG (crisp at any resolution, zero raster artifacts)
 * - Visually flows toward the right, directly leading into the 3D Edge object
 */
export function CubesProgressionVisual({ className = "" }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`}>
      <svg 
        viewBox="0 0 460 140" 
        className="w-full h-auto overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Top Face Glass Highlights */}
          <linearGradient id="cube-top-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#d8b4fe" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
          </linearGradient>

          {/* Front Face Translucent Purple */}
          <linearGradient id="cube-front-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9333ea" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#581c87" stopOpacity="0.9" />
          </linearGradient>

          {/* Side Face Shadow Violet */}
          <linearGradient id="cube-side-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7e22ce" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#3b0764" stopOpacity="0.95" />
          </linearGradient>

          {/* Floor Shadow Filter */}
          <filter id="cube-shadow-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* ===================================================================
            CUBE 1 & FIGURE 1 (Far Left, Smallest Initiative)
            =================================================================== */}
        <g id="initiative-stage-1" transform="translate(15, 60)">
          {/* Floor Shadow */}
          <ellipse cx="40" cy="56" rx="20" ry="4" fill="#3b0764" opacity="0.3" filter="url(#cube-shadow-blur)" />
          
          {/* Floor Reflection */}
          <g opacity="0.18" transform="translate(0, 56) scale(1, -0.4)">
            <rect x="28" y="0" width="22" height="22" fill="#9333ea" />
          </g>

          {/* Small Cube (Isometric 22x22) */}
          {/* Top face */}
          <polygon points="28,34 39,28 50,34 39,40" fill="url(#cube-top-1)" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
          {/* Front face */}
          <polygon points="28,34 39,40 39,56 28,50" fill="url(#cube-front-1)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
          {/* Side face */}
          <polygon points="39,40 50,34 50,50 39,56" fill="url(#cube-side-1)" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />

          {/* Silhouette Figure 1 (Pushing small cube) */}
          <g fill="#09090b">
            <circle cx="16" cy="38" r="4" />
            <path d="M 14,42 L 20,44 L 14,54 Z" />
            {/* Arms pushing */}
            <line x1="16" y1="43" x2="28" y2="39" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
            {/* Legs driving */}
            <line x1="15" y1="52" x2="20" y2="56" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="13" y1="52" x2="5" y2="56" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </g>

        {/* ===================================================================
            CUBE 2 & FIGURE 2 (Small-Medium)
            =================================================================== */}
        <g id="initiative-stage-2" transform="translate(100, 48)">
          {/* Floor Shadow */}
          <ellipse cx="48" cy="68" rx="26" ry="5" fill="#3b0764" opacity="0.32" filter="url(#cube-shadow-blur)" />
          
          {/* Floor Reflection */}
          <g opacity="0.2" transform="translate(0, 68) scale(1, -0.4)">
            <rect x="34" y="0" width="28" height="28" fill="#9333ea" />
          </g>

          {/* Cube 2 (Isometric 28x28) */}
          {/* Top face */}
          <polygon points="34,40 48,32 62,40 48,48" fill="url(#cube-top-1)" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
          {/* Front face */}
          <polygon points="34,40 48,48 48,68 34,60" fill="url(#cube-front-1)" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
          {/* Side face */}
          <polygon points="48,48 62,40 62,60 48,68" fill="url(#cube-side-1)" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />

          {/* Silhouette Figure 2 */}
          <g fill="#09090b">
            <circle cx="20" cy="45" r="5" />
            <path d="M 18,50 L 25,52 L 17,64 Z" />
            {/* Arms pushing */}
            <line x1="20" y1="51" x2="34" y2="46" stroke="#09090b" strokeWidth="2.2" strokeLinecap="round" />
            {/* Legs driving */}
            <line x1="18" y1="62" x2="25" y2="67" stroke="#09090b" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="16" y1="62" x2="7" y2="67" stroke="#09090b" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </g>

        {/* ===================================================================
            CUBE 3 & FIGURE 3 (Medium-Large)
            =================================================================== */}
        <g id="initiative-stage-3" transform="translate(210, 32)">
          {/* Floor Shadow */}
          <ellipse cx="62" cy="84" rx="34" ry="6" fill="#3b0764" opacity="0.36" filter="url(#cube-shadow-blur)" />
          
          {/* Floor Reflection */}
          <g opacity="0.22" transform="translate(0, 84) scale(1, -0.4)">
            <rect x="44" y="0" width="38" height="38" fill="#9333ea" />
          </g>

          {/* Cube 3 (Isometric 38x38) */}
          {/* Top face */}
          <polygon points="44,46 63,35 82,46 63,57" fill="url(#cube-top-1)" stroke="rgba(255,255,255,0.8)" strokeWidth="1.2" />
          {/* Front face */}
          <polygon points="44,46 63,57 63,84 44,73" fill="url(#cube-front-1)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
          {/* Side face */}
          <polygon points="63,57 82,46 82,73 63,84" fill="url(#cube-side-1)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />

          {/* Silhouette Figure 3 */}
          <g fill="#09090b">
            <circle cx="26" cy="52" r="6" />
            <path d="M 23,58 L 32,60 L 22,78 Z" />
            {/* Arms pushing */}
            <line x1="25" y1="59" x2="44" y2="53" stroke="#09090b" strokeWidth="2.8" strokeLinecap="round" />
            {/* Legs driving */}
            <line x1="23" y1="76" x2="33" y2="83" stroke="#09090b" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="21" y1="76" x2="9" y2="83" stroke="#09090b" strokeWidth="2.8" strokeLinecap="round" />
          </g>
        </g>

        {/* ===================================================================
            CUBE 4 & FIGURE 4 (Largest Cube, Transitioning to Edge Object)
            =================================================================== */}
        <g id="initiative-stage-4" transform="translate(340, 10)">
          {/* Floor Shadow */}
          <ellipse cx="80" cy="106" rx="44" ry="8" fill="#3b0764" opacity="0.4" filter="url(#cube-shadow-blur)" />
          
          {/* Floor Reflection */}
          <g opacity="0.25" transform="translate(0, 106) scale(1, -0.4)">
            <rect x="56" y="0" width="50" height="50" fill="#9333ea" />
          </g>

          {/* Cube 4 (Isometric 50x50) */}
          {/* Top face */}
          <polygon points="56,54 81,40 106,54 81,68" fill="url(#cube-top-1)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" />
          {/* Front face */}
          <polygon points="56,54 81,68 81,105 56,91" fill="url(#cube-front-1)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />
          {/* Side face */}
          <polygon points="81,68 106,54 106,91 81,105" fill="url(#cube-side-1)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.4" />

          {/* Silhouette Figure 4 (Larger, driving with full energy) */}
          <g fill="#09090b">
            <circle cx="32" cy="62" r="7.5" />
            <path d="M 28,70 L 40,73 L 26,98 Z" />
            {/* Arms pushing firmly */}
            <line x1="32" y1="71" x2="56" y2="64" stroke="#09090b" strokeWidth="3.4" strokeLinecap="round" />
            {/* Legs driving into ground */}
            <line x1="28" y1="94" x2="41" y2="104" stroke="#09090b" strokeWidth="3.4" strokeLinecap="round" />
            <line x1="25" y1="94" x2="10" y2="104" stroke="#09090b" strokeWidth="3.4" strokeLinecap="round" />
          </g>
        </g>

      </svg>
    </div>
  );
}
