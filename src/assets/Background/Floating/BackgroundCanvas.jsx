import React, { useEffect, useRef } from "react";
import "./BackgroundCanvas.css";


const CONFIG = {
  particleCount: 80,
  connectionDistance: 150,
  mouseDistance: 200,
  particleSpeed: 0.5,
  particleSize: 2,
  lineColor: "0, 0, 0", // Black lines
};

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let animationFrameId;

    // Resize handler
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    // Init particles (same algorithm)
    const initParticles = () => {
      particles = [];
      const count = Math.floor((width * height) / 15000);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * CONFIG.particleSpeed,
          vy: (Math.random() - 0.5) * CONFIG.particleSpeed,
        });
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, CONFIG.particleSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.9)";
        ctx.fill();

        // Connect to mouse
        const dxMouse = p.x - mouseRef.current.x;
        const dyMouse = p.y - mouseRef.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < CONFIG.mouseDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          const opacity = 1 - distMouse / CONFIG.mouseDistance;
          ctx.strokeStyle = `rgba(${CONFIG.lineColor}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Connect particles to each other
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONFIG.connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - dist / CONFIG.connectionDistance;
            ctx.strokeStyle = `rgba(${CONFIG.lineColor}, ${opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Mouse movement
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="background-canvas"
    />
  );
};

export default BackgroundCanvas;
