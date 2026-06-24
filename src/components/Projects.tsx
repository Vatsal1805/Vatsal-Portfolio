"use client";
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCreative, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-creative";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
  {
    tag: "GenAI · Full-Stack",
    title: "Social Media Content Analyzer",
    description:
      "AI-powered platform using Google Gemini for sentiment analysis and keyword extraction. Built OCR pipeline with Tesseract.js for image/PDF text analysis. Solo end-to-end build, deployed on Vercel.",
    stack: ["JavaScript", "Node.js", "React.js", "MongoDB", "Gemini AI", "Tesseract.js"],
    github: "https://github.com/Vatsal1805",
    demo: "https://github.com/Vatsal1805",
    accent: "#E8792E",
    caseStudy: {
      problem: "Standard social media analytics platforms are complex and expensive, making sentiment tracking and OCR document ingestion inaccessible for individual creators. The platform needed to parse multi-format inputs (text, PDFs, images) and extract key insights instantly without heavy backend costs.",
      solution: "Built a serverless-friendly full-stack flow utilizing Tesseract.js directly inside the Node pipeline to run OCR asynchronously on image/PDF assets. We pass the parsed text tokens to Google Gemini models with tailored prompt matrices to obtain keyword distributions, core sentiment vectors, and tone breakdowns.",
      architectureDesc: "The architecture routes file uploads via REST endpoints, processes OCR ingestion in isolated memory blocks, and streams extracted content to Google's LLM APIs. The metadata is indexed and written to MongoDB, which feeds an analytics dashboard.",
      lessons: "Learned how to construct high-accuracy prompt templates, how to configure optimal memory limits for async OCR running in single-threaded Node environments, and how to manage API rate-limiting elegantly via sliding window backoff logic.",
      diagramType: "social",
    },
  },
  {
    tag: "System Design · Full-Stack",
    title: "HomeEase — Home Services Marketplace",
    description:
      "Role-based marketplace with 3 user types (Customer, Provider, Admin), each with dedicated dashboards and JWT-enforced permissions. Full booking lifecycle, service discovery with filters, provider approval gating, and platform analytics.",
    stack: ["JavaScript", "Node.js", "Express.js", "React.js", "MongoDB", "JWT"],
    github: "https://github.com/Vatsal1805",
    accent: "#D89A3A",
    caseStudy: {
      problem: "On-demand home services platforms require complex role dynamics: customers need simple booking interfaces, service providers need workflow management and payment analytics, and admins need global dashboard control and approval oversight. Securing these pathways under a unified state was a major challenge.",
      solution: "Designed and implemented a role-based, multi-dashboard platform secured by JWT access/refresh tokens. Built complex database relations matching providers to active customer requests, and automated status transition systems (Requested -> Approved -> Dispatched -> Completed).",
      architectureDesc: "A React frontend queries secure API controllers behind a strict JWT authentication middleware layer. System actions trigger database aggregation pipelines that output daily analytics data to administrators.",
      lessons: "Gained hands-on experience in secure authentication schemes, complex MongoDB multi-collection aggregation pipelines, schema layout modeling, and dashboard UX optimization for different user permissions.",
      diagramType: "homeease",
    },
  },
  {
    tag: "Backend · Media",
    title: "Zomato-Reel Video Platform",
    description:
      "Video content platform with cloud media storage via ImageKit and Multer upload pipeline. Fixed performance inconsistencies across devices. Responsive React frontend with reusable component architecture.",
    stack: ["JavaScript", "Node.js", "React.js", "MongoDB", "Multer", "ImageKit"],
    github: "https://github.com/Vatsal1805",
    demo: "https://github.com/Vatsal1805",
    accent: "#E8792E",
    caseStudy: {
      problem: "Video-focused web products suffer from high load latency and device-specific rendering issues. Directly serving raw video uploads resulted in major buffering issues, and server memory leakage during multi-gigabyte uploads.",
      solution: "Created an optimized media upload pipeline using Multer streaming directly to ImageKit.io. Implemented CDN-cached video distribution, responsive HTML5 player fallbacks, and structured media schemas that query quickly.",
      architectureDesc: "Video streams bypass long-term server memory by uploading in chunks using Multer memory storage and piping directly to the ImageKit CDN. The resulting CDN paths are stored in MongoDB and served to custom React players.",
      lessons: "Deepened knowledge in video formatting and optimization, CDN delivery logic, buffer management in Node stream cycles, and building lightweight wrapper players that do not block rendering threads.",
      diagramType: "zomato",
    },
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSlides = projects.length;

  // Track viewport sizes to handle desktop vs mobile layouts
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
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

  // Map vertical scroll progress to horizontal translation (from 0% to -66.6% for 3 cards)
  const xTranslate = useTransform(scrollYProgress, [0.08, 0.92], ["0%", "-66.6%"]);
  
  // Track scroll position to update the slide indicator dynamically
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return;
    const index = Math.min(totalSlides - 1, Math.floor(latest * totalSlides));
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

  return (
    <div 
      ref={sectionRef} 
      id="work" 
      // Desktop uses 300vh scroll height to drive horizontal translation
      className={`relative w-full bg-transparent ${isDesktop ? "h-[300vh]" : ""}`}
    >
      
      {/* Sticky viewport wrapper (Desktop only) */}
      <div className={`${isDesktop ? "sticky top-0 h-screen w-full flex items-center overflow-hidden" : "py-24 md:py-36 px-6"}`}>
        
        {/* Radial warmth active glow */}
        <div 
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none z-0 rounded-full opacity-[0.05] filter blur-[120px]"
          style={{
            background: "radial-gradient(circle, #E8792E 20%, transparent 80%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl w-full">
          {/* 12-Column Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Typographic Details */}
            <div className="lg:col-span-5 flex flex-col justify-center text-left px-6 lg:px-0">
              <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4" style={{ color: "#A79C8E" }}>
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
                
                {/* Minimal Line Progress Bar */}
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

                {/* Prev / Next Controls */}
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => isDesktop ? handleNav("prev") : undefined}
                    className={`swiper-prev-btn flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A241D] bg-[#171512] text-[#A79C8E] hover:text-[#E8792E] hover:border-[#E8792E]/40 transition-all cursor-pointer select-none active:scale-95`}
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => isDesktop ? handleNav("next") : undefined}
                    className={`swiper-next-btn flex h-10 w-10 items-center justify-center rounded-lg border border-[#2A241D] bg-[#171512] text-[#A79C8E] hover:text-[#E8792E] hover:border-[#E8792E]/40 transition-all cursor-pointer select-none active:scale-95`}
                    aria-label="Next Slide"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#5C5147] ml-2 select-none">
                    {isDesktop ? "SCROLL TRACK" : "SWIPE CAROUSEL"}
                  </span>
                </div>
              </div>

              {/* Technical footnote */}
              <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-[#5C5147] max-w-xs leading-normal select-none">
                3 projects — all built, shipped, and refined through real constraints.
              </p>
            </div>

            {/* Right Column: Cards (Horizontal translation on Desktop / Swiper on Mobile) */}
            <div className="lg:col-span-7 w-full overflow-hidden">
              {isDesktop ? (
                // Desktop Scroll-Pinned Horizontal slide viewport
                <div className="relative w-full h-[520px] flex items-center overflow-hidden pl-4 lg:pl-0">
                  <motion.div 
                    style={{ x: xTranslate }}
                    className="flex gap-8 w-max pr-24"
                  >
                    {projects.map((p) => (
                      <div key={p.title} className="w-[500px] shrink-0">
                        <ProjectCard p={p} />
                      </div>
                    ))}
                  </motion.div>
                </div>
              ) : (
                // Mobile standard Swiper fallback layout
                <div className="px-2">
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
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}