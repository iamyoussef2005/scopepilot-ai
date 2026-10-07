"use client";

import React from "react";
import { SecurityProfile } from "@/lib/types/blueprint";
import { ShieldCheck, AlertTriangle, Lock, Server, CheckCircle2 } from "lucide-react";

interface SecurityComplianceViewProps {
  profile?: SecurityProfile;
}

export default function SecurityComplianceView({ profile }: SecurityComplianceViewProps) {
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

  return (
    <div className="space-y-4">
      {/* Top Banner: Score & Readiness */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-emerald-400 font-bold text-sm">
            {data.grade}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-semibold text-white">Security & Regulatory Compliance</h3>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Posture Score: <span className="text-emerald-400 font-bold">{data.overallScore}/100</span> • Zero-trust architecture verified
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {data.complianceChecklist.map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-1 rounded bg-zinc-950 px-2 py-1 text-[11px] text-zinc-300 border border-zinc-800"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-500" />
              {c.standard}
            </span>
          ))}
        </div>
      </div>

      {/* Threat Matrix */}
      <div>
        <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-zinc-500" />
          Threat Vector Analysis & Mitigation Matrix (OWASP / STRIDE)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.threatRisks.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3.5 flex flex-col justify-between font-mono"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5 text-[10px]">
                  <span className="uppercase text-zinc-400 flex items-center gap-1">
                    <Lock className="h-3 w-3 text-zinc-500" />
                    {item.category}
                  </span>
                  <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded font-semibold">
                    {item.severity}
                  </span>
                </div>
                <h5 className="text-xs font-medium text-zinc-200 mb-2 font-sans">{item.risk}</h5>
                <div className="rounded bg-zinc-950 p-2.5 border border-zinc-850 font-sans text-xs text-zinc-400 leading-relaxed">
                  <span className="font-mono text-[10px] uppercase font-bold text-zinc-300 block mb-0.5">
                    Mitigation:
                  </span>
                  {item.mitigation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disaster Recovery & SLA */}
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/30 p-3.5 font-mono">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 mb-2.5 flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5 text-zinc-500" />
          Business Continuity & SLA Target
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="rounded bg-zinc-950 p-2.5 border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase block">Target RTO</span>
            <span className="text-zinc-200 font-semibold mt-0.5 block">{data.disasterRecovery.targetRto}</span>
          </div>

          <div className="rounded bg-zinc-950 p-2.5 border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase block">Target RPO</span>
            <span className="text-zinc-200 font-semibold mt-0.5 block">{data.disasterRecovery.targetRpo}</span>
          </div>

          <div className="rounded bg-zinc-950 p-2.5 border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase block">Backup Cadence</span>
            <span className="text-zinc-200 font-semibold mt-0.5 block">{data.disasterRecovery.backupFrequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
