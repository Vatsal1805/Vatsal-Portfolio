/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
"use client";
import React from "react";
import { Drawer } from "vaul";
import { X, Github, ExternalLink, Cpu, Database, Server, User } from "lucide-react";
import type { Project } from "../ProjectCard";

type ProjectDrawerProps = {
  p: Project;
  isOpen: boolean;
  onClose: () => void;
};

// Architecture Diagram Components
function ConvergeReviewsArchitecture() {
  return (
    <svg className="w-full h-auto max-w-xl mx-auto my-6" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="500" height="240" rx="12" fill="#171512" stroke="#2A241D" />
      <path d="M85 120 H135" stroke="#D89A3A" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M195 120 H245" stroke="#D89A3A" strokeWidth="2" />
      <path d="M305 85 H365" stroke="#D89A3A" strokeWidth="1.5" />
      <path d="M305 155 H365" stroke="#D89A3A" strokeWidth="1.5" />
      <rect x="15" y="80" width="70" height="80" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="50" y="112" fill="#F4EDE3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">QR Scan</text>
      <text x="50" y="127" fill="#A79C8E" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">/r/[slug]</text>
      <text x="50" y="140" fill="#D89A3A" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">56px Touch</text>
      <rect x="135" y="80" width="60" height="80" rx="8" fill="#0E0D0B" stroke="#D89A3A" filter="url(#glow-gold)" />
      <text x="165" y="112" fill="#F4EDE3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Next.js</text>
      <text x="165" y="127" fill="#A79C8E" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">App &amp; API</text>
      <rect x="245" y="70" width="60" height="100" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="275" y="105" fill="#D89A3A" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Supabase</text>
      <line x1="250" y1="120" x2="300" y2="120" stroke="#2A241D" />
      <text x="275" y="135" fill="#F4EDE3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Multi-Tenant</text>
      <text x="275" y="150" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">RLS Policy</text>
      <rect x="365" y="55" width="85" height="55" rx="6" fill="#0E0D0B" stroke="#2A241D" />
      <text x="407" y="78" fill="#F4EDE3" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Gemini Flash</text>
      <text x="407" y="93" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Anti-AI Drafts</text>
      <rect x="365" y="130" width="85" height="55" rx="6" fill="#0E0D0B" stroke="#2A241D" />
      <text x="407" y="153" fill="#F4EDE3" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Razorpay</text>
      <text x="407" y="168" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Subscriptions</text>
    </svg>
  );
}


function SocialMediaArchitecture() {
  return (
    <svg className="w-full h-auto max-w-xl mx-auto my-6" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Background Grid */}
      <rect width="500" height="240" rx="12" fill="#171512" stroke="#2A241D" />
      
      {/* Connections (Lines) */}
      <path d="M90 120 H150" stroke="#E8792E" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M210 120 H270" stroke="#E8792E" strokeWidth="2" />
      <path d="M330 90 H390" stroke="#E8792E" strokeWidth="1.5" />
      <path d="M330 150 H390" stroke="#E8792E" strokeWidth="1.5" />
      
      {/* Node 1: Client */}
      <rect x="20" y="80" width="70" height="80" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="55" y="115" fill="#F4EDE3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">React</text>
      <text x="55" y="130" fill="#A79C8E" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Frontend</text>
      
      {/* Node 2: API Gateway */}
      <rect x="150" y="80" width="60" height="80" rx="8" fill="#0E0D0B" stroke="#E8792E" filter="url(#glow)" />
      <text x="180" y="115" fill="#F4EDE3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Express</text>
      <text x="180" y="130" fill="#A79C8E" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">API Server</text>
      
      {/* Node 3: Processing Pipeline */}
      <rect x="270" y="60" width="60" height="120" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="300" y="105" fill="#E8792E" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Pipeline</text>
      <line x1="275" y1="120" x2="325" y2="120" stroke="#2A241D" />
      <text x="300" y="135" fill="#F4EDE3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Tesseract</text>
      <text x="300" y="150" fill="#F4EDE3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">OCR + Parse</text>

      {/* Node 4A: Gemini */}
      <rect x="390" y="55" width="90" height="50" rx="6" fill="#0E0D0B" stroke="#2A241D" />
      <text x="435" y="80" fill="#F4EDE3" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Google Gemini</text>
      <text x="435" y="92" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">AI Analysis</text>

      {/* Node 4B: MongoDB */}
      <rect x="390" y="135" width="90" height="50" rx="6" fill="#0E0D0B" stroke="#2A241D" />
      <text x="435" y="160" fill="#F4EDE3" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">MongoDB</text>
      <text x="435" y="172" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Storage</text>
    </svg>
  );
}

