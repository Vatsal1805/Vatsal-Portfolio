import type { Project } from "../components/ProjectCard";

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  badgeUrl: string;
  description: string;
  skills: string[];
  accent: string;
}

export const CONVERGE_REVIEWS_LIVE_URL = "https://converge-reviews.vercel.app";

export const ROLES = [
  "FULL-STACK & AI ENGINEER",
  "AGENTIC AI DEVELOPER",
  "MERN & LLM SYSTEMS BUILDER",
  "ORACLE AGENTIC AI ASSOCIATE",
  "AWS CERTIFIED AI PRACTITIONER",
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
  "Hugging Face",
  "Agentic AI",
  "MCP",
  "Python",
  "REST APIs",
];

export const skillCategories = [
  {
    category: "AI & LLM Systems",
    skills: ["LangChain", "Gemini API", "Hugging Face", "Tool-Calling", "RAG", "Prompt Engineering", "MCP", "Agent Architecture"]
  },
  {
    category: "Languages",
    skills: ["JavaScript (ES6+)", "Python", "TypeScript", "C++", "SQL"]
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React.js", "Next.js", "Node.js", "Express.js", "Gradio", "Tailwind CSS", "HTML5", "CSS3"]
  },
  {
    category: "Databases & Storage",
    skills: ["MongoDB", "MongoDB Atlas", "MySQL", "Supabase", "ImageKit"]
  },
  {
    category: "Backend & Security",
    skills: ["REST API Design", "JWT Authentication", "Role-Based Access Control", "Row-Level Security (RLS)", "Multer"]
  },
  {
    category: "Cloud & Dev Tools",
    skills: ["AWS", "OCI", "Vercel", "Render", "Git", "GitHub", "Postman", "Antigravity IDE", "VS Code"]
  },
  {
    category: "Core Concepts",
    skills: ["Data Structures & Algorithms", "OOP", "System Design Basics", "SDLC"]
  }
];

export const certifications: Certification[] = [
  {
    title: "Oracle Agentic AI Foundations Associate",
    issuer: "Oracle Corporation",
    year: "2026",
    badgeUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=80149D46A8A8C3973171F7B895440FF2F068D7B9770738D9A559220A1700C4B9",
    description: "Mastered enterprise agent architecture (reasoning engine, orchestration loop, tools), LangChain integration, Model Context Protocol (MCP), OpenAI Agent Stack, and OCI enterprise agent deployment.",
    skills: ["Agent Architecture", "LangChain", "MCP", "Orchestration", "OCI", "Tool Calling"],
    accent: "#E8792E"
  },
  {
    title: "AWS Certified AI Practitioner (AIF-C01)",
    issuer: "Amazon Web Services",
    year: "2026",
    badgeUrl: "https://www.credly.com/badges/bfaeea20-9539-4d7d-b1cd-f76f8c1abf71/public_url",
    description: "Validated expertise in Foundation Models, Amazon Bedrock, SageMaker ML pipelines, prompt engineering, RAG architectures, and responsible AI & security practices on AWS.",
    skills: ["Foundation Models", "Amazon Bedrock", "SageMaker", "Prompt Engineering", "RAG", "AWS Security"],
    accent: "#D89A3A"
  }
];

export const projects: Project[] = [
  {
    tag: "FLAGSHIP ? Production SaaS",
    title: "Converge Reviews",
    description:
      "Multi-tenant AI review-generation platform built for Converge Digitals' client base. QR-based customer flow, Gemini-powered response drafting, and full subscription billing via Razorpay.",
    stack: ["Next.js", "Supabase", "Gemini Flash", "Razorpay"],
    demo: CONVERGE_REVIEWS_LIVE_URL,
    accent: "#D89A3A",
    caseStudy: {
      problem:
        "Local businesses lose customers to weak or missing Google reviews, but most owners don't have the time or the words to ask every customer, follow up, or write review templates that don't sound robotic. Converge's own clients needed a repeatable system, not a one-off favor.",
      solution:
        "Built a multi-tenant SaaS product from scratch: each business gets a branded QR flow their customers scan, Gemini drafts a natural-sounding review suggestion tailored to that visit, and the business owner gets a dashboard to track requests and conversions. Wrapped in a 7-day free trial and recurring billing via Razorpay Subscriptions.",
      lessons:
        "? Multi-tenancy required careful Supabase row-level security design so one business's data never leaks into another's dashboard.\n? Prompt engineering for the review-suggestion generator had to specifically avoid AI-detection patterns ? tone and phrasing needed real tuning, not just 'write a nice review.'\n? Recurring billing (trial to paid conversion, failed payments, cancellations) required designing the Razorpay Subscriptions flow to handle mid-cycle upgrades and trial expiry cleanly.",
      architectureDesc:
        "Multi-tenant SaaS architecture combining QR-triggered review generation, Supabase RLS isolation, Gemini AI phrasing, Razorpay webhooks, and real-time business dashboards.",
      diagramType: "converge",
      steps: [
        "QR Scan Intake: Customer scans counter QR code on-site, opening lightweight Next.js mobile review page (/r/[slug]).",
        "Star & Service Selection: Customer taps 1-5 star rating and selects quick service details on an extra-large 56px touch interface.",
        "Gemini Flash Drafting: Next.js API route (/api/generate-reviews) sends anti-AI structured prompt to Gemini Flash, returning 5 natural review options pre-loaded with target SEO keywords.",
        "One-Tap Copy & Redirect: Customer taps 'Use this review', which copies text to mobile clipboard and launches the official Google Review dialog.",
        "Supabase RLS Persistence: Scans and metrics persist strictly server-side using SUPABASE_SERVICE_ROLE_KEY with Row-Level Security isolation by tenant ID.",
        "Razorpay Webhook Billing: Subscription status (7-day free trial, ?500 setup, ?299/mo subscription, upgrades, cancellations) syncs via Razorpay webhooks.",
        "Client & Agency Dashboards: Business owners track live conversion analytics and download QR custom standees via /dashboard; super-admins manage multi-client directory via /admin."
      ]
    },
  },
  {
    tag: "GenAI ? Full-Stack",
    title: "Social Media Content Analyzer",
    description:
      "AI-powered platform using Google Gemini for sentiment analysis and keyword extraction. Built OCR pipeline with Tesseract.js for image/PDF text analysis. Solo end-to-end build, deployed on Vercel.",
    stack: ["JavaScript", "Node.js", "React.js", "MongoDB", "Gemini AI", "Tesseract.js"],
    github: "https://github.com/Vatsal1805/SOCIAL-MEDIA-ANALYZER",
    demo: "https://social-media-analyzer-three.vercel.app/",
    accent: "#E8792E",
    caseStudy: {
      problem: "Creators need a streamlined, cost-effective way to analyze the social media engagement potential and sentiment of multi-format content uploads (specifically images and PDFs). Commercial tools are often overcomplicated, expensive, and require heavy backend servers. The system needed a unified ingestion interface to extract text tokens from raw documents, parse them, and generate actionable improvement suggestions without relying on dedicated document parser servers or complex cloud architecture.",
      solution: "The platform utilizes a serverless-friendly, modular MERN architecture. File ingestion is handled via a multer pipeline, which routes incoming files to a single endpoint. The text extraction service handles two distinct pipelines based on mimetype: Images (runs OCR asynchronously using tesseract.js) and PDFs (parses text from the raw data buffer using pdf-parse). The extracted text is sent to Google Gemini API using @google/generative-ai SDK formatted into structured JSON schema.",
      lessons: "? Robust JSON Extraction from LLM Output: The Gemini API often returns code blocks or leading/trailing markdown characters. To prevent JSON parsing failures, the backend parses the response by stripping these markers, locating the first { and last } indices, and extracting only the clean JSON substring before running JSON.parse.\n? Fallback Model Escalation: To handle rate limits or API service outages, the service uses an array-based model fallback system (gemini-2.0-flash -> gemini-2.0-flash-001 -> gemini-flash-lite-latest -> gemini-pro-latest).",
      architectureDesc: "A serverless-friendly full-stack OCR and Gemini AI sentiment pipeline that ingests raw documents, parses text tokens, and streams structured analytics to MongoDB.",
      diagramType: "social",
      steps: [
        "Client Upload: The user uploads an image or PDF via the React frontend, sending a multipart/form-data request to POST /api/upload.",
        "Multer Parsing: The backend's Multer middleware intercepts the file, saves it to the local uploads/ folder, and attaches file details to the request object.",
        "Text Extraction: The controller passes the file path to textExtractionService.js. If image, tesseract.js runs OCR. If PDF, pdf-parse reads the data buffer via fs.readFileSync.",
        "Gemini Ingestion: The extracted text is truncated to 2,000 characters, formatted with the ANALYSIS_PROMPT matrix, and sent via HTTP to the Google Generative AI API.",
        "JSON Sanitization: The response is intercepted by geminiService.js, stripped of markdown syntax, trimmed using brace offsets, and parsed.",
        "Database Persistence: The Mongoose model writes the original file metadata, extracted text, and parsed JSON analysis to the MongoDB collection.",
        "UI Dashboard Sync: The frontend receives the formatted response, rendering the engagement metrics, keywords, and action items in the React dashboard."
      ]
    },
  },
  {
    tag: "System Design ? Full-Stack",
    title: "HomeEase ? Home Services Marketplace",
    description:
      "Role-based marketplace with 3 user types (Customer, Provider, Admin), each with dedicated dashboards and JWT-enforced permissions. Full booking lifecycle, service discovery with filters, provider approval gating, and platform analytics.",
    stack: ["JavaScript", "Node.js", "Express.js", "MongoDB", "JWT", "Nodemailer"],
    github: "https://github.com/Vatsal1805/HomeEase",
    accent: "#D89A3A",
    caseStudy: {
      problem: "Local home service platforms suffer from high trust barriers, inefficient provider discovery across localized areas (pincodes), and complex multi-role operations. Service providers need transparent earnings records, customers need verified local professionals with status tracking, and platform administrators require verification controls to approve providers before listing. Existing solutions are either monolithic single-role systems or lack localized service-matching aggregates.",
      solution: "HomeEase was built using a role-based MERN architecture. Security and endpoints are gated using a custom layered JWT middleware system (auth.js middleware containing auth, providerAuth, and adminAuth wrappers). Pincodes are matched against providers in the database using Mongo aggregates. The User collection holds profiles alongside providerDetails (bank details, GST/PAN data). Booking tracks items, times, addresses, pricing configurations, and status indicators. nodemailers emailService.js compiles responsive HTML templates to notify users of changes.",
      lessons: "? Automatic Development SMTP Fallback: To prevent app crashes when custom SMTP variables are not set in local .env files during development, the EmailService detects if process.env.NODE_ENV === 'development' and automatically runs an asynchronous helper that instantiates a mock account using nodemailer.createTestAccount() and logs credentials.\n? Simplified GST Verification & Manual Stats Sync: Strict validation patterns for GST numbers caused onboarding blocks; the schema was refactored to check only length. To prevent high database read strain when rendering earnings dashboards, a manual updateProviderStats helper runs on completed bookings to sum and write totalEarnings and completedBookings.",
      architectureDesc: "A role-based, multi-dashboard platform secured by JWT middleware, matching providers to localized pincodes dynamically and aggregating dashboard stats.",
      diagramType: "homeease",
      steps: [
        "Pincode Lookup Request: The user enters their 6-digit postal code inside the PincodeModal which sends an asynchronous request to GET /api/services/nearby-stats?pincode=X.",
        "Statistical Aggregation: The backend queries the User collection for matching providers in that area, groups active services by category, and returns counts to display instantly in the modal.",
        "Filtered Service Search: The user filters services, triggering a request to GET /api/services?pincode=X&nearbyOnly=true. The controller fetches services mapping only to providers in that area.",
        "Checkout Submission: The user checks out their cart, submitting a POST /api/bookings containing service quantities, address details, and schedules.",
        "Role-Based Auth Guarding: The request passes through the auth middleware. If the JWT is verified, the booking is saved to MongoDB in a pending status.",
        "Email Dispatch: The controller triggers the EmailService which compiles a confirmation email and sends it to the user.",
        "Provider Action: The provider updates the status (confirmed -> in-progress -> completed) on their mobile-responsive dashboard via PUT /api/bookings/:id/status.",
        "Earnings Recalculation: Upon transition to completed, the backend triggers updateProviderStats to sum earnings and write updates to the provider's User document. Customers can submit reviews via POST /api/reviews which saves to the Review collection and dynamically updates provider scores."
      ]
    },
  },
  {
    tag: "Backend ? Media",
    title: "Zomato-Reel Video Platform",
    description:
      "Video content platform with cloud media storage via ImageKit and Multer upload pipeline. Fixed performance inconsistencies across devices. Responsive React frontend with reusable component architecture.",
    stack: ["JavaScript", "Node.js", "React.js", "MongoDB", "Multer", "ImageKit"],
    github: "https://github.com/Vatsal1805/Zomato-Reel",
    demo: "https://zomato-reel-sepia.vercel.app/",
    accent: "#E8792E",
    caseStudy: {
      problem: "Food partners (restaurants) need an interactive way to display short food videos (reels) to increase customer engagement. Video-focused platforms suffer from heavy load latency, upload dropouts, and massive server disk usage when handling large raw video files directly on application servers. The system required a reliable upload pipeline that limits file sizes, sanitizes assets, handles connectivity timeouts gracefully, and allows customers to like, comment on, and save food reels seamlessly without blocking rendering performance.",
      solution: "Zomato-Reel implements an optimized video processing and social interaction architecture. To prevent server storage exhaustion, the backend utilizes multer in-memory buffering. Incoming video files are captured in RAM buffers rather than written to disk, and are piped directly to ImageKit.io using the imagekit SDK. Filenames are generated dynamically using uuid v4 combined with regex sanitization to ensure non-collision paths. Mongoose models structure FoodItem, Like, Save, and Comment collections (supporting nested commenting threads). Built on React 19 and React Router DOM v7 for speed.",
      lessons: "? Network Timeout & Upload Size Gating: To protect server memory from crashing during multi-gigabyte uploads, the backend enforces a strict 50MB file size limit directly at the controller. If the upload process hangs or exceeds network limits, the controller intercepts the error, checks for a 'timeout' substring, and returns a dedicated 408 Request Timeout response with appropriate advice.\n? On-the-Fly Dynamic Social Status Resolution: Instead of storing static boolean flags that easily get out of sync, the getAllFoodItems controller queries the database in parallel. It uses Promise.all to search LikeModel and SaveModel collections for the logged-in user, dynamically resolving if each item isLiked or isSaved. Simultaneously, it aggregates counts using LikeModel.countDocuments and CommentModel.countDocuments, delivering accurate counts directly to the client.",
      architectureDesc: "CDN-backed video ingestion using in-memory Multer buffering directly stream-uploaded to ImageKit pipelines with dynamic, parallel resolution of social interactions.",
      diagramType: "zomato",
      steps: [
        "Partner Upload: A verified food partner submits a video file (up to 50MB) and descriptive details via POST /api/food/add.",
        "Multer Interception: The request passes through Multer middleware, loading the file payload into temporary server memory.",
        "CDN Upload: The controller invokes storageService.uploadImage, passing the raw buffer and a UUID-sanitized filename to ImageKit.io.",
        "Mongoose Document Write: Once the CDN returns the target file URL, the controller creates a new document in MongoDB using the FoodItemModel, storing the URL path.",
        "Feed Fetching: A user requests the media feed, calling GET /api/food/all. The backend queries the database, populates partner details, fetches liked/saved flags for the user, and counts the comments.",
        "Social Logging: The user likes or comments on the reel. The request hits POST /api/food/like or POST /api/food/comment, which writes records to LikeModel / CommentModel and increments the count caches."
      ]
    },
  },
];

export const experienceItems = [
  {
    company: "PTN Events",
    location: "Vadodara, Gujarat",
    role: "Software Developer Intern",
    dates: "Feb 2026 ? May 2026",
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
    location: "Remote",
    role: "Co-Founder",
    dates: "May 2026 ? Present",
    tags: ["React", "Next.js", "MERN"],
    points: [
      "Lead technical execution on client web projects, crafting dark-editorial style sites for small and mid-size businesses.",
      "Folding AI automation into the agency's service offerings to improve client workflows and operational efficiency."
    ]
  }
];
