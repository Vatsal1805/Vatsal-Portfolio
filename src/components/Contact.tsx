"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mail, Linkedin, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { Icon: Mail, label: "vatsalbhavsar2011@gmail.com", href: "mailto:vatsalbhavsar2011@gmail.com" },
  { Icon: Linkedin, label: "linkedin.com/in/vatsal-bhavsar", href: "https://linkedin.com/in/vatsal-bhavsar" },
  { Icon: Github, label: "github.com/Vatsal1805", href: "https://github.com/Vatsal1805" },
];

interface InlineInputProps {
  name: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
}

function InlineInput({ name, value, onChange, placeholder, type = "text", required = true }: InlineInputProps) {
  const [width, setWidth] = useState(120);
  const [isFocused, setIsFocused] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (spanRef.current) {
      const measuredWidth = spanRef.current.offsetWidth;
      setWidth(Math.max(measuredWidth + 16, 120));
    }
  }, [value, placeholder]);

  return (
    <span className="relative inline-block mx-1 md:mx-2 align-baseline">
      {/* Hidden mirroring span for width calculation */}
      <span
        ref={spanRef}
        className="absolute top-0 left-0 h-0 overflow-hidden whitespace-pre pointer-events-none opacity-0 font-display"
        style={{ 
          fontSize: "clamp(24px, 4vw, 48px)",
          fontFamily: "var(--font-display), sans-serif",
          fontWeight: "normal"
        }}
      >
        {value || placeholder}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        required={required}
        style={{ 
          width: `${width}px`,
          fontSize: "clamp(24px, 4vw, 48px)",
          fontFamily: "var(--font-display), sans-serif"
        }}
        className="bg-transparent text-[#E8792E] outline-none font-display py-0.5 px-1 placeholder-[#A79C8E]/40 border-none text-center"
      />
      {/* Bottom border line */}
      <span className="absolute bottom-1 left-0 w-full h-[1px] bg-[#E8792E]/40" />
      {/* Expanding bottom border line on focus */}
      <motion.span
        className="absolute bottom-1 left-0 w-full h-[1.5px] bg-[#E8792E] origin-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </span>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || !formData.message) return;
    
    // Smooth transition fade out of the sentence
    setStatus("success");
  };

  return (
    <section id="contact" className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-32 text-center overflow-hidden" style={{ background: "transparent" }}>
      
      {/* Background visual detail */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 rounded-full opacity-[0.03] filter blur-[150px]"
        style={{ background: "radial-gradient(circle, #E8792E 20%, transparent 80%)" }}
      />

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] mb-16" style={{ color: "#A79C8E" }}>
          CH.05 // OPEN CHANNEL
        </p>

        <div className="w-full min-h-[350px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="w-full text-center"
              >
                {/* Large Editorial Paragraph Layout */}
                <div 
                  className="font-display font-light text-[#F4EDE3] leading-relaxed md:leading-loose text-center max-w-4xl mx-auto px-4"
                  style={{ 
                    fontSize: "clamp(24px, 4vw, 48px)", 
                    lineHeight: "1.5",
                    fontFamily: "var(--font-display), sans-serif"
                  }}
                >
                  Hello, my name is 
                  <InlineInput
                    name="name"
                    value={formData.name}
                    onChange={(val) => setFormData(prev => ({ ...prev, name: val }))}
                    placeholder="your name"
                  />
                  and I represent 
                  <InlineInput
                    name="company"
                    value={formData.company}
                    onChange={(val) => setFormData(prev => ({ ...prev, company: val }))}
                    placeholder="your company"
                  />
                  . You can reach me at 
                  <InlineInput
                    name="email"
                    value={formData.email}
                    onChange={(val) => setFormData(prev => ({ ...prev, email: val }))}
                    placeholder="your email address"
                    type="email"
                  />
                  to discuss 
                  <InlineInput
                    name="message"
                    value={formData.message}
                    onChange={(val) => setFormData(prev => ({ ...prev, message: val }))}
                    placeholder="a project or opportunity"
                  />
                  .
                </div>

                {/* Submit Button */}
                <div className="mt-16 flex justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3.5 border border-[#E8792E] bg-transparent text-[#E8792E] hover:bg-[#E8792E] hover:text-[#0E0D0B] transition-colors duration-300 rounded-md font-mono text-sm tracking-wider uppercase cursor-pointer select-none active:scale-95"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    [ TRANSMIT_ ]
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-message"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center font-mono text-[#E8792E]"
                style={{ 
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(18px, 2.5vw, 28px)",
                  letterSpacing: "0.08em",
                  lineHeight: "1.6"
                }}
              >
                TRANSMISSION RECEIVED. I'LL BE IN TOUCH.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social connections */}
        <div className="mt-24 flex flex-wrap justify-center gap-6 md:gap-10 border-t border-[#2A241D]/30 pt-10 max-w-2xl mx-auto w-full">
          {links.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-xs md:text-sm font-mono tracking-wider text-[#A79C8E] hover:text-[#E8792E] transition-colors"
            >
              <Icon size={14} className="transition-colors group-hover:text-[#E8792E]" />
              <span className="border-b border-transparent group-hover:border-[#E8792E]">{label}</span>
            </a>
          ))}
        </div>

        <p className="mt-24 font-mono text-[10px] uppercase tracking-widest" style={{ color: "#A79C8E" }}>Built by Vatsal Bhavsar · 2026</p>
      </div>
    </section>
  );
}