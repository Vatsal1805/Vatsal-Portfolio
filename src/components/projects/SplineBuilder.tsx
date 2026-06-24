"use client";
import React, { useState, useEffect, useRef, Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Spline component with SSR disabled
const Spline = dynamic<any>(
  () => import("@splinetool/react-spline"),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#0E0D0B]" />,
  }
);

class SplineErrorBoundary extends React.Component<
  { children: React.ReactNode; onError: () => void },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn("Spline integration error caught:", error);
    this.props.onError();
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

// A premium, hand-crafted responsive SVG fallback representing a deconstructed blueprint grid.
function SplineFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0E0D0B] overflow-hidden">
      {/* Background radial amber glow */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none blur-[120px]"
        style={{ background: "radial-gradient(circle, #E8792E 0%, transparent 70%)" }}
      />
      
      <svg 
        className="w-[85%] h-auto max-w-lg opacity-40 animate-pulse-slow" 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ animationDuration: "8s" }}
      >
        <defs>
          <linearGradient id="grid-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E8792E" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D89A3A" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Isometric base grid lines */}
        <path d="M50 200 L200 120 L350 200 L200 280 Z" stroke="url(#grid-grad)" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M50 240 L200 160 L350 240 L200 320 Z" stroke="url(#grid-grad)" strokeWidth="1" opacity="0.5" />

        {/* Vertical structural columns */}
        <line x1="200" y1="120" x2="200" y2="320" stroke="#E8792E" strokeWidth="1.5" />
        <line x1="80" y1="184" x2="80" y2="224" stroke="#2A241D" strokeWidth="1.5" />
        <line x1="320" y1="184" x2="320" y2="224" stroke="#2A241D" strokeWidth="1.5" />

        {/* Floating deconstructed blocks */}
        <path d="M90 150 L130 130 L170 150 L130 170 Z" fill="#171512" stroke="#2A241D" strokeWidth="1" />
        <path d="M90 150 L90 165 L130 185 L130 170 Z" fill="#0E0D0B" stroke="#2A241D" strokeWidth="1" />
        <path d="M130 170 L130 185 L170 165 L170 150 Z" fill="#171512" stroke="#2A241D" strokeWidth="1" />

        <path d="M170 210 L230 180 L290 210 L230 240 Z" fill="#171512" stroke="#E8792E" strokeWidth="1.5" />
        <path d="M170 210 L170 250 L230 280 L230 240 Z" fill="#0E0D0B" stroke="#2A241D" strokeWidth="1" />
        <path d="M230 240 L230 280 L290 250 L290 210 Z" fill="#171512" stroke="#2A241D" strokeWidth="1" />

        <path d="M240 100 L280 80 L320 100 L280 120 Z" fill="rgba(232, 121, 46, 0.05)" stroke="#E8792E" strokeWidth="1" />
        <line x1="280" y1="120" x2="280" y2="160" stroke="#E8792E" strokeWidth="1" strokeDasharray="2 2" />

        <circle cx="200" cy="120" r="3" fill="#E8792E" />
        <circle cx="50" cy="200" r="3" fill="#2A241D" />
        <circle cx="350" cy="200" r="3" fill="#2A241D" />
        <circle cx="230" cy="180" r="2.5" fill="#D89A3A" />
      </svg>
      
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-[#A79C8E] uppercase tracking-widest pointer-events-none">
        System Node // SVG-2D Fallback
      </div>
    </div>
  );
}

interface SplineBuilderProps {
  sceneUrl: string;
}

export default function SplineBuilder({ sceneUrl }: SplineBuilderProps) {
  const [loaded, setLoaded] = useState(false);
  const [canLoad, setCanLoad] = useState(false);
  const [failed, setFailed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkCapabilities = () => {
      const isMobile = window.innerWidth < 768;
      const isLowEnd = (navigator.hardwareConcurrency || 4) <= 2;

      let hasWebGL = false;
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
        hasWebGL = !!gl;
      } catch (e) {
        hasWebGL = false;
      }

      return !isMobile && !isLowEnd && hasWebGL;
    };

    const isCapable = checkCapabilities();
    setCanLoad(isCapable);

    if (isCapable) {
      timeoutRef.current = setTimeout(() => {
        if (!loaded) {
          console.warn("Spline load timeout. Activating fallback.");
          setFailed(true);
        }
      }, 6000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [loaded]);

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoaded(true);
  };

  const showFallback = !canLoad || failed;

  return (
    <div className="absolute inset-0 z-0 w-full h-full bg-[#0E0D0B]">
      {showFallback ? (
        <SplineFallback />
      ) : (
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-[#0E0D0B] z-10 pointer-events-none transition-opacity duration-1000 ease-out"
            style={{ opacity: loaded ? 0 : 1 }}
          />
          <SplineErrorBoundary onError={() => setFailed(true)}>
            <Suspense fallback={<div className="absolute inset-0 bg-[#0E0D0B]" />}>
              <Spline
                scene={sceneUrl}
                onLoad={handleLoad}
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                }}
              />
            </Suspense>
          </SplineErrorBoundary>
        </div>
      )}
    </div>
  );
}
