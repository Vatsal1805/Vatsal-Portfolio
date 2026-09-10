import type { Metadata } from "next";
import "../styles.css";

export const metadata: Metadata = {
  title: "Vatsal Bhavsar — Full-Stack Developer building toward AI Engineering",
  description: "CSE Graduate & Full-Stack Developer building toward AI Engineering, specializing in the MERN stack, Google Gemini API, and Agentic workflows. Based in Ahmedabad.",
  openGraph: {
    title: "Vatsal Bhavsar — Full-Stack Developer building toward AI Engineering",
    description: "CSE Graduate & Full-Stack Developer building toward AI Engineering, specializing in the MERN stack, Google Gemini API, and Agentic workflows. Based in Ahmedabad.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" />
        <link rel="preload" href="/images/vatsal.jpg" as="image" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
