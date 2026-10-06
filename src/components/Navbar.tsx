"use client";

import React, { useState } from "react";
import { Sparkles, Key, CheckCircle2, ExternalLink } from "lucide-react";

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
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">ScopePilot</span>
              <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/20">
                AI Agent
              </span>
            </div>
            <p className="text-xs text-zinc-400">G7 UK • Think. Build. Innovate.</p>
          </div>
        </div>

        {/* Center / Tagline */}
        <div className="hidden md:flex items-center gap-2 text-xs font-medium text-zinc-400 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Autonomous Product Blueprint & SOW Engine</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors border ${
              apiKey
                ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/60"
                : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 hover:text-white"
            }`}
          >
            <Key className="h-3.5 w-3.5" />
            <span>{apiKey ? "API Key Configured" : "Custom Key (Optional)"}</span>
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Key className="h-4 w-4 text-purple-400" />
              Configure Custom API Key (Optional)
            </h3>
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              The platform includes an intelligent **Instant Demo Mode** that runs out-of-the-box for evaluators without any API keys. If you prefer to connect live Gemini or OpenAI models, enter your key below:
            </p>
            <div className="mt-4">
              <input
                type="password"
                placeholder="AIzaSy... or sk-..."
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowKeyModal(false)}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveKey}
                className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-purple-500"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Save & Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
