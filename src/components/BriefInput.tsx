"use client";

import React from "react";
import { Sparkles, ArrowRight, Lightbulb, RefreshCw } from "lucide-react";
import { SAMPLE_PRESETS } from "@/lib/agent/demo-generator";

interface BriefInputProps {
  brief: string;
  setBrief: (val: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

export default function BriefInput({
  brief,
  setBrief,
  isLoading,
  onSubmit
}: BriefInputProps) {
  const handleSelectPreset = (key: keyof typeof SAMPLE_PRESETS) => {
    setBrief(SAMPLE_PRESETS[key].brief);
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 sm:p-7 shadow-xl backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              1
            </span>
            Input Client Brief or Project Idea
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Paste raw client requirements, notes, or an RFP. The agent will autonomously structure it.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-medium text-zinc-500 flex items-center gap-1">
            <Lightbulb className="h-3 w-3 text-amber-400" />
            Quick Presets:
          </span>
          <button
            type="button"
            onClick={() => handleSelectPreset("padel")}
            className="text-[11px] rounded-md bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 px-2 py-1 transition-colors border border-zinc-700/50"
          >
            🎾 Padel Booking
          </button>
          <button
            type="button"
            onClick={() => handleSelectPreset("invoicing")}
            className="text-[11px] rounded-md bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 px-2 py-1 transition-colors border border-zinc-700/50"
          >
            💼 AI Invoicing SaaS
          </button>
          <button
            type="button"
            onClick={() => handleSelectPreset("telehealth")}
            className="text-[11px] rounded-md bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 px-2 py-1 transition-colors border border-zinc-700/50"
          >
            🩺 NHS Telehealth
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="relative">
        <textarea
          rows={4}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="E.g., We need an autonomous AI platform that monitors e-commerce stores, flags stock shortages, and automatically generates purchase orders with supplier APIs..."
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 text-sm text-zinc-100 placeholder-zinc-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-y leading-relaxed font-sans"
        />
      </div>

      {/* Footer & Submit */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <span>Multi-agent workflow: Product Strategist • Solution Architect • Scrum Lead</span>
        </div>

        <button
          type="button"
          disabled={isLoading || brief.trim().length < 5}
          onClick={onSubmit}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all ${
            isLoading || brief.trim().length < 5
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700/50"
              : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-indigo-500/25 active:scale-95"
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin text-white" />
              <span>Agents Synthesizing Blueprint...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-white" />
              <span>Synthesize Product Blueprint</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
