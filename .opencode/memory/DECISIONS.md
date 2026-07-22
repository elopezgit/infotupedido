# DECISIONS — Historial de Decisiones

## Formato
Cada entrada: `ADR-NNN | Título | Fecha | Estado`

## ADRs activos
- `ADR-001 | Migración a sistema de diseño Liquid Premium con Double-Bezel | 2026-07-21 | Vigente`
- `ADR-002 | Implementación de dark mode completo | 2026-07-21 | Vigente`
- `ADR-003 | Arquitectura sticky-stack para sección Cómo Funciona | 2026-07-21 | Vigente`

## Registro

### ADR-001 — Sistema de Diseño Liquid Premium con Double-Bezel
**Contexto**: El sitio existente usaba glassmorphism plano sin arquitectura de capas. Las cards se veían genéricas y sin profundidad física.
**Decisión**: Implementar arquitectura Double-Bezel (Doppelrand) donde cada card tiene un outer shell con bg-subtle y un inner-core con bg-surface, separados por padding + border-radius concéntricos. Esto simula hardware físico (vidrio en bandeja de aluminio).
**Consecuencias**: +30% más markup por card, pero la sensación táctil y premium aumenta dramáticamente.
**Estado**: Vigente

### ADR-002 — Dark Mode Completo
**Contexto**: El sitio original solo tenía modo claro. En 2026, el 40%+ de usuarios prefieren dark mode.
**Decisión**: Implementar dark mode con CSS custom properties + atributo `data-theme="dark"` en `<html>`. Usar localStorage para persistencia + `prefers-color-scheme` para detección automática.
**Consecuencias**: Duplicación de tokens de color (~70 variables por tema). Mantenimiento requiere actualizar ambos temas. Beneficio: experiencia premium para usuarios nocturnos.
**Estado**: Vigente

### ADR-003 — Sticky Stack para "Cómo Funciona"
**Contexto**: La sección de 3 pasos era una lista vertical con flechas. Visualmente plana y sin impacto narrativo.
**Decisión**: Implementar sticky-stack pattern: cada paso se pinnea en `top: 0` al scrollear, y el paso anterior se escala (0.92) y opaciza (0.5) mientras el siguiente entra. Esto crea una narrativa cinematográfica de "apilamiento de cartas".
**Consecuencias**: Requiere GSAP ScrollTrigger + pin. No funciona en touch (se degrada a reveal normal). Gran impacto visual en desktop.
**Estado**: Vigente
