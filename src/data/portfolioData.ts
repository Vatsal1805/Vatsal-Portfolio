/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4 */
import type { Project } from "../components/ProjectCard";

export const ROLES = [
  "FULL-STACK DEVELOPER",
  "BACKEND-FOCUSED BUILDER",
  "MERN STACK DEVELOPER",
  "GENAI LEARNER",
  "PRODUCT-MINDED ENGINEER",
];

export const stack = [
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JWT",
  "Tailwind CSS",
  "Gemini AI",
  "LangChain",
  "Python",
  "REST APIs",
];

export const projects: Project[] = [
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

export const experienceItems = [
  {
    company: "PTN Events",
    role: "Software Developer Intern",
    dates: "Feb 2026 – May 2026",
    tags: ["React.js", "Node.js", "MUI", "RTK Query"],
    points: [
      "Designed and implemented a circular reveal dark/light theme animation using the View Transition API.",
      "Refactored monolithic AddActivity form into 6 modular, reusable components for better maintainability.",
      "Redesigned the access control permissions module from a complex table to an intuitive card-based layout.",
      "Developed full CRUD announcement system with role-based access and optimistic UI updates via RTK Query."
    ]
  },
  {
    company: "Converge Digitals",
    role: "Co-Founder",
    dates: "May 2026 – Present",
    tags: ["React", "Next.js", "MERN"],
    points: [
      "Lead technical execution on client web projects, crafting dark-editorial style sites for small and mid-size businesses.",
      "Folding AI automation into the agency's service offerings to improve client workflows and operational efficiency."
    ]
  }
];