function HomeEaseArchitecture() {
  return (
    <svg className="w-full h-auto max-w-xl mx-auto my-6" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="240" rx="12" fill="#171512" stroke="#2A241D" />
      
      {/* Connections */}
      <path d="M120 75 H180" stroke="#D89A3A" strokeWidth="1.5" />
      <path d="M120 120 H180" stroke="#D89A3A" strokeWidth="1.5" />
      <path d="M120 165 H180" stroke="#D89A3A" strokeWidth="1.5" />
      <path d="M260 120 H340" stroke="#D89A3A" strokeWidth="2" />
      <path d="M400 120 H440" stroke="#D89A3A" strokeWidth="1.5" strokeDasharray="3 3" />
      
      {/* Node 1: Multi-role Portals */}
      <rect x="20" y="45" width="100" height="150" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="70" y="65" fill="#A79C8E" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">3 USER PORTALS</text>
      <rect x="30" y="80" width="80" height="22" rx="4" fill="#171512" stroke="#2A241D" />
      <text x="70" y="94" fill="#F4EDE3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Customer</text>
      <rect x="30" y="108" width="80" height="22" rx="4" fill="#171512" stroke="#2A241D" />
      <text x="70" y="122" fill="#F4EDE3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Provider</text>
      <rect x="30" y="136" width="80" height="22" rx="4" fill="#171512" stroke="#2A241D" />
      <text x="70" y="150" fill="#F4EDE3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Platform Admin</text>
      
      {/* Node 2: JWT Security Gate */}
      <rect x="180" y="80" width="80" height="80" rx="8" fill="#0E0D0B" stroke="#D89A3A" />
      <text x="220" y="115" fill="#F4EDE3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">JWT Guard</text>
      <text x="220" y="130" fill="#D89A3A" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">Auth Middleware</text>
      
      {/* Node 3: Controllers & Services */}
      <rect x="340" y="70" width="70" height="100" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="375" y="95" fill="#F4EDE3" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">Controller</text>
      <line x1="345" y1="110" x2="405" y2="110" stroke="#2A241D" />
      <text x="375" y="125" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Bookings</text>
      <text x="375" y="140" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Analytics</text>
      <text x="375" y="155" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Approval Gating</text>

      {/* Node 4: Database */}
      <circle cx="460" cy="120" r="20" fill="#0E0D0B" stroke="#2A241D" />
      <text x="460" y="123" fill="#F4EDE3" fontSize="8" fontFamily="JetBrains Mono" textAnchor="middle">DB</text>
    </svg>
  );
}

function ZomatoReelArchitecture() {
  return (
    <svg className="w-full h-auto max-w-xl mx-auto my-6" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="500" height="240" rx="12" fill="#171512" stroke="#2A241D" />
      
      {/* Connections */}
      <path d="M100 120 H150" stroke="#E8792E" strokeWidth="2" />
      <path d="M220 120 H270" stroke="#E8792E" strokeWidth="1.5" />
      <path d="M340 120 H390" stroke="#E8792E" strokeWidth="2" />
      
      {/* Node 1: Client Uploader */}
      <rect x="25" y="80" width="75" height="80" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="62" y="115" fill="#F4EDE3" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">React Player</text>
      <text x="62" y="130" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">& upload forms</text>
      
      {/* Node 2: Backend Upload middleware */}
      <rect x="150" y="80" width="70" height="80" rx="8" fill="#0E0D0B" stroke="#E8792E" />
      <text x="185" y="115" fill="#F4EDE3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Multer</text>
      <text x="185" y="130" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Stream Buffer</text>
      
      {/* Node 3: ImageKit CDN */}
      <rect x="270" y="80" width="70" height="80" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="305" y="115" fill="#F4EDE3" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">ImageKit</text>
      <text x="305" y="130" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Cloud Media</text>
      
      {/* Node 4: Storage */}
      <rect x="390" y="80" width="85" height="80" rx="8" fill="#0E0D0B" stroke="#2A241D" />
      <text x="432" y="115" fill="#F4EDE3" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">MongoDB</text>
      <text x="432" y="130" fill="#A79C8E" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">Asset URLs</text>
    </svg>
  );
}

