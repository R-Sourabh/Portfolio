# Sourabh's Portfolio Website

An interactive, responsive, and highly polished portfolio website designed to showcase frontend architectural capabilities, professional experience, and open-source contributions. Built with Next.js, React, TypeScript, and modern animation libraries to deliver a premium, state-of-the-art user experience.

---

## 🛠️ Technology Stack

The project relies on a modern, performant, and type-safe frontend stack:
*   **Framework**: [Next.js](https://nextjs.org/) (App Router) for routing, server/client optimization, and static build compilation.
*   **Library**: [React.js](https://react.dev/) for component-driven UI architecture.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) for strict type safety and cleaner refactoring.
*   **Styling**: [TailwindCSS](https://tailwindcss.com/) for rapid utility-first utility classes and consistent color/spacing layouts.
*   **Animation**: [Framer Motion](https://www.motion.dev/) for spring-based physics, 3D rotations, layout animations, and gesture tracking.
*   **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/) for unified scroll speed, easing, and customized scroll control.
*   **Icons**: [Lucide React](https://lucide.dev/) for lightweight, consistent SVG outline icons.

---

## ✨ Section-wise UI Effects

The portfolio features several highly interactive, visually engaging sections. Here is how their animations and layouts are structured:

### 1. Custom Interactive Cursor (`CustomCursor`)
*   **Effect**: A two-part mouse tracker consisting of an inner dot and a large outer ring.
*   **How it works**: Uses Framer Motion's `useSpring` and `useMotionValue` to track the viewport coordinates. When hovering over buttons or links, the outer ring scales up, applies a glassmorphic background blur, and changes color opacity smoothly (`hsl(var(--accent) / 0)` to `hsl(var(--accent) / 0.15)`).

### 2. Skills Showcase Stack (`SkillsStack` & `SkillStackV2`)
*   **Effect**: A Tinder-like stack of cards that users can drag or swipe to browse different skills categories.
*   **How it works**: Uses gesture handlers, mouse position delta calculations, and spring-driven translations. When a card is dragged or clicked, it cycles to the bottom of the deck with a smooth slide-back motion.

### 3. GitHub Activity Grid (`GithubActivity`)
*   **Effect**: A detailed contributions calendar that shows GitHub commits and activities across selected years (`Latest`, `2026`, `2025`, `2024`).
*   **How it works**: Leverages GitHub API/GraphQL logic to fetch year-wise contribution data, mapping it onto a responsive grid container with interactive year filters.

### 4. Architectural Focus Areas Stack (`HorizontalStack`)
*   **Effect**: A overlapping card stack that spreads out and rotates dynamically in 3D space when the user hovers over the stack container.
*   **How it works**: Uses a combination of `spreadFactor` springs and mouse tracking. As the mouse moves over the stack, `useTransform` calculates the horizontal displacement (`x`) and rotational lean (`rotateZ`) for each card based on its index. Cards instantly elevate their stacking order (`zIndex`) to 50 on hover without transition glitches.

### 5. Isometric Tech Stack Layers (`TechLayers`)
*   **Effect**: A 3D isometric stack of technological blocks representing different development layers (Frontend, State, Commerce Logic, Infrastructure).
*   **How it works**: Leverages CSS 3D transforms (`rotateX(60deg) rotateZ(-45deg)`) on a container, combined with Framer Motion animating the `z` (depth) translation based on active hover or selection states. Clicking a layer updates the flat dashboard panel below.

### 6. Tech Orbit (`TechOrbit`)
*   **Effect**: Three concentric orbital rings with technical icon badges revolving continuously around a central glowing core.
*   **How it works**: Orbiting elements are rotated continuously using CSS keyframes or linear Framer Motion loops (`rotate: [0, 360]`). The icons themselves perform a counter-rotation (`rotate: [0, -360]`) at the same speed so they always remain upright.

---

## 📦 Key Reusable UI Components

The portfolio uses modular, independent helper elements to keep components focused and maintainable:
*   **Global Modal (`GlobalModal` / `ResumeModal`)**: A flexible overlay system designed with spring transitions and background blurs. It pauses the global scroll wrapper (`lenis.stop()`) on open and resumes it (`lenis.start()`) on close.
*   **Snackbar (`Snackbar`)**: A toast notifier component showing quick feedback (e.g., "Email copied to clipboard!") with a timed slide-out dismiss animation.
*   **Scroll Wrapper (`ScrollWrapper`)**: Wraps the main layout to initialize Lenis smooth scrolling, keeping scroll physics uniform across desktop browsers.

---

## 🚀 Getting Started

First, install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

To build the production bundle:
```bash
npm run build
```
