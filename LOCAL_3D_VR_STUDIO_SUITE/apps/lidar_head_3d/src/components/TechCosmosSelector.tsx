import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { ThreeDHeadVisualizer } from "/apps/lidar_head_3d/src/components/ThreeDHeadVisualizer.tsx";
import {
  Activity,
  Sparkles,
  Compass,
  Orbit,
  ChevronRight,
  Workflow
} from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
import { motion, AnimatePresence } from "/apps/lidar_head_3d/node_modules/.vite/deps/motion_react.js?v=01c14a81";
export const TechCosmosSelector = ({
  metrics,
  scanType,
  setScanType,
  onInitiateScan,
  triangulationStats,
  setTriangulationStats
}) => {
  const [isRotating, setIsRotating] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomProgress, setZoomProgress] = useState(0);
  useEffect(() => {
    let interval;
    if (isRotating) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 1.2) % 360);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isRotating]);
  const handleStartProtocol = () => {
    setIsZooming(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setZoomProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        onInitiateScan();
      }
    }, 80);
  };
  const simulatedYaw = metrics.yaw + Math.sin(rotationAngle * Math.PI / 180) * 12;
  const simulatedPitch = metrics.pitch + Math.cos(rotationAngle * Math.PI / 180) * 8;
  const simulatedRoll = metrics.roll + Math.sin((rotationAngle + 45) * Math.PI / 180) * 4;
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-[85vh] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden", id: "tech_cosmos_container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-slate-950 pointer-events-none z-0", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,#020617_1px,transparent_1px),linear-gradient(to_bottom,#020617_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" }, void 0, false, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#0d9488,transparent)] opacity-[0.08]" }, void 0, false, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_800px_at_0%_600px,#0284c7,transparent)] opacity-[0.08]" }, void 0, false, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 85,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-sky-500/10 rounded-full animate-pulse pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-teal-500/5 rounded-full pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 89,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-dashed border-sky-500/5 rounded-full pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 90,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
      lineNumber: 81,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10", id: "tech_cosmos_content_grid", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1", id: "cosmos_parameters_panel", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "border border-sky-950 bg-slate-950/80 backdrop-blur-md rounded-xl p-4 shadow-xl", id: "system_telemetry_box", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 border-b border-slate-900 pb-2 mb-3", children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-sky-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 100,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] font-bold text-sky-400 uppercase tracking-widest", children: "SYSTEM TELEMETRY" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 101,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 99,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2.5 font-mono text-[9px] text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-900/40 p-1.5 rounded", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "SYSTEM STATUS:" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 108,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 110,
                  columnNumber: 19
                }, this),
                "ONLINE"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 109,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-900/40 p-1.5 rounded", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "STABILNOŚĆ LiDAR:" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 115,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold", children: "98.4% LOCKED" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 116,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 114,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-900/40 p-1.5 rounded", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "LIDAR RESOLUTION:" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 119,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 font-bold", children: "256 x 192 px" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 120,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 118,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-900/40 p-1.5 rounded", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "ACTIVE POINTS:" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 123,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-teal-400 font-bold", children: "12,400 PTS" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 124,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 122,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-900/40 p-1.5 rounded", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "DWELL THRESHOLD:" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 127,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "2000 ms" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 128,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 126,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 106,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
          lineNumber: 98,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 bg-slate-950/60 rounded-xl p-4 shadow-lg", id: "geometric_constraints_box", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 border-b border-slate-900 pb-2 mb-2.5", children: [
            /* @__PURE__ */ jsxDEV(Compass, { className: "w-4 h-4 text-teal-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 135,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] font-bold text-slate-300 uppercase tracking-widest", children: "GEOMETRIC FILTER" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 136,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 134,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[10px] text-slate-500 leading-relaxed mb-3", children: "Delaunay conditions enforce co-planar vertex projection check with rigorous InCircle parameters." }, void 0, false, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 141,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2 font-mono text-[9px]", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between border-b border-slate-900/60 pb-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Angle Limit:" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 147,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "≥ 30.0°" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 148,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 146,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between border-b border-slate-900/60 pb-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Max Edge:" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 151,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "5.0 mm" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 152,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 150,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Fusing Mode:" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold", children: "COHERENT" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 156,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 145,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
          lineNumber: 133,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-sky-950/20 border border-sky-900/30 rounded-lg font-mono text-[8px] text-sky-300/80 leading-relaxed", id: "interactive_tips_hud", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 font-bold mb-1 text-sky-400 uppercase", children: [
            /* @__PURE__ */ jsxDEV(Compass, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Interakcja Modelu:" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 165,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this),
          "Przeciągaj kursor myszy na siatce po prawej stronie, aby precyzyjnie obrócić wektor skanu przed rozpoczęciem fuzji."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
          lineNumber: 162,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 96,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2", id: "cosmos_workstation_panel", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative w-full aspect-square max-w-[380px] sm:max-w-[420px] rounded-full border border-sky-500/10 p-5 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm shadow-[0_0_50px_rgba(2,132,199,0.05)]", id: "biometric_scanning_orbit_ring", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 rounded-full border-t border-b border-sky-400/20 animate-spin", style: { animationDuration: "40s" } }, void 0, false, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 179,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-2 rounded-full border-l border-r border-teal-500/10 animate-spin", style: { animationDuration: "60s", animationDirection: "reverse" } }, void 0, false, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 180,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-12 rounded-full border border-sky-500/5" }, void 0, false, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 183,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-24 rounded-full border border-sky-500/5" }, void 0, false, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 184,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `w-full h-full relative z-10 transition-all duration-500 ${isZooming ? "scale-[1.35] blur-sm opacity-60" : "scale-100"}`, id: "tech_visualizer_frame", children: /* @__PURE__ */ jsxDEV(
            ThreeDHeadVisualizer,
            {
              yaw: simulatedYaw,
              pitch: simulatedPitch,
              roll: simulatedRoll,
              distance: 0.34,
              faceDetected: true,
              minTriangleAngle: 30,
              maxTriangleEdgeLength: 5,
              enforceDelaunayCondition: true,
              onTriangulationStats: setTriangulationStats,
              scanType,
              showLiveMesh: true,
              showRealTimeMetrics: true
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 188,
              columnNumber: 15
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 187,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/90 border border-sky-500/30 px-3 py-1 rounded-full text-[8px] font-mono text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(14,165,233,0.15)] z-20", children: [
            /* @__PURE__ */ jsxDEV(Orbit, { className: "w-3 h-3 text-sky-400 animate-spin" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 206,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: scanType === "chomiki_twarz" ? "SEKTOR: CHOMIKI_TWARZ" : "SEKTOR: OPONKA_BRZUCH" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 207,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 205,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(AnimatePresence, { children: isZooming && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: [0, 0.8, 0.3, 1] },
              className: "absolute inset-0 rounded-full bg-sky-950/20 border-4 border-sky-400 flex flex-col items-center justify-center z-30",
              id: "zoom_in_telemetry_curtain",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-xs font-bold text-sky-300 animate-pulse tracking-widest uppercase mb-1", children: "INICJACJA SYNTETYCZNA" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 219,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[24px] font-black text-white", children: [
                  zoomProgress,
                  "%"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 222,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "w-32 bg-slate-900 h-1 rounded-full overflow-hidden mt-2 border border-sky-500/20", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-sky-400 h-full transition-all", style: { width: `${zoomProgress}%` } }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 226,
                  columnNumber: 21
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 225,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 213,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 211,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
          lineNumber: 176,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-6 w-full max-w-[340px] flex flex-col items-center gap-3 relative z-20", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleStartProtocol,
              disabled: isZooming,
              className: `w-full font-sans text-xs font-black tracking-widest py-3.5 px-6 rounded-xl border flex items-center justify-center gap-2.5 shadow-2xl transition-all ${isZooming ? "bg-slate-900 border-slate-800 text-slate-500 cursor-wait" : "bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 border-sky-300 hover:border-sky-400 text-slate-950 font-extrabold hover:scale-[1.03] active:scale-95 shadow-[0_0_25px_rgba(14,165,233,0.3)]"}`,
              id: "start_cosmos_telemetry_protocol",
              children: [
                /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-slate-950 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 245,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "INICJUJ POMIAR (ZOOM IN)" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 246,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4 text-slate-950" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 247,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 235,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[8px] text-slate-500 text-center uppercase tracking-wider", children: "PRZEJŚCIE DO PROTOKOŁU POMIAROWEGO KLUB_CHOMIKA" }, void 0, false, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 250,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
          lineNumber: 234,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-3 flex flex-col gap-4 order-3", id: "cosmos_selection_panel", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[10px] text-slate-500 uppercase tracking-widest pl-1 font-bold", children: "CHOOSE TARGET SECTOR" }, void 0, false, {
          fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
          lineNumber: 260,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              if (!isZooming) setScanType("chomiki_twarz");
            },
            className: `text-left p-4 rounded-xl border transition-all flex flex-col gap-2 relative overflow-hidden ${scanType === "chomiki_twarz" ? "bg-sky-950/40 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.15)] scale-[1.02]" : "bg-slate-950/60 border-slate-900 opacity-60 hover:opacity-100 hover:border-slate-800"}`,
            id: "selector_cosmos_face",
            children: [
              scanType === "chomiki_twarz" && /* @__PURE__ */ jsxDEV("div", { className: "absolute left-0 top-0 bottom-0 w-1 bg-sky-400" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 276,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-sky-400 font-bold uppercase tracking-wider", children: "SEKTOR ALPHA" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 280,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sm", children: "🐹🧣" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 283,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 279,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxDEV("h4", { className: "font-sans text-xs font-bold text-slate-200", children: "CHOMIKI_TWARZ (Mózgoczaszka)" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 287,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-slate-400 mt-1 leading-normal", children: "Precyzyjna siatka 3D okolic oczu, policzków i uroczej mordki Buły." }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 290,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 286,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-t border-slate-900 pt-2 mt-1.5 font-mono text-[8px]", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "POINTS EXPECTED:" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 296,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `${scanType === "chomiki_twarz" ? "text-sky-400 font-bold" : "text-slate-500"}`, children: "12,400 vertices" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 297,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 295,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 265,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              if (!isZooming) setScanType("oponka_brzuch");
            },
            className: `text-left p-4 rounded-xl border transition-all flex flex-col gap-2 relative overflow-hidden ${scanType === "oponka_brzuch" ? "bg-teal-950/40 border-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.15)] scale-[1.02]" : "bg-slate-950/60 border-slate-900 opacity-60 hover:opacity-100 hover:border-slate-800"}`,
            id: "selector_cosmos_belly",
            children: [
              scanType === "oponka_brzuch" && /* @__PURE__ */ jsxDEV("div", { className: "absolute left-0 top-0 bottom-0 w-1 bg-teal-400" }, void 0, false, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 315,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-teal-400 font-bold uppercase tracking-wider", children: "SEKTOR BETA" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 319,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sm", children: "🐹🏃‍♂️" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 322,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 318,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxDEV("h4", { className: "font-sans text-xs font-bold text-slate-200", children: "OPONKA_BRZUCH (Brzuchopłatek)" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 326,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-slate-400 mt-1 leading-normal", children: "Skanowanie wolumetryczne dresowej sylwetki, oponki i mięśni brzucha." }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 329,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 325,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-t border-slate-900 pt-2 mt-1.5 font-mono text-[8px]", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "POINTS EXPECTED:" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 335,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `${scanType === "oponka_brzuch" ? "text-teal-400 font-bold" : "text-slate-500"}`, children: "16,800 vertices" }, void 0, false, {
                  fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                  lineNumber: 336,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
                lineNumber: 334,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 304,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 bg-slate-950/30 p-3.5 rounded-xl font-mono text-[8px] text-slate-500 flex flex-col gap-1.5", id: "database_ref_cosmos_hud", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 font-bold text-slate-400 uppercase", children: [
            /* @__PURE__ */ jsxDEV(Workflow, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 345,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "DURABLE PERSISTENCE:" }, void 0, false, {
              fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
              lineNumber: 346,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
            lineNumber: 344,
            columnNumber: 13
          }, this),
          "Po pomyślnym pomiarze rekordy zapisują się w tabeli bazy danych 'user_scans_raw' z obsługą formatu JSONB."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
          lineNumber: 343,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
        lineNumber: 258,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
      lineNumber: 93,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/TechCosmosSelector.tsx",
    lineNumber: 78,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRlY2hDb3Ntb3NTZWxlY3Rvci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFRocmVlREhlYWRWaXN1YWxpemVyIH0gZnJvbSAnLi9UaHJlZURIZWFkVmlzdWFsaXplcic7XG5pbXBvcnQgeyBDYWxpYnJhdGlvbk1ldHJpY3MsIFNlbnNvckNvbmZpZyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFxuICBTaGllbGQsIFxuICBDcHUsIFxuICBBY3Rpdml0eSwgXG4gIFNwYXJrbGVzLCBcbiAgTG9jYXRlLCBcbiAgQ29tcGFzcywgXG4gIE9yYml0LCBcbiAgQ2hldnJvblJpZ2h0LCBcbiAgV29ya2Zsb3csIFxuICBEcmliYmJsZSwgXG4gIFRlcm1pbmFsLFxuICBIZWxwQ2lyY2xlXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbmludGVyZmFjZSBUZWNoQ29zbW9zU2VsZWN0b3JQcm9wcyB7XG4gIG1ldHJpY3M6IENhbGlicmF0aW9uTWV0cmljcztcbiAgc2NhblR5cGU6IHN0cmluZztcbiAgc2V0U2NhblR5cGU6ICh0eXBlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uSW5pdGlhdGVTY2FuOiAoKSA9PiB2b2lkO1xuICB0cmlhbmd1bGF0aW9uU3RhdHM6IHsgdG90YWw6IG51bWJlcjsgc2tpbm55OiBudW1iZXI7IHRvb0xvbmc6IG51bWJlciB9O1xuICBzZXRUcmlhbmd1bGF0aW9uU3RhdHM6IChzdGF0czogeyB0b3RhbDogbnVtYmVyOyBza2lubnk6IG51bWJlcjsgdG9vTG9uZzogbnVtYmVyIH0pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBUZWNoQ29zbW9zU2VsZWN0b3I6IFJlYWN0LkZDPFRlY2hDb3Ntb3NTZWxlY3RvclByb3BzPiA9ICh7XG4gIG1ldHJpY3MsXG4gIHNjYW5UeXBlLFxuICBzZXRTY2FuVHlwZSxcbiAgb25Jbml0aWF0ZVNjYW4sXG4gIHRyaWFuZ3VsYXRpb25TdGF0cyxcbiAgc2V0VHJpYW5ndWxhdGlvblN0YXRzLFxufSkgPT4ge1xuICBjb25zdCBbaXNSb3RhdGluZywgc2V0SXNSb3RhdGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3JvdGF0aW9uQW5nbGUsIHNldFJvdGF0aW9uQW5nbGVdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtpc1pvb21pbmcsIHNldElzWm9vbWluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFt6b29tUHJvZ3Jlc3MsIHNldFpvb21Qcm9ncmVzc10gPSB1c2VTdGF0ZSgwKTtcblxuICAvLyBBdXRvLXJvdGF0aW5nIGFuaW1hdGlvbiB3aGVuIG5vIHVzZXIgZHJhZyBpcyBhY3RpdmVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgaW50ZXJ2YWw6IGFueTtcbiAgICBpZiAoaXNSb3RhdGluZykge1xuICAgICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHNldFJvdGF0aW9uQW5nbGUoKHByZXYpID0+IChwcmV2ICsgMS4yKSAlIDM2MCk7XG4gICAgICB9LCAzMCk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfSwgW2lzUm90YXRpbmddKTtcblxuICAvLyBIYW5kbGUgSW5pdGlhdGluZyBTY2FuIFByb3RvY29sIHdpdGggYSBzaW11bGF0ZWQgY291bnRkb3duICYgZGlnaXRhbCBab29tLWluXG4gIGNvbnN0IGhhbmRsZVN0YXJ0UHJvdG9jb2wgPSAoKSA9PiB7XG4gICAgc2V0SXNab29taW5nKHRydWUpO1xuICAgIGxldCBwcm9ncmVzcyA9IDA7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBwcm9ncmVzcyArPSA1O1xuICAgICAgc2V0Wm9vbVByb2dyZXNzKHByb2dyZXNzKTtcbiAgICAgIGlmIChwcm9ncmVzcyA+PSAxMDApIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgIG9uSW5pdGlhdGVTY2FuKCk7XG4gICAgICB9XG4gICAgfSwgODApO1xuICB9O1xuXG4gIC8vIENvbnZlcnQgY3VycmVudCByb3RhdGlvbiBhbmdsZSB0byBwaXRjaC95YXcgb2Zmc2V0cyB0byBzaW11bGF0ZSBmbG9hdGluZyB0ZWNoIG1lc2hcbiAgY29uc3Qgc2ltdWxhdGVkWWF3ID0gbWV0cmljcy55YXcgKyBNYXRoLnNpbihyb3RhdGlvbkFuZ2xlICogTWF0aC5QSSAvIDE4MCkgKiAxMjtcbiAgY29uc3Qgc2ltdWxhdGVkUGl0Y2ggPSBtZXRyaWNzLnBpdGNoICsgTWF0aC5jb3Mocm90YXRpb25BbmdsZSAqIE1hdGguUEkgLyAxODApICogODtcbiAgY29uc3Qgc2ltdWxhdGVkUm9sbCA9IG1ldHJpY3Mucm9sbCArIE1hdGguc2luKChyb3RhdGlvbkFuZ2xlICsgNDUpICogTWF0aC5QSSAvIDE4MCkgKiA0O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1bODV2aF0gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHNtOnAtNiByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIiBpZD1cInRlY2hfY29zbW9zX2NvbnRhaW5lclwiPlxuICAgICAgXG4gICAgICB7LyogSW1tZXJzaXZlIERhcmsgQ29zbWljIEdyaWQgJiBQYXJ0aWNsZSBCYWNrZ3JvdW5kcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1zbGF0ZS05NTAgcG9pbnRlci1ldmVudHMtbm9uZSB6LTBcIj5cbiAgICAgICAgey8qIFRlY2ggUmFkaWFsIEdyaWQgbGluZXMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bbGluZWFyLWdyYWRpZW50KHRvX3JpZ2h0LCMwMjA2MTdfMXB4LHRyYW5zcGFyZW50XzFweCksbGluZWFyLWdyYWRpZW50KHRvX2JvdHRvbSwjMDIwNjE3XzFweCx0cmFuc3BhcmVudF8xcHgpXSBiZy1bc2l6ZTo0cmVtXzRyZW1dIFttYXNrLWltYWdlOnJhZGlhbC1ncmFkaWVudChlbGxpcHNlXzYwJV81MCVfYXRfNTAlXzUwJSwjMDAwXzcwJSx0cmFuc3BhcmVudF8xMDAlKV0gb3BhY2l0eS0zMFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bcmFkaWFsLWdyYWRpZW50KGNpcmNsZV84MDBweF9hdF8xMDAlXzIwMHB4LCMwZDk0ODgsdHJhbnNwYXJlbnQpXSBvcGFjaXR5LVswLjA4XVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bcmFkaWFsLWdyYWRpZW50KGNpcmNsZV84MDBweF9hdF8wJV82MDBweCwjMDI4NGM3LHRyYW5zcGFyZW50KV0gb3BhY2l0eS1bMC4wOF1cIiAvPlxuICAgICAgICBcbiAgICAgICAgey8qIFNpbXVsYXRlZCBvcmJpdGluZyBwYXRoIGNvb3JkaW5hdGVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xLzIgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiAtdHJhbnNsYXRlLXktMS8yIHctWzUwMHB4XSBoLVs1MDBweF0gYm9yZGVyIGJvcmRlci1za3ktNTAwLzEwIHJvdW5kZWQtZnVsbCBhbmltYXRlLXB1bHNlIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xLzIgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiAtdHJhbnNsYXRlLXktMS8yIHctWzM1MHB4XSBoLVszNTBweF0gYm9yZGVyIGJvcmRlci10ZWFsLTUwMC81IHJvdW5kZWQtZnVsbCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS8yIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LVsyMDBweF0gaC1bMjAwcHhdIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1za3ktNTAwLzUgcm91bmRlZC1mdWxsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctNnhsIHctZnVsbCBncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtOCBpdGVtcy1jZW50ZXIgcmVsYXRpdmUgei0xMFwiIGlkPVwidGVjaF9jb3Ntb3NfY29udGVudF9ncmlkXCI+XG4gICAgICAgIFxuICAgICAgICB7LyogTEVGVCBDT0xVTU46IEJpb21ldHJpYyBUZWNobmljYWwgUGFyYW1ldGVycyAoMyBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0zIGZsZXggZmxleC1jb2wgZ2FwLTQgb3JkZXItMiBsZzpvcmRlci0xXCIgaWQ9XCJjb3Ntb3NfcGFyYW1ldGVyc19wYW5lbFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1za3ktOTUwIGJnLXNsYXRlLTk1MC84MCBiYWNrZHJvcC1ibHVyLW1kIHJvdW5kZWQteGwgcC00IHNoYWRvdy14bFwiIGlkPVwic3lzdGVtX3RlbGVtZXRyeV9ib3hcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwIHBiLTIgbWItM1wiPlxuICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gZm9udC1ib2xkIHRleHQtc2t5LTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCI+XG4gICAgICAgICAgICAgICAgU1lTVEVNIFRFTEVNRVRSWVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0yLjUgZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctc2xhdGUtOTAwLzQwIHAtMS41IHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TWVNURU0gU1RBVFVTOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgT05MSU5FXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctc2xhdGUtOTAwLzQwIHAtMS41IHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TVEFCSUxOT8WaxIYgTGlEQVI6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LWJvbGRcIj45OC40JSBMT0NLRUQ8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05MDAvNDAgcC0xLjUgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPkxJREFSIFJFU09MVVRJT046PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGZvbnQtYm9sZFwiPjI1NiB4IDE5MiBweDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIGJnLXNsYXRlLTkwMC80MCBwLTEuNSByb3VuZGVkXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+QUNUSVZFIFBPSU5UUzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC10ZWFsLTQwMCBmb250LWJvbGRcIj4xMiw0MDAgUFRTPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctc2xhdGUtOTAwLzQwIHAtMS41IHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5EV0VMTCBUSFJFU0hPTEQ6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+MjAwMCBtczwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgYmctc2xhdGUtOTUwLzYwIHJvdW5kZWQteGwgcC00IHNoYWRvdy1sZ1wiIGlkPVwiZ2VvbWV0cmljX2NvbnN0cmFpbnRzX2JveFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgcGItMiBtYi0yLjVcIj5cbiAgICAgICAgICAgICAgPENvbXBhc3MgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXRlYWwtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCI+XG4gICAgICAgICAgICAgICAgR0VPTUVUUklDIEZJTFRFUlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGxlYWRpbmctcmVsYXhlZCBtYi0zXCI+XG4gICAgICAgICAgICAgIERlbGF1bmF5IGNvbmRpdGlvbnMgZW5mb3JjZSBjby1wbGFuYXIgdmVydGV4IHByb2plY3Rpb24gY2hlY2sgd2l0aCByaWdvcm91cyBJbkNpcmNsZSBwYXJhbWV0ZXJzLlxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTIgZm9udC1tb25vIHRleHQtWzlweF1cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwLzYwIHBiLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+QW5nbGUgTGltaXQ6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+JmdlOyAzMC4wJmRlZzs8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAvNjAgcGItMS41XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5NYXggRWRnZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj41LjAgbW08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5GdXNpbmcgTW9kZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1za3ktNDAwIGZvbnQtYm9sZFwiPkNPSEVSRU5UPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFF1aWNrIGluc3RydWN0aW9ucyBIVUQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctc2t5LTk1MC8yMCBib3JkZXIgYm9yZGVyLXNreS05MDAvMzAgcm91bmRlZC1sZyBmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNreS0zMDAvODAgbGVhZGluZy1yZWxheGVkXCIgaWQ9XCJpbnRlcmFjdGl2ZV90aXBzX2h1ZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LWJvbGQgbWItMSB0ZXh0LXNreS00MDAgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgIDxDb21wYXNzIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+SW50ZXJha2NqYSBNb2RlbHU6PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBQcnplY2nEhWdhaiBrdXJzb3IgbXlzenkgbmEgc2lhdGNlIHBvIHByYXdlaiBzdHJvbmllLCBhYnkgcHJlY3l6eWpuaWUgb2Jyw7NjacSHIHdla3RvciBza2FudSBwcnplZCByb3pwb2N6xJljaWVtIGZ1emppLlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNSURETEUgQ09MVU1OOiBGbG9hdGluZyBJbnRlcmFjdGl2ZSAzRCBNZXNoIFdvcmtzdGF0aW9uICg2IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTYgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3JkZXItMSBsZzpvcmRlci0yXCIgaWQ9XCJjb3Ntb3Nfd29ya3N0YXRpb25fcGFuZWxcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogTWFpbiBXb3Jrc3RhdGlvbiBjaXJjdWxhciBIVUQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgYXNwZWN0LXNxdWFyZSBtYXgtdy1bMzgwcHhdIHNtOm1heC13LVs0MjBweF0gcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2t5LTUwMC8xMCBwLTUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQwIGJhY2tkcm9wLWJsdXItc20gc2hhZG93LVswXzBfNTBweF9yZ2JhKDIsMTMyLDE5OSwwLjA1KV1cIiBpZD1cImJpb21ldHJpY19zY2FubmluZ19vcmJpdF9yaW5nXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBTcGlubmluZyBleHRlcm5hbCB0ZWxlbWV0cnkgdGlja3MgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcm91bmRlZC1mdWxsIGJvcmRlci10IGJvcmRlci1iIGJvcmRlci1za3ktNDAwLzIwIGFuaW1hdGUtc3BpblwiIHN0eWxlPXt7IGFuaW1hdGlvbkR1cmF0aW9uOiAnNDBzJyB9fSAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0yIHJvdW5kZWQtZnVsbCBib3JkZXItbCBib3JkZXItciBib3JkZXItdGVhbC01MDAvMTAgYW5pbWF0ZS1zcGluXCIgc3R5bGU9e3sgYW5pbWF0aW9uRHVyYXRpb246ICc2MHMnLCBhbmltYXRpb25EaXJlY3Rpb246ICdyZXZlcnNlJyB9fSAvPlxuXG4gICAgICAgICAgICB7LyogUmFkYXIgc3dlcHQgY2lyY3VsYXIgbGluZSBkZWNvcmF0aW9uICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0xMiByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1za3ktNTAwLzVcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0yNCByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1za3ktNTAwLzVcIiAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogUmVhbC10aW1lIGZsb2F0aW5nIGNhbnZhcyBjb250YWluZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHctZnVsbCBoLWZ1bGwgcmVsYXRpdmUgei0xMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgJHtpc1pvb21pbmcgPyAnc2NhbGUtWzEuMzVdIGJsdXItc20gb3BhY2l0eS02MCcgOiAnc2NhbGUtMTAwJ31gfSBpZD1cInRlY2hfdmlzdWFsaXplcl9mcmFtZVwiPlxuICAgICAgICAgICAgICA8VGhyZWVESGVhZFZpc3VhbGl6ZXJcbiAgICAgICAgICAgICAgICB5YXc9e3NpbXVsYXRlZFlhd31cbiAgICAgICAgICAgICAgICBwaXRjaD17c2ltdWxhdGVkUGl0Y2h9XG4gICAgICAgICAgICAgICAgcm9sbD17c2ltdWxhdGVkUm9sbH1cbiAgICAgICAgICAgICAgICBkaXN0YW5jZT17MC4zNH1cbiAgICAgICAgICAgICAgICBmYWNlRGV0ZWN0ZWQ9e3RydWV9XG4gICAgICAgICAgICAgICAgbWluVHJpYW5nbGVBbmdsZT17MzAuMH1cbiAgICAgICAgICAgICAgICBtYXhUcmlhbmdsZUVkZ2VMZW5ndGg9ezUuMH1cbiAgICAgICAgICAgICAgICBlbmZvcmNlRGVsYXVuYXlDb25kaXRpb249e3RydWV9XG4gICAgICAgICAgICAgICAgb25Ucmlhbmd1bGF0aW9uU3RhdHM9e3NldFRyaWFuZ3VsYXRpb25TdGF0c31cbiAgICAgICAgICAgICAgICBzY2FuVHlwZT17c2NhblR5cGV9XG4gICAgICAgICAgICAgICAgc2hvd0xpdmVNZXNoPXt0cnVlfVxuICAgICAgICAgICAgICAgIHNob3dSZWFsVGltZU1ldHJpY3M9e3RydWV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEFjdGl2ZSBTZWN0b3IgUmluZyBsb2NrIG92ZXJsYXkgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS00IGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgYmctc2xhdGUtOTUwLzkwIGJvcmRlciBib3JkZXItc2t5LTUwMC8zMCBweC0zIHB5LTEgcm91bmRlZC1mdWxsIHRleHQtWzhweF0gZm9udC1tb25vIHRleHQtc2t5LTQwMCBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LVswXzBfMTJweF9yZ2JhKDE0LDE2NSwyMzMsMC4xNSldIHotMjBcIj5cbiAgICAgICAgICAgICAgPE9yYml0IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntzY2FuVHlwZSA9PT0gJ2Nob21pa2lfdHdhcnonID8gJ1NFS1RPUjogQ0hPTUlLSV9UV0FSWicgOiAnU0VLVE9SOiBPUE9OS0FfQlJaVUNIJ308L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNpbXVsYXRlZCBab29tLWluIGZsYXNoaW5nIG92ZXJsYXkgKi99XG4gICAgICAgICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICAgICAgICB7aXNab29taW5nICYmIChcbiAgICAgICAgICAgICAgICA8bW90aW9uLmRpdiBcbiAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiBbMCwgMC44LCAwLjMsIDFdIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHJvdW5kZWQtZnVsbCBiZy1za3ktOTUwLzIwIGJvcmRlci00IGJvcmRlci1za3ktNDAwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHotMzBcIlxuICAgICAgICAgICAgICAgICAgaWQ9XCJ6b29tX2luX3RlbGVtZXRyeV9jdXJ0YWluXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNreS0zMDAgYW5pbWF0ZS1wdWxzZSB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgSU5JQ0pBQ0pBIFNZTlRFVFlDWk5BXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzI0cHhdIGZvbnQtYmxhY2sgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7em9vbVByb2dyZXNzfSVcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMyIGJnLXNsYXRlLTkwMCBoLTEgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlbiBtdC0yIGJvcmRlciBib3JkZXItc2t5LTUwMC8yMFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNreS00MDAgaC1mdWxsIHRyYW5zaXRpb24tYWxsXCIgc3R5bGU9e3sgd2lkdGg6IGAke3pvb21Qcm9ncmVzc30lYCB9fSAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogVW5kZXJuZWF0aCBBY3Rpb24gYnV0dG9uOiBJTklUSUFURSBNRUFTVVJFTUVOVCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTYgdy1mdWxsIG1heC13LVszNDBweF0gZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTMgcmVsYXRpdmUgei0yMFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTdGFydFByb3RvY29sfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNab29taW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgZm9udC1zYW5zIHRleHQteHMgZm9udC1ibGFjayB0cmFja2luZy13aWRlc3QgcHktMy41IHB4LTYgcm91bmRlZC14bCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIuNSBzaGFkb3ctMnhsIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgaXNab29taW5nXG4gICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCBjdXJzb3Itd2FpdCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1za3ktNTAwIHRvLXRlYWwtNTAwIGhvdmVyOmZyb20tc2t5LTYwMCBob3Zlcjp0by10ZWFsLTYwMCBib3JkZXItc2t5LTMwMCBob3Zlcjpib3JkZXItc2t5LTQwMCB0ZXh0LXNsYXRlLTk1MCBmb250LWV4dHJhYm9sZCBob3ZlcjpzY2FsZS1bMS4wM10gYWN0aXZlOnNjYWxlLTk1IHNoYWRvdy1bMF8wXzI1cHhfcmdiYSgxNCwxNjUsMjMzLDAuMyldJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgaWQ9XCJzdGFydF9jb3Ntb3NfdGVsZW1ldHJ5X3Byb3RvY29sXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1zbGF0ZS05NTAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPklOSUNKVUogUE9NSUFSIChaT09NIElOKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2xhdGUtOTUwXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTUwMCB0ZXh0LWNlbnRlciB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgUFJaRUrFmkNJRSBETyBQUk9UT0tPxYFVIFBPTUlBUk9XRUdPIEtMVUJfQ0hPTUlLQVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSSUdIVCBDT0xVTU46IEludGVyYWN0aXZlIFNlY3RvciBTZWxlY3RvciBDYXJkcyAoMyBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0zIGZsZXggZmxleC1jb2wgZ2FwLTQgb3JkZXItM1wiIGlkPVwiY29zbW9zX3NlbGVjdGlvbl9wYW5lbFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgcGwtMSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgIENIT09TRSBUQVJHRVQgU0VDVE9SXG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU2VsZWN0b3IgMTogRkFDRSBTQ0FOIFRBUkdFVCAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IGlmICghaXNab29taW5nKSBzZXRTY2FuVHlwZSgnY2hvbWlraV90d2FyeicpOyB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1sZWZ0IHAtNCByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIGdhcC0yIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiAke1xuICAgICAgICAgICAgICBzY2FuVHlwZSA9PT0gJ2Nob21pa2lfdHdhcnonXG4gICAgICAgICAgICAgICAgPyAnYmctc2t5LTk1MC80MCBib3JkZXItc2t5LTUwMCBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoMTQsMTY1LDIzMywwLjE1KV0gc2NhbGUtWzEuMDJdJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtOTAwIG9wYWNpdHktNjAgaG92ZXI6b3BhY2l0eS0xMDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTgwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgaWQ9XCJzZWxlY3Rvcl9jb3Ntb3NfZmFjZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIEdsb3dpbmcgbGVmdCBzdHJpcCBtYXJrZXIgKi99XG4gICAgICAgICAgICB7c2NhblR5cGUgPT09ICdjaG9taWtpX3R3YXJ6JyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0wIHRvcC0wIGJvdHRvbS0wIHctMSBiZy1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2t5LTQwMCBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgU0VLVE9SIEFMUEhBXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbVwiPvCfkLnwn6ejPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgQ0hPTUlLSV9UV0FSWiAoTcOzemdvY3phc3prYSlcbiAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDAgbXQtMSBsZWFkaW5nLW5vcm1hbFwiPlxuICAgICAgICAgICAgICAgIFByZWN5enlqbmEgc2lhdGthIDNEIG9rb2xpYyBvY3p1LCBwb2xpY3prw7N3IGkgdXJvY3plaiBtb3Jka2kgQnXFgnkuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItdCBib3JkZXItc2xhdGUtOTAwIHB0LTIgbXQtMS41IGZvbnQtbW9ubyB0ZXh0LVs4cHhdXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+UE9JTlRTIEVYUEVDVEVEOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgJHtzY2FuVHlwZSA9PT0gJ2Nob21pa2lfdHdhcnonID8gJ3RleHQtc2t5LTQwMCBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNTAwJ31gfT5cbiAgICAgICAgICAgICAgICAxMiw0MDAgdmVydGljZXNcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogU2VsZWN0b3IgMjogQkVMTFkvQk9EWSBTQ0FOIFRBUkdFVCAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7IGlmICghaXNab29taW5nKSBzZXRTY2FuVHlwZSgnb3BvbmthX2JyenVjaCcpOyB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1sZWZ0IHAtNCByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIGdhcC0yIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiAke1xuICAgICAgICAgICAgICBzY2FuVHlwZSA9PT0gJ29wb25rYV9icnp1Y2gnXG4gICAgICAgICAgICAgICAgPyAnYmctdGVhbC05NTAvNDAgYm9yZGVyLXRlYWwtNTAwIHNoYWRvdy1bMF8wXzE1cHhfcmdiYSgyMCwxODQsMTY2LDAuMTUpXSBzY2FsZS1bMS4wMl0nXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzYwIGJvcmRlci1zbGF0ZS05MDAgb3BhY2l0eS02MCBob3ZlcjpvcGFjaXR5LTEwMCBob3Zlcjpib3JkZXItc2xhdGUtODAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICBpZD1cInNlbGVjdG9yX2Nvc21vc19iZWxseVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgey8qIEdsb3dpbmcgbGVmdCBzdHJpcCBtYXJrZXIgKi99XG4gICAgICAgICAgICB7c2NhblR5cGUgPT09ICdvcG9ua2FfYnJ6dWNoJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0wIHRvcC0wIGJvdHRvbS0wIHctMSBiZy10ZWFsLTQwMFwiIC8+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSB0ZXh0LXRlYWwtNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICBTRUtUT1IgQkVUQVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc21cIj7wn5C58J+Pg+KAjeKZgu+4jzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICAgIE9QT05LQV9CUlpVQ0ggKEJyenVjaG9wxYJhdGVrKVxuICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xIGxlYWRpbmctbm9ybWFsXCI+XG4gICAgICAgICAgICAgICAgU2thbm93YW5pZSB3b2x1bWV0cnljem5lIGRyZXNvd2VqIHN5bHdldGtpLCBvcG9ua2kgaSBtacSZxZtuaSBicnp1Y2hhLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMCBwdC0yIG10LTEuNSBmb250LW1vbm8gdGV4dC1bOHB4XVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPlBPSU5UUyBFWFBFQ1RFRDo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YCR7c2NhblR5cGUgPT09ICdvcG9ua2FfYnJ6dWNoJyA/ICd0ZXh0LXRlYWwtNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS01MDAnfWB9PlxuICAgICAgICAgICAgICAgIDE2LDgwMCB2ZXJ0aWNlc1xuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBEYXRhYmFzZSByZWZlcmVuY2UgY2FyZCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2xhdGUtOTAwIGJnLXNsYXRlLTk1MC8zMCBwLTMuNSByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwIGZsZXggZmxleC1jb2wgZ2FwLTEuNVwiIGlkPVwiZGF0YWJhc2VfcmVmX2Nvc21vc19odWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICA8V29ya2Zsb3cgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+RFVSQUJMRSBQRVJTSVNURU5DRTo8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFBvIHBvbXnFm2xueW0gcG9taWFyemUgcmVrb3JkeSB6YXBpc3VqxIUgc2nEmSB3IHRhYmVsaSBiYXp5IGRhbnljaCAndXNlcl9zY2Fuc19yYXcnIHogb2JzxYJ1Z8SFIGZvcm1hdHUgSlNPTkIuXG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgICAgXG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFrRlE7QUFsRlI7QUFBQTtBQUFBO0FBQUE7QUFLQSxTQUFnQixVQUFVLGlCQUFpQjtBQUMzQyxTQUFTLDRCQUE0QjtBQUVyQztBQUFBLEVBR0U7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BSUs7QUFDUCxTQUFTLFFBQVEsdUJBQXVCO0FBV2pDLGFBQU0scUJBQXdELENBQUM7QUFBQSxFQUNwRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBTTtBQUNKLFFBQU0sQ0FBQyxZQUFZLGFBQWEsSUFBSSxTQUFTLElBQUk7QUFDakQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBUyxDQUFDO0FBQ3BELFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQVMsQ0FBQztBQUdsRCxZQUFVLE1BQU07QUFDZCxRQUFJO0FBQ0osUUFBSSxZQUFZO0FBQ2QsaUJBQVcsWUFBWSxNQUFNO0FBQzNCLHlCQUFpQixDQUFDLFVBQVUsT0FBTyxPQUFPLEdBQUc7QUFBQSxNQUMvQyxHQUFHLEVBQUU7QUFBQSxJQUNQO0FBQ0EsV0FBTyxNQUFNLGNBQWMsUUFBUTtBQUFBLEVBQ3JDLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFHZixRQUFNLHNCQUFzQixNQUFNO0FBQ2hDLGlCQUFhLElBQUk7QUFDakIsUUFBSSxXQUFXO0FBQ2YsVUFBTSxXQUFXLFlBQVksTUFBTTtBQUNqQyxrQkFBWTtBQUNaLHNCQUFnQixRQUFRO0FBQ3hCLFVBQUksWUFBWSxLQUFLO0FBQ25CLHNCQUFjLFFBQVE7QUFDdEIsdUJBQWU7QUFBQSxNQUNqQjtBQUFBLElBQ0YsR0FBRyxFQUFFO0FBQUEsRUFDUDtBQUdBLFFBQU0sZUFBZSxRQUFRLE1BQU0sS0FBSyxJQUFJLGdCQUFnQixLQUFLLEtBQUssR0FBRyxJQUFJO0FBQzdFLFFBQU0saUJBQWlCLFFBQVEsUUFBUSxLQUFLLElBQUksZ0JBQWdCLEtBQUssS0FBSyxHQUFHLElBQUk7QUFDakYsUUFBTSxnQkFBZ0IsUUFBUSxPQUFPLEtBQUssS0FBSyxnQkFBZ0IsTUFBTSxLQUFLLEtBQUssR0FBRyxJQUFJO0FBRXRGLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLDhGQUE2RixJQUFHLHlCQUc3RztBQUFBLDJCQUFDLFNBQUksV0FBVSx5REFFYjtBQUFBLDZCQUFDLFNBQUksV0FBVSwwUEFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXNRO0FBQUEsTUFDdFEsdUJBQUMsU0FBSSxXQUFVLDBHQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBc0g7QUFBQSxNQUN0SCx1QkFBQyxTQUFJLFdBQVUsd0dBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFvSDtBQUFBLE1BR3BILHVCQUFDLFNBQUksV0FBVSw2SkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXlLO0FBQUEsTUFDekssdUJBQUMsU0FBSSxXQUFVLCtJQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBMko7QUFBQSxNQUMzSix1QkFBQyxTQUFJLFdBQVUsNEpBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUF3SztBQUFBLFNBVDFLO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FVQTtBQUFBLElBRUEsdUJBQUMsU0FBSSxXQUFVLHNGQUFxRixJQUFHLDRCQUdyRztBQUFBLDZCQUFDLFNBQUksV0FBVSx3REFBdUQsSUFBRywyQkFFdkU7QUFBQSwrQkFBQyxTQUFJLFdBQVUsbUZBQWtGLElBQUcsd0JBQ2xHO0FBQUEsaUNBQUMsU0FBSSxXQUFVLGlFQUNiO0FBQUEsbUNBQUMsWUFBUyxXQUFVLG1DQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFvRDtBQUFBLFlBQ3BELHVCQUFDLFVBQUssV0FBVSwwRUFBeUUsZ0NBQXpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxlQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBS0E7QUFBQSxVQUVBLHVCQUFDLFNBQUksV0FBVSw2REFDYjtBQUFBLG1DQUFDLFNBQUksV0FBVSxtRUFDYjtBQUFBLHFDQUFDLFVBQUssOEJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBb0I7QUFBQSxjQUNwQix1QkFBQyxVQUFLLFdBQVUsc0RBQ2Q7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsMkRBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXdFO0FBQUEsZ0JBQUU7QUFBQSxtQkFENUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFHQTtBQUFBLGlCQUxGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBTUE7QUFBQSxZQUNBLHVCQUFDLFNBQUksV0FBVSxtRUFDYjtBQUFBLHFDQUFDLFVBQUssaUNBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUI7QUFBQSxjQUN2Qix1QkFBQyxVQUFLLFdBQVUsMEJBQXlCLDRCQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFxRDtBQUFBLGlCQUZ2RDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsbUVBQ2I7QUFBQSxxQ0FBQyxVQUFLLGlDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQXVCO0FBQUEsY0FDdkIsdUJBQUMsVUFBSyxXQUFVLDRCQUEyQiw0QkFBM0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUQ7QUFBQSxpQkFGekQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLG1FQUNiO0FBQUEscUNBQUMsVUFBSyw4QkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFvQjtBQUFBLGNBQ3BCLHVCQUFDLFVBQUssV0FBVSwyQkFBMEIsMEJBQTFDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW9EO0FBQUEsaUJBRnREO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxZQUNBLHVCQUFDLFNBQUksV0FBVSxtRUFDYjtBQUFBLHFDQUFDLFVBQUssZ0NBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBc0I7QUFBQSxjQUN0Qix1QkFBQyxVQUFLLFdBQVUsa0JBQWlCLHVCQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF3QztBQUFBLGlCQUYxQztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsZUF2QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkF3QkE7QUFBQSxhQWhDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBaUNBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUsb0VBQW1FLElBQUcsNkJBQ25GO0FBQUEsaUNBQUMsU0FBSSxXQUFVLG1FQUNiO0FBQUEsbUNBQUMsV0FBUSxXQUFVLG9DQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFvRDtBQUFBLFlBQ3BELHVCQUFDLFVBQUssV0FBVSw0RUFBMkUsZ0NBQTNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxlQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBS0E7QUFBQSxVQUVBLHVCQUFDLE9BQUUsV0FBVSw2REFBNEQsZ0hBQXpFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUVBLHVCQUFDLFNBQUksV0FBVSw0Q0FDYjtBQUFBLG1DQUFDLFNBQUksV0FBVSw0REFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxrQkFBaUIsNEJBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTZDO0FBQUEsY0FDN0MsdUJBQUMsVUFBSyxXQUFVLGtCQUFpQix1QkFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBK0M7QUFBQSxpQkFGakQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsU0FBSSxXQUFVLDREQUNiO0FBQUEscUNBQUMsVUFBSyxXQUFVLGtCQUFpQix5QkFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBMEM7QUFBQSxjQUMxQyx1QkFBQyxVQUFLLFdBQVUsa0JBQWlCLHNCQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF1QztBQUFBLGlCQUZ6QztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUdBO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsd0JBQ2I7QUFBQSxxQ0FBQyxVQUFLLFdBQVUsa0JBQWlCLDRCQUFqQztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE2QztBQUFBLGNBQzdDLHVCQUFDLFVBQUssV0FBVSwwQkFBeUIsd0JBQXpDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWlEO0FBQUEsaUJBRm5EO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBR0E7QUFBQSxlQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBYUE7QUFBQSxhQXpCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBMEJBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLFdBQVUsOEdBQTZHLElBQUcsd0JBQzdIO0FBQUEsaUNBQUMsU0FBSSxXQUFVLGlFQUNiO0FBQUEsbUNBQUMsV0FBUSxXQUFVLDBCQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEwQztBQUFBLFlBQzFDLHVCQUFDLFVBQUssa0NBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBd0I7QUFBQSxlQUYxQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFBTTtBQUFBLGFBSlI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU1BO0FBQUEsV0F4RUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQTBFQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLDhFQUE2RSxJQUFHLDRCQUc3RjtBQUFBLCtCQUFDLFNBQUksV0FBVSxtTkFBa04sSUFBRyxpQ0FHbE87QUFBQSxpQ0FBQyxTQUFJLFdBQVUsa0ZBQWlGLE9BQU8sRUFBRSxtQkFBbUIsTUFBTSxLQUFsSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFxSTtBQUFBLFVBQ3JJLHVCQUFDLFNBQUksV0FBVSxtRkFBa0YsT0FBTyxFQUFFLG1CQUFtQixPQUFPLG9CQUFvQixVQUFVLEtBQWxLO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXFLO0FBQUEsVUFHckssdUJBQUMsU0FBSSxXQUFVLDREQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXdFO0FBQUEsVUFDeEUsdUJBQUMsU0FBSSxXQUFVLDREQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXdFO0FBQUEsVUFHeEUsdUJBQUMsU0FBSSxXQUFXLDJEQUEyRCxZQUFZLG9DQUFvQyxXQUFXLElBQUksSUFBRyx5QkFDM0k7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLEtBQUs7QUFBQSxjQUNMLE9BQU87QUFBQSxjQUNQLE1BQU07QUFBQSxjQUNOLFVBQVU7QUFBQSxjQUNWLGNBQWM7QUFBQSxjQUNkLGtCQUFrQjtBQUFBLGNBQ2xCLHVCQUF1QjtBQUFBLGNBQ3ZCLDBCQUEwQjtBQUFBLGNBQzFCLHNCQUFzQjtBQUFBLGNBQ3RCO0FBQUEsY0FDQSxjQUFjO0FBQUEsY0FDZCxxQkFBcUI7QUFBQTtBQUFBLFlBWnZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQWFBLEtBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFlQTtBQUFBLFVBR0EsdUJBQUMsU0FBSSxXQUFVLDJQQUNiO0FBQUEsbUNBQUMsU0FBTSxXQUFVLHVDQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFxRDtBQUFBLFlBQ3JELHVCQUFDLFVBQU0sdUJBQWEsa0JBQWtCLDBCQUEwQiwyQkFBaEU7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBd0Y7QUFBQSxlQUYxRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFHQSx1QkFBQyxtQkFDRSx1QkFDQztBQUFBLFlBQUMsT0FBTztBQUFBLFlBQVA7QUFBQSxjQUNDLFNBQVMsRUFBRSxTQUFTLEVBQUU7QUFBQSxjQUN0QixTQUFTLEVBQUUsU0FBUyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsRUFBRTtBQUFBLGNBQ3JDLFdBQVU7QUFBQSxjQUNWLElBQUc7QUFBQSxjQUVIO0FBQUEsdUNBQUMsU0FBSSxXQUFVLHlGQUF3RixxQ0FBdkc7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBLHVCQUFDLFNBQUksV0FBVSwrQ0FDWjtBQUFBO0FBQUEsa0JBQWE7QUFBQSxxQkFEaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFFQTtBQUFBLGdCQUNBLHVCQUFDLFNBQUksV0FBVSxvRkFDYixpQ0FBQyxTQUFJLFdBQVUsb0NBQW1DLE9BQU8sRUFBRSxPQUFPLEdBQUcsWUFBWSxJQUFJLEtBQXJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXdGLEtBRDFGO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQTtBQUFBO0FBQUEsWUFkRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFlQSxLQWpCSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQW1CQTtBQUFBLGFBdERGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUF1REE7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSw0RUFDYjtBQUFBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTO0FBQUEsY0FDVCxVQUFVO0FBQUEsY0FDVixXQUFXLHdKQUNULFlBQ0ksNkRBQ0EsNE5BQ047QUFBQSxjQUNBLElBQUc7QUFBQSxjQUVIO0FBQUEsdUNBQUMsWUFBUyxXQUFVLDBDQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUEyRDtBQUFBLGdCQUMzRCx1QkFBQyxVQUFLLHdDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQThCO0FBQUEsZ0JBQzlCLHVCQUFDLGdCQUFhLFdBQVUsNEJBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWlEO0FBQUE7QUFBQTtBQUFBLFlBWm5EO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQWFBO0FBQUEsVUFFQSx1QkFBQyxPQUFFLFdBQVUsNEVBQTJFLCtEQUF4RjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFsQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW1CQTtBQUFBLFdBaEZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrRkE7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVSw2Q0FBNEMsSUFBRywwQkFFNUQ7QUFBQSwrQkFBQyxTQUFJLFdBQVUsaUZBQWdGLG9DQUEvRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUdBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU07QUFBRSxrQkFBSSxDQUFDLFVBQVcsYUFBWSxlQUFlO0FBQUEsWUFBRztBQUFBLFlBQy9ELFdBQVcsK0ZBQ1QsYUFBYSxrQkFDVCxzRkFDQSxzRkFDTjtBQUFBLFlBQ0EsSUFBRztBQUFBLFlBR0Y7QUFBQSwyQkFBYSxtQkFDWix1QkFBQyxTQUFJLFdBQVUsbURBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBK0Q7QUFBQSxjQUdqRSx1QkFBQyxTQUFJLFdBQVUscUNBQ2I7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsd0VBQXVFLDRCQUF2RjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsZ0JBQ0EsdUJBQUMsVUFBSyxXQUFVLFdBQVUsb0JBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQThCO0FBQUEsbUJBSmhDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBS0E7QUFBQSxjQUVBLHVCQUFDLFNBQUksV0FBVSxpQkFDYjtBQUFBLHVDQUFDLFFBQUcsV0FBVSw4Q0FBNkMsNENBQTNEO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxnQkFDQSx1QkFBQyxPQUFFLFdBQVUsMkRBQTBELGtGQUF2RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsbUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFPQTtBQUFBLGNBRUEsdUJBQUMsU0FBSSxXQUFVLGdHQUNiO0FBQUEsdUNBQUMsVUFBSyxXQUFVLGtCQUFpQixnQ0FBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBaUQ7QUFBQSxnQkFDakQsdUJBQUMsVUFBSyxXQUFXLEdBQUcsYUFBYSxrQkFBa0IsMkJBQTJCLGdCQUFnQixJQUFJLCtCQUFsRztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsbUJBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFLQTtBQUFBO0FBQUE7QUFBQSxVQW5DRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFvQ0E7QUFBQSxRQUdBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU07QUFBRSxrQkFBSSxDQUFDLFVBQVcsYUFBWSxlQUFlO0FBQUEsWUFBRztBQUFBLFlBQy9ELFdBQVcsK0ZBQ1QsYUFBYSxrQkFDVCx3RkFDQSxzRkFDTjtBQUFBLFlBQ0EsSUFBRztBQUFBLFlBR0Y7QUFBQSwyQkFBYSxtQkFDWix1QkFBQyxTQUFJLFdBQVUsb0RBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZ0U7QUFBQSxjQUdsRSx1QkFBQyxTQUFJLFdBQVUscUNBQ2I7QUFBQSx1Q0FBQyxVQUFLLFdBQVUseUVBQXdFLDJCQUF4RjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsZ0JBQ0EsdUJBQUMsVUFBSyxXQUFVLFdBQVUsdUJBQTFCO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQWlDO0FBQUEsbUJBSm5DO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBS0E7QUFBQSxjQUVBLHVCQUFDLFNBQUksV0FBVSxpQkFDYjtBQUFBLHVDQUFDLFFBQUcsV0FBVSw4Q0FBNkMsNkNBQTNEO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxnQkFDQSx1QkFBQyxPQUFFLFdBQVUsMkRBQTBELG9GQUF2RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsbUJBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFPQTtBQUFBLGNBRUEsdUJBQUMsU0FBSSxXQUFVLGdHQUNiO0FBQUEsdUNBQUMsVUFBSyxXQUFVLGtCQUFpQixnQ0FBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBaUQ7QUFBQSxnQkFDakQsdUJBQUMsVUFBSyxXQUFXLEdBQUcsYUFBYSxrQkFBa0IsNEJBQTRCLGdCQUFnQixJQUFJLCtCQUFuRztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUVBO0FBQUEsbUJBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFLQTtBQUFBO0FBQUE7QUFBQSxVQW5DRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFvQ0E7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSxzSEFBcUgsSUFBRywyQkFDckk7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsOERBQ2I7QUFBQSxtQ0FBQyxZQUFTLFdBQVUsOEJBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQStDO0FBQUEsWUFDL0MsdUJBQUMsVUFBSyxvQ0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEwQjtBQUFBLGVBRjVCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUFNO0FBQUEsYUFKUjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTUE7QUFBQSxXQTNGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBNkZBO0FBQUEsU0FsUUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQW9RQTtBQUFBLE9BblJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FxUkE7QUFFSjsiLCJuYW1lcyI6W119