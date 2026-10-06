"use client";

import React, { useState } from "react";
import { Download, Mail, Code, Check, Loader2, Send } from "lucide-react";
import { ProductBlueprint } from "@/lib/types/blueprint";

function GithubIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

interface ActionToolbarProps {
  blueprint: ProductBlueprint;
}

export default function ActionToolbar({ blueprint }: ActionToolbarProps) {
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [isExportingGh, setIsExportingGh] = useState(false);
  const [ghStatus, setGhStatus] = useState<string | null>(null);

  const [copiedJson, setCopiedJson] = useState(false);

  // PDF Export via Browser Print / Clean Printable Layout
  const handleExportPdf = () => {
    setIsExportingPdf(true);
    try {
      window.print();
    } catch (e) {
      console.error("Print error", e);
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Email proposal
  const handleSendEmail = async () => {
    if (!emailTo || !emailTo.includes("@")) return;
    setIsSendingEmail(true);
    setEmailStatus(null);

    try {
      const res = await fetch("/api/export/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: emailTo,
          blueprint
        })
      });

      const data = await res.json();
      if (res.ok) {
        setEmailStatus(data.message || "Email sent successfully!");
        setTimeout(() => {
          setShowEmailModal(false);
          setEmailStatus(null);
        }, 2500);
      } else {
        setEmailStatus(data.error || "Failed to send email");
      }
    } catch (err) {
      setEmailStatus(err instanceof Error ? err.message : "Network error");
    } finally {
      setIsSendingEmail(false);
    }
  };

  // GitHub Export
  const handleExportGithub = async () => {
    setIsExportingGh(true);
    setGhStatus(null);

    try {
      const res = await fetch("/api/export/github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoOwner,
          repoName,
          githubToken,
          userStories: blueprint.userStories
        })
      });

      const data = await res.json();
      if (res.ok) {
        setGhStatus(data.message || "Export completed!");
        setTimeout(() => {
          setShowGithubModal(false);
          setGhStatus(null);
        }, 2500);
      } else {
        setGhStatus(data.error || "GitHub export failed");
      }
    } catch (err) {
      setGhStatus(err instanceof Error ? err.message : "Network error");
    } finally {
      setIsExportingGh(false);
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(blueprint, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 sm:p-5 shadow-xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Autonomous Export & Delivery Suite
          </span>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Turn this generated blueprint into client proposals, emails, or engineering issues in 1-click.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 px-3.5 py-2 text-xs font-semibold text-zinc-100 transition-colors border border-zinc-700"
          >
            <Download className="h-3.5 w-3.5 text-indigo-400" />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition-colors shadow-lg shadow-indigo-600/20"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Email Client</span>
          </button>

          <button
            onClick={() => setShowGithubModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 px-3.5 py-2 text-xs font-semibold text-zinc-300 transition-colors border border-zinc-800"
          >
            <GithubIcon className="h-3.5 w-3.5 text-zinc-400" />
            <span>Push to GitHub</span>
          </button>

          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 px-3 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors border border-zinc-800"
            title="Copy Raw Blueprint JSON"
          >
            {copiedJson ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Code className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-indigo-400" />
              Dispatch Proposal via Email
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Sends an executive summary of <strong>{blueprint.projectTitle}</strong> with budget estimates to the client.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  placeholder="client@company.com"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {emailStatus && (
                <p className="text-xs font-medium text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                  {emailStatus}
                </p>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowEmailModal(false)}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSendingEmail || !emailTo}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
              >
                {isSendingEmail ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                <span>Send Proposal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Modal */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <GithubIcon className="h-4 w-4 text-purple-400" />
              Export Stories to GitHub Issues
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Autonomously converts all {blueprint.userStories.length} User Stories into GitHub Issues with acceptance criteria checklists.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  Repository Owner / Org (Optional in Demo Mode)
                </label>
                <input
                  type="text"
                  placeholder="e.g. g7-uk"
                  value={repoOwner}
                  onChange={(e) => setRepoOwner(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  Repository Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. padelpulse-app"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-300 block mb-1">
                  Personal Access Token (Leave blank for Simulation)
                </label>
                <input
                  type="password"
                  placeholder="ghp_..."
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none"
                />
              </div>

              {ghStatus && (
                <p className="text-xs font-medium text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                  {ghStatus}
                </p>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowGithubModal(false)}
                className="rounded-lg px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleExportGithub}
                disabled={isExportingGh}
                className="flex items-center gap-1.5 rounded-lg bg-purple-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-purple-500"
              >
                {isExportingGh ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <GithubIcon className="h-3.5 w-3.5" />}
                <span>Sync to Issues</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
