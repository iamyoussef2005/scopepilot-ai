"use client";

import React, { useState } from "react";
import { Send, Loader2, SlidersHorizontal, CornerDownLeft } from "lucide-react";

interface RefinePromptBarProps {
  onRefine: (instruction: string) => Promise<void>;
  isRefining: boolean;
}

export default function RefinePromptBar({ onRefine, isRefining }: RefinePromptBarProps) {
  const [instruction, setInstruction] = useState("");

  const quickChips = [
    {
      label: "Cross-Platform Mobile App",
      text: "Add a high-performance Flutter/React Native mobile client with offline-first sync and push notifications"
    },
    {
      label: "B2B Multi-Tenancy & RBAC",
      text: "Enforce multi-tenant organization workspaces with granular role-based access control (RBAC)"
    },
    {
      label: "Optimize for Lean MVP (< $15k)",
      text: "Optimize project scope, database tier, and sprints to deliver an agile MVP within $15,000"
    },
    {
      label: "Bilingual (EN / العربية)",
      text: "Add full bilingual support with Arabic RTL localization, translated schemas, and RTL UI readiness"
    }
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
    <div className="w-full rounded-xl border border-zinc-800 bg-[#111114] p-4 shadow-sm font-sans">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
          <h3 className="text-xs font-semibold text-zinc-200">
            Revise Specification & Engineering Constraints
          </h3>
        </div>

        <span className="text-xs text-zinc-500 hidden sm:inline">
          Instruct orchestrator to alter database, infrastructure, or scope
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
            className="text-xs rounded-md bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 px-2.5 py-1 transition-colors border border-zinc-800 hover:border-zinc-700 disabled:opacity-50"
          >
            + {chip.label}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          value={instruction}
          disabled={isRefining}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="E.g., Switch primary database to PostgreSQL with PostGIS, reduce duration to 6 weeks, or add biometric authentication..."
          className="w-full rounded-lg border border-zinc-800 bg-[#09090b] py-2 pl-3.5 pr-24 text-xs text-zinc-100 placeholder-zinc-500 focus:border-zinc-700 focus:outline-none transition-colors"
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
              <CornerDownLeft className="h-3 w-3 text-zinc-500" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
