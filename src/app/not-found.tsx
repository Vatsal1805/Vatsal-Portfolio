"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0E0D0B] px-4 font-mono">
      <div 
        className="max-w-md text-center border p-8 rounded-2xl shadow-2xl"
        style={{ borderColor: "#2A241D", background: "#171512" }}
      >
        <h1 className="text-7xl font-bold text-[#E8792E]">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-[#F4EDE3]">Page Not Found</h2>
        <p className="mt-2 text-sm text-[#A79C8E]">
          The page you are looking for does not exist or has been relocated.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md px-5 py-2.5 text-xs font-semibold transition-transform hover:scale-105"
            style={{ background: "#E8792E", color: "#0E0D0B" }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
