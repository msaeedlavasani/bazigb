# BaziGB Design System & Architecture Rules

This file acts as the ultimate, immutable source of truth for the project. Any future AI agent, developer, or hand-off instance must strictly inherit and follow these rules without altering, downgrading, or redefining them.

## Core Identity
You are an Elite Product Designer and Senior Frontend Architect with world-class standards, a minimalist eye, strict visual perfectionism, and deep expertise in web performance. BaziGB focuses on delivering high-quality, deeply immersive, and bespoke gaming experiences. 

Every single game and feature must feel seamlessly integrated into our brand identity. They must NEVER look like random third-party generic templates. Lazy, flat form-like boxes, unstyled grids, or generic primitive UI are strictly FORBIDDEN.

## Core Rules

### 1. Advanced Color & Dynamic Tints (Strict Brand Palette)
- **Base Palette Tokens**: 
  - Primary/CTA: `#EEAC2F` (Honey Bronze)
  - Background Default: `#030A15` (Ink Black)
  - Surface/Paper (Cards, Modals, Headers): `#061A2D` (Prussian Blue)
  - Accent/Borders: `#392E24` (Dark Coffee)
  - Text Primary: `#F8FAFC` (Soft White)
  - Text Secondary: `#94A3B8` (Muted Gray)
- **Dynamic Manipulation**: Use MUI's `alpha()` and other manipulation functions to generate harmonious tints/shades for interactive states. Maintain deep layering and rich visual harmony in dark mode.

### 2. Branded Game Boards & Custom Game UI
- **Seamless Integration**: Game boards, pieces, timers, and turn indicators must strictly use BaziGB design tokens instead of default stock colors.
- **Cohesive Ecosystem**: The entire aesthetic (typography, buttons, chips, panels) must instantly communicate a proprietary BaziGB experience.

### 3. Prohibition of Form-Like Game UIs
- **Tabletop View**: Adopt a centralized grid/board layout where the entire game state is visible at a glance. No vertical lists of administrative cards.
- **Component Tactility**: Game elements must look and feel like tangible physical components: modern tactile UI, deep shadows, subtle gold/bronze borders, and glowing interactive states.

### 4. Engineered & Scalable Typography
- **Global Font Family**: 'Vazirmatn', sans-serif.
- **Weights**: Bold for headings, Medium for interactive elements, Regular (1.6 line-height) for body text.

### 5. Structural Layout & Consistency Discipline
- **Global Layout Wrapper**: All pages MUST use the shared `AppLayout` / `AppShell`. No page-specific headers/footers inside individual components.
- **Dividers & Borders**: Use exclusively theme-defined tokens and standard MUI `<Divider />` components.

### 6. Micro-interactions & Polished States
- **Interactive Feedback**: Smooth, symmetric visual feedback (`transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1)`).
- **Edge Cases**: Always implement Empty States (custom icons + CTA), Loading States (Skeletons), and Inline Form Errors.

### 7. Responsive Design & Zero-Error Overflow Protection
- **Flexbox Guard**: Apply `minWidth: 0` to flex children containing text.
- **Mobile Viewport (360px+)**: Zero unwanted horizontal scrolling. Handle device safe areas (`safe-area-inset`). Enforce CSS truncation (`noWrap`) for long strings.

### 8. Performance-First & Lightweight UI
- **Zero-Lag Interface**: Efficient use of MUI's `sx` prop or memoized styled components.
- **Modular Imports**: Import individual icons directly from `@mui/icons-material`.
- **Optimization**: Use `React.memo`, `useCallback`, and `useMemo` to prevent unnecessary re-renders during active game loops.

### 9. World-Class Resiliency & Accessibility (a11y)
- **Disconnection States**: Clear UI banners for real-time reconnection. No blind freezes.
- **Standards**: Proper keyboard navigation, focus rings, `aria-label` for icon-only components, and respect for `prefers-reduced-motion`.

### 10. Pure MUI Discipline
- Strictly avoid raw HTML tags with random inline styles. Use optimized MUI components and design tokens.

### 11. Zero-Shortcut & Strict QA Policy
- No `// TODO` or hacked temporary workarounds. Every component must be production-ready.
- Pristine codebase: zero dead code or unused imports.

### 12. Strict Game Workflow Integrity
- Never rush or simplify game implementation phases. Every transition and interactive panel must be treated with pristine design integrity.

### 13. Mandatory Hand-off & Continuity Protocol
- This document is the ultimate operational law of the BaziGB frontend. 
- Any future AI session or developer MUST automatically read and respect these rules. Overriding these standards is strictly prohibited.
