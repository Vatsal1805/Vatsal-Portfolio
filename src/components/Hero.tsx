"use client";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import SplineBuilder from "./projects/SplineBuilder";

const ROLES = [
  "FULL-STACK DEVELOPER",
  "BACKEND-FOCUSED BUILDER",
  "MERN STACK DEVELOPER",
  "GENAI LEARNER",
  "PRODUCT-MINDED ENGINEER",
];

export default function Hero({ ready, speedRef }: { ready: boolean; speedRef: { current: number } }) {
  void speedRef;
  const [roleIdx, setRoleIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set up scroll tracking over the pinned viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Tagline line opacity reveals (0.3 baseline -> 1.0 full)
  const line1Opacity = useTransform(scrollYProgress, [0, 0.22], [0.3, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.18, 0.44], [0.3, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.4, 0.65], [0.3, 1]);

  // Tagline color transitions (sand for read lines, amber for highlights)
  const line1Color = useTransform(scrollYProgress, [0, 0.22], ["#A79C8E", "#F4EDE3"]);
  const line2Color = useTransform(scrollYProgress, [0.18, 0.44], ["#A79C8E", "#F4EDE3"]);
  const line3Color = useTransform(scrollYProgress, [0.4, 0.65], ["#A79C8E", "#E8792E"]);

  // Scroll indicator fades out early
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Staggered exit transitions: whole content translates up and fades out in second half
  const contentY = useTransform(scrollYProgress, [0.65, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0.65, 0.95], [1, 0]);

  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, [ready]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 35 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 },
    transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div ref={containerRef} className="relative h-[180vh] w-full" style={{ background: "transparent" }}>
      {/* Pinned sticky viewport */}
      <section className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Background video restored */}
        <video
          src="/videos/Bg_Video.mp4"
          poster="/images/vatsal.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-45 pointer-events-none z-0"
        />

        {/* Ambient warm gradient overlay */}
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "rgba(14, 13, 11, 0.4)" }} />
        <div className="absolute inset-0 pointer-events-none z-0" style={{ background: "radial-gradient(circle at center, rgba(232, 121, 46, 0.08), transparent 55%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none z-0" style={{ background: "linear-gradient(180deg, transparent, rgba(14,13,11,0.95))" }} />
        
        {/* Main content grid: 2 Columns on desktop (text on left, 3D on right) */}
        <motion.div 
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full max-w-7xl h-full items-center px-6 md:px-12 pt-16 text-center lg:text-left pointer-events-auto"
        >
          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <motion.div {...fadeUp(0.1)}>
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 text-[#A79C8E]">
                Full-Stack Developer — Ahmedabad, IN
              </p>
            </motion.div>
            
            <motion.div {...fadeUp(0.2)}>
              <h1
                className="font-display font-bold leading-[1.0] tracking-tight uppercase select-none text-[#F4EDE3]"
                style={{ fontSize: "clamp(34px, 4.5vw, 68px)" }}
              >
                <motion.span style={{ display: "block", color: line1Color, opacity: line1Opacity }} className="transition-colors duration-300">
                  I BUILD PRODUCTS
                </motion.span>
                <motion.span style={{ display: "block", color: line2Color, opacity: line2Opacity }} className="transition-colors duration-300">
                  THAT FEEL FAST,
                </motion.span>
                <motion.span style={{ display: "block", color: line3Color, opacity: line3Opacity }} className="transition-colors duration-300">
                  CLEAR, AND REAL.
                </motion.span>
              </h1>
            </motion.div>

            <motion.div {...fadeUp(0.35)} className="mt-5 flex flex-col items-center lg:items-start gap-0.5 font-mono text-xs md:text-sm">
              <span className="text-[#A79C8E]">Currently building as a</span>
              <div className="relative h-6 md:h-7 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROLES[roleIdx]}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="block uppercase tracking-[0.18em] font-semibold text-[#E8792E]"
                  >
                    {ROLES[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>
            
            <motion.div {...fadeUp(0.5)}>
              <p className="mt-4 max-w-lg text-sm md:text-base font-light leading-relaxed text-[#A79C8E]">
                A developer who turns ideas into working systems, clean interfaces, and products that actually ship.
              </p>
            </motion.div>
            
            <motion.div {...fadeUp(0.65)} className="mt-7 flex flex-wrap justify-center lg:justify-start gap-3">
              <button 
                onClick={() => document.getElementById("builder")?.scrollIntoView({ behavior: "smooth" })} 
                className="rounded-md px-5 py-2.5 font-mono text-xs font-semibold transition-transform hover:scale-105 cursor-pointer select-none" 
                style={{ background: "#E8792E", color: "#0E0D0B" }}
              >
                View My Profile
              </button>
              <button 
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} 
                className="rounded-md border px-5 py-2.5 font-mono text-xs font-semibold transition-colors cursor-pointer select-none hover:bg-[#E8792E]/10" 
                style={{ borderColor: "#E8792E", color: "#E8792E" }}
              >
                Get In Touch
              </button>
            </motion.div>
          </div>

          {/* Right Column: 3D interactive model wrapper (hidden on mobile, beautiful interactive element on desktop) */}
          <div className="hidden lg:block lg:col-span-5 h-[450px] relative rounded-xl border border-[#2A241D]/60 overflow-hidden bg-[#171512]/30 backdrop-blur-sm shadow-2xl">
            {/* Capability checking Spline 3D background with automatic fallback */}
            <SplineBuilder sceneUrl="https://prod.spline.design/6Wq1Q7YGyM2G50wD/scene.splinecode" />
          </div>
        </motion.div>

        {/* Floating scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#A79C8E]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-8 w-px bg-[#E8792E]" />
        </motion.div>

      </section>
    </div>
  );
}