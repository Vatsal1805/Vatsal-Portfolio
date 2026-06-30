"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experienceItems } from "../data/portfolioData";

export default function Internship() {
  const ref = useRef<HTMLDivElement | null>(null);
  
  // Track scroll progress of the entire internship section
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start center", "end center"] 
  });
  
  const pathLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section 
      id="experience" 
      ref={ref} 
      className="relative w-full px-6 py-32" 
      style={{ background: "transparent" }}
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "var(--color-text-muted)" }}>
          CH.03 — THE PROOF
        </p>
        
        {/* Timeline grid container */}
        <div className="relative mt-16 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          
          {/* Mobile vertical line tracker (Spans full height of the cards layout) */}
          <div className="absolute left-[8px] top-6 bottom-6 w-3 md:hidden pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 12 100" preserveAspectRatio="none" fill="none">
              <path
                d="M 6,0 C 2,25 10,50 6,75 C 2,90 10,95 6,100"
                stroke="var(--color-border-line)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <motion.path
                d="M 6,0 C 2,25 10,50 6,75 C 2,90 10,95 6,100"
                stroke="var(--color-accent-orange)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={pathLength}
                style={{ filter: "drop-shadow(0px 0px 4px var(--color-accent-orange))" }}
              />
            </svg>
          </div>

          {/* Desktop Curved Liquid-Glass Pipeline (Grounded Full-Height grid item) */}
          <div className="hidden md:block w-[120px] h-full min-h-[500px] pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 120 600" preserveAspectRatio="none" fill="none">
              {/* Background tracking guide */}
              <path
                d="M60 0 C 20 150, 100 250, 60 350 C 20 450, 100 550, 60 600"
                stroke="var(--color-border-line)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Liquid glowing progress line */}
              <motion.path
                d="M60 0 C 20 150, 100 250, 60 350 C 20 450, 100 550, 60 600"
                stroke="var(--color-accent-orange)"
                strokeWidth="2.2"
                strokeLinecap="round"
                pathLength={pathLength}
                style={{ filter: "drop-shadow(0px 0px 6px var(--color-accent-orange))" }}
              />
            </svg>
          </div>

          {/* Experience Cards (Stays strictly in Column 2 on desktop) */}
          <div className="space-y-12 pl-8 md:pl-0 z-10">
            {experienceItems.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, filter: "blur(8px)", borderColor: "var(--color-border-line)" }}
                whileInView={{ opacity: 1, filter: "blur(0px)", borderColor: "var(--color-accent-orange)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border p-6 bg-[var(--color-bg-surface)]/30 transition-[background-color] duration-500 hover:bg-[var(--color-bg-surface)]/60"
                style={{ borderWidth: "1px", borderStyle: "solid", willChange: "transform, opacity, filter" }}
                whileHover={{ 
                  borderColor: "var(--color-accent-orange)", 
                  boxShadow: "0 0 15px rgba(232, 121, 46, 0.15)" 
                }}
              >
                <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  {it.role}
                </p>
                <h3 className="font-display mt-2 text-2xl md:text-3xl font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {it.heading}
                </h3>
                
                {it.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {it.tags.map((t) => (
                      <span 
                        key={t} 
                        className="rounded-full border px-3 py-1 font-mono text-[10px] select-none" 
                        style={{ borderColor: "var(--color-accent-orange)", color: "var(--color-accent-orange)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                
                {it.points.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span style={{ color: "var(--color-accent-orange)" }}>—</span>
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