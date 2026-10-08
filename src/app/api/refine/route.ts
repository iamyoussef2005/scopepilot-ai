import { NextRequest, NextResponse } from "next/server";
import { ProductBlueprint } from "@/lib/types/blueprint";

export async function POST(req: NextRequest) {
  try {
    const { blueprint, instruction, apiKey }: { blueprint: ProductBlueprint; instruction: string; apiKey?: string } =
      await req.json();

    if (!blueprint || !instruction) {
      return NextResponse.json(
        { error: "Both blueprint and refinement instruction are required." },
        { status: 400 }
      );
    }

    const lower = instruction.toLowerCase();
    const updated: ProductBlueprint = JSON.parse(JSON.stringify(blueprint));

    // Dynamic intelligent refinement simulation or LLM call if key present
    const geminiKey = apiKey || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (geminiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `You are an expert Software Architect. Update this Product Blueprint JSON according to this modification instruction:
"${instruction}"

Current Blueprint:
${JSON.stringify(blueprint)}

Return strictly valid JSON adhering to the ProductBlueprint schema without markdown fences.`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json"
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (raw) {
            const parsed = JSON.parse(raw);
            return NextResponse.json({ success: true, blueprint: parsed, appliedInstruction: instruction });
          }
        }
      } catch (err) {
        console.warn("Live refinement fallback to rule-based engine", err);
      }
    }

    // Rule-based high-quality refinement engine for instant demo responsiveness
    if (lower.includes("budget") || lower.includes("cost") || lower.includes("cheap") || lower.includes("15k")) {
      updated.budgetSummary.estimatedCostUsd = Math.round(updated.budgetSummary.estimatedCostUsd * 0.7);
      updated.budgetSummary.totalEstimatedWeeks = Math.max(4, updated.budgetSummary.totalEstimatedWeeks - 2);
      updated.budgetSummary.totalEstimatedHours = Math.round(updated.budgetSummary.totalEstimatedHours * 0.75);
      updated.executiveSummary += ` [Budget Optimized: Scope streamlined to target accelerated ~${updated.budgetSummary.totalEstimatedWeeks}-week MVP release].`;
      // Trim sprints
      if (updated.sprintRoadmap.length > 3) {
        updated.sprintRoadmap = updated.sprintRoadmap.slice(0, 3);
      }
    } else if (lower.includes("mobile") || lower.includes("ios") || lower.includes("android")) {
      updated.techStack = updated.techStack.map((tech) => {
        if (tech.layer === "Frontend") {
          return {
            layer: "Frontend",
            technology: "React Native (Expo SDK 52) + NativeWind",
            rationale: "Cross-platform iOS and Android native compilation sharing 90% business logic with web."
          };
        }
        return tech;
      });
      updated.userStories.unshift({
        id: `US-MOB-1`,
        epic: "Mobile App Experience",
        title: "Biometric Login & Push Notifications",
        asA: "Mobile App User",
        iWantTo: "Log in with FaceID / TouchID and receive real-time push alerts",
        soThat: "I stay instantly notified of critical updates on my smartphone",
        acceptanceCriteria: [
          "Native FaceID prompt via Expo LocalAuthentication",
          "APNs and FCM background notification listener",
          "Deep-linking directly to relevant in-app screens"
        ],
        complexity: "Medium",
        isMvp: true
      });
    } else if (lower.includes("localization") || lower.includes("arabic") || lower.includes("ar") || lower.includes("i18n") || lower.includes("language")) {
      updated.mvpScope.push("Dual English & Arabic localization with bidirectional layout (RTL / LTR)");
      updated.techStack = updated.techStack.map((tech) => {
        if (tech.layer === "Frontend") {
          return {
            ...tech,
            technology: `${tech.technology} + next-intl (i18n & RTL Engine)`,
            rationale: "Seamless multi-language localization with zero-hydration layout flips and localized number/date formatting."
          };
        }
        return tech;
      });
      updated.userStories.unshift({
        id: "US-I18N-1",
        epic: "Internationalization & RTL",
        title: "Dual Language Switching (English / Arabic)",
        asA: "Global & Middle Eastern User",
        iWantTo: "Toggle language instantly with flawless Right-to-Left (RTL) typography",
        soThat: "I can comfortably interact in my native language without UI breakage",
        acceptanceCriteria: [
          "Instant one-click language toggle in header",
          "Automatic RTL layout direction flip and typography scaling",
          "Persisted language preference in session cookie"
        ],
        complexity: "Medium",
        isMvp: true
      });
    } else if (lower.includes("ai") || lower.includes("agent") || lower.includes("assistant") || lower.includes("copilot") || lower.includes("chatbot")) {
      updated.mvpScope.push("Context-aware AI copilot for automated workflows and smart recommendations");
      updated.techStack.push({
        layer: "AI & Agents",
        technology: "Google Gemini 2.0 Flash / OpenAI Structured Outputs",
        rationale: "High-speed reasoning engine for intent classification and autonomous execution."
      });
      updated.userStories.unshift({
        id: "US-AI-1",
        epic: "AI Intelligence Layer",
        title: "Conversational Copilot & Task Automation",
        asA: "Power User",
        iWantTo: "Interact with an embedded AI assistant using natural language",
        soThat: "I can automate repetitive configuration and get instant analytical insights",
        acceptanceCriteria: [
          "Streaming conversational response via SSE",
          "Automated tool execution with user confirmation step",
          "Exportable audit logs of AI recommendations"
        ],
        complexity: "High",
        isMvp: true
      });
    } else if (lower.includes("stripe") || lower.includes("payment") || lower.includes("billing") || lower.includes("subscription")) {
      updated.mvpScope.push("Tiered subscription plans with automated invoice billing via Stripe");
      updated.techStack = updated.techStack.map((tech) => {
        if (tech.layer === "Integrations") {
          return {
            layer: "Integrations",
            technology: "Stripe Billing & Webhooks Engine",
            rationale: "Handles recurring subscriptions, customer portal, and tax compliance globally."
          };
        }
        return tech;
      });
      updated.userStories.unshift({
        id: "US-PAY-1",
        epic: "Monetization & Billing",
        title: "Self-Serve Subscription & Checkout Portal",
        asA: "Customer Account Owner",
        iWantTo: "Upgrade or downgrade my plan with automatic prorated invoicing",
        soThat: "My team has uninterrupted access to higher tier resources",
        acceptanceCriteria: [
          "Stripe hosted checkout integration with Apple/Google Pay",
          "Automated webhook synchronization for subscription lifecycle",
          "Instant receipt and VAT invoice generation"
        ],
        complexity: "Medium",
        isMvp: true
      });
    } else {
      // General modification
      updated.proposedSolution += ` Enhanced with: ${instruction}.`;
      updated.mvpScope.push(`Automated capability for: ${instruction}`);
      updated.userStories.push({
        id: `US-EXT-${updated.userStories.length + 1}`,
        epic: "Refined Requirements",
        title: `Implementation: ${instruction.slice(0, 45)}`,
        asA: "Platform User",
        iWantTo: `Benefit from ${instruction}`,
        soThat: "The product adapts to our exact operational workflow",
        acceptanceCriteria: [
          "Requirement integrated seamlessly with core business logic",
          "Passes automated regression and unit test suites",
          "Exposed in web dashboard with clear status indicators"
        ],
        complexity: "Medium",
        isMvp: true
      });
    }

    return NextResponse.json({
      success: true,
      blueprint: updated,
      appliedInstruction: instruction
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to refine blueprint" },
      { status: 500 }
    );
  }
}
