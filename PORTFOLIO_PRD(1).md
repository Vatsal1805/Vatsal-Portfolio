# PRD — Vatsal Bhavsar Portfolio
**Version:** 1.1  
**Last Updated:** June 2026  
**Owner:** Vatsal Bhavsar  
**Status:** Ready for Mockup / Development

---

## 1. Project Overview

A personal portfolio website for Vatsal Bhavsar — a recently graduated full-stack developer (CSE, May 2026) from Parul University. The site is built as an awards-grade, scroll-storytelling single page application with cinematic animation, a warm editorial visual system, and a recruiter-focused narrative.

The primary goal is getting full-stack or backend developer job interviews. The secondary goal is establishing a personal brand as a developer who builds practical systems and ships real products.

This is not a resume dump. It tells a story through scroll.

The updated creative direction is **Warm Terminal / Builder Editorial**: not pure black, not pure white, not blue/violet, and not a generic developer template. The site should feel warm, cinematic, serious, and product-minded.

---

## 2. Goals

### Primary
- Land full-stack / backend developer job interviews
- Make a strong first impression on technical recruiters in under 10 seconds
- Show engineering depth, not just project lists
- Position Vatsal as a practical developer who ships working products

### Secondary
- Establish personal brand as a serious builder
- Showcase GenAI learning trajectory, relevant for the 2026 job market
- Replace the current outdated portfolio at my-portfolio1-lemon.vercel.app
- Create a portfolio experience that feels memorable without becoming over-animated

### Non-Goals
- E-commerce or transactional functionality
- CMS or admin panel
- Multi-language support
- Blog section in v1
- Complex 3D scenes or heavy Three.js visuals
- Generic resume-template layout

---

## 3. Target Audience

**Primary:** Technical recruiters and hiring managers at product companies, startups, agencies in Gujarat, and remote-first companies across India.

**Secondary:** Fellow developers, potential collaborators, and possible freelance/agency leads through Converge Digitals.

---

## 4. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 or newer, App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Smooth Scroll | Lenis |
| Carousel | Swiper.js |
| 3D Card | Aceternity UI style 3D tilt card |
| Background FX | Canvas API custom falling stars / particles |
| Hero Media | HTML5 video background with poster fallback |
| Fonts | Clash Display + Inter + JetBrains Mono |
| Deployment | Vercel |

**Why no Three.js:** The falling stars / particle system and hero background video provide enough atmosphere without the bundle cost of a full 3D library. Canvas API should be used for lightweight, controllable motion.

---

## 5. Site Architecture

**Type:** Single Page Application. One continuous scroll. No page routing except optional future case study pages.

**Sections in order:**
1. Preloader, not a section — plays once on initial load
2. CH.00 — Hero
3. CH.01 — The Builder
4. CH.02 — The Work
5. CH.03 — The Proof
6. CH.04 — The Signal
7. CH.05 — Open Channel

**Global components:**
- Navbar, sticky/fixed with warm dark blur
- Custom cursor, desktop only
- Falling stars / particle canvas for preloader
- Hero video background
- Scroll progress / active section logic

---

## 6. Functional Requirements

### FR-01: Preloader — Falling Stars
- Must play on every initial page load
- Must block scroll during its duration, around 2000–2200ms
- Must use a full-screen warm dark background
- Must show fast-moving amber/orange falling stars or particles
- Stars should feel like they are rushing toward the viewer
- No large name text in the preloader
- Only small minimal loading text is allowed: `INITIALIZING PORTFOLIO`
- Loading text must use JetBrains Mono
- Stars must slow down smoothly as preloader exits
- Preloader must fade into the hero section cleanly
- Uses Canvas API for stars and Framer Motion for exit/fade transitions

### FR-02: Navigation
- Fixed navbar stays at top at all times
- Logo: `VB` monogram, links to top of page
- Nav links smooth scroll to correct sections
- Links: Work, Proof, Skills, Contact
- Active section is highlighted using muted orange
- Mobile collapses to hamburger menu
- Background: `rgba(14, 13, 11, 0.78)` with backdrop blur
- Border bottom uses warm dark border color

### FR-03: Hero Section
- Full viewport height
- Uses uploaded video as full background
- Video must autoplay, muted, loop, and play inline
- Video must show on desktop, tablet, and mobile
- Video should cover the full hero area using object-fit: cover
- Add subtle warm dark overlay so text remains readable
- Add subtle warm radial glow behind center text
- If video fails to load, use best still frame from the video as poster/fallback
- If still frame cannot be generated, use warm dark gradient fallback
- Hero content is center-aligned and vertically centered
- Do not show profile photo in hero
- Do not use `Vatsal Bhavsar` as the main hero headline
- Hero text animates in after preloader exits with staggered fade/slide
- CTA buttons: `View My Work` and `Get In Touch`
- Scroll indicator at bottom is optional but should stay minimal

### FR-04: Hero Copy and Animated Role Text
- Main hero headline:

```text
I BUILD PRODUCTS
THAT FEEL FAST,
CLEAR, AND REAL.
```

- Keep the line breaks exactly as above
- Highlight `REAL.` in muted orange
- Under the headline, include animated role sentence:

```text
Currently building as a
[animated role]
```

- Animated role values:
  - FULL-STACK DEVELOPER
  - BACKEND-FOCUSED BUILDER
  - MERN STACK DEVELOPER
  - GENAI LEARNER
  - PRODUCT-MINDED ENGINEER

- Role text changes every 1.8–2.2 seconds
- Animation should be vertical slide/fade
- Old role exits upward, new role enters from below
- Keep animation clean and readable

