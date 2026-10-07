"use client";

import React, { useState } from "react";
import { Check, Loader2, Terminal, ChevronDown, ChevronUp } from "lucide-react";
import { AgentStep } from "@/lib/types/blueprint";

interface AgentThoughtStreamProps {
  steps: AgentStep[];
  isGenerating: boolean;
}

export default function AgentThoughtStream({ steps, isGenerating }: AgentThoughtStreamProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (steps.length === 0 && !isGenerating) return null;

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 font-mono overflow-hidden shadow-sm">
      {/* Header bar */}
      <div
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/70 border-b border-zinc-800 cursor-pointer select-none hover:bg-zinc-900 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Terminal className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-300">
            Pipeline Telemetry & Execution Log
          </span>
          <span className="text-[10px] text-zinc-500">
            ({steps.filter((s) => s.status === "completed").length}/{steps.length || 4} tasks)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isGenerating ? (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Running</span>
            </div>
          ) : (
            <span className="text-[11px] text-zinc-400">Done</span>
          )}
          <button className="text-zinc-500 hover:text-zinc-300 p-0.5">
            {collapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Log lines */}
      {!collapsed && (
        <div className="p-3.5 space-y-1.5 text-xs bg-zinc-950/80">
          {steps.map((step, idx) => {
            const isThinking = step.status === "thinking";
            const isDone = step.status === "completed";

            return (
              <div
                key={step.id}
                className="flex items-start gap-2.5 py-0.5 text-zinc-400 font-mono text-[11px] leading-relaxed"
              >
                <span className="text-zinc-600 select-none">[{String(idx + 1).padStart(2, "0")}]</span>
                <span className="font-semibold text-zinc-300 min-w-[140px]">
                  {step.agentRole}:
                </span>
                <span className="text-zinc-400 flex-1">{step.title}</span>

                <div className="flex items-center gap-1.5 shrink-0">
                  {isThinking && (
                    <span className="text-amber-400 flex items-center gap-1">
                      <Loader2 className="h-2.5 w-2.5 animate-spin" />
                      executing
                    </span>
                  )}
                  {isDone && (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      ok
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
