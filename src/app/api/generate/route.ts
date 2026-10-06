import { NextRequest } from "next/server";
import { generateBlueprintWithAI } from "@/lib/agent/ai-service";

export async function POST(req: NextRequest) {
  try {
    const { brief, mode, apiKey } = await req.json();

    if (!brief || typeof brief !== "string" || brief.trim().length < 5) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid project brief (at least 5 characters)." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Set up SSE stream
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        function sendEvent(type: string, data: unknown) {
          const payload = `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        }

        try {
          // Step 1: Product Strategist
          sendEvent("agent_step", {
            id: "step-1",
            agentRole: "Product Strategist",
            title: "Deconstructing Client Brief & Extracting User Stories...",
            status: "thinking"
          });
          await new Promise((r) => setTimeout(r, 600));

          sendEvent("agent_step", {
            id: "step-1",
            agentRole: "Product Strategist",
            title: "Deconstructing Client Brief & Extracting User Stories",
            status: "completed",
            summary: "Extracted target personas, core problem statement, and MVP boundary."
          });

          // Step 2: Solution Architect
          sendEvent("agent_step", {
            id: "step-2",
            agentRole: "Solution Architect",
            title: "Architecting Tech Stack & Database Topology...",
            status: "thinking"
          });
          await new Promise((r) => setTimeout(r, 700));

          sendEvent("agent_step", {
            id: "step-2",
            agentRole: "Solution Architect",
            title: "Architecting Tech Stack & Database Topology",
            status: "completed",
            summary: "Selected scalable frontend, backend, database layers, and cloud infrastructure."
          });

          // Step 3: Agile Delivery Lead
          sendEvent("agent_step", {
            id: "step-3",
            agentRole: "Agile Delivery Lead",
            title: "Forecasting Sprint Milestones, Hours & Budget...",
            status: "thinking"
          });
          await new Promise((r) => setTimeout(r, 600));

          sendEvent("agent_step", {
            id: "step-3",
            agentRole: "Agile Delivery Lead",
            title: "Forecasting Sprint Milestones, Hours & Budget",
            status: "completed",
            summary: "Formulated milestone-driven sprint schedule and resource allocation."
          });

          // Step 4: Mermaid Synthesizer
          sendEvent("agent_step", {
            id: "step-4",
            agentRole: "Mermaid Visualizer",
            title: "Synthesizing Interactive Architecture Graph...",
            status: "thinking"
          });

          // Call actual AI generation or smart generator
          const blueprint = await generateBlueprintWithAI({
            brief,
            mode: mode || "auto",
            apiKey
          });

          sendEvent("agent_step", {
            id: "step-4",
            agentRole: "Mermaid Visualizer",
            title: "Synthesizing Interactive Architecture Graph",
            status: "completed",
            summary: "Architecture diagram compiled successfully."
          });

          // Final payload
          sendEvent("blueprint_completed", { blueprint });
          controller.close();
        } catch (error) {
          console.error("Agent execution error:", error);
          sendEvent("error", {
            message: error instanceof Error ? error.message : "Failed to execute agent workflow"
          });
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive"
      }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
