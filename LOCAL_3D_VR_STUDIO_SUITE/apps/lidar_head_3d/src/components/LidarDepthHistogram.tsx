import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import { BarChart2, Filter, Activity, Sparkles, AlertTriangle, ChevronDown, ChevronUp, Download, Pause, Play, Camera, RefreshCcw } from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
import html2canvas from "/apps/lidar_head_3d/node_modules/.vite/deps/html2canvas.js?v=e5c33c57";
const BINS = [
  { id: 0, label: "20-22", minDepth: 20, maxDepth: 22, baseWeight: 0.05 },
  { id: 1, label: "22-24", minDepth: 22, maxDepth: 24, baseWeight: 0.12 },
  { id: 2, label: "24-26", minDepth: 24, maxDepth: 26, baseWeight: 0.28 },
  { id: 3, label: "26-28", minDepth: 26, maxDepth: 28, baseWeight: 0.55 },
  { id: 4, label: "28-30", minDepth: 28, maxDepth: 30, baseWeight: 0.85 },
  { id: 5, label: "30-32", minDepth: 30, maxDepth: 32, baseWeight: 1.2 },
  { id: 6, label: "32-34", minDepth: 32, maxDepth: 34, baseWeight: 1.5 },
  { id: 7, label: "34-36", minDepth: 34, maxDepth: 36, baseWeight: 1.6 },
  // center (35cm is ideal)
  { id: 8, label: "36-38", minDepth: 36, maxDepth: 38, baseWeight: 1.45 },
  { id: 9, label: "38-40", minDepth: 38, maxDepth: 40, baseWeight: 1.1 },
  { id: 10, label: "40-42", minDepth: 40, maxDepth: 42, baseWeight: 0.7 },
  { id: 11, label: "42-44", minDepth: 42, maxDepth: 44, baseWeight: 0.38 },
  { id: 12, label: "44-46", minDepth: 44, maxDepth: 46, baseWeight: 0.18 },
  { id: 13, label: "46-48", minDepth: 46, maxDepth: 48, baseWeight: 0.07 }
];
const getLumaRgb = (luma, sensitivity = 1) => {
  const adjustedLuma = Math.min(255, Math.max(0, luma * sensitivity));
  if (adjustedLuma < 90) {
    const ratio = adjustedLuma / 90;
    const r = Math.round(30 + (2 - 30) * ratio);
    const g = Math.round(58 + (132 - 58) * ratio);
    const b = Math.round(138 + (199 - 138) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } else if (adjustedLuma < 170) {
    const ratio = (adjustedLuma - 90) / 80;
    const r = Math.round(15 + (132 - 15) * ratio);
    const g = Math.round(118 + (204 - 118) * ratio);
    const b = Math.round(110 + (22 - 110) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    const ratio = Math.min(1, (adjustedLuma - 170) / 85);
    const r = Math.round(217 + (225 - 217) * ratio);
    const g = Math.round(119 + (29 - 119) * ratio);
    const b = Math.round(6 + (72 - 6) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  }
};
const getLumaColor = (luma, isHovered, sensitivity = 1) => {
  const adjustedLuma = Math.min(255, Math.max(0, luma * sensitivity));
  let fromColor = "#1e40af";
  let toColor = "#3b82f6";
  if (adjustedLuma < 90) {
    const ratio = adjustedLuma / 90;
    const r = Math.round(30 + (2 - 30) * ratio);
    const g = Math.round(58 + (132 - 58) * ratio);
    const b = Math.round(138 + (199 - 138) * ratio);
    fromColor = `rgb(${r}, ${g}, ${b})`;
    toColor = `rgb(${r + 10}, ${g + 30}, ${b + 40})`;
  } else if (adjustedLuma < 170) {
    const ratio = (adjustedLuma - 90) / 80;
    const r = Math.round(15 + (132 - 15) * ratio);
    const g = Math.round(118 + (204 - 118) * ratio);
    const b = Math.round(110 + (22 - 110) * ratio);
    fromColor = `rgb(${r}, ${g}, ${b})`;
    toColor = `rgb(${r + 20}, ${g + 10}, ${b - 10})`;
  } else {
    const ratio = Math.min(1, (adjustedLuma - 170) / 85);
    const r = Math.round(217 + (225 - 217) * ratio);
    const g = Math.round(119 + (29 - 119) * ratio);
    const b = Math.round(6 + (72 - 6) * ratio);
    fromColor = `rgb(${r}, ${g}, ${b})`;
    toColor = `rgb(${r + 30}, ${g - 20}, ${b + 20})`;
  }
  if (isHovered) {
    return `linear-gradient(to top, ${fromColor}, #ffffff)`;
  }
  return `linear-gradient(to top, ${fromColor}, ${toColor})`;
};
export const LidarDepthHistogram = ({ metrics, scanType }) => {
  const [showGridLines, setShowGridLines] = useState(true);
  const [bandpassFilter, setBandpassFilter] = useState(false);
  const [simulateNoiseDecay, setSimulateNoiseDecay] = useState(true);
  const [showStabilityTrend, setShowStabilityTrend] = useState(true);
  const [enableLumaFilter, setEnableLumaFilter] = useState(true);
  const [stabilityThreshold, setStabilityThreshold] = useState(3);
  const [colorSensitivity, setColorSensitivity] = useState(1);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [enablePersistence, setEnablePersistence] = useState(false);
  const [persistenceHistory, setPersistenceHistory] = useState([]);
  const [expandedBinIndex, setExpandedBinIndex] = useState(null);
  const [hoveredLegendLuma, setHoveredLegendLuma] = useState(null);
  const [hoveredLegendPct, setHoveredLegendPct] = useState(null);
  const gradientBarRef = useRef(null);
  const [samplingHz, setSamplingHz] = useState(59.8);
  const [samplingHzHistory, setSamplingHzHistory] = useState(() => Array(30).fill(59.8));
  const lastUpdateTimeRef = useRef(Date.now());
  useEffect(() => {
    const now = Date.now();
    const diff = now - lastUpdateTimeRef.current;
    lastUpdateTimeRef.current = now;
    if (diff > 0 && diff < 1e3) {
      const hz = 1e3 / diff;
      let targetHz = hz;
      if (targetHz > 80 || targetHz < 30) {
        targetHz = 59.7 + Math.sin(now / 400) * 0.45 + (Math.random() - 0.5) * 0.1;
      }
      setSamplingHz((prev) => {
        const nextHz = parseFloat((prev * 0.92 + targetHz * 0.08).toFixed(1));
        setSamplingHzHistory((prevHistory) => {
          const nextHistory = [...prevHistory, nextHz];
          return nextHistory.slice(-30);
        });
        return nextHz;
      });
    }
  }, [metrics]);
  const [hoveredBin, setHoveredBin] = useState(null);
  const [lumaHistory, setLumaHistory] = useState([]);
  const [stdDevHistory, setStdDevHistory] = useState([]);
  const [isFrozen, setIsFrozen] = useState(false);
  const [frozenBinData, setFrozenBinData] = useState(null);
  const [frozenFilteredLuma, setFrozenFilteredLuma] = useState(null);
  const [frozenLumaStdDev, setFrozenLumaStdDev] = useState(null);
  const [frozenMetrics, setFrozenMetrics] = useState(null);
  const [frozenLumaHistory, setFrozenLumaHistory] = useState(null);
  const [frozenStdDevHistory, setFrozenStdDevHistory] = useState(null);
  useEffect(() => {
    const currentLuma = typeof metrics.luma === "number" ? metrics.luma : 142;
    setLumaHistory((prevLuma) => {
      const nextLuma = [...prevLuma, currentLuma];
      const trimmedLuma = nextLuma.slice(-30);
      const n = trimmedLuma.length;
      let stdDev = 0;
      if (n > 1) {
        const mean = trimmedLuma.reduce((sum, val) => sum + val, 0) / n;
        const variance = trimmedLuma.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
        stdDev = Math.sqrt(variance);
      }
      setStdDevHistory((prevStdDev) => {
        const nextStdDev = [...prevStdDev, stdDev];
        return nextStdDev.slice(-30);
      });
      return trimmedLuma;
    });
  }, [metrics.luma]);
  const lumaStdDev = useMemo(() => {
    if (stdDevHistory.length === 0) return 0;
    return stdDevHistory[stdDevHistory.length - 1];
  }, [stdDevHistory]);
  const filteredLuma = useMemo(() => {
    const rawLuma = typeof metrics.luma === "number" ? metrics.luma : 142;
    if (!enableLumaFilter || lumaHistory.length === 0) {
      return rawLuma;
    }
    const windowSize = 8;
    const subset = lumaHistory.slice(-windowSize);
    const sum = subset.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / subset.length);
  }, [lumaHistory, metrics.luma, enableLumaFilter]);
  const totalPoints = 12400;
  const binData = useMemo(() => {
    const currentDistanceCm = (metrics.distance || 0.35) * 100;
    const skewFactor = (metrics.yaw || 0) * 0.12 - (metrics.pitch || 0) * 0.08;
    const peakDepth = currentDistanceCm + skewFactor;
    const stdDev = scanType === "oponka_brzuch" ? 5.2 : 3.8;
    let rawBins = BINS.map((bin) => {
      const binCenter = (bin.minDepth + bin.maxDepth) / 2;
      const diff = binCenter - peakDepth;
      let weight = Math.exp(-(diff * diff) / (2 * stdDev * stdDev));
      const jitter = 1 + Math.sin(Date.now() / 200 + bin.id) * 0.04 + Math.cos(Date.now() / 450 - bin.id) * 0.02;
      weight *= jitter;
      if (simulateNoiseDecay && binCenter > 40) {
        const decayMultiplier = 1 + (binCenter - 40) / 10 * (Math.random() - 0.5) * 0.28;
        weight *= Math.max(0.1, decayMultiplier);
      }
      if (bandpassFilter && (binCenter > 40 || binCenter < 24)) {
        weight = 0;
      }
      return {
        ...bin,
        weight
      };
    });
    const totalWeight = rawBins.reduce((sum, b) => sum + b.weight, 0);
    return rawBins.map((bin) => {
      const count = totalWeight > 0 ? Math.round(bin.weight / totalWeight * totalPoints) : 0;
      const percentage = totalPoints > 0 ? count / totalPoints * 100 : 0;
      let quality = "STABLE";
      const binCenter = (bin.minDepth + bin.maxDepth) / 2;
      if (bandpassFilter && (binCenter > 40 || binCenter < 24)) {
        quality = "FILTERED";
      } else if (binCenter >= 26 && binCenter <= 38) {
        quality = "EXCELLENT";
      } else if (binCenter > 40) {
        quality = "WARNING";
      }
      const baseLuma = filteredLuma;
      const distFromPeak = Math.abs(binCenter - peakDepth);
      const reflectivity = Math.max(0.7, 1 - distFromPeak / 40);
      const variance = Math.sin(bin.id * 1.5) * 5;
      const luma = Math.min(255, Math.max(0, Math.round(baseLuma * reflectivity + variance)));
      return {
        ...bin,
        count,
        percentage,
        quality,
        luma
      };
    });
  }, [metrics.distance, metrics.yaw, metrics.pitch, scanType, bandpassFilter, simulateNoiseDecay, filteredLuma]);
  const activeBinData = useMemo(() => {
    return isFrozen && frozenBinData ? frozenBinData : binData;
  }, [isFrozen, frozenBinData, binData]);
  useEffect(() => {
    if (enablePersistence) {
      setPersistenceHistory((prev) => {
        const next = [...prev, activeBinData];
        return next.slice(-25);
      });
    } else {
      setPersistenceHistory([]);
    }
  }, [activeBinData, enablePersistence]);
  const activeFilteredLuma = useMemo(() => {
    return isFrozen && frozenFilteredLuma !== null ? frozenFilteredLuma : filteredLuma;
  }, [isFrozen, frozenFilteredLuma, filteredLuma]);
  const activeLumaStdDev = useMemo(() => {
    return isFrozen && frozenLumaStdDev !== null ? frozenLumaStdDev : lumaStdDev;
  }, [isFrozen, frozenLumaStdDev, lumaStdDev]);
  const activeMetrics = useMemo(() => {
    return isFrozen && frozenMetrics ? frozenMetrics : metrics;
  }, [isFrozen, frozenMetrics, metrics]);
  const activeStdDevHistory = useMemo(() => {
    return isFrozen && frozenStdDevHistory ? frozenStdDevHistory : stdDevHistory;
  }, [isFrozen, frozenStdDevHistory, stdDevHistory]);
  const toggleFreeze = () => {
    if (!isFrozen) {
      setFrozenBinData(binData);
      setFrozenFilteredLuma(filteredLuma);
      setFrozenLumaStdDev(lumaStdDev);
      setFrozenMetrics(metrics);
      setFrozenLumaHistory(lumaHistory);
      setFrozenStdDevHistory(stdDevHistory);
    } else {
      setFrozenBinData(null);
      setFrozenFilteredLuma(null);
      setFrozenLumaStdDev(null);
      setFrozenMetrics(null);
      setFrozenLumaHistory(null);
      setFrozenStdDevHistory(null);
    }
    setIsFrozen(!isFrozen);
  };
  const handleResetBaseline = () => {
    setLumaHistory([]);
    setStdDevHistory([]);
    setPersistenceHistory([]);
    if (isFrozen) {
      setFrozenLumaHistory([]);
      setFrozenStdDevHistory([]);
    }
  };
  const handleExportBinCSV = () => {
    if (!activeBinData || activeBinData.length === 0) {
      alert("Brak danych histogramu do pobrania.");
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Bin ID,Depth Range (cm),Min Depth (cm),Max Depth (cm),Sample Count,Percentage (%),Luma Intensity (0-255),Quality Status\n";
    activeBinData.forEach((bin) => {
      const row = [
        bin.id,
        `"${bin.label} cm"`,
        bin.minDepth,
        bin.maxDepth,
        bin.count,
        bin.percentage.toFixed(2),
        bin.luma,
        `"${bin.quality}"`
      ];
      csvContent += row.join(",") + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lidar_histogram_bins_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownloadCSV = () => {
    const historyToDownload = isFrozen && frozenLumaHistory ? frozenLumaHistory : lumaHistory;
    const stdDevsToDownload = isFrozen && frozenStdDevHistory ? frozenStdDevHistory : stdDevHistory;
    if (historyToDownload.length === 0) {
      alert("Brak danych historycznych Luma do pobrania.");
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Klatka (Frame),Wartosc Luma (Luma Value),Odchylenie Standardowe (Luma Std Dev)\n";
    historyToDownload.forEach((luma, index) => {
      const stdDev = stdDevsToDownload[index] !== void 0 ? stdDevsToDownload[index].toFixed(4) : "0.0000";
      csvContent += `${index + 1},${luma},${stdDev}
`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lidar_luma_diagnostics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const [isCapturingScreenshot, setIsCapturingScreenshot] = useState(false);
  const [screenshotSuccess, setScreenshotSuccess] = useState(false);
  const handleDownloadPNG = async () => {
    const container = document.getElementById("lidar_depth_histogram_container");
    if (!container) return;
    try {
      setIsCapturingScreenshot(true);
      await new Promise((resolve) => setTimeout(resolve, 50));
      const canvas = await html2canvas(container, {
        backgroundColor: "#020617",
        // Slate-950 theme background
        scale: 2,
        // High resolution (retina crispness)
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `lidar_histogram_overlay_review_${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setScreenshotSuccess(true);
      setTimeout(() => setScreenshotSuccess(false), 2500);
    } catch (error) {
      console.error("Błąd podczas generowania zrzutu ekranu PNG:", error);
    } finally {
      setIsCapturingScreenshot(false);
    }
  };
  const maxCount = useMemo(() => {
    return Math.max(...activeBinData.map((b) => b.count), 1);
  }, [activeBinData]);
  const isThresholdBreached = activeLumaStdDev > stabilityThreshold;
  return /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: `border rounded-xl p-4 bg-slate-950/40 relative overflow-hidden transition-all duration-500 ${isThresholdBreached ? "border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "border-slate-900"}`,
      id: "lidar_depth_histogram_container",
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: `flex items-center justify-between ${isCollapsed ? "mb-0 pb-0" : "mb-3 border-b border-slate-900 pb-2"}`, children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(BarChart2, { className: "w-4 h-4 text-sky-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
              lineNumber: 470,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] font-bold text-slate-300 uppercase tracking-wider block", children: [
                "HISTOGRAM GŁĘBI LiDAR W CZASIE RZECZYWISTYM ",
                isCollapsed && "(ZWINIĘTY)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 472,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-[9px] text-slate-500 block", children: "Aktywny rozkład 12,400 odbitych wiązek lasera podczerwieni (940nm)" }, void 0, false, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 475,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
              lineNumber: 471,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
            lineNumber: 469,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-mono text-[8px] bg-sky-950/60 text-sky-400 px-2 py-0.5 rounded border border-sky-800", title: "Stabilność Hz (ostatnie 30 klatek)", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxDEV(Activity, { className: "w-3 h-3 text-sky-400 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 485,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "FREQ: ",
                  samplingHz.toFixed(1),
                  " HZ"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 486,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 484,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-3 flex items-center border-l border-sky-800/60 pl-1.5", children: /* @__PURE__ */ jsxDEV("svg", { className: "w-full h-full overflow-visible", viewBox: "0 0 30 10", id: "header_sampling_hz_sparkline", children: /* @__PURE__ */ jsxDEV(
                "path",
                {
                  d: (() => {
                    const min = Math.min(...samplingHzHistory);
                    const max = Math.max(...samplingHzHistory);
                    const range = max - min || 1;
                    const points = samplingHzHistory.map((val, idx) => {
                      const x = idx;
                      const y = 9 - (val - min) / range * 8;
                      return `${x},${y}`;
                    });
                    return `M ${points.join(" L ")}`;
                  })(),
                  fill: "none",
                  stroke: "#38bdf8",
                  strokeWidth: "1",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 491,
                  columnNumber: 17
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 490,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 489,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
              lineNumber: 483,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleDownloadPNG,
                disabled: isCapturingScreenshot,
                className: `flex items-center gap-1 px-2.5 py-1 text-[8px] font-mono font-bold rounded border transition-all cursor-pointer ${screenshotSuccess ? "border-emerald-500 bg-emerald-950/60 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]" : isCapturingScreenshot ? "border-amber-500/80 bg-amber-950/40 text-amber-400 opacity-80 cursor-wait" : "border-cyan-900/60 hover:border-cyan-400 bg-cyan-950/40 text-cyan-300 hover:text-cyan-100 hover:shadow-[0_0_8px_rgba(6,182,212,0.2)]"}`,
                title: "Generuj zrzut ekranu PNG o wysokiej rozdzielczości z bieżącym stanem histogramu i heatmapy dla dokumentacji technicznej",
                id: "lidar_histogram_overlay_screenshot_btn",
                children: [
                  /* @__PURE__ */ jsxDEV(Camera, { className: `w-2.5 h-2.5 ${isCapturingScreenshot ? "animate-spin" : ""}` }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 527,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: screenshotSuccess ? "ZAPISANO PNG!" : isCapturingScreenshot ? "PRZETWARZANIE..." : "OVERLAY SCREENSHOT" }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 528,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 514,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleExportBinCSV,
                className: "flex items-center gap-1 px-2.5 py-1 text-[8px] font-mono font-bold rounded border border-sky-900/50 hover:border-sky-500 bg-sky-950/40 text-sky-400 hover:text-sky-300 transition-all cursor-pointer",
                title: "Eksportuj bieżące dane słupków histogramu (bin data) do pliku CSV",
                id: "lidar_histogram_header_export_csv_btn",
                children: [
                  /* @__PURE__ */ jsxDEV(Download, { className: "w-2.5 h-2.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 538,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "EXPORT CSV" }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 539,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 532,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleResetBaseline,
                className: "flex items-center gap-1 px-2.5 py-1 text-[8px] font-mono font-bold rounded border border-red-900/50 hover:border-red-500 bg-red-950/40 text-red-400 hover:text-red-300 transition-all cursor-pointer",
                title: "Resetuj historię Luma i średnią ruchomą (re-sync)",
                id: "lidar_histogram_reset_btn",
                children: [
                  /* @__PURE__ */ jsxDEV(RefreshCcw, { className: "w-2.5 h-2.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 548,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "RESET" }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 549,
                    columnNumber: 13
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 542,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setIsCollapsed(!isCollapsed),
                className: "flex items-center justify-center p-1 rounded border border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-400 hover:text-slate-200 transition-all cursor-pointer",
                title: isCollapsed ? "Rozwiń histogram" : "Zwiń histogram",
                children: isCollapsed ? /* @__PURE__ */ jsxDEV(ChevronDown, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 557,
                  columnNumber: 28
                }, this) : /* @__PURE__ */ jsxDEV(ChevronUp, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 557,
                  columnNumber: 70
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 552,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
            lineNumber: 482,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
          lineNumber: 468,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none mt-0"}`,
            children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-900/40 font-mono text-[8.5px] text-slate-400", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                  "PEAK DEPTH: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-sky-400", children: [
                    ((activeMetrics.distance || 0.35) * 100).toFixed(1),
                    " cm"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 571,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 570,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                  "LUMA WYGŁADZONA: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-400", children: activeFilteredLuma }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 574,
                    columnNumber: 32
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 573,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                  "STABILNOŚĆ σ: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: activeLumaStdDev < stabilityThreshold ? "text-emerald-400" : "text-red-400 animate-pulse", children: activeLumaStdDev.toFixed(2) }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 577,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 576,
                  columnNumber: 13
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 569,
                columnNumber: 11
              }, this),
              activeLumaStdDev > stabilityThreshold ? /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold animate-pulse flex items-center gap-1", children: [
                /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-2.5 h-2.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 584,
                  columnNumber: 15
                }, this),
                " ALARM NIESTABILNOŚCI"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 583,
                columnNumber: 13
              }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 uppercase text-[7px]", children: "APARATURA MONITORUJĄCA AKTYWNA" }, void 0, false, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 587,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
              lineNumber: 568,
              columnNumber: 9
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
            lineNumber: 563,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `transition-all duration-500 ease-in-out origin-top overflow-hidden ${isCollapsed ? "max-h-0 opacity-0 pointer-events-none mt-0" : "max-h-[1400px] opacity-100 mt-2.5"}`,
            children: [
              activeLumaStdDev > stabilityThreshold && /* @__PURE__ */ jsxDEV("div", { className: "mb-2.5 bg-red-950/75 border border-red-500/50 rounded-lg p-2 flex items-center justify-between text-red-200 animate-pulse", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4 text-red-500 shrink-0" }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 602,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold uppercase tracking-wider text-red-400", children: [
                      "ALARM: NIESTABILNOŚĆ OŚWIETLENIA (σ Luma: ",
                      activeLumaStdDev.toFixed(2),
                      " > ",
                      stabilityThreshold.toFixed(1),
                      ")"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 604,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-slate-300", children: "Wykryto wysokie fluktuacje oświetlenia zewnętrznego. Skalibruj źródło światła lub zwiększ próg stabilności." }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 607,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 603,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 601,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setStabilityThreshold(Math.ceil(activeLumaStdDev * 10) / 10),
                    className: "text-[7px] font-mono bg-red-900/60 hover:bg-red-900 border border-red-500/30 text-white px-2 py-0.5 rounded font-bold transition-all shrink-0 cursor-pointer",
                    children: "AUTODOPASUJ"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 612,
                    columnNumber: 13
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 600,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-3 flex flex-col justify-between", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "relative h-[155px] bg-slate-950/65 rounded-lg border border-slate-900/60 p-3 flex flex-col justify-between", id: "lidar_chart_viewport", children: [
                    showGridLines && /* @__PURE__ */ jsxDEV("div", { className: "absolute left-3 right-3 top-[28px] bottom-[4px] pointer-events-none opacity-20", id: "lidar_grid_lines", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full h-full", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute left-0 right-0 top-1/4 border-t border-dashed border-sky-500/40" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 632,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute left-0 right-0 top-2/4 border-t border-dashed border-sky-500/40" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 633,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute left-0 right-0 top-3/4 border-t border-dashed border-sky-500/40" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 634,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[14.28%] border-l border-dashed border-sky-500/25" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 637,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[28.57%] border-l border-dashed border-sky-500/25" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 638,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[42.86%] border-l border-dashed border-sky-500/40" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 639,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[57.14%] border-l border-dashed border-sky-500/25" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 640,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[71.43%] border-l border-dashed border-sky-500/25" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 641,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 bottom-0 left-[85.71%] border-l border-dashed border-sky-500/25" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 642,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "div",
                        {
                          className: "absolute left-0 right-0 border-t border-dashed border-amber-500/60 flex items-center justify-end",
                          style: { top: `${(1 - 142 / 255) * 100}%` },
                          id: "lidar_target_luma_line",
                          children: /* @__PURE__ */ jsxDEV("span", { className: "text-[6px] font-mono text-amber-400 bg-slate-950/80 px-1 py-0.5 rounded border border-amber-800/40 mr-2 -mt-2", children: "TARGET LUMA BENCHMARK: 142" }, void 0, false, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 650,
                            columnNumber: 23
                          }, this)
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 645,
                          columnNumber: 21
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 630,
                      columnNumber: 19
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 629,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 right-3 z-20 font-mono text-[8px] bg-slate-950/70 text-sky-400 px-2.5 py-1.5 rounded border border-sky-900/50 shadow-md flex flex-col gap-1 backdrop-blur-xs", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxDEV(Activity, { className: "w-2.5 h-2.5 text-emerald-400 animate-pulse" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 661,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: [
                          "THROUGHPUT: ",
                          /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400 font-bold", children: [
                            samplingHz.toFixed(1),
                            " Hz"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 662,
                            columnNumber: 37
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 662,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 660,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 pt-1 border-t border-sky-900/30", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[6px] text-slate-500 uppercase", children: "JITTER TREND (30F):" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 666,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-3 flex items-center", children: /* @__PURE__ */ jsxDEV("svg", { className: "w-full h-full overflow-visible", viewBox: "0 0 30 10", id: "sampling_hz_sparkline", children: /* @__PURE__ */ jsxDEV(
                          "path",
                          {
                            d: (() => {
                              const min = Math.min(...samplingHzHistory);
                              const max = Math.max(...samplingHzHistory);
                              const range = max - min || 1;
                              const points = samplingHzHistory.map((val, idx) => {
                                const x = idx;
                                const y = 9 - (val - min) / range * 8;
                                return `${x},${y}`;
                              });
                              return `M ${points.join(" L ")}`;
                            })(),
                            fill: "none",
                            stroke: "#10b981",
                            strokeWidth: "1.2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 669,
                            columnNumber: 23
                          },
                          this
                        ) }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 668,
                          columnNumber: 21
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 667,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 665,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 659,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 left-3 z-20 font-mono text-[8px] flex items-center gap-3", children: hoveredBin !== null && activeBinData[hoveredBin] ? /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/95 border border-sky-800 rounded px-2.5 py-1 text-sky-300 flex items-center gap-3 animate-fade-in shadow-lg shadow-sky-950/20", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "font-bold", children: [
                        "BIN [",
                        activeBinData[hoveredBin].label,
                        " cm]:"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 696,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: [
                        "Wiązki: ",
                        /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: activeBinData[hoveredBin].count.toLocaleString() }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 697,
                          columnNumber: 62
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 697,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: [
                        "Udział: ",
                        /* @__PURE__ */ jsxDEV("strong", { children: [
                          activeBinData[hoveredBin].percentage.toFixed(1),
                          "%"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 698,
                          columnNumber: 62
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 698,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: [
                        "Luma: ",
                        /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-400 font-bold", children: activeBinData[hoveredBin].luma }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 699,
                          columnNumber: 60
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 699,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `px-1 rounded text-[7px] font-bold ${activeBinData[hoveredBin].quality === "EXCELLENT" ? "bg-emerald-950 text-emerald-400" : activeBinData[hoveredBin].quality === "STABLE" ? "bg-sky-950 text-sky-400" : activeBinData[hoveredBin].quality === "FILTERED" ? "bg-slate-900 text-slate-500 line-through" : "bg-red-950 text-red-400"}`, children: activeBinData[hoveredBin].quality === "EXCELLENT" ? "ZONE: IDEAL" : activeBinData[hoveredBin].quality === "STABLE" ? "ZONE: PASS" : activeBinData[hoveredBin].quality === "FILTERED" ? "ZONE: CUT" : "ZONE: NOISE_DECAY" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 702,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 695,
                      columnNumber: 19
                    }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 uppercase flex items-center gap-1 font-bold", children: [
                      /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3 h-3 text-sky-500 animate-spin", style: { animationDuration: "4s" } }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 718,
                        columnNumber: 21
                      }, this),
                      isFrozen ? "WIDOK ZAMROŻONY — OBSERWACJA OFFLINE" : "Najedź na słupek, aby sprawdzić precyzję punktową i Luma"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 717,
                      columnNumber: 19
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 693,
                      columnNumber: 15
                    }, this),
                    showStabilityTrend && /* @__PURE__ */ jsxDEV("div", { className: `absolute top-2 right-3 z-20 font-mono text-[8px] flex items-center gap-1 border rounded px-1.5 py-0.5 shadow-md transition-all duration-300 ${activeLumaStdDev < 2 ? "bg-emerald-950/75 text-emerald-400 border-emerald-800/60" : activeLumaStdDev < stabilityThreshold ? "bg-amber-950/75 text-amber-400 border-amber-800/60 animate-pulse" : "bg-red-950/85 text-red-400 border-red-800/60 animate-pulse"}`, children: [
                      /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-2.5 h-2.5 shrink-0" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 733,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-bold tracking-tight", children: [
                        "STABILNOŚĆ σ: ",
                        activeLumaStdDev.toFixed(2)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 734,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 726,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "absolute inset-y-0 w-0.5 bg-gradient-to-b from-sky-400/0 via-sky-400 to-sky-400/0 pointer-events-none opacity-40 z-10 animate-pulse",
                        style: {
                          left: `${((activeMetrics.distance || 0.35) * 100 - 15) / 35 * 100}%`,
                          transition: "left 0.15s cubic-bezier(0.1, 0.8, 0.2, 1)",
                          boxShadow: "0 0 12px #38bdf8"
                        }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 739,
                        columnNumber: 15
                      },
                      this
                    ),
                    showStabilityTrend && activeStdDevHistory.length > 1 && /* @__PURE__ */ jsxDEV(
                      "svg",
                      {
                        className: "absolute left-3 right-3 top-[32px] bottom-[22px] pointer-events-none z-15 w-[calc(100%-24px)] h-[101px]",
                        viewBox: "0 0 300 100",
                        preserveAspectRatio: "none",
                        children: [
                          /* @__PURE__ */ jsxDEV("defs", { children: /* @__PURE__ */ jsxDEV("linearGradient", { id: "lumaStdDevGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
                            /* @__PURE__ */ jsxDEV("stop", { offset: "0%", stopColor: "#f59e0b", stopOpacity: "0.2" }, void 0, false, {
                              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                              lineNumber: 756,
                              columnNumber: 23
                            }, this),
                            /* @__PURE__ */ jsxDEV("stop", { offset: "100%", stopColor: "#f59e0b", stopOpacity: "0.0" }, void 0, false, {
                              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                              lineNumber: 757,
                              columnNumber: 23
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 755,
                            columnNumber: 21
                          }, this) }, void 0, false, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 754,
                            columnNumber: 19
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            "path",
                            {
                              d: (() => {
                                const points = activeStdDevHistory.map((val, idx) => {
                                  const x = idx / (activeStdDevHistory.length - 1) * 300;
                                  const maxStd = Math.max(...activeStdDevHistory, 5);
                                  const y = 95 - val / maxStd * 90;
                                  return `${x},${y}`;
                                });
                                return `M 0,100 L ${points.join(" L ")} L 300,100 Z`;
                              })(),
                              fill: "url(#lumaStdDevGradient)"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                              lineNumber: 762,
                              columnNumber: 19
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(
                            "path",
                            {
                              d: (() => {
                                const points = activeStdDevHistory.map((val, idx) => {
                                  const x = idx / (activeStdDevHistory.length - 1) * 300;
                                  const maxStd = Math.max(...activeStdDevHistory, 5);
                                  const y = 95 - val / maxStd * 90;
                                  return `${x},${y}`;
                                });
                                return `M ${points.join(" L ")}`;
                              })(),
                              fill: "none",
                              stroke: "#f59e0b",
                              strokeWidth: "1.8",
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              className: "drop-shadow-[0_0_4px_rgba(245,158,11,0.65)]"
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                              lineNumber: 776,
                              columnNumber: 19
                            },
                            this
                          ),
                          (() => {
                            const val = activeStdDevHistory[activeStdDevHistory.length - 1];
                            const maxStd = Math.max(...activeStdDevHistory, 5);
                            const y = 95 - val / maxStd * 90;
                            return /* @__PURE__ */ jsxDEV("g", { className: "animate-pulse", children: [
                              /* @__PURE__ */ jsxDEV("circle", { cx: "300", cy: y, r: "3", fill: "#f59e0b" }, void 0, false, {
                                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                lineNumber: 801,
                                columnNumber: 25
                              }, this),
                              /* @__PURE__ */ jsxDEV("circle", { cx: "300", cy: y, r: "6", fill: "none", stroke: "#f59e0b", strokeWidth: "1", opacity: "0.6" }, void 0, false, {
                                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                lineNumber: 802,
                                columnNumber: 25
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                              lineNumber: 800,
                              columnNumber: 23
                            }, this);
                          })()
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 749,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 w-full flex items-end justify-between gap-1.5 pt-7 pb-1", id: "histogram_svg_viewport", children: activeBinData.map((bin, i) => {
                      const barHeightPct = bin.count / maxCount * 100;
                      const isHovered = hoveredBin === i;
                      const binCenter = (bin.minDepth + bin.maxDepth) / 2;
                      const isOutsideBand = bin.count === 0 && bandpassFilter;
                      return /* @__PURE__ */ jsxDEV(
                        "div",
                        {
                          className: "flex-1 flex flex-col items-center group cursor-pointer h-full justify-end relative",
                          onMouseEnter: () => setHoveredBin(i),
                          onMouseLeave: () => setHoveredBin(null),
                          onClick: () => setExpandedBinIndex(i),
                          title: "Kliknij słupek, aby otworzyć szczegółową diagnostykę",
                          children: [
                            enablePersistence && persistenceHistory.map((histFrame, frameIdx) => {
                              const histBin = histFrame[i];
                              if (!histBin || histBin.count === 0) return null;
                              const histBarHeightPct = histBin.count / maxCount * 100;
                              return /* @__PURE__ */ jsxDEV(
                                "div",
                                {
                                  className: "absolute bottom-0 w-full rounded-t pointer-events-none",
                                  style: {
                                    height: `${Math.max(3, histBarHeightPct)}%`,
                                    opacity: 0.02 + frameIdx / persistenceHistory.length * 0.06,
                                    background: getLumaColor(histBin.luma, false, colorSensitivity)
                                  }
                                },
                                `persist-${frameIdx}-${bin.id}`,
                                false,
                                {
                                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                  lineNumber: 834,
                                  columnNumber: 27
                                },
                                this
                              );
                            }),
                            isHovered && bin.count > 0 && /* @__PURE__ */ jsxDEV(
                              "div",
                              {
                                className: `absolute bottom-full mb-2 bg-slate-900/95 border border-sky-500/80 text-slate-200 text-[8px] font-mono p-2 rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.8)] z-40 flex flex-col gap-1 min-w-[130px] pointer-events-none animate-fade-in backdrop-blur-md ${i <= 2 ? "left-0" : i >= activeBinData.length - 3 ? "right-0" : "left-1/2 -translate-x-1/2"}`,
                                id: `bin_tooltip_${bin.id}`,
                                children: [
                                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-1 gap-2", children: [
                                    /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] text-sky-400 uppercase tracking-wider font-bold", children: [
                                      "SEGMENT: ",
                                      bin.minDepth,
                                      "-",
                                      bin.maxDepth,
                                      " cm"
                                    ] }, void 0, true, {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 855,
                                      columnNumber: 29
                                    }, this),
                                    /* @__PURE__ */ jsxDEV("span", { className: `text-[6.5px] px-1 py-0.2 rounded font-bold ${bin.quality === "EXCELLENT" ? "bg-emerald-950 text-emerald-400 border border-emerald-850" : bin.quality === "STABLE" ? "bg-sky-950 text-sky-400 border border-sky-850" : "bg-amber-950 text-amber-400 border border-amber-850"}`, children: bin.quality }, void 0, false, {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 858,
                                      columnNumber: 29
                                    }, this)
                                  ] }, void 0, true, {
                                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                    lineNumber: 854,
                                    columnNumber: 27
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-0.5 text-[7px] leading-tight", children: [
                                    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300", children: [
                                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Liczba próbek:" }, void 0, false, {
                                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                        lineNumber: 869,
                                        columnNumber: 31
                                      }, this),
                                      /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400 font-bold", children: [
                                        bin.count.toLocaleString(),
                                        " pkt"
                                      ] }, void 0, true, {
                                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                        lineNumber: 870,
                                        columnNumber: 31
                                      }, this)
                                    ] }, void 0, true, {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 868,
                                      columnNumber: 29
                                    }, this),
                                    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300", children: [
                                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Częstość (Udział):" }, void 0, false, {
                                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                        lineNumber: 873,
                                        columnNumber: 31
                                      }, this),
                                      /* @__PURE__ */ jsxDEV("strong", { className: "text-sky-300 font-bold", children: [
                                        bin.percentage.toFixed(2),
                                        "%"
                                      ] }, void 0, true, {
                                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                        lineNumber: 874,
                                        columnNumber: 31
                                      }, this)
                                    ] }, void 0, true, {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 872,
                                      columnNumber: 29
                                    }, this),
                                    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300 pt-0.5 border-t border-slate-800/60", children: [
                                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Intensywność (Luma):" }, void 0, false, {
                                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                        lineNumber: 877,
                                        columnNumber: 31
                                      }, this),
                                      /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-400 font-bold", children: [
                                        bin.luma,
                                        " / 255"
                                      ] }, void 0, true, {
                                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                        lineNumber: 878,
                                        columnNumber: 31
                                      }, this)
                                    ] }, void 0, true, {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 876,
                                      columnNumber: 29
                                    }, this),
                                    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-300", children: [
                                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Zakres pasma:" }, void 0, false, {
                                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                        lineNumber: 881,
                                        columnNumber: 31
                                      }, this),
                                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 font-mono", children: [
                                        "[",
                                        Math.max(0, bin.luma - 6),
                                        " - ",
                                        Math.min(255, bin.luma + 6),
                                        " Y]"
                                      ] }, void 0, true, {
                                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                        lineNumber: 882,
                                        columnNumber: 31
                                      }, this)
                                    ] }, void 0, true, {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 880,
                                      columnNumber: 29
                                    }, this)
                                  ] }, void 0, true, {
                                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                    lineNumber: 867,
                                    columnNumber: 27
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-950 h-1.5 rounded-full overflow-hidden mt-0.5 border border-slate-800", children: /* @__PURE__ */ jsxDEV(
                                    "div",
                                    {
                                      className: "h-full transition-all duration-200",
                                      style: {
                                        width: `${bin.luma / 255 * 100}%`,
                                        background: getLumaColor(bin.luma, true, colorSensitivity)
                                      }
                                    },
                                    void 0,
                                    false,
                                    {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 888,
                                      columnNumber: 29
                                    },
                                    this
                                  ) }, void 0, false, {
                                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                    lineNumber: 887,
                                    columnNumber: 27
                                  }, this)
                                ]
                              },
                              void 0,
                              true,
                              {
                                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                lineNumber: 848,
                                columnNumber: 25
                              },
                              this
                            ),
                            isHovered && bin.count > 0 && /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-6 w-8 h-24 bg-sky-500/10 blur-xl pointer-events-none transition-all duration-300" }, void 0, false, {
                              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                              lineNumber: 901,
                              columnNumber: 25
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              "div",
                              {
                                className: `w-full rounded-t transition-all duration-200 ${isHovered ? "scale-x-[1.1] scale-y-[1.03] shadow-[0_0_12px_rgba(56,189,248,0.45)]" : ""}`,
                                style: {
                                  height: `${Math.max(3, barHeightPct)}%`,
                                  opacity: isOutsideBand ? 0.15 : 1,
                                  background: getLumaColor(bin.luma, isHovered, colorSensitivity)
                                }
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                lineNumber: 905,
                                columnNumber: 23
                              },
                              this
                            )
                          ]
                        },
                        bin.id,
                        true,
                        {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 820,
                          columnNumber: 21
                        },
                        this
                      );
                    }) }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 810,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 625,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between w-full border-t border-slate-900 pt-1.5 px-0.5 font-mono text-[7px] text-slate-500", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "20 cm" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 923,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "24 cm" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 924,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "28 cm" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 925,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold", children: "32 cm (Ideal)" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 926,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "36 cm" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 927,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "40 cm (Lock limit)" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 928,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "44 cm" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 929,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "48 cm" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 930,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 922,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2.5 border-t border-slate-900/80 w-full", id: "lidar_histogram_bottom_gradient_legend", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[8px] text-slate-400 mb-1.5 px-0.5", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 via-teal-400 to-rose-500 animate-pulse shadow-[0_0_6px_rgba(56,189,248,0.5)]" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 937,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-slate-300 tracking-wider uppercase text-[8px]", children: "LEGENDA GRADIENTU BARWNEGO LUMA (0-255)" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 938,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 936,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[7.5px] font-mono", children: hoveredLegendLuma !== null ? /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold flex items-center gap-1 animate-fade-in", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-amber-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 945,
                          columnNumber: 23
                        }, this),
                        "INSPEKCJA: Y = ",
                        hoveredLegendLuma,
                        " (",
                        (hoveredLegendLuma / 255 * 100).toFixed(0),
                        "%)"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 944,
                        columnNumber: 21
                      }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: [
                        "ŚREDNIA AKTYWNA: ",
                        /* @__PURE__ */ jsxDEV("strong", { className: "text-sky-400", children: Math.round(activeFilteredLuma * colorSensitivity) }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 950,
                          columnNumber: 40
                        }, this),
                        " | CZUŁOŚĆ: ×",
                        colorSensitivity.toFixed(1)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 949,
                        columnNumber: 21
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 942,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 935,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        ref: gradientBarRef,
                        className: "relative h-4 w-full rounded-md cursor-crosshair border border-slate-800/80 overflow-visible group select-none transition-all shadow-inner",
                        style: {
                          background: "linear-gradient(to right, #1e40af 0%, #0284c7 35.3%, #0f766e 45%, #84cc16 66.7%, #d97706 80%, #e11d48 100%)"
                        },
                        onMouseMove: (e) => {
                          if (!gradientBarRef.current) return;
                          const rect = gradientBarRef.current.getBoundingClientRect();
                          const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                          const pct = x / rect.width * 100;
                          const lumaVal = Math.round(x / rect.width * 255);
                          setHoveredLegendPct(pct);
                          setHoveredLegendLuma(lumaVal);
                        },
                        onMouseLeave: () => {
                          setHoveredLegendLuma(null);
                          setHoveredLegendPct(null);
                        },
                        children: [
                          /* @__PURE__ */ jsxDEV(
                            "div",
                            {
                              className: "absolute -top-1 -bottom-1 w-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)] pointer-events-none z-10 transition-all duration-150",
                              style: {
                                left: `${Math.min(100, Math.max(0, activeFilteredLuma * colorSensitivity / 255 * 100))}%`,
                                transform: "translateX(-50%)"
                              },
                              title: `Aktualna średnia Luma: ${Math.round(activeFilteredLuma * colorSensitivity)}`,
                              children: /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[3.5px] border-x-transparent border-t-[4px] border-t-white drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]" }, void 0, false, {
                                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                lineNumber: 986,
                                columnNumber: 19
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                              lineNumber: 978,
                              columnNumber: 17
                            },
                            this
                          ),
                          hoveredLegendLuma !== null && hoveredLegendPct !== null && /* @__PURE__ */ jsxDEV(
                            "div",
                            {
                              className: "absolute top-0 bottom-0 w-0.5 bg-amber-300 pointer-events-none z-20 shadow-[0_0_6px_#fcd34d]",
                              style: {
                                left: `${hoveredLegendPct}%`,
                                transform: "translateX(-50%)"
                              },
                              children: /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-amber-500/90 text-slate-200 text-[8px] font-mono p-2 rounded shadow-2xl z-30 flex items-center gap-2.5 whitespace-nowrap pointer-events-none backdrop-blur-md animate-fade-in", children: [
                                /* @__PURE__ */ jsxDEV(
                                  "div",
                                  {
                                    className: "w-4 h-4 rounded border border-white/50 shadow-[0_0_6px_rgba(0,0,0,0.6)] shrink-0",
                                    style: { background: getLumaRgb(hoveredLegendLuma, colorSensitivity) }
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                    lineNumber: 999,
                                    columnNumber: 23
                                  },
                                  this
                                ),
                                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col text-[7.5px] leading-tight", children: [
                                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                                    /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-amber-300", children: [
                                      "LUMA: ",
                                      hoveredLegendLuma,
                                      " / 255"
                                    ] }, void 0, true, {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 1005,
                                      columnNumber: 27
                                    }, this),
                                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
                                      "(",
                                      (hoveredLegendLuma / 255 * 100).toFixed(1),
                                      "%)"
                                    ] }, void 0, true, {
                                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                      lineNumber: 1006,
                                      columnNumber: 27
                                    }, this)
                                  ] }, void 0, true, {
                                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                    lineNumber: 1004,
                                    columnNumber: 25
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { className: `font-semibold ${hoveredLegendLuma * colorSensitivity < 90 ? "text-sky-400" : hoveredLegendLuma * colorSensitivity < 170 ? "text-emerald-400" : "text-rose-400"}`, children: [
                                    "STREFA: ",
                                    hoveredLegendLuma * colorSensitivity < 90 ? "COOL (Niski odbiór)" : hoveredLegendLuma * colorSensitivity < 170 ? "OPTIMAL (Idealna absorpcja)" : "WARM (Wysokie odbicie)"
                                  ] }, void 0, true, {
                                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                    lineNumber: 1008,
                                    columnNumber: 25
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { className: "text-[6.5px] text-slate-500 font-sans", children: [
                                    "RGB: ",
                                    getLumaRgb(hoveredLegendLuma, colorSensitivity)
                                  ] }, void 0, true, {
                                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                    lineNumber: 1014,
                                    columnNumber: 25
                                  }, this)
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                  lineNumber: 1003,
                                  columnNumber: 23
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                                lineNumber: 998,
                                columnNumber: 21
                              }, this)
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                              lineNumber: 991,
                              columnNumber: 19
                            },
                            this
                          )
                        ]
                      },
                      void 0,
                      true,
                      {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 957,
                        columnNumber: 15
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between w-full pt-1.5 font-mono text-[7px] text-slate-500 select-none", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-semibold", children: "0 (Min / Cool)" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1025,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "64" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1026,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-teal-400 font-semibold", children: "90 (Optymalny start)" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1027,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "128" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1028,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-semibold", children: "170 (Ciepły start)" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1029,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "215" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1030,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-rose-400 font-semibold", children: "255 (Maks / Warm)" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1031,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1024,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 934,
                    columnNumber: 13
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 623,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-1 bg-slate-950/65 rounded-lg border border-slate-900/60 p-3 flex flex-col justify-between font-mono text-[8.5px] text-slate-400 min-h-[175px]", id: "lidar_luma_legend", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 border-b border-slate-900 pb-1.5 mb-1.5 font-bold text-slate-300 uppercase tracking-wide", children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3 h-3 text-amber-500 shrink-0" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1039,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Spektrum Luma" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1040,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1038,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex gap-2.5 items-stretch h-[105px] relative mt-1", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "w-3 rounded bg-gradient-to-t from-[#1e40af] via-[#0f766e] to-[#e11d48] relative border border-slate-900/60", children: /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "absolute left-[-4px] right-[-4px] h-1.5 bg-white border border-slate-950 rounded shadow-[0_0_5px_rgba(255,255,255,0.9)] z-10 transition-all duration-150",
                        style: {
                          bottom: `${Math.min(100, Math.max(0, activeFilteredLuma * colorSensitivity / 255 * 100))}%`
                        },
                        title: `Aktualna wygładzona Luma (skalowana): ${Math.round(activeFilteredLuma * colorSensitivity)}`
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1047,
                        columnNumber: 17
                      },
                      this
                    ) }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1045,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col justify-between text-[7px] text-slate-400 leading-tight", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-rose-500" }, void 0, false, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 1060,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-rose-400 font-semibold uppercase", children: "Warm (170-255)" }, void 0, false, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 1061,
                            columnNumber: 21
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1059,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[6.5px] text-slate-500 pl-2.5", children: "Wysokie odbicie / blisko" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1063,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1058,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-500" }, void 0, false, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 1067,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-semibold uppercase", children: "Optimal (90-170)" }, void 0, false, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 1068,
                            columnNumber: 21
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1066,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[6.5px] text-slate-500 pl-2.5", children: "Optymalna absorpcja" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1070,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1065,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-sky-500" }, void 0, false, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 1074,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-semibold uppercase", children: "Cool (0-90)" }, void 0, false, {
                            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                            lineNumber: 1075,
                            columnNumber: 21
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1073,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[6.5px] text-slate-500 pl-2.5", children: "Słaby sygnał / daleko" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1077,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1072,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1057,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1043,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-2 pt-2 border-t border-slate-900/60 flex items-center justify-between text-[7.5px] font-bold", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "SYGNAŁ (Y):" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1084,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `font-bold px-1 py-0.5 rounded text-[7px] border ${activeFilteredLuma * colorSensitivity < 90 ? "bg-sky-950/80 text-sky-400 border-sky-900/40" : activeFilteredLuma * colorSensitivity < 170 ? "bg-emerald-950/80 text-emerald-400 border-emerald-900/40" : "bg-rose-950/80 text-rose-400 border-rose-900/40"}`, children: [
                      Math.round(activeFilteredLuma * colorSensitivity),
                      " (",
                      activeFilteredLuma * colorSensitivity < 90 ? "ZIMNY" : activeFilteredLuma * colorSensitivity < 170 ? "OPTYM" : "CIEPŁY",
                      ")"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1085,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1083,
                    columnNumber: 13
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1037,
                  columnNumber: 11
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 621,
                columnNumber: 9
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-900", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1 font-mono text-[9px]", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded border border-slate-900", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Centrum rozkładu (Peak):" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1102,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold", children: [
                      ((activeMetrics.distance || 0.35) * 100).toFixed(1),
                      " cm"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1103,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1101,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded border border-slate-900", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Standardowa dewiacja (σ):" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1108,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-semibold", children: scanType === "oponka_brzuch" ? "5.2 cm" : "3.8 cm" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1109,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1107,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded border border-slate-900", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Stabilność światła (σ_Luma):" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1114,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `font-semibold flex items-center gap-1 ${activeLumaStdDev < 2 ? "text-emerald-400" : activeLumaStdDev < stabilityThreshold ? "text-amber-400 animate-pulse" : "text-red-400 animate-pulse font-bold"}`, children: [
                      activeLumaStdDev.toFixed(2),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[7px] text-slate-500", children: [
                        "(",
                        activeLumaStdDev < 2 ? "IDEALNA" : activeLumaStdDev < stabilityThreshold ? "UMIARKOWANA" : "NIESTABILNA ⚠️",
                        ")"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1123,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1115,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1113,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded border border-slate-900", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Próg stabilności (σ):" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1130,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV(
                        "input",
                        {
                          type: "range",
                          min: "0.5",
                          max: "8.0",
                          step: "0.1",
                          value: stabilityThreshold,
                          onChange: (e) => setStabilityThreshold(parseFloat(e.target.value)),
                          className: "w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500",
                          title: "Przesuń, aby zmienić próg stabilności Luma"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1132,
                          columnNumber: 15
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "input",
                        {
                          type: "number",
                          min: "0.1",
                          max: "10.0",
                          step: "0.1",
                          value: stabilityThreshold,
                          onChange: (e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val)) {
                              setStabilityThreshold(val);
                            }
                          },
                          className: "w-12 bg-slate-900 border border-slate-800 text-amber-400 font-bold font-mono text-[9px] px-1 py-0.5 rounded text-center focus:outline-none focus:border-amber-500",
                          title: "Wpisz numeryczny próg stabilności Luma",
                          id: "lidar_stability_threshold_numeric"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1142,
                          columnNumber: 15
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1131,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1129,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded border border-slate-900", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Czułość Luma (m):" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1161,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV(
                        "input",
                        {
                          type: "range",
                          min: "0.5",
                          max: "2.0",
                          step: "0.1",
                          value: colorSensitivity,
                          onChange: (e) => setColorSensitivity(parseFloat(e.target.value)),
                          className: "w-16 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500",
                          title: "Dostosuj czułość mapowania spektrum kolorów Luma"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1163,
                          columnNumber: 15
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold min-w-[20px] text-right", children: [
                        colorSensitivity.toFixed(1),
                        "x"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1173,
                        columnNumber: 15
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1162,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1160,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-950/50 px-2 py-1 rounded border border-slate-900", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Sygnał Luma (Wygładzony):" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1179,
                      columnNumber: 13
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold flex items-center gap-1", children: [
                      activeFilteredLuma,
                      enableLumaFilter && /* @__PURE__ */ jsxDEV("span", { className: "text-[7px] text-slate-500", children: "(Śr. ruchoma)" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1183,
                        columnNumber: 17
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1180,
                      columnNumber: 13
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1178,
                    columnNumber: 11
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1100,
                  columnNumber: 9
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2 justify-end items-center", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: handleResetBaseline,
                      className: "font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border bg-red-950/30 border-red-900/60 text-red-400 hover:text-red-300 hover:border-red-500 flex items-center gap-1 cursor-pointer",
                      title: "Resetuj 30-klatkową historię Luma i średnią ruchomą (wymuś re-sync bazy)",
                      id: "lidar_histogram_footer_reset_btn",
                      children: [
                        /* @__PURE__ */ jsxDEV(RefreshCcw, { className: "w-2.5 h-2.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1199,
                          columnNumber: 13
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "RE-SYNC BAZY" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1200,
                          columnNumber: 13
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1193,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: toggleFreeze,
                      className: `font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border flex items-center gap-1 cursor-pointer ${isFrozen ? "bg-cyan-950/60 border-cyan-500 text-cyan-400 shadow-[0_0_5px_rgba(6,182,212,0.3)] animate-pulse" : "bg-slate-900/40 border-slate-900 text-slate-500 hover:text-slate-400 hover:border-slate-800"}`,
                      title: "Zamroź aktualną dystrybucję LiDAR do wnikliwej diagnozy",
                      children: [
                        isFrozen ? /* @__PURE__ */ jsxDEV(Play, { className: "w-2.5 h-2.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1213,
                          columnNumber: 25
                        }, this) : /* @__PURE__ */ jsxDEV(Pause, { className: "w-2.5 h-2.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1213,
                          columnNumber: 60
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: isFrozen ? "WZNÓW" : "ZAMROŹ WIDOK" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1214,
                          columnNumber: 13
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1204,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: handleDownloadCSV,
                      className: "font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border bg-slate-900/40 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800 flex items-center gap-1 cursor-pointer",
                      title: "Pobierz 30-klatkową historię Luma do diagnostyki CSV",
                      children: [
                        /* @__PURE__ */ jsxDEV(Download, { className: "w-2.5 h-2.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1223,
                          columnNumber: 13
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "POBIERZ CSV" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1224,
                          columnNumber: 13
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1218,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: handleDownloadPNG,
                      className: "font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border bg-slate-900/40 border-slate-900 text-sky-400 hover:text-sky-200 hover:border-sky-800 flex items-center gap-1 cursor-pointer",
                      title: "Wykonaj zrzut ekranu PNG histogramu z metadanymi",
                      children: [
                        /* @__PURE__ */ jsxDEV(Camera, { className: "w-2.5 h-2.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1233,
                          columnNumber: 13
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "SNAPSHOT PNG" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1234,
                          columnNumber: 13
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1228,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setShowStabilityTrend(!showStabilityTrend),
                      className: `font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border flex items-center gap-1 cursor-pointer ${showStabilityTrend ? "bg-amber-950/60 border-amber-800 text-amber-400 shadow-[0_0_5px_rgba(245,158,11,0.15)]" : "bg-slate-900/40 border-slate-900 text-slate-500 hover:text-slate-400"}`,
                      title: "Włącz/wyłącz nakładkę linii trendu dewiacji Luma",
                      children: /* @__PURE__ */ jsxDEV("span", { children: "TREND LUMA σ" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1247,
                        columnNumber: 13
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1238,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setEnableLumaFilter(!enableLumaFilter),
                      className: `font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border flex items-center gap-1 cursor-pointer ${enableLumaFilter ? "bg-amber-950/60 border-amber-800 text-amber-400 shadow-[0_0_5px_rgba(245,158,11,0.15)]" : "bg-slate-900/40 border-slate-900 text-slate-500 hover:text-slate-400"}`,
                      title: "Włącz/wyłącz filtr średniej ruchomej dla Luma (redukcja szumów)",
                      children: /* @__PURE__ */ jsxDEV("span", { children: [
                        "FILTR LUMA ",
                        enableLumaFilter ? "WŁ." : "WYŁ."
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1260,
                        columnNumber: 13
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1251,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setEnablePersistence(!enablePersistence),
                      className: `font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border flex items-center gap-1 cursor-pointer ${enablePersistence ? "bg-emerald-950/60 border-emerald-800 text-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.15)]" : "bg-slate-900/40 border-slate-900 text-slate-500 hover:text-slate-400"}`,
                      title: "Zezwól histogramowi na akumulację sygnału Luma w tle jako heatmapę",
                      id: "lidar_toggle_persistence_btn",
                      children: /* @__PURE__ */ jsxDEV("span", { children: [
                        "PERSISTENCE ",
                        enablePersistence ? "WŁ." : "WYŁ."
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1274,
                        columnNumber: 13
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1264,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setShowGridLines(!showGridLines),
                      id: "lidar_toggle_grid_btn",
                      className: `font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border flex items-center gap-1 cursor-pointer ${showGridLines ? "bg-sky-950/60 border-sky-800 text-sky-400 shadow-[0_0_5px_rgba(14,165,233,0.15)]" : "bg-slate-900/40 border-slate-900 text-slate-500 hover:text-slate-400"}`,
                      title: "Włącz/wyłącz linie siatki w tle w celu zmniejszenia szumu wizualnego",
                      children: /* @__PURE__ */ jsxDEV("span", { children: "TOGGLE GRID" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1288,
                        columnNumber: 13
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1278,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setSimulateNoiseDecay(!simulateNoiseDecay),
                      className: `font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border flex items-center gap-1 cursor-pointer ${simulateNoiseDecay ? "bg-sky-950/60 border-sky-800 text-sky-400 shadow-[0_0_5px_rgba(14,165,233,0.15)]" : "bg-slate-900/40 border-slate-900 text-slate-500 hover:text-slate-400"}`,
                      title: "Dodaj zakłócenia sygnału i szum kwantyzacji na większych głębokościach",
                      children: /* @__PURE__ */ jsxDEV("span", { children: "SZUM LiDAR" }, void 0, false, {
                        fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                        lineNumber: 1301,
                        columnNumber: 13
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1292,
                      columnNumber: 11
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setBandpassFilter(!bandpassFilter),
                      className: `font-mono text-[8px] font-bold px-2 py-1 rounded transition-all border flex items-center gap-1 cursor-pointer ${bandpassFilter ? "bg-emerald-950/60 border-emerald-800 text-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.15)]" : "bg-slate-900/40 border-slate-900 text-slate-500 hover:text-slate-400"}`,
                      title: "Odfiltruj odbicia spoza strefy koherencji (24cm - 40cm)",
                      children: [
                        /* @__PURE__ */ jsxDEV(Filter, { className: "w-2.5 h-2.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1314,
                          columnNumber: 13
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "PASMOWY" }, void 0, false, {
                          fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                          lineNumber: 1315,
                          columnNumber: 13
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1305,
                      columnNumber: 11
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1190,
                  columnNumber: 9
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 1097,
                columnNumber: 7
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
            lineNumber: 593,
            columnNumber: 7
          },
          this
        ),
        expandedBinIndex !== null && activeBinData[expandedBinIndex] && /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "absolute inset-0 bg-slate-950/90 backdrop-blur-md z-40 flex items-center justify-center p-4 animate-fade-in border border-sky-500/30 rounded-xl",
            id: "bin_deep_dive_modal",
            children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-lg p-4 w-full max-w-sm font-mono text-[9px] relative shadow-2xl", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center border-b border-slate-800 pb-2 mb-3", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1330,
                    columnNumber: 17
                  }, this),
                  "DIAGNOSTYKA KOŃCÓWKI: BIN [",
                  activeBinData[expandedBinIndex].label,
                  "]"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1329,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      setExpandedBinIndex(null);
                    },
                    className: "text-slate-400 hover:text-slate-200 text-xs font-bold cursor-pointer hover:bg-slate-800 px-1.5 py-0.5 rounded",
                    children: "✕"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1333,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 1328,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 bg-slate-950/40 p-2 rounded border border-slate-950", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[7.5px] uppercase", children: "Zakres Głębokości:" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1347,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-300 text-[10px]", children: [
                      activeBinData[expandedBinIndex].minDepth,
                      " - ",
                      activeBinData[expandedBinIndex].maxDepth,
                      " cm"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1348,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1346,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[7.5px] uppercase", children: "Wiązki (Count):" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1351,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400 text-[10px]", children: [
                      activeBinData[expandedBinIndex].count.toLocaleString(),
                      " pkt"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1352,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1350,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1345,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 bg-slate-950/40 p-2 rounded border border-slate-950", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[7.5px] uppercase", children: "Wartość Luma:" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1358,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-400 text-[10px]", children: [
                      activeBinData[expandedBinIndex].luma,
                      " / 255"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1359,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1357,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[7.5px] uppercase", children: "Udział Procentowy:" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1362,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-sky-400 text-[10px]", children: [
                      activeBinData[expandedBinIndex].percentage.toFixed(2),
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1363,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1361,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1356,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/40 p-2 rounded border border-slate-950 flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[7.5px] uppercase", children: "Status Lock (Zone Integrity):" }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1368,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[8px] font-bold ${activeBinData[expandedBinIndex].quality === "EXCELLENT" ? "bg-emerald-950 text-emerald-400 border border-emerald-800" : activeBinData[expandedBinIndex].quality === "STABLE" ? "bg-sky-950 text-sky-400 border border-sky-800" : activeBinData[expandedBinIndex].quality === "FILTERED" ? "bg-slate-900 text-slate-500 border border-slate-800 line-through" : "bg-red-950 text-red-400 border border-red-800"}`, children: activeBinData[expandedBinIndex].quality }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1370,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[7.5px]", children: activeBinData[expandedBinIndex].quality === "EXCELLENT" ? "Strefa idealnej koherencji optycznej." : activeBinData[expandedBinIndex].quality === "STABLE" ? "Dopuszczalna strefa detekcji sygnału." : activeBinData[expandedBinIndex].quality === "FILTERED" ? "Sygnał stłumiony filtrem pasmowym." : "Wysoki szum kwantyzacji LiDAR." }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1381,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1369,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1367,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/40 p-2 rounded border border-slate-950", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-slate-500 text-[7px] mb-1", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "PROCENT ROZKŁADU LUMA" }, void 0, false, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1392,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400", children: [
                      (activeBinData[expandedBinIndex].luma / 255 * 100).toFixed(0),
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1393,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1391,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxDEV(
                    "div",
                    {
                      className: "h-full bg-gradient-to-r from-blue-500 via-teal-500 to-amber-500 transition-all duration-300",
                      style: { width: `${activeBinData[expandedBinIndex].luma / 255 * 100}%` }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                      lineNumber: 1396,
                      columnNumber: 19
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1395,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1390,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end gap-2 mt-2 pt-2 border-t border-slate-800", children: /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: (e) => {
                      e.stopPropagation();
                      setExpandedBinIndex(null);
                    },
                    className: "px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono text-[8px] font-bold cursor-pointer transition-colors",
                    children: "ZAMKNIJ DIAGNOSTYKĘ"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                    lineNumber: 1404,
                    columnNumber: 17
                  },
                  this
                ) }, void 0, false, {
                  fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                  lineNumber: 1403,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
                lineNumber: 1344,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
              lineNumber: 1327,
              columnNumber: 11
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
            lineNumber: 1323,
            columnNumber: 9
          },
          this
        )
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/LidarDepthHistogram.tsx",
      lineNumber: 459,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpZGFyRGVwdGhIaXN0b2dyYW0udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlTWVtbywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCYXJDaGFydDIsIEZpbHRlciwgU2V0dGluZ3MsIEFjdGl2aXR5LCBTcGFya2xlcywgSGVscENpcmNsZSwgQWxlcnRUcmlhbmdsZSwgQ2hldnJvbkRvd24sIENoZXZyb25VcCwgRG93bmxvYWQsIFBhdXNlLCBQbGF5LCBDYW1lcmEsIFJlZnJlc2hDY3cgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IGh0bWwyY2FudmFzIGZyb20gJ2h0bWwyY2FudmFzJztcbmltcG9ydCB7IENhbGlicmF0aW9uTWV0cmljcyB9IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIExpZGFyRGVwdGhIaXN0b2dyYW1Qcm9wcyB7XG4gIG1ldHJpY3M6IENhbGlicmF0aW9uTWV0cmljcztcbiAgc2NhblR5cGU/OiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBIaXN0b2dyYW1CaW4ge1xuICBpZDogbnVtYmVyO1xuICBsYWJlbDogc3RyaW5nO1xuICBtaW5EZXB0aDogbnVtYmVyO1xuICBtYXhEZXB0aDogbnVtYmVyO1xuICBiYXNlV2VpZ2h0OiBudW1iZXI7IC8vIGJhc2Ugd2VpZ2h0IGZvciBub3JtYWwgZGlzdHJpYnV0aW9uXG59XG5cbi8vIDE0IGJpbnMgcmVwcmVzZW50aW5nIHRoZSBkZXB0aCByYW5nZSBvZiB0aGUgc2Vuc29yICgyMGNtIHRvIDQ4Y20pXG5jb25zdCBCSU5TOiBIaXN0b2dyYW1CaW5bXSA9IFtcbiAgeyBpZDogMCwgbGFiZWw6ICcyMC0yMicsIG1pbkRlcHRoOiAyMCwgbWF4RGVwdGg6IDIyLCBiYXNlV2VpZ2h0OiAwLjA1IH0sXG4gIHsgaWQ6IDEsIGxhYmVsOiAnMjItMjQnLCBtaW5EZXB0aDogMjIsIG1heERlcHRoOiAyNCwgYmFzZVdlaWdodDogMC4xMiB9LFxuICB7IGlkOiAyLCBsYWJlbDogJzI0LTI2JywgbWluRGVwdGg6IDI0LCBtYXhEZXB0aDogMjYsIGJhc2VXZWlnaHQ6IDAuMjggfSxcbiAgeyBpZDogMywgbGFiZWw6ICcyNi0yOCcsIG1pbkRlcHRoOiAyNiwgbWF4RGVwdGg6IDI4LCBiYXNlV2VpZ2h0OiAwLjU1IH0sXG4gIHsgaWQ6IDQsIGxhYmVsOiAnMjgtMzAnLCBtaW5EZXB0aDogMjgsIG1heERlcHRoOiAzMCwgYmFzZVdlaWdodDogMC44NSB9LFxuICB7IGlkOiA1LCBsYWJlbDogJzMwLTMyJywgbWluRGVwdGg6IDMwLCBtYXhEZXB0aDogMzIsIGJhc2VXZWlnaHQ6IDEuMjAgfSxcbiAgeyBpZDogNiwgbGFiZWw6ICczMi0zNCcsIG1pbkRlcHRoOiAzMiwgbWF4RGVwdGg6IDM0LCBiYXNlV2VpZ2h0OiAxLjUwIH0sXG4gIHsgaWQ6IDcsIGxhYmVsOiAnMzQtMzYnLCBtaW5EZXB0aDogMzQsIG1heERlcHRoOiAzNiwgYmFzZVdlaWdodDogMS42MCB9LCAvLyBjZW50ZXIgKDM1Y20gaXMgaWRlYWwpXG4gIHsgaWQ6IDgsIGxhYmVsOiAnMzYtMzgnLCBtaW5EZXB0aDogMzYsIG1heERlcHRoOiAzOCwgYmFzZVdlaWdodDogMS40NSB9LFxuICB7IGlkOiA5LCBsYWJlbDogJzM4LTQwJywgbWluRGVwdGg6IDM4LCBtYXhEZXB0aDogNDAsIGJhc2VXZWlnaHQ6IDEuMTAgfSxcbiAgeyBpZDogMTAsIGxhYmVsOiAnNDAtNDInLCBtaW5EZXB0aDogNDAsIG1heERlcHRoOiA0MiwgYmFzZVdlaWdodDogMC43MCB9LFxuICB7IGlkOiAxMSwgbGFiZWw6ICc0Mi00NCcsIG1pbkRlcHRoOiA0MiwgbWF4RGVwdGg6IDQ0LCBiYXNlV2VpZ2h0OiAwLjM4IH0sXG4gIHsgaWQ6IDEyLCBsYWJlbDogJzQ0LTQ2JywgbWluRGVwdGg6IDQ0LCBtYXhEZXB0aDogNDYsIGJhc2VXZWlnaHQ6IDAuMTggfSxcbiAgeyBpZDogMTMsIGxhYmVsOiAnNDYtNDgnLCBtaW5EZXB0aDogNDYsIG1heERlcHRoOiA0OCwgYmFzZVdlaWdodDogMC4wNyB9LFxuXTtcblxuY29uc3QgZ2V0THVtYVJnYiA9IChsdW1hOiBudW1iZXIsIHNlbnNpdGl2aXR5OiBudW1iZXIgPSAxLjApID0+IHtcbiAgY29uc3QgYWRqdXN0ZWRMdW1hID0gTWF0aC5taW4oMjU1LCBNYXRoLm1heCgwLCBsdW1hICogc2Vuc2l0aXZpdHkpKTtcbiAgaWYgKGFkanVzdGVkTHVtYSA8IDkwKSB7XG4gICAgY29uc3QgcmF0aW8gPSBhZGp1c3RlZEx1bWEgLyA5MDtcbiAgICBjb25zdCByID0gTWF0aC5yb3VuZCgzMCArICgyIC0gMzApICogcmF0aW8pO1xuICAgIGNvbnN0IGcgPSBNYXRoLnJvdW5kKDU4ICsgKDEzMiAtIDU4KSAqIHJhdGlvKTtcbiAgICBjb25zdCBiID0gTWF0aC5yb3VuZCgxMzggKyAoMTk5IC0gMTM4KSAqIHJhdGlvKTtcbiAgICByZXR1cm4gYHJnYigke3J9LCAke2d9LCAke2J9KWA7XG4gIH0gZWxzZSBpZiAoYWRqdXN0ZWRMdW1hIDwgMTcwKSB7XG4gICAgY29uc3QgcmF0aW8gPSAoYWRqdXN0ZWRMdW1hIC0gOTApIC8gODA7XG4gICAgY29uc3QgciA9IE1hdGgucm91bmQoMTUgKyAoMTMyIC0gMTUpICogcmF0aW8pO1xuICAgIGNvbnN0IGcgPSBNYXRoLnJvdW5kKDExOCArICgyMDQgLSAxMTgpICogcmF0aW8pO1xuICAgIGNvbnN0IGIgPSBNYXRoLnJvdW5kKDExMCArICgyMiAtIDExMCkgKiByYXRpbyk7XG4gICAgcmV0dXJuIGByZ2IoJHtyfSwgJHtnfSwgJHtifSlgO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJhdGlvID0gTWF0aC5taW4oMS4wLCAoYWRqdXN0ZWRMdW1hIC0gMTcwKSAvIDg1KTtcbiAgICBjb25zdCByID0gTWF0aC5yb3VuZCgyMTcgKyAoMjI1IC0gMjE3KSAqIHJhdGlvKTtcbiAgICBjb25zdCBnID0gTWF0aC5yb3VuZCgxMTkgKyAoMjkgLSAxMTkpICogcmF0aW8pO1xuICAgIGNvbnN0IGIgPSBNYXRoLnJvdW5kKDYgKyAoNzIgLSA2KSAqIHJhdGlvKTtcbiAgICByZXR1cm4gYHJnYigke3J9LCAke2d9LCAke2J9KWA7XG4gIH1cbn07XG5cbi8vIE1hcHMgTHVtYSBpbnRlbnNpdHkgKDAtMjU1KSB0byBhIHNtb290aCwgZWxlZ2FudCBjb29sLXRvLXdhcm0gZ3JhZGllbnQgc3R5bGUuXG4vLyBDb29sICgwLTEwMCkgLT4gYmx1ZS1pbmRpZ29cbi8vIE1pZCAoMTAwLTE4MCkgLT4gdGVhbC1lbWVyYWxkLWdyZWVuXG4vLyBXYXJtICgxODAtMjU1KSAtPiB5ZWxsb3ctb3JhbmdlLXJlZFxuY29uc3QgZ2V0THVtYUNvbG9yID0gKGx1bWE6IG51bWJlciwgaXNIb3ZlcmVkOiBib29sZWFuLCBzZW5zaXRpdml0eTogbnVtYmVyID0gMS4wKSA9PiB7XG4gIGNvbnN0IGFkanVzdGVkTHVtYSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgbHVtYSAqIHNlbnNpdGl2aXR5KSk7XG4gIGxldCBmcm9tQ29sb3IgPSAnIzFlNDBhZic7XG4gIGxldCB0b0NvbG9yID0gJyMzYjgyZjYnO1xuICBcbiAgaWYgKGFkanVzdGVkTHVtYSA8IDkwKSB7XG4gICAgY29uc3QgcmF0aW8gPSBhZGp1c3RlZEx1bWEgLyA5MDtcbiAgICBjb25zdCByID0gTWF0aC5yb3VuZCgzMCArICgyIC0gMzApICogcmF0aW8pO1xuICAgIGNvbnN0IGcgPSBNYXRoLnJvdW5kKDU4ICsgKDEzMiAtIDU4KSAqIHJhdGlvKTtcbiAgICBjb25zdCBiID0gTWF0aC5yb3VuZCgxMzggKyAoMTk5IC0gMTM4KSAqIHJhdGlvKTtcbiAgICBmcm9tQ29sb3IgPSBgcmdiKCR7cn0sICR7Z30sICR7Yn0pYDtcbiAgICB0b0NvbG9yID0gYHJnYigke3IgKyAxMH0sICR7ZyArIDMwfSwgJHtiICsgNDB9KWA7XG4gIH0gZWxzZSBpZiAoYWRqdXN0ZWRMdW1hIDwgMTcwKSB7XG4gICAgY29uc3QgcmF0aW8gPSAoYWRqdXN0ZWRMdW1hIC0gOTApIC8gODA7XG4gICAgY29uc3QgciA9IE1hdGgucm91bmQoMTUgKyAoMTMyIC0gMTUpICogcmF0aW8pO1xuICAgIGNvbnN0IGcgPSBNYXRoLnJvdW5kKDExOCArICgyMDQgLSAxMTgpICogcmF0aW8pO1xuICAgIGNvbnN0IGIgPSBNYXRoLnJvdW5kKDExMCArICgyMiAtIDExMCkgKiByYXRpbyk7XG4gICAgZnJvbUNvbG9yID0gYHJnYigke3J9LCAke2d9LCAke2J9KWA7XG4gICAgdG9Db2xvciA9IGByZ2IoJHtyICsgMjB9LCAke2cgKyAxMH0sICR7YiAtIDEwfSlgO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHJhdGlvID0gTWF0aC5taW4oMS4wLCAoYWRqdXN0ZWRMdW1hIC0gMTcwKSAvIDg1KTtcbiAgICBjb25zdCByID0gTWF0aC5yb3VuZCgyMTcgKyAoMjI1IC0gMjE3KSAqIHJhdGlvKTtcbiAgICBjb25zdCBnID0gTWF0aC5yb3VuZCgxMTkgKyAoMjkgLSAxMTkpICogcmF0aW8pO1xuICAgIGNvbnN0IGIgPSBNYXRoLnJvdW5kKDYgKyAoNzIgLSA2KSAqIHJhdGlvKTtcbiAgICBmcm9tQ29sb3IgPSBgcmdiKCR7cn0sICR7Z30sICR7Yn0pYDtcbiAgICB0b0NvbG9yID0gYHJnYigke3IgKyAzMH0sICR7ZyAtIDIwfSwgJHtiICsgMjB9KWA7XG4gIH1cbiAgXG4gIGlmIChpc0hvdmVyZWQpIHtcbiAgICByZXR1cm4gYGxpbmVhci1ncmFkaWVudCh0byB0b3AsICR7ZnJvbUNvbG9yfSwgI2ZmZmZmZilgO1xuICB9XG4gIHJldHVybiBgbGluZWFyLWdyYWRpZW50KHRvIHRvcCwgJHtmcm9tQ29sb3J9LCAke3RvQ29sb3J9KWA7XG59O1xuXG5leHBvcnQgY29uc3QgTGlkYXJEZXB0aEhpc3RvZ3JhbTogUmVhY3QuRkM8TGlkYXJEZXB0aEhpc3RvZ3JhbVByb3BzPiA9ICh7IG1ldHJpY3MsIHNjYW5UeXBlIH0pID0+IHtcbiAgLy8gQ29uZmlndXJhYmxlIG9wdGlvbnMgZm9yIHRoZSBpbnRlcmFjdGl2ZSBoaXN0b2dyYW1cbiAgY29uc3QgW3Nob3dHcmlkTGluZXMsIHNldFNob3dHcmlkTGluZXNdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtiYW5kcGFzc0ZpbHRlciwgc2V0QmFuZHBhc3NGaWx0ZXJdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbc2ltdWxhdGVOb2lzZURlY2F5LCBzZXRTaW11bGF0ZU5vaXNlRGVjYXldID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtzaG93U3RhYmlsaXR5VHJlbmQsIHNldFNob3dTdGFiaWxpdHlUcmVuZF0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgW2VuYWJsZUx1bWFGaWx0ZXIsIHNldEVuYWJsZUx1bWFGaWx0ZXJdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtzdGFiaWxpdHlUaHJlc2hvbGQsIHNldFN0YWJpbGl0eVRocmVzaG9sZF0gPSB1c2VTdGF0ZTxudW1iZXI+KDMuMCk7XG4gIGNvbnN0IFtjb2xvclNlbnNpdGl2aXR5LCBzZXRDb2xvclNlbnNpdGl2aXR5XSA9IHVzZVN0YXRlPG51bWJlcj4oMS4wKTtcbiAgY29uc3QgW2lzQ29sbGFwc2VkLCBzZXRJc0NvbGxhcHNlZF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIFxuICAvLyBDdXN0b20gc3RhdGVzIGZvciBwZXJzaXN0ZW5jZSBoZWF0bWFwLCBkZWVwLWRpdmUgbW9kYWxcbiAgY29uc3QgW2VuYWJsZVBlcnNpc3RlbmNlLCBzZXRFbmFibGVQZXJzaXN0ZW5jZV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtwZXJzaXN0ZW5jZUhpc3RvcnksIHNldFBlcnNpc3RlbmNlSGlzdG9yeV0gPSB1c2VTdGF0ZTxhbnlbXVtdPihbXSk7XG4gIGNvbnN0IFtleHBhbmRlZEJpbkluZGV4LCBzZXRFeHBhbmRlZEJpbkluZGV4XSA9IHVzZVN0YXRlPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEludGVyYWN0aXZlIEJvdHRvbSBDb2xvciBHcmFkaWVudCBMZWdlbmQgc3RhdGVcbiAgY29uc3QgW2hvdmVyZWRMZWdlbmRMdW1hLCBzZXRIb3ZlcmVkTGVnZW5kTHVtYV0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2hvdmVyZWRMZWdlbmRQY3QsIHNldEhvdmVyZWRMZWdlbmRQY3RdID0gdXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGdyYWRpZW50QmFyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgXG4gIC8vIFJlYWwtdGltZSBjb3VudGVyIG9mIHRoZSBjdXJyZW50IHNhbXBsaW5nIGZyZXF1ZW5jeSAoSHopIGFuZCBpdHMgbGFzdCAzMCBmcmFtZXMgaGlzdG9yeVxuICBjb25zdCBbc2FtcGxpbmdIeiwgc2V0U2FtcGxpbmdIel0gPSB1c2VTdGF0ZTxudW1iZXI+KDU5LjgpO1xuICBjb25zdCBbc2FtcGxpbmdIekhpc3RvcnksIHNldFNhbXBsaW5nSHpIaXN0b3J5XSA9IHVzZVN0YXRlPG51bWJlcltdPigoKSA9PiBBcnJheSgzMCkuZmlsbCg1OS44KSk7XG4gIGNvbnN0IGxhc3RVcGRhdGVUaW1lUmVmID0gdXNlUmVmPG51bWJlcj4oRGF0ZS5ub3coKSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGRpZmYgPSBub3cgLSBsYXN0VXBkYXRlVGltZVJlZi5jdXJyZW50O1xuICAgIGxhc3RVcGRhdGVUaW1lUmVmLmN1cnJlbnQgPSBub3c7XG5cbiAgICBpZiAoZGlmZiA+IDAgJiYgZGlmZiA8IDEwMDApIHtcbiAgICAgIGNvbnN0IGh6ID0gMTAwMCAvIGRpZmY7XG4gICAgICBsZXQgdGFyZ2V0SHogPSBoejtcbiAgICAgIGlmICh0YXJnZXRIeiA+IDgwIHx8IHRhcmdldEh6IDwgMzApIHtcbiAgICAgICAgdGFyZ2V0SHogPSA1OS43ICsgTWF0aC5zaW4obm93IC8gNDAwKSAqIDAuNDUgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjE7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHNldFNhbXBsaW5nSHooKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dEh6ID0gcGFyc2VGbG9hdCgocHJldiAqIDAuOTIgKyB0YXJnZXRIeiAqIDAuMDgpLnRvRml4ZWQoMSkpO1xuICAgICAgICBcbiAgICAgICAgLy8gQWNjdW11bGF0ZSBzYW1wbGluZyBmcmVxdWVuY3kgaGlzdG9yeSBmb3Igc3BhcmtsaW5lXG4gICAgICAgIHNldFNhbXBsaW5nSHpIaXN0b3J5KChwcmV2SGlzdG9yeSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHRIaXN0b3J5ID0gWy4uLnByZXZIaXN0b3J5LCBuZXh0SHpdO1xuICAgICAgICAgIHJldHVybiBuZXh0SGlzdG9yeS5zbGljZSgtMzApO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXh0SHo7XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIFttZXRyaWNzXSk7XG4gIFxuICAvLyBJbnRlcmFjdGl2ZSB0b29sdGlwIHN0YXRlXG4gIGNvbnN0IFtob3ZlcmVkQmluLCBzZXRIb3ZlcmVkQmluXSA9IHVzZVN0YXRlPG51bWJlciB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEx1bWEgaGlzdG9yeSB0cmFja2luZyBmb3IgbW92aW5nIHN0YW5kYXJkIGRldmlhdGlvbiBjYWxjdWxhdGlvbnMgb3ZlciB0aGUgbGFzdCAzMCBmcmFtZXNcbiAgY29uc3QgW2x1bWFIaXN0b3J5LCBzZXRMdW1hSGlzdG9yeV0gPSB1c2VTdGF0ZTxudW1iZXJbXT4oW10pO1xuICBjb25zdCBbc3RkRGV2SGlzdG9yeSwgc2V0U3RkRGV2SGlzdG9yeV0gPSB1c2VTdGF0ZTxudW1iZXJbXT4oW10pO1xuXG4gIC8vIFwiRnJlZXplIFZpZXdcIiBhbmQgb2ZmbGluZSBkaWFnbm9zdGljIHNuYXBzaG90IHN0YXRlc1xuICBjb25zdCBbaXNGcm96ZW4sIHNldElzRnJvemVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2Zyb3plbkJpbkRhdGEsIHNldEZyb3plbkJpbkRhdGFdID0gdXNlU3RhdGU8YW55W10gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2Zyb3plbkZpbHRlcmVkTHVtYSwgc2V0RnJvemVuRmlsdGVyZWRMdW1hXSA9IHVzZVN0YXRlPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZnJvemVuTHVtYVN0ZERldiwgc2V0RnJvemVuTHVtYVN0ZERldl0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2Zyb3plbk1ldHJpY3MsIHNldEZyb3plbk1ldHJpY3NdID0gdXNlU3RhdGU8Q2FsaWJyYXRpb25NZXRyaWNzIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtmcm96ZW5MdW1hSGlzdG9yeSwgc2V0RnJvemVuTHVtYUhpc3RvcnldID0gdXNlU3RhdGU8bnVtYmVyW10gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2Zyb3plblN0ZERldkhpc3RvcnksIHNldEZyb3plblN0ZERldkhpc3RvcnldID0gdXNlU3RhdGU8bnVtYmVyW10gfCBudWxsPihudWxsKTtcblxuICAvLyBVcGRhdGUgcm9sbGluZyBoaXN0b3JpZXMgd2hlbiBtZXRyaWNzLmx1bWEgdXBkYXRlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRMdW1hID0gdHlwZW9mIG1ldHJpY3MubHVtYSA9PT0gJ251bWJlcicgPyBtZXRyaWNzLmx1bWEgOiAxNDI7XG4gICAgc2V0THVtYUhpc3RvcnkoKHByZXZMdW1hKSA9PiB7XG4gICAgICBjb25zdCBuZXh0THVtYSA9IFsuLi5wcmV2THVtYSwgY3VycmVudEx1bWFdO1xuICAgICAgY29uc3QgdHJpbW1lZEx1bWEgPSBuZXh0THVtYS5zbGljZSgtMzApO1xuICAgICAgXG4gICAgICAvLyBDYWxjdWxhdGUgc3RhbmRhcmQgZGV2aWF0aW9uIG9mIHRoZSBsYXN0IDMwIGZyYW1lc1xuICAgICAgY29uc3QgbiA9IHRyaW1tZWRMdW1hLmxlbmd0aDtcbiAgICAgIGxldCBzdGREZXYgPSAwO1xuICAgICAgaWYgKG4gPiAxKSB7XG4gICAgICAgIGNvbnN0IG1lYW4gPSB0cmltbWVkTHVtYS5yZWR1Y2UoKHN1bSwgdmFsKSA9PiBzdW0gKyB2YWwsIDApIC8gbjtcbiAgICAgICAgY29uc3QgdmFyaWFuY2UgPSB0cmltbWVkTHVtYS5yZWR1Y2UoKHN1bSwgdmFsKSA9PiBzdW0gKyBNYXRoLnBvdyh2YWwgLSBtZWFuLCAyKSwgMCkgLyBuO1xuICAgICAgICBzdGREZXYgPSBNYXRoLnNxcnQodmFyaWFuY2UpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBzZXRTdGREZXZIaXN0b3J5KChwcmV2U3RkRGV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHRTdGREZXYgPSBbLi4ucHJldlN0ZERldiwgc3RkRGV2XTtcbiAgICAgICAgcmV0dXJuIG5leHRTdGREZXYuc2xpY2UoLTMwKTtcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICByZXR1cm4gdHJpbW1lZEx1bWE7XG4gICAgfSk7XG4gIH0sIFttZXRyaWNzLmx1bWFdKTtcblxuICBjb25zdCBsdW1hU3RkRGV2ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKHN0ZERldkhpc3RvcnkubGVuZ3RoID09PSAwKSByZXR1cm4gMDtcbiAgICByZXR1cm4gc3RkRGV2SGlzdG9yeVtzdGREZXZIaXN0b3J5Lmxlbmd0aCAtIDFdO1xuICB9LCBbc3RkRGV2SGlzdG9yeV0pO1xuXG4gIC8vIE1vdmluZyBhdmVyYWdlIGZpbHRlcmVkIEx1bWEgdG8gcmVkdWNlIGhpZ2gtZnJlcXVlbmN5IG5vaXNlXG4gIGNvbnN0IGZpbHRlcmVkTHVtYSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHJhd0x1bWEgPSB0eXBlb2YgbWV0cmljcy5sdW1hID09PSAnbnVtYmVyJyA/IG1ldHJpY3MubHVtYSA6IDE0MjtcbiAgICBpZiAoIWVuYWJsZUx1bWFGaWx0ZXIgfHwgbHVtYUhpc3RvcnkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gcmF3THVtYTtcbiAgICB9XG4gICAgLy8gQ2FsY3VsYXRlIDgtZnJhbWUgc2xpZGluZyBtb3ZpbmcgYXZlcmFnZVxuICAgIGNvbnN0IHdpbmRvd1NpemUgPSA4O1xuICAgIGNvbnN0IHN1YnNldCA9IGx1bWFIaXN0b3J5LnNsaWNlKC13aW5kb3dTaXplKTtcbiAgICBjb25zdCBzdW0gPSBzdWJzZXQucmVkdWNlKChhY2MsIHZhbCkgPT4gYWNjICsgdmFsLCAwKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChzdW0gLyBzdWJzZXQubGVuZ3RoKTtcbiAgfSwgW2x1bWFIaXN0b3J5LCBtZXRyaWNzLmx1bWEsIGVuYWJsZUx1bWFGaWx0ZXJdKTtcblxuICAvLyBUb3RhbCBhY3RpdmUgcG9pbnRzIHRvIG1hdGNoIHRoZSBzeXN0ZW0ncyBzaW11bGF0ZWQgMTIsNDAwIHBvaW50c1xuICBjb25zdCB0b3RhbFBvaW50cyA9IDEyNDAwO1xuXG4gIC8vIENhbGN1bGF0ZSB0aGUgbGl2ZSBkZXB0aCBkaXN0cmlidXRpb24gb2YgdGhlIDEyLDQwMCBwb2ludHMgYmFzZWQgb24gcGFyZW50IG1ldHJpY3NcbiAgY29uc3QgYmluRGF0YSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIC8vIEN1cnJlbnQgZGlzdGFuY2UgaW4gY21cbiAgICBjb25zdCBjdXJyZW50RGlzdGFuY2VDbSA9IChtZXRyaWNzLmRpc3RhbmNlIHx8IDAuMzUpICogMTAwO1xuICAgIFxuICAgIC8vIFJvdGF0aW9uIG1ldHJpY3MgKHlhdyBhbmQgcGl0Y2gpIHBoeXNpY2FsbHkgd2FycC9za2V3IHRoZSBjZW50ZXIgb2YgZGVwdGggZGlzdHJpYnV0aW9uXG4gICAgY29uc3Qgc2tld0ZhY3RvciA9IChtZXRyaWNzLnlhdyB8fCAwKSAqIDAuMTIgLSAobWV0cmljcy5waXRjaCB8fCAwKSAqIDAuMDg7XG4gICAgY29uc3QgcGVha0RlcHRoID0gY3VycmVudERpc3RhbmNlQ20gKyBza2V3RmFjdG9yO1xuXG4gICAgLy8gU3RhbmRhcmQgZGV2aWF0aW9uIGluIGNtIHJlcHJlc2VudGluZyBmYWNpYWwgb3IgYmVsbHkgc3RydWN0dXJlIGRlcHRoIGRlcHRoIHNwcmVhZFxuICAgIC8vIEZhY2lhbCBzY2FubmluZyAoY2hvbWlraV90d2FyeikgaGFzIG1vcmUgbG9jYWwgbGFuZG1hcmtzIHRoYW4gYWJkb21lbiBzY2FubmluZyAob3BvbmthX2JyenVjaClcbiAgICBjb25zdCBzdGREZXYgPSBzY2FuVHlwZSA9PT0gJ29wb25rYV9icnp1Y2gnID8gNS4yIDogMy44O1xuXG4gICAgLy8gQ2FsY3VsYXRlIG5vcm1hbCAoR2F1c3NpYW4pIHdlaWdodHMgZm9yIGVhY2ggYmluIGJhc2VkIG9uIGN1cnJlbnQgcGVhayBkZXB0aFxuICAgIGxldCByYXdCaW5zID0gQklOUy5tYXAoKGJpbikgPT4ge1xuICAgICAgY29uc3QgYmluQ2VudGVyID0gKGJpbi5taW5EZXB0aCArIGJpbi5tYXhEZXB0aCkgLyAyO1xuICAgICAgXG4gICAgICAvLyBDYWxjdWxhdGUgR2F1c3NpYW4gZGlzdHJpYnV0aW9uIHdlaWdodDogZV4oLSh4IC0gbXUpXjIgLyAoMiAqIHNpZ21hXjIpKVxuICAgICAgY29uc3QgZGlmZiA9IGJpbkNlbnRlciAtIHBlYWtEZXB0aDtcbiAgICAgIGxldCB3ZWlnaHQgPSBNYXRoLmV4cCgtKGRpZmYgKiBkaWZmKSAvICgyICogc3RkRGV2ICogc3RkRGV2KSk7XG5cbiAgICAgIC8vIEludHJvZHVjZSBtaWNybyBmbHVjdHVhdGlvbnMvaml0dGVyIGluIHJlYWwtdGltZSB0byBzaW11bGF0ZSBhY3RpdmUgbGFzZXIgc2lnbmFsIGJvdW5jaW5nXG4gICAgICBjb25zdCBqaXR0ZXIgPSAxICsgKE1hdGguc2luKERhdGUubm93KCkgLyAyMDAgKyBiaW4uaWQpICogMC4wNCkgKyAoTWF0aC5jb3MoRGF0ZS5ub3coKSAvIDQ1MCAtIGJpbi5pZCkgKiAwLjAyKTtcbiAgICAgIHdlaWdodCAqPSBqaXR0ZXI7XG5cbiAgICAgIC8vIERpc3RhbmNlLWJhc2VkIHNpZ25hbCBkZWNheTogTGlEQVIgcHJlY2lzaW9uIGdldHMgbm9pc2llciBhdCBmdXJ0aGVyIHJhbmdlc1xuICAgICAgaWYgKHNpbXVsYXRlTm9pc2VEZWNheSAmJiBiaW5DZW50ZXIgPiA0MCkge1xuICAgICAgICBjb25zdCBkZWNheU11bHRpcGxpZXIgPSAxICsgKChiaW5DZW50ZXIgLSA0MCkgLyAxMCkgKiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjI4O1xuICAgICAgICB3ZWlnaHQgKj0gTWF0aC5tYXgoMC4xLCBkZWNheU11bHRpcGxpZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiBiYW5kcGFzcyBmaWx0ZXIgaXMgYWN0aXZlLCBzdHJpY3RseSBjdXQgb2ZmIHNpZ25hbHMgYmV5b25kIHRoZSA0MGNtIG9wdGltYWwgbGltaXRcbiAgICAgIGlmIChiYW5kcGFzc0ZpbHRlciAmJiAoYmluQ2VudGVyID4gNDAgfHwgYmluQ2VudGVyIDwgMjQpKSB7XG4gICAgICAgIHdlaWdodCA9IDA7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJpbixcbiAgICAgICAgd2VpZ2h0LFxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8vIE5vcm1hbGl6ZSB3ZWlnaHRzIHNvIHRoZSBwb2ludHMgc3VtIHVwIGV4YWN0bHkgdG8gdGhlIDEyLDQwMCB0ZWxlbWV0cnkgcG9pbnRzXG4gICAgY29uc3QgdG90YWxXZWlnaHQgPSByYXdCaW5zLnJlZHVjZSgoc3VtLCBiKSA9PiBzdW0gKyBiLndlaWdodCwgMCk7XG4gICAgXG4gICAgcmV0dXJuIHJhd0JpbnMubWFwKChiaW4pID0+IHtcbiAgICAgIGNvbnN0IGNvdW50ID0gdG90YWxXZWlnaHQgPiAwID8gTWF0aC5yb3VuZCgoYmluLndlaWdodCAvIHRvdGFsV2VpZ2h0KSAqIHRvdGFsUG9pbnRzKSA6IDA7XG4gICAgICBjb25zdCBwZXJjZW50YWdlID0gdG90YWxQb2ludHMgPiAwID8gKGNvdW50IC8gdG90YWxQb2ludHMpICogMTAwIDogMDtcbiAgICAgIFxuICAgICAgLy8gRGV0ZXJtaW5lIGxvY2sgcXVhbGl0eSBzdGF0dXMgZm9yIHRoaXMgc3BlY2lmaWMgYmluIHJhbmdlXG4gICAgICBsZXQgcXVhbGl0eTogJ0VYQ0VMTEVOVCcgfCAnU1RBQkxFJyB8ICdXQVJOSU5HJyB8ICdGSUxURVJFRCcgPSAnU1RBQkxFJztcbiAgICAgIGNvbnN0IGJpbkNlbnRlciA9IChiaW4ubWluRGVwdGggKyBiaW4ubWF4RGVwdGgpIC8gMjtcbiAgICAgIFxuICAgICAgaWYgKGJhbmRwYXNzRmlsdGVyICYmIChiaW5DZW50ZXIgPiA0MCB8fCBiaW5DZW50ZXIgPCAyNCkpIHtcbiAgICAgICAgcXVhbGl0eSA9ICdGSUxURVJFRCc7XG4gICAgICB9IGVsc2UgaWYgKGJpbkNlbnRlciA+PSAyNiAmJiBiaW5DZW50ZXIgPD0gMzgpIHtcbiAgICAgICAgcXVhbGl0eSA9ICdFWENFTExFTlQnO1xuICAgICAgfSBlbHNlIGlmIChiaW5DZW50ZXIgPiA0MCkge1xuICAgICAgICBxdWFsaXR5ID0gJ1dBUk5JTkcnO1xuICAgICAgfVxuXG4gICAgICAvLyBDYWxjdWxhdGUgYSBwcmVjaXNlIGxvY2FsIEx1bWEgZm9yIHRoaXMgZGVwdGggYmluIGJhc2VkIG9uIG1vdmluZyBhdmVyYWdlIGZpbHRlcmVkIEx1bWEuXG4gICAgICAvLyBSZWZsZWN0aXZpdHkgaXMgaGlnaGVzdCBuZWFyIHRoZSBmb2NhbC9wZWFrIGRlcHRoLCBhbmQgZHJvcHMgc2xpZ2h0bHkgb2ZmLWNlbnRlci5cbiAgICAgIGNvbnN0IGJhc2VMdW1hID0gZmlsdGVyZWRMdW1hO1xuICAgICAgY29uc3QgZGlzdEZyb21QZWFrID0gTWF0aC5hYnMoYmluQ2VudGVyIC0gcGVha0RlcHRoKTtcbiAgICAgIGNvbnN0IHJlZmxlY3Rpdml0eSA9IE1hdGgubWF4KDAuNywgMSAtIChkaXN0RnJvbVBlYWsgLyA0MCkpO1xuICAgICAgLy8gQWRkIHNsaWdodCBzaW4vY29zIGRldGVybWluaXN0aWMgdmFyaWFuY2UgcGVyIGJpbiBJRCBzbyB0aGF0IHRoZXkgaGF2ZSB1bmlxdWUgdmFsdWVzXG4gICAgICBjb25zdCB2YXJpYW5jZSA9IE1hdGguc2luKGJpbi5pZCAqIDEuNSkgKiA1O1xuICAgICAgY29uc3QgbHVtYSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgTWF0aC5yb3VuZChiYXNlTHVtYSAqIHJlZmxlY3Rpdml0eSArIHZhcmlhbmNlKSkpO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5iaW4sXG4gICAgICAgIGNvdW50LFxuICAgICAgICBwZXJjZW50YWdlLFxuICAgICAgICBxdWFsaXR5LFxuICAgICAgICBsdW1hLFxuICAgICAgfTtcbiAgICB9KTtcbiAgfSwgW21ldHJpY3MuZGlzdGFuY2UsIG1ldHJpY3MueWF3LCBtZXRyaWNzLnBpdGNoLCBzY2FuVHlwZSwgYmFuZHBhc3NGaWx0ZXIsIHNpbXVsYXRlTm9pc2VEZWNheSwgZmlsdGVyZWRMdW1hXSk7XG5cbiAgLy8gQWN0aXZlIHN0YXRlcyB0aGF0IGFyZSBib3VuZCB0byB0aGUgdmlzdWFsIGRpc3BsYXkgKHJlc3BlY3RzIHRoZSBcIkZyZWV6ZSBWaWV3XCIgdG9nZ2xlKVxuICBjb25zdCBhY3RpdmVCaW5EYXRhID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGlzRnJvemVuICYmIGZyb3plbkJpbkRhdGEgPyBmcm96ZW5CaW5EYXRhIDogYmluRGF0YTtcbiAgfSwgW2lzRnJvemVuLCBmcm96ZW5CaW5EYXRhLCBiaW5EYXRhXSk7XG5cbiAgLy8gQWNjdW11bGF0ZSBoaXN0b3JpY2FsIGZyYW1lcyB3aGVuIHBlcnNpc3RlbmNlIGlzIGVuYWJsZWRcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZW5hYmxlUGVyc2lzdGVuY2UpIHtcbiAgICAgIHNldFBlcnNpc3RlbmNlSGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gWy4uLnByZXYsIGFjdGl2ZUJpbkRhdGFdO1xuICAgICAgICByZXR1cm4gbmV4dC5zbGljZSgtMjUpOyAvLyByZXRhaW4gdGhlIGxhc3QgMjUgZnJhbWVzXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0UGVyc2lzdGVuY2VIaXN0b3J5KFtdKTtcbiAgICB9XG4gIH0sIFthY3RpdmVCaW5EYXRhLCBlbmFibGVQZXJzaXN0ZW5jZV0pO1xuXG4gIGNvbnN0IGFjdGl2ZUZpbHRlcmVkTHVtYSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBpc0Zyb3plbiAmJiBmcm96ZW5GaWx0ZXJlZEx1bWEgIT09IG51bGwgPyBmcm96ZW5GaWx0ZXJlZEx1bWEgOiBmaWx0ZXJlZEx1bWE7XG4gIH0sIFtpc0Zyb3plbiwgZnJvemVuRmlsdGVyZWRMdW1hLCBmaWx0ZXJlZEx1bWFdKTtcblxuICBjb25zdCBhY3RpdmVMdW1hU3RkRGV2ID0gdXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIGlzRnJvemVuICYmIGZyb3plbkx1bWFTdGREZXYgIT09IG51bGwgPyBmcm96ZW5MdW1hU3RkRGV2IDogbHVtYVN0ZERldjtcbiAgfSwgW2lzRnJvemVuLCBmcm96ZW5MdW1hU3RkRGV2LCBsdW1hU3RkRGV2XSk7XG5cbiAgY29uc3QgYWN0aXZlTWV0cmljcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBpc0Zyb3plbiAmJiBmcm96ZW5NZXRyaWNzID8gZnJvemVuTWV0cmljcyA6IG1ldHJpY3M7XG4gIH0sIFtpc0Zyb3plbiwgZnJvemVuTWV0cmljcywgbWV0cmljc10pO1xuXG4gIGNvbnN0IGFjdGl2ZVN0ZERldkhpc3RvcnkgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gaXNGcm96ZW4gJiYgZnJvemVuU3RkRGV2SGlzdG9yeSA/IGZyb3plblN0ZERldkhpc3RvcnkgOiBzdGREZXZIaXN0b3J5O1xuICB9LCBbaXNGcm96ZW4sIGZyb3plblN0ZERldkhpc3RvcnksIHN0ZERldkhpc3RvcnldKTtcblxuICBjb25zdCB0b2dnbGVGcmVlemUgPSAoKSA9PiB7XG4gICAgaWYgKCFpc0Zyb3plbikge1xuICAgICAgc2V0RnJvemVuQmluRGF0YShiaW5EYXRhKTtcbiAgICAgIHNldEZyb3plbkZpbHRlcmVkTHVtYShmaWx0ZXJlZEx1bWEpO1xuICAgICAgc2V0RnJvemVuTHVtYVN0ZERldihsdW1hU3RkRGV2KTtcbiAgICAgIHNldEZyb3plbk1ldHJpY3MobWV0cmljcyk7XG4gICAgICBzZXRGcm96ZW5MdW1hSGlzdG9yeShsdW1hSGlzdG9yeSk7XG4gICAgICBzZXRGcm96ZW5TdGREZXZIaXN0b3J5KHN0ZERldkhpc3RvcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRGcm96ZW5CaW5EYXRhKG51bGwpO1xuICAgICAgc2V0RnJvemVuRmlsdGVyZWRMdW1hKG51bGwpO1xuICAgICAgc2V0RnJvemVuTHVtYVN0ZERldihudWxsKTtcbiAgICAgIHNldEZyb3plbk1ldHJpY3MobnVsbCk7XG4gICAgICBzZXRGcm96ZW5MdW1hSGlzdG9yeShudWxsKTtcbiAgICAgIHNldEZyb3plblN0ZERldkhpc3RvcnkobnVsbCk7XG4gICAgfVxuICAgIHNldElzRnJvemVuKCFpc0Zyb3plbik7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVzZXRCYXNlbGluZSA9ICgpID0+IHtcbiAgICBzZXRMdW1hSGlzdG9yeShbXSk7XG4gICAgc2V0U3RkRGV2SGlzdG9yeShbXSk7XG4gICAgc2V0UGVyc2lzdGVuY2VIaXN0b3J5KFtdKTtcbiAgICBpZiAoaXNGcm96ZW4pIHtcbiAgICAgIHNldEZyb3plbkx1bWFIaXN0b3J5KFtdKTtcbiAgICAgIHNldEZyb3plblN0ZERldkhpc3RvcnkoW10pO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVFeHBvcnRCaW5DU1YgPSAoKSA9PiB7XG4gICAgaWYgKCFhY3RpdmVCaW5EYXRhIHx8IGFjdGl2ZUJpbkRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICBhbGVydChcIkJyYWsgZGFueWNoIGhpc3RvZ3JhbXUgZG8gcG9icmFuaWEuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBoZWFkZXIgcm93XG4gICAgbGV0IGNzdkNvbnRlbnQgPSBcImRhdGE6dGV4dC9jc3Y7Y2hhcnNldD11dGYtOCxcIjtcbiAgICBjc3ZDb250ZW50ICs9IFwiQmluIElELERlcHRoIFJhbmdlIChjbSksTWluIERlcHRoIChjbSksTWF4IERlcHRoIChjbSksU2FtcGxlIENvdW50LFBlcmNlbnRhZ2UgKCUpLEx1bWEgSW50ZW5zaXR5ICgwLTI1NSksUXVhbGl0eSBTdGF0dXNcXG5cIjtcblxuICAgIGFjdGl2ZUJpbkRhdGEuZm9yRWFjaCgoYmluKSA9PiB7XG4gICAgICBjb25zdCByb3cgPSBbXG4gICAgICAgIGJpbi5pZCxcbiAgICAgICAgYFwiJHtiaW4ubGFiZWx9IGNtXCJgLFxuICAgICAgICBiaW4ubWluRGVwdGgsXG4gICAgICAgIGJpbi5tYXhEZXB0aCxcbiAgICAgICAgYmluLmNvdW50LFxuICAgICAgICBiaW4ucGVyY2VudGFnZS50b0ZpeGVkKDIpLFxuICAgICAgICBiaW4ubHVtYSxcbiAgICAgICAgYFwiJHtiaW4ucXVhbGl0eX1cImBcbiAgICAgIF07XG4gICAgICBjc3ZDb250ZW50ICs9IHJvdy5qb2luKFwiLFwiKSArIFwiXFxuXCI7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbmNvZGVkVXJpID0gZW5jb2RlVVJJKGNzdkNvbnRlbnQpO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBsaW5rLnNldEF0dHJpYnV0ZShcImhyZWZcIiwgZW5jb2RlZFVyaSk7XG4gICAgbGluay5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLCBgbGlkYXJfaGlzdG9ncmFtX2JpbnNfJHtEYXRlLm5vdygpfS5jc3ZgKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkQ1NWID0gKCkgPT4ge1xuICAgIGNvbnN0IGhpc3RvcnlUb0Rvd25sb2FkID0gaXNGcm96ZW4gJiYgZnJvemVuTHVtYUhpc3RvcnkgPyBmcm96ZW5MdW1hSGlzdG9yeSA6IGx1bWFIaXN0b3J5O1xuICAgIGNvbnN0IHN0ZERldnNUb0Rvd25sb2FkID0gaXNGcm96ZW4gJiYgZnJvemVuU3RkRGV2SGlzdG9yeSA/IGZyb3plblN0ZERldkhpc3RvcnkgOiBzdGREZXZIaXN0b3J5O1xuICAgIFxuICAgIGlmIChoaXN0b3J5VG9Eb3dubG9hZC5sZW5ndGggPT09IDApIHtcbiAgICAgIGFsZXJ0KFwiQnJhayBkYW55Y2ggaGlzdG9yeWN6bnljaCBMdW1hIGRvIHBvYnJhbmlhLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgLy8gQ3JlYXRlIGhlYWRlciByb3dcbiAgICBsZXQgY3N2Q29udGVudCA9IFwiZGF0YTp0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04LFwiO1xuICAgIGNzdkNvbnRlbnQgKz0gXCJLbGF0a2EgKEZyYW1lKSxXYXJ0b3NjIEx1bWEgKEx1bWEgVmFsdWUpLE9kY2h5bGVuaWUgU3RhbmRhcmRvd2UgKEx1bWEgU3RkIERldilcXG5cIjtcbiAgICBcbiAgICBoaXN0b3J5VG9Eb3dubG9hZC5mb3JFYWNoKChsdW1hLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3Qgc3RkRGV2ID0gc3RkRGV2c1RvRG93bmxvYWRbaW5kZXhdICE9PSB1bmRlZmluZWQgPyBzdGREZXZzVG9Eb3dubG9hZFtpbmRleF0udG9GaXhlZCg0KSA6IFwiMC4wMDAwXCI7XG4gICAgICBjc3ZDb250ZW50ICs9IGAke2luZGV4ICsgMX0sJHtsdW1hfSwke3N0ZERldn1cXG5gO1xuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGVuY29kZWRVcmkgPSBlbmNvZGVVUkkoY3N2Q29udGVudCk7XG4gICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGxpbmsuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBlbmNvZGVkVXJpKTtcbiAgICBsaW5rLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsIGBsaWRhcl9sdW1hX2RpYWdub3N0aWNzXyR7RGF0ZS5ub3coKX0uY3N2YCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICBsaW5rLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgfTtcblxuICBjb25zdCBbaXNDYXB0dXJpbmdTY3JlZW5zaG90LCBzZXRJc0NhcHR1cmluZ1NjcmVlbnNob3RdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbc2NyZWVuc2hvdFN1Y2Nlc3MsIHNldFNjcmVlbnNob3RTdWNjZXNzXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFBORyA9IGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlkYXJfZGVwdGhfaGlzdG9ncmFtX2NvbnRhaW5lcicpO1xuICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG4gICAgXG4gICAgdHJ5IHtcbiAgICAgIHNldElzQ2FwdHVyaW5nU2NyZWVuc2hvdCh0cnVlKTtcbiAgICAgIC8vIEJyaWVmIGRlbGF5IHRvIGFsbG93IGFueSBwZW5kaW5nIERPTSBwYWludCBvciBsYXlvdXQgc3RhdGVzIHRvIHNldHRsZVxuICAgICAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgNTApKTtcblxuICAgICAgY29uc3QgY2FudmFzID0gYXdhaXQgaHRtbDJjYW52YXMoY29udGFpbmVyLCB7XG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMwMjA2MTcnLCAvLyBTbGF0ZS05NTAgdGhlbWUgYmFja2dyb3VuZFxuICAgICAgICBzY2FsZTogMiwgLy8gSGlnaCByZXNvbHV0aW9uIChyZXRpbmEgY3Jpc3BuZXNzKVxuICAgICAgICBsb2dnaW5nOiBmYWxzZSxcbiAgICAgICAgdXNlQ09SUzogdHJ1ZSxcbiAgICAgICAgYWxsb3dUYWludDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgbGluay5kb3dubG9hZCA9IGBsaWRhcl9oaXN0b2dyYW1fb3ZlcmxheV9yZXZpZXdfJHtEYXRlLm5vdygpfS5wbmdgO1xuICAgICAgbGluay5ocmVmID0gZGF0YVVybDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgXG4gICAgICBzZXRTY3JlZW5zaG90U3VjY2Vzcyh0cnVlKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2NyZWVuc2hvdFN1Y2Nlc3MoZmFsc2UpLCAyNTAwKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignQsWCxIVkIHBvZGN6YXMgZ2VuZXJvd2FuaWEgenJ6dXR1IGVrcmFudSBQTkc6JywgZXJyb3IpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0NhcHR1cmluZ1NjcmVlbnNob3QoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICAvLyBNYXggdmFsdWUgZm9yIHNjYWxpbmcgU1ZHIGJhcnNcbiAgY29uc3QgbWF4Q291bnQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gTWF0aC5tYXgoLi4uYWN0aXZlQmluRGF0YS5tYXAoKGIpID0+IGIuY291bnQpLCAxKTtcbiAgfSwgW2FjdGl2ZUJpbkRhdGFdKTtcblxuICBjb25zdCBpc1RocmVzaG9sZEJyZWFjaGVkID0gYWN0aXZlTHVtYVN0ZERldiA+IHN0YWJpbGl0eVRocmVzaG9sZDtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgXG4gICAgICBjbGFzc05hbWU9e2Bib3JkZXIgcm91bmRlZC14bCBwLTQgYmctc2xhdGUtOTUwLzQwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgJHtcbiAgICAgICAgaXNUaHJlc2hvbGRCcmVhY2hlZCBcbiAgICAgICAgICA/ICdib3JkZXItcmVkLTUwMC84MCBzaGFkb3ctWzBfMF8yMHB4X3JnYmEoMjM5LDY4LDY4LDAuMildJyBcbiAgICAgICAgICA6ICdib3JkZXItc2xhdGUtOTAwJ1xuICAgICAgfWB9IFxuICAgICAgaWQ9XCJsaWRhcl9kZXB0aF9oaXN0b2dyYW1fY29udGFpbmVyXCJcbiAgICA+XG4gICAgICB7LyogVmlzdWFsIGN5YmVybmV0aWMgc2Nhbm5lciBuZW9uIGhlYWRlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuICR7aXNDb2xsYXBzZWQgPyAnbWItMCBwYi0wJyA6ICdtYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgcGItMid9YH0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8QmFyQ2hhcnQyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1za3ktNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9ja1wiPlxuICAgICAgICAgICAgICBISVNUT0dSQU0gR8WBxJhCSSBMaURBUiBXIENaQVNJRSBSWkVDWllXSVNUWU0ge2lzQ29sbGFwc2VkICYmIFwiKFpXSU5JxJhUWSlcIn1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNTAwIGJsb2NrXCI+XG4gICAgICAgICAgICAgIEFrdHl3bnkgcm96a8WCYWQgMTIsNDAwIG9kYml0eWNoIHdpxIV6ZWsgbGFzZXJhIHBvZGN6ZXJ3aWVuaSAoOTQwbm0pXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBcbiAgICAgICAgey8qIFN0YXR1cyBpbmRpY2F0b3IgYmFkZ2UgYW5kIGNvbGxhcHNlIGJ1dHRvbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC1tb25vIHRleHQtWzhweF0gYmctc2t5LTk1MC82MCB0ZXh0LXNreS00MDAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNreS04MDBcIiB0aXRsZT1cIlN0YWJpbG5vxZvEhyBIeiAob3N0YXRuaWUgMzAga2xhdGVrKVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXNreS00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkZSRVE6IHtzYW1wbGluZ0h6LnRvRml4ZWQoMSl9IEhaPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7LyogUmVhbC10aW1lIHNwYXJrbGluZSBjaGFydCBvZiBzYW1wbGluZyBmcmVxdWVuY3kgKEh6KSBzdGFiaWxpdHkgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0zIGZsZXggaXRlbXMtY2VudGVyIGJvcmRlci1sIGJvcmRlci1za3ktODAwLzYwIHBsLTEuNVwiPlxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb3ZlcmZsb3ctdmlzaWJsZVwiIHZpZXdCb3g9XCIwIDAgMzAgMTBcIiBpZD1cImhlYWRlcl9zYW1wbGluZ19oel9zcGFya2xpbmVcIj5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZD17KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uc2FtcGxpbmdIekhpc3RvcnkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5zYW1wbGluZ0h6SGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhbmdlID0gbWF4IC0gbWluIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IHNhbXBsaW5nSHpIaXN0b3J5Lm1hcCgodmFsLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gaWR4O1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSA5IC0gKCh2YWwgLSBtaW4pIC8gcmFuZ2UpICogODtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7eH0sJHt5fWA7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYE0gJHtwb2ludHMuam9pbignIEwgJyl9YDtcbiAgICAgICAgICAgICAgICAgIH0pKCl9XG4gICAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICBzdHJva2U9XCIjMzhiZGY4XCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMVwiXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBPdmVybGF5IFNjcmVlbnNob3QgYnV0dG9uIGluIGhlYWRlciAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZFBOR31cbiAgICAgICAgICAgIGRpc2FibGVkPXtpc0NhcHR1cmluZ1NjcmVlbnNob3R9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMSB0ZXh0LVs4cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgcm91bmRlZCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgc2NyZWVuc2hvdFN1Y2Nlc3NcbiAgICAgICAgICAgICAgICA/ICdib3JkZXItZW1lcmFsZC01MDAgYmctZW1lcmFsZC05NTAvNjAgdGV4dC1lbWVyYWxkLTMwMCBzaGFkb3ctWzBfMF84cHhfcmdiYSgxNiwxODUsMTI5LDAuMyldJ1xuICAgICAgICAgICAgICAgIDogaXNDYXB0dXJpbmdTY3JlZW5zaG90XG4gICAgICAgICAgICAgICAgICA/ICdib3JkZXItYW1iZXItNTAwLzgwIGJnLWFtYmVyLTk1MC80MCB0ZXh0LWFtYmVyLTQwMCBvcGFjaXR5LTgwIGN1cnNvci13YWl0J1xuICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLWN5YW4tOTAwLzYwIGhvdmVyOmJvcmRlci1jeWFuLTQwMCBiZy1jeWFuLTk1MC80MCB0ZXh0LWN5YW4tMzAwIGhvdmVyOnRleHQtY3lhbi0xMDAgaG92ZXI6c2hhZG93LVswXzBfOHB4X3JnYmEoNiwxODIsMjEyLDAuMildJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB0aXRsZT1cIkdlbmVydWogenJ6dXQgZWtyYW51IFBORyBvIHd5c29raWVqIHJvemR6aWVsY3pvxZtjaSB6IGJpZcW8xIVjeW0gc3RhbmVtIGhpc3RvZ3JhbXUgaSBoZWF0bWFweSBkbGEgZG9rdW1lbnRhY2ppIHRlY2huaWN6bmVqXCJcbiAgICAgICAgICAgIGlkPVwibGlkYXJfaGlzdG9ncmFtX292ZXJsYXlfc2NyZWVuc2hvdF9idG5cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxDYW1lcmEgY2xhc3NOYW1lPXtgdy0yLjUgaC0yLjUgJHtpc0NhcHR1cmluZ1NjcmVlbnNob3QgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICA8c3Bhbj57c2NyZWVuc2hvdFN1Y2Nlc3MgPyAnWkFQSVNBTk8gUE5HIScgOiBpc0NhcHR1cmluZ1NjcmVlbnNob3QgPyAnUFJaRVRXQVJaQU5JRS4uLicgOiAnT1ZFUkxBWSBTQ1JFRU5TSE9UJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogRXhwb3J0IENTViBidXR0b24gaW4gaGVhZGVyICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUV4cG9ydEJpbkNTVn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIuNSBweS0xIHRleHQtWzhweF0gZm9udC1tb25vIGZvbnQtYm9sZCByb3VuZGVkIGJvcmRlciBib3JkZXItc2t5LTkwMC81MCBob3Zlcjpib3JkZXItc2t5LTUwMCBiZy1za3ktOTUwLzQwIHRleHQtc2t5LTQwMCBob3Zlcjp0ZXh0LXNreS0zMDAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9XCJFa3Nwb3J0dWogYmllxbzEhWNlIGRhbmUgc8WCdXBrw7N3IGhpc3RvZ3JhbXUgKGJpbiBkYXRhKSBkbyBwbGlrdSBDU1ZcIlxuICAgICAgICAgICAgaWQ9XCJsaWRhcl9oaXN0b2dyYW1faGVhZGVyX2V4cG9ydF9jc3ZfYnRuXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+RVhQT1JUIENTVjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0QmFzZWxpbmV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMSB0ZXh0LVs4cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgcm91bmRlZCBib3JkZXIgYm9yZGVyLXJlZC05MDAvNTAgaG92ZXI6Ym9yZGVyLXJlZC01MDAgYmctcmVkLTk1MC80MCB0ZXh0LXJlZC00MDAgaG92ZXI6dGV4dC1yZWQtMzAwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiUmVzZXR1aiBoaXN0b3JpxJkgTHVtYSBpIMWbcmVkbmnEhSBydWNob23EhSAocmUtc3luYylcIlxuICAgICAgICAgICAgaWQ9XCJsaWRhcl9oaXN0b2dyYW1fcmVzZXRfYnRuXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UmVmcmVzaENjdyBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5SRVNFVDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICBcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0NvbGxhcHNlZCghaXNDb2xsYXBzZWQpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0xIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCBiZy1zbGF0ZS05MDAvNjAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9e2lzQ29sbGFwc2VkID8gXCJSb3p3acWEIGhpc3RvZ3JhbVwiIDogXCJad2nFhCBoaXN0b2dyYW1cIn1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aXNDb2xsYXBzZWQgPyA8Q2hldnJvbkRvd24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiA6IDxDaGV2cm9uVXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENvbXBhY3QgYWN0aXZlIG1vbml0b3Jpbmcgcm93IHdoZW4gY29sbGFwc2VkIChzbW9vdGggdHJhbnNpdGlvbikgKi99XG4gICAgICA8ZGl2IFxuICAgICAgICBjbGFzc05hbWU9e2B0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgZWFzZS1pbi1vdXQgb3ZlcmZsb3ctaGlkZGVuICR7XG4gICAgICAgICAgaXNDb2xsYXBzZWQgPyAnbWF4LWgtMjQgb3BhY2l0eS0xMDAgbXQtMicgOiAnbWF4LWgtMCBvcGFjaXR5LTAgcG9pbnRlci1ldmVudHMtbm9uZSBtdC0wJ1xuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMC80MCBmb250LW1vbm8gdGV4dC1bOC41cHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgUEVBSyBERVBUSDogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDBcIj57KChhY3RpdmVNZXRyaWNzLmRpc3RhbmNlIHx8IDAuMzUpICogMTAwKS50b0ZpeGVkKDEpfSBjbTwvc3Ryb25nPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgTFVNQSBXWUfFgUFEWk9OQTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMFwiPnthY3RpdmVGaWx0ZXJlZEx1bWF9PC9zdHJvbmc+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICBTVEFCSUxOT8WaxIYgz4M6IDxzdHJvbmcgY2xhc3NOYW1lPXthY3RpdmVMdW1hU3RkRGV2IDwgc3RhYmlsaXR5VGhyZXNob2xkID8gJ3RleHQtZW1lcmFsZC00MDAnIDogJ3RleHQtcmVkLTQwMCBhbmltYXRlLXB1bHNlJ30+XG4gICAgICAgICAgICAgICAge2FjdGl2ZUx1bWFTdGREZXYudG9GaXhlZCgyKX1cbiAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2FjdGl2ZUx1bWFTdGREZXYgPiBzdGFiaWxpdHlUaHJlc2hvbGQgPyAoXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDAgZm9udC1ib2xkIGFuaW1hdGUtcHVsc2UgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjVcIiAvPiBBTEFSTSBOSUVTVEFCSUxOT8WaQ0lcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdXBwZXJjYXNlIHRleHQtWzdweF1cIj5BUEFSQVRVUkEgTU9OSVRPUlVKxIRDQSBBS1RZV05BPC9zcGFuPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBFeHBhbmRlZCB2aWV3IGNvbnRhaW5lciAoc21vb3RoIHRyYW5zaXRpb24pICovfVxuICAgICAgPGRpdiBcbiAgICAgICAgY2xhc3NOYW1lPXtgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwIGVhc2UtaW4tb3V0IG9yaWdpbi10b3Agb3ZlcmZsb3ctaGlkZGVuICR7XG4gICAgICAgICAgaXNDb2xsYXBzZWQgPyAnbWF4LWgtMCBvcGFjaXR5LTAgcG9pbnRlci1ldmVudHMtbm9uZSBtdC0wJyA6ICdtYXgtaC1bMTQwMHB4XSBvcGFjaXR5LTEwMCBtdC0yLjUnXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICB7LyogV2FybmluZyBiYW5uZXIgd2hlbiBsdW1hIHN0YW5kYXJkIGRldmlhdGlvbiBleGNlZWRzIHRocmVzaG9sZCAqL31cbiAgICAgICAge2FjdGl2ZUx1bWFTdGREZXYgPiBzdGFiaWxpdHlUaHJlc2hvbGQgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItMi41IGJnLXJlZC05NTAvNzUgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzUwIHJvdW5kZWQtbGcgcC0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXJlZC0yMDAgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcmVkLTUwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1yZWQtNDAwXCI+XG4gICAgICAgICAgICAgICAgICBBTEFSTTogTklFU1RBQklMTk/FmsSGIE/FmldJRVRMRU5JQSAoz4MgTHVtYToge2FjdGl2ZUx1bWFTdGREZXYudG9GaXhlZCgyKX0gJmd0OyB7c3RhYmlsaXR5VGhyZXNob2xkLnRvRml4ZWQoMSl9KVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICBXeWtyeXRvIHd5c29raWUgZmx1a3R1YWNqZSBvxZt3aWV0bGVuaWEgemV3bsSZdHJ6bmVnby4gU2thbGlicnVqIMW6csOzZMWCbyDFm3dpYXTFgmEgbHViIHp3acSZa3N6IHByw7NnIHN0YWJpbG5vxZtjaS5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTdGFiaWxpdHlUaHJlc2hvbGQoTWF0aC5jZWlsKGFjdGl2ZUx1bWFTdGREZXYgKiAxMCkgLyAxMCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzdweF0gZm9udC1tb25vIGJnLXJlZC05MDAvNjAgaG92ZXI6YmctcmVkLTkwMCBib3JkZXIgYm9yZGVyLXJlZC01MDAvMzAgdGV4dC13aGl0ZSBweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBzaHJpbmstMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEFVVE9ET1BBU1VKXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgICB7LyogTWFpbiBDaGFydCBDb2x1bW4gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi0zIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICB7LyogTWFpbiBDaGFydCB2aWV3cG9ydCBjb250YWluZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtWzE1NXB4XSBiZy1zbGF0ZS05NTAvNjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMC82MCBwLTMgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIiBpZD1cImxpZGFyX2NoYXJ0X3ZpZXdwb3J0XCI+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB7LyogQWJzb2x1dGUgY29vcmRpbmF0ZSBiYWNrZ3JvdW5kIGdyaWQgbGluZXMgKi99XG4gICAgICAgICAgICAgIHtzaG93R3JpZExpbmVzICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyByaWdodC0zIHRvcC1bMjhweF0gYm90dG9tLVs0cHhdIHBvaW50ZXItZXZlbnRzLW5vbmUgb3BhY2l0eS0yMFwiIGlkPVwibGlkYXJfZ3JpZF9saW5lc1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgaC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBIb3Jpem9udGFsIGdyaWQgbGluZXMgZm9yIGFsaWdubWVudCB3aXRoIHNwZWNpZmljIGludGVuc2l0eSBvciBmcmVxdWVuY3kgdmFsdWVzICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMCByaWdodC0wIHRvcC0xLzQgYm9yZGVyLXQgYm9yZGVyLWRhc2hlZCBib3JkZXItc2t5LTUwMC80MFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0wIHJpZ2h0LTAgdG9wLTIvNCBib3JkZXItdCBib3JkZXItZGFzaGVkIGJvcmRlci1za3ktNTAwLzQwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTAgcmlnaHQtMCB0b3AtMy80IGJvcmRlci10IGJvcmRlci1kYXNoZWQgYm9yZGVyLXNreS01MDAvNDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgey8qIFZlcnRpY2FsIGdyaWQgbGluZXMgYWxpZ25pbmcgd2l0aCBzcGVjaWZpYyBkZXB0aC9mcmVxdWVuY3kgdmFsdWVzICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGJvdHRvbS0wIGxlZnQtWzE0LjI4JV0gYm9yZGVyLWwgYm9yZGVyLWRhc2hlZCBib3JkZXItc2t5LTUwMC8yNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgbGVmdC1bMjguNTclXSBib3JkZXItbCBib3JkZXItZGFzaGVkIGJvcmRlci1za3ktNTAwLzI1XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBib3R0b20tMCBsZWZ0LVs0Mi44NiVdIGJvcmRlci1sIGJvcmRlci1kYXNoZWQgYm9yZGVyLXNreS01MDAvNDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGJvdHRvbS0wIGxlZnQtWzU3LjE0JV0gYm9yZGVyLWwgYm9yZGVyLWRhc2hlZCBib3JkZXItc2t5LTUwMC8yNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgbGVmdC1bNzEuNDMlXSBib3JkZXItbCBib3JkZXItZGFzaGVkIGJvcmRlci1za3ktNTAwLzI1XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBib3R0b20tMCBsZWZ0LVs4NS43MSVdIGJvcmRlci1sIGJvcmRlci1kYXNoZWQgYm9yZGVyLXNreS01MDAvMjVcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEYXNoZWQgdmlzdWFsIGxpbmUgYWNyb3NzIHRoZSBiYWNrZ3JvdW5kIGdyaWQgYXQgdGhlIGN1cnJlbnQgdGFyZ2V0IEx1bWEgaW50ZW5zaXR5IGxldmVsICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMCByaWdodC0wIGJvcmRlci10IGJvcmRlci1kYXNoZWQgYm9yZGVyLWFtYmVyLTUwMC82MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZFwiXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgdG9wOiBgJHsoMSAtIDE0MiAvIDI1NSkgKiAxMDB9JWAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBpZD1cImxpZGFyX3RhcmdldF9sdW1hX2xpbmVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNnB4XSBmb250LW1vbm8gdGV4dC1hbWJlci00MDAgYmctc2xhdGUtOTUwLzgwIHB4LTEgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1hbWJlci04MDAvNDAgbXItMiAtbXQtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgVEFSR0VUIExVTUEgQkVOQ0hNQVJLOiAxNDJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgey8qIFJlYWwtdGltZSBjb3VudGVyIGRpc3BsYXlpbmcgY3VycmVudCBzYW1wbGluZyBmcmVxdWVuY3kgKEh6KSBwcm9jZXNzZWQgZm9yIGhpc3RvZ3JhbSBiaW5zICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIHJpZ2h0LTMgei0yMCBmb250LW1vbm8gdGV4dC1bOHB4XSBiZy1zbGF0ZS05NTAvNzAgdGV4dC1za3ktNDAwIHB4LTIuNSBweS0xLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNreS05MDAvNTAgc2hhZG93LW1kIGZsZXggZmxleC1jb2wgZ2FwLTEgYmFja2Ryb3AtYmx1ci14c1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSB0ZXh0LWVtZXJhbGQtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+VEhST1VHSFBVVDogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPntzYW1wbGluZ0h6LnRvRml4ZWQoMSl9IEh6PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHsvKiBKaXR0ZXIgdHJlbmQgc3RhYmlsaXR5IHNwYXJrbGluZSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHQtMSBib3JkZXItdCBib3JkZXItc2t5LTkwMC8zMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNnB4XSB0ZXh0LXNsYXRlLTUwMCB1cHBlcmNhc2VcIj5KSVRURVIgVFJFTkQgKDMwRik6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMyBmbGV4IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb3ZlcmZsb3ctdmlzaWJsZVwiIHZpZXdCb3g9XCIwIDAgMzAgMTBcIiBpZD1cInNhbXBsaW5nX2h6X3NwYXJrbGluZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgICBkPXsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5zYW1wbGluZ0h6SGlzdG9yeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLnNhbXBsaW5nSHpIaXN0b3J5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSBtYXggLSBtaW4gfHwgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gc2FtcGxpbmdIekhpc3RvcnkubWFwKCh2YWwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBpZHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IDkgLSAoKHZhbCAtIG1pbikgLyByYW5nZSkgKiA4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHt4fSwke3l9YDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgTSAke3BvaW50cy5qb2luKCcgTCAnKX1gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cIiMxMGI5ODFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBIb3ZlciBkZXRhaWwgYm94IC8gSW50ZXJhY3RpdmUgZmxvYXRpbmcgdG9vbHRpcCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMiBsZWZ0LTMgei0yMCBmb250LW1vbm8gdGV4dC1bOHB4XSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIHtob3ZlcmVkQmluICE9PSBudWxsICYmIGFjdGl2ZUJpbkRhdGFbaG92ZXJlZEJpbl0gPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85NSBib3JkZXIgYm9yZGVyLXNreS04MDAgcm91bmRlZCBweC0yLjUgcHktMSB0ZXh0LXNreS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgYW5pbWF0ZS1mYWRlLWluIHNoYWRvdy1sZyBzaGFkb3ctc2t5LTk1MC8yMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj5CSU4gW3thY3RpdmVCaW5EYXRhW2hvdmVyZWRCaW5dLmxhYmVsfSBjbV06PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPldpxIV6a2k6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPnthY3RpdmVCaW5EYXRhW2hvdmVyZWRCaW5dLmNvdW50LnRvTG9jYWxlU3RyaW5nKCl9PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPlVkemlhxYI6IDxzdHJvbmc+e2FjdGl2ZUJpbkRhdGFbaG92ZXJlZEJpbl0ucGVyY2VudGFnZS50b0ZpeGVkKDEpfSU8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+THVtYTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGRcIj57YWN0aXZlQmluRGF0YVtob3ZlcmVkQmluXS5sdW1hfTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEeW5hbWljIGxvY2sgc2FmZXR5IHpvbmUgdGV4dCAqL31cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMSByb3VuZGVkIHRleHQtWzdweF0gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQmluRGF0YVtob3ZlcmVkQmluXS5xdWFsaXR5ID09PSAnRVhDRUxMRU5UJyBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC00MDAnIFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBhY3RpdmVCaW5EYXRhW2hvdmVyZWRCaW5dLnF1YWxpdHkgPT09ICdTVEFCTEUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS05NTAgdGV4dC1za3ktNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IGFjdGl2ZUJpbkRhdGFbaG92ZXJlZEJpbl0ucXVhbGl0eSA9PT0gJ0ZJTFRFUkVEJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTUwMCBsaW5lLXRocm91Z2gnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctcmVkLTk1MCB0ZXh0LXJlZC00MDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlQmluRGF0YVtob3ZlcmVkQmluXS5xdWFsaXR5ID09PSAnRVhDRUxMRU5UJyA/ICdaT05FOiBJREVBTCcgOlxuICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVCaW5EYXRhW2hvdmVyZWRCaW5dLnF1YWxpdHkgPT09ICdTVEFCTEUnID8gJ1pPTkU6IFBBU1MnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQmluRGF0YVtob3ZlcmVkQmluXS5xdWFsaXR5ID09PSAnRklMVEVSRUQnID8gJ1pPTkU6IENVVCcgOiAnWk9ORTogTk9JU0VfREVDQVknfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXNreS01MDAgYW5pbWF0ZS1zcGluXCIgc3R5bGU9e3sgYW5pbWF0aW9uRHVyYXRpb246ICc0cycgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAge2lzRnJvemVuID8gJ1dJRE9LIFpBTVJPxbtPTlkg4oCUIE9CU0VSV0FDSkEgT0ZGTElORScgOiAnTmFqZWTFuiBuYSBzxYJ1cGVrLCBhYnkgc3ByYXdkemnEhyBwcmVjeXpqxJkgcHVua3Rvd8SFIGkgTHVtYSd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFN0YWJpbGl0eSBUcmVuZCBMZWdlbmQgYmFkZ2Ugb24gdG9wIHJpZ2h0ICovfVxuICAgICAgICAgICAgICB7c2hvd1N0YWJpbGl0eVRyZW5kICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC0yIHJpZ2h0LTMgei0yMCBmb250LW1vbm8gdGV4dC1bOHB4XSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBib3JkZXIgcm91bmRlZCBweC0xLjUgcHktMC41IHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZUx1bWFTdGREZXYgPCAyLjAgXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwLzc1IHRleHQtZW1lcmFsZC00MDAgYm9yZGVyLWVtZXJhbGQtODAwLzYwJyBcbiAgICAgICAgICAgICAgICAgICAgOiBhY3RpdmVMdW1hU3RkRGV2IDwgc3RhYmlsaXR5VGhyZXNob2xkIFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC83NSB0ZXh0LWFtYmVyLTQwMCBib3JkZXItYW1iZXItODAwLzYwIGFuaW1hdGUtcHVsc2UnIFxuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXJlZC05NTAvODUgdGV4dC1yZWQtNDAwIGJvcmRlci1yZWQtODAwLzYwIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjUgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0XCI+U1RBQklMTk/FmsSGIM+DOiB7YWN0aXZlTHVtYVN0ZERldi50b0ZpeGVkKDIpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7LyogRHluYW1pYyBsYXNlciBzY2FuIHN3ZWVwaW5nIGJhciBvdmVybGF5ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCB3LTAuNSBiZy1ncmFkaWVudC10by1iIGZyb20tc2t5LTQwMC8wIHZpYS1za3ktNDAwIHRvLXNreS00MDAvMCBwb2ludGVyLWV2ZW50cy1ub25lIG9wYWNpdHktNDAgei0xMCBhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgbGVmdDogYCR7KChhY3RpdmVNZXRyaWNzLmRpc3RhbmNlIHx8IDAuMzUpICogMTAwIC0gMTUpIC8gMzUgKiAxMDB9JWAsXG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAnbGVmdCAwLjE1cyBjdWJpYy1iZXppZXIoMC4xLCAwLjgsIDAuMiwgMSknLFxuICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAwIDEycHggIzM4YmRmOCdcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgIHsvKiBMdW1hIFN0YW5kYXJkIERldmlhdGlvbiBUcmVuZCBMaW5lIFNWRyBPdmVybGF5ICovfVxuICAgICAgICAgICAgICB7c2hvd1N0YWJpbGl0eVRyZW5kICYmIGFjdGl2ZVN0ZERldkhpc3RvcnkubGVuZ3RoID4gMSAmJiAoXG4gICAgICAgICAgICAgICAgPHN2ZyBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtMyByaWdodC0zIHRvcC1bMzJweF0gYm90dG9tLVsyMnB4XSBwb2ludGVyLWV2ZW50cy1ub25lIHotMTUgdy1bY2FsYygxMDAlLTI0cHgpXSBoLVsxMDFweF1cIlxuICAgICAgICAgICAgICAgICAgdmlld0JveD1cIjAgMCAzMDAgMTAwXCIgXG4gICAgICAgICAgICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRlZnM+XG4gICAgICAgICAgICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cImx1bWFTdGREZXZHcmFkaWVudFwiIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiMFwiIHkyPVwiMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiI2Y1OWUwYlwiIHN0b3BPcGFjaXR5PVwiMC4yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiI2Y1OWUwYlwiIHN0b3BPcGFjaXR5PVwiMC4wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cbiAgICAgICAgICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIEZpbGxlZCBhcmVhIHVuZGVyIHBhdGggKi99XG4gICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBkPXsoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IGFjdGl2ZVN0ZERldkhpc3RvcnkubWFwKCh2YWwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeCA9IChpZHggLyAoYWN0aXZlU3RkRGV2SGlzdG9yeS5sZW5ndGggLSAxKSkgKiAzMDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXhTdGQgPSBNYXRoLm1heCguLi5hY3RpdmVTdGREZXZIaXN0b3J5LCA1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSA5NSAtICh2YWwgLyBtYXhTdGQpICogOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7eH0sJHt5fWA7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBNIDAsMTAwIEwgJHtwb2ludHMuam9pbignIEwgJyl9IEwgMzAwLDEwMCBaYDtcbiAgICAgICAgICAgICAgICAgICAgfSkoKX1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cInVybCgjbHVtYVN0ZERldkdyYWRpZW50KVwiXG4gICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICB7LyogR2xvd2luZyB0cmVuZCBsaW5lICovfVxuICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgZD17KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludHMgPSBhY3RpdmVTdGREZXZIaXN0b3J5Lm1hcCgodmFsLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSAoaWR4IC8gKGFjdGl2ZVN0ZERldkhpc3RvcnkubGVuZ3RoIC0gMSkpICogMzAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4U3RkID0gTWF0aC5tYXgoLi4uYWN0aXZlU3RkRGV2SGlzdG9yeSwgNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gOTUgLSAodmFsIC8gbWF4U3RkKSAqIDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke3h9LCR7eX1gO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgTSAke3BvaW50cy5qb2luKCcgTCAnKX1gO1xuICAgICAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cIiNmNTllMGJcIlxuICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuOFwiXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkcm9wLXNoYWRvdy1bMF8wXzRweF9yZ2JhKDI0NSwxNTgsMTEsMC42NSldXCJcbiAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBIaWdobGlnaHQgcG9pbnQgb24gbGF0ZXN0IGZyYW1lICovfVxuICAgICAgICAgICAgICAgICAgeygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGFjdGl2ZVN0ZERldkhpc3RvcnlbYWN0aXZlU3RkRGV2SGlzdG9yeS5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4U3RkID0gTWF0aC5tYXgoLi4uYWN0aXZlU3RkRGV2SGlzdG9yeSwgNSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSA5NSAtICh2YWwgLyBtYXhTdGQpICogOTA7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGcgY2xhc3NOYW1lPVwiYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjMwMFwiIGN5PXt5fSByPVwiM1wiIGZpbGw9XCIjZjU5ZTBiXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY3g9XCIzMDBcIiBjeT17eX0gcj1cIjZcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiNmNTllMGJcIiBzdHJva2VXaWR0aD1cIjFcIiBvcGFjaXR5PVwiMC42XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KSgpfVxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHsvKiBTVkcgUmVuZGVyZWQgSGlzdG9ncmFtIEJhcnMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIHctZnVsbCBmbGV4IGl0ZW1zLWVuZCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTEuNSBwdC03IHBiLTFcIiBpZD1cImhpc3RvZ3JhbV9zdmdfdmlld3BvcnRcIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlQmluRGF0YS5tYXAoKGJpbiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgYmFySGVpZ2h0UGN0ID0gKGJpbi5jb3VudCAvIG1heENvdW50KSAqIDEwMDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzSG92ZXJlZCA9IGhvdmVyZWRCaW4gPT09IGk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBiaW5DZW50ZXIgPSAoYmluLm1pbkRlcHRoICsgYmluLm1heERlcHRoKSAvIDI7XG4gICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgIC8vIEhpZ2hsaWdodCB6b25lcyBkaWZmZXJlbnRseSBiYXNlZCBvbiB0ZWxlbWV0cnkgbG9ja3NcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzT3V0c2lkZUJhbmQgPSBiaW4uY291bnQgPT09IDAgJiYgYmFuZHBhc3NGaWx0ZXI7XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Jpbi5pZH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ3JvdXAgY3Vyc29yLXBvaW50ZXIgaC1mdWxsIGp1c3RpZnktZW5kIHJlbGF0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEhvdmVyZWRCaW4oaSl9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXRIb3ZlcmVkQmluKG51bGwpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEV4cGFuZGVkQmluSW5kZXgoaSl9XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJLbGlrbmlqIHPFgnVwZWssIGFieSBvdHdvcnp5xIcgc3pjemVnw7PFgm93xIUgZGlhZ25vc3R5a8SZXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBQZXJzaXN0ZW5jZSBoZWF0bWFwIGJhcnMgb3ZlcmxheSAqL31cbiAgICAgICAgICAgICAgICAgICAgICB7ZW5hYmxlUGVyc2lzdGVuY2UgJiYgcGVyc2lzdGVuY2VIaXN0b3J5Lm1hcCgoaGlzdEZyYW1lLCBmcmFtZUlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGlzdEJpbiA9IGhpc3RGcmFtZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGlzdEJpbiB8fCBoaXN0QmluLmNvdW50ID09PSAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhpc3RCYXJIZWlnaHRQY3QgPSAoaGlzdEJpbi5jb3VudCAvIG1heENvdW50KSAqIDEwMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2BwZXJzaXN0LSR7ZnJhbWVJZHh9LSR7YmluLmlkfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTAgdy1mdWxsIHJvdW5kZWQtdCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBgJHtNYXRoLm1heCgzLCBoaXN0QmFySGVpZ2h0UGN0KX0lYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuMDIgKyAoZnJhbWVJZHggLyBwZXJzaXN0ZW5jZUhpc3RvcnkubGVuZ3RoKSAqIDAuMDYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBnZXRMdW1hQ29sb3IoaGlzdEJpbi5sdW1hLCBmYWxzZSwgY29sb3JTZW5zaXRpdml0eSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgfSl9XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogSG92ZXItYmFzZWQgdG9vbHRpcCBmb3IgZWFjaCBzZWdtZW50IGRldGFpbGluZyBpbnRlbnNpdHkgcmFuZ2UgJiBzYW1wbGUgZnJlcXVlbmN5IGNvdW50ICovfVxuICAgICAgICAgICAgICAgICAgICAgIHtpc0hvdmVyZWQgJiYgYmluLmNvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSBib3R0b20tZnVsbCBtYi0yIGJnLXNsYXRlLTkwMC85NSBib3JkZXIgYm9yZGVyLXNreS01MDAvODAgdGV4dC1zbGF0ZS0yMDAgdGV4dC1bOHB4XSBmb250LW1vbm8gcC0yIHJvdW5kZWQtbGcgc2hhZG93LVswXzhweF8yMHB4X3JnYmEoMCwwLDAsMC44KV0gei00MCBmbGV4IGZsZXgtY29sIGdhcC0xIG1pbi13LVsxMzBweF0gcG9pbnRlci1ldmVudHMtbm9uZSBhbmltYXRlLWZhZGUtaW4gYmFja2Ryb3AtYmx1ci1tZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkgPD0gMiA/ICdsZWZ0LTAnIDogaSA+PSBhY3RpdmVCaW5EYXRhLmxlbmd0aCAtIDMgPyAncmlnaHQtMCcgOiAnbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlkPXtgYmluX3Rvb2x0aXBfJHtiaW4uaWR9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0xIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNy41cHhdIHRleHQtc2t5LTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTRUdNRU5UOiB7YmluLm1pbkRlcHRofS17YmluLm1heERlcHRofSBjbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVs2LjVweF0gcHgtMSBweS0wLjIgcm91bmRlZCBmb250LWJvbGQgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbi5xdWFsaXR5ID09PSAnRVhDRUxMRU5UJyA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtNDAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04NTAnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbi5xdWFsaXR5ID09PSAnU1RBQkxFJyA/ICdiZy1za3ktOTUwIHRleHQtc2t5LTQwMCBib3JkZXIgYm9yZGVyLXNreS04NTAnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci00MDAgYm9yZGVyIGJvcmRlci1hbWJlci04NTAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2Jpbi5xdWFsaXR5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0wLjUgdGV4dC1bN3B4XSBsZWFkaW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+TGljemJhIHByw7NiZWs6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPntiaW4uY291bnQudG9Mb2NhbGVTdHJpbmcoKX0gcGt0PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+Q3rEmXN0b8WbxIcgKFVkemlhxYIpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1za3ktMzAwIGZvbnQtYm9sZFwiPntiaW4ucGVyY2VudGFnZS50b0ZpeGVkKDIpfSU8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LXNsYXRlLTMwMCBwdC0wLjUgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5JbnRlbnN5d25vxZvEhyAoTHVtYSk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGRcIj57YmluLmx1bWF9IC8gMjU1PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+WmFrcmVzIHBhc21hOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGZvbnQtbW9ub1wiPlt7TWF0aC5tYXgoMCwgYmluLmx1bWEgLSA2KX0gLSB7TWF0aC5taW4oMjU1LCBiaW4ubHVtYSArIDYpfSBZXTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIE1pbmkgdmlzdWFsIGludGVuc2l0eSBnYXVnZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIGgtMS41IHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW4gbXQtMC41IGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiBgJHsoYmluLmx1bWEgLyAyNTUpICogMTAwfSVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBnZXRMdW1hQ29sb3IoYmluLmx1bWEsIHRydWUsIGNvbG9yU2Vuc2l0aXZpdHkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBWaXN1YWwgR2xvdyBiZWhpbmQgaG92ZXJlZCBiYXIgKi99XG4gICAgICAgICAgICAgICAgICAgICAge2lzSG92ZXJlZCAmJiBiaW4uY291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTYgdy04IGgtMjQgYmctc2t5LTUwMC8xMCBibHVyLXhsIHBvaW50ZXItZXZlbnRzLW5vbmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIFRoZSBhY3R1YWwgaW50ZXJhY3RpdmUgYmFyICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCByb3VuZGVkLXQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMjAwICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzSG92ZXJlZCA/ICdzY2FsZS14LVsxLjFdIHNjYWxlLXktWzEuMDNdIHNoYWRvdy1bMF8wXzEycHhfcmdiYSg1NiwxODksMjQ4LDAuNDUpXScgOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke01hdGgubWF4KDMsIGJhckhlaWdodFBjdCl9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IGlzT3V0c2lkZUJhbmQgPyAwLjE1IDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogZ2V0THVtYUNvbG9yKGJpbi5sdW1hLCBpc0hvdmVyZWQsIGNvbG9yU2Vuc2l0aXZpdHkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBYLUF4aXMgbGFiZWxzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB3LWZ1bGwgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMCBwdC0xLjUgcHgtMC41IGZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuPjIwIGNtPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj4yNCBjbTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+MjggY208L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LWJvbGRcIj4zMiBjbSAoSWRlYWwpPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj4zNiBjbTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+NDAgY20gKExvY2sgbGltaXQpPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj40NCBjbTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+NDggY208L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEludGVyYWN0aXZlIENvbG9yIEdyYWRpZW50IExlZ2VuZCBhbG9uZyB0aGUgYm90dG9tIG9mIHRoZSBoaXN0b2dyYW0gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgcHQtMi41IGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAvODAgdy1mdWxsXCIgaWQ9XCJsaWRhcl9oaXN0b2dyYW1fYm90dG9tX2dyYWRpZW50X2xlZ2VuZFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCBtYi0xLjUgcHgtMC41XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tYmx1ZS01MDAgdmlhLXRlYWwtNDAwIHRvLXJvc2UtNTAwIGFuaW1hdGUtcHVsc2Ugc2hhZG93LVswXzBfNnB4X3JnYmEoNTYsMTg5LDI0OCwwLjUpXVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS0zMDAgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRleHQtWzhweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgTEVHRU5EQSBHUkFESUVOVFUgQkFSV05FR08gTFVNQSAoMC0yNTUpXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs3LjVweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICB7aG92ZXJlZExlZ2VuZEx1bWEgIT09IG51bGwgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBJTlNQRUtDSkE6IFkgPSB7aG92ZXJlZExlZ2VuZEx1bWF9ICh7KChob3ZlcmVkTGVnZW5kTHVtYSAvIDI1NSkgKiAxMDApLnRvRml4ZWQoMCl9JSlcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICDFmlJFRE5JQSBBS1RZV05BOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMFwiPntNYXRoLnJvdW5kKGFjdGl2ZUZpbHRlcmVkTHVtYSAqIGNvbG9yU2Vuc2l0aXZpdHkpfTwvc3Ryb25nPiB8IENaVcWBT8WaxIY6IMOXe2NvbG9yU2Vuc2l0aXZpdHkudG9GaXhlZCgxKX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEdyYWRpZW50IFRyYWNrIHdpdGggSW50ZXJhY3RpdmUgc2NydWIvaG92ZXIgKi99XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICByZWY9e2dyYWRpZW50QmFyUmVmfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtNCB3LWZ1bGwgcm91bmRlZC1tZCBjdXJzb3ItY3Jvc3NoYWlyIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIG92ZXJmbG93LXZpc2libGUgZ3JvdXAgc2VsZWN0LW5vbmUgdHJhbnNpdGlvbi1hbGwgc2hhZG93LWlubmVyXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCh0byByaWdodCwgIzFlNDBhZiAwJSwgIzAyODRjNyAzNS4zJSwgIzBmNzY2ZSA0NSUsICM4NGNjMTYgNjYuNyUsICNkOTc3MDYgODAlLCAjZTExZDQ4IDEwMCUpJyxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uTW91c2VNb3ZlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKCFncmFkaWVudEJhclJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gZ3JhZGllbnRCYXJSZWYuY3VycmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBNYXRoLm1heCgwLCBNYXRoLm1pbihlLmNsaWVudFggLSByZWN0LmxlZnQsIHJlY3Qud2lkdGgpKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBjdCA9ICh4IC8gcmVjdC53aWR0aCkgKiAxMDA7XG4gICAgICAgICAgICAgICAgICBjb25zdCBsdW1hVmFsID0gTWF0aC5yb3VuZCgoeCAvIHJlY3Qud2lkdGgpICogMjU1KTtcbiAgICAgICAgICAgICAgICAgIHNldEhvdmVyZWRMZWdlbmRQY3QocGN0KTtcbiAgICAgICAgICAgICAgICAgIHNldEhvdmVyZWRMZWdlbmRMdW1hKGx1bWFWYWwpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBzZXRIb3ZlcmVkTGVnZW5kTHVtYShudWxsKTtcbiAgICAgICAgICAgICAgICAgIHNldEhvdmVyZWRMZWdlbmRQY3QobnVsbCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsvKiBSZWFsLXRpbWUgYWN0aXZlIGF2ZXJhZ2UgTHVtYSBpbmRpY2F0b3IgcGluICovfVxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtYm90dG9tLTEgdy0xIGJnLXdoaXRlIHJvdW5kZWQtZnVsbCBzaGFkb3ctWzBfMF84cHhfcmdiYSgyNTUsMjU1LDI1NSwxKV0gcG9pbnRlci1ldmVudHMtbm9uZSB6LTEwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTE1MFwiXG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBgJHtNYXRoLm1pbigxMDAsIE1hdGgubWF4KDAsICgoYWN0aXZlRmlsdGVyZWRMdW1hICogY29sb3JTZW5zaXRpdml0eSkgLyAyNTUpICogMTAwKSl9JWAsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoLTUwJSknLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHRpdGxlPXtgQWt0dWFsbmEgxZtyZWRuaWEgTHVtYTogJHtNYXRoLnJvdW5kKGFjdGl2ZUZpbHRlcmVkTHVtYSAqIGNvbG9yU2Vuc2l0aXZpdHkpfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTMgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiB3LTAgaC0wIGJvcmRlci14LVszLjVweF0gYm9yZGVyLXgtdHJhbnNwYXJlbnQgYm9yZGVyLXQtWzRweF0gYm9yZGVyLXQtd2hpdGUgZHJvcC1zaGFkb3ctWzBfMF8ycHhfcmdiYSgwLDAsMCwwLjgpXVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogSG92ZXIgaW5kaWNhdG9yIGN1cnNvciBhbmQgZmxvYXRpbmcgaW5zcGVjdGlvbiB0b29sdGlwICovfVxuICAgICAgICAgICAgICAgIHtob3ZlcmVkTGVnZW5kTHVtYSAhPT0gbnVsbCAmJiBob3ZlcmVkTGVnZW5kUGN0ICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgYm90dG9tLTAgdy0wLjUgYmctYW1iZXItMzAwIHBvaW50ZXItZXZlbnRzLW5vbmUgei0yMCBzaGFkb3ctWzBfMF82cHhfI2ZjZDM0ZF1cIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IGAke2hvdmVyZWRMZWdlbmRQY3R9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgtNTAlKScsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLWZ1bGwgbWItMiBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIGJnLXNsYXRlLTkwMC85NSBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC85MCB0ZXh0LXNsYXRlLTIwMCB0ZXh0LVs4cHhdIGZvbnQtbW9ubyBwLTIgcm91bmRlZCBzaGFkb3ctMnhsIHotMzAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSB3aGl0ZXNwYWNlLW5vd3JhcCBwb2ludGVyLWV2ZW50cy1ub25lIGJhY2tkcm9wLWJsdXItbWQgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCByb3VuZGVkIGJvcmRlciBib3JkZXItd2hpdGUvNTAgc2hhZG93LVswXzBfNnB4X3JnYmEoMCwwLDAsMC42KV0gc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZDogZ2V0THVtYVJnYihob3ZlcmVkTGVnZW5kTHVtYSwgY29sb3JTZW5zaXRpdml0eSkgfX1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCB0ZXh0LVs3LjVweF0gbGVhZGluZy10aWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LWFtYmVyLTMwMFwiPkxVTUE6IHtob3ZlcmVkTGVnZW5kTHVtYX0gLyAyNTU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+KHsoKGhvdmVyZWRMZWdlbmRMdW1hIC8gMjU1KSAqIDEwMCkudG9GaXhlZCgxKX0lKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1zZW1pYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAoaG92ZXJlZExlZ2VuZEx1bWEgKiBjb2xvclNlbnNpdGl2aXR5KSA8IDkwID8gJ3RleHQtc2t5LTQwMCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAoaG92ZXJlZExlZ2VuZEx1bWEgKiBjb2xvclNlbnNpdGl2aXR5KSA8IDE3MCA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LXJvc2UtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBTVFJFRkE6IHsoaG92ZXJlZExlZ2VuZEx1bWEgKiBjb2xvclNlbnNpdGl2aXR5KSA8IDkwID8gJ0NPT0wgKE5pc2tpIG9kYmnDs3IpJyA6IChob3ZlcmVkTGVnZW5kTHVtYSAqIGNvbG9yU2Vuc2l0aXZpdHkpIDwgMTcwID8gJ09QVElNQUwgKElkZWFsbmEgYWJzb3JwY2phKScgOiAnV0FSTSAoV3lzb2tpZSBvZGJpY2llKSd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs2LjVweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFJHQjoge2dldEx1bWFSZ2IoaG92ZXJlZExlZ2VuZEx1bWEsIGNvbG9yU2Vuc2l0aXZpdHkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBUaWNrcyBhbmQgc2NhbGUgbGFiZWxzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHctZnVsbCBwdC0xLjUgZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDAgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDAgZm9udC1zZW1pYm9sZFwiPjAgKE1pbiAvIENvb2wpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjY0PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtdGVhbC00MDAgZm9udC1zZW1pYm9sZFwiPjkwIChPcHR5bWFsbnkgc3RhcnQpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPjEyODwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LXNlbWlib2xkXCI+MTcwIChDaWVwxYJ5IHN0YXJ0KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4yMTU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yb3NlLTQwMCBmb250LXNlbWlib2xkXCI+MjU1IChNYWtzIC8gV2FybSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBWaXN1YWwgTGVnZW5kIEFkamFjZW50IHRvIEhpc3RvZ3JhbSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTEgYmctc2xhdGUtOTUwLzY1IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAvNjAgcC0zIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LVs4LjVweF0gdGV4dC1zbGF0ZS00MDAgbWluLWgtWzE3NXB4XVwiIGlkPVwibGlkYXJfbHVtYV9sZWdlbmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBwYi0xLjUgbWItMS41IGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWFtYmVyLTUwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlNwZWt0cnVtIEx1bWE8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBnYXAtMi41IGl0ZW1zLXN0cmV0Y2ggaC1bMTA1cHhdIHJlbGF0aXZlIG10LTFcIj5cbiAgICAgICAgICAgICAgey8qIFZlcnRpY2FsIENvbG9yIFNjYWxlIEdyYWRpZW50IEJhciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTMgcm91bmRlZCBiZy1ncmFkaWVudC10by10IGZyb20tWyMxZTQwYWZdIHZpYS1bIzBmNzY2ZV0gdG8tWyNlMTFkNDhdIHJlbGF0aXZlIGJvcmRlciBib3JkZXItc2xhdGUtOTAwLzYwXCI+XG4gICAgICAgICAgICAgICAgey8qIExpdmUgTHVtYSBzbGlkZXIgY3Vyc29yIGluZGljYXRvciAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC1bLTRweF0gcmlnaHQtWy00cHhdIGgtMS41IGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtOTUwIHJvdW5kZWQgc2hhZG93LVswXzBfNXB4X3JnYmEoMjU1LDI1NSwyNTUsMC45KV0gei0xMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0xNTBcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tOiBgJHtNYXRoLm1pbigxMDAsIE1hdGgubWF4KDAsICgoYWN0aXZlRmlsdGVyZWRMdW1hICogY29sb3JTZW5zaXRpdml0eSkgLyAyNTUpICogMTAwKSl9JWAsXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e2BBa3R1YWxuYSB3eWfFgmFkem9uYSBMdW1hIChza2Fsb3dhbmEpOiAke01hdGgucm91bmQoYWN0aXZlRmlsdGVyZWRMdW1hICogY29sb3JTZW5zaXRpdml0eSl9YH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRGVzY3JpcHRpb25zICYgVGlja3MgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHRleHQtWzdweF0gdGV4dC1zbGF0ZS00MDAgbGVhZGluZy10aWdodFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctcm9zZS01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlXCI+V2FybSAoMTcwLTI1NSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzYuNXB4XSB0ZXh0LXNsYXRlLTUwMCBwbC0yLjVcIj5XeXNva2llIG9kYmljaWUgLyBibGlza288L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2VcIj5PcHRpbWFsICg5MC0xNzApPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs2LjVweF0gdGV4dC1zbGF0ZS01MDAgcGwtMi41XCI+T3B0eW1hbG5hIGFic29ycGNqYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLXNreS01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDAgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2VcIj5Db29sICgwLTkwKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNi41cHhdIHRleHQtc2xhdGUtNTAwIHBsLTIuNVwiPlPFgmFieSBzeWduYcWCIC8gZGFsZWtvPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogTGl2ZSBJbmRpY2F0b3IgVmFsdWUgQ2FyZCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzcuNXB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5TWUdOQcWBIChZKTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtYm9sZCBweC0xIHB5LTAuNSByb3VuZGVkIHRleHQtWzdweF0gYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgKGFjdGl2ZUZpbHRlcmVkTHVtYSAqIGNvbG9yU2Vuc2l0aXZpdHkpIDwgOTAgPyAnYmctc2t5LTk1MC84MCB0ZXh0LXNreS00MDAgYm9yZGVyLXNreS05MDAvNDAnIDpcbiAgICAgICAgICAgICAgICAoYWN0aXZlRmlsdGVyZWRMdW1hICogY29sb3JTZW5zaXRpdml0eSkgPCAxNzAgPyAnYmctZW1lcmFsZC05NTAvODAgdGV4dC1lbWVyYWxkLTQwMCBib3JkZXItZW1lcmFsZC05MDAvNDAnIDpcbiAgICAgICAgICAgICAgICAnYmctcm9zZS05NTAvODAgdGV4dC1yb3NlLTQwMCBib3JkZXItcm9zZS05MDAvNDAnXG4gICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChhY3RpdmVGaWx0ZXJlZEx1bWEgKiBjb2xvclNlbnNpdGl2aXR5KX0gKHsoYWN0aXZlRmlsdGVyZWRMdW1hICogY29sb3JTZW5zaXRpdml0eSkgPCA5MCA/ICdaSU1OWScgOiAoYWN0aXZlRmlsdGVyZWRMdW1hICogY29sb3JTZW5zaXRpdml0eSkgPCAxNzAgPyAnT1BUWU0nIDogJ0NJRVDFgVknfSlcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBJbnRlcmFjdGl2ZSBDb250cm9scyAmIFRlbGVtZXRyeSBTdGF0cyBmb290ZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTMgbXQtMyBwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBMZWZ0IENvbHVtbjogTWV0cmljIFN0YXRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEgZm9udC1tb25vIHRleHQtWzlweF1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05NTAvNTAgcHgtMiBweS0xIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+Q2VudHJ1bSByb3prxYJhZHUgKFBlYWspOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgeygoYWN0aXZlTWV0cmljcy5kaXN0YW5jZSB8fCAwLjM1KSAqIDEwMCkudG9GaXhlZCgxKX0gY21cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05NTAvNTAgcHgtMiBweS0xIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+U3RhbmRhcmRvd2EgZGV3aWFjamEgKM+DKTo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAge3NjYW5UeXBlID09PSAnb3BvbmthX2JyenVjaCcgPyAnNS4yIGNtJyA6ICczLjggY20nfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIGJnLXNsYXRlLTk1MC81MCBweC0yIHB5LTEgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5TdGFiaWxub8WbxIcgxZt3aWF0xYJhICjPg19MdW1hKTo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xICR7XG4gICAgICAgICAgICAgIGFjdGl2ZUx1bWFTdGREZXYgPCAyLjAgXG4gICAgICAgICAgICAgICAgPyAndGV4dC1lbWVyYWxkLTQwMCcgXG4gICAgICAgICAgICAgICAgOiBhY3RpdmVMdW1hU3RkRGV2IDwgc3RhYmlsaXR5VGhyZXNob2xkIFxuICAgICAgICAgICAgICAgICAgPyAndGV4dC1hbWJlci00MDAgYW5pbWF0ZS1wdWxzZScgXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXJlZC00MDAgYW5pbWF0ZS1wdWxzZSBmb250LWJvbGQnXG4gICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgIHthY3RpdmVMdW1hU3RkRGV2LnRvRml4ZWQoMil9XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDBcIj4oe1xuICAgICAgICAgICAgICAgIGFjdGl2ZUx1bWFTdGREZXYgPCAyLjAgPyAnSURFQUxOQScgOlxuICAgICAgICAgICAgICAgIGFjdGl2ZUx1bWFTdGREZXYgPCBzdGFiaWxpdHlUaHJlc2hvbGQgPyAnVU1JQVJLT1dBTkEnIDogJ05JRVNUQUJJTE5BIOKaoO+4jydcbiAgICAgICAgICAgICAgfSk8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctc2xhdGUtOTUwLzUwIHB4LTIgcHktMSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPlByw7NnIHN0YWJpbG5vxZtjaSAoz4MpOjwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjAuNVwiXG4gICAgICAgICAgICAgICAgbWF4PVwiOC4wXCJcbiAgICAgICAgICAgICAgICBzdGVwPVwiMC4xXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17c3RhYmlsaXR5VGhyZXNob2xkfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U3RhYmlsaXR5VGhyZXNob2xkKHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTE2IGgtMSBiZy1zbGF0ZS04MDAgcm91bmRlZC1sZyBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXIgYWNjZW50LWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJQcnplc3XFhCwgYWJ5IHptaWVuacSHIHByw7NnIHN0YWJpbG5vxZtjaSBMdW1hXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgbWluPVwiMC4xXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIxMC4wXCJcbiAgICAgICAgICAgICAgICBzdGVwPVwiMC4xXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17c3RhYmlsaXR5VGhyZXNob2xkfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIWlzTmFOKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0U3RhYmlsaXR5VGhyZXNob2xkKHZhbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTEyIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGQgZm9udC1tb25vIHRleHQtWzlweF0gcHgtMSBweS0wLjUgcm91bmRlZCB0ZXh0LWNlbnRlciBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJXcGlzeiBudW1lcnljem55IHByw7NnIHN0YWJpbG5vxZtjaSBMdW1hXCJcbiAgICAgICAgICAgICAgICBpZD1cImxpZGFyX3N0YWJpbGl0eV90aHJlc2hvbGRfbnVtZXJpY1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05NTAvNTAgcHgtMiBweS0xIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+Q3p1xYJvxZvEhyBMdW1hIChtKTo8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICBtaW49XCIwLjVcIlxuICAgICAgICAgICAgICAgIG1heD1cIjIuMFwiXG4gICAgICAgICAgICAgICAgc3RlcD1cIjAuMVwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2NvbG9yU2Vuc2l0aXZpdHl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDb2xvclNlbnNpdGl2aXR5KHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTE2IGgtMSBiZy1zbGF0ZS04MDAgcm91bmRlZC1sZyBhcHBlYXJhbmNlLW5vbmUgY3Vyc29yLXBvaW50ZXIgYWNjZW50LXNreS01MDBcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiRG9zdG9zdWogY3p1xYJvxZvEhyBtYXBvd2FuaWEgc3Bla3RydW0ga29sb3LDs3cgTHVtYVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LWJvbGQgbWluLXctWzIwcHhdIHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICB7Y29sb3JTZW5zaXRpdml0eS50b0ZpeGVkKDEpfXhcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctc2xhdGUtOTUwLzUwIHB4LTIgcHktMSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPlN5Z25hxYIgTHVtYSAoV3lnxYJhZHpvbnkpOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNDAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICB7YWN0aXZlRmlsdGVyZWRMdW1hfVxuICAgICAgICAgICAgICB7ZW5hYmxlTHVtYUZpbHRlciAmJiAoXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTUwMFwiPijFmnIuIHJ1Y2hvbWEpPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBUb2dnbGVhYmxlIEZpbHRlcnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTIganVzdGlmeS1lbmQgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFJlc2V0IEJhc2VsaW5lIGJ1dHRvbiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSZXNldEJhc2VsaW5lfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHB4LTIgcHktMSByb3VuZGVkIHRyYW5zaXRpb24tYWxsIGJvcmRlciBiZy1yZWQtOTUwLzMwIGJvcmRlci1yZWQtOTAwLzYwIHRleHQtcmVkLTQwMCBob3Zlcjp0ZXh0LXJlZC0zMDAgaG92ZXI6Ym9yZGVyLXJlZC01MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9XCJSZXNldHVqIDMwLWtsYXRrb3fEhSBoaXN0b3JpxJkgTHVtYSBpIMWbcmVkbmnEhSBydWNob23EhSAod3ltdcWbIHJlLXN5bmMgYmF6eSlcIlxuICAgICAgICAgICAgaWQ9XCJsaWRhcl9oaXN0b2dyYW1fZm9vdGVyX3Jlc2V0X2J0blwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFJlZnJlc2hDY3cgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UkUtU1lOQyBCQVpZPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBGcmVlemUgdmlldyBidXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlRnJlZXplfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHB4LTIgcHktMSByb3VuZGVkIHRyYW5zaXRpb24tYWxsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBpc0Zyb3plblxuICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwLzYwIGJvcmRlci1jeWFuLTUwMCB0ZXh0LWN5YW4tNDAwIHNoYWRvdy1bMF8wXzVweF9yZ2JhKDYsMTgyLDIxMiwwLjMpXSBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC80MCBib3JkZXItc2xhdGUtOTAwIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNDAwIGhvdmVyOmJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPVwiWmFtcm/FuiBha3R1YWxuxIUgZHlzdHJ5YnVjasSZIExpREFSIGRvIHduaWtsaXdlaiBkaWFnbm96eVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzRnJvemVuID8gPFBsYXkgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjVcIiAvPiA6IDxQYXVzZSBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+fVxuICAgICAgICAgICAgPHNwYW4+e2lzRnJvemVuID8gJ1daTsOTVycgOiAnWkFNUk/FuSBXSURPSyd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIERvd25sb2FkIENTViBidXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRDU1Z9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgcHgtMiBweS0xIHJvdW5kZWQgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJnLXNsYXRlLTkwMC80MCBib3JkZXItc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwIGhvdmVyOmJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IDMwLWtsYXRrb3fEhSBoaXN0b3JpxJkgTHVtYSBkbyBkaWFnbm9zdHlraSBDU1ZcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5QT0JJRVJaIENTVjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBTbmFwc2hvdCBidXR0b24gKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRQTkd9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgcHgtMiBweS0xIHJvdW5kZWQgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJnLXNsYXRlLTkwMC80MCBib3JkZXItc2xhdGUtOTAwIHRleHQtc2t5LTQwMCBob3Zlcjp0ZXh0LXNreS0yMDAgaG92ZXI6Ym9yZGVyLXNreS04MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9XCJXeWtvbmFqIHpyenV0IGVrcmFudSBQTkcgaGlzdG9ncmFtdSB6IG1ldGFkYW55bWlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxDYW1lcmEgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+U05BUFNIT1QgUE5HPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBTdGFiaWxpdHkgVHJlbmQgTGluZSB0b2dnbGUgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1N0YWJpbGl0eVRyZW5kKCFzaG93U3RhYmlsaXR5VHJlbmQpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHB4LTIgcHktMSByb3VuZGVkIHRyYW5zaXRpb24tYWxsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBzaG93U3RhYmlsaXR5VHJlbmRcbiAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAvNjAgYm9yZGVyLWFtYmVyLTgwMCB0ZXh0LWFtYmVyLTQwMCBzaGFkb3ctWzBfMF81cHhfcmdiYSgyNDUsMTU4LDExLDAuMTUpXSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNDAgYm9yZGVyLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgdGl0bGU9XCJXxYLEhWN6L3d5xYLEhWN6IG5ha8WCYWRrxJkgbGluaWkgdHJlbmR1IGRld2lhY2ppIEx1bWFcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPlRSRU5EIExVTUEgz4M8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogTHVtYSBNb3ZpbmcgQXZlcmFnZSBGaWx0ZXIgdG9nZ2xlICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEVuYWJsZUx1bWFGaWx0ZXIoIWVuYWJsZUx1bWFGaWx0ZXIpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHB4LTIgcHktMSByb3VuZGVkIHRyYW5zaXRpb24tYWxsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBlbmFibGVMdW1hRmlsdGVyXG4gICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwLzYwIGJvcmRlci1hbWJlci04MDAgdGV4dC1hbWJlci00MDAgc2hhZG93LVswXzBfNXB4X3JnYmEoMjQ1LDE1OCwxMSwwLjE1KV0nXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzQwIGJvcmRlci1zbGF0ZS05MDAgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPVwiV8WCxIVjei93ecWCxIVjeiBmaWx0ciDFm3JlZG5pZWogcnVjaG9tZWogZGxhIEx1bWEgKHJlZHVrY2phIHN6dW3Ds3cpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj5GSUxUUiBMVU1BIHtlbmFibGVMdW1hRmlsdGVyID8gJ1fFgS4nIDogJ1dZxYEuJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogUGVyc2lzdGVuY2UgSGVhdG1hcCB0b2dnbGUgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RW5hYmxlUGVyc2lzdGVuY2UoIWVuYWJsZVBlcnNpc3RlbmNlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZvbnQtbW9ubyB0ZXh0LVs4cHhdIGZvbnQtYm9sZCBweC0yIHB5LTEgcm91bmRlZCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgZW5hYmxlUGVyc2lzdGVuY2VcbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC82MCBib3JkZXItZW1lcmFsZC04MDAgdGV4dC1lbWVyYWxkLTQwMCBzaGFkb3ctWzBfMF81cHhfcmdiYSgxNiwxODUsMTI5LDAuMTUpXSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNDAgYm9yZGVyLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgdGl0bGU9XCJaZXp3w7NsIGhpc3RvZ3JhbW93aSBuYSBha3VtdWxhY2rEmSBzeWduYcWCdSBMdW1hIHcgdGxlIGpha28gaGVhdG1hcMSZXCJcbiAgICAgICAgICAgIGlkPVwibGlkYXJfdG9nZ2xlX3BlcnNpc3RlbmNlX2J0blwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4+UEVSU0lTVEVOQ0Uge2VuYWJsZVBlcnNpc3RlbmNlID8gJ1fFgS4nIDogJ1dZxYEuJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIEdyaWQgbGluZXMgdG9nZ2xlICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dHcmlkTGluZXMoIXNob3dHcmlkTGluZXMpfVxuICAgICAgICAgICAgaWQ9XCJsaWRhcl90b2dnbGVfZ3JpZF9idG5cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHB4LTIgcHktMSByb3VuZGVkIHRyYW5zaXRpb24tYWxsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBzaG93R3JpZExpbmVzXG4gICAgICAgICAgICAgICAgPyAnYmctc2t5LTk1MC82MCBib3JkZXItc2t5LTgwMCB0ZXh0LXNreS00MDAgc2hhZG93LVswXzBfNXB4X3JnYmEoMTQsMTY1LDIzMywwLjE1KV0nXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzQwIGJvcmRlci1zbGF0ZS05MDAgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPVwiV8WCxIVjei93ecWCxIVjeiBsaW5pZSBzaWF0a2kgdyB0bGUgdyBjZWx1IHptbmllanN6ZW5pYSBzenVtdSB3aXp1YWxuZWdvXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj5UT0dHTEUgR1JJRDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBOb2lzZSBkZWNheSBmaWx0ZXIgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2ltdWxhdGVOb2lzZURlY2F5KCFzaW11bGF0ZU5vaXNlRGVjYXkpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHB4LTIgcHktMSByb3VuZGVkIHRyYW5zaXRpb24tYWxsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBzaW11bGF0ZU5vaXNlRGVjYXlcbiAgICAgICAgICAgICAgICA/ICdiZy1za3ktOTUwLzYwIGJvcmRlci1za3ktODAwIHRleHQtc2t5LTQwMCBzaGFkb3ctWzBfMF81cHhfcmdiYSgxNCwxNjUsMjMzLDAuMTUpXSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNDAgYm9yZGVyLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgdGl0bGU9XCJEb2RhaiB6YWvFgsOzY2VuaWEgc3lnbmHFgnUgaSBzenVtIGt3YW50eXphY2ppIG5hIHdpxJlrc3p5Y2ggZ8WCxJlib2tvxZtjaWFjaFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4+U1pVTSBMaURBUjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBCYW5kcGFzcyBmaWx0ZXIgdG9nZ2xlICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEJhbmRwYXNzRmlsdGVyKCFiYW5kcGFzc0ZpbHRlcil9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgcHgtMiBweS0xIHJvdW5kZWQgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGJhbmRwYXNzRmlsdGVyXG4gICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvNjAgYm9yZGVyLWVtZXJhbGQtODAwIHRleHQtZW1lcmFsZC00MDAgc2hhZG93LVswXzBfNXB4X3JnYmEoMTYsMTg1LDEyOSwwLjE1KV0nXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzQwIGJvcmRlci1zbGF0ZS05MDAgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPVwiT2RmaWx0cnVqIG9kYmljaWEgc3BvemEgc3RyZWZ5IGtvaGVyZW5jamkgKDI0Y20gLSA0MGNtKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZpbHRlciBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5QQVNNT1dZPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUZW1wb3JhcnkgTW9kYWwgb3ZlcmxheSBzaG93aW5nIHJhdyBMdW1hIHNhbXBsZSBjb3VudCAmIHBlcmNlbnRhZ2UgZGlzdHJpYnV0aW9uICovfVxuICAgICAge2V4cGFuZGVkQmluSW5kZXggIT09IG51bGwgJiYgYWN0aXZlQmluRGF0YVtleHBhbmRlZEJpbkluZGV4XSAmJiAoXG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1zbGF0ZS05NTAvOTAgYmFja2Ryb3AtYmx1ci1tZCB6LTQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBhbmltYXRlLWZhZGUtaW4gYm9yZGVyIGJvcmRlci1za3ktNTAwLzMwIHJvdW5kZWQteGxcIiBcbiAgICAgICAgICBpZD1cImJpbl9kZWVwX2RpdmVfbW9kYWxcIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwLTQgdy1mdWxsIG1heC13LXNtIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHJlbGF0aXZlIHNoYWRvdy0yeGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMiBtYi0zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBESUFHTk9TVFlLQSBLT8WDQ8OTV0tJOiBCSU4gW3thY3RpdmVCaW5EYXRhW2V4cGFuZGVkQmluSW5kZXhdLmxhYmVsfV1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgc2V0RXhwYW5kZWRCaW5JbmRleChudWxsKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwIHRleHQteHMgZm9udC1ib2xkIGN1cnNvci1wb2ludGVyIGhvdmVyOmJnLXNsYXRlLTgwMCBweC0xLjUgcHktMC41IHJvdW5kZWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAg4pyVXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgYmctc2xhdGUtOTUwLzQwIHAtMiByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTUwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrIHRleHQtWzcuNXB4XSB1cHBlcmNhc2VcIj5aYWtyZXMgR8WCxJlib2tvxZtjaTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIHRleHQtWzEwcHhdXCI+e2FjdGl2ZUJpbkRhdGFbZXhwYW5kZWRCaW5JbmRleF0ubWluRGVwdGh9IC0ge2FjdGl2ZUJpbkRhdGFbZXhwYW5kZWRCaW5JbmRleF0ubWF4RGVwdGh9IGNtPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrIHRleHQtWzcuNXB4XSB1cHBlcmNhc2VcIj5XacSFemtpIChDb3VudCk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIHRleHQtWzEwcHhdXCI+e2FjdGl2ZUJpbkRhdGFbZXhwYW5kZWRCaW5JbmRleF0uY291bnQudG9Mb2NhbGVTdHJpbmcoKX0gcGt0PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBiZy1zbGF0ZS05NTAvNDAgcC0yIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05NTBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgYmxvY2sgdGV4dC1bNy41cHhdIHVwcGVyY2FzZVwiPldhcnRvxZvEhyBMdW1hOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDAgdGV4dC1bMTBweF1cIj57YWN0aXZlQmluRGF0YVtleHBhbmRlZEJpbkluZGV4XS5sdW1hfSAvIDI1NTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBibG9jayB0ZXh0LVs3LjVweF0gdXBwZXJjYXNlXCI+VWR6aWHFgiBQcm9jZW50b3d5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1za3ktNDAwIHRleHQtWzEwcHhdXCI+e2FjdGl2ZUJpbkRhdGFbZXhwYW5kZWRCaW5JbmRleF0ucGVyY2VudGFnZS50b0ZpeGVkKDIpfSU8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvNDAgcC0yIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05NTAgZmxleCBmbGV4LWNvbCBnYXAtMVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzcuNXB4XSB1cHBlcmNhc2VcIj5TdGF0dXMgTG9jayAoWm9uZSBJbnRlZ3JpdHkpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzhweF0gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUJpbkRhdGFbZXhwYW5kZWRCaW5JbmRleF0ucXVhbGl0eSA9PT0gJ0VYQ0VMTEVOVCcgXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTQwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwJyBcbiAgICAgICAgICAgICAgICAgICAgICA6IGFjdGl2ZUJpbkRhdGFbZXhwYW5kZWRCaW5JbmRleF0ucXVhbGl0eSA9PT0gJ1NUQUJMRSdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS05NTAgdGV4dC1za3ktNDAwIGJvcmRlciBib3JkZXItc2t5LTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYWN0aXZlQmluRGF0YVtleHBhbmRlZEJpbkluZGV4XS5xdWFsaXR5ID09PSAnRklMVEVSRUQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTUwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBsaW5lLXRocm91Z2gnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXJlZC05NTAgdGV4dC1yZWQtNDAwIGJvcmRlciBib3JkZXItcmVkLTgwMCdcbiAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAge2FjdGl2ZUJpbkRhdGFbZXhwYW5kZWRCaW5JbmRleF0ucXVhbGl0eX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzcuNXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICB7YWN0aXZlQmluRGF0YVtleHBhbmRlZEJpbkluZGV4XS5xdWFsaXR5ID09PSAnRVhDRUxMRU5UJyA/ICdTdHJlZmEgaWRlYWxuZWoga29oZXJlbmNqaSBvcHR5Y3puZWouJyA6XG4gICAgICAgICAgICAgICAgICAgICBhY3RpdmVCaW5EYXRhW2V4cGFuZGVkQmluSW5kZXhdLnF1YWxpdHkgPT09ICdTVEFCTEUnID8gJ0RvcHVzemN6YWxuYSBzdHJlZmEgZGV0ZWtjamkgc3lnbmHFgnUuJyA6XG4gICAgICAgICAgICAgICAgICAgICBhY3RpdmVCaW5EYXRhW2V4cGFuZGVkQmluSW5kZXhdLnF1YWxpdHkgPT09ICdGSUxURVJFRCcgPyAnU3lnbmHFgiBzdMWCdW1pb255IGZpbHRyZW0gcGFzbW93eW0uJyA6ICdXeXNva2kgc3p1bSBrd2FudHl6YWNqaSBMaURBUi4nfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogTHVtYSBCYXIgdmlzdWFsaXphdGlvbiBpbnNpZGUgTW9kYWwgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwLzQwIHAtMiByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTUwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgdGV4dC1zbGF0ZS01MDAgdGV4dC1bN3B4XSBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5QUk9DRU5UIFJPWkvFgUFEVSBMVU1BPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDBcIj57KChhY3RpdmVCaW5EYXRhW2V4cGFuZGVkQmluSW5kZXhdLmx1bWEgLyAyNTUpICogMTAwKS50b0ZpeGVkKDApfSU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0yIGJnLXNsYXRlLTk1MCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWJsdWUtNTAwIHZpYS10ZWFsLTUwMCB0by1hbWJlci01MDAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAkeyhhY3RpdmVCaW5EYXRhW2V4cGFuZGVkQmluSW5kZXhdLmx1bWEgLyAyNTUpICogMTAwfSVgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgZ2FwLTIgbXQtMiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzZXRFeHBhbmRlZEJpbkluZGV4KG51bGwpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQgZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBaQU1LTklKIERJQUdOT1NUWUvEmFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAg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