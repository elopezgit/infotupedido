# Memoria del Proyecto — TuPedido! Landing Page

## Última sesión
- **Fecha**: 2026-07-21
- **Tarea realizada**: Rediseño completo v2 "Liquid Premium" — transformación total de la landing page
- **Agentes involucrados**: Coordinator (orquestador), Software Architect, Frontend Expert, UX Designer, QA Expert, DevOps Expert
- **Skills usadas**: high-end-visual-design, design-taste-frontend, redesign-existing-projects, full-output-enforcement, gpt-taste

## Cambios realizados (v2 Liquid Premium)

### styles.css — Sistema de diseño completo
- Sistema de tokens CSS con 70+ variables para light y dark mode
- Arquitectura Double-Bezel (outer-bezel + inner-core) para todas las cards
- Sistema completo de tipografía con Outfit + Plus Jakarta Sans + JetBrains Mono
- Dark mode completo con `[data-theme="dark"]` + transiciones suaves
- Sistema de glassmorphism premium con inner borders + refractive shadows
- Secciones: Hero, Marquee, Sticky Stack, Demo Flow, Rubros, Bento, Calculator, Pricing
- Animaciones keyframes: float, pulse, shimmer, gradientBorder, orb-breath, scan-move
- Responsive design mobile-first
- Reduced motion + reduced transparency completo
- Z-index system gobernado por variables

### index.html — Nueva arquitectura semántica
- Skip-link para accesibilidad
- Splash cinemático con 3 shapes morphing + partículas
- Hero split-screen con mockup 3D (con reflection), floating cards, stats
- Cómo Funciona como sticky-stack (3 pasos que se pinnean)
- Demo Flow con phone + arrow connector + output panels
- Bento benefits con contenido visual variado (chat mock, QR, speed graph, neon orb)
- Dark mode toggle en navbar
- ARIA labels, roles, y atributos de accesibilidad
- Open Graph meta tags
- Estructura HTML5 semántica (header, main, section, footer, nav)

### app.js — Coreografía GSAP avanzada
- Lenis smooth scroll con easing custom
- Cursor follower con trailing + hover states
- Particles canvas optimizado con connection lines
- Splash cinematic timeline multi-fase con morphing
- Sticky stack pattern: pin + scale/opacity on scroll
- ScrollTrigger reveals con stagger
- Hero parallax: mockup rotation + floating cards
- 3D tilt cards con dynamic shine
- Magnetic button physics con spring easing
- Counter animation con ease-out cubic
- Calculator interactiva
- Dark mode toggle con localStorage + system preference
- Reduced motion detection: degradación completa

## Estado actual
- **Fase del proyecto**: Rediseño v2 completado
- **Calidad**: Alta — diseño premium, accesible, responsive, con dark mode
- **Archivos modificados**: index.html, styles.css, app.js (reescritura completa)
- **Archivos de memoria actualizados**: PROJECT_PROFILE.md, PROJECT_MEMORY.md

## Decisiones de diseño
| Decisión | Opción seleccionada | Alternativas consideradas |
|---|---|---|
| Framework | Vanilla HTML/CSS/JS | React/Next.js (descartado por simplicidad de deploy) |
| Animaciones | GSAP + Lenis | Framer Motion (requeriría React) |
| Dark mode | CSS custom properties + data-theme | Tailwind dark: (no aplica - sin build step) |
| Layout base | Double-Bezel nested glass | Glassmorphism plano (menos premium) |
| Fuente display | Outfit | Satoshi, Cabinet Grotesk (no disponibles en GF) |
