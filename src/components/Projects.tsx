"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/portfolioData";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalSlides = projects.length;

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.scrollWidth / totalSlides;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(totalSlides - 1, Math.max(0, index)));
  };

  const handleMobileNav = (direction: "next" | "prev") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.scrollWidth / totalSlides;
    let targetIndex = activeIndex;
    if (direction === "next") {
      targetIndex = Math.min(totalSlides - 1, activeIndex + 1);
    } else {
      targetIndex = Math.max(0, activeIndex - 1);
    }
    container.scrollTo({
      left: targetIndex * cardWidth,
      behavior: "smooth",
    });
    setActiveIndex(targetIndex);
  };

  const cardWidthVw = 60;
  const gapVw = 3;
  const travelDistance = cardWidthVw + gapVw;

  // Track viewport sizes to handle desktop (>= 768px) vs mobile layouts
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set up scroll-linked transitions for desktop horizontal scrolling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll progress to horizontal translation dynamically
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(totalSlides - 1) * travelDistance}vw`]
  );
  
  // Track scroll position to update the slide indicator dynamically
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;
    const rangePerCard = 1 / totalSlides;
    const index = Math.min(totalSlides - 1, Math.floor(latest / rangePerCard));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Handle programatic navigation chevrons on desktop
  const handleNav = (direction: "next" | "prev") => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const sectionTop = scrollTop + rect.top;
    const sectionHeight = rect.height;
    
    const step = sectionHeight / totalSlides;
    let targetIndex = activeIndex;

    if (direction === "next") {
      targetIndex = Math.min(totalSlides - 1, activeIndex + 1);
    } else {
      targetIndex = Math.max(0, activeIndex - 1);
    }

    window.scrollTo({
      top: sectionTop + targetIndex * step + 15,
      behavior: "smooth",
    });
  };



  return (
    <div 
      ref={sectionRef} 
      id="work" 
      className={`relative w-full bg-transparent ${isDesktop ? "h-[300vh]" : ""}`}
    >
      
      {/* Sticky viewport wrapper (Desktop only) */}
      <div className={`${isDesktop ? "sticky top-0 h-screen w-full overflow-hidden flex items-center" : "py-24 md:py-36 px-6"}`}>
        
        {/* Radial warmth active glow */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0 rounded-full opacity-[0.05] filter blur-[120px]"
          style={{
            background: "radial-gradient(circle, var(--color-accent-orange) 20%, transparent 80%)",
          }}
        />

        {isDesktop ? (
          // Desktop Layout: Sticky Left Column + Full-screen scrolling track
          <div className="relative w-full h-full flex items-center">
            
            {/* Left Column: Fixed details anchored on the left */}
            <div 
              className="absolute left-0 w-[35vw] h-full flex flex-col justify-center pl-16 pr-12 z-20 select-none pointer-events-none"
              style={{
                background: "linear-gradient(to right, var(--color-bg-base) 0%, var(--color-bg-base) 75%, rgba(14, 13, 11, 0.85) 88%, transparent 100%)",
              }}
            >
              <div className="pointer-events-auto">
                <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-text-muted">
                  CH.02 — THE WORK
                </p>
                
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.0] text-text-primary">
                  SHIPPED<br />
                  <span style={{ color: "var(--color-accent-orange)" }}>SYSTEMS.</span>
                </h2>

                <p className="mt-6 text-sm md:text-base leading-relaxed text-text-muted max-w-md">
                  A curated collection of full-stack products, built under real-world performance constraints, API boundaries, and user experience requirements.
                </p>

                {/* Minimal Progress & Slider Navigation */}
                <div className="mt-8 flex flex-col max-w-sm">
                  
                  {/* Professional slider progress bar */}
                  <div className="flex items-center gap-4 font-mono text-xs text-text-muted select-none mb-6">
                    <span>0{activeIndex + 1}</span>
                    <div className="relative w-48 h-[2px]" style={{ background: "var(--color-border-line)" }}>
                      <motion.div 
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ 
                          background: "linear-gradient(90deg, var(--color-accent-orange) 0%, var(--color-accent-amber) 100%)",
                          boxShadow: "0 0 6px rgba(232, 121, 46, 0.5)"
                        }}
                        animate={{ width: `${((activeIndex + 1) / totalSlides) * 100}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      />
                    </div>
                    <span>0{totalSlides}</span>
                  </div>

                  {/* Prev / Next Controls */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleNav("prev")}
                      className="swiper-prev-btn flex h-10 w-10 items-center justify-center rounded-lg border border-border-line bg-bg-surface text-text-muted hover:text-accent-orange hover:border-accent-orange/40 transition-all cursor-pointer select-none active:scale-95"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => handleNav("next")}
                      className="swiper-next-btn flex h-10 w-10 items-center justify-center rounded-lg border border-border-line bg-bg-surface text-text-muted hover:text-accent-orange hover:border-accent-orange/40 transition-all cursor-pointer select-none active:scale-95"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-faint ml-2 select-none">
                      SCROLL TRACK
                    </span>
                  </div>
                </div>

                {/* Technical footnote */}
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-text-faint max-w-xs leading-normal select-none">
                  4 projects — all built, shipped, and refined through real constraints.
                </p>
              </div>
            </div>

            {/* Right Column: Scroll track */}
            <div className="absolute left-0 w-full h-full z-10 flex items-center overflow-hidden">
              <motion.div 
                style={{ x: xTranslate, willChange: "transform" }}
                className="flex gap-12 items-center pl-[36vw] pr-[10vw]"
              >
                {projects.map((p, index) => (
                  <motion.div 
                    key={p.title} 
                    animate={{
                      scale: index === activeIndex ? 1 : 0.92,
                      opacity: index === activeIndex ? 1 : 0.4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    style={{ willChange: "transform, opacity" }}
                    className="w-[60vw] min-w-[60vw] h-[70vh] shrink-0 flex items-center justify-center"
                  >
                    <div className="w-full max-w-4xl px-4">
                      <ProjectCard p={p} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        ) : (
          // Mobile Layout: Dynamic horizontal snapping scroll
          <div className="relative z-10 mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 gap-12 items-center">
              
              <div className="flex flex-col justify-center text-left px-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-text-muted">
                  CH.02 — THE WORK
                </p>
                
                <h2 className="font-display text-4xl font-bold leading-[1.0] text-text-primary">
                  SHIPPED<br />
                  <span style={{ color: "var(--color-accent-orange)" }}>SYSTEMS.</span>
                </h2>

                <p className="mt-6 text-sm leading-relaxed text-text-muted">
                  A curated collection of full-stack products, built under real-world performance constraints, API boundaries, and user experience requirements.
                </p>

                {/* Minimal Progress & Slider Navigation */}
                <div className="mt-8 flex flex-col max-w-sm">
                  
                  {/* Progress Line */}
                  <div className="flex items-center gap-4 font-mono text-xs text-text-muted select-none mb-6">
                    <span>0{activeIndex + 1}</span>
                    <div className="relative w-32 h-[1px]" style={{ background: "var(--color-border-line)" }}>
                      <motion.div 
                        className="absolute top-0 left-0 h-full"
                        style={{ background: "var(--color-accent-orange)" }}
                        animate={{ width: `${((activeIndex + 1) / totalSlides) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span>0{totalSlides}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleMobileNav("prev")}
                      className="swiper-prev-btn flex h-10 w-10 items-center justify-center rounded-lg border border-border-line bg-bg-surface text-text-muted hover:text-accent-orange hover:border-accent-orange/40 transition-all cursor-pointer select-none active:scale-95"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => handleMobileNav("next")}
                      className="swiper-next-btn flex h-10 w-10 items-center justify-center rounded-lg border border-border-line bg-bg-surface text-text-muted hover:text-accent-orange hover:border-accent-orange/40 transition-all cursor-pointer select-none active:scale-95"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-faint ml-2 select-none">
                      SNAP SCROLL
                    </span>
                  </div>
                </div>
              </div>

              <div 
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="w-full flex gap-6 overflow-x-auto scrollbar-none scroll-smooth snap-x snap-mandatory px-6 py-4"
                style={{ scrollbarWidth: "none" }}
              >
                {projects.map((p) => (
                  <div key={p.title} className="w-[85vw] min-w-[85vw] snap-center shrink-0">
                    <ProjectCard p={p} />
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}