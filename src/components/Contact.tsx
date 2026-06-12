"use client";
import { Mail, Linkedin, Github } from "lucide-react";

const links = [
  { Icon: Mail, label: "vatsalbhavsar2011@gmail.com", href: "mailto:vatsalbhavsar2011@gmail.com" },
  { Icon: Linkedin, label: "linkedin.com/in/vatsal-bhavsar", href: "https://linkedin.com/in/vatsal-bhavsar" },
  { Icon: Github, label: "github.com/Vatsal1805", href: "https://github.com/Vatsal1805" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-32 text-center" style={{ background: "#0E0D0B" }}>
      <p className="font-mono text-xs uppercase tracking-[0.2em]" style={{ color: "#A79C8E" }}>CH.05 — OPEN CHANNEL</p>
      <h2 className="font-display mt-6 font-bold leading-[0.95]" style={{ fontSize: "clamp(48px, 9vw, 120px)", color: "#F4EDE3" }}>
        Let's build<br /><span style={{ color: "#E8792E" }}>something real.</span>
      </h2>
      <p className="mx-auto mt-8 max-w-lg text-base md:text-lg" style={{ color: "#A79C8E" }}>
        Final year CSE student. Open to full-time roles, internships, and interesting projects. Based in Ahmedabad. Available immediately.
      </p>
      <div className="mt-12 flex flex-col items-center gap-6">
        {links.map(({ Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 text-lg md:text-2xl font-medium"
            style={{ color: "#F4EDE3" }}
          >
            <Icon size={20} className="transition-colors group-hover:text-[#E8792E]" />
            <span className="border-b border-transparent group-hover:border-[#E8792E] group-hover:text-[#E8792E]">{label}</span>
          </a>
        ))}
      </div>
      <p className="mt-24 font-mono text-[10px] uppercase tracking-widest" style={{ color: "#A79C8E" }}>Built by Vatsal Bhavsar · 2026</p>
    </section>
  );
}