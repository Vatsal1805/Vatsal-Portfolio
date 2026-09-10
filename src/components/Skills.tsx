"use client";
import React, { useState, useEffect, useRef } from "react";
import { Terminal, FileCode2 } from "lucide-react";

type SkillCategory = "ai_llm" | "languages" | "frameworks" | "backend_cloud";

const SKILLS_DATA = {
  ai_llm: {
    id: "ai_llm",
    name: "ai_llm.json",
    content: `{
  "category": "AI & Agentic Systems",
  "architectures": [
    "Agent Architecture (Reasoning Engine, Orchestration Loop, Tools)",
    "Model Context Protocol (MCP)",
    "RAG (Retrieval-Augmented Generation)"
  ],
  "frameworks_and_apis": [
    "LangChain",
    "Google Gemini API",
    "Hugging Face (Transformers & Pipelines)",
    "Tool-Calling / Function-Calling",
    "Gradio Agent Frontends"
  ],
  "certifications": [
    "Oracle Agentic AI Foundations Associate (2026)",
    "AWS Certified AI Practitioner AIF-C01 (2026)"
  ]
}`
  },
  languages: {
    id: "languages",
    name: "languages.json",
    content: `{
  "category": "Programming Languages",
  "primary": [
    "JavaScript (ES6+)",
    "TypeScript",
    "Python"
  ],
  "systems_and_query": [
    "C++",
    "SQL (Queries, Joins, Schema Design)"
  ]
}`
  },
  frameworks: {
    id: "frameworks",
    name: "frameworks.json",
    content: `{
  "category": "Frontend & UI Engineering",
  "frameworks": [
    "React.js (v18 & v19)",
    "Next.js (App Router)",
    "Tailwind CSS (v3 & v4)",
    "HTML5 / CSS3"
  ],
  "motion_and_effects": [
    "Framer Motion",
    "Lenis Smooth Scroll",
    "Swiper.js",
    "Vaul Drawers"
  ],
  "ui_tooling": [
    "Vite",
    "Shadcn UI",
    "Lucide Icons"
  ]
}`
  },
  backend_cloud: {
    id: "backend_cloud",
    name: "backend_cloud.json",
    content: `{
  "category": "Backend, Databases & Cloud",
  "runtime_and_security": [
    "Node.js",
    "Express.js",
    "REST API Design",
    "JWT Authentication",
    "Role-Based Access Control (RBAC)",
    "Multer Streaming Ingestion"
  ],
  "databases": [
    "MongoDB",
    "MongoDB Atlas",
    "MySQL",
    "Mongoose ODM"
  ],
  "cloud_and_tooling": [
    "AWS",
    "OCI (Oracle Cloud Infrastructure)",
    "Vercel",
    "Render",
    "ImageKit CDN",
    "Git / GitHub",
    "Postman",
    "Antigravity IDE",
    "Cursor IDE"
  ]
}`
  }
};

