"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [decodedText, setDecodedText] = useState("");
  const [progress, setProgress] = useState(0);
  const targetText = "[ VATSAL.DEV ]";
  const chars = "!?&@#$%^*+=_-/\<>[]{}";

  // Cipher decryption text effect
  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDecodedText(() => {
        return targetText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return targetText[index];
            }
            if (char === " ") return " ";
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
      });

      iterations += 0.35;
      if (iterations >= targetText.length) {
        clearInterval(interval);
        setDecodedText(targetText);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  // Smooth loading progress bar (0% to 100% over 1.9s)
  useEffect(() => {
    const startTime = performance.now();
    const duration = 1900;
    
    let frameId: number;
    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        frameId = requestAnimationFrame(updateProgress);
      }
    };
    
    frameId = requestAnimationFrame(updateProgress);
    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  // Sleek, ambient non-congested particle canvas (Subtle floating nodes instead of chaotic warp trails)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const isMobile = w < 768;
    // Ultra-clean particle count (16 on mobile, 35 on desktop) to eliminate congestion
    const COUNT = isMobile ? 16 : 35;

    type Particle = {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      vx: number;
      vy: number;
      pulseSpeed: number;
    };

    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.4 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }));

    let rafId = 0;

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Soft ambient center glow
      const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      gradient.addColorStop(0, "rgba(232, 121, 46, 0.06)");
      gradient.addColorStop(1, "rgba(14, 13, 11, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // Render floating subtle amber particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        p.alpha += Math.sin(performance.now() * p.pulseSpeed) * 0.002;
        const clampedAlpha = Math.max(0.08, Math.min(0.5, p.alpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 154, 58, ${clampedAlpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] overflow-hidden flex flex-col justify-between p-8 md:p-12"
      style={{ background: "#0E0D0B" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between pointer-events-none font-mono text-[10px] uppercase tracking-[0.2em] text-[#A79C8E]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8792E] animate-pulse" />
          <span>VATSAL BHAVSAR // PORTFOLIO</span>
        </div>
        <span>SYSTEM_BOOT</span>
      </div>
      
      {/* Centered Monogram & Dynamic Status Text */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pointer-events-none my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          className="font-mono font-bold select-none tracking-[0.1em] text-center"
          style={{
            fontSize: "clamp(26px, 6vw, 54px)",
            color: "var(--color-accent-orange)",
            fontFamily: "var(--font-mono), monospace"
          }}
        >
          {decodedText}
        </motion.div>

        {/* Dynamic Status Text placed below the main monogram */}
        <motion.span 
          key={progress < 30 ? 1 : progress < 65 ? 2 : progress < 90 ? 3 : progress < 100 ? 4 : 5}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.3 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] mt-6 text-center px-4 max-w-md text-[#A79C8E]"
        >
          {progress < 30 
            ? "PROMPTING AI TO DO MY JOB..." 
            : progress < 65 
            ? "FILTERING OUT AI HALLUCINATIONS..." 
            : progress < 90 
            ? "MAKING BUGS LOOK LIKE DESIGN CHOICES..." 
            : progress < 100
            ? "REPLACING DEVELOPER WITH AI (FAILED)..."
            : "LAUNCHED (99.9% HUMAN CODED)"}
        </motion.span>
      </div>

      {/* Loading Progress Bar Container at the bottom */}
      <div className="relative z-10 flex flex-col items-center justify-end pointer-events-none max-w-xs mx-auto w-full">
        <div className="flex justify-between w-full mb-2 font-mono text-[10px] tracking-[0.2em] text-[#A79C8E]">
          <span>LOADING_CORE</span>
          <span style={{ color: "var(--color-accent-orange)" }}>
            {Math.floor(progress).toString().padStart(3, "0")}%
          </span>
        </div>
        
        {/* Loading Bar Track */}
        <div 
          className="w-full h-[2px] relative overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--color-border-line)" }}
        >
          {/* Progress Indicator */}
          <div 
            className="h-full transition-all duration-75 ease-out"
            style={{ 
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--color-accent-orange) 0%, var(--color-accent-amber) 100%)",
              boxShadow: "0 0 8px rgba(232, 121, 46, 0.5)"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
