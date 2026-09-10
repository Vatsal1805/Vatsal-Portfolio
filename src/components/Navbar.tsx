"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { id: "builder", label: "Builder" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Proof" },
  { id: "certifications", label: "Certs" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Set scrolled state for navbar transition
      setScrolled(window.scrollY > 50);

      // Track active section (Scroll Spy)
      const scrollPos = window.scrollY + 150;
      let currentSection = "";

      for (const l of links) {
        const el = document.getElementById(l.id);
        if (!el) continue;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSection = l.id;
          break;
        }
      }
      setActive(currentSection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once initially
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header 
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-6 transition-all duration-300 pointer-events-none"
      style={{
        paddingTop: scrolled ? "12px" : "20px",
      }}
    >
      {/* Floating Capsule Bar */}
      <div 
        className="w-full max-w-2xl flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300 pointer-events-auto shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        style={{
          background: scrolled ? "rgba(23, 21, 18, 0.82)" : "rgba(23, 21, 18, 0.45)",
          borderColor: scrolled ? "rgba(42, 36, 29, 0.85)" : "rgba(42, 36, 29, 0.4)",
          backdropFilter: "blur(16px)",
          height: "48px",
        }}
      >
        {/* Monogram Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-display text-lg font-bold select-none cursor-pointer tracking-wider"
          style={{ color: "#E8792E" }}
        >
          VB
        </button>

        {/* Desktop Links (Magnetic Hover Slider) */}
        <div 
          className="hidden md:flex items-center gap-1 relative"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              onMouseEnter={() => setHovered(l.id)}
              className="relative px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider font-medium cursor-pointer transition-colors duration-200 z-10 select-none"
              style={{
                color: active === l.id || hovered === l.id ? "#F4EDE3" : "#A79C8E",
              }}
            >
              {l.label}
              
              {/* Sliding hover pill */}
              {hovered === l.id && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full z-[-1]"
                  style={{ background: "rgba(232, 121, 46, 0.12)" }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                />
              )}

              {/* Active dot indicator */}
              {active === l.id && (
                <motion.div
                  layoutId="nav-active-dot"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E8792E]"
                  style={{ filter: "drop-shadow(0 0 4px #E8792E)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="md:hidden text-[#F4EDE3] focus:outline-none cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Navigation Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drop-down panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-6 right-6 md:hidden rounded-2xl border p-5 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider pointer-events-auto"
            style={{
              background: "rgba(23, 21, 18, 0.95)",
              borderColor: "rgba(42, 36, 29, 0.9)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
            }}
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="text-left py-2 border-b border-[#2A241D]/40 last:border-none cursor-pointer"
                style={{
                  color: active === l.id ? "#E8792E" : "#F4EDE3",
                }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
