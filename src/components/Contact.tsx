"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mail, Linkedin, Github, Send, CheckCircle, RefreshCw } from "lucide-react";
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
      // Buffer space for the caret
      setWidth(Math.max(measuredWidth + 12, 100));
    }
  }, [value, placeholder]);

  return (
    <span className="relative inline-block mx-1 md:mx-2 align-baseline">
      <span
        ref={spanRef}
        className="absolute top-0 left-0 h-0 overflow-hidden whitespace-pre text-lg md:text-2xl lg:text-3xl font-light font-display opacity-0 pointer-events-none"
        style={{ visibility: "hidden", position: "absolute" }}
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
        style={{ width: `${width}px` }}
        className="bg-transparent text-[#F4EDE3] outline-none font-display font-light text-lg md:text-2xl lg:text-3xl py-0.5 px-1 placeholder-[#5C5147] focus:placeholder-[#3a332d] max-w-[95vw] transition-colors duration-300 border-none text-center"
      />
      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#2A241D]" />
      <motion.span
        className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E8792E] origin-center"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company || !formData.message) return;

    setStatus("sending");
    
    // Simulate API request transmitting payload
    setTimeout(() => {
      setStatus("success");
    }, 1800);
  };

  return (
    <section id="contact" className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-32 text-center overflow-hidden" style={{ background: "transparent" }}>
      
      {/* Background visual detail */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0 rounded-full opacity-[0.03] filter blur-[150px]"
        style={{ background: "radial-gradient(circle, #E8792E 20%, transparent 80%)" }}
      />

      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#A79C8E" }}>CH.05 — OPEN CHANNEL</p>
        <h2 className="font-display mt-6 font-bold leading-[0.95]" style={{ fontSize: "clamp(48px, 9vw, 120px)", color: "#F4EDE3" }}>
          Let's build<br /><span style={{ color: "#E8792E" }}>something real.</span>
        </h2>

        <div className="mt-16 w-full min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {status !== "success" ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full text-center"
              >
                <div className="font-display text-lg md:text-2xl lg:text-3xl font-light text-[#A79C8E] leading-relaxed md:leading-loose text-center max-w-3xl mx-auto px-4">
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
                    placeholder="your company / role"
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

                <div className="mt-16 flex justify-center">
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative flex items-center gap-3 px-8 py-4 border border-[#2A241D] bg-[#171512] text-[#F4EDE3] hover:text-[#E8792E] hover:border-[#E8792E]/40 transition-all duration-300 rounded-lg cursor-pointer font-mono text-sm tracking-wider uppercase disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin text-[#E8792E]" />
                        <span>Transmitting Payload...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        <span>Secure Transmission</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success-receipt"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-xl border border-[#2A241D] bg-[#171512] p-8 rounded-xl text-left font-mono text-xs md:text-sm space-y-6 shadow-2xl relative overflow-hidden"
              >
                {/* Success Glow */}
                <div 
                  className="absolute -right-16 -top-16 w-32 h-32 pointer-events-none rounded-full opacity-[0.08] filter blur-[35px]"
                  style={{ background: "radial-gradient(circle, #E8792E 20%, transparent 80%)" }}
                />

                <div className="flex items-center gap-3 border-b border-[#2A241D] pb-4">
                  <CheckCircle className="h-5 w-5 text-[#E8792E]" />
                  <span className="text-[#E8792E] font-bold uppercase tracking-widest text-[11px]">TRANSMISSION SUCCESSFUL</span>
                </div>

                <div className="space-y-3 leading-relaxed text-[#A79C8E]">
                  <p><span className="text-[#F4EDE3]">SENDER:</span> {formData.name}</p>
                  <p><span className="text-[#F4EDE3]">COMPANY/ROLE:</span> {formData.company}</p>
                  <p><span className="text-[#F4EDE3]">CHANNEL:</span> {formData.email}</p>
                  <p className="border-t border-[#2A241D] pt-3 mt-3">
                    <span className="text-[#F4EDE3] block mb-1">PAYLOAD:</span>
                    <span className="italic text-[#F4EDE3]">"{formData.message}"</span>
                  </p>
                </div>

                <div className="border-t border-[#2A241D] pt-4 flex items-center justify-between text-[10px] text-[#5C5147]">
                  <span>SECURED CONNECTION // VATSAL-OS v1.0</span>
                  <button
                    onClick={() => {
                      setFormData({ name: "", company: "", email: "", message: "" });
                      setStatus("idle");
                    }}
                    className="text-[#E8792E] hover:underline cursor-pointer font-bold transition-all"
                  >
                    SEND ANOTHER
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social connections */}
        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-10 border-t border-[#2A241D]/30 pt-10 max-w-2xl mx-auto w-full">
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