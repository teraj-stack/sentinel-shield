import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const useState = __vite__cjsImport1_react["useState"];
import { Copy, Check, Download, Database, ShieldCheck, Cpu, Code2, Send, HelpCircle, AlertCircle } from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
import { saveScanToSupabase } from "/apps/lidar_head_3d/src/utils/DatabaseConnector.ts";
export const ExportPanel = ({
  capture,
  onClearCapture,
  onAddDiagnosticLog,
  onSaveCloudRecord,
  scanType = "chomiki_twarz"
}) => {
  const [copied, setCopied] = useState(false);
  const [sentToClub, setSentToClub] = useState(false);
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  if (!capture) {
    return /* @__PURE__ */ jsxDEV("div", { className: "border border-dashed border-slate-800 rounded-xl p-8 bg-slate-950/20 text-center flex flex-col items-center justify-center min-h-[220px]", id: "export_panel_empty", children: [
      /* @__PURE__ */ jsxDEV(Database, { className: "w-8 h-8 text-slate-700 mb-2 animate-pulse" }, void 0, false, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-xs font-semibold text-slate-400 uppercase tracking-wider", children: "AWAITING SCAN NORMALIZATION LOCK" }, void 0, false, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 35,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed", children: "Gdy wszystkie blokady sensora (luma, ostrość, kąty głowy) będą zielone, a Buła ukończy 2000ms stabilizacji, wciśnij okrągły przycisk na dole, aby wygenerować fuzję LiDAR." }, void 0, false, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 38,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ExportPanel.tsx",
      lineNumber: 33,
      columnNumber: 7
    }, this);
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(capture, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const downloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(capture, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `mediapipe_3d_normalization_${capture.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };
  const handleSendToClub = async () => {
    setSending(true);
    setErrorMessage(null);
    if (onAddDiagnosticLog) {
      onAddDiagnosticLog("SYSTEM", "🔌 Inicjowanie połączenia Supabase... Pakowanie danych skanu (is_processed: false).");
    }
    try {
      const response = await saveScanToSupabase({
        metadata: {
          yaw: capture.metrics.yaw,
          pitch: capture.metrics.pitch,
          roll: capture.metrics.roll,
          luma: capture.metrics.luma,
          sharpness: capture.metrics.sharpness,
          cct: capture.metrics.cct,
          pointsCount: capture.metrics.lidarPointsCount,
          distance: capture.metrics.distance,
          triangleCount: capture.reconstruction3D.triangleCount,
          validDelaunayCount: capture.reconstruction3D.validDelaunayCount,
          averageEdgeLengthMm: capture.reconstruction3D.averageEdgeLengthMm
        },
        scanType,
        lidarDataUrl: `https://storage.googleapis.com/edge-ai-lidar-dumps/raw/${capture.id.toLowerCase()}.ply`,
        rawImagesUrl: [capture.imageUrl]
      });
      if (response.success && response.record) {
        if (onAddDiagnosticLog) {
          onAddDiagnosticLog("SYSTEM", `✨ ${response.message}`);
        }
        if (onSaveCloudRecord) {
          onSaveCloudRecord(response.record);
        }
        setSentToClub(true);
      } else {
        const fallbackErr = response.message || "Błąd zapisu. Buła prosi o ponowną próbę.";
        if (onAddDiagnosticLog) {
          onAddDiagnosticLog("DIAG", `❌ ${fallbackErr}`);
        }
        setErrorMessage(fallbackErr);
      }
    } catch (err) {
      const errorMsg = `Błąd zapisu: ${err?.message || err}. Buła prosi o ponowną próbę. 🐹🎒`;
      if (onAddDiagnosticLog) {
        onAddDiagnosticLog("DIAG", `❌ ${errorMsg}`);
      }
      setErrorMessage(errorMsg);
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "border border-emerald-800/50 rounded-xl overflow-hidden bg-slate-950/90 flex flex-col transition-all shadow-xl", id: "export_panel_root", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-emerald-950/50 to-teal-950/40 p-5 border-b border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4", id: "isolated_export_control_card", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-3 max-w-xl", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-800 flex items-center justify-center text-xl shrink-0 mt-0.5", children: "🐹" }, void 0, false, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 121,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "font-sans text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "PRZESYŁ DO POSTGRESQL (SUPABASE)" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 126,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] bg-emerald-900/60 text-emerald-300 border border-emerald-800 px-1 py-0.2 rounded font-normal uppercase", children: "DatabaseConnector Protocol" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 127,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 125,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[11px] text-slate-300 mt-1 leading-normal", children: !sentToClub ? "Fuzja LiDAR i parametry fotometryczne zostały pomyślnie znormalizowane! Masz pełną kontrolę nad swoimi danymi. Wyślij surowy skan do chmury (is_processed: false), by czekał na analizę silnika AI." : "Sukces! Dane bezpiecznie wylądowały w tabeli 'user_scans_raw' w Supabase. Chomik Buła i ekipa zaczynają gryźć ziarno i wektory!" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 131,
            columnNumber: 13
          }, this),
          errorMessage && /* @__PURE__ */ jsxDEV("div", { className: "mt-2 text-[10px] text-amber-400 font-mono flex items-center gap-1 bg-amber-950/40 border border-amber-900/40 p-1.5 rounded", children: [
            /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-3.5 h-3.5 text-amber-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 139,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: errorMessage }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 140,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 138,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 124,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 120,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "shrink-0 flex items-center gap-2", children: [
        !sentToClub ? /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleSendToClub,
            disabled: sending,
            className: `font-sans text-xs font-black py-3 px-6 rounded-lg flex items-center gap-2 border transition-all shadow-lg ${sending ? "bg-slate-900 border-slate-800 text-slate-500 cursor-wait" : "bg-emerald-500 hover:bg-emerald-600 border-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:scale-[1.03] active:scale-95"}`,
            id: "send_to_club_members_btn",
            children: [
              /* @__PURE__ */ jsxDEV(Send, { className: `w-4 h-4 ${sending ? "animate-bounce" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/ExportPanel.tsx",
                lineNumber: 158,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: sending ? "ZAPISYWANIE..." : "MAMY TO! (ZAPISZ)" }, void 0, false, {
                fileName: "/app/applet/src/components/ExportPanel.tsx",
                lineNumber: 159,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 148,
            columnNumber: 13
          },
          this
        ) : /* @__PURE__ */ jsxDEV("div", { className: "bg-emerald-950/40 border border-emerald-500 px-4 py-2.5 rounded-lg text-emerald-400 font-mono text-[10px] font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.15)]", children: [
          /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 163,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "ZAPISANO W SUPABASE! 🐹🚀" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 164,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 162,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onClearCapture,
            className: "p-3 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-slate-200 rounded-lg border border-slate-800 font-mono text-[10px] uppercase font-bold transition-all",
            title: "Wyczyść sesję skanu",
            id: "clear_capture_session_btn",
            children: "RESET"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 168,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ExportPanel.tsx",
      lineNumber: 119,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/40 border-b border-slate-900 px-4 py-2 flex items-center justify-between", id: "export_details_header", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-slate-400" }, void 0, false, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 182,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold text-slate-400 uppercase", children: "Metryki Ingestu i Payload SensorConfigProtocol" }, void 0, false, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 183,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 181,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleCopy,
            className: "p-1 px-2 bg-slate-950 hover:bg-slate-900 text-slate-300 rounded border border-slate-900 flex items-center gap-1 font-mono text-[8px] transition-all",
            id: "btn_copy_payload_sub",
            children: [
              copied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ExportPanel.tsx",
                lineNumber: 194,
                columnNumber: 23
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/ExportPanel.tsx",
                lineNumber: 194,
                columnNumber: 72
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "KOPIUJ JSON" }, void 0, false, {
                fileName: "/app/applet/src/components/ExportPanel.tsx",
                lineNumber: 195,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 189,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: downloadJson,
            className: "p-1 px-2 bg-slate-950 hover:bg-slate-900 text-slate-300 rounded border border-slate-900 flex items-center gap-1 font-mono text-[8px] transition-all",
            id: "btn_download_payload_sub",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/ExportPanel.tsx",
                lineNumber: 202,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "POBIERZ PLIK" }, void 0, false, {
                fileName: "/app/applet/src/components/ExportPanel.tsx",
                lineNumber: 203,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 197,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 188,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ExportPanel.tsx",
      lineNumber: 180,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-900", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-2 p-4 flex flex-col gap-3.5", id: "captured_normalized_preview_column", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-0.5", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "font-mono text-[9px] text-slate-500 uppercase font-bold tracking-wider", children: "PRZEGLĄD NORMALIZACJI LIDAR" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 213,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-sky-400 select-all truncate", children: [
            "ID: ",
            capture.id
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 216,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 212,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative border border-slate-900 rounded-lg overflow-hidden bg-slate-950 aspect-[4/3] flex items-center justify-center", children: [
          capture.imageUrl ? /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: capture.imageUrl,
              alt: "Captured scan",
              className: "w-full h-full object-cover opacity-80",
              referrerPolicy: "no-referrer"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 223,
              columnNumber: 15
            },
            this
          ) : /* @__PURE__ */ jsxDEV("div", { className: "text-center font-mono text-[9px] text-slate-500", children: "BRAK PODGLĄDU OBRAZU" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 230,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-radial-at-c from-transparent via-slate-950/20 to-slate-950/40 pointer-events-none" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 234,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "absolute border border-emerald-500/40 rounded-[28px] pointer-events-none flex items-center justify-center animate-pulse",
              style: {
                width: `${capture.metrics.distance < 0.3 ? "82%" : capture.metrics.distance > 0.38 ? "58%" : "70%"}`,
                height: "75%",
                boxShadow: "0 0 8px rgba(16, 185, 129, 0.15)"
              },
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-emerald-400 rounded-tl-[28px]" }, void 0, false, {
                  fileName: "/app/applet/src/components/ExportPanel.tsx",
                  lineNumber: 245,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-emerald-400 rounded-tr-[28px]" }, void 0, false, {
                  fileName: "/app/applet/src/components/ExportPanel.tsx",
                  lineNumber: 246,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-emerald-400 rounded-bl-[28px]" }, void 0, false, {
                  fileName: "/app/applet/src/components/ExportPanel.tsx",
                  lineNumber: 247,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-emerald-400 rounded-br-[28px]" }, void 0, false, {
                  fileName: "/app/applet/src/components/ExportPanel.tsx",
                  lineNumber: 248,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-emerald-400 bg-slate-950/90 px-1 py-0.5 rounded border border-emerald-900", children: "FUZJA_LOCK_ACTIVE" }, void 0, false, {
                  fileName: "/app/applet/src/components/ExportPanel.tsx",
                  lineNumber: 249,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 237,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 221,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/60 border border-slate-900 rounded-lg p-3 flex flex-col gap-2 font-mono text-[9px]", id: "captured_physics_stats", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-slate-400 uppercase font-bold border-b border-slate-900 pb-1 mb-1", children: [
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 258,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "METRYKI SENSORYCZNE" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 259,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 257,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Odległość:" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 262,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 font-bold", children: [
              (capture.metrics.distance * 100).toFixed(1),
              " cm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 263,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 261,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Naświetlenie (Luma):" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 266,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: [
              capture.locks.lumaValue,
              " Lm"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 267,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 265,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Ostrość (Sharpness):" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 270,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: capture.locks.sharpnessValue.toFixed(2) }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 271,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 269,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Temperatura barwowa (CCT):" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 274,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: [
              capture.locks.cctValue,
              " K"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 275,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 273,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between border-t border-slate-900 pt-1 mt-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-500 font-bold", children: "Analiza Delaunaya:" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 278,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "SPÓJNA / ZATWIERDZONA" }, void 0, false, {
              fileName: "/app/applet/src/components/ExportPanel.tsx",
              lineNumber: 279,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 277,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 256,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 211,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-3 p-4 flex flex-col gap-2 bg-slate-950/40", id: "captured_json_payload_column", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-slate-400 font-mono text-[9px] uppercase font-bold", children: [
          /* @__PURE__ */ jsxDEV(Code2, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 287,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "STRUKTURA DANYCH DO INGESTU (JSON)" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 288,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 286,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1 min-h-[220px] bg-slate-950 border border-slate-900 rounded-lg p-3 font-mono text-[9px] overflow-auto max-h-[320px] text-sky-200/80", children: /* @__PURE__ */ jsxDEV("pre", { className: "whitespace-pre-wrap leading-relaxed select-all", children: JSON.stringify(capture, null, 2) }, void 0, false, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 292,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 291,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 font-mono text-[7px] text-slate-500", children: [
          /* @__PURE__ */ jsxDEV(HelpCircle, { className: "w-3 h-3 text-slate-600 shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 298,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Model ingestuje chmurę punktów PLY we współpracy ze schematem bazy danych 'user_scans_raw'." }, void 0, false, {
            fileName: "/app/applet/src/components/ExportPanel.tsx",
            lineNumber: 299,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ExportPanel.tsx",
          lineNumber: 297,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ExportPanel.tsx",
        lineNumber: 285,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ExportPanel.tsx",
      lineNumber: 208,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ExportPanel.tsx",
    lineNumber: 116,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkV4cG9ydFBhbmVsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IE5vcm1hbGl6ZWRDYXB0dXJlLCBVc2VyU2NhblJhdyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IENvcHksIENoZWNrLCBEb3dubG9hZCwgRGF0YWJhc2UsIFNoaWVsZENoZWNrLCBDcHUsIENvZGUyLCBTZW5kLCBIZWxwQ2lyY2xlLCBBbGVydENpcmNsZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBzYXZlU2NhblRvU3VwYWJhc2UgfSBmcm9tICcuLi91dGlscy9EYXRhYmFzZUNvbm5lY3Rvcic7XG5cbmludGVyZmFjZSBFeHBvcnRQYW5lbFByb3BzIHtcbiAgY2FwdHVyZTogTm9ybWFsaXplZENhcHR1cmUgfCBudWxsO1xuICBvbkNsZWFyQ2FwdHVyZTogKCkgPT4gdm9pZDtcbiAgb25BZGREaWFnbm9zdGljTG9nPzogKGNhdGVnb3J5OiAnSFcnIHwgJ0RJQUcnIHwgJ0xPQ0snIHwgJ0xJREFSJyB8ICdTWVNURU0nIHwgJ1RSSUFOR1VMQVRJT04nLCBtc2c6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TYXZlQ2xvdWRSZWNvcmQ/OiAocmVjb3JkOiBVc2VyU2NhblJhdykgPT4gdm9pZDtcbiAgc2NhblR5cGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBFeHBvcnRQYW5lbDogUmVhY3QuRkM8RXhwb3J0UGFuZWxQcm9wcz4gPSAoeyBcbiAgY2FwdHVyZSwgXG4gIG9uQ2xlYXJDYXB0dXJlLCBcbiAgb25BZGREaWFnbm9zdGljTG9nLFxuICBvblNhdmVDbG91ZFJlY29yZCxcbiAgc2NhblR5cGUgPSAnY2hvbWlraV90d2Fyeidcbn0pID0+IHtcbiAgY29uc3QgW2NvcGllZCwgc2V0Q29waWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NlbnRUb0NsdWIsIHNldFNlbnRUb0NsdWJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VuZGluZywgc2V0U2VuZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBpZiAoIWNhcHR1cmUpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgYm9yZGVyLWRhc2hlZCBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC04IGJnLXNsYXRlLTk1MC8yMCB0ZXh0LWNlbnRlciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtaW4taC1bMjIwcHhdXCIgaWQ9XCJleHBvcnRfcGFuZWxfZW1wdHlcIj5cbiAgICAgICAgPERhdGFiYXNlIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1zbGF0ZS03MDAgbWItMiBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICBBV0FJVElORyBTQ0FOIE5PUk1BTElaQVRJT04gTE9DS1xuICAgICAgICA8L3A+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBtdC0xLjUgbWF4LXctc20gbXgtYXV0byBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICBHZHkgd3N6eXN0a2llIGJsb2thZHkgc2Vuc29yYSAobHVtYSwgb3N0cm/Fm8SHLCBrxIV0eSBnxYJvd3kpIGLEmWTEhSB6aWVsb25lLCBhIEJ1xYJhIHVrb8WEY3p5IDIwMDBtcyBzdGFiaWxpemFjamksIHdjacWbbmlqIG9rcsSFZ8WCeSBwcnp5Y2lzayBuYSBkb2xlLCBhYnkgd3lnZW5lcm93YcSHIGZ1emrEmSBMaURBUi5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGhhbmRsZUNvcHkgPSAoKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoSlNPTi5zdHJpbmdpZnkoY2FwdHVyZSwgbnVsbCwgMikpO1xuICAgIHNldENvcGllZCh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZChmYWxzZSksIDIwMDApO1xuICB9O1xuXG4gIGNvbnN0IGRvd25sb2FkSnNvbiA9ICgpID0+IHtcbiAgICBjb25zdCBkYXRhU3RyID0gXCJkYXRhOnRleHQvanNvbjtjaGFyc2V0PXV0Zi04LFwiICsgZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNhcHR1cmUsIG51bGwsIDIpKTtcbiAgICBjb25zdCBkb3dubG9hZEFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBkb3dubG9hZEFuY2hvci5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGRhdGFTdHIpO1xuICAgIGRvd25sb2FkQW5jaG9yLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIGBtZWRpYXBpcGVfM2Rfbm9ybWFsaXphdGlvbl8ke2NhcHR1cmUuaWR9Lmpzb25gKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRvd25sb2FkQW5jaG9yKTtcbiAgICBkb3dubG9hZEFuY2hvci5jbGljaygpO1xuICAgIGRvd25sb2FkQW5jaG9yLnJlbW92ZSgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbmRUb0NsdWIgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0U2VuZGluZyh0cnVlKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UobnVsbCk7XG5cbiAgICBpZiAob25BZGREaWFnbm9zdGljTG9nKSB7XG4gICAgICBvbkFkZERpYWdub3N0aWNMb2coJ1NZU1RFTScsICfwn5SMIEluaWNqb3dhbmllIHBvxYLEhWN6ZW5pYSBTdXBhYmFzZS4uLiBQYWtvd2FuaWUgZGFueWNoIHNrYW51IChpc19wcm9jZXNzZWQ6IGZhbHNlKS4nKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzYXZlU2NhblRvU3VwYWJhc2Uoe1xuICAgICAgICBtZXRhZGF0YToge1xuICAgICAgICAgIHlhdzogY2FwdHVyZS5tZXRyaWNzLnlhdyxcbiAgICAgICAgICBwaXRjaDogY2FwdHVyZS5tZXRyaWNzLnBpdGNoLFxuICAgICAgICAgIHJvbGw6IGNhcHR1cmUubWV0cmljcy5yb2xsLFxuICAgICAgICAgIGx1bWE6IGNhcHR1cmUubWV0cmljcy5sdW1hLFxuICAgICAgICAgIHNoYXJwbmVzczogY2FwdHVyZS5tZXRyaWNzLnNoYXJwbmVzcyxcbiAgICAgICAgICBjY3Q6IGNhcHR1cmUubWV0cmljcy5jY3QsXG4gICAgICAgICAgcG9pbnRzQ291bnQ6IGNhcHR1cmUubWV0cmljcy5saWRhclBvaW50c0NvdW50LFxuICAgICAgICAgIGRpc3RhbmNlOiBjYXB0dXJlLm1ldHJpY3MuZGlzdGFuY2UsXG4gICAgICAgICAgdHJpYW5nbGVDb3VudDogY2FwdHVyZS5yZWNvbnN0cnVjdGlvbjNELnRyaWFuZ2xlQ291bnQsXG4gICAgICAgICAgdmFsaWREZWxhdW5heUNvdW50OiBjYXB0dXJlLnJlY29uc3RydWN0aW9uM0QudmFsaWREZWxhdW5heUNvdW50LFxuICAgICAgICAgIGF2ZXJhZ2VFZGdlTGVuZ3RoTW06IGNhcHR1cmUucmVjb25zdHJ1Y3Rpb24zRC5hdmVyYWdlRWRnZUxlbmd0aE1tLFxuICAgICAgICB9LFxuICAgICAgICBzY2FuVHlwZTogc2NhblR5cGUsXG4gICAgICAgIGxpZGFyRGF0YVVybDogYGh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9lZGdlLWFpLWxpZGFyLWR1bXBzL3Jhdy8ke2NhcHR1cmUuaWQudG9Mb3dlckNhc2UoKX0ucGx5YCxcbiAgICAgICAgcmF3SW1hZ2VzVXJsOiBbY2FwdHVyZS5pbWFnZVVybF0sXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MgJiYgcmVzcG9uc2UucmVjb3JkKSB7XG4gICAgICAgIGlmIChvbkFkZERpYWdub3N0aWNMb2cpIHtcbiAgICAgICAgICBvbkFkZERpYWdub3N0aWNMb2coJ1NZU1RFTScsIGDinKggJHtyZXNwb25zZS5tZXNzYWdlfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvblNhdmVDbG91ZFJlY29yZCkge1xuICAgICAgICAgIG9uU2F2ZUNsb3VkUmVjb3JkKHJlc3BvbnNlLnJlY29yZCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0U2VudFRvQ2x1Yih0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZhbGxiYWNrRXJyID0gcmVzcG9uc2UubWVzc2FnZSB8fCBcIkLFgsSFZCB6YXBpc3UuIEJ1xYJhIHByb3NpIG8gcG9ub3duxIUgcHLDs2LEmS5cIjtcbiAgICAgICAgaWYgKG9uQWRkRGlhZ25vc3RpY0xvZykge1xuICAgICAgICAgIG9uQWRkRGlhZ25vc3RpY0xvZygnRElBRycsIGDinYwgJHtmYWxsYmFja0Vycn1gKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZmFsbGJhY2tFcnIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zdCBlcnJvck1zZyA9IGBCxYLEhWQgemFwaXN1OiAke2Vycj8ubWVzc2FnZSB8fCBlcnJ9LiBCdcWCYSBwcm9zaSBvIHBvbm93bsSFIHByw7NixJkuIPCfkLnwn46SYDtcbiAgICAgIGlmIChvbkFkZERpYWdub3N0aWNMb2cpIHtcbiAgICAgICAgb25BZGREaWFnbm9zdGljTG9nKCdESUFHJywgYOKdjCAke2Vycm9yTXNnfWApO1xuICAgICAgfVxuICAgICAgc2V0RXJyb3JNZXNzYWdlKGVycm9yTXNnKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0U2VuZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwLzUwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJnLXNsYXRlLTk1MC85MCBmbGV4IGZsZXgtY29sIHRyYW5zaXRpb24tYWxsIHNoYWRvdy14bFwiIGlkPVwiZXhwb3J0X3BhbmVsX3Jvb3RcIj5cbiAgICAgIFxuICAgICAgey8qIDMuIEVrc3BvcnQgaSBXeW5pa2k6IElzb2xhdGVkIEhpZ2gtQ29udHJhc3QgQ2FyZCB0byBnaXZlIGZ1bGwgY29udHJvbCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtOTUwLzUwIHRvLXRlYWwtOTUwLzQwIHAtNSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiIGlkPVwiaXNvbGF0ZWRfZXhwb3J0X2NvbnRyb2xfY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTMgbWF4LXcteGxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC05NTAvODAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LXhsIHNocmluay0wIG10LTAuNVwiPlxuICAgICAgICAgICAg8J+QuVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWVtZXJhbGQtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxzcGFuPlBSWkVTWcWBIERPIFBPU1RHUkVTUUwgKFNVUEFCQVNFKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzdweF0gYmctZW1lcmFsZC05MDAvNjAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwIHB4LTEgcHktMC4yIHJvdW5kZWQgZm9udC1ub3JtYWwgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgRGF0YWJhc2VDb25uZWN0b3IgUHJvdG9jb2xcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0xIGxlYWRpbmctbm9ybWFsXCI+XG4gICAgICAgICAgICAgIHshc2VudFRvQ2x1YiBcbiAgICAgICAgICAgICAgICA/IFwiRnV6amEgTGlEQVIgaSBwYXJhbWV0cnkgZm90b21ldHJ5Y3puZSB6b3N0YcWCeSBwb215xZtsbmllIHpub3JtYWxpem93YW5lISBNYXN6IHBlxYJuxIUga29udHJvbMSZIG5hZCBzd29pbWkgZGFueW1pLiBXecWbbGlqIHN1cm93eSBza2FuIGRvIGNobXVyeSAoaXNfcHJvY2Vzc2VkOiBmYWxzZSksIGJ5IGN6ZWthxYIgbmEgYW5hbGl6xJkgc2lsbmlrYSBBSS5cIlxuICAgICAgICAgICAgICAgIDogXCJTdWtjZXMhIERhbmUgYmV6cGllY3puaWUgd3lsxIVkb3dhxYJ5IHcgdGFiZWxpICd1c2VyX3NjYW5zX3JhdycgdyBTdXBhYmFzZS4gQ2hvbWlrIEJ1xYJhIGkgZWtpcGEgemFjenluYWrEhSBncnnFusSHIHppYXJubyBpIHdla3RvcnkhXCJcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAge2Vycm9yTWVzc2FnZSAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiB0ZXh0LVsxMHB4XSB0ZXh0LWFtYmVyLTQwMCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYmctYW1iZXItOTUwLzQwIGJvcmRlciBib3JkZXItYW1iZXItOTAwLzQwIHAtMS41IHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICA8QWxlcnRDaXJjbGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntlcnJvck1lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICB7IXNlbnRUb0NsdWIgPyAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNlbmRUb0NsdWJ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtzZW5kaW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LXNhbnMgdGV4dC14cyBmb250LWJsYWNrIHB5LTMgcHgtNiByb3VuZGVkLWxnIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICBzZW5kaW5nXG4gICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCBjdXJzb3Itd2FpdCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWVtZXJhbGQtNTAwIGhvdmVyOmJnLWVtZXJhbGQtNjAwIGJvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LXNsYXRlLTk1MCBzaGFkb3ctWzBfMF8xNXB4X3JnYmEoMTYsMTg1LDEyOSwwLjI1KV0gaG92ZXI6c2NhbGUtWzEuMDNdIGFjdGl2ZTpzY2FsZS05NSdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIGlkPVwic2VuZF90b19jbHViX21lbWJlcnNfYnRuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNlbmQgY2xhc3NOYW1lPXtgdy00IGgtNCAke3NlbmRpbmcgPyAnYW5pbWF0ZS1ib3VuY2UnIDogJyd9YH0gLz5cbiAgICAgICAgICAgICAgPHNwYW4+e3NlbmRpbmcgPyAnWkFQSVNZV0FOSUUuLi4nIDogJ01BTVkgVE8hIChaQVBJU1opJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1lbWVyYWxkLTk1MC80MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwIHB4LTQgcHktMi41IHJvdW5kZWQtbGcgdGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gdGV4dC1bMTBweF0gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LVswXzBfMTJweF9yZ2JhKDE2LDE4NSwxMjksMC4xNSldXCI+XG4gICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5aQVBJU0FOTyBXIFNVUEFCQVNFISDwn5C58J+agDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsZWFyQ2FwdHVyZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMyBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODUwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZm9udC1tb25vIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgdGl0bGU9XCJXeWN6ecWbxIcgc2VzasSZIHNrYW51XCJcbiAgICAgICAgICAgIGlkPVwiY2xlYXJfY2FwdHVyZV9zZXNzaW9uX2J0blwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgUkVTRVRcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFN0cnVjdHVyZWQgcGF5bG9hZCBkZXRhaWxzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBweC00IHB5LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCIgaWQ9XCJleHBvcnRfZGV0YWlsc19oZWFkZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2xhdGUtNDAwXCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSBmb250LWJvbGQgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICBNZXRyeWtpIEluZ2VzdHUgaSBQYXlsb2FkIFNlbnNvckNvbmZpZ1Byb3RvY29sXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvcHl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgcHgtMiBiZy1zbGF0ZS05NTAgaG92ZXI6Ymctc2xhdGUtOTAwIHRleHQtc2xhdGUtMzAwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZm9udC1tb25vIHRleHQtWzhweF0gdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgaWQ9XCJidG5fY29weV9wYXlsb2FkX3N1YlwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvcGllZCA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPn1cbiAgICAgICAgICAgIDxzcGFuPktPUElVSiBKU09OPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2Rvd25sb2FkSnNvbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSBweC0yIGJnLXNsYXRlLTk1MCBob3ZlcjpiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS0zMDAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBmb250LW1vbm8gdGV4dC1bOHB4XSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICBpZD1cImJ0bl9kb3dubG9hZF9wYXlsb2FkX3N1YlwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UE9CSUVSWiBQTElLPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTUgZGl2aWRlLXkgbWQ6ZGl2aWRlLXktMCBtZDpkaXZpZGUteCBkaXZpZGUtc2xhdGUtOTAwXCI+XG4gICAgICAgIFxuICAgICAgICB7LyogTGVmdCBDb2w6IFByZXZpZXcgQ2FyZCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0yIHAtNCBmbGV4IGZsZXgtY29sIGdhcC0zLjVcIiBpZD1cImNhcHR1cmVkX25vcm1hbGl6ZWRfcHJldmlld19jb2x1bW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTAuNVwiPlxuICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNTAwIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgUFJaRUdMxIREIE5PUk1BTElaQUNKSSBMSURBUlxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIHRleHQtc2t5LTQwMCBzZWxlY3QtYWxsIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgIElEOiB7Y2FwdHVyZS5pZH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgcm91bmRlZC1sZyBvdmVyZmxvdy1oaWRkZW4gYmctc2xhdGUtOTUwIGFzcGVjdC1bNC8zXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAge2NhcHR1cmUuaW1hZ2VVcmwgPyAoXG4gICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICBzcmM9e2NhcHR1cmUuaW1hZ2VVcmx9XG4gICAgICAgICAgICAgICAgYWx0PVwiQ2FwdHVyZWQgc2NhblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXIgb3BhY2l0eS04MFwiXG4gICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgQlJBSyBQT0RHTMSERFUgT0JSQVpVXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1yYWRpYWwtYXQtYyBmcm9tLXRyYW5zcGFyZW50IHZpYS1zbGF0ZS05NTAvMjAgdG8tc2xhdGUtOTUwLzQwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogT3ZlcmxheSBib3VuZGluZyBjaXJjbGUgcmVwcmVzZW50aW5nIHNlbnNvciBjYWxpYnJhdGlvbiBmb2N1cyB6b25lICovfVxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MCByb3VuZGVkLVsyOHB4XSBwb2ludGVyLWV2ZW50cy1ub25lIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHdpZHRoOiBgJHtjYXB0dXJlLm1ldHJpY3MuZGlzdGFuY2UgPCAwLjMgPyAnODIlJyA6IGNhcHR1cmUubWV0cmljcy5kaXN0YW5jZSA+IDAuMzggPyAnNTglJyA6ICc3MCUnfWAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnNzUlJyxcbiAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDAgOHB4IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjE1KScsXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHctMi41IGgtMi41IGJvcmRlci10IGJvcmRlci1sIGJvcmRlci1lbWVyYWxkLTQwMCByb3VuZGVkLXRsLVsyOHB4XVwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCB3LTIuNSBoLTIuNSBib3JkZXItdCBib3JkZXItciBib3JkZXItZW1lcmFsZC00MDAgcm91bmRlZC10ci1bMjhweF1cIiAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0wIGxlZnQtMCB3LTIuNSBoLTIuNSBib3JkZXItYiBib3JkZXItbCBib3JkZXItZW1lcmFsZC00MDAgcm91bmRlZC1ibC1bMjhweF1cIiAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0wIHJpZ2h0LTAgdy0yLjUgaC0yLjUgYm9yZGVyLWIgYm9yZGVyLXIgYm9yZGVyLWVtZXJhbGQtNDAwIHJvdW5kZWQtYnItWzI4cHhdXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1lbWVyYWxkLTQwMCBiZy1zbGF0ZS05NTAvOTAgcHgtMSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTAwXCI+XG4gICAgICAgICAgICAgICAgRlVaSkFfTE9DS19BQ1RJVkVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUGh5c2ljcyAmIFNlbnNvciBzdGF0cyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCByb3VuZGVkLWxnIHAtMyBmbGV4IGZsZXgtY29sIGdhcC0yIGZvbnQtbW9ubyB0ZXh0LVs5cHhdXCIgaWQ9XCJjYXB0dXJlZF9waHlzaWNzX3N0YXRzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtYm9sZCBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwIHBiLTEgbWItMVwiPlxuICAgICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+TUVUUllLSSBTRU5TT1JZQ1pORTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPk9kbGVnxYJvxZvEhzo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGZvbnQtYm9sZFwiPnsoY2FwdHVyZS5tZXRyaWNzLmRpc3RhbmNlICogMTAwKS50b0ZpeGVkKDEpfSBjbTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPk5hxZt3aWV0bGVuaWUgKEx1bWEpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj57Y2FwdHVyZS5sb2Nrcy5sdW1hVmFsdWV9IExtPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+T3N0cm/Fm8SHIChTaGFycG5lc3MpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj57Y2FwdHVyZS5sb2Nrcy5zaGFycG5lc3NWYWx1ZS50b0ZpeGVkKDIpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPlRlbXBlcmF0dXJhIGJhcndvd2EgKENDVCk6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPntjYXB0dXJlLmxvY2tzLmNjdFZhbHVlfSBLPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAgcHQtMSBtdC0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC01MDAgZm9udC1ib2xkXCI+QW5hbGl6YSBEZWxhdW5heWE6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPlNQw5NKTkEgLyBaQVRXSUVSRFpPTkE8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJpZ2h0IENvbDogSlNPTiBzdHJ1Y3R1cmUgcGF5bG9hZCB2aWV3ZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMyBwLTQgZmxleCBmbGV4LWNvbCBnYXAtMiBiZy1zbGF0ZS05NTAvNDBcIiBpZD1cImNhcHR1cmVkX2pzb25fcGF5bG9hZF9jb2x1bW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRleHQtWzlweF0gdXBwZXJjYXNlIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgPENvZGUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5TVFJVS1RVUkEgREFOWUNIIERPIElOR0VTVFUgKEpTT04pPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG1pbi1oLVsyMjBweF0gYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQtbGcgcC0zIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIG92ZXJmbG93LWF1dG8gbWF4LWgtWzMyMHB4XSB0ZXh0LXNreS0yMDAvODBcIj5cbiAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwid2hpdGVzcGFjZS1wcmUtd3JhcCBsZWFkaW5nLXJlbGF4ZWQgc2VsZWN0LWFsbFwiPlxuICAgICAgICAgICAgICB7SlNPTi5zdHJpbmdpZnkoY2FwdHVyZSwgbnVsbCwgMil9XG4gICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICA8SGVscENpcmNsZSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtc2xhdGUtNjAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPk1vZGVsIGluZ2VzdHVqZSBjaG11csSZIHB1bmt0w7N3IFBMWSB3ZSB3c3DDs8WCcHJhY3kgemUgc2NoZW1hdGVtIGJhenkgZGFueWNoICd1c2VyX3NjYW5zX3JhdycuPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFpQ1E7QUFqQ1I7QUFBQTtBQUFBO0FBQUE7QUFLQSxTQUFnQixnQkFBZ0I7QUFFaEMsU0FBUyxNQUFNLE9BQU8sVUFBVSxVQUFVLGFBQWEsS0FBSyxPQUFPLE1BQU0sWUFBWSxtQkFBbUI7QUFDeEcsU0FBUywwQkFBMEI7QUFVNUIsYUFBTSxjQUEwQyxDQUFDO0FBQUEsRUFDdEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFdBQVc7QUFDYixNQUFNO0FBQ0osUUFBTSxDQUFDLFFBQVEsU0FBUyxJQUFJLFNBQVMsS0FBSztBQUMxQyxRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBUyxLQUFLO0FBQ2xELFFBQU0sQ0FBQyxTQUFTLFVBQVUsSUFBSSxTQUFTLEtBQUs7QUFDNUMsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQXdCLElBQUk7QUFFcEUsTUFBSSxDQUFDLFNBQVM7QUFDWixXQUNFLHVCQUFDLFNBQUksV0FBVSw0SUFBMkksSUFBRyxzQkFDM0o7QUFBQSw2QkFBQyxZQUFTLFdBQVUsK0NBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBZ0U7QUFBQSxNQUNoRSx1QkFBQyxPQUFFLFdBQVUsMkVBQTBFLGdEQUF2RjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxNQUNBLHVCQUFDLE9BQUUsV0FBVSxnRkFBK0UsMExBQTVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLFNBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQVFBO0FBQUEsRUFFSjtBQUVBLFFBQU0sYUFBYSxNQUFNO0FBQ3ZCLGNBQVUsVUFBVSxVQUFVLEtBQUssVUFBVSxTQUFTLE1BQU0sQ0FBQyxDQUFDO0FBQzlELGNBQVUsSUFBSTtBQUNkLGVBQVcsTUFBTSxVQUFV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