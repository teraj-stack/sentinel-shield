import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Lock, Unlock, Zap, Sliders, Sparkles, CheckCircle } from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
export const DiagnosticConsole = ({
  metrics,
  locks,
  config,
  isSandboxMode,
  setIsSandboxMode,
  onSandboxMetricsChange,
  history,
  minTriangleAngle,
  setMinTriangleAngle,
  maxTriangleEdgeLength,
  setMaxTriangleEdgeLength,
  enforceDelaunayCondition,
  setEnforceDelaunayCondition,
  triangulationStats,
  scanType,
  setScanType,
  liveFeedback,
  setLiveFeedback
}) => {
  const isLumaInBounds = metrics.luma >= 92 && metrics.luma <= 210;
  const isSharpnessInBounds = metrics.sharpness >= 0.8;
  const isCctInBounds = metrics.cct >= 5e3 && metrics.cct <= 6800;
  const isDistanceInBounds = metrics.distance >= 0.25 && metrics.distance <= config.lidarPrecisionRange;
  const isYawInBounds = Math.abs(metrics.yaw) <= 10;
  const isPitchInBounds = Math.abs(metrics.pitch) <= 10;
  const isRollInBounds = Math.abs(metrics.roll) <= 10;
  const isRotationInBounds = isYawInBounds && isPitchInBounds && isRollInBounds;
  const isQualityInBounds = metrics.qualityScore >= config.minQualityScore;
  const renderSparkline = (data, minVal, maxVal, colorClass, optimalMin, optimalMax) => {
    if (data.length < 2) return null;
    const width = 160;
    const height = 30;
    const padding = 2;
    const points = data.map((val, idx) => {
      const x = idx / (data.length - 1) * (width - padding * 2) + padding;
      const range = maxVal - minVal || 1;
      const y = height - (val - minVal) / range * (height - padding * 2) - padding;
      return `${x},${y}`;
    }).join(" ");
    let optimalBand = null;
    if (optimalMin !== void 0 && optimalMax !== void 0) {
      const range = maxVal - minVal || 1;
      const yMin = height - (optimalMax - minVal) / range * (height - padding * 2) - padding;
      const yMax = height - (optimalMin - minVal) / range * (height - padding * 2) - padding;
      optimalBand = /* @__PURE__ */ jsxDEV(
        "rect",
        {
          x: 0,
          y: Math.max(padding, yMin),
          width,
          height: Math.min(height - padding * 2, yMax - yMin),
          fill: "rgba(16, 185, 129, 0.08)",
          stroke: "rgba(16, 185, 129, 0.15)",
          strokeWidth: "0.5",
          strokeDasharray: "2,2",
          id: "optimal_band_rect"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 94,
          columnNumber: 9
        },
        this
      );
    }
    return /* @__PURE__ */ jsxDEV("svg", { width: "100%", height, viewBox: `0 0 ${width} ${height}`, className: "overflow-visible", id: "sparkline_svg", children: [
      optimalBand,
      /* @__PURE__ */ jsxDEV(
        "polyline",
        {
          fill: "none",
          stroke: colorClass,
          strokeWidth: "1.5",
          points,
          id: "sparkline_polyline"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 111,
          columnNumber: 9
        },
        this
      ),
      data.length > 0 && (() => {
        const lastIdx = data.length - 1;
        const x = lastIdx / (data.length - 1) * (width - padding * 2) + padding;
        const range = maxVal - minVal || 1;
        const y = height - (data[lastIdx] - minVal) / range * (height - padding * 2) - padding;
        return /* @__PURE__ */ jsxDEV("circle", { cx: x, cy: y, r: "3", fill: colorClass, className: "animate-pulse", id: "sparkline_pulse_dot" }, void 0, false, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 123,
          columnNumber: 18
        }, this);
      })()
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
      lineNumber: 109,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4", id: "diagnostic_console_wrapper", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", id: "header_control_row", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 135,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "font-mono text-xs font-bold tracking-wider text-slate-200", children: "FUSION LOGIC CONTROL PLANE" }, void 0, false, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 136,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 134,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          id: "toggle_sandbox_mode_btn",
          onClick: () => setIsSandboxMode(!isSandboxMode),
          className: `font-mono text-[9px] px-2.5 py-1 rounded transition-all flex items-center gap-1 border ${isSandboxMode ? "bg-sky-950/40 border-sky-800 text-sky-400 hover:bg-sky-950/60" : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3 h-3" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 151,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: isSandboxMode ? "SWITCH TO WEBCAM" : "ACTIVATE SANDBOX" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 152,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 142,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
      lineNumber: 133,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-850 bg-slate-950/40 rounded-xl p-3 flex flex-col gap-2", id: "stability_tracker_box", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-mono text-[10px]", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "EDGE AI COHERENCE DWELL:" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 160,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `font-bold ${metrics.stabilityMs >= 2e3 ? "text-emerald-400" : "text-amber-400"}`, children: [
            metrics.stabilityMs,
            " / ",
            config.stabilityTimeoutMs,
            " ms"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 161,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 159,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500", children: metrics.stabilityMs >= 2e3 ? "SPEC LOCK LOCKED" : "SUBJECT MUST HOLD STILL" }, void 0, false, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 165,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-950", id: "stability_progress_container", children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `h-full rounded-full transition-all duration-100 ${metrics.stabilityMs >= 2e3 ? "bg-emerald-500 shadow-[0_0_8px_#10b981]" : "bg-amber-400"}`,
          style: { width: `${Math.min(100, metrics.stabilityMs / config.stabilityTimeoutMs * 100)}%` },
          id: "stability_progress_bar"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 171,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 170,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
      lineNumber: 157,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", id: "locks_matrix_grid", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-lg border transition-all ${locks.exposure === "LOCKED" ? "bg-emerald-950/20 border-emerald-800/60" : "bg-slate-950/60 border-slate-900"}`, id: "lock_col_exposure", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-slate-400 font-bold tracking-wider", children: "EXPOSURE (LUMA)" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 193,
            columnNumber: 13
          }, this),
          locks.exposure === "LOCKED" ? /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 font-mono text-[8px] bg-emerald-900/60 text-emerald-400 border border-emerald-700 px-1.5 py-0.5 rounded", children: [
            /* @__PURE__ */ jsxDEV(Lock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 196,
              columnNumber: 17
            }, this),
            " LOCKED"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 195,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 font-mono text-[8px] bg-slate-900 text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded", children: [
            /* @__PURE__ */ jsxDEV(Unlock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 200,
              columnNumber: 17
            }, this),
            " SCANNING"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 199,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 192,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-lg font-semibold text-slate-200", children: [
            metrics.luma,
            " L"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 206,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500", children: "(Target: 142.0)" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 209,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 205,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 h-1 bg-slate-900 rounded-full overflow-hidden relative", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[36%] right-[17%] bg-emerald-500/10 border-x border-emerald-500/20" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 215,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `absolute top-0 bottom-0 w-1 rounded-full transition-all duration-300 ${isLumaInBounds ? "bg-emerald-500" : "bg-red-500"}`,
              style: { left: `${Math.min(100, Math.max(0, metrics.luma / 255 * 100))}%` }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 216,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2 border-t border-slate-900/50 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-[110px] h-[24px]", children: renderSparkline(history.map((h) => h.luma), 0, 255, isLumaInBounds ? "#10b981" : "#f59e0b", 92, 210) }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 225,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-slate-500", children: "LUMA SIGNAL" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 228,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 224,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 187,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-lg border transition-all ${locks.focus === "LOCKED" ? "bg-emerald-950/20 border-emerald-800/60" : "bg-slate-950/60 border-slate-900"}`, id: "lock_col_focus", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-slate-400 font-bold tracking-wider", children: "FOCUS (SHARPNESS)" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 239,
            columnNumber: 13
          }, this),
          locks.focus === "LOCKED" ? /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 font-mono text-[8px] bg-emerald-900/60 text-emerald-400 border border-emerald-700 px-1.5 py-0.5 rounded", children: [
            /* @__PURE__ */ jsxDEV(Lock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 242,
              columnNumber: 17
            }, this),
            " LOCKED"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 241,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 font-mono text-[8px] bg-slate-900 text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded", children: [
            /* @__PURE__ */ jsxDEV(Unlock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 246,
              columnNumber: 17
            }, this),
            " SCANNING"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 245,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 238,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-lg font-semibold text-slate-200", children: metrics.sharpness.toFixed(2) }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 252,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500", children: "(Target: ≥ 0.80)" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 255,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 251,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 h-1 bg-slate-900 rounded-full overflow-hidden relative", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[80%] right-0 bg-emerald-500/10 border-l border-emerald-500/20" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 261,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `absolute top-0 bottom-0 w-1 rounded-full transition-all duration-300 ${isSharpnessInBounds ? "bg-emerald-500" : "bg-red-500"}`,
              style: { left: `${Math.min(100, Math.max(0, metrics.sharpness * 100))}%` }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 262,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 260,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2 border-t border-slate-900/50 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-[110px] h-[24px]", children: renderSparkline(history.map((h) => h.sharpness), 0, 1, isSharpnessInBounds ? "#10b981" : "#f59e0b", 0.8, 1) }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 271,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-slate-500", children: "FOCUS MATRIX" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 274,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 270,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 233,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-lg border transition-all ${locks.whiteBalance === "LOCKED" ? "bg-emerald-950/20 border-emerald-800/60" : "bg-slate-950/60 border-slate-900"}`, id: "lock_col_cct", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-slate-400 font-bold tracking-wider", children: "CCT (WHITE BALANCE)" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 285,
            columnNumber: 13
          }, this),
          locks.whiteBalance === "LOCKED" ? /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 font-mono text-[8px] bg-emerald-900/60 text-emerald-400 border border-emerald-700 px-1.5 py-0.5 rounded", children: [
            /* @__PURE__ */ jsxDEV(Lock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 288,
              columnNumber: 17
            }, this),
            " LOCKED"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 287,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 font-mono text-[8px] bg-slate-900 text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded", children: [
            /* @__PURE__ */ jsxDEV(Unlock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 292,
              columnNumber: 17
            }, this),
            " SCANNING"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 291,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 284,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 flex items-baseline gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-lg font-semibold text-slate-200", children: [
            metrics.cct,
            " K"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 298,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500", children: "(5000–6800 K)" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 301,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 297,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 h-1 bg-slate-900 rounded-full overflow-hidden relative", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[28%] right-[40%] bg-emerald-500/10 border-x border-emerald-500/20" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 307,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `absolute top-0 bottom-0 w-1 rounded-full transition-all duration-300 ${isCctInBounds ? "bg-emerald-500" : "bg-red-500"}`,
              style: { left: `${Math.min(100, Math.max(0, (metrics.cct - 3e3) / 7e3 * 100))}%` }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 308,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 306,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2 border-t border-slate-900/50 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-[110px] h-[24px]", children: renderSparkline(history.map((h) => h.cct), 3e3, 1e4, isCctInBounds ? "#10b981" : "#f59e0b", 5e3, 6800) }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 317,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-slate-500", children: "CCT ACCURACY" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 320,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 316,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 279,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
      lineNumber: 184,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-800 rounded-xl p-4 bg-slate-950/50", id: "live_feedback_protocol_card", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-900 pb-2 mb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 font-mono text-[10px] font-bold text-sky-400 uppercase tracking-wider", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 330,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "LIVE FEEDBACK PROTOCOL (CLASS Standard)" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 331,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 329,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500 uppercase tracking-wider", children: "Active Spec Tuning" }, void 0, false, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 333,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 328,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", id: "live_feedback_protocol_inputs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "font-mono text-[9px] text-slate-400 uppercase", children: "ACTIVE SCAN_TYPE TARGET" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 342,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setScanType("chomiki_twarz"),
                className: `font-mono text-[9px] py-1.5 px-2 rounded border transition-all ${scanType === "chomiki_twarz" ? "bg-emerald-950/40 border-emerald-500 text-emerald-400 font-bold" : "bg-slate-900/60 border-slate-850 text-slate-500 hover:text-slate-300"}`,
                children: "CHOMIKI_TWARZ (Face)"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                lineNumber: 344,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setScanType("oponka_brzuch"),
                className: `font-mono text-[9px] py-1.5 px-2 rounded border transition-all ${scanType === "oponka_brzuch" ? "bg-amber-950/40 border-amber-500 text-amber-400 font-bold" : "bg-slate-900/60 border-slate-850 text-slate-500 hover:text-slate-300"}`,
                children: "OPONKA_BRZUCH (Belly)"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                lineNumber: 355,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 343,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 341,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[9px] text-slate-400 uppercase", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "SCANNING RATE FREQUENCY" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 372,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold", children: [
              liveFeedback.updateFrequencyHz.toFixed(1),
              " Hz"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 373,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 371,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "10.0",
              max: "60.0",
              step: "5.0",
              value: liveFeedback.updateFrequencyHz,
              onChange: (e) => setLiveFeedback((prev) => ({ ...prev, updateFrequencyHz: parseFloat(e.target.value) })),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "update_frequency_slider"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 375,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between font-mono text-[7px] text-slate-500", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "10 Hz (Low)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 386,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sky-500 font-bold font-mono", children: "30 Hz Protocol" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 387,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "60 Hz (Max)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 388,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 385,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 370,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "sm:col-span-2 grid grid-cols-3 gap-2.5 pt-1.5 border-t border-slate-900", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setLiveFeedback((prev) => ({ ...prev, continuousScanning: !prev.continuousScanning })),
              className: `font-mono text-[8px] p-2 rounded border transition-all flex flex-col items-center gap-1 ${liveFeedback.continuousScanning ? "bg-sky-950/40 border-sky-800 text-sky-400" : "bg-slate-900/60 border-slate-850 text-slate-500"}`,
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[7px] text-slate-500 block uppercase font-bold", children: "Continuous Scan" }, void 0, false, {
                  fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                  lineNumber: 404,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: liveFeedback.continuousScanning ? "ACTIVE LOOP" : "SUSPENDED" }, void 0, false, {
                  fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                  lineNumber: 405,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 395,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setLiveFeedback((prev) => ({ ...prev, showLiveMesh: !prev.showLiveMesh })),
              className: `font-mono text-[8px] p-2 rounded border transition-all flex flex-col items-center gap-1 ${liveFeedback.showLiveMesh ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" : "bg-slate-900/60 border-slate-850 text-slate-500"}`,
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[7px] text-slate-500 block uppercase font-bold", children: "Show Wireframe" }, void 0, false, {
                  fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                  lineNumber: 418,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: liveFeedback.showLiveMesh ? "RENDERING" : "SUSPENDED" }, void 0, false, {
                  fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                  lineNumber: 419,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 409,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setLiveFeedback((prev) => ({ ...prev, showRealTimeMetrics: !prev.showRealTimeMetrics })),
              className: `font-mono text-[8px] p-2 rounded border transition-all flex flex-col items-center gap-1 ${liveFeedback.showRealTimeMetrics ? "bg-indigo-950/40 border-indigo-800 text-indigo-400" : "bg-slate-900/60 border-slate-850 text-slate-500"}`,
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[7px] text-slate-500 block uppercase font-bold", children: "Metrics Overlay" }, void 0, false, {
                  fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                  lineNumber: 432,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: liveFeedback.showRealTimeMetrics ? "VISIBLE HUD" : "HIDDEN HUD" }, void 0, false, {
                  fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                  lineNumber: 433,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 423,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 393,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 338,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
      lineNumber: 327,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-800 rounded-xl p-4 bg-slate-950/40", id: "triangulation_parameters_box", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "font-mono text-[10px] font-bold text-slate-300 tracking-wider mb-3 uppercase flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 443,
          columnNumber: 11
        }, this),
        "LiDAR FUSION & DELAUNAY TRIANGULATION METRICS"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 442,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", id: "filter_col_angle", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Min Triangle Angle" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 452,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sky-400", children: [
              minTriangleAngle.toFixed(1),
              "°"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 453,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 451,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "15.0",
              max: "45.0",
              step: "1.0",
              value: minTriangleAngle,
              onChange: (e) => setMinTriangleAngle(parseFloat(e.target.value)),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "angle_filter_range"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 455,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between font-mono text-[7px] text-slate-500 mt-1", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "15° (Loose)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 466,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sky-500 font-bold", children: "30° Spec" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 467,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "45° (Strict)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 468,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 465,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 450,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", id: "filter_col_length", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Max Edge Length (mm)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 475,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sky-400", children: [
              maxTriangleEdgeLength.toFixed(1),
              " mm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 476,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 474,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "2.0",
              max: "10.0",
              step: "0.5",
              value: maxTriangleEdgeLength,
              onChange: (e) => setMaxTriangleEdgeLength(parseFloat(e.target.value)),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "edge_length_filter_range"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 478,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between font-mono text-[7px] text-slate-500 mt-1", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "2.0mm (Tight)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 489,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sky-500 font-bold", children: "5.0mm Spec" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 490,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "10.0mm (Wide)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 491,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 488,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 473,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col justify-between border-l border-slate-900 pl-4", id: "filter_col_delaunay_toggle", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-slate-400 uppercase tracking-wider", children: "Delaunay InCircle Constraint" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 497,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mt-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-slate-300", children: "Active Test Highlight" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 499,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                id: "toggle_delaunay_condition_btn",
                onClick: () => setEnforceDelaunayCondition(!enforceDelaunayCondition),
                className: `font-mono text-[8px] font-bold px-2 py-1 rounded border transition-all ${enforceDelaunayCondition ? "bg-sky-950/40 border-sky-800 text-sky-400" : "bg-slate-900 border-slate-800 text-slate-500"}`,
                children: enforceDelaunayCondition ? "ACTIVE CIRCUMCIRCLE" : "DISABLED"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                lineNumber: 500,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 498,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-slate-500 mt-1.5", children: "Highlight circumcircle on hover." }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 512,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 496,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 447,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-3 border-t border-slate-900 grid grid-cols-3 gap-2 text-center", id: "defect_report_grid", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/80 border border-slate-900 rounded p-2", id: "report_total", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[8px] text-slate-500", children: "TOTAL TRIANGLES" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 523,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-sans text-base font-bold text-slate-200 mt-0.5", children: triangulationStats.total }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 524,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 522,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `bg-slate-950/80 border rounded p-2 transition-colors ${triangulationStats.skinny > 0 ? "border-amber-950 text-amber-400" : "border-slate-900 text-slate-400"}`, id: "report_skinny", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[8px] text-slate-500", children: "SKINNY DEVIATIONS" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 532,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-sans text-base font-bold mt-0.5", children: triangulationStats.skinny }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 533,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 529,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `bg-slate-950/80 border rounded p-2 transition-colors ${triangulationStats.tooLong > 0 ? "border-red-950 text-red-400" : "border-slate-900 text-slate-400"}`, id: "report_too_long", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[8px] text-slate-500", children: "EDGE LIMIT OVERFLOWS" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 541,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-sans text-base font-bold mt-0.5", children: triangulationStats.tooLong }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 542,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 538,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 520,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
      lineNumber: 441,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-xl p-4 bg-slate-950/20", id: "analytical_specs_card", children: [
      /* @__PURE__ */ jsxDEV("h3", { className: "font-mono text-[10px] font-bold text-slate-400 tracking-wider mb-3 uppercase flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 553,
          columnNumber: 11
        }, this),
        "LiDAR ios Coherence Checklist"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 552,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", id: "spec_distance_col", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Subject Distance" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 562,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `font-semibold ${isDistanceInBounds ? "text-emerald-400" : "text-amber-500"}`, children: [
              (metrics.distance * 100).toFixed(1),
              " cm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 563,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 561,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "h-1 bg-slate-900 rounded relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[25%] right-[55%] bg-emerald-500/20" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 568,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `absolute top-0 bottom-0 w-2 -ml-1 rounded ${isDistanceInBounds ? "bg-emerald-400" : "bg-amber-400"}`,
                style: { left: `${Math.min(100, Math.max(0, metrics.distance * 100))}%` }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                lineNumber: 569,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 567,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500", children: "Optimal depth range: ≤ 40cm" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 574,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 560,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", id: "spec_angles_col", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Y / P / R Orientation" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 582,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `font-semibold ${isRotationInBounds ? "text-emerald-400" : "text-amber-500"}`, children: isRotationInBounds ? "STABLE" : "OUT_OF_BOUNDS" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 583,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 581,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-1.5 text-[8px] font-mono text-slate-400 mt-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: isYawInBounds ? "text-emerald-400" : "text-amber-400", children: [
              "Y: ",
              metrics.yaw.toFixed(0),
              "°"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 588,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "|" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 589,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: isPitchInBounds ? "text-emerald-400" : "text-amber-400", children: [
              "P: ",
              metrics.pitch.toFixed(0),
              "°"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 590,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "|" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 591,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: isRollInBounds ? "text-emerald-400" : "text-amber-400", children: [
              "R: ",
              metrics.roll.toFixed(0),
              "°"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 592,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 587,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500", children: "Yaw/Pitch/Roll constraint: ±10.0°" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 594,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 580,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", id: "spec_quality_col", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Quality Index Score" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 602,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `font-semibold ${isQualityInBounds ? "text-emerald-400" : "text-amber-500"}`, children: [
              (metrics.qualityScore * 100).toFixed(0),
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 603,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 601,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "h-1 bg-slate-900 rounded relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[96%] right-0 bg-emerald-500/20" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 608,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `absolute top-0 bottom-0 rounded ${isQualityInBounds ? "bg-emerald-400" : "bg-amber-400"}`,
                style: { width: `${metrics.qualityScore * 100}%` }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
                lineNumber: 609,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 607,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500", children: "Minimum quality standard: ≥ 96%" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 614,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 600,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 557,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
      lineNumber: 551,
      columnNumber: 7
    }, this),
    isSandboxMode && /* @__PURE__ */ jsxDEV("div", { className: "border border-sky-800/60 rounded-xl p-4 bg-sky-950/10", id: "sandbox_override_box", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4 border-b border-sky-900/30 pb-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Sliders, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 627,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h4", { className: "font-mono text-xs font-bold tracking-wide text-sky-200 uppercase", children: "Hardware Sandbox Sliders (Manual Override)" }, void 0, false, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 628,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 626,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] bg-sky-900 text-sky-300 border border-sky-700 px-1.5 py-0.5 rounded uppercase tracking-wider", children: "SIMULATION CONTROLS" }, void 0, false, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 632,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 625,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4", id: "sandbox_sliders_grid", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Luma Brightness" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 642,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sky-400", children: metrics.luma }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 643,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 641,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "0",
              max: "255",
              value: metrics.luma,
              onChange: (e) => onSandboxMetricsChange({ luma: parseInt(e.target.value) }),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "sandbox_luma_slider"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 645,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 640,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Focus / Sharpness" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 659,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sky-400", children: metrics.sharpness.toFixed(2) }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 660,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 658,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "0.1",
              max: "1.0",
              step: "0.01",
              value: metrics.sharpness,
              onChange: (e) => onSandboxMetricsChange({ sharpness: parseFloat(e.target.value) }),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "sandbox_sharpness_slider"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 662,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 657,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Chromaticity Temperature" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 677,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sky-400", children: [
              metrics.cct,
              " K"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 678,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 676,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "3000",
              max: "10000",
              step: "100",
              value: metrics.cct,
              onChange: (e) => onSandboxMetricsChange({ cct: parseInt(e.target.value) }),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "sandbox_cct_slider"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 680,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 675,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Subject Distance (cm)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 695,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sky-400", children: [
              (metrics.distance * 100).toFixed(0),
              " cm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 696,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 694,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "0.10",
              max: "0.80",
              step: "0.01",
              value: metrics.distance,
              onChange: (e) => onSandboxMetricsChange({ distance: parseFloat(e.target.value) }),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "sandbox_distance_slider"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 698,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 693,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Face Angle (Yaw)" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 713,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sky-400", children: [
              metrics.yaw.toFixed(1),
              "°"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 714,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 712,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "-30",
              max: "30",
              step: "0.5",
              value: metrics.yaw,
              onChange: (e) => onSandboxMetricsChange({ yaw: parseFloat(e.target.value) }),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "sandbox_yaw_slider"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 716,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 711,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Frame Quality Score" }, void 0, false, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 731,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sky-400", children: [
              (metrics.qualityScore * 100).toFixed(0),
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 732,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
            lineNumber: 730,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "range",
              min: "0.50",
              max: "1.0",
              step: "0.01",
              value: metrics.qualityScore,
              onChange: (e) => onSandboxMetricsChange({ qualityScore: parseFloat(e.target.value) }),
              className: "w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-sky-400",
              id: "sandbox_quality_slider"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
              lineNumber: 734,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
          lineNumber: 729,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
        lineNumber: 637,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
      lineNumber: 624,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/DiagnosticConsole.tsx",
    lineNumber: 130,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpYWdub3N0aWNDb25zb2xlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDYWxpYnJhdGlvbk1ldHJpY3MsIExvY2tTdGF0ZSwgU2Vuc29yQ29uZmlnLCBMaXZlRmVlZGJhY2tTZXR0aW5ncyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IExvY2ssIFVubG9jaywgWmFwLCBTbGlkZXJzLCBTcGFya2xlcywgQ2hlY2tDaXJjbGUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgRGlhZ25vc3RpY0NvbnNvbGVQcm9wcyB7XG4gIG1ldHJpY3M6IENhbGlicmF0aW9uTWV0cmljcztcbiAgbG9ja3M6IExvY2tTdGF0ZTtcbiAgY29uZmlnOiBTZW5zb3JDb25maWc7XG4gIGlzU2FuZGJveE1vZGU6IGJvb2xlYW47XG4gIHNldElzU2FuZGJveE1vZGU6IChhY3RpdmU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9uU2FuZGJveE1ldHJpY3NDaGFuZ2U6IChtZXRyaWNzOiBQYXJ0aWFsPENhbGlicmF0aW9uTWV0cmljcz4pID0+IHZvaWQ7XG4gIGhpc3Rvcnk6IHsgbHVtYTogbnVtYmVyOyBzaGFycG5lc3M6IG51bWJlcjsgZGlzdGFuY2U6IG51bWJlcjsgY2N0OiBudW1iZXIgfVtdO1xuICBcbiAgLy8gVHJpYW5ndWxhdGlvbiBsaXZlIHN0YXRlXG4gIG1pblRyaWFuZ2xlQW5nbGU6IG51bWJlcjtcbiAgc2V0TWluVHJpYW5nbGVBbmdsZTogKHZhbDogbnVtYmVyKSA9PiB2b2lkO1xuICBtYXhUcmlhbmdsZUVkZ2VMZW5ndGg6IG51bWJlcjtcbiAgc2V0TWF4VHJpYW5nbGVFZGdlTGVuZ3RoOiAodmFsOiBudW1iZXIpID0+IHZvaWQ7XG4gIGVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbjogYm9vbGVhbjtcbiAgc2V0RW5mb3JjZURlbGF1bmF5Q29uZGl0aW9uOiAodmFsOiBib29sZWFuKSA9PiB2b2lkO1xuICB0cmlhbmd1bGF0aW9uU3RhdHM6IHsgdG90YWw6IG51bWJlcjsgc2tpbm55OiBudW1iZXI7IHRvb0xvbmc6IG51bWJlciB9O1xuXG4gIC8vIExpdmVGZWVkYmFjayAmIFNRTCBhZGRpdGlvbnNcbiAgc2NhblR5cGU6IHN0cmluZztcbiAgc2V0U2NhblR5cGU6ICh0eXBlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGxpdmVGZWVkYmFjazogTGl2ZUZlZWRiYWNrU2V0dGluZ3M7XG4gIHNldExpdmVGZWVkYmFjazogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248TGl2ZUZlZWRiYWNrU2V0dGluZ3M+Pjtcbn1cblxuZXhwb3J0IGNvbnN0IERpYWdub3N0aWNDb25zb2xlOiBSZWFjdC5GQzxEaWFnbm9zdGljQ29uc29sZVByb3BzPiA9ICh7XG4gIG1ldHJpY3MsXG4gIGxvY2tzLFxuICBjb25maWcsXG4gIGlzU2FuZGJveE1vZGUsXG4gIHNldElzU2FuZGJveE1vZGUsXG4gIG9uU2FuZGJveE1ldHJpY3NDaGFuZ2UsXG4gIGhpc3RvcnksXG4gIG1pblRyaWFuZ2xlQW5nbGUsXG4gIHNldE1pblRyaWFuZ2xlQW5nbGUsXG4gIG1heFRyaWFuZ2xlRWRnZUxlbmd0aCxcbiAgc2V0TWF4VHJpYW5nbGVFZGdlTGVuZ3RoLFxuICBlbmZvcmNlRGVsYXVuYXlDb25kaXRpb24sXG4gIHNldEVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbixcbiAgdHJpYW5ndWxhdGlvblN0YXRzLFxuICBzY2FuVHlwZSxcbiAgc2V0U2NhblR5cGUsXG4gIGxpdmVGZWVkYmFjayxcbiAgc2V0TGl2ZUZlZWRiYWNrLFxufSkgPT4ge1xuICAvLyBDaGVjayBib3VuZHMgYWdhaW5zdCBwcm90b2NvbCBzcGVjc1xuICBjb25zdCBpc0x1bWFJbkJvdW5kcyA9IG1ldHJpY3MubHVtYSA+PSA5MiAmJiBtZXRyaWNzLmx1bWEgPD0gMjEwO1xuICBjb25zdCBpc1NoYXJwbmVzc0luQm91bmRzID0gbWV0cmljcy5zaGFycG5lc3MgPj0gMC44O1xuICBjb25zdCBpc0NjdEluQm91bmRzID0gbWV0cmljcy5jY3QgPj0gNTAwMCAmJiBtZXRyaWNzLmNjdCA8PSA2ODAwO1xuXG4gIGNvbnN0IGlzRGlzdGFuY2VJbkJvdW5kcyA9IG1ldHJpY3MuZGlzdGFuY2UgPj0gMC4yNSAmJiBtZXRyaWNzLmRpc3RhbmNlIDw9IGNvbmZpZy5saWRhclByZWNpc2lvblJhbmdlO1xuICBjb25zdCBpc1lhd0luQm91bmRzID0gTWF0aC5hYnMobWV0cmljcy55YXcpIDw9IDEwLjA7XG4gIGNvbnN0IGlzUGl0Y2hJbkJvdW5kcyA9IE1hdGguYWJzKG1ldHJpY3MucGl0Y2gpIDw9IDEwLjA7XG4gIGNvbnN0IGlzUm9sbEluQm91bmRzID0gTWF0aC5hYnMobWV0cmljcy5yb2xsKSA8PSAxMC4wO1xuICBjb25zdCBpc1JvdGF0aW9uSW5Cb3VuZHMgPSBpc1lhd0luQm91bmRzICYmIGlzUGl0Y2hJbkJvdW5kcyAmJiBpc1JvbGxJbkJvdW5kcztcbiAgY29uc3QgaXNRdWFsaXR5SW5Cb3VuZHMgPSBtZXRyaWNzLnF1YWxpdHlTY29yZSA+PSBjb25maWcubWluUXVhbGl0eVNjb3JlO1xuXG4gIC8vIFJlbmRlciBhIG1pbmkgU1ZHIHNwYXJrbGluZSBmb3Igc2lnbmFsIGhpc3RvcnlcbiAgY29uc3QgcmVuZGVyU3BhcmtsaW5lID0gKFxuICAgIGRhdGE6IG51bWJlcltdLFxuICAgIG1pblZhbDogbnVtYmVyLFxuICAgIG1heFZhbDogbnVtYmVyLFxuICAgIGNvbG9yQ2xhc3M6IHN0cmluZyxcbiAgICBvcHRpbWFsTWluPzogbnVtYmVyLFxuICAgIG9wdGltYWxNYXg/OiBudW1iZXJcbiAgKSA9PiB7XG4gICAgaWYgKGRhdGEubGVuZ3RoIDwgMikgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qgd2lkdGggPSAxNjA7XG4gICAgY29uc3QgaGVpZ2h0ID0gMzA7XG4gICAgY29uc3QgcGFkZGluZyA9IDI7XG4gICAgXG4gICAgY29uc3QgcG9pbnRzID0gZGF0YS5tYXAoKHZhbCwgaWR4KSA9PiB7XG4gICAgICBjb25zdCB4ID0gKGlkeCAvIChkYXRhLmxlbmd0aCAtIDEpKSAqICh3aWR0aCAtIHBhZGRpbmcgKiAyKSArIHBhZGRpbmc7XG4gICAgICBjb25zdCByYW5nZSA9IG1heFZhbCAtIG1pblZhbCB8fCAxO1xuICAgICAgY29uc3QgeSA9IGhlaWdodCAtICgodmFsIC0gbWluVmFsKSAvIHJhbmdlKSAqIChoZWlnaHQgLSBwYWRkaW5nICogMikgLSBwYWRkaW5nO1xuICAgICAgcmV0dXJuIGAke3h9LCR7eX1gO1xuICAgIH0pLmpvaW4oJyAnKTtcblxuICAgIGxldCBvcHRpbWFsQmFuZCA9IG51bGw7XG4gICAgaWYgKG9wdGltYWxNaW4gIT09IHVuZGVmaW5lZCAmJiBvcHRpbWFsTWF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gbWF4VmFsIC0gbWluVmFsIHx8IDE7XG4gICAgICBjb25zdCB5TWluID0gaGVpZ2h0IC0gKChvcHRpbWFsTWF4IC0gbWluVmFsKSAvIHJhbmdlKSAqIChoZWlnaHQgLSBwYWRkaW5nICogMikgLSBwYWRkaW5nO1xuICAgICAgY29uc3QgeU1heCA9IGhlaWdodCAtICgob3B0aW1hbE1pbiAtIG1pblZhbCkgLyByYW5nZSkgKiAoaGVpZ2h0IC0gcGFkZGluZyAqIDIpIC0gcGFkZGluZztcbiAgICAgIG9wdGltYWxCYW5kID0gKFxuICAgICAgICA8cmVjdFxuICAgICAgICAgIHg9ezB9XG4gICAgICAgICAgeT17TWF0aC5tYXgocGFkZGluZywgeU1pbil9XG4gICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgIGhlaWdodD17TWF0aC5taW4oaGVpZ2h0IC0gcGFkZGluZyAqIDIsIHlNYXggLSB5TWluKX1cbiAgICAgICAgICBmaWxsPVwicmdiYSgxNiwgMTg1LCAxMjksIDAuMDgpXCJcbiAgICAgICAgICBzdHJva2U9XCJyZ2JhKDE2LCAxODUsIDEyOSwgMC4xNSlcIlxuICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMC41XCJcbiAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9XCIyLDJcIlxuICAgICAgICAgIGlkPVwib3B0aW1hbF9iYW5kX3JlY3RcIlxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHN2ZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9e2hlaWdodH0gdmlld0JveD17YDAgMCAke3dpZHRofSAke2hlaWdodH1gfSBjbGFzc05hbWU9XCJvdmVyZmxvdy12aXNpYmxlXCIgaWQ9XCJzcGFya2xpbmVfc3ZnXCI+XG4gICAgICAgIHtvcHRpbWFsQmFuZH1cbiAgICAgICAgPHBvbHlsaW5lXG4gICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgIHN0cm9rZT17Y29sb3JDbGFzc31cbiAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXG4gICAgICAgICAgcG9pbnRzPXtwb2ludHN9XG4gICAgICAgICAgaWQ9XCJzcGFya2xpbmVfcG9seWxpbmVcIlxuICAgICAgICAvPlxuICAgICAgICB7ZGF0YS5sZW5ndGggPiAwICYmICgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbGFzdElkeCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgICAgICBjb25zdCB4ID0gKGxhc3RJZHggLyAoZGF0YS5sZW5ndGggLSAxKSkgKiAod2lkdGggLSBwYWRkaW5nICogMikgKyBwYWRkaW5nO1xuICAgICAgICAgIGNvbnN0IHJhbmdlID0gbWF4VmFsIC0gbWluVmFsIHx8IDE7XG4gICAgICAgICAgY29uc3QgeSA9IGhlaWdodCAtICgoZGF0YVtsYXN0SWR4XSAtIG1pblZhbCkgLyByYW5nZSkgKiAoaGVpZ2h0IC0gcGFkZGluZyAqIDIpIC0gcGFkZGluZztcbiAgICAgICAgICByZXR1cm4gPGNpcmNsZSBjeD17eH0gY3k9e3l9IHI9XCIzXCIgZmlsbD17Y29sb3JDbGFzc30gY2xhc3NOYW1lPVwiYW5pbWF0ZS1wdWxzZVwiIGlkPVwic3BhcmtsaW5lX3B1bHNlX2RvdFwiIC8+O1xuICAgICAgICB9KSgpfVxuICAgICAgPC9zdmc+XG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtNFwiIGlkPVwiZGlhZ25vc3RpY19jb25zb2xlX3dyYXBwZXJcIj5cbiAgICAgIFxuICAgICAgey8qIENvbnRyb2wgcGFuZWwgaGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zXCIgaWQ9XCJoZWFkZXJfY29udHJvbF9yb3dcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICBGVVNJT04gTE9HSUMgQ09OVFJPTCBQTEFORVxuICAgICAgICAgIDwvaDI+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTYW5kYm94IE1vZGUgVG9nZ2xlICovfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgaWQ9XCJ0b2dnbGVfc2FuZGJveF9tb2RlX2J0blwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTYW5kYm94TW9kZSghaXNTYW5kYm94TW9kZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1tb25vIHRleHQtWzlweF0gcHgtMi41IHB5LTEgcm91bmRlZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBib3JkZXIgJHtcbiAgICAgICAgICAgIGlzU2FuZGJveE1vZGVcbiAgICAgICAgICAgICAgPyAnYmctc2t5LTk1MC80MCBib3JkZXItc2t5LTgwMCB0ZXh0LXNreS00MDAgaG92ZXI6Ymctc2t5LTk1MC82MCdcbiAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6Ymctc2xhdGUtODAwJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgPHNwYW4+e2lzU2FuZGJveE1vZGUgPyAnU1dJVENIIFRPIFdFQkNBTScgOiAnQUNUSVZBVEUgU0FOREJPWCd9PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogMjAwMG1zIFNUQUJJTElUWSBUSU1FIFBST0dSRVNTIEJBUiAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1zbGF0ZS04NTAgYmctc2xhdGUtOTUwLzQwIHJvdW5kZWQteGwgcC0zIGZsZXggZmxleC1jb2wgZ2FwLTJcIiBpZD1cInN0YWJpbGl0eV90cmFja2VyX2JveFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC1tb25vIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPkVER0UgQUkgQ09IRVJFTkNFIERXRUxMOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtYm9sZCAke21ldHJpY3Muc3RhYmlsaXR5TXMgPj0gMjAwMCA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LWFtYmVyLTQwMCd9YH0+XG4gICAgICAgICAgICAgIHttZXRyaWNzLnN0YWJpbGl0eU1zfSAvIHtjb25maWcuc3RhYmlsaXR5VGltZW91dE1zfSBtc1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICB7bWV0cmljcy5zdGFiaWxpdHlNcyA+PSAyMDAwID8gJ1NQRUMgTE9DSyBMT0NLRUQnIDogJ1NVQkpFQ1QgTVVTVCBIT0xEIFNUSUxMJ31cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC0yIGJnLXNsYXRlLTkwMCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2xhdGUtOTUwXCIgaWQ9XCJzdGFiaWxpdHlfcHJvZ3Jlc3NfY29udGFpbmVyXCI+XG4gICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtZnVsbCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMTAwICR7XG4gICAgICAgICAgICAgIG1ldHJpY3Muc3RhYmlsaXR5TXMgPj0gMjAwMCBcbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTUwMCBzaGFkb3ctWzBfMF84cHhfIzEwYjk4MV0nIFxuICAgICAgICAgICAgICAgIDogJ2JnLWFtYmVyLTQwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke01hdGgubWluKDEwMCwgKG1ldHJpY3Muc3RhYmlsaXR5TXMgLyBjb25maWcuc3RhYmlsaXR5VGltZW91dE1zKSAqIDEwMCl9JWAgfX1cbiAgICAgICAgICAgIGlkPVwic3RhYmlsaXR5X3Byb2dyZXNzX2JhclwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIExPQ0tTIE1BVFJJWDogMS4gRXhwb3N1cmUgKEx1bWEpICAyLiBGb2N1cyAoU2hhcnBuZXNzKSAgMy4gV2hpdGUgQmFsYW5jZSAoQ0NUKSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtM1wiIGlkPVwibG9ja3NfbWF0cml4X2dyaWRcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBFeHBvc3VyZSBMb2NrICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgIGxvY2tzLmV4cG9zdXJlID09PSAnTE9DS0VEJ1xuICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvMjAgYm9yZGVyLWVtZXJhbGQtODAwLzYwJ1xuICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzYwIGJvcmRlci1zbGF0ZS05MDAnXG4gICAgICAgIH1gfSBpZD1cImxvY2tfY29sX2V4cG9zdXJlXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPkVYUE9TVVJFIChMVU1BKTwvc3Bhbj5cbiAgICAgICAgICAgIHtsb2Nrcy5leHBvc3VyZSA9PT0gJ0xPQ0tFRCcgPyAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ubyB0ZXh0LVs4cHhdIGJnLWVtZXJhbGQtOTAwLzYwIHRleHQtZW1lcmFsZC00MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTcwMCBweC0xLjUgcHktMC41IHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+IExPQ0tFRFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LW1vbm8gdGV4dC1bOHB4XSBiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS01MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcHgtMS41IHB5LTAuNSByb3VuZGVkXCI+XG4gICAgICAgICAgICAgICAgPFVubG9jayBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+IFNDQU5OSU5HXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIGZsZXggaXRlbXMtYmFzZWxpbmUgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtbGcgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICB7bWV0cmljcy5sdW1hfSBMXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAoVGFyZ2V0OiAxNDIuMClcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiBoLTEgYmctc2xhdGUtOTAwIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW4gcmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgbGVmdC1bMzYlXSByaWdodC1bMTclXSBiZy1lbWVyYWxkLTUwMC8xMCBib3JkZXIteCBib3JkZXItZW1lcmFsZC01MDAvMjBcIiAvPlxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgdy0xIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgICBpc0x1bWFJbkJvdW5kcyA/ICdiZy1lbWVyYWxkLTUwMCcgOiAnYmctcmVkLTUwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6IGAke01hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgKG1ldHJpY3MubHVtYSAvIDI1NSkgKiAxMDApKX0lYCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAvNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctWzExMHB4XSBoLVsyNHB4XVwiPlxuICAgICAgICAgICAgICB7cmVuZGVyU3BhcmtsaW5lKGhpc3RvcnkubWFwKGggPT4gaC5sdW1hKSwgMCwgMjU1LCBpc0x1bWFJbkJvdW5kcyA/ICcjMTBiOTgxJyA6ICcjZjU5ZTBiJywgOTIsIDIxMCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwXCI+TFVNQSBTSUdOQUw8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGb2N1cyBMb2NrICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgIGxvY2tzLmZvY3VzID09PSAnTE9DS0VEJ1xuICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvMjAgYm9yZGVyLWVtZXJhbGQtODAwLzYwJ1xuICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzYwIGJvcmRlci1zbGF0ZS05MDAnXG4gICAgICAgIH1gfSBpZD1cImxvY2tfY29sX2ZvY3VzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPkZPQ1VTIChTSEFSUE5FU1MpPC9zcGFuPlxuICAgICAgICAgICAge2xvY2tzLmZvY3VzID09PSAnTE9DS0VEJyA/IChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZm9udC1tb25vIHRleHQtWzhweF0gYmctZW1lcmFsZC05MDAvNjAgdGV4dC1lbWVyYWxkLTQwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwIHB4LTEuNSBweS0wLjUgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz4gTE9DS0VEXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ubyB0ZXh0LVs4cHhdIGJnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTUwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBweC0xLjUgcHktMC41IHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICA8VW5sb2NrIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz4gU0NBTk5JTkdcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgZmxleCBpdGVtcy1iYXNlbGluZSBnYXAtMS41XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgIHttZXRyaWNzLnNoYXJwbmVzcy50b0ZpeGVkKDIpfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgKFRhcmdldDog4omlIDAuODApXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgaC0xIGJnLXNsYXRlLTkwMCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGJvdHRvbS0wIGxlZnQtWzgwJV0gcmlnaHQtMCBiZy1lbWVyYWxkLTUwMC8xMCBib3JkZXItbCBib3JkZXItZW1lcmFsZC01MDAvMjBcIiAvPlxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgdy0xIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgICBpc1NoYXJwbmVzc0luQm91bmRzID8gJ2JnLWVtZXJhbGQtNTAwJyA6ICdiZy1yZWQtNTAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogYCR7TWF0aC5taW4oMTAwLCBNYXRoLm1heCgwLCBtZXRyaWNzLnNoYXJwbmVzcyAqIDEwMCkpfSVgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMC81MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1bMTEwcHhdIGgtWzI0cHhdXCI+XG4gICAgICAgICAgICAgIHtyZW5kZXJTcGFya2xpbmUoaGlzdG9yeS5tYXAoaCA9PiBoLnNoYXJwbmVzcyksIDAsIDEuMCwgaXNTaGFycG5lc3NJbkJvdW5kcyA/ICcjMTBiOTgxJyA6ICcjZjU5ZTBiJywgMC44LCAxLjApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMFwiPkZPQ1VTIE1BVFJJWDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFdoaXRlIEJhbGFuY2UgTG9jayAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICBsb2Nrcy53aGl0ZUJhbGFuY2UgPT09ICdMT0NLRUQnXG4gICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC8yMCBib3JkZXItZW1lcmFsZC04MDAvNjAnXG4gICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTkwMCdcbiAgICAgICAgfWB9IGlkPVwibG9ja19jb2xfY2N0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPkNDVCAoV0hJVEUgQkFMQU5DRSk8L3NwYW4+XG4gICAgICAgICAgICB7bG9ja3Mud2hpdGVCYWxhbmNlID09PSAnTE9DS0VEJyA/IChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZm9udC1tb25vIHRleHQtWzhweF0gYmctZW1lcmFsZC05MDAvNjAgdGV4dC1lbWVyYWxkLTQwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwIHB4LTEuNSBweS0wLjUgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz4gTE9DS0VEXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ubyB0ZXh0LVs4cHhdIGJnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTUwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBweC0xLjUgcHktMC41IHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICA8VW5sb2NrIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz4gU0NBTk5JTkdcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgZmxleCBpdGVtcy1iYXNlbGluZSBnYXAtMS41XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgIHttZXRyaWNzLmNjdH0gS1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgKDUwMDDigJM2ODAwIEspXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgaC0xIGJnLXNsYXRlLTkwMCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGJvdHRvbS0wIGxlZnQtWzI4JV0gcmlnaHQtWzQwJV0gYmctZW1lcmFsZC01MDAvMTAgYm9yZGVyLXggYm9yZGVyLWVtZXJhbGQtNTAwLzIwXCIgLz5cbiAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC0wIGJvdHRvbS0wIHctMSByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgICAgICAgaXNDY3RJbkJvdW5kcyA/ICdiZy1lbWVyYWxkLTUwMCcgOiAnYmctcmVkLTUwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6IGAke01hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgKChtZXRyaWNzLmNjdCAtIDMwMDApIC8gNzAwMCkgKiAxMDApKX0lYCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAvNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctWzExMHB4XSBoLVsyNHB4XVwiPlxuICAgICAgICAgICAgICB7cmVuZGVyU3BhcmtsaW5lKGhpc3RvcnkubWFwKGggPT4gaC5jY3QpLCAzMDAwLCAxMDAwMCwgaXNDY3RJbkJvdW5kcyA/ICcjMTBiOTgxJyA6ICcjZjU5ZTBiJywgNTAwMCwgNjgwMCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwXCI+Q0NUIEFDQ1VSQUNZPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBMSVZFIEZFRURCQUNLIFBST1RPQ09MIENPTkZJR1VSQVRJT04gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IGJnLXNsYXRlLTk1MC81MFwiIGlkPVwibGl2ZV9mZWVkYmFja19wcm90b2NvbF9jYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgcGItMiBtYi0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1za3ktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5MSVZFIEZFRURCQUNLIFBST1RPQ09MIChDTEFTUyBTdGFuZGFyZCk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICBBY3RpdmUgU3BlYyBUdW5pbmdcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtNFwiIGlkPVwibGl2ZV9mZWVkYmFja19wcm90b2NvbF9pbnB1dHNcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogU2NhbiBUeXBlIFNlbGVjdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPkFDVElWRSBTQ0FOX1RZUEUgVEFSR0VUPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2NhblR5cGUoJ2Nob21pa2lfdHdhcnonKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LW1vbm8gdGV4dC1bOXB4XSBweS0xLjUgcHgtMiByb3VuZGVkIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgc2NhblR5cGUgPT09ICdjaG9taWtpX3R3YXJ6J1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC80MCBib3JkZXItZW1lcmFsZC01MDAgdGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC82MCBib3JkZXItc2xhdGUtODUwIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQ0hPTUlLSV9UV0FSWiAoRmFjZSlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTY2FuVHlwZSgnb3BvbmthX2JyenVjaCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHB5LTEuNSBweC0yIHJvdW5kZWQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBzY2FuVHlwZSA9PT0gJ29wb25rYV9icnp1Y2gnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC80MCBib3JkZXItYW1iZXItNTAwIHRleHQtYW1iZXItNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzYwIGJvcmRlci1zbGF0ZS04NTAgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBPUE9OS0FfQlJaVUNIIChCZWxseSlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDb250aW51b3VzIFNjYW5uaW5nICYgRnJlcXVlbmN5IEh6ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgIDxzcGFuPlNDQU5OSU5HIFJBVEUgRlJFUVVFTkNZPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDAgZm9udC1ib2xkXCI+e2xpdmVGZWVkYmFjay51cGRhdGVGcmVxdWVuY3lIei50b0ZpeGVkKDEpfSBIejwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgIG1pbj1cIjEwLjBcIlxuICAgICAgICAgICAgICBtYXg9XCI2MC4wXCJcbiAgICAgICAgICAgICAgc3RlcD1cIjUuMFwiXG4gICAgICAgICAgICAgIHZhbHVlPXtsaXZlRmVlZGJhY2sudXBkYXRlRnJlcXVlbmN5SHp9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TGl2ZUZlZWRiYWNrKHByZXYgPT4gKHsgLi4ucHJldiwgdXBkYXRlRnJlcXVlbmN5SHo6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpIH0pKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtMSBiZy1zbGF0ZS04MDAgcm91bmRlZCBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXIgYWNjZW50LXNreS00MDBcIlxuICAgICAgICAgICAgICBpZD1cInVwZGF0ZV9mcmVxdWVuY3lfc2xpZGVyXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuPjEwIEh6IChMb3cpPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS01MDAgZm9udC1ib2xkIGZvbnQtbW9ub1wiPjMwIEh6IFByb3RvY29sPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj42MCBIeiAoTWF4KTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFRvZ2dsZSBTd2l0Y2hlcyBDb2x1bW4gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIGdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTIuNSBwdC0xLjUgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgey8qIENvbnRpbnVvdXMgU2Nhbm5pbmcgVG9nZ2xlICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TGl2ZUZlZWRiYWNrKHByZXYgPT4gKHsgLi4ucHJldiwgY29udGludW91c1NjYW5uaW5nOiAhcHJldi5jb250aW51b3VzU2Nhbm5pbmcgfSkpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LW1vbm8gdGV4dC1bOHB4XSBwLTIgcm91bmRlZCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTEgJHtcbiAgICAgICAgICAgICAgICBsaXZlRmVlZGJhY2suY29udGludW91c1NjYW5uaW5nXG4gICAgICAgICAgICAgICAgICA/ICdiZy1za3ktOTUwLzQwIGJvcmRlci1za3ktODAwIHRleHQtc2t5LTQwMCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC82MCBib3JkZXItc2xhdGUtODUwIHRleHQtc2xhdGUtNTAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMCBibG9jayB1cHBlcmNhc2UgZm9udC1ib2xkXCI+Q29udGludW91cyBTY2FuPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj57bGl2ZUZlZWRiYWNrLmNvbnRpbnVvdXNTY2FubmluZyA/ICdBQ1RJVkUgTE9PUCcgOiAnU1VTUEVOREVEJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFNob3cgTGl2ZSBNZXNoIFRvZ2dsZSAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldExpdmVGZWVkYmFjayhwcmV2ID0+ICh7IC4uLnByZXYsIHNob3dMaXZlTWVzaDogIXByZXYuc2hvd0xpdmVNZXNoIH0pKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1tb25vIHRleHQtWzhweF0gcC0yIHJvdW5kZWQgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0xICR7XG4gICAgICAgICAgICAgICAgbGl2ZUZlZWRiYWNrLnNob3dMaXZlTWVzaFxuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvNDAgYm9yZGVyLWVtZXJhbGQtODAwIHRleHQtZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNjAgYm9yZGVyLXNsYXRlLTg1MCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2sgdXBwZXJjYXNlIGZvbnQtYm9sZFwiPlNob3cgV2lyZWZyYW1lPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj57bGl2ZUZlZWRiYWNrLnNob3dMaXZlTWVzaCA/ICdSRU5ERVJJTkcnIDogJ1NVU1BFTkRFRCd9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBTaG93IFJlYWwtdGltZSBNZXRyaWNzIFRvZ2dsZSAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldExpdmVGZWVkYmFjayhwcmV2ID0+ICh7IC4uLnByZXYsIHNob3dSZWFsVGltZU1ldHJpY3M6ICFwcmV2LnNob3dSZWFsVGltZU1ldHJpY3MgfSkpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LW1vbm8gdGV4dC1bOHB4XSBwLTIgcm91bmRlZCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTEgJHtcbiAgICAgICAgICAgICAgICBsaXZlRmVlZGJhY2suc2hvd1JlYWxUaW1lTWV0cmljc1xuICAgICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTk1MC80MCBib3JkZXItaW5kaWdvLTgwMCB0ZXh0LWluZGlnby00MDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNjAgYm9yZGVyLXNsYXRlLTg1MCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2sgdXBwZXJjYXNlIGZvbnQtYm9sZFwiPk1ldHJpY3MgT3ZlcmxheTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+e2xpdmVGZWVkYmFjay5zaG93UmVhbFRpbWVNZXRyaWNzID8gJ1ZJU0lCTEUgSFVEJyA6ICdISURERU4gSFVEJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogREVMQVVOQVkgVFJJQU5HVUxBVElPTiBGSUxURVIgQ09OVFJPTExFUiAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgYmctc2xhdGUtOTUwLzQwXCIgaWQ9XCJ0cmlhbmd1bGF0aW9uX3BhcmFtZXRlcnNfYm94XCI+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIHRyYWNraW5nLXdpZGVyIG1iLTMgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICBMaURBUiBGVVNJT04gJiBERUxBVU5BWSBUUklBTkdVTEFUSU9OIE1FVFJJQ1NcbiAgICAgICAgPC9oMz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTRcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogU2xpZGVyIDE6IG1pblRyaWFuZ2xlQW5nbGUgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xXCIgaWQ9XCJmaWx0ZXJfY29sX2FuZ2xlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmb250LW1vbm8gdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5NaW4gVHJpYW5nbGUgQW5nbGU8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNreS00MDBcIj57bWluVHJpYW5nbGVBbmdsZS50b0ZpeGVkKDEpfcKwPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgbWluPVwiMTUuMFwiXG4gICAgICAgICAgICAgIG1heD1cIjQ1LjBcIlxuICAgICAgICAgICAgICBzdGVwPVwiMS4wXCJcbiAgICAgICAgICAgICAgdmFsdWU9e21pblRyaWFuZ2xlQW5nbGV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TWluVHJpYW5nbGVBbmdsZShwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTEgYmctc2xhdGUtODAwIHJvdW5kZWQgYXBwZWFyYW5jZS1ub25lIGN1cnNvci1wb2ludGVyIGFjY2VudC1za3ktNDAwXCJcbiAgICAgICAgICAgICAgaWQ9XCJhbmdsZV9maWx0ZXJfcmFuZ2VcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgbXQtMVwiPlxuICAgICAgICAgICAgICA8c3Bhbj4xNcKwIChMb29zZSk8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTUwMCBmb250LWJvbGRcIj4zMMKwIFNwZWM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPjQ1wrAgKFN0cmljdCk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTbGlkZXIgMjogbWF4VHJpYW5nbGVFZGdlTGVuZ3RoICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMVwiIGlkPVwiZmlsdGVyX2NvbF9sZW5ndGhcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPk1heCBFZGdlIExlbmd0aCAobW0pPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1za3ktNDAwXCI+e21heFRyaWFuZ2xlRWRnZUxlbmd0aC50b0ZpeGVkKDEpfSBtbTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgIG1pbj1cIjIuMFwiXG4gICAgICAgICAgICAgIG1heD1cIjEwLjBcIlxuICAgICAgICAgICAgICBzdGVwPVwiMC41XCJcbiAgICAgICAgICAgICAgdmFsdWU9e21heFRyaWFuZ2xlRWRnZUxlbmd0aH1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRNYXhUcmlhbmdsZUVkZ2VMZW5ndGgocGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xIGJnLXNsYXRlLTgwMCByb3VuZGVkIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlciBhY2NlbnQtc2t5LTQwMFwiXG4gICAgICAgICAgICAgIGlkPVwiZWRnZV9sZW5ndGhfZmlsdGVyX3JhbmdlXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIG10LTFcIj5cbiAgICAgICAgICAgICAgPHNwYW4+Mi4wbW0gKFRpZ2h0KTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1za3ktNTAwIGZvbnQtYm9sZFwiPjUuMG1tIFNwZWM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPjEwLjBtbSAoV2lkZSk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBUb2dnbGU6IGVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1sIGJvcmRlci1zbGF0ZS05MDAgcGwtNFwiIGlkPVwiZmlsdGVyX2NvbF9kZWxhdW5heV90b2dnbGVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPkRlbGF1bmF5IEluQ2lyY2xlIENvbnN0cmFpbnQ8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtdC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMFwiPkFjdGl2ZSBUZXN0IEhpZ2hsaWdodDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGlkPVwidG9nZ2xlX2RlbGF1bmF5X2NvbmRpdGlvbl9idG5cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbighZW5mb3JjZURlbGF1bmF5Q29uZGl0aW9uKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgcHgtMiBweS0xIHJvdW5kZWQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBlbmZvcmNlRGVsYXVuYXlDb25kaXRpb24gXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS05NTAvNDAgYm9yZGVyLXNreS04MDAgdGV4dC1za3ktNDAwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtlbmZvcmNlRGVsYXVuYXlDb25kaXRpb24gPyAnQUNUSVZFIENJUkNVTUNJUkNMRScgOiAnRElTQUJMRUQnfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgbXQtMS41XCI+XG4gICAgICAgICAgICAgIEhpZ2hsaWdodCBjaXJjdW1jaXJjbGUgb24gaG92ZXIuXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFRSSUFOR1VMQVRJT04gTElWRSBERUZFQ1QgUkVQT1JUICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtOTAwIGdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTIgdGV4dC1jZW50ZXJcIiBpZD1cImRlZmVjdF9yZXBvcnRfZ3JpZFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQgcC0yXCIgaWQ9XCJyZXBvcnRfdG90YWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDBcIj5UT1RBTCBUUklBTkdMRVM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1zbGF0ZS0yMDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgIHt0cmlhbmd1bGF0aW9uU3RhdHMudG90YWx9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYmctc2xhdGUtOTUwLzgwIGJvcmRlciByb3VuZGVkIHAtMiB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgdHJpYW5ndWxhdGlvblN0YXRzLnNraW5ueSA+IDAgPyAnYm9yZGVyLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTQwMCcgOiAnYm9yZGVyLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICB9YH0gaWQ9XCJyZXBvcnRfc2tpbm55XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwXCI+U0tJTk5ZIERFVklBVElPTlM8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtYmFzZSBmb250LWJvbGQgbXQtMC41XCI+XG4gICAgICAgICAgICAgIHt0cmlhbmd1bGF0aW9uU3RhdHMuc2tpbm55fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGJnLXNsYXRlLTk1MC84MCBib3JkZXIgcm91bmRlZCBwLTIgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgIHRyaWFuZ3VsYXRpb25TdGF0cy50b29Mb25nID4gMCA/ICdib3JkZXItcmVkLTk1MCB0ZXh0LXJlZC00MDAnIDogJ2JvcmRlci1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgfWB9IGlkPVwicmVwb3J0X3Rvb19sb25nXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwXCI+RURHRSBMSU1JVCBPVkVSRkxPV1M8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtYmFzZSBmb250LWJvbGQgbXQtMC41XCI+XG4gICAgICAgICAgICAgIHt0cmlhbmd1bGF0aW9uU3RhdHMudG9vTG9uZ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBBTkFMWVRJQ0FMIFJFUVVJUkVNRU5UUyAoTGlEQVIgJiBIZWFkIENvbnN0cmFpbnRzKSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgcm91bmRlZC14bCBwLTQgYmctc2xhdGUtOTUwLzIwXCIgaWQ9XCJhbmFseXRpY2FsX3NwZWNzX2NhcmRcIj5cbiAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1zbGF0ZS00MDAgdHJhY2tpbmctd2lkZXIgbWItMyB1cHBlcmNhc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgIDxDaGVja0NpcmNsZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICBMaURBUiBpb3MgQ29oZXJlbmNlIENoZWNrbGlzdFxuICAgICAgICA8L2gzPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBUYXJnZXQgRGlzdGFuY2UgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xXCIgaWQ9XCJzcGVjX2Rpc3RhbmNlX2NvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+U3ViamVjdCBEaXN0YW5jZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1zZW1pYm9sZCAke2lzRGlzdGFuY2VJbkJvdW5kcyA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LWFtYmVyLTUwMCd9YH0+XG4gICAgICAgICAgICAgICAgeyhtZXRyaWNzLmRpc3RhbmNlICogMTAwKS50b0ZpeGVkKDEpfSBjbVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC0xIGJnLXNsYXRlLTkwMCByb3VuZGVkIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgbGVmdC1bMjUlXSByaWdodC1bNTUlXSBiZy1lbWVyYWxkLTUwMC8yMFwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgdy0yIC1tbC0xIHJvdW5kZWQgJHtpc0Rpc3RhbmNlSW5Cb3VuZHMgPyAnYmctZW1lcmFsZC00MDAnIDogJ2JnLWFtYmVyLTQwMCd9YH1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyBsZWZ0OiBgJHtNYXRoLm1pbigxMDAsIE1hdGgubWF4KDAsIChtZXRyaWNzLmRpc3RhbmNlICogMTAwKSkpfSVgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIE9wdGltYWwgZGVwdGggcmFuZ2U6IOKJpCA0MGNtXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogSGVhZCBSb3RhdGlvbnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xXCIgaWQ9XCJzcGVjX2FuZ2xlc19jb2xcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPlkgLyBQIC8gUiBPcmllbnRhdGlvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1zZW1pYm9sZCAke2lzUm90YXRpb25JbkJvdW5kcyA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LWFtYmVyLTUwMCd9YH0+XG4gICAgICAgICAgICAgICAge2lzUm90YXRpb25JbkJvdW5kcyA/ICdTVEFCTEUnIDogJ09VVF9PRl9CT1VORFMnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMS41IHRleHQtWzhweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIG10LTFcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpc1lhd0luQm91bmRzID8gJ3RleHQtZW1lcmFsZC00MDAnIDogJ3RleHQtYW1iZXItNDAwJ30+WToge21ldHJpY3MueWF3LnRvRml4ZWQoMCl9wrA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPnw8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aXNQaXRjaEluQm91bmRzID8gJ3RleHQtZW1lcmFsZC00MDAnIDogJ3RleHQtYW1iZXItNDAwJ30+UDoge21ldHJpY3MucGl0Y2gudG9GaXhlZCgwKX3CsDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+fDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpc1JvbGxJbkJvdW5kcyA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LWFtYmVyLTQwMCd9PlI6IHttZXRyaWNzLnJvbGwudG9GaXhlZCgwKX3CsDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgWWF3L1BpdGNoL1JvbGwgY29uc3RyYWludDogwrExMC4wwrBcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBRdWFsaXR5IFNjb3JlICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMVwiIGlkPVwic3BlY19xdWFsaXR5X2NvbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+UXVhbGl0eSBJbmRleCBTY29yZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1zZW1pYm9sZCAke2lzUXVhbGl0eUluQm91bmRzID8gJ3RleHQtZW1lcmFsZC00MDAnIDogJ3RleHQtYW1iZXItNTAwJ31gfT5cbiAgICAgICAgICAgICAgICB7KG1ldHJpY3MucXVhbGl0eVNjb3JlICogMTAwKS50b0ZpeGVkKDApfSVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMSBiZy1zbGF0ZS05MDAgcm91bmRlZCByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGJvdHRvbS0wIGxlZnQtWzk2JV0gcmlnaHQtMCBiZy1lbWVyYWxkLTUwMC8yMFwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgcm91bmRlZCAke2lzUXVhbGl0eUluQm91bmRzID8gJ2JnLWVtZXJhbGQtNDAwJyA6ICdiZy1hbWJlci00MDAnfWB9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke21ldHJpY3MucXVhbGl0eVNjb3JlICogMTAwfSVgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIE1pbmltdW0gcXVhbGl0eSBzdGFuZGFyZDog4omlIDk2JVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBTQU5EQk9YIENPTlRST0xMRVIgUEFORUwgKE9OTFkgUkVOREVSRUQgSU4gU0FOREJPWCBNT0RFKSAqL31cbiAgICAgIHtpc1NhbmRib3hNb2RlICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgYm9yZGVyLXNreS04MDAvNjAgcm91bmRlZC14bCBwLTQgYmctc2t5LTk1MC8xMFwiIGlkPVwic2FuZGJveF9vdmVycmlkZV9ib3hcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00IGJvcmRlci1iIGJvcmRlci1za3ktOTAwLzMwIHBiLTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIHRyYWNraW5nLXdpZGUgdGV4dC1za3ktMjAwIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgIEhhcmR3YXJlIFNhbmRib3ggU2xpZGVycyAoTWFudWFsIE92ZXJyaWRlKVxuICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSBiZy1za3ktOTAwIHRleHQtc2t5LTMwMCBib3JkZXIgYm9yZGVyLXNreS03MDAgcHgtMS41IHB5LTAuNSByb3VuZGVkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICBTSU1VTEFUSU9OIENPTlRST0xTXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLXgtNiBnYXAteS00XCIgaWQ9XCJzYW5kYm94X3NsaWRlcnNfZ3JpZFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogTHVtYSBTbGlkZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5MdW1hIEJyaWdodG5lc3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2t5LTQwMFwiPnttZXRyaWNzLmx1bWF9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIyNTVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXttZXRyaWNzLmx1bWF9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblNhbmRib3hNZXRyaWNzQ2hhbmdlKHsgbHVtYTogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTEgYmctc2xhdGUtODAwIHJvdW5kZWQgYXBwZWFyYW5jZS1ub25lIGN1cnNvci1wb2ludGVyIGFjY2VudC1za3ktNDAwXCJcbiAgICAgICAgICAgICAgICBpZD1cInNhbmRib3hfbHVtYV9zbGlkZXJcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBGb2N1cyBTbGlkZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5Gb2N1cyAvIFNoYXJwbmVzczwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1za3ktNDAwXCI+e21ldHJpY3Muc2hhcnBuZXNzLnRvRml4ZWQoMil9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICBtaW49XCIwLjFcIlxuICAgICAgICAgICAgICAgIG1heD1cIjEuMFwiXG4gICAgICAgICAgICAgICAgc3RlcD1cIjAuMDFcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXttZXRyaWNzLnNoYXJwbmVzc31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uU2FuZGJveE1ldHJpY3NDaGFuZ2UoeyBzaGFycG5lc3M6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTEgYmctc2xhdGUtODAwIHJvdW5kZWQgYXBwZWFyYW5jZS1ub25lIGN1cnNvci1wb2ludGVyIGFjY2VudC1za3ktNDAwXCJcbiAgICAgICAgICAgICAgICBpZD1cInNhbmRib3hfc2hhcnBuZXNzX3NsaWRlclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIENDVCBTbGlkZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5DaHJvbWF0aWNpdHkgVGVtcGVyYXR1cmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2t5LTQwMFwiPnttZXRyaWNzLmNjdH0gSzwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgbWluPVwiMzAwMFwiXG4gICAgICAgICAgICAgICAgbWF4PVwiMTAwMDBcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCIxMDBcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXttZXRyaWNzLmNjdH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uU2FuZGJveE1ldHJpY3NDaGFuZ2UoeyBjY3Q6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSB9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xIGJnLXNsYXRlLTgwMCByb3VuZGVkIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlciBhY2NlbnQtc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgaWQ9XCJzYW5kYm94X2NjdF9zbGlkZXJcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBEaXN0YW5jZSBTbGlkZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5TdWJqZWN0IERpc3RhbmNlIChjbSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2t5LTQwMFwiPnsobWV0cmljcy5kaXN0YW5jZSAqIDEwMCkudG9GaXhlZCgwKX0gY208L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjAuMTBcIlxuICAgICAgICAgICAgICAgIG1heD1cIjAuODBcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjAxXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17bWV0cmljcy5kaXN0YW5jZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uU2FuZGJveE1ldHJpY3NDaGFuZ2UoeyBkaXN0YW5jZTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgfSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtMSBiZy1zbGF0ZS04MDAgcm91bmRlZCBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXIgYWNjZW50LXNreS00MDBcIlxuICAgICAgICAgICAgICAgIGlkPVwic2FuZGJveF9kaXN0YW5jZV9zbGlkZXJcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBZYXcgU2xpZGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+RmFjZSBBbmdsZSAoWWF3KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1za3ktNDAwXCI+e21ldHJpY3MueWF3LnRvRml4ZWQoMSl9wrA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIi0zMFwiXG4gICAgICAgICAgICAgICAgbWF4PVwiMzBcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXttZXRyaWNzLnlhd31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uU2FuZGJveE1ldHJpY3NDaGFuZ2UoeyB5YXc6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpIH0pfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTEgYmctc2xhdGUtODAwIHJvdW5kZWQgYXBwZWFyYW5jZS1ub25lIGN1cnNvci1wb2ludGVyIGFjY2VudC1za3ktNDAwXCJcbiAgICAgICAgICAgICAgICBpZD1cInNhbmRib3hfeWF3X3NsaWRlclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFF1YWxpdHkgU2NvcmUgU2xpZGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0xXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+RnJhbWUgUXVhbGl0eSBTY29yZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1za3ktNDAwXCI+eyhtZXRyaWNzLnF1YWxpdHlTY29yZSAqIDEwMCkudG9GaXhlZCgwKX0lPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICBtaW49XCIwLjUwXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIxLjBcIlxuICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjAxXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17bWV0cmljcy5xdWFsaXR5U2NvcmV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblNhbmRib3hNZXRyaWNzQ2hhbmdlKHsgcXVhbGl0eVNjb3JlOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSB9KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xIGJnLXNsYXRlLTgwMCByb3VuZGVkIGFwcGVhcmFuY2Utbm9uZSBjdXJzb3ItcG9pbnRlciBhY2NlbnQtc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgaWQ9XCJzYW5kYm94X3F1YWxpdHlfc2xpZGVyXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTZGUTtBQTdGUjtBQUFBO0FBQUE7QUFBQTtBQU9BLFNBQVMsTUFBTSxRQUFRLEtBQUssU0FBUyxVQUFVLG1CQUFtQjtBQTJCM0QsYUFBTSxvQkFBc0QsQ0FBQztBQUFBLEVBQ2xFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBRUosUUFBTSxpQkFBaUIsUUFBUSxRQUFRLE1BQU0sUUFBUSxRQUFRO0FBQzdELFFBQU0sc0JBQXNCLFFBQVEsYUFBYTtBQUNqRCxRQUFNLGdCQUFnQixRQUFRLE9BQU8sT0FBUSxRQUFRLE9BQU87QUFFNUQsUUFBTSxxQkFBcUIsUUFBUSxZQUFZLFFBQVEsUUFBUSxZQUFZLE9BQU87QUFDbEYsUUFBTSxnQkFBZ0IsS0FBSyxJQUFJLFFBQVEsR0FBRyxLQUFLO0FBQy9DLFFBQU0sa0JBQWtCLEtBQUssSUFBSSxRQUFRLEtBQUssS0FBSztBQUNuRCxRQUFNLGlCQUFpQixLQUFLLElBQUksUUFBUSxJQUFJLEtBQUs7QUFDakQsUUFBTSxxQkFBcUIsaUJBQWlCLG1CQUFtQjtBQUMvRCxRQUFNLG9CQUFvQixRQUFRLGdCQUFnQixPQUFPO0FBR3pELFFBQU0sa0JBQWtCLENBQ3RCLE1BQ0EsUUFDQSxRQUNBLFlBQ0EsWUFDQSxlQUNHO0FBQ0gsUUFBSSxLQUFLLFNBQVMsRUFBRyxRQUFPO0FBQzVCLFVBQU0sUUFBUTtB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