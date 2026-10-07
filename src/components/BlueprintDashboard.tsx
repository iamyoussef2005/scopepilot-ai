"use client";

import React, { useState } from "react";
import {
  Layers,
  FileText,
  Network,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  Target,
  ShieldCheck,
  ChevronRight,
  Code2,
  Printer,
  Sliders
} from "lucide-react";
import { ProductBlueprint } from "@/lib/types/blueprint";
import MermaidViewer from "./MermaidViewer";
import CodeArtifactsViewer from "./CodeArtifactsViewer";
import ProposalModal from "./ProposalModal";
import SecurityComplianceView from "./SecurityComplianceView";

interface BlueprintDashboardProps {
  blueprint: ProductBlueprint;
}

export default function BlueprintDashboard({ blueprint }: BlueprintDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "stories" | "architecture" | "roadmap" | "security"
  >("overview");
  const [archSubTab, setArchSubTab] = useState<"diagram" | "code">("diagram");
  const [currency, setCurrency] = useState<"USD" | "GBP" | "EUR">("USD");
  const [hourlyRate, setHourlyRate] = useState<number>(80);
  const [showProposalModal, setShowProposalModal] = useState<boolean>(false);

  const getCurrencySymbol = (c: "USD" | "GBP" | "EUR") => {
    switch (c) {
      case "GBP":
        return "£";
      case "EUR":
        return "€";
      default:
        return "$";
    }
  };

  const getCurrencyFx = (c: "USD" | "GBP" | "EUR") => {
    switch (c) {
      case "GBP":
        return 0.79;
      case "EUR":
        return 0.92;
      default:
        return 1.0;
    }
  };

  const currencySymbol = getCurrencySymbol(currency);
  const rateMultiplier = (hourlyRate / 80) * getCurrencyFx(currency);
  const computedTotalCost = Math.round(blueprint.budgetSummary.estimatedCostUsd * rateMultiplier);

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-7 shadow-sm">
      {/* Header Banner */}
      <div className="border-b border-zinc-800 pb-5 mb-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                ACTIVE SPECIFICATION
              </span>
              <span className="font-mono text-[11px] text-zinc-500">
                ID: SP-{Math.abs(blueprint.projectTitle.split("").reduce((a, b) => a + b.charCodeAt(0), 0))}
              </span>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white">
              {blueprint.projectTitle}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400 font-sans">
              {blueprint.tagline}
            </p>
          </div>

          {/* Quick Metrics & SOW button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 bg-zinc-900/80 px-3.5 py-2 rounded-lg border border-zinc-800 font-mono">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Timeline</span>
                <span className="text-xs font-bold text-zinc-200">{blueprint.budgetSummary.totalEstimatedWeeks}w</span>
              </div>
              <div className="h-6 w-[1px] bg-zinc-800" />
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Effort</span>
                <span className="text-xs font-bold text-zinc-200">~{blueprint.budgetSummary.totalEstimatedHours}h</span>
              </div>
              <div className="h-6 w-[1px] bg-zinc-800" />
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block">Budget</span>
                <span className="text-xs font-bold text-emerald-400">
                  {currencySymbol}{computedTotalCost.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowProposalModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 px-3 py-2 text-xs font-semibold shadow-sm transition-colors"
            >
              <Printer className="h-3.5 w-3.5 text-zinc-700" />
              <span>SOW Proposal</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation - Linear style */}
        <div className="mt-5 flex items-center gap-1 bg-zinc-900/60 p-1 rounded-lg border border-zinc-850 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "overview"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Overview & Scope</span>
          </button>

          <button
            onClick={() => setActiveTab("stories")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "stories"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>User Stories ({blueprint.userStories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "architecture"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50"
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            <span>Architecture & Code</span>
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "roadmap"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Roadmap & Financials</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              activeTab === "security"
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/50"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Security & Compliance</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          {/* Executive Summary */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5">
              Executive Summary
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {blueprint.executiveSummary}
            </p>
          </div>

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-zinc-500" />
                Problem Statement
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {blueprint.problemStatement}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
              <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Proposed Solution
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                {blueprint.proposedSolution}
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-zinc-500" />
              Target Stakeholders & User Personas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {blueprint.targetAudience.map((aud, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md bg-zinc-900 p-2.5 border border-zinc-800 text-xs text-zinc-300">
                  <span className="font-mono text-zinc-500 select-none">#{i + 1}</span>
                  <span>{aud}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scope Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-200">
                  MVP Core Scope (Release 1.0)
                </h4>
                <span className="font-mono text-[10px] bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded">
                  Fixed Baseline
                </span>
              </div>
              <ul className="space-y-1.5">
                {blueprint.mvpScope.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-4">
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  V2 Future Backlog (Phase 2+)
                </h4>
                <span className="font-mono text-[10px] bg-zinc-850 text-zinc-500 px-1.5 py-0.5 rounded">
                  Roadmap
                </span>
              </div>
              <ul className="space-y-1.5">
                {blueprint.v2FutureScope.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-zinc-600 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Stories */}
      {activeTab === "stories" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400 mb-2">
            <span>Structured engineering backlog with acceptance criteria</span>
            <span>
              {blueprint.userStories.filter((s) => s.isMvp).length} MVP • {blueprint.userStories.filter((s) => !s.isMvp).length} Post-MVP
            </span>
          </div>

          <div className="space-y-3">
            {blueprint.userStories.map((story) => (
              <div
                key={story.id}
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded">
                      {story.id}
                    </span>
                    <span className="text-zinc-400">Epic: {story.epic}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-400">
                      {story.complexity}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${story.isMvp ? "bg-zinc-800 text-zinc-200" : "bg-zinc-900 text-zinc-500"}`}>
                      {story.isMvp ? "MVP" : "V2"}
                    </span>
                  </div>
                </div>

                <h4 className="text-xs sm:text-sm font-semibold text-white mb-2">{story.title}</h4>

                <div className="bg-zinc-950/70 rounded p-2.5 text-xs text-zinc-300 space-y-0.5 font-mono border border-zinc-850 mb-3">
                  <p><span className="text-zinc-500">As a:</span> {story.asA}</p>
                  <p><span className="text-zinc-500">I want to:</span> {story.iWantTo}</p>
                  <p><span className="text-zinc-500">So that:</span> {story.soThat}</p>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase font-semibold text-zinc-500 block mb-1">
                    Acceptance Criteria:
                  </span>
                  <div className="space-y-1">
                    {story.acceptanceCriteria.map((criterion, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="h-3 w-3 text-zinc-500 shrink-0 mt-0.5" />
                        <span>{criterion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: System Architecture & Code Artifacts */}
      {activeTab === "architecture" && (
        <div className="space-y-4">
          <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-md border border-zinc-800 w-fit">
            <button
              onClick={() => setArchSubTab("diagram")}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                archSubTab === "diagram" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Network className="h-3 w-3" />
              <span>Architecture Graph</span>
            </button>

            <button
              onClick={() => setArchSubTab("code")}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                archSubTab === "code" ? "bg-zinc-800 text-white font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Code2 className="h-3 w-3" />
              <span>Developer Starter Kit (Prisma / Docker / API)</span>
            </button>
          </div>

          {archSubTab === "diagram" ? (
            <>
              <MermaidViewer chart={blueprint.mermaidArchitecture} />

              <div className="mt-5">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                  Technology Stack Decisions & Architectural Rationale
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono text-xs">
                  {blueprint.techStack.map((tech, idx) => (
                    <div key={idx} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3.5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-zinc-500">
                          {tech.layer}
                        </span>
                        <h4 className="text-xs font-bold text-white mt-0.5">
                          {tech.technology}
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed font-sans">
                          {tech.rationale}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <CodeArtifactsViewer artifacts={blueprint.codeArtifacts} />
          )}
        </div>
      )}

      {/* Tab 4: Roadmap & Financials */}
      {activeTab === "roadmap" && (
        <div className="space-y-5">
          {/* Customizer */}
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
            <div className="flex items-center gap-2">
              <Sliders className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-xs font-semibold text-zinc-200">
                Financial Modeling Constraints
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded border border-zinc-800 text-xs">
                {(["USD", "GBP", "EUR"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 rounded text-[11px] ${currency === c ? "bg-zinc-800 text-white font-bold" : "text-zinc-400"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-zinc-400">Rate: <strong>${hourlyRate}/h</strong></span>
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-24 accent-zinc-200 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Sprints */}
          <div className="space-y-2.5">
            {blueprint.sprintRoadmap.map((sprint) => {
              const sprintCost = Math.round(sprint.estimatedCostUsd * rateMultiplier);
              return (
                <div
                  key={sprint.sprintNumber}
                  className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[11px] font-bold">
                        Sprint {sprint.sprintNumber}
                      </span>
                      <h5 className="text-xs sm:text-sm font-semibold text-white">{sprint.title}</h5>
                    </div>
                    <ul className="mt-2 space-y-1 font-sans text-xs text-zinc-400">
                      {sprint.coreDeliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-zinc-500" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-zinc-800 pt-2.5 md:pt-0 md:pl-5 shrink-0 text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Duration</span>
                      <span className="text-zinc-200 font-semibold">{sprint.durationWeeks}w ({sprint.estimatedHours}h)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Subtotal</span>
                      <span className="text-emerald-400 font-bold">{currencySymbol}{sprintCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Security & Compliance */}
      {activeTab === "security" && (
        <SecurityComplianceView profile={blueprint.securityProfile} />
      )}

      {/* SOW Proposal Modal */}
      <ProposalModal
        blueprint={blueprint}
        isOpen={showProposalModal}
        onClose={() => setShowProposalModal(false)}
        currencySymbol={currencySymbol}
        rateMultiplier={rateMultiplier}
      />
    </div>
  );
}
