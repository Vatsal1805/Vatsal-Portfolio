"use client";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ROLES } from "../data/portfolioData";

export default function Hero({ ready, speedRef }: { ready: boolean; speedRef: { current: number } }) {
  void speedRef;
  const [roleIdx, setRoleIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values (normalized from -0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid, liquid 3D tilt reaction
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 75, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 75, damping: 20 });

  // Window-scroll linked vertical parallax translation
  const { scrollY } = useScroll();
  const rawParallaxY = useTransform(scrollY, [0, 800], [0, -120]);
  const parallaxY = useSpring(rawParallaxY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, [ready]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Calculate mouse position relative to center of Hero viewport
    const xVal = (e.clientX - rect.left) / width - 0.5;
    const yVal = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    // Smoothly spring back to center when cursor exits viewport
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered load animation parameters for non-headline elements
  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 35 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 },
    transition: { duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  // Premium horizontal-split slide-up mask animation variants
  const splitLineVariants = {
    hidden: { y: "100%" },
    visible: (customDelay: number) => ({
      y: "0%",
      transition: {
        duration: 0.8,
        delay: customDelay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full" 
      style={{ background: "transparent" }}
    >
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full overflow-hidden flex flex-col justify-center items-center"
        style={{ perspective: 1000 }}
      >
        
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
        
        {/* Main content: 3D Tilting Card container with scroll parallax */}
        <motion.div 
          style={{ 
            rotateX, 
            rotateY, 
            y: parallaxY,
            transformStyle: "preserve-3d",
            willChange: "transform"
          }}
          className="relative z-10 mx-auto flex flex-col justify-center items-center w-full max-w-4xl h-full px-6 pt-16 text-center pointer-events-auto"
        >
          {/* Subtitle - floats 20px forward */}
          <motion.div 
            {...fadeUp(0.1)}
            style={{ transform: "translateZ(20px)" }}
          >
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 text-[#A79C8E] text-center">
              Full-Stack Developer — Ahmedabad, IN
            </p>
          </motion.div>
          
          {/* Headline - floats 40px forward with staggered horizontal split entries */}
          <motion.h1
            style={{ fontSize: "clamp(34px, 4.5vw, 68px)", transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
            className="font-display font-bold leading-[1.0] tracking-tight uppercase select-none text-[#F4EDE3] text-center"
          >
            <span className="block overflow-hidden relative py-1">
              <motion.span
                variants={splitLineVariants}
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
                custom={0.2}
                className="block"
              >
                I BUILD PRODUCTS
              </motion.span>
            </span>
            <span className="block overflow-hidden relative py-1">
              <motion.span
                variants={splitLineVariants}
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
                custom={0.3}
                className="block"
              >
                THAT FEEL FAST,
              </motion.span>
            </span>
            <span className="block overflow-hidden relative py-1">
              <motion.span
                variants={splitLineVariants}
                initial="hidden"
                animate={ready ? "visible" : "hidden"}
                custom={0.4}
                className="block"
              >
                CLEAR, AND <span style={{ color: "#E8792E" }}>REAL.</span>
              </motion.span>
            </span>
          </motion.h1>

          {/* Roles - floats 30px forward */}
          <motion.div 
            {...fadeUp(0.55)}
            style={{ transform: "translateZ(30px)" }}
            className="mt-5 flex flex-col items-center gap-0.5 font-mono text-xs md:text-sm"
          >
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
          
          {/* Description - floats 25px forward */}
          <motion.div 
            {...fadeUp(0.65)}
            style={{ transform: "translateZ(25px)" }}
          >
            <p className="mt-4 max-w-lg text-sm md:text-base font-light leading-relaxed text-[#A79C8E] text-center">
              A developer who turns ideas into working systems, clean interfaces, and products that actually ship.
            </p>
          </motion.div>
          
          {/* CTA Buttons - float 50px forward */}
          <motion.div 
            {...fadeUp(0.75)}
            style={{ transform: "translateZ(50px)" }}
            className="mt-7 flex flex-wrap justify-center gap-3"
          >
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
        </motion.div>

        {/* Floating scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#A79C8E]">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-8 w-px bg-[#E8792E]" />
        </motion.div>

      </section>
    </div>
  );
}