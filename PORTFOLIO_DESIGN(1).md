# DESIGN.md — Vatsal Bhavsar Portfolio Design System
**Version:** 1.1  
**Theme:** Warm Terminal / Builder Editorial  
**Concept:** A late-night dispatch from a builder who ships real products

---

## 1. Design Philosophy

The scroll is a story. Each section is a chapter. The tone is confident but human — not a flashy showreel, not a sterile resume, and not a generic blue developer portfolio.

The portfolio should feel warm, cinematic, serious, and product-minded. It should look like it belongs to someone who builds practical systems, clean interfaces, and backend logic that actually works.

Spend boldness in one place per section. Let the signature animation be the memorable thing. Keep everything else quiet and disciplined around it.

The updated visual direction avoids pure black, pure white, bright neon orange, blue/violet accents, and crypto-like glow effects. The palette should feel like espresso black, soft cream, and burnt orange.

---

## 2. Color System

```css
:root {
  --bg-base:        #0E0D0B;   /* Warm near-black. Main page background. */
  --bg-surface:     #171512;   /* Cards and section surfaces. */
  --bg-elevated:    #211D18;   /* Hover states, elevated cards, overlays. */

  --text-primary:   #F4EDE3;   /* Soft cream. Main text. Never pure white. */
  --text-muted:     #A79C8E;   /* Secondary text, labels, descriptions. */
  --text-faint:     #5C5147;   /* Watermarks, dividers, inactive details. */

  --accent-orange:  #E8792E;   /* Primary accent. CTAs, highlights, active states. */
  --accent-amber:   #D89A3A;   /* Secondary accent. Stars, subtle details. */

  --border:         #2A241D;   /* Subtle warm card and navbar borders. */
  --border-active:  #E8792E40; /* Orange border at 25% opacity for hover states. */
}
```

### Color Usage Rules
- Never use pure black `#000000`.
- Never use pure white `#FFFFFF`.
- Avoid bright neon orange.
- Do not use blue/violet as the main brand color.
- Background stays warm dark throughout. No white sections.
- Orange is for emphasis only: CTA, active nav, important words, particles, hover states.
- Amber is used for stars/particles and subtle secondary highlights.
- Glow must be subtle. No heavy neon, crypto, or gaming look.
- Section dividers should be created through spacing, subtle borders, or tonal shifts, not hard lines.

### Recommended Effects

```css
/* Hero overlay */
background: rgba(14, 13, 11, 0.38);

/* Hero center warmth */
background:
  radial-gradient(circle at center, rgba(232, 121, 46, 0.12), transparent 45%),
  rgba(14, 13, 11, 0.38);

/* Subtle orange hover shadow */
box-shadow: 0 0 32px rgba(232, 121, 46, 0.16);
```

---

## 3. Typography

### Font Families

```css
--font-display: 'Clash Display', sans-serif;
--font-body:    'Inter', sans-serif;
--font-mono:    'JetBrains Mono', monospace;
```

### Import

```html
<!-- Clash Display (Fontshare) -->
<link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet">

<!-- Inter + JetBrains Mono (Google Fonts) -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

### Type Scale

| Role | Font | Size | Weight | Usage |
|---|---|---|---|---|
| Hero Headline | Clash Display | clamp(52px, 7vw, 112px) | 700 | `I BUILD PRODUCTS...` |
| Section Title | Clash Display | clamp(40px, 5vw, 72px) | 600 | Chapter headings |
| Hero Role Line | JetBrains Mono / Inter | clamp(13px, 1.3vw, 16px) | 500 | Animated role text |
| Body | Inter | 16px / 18px | 400 | Paragraphs, descriptions |
| Body Large | Inter | 20px | 400 | Project descriptions, hero subtext |
| Label | JetBrains Mono | 11px-12px | 500 | Section numbers, metadata, tags |
| Stack Pills | JetBrains Mono | 11px | 400 | Tech stack tags |
| Nav Links | JetBrains Mono | 12px | 500 | Navbar items |

### Typography Rules
- Hero headline is not the name.
- Hero headline uses uppercase, tight tracking, strong line breaks.
- Main hero headline:

```text
I BUILD PRODUCTS
THAT FEEL FAST,
CLEAR, AND REAL.
```

- Highlight `REAL.` in `--accent-orange`.
- Section labels format: `01 — THE BUILDER`.
- Avoid too much bold in body copy.
- Line height: 1.6 for body, 1.05–1.1 for display headings.
- Max-width for paragraphs: 600px.
- Use JetBrains Mono for technical details and small labels to maintain developer identity.

---

## 4. Spacing System

Based on an 8px grid.

```text
4px   — micro gaps, icon to label
8px   — small gaps, pill vertical padding
12px  — pill horizontal padding
16px  — card internal padding small
24px  — card internal padding
32px  — section internal padding
48px  — between major elements within a section
64px  — section top/bottom padding mobile
96px  — section top/bottom padding desktop
128px — between major sections
```

Hero content should feel spacious. Do not crowd the center text. The background video should breathe behind the content.

---

## 5. Component Specs

### Navbar

```text
Height: 64px
Background: rgba(14, 13, 11, 0.78)
Backdrop filter: blur(16px)
Border bottom: 1px solid #2A241D
Position: fixed top-0, full width
Z-index: 100

