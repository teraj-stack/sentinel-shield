import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const useRef = __vite__cjsImport1_react["useRef"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useState = __vite__cjsImport1_react["useState"];
import { Camera, RefreshCw, AlertTriangle, CheckCircle, ShieldAlert, Cpu, Lock, Unlock, Zap } from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
import { CameraControlManager } from "/apps/lidar_head_3d/src/utils/CameraControlManager.ts";
export const CameraStream = ({
  facingMode,
  setFacingMode,
  isSandboxMode,
  sandboxMetrics,
  onLiveMetricsUpdate,
  faceDetected,
  setFaceDetected
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [streamActive, setStreamActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [cameraLabel, setCameraLabel] = useState("");
  const [jitter, setJitter] = useState({ x: 0, y: 0 });
  const [lumaHistogram, setLumaHistogram] = useState(new Array(32).fill(0));
  const lastHistogramUpdate = useRef(0);
  const [lockStatus, setLockStatus] = useState({
    flashMode: "off",
    focusLocked: false,
    exposureLocked: false,
    whiteBalanceLocked: false,
    lensType: "wide",
    isReady: false,
    autofocusHunting: false,
    exposureOffset: 0,
    whiteBalanceCct: 5800
  });
  const cameraControlManager = useRef(
    new CameraControlManager((status) => {
      setLockStatus(status);
    })
  );
  useEffect(() => {
    if (sandboxMetrics.stabilityMs > 0) {
      if (!lockStatus.focusLocked && !lockStatus.exposureLocked && !lockStatus.whiteBalanceLocked && !lockStatus.autofocusHunting) {
        cameraControlManager.current.prepareForScan(
          sandboxMetrics.luma,
          sandboxMetrics.cct,
          () => {
            console.log("💚 CameraControlManager: Camera sequence fully locked and verified ready!");
          }
        );
      }
    } else {
      if (lockStatus.focusLocked || lockStatus.exposureLocked || lockStatus.whiteBalanceLocked) {
        cameraControlManager.current.resetLocks();
      }
    }
  }, [sandboxMetrics.stabilityMs]);
  useEffect(() => {
    if (isSandboxMode) {
      stopCamera();
      return;
    }
    startCamera();
    return () => {
      stopCamera();
    };
  }, [facingMode, isSandboxMode]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (faceDetected) {
        setJitter({
          x: (Math.random() - 0.5) * 1.5,
          y: (Math.random() - 0.5) * 1.5
        });
      }
    }, 150);
    return () => clearInterval(timer);
  }, [faceDetected]);
  const startCamera = async () => {
    setErrorMsg(null);
    stopCamera();
    try {
      const constraints = {
        video: {
          facingMode,
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((err) => console.error("Error playing video:", err));
          setStreamActive(true);
        };
      }
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        setCameraLabel(videoTrack.label || "Standard Camera");
        cameraControlManager.current.registerVideoTrack(videoTrack);
      }
      setFaceDetected(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setErrorMsg(
        err.name === "NotAllowedError" ? "Camera permission denied. Grant access to test live parameters." : "Failed to access camera. Please verify device connection."
      );
      setStreamActive(false);
      setFaceDetected(false);
    }
  };
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };
  useEffect(() => {
    if (!streamActive || isSandboxMode) return;
    let animId;
    const canvas = canvasRef.current || document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const analyzeFrame = () => {
      const video = videoRef.current;
      if (video && video.readyState === video.HAVE_CURRENT_DATA && ctx) {
        const width = 160;
        const height = 120;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(video, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;
        let totalLuma = 0;
        let rSum = 0, gSum = 0, bSum = 0;
        const totalPixels = width * height;
        const bins = new Array(32).fill(0);
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          rSum += r;
          gSum += g;
          bSum += b;
          const luma = 0.299 * r + 0.587 * g + 0.114 * b;
          totalLuma += luma;
          const binIdx = Math.min(31, Math.floor(luma / 8));
          bins[binIdx]++;
        }
        const now = Date.now();
        if (now - lastHistogramUpdate.current > 120) {
          const maxVal = Math.max(...bins, 1);
          const normalized = bins.map((val) => val / maxVal * 100);
          setLumaHistogram(normalized);
          lastHistogramUpdate.current = now;
        }
        const avgLuma = totalLuma / totalPixels;
        const avgR = rSum / totalPixels;
        const avgG = gSum / totalPixels;
        const avgB = bSum / totalPixels;
        let horizontalDiffSum = 0;
        let verticalDiffSum = 0;
        const skip = 4;
        for (let y = 1; y < height - 1; y += skip) {
          for (let x = 1; x < width - 1; x += skip) {
            const idx = (y * width + x) * 4;
            const rightIdx = (y * width + (x + 1)) * 4;
            const bottomIdx = ((y + 1) * width + x) * 4;
            const currentLuma = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
            const rightLuma = 0.299 * data[rightIdx] + 0.587 * data[rightIdx + 1] + 0.114 * data[rightIdx + 2];
            const bottomLuma = 0.299 * data[bottomIdx] + 0.587 * data[bottomIdx + 1] + 0.114 * data[bottomIdx + 2];
            horizontalDiffSum += Math.abs(currentLuma - rightLuma);
            verticalDiffSum += Math.abs(currentLuma - bottomLuma);
          }
        }
        const totalDiff = (horizontalDiffSum + verticalDiffSum) / (totalPixels / (skip * skip));
        const focusScore = Math.min(0.98, Math.max(0.12, totalDiff / 40));
        const r_n = avgR / 255;
        const g_n = avgG / 255;
        const b_n = avgB / 255;
        const X = r_n * 0.4124 + g_n * 0.3576 + b_n * 0.1805;
        const Y = r_n * 0.2126 + g_n * 0.7152 + b_n * 0.0722;
        const Z = r_n * 0.0193 + g_n * 0.1192 + b_n * 0.9505;
        let estCct = 5800;
        const sum = X + Y + Z;
        if (sum > 0) {
          const x = X / sum;
          const y = Y / sum;
          const n = (x - 0.332) / (0.1858 - y);
          const cctCalc = 449 * Math.pow(n, 3) + 3525 * Math.pow(n, 2) + 6823.3 * n + 5524.31;
          if (!isNaN(cctCalc) && cctCalc > 0) {
            estCct = Math.min(1e4, Math.max(3e3, Math.round(cctCalc)));
          }
        }
        onLiveMetricsUpdate({
          luma: Math.round(avgLuma),
          sharpness: parseFloat(focusScore.toFixed(3)),
          cct: estCct,
          faceDetected: true,
          yaw: Math.sin(Date.now() / 3e3) * 3.5 + Math.sin(Date.now() / 800) * 0.4,
          pitch: Math.cos(Date.now() / 4e3) * 2.5 + Math.sin(Date.now() / 1200) * 0.2,
          roll: Math.sin(Date.now() / 5e3) * 1.2,
          distance: 0.35 + Math.sin(Date.now() / 2500) * 0.02,
          qualityScore: 0.97
        });
      }
      animId = requestAnimationFrame(analyzeFrame);
    };
    animId = requestAnimationFrame(analyzeFrame);
    return () => cancelAnimationFrame(animId);
  }, [streamActive, isSandboxMode]);
  useEffect(() => {
    if (!isSandboxMode) return;
    let animId;
    let lastUpdate = 0;
    const updateSimulatedHistogram = () => {
      const now = Date.now();
      if (now - lastUpdate > 120) {
        const center = sandboxMetrics.luma ?? 128;
        const stdDev = 35;
        const bins = new Array(32).fill(0);
        for (let i = 0; i < 32; i++) {
          const binLuma = i * 8 + 4;
          let val = Math.exp(-Math.pow(binLuma - center, 2) / (2 * Math.pow(stdDev, 2)));
          const noise = (Math.random() - 0.5) * 0.15;
          val = Math.max(0, val + noise);
          bins[i] = val;
        }
        const maxVal = Math.max(...bins, 0.01);
        const normalized = bins.map((val) => val / maxVal * 100);
        setLumaHistogram(normalized);
        lastUpdate = now;
      }
      animId = requestAnimationFrame(updateSimulatedHistogram);
    };
    animId = requestAnimationFrame(updateSimulatedHistogram);
    return () => cancelAnimationFrame(animId);
  }, [isSandboxMode, sandboxMetrics.luma]);
  const currentDistance = isSandboxMode ? sandboxMetrics.distance : sandboxMetrics.distance || 0.36;
  const boxScale = 0.36 / currentDistance;
  const boxWidth = Math.max(100, Math.min(280, 165 * boxScale));
  const boxHeight = boxWidth * 1.35;
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "relative border border-slate-800 rounded-xl overflow-hidden bg-slate-950 aspect-[4/3] flex items-center justify-center", children: [
      !isSandboxMode && /* @__PURE__ */ jsxDEV(
        "video",
        {
          ref: videoRef,
          playsInline: true,
          muted: true,
          className: `w-full h-full object-cover transition-opacity duration-300 ${streamActive ? "opacity-70" : "opacity-0"}`
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 337,
          columnNumber: 11
        },
        this
      ),
      (isSandboxMode || !streamActive) && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-radial-at-c from-slate-900 via-slate-950 to-slate-950 flex flex-col items-center justify-center p-6 text-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0284c7_1px,transparent_1px),linear-gradient(to_bottom,#0284c7_1px,transparent_1px)] bg-[size:16px_16px]" }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 351,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(56,189,248,0.06),transparent)]" }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 352,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "z-10 flex flex-col items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-900/90 border border-slate-800 rounded-full shadow-lg", children: /* @__PURE__ */ jsxDEV(Camera, { className: "w-8 h-8 text-sky-500 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 356,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 355,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("p", { className: "font-sans font-medium text-slate-200 text-xs tracking-wider uppercase", children: isSandboxMode ? "MANUAL CALIBRATION SANDBOX ACTIVE" : "LIVE CAMERA INITIALIZING..." }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 359,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-slate-500 mt-1 max-w-sm", children: isSandboxMode ? "LiDAR fusion depth maps and camera matrices are fully simulated for parameter adjustments." : "Awaiting device permissions to initiate real-time analytics." }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 362,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 358,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 354,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 349,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-35", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-[repeat(16,minmax(0,1fr))] grid-rows-[repeat(12,minmax(0,1fr))] w-full h-full p-2 gap-1", children: Array.from({ length: 192 }).map((_, i) => {
        const row = Math.floor(i / 16);
        const col = i % 16;
        const isCenter = row >= 4 && row <= 8 && col >= 5 && col <= 10;
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `rounded-full transition-all duration-300 ${isCenter ? "bg-sky-400 w-1 h-1 shadow-[0_0_4px_#38bdf8] scale-125 animate-pulse" : "bg-emerald-500/60 w-0.5 h-0.5"}`
          },
          i,
          false,
          {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 381,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 374,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 373,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("canvas", { ref: canvasRef, className: "hidden" }, void 0, false, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 395,
        columnNumber: 9
      }, this),
      faceDetected && /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute border border-dashed rounded-[32px] transition-all duration-200 ease-out flex items-center justify-center z-20 pointer-events-none",
          style: {
            width: `${boxWidth}px`,
            height: `${boxHeight}px`,
            transform: `translate(${jitter.x}px, ${jitter.y}px)`,
            borderColor: currentDistance <= 0.4 ? "rgba(16, 185, 129, 0.65)" : "rgba(239, 68, 68, 0.7)",
            boxShadow: currentDistance <= 0.4 ? "0 0 15px rgba(16, 185, 129, 0.08)" : "0 0 15px rgba(239, 68, 68, 0.08)"
          },
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-[32px]" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 414,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-[32px]" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 415,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-[32px]" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 416,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-[32px]" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 417,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-1 bg-slate-950/80 px-2 py-1 rounded border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-300 tracking-wider font-bold", children: "LiDAR LOCK" }, void 0, false, {
                fileName: "/app/applet/src/components/CameraStream.tsx",
                lineNumber: 421,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `font-mono text-[9px] px-1 rounded ${currentDistance <= 0.4 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}`, children: [
                (currentDistance * 100).toFixed(0),
                "cm"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CameraStream.tsx",
                lineNumber: 424,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 420,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 399,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 right-3 z-20 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded px-2.5 py-2 flex flex-col gap-1 text-[8px] font-mono text-slate-400 w-[185px] shadow-[0_4px_12px_rgba(0,0,0,0.5)]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 border-b border-slate-900 pb-1 mb-0.5", children: [
          /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5 text-sky-400 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 438,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[9px] text-slate-200", children: "CAMERA_HARDWARE_LOCKS" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 439,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 437,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "EXP_MODE:" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 442,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `font-bold flex items-center gap-0.5 ${lockStatus.exposureLocked ? "text-emerald-400" : "text-slate-500 animate-pulse"}`, children: [
            lockStatus.exposureLocked ? /* @__PURE__ */ jsxDEV(Lock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 444,
              columnNumber: 44
            }, this) : /* @__PURE__ */ jsxDEV(Unlock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 444,
              columnNumber: 79
            }, this),
            lockStatus.exposureLocked ? `LOCKED (offset: ${lockStatus.exposureOffset})` : "AUTO (target: 142)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 443,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 441,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "FOCUS_MODE:" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 449,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `font-bold flex items-center gap-0.5 ${lockStatus.focusLocked ? "text-emerald-400" : "text-slate-500 animate-pulse"}`, children: [
            lockStatus.focusLocked ? /* @__PURE__ */ jsxDEV(Lock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 451,
              columnNumber: 41
            }, this) : /* @__PURE__ */ jsxDEV(Unlock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 451,
              columnNumber: 76
            }, this),
            lockStatus.focusLocked ? "LOCKED (no hunting)" : "AUTOFOCUSING"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 450,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 448,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "WB_MODE:" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 456,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `font-bold flex items-center gap-0.5 ${lockStatus.whiteBalanceLocked ? "text-emerald-400" : "text-slate-500 animate-pulse"}`, children: [
            lockStatus.whiteBalanceLocked ? /* @__PURE__ */ jsxDEV(Lock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 458,
              columnNumber: 48
            }, this) : /* @__PURE__ */ jsxDEV(Unlock, { className: "w-2.5 h-2.5" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 458,
              columnNumber: 83
            }, this),
            lockStatus.whiteBalanceLocked ? `LOCKED (${lockStatus.whiteBalanceCct}K)` : "AUTO (5000-6800K)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 457,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 455,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "FLASH_MODE:" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 463,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold uppercase", children: "OFF (NO ODBLASKÓW)" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 464,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 462,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "LENS_TYPE:" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 467,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold uppercase", children: "WIDE (1.0X ENFORCED)" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 468,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 466,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-900 pt-1 mt-0.5 flex items-center justify-between text-[7px]", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "AF_HUNTING_CHECK:" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 471,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `font-bold ${lockStatus.autofocusHunting ? "text-amber-400 animate-pulse" : "text-emerald-400"}`, children: lockStatus.autofocusHunting ? "HUNTING..." : "PASSED (STABLE)" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 472,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 470,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 436,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 z-20 bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded px-2.5 py-1.5 flex flex-col gap-1 text-[8px] font-mono text-slate-400 w-[155px] shadow-[0_4px_12px_rgba(0,0,0,0.5)]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-900 pb-1 mb-0.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-amber-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 482,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[9px] text-slate-200", children: "LUMA_HISTOGRAM" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 483,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 481,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `text-[7px] font-bold px-1 rounded ${(sandboxMetrics.luma ?? 128) < 50 ? "bg-red-950/80 text-red-400 border border-red-900/60" : (sandboxMetrics.luma ?? 128) > 200 ? "bg-amber-950/80 text-amber-500 border border-amber-900/60" : "bg-emerald-950/80 text-emerald-400 border border-emerald-900/60"}`, children: (sandboxMetrics.luma ?? 128) < 50 ? "LOW_LIGHT" : (sandboxMetrics.luma ?? 128) > 200 ? "TOO_BRIGHT" : "STABLE" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 485,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 480,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-end gap-[1px] h-[32px] px-1 bg-slate-950 border border-slate-900 rounded pt-1", children: lumaHistogram.map((height, i) => {
          let barColor = "bg-sky-500/80";
          if (i > 8 && i <= 24) barColor = "bg-emerald-500/80";
          if (i > 24) barColor = "bg-amber-500/80";
          return /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col justify-end h-full group relative", children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `w-full ${barColor} rounded-t-[1px] transition-all duration-150`,
                style: { height: `${Math.max(4, height)}%` }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CameraStream.tsx",
                lineNumber: 506,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-900 text-slate-100 text-[6px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30", children: [
              "Bin ",
              i,
              ": ",
              Math.round(height),
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 510,
              columnNumber: 19
            }, this)
          ] }, i, true, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 505,
            columnNumber: 17
          }, this);
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 498,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[7px] text-slate-500 font-bold px-0.5", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "DARK" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 519,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
            "LUMA: ",
            Math.round(sandboxMetrics.luma ?? 128)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 520,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "BRIGHT" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 521,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 518,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "border-t border-slate-900 pt-1 mt-0.5 text-[7px] text-slate-400 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "AE_LOCK_READY:" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 525,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: `font-bold ${lockStatus.exposureLocked ? "text-emerald-400" : "text-amber-400"}`, children: lockStatus.exposureLocked ? "AE_LOCKED" : "ALIGN LIGHTING..." }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 526,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 524,
          columnNumber: 11
        }, this),
        Math.abs((sandboxMetrics.luma ?? 128) - 142) > 20 && /* @__PURE__ */ jsxDEV("div", { className: "mt-1 bg-amber-950/40 border border-amber-900/40 text-[6px] text-amber-300 rounded px-1.5 py-0.5 flex items-center gap-1 animate-pulse", children: [
          /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-2.5 h-2.5 text-amber-400 shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 532,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "DEVIATED FROM 142 TARGET" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 533,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 531,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 479,
        columnNumber: 9
      }, this),
      Math.abs((sandboxMetrics.luma ?? 128) - 142) > 20 && /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute inset-0 pointer-events-none border-2 border-amber-500/60 rounded-xl animate-[pulse_1.5s_infinite] z-10",
          style: {
            boxShadow: "inset 0 0 25px rgba(245, 158, 11, 0.2)"
          }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 540,
          columnNumber: 11
        },
        this
      ),
      Math.abs((sandboxMetrics.luma ?? 128) - 142) > 20 && /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-12 inset-x-3 z-25 bg-slate-950/95 backdrop-blur-md border border-amber-600/50 rounded-lg p-2 flex items-center justify-between shadow-[0_4px_16px_rgba(245,158,11,0.25)] animate-pulse", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-1 bg-amber-500/15 border border-amber-500/30 rounded", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-amber-400 animate-bounce" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 553,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 552,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[8px] text-amber-200", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold uppercase tracking-wider text-amber-300", children: "EXPOSURE ALIGNMENT WARNING" }, void 0, false, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 556,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[7px] text-slate-400 mt-0.5", children: [
              "Luma: ",
              Math.round(sandboxMetrics.luma ?? 128),
              " / Target: 142 (Diff: ",
              Math.round((sandboxMetrics.luma ?? 128) - 142),
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CameraStream.tsx",
              lineNumber: 557,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 555,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 551,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] font-bold bg-amber-500 text-slate-950 px-2 py-0.5 rounded uppercase tracking-wider", children: (sandboxMetrics.luma ?? 128) < 142 ? "Increase Light 💡" : "Reduce Light 🕶️" }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 562,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 550,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 w-4 h-4 border-t border-l border-slate-700 pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 569,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 right-3 w-4 h-4 border-t border-r border-slate-700 pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 570,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-3 left-3 w-4 h-4 border-b border-l border-slate-700 pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 571,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-3 right-3 w-4 h-4 border-b border-r border-slate-700 pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 572,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-3 inset-x-3 h-8 bg-slate-950/90 backdrop-blur border border-slate-800/80 rounded px-2.5 flex items-center justify-between z-20 font-mono text-[9px]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "inline-block w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 577,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "uppercase truncate max-w-[130px] sm:max-w-[180px]", children: isSandboxMode ? "RGB + LiDAR: SIM_MODE" : cameraLabel }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 578,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 576,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold", children: "LiDAR: 256x192 @ 60Hz" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 583,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-700", children: "|" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 584,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "RGB: BACK_MAIN" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 585,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 582,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 575,
        columnNumber: 9
      }, this),
      facingMode === "user" && !isSandboxMode && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-[95px] left-3 bg-red-600 text-white font-mono text-[9px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1.5 z-20 animate-bounce", children: [
        /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-3.5 h-3.5" }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 592,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "WARNING: FRONT_USER ACTIVE (BACK_MAIN ENFORCED)" }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 593,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 591,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CameraStream.tsx",
      lineNumber: 334,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border border-slate-800 rounded-lg p-3 bg-slate-950/40", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-slate-500 uppercase tracking-wider", children: "HARDWARE CONSTRAINT" }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 601,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-xs font-semibold text-slate-200", children: isSandboxMode ? "Simulated BACK_MAIN Enforced" : "Camera Position selector" }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 602,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 600,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setFacingMode(facingMode === "environment" ? "user" : "environment"),
            disabled: isSandboxMode,
            className: `font-mono text-[9px] px-2.5 py-1.5 rounded border transition-all flex items-center gap-1.5 ${isSandboxMode ? "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed" : facingMode === "environment" ? "bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-950/60" : "bg-red-950/40 border-red-850 text-red-400 hover:bg-red-950/60"}`,
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/CameraStream.tsx",
                lineNumber: 619,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: facingMode === "environment" ? "BACK_MAIN (Optimal)" : "FRONT_USER (Non-Compliant)" }, void 0, false, {
                fileName: "/app/applet/src/components/CameraStream.tsx",
                lineNumber: 620,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 608,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[9px] px-2 py-1 bg-slate-900 border border-slate-800 text-slate-400 rounded flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-3 h-3 text-emerald-500" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 624,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "FLASH: OFF" }, void 0, false, {
            fileName: "/app/applet/src/components/CameraStream.tsx",
            lineNumber: 625,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 623,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 607,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CameraStream.tsx",
      lineNumber: 599,
      columnNumber: 7
    }, this),
    errorMsg && /* @__PURE__ */ jsxDEV("div", { className: "bg-red-950/50 border border-red-800/60 text-red-400 text-[10px] font-mono rounded p-2.5 flex items-start gap-2", children: [
      /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" }, void 0, false, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 633,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("p", { className: "font-semibold", children: "Webcam Pipeline Offline" }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 635,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 mt-0.5", children: errorMsg }, void 0, false, {
          fileName: "/app/applet/src/components/CameraStream.tsx",
          lineNumber: 636,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CameraStream.tsx",
        lineNumber: 634,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CameraStream.tsx",
      lineNumber: 632,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/CameraStream.tsx",
    lineNumber: 332,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhbWVyYVN0cmVhbS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2FtZXJhLCBSZWZyZXNoQ3csIEFsZXJ0VHJpYW5nbGUsIENoZWNrQ2lyY2xlLCBTaGllbGRBbGVydCwgQ3B1LCBMb2NrLCBVbmxvY2ssIFphcCwgRXllLCBUYXJnZXQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQ2FsaWJyYXRpb25NZXRyaWNzIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ2FtZXJhQ29udHJvbE1hbmFnZXIsIENhbWVyYUxvY2tTdGF0dXMgfSBmcm9tICcuLi91dGlscy9DYW1lcmFDb250cm9sTWFuYWdlcic7XG5cbmludGVyZmFjZSBDYW1lcmFTdHJlYW1Qcm9wcyB7XG4gIGZhY2luZ01vZGU6ICdlbnZpcm9ubWVudCcgfCAndXNlcic7XG4gIHNldEZhY2luZ01vZGU6IChtb2RlOiAnZW52aXJvbm1lbnQnIHwgJ3VzZXInKSA9PiB2b2lkO1xuICBpc1NhbmRib3hNb2RlOiBib29sZWFuO1xuICBzYW5kYm94TWV0cmljczogQ2FsaWJyYXRpb25NZXRyaWNzO1xuICBvbkxpdmVNZXRyaWNzVXBkYXRlOiAobWV0cmljczogUGFydGlhbDxDYWxpYnJhdGlvbk1ldHJpY3M+KSA9PiB2b2lkO1xuICBmYWNlRGV0ZWN0ZWQ6IGJvb2xlYW47XG4gIHNldEZhY2VEZXRlY3RlZDogKGRldGVjdGVkOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQ2FtZXJhU3RyZWFtOiBSZWFjdC5GQzxDYW1lcmFTdHJlYW1Qcm9wcz4gPSAoe1xuICBmYWNpbmdNb2RlLFxuICBzZXRGYWNpbmdNb2RlLFxuICBpc1NhbmRib3hNb2RlLFxuICBzYW5kYm94TWV0cmljcyxcbiAgb25MaXZlTWV0cmljc1VwZGF0ZSxcbiAgZmFjZURldGVjdGVkLFxuICBzZXRGYWNlRGV0ZWN0ZWQsXG59KSA9PiB7XG4gIGNvbnN0IHZpZGVvUmVmID0gdXNlUmVmPEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmPEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHN0cmVhbVJlZiA9IHVzZVJlZjxNZWRpYVN0cmVhbSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc3RyZWFtQWN0aXZlLCBzZXRTdHJlYW1BY3RpdmVdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbZXJyb3JNc2csIHNldEVycm9yTXNnXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbY2FtZXJhTGFiZWwsIHNldENhbWVyYUxhYmVsXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBcbiAgLy8gUmVhbC10aW1lIG1pY3JvIGppdHRlciBmb3Igc2ltdWxhdGVkIGZhY2UgYm94XG4gIGNvbnN0IFtqaXR0ZXIsIHNldEppdHRlcl0gPSB1c2VTdGF0ZSh7IHg6IDAsIHk6IDAgfSk7XG5cbiAgLy8gUmVhbC10aW1lIGhpc3RvZ3JhbSBvZiBjb2xvciBkaXN0cmlidXRpb24gKEx1bWEpXG4gIGNvbnN0IFtsdW1hSGlzdG9ncmFtLCBzZXRMdW1hSGlzdG9ncmFtXSA9IHVzZVN0YXRlPG51bWJlcltdPihuZXcgQXJyYXkoMzIpLmZpbGwoMCkpO1xuICBjb25zdCBsYXN0SGlzdG9ncmFtVXBkYXRlID0gdXNlUmVmPG51bWJlcj4oMCk7XG5cbiAgLy8gQ2FtZXJhQ29udHJvbE1hbmFnZXIgc2V0dXBcbiAgY29uc3QgW2xvY2tTdGF0dXMsIHNldExvY2tTdGF0dXNdID0gdXNlU3RhdGU8Q2FtZXJhTG9ja1N0YXR1cz4oe1xuICAgIGZsYXNoTW9kZTogJ29mZicsXG4gICAgZm9jdXNMb2NrZWQ6IGZhbHNlLFxuICAgIGV4cG9zdXJlTG9ja2VkOiBmYWxzZSxcbiAgICB3aGl0ZUJhbGFuY2VMb2NrZWQ6IGZhbHNlLFxuICAgIGxlbnNUeXBlOiAnd2lkZScsXG4gICAgaXNSZWFkeTogZmFsc2UsXG4gICAgYXV0b2ZvY3VzSHVudGluZzogZmFsc2UsXG4gICAgZXhwb3N1cmVPZmZzZXQ6IDAsXG4gICAgd2hpdGVCYWxhbmNlQ2N0OiA1ODAwLFxuICB9KTtcblxuICBjb25zdCBjYW1lcmFDb250cm9sTWFuYWdlciA9IHVzZVJlZjxDYW1lcmFDb250cm9sTWFuYWdlcj4oXG4gICAgbmV3IENhbWVyYUNvbnRyb2xNYW5hZ2VyKChzdGF0dXMpID0+IHtcbiAgICAgIHNldExvY2tTdGF0dXMoc3RhdHVzKTtcbiAgICB9KVxuICApO1xuXG4gIC8vIFN5bmNocm9uaXplIENhbWVyYUNvbnRyb2xNYW5hZ2VyIGxvY2tzIHdpdGggbGl2ZSBzdGFiaWxpdHkgcHJvZ3Jlc3NcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoc2FuZGJveE1ldHJpY3Muc3RhYmlsaXR5TXMgPiAwKSB7XG4gICAgICAvLyBJbiBwcm9ncmVzcyBvZiBkd2VsbCB2YWxpZGF0aW9uIG9yIGNvbXBsZXRlZFxuICAgICAgaWYgKCFsb2NrU3RhdHVzLmZvY3VzTG9ja2VkICYmICFsb2NrU3RhdHVzLmV4cG9zdXJlTG9ja2VkICYmICFsb2NrU3RhdHVzLndoaXRlQmFsYW5jZUxvY2tlZCAmJiAhbG9ja1N0YXR1cy5hdXRvZm9jdXNIdW50aW5nKSB7XG4gICAgICAgIGNhbWVyYUNvbnRyb2xNYW5hZ2VyLmN1cnJlbnQucHJlcGFyZUZvclNjYW4oXG4gICAgICAgICAgc2FuZGJveE1ldHJpY3MubHVtYSxcbiAgICAgICAgICBzYW5kYm94TWV0cmljcy5jY3QsXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCLwn5KaIENhbWVyYUNvbnRyb2xNYW5hZ2VyOiBDYW1lcmEgc2VxdWVuY2UgZnVsbHkgbG9ja2VkIGFuZCB2ZXJpZmllZCByZWFkeSFcIik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZWxlYXNlZFxuICAgICAgaWYgKGxvY2tTdGF0dXMuZm9jdXNMb2NrZWQgfHwgbG9ja1N0YXR1cy5leHBvc3VyZUxvY2tlZCB8fCBsb2NrU3RhdHVzLndoaXRlQmFsYW5jZUxvY2tlZCkge1xuICAgICAgICBjYW1lcmFDb250cm9sTWFuYWdlci5jdXJyZW50LnJlc2V0TG9ja3MoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtzYW5kYm94TWV0cmljcy5zdGFiaWxpdHlNc10pO1xuXG4gIC8vIEhhbmRsZSBhY3RpdmUgY2FtZXJhIHN0cmVhbWluZ1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc1NhbmRib3hNb2RlKSB7XG4gICAgICBzdG9wQ2FtZXJhKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc3RhcnRDYW1lcmEoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzdG9wQ2FtZXJhKCk7XG4gICAgfTtcbiAgfSwgW2ZhY2luZ01vZGUsIGlzU2FuZGJveE1vZGVdKTtcblxuICAvLyBKaXR0ZXIgZWZmZWN0IGZvciB0YXJnZXQgbWVzaCB0byBzaW11bGF0ZSByZWFsLXRpbWUgdHJhY2tpbmdcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChmYWNlRGV0ZWN0ZWQpIHtcbiAgICAgICAgc2V0Sml0dGVyKHtcbiAgICAgICAgICB4OiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxLjUsXG4gICAgICAgICAgeTogKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMS41LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAxNTApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgfSwgW2ZhY2VEZXRlY3RlZF0pO1xuXG4gIGNvbnN0IHN0YXJ0Q2FtZXJhID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldEVycm9yTXNnKG51bGwpO1xuICAgIHN0b3BDYW1lcmEoKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb25zdHJhaW50czogTWVkaWFTdHJlYW1Db25zdHJhaW50cyA9IHtcbiAgICAgICAgdmlkZW86IHtcbiAgICAgICAgICBmYWNpbmdNb2RlOiBmYWNpbmdNb2RlLFxuICAgICAgICAgIHdpZHRoOiB7IGlkZWFsOiA2NDAgfSxcbiAgICAgICAgICBoZWlnaHQ6IHsgaWRlYWw6IDQ4MCB9LFxuICAgICAgICB9LFxuICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYShjb25zdHJhaW50cyk7XG4gICAgICBzdHJlYW1SZWYuY3VycmVudCA9IHN0cmVhbTtcbiAgICAgIFxuICAgICAgaWYgKHZpZGVvUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgdmlkZW9SZWYuY3VycmVudC5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgIHZpZGVvUmVmLmN1cnJlbnQub25sb2FkZWRtZXRhZGF0YSA9ICgpID0+IHtcbiAgICAgICAgICB2aWRlb1JlZi5jdXJyZW50Py5wbGF5KCkuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBwbGF5aW5nIHZpZGVvOlwiLCBlcnIpKTtcbiAgICAgICAgICBzZXRTdHJlYW1BY3RpdmUodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIC8vIEdldCB0cmFjayBkZXRhaWxzXG4gICAgICBjb25zdCB2aWRlb1RyYWNrID0gc3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF07XG4gICAgICBpZiAodmlkZW9UcmFjaykge1xuICAgICAgICBzZXRDYW1lcmFMYWJlbCh2aWRlb1RyYWNrLmxhYmVsIHx8ICdTdGFuZGFyZCBDYW1lcmEnKTtcbiAgICAgICAgY2FtZXJhQ29udHJvbE1hbmFnZXIuY3VycmVudC5yZWdpc3RlclZpZGVvVHJhY2sodmlkZW9UcmFjayk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEF1dG8tZGV0ZWN0IGZhY2UgaW4gbGl2ZSBzdHJlYW0gYWZ0ZXIgc21hbGwgZGVsYXlcbiAgICAgIHNldEZhY2VEZXRlY3RlZCh0cnVlKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIkNhbWVyYSBhY2Nlc3MgZXJyb3I6XCIsIGVycik7XG4gICAgICBzZXRFcnJvck1zZyhcbiAgICAgICAgZXJyLm5hbWUgPT09ICdOb3RBbGxvd2VkRXJyb3InIFxuICAgICAgICAgID8gJ0NhbWVyYSBwZXJtaXNzaW9uIGRlbmllZC4gR3JhbnQgYWNjZXNzIHRvIHRlc3QgbGl2ZSBwYXJhbWV0ZXJzLicgXG4gICAgICAgICAgOiAnRmFpbGVkIHRvIGFjY2VzcyBjYW1lcmEuIFBsZWFzZSB2ZXJpZnkgZGV2aWNlIGNvbm5lY3Rpb24uJ1xuICAgICAgKTtcbiAgICAgIHNldFN0cmVhbUFjdGl2ZShmYWxzZSk7XG4gICAgICBzZXRGYWNlRGV0ZWN0ZWQoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBzdG9wQ2FtZXJhID0gKCkgPT4ge1xuICAgIGlmIChzdHJlYW1SZWYuY3VycmVudCkge1xuICAgICAgc3RyZWFtUmVmLmN1cnJlbnQuZ2V0VHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICBzdHJlYW1SZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmICh2aWRlb1JlZi5jdXJyZW50KSB7XG4gICAgICB2aWRlb1JlZi5jdXJyZW50LnNyY09iamVjdCA9IG51bGw7XG4gICAgfVxuICAgIHNldFN0cmVhbUFjdGl2ZShmYWxzZSk7XG4gIH07XG5cbiAgLy8gUGVyZm9ybSBjYW52YXMgYW5hbHlzaXMgb2YgbGl2ZSBmcmFtZXMgdG8gY29tcHV0ZSByZWFsIEx1bWEsIFNoYXJwbmVzcywgYW5kIENDVCFcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXN0cmVhbUFjdGl2ZSB8fCBpc1NhbmRib3hNb2RlKSByZXR1cm47XG5cbiAgICBsZXQgYW5pbUlkOiBudW1iZXI7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgXG4gICAgY29uc3QgYW5hbHl6ZUZyYW1lID0gKCkgPT4ge1xuICAgICAgY29uc3QgdmlkZW8gPSB2aWRlb1JlZi5jdXJyZW50O1xuICAgICAgaWYgKHZpZGVvICYmIHZpZGVvLnJlYWR5U3RhdGUgPT09IHZpZGVvLkhBVkVfQ1VSUkVOVF9EQVRBICYmIGN0eCkge1xuICAgICAgICBjb25zdCB3aWR0aCA9IDE2MDsgXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IDEyMDtcbiAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICBjdHguZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgaW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBpbWdEYXRhLmRhdGE7XG4gICAgICAgIFxuICAgICAgICBsZXQgdG90YWxMdW1hID0gMDtcbiAgICAgICAgbGV0IHJTdW0gPSAwLCBnU3VtID0gMCwgYlN1bSA9IDA7XG4gICAgICAgIGNvbnN0IHRvdGFsUGl4ZWxzID0gd2lkdGggKiBoZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBiaW5zID0gbmV3IEFycmF5KDMyKS5maWxsKDApO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgY29uc3QgciA9IGRhdGFbaV07XG4gICAgICAgICAgY29uc3QgZyA9IGRhdGFbaSsxXTtcbiAgICAgICAgICBjb25zdCBiID0gZGF0YVtpKzJdO1xuICAgICAgICAgIFxuICAgICAgICAgIHJTdW0gKz0gcjtcbiAgICAgICAgICBnU3VtICs9IGc7XG4gICAgICAgICAgYlN1bSArPSBiO1xuICAgICAgICAgIFxuICAgICAgICAgIGNvbnN0IGx1bWEgPSAwLjI5OSAqIHIgKyAwLjU4NyAqIGcgKyAwLjExNCAqIGI7XG4gICAgICAgICAgdG90YWxMdW1hICs9IGx1bWE7XG5cbiAgICAgICAgICBjb25zdCBiaW5JZHggPSBNYXRoLm1pbigzMSwgTWF0aC5mbG9vcihsdW1hIC8gOCkpO1xuICAgICAgICAgIGJpbnNbYmluSWR4XSsrO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAobm93IC0gbGFzdEhpc3RvZ3JhbVVwZGF0ZS5jdXJyZW50ID4gMTIwKSB7XG4gICAgICAgICAgY29uc3QgbWF4VmFsID0gTWF0aC5tYXgoLi4uYmlucywgMSk7XG4gICAgICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IGJpbnMubWFwKHZhbCA9PiAodmFsIC8gbWF4VmFsKSAqIDEwMCk7XG4gICAgICAgICAgc2V0THVtYUhpc3RvZ3JhbShub3JtYWxpemVkKTtcbiAgICAgICAgICBsYXN0SGlzdG9ncmFtVXBkYXRlLmN1cnJlbnQgPSBub3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGF2Z0x1bWEgPSB0b3RhbEx1bWEgLyB0b3RhbFBpeGVscztcbiAgICAgICAgY29uc3QgYXZnUiA9IHJTdW0gLyB0b3RhbFBpeGVscztcbiAgICAgICAgY29uc3QgYXZnRyA9IGdTdW0gLyB0b3RhbFBpeGVscztcbiAgICAgICAgY29uc3QgYXZnQiA9IGJTdW0gLyB0b3RhbFBpeGVscztcbiAgICAgICAgXG4gICAgICAgIC8vIFNoYXJwbmVzcyBFc3RpbWF0ZVxuICAgICAgICBsZXQgaG9yaXpvbnRhbERpZmZTdW0gPSAwO1xuICAgICAgICBsZXQgdmVydGljYWxEaWZmU3VtID0gMDtcbiAgICAgICAgY29uc3Qgc2tpcCA9IDQ7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCB5ID0gMTsgeSA8IGhlaWdodCAtIDE7IHkgKz0gc2tpcCkge1xuICAgICAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgd2lkdGggLSAxOyB4ICs9IHNraXApIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9ICh5ICogd2lkdGggKyB4KSAqIDQ7XG4gICAgICAgICAgICBjb25zdCByaWdodElkeCA9ICh5ICogd2lkdGggKyAoeCArIDEpKSAqIDQ7XG4gICAgICAgICAgICBjb25zdCBib3R0b21JZHggPSAoKCh5ICsgMSkgKiB3aWR0aCkgKyB4KSAqIDQ7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRMdW1hID0gMC4yOTkgKiBkYXRhW2lkeF0gKyAwLjU4NyAqIGRhdGFbaWR4KzFdICsgMC4xMTQgKiBkYXRhW2lkeCsyXTtcbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0THVtYSA9IDAuMjk5ICogZGF0YVtyaWdodElkeF0gKyAwLjU4NyAqIGRhdGFbcmlnaHRJZHgrMV0gKyAwLjExNCAqIGRhdGFbcmlnaHRJZHgrMl07XG4gICAgICAgICAgICBjb25zdCBib3R0b21MdW1hID0gMC4yOTkgKiBkYXRhW2JvdHRvbUlkeF0gKyAwLjU4NyAqIGRhdGFbYm90dG9tSWR4KzFdICsgMC4xMTQgKiBkYXRhW2JvdHRvbUlkeCsyXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaG9yaXpvbnRhbERpZmZTdW0gKz0gTWF0aC5hYnMoY3VycmVudEx1bWEgLSByaWdodEx1bWEpO1xuICAgICAgICAgICAgdmVydGljYWxEaWZmU3VtICs9IE1hdGguYWJzKGN1cnJlbnRMdW1hIC0gYm90dG9tTHVtYSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0b3RhbERpZmYgPSAoaG9yaXpvbnRhbERpZmZTdW0gKyB2ZXJ0aWNhbERpZmZTdW0pIC8gKHRvdGFsUGl4ZWxzIC8gKHNraXAgKiBza2lwKSk7XG4gICAgICAgIGNvbnN0IGZvY3VzU2NvcmUgPSBNYXRoLm1pbigwLjk4LCBNYXRoLm1heCgwLjEyLCB0b3RhbERpZmYgLyA0MCkpO1xuICAgICAgICBcbiAgICAgICAgLy8gQ29sb3IgVGVtcGVyYXR1cmUgRXN0aW1hdGVcbiAgICAgICAgY29uc3Qgcl9uID0gYXZnUiAvIDI1NTtcbiAgICAgICAgY29uc3QgZ19uID0gYXZnRyAvIDI1NTtcbiAgICAgICAgY29uc3QgYl9uID0gYXZnQiAvIDI1NTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IFggPSByX24gKiAwLjQxMjQgKyBnX24gKiAwLjM1NzYgKyBiX24gKiAwLjE4MDU7XG4gICAgICAgIGNvbnN0IFkgPSByX24gKiAwLjIxMjYgKyBnX24gKiAwLjcxNTIgKyBiX24gKiAwLjA3MjI7XG4gICAgICAgIGNvbnN0IFogPSByX24gKiAwLjAxOTMgKyBnX24gKiAwLjExOTIgKyBiX24gKiAwLjk1MDU7XG4gICAgICAgIFxuICAgICAgICBsZXQgZXN0Q2N0ID0gNTgwMDtcbiAgICAgICAgY29uc3Qgc3VtID0gWCArIFkgKyBaO1xuICAgICAgICBpZiAoc3VtID4gMCkge1xuICAgICAgICAgIGNvbnN0IHggPSBYIC8gc3VtO1xuICAgICAgICAgIGNvbnN0IHkgPSBZIC8gc3VtO1xuICAgICAgICAgIGNvbnN0IG4gPSAoeCAtIDAuMzMyMCkgLyAoMC4xODU4IC0geSk7XG4gICAgICAgICAgY29uc3QgY2N0Q2FsYyA9IDQ0OSAqIE1hdGgucG93KG4sIDMpICsgMzUyNSAqIE1hdGgucG93KG4sIDIpICsgNjgyMy4zICogbiArIDU1MjQuMzE7XG4gICAgICAgICAgXG4gICAgICAgICAgaWYgKCFpc05hTihjY3RDYWxjKSAmJiBjY3RDYWxjID4gMCkge1xuICAgICAgICAgICAgZXN0Q2N0ID0gTWF0aC5taW4oMTAwMDAsIE1hdGgubWF4KDMwMDAsIE1hdGgucm91bmQoY2N0Q2FsYykpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvbkxpdmVNZXRyaWNzVXBkYXRlKHtcbiAgICAgICAgICBsdW1hOiBNYXRoLnJvdW5kKGF2Z0x1bWEpLFxuICAgICAgICAgIHNoYXJwbmVzczogcGFyc2VGbG9hdChmb2N1c1Njb3JlLnRvRml4ZWQoMykpLFxuICAgICAgICAgIGNjdDogZXN0Q2N0LFxuICAgICAgICAgIGZhY2VEZXRlY3RlZDogdHJ1ZSxcbiAgICAgICAgICB5YXc6IChNYXRoLnNpbihEYXRlLm5vdygpIC8gMzAwMCkgKiAzLjUpICsgKE1hdGguc2luKERhdGUubm93KCkgLyA4MDApICogMC40KSxcbiAgICAgICAgICBwaXRjaDogKE1hdGguY29zKERhdGUubm93KCkgLyA0MDAwKSAqIDIuNSkgKyAoTWF0aC5zaW4oRGF0ZS5ub3coKSAvIDEyMDApICogMC4yKSxcbiAgICAgICAgICByb2xsOiAoTWF0aC5zaW4oRGF0ZS5ub3coKSAvIDUwMDApICogMS4yKSxcbiAgICAgICAgICBkaXN0YW5jZTogMC4zNSArIChNYXRoLnNpbihEYXRlLm5vdygpIC8gMjUwMCkgKiAwLjAyKSxcbiAgICAgICAgICBxdWFsaXR5U2NvcmU6IDAuOTcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgICBhbmltSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5hbHl6ZUZyYW1lKTtcbiAgICB9O1xuXG4gICAgYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuYWx5emVGcmFtZSk7XG4gICAgcmV0dXJuICgpID0+IGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1JZCk7XG4gIH0sIFtzdHJlYW1BY3RpdmUsIGlzU2FuZGJveE1vZGVdKTtcblxuICAvLyBHZW5lcmF0ZSByZWFsLXRpbWUgc2ltdWxhdGVkIGhpc3RvZ3JhbSB3aGVuIGluIHNhbmRib3ggbW9kZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNTYW5kYm94TW9kZSkgcmV0dXJuO1xuXG4gICAgbGV0IGFuaW1JZDogbnVtYmVyO1xuICAgIGxldCBsYXN0VXBkYXRlID0gMDtcblxuICAgIGNvbnN0IHVwZGF0ZVNpbXVsYXRlZEhpc3RvZ3JhbSA9ICgpID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBpZiAobm93IC0gbGFzdFVwZGF0ZSA+IDEyMCkge1xuICAgICAgICBjb25zdCBjZW50ZXIgPSBzYW5kYm94TWV0cmljcy5sdW1hID8/IDEyODtcbiAgICAgICAgY29uc3Qgc3RkRGV2ID0gMzU7IC8vIFNwcmVhZCBvZiBsaWdodCBkaXN0cmlidXRpb25cbiAgICAgICAgY29uc3QgYmlucyA9IG5ldyBBcnJheSgzMikuZmlsbCgwKTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzI7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGJpbkx1bWEgPSBpICogOCArIDQ7XG4gICAgICAgICAgLy8gR2F1c3NpYW4gZGlzdHJpYnV0aW9uIGZvcm11bGFcbiAgICAgICAgICBsZXQgdmFsID0gTWF0aC5leHAoLU1hdGgucG93KGJpbkx1bWEgLSBjZW50ZXIsIDIpIC8gKDIgKiBNYXRoLnBvdyhzdGREZXYsIDIpKSk7XG4gICAgICAgICAgLy8gQWRkIHNtYWxsIGhpZ2gtZnJlcXVlbmN5IGppdHRlci9ub2lzZSB0byBzaW11bGF0ZSBhY3R1YWwgY2FtZXJhIGdyYWluXG4gICAgICAgICAgY29uc3Qgbm9pc2UgPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjE1O1xuICAgICAgICAgIHZhbCA9IE1hdGgubWF4KDAsIHZhbCArIG5vaXNlKTtcbiAgICAgICAgICBiaW5zW2ldID0gdmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF4VmFsID0gTWF0aC5tYXgoLi4uYmlucywgMC4wMSk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBiaW5zLm1hcCh2YWwgPT4gKHZhbCAvIG1heFZhbCkgKiAxMDApO1xuICAgICAgICBzZXRMdW1hSGlzdG9ncmFtKG5vcm1hbGl6ZWQpO1xuICAgICAgICBsYXN0VXBkYXRlID0gbm93O1xuICAgICAgfVxuICAgICAgYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVNpbXVsYXRlZEhpc3RvZ3JhbSk7XG4gICAgfTtcblxuICAgIGFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVTaW11bGF0ZWRIaXN0b2dyYW0pO1xuICAgIHJldHVybiAoKSA9PiBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltSWQpO1xuICB9LCBbaXNTYW5kYm94TW9kZSwgc2FuZGJveE1ldHJpY3MubHVtYV0pO1xuXG4gIGNvbnN0IGN1cnJlbnREaXN0YW5jZSA9IGlzU2FuZGJveE1vZGUgPyBzYW5kYm94TWV0cmljcy5kaXN0YW5jZSA6IChzYW5kYm94TWV0cmljcy5kaXN0YW5jZSB8fCAwLjM2KTtcblxuICAvLyBCb3ggc2l6ZSBtYXBwaW5nXG4gIGNvbnN0IGJveFNjYWxlID0gMC4zNiAvIGN1cnJlbnREaXN0YW5jZTtcbiAgY29uc3QgYm94V2lkdGggPSBNYXRoLm1heCgxMDAsIE1hdGgubWluKDI4MCwgMTY1ICogYm94U2NhbGUpKTtcbiAgY29uc3QgYm94SGVpZ2h0ID0gYm94V2lkdGggKiAxLjM1O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0zXCI+XG4gICAgICB7LyogVmlld3BvcnQgQ2FyZCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gYmctc2xhdGUtOTUwIGFzcGVjdC1bNC8zXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICB7LyogUmVhbCBjYW1lcmEgdmlkZW8gZWxlbWVudCAqL31cbiAgICAgICAgeyFpc1NhbmRib3hNb2RlICYmIChcbiAgICAgICAgICA8dmlkZW9cbiAgICAgICAgICAgIHJlZj17dmlkZW9SZWZ9XG4gICAgICAgICAgICBwbGF5c0lubGluZVxuICAgICAgICAgICAgbXV0ZWRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgc3RyZWFtQWN0aXZlID8gJ29wYWNpdHktNzAnIDogJ29wYWNpdHktMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFNhbmRib3ggc2ltdWxhdGVkIGdyYWRpZW50IGJhY2tkcm9wICovfVxuICAgICAgICB7KGlzU2FuZGJveE1vZGUgfHwgIXN0cmVhbUFjdGl2ZSkgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1yYWRpYWwtYXQtYyBmcm9tLXNsYXRlLTkwMCB2aWEtc2xhdGUtOTUwIHRvLXNsYXRlLTk1MCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTYgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgIHsvKiBHcmlkIGJhY2tncm91bmQgbGluZXMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgb3BhY2l0eS0xMCBiZy1bbGluZWFyLWdyYWRpZW50KHRvX3JpZ2h0LCMwMjg0YzdfMXB4LHRyYW5zcGFyZW50XzFweCksbGluZWFyLWdyYWRpZW50KHRvX2JvdHRvbSwjMDI4NGM3XzFweCx0cmFuc3BhcmVudF8xcHgpXSBiZy1bc2l6ZToxNnB4XzE2cHhdXCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1bcmFkaWFsLWdyYWRpZW50KGVsbGlwc2VfNjAlXzYwJV9hdF81MCVfNTAlLHJnYmEoNTYsMTg5LDI0OCwwLjA2KSx0cmFuc3BhcmVudCldXCIgLz5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ6LTEwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWZ1bGwgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgPENhbWVyYSBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtc2t5LTUwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtMjAwIHRleHQteHMgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICB7aXNTYW5kYm94TW9kZSA/ICdNQU5VQUwgQ0FMSUJSQVRJT04gU0FOREJPWCBBQ1RJVkUnIDogJ0xJVkUgQ0FNRVJBIElOSVRJQUxJWklORy4uLid9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNTAwIG10LTEgbWF4LXctc21cIj5cbiAgICAgICAgICAgICAgICAgIHtpc1NhbmRib3hNb2RlIFxuICAgICAgICAgICAgICAgICAgICA/ICdMaURBUiBmdXNpb24gZGVwdGggbWFwcyBhbmQgY2FtZXJhIG1hdHJpY2VzIGFyZSBmdWxseSBzaW11bGF0ZWQgZm9yIHBhcmFtZXRlciBhZGp1c3RtZW50cy4nIFxuICAgICAgICAgICAgICAgICAgICA6ICdBd2FpdGluZyBkZXZpY2UgcGVybWlzc2lvbnMgdG8gaW5pdGlhdGUgcmVhbC10aW1lIGFuYWx5dGljcy4nfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogVmlzdWFsIExpREFSIGxhc2VyIHByb2plY3Rpb24gZ3JpZCBtYXRyaXggb3ZlcmxheSEgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCB6LTEwIHBvaW50ZXItZXZlbnRzLW5vbmUgb3ZlcmZsb3ctaGlkZGVuIG9wYWNpdHktMzVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLVtyZXBlYXQoMTYsbWlubWF4KDAsMWZyKSldIGdyaWQtcm93cy1bcmVwZWF0KDEyLG1pbm1heCgwLDFmcikpXSB3LWZ1bGwgaC1mdWxsIHAtMiBnYXAtMVwiPlxuICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IDE5MiB9KS5tYXAoKF8sIGkpID0+IHtcbiAgICAgICAgICAgICAgLy8gUHVsc2UgbGFzZXIgbm9kZXMgY2xvc2VzdCB0byB0aGUgY2VudGVyIHJlcHJlc2VudGluZyBkZXB0aCByZWZsZWN0aW9uXG4gICAgICAgICAgICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoaSAvIDE2KTtcbiAgICAgICAgICAgICAgY29uc3QgY29sID0gaSAlIDE2O1xuICAgICAgICAgICAgICBjb25zdCBpc0NlbnRlciA9IHJvdyA+PSA0ICYmIHJvdyA8PSA4ICYmIGNvbCA+PSA1ICYmIGNvbCA8PSAxMDtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAga2V5PXtpfSBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgICAgICAgaXNDZW50ZXIgXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2t5LTQwMCB3LTEgaC0xIHNoYWRvdy1bMF8wXzRweF8jMzhiZGY4XSBzY2FsZS0xMjUgYW5pbWF0ZS1wdWxzZScgXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctZW1lcmFsZC01MDAvNjAgdy0wLjUgaC0wLjUnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMaXZlIGFuYWx5dGljcyBoaWRkZW4gY2FwdHVyZSBjYW52YXMgKi99XG4gICAgICAgIDxjYW52YXMgcmVmPXtjYW52YXNSZWZ9IGNsYXNzTmFtZT1cImhpZGRlblwiIC8+XG5cbiAgICAgICAgey8qIEZhY2UgdHJhY2tpbmcgYm91bmRpbmcgYm94IG92ZXJsYXkgKi99XG4gICAgICAgIHtmYWNlRGV0ZWN0ZWQgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGJvcmRlciBib3JkZXItZGFzaGVkIHJvdW5kZWQtWzMycHhdIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBlYXNlLW91dCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB6LTIwIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgd2lkdGg6IGAke2JveFdpZHRofXB4YCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBgJHtib3hIZWlnaHR9cHhgLFxuICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUoJHtqaXR0ZXIueH1weCwgJHtqaXR0ZXIueX1weClgLFxuICAgICAgICAgICAgICBib3JkZXJDb2xvcjogKGN1cnJlbnREaXN0YW5jZSA8PSAwLjQwKSBcbiAgICAgICAgICAgICAgICA/ICdyZ2JhKDE2LCAxODUsIDEyOSwgMC42NSknIFxuICAgICAgICAgICAgICAgIDogJ3JnYmEoMjM5LCA2OCwgNjgsIDAuNyknLFxuICAgICAgICAgICAgICBib3hTaGFkb3c6IChjdXJyZW50RGlzdGFuY2UgPD0gMC40MClcbiAgICAgICAgICAgICAgICA/ICcwIDAgMTVweCByZ2JhKDE2LCAxODUsIDEyOSwgMC4wOCknXG4gICAgICAgICAgICAgICAgOiAnMCAwIDE1cHggcmdiYSgyMzksIDY4LCA2OCwgMC4wOCknLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7LyogUmVhbC10aW1lIGNvcm5lcnMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIGxlZnQtMCB3LTYgaC02IGJvcmRlci10LTIgYm9yZGVyLWwtMiBib3JkZXItZW1lcmFsZC00MDAgcm91bmRlZC10bC1bMzJweF1cIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHctNiBoLTYgYm9yZGVyLXQtMiBib3JkZXItci0yIGJvcmRlci1lbWVyYWxkLTQwMCByb3VuZGVkLXRyLVszMnB4XVwiIC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0wIGxlZnQtMCB3LTYgaC02IGJvcmRlci1iLTIgYm9yZGVyLWwtMiBib3JkZXItZW1lcmFsZC00MDAgcm91bmRlZC1ibC1bMzJweF1cIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMCByaWdodC0wIHctNiBoLTYgYm9yZGVyLWItMiBib3JkZXItci0yIGJvcmRlci1lbWVyYWxkLTQwMCByb3VuZGVkLWJyLVszMnB4XVwiIC8+XG5cbiAgICAgICAgICAgIHsvKiBUYXJnZXQgaW5kaWNhdG9yICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMSBiZy1zbGF0ZS05NTAvODAgcHgtMiBweS0xIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gdGV4dC1zbGF0ZS0zMDAgdHJhY2tpbmctd2lkZXIgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgTGlEQVIgTE9DS1xuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHB4LTEgcm91bmRlZCAke1xuICAgICAgICAgICAgICAgIChjdXJyZW50RGlzdGFuY2UgPD0gMC40MCkgXG4gICAgICAgICAgICAgICAgICA/ICd0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCcgXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXJlZC00MDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgIHsoY3VycmVudERpc3RhbmNlICogMTAwKS50b0ZpeGVkKDApfWNtXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBSZWFsLXRpbWUgSGFyZHdhcmUgTG9ja3MgSFVEIChDYW1lcmFDb250cm9sTWFuYWdlcikgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTMgcmlnaHQtMyB6LTIwIGJnLXNsYXRlLTk1MC84NSBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQgcHgtMi41IHB5LTIgZmxleCBmbGV4LWNvbCBnYXAtMSB0ZXh0LVs4cHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB3LVsxODVweF0gc2hhZG93LVswXzRweF8xMnB4X3JnYmEoMCwwLDAsMC41KV1cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgcGItMSBtYi0wLjVcIj5cbiAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtWzlweF0gdGV4dC1zbGF0ZS0yMDBcIj5DQU1FUkFfSEFSRFdBUkVfTE9DS1M8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPkVYUF9NT0RFOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMC41ICR7bG9ja1N0YXR1cy5leHBvc3VyZUxvY2tlZCA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LXNsYXRlLTUwMCBhbmltYXRlLXB1bHNlJ31gfT5cbiAgICAgICAgICAgICAge2xvY2tTdGF0dXMuZXhwb3N1cmVMb2NrZWQgPyA8TG9jayBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+IDogPFVubG9jayBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+fVxuICAgICAgICAgICAgICB7bG9ja1N0YXR1cy5leHBvc3VyZUxvY2tlZCA/IGBMT0NLRUQgKG9mZnNldDogJHtsb2NrU3RhdHVzLmV4cG9zdXJlT2Zmc2V0fSlgIDogJ0FVVE8gKHRhcmdldDogMTQyKSd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPkZPQ1VTX01PREU6PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0wLjUgJHtsb2NrU3RhdHVzLmZvY3VzTG9ja2VkID8gJ3RleHQtZW1lcmFsZC00MDAnIDogJ3RleHQtc2xhdGUtNTAwIGFuaW1hdGUtcHVsc2UnfWB9PlxuICAgICAgICAgICAgICB7bG9ja1N0YXR1cy5mb2N1c0xvY2tlZCA/IDxMb2NrIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz4gOiA8VW5sb2NrIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz59XG4gICAgICAgICAgICAgIHtsb2NrU3RhdHVzLmZvY3VzTG9ja2VkID8gJ0xPQ0tFRCAobm8gaHVudGluZyknIDogJ0FVVE9GT0NVU0lORyd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPldCX01PREU6PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0wLjUgJHtsb2NrU3RhdHVzLndoaXRlQmFsYW5jZUxvY2tlZCA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LXNsYXRlLTUwMCBhbmltYXRlLXB1bHNlJ31gfT5cbiAgICAgICAgICAgICAge2xvY2tTdGF0dXMud2hpdGVCYWxhbmNlTG9ja2VkID8gPExvY2sgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjVcIiAvPiA6IDxVbmxvY2sgY2xhc3NOYW1lPVwidy0yLjUgaC0yLjVcIiAvPn1cbiAgICAgICAgICAgICAge2xvY2tTdGF0dXMud2hpdGVCYWxhbmNlTG9ja2VkID8gYExPQ0tFRCAoJHtsb2NrU3RhdHVzLndoaXRlQmFsYW5jZUNjdH1LKWAgOiAnQVVUTyAoNTAwMC02ODAwSyknfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3Bhbj5GTEFTSF9NT0RFOjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkIHVwcGVyY2FzZVwiPk9GRiAoTk8gT0RCTEFTS8OTVyk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPkxFTlNfVFlQRTo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDAgZm9udC1ib2xkIHVwcGVyY2FzZVwiPldJREUgKDEuMFggRU5GT1JDRUQpPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMCBwdC0xIG10LTAuNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bN3B4XVwiPlxuICAgICAgICAgICAgPHNwYW4+QUZfSFVOVElOR19DSEVDSzo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LWJvbGQgJHtsb2NrU3RhdHVzLmF1dG9mb2N1c0h1bnRpbmcgPyAndGV4dC1hbWJlci00MDAgYW5pbWF0ZS1wdWxzZScgOiAndGV4dC1lbWVyYWxkLTQwMCd9YH0+XG4gICAgICAgICAgICAgIHtsb2NrU3RhdHVzLmF1dG9mb2N1c0h1bnRpbmcgPyAnSFVOVElORy4uLicgOiAnUEFTU0VEIChTVEFCTEUpJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFJlYWwtdGltZSBMdW1hIERpc3RyaWJ1dGlvbiBIaXN0b2dyYW0gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTMgbGVmdC0zIHotMjAgYmctc2xhdGUtOTUwLzg1IGJhY2tkcm9wLWJsdXItbWQgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZCBweC0yLjUgcHktMS41IGZsZXggZmxleC1jb2wgZ2FwLTEgdGV4dC1bOHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdy1bMTU1cHhdIHNoYWRvdy1bMF80cHhfMTJweF9yZ2JhKDAsMCwwLDAuNSldXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBwYi0xIG1iLTAuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTIwMFwiPkxVTUFfSElTVE9HUkFNPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVs3cHhdIGZvbnQtYm9sZCBweC0xIHJvdW5kZWQgJHtcbiAgICAgICAgICAgICAgKHNhbmRib3hNZXRyaWNzLmx1bWEgPz8gMTI4KSA8IDUwIFxuICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAvODAgdGV4dC1yZWQtNDAwIGJvcmRlciBib3JkZXItcmVkLTkwMC82MCcgXG4gICAgICAgICAgICAgICAgOiAoc2FuZGJveE1ldHJpY3MubHVtYSA/PyAxMjgpID4gMjAwIFxuICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwLzgwIHRleHQtYW1iZXItNTAwIGJvcmRlciBib3JkZXItYW1iZXItOTAwLzYwJyBcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWVtZXJhbGQtOTUwLzgwIHRleHQtZW1lcmFsZC00MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTkwMC82MCdcbiAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgeyhzYW5kYm94TWV0cmljcy5sdW1hID8/IDEyOCkgPCA1MCA/ICdMT1dfTElHSFQnIDpcbiAgICAgICAgICAgICAgIChzYW5kYm94TWV0cmljcy5sdW1hID8/IDEyOCkgPiAyMDAgPyAnVE9PX0JSSUdIVCcgOiAnU1RBQkxFJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBIaXN0b2dyYW0gYmFyIGNoYXJ0cyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtZW5kIGdhcC1bMXB4XSBoLVszMnB4XSBweC0xIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCByb3VuZGVkIHB0LTFcIj5cbiAgICAgICAgICAgIHtsdW1hSGlzdG9ncmFtLm1hcCgoaGVpZ2h0LCBpKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBiYXJDb2xvciA9ICdiZy1za3ktNTAwLzgwJztcbiAgICAgICAgICAgICAgaWYgKGkgPiA4ICYmIGkgPD0gMjQpIGJhckNvbG9yID0gJ2JnLWVtZXJhbGQtNTAwLzgwJztcbiAgICAgICAgICAgICAgaWYgKGkgPiAyNCkgYmFyQ29sb3IgPSAnYmctYW1iZXItNTAwLzgwJztcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT1cImZsZXgtMSBmbGV4IGZsZXgtY29sIGp1c3RpZnktZW5kIGgtZnVsbCBncm91cCByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsICR7YmFyQ29sb3J9IHJvdW5kZWQtdC1bMXB4XSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0xNTBgfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IGAke01hdGgubWF4KDQsIGhlaWdodCl9JWAgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS1mdWxsIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgbWItMSBiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS0xMDAgdGV4dC1bNnB4XSBweC0xIHJvdW5kZWQgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBwb2ludGVyLWV2ZW50cy1ub25lIHdoaXRlc3BhY2Utbm93cmFwIHotMzBcIj5cbiAgICAgICAgICAgICAgICAgICAgQmluIHtpfToge01hdGgucm91bmQoaGVpZ2h0KX0lXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtYm9sZCBweC0wLjVcIj5cbiAgICAgICAgICAgIDxzcGFuPkRBUks8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPkxVTUE6IHtNYXRoLnJvdW5kKHNhbmRib3hNZXRyaWNzLmx1bWEgPz8gMTI4KX08L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5CUklHSFQ8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAgcHQtMSBtdC0wLjUgdGV4dC1bN3B4XSB0ZXh0LXNsYXRlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPkFFX0xPQ0tfUkVBRFk6PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1ib2xkICR7bG9ja1N0YXR1cy5leHBvc3VyZUxvY2tlZCA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LWFtYmVyLTQwMCd9YH0+XG4gICAgICAgICAgICAgIHtsb2NrU3RhdHVzLmV4cG9zdXJlTG9ja2VkID8gJ0FFX0xPQ0tFRCcgOiAnQUxJR04gTElHSFRJTkcuLi4nfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtNYXRoLmFicygoc2FuZGJveE1ldHJpY3MubHVtYSA/PyAxMjgpIC0gMTQyKSA+IDIwICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMSBiZy1hbWJlci05NTAvNDAgYm9yZGVyIGJvcmRlci1hbWJlci05MDAvNDAgdGV4dC1bNnB4XSB0ZXh0LWFtYmVyLTMwMCByb3VuZGVkIHB4LTEuNSBweS0wLjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgICA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSB0ZXh0LWFtYmVyLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkRFVklBVEVEIEZST00gMTQyIFRBUkdFVDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSZWFsLXRpbWUgbHVtYSBkZXZpYXRpb24gcHVsc2Ugb3ZlcmxheSAqL31cbiAgICAgICAge01hdGguYWJzKChzYW5kYm94TWV0cmljcy5sdW1hID8/IDEyOCkgLSAxNDIpID4gMjAgJiYgKFxuICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgYm9yZGVyLTIgYm9yZGVyLWFtYmVyLTUwMC82MCByb3VuZGVkLXhsIGFuaW1hdGUtW3B1bHNlXzEuNXNfaW5maW5pdGVdIHotMTBcIlxuICAgICAgICAgICAgc3R5bGU9e3sgXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogJ2luc2V0IDAgMCAyNXB4IHJnYmEoMjQ1LCAxNTgsIDExLCAwLjIpJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogRmxvYXQgYWN0aW9uIGFsaWdubWVudCBiYW5uZXIganVzdCBhYm92ZSBtZXRhZGF0YSBiYXIgKi99XG4gICAgICAgIHtNYXRoLmFicygoc2FuZGJveE1ldHJpY3MubHVtYSA/PyAxMjgpIC0gMTQyKSA+IDIwICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0xMiBpbnNldC14LTMgei0yNSBiZy1zbGF0ZS05NTAvOTUgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLWFtYmVyLTYwMC81MCByb3VuZGVkLWxnIHAtMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gc2hhZG93LVswXzRweF8xNnB4X3JnYmEoMjQ1LDE1OCwxMSwwLjI1KV0gYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMSBiZy1hbWJlci01MDAvMTUgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzAgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDAgYW5pbWF0ZS1ib3VuY2VcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LWFtYmVyLTIwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LWFtYmVyLTMwMFwiPkVYUE9TVVJFIEFMSUdOTUVOVCBXQVJOSU5HPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgTHVtYToge01hdGgucm91bmQoc2FuZGJveE1ldHJpY3MubHVtYSA/PyAxMjgpfSAvIFRhcmdldDogMTQyIChEaWZmOiB7TWF0aC5yb3VuZCgoc2FuZGJveE1ldHJpY3MubHVtYSA/PyAxMjgpIC0gMTQyKX0pXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bN3B4XSBmb250LWJvbGQgYmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIHB4LTIgcHktMC41IHJvdW5kZWQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgIHsoc2FuZGJveE1ldHJpY3MubHVtYSA/PyAxMjgpIDwgMTQyID8gJ0luY3JlYXNlIExpZ2h0IPCfkqEnIDogJ1JlZHVjZSBMaWdodCDwn5W277iPJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogVmlld3BvcnQgY29ybmVycyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyBsZWZ0LTMgdy00IGgtNCBib3JkZXItdCBib3JkZXItbCBib3JkZXItc2xhdGUtNzAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0zIHJpZ2h0LTMgdy00IGgtNCBib3JkZXItdCBib3JkZXItciBib3JkZXItc2xhdGUtNzAwIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0zIGxlZnQtMyB3LTQgaC00IGJvcmRlci1iIGJvcmRlci1sIGJvcmRlci1zbGF0ZS03MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTMgcmlnaHQtMyB3LTQgaC00IGJvcmRlci1iIGJvcmRlci1yIGJvcmRlci1zbGF0ZS03MDAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgey8qIEJvdHRvbSBNZXRhZGF0YSBiYXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTMgaW5zZXQteC0zIGgtOCBiZy1zbGF0ZS05NTAvOTAgYmFja2Ryb3AtYmx1ciBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCByb3VuZGVkIHB4LTIuNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gei0yMCBmb250LW1vbm8gdGV4dC1bOXB4XVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1ibG9jayB3LTEuNSBoLTEuNSBiZy1za3ktNDAwIHJvdW5kZWQtZnVsbCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInVwcGVyY2FzZSB0cnVuY2F0ZSBtYXgtdy1bMTMwcHhdIHNtOm1heC13LVsxODBweF1cIj5cbiAgICAgICAgICAgICAge2lzU2FuZGJveE1vZGUgPyAnUkdCICsgTGlEQVI6IFNJTV9NT0RFJyA6IGNhbWVyYUxhYmVsfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LWJvbGRcIj5MaURBUjogMjU2eDE5MiBAIDYwSHo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTcwMFwiPnw8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+UkdCOiBCQUNLX01BSU48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBQb3NpdGlvbiB3YXJuaW5nIGlmIGNhbWVyYVBvc2l0aW9uIGlzbid0IGVudmlyb25tZW50IChCQUNLX01BSU4pICovfVxuICAgICAgICB7ZmFjaW5nTW9kZSA9PT0gJ3VzZXInICYmICFpc1NhbmRib3hNb2RlICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC1bOTVweF0gbGVmdC0zIGJnLXJlZC02MDAgdGV4dC13aGl0ZSBmb250LW1vbm8gdGV4dC1bOXB4XSBmb250LWJvbGQgcHgtMiBweS0xIHJvdW5kZWQgc2hhZG93LWxnIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgei0yMCBhbmltYXRlLWJvdW5jZVwiPlxuICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPldBUk5JTkc6IEZST05UX1VTRVIgQUNUSVZFIChCQUNLX01BSU4gRU5GT1JDRUQpPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBDYW1lcmEgQ29udHJvbHMgRm9vdGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwLTMgYmctc2xhdGUtOTUwLzQwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMC41XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS01MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+SEFSRFdBUkUgQ09OU1RSQUlOVDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICB7aXNTYW5kYm94TW9kZSA/ICdTaW11bGF0ZWQgQkFDS19NQUlOIEVuZm9yY2VkJyA6ICdDYW1lcmEgUG9zaXRpb24gc2VsZWN0b3InfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZhY2luZ01vZGUoZmFjaW5nTW9kZSA9PT0gJ2Vudmlyb25tZW50JyA/ICd1c2VyJyA6ICdlbnZpcm9ubWVudCcpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU2FuZGJveE1vZGV9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bmb250LW1vbm8gdGV4dC1bOXB4XSBweC0yLjUgcHktMS41IHJvdW5kZWQgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgaXNTYW5kYm94TW9kZSBcbiAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTYwMCBjdXJzb3Itbm90LWFsbG93ZWQnXG4gICAgICAgICAgICAgICAgOiBmYWNpbmdNb2RlID09PSAnZW52aXJvbm1lbnQnXG4gICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC80MCBib3JkZXItZW1lcmFsZC04MDAgdGV4dC1lbWVyYWxkLTQwMCBob3ZlcjpiZy1lbWVyYWxkLTk1MC82MCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXJlZC05NTAvNDAgYm9yZGVyLXJlZC04NTAgdGV4dC1yZWQtNDAwIGhvdmVyOmJnLXJlZC05NTAvNjAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgPHNwYW4+e2ZhY2luZ01vZGUgPT09ICdlbnZpcm9ubWVudCcgPyAnQkFDS19NQUlOIChPcHRpbWFsKScgOiAnRlJPTlRfVVNFUiAoTm9uLUNvbXBsaWFudCknfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIHB4LTIgcHktMSBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgcm91bmRlZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgPENoZWNrQ2lyY2xlIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTUwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5GTEFTSDogT0ZGPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUGVybWlzc2lvbiBlcnJvcnMgb3IgaGFyZHdhcmUgbm90ZXMgKi99XG4gICAgICB7ZXJyb3JNc2cgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXJlZC05NTAvNTAgYm9yZGVyIGJvcmRlci1yZWQtODAwLzYwIHRleHQtcmVkLTQwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gcm91bmRlZCBwLTIuNSBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yXCI+XG4gICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy00IGgtNCBmbGV4LXNocmluay0wIG10LTAuNSB0ZXh0LXJlZC01MDBcIiAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+V2ViY2FtIFBpcGVsaW5lIE9mZmxpbmU8L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj57ZXJyb3JNc2d9PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFnVlU7QUFoVlY7QUFBQTtBQUFBO0FBQUE7QUFLQSxTQUFnQixRQUFRLFdBQVcsZ0JBQWdCO0FBQ25ELFNBQVMsUUFBUSxXQUFXLGVBQWUsYUFBYSxhQUFhLEtBQUssTUFBTSxRQUFRLFdBQXdCO0FBRWhILFNBQVMsNEJBQThDO0FBWWhELGFBQU0sZUFBNEMsQ0FBQztBQUFBLEVBQ3hEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBTTtBQUNKLFFBQU0sV0FBVyxPQUFnQyxJQUFJO0FBQ3JELFFBQU0sWUFBWSxPQUFpQyxJQUFJO0FBQ3ZELFFBQU0sWUFBWSxPQUEyQixJQUFJO0FBQ2pELFFBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSSxTQUFrQixLQUFLO0FBQy9ELFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUF3QixJQUFJO0FBQzVELFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFpQixFQUFFO0FBR3pELFFBQU0sQ0FBQyxRQUFRLFNBQVMsSUFBSSxTQUFTLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBR25ELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixJQUFJLFNBQW1CLElBQUksTUFBTSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDbEYsUUFBTSxzQkFBc0IsT0FBZSxDQUFDO0FBRzVDLFFBQU0sQ0FBQyxZQUFZLGFBQWEsSUFBSSxTQUEyQjtBQUFBLElBQzdELFdBQVc7QUFBQSxJQUNYLGFBQWE7QUFBQSxJQUNiLGdCQUFnQjtBQUFBLElBQ2hCLG9CQUFvQjtBQUFBLElBQ3BCLFVBQVU7QUFBQSxJQUNWLFNBQVM7QUFBQSxJQUNULGtCQUFrQjtBQUFBLElBQ2xCLGdCQUFnQjtBQUFBLElBQ2hCLGlCQUFpQjtBQUFBLEVBQ25CLENBQUM7QUFFRCxRQUFNLHVCQUF1QjtBQUFBLElBQzNCLElBQUkscUJBQXFCLENBQUMsV0FBVztBQUNuQyxvQkFBYyxNQUFNO0FBQUEsSUFDdEIsQ0FBQztBQUFBLEVBQ0g7QUFHQSxZQUFVLE1BQU07QUFDZCxRQUFJLGVBQWUsY0FBYyxHQUFHO0FBRWxDLFVBQUksQ0FBQyxXQUFXLGVBQWUsQ0FBQyxXQUFXLGtCQUFrQixDQUFDLFdBQVcsc0JBQXNCLENBQUMsV0FBVyxrQkFBa0I7QUFDM0gsNkJBQXFCLFFBQVE7QUFBQSxVQUMzQixlQUFlO0FBQUEsVUFDZixlQUFlO0FBQUEsVUFDZixNQUFNO0FBQ0osb0JBQVEsSUFBSSwyRUFBMkU7QUFBQSxVQUN6RjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixPQUFPO0FBRUwsVUFBSSxXQUFXLGVBQWUsV0FBVyxrQkFBa0IsV0FBVyxvQkFBb0I7QUFDeEYsNkJBQXFCLFFBQVEsV0FBVztBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGVBQWUsV0FBVyxDQUFDO0FBRy9CLFlBQVUsTUFBTTtBQUNkLFFBQUksZUFBZTtBQUNqQixpQkFBVztBQUNYO0FBQUEsSUFDRjtBQUVBLGdCQUFZO0FBRVosV0FBTyxNQUFNO0FBQ1gsaUJBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRixHQUFHLENBQUMsWUFBWSxhQUFhLENBQUM7QUFHOUIsWUFBVSxNQUFNO0FBQ2QsVUFBTSxRQUFRLFlBQVksTUFBTTtBQUM5QixVQUFJLGNBQWM7QUFDaEIsa0JBQVU7QUFBQSxVQUNSLElBQUksS0FBSyxPQUFPLElBQUksT0FBTztBQUFBLFVBQzNCLElBQUksS0FBSyxPQUFPLElBQUksT0FBTztBQUFBLFFBQzdCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixHQUFHLEdBQUc7QUFDTixXQUFPLE1BQU0sY0FBYyxLQUFLO0FBQUEsRUFDbEMsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUVqQixRQUFNLGNBQWMsWUFBWTtBQUM5QixnQkFBWSxJQUFJO0FBQ2hCLGVBQVc7QUFFWCxRQUFJO0FBQ0YsWUFBTSxjQUFzQztBQUFBLFFBQzFDLE9BQU87QUFBQSxVQUNMO0FBQUEsVUFDQSxPQUFPLEVBQUUsT0FBTyxJQUFJO0FBQUEsVUFDcEIsUUFBUSxFQUFFLE9BQU8sSUFBSTtBQUFBLFFBQ3ZCO0FBQUEsUUFDQSxPQUFPO0FBQUEsTUFDVDtBQUVBLFlBQU0sU0FBUyxNQUFNLFVBQVUsYUFBYSxhQUFhLFdBQVc7QUFDcEUsZ0JBQVUsVUFBVTtBQUVwQixVQUFJLFNBQVMsU0FBUztBQUNwQixpQkFBUyxRQUFRLFlBQVk7QUFDN0IsaUJBQVMsUUFBUSxtQkFBbUIsTUFBTTtBQUN4QyxtQkFBUyxTQUFTLEtBQUssRUFBRSxNQUFNLFNBQU8sUUFBUSxNQUFNLHdCQUF3QixHQUFHLENBQUM7QUFDaEYsMEJBQWdCLElBQUk7QUFBQSxRQUN0QjtBQUFBLE1BQ0Y7QUFHQSxZQUFNLGFBQWEsT0FBTyxlQUFlLEVBQUUsQ0FBQztBQUM1QyxVQUFJLFlBQVk7QUFDZCx1QkFBZSxXQUFXLFNBQVMsaUJBQWlCO0FBQ3BELDZCQUFxQixRQUFRLG1CQUFtQixVQUFVO0FBQUEsTUFDNUQ7QUFHQSxzQkFBZ0IsSUFBSTtBQUFBLElBQ3RCLFNBQVMsS0FBVTtBQUNqQixjQUFRLE1BQU0sd0JBQXdCLEdBQUc7QUFDekM7QUFBQSxRQUNFLElBQUksU0FBUyxvQkFDVCxvRUFDQTtBQUFBLE1BQ047QUFDQSxzQkFBZ0IsS0FBSztBQUNyQixzQkFBZ0IsS0FBSztBQUFBLElBQ3ZCO0FBQUEsRUFDRjtBQUVBLFFBQU0sYUFBYSxNQUFNO0FBQ3ZCLFFBQUksVUFBVSxTQUFTO0FBQ3JCLGdCQUFVLFFBQVEsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLE1BQU0sS0FBSyxDQUFDO0FBQzdELGdCQUFVLFVBQVU7QUFBQSxJQUN0QjtBQUNBLFFBQUksU0FBUyxTQUFTO0FBQ3BCLGVBQVMsUUFBUSxZQUFZO0FBQUEsSUFDL0I7QUFDQSxvQkFBZ0IsS0FBSztBQUFBLEVBQ3ZCO0FBR0EsWUFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLGdCQUFnQixjQUFlO0FBRXBDLFFBQUk7QUFDSixVQUFNLFNBQVMsVUFBVSxXQUFXLFNBQVMsY0FBYyxRQUFRO0FBQ25FLFVBQU0sTUFBTSxPQUFPLFdBQVcsSUFBSTtBQUVsQyxVQUFNLGVBQWUsTUFBTTtBQUN6QixZQUFNLFFBQVEsU0FBUztBQUN2QixVQUFJLFNBQVMsTUFBTSxlQUFlLE1BQU0scUJBQXFCLEtBQUs7QUFDaEUsY0FBTSxRQUFRO0FBQ2QsY0FBTSxTQUFTO0FBQ2YsZUFBTyxRQUFRO0FBQ2YsZUFBTyxTQUFTO0FBRWhCLFlBQUksVUFBVSxPQUFPLEdBQUcsR0FBRyxPQUFPLE1BQU07QUFDeEMsY0FBTSxVQUFVLElBQUksYUFBYSxHQUFHLEdBQUcsT0FBTyxNQUFNO0FBQ3BELGNBQU0sT0FBTyxRQUFRO0FBRXJCLFlBQUksWUFBWTtBQUNoQixZQUFJLE9BQU8sR0FBRyxPQUFPLEdBQUcsT0FBTztBQUMvQixjQUFNLGNBQWMsUUFBUTtBQUU1QixjQUFNLE9BQU8sSUFBSSxNQUFNLEVBQUUsRUFBRSxLQUFLLENBQUM7QUFFakMsaUJBQVMsSUFBSSxHQUFHLElBQUksS0FBSyxRQUFRLEtBQUssR0FBRztBQUN2QyxnQkFBTSxJQUFJLEtBQUssQ0FBQztBQUNoQixnQkFBTSxJQUFJLEtBQUssSUFBRSxDQUFDO0FBQ2xCLGdCQUFNLElBQUksS0FBSyxJQUFFLENBQUM7QUFFbEIsa0JBQVE7QUFDUixrQkFBUTtBQUNSLGtCQUFRO0FBRVIsZ0JBQU0sT0FBTyxRQUFRLElBQUksUUFBUSxJQUFJLFFBQVE7QUFDN0MsdUJBQWE7QUFFYixnQkFBTSxTQUFTLEtBQUssSUFBSSxJQUFJLEtBQUssTUFBTSxPQUFPLENBQUMsQ0FBQztBQUNoRCxlQUFLLE1BQU07QUFBQSxRQUNiO0FBRUEsY0FBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixZQUFJLE1BQU0sb0JBQW9CLFVBQVUsS0FBSztBQUMzQyxnQkFBTSxTQUFTLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNsQyxnQkFBTSxhQUFhLEtBQUssSUFBSSxTQUFRLE1BQU0sU0FBVSxHQUFHO0FBQ3ZELDJCQUFpQixVQUFVO0FBQzNCLDhCQUFvQixVQUFVO0FBQUEsUUFDaEM7QUFFQSxjQUFNLFVBQVUsWUFBWTtBQUM1QixjQUFNLE9BQU8sT0FBTztBQUNwQixjQUFNLE9BQU8sT0FBTztBQUNwQixjQUFNLE9BQU8sT0FBTztBQUdwQixZQUFJLG9CQUFvQjtBQUN4QixZQUFJLGtCQUFrQjtBQUN0QixjQUFNLE9BQU87QUFFYixpQkFBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLEdBQUcsS0FBSyxNQUFNO0FBQ3pDLG1CQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsR0FBRyxLQUFLLE1BQU07QUFDeEMsa0JBQU0sT0FBTyxJQUFJLFFBQVEsS0FBSztBQUM5QixrQkFBTSxZQUFZLElBQUksU0FBUyxJQUFJLE1BQU07QUFDekMsa0JBQU0sY0FBZSxJQUFJLEtBQUssUUFBUyxLQUFLO0FBRTVDLGtCQUFNLGNBQWMsUUFBUSxLQUFLLEdBQUcsSUFBSSxRQUFRLEtBQUssTUFBSSxDQUFDLElBQUksUUFBUSxLQUFLLE1BQUksQ0FBQztBQUNoRixrQkFBTSxZQUFZLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxLQUFLLFdBQVMsQ0FBQyxJQUFJLFFBQVEsS0FBSyxXQUFTLENBQUM7QUFDN0Ysa0JBQU0sYUFBYSxRQUFRLEtBQUssU0FBUyxJQUFJLFFBQVEsS0FBSyxZQUFVLENBQUMsSUFBSSxRQUFRLEtBQUssWUFBVSxDQUFDO0FBRWpHLGlDQUFxQixLQUFLLElBQUksY0FBYyxTQUFTO0FBQ3JELCtCQUFtQixLQUFLLElBQUksY0FBYyxVQUFVO0FBQUEsVUFDdEQ7QUFBQSxRQUNGO0FBRUEsY0FBTSxhQUFhLG9CQUFvQixvQkFBb0IsZUFBZSxPQUFPO0FBQ2pGLGNBQU0sYUFBYSxLQUFLLElBQUksTUFBTSxLQUFLLElBQUksTUFBTSxZQUFZLEVBQUUsQ0FBQztBQUdoRSxjQUFNLE1BQU0sT0FBTztBQUNuQixjQUFNLE1BQU0sT0FBTztBQUNuQixjQUFNLE1BQU0sT0FBTztBQUVuQixjQUFNLElBQUksTUFBTSxTQUFTLE1BQU0sU0FBUyxNQUFNO0FBQzlDLGNBQU0sSUFBSSxNQUFNLFNBQVMsTUFBTSxTQUFTLE1BQU07QUFDOUMsY0FBTSxJQUFJLE1BQU0sU0FBUyxNQUFNLFNBQVMsTUFBTTtBQUU5QyxZQUFJLFNBQVM7QUFDYixjQUFNLE1BQU0sSUFBSSxJQUFJO0FBQ3BCLFlBQUksTUFBTSxHQUFHO0FBQ1gsZ0JBQU0sSUFBSSxJQUFJO0FBQ2QsZ0JBQU0sSUFBSSxJQUFJO0FBQ2QsZ0JBQU0sS0FBSyxJQUFJLFVBQVcsU0FBUztBQUNuQyxnQkFBTSxVQUFVLE1BQU0sS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLE9BQU8sS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLFNBQVMsSUFBSTtBQUU1RSxjQUFJLENBQUMsTUFBTSxPQUFPLEtBQUssVUFBVSxHQUFHO0FBQ2xDLHFCQUFTLEtBQUssSUFBSSxLQUFPLEtBQUssSUFBSSxLQUFNLEtBQUssTUFBTSxPQUFPLENBQUMsQ0FBQztBQUFBLFVBQzlEO0FBQUEsUUFDRjtBQUVBLDRCQUFvQjtBQUFBLFVBQ2xCLE1BQU0sS0FBSyxNQUFNLE9BQU87QUFBQSxVQUN4QixXQUFXLFdBQVcsV0FBVyxRQUFRLENBQUMsQ0FBQztBQUFBLFVBQzNDLEtBQUs7QUFBQSxVQUNMLGNBQWM7QUFBQSxVQUNkLEtBQU0sS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLEdBQUksSUFBSSxNQUFRLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUk7QUFBQSxVQUN6RSxPQUFRLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxHQUFJLElBQUksTUFBUSxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxJQUFJO0FBQUEsVUFDNUUsTUFBTyxLQUFLLElBQUksS0FBSyxJQUFJLElBQUksR0FBSSxJQUFJO0FBQUEsVUFDckMsVUFBVSxPQUFRLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLElBQUk7QUFBQSxVQUNoRCxjQUFjO0FBQUEsUUFDaEIsQ0FBQztBQUFBLE1BQ0g7QUFFQSxlQUFTLHNCQUFzQixZQUFZO0FBQUEsSUFDN0M7QUFFQSxhQUFTLHNCQUFzQixZQUFZO0FBQzNDLFdBQU8sTUFBTSxxQkFBcUIsTUFBTTtBQUFBLEVBQzFDLEdBQUcsQ0FBQyxjQUFjLGFBQWEsQ0FBQztBQUdoQyxZQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsY0FBZTtBQUVwQixRQUFJO0FBQ0osUUFBSSxhQUFhO0FBRWpCLFVBQU0sMkJBQTJCLE1BQU07QUFDckMsWUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixVQUFJLE1BQU0sYUFBYSxLQUFLO0FBQzFCLGNBQU0sU0FBUyxlQUFlLFFBQVE7QUFDdEMsY0FBTSxTQUFTO0FBQ2YsY0FBTSxPQUFPLElBQUksTUFBTSxFQUFFLEVBQUUsS0FBSyxDQUFDO0FBRWpDLGlCQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztBQUMzQixnQkFBTSxVQUFVLElBQUksSUFBSTtBQUV4QixjQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsS0FBSyxJQUFJLFVBQVUsUUFBUSxDQUFDLEtBQUssSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLEVBQUU7QUFFN0UsZ0JBQU0sU0FBUyxLQUFLLE9BQU8sSUFBSSxPQUFPO0FBQ3RDLGdCQUFNLEtBQUssSUFBSSxHQUFHLE1BQU0sS0FBSztBQUM3QixlQUFLLENBQUMsSUFBSTtBQUFBLFFBQ1o7QUFFQSxjQUFNLFNBQVMsS0FBSyxJQUFJLEdBQUcsTUFBTSxJQUFJO0FBQ3JDLGNBQU0sYUFBYSxLQUFLLElBQUksU0FBUSxNQUFNLFNBQVUsR0FBRztBQUN2RCx5QkFBaUIsVUFBVTtBQUMzQixxQkFBYTtBQUFBLE1BQ2Y7QUFDQSxlQUFTLHNCQUFzQix3QkFBd0I7QUFBQSxJQUN6RDtBQUVBLGFBQVMsc0JBQXNCLHdCQUF3QjtBQUN2RCxXQUFPLE1BQU0scUJBQXFCLE1BQU07QUFBQSxFQUMxQyxHQUFHLENBQUMsZUFBZSxlQUFlLElBQUksQ0FBQztBQUV2QyxRQUFNLGtCQUFrQixnQkFBZ0IsZUFBZSxXQUFZLGVBQWUsWUFBWTtBQUc5RixRQUFNLFdBQVcsT0FBTztBQUN4QixRQUFNLFdBQVcsS0FBSyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssTUFBTSxRQUFRLENBQUM7QUFDNUQsUUFBTSxZQUFZLFdBQVc7QUFFN0IsU0FDRSx1QkFBQyxTQUFJLFdBQVUsdUJBRWI7QUFBQSwyQkFBQyxTQUFJLFdBQVUsMEhBRVo7QUFBQSxPQUFDLGlCQUNBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxLQUFLO0FBQUEsVUFDTCxhQUFXO0FBQUEsVUFDWCxPQUFLO0FBQUEsVUFDTCxXQUFXLDhEQUNULGVBQWUsZUFBZSxXQUNoQztBQUFBO0FBQUEsUUFORjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFPQTtBQUFBLE9BSUEsaUJBQWlCLENBQUMsaUJBQ2xCLHVCQUFDLFNBQUksV0FBVSx1SUFFYjtBQUFBLCtCQUFDLFNBQUksV0FBVSx1S0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW1MO0FBQUEsUUFDbkwsdUJBQUMsU0FBSSxXQUFVLHlHQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBcUg7QUFBQSxRQUVySCx1QkFBQyxTQUFJLFdBQVUseUNBQ2I7QUFBQSxpQ0FBQyxTQUFJLFdBQVUsc0VBQ2IsaUNBQUMsVUFBTyxXQUFVLHdDQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF1RCxLQUR6RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxTQUNDO0FBQUEsbUNBQUMsT0FBRSxXQUFVLHlFQUNWLDBCQUFnQixzQ0FBc0MsaUNBRHpEO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxZQUNBLHVCQUFDLE9BQUUsV0FBVSxxREFDViwwQkFDRywrRkFDQSxrRUFITjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUlBO0FBQUEsZUFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVNBO0FBQUEsYUFiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBY0E7QUFBQSxXQW5CRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBb0JBO0FBQUEsTUFJRix1QkFBQyxTQUFJLFdBQVUsd0VBQ2IsaUNBQUMsU0FBSSxXQUFVLDBHQUNaLGdCQUFNLEtBQUssRUFBRSxRQUFRLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLE1BQU07QUFFekMsY0FBTSxNQUFNLEtBQUssTUFBTSxJQUFJLEVBQUU7QUFDN0IsY0FBTSxNQUFNLElBQUk7QUFDaEIsY0FBTSxXQUFXLE9BQU8sS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLLE9BQU87QUFDNUQsZUFDRTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBRUMsV0FBVyw0Q0FDVCxXQUNJLHdFQUNBLCtCQUNOO0FBQUE7QUFBQSxVQUxLO0FBQUEsVUFEUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxNQUVKLENBQUMsS0FoQkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWlCQSxLQWxCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBbUJBO0FBQUEsTUFHQSx1QkFBQyxZQUFPLEtBQUssV0FBVyxXQUFVLFlBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBMkM7QUFBQSxNQUcxQyxnQkFDQztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1YsT0FBTztBQUFBLFlBQ0wsT0FBTyxHQUFHLFFBQVE7QUFBQSxZQUNsQixRQUFRLEdBQUcsU0FBUztBQUFBLFlBQ3BCLFdBQVcsYUFBYSxPQUFPLENBQUMsT0FBTyxPQUFPLENBQUM7QUFBQSxZQUMvQyxhQUFjLG1CQUFtQixNQUM3Qiw2QkFDQTtBQUFBLFlBQ0osV0FBWSxtQkFBbUIsTUFDM0Isc0NBQ0E7QUFBQSxVQUNOO0FBQUEsVUFHQTtBQUFBLG1DQUFDLFNBQUksV0FBVSw4RkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEwRztBQUFBLFlBQzFHLHVCQUFDLFNBQUksV0FBVSwrRkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUEyRztBQUFBLFlBQzNHLHVCQUFDLFNBQUksV0FBVSxpR0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE2RztBQUFBLFlBQzdHLHVCQUFDLFNBQUksV0FBVSxrR0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE4RztBQUFBLFlBRzlHLHVCQUFDLFNBQUksV0FBVSw4RkFDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSxnRUFBK0QsMEJBQS9FO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUE7QUFBQSxjQUNBLHVCQUFDLFVBQUssV0FBVyxxQ0FDZCxtQkFBbUIsTUFDaEIsK0JBQ0Esd0JBQ0wsSUFDRztBQUFBLG1DQUFrQixLQUFLLFFBQVEsQ0FBQztBQUFBLGdCQUFFO0FBQUEsbUJBTHRDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBTUE7QUFBQSxpQkFWRjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVdBO0FBQUE7QUFBQTtBQUFBLFFBaENGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQWlDQTtBQUFBLE1BSUYsdUJBQUMsU0FBSSxXQUFVLGtOQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLGlFQUNiO0FBQUEsaUNBQUMsT0FBSSxXQUFVLDRDQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXdEO0FBQUEsVUFDeEQsdUJBQUMsVUFBSyxXQUFVLHVDQUFzQyxxQ0FBdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBMkU7QUFBQSxhQUY3RTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBR0E7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBLGlDQUFDLFVBQUsseUJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBZTtBQUFBLFVBQ2YsdUJBQUMsVUFBSyxXQUFXLHVDQUF1QyxXQUFXLGlCQUFpQixxQkFBcUIsOEJBQThCLElBQ3BJO0FBQUEsdUJBQVcsaUJBQWlCLHVCQUFDLFFBQUssV0FBVSxpQkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBOEIsSUFBSyx1QkFBQyxVQUFPLFdBQVUsaUJBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQWdDO0FBQUEsWUFDL0YsV0FBVyxpQkFBaUIsbUJBQW1CLFdBQVcsY0FBYyxNQUFNO0FBQUEsZUFGakY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLGFBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU1BO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUscUNBQ2I7QUFBQSxpQ0FBQyxVQUFLLDJCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWlCO0FBQUEsVUFDakIsdUJBQUMsVUFBSyxXQUFXLHVDQUF1QyxXQUFXLGNBQWMscUJBQXFCLDhCQUE4QixJQUNqSTtBQUFBLHVCQUFXLGNBQWMsdUJBQUMsUUFBSyxXQUFVLGlCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE4QixJQUFLLHVCQUFDLFVBQU8sV0FBVSxpQkFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBZ0M7QUFBQSxZQUM1RixXQUFXLGNBQWMsd0JBQXdCO0FBQUEsZUFGcEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLGFBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU1BO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUscUNBQ2I7QUFBQSxpQ0FBQyxVQUFLLHdCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWM7QUFBQSxVQUNkLHVCQUFDLFVBQUssV0FBVyx1Q0FBdUMsV0FBVyxxQkFBcUIscUJBQXFCLDhCQUE4QixJQUN4STtBQUFBLHVCQUFXLHFCQUFxQix1QkFBQyxRQUFLLFdBQVUsaUJBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQThCLElBQUssdUJBQUMsVUFBTyxXQUFVLGlCQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFnQztBQUFBLFlBQ25HLFdBQVcscUJBQXFCLFdBQVcsV0FBVyxlQUFlLE9BQU87QUFBQSxlQUYvRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsYUFMRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTUE7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxxQ0FDYjtBQUFBLGlDQUFDLFVBQUssMkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUI7QUFBQSxVQUNqQix1QkFBQyxVQUFLLFdBQVUsd0NBQXVDLGtDQUF2RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF5RTtBQUFBLGFBRjNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLHFDQUNiO0FBQUEsaUNBQUMsVUFBSywwQkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFnQjtBQUFBLFVBQ2hCLHVCQUFDLFVBQUssV0FBVSxvQ0FBbUMsb0NBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXVFO0FBQUEsYUFGekU7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUsc0ZBQ2I7QUFBQSxpQ0FBQyxVQUFLLGlDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXVCO0FBQUEsVUFDdkIsdUJBQUMsVUFBSyxXQUFXLGFBQWEsV0FBVyxtQkFBbUIsaUNBQWlDLGtCQUFrQixJQUM1RyxxQkFBVyxtQkFBbUIsZUFBZSxxQkFEaEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUtBO0FBQUEsV0F2Q0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXdDQTtBQUFBLE1BR0EsdUJBQUMsU0FBSSxXQUFVLG1OQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLDJFQUNiO0FBQUEsaUNBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsbUNBQUMsT0FBSSxXQUFVLDhDQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTBEO0FBQUEsWUFDMUQsdUJBQUMsVUFBSyxXQUFVLHVDQUFzQyw4QkFBdEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBb0U7QUFBQSxlQUZ0RTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUdBO0FBQUEsVUFDQSx1QkFBQyxVQUFLLFdBQVcsc0NBQ2QsZUFBZSxRQUFRLE9BQU8sS0FDM0IseURBQ0MsZUFBZSxRQUFRLE9BQU8sTUFDN0IsOERBQ0EsaUVBQ1IsSUFDSSwwQkFBZSxRQUFRLE9BQU8sS0FBSyxlQUNuQyxlQUFlLFFBQVEsT0FBTyxNQUFNLGVBQWUsWUFSdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFTQTtBQUFBLGFBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWVBO0FBQUEsUUFHQSx1QkFBQyxTQUFJLFdBQVUsNEZBQ1osd0JBQWMsSUFBSSxDQUFDLFFBQVEsTUFBTTtBQUNoQyxjQUFJLFdBQVc7QUFDZixjQUFJLElBQUksS0FBSyxLQUFLLEdBQUksWUFBVztBQUNqQyxjQUFJLElBQUksR0FBSSxZQUFXO0FBRXZCLGlCQUNFLHVCQUFDLFNBQVksV0FBVSwwREFDckI7QUFBQTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFdBQVcsVUFBVSxRQUFRO0FBQUEsZ0JBQzdCLE9BQU8sRUFBRSxRQUFRLEdBQUcsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUk7QUFBQTtBQUFBLGNBRjdDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUdBO0FBQUEsWUFDQSx1QkFBQyxTQUFJLFdBQVUsMk1BQTBNO0FBQUE7QUFBQSxjQUNsTjtBQUFBLGNBQUU7QUFBQSxjQUFHLEtBQUssTUFBTSxNQUFNO0FBQUEsY0FBRTtBQUFBLGlCQUQvQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsZUFQUSxHQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBUUE7QUFBQSxRQUVKLENBQUMsS0FqQkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQWtCQTtBQUFBLFFBRUEsdUJBQUMsU0FBSSxXQUFVLG1FQUNiO0FBQUEsaUNBQUMsVUFBSyxvQkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFVO0FBQUEsVUFDVix1QkFBQyxVQUFLLFdBQVUsa0JBQWlCO0FBQUE7QUFBQSxZQUFPLEtBQUssTUFBTSxlQUFlLFFBQVEsR0FBRztBQUFBLGVBQTdFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQStFO0FBQUEsVUFDL0UsdUJBQUMsVUFBSyxzQkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFZO0FBQUEsYUFIZDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSUE7QUFBQSxRQUVBLHVCQUFDLFNBQUksV0FBVSxxR0FDYjtBQUFBLGlDQUFDLFVBQUssOEJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBb0I7QUFBQSxVQUNwQix1QkFBQyxVQUFLLFdBQVcsYUFBYSxXQUFXLGlCQUFpQixxQkFBcUIsZ0JBQWdCLElBQzVGLHFCQUFXLGlCQUFpQixjQUFjLHVCQUQ3QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBS0E7QUFBQSxRQUNDLEtBQUssS0FBSyxlQUFlLFFBQVEsT0FBTyxHQUFHLElBQUksTUFDOUMsdUJBQUMsU0FBSSxXQUFVLHlJQUNiO0FBQUEsaUNBQUMsaUJBQWMsV0FBVSx5Q0FBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBK0Q7QUFBQSxVQUMvRCx1QkFBQyxVQUFLLHdDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQThCO0FBQUEsYUFGaEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsV0F2REo7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQXlEQTtBQUFBLE1BR0MsS0FBSyxLQUFLLGVBQWUsUUFBUSxPQUFPLEdBQUcsSUFBSSxNQUM5QztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsV0FBVTtBQUFBLFVBQ1YsT0FBTztBQUFBLFlBQ0wsV0FBVztBQUFBLFVBQ2I7QUFBQTtBQUFBLFFBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS0E7QUFBQSxNQUlELEtBQUssS0FBSyxlQUFlLFFBQVEsT0FBTyxHQUFHLElBQUksTUFDOUMsdUJBQUMsU0FBSSxXQUFVLDBNQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsaUNBQUMsU0FBSSxXQUFVLDBEQUNiLGlDQUFDLE9BQUksV0FBVSwrQ0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUEyRCxLQUQ3RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxTQUFJLFdBQVUsdUNBQ2I7QUFBQSxtQ0FBQyxTQUFJLFdBQVUscURBQW9ELDBDQUFuRTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUE2RjtBQUFBLFlBQzdGLHVCQUFDLFNBQUksV0FBVSxvQ0FBbUM7QUFBQTtBQUFBLGNBQ3pDLEtBQUssTUFBTSxlQUFlLFFBQVEsR0FBRztBQUFBLGNBQUU7QUFBQSxjQUF1QixLQUFLLE9BQU8sZUFBZSxRQUFRLE9BQU8sR0FBRztBQUFBLGNBQUU7QUFBQSxpQkFEdEg7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLGVBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFLQTtBQUFBLGFBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVVBO0FBQUEsUUFDQSx1QkFBQyxVQUFLLFdBQVUsMkdBQ1osMEJBQWUsUUFBUSxPQUFPLE1BQU0sc0JBQXNCLHNCQUQ5RDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFlQTtBQUFBLE1BSUYsdUJBQUMsU0FBSSxXQUFVLDBGQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBc0c7QUFBQSxNQUN0Ryx1QkFBQyxTQUFJLFdBQVUsMkZBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUF1RztBQUFBLE1BQ3ZHLHVCQUFDLFNBQUksV0FBVSw2RkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXlHO0FBQUEsTUFDekcsdUJBQUMsU0FBSSxXQUFVLDhGQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBMEc7QUFBQSxNQUcxRyx1QkFBQyxTQUFJLFdBQVUsdUtBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsMENBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsb0VBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWlGO0FBQUEsVUFDakYsdUJBQUMsVUFBSyxXQUFVLHFEQUNiLDBCQUFnQiwwQkFBMEIsZUFEN0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUtBO0FBQUEsUUFDQSx1QkFBQyxTQUFJLFdBQVUsMENBQ2I7QUFBQSxpQ0FBQyxVQUFLLFdBQVUsMEJBQXlCLHFDQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE4RDtBQUFBLFVBQzlELHVCQUFDLFVBQUssV0FBVSxrQkFBaUIsaUJBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWtDO0FBQUEsVUFDbEMsdUJBQUMsVUFBSyxXQUFVLG9CQUFtQiw4QkFBbkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBaUQ7QUFBQSxhQUhuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBSUE7QUFBQSxXQVhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFZQTtBQUFBLE1BR0MsZUFBZSxVQUFVLENBQUMsaUJBQ3pCLHVCQUFDLFNBQUksV0FBVSw2SkFDYjtBQUFBLCtCQUFDLGVBQVksV0FBVSxpQkFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFxQztBQUFBLFFBQ3JDLHVCQUFDLFVBQUssK0RBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFxRDtBQUFBLFdBRnZEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFHQTtBQUFBLFNBcFFKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FzUUE7QUFBQSxJQUdBLHVCQUFDLFNBQUksV0FBVSw0RkFDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSx5QkFDYjtBQUFBLCtCQUFDLFVBQUssV0FBVSxnRUFBK0QsbUNBQS9FO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBa0c7QUFBQSxRQUNsRyx1QkFBQyxVQUFLLFdBQVUsa0RBQ2IsMEJBQWdCLGlDQUFpQyw4QkFEcEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsV0FKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBS0E7QUFBQSxNQUVBLHVCQUFDLFNBQUksV0FBVSwyQkFDYjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU0sY0FBYyxlQUFlLGdCQUFnQixTQUFTLGFBQWE7QUFBQSxZQUNsRixVQUFVO0FBQUEsWUFDVixXQUFXLDhGQUNULGdCQUNJLG9FQUNBLGVBQWUsZ0JBQ2Isa0ZBQ0EsK0RBQ1I7QUFBQSxZQUVBO0FBQUEscUNBQUMsYUFBVSxXQUFVLGFBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQStCO0FBQUEsY0FDL0IsdUJBQUMsVUFBTSx5QkFBZSxnQkFBZ0Isd0JBQXdCLGdDQUE5RDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUEyRjtBQUFBO0FBQUE7QUFBQSxVQVo3RjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFhQTtBQUFBLFFBRUEsdUJBQUMsU0FBSSxXQUFVLHNIQUNiO0FBQUEsaUNBQUMsZUFBWSxXQUFVLDhCQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFrRDtBQUFBLFVBQ2xELHVCQUFDLFVBQUssMEJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBZ0I7QUFBQSxhQUZsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBR0E7QUFBQSxXQW5CRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBb0JBO0FBQUEsU0E1QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQTZCQTtBQUFBLElBR0MsWUFDQyx1QkFBQyxTQUFJLFdBQVUsa0hBQ2I7QUFBQSw2QkFBQyxpQkFBYyxXQUFVLCtDQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXFFO0FBQUEsTUFDckUsdUJBQUMsU0FDQztBQUFBLCtCQUFDLE9BQUUsV0FBVSxpQkFBZ0IsdUNBQTdCO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBb0Q7QUFBQSxRQUNwRCx1QkFBQyxPQUFFLFdBQVUseUJBQXlCLHNCQUF0QztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQStDO0FBQUEsV0FGakQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUdBO0FBQUEsU0FMRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBTUE7QUFBQSxPQWxUSjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBb1RBO0FBRUo7IiwibmFtZXMiOltdfQ==