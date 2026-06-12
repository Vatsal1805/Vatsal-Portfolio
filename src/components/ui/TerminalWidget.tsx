"use client";
import React, { useState, useRef, useEffect } from "react";
import { Terminal, X, ChevronRight } from "lucide-react";

type LogEntry = {
  text: string;
  type: "input" | "output" | "error";
};

const COMMAND_LIST = ["help", "about", "skills", "projects", "contact", "download-resume", "clear", "exit"];

export default function TerminalWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<LogEntry[]>([
    { text: "Vatsal OS v1.0.0 (Warm Terminal)", type: "output" },
    { text: "Type 'help' to see available commands.", type: "output" },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of log
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Focus input when terminal is opened or clicked
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const cmd = trimmed.toLowerCase();
    const newEntry: LogEntry = { text: `vatsal@portfolio:~$ ${trimmed}`, type: "input" };
    let outputs: LogEntry[] = [];

    // Add to command history
    const updatedHistory = [trimmed, ...cmdHistory.filter((c) => c !== trimmed)];
    setCmdHistory(updatedHistory);
    setHistoryIndex(-1);

    switch (cmd) {
      case "help":
        outputs = [
          { text: "Available commands:", type: "output" },
          { text: "  about            - Summary of who I am", type: "output" },
          { text: "  skills           - Current technical expertise", type: "output" },
          { text: "  projects         - Built & shipped applications", type: "output" },
          { text: "  contact          - Channels to reach out", type: "output" },
          { text: "  download-resume  - Trigger PDF download", type: "output" },
          { text: "  clear            - Wipe output history", type: "output" },
          { text: "  exit             - Close terminal window", type: "output" },
        ];
        break;
      case "about":
        outputs = [
          { text: "Vatsal Bhavsar — CSE Graduate (May 2026)", type: "output" },
          { text: "A product-minded Full-Stack developer based in Ahmedabad, IN.", type: "output" },
          { text: "Focused on building performant MERN systems and GenAI integrations.", type: "output" },
        ];
        break;
      case "skills":
        outputs = [
          { text: "Languages:  [██████████░░] JS (ES6+), C++, Python, SQL", type: "output" },
          { text: "Frontend:   [███████████░] React, Tailwind, Next.js, MUI", type: "output" },
          { text: "Backend:    [█████████░░░] Node.js, Express, REST APIs, JWT", type: "output" },
          { text: "Databases:  [██████████░░] MongoDB, MySQL, Redis", type: "output" },
          { text: "AI Toolkit: [████████░░░░] LangChain, LangGraph, Gemini API", type: "output" },
        ];
        break;
      case "projects":
        outputs = [
          { text: "1. Social Media Content Analyzer (React, Node, Gemini, Tesseract.js)", type: "output" },
          { text: "   AI-driven dashboard with image/PDF OCR parsing & sentiment vectors.", type: "output" },
          { text: "2. HomeEase Marketplace (React, Node, Express, MongoDB, JWT)", type: "output" },
          { text: "   Multi-role on-demand booking flows with secure permission guards.", type: "output" },
          { text: "3. Zomato-Reel Platform (React, Node, Multer, ImageKit.io)", type: "output" },
          { text: "   Media ingestion pipeline resolving device-specific buffering delays.", type: "output" },
        ];
        break;
      case "contact":
        outputs = [
          { text: "Mail:     vatsalbhavsar2011@gmail.com", type: "output" },
          { text: "LinkedIn: linkedin.com/in/vatsal-bhavsar", type: "output" },
          { text: "GitHub:   github.com/Vatsal1805", type: "output" },
        ];
        break;
      case "download-resume":
        outputs = [{ text: "Initializing resume PDF retrieval...", type: "output" }];
        // Trigger download of a mock/actual resume file
        setTimeout(() => {
          window.open("https://github.com/Vatsal1805", "_blank");
        }, 800);
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
          { text: `bash: command not found: ${trimmed}. Type 'help' for assistance.`, type: "error" },
        ];
        break;
    }

    setHistory((prev) => [...prev, newEntry, ...outputs]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < cmdHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
        style={{
          background: "#171512",
          borderColor: isOpen ? "#E8792E" : "#2A241D",
          boxShadow: isOpen
            ? "0 0 20px rgba(232,121,46,0.3)"
            : "0 10px 30px rgba(0,0,0,0.6)",
        }}
        aria-label="Toggle CLI terminal"
      >
        {isOpen ? (
          <X className="h-5 w-5" style={{ color: "#E8792E" }} />
        ) : (
          <Terminal className="h-5 w-5" style={{ color: "#F4EDE3" }} />
        )}
      </button>

      {/* Terminal Window Overlay */}
      {isOpen && (
        <div
          ref={containerRef}
          onClick={handleTerminalClick}
          className="fixed bottom-22 right-6 z-40 flex w-[90vw] sm:w-[400px] h-[340px] flex-col rounded-xl border overflow-hidden shadow-2xl transition-all font-mono text-xs"
          style={{
            background: "#0E0D0B",
            borderColor: "#2A241D",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.7)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between border-b px-4 py-2"
            style={{ background: "#171512", borderColor: "#2A241D" }}
          >
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-2 text-[10px] text-[#A79C8E] uppercase tracking-wider font-semibold">
                vatsal@terminal:~
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#5C5147] hover:text-[#F4EDE3] transition-colors"
            >
              <X size={14} />
            </button>
          </div>

          {/* Console Area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 select-text">
            {history.map((h, i) => (
              <div
                key={i}
                className="leading-relaxed break-all whitespace-pre-wrap"
                style={{
                  color:
                    h.type === "input"
                      ? "#F4EDE3"
                      : h.type === "error"
                      ? "#ea580c"
                      : "#A79C8E",
                }}
              >
                {h.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Command Input Area */}
          <div
            className="flex items-center border-t px-4 py-2 gap-1"
            style={{ background: "#171512", borderColor: "#2A241D" }}
          >
            <ChevronRight className="h-4.5 w-4.5" style={{ color: "#E8792E" }} />
            <span style={{ color: "#E8792E" }} className="mr-1">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-[#F4EDE3] focus:outline-none caret-[#E8792E]"
              placeholder="type commands..."
              autoComplete="off"
              autoCapitalize="off"
            />
          </div>
        </div>
      )}
    </>
  );
}
