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
        mitigation: "Strict runtime schema contract validation on all inbound JSON payloads and automated parameterized queries with prepared statements."
      }
    ],
    complianceChecklist: [
      { standard: "GDPR", status: "Compliant by Design", notes: "Data subject access request (DSAR) workflows and automatic PII redaction." },
      { standard: "SOC 2", status: "Compliant by Design", notes: "Immutable audit logging and role-based access control (RBAC)." },
      { standard: "OWASP Top 10", status: "Compliant by Design", notes: "Protection against SQLi, XSS, SSRF, and broken access controls." },
      { standard: "PCI-DSS", status: "Compliant by Design", notes: "Zero card data touched; delegated entirely to tokenized Stripe hosted elements." }
    ],
    disasterRecovery: {
      targetRto: "15 Minutes (Zero-downtime container auto-rollback)",
      targetRpo: "5 Minutes (Continuous PostgreSQL WAL replication)",
      backupFrequency: "Automated daily snapshots + point-in-time recovery"
    }
  };

  const score = data.overallScore || 94;

  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "text-rose-400 bg-rose-950/40 border-rose-850";
      case "high":
        return "text-amber-400 bg-amber-950/40 border-amber-850";
      default:
        return "text-zinc-400 bg-zinc-800 border-zinc-700";
    }
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Top Banner: Score & Readiness */}
      <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 text-zinc-100 font-bold font-mono text-base">
            {score}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <h3 className="text-xs font-semibold text-zinc-100">Security Architecture & Regulatory Readiness</h3>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Grade {data.grade} • Verified against STRIDE taxonomy and OWASP Top 10 guidelines
            </p>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {data.complianceChecklist.map((c, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-md bg-zinc-900/80 px-2.5 py-1 text-[11px] text-zinc-300 border border-zinc-800 font-mono"
            >
              <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
              <span>{c.standard}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Matrix */}
      <div>
        <h4 className="text-xs font-semibold text-zinc-300 mb-2 flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-zinc-400" />
          STRIDE Threat Vectors & Architectural Mitigations
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.threatRisks.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-zinc-800 bg-[#09090b] p-3.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 flex items-center gap-1">
                    <Lock className="h-3 w-3 text-zinc-500" />
                    {item.category}
                  </span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded border font-mono font-bold ${getSeverityBadge(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>

                <h5 className="text-xs font-medium text-zinc-200 mb-2 font-sans">
                  {item.risk}
                </h5>

                <div className="rounded bg-zinc-950 p-2.5 border border-zinc-850 text-[11px] text-zinc-400 leading-relaxed font-sans">
                  <span className="font-mono text-[10px] uppercase text-zinc-300 font-bold block mb-0.5">
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
      <div className="rounded-lg border border-zinc-800 bg-[#09090b] p-3.5">
        <h4 className="text-xs font-semibold text-zinc-300 mb-2.5 flex items-center gap-1.5">
          <Server className="h-3.5 w-3.5 text-zinc-400" />
          High Availability & Disaster Recovery Target
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="rounded bg-zinc-950 p-2.5 border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase block font-mono">Recovery Time (RTO)</span>
            <span className="text-zinc-200 font-medium mt-0.5 block">{data.disasterRecovery.targetRto}</span>
          </div>

          <div className="rounded bg-zinc-950 p-2.5 border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase block font-mono">Recovery Point (RPO)</span>
            <span className="text-zinc-200 font-medium mt-0.5 block">{data.disasterRecovery.targetRpo}</span>
          </div>

          <div className="rounded bg-zinc-950 p-2.5 border border-zinc-850">
            <span className="text-[10px] text-zinc-500 uppercase block font-mono">Backup Frequency</span>
            <span className="text-zinc-200 font-medium mt-0.5 block">{data.disasterRecovery.backupFrequency}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
