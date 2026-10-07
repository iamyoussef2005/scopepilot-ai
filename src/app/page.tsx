"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import BriefInput from "@/components/BriefInput";
import AgentThoughtStream from "@/components/AgentThoughtStream";
import BlueprintDashboard from "@/components/BlueprintDashboard";
import ActionToolbar from "@/components/ActionToolbar";
import RefinePromptBar from "@/components/RefinePromptBar";
import { AgentStep, ProductBlueprint } from "@/lib/types/blueprint";
import { SAMPLE_PRESETS } from "@/lib/agent/demo-generator";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [brief, setBrief] = useState(SAMPLE_PRESETS.padel.brief);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const [blueprint, setBlueprint] = useState<ProductBlueprint | null>(
    SAMPLE_PRESETS.padel.blueprint
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!brief || brief.trim().length < 5) return;

    setIsGenerating(true);
    setErrorMsg(null);
    setAgentSteps([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brief,
          mode: "auto",
          apiKey
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No readable stream received.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const eventStr of events) {
          const lines = eventStr.split("\n");
          let eventType = "message";
          let dataStr = "";

          for (const line of lines) {
            if (line.startsWith("event: ")) {
              eventType = line.substring(7).trim();
            } else if (line.startsWith("data: ")) {
              dataStr = line.substring(6).trim();
            }
          }

          if (eventType === "agent_step" && dataStr) {
            try {
              const stepData = JSON.parse(dataStr) as AgentStep;
              setAgentSteps((prev) => {
                const idx = prev.findIndex((s) => s.id === stepData.id);
                if (idx >= 0) {
                  const updated = [...prev];
                  updated[idx] = stepData;
                  return updated;
                }
                return [...prev, stepData];
              });
            } catch (e) {
              console.error("Step parse error:", e);
            }
          } else if (eventType === "blueprint_completed" && dataStr) {
            try {
              const result = JSON.parse(dataStr);
              if (result.blueprint) {
                setBlueprint(result.blueprint);
              }
            } catch (e) {
              console.error("Blueprint parse error:", e);
            }
          } else if (eventType === "error" && dataStr) {
            try {
              const err = JSON.parse(dataStr);
              setErrorMsg(err.message || "An error occurred");
            } catch {
              setErrorMsg("An error occurred during generation");
            }
          }
        }
      }
    } catch (err) {
      console.error("Generation error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to run agent pipeline");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async (instruction: string) => {
    if (!blueprint) return;
    setIsRefining(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blueprint,
          instruction,
          apiKey
        })
      });

      const data = await res.json();
      if (res.ok && data.blueprint) {
        setBlueprint(data.blueprint);
      } else {
        setErrorMsg(data.error || "Failed to refine blueprint");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Refinement request failed");
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans text-zinc-100 selection:bg-zinc-800">
      <Navbar apiKey={apiKey} setApiKey={setApiKey} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Clean Engineering Header */}
        <section className="space-y-2 border-b border-zinc-850 pb-6">
          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Autonomous Product & Solution Architecture</span>
            <span className="text-zinc-600">/</span>
            <span>Zero-Trust Enterprise Modeling</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Technical Blueprint & Specification Studio
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-zinc-400 max-w-2xl font-sans leading-relaxed">
                Transform unstructured project briefs into structured user stories, interactive architecture graphs, typed data models, and costed sprint roadmaps.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
              <span className="rounded bg-zinc-900 px-2 py-1 border border-zinc-800">Next.js 15</span>
              <span className="rounded bg-zinc-900 px-2 py-1 border border-zinc-800">Prisma</span>
              <span className="rounded bg-zinc-900 px-2 py-1 border border-zinc-800">Mermaid.js</span>
            </div>
          </div>
        </section>

        {/* Input Studio */}
        <section>
          <BriefInput
            brief={brief}
            setBrief={setBrief}
            isLoading={isGenerating}
            onSubmit={handleGenerate}
          />
        </section>

        {/* Error message */}
        {errorMsg && (
          <div className="rounded-lg border border-rose-900/60 bg-rose-950/20 p-3 font-mono text-xs text-rose-300">
            [ERROR] {errorMsg}
          </div>
        )}

        {/* Pipeline Telemetry Log */}
        <section>
          <AgentThoughtStream steps={agentSteps} isGenerating={isGenerating} />
        </section>

        {/* Generated Specification & Suite */}
        {blueprint && (
          <section className="space-y-4">
            <RefinePromptBar onRefine={handleRefine} isRefining={isRefining} />
            <ActionToolbar blueprint={blueprint} />
            <BlueprintDashboard blueprint={blueprint} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-6 px-4 text-xs text-zinc-500 no-print font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">ScopePilot Studio</span>
            <span className="text-zinc-600">—</span>
            <span className="text-zinc-500">Autonomous Product Architecture</span>
          </div>
          <div className="text-zinc-600 text-[11px]">
            Ready for Production Deployment • MIT License
          </div>
        </div>
      </footer>
    </div>
  );
}
