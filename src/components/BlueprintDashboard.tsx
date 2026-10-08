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
  Sliders,
  Filter,
  Check
} from "lucide-react";
import { ProductBlueprint } from "@/lib/types/blueprint";
import MermaidViewer from "./MermaidViewer";
import CodeArtifactsViewer from "./CodeArtifactsViewer";
import ProposalModal from "./ProposalModal";
import SecurityComplianceView from "./SecurityComplianceView";

interface BlueprintDashboardProps {
  blueprint: ProductBlueprint;
  lang?: "en" | "ar";
  showProposalModal?: boolean;
  setShowProposalModal?: (show: boolean) => void;
}

export default function BlueprintDashboard({
  blueprint,
  lang = "en",
  showProposalModal,
  setShowProposalModal
}: BlueprintDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "stories" | "architecture" | "roadmap" | "security"
  >("overview");
  const [archSubTab, setArchSubTab] = useState<"diagram" | "code">("diagram");
  const [currency, setCurrency] = useState<"USD" | "GBP" | "EUR">("USD");
  const [hourlyRate, setHourlyRate] = useState<number>(80);
  const [storyFilter, setStoryFilter] = useState<"all" | "mvp" | "v2">("all");
  const [checkedCriteria, setCheckedCriteria] = useState<Record<string, boolean>>({});
  const [localProposalModal, setLocalProposalModal] = useState<boolean>(false);

  const isProposalOpen = showProposalModal !== undefined ? showProposalModal : localProposalModal;
  const openProposal = setShowProposalModal ? () => setShowProposalModal(true) : () => setLocalProposalModal(true);
  const closeProposal = setShowProposalModal ? () => setShowProposalModal(false) : () => setLocalProposalModal(false);

  const toggleCriterion = (criterionKey: string) => {
    setCheckedCriteria((prev) => ({
      ...prev,
      [criterionKey]: !prev[criterionKey]
    }));
  };

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

  const filteredStories = blueprint.userStories.filter((s) => {
    if (storyFilter === "mvp") return s.isMvp;
    if (storyFilter === "v2") return !s.isMvp;
    return true;
  });

  const getComplexityBadge = (comp: string) => {
    switch (comp.toLowerCase()) {
      case "high":
        return "text-rose-400 bg-rose-950/40 border-rose-850";
      case "medium":
        return "text-amber-400 bg-amber-950/40 border-amber-850";
      default:
        return "text-zinc-300 bg-zinc-800 border-zinc-700";
    }
  };

  return (
    <div className="w-full rounded-xl border border-zinc-800 bg-[#111114] p-5 sm:p-7 shadow-sm font-sans">
      {/* Header Banner */}
      <div className="border-b border-zinc-800 pb-5 mb-5">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900 border border-zinc-800 px-2.5 py-0.5 rounded-md font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {lang === "ar" ? "المواصفة النشطة" : "Active Specification"}
              </span>
              <span className="font-mono text-xs text-zinc-500">
                ID: SP-{Math.abs(blueprint.projectTitle.split("").reduce((a, b) => a + b.charCodeAt(0), 0))}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
              {blueprint.projectTitle}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed font-sans">
              {blueprint.tagline}
            </p>
          </div>

          {/* SOW button & Top Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={openProposal}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 px-3.5 py-2 text-xs font-semibold shadow-sm transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{lang === "ar" ? "عرض عقد العمل (SOW)" : "Executive SOW Proposal"}</span>
            </button>
          </div>
        </div>

        {/* 3 Balanced KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">
          <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-3.5">
            <span className="text-xs text-zinc-400 block font-medium">
              {lang === "ar" ? "الجدول الزمني التقديري" : "Estimated Timeline"}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl font-bold text-zinc-100">{blueprint.budgetSummary.totalEstimatedWeeks}</span>
              <span className="text-xs text-zinc-400">Weeks</span>
            </div>
            <span className="text-[11px] text-zinc-500 mt-1 block">
              {blueprint.sprintRoadmap.length} Agile Sprints
            </span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-3.5">
            <span className="text-xs text-zinc-400 block font-medium">
              {lang === "ar" ? "الجهد الهندسي الكلي" : "Engineering Effort"}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl font-bold text-zinc-100">~{blueprint.budgetSummary.totalEstimatedHours}</span>
              <span className="text-xs text-zinc-400">Hours</span>
            </div>
            <span className="text-[11px] text-zinc-500 mt-1 block">
              Full-Stack Scope
            </span>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-3.5">
            <span className="text-xs text-zinc-400 block font-medium">
              {lang === "ar" ? "الميزانية المتوقعة" : "Estimated Budget"}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-xl font-bold text-zinc-100">
                {currencySymbol}{computedTotalCost.toLocaleString()}
              </span>
              <span className="text-[11px] text-zinc-500 uppercase">({currency})</span>
            </div>
            <span className="text-[11px] text-zinc-500 mt-1 block">
              ${hourlyRate}/h Modeling Baseline
            </span>
          </div>
        </div>

        {/* Tab Navigation - Linear / GitHub clean tab bar */}
        <div className="mt-6 flex items-center gap-1 border-b border-zinc-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "overview"
                ? "border-zinc-100 text-zinc-100 font-semibold"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>{lang === "ar" ? "1. نظرة عامة ونطاق العمل" : "1. Overview & Scope"}</span>
          </button>

          <button
            onClick={() => setActiveTab("stories")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "stories"
                ? "border-zinc-100 text-zinc-100 font-semibold"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>
              {lang === "ar" ? `2. قصص المستخدمين (${blueprint.userStories.length})` : `2. User Stories (${blueprint.userStories.length})`}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "architecture"
                ? "border-zinc-100 text-zinc-100 font-semibold"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Network className="h-3.5 w-3.5" />
            <span>{lang === "ar" ? "3. المعمارية البرمجية" : "3. System Architecture"}</span>
          </button>

          <button
            onClick={() => setActiveTab("roadmap")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "roadmap"
                ? "border-zinc-100 text-zinc-100 font-semibold"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>{lang === "ar" ? "4. خارطة الطريق والميزانية" : "4. Delivery Roadmap"}</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "security"
                ? "border-zinc-100 text-zinc-100 font-semibold"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{lang === "ar" ? "5. الأمان والامتثال" : "5. Security & Compliance"}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Overview & Scope */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          {/* Executive Summary */}
          <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-4 sm:p-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
              Executive Strategic Brief
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {blueprint.executiveSummary}
            </p>
          </div>

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-4">
              <h4 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                <Target className="h-3.5 w-3.5 text-zinc-400" />
                Problem Statement & Market Friction
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {blueprint.problemStatement}
              </p>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-4">
              <h4 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                Proposed Architectural Solution
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {blueprint.proposedSolution}
              </p>
            </div>
          </div>

          {/* Target Audience */}
          <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-4">
            <h4 className="text-xs font-semibold text-zinc-300 mb-3 flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-zinc-400" />
              Target Stakeholders & User Personas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {blueprint.targetAudience.map((aud, i) => (
                <div key={i} className="flex items-start gap-2.5 rounded-md bg-zinc-900/60 p-3 border border-zinc-800 text-xs text-zinc-300">
                  <span className="font-mono text-xs font-semibold text-zinc-500">
                    {i + 1}.
                  </span>
                  <span className="font-sans leading-snug">{aud}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scope Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  MVP Core Scope (Phase 1 Baseline)
                </h4>
                <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded">
                  Fixed Baseline
                </span>
              </div>
              <ul className="space-y-2">
                {blueprint.mvpScope.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-zinc-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-semibold text-zinc-400 flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-zinc-500" />
                  Phase 2 Future Roadmap Backlog
                </h4>
                <span className="text-[10px] font-mono bg-zinc-900 text-zinc-500 px-2 py-0.5 rounded border border-zinc-800">
                  Post-MVP
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
          {/* Stories Filter Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-3 text-xs border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-zinc-400 text-xs font-medium">Filter Scope:</span>
              <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-md border border-zinc-800 text-xs">
                <button
                  onClick={() => setStoryFilter("all")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    storyFilter === "all" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  All ({blueprint.userStories.length})
                </button>
                <button
                  onClick={() => setStoryFilter("mvp")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    storyFilter === "mvp" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  MVP ({blueprint.userStories.filter((s) => s.isMvp).length})
                </button>
                <button
                  onClick={() => setStoryFilter("v2")}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    storyFilter === "v2" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Phase 2 ({blueprint.userStories.filter((s) => !s.isMvp).length})
                </button>
              </div>
            </div>

            <span className="text-zinc-500 text-xs">
              Check acceptance items to track engineering sign-off
            </span>
          </div>

          {/* Stories List */}
          <div className="space-y-3">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="rounded-lg border border-zinc-800 bg-[#09090b] p-4 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded text-[11px]">
                      {story.id}
                    </span>
                    <span className="text-zinc-400 text-xs">
                      Epic: {story.epic}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-mono ${getComplexityBadge(story.complexity)}`}>
                      {story.complexity} Complexity
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${story.isMvp ? "bg-zinc-800 text-zinc-200" : "bg-zinc-900 text-zinc-500 border border-zinc-800"}`}>
                      {story.isMvp ? "MVP Scope" : "Phase 2"}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-zinc-100 mb-2.5 font-sans">
                  {story.title}
                </h4>

                {/* Monospace User Story Syntax Block */}
                <div className="bg-zinc-950 rounded p-3 text-xs text-zinc-300 space-y-1 font-mono border border-zinc-850 mb-3">
                  <p><span className="text-zinc-500">As a:</span> {story.asA}</p>
                  <p><span className="text-zinc-500">I want to:</span> {story.iWantTo}</p>
                  <p><span className="text-zinc-500">So that:</span> {story.soThat}</p>
                </div>

                {/* Acceptance Criteria */}
                <div>
                  <span className="text-[11px] uppercase font-semibold text-zinc-400 block mb-1.5">
                    Acceptance Criteria:
                  </span>
                  <div className="space-y-1">
                    {story.acceptanceCriteria.map((criterion, idx) => {
                      const criterionKey = `${story.id}-crit-${idx}`;
                      const isChecked = !!checkedCriteria[criterionKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCriterion(criterionKey)}
                          className={`flex items-start gap-2 text-xs p-1.5 rounded cursor-pointer transition-colors ${
                            isChecked
                              ? "bg-zinc-900 text-zinc-500 line-through"
                              : "hover:bg-zinc-900/60 text-zinc-300"
                          }`}
                        >
                          <div
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors mt-0.5 ${
                              isChecked
                                ? "bg-zinc-700 border-zinc-700 text-white"
                                : "border-zinc-700 bg-zinc-900"
                            }`}
                          >
                            {isChecked && <Check className="h-3 w-3" />}
                          </div>
                          <span className="font-sans leading-relaxed select-none">{criterion}</span>
                        </div>
                      );
                    })}
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
              className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded transition-colors ${
                archSubTab === "diagram" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Network className="h-3.5 w-3.5" />
              <span>System Topology Flow (Mermaid)</span>
            </button>

            <button
              onClick={() => setArchSubTab("code")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded transition-colors ${
                archSubTab === "code" ? "bg-zinc-800 text-white font-medium" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>Data Models & Config Contracts</span>
            </button>
          </div>

          {archSubTab === "diagram" ? (
            <>
              <MermaidViewer chart={blueprint.mermaidArchitecture} />

              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                  Technology Stack Decisions & Architectural Rationale
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {blueprint.techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-zinc-800 bg-[#09090b] p-3.5 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] uppercase font-mono text-zinc-500 font-bold block">
                          {tech.layer}
                        </span>
                        <h4 className="text-xs font-semibold text-zinc-100 mt-1 font-sans">
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
          {/* Financial Constraints Bar */}
          <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sliders className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-xs font-semibold text-zinc-200">
                Financial Modeling Constraints
              </span>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* Currency selector */}
              <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded border border-zinc-800">
                {(["USD", "GBP", "EUR"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${currency === c ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-white"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Hourly rate slider */}
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Rate: <strong>${hourlyRate}/h</strong></span>
                <input
                  type="range"
                  min="40"
                  max="180"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-24 accent-zinc-200 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Sprints List */}
          <div className="space-y-2.5">
            {blueprint.sprintRoadmap.map((sprint) => {
              const sprintCost = Math.round(sprint.estimatedCostUsd * rateMultiplier);
              return (
                <div
                  key={sprint.sprintNumber}
                  className="rounded-lg border border-zinc-800 bg-[#09090b] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[11px] font-mono font-bold">
                        Sprint {sprint.sprintNumber}
                      </span>
                      <h5 className="text-xs sm:text-sm font-semibold text-zinc-100">{sprint.title}</h5>
                    </div>
                    <ul className="mt-1.5 space-y-1 text-xs text-zinc-400 font-sans">
                      {sprint.coreDeliverables.map((deliv, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-zinc-600" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-zinc-800 pt-2.5 md:pt-0 md:pl-5 shrink-0">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block font-mono">Duration</span>
                      <span className="text-zinc-200 font-medium text-xs mt-0.5 block">{sprint.durationWeeks}w ({sprint.estimatedHours}h)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase block font-mono">Subtotal</span>
                      <span className="text-zinc-100 font-bold text-xs mt-0.5 block">{currencySymbol}{sprintCost.toLocaleString()}</span>
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
        isOpen={isProposalOpen}
        onClose={closeProposal}
        currencySymbol={currencySymbol}
        rateMultiplier={rateMultiplier}
      />
    </div>
  );
}
