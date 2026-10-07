"use client";

import React from "react";
import { SecurityProfile } from "@/lib/types/blueprint";
import { ShieldCheck, AlertTriangle, Lock, Server, CheckCircle2, RefreshCw } from "lucide-react";

interface SecurityComplianceViewProps {
  profile?: SecurityProfile;
}

export default function SecurityComplianceView({ profile }: SecurityComplianceViewProps) {
  // Default security baseline if not explicitly specified
  const data: SecurityProfile = profile || {
    overallScore: 94,
    grade: "A+",
    threatRisks: [
      {
        category: "Authentication & Authorization",
        risk: "Session token hijacking or brute-force credential stuffing",
        severity: "High",
        mitigation: "JWT with short-lived HttpOnly secure cookies + refresh token rotation and Cloudflare Turnstile bot protection."
      },
      {
        category: "Data Privacy & Encryption",
        risk: "Unauthorized data exfiltration from primary storage",
        severity: "Critical",
        mitigation: "AES-256 encryption at rest, TLS 1.3 in transit, and PostgreSQL Row-Level Security (RLS) enforcing tenant isolation."
      },
      {
        category: "Infrastructure & DDoS",
        risk: "Application-layer denial of service flooding API routes",
        severity: "Medium",
        mitigation: "Edge rate limiting via Upstash Redis (100 req/min per IP) and Cloudflare Web Application Firewall (WAF)."
      },
      {
        category: "API Security",
        risk: "Malicious payload injection or untyped schema poisoning",
        severity: "High",
        mitigation: "Strict runtime Zod validation on all inbound JSON payloads and automated SQL parameterization via Prisma ORM."
      }
    ],
    complianceChecklist: [
      { standard: "GDPR", status: "Compliant by Design", notes: "Data subject access request (DSAR) workflows and automatic PII redaction." },
      { standard: "SOC 2", status: "Compliant by Design", notes: "Immutable audit logging and role-based access control (RBAC)." },
      { standard: "OWASP Top 10", status: "Compliant by Design", notes: "Protection against SQLi, XSS, SSRF, and broken access controls." },
      { standard: "PCI-DSS", status: "Compliant by Design", notes: "Scope zero: All cardholder data handled directly by Stripe hosted elements." }
    ],
    disasterRecovery: {
      targetRto: "15 Minutes (Zero-downtime container auto-rollback)",
      targetRpo: "5 Minutes (Continuous PostgreSQL WAL replication)",
      backupFrequency: "Automated daily snapshots + point-in-time recovery"
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "Critical":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "High":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Score & Readiness */}
      <div className="rounded-2xl border border-emerald-900/40 bg-gradient-to-r from-emerald-950/30 via-zinc-950 to-zinc-950 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
            <span className="text-2xl font-black">{data.grade}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Enterprise Security & Compliance Rating</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Overall Security Posture Score: <strong className="text-emerald-400">{data.overallScore}/100</strong> • Built with zero-trust architecture.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {data.complianceChecklist.map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 border border-zinc-800"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              {c.standard}
            </span>
          ))}
        </div>
      </div>

      {/* Threat Modeling & Countermeasures Matrix */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          Threat Vector Analysis & Mitigation Matrix (OWASP / STRIDE)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.threatRisks.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 flex flex-col justify-between hover:border-zinc-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 flex items-center gap-1">
                    <Lock className="h-3 w-3 text-indigo-400" />
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                    {item.severity} Risk
                  </span>
                </div>
                <h5 className="text-xs font-bold text-zinc-200 mb-2">{item.risk}</h5>
                <div className="rounded-lg bg-zinc-900/80 p-3 border border-zinc-800/80">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    Architectural Mitigation:
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">{item.mitigation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disaster Recovery & SLA */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
          <Server className="h-4 w-4 text-cyan-400" />
          Business Continuity & Disaster Recovery Targets
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Target RTO (Recovery Time)</span>
            <span className="text-xs font-bold text-white mt-1 block">{data.disasterRecovery.targetRto}</span>
          </div>

          <div className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Target RPO (Data Loss Limit)</span>
            <span className="text-xs font-bold text-white mt-1 block">{data.disasterRecovery.targetRpo}</span>
          </div>

          <div className="rounded-xl bg-zinc-900/60 p-4 border border-zinc-800">
            <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Backup Strategy</span>
            <span className="text-xs font-bold text-white mt-1 block">{data.disasterRecovery.backupFrequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
