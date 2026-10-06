"use client";

import React, { useState } from "react";
import { Sparkles, Send, Loader2, Wand2 } from "lucide-react";

interface RefinePromptBarProps {
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export default function RefinePromptBar({ onRefine, isRefining }: RefinePromptBarProps) {
  const [instruction, setInstruction] = useState("");

  const quickChips = [
    { label: "📱 Add Cross-Platform Mobile App", text: "Add a cross-platform React Native mobile app with push notifications" },
    { label: "🏢 B2B Multi-Tenancy & RBAC", text: "Add multi-tenant workspaces with role-based permissions (RBAC)" },
    { label: "💸 Optimize for < $15k Budget", text: "Optimize scope and timeline to target a lean MVP under $15,000" },
    { label: "🌐 Multi-Language (EN/AR)", text: "Add multi-language localization support including English and Arabic" }
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!instruction.trim() || isRefining) return;
    const text = instruction;
    setInstruction("");
    await onRefine(text);
  };

  const handleChipClick = async (chipText: string) => {
    if (isRefining) return;
    await onRefine(chipText);
  };

  return (
    <div className="w-full rounded-2xl border border-indigo-900/50 bg-gradient-to-b from-indigo-950/30 via-zinc-950/80 to-zinc-950 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
            <Wand2 className="h-3.5 w-3.5" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Agent Feedback & Dynamic Iteration Loop
          </h3>
        </div>
        <span className="text-[11px] text-zinc-400 hidden sm:inline">
          Instruct the agent team to update scope, tech stack, or budget
        </span>
      </div>

      {/* Suggestion Chips */}
      <div className="flex items-center gap-1.5 flex-wrap mb-3">
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            type="button"
            disabled={isRefining}
            onClick={() => handleChipClick(chip.text)}
            className="text-[11px] rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white px-2.5 py-1.5 transition-colors border border-zinc-800 disabled:opacity-50"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Input row */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={instruction}
          disabled={isRefining}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="E.g., Switch authentication to Clerk, add biometric login, or reduce sprint count..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/90 py-2.5 pl-4 pr-24 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={isRefining || !instruction.trim()}
          className="absolute right-1.5 flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-40 transition-colors"
        >
          {isRefining ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Refining...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              <span>Refine</span>
              <Send className="h-3 w-3" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
