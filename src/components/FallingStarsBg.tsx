"use client";
import { useEffect, useRef } from "react";

export default function FallingStarsBg({
  color = "#E8792E",
  count = 150,
  speedRef,
}: {
  color?: string;
  count?: number;
  speedRef: { current: number };
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    type Star = { x: number; y: number; z: number; pz: number; speed: number };
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
      pz: 0,
      speed: 0.5 + Math.random() * 1.5,
    }));

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);

    let raf = 0;
    const render = () => {
      ctx.fillStyle = "rgba(10,10,15,0.25)";
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      
      let mult = speedRef.current;
      if (speedRef.current > 1) {
        speedRef.current -= (speedRef.current - 1) * 0.06;
        if (speedRef.current < 1) {
          speedRef.current = 1;
        }
        mult = speedRef.current;
      }
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
        const r = Math.max(0.4, (1 - s.z / w) * 2.2);
        ctx.strokeStyle = color;
        ctx.lineWidth = r;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // High-performance nested vector glow (replaces expensive shadowBlur)
        // Outer soft glow halo
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Inner glowing core
        ctx.globalAlpha = 0.35;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Intense center core (white center creates realistic star heat/intensity)
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(sx, sy, r * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [color, count, speedRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}