### FR-05: Builder Section
- Section label: `01 — THE BUILDER`
- Profile photo appears here, not in hero
- Use editorial layout with text + reserved profile photo area
- Include short bio paragraph
- 3D perspective text effect may be used, but it should not overpower readability
- Tech stack pills animate in from right or fade upward on viewport entry
- Photo may include subtle watermark overlay or warm border treatment

### FR-06: Projects Section
- Section label: `02 — THE WORK`
- Swiper creative carousel or responsive card layout
- 3 project cards with Aceternity-style 3D tilt on hover
- Each card: title, tag, description, stack pills, links
- Suggested initial cards:
  - CRM Platform
  - Social Analyzer
  - Zomato Reel Generator
- Card content layers at different translateZ depths
- Swipe on mobile, nav arrows on desktop
- Use warm orange hover borders/glow, not blue/violet

### FR-07: Internship / Proof Section
- Section label: `03 — THE PROOF`
- Timeline style section for internship and real work proof
- SVG path may draw itself as user scrolls on desktop
- Path is a gentle S-curve or clean vertical timeline line
- Timeline items reveal as path reaches them
- Mobile: SVG path hidden or simplified, timeline goes single column
- Accent line should use muted orange/amber

### FR-08: Skills / Signal Section
- Section label: `04 — THE SIGNAL`
- Split panel — left: current skills, right: learning/GenAI
- Left: current skill categories revealed softly on scroll
- Right: currently learning / AI Engineering path with simple icon/card grid
- 5 skill categories on left, 8 learning icons/cards on right
- 3D scroll-based effects are allowed but should be reduced on mobile

### FR-09: Contact Section
- Section label: `05 — OPEN CHANNEL`
- Full viewport height or strong closing section
- No heavy scroll animations — clean, typographic
- Big closing statement in Clash Display:

```text
LET’S BUILD
SOMETHING REAL.
```

- Highlight `REAL.` in orange
- Include Email, LinkedIn, GitHub links
- Footer at bottom: `Built by Vatsal Bhavsar · 2026`

### FR-10: Custom Cursor
- Desktop only
- Small muted orange dot follows mouse
- Expands on hover over interactive elements
- Hover state: transparent circle with orange border
- `mix-blend-mode: difference` may be used only if it looks clean against the warm theme
- Disable on touch devices

### FR-11: Responsive Design
- Must work on mobile 375px+, tablet 768px+, desktop 1280px+
- Hero remains center-aligned on all devices
- Hero video must show on mobile as requested
- CTA buttons stack on mobile
- Carousel works with touch swipe
- Internship SVG path hidden/simplified on mobile
- Skills panels stack vertically on mobile
- 3D effects simplified or disabled on mobile
- No horizontal scroll anywhere except intentional carousel/swiper areas

---

## 7. Non-Functional Requirements

- **Performance:** Lighthouse score 85+ desktop, 70+ mobile
- **Bundle size:** Lazy load heavy animation components
- **Video optimization:** Use compressed MP4/WebM where possible, poster image fallback, preload metadata or none unless testing requires otherwise
- **Accessibility:** Keyboard navigable, visible focus states, reduced motion respected
- **Reduced motion:** Skip heavy preloader, disable fast stars, reduce 3D effects, use simple fades
- **No horizontal scroll** anywhere except intentional carousels
- **All external links** open in new tab
- **No Lorem Ipsum** anywhere on the final site
- **Preloader** prevents scroll by setting body overflow hidden during preloader
- **Text readability:** Overlay must keep hero text readable on top of video

---

## 8. File Structure

```text
src/
  app/
    layout.tsx          — Lenis provider, font imports, metadata
    page.tsx            — Main page: preloader + all sections
  components/
    preloader/
      Preloader.tsx
      FallingStarsPreloader.tsx
    hero/
      Hero.tsx
      HeroVideoBg.tsx
      AnimatedRoleText.tsx
    builder/
      Builder.tsx
      PerspectiveText.tsx
      PhotoBlock.tsx
    projects/
      Projects.tsx
      ProjectCard.tsx
      ProjectCarousel.tsx
    proof/
      Proof.tsx
      TimelinePath.tsx
    skills/
      Skills.tsx
      SkillPanel.tsx
      LearningPanel.tsx
    contact/
      Contact.tsx
    ui/
      3d-card.tsx
      CustomCursor.tsx
      Navbar.tsx
  lib/
    utils.ts
  styles/
    globals.css
public/
  images/
    vatsal.jpg          — Profile photo, used in Builder section
    hero-poster.jpg     — Best still frame from hero video
  videos/
    hero-bg.mp4         — Uploaded hero background video
```

---

## 9. External Links

| Destination | URL |
|---|---|
| GitHub | https://github.com/Vatsal1805 |
| LinkedIn | https://linkedin.com/in/vatsalbhavsar1805 |
| Email | vatsalbhavsar2011@gmail.com |
| Current Portfolio | https://my-portfolio1-lemon.vercel.app |
| Social Analyzer Live | Add when confirmed |
| Zomato-Reel Live | Add when confirmed |

---

## 10. Open Decisions

| Decision | Status |
|---|---|
| Exact live demo URLs for projects | Pending — add before deploy |
| Profile photo final crop/version | Pending upload |
| Best hero video poster frame | Pending extraction/selection |
| Domain name, custom vs Vercel subdomain | Pending |
| Analytics, Vercel analytics or none | Optional |
| Final project list and card content | Pending final copy |

---

## 11. Success Metrics

- Portfolio shared in 5+ job applications within first week of launch
- At least 1 recruiter response mentioning the portfolio specifically
- Recruiter understands the positioning within 10 seconds
- Lighthouse performance score 85+ desktop
- Mobile experience remains smooth with video enabled
- Zero broken links or console errors on launch
