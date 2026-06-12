"use client";
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, FileText } from "lucide-react";
import type { MouseEvent } from "react";
import ProjectDrawer from "./projects/ProjectDrawer";

export type Project = {
  tag: string;
  title: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  accent: string;
  caseStudy?: {
    problem: string;
    solution: string;
    lessons: string;
    architectureDesc: string;
    diagramType: "social" | "homeease" | "zomato" | "generic";
  };
};

export default function ProjectCard({ p }: { p: Project }) {
  const [isOpen, setIsOpen] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <div style={{ perspective: 1200 }} className="h-full w-full">
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", borderColor: "#2A241D", background: "#171512" }}
        whileHover={{ boxShadow: `0 30px 80px -20px ${p.accent}66` }}
        className="relative h-full min-h-[380px] flex flex-col justify-between rounded-2xl border p-8"
      >
        <div>
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: p.accent, transform: "translateZ(40px)", display: "inline-block" }}>{p.tag}</span>
          <h3 className="font-display mt-3 text-2xl md:text-3xl font-bold" style={{ color: "#F4EDE3", transform: "translateZ(50px)" }}>{p.title}</h3>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#A79C8E", transform: "translateZ(30px)" }}>{p.description}</p>
          <div className="mt-6 flex flex-wrap gap-2" style={{ transform: "translateZ(60px)" }}>
            {p.stack.map((s) => (
              <span key={s} className="rounded-full border px-3 py-1 font-mono text-[10px]" style={{ borderColor: p.accent, color: p.accent }}>{s}</span>
            ))}
          </div>
        </div>
        <div className="mt-8 flex gap-3" style={{ transform: "translateZ(20px)" }}>
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-xs cursor-pointer select-none"
            style={{ background: p.accent, color: "#0E0D0B", fontWeight: "bold" }}
          >
            <FileText size={14} /> View Case Study
          </button>
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md border px-4 py-2 font-mono text-xs hover:border-white/25 transition-colors" style={{ borderColor: "#2A241D", color: "#F4EDE3" }}>
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </motion.div>

      <ProjectDrawer p={p} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}