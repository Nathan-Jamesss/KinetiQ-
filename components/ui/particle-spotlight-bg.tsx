"use client";
import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
  reset: () => void;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default function ParticleSpotlightBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const createParticle = (canvas: HTMLCanvasElement): Particle => {
    const particle = {
      x: 0,
      y: 0,
      speed: 0,
      opacity: 1,
      fadeDelay: 0,
      fadeStart: 0,
      fadingOut: false,
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.speed = Math.random() / 5 + 0.1;
        this.opacity = 1;
        this.fadeDelay = Math.random() * 600 + 100;
        this.fadeStart = Date.now() + this.fadeDelay;
        this.fadingOut = false;
      },
      update() {
        this.y -= this.speed;
        if (this.y < 0) {
          this.reset();
        }

        if (!this.fadingOut && Date.now() > this.fadeStart) {
          this.fadingOut = true;
        }

        if (this.fadingOut) {
          this.opacity -= 0.008;
          if (this.opacity <= 0) {
            this.reset();
          }
        }
      },
      draw(ctx: CanvasRenderingContext2D) {
        // Use theme accent color for particles
        const color = getComputedStyle(document.body).getPropertyValue("--kq-accent").trim() || "#8e7a67";
        ctx.fillStyle = color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(this.x, this.y, 0.5, Math.random() * 2 + 1);
        ctx.globalAlpha = 1;
      },
    };

    particle.reset();
    particle.y = Math.random() * canvas.height;
    particle.fadeDelay = Math.random() * 600 + 100;
    particle.fadeStart = Date.now() + particle.fadeDelay;
    particle.fadingOut = false;

    return particle;
  };

  const calculateParticleCount = (canvas: HTMLCanvasElement) => {
    return Math.floor((canvas.width * canvas.height) / 6000);
  };

  const initParticles = (canvas: HTMLCanvasElement) => {
    const particleCount = calculateParticleCount(canvas);
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas));
    }
  };

  const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesRef.current.forEach((particle) => {
      particle.update();
      particle.draw(ctx);
    });
    animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
  };

  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles(canvas);
    animate(canvas, ctx);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{
        background: "var(--kq-bg)",
        backgroundImage: "linear-gradient(0deg, var(--kq-subtle), transparent)"
      }}
    >
      <style>{`
        @keyframes p-spotlight {
          0% { transform: rotateZ(0deg) scale(1); filter: blur(25px) opacity(0.5); }
          20% { transform: rotateZ(-2deg) scale(1.1); filter: blur(30px) opacity(0.6); }    
          40% { transform: rotateZ(2deg) scale(1.2); filter: blur(25px) opacity(0.4); }    
          60% { transform: rotateZ(-1deg) scale(1.1); filter: blur(30px) opacity(0.6); }    
          80% { transform: rotateZ(1deg) scale(1.05); filter: blur(20px) opacity(0.4); }    
          100% { transform: rotateZ(0deg) scale(1); filter: blur(25px) opacity(0.5); }    
        }
      `}</style>

      {/* Spotlights - Theme Aware */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: "100%", width: "100%", overflow: "hidden" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              borderRadius: "0 0 50% 50%",
              position: "absolute",
              left: 0,
              right: 0,
              margin: "0 auto",
              top: "-10%",
              width: "60em",
              height: "120%",
              backgroundImage:
                "conic-gradient(from 0deg at 50% 0%, transparent 45%, rgba(255,255,255,0.2) 48%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.2) 52%, transparent 55%)",
              transformOrigin: "50% 0",
              filter: "blur(50px) opacity(0.4)",
              zIndex: -1,
              transform: i === 0 ? "rotate(25deg)" : i === 1 ? "rotate(-25deg)" : "rotate(0deg)",
              animation: i === 0
                ? "p-spotlight 20s ease-in-out infinite"
                : i === 1
                  ? "p-spotlight 18s ease-in-out infinite"
                  : "p-spotlight 25s ease-in-out infinite reverse",
            }}
          />
        ))}
      </div>

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0, left: 0,
          pointerEvents: "none",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
    </div>
  );
}
