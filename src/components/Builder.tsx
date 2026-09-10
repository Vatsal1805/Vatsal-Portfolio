"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import vatsalPhoto from "@/assets/vatsal.jpg";
import { stack } from "../data/portfolioData";

const biographyText =
  "Full-stack developer (MERN) moving into AI engineering. Shipped three production apps solo, plus a multi-tenant SaaS product at Converge Digitals, and four months at PTN Events building CRM features in sprint cycles. Currently building LLM engineering skills: frontier model APIs, tool calling, LangChain, MCP, and agent architectures. Hold the Oracle Agentic AI Foundations Associate and AWS Certified AI Practitioner certifications.";

const bioWords = biographyText.split(" ");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const titleLineVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
      delayChildren: 0.1,
    },
  },
};

const stackContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.3,
    },
  },
};

const tagVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 15,
    },
  },
};

export default function Builder() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Z-depth parallax scroll translations
  const yBg = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -15]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <section
      ref={ref}
      id="builder"
      className="relative w-full overflow-hidden px-6 py-24 md:py-36"
      style={{ background: "transparent" }}
    >
      {/* Background Parallax Grid Schematic */}
      <motion.div 
        style={{ y: yBg, opacity: 0.04 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
        className="absolute -right-20 -top-20 w-[600px] h-[600px] pointer-events-none hidden lg:block"
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full stroke-[#E8792E] stroke-[0.4] [stroke-dasharray:3_3]">
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="25" />
          <line x1="0" y1="50" x2="100" y2="50" />
          <line x1="50" y1="0" x2="50" y2="100" />
          <line x1="15" y1="15" x2="85" y2="85" />
        </svg>
      </motion.div>

      <div className="mx-auto max-w-6xl">
        <p
          className="font-mono text-xs uppercase tracking-[0.2em] mb-12 md:mb-16"
          style={{ color: "#A79C8E" }}
        >
          CH.01 // THE BUILDER
        </p>

        {/* Editorial Grid Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Column: Profile Photo Block */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              className="relative group w-72 sm:w-80 lg:w-full aspect-[4/5] rounded-xl overflow-hidden border transition-all duration-300"
              style={{
                y: yPhoto,
                borderColor: "#2A241D",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              }}
              whileHover={{
                borderColor: "rgba(232, 121, 46, 0.4)",
                boxShadow: "0 20px 50px rgba(232, 121, 46, 0.15)",
              }}
            >
              {/* Halftone Overlay */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-color-dodge transition-opacity group-hover:opacity-10" 
                style={{
                  background: "radial-gradient(circle, #E8792E 10%, transparent 11%)",
                  backgroundSize: "4px 4px",
                }}
              />
              <div 
                className="absolute inset-0 z-10 bg-gradient-to-t from-[#0E0D0B]/80 via-transparent to-transparent pointer-events-none" 
              />
              
              <Image
                src={vatsalPhoto}
                alt="Vatsal Bhavsar"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />

              {/* Label Overlay */}
              <div className="absolute right-4 bottom-4 z-20 font-mono text-[10px] uppercase tracking-widest text-[#A79C8E] bg-[#171512]/90 border border-[#2A241D] px-2 py-1 rounded">
                VB // CSE 2026
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative & Stack */}
          <motion.div
            style={{ y: yText }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div style={{ perspective: "600px" }} className="w-full">
              <motion.div
                style={{ rotateX, transformStyle: "preserve-3d" }}
                className="font-display font-bold leading-[0.95] text-left"
              >
                <div className="overflow-hidden py-1">
                  <motion.div
                    variants={titleLineVariants}
                    style={{ fontSize: "clamp(38px, 6vw, 80px)", color: "#F4EDE3" }}
                  >
                    FULL-STACK
                  </motion.div>
                </div>
                <div className="overflow-hidden py-1">
                  <motion.div
                    variants={titleLineVariants}
                    style={{ fontSize: "clamp(38px, 6vw, 80px)", color: "#E8792E" }}
                  >
                    &amp; AI ENGINEER
                  </motion.div>
                </div>
                <div className="overflow-hidden py-1">
                  <motion.div
                    variants={titleLineVariants}
                    style={{ color: "#A79C8E" }}
                    className="font-mono text-sm sm:text-base md:text-lg mt-3 uppercase tracking-widest"
                  >
                    MERN • Agentic AI • LLM Systems
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.p
              variants={paragraphVariants}
              className="mt-8 text-base md:text-lg leading-relaxed text-[#A79C8E] text-left"
            >
              {bioWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className="inline-block mr-[0.25em]"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <div className="mt-10">
              <motion.p
                variants={titleLineVariants}
                className="font-mono text-xs uppercase tracking-widest text-[#E8792E] mb-4"
              >
                Core Toolkit
              </motion.p>
              <motion.div
                variants={stackContainerVariants}
                className="flex flex-wrap gap-2.5"
              >
                {stack.map((s) => (
                  <motion.span
                    key={s}
                    variants={tagVariants}
                    className="cursor-default rounded-full border px-4 py-1.5 font-mono text-[11px] transition-all duration-200 select-none"
                    style={{
                      background: "#171512",
                      borderColor: "#2A241D",
                      color: "#F4EDE3",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#E8792E";
                      e.currentTarget.style.borderColor = "#E8792E";
                      e.currentTarget.style.color = "#0E0D0B";
                      e.currentTarget.style.boxShadow = "0 0 15px rgba(232, 121, 46, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#171512";
                      e.currentTarget.style.borderColor = "#2A241D";
                      e.currentTarget.style.color = "#F4EDE3";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {s}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
