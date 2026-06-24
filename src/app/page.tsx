"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Builder from "@/components/Builder";
import Projects from "@/components/Projects";
import Internship from "@/components/Internship";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import TerminalWidget from "@/components/ui/TerminalWidget";
import FallingStarsBg from "@/components/FallingStarsBg";

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [ready, setReady] = useState(false);
  const speedRef = useRef(8);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShowPreloader(false);
      setReady(true);
      document.body.style.overflow = "";

      const start = performance.now();
      const slow = (now: number) => {
        const k = Math.min(1, (now - start) / 1500);
        speedRef.current = 8 - k * 7;
        if (k < 1) requestAnimationFrame(slow);
        else speedRef.current = 1;
      };
      requestAnimationFrame(slow);

      const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
      lenis.on("scroll", (e: any) => {
        const val = 1 + Math.min(12, Math.abs(e.velocity) * 1.5);
        if (val > speedRef.current) {
          speedRef.current = val;
        }
      });
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }, 2400);

    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative w-full overflow-hidden" style={{ background: "#0E0D0B" }}>
      <AnimatePresence mode="wait">
        {showPreloader && <Preloader />}
      </AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-0">
        <FallingStarsBg speedRef={speedRef} color="#E8792E" count={120} />
      </div>
      <CustomCursor />
      <Navbar />
      <Hero ready={ready} speedRef={speedRef} />
      <Builder />
      <Projects />
      <Internship />
      <Skills />
      <Contact />
      <TerminalWidget />
    </main>
  );
}
