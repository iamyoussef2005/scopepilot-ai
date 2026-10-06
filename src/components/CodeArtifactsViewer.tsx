"use client";

import React, { useState } from "react";
import { CodeArtifacts } from "@/lib/types/blueprint";
import { Copy, Check, Database, Container, Server, Shield } from "lucide-react";

interface CodeArtifactsViewerProps {
  artifacts?: CodeArtifacts;
}

export default function CodeArtifactsViewer({ artifacts }: CodeArtifactsViewerProps) {
  const [activeTab, setActiveTab] = useState<"prisma" | "docker" | "api">("prisma");
  const [copied, setCopied] = useState<string | null>(null);

  if (!artifacts) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 text-center text-xs text-zinc-500">
        Code artifacts are generating...
      </div>
    );
  }

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-xl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3 mb-4">
        <div>
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            Developer Starter Kit & Production Code Artifacts
          </h4>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Auto-generated database schema, Docker container topology, and API routes.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
          <button
            onClick={() => setActiveTab("prisma")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === "prisma"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span>schema.prisma</span>
          </button>

          <button
            onClick={() => setActiveTab("docker")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === "docker"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Container className="h-3.5 w-3.5" />
            <span>docker-compose</span>
          </button>

          <button
            onClick={() => setActiveTab("api")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === "api"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Server className="h-3.5 w-3.5" />
            <span>API Endpoints ({artifacts.apiEndpoints.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Prisma */}
      {activeTab === "prisma" && (
        <div className="relative">
          <button
            onClick={() => handleCopy(artifacts.prismaSchema, "prisma")}
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors z-10"
          >
            {copied === "prisma" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied === "prisma" ? "Copied" : "Copy Schema"}</span>
          </button>
          <pre className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 font-mono text-xs text-indigo-200 overflow-x-auto max-h-[380px] leading-relaxed">
            {artifacts.prismaSchema}
          </pre>
        </div>
      )}

      {/* Tab 2: Docker */}
      {activeTab === "docker" && (
        <div className="relative">
          <button
            onClick={() => handleCopy(artifacts.dockerCompose, "docker")}
            className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors z-10"
          >
            {copied === "docker" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied === "docker" ? "Copied" : "Copy YAML"}</span>
          </button>
          <pre className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 font-mono text-xs text-cyan-200 overflow-x-auto max-h-[380px] leading-relaxed">
            {artifacts.dockerCompose}
          </pre>
        </div>
      )}

      {/* Tab 3: API Endpoints */}
      {activeTab === "api" && (
        <div className="space-y-2">
          {artifacts.apiEndpoints.map((endpoint, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                    endpoint.method === "GET"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : endpoint.method === "POST"
                      ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                      : endpoint.method === "PUT"
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {endpoint.method}
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-200">
                  {endpoint.path}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400">{endpoint.description}</span>
                {endpoint.authRequired && (
                  <span className="flex items-center gap-1 text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 shrink-0">
                    <Shield className="h-3 w-3" />
                    Auth
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
