"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, FileCode, Folder, FolderOpen } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  category: string;
  jsonContent: string;
}

const files: FileItem[] = [
  {
    id: "languages",
    name: "languages.json",
    category: "stack",
    jsonContent: `{
  "category": "Programming Languages",
  "environments": {
    "JavaScript (ES6+)": "V8 Engine / Web Host",
    "C++":               "GCC compiler",
    "Python":            "CPython runtime",
    "SQL":               "Structured Queries"
  },
  "proficiency": {
    "JavaScript": "[██████████░░] 85%",
    "SQL":        "[████████░░░░] 70%",
    "Python":     "[████████░░░░] 65%",
    "C++":        "[████████░░░░] 65%"
  }
}`,
  },
  {
    id: "frontend",
    name: "frontend.json",
    category: "stack",
    jsonContent: `{
  "category": "Frontend Libraries",
  "frameworks": ["React.js", "Tailwind CSS v4", "HTML5", "CSS3", "Material UI"],
  "bundlers":   ["Vite", "Next.js Turbopack"],
  "integrations": {
    "Framer Motion": "[██████████░░] 85%",
    "Lenis Scroll":  "[████████████] 100%"
  }
}`,
  },
  {
    id: "backend",
    name: "backend.json",
    category: "stack",
    jsonContent: `{
  "category": "Backend Engineering",
  "technologies": ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Multer"],
  "architecture": "MVC / Serverless Gateway",
  "security": {
    "JWT Gating": "[██████████░░] 85%",
    "Middleware": "[████████████] 100%"
  }
}`,
  },
  {
    id: "database",
    name: "database.json",
    category: "stack",
    jsonContent: `{
  "category": "Database & Storage",
  "systems": ["MongoDB", "MongoDB Atlas", "MySQL", "ImageKit CDN"],
  "querying": {
    "Mongoose":    "[██████████░░] 80%",
    "Aggregations": "[████████░░░░] 70%"
  }
}`,
  },
  {
    id: "tools",
    name: "devops_tools.json",
    category: "stack",
    jsonContent: `{
  "category": "Tools & Deployments",
  "ecosystem": ["Git", "GitHub", "Vercel", "Postman", "VS Code"],
  "versioning": "Distributed Git Version Control",
  "deployment": {
    "Vercel Edge": "[████████████] 100%",
    "Git Workflows": "[██████████░░] 85%"
  }
}`,
  },
  {
    id: "ai-learning",
    name: "ai_learning.json",
    category: "roadmap",
    jsonContent: `{
  "roadmap": "AI Engineering Path",
  "toolkit": ["Python", "LangChain", "Google Gemini API", "RAG Pipelines", "LangGraph", "Google ADK", "QLoRA", "crewAI"],
  "milestones": {
    "Structured LLM prompts": "Completed",
    "Multi-Agent (crewAI)":  "Completed",
    "RAG Vector Pipelines":   "Completed",
    "QLoRA fine-tuning":      "In Progress"
  },
  "status": "Active Learning trajectory"
}`,
  },
];

