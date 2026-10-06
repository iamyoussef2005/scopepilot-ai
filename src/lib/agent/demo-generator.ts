import { ProductBlueprint } from "@/lib/types/blueprint";

export const SAMPLE_PRESETS: Record<string, { label: string; brief: string; blueprint: ProductBlueprint }> = {
  padel: {
    label: "🎾 Padel Court On-Demand Booking App",
    brief: "We want a high-performance mobile and web application for booking indoor and outdoor Padel courts across the UK. It should include real-time slot availability, split payments between 4 players, push notifications for matches, and an admin dashboard for club managers to manage court lighting and pricing dynamic tiers.",
    blueprint: {
      projectTitle: "PadelPulse UK",
      tagline: "Smart Court Booking, Split Payments & Matchmaking for Padel Clubs",
      executiveSummary: "PadelPulse is a next-generation sports tech platform engineered for modern Padel clubs and players. It automates court scheduling, handles 4-way split payments via Apple Pay/Stripe, integrates with IoT court lighting systems, and provides club owners with dynamic yield pricing.",
      targetAudience: [
        "Padel players seeking instant court reservations & matchmaking",
        "Club managers optimizing court occupancy & automated lighting",
        "Coaches scheduling group clinics and private lessons"
      ],
      problemStatement: "Padel is the fastest-growing racquet sport in the UK and Europe, but players struggle with phone-call reservations, awkward payment splitting, and fragmented club systems.",
      proposedSolution: "A seamless mobile-first PWA and web platform with sub-second slot reservation, automated WhatsApp/SMS invite links for player splitting, and IoT integration for automated court gate and floodlight access.",
      mvpScope: [
        "Interactive court slot calendar with real-time lock mechanism",
        "Stripe split-checkout (host pays deposit, players settle within 2 hours)",
        "Club manager admin portal for pricing & slot configuration",
        "Automated booking confirmation and calendar sync (.ics/Google Calendar)"
      ],
      v2FutureScope: [
        "Automated IoT court gate PIN codes & lighting relays via MQTT",
        "AI-driven dynamic surge pricing based on weather & historical occupancy",
        "Player ELO rating system & community matchmaking feed",
        "Club pro-shop POS integration"
      ],
      techStack: [
        {
          layer: "Frontend",
          technology: "Next.js 15 (React 19) + React Native / Expo",
          rationale: "Unified TypeScript codebase with ultra-fast SSR for SEO web discovery and native mobile apps for iOS/Android."
        },
        {
          layer: "Backend",
          technology: "Node.js / Hono on Cloudflare Workers",
          rationale: "Edge computing ensures sub-50ms latency for court availability checks and concurrency locks."
        },
        {
          layer: "Database",
          technology: "PostgreSQL (Supabase) + Redis (Upstash)",
          rationale: "Postgres handles relational integrity for bookings, while Redis implements high-speed 5-minute slot reservations locks to prevent double-booking."
        },
        {
          layer: "Integrations",
          technology: "Stripe Connect + Twilio WhatsApp API",
          rationale: "Facilitates multi-party split payments and frictionless WhatsApp match invitations without requiring app downloads for teammates."
        },
        {
          layer: "DevOps & Cloud",
          technology: "Vercel + GitHub Actions CI/CD",
          rationale: "Zero-maintenance edge deployments with automated preview environments and automated end-to-end tests."
        }
      ],
      mermaidArchitecture: `flowchart TD
    PlayerApp["Player Mobile/Web App\\n(Next.js & Expo)"] -->|GraphQL / REST| EdgeAPI["Edge API Gateway\\n(Hono / Cloudflare)"]
    AdminApp["Club Manager Dashboard\\n(Next.js 15)"] -->|Secure HTTPS| EdgeAPI
    
    subgraph DataPlane["Data & Caching Layer"]
        EdgeAPI -->|Concurrency Slot Lock| RedisCache["Upstash Redis\\n(Slot Locks)"]
        EdgeAPI -->|Read/Write Operations| MainDB["PostgreSQL / Supabase\\n(Clubs, Courts, Bookings)"]
    end
    
    subgraph Integrations["External Services & APIs"]
        EdgeAPI -->|Split Checkout| Stripe["Stripe Connect API"]
        EdgeAPI -->|Reminders & Invites| Twilio["Twilio / WhatsApp API"]
        EdgeAPI -->|Relay Triggers| IoTHub["Club IoT Access Controller\\n(MQTT Gate & Lighting)"]
    end`,
      userStories: [
        {
          id: "US-101",
          epic: "Booking & Availability",
          title: "Real-time Slot Booking with Concurrency Lock",
          asA: "Registered Padel Player",
          iWantTo: "Select a 60 or 90 minute court slot and hold it for 5 minutes",
          soThat: "I can coordinate with my teammates without having the court sniped by another group",
          acceptanceCriteria: [
            "Slot turns into 'reserved' state instantly via WebSocket",
            "5-minute countdown timer displays prominently",
            "Slot is released back if checkout is not completed within 300 seconds"
          ],
          complexity: "High",
          isMvp: true
        },
        {
          id: "US-102",
          epic: "Payments & Settlement",
          title: "4-Way Split Payment Link Generation",
          asA: "Match Organizer",
          iWantTo: "Pay my 25% share and generate a payment link for the other 3 players",
          soThat: "I don't have to chase friends for bank transfers after the game",
          acceptanceCriteria: [
            "Organizer enters 3 phone numbers or generates a shareable link",
            "Each player pays their exact 25% quota through Apple/Google Pay",
            "If unpaid 30 mins before match, primary booker's card is charged the remainder"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-103",
          epic: "Club Operations",
          title: "Peak / Off-Peak Dynamic Pricing Engine",
          asA: "Club Owner",
          iWantTo: "Set tiered pricing for weekdays vs weekends and peak hours (6pm-10pm)",
          soThat: "I maximize club revenue and encourage off-peak court utilization",
          acceptanceCriteria: [
            "Visual price matrix editor in admin portal",
            "Instant price recalculation on the player calendar view",
            "Support for promo codes and seasonal discounts"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-104",
          epic: "Automation & Access",
          title: "Automated PIN Code for Gate & Floodlights",
          asA: "Player with a confirmed booking",
          iWantTo: "Receive a one-time 4-digit PIN 15 minutes before match start",
          soThat: "I can enter the club court and activate lights without staff assistance",
          acceptanceCriteria: [
            "Unique PIN valid only for the booked time slot (+10m grace period)",
            "Sent via SMS and displayed in the app booking ticket",
            "Webhook triggers gate relay controller"
          ],
          complexity: "High",
          isMvp: false
        }
      ],
      sprintRoadmap: [
        {
          sprintNumber: 1,
          title: "Core Foundation & Slot Engine",
          durationWeeks: 2,
          coreDeliverables: [
            "Database schema setup on PostgreSQL",
            "Redis slot locking microservice",
            "Interactive calendar web UI"
          ],
          estimatedHours: 80,
          estimatedCostUsd: 6400
        },
        {
          sprintNumber: 2,
          title: "Payment Integration & Split Engine",
          durationWeeks: 2,
          coreDeliverables: [
            "Stripe Connect integration for club payouts",
            "Split checkout webhook handler",
            "WhatsApp invite link generator"
          ],
          estimatedHours: 75,
          estimatedCostUsd: 6000
        },
        {
          sprintNumber: 3,
          title: "Club Management Dashboard",
          durationWeeks: 2,
          coreDeliverables: [
            "Admin portal for court schedules and pricing matrix",
            "Booking cancellation & refund workflow",
            "Revenue reports and analytics export"
          ],
          estimatedHours: 70,
          estimatedCostUsd: 5600
        },
        {
          sprintNumber: 4,
          title: "Testing, Hardening & Production Launch",
          durationWeeks: 2,
          coreDeliverables: [
            "End-to-end booking tests with Playwright",
            "Stress testing Redis locks under 1000 concurrent users",
            "Vercel production deployment & DNS configuration"
          ],
          estimatedHours: 55,
          estimatedCostUsd: 4400
        }
      ],
      budgetSummary: {
        totalEstimatedWeeks: 8,
        totalEstimatedHours: 280,
        estimatedCostUsd: 22400,
        recommendedTeam: [
          "1x Senior Full-Stack Engineer (Next.js/Node)",
          "1x Product UI/UX Designer (Part-time)",
          "1x QA & DevOps Engineer"
        ]
      }
    }
  },

  invoicing: {
    label: "💼 AI Autonomous Invoicing & Tax Copilot for Freelancers",
    brief: "A smart SaaS platform for UK and EU freelancers that connects with open banking (Plaid / Yapily) or Stripe, automatically detects billable client work from calendar and email, generates HMRC-compliant invoices, and calculates quarterly VAT / tax liabilities with an AI advisory agent.",
    blueprint: {
      projectTitle: "FreelanceFlow AI",
      tagline: "Autonomous Invoicing, Expense Categorization & Tax Estimation for Modern Solopreneurs",
      executiveSummary: "FreelanceFlow AI eliminates admin friction for contractors and creators. By listening to Google Calendar meetings, GitHub commits, and banking feeds, the AI agent automatically compiles draft invoices, issues polite reminder sequences, and forecasts tax withholdings.",
      targetAudience: [
        "Tech contractors, designers, and digital agency freelancers",
        "Consultants billing hourly or milestone-based deliverables",
        "Small service businesses needing hands-free billing"
      ],
      problemStatement: "Freelancers lose an average of 4.5 hours per week on manual invoice drafting, chasing overdue payments, and worrying about unexpected tax bills at year-end.",
      proposedSolution: "An AI-first financial assistant that integrates with communication channels, synthesizes billable logs into professional invoices, and executes automated payment reconciliation.",
      mvpScope: [
        "Calendar & email integration to detect client meetings and deliverable approvals",
        "AI-assisted 1-click invoice generation with PDF download and email dispatch",
        "Stripe and Open Banking payment reconciliation",
        "Live tax pot estimator (Income Tax + National Insurance + VAT)"
      ],
      v2FutureScope: [
        "Autonomous WhatsApp/SMS payment reminders with polite AI negotiation tone",
        "Direct HMRC Making Tax Digital (MTD) API filing",
        "Multi-currency smart hedging and FX conversion tracking",
        "Receipt OCR scanning via camera"
      ],
      techStack: [
        {
          layer: "Frontend",
          technology: "Next.js 15 + Tailwind CSS + Lucide React",
          rationale: "Clean, responsive dashboard layout with instant client-side transitions and PDF rendering preview."
        },
        {
          layer: "Backend",
          technology: "FastAPI (Python) or Next.js Route Handlers",
          rationale: "Seamless integration between financial data processing and LLM agent orchestration."
        },
        {
          layer: "AI & Agents",
          technology: "Gemini 2.0 Flash / OpenAI Function Calling",
          rationale: "Fast, accurate extraction of billing terms and line items from messy text and calendars."
        },
        {
          layer: "Database",
          technology: "PostgreSQL (Supabase) + Prisma ORM",
          rationale: "Strict relational integrity for financial ledgers, audit trails, and multi-tenant security."
        },
        {
          layer: "Integrations",
          technology: "Plaid / Yapily (Open Banking) + Stripe Billing + Resend",
          rationale: "Direct bank feeds for payment matching and reliable transactional email delivery."
        }
      ],
      mermaidArchitecture: `flowchart TD
    User["Freelancer / Solopreneur"] --> UI["FreelanceFlow Dashboard\\n(Next.js 15)"]
    UI --> API["API Gateway & Agent Dispatcher"]
    
    subgraph AgentOrchestration["AI Extraction & Reconciliation Engine"]
        API --> Agent["Billing AI Agent"]
        Agent --> CalendarTool["Google Calendar / Workspace API"]
        Agent --> BankTool["Plaid / Open Banking Webhook"]
    end
    
    subgraph Storage["Financial Ledger"]
        API --> DB[("PostgreSQL DB\\n(Invoices, Clients, Taxes)")]
    end
    
    subgraph ExternalServices["Payment & Delivery"]
        API --> Stripe["Stripe Hosted Checkout"]
        API --> Email["Resend Transactional Email"]
    end`,
      userStories: [
        {
          id: "US-201",
          epic: "Smart Extraction",
          title: "Calendar Event to Billable Line Item Extraction",
          asA: "Consultant",
          iWantTo: "Connect my Google Calendar and let AI extract all client meetings for the month",
          soThat: "I don't have to manually count billable hours across multiple client engagements",
          acceptanceCriteria: [
            "OAuth connection to Google Calendar",
            "Agent groups meetings by client name and computes total duration",
            "Editable preview table with 1-click approval"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-202",
          epic: "Invoice Automation",
          title: "One-Click Professional Invoice Generation with Payment Link",
          asA: "Freelancer",
          iWantTo: "Generate a branded PDF invoice with embedded Stripe payment link",
          soThat: "Clients can pay immediately via card or bank transfer without delays",
          acceptanceCriteria: [
            "Customizable logo, tax ID, and bank details",
            "Auto-calculation of VAT rates (0%, 20%)",
            "Direct Stripe payment URL embedded as QR code and clickable button"
          ],
          complexity: "Low",
          isMvp: true
        },
        {
          id: "US-203",
          epic: "Tax & Financial Intelligence",
          title: "Quarterly Tax Pot Calculation",
          asA: "UK Sole Trader",
          iWantTo: "See an accurate estimate of tax owed based on paid invoices and recorded expenses",
          soThat: "I know exactly how much money to set aside in my tax savings pot",
          acceptanceCriteria: [
            "Supports UK tax year thresholds and National Insurance rates",
            "Shows breakdown of income, allowable expenses, and net taxable profit",
            "Visual gauge of tax health"
          ],
          complexity: "High",
          isMvp: true
        }
      ],
      sprintRoadmap: [
        {
          sprintNumber: 1,
          title: "Core Ledger & Invoice Creator",
          durationWeeks: 2,
          coreDeliverables: [
            "Client and Invoice CRUD with PostgreSQL",
            "PDF invoice template generation",
            "Email dispatch via Resend"
          ],
          estimatedHours: 70,
          estimatedCostUsd: 5600
        },
        {
          sprintNumber: 2,
          title: "AI Calendar & Meeting Parser",
          durationWeeks: 2,
          coreDeliverables: [
            "Google Calendar API integration",
            "LLM structured line-item extraction",
            "Interactive invoice review wizard"
          ],
          estimatedHours: 80,
          estimatedCostUsd: 6400
        },
        {
          sprintNumber: 3,
          title: "Stripe & Open Banking Matching",
          durationWeeks: 2,
          coreDeliverables: [
            "Stripe webhook for auto-marking invoices as paid",
            "Open Banking read-only feed connection",
            "Payment notification alerts"
          ],
          estimatedHours: 75,
          estimatedCostUsd: 6000
        },
        {
          sprintNumber: 4,
          title: "Tax Estimator & Polish",
          durationWeeks: 1,
          coreDeliverables: [
            "UK tax calculation engine",
            "Dashboard metrics and financial graphs",
            "Mobile-friendly UI tuning"
          ],
          estimatedHours: 45,
          estimatedCostUsd: 3600
        }
      ],
      budgetSummary: {
        totalEstimatedWeeks: 7,
        totalEstimatedHours: 270,
        estimatedCostUsd: 21600,
        recommendedTeam: [
          "1x Senior Full-Stack Engineer",
          "1x Fintech Product Specialist (Consulting)",
          "1x UI Designer"
        ]
      }
    }
  },

  telehealth: {
    label: "🩺 HealthTech AI Triage & Telemedicine Consultation Hub",
    brief: "A patient intake and telemedicine portal compliant with UK NHS / GDPR standards. Features an AI clinical triage assistant that gathers patient symptom history before video calls, summarizes clinical notes for NHS GPs, and automates e-prescription generation.",
    blueprint: {
      projectTitle: "CareBridge AI",
      tagline: "Intelligent Pre-Consultation Triage & Clinical Summary Platform",
      executiveSummary: "CareBridge AI bridges the gap between overwhelmed healthcare providers and patients. An empathetic AI intake assistant conducts preliminary anamnesis before GP appointments, formatting clinical notes into standard SBAR format, saving doctors up to 40% of consultation administrative time.",
      targetAudience: [
        "Private medical practices, NHS GP clinics, and telemedicine providers",
        "Patients seeking rapid online doctor appointments and digital prescription repeats"
      ],
      problemStatement: "Doctors spend more than 30% of each 10-minute appointment typing medical history rather than engaging directly with patients, leading to physician burnout and diagnostic oversights.",
      proposedSolution: "A secure, encrypted web app where patients complete an interactive AI-guided clinical anamnesis before their video consultation. The GP enters the room with a synthesized, structured medical briefing.",
      mvpScope: [
        "Patient-friendly symptom questionnaire powered by guided medical LLM agent",
        "SBAR (Situation, Background, Assessment, Recommendation) doctor summary",
        "Encrypted WebRTC video consultation room with 1-click patient join",
        "Audit log and GDPR-compliant data redaction"
      ],
      v2FutureScope: [
        "Automated NHS Electronic Prescription Service (EPS) integration",
        "Wearable health data sync (Apple HealthKit / Google Fit)",
        "Multi-lingual real-time voice translation during consultations"
      ],
      techStack: [
        {
          layer: "Frontend",
          technology: "Next.js 15 (App Router) + Tailwind CSS + WebRTC",
          rationale: "Secure, performant client experience with zero-install video calling across mobile and desktop."
        },
        {
          layer: "Backend",
          technology: "Node.js (TypeScript) + Fastify",
          rationale: "High-throughput, strictly-typed API layer ensuring rigorous input validation."
        },
        {
          layer: "AI & Agents",
          technology: "Fine-tuned Medical LLM / Gemini with strict guardrails",
          rationale: "Structured clinical SBAR synthesis without providing unauthorized medical diagnoses."
        },
        {
          layer: "Database",
          technology: "Encrypted PostgreSQL (AWS RDS / Supabase) with Row Level Security",
          rationale: "Zero-trust database architecture satisfying NHS Information Governance and GDPR."
        },
        {
          layer: "DevOps & Cloud",
          technology: "AWS HealthLake / Docker on AWS ECS",
          rationale: "HIPAA and UK NHS Data Security & Protection Toolkit (DSPT) compliance."
        }
      ],
      mermaidArchitecture: `flowchart TD
    Patient["Patient (Mobile Web)"] -->|Intake Questionnaire| WebApp["Next.js Patient Portal"]
    Doctor["General Practitioner (GP)"] -->|Clinical Review| DoctorPortal["Doctor SBAR Dashboard"]
    
    subgraph SecurityBoundary["NHS GDPR Compliant Boundary"]
        WebApp -->|Encrypted TLS 1.3| Gateway["API Gateway & Auth Service"]
        DoctorPortal -->|Encrypted TLS 1.3| Gateway
        
        Gateway --> TriageAgent["AI Triage & SBAR Agent"]
        Gateway --> DB[("Encrypted Medical Records\\n(PostgreSQL + KMS)")]
    end
    
    subgraph RealtimeMedia["Real-Time Consultation"]
        WebApp <-->|Encrypted P2P WebRTC Video| DoctorPortal
    end`,
      userStories: [
        {
          id: "US-301",
          epic: "Intake & Triage",
          title: "Conversational Pre-Consultation Symptom Assessment",
          asA: "Patient with acute symptoms",
          iWantTo: "Answer clear, non-technical questions about my condition before my appointment",
          soThat: "The doctor is fully prepared and understands my case prior to our call",
          acceptanceCriteria: [
            "Follows standardized medical triage decision-trees",
            "Emergency red-flag warning triggers immediate 999 alert if life-threatening",
            "Takes under 4 minutes to complete"
          ],
          complexity: "High",
          isMvp: true
        },
        {
          id: "US-302",
          epic: "Clinical Workflow",
          title: "Automated SBAR Summary Generation for Doctors",
          asA: "Attending GP",
          iWantTo: "Review a 30-second bulleted SBAR brief before clicking into the video room",
          soThat: "I can focus on clinical decision-making rather than repetitive data entry",
          acceptanceCriteria: [
            "Formatted in standard NHS SBAR style",
            "Includes patient's known allergies and existing medications",
            "Allows GP to edit and approve notes with 1 click"
          ],
          complexity: "Medium",
          isMvp: true
        },
        {
          id: "US-303",
          epic: "Telemedicine",
          title: "Zero-Install WebRTC Secure Video Room",
          asA: "Patient and Doctor",
          iWantTo: "Join the consultation room with a single click from SMS/Email without installing apps",
          soThat: "Older or non-technical patients have zero friction accessing healthcare",
          acceptanceCriteria: [
            "Peer-to-peer encrypted WebRTC streaming",
            "Works across iOS Safari, Android Chrome, and Desktop browsers",
            "Waiting room status display"
          ],
          complexity: "High",
          isMvp: true
        }
      ],
      sprintRoadmap: [
        {
          sprintNumber: 1,
          title: "Security, Auth & Intake Flow",
          durationWeeks: 2,
          coreDeliverables: [
            "GDPR-compliant user authentication and encrypted DB schema",
            "Conversational intake questionnaire UI",
            "Emergency red-flag detection system"
          ],
          estimatedHours: 85,
          estimatedCostUsd: 7200
        },
        {
          sprintNumber: 2,
          title: "AI SBAR Synthesis Engine",
          durationWeeks: 2,
          coreDeliverables: [
            "LLM prompt engineering with clinical safety guidelines",
            "Doctor dashboard with real-time note preview",
            "Exportable PDF clinical summary"
          ],
          estimatedHours: 80,
          estimatedCostUsd: 6800
        },
        {
          sprintNumber: 3,
          title: "WebRTC Video Consultation Room",
          durationWeeks: 2,
          coreDeliverables: [
            "Live WebRTC signaling server",
            "In-call notes and screen-sharing",
            "Post-call prescription repeat triggers"
          ],
          estimatedHours: 90,
          estimatedCostUsd: 7600
        },
        {
          sprintNumber: 4,
          title: "Clinical Audit & Compliance Hardening",
          durationWeeks: 2,
          coreDeliverables: [
            "Penetration testing and encryption verification",
            "Role-based access control for clinic staff",
            "Production launch on HIPAA/NHS compliant cloud"
          ],
          estimatedHours: 60,
          estimatedCostUsd: 5200
        }
      ],
      budgetSummary: {
        totalEstimatedWeeks: 8,
        totalEstimatedHours: 315,
        estimatedCostUsd: 26800,
        recommendedTeam: [
          "1x Lead Full-Stack Engineer",
          "1x Healthcare Compliance / Security Engineer",
          "1x Medical UX Specialist"
        ]
      }
    }
  }
};

export function getCustomBlueprintFromBrief(brief: string): ProductBlueprint {
  // Check if matches any preset keyword
  const lower = brief.toLowerCase();
  if (lower.includes("padel") || lower.includes("court") || lower.includes("sport") || lower.includes("tennis")) {
    return SAMPLE_PRESETS.padel.blueprint;
  }
  if (lower.includes("invoice") || lower.includes("freelanc") || lower.includes("tax") || lower.includes("bill") || lower.includes("finance")) {
    return SAMPLE_PRESETS.invoicing.blueprint;
  }
  if (lower.includes("health") || lower.includes("doctor") || lower.includes("telemed") || lower.includes("clinic") || lower.includes("patient")) {
    return SAMPLE_PRESETS.telehealth.blueprint;
  }

  // Generative fallback dynamic blueprint based on user's brief
  const title = brief.split(" ").slice(0, 4).join(" ").replace(/[^a-zA-Z0-9 ]/g, "") || "Custom Product";
  return {
    projectTitle: `${title.charAt(0).toUpperCase() + title.slice(1)} Platform`,
    tagline: "Autonomous End-to-End Digital Solution by G7 UK",
    executiveSummary: `A purpose-built solution engineered to address: "${brief.slice(0, 180)}...". The system is architected for high availability, seamless user onboarding, and enterprise-grade scalability.`,
    targetAudience: [
      "Core end-users seeking frictionless task completion",
      "Operations managers monitoring live performance and metrics",
      "Executive stakeholders requiring business intelligence reports"
    ],
    problemStatement: `Current solutions for this domain lack real-time automation, suffer from fragmented data silos, and introduce unnecessary manual overhead for end users.`,
    proposedSolution: `A unified full-stack web and mobile application powered by specialized AI agents, real-time event streaming, and automated third-party integrations.`,
    mvpScope: [
      "Intuitive customer-facing onboarding and primary action flow",
      "Automated event-driven processing pipeline with status tracking",
      "Administrative oversight dashboard with role-based access",
      "Automated transactional notification engine (Email/SMS)"
    ],
    v2FutureScope: [
      "Predictive analytics and anomaly detection model",
      "Enterprise SSO integration (SAML/Okta)",
      "Public developer API with webhooks and rate limiting"
    ],
    techStack: [
      {
        layer: "Frontend",
        technology: "Next.js 15 (React 19) + Tailwind CSS + Shadcn UI",
        rationale: "Optimal performance with server-rendered pages and interactive client islands."
      },
      {
        layer: "Backend",
        technology: "Node.js / FastAPI with REST & WebSocket handlers",
        rationale: "High concurrent throughput with typed request validation."
      },
      {
        layer: "AI & Agents",
        technology: "Gemini 2.0 / OpenAI Function Calling",
        rationale: "Autonomous multi-step task planning and structured schema generation."
      },
      {
        layer: "Database",
        technology: "PostgreSQL (Supabase) + Redis (Upstash)",
        rationale: "Relational persistence paired with in-memory caching for sub-millisecond responses."
      },
      {
        layer: "DevOps & Cloud",
        technology: "Vercel / Docker on AWS + GitHub Actions",
        rationale: "Automated test suites, continuous deployment, and scalable infrastructure."
      }
    ],
    mermaidArchitecture: `flowchart TD
    UserClient["Client Web / Mobile Application"] -->|Secure HTTPS / WSS| Gateway["API Gateway & Auth"]
    Gateway --> Orchestrator["Agent Workflow Orchestrator"]
    
    subgraph CoreEngine["Application & Agent Services"]
        Orchestrator --> LLMService["AI Reasoning Engine\\n(Gemini / OpenAI)"]
        Orchestrator --> BusinessLogic["Domain Business Logic"]
    end
    
    subgraph DataTier["Data & Cache Tier"]
        BusinessLogic --> Cache["Redis Cache\\n(Sessions & Locks)"]
        BusinessLogic --> DB[("PostgreSQL Database\\n(Primary Store)")]
    end
    
    subgraph IntegrationsTier["External Integrations"]
        BusinessLogic --> ResendAPI["Resend Email Service"]
        BusinessLogic --> ThirdParty["Third-Party Webhooks & APIs"]
    end`,
    userStories: [
      {
        id: "US-01",
        epic: "Onboarding & Access",
        title: "Frictionless Magic-Link & Social Authentication",
        asA: "New User",
        iWantTo: "Sign up via Google or secure email magic-link",
        soThat: "I can access the platform instantly without remembering another password",
        acceptanceCriteria: [
          "One-click OAuth authentication",
          "Session persistence across devices",
          "Automatic profile creation"
        ],
        complexity: "Low",
        isMvp: true
      },
      {
        id: "US-02",
        epic: "Core Workflow",
        title: "Intelligent Task Execution & Status Tracking",
        asA: "Active User",
        iWantTo: "Submit my requirements and monitor real-time execution progress",
        soThat: "I have full visibility into the system's actions and deliverables",
        acceptanceCriteria: [
          "Real-time progress stepper via Server-Sent Events",
          "Clear visual confirmation upon task completion",
          "Instant error recovery and helpful validation messages"
        ],
        complexity: "High",
        isMvp: true
      },
      {
        id: "US-03",
        epic: "Administration",
        title: "System Metrics & Analytics Dashboard",
        asA: "Operations Admin",
        iWantTo: "Review system throughput, active users, and error rates",
        soThat: "I can ensure high service reliability and SLA compliance",
        acceptanceCriteria: [
          "Real-time charts and KPI cards",
          "CSV / JSON export capability",
          "Audit logs with user attribution"
        ],
        complexity: "Medium",
        isMvp: true
      }
    ],
    sprintRoadmap: [
      {
        sprintNumber: 1,
        title: "Architecture & Foundation Setup",
        durationWeeks: 2,
        coreDeliverables: [
          "Repository and CI/CD pipelines",
          "Database schema design and migration scripts",
          "Authentication and role management"
        ],
        estimatedHours: 80,
        estimatedCostUsd: 6400
      },
      {
        sprintNumber: 2,
        title: "Core Feature Engine & Agent Pipeline",
        durationWeeks: 2,
        coreDeliverables: [
          "Primary workflow implementation",
          "AI agent tool calling integration",
          "Real-time event streaming"
        ],
        estimatedHours: 80,
        estimatedCostUsd: 6400
      },
      {
        sprintNumber: 3,
        title: "Admin Dashboard & External APIs",
        durationWeeks: 2,
        coreDeliverables: [
          "Operational metrics and management UI",
          "Third-party webhook handlers",
          "Transactional email dispatch"
        ],
        estimatedHours: 70,
        estimatedCostUsd: 5600
      },
      {
        sprintNumber: 4,
        title: "Hardening, Security & Launch",
        durationWeeks: 2,
        coreDeliverables: [
          "Performance profiling and load testing",
          "Security vulnerability audit",
          "Production deployment to Vercel/Cloud"
        ],
        estimatedHours: 50,
        estimatedCostUsd: 4000
      }
    ],
    budgetSummary: {
      totalEstimatedWeeks: 8,
      totalEstimatedHours: 280,
      estimatedCostUsd: 22400,
      recommendedTeam: [
        "1x Senior Full-Stack Engineer",
        "1x AI / Systems Architect",
        "1x Product Designer (UI/UX)"
      ]
    }
  };
}
