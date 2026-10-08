"use client";

import React, { useState } from "react";
import { Check, Loader2, ChevronDown, ChevronUp, Clock } from "lucide-react";
import { AgentStep } from "@/lib/types/blueprint";

interface AgentThoughtStreamProps {
  steps: AgentStep[];
  isGenerating: boolean;
}

export default function AgentThoughtStream({ steps, isGenerating }: AgentThoughtStreamProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (steps.length === 0 && !isGenerating) return null;

  const completedCount = steps.filter((s) => s.status === "completed").length;

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-[#111114] overflow-hidden shadow-sm font-sans">
      {/* Header bar */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/40 border-b border-zinc-800 cursor-pointer select-none hover:bg-zinc-900/60 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Clock className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-xs font-medium text-zinc-200">
            Pipeline Execution & Telemetry
          </span>
          <span className="text-[11px] text-zinc-500 font-mono">
            ({completedCount}/{steps.length || 4} steps completed)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isGenerating ? (
            <div className="flex items-center gap-1.5 text-xs text-zinc-300">
              <Loader2 className="h-3 w-3 animate-spin text-zinc-400" />
              <span>Processing...</span>
            </div>
          ) : (
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <Check className="h-3 w-3" />
              Complete
            </span>
          )}
          <button className="text-zinc-500 hover:text-zinc-300 p-0.5">
            {collapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Steps List */}
      {!collapsed && (
        <div className="p-3.5 space-y-2 text-xs bg-[#09090b]">
          {steps.map((step, idx) => {
            const isThinking = step.status === "thinking";
            const isDone = step.status === "completed";

            return (
              <div
                key={step.id || idx}
                className="flex items-start gap-3 py-1 text-xs border-l-2 pl-3 transition-colors border-zinc-800"
              >
                <span className="text-zinc-500 font-mono text-[11px] shrink-0">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-300 text-xs">
                      {step.agentRole}
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-400 font-sans">{step.title}</span>
                  </div>
                  {step.summary && (
                    <p className="text-[11px] text-zinc-500 mt-0.5 font-sans">
                      {step.summary}
                    </p>
                  )}
                </div>

                <div className="shrink-0 font-mono text-[11px]">
                  {isThinking && (
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Running
                    </span>
                  )}
                  {isDone && (
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Check className="h-3 w-3 text-emerald-500" />
                      Done
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {isGenerating && steps.length < 4 && (
            <div className="flex items-center gap-2 text-zinc-500 text-xs pt-1 pl-3">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Synthesizing system modules and dependency graph...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