export default function Skills() {
  const [selectedId, setSelectedId] = useState<SkillCategory>("ai_llm");
  const [typedLength, setTypedLength] = useState(0);
  const [blink, setBlink] = useState(true);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  const selectedContent = SKILLS_DATA[selectedId].content;

  // Typewriter effect (18ms per character for snappy response)
  useEffect(() => {
    setTypedLength(0);
    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= selectedContent.length) {
          clearInterval(interval);
          return selectedContent.length;
        }
        return prev + 2;
      });
    }, 18);
    return () => clearInterval(interval);
  }, [selectedId, selectedContent]);

  // Smooth scroll to top of right panel on file switch (skipped on mount)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  // Cursor blink at 500ms interval
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(t);
  }, []);

  const displayedText = selectedContent.slice(0, typedLength);
  const lines = displayedText.split("\n");

  return (
    <section id="skills" className="relative w-full px-6 py-32 border-t" style={{ borderColor: "#2A241D", background: "transparent" }}>
      {/* Background warmth glow */}
      <div 
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 rounded-full opacity-[0.03] filter blur-[150px]"
        style={{
          background: "radial-gradient(circle, var(--color-accent-orange) 20%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] mb-12 text-left" style={{ color: "var(--color-text-muted)" }}>
          CH.04 // SYSTEM INVENTORY
        </p>

        {/* Dual Panel Layout */}
        <div className="flex flex-col lg:flex-row border border-border-line rounded-xl overflow-hidden bg-bg-surface min-h-[460px]">
          
          {/* Left Panel: File Tree (35% - Hidden on mobile, shown on desktop) */}
          <div 
            className="hidden lg:flex lg:w-[35%] p-6 flex-col justify-start text-left bg-bg-surface select-none border-r border-border-line"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <div className="text-xs text-text-muted mb-6 tracking-wider font-semibold flex items-center gap-2">
              <FileCode2 size={14} className="text-[#E8792E]" />
              <span>stack/</span>
            </div>
            
            <div className="space-y-3">
              {(Object.keys(SKILLS_DATA) as SkillCategory[]).map((key) => {
                const file = SKILLS_DATA[key];
                const isActive = selectedId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedId(key)}
                    className={`flex items-center gap-2 font-mono text-xs cursor-pointer w-full text-left py-2 px-3 transition-all border-l-2 outline-none rounded active:scale-[0.98] ${
                      isActive
                        ? "border-[#E8792E] text-[#E8792E] bg-[#E8792E]/10 font-semibold"
                        : "border-transparent text-[#A79C8E] hover:text-[#F4EDE3] hover:bg-[#171512]"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span className="text-[#E8792E]">{isActive ? "➔" : "📄"}</span>
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-auto pt-8 border-t border-border-line/30">
              <p className="font-mono text-[10px] text-[#A79C8E] leading-relaxed">
                Inspect structured JSON manifests detailing competencies across Agentic AI, Core Languages, Web Frameworks, and Cloud Infrastructure.
              </p>
            </div>
          </div>

          {/* Right Panel: Output Console (65% on desktop, full-width on mobile) */}
          <div 
            ref={rightPanelRef}
            className="w-full lg:w-[65%] p-6 flex flex-col justify-start text-left bg-bg-surface font-mono"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {/* Header Telemetry bar */}
            <div className="flex items-center justify-between border-b border-border-line/55 pb-3 mb-4 select-none gap-4">
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <Terminal size={14} className="text-accent-orange" />
                <span>
                  bash <span className="hidden sm:inline">// compiler_view</span>
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 uppercase tracking-widest shrink-0 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                STATUS: OK
              </span>
            </div>

            {/* Mobile 2x2 grid tab bar */}
            <div className="grid grid-cols-2 lg:hidden gap-2 border-b border-border-line/30 pb-3 mb-4 select-none">
              {(Object.keys(SKILLS_DATA) as SkillCategory[]).map((key) => {
                const file = SKILLS_DATA[key];
                const isActive = selectedId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedId(key)}
                    className={`flex items-center justify-center gap-1.5 font-mono text-[11px] cursor-pointer py-2 px-2.5 border transition-all shrink-0 rounded active:scale-95 ${
                      isActive
                        ? "border-[#E8792E] text-[#E8792E] bg-[#E8792E]/10 font-semibold"
                        : "border-[#2A241D] text-[#A79C8E] hover:text-[#F4EDE3]"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Simulated Command prompt line */}
            <div className="text-xs text-[#A79C8E] mb-2 select-none flex items-center gap-2">
              <span className="text-[#E8792E]">$</span>
              <span>cat stack/{SKILLS_DATA[selectedId].name}</span>
            </div>

            {/* Compiled JSON output console */}
            <pre className="text-[11px] sm:text-xs text-[#F4EDE3] whitespace-pre-wrap font-mono leading-relaxed bg-[#0E0D0B] p-4 rounded border border-[#2A241D] flex-1 min-h-[300px] overflow-x-auto">
              {lines.map((line, i) => (
                <div key={i} className="min-h-[1.2rem]">
                  <span className="text-[#F4EDE3]">{line}</span>
                </div>
              ))}
              {blink ? <span className="text-[#E8792E]">█</span> : <span className="opacity-0">█</span>}
            </pre>
          </div>

        </div>
      </div>
    </section>
  );
}
