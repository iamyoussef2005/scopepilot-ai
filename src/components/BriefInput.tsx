"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, RefreshCw, Mic, MicOff, Terminal, Trash2, Sparkles, FileText } from "lucide-react";
import { SAMPLE_PRESETS } from "@/lib/agent/demo-generator";

interface BriefInputProps {
  brief: string;
  setBrief: (val: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  onSelectPreset?: (key: "padel" | "invoicing" | "telehealth") => void;
  activePresetKey?: string | null;
}

export default function BriefInput({
  brief,
  setBrief,
  isLoading,
  onSubmit,
  onSelectPreset,
  activePresetKey
}: BriefInputProps) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          if (transcript) {
            setBrief(brief ? `${brief} ${transcript}` : transcript);
          }
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognitionRef.current = recognition;
      }
    }
  }, [brief, setBrief]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn("Speech start failed", err);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      if (!isLoading && brief.trim().length >= 5) {
        onSubmit();
      }
    }
  };

  const handlePreset = (key: "padel" | "invoicing" | "telehealth") => {
    setBrief(SAMPLE_PRESETS[key].brief);
    if (onSelectPreset) {
      onSelectPreset(key);
    }
  };

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-[#111114] p-5 sm:p-6 shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div>
          <h2 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
            <FileText className="h-4 w-4 text-zinc-400" />
            <span>Project Requirements & Technical Brief</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5 font-sans">
            Describe your product goals, feature list, or client RFP notes in Arabic or English.
          </p>
        </div>

        {/* Templates */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-zinc-500 font-mono">Sample RFPs:</span>
          <button
            type="button"
            onClick={() => handlePreset("padel")}
            className={`text-xs px-2.5 py-1 rounded-md transition-colors border ${
              activePresetKey === "padel" || brief === SAMPLE_PRESETS.padel.brief
                ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-850"
            }`}
          >
            Court Booking
          </button>
          <button
            type="button"
            onClick={() => handlePreset("invoicing")}
            className={`text-xs px-2.5 py-1 rounded-md transition-colors border ${
              activePresetKey === "invoicing" || brief === SAMPLE_PRESETS.invoicing.brief
                ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-850"
            }`}
          >
            SaaS Invoicing
          </button>
          <button
            type="button"
            onClick={() => handlePreset("telehealth")}
            className={`text-xs px-2.5 py-1 rounded-md transition-colors border ${
              activePresetKey === "telehealth" || brief === SAMPLE_PRESETS.telehealth.brief
                ? "bg-zinc-800 text-white border-zinc-700 font-medium"
                : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-850"
            }`}
          >
            Telehealth
          </button>
        </div>
      </div>

      {/* Textarea container */}
      <div className="relative rounded-lg border border-zinc-800 bg-[#09090b] focus-within:border-zinc-700 transition-colors">
        <textarea
          rows={5}
          dir="auto"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter project requirements, RFP specifications, or user stories in English or Arabic...&#10;&#10;E.g., We need an on-demand logistics dispatch app with driver GPS tracking, automated bill of lading, and split settlements..."
          className="w-full bg-transparent p-4 pb-12 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all resize-y leading-relaxed font-sans"
        />

        {/* Lower Toolbar inside input */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] text-zinc-500 font-mono hidden sm:inline flex items-center gap-1.5">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700 text-[10px]">
              ⌘ + Enter
            </kbd>
            <span>to generate</span>
          </span>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500 hidden md:inline">
              {brief.trim().length} chars
            </span>

            {brief.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setBrief("")}
                className="pointer-events-auto flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850 transition-colors"
                title="Clear input text"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            )}

            <button
              type="button"
              onClick={toggleListening}
              className={`pointer-events-auto flex items-center gap-1.5 rounded px-2 py-1 text-xs transition-colors border ${
                isListening
                  ? "bg-rose-950/60 text-rose-300 border-rose-800"
                  : "bg-zinc-900 text-zinc-400 hover:text-zinc-200 border-zinc-800"
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="h-3.5 w-3.5 text-rose-400" />
                  <span>Listening</span>
                </>
              ) : (
                <>
                  <Mic className="h-3.5 w-3.5" />
                  <span>Dictate</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Footer action bar */}
      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-zinc-500 font-sans">
          Generates structured user stories, interactive Mermaid architecture, Prisma schema, and sprint budgets.
        </div>

        <button
          type="button"
          disabled={isLoading || brief.trim().length < 5}
          onClick={onSubmit}
          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
            isLoading || brief.trim().length < 5
              ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
              : "bg-zinc-100 hover:bg-white text-zinc-950 shadow-sm"
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              <span>Generating Specification...</span>
            </>
          ) : (
            <>
              <span>Compile Architecture Blueprint</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
