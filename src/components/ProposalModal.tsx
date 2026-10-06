"use client";

import React, { useState } from "react";
import { ProductBlueprint } from "@/lib/types/blueprint";
import { Printer, X, CheckCircle2, Shield, Calendar, Users, DollarSign } from "lucide-react";

interface ProposalModalProps {
  blueprint: ProductBlueprint;
  isOpen: boolean;
  onClose: () => void;
  currencySymbol: string;
  rateMultiplier: number;
}

export default function ProposalModal({
  blueprint,
  isOpen,
  onClose,
  currencySymbol,
  rateMultiplier
}: ProposalModalProps) {
  const [agencyName, setAgencyName] = useState("Digital Product Studio");
  const [clientName, setClientName] = useState("Enterprise Client");

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const adjustedCost = Math.round(blueprint.budgetSummary.estimatedCostUsd * rateMultiplier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl border border-zinc-700 bg-white text-zinc-900 shadow-2xl p-6 sm:p-10">
        {/* Controls Bar (hidden during print) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 pb-5 mb-8 no-print">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-indigo-100 text-indigo-700 font-bold px-2.5 py-1 text-xs">
              Statement of Work (SOW) Proposal Preview
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="border border-zinc-300 rounded px-2 py-1 text-xs font-semibold text-zinc-700"
                placeholder="Agency Name"
                title="Agency Name"
              />
              <span className="text-zinc-400 text-xs">for</span>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="border border-zinc-300 rounded px-2 py-1 text-xs font-semibold text-zinc-700"
                placeholder="Client Name"
                title="Client Name"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="space-y-8 font-sans">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-zinc-200 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {agencyName}
              </p>
              <h1 className="mt-1 text-2xl sm:text-3xl font-black text-zinc-900">
                {blueprint.projectTitle}
              </h1>
              <p className="text-sm font-medium text-zinc-500 mt-1">
                {blueprint.tagline}
              </p>
            </div>
            <div className="text-right text-xs text-zinc-500">
              <p><strong>Prepared for:</strong> {clientName}</p>
              <p><strong>Status:</strong> Executive Proposal</p>
              <p><strong>Date:</strong> {new Date().toLocaleDateString("en-GB")}</p>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              1. Executive Summary
            </h3>
            <p className="text-sm text-zinc-700 leading-relaxed bg-zinc-50 p-4 rounded-xl border border-zinc-200">
              {blueprint.executiveSummary}
            </p>
          </div>

          {/* Problem & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-200 p-4 bg-zinc-50">
              <h4 className="text-xs font-bold uppercase text-zinc-500 mb-1">Problem Statement</h4>
              <p className="text-xs text-zinc-700 leading-relaxed">{blueprint.problemStatement}</p>
            </div>
            <div className="rounded-xl border border-indigo-100 p-4 bg-indigo-50/50">
              <h4 className="text-xs font-bold uppercase text-indigo-700 mb-1">Proposed Solution</h4>
              <p className="text-xs text-zinc-700 leading-relaxed">{blueprint.proposedSolution}</p>
            </div>
          </div>

          {/* Scope Matrix */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              2. Scope of Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-zinc-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-indigo-700 mb-2">MVP Core Scope</h4>
                <ul className="space-y-1.5 text-xs text-zinc-600">
                  {blueprint.mvpScope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-zinc-200 rounded-xl p-4 bg-zinc-50">
                <h4 className="text-xs font-bold text-zinc-500 mb-2">Future Release (V2)</h4>
                <ul className="space-y-1.5 text-xs text-zinc-600">
                  {blueprint.v2FutureScope.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-zinc-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Roadmap & Cost Table */}
          <div className="print-page-break">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
              3. Delivery Roadmap & Investment
            </h3>
            <div className="overflow-x-auto border border-zinc-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100 text-zinc-700 border-b border-zinc-200 font-semibold">
                  <tr>
                    <th className="py-2.5 px-4">Sprint</th>
                    <th className="py-2.5 px-4">Milestone</th>
                    <th className="py-2.5 px-4">Deliverables</th>
                    <th className="py-2.5 px-4">Duration</th>
                    <th className="py-2.5 px-4 text-right">Investment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  {blueprint.sprintRoadmap.map((sprint) => (
                    <tr key={sprint.sprintNumber}>
                      <td className="py-2.5 px-4 font-bold text-indigo-700">
                        Sprint {sprint.sprintNumber}
                      </td>
                      <td className="py-2.5 px-4 font-medium">{sprint.title}</td>
                      <td className="py-2.5 px-4 text-zinc-500">
                        {sprint.coreDeliverables.join(" • ")}
                      </td>
                      <td className="py-2.5 px-4">{sprint.durationWeeks} Weeks</td>
                      <td className="py-2.5 px-4 text-right font-bold text-zinc-900">
                        {currencySymbol}
                        {Math.round(sprint.estimatedCostUsd * rateMultiplier).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-zinc-50 font-bold border-t border-zinc-200 text-zinc-900">
                  <tr>
                    <td colSpan={3} className="py-3 px-4">Total Project Scope</td>
                    <td className="py-3 px-4">{blueprint.budgetSummary.totalEstimatedWeeks} Weeks</td>
                    <td className="py-3 px-4 text-right text-indigo-700 text-sm">
                      {currencySymbol}{adjustedCost.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Footer sign-off block */}
          <div className="border-t border-zinc-200 pt-6 flex justify-between items-end text-xs text-zinc-500">
            <div>
              <p>Accepted and Agreed by:</p>
              <div className="mt-8 border-b border-zinc-300 w-48" />
              <p className="mt-1 font-semibold">{clientName}</p>
            </div>
            <div>
              <p>Authorized Representative:</p>
              <div className="mt-8 border-b border-zinc-300 w-48" />
              <p className="mt-1 font-semibold">{agencyName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
