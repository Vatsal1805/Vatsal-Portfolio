"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Preloader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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

    const COUNT = 220;
    type Star = { x: number; y: number; z: number; pz: number; speed: number };
    const stars: Star[] = Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
      pz: 0,
      speed: 0.6 + Math.random() * 1.8,
    }));

    const start = performance.now();
    let raf = 0;
    const starColor = "#D89A3A";
    const trailColor = "rgba(232, 121, 46, 0.45)";

    const render = (now: number) => {
      const t = (now - start) / 1000;
      // Speed ramps high then eases down
      const mult = t < 1.5 ? 10 : Math.max(2, 10 - (t - 1.5) * 10);
      ctx.fillStyle = "rgba(10,10,15,0.35)";
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      for (const s of stars) {
        s.pz = s.z;
        s.z -= s.speed * mult * 4;
        if (s.z < 1) {
          s.x = (Math.random() - 0.5) * w;
          s.y = (Math.random() - 0.5) * h;
          s.z = w;
          s.pz = s.z;
        }
        const sx = (s.x / s.z) * w + cx;
        const sy = (s.y / s.z) * w + cy;
        const px = (s.x / s.pz) * w + cx;
        const py = (s.y / s.pz) * w + cy;
        const r = Math.max(0.4, (1 - s.z / w) * 2.6);
        ctx.strokeStyle = trailColor;
        ctx.lineWidth = r;
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        ctx.shadowBlur = 14;
        ctx.shadowColor = starColor;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 1.4, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.fill();
        ctx.shadowBlur = 0;
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
      
      {/* Centered VB Monogram */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 0.8, ease: "easeOut" },
            scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          className="font-display font-bold select-none tracking-[0.15em] uppercase text-center"
          style={{
            fontSize: "clamp(80px, 15vw, 140px)",
            color: "#E8792E",
          }}
        >
          VB
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-end justify-center pb-16 z-10">
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="font-mono text-[11px] uppercase tracking-[0.3em]"
          style={{ color: "#A79C8E" }}
        >
          Initializing Portfolio
        </motion.span>
      </div>
    </motion.div>
  );
}