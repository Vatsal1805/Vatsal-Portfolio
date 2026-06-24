# Portfolio Architecture & System Guide

Welcome to the documentation guide for the **Vatsal Bhavsar Portfolio Website**. This document details the visual style, color palette, active libraries, section-by-section breakdown, animation details, and the project's folder structure.

---

## 1. Core Theme & Aesthetic

The website utilizes a custom **"Warm Terminal / Builder Editorial"** design system. It combines retro computer-console minimalism with modern, high-contrast, premium layouts.

### Color Palette
*   **Background (`#0E0D0B`)**: Deep matte warm-black/charcoal.
*   **Primary Text (`#F4EDE3`)**: Off-white/warm sand for optimal readability.
*   **Muted Text (`#A79C8E`)**: Soft timber-grey for footnotes, labels, and secondary details.
*   **Accent 1 (`#E8792E`)**: Burnt orange/amber for active UI elements, main highlights, and CLI lines.
*   **Accent 2 (`#D89A3A`)**: Golden mustard for specific system statuses and alternate tags.
*   **Borders (`#2A241D`)**: Soft dark-earth lines separating blocks without breaking layout flow.
*   **Panel Fill (`#171512`)**: Slightly lighter warm-black used as container backgrounds.

### Typography
*   **Display Headers**: *Clash Display* (bold, geometric, editorial headings).
*   **Body Text**: *Inter* (clean, premium sans-serif readability).
*   **Monospace Elements**: *JetBrains Mono* (used for headers, stats, terminal tags, code blocks, and indicators).

---

## 2. Animation Stack & Libraries

To achieve smooth, high-framerate transitions and visual micro-interactions, the project utilizes:

1.  **Framer Motion (`framer-motion`)**:
    *   Handles layout transitions (e.g. magnetic hover sliders).
    *   Manages active page reveals, sliding drawer headers, and preloader dismissals.
    *   Powers smooth hover transformations and cursor tracking.
2.  **Lenis (`lenis`)**:
    *   Integrates smooth inertial momentum scrolling across the entire site.
3.  **Swiper (`swiper`)**:
    *   Controls the project selection carousel, isolated to prevent slide-peeking layout issues.
4.  **Vaul (`vaul`)**:
    *   Creates accessible sliding bottom sheets/drawers used for the detailed case studies.
5.  **Lucide React (`lucide-react`)**:
    *   Provides minimal, consistent outline icons.
6.  **Tailwind CSS (v4 compiler)**:
    *   Implements layout structures, styling, responsive breakpoints, and grid lines.

---

## 3. Section-by-Section Breakdown

### 3.1. Preloader (`Preloader.tsx`)
*   **Purpose**: Intro splash screen displayed on first load.
*   **Design**: retro terminal text initialization and status checks.
*   **Animations**: Uses `Framer Motion` to stagger-fade terminal lines. Upon completion, the curtain slides upward using `AnimatePresence` to reveal the main website.

### 3.2. Custom Cursor (`CustomCursor.tsx`)
*   **Purpose**: Replaces the browser's default cursor with an editorial pointer.
*   **Design**: A small, minimalist amber dot.
*   **Animations**: Uses a spring-physics frame to follow the cursor with a slight, smooth easing/lag effect.

### 3.3. Pill Navbar (`Navbar.tsx`)
*   **Purpose**: Floating navigational header centered at the top of the viewport.
*   **Design**: Suspended capsule bordered in `#2A241D` with a glassmorphism backdrop blur.
*   **Animations & Mechanics**:
    *   **Magnetic Highlight**: When hovering over links, a warm dark background capsule smoothly slides behind them using Framer Motion `layoutId="nav-hover"`.
    *   **Scroll Spying**: Monitors the scroll position and dynamically highlights the active section with a small glowing amber dot underneath the navigation item.

### 3.4. Hero Section (`Hero.tsx` — CH.00)
*   **Purpose**: Above-the-fold landing section.
*   **Design**: 100vh layout constrained to prevent overflow. Features a centered, responsive headline, role tags slider, and brief professional summary.
*   **Background**: Uses local loop-video `Bg_Video.mp4` with a poster fallback image (`vatsal.jpg`).
*   **Animations**: Soft, staggered fade-in animations on load for headers, buttons, and background elements.

### 3.5. Builder Section (`Builder.tsx` — CH.01)
*   **Purpose**: Biographical introduction and technical stack overview.
*   **Design**: Editorial split grid layout.
    *   *Left Side*: Custom portrait of Vatsal styled with a halftone grid overlay, dark-gold border, and offset framing.
    *   *Right Side*: Typography layout detailing education, engineering biography, and core technical stack items.
*   **Animations**: Subtle parallax scroll translation on the portrait and scroll reveals on text columns.

### 3.6. Work Section (`Projects.tsx`, `ProjectCard.tsx`, `ProjectDrawer.tsx` — CH.02)
*   **Purpose**: Project list and in-depth architecture reviews.
*   **Design & Mechanics**:
    *   **12-Column Grid Split**: Left 5 columns contain the typographic title ("CH.02 THE WORK"), short summary text, custom navigation chevrons, and pagination. Right 7 columns host the `Swiper` slider.
    *   **Custom Pagination Line**: Replaces standard dot indicators with a clean command-line style progress loader (`[████░░░░░░░░] 01 / 03`) that updates dynamically.
    *   **External Chevrons**: Navigates Swiper cards using custom Ref triggers, removing ugly overlay arrows.
    *   **Project Cards**: Cards overlap in 3D perspective space during slide transitions.
    *   **Case Study Drawer**: Clicking "View Case Study" opens a full-screen slide-up `Vaul` drawer containing:
        *   **Problem / Solution Write-ups** and technical take-aways.
        *   **Custom SVGs**: Interactive system architecture diagrams mapped individually (Social Media, HomeEase, Zomato-Reel).
        *   **Mobile Scroll Fix**: Native swipe-to-dismiss is disabled (`dismissible={false}`) on `<Drawer.Root>` to prevent scroll conflict, letting mobile readers scroll case studies naturally.

### 3.7. Experience Section (`Internship.tsx`)
*   **Purpose**: Details internship and professional experiences.
*   **Design**: Clean vertical timeline nodes displaying dates, company names, roles, and accomplishments in a developer terminal style.

### 3.8. Skills Grid (`Skills.tsx`)
*   **Purpose**: Displays technical toolkits.
*   **Design**: Segmented panels (Frontend, Backend, Databases, Cloud & DevOps) with custom grid borders and hover-highlight cards.

### 3.9. Contact Section (`Contact.tsx`)
*   **Purpose**: Footer feedback and contact form.
*   **Design**: Retro input console allowing visitors to submit messages. Features social link tags styled in JetBrains Mono.

### 3.10. CLI Terminal Widget (`TerminalWidget.tsx`)
*   **Purpose**: An interactive retro command line interface in the bottom right corner.
*   **Design**: floating panel simulating a developer command line prompt.
*   **Supported Commands**:
    *   `help`: Lists available commands.
    *   `about`: Short biography output.
    *   `skills`: Core skills array output.
    *   `projects`: Selected project list.
    *   `contact`: Contact coordinates.
    *   `download-resume`: Triggers resume download.
    *   `clear`: Resets terminal lines.
    *   `exit`: Closes the terminal widget.
    *   *History Support*: Uses Up/Down arrow keys to cycle through past inputs.

---

## 4. Current Folder Structure Tree

```text
c:\Users\Win-11\Desktop\Designs\Portfolio
│   components.json               # Shadcn components configuration
│   eslint.config.js              # ESLint configuration
│   next-env.d.ts                 # Next.js TypeScript environment declarations
│   next.config.mjs               # Next.js configurations
│   package-lock.json             # NPM lockfile
│   package.json                  # NPM packages, dev dependencies, and scripts
│   PORTFOLIO_DESIGN(1).md        # Visual design and UI reference
│   PORTFOLIO_GUIDE.md            # [THIS FILE] Architecture & System Guide
│   PORTFOLIO_PRD(1).md           # Product Requirement Document
│   postcss.config.mjs            # PostCSS compiler configuration (Tailwind v4 compiler)
│   tsconfig.json                 # TypeScript compiler configuration (Excludes .agents)
│   tsconfig.tsbuildinfo          # TS build compiler cache
│
├───.agents                       # Agentic Skills & Playbooks folder
│   └───skills
│       ├───active                # Active playbooks used by the AI Agent
│       │   ├───3d-web-experience
│       │   │       SKILL.md
│       │   ├───scroll-experience
│       │   │       SKILL.md
│       │   └───spline-3d-integration
│       │       │   SKILL.md
│       │       ├───examples
│       │       │       interactive-scene.tsx
│       │       │       react-spline-wrapper.tsx
│       │       └───guides
│       │               COMMON_PROBLEMS.md
│       │               PERFORMANCE.md
│       │               REACT_INTEGRATION.md
│       │               VANILLA_INTEGRATION.md
│       └───skills                # Local clone repository of skills catalog
│           ├───3d-web-experience
│           │       SKILL.md
│           └───scroll-experience
│                   SKILL.md
│
├───public                        # Static assets served globally by Next.js
│   ├───images
│   │       vatsal.jpg            # Portrait image
│   └───videos
│           Bg_Video.mp4          # Background Hero video loop
│
└───src                           # Source files
    ├───app                       # Next.js App Router
    │       layout.tsx            # Global layout, fonts, and SEO Metadata
    │       not-found.tsx         # Custom 404 error page
    │       page.tsx              # Main home landing page (Home Component)
    │
    ├───assets                    # Local asset fallbacks
    │       Bg_Video.mp4
    │       vatsal.jpg
    │
    ├───components                # React UI Components
    │   │   Builder.tsx           # Biography / CH.01
    │   │   Contact.tsx           # Contact form console
    │   │   CustomCursor.tsx      # Smooth cursor follower
    │   │   FallingStarsBg.tsx    # Canvas background animation
    │   │   Hero.tsx              # Landing screen / CH.00
    │   │   Internship.tsx        # Timeline experience
    │   │   Navbar.tsx            # Floating capsule header
    │   │   Preloader.tsx         # Terminal introduction loader
    │   │   ProjectCard.tsx       # Individual work card item
    │   │   Projects.tsx          # Work section slider / CH.02
    │   │   Skills.tsx            # Skills categories
    │   │
    │   ├───projects              # Sub-components for projects
    │   │       ProjectDrawer.tsx # Sliding Vaul case study drawer
    │   │
    │   └───ui                    # Reusable atom components (Shadcn + Terminal)
    │           TerminalWidget.tsx # Floating CLI widget
    │           accordion.tsx
    │           alert-dialog.tsx
    │           button.tsx
    │           card.tsx
    │           carousel.tsx
    │           dialog.tsx
    │           drawer.tsx
    │           input.tsx
    │           label.tsx
    │           progress.tsx
    │           scroll-area.tsx
    │           sonner.tsx
    │           tabs.tsx
    │           textarea.tsx
    │           tooltip.tsx
    │
    ├───hooks                     # Custom React hooks
    │       use-mobile.tsx        # Responsive viewport detector
    │
    ├───lib                       # Global helper functions
    │       utils.ts              # Class merger utility (cn)
    │
    └───styles.css                # Global tailwind styles, font imports, and variables
```