Logo "VB":
  Font: Clash Display, 24px, 700
  Color: --accent-orange
  Hover: opacity 0.85

Nav links:
  Font: JetBrains Mono, 12px, 500
  Color: --text-muted
  Active: --text-primary or --accent-orange
  Hover: --text-primary
  Active indicator: 2px bottom border in --accent-orange
  Gap between links: 32px

Mobile breakpoint: 768px
Mobile: hamburger icon, slide-down menu
Mobile menu background: --bg-base with blur
```

### Hero Video Background

```text
Position: absolute inset-0
Video: object-fit cover, width 100%, height 100%
Attributes: autoplay, muted, loop, playsInline
Devices: show on desktop, tablet, and mobile
Fallback: poster image from best still frame
Secondary fallback: warm dark gradient

Overlay:
  Subtle warm dark overlay, around rgba(14, 13, 11, 0.38)
  Add soft radial orange glow behind text
  Text must stay readable
```

### Tech Stack Pills

```text
Font: JetBrains Mono, 11px
Padding: 6px 12px
Border radius: 999px
Border: 1px solid rgba(232, 121, 46, 0.40)
Color: --accent-orange
Background: transparent or rgba(232, 121, 46, 0.06)

Hover:
  Background: --accent-orange
  Color: --bg-base or --text-primary
  Border color: --accent-orange
  Transition: 150ms ease