export default function ProjectDrawer({ p, isOpen, onClose }: ProjectDrawerProps) {
  // Select diagram based on caseStudy diagramType
  let diagram = null;
  const diagramType = p.caseStudy?.diagramType;
  if (diagramType === "social") {
    diagram = <SocialMediaArchitecture />;
  } else if (diagramType === "homeease") {
    diagram = <HomeEaseArchitecture />;
  } else if (diagramType === "zomato") {
    diagram = <ZomatoReelArchitecture />;
  }

  // Set detailed write-ups based on the caseStudy metadata
  const detailedWriteup = p.caseStudy || {
    problem: "Technical problem statement placeholder...",
    solution: "Technical solution description placeholder...",
    architectureDesc: "System design flow description placeholder...",
    lessons: "Core engineering take-aways and learnings placeholder...",
    steps: [] as string[],
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && onClose()} dismissible={false}>
      <Drawer.Portal>
        {/* Dark warm blur overlay */}
        {/* Dark warm blur overlay */}
        <Drawer.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" />
        <Drawer.Content 
          className="fixed inset-0 z-50 flex h-full w-full flex-col bg-[#0E0D0B] text-[#F4EDE3] focus:outline-none overflow-hidden"
        >
          {/* Scrollable Wrapper - prevents Vaul drag and binds scroll to container */}
          <div 
            data-vaul-no-drag 
            className="flex-1 overflow-y-auto touch-pan-y w-full h-full"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            <div className="px-6 pb-12 pt-12 md:px-12 md:pt-16 w-full max-w-6xl mx-auto">
              
              {/* Header info */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest" style={{ color: p.accent }}>
                    {p.tag}
                  </span>
                  <Drawer.Title className="font-display mt-2 text-3xl font-bold md:text-4xl text-[#F4EDE3]">
                    {p.title}
                  </Drawer.Title>
                </div>
                <button 
                  onClick={onClose}
                  className="rounded-full border border-[#2A241D] bg-[#171512] p-2 text-[#A79C8E] hover:text-[#F4EDE3] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Main Content Sections */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Panel: Writeups */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#E8792E] mb-2 flex items-center gap-2">
                      <Cpu size={14} /> The Problem
                    </h4>
                    <p className="text-sm leading-relaxed text-[#A79C8E]">
                      {detailedWriteup.problem}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#E8792E] mb-2 flex items-center gap-2">
                      <Server size={14} /> The Solution
                    </h4>
                    <p className="text-sm leading-relaxed text-[#A79C8E]">
                      {detailedWriteup.solution}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#E8792E] mb-2 flex items-center gap-2">
                      <Database size={14} /> Technical Lessons
                    </h4>
                    <p className="text-sm leading-relaxed text-[#A79C8E] whitespace-pre-line">
                      {detailedWriteup.lessons}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="pt-4 border-t border-[#2A241D]">
                    <p className="font-mono text-xs uppercase tracking-widest text-[#A79C8E] mb-3">
                      Technologies Utilized
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <span 
                          key={s} 
                          className="rounded-full border border-[#2A241D] bg-[#171512] px-3 py-1 font-mono text-[11px] text-[#F4EDE3]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action buttons inside drawer */}
                  <div className="pt-6 flex gap-4">
                    {p.github && (
                      <a 
                        href={p.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 rounded-md border border-[#2A241D] bg-[#171512] px-5 py-2.5 font-mono text-xs text-[#F4EDE3] hover:border-white/20 transition-all"
                      >
                        <Github size={14} /> View Codebase
                      </a>
                    )}
                    {p.demo && (
                      <a 
                        href={p.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 font-mono text-xs text-white hover:opacity-90 transition-all"
                        style={{ background: p.accent }}
                      >
                        <ExternalLink size={14} /> Launch Live Application
                      </a>
                    )}
                  </div>

                </div>

                {/* Right Panel: Architecture Diagrams & Quick Specs */}
                <div className="lg:col-span-5 rounded-xl border border-[#2A241D] bg-[#171512]/50 p-6 space-y-6">
                  
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#F4EDE3] mb-4 text-center lg:text-left">
                      System Architecture Diagram
                    </h4>
                    {diagram}
                    <p className="font-mono text-[10px] text-[#A79C8E] text-center leading-relaxed mt-2">
                      {detailedWriteup.architectureDesc}
                    </p>

                    {/* Dynamic system architecture step-by-step description lists */}
                    {detailedWriteup.steps && (
                      <div className="border-t border-[#2A241D] pt-4 mt-6">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-[#F4EDE3] mb-3">
                          Data Flow Steps
                        </p>
                        <ol className="list-decimal list-inside space-y-3 font-mono text-[9px] text-[#A79C8E] leading-relaxed">
                          {detailedWriteup.steps.map((step, idx) => {
                            const parts = step.split(":");
                            if (parts.length > 1) {
                              return (
                                <li key={idx} className="pl-1 text-left align-top">
                                  <span className="text-[#F4EDE3] font-semibold">{parts[0]}</span>:
                                  <span>{parts.slice(1).join(":")}</span>
                                </li>
                              );
                            }
                            return (
                              <li key={idx} className="pl-1 text-left align-top">
                                {step}
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    )}
                  </div>

                  {/* Specs Box */}
                  <div className="border-t border-[#2A241D] pt-4 font-mono text-xs space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-[#A79C8E]">PROJECT TYPE:</span>
                      <span className="text-[#F4EDE3]">Solo Engineering Build</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A79C8E]">DEPLOYMENT:</span>
                      <span className="text-[#F4EDE3]">Vercel Edge</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A79C8E]">STATUS:</span>
                      <span className="text-[#E8792E]">Production Ready</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
