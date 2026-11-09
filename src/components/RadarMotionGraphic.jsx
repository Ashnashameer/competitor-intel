import React, { useRef, useEffect } from 'react';

/**
 * RadarMotionGraphic:
 * High-performance, Retina-scaled 60 FPS HTML5 Canvas + SVG Motion Graphic.
 * Renders an interactive 3D Cybernetic Planetary Core with Saturn-like orbital rings,
 * sweeping radar beam, orbiting competitor satellite beacons, laser signal telemetry,
 * ambient particle dust, and smooth mouse parallax.
 */
export function RadarMotionGraphic({ onNodeClick }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Competitor satellites orbiting on different 3D ellipses
    const nodes = [
      { name: 'Apex Corp', angle: 0.4, speed: 0.007, radiusX: 200, radiusY: 70, tilt: -0.3, color: '#ec4899', signal: 'Price drop -12%' },
      { name: 'Zenith Labs', angle: 2.1, speed: 0.005, radiusX: 260, radiusY: 90, tilt: -0.2, color: '#3b82f6', signal: 'Feature update' },
      { name: 'Horizon Inc', angle: 3.8, speed: 0.006, radiusX: 310, radiusY: 105, tilt: 0.25, color: '#10b981', signal: 'Hiring spike' },
      { name: 'Nova Systems', angle: 5.2, speed: 0.004, radiusX: 360, radiusY: 120, tilt: -0.15, color: '#f59e0b', signal: 'Campaign active' }
    ];

    // Ambient floating cybernetic dust motes
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * 800,
      y: Math.random() * 800,
      radius: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      alpha: Math.random() * 0.6 + 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2
    }));

    let radarAngle = 0;
    let time = 0;

    // Handle mouse move for smooth 3D parallax
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseRef.current.targetX = nx * 35;
      mouseRef.current.targetY = ny * 35;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler with devicePixelRatio support
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Main render loop
    const render = () => {
      time += 0.02;
      radarAngle += 0.015;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const cx = w * 0.5 + mouseRef.current.x;
      const cy = h * 0.52 + mouseRef.current.y;

      ctx.clearRect(0, 0, w, h);

      // 1. Draw Ambient Floating Dust Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = h;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;

        const pulse = Math.sin(time * 2 + p.pulseOffset) * 0.25 + 0.75;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.alpha * pulse * 0.5})`;
        ctx.fill();
      });

      // 2. Draw Subtle Sweeping Radar Wave
      ctx.save();
      ctx.translate(cx, cy);
      const radarGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 380);
      radarGrad.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
      radarGrad.addColorStop(0.7, 'rgba(126, 34, 206, 0.04)');
      radarGrad.addColorStop(1, 'rgba(126, 34, 206, 0)');

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 380, radarAngle - 0.45, radarAngle);
      ctx.closePath();
      ctx.fillStyle = radarGrad;
      ctx.fill();

      // Sharp leading sweep edge
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(radarAngle) * 380, Math.sin(radarAngle) * 380);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.45)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 3. Draw Concentric 3D Tilted Orbital Ellipses (Back layer)
      const ringRadii = [
        { rx: 170, ry: 60, tilt: -0.28, stroke: 'rgba(192, 132, 252, 0.28)', dash: [4, 6] },
        { rx: 240, ry: 85, tilt: -0.22, stroke: 'rgba(168, 85, 247, 0.32)', dash: [] },
        { rx: 310, ry: 110, tilt: 0.22, stroke: 'rgba(147, 51, 234, 0.25)', dash: [6, 8] },
        { rx: 370, ry: 130, tilt: -0.16, stroke: 'rgba(126, 34, 206, 0.20)', dash: [] }
      ];

      ringRadii.forEach((r) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(r.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, r.rx, r.ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = r.stroke;
        ctx.lineWidth = 1.2;
        if (r.dash.length) ctx.setLineDash(r.dash);
        ctx.stroke();
        ctx.restore();
      });

      // 4. Draw Saturn-like Primary Glowing Orbital Ring (Back half: angle PI to 2*PI)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35);

      const ringGrad = ctx.createLinearGradient(-260, 0, 260, 0);
      ringGrad.addColorStop(0, 'rgba(147, 51, 234, 0.1)');
      ringGrad.addColorStop(0.3, 'rgba(236, 72, 153, 0.7)');
      ringGrad.addColorStop(0.5, 'rgba(192, 132, 252, 0.95)');
      ringGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.8)');
      ringGrad.addColorStop(1, 'rgba(147, 51, 234, 0.1)');

      // Draw back half of thick ring
      ctx.beginPath();
      ctx.ellipse(0, 0, 220, 58, 0, Math.PI, 2 * Math.PI);
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 6;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // 5. Draw Central 3D Cybernetic Planetary Core / Emblem
      const coreRadius = 78;
      ctx.save();
      ctx.translate(cx, cy);

      // Deep atmospheric ambient purple halo
      const haloGrad = ctx.createRadialGradient(0, 0, coreRadius * 0.6, 0, 0, coreRadius * 2.4);
      haloGrad.addColorStop(0, 'rgba(168, 85, 247, 0.45)');
      haloGrad.addColorStop(0.5, 'rgba(126, 34, 206, 0.18)');
      haloGrad.addColorStop(1, 'rgba(126, 34, 206, 0)');
      ctx.beginPath();
      ctx.arc(0, 0, coreRadius * 2.4, 0, Math.PI * 2);
      ctx.fillStyle = haloGrad;
      ctx.fill();

      // Shadow underneath core
      ctx.beginPath();
      ctx.ellipse(0, coreRadius * 1.35, coreRadius * 1.1, coreRadius * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(76, 29, 149, 0.18)';
      ctx.filter = 'blur(10px)';
      ctx.fill();
      ctx.filter = 'none';

      // 3D Sphere Body with multi-light shading
      const sphereGrad = ctx.createRadialGradient(
        -coreRadius * 0.32, -coreRadius * 0.32, coreRadius * 0.1,
        0, 0, coreRadius
      );
      sphereGrad.addColorStop(0, '#ffffff');           // Direct specular reflection
      sphereGrad.addColorStop(0.18, '#d8b4fe');        // Lavender highlight
      sphereGrad.addColorStop(0.55, '#7e22ce');        // Vibrant purple core
      sphereGrad.addColorStop(0.85, '#3b0764');        // Deep cybernetic shadow
      sphereGrad.addColorStop(1, '#1b0330');           // Rim shadow

      ctx.beginPath();
      ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.shadowColor = 'rgba(147, 51, 234, 0.5)';
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Stylized glowing cybernetic "e" emblem etched into the core
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 12;
      ctx.lineWidth = 3.5;
      ctx.lineCap = 'round';

      // Draw stylized lowercase "e"
      ctx.beginPath();
      // Outer curve of "e"
      ctx.arc(0, 0, coreRadius * 0.45, 0.25 * Math.PI, 1.8 * Math.PI, false);
      // Horizontal crossbar of "e"
      ctx.moveTo(-coreRadius * 0.45, 0);
      ctx.lineTo(coreRadius * 0.43, 0);
      ctx.stroke();
      ctx.restore();

      ctx.restore();

      // 6. Draw Saturn-like Primary Glowing Orbital Ring (Front half: angle 0 to PI)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35);

      // Front half passes in front of the sphere!
      ctx.beginPath();
      ctx.ellipse(0, 0, 220, 58, 0, 0, Math.PI);
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 6;
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 22;
      ctx.stroke();

      // Thin bright inner iridescent line
      ctx.beginPath();
      ctx.ellipse(0, 0, 220, 58, 0, 0, Math.PI);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.restore();

      // 7. Render Orbiting Competitor Satellites & Signal Telemetry Lines
      nodes.forEach((node) => {
        node.angle += node.speed;

        // Position on tilted ellipse
        const cosT = Math.cos(node.tilt);
        const sinT = Math.sin(node.tilt);
        const ex = Math.cos(node.angle) * node.radiusX;
        const ey = Math.sin(node.angle) * node.radiusY;

        // 2D rotation of ellipse
        const px = cx + (ex * cosT - ey * sinT);
        const py = cy + (ex * sinT + ey * cosT);

        // Distance from radar beam to trigger active detection ping
        const nodeAngleFromCenter = Math.atan2(py - cy, px - cx);
        let angleDiff = Math.abs((radarAngle % (Math.PI * 2)) - ((nodeAngleFromCenter + Math.PI * 2) % (Math.PI * 2)));
        if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
        const isDetected = angleDiff < 0.35;

        // Laser signal connection line to center core when detected
        if (isDetected) {
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = `rgba(192, 132, 252, ${0.7 - angleDiff * 1.5})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([3, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Pulse beacon ring around satellite
        const pulse = Math.sin(time * 3 + node.angle * 2) * 4 + 8;
        ctx.beginPath();
        ctx.arc(px, py, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = isDetected ? '#ec4899' : 'rgba(192, 132, 252, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Solid satellite dot
        ctx.beginPath();
        ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = isDetected ? '#ffffff' : node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isDetected ? 14 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Competitor Name Tag & Telemetry Signal
        ctx.font = '600 11px system-ui, -apple-system, sans-serif';
        const textMetrics = ctx.measureText(node.name);
        const tagW = textMetrics.width + 16;
        const tagH = 20;
        const tagX = px + 10;
        const tagY = py - 10;

        // Tag background badge
        ctx.fillStyle = isDetected ? 'rgba(36, 6, 63, 0.88)' : 'rgba(255, 255, 255, 0.85)';
        ctx.strokeStyle = isDetected ? 'rgba(192, 132, 252, 0.8)' : 'rgba(226, 232, 240, 0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(tagX, tagY, tagW, tagH, 10);
        ctx.fill();
        ctx.stroke();

        // Tag text
        ctx.fillStyle = isDetected ? '#ffffff' : '#1e1b4b';
        ctx.fillText(node.name, tagX + 8, tagY + 14);

        // Subtitle signal if detected
        if (isDetected) {
          ctx.font = 'bold 9px system-ui, -apple-system, sans-serif';
          ctx.fillStyle = '#ec4899';
          ctx.fillText(`⚡ ${node.signal}`, tagX + 2, tagY + 32);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[440px] lg:min-h-[580px] flex items-center justify-center select-none pointer-events-auto">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block cursor-crosshair touch-none"
        title="Interactive 3D Competitor Radar - Move your mouse to explore"
      />
    </div>
  );
}
