"use client";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

const categories = [
  { name: "Languages", items: ["JavaScript (ES6+)", "C++", "Python", "SQL"] },
  { name: "Frontend", items: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "MUI"] },
  { name: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT Auth"] },
  { name: "Database", items: ["MongoDB", "MongoDB Atlas", "MySQL"] },
  { name: "Tools & Cloud", items: ["Git", "GitHub", "Vercel", "Postman", "VS Code"] },
];

const learning = [
  { icon: "🐍", label: "Python" },
  { icon: "🔗", label: "LangChain" },
  { icon: "🤖", label: "Google Gemini API" },
  { icon: "📚", label: "RAG Pipelines" },
  { icon: "🕸", label: "LangGraph" },
  { icon: "🛠", label: "Google ADK" },
  { icon: "🔬", label: "QLoRA Fine-tuning" },
  { icon: "👥", label: "Multi-Agent (crewAI)" },
];

function LearnIcon({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const start = i / learning.length;
  const end = start + 1 / learning.length;
  const z = useTransform(progress, [start, end], [-100, 40]);
  const rx = useTransform(progress, [start, end], [60, 0]);
  const op = useTransform(progress, [start, end], [0.3, 1]);
  return (
    <motion.div
      style={{ translateZ: z, rotateX: rx, opacity: op, transformStyle: "preserve-3d", borderColor: "#2A241D", background: "#171512" }}
      className="flex items-center gap-3 rounded-full border px-4 py-2"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border text-lg" style={{ borderColor: "#E8792E" }}>{learning[i].icon}</span>
      <span className="font-mono text-xs" style={{ color: "#F4EDE3" }}>{learning[i].label}</span>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section id="skills" ref={ref} className="relative w-full px-6 py-32" style={{ background: "#0E0D0B" }}>
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#A79C8E" }}>CH.04 — THE SIGNAL</p>
        <div className="mt-12 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold" style={{ color: "#F4EDE3" }}>Current Stack</h2>
            <div className="mt-8 space-y-8">
              {categories.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                  whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "#A79C8E" }}>{c.name}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.items.map((it) => (
                      <span key={it} className="rounded-full px-3 py-1 text-sm" style={{ background: "#171512", border: "1px solid #2A241D", color: "#F4EDE3" }}>{it}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="md:pl-12 md:border-l" style={{ borderColor: "#2A241D" }}>
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "#E8792E" }}>Currently Learning</p>
            <h2 className="font-display mt-2 text-3xl md:text-4xl font-bold" style={{ color: "#F4EDE3" }}>Building toward AI Engineering</h2>
            <div style={{ perspective: 700 }} className="mt-8 flex flex-wrap gap-3">
              {learning.map((_, i) => (
                <LearnIcon key={i} i={i} progress={scrollYProgress} />
              ))}
            </div>
            <p className="mt-8 text-sm" style={{ color: "#A79C8E" }}>
              6-month structured roadmap: Python → Prompt Engineering → LangChain → RAG → Agents → Fine-tuning
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}