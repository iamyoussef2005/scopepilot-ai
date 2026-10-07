"use client";

import React, { useState } from "react";
import { Key, CheckCircle2, ExternalLink, Terminal, Shield, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

export default function Navbar({ apiKey, setApiKey }: NavbarProps) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSaveKey = () => {
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/70 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-700/80 text-white font-mono text-xs font-bold tracking-tighter">
            SP
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight text-zinc-100">ScopePilot</span>
            <span className="text-zinc-600">/</span>
            <span className="font-mono text-[11px] text-zinc-400">Architecture Studio</span>
            <span className="hidden sm:inline-block rounded px-1.5 py-0.2 bg-zinc-800 text-[10px] font-mono text-zinc-400 border border-zinc-700/50">
              v1.2
            </span>
          </div>
        </div>

        {/* Center telemetry / status */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900/80 border border-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] text-zinc-300">Agents Online</span>
          </div>
          <span className="text-zinc-600">•</span>
          <span className="text-[11px] text-zinc-500">Zod Strict Schema • SSE Pipeline</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors border ${
              apiKey
                ? "bg-zinc-900 text-emerald-400 border-emerald-800/60"
                : "bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <Key className="h-3.5 w-3.5 text-zinc-400" />
            <span className="font-mono text-[11px]">{apiKey ? "API Key Active" : "Custom Key"}</span>
          </button>

          <a
            href="https://github.com/iamyoussef2005/scopepilot-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md bg-zinc-100 px-3 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-white transition-colors"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-600" />
          </a>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Key className="h-4 w-4 text-zinc-400" />
              Configure Custom LLM API Key (Optional)
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              ScopePilot includes an intelligent <strong>Instant Simulation Engine</strong> that operates out-of-the-box without keys. To route prompts to live Gemini or OpenAI models, enter your key below:
            </p>
            <div className="mt-4">
              <input
                type="password"
                placeholder="AIzaSy... or sk-..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:border-zinc-500 focus:outline-none"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="flex items-center gap-1.5 rounded-md bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-900 hover:bg-white"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
