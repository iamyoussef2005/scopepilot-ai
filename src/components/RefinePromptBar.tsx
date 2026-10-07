"use client";

import React, { useState } from "react";
import { Send, Loader2, Sparkles, SlidersHorizontal } from "lucide-react";

interface RefinePromptBarProps {
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export default function RefinePromptBar({ onRefine, isRefining }: RefinePromptBarProps) {
  const [instruction, setInstruction] = useState("");

  const quickChips = [
    { label: "React Native Mobile App", text: "Add a cross-platform React Native mobile app with push notifications" },
    { label: "B2B Multi-Tenancy & RBAC", text: "Add multi-tenant workspaces with role-based permissions (RBAC)" },
    { label: "Optimize Budget (< $15k)", text: "Optimize scope and timeline to target a lean MVP under $15,000" },
    { label: "Localization (EN/AR)", text: "Add multi-language localization support including English and Arabic" }
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
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
          <h3 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono">
            Iterate & Refine Architecture
          </h3>
        </div>
        <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline">
          Instruct agents to dynamically alter stack, scope, or constraints
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
            className="text-[11px] font-mono rounded-md bg-zinc-900 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-2.5 py-1 transition-colors border border-zinc-800 disabled:opacity-50"
          >
            + {chip.label}
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
          placeholder="E.g., Switch DB to ClickHouse, add biometric authentication, or reduce sprint duration..."
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900/70 py-2 pl-3.5 pr-24 text-xs text-white placeholder-zinc-500 focus:border-zinc-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isRefining || !instruction.trim()}
          className="absolute right-1.5 flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-950 hover:bg-white disabled:opacity-40 transition-colors"
        >
          {isRefining ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin text-zinc-700" />
              <span>Applying...</span>
            </>
          ) : (
            <>
              <span>Apply</span>
              <Send className="h-3 w-3 text-zinc-700" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
