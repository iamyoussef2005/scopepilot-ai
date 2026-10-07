"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, RefreshCw, Mic, MicOff, Activity, Receipt, Stethoscope, Terminal } from "lucide-react";
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
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
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

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6 shadow-sm">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-zinc-400" />
          <h2 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider font-mono">
            Client Brief & Functional Scope
          </h2>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-zinc-500 font-mono mr-1">Presets:</span>
          <button
            type="button"
            onClick={() => setBrief(SAMPLE_PRESETS.padel.brief)}
            className="flex items-center gap-1 text-[11px] rounded-md bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 px-2.5 py-1 transition-colors border border-zinc-800"
          >
            <Activity className="h-3 w-3 text-zinc-400" />
            <span>Padel Court Booking</span>
          </button>
          <button
            type="button"
            onClick={() => setBrief(SAMPLE_PRESETS.invoicing.brief)}
            className="flex items-center gap-1 text-[11px] rounded-md bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 px-2.5 py-1 transition-colors border border-zinc-800"
          >
            <Receipt className="h-3 w-3 text-zinc-400" />
            <span>Freelancer Invoicing</span>
          </button>
          <button
            type="button"
            onClick={() => setBrief(SAMPLE_PRESETS.telehealth.brief)}
            className="flex items-center gap-1 text-[11px] rounded-md bg-zinc-900 hover:bg-zinc-850 hover:border-zinc-700 text-zinc-300 px-2.5 py-1 transition-colors border border-zinc-800"
          >
            <Stethoscope className="h-3 w-3 text-zinc-400" />
            <span>Clinical Triage Hub</span>
          </button>
        </div>
      </div>

      {/* Textarea container */}
      <div className="relative rounded-lg border border-zinc-800 bg-zinc-900/60 focus-within:border-zinc-600 transition-colors">
        <textarea
          rows={4}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste client requirements, RFP notes, or project description..."
          className="w-full bg-transparent p-3.5 pb-9 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none transition-all resize-y leading-relaxed font-sans"
        />

        {/* Lower Toolbar inside input */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] text-zinc-500 font-mono hidden sm:inline">
            Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 font-mono text-[9px]">⌘ + Enter</kbd> to execute
          </span>

          <button
            type="button"
            onClick={toggleListening}
            className={`pointer-events-auto flex items-center gap-1.5 rounded px-2 py-1 text-[11px] font-mono transition-colors ${
              isListening
                ? "bg-rose-950/80 text-rose-300 border border-rose-800"
                : "bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60"
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="h-3 w-3 text-rose-400 animate-pulse" />
                <span>Recording...</span>
              </>
            ) : (
              <>
                <Mic className="h-3 w-3 text-zinc-400" />
                <span>Voice Dictate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer bar */}
      <div className="mt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
          <span>Multi-Agent Synthesis Pipeline: Product • Architecture • Delivery • Security</span>
        </div>

        <button
          type="button"
          disabled={isLoading || brief.trim().length < 5}
          onClick={onSubmit}
          className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition-all ${
            isLoading || brief.trim().length < 5
              ? "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
              : "bg-zinc-100 hover:bg-white text-zinc-950 font-semibold shadow-sm active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin text-zinc-700" />
              <span>Synthesizing Blueprint...</span>
            </>
          ) : (
            <>
              <span>Execute Architecture Run</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-700" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
