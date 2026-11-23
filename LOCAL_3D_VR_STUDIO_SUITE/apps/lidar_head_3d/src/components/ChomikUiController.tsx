import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom from "/apps/lidar_head_3d/node_modules/.vite/deps/react-dom.js?v=04dca6e3"; const createPortal = __vite__cjsImport2_reactDom["createPortal"];
import { AppState, AppContent } from "/apps/lidar_head_3d/src/types.ts";
import { Sparkles, RefreshCcw, Info, Terminal } from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
import { motion } from "/apps/lidar_head_3d/node_modules/.vite/deps/motion_react.js?v=01c14a81";
export const TransitionOverlay = ({ isVisible, onComplete }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        if (onComplete) onComplete();
      }, 3e3);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);
  const content = /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.35 },
      className: "fixed inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4 border border-sky-500/40 overflow-hidden",
      id: "cyber_goggles_transition_overlay",
      children: [
        /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { y: "-10%" },
            animate: { y: "110%" },
            transition: { repeat: Infinity, duration: 1.5, ease: "linear" },
            className: "absolute left-0 right-0 h-[2.5px] bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.9)] z-30 pointer-events-none"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 37,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.06)_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 45,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex flex-col items-center max-w-xs w-full text-center z-20", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "relative w-36 h-36 flex items-center justify-center mb-4 bg-sky-950/20 rounded-full border border-sky-500/15 shadow-[inset_0_0_15px_rgba(14,165,233,0.2)]", children: [
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                animate: { rotate: 360 },
                transition: { repeat: Infinity, duration: 6, ease: "linear" },
                className: "absolute inset-1 border border-dashed border-sky-500/30 rounded-full"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 51,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                animate: { rotate: -360 },
                transition: { repeat: Infinity, duration: 12, ease: "linear" },
                className: "absolute inset-3 border border-dotted border-sky-400/25 rounded-full"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 56,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "relative flex flex-col items-center justify-center", children: [
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { scale: 0.4, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { delay: 0.1, type: "spring", stiffness: 120 },
                  className: "text-6xl select-none",
                  children: "🐹"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 65,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { y: -100, opacity: 0, scale: 2.5, rotate: -20 },
                  animate: { y: -24, opacity: 1, scale: 1.15, rotate: 0 },
                  transition: {
                    delay: 0.5,
                    type: "spring",
                    stiffness: 150,
                    damping: 8
                  },
                  className: "absolute text-4.5xl drop-shadow-[0_0_10px_rgba(56,189,248,0.9)] select-none",
                  children: "🕶️"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 75,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0 },
                  animate: { opacity: [0, 1, 1, 0], scale: [0, 1.4, 1.1, 0] },
                  transition: { delay: 1.4, duration: 0.9 },
                  className: "absolute top-[-22px] text-yellow-300 font-bold text-xs whitespace-nowrap",
                  children: "⚡ SLAY HARDWARE!"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 90,
                  columnNumber: 13
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 63,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 48,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 mb-3", children: [
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                initial: { opacity: 0, y: 4 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: 0.3 },
                className: "font-mono text-[8px] text-sky-400 font-black uppercase tracking-widest flex items-center justify-center gap-1",
                children: [
                  /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3 h-3 animate-pulse text-sky-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ChomikUiController.tsx",
                    lineNumber: 109,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "MOCY CHROMATORA: 100%" }, void 0, false, {
                    fileName: "/app/applet/src/components/ChomikUiController.tsx",
                    lineNumber: 110,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 103,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              motion.h3,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.6 },
                className: "font-sans text-xs font-black text-slate-100 tracking-tight",
                children: "BUŁA INICJUJE CYBER-GOGLE ⚡"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 112,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 102,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-950/80 border border-sky-950/50 rounded-lg p-2 text-left font-mono text-[7px] text-sky-300/80 space-y-0.5 select-none shadow-[0_4px_12px_rgba(0,0,0,0.4)]", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "> SENSOR_CONFIG_ENFORCED" }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 125,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "142 LUMA" }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 126,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 124,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "> MOUNTING CYBERNETIC_HUD..." }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 129,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "STABLE" }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 130,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 128,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 123,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 47,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/ChomikUiController.tsx",
      lineNumber: 28,
      columnNumber: 5
    },
    this
  );
  const headerEl = typeof document !== "undefined" ? document.getElementById("app_header") : null;
  if (headerEl) {
    return createPortal(content, headerEl);
  }
  return content;
};
export function getBulaHumor(faceDetected, metrics, isReadyToCapture, isLumaOk, isDistanceOk, isRotationOk, isSharpnessOk, capture) {
  if (capture) {
    return {
      emoji: "📦",
      message: "Buła spakował dane do nory! Gotowe do wysyłki!",
      subtext: "Wysyłaj do klubowiczów, zanim Buła sam to zje!",
      color: "border-emerald-500/50 bg-emerald-950/30 text-emerald-400"
    };
  }
  if (!faceDetected && !isReadyToCapture) {
    return {
      emoji: "🐹",
      message: "Buła uciekł z kadru! Wróć do klubu!",
      subtext: "Wypatrujemy uroczej mordki przed obiektywem...",
      color: "border-slate-800 bg-slate-950/60 text-slate-400"
    };
  }
  if (!isLumaOk) {
    if (metrics.luma > 210) {
      return {
        emoji: "🕶️",
        message: "Za jasno! Buła oślepł, zgaś trochę światła!",
        subtext: "Słońce razi chomika po ślepiach, uciekaj w cień!",
        color: "border-amber-500/50 bg-amber-950/20 text-amber-400"
      };
    } else {
      return {
        emoji: "🔦",
        message: "Ciemno jak w norze! Doświetl Bułę, bo nic nie widzi!",
        subtext: "Odpal jakąś świeczkę albo rzuć światło na tę scenę!",
        color: "border-sky-500/50 bg-sky-950/20 text-sky-400"
      };
    }
  }
  if (!isDistanceOk) {
    if (metrics.distance > 0.4) {
      return {
        emoji: "📏",
        message: "Za daleko! Buła nie ma takiego wzroku, podejdź bliżej!",
        subtext: "Zmniejsz dystans poniżej 40 cm. Trzymaj fason!",
        color: "border-amber-500/50 bg-amber-950/20 text-amber-400"
      };
    } else {
      return {
        emoji: "🛑",
        message: "Ała! Buła dostanie klaustrofobii! Cofnij się trochę!",
        subtext: "Zrób krok w tył, chomik potrzebuje przestrzeni osobistej!",
        color: "border-red-500/50 bg-red-950/20 text-red-400"
      };
    }
  }
  if (!isRotationOk) {
    return {
      emoji: "🔄",
      message: "Buła się wierci! Trzymaj fason, chomiku!",
      subtext: "Wyprostuj głowę i patrz prosto w serce sensora LiDAR.",
      color: "border-amber-500/50 bg-amber-950/20 text-amber-400"
    };
  }
  if (!isSharpnessOk) {
    return {
      emoji: "👓",
      message: "Wyczyść szybkę! Buła widzi wszystko jak przez mgłę!",
      subtext: "Zatrzymaj drżenie rąk albo przetrzyj obiektyw koszulką.",
      color: "border-rose-500/50 bg-rose-950/20 text-rose-400"
    };
  }
  if (metrics.stabilityMs < 2e3) {
    return {
      emoji: "⏳",
      message: "Buła obczaja sytuację... Trzymaj fason, nie ruszaj się!",
      subtext: `Dwell-time kalibracja: ${Math.round(metrics.stabilityMs / 2e3 * 100)}% zablokowane.`,
      color: "border-sky-500/50 bg-sky-950/20 text-sky-400"
    };
  }
  if (isReadyToCapture) {
    return {
      emoji: "🔥",
      message: "Buła melduje gotowość! Klikaj wielki guzik, chomiku!",
      subtext: "Siatka spójna, LiDAR napełniony, fuzja sensoryczna locked!",
      color: "border-emerald-500 bg-emerald-950/40 text-emerald-400"
    };
  }
  return {
    emoji: "🐹",
    message: "Buła sprawdza, ile drewna przybyło!",
    subtext: "Strukturyzowanie chmury punktów w toku...",
    color: "border-slate-800 bg-slate-950/60 text-slate-400"
  };
}
export const ChomikUiController = ({
  metrics,
  isReadyToCapture,
  isLumaOk,
  isDistanceOk,
  isRotationOk,
  isSharpnessOk,
  capture,
  scanType,
  setScanType,
  liveFeedback,
  onCapture,
  onResetLocks,
  appState,
  setAppState
}) => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = React.useState(0);
  React.useEffect(() => {
    if (appState === AppState.quantum) {
      setCurrentQuoteIndex(Math.floor(Math.random() * AppContent.quantumEnterQuotes.length));
    }
  }, [appState]);
  const humor = getBulaHumor(
    metrics.faceDetected,
    metrics,
    isReadyToCapture,
    isLumaOk,
    isDistanceOk,
    isRotationOk,
    isSharpnessOk,
    capture
  );
  let displayMessage = humor.message;
  let displaySubtext = humor.subtext;
  let displayEmoji = humor.emoji;
  let displayColor = humor.color;
  if (appState === AppState.chill) {
    displayEmoji = "🐹";
    displayMessage = "Siemanko! Gotowy na Twój " + AppContent.slangDict["scan"] + "?";
    displaySubtext = "Zaraz odpalimy Deep Dive. Kliknij 'OGARNIJ MNIE', żebym założył cyber-gogle!";
    displayColor = "border-amber-500/50 bg-amber-950/20 text-amber-400";
  } else {
    if (metrics.stabilityMs > 0 && metrics.stabilityMs < 2e3 && !capture) {
      displayEmoji = "🕶️";
      displayMessage = AppContent.scanFeedback;
      displaySubtext = `Analizowanie chmury punktów: ${Math.round(metrics.stabilityMs / 2e3 * 100)}% coherent.`;
      displayColor = "border-sky-500/50 bg-sky-950/20 text-sky-400 animate-pulse";
    } else if (capture) {
      displayEmoji = "🏆";
      displayMessage = `${AppContent.slangDict["success"]} Twoje Statsy są już bezpieczne w norze chomika! Skan zakończony!`;
      displaySubtext = "Pomyślnie zrekonstruowano siatkę 3D.";
      displayColor = "border-emerald-500/50 bg-emerald-950/30 text-emerald-400";
    } else {
      displayEmoji = "🕶️";
      displayMessage = AppContent.quantumEnterQuotes[currentQuoteIndex];
      displaySubtext = "Utrzymuj odległość 25-40 cm od sensora LiDAR.";
      displayColor = "border-sky-500 bg-sky-950/40 text-sky-300";
    }
  }
  const handleMainButtonClick = () => {
    if (appState === AppState.chill) {
      setAppState(AppState.quantum);
    } else {
      if (isReadyToCapture) {
        onCapture();
      }
    }
  };
  const progressPct = appState === AppState.quantum ? Math.min(100, metrics.stabilityMs / 2e3 * 100) : 0;
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4 relative", id: "chomik_ui_controller_root", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex bg-slate-950/90 border border-slate-900 rounded-xl p-1.5 gap-1.5", id: "bula_mode_toggle_bar", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          onClick: () => setAppState(AppState.chill),
          className: `flex-1 font-mono text-[9px] font-bold py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${appState === AppState.chill ? "bg-amber-950/60 border border-amber-500/40 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)]" : "text-slate-500 hover:text-slate-300 border border-transparent"}`,
          id: "toggle_mode_chill",
          children: [
            /* @__PURE__ */ jsxDEV("span", { children: "🐹" }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 365,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: AppContent.modeCartoon }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 366,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 355,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "button",
          onClick: () => setAppState(AppState.quantum),
          className: `flex-1 font-mono text-[9px] font-bold py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${appState === AppState.quantum ? "bg-sky-950/60 border border-sky-500/40 text-sky-400 shadow-[0_0_10px_rgba(14,165,233,0.15)]" : "text-slate-500 hover:text-slate-300 border border-transparent"}`,
          id: "toggle_mode_quantum",
          children: [
            /* @__PURE__ */ jsxDEV("span", { children: "⚡" }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 378,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: AppContent.modeQuantum }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 379,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 368,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ChomikUiController.tsx",
      lineNumber: 354,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-800 rounded-xl p-4 bg-slate-950/90 relative overflow-hidden", id: "chomik_live_dashboard", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-[50px] rounded-full pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ChomikUiController.tsx",
        lineNumber: 387,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ChomikUiController.tsx",
        lineNumber: 388,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-900 pb-2 mb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 font-mono text-[10px] font-bold text-slate-400 tracking-wider", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[14px]", role: "img", "aria-label": "hamster", children: "🐹" }, void 0, false, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 393,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "KLUB CHOMIKA: LIVE MONITOR" }, void 0, false, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 394,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 392,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: `font-mono text-[10px] font-black border px-2 py-0.5 rounded shadow-[0_0_8px_rgba(16,185,129,0.15)] transition-all ${appState === AppState.quantum ? "text-emerald-400 bg-emerald-950/60 border-emerald-800/40" : "text-slate-500 bg-slate-950 border-slate-900"}`,
              id: "quantum_mode_ui_dashboard",
              children: [
                "STABILITY: ",
                Math.round(metrics.stabilityMs / 2e3 * 100),
                "%"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 397,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500 uppercase tracking-widest bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800", children: "DASHBOARD_LIVE" }, void 0, false, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 407,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 396,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ChomikUiController.tsx",
        lineNumber: 391,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-3.5 items-start bg-slate-950/40 p-3 rounded-lg border border-slate-900/60", id: "bula_speech_bubble_container", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxDEV("div", { className: `w-12 h-12 rounded-full border flex items-center justify-center text-2xl transition-all duration-300 shadow-lg relative ${displayColor}`, children: [
            metrics.stabilityMs > 0 && metrics.stabilityMs < 2e3 && !capture && appState === AppState.quantum && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 rounded-full border-t-2 border-r-2 border-sky-400 animate-spin pointer-events-none" }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 421,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: displayEmoji }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 423,
              columnNumber: 15
            }, this),
            appState === AppState.quantum && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 rounded-full border border-sky-400/40 bg-sky-950/20 pointer-events-none flex items-center justify-center overflow-hidden", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute w-full h-0.5 bg-sky-400 animate-bounce" }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 428,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "absolute text-[6px] bg-slate-950 text-sky-400 font-mono px-0.5 rounded scale-[0.8] -bottom-1", children: "QT_MODE" }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 429,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 427,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 418,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-slate-500 uppercase tracking-wider font-bold", children: "BUŁA" }, void 0, false, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 433,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 417,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-w-0 flex flex-col justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "relative bg-slate-900/90 border border-slate-800 p-2.5 rounded-lg text-slate-100", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 -left-1.5 w-3 h-3 bg-slate-900 border-l border-b border-slate-800 rotate-45" }, void 0, false, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 440,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[11px] font-bold tracking-tight text-slate-200", children: [
            '"',
            displayMessage,
            '"'
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 442,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-slate-400 mt-1", children: displaySubtext }, void 0, false, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 445,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 438,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 437,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ChomikUiController.tsx",
        lineNumber: 414,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-slate-900", id: "chomik_dashboard_stats", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-950/60 rounded border border-slate-900/40 flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500 uppercase", children: [
            AppContent.slangDict["data"],
            " LiDAR (Live)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 457,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs font-bold text-sky-400", children: [
            metrics.faceDetected && appState === AppState.quantum ? metrics.lidarPointsCount.toLocaleString() : "0",
            " pts"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 458,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 456,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-950/60 rounded border border-slate-900/40 flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500 uppercase", children: "QUEST STABILIZACJI" }, void 0, false, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 465,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 bg-slate-900 h-1.5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "bg-emerald-500 h-full transition-all duration-150",
                style: { width: `${appState === AppState.quantum ? Math.min(100, metrics.stabilityMs / 2e3 * 100) : 0}%` }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 468,
                columnNumber: 17
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 467,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-emerald-400 font-bold shrink-0", children: [
              appState === AppState.quantum ? Math.round(metrics.stabilityMs / 2e3 * 100) : 0,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 473,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 466,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 464,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "col-span-2 sm:col-span-1 p-2 bg-slate-950/60 rounded border border-slate-900/40 flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500 uppercase", children: [
            AppContent.slangDict["analyze"],
            " OK"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 481,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs font-bold text-slate-300", children: [
              appState === AppState.quantum ? (metrics.qualityScore * 100).toFixed(0) : "0",
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 483,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `text-[8px] font-mono px-1 rounded ${metrics.qualityScore >= 0.96 && appState === AppState.quantum ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900" : "bg-amber-950/60 text-amber-400 border border-amber-900"}`, children: appState === AppState.quantum ? metrics.qualityScore >= 0.96 ? "SPÓJNA" : "NISKA" : "OCZEKIWANIE" }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 486,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 482,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 480,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ChomikUiController.tsx",
        lineNumber: 453,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ChomikUiController.tsx",
      lineNumber: 384,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-800 rounded-xl p-5 bg-gradient-to-b from-slate-950 to-slate-900/90 shadow-2xl relative", id: "thumb_zone_control_deck", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-3 font-mono text-[7px] text-slate-600 tracking-widest uppercase", children: "THUMB_ZONE_V3" }, void 0, false, {
        fileName: "/app/applet/src/components/ChomikUiController.tsx",
        lineNumber: 501,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4 items-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-full flex items-center justify-between gap-2.5 px-1 py-1", id: "thumb_ergonomic_controls", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-1 shrink-0 w-24", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setScanType("chomiki_twarz"),
                className: `w-14 h-14 rounded-xl border flex flex-col items-center justify-center transition-all ${scanType === "chomiki_twarz" ? "bg-emerald-950/70 border-emerald-500 text-emerald-400 scale-105 shadow-[0_0_12px_rgba(16,185,129,0.15)]" : "bg-slate-950/80 border-slate-850 text-slate-500 hover:text-slate-300 hover:border-slate-700"}`,
                title: "Skan Twarzy - Chomik Bandana",
                id: "btn_select_chomiki_twarz",
                children: /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "🐹🧣" }, void 0, false, {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 523,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 512,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-center font-bold tracking-wider leading-tight text-slate-400 uppercase", children: [
              "Bandana",
              /* @__PURE__ */ jsxDEV("span", { className: "block text-[7px] font-normal text-slate-500", children: "(Twarz)" }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 527,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 525,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 511,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center shrink-0", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "relative w-24 h-24 flex items-center justify-center animate-none", id: "start_scan_button", children: [
              /* @__PURE__ */ jsxDEV("svg", { className: `absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none z-10 transition-opacity duration-300 ${appState === AppState.quantum ? "opacity-100" : "opacity-30"}`, viewBox: "0 0 96 96", children: [
                /* @__PURE__ */ jsxDEV(
                  "circle",
                  {
                    cx: "48",
                    cy: "48",
                    r: "42",
                    className: "stroke-slate-900",
                    strokeWidth: "3.5",
                    fill: "transparent"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ChomikUiController.tsx",
                    lineNumber: 537,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  motion.circle,
                  {
                    cx: "48",
                    cy: "48",
                    r: "42",
                    className: `${progressPct >= 100 ? "stroke-emerald-400" : "stroke-sky-400"}`,
                    strokeWidth: "4",
                    fill: "transparent",
                    strokeDasharray: 263.89,
                    strokeDashoffset: 263.89 - progressPct / 100 * 263.89,
                    strokeLinecap: "round",
                    animate: { strokeDashoffset: 263.89 - progressPct / 100 * 263.89 },
                    transition: { duration: 0.15, ease: "easeOut" },
                    style: {
                      filter: progressPct > 0 ? "drop-shadow(0 0 4px rgba(56, 189, 248, 0.5))" : "none"
                    }
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ChomikUiController.tsx",
                    lineNumber: 546,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 535,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: `absolute left-[92px] top-[14px] bg-slate-950/95 border rounded-full px-2 py-1 flex flex-col items-center justify-center z-30 min-w-[70px] pointer-events-none transition-all duration-300 ${appState === AppState.quantum ? "border-sky-500/50 shadow-[0_0_12px_rgba(14,165,233,0.35)] opacity-100" : "border-slate-800 shadow-none opacity-60"}`,
                  id: "ring_adjacent_stability_percentage_label",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[6px] text-sky-400 font-bold uppercase tracking-wider whitespace-nowrap", children: "STABILITY" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChomikUiController.tsx",
                      lineNumber: 573,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs font-black text-emerald-400 animate-pulse", children: [
                      Math.round(metrics.stabilityMs / 2e3 * 100),
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ChomikUiController.tsx",
                      lineNumber: 574,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 565,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                motion.button,
                {
                  type: "button",
                  whileTap: { scale: 0.9 },
                  disabled: appState === AppState.quantum && !isReadyToCapture,
                  onClick: handleMainButtonClick,
                  className: `w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center relative transition-all duration-300 z-20 ${appState === AppState.chill ? "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 border-amber-300 text-slate-950 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.3)]" : isReadyToCapture ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-emerald-300 text-slate-950 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.35)] animate-pulse" : "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"}`,
                  style: { width: "80px", height: "80px" },
                  id: "central_thumb_scan_btn",
                  children: [
                    (appState === AppState.chill || isReadyToCapture) && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 rounded-full border-4 border-amber-400 animate-ping opacity-25" }, void 0, false, {
                      fileName: "/app/applet/src/components/ChomikUiController.tsx",
                      lineNumber: 596,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: `w-5 h-5 mb-0.5 ${appState === AppState.chill || isReadyToCapture ? "text-slate-950" : "text-slate-600"}` }, void 0, false, {
                      fileName: "/app/applet/src/components/ChomikUiController.tsx",
                      lineNumber: 599,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-[8px] font-black tracking-tighter leading-none text-center", children: [
                      appState === AppState.chill ? "OGARNIJ" : "START",
                      /* @__PURE__ */ jsxDEV("span", { className: "block text-[7px]", children: appState === AppState.chill ? "MNIE!" : "SKANU" }, void 0, false, {
                        fileName: "/app/applet/src/components/ChomikUiController.tsx",
                        lineNumber: 602,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ChomikUiController.tsx",
                      lineNumber: 600,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 579,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 533,
              columnNumber: 15
            }, this),
            appState === AppState.quantum ? /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-0.5 mt-1", id: "glow_up_progress_indicator", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] font-black text-sky-400 uppercase tracking-widest animate-pulse", children: "GLOW-UP PROGRESS" }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 609,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-emerald-400 font-bold", children: metrics.stabilityMs >= 2e3 ? "SIATKA BUŁY GOTOWA! ✨" : `BUDOWANIE SIATKI: ${Math.round(metrics.stabilityMs / 2e3 * 100)}%` }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 612,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 608,
              columnNumber: 17
            }, this) : /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-slate-500 uppercase tracking-widest mt-1.5 font-bold", children: appState === AppState.chill ? "ODPAL QUANTUM" : "OCZEKIWANIE" }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 617,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 532,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-1 shrink-0 w-24", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setScanType("oponka_brzuch"),
                className: `w-14 h-14 rounded-xl border flex flex-col items-center justify-center transition-all ${scanType === "oponka_brzuch" ? "bg-amber-950/70 border-amber-500 text-amber-400 scale-105 shadow-[0_0_12px_rgba(245,158,11,0.15)]" : "bg-slate-950/80 border-slate-850 text-slate-500 hover:text-slate-300 hover:border-slate-700"}`,
                title: "Skan Brzucha - Chomik w Dresie",
                id: "btn_select_oponka_brzuch",
                children: /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "🐹🏃‍♂️" }, void 0, false, {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 636,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 625,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-center font-bold tracking-wider leading-tight text-slate-400 uppercase", children: [
              "Dresiarz",
              /* @__PURE__ */ jsxDEV("span", { className: "block text-[7px] font-normal text-slate-500", children: "(Ciało)" }, void 0, false, {
                fileName: "/app/applet/src/components/ChomikUiController.tsx",
                lineNumber: 640,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 638,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 624,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 508,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full border-t border-slate-900/60 pt-2 flex items-center justify-between text-[8px] font-mono text-slate-500 px-1", id: "thumb_deck_aux_row", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Info, { className: "w-3 h-3 text-slate-600" }, void 0, false, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 649,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Dla fanów ",
              AppContent.slangDict["expert"],
              " i klubu chomika"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 650,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ChomikUiController.tsx",
            lineNumber: 648,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: onResetLocks,
              className: "text-[8px] text-slate-400 hover:text-sky-400 flex items-center gap-1 transition-colors uppercase font-bold py-0.5 px-2 bg-slate-950 rounded border border-slate-900",
              id: "release_locks_thumb_deck_btn",
              children: [
                /* @__PURE__ */ jsxDEV(RefreshCcw, { className: "w-2.5 h-2.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 658,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Resetuj Locki" }, void 0, false, {
                  fileName: "/app/applet/src/components/ChomikUiController.tsx",
                  lineNumber: 659,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ChomikUiController.tsx",
              lineNumber: 652,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ChomikUiController.tsx",
          lineNumber: 647,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ChomikUiController.tsx",
        lineNumber: 505,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ChomikUiController.tsx",
      lineNumber: 499,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ChomikUiController.tsx",
    lineNumber: 351,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNob21pa1VpQ29udHJvbGxlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IENhbGlicmF0aW9uTWV0cmljcywgTGl2ZUZlZWRiYWNrU2V0dGluZ3MsIEFwcFN0YXRlLCBBcHBDb250ZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgU3BhcmtsZXMsIFJlZnJlc2hDY3csIFNoaWVsZENoZWNrLCBGb290cHJpbnRzLCBTbWlsZSwgSW5mbywgRXllLCBFeWVPZmYsIFRlcm1pbmFsLCBBY3Rpdml0eSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbmludGVyZmFjZSBUcmFuc2l0aW9uT3ZlcmxheVByb3BzIHtcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuICBvbkNvbXBsZXRlPzogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IFRyYW5zaXRpb25PdmVybGF5OiBSZWFjdC5GQzxUcmFuc2l0aW9uT3ZlcmxheVByb3BzPiA9ICh7IGlzVmlzaWJsZSwgb25Db21wbGV0ZSB9KSA9PiB7XG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKG9uQ29tcGxldGUpIG9uQ29tcGxldGUoKTtcbiAgICAgIH0sIDMwMDApO1xuICAgICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICB9LCBbaXNWaXNpYmxlLCBvbkNvbXBsZXRlXSk7XG5cbiAgY29uc3QgY29udGVudCA9IChcbiAgICA8bW90aW9uLmRpdlxuICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19XG4gICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4zNSB9fVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCBiZy1zbGF0ZS05NTAvOTUgYmFja2Ryb3AtYmx1ci1tZCB6LTUwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBib3JkZXIgYm9yZGVyLXNreS01MDAvNDAgb3ZlcmZsb3ctaGlkZGVuXCJcbiAgICAgIGlkPVwiY3liZXJfZ29nZ2xlc190cmFuc2l0aW9uX292ZXJsYXlcIlxuICAgID5cbiAgICAgIHsvKiBMYXNlciAvIFNjYW5uZXIgc2NhbiBsaW5lICovfVxuICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgaW5pdGlhbD17eyB5OiAnLTEwJScgfX1cbiAgICAgICAgYW5pbWF0ZT17eyB5OiAnMTEwJScgfX1cbiAgICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogMS41LCBlYXNlOiAnbGluZWFyJyB9fVxuICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTAgcmlnaHQtMCBoLVsyLjVweF0gYmctc2t5LTQwMCBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoNTYsMTg5LDI0OCwwLjkpXSB6LTMwIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgLz5cblxuICAgICAgey8qIEN5YmVybmV0aWMgbWF0cml4IGdyaWQgYmFja2dyb3VuZCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bbGluZWFyLWdyYWRpZW50KHJnYmEoMTQsMTY1LDIzMywwLjA2KV8xcHgsdHJhbnNwYXJlbnRfMXB4KSxsaW5lYXItZ3JhZGllbnQoOTBkZWcscmdiYSgxNCwxNjUsMjMzLDAuMDYpXzFweCx0cmFuc3BhcmVudF8xcHgpXSBiZy1bc2l6ZToxNnB4XzE2cHhdIG9wYWNpdHktNDAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgbWF4LXcteHMgdy1mdWxsIHRleHQtY2VudGVyIHotMjBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LTM2IGgtMzYgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbWItNCBiZy1za3ktOTUwLzIwIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXNreS01MDAvMTUgc2hhZG93LVtpbnNldF8wXzBfMTVweF9yZ2JhKDE0LDE2NSwyMzMsMC4yKV1cIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogU2Nhbm5pbmcgUmFkYXIgUmluZ3MgKi99XG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGFuaW1hdGU9e3sgcm90YXRlOiAzNjAgfX1cbiAgICAgICAgICAgIHRyYW5zaXRpb249e3sgcmVwZWF0OiBJbmZpbml0eSwgZHVyYXRpb246IDYsIGVhc2U6ICdsaW5lYXInIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0xIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1za3ktNTAwLzMwIHJvdW5kZWQtZnVsbFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgYW5pbWF0ZT17eyByb3RhdGU6IC0zNjAgfX1cbiAgICAgICAgICAgIHRyYW5zaXRpb249e3sgcmVwZWF0OiBJbmZpbml0eSwgZHVyYXRpb246IDEyLCBlYXNlOiAnbGluZWFyJyB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMyBib3JkZXIgYm9yZGVyLWRvdHRlZCBib3JkZXItc2t5LTQwMC8yNSByb3VuZGVkLWZ1bGxcIlxuICAgICAgICAgIC8+XG5cbiAgICAgICAgICB7LyogQ2VudHJhbCBHb2dnbGVzIEFuaW1hdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICB7LyogSGFtc3RlciBGYWNlICovfVxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBzY2FsZTogMC40LCBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IDEsIG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMC4xLCB0eXBlOiAnc3ByaW5nJywgc3RpZmZuZXNzOiAxMjAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC02eGwgc2VsZWN0LW5vbmVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDwn5C5XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG5cbiAgICAgICAgICAgIHsvKiBEZXNjZW5kaW5nIEN5YmVyIEdvZ2dsZXMgd2l0aCBTcHJpbmcgQm91bmNlICovfVxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyB5OiAtMTAwLCBvcGFjaXR5OiAwLCBzY2FsZTogMi41LCByb3RhdGU6IC0yMCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IHk6IC0yNCwgb3BhY2l0eTogMSwgc2NhbGU6IDEuMTUsIHJvdGF0ZTogMCB9fVxuICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IFxuICAgICAgICAgICAgICAgIGRlbGF5OiAwLjUsIFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzcHJpbmcnLCBcbiAgICAgICAgICAgICAgICBzdGlmZm5lc3M6IDE1MCwgXG4gICAgICAgICAgICAgICAgZGFtcGluZzogOCBcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdGV4dC00LjV4bCBkcm9wLXNoYWRvdy1bMF8wXzEwcHhfcmdiYSg1NiwxODksMjQ4LDAuOSldIHNlbGVjdC1ub25lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg8J+Vtu+4j1xuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuXG4gICAgICAgICAgICB7LyogQ3liZXIgU2NhbiBUZXh0IEJ1cnN0ICovfVxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IFswLCAxLCAxLCAwXSwgc2NhbGU6IFswLCAxLjQsIDEuMSwgMF0gfX1cbiAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkZWxheTogMS40LCBkdXJhdGlvbjogMC45IH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC1bLTIycHhdIHRleHQteWVsbG93LTMwMCBmb250LWJvbGQgdGV4dC14cyB3aGl0ZXNwYWNlLW5vd3JhcFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIOKaoSBTTEFZIEhBUkRXQVJFIVxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogU3RhdHVzIHRleHRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSBtYi0zXCI+XG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogNCB9fVxuICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjMgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2t5LTQwMCBmb250LWJsYWNrIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTMgaC0zIGFuaW1hdGUtcHVsc2UgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPk1PQ1kgQ0hST01BVE9SQTogMTAwJTwvc3Bhbj5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgPG1vdGlvbi5oM1xuICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZGVsYXk6IDAuNiB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQteHMgZm9udC1ibGFjayB0ZXh0LXNsYXRlLTEwMCB0cmFja2luZy10aWdodFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQlXFgUEgSU5JQ0pVSkUgQ1lCRVItR09HTEUg4pqhXG4gICAgICAgICAgPC9tb3Rpb24uaDM+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSZWFsLXRpbWUgc2Nyb2xsIGxvZyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2t5LTk1MC81MCByb3VuZGVkLWxnIHAtMiB0ZXh0LWxlZnQgZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1za3ktMzAwLzgwIHNwYWNlLXktMC41IHNlbGVjdC1ub25lIHNoYWRvdy1bMF80cHhfMTJweF9yZ2JhKDAsMCwwLDAuNCldXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPiZndDsgU0VOU09SX0NPTkZJR19FTkZPUkNFRDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+MTQyIExVTUE8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPiZndDsgTU9VTlRJTkcgQ1lCRVJORVRJQ19IVUQuLi48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPlNUQUJMRTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21vdGlvbi5kaXY+XG4gICk7XG5cbiAgY29uc3QgaGVhZGVyRWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcF9oZWFkZXInKSA6IG51bGw7XG4gIGlmIChoZWFkZXJFbCkge1xuICAgIHJldHVybiBjcmVhdGVQb3J0YWwoY29udGVudCwgaGVhZGVyRWwpO1xuICB9XG4gIHJldHVybiBjb250ZW50O1xufTtcblxuaW50ZXJmYWNlIENob21pa1VpQ29udHJvbGxlclByb3BzIHtcbiAgbWV0cmljczogQ2FsaWJyYXRpb25NZXRyaWNzO1xuICBpc1JlYWR5VG9DYXB0dXJlOiBib29sZWFuO1xuICBpc0x1bWFPazogYm9vbGVhbjtcbiAgaXNEaXN0YW5jZU9rOiBib29sZWFuO1xuICBpc1JvdGF0aW9uT2s6IGJvb2xlYW47XG4gIGlzU2hhcnBuZXNzT2s6IGJvb2xlYW47XG4gIGNhcHR1cmU6IGFueTtcbiAgc2NhblR5cGU6IHN0cmluZztcbiAgc2V0U2NhblR5cGU6ICh0eXBlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGxpdmVGZWVkYmFjazogTGl2ZUZlZWRiYWNrU2V0dGluZ3M7XG4gIG9uQ2FwdHVyZTogKCkgPT4gdm9pZDtcbiAgb25SZXNldExvY2tzOiAoKSA9PiB2b2lkO1xuICBhcHBTdGF0ZTogQXBwU3RhdGU7XG4gIHNldEFwcFN0YXRlOiAoc3RhdGU6IEFwcFN0YXRlKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QnVsYUh1bW9yKFxuICBmYWNlRGV0ZWN0ZWQ6IGJvb2xlYW4sXG4gIG1ldHJpY3M6IENhbGlicmF0aW9uTWV0cmljcyxcbiAgaXNSZWFkeVRvQ2FwdHVyZTogYm9vbGVhbixcbiAgaXNMdW1hT2s6IGJvb2xlYW4sXG4gIGlzRGlzdGFuY2VPazogYm9vbGVhbixcbiAgaXNSb3RhdGlvbk9rOiBib29sZWFuLFxuICBpc1NoYXJwbmVzc09rOiBib29sZWFuLFxuICBjYXB0dXJlOiBhbnlcbikge1xuICBpZiAoY2FwdHVyZSkge1xuICAgIHJldHVybiB7XG4gICAgICBlbW9qaTogXCLwn5OmXCIsXG4gICAgICBtZXNzYWdlOiBcIkJ1xYJhIHNwYWtvd2HFgiBkYW5lIGRvIG5vcnkhIEdvdG93ZSBkbyB3eXN5xYJraSFcIixcbiAgICAgIHN1YnRleHQ6IFwiV3lzecWCYWogZG8ga2x1Ym93aWN6w7N3LCB6YW5pbSBCdcWCYSBzYW0gdG8gemplIVwiLFxuICAgICAgY29sb3I6IFwiYm9yZGVyLWVtZXJhbGQtNTAwLzUwIGJnLWVtZXJhbGQtOTUwLzMwIHRleHQtZW1lcmFsZC00MDBcIlxuICAgIH07XG4gIH1cblxuICBpZiAoIWZhY2VEZXRlY3RlZCAmJiAhaXNSZWFkeVRvQ2FwdHVyZSkge1xuICAgIHJldHVybiB7XG4gICAgICBlbW9qaTogXCLwn5C5XCIsXG4gICAgICBtZXNzYWdlOiBcIkJ1xYJhIHVjaWVrxYIgeiBrYWRydSEgV3LDs8SHIGRvIGtsdWJ1IVwiLFxuICAgICAgc3VidGV4dDogXCJXeXBhdHJ1amVteSB1cm9jemVqIG1vcmRraSBwcnplZCBvYmlla3R5d2VtLi4uXCIsXG4gICAgICBjb2xvcjogXCJib3JkZXItc2xhdGUtODAwIGJnLXNsYXRlLTk1MC82MCB0ZXh0LXNsYXRlLTQwMFwiXG4gICAgfTtcbiAgfVxuXG4gIGlmICghaXNMdW1hT2spIHtcbiAgICBpZiAobWV0cmljcy5sdW1hID4gMjEwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbW9qaTogXCLwn5W277iPXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiWmEgamFzbm8hIEJ1xYJhIG/Fm2xlcMWCLCB6Z2HFmyB0cm9jaMSZIMWbd2lhdMWCYSFcIixcbiAgICAgICAgc3VidGV4dDogXCJTxYJvxYRjZSByYXppIGNob21pa2EgcG8gxZtsZXBpYWNoLCB1Y2lla2FqIHcgY2llxYQhXCIsXG4gICAgICAgIGNvbG9yOiBcImJvcmRlci1hbWJlci01MDAvNTAgYmctYW1iZXItOTUwLzIwIHRleHQtYW1iZXItNDAwXCJcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVtb2ppOiBcIvCflKZcIixcbiAgICAgICAgbWVzc2FnZTogXCJDaWVtbm8gamFrIHcgbm9yemUhIERvxZt3aWV0bCBCdcWCxJksIGJvIG5pYyBuaWUgd2lkemkhXCIsXG4gICAgICAgIHN1YnRleHQ6IFwiT2RwYWwgamFrxIXFmyDFm3dpZWN6a8SZIGFsYm8gcnp1xIcgxZt3aWF0xYJvIG5hIHTEmSBzY2VuxJkhXCIsXG4gICAgICAgIGNvbG9yOiBcImJvcmRlci1za3ktNTAwLzUwIGJnLXNreS05NTAvMjAgdGV4dC1za3ktNDAwXCJcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpc0Rpc3RhbmNlT2spIHtcbiAgICBpZiAobWV0cmljcy5kaXN0YW5jZSA+IDAuNDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGVtb2ppOiBcIvCfk49cIixcbiAgICAgICAgbWVzc2FnZTogXCJaYSBkYWxla28hIEJ1xYJhIG5pZSBtYSB0YWtpZWdvIHd6cm9rdSwgcG9kZWpkxbogYmxpxbxlaiFcIixcbiAgICAgICAgc3VidGV4dDogXCJabW5pZWpzeiBkeXN0YW5zIHBvbmnFvGVqIDQwIGNtLiBUcnp5bWFqIGZhc29uIVwiLFxuICAgICAgICBjb2xvcjogXCJib3JkZXItYW1iZXItNTAwLzUwIGJnLWFtYmVyLTk1MC8yMCB0ZXh0LWFtYmVyLTQwMFwiXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlbW9qaTogXCLwn5uRXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiQcWCYSEgQnXFgmEgZG9zdGFuaWUga2xhdXN0cm9mb2JpaSEgQ29mbmlqIHNpxJkgdHJvY2jEmSFcIixcbiAgICAgICAgc3VidGV4dDogXCJacsOzYiBrcm9rIHcgdHnFgiwgY2hvbWlrIHBvdHJ6ZWJ1amUgcHJ6ZXN0cnplbmkgb3NvYmlzdGVqIVwiLFxuICAgICAgICBjb2xvcjogXCJib3JkZXItcmVkLTUwMC81MCBiZy1yZWQtOTUwLzIwIHRleHQtcmVkLTQwMFwiXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGlmICghaXNSb3RhdGlvbk9rKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVtb2ppOiBcIvCflIRcIixcbiAgICAgIG1lc3NhZ2U6IFwiQnXFgmEgc2nEmSB3aWVyY2khIFRyenltYWogZmFzb24sIGNob21pa3UhXCIsXG4gICAgICBzdWJ0ZXh0OiBcIld5cHJvc3R1aiBnxYJvd8SZIGkgcGF0cnogcHJvc3RvIHcgc2VyY2Ugc2Vuc29yYSBMaURBUi5cIixcbiAgICAgIGNvbG9yOiBcImJvcmRlci1hbWJlci01MDAvNTAgYmctYW1iZXItOTUwLzIwIHRleHQtYW1iZXItNDAwXCJcbiAgICB9O1xuICB9XG5cbiAgaWYgKCFpc1NoYXJwbmVzc09rKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVtb2ppOiBcIvCfkZNcIixcbiAgICAgIG1lc3NhZ2U6IFwiV3ljennFm8SHIHN6eWJrxJkhIEJ1xYJhIHdpZHppIHdzenlzdGtvIGphayBwcnpleiBtZ8WCxJkhXCIsXG4gICAgICBzdWJ0ZXh0OiBcIlphdHJ6eW1haiBkcsW8ZW5pZSByxIVrIGFsYm8gcHJ6ZXRyenlqIG9iaWVrdHl3IGtvc3p1bGvEhS5cIixcbiAgICAgIGNvbG9yOiBcImJvcmRlci1yb3NlLTUwMC81MCBiZy1yb3NlLTk1MC8yMCB0ZXh0LXJvc2UtNDAwXCJcbiAgICB9O1xuICB9XG5cbiAgaWYgKG1ldHJpY3Muc3RhYmlsaXR5TXMgPCAyMDAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVtb2ppOiBcIuKPs1wiLFxuICAgICAgbWVzc2FnZTogXCJCdcWCYSBvYmN6YWphIHN5dHVhY2rEmS4uLiBUcnp5bWFqIGZhc29uLCBuaWUgcnVzemFqIHNpxJkhXCIsXG4gICAgICBzdWJ0ZXh0OiBgRHdlbGwtdGltZSBrYWxpYnJhY2phOiAke01hdGgucm91bmQoKG1ldHJpY3Muc3RhYmlsaXR5TXMgLyAyMDAwKSAqIDEwMCl9JSB6YWJsb2tvd2FuZS5gLFxuICAgICAgY29sb3I6IFwiYm9yZGVyLXNreS01MDAvNTAgYmctc2t5LTk1MC8yMCB0ZXh0LXNreS00MDBcIlxuICAgIH07XG4gIH1cblxuICBpZiAoaXNSZWFkeVRvQ2FwdHVyZSkge1xuICAgIHJldHVybiB7XG4gICAgICBlbW9qaTogXCLwn5SlXCIsXG4gICAgICBtZXNzYWdlOiBcIkJ1xYJhIG1lbGR1amUgZ290b3dvxZvEhyEgS2xpa2FqIHdpZWxraSBndXppaywgY2hvbWlrdSFcIixcbiAgICAgIHN1YnRleHQ6IFwiU2lhdGthIHNww7NqbmEsIExpREFSIG5hcGXFgm5pb255LCBmdXpqYSBzZW5zb3J5Y3puYSBsb2NrZWQhXCIsXG4gICAgICBjb2xvcjogXCJib3JkZXItZW1lcmFsZC01MDAgYmctZW1lcmFsZC05NTAvNDAgdGV4dC1lbWVyYWxkLTQwMFwiXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZW1vamk6IFwi8J+QuVwiLFxuICAgIG1lc3NhZ2U6IFwiQnXFgmEgc3ByYXdkemEsIGlsZSBkcmV3bmEgcHJ6eWJ5xYJvIVwiLFxuICAgIHN1YnRleHQ6IFwiU3RydWt0dXJ5em93YW5pZSBjaG11cnkgcHVua3TDs3cgdyB0b2t1Li4uXCIsXG4gICAgY29sb3I6IFwiYm9yZGVyLXNsYXRlLTgwMCBiZy1zbGF0ZS05NTAvNjAgdGV4dC1zbGF0ZS00MDBcIlxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgQ2hvbWlrVWlDb250cm9sbGVyOiBSZWFjdC5GQzxDaG9taWtVaUNvbnRyb2xsZXJQcm9wcz4gPSAoe1xuICBtZXRyaWNzLFxuICBpc1JlYWR5VG9DYXB0dXJlLFxuICBpc0x1bWFPayxcbiAgaXNEaXN0YW5jZU9rLFxuICBpc1JvdGF0aW9uT2ssXG4gIGlzU2hhcnBuZXNzT2ssXG4gIGNhcHR1cmUsXG4gIHNjYW5UeXBlLFxuICBzZXRTY2FuVHlwZSxcbiAgbGl2ZUZlZWRiYWNrLFxuICBvbkNhcHR1cmUsXG4gIG9uUmVzZXRMb2NrcyxcbiAgYXBwU3RhdGUsXG4gIHNldEFwcFN0YXRlLFxufSkgPT4ge1xuICBjb25zdCBbY3VycmVudFF1b3RlSW5kZXgsIHNldEN1cnJlbnRRdW90ZUluZGV4XSA9IFJlYWN0LnVzZVN0YXRlKDApO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGFwcFN0YXRlID09PSBBcHBTdGF0ZS5xdWFudHVtKSB7XG4gICAgICBzZXRDdXJyZW50UXVvdGVJbmRleChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBBcHBDb250ZW50LnF1YW50dW1FbnRlclF1b3Rlcy5sZW5ndGgpKTtcbiAgICB9XG4gIH0sIFthcHBTdGF0ZV0pO1xuXG4gIGNvbnN0IGh1bW9yID0gZ2V0QnVsYUh1bW9yKFxuICAgIG1ldHJpY3MuZmFjZURldGVjdGVkLFxuICAgIG1ldHJpY3MsXG4gICAgaXNSZWFkeVRvQ2FwdHVyZSxcbiAgICBpc0x1bWFPayxcbiAgICBpc0Rpc3RhbmNlT2ssXG4gICAgaXNSb3RhdGlvbk9rLFxuICAgIGlzU2hhcnBuZXNzT2ssXG4gICAgY2FwdHVyZVxuICApO1xuXG4gIC8vIERldGVybWluZSBzcGVlY2ggdGV4dCBkeW5hbWljYWxseVxuICBsZXQgZGlzcGxheU1lc3NhZ2UgPSBodW1vci5tZXNzYWdlO1xuICBsZXQgZGlzcGxheVN1YnRleHQgPSBodW1vci5zdWJ0ZXh0O1xuICBsZXQgZGlzcGxheUVtb2ppID0gaHVtb3IuZW1vamk7XG4gIGxldCBkaXNwbGF5Q29sb3IgPSBodW1vci5jb2xvcjtcblxuICBpZiAoYXBwU3RhdGUgPT09IEFwcFN0YXRlLmNoaWxsKSB7XG4gICAgZGlzcGxheUVtb2ppID0gXCLwn5C5XCI7XG4gICAgZGlzcGxheU1lc3NhZ2UgPSBcIlNpZW1hbmtvISBHb3Rvd3kgbmEgVHfDs2ogXCIgKyBBcHBDb250ZW50LnNsYW5nRGljdFtcInNjYW5cIl0gKyBcIj9cIjtcbiAgICBkaXNwbGF5U3VidGV4dCA9IFwiWmFyYXogb2RwYWxpbXkgRGVlcCBEaXZlLiBLbGlrbmlqICdPR0FSTklKIE1OSUUnLCDFvGVieW0gemHFgm/FvHnFgiBjeWJlci1nb2dsZSFcIjtcbiAgICBkaXNwbGF5Q29sb3IgPSBcImJvcmRlci1hbWJlci01MDAvNTAgYmctYW1iZXItOTUwLzIwIHRleHQtYW1iZXItNDAwXCI7XG4gIH0gZWxzZSB7XG4gICAgLy8gUXVhbnR1bSBNb2RlIGFjdGl2ZVxuICAgIGlmIChtZXRyaWNzLnN0YWJpbGl0eU1zID4gMCAmJiBtZXRyaWNzLnN0YWJpbGl0eU1zIDwgMjAwMCAmJiAhY2FwdHVyZSkge1xuICAgICAgZGlzcGxheUVtb2ppID0gXCLwn5W277iPXCI7XG4gICAgICBkaXNwbGF5TWVzc2FnZSA9IEFwcENvbnRlbnQuc2NhbkZlZWRiYWNrOyAvLyBcIkJ1xYJhIGxpY3p5IHB1bmt0eSBMaURBUi4uLiBTbGF5aW4nIVwiXG4gICAgICBkaXNwbGF5U3VidGV4dCA9IGBBbmFsaXpvd2FuaWUgY2htdXJ5IHB1bmt0w7N3OiAke01hdGgucm91bmQoKG1ldHJpY3Muc3RhYmlsaXR5TXMgLyAyMDAwKSAqIDEwMCl9JSBjb2hlcmVudC5gO1xuICAgICAgZGlzcGxheUNvbG9yID0gXCJib3JkZXItc2t5LTUwMC81MCBiZy1za3ktOTUwLzIwIHRleHQtc2t5LTQwMCBhbmltYXRlLXB1bHNlXCI7XG4gICAgfSBlbHNlIGlmIChjYXB0dXJlKSB7XG4gICAgICBkaXNwbGF5RW1vamkgPSBcIvCfj4ZcIjtcbiAgICAgIGRpc3BsYXlNZXNzYWdlID0gYCR7QXBwQ29udGVudC5zbGFuZ0RpY3RbXCJzdWNjZXNzXCJdfSBUd29qZSBTdGF0c3kgc8SFIGp1xbwgYmV6cGllY3puZSB3IG5vcnplIGNob21pa2EhIFNrYW4gemFrb8WEY3pvbnkhYDtcbiAgICAgIGRpc3BsYXlTdWJ0ZXh0ID0gXCJQb215xZtsbmllIHpyZWtvbnN0cnVvd2FubyBzaWF0a8SZIDNELlwiO1xuICAgICAgZGlzcGxheUNvbG9yID0gXCJib3JkZXItZW1lcmFsZC01MDAvNTAgYmctZW1lcmFsZC05NTAvMzAgdGV4dC1lbWVyYWxkLTQwMFwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXNwbGF5RW1vamkgPSBcIvCflbbvuI9cIjtcbiAgICAgIGRpc3BsYXlNZXNzYWdlID0gQXBwQ29udGVudC5xdWFudHVtRW50ZXJRdW90ZXNbY3VycmVudFF1b3RlSW5kZXhdO1xuICAgICAgZGlzcGxheVN1YnRleHQgPSBcIlV0cnp5bXVqIG9kbGVnxYJvxZvEhyAyNS00MCBjbSBvZCBzZW5zb3JhIExpREFSLlwiO1xuICAgICAgZGlzcGxheUNvbG9yID0gXCJib3JkZXItc2t5LTUwMCBiZy1za3ktOTUwLzQwIHRleHQtc2t5LTMwMFwiO1xuICAgIH1cbiAgfVxuXG4gIC8vIEhhbmRsZSBjbGlja2luZyB0aGUgXCJPR0FSTklKIE1OSUVcIiAvIE1haW4gQnV0dG9uXG4gIGNvbnN0IGhhbmRsZU1haW5CdXR0b25DbGljayA9ICgpID0+IHtcbiAgICBpZiAoYXBwU3RhdGUgPT09IEFwcFN0YXRlLmNoaWxsKSB7XG4gICAgICAvLyBUcmFuc2l0aW9uIGZyb20gQ2hpbGwgdG8gUXVhbnR1bVxuICAgICAgc2V0QXBwU3RhdGUoQXBwU3RhdGUucXVhbnR1bSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFRyaWdnZXIgY2FwdHVyZSBpZiByZWFkeVxuICAgICAgaWYgKGlzUmVhZHlUb0NhcHR1cmUpIHtcbiAgICAgICAgb25DYXB0dXJlKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHByb2dyZXNzUGN0ID0gYXBwU3RhdGUgPT09IEFwcFN0YXRlLnF1YW50dW0gPyBNYXRoLm1pbigxMDAsIChtZXRyaWNzLnN0YWJpbGl0eU1zIC8gMjAwMCkgKiAxMDApIDogMDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtNCByZWxhdGl2ZVwiIGlkPVwiY2hvbWlrX3VpX2NvbnRyb2xsZXJfcm9vdFwiPlxuXG4gICAgICB7LyogTW9kZSBTd2l0Y2hlciBIZWFkZXI6IENoaWxsIHZzIFF1YW50dW0gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYmctc2xhdGUtOTUwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQteGwgcC0xLjUgZ2FwLTEuNVwiIGlkPVwiYnVsYV9tb2RlX3RvZ2dsZV9iYXJcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFwcFN0YXRlKEFwcFN0YXRlLmNoaWxsKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgZm9udC1tb25vIHRleHQtWzlweF0gZm9udC1ib2xkIHB5LTEuNSByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgIGFwcFN0YXRlID09PSBBcHBTdGF0ZS5jaGlsbFxuICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAvNjAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgdGV4dC1hbWJlci00MDAgc2hhZG93LVswXzBfMTBweF9yZ2JhKDI0NSwxNTgsMTEsMC4xNSldJ1xuICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTMwMCBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50J1xuICAgICAgICAgIH1gfVxuICAgICAgICAgIGlkPVwidG9nZ2xlX21vZGVfY2hpbGxcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4+8J+QuTwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj57QXBwQ29udGVudC5tb2RlQ2FydG9vbn08L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QXBwU3RhdGUoQXBwU3RhdGUucXVhbnR1bSl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCBweS0xLjUgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICBhcHBTdGF0ZSA9PT0gQXBwU3RhdGUucXVhbnR1bVxuICAgICAgICAgICAgICA/ICdiZy1za3ktOTUwLzYwIGJvcmRlciBib3JkZXItc2t5LTUwMC80MCB0ZXh0LXNreS00MDAgc2hhZG93LVswXzBfMTBweF9yZ2JhKDE0LDE2NSwyMzMsMC4xNSldJ1xuICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTMwMCBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50J1xuICAgICAgICAgIH1gfVxuICAgICAgICAgIGlkPVwidG9nZ2xlX21vZGVfcXVhbnR1bVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj7imqE8L3NwYW4+XG4gICAgICAgICAgPHNwYW4+e0FwcENvbnRlbnQubW9kZVF1YW50dW19PC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogMS4gRGFzaGJvYXJkIFwiTGl2ZVwiIChHw7NyYSBla3JhbnUgLyBPdXQgb2YgVGh1bWIgWm9uZSkgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IGJnLXNsYXRlLTk1MC85MCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIiBpZD1cImNob21pa19saXZlX2Rhc2hib2FyZFwiPlxuICAgICAgICBcbiAgICAgICAgey8qIER5bmFtaWMgbmVvbiBhbWJpZW50IGJhY2tncm91bmQgbGlnaHQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCB3LTMyIGgtMzIgYmctc2t5LTUwMC81IGJsdXItWzUwcHhdIHJvdW5kZWQtZnVsbCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCBsZWZ0LTAgdy0zMiBoLTMyIGJnLWFtYmVyLTUwMC81IGJsdXItWzUwcHhdIHJvdW5kZWQtZnVsbCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICB7LyogRGFzaGJvYXJkIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBwYi0yIG1iLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTRweF1cIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbD1cImhhbXN0ZXJcIj7wn5C5PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+S0xVQiBDSE9NSUtBOiBMSVZFIE1PTklUT1I8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPHNwYW4gXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIGJvcmRlciBweC0yIHB5LTAuNSByb3VuZGVkIHNoYWRvdy1bMF8wXzhweF9yZ2JhKDE2LDE4NSwxMjksMC4xNSldIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgYXBwU3RhdGUgPT09IEFwcFN0YXRlLnF1YW50dW0gXG4gICAgICAgICAgICAgICAgICA/ICd0ZXh0LWVtZXJhbGQtNDAwIGJnLWVtZXJhbGQtOTUwLzYwIGJvcmRlci1lbWVyYWxkLTgwMC80MCcgXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTUwMCBiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTkwMCdcbiAgICAgICAgICAgICAgfWB9IFxuICAgICAgICAgICAgICBpZD1cInF1YW50dW1fbW9kZV91aV9kYXNoYm9hcmRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBTVEFCSUxJVFk6IHtNYXRoLnJvdW5kKChtZXRyaWNzLnN0YWJpbGl0eU1zIC8gMjAwMCkgKiAxMDApfSVcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3QgYmctc2xhdGUtOTAwIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICBEQVNIQk9BUkRfTElWRVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogSHVtb3JvdXMgQ2hvbWlrIEJ1xYJhIFNwZWVjaCBCdWJibGUgYW5kIENoYXJhY3RlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0zLjUgaXRlbXMtc3RhcnQgYmctc2xhdGUtOTUwLzQwIHAtMyByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtOTAwLzYwXCIgaWQ9XCJidWxhX3NwZWVjaF9idWJibGVfY29udGFpbmVyXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIEFuaW1hdGVkIE1hc2NvdCBGcmFtZSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHctMTIgaC0xMiByb3VuZGVkLWZ1bGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtMnhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBzaGFkb3ctbGcgcmVsYXRpdmUgJHtkaXNwbGF5Q29sb3J9YH0+XG4gICAgICAgICAgICAgIHsvKiBEeW5hbWljIHN0YXR1cyByaW5nIHNwaW5uZXIgKi99XG4gICAgICAgICAgICAgIHttZXRyaWNzLnN0YWJpbGl0eU1zID4gMCAmJiBtZXRyaWNzLnN0YWJpbGl0eU1zIDwgMjAwMCAmJiAhY2FwdHVyZSAmJiBhcHBTdGF0ZSA9PT0gQXBwU3RhdGUucXVhbnR1bSAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHJvdW5kZWQtZnVsbCBib3JkZXItdC0yIGJvcmRlci1yLTIgYm9yZGVyLXNreS00MDAgYW5pbWF0ZS1zcGluIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8c3Bhbj57ZGlzcGxheUVtb2ppfTwvc3Bhbj5cblxuICAgICAgICAgICAgICB7LyogQ3liZXItR29nZ2xlcyBPdmVybGF5IGluIFF1YW50dW0gTW9kZSAqL31cbiAgICAgICAgICAgICAge2FwcFN0YXRlID09PSBBcHBTdGF0ZS5xdWFudHVtICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2t5LTQwMC80MCBiZy1za3ktOTUwLzIwIHBvaW50ZXItZXZlbnRzLW5vbmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHctZnVsbCBoLTAuNSBiZy1za3ktNDAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIHRleHQtWzZweF0gYmctc2xhdGUtOTUwIHRleHQtc2t5LTQwMCBmb250LW1vbm8gcHgtMC41IHJvdW5kZWQgc2NhbGUtWzAuOF0gLWJvdHRvbS0xXCI+UVRfTU9ERTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtYm9sZFwiPkJVxYFBPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNwZWVjaCBidWJibGUgYnViYmxlIHRleHQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMCBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTIuNSByb3VuZGVkLWxnIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgIHsvKiBMaXR0bGUgc3BlZWNoIGJ1YmJsZSBhcnJvdyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNCAtbGVmdC0xLjUgdy0zIGgtMyBiZy1zbGF0ZS05MDAgYm9yZGVyLWwgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCByb3RhdGUtNDVcIiAvPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtWzExcHhdIGZvbnQtYm9sZCB0cmFja2luZy10aWdodCB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICAgIFwie2Rpc3BsYXlNZXNzYWdlfVwiXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgIHtkaXNwbGF5U3VidGV4dH1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSZWFsLXRpbWUgcGFyYW1ldGVycyBmZWVkYmFjayBiYXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtMyBnYXAtMi41IG10LTMgcHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtOTAwXCIgaWQ9XCJjaG9taWtfZGFzaGJvYXJkX3N0YXRzXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFBvaW50cyBjb3VudHMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgYmctc2xhdGUtOTUwLzYwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAvNDAgZmxleCBmbGV4LWNvbCBnYXAtMC41XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTUwMCB1cHBlcmNhc2VcIj57QXBwQ29udGVudC5zbGFuZ0RpY3RbXCJkYXRhXCJdfSBMaURBUiAoTGl2ZSk8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgdGV4dC1za3ktNDAwXCI+XG4gICAgICAgICAgICAgIHttZXRyaWNzLmZhY2VEZXRlY3RlZCAmJiBhcHBTdGF0ZSA9PT0gQXBwU3RhdGUucXVhbnR1bSA/IG1ldHJpY3MubGlkYXJQb2ludHNDb3VudC50b0xvY2FsZVN0cmluZygpIDogJzAnfSBwdHNcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDdXJyZW50IEhvbGQgRHVyYXRpb24gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgYmctc2xhdGUtOTUwLzYwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAvNDAgZmxleCBmbGV4LWNvbCBnYXAtMC41XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTUwMCB1cHBlcmNhc2VcIj5RVUVTVCBTVEFCSUxJWkFDSkk8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgYmctc2xhdGUtOTAwIGgtMS41IHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZW1lcmFsZC01MDAgaC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTE1MFwiIFxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke2FwcFN0YXRlID09PSBBcHBTdGF0ZS5xdWFudHVtID8gTWF0aC5taW4oMTAwLCAobWV0cmljcy5zdGFiaWxpdHlNcyAvIDIwMDApICogMTAwKSA6IDB9JWAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICB7YXBwU3RhdGUgPT09IEFwcFN0YXRlLnF1YW50dW0gPyBNYXRoLnJvdW5kKChtZXRyaWNzLnN0YWJpbGl0eU1zIC8gMjAwMCkgKiAxMDApIDogMH0lXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNpZ25hbCBRdWFsaXR5ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tMiBzbTpjb2wtc3Bhbi0xIHAtMiBiZy1zbGF0ZS05NTAvNjAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMC80MCBmbGV4IGZsZXgtY29sIGdhcC0wLjVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwIHVwcGVyY2FzZVwiPntBcHBDb250ZW50LnNsYW5nRGljdFtcImFuYWx5emVcIl19IE9LPC9zcGFuPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAge2FwcFN0YXRlID09PSBBcHBTdGF0ZS5xdWFudHVtID8gKG1ldHJpY3MucXVhbGl0eVNjb3JlICogMTAwKS50b0ZpeGVkKDApIDogJzAnfSVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVs4cHhdIGZvbnQtbW9ubyBweC0xIHJvdW5kZWQgJHtcbiAgICAgICAgICAgICAgICBtZXRyaWNzLnF1YWxpdHlTY29yZSA+PSAwLjk2ICYmIGFwcFN0YXRlID09PSBBcHBTdGF0ZS5xdWFudHVtID8gJ2JnLWVtZXJhbGQtOTUwLzYwIHRleHQtZW1lcmFsZC00MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTkwMCcgOiAnYmctYW1iZXItOTUwLzYwIHRleHQtYW1iZXItNDAwIGJvcmRlciBib3JkZXItYW1iZXItOTAwJ1xuICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAge2FwcFN0YXRlID09PSBBcHBTdGF0ZS5xdWFudHVtID8gKG1ldHJpY3MucXVhbGl0eVNjb3JlID49IDAuOTYgPyAnU1DDk0pOQScgOiAnTklTS0EnKSA6ICdPQ1pFS0lXQU5JRSd9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIDIuIFphc2nEmWcgS2NpdWthIENvbnRyb2wgRGVjayAoRG9sbmEgc2VrY2phIHogZHXFvHltIGJ1dHRvbmVtKSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXNsYXRlLTk1MCB0by1zbGF0ZS05MDAvOTAgc2hhZG93LTJ4bCByZWxhdGl2ZVwiIGlkPVwidGh1bWJfem9uZV9jb250cm9sX2RlY2tcIj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgcmlnaHQtMyBmb250LW1vbm8gdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTYwMCB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgVEhVTUJfWk9ORV9WM1xuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTQgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIExheW91dCBvZiBzZWxlY3RvcnMgYW5kIGNlbnRyYWwgc3RhcnQgYnV0dG9uICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMi41IHB4LTEgcHktMVwiIGlkPVwidGh1bWJfZXJnb25vbWljX2NvbnRyb2xzXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBMZWZ0IExvd2VyIFNlbGVjdG9yOiBDaG9taWsgdyBiYW5kYW5pZSAoVHdhcnogLyBDaG9taWtpIFR3YXJ6KSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTEgc2hyaW5rLTAgdy0yNFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2NhblR5cGUoJ2Nob21pa2lfdHdhcnonKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTE0IGgtMTQgcm91bmRlZC14bCBib3JkZXIgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIHNjYW5UeXBlID09PSAnY2hvbWlraV90d2FyeidcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvNzAgYm9yZGVyLWVtZXJhbGQtNTAwIHRleHQtZW1lcmFsZC00MDAgc2NhbGUtMTA1IHNoYWRvdy1bMF8wXzEycHhfcmdiYSgxNiwxODUsMTI5LDAuMTUpXSdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzgwIGJvcmRlci1zbGF0ZS04NTAgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlNrYW4gVHdhcnp5IC0gQ2hvbWlrIEJhbmRhbmFcIlxuICAgICAgICAgICAgICAgIGlkPVwiYnRuX3NlbGVjdF9jaG9taWtpX3R3YXJ6XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGxcIj7wn5C58J+nozwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtY2VudGVyIGZvbnQtYm9sZCB0cmFja2luZy13aWRlciBsZWFkaW5nLXRpZ2h0IHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgIEJhbmRhbmFcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVs3cHhdIGZvbnQtbm9ybWFsIHRleHQtc2xhdGUtNTAwXCI+KFR3YXJ6KTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBDRU5UUkFMOiBCaWcgdGh1bWIgYnV0dG9uIFwiU1RBUlQgU0tBTlUgLyBPR0FSTklKIE1OSUVcIiAoODBweCkgd2l0aCBHbG93LXVwIENpcmN1bGFyIFByb2dyZXNzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctMjQgaC0yNCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBhbmltYXRlLW5vbmVcIiBpZD1cInN0YXJ0X3NjYW5fYnV0dG9uXCI+XG4gICAgICAgICAgICAgICAgey8qIFNWRyBDaXJjdWxhciBQcm9ncmVzcyBSaW5nIC0gYWx3YXlzIHJlbmRlcmVkIGZvciB0ZXN0aW5nLCBvcGFjaXR5IHRyYW5zaXRpb25zIGluIGFjdGl2ZSBtb2RlICovfVxuICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCB3LWZ1bGwgaC1mdWxsIHRyYW5zZm9ybSAtcm90YXRlLTkwIHBvaW50ZXItZXZlbnRzLW5vbmUgei0xMCB0cmFuc2l0aW9uLW9wYWNpdHkgZHVyYXRpb24tMzAwICR7YXBwU3RhdGUgPT09IEFwcFN0YXRlLnF1YW50dW0gPyAnb3BhY2l0eS0xMDAnIDogJ29wYWNpdHktMzAnfWB9IHZpZXdCb3g9XCIwIDAgOTYgOTZcIj5cbiAgICAgICAgICAgICAgICAgIHsvKiBCYWNrZ3JvdW5kIHRyYWNrICovfVxuICAgICAgICAgICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgICAgICAgICBjeD1cIjQ4XCJcbiAgICAgICAgICAgICAgICAgICAgY3k9XCI0OFwiXG4gICAgICAgICAgICAgICAgICAgIHI9XCI0MlwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0cm9rZS1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjMuNVwiXG4gICAgICAgICAgICAgICAgICAgIGZpbGw9XCJ0cmFuc3BhcmVudFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgey8qIEdsb3dpbmcgb3V0ZXIgcHJvZ3Jlc3MgY2lyY2xlICovfVxuICAgICAgICAgICAgICAgICAgPG1vdGlvbi5jaXJjbGVcbiAgICAgICAgICAgICAgICAgICAgY3g9XCI0OFwiXG4gICAgICAgICAgICAgICAgICAgIGN5PVwiNDhcIlxuICAgICAgICAgICAgICAgICAgICByPVwiNDJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Ake3Byb2dyZXNzUGN0ID49IDEwMCA/ICdzdHJva2UtZW1lcmFsZC00MDAnIDogJ3N0cm9rZS1za3ktNDAwJ31gfVxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjRcIlxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9ezI2My44OX1cbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldD17MjYzLjg5IC0gKHByb2dyZXNzUGN0IC8gMTAwKSAqIDI2My44OX1cbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzdHJva2VEYXNob2Zmc2V0OiAyNjMuODkgLSAocHJvZ3Jlc3NQY3QgLyAxMDApICogMjYzLjg5IH19XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMTUsIGVhc2U6IFwiZWFzZU91dFwiIH19XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBwcm9ncmVzc1BjdCA+IDAgPyAnZHJvcC1zaGFkb3coMCAwIDRweCByZ2JhKDU2LCAxODksIDI0OCwgMC41KSknIDogJ25vbmUnXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuXG4gICAgICAgICAgICAgICAgey8qIEZsb2F0aW5nIEdsb3ctdXAgUHJvZ3Jlc3MgcGVyY2VudGFnZSBsYWJlbCBkaXJlY3RseSBuZXh0IHRvIHRoZSBjaXJjdWxhciBwcm9ncmVzcyByaW5nICovfVxuICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSBsZWZ0LVs5MnB4XSB0b3AtWzE0cHhdIGJnLXNsYXRlLTk1MC85NSBib3JkZXIgcm91bmRlZC1mdWxsIHB4LTIgcHktMSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTMwIG1pbi13LVs3MHB4XSBwb2ludGVyLWV2ZW50cy1ub25lIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgICAgICBhcHBTdGF0ZSA9PT0gQXBwU3RhdGUucXVhbnR1bVxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1za3ktNTAwLzUwIHNoYWRvdy1bMF8wXzEycHhfcmdiYSgxNCwxNjUsMjMzLDAuMzUpXSBvcGFjaXR5LTEwMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItc2xhdGUtODAwIHNoYWRvdy1ub25lIG9wYWNpdHktNjAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgIGlkPVwicmluZ19hZGphY2VudF9zdGFiaWxpdHlfcGVyY2VudGFnZV9sYWJlbFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzZweF0gdGV4dC1za3ktNDAwIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgd2hpdGVzcGFjZS1ub3dyYXBcIj5TVEFCSUxJVFk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC14cyBmb250LWJsYWNrIHRleHQtZW1lcmFsZC00MDAgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZCgobWV0cmljcy5zdGFiaWxpdHlNcyAvIDIwMDApICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8bW90aW9uLmJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45MCB9fVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2FwcFN0YXRlID09PSBBcHBTdGF0ZS5xdWFudHVtICYmICFpc1JlYWR5VG9DYXB0dXJlfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTWFpbkJ1dHRvbkNsaWNrfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0yMCBoLTIwIHJvdW5kZWQtZnVsbCBib3JkZXItNCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByZWxhdGl2ZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgei0yMCAke1xuICAgICAgICAgICAgICAgICAgICBhcHBTdGF0ZSA9PT0gQXBwU3RhdGUuY2hpbGxcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItNTAwIHRvLXllbGxvdy01MDAgaG92ZXI6ZnJvbS1hbWJlci02MDAgaG92ZXI6dG8teWVsbG93LTYwMCBib3JkZXItYW1iZXItMzAwIHRleHQtc2xhdGUtOTUwIGN1cnNvci1wb2ludGVyIHNoYWRvdy1bMF8wXzIwcHhfcmdiYSgyNDUsMTU4LDExLDAuMyldJ1xuICAgICAgICAgICAgICAgICAgICAgIDogaXNSZWFkeVRvQ2FwdHVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtNTAwIHRvLXRlYWwtNTAwIGhvdmVyOmZyb20tZW1lcmFsZC02MDAgaG92ZXI6dG8tdGVhbC02MDAgYm9yZGVyLWVtZXJhbGQtMzAwIHRleHQtc2xhdGUtOTUwIGN1cnNvci1wb2ludGVyIHNoYWRvdy1bMF8wXzIwcHhfcmdiYSgxNiwxODUsMTI5LDAuMzUpXSBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS02MDAgY3Vyc29yLW5vdC1hbGxvd2VkJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogJzgwcHgnLCBoZWlnaHQ6ICc4MHB4JyB9fVxuICAgICAgICAgICAgICAgICAgaWQ9XCJjZW50cmFsX3RodW1iX3NjYW5fYnRuXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7LyogR2xvd2luZyBkZWNvcmF0aXZlIGhhbG8gKi99XG4gICAgICAgICAgICAgICAgICB7KGFwcFN0YXRlID09PSBBcHBTdGF0ZS5jaGlsbCB8fCBpc1JlYWR5VG9DYXB0dXJlKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCByb3VuZGVkLWZ1bGwgYm9yZGVyLTQgYm9yZGVyLWFtYmVyLTQwMCBhbmltYXRlLXBpbmcgb3BhY2l0eS0yNVwiIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPXtgdy01IGgtNSBtYi0wLjUgJHthcHBTdGF0ZSA9PT0gQXBwU3RhdGUuY2hpbGwgfHwgaXNSZWFkeVRvQ2FwdHVyZSA/ICd0ZXh0LXNsYXRlLTk1MCcgOiAndGV4dC1zbGF0ZS02MDAnfWB9IC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC1bOHB4XSBmb250LWJsYWNrIHRyYWNraW5nLXRpZ2h0ZXIgbGVhZGluZy1ub25lIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHthcHBTdGF0ZSA9PT0gQXBwU3RhdGUuY2hpbGwgPyBcIk9HQVJOSUpcIiA6IFwiU1RBUlRcIn1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bN3B4XVwiPnthcHBTdGF0ZSA9PT0gQXBwU3RhdGUuY2hpbGwgPyBcIk1OSUUhXCIgOiBcIlNLQU5VXCJ9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbW90aW9uLmJ1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge2FwcFN0YXRlID09PSBBcHBTdGF0ZS5xdWFudHVtID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTAuNSBtdC0xXCIgaWQ9XCJnbG93X3VwX3Byb2dyZXNzX2luZGljYXRvclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ibGFjayB0ZXh0LXNreS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICAgICAgICAgIEdMT1ctVVAgUFJPR1JFU1NcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIHttZXRyaWNzLnN0YWJpbGl0eU1zID49IDIwMDAgPyBcIlNJQVRLQSBCVcWBWSBHT1RPV0EhIOKcqFwiIDogYEJVRE9XQU5JRSBTSUFUS0k6ICR7TWF0aC5yb3VuZCgobWV0cmljcy5zdGFiaWxpdHlNcyAvIDIwMDApICogMTAwKX0lYH1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IG10LTEuNSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIHthcHBTdGF0ZSA9PT0gQXBwU3RhdGUuY2hpbGwgPyBcIk9EUEFMIFFVQU5UVU1cIiA6IFwiT0NaRUtJV0FOSUVcIn1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFJpZ2h0IExvd2VyIFNlbGVjdG9yOiBDaG9taWsgdyBkcmVzaWUgKENpYcWCbyAvIE9wb25rYSBCcnp1Y2gpICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMSBzaHJpbmstMCB3LTI0XCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTY2FuVHlwZSgnb3BvbmthX2JyenVjaCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTQgaC0xNCByb3VuZGVkLXhsIGJvcmRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgc2NhblR5cGUgPT09ICdvcG9ua2FfYnJ6dWNoJ1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAvNzAgYm9yZGVyLWFtYmVyLTUwMCB0ZXh0LWFtYmVyLTQwMCBzY2FsZS0xMDUgc2hhZG93LVswXzBfMTJweF9yZ2JhKDI0NSwxNTgsMTEsMC4xNSldJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvODAgYm9yZGVyLXNsYXRlLTg1MCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTMwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgIHRpdGxlPVwiU2thbiBCcnp1Y2hhIC0gQ2hvbWlrIHcgRHJlc2llXCJcbiAgICAgICAgICAgICAgICBpZD1cImJ0bl9zZWxlY3Rfb3BvbmthX2JyenVjaFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsXCI+8J+QufCfj4PigI3imYLvuI88L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LWNlbnRlciBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgbGVhZGluZy10aWdodCB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICBEcmVzaWFyelxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzdweF0gZm9udC1ub3JtYWwgdGV4dC1zbGF0ZS01MDBcIj4oQ2lhxYJvKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBVbmRlcm5lYXRoOiBTeXN0ZW0gcmVjb3ZlcnkgYW5kIGhlbHAgbm90ZXMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMC82MCBwdC0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVs4cHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTUwMCBweC0xXCIgaWQ9XCJ0aHVtYl9kZWNrX2F1eF9yb3dcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPEluZm8gY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXNsYXRlLTYwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkRsYSBmYW7Ds3cge0FwcENvbnRlbnQuc2xhbmdEaWN0W1wiZXhwZXJ0XCJdfSBpIGtsdWJ1IGNob21pa2E8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblJlc2V0TG9ja3N9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzhweF0gdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1za3ktNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRyYW5zaXRpb24tY29sb3JzIHVwcGVyY2FzZSBmb250LWJvbGQgcHktMC41IHB4LTIgYmctc2xhdGUtOTUwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICBpZD1cInJlbGVhc2VfbG9ja3NfdGh1bWJfZGVja19idG5cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVmcmVzaENjdyBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlJlc2V0dWogTG9ja2k8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbiJdLCJtYXBwaW5ncyI6IkFBb0NNO0FBcENOO0FBQUE7QUFBQTtBQUFBO0FBS0EsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQW1ELFVBQVUsa0JBQWtCO0FBQy9FLFNBQVMsVUFBVSxZQUE0QyxNQUFtQixnQkFBMEI7QUFDNUcsU0FBUyxjQUErQjtBQU9qQyxhQUFNLG9CQUFzRCxDQUFDLEVBQUUsV0FBVyxXQUFX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