"use client";

import React, { useEffect, useRef, useState } from "react";
import { Copy, Check, Maximize2, Minimize2, AlertCircle, ZoomIn, ZoomOut, RotateCcw, Download } from "lucide-react";

interface MermaidViewerProps {
  chart: string;
}

export default function MermaidViewer({ chart }: MermaidViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1.0);

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

  const handleDownloadSvg = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "system-architecture.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const zoomIn = () => setZoom((z) => Math.min(2.5, Math.round((z + 0.15) * 100) / 100));
  const zoomOut = () => setZoom((z) => Math.max(0.5, Math.round((z - 0.15) * 100) / 100));
  const resetZoom = () => setZoom(1.0);

  return (
    <div
      className={`relative w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-5 transition-all ${
        isFullscreen
          ? "fixed inset-4 z-50 overflow-auto bg-zinc-950 p-8 shadow-2xl border-zinc-700"
          : "overflow-hidden"
      }`}
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider font-mono">
            System Architecture Topology
          </h4>
        </div>

        {/* Toolbar: Zoom + Actions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Zoom controls */}
          <div className="flex items-center rounded-lg border border-zinc-800 bg-zinc-900/90 p-0.5 font-mono text-[11px] text-zinc-400 mr-1">
            <button
              onClick={zoomOut}
              className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={resetZoom}
              className="px-1.5 py-0.5 hover:text-white transition-colors"
              title="Reset Zoom"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={zoomIn}
              className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={resetZoom}
              className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors ml-0.5 border-l border-zinc-800"
              title="Reset View"
            >
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>

          <button
            onClick={handleDownloadSvg}
            disabled={!svgContent}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-400 hover:text-white transition-colors disabled:opacity-40"
            title="Download SVG Diagram"
          >
            <Download className="h-3.5 w-3.5" />
            <span>SVG</span>
          </button>

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
          className="flex justify-center items-center overflow-auto py-6 min-h-[300px] transition-all"
        >
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "center center",
              transition: "transform 0.15s ease-out"
            }}
            className="flex justify-center items-center [&_svg]:max-w-none [&_svg]:h-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      ) : (
        <div className="flex h-48 items-center justify-center text-xs text-zinc-500 font-mono">
          Compiling SVG architecture visualizer...
        </div>
      )}
    </div>
  );
}
