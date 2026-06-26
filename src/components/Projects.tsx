"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-creative";
import ProjectCard from "./ProjectCard";
import { projects } from "../data/portfolioData";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSlides = projects.length;
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
  // Each card is 60vw, and the gap is 3vw (approx gap-12), making distance between centers 63vw.
  // Translating dynamically from 0 to (totalSlides - 1) * travelDistance.
  const xTranslate = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(totalSlides - 1) * travelDistance}vw`]
  );
  
  // Track scroll position to update the slide indicator dynamically
  // Divide 0-1 into totalSlides equal parts (range per card = 1 / totalSlides)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;
    const rangePerCard = 1 / totalSlides;
    const index = Math.min(totalSlides - 1, Math.floor(latest / rangePerCard));
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  });

  // Handle programatic navigation chevrons on desktop (translates click to page scroll offsets)
  const handleNav = (direction: "next" | "prev") => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const sectionTop = scrollTop + rect.top;
    const sectionHeight = rect.height;
    
    // Divide height by total slides to determine snap regions
    const step = sectionHeight / totalSlides;
    let targetIndex = activeIndex;

    if (direction === "next") {
      targetIndex = Math.min(totalSlides - 1, activeIndex + 1);
    } else {
      targetIndex = Math.max(0, activeIndex - 1);
    }

    // Scroll page smoothly to trigger the corresponding horizontal slide translation
    window.scrollTo({
      top: sectionTop + targetIndex * step + 15,
      behavior: "smooth",
    });
  };

  // Helper to generate the terminal block-style progress bar
  const getProgressLoader = (index: number, total: number) => {
    const totalBlocks = 12;
    const filledBlocks = Math.round(((index + 1) / total) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return `${"█".repeat(filledBlocks)}${"░".repeat(emptyBlocks)}`;
  };

  return (
    <div 
      ref={sectionRef} 
      id="work" 
      // Desktop uses 300vh scroll height to drive horizontal translation
      className={`relative w-full bg-transparent ${isDesktop ? "h-[300vh]" : ""}`}
    >
      
      {/* Sticky viewport wrapper (Desktop only) */}
      <div className={`${isDesktop ? "sticky top-0 h-screen w-full overflow-hidden flex items-center" : "py-24 md:py-36 px-6"}`}>
        
        {/* Radial warmth active glow */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0 rounded-full opacity-[0.05] filter blur-[120px]"
          style={{
            background: "radial-gradient(circle, #E8792E 20%, transparent 80%)",
          }}
        />

        {isDesktop ? (
          // Desktop Layout: Sticky Left Column + Full-screen scrolling track
          <div className="relative w-full h-full flex items-center">
            
            {/* Left Column: Fixed details anchored on the left, gradient background blends smoothly with the page */}
            <div 
              className="absolute left-0 w-[35vw] h-full flex flex-col justify-center pl-16 pr-12 z-20 select-none pointer-events-none"
              style={{
                background: "linear-gradient(to right, #0E0D0B 0%, #0E0D0B 75%, rgba(14, 13, 11, 0.85) 88%, transparent 100%)",
              }}
            >
              <div className="pointer-events-auto">
                <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-[#A79C8E]">
                  CH.02 — THE WORK
                </p>
                
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.0] text-[#F4EDE3]">
                  SHIPPED<br />
                  <span style={{ color: "#E8792E" }}>SYSTEMS.</span>
                </h2>

                <p className="mt-6 text-sm md:text-base leading-relaxed text-[#A79C8E] max-w-md">
                  A curated collection of full-stack products, built under real-world performance constraints, API boundaries, and user experience requirements.
                </p>

                {/* Minimal Progress & Slider Navigation */}
                <div className="mt-8 flex flex-col max-w-sm">
                  
                  {/* Terminal-style block progress bar */}
                  <div className="flex items-center gap-2.5 font-mono text-xs md:text-sm text-[#E8792E] mb-6 select-none">
                    <span className="tracking-tighter">
                      [{getProgressLoader(activeIndex, totalSlides)}]
                    </span>
                    <span className="font-bold ml-2">
                      0{activeIndex + 1} / 0{totalSlides}
                    </span>
                  </div>

                  {/* Prev / Next Controls */}
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleNav("prev")}
                      className="swiper-prev-btn flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A241D] bg-[#171512] text-[#A79C8E] hover:text-[#E8792E] hover:border-[#E8792E]/40 transition-all cursor-pointer select-none active:scale-95"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => handleNav("next")}
                      className="swiper-next-btn flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A241D] bg-[#171512] text-[#A79C8E] hover:text-[#E8792E] hover:border-[#E8792E]/40 transition-all cursor-pointer select-none active:scale-95"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#5C5147] ml-2 select-none">
                      SCROLL TRACK
                    </span>
                  </div>
                </div>

                {/* Technical footnote */}
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-[#5C5147] max-w-xs leading-normal select-none">
                  3 projects — all built, shipped, and refined through real constraints.
                </p>
              </div>
            </div>

            {/* Right Column: Scroll track (absolute width, cards emerge from right and slide under left panel) */}
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
          // Mobile Layout: Original Swiper vertical-style carousel
          <div className="relative z-10 mx-auto max-w-7xl w-full">
            <div className="grid grid-cols-1 gap-12 items-center">
              
              <div className="flex flex-col justify-center text-left px-6">
                <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#A79C8E" }}>
                  CH.02 — THE WORK
                </p>
                
                <h2 className="font-display text-4xl font-bold leading-[1.0] text-[#F4EDE3]">
                  SHIPPED<br />
                  <span style={{ color: "#E8792E" }}>SYSTEMS.</span>
                </h2>

                <p className="mt-6 text-sm leading-relaxed text-[#A79C8E]">
                  A curated collection of full-stack products, built under real-world performance constraints, API boundaries, and user experience requirements.
                </p>

                {/* Minimal Progress & Slider Navigation */}
                <div className="mt-8 flex flex-col max-w-sm">
                  
                  {/* Progress Line */}
                  <div className="flex items-center gap-4 font-mono text-xs text-[#A79C8E] select-none mb-6">
                    <span>0{activeIndex + 1}</span>
                    <div className="relative w-32 h-[1px]" style={{ background: "#2A241D" }}>
                      <motion.div 
                        className="absolute top-0 left-0 h-full"
                        style={{ background: "#E8792E" }}
                        animate={{ width: `${((activeIndex + 1) / totalSlides) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <span>0{totalSlides}</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3">
                    <button 
                      className="swiper-prev-btn flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A241D] bg-[#171512] text-[#A79C8E] hover:text-[#E8792E] hover:border-[#E8792E]/40 transition-all cursor-pointer select-none active:scale-95"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      className="swiper-next-btn flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A241D] bg-[#171512] text-[#A79C8E] hover:text-[#E8792E] hover:border-[#E8792E]/40 transition-all cursor-pointer select-none active:scale-95"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#5C5147] ml-2 select-none">
                      SWIPE CAROUSEL
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full overflow-hidden px-2">
                <Swiper
                  modules={[EffectCreative, Navigation]}
                  effect="creative"
                  grabCursor
                  loop
                  centeredSlides
                  navigation={{
                    prevEl: ".swiper-prev-btn",
                    nextEl: ".swiper-next-btn",
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  creativeEffect={{
                    prev: { shadow: false, translate: ["-10%", 0, -200], opacity: 0.35 },
                    next: { translate: ["100%", 0, 0] },
                  }}
                  className="project-swiper overflow-hidden"
                >
                  {projects.map((p) => (
                    <SwiperSlide key={p.title} className="!h-auto">
                      <ProjectCard p={p} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}