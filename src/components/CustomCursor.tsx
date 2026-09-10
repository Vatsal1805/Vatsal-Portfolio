/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */
"use client";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track mouse coordinates directly on the DOM element via 3D translate
    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[role='button']"));
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden md:block rounded-full transition-[width,height,background] duration-200 will-change-transform"
      style={{
        width: hover ? 36 : 10,
        height: hover ? 36 : 10,
        background: hover ? "#F4EDE3" : "#E8792E",
        mixBlendMode: hover ? "difference" : "normal",
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    />
  );
}