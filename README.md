# AI BOOTSTRAP FRAMEWORK - CENTRAL

**Super-proyecto unificado** que integra los 24 módulos originales del AI Bootstrap Framework en una sola estructura coherente y lista para usar.

## Estructura

```
aibf-central/
├── AIBF-COMPLETE.md              # Framework completo en un solo archivo (entry point)
├── AGENTS.md                     # Configuración para el asistente IA
├── README.md                     # Este archivo
│
├── .opencode/                    # Núcleo del framework (inteligencia centralizada)
│   ├── agents/                   # 22 agentes de IA
│   ├── core/                     # Inicialización: bootstrap, discovery, generación
│   ├── workflow/                 # Workflow, orquestador y planificación
│   ├── memory/                   # Sistema de memoria persistente
│   ├── knowledge/                # Conocimiento: dominios, catálogos, políticas
│   ├── templates/                # Plantillas (ADR, RFC, API, User Story...)
│   ├── prompts/                  # Biblioteca de prompts reutilizables
│   │   ├── core/                 # Prompts del sistema
│   │   ├── agents/               # Prompts por agente
│   │   ├── stacks/               # Prompts por stack
│   │   └── domains/              # Prompts por dominio
│   ├── technology/               # Technology packs (7 stacks, 32 guías)
│   ├── specialists/              # Especialistas por tecnología y dominio
│   ├── skills/                   # Skills base + 110 expert skills
│   │   └── expert/               # 110 skills expertas (11 áreas x 10)
│   ├── engineering/              # Playbook de ingeniería avanzada
│   ├── governance/               # Gobierno y políticas de ingeniería
│   ├── quality/                  # Calidad, métricas, auditoría, checklists
│   ├── engine/                   # Motores: tokens, contexto, memoria, IA
│   ├── playbooks/                # Playbooks enterprise
│   └── rules/                    # Reglas de generación
│
├── docs/                         # Documentación consolidada
├── examples/                     # 10 ejemplos enterprise
├── installer/                    # Instalador (scripts sh/ps1)
└── modules/                      # READMEs originales de los 24 módulos
```

## Cómo usar

1. Copia esta carpeta como base para tu proyecto
2. El asistente IA debe leer `AIBF-COMPLETE.md` como contexto inicial
3. Luego sigue el workflow definido (Discovery → Analysis → Plan → Approval → Implementation)
4. Usa `AGENTS.md` para configurar el comportamiento

## Origen

Este proyecto unifica los 24 módulos del AI Bootstrap Framework:
01-Core · 02-Agents · 03-Skills · 04-Memory-Orchestrator · 05-Domains-Templates · 06-Technology-Packs · 07-Project-Discovery · 08-Planning-Execution · 09-AutoBootstrap · 10-Enterprise-Governance · 11-Advanced-Engineering · 12-Specialists · 13-AI-Collaboration · 14-Dynamic-Project-Generator · 15-Prompt-Engineering · 16-Knowledge-Engine · 17-Enterprise-Templates · 18-Installer · 19-Quality-Audit · 20-Enterprise-Examples · 21-Enterprise-Playbooks · 22-Ultimate-Enterprise-Pack · 23-Framework-Final · v1-Original
