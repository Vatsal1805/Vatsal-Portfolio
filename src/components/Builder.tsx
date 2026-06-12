"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import vatsalPhoto from "@/assets/vatsal.jpg";

const stack = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JWT",
  "Tailwind CSS",
  "Gemini AI",
  "LangChain",
  "Python",
  "REST APIs",
];

export default function Builder() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Soft perspective rotation & translation for the header
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -20]);
  const yText = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -30]);

  // Parallax translation for the photo
  const yPhoto = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -40]);

  return (
    <section
      ref={ref}
      id="builder"
      className="relative w-full overflow-hidden px-6 py-24 md:py-36"
      style={{ background: "#0E0D0B" }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="font-mono text-xs uppercase tracking-[0.2em] mb-12 md:mb-16"
          style={{ color: "#A79C8E" }}
        >
          CH.01 — THE BUILDER
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
              {/* Halftone / Subtle Warm Grain Filter overlay */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-color-dodge transition-opacity group-hover:opacity-10" 
                style={{
                  background: "radial-gradient(circle, #E8792E 10%, transparent 11%)",
                  backgroundSize: "4px 4px",
                }}
              />
              {/* Subtle dark gradient overlay */}
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

              {/* Editorial Vertical Label Overlay */}
              <div className="absolute right-4 bottom-4 z-20 font-mono text-[10px] uppercase tracking-widest text-[#A79C8E] bg-[#171512]/90 border border-[#2A241D] px-2 py-1 rounded">
                VB // CSE 2026
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative & Stack */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div style={{ perspective: "600px" }} className="w-full">
              <motion.div
                style={{ rotateX, y: yText, transformStyle: "preserve-3d" }}
                className="font-display font-bold leading-[0.95] text-left"
              >
                <div style={{ fontSize: "clamp(38px, 6vw, 80px)", color: "#F4EDE3" }}>
                  FULL-STACK
                </div>
                <div style={{ fontSize: "clamp(38px, 6vw, 80px)", color: "#E8792E" }}>
                  ENGINEER
                </div>
                <div
                  style={{ color: "#A79C8E" }}
                  className="font-mono text-sm sm:text-base md:text-lg mt-3 uppercase tracking-widest"
                >
                  MERN · GenAI · Systems
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="mt-8 text-base md:text-lg leading-relaxed text-[#A79C8E] text-left"
            >
              Final-year Computer Science Engineering student at Parul University. I specialize in building, deploying, and optimizing robust full-stack applications. Completed a production-focused internship at PTN Events, delivering clean code and user dashboard architecture in fast-paced sprint cycles. Currently mapping out a structured learning trajectory toward AI Engineering.
            </motion.p>

            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-widest text-[#E8792E] mb-4">
                Core Toolkit
              </p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap gap-2.5"
              >
                {stack.map((s) => (
                  <span
                    key={s}
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
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}