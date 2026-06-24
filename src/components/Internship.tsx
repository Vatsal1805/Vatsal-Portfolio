"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const items = [
  {
    heading: "PTN Events, Vadodara",
    role: "Software Developer Intern · Feb 2026 – May 2026",
    tags: ["React.js", "Node.js", "MUI", "RTK Query"],
    points: [] as string[],
  },
  {
    heading: "UI Engineering",
    role: "Frontend",
    tags: [] as string[],
    points: [
      "MUI CRM dashboard features",
      "Circular reveal dark/light theme animation using View Transition API",
      "Global announcement chip system with dismiss/cooldown logic",
      "Permissions module redesign from table to card-based layout",
    ],
  },
  {
    heading: "Backend & APIs",
    role: "Backend",
    tags: [] as string[],
    points: [
      "Full CRUD announcement system with role-based access",
      "Activity module APIs with pin/unpin toggle",
      "RTK Query mutations and optimistic updates",
    ],
  },
  {
    heading: "Refactoring & Architecture",
    role: "Architecture",
    tags: [] as string[],
    points: [
      "Refactored monolithic AddActivity form into 6 modular components",
      "Companies module with search, bulk actions, inline editing, dynamic columns",
      "Config-driven dynamic form rendering",
    ],
  },
];

export default function Internship() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLength = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section id="experience" ref={ref} className="relative w-full px-6 py-32" style={{ background: "transparent" }}>
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#A79C8E" }}>CH.03 — THE PROOF</p>
        
        <div className="relative mt-16 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-8">
          
          {/* Mobile vertical line tracker */}
          <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-[#2A241D] md:hidden rounded-full overflow-hidden">
            <motion.div 
              className="w-full bg-[#E8792E] h-full origin-top"
              style={{ scaleY: pathLength, originY: 0 }}
            />
          </div>

          {/* Desktop Curved Liquid-Glass Pipeline */}
          <svg className="hidden md:block sticky top-32 h-[600px] w-[120px]" viewBox="0 0 120 600" fill="none">
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
              style={{ pathLength }}
            />
          </svg>

          {/* Experience Cards */}
          <div className="space-y-12 pl-8 md:pl-0">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border p-6 bg-[#171512]/30 transition-all duration-500 hover:bg-[#171512]/60"
                style={{ borderColor: "#2A241D" }}
                whileHover={{ borderColor: "rgba(232, 121, 46, 0.3)" }}
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