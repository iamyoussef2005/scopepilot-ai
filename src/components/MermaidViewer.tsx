"use client";

import React, { useEffect, useRef, useState } from "react";
import { Copy, Check, Maximize2, Minimize2, AlertCircle } from "lucide-react";

interface MermaidViewerProps {
  chart: string;
}

export default function MermaidViewer({ chart }: MermaidViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function renderMermaid() {
      if (!chart || typeof window === "undefined") return;

      try {
        setRenderError(null);
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "inherit",
          themeVariables: {
            darkMode: true,
            background: "#09090b",
            primaryColor: "#4f46e5",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#6366f1",
            lineColor: "#818cf8",
            secondaryColor: "#1e1b4b",
            tertiaryColor: "#18181b"
          }
        });

        // Clean chart code if any wrapped backticks exist
        const cleanedChart = chart
          .replace(/^```mermaid\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/```$/i, "")
          .trim();

        const uniqueId = `mermaid-svg-${Math.random().toString(36).substring(2, 9)}`;
        const { svg } = await mermaid.render(uniqueId, cleanedChart);

        if (isMounted) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error("Mermaid render error:", err);
        if (isMounted) {
          setRenderError(
            err instanceof Error ? err.message : "Failed to render Mermaid diagram"
          );
        }
      }
    }

    renderMermaid();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`relative w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 transition-all ${
        isFullscreen
          ? "fixed inset-4 z-50 overflow-auto bg-zinc-950 p-8 shadow-2xl border-zinc-700"
          : "overflow-hidden"
      }`}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            System Architecture Flowchart
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied" : "Copy Source"}</span>
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1 text-zinc-400 hover:text-white transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Diagram container */}
      {renderError ? (
        <div className="rounded-xl border border-amber-900/50 bg-amber-950/20 p-4 text-xs text-amber-300 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Mermaid Source Fallback:</p>
            <pre className="mt-2 font-mono text-[11px] overflow-x-auto text-zinc-400 p-2 rounded bg-zinc-900">
              {chart}
            </pre>
          </div>
        </div>
      ) : svgContent ? (
        <div
          ref={containerRef}
          className="flex justify-center items-center overflow-x-auto py-4 [&_svg]:max-w-full [&_svg]:h-auto transition-transform"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      ) : (
        <div className="flex h-48 items-center justify-center text-xs text-zinc-500 font-mono">
          Compiling SVG architecture visualizer...
        </div>
      )}
    </div>
  );
}
