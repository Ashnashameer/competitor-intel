import React from 'react';

/**
 * Edge3dHeroSculpture:
 * A pure vector SVG & CSS 3D standalone visual component recreating the large glossy purple
 * Edge "e" object with its thin orbital ring, realistic floor reflections, ambient purple glow,
 * and the athletic silhouette man pushing it forward.
 * 
 * - 100% vector SVG & CSS (infinitely sharp at Retina, 4K, 8K)
 * - Zero raster screenshots or bitmap cutouts
 * - Standalone, scalable, and independently positionable
 */
export function Edge3dHeroSculpture({ className = "" }) {
  return (
    <div className={`relative w-full max-w-[720px] select-none pointer-events-none ${className}`}>
      
      {/* 1. Ambient Purple Ground Lighting Glow */}
      <div 
        className="absolute -bottom-8 right-6 w-[85%] h-24 rounded-full opacity-65 blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(147, 51, 234, 0.45) 0%, rgba(192, 132, 252, 0.20) 50%, transparent 80%)' }}
      />

      <svg 
        viewBox="0 0 760 520" 
        className="w-full h-auto overflow-visible"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for 3D Glossy "e" */}
          <radialGradient id="e-body-grad" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#d8b4fe" />       {/* Bright specular highlight */}
            <stop offset="25%" stopColor="#9333ea" />      {/* Vivid royal purple */}
            <stop offset="60%" stopColor="#6b21a8" />      {/* Deep purple core */}
            <stop offset="90%" stopColor="#3b0764" />      {/* Rich shadow violet */}
            <stop offset="100%" stopColor="#1e053a" />     {/* Deep rim shadow */}
          </radialGradient>

          <linearGradient id="e-specular-sheen" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#c084fc" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#7e22ce" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b0764" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="e-inner-bevel" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e8ff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2e0854" stopOpacity="0.9" />
          </linearGradient>

          {/* Gradients for the Orbital Ring */}
          <linearGradient id="ring-glow-grad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
            <stop offset="30%" stopColor="#e9d5ff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="floor-fade-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Drop Shadows & Glow Filters */}
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="shadow-blur" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        {/* ===================================================================
            LAYER 0: GLOSSY FLOOR REFLECTION (Casts down into reflective floor)
            =================================================================== */}
        <g opacity="0.22" transform="translate(0, 480) scale(1, -0.45)" filter="url(#shadow-blur)">
          {/* Flipped reflection of the "e" */}
          <circle cx="560" cy="240" r="160" fill="#7e22ce" />
          <ellipse cx="560" cy="240" rx="240" ry="70" fill="#a855f7" />
        </g>

        {/* Floor Contact Dark Shadow Beneath 'e' and Man's feet */}
        <ellipse cx="560" cy="455" rx="150" ry="18" fill="#24063f" opacity="0.35" filter="url(#shadow-blur)" />
        <ellipse cx="560" cy="452" rx="100" ry="10" fill="#1b0330" opacity="0.55" />
        <ellipse cx="370" cy="442" rx="24" ry="6" fill="#18181b" opacity="0.4" />
        <ellipse cx="280" cy="452" rx="20" ry="5" fill="#18181b" opacity="0.35" />

        {/* ===================================================================
            LAYER 1: BACK HALF OF ORBITAL RING (Passes behind the "e")
            =================================================================== */}
        <g transform="translate(560, 260) rotate(-22)">
          {/* Back Arc: angle PI to 2*PI */}
          <path 
            d="M -270,0 A 270,72 0 0,1 270,0" 
            stroke="url(#ring-glow-grad)" 
            strokeWidth="5" 
            strokeLinecap="round"
            opacity="0.75"
          />
          <path 
            d="M -270,0 A 270,72 0 0,1 270,0" 
            stroke="#ffffff" 
            strokeWidth="1.8" 
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* ===================================================================
            LAYER 2: THE LARGE GLOSSY PURPLE 3D "e" SCULPTURE
            =================================================================== */}
        <g id="edge-3d-e-body" transform="translate(560, 260) rotate(-6)">
          
          {/* Base Ambient Deep Shadow Layer */}
          <circle cx="0" cy="0" r="176" fill="#1e053a" opacity="0.4" filter="url(#shadow-blur)" />

          {/* Outer Torus Body of "e" */}
          <circle 
            cx="0" 
            cy="0" 
            r="165" 
            fill="url(#e-body-grad)" 
            stroke="url(#e-inner-bevel)" 
            strokeWidth="6" 
          />

          {/* Inner Negative Space Cutout of "e" (Gives deep 3D hollow depth) */}
          <circle 
            cx="0" 
            cy="15" 
            r="82" 
            fill="#fbf9ff" 
            stroke="#3b0764" 
            strokeWidth="12" 
          />

          {/* Inner Ambient Glow inside the cutout */}
          <circle 
            cx="0" 
            cy="15" 
            r="78" 
            fill="none" 
            stroke="url(#e-body-grad)" 
            strokeWidth="8" 
            opacity="0.7" 
          />

          {/* The Horizontal Crossbar of "e" */}
          <g>
            {/* Crossbar 3D shadow */}
            <path 
              d="M -160,-2 C -100,-10 100,-10 160,-2 L 160,34 C 100,28 -100,28 -160,34 Z" 
              fill="#24063f" 
            />
            {/* Crossbar front face */}
            <path 
              d="M -162,-10 L 162,-10 L 162,24 L -162,24 Z" 
              fill="url(#e-body-grad)" 
              stroke="url(#e-specular-sheen)" 
              strokeWidth="2.5" 
            />
            {/* Top highlight line on crossbar */}
            <line 
              x1="-155" 
              y1="-9" 
              x2="155" 
              y2="-9" 
              stroke="#ffffff" 
              strokeWidth="2" 
              opacity="0.85" 
            />
          </g>

          {/* Mouth Cutout on the lower-right side of "e" */}
          <path 
            d="M 60,18 L 180,38 L 175,115 L 60,78 Z" 
            fill="#fbf9ff" 
          />

          {/* 3D Chamfer & Specular Highlight Arc on Upper "e" Curve */}
          <path 
            d="M -135,-75 C -95,-145 95,-145 135,-75" 
            fill="none" 
            stroke="url(#e-specular-sheen)" 
            strokeWidth="9" 
            strokeLinecap="round" 
            opacity="0.9" 
          />
          {/* Intense Specular White Hotspot */}
          <path 
            d="M -70,-125 C -25,-142 25,-142 70,-125" 
            fill="none" 
            stroke="#ffffff" 
            strokeWidth="4.5" 
            strokeLinecap="round" 
            opacity="0.95" 
          />

          {/* Lower Lip Highlight */}
          <path 
            d="M -135,75 C -95,145 65,155 125,105" 
            fill="none" 
            stroke="url(#e-body-grad)" 
            strokeWidth="10" 
            strokeLinecap="round" 
            opacity="0.75" 
          />
          <path 
            d="M -105,105 C -75,138 45,145 95,115" 
            fill="none" 
            stroke="#c084fc" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            opacity="0.8" 
          />
        </g>

        {/* ===================================================================
            LAYER 3: FRONT HALF OF ORBITAL RING (Passes in front of the "e")
            =================================================================== */}
        <g transform="translate(560, 260) rotate(-22)">
          {/* Front Arc: angle 0 to PI */}
          <path 
            d="M -270,0 A 270,72 0 0,0 270,0" 
            stroke="url(#ring-glow-grad)" 
            strokeWidth="6" 
            strokeLinecap="round"
            filter="url(#soft-glow)"
          />
          {/* Bright Core White Filament */}
          <path 
            d="M -270,0 A 270,72 0 0,0 270,0" 
            stroke="#ffffff" 
            strokeWidth="2.2" 
            strokeLinecap="round"
          />
        </g>

        {/* ===================================================================
            LAYER 4: THE ATHLETIC MAN SILHOUETTE PUSHING THE 3D "e"
            =================================================================== */}
        <g id="pushing-man-silhouette" fill="#09090b">
          
          {/* Head & Neck (Leaning forward with intense exertion) */}
          <circle cx="395" cy="275" r="14" />
          
          {/* Torso & Shoulders (Angled at ~48 degrees into the "e") */}
          <path d="M 382,285 C 388,278 402,280 408,288 L 368,368 C 360,370 348,364 345,355 Z" />

          {/* Right Arm (Extended forward, hands planted firmly on the "e") */}
          <path 
            d="M 398,288 L 436,275 L 438,284 L 404,297 Z" 
            stroke="#09090b" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
          {/* Hands planted against "e" */}
          <ellipse cx="440" cy="278" rx="5" ry="8" fill="#18181b" />

          {/* Left Arm (Braced lower on the "e" for leverage) */}
          <path 
            d="M 388,298 L 430,305 L 432,314 L 392,308 Z" 
            stroke="#09090b" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
          <ellipse cx="434" cy="308" rx="5" ry="7" fill="#18181b" />

          {/* Hips & Pelvis */}
          <ellipse cx="355" cy="360" rx="14" ry="11" />

          {/* Front Leg (Bent at ~75 degrees driving into ground) */}
          {/* Thigh */}
          <path d="M 358,362 L 382,408 L 372,412 L 348,368 Z" />
          {/* Calf */}
          <path d="M 378,406 L 368,444 L 358,442 L 368,406 Z" />
          {/* Front Foot planted on ground */}
          <path d="M 358,442 L 382,444 L 382,448 L 354,448 Z" />

          {/* Back Leg (Straight, locked, driving back to ground) */}
          {/* Thigh */}
          <path d="M 346,364 L 298,404 L 290,396 L 338,358 Z" />
          {/* Calf extending back */}
          <path d="M 294,400 L 262,444 L 254,438 L 286,396 Z" />
          {/* Back Foot (Toe planted, heel elevated) */}
          <path d="M 256,438 L 272,448 L 264,452 L 248,442 Z" />

          {/* Subtle Studio Rim Highlight along man's back and shoulders */}
          <path 
            d="M 390,274 C 382,284 362,330 350,358 C 330,380 286,412 258,442" 
            fill="none" 
            stroke="#c084fc" 
            strokeWidth="1.5" 
            opacity="0.6" 
          />
        </g>

      </svg>
    </div>
  );
}
