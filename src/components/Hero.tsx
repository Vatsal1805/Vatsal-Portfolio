"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  useEffect(() => {
    if (!ready) return;
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, [ready]);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 30 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ background: "#0E0D0B" }}>
      <video
        src="/videos/Bg_Video.mp4"
        poster="/images/vatsal.jpg"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0" style={{ background: "rgba(14, 13, 11, 0.45)" }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at center, rgba(232, 121, 46, 0.12), transparent 45%)" }} />
      <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent, rgba(14,13,11,0.85))" }} />
      <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 pt-16 text-center">
          <motion.p {...fadeUp(0)} className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]" style={{ color: "#A79C8E" }}>
            Full-Stack Developer — Ahmedabad, IN
          </motion.p>
          <motion.h1
            {...fadeUp(0)}
            className="font-display mt-3 font-bold leading-[1.0] tracking-tight uppercase"
            style={{ fontSize: "clamp(34px, 6vw, 84px)", color: "#F4EDE3" }}
          >
            I BUILD PRODUCTS<br />
            THAT FEEL FAST,<br />
            CLEAR, AND <span style={{ color: "#E8792E" }}>REAL.</span>
          </motion.h1>
          <motion.div {...fadeUp(0.15)} className="mt-5 flex flex-col items-center gap-0.5 font-mono text-xs md:text-sm">
            <span style={{ color: "#A79C8E" }}>Currently building as a</span>
            <div className="relative h-6 md:h-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIdx]}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="block uppercase tracking-[0.18em] font-semibold"
                  style={{ color: "#E8792E" }}
                >
                  {ROLES[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
          <motion.p {...fadeUp(0.3)} className="mt-4 max-w-lg text-sm md:text-base font-light leading-relaxed" style={{ color: "#A79C8E" }}>
            A developer who turns ideas into working systems, clean interfaces, and products that actually ship.
          </motion.p>
          <motion.div {...fadeUp(0.45)} className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <button onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })} className="rounded-md px-5 py-2.5 font-mono text-xs font-semibold transition-transform hover:scale-105 cursor-pointer select-none" style={{ background: "#E8792E", color: "#0E0D0B" }}>View My Work</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} className="rounded-md border px-5 py-2.5 font-mono text-xs font-semibold transition-colors cursor-pointer select-none hover:bg-[#E8792E]/10" style={{ borderColor: "#E8792E", color: "#E8792E" }}>Get In Touch</button>
          </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#A79C8E" }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="h-8 w-px" style={{ background: "#E8792E" }} />
      </motion.div>
    </section>
  );
}