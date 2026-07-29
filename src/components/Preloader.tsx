"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [decodedText, setDecodedText] = useState("");
  const [progress, setProgress] = useState(0);
  const targetText = "[ VATSAL.DEV ]";
  const chars = "!?&@#$%^*+=_-/\\<>[]{}";

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

      iterations += 0.35; // Speed of decoding letters
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

  // Symmetric hyper-speed star tunnel animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Dynamic sizing variables
    const isMobile = window.innerWidth < 768;
    const COUNT = isMobile ? 85 : 180;
    const maxDim = Math.max(w, h); // Symmetrical bounds prevent mobile squeezing

    type Star = { x: number; y: number; z: number; pz: number; speed: number };
    const stars: Star[] = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * maxDim,
      y: (Math.random() - 0.5) * maxDim,
      z: Math.random() * maxDim,
      pz: 0,
      speed: 0.7 + Math.random() * 1.5,
    }));

    const start = performance.now();
    let raf = 0;
    const starColor = "#D89A3A"; // Soft gold
    const trailColor = "rgba(232, 121, 46, 0.4)"; // Faint warm orange

    const render = (now: number) => {
      const t = (now - start) / 1000;
      // High initial warp speed, easing down smoothly
      const mult = t < 1.3 ? 12 : Math.max(2, 12 - (t - 1.3) * 11);
      
      ctx.fillStyle = "rgba(10,10,15,0.3)";
      ctx.fillRect(0, 0, w, h);
      
      const cx = w / 2;
      const cy = h / 2;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= s.speed * mult * 4.5;
        if (s.z < 1) {
          s.x = (Math.random() - 0.5) * maxDim;
          s.y = (Math.random() - 0.5) * maxDim;
          s.z = maxDim;
          s.pz = s.z;
        }

        // Project coordinate math symmetrically relative to maxDim bounds
        const sx = (s.x / s.z) * maxDim + cx;
        const sy = (s.y / s.z) * maxDim + cy;
        const px = (s.x / s.pz) * maxDim + cx;
        const py = (s.y / s.pz) * maxDim + cy;
        const r = Math.max(0.4, (1 - s.z / maxDim) * 2.2);

        // Draw trail lines
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = r * 0.75;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // Render low-cost glow core (double-fill is battery friendly)
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = starColor;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 0.9;
        ctx.fillStyle = starColor;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] overflow-hidden"
      style={{ background: "#0E0D0B" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      
      {/* Centered Monogram & Dynamic Status Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-[1]">
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
            fontSize: "clamp(24px, 5vw, 48px)",
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
          className="font-mono text-[10px] uppercase tracking-[0.25em] mt-6 text-center px-6 max-w-md"
          style={{ color: "var(--color-text-muted)" }}
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
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 z-10 pointer-events-none">
        <div 
          className="flex justify-between w-64 mb-2 font-mono text-[10px] tracking-[0.2em]"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span>SYSTEM_INIT</span>
          <span style={{ color: "var(--color-accent-orange)" }}>
            {Math.floor(progress).toString().padStart(3, "0")}%
          </span>
        </div>
        
        {/* Loading Bar Track */}
        <div 
          className="w-64 h-[2px] relative overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--color-border-line)" }}
        >
          {/* Progress Indicator */}
          <div 
            className="h-full transition-all duration-75 ease-out"
            style={{ 
              width: `${progress}%`,
              background: "linear-gradient(90deg, var(--color-accent-orange) 0%, var(--color-accent-amber) 100%)",
              boxShadow: "0 0 6px rgba(232, 121, 46, 0.4)"
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}