```

### Project Cards

```text
Background: --bg-surface (#171512)
Border: 1px solid --border (#2A241D)
Border radius: 16px
Padding: 32px
Min height: 400px

Hover:
  Border color: rgba(232, 121, 46, 0.40)
  Box shadow: 0 0 32px rgba(232, 121, 46, 0.14)
  3D tilt via Aceternity-style CardContainer

Card tag:
  Font: JetBrains Mono, 10px, 500
  Color: --accent-orange
  Letter spacing: 0.1em
  Text transform: uppercase

Card title:
  Font: Clash Display, 28px, 600
  Color: --text-primary
  translateZ: 50px

Card description:
  Font: Inter, 15px, 400
  Color: --text-muted
  translateZ: 30px

Stack pills:
  translateZ: 60px

Links:
  translateZ: 20px
  Style: small button, orange border
```

### CTA Buttons

```text
Primary:
  Background: --accent-orange
  Color: --bg-base or --text-primary
  Font: Inter, 14px, 600
  Padding: 14px 28px
  Border radius: 8px
  Hover: background slightly warmer/lighter
  Hover shadow: subtle orange only

Secondary:
  Background: transparent
  Border: 1px solid --accent-orange
  Color: --accent-orange
  Font: Inter, 14px, 500
  Padding: 14px 28px
  Border radius: 8px
  Hover: background rgba(232, 121, 46, 0.10)
```

### Custom Cursor, Desktop Only

```text
Default state:
  Size: 8px × 8px circle
  Background: --accent-orange
  Position: fixed, pointer-events none
  Z-index: 9999
  Transition: 80ms ease

Hover state on links, buttons, cards:
  Size: 40px × 40px
  Background: transparent
  Border: 1px solid --accent-orange
  Mix-blend-mode: difference only if it looks clean
  Transition: 200ms ease

Disable on touch devices.
```

---

## 6. Animation Specs

### Preloader — Falling Stars / Particles

```text
Canvas: full-screen fixed overlay
Background: --bg-base (#0E0D0B)
Stars: amber/orange particles rushing toward viewer
Star color: #D89A3A
Trail color: rgba(232, 121, 46, 0.45)
Count: 120–160 particles depending on performance

Speed states:
  Loading: multiplier 8–10, rushing toward viewer
  Transition: 700–900ms ease from fast to slow
  Exit: fade preloader overlay out
  Ambient: optional multiplier 1 if reused subtly

Text:
  Small JetBrains Mono label only
  `INITIALIZING PORTFOLIO`
  Color: --text-muted
  No large name text

Duration:
  Total around 2000–2200ms

Implementation:
  Canvas API for stars
  Framer Motion AnimatePresence for overlay exit
  Body scroll locked during preloader
```

### Hero Video Reveal

```text
Hero video is visible behind preloader/after preloader.
As preloader exits, hero content fades/slides in.
Video should not jump or flash.
Use poster image to avoid blank loading state.
```

### Hero Text Entrance

```text
Each element:
  translateY(24px), opacity 0 → translateY(0), opacity 1

Easing:
  cubic-bezier(0.22, 1, 0.36, 1)

Stagger:
  Label/role intro: delay 0ms, duration 500ms
  Main headline: delay 120ms, duration 650ms
  Animated role line: delay 280ms, duration 500ms
  Subtext: delay 380ms, duration 500ms
  Buttons: delay 500ms, duration 500ms
```

### Animated Role Text

```text
Static line:
  Currently building as a

Animated values:
  FULL-STACK DEVELOPER
  BACKEND-FOCUSED BUILDER
  MERN STACK DEVELOPER
  GENAI LEARNER
  PRODUCT-MINDED ENGINEER

Timing:
  Change every 1.8–2.2 seconds

Motion:
  Old role exits upward with fade
  New role enters from below with fade
  Keep height fixed so layout does not jump
  Role text color: --accent-orange
```

### 3D Perspective Text, Builder Section

```text
Container: perspective 500px
Scroll range: section enters viewport → section center
rotateX: 28deg → 0deg
translateZ: -80px → 0px
opacity: 0.65 → 1
Library: Framer Motion useScroll + useTransform

Keep readable. Reduce strength compared to original if it feels too flashy.
```

### Builder Photo Reveal

```text
Profile photo appears in CH.01 — THE BUILDER, not hero.
Reveal: fade + slight scale 0.96 → 1.
Optional: subtle warm border and faint watermark words over/around photo.
Do not overanimate the photo.
```

### Projects Carousel

```text
Swiper creative effect or simple responsive carousel.
Cards swipe on mobile.
Desktop can use navigation arrows.
Keep carousel smooth, not dramatic.
```

### Aceternity 3D Card Tilt

```text
On mouse move over card:
  rotateY: (mouseX - cardCenterX) / 25 degrees
  rotateX: (mouseY - cardCenterY) / 25 degrees
  transformStyle: preserve-3d
  perspective: 1000px

On mouse leave:
  rotateY: 0deg
  rotateX: 0deg
  transition: 200ms ease-linear

Child depths:
  Stack pills:      60px
  Card title:       50px
  Description:      30px
  Links/buttons:    20px
  Background image: -20px

Reduce or disable on mobile.
```

### Timeline Path Draw, Proof Section

```text
Desktop:
  SVG path or vertical line draws itself as user scrolls
  Stroke: --accent-orange
  strokeWidth: 2
  Animation: pathLength 0 → 1
  Timeline items fade/slide in as path reaches them

Mobile:
  Hide complex SVG
  Use simple vertical timeline border
```

### Skills Reveal

```text
Initial: clipPath inset(100% 0 0 0) or simple fade/slide
Final: clipPath inset(0% 0 0 0)
Duration: 600ms per category
Stagger: 100ms between categories
Trigger: section enters viewport
Easing: cubic-bezier(0.22, 1, 0.36, 1)
```

### Learning Icons / Signal Panel

```text
Right panel: CURRENTLY LEARNING / Building toward AI Engineering
Icon/card grid: 8 items
Motion: subtle 3D transform or fade-up on scroll
Avoid gimmicky floating animations
Reduce on mobile
```

---

## 7. Section Layout Specs

### CH.00 Hero — Full Viewport

```text
Layout:
  Center aligned
  Vertically centered
  No profile photo
  Video background full cover
  Subtle overlay and warm radial glow

Hero content from top:
  Small label, optional:
    FULL-STACK DEVELOPER — AHMEDABAD, IN
    JetBrains Mono, 12px, --text-muted

  Main headline:
    I BUILD PRODUCTS
    THAT FEEL FAST,
    CLEAR, AND REAL.

    Clash Display, clamp(52px, 7vw, 112px)
    --text-primary
    REAL. in --accent-orange

  Animated role line:
    Currently building as a
    [changing role]

  Subtext:
    A developer who turns ideas into working systems, clean interfaces, and products that actually ship.

  Buttons:
    View My Work
    Get In Touch

Mobile:
  Center aligned
  Headline scales down
  Buttons stack
  Video still plays
```

### CH.01 Builder

```text
Section label: 01 — THE BUILDER

Desktop:
  Editorial split layout
  Text and perspective heading on one side
  Profile photo block on the other side

Main heading:
  THE BUILDER

Bio:
  Full-stack developer focused on building practical systems, clean interfaces, and reliable backend logic.

Tech pills:
  React
  Node.js
  MongoDB
  TypeScript
  Next.js
  GenAI

Photo:
  Warm border/glow, not too strong
  May include faint watermark words

Mobile:
  Photo stacks below or above bio depending on visual balance
```

### CH.02 The Work

```text
Section label: 02 — THE WORK

Carousel/cards:
  CRM Platform
  Social Analyzer
  Zomato Reel Generator

Cards:
  Background --bg-surface
  Border --border
  Orange hover border/glow
  3D tilt desktop only

Below carousel:
  Small JetBrains Mono note:
  3 projects — all built, shipped, and refined through real constraints
```

### CH.03 The Proof

```text
Section label: 03 — THE PROOF

Timeline structure:
  Item 1: Company / internship header
  Item 2: Frontend work
  Item 3: Backend work
  Item 4: Architecture / production fixes

Desktop:
  Timeline path or line with scroll reveal

Mobile:
  Single column timeline with simple left border
```

### CH.04 The Signal

```text
Section label: 04 — THE SIGNAL

Desktop:
  50/50 split

Left panel:
  Current skills
  Skill categories with reveal animation

Right panel:
  CURRENTLY LEARNING
  Building toward AI Engineering
  8 item icon/card grid

Mobile:
  Stack panels vertically
```

### CH.05 Open Channel

```text
Center aligned, calm closing section

Label:
  05 — OPEN CHANNEL

Heading:
  LET’S BUILD
  SOMETHING REAL.

REAL. in --accent-orange

Subtext:
  Keep short and direct

Contact links:
  Email
  LinkedIn
  GitHub

Footer:
  Built by Vatsal Bhavsar · 2026
```

---

## 8. Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }

/* Large desktop */
@media (min-width: 1440px) { }
```

### Responsive Rules
- Hero video remains enabled on mobile.
- Center hero text must not overflow.
- Avoid horizontal scroll.
- Buttons stack on mobile.
- Navbar becomes hamburger on mobile.
- 3D effects reduce or disable on mobile.
- Timeline path simplifies on mobile.

---

## 9. Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable fast falling stars / particles */
  /* Skip heavy preloader and show content quickly */
  /* Disable 3D perspective text tilt */
  /* Disable 3D card tilt */
  /* Disable clip-path reveals */
  /* Keep basic fade-in animations at reduced duration */
}
```

Reduced motion should still feel designed. It should not look broken or empty.

---

## 10. Signature Design Decisions

1. **Warm dark theme** instead of blue/violet developer palette — makes the portfolio feel less generic.
2. **No pure black or pure white** — softer, more premium, easier on the eyes.
3. **Burnt orange accent** — communicates energy, shipping, and builder momentum without becoming neon.
4. **Hero video background** — creates atmosphere immediately, with subtle overlay for readability.
5. **Falling-stars preloader** — replaces text/staircase reveal and becomes the first cinematic moment.
6. **Centered hero text** — stronger first impression and cleaner recruiter read.
7. **No profile photo in hero** — hero sells positioning first; photo moves to Builder section.
8. **Animated role sentence** — gives motion and clarity without needing flashy hero visuals.
9. **One strong animation per section** — prevents the site from feeling overdone.
10. **JetBrains Mono for labels** — keeps the developer identity consistent.
