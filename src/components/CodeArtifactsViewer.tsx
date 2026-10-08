"use client";

import React, { useState } from "react";
import { CodeArtifacts } from "@/lib/types/blueprint";
import { Copy, Check, Database, Container, Server, Shield, FileText, Download } from "lucide-react";

interface CodeArtifactsViewerProps {
  artifacts?: CodeArtifacts;
}

export default function CodeArtifactsViewer({ artifacts }: CodeArtifactsViewerProps) {
  const [activeTab, setActiveTab] = useState<"prisma" | "docker" | "env" | "api">("prisma");
  const [copied, setCopied] = useState<string | null>(null);

  if (!artifacts) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6 text-center text-xs text-zinc-500 font-mono">
        Code artifacts are generating...
      </div>
    );
  }

  const envContent = artifacts.envExample || `# Database Connection
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/platform_db"

# Cache & In-Memory Store
REDIS_URL="redis://localhost:6379"

# API & Server Configuration
PORT=3000
NODE_ENV="development"
JWT_SECRET="super-secret-jwt-token-change-in-production"

# External Integrations (Optional)
STRIPE_SECRET_KEY="sk_test_..."
RESEND_API_KEY="re_..."
GEMINI_API_KEY=""
`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 shadow-xl">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3 mb-4">
        <div>
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            System Data Models & Service Architecture Specification
          </h4>
          <p className="text-[11px] text-zinc-500 mt-0.5 font-sans">
            Normalized relational database schema, containerization topology, and service endpoint contracts.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 font-mono text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab("prisma")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded transition-all ${
              activeTab === "prisma"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span>Schema</span>
          </button>

          <button
            onClick={() => setActiveTab("docker")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded transition-all ${
              activeTab === "docker"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Container className="h-3.5 w-3.5" />
            <span>Docker</span>
          </button>

          <button
            onClick={() => setActiveTab("env")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded transition-all ${
              activeTab === "env"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>.env.example</span>
          </button>

          <button
            onClick={() => setActiveTab("api")}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded transition-all ${
              activeTab === "api"
                ? "bg-zinc-800 text-white font-semibold"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Server className="h-3.5 w-3.5" />
            <span>API ({artifacts.apiEndpoints.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Prisma */}
      {activeTab === "prisma" && (
        <div className="relative">
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={() => handleDownloadFile(artifacts.prismaSchema, "schema.prisma")}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
              title="Download schema.prisma"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={() => handleCopy(artifacts.prismaSchema, "prisma")}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
            >
              {copied === "prisma" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied === "prisma" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 font-mono text-xs text-indigo-200 overflow-x-auto max-h-[420px] leading-relaxed">
            {artifacts.prismaSchema}
          </pre>
        </div>
      )}

      {/* Tab 2: Docker */}
      {activeTab === "docker" && (
        <div className="relative">
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={() => handleDownloadFile(artifacts.dockerCompose, "docker-compose.yml")}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
              title="Download docker-compose.yml"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={() => handleCopy(artifacts.dockerCompose, "docker")}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
            >
              {copied === "docker" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied === "docker" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 font-mono text-xs text-cyan-200 overflow-x-auto max-h-[420px] leading-relaxed">
            {artifacts.dockerCompose}
          </pre>
        </div>
      )}

      {/* Tab 3: Env Example */}
      {activeTab === "env" && (
        <div className="relative">
          <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
            <button
              onClick={() => handleDownloadFile(envContent, ".env.example")}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
              title="Download .env.example"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={() => handleCopy(envContent, "env")}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800/90 px-2.5 py-1 text-xs text-zinc-300 hover:text-white transition-colors"
            >
              {copied === "env" ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied === "env" ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <pre className="rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-4 font-mono text-xs text-amber-200 overflow-x-auto max-h-[420px] leading-relaxed">
            {envContent}
          </pre>
        </div>
      )}

      {/* Tab 4: API Endpoints */}
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
