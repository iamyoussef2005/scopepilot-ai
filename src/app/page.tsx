"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import BriefInput from "@/components/BriefInput";
import AgentThoughtStream from "@/components/AgentThoughtStream";
import BlueprintDashboard from "@/components/BlueprintDashboard";
import ActionToolbar from "@/components/ActionToolbar";
import { AgentStep, ProductBlueprint } from "@/lib/types/blueprint";
import { SAMPLE_PRESETS } from "@/lib/agent/demo-generator";
import confetti from "canvas-confetti";
import { Sparkles, Terminal, ArrowUpRight } from "lucide-react";

export default function Home() {
  const [apiKey, setApiKey] = useState("");
  const [brief, setBrief] = useState(SAMPLE_PRESETS.padel.brief);
  const [isGenerating, setIsGenerating] = useState(false);
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
                try {
                  confetti({
                    particleCount: 80,
                    spread: 70,
                    origin: { y: 0.6 }
                  });
                } catch {
                  // Confetti silent fallback
                }
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

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 font-sans">
      <Navbar apiKey={apiKey} setApiKey={setApiKey} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Built for G7 UK — Creative AI & Full-Stack Builder</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Turn Ambiguous Ideas into{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Production-Ready Products
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Autonomous multi-agent orchestration for digital agencies. Synthesizes client briefs into comprehensive technical architectures, interactive diagrams, user stories, and costed sprint roadmaps in seconds.
          </p>
        </section>

        {/* Step 1: Input Form */}
        <section>
          <BriefInput
            brief={brief}
            setBrief={setBrief}
            isLoading={isGenerating}
            onSubmit={handleGenerate}
          />
        </section>

        {/* Error banner */}
        {errorMsg && (
          <div className="rounded-xl border border-rose-900/50 bg-rose-950/20 p-4 text-xs text-rose-300 text-center">
            {errorMsg}
          </div>
        )}

        {/* Agent Thought Stream */}
        <section>
          <AgentThoughtStream steps={agentSteps} isGenerating={isGenerating} />
        </section>

        {/* Step 2: Generated Blueprint & Actions */}
        {blueprint && (
          <section className="space-y-6 animate-in fade-in-50 duration-500">
            <ActionToolbar blueprint={blueprint} />
            <BlueprintDashboard blueprint={blueprint} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 bg-zinc-950/80 py-8 px-4 text-center text-xs text-zinc-500 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-300">G7 UK</span>
            <span>—</span>
            <span className="text-zinc-400 italic">Think. Build. Innovate.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">
              Stack: Next.js 15 • TypeScript • Tailwind • Mermaid.js • Resend • GitHub API
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
