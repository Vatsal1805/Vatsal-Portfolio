"use client";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[role='button']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[200] hidden md:block rounded-full transition-[width,height,background] duration-200"
      style={{
        left: pos.x,
        top: pos.y,
        width: hover ? 36 : 10,
        height: hover ? 36 : 10,
        background: hover ? "#F4EDE3" : "#E8792E",
        mixBlendMode: hover ? "difference" : "normal",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}