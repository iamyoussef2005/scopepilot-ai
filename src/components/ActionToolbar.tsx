"use client";

import React, { useState } from "react";
import { Download, Mail, Code, Check, Loader2, Send, Package, Printer } from "lucide-react";
import { ProductBlueprint } from "@/lib/types/blueprint";
import { generateProjectZip, triggerDownloadBlob } from "@/lib/utils/export-zip";

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
  const [isZipping, setIsZipping] = useState(false);

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const blob = await generateProjectZip(blueprint);
      const slug = blueprint.projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      triggerDownloadBlob(blob, `${slug}-scaffold.zip`);
    } catch (e) {
      console.error("ZIP generation error", e);
    } finally {
      setIsZipping(false);
    }
  };

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
        setEmailStatus(data.message || "Dispatched successfully!");
        setTimeout(() => {
          setShowEmailModal(false);
          setEmailStatus(null);
        }, 2200);
      } else {
        setEmailStatus(data.error || "Failed to send email");
      }
    } catch (err) {
      setEmailStatus(err instanceof Error ? err.message : "Network error");
    } finally {
      setIsSendingEmail(false);
    }
  };

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
        setGhStatus(data.message || "Synced to GitHub issues!");
        setTimeout(() => {
          setShowGithubModal(false);
          setGhStatus(null);
        }, 2200);
      } else {
        setGhStatus(data.error || "Export failed");
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
    <div className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 sm:p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-zinc-300">
            Export & Deployment Options
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="font-mono text-[11px] text-zinc-500 hidden sm:inline">
            Direct file outputs & issue sync
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 rounded-md bg-zinc-100 hover:bg-white px-3 py-1.5 text-xs font-semibold text-zinc-950 transition-colors shadow-sm"
          >
            {isZipping ? <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-700" /> : <Package className="h-3.5 w-3.5 text-zinc-700" />}
            <span>Starter Scaffold (.zip)</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 rounded-md bg-zinc-900 hover:bg-zinc-850 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors border border-zinc-800 hover:border-zinc-750"
          >
            <Download className="h-3.5 w-3.5 text-zinc-400" />
            <span>Print SOW PDF</span>
          </button>

          <button
            onClick={() => setShowEmailModal(true)}
            className="flex items-center gap-1.5 rounded-md bg-zinc-900 hover:bg-zinc-850 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors border border-zinc-800 hover:border-zinc-750"
          >
            <Mail className="h-3.5 w-3.5 text-zinc-400" />
            <span>Email Client</span>
          </button>

          <button
            onClick={() => setShowGithubModal(true)}
            className="flex items-center gap-1.5 rounded-md bg-zinc-900 hover:bg-zinc-850 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors border border-zinc-800 hover:border-zinc-750"
          >
            <GithubIcon className="h-3.5 w-3.5 text-zinc-400" />
            <span>Sync to GitHub</span>
          </button>

          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 rounded-md bg-zinc-900 hover:bg-zinc-850 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors border border-zinc-800"
            title="Copy Raw Blueprint JSON"
          >
            {copiedJson ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Code className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Mail className="h-4 w-4 text-zinc-400" />
              Dispatch SOW Summary via Email
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Sends an executive summary of <strong>{blueprint.projectTitle}</strong> with deliverables and estimated budget.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-[11px] font-mono font-medium text-zinc-300 block mb-1">
                  Recipient Email
                </label>
                <input
                  type="email"
                  placeholder="stakeholder@company.com"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 font-mono focus:border-zinc-500 focus:outline-none"
                />
              </div>

              {emailStatus && (
                <p className="text-xs font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                  {emailStatus}
                </p>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowEmailModal(false)}
                className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSendingEmail || !emailTo}
                className="flex items-center gap-1.5 rounded-md bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-white disabled:opacity-50"
              >
                {isSendingEmail ? <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-700" /> : <Send className="h-3.5 w-3.5 text-zinc-700" />}
                <span>Send</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Modal */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-5 shadow-2xl">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <GithubIcon className="h-4 w-4 text-zinc-300" />
              Sync Stories to GitHub Issues
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Converts all {blueprint.userStories.length} User Stories into tracked GitHub Issues with acceptance criteria checklists.
            </p>

            <div className="mt-4 space-y-3 font-mono">
              <div>
                <label className="text-[11px] font-medium text-zinc-300 block mb-1">
                  Repository Owner / Org
                </label>
                <input
                  type="text"
                  placeholder="e.g. acme-corp"
                  value={repoOwner}
                  onChange={(e) => setRepoOwner(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-zinc-300 block mb-1">
                  Repository Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. platform-service"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-zinc-300 block mb-1">
                  Personal Access Token (Leave blank for Simulation)
                </label>
                <input
                  type="password"
                  placeholder="ghp_..."
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none"
                />
              </div>

              {ghStatus && (
                <p className="text-xs font-mono text-emerald-400 bg-emerald-950/40 p-2 rounded border border-emerald-900/50">
                  {ghStatus}
                </p>
              )}
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowGithubModal(false)}
                className="rounded-md px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleExportGithub}
                disabled={isExportingGh}
                className="flex items-center gap-1.5 rounded-md bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 hover:bg-white"
              >
                {isExportingGh ? <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-700" /> : <GithubIcon className="h-3.5 w-3.5 text-zinc-700" />}
                <span>Sync Issues</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
