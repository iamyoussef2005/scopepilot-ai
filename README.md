# 🚀 ScopePilot AI

> **Autonomous Full-Stack Product Blueprint & Technical Architecture Agent**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Mermaid.js](https://img.shields.io/badge/Mermaid-Interactive_Diagrams-ff3670?style=flat)](https://mermaid.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat)](LICENSE)

**ScopePilot AI** transforms raw, unstructured client requirements and RFPs into production-ready software specifications in seconds. It coordinates specialized AI agents (Product Strategist, Cloud Architect, Delivery Lead) to deliver interactive architecture diagrams, user stories, executable starter code, and costed sprint roadmaps.

---

## ⚡ Key Capabilities

- 🤖 **Multi-Agent Orchestration**: Real-time collaborative pipeline delineating MVP boundaries, user stories, and acceptance criteria.
- 📐 **Interactive Architecture**: Auto-rendered Mermaid.js diagrams with fullscreen mode, SVG generation, and source export.
- 💻 **Developer Starter Kit**: Auto-generates `schema.prisma` models, `docker-compose.yml`, and typed REST API routes.
- 🔄 **Conversational AI Refinement**: Dynamic feedback loop allowing users to refine scope, add mobile apps, or optimize budgets in real time.
- 💱 **Interactive Financial Modeler**: Dynamic currency switcher (**$ USD**, **£ GBP**, **€ EUR**) with live hourly rate recalculation.
- 📄 **Executive SOW Proposal & PDF**: One-click printable Statement of Work (SOW) proposal documents with sign-off blocks.
- 📦 **1-Click Starter Scaffold (.zip)**: Instant bundle download containing `schema.prisma`, `docker-compose.yml`, `.env.example`, and full specification.
- 🛡️ **Security & Compliance Audit**: OWASP/STRIDE threat matrix, GDPR readiness checklist, and disaster recovery RTO/RPO metrics.
- 🎙️ **Voice Dictation**: Real-time microphone speech-to-text integration for effortless client brief dictation.
- 🚀 **Zero-Key Demo Mode**: Pre-loaded with curated presets (Padel Booking App, AI Invoicing SaaS, NHS Telehealth Hub).

---

## 🏗️ Architecture

```mermaid
flowchart TD
    User["Client Brief / RFP"] --> UI["Next.js 15 Web App"]
    UI --> API["/api/generate Route"]
    
    subgraph AgentPipeline["Multi-Agent Engine"]
        A1["1. Product Strategist\n(Stories & Scope)"] --> A2["2. Solution Architect\n(Stack & DB Schema)"]
        A2 --> A3["3. Delivery Lead\n(Sprints & Budget)"]
        A3 --> A4["4. Mermaid Synthesizer\n(Architecture Graph)"]
    end
    
    API --> AgentPipeline
    AgentPipeline -->|Live SSE Stream| UI
    
    subgraph OutputSuite["Delivery & Export Suite"]
        UI --> PDF["Printable SOW Proposal"]
        UI --> Code["Prisma / Docker / API Specs"]
        UI --> GH["GitHub Issues Sync"]
    end
```

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 15 (React 19), TypeScript, Tailwind CSS, Lucide Icons |
| **AI & Agents** | Multi-agent structured prompting, SSE streaming, Gemini / OpenAI fallback |
| **Diagrams & Visuals** | Mermaid.js dynamic SVG rendering |
| **Integrations** | GitHub REST API, Resend Email API |
| **Infrastructure** | Edge-ready runtime, Docker Compose, Prisma ORM |

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone https://github.com/iamyoussef2005/scopepilot-ai.git
cd scopepilot-ai
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to launch the dashboard.

### 3. Environment Variables (Optional)
The application works immediately in **Demo Mode**. For live API execution, add to `.env.local`:
```env
GEMINI_API_KEY=your_key_here
RESEND_API_KEY=your_key_here     # For live email dispatch
GITHUB_TOKEN=your_token_here     # For live issue creation
```

---

## 📄 License
MIT © [iamyoussef2005](https://github.com/iamyoussef2005)