export default function Skills() {
  const [selectedFile, setSelectedFile] = useState<FileItem>(files[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [isStackOpen, setIsStackOpen] = useState(true);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(true);

  // Snappy custom typewriter effect that runs when selectedFile changes
  useEffect(() => {
    let active = true;
    setDisplayedText("");
    const textToPrint = selectedFile.jsonContent;
    let index = 0;
    const charsPerStep = 4; // print 4 characters at a time for snappiness

    const timer = setInterval(() => {
      if (!active) return;
      index += charsPerStep;
      if (index >= textToPrint.length) {
        setDisplayedText(textToPrint);
        clearInterval(timer);
      } else {
        setDisplayedText(textToPrint.slice(0, index));
      }
    }, 8);

    return () => {
      active = false;
      clearInterval(timer);
    };
  }, [selectedFile]);

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
        <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-left" style={{ color: "#A79C8E" }}>
          CH.04 — THE SIGNAL
        </p>

        <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.0] text-[#F4EDE3] text-left mb-12">
          SYSTEM<br />
          <span style={{ color: "#E8792E" }}>INVENTORY.</span>
        </h2>

        {/* Compiler Panel Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch border border-[#2A241D] rounded-xl overflow-hidden bg-[#171512]/20 backdrop-blur-sm">
          
          {/* Left Panel: File Tree Explorer */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#2A241D] p-5 flex flex-col justify-start text-left bg-[#171512]/10 select-none">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5147] mb-6 block">
              Explorer // System Stack
            </span>

            {/* Folder 1: Stack Config */}
            <div className="mb-4">
              <button 
                onClick={() => setIsStackOpen(!isStackOpen)}
                className="flex items-center gap-2 font-mono text-xs text-[#F4EDE3] hover:text-[#E8792E] transition-colors cursor-pointer w-full"
              >
                {isStackOpen ? <FolderOpen size={14} className="text-[#E8792E]" /> : <Folder size={14} className="text-[#A79C8E]" />}
                <span>stack_config</span>
              </button>

              {isStackOpen && (
                <div className="pl-4 mt-2 space-y-1.5 border-l border-[#2A241D]/60 ml-1.5">
                  {files
                    .filter((f) => f.category === "stack")
                    .map((file) => (
                      <button
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        className={`flex items-center gap-2 font-mono text-xs cursor-pointer w-full text-left py-0.5 rounded px-2 transition-colors ${
                          selectedFile.id === file.id
                            ? "bg-[#E8792E]/10 text-[#E8792E]"
                            : "text-[#A79C8E] hover:text-[#F4EDE3]"
                        }`}
                      >
                        <FileCode size={13} />
                        <span>{file.name}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            {/* Folder 2: Roadmap */}
            <div>
              <button 
                onClick={() => setIsRoadmapOpen(!isRoadmapOpen)}
                className="flex items-center gap-2 font-mono text-xs text-[#F4EDE3] hover:text-[#E8792E] transition-colors cursor-pointer w-full"
              >
                {isRoadmapOpen ? <FolderOpen size={14} className="text-[#E8792E]" /> : <Folder size={14} className="text-[#A79C8E]" />}
                <span>learning_roadmap</span>
              </button>

              {isRoadmapOpen && (
                <div className="pl-4 mt-2 space-y-1.5 border-l border-[#2A241D]/60 ml-1.5">
                  {files
                    .filter((f) => f.category === "roadmap")
                    .map((file) => (
                      <button
                        key={file.id}
                        onClick={() => setSelectedFile(file)}
                        className={`flex items-center gap-2 font-mono text-xs cursor-pointer w-full text-left py-0.5 rounded px-2 transition-colors ${
                          selectedFile.id === file.id
                            ? "bg-[#E8792E]/10 text-[#E8792E]"
                            : "text-[#A79C8E] hover:text-[#F4EDE3]"
                        }`}
                      >
                        <FileCode size={13} />
                        <span>{file.name}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <div className="mt-auto pt-8 border-t border-[#2A241D]/30 hidden lg:block">
              <p className="font-mono text-[9px] text-[#5C5147] leading-relaxed">
                Click on the json files to compile and inspect the core proficiencies and active roadmap of the developer.
              </p>
            </div>
          </div>

          {/* Right Panel: Compiler Output Console */}
          <div className="lg:col-span-8 p-5 flex flex-col justify-start text-left bg-[#0E0D0B]/40 font-mono">
            
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
              <span className="text-[#E8792E]">visitor@vatsal-portfolio:~$</span> cat {selectedFile.category === "stack" ? "stack_config" : "learning_roadmap"}/{selectedFile.name}
            </div>

            {/* Compiled JSON output console */}
            <pre className="text-[11px] sm:text-xs text-[#F4EDE3] whitespace-pre-wrap font-mono leading-relaxed bg-[#0E0D0B]/20 p-4 rounded border border-[#2A241D]/35 flex-1 min-h-[280px]">
              {displayedText}
              <span className="animate-pulse duration-700 text-[#E8792E]">█</span>
            </pre>
          </div>

        </div>
      </div>
    </section>
  );
}