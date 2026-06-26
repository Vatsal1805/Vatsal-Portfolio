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
  "category": "Foundations & AI Roadmap",
  "languages": [
    "JavaScript (ES6+)",
    "SQL",
    "Python",
    "C++"
  ],
  "ai_toolkit": [
    "LangChain",
    "Google Gemini API",
    "RAG Pipelines",
    "LangGraph",
    "crewAI Multi-Agent",
    "QLoRA Fine-Tuning"
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
          <span className="text-[#A79C8E]">{before}</span>
          {Array.from(blocks).map((char, i) => {
            if (char === "█") {
              return <span key={i} className="text-[#E8792E]">█</span>;
            } else {
              return <span key={i} className="text-[#2A241D]">░</span>;
            }
          })}
          <span className="text-[#F4EDE3]">{after}</span>
        </>
      );
    }
    
    if (line.startsWith("--")) {
      return <span className="text-[#A79C8E] font-semibold">{line}</span>;
    }
    
    return <span className="text-[#F4EDE3]">{line}</span>;
  };

  return (
    <section id="skills" className="relative w-full px-6 py-32" style={{ background: "transparent" }}>
      {/* Background warmth glow */}
      <div 
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 rounded-full opacity-[0.03] filter blur-[150px]"
        style={{
          background: "radial-gradient(circle, #E8792E 20%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] mb-12 text-left" style={{ color: "#A79C8E" }}>
          CH.04 // SYSTEM INVENTORY
        </p>

        {/* 35% / 65% Dual Panel Layout */}
        <div className="flex flex-col lg:flex-row border border-[#2A241D] rounded-xl overflow-hidden bg-[#171512] min-h-[500px]">
          
          {/* Left Panel: File Tree (35%) */}
          <div 
            className="w-full lg:w-[35%] p-6 flex flex-col justify-start text-left bg-[#171512] select-none border-b lg:border-b-0 lg:border-r border-[#2A241D]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <div className="text-xs text-[#A79C8E] mb-6 tracking-wider font-semibold">
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
                    className={`flex items-center gap-2 font-mono text-sm cursor-pointer w-full text-left py-1.5 px-3 transition-all border-l-2 ${
                      isActive
                        ? "border-[#E8792E] text-[#E8792E] bg-[#E8792E]/5"
                        : "border-transparent text-[#F4EDE3] hover:text-[#E8792E]"
                    }`}
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    <span>▸</span>
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-auto pt-8 border-t border-[#2A241D]/30 hidden lg:block">
              <p className="font-mono text-[9px] text-[#5C5147] leading-relaxed">
                Click on the json files to compile and inspect the core proficiencies and active roadmap of the developer.
              </p>
            </div>
          </div>

          {/* Right Panel: Output Console (65%) */}
          <div 
            ref={rightPanelRef}
            className="w-full lg:w-[65%] p-6 flex flex-col justify-start text-left bg-[#171512] font-mono border-t lg:border-t-0"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {/* Header Telemetry bar */}
            <div className="flex items-center justify-between border-b border-[#2A241D]/55 pb-3 mb-4 select-none">
              <div className="flex items-center gap-2 text-xs text-[#A79C8E]">
                <Terminal size={14} className="text-[#E8792E]" />
                <span>bash // compiler_view</span>
              </div>
              <span className="text-[9px] text-[#5C5147] uppercase tracking-widest">
                Status: Compiled OK
              </span>
            </div>

            {/* Simulated Command prompt line */}
            <div className="text-xs text-[#A79C8E] mb-2 select-none">
              $ cat stack/{SKILLS_DATA[selectedId].name}
            </div>

            {/* Compiled JSON output console */}
            <pre className="text-[11px] sm:text-xs text-[#F4EDE3] whitespace-pre-wrap font-mono leading-relaxed bg-[#0E0D0B]/40 p-4 rounded border border-[#2A241D]/35 flex-1 min-h-[320px] overflow-x-auto">
              {lines.map((line, i) => (
                <div key={i} className="min-h-[1.2rem]">
                  {renderLineWithColor(line)}
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