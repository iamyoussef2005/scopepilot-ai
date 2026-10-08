"use client";

import React, { useState } from "react";
import { Key, CheckCircle2, ExternalLink, Globe, Layers, Check } from "lucide-react";

interface NavbarProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  lang?: "en" | "ar";
  setLang?: (l: "en" | "ar") => void;
}

export default function Navbar({ apiKey, setApiKey, lang = "en", setLang }: NavbarProps) {
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);

  const handleSaveKey = () => {
    setApiKey(tempKey);
    setShowKeyModal(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 text-zinc-950 font-bold text-xs">
            SP
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-zinc-100 tracking-tight">
              ScopePilot
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-xs text-zinc-400 font-sans hidden sm:inline">
              Architecture Studio
            </span>
            <span className="text-[10px] font-mono text-zinc-500 bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
              v2.4
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {setLang && (
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white hover:bg-zinc-850 hover:border-zinc-700 transition-colors"
              title={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
            >
              <Globe className="h-3.5 w-3.5 text-zinc-400" />
              <span>{lang === "ar" ? "English" : "العربية"}</span>
            </button>
          )}

          <button
            onClick={() => setShowKeyModal(true)}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border transition-colors ${
              apiKey
                ? "bg-zinc-900 text-emerald-400 border-zinc-800"
                : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700"
            }`}
          >
            <Key className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{apiKey ? "API Key Set" : "API Key"}</span>
          </button>

          <a
            href="https://github.com/iamyoussef2005/scopepilot-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 text-zinc-500" />
          </a>
        </div>
      </div>

      {/* API Key Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-[#111114] p-5 shadow-2xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Key className="h-4 w-4 text-zinc-400" />
              Gemini / OpenAI API Key (Optional)
            </h3>
            <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed font-sans">
              Enter your personal API key if you wish to use live Google Gemini models. If left blank, ScopePilot uses its built-in offline architecture engine.
            </p>

            <div className="mt-4 space-y-3">
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="AIzaSy... or sk-..."
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:border-zinc-600 focus:outline-none font-mono"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowKeyModal(false)}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveKey}
                  className="rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 px-3.5 py-1.5 text-xs font-semibold transition-colors"
                >
                  Save Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
