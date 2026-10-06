"use client";

import React from "react";
import { CheckCircle2, Loader2, Sparkles, Cpu, Layers, Calendar, Network } from "lucide-react";
import { AgentStep } from "@/lib/types/blueprint";

interface AgentThoughtStreamProps {
  steps: AgentStep[];
  isGenerating: boolean;
}

export default function AgentThoughtStream({ steps, isGenerating }: AgentThoughtStreamProps) {
  if (steps.length === 0 && !isGenerating) return null;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Product Strategist":
        return <Layers className="h-4 w-4 text-amber-400" />;
      case "Solution Architect":
        return <Cpu className="h-4 w-4 text-cyan-400" />;
      case "Agile Delivery Lead":
        return <Calendar className="h-4 w-4 text-purple-400" />;
      case "Mermaid Visualizer":
        return <Network className="h-4 w-4 text-emerald-400" />;
      default:
        return <Sparkles className="h-4 w-4 text-indigo-400" />;
    }
  };

  return (
    <div className="w-full rounded-2xl border border-indigo-900/40 bg-zinc-950/90 p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
            Autonomous Agent Collaboration Pipeline
          </h3>
        </div>
        <span className="text-[11px] text-zinc-500 font-mono">
          {isGenerating ? "Multi-Agent Execution Active" : "Execution Pipeline Complete"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {steps.map((step) => {
          const isThinking = step.status === "thinking";
          const isDone = step.status === "completed";

          return (
            <div
              key={step.id}
              className={`relative flex flex-col justify-between rounded-xl p-3.5 border transition-all duration-300 ${
                isThinking
                  ? "border-indigo-500/60 bg-indigo-950/20 shadow-lg shadow-indigo-500/10 scale-[1.02]"
                  : isDone
                  ? "border-zinc-800/80 bg-zinc-900/40"
                  : "border-zinc-900 bg-zinc-950/40 opacity-50"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    {getRoleIcon(step.agentRole)}
                    <span className="text-[11px] font-semibold text-zinc-300">
                      {step.agentRole}
                    </span>
                  </div>
                  {isThinking ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                  ) : isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <div className="h-3 w-3 rounded-full border border-zinc-700" />
                  )}
                </div>
                <p className="text-xs font-medium text-white line-clamp-2">
                  {step.title}
                </p>
              </div>

              {step.summary && (
                <p className="mt-2 text-[10px] text-zinc-400 border-t border-zinc-800/60 pt-1.5 leading-relaxed">
                  {step.summary}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
