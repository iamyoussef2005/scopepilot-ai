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
  Sparkles,
  Sliders,
  Code2,
  Printer
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

  // Currency & Rate Multipliers
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
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      {/* Title & Tagline Banner */}
      <div className="border-b border-zinc-800/80 pb-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
                Blueprint Generated
              </span>
              <span className="text-xs text-zinc-500">• Ready for SOW & Proposal</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {blueprint.projectTitle}
            </h1>
            <p className="mt-1 text-sm text-zinc-400 font-medium">
              {blueprint.tagline}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-zinc-950/60 p-3 rounded-xl border border-zinc-800">
            <div className="text-left">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Timeline</span>
              <span className="text-sm font-bold text-white flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
                {blueprint.budgetSummary.totalEstimatedWeeks} Weeks
              </span>
            </div>
            <div className="h-8 w-[1px] bg-zinc-800" />
            <div className="text-left">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Investment</span>
              <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                {currencySymbol}
                {computedTotalCost.toLocaleString()}
              </span>
            </div>
            <div className="h-8 w-[1px] bg-zinc-800" />
            <button
              onClick={() => setShowProposalModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white px-3 py-1.5 text-xs font-semibold shadow-sm transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>SOW Proposal</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex items-center gap-2 border-b border-zinc-800/60 pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "overview"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Overview & Scope</span>
          </button>

          <button
            onClick={() => setActiveTab("stories")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "stories"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>User Stories ({blueprint.userStories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "architecture"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            <span>System Architecture & Code</span>
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "roadmap"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Roadmap & Budget Calculator</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "security"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>Security & Compliance</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Executive Summary */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Executive Summary
            </h3>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {blueprint.executiveSummary}
            </p>
          </div>

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-rose-900/30 bg-rose-950/10 p-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5" />
                Problem Statement
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {blueprint.problemStatement}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/10 p-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Proposed Solution
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {blueprint.proposedSolution}
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Target Audience & Key Personas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {blueprint.targetAudience.map((aud, i) => (
                <div key={i} className="flex items-start gap-2 rounded-lg bg-zinc-900/60 p-3 border border-zinc-800/80">
                  <ChevronRight className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">{aud}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MVP vs V2 Scope Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-indigo-900/40 bg-zinc-950/60 p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  🚀 MVP Scope (Core Deliverable)
                </h4>
                <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">
                  Phase 1
                </span>
              </div>
              <ul className="space-y-2">
                {blueprint.mvpScope.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  🔮 V2 & Future Roadmap
                </h4>
                <span className="text-[10px] font-semibold bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                  Phase 2+
                </span>
              </div>
              <ul className="space-y-2">
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
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-zinc-400">
              Actionable user stories structured with personas and acceptance criteria.
            </p>
            <span className="text-xs text-zinc-500 font-mono">
              {blueprint.userStories.filter((s) => s.isMvp).length} MVP Stories •{" "}
              {blueprint.userStories.filter((s) => !s.isMvp).length} Future
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {blueprint.userStories.map((story) => (
              <div
                key={story.id}
                className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-800/50">
                      {story.id}
                    </span>
                    <span className="text-xs font-semibold text-zinc-400">
                      Epic: {story.epic}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                        story.complexity === "High"
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          : story.complexity === "Medium"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {story.complexity} Complexity
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        story.isMvp
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      {story.isMvp ? "MVP" : "V2"}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white mb-2">{story.title}</h4>

                <div className="bg-zinc-900/60 rounded-lg p-3 text-xs text-zinc-300 space-y-1 font-sans border border-zinc-800/60">
                  <p>
                    <strong className="text-zinc-400">As a:</strong> {story.asA}
                  </p>
                  <p>
                    <strong className="text-zinc-400">I want to:</strong> {story.iWantTo}
                  </p>
                  <p>
                    <strong className="text-zinc-400">So that:</strong> {story.soThat}
                  </p>
                </div>

                <div className="mt-3">
                  <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
                    Acceptance Criteria:
                  </span>
                  <div className="space-y-1">
                    {story.acceptanceCriteria.map((criterion, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                        <CheckCircle2 className="h-3 w-3 text-indigo-400 shrink-0 mt-0.5" />
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
        <div className="space-y-6">
          {/* Sub-tab switcher */}
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
            <button
              onClick={() => setArchSubTab("diagram")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                archSubTab === "diagram"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>Interactive Architecture Flowchart</span>
            </button>

            <button
              onClick={() => setArchSubTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                archSubTab === "code"
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-900 text-zinc-400 hover:text-white"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Developer Starter Kit (Prisma / Docker / API)</span>
            </button>
          </div>

          {archSubTab === "diagram" ? (
            <>
              {/* Mermaid Diagram */}
              <MermaidViewer chart={blueprint.mermaidArchitecture} />

              {/* Tech Stack Breakdown */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                  Recommended Technology Stack & Architectural Rationale
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {blueprint.techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                          {tech.layer}
                        </span>
                        <h4 className="text-sm font-bold text-white mt-1">
                          {tech.technology}
                        </h4>
                        <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
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

      {/* Tab 4: Roadmap & Budget Calculator */}
      {activeTab === "roadmap" && (
        <div className="space-y-6">
          {/* Financial Customizer & Currency Toolbar */}
          <div className="rounded-xl border border-indigo-900/40 bg-zinc-950/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-indigo-400" />
              <div>
                <span className="text-xs font-bold text-white block">
                  Interactive Budget & Currency Customizer
                </span>
                <span className="text-[10px] text-zinc-500">
                  Dynamically adjust hourly rate and regional currency for SOW estimations.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Currency Picker */}
              <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 text-xs font-bold">
                <button
                  onClick={() => setCurrency("USD")}
                  className={`px-2 py-0.5 rounded ${currency === "USD" ? "bg-indigo-600 text-white" : "text-zinc-400"}`}
                >
                  $ USD
                </button>
                <button
                  onClick={() => setCurrency("GBP")}
                  className={`px-2 py-0.5 rounded ${currency === "GBP" ? "bg-indigo-600 text-white" : "text-zinc-400"}`}
                >
                  £ GBP
                </button>
                <button
                  onClick={() => setCurrency("EUR")}
                  className={`px-2 py-0.5 rounded ${currency === "EUR" ? "bg-indigo-600 text-white" : "text-zinc-400"}`}
                >
                  € EUR
                </button>
              </div>

              {/* Rate Slider */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-zinc-400 whitespace-nowrap">
                  Rate: <strong>${hourlyRate}/h</strong>
                </span>
                <input
                  type="range"
                  min="40"
                  max="160"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-24 accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <span className="text-xs text-zinc-400">Total Project Timeline</span>
              <p className="text-xl font-bold text-white mt-1">
                {blueprint.budgetSummary.totalEstimatedWeeks} Weeks
              </p>
              <span className="text-[11px] text-zinc-500">
                {blueprint.sprintRoadmap.length} Agile Sprints
              </span>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <span className="text-xs text-zinc-400">Total Engineering Hours</span>
              <p className="text-xl font-bold text-indigo-400 mt-1">
                ~{blueprint.budgetSummary.totalEstimatedHours} Hours
              </p>
              <span className="text-[11px] text-zinc-500">Dedicated Sprint Allocation</span>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
              <span className="text-xs text-zinc-400">Estimated Total Investment</span>
              <p className="text-xl font-bold text-emerald-400 mt-1">
                {currencySymbol}
                {computedTotalCost.toLocaleString()}
              </p>
              <span className="text-[11px] text-zinc-500">Adjusted for {currency} @ ${hourlyRate}/hr</span>
            </div>
          </div>

          {/* Recommended Team */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4">
            <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
              Recommended Team Composition
            </span>
            <div className="flex flex-wrap gap-2">
              {blueprint.budgetSummary.recommendedTeam.map((member, i) => (
                <span
                  key={i}
                  className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300 border border-zinc-800 flex items-center gap-1.5"
                >
                  <Users className="h-3.5 w-3.5 text-indigo-400" />
                  {member}
                </span>
              ))}
            </div>
          </div>

          {/* Sprint Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Sprint-by-Sprint Delivery Milestones
            </h4>
            {blueprint.sprintRoadmap.map((sprint) => {
              const sprintCost = Math.round(sprint.estimatedCostUsd * rateMultiplier);
              return (
                <div
                  key={sprint.sprintNumber}
                  className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-indigo-500/20 text-indigo-400 px-2 py-0.5 text-xs font-bold font-mono">
                        Sprint {sprint.sprintNumber}
                      </span>
                      <h5 className="text-sm font-bold text-white">{sprint.title}</h5>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {sprint.coreDeliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-zinc-400">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-zinc-800 pt-3 md:pt-0 md:pl-6 shrink-0">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Duration</span>
                      <span className="text-xs font-semibold text-white">
                        {sprint.durationWeeks} Weeks ({sprint.estimatedHours}h)
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block">Sprint Cost</span>
                      <span className="text-xs font-bold text-emerald-400">
                        {currencySymbol}
                        {sprintCost.toLocaleString()}
                      </span>
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
