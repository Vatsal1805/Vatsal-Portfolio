"use client";
import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

type SkillCategory = "frontend" | "backend" | "devops" | "learning";

const SKILLS_DATA = {
  frontend: {
    id: "frontend",
    name: "frontend.json",
    content: `{
  "category": "Frontend Engineering",
  "frameworks": [
    "React.js",
    "Next.js",
    "Tailwind CSS v4",
    "HTML5 / CSS3",
    "Material UI"
  ],
  "tooling": [
    "Vite",
    "Turbopack"
  ],
  "animations": [
    "Framer Motion",
    "Lenis Scroll"
  ]
}

`
  },
  backend: {
    id: "backend",
    name: "backend.json",
    content: `{
  "category": "Backend & Database Systems",
  "technologies": [
    "Node.js",
    "Express.js",
    "REST APIs",
    "JWT Authentication",
    "Multer Ingestion"
  ],
  "databases": [
    "MongoDB",
    "MongoDB Atlas",
    "MySQL",
    "Mongoose ORM",
    "ImageKit CDN"
  ],
  "architecture": "MVC / Serverless Gateway"
}

`
  },
  devops: {
    id: "devops",
    name: "devops.json",
    content: `{
  "category": "DevOps & Tooling",
  "ecosystem": [
    "Git",
    "GitHub",
    "Vercel",
    "Postman",
    "VS Code"
  ],
  "workflows": "CI/CD & Git Flow versioning",
  "deployments": "Vercel Edge & CDN routing"
}

`
  },
  learning: {
    id: "learning",
    name: "learning.json",
    content: `{
  "category": "AI Engineering",
  "ai_toolkit": [
    "LangChain",
    "Google Gemini API",
    "Hugging Face Transformers",
    "RAG Fundamentals",
    "Tool / Function Calling",
    "Agent Architecture (MCP)",
    "Prompt Engineering"
  ],
  "roadmap": [
    "Multi-agent systems",
    "Fine-tuning & quantization",
    "Production LLM deployment"
  ],
  "status": "Active AI Engineering Learning Path"
}

`
  }
};

export default function Skills() {
  const [selectedId, setSelectedId] = useState<SkillCategory>("frontend");
  const [typedLength, setTypedLength] = useState(0);
  const [blink, setBlink] = useState(true);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const isFirstRender = useRef(true);

  const selectedContent = SKILLS_DATA[selectedId].content;

  // Typewriter effect (18ms per character)
  useEffect(() => {
    setTypedLength(0);
    const interval = setInterval(() => {
      setTypedLength((prev) => {
        if (prev >= selectedContent.length) {
          clearInterval(interval);
          return selectedContent.length;
        }
        return prev + 1;
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

  const renderLineWithColor = (line: string) => {
    // Check if this line is a telemetry bar line, e.g., containing [████████░░░░]
    const match = line.match(/^(\s*\[)([█░]+)(\].*)$/);
    if (match) {
      const [, before, blocks, after] = match;
      return (
        <>
          <span className="text-text-muted">{before}</span>
          {Array.from(blocks).map((char, i) => {
            if (char === "█") {
              return <span key={i} className="text-accent-orange">█</span>;
            } else {
              return <span key={i} className="text-border-line">░</span>;
            }
          })}
          <span className="text-text-primary">{after}</span>
        </>
      );
    }
    
    if (line.startsWith("--")) {
      return <span className="text-text-muted font-semibold">{line}</span>;
    }
    
    return <span className="text-text-primary">{line}</span>;
  };

  return (
    <section id="skills" className="relative w-full px-6 py-32" style={{ background: "transparent" }}>
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
        <div className="flex flex-col lg:flex-row border border-border-line rounded-xl overflow-hidden bg-bg-surface min-h-[500px]">
          
          {/* Left Panel: File Tree (35% - Hidden on mobile, shown on desktop) */}
          <div 
            className="hidden lg:flex lg:w-[35%] p-6 flex-col justify-start text-left bg-bg-surface select-none border-r border-border-line"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <div className="text-xs text-text-muted mb-6 tracking-wider font-semibold">
              stack/
            </div>
            
            <div className="space-y-3">
              {(Object.keys(SKILLS_DATA) as SkillCategory[]).map((key) => {
                const file = SKILLS_DATA[key];
                const isActive = selectedId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedId(key)}
                    className={`flex items-center gap-2 font-mono text-sm cursor-pointer w-full text-left py-1.5 px-3 transition-all border-l-2 focus-visible:ring-1 focus-visible:ring-accent-orange/50 outline-none rounded active:scale-[0.98] ${
                      isActive
                        ? "border-accent-orange text-accent-orange bg-accent-orange/5"
                        : "border-transparent text-text-primary hover:text-accent-orange"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span>▸</span>
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-auto pt-8 border-t border-border-line/30">
              <p className="font-mono text-[9px] text-text-faint leading-relaxed">
                Click on the json files to compile and inspect the core proficiencies and active roadmap of the developer.
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
              <span className="text-[9px] text-text-faint uppercase tracking-widest shrink-0">
                Status: Compiled OK
              </span>
            </div>

            {/* Mobile 2x2 grid tab bar (visible below lg screen size - no horizontal scroll) */}
            <div className="grid grid-cols-2 lg:hidden gap-2 border-b border-border-line/30 pb-3 mb-4 select-none">
              {(Object.keys(SKILLS_DATA) as SkillCategory[]).map((key) => {
                const file = SKILLS_DATA[key];
                const isActive = selectedId === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedId(key)}
                    className={`flex items-center justify-center gap-1.5 font-mono text-xs cursor-pointer py-2 px-3 border transition-all shrink-0 rounded active:scale-95 ${
                      isActive
                        ? "border-accent-orange text-accent-orange bg-accent-orange/5 font-semibold"
                        : "border-border-line/40 text-text-muted hover:text-accent-orange"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span>▸</span>
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Simulated Command prompt line */}
            <div className="text-xs text-text-muted mb-2 select-none">
              $ cat stack/{SKILLS_DATA[selectedId].name}
            </div>

            {/* Compiled JSON output console */}
            <pre className="text-[11px] sm:text-xs text-text-primary whitespace-pre-wrap font-mono leading-relaxed bg-bg-base/40 p-4 rounded border border-border-line/35 flex-1 min-h-[320px] overflow-x-auto">
              {lines.map((line, i) => (
                <div key={i} className="min-h-[1.2rem]">
                  {renderLineWithColor(line)}
                </div>
              ))}
              {blink ? <span className="text-accent-orange">█</span> : <span className="opacity-0">█</span>}
            </pre>
          </div>

        </div>
      </div>
    </section>
  );
}