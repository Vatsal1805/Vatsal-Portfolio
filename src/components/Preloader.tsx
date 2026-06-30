"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export default function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [decodedText, setDecodedText] = useState("");
  const targetText = "[ VATSAL.SYS ]";
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
      
      {/* Centered Monogram - Interactive Cipher Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
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
      </div>

      <div className="absolute inset-0 flex items-end justify-center pb-16 z-10">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: "var(--color-text-muted)" }}
        >
          Initializing Portfolio
        </motion.span>
      </div>
    </motion.div>
  );
}