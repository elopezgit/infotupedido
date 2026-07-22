# Perfil del Proyecto — TuPedido! Landing Page

## Información general
- **Nombre**: TuPedido! — Landing Page Premium
- **Dominio**: SaaS / E-commerce (plataforma de sucursales virtuales para negocios físicos)
- **Stack principal**: Vanilla HTML + CSS + JS (sin framework. GSAP + Lenis + Lucide)
- **Equipo**: 1 (Full-stack con AI Agents)
- **Stakeholders**: Clientes de TuPedido! (negocios que quieren sucursal virtual)

## Objetivos de negocio
1. Convertir visitantes en leads calificados que contacten por WhatsApp
2. Demostrar el valor de tener una sucursal virtual profesional sin comisiones
3. Comunicar claramente el pricing ($100 USD setup + $10 USD/mes)
4. Posicionar TuPedido! como solución premium para negocios físicos

## Arquitectura
- **Estilo**: Landing Page SPA (Single Page Application) con scroll suave
- **Frontend**: Vanilla HTML5 semántico + CSS3 con variables + JavaScript ES6+
- **Animaciones**: GSAP 3.12 + ScrollTrigger + Lenis 1.1.9 (smooth scroll)
- **Íconos**: Lucide (vía CDN)
- **Fuentes**: Outfit (display) + Plus Jakarta Sans (body) + JetBrains Mono (mono) — Google Fonts
- **Despliegue**: File-based (HTML/CSS/JS estático, servible desde cualquier CDN o Vercel)

## Estado del proyecto
- **Estado general**: En producción
- **Fase**: Rediseño completo v2 — Liquid Premium
- **Progreso**: 100% (rediseño completado)
- **CI/CD**: No configurado (sitio estático)
- **Monitoreo**: No configurado

## Calidad
- **Cobertura de pruebas**: No aplica (landing page estática)
- **Deuda técnica estimada**: Baja
- **Documentación**: Documentación en PROJECT_MEMORY + ADR generados

## Características implementadas (v2 Liquid Premium)
- Sistema de diseño Double-Bezel con dark mode completo
- Splash cinemático con morphing shapes
- Hero con mockup 3D + parallax por scroll
- Sticky Stack (3 pasos que se pinnean y escalan al scrollear)
- Demo Flow interactiva (phone → WhatsApp simulation)
- Bento grid asimétrico con variedad visual
- Calculadora de ahorro interactiva
- Animaciones GSAP avanzadas con spring physics
- Cursor follower con magnetic hover
- Dark/Light mode con preferencia del sistema + toggle manual
- Full accessibility (skip link, ARIA roles, focus management)
- Reduced motion support completo
- Renderizado responsivo mobile-first

## Integraciones externas
| Sistema | Propósito | Tipo |
|---|---|---|
| WhatsApp API | Contacto y envío de pedidos | Link directo (wa.me) |
| Netlify | Demo de la app funcional | URL externa |
| Google Fonts | Tipografía premium | CDN |
| GSAP + ScrollTrigger | Animaciones de clase mundial | CDN (CDNJS) |
| Lenis | Smooth scroll | CDN (unpkg) |
| Lucide | Sistema de íconos | CDN (unpkg) |

## Decisiones clave
- ADR-001: Migración a sistema de diseño Liquid Premium con Double-Bezel
- ADR-002: Implementación de dark mode completo
- ADR-003: Arquitectura sticky-stack para sección "Cómo Funciona"

## Próximos hitos
| Hito | Fecha | Dependencias |
|---|---|---|
| Lanzamiento v2 Liquid Premium | Completado | — |
| Monitoreo de métricas post-lanzamiento | Pendiente | — |
