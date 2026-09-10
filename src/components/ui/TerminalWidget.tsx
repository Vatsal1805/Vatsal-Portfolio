"use client";
import React, { useState, useRef, useEffect } from "react";
import { Terminal, X, ChevronRight } from "lucide-react";

type LogEntry = {
  text: string;
  type: "input" | "output" | "error";
};

const COMMAND_LIST = ["help", "about", "skills", "certs", "projects", "contact", "download-resume", "theme", "hack", "secret", "clear", "exit"];

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [accentColor, setAccentColor] = useState("#E8792E");
  const [history, setHistory] = useState<LogEntry[]>([
    { text: "Vatsal OS v1.0.0 (Warm Terminal)", type: "output" },
    { text: "Type 'help' to see available commands.", type: "output" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hasSeenCerts, setHasSeenCerts] = useState(false);
  const [hasOpenedTerminal, setHasOpenedTerminal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("hasOpenedTerminal") === "true") {
      setHasOpenedTerminal(true);
    }

    const handleScroll = () => {
      const certsEl = document.getElementById("certifications");
      if (certsEl) {
        const rect = certsEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setHasSeenCerts(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenTerminal = () => {
    setIsOpen(true);
    setHasOpenedTerminal(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasOpenedTerminal", "true");
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdText: string) => {
    if (isTyping) return;
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();

    const newEntry: LogEntry = { text: `vatsal@portfolio:~$ ${trimmed}`, type: "input" };
    let outputs: LogEntry[] = [];

    const updatedHistory = [trimmed, ...cmdHistory.filter((c) => c !== trimmed)];
    setCmdHistory(updatedHistory);
    setHistoryIndex(-1);

    if (mainCmd === "sudo") {
      outputs = [
        { text: "Permission denied. vatsal is the ultimate superuser on this system.", type: "error" },
        { text: "This incident has been reported to the system administrator.", type: "output" }
      ];
      setHistory((prev) => [...prev, newEntry, ...outputs]);
      setInputVal("");
      return;
    }

    switch (mainCmd) {
      case "help":
        outputs = [
          { text: "Available commands:", type: "output" },
          { text: "  about            - Summary of who I am", type: "output" },
          { text: "  certs            - Verified AI certifications & badges", type: "output" },
          { text: "  skills           - Current technical expertise", type: "output" },
          { text: "  projects         - Built & shipped applications", type: "output" },
          { text: "  contact          - Channels to reach out", type: "output" },
          { text: "  download-resume  - Trigger PDF download", type: "output" },
          { text: "  theme <color>    - Swap accents (orange, green, blue)", type: "output" },
          { text: "  hack             - Execute matrix bypass sequence", type: "output" },
          { text: "  clear            - Wipe terminal buffer", type: "output" },
          { text: "  exit             - Close terminal overlay", type: "output" },
        ];
        break;

      case "about":
        outputs = [
          { text: "Vatsal Bhavsar | Full-Stack & AI Engineer", type: "output" },
          { text: "B.Tech CSE student (CGPA: 7.76/10) at Parul University.", type: "output" },
          { text: "Oracle Agentic AI Associate & AWS Certified AI Practitioner.", type: "output" },
          { text: "Co-Founder at Converge Digitals | Ex-Software Dev Intern at PTN Events.", type: "output" },
          { text: "Building LLM systems, Agentic workflows (MCP, LangChain), and production MERN apps.", type: "output" },
        ];
        break;

      case "certs":
      case "certifications":
        outputs = [
          { text: "VERIFIED AI CERTIFICATIONS:", type: "output" },
          { text: "  [1] Oracle Agentic AI Foundations Associate (2026)", type: "output" },
          { text: "      - Agent architecture, LangChain, MCP, OCI Agent deployment", type: "output" },
          { text: "  [2] AWS Certified AI Practitioner AIF-C01 (2026)", type: "output" },
          { text: "      - Foundation Models, Amazon Bedrock, SageMaker ML, RAG, Prompt Engineering", type: "output" },
          { text: "Scroll to the Certifications section on the page to verify live badge links.", type: "output" },
        ];
        break;

      case "skills":
        outputs = [
          { text: "CORE TECHNICAL INVENTORY:", type: "output" },
          { text: "  AI & LLM:      LangChain, Gemini API, Hugging Face, MCP, Tool-Calling, RAG", type: "output" },
          { text: "  Languages:     JavaScript (ES6+), Python, TypeScript, C++, SQL", type: "output" },
          { text: "  Frameworks:    React.js, Next.js, Node.js, Express.js, Gradio, Tailwind CSS", type: "output" },
          { text: "  Databases:     MongoDB, MongoDB Atlas, MySQL, ImageKit CDN", type: "output" },
          { text: "  Backend/Cloud: REST APIs, JWT, RBAC, AWS, OCI, Vercel, Git", type: "output" },
        ];
        break;

      case "projects":
        outputs = [
          { text: "FEATURED PRODUCTION BUILDS:", type: "output" },
          { text: "  1. Converge Reviews (Next.js, Supabase, Gemini Flash, Razorpay - Flagship SaaS)", type: "output" },
          { text: "  2. Social Media Content Analyzer (React, Node, Gemini AI, Tesseract.js OCR)", type: "output" },
          { text: "  3. HomeEase - Home Services Marketplace (MERN, JWT, Location/Pincode Filters)", type: "output" },
          { text: "  4. Zomato-Reel Video Platform (React 19, Express 5, ImageKit CDN, Multer RAM stream)", type: "output" },
        ];
        break;

      case "contact":
        outputs = [
          { text: "COMMUNICATION CHANNELS:", type: "output" },
          { text: "  Email:    vatsalbhavsar2011@gmail.com", type: "output" },
          { text: "  LinkedIn: linkedin.com/in/vatsal-bhavsar-3b30092a7/", type: "output" },
          { text: "  GitHub:   github.com/Vatsal1805", type: "output" },
        ];
        break;

      case "download-resume":
        outputs = [
          { text: "Downloading Vatsal_Bhavsar_Resume.pdf...", type: "output" },
        ];
        window.open("/resume.pdf", "_blank");
        break;

      case "theme":
        if (arg === "orange" || arg === "default") {
          setAccentColor("#E8792E");
          outputs = [{ text: "Accent color updated to Burnt Orange (#E8792E).", type: "output" }];
        } else if (arg === "green" || arg === "matrix") {
          setAccentColor("#10B981");
          outputs = [{ text: "Accent color updated to Matrix Green (#10B981).", type: "output" }];
        } else if (arg === "blue" || arg === "cyber") {
          setAccentColor("#3B82F6");
          outputs = [{ text: "Accent color updated to Cyber Blue (#3B82F6).", type: "output" }];
        } else {
          outputs = [
            { text: "Usage: theme <color>", type: "output" },
            { text: "Available themes: orange, green, blue", type: "output" }
          ];
        }
        break;

      case "hack":
        outputs = [
          { text: "> INITIATING UNAUTHORIZED ACCESS...", type: "output" },
          { text: "> BYPASSING FIREWALL... [oh wait, it's my own site]", type: "output" },
          { text: "> DECRYPTING RESTRICTED_DIRECTORY... [########..] 80%", type: "output" },
          { text: "> ACCESS GRANTED. (that was easy, I built the lock too)", type: "output" },
          { text: "", type: "output" },
          { text: "> LOCATING HIDDEN_PROJECT...", type: "output" },
          { text: "> FOUND: linkedin-content-and-leadgen-engine.exe", type: "output" },
          { text: "", type: "output" },
          { text: "  > STATUS: LIVE (internal tool, not publicly deployed)", type: "output" },
          { text: "  > BUILT WITH: Gemini API, PageSpeed API, Places API", type: "output" },
          { text: "  > FUN FACT: caught the AI fabricating data mid-build,", type: "output" },
          { text: "    fired it, wired in real APIs instead. no hard feelings.", type: "output" },
          { text: "", type: "output" },
          { text: "> no public link ? this one runs quietly in the background", type: "output" },
          { text: "  for Converge clients. ask me about it if you're curious.", type: "output" },
          { text: "", type: "output" },
          { text: "> type 'projects' to see the public work, or", type: "output" },
          { text: "> type 'exit' if you're done snooping around", type: "output" },
        ];
        break;

      case "secret":
        outputs = [
          { text: "Easter egg found: 99.9% of bugs were fixed by prompt engineering.", type: "output" },
        ];
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "exit":
        setIsOpen(false);
        setInputVal("");
        return;

      default:
        outputs = [
          { text: `Command not recognized: '${trimmed}'. Type 'help' for options.`, type: "error" },
        ];
        break;
    }

    setHistory((prev) => [...prev, newEntry]);
    setInputVal("");

    if (outputs.length > 0) {
      setIsTyping(true);
      let idx = 0;
      const timer = setInterval(() => {
        if (idx < outputs.length) {
          const line = outputs[idx];
          setHistory((prev) => [...prev, line]);
          idx++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 90);
    } else {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < cmdHistory.length) {
          setHistoryIndex(nextIndex);
          setInputVal(cmdHistory[nextIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <>
      <style>{`@keyframes pulseAmberGlow { 0%, 100% { box-shadow: 0 4px 20px rgba(232, 121, 46, 0.25); } 50% { box-shadow: 0 0 25px rgba(232, 121, 46, 0.85), 0 0 10px rgba(232, 121, 46, 0.6); } }`}</style>
      
      {/* Floating CLI Launch Button */}
      {!isOpen && (
        <button
          onClick={handleOpenTerminal}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full border shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer font-mono text-xs"
          style={{
            background: "#171512",
            borderColor: accentColor,
            color: "#F4EDE3",
            boxShadow: `0 4px 20px ${accentColor}25`,
            animation: hasSeenCerts && !hasOpenedTerminal ? "pulseAmberGlow 1.5s ease-in-out 3" : "none",
          }}
        >
          <Terminal size={15} style={{ color: accentColor }} />
          <span className="hidden sm:inline">vatsal@terminal:~$</span>
        </button>
      )}

      {/* Terminal Overlay Box */}
      {isOpen && (
        <div
          ref={containerRef}
          onClick={handleTerminalClick}
          className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[460px] h-[380px] rounded-xl border flex flex-col overflow-hidden shadow-2xl transition-all"
          style={{
            background: "#0E0D0B",
            borderColor: "#2A241D",
            boxShadow: "0 10px 40px rgba(0,0,0,0.8)",
          }}
        >
          {/* Header Bar */}
          <div
            className="px-4 py-3 border-b flex items-center justify-between select-none"
            style={{ background: "#171512", borderColor: "#2A241D" }}
          >
            <div className="flex items-center gap-2">
              <Terminal size={14} style={{ color: accentColor }} />
              <span className="font-mono text-xs font-semibold text-[#F4EDE3]">
                vatsal@portfolio:~$
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="text-[#A79C8E] hover:text-[#F4EDE3] transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Log Output Area ? data-lenis-prevent enables mouse cursor & touch scrolling */}
          <div
            data-lenis-prevent
            className="flex-1 p-4 font-mono text-xs overflow-y-auto overscroll-contain space-y-2 leading-relaxed"
          >
            {history.map((entry, idx) => (
              <div
                key={idx}
                className={
                  entry.type === "input"
                    ? "text-[#F4EDE3] font-semibold"
                    : entry.type === "error"
                    ? "text-red-400"
                    : "text-[#A79C8E]"
                }
              >
                {entry.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Command Prompt Input Bar */}
          <div
            className="p-3 border-t flex items-center gap-2"
            style={{ background: "#171512", borderColor: "#2A241D" }}
          >
            <ChevronRight size={14} style={{ color: accentColor }} />
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              disabled={isTyping}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isTyping ? "executing..." : "type 'help'..."}
              className="flex-1 bg-transparent font-mono text-xs text-[#F4EDE3] outline-none placeholder-[#A79C8E]/50 disabled:opacity-50"
            />
          </div>
        </div>
      )}
    </>
  );
}
