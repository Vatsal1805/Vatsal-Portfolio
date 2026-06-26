"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experienceItems } from "../data/portfolioData";

export default function Internship() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section id="experience" ref={ref} className="relative w-full px-6 py-32" style={{ background: "transparent" }}>
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#A79C8E" }}>CH.03 — THE PROOF</p>
        
        <div className="relative mt-16 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          
          {/* Mobile vertical line tracker (Double-path SVG with fill animation) */}
          <div className="absolute left-3 top-2 bottom-2 w-4 md:hidden">
            <svg className="w-full h-full" viewBox="0 0 16 100" preserveAspectRatio="none" fill="none">
              <path
                d="M 8,0 L 8,100"
                stroke="#2A241D"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.path
                d="M 8,0 L 8,100"
                stroke="#E8792E"
                strokeWidth="2"
                strokeLinecap="round"
                pathLength={pathLength}
                style={{ filter: "drop-shadow(0px 0px 6px rgba(232, 121, 46, 0.5))" }}
              />
            </svg>
          </div>

          {/* Desktop Curved Liquid-Glass Pipeline (Sticky Timeline Tracker) */}
          <svg className="hidden md:block sticky top-32 h-[70vh] w-[120px]" viewBox="0 0 120 600" fill="none">
            {/* Background tracking guide */}
            <path
              d="M60 0 C 20 150, 100 250, 60 350 C 20 450, 100 550, 60 600"
              stroke="#2A241D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Liquid glowing progress line */}
            <motion.path
              d="M60 0 C 20 150, 100 250, 60 350 C 20 450, 100 550, 60 600"
              stroke="#E8792E"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={pathLength}
              style={{ filter: "drop-shadow(0px 0px 6px rgba(232, 121, 46, 0.5))" }}
            />
          </svg>

          {/* Experience Cards */}
          <div className="space-y-12 pl-8 md:pl-0">
            {experienceItems.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: "blur(8px)", borderColor: "#2A241D" }}
                whileInView={{ opacity: 1, filter: "blur(0px)", borderColor: "#E8792E" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                className="rounded-xl border p-6 bg-[#171512]/30 transition-[background-color] duration-500 hover:bg-[#171512]/60"
                style={{ borderWidth: "1px", borderStyle: "solid", willChange: "transform, opacity, filter" }}
                whileHover={{ borderColor: "rgba(232, 121, 46, 0.8)", boxShadow: "0 0 15px rgba(232, 121, 46, 0.2)" }}
              >
                <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#A79C8E" }}>{it.role}</p>
                <h3 className="font-display mt-2 text-2xl md:text-3xl font-semibold" style={{ color: "#F4EDE3" }}>{it.heading}</h3>
                
                {it.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                      <span 
                        key={t} 
                        className="rounded-full border px-3 py-1 font-mono text-[10px] select-none" 
                        style={{ borderColor: "#E8792E", color: "#E8792E" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                
                {it.points.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm" style={{ color: "#A79C8E" }}>
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span style={{ color: "#E8792E" }}>—</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}