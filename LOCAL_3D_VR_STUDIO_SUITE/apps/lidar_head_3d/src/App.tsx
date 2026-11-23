import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import { CameraStream } from "/apps/lidar_head_3d/src/components/CameraStream.tsx";
import { ThreeDHeadVisualizer } from "/apps/lidar_head_3d/src/components/ThreeDHeadVisualizer.tsx";
import { DiagnosticConsole } from "/apps/lidar_head_3d/src/components/DiagnosticConsole.tsx";
import { ExportPanel } from "/apps/lidar_head_3d/src/components/ExportPanel.tsx";
import { UserScansDbViewer } from "/apps/lidar_head_3d/src/components/UserScansDbViewer.tsx";
import { ChomikUiController, TransitionOverlay } from "/apps/lidar_head_3d/src/components/ChomikUiController.tsx";
import { TechCosmosSelector } from "/apps/lidar_head_3d/src/components/TechCosmosSelector.tsx";
import { LidarDepthHistogram } from "/apps/lidar_head_3d/src/components/LidarDepthHistogram.tsx";
import { FlutterMobileIntegration } from "/apps/lidar_head_3d/src/components/FlutterMobileIntegration.tsx";
import { AppState } from "/apps/lidar_head_3d/src/types.ts";
import { motion, AnimatePresence } from "/apps/lidar_head_3d/node_modules/.vite/deps/motion_react.js?v=01c14a81";
import {
  Camera,
  Terminal,
  Cpu,
  Maximize2,
  Sparkles,
  Smartphone,
  Database,
  Sliders,
  Lock,
  Wifi,
  ChevronUp,
  Shield,
  Palette
} from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
const PROTOCOL_CONFIG = {
  cameraPosition: "BACK_MAIN",
  enableFlash: false,
  exposureLumaTarget: 142,
  lidarResolutionWidth: 256,
  lidarResolutionHeight: 192,
  frameRateLidar: 60,
  lidarPrecisionRange: 0.4,
  // 40 cm optimal range
  minTriangleAngle: 30,
  maxTriangleEdgeLength: 5,
  enforceDelaunayCondition: true,
  minQualityScore: 0.96,
  // Strict threshold
  stabilityTimeoutMs: 2e3
  // Stable for 2s
};
const INITIAL_HISTORY = Array.from({ length: 20 }, (_, i) => ({
  luma: 135 + Math.sin(i / 1.5) * 8 + Math.random() * 3,
  sharpness: 0.74 + i / 45 + Math.random() * 0.03,
  distance: 0.38 - i / 1200,
  cct: 5600 + i * 35 + Math.random() * 80
}));
export default function App() {
  const [appMode, setAppMode] = useState("tech_selector");
  const [appState, setAppStateInternal] = useState(AppState.chill);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const setAppState = (nextState) => {
    if (appState === AppState.chill && nextState === AppState.quantum) {
      setIsTransitioning(true);
    } else {
      setAppStateInternal(nextState);
    }
  };
  const [activeReward, setActiveReward] = useState(null);
  const [facingMode, setFacingMode] = useState("environment");
  const [isSandboxMode, setIsSandboxMode] = useState(true);
  const [faceDetected, setFaceDetected] = useState(true);
  const [showFlash, setShowFlash] = useState(false);
  const [activeTab, setActiveTab] = useState("scan");
  const [isPhoneLocked, setIsPhoneLocked] = useState(false);
  const [iphoneColor, setIphoneColor] = useState("titanium");
  const [isDeviceFrameEnabled, setIsDeviceFrameEnabled] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(98);
  const [timeString, setTimeString] = useState("09:41");
  const [hapticFeedback, setHapticFeedback] = useState(null);
  useEffect(() => {
    const updateTime = () => {
      const now = /* @__PURE__ */ new Date();
      const hrs = String(now.getHours()).padStart(2, "0");
      const mins = String(now.getMinutes()).padStart(2, "0");
      setTimeString(`${hrs}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1e3);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        if (prev <= 15) return 100;
        return prev - 1;
      });
    }, 6e4);
    return () => clearInterval(interval);
  }, []);
  const triggerHaptic = (msg) => {
    setHapticFeedback(msg);
    setTimeout(() => setHapticFeedback(null), 1e3);
  };
  const [metrics, setMetrics] = useState({
    faceDetected: true,
    distance: 0.36,
    qualityScore: 0.97,
    yaw: 2,
    pitch: -1,
    roll: 0.5,
    luma: 142,
    sharpness: 0.88,
    cct: 5650,
    stabilityMs: 0,
    lidarPointsCount: 49152
    // 256 x 192 grid resolution
  });
  const [minTriangleAngle, setMinTriangleAngle] = useState(PROTOCOL_CONFIG.minTriangleAngle);
  const [maxTriangleEdgeLength, setMaxTriangleEdgeLength] = useState(PROTOCOL_CONFIG.maxTriangleEdgeLength);
  const [enforceDelaunayCondition, setEnforceDelaunayCondition] = useState(PROTOCOL_CONFIG.enforceDelaunayCondition);
  const [triangulationStats, setTriangulationStats] = useState({
    total: 0,
    skinny: 0,
    tooLong: 0
  });
  const [locks, setLocks] = useState({
    exposure: "UNLOCKED",
    focus: "UNLOCKED",
    whiteBalance: "UNLOCKED",
    lidarFusion: "UNLOCKED"
  });
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [logs, setLogs] = useState([]);
  const logsEndRef = useRef(null);
  const [capture, setCapture] = useState(null);
  const [scanType, setScanType] = useState("chomiki_twarz");
  const [liveFeedback, setLiveFeedback] = useState({
    continuousScanning: true,
    showLiveMesh: true,
    showRealTimeMetrics: true,
    updateFrequencyHz: 30
  });
  const [savedScans, setSavedScans] = useState([
    {
      id: "8a12c8b4-ef9d-472b-8a03-7bf2a64c4892",
      user_id: "a93b4d12-88ef-412e-a503-67cb3d002bf4",
      scan_type: "chomiki_twarz",
      timestamp: new Date(Date.now() - 36e5 * 24).toISOString(),
      // 1 day ago
      raw_images_url: ["https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80"],
      lidar_data_url: "https://storage.googleapis.com/edge-ai-lidar-dumps/raw/8a12c8b4-ef9d-472b-8a03-7bf2a64c4892.ply",
      is_processed: true,
      metadata: {
        yaw: 1.2,
        pitch: -2,
        roll: 0.1,
        luma: 135,
        sharpness: 0.84,
        cct: 5600,
        pointsCount: 49152,
        distance: 0.35,
        triangleCount: 54,
        validDelaunayCount: 51,
        averageEdgeLengthMm: 3.82
      }
    },
    {
      id: "f93cb741-120d-481c-bf09-247012fbce12",
      user_id: "a93b4d12-88ef-412e-a503-67cb3d002bf4",
      scan_type: "oponka_brzuch",
      timestamp: new Date(Date.now() - 36e5 * 5).toISOString(),
      // 5 hours ago
      raw_images_url: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=120&h=120&q=80"],
      lidar_data_url: "https://storage.googleapis.com/edge-ai-lidar-dumps/raw/f93cb741-120d-481c-bf09-247012fbce12.ply",
      is_processed: true,
      metadata: {
        yaw: 0.4,
        pitch: 0.8,
        roll: -0.2,
        luma: 145,
        sharpness: 0.89,
        cct: 5900,
        pointsCount: 49152,
        distance: 0.38,
        triangleCount: 68,
        validDelaunayCount: 65,
        averageEdgeLengthMm: 4.15
      }
    },
    {
      id: "d83ab214-ef9d-472b-8a03-7bf2a64c4892",
      user_id: "a93b4d12-88ef-412e-a503-67cb3d002bf4",
      scan_type: "chomiki_twarz",
      timestamp: new Date(Date.now() - 36e5 * 48).toISOString(),
      // 2 days ago
      raw_images_url: ["https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80"],
      lidar_data_url: "https://storage.googleapis.com/edge-ai-lidar-dumps/raw/d83ab214-ef9d-472b-8a03-7bf2a64c4892.ply",
      is_processed: true,
      metadata: {
        yaw: -0.5,
        pitch: 1.1,
        roll: 0.3,
        luma: 140,
        sharpness: 0.87,
        cct: 5750,
        pointsCount: 49152,
        distance: 0.36,
        triangleCount: 62,
        validDelaunayCount: 59,
        averageEdgeLengthMm: 3.9
      }
    },
    {
      id: "e12cb141-120d-481c-bf09-247012fbce12",
      user_id: "a93b4d12-88ef-412e-a503-67cb3d002bf4",
      scan_type: "oponka_brzuch",
      timestamp: new Date(Date.now() - 36e5 * 72).toISOString(),
      // 3 days ago
      raw_images_url: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=120&h=120&q=80"],
      lidar_data_url: "https://storage.googleapis.com/edge-ai-lidar-dumps/raw/e12cb141-120d-481c-bf09-247012fbce12.ply",
      is_processed: true,
      metadata: {
        yaw: 0.1,
        pitch: -0.2,
        roll: 0.5,
        luma: 138,
        sharpness: 0.91,
        cct: 5800,
        pointsCount: 49152,
        distance: 0.37,
        triangleCount: 65,
        validDelaunayCount: 63,
        averageEdgeLengthMm: 4.02
      }
    },
    {
      id: "b12cb345-234a-567b-cdef-123456789abc",
      user_id: "a93b4d12-88ef-412e-a503-67cb3d002bf4",
      scan_type: "chomiki_twarz",
      timestamp: new Date(Date.now() - 36e5 * 96).toISOString(),
      // 4 days ago
      raw_images_url: ["https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120&q=80"],
      lidar_data_url: "https://storage.googleapis.com/edge-ai-lidar-dumps/raw/b12cb345-234a-567b-cdef-123456789abc.ply",
      is_processed: true,
      metadata: {
        yaw: 0.8,
        pitch: 0.5,
        roll: -0.4,
        luma: 142,
        sharpness: 0.85,
        cct: 5650,
        pointsCount: 49152,
        distance: 0.34,
        triangleCount: 58,
        validDelaunayCount: 56,
        averageEdgeLengthMm: 3.75
      }
    },
    {
      id: "c98cb765-a12b-34c5-e67d-9876543210fe",
      user_id: "a93b4d12-88ef-412e-a503-67cb3d002bf4",
      scan_type: "oponka_brzuch",
      timestamp: new Date(Date.now() - 36e5 * 120).toISOString(),
      // 5 days ago
      raw_images_url: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=120&h=120&q=80"],
      lidar_data_url: "https://storage.googleapis.com/edge-ai-lidar-dumps/raw/c98cb765-a12b-34c5-e67d-9876543210fe.ply",
      is_processed: true,
      metadata: {
        yaw: -0.2,
        pitch: -1,
        roll: -0.1,
        luma: 139,
        sharpness: 0.88,
        cct: 5700,
        pointsCount: 49152,
        distance: 0.39,
        triangleCount: 70,
        validDelaunayCount: 68,
        averageEdgeLengthMm: 4.2
      }
    }
  ]);
  const addLog = (category, message) => {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", { hour12: false }) + "." + String((/* @__PURE__ */ new Date()).getMilliseconds()).padStart(3, "0");
    const newLog = {
      id: Math.random().toString(36).substring(2, 11),
      timestamp,
      category,
      message
    };
    setLogs((prev) => [...prev.slice(-35), newLog]);
  };
  useEffect(() => {
    addLog("SYSTEM", "Multi-Sensor Fusion Engine initialized.");
    addLog("LIDAR", "Enforcing iOS LiDAR constraints: 256x192 active point projection grid.");
    addLog("TRIANGULATION", "Delaunay Triangulation active: InCircle checks enabled.");
    addLog("HW", "Hardware Configuration locked: CameraPosition = BACK_MAIN, Flash = DISABLED.");
  }, []);
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);
  useEffect(() => {
    if (isSandboxMode) {
      addLog("SYSTEM", "Diagnostic Sandbox activated. Simulating active LiDAR frame captures.");
      setMetrics({
        faceDetected: true,
        distance: 0.36,
        qualityScore: 0.98,
        yaw: 0.5,
        pitch: -0.5,
        roll: 0.2,
        luma: 142,
        sharpness: 0.9,
        cct: 5800,
        stabilityMs: 0,
        lidarPointsCount: 49152
      });
      setLocks({ exposure: "UNLOCKED", focus: "UNLOCKED", whiteBalance: "UNLOCKED", lidarFusion: "UNLOCKED" });
    } else {
      addLog("SYSTEM", "Accessing physical hardware camera (RGB + Depth)...");
      setLocks({ exposure: "UNLOCKED", focus: "UNLOCKED", whiteBalance: "UNLOCKED", lidarFusion: "UNLOCKED" });
    }
  }, [isSandboxMode]);
  const isLumaOk = metrics.luma >= 92 && metrics.luma <= 210;
  const isSharpnessOk = metrics.sharpness >= 0.8;
  const isCctOk = metrics.cct >= 5e3 && metrics.cct <= 6800;
  const isDistanceOk = metrics.distance >= 0.25 && metrics.distance <= PROTOCOL_CONFIG.lidarPrecisionRange;
  const isRotationOk = Math.abs(metrics.yaw) <= 10 && Math.abs(metrics.pitch) <= 10 && Math.abs(metrics.roll) <= 10;
  const isQualityOk = metrics.qualityScore >= PROTOCOL_CONFIG.minQualityScore;
  useEffect(() => {
    if (!faceDetected) {
      setMetrics((prev) => prev.stabilityMs > 0 ? { ...prev, stabilityMs: 0 } : prev);
      return;
    }
    const allMetricsCompliant = isLumaOk && isSharpnessOk && isCctOk && isDistanceOk && isRotationOk && isQualityOk;
    if (allMetricsCompliant) {
      const timer = setInterval(() => {
        setMetrics((prev) => {
          if (prev.stabilityMs >= 2e3) {
            clearInterval(timer);
            return prev;
          }
          return { ...prev, stabilityMs: prev.stabilityMs + 100 };
        });
      }, 100);
      return () => clearInterval(timer);
    } else {
      setMetrics((prev) => prev.stabilityMs > 0 ? { ...prev, stabilityMs: 0 } : prev);
    }
  }, [isLumaOk, isSharpnessOk, isCctOk, isDistanceOk, isRotationOk, isQualityOk, faceDetected]);
  useEffect(() => {
    const stability = metrics.stabilityMs;
    if (stability === 0) {
      if (locks.exposure !== "UNLOCKED" || locks.focus !== "UNLOCKED" || locks.whiteBalance !== "UNLOCKED" || locks.lidarFusion !== "UNLOCKED") {
        setLocks({ exposure: "UNLOCKED", focus: "UNLOCKED", whiteBalance: "UNLOCKED", lidarFusion: "UNLOCKED" });
        addLog("SYSTEM", "⚠️ Metrics fluctuated or face lost. Lock stability counter reset.");
      }
    } else if (stability === 400 && locks.exposure === "UNLOCKED") {
      setLocks((l) => ({ ...l, exposure: "LOCKED" }));
      addLog("LOCK", `🔒 Exposure locked. Average Luma: ${metrics.luma} (Limits: 92–210)`);
    } else if (stability === 800 && locks.focus === "UNLOCKED") {
      setLocks((l) => ({ ...l, focus: "LOCKED" }));
      addLog("LOCK", `🔒 Focus locked. Contrast sharpness: ${metrics.sharpness.toFixed(2)} (Limits: ≥0.8)`);
    } else if (stability === 1200 && locks.whiteBalance === "UNLOCKED") {
      setLocks((l) => ({ ...l, whiteBalance: "LOCKED" }));
      addLog("LOCK", `🔒 WB locked. Correlated temperature: ${metrics.cct} K (Limits: 5000–6800K)`);
    } else if (stability >= 2e3 && locks.lidarFusion !== "LOCKED") {
      setLocks({ exposure: "LOCKED", focus: "LOCKED", whiteBalance: "LOCKED", lidarFusion: "LOCKED" });
      addLog("LIDAR", `🔒 [FUSION LOCK] Delaunay mesh coherent. Fused 256x192 depth frame at 60Hz.`);
    }
  }, [metrics.stabilityMs, metrics.luma, metrics.sharpness, metrics.cct]);
  const handleLiveMetricsUpdate = (newMetrics) => {
    if (!liveFeedback.continuousScanning) return;
    setMetrics((prev) => {
      return { ...prev, ...newMetrics };
    });
    setHistory((prevHist) => {
      const nextHist = [...prevHist, {
        luma: newMetrics.luma ?? metrics.luma,
        sharpness: newMetrics.sharpness ?? metrics.sharpness,
        distance: newMetrics.distance ?? metrics.distance,
        cct: newMetrics.cct ?? metrics.cct
      }];
      return nextHist.slice(-20);
    });
  };
  const handleSandboxMetricsChange = (newSandboxMetrics) => {
    if (!isSandboxMode) return;
    if (!liveFeedback.continuousScanning) return;
    setMetrics((prev) => {
      return { ...prev, ...newSandboxMetrics };
    });
    setHistory((prevHist) => {
      const nextHist = [...prevHist, {
        luma: newSandboxMetrics.luma ?? metrics.luma,
        sharpness: newSandboxMetrics.sharpness ?? metrics.sharpness,
        distance: newSandboxMetrics.distance ?? metrics.distance,
        cct: newSandboxMetrics.cct ?? metrics.cct
      }];
      return nextHist.slice(-20);
    });
  };
  const handleResetLocks = () => {
    setMetrics((prev) => ({ ...prev, stabilityMs: 0 }));
    setLocks({ exposure: "UNLOCKED", focus: "UNLOCKED", whiteBalance: "UNLOCKED", lidarFusion: "UNLOCKED" });
    addLog("SYSTEM", "User manual override triggered. All sensor fusions unlocked.");
  };
  const isReadyToCapture = faceDetected && metrics.stabilityMs >= 2e3 && locks.lidarFusion === "LOCKED";
  const handleCapture = () => {
    if (!isReadyToCapture) {
      addLog("SYSTEM", "⚠️ Normalization constraints unfulfilled. Dwell coherence timer incomplete.");
      return;
    }
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 200);
    addLog("SYSTEM", "Generating Delaunay mesh geometry and active sensor logs...");
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, 640, 480);
      ctx.strokeStyle = "rgba(56, 189, 248, 0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 640; i += 32) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 480);
        ctx.stroke();
      }
      for (let j = 0; j < 480; j += 32) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(640, j);
        ctx.stroke();
      }
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(320, 240, 120, 160, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(16, 185, 129, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(320, 120);
      ctx.lineTo(260, 200);
      ctx.lineTo(380, 200);
      ctx.closePath();
      ctx.moveTo(260, 200);
      ctx.lineTo(320, 280);
      ctx.lineTo(380, 200);
      ctx.closePath();
      ctx.moveTo(320, 280);
      ctx.lineTo(270, 350);
      ctx.lineTo(370, 350);
      ctx.closePath();
      ctx.stroke();
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(320, 120, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(260, 200, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(380, 200, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(320, 280, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(270, 350, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(370, 350, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px monospace";
      ctx.fillText(`CCT: ${metrics.cct} K | LUMA: ${metrics.luma} | SHARPNESS: ${metrics.sharpness.toFixed(2)}`, 40, 420);
      ctx.fillText(`DIST: ${(metrics.distance * 100).toFixed(1)} cm | ROTATION: [Y:${metrics.yaw.toFixed(1)}°, P:${metrics.pitch.toFixed(1)}°, R:${metrics.roll.toFixed(1)}°]`, 40, 440);
      ctx.fillStyle = "#10b981";
      ctx.font = "12px monospace";
      ctx.fillText("LIDAR DELAUNAY 3D MESH RECONSTRUCTION COMPLIANT", 40, 50);
    }
    const captureImg = canvas.toDataURL("image/png");
    const capturedPayload = {
      id: "LIDAR-CAP-" + Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      imageUrl: captureImg,
      sensorConfig: {
        cameraPosition: "BACK_MAIN",
        enableFlash: false,
        exposureLumaTarget: 142,
        lidarResolutionWidth: 256,
        lidarResolutionHeight: 192,
        frameRateLidar: 60,
        lidarPrecisionRange: 0.4,
        minTriangleAngle,
        maxTriangleEdgeLength,
        enforceDelaunayCondition,
        minQualityScore: PROTOCOL_CONFIG.minQualityScore,
        stabilityTimeoutMs: PROTOCOL_CONFIG.stabilityTimeoutMs
      },
      metrics: { ...metrics },
      locks: {
        exposureLocked: locks.exposure === "LOCKED",
        focusLocked: locks.focus === "LOCKED",
        whiteBalanceLocked: locks.whiteBalance === "LOCKED",
        lidarFusionLocked: locks.lidarFusion === "LOCKED",
        lumaValue: metrics.luma,
        sharpnessValue: metrics.sharpness,
        cctValue: metrics.cct
      },
      reconstruction3D: {
        vertexCount: 36,
        triangleCount: triangulationStats.total,
        validDelaunayCount: triangulationStats.total - triangulationStats.skinny - triangulationStats.tooLong,
        skinnyTrianglesCount: triangulationStats.skinny,
        averageEdgeLengthMm: parseFloat((3.65 + Math.random() * 0.4).toFixed(2)),
        interpupillaryDistanceMm: parseFloat((63.4 + (Math.random() - 0.5) * 0.2).toFixed(1)),
        lidarDepthResolution: "256x192 @ 60Hz",
        faceMeshPoints: [
          [0, 0, 45],
          [-16, 16, 20],
          [16, 16, 20],
          [0, 48, 20],
          [0, -48, 22]
        ]
      }
    };
    setCapture(capturedPayload);
    addLog("SYSTEM", `✅ Normalized capture generated. ID: ${capturedPayload.id}`);
    const newScanRow = {
      id: "usr-" + Math.random().toString(36).substring(2, 11) + "-" + Math.random().toString(36).substring(2, 6),
      user_id: "profile-90210-active-tester",
      scan_type: scanType,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      raw_images_url: [captureImg],
      lidar_data_url: `https://storage.googleapis.com/edge-ai-lidar-dumps/raw/usr-${Math.random().toString(36).substring(2, 8)}.ply`,
      is_processed: true,
      metadata: {
        yaw: metrics.yaw,
        pitch: metrics.pitch,
        roll: metrics.roll,
        luma: metrics.luma,
        sharpness: metrics.sharpness,
        cct: metrics.cct,
        pointsCount: metrics.lidarPointsCount,
        distance: metrics.distance,
        triangleCount: triangulationStats.total,
        validDelaunayCount: triangulationStats.total - triangulationStats.skinny - triangulationStats.tooLong,
        averageEdgeLengthMm: parseFloat((3.65 + Math.random() * 0.4).toFixed(2))
      }
    };
    const nextScans = [newScanRow, ...savedScans];
    setSavedScans(nextScans);
    addLog("SYSTEM", `💾 PERSISTED SQL row generated for table 'user_scans_raw' (Scan type: '${scanType}')`);
    checkProgress(metrics.qualityScore, nextScans.length);
  };
  const checkProgress = (scanQuality, currentSessionCount) => {
    if (scanQuality > 0.95) {
      addLog("SYSTEM", "🏆 Nagroda: Odznaka [Master of the Mesh] przyznana za doskonałą jakość!");
      setActiveReward({
        type: "badge",
        title: "SLAY! NOWA ODZNAKA ODBLOKOWANA 🏆",
        badgeName: "Master of the Mesh",
        description: `Twój Glow-up Check osiągnął wybitną spójność laserową (Stats: ${(scanQuality * 100).toFixed(1)}%). Buła z dumą mianuje Cię Mistrzem Siatki Delaunaya!`
      });
    } else if (currentSessionCount === 7) {
      addLog("SYSTEM", "🏆 Nagroda: Quest [7-Day Challenge Slayed] ukończony!");
      setActiveReward({
        type: "quest",
        title: "QUEST SKOMPLETOWANY! 🎉",
        badgeName: "7-Day Challenge Slayed",
        description: "Ukończono 7-dniowe wyzwanie skanowania z Bułą! Twoje Main Character Energy właśnie wystrzeliło poza orbitę."
      });
    }
  };
  const handleClearCapture = () => {
    setCapture(null);
    addLog("SYSTEM", "Capture cache reset. Multi-Sensor pipeline ready for re-dwell.");
  };
  const getPolishDate = () => {
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const months = [
      "stycznia",
      "lutego",
      "marca",
      "kwietnia",
      "maja",
      "czerwca",
      "lipca",
      "sierpnia",
      "września",
      "października",
      "listopada",
      "grudnia"
    ];
    const now = /* @__PURE__ */ new Date();
    return `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
  };
  const phoneColors = {
    titanium: {
      name: "Natural Titanium",
      border: "border-zinc-500/80",
      metallic: "from-stone-500 via-stone-400 to-stone-600",
      accent: "text-amber-400",
      casingGlow: "shadow-[0_0_50px_rgba(120,113,108,0.15)]",
      bgGrad: "from-stone-900 to-neutral-950"
    },
    black: {
      name: "Space Black",
      border: "border-neutral-800",
      metallic: "from-neutral-800 via-neutral-700 to-neutral-900",
      accent: "text-sky-400",
      casingGlow: "shadow-[0_0_50px_rgba(23,23,23,0.3)]",
      bgGrad: "from-neutral-950 to-black"
    },
    purple: {
      name: "Deep Purple",
      border: "border-indigo-900",
      metallic: "from-indigo-950 via-purple-900 to-slate-900",
      accent: "text-purple-400",
      casingGlow: "shadow-[0_0_50px_rgba(147,51,234,0.15)]",
      bgGrad: "from-indigo-950 to-slate-950"
    },
    silver: {
      name: "Silver Titanium",
      border: "border-slate-300",
      metallic: "from-slate-400 via-slate-200 to-slate-500",
      accent: "text-teal-400",
      casingGlow: "shadow-[0_0_50px_rgba(203,213,225,0.15)]",
      bgGrad: "from-slate-900 to-zinc-950"
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-slate-950 relative overflow-x-hidden", id: "main_app_layout", children: [
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: showFlash && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 1 },
        animate: { opacity: 0 },
        exit: { opacity: 0 },
        transition: { duration: 0.2, ease: "easeOut" },
        className: "fixed inset-0 bg-white z-50 pointer-events-none",
        id: "shutter_flash_overlay"
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 693,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 691,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: hapticFeedback && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, y: -50, scale: 0.9 },
        animate: { opacity: 1, y: 16, scale: 1 },
        exit: { opacity: 0, y: -20, scale: 0.95 },
        className: "fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur border border-sky-500/30 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl shadow-sky-950/20 pointer-events-none",
        children: [
          /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-3.5 h-3.5 text-sky-400 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 713,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] font-bold text-sky-300 uppercase tracking-widest", children: hapticFeedback }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 714,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 707,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 705,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-sky-950 via-slate-950 to-indigo-950 border-b border-slate-900 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs z-30", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "flex h-2 w-2 relative", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 725,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 726,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 724,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[10px] text-slate-300", children: [
          "PRIMARILY RUNNING ON ",
          /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold", children: "APPLE IPHONE" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 729,
            columnNumber: 34
          }, this),
          " PROTOC-v2.0"
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 728,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 723,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            setIsDeviceFrameEnabled(!isDeviceFrameEnabled);
            triggerHaptic(isDeviceFrameEnabled ? "FULL DESKTOP MODE" : "APPLE IPHONE MODE");
          },
          className: "font-mono text-[9px] font-bold px-3 py-1 bg-slate-900 hover:bg-slate-800 text-sky-400 hover:text-sky-300 border border-slate-800 rounded-lg cursor-pointer transition-all flex items-center gap-1.5 shadow",
          children: isDeviceFrameEnabled ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Maximize2, { className: "w-3 h-3" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 742,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "PRZEŁĄCZ NA PEŁNY EKRAN" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 743,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 741,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-3 h-3" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 747,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "PRZEŁĄCZ NA RAMKĘ IPHONE" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 748,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 746,
            columnNumber: 15
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 733,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 732,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 722,
      columnNumber: 7
    }, this),
    isDeviceFrameEnabled ? (
      /* ==================== WORKBENCH MODE (iPhone Centered Mockup) ==================== */
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col lg:flex-row items-center justify-center p-4 lg:p-8 gap-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black relative overflow-hidden select-none", id: "phone_workbench", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 760,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px] pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 761,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 762,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full lg:w-80 flex flex-col gap-4 z-20 shrink-0", id: "workbench_sidebar_left", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xl shadow-lg border border-sky-400/20", children: "🐹" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 770,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h2", { className: "font-sans text-sm font-black text-slate-100 uppercase tracking-tight flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Klub Chomika v2" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 775,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] bg-sky-950 text-sky-400 font-mono px-1 py-0.2 rounded border border-sky-900/40", children: "IOS" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 776,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 774,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-mono text-[9px] text-slate-400", children: "MediaPipe LiDAR Core v2.0-LIDAR" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 778,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 773,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 769,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[11px] text-slate-400 leading-relaxed mt-1", children: [
              "Aplikacja została zaprojektowana specjalnie pod kątem interfejsu i norm czułości smartfonów ",
              /* @__PURE__ */ jsxDEV("strong", { children: "Apple iPhone" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 782,
                columnNumber: 109
              }, this),
              " z aparatem TrueDepth i LiDAR."
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 781,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 768,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Palette, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 789,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wykończenie iPhone Titanium" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 790,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 788,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 mt-1", children: Object.entries(phoneColors).map(([key, value]) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  setIphoneColor(key);
                  triggerHaptic(`WYKOŃCZENIE: ${value.name.toUpperCase()}`);
                },
                className: `flex items-center gap-2 p-2 rounded-xl border text-left cursor-pointer transition-all ${iphoneColor === key ? "bg-slate-800/80 border-sky-500 text-slate-100 shadow-lg shadow-sky-950/20" : "bg-slate-950/30 border-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-900/40"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: `w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${value.metallic} border border-slate-200/20` }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 807,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold uppercase truncate", children: key }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 808,
                    columnNumber: 21
                  }, this)
                ]
              },
              key,
              true,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 795,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 793,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/50 p-2 rounded-lg border border-slate-950 text-center font-mono text-[8px] text-slate-400", children: [
              "Kolor obudowy: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-sky-400", children: phoneColors[iphoneColor].name }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 814,
                columnNumber: 32
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 813,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 787,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col gap-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 821,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Fizyczne Przyciski Apple" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 822,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 820,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[11px] text-slate-400 leading-normal", children: "Możesz klikać na fizyczne przyciski po bokach modelu telefonu na środku, aby sterować systemem:" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 824,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1.5 font-mono text-[9px] text-slate-300 mt-1", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    setIsPhoneLocked(!isPhoneLocked);
                    triggerHaptic(isPhoneLocked ? "TELEFON ODBLOKOWANY" : "TELEFON ZABLOKOWANY (UŚPIONY)");
                  },
                  className: "flex items-center justify-between p-1.5 bg-slate-950/50 rounded border border-slate-900 hover:bg-slate-900/50 text-left w-full cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-bold", children: "1. Przycisk Blokady (Prawy)" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 836,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 text-[8px] border border-amber-900 px-1 py-0.2 rounded font-bold", children: "SLEEP / WAKE" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 837,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 829,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    if (isPhoneLocked) {
                      triggerHaptic("ZABLOKOWANY! ODBLOKUJ NAJPIERW");
                      return;
                    }
                    setActiveTab("scan");
                    handleCapture();
                    triggerHaptic("ZDJĘCIE / CAPTURE PNG");
                  },
                  className: "flex items-center justify-between p-1.5 bg-slate-950/50 rounded border border-slate-900 hover:bg-slate-900/50 text-left w-full cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-bold", children: "2. Głośność + (Lewy)" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 851,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 text-[8px] border border-sky-900 px-1 py-0.2 rounded font-bold", children: "3D SHUTTER" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 852,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 839,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    if (isPhoneLocked) return;
                    handleResetLocks();
                    triggerHaptic("RESET BLOKAD SENSORA");
                  },
                  className: "flex items-center justify-between p-1.5 bg-slate-950/50 rounded border border-slate-900 hover:bg-slate-900/50 text-left w-full cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-bold", children: "3. Głośność - (Lewy)" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 862,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 text-[8px] border border-emerald-900 px-1 py-0.2 rounded font-bold", children: "RESET SENSORS" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 863,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 854,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    if (isPhoneLocked) return;
                    setAppState(appState === AppState.chill ? AppState.quantum : AppState.chill);
                    triggerHaptic("QUANTUM MODE TOGGLE");
                  },
                  className: "flex items-center justify-between p-1.5 bg-slate-950/50 rounded border border-slate-900 hover:bg-slate-900/50 text-left w-full cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-bold", children: "4. Action Button (Lewy)" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 873,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 text-[8px] border border-purple-900 px-1 py-0.2 rounded font-bold", children: "TOGGLE MODE" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 874,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 865,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 828,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 819,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 765,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 shrink-0", id: "iphone_frame_container", children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => {
                if (isPhoneLocked) return;
                setAppState(appState === AppState.chill ? AppState.quantum : AppState.chill);
                triggerHaptic("Haptic click: Quantum Mode");
              },
              className: "absolute left-[-6px] top-[140px] w-[6px] h-[32px] rounded-l bg-gradient-to-r from-stone-500 to-stone-400 border border-stone-600 cursor-pointer hover:brightness-120 active:translate-x-[2px] transition-all z-20",
              title: "Action Button: Przełącz Tryb Quantum"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 886,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => {
                if (isPhoneLocked) {
                  triggerHaptic("Lock Screen Active");
                  return;
                }
                setActiveTab("scan");
                handleCapture();
                triggerHaptic("Haptic Click: 3D Snapshot");
              },
              className: "absolute left-[-6px] top-[195px] w-[6px] h-[60px] rounded-l bg-gradient-to-r from-stone-500 to-stone-400 border border-stone-600 cursor-pointer hover:brightness-120 active:translate-x-[2px] transition-all z-20",
              title: "Głośność +: Wykonaj Zapis Skanu / Capture"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 897,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => {
                if (isPhoneLocked) return;
                handleResetLocks();
                triggerHaptic("Haptic Click: Reset Locks");
              },
              className: "absolute left-[-6px] top-[270px] w-[6px] h-[60px] rounded-l bg-gradient-to-r from-stone-500 to-stone-400 border border-stone-600 cursor-pointer hover:brightness-120 active:translate-x-[2px] transition-all z-20",
              title: "Głośność -: Zresetuj Blokady Sensora"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 912,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => {
                setIsPhoneLocked(!isPhoneLocked);
                triggerHaptic(isPhoneLocked ? "Haptic: Wake Screen" : "Haptic: Sleep Screen");
              },
              className: "absolute right-[-6px] top-[220px] w-[6px] h-[90px] rounded-r bg-gradient-to-l from-stone-500 to-stone-400 border border-stone-600 cursor-pointer hover:brightness-120 active:translate-x-[-2px] transition-all z-20",
              title: "Power Button: Zablokuj / Odblokuj Ekran iPhone"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 923,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: `w-[400px] h-[820px] rounded-[56px] p-[8px] ${phoneColors[iphoneColor].bg} border-[5px] ${phoneColors[iphoneColor].border} ${phoneColors[iphoneColor].casingGlow} flex flex-col relative transition-all duration-500`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-[3px] rounded-[50px] border border-black/80 pointer-events-none z-10" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 936,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-[80%] h-full bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.04] pointer-events-none rounded-[48px] z-30 transform skew-x-12 translate-x-20" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 939,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "w-full h-full rounded-[45px] bg-slate-950 border-[4px] border-black overflow-hidden flex flex-col relative shadow-inner z-20", children: [
              /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  layout: true,
                  className: `absolute top-[14px] left-1/2 -translate-x-1/2 h-[28px] rounded-full bg-black z-50 flex items-center justify-between px-3.5 text-white select-none pointer-events-auto cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-md`,
                  style: {
                    width: isPhoneLocked ? "110px" : locks.lidarFusion === "LOCKED" ? "195px" : !faceDetected ? "210px" : "110px"
                  },
                  onClick: () => triggerHaptic("Dynamic Island: Active Connection 🟢"),
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-900/60 block relative overflow-hidden shrink-0", children: /* @__PURE__ */ jsxDEV("span", { className: "absolute inset-0.5 rounded-full bg-slate-900" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 959,
                      columnNumber: 21
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 958,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: isPhoneLocked ? /* @__PURE__ */ jsxDEV(
                      motion.span,
                      {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                        className: "text-[7.5px] font-mono font-bold tracking-widest text-slate-400 uppercase truncate",
                        children: "LOCKED"
                      },
                      "locked",
                      false,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 965,
                        columnNumber: 23
                      },
                      this
                    ) : locks.lidarFusion === "LOCKED" ? /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                        className: "flex items-center gap-1.5 font-mono text-[7px] text-emerald-400 font-bold tracking-tight truncate",
                        children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 980,
                            columnNumber: 25
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: "FUSION LOCK ACTIVE" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 981,
                            columnNumber: 25
                          }, this)
                        ]
                      },
                      "locked_fusion",
                      true,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 974,
                        columnNumber: 23
                      },
                      this
                    ) : !faceDetected ? /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                        className: "flex items-center gap-1.5 font-mono text-[7px] text-red-400 font-bold tracking-tight truncate",
                        children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 990,
                            columnNumber: 25
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: "NO SUBJECT DETECTED" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 991,
                            columnNumber: 25
                          }, this)
                        ]
                      },
                      "no_face",
                      true,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 984,
                        columnNumber: 23
                      },
                      this
                    ) : /* @__PURE__ */ jsxDEV(
                      motion.span,
                      {
                        initial: { opacity: 0 },
                        animate: { opacity: 1 },
                        className: "text-[7px] font-mono font-bold text-sky-400 tracking-wider truncate uppercase",
                        children: "LiDAR OK"
                      },
                      "calibrating",
                      false,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 994,
                        columnNumber: 23
                      },
                      this
                    ) }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 963,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex gap-0.5 items-center shrink-0", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-950 block border-[0.2px] border-indigo-900" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1007,
                        columnNumber: 21
                      }, this),
                      locks.lidarFusion === "LOCKED" && /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-1 rounded-full bg-emerald-500 block animate-pulse" }, void 0, false, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1009,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1006,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 945,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "h-[42px] pt-[15px] px-[22px] flex justify-between items-center bg-slate-950 text-white text-[9.5px] font-semibold select-none z-40 shrink-0", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 font-mono tracking-wider", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: timeString }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1018,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[7px] text-sky-400", children: "⚡" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1019,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1017,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-end gap-[1px] h-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "w-[1.5px] h-0.5 bg-white rounded-[0.2px]" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1026,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "w-[1.5px] h-[3px] bg-white rounded-[0.2px]" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1027,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "w-[1.5px] h-[5px] bg-white rounded-[0.2px]" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1028,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `w-[1.5px] h-[7px] rounded-[0.2px] ${locks.lidarFusion === "LOCKED" ? "bg-emerald-400" : "bg-white"}` }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1029,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1025,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] font-mono text-slate-400 scale-[0.9]", children: "Buła 5G" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1031,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV(Wifi, { className: "w-3 h-3 text-white" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1034,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-0.5", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] font-mono text-slate-400", children: [
                      batteryLevel,
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1038,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "w-[16px] h-[9px] border border-white/60 rounded-[3px] p-[1px] flex items-center bg-transparent", children: /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: `h-full rounded-[1px] ${batteryLevel <= 20 ? "bg-red-500 animate-pulse" : locks.lidarFusion === "LOCKED" ? "bg-emerald-400" : "bg-white"}`,
                        style: { width: `${batteryLevel}%` }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1040,
                        columnNumber: 25
                      },
                      this
                    ) }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1039,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1037,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1023,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1015,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-none pb-[12px] bg-slate-950", id: "iphone_screen_content", children: /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: isPhoneLocked ? (
                /* ==================== iOS LOCK SCREEN SIMULATOR ==================== */
                /* @__PURE__ */ jsxDEV(
                  motion.div,
                  {
                    initial: { opacity: 0, scale: 1.05 },
                    animate: { opacity: 1, scale: 1 },
                    exit: { opacity: 0, scale: 0.95 },
                    transition: { duration: 0.3 },
                    onClick: () => {
                      setIsPhoneLocked(false);
                      triggerHaptic("UNLOCKED VIA TOUCH");
                    },
                    className: "absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-black p-5 flex flex-col justify-between select-none cursor-pointer",
                    id: "lock_screen_simulator",
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center pt-8 text-center gap-1", children: [
                        /* @__PURE__ */ jsxDEV(
                          motion.div,
                          {
                            animate: { y: [0, -3, 0] },
                            transition: { repeat: Infinity, duration: 2 },
                            className: "p-1 rounded-full bg-white/5 border border-white/10",
                            children: /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5 text-white/80" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1081,
                              columnNumber: 29
                            }, this)
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1076,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mt-2", children: getPolishDate() }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1084,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("h2", { className: "text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400 font-sans mt-1", children: timeString }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1088,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "mt-3 bg-white/[0.03] border border-white/5 px-2.5 py-1 rounded-full flex items-center gap-1.5 font-mono text-[7px] text-slate-300", children: [
                          /* @__PURE__ */ jsxDEV("span", { className: "w-1 h-1 rounded-full bg-sky-400 animate-ping" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1094,
                            columnNumber: 29
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: [
                            "LASER CORE: ",
                            metrics.lidarPointsCount.toLocaleString(),
                            " PTS 📡"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1095,
                            columnNumber: 29
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1093,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1075,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2.5 max-w-sm w-full mx-auto px-1", children: [
                        /* @__PURE__ */ jsxDEV(
                          motion.div,
                          {
                            initial: { x: -30, opacity: 0 },
                            animate: { x: 0, opacity: 1 },
                            transition: { delay: 0.2 },
                            className: "bg-slate-900/80 backdrop-blur-md border border-slate-800/40 rounded-2xl p-3 shadow-lg flex gap-2.5",
                            children: [
                              /* @__PURE__ */ jsxDEV("span", { className: "text-xl shrink-0", children: "🐹" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1109,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 text-left", children: [
                                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
                                  /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-[10px] font-black text-slate-200", children: "BUŁA (Klub Chomika)" }, void 0, false, {
                                    fileName: "/app/applet/src/App.tsx",
                                    lineNumber: 1112,
                                    columnNumber: 33
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-slate-500", children: "teraz" }, void 0, false, {
                                    fileName: "/app/applet/src/App.tsx",
                                    lineNumber: 1113,
                                    columnNumber: 33
                                  }, this)
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1111,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[9px] text-slate-300 leading-snug mt-0.5", children: [
                                  "Twój ",
                                  /* @__PURE__ */ jsxDEV("strong", { children: "Glow-up Check" }, void 0, false, {
                                    fileName: "/app/applet/src/App.tsx",
                                    lineNumber: 1116,
                                    columnNumber: 38
                                  }, this),
                                  " jest gotowy! Zrób 3D skan twarzyczki z Bułą i zgarnij odznakę ",
                                  /* @__PURE__ */ jsxDEV("strong", { children: "Master of the Mesh" }, void 0, false, {
                                    fileName: "/app/applet/src/App.tsx",
                                    lineNumber: 1116,
                                    columnNumber: 131
                                  }, this),
                                  "! Slay, odblokuj mnie! 🏆✨"
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1115,
                                  columnNumber: 31
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1110,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1103,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          motion.div,
                          {
                            initial: { x: 30, opacity: 0 },
                            animate: { x: 0, opacity: 1 },
                            transition: { delay: 0.4 },
                            className: "bg-slate-900/80 backdrop-blur-md border border-slate-800/40 rounded-2xl p-3 shadow-lg flex gap-2.5",
                            children: [
                              /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-sky-400 shrink-0 mt-0.5" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1128,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("div", { className: "flex-1 text-left", children: [
                                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
                                  /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-[10px] font-black text-slate-200", children: "LiDAR Fusion Signal" }, void 0, false, {
                                    fileName: "/app/applet/src/App.tsx",
                                    lineNumber: 1131,
                                    columnNumber: 33
                                  }, this),
                                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-slate-500", children: "2 min temu" }, void 0, false, {
                                    fileName: "/app/applet/src/App.tsx",
                                    lineNumber: 1132,
                                    columnNumber: 33
                                  }, this)
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1130,
                                  columnNumber: 31
                                }, this),
                                /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[9px] text-slate-300 leading-snug mt-0.5", children: [
                                  "Kalibracja Delaunaya kompletna. Stała czułość Luma ",
                                  metrics.luma,
                                  " m. Sygnał stabilności gotowy."
                                ] }, void 0, true, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1134,
                                  columnNumber: 31
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1129,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1122,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1100,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-1.5 pb-6", children: [
                        /* @__PURE__ */ jsxDEV(
                          motion.div,
                          {
                            animate: { y: [0, -6, 0] },
                            transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                            children: /* @__PURE__ */ jsxDEV(ChevronUp, { className: "w-4 h-4 text-slate-400" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1148,
                              columnNumber: 29
                            }, this)
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1144,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-[9px] font-bold text-slate-300 uppercase tracking-widest text-center", children: "Kliknij ekran lub przesuń, aby odblokować" }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1150,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1143,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  "lock_screen",
                  true,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1060,
                    columnNumber: 23
                  },
                  this
                )
              ) : (
                /* ==================== ACTIVE APPLICATION VIEWS ==================== */
                /* @__PURE__ */ jsxDEV(
                  motion.div,
                  {
                    initial: { opacity: 0, y: 15 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -15 },
                    className: "flex flex-col min-h-full justify-between",
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "p-3 pb-[64px]", id: "tab_scroller_body", children: [
                        activeTab === "scan" && /* ---------- TAB 1: SKANER CORE ---------- */
                        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3", id: "ios_tab_scan", children: appMode === "tech_selector" ? /* @__PURE__ */ jsxDEV(
                          TechCosmosSelector,
                          {
                            metrics,
                            scanType,
                            setScanType,
                            onInitiateScan: () => {
                              addLog("SYSTEM", "Initiating 3D scanning. Transitioning inside iPhone Tab 1.");
                              setAppMode("active_scanner");
                              triggerHaptic("SCANNER ACTIVE");
                            },
                            triangulationStats,
                            setTriangulationStats
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1174,
                            columnNumber: 33
                          },
                          this
                        ) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center", children: [
                            /* @__PURE__ */ jsxDEV(
                              "button",
                              {
                                onClick: () => {
                                  setAppMode("tech_selector");
                                  triggerHaptic("BACK TO HOME");
                                },
                                className: "font-mono text-[8px] font-bold py-1 px-2.5 bg-slate-950 text-sky-400 hover:text-sky-200 border border-slate-800 rounded transition-all cursor-pointer flex items-center gap-1",
                                children: /* @__PURE__ */ jsxDEV("span", { children: "← OBSZARY SKANU" }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1197,
                                  columnNumber: 39
                                }, this)
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1190,
                                columnNumber: 37
                              },
                              this
                            ),
                            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-400 uppercase font-black", children: "Klub Chomika (Active)" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1199,
                              columnNumber: 37
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1189,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            CameraStream,
                            {
                              facingMode,
                              setFacingMode,
                              isSandboxMode,
                              sandboxMetrics: metrics,
                              onLiveMetricsUpdate: handleLiveMetricsUpdate,
                              faceDetected,
                              setFaceDetected
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1205,
                              columnNumber: 35
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-xl p-2.5 bg-slate-950/20", children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
                              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] font-bold text-slate-400 uppercase tracking-wider", children: "Interactive 3D Delaunay Mesh" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1218,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-sky-400 bg-sky-950/50 px-1 py-0.2 rounded border border-sky-900/30", children: "REAL-TIME INCIRCLE" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1221,
                                columnNumber: 39
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1217,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV(
                              ThreeDHeadVisualizer,
                              {
                                yaw: metrics.yaw,
                                pitch: metrics.pitch,
                                roll: metrics.roll,
                                distance: metrics.distance,
                                faceDetected,
                                minTriangleAngle,
                                maxTriangleEdgeLength,
                                enforceDelaunayCondition,
                                onTriangulationStats: setTriangulationStats,
                                scanType,
                                showLiveMesh: liveFeedback.showLiveMesh,
                                showRealTimeMetrics: liveFeedback.showRealTimeMetrics
                              },
                              void 0,
                              false,
                              {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1226,
                                columnNumber: 37
                              },
                              this
                            )
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1216,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            ChomikUiController,
                            {
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
                              onCapture: handleCapture,
                              onResetLocks: handleResetLocks,
                              appState,
                              setAppState
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1243,
                              columnNumber: 35
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-xl p-3 bg-slate-950/40 flex flex-col gap-2", children: [
                            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-900", children: "Dwell Stability Checklist" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1262,
                              columnNumber: 37
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1 text-[8px] font-mono text-slate-300", children: [
                              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                                /* @__PURE__ */ jsxDEV("span", { children: "1. Face & Rotation:" }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1267,
                                  columnNumber: 41
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { className: faceDetected && isRotationOk ? "text-emerald-400 font-bold" : "text-red-500", children: faceDetected && isRotationOk ? "✔ OK" : "❌ ERR" }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1268,
                                  columnNumber: 41
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1266,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                                /* @__PURE__ */ jsxDEV("span", { children: "2. Distance (≤40cm):" }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1273,
                                  columnNumber: 41
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { className: isDistanceOk ? "text-emerald-400 font-bold" : "text-red-500", children: isDistanceOk ? "✔ OK" : "❌ ERR" }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1274,
                                  columnNumber: 41
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1272,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                                /* @__PURE__ */ jsxDEV("span", { children: "3. Quality Score (≥96%):" }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1279,
                                  columnNumber: 41
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { className: isQualityOk ? "text-emerald-400 font-bold" : "text-red-500", children: isQualityOk ? "✔ OK" : "❌ ERR" }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1280,
                                  columnNumber: 41
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1278,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between border-t border-slate-900 pt-1 mt-1", children: [
                                /* @__PURE__ */ jsxDEV("span", { children: "4. Dwell Coherence:" }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1285,
                                  columnNumber: 41
                                }, this),
                                /* @__PURE__ */ jsxDEV("span", { className: metrics.stabilityMs >= 2e3 ? "text-emerald-400 font-bold" : "text-amber-500", children: metrics.stabilityMs >= 2e3 ? "🔒 LOCKED" : `WAIT (${(metrics.stabilityMs / 10).toFixed(0)}%)` }, void 0, false, {
                                  fileName: "/app/applet/src/App.tsx",
                                  lineNumber: 1286,
                                  columnNumber: 41
                                }, this)
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1284,
                                columnNumber: 39
                              }, this)
                            ] }, void 0, true, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1265,
                              columnNumber: 37
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1261,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1187,
                          columnNumber: 33
                        }, this) }, void 0, false, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1171,
                          columnNumber: 29
                        }, this),
                        activeTab === "tech" && /* ---------- TAB 2: TELEMETRIA SENSORA ---------- */
                        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3", id: "ios_tab_tech", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 p-2 rounded-xl border border-slate-800 text-center font-mono text-[8px] font-bold text-sky-400", children: "SENSOR FUSION & FREQUENCY TELEMETRY" }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1301,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV(LidarDepthHistogram, { metrics, scanType }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1305,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            DiagnosticConsole,
                            {
                              metrics,
                              locks,
                              config: PROTOCOL_CONFIG,
                              isSandboxMode,
                              setIsSandboxMode,
                              onSandboxMetricsChange: handleSandboxMetricsChange,
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
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1307,
                              columnNumber: 31
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-xl overflow-hidden bg-slate-950 mt-1", children: [
                            /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 border-b border-slate-900 px-3 py-1.5 flex items-center justify-between", children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] font-bold text-slate-400", children: "LIVE EDGE SENSOR LOGS" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1331,
                              columnNumber: 35
                            }, this) }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1330,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-950 max-h-[100px] overflow-y-auto font-mono text-[7px] text-slate-400 flex flex-col gap-0.5", children: logs.slice(-10).map((log) => /* @__PURE__ */ jsxDEV("div", { className: "flex gap-1.5 leading-tight", children: [
                              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-600", children: [
                                "[",
                                log.timestamp,
                                "]"
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1338,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400", children: [
                                "[",
                                log.category,
                                "]"
                              ] }, void 0, true, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1339,
                                columnNumber: 39
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 truncate", children: log.message }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1340,
                                columnNumber: 39
                              }, this)
                            ] }, log.id, true, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1337,
                              columnNumber: 37
                            }, this)) }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1335,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1329,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1300,
                          columnNumber: 29
                        }, this),
                        activeTab === "history" && /* ---------- TAB 3: BAZA DANYCH (POSTGRESQL) ---------- */
                        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3", id: "ios_tab_history", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 p-2 rounded-xl border border-slate-800 text-center font-mono text-[8px] font-bold text-emerald-400 flex items-center justify-center gap-1", children: [
                            /* @__PURE__ */ jsxDEV(Database, { className: "w-3 h-3" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1352,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: "SQL BAZA: table 'user_scans_raw'" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1353,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1351,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV(
                            ExportPanel,
                            {
                              capture,
                              onClearCapture: handleClearCapture,
                              onAddDiagnosticLog: addLog,
                              onSaveCloudRecord: (record) => setSavedScans((prev) => [record, ...prev]),
                              scanType
                            },
                            void 0,
                            false,
                            {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1356,
                              columnNumber: 31
                            },
                            this
                          ),
                          /* @__PURE__ */ jsxDEV(UserScansDbViewer, { scans: savedScans }, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1364,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1350,
                          columnNumber: 29
                        }, this),
                        activeTab === "portal" && /* ---------- TAB 4: FLUTTER NATIVE BRIDGE ---------- */
                        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3", id: "ios_tab_portal", children: [
                          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 p-2 rounded-xl border border-slate-800 text-center font-mono text-[8px] font-bold text-purple-400 flex items-center justify-center gap-1", children: [
                            /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-3 h-3" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1372,
                              columnNumber: 33
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: "FLUTTER NATIVE WEBVIEW BRIDGE" }, void 0, false, {
                              fileName: "/app/applet/src/App.tsx",
                              lineNumber: 1373,
                              columnNumber: 33
                            }, this)
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1371,
                            columnNumber: 31
                          }, this),
                          /* @__PURE__ */ jsxDEV(FlutterMobileIntegration, {}, void 0, false, {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1376,
                            columnNumber: 31
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1370,
                          columnNumber: 29
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1168,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-[10px] inset-x-0 h-[50px] border-t border-slate-900/80 bg-slate-950/95 backdrop-blur-md flex items-center justify-around px-2 z-45 pb-[1px] select-none", id: "ios_bottom_tab_bar", children: [
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: () => {
                              setActiveTab("scan");
                              triggerHaptic("Tab: Scanner");
                            },
                            className: `flex flex-col items-center justify-center py-1.5 flex-1 cursor-pointer transition-all ${activeTab === "scan" ? "text-sky-400 scale-105 font-bold" : "text-slate-500 hover:text-slate-300"}`,
                            children: [
                              /* @__PURE__ */ jsxDEV(Camera, { className: "w-4 h-4" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1393,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] mt-0.5 tracking-tighter", children: "Skaner" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1394,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1384,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: () => {
                              setActiveTab("tech");
                              triggerHaptic("Tab: Telemetria");
                            },
                            className: `flex flex-col items-center justify-center py-1.5 flex-1 cursor-pointer transition-all ${activeTab === "tech" ? "text-sky-400 scale-105 font-bold" : "text-slate-500 hover:text-slate-300"}`,
                            children: [
                              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1406,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] mt-0.5 tracking-tighter", children: "Histogram" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1407,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1397,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: () => {
                              setActiveTab("history");
                              triggerHaptic("Tab: Archiwum");
                            },
                            className: `flex flex-col items-center justify-center py-1.5 flex-1 cursor-pointer transition-all ${activeTab === "history" ? "text-sky-400 scale-105 font-bold" : "text-slate-500 hover:text-slate-300"}`,
                            children: [
                              /* @__PURE__ */ jsxDEV(Database, { className: "w-4 h-4" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1419,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] mt-0.5 tracking-tighter", children: "Baza SQL" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1420,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1410,
                            columnNumber: 27
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: () => {
                              setActiveTab("portal");
                              triggerHaptic("Tab: Chomik Hub");
                            },
                            className: `flex flex-col items-center justify-center py-1.5 flex-1 cursor-pointer transition-all ${activeTab === "portal" ? "text-sky-400 scale-105 font-bold" : "text-slate-500 hover:text-slate-300"}`,
                            children: [
                              /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-4 h-4" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1432,
                                columnNumber: 29
                              }, this),
                              /* @__PURE__ */ jsxDEV("span", { className: "text-[7.5px] mt-0.5 tracking-tighter", children: "Chomik Hub" }, void 0, false, {
                                fileName: "/app/applet/src/App.tsx",
                                lineNumber: 1433,
                                columnNumber: 29
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/App.tsx",
                            lineNumber: 1423,
                            columnNumber: 27
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/App.tsx",
                        lineNumber: 1382,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "div",
                        {
                          onClick: () => {
                            setAppMode("tech_selector");
                            triggerHaptic("Home: Reset to sectors");
                          },
                          className: "absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[110px] h-[4px] bg-slate-500 hover:bg-slate-300 rounded-full z-50 opacity-60 cursor-pointer transition-colors",
                          title: "Home Bar: Kliknij, aby wrócić do wyboru obszarów"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/App.tsx",
                          lineNumber: 1439,
                          columnNumber: 25
                        },
                        this
                      )
                    ]
                  },
                  "unlocked_app",
                  true,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1159,
                    columnNumber: 23
                  },
                  this
                )
              ) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1056,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1054,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 942,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 933,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 882,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full lg:w-80 flex flex-col gap-4 z-20 shrink-0", id: "workbench_sidebar_right", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col gap-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Shield, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1466,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Stan Kalibracji iOS" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1467,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1465,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1.5 font-mono text-[9.5px]", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center p-1.5 rounded bg-slate-950/40 border border-slate-900", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "LiDAR Fusion:" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1472,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `font-bold px-1.5 py-0.2 rounded text-[8px] ${locks.lidarFusion === "LOCKED" ? "bg-emerald-950 text-emerald-400" : "bg-slate-900 text-slate-400"}`, children: locks.lidarFusion }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1473,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1471,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center p-1.5 rounded bg-slate-950/40 border border-slate-900", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Auto Focus:" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1479,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `font-bold px-1.5 py-0.2 rounded text-[8px] ${locks.focus === "LOCKED" ? "bg-emerald-950 text-emerald-400" : "bg-slate-900 text-slate-400"}`, children: locks.focus }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1480,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1478,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center p-1.5 rounded bg-slate-950/40 border border-slate-900", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Ekspozycja:" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1486,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `font-bold px-1.5 py-0.2 rounded text-[8px] ${locks.exposure === "LOCKED" ? "bg-emerald-950 text-emerald-400" : "bg-slate-900 text-slate-400"}`, children: locks.exposure }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1487,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1485,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center p-1.5 rounded bg-slate-950/40 border border-slate-900", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Wybrany Sektor:" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1493,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400 font-bold tracking-tight truncate max-w-[140px] text-right", children: scanType }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1494,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1492,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1470,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1464,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1", children: [
              "🐹 ",
              /* @__PURE__ */ jsxDEV("span", { children: "Slay Mądrości Buły" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1504,
                columnNumber: 20
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1503,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[10.5px] text-slate-300 italic leading-relaxed", children: '"Pamiętaj, by trzymać iPhonika sztywniutko na wysokości oczu! Jeśli laserowe kropki LiDARu spadną poniżej 256x192, to spójność siatki Delaunaya pójdzie pić kompot z agrestu!"' }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1506,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] text-slate-500 text-right block", children: "— Buła, Główny Architekt Kalibracji" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1509,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1502,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider", children: "Symulacja Otoczenia" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1514,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2 mt-1", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    setIsSandboxMode(!isSandboxMode);
                    triggerHaptic(isSandboxMode ? "PHYSICAL SENSOR LINKED" : "SANDBOX ENABLED");
                  },
                  className: `w-full font-mono text-[9px] font-bold py-1.5 px-3 rounded-lg border transition-all cursor-pointer text-center ${isSandboxMode ? "bg-slate-950 border-amber-500/40 text-amber-400 hover:text-amber-200" : "bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:text-emerald-200"}`,
                  children: isSandboxMode ? "WYŁĄCZ TRYB PIASKOWNICY (SANDBOX)" : "WŁĄCZ TRYB PIASKOWNICY (SANDBOX)"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1518,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      setMetrics((prev) => ({ ...prev, faceDetected: !prev.faceDetected }));
                      setFaceDetected(!faceDetected);
                      triggerHaptic(faceDetected ? "FACE LOST ⚠️" : "FACE DETECTED 🟢");
                    },
                    className: "flex-1 font-mono text-[8px] font-bold py-1 px-2 rounded bg-slate-950 border border-slate-900 text-slate-300 hover:text-white cursor-pointer",
                    children: faceDetected ? "ZGUB TWARZ" : "WYKRYJ TWARZ"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1533,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      setMetrics((prev) => ({ ...prev, distance: prev.distance === 0.36 ? 0.65 : 0.36 }));
                      triggerHaptic("DYSTANS ZMIENIONY");
                    },
                    className: "flex-1 font-mono text-[8px] font-bold py-1 px-2 rounded bg-slate-950 border border-slate-900 text-slate-300 hover:text-white cursor-pointer",
                    children: metrics.distance <= 0.4 ? "ODSUŃ SENSOR" : "PRZYBLIŻ SENSOR"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1543,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1532,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1517,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1513,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 1461,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 757,
        columnNumber: 9
      }, this)
    ) : (
      /* ==================== FLUID BROAD DASHBOARD MODE (Original Side-by-side but tab-organized) ==================== */
      /* @__PURE__ */ jsxDEV("main", { className: "flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col gap-6", id: "main_content_container", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h1", { className: "text-base font-sans font-black tracking-tight text-white uppercase flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "MediaPipe 3D LiDAR Dashboard (Desktop View)" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1566,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] bg-sky-950 text-sky-400 font-mono px-1.5 py-0.5 rounded border border-sky-900", children: "FULL SCREEN" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1567,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1565,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-sans mt-0.5", children: "Działasz w trybie szerokiego pulpitu. Wszystkie panele zostały dostosowane do szerokich rozdzielczości." }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1569,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1564,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                setIsDeviceFrameEnabled(true);
                triggerHaptic("IPHONE FRAME ACTIVE");
              },
              className: "font-mono text-[9px] font-bold px-3 py-1.5 bg-sky-950 hover:bg-sky-900 text-sky-400 border border-sky-800 rounded-lg cursor-pointer transition-all",
              children: "← POWRÓT DO RAMKI IPHONE'A (ZALECANE)"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1572,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 1563,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-900 bg-slate-950/40 p-1 rounded-lg gap-2", children: ["scan", "tech", "history", "portal"].map((tab) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab(tab),
            className: `px-4 py-2 rounded-lg font-mono text-xs font-bold capitalize cursor-pointer transition-all ${activeTab === tab ? "bg-sky-950 text-sky-400 border border-sky-900" : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"}`,
            children: tab === "scan" ? "🛰️ Skaner Core" : tab === "tech" ? "📊 Histogram i Telemetria" : tab === "history" ? "💾 Archiwum Scans" : "🔌 Chomik Portal"
          },
          tab,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1586,
            columnNumber: 15
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 1584,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "animate-fade-in", children: [
          activeTab === "scan" && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 flex flex-col gap-4 relative border border-sky-950/40 rounded-xl p-4 bg-slate-950/20", id: "visual_panels_container", children: [
              appState === AppState.chill && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-slate-950/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center rounded-xl", id: "tech_data_overlay_locked", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-3xl animate-bounce", children: "💤" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1608,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("h4", { className: "font-mono text-xs font-bold text-amber-400 uppercase tracking-widest mb-2", children: "WARSTWA 1 TECH DATA OVERLAY" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1611,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[11px] text-slate-400 max-w-xs leading-relaxed mb-6", children: [
                  "Buła odpoczywa w swojej norce i popija melisę. Odpal tryb ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-sky-400 font-mono", children: "QUANTUM MODE" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1615,
                    columnNumber: 83
                  }, this),
                  ", aby nałożyć cyber-gogle, podpiąć system LiDAR i uruchomić skaner biometryczny!"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1614,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      addLog("SYSTEM", "Quantum Mode activated.");
                      setAppState(AppState.quantum);
                    },
                    className: "font-mono text-[10px] font-bold py-2.5 px-4 bg-sky-950 hover:bg-sky-900 text-sky-400 border border-sky-800 rounded-lg transition-all flex items-center gap-1.5 active:scale-95",
                    children: "AKTYWUJ QUANTUM MODE"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1617,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1607,
                columnNumber: 21
              }, this),
              appMode === "tech_selector" ? /* @__PURE__ */ jsxDEV(
                TechCosmosSelector,
                {
                  metrics,
                  scanType,
                  setScanType,
                  onInitiateScan: () => setAppMode("active_scanner"),
                  triangulationStats,
                  setTriangulationStats
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1631,
                  columnNumber: 21
                },
                this
              ) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center bg-slate-900/60 p-2 rounded border border-slate-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold text-slate-400", children: "ACTIVE CAMERA PREVIEW" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1642,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("button", { onClick: () => setAppMode("tech_selector"), className: "text-sky-400 font-mono text-[9px] hover:underline", children: "← OBSZARY" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1643,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1641,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(
                  CameraStream,
                  {
                    facingMode,
                    setFacingMode,
                    isSandboxMode,
                    sandboxMetrics: metrics,
                    onLiveMetricsUpdate: handleLiveMetricsUpdate,
                    faceDetected,
                    setFaceDetected
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1645,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-xl p-4 bg-slate-950/20", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-bold text-slate-400 block mb-2", children: "3D MESH WIREFRAME" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1656,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    ThreeDHeadVisualizer,
                    {
                      yaw: metrics.yaw,
                      pitch: metrics.pitch,
                      roll: metrics.roll,
                      distance: metrics.distance,
                      faceDetected,
                      minTriangleAngle,
                      maxTriangleEdgeLength,
                      enforceDelaunayCondition,
                      onTriangulationStats: setTriangulationStats,
                      scanType,
                      showLiveMesh: liveFeedback.showLiveMesh,
                      showRealTimeMetrics: liveFeedback.showRealTimeMetrics
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1657,
                      columnNumber: 25
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1655,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1640,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1605,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxDEV(
                ChomikUiController,
                {
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
                  onCapture: handleCapture,
                  onResetLocks: handleResetLocks,
                  appState,
                  setAppState
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1678,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-xl p-4 bg-slate-950/40", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3 pb-2 border-b border-slate-900", children: "SYSTEM COMPLIANCE MONITOR" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1697,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3 font-mono text-[9px]", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-950 rounded border border-slate-900 flex justify-between", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Face Angle Coherence (≤10°):" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1702,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: faceDetected && isRotationOk ? "text-emerald-400 font-bold" : "text-red-500", children: faceDetected && isRotationOk ? "✔ PASSED" : "❌ FAILED" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1703,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1701,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-950 rounded border border-slate-900 flex justify-between", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Target Range (≤40cm):" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1708,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: isDistanceOk ? "text-emerald-400 font-bold" : "text-red-500", children: isDistanceOk ? "✔ PASSED" : "❌ FAILED" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1709,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1707,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-slate-950 rounded border border-slate-900 flex justify-between col-span-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Delaunay Dwell Timer Status:" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1714,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: metrics.stabilityMs >= 2e3 ? "text-emerald-400 font-bold" : "text-amber-500", children: metrics.stabilityMs >= 2e3 ? "🔒 locked (2000ms hold complete)" : `HOLD STILL (${(metrics.stabilityMs / 10).toFixed(0)}%)` }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1715,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1713,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1700,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1696,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1677,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1602,
            columnNumber: 15
          }, this),
          activeTab === "tech" && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxDEV(LidarDepthHistogram, { metrics, scanType }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1729,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                DiagnosticConsole,
                {
                  metrics,
                  locks,
                  config: PROTOCOL_CONFIG,
                  isSandboxMode,
                  setIsSandboxMode,
                  onSandboxMetricsChange: handleSandboxMetricsChange,
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
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1730,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1728,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-xl overflow-hidden bg-slate-950", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/60 border-b border-slate-900 px-4 py-2 flex items-center justify-between", children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] font-bold text-slate-400", children: "LIVE EDGE CONSOLE SYSTEM LOG" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1755,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1754,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-950 max-h-[200px] overflow-y-auto font-mono text-[9px] text-slate-400 flex flex-col gap-1", children: logs.map((log) => /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-600", children: [
                  "[",
                  log.timestamp,
                  "]"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1760,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400", children: [
                  "[",
                  log.category,
                  "]"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1761,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: log.message }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 1762,
                  columnNumber: 25
                }, this)
              ] }, log.id, true, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1759,
                columnNumber: 23
              }, this)) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1757,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1753,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1727,
            columnNumber: 15
          }, this),
          activeTab === "history" && /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-6", children: [
            /* @__PURE__ */ jsxDEV(
              ExportPanel,
              {
                capture,
                onClearCapture: handleClearCapture,
                onAddDiagnosticLog: addLog,
                onSaveCloudRecord: (record) => setSavedScans((prev) => [record, ...prev]),
                scanType
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1772,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(UserScansDbViewer, { scans: savedScans }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1779,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1771,
            columnNumber: 15
          }, this),
          activeTab === "portal" && /* @__PURE__ */ jsxDEV("div", { className: "max-w-4xl mx-auto", children: /* @__PURE__ */ jsxDEV(FlutterMobileIntegration, {}, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1785,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1784,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 1600,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1561,
        columnNumber: 9
      }, this)
    ),
    /* @__PURE__ */ jsxDEV("footer", { className: "border-t border-slate-900 bg-slate-950 py-4 px-6 text-center font-mono text-[9px] text-slate-600 z-20", id: "app_footer_nav", children: /* @__PURE__ */ jsxDEV("span", { children: "MediaPipe 3D Edge AI Calibration Hub © 2026. Custom formatted for Apple iOS devices." }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1795,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1794,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: activeReward && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4", id: "reward_modal_overlay", children: /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { scale: 0.9, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.9, opacity: 0 },
        className: "bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl relative overflow-hidden",
        id: "reward_modal_card",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 blur-[60px] rounded-full pointer-events-none" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1809,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-[9px] font-bold text-amber-400 tracking-wider uppercase mb-1", children: activeReward.title }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1811,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "relative w-36 h-36 mx-auto my-6 flex items-center justify-center bg-slate-950 rounded-full border-2 border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.15)] overflow-hidden", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06)_0%,transparent_70%)]" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1816,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                animate: { rotateY: 360 },
                transition: { repeat: Infinity, duration: 6, ease: "linear" },
                className: "w-20 h-20 bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-amber-500/20 relative border border-yellow-200/50",
                style: { transformStyle: "preserve-3d" },
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-bl from-amber-600 to-amber-400 rounded-2xl border border-yellow-200/20 flex items-center justify-center", style: { backfaceVisibility: "hidden", transform: "rotateY(180deg)" }, children: /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-black text-slate-950 uppercase tracking-widest", children: "BUŁA" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1825,
                    columnNumber: 21
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1824,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex flex-col items-center justify-center", style: { backfaceVisibility: "hidden" }, children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-8 h-8 text-slate-950" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1829,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] font-black text-slate-950 uppercase tracking-tight mt-1", children: "SLAY!" }, void 0, false, {
                      fileName: "/app/applet/src/App.tsx",
                      lineNumber: 1830,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1828,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1818,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-1.5 rounded-full border border-dashed border-amber-500/30 animate-spin", style: { animationDuration: "12s" } }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1834,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-4 rounded-full border border-double border-amber-500/10 animate-spin", style: { animationDuration: "24s", animationDirection: "reverse" } }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 1835,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1815,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "font-sans text-lg font-black text-slate-100 tracking-tight mb-2", children: activeReward.badgeName }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1838,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[11px] text-slate-400 leading-relaxed px-4 mb-6", children: activeReward.description }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1841,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => {
                  navigator.clipboard.writeText(`Zrobiłem Glow-up Check w klubie chomika z Bułą i zdobyłem odznakę: ${activeReward.badgeName}!`);
                  alert("Slay! Skopiowano link do Twoich Statsów do schowka! Wyślij go znajomym na social media! ✨");
                },
                className: "w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 font-sans font-bold text-xs py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1854,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "UDOSTĘPNIJ STATSY NA SOCIAL MEDIA" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 1855,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1846,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setActiveReward(null),
                className: "w-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 font-mono text-[10px] py-2 px-4 rounded-lg border border-slate-800 transition-all cursor-pointer",
                children: "WRÓĆ DO KLUBU"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 1857,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 1845,
            columnNumber: 15
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1802,
        columnNumber: 13
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1801,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1799,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: isTransitioning && /* @__PURE__ */ jsxDEV(
      TransitionOverlay,
      {
        isVisible: true,
        onComplete: () => {
          setIsTransitioning(false);
          setAppStateInternal(AppState.quantum);
        }
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 1872,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 1870,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 688,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2FtZXJhU3RyZWFtIH0gZnJvbSAnLi9jb21wb25lbnRzL0NhbWVyYVN0cmVhbSc7XG5pbXBvcnQgeyBUaHJlZURIZWFkVmlzdWFsaXplciB9IGZyb20gJy4vY29tcG9uZW50cy9UaHJlZURIZWFkVmlzdWFsaXplcic7XG5pbXBvcnQgeyBEaWFnbm9zdGljQ29uc29sZSB9IGZyb20gJy4vY29tcG9uZW50cy9EaWFnbm9zdGljQ29uc29sZSc7XG5pbXBvcnQgeyBFeHBvcnRQYW5lbCB9IGZyb20gJy4vY29tcG9uZW50cy9FeHBvcnRQYW5lbCc7XG5pbXBvcnQgeyBVc2VyU2NhbnNEYlZpZXdlciB9IGZyb20gJy4vY29tcG9uZW50cy9Vc2VyU2NhbnNEYlZpZXdlcic7XG5pbXBvcnQgeyBDaG9taWtVaUNvbnRyb2xsZXIsIFRyYW5zaXRpb25PdmVybGF5IH0gZnJvbSAnLi9jb21wb25lbnRzL0Nob21pa1VpQ29udHJvbGxlcic7XG5pbXBvcnQgeyBUZWNoQ29zbW9zU2VsZWN0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvVGVjaENvc21vc1NlbGVjdG9yJztcbmltcG9ydCB7IExpZGFyRGVwdGhIaXN0b2dyYW0gfSBmcm9tICcuL2NvbXBvbmVudHMvTGlkYXJEZXB0aEhpc3RvZ3JhbSc7XG5pbXBvcnQgeyBGbHV0dGVyTW9iaWxlSW50ZWdyYXRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvRmx1dHRlck1vYmlsZUludGVncmF0aW9uJztcbmltcG9ydCB7IFNlbnNvckNvbmZpZywgQ2FsaWJyYXRpb25NZXRyaWNzLCBMb2NrU3RhdGUsIERpYWdub3N0aWNMb2csIE5vcm1hbGl6ZWRDYXB0dXJlLCBVc2VyU2NhblJhdywgTGl2ZUZlZWRiYWNrU2V0dGluZ3MsIEFwcFN0YXRlLCBBcHBDb250ZW50IH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBcbiAgQ2FtZXJhLCBcbiAgVGVybWluYWwsIFxuICBDaGVja0NpcmNsZSwgXG4gIEFsZXJ0Q2lyY2xlLFxuICBDcHUsIFxuICBNYXhpbWl6ZTIsXG4gIFJlZnJlc2hDY3csXG4gIFNwYXJrbGVzLFxuICBDb21wYXNzLFxuICBPcmJpdCxcbiAgU21hcnRwaG9uZSxcbiAgRGF0YWJhc2UsXG4gIFNsaWRlcnMsXG4gIFNldHRpbmdzLFxuICBMb2NrLFxuICBVbmxvY2ssXG4gIFdpZmksXG4gIEJhdHRlcnksXG4gIENoZXZyb25VcCxcbiAgQmVsbCxcbiAgU2hpZWxkLFxuICBNZW51LFxuICBJbmZvLFxuICBQYWxldHRlXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbi8vIFNlbnNvciBjb25maWd1cmF0aW9uIHByb3RvY29sIGFkaGVyaW5nIHRvIENhbWVyYUNvbmZpZ1Byb3RvY29sICYgU2Vuc29yQ29uZmlnUHJvdG9jb2xcbmNvbnN0IFBST1RPQ09MX0NPTkZJRzogU2Vuc29yQ29uZmlnID0ge1xuICBjYW1lcmFQb3NpdGlvbjogJ0JBQ0tfTUFJTicsXG4gIGVuYWJsZUZsYXNoOiBmYWxzZSxcbiAgZXhwb3N1cmVMdW1hVGFyZ2V0OiAxNDIuMCxcbiAgbGlkYXJSZXNvbHV0aW9uV2lkdGg6IDI1NixcbiAgbGlkYXJSZXNvbHV0aW9uSGVpZ2h0OiAxOTIsXG4gIGZyYW1lUmF0ZUxpZGFyOiA2MCxcbiAgbGlkYXJQcmVjaXNpb25SYW5nZTogMC40MCwgLy8gNDAgY20gb3B0aW1hbCByYW5nZVxuICBtaW5UcmlhbmdsZUFuZ2xlOiAzMC4wLFxuICBtYXhUcmlhbmdsZUVkZ2VMZW5ndGg6IDUuMCxcbiAgZW5mb3JjZURlbGF1bmF5Q29uZGl0aW9uOiB0cnVlLFxuICBtaW5RdWFsaXR5U2NvcmU6IDAuOTYsICAgICAgIC8vIFN0cmljdCB0aHJlc2hvbGRcbiAgc3RhYmlsaXR5VGltZW91dE1zOiAyMDAwLCAgICAgLy8gU3RhYmxlIGZvciAyc1xufTtcblxuLy8gU2VlZGluZyBzdGFuZGFyZCBtZXRyaWNzIGZvciBiZWF1dGlmdWwgc3BhcmtsaW5lc1xuY29uc3QgSU5JVElBTF9ISVNUT1JZID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMjAgfSwgKF8sIGkpID0+ICh7XG4gIGx1bWE6IDEzNSArIE1hdGguc2luKGkgLyAxLjUpICogOCArIE1hdGgucmFuZG9tKCkgKiAzLFxuICBzaGFycG5lc3M6IDAuNzQgKyAoaSAvIDQ1KSArIE1hdGgucmFuZG9tKCkgKiAwLjAzLFxuICBkaXN0YW5jZTogMC4zOCAtIChpIC8gMTIwMCksXG4gIGNjdDogNTYwMCArIGkgKiAzNSArIE1hdGgucmFuZG9tKCkgKiA4MCxcbn0pKTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCBbYXBwTW9kZSwgc2V0QXBwTW9kZV0gPSB1c2VTdGF0ZTwndGVjaF9zZWxlY3RvcicgfCAnYWN0aXZlX3NjYW5uZXInPigndGVjaF9zZWxlY3RvcicpO1xuICBjb25zdCBbYXBwU3RhdGUsIHNldEFwcFN0YXRlSW50ZXJuYWxdID0gdXNlU3RhdGU8QXBwU3RhdGU+KEFwcFN0YXRlLmNoaWxsKTtcbiAgY29uc3QgW2lzVHJhbnNpdGlvbmluZywgc2V0SXNUcmFuc2l0aW9uaW5nXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBzZXRBcHBTdGF0ZSA9IChuZXh0U3RhdGU6IEFwcFN0YXRlKSA9PiB7XG4gICAgaWYgKGFwcFN0YXRlID09PSBBcHBTdGF0ZS5jaGlsbCAmJiBuZXh0U3RhdGUgPT09IEFwcFN0YXRlLnF1YW50dW0pIHtcbiAgICAgIHNldElzVHJhbnNpdGlvbmluZyh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0QXBwU3RhdGVJbnRlcm5hbChuZXh0U3RhdGUpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBbYWN0aXZlUmV3YXJkLCBzZXRBY3RpdmVSZXdhcmRdID0gdXNlU3RhdGU8e1xuICAgIHR5cGU6ICdiYWRnZScgfCAncXVlc3QnO1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgYmFkZ2VOYW1lOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgfSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZmFjaW5nTW9kZSwgc2V0RmFjaW5nTW9kZV0gPSB1c2VTdGF0ZTwnZW52aXJvbm1lbnQnIHwgJ3VzZXInPignZW52aXJvbm1lbnQnKTtcbiAgY29uc3QgW2lzU2FuZGJveE1vZGUsIHNldElzU2FuZGJveE1vZGVdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7IC8vIERldiBzaW11bGF0aW9uIGJ5IGRlZmF1bHRcbiAgY29uc3QgW2ZhY2VEZXRlY3RlZCwgc2V0RmFjZURldGVjdGVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbc2hvd0ZsYXNoLCBzZXRTaG93Rmxhc2hdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEFwcGxlIGlQaG9uZSBTaW11bGF0b3IgU3RhdGVzXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTwnc2NhbicgfCAndGVjaCcgfCAnaGlzdG9yeScgfCAncG9ydGFsJz4oJ3NjYW4nKTtcbiAgY29uc3QgW2lzUGhvbmVMb2NrZWQsIHNldElzUGhvbmVMb2NrZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbaXBob25lQ29sb3IsIHNldElwaG9uZUNvbG9yXSA9IHVzZVN0YXRlPCd0aXRhbml1bScgfCAnYmxhY2snIHwgJ3B1cnBsZScgfCAnc2lsdmVyJz4oJ3RpdGFuaXVtJyk7XG4gIGNvbnN0IFtpc0RldmljZUZyYW1lRW5hYmxlZCwgc2V0SXNEZXZpY2VGcmFtZUVuYWJsZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtiYXR0ZXJ5TGV2ZWwsIHNldEJhdHRlcnlMZXZlbF0gPSB1c2VTdGF0ZTxudW1iZXI+KDk4KTtcbiAgY29uc3QgW3RpbWVTdHJpbmcsIHNldFRpbWVTdHJpbmddID0gdXNlU3RhdGU8c3RyaW5nPignMDk6NDEnKTtcbiAgY29uc3QgW2hhcHRpY0ZlZWRiYWNrLCBzZXRIYXB0aWNGZWVkYmFja10gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICAvLyBUaW1lIGFuZCBCYXR0ZXJ5IFNpbXVsYXRvciBFZmZlY3RcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1cGRhdGVUaW1lID0gKCkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgICAgIGNvbnN0IGhycyA9IFN0cmluZyhub3cuZ2V0SG91cnMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgIGNvbnN0IG1pbnMgPSBTdHJpbmcobm93LmdldE1pbnV0ZXMoKSkucGFkU3RhcnQoMiwgJzAnKTtcbiAgICAgIHNldFRpbWVTdHJpbmcoYCR7aHJzfToke21pbnN9YCk7XG4gICAgfTtcbiAgICB1cGRhdGVUaW1lKCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh1cGRhdGVUaW1lLCAxMDAwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2V0QmF0dGVyeUxldmVsKHByZXYgPT4ge1xuICAgICAgICBpZiAocHJldiA8PSAxNSkgcmV0dXJuIDEwMDsgLy8gUmVjaGFyZ2Ugc2ltdWxhdGlvblxuICAgICAgICByZXR1cm4gcHJldiAtIDE7XG4gICAgICB9KTtcbiAgICB9LCA2MDAwMCk7XG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgdHJpZ2dlckhhcHRpYyA9IChtc2c6IHN0cmluZykgPT4ge1xuICAgIHNldEhhcHRpY0ZlZWRiYWNrKG1zZyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRIYXB0aWNGZWVkYmFjayhudWxsKSwgMTAwMCk7XG4gIH07XG5cbiAgLy8gQ2FsaWJyYXRpb24gbWV0cmljc1xuICBjb25zdCBbbWV0cmljcywgc2V0TWV0cmljc10gPSB1c2VTdGF0ZTxDYWxpYnJhdGlvbk1ldHJpY3M+KHtcbiAgICBmYWNlRGV0ZWN0ZWQ6IHRydWUsXG4gICAgZGlzdGFuY2U6IDAuMzYsXG4gICAgcXVhbGl0eVNjb3JlOiAwLjk3LFxuICAgIHlhdzogMi4wLFxuICAgIHBpdGNoOiAtMS4wLFxuICAgIHJvbGw6IDAuNSxcbiAgICBsdW1hOiAxNDIsXG4gICAgc2hhcnBuZXNzOiAwLjg4LFxuICAgIGNjdDogNTY1MCxcbiAgICBzdGFiaWxpdHlNczogMCxcbiAgICBsaWRhclBvaW50c0NvdW50OiA0OTE1MiwgLy8gMjU2IHggMTkyIGdyaWQgcmVzb2x1dGlvblxuICB9KTtcblxuICAvLyBUcmlhbmd1bGF0aW9uIGZpbHRlciBzdGF0ZXNcbiAgY29uc3QgW21pblRyaWFuZ2xlQW5nbGUsIHNldE1pblRyaWFuZ2xlQW5nbGVdID0gdXNlU3RhdGU8bnVtYmVyPihQUk9UT0NPTF9DT05GSUcubWluVHJpYW5nbGVBbmdsZSk7XG4gIGNvbnN0IFttYXhUcmlhbmdsZUVkZ2VMZW5ndGgsIHNldE1heFRyaWFuZ2xlRWRnZUxlbmd0aF0gPSB1c2VTdGF0ZTxudW1iZXI+KFBST1RPQ09MX0NPTkZJRy5tYXhUcmlhbmdsZUVkZ2VMZW5ndGgpO1xuICBjb25zdCBbZW5mb3JjZURlbGF1bmF5Q29uZGl0aW9uLCBzZXRFbmZvcmNlRGVsYXVuYXlDb25kaXRpb25dID0gdXNlU3RhdGU8Ym9vbGVhbj4oUFJPVE9DT0xfQ09ORklHLmVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbik7XG4gIGNvbnN0IFt0cmlhbmd1bGF0aW9uU3RhdHMsIHNldFRyaWFuZ3VsYXRpb25TdGF0c10gPSB1c2VTdGF0ZTx7IHRvdGFsOiBudW1iZXI7IHNraW5ueTogbnVtYmVyOyB0b29Mb25nOiBudW1iZXIgfT4oe1xuICAgIHRvdGFsOiAwLFxuICAgIHNraW5ueTogMCxcbiAgICB0b29Mb25nOiAwLFxuICB9KTtcblxuICAvLyBNdWx0aS1zZW5zb3IgbG9jayBzdGF0ZXNcbiAgY29uc3QgW2xvY2tzLCBzZXRMb2Nrc10gPSB1c2VTdGF0ZTxMb2NrU3RhdGU+KHtcbiAgICBleHBvc3VyZTogJ1VOTE9DS0VEJyxcbiAgICBmb2N1czogJ1VOTE9DS0VEJyxcbiAgICB3aGl0ZUJhbGFuY2U6ICdVTkxPQ0tFRCcsXG4gICAgbGlkYXJGdXNpb246ICdVTkxPQ0tFRCcsXG4gIH0pO1xuXG4gIGNvbnN0IFtoaXN0b3J5LCBzZXRIaXN0b3J5XSA9IHVzZVN0YXRlKElOSVRJQUxfSElTVE9SWSk7XG4gIGNvbnN0IFtsb2dzLCBzZXRMb2dzXSA9IHVzZVN0YXRlPERpYWdub3N0aWNMb2dbXT4oW10pO1xuICBjb25zdCBsb2dzRW5kUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtjYXB0dXJlLCBzZXRDYXB0dXJlXSA9IHVzZVN0YXRlPE5vcm1hbGl6ZWRDYXB0dXJlIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gTGl2ZUZlZWRiYWNrUHJvdG9jb2wgJiBQb3N0Z3JlU1FMIHNjaGVtYSBzdGF0ZXNcbiAgY29uc3QgW3NjYW5UeXBlLCBzZXRTY2FuVHlwZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdjaG9taWtpX3R3YXJ6Jyk7XG4gIGNvbnN0IFtsaXZlRmVlZGJhY2ssIHNldExpdmVGZWVkYmFja10gPSB1c2VTdGF0ZTxMaXZlRmVlZGJhY2tTZXR0aW5ncz4oe1xuICAgIGNvbnRpbnVvdXNTY2FubmluZzogdHJ1ZSxcbiAgICBzaG93TGl2ZU1lc2g6IHRydWUsXG4gICAgc2hvd1JlYWxUaW1lTWV0cmljczogdHJ1ZSxcbiAgICB1cGRhdGVGcmVxdWVuY3lIejogMzAuMCxcbiAgfSk7XG5cbiAgY29uc3QgW3NhdmVkU2NhbnMsIHNldFNhdmVkU2NhbnNdID0gdXNlU3RhdGU8VXNlclNjYW5SYXdbXT4oW1xuICAgIHtcbiAgICAgIGlkOiAnOGExMmM4YjQtZWY5ZC00NzJiLThhMDMtN2JmMmE2NGM0ODkyJyxcbiAgICAgIHVzZXJfaWQ6ICdhOTNiNGQxMi04OGVmLTQxMmUtYTUwMy02N2NiM2QwMDJiZjQnLFxuICAgICAgc2Nhbl90eXBlOiAnY2hvbWlraV90d2FyeicsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzNjAwMDAwICogMjQpLnRvSVNPU3RyaW5nKCksIC8vIDEgZGF5IGFnb1xuICAgICAgcmF3X2ltYWdlc191cmw6IFsnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1MzU3MTM4NzUwMDItZDFkMGNmMzc3ZmRlP2F1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTIwJmg9MTIwJnE9ODAnXSxcbiAgICAgIGxpZGFyX2RhdGFfdXJsOiAnaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2VkZ2UtYWktbGlkYXItZHVtcHMvcmF3LzhhMTJjOGI0LWVmOWQtNDcyYi04YTAzLTdiZjJhNjRjNDg5Mi5wbHknLFxuICAgICAgaXNfcHJvY2Vzc2VkOiB0cnVlLFxuICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgeWF3OiAxLjIsXG4gICAgICAgIHBpdGNoOiAtMi4wLFxuICAgICAgICByb2xsOiAwLjEsXG4gICAgICAgIGx1bWE6IDEzNSxcbiAgICAgICAgc2hhcnBuZXNzOiAwLjg0LFxuICAgICAgICBjY3Q6IDU2MDAsXG4gICAgICAgIHBvaW50c0NvdW50OiA0OTE1MixcbiAgICAgICAgZGlzdGFuY2U6IDAuMzUsXG4gICAgICAgIHRyaWFuZ2xlQ291bnQ6IDU0LFxuICAgICAgICB2YWxpZERlbGF1bmF5Q291bnQ6IDUxLFxuICAgICAgICBhdmVyYWdlRWRnZUxlbmd0aE1tOiAzLjgyLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnZjkzY2I3NDEtMTIwZC00ODFjLWJmMDktMjQ3MDEyZmJjZTEyJyxcbiAgICAgIHVzZXJfaWQ6ICdhOTNiNGQxMi04OGVmLTQxMmUtYTUwMy02N2NiM2QwMDJiZjQnLFxuICAgICAgc2Nhbl90eXBlOiAnb3BvbmthX2JyenVjaCcsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzNjAwMDAwICogNSkudG9JU09TdHJpbmcoKSwgLy8gNSBob3VycyBhZ29cbiAgICAgIHJhd19pbWFnZXNfdXJsOiBbJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTcxMDE5NjEzNDU0LTFjYjJmOTliMmQ4Yj9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTEyMCZoPTEyMCZxPTgwJ10sXG4gICAgICBsaWRhcl9kYXRhX3VybDogJ2h0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9lZGdlLWFpLWxpZGFyLWR1bXBzL3Jhdy9mOTNjYjc0MS0xMjBkLTQ4MWMtYmYwOS0yNDcwMTJmYmNlMTIucGx5JyxcbiAgICAgIGlzX3Byb2Nlc3NlZDogdHJ1ZSxcbiAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgIHlhdzogMC40LFxuICAgICAgICBwaXRjaDogMC44LFxuICAgICAgICByb2xsOiAtMC4yLFxuICAgICAgICBsdW1hOiAxNDUsXG4gICAgICAgIHNoYXJwbmVzczogMC44OSxcbiAgICAgICAgY2N0OiA1OTAwLFxuICAgICAgICBwb2ludHNDb3VudDogNDkxNTIsXG4gICAgICAgIGRpc3RhbmNlOiAwLjM4LFxuICAgICAgICB0cmlhbmdsZUNvdW50OiA2OCxcbiAgICAgICAgdmFsaWREZWxhdW5heUNvdW50OiA2NSxcbiAgICAgICAgYXZlcmFnZUVkZ2VMZW5ndGhNbTogNC4xNSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2Q4M2FiMjE0LWVmOWQtNDcyYi04YTAzLTdiZjJhNjRjNDg5MicsXG4gICAgICB1c2VyX2lkOiAnYTkzYjRkMTItODhlZi00MTJlLWE1MDMtNjdjYjNkMDAyYmY0JyxcbiAgICAgIHNjYW5fdHlwZTogJ2Nob21pa2lfdHdhcnonLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMzYwMDAwMCAqIDQ4KS50b0lTT1N0cmluZygpLCAvLyAyIGRheXMgYWdvXG4gICAgICByYXdfaW1hZ2VzX3VybDogWydodHRwczovL2ltYWdlcy51bnNwbGFzaC5jb20vcGhvdG8tMTUzNTcxMzg3NTAwMi1kMWQwY2YzNzdmZGU/YXV0bz1mb3JtYXQmZml0PWNyb3Amdz0xMjAmaD0xMjAmcT04MCddLFxuICAgICAgbGlkYXJfZGF0YV91cmw6ICdodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vZWRnZS1haS1saWRhci1kdW1wcy9yYXcvZDgzYWIyMTQtZWY5ZC00NzJiLThhMDMtN2JmMmE2NGM0ODkyLnBseScsXG4gICAgICBpc19wcm9jZXNzZWQ6IHRydWUsXG4gICAgICBtZXRhZGF0YToge1xuICAgICAgICB5YXc6IC0wLjUsXG4gICAgICAgIHBpdGNoOiAxLjEsXG4gICAgICAgIHJvbGw6IDAuMyxcbiAgICAgICAgbHVtYTogMTQwLFxuICAgICAgICBzaGFycG5lc3M6IDAuODcsXG4gICAgICAgIGNjdDogNTc1MCxcbiAgICAgICAgcG9pbnRzQ291bnQ6IDQ5MTUyLFxuICAgICAgICBkaXN0YW5jZTogMC4zNixcbiAgICAgICAgdHJpYW5nbGVDb3VudDogNjIsXG4gICAgICAgIHZhbGlkRGVsYXVuYXlDb3VudDogNTksXG4gICAgICAgIGF2ZXJhZ2VFZGdlTGVuZ3RoTW06IDMuOTAsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdlMTJjYjE0MS0xMjBkLTQ4MWMtYmYwOS0yNDcwMTJmYmNlMTInLFxuICAgICAgdXNlcl9pZDogJ2E5M2I0ZDEyLTg4ZWYtNDEyZS1hNTAzLTY3Y2IzZDAwMmJmNCcsXG4gICAgICBzY2FuX3R5cGU6ICdvcG9ua2FfYnJ6dWNoJyxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDM2MDAwMDAgKiA3MikudG9JU09TdHJpbmcoKSwgLy8gMyBkYXlzIGFnb1xuICAgICAgcmF3X2ltYWdlc191cmw6IFsnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NzEwMTk2MTM0NTQtMWNiMmY5OWIyZDhiP2F1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTIwJmg9MTIwJnE9ODAnXSxcbiAgICAgIGxpZGFyX2RhdGFfdXJsOiAnaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2VkZ2UtYWktbGlkYXItZHVtcHMvcmF3L2UxMmNiMTQxLTEyMGQtNDgxYy1iZjA5LTI0NzAxMmZiY2UxMi5wbHknLFxuICAgICAgaXNfcHJvY2Vzc2VkOiB0cnVlLFxuICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgeWF3OiAwLjEsXG4gICAgICAgIHBpdGNoOiAtMC4yLFxuICAgICAgICByb2xsOiAwLjUsXG4gICAgICAgIGx1bWE6IDEzOCxcbiAgICAgICAgc2hhcnBuZXNzOiAwLjkxLFxuICAgICAgICBjY3Q6IDU4MDAsXG4gICAgICAgIHBvaW50c0NvdW50OiA0OTE1MixcbiAgICAgICAgZGlzdGFuY2U6IDAuMzcsXG4gICAgICAgIHRyaWFuZ2xlQ291bnQ6IDY1LFxuICAgICAgICB2YWxpZERlbGF1bmF5Q291bnQ6IDYzLFxuICAgICAgICBhdmVyYWdlRWRnZUxlbmd0aE1tOiA0LjAyLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnYjEyY2IzNDUtMjM0YS01NjdiLWNkZWYtMTIzNDU2Nzg5YWJjJyxcbiAgICAgIHVzZXJfaWQ6ICdhOTNiNGQxMi04OGVmLTQxMmUtYTUwMy02N2NiM2QwMDJiZjQnLFxuICAgICAgc2Nhbl90eXBlOiAnY2hvbWlraV90d2FyeicsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSAzNjAwMDAwICogOTYpLnRvSVNPU3RyaW5nKCksIC8vIDQgZGF5cyBhZ29cbiAgICAgIHJhd19pbWFnZXNfdXJsOiBbJ2h0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM1NzEzODc1MDAyLWQxZDBjZjM3N2ZkZT9hdXRvPWZvcm1hdCZmaXQ9Y3JvcCZ3PTEyMCZoPTEyMCZxPTgwJ10sXG4gICAgICBsaWRhcl9kYXRhX3VybDogJ2h0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9lZGdlLWFpLWxpZGFyLWR1bXBzL3Jhdy9iMTJjYjM0NS0yMzRhLTU2N2ItY2RlZi0xMjM0NTY3ODlhYmMucGx5JyxcbiAgICAgIGlzX3Byb2Nlc3NlZDogdHJ1ZSxcbiAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgIHlhdzogMC44LFxuICAgICAgICBwaXRjaDogMC41LFxuICAgICAgICByb2xsOiAtMC40LFxuICAgICAgICBsdW1hOiAxNDIsXG4gICAgICAgIHNoYXJwbmVzczogMC44NSxcbiAgICAgICAgY2N0OiA1NjUwLFxuICAgICAgICBwb2ludHNDb3VudDogNDkxNTIsXG4gICAgICAgIGRpc3RhbmNlOiAwLjM0LFxuICAgICAgICB0cmlhbmdsZUNvdW50OiA1OCxcbiAgICAgICAgdmFsaWREZWxhdW5heUNvdW50OiA1NixcbiAgICAgICAgYXZlcmFnZUVkZ2VMZW5ndGhNbTogMy43NSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2M5OGNiNzY1LWExMmItMzRjNS1lNjdkLTk4NzY1NDMyMTBmZScsXG4gICAgICB1c2VyX2lkOiAnYTkzYjRkMTItODhlZi00MTJlLWE1MDMtNjdjYjNkMDAyYmY0JyxcbiAgICAgIHNjYW5fdHlwZTogJ29wb25rYV9icnp1Y2gnLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMzYwMDAwMCAqIDEyMCkudG9JU09TdHJpbmcoKSwgLy8gNSBkYXlzIGFnb1xuICAgICAgcmF3X2ltYWdlc191cmw6IFsnaHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1NzEwMTk2MTM0NTQtMWNiMmY5OWIyZDhiP2F1dG89Zm9ybWF0JmZpdD1jcm9wJnc9MTIwJmg9MTIwJnE9ODAnXSxcbiAgICAgIGxpZGFyX2RhdGFfdXJsOiAnaHR0cHM6Ly9zdG9yYWdlLmdvb2dsZWFwaXMuY29tL2VkZ2UtYWktbGlkYXItZHVtcHMvcmF3L2M5OGNiNzY1LWExMmItMzRjNS1lNjdkLTk4NzY1NDMyMTBmZS5wbHknLFxuICAgICAgaXNfcHJvY2Vzc2VkOiB0cnVlLFxuICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgeWF3OiAtMC4yLFxuICAgICAgICBwaXRjaDogLTEuMCxcbiAgICAgICAgcm9sbDogLTAuMSxcbiAgICAgICAgbHVtYTogMTM5LFxuICAgICAgICBzaGFycG5lc3M6IDAuODgsXG4gICAgICAgIGNjdDogNTcwMCxcbiAgICAgICAgcG9pbnRzQ291bnQ6IDQ5MTUyLFxuICAgICAgICBkaXN0YW5jZTogMC4zOSxcbiAgICAgICAgdHJpYW5nbGVDb3VudDogNzAsXG4gICAgICAgIHZhbGlkRGVsYXVuYXlDb3VudDogNjgsXG4gICAgICAgIGF2ZXJhZ2VFZGdlTGVuZ3RoTW06IDQuMjAsXG4gICAgICB9LFxuICAgIH1cbiAgXSk7XG5cbiAgLy8gQXBwZW5kIGVudHJ5IHRvIHN5c3RlbSBsb2cgdGVybWluYWxcbiAgY29uc3QgYWRkTG9nID0gKGNhdGVnb3J5OiBEaWFnbm9zdGljTG9nWydjYXRlZ29yeSddLCBtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygnZW4tR0InLCB7IGhvdXIxMjogZmFsc2UgfSkgKyAnLicgKyBTdHJpbmcobmV3IERhdGUoKS5nZXRNaWxsaXNlY29uZHMoKSkucGFkU3RhcnQoMywgJzAnKTtcbiAgICBjb25zdCBuZXdMb2c6IERpYWdub3N0aWNMb2cgPSB7XG4gICAgICBpZDogTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDExKSxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgbWVzc2FnZSxcbiAgICB9O1xuICAgIHNldExvZ3MoKHByZXYpID0+IFsuLi5wcmV2LnNsaWNlKC0zNSksIG5ld0xvZ10pO1xuICB9O1xuXG4gIC8vIFNldHVwIGxvZ2dpbmcgb24gYm9vdFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGFkZExvZygnU1lTVEVNJywgJ011bHRpLVNlbnNvciBGdXNpb24gRW5naW5lIGluaXRpYWxpemVkLicpO1xuICAgIGFkZExvZygnTElEQVInLCAnRW5mb3JjaW5nIGlPUyBMaURBUiBjb25zdHJhaW50czogMjU2eDE5MiBhY3RpdmUgcG9pbnQgcHJvamVjdGlvbiBncmlkLicpO1xuICAgIGFkZExvZygnVFJJQU5HVUxBVElPTicsICdEZWxhdW5heSBUcmlhbmd1bGF0aW9uIGFjdGl2ZTogSW5DaXJjbGUgY2hlY2tzIGVuYWJsZWQuJyk7XG4gICAgYWRkTG9nKCdIVycsICdIYXJkd2FyZSBDb25maWd1cmF0aW9uIGxvY2tlZDogQ2FtZXJhUG9zaXRpb24gPSBCQUNLX01BSU4sIEZsYXNoID0gRElTQUJMRUQuJyk7XG4gIH0sIFtdKTtcblxuICAvLyBTeW5jIGxvZyB2aWV3ZXIgc2Nyb2xsXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9nc0VuZFJlZi5jdXJyZW50Py5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcbiAgfSwgW2xvZ3NdKTtcblxuICAvLyBIYW5kbGUgc2ltdWxhdGlvbiBtb2RlIHN3aXRjaGluZ1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChpc1NhbmRib3hNb2RlKSB7XG4gICAgICBhZGRMb2coJ1NZU1RFTScsICdEaWFnbm9zdGljIFNhbmRib3ggYWN0aXZhdGVkLiBTaW11bGF0aW5nIGFjdGl2ZSBMaURBUiBmcmFtZSBjYXB0dXJlcy4nKTtcbiAgICAgIHNldE1ldHJpY3Moe1xuICAgICAgICBmYWNlRGV0ZWN0ZWQ6IHRydWUsXG4gICAgICAgIGRpc3RhbmNlOiAwLjM2LFxuICAgICAgICBxdWFsaXR5U2NvcmU6IDAuOTgsXG4gICAgICAgIHlhdzogMC41LFxuICAgICAgICBwaXRjaDogLTAuNSxcbiAgICAgICAgcm9sbDogMC4yLFxuICAgICAgICBsdW1hOiAxNDIsXG4gICAgICAgIHNoYXJwbmVzczogMC45MCxcbiAgICAgICAgY2N0OiA1ODAwLFxuICAgICAgICBzdGFiaWxpdHlNczogMCxcbiAgICAgICAgbGlkYXJQb2ludHNDb3VudDogNDkxNTIsXG4gICAgICB9KTtcbiAgICAgIHNldExvY2tzKHsgZXhwb3N1cmU6ICdVTkxPQ0tFRCcsIGZvY3VzOiAnVU5MT0NLRUQnLCB3aGl0ZUJhbGFuY2U6ICdVTkxPQ0tFRCcsIGxpZGFyRnVzaW9uOiAnVU5MT0NLRUQnIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhZGRMb2coJ1NZU1RFTScsICdBY2Nlc3NpbmcgcGh5c2ljYWwgaGFyZHdhcmUgY2FtZXJhIChSR0IgKyBEZXB0aCkuLi4nKTtcbiAgICAgIHNldExvY2tzKHsgZXhwb3N1cmU6ICdVTkxPQ0tFRCcsIGZvY3VzOiAnVU5MT0NLRUQnLCB3aGl0ZUJhbGFuY2U6ICdVTkxPQ0tFRCcsIGxpZGFyRnVzaW9uOiAnVU5MT0NLRUQnIH0pO1xuICAgIH1cbiAgfSwgW2lzU2FuZGJveE1vZGVdKTtcblxuICAvLyBFdmFsdWF0aW9uIGNyaXRlcmlhIGZsYWdzXG4gIGNvbnN0IGlzTHVtYU9rID0gbWV0cmljcy5sdW1hID49IDkyICYmIG1ldHJpY3MubHVtYSA8PSAyMTA7XG4gIGNvbnN0IGlzU2hhcnBuZXNzT2sgPSBtZXRyaWNzLnNoYXJwbmVzcyA+PSAwLjg7XG4gIGNvbnN0IGlzQ2N0T2sgPSBtZXRyaWNzLmNjdCA+PSA1MDAwICYmIG1ldHJpY3MuY2N0IDw9IDY4MDA7XG4gIGNvbnN0IGlzRGlzdGFuY2VPayA9IG1ldHJpY3MuZGlzdGFuY2UgPj0gMC4yNSAmJiBtZXRyaWNzLmRpc3RhbmNlIDw9IFBST1RPQ09MX0NPTkZJRy5saWRhclByZWNpc2lvblJhbmdlO1xuICBjb25zdCBpc1JvdGF0aW9uT2sgPSBNYXRoLmFicyhtZXRyaWNzLnlhdykgPD0gMTAuMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhtZXRyaWNzLnBpdGNoKSA8PSAxMC4wICYmXG4gICAgICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKG1ldHJpY3Mucm9sbCkgPD0gMTAuMDtcbiAgY29uc3QgaXNRdWFsaXR5T2sgPSBtZXRyaWNzLnF1YWxpdHlTY29yZSA+PSBQUk9UT0NPTF9DT05GSUcubWluUXVhbGl0eVNjb3JlO1xuXG4gIC8vIFJlYWwtdGltZSAyMDAwbXMgRHdlbGwgU3RhYmlsaXR5IExvY2tcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWZhY2VEZXRlY3RlZCkge1xuICAgICAgc2V0TWV0cmljcyhwcmV2ID0+IHByZXYuc3RhYmlsaXR5TXMgPiAwID8geyAuLi5wcmV2LCBzdGFiaWxpdHlNczogMCB9IDogcHJldik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYWxsTWV0cmljc0NvbXBsaWFudCA9IGlzTHVtYU9rICYmIGlzU2hhcnBuZXNzT2sgJiYgaXNDY3RPayAmJiBpc0Rpc3RhbmNlT2sgJiYgaXNSb3RhdGlvbk9rICYmIGlzUXVhbGl0eU9rO1xuXG4gICAgaWYgKGFsbE1ldHJpY3NDb21wbGlhbnQpIHtcbiAgICAgIC8vIENvaGVyZW50IHBhcmFtZXRlcnMgLSBjb3VudCB1cCB0byAyMDAwbXMgc3RhYmlsaXR5IGNoZWNrXG4gICAgICBjb25zdCB0aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc2V0TWV0cmljcyhwcmV2ID0+IHtcbiAgICAgICAgICBpZiAocHJldi5zdGFiaWxpdHlNcyA+PSAyMDAwKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4geyAuLi5wcmV2LCBzdGFiaWxpdHlNczogcHJldi5zdGFiaWxpdHlNcyArIDEwMCB9O1xuICAgICAgICB9KTtcbiAgICAgIH0sIDEwMCk7XG5cbiAgICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm9uLWNvbXBsaWFudCBwYXJhbWV0ZXJzIC0gaW1tZWRpYXRlbHkgcmVsZWFzZSBsb2NrcyBhbmQgcmVzZXQgdGltZXJcbiAgICAgIHNldE1ldHJpY3MocHJldiA9PiBwcmV2LnN0YWJpbGl0eU1zID4gMCA/IHsgLi4ucHJldiwgc3RhYmlsaXR5TXM6IDAgfSA6IHByZXYpO1xuICAgIH1cbiAgfSwgW2lzTHVtYU9rLCBpc1NoYXJwbmVzc09rLCBpc0NjdE9rLCBpc0Rpc3RhbmNlT2ssIGlzUm90YXRpb25PaywgaXNRdWFsaXR5T2ssIGZhY2VEZXRlY3RlZF0pO1xuXG4gIC8vIFN5bmNocm9uaXplIGxvY2sgc3RhdGUgYW5kIGxvZ2dpbmcgd2l0aCBzdGFiaWxpdHkgcHJvZ3Jlc3NcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzdGFiaWxpdHkgPSBtZXRyaWNzLnN0YWJpbGl0eU1zO1xuICAgIGlmIChzdGFiaWxpdHkgPT09IDApIHtcbiAgICAgIGlmIChsb2Nrcy5leHBvc3VyZSAhPT0gJ1VOTE9DS0VEJyB8fCBsb2Nrcy5mb2N1cyAhPT0gJ1VOTE9DS0VEJyB8fCBsb2Nrcy53aGl0ZUJhbGFuY2UgIT09ICdVTkxPQ0tFRCcgfHwgbG9ja3MubGlkYXJGdXNpb24gIT09ICdVTkxPQ0tFRCcpIHtcbiAgICAgICAgc2V0TG9ja3MoeyBleHBvc3VyZTogJ1VOTE9DS0VEJywgZm9jdXM6ICdVTkxPQ0tFRCcsIHdoaXRlQmFsYW5jZTogJ1VOTE9DS0VEJywgbGlkYXJGdXNpb246ICdVTkxPQ0tFRCcgfSk7XG4gICAgICAgIGFkZExvZygnU1lTVEVNJywgJ+KaoO+4jyBNZXRyaWNzIGZsdWN0dWF0ZWQgb3IgZmFjZSBsb3N0LiBMb2NrIHN0YWJpbGl0eSBjb3VudGVyIHJlc2V0LicpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3RhYmlsaXR5ID09PSA0MDAgJiYgbG9ja3MuZXhwb3N1cmUgPT09ICdVTkxPQ0tFRCcpIHtcbiAgICAgIHNldExvY2tzKGwgPT4gKHsgLi4ubCwgZXhwb3N1cmU6ICdMT0NLRUQnIH0pKTtcbiAgICAgIGFkZExvZygnTE9DSycsIGDwn5SSIEV4cG9zdXJlIGxvY2tlZC4gQXZlcmFnZSBMdW1hOiAke21ldHJpY3MubHVtYX0gKExpbWl0czogOTLigJMyMTApYCk7XG4gICAgfSBlbHNlIGlmIChzdGFiaWxpdHkgPT09IDgwMCAmJiBsb2Nrcy5mb2N1cyA9PT0gJ1VOTE9DS0VEJykge1xuICAgICAgc2V0TG9ja3MobCA9PiAoeyAuLi5sLCBmb2N1czogJ0xPQ0tFRCcgfSkpO1xuICAgICAgYWRkTG9nKCdMT0NLJywgYPCflJIgRm9jdXMgbG9ja2VkLiBDb250cmFzdCBzaGFycG5lc3M6ICR7bWV0cmljcy5zaGFycG5lc3MudG9GaXhlZCgyKX0gKExpbWl0czog4omlMC44KWApO1xuICAgIH0gZWxzZSBpZiAoc3RhYmlsaXR5ID09PSAxMjAwICYmIGxvY2tzLndoaXRlQmFsYW5jZSA9PT0gJ1VOTE9DS0VEJykge1xuICAgICAgc2V0TG9ja3MobCA9PiAoeyAuLi5sLCB3aGl0ZUJhbGFuY2U6ICdMT0NLRUQnIH0pKTtcbiAgICAgIGFkZExvZygnTE9DSycsIGDwn5SSIFdCIGxvY2tlZC4gQ29ycmVsYXRlZCB0ZW1wZXJhdHVyZTogJHttZXRyaWNzLmNjdH0gSyAoTGltaXRzOiA1MDAw4oCTNjgwMEspYCk7XG4gICAgfSBlbHNlIGlmIChzdGFiaWxpdHkgPj0gMjAwMCAmJiBsb2Nrcy5saWRhckZ1c2lvbiAhPT0gJ0xPQ0tFRCcpIHtcbiAgICAgIHNldExvY2tzKHsgZXhwb3N1cmU6ICdMT0NLRUQnLCBmb2N1czogJ0xPQ0tFRCcsIHdoaXRlQmFsYW5jZTogJ0xPQ0tFRCcsIGxpZGFyRnVzaW9uOiAnTE9DS0VEJyB9KTtcbiAgICAgIGFkZExvZygnTElEQVInLCBg8J+UkiBbRlVTSU9OIExPQ0tdIERlbGF1bmF5IG1lc2ggY29oZXJlbnQuIEZ1c2VkIDI1NngxOTIgZGVwdGggZnJhbWUgYXQgNjBIei5gKTtcbiAgICB9XG4gIH0sIFttZXRyaWNzLnN0YWJpbGl0eU1zLCBtZXRyaWNzLmx1bWEsIG1ldHJpY3Muc2hhcnBuZXNzLCBtZXRyaWNzLmNjdF0pO1xuXG4gIC8vIEZlZWQgbGl2ZSBzZW5zb3IgbWV0cmljcyB0byBzdGF0ZVxuICBjb25zdCBoYW5kbGVMaXZlTWV0cmljc1VwZGF0ZSA9IChuZXdNZXRyaWNzOiBQYXJ0aWFsPENhbGlicmF0aW9uTWV0cmljcz4pID0+IHtcbiAgICBpZiAoIWxpdmVGZWVkYmFjay5jb250aW51b3VzU2Nhbm5pbmcpIHJldHVybjtcbiAgICBzZXRNZXRyaWNzKChwcmV2KSA9PiB7XG4gICAgICByZXR1cm4geyAuLi5wcmV2LCAuLi5uZXdNZXRyaWNzIH07XG4gICAgfSk7XG4gICAgc2V0SGlzdG9yeSgocHJldkhpc3QpID0+IHtcbiAgICAgIGNvbnN0IG5leHRIaXN0ID0gWy4uLnByZXZIaXN0LCB7XG4gICAgICAgIGx1bWE6IG5ld01ldHJpY3MubHVtYSA/PyBtZXRyaWNzLmx1bWEsXG4gICAgICAgIHNoYXJwbmVzczogbmV3TWV0cmljcy5zaGFycG5lc3MgPz8gbWV0cmljcy5zaGFycG5lc3MsXG4gICAgICAgIGRpc3RhbmNlOiBuZXdNZXRyaWNzLmRpc3RhbmNlID8/IG1ldHJpY3MuZGlzdGFuY2UsXG4gICAgICAgIGNjdDogbmV3TWV0cmljcy5jY3QgPz8gbWV0cmljcy5jY3QsXG4gICAgICB9XTtcbiAgICAgIHJldHVybiBuZXh0SGlzdC5zbGljZSgtMjApO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFNsaWRlIG1hbnVhbCBvdmVycmlkZSB2YWx1ZXMgaW4gc2FuZGJveFxuICBjb25zdCBoYW5kbGVTYW5kYm94TWV0cmljc0NoYW5nZSA9IChuZXdTYW5kYm94TWV0cmljczogUGFydGlhbDxDYWxpYnJhdGlvbk1ldHJpY3M+KSA9PiB7XG4gICAgaWYgKCFpc1NhbmRib3hNb2RlKSByZXR1cm47XG4gICAgaWYgKCFsaXZlRmVlZGJhY2suY29udGludW91c1NjYW5uaW5nKSByZXR1cm47XG4gICAgc2V0TWV0cmljcygocHJldikgPT4ge1xuICAgICAgcmV0dXJuIHsgLi4ucHJldiwgLi4ubmV3U2FuZGJveE1ldHJpY3MgfTtcbiAgICB9KTtcbiAgICBzZXRIaXN0b3J5KChwcmV2SGlzdCkgPT4ge1xuICAgICAgY29uc3QgbmV4dEhpc3QgPSBbLi4ucHJldkhpc3QsIHtcbiAgICAgICAgbHVtYTogbmV3U2FuZGJveE1ldHJpY3MubHVtYSA/PyBtZXRyaWNzLmx1bWEsXG4gICAgICAgIHNoYXJwbmVzczogbmV3U2FuZGJveE1ldHJpY3Muc2hhcnBuZXNzID8/IG1ldHJpY3Muc2hhcnBuZXNzLFxuICAgICAgICBkaXN0YW5jZTogbmV3U2FuZGJveE1ldHJpY3MuZGlzdGFuY2UgPz8gbWV0cmljcy5kaXN0YW5jZSxcbiAgICAgICAgY2N0OiBuZXdTYW5kYm94TWV0cmljcy5jY3QgPz8gbWV0cmljcy5jY3QsXG4gICAgICB9XTtcbiAgICAgIHJldHVybiBuZXh0SGlzdC5zbGljZSgtMjApO1xuICAgIH0pO1xuICB9O1xuXG4gIC8vIFJlc2V0IGFsbCBsb2NrcyBtYW51YWxseVxuICBjb25zdCBoYW5kbGVSZXNldExvY2tzID0gKCkgPT4ge1xuICAgIHNldE1ldHJpY3MocHJldiA9PiAoeyAuLi5wcmV2LCBzdGFiaWxpdHlNczogMCB9KSk7XG4gICAgc2V0TG9ja3MoeyBleHBvc3VyZTogJ1VOTE9DS0VEJywgZm9jdXM6ICdVTkxPQ0tFRCcsIHdoaXRlQmFsYW5jZTogJ1VOTE9DS0VEJywgbGlkYXJGdXNpb246ICdVTkxPQ0tFRCcgfSk7XG4gICAgYWRkTG9nKCdTWVNURU0nLCAnVXNlciBtYW51YWwgb3ZlcnJpZGUgdHJpZ2dlcmVkLiBBbGwgc2Vuc29yIGZ1c2lvbnMgdW5sb2NrZWQuJyk7XG4gIH07XG5cbiAgY29uc3QgaXNSZWFkeVRvQ2FwdHVyZSA9IGZhY2VEZXRlY3RlZCAmJiBtZXRyaWNzLnN0YWJpbGl0eU1zID49IDIwMDAgJiYgbG9ja3MubGlkYXJGdXNpb24gPT09ICdMT0NLRUQnO1xuXG4gIC8vIFNuYXBzaG90IGdlbmVyYXRpb25cbiAgY29uc3QgaGFuZGxlQ2FwdHVyZSA9ICgpID0+IHtcbiAgICBpZiAoIWlzUmVhZHlUb0NhcHR1cmUpIHtcbiAgICAgIGFkZExvZygnU1lTVEVNJywgJ+KaoO+4jyBOb3JtYWxpemF0aW9uIGNvbnN0cmFpbnRzIHVuZnVsZmlsbGVkLiBEd2VsbCBjb2hlcmVuY2UgdGltZXIgaW5jb21wbGV0ZS4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBDYW1lcmEgc2h1dHRlciBmbGFzaCBlZmZlY3RcbiAgICBzZXRTaG93Rmxhc2godHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRTaG93Rmxhc2goZmFsc2UpLCAyMDApO1xuXG4gICAgYWRkTG9nKCdTWVNURU0nLCAnR2VuZXJhdGluZyBEZWxhdW5heSBtZXNoIGdlb21ldHJ5IGFuZCBhY3RpdmUgc2Vuc29yIGxvZ3MuLi4nKTtcblxuICAgIC8vIEdlbmVyYXRlIHRlY2huaWNhbCBTVkcgZnJhbWUgbW9ja3VwXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gNjQwO1xuICAgIGNhbnZhcy5oZWlnaHQgPSA0ODA7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKGN0eCkge1xuICAgICAgLy8gU3BhY2UgYmFja2dyb3VuZFxuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjMDIwNjE3JztcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCA2NDAsIDQ4MCk7XG5cbiAgICAgIC8vIFJhZGFyIGdyaWQgbGluZXNcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4wOCknO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY0MDsgaSArPSAzMikge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oaSwgMCk7IGN0eC5saW5lVG8oaSwgNDgwKTsgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0ODA7IGogKz0gMzIpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKDAsIGopOyBjdHgubGluZVRvKDY0MCwgaik7IGN0eC5zdHJva2UoKTtcbiAgICAgIH1cblxuICAgICAgLy8gRHJhdyBGYWNlIEZyYW1lIEJvdW5kc1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyMxMGI5ODEnO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguZWxsaXBzZSgzMjAsIDI0MCwgMTIwLCAxNjAsIDAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgLy8gTGFzZXIgRGVsYXVuYXkgVHJpYW5nbGVzXG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgxNiwgMTg1LCAxMjksIDAuNDUpJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygzMjAsIDEyMCk7IGN0eC5saW5lVG8oMjYwLCAyMDApOyBjdHgubGluZVRvKDM4MCwgMjAwKTsgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygyNjAsIDIwMCk7IGN0eC5saW5lVG8oMzIwLCAyODApOyBjdHgubGluZVRvKDM4MCwgMjAwKTsgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygzMjAsIDI4MCk7IGN0eC5saW5lVG8oMjcwLCAzNTApOyBjdHgubGluZVRvKDM3MCwgMzUwKTsgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAvLyBEZXB0aCBwb2ludHNcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzM4YmRmOCc7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmMoMzIwLCAxMjAsIDQsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYygyNjAsIDIwMCwgNCwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHguYXJjKDM4MCwgMjAwLCA0LCAwLCBNYXRoLlBJICogMik7IGN0eC5maWxsKCk7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7IGN0eC5hcmMoMzIwLCAyODAsIDQsIDAsIE1hdGguUEkgKiAyKTsgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTsgY3R4LmFyYygyNzAsIDM1MCwgNCwgMCwgTWF0aC5QSSAqIDIpOyBjdHguZmlsbCgpO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpOyBjdHguYXJjKDM3MCwgMzUwLCA0LCAwLCBNYXRoLlBJICogMik7IGN0eC5maWxsKCk7XG5cbiAgICAgIC8vIE1ldGFkYXRhIGluZm8gdGV4dFxuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjOTRhM2I4JztcbiAgICAgIGN0eC5mb250ID0gJzEwcHggbW9ub3NwYWNlJztcbiAgICAgIGN0eC5maWxsVGV4dChgQ0NUOiAke21ldHJpY3MuY2N0fSBLIHwgTFVNQTogJHttZXRyaWNzLmx1bWF9IHwgU0hBUlBORVNTOiAke21ldHJpY3Muc2hhcnBuZXNzLnRvRml4ZWQoMil9YCwgNDAsIDQyMCk7XG4gICAgICBjdHguZmlsbFRleHQoYERJU1Q6ICR7KG1ldHJpY3MuZGlzdGFuY2UqMTAwKS50b0ZpeGVkKDEpfSBjbSB8IFJPVEFUSU9OOiBbWToke21ldHJpY3MueWF3LnRvRml4ZWQoMSl9wrAsIFA6JHttZXRyaWNzLnBpdGNoLnRvRml4ZWQoMSl9wrAsIFI6JHttZXRyaWNzLnJvbGwudG9GaXhlZCgxKX3CsF1gLCA0MCwgNDQwKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzEwYjk4MSc7XG4gICAgICBjdHguZm9udCA9ICcxMnB4IG1vbm9zcGFjZSc7XG4gICAgICBjdHguZmlsbFRleHQoJ0xJREFSIERFTEFVTkFZIDNEIE1FU0ggUkVDT05TVFJVQ1RJT04gQ09NUExJQU5UJywgNDAsIDUwKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYXB0dXJlSW1nID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG5cbiAgICBjb25zdCBjYXB0dXJlZFBheWxvYWQ6IE5vcm1hbGl6ZWRDYXB0dXJlID0ge1xuICAgICAgaWQ6ICdMSURBUi1DQVAtJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA5KS50b1VwcGVyQ2FzZSgpLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBpbWFnZVVybDogY2FwdHVyZUltZyxcbiAgICAgIHNlbnNvckNvbmZpZzoge1xuICAgICAgICBjYW1lcmFQb3NpdGlvbjogJ0JBQ0tfTUFJTicsXG4gICAgICAgIGVuYWJsZUZsYXNoOiBmYWxzZSxcbiAgICAgICAgZXhwb3N1cmVMdW1hVGFyZ2V0OiAxNDIuMCxcbiAgICAgICAgbGlkYXJSZXNvbHV0aW9uV2lkdGg6IDI1NixcbiAgICAgICAgbGlkYXJSZXNvbHV0aW9uSGVpZ2h0OiAxOTIsXG4gICAgICAgIGZyYW1lUmF0ZUxpZGFyOiA2MCxcbiAgICAgICAgbGlkYXJQcmVjaXNpb25SYW5nZTogMC40MCxcbiAgICAgICAgbWluVHJpYW5nbGVBbmdsZTogbWluVHJpYW5nbGVBbmdsZSxcbiAgICAgICAgbWF4VHJpYW5nbGVFZGdlTGVuZ3RoOiBtYXhUcmlhbmdsZUVkZ2VMZW5ndGgsXG4gICAgICAgIGVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbjogZW5mb3JjZURlbGF1bmF5Q29uZGl0aW9uLFxuICAgICAgICBtaW5RdWFsaXR5U2NvcmU6IFBST1RPQ09MX0NPTkZJRy5taW5RdWFsaXR5U2NvcmUsXG4gICAgICAgIHN0YWJpbGl0eVRpbWVvdXRNczogUFJPVE9DT0xfQ09ORklHLnN0YWJpbGl0eVRpbWVvdXRNcyxcbiAgICAgIH0sXG4gICAgICBtZXRyaWNzOiB7IC4uLm1ldHJpY3MgfSxcbiAgICAgIGxvY2tzOiB7XG4gICAgICAgIGV4cG9zdXJlTG9ja2VkOiBsb2Nrcy5leHBvc3VyZSA9PT0gJ0xPQ0tFRCcsXG4gICAgICAgIGZvY3VzTG9ja2VkOiBsb2Nrcy5mb2N1cyA9PT0gJ0xPQ0tFRCcsXG4gICAgICAgIHdoaXRlQmFsYW5jZUxvY2tlZDogbG9ja3Mud2hpdGVCYWxhbmNlID09PSAnTE9DS0VEJyxcbiAgICAgICAgbGlkYXJGdXNpb25Mb2NrZWQ6IGxvY2tzLmxpZGFyRnVzaW9uID09PSAnTE9DS0VEJyxcbiAgICAgICAgbHVtYVZhbHVlOiBtZXRyaWNzLmx1bWEsXG4gICAgICAgIHNoYXJwbmVzc1ZhbHVlOiBtZXRyaWNzLnNoYXJwbmVzcyxcbiAgICAgICAgY2N0VmFsdWU6IG1ldHJpY3MuY2N0LFxuICAgICAgfSxcbiAgICAgIHJlY29uc3RydWN0aW9uM0Q6IHtcbiAgICAgICAgdmVydGV4Q291bnQ6IDM2LFxuICAgICAgICB0cmlhbmdsZUNvdW50OiB0cmlhbmd1bGF0aW9uU3RhdHMudG90YWwsXG4gICAgICAgIHZhbGlkRGVsYXVuYXlDb3VudDogdHJpYW5ndWxhdGlvblN0YXRzLnRvdGFsIC0gdHJpYW5ndWxhdGlvblN0YXRzLnNraW5ueSAtIHRyaWFuZ3VsYXRpb25TdGF0cy50b29Mb25nLFxuICAgICAgICBza2lubnlUcmlhbmdsZXNDb3VudDogdHJpYW5ndWxhdGlvblN0YXRzLnNraW5ueSxcbiAgICAgICAgYXZlcmFnZUVkZ2VMZW5ndGhNbTogcGFyc2VGbG9hdCgoMy42NSArIE1hdGgucmFuZG9tKCkgKiAwLjQpLnRvRml4ZWQoMikpLFxuICAgICAgICBpbnRlcnB1cGlsbGFyeURpc3RhbmNlTW06IHBhcnNlRmxvYXQoKDYzLjQgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjIpLnRvRml4ZWQoMSkpLFxuICAgICAgICBsaWRhckRlcHRoUmVzb2x1dGlvbjogJzI1NngxOTIgQCA2MEh6JyxcbiAgICAgICAgZmFjZU1lc2hQb2ludHM6IFtcbiAgICAgICAgICBbMC4wLCAwLjAsIDQ1LjBdLFxuICAgICAgICAgIFstMTYuMCwgMTYuMCwgMjAuMF0sXG4gICAgICAgICAgWzE2LjAsIDE2LjAsIDIwLjBdLFxuICAgICAgICAgIFswLjAsIDQ4LjAsIDIwLjBdLFxuICAgICAgICAgIFswLjAsIC00OC4wLCAyMi4wXVxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9O1xuXG4gICAgc2V0Q2FwdHVyZShjYXB0dXJlZFBheWxvYWQpO1xuICAgIGFkZExvZygnU1lTVEVNJywgYOKchSBOb3JtYWxpemVkIGNhcHR1cmUgZ2VuZXJhdGVkLiBJRDogJHtjYXB0dXJlZFBheWxvYWQuaWR9YCk7XG5cbiAgICAvLyBDcmVhdGUgU1FMIERhdGFiYXNlIFJlY29yZCBtYXRjaGluZyAndXNlcl9zY2Fuc19yYXcnIHNjaGVtYVxuICAgIGNvbnN0IG5ld1NjYW5Sb3c6IFVzZXJTY2FuUmF3ID0ge1xuICAgICAgaWQ6ICd1c3ItJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCAxMSkgKyAnLScgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgNiksXG4gICAgICB1c2VyX2lkOiAncHJvZmlsZS05MDIxMC1hY3RpdmUtdGVzdGVyJyxcbiAgICAgIHNjYW5fdHlwZTogc2NhblR5cGUsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgIHJhd19pbWFnZXNfdXJsOiBbY2FwdHVyZUltZ10sXG4gICAgICBsaWRhcl9kYXRhX3VybDogYGh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9lZGdlLWFpLWxpZGFyLWR1bXBzL3Jhdy91c3ItJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoMiwgOCl9LnBseWAsXG4gICAgICBpc19wcm9jZXNzZWQ6IHRydWUsXG4gICAgICBtZXRhZGF0YToge1xuICAgICAgICB5YXc6IG1ldHJpY3MueWF3LFxuICAgICAgICBwaXRjaDogbWV0cmljcy5waXRjaCxcbiAgICAgICAgcm9sbDogbWV0cmljcy5yb2xsLFxuICAgICAgICBsdW1hOiBtZXRyaWNzLmx1bWEsXG4gICAgICAgIHNoYXJwbmVzczogbWV0cmljcy5zaGFycG5lc3MsXG4gICAgICAgIGNjdDogbWV0cmljcy5jY3QsXG4gICAgICAgIHBvaW50c0NvdW50OiBtZXRyaWNzLmxpZGFyUG9pbnRzQ291bnQsXG4gICAgICAgIGRpc3RhbmNlOiBtZXRyaWNzLmRpc3RhbmNlLFxuICAgICAgICB0cmlhbmdsZUNvdW50OiB0cmlhbmd1bGF0aW9uU3RhdHMudG90YWwsXG4gICAgICAgIHZhbGlkRGVsYXVuYXlDb3VudDogdHJpYW5ndWxhdGlvblN0YXRzLnRvdGFsIC0gdHJpYW5ndWxhdGlvblN0YXRzLnNraW5ueSAtIHRyaWFuZ3VsYXRpb25TdGF0cy50b29Mb25nLFxuICAgICAgICBhdmVyYWdlRWRnZUxlbmd0aE1tOiBwYXJzZUZsb2F0KCgzLjY1ICsgTWF0aC5yYW5kb20oKSAqIDAuNCkudG9GaXhlZCgyKSksXG4gICAgICB9XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBuZXh0U2NhbnMgPSBbbmV3U2NhblJvdywgLi4uc2F2ZWRTY2Fuc107XG4gICAgc2V0U2F2ZWRTY2FucyhuZXh0U2NhbnMpO1xuICAgIGFkZExvZygnU1lTVEVNJywgYPCfkr4gUEVSU0lTVEVEIFNRTCByb3cgZ2VuZXJhdGVkIGZvciB0YWJsZSAndXNlcl9zY2Fuc19yYXcnIChTY2FuIHR5cGU6ICcke3NjYW5UeXBlfScpYCk7XG5cbiAgICAvLyBSdW4gbG9vdCAvIHJld2FyZHMgY2hlY2tzXG4gICAgY2hlY2tQcm9ncmVzcyhtZXRyaWNzLnF1YWxpdHlTY29yZSwgbmV4dFNjYW5zLmxlbmd0aCk7XG4gIH07XG5cbiAgY29uc3QgY2hlY2tQcm9ncmVzcyA9IChzY2FuUXVhbGl0eTogbnVtYmVyLCBjdXJyZW50U2Vzc2lvbkNvdW50OiBudW1iZXIpID0+IHtcbiAgICBpZiAoc2NhblF1YWxpdHkgPiAwLjk1KSB7XG4gICAgICBhZGRMb2coJ1NZU1RFTScsICfwn4+GIE5hZ3JvZGE6IE9kem5ha2EgW01hc3RlciBvZiB0aGUgTWVzaF0gcHJ6eXpuYW5hIHphIGRvc2tvbmHFgsSFIGpha2/Fm8SHIScpO1xuICAgICAgc2V0QWN0aXZlUmV3YXJkKHtcbiAgICAgICAgdHlwZTogJ2JhZGdlJyxcbiAgICAgICAgdGl0bGU6ICdTTEFZISBOT1dBIE9EWk5BS0EgT0RCTE9LT1dBTkEg8J+PhicsXG4gICAgICAgIGJhZGdlTmFtZTogJ01hc3RlciBvZiB0aGUgTWVzaCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBgVHfDs2ogR2xvdy11cCBDaGVjayBvc2nEhWduxIXFgiB3eWJpdG7EhSBzcMOzam5vxZvEhyBsYXNlcm93xIUgKFN0YXRzOiAkeyhzY2FuUXVhbGl0eSAqIDEwMCkudG9GaXhlZCgxKX0lKS4gQnXFgmEgeiBkdW3EhSBtaWFudWplIENpxJkgTWlzdHJ6ZW0gU2lhdGtpIERlbGF1bmF5YSFgXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRTZXNzaW9uQ291bnQgPT09IDcpIHtcbiAgICAgIGFkZExvZygnU1lTVEVNJywgJ/Cfj4YgTmFncm9kYTogUXVlc3QgWzctRGF5IENoYWxsZW5nZSBTbGF5ZWRdIHVrb8WEY3pvbnkhJyk7XG4gICAgICBzZXRBY3RpdmVSZXdhcmQoe1xuICAgICAgICB0eXBlOiAncXVlc3QnLFxuICAgICAgICB0aXRsZTogJ1FVRVNUIFNLT01QTEVUT1dBTlkhIPCfjoknLFxuICAgICAgICBiYWRnZU5hbWU6ICc3LURheSBDaGFsbGVuZ2UgU2xheWVkJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdVa2/FhGN6b25vIDctZG5pb3dlIHd5endhbmllIHNrYW5vd2FuaWEgeiBCdcWCxIUhIFR3b2plIE1haW4gQ2hhcmFjdGVyIEVuZXJneSB3xYJhxZtuaWUgd3lzdHJ6ZWxpxYJvIHBvemEgb3JiaXTEmS4nXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xlYXJDYXB0dXJlID0gKCkgPT4ge1xuICAgIHNldENhcHR1cmUobnVsbCk7XG4gICAgYWRkTG9nKCdTWVNURU0nLCAnQ2FwdHVyZSBjYWNoZSByZXNldC4gTXVsdGktU2Vuc29yIHBpcGVsaW5lIHJlYWR5IGZvciByZS1kd2VsbC4nKTtcbiAgfTtcblxuICBjb25zdCBnZXRQb2xpc2hEYXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IGRheXMgPSBbJ05pZWR6aWVsYScsICdQb25pZWR6aWHFgmVrJywgJ1d0b3JlaycsICfFmnJvZGEnLCAnQ3p3YXJ0ZWsnLCAnUGnEhXRlaycsICdTb2JvdGEnXTtcbiAgICBjb25zdCBtb250aHMgPSBbXG4gICAgICAnc3R5Y3puaWEnLCAnbHV0ZWdvJywgJ21hcmNhJywgJ2t3aWV0bmlhJywgJ21hamEnLCAnY3plcndjYScsXG4gICAgICAnbGlwY2EnLCAnc2llcnBuaWEnLCAnd3J6ZcWbbmlhJywgJ3Bhxbpkemllcm5pa2EnLCAnbGlzdG9wYWRhJywgJ2dydWRuaWEnXG4gICAgXTtcbiAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICAgIHJldHVybiBgJHtkYXlzW25vdy5nZXREYXkoKV19LCAke25vdy5nZXREYXRlKCl9ICR7bW9udGhzW25vdy5nZXRNb250aCgpXX1gO1xuICB9O1xuXG4gIGNvbnN0IHBob25lQ29sb3JzID0ge1xuICAgIHRpdGFuaXVtOiB7XG4gICAgICBuYW1lOiAnTmF0dXJhbCBUaXRhbml1bScsXG4gICAgICBib3JkZXI6ICdib3JkZXItemluYy01MDAvODAnLFxuICAgICAgbWV0YWxsaWM6ICdmcm9tLXN0b25lLTUwMCB2aWEtc3RvbmUtNDAwIHRvLXN0b25lLTYwMCcsXG4gICAgICBhY2NlbnQ6ICd0ZXh0LWFtYmVyLTQwMCcsXG4gICAgICBjYXNpbmdHbG93OiAnc2hhZG93LVswXzBfNTBweF9yZ2JhKDEyMCwxMTMsMTA4LDAuMTUpXScsXG4gICAgICBiZ0dyYWQ6ICdmcm9tLXN0b25lLTkwMCB0by1uZXV0cmFsLTk1MCdcbiAgICB9LFxuICAgIGJsYWNrOiB7XG4gICAgICBuYW1lOiAnU3BhY2UgQmxhY2snLFxuICAgICAgYm9yZGVyOiAnYm9yZGVyLW5ldXRyYWwtODAwJyxcbiAgICAgIG1ldGFsbGljOiAnZnJvbS1uZXV0cmFsLTgwMCB2aWEtbmV1dHJhbC03MDAgdG8tbmV1dHJhbC05MDAnLFxuICAgICAgYWNjZW50OiAndGV4dC1za3ktNDAwJyxcbiAgICAgIGNhc2luZ0dsb3c6ICdzaGFkb3ctWzBfMF81MHB4X3JnYmEoMjMsMjMsMjMsMC4zKV0nLFxuICAgICAgYmdHcmFkOiAnZnJvbS1uZXV0cmFsLTk1MCB0by1ibGFjaydcbiAgICB9LFxuICAgIHB1cnBsZToge1xuICAgICAgbmFtZTogJ0RlZXAgUHVycGxlJyxcbiAgICAgIGJvcmRlcjogJ2JvcmRlci1pbmRpZ28tOTAwJyxcbiAgICAgIG1ldGFsbGljOiAnZnJvbS1pbmRpZ28tOTUwIHZpYS1wdXJwbGUtOTAwIHRvLXNsYXRlLTkwMCcsXG4gICAgICBhY2NlbnQ6ICd0ZXh0LXB1cnBsZS00MDAnLFxuICAgICAgY2FzaW5nR2xvdzogJ3NoYWRvdy1bMF8wXzUwcHhfcmdiYSgxNDcsNTEsMjM0LDAuMTUpXScsXG4gICAgICBiZ0dyYWQ6ICdmcm9tLWluZGlnby05NTAgdG8tc2xhdGUtOTUwJ1xuICAgIH0sXG4gICAgc2lsdmVyOiB7XG4gICAgICBuYW1lOiAnU2lsdmVyIFRpdGFuaXVtJyxcbiAgICAgIGJvcmRlcjogJ2JvcmRlci1zbGF0ZS0zMDAnLFxuICAgICAgbWV0YWxsaWM6ICdmcm9tLXNsYXRlLTQwMCB2aWEtc2xhdGUtMjAwIHRvLXNsYXRlLTUwMCcsXG4gICAgICBhY2NlbnQ6ICd0ZXh0LXRlYWwtNDAwJyxcbiAgICAgIGNhc2luZ0dsb3c6ICdzaGFkb3ctWzBfMF81MHB4X3JnYmEoMjAzLDIxMywyMjUsMC4xNSldJyxcbiAgICAgIGJnR3JhZDogJ2Zyb20tc2xhdGUtOTAwIHRvLXppbmMtOTUwJ1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTEwMCBmbGV4IGZsZXgtY29sIGZvbnQtc2FucyBzZWxlY3Rpb246Ymctc2t5LTUwMCBzZWxlY3Rpb246dGV4dC1zbGF0ZS05NTAgcmVsYXRpdmUgb3ZlcmZsb3cteC1oaWRkZW5cIiBpZD1cIm1haW5fYXBwX2xheW91dFwiPlxuICAgICAgXG4gICAgICB7LyogVmlzdWFsIENhbWVyYSBGbGFzaCBBbmltYXRpb24gKi99XG4gICAgICA8QW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICB7c2hvd0ZsYXNoICYmIChcbiAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAxIH19XG4gICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4yLCBlYXNlOiAnZWFzZU91dCcgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctd2hpdGUgei01MCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICAgIGlkPVwic2h1dHRlcl9mbGFzaF9vdmVybGF5XCJcbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgIHsvKiBJbnRlcmFjdGl2ZSBIVUQgbm90aWZpY2F0aW9uIG9uIGhhcHRpYyBmZWVkYmFjayBzaW11bGF0ZWQgdHJpZ2dlciAqL31cbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIHtoYXB0aWNGZWVkYmFjayAmJiAoXG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogLTUwLCBzY2FsZTogMC45IH19XG4gICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDE2LCBzY2FsZTogMSB9fVxuICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCB5OiAtMjAsIHNjYWxlOiAwLjk1IH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCB0b3AtNCBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIHotNTAgYmctc2xhdGUtOTAwLzkwIGJhY2tkcm9wLWJsdXIgYm9yZGVyIGJvcmRlci1za3ktNTAwLzMwIHB4LTQgcHktMiByb3VuZGVkLXhsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy14bCBzaGFkb3ctc2t5LTk1MC8yMCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNreS00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gZm9udC1ib2xkIHRleHQtc2t5LTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0XCI+XG4gICAgICAgICAgICAgIHtoYXB0aWNGZWVkYmFja31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICl9XG4gICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgey8qIFRvcCBCYW5uZXIgaW5kaWNhdGluZyBBcHBsZSBwaG9uZSBwcmltYXJ5IGRlc2lnbiBmb2N1cyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXNreS05NTAgdmlhLXNsYXRlLTk1MCB0by1pbmRpZ28tOTUwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgcHgtNCBweS0yLjUgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIHotMzBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBoLTIgdy0yIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbmltYXRlLXBpbmcgYWJzb2x1dGUgaW5saW5lLWZsZXggaC1mdWxsIHctZnVsbCByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgb3BhY2l0eS03NVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlIGlubGluZS1mbGV4IHJvdW5kZWQtZnVsbCBoLTIgdy0yIGJnLWVtZXJhbGQtNTAwXCI+PC9zcGFuPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgIFBSSU1BUklMWSBSVU5OSU5HIE9OIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LWJvbGRcIj5BUFBMRSBJUEhPTkU8L3NwYW4+IFBST1RPQy12Mi4wXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0SXNEZXZpY2VGcmFtZUVuYWJsZWQoIWlzRGV2aWNlRnJhbWVFbmFibGVkKTtcbiAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhpc0RldmljZUZyYW1lRW5hYmxlZCA/IFwiRlVMTCBERVNLVE9QIE1PREVcIiA6IFwiQVBQTEUgSVBIT05FIE1PREVcIik7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gZm9udC1ib2xkIHB4LTMgcHktMSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2t5LTQwMCBob3Zlcjp0ZXh0LXNreS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvd1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzRGV2aWNlRnJhbWVFbmFibGVkID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxNYXhpbWl6ZTIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UFJaRcWBxIRDWiBOQSBQRcWBTlkgRUtSQU48L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5QUlpFxYHEhENaIE5BIFJBTUvEmCBJUEhPTkU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAge2lzRGV2aWNlRnJhbWVFbmFibGVkID8gKFxuICAgICAgICAvKiA9PT09PT09PT09PT09PT09PT09PSBXT1JLQkVOQ0ggTU9ERSAoaVBob25lIENlbnRlcmVkIE1vY2t1cCkgPT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IGxnOnAtOCBnYXAtOCBiZy1bcmFkaWFsLWdyYWRpZW50KGVsbGlwc2VfYXRfdG9wLF92YXIoLS10dy1ncmFkaWVudC1zdG9wcykpXSBmcm9tLXNsYXRlLTkwMCB2aWEtc2xhdGUtOTUwIHRvLWJsYWNrIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBzZWxlY3Qtbm9uZVwiIGlkPVwicGhvbmVfd29ya2JlbmNoXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFN1YnRsZSBibHVlcHJpbnQgZ3JpZCBsYXlvdXQgYmFja2dyb3VuZHMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVtsaW5lYXItZ3JhZGllbnQodG9fcmlnaHQscmdiYSg1NiwxODksMjQ4LDAuMDMpXzFweCx0cmFuc3BhcmVudF8xcHgpLGxpbmVhci1ncmFkaWVudCh0b19ib3R0b20scmdiYSg1NiwxODksMjQ4LDAuMDMpXzFweCx0cmFuc3BhcmVudF8xcHgpXSBiZy1bc2l6ZTo0MHB4XzQwcHhdIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0xLzQgdy1bNTAwcHhdIGgtWzUwMHB4XSBiZy1za3ktNTAwLzUgcm91bmRlZC1mdWxsIGJsdXItWzEyMHB4XSBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0wIHJpZ2h0LTEvNCB3LVs2MDBweF0gaC1bNjAwcHhdIGJnLWVtZXJhbGQtNTAwLzUgcm91bmRlZC1mdWxsIGJsdXItWzE0MHB4XSBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICAgIHsvKiBMZWZ0IFNpZGUgQ29udHJvbCBUb3dlciBEYXNoYm9hcmQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbGc6dy04MCBmbGV4IGZsZXgtY29sIGdhcC00IHotMjAgc2hyaW5rLTBcIiBpZD1cIndvcmtiZW5jaF9zaWRlYmFyX2xlZnRcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIE1hc2NvdCBhbmQgQnJhbmQgRGV0YWlscyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzYwIGJhY2tkcm9wLWJsdXItbWQgcC00IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2wgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tdHIgZnJvbS1za3ktNTAwIHRvLWluZGlnby02MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC14bCBzaGFkb3ctbGcgYm9yZGVyIGJvcmRlci1za3ktNDAwLzIwXCI+XG4gICAgICAgICAgICAgICAgICDwn5C5XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC1zbSBmb250LWJsYWNrIHRleHQtc2xhdGUtMTAwIHVwcGVyY2FzZSB0cmFja2luZy10aWdodCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPktsdWIgQ2hvbWlrYSB2Mjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOHB4XSBiZy1za3ktOTUwIHRleHQtc2t5LTQwMCBmb250LW1vbm8gcHgtMSBweS0wLjIgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNreS05MDAvNDBcIj5JT1M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDBcIj5NZWRpYVBpcGUgTGlEQVIgQ29yZSB2Mi4wLUxJREFSPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgQXBsaWthY2phIHpvc3RhxYJhIHphcHJvamVrdG93YW5hIHNwZWNqYWxuaWUgcG9kIGvEhXRlbSBpbnRlcmZlanN1IGkgbm9ybSBjenXFgm/Fm2NpIHNtYXJ0Zm9uw7N3IDxzdHJvbmc+QXBwbGUgaVBob25lPC9zdHJvbmc+IHogYXBhcmF0ZW0gVHJ1ZURlcHRoIGkgTGlEQVIuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQ3VzdG9taXplciBmb3IgUGhvbmUgRmluaXNoICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgYmFja2Ryb3AtYmx1ci1tZCBwLTQgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBnYXAtM1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSBmb250LWJvbGQgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8UGFsZXR0ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPld5a2/FhGN6ZW5pZSBpUGhvbmUgVGl0YW5pdW08L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBtdC0xXCI+XG4gICAgICAgICAgICAgICAge09iamVjdC5lbnRyaWVzKHBob25lQ29sb3JzKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e2tleX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldElwaG9uZUNvbG9yKGtleSBhcyBhbnkpO1xuICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJIYXB0aWMoYFdZS0/Fg0NaRU5JRTogJHt2YWx1ZS5uYW1lLnRvVXBwZXJDYXNlKCl9YCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHAtMiByb3VuZGVkLXhsIGJvcmRlciB0ZXh0LWxlZnQgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpcGhvbmVDb2xvciA9PT0ga2V5IFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwLzgwIGJvcmRlci1za3ktNTAwIHRleHQtc2xhdGUtMTAwIHNoYWRvdy1sZyBzaGFkb3ctc2t5LTk1MC8yMCcgXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvMzAgYm9yZGVyLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBob3ZlcjpiZy1zbGF0ZS05MDAvNDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSByb3VuZGVkLWZ1bGwgYmctZ3JhZGllbnQtdG8tdHIgJHt2YWx1ZS5tZXRhbGxpY30gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvMjBgfSAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSBmb250LWJvbGQgdXBwZXJjYXNlIHRydW5jYXRlXCI+e2tleX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC81MCBwLTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTk1MCB0ZXh0LWNlbnRlciBmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIEtvbG9yIG9idWRvd3k6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1za3ktNDAwXCI+e3Bob25lQ29sb3JzW2lwaG9uZUNvbG9yXS5uYW1lfTwvc3Ryb25nPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU2ltdWxhdGVkIEJ1dHRvbnMgQ2xpY2tlciBIVUQgSGVscCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzYwIGJhY2tkcm9wLWJsdXItbWQgcC00IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2wgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSBmb250LWJvbGQgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8U2xpZGVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5GaXp5Y3puZSBQcnp5Y2lza2kgQXBwbGU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctbm9ybWFsXCI+XG4gICAgICAgICAgICAgICAgTW/FvGVzeiBrbGlrYcSHIG5hIGZpenljem5lIHByenljaXNraSBwbyBib2thY2ggbW9kZWx1IHRlbGVmb251IG5hIMWbcm9ka3UsIGFieSBzdGVyb3dhxIcgc3lzdGVtZW06XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41IGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtMzAwIG10LTFcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRJc1Bob25lTG9ja2VkKCFpc1Bob25lTG9ja2VkKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhpc1Bob25lTG9ja2VkID8gXCJURUxFRk9OIE9EQkxPS09XQU5ZXCIgOiBcIlRFTEVGT04gWkFCTE9LT1dBTlkgKFXFmlBJT05ZKVwiKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0xLjUgYmctc2xhdGUtOTUwLzUwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtOTAwLzUwIHRleHQtbGVmdCB3LWZ1bGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZvbnQtYm9sZFwiPjEuIFByenljaXNrIEJsb2thZHkgKFByYXd5KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNDAwIHRleHQtWzhweF0gYm9yZGVyIGJvcmRlci1hbWJlci05MDAgcHgtMSBweS0wLjIgcm91bmRlZCBmb250LWJvbGRcIj5TTEVFUCAvIFdBS0U8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUGhvbmVMb2NrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiWkFCTE9LT1dBTlkhIE9EQkxPS1VKIE5BSlBJRVJXXCIpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVUYWIoJ3NjYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ2FwdHVyZSgpO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiWkRKxJhDSUUgLyBDQVBUVVJFIFBOR1wiKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0xLjUgYmctc2xhdGUtOTUwLzUwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtOTAwLzUwIHRleHQtbGVmdCB3LWZ1bGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZvbnQtYm9sZFwiPjIuIEfFgm/Fm25vxZvEhyArIChMZXd5KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCB0ZXh0LVs4cHhdIGJvcmRlciBib3JkZXItc2t5LTkwMCBweC0xIHB5LTAuMiByb3VuZGVkIGZvbnQtYm9sZFwiPjNEIFNIVVRURVI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUGhvbmVMb2NrZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVzZXRMb2NrcygpO1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiUkVTRVQgQkxPS0FEIFNFTlNPUkFcIik7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMS41IGJnLXNsYXRlLTk1MC81MCByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTkwMC81MCB0ZXh0LWxlZnQgdy1mdWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBmb250LWJvbGRcIj4zLiBHxYJvxZtub8WbxIcgLSAoTGV3eSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIHRleHQtWzhweF0gYm9yZGVyIGJvcmRlci1lbWVyYWxkLTkwMCBweC0xIHB5LTAuMiByb3VuZGVkIGZvbnQtYm9sZFwiPlJFU0VUIFNFTlNPUlM8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUGhvbmVMb2NrZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgc2V0QXBwU3RhdGUoYXBwU3RhdGUgPT09IEFwcFN0YXRlLmNoaWxsID8gQXBwU3RhdGUucXVhbnR1bSA6IEFwcFN0YXRlLmNoaWxsKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhcIlFVQU5UVU0gTU9ERSBUT0dHTEVcIik7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMS41IGJnLXNsYXRlLTk1MC81MCByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTkwMC81MCB0ZXh0LWxlZnQgdy1mdWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBmb250LWJvbGRcIj40LiBBY3Rpb24gQnV0dG9uIChMZXd5KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCB0ZXh0LVs4cHhdIGJvcmRlciBib3JkZXItcHVycGxlLTkwMCBweC0xIHB5LTAuMiByb3VuZGVkIGZvbnQtYm9sZFwiPlRPR0dMRSBNT0RFPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT0gVEhFIFBIWVNJQ0FMIElQSE9ORSBNT0NLVVAgRlJBTUUgPT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIHNocmluay0wXCIgaWQ9XCJpcGhvbmVfZnJhbWVfY29udGFpbmVyXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBQaHlzaWNhbCBoYXJkd2FyZSBidXR0b25zIHNpbXVsYXRvciAqL31cbiAgICAgICAgICAgIHsvKiBBY3Rpb24gYnV0dG9uICh0b3AgbGVmdCkgKi99XG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUGhvbmVMb2NrZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBzZXRBcHBTdGF0ZShhcHBTdGF0ZSA9PT0gQXBwU3RhdGUuY2hpbGwgPyBBcHBTdGF0ZS5xdWFudHVtIDogQXBwU3RhdGUuY2hpbGwpO1xuICAgICAgICAgICAgICAgIHRyaWdnZXJIYXB0aWMoXCJIYXB0aWMgY2xpY2s6IFF1YW50dW0gTW9kZVwiKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC1bLTZweF0gdG9wLVsxNDBweF0gdy1bNnB4XSBoLVszMnB4XSByb3VuZGVkLWwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXN0b25lLTUwMCB0by1zdG9uZS00MDAgYm9yZGVyIGJvcmRlci1zdG9uZS02MDAgY3Vyc29yLXBvaW50ZXIgaG92ZXI6YnJpZ2h0bmVzcy0xMjAgYWN0aXZlOnRyYW5zbGF0ZS14LVsycHhdIHRyYW5zaXRpb24tYWxsIHotMjBcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkFjdGlvbiBCdXR0b246IFByemXFgsSFY3ogVHJ5YiBRdWFudHVtXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBWb2x1bWUgVXAgKG1pZGRsZSBsZWZ0KSAqL31cbiAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNQaG9uZUxvY2tlZCkge1xuICAgICAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhcIkxvY2sgU2NyZWVuIEFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlVGFiKCdzY2FuJyk7XG4gICAgICAgICAgICAgICAgaGFuZGxlQ2FwdHVyZSgpO1xuICAgICAgICAgICAgICAgIHRyaWdnZXJIYXB0aWMoXCJIYXB0aWMgQ2xpY2s6IDNEIFNuYXBzaG90XCIpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LVstNnB4XSB0b3AtWzE5NXB4XSB3LVs2cHhdIGgtWzYwcHhdIHJvdW5kZWQtbCBiZy1ncmFkaWVudC10by1yIGZyb20tc3RvbmUtNTAwIHRvLXN0b25lLTQwMCBib3JkZXIgYm9yZGVyLXN0b25lLTYwMCBjdXJzb3ItcG9pbnRlciBob3ZlcjpicmlnaHRuZXNzLTEyMCBhY3RpdmU6dHJhbnNsYXRlLXgtWzJweF0gdHJhbnNpdGlvbi1hbGwgei0yMFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiR8WCb8Wbbm/Fm8SHICs6IFd5a29uYWogWmFwaXMgU2thbnUgLyBDYXB0dXJlXCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHsvKiBWb2x1bWUgRG93biAobG93ZXIgbGVmdCkgKi99XG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUGhvbmVMb2NrZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBoYW5kbGVSZXNldExvY2tzKCk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhcIkhhcHRpYyBDbGljazogUmVzZXQgTG9ja3NcIik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGxlZnQtWy02cHhdIHRvcC1bMjcwcHhdIHctWzZweF0gaC1bNjBweF0gcm91bmRlZC1sIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zdG9uZS01MDAgdG8tc3RvbmUtNDAwIGJvcmRlciBib3JkZXItc3RvbmUtNjAwIGN1cnNvci1wb2ludGVyIGhvdmVyOmJyaWdodG5lc3MtMTIwIGFjdGl2ZTp0cmFuc2xhdGUteC1bMnB4XSB0cmFuc2l0aW9uLWFsbCB6LTIwXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJHxYJvxZtub8WbxIcgLTogWnJlc2V0dWogQmxva2FkeSBTZW5zb3JhXCJcbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHsvKiBQb3dlciAvIExvY2sgQnV0dG9uIChtaWRkbGUgcmlnaHQpICovfVxuICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldElzUGhvbmVMb2NrZWQoIWlzUGhvbmVMb2NrZWQpO1xuICAgICAgICAgICAgICAgIHRyaWdnZXJIYXB0aWMoaXNQaG9uZUxvY2tlZCA/IFwiSGFwdGljOiBXYWtlIFNjcmVlblwiIDogXCJIYXB0aWM6IFNsZWVwIFNjcmVlblwiKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtWy02cHhdIHRvcC1bMjIwcHhdIHctWzZweF0gaC1bOTBweF0gcm91bmRlZC1yIGJnLWdyYWRpZW50LXRvLWwgZnJvbS1zdG9uZS01MDAgdG8tc3RvbmUtNDAwIGJvcmRlciBib3JkZXItc3RvbmUtNjAwIGN1cnNvci1wb2ludGVyIGhvdmVyOmJyaWdodG5lc3MtMTIwIGFjdGl2ZTp0cmFuc2xhdGUteC1bLTJweF0gdHJhbnNpdGlvbi1hbGwgei0yMFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiUG93ZXIgQnV0dG9uOiBaYWJsb2t1aiAvIE9kYmxva3VqIEVrcmFuIGlQaG9uZVwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICB7LyogUGh5c2ljYWwgRnJhbWUgT3V0ZXIgTWV0YWxsaWMgUmltICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LVs0MDBweF0gaC1bODIwcHhdIHJvdW5kZWQtWzU2cHhdIHAtWzhweF0gJHtwaG9uZUNvbG9yc1tpcGhvbmVDb2xvcl0uYmd9IGJvcmRlci1bNXB4XSAke3Bob25lQ29sb3JzW2lwaG9uZUNvbG9yXS5ib3JkZXJ9ICR7cGhvbmVDb2xvcnNbaXBob25lQ29sb3JdLmNhc2luZ0dsb3d9IGZsZXggZmxleC1jb2wgcmVsYXRpdmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwYH0+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB7LyogSW5uZXIgYmV6ZWwgYm9yZGVyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LVszcHhdIHJvdW5kZWQtWzUwcHhdIGJvcmRlciBib3JkZXItYmxhY2svODAgcG9pbnRlci1ldmVudHMtbm9uZSB6LTEwXCIgLz5cblxuICAgICAgICAgICAgICB7LyogR2xhc3MgUmVmbGVjdGlvbiBTUEVDVUxBUiBPdmVybGF5IGZvciBleHRyZW1lIHJlYWxpc20gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCB3LVs4MCVdIGgtZnVsbCBiZy1ncmFkaWVudC10by10ciBmcm9tLXRyYW5zcGFyZW50IHZpYS13aGl0ZS9bMC4wMTVdIHRvLXdoaXRlL1swLjA0XSBwb2ludGVyLWV2ZW50cy1ub25lIHJvdW5kZWQtWzQ4cHhdIHotMzAgdHJhbnNmb3JtIHNrZXcteC0xMiB0cmFuc2xhdGUteC0yMFwiIC8+XG5cbiAgICAgICAgICAgICAgey8qIFNpbXVsYXRlZCBzY3JlZW4gY29udGFpbmVyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgcm91bmRlZC1bNDVweF0gYmctc2xhdGUtOTUwIGJvcmRlci1bNHB4XSBib3JkZXItYmxhY2sgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgcmVsYXRpdmUgc2hhZG93LWlubmVyIHotMjBcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0gRFlOQU1JQyBJU0xBTkQgLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi99XG4gICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICBsYXlvdXRcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC1bMTRweF0gbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBoLVsyOHB4XSByb3VuZGVkLWZ1bGwgYmctYmxhY2sgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtMy41IHRleHQtd2hpdGUgc2VsZWN0LW5vbmUgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlciBob3ZlcjpzY2FsZS1bMS4wMl0gYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIHNoYWRvdy1tZGB9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogaXNQaG9uZUxvY2tlZCBcbiAgICAgICAgICAgICAgICAgICAgICA/ICcxMTBweCcgXG4gICAgICAgICAgICAgICAgICAgICAgOiAobG9ja3MubGlkYXJGdXNpb24gPT09ICdMT0NLRUQnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICcxOTVweCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogKCFmYWNlRGV0ZWN0ZWQgPyAnMjEwcHgnIDogJzExMHB4JykpXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdHJpZ2dlckhhcHRpYyhcIkR5bmFtaWMgSXNsYW5kOiBBY3RpdmUgQ29ubmVjdGlvbiDwn5+iXCIpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHsvKiBMZWZ0IGRvdCBpbnNpZGUgRHluYW1pYyBJc2xhbmQgKi99XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtOTAwLzYwIGJsb2NrIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wLjUgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTkwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBSZWFjdGl2ZSBjb3JlIGluZm9ybWF0aW9uICovfVxuICAgICAgICAgICAgICAgICAgPEFuaW1hdGVQcmVzZW5jZSBtb2RlPVwid2FpdFwiPlxuICAgICAgICAgICAgICAgICAgICB7aXNQaG9uZUxvY2tlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT1cImxvY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjggfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzcuNXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJ1bmNhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIExPQ0tFRFxuICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLnNwYW4+XG4gICAgICAgICAgICAgICAgICAgICkgOiBsb2Nrcy5saWRhckZ1c2lvbiA9PT0gJ0xPQ0tFRCcgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT1cImxvY2tlZF9mdXNpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC44IH19XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHNjYWxlOiAxIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0IHRydW5jYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkZVU0lPTiBMT0NLIEFDVElWRTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICAgICAgICkgOiAhZmFjZURldGVjdGVkID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9XCJub19mYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCBzY2FsZTogMSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmb250LW1vbm8gdGV4dC1bN3B4XSB0ZXh0LXJlZC00MDAgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0IHRydW5jYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctcmVkLTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk5PIFNVQkpFQ1QgREVURUNURUQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwiY2FsaWJyYXRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzdweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNreS00MDAgdHJhY2tpbmctd2lkZXIgdHJ1bmNhdGUgdXBwZXJjYXNlXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBMaURBUiBPS1xuICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLnNwYW4+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgICAgICAgICAgICAgey8qIENhbWVyYSBsZW5zIHRpbnkgcmVmbGVjdGlvbnMgaW5zaWRlIGlzbGFuZCAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMC41IGl0ZW1zLWNlbnRlciBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTk1MCBibG9jayBib3JkZXItWzAuMnB4XSBib3JkZXItaW5kaWdvLTkwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIHtsb2Nrcy5saWRhckZ1c2lvbiA9PT0gJ0xPQ0tFRCcgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMSBoLTEgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNTAwIGJsb2NrIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tIGlPUyBTVEFUVVMgQkFSIC0tLS0tLS0tLS0tLS0tLS0tLS0tICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC1bNDJweF0gcHQtWzE1cHhdIHB4LVsyMnB4XSBmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgYmctc2xhdGUtOTUwIHRleHQtd2hpdGUgdGV4dC1bOS41cHhdIGZvbnQtc2VtaWJvbGQgc2VsZWN0LW5vbmUgei00MCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgey8qIExlZnQgZWxlbWVudHM6IFRpbWUgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ubyB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dGltZVN0cmluZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzdweF0gdGV4dC1za3ktNDAwXCI+4pqhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBSaWdodCBlbGVtZW50czogU2lnbmFsLCBXaS1GaSwgQmF0dGVyeSAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICB7LyogU2lnbmFsIGNlbGx1bGFyICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtZW5kIGdhcC1bMXB4XSBoLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LVsxLjVweF0gaC0wLjUgYmctd2hpdGUgcm91bmRlZC1bMC4ycHhdXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LVsxLjVweF0gaC1bM3B4XSBiZy13aGl0ZSByb3VuZGVkLVswLjJweF1cIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctWzEuNXB4XSBoLVs1cHhdIGJnLXdoaXRlIHJvdW5kZWQtWzAuMnB4XVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdy1bMS41cHhdIGgtWzdweF0gcm91bmRlZC1bMC4ycHhdICR7bG9ja3MubGlkYXJGdXNpb24gPT09ICdMT0NLRUQnID8gJ2JnLWVtZXJhbGQtNDAwJyA6ICdiZy13aGl0ZSd9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzcuNXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgc2NhbGUtWzAuOV1cIj5CdcWCYSA1Rzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHsvKiBXaS1GaSBJY29uICovfVxuICAgICAgICAgICAgICAgICAgICA8V2lmaSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtd2hpdGVcIiAvPlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBCYXR0ZXJ5IGluZGljYXRvciAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNy41cHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPntiYXR0ZXJ5TGV2ZWx9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctWzE2cHhdIGgtWzlweF0gYm9yZGVyIGJvcmRlci13aGl0ZS82MCByb3VuZGVkLVszcHhdIHAtWzFweF0gZmxleCBpdGVtcy1jZW50ZXIgYmctdHJhbnNwYXJlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtZnVsbCByb3VuZGVkLVsxcHhdICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmF0dGVyeUxldmVsIDw9IDIwIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTUwMCBhbmltYXRlLXB1bHNlJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogKGxvY2tzLmxpZGFyRnVzaW9uID09PSAnTE9DS0VEJyA/ICdiZy1lbWVyYWxkLTQwMCcgOiAnYmctd2hpdGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke2JhdHRlcnlMZXZlbH0lYCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLSBNQUlOIFZJRVdQT1JUIEFSRUEgLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIG92ZXJmbG93LXgtaGlkZGVuIHJlbGF0aXZlIHNjcm9sbGJhci1ub25lIHBiLVsxMnB4XSBiZy1zbGF0ZS05NTBcIiBpZD1cImlwaG9uZV9zY3JlZW5fY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICA8QW5pbWF0ZVByZXNlbmNlIG1vZGU9XCJ3YWl0XCI+XG4gICAgICAgICAgICAgICAgICAgIHtpc1Bob25lTG9ja2VkID8gKFxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIC8qID09PT09PT09PT09PT09PT09PT09IGlPUyBMT0NLIFNDUkVFTiBTSU1VTEFUT1IgPT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwibG9ja19zY3JlZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMS4wNSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCBzY2FsZTogMSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4zIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldElzUGhvbmVMb2NrZWQoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiVU5MT0NLRUQgVklBIFRPVUNIXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tYiBmcm9tLWluZGlnby05NTAvNDAgdmlhLXNsYXRlLTk1MCB0by1ibGFjayBwLTUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc2VsZWN0LW5vbmUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ9XCJsb2NrX3NjcmVlbl9zaW11bGF0b3JcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIExvY2sgU3ltYm9sIGFuZCBUaW1lIERpc3BsYXkgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHB0LTggdGV4dC1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHk6IFswLCAtMywgMF0gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAyIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQtZnVsbCBiZy13aGl0ZS81IGJvcmRlciBib3JkZXItd2hpdGUvMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC13aGl0ZS84MFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXNsYXRlLTQwMCBtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2dldFBvbGlzaERhdGUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtNXhsIGZvbnQtZXh0cmFib2xkIHRyYWNraW5nLXRpZ2h0ZXIgdGV4dC10cmFuc3BhcmVudCBiZy1jbGlwLXRleHQgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXdoaXRlIHZpYS1zbGF0ZS0xMDAgdG8tc2xhdGUtNDAwIGZvbnQtc2FucyBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RpbWVTdHJpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFF1aWNrIGlPUy1zdHlsZSBhY3RpdmUgc3RhdHVzIHdpZGdldCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIGJnLXdoaXRlL1swLjAzXSBib3JkZXIgYm9yZGVyLXdoaXRlLzUgcHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEgaC0xIHJvdW5kZWQtZnVsbCBiZy1za3ktNDAwIGFuaW1hdGUtcGluZ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+TEFTRVIgQ09SRToge21ldHJpY3MubGlkYXJQb2ludHNDb3VudC50b0xvY2FsZVN0cmluZygpfSBQVFMg8J+ToTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIExvY2sgU2NyZWVuIFN0YWNrIG9mIGlPUyBQdXNoIE5vdGlmaWNhdGlvbnMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTIuNSBtYXgtdy1zbSB3LWZ1bGwgbXgtYXV0byBweC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogUHVzaCBOb3RpZmljYXRpb24gMTogTWFzY290IFwiQnXFgmFcIiAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyB4OiAtMzAsIG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHg6IDAsIG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGRlbGF5OiAwLjIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvODAgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC80MCByb3VuZGVkLTJ4bCBwLTMgc2hhZG93LWxnIGZsZXggZ2FwLTIuNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNocmluay0wXCI+8J+QuTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHRleHQtc2xhdGUtMjAwXCI+QlXFgUEgKEtsdWIgQ2hvbWlrYSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtc2xhdGUtNTAwXCI+dGVyYXo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LVs5cHhdIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctc251ZyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHfDs2ogPHN0cm9uZz5HbG93LXVwIENoZWNrPC9zdHJvbmc+IGplc3QgZ290b3d5ISBacsOzYiAzRCBza2FuIHR3YXJ6eWN6a2kgeiBCdcWCxIUgaSB6Z2FybmlqIG9kem5ha8SZIDxzdHJvbmc+TWFzdGVyIG9mIHRoZSBNZXNoPC9zdHJvbmc+ISBTbGF5LCBvZGJsb2t1aiBtbmllISDwn4+G4pyoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogUHVzaCBOb3RpZmljYXRpb24gMjogTGlEQVIgc2Vuc29yIHNpZ25hbCAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyB4OiAzMCwgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgeDogMCwgb3BhY2l0eTogMSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZGVsYXk6IDAuNCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC84MCBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzQwIHJvdW5kZWQtMnhsIHAtMyBzaGFkb3ctbGcgZmxleCBnYXAtMi41XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDAgc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHRleHQtc2xhdGUtMjAwXCI+TGlEQVIgRnVzaW9uIFNpZ25hbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1zbGF0ZS01MDBcIj4yIG1pbiB0ZW11PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXNudWcgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEthbGlicmFjamEgRGVsYXVuYXlhIGtvbXBsZXRuYS4gU3RhxYJhIGN6dcWCb8WbxIcgTHVtYSB7bWV0cmljcy5sdW1hfSBtLiBTeWduYcWCIHN0YWJpbG5vxZtjaSBnb3Rvd3kuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBVbmxvY2sgZ3VpZGFuY2UgYXQgYm90dG9tICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBnYXAtMS41IHBiLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHk6IFswLCAtNiwgMF0gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IHJlcGVhdDogSW5maW5pdHksIGR1cmF0aW9uOiAxLjUsIGVhc2U6ICdlYXNlSW5PdXQnIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblVwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1zbGF0ZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgS2xpa25paiBla3JhbiBsdWIgcHJ6ZXN1xYQsIGFieSBvZGJsb2tvd2HEh1xuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAvKiA9PT09PT09PT09PT09PT09PT09PSBBQ1RJVkUgQVBQTElDQVRJT04gVklFV1MgPT09PT09PT09PT09PT09PT09PT0gKi9cbiAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwidW5sb2NrZWRfYXBwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCB5OiAtMTUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWluLWgtZnVsbCBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRhYiBDb250ZW50IERpc3BsYXkgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBwYi1bNjRweF1cIiBpZD1cInRhYl9zY3JvbGxlcl9ib2R5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdzY2FuJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogLS0tLS0tLS0tLSBUQUIgMTogU0tBTkVSIENPUkUgLS0tLS0tLS0tLSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtM1wiIGlkPVwiaW9zX3RhYl9zY2FuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthcHBNb2RlID09PSAndGVjaF9zZWxlY3RvcicgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUZWNoQ29zbW9zU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyaWNzPXttZXRyaWNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5UeXBlPXtzY2FuVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTY2FuVHlwZT17c2V0U2NhblR5cGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Jbml0aWF0ZVNjYW49eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZExvZygnU1lTVEVNJywgJ0luaXRpYXRpbmcgM0Qgc2Nhbm5pbmcuIFRyYW5zaXRpb25pbmcgaW5zaWRlIGlQaG9uZSBUYWIgMS4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFwcE1vZGUoJ2FjdGl2ZV9zY2FubmVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiU0NBTk5FUiBBQ1RJVkVcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uU3RhdHM9e3RyaWFuZ3VsYXRpb25TdGF0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUcmlhbmd1bGF0aW9uU3RhdHM9e3NldFRyaWFuZ3VsYXRpb25TdGF0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFJldHVybiBiYXIgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvODAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFwcE1vZGUoJ3RlY2hfc2VsZWN0b3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiQkFDSyBUTyBIT01FXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgcHktMSBweC0yLjUgYmctc2xhdGUtOTUwIHRleHQtc2t5LTQwMCBob3Zlcjp0ZXh0LXNreS0yMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuKGkCBPQlNaQVJZIFNLQU5VPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ibGFja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBLbHViIENob21pa2EgKEFjdGl2ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDYW1lcmEgcHJldmlldyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2FtZXJhU3RyZWFtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmYWNpbmdNb2RlPXtmYWNpbmdNb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0RmFjaW5nTW9kZT17c2V0RmFjaW5nTW9kZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FuZGJveE1vZGU9e2lzU2FuZGJveE1vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW5kYm94TWV0cmljcz17bWV0cmljc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTGl2ZU1ldHJpY3NVcGRhdGU9e2hhbmRsZUxpdmVNZXRyaWNzVXBkYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZURldGVjdGVkPXtmYWNlRGV0ZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRGYWNlRGV0ZWN0ZWQ9e3NldEZhY2VEZXRlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIDNEIG1lc2ggdmlzdWFsaXplciAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQteGwgcC0yLjUgYmctc2xhdGUtOTUwLzIwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbnRlcmFjdGl2ZSAzRCBEZWxhdW5heSBNZXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1za3ktNDAwIGJnLXNreS05NTAvNTAgcHgtMSBweS0wLjIgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNreS05MDAvMzBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSRUFMLVRJTUUgSU5DSVJDTEVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUaHJlZURIZWFkVmlzdWFsaXplclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5YXc9e21ldHJpY3MueWF3fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXRjaD17bWV0cmljcy5waXRjaH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sbD17bWV0cmljcy5yb2xsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZT17bWV0cmljcy5kaXN0YW5jZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFjZURldGVjdGVkPXtmYWNlRGV0ZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblRyaWFuZ2xlQW5nbGU9e21pblRyaWFuZ2xlQW5nbGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFRyaWFuZ2xlRWRnZUxlbmd0aD17bWF4VHJpYW5nbGVFZGdlTGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmZvcmNlRGVsYXVuYXlDb25kaXRpb249e2VuZm9yY2VEZWxhdW5heUNvbmRpdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25Ucmlhbmd1bGF0aW9uU3RhdHM9e3NldFRyaWFuZ3VsYXRpb25TdGF0c31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhblR5cGU9e3NjYW5UeXBlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93TGl2ZU1lc2g9e2xpdmVGZWVkYmFjay5zaG93TGl2ZU1lc2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3dSZWFsVGltZU1ldHJpY3M9e2xpdmVGZWVkYmFjay5zaG93UmVhbFRpbWVNZXRyaWNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDdXN0b20gY29udHJvbGxlciAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hvbWlrVWlDb250cm9sbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRyaWNzPXttZXRyaWNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSZWFkeVRvQ2FwdHVyZT17aXNSZWFkeVRvQ2FwdHVyZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTHVtYU9rPXtpc0x1bWFPa31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzRGlzdGFuY2VPaz17aXNEaXN0YW5jZU9rfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNSb3RhdGlvbk9rPXtpc1JvdGF0aW9uT2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NoYXJwbmVzc09rPXtpc1NoYXJwbmVzc09rfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZT17Y2FwdHVyZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5UeXBlPXtzY2FuVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNjYW5UeXBlPXtzZXRTY2FuVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpdmVGZWVkYmFjaz17bGl2ZUZlZWRiYWNrfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DYXB0dXJlPXtoYW5kbGVDYXB0dXJlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25SZXNldExvY2tzPXtoYW5kbGVSZXNldExvY2tzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwU3RhdGU9e2FwcFN0YXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXBwU3RhdGU9e3NldEFwcFN0YXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogRHdlbGwgY2hlY2tsaXN0ICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgcm91bmRlZC14bCBwLTMgYmctc2xhdGUtOTUwLzQwIGZsZXggZmxleC1jb2wgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgcGItMSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIER3ZWxsIFN0YWJpbGl0eSBDaGVja2xpc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMSB0ZXh0LVs4cHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+MS4gRmFjZSAmIFJvdGF0aW9uOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2ZhY2VEZXRlY3RlZCAmJiBpc1JvdGF0aW9uT2sgPyAndGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQnIDogJ3RleHQtcmVkLTUwMCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2ZhY2VEZXRlY3RlZCAmJiBpc1JvdGF0aW9uT2sgPyAn4pyUIE9LJyA6ICfinYwgRVJSJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Mi4gRGlzdGFuY2UgKOKJpDQwY20pOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2lzRGlzdGFuY2VPayA/ICd0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1yZWQtNTAwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNEaXN0YW5jZU9rID8gJ+KclCBPSycgOiAn4p2MIEVSUid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjMuIFF1YWxpdHkgU2NvcmUgKOKJpTk2JSk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aXNRdWFsaXR5T2sgPyAndGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQnIDogJ3RleHQtcmVkLTUwMCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzUXVhbGl0eU9rID8gJ+KclCBPSycgOiAn4p2MIEVSUid9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBib3JkZXItdCBib3JkZXItc2xhdGUtOTAwIHB0LTEgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjQuIER3ZWxsIENvaGVyZW5jZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXttZXRyaWNzLnN0YWJpbGl0eU1zID49IDIwMDAgPyAndGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQnIDogJ3RleHQtYW1iZXItNTAwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWV0cmljcy5zdGFiaWxpdHlNcyA+PSAyMDAwID8gJ/CflJIgTE9DS0VEJyA6IGBXQUlUICgkeyhtZXRyaWNzLnN0YWJpbGl0eU1zLzEwKS50b0ZpeGVkKDApfSUpYH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVUYWIgPT09ICd0ZWNoJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogLS0tLS0tLS0tLSBUQUIgMjogVEVMRU1FVFJJQSBTRU5TT1JBIC0tLS0tLS0tLS0gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTNcIiBpZD1cImlvc190YWJfdGVjaFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgcC0yIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1jZW50ZXIgZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBTRU5TT1IgRlVTSU9OICYgRlJFUVVFTkNZIFRFTEVNRVRSWVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMaWRhckRlcHRoSGlzdG9ncmFtIG1ldHJpY3M9e21ldHJpY3N9IHNjYW5UeXBlPXtzY2FuVHlwZX0gLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPERpYWdub3N0aWNDb25zb2xlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldHJpY3M9e21ldHJpY3N9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2tzPXtsb2Nrc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnPXtQUk9UT0NPTF9DT05GSUd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2FuZGJveE1vZGU9e2lzU2FuZGJveE1vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldElzU2FuZGJveE1vZGU9e3NldElzU2FuZGJveE1vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uU2FuZGJveE1ldHJpY3NDaGFuZ2U9e2hhbmRsZVNhbmRib3hNZXRyaWNzQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaXN0b3J5PXtoaXN0b3J5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5UcmlhbmdsZUFuZ2xlPXttaW5UcmlhbmdsZUFuZ2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNaW5UcmlhbmdsZUFuZ2xlPXtzZXRNaW5UcmlhbmdsZUFuZ2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhUcmlhbmdsZUVkZ2VMZW5ndGg9e21heFRyaWFuZ2xlRWRnZUxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWF4VHJpYW5nbGVFZGdlTGVuZ3RoPXtzZXRNYXhUcmlhbmdsZUVkZ2VMZW5ndGh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbj17ZW5mb3JjZURlbGF1bmF5Q29uZGl0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRFbmZvcmNlRGVsYXVuYXlDb25kaXRpb249e3NldEVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvblN0YXRzPXt0cmlhbmd1bGF0aW9uU3RhdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5UeXBlPXtzY2FuVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2NhblR5cGU9e3NldFNjYW5UeXBlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXZlRmVlZGJhY2s9e2xpdmVGZWVkYmFja31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TGl2ZUZlZWRiYWNrPXtzZXRMaXZlRmVlZGJhY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogTWluaSBhY3RpdmUgc3RyZWFtIGxvZyBsb2cgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJnLXNsYXRlLTk1MCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzYwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgcHgtMyBweS0xLjUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBMSVZFIEVER0UgU0VOU09SIExPR1NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiBiZy1zbGF0ZS05NTAgbWF4LWgtWzEwMHB4XSBvdmVyZmxvdy15LWF1dG8gZm9udC1tb25vIHRleHQtWzdweF0gdGV4dC1zbGF0ZS00MDAgZmxleCBmbGV4LWNvbCBnYXAtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xvZ3Muc2xpY2UoLTEwKS5tYXAoKGxvZykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2xvZy5pZH0gY2xhc3NOYW1lPVwiZmxleCBnYXAtMS41IGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDBcIj5be2xvZy50aW1lc3RhbXB9XTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1za3ktNDAwXCI+W3tsb2cuY2F0ZWdvcnl9XTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgdHJ1bmNhdGVcIj57bG9nLm1lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2hpc3RvcnknICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAtLS0tLS0tLS0tIFRBQiAzOiBCQVpBIERBTllDSCAoUE9TVEdSRVNRTCkgLS0tLS0tLS0tLSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtM1wiIGlkPVwiaW9zX3RhYl9oaXN0b3J5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC82MCBwLTIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LWNlbnRlciBmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgdGV4dC1lbWVyYWxkLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNRTCBCQVpBOiB0YWJsZSAndXNlcl9zY2Fuc19yYXcnPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFeHBvcnRQYW5lbCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwdHVyZT17Y2FwdHVyZX0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xlYXJDYXB0dXJlPXtoYW5kbGVDbGVhckNhcHR1cmV9IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkFkZERpYWdub3N0aWNMb2c9e2FkZExvZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25TYXZlQ2xvdWRSZWNvcmQ9eyhyZWNvcmQpID0+IHNldFNhdmVkU2NhbnMocHJldiA9PiBbcmVjb3JkLCAuLi5wcmV2XSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5UeXBlPXtzY2FuVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxVc2VyU2NhbnNEYlZpZXdlciBzY2Fucz17c2F2ZWRTY2Fuc30gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlVGFiID09PSAncG9ydGFsJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogLS0tLS0tLS0tLSBUQUIgNDogRkxVVFRFUiBOQVRJVkUgQlJJREdFIC0tLS0tLS0tLS0gKi9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTNcIiBpZD1cImlvc190YWJfcG9ydGFsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC82MCBwLTIgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LWNlbnRlciBmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgdGV4dC1wdXJwbGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTbWFydHBob25lIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5GTFVUVEVSIE5BVElWRSBXRUJWSUVXIEJSSURHRTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Rmx1dHRlck1vYmlsZUludGVncmF0aW9uIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tIGlPUyBCT1RUT00gVEFCIEJBUiAtLS0tLS0tLS0tLS0tLS0tLS0tLSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLVsxMHB4XSBpbnNldC14LTAgaC1bNTBweF0gYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMC84MCBiZy1zbGF0ZS05NTAvOTUgYmFja2Ryb3AtYmx1ci1tZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWFyb3VuZCBweC0yIHotNDUgcGItWzFweF0gc2VsZWN0LW5vbmVcIiBpZD1cImlvc19ib3R0b21fdGFiX2JhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZVRhYignc2NhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhcIlRhYjogU2Nhbm5lclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTEuNSBmbGV4LTEgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3NjYW4nID8gJ3RleHQtc2t5LTQwMCBzY2FsZS0xMDUgZm9udC1ib2xkJyA6ICd0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDYW1lcmEgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNy41cHhdIG10LTAuNSB0cmFja2luZy10aWdodGVyXCI+U2thbmVyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QWN0aXZlVGFiKCd0ZWNoJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiVGFiOiBUZWxlbWV0cmlhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHktMS41IGZsZXgtMSBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAndGVjaCcgPyAndGV4dC1za3ktNDAwIHNjYWxlLTEwNSBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzcuNXB4XSBtdC0wLjUgdHJhY2tpbmctdGlnaHRlclwiPkhpc3RvZ3JhbTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZVRhYignaGlzdG9yeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhcIlRhYjogQXJjaGl3dW1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweS0xLjUgZmxleC0xIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdoaXN0b3J5JyA/ICd0ZXh0LXNreS00MDAgc2NhbGUtMTA1IGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNy41cHhdIG10LTAuNSB0cmFja2luZy10aWdodGVyXCI+QmF6YSBTUUw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRBY3RpdmVUYWIoJ3BvcnRhbCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhcIlRhYjogQ2hvbWlrIEh1YlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTEuNSBmbGV4LTEgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3BvcnRhbCcgPyAndGV4dC1za3ktNDAwIHNjYWxlLTEwNSBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNtYXJ0cGhvbmUgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bNy41cHhdIG10LTAuNSB0cmFja2luZy10aWdodGVyXCI+Q2hvbWlrIEh1Yjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogaU9TIEJvdHRvbSBTd2lwZSBJbmRpY2F0b3IgTGluZSBpbnNpZGUgU2NyZWVuICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEFwcE1vZGUoJ3RlY2hfc2VsZWN0b3InKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiSG9tZTogUmVzZXQgdG8gc2VjdG9yc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLVs0cHhdIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgdy1bMTEwcHhdIGgtWzRweF0gYmctc2xhdGUtNTAwIGhvdmVyOmJnLXNsYXRlLTMwMCByb3VuZGVkLWZ1bGwgei01MCBvcGFjaXR5LTYwIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJIb21lIEJhcjogS2xpa25paiwgYWJ5IHdyw7NjacSHIGRvIHd5Ym9ydSBvYnN6YXLDs3dcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUmlnaHQgU2lkZSBJbmZvICYgUXVpY2sgVGVsZW1ldHJ5IEhVRCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBsZzp3LTgwIGZsZXggZmxleC1jb2wgZ2FwLTQgei0yMCBzaHJpbmstMFwiIGlkPVwid29ya2JlbmNoX3NpZGViYXJfcmlnaHRcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIExpdmUgYWN0aXZlIHNlbnNvciBsb2NrcyBpbmZvIHBhbmVsICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgYmFja2Ryb3AtYmx1ci1tZCBwLTQgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBnYXAtMi41XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TdGFuIEthbGlicmFjamkgaU9TPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEuNSBmb250LW1vbm8gdGV4dC1bOS41cHhdXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcC0xLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAvNDAgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+TGlEQVIgRnVzaW9uOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtYm9sZCBweC0xLjUgcHktMC4yIHJvdW5kZWQgdGV4dC1bOHB4XSAke2xvY2tzLmxpZGFyRnVzaW9uID09PSAnTE9DS0VEJyA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtNDAwJyA6ICdiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICB7bG9ja3MubGlkYXJGdXNpb259XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcC0xLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAvNDAgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+QXV0byBGb2N1czo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LWJvbGQgcHgtMS41IHB5LTAuMiByb3VuZGVkIHRleHQtWzhweF0gJHtsb2Nrcy5mb2N1cyA9PT0gJ0xPQ0tFRCcgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTQwMCcgOiAnYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwJ31gfT5cbiAgICAgICAgICAgICAgICAgICAge2xvY2tzLmZvY3VzfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcC0xLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAvNDAgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+RWtzcG96eWNqYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LWJvbGQgcHgtMS41IHB5LTAuMiByb3VuZGVkIHRleHQtWzhweF0gJHtsb2Nrcy5leHBvc3VyZSA9PT0gJ0xPQ0tFRCcgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTQwMCcgOiAnYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwJ31gfT5cbiAgICAgICAgICAgICAgICAgICAge2xvY2tzLmV4cG9zdXJlfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcC0xLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAvNDAgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+V3licmFueSBTZWt0b3I6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1za3ktNDAwIGZvbnQtYm9sZCB0cmFja2luZy10aWdodCB0cnVuY2F0ZSBtYXgtdy1bMTQwcHhdIHRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAge3NjYW5UeXBlfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQnXFgmEgSGFtc3RlciBmdW5ueSB0cml2aWEgYm94ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgYmFja2Ryb3AtYmx1ci1tZCBwLTQgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSBmb250LWJvbGQgdGV4dC1hbWJlci00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAg8J+QuSA8c3Bhbj5TbGF5IE3EhWRyb8WbY2kgQnXFgnk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtWzEwLjVweF0gdGV4dC1zbGF0ZS0zMDAgaXRhbGljIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIFwiUGFtacSZdGFqLCBieSB0cnp5bWHEhyBpUGhvbmlrYSBzenR5d25pdXRrbyBuYSB3eXNva2/Fm2NpIG9jenUhIEplxZtsaSBsYXNlcm93ZSBrcm9wa2kgTGlEQVJ1IHNwYWRuxIUgcG9uacW8ZWogMjU2eDE5MiwgdG8gc3DDs2pub8WbxIcgc2lhdGtpIERlbGF1bmF5YSBww7NqZHppZSBwacSHIGtvbXBvdCB6IGFncmVzdHUhXCJcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSB0ZXh0LXNsYXRlLTUwMCB0ZXh0LXJpZ2h0IGJsb2NrXCI+4oCUIEJ1xYJhLCBHxYLDs3dueSBBcmNoaXRla3QgS2FsaWJyYWNqaTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUXVpY2sgYWN0aW9uIG92ZXJyaWRlcyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzYwIGJhY2tkcm9wLWJsdXItbWQgcC00IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2wgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgIFN5bXVsYWNqYSBPdG9jemVuaWFcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTIgbXQtMVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc2V0SXNTYW5kYm94TW9kZSghaXNTYW5kYm94TW9kZSk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJIYXB0aWMoaXNTYW5kYm94TW9kZSA/IFwiUEhZU0lDQUwgU0VOU09SIExJTktFRFwiIDogXCJTQU5EQk9YIEVOQUJMRURcIik7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCBweS0xLjUgcHgtMyByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciB0ZXh0LWNlbnRlciAke1xuICAgICAgICAgICAgICAgICAgICBpc1NhbmRib3hNb2RlIFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTk1MCBib3JkZXItYW1iZXItNTAwLzQwIHRleHQtYW1iZXItNDAwIGhvdmVyOnRleHQtYW1iZXItMjAwJyBcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1lbWVyYWxkLTk1MC80MCBib3JkZXItZW1lcmFsZC04MDAgdGV4dC1lbWVyYWxkLTQwMCBob3Zlcjp0ZXh0LWVtZXJhbGQtMjAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2lzU2FuZGJveE1vZGUgPyAnV1nFgcSEQ1ogVFJZQiBQSUFTS09XTklDWSAoU0FOREJPWCknIDogJ1fFgcSEQ1ogVFJZQiBQSUFTS09XTklDWSAoU0FOREJPWCknfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRNZXRyaWNzKHByZXYgPT4gKHsgLi4ucHJldiwgZmFjZURldGVjdGVkOiAhcHJldi5mYWNlRGV0ZWN0ZWQgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgIHNldEZhY2VEZXRlY3RlZCghZmFjZURldGVjdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKGZhY2VEZXRlY3RlZCA/IFwiRkFDRSBMT1NUIOKaoO+4j1wiIDogXCJGQUNFIERFVEVDVEVEIPCfn6JcIik7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgcHktMSBweC0yIHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7ZmFjZURldGVjdGVkID8gJ1pHVUIgVFdBUlonIDogJ1dZS1JZSiBUV0FSWid9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldE1ldHJpY3MocHJldiA9PiAoeyAuLi5wcmV2LCBkaXN0YW5jZTogcHJldi5kaXN0YW5jZSA9PT0gMC4zNiA/IDAuNjUgOiAwLjM2IH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VySGFwdGljKFwiRFlTVEFOUyBaTUlFTklPTllcIik7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgcHktMSBweC0yIHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7bWV0cmljcy5kaXN0YW5jZSA8PSAwLjQwID8gJ09EU1XFgyBTRU5TT1InIDogJ1BSWllCTEnFuyBTRU5TT1InfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIC8qID09PT09PT09PT09PT09PT09PT09IEZMVUlEIEJST0FEIERBU0hCT0FSRCBNT0RFIChPcmlnaW5hbCBTaWRlLWJ5LXNpZGUgYnV0IHRhYi1vcmdhbml6ZWQpID09PT09PT09PT09PT09PT09PT09ICovXG4gICAgICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXgtMSBtYXgtdy03eGwgdy1mdWxsIG14LWF1dG8gcC00IHNtOnAtNiBmbGV4IGZsZXgtY29sIGdhcC02XCIgaWQ9XCJtYWluX2NvbnRlbnRfY29udGFpbmVyXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC00IHJvdW5kZWQteGwgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2FucyBmb250LWJsYWNrIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGUgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+TWVkaWFQaXBlIDNEIExpREFSIERhc2hib2FyZCAoRGVza3RvcCBWaWV3KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGJnLXNreS05NTAgdGV4dC1za3ktNDAwIGZvbnQtbW9ubyBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1za3ktOTAwXCI+RlVMTCBTQ1JFRU48L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1zYW5zIG10LTAuNVwiPkR6aWHFgmFzeiB3IHRyeWJpZSBzemVyb2tpZWdvIHB1bHBpdHUuIFdzenlzdGtpZSBwYW5lbGUgem9zdGHFgnkgZG9zdG9zb3dhbmUgZG8gc3plcm9raWNoIHJvemR6aWVsY3pvxZtjaS48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0SXNEZXZpY2VGcmFtZUVuYWJsZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgdHJpZ2dlckhhcHRpYyhcIklQSE9ORSBGUkFNRSBBQ1RJVkVcIik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCBweC0zIHB5LTEuNSBiZy1za3ktOTUwIGhvdmVyOmJnLXNreS05MDAgdGV4dC1za3ktNDAwIGJvcmRlciBib3JkZXItc2t5LTgwMCByb3VuZGVkLWxnIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAg4oaQIFBPV1LDk1QgRE8gUkFNS0kgSVBIT05FJ0EgKFpBTEVDQU5FKVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUXVpY2sgVGFiIGNvbnRyb2xsZXJzIGZvciBmbHVpZCBkYXNoYm9hcmQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgYmctc2xhdGUtOTUwLzQwIHAtMSByb3VuZGVkLWxnIGdhcC0yXCI+XG4gICAgICAgICAgICB7KFsnc2NhbicsICd0ZWNoJywgJ2hpc3RvcnknLCAncG9ydGFsJ10gYXMgY29uc3QpLm1hcCgodGFiKSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e3RhYn1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIodGFiKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC1sZyBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgY2FwaXRhbGl6ZSBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSB0YWIgXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS05NTAgdGV4dC1za3ktNDAwIGJvcmRlciBib3JkZXItc2t5LTkwMCcgXG4gICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwIGhvdmVyOmJnLXNsYXRlLTkwMC8zMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHt0YWIgPT09ICdzY2FuJyA/ICfwn5uw77iPIFNrYW5lciBDb3JlJyA6IHRhYiA9PT0gJ3RlY2gnID8gJ/Cfk4ogSGlzdG9ncmFtIGkgVGVsZW1ldHJpYScgOiB0YWIgPT09ICdoaXN0b3J5JyA/ICfwn5K+IEFyY2hpd3VtIFNjYW5zJyA6ICfwn5SMIENob21payBQb3J0YWwnfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdzY2FuJyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTYgaXRlbXMtc3RhcnRcIj5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB7LyogTGVmdCBWaWV3cG9ydCAoV2Fyc3R3YSAxOiBUZWNobm9sb2dpY3puYSkgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IGZsZXggZmxleC1jb2wgZ2FwLTQgcmVsYXRpdmUgYm9yZGVyIGJvcmRlci1za3ktOTUwLzQwIHJvdW5kZWQteGwgcC00IGJnLXNsYXRlLTk1MC8yMFwiIGlkPVwidmlzdWFsX3BhbmVsc19jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgIHthcHBTdGF0ZSA9PT0gQXBwU3RhdGUuY2hpbGwgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctc2xhdGUtOTUwLzk1IGJhY2tkcm9wLWJsdXItbWQgei0zMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTYgdGV4dC1jZW50ZXIgcm91bmRlZC14bFwiIGlkPVwidGVjaF9kYXRhX292ZXJsYXlfbG9ja2VkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgcm91bmRlZC1mdWxsIGJnLWFtYmVyLTUwMC8xMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBtYi00IHRleHQtM3hsIGFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICDwn5KkXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFdBUlNUV0EgMSBURUNIIERBVEEgT1ZFUkxBWVxuICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG1heC13LXhzIGxlYWRpbmctcmVsYXhlZCBtYi02XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBCdcWCYSBvZHBvY3p5d2EgdyBzd29qZWogbm9yY2UgaSBwb3BpamEgbWVsaXPEmS4gT2RwYWwgdHJ5YiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LW1vbm9cIj5RVUFOVFVNIE1PREU8L3N0cm9uZz4sIGFieSBuYcWCb8W8ecSHIGN5YmVyLWdvZ2xlLCBwb2RwacSFxIcgc3lzdGVtIExpREFSIGkgdXJ1Y2hvbWnEhyBza2FuZXIgYmlvbWV0cnljem55IVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkTG9nKCdTWVNURU0nLCAnUXVhbnR1bSBNb2RlIGFjdGl2YXRlZC4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0QXBwU3RhdGUoQXBwU3RhdGUucXVhbnR1bSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBweS0yLjUgcHgtNCBiZy1za3ktOTUwIGhvdmVyOmJnLXNreS05MDAgdGV4dC1za3ktNDAwIGJvcmRlciBib3JkZXItc2t5LTgwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBBS1RZV1VKIFFVQU5UVU0gTU9ERVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgIHthcHBNb2RlID09PSAndGVjaF9zZWxlY3RvcicgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxUZWNoQ29zbW9zU2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICBtZXRyaWNzPXttZXRyaWNzfVxuICAgICAgICAgICAgICAgICAgICAgIHNjYW5UeXBlPXtzY2FuVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICBzZXRTY2FuVHlwZT17c2V0U2NhblR5cGV9XG4gICAgICAgICAgICAgICAgICAgICAgb25Jbml0aWF0ZVNjYW49eygpID0+IHNldEFwcE1vZGUoJ2FjdGl2ZV9zY2FubmVyJyl9XG4gICAgICAgICAgICAgICAgICAgICAgdHJpYW5ndWxhdGlvblN0YXRzPXt0cmlhbmd1bGF0aW9uU3RhdHN9XG4gICAgICAgICAgICAgICAgICAgICAgc2V0VHJpYW5ndWxhdGlvblN0YXRzPXtzZXRUcmlhbmd1bGF0aW9uU3RhdHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIGJnLXNsYXRlLTkwMC82MCBwLTIgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwXCI+QUNUSVZFIENBTUVSQSBQUkVWSUVXPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRBcHBNb2RlKCd0ZWNoX3NlbGVjdG9yJyl9IGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LW1vbm8gdGV4dC1bOXB4XSBob3Zlcjp1bmRlcmxpbmVcIj7ihpAgT0JTWkFSWTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxDYW1lcmFTdHJlYW1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZhY2luZ01vZGU9e2ZhY2luZ01vZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRGYWNpbmdNb2RlPXtzZXRGYWNpbmdNb2RlfVxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTYW5kYm94TW9kZT17aXNTYW5kYm94TW9kZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbmRib3hNZXRyaWNzPXttZXRyaWNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25MaXZlTWV0cmljc1VwZGF0ZT17aGFuZGxlTGl2ZU1ldHJpY3NVcGRhdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWNlRGV0ZWN0ZWQ9e2ZhY2VEZXRlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEZhY2VEZXRlY3RlZD17c2V0RmFjZURldGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCByb3VuZGVkLXhsIHAtNCBiZy1zbGF0ZS05NTAvMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCBibG9jayBtYi0yXCI+M0QgTUVTSCBXSVJFRlJBTUU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VGhyZWVESGVhZFZpc3VhbGl6ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgeWF3PXttZXRyaWNzLnlhd31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGl0Y2g9e21ldHJpY3MucGl0Y2h9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGw9e21ldHJpY3Mucm9sbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U9e21ldHJpY3MuZGlzdGFuY2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZhY2VEZXRlY3RlZD17ZmFjZURldGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBtaW5UcmlhbmdsZUFuZ2xlPXttaW5UcmlhbmdsZUFuZ2xlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhUcmlhbmdsZUVkZ2VMZW5ndGg9e21heFRyaWFuZ2xlRWRnZUxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZW5mb3JjZURlbGF1bmF5Q29uZGl0aW9uPXtlbmZvcmNlRGVsYXVuYXlDb25kaXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVHJpYW5ndWxhdGlvblN0YXRzPXtzZXRUcmlhbmd1bGF0aW9uU3RhdHN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNjYW5UeXBlPXtzY2FuVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0xpdmVNZXNoPXtsaXZlRmVlZGJhY2suc2hvd0xpdmVNZXNofVxuICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UmVhbFRpbWVNZXRyaWNzPXtsaXZlRmVlZGJhY2suc2hvd1JlYWxUaW1lTWV0cmljc31cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBSaWdodCBWaWV3cG9ydCAoV2Fyc3R3YSAyOiBDb250cm9scykgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGZsZXggZmxleC1jb2wgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgIDxDaG9taWtVaUNvbnRyb2xsZXJcbiAgICAgICAgICAgICAgICAgICAgbWV0cmljcz17bWV0cmljc31cbiAgICAgICAgICAgICAgICAgICAgaXNSZWFkeVRvQ2FwdHVyZT17aXNSZWFkeVRvQ2FwdHVyZX1cbiAgICAgICAgICAgICAgICAgICAgaXNMdW1hT2s9e2lzTHVtYU9rfVxuICAgICAgICAgICAgICAgICAgICBpc0Rpc3RhbmNlT2s9e2lzRGlzdGFuY2VPa31cbiAgICAgICAgICAgICAgICAgICAgaXNSb3RhdGlvbk9rPXtpc1JvdGF0aW9uT2t9XG4gICAgICAgICAgICAgICAgICAgIGlzU2hhcnBuZXNzT2s9e2lzU2hhcnBuZXNzT2t9XG4gICAgICAgICAgICAgICAgICAgIGNhcHR1cmU9e2NhcHR1cmV9XG4gICAgICAgICAgICAgICAgICAgIHNjYW5UeXBlPXtzY2FuVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgc2V0U2NhblR5cGU9e3NldFNjYW5UeXBlfVxuICAgICAgICAgICAgICAgICAgICBsaXZlRmVlZGJhY2s9e2xpdmVGZWVkYmFja31cbiAgICAgICAgICAgICAgICAgICAgb25DYXB0dXJlPXtoYW5kbGVDYXB0dXJlfVxuICAgICAgICAgICAgICAgICAgICBvblJlc2V0TG9ja3M9e2hhbmRsZVJlc2V0TG9ja3N9XG4gICAgICAgICAgICAgICAgICAgIGFwcFN0YXRlPXthcHBTdGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgc2V0QXBwU3RhdGU9e3NldEFwcFN0YXRlfVxuICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgey8qIERlc2t0b3AgQ2hlY2tsaXN0ICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCByb3VuZGVkLXhsIHAtNCBiZy1zbGF0ZS05NTAvNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2sgbWItMyBwYi0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBTWVNURU0gQ09NUExJQU5DRSBNT05JVE9SXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zIGZvbnQtbW9ubyB0ZXh0LVs5cHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgYmctc2xhdGUtOTUwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+RmFjZSBBbmdsZSBDb2hlcmVuY2UgKOKJpDEwwrApOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17ZmFjZURldGVjdGVkICYmIGlzUm90YXRpb25PayA/ICd0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1yZWQtNTAwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtmYWNlRGV0ZWN0ZWQgJiYgaXNSb3RhdGlvbk9rID8gJ+KclCBQQVNTRUQnIDogJ+KdjCBGQUlMRUQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIGJnLXNsYXRlLTk1MCByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIGZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPlRhcmdldCBSYW5nZSAo4omkNDBjbSk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtpc0Rpc3RhbmNlT2sgPyAndGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQnIDogJ3RleHQtcmVkLTUwMCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNEaXN0YW5jZU9rID8gJ+KclCBQQVNTRUQnIDogJ+KdjCBGQUlMRUQnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIGJnLXNsYXRlLTk1MCByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIGZsZXgganVzdGlmeS1iZXR3ZWVuIGNvbC1zcGFuLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+RGVsYXVuYXkgRHdlbGwgVGltZXIgU3RhdHVzOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17bWV0cmljcy5zdGFiaWxpdHlNcyA+PSAyMDAwID8gJ3RleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkJyA6ICd0ZXh0LWFtYmVyLTUwMCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bWV0cmljcy5zdGFiaWxpdHlNcyA+PSAyMDAwID8gJ/CflJIgbG9ja2VkICgyMDAwbXMgaG9sZCBjb21wbGV0ZSknIDogYEhPTEQgU1RJTEwgKCR7KG1ldHJpY3Muc3RhYmlsaXR5TXMvMTApLnRvRml4ZWQoMCl9JSlgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3RlY2gnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC02XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0yIGdhcC02XCI+XG4gICAgICAgICAgICAgICAgICA8TGlkYXJEZXB0aEhpc3RvZ3JhbSBtZXRyaWNzPXttZXRyaWNzfSBzY2FuVHlwZT17c2NhblR5cGV9IC8+XG4gICAgICAgICAgICAgICAgICA8RGlhZ25vc3RpY0NvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgbWV0cmljcz17bWV0cmljc31cbiAgICAgICAgICAgICAgICAgICAgbG9ja3M9e2xvY2tzfVxuICAgICAgICAgICAgICAgICAgICBjb25maWc9e1BST1RPQ09MX0NPTkZJR31cbiAgICAgICAgICAgICAgICAgICAgaXNTYW5kYm94TW9kZT17aXNTYW5kYm94TW9kZX1cbiAgICAgICAgICAgICAgICAgICAgc2V0SXNTYW5kYm94TW9kZT17c2V0SXNTYW5kYm94TW9kZX1cbiAgICAgICAgICAgICAgICAgICAgb25TYW5kYm94TWV0cmljc0NoYW5nZT17aGFuZGxlU2FuZGJveE1ldHJpY3NDaGFuZ2V9XG4gICAgICAgICAgICAgICAgICAgIGhpc3Rvcnk9e2hpc3Rvcnl9XG4gICAgICAgICAgICAgICAgICAgIG1pblRyaWFuZ2xlQW5nbGU9e21pblRyaWFuZ2xlQW5nbGV9XG4gICAgICAgICAgICAgICAgICAgIHNldE1pblRyaWFuZ2xlQW5nbGU9e3NldE1pblRyaWFuZ2xlQW5nbGV9XG4gICAgICAgICAgICAgICAgICAgIG1heFRyaWFuZ2xlRWRnZUxlbmd0aD17bWF4VHJpYW5nbGVFZGdlTGVuZ3RofVxuICAgICAgICAgICAgICAgICAgICBzZXRNYXhUcmlhbmdsZUVkZ2VMZW5ndGg9e3NldE1heFRyaWFuZ2xlRWRnZUxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgZW5mb3JjZURlbGF1bmF5Q29uZGl0aW9uPXtlbmZvcmNlRGVsYXVuYXlDb25kaXRpb259XG4gICAgICAgICAgICAgICAgICAgIHNldEVuZm9yY2VEZWxhdW5heUNvbmRpdGlvbj17c2V0RW5mb3JjZURlbGF1bmF5Q29uZGl0aW9ufVxuICAgICAgICAgICAgICAgICAgICB0cmlhbmd1bGF0aW9uU3RhdHM9e3RyaWFuZ3VsYXRpb25TdGF0c31cbiAgICAgICAgICAgICAgICAgICAgc2NhblR5cGU9e3NjYW5UeXBlfVxuICAgICAgICAgICAgICAgICAgICBzZXRTY2FuVHlwZT17c2V0U2NhblR5cGV9XG4gICAgICAgICAgICAgICAgICAgIGxpdmVGZWVkYmFjaz17bGl2ZUZlZWRiYWNrfVxuICAgICAgICAgICAgICAgICAgICBzZXRMaXZlRmVlZGJhY2s9e3NldExpdmVGZWVkYmFja31cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogRGlhZ25vc3RpYyBDb25zb2xlIExvZyBUZXJtaW5hbCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJnLXNsYXRlLTk1MFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBweC00IHB5LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1zbGF0ZS00MDBcIj5MSVZFIEVER0UgQ09OU09MRSBTWVNURU0gTE9HPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1zbGF0ZS05NTAgbWF4LWgtWzIwMHB4XSBvdmVyZmxvdy15LWF1dG8gZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDAgZmxleCBmbGV4LWNvbCBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICB7bG9ncy5tYXAoKGxvZykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtsb2cuaWR9IGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwXCI+W3tsb2cudGltZXN0YW1wfV08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDBcIj5be2xvZy5jYXRlZ29yeX1dPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj57bG9nLm1lc3NhZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdoaXN0b3J5JyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtNlwiPlxuICAgICAgICAgICAgICAgIDxFeHBvcnRQYW5lbCBcbiAgICAgICAgICAgICAgICAgIGNhcHR1cmU9e2NhcHR1cmV9IFxuICAgICAgICAgICAgICAgICAgb25DbGVhckNhcHR1cmU9e2hhbmRsZUNsZWFyQ2FwdHVyZX0gXG4gICAgICAgICAgICAgICAgICBvbkFkZERpYWdub3N0aWNMb2c9e2FkZExvZ31cbiAgICAgICAgICAgICAgICAgIG9uU2F2ZUNsb3VkUmVjb3JkPXsocmVjb3JkKSA9PiBzZXRTYXZlZFNjYW5zKHByZXYgPT4gW3JlY29yZCwgLi4ucHJldl0pfVxuICAgICAgICAgICAgICAgICAgc2NhblR5cGU9e3NjYW5UeXBlfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPFVzZXJTY2Fuc0RiVmlld2VyIHNjYW5zPXtzYXZlZFNjYW5zfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdwb3J0YWwnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy00eGwgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgIDxGbHV0dGVyTW9iaWxlSW50ZWdyYXRpb24gLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDwvbWFpbj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBGb290ZXIgKi99XG4gICAgICA8Zm9vdGVyIGNsYXNzTmFtZT1cImJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAgYmctc2xhdGUtOTUwIHB5LTQgcHgtNiB0ZXh0LWNlbnRlciBmb250LW1vbm8gdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTYwMCB6LTIwXCIgaWQ9XCJhcHBfZm9vdGVyX25hdlwiPlxuICAgICAgICA8c3Bhbj5NZWRpYVBpcGUgM0QgRWRnZSBBSSBDYWxpYnJhdGlvbiBIdWIgJmNvcHk7IDIwMjYuIEN1c3RvbSBmb3JtYXR0ZWQgZm9yIEFwcGxlIGlPUyBkZXZpY2VzLjwvc3Bhbj5cbiAgICAgIDwvZm9vdGVyPlxuXG4gICAgICB7LyogQWN0aXZlIExvb3QvUmV3YXJkIHBvcHVwIG1vZGFsICovfVxuICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAge2FjdGl2ZVJld2FyZCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLXNsYXRlLTk1MC84MCBiYWNrZHJvcC1ibHVyLW1kIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00XCIgaWQ9XCJyZXdhcmRfbW9kYWxfb3ZlcmxheVwiPlxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBzY2FsZTogMC45LCBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IDEsIG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgICAgZXhpdD17eyBzY2FsZTogMC45LCBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLWIgZnJvbS1zbGF0ZS05MDAgdG8tc2xhdGUtOTUwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzQwIHJvdW5kZWQtMnhsIG1heC13LXNtIHctZnVsbCBwLTYgdGV4dC1jZW50ZXIgc2hhZG93LTJ4bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIlxuICAgICAgICAgICAgICBpZD1cInJld2FyZF9tb2RhbF9jYXJkXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIHctNDggaC00OCBiZy1hbWJlci01MDAvMTAgYmx1ci1bNjBweF0gcm91bmRlZC1mdWxsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gZm9udC1ib2xkIHRleHQtYW1iZXItNDAwIHRyYWNraW5nLXdpZGVyIHVwcGVyY2FzZSBtYi0xXCI+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVJld2FyZC50aXRsZX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LTM2IGgtMzYgbXgtYXV0byBteS02IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MCByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgYm9yZGVyLWFtYmVyLTUwMC8yMCBzaGFkb3ctWzBfMF8zMHB4X3JnYmEoMjQ1LDE1OCwxMSwwLjE1KV0gb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVtyYWRpYWwtZ3JhZGllbnQoY2lyY2xlX2F0X2NlbnRlcixyZ2JhKDI0NSwxNTgsMTEsMC4wNilfMCUsdHJhbnNwYXJlbnRfNzAlKV1cIiAvPlxuXG4gICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHJvdGF0ZVk6IDM2MCB9fVxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogNiwgZWFzZTogJ2xpbmVhcicgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMjAgaC0yMCBiZy1ncmFkaWVudC10by10ciBmcm9tLWFtYmVyLTUwMCB2aWEteWVsbG93LTMwMCB0by1hbWJlci02MDAgcm91bmRlZC0yeGwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIHNoYWRvdy1hbWJlci01MDAvMjAgcmVsYXRpdmUgYm9yZGVyIGJvcmRlci15ZWxsb3ctMjAwLzUwXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybVN0eWxlOiAncHJlc2VydmUtM2QnIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLWJsIGZyb20tYW1iZXItNjAwIHRvLWFtYmVyLTQwMCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXllbGxvdy0yMDAvMjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiBzdHlsZT17eyBiYWNrZmFjZVZpc2liaWxpdHk6ICdoaWRkZW4nLCB0cmFuc2Zvcm06ICdyb3RhdGVZKDE4MGRlZyknIH19PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOXB4XSBmb250LWJsYWNrIHRleHQtc2xhdGUtOTUwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlc3RcIj5CVcWBQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIiBzdHlsZT17eyBiYWNrZmFjZVZpc2liaWxpdHk6ICdoaWRkZW4nIH19PlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LXNsYXRlLTk1MFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs4cHhdIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05NTAgdXBwZXJjYXNlIHRyYWNraW5nLXRpZ2h0IG10LTFcIj5TTEFZITwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMS41IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWRhc2hlZCBib3JkZXItYW1iZXItNTAwLzMwIGFuaW1hdGUtc3BpblwiIHN0eWxlPXt7IGFuaW1hdGlvbkR1cmF0aW9uOiAnMTJzJyB9fSAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtNCByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1kb3VibGUgYm9yZGVyLWFtYmVyLTUwMC8xMCBhbmltYXRlLXNwaW5cIiBzdHlsZT17eyBhbmltYXRpb25EdXJhdGlvbjogJzI0cycsIGFuaW1hdGlvbkRpcmVjdGlvbjogJ3JldmVyc2UnIH19IC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC1sZyBmb250LWJsYWNrIHRleHQtc2xhdGUtMTAwIHRyYWNraW5nLXRpZ2h0IG1iLTJcIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlUmV3YXJkLmJhZGdlTmFtZX1cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zYW5zIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZCBweC00IG1iLTZcIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlUmV3YXJkLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGBacm9iacWCZW0gR2xvdy11cCBDaGVjayB3IGtsdWJpZSBjaG9taWthIHogQnXFgsSFIGkgemRvYnnFgmVtIG9kem5ha8SZOiAke2FjdGl2ZVJld2FyZC5iYWRnZU5hbWV9IWApO1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIlNsYXkhIFNrb3Bpb3dhbm8gbGluayBkbyBUd29pY2ggU3RhdHPDs3cgZG8gc2Nob3drYSEgV3nFm2xpaiBnbyB6bmFqb215bSBuYSBzb2NpYWwgbWVkaWEhIOKcqFwiKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTUwMCB0by15ZWxsb3ctNTAwIGhvdmVyOmZyb20tYW1iZXItNjAwIGhvdmVyOnRvLXllbGxvdy02MDAgdGV4dC1zbGF0ZS05NTAgZm9udC1zYW5zIGZvbnQtYm9sZCB0ZXh0LXhzIHB5LTIuNSBweC00IHJvdW5kZWQteGwgc2hhZG93LWxnIHNoYWRvdy1hbWJlci01MDAvMTAgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgYWN0aXZlOnNjYWxlLTk1IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5VRE9TVMSYUE5JSiBTVEFUU1kgTkEgU09DSUFMIE1FRElBPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlUmV3YXJkKG51bGwpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAgZm9udC1tb25vIHRleHQtWzEwcHhdIHB5LTIgcHgtNCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBXUsOTxIYgRE8gS0xVQlVcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAge2lzVHJhbnNpdGlvbmluZyAmJiAoXG4gICAgICAgICAgPFRyYW5zaXRpb25PdmVybGF5XG4gICAgICAgICAgICBpc1Zpc2libGU9e3RydWV9XG4gICAgICAgICAgICBvbkNvbXBsZXRlPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldElzVHJhbnNpdGlvbmluZyhmYWxzZSk7XG4gICAgICAgICAgICAgIHNldEFwcFN0YXRlSW50ZXJuYWwoQXBwU3RhdGUucXVhbnR1bSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L0FuaW1hdGVQcmVzZW5jZT5cblxuICAgIDwvZGl2PlxuICApO1xufVxuXG4iXSwibWFwcGluZ3MiOiJBQW9yQlUsU0FnREksVUFoREo7QUFwckJWO0FBQUE7QUFBQTtBQUFBO0FBS0EsU0FBZ0IsVUFBVSxXQUFXLGNBQWM7QUFDbkQsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyx5QkFBeUI7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