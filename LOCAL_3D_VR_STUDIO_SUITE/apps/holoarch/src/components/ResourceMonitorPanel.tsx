const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/holoarch/node_modules/.vite/deps/react.js?v=50682de0";
import { Activity, Cpu, Database, Gauge, Grid, Layers, Minimize2, Radar, Smartphone, Sparkles, Zap } from "/apps/holoarch/node_modules/.vite/deps/lucide-react.js?v=50682de0";
var _jsxFileName = "/app/applet/src/components/ResourceMonitorPanel.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/holoarch/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=50682de0";
export function calculateMobileARTelemetry(config, jitter) {
	// 1. Hardware capability multipliers by mobile device profile
	const deviceSpecs = {
		"iPhone 16 Pro (A18 Pro + LiDAR)": {
			maxFps: 60,
			gpuPower: 1,
			baseRamMb: 195
		},
		"Samsung S24 Ultra (Snapdragon 8 Gen 3)": {
			maxFps: 60,
			gpuPower: .96,
			baseRamMb: 210
		},
		"iPad Pro M4 (LiDAR + 120Hz ProMotion)": {
			maxFps: 120,
			gpuPower: 1.42,
			baseRamMb: 225
		},
		"Smartfon ARCore Mid-Range (Snapdragon 7s)": {
			maxFps: 60,
			gpuPower: .62,
			baseRamMb: 180
		}
	};
	const spec = deviceSpecs[config.mobileDeviceProfile];
	// 2. Hologram Mesh Density + Building Count (2-5 per group) + Floor Count (20-140)
	const meshFactor = config.hologramMeshDensity;
	const groupCountRatio = config.buildingsPerGroup / 3;
	const floorCountRatio = config.buildingFloorCount / 80;
	const styleMultiplier = config.hologramStyle === "Diagrid Exoskeleton + Rdzeń BIM" ? 1.18 : config.hologramStyle === "Złoto-Błękitna Matryca Solarna" ? 1.25 : .92;
	const explodedDrawCallPenalty = config.explodedView > .05 ? 28 : 0;
	const hudDrawCalls = config.showFloatingHudPanels ? 22 : 0;
	const meshDrawCalls = Math.round((68 * meshFactor * groupCountRatio * (.6 + .4 * floorCountRatio) + explodedDrawCallPenalty) * styleMultiplier);
	const trianglesK = Math.round(145 * Math.pow(meshFactor, 1.55) * groupCountRatio * (.55 + .45 * floorCountRatio) * styleMultiplier + (config.showFloatingHudPanels ? 18 : 0));
	const verticesK = Math.round(trianglesK * .64);
	const meshGpuMs = 3.6 * Math.pow(meshFactor, 1.4) * groupCountRatio * (.65 + .35 * floorCountRatio) * styleMultiplier / spec.gpuPower;
	const meshMemoryMb = Math.round(46 * Math.pow(meshFactor, 1.45) * groupCountRatio * (.6 + .4 * floorCountRatio) * styleMultiplier);
	// 3. Window Particle Effects Cost (VFX Graph / Overdraw / Room Window Span)
	const particleModeCost = {
		"Cząsteczki Atmosferyczne + Ruch Powietrzny": {
			gpuMs: 2.9,
			drawCalls: 26,
			memMb: 42
		},
		"Złoty Pył Świetlny + Smugi Wolumetryczne": {
			gpuMs: 4.6,
			drawCalls: 38,
			memMb: 64
		},
		"Cyber-Deszcz + Strumienie Danych Za Oknem": {
			gpuMs: 3.8,
			drawCalls: 32,
			memMb: 54
		}
	};
	const pSpec = particleModeCost[config.windowParticles];
	const pDensity = config.windowParticleDensity;
	const vfxGpuMs = pSpec.gpuMs * Math.pow(pDensity, 1.35) / spec.gpuPower;
	const vfxDrawCalls = Math.round(pSpec.drawCalls * (.5 + pDensity * .55));
	const vfxMemoryMb = Math.round(pSpec.memMb * (.45 + pDensity * .6));
	// 4. ARKit / ARCore Depth Sensor, Tabletop Area & Room Floor Spatial Mesh Cost
	const tableAreaRatio = config.tableWidthMeters * config.tableDepthMeters / (3.9 * 1.95);
	const roomAreaRatio = config.roomWidthMeters * config.roomDepthMeters / (14 * 12);
	const pipelineOverheadMs = config.renderPipeline === "Unity HDRP (High Definition)" ? 4.8 : 1.6;
	const occlusionOverheadMs = config.occlusionMode === "Głębia Środowiskowa (Environment Depth)" && config.showOcclusionObjects ? 2.2 : config.occlusionMode === "Maska Stencil (Meble i Filary)" && config.showOcclusionObjects ? 1.1 : .2;
	const planeOverheadMs = (config.planeDetection === "Pełna siatka głębi LiDAR (Scene Mesh)" ? 2.1 : config.planeDetection === "Blat stołu + Podłoga (Dual Horizontal)" ? 1.2 : .65) * (.65 + .35 * roomAreaRatio);
	const arSubsystemsMs = (pipelineOverheadMs + occlusionOverheadMs + (config.showDepthGrid ? planeOverheadMs : .4)) / spec.gpuPower;
	const arDepthMemoryMb = Math.round((config.planeDetection === "Pełna siatka głębi LiDAR (Scene Mesh)" ? 68 : 38) * (.6 + .2 * tableAreaRatio + .2 * roomAreaRatio) + (config.occlusionMode === "Głębia Środowiskowa (Environment Depth)" ? 34 : 12) + (config.renderPipeline === "Unity HDRP (High Definition)" ? 85 : 0));
	// 5. Real-Time Building Shadow Mapping Cost (PCF Soft Shadows on Virtual Floor & Tabletop)
	const shadowQualityFactor = !config.enableBuildingShadows ? 0 : config.shadowMapQuality === "Ultra (4096×4096 · Studio BIM)" ? 2.25 : config.shadowMapQuality === "Wysoka (2048×2048 · Crisp PCF)" ? 1.25 : config.shadowMapQuality === "Średnia (1024×1024 · Standard AR)" ? .75 : .4;
	const shadowGpuMs = 1.45 * shadowQualityFactor * groupCountRatio / spec.gpuPower;
	const shadowDrawCalls = config.enableBuildingShadows ? Math.round(18 * groupCountRatio * (.65 + .35 * shadowQualityFactor)) : 0;
	const shadowVramMb = !config.enableBuildingShadows ? 0 : config.shadowMapQuality === "Ultra (4096×4096 · Studio BIM)" ? 64 : config.shadowMapQuality === "Wysoka (2048×2048 · Crisp PCF)" ? 16 : config.shadowMapQuality === "Średnia (1024×1024 · Standard AR)" ? 4 : 1;
	// Total Frame Time & FPS
	const rawFrameTimeMs = 2.4 + meshGpuMs + vfxGpuMs + arSubsystemsMs + shadowGpuMs + jitter * .35;
	const minFrameTimeMs = 1e3 / spec.maxFps;
	const frameTimeMs = Math.max(minFrameTimeMs, rawFrameTimeMs);
	const fps = Math.min(spec.maxFps, Math.max(14, Math.round(1e3 / frameTimeMs)));
	const drawCalls = 24 + meshDrawCalls + vfxDrawCalls + hudDrawCalls + shadowDrawCalls + (config.showDepthGrid ? 14 : 0) + (config.showOcclusionObjects ? 12 : 0);
	const srpBatches = Math.max(12, Math.round(drawCalls * .38));
	const totalMemoryMb = spec.baseRamMb + meshMemoryMb + vfxMemoryMb + arDepthMemoryMb + shadowVramMb;
	const totalDynamicMs = meshGpuMs + vfxGpuMs + arSubsystemsMs + shadowGpuMs;
	const meshCostPct = Math.round((meshGpuMs + shadowGpuMs) / totalDynamicMs * 100);
	const vfxCostPct = Math.round(vfxGpuMs / totalDynamicMs * 100);
	const arSubsystemsCostPct = Math.max(0, 100 - meshCostPct - vfxCostPct);
	let statusLabel = "Optymalny (60+ FPS)";
	let statusTone = "emerald";
	if (fps < 36) {
		statusLabel = "Throttling GPU (<35 FPS)";
		statusTone = "rose";
	} else if (fps < 52) {
		statusLabel = "Wysokie obciążenie";
		statusTone = "amber";
	}
	return {
		fps,
		maxTargetFps: spec.maxFps,
		frameTimeMs: Number(frameTimeMs.toFixed(1)),
		gpuTimeMs: Number((meshGpuMs + vfxGpuMs).toFixed(1)),
		cpuArTimeMs: Number(arSubsystemsMs.toFixed(1)),
		drawCalls,
		srpBatches,
		trianglesK,
		verticesK,
		totalMemoryMb,
		meshMemoryMb,
		vfxMemoryMb,
		arDepthMemoryMb,
		meshCostPct,
		vfxCostPct,
		arSubsystemsCostPct,
		statusLabel,
		statusTone
	};
}
export const ResourceMonitorPanel = ({ config, liveMetrics, onUpdateConfig }) => {
	const [jitter, setJitter] = useState(0);
	const [fpsHistory, setFpsHistory] = useState(() => Array(32).fill(58));
	const telemetry = useMemo(() => calculateMobileARTelemetry(config, jitter), [config, jitter]);
	useEffect(() => {
		const interval = window.setInterval(() => {
			const nextJitter = (Math.random() - .5) * 1.4;
			setJitter(nextJitter);
			setFpsHistory((prev) => {
				const current = calculateMobileARTelemetry(config, nextJitter).fps;
				return [...prev.slice(1), current];
			});
		}, 450);
		return () => clearInterval(interval);
	}, [config]);
	const getMeshLodLabel = (density) => {
		if (density <= .65) return "LOD 200 (Niska)";
		if (density <= 1.15) return "LOD 300 (Średnia)";
		if (density <= 1.6) return "LOD 400 (Wysoka)";
		return "LOD 500 (Ultra BIM)";
	};
	const sparklinePoints = useMemo(() => {
		const width = 280;
		const height = 42;
		const maxVal = telemetry.maxTargetFps;
		return fpsHistory.map((val, idx) => {
			const x = idx / (fpsHistory.length - 1) * width;
			const clamped = Math.min(maxVal, Math.max(10, val));
			const y = height - (clamped - 10) / (maxVal - 10) * (height - 8) - 4;
			return `${x.toFixed(1)},${y.toFixed(1)}`;
		}).join(" ");
	}, [fpsHistory, telemetry.maxTargetFps]);
	const handleToggleDepthGrid = () => {
		const nextShow = !config.showDepthGrid;
		onUpdateConfig({
			showDepthGrid: nextShow,
			...nextShow ? { triggerScanPulse: Date.now() } : {}
		});
	};
	if (!config.showResourceMonitor) {
		return /* @__PURE__ */ _jsxDEV("div", {
			className: "absolute top-4 right-6 z-10 pointer-events-auto flex items-center gap-2",
			children: [/* @__PURE__ */ _jsxDEV("button", {
				type: "button",
				onClick: handleToggleDepthGrid,
				className: `px-3 py-2 text-xs font-semibold rounded-xl shadow-xl border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${config.showDepthGrid ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-200 hover:border-emerald-400" : "bg-[#091220]/95 border-slate-700 text-slate-300 hover:border-sky-400"}`,
				title: "Przełącz wizualizację siatki detekcji płaszczyzn LiDAR (showDepthGrid)",
				children: [
					/* @__PURE__ */ _jsxDEV(Grid, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 366,
						columnNumber: 11
					}, this),
					"Siatka LiDAR: ",
					config.showDepthGrid ? "WŁ." : "WYŁ."
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 356,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("button", {
				type: "button",
				onClick: () => onUpdateConfig({ showResourceMonitor: true }),
				className: "px-3.5 py-2 text-xs font-semibold text-slate-100 bg-[#091220]/95 border border-slate-700 hover:border-sky-400 rounded-xl shadow-xl transition-colors flex items-center gap-2 whitespace-nowrap shrink-0",
				children: [
					/* @__PURE__ */ _jsxDEV(Activity, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 375,
						columnNumber: 11
					}, this),
					"Pokaż Profiler Zasobów AR (",
					telemetry.fps,
					" FPS · ",
					telemetry.drawCalls,
					" DC)"
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 370,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 355,
			columnNumber: 7
		}, this);
	}
	return /* @__PURE__ */ _jsxDEV("aside", {
		"aria-label": "Panel monitorowania zasobów urządzenia mobilnego AR",
		className: "absolute top-4 right-6 z-10 w-[364px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-7.5rem)] overflow-y-auto pointer-events-auto bg-[#091220]/95 border border-slate-800 rounded-xl shadow-2xl p-4 space-y-3",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center justify-between gap-2 border-b border-slate-800/90 pb-2.5",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV(Gauge, { className: "w-4 h-4 text-sky-400 shrink-0" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 390,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-xs font-bold text-slate-100 tracking-tight",
						children: "Monitor Zasobów Mobilnych AR"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 392,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-[11px] text-slate-400 font-mono tabular-nums",
						children: [
							config.buildingsPerGroup * 3,
							" budynków · ",
							config.buildingFloorCount,
							" pięter · Blat ",
							config.tableWidthMeters.toFixed(1),
							"m"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 395,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 391,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 389,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV("span", {
						className: `text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${telemetry.statusTone === "emerald" ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300" : telemetry.statusTone === "amber" ? "bg-amber-950/60 border-amber-500/40 text-amber-300" : "bg-rose-950/60 border-rose-500/40 text-rose-300"}`,
						children: telemetry.statusLabel
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 402,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => onUpdateConfig({ showResourceMonitor: false }),
						className: "p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors",
						title: "Zwiń monitor zasobów",
						"aria-label": "Zwiń monitor zasobów",
						children: /* @__PURE__ */ _jsxDEV(Minimize2, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 420,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 413,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 401,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 388,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
				className: "flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1",
				children: [/* @__PURE__ */ _jsxDEV("span", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ _jsxDEV(Smartphone, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 429,
						columnNumber: 13
					}, this), "Profil Urządzenia Mobilnego"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 428,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: "font-mono tabular-nums text-slate-400",
					children: [
						"Cel: ",
						telemetry.maxTargetFps,
						" Hz"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 432,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 427,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("select", {
				value: config.mobileDeviceProfile,
				onChange: (e) => onUpdateConfig({ mobileDeviceProfile: e.target.value }),
				className: "w-full bg-[#050b14] border border-slate-700/90 rounded-lg px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
				children: [
					/* @__PURE__ */ _jsxDEV("option", {
						value: "iPhone 16 Pro (A18 Pro + LiDAR)",
						children: "iPhone 16 Pro (A18 Pro + LiDAR)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 445,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("option", {
						value: "Samsung S24 Ultra (Snapdragon 8 Gen 3)",
						children: "Samsung S24 Ultra (Snapdragon 8 Gen 3)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 448,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("option", {
						value: "iPad Pro M4 (LiDAR + 120Hz ProMotion)",
						children: "iPad Pro M4 (LiDAR + 120Hz ProMotion)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 451,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("option", {
						value: "Smartfon ARCore Mid-Range (Snapdragon 7s)",
						children: "Smartfon ARCore Mid-Range (Snapdragon 7s)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 454,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 436,
				columnNumber: 9
			}, this)] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 426,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-[#060c17] border border-slate-800/90 rounded-lg p-2.5",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] text-slate-400 flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Wydajność" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 465,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV(Activity, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 466,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 464,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: `text-base font-bold font-mono tabular-nums mt-0.5 ${telemetry.statusTone === "emerald" ? "text-emerald-400" : telemetry.statusTone === "amber" ? "text-amber-400" : "text-rose-400"}`,
								children: [
									telemetry.fps,
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-normal",
										children: "FPS"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 477,
										columnNumber: 29
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 468,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] font-mono tabular-nums text-slate-400",
								children: [telemetry.frameTimeMs, " ms/kl."]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 479,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 463,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-[#060c17] border border-slate-800/90 rounded-lg p-2.5",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] text-slate-400 flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Pamięć" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 487,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV(Database, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 488,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 486,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-base font-bold font-mono tabular-nums text-slate-100 mt-0.5",
								children: [
									telemetry.totalMemoryMb,
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-normal text-slate-300",
										children: "MB"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 492,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 490,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] font-mono tabular-nums text-slate-400",
								children: [
									"VRAM: ",
									telemetry.meshMemoryMb + telemetry.vfxMemoryMb,
									" MB"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 494,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 485,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-[#060c17] border border-slate-800/90 rounded-lg p-2.5",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] text-slate-400 flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Draw Calle" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 502,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV(Cpu, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 503,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 501,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-base font-bold font-mono tabular-nums text-sky-300 mt-0.5",
								children: [
									telemetry.drawCalls,
									" ",
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-normal text-slate-400",
										children: "DC"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 507,
										columnNumber: 13
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 505,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "text-[11px] font-mono tabular-nums text-slate-400",
								children: [telemetry.trianglesK, "k Tris"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 509,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 500,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 461,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: `rounded-lg border p-3 space-y-2.5 transition-colors ${config.showDepthGrid ? "bg-emerald-950/25 border-emerald-500/40" : "bg-[#060c17] border-slate-800/90"}`,
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: `w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${config.showDepthGrid ? "bg-emerald-500/20 border-emerald-400/50 text-emerald-300" : "bg-slate-900 border-slate-700 text-slate-400"}`,
								children: /* @__PURE__ */ _jsxDEV(Grid, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 533,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 526,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-[11px] font-bold text-slate-100 truncate",
										children: "Siatka Detekcji Płaszczyzn LiDAR"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 537,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: `text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${config.showDepthGrid ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300" : "bg-slate-800/80 border-slate-700 text-slate-400"}`,
										children: config.showDepthGrid ? "AKTYWNA" : "UKRYTA"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 540,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 536,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "text-[10px] text-slate-400 font-mono truncate",
									children: [
										"Blat ",
										config.tableWidthMeters.toFixed(2),
										"×",
										config.tableDepthMeters.toFixed(2),
										"m + Posadzka",
										" ",
										config.roomWidthMeters.toFixed(0),
										"×",
										config.roomDepthMeters.toFixed(0),
										"m"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 550,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 535,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 525,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							role: "switch",
							"aria-checked": config.showDepthGrid,
							"aria-label": "Przełącz wizualizację siatki detekcji płaszczyzn LiDAR (showDepthGrid)",
							onClick: handleToggleDepthGrid,
							className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${config.showDepthGrid ? "bg-emerald-500" : "bg-slate-700"}`,
							children: /* @__PURE__ */ _jsxDEV("span", { className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${config.showDepthGrid ? "translate-x-5" : "translate-x-0"}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 569,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 559,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 524,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: `w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${config.showDepthGrid ? "bg-sky-500/20 border-sky-400/50 text-sky-300" : "bg-slate-900 border-slate-700 text-slate-400"}`,
								children: /* @__PURE__ */ _jsxDEV(Radar, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 587,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 580,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-[11px] font-bold text-slate-100 truncate",
										children: "Wizualizacja Skanowania LiDAR"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 591,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: `text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${config.showDepthGrid ? "bg-sky-500/20 border-sky-400/40 text-sky-300" : "bg-slate-800/80 border-slate-700 text-slate-400"}`,
										children: config.showDepthGrid ? "WŁ." : "WYŁ."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 594,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 590,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "text-[10px] text-slate-400 font-mono truncate",
									children: "Point Cloud Visualization · 1 048 pkt głębi (showDepthGrid)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 604,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 589,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 579,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							role: "switch",
							"aria-checked": config.showDepthGrid,
							"aria-label": "Wizualizacja Skanowania LiDAR (Point Cloud Visualization - showDepthGrid)",
							onClick: handleToggleDepthGrid,
							className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${config.showDepthGrid ? "bg-sky-400" : "bg-slate-700"}`,
							children: /* @__PURE__ */ _jsxDEV("span", { className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${config.showDepthGrid ? "translate-x-5" : "translate-x-0"}` }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 620,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 610,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 578,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 gap-2 pt-2 border-t border-slate-800/80",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ _jsxDEV("select", {
								value: config.planeDetection,
								onChange: (e) => onUpdateConfig({
									planeDetection: e.target.value,
									showDepthGrid: true,
									triggerScanPulse: Date.now()
								}),
								"aria-label": "Tryb detekcji płaszczyzn LiDAR",
								className: "flex-1 min-w-0 bg-[#050b14] border border-slate-700/90 rounded-md px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-emerald-400",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Blat stołu + Podłoga (Dual Horizontal)",
										children: "Dual Horizontal (Blat + Podłoga)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 643,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Pełna siatka głębi LiDAR (Scene Mesh)",
										children: "Pełna siatka LiDAR (Scene Mesh)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 646,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Tylko blat stołu (Tabletop Anchor)",
										children: "Tylko blat stołu (Tabletop Anchor)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 649,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 631,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => onUpdateConfig({
									showDepthGrid: true,
									triggerScanPulse: Date.now()
								}),
								className: "px-2.5 py-1 text-[11px] font-semibold rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0",
								title: "Wyzwól impuls skanowania głębi LiDAR/ToF w scenie 3D",
								children: [/* @__PURE__ */ _jsxDEV(Radar, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 665,
									columnNumber: 15
								}, this), "Impuls LiDAR"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 654,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 630,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between text-[10px] font-mono tabular-nums text-slate-400",
							children: [/* @__PURE__ */ _jsxDEV("span", { children: [
								"Koszt siatki i chmury pkt:",
								" ",
								/* @__PURE__ */ _jsxDEV("strong", {
									className: "text-emerald-300",
									children: config.showDepthGrid ? "+14 DC" : "0 DC"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 673,
									columnNumber: 15
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 671,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: [
								"Subsystem AR: ",
								/* @__PURE__ */ _jsxDEV("strong", {
									className: "text-slate-200",
									children: [telemetry.cpuArTimeMs, " ms"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 678,
									columnNumber: 29
								}, this),
								" (",
								telemetry.arDepthMemoryMb,
								" MB)"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 677,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 670,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 629,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 516,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-[#060c17] border border-slate-800/90 rounded-lg px-3 py-2",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono tabular-nums",
					children: [/* @__PURE__ */ _jsxDEV("span", { children: [
						"Wykres stabilności klatek (GPU: ",
						telemetry.gpuTimeMs,
						" ms)"
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 687,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("span", { children: [
						"WebGL: ",
						liveMetrics.measuredWebglFps,
						" FPS"
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 688,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 686,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("svg", {
					viewBox: "0 0 280 42",
					className: "w-full h-9 overflow-visible",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ _jsxDEV("line", {
						x1: "0",
						y1: "12",
						x2: "280",
						y2: "12",
						stroke: "rgba(56, 189, 248, 0.2)",
						strokeDasharray: "3 3",
						strokeWidth: "1"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 695,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("polyline", {
						fill: "none",
						stroke: telemetry.statusTone === "emerald" ? "#34d399" : telemetry.statusTone === "amber" ? "#fbbf24" : "#fb7185",
						strokeWidth: "2",
						points: sparklinePoints
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 704,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 690,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 685,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "space-y-2.5 bg-[#060c17] border border-slate-800/90 rounded-lg p-3",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "text-[11px] font-semibold text-slate-200",
						children: "Symulator Wpływu Siatki i Cząsteczek na Wydajność"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 721,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between text-[11px] text-slate-300 mb-1",
						children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 729,
								columnNumber: 15
							}, this), "Gęstość Siatki Hologramu"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 728,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "font-mono tabular-nums text-sky-300",
							children: [
								config.hologramMeshDensity.toFixed(2),
								"x ·",
								" ",
								getMeshLodLabel(config.hologramMeshDensity)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 732,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 727,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("input", {
						type: "range",
						min: .5,
						max: 2,
						step: .05,
						value: config.hologramMeshDensity,
						onChange: (e) => onUpdateConfig({ hologramMeshDensity: parseFloat(e.target.value) }),
						className: "w-full accent-sky-400"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 737,
						columnNumber: 11
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 726,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between text-[11px] text-slate-300 mb-1",
						children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 756,
								columnNumber: 15
							}, this), "Gęstość Cząsteczek Za Oknem"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 755,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "font-mono tabular-nums text-amber-300",
							children: [
								Math.round(config.windowParticleDensity * 100),
								"% (",
								Math.round(900 * (config.windowParticleDensity / 2)),
								" cząst.)"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 759,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 754,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("input", {
						type: "range",
						min: .2,
						max: 2,
						step: .1,
						value: config.windowParticleDensity,
						onChange: (e) => onUpdateConfig({ windowParticleDensity: parseFloat(e.target.value) }),
						className: "w-full accent-amber-400"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 764,
						columnNumber: 11
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 753,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "pt-1 border-t border-slate-800/80",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between text-[11px] text-slate-300 mb-1",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "flex items-center gap-1",
								children: [/* @__PURE__ */ _jsxDEV(Radar, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 783,
									columnNumber: 15
								}, this), "Siła Głębi (Paralaksa AR)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 782,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "font-mono tabular-nums text-emerald-300",
								children: [
									Math.min(1, config.parallaxIntensity).toFixed(2),
									" (",
									Math.round(Math.min(1, config.parallaxIntensity) * 100),
									"%)"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 786,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 781,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .05,
							"aria-label": "Siła Głębi (parallaxIntensity 0.0 - 1.0)",
							value: Math.min(1, config.parallaxIntensity),
							onChange: (e) => onUpdateConfig({ parallaxIntensity: parseFloat(e.target.value) }),
							className: "w-full accent-emerald-400"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 791,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 780,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 720,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "space-y-1.5 text-[11px]",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between text-slate-400",
						children: [/* @__PURE__ */ _jsxDEV("span", { children: "Podział obciążenia GPU i pamięci" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 811,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "font-mono tabular-nums",
							children: [
								"SRP Batcher: ",
								telemetry.srpBatches,
								" grup"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 812,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 810,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "w-full h-2 bg-slate-900 rounded-full overflow-hidden flex",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								style: { width: `${telemetry.meshCostPct}%` },
								className: "bg-sky-400 h-full",
								title: "Siatka BIM Hologramu"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 818,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								style: { width: `${telemetry.vfxCostPct}%` },
								className: "bg-amber-400 h-full",
								title: "Efekty Cząsteczkowe Za Oknem"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 823,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								style: { width: `${telemetry.arSubsystemsCostPct}%` },
								className: "bg-emerald-400 h-full",
								title: "Czujniki Głębi LiDAR i Okluzja"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 828,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 817,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-3 gap-1 pt-0.5 font-mono tabular-nums text-[10px] text-slate-300",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-sky-400",
									children: "■"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 837,
									columnNumber: 13
								}, this),
								" Siatka: ",
								telemetry.meshCostPct,
								"% (",
								telemetry.meshMemoryMb,
								"MB)"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 836,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-amber-400",
									children: "■"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 841,
									columnNumber: 13
								}, this),
								" VFX: ",
								telemetry.vfxCostPct,
								"% (",
								telemetry.vfxMemoryMb,
								"MB)"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 840,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-emerald-400",
									children: "■"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 845,
									columnNumber: 13
								}, this),
								" AR/Głębia:",
								" ",
								telemetry.arSubsystemsCostPct,
								"%"
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 844,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 835,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 809,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("button", {
				type: "button",
				onClick: () => onUpdateConfig({
					hologramMeshDensity: .85,
					windowParticleDensity: .7,
					renderPipeline: "Unity URP (Universal Render Pipeline)",
					windowParticles: "Cząsteczki Atmosferyczne + Ruch Powietrzny"
				}),
				className: "w-full py-1.5 px-3 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0",
				children: [/* @__PURE__ */ _jsxDEV(Zap, { className: "w-3.5 h-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 864,
					columnNumber: 9
				}, this), "Optymalizuj pod stabilne 60 FPS (Mobile URP)"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 852,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 383,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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S0FDckIsdUJBQXVCO0tBQ3ZCLGdCQUFnQjtLQUNoQixpQkFBaUI7SUFDbkIsQ0FBQztJQUVILFdBQVU7Y0FWWixDQVlFLHdCQUFDLEtBQUQsRUFBSyxXQUFVLGNBQWU7Ozs7Y0FBQyw4Q0FFekI7Ozs7OztFQUNIOzs7Ozs7QUFFWCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJSZXNvdXJjZU1vbml0b3JQYW5lbC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBBY3Rpdml0eSxcbiAgQ3B1LFxuICBEYXRhYmFzZSxcbiAgR2F1Z2UsXG4gIEdyaWQsXG4gIExheWVycyxcbiAgTWluaW1pemUyLFxuICBSYWRhcixcbiAgU21hcnRwaG9uZSxcbiAgU3BhcmtsZXMsXG4gIFphcCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7XG4gIEFSU3R1ZGlvQ29uZmlnLFxuICBMaXZlUmVuZGVyZXJNZXRyaWNzLFxuICBNb2JpbGVEZXZpY2VQcm9maWxlT3B0aW9uLFxuICBQbGFuZURldGVjdGlvbk9wdGlvbixcbiAgV2luZG93UGFydGljbGVzT3B0aW9uLFxufSBmcm9tICcuLi90eXBlcy9hclN0dWRpbyc7XG5cbmludGVyZmFjZSBSZXNvdXJjZU1vbml0b3JQYW5lbFByb3BzIHtcbiAgY29uZmlnOiBBUlN0dWRpb0NvbmZpZztcbiAgbGl2ZU1ldHJpY3M6IExpdmVSZW5kZXJlck1ldHJpY3M7XG4gIG9uVXBkYXRlQ29uZmlnOiAocGFydGlhbDogUGFydGlhbDxBUlN0dWRpb0NvbmZpZz4pID0+IHZvaWQ7XG59XG5cbmludGVyZmFjZSBTaW11bGF0ZWRNb2JpbGVUZWxlbWV0cnkge1xuICBmcHM6IG51bWJlcjtcbiAgbWF4VGFyZ2V0RnBzOiBudW1iZXI7XG4gIGZyYW1lVGltZU1zOiBudW1iZXI7XG4gIGdwdVRpbWVNczogbnVtYmVyO1xuICBjcHVBclRpbWVNczogbnVtYmVyO1xuICBkcmF3Q2FsbHM6IG51bWJlcjtcbiAgc3JwQmF0Y2hlczogbnVtYmVyO1xuICB0cmlhbmdsZXNLOiBudW1iZXI7XG4gIHZlcnRpY2VzSzogbnVtYmVyO1xuICB0b3RhbE1lbW9yeU1iOiBudW1iZXI7XG4gIG1lc2hNZW1vcnlNYjogbnVtYmVyO1xuICB2ZnhNZW1vcnlNYjogbnVtYmVyO1xuICBhckRlcHRoTWVtb3J5TWI6IG51bWJlcjtcbiAgbWVzaENvc3RQY3Q6IG51bWJlcjtcbiAgdmZ4Q29zdFBjdDogbnVtYmVyO1xuICBhclN1YnN5c3RlbXNDb3N0UGN0OiBudW1iZXI7XG4gIHN0YXR1c0xhYmVsOlxuICAgIHwgJ09wdHltYWxueSAoNjArIEZQUyknXG4gICAgfCAnV3lzb2tpZSBvYmNpxIXFvGVuaWUnXG4gICAgfCAnVGhyb3R0bGluZyBHUFUgKDwzNSBGUFMpJztcbiAgc3RhdHVzVG9uZTogJ2VtZXJhbGQnIHwgJ2FtYmVyJyB8ICdyb3NlJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZU1vYmlsZUFSVGVsZW1ldHJ5KFxuICBjb25maWc6IEFSU3R1ZGlvQ29uZmlnLFxuICBqaXR0ZXI6IG51bWJlclxuKTogU2ltdWxhdGVkTW9iaWxlVGVsZW1ldHJ5IHtcbiAgLy8gMS4gSGFyZHdhcmUgY2FwYWJpbGl0eSBtdWx0aXBsaWVycyBieSBtb2JpbGUgZGV2aWNlIHByb2ZpbGVcbiAgY29uc3QgZGV2aWNlU3BlY3M6IFJlY29yZDxcbiAgICBNb2JpbGVEZXZpY2VQcm9maWxlT3B0aW9uLFxuICAgIHsgbWF4RnBzOiBudW1iZXI7IGdwdVBvd2VyOiBudW1iZXI7IGJhc2VSYW1NYjogbnVtYmVyIH1cbiAgPiA9IHtcbiAgICAnaVBob25lIDE2IFBybyAoQTE4IFBybyArIExpREFSKSc6IHtcbiAgICAgIG1heEZwczogNjAsXG4gICAgICBncHVQb3dlcjogMS4wLFxuICAgICAgYmFzZVJhbU1iOiAxOTUsXG4gICAgfSxcbiAgICAnU2Ftc3VuZyBTMjQgVWx0cmEgKFNuYXBkcmFnb24gOCBHZW4gMyknOiB7XG4gICAgICBtYXhGcHM6IDYwLFxuICAgICAgZ3B1UG93ZXI6IDAuOTYsXG4gICAgICBiYXNlUmFtTWI6IDIxMCxcbiAgICB9LFxuICAgICdpUGFkIFBybyBNNCAoTGlEQVIgKyAxMjBIeiBQcm9Nb3Rpb24pJzoge1xuICAgICAgbWF4RnBzOiAxMjAsXG4gICAgICBncHVQb3dlcjogMS40MixcbiAgICAgIGJhc2VSYW1NYjogMjI1LFxuICAgIH0sXG4gICAgJ1NtYXJ0Zm9uIEFSQ29yZSBNaWQtUmFuZ2UgKFNuYXBkcmFnb24gN3MpJzoge1xuICAgICAgbWF4RnBzOiA2MCxcbiAgICAgIGdwdVBvd2VyOiAwLjYyLFxuICAgICAgYmFzZVJhbU1iOiAxODAsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBzcGVjID0gZGV2aWNlU3BlY3NbY29uZmlnLm1vYmlsZURldmljZVByb2ZpbGVdO1xuXG4gIC8vIDIuIEhvbG9ncmFtIE1lc2ggRGVuc2l0eSArIEJ1aWxkaW5nIENvdW50ICgyLTUgcGVyIGdyb3VwKSArIEZsb29yIENvdW50ICgyMC0xNDApXG4gIGNvbnN0IG1lc2hGYWN0b3IgPSBjb25maWcuaG9sb2dyYW1NZXNoRGVuc2l0eTsgLy8gMC41IC4uIDIuMFxuICBjb25zdCBncm91cENvdW50UmF0aW8gPSBjb25maWcuYnVpbGRpbmdzUGVyR3JvdXAgLyAzLjA7IC8vIGJhc2VsaW5lIGlzIDMgYnVpbGRpbmdzIHBlciBncm91cFxuICBjb25zdCBmbG9vckNvdW50UmF0aW8gPSBjb25maWcuYnVpbGRpbmdGbG9vckNvdW50IC8gODAuMDsgLy8gYmFzZWxpbmUgaXMgODAgZmxvb3JzXG5cbiAgY29uc3Qgc3R5bGVNdWx0aXBsaWVyID1cbiAgICBjb25maWcuaG9sb2dyYW1TdHlsZSA9PT0gJ0RpYWdyaWQgRXhvc2tlbGV0b24gKyBSZHplxYQgQklNJ1xuICAgICAgPyAxLjE4XG4gICAgICA6IGNvbmZpZy5ob2xvZ3JhbVN0eWxlID09PSAnWsWCb3RvLULFgsSZa2l0bmEgTWF0cnljYSBTb2xhcm5hJ1xuICAgICAgPyAxLjI1XG4gICAgICA6IDAuOTI7XG5cbiAgY29uc3QgZXhwbG9kZWREcmF3Q2FsbFBlbmFsdHkgPSBjb25maWcuZXhwbG9kZWRWaWV3ID4gMC4wNSA/IDI4IDogMDtcbiAgY29uc3QgaHVkRHJhd0NhbGxzID0gY29uZmlnLnNob3dGbG9hdGluZ0h1ZFBhbmVscyA/IDIyIDogMDtcblxuICBjb25zdCBtZXNoRHJhd0NhbGxzID0gTWF0aC5yb3VuZChcbiAgICAoNjggKiBtZXNoRmFjdG9yICogZ3JvdXBDb3VudFJhdGlvICogKDAuNiArIDAuNCAqIGZsb29yQ291bnRSYXRpbykgK1xuICAgICAgZXhwbG9kZWREcmF3Q2FsbFBlbmFsdHkpICpcbiAgICAgIHN0eWxlTXVsdGlwbGllclxuICApO1xuICBjb25zdCB0cmlhbmdsZXNLID0gTWF0aC5yb3VuZChcbiAgICAxNDUgKlxuICAgICAgTWF0aC5wb3cobWVzaEZhY3RvciwgMS41NSkgKlxuICAgICAgZ3JvdXBDb3VudFJhdGlvICpcbiAgICAgICgwLjU1ICsgMC40NSAqIGZsb29yQ291bnRSYXRpbykgKlxuICAgICAgc3R5bGVNdWx0aXBsaWVyICtcbiAgICAgIChjb25maWcuc2hvd0Zsb2F0aW5nSHVkUGFuZWxzID8gMTggOiAwKVxuICApO1xuICBjb25zdCB2ZXJ0aWNlc0sgPSBNYXRoLnJvdW5kKHRyaWFuZ2xlc0sgKiAwLjY0KTtcbiAgY29uc3QgbWVzaEdwdU1zID1cbiAgICAoMy42ICpcbiAgICAgIE1hdGgucG93KG1lc2hGYWN0b3IsIDEuNCkgKlxuICAgICAgZ3JvdXBDb3VudFJhdGlvICpcbiAgICAgICgwLjY1ICsgMC4zNSAqIGZsb29yQ291bnRSYXRpbykgKlxuICAgICAgc3R5bGVNdWx0aXBsaWVyKSAvXG4gICAgc3BlYy5ncHVQb3dlcjtcbiAgY29uc3QgbWVzaE1lbW9yeU1iID0gTWF0aC5yb3VuZChcbiAgICA0NiAqXG4gICAgICBNYXRoLnBvdyhtZXNoRmFjdG9yLCAxLjQ1KSAqXG4gICAgICBncm91cENvdW50UmF0aW8gKlxuICAgICAgKDAuNiArIDAuNCAqIGZsb29yQ291bnRSYXRpbykgKlxuICAgICAgc3R5bGVNdWx0aXBsaWVyXG4gICk7XG5cbiAgLy8gMy4gV2luZG93IFBhcnRpY2xlIEVmZmVjdHMgQ29zdCAoVkZYIEdyYXBoIC8gT3ZlcmRyYXcgLyBSb29tIFdpbmRvdyBTcGFuKVxuICBjb25zdCBwYXJ0aWNsZU1vZGVDb3N0OiBSZWNvcmQ8XG4gICAgV2luZG93UGFydGljbGVzT3B0aW9uLFxuICAgIHsgZ3B1TXM6IG51bWJlcjsgZHJhd0NhbGxzOiBudW1iZXI7IG1lbU1iOiBudW1iZXIgfVxuICA+ID0ge1xuICAgICdDesSFc3RlY3praSBBdG1vc2Zlcnljem5lICsgUnVjaCBQb3dpZXRyem55Jzoge1xuICAgICAgZ3B1TXM6IDIuOSxcbiAgICAgIGRyYXdDYWxsczogMjYsXG4gICAgICBtZW1NYjogNDIsXG4gICAgfSxcbiAgICAnWsWCb3R5IFB5xYIgxZp3aWV0bG55ICsgU211Z2kgV29sdW1ldHJ5Y3puZSc6IHtcbiAgICAgIGdwdU1zOiA0LjYsXG4gICAgICBkcmF3Q2FsbHM6IDM4LFxuICAgICAgbWVtTWI6IDY0LFxuICAgIH0sXG4gICAgJ0N5YmVyLURlc3pjeiArIFN0cnVtaWVuaWUgRGFueWNoIFphIE9rbmVtJzoge1xuICAgICAgZ3B1TXM6IDMuOCxcbiAgICAgIGRyYXdDYWxsczogMzIsXG4gICAgICBtZW1NYjogNTQsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBwU3BlYyA9IHBhcnRpY2xlTW9kZUNvc3RbY29uZmlnLndpbmRvd1BhcnRpY2xlc107XG4gIGNvbnN0IHBEZW5zaXR5ID0gY29uZmlnLndpbmRvd1BhcnRpY2xlRGVuc2l0eTsgLy8gMC4yIC4uIDIuMFxuICBjb25zdCB2ZnhHcHVNcyA9IChwU3BlYy5ncHVNcyAqIE1hdGgucG93KHBEZW5zaXR5LCAxLjM1KSkgLyBzcGVjLmdwdVBvd2VyO1xuICBjb25zdCB2ZnhEcmF3Q2FsbHMgPSBNYXRoLnJvdW5kKHBTcGVjLmRyYXdDYWxscyAqICgwLjUgKyBwRGVuc2l0eSAqIDAuNTUpKTtcbiAgY29uc3QgdmZ4TWVtb3J5TWIgPSBNYXRoLnJvdW5kKHBTcGVjLm1lbU1iICogKDAuNDUgKyBwRGVuc2l0eSAqIDAuNikpO1xuXG4gIC8vIDQuIEFSS2l0IC8gQVJDb3JlIERlcHRoIFNlbnNvciwgVGFibGV0b3AgQXJlYSAmIFJvb20gRmxvb3IgU3BhdGlhbCBNZXNoIENvc3RcbiAgY29uc3QgdGFibGVBcmVhUmF0aW8gPVxuICAgIChjb25maWcudGFibGVXaWR0aE1ldGVycyAqIGNvbmZpZy50YWJsZURlcHRoTWV0ZXJzKSAvICgzLjkgKiAxLjk1KTtcbiAgY29uc3Qgcm9vbUFyZWFSYXRpbyA9XG4gICAgKGNvbmZpZy5yb29tV2lkdGhNZXRlcnMgKiBjb25maWcucm9vbURlcHRoTWV0ZXJzKSAvICgxNC4wICogMTIuMCk7XG5cbiAgY29uc3QgcGlwZWxpbmVPdmVyaGVhZE1zID1cbiAgICBjb25maWcucmVuZGVyUGlwZWxpbmUgPT09ICdVbml0eSBIRFJQIChIaWdoIERlZmluaXRpb24pJyA/IDQuOCA6IDEuNjtcbiAgY29uc3Qgb2NjbHVzaW9uT3ZlcmhlYWRNcyA9XG4gICAgY29uZmlnLm9jY2x1c2lvbk1vZGUgPT09ICdHxYLEmWJpYSDFmnJvZG93aXNrb3dhIChFbnZpcm9ubWVudCBEZXB0aCknICYmXG4gICAgY29uZmlnLnNob3dPY2NsdXNpb25PYmplY3RzXG4gICAgICA/IDIuMlxuICAgICAgOiBjb25maWcub2NjbHVzaW9uTW9kZSA9PT0gJ01hc2thIFN0ZW5jaWwgKE1lYmxlIGkgRmlsYXJ5KScgJiZcbiAgICAgICAgY29uZmlnLnNob3dPY2NsdXNpb25PYmplY3RzXG4gICAgICA/IDEuMVxuICAgICAgOiAwLjI7XG4gIGNvbnN0IHBsYW5lT3ZlcmhlYWRNcyA9XG4gICAgKGNvbmZpZy5wbGFuZURldGVjdGlvbiA9PT0gJ1BlxYJuYSBzaWF0a2EgZ8WCxJliaSBMaURBUiAoU2NlbmUgTWVzaCknXG4gICAgICA/IDIuMVxuICAgICAgOiBjb25maWcucGxhbmVEZXRlY3Rpb24gPT09ICdCbGF0IHN0b8WCdSArIFBvZMWCb2dhIChEdWFsIEhvcml6b250YWwpJ1xuICAgICAgPyAxLjJcbiAgICAgIDogMC42NSkgKlxuICAgICgwLjY1ICsgMC4zNSAqIHJvb21BcmVhUmF0aW8pO1xuXG4gIGNvbnN0IGFyU3Vic3lzdGVtc01zID1cbiAgICAocGlwZWxpbmVPdmVyaGVhZE1zICtcbiAgICAgIG9jY2x1c2lvbk92ZXJoZWFkTXMgK1xuICAgICAgKGNvbmZpZy5zaG93RGVwdGhHcmlkID8gcGxhbmVPdmVyaGVhZE1zIDogMC40KSkgL1xuICAgIHNwZWMuZ3B1UG93ZXI7XG5cbiAgY29uc3QgYXJEZXB0aE1lbW9yeU1iID0gTWF0aC5yb3VuZChcbiAgICAoY29uZmlnLnBsYW5lRGV0ZWN0aW9uID09PSAnUGXFgm5hIHNpYXRrYSBnxYLEmWJpIExpREFSIChTY2VuZSBNZXNoKSdcbiAgICAgID8gNjhcbiAgICAgIDogMzgpICpcbiAgICAgICgwLjYgKyAwLjIgKiB0YWJsZUFyZWFSYXRpbyArIDAuMiAqIHJvb21BcmVhUmF0aW8pICtcbiAgICAgIChjb25maWcub2NjbHVzaW9uTW9kZSA9PT0gJ0fFgsSZYmlhIMWacm9kb3dpc2tvd2EgKEVudmlyb25tZW50IERlcHRoKSdcbiAgICAgICAgPyAzNFxuICAgICAgICA6IDEyKSArXG4gICAgICAoY29uZmlnLnJlbmRlclBpcGVsaW5lID09PSAnVW5pdHkgSERSUCAoSGlnaCBEZWZpbml0aW9uKScgPyA4NSA6IDApXG4gICk7XG5cbiAgLy8gNS4gUmVhbC1UaW1lIEJ1aWxkaW5nIFNoYWRvdyBNYXBwaW5nIENvc3QgKFBDRiBTb2Z0IFNoYWRvd3Mgb24gVmlydHVhbCBGbG9vciAmIFRhYmxldG9wKVxuICBjb25zdCBzaGFkb3dRdWFsaXR5RmFjdG9yID0gIWNvbmZpZy5lbmFibGVCdWlsZGluZ1NoYWRvd3NcbiAgICA/IDBcbiAgICA6IGNvbmZpZy5zaGFkb3dNYXBRdWFsaXR5ID09PSAnVWx0cmEgKDQwOTbDlzQwOTYgwrcgU3R1ZGlvIEJJTSknXG4gICAgPyAyLjI1XG4gICAgOiBjb25maWcuc2hhZG93TWFwUXVhbGl0eSA9PT0gJ1d5c29rYSAoMjA0OMOXMjA0OCDCtyBDcmlzcCBQQ0YpJ1xuICAgID8gMS4yNVxuICAgIDogY29uZmlnLnNoYWRvd01hcFF1YWxpdHkgPT09ICfFmnJlZG5pYSAoMTAyNMOXMTAyNCDCtyBTdGFuZGFyZCBBUiknXG4gICAgPyAwLjc1XG4gICAgOiAwLjQ7XG5cbiAgY29uc3Qgc2hhZG93R3B1TXMgPSAoMS40NSAqIHNoYWRvd1F1YWxpdHlGYWN0b3IgKiBncm91cENvdW50UmF0aW8pIC8gc3BlYy5ncHVQb3dlcjtcbiAgY29uc3Qgc2hhZG93RHJhd0NhbGxzID0gY29uZmlnLmVuYWJsZUJ1aWxkaW5nU2hhZG93c1xuICAgID8gTWF0aC5yb3VuZCgxOCAqIGdyb3VwQ291bnRSYXRpbyAqICgwLjY1ICsgMC4zNSAqIHNoYWRvd1F1YWxpdHlGYWN0b3IpKVxuICAgIDogMDtcbiAgY29uc3Qgc2hhZG93VnJhbU1iID0gIWNvbmZpZy5lbmFibGVCdWlsZGluZ1NoYWRvd3NcbiAgICA/IDBcbiAgICA6IGNvbmZpZy5zaGFkb3dNYXBRdWFsaXR5ID09PSAnVWx0cmEgKDQwOTbDlzQwOTYgwrcgU3R1ZGlvIEJJTSknXG4gICAgPyA2NFxuICAgIDogY29uZmlnLnNoYWRvd01hcFF1YWxpdHkgPT09ICdXeXNva2EgKDIwNDjDlzIwNDggwrcgQ3Jpc3AgUENGKSdcbiAgICA/IDE2XG4gICAgOiBjb25maWcuc2hhZG93TWFwUXVhbGl0eSA9PT0gJ8WacmVkbmlhICgxMDI0w5cxMDI0IMK3IFN0YW5kYXJkIEFSKSdcbiAgICA/IDRcbiAgICA6IDE7XG5cbiAgLy8gVG90YWwgRnJhbWUgVGltZSAmIEZQU1xuICBjb25zdCByYXdGcmFtZVRpbWVNcyA9XG4gICAgMi40ICtcbiAgICBtZXNoR3B1TXMgK1xuICAgIHZmeEdwdU1zICtcbiAgICBhclN1YnN5c3RlbXNNcyArXG4gICAgc2hhZG93R3B1TXMgK1xuICAgIGppdHRlciAqIDAuMzU7XG4gIGNvbnN0IG1pbkZyYW1lVGltZU1zID0gMTAwMCAvIHNwZWMubWF4RnBzO1xuICBjb25zdCBmcmFtZVRpbWVNcyA9IE1hdGgubWF4KG1pbkZyYW1lVGltZU1zLCByYXdGcmFtZVRpbWVNcyk7XG4gIGNvbnN0IGZwcyA9IE1hdGgubWluKFxuICAgIHNwZWMubWF4RnBzLFxuICAgIE1hdGgubWF4KDE0LCBNYXRoLnJvdW5kKDEwMDAgLyBmcmFtZVRpbWVNcykpXG4gICk7XG5cbiAgY29uc3QgZHJhd0NhbGxzID1cbiAgICAyNCArXG4gICAgbWVzaERyYXdDYWxscyArXG4gICAgdmZ4RHJhd0NhbGxzICtcbiAgICBodWREcmF3Q2FsbHMgK1xuICAgIHNoYWRvd0RyYXdDYWxscyArXG4gICAgKGNvbmZpZy5zaG93RGVwdGhHcmlkID8gMTQgOiAwKSArXG4gICAgKGNvbmZpZy5zaG93T2NjbHVzaW9uT2JqZWN0cyA/IDEyIDogMCk7XG5cbiAgY29uc3Qgc3JwQmF0Y2hlcyA9IE1hdGgubWF4KDEyLCBNYXRoLnJvdW5kKGRyYXdDYWxscyAqIDAuMzgpKTtcbiAgY29uc3QgdG90YWxNZW1vcnlNYiA9XG4gICAgc3BlYy5iYXNlUmFtTWIgK1xuICAgIG1lc2hNZW1vcnlNYiArXG4gICAgdmZ4TWVtb3J5TWIgK1xuICAgIGFyRGVwdGhNZW1vcnlNYiArXG4gICAgc2hhZG93VnJhbU1iO1xuXG4gIGNvbnN0IHRvdGFsRHluYW1pY01zID0gbWVzaEdwdU1zICsgdmZ4R3B1TXMgKyBhclN1YnN5c3RlbXNNcyArIHNoYWRvd0dwdU1zO1xuICBjb25zdCBtZXNoQ29zdFBjdCA9IE1hdGgucm91bmQoXG4gICAgKChtZXNoR3B1TXMgKyBzaGFkb3dHcHVNcykgLyB0b3RhbER5bmFtaWNNcykgKiAxMDBcbiAgKTtcbiAgY29uc3QgdmZ4Q29zdFBjdCA9IE1hdGgucm91bmQoKHZmeEdwdU1zIC8gdG90YWxEeW5hbWljTXMpICogMTAwKTtcbiAgY29uc3QgYXJTdWJzeXN0ZW1zQ29zdFBjdCA9IE1hdGgubWF4KDAsIDEwMCAtIG1lc2hDb3N0UGN0IC0gdmZ4Q29zdFBjdCk7XG5cbiAgbGV0IHN0YXR1c0xhYmVsOiBTaW11bGF0ZWRNb2JpbGVUZWxlbWV0cnlbJ3N0YXR1c0xhYmVsJ10gPVxuICAgICdPcHR5bWFsbnkgKDYwKyBGUFMpJztcbiAgbGV0IHN0YXR1c1RvbmU6IFNpbXVsYXRlZE1vYmlsZVRlbGVtZXRyeVsnc3RhdHVzVG9uZSddID0gJ2VtZXJhbGQnO1xuXG4gIGlmIChmcHMgPCAzNikge1xuICAgIHN0YXR1c0xhYmVsID0gJ1Rocm90dGxpbmcgR1BVICg8MzUgRlBTKSc7XG4gICAgc3RhdHVzVG9uZSA9ICdyb3NlJztcbiAgfSBlbHNlIGlmIChmcHMgPCA1Mikge1xuICAgIHN0YXR1c0xhYmVsID0gJ1d5c29raWUgb2JjacSFxbxlbmllJztcbiAgICBzdGF0dXNUb25lID0gJ2FtYmVyJztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZnBzLFxuICAgIG1heFRhcmdldEZwczogc3BlYy5tYXhGcHMsXG4gICAgZnJhbWVUaW1lTXM6IE51bWJlcihmcmFtZVRpbWVNcy50b0ZpeGVkKDEpKSxcbiAgICBncHVUaW1lTXM6IE51bWJlcigobWVzaEdwdU1zICsgdmZ4R3B1TXMpLnRvRml4ZWQoMSkpLFxuICAgIGNwdUFyVGltZU1zOiBOdW1iZXIoYXJTdWJzeXN0ZW1zTXMudG9GaXhlZCgxKSksXG4gICAgZHJhd0NhbGxzLFxuICAgIHNycEJhdGNoZXMsXG4gICAgdHJpYW5nbGVzSyxcbiAgICB2ZXJ0aWNlc0ssXG4gICAgdG90YWxNZW1vcnlNYixcbiAgICBtZXNoTWVtb3J5TWIsXG4gICAgdmZ4TWVtb3J5TWIsXG4gICAgYXJEZXB0aE1lbW9yeU1iLFxuICAgIG1lc2hDb3N0UGN0LFxuICAgIHZmeENvc3RQY3QsXG4gICAgYXJTdWJzeXN0ZW1zQ29zdFBjdCxcbiAgICBzdGF0dXNMYWJlbCxcbiAgICBzdGF0dXNUb25lLFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgUmVzb3VyY2VNb25pdG9yUGFuZWw6IFJlYWN0LkZDPFJlc291cmNlTW9uaXRvclBhbmVsUHJvcHM+ID0gKHtcbiAgY29uZmlnLFxuICBsaXZlTWV0cmljcyxcbiAgb25VcGRhdGVDb25maWcsXG59KSA9PiB7XG4gIGNvbnN0IFtqaXR0ZXIsIHNldEppdHRlcl0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbZnBzSGlzdG9yeSwgc2V0RnBzSGlzdG9yeV0gPSB1c2VTdGF0ZTxudW1iZXJbXT4oKCkgPT5cbiAgICBBcnJheSgzMikuZmlsbCg1OClcbiAgKTtcblxuICBjb25zdCB0ZWxlbWV0cnkgPSB1c2VNZW1vKFxuICAgICgpID0+IGNhbGN1bGF0ZU1vYmlsZUFSVGVsZW1ldHJ5KGNvbmZpZywgaml0dGVyKSxcbiAgICBbY29uZmlnLCBqaXR0ZXJdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHdpbmRvdy5zZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBuZXh0Sml0dGVyID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMS40O1xuICAgICAgc2V0Sml0dGVyKG5leHRKaXR0ZXIpO1xuICAgICAgc2V0RnBzSGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gY2FsY3VsYXRlTW9iaWxlQVJUZWxlbWV0cnkoY29uZmlnLCBuZXh0Sml0dGVyKS5mcHM7XG4gICAgICAgIHJldHVybiBbLi4ucHJldi5zbGljZSgxKSwgY3VycmVudF07XG4gICAgICB9KTtcbiAgICB9LCA0NTApO1xuICAgIHJldHVybiAoKSA9PiBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfSwgW2NvbmZpZ10pO1xuXG4gIGNvbnN0IGdldE1lc2hMb2RMYWJlbCA9IChkZW5zaXR5OiBudW1iZXIpID0+IHtcbiAgICBpZiAoZGVuc2l0eSA8PSAwLjY1KSByZXR1cm4gJ0xPRCAyMDAgKE5pc2thKSc7XG4gICAgaWYgKGRlbnNpdHkgPD0gMS4xNSkgcmV0dXJuICdMT0QgMzAwICjFmnJlZG5pYSknO1xuICAgIGlmIChkZW5zaXR5IDw9IDEuNikgcmV0dXJuICdMT0QgNDAwIChXeXNva2EpJztcbiAgICByZXR1cm4gJ0xPRCA1MDAgKFVsdHJhIEJJTSknO1xuICB9O1xuXG4gIGNvbnN0IHNwYXJrbGluZVBvaW50cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHdpZHRoID0gMjgwO1xuICAgIGNvbnN0IGhlaWdodCA9IDQyO1xuICAgIGNvbnN0IG1heFZhbCA9IHRlbGVtZXRyeS5tYXhUYXJnZXRGcHM7XG4gICAgcmV0dXJuIGZwc0hpc3RvcnlcbiAgICAgIC5tYXAoKHZhbCwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHggPSAoaWR4IC8gKGZwc0hpc3RvcnkubGVuZ3RoIC0gMSkpICogd2lkdGg7XG4gICAgICAgIGNvbnN0IGNsYW1wZWQgPSBNYXRoLm1pbihtYXhWYWwsIE1hdGgubWF4KDEwLCB2YWwpKTtcbiAgICAgICAgY29uc3QgeSA9IGhlaWdodCAtICgoY2xhbXBlZCAtIDEwKSAvIChtYXhWYWwgLSAxMCkpICogKGhlaWdodCAtIDgpIC0gNDtcbiAgICAgICAgcmV0dXJuIGAke3gudG9GaXhlZCgxKX0sJHt5LnRvRml4ZWQoMSl9YDtcbiAgICAgIH0pXG4gICAgICAuam9pbignICcpO1xuICB9LCBbZnBzSGlzdG9yeSwgdGVsZW1ldHJ5Lm1heFRhcmdldEZwc10pO1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZURlcHRoR3JpZCA9ICgpID0+IHtcbiAgICBjb25zdCBuZXh0U2hvdyA9ICFjb25maWcuc2hvd0RlcHRoR3JpZDtcbiAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICBzaG93RGVwdGhHcmlkOiBuZXh0U2hvdyxcbiAgICAgIC4uLihuZXh0U2hvdyA/IHsgdHJpZ2dlclNjYW5QdWxzZTogRGF0ZS5ub3coKSB9IDoge30pLFxuICAgIH0pO1xuICB9O1xuXG4gIGlmICghY29uZmlnLnNob3dSZXNvdXJjZU1vbml0b3IpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNCByaWdodC02IHotMTAgcG9pbnRlci1ldmVudHMtYXV0byBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlVG9nZ2xlRGVwdGhHcmlkfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgcm91bmRlZC14bCBzaGFkb3cteGwgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgIGNvbmZpZy5zaG93RGVwdGhHcmlkXG4gICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwLzkwIGJvcmRlci1lbWVyYWxkLTUwMC81MCB0ZXh0LWVtZXJhbGQtMjAwIGhvdmVyOmJvcmRlci1lbWVyYWxkLTQwMCdcbiAgICAgICAgICAgICAgOiAnYmctWyMwOTEyMjBdLzk1IGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ym9yZGVyLXNreS00MDAnXG4gICAgICAgICAgfWB9XG4gICAgICAgICAgdGl0bGU9XCJQcnplxYLEhWN6IHdpenVhbGl6YWNqxJkgc2lhdGtpIGRldGVrY2ppIHDFgmFzemN6eXpuIExpREFSIChzaG93RGVwdGhHcmlkKVwiXG4gICAgICAgID5cbiAgICAgICAgICA8R3JpZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICBTaWF0a2EgTGlEQVI6IHtjb25maWcuc2hvd0RlcHRoR3JpZCA/ICdXxYEuJyA6ICdXWcWBLid9XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblVwZGF0ZUNvbmZpZyh7IHNob3dSZXNvdXJjZU1vbml0b3I6IHRydWUgfSl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMTAwIGJnLVsjMDkxMjIwXS85NSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBob3Zlcjpib3JkZXItc2t5LTQwMCByb3VuZGVkLXhsIHNoYWRvdy14bCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgID5cbiAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgIFBva2HFvCBQcm9maWxlciBaYXNvYsOzdyBBUiAoe3RlbGVtZXRyeS5mcHN9IEZQUyDCtyB7dGVsZW1ldHJ5LmRyYXdDYWxsc30gREMpXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGFzaWRlXG4gICAgICBhcmlhLWxhYmVsPVwiUGFuZWwgbW9uaXRvcm93YW5pYSB6YXNvYsOzdyB1cnrEhWR6ZW5pYSBtb2JpbG5lZ28gQVJcIlxuICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgcmlnaHQtNiB6LTEwIHctWzM2NHB4XSBtYXgtdy1bY2FsYygxMDB2dy0zcmVtKV0gbWF4LWgtW2NhbGMoMTAwdmgtNy41cmVtKV0gb3ZlcmZsb3cteS1hdXRvIHBvaW50ZXItZXZlbnRzLWF1dG8gYmctWyMwOTEyMjBdLzk1IGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgc2hhZG93LTJ4bCBwLTQgc3BhY2UteS0zXCJcbiAgICA+XG4gICAgICB7LyogSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMC85MCBwYi0yLjVcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxHYXVnZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2t5LTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMCB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgICBNb25pdG9yIFphc29iw7N3IE1vYmlsbnljaCBBUlxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyB0YWJ1bGFyLW51bXNcIj5cbiAgICAgICAgICAgICAge2NvbmZpZy5idWlsZGluZ3NQZXJHcm91cCAqIDN9IGJ1ZHlua8OzdyDCtyB7Y29uZmlnLmJ1aWxkaW5nRmxvb3JDb3VudH0gcGnEmXRlciDCtyBCbGF0IHtjb25maWcudGFibGVXaWR0aE1ldGVycy50b0ZpeGVkKDEpfW1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1zZW1pYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciAke1xuICAgICAgICAgICAgICB0ZWxlbWV0cnkuc3RhdHVzVG9uZSA9PT0gJ2VtZXJhbGQnXG4gICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvNjAgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHRleHQtZW1lcmFsZC0zMDAnXG4gICAgICAgICAgICAgICAgOiB0ZWxlbWV0cnkuc3RhdHVzVG9uZSA9PT0gJ2FtYmVyJ1xuICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC82MCBib3JkZXItYW1iZXItNTAwLzQwIHRleHQtYW1iZXItMzAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXJvc2UtOTUwLzYwIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXJvc2UtMzAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RlbGVtZXRyeS5zdGF0dXNMYWJlbH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblVwZGF0ZUNvbmZpZyh7IHNob3dSZXNvdXJjZU1vbml0b3I6IGZhbHNlIH0pfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC1tZCBob3ZlcjpiZy1zbGF0ZS04MDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgdGl0bGU9XCJad2nFhCBtb25pdG9yIHphc29iw7N3XCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJad2nFhCBtb25pdG9yIHphc29iw7N3XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TWluaW1pemUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFRhcmdldCBNb2JpbGUgRGV2aWNlIFNlbGVjdG9yICovfVxuICAgICAgPGRpdj5cbiAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgIDxTbWFydHBob25lIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgIFByb2ZpbCBVcnrEhWR6ZW5pYSBNb2JpbG5lZ29cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgQ2VsOiB7dGVsZW1ldHJ5Lm1heFRhcmdldEZwc30gSHpcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3RcbiAgICAgICAgICB2YWx1ZT17Y29uZmlnLm1vYmlsZURldmljZVByb2ZpbGV9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICBtb2JpbGVEZXZpY2VQcm9maWxlOiBlLnRhcmdldC52YWx1ZSBhcyBNb2JpbGVEZXZpY2VQcm9maWxlT3B0aW9uLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDUwYjE0XSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC85MCByb3VuZGVkLWxnIHB4LTIuNSBweS0xLjUgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICA+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImlQaG9uZSAxNiBQcm8gKEExOCBQcm8gKyBMaURBUilcIj5cbiAgICAgICAgICAgIGlQaG9uZSAxNiBQcm8gKEExOCBQcm8gKyBMaURBUilcbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU2Ftc3VuZyBTMjQgVWx0cmEgKFNuYXBkcmFnb24gOCBHZW4gMylcIj5cbiAgICAgICAgICAgIFNhbXN1bmcgUzI0IFVsdHJhIChTbmFwZHJhZ29uIDggR2VuIDMpXG4gICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImlQYWQgUHJvIE00IChMaURBUiArIDEyMEh6IFByb01vdGlvbilcIj5cbiAgICAgICAgICAgIGlQYWQgUHJvIE00IChMaURBUiArIDEyMEh6IFByb01vdGlvbilcbiAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU21hcnRmb24gQVJDb3JlIE1pZC1SYW5nZSAoU25hcGRyYWdvbiA3cylcIj5cbiAgICAgICAgICAgIFNtYXJ0Zm9uIEFSQ29yZSBNaWQtUmFuZ2UgKFNuYXBkcmFnb24gN3MpXG4gICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiAzIFByaW1hcnkgVGVsZW1ldHJ5IE1ldHJpY3M6IEZQUywgTWVtb3J5IChNQiksIERyYXcgQ2FsbHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTJcIj5cbiAgICAgICAgey8qIE1ldHJpYyAxOiBGUFMgJiBGcmFtZSBUaW1lICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC85MCByb3VuZGVkLWxnIHAtMi41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPld5ZGFqbm/Fm8SHPC9zcGFuPlxuICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LWJhc2UgZm9udC1ib2xkIGZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgbXQtMC41ICR7XG4gICAgICAgICAgICAgIHRlbGVtZXRyeS5zdGF0dXNUb25lID09PSAnZW1lcmFsZCdcbiAgICAgICAgICAgICAgICA/ICd0ZXh0LWVtZXJhbGQtNDAwJ1xuICAgICAgICAgICAgICAgIDogdGVsZW1ldHJ5LnN0YXR1c1RvbmUgPT09ICdhbWJlcidcbiAgICAgICAgICAgICAgICA/ICd0ZXh0LWFtYmVyLTQwMCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXJvc2UtNDAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RlbGVtZXRyeS5mcHN9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ub3JtYWxcIj5GUFM8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICB7dGVsZW1ldHJ5LmZyYW1lVGltZU1zfSBtcy9rbC5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1ldHJpYyAyOiBNZW1vcnkgVXNhZ2UgKFJBTSArIFZSQU0pICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC85MCByb3VuZGVkLWxnIHAtMi41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPlBhbWnEmcSHPC9zcGFuPlxuICAgICAgICAgICAgPERhdGFiYXNlIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCBmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtMTAwIG10LTAuNVwiPlxuICAgICAgICAgICAge3RlbGVtZXRyeS50b3RhbE1lbW9yeU1ifXsnICd9XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbm9ybWFsIHRleHQtc2xhdGUtMzAwXCI+TUI8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICBWUkFNOiB7dGVsZW1ldHJ5Lm1lc2hNZW1vcnlNYiArIHRlbGVtZXRyeS52ZnhNZW1vcnlNYn0gTUJcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1ldHJpYyAzOiBEcmF3IENhbGxzICYgVHJpYW5nbGVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC85MCByb3VuZGVkLWxnIHAtMi41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPkRyYXcgQ2FsbGU8L3NwYW4+XG4gICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LXNreS0zMDAgbXQtMC41XCI+XG4gICAgICAgICAgICB7dGVsZW1ldHJ5LmRyYXdDYWxsc317JyAnfVxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTQwMFwiPkRDPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAge3RlbGVtZXRyeS50cmlhbmdsZXNLfWsgVHJpc1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSW50ZXJhY3RpdmUgTGlEQVIgUGxhbmUgRGV0ZWN0aW9uICYgUG9pbnQgQ2xvdWQgVmlzdWFsaXphdGlvbiBQYW5lbCAoc2hvd0RlcHRoR3JpZCBUb2dnbGVzKSAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgcm91bmRlZC1sZyBib3JkZXIgcC0zIHNwYWNlLXktMi41IHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgY29uZmlnLnNob3dEZXB0aEdyaWRcbiAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwLzI1IGJvcmRlci1lbWVyYWxkLTUwMC80MCdcbiAgICAgICAgICAgIDogJ2JnLVsjMDYwYzE3XSBib3JkZXItc2xhdGUtODAwLzkwJ1xuICAgICAgICB9YH1cbiAgICAgID5cbiAgICAgICAgey8qIFRvZ2dsZSAxOiBTaWF0a2EgRGV0ZWtjamkgUMWCYXN6Y3p5em4gTGlEQVIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtaW4tdy0wXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNyBoLTcgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICBjb25maWcuc2hvd0RlcHRoR3JpZFxuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC01MDAvMjAgYm9yZGVyLWVtZXJhbGQtNDAwLzUwIHRleHQtZW1lcmFsZC0zMDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxHcmlkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgU2lhdGthIERldGVrY2ppIFDFgmFzemN6eXpuIExpREFSXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1zZW1pYm9sZCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zaG93RGVwdGhHcmlkXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC01MDAvMjAgYm9yZGVyLWVtZXJhbGQtNDAwLzQwIHRleHQtZW1lcmFsZC0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwLzgwIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Y29uZmlnLnNob3dEZXB0aEdyaWQgPyAnQUtUWVdOQScgOiAnVUtSWVRBJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICBCbGF0IHtjb25maWcudGFibGVXaWR0aE1ldGVycy50b0ZpeGVkKDIpfcOXXG4gICAgICAgICAgICAgICAge2NvbmZpZy50YWJsZURlcHRoTWV0ZXJzLnRvRml4ZWQoMil9bSArIFBvc2FkemtheycgJ31cbiAgICAgICAgICAgICAgICB7Y29uZmlnLnJvb21XaWR0aE1ldGVycy50b0ZpeGVkKDApfcOXXG4gICAgICAgICAgICAgICAge2NvbmZpZy5yb29tRGVwdGhNZXRlcnMudG9GaXhlZCgwKX1tXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICByb2xlPVwic3dpdGNoXCJcbiAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17Y29uZmlnLnNob3dEZXB0aEdyaWR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiUHJ6ZcWCxIVjeiB3aXp1YWxpemFjasSZIHNpYXRraSBkZXRla2NqaSBwxYJhc3pjenl6biBMaURBUiAoc2hvd0RlcHRoR3JpZClcIlxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVG9nZ2xlRGVwdGhHcmlkfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgaW5saW5lLWZsZXggaC02IHctMTEgc2hyaW5rLTAgY3Vyc29yLXBvaW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci10cmFuc3BhcmVudCB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0yMDAgZWFzZS1pbi1vdXQgZm9jdXM6b3V0bGluZS1ub25lICR7XG4gICAgICAgICAgICAgIGNvbmZpZy5zaG93RGVwdGhHcmlkID8gJ2JnLWVtZXJhbGQtNTAwJyA6ICdiZy1zbGF0ZS03MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2Bwb2ludGVyLWV2ZW50cy1ub25lIGlubGluZS1ibG9jayBoLTUgdy01IHRyYW5zZm9ybSByb3VuZGVkLWZ1bGwgYmctd2hpdGUgc2hhZG93IHJpbmctMCB0cmFuc2l0aW9uIGR1cmF0aW9uLTIwMCBlYXNlLWluLW91dCAke1xuICAgICAgICAgICAgICAgIGNvbmZpZy5zaG93RGVwdGhHcmlkID8gJ3RyYW5zbGF0ZS14LTUnIDogJ3RyYW5zbGF0ZS14LTAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFRvZ2dsZSAyOiBBZGRpdGlvbmFsIFRvZ2dsZSAnV2l6dWFsaXphY2phIFNrYW5vd2FuaWEgTGlEQVInIChQb2ludCBDbG91ZCBWaXN1YWxpemF0aW9uIHZpYSBzaG93RGVwdGhHcmlkKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtaW4tdy0wXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNyBoLTcgcm91bmRlZC1sZyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICBjb25maWcuc2hvd0RlcHRoR3JpZFxuICAgICAgICAgICAgICAgICAgPyAnYmctc2t5LTUwMC8yMCBib3JkZXItc2t5LTQwMC81MCB0ZXh0LXNreS0zMDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxSYWRhciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDAgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgIFdpenVhbGl6YWNqYSBTa2Fub3dhbmlhIExpREFSXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1zZW1pYm9sZCBweC0xLjUgcHktMC41IHJvdW5kZWQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zaG93RGVwdGhHcmlkXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2t5LTUwMC8yMCBib3JkZXItc2t5LTQwMC80MCB0ZXh0LXNreS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwLzgwIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Y29uZmlnLnNob3dEZXB0aEdyaWQgPyAnV8WBLicgOiAnV1nFgS4nfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgIFBvaW50IENsb3VkIFZpc3VhbGl6YXRpb24gwrcgMSAwNDggcGt0IGfFgsSZYmkgKHNob3dEZXB0aEdyaWQpXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICByb2xlPVwic3dpdGNoXCJcbiAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17Y29uZmlnLnNob3dEZXB0aEdyaWR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPVwiV2l6dWFsaXphY2phIFNrYW5vd2FuaWEgTGlEQVIgKFBvaW50IENsb3VkIFZpc3VhbGl6YXRpb24gLSBzaG93RGVwdGhHcmlkKVwiXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUb2dnbGVEZXB0aEdyaWR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2ByZWxhdGl2ZSBpbmxpbmUtZmxleCBoLTYgdy0xMSBzaHJpbmstMCBjdXJzb3ItcG9pbnRlciByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgYm9yZGVyLXRyYW5zcGFyZW50IHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTIwMCBlYXNlLWluLW91dCBmb2N1czpvdXRsaW5lLW5vbmUgJHtcbiAgICAgICAgICAgICAgY29uZmlnLnNob3dEZXB0aEdyaWQgPyAnYmctc2t5LTQwMCcgOiAnYmctc2xhdGUtNzAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcG9pbnRlci1ldmVudHMtbm9uZSBpbmxpbmUtYmxvY2sgaC01IHctNSB0cmFuc2Zvcm0gcm91bmRlZC1mdWxsIGJnLXdoaXRlIHNoYWRvdyByaW5nLTAgdHJhbnNpdGlvbiBkdXJhdGlvbi0yMDAgZWFzZS1pbi1vdXQgJHtcbiAgICAgICAgICAgICAgICBjb25maWcuc2hvd0RlcHRoR3JpZCA/ICd0cmFuc2xhdGUteC01JyA6ICd0cmFuc2xhdGUteC0wJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBQbGFuZSBEZXRlY3Rpb24gTW9kZSAmIExpdmUgU2NhbiBQdWxzZSBBY3Rpb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtMiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLnBsYW5lRGV0ZWN0aW9ufVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgcGxhbmVEZXRlY3Rpb246IGUudGFyZ2V0LnZhbHVlIGFzIFBsYW5lRGV0ZWN0aW9uT3B0aW9uLFxuICAgICAgICAgICAgICAgICAgc2hvd0RlcHRoR3JpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiVHJ5YiBkZXRla2NqaSBwxYJhc3pjenl6biBMaURBUlwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wIGJnLVsjMDUwYjE0XSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC85MCByb3VuZGVkLW1kIHB4LTIgcHktMSB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWVtZXJhbGQtNDAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkJsYXQgc3RvxYJ1ICsgUG9kxYJvZ2EgKER1YWwgSG9yaXpvbnRhbClcIj5cbiAgICAgICAgICAgICAgICBEdWFsIEhvcml6b250YWwgKEJsYXQgKyBQb2TFgm9nYSlcbiAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQZcWCbmEgc2lhdGthIGfFgsSZYmkgTGlEQVIgKFNjZW5lIE1lc2gpXCI+XG4gICAgICAgICAgICAgICAgUGXFgm5hIHNpYXRrYSBMaURBUiAoU2NlbmUgTWVzaClcbiAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUeWxrbyBibGF0IHN0b8WCdSAoVGFibGV0b3AgQW5jaG9yKVwiPlxuICAgICAgICAgICAgICAgIFR5bGtvIGJsYXQgc3RvxYJ1IChUYWJsZXRvcCBBbmNob3IpXG4gICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgc2hvd0RlcHRoR3JpZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgYmctZW1lcmFsZC01MDAvMjAgaG92ZXI6YmctZW1lcmFsZC01MDAvMzAgdGV4dC1lbWVyYWxkLTIwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJXeXp3w7NsIGltcHVscyBza2Fub3dhbmlhIGfFgsSZYmkgTGlEQVIvVG9GIHcgc2NlbmllIDNEXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJhZGFyIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIEltcHVscyBMaURBUlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgS29zenQgc2lhdGtpIGkgY2htdXJ5IHBrdDp7JyAnfVxuICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICB7Y29uZmlnLnNob3dEZXB0aEdyaWQgPyAnKzE0IERDJyA6ICcwIERDJ31cbiAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgU3Vic3lzdGVtIEFSOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwXCI+e3RlbGVtZXRyeS5jcHVBclRpbWVNc30gbXM8L3N0cm9uZz4gKHt0ZWxlbWV0cnkuYXJEZXB0aE1lbW9yeU1ifSBNQilcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIExpdmUgRlBTIFNwYXJrbGluZSBHcmFwaCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzkwIHJvdW5kZWQtbGcgcHgtMyBweS0yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG1iLTEgZm9udC1tb25vIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgIDxzcGFuPld5a3JlcyBzdGFiaWxub8WbY2kga2xhdGVrIChHUFU6IHt0ZWxlbWV0cnkuZ3B1VGltZU1zfSBtcyk8L3NwYW4+XG4gICAgICAgICAgPHNwYW4+V2ViR0w6IHtsaXZlTWV0cmljcy5tZWFzdXJlZFdlYmdsRnBzfSBGUFM8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8c3ZnXG4gICAgICAgICAgdmlld0JveD1cIjAgMCAyODAgNDJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTkgb3ZlcmZsb3ctdmlzaWJsZVwiXG4gICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxsaW5lXG4gICAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgICAgeTE9XCIxMlwiXG4gICAgICAgICAgICB4Mj1cIjI4MFwiXG4gICAgICAgICAgICB5Mj1cIjEyXCJcbiAgICAgICAgICAgIHN0cm9rZT1cInJnYmEoNTYsIDE4OSwgMjQ4LCAwLjIpXCJcbiAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiXG4gICAgICAgICAgICBzdHJva2VXaWR0aD1cIjFcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHBvbHlsaW5lXG4gICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICBzdHJva2U9e1xuICAgICAgICAgICAgICB0ZWxlbWV0cnkuc3RhdHVzVG9uZSA9PT0gJ2VtZXJhbGQnXG4gICAgICAgICAgICAgICAgPyAnIzM0ZDM5OSdcbiAgICAgICAgICAgICAgICA6IHRlbGVtZXRyeS5zdGF0dXNUb25lID09PSAnYW1iZXInXG4gICAgICAgICAgICAgICAgPyAnI2ZiYmYyNCdcbiAgICAgICAgICAgICAgICA6ICcjZmI3MTg1J1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIyXCJcbiAgICAgICAgICAgIHBvaW50cz17c3BhcmtsaW5lUG9pbnRzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBEaXJlY3QgSW50ZXJhY3RpdmUgU2xpZGVyczogTWVzaCBEZW5zaXR5ICYgUGFydGljbGUgRWZmZWN0cyBJbXBhY3QgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41IGJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC85MCByb3VuZGVkLWxnIHAtM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICBTeW11bGF0b3IgV3DFgnl3dSBTaWF0a2kgaSBDesSFc3RlY3playBuYSBXeWRham5vxZvEh1xuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogMS4gSG9sb2dyYW0gTWVzaCBEZW5zaXR5IFNsaWRlciAqL31cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgR8SZc3RvxZvEhyBTaWF0a2kgSG9sb2dyYW11XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2t5LTMwMFwiPlxuICAgICAgICAgICAgICB7Y29uZmlnLmhvbG9ncmFtTWVzaERlbnNpdHkudG9GaXhlZCgyKX14IMK3eycgJ31cbiAgICAgICAgICAgICAge2dldE1lc2hMb2RMYWJlbChjb25maWcuaG9sb2dyYW1NZXNoRGVuc2l0eSl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgbWluPXswLjV9XG4gICAgICAgICAgICBtYXg9ezIuMH1cbiAgICAgICAgICAgIHN0ZXA9ezAuMDV9XG4gICAgICAgICAgICB2YWx1ZT17Y29uZmlnLmhvbG9ncmFtTWVzaERlbnNpdHl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBob2xvZ3JhbU1lc2hEZW5zaXR5OiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtc2t5LTQwMFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIDIuIFdpbmRvdyBQYXJ0aWNsZSBEZW5zaXR5IFNsaWRlciAqL31cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgIEfEmXN0b8WbxIcgQ3rEhXN0ZWN6ZWsgWmEgT2tuZW1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAge01hdGgucm91bmQoY29uZmlnLndpbmRvd1BhcnRpY2xlRGVuc2l0eSAqIDEwMCl9JSAoXG4gICAgICAgICAgICAgIHtNYXRoLnJvdW5kKDkwMCAqIChjb25maWcud2luZG93UGFydGljbGVEZW5zaXR5IC8gMikpfSBjesSFc3QuKVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgIG1pbj17MC4yfVxuICAgICAgICAgICAgbWF4PXsyLjB9XG4gICAgICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgICAgICB2YWx1ZT17Y29uZmlnLndpbmRvd1BhcnRpY2xlRGVuc2l0eX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgIHdpbmRvd1BhcnRpY2xlRGVuc2l0eTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIDMuIERlcHRoIFN0cmVuZ3RoIC8gUGFyYWxsYXggSW50ZW5zaXR5IFNsaWRlciAoJ1NpxYJhIEfFgsSZYmknLCBSYW5nZSAwLTEuMCkgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMSBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFJhZGFyIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIFNpxYJhIEfFgsSZYmkgKFBhcmFsYWtzYSBBUilcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1lbWVyYWxkLTMwMFwiPlxuICAgICAgICAgICAgICB7TWF0aC5taW4oMS4wLCBjb25maWcucGFyYWxsYXhJbnRlbnNpdHkpLnRvRml4ZWQoMil9IChcbiAgICAgICAgICAgICAge01hdGgucm91bmQoTWF0aC5taW4oMS4wLCBjb25maWcucGFyYWxsYXhJbnRlbnNpdHkpICogMTAwKX0lKVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgIG1pbj17MH1cbiAgICAgICAgICAgIG1heD17MS4wfVxuICAgICAgICAgICAgc3RlcD17MC4wNX1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTacWCYSBHxYLEmWJpIChwYXJhbGxheEludGVuc2l0eSAwLjAgLSAxLjApXCJcbiAgICAgICAgICAgIHZhbHVlPXtNYXRoLm1pbigxLjAsIGNvbmZpZy5wYXJhbGxheEludGVuc2l0eSl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICBwYXJhbGxheEludGVuc2l0eTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWVtZXJhbGQtNDAwXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUmVzb3VyY2UgQnJlYWtkb3duIEJhcnMgKE1lc2ggdnMgUGFydGljbGVzIHZzIEFSIERlcHRoKSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICA8c3Bhbj5Qb2R6aWHFgiBvYmNpxIXFvGVuaWEgR1BVIGkgcGFtacSZY2k8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgU1JQIEJhdGNoZXI6IHt0ZWxlbWV0cnkuc3JwQmF0Y2hlc30gZ3J1cFxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0yIGJnLXNsYXRlLTkwMCByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXhcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYCR7dGVsZW1ldHJ5Lm1lc2hDb3N0UGN0fSVgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1za3ktNDAwIGgtZnVsbFwiXG4gICAgICAgICAgICB0aXRsZT1cIlNpYXRrYSBCSU0gSG9sb2dyYW11XCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHt0ZWxlbWV0cnkudmZ4Q29zdFBjdH0lYCB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctYW1iZXItNDAwIGgtZnVsbFwiXG4gICAgICAgICAgICB0aXRsZT1cIkVmZWt0eSBDesSFc3RlY3prb3dlIFphIE9rbmVtXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHt0ZWxlbWV0cnkuYXJTdWJzeXN0ZW1zQ29zdFBjdH0lYCB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZW1lcmFsZC00MDAgaC1mdWxsXCJcbiAgICAgICAgICAgIHRpdGxlPVwiQ3p1am5pa2kgR8WCxJliaSBMaURBUiBpIE9rbHV6amFcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMSBwdC0wLjUgZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDBcIj7ilqA8L3NwYW4+IFNpYXRrYToge3RlbGVtZXRyeS5tZXNoQ29zdFBjdH0lIChcbiAgICAgICAgICAgIHt0ZWxlbWV0cnkubWVzaE1lbW9yeU1ifU1CKVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMFwiPuKWoDwvc3Bhbj4gVkZYOiB7dGVsZW1ldHJ5LnZmeENvc3RQY3R9JSAoXG4gICAgICAgICAgICB7dGVsZW1ldHJ5LnZmeE1lbW9yeU1ifU1CKVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+4pagPC9zcGFuPiBBUi9HxYLEmWJpYTp7JyAnfVxuICAgICAgICAgICAge3RlbGVtZXRyeS5hclN1YnN5c3RlbXNDb3N0UGN0fSVcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFF1aWNrIE1vYmlsZSBPcHRpbWl6YXRpb24gQWN0aW9uICovfVxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICBob2xvZ3JhbU1lc2hEZW5zaXR5OiAwLjg1LFxuICAgICAgICAgICAgd2luZG93UGFydGljbGVEZW5zaXR5OiAwLjcsXG4gICAgICAgICAgICByZW5kZXJQaXBlbGluZTogJ1VuaXR5IFVSUCAoVW5pdmVyc2FsIFJlbmRlciBQaXBlbGluZSknLFxuICAgICAgICAgICAgd2luZG93UGFydGljbGVzOiAnQ3rEhXN0ZWN6a2kgQXRtb3NmZXJ5Y3puZSArIFJ1Y2ggUG93aWV0cnpueScsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMS41IHB4LTMgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTUwIGJnLXNreS00MDAgaG92ZXI6Ymctc2t5LTMwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgPlxuICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgT3B0eW1hbGl6dWogcG9kIHN0YWJpbG5lIDYwIEZQUyAoTW9iaWxlIFVSUClcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvYXNpZGU+XG4gICk7XG59O1xuXG4iXX0=