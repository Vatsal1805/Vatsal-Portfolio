"use client";
import { motion } from "framer-motion";
import { certifications, Certification } from "@/data/portfolioData";
import { ExternalLink, Award, CheckCircle2 } from "lucide-react";

export default function Certifications() {
  return (
    <section id="certifications" className="relative w-full py-24 px-6 md:px-12 border-t" style={{ borderColor: "#2A241D", background: "#0E0D0B" }}>
      {/* Background radial highlight */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(circle at 30% 50%, rgba(232, 121, 46, 0.04), transparent 60%)" }} />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#E8792E]" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A79C8E]">
                CH.03 // VERIFIED CREDENTIALS
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-[#F4EDE3]">
              CERTIFICATIONS <span className="text-[#E8792E]">&amp;</span> AI LEARNING
            </h2>
          </div>
          <p className="font-mono text-xs text-[#A79C8E] max-w-sm">
            Formal certifications validating expertise in Agentic AI, Frontier LLMs, Cloud AI Systems, and Machine Learning Workflows.
          </p>
        </div>

        {/* Certification Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert: Certification, index: number) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 border"
              style={{
                background: "#171512",
                borderColor: "#2A241D",
              }}
            >
              {/* Top Accent Line on Hover */}
              <div 
                className="absolute top-0 left-6 right-6 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.accent}, transparent)` }}
              />

              <div>
                {/* Issuer Badge & Year Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border bg-[#0E0D0B]" style={{ borderColor: "#2A241D" }}>
                    <Award className="w-3.5 h-3.5" style={{ color: cert.accent }} />
                    <span className="font-mono text-[11px] font-semibold tracking-wide text-[#F4EDE3]">
                      {cert.issuer}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-[#A79C8E]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{cert.year}</span>
                  </div>
                </div>

                {/* Certification Title */}
                <h3 className="font-display text-xl md:text-2xl font-bold uppercase text-[#F4EDE3] mb-3 group-hover:text-[#E8792E] transition-colors">
                  {cert.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm text-[#A79C8E] leading-relaxed mb-6">
                  {cert.description}
                </p>
              </div>

              <div>
                {/* Skills Chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-[11px] px-2.5 py-1 rounded bg-[#0E0D0B] border text-[#A79C8E] group-hover:border-[#E8792E]/30 transition-colors"
                      style={{ borderColor: "#2A241D" }}
                    >
                      #{skill}
                    </span>
                  ))}
                </div>

                {/* Verification Action Link */}
                <a
                  href={cert.badgeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold px-4 py-2.5 rounded-md transition-all duration-200 group/btn"
                  style={{
                    background: "rgba(232, 121, 46, 0.1)",
                    color: cert.accent,
                    border: `1px solid ${cert.accent}40`
                  }}
                >
                  <span>Verify Credential Badge</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
