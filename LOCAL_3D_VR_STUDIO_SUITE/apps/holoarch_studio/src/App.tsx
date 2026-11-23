const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport9_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport9_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch_studio/node_modules/.vite/deps/react.js?v=c1c4f681";
import { Check, Cloud, Copy, Cpu, Download, FileCode, FileText, HardDrive, Image as ImageIcon, Layers, Palette, RefreshCw, Search, Smartphone, Sparkles, Sun, Tablet, Trash2 } from "/apps/holoarch_studio/node_modules/.vite/deps/lucide-react.js?v=c1c4f681";
import { ARCHITECTURAL_SCENES, HOLOGRAM_PALETTES, SUPPORTED_MOBILE_DEVICES, generateMasterPrompt } from "/apps/holoarch_studio/src/data/arStudioData.ts";
import { HologramViewport3D } from "/apps/holoarch_studio/src/components/HologramViewport3D.tsx";
import { LuxurySpatialDeck } from "/apps/holoarch_studio/src/components/LuxurySpatialDeck.tsx";
import { GeminiStudioHub } from "/apps/holoarch_studio/src/components/GeminiStudioHub.tsx";
import { GoogleDriveWorkspacePanel } from "/apps/holoarch_studio/src/components/GoogleDriveWorkspacePanel.tsx";
import { StudioExtensionsHub } from "/apps/holoarch_studio/src/components/StudioExtensionsHub.tsx";
import { exportProjectToPDF, exportProjectToGLTF, exportProjectToIFC } from "/apps/holoarch_studio/src/utils/exporters.ts";
var _jsxFileName = "/app/applet/src/App.tsx";
import __vite__cjsImport9_react_jsxDevRuntime from "/apps/holoarch_studio/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c1c4f681";
const STORAGE_KEY_CONFIG = "holoarch_ar_studio_config_v1";
const STORAGE_KEY_PROJECTS = "holoarch_ar_saved_projects_v1";
const DEFAULT_CONFIG = {
	sceneId: "skyline_financial",
	customSceneTitle: "",
	towerHeightMultiplier: 1,
	showSpatialAgents: true,
	agentNavMode: "lidar_orbit",
	activeAgentsCount: 4,
	perspectiveFovDeg: 64,
	workspaceMarginPx: 28,
	compositionGrid: "golden_ratio",
	depthOfFieldIntensity: .75,
	horizonOffsetY: 0,
	droneFlightActive: true,
	droneSpeed: 1,
	droneAltitudeM: 1250,
	droneLandscape: "alpine_peaks",
	hobbyAssemblyStep: 12,
	hobbyBlueprintConnectors: true,
	safeClickSoundEnabled: true,
	gyroPitchDeg: 0,
	gyroRollDeg: 0,
	framework: "unity_arfoundation",
	planeDetectionMode: "table_and_floor",
	depthSensorActive: true,
	environmentalLighting: true,
	lightTemperatureK: 4200,
	occlusionEnabled: true,
	parallaxIntensity: .75,
	windowParticlesIntensity: .8,
	modelScale: 1,
	modelRotationY: 25,
	explodedViewFactor: 0,
	wireframeOverlay: false,
	autoRotate: true,
	offlineModeEnabled: true,
	cloudSyncEnabled: true,
	activeReferenceImageId: "ref-100-boardroom",
	activeExtensions: [
		"ext_pbr_glass_ior",
		"ext_led_slab_core",
		"ext_voronoi_lattice",
		"ext_gltf_draco"
	],
	exportFormats: {
		obj: true,
		stl: true,
		pdf: true,
		gltf: true,
		usdz: true,
		ifc: true
	},
	uiSettings: {
		palette: "cyan_blueprint",
		hudDensity: "detailed",
		showPlaneGrid: true,
		showFloatingPanels: true,
		promptLanguage: "pl"
	}
};
function mergeWithDefaultConfig(raw) {
	if (!raw || typeof raw !== "object") return DEFAULT_CONFIG;
	return {
		...DEFAULT_CONFIG,
		...raw,
		exportFormats: {
			...DEFAULT_CONFIG.exportFormats,
			...raw.exportFormats || {}
		},
		uiSettings: {
			...DEFAULT_CONFIG.uiSettings,
			...raw.uiSettings || {}
		}
	};
}
export default function App() {
	const [config, setConfig] = useState(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
			if (saved) {
				return mergeWithDefaultConfig(JSON.parse(saved));
			}
		} catch {}
		return DEFAULT_CONFIG;
	});
	const [savedProjects, setSavedProjects] = useState(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY_PROJECTS);
			if (saved) return JSON.parse(saved);
		} catch {}
		return [{
			id: "preset-skyline",
			name: "Prezentacja Zarządu — Wieżowce na Stole Konferencyjnym",
			updatedAt: "2026-10-26 11:30",
			syncStatus: "Zsynchronizowano w chmurze",
			config: DEFAULT_CONFIG
		}, {
			id: "preset-campus",
			name: "Makieta Podłogowa 1:20 — Kampus Bioklimatyczny",
			updatedAt: "2026-10-25 16:45",
			syncStatus: "Zapisano lokalnie (Offline)",
			config: {
				...DEFAULT_CONFIG,
				sceneId: "eco_atrium",
				modelScale: 1.35,
				lightTemperatureK: 5200,
				uiSettings: {
					...DEFAULT_CONFIG.uiSettings,
					palette: "emerald_matrix"
				}
			}
		}];
	});
	const [screenshots, setScreenshots] = useState([]);
	const [activePromptTab, setActivePromptTab] = useState("pl_master");
	const [copiedKey, setCopiedKey] = useState(null);
	const [statusToast, setStatusToast] = useState(null);
	const [deviceFilter, setDeviceFilter] = useState("ALL");
	const [deviceSearch, setDeviceSearch] = useState("");
	const [newProjectName, setNewProjectName] = useState("");
	const [quickPromptText, setQuickPromptText] = useState("Hologram wysokościowca finansowego 1.35x na blacie konferencyjnym, złote oświetlenie zachodu słońca 3200K, 5 agentów skanujących elewację i rozstrzelone warstwy konstrukcyjne");
	// Real Gemini 3D Space Builder execution state (replaces instant 0.0s local check)
	const [isBuilding3DSpace, setIsBuilding3DSpace] = useState(false);
	const [buildElapsedSec, setBuildElapsedSec] = useState(0);
	const [lastAiSpaceResult, setLastAiSpaceResult] = useState(null);
	const [activeWorkflowStep, setActiveWorkflowStep] = useState(1);
	const [showAgentGuidePanel, setShowAgentGuidePanel] = useState(true);
	const handleApplyPromptTo3DScene = async (e) => {
		e.preventDefault();
		if (!quickPromptText.trim() || isBuilding3DSpace) return;
		setIsBuilding3DSpace(true);
		setBuildElapsedSec(.1);
		const startTs = performance.now();
		const timerInterval = window.setInterval(() => {
			setBuildElapsedSec(Number(((performance.now() - startTs) / 1e3).toFixed(1)));
		}, 100);
		try {
			const response = await fetch("/api/ai/build-3d-space", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					prompt: quickPromptText,
					currentConfig: config
				})
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Błąd komunikacji z serwerem Gemini 3.8 Flash");
			}
			setConfig((prev) => ({
				...prev,
				sceneId: data.sceneId || prev.sceneId,
				customSceneTitle: data.customTitle || prev.customSceneTitle,
				towerHeightMultiplier: typeof data.towerHeightMultiplier === "number" ? Math.max(.6, Math.min(1.8, data.towerHeightMultiplier)) : prev.towerHeightMultiplier,
				explodedViewFactor: typeof data.explodedViewFactor === "number" ? Math.max(0, Math.min(1, data.explodedViewFactor)) : prev.explodedViewFactor,
				lightTemperatureK: typeof data.lightTemperatureK === "number" ? Math.max(2800, Math.min(6500, data.lightTemperatureK)) : prev.lightTemperatureK,
				wireframeOverlay: typeof data.wireframeOverlay === "boolean" ? data.wireframeOverlay : prev.wireframeOverlay,
				showSpatialAgents: true,
				agentNavMode: data.agentNavMode || prev.agentNavMode,
				activeAgentsCount: typeof data.activeAgentsCount === "number" ? Math.max(2, Math.min(6, data.activeAgentsCount)) : prev.activeAgentsCount,
				uiSettings: {
					...prev.uiSettings,
					palette: data.palette || prev.uiSettings.palette
				}
			}));
			const finalSec = data.elapsedSeconds || ((performance.now() - startTs) / 1e3).toFixed(2);
			setLastAiSpaceResult({
				elapsedSeconds: String(finalSec),
				architecturalSummary: data.architecturalSummary || "Zaktualizowano przestrzeń 3D, siatkę NavMesh agentów oraz parametry shadera AR.",
				executionSteps: Array.isArray(data.executionSteps) ? data.executionSteps : [
					"1. Analiza semantyczna promptu przez model Gemini 3.8 Flash",
					"2. Przeliczenie siatki NavMesh i trajektorii agentów przestrzennych 3D",
					"3. Aktualizacja bryły budynku, wysokości kondygnacji i kodu Unity C#"
				],
				modelUsed: "gemini-3.8-flash (Server-Side Structured JSON)"
			});
			setActiveWorkflowStep(3);
			showNotification(`Gemini 3.8 Flash przebudował przestrzeń 3D i trajektorie agentów w ${finalSec} s!`);
		} catch {
			const text = quickPromptText.toLowerCase();
			const updates = { showSpatialAgents: true };
			const uiUpdates = {};
			if (text.includes("kampus") || text.includes("eco") || text.includes("kopuł")) {
				updates.sceneId = "eco_atrium";
			} else if (text.includes("terminal") || text.includes("lotnisk") || text.includes("aero")) {
				updates.sceneId = "aero_hub";
			} else {
				updates.sceneId = "skyline_financial";
			}
			if (text.includes("złot") || text.includes("zachód") || text.includes("3200")) {
				uiUpdates.palette = "amber_gold";
				updates.lightTemperatureK = 3200;
			} else if (text.includes("zielon") || text.includes("szmaragd") || text.includes("lidar")) {
				uiUpdates.palette = "emerald_matrix";
			}
			if (text.includes("warstw") || text.includes("rozstrzel")) {
				updates.explodedViewFactor = .6;
			}
			if (text.includes("elewac")) {
				updates.agentNavMode = "facade_scan";
			} else if (text.includes("patrol") || text.includes("podłog")) {
				updates.agentNavMode = "floor_patrol";
			}
			setConfig((prev) => ({
				...prev,
				...updates,
				uiSettings: {
					...prev.uiSettings,
					...uiUpdates
				}
			}));
			showNotification("Zastosowano parametry na scenie 3D (tryb lokalny Offline)");
		} finally {
			window.clearInterval(timerInterval);
			setIsBuilding3DSpace(false);
		}
	};
	const handleRunGuidedDemoStep = (stepNumber) => {
		setActiveWorkflowStep(stepNumber);
		if (stepNumber === 1) {
			updateConfig({
				sceneId: "skyline_financial",
				modelScale: 1.15,
				towerHeightMultiplier: 1.25,
				explodedViewFactor: 0,
				showSpatialAgents: true,
				agentNavMode: "lidar_orbit",
				activeAgentsCount: 4
			});
			showNotification("Krok 1: Osadzono główny model 3D wieżowców na blacie stołu AR i uruchomiono 4 agentów na orbicie LiDAR.");
		} else if (stepNumber === 2) {
			updateConfig({
				showSpatialAgents: true,
				agentNavMode: "facade_scan",
				activeAgentsCount: 6,
				explodedViewFactor: .55,
				wireframeOverlay: true
			});
			showNotification("Krok 2: Przełączono 6 agentów 3D w tryb Pionowego Skanowania Elewacji i rozstrzelono warstwy konstrukcyjne BIM!");
		} else if (stepNumber === 3) {
			setQuickPromptText("Kampus bioklimatyczny z kopułą geodezyjną 1.4x, szmaragdowy LiDAR, 5 agentów patrolujących blat i podłogę, rozstrzelone warstwy 40%");
			showNotification("Krok 3: Wpisano przykładowy prompt w pasku powyżej — kliknij „Przebuduj Przestrzeń 3D przez Gemini”, aby zobaczyć czas wykonania na żywo!");
		} else if (stepNumber === 4) {
			handleExportPDF();
		}
	};
	// Persist in Offline Storage automatically when offlineModeEnabled is true
	useEffect(() => {
		if (config.offlineModeEnabled) {
			try {
				localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
			} catch {}
		}
	}, [config]);
	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(savedProjects));
		} catch {}
	}, [savedProjects]);
	const updateConfig = (partial) => {
		setConfig((prev) => ({
			...prev,
			...partial
		}));
	};
	const updateUiSettings = (partial) => {
		setConfig((prev) => ({
			...prev,
			uiSettings: {
				...prev.uiSettings,
				...partial
			}
		}));
	};
	const showNotification = (msg) => {
		setStatusToast(msg);
		setTimeout(() => {
			setStatusToast((curr) => curr === msg ? null : curr);
		}, 4500);
	};
	const generatedPrompts = useMemo(() => generateMasterPrompt(config), [config]);
	const activePromptContent = useMemo(() => {
		if (activePromptTab === "pl_master") return generatedPrompts.systemPromptPL;
		if (activePromptTab === "en_master") return generatedPrompts.systemPromptEN;
		if (activePromptTab === "visual_ai") return generatedPrompts.visualPromptEN;
		return generatedPrompts.unityCSharpCode;
	}, [activePromptTab, generatedPrompts]);
	const handleCopyPrompt = (text, key) => {
		navigator.clipboard.writeText(text);
		setCopiedKey(key);
		showNotification("Skopiowano gotowy prompt / kod do schowka");
		setTimeout(() => setCopiedKey(null), 2200);
	};
	const handleCaptureScreenshot = (dataUrl, sceneName) => {
		const newShot = {
			id: `shot-${Date.now()}`,
			title: `Widok AR — ${sceneName}`,
			sceneName,
			timestamp: new Date().toLocaleTimeString("pl-PL", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			}),
			dataUrl,
			resolution: "1920 × 1080 px (HD 3D Canvas)"
		};
		setScreenshots((prev) => [newShot, ...prev]);
	};
	const handleExportPDF = () => {
		const latestShot = screenshots.length > 0 ? screenshots[0].dataUrl : undefined;
		exportProjectToPDF(config, latestShot);
		showNotification("Wygenerowano i pobrano dokumentację techniczną oraz prompt w formacie .PDF");
	};
	const handleSaveCloudProject = (e) => {
		e.preventDefault();
		const title = newProjectName.trim() || `Konfiguracja AR (${ARCHITECTURAL_SCENES.find((s) => s.id === config.sceneId)?.name})`;
		const proj = {
			id: `proj-${Date.now()}`,
			name: title,
			updatedAt: new Date().toLocaleString("pl-PL", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit"
			}),
			syncStatus: config.cloudSyncEnabled ? "Zsynchronizowano w chmurze" : "Zapisano lokalnie (Offline)",
			config: { ...config }
		};
		setSavedProjects((prev) => [proj, ...prev]);
		setNewProjectName("");
		showNotification(config.cloudSyncEnabled ? "Projekt zapisany i zsynchronizowany w chmurze użytkownika" : "Projekt zapisany w pamięci podręcznej trybu Offline");
	};
	const filteredDevices = useMemo(() => {
		return SUPPORTED_MOBILE_DEVICES.filter((d) => {
			const matchesType = deviceFilter === "ALL" || d.formFactor === deviceFilter;
			const q = deviceSearch.trim().toLowerCase();
			const matchesQuery = !q || d.brand.toLowerCase().includes(q) || d.model.toLowerCase().includes(q) || d.depthSensor.toLowerCase().includes(q);
			return matchesType && matchesQuery;
		});
	}, [deviceFilter, deviceSearch]);
	const activeSceneMeta = ARCHITECTURAL_SCENES.find((s) => s.id === config.sceneId) || ARCHITECTURAL_SCENES[0];
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col",
		children: [
			/* @__PURE__ */ _jsxDEV("header", {
				className: "sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-4 bg-[#0B0F17]/95 border-b border-slate-800/90",
				children: [
					/* @__PURE__ */ _jsxDEV("a", {
						href: "#top",
						className: "text-lg font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0",
						children: "HoloArch AR Studio"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 471,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("nav", {
						className: "hidden md:flex items-center gap-6 text-sm font-medium text-slate-300",
						children: [
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#simulator",
								className: "hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0",
								children: "Przestrzeń 3D i Agenci"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 480,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#extensions-gallery",
								className: "hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-amber-300",
								children: "Obrazki i Rozszerzenia (52)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 486,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#gemini-ai-hub",
								className: "hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0",
								children: "Studio Gemini AI"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 492,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#google-drive",
								className: "hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 text-cyan-300",
								children: "Google Drive & Firestore"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 498,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#devices",
								className: "hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0",
								children: "Wspierane Urządzenia"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 504,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 479,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-3 shrink-0",
						children: /* @__PURE__ */ _jsxDEV("button", {
							onClick: handleExportPDF,
							className: "flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors whitespace-nowrap shrink-0",
							children: [/* @__PURE__ */ _jsxDEV(FileText, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 518,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Eksportuj Projekt do PDF" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 519,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 514,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 513,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 469,
				columnNumber: 7
			}, this),
			statusToast && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed bottom-5 right-5 z-50 bg-slate-900 border border-cyan-500/50 text-slate-100 px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 text-xs font-medium",
				children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-4 h-4 text-cyan-400 shrink-0" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 527,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("span", { children: statusToast }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 528,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 526,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("main", {
				id: "top",
				className: "max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14",
				children: [
					/* @__PURE__ */ _jsxDEV("section", {
						id: "simulator",
						className: "space-y-6",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-800/80 pb-6",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "max-w-3xl space-y-2",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center gap-2 text-xs text-cyan-400 font-mono tabular-nums",
											children: [
												/* @__PURE__ */ _jsxDEV("span", { children: "Unity 6 AR Foundation" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 539,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("span", {
													"aria-hidden": "true",
													children: "·"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 540,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("span", { children: "ARKit LiDAR & ARCore Depth API" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 541,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("span", {
													"aria-hidden": "true",
													children: "·"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 542,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("span", { children: [
													"Agenci 3D NavMesh: ",
													config.activeAgentsCount,
													" aktywnych"
												] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 543,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("span", {
													"aria-hidden": "true",
													children: "·"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 544,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("span", { children: ["Tryb Offline: ", config.offlineModeEnabled ? "Aktywny" : "Wył."] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 545,
													columnNumber: 17
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 538,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("h1", {
											className: "text-2xl sm:text-4xl font-bold text-white tracking-tight font-display",
											style: { textWrap: "balance" },
											children: "Symulator Hologramów Architektonicznych 3D i Autonomicznych Agentów Przestrzennych"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 547,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("p", {
											className: "text-sm sm:text-base text-slate-300 leading-relaxed",
											children: [
												"Główny model 3D znajduje się bezpośrednio w centralnym oknie projekcyjnym poniżej. Wokół budynków poruszają się w czasie rzeczywistym autonomiczni agenci skanujący (`AG-01` – `AG-06`) oparci na siatce ",
												/* @__PURE__ */ _jsxDEV("strong", { children: "3D NavMesh / Waypoint Graph" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 556,
													columnNumber: 54
												}, this),
												" ",
												"oraz czujnikach głębi stołu i podłogi."
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 553,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 537,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex flex-wrap items-center gap-2 shrink-0",
									children: ARCHITECTURAL_SCENES.map((scene) => {
										const active = config.sceneId === scene.id;
										return /* @__PURE__ */ _jsxDEV("button", {
											onClick: () => updateConfig({
												sceneId: scene.id,
												customSceneTitle: ""
											}),
											className: `px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${active ? "bg-cyan-500/15 border-cyan-400 text-cyan-300" : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"}`,
											children: scene.name
										}, scene.id, false, {
											fileName: _jsxFileName,
											lineNumber: 566,
											columnNumber: 19
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 562,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 536,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 space-y-4",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex flex-wrap items-center justify-between gap-3",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ _jsxDEV(Cpu, { className: "w-4 h-4 text-cyan-400 shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 586,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("h2", {
											className: "text-xs sm:text-sm font-semibold text-white",
											children: "Na jakiej bazie poruszają się Agenci w AI Studio i Przestrzeni 3D oraz Jak Pracować (Krok po Kroku)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 587,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 585,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => setShowAgentGuidePanel((prev) => !prev),
										className: "text-xs text-cyan-400 hover:text-cyan-300 font-medium",
										children: showAgentGuidePanel ? "Ukryj panel przewodnika ▲" : "Pokaż przewodnik i sterowanie agentami ▼"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 591,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 584,
									columnNumber: 13
								}, this), showAgentGuidePanel && /* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2 border-t border-slate-800/80",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "lg:col-span-5 bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-2.5 text-xs",
											children: [
												/* @__PURE__ */ _jsxDEV("div", {
													className: "font-semibold text-cyan-300",
													children: "1. Baza ruchu agentów (2 warstwy technologiczne):"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 604,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ _jsxDEV("p", {
													className: "text-slate-300 leading-relaxed",
													children: [
														/* @__PURE__ */ _jsxDEV("strong", {
															className: "text-white",
															children: "A) W silniku Gemini AI Studio (Backend):"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 608,
															columnNumber: 21
														}, this),
														" ",
														"Agenci poruszają się w pętli ",
														/* @__PURE__ */ _jsxDEV("strong", { children: "ReAct (Reason + Act)" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 609,
															columnNumber: 50
														}, this),
														" oraz",
														" ",
														/* @__PURE__ */ _jsxDEV("strong", { children: "Interactions API" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 610,
															columnNumber: 21
														}, this),
														" (`gemini-3.8-flash` / `gemini-omni-1.1-flash`). Odbierają Twój prompt, planują kroki i zwracają ustrukturyzowany schemat JSON. Wcześniej górny pasek wykonywał tylko lokalny skrypt JS (`0.0 s`) — teraz wywołuje pełny model Gemini na serwerze z licznikiem czasu na żywo (`1.2 s – 3.5 s`)."
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 607,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ _jsxDEV("p", {
													className: "text-slate-300 leading-relaxed",
													children: [
														/* @__PURE__ */ _jsxDEV("strong", {
															className: "text-white",
															children: "B) W przestrzeni 3D AR / Unity (Viewport):"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 616,
															columnNumber: 21
														}, this),
														" ",
														"Agenci (`AG-01`..`AG-06` widoczni na scenie poniżej) poruszają się po",
														" ",
														/* @__PURE__ */ _jsxDEV("strong", { children: "siatce nawigacyjnej 3D NavMesh, grafie punktów (Waypoint Splines)" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 618,
															columnNumber: 21
														}, this),
														" ",
														"oraz promieniach ",
														/* @__PURE__ */ _jsxDEV("strong", { children: "AR Raycasting" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 619,
															columnNumber: 38
														}, this),
														" rzutowanych na wykryty blat stołu (`PlaneClassification.Table`) i podłogę (`Floor`)."
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 615,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 603,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "lg:col-span-4 bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-3 text-xs",
											children: [
												/* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "font-semibold text-amber-300",
														children: "2. Sterowanie Agentami 3D i Bryłą na Żywo:"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 627,
														columnNumber: 21
													}, this), /* @__PURE__ */ _jsxDEV("label", {
														className: "flex items-center gap-1.5 cursor-pointer text-slate-300",
														children: [/* @__PURE__ */ _jsxDEV("input", {
															type: "checkbox",
															checked: config.showSpatialAgents !== false,
															onChange: (e) => updateConfig({ showSpatialAgents: e.target.checked }),
															className: "accent-cyan-500 rounded"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 631,
															columnNumber: 23
														}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pokaż Agentów 3D" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 637,
															columnNumber: 23
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 630,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 626,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
													className: "block text-slate-400 mb-1",
													children: "Baza trajektorii agentów (3D NavMesh Mode):"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 642,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("div", {
													className: "grid grid-cols-3 gap-1.5",
													children: [
														{
															id: "lidar_orbit",
															label: "Orbita LiDAR"
														},
														{
															id: "facade_scan",
															label: "Skan Elewacji"
														},
														{
															id: "floor_patrol",
															label: "Patrol Blatu"
														}
													].map((mode) => /* @__PURE__ */ _jsxDEV("button", {
														type: "button",
														onClick: () => updateConfig({
															agentNavMode: mode.id,
															showSpatialAgents: true
														}),
														className: `px-2 py-1.5 rounded border text-[11px] font-medium transition-colors ${(config.agentNavMode || "lidar_orbit") === mode.id ? "bg-cyan-500/20 border-cyan-400 text-cyan-200" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"}`,
														children: mode.label
													}, mode.id, false, {
														fileName: _jsxFileName,
														lineNumber: 651,
														columnNumber: 25
													}, this))
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 645,
													columnNumber: 21
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 641,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ _jsxDEV("div", {
													className: "grid grid-cols-2 gap-3 pt-1",
													children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
														className: "flex justify-between text-slate-300 mb-1",
														children: [/* @__PURE__ */ _jsxDEV("span", { children: "Liczba agentów:" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 675,
															columnNumber: 25
														}, this), /* @__PURE__ */ _jsxDEV("span", {
															className: "font-mono text-cyan-400 tabular-nums",
															children: config.activeAgentsCount || 4
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 676,
															columnNumber: 25
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 674,
														columnNumber: 23
													}, this), /* @__PURE__ */ _jsxDEV("input", {
														type: "range",
														min: 2,
														max: 6,
														step: 1,
														value: config.activeAgentsCount || 4,
														onChange: (e) => updateConfig({
															activeAgentsCount: parseInt(e.target.value, 10),
															showSpatialAgents: true
														}),
														className: "w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 680,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 673,
														columnNumber: 21
													}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
														className: "flex justify-between text-slate-300 mb-1",
														children: [/* @__PURE__ */ _jsxDEV("span", { children: "Wysokość bryły:" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 698,
															columnNumber: 25
														}, this), /* @__PURE__ */ _jsxDEV("span", {
															className: "font-mono text-amber-400 tabular-nums",
															children: [(config.towerHeightMultiplier || 1).toFixed(2), "x"]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 699,
															columnNumber: 25
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 697,
														columnNumber: 23
													}, this), /* @__PURE__ */ _jsxDEV("input", {
														type: "range",
														min: .6,
														max: 1.7,
														step: .05,
														value: config.towerHeightMultiplier || 1,
														onChange: (e) => updateConfig({ towerHeightMultiplier: parseFloat(e.target.value) }),
														className: "w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 703,
														columnNumber: 23
													}, this)] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 696,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 672,
													columnNumber: 19
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 625,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "lg:col-span-3 bg-slate-950/80 border border-slate-800/90 rounded-lg p-3.5 space-y-2 text-xs flex flex-col justify-between",
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "font-semibold text-emerald-300",
												children: "3. Pokaż jak pracować (Kliknij krok):"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 722,
												columnNumber: 19
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "space-y-1.5",
												children: [
													{
														step: 1,
														label: "Krok 1: Osadź model 3D i 4 agentów LiDAR"
													},
													{
														step: 2,
														label: "Krok 2: Włącz skan elewacji + rozstrzel warstwy"
													},
													{
														step: 3,
														label: "Krok 3: Załaduj prompt AI dla przestrzeni 3D"
													},
													{
														step: 4,
														label: "Krok 4: Pobierz raport PDF / siatkę .OBJ"
													}
												].map((item) => /* @__PURE__ */ _jsxDEV("button", {
													type: "button",
													onClick: () => handleRunGuidedDemoStep(item.step),
													className: `w-full text-left px-2.5 py-1.5 rounded border transition-colors flex items-center justify-between ${activeWorkflowStep === item.step ? "bg-emerald-500/15 border-emerald-400 text-emerald-200 font-semibold" : "bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700"}`,
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "truncate",
														children: item.label
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 754,
														columnNumber: 25
													}, this), /* @__PURE__ */ _jsxDEV("span", {
														className: "font-mono text-[10px] text-emerald-400 shrink-0 ml-1",
														children: "Uruchom →"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 755,
														columnNumber: 25
													}, this)]
												}, item.step, true, {
													fileName: _jsxFileName,
													lineNumber: 744,
													columnNumber: 23
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 725,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 721,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 601,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 583,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("form", {
								onSubmit: handleApplyPromptTo3DScene,
								className: "bg-slate-900/90 border border-cyan-500/40 rounded-xl p-4 shadow-lg space-y-3",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex flex-wrap items-center justify-between gap-2",
										children: [/* @__PURE__ */ _jsxDEV("label", {
											htmlFor: "main-prompt-input",
											className: "text-xs sm:text-sm font-semibold text-cyan-300 flex items-center gap-2",
											children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 776,
												columnNumber: 17
											}, this), /* @__PURE__ */ _jsxDEV("span", { children: "KREATOR PRZESTRZENI 3D GEMINI AI (Wpisz polecenie, aby przebudować model 3D i ruch agentów):" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 777,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 772,
											columnNumber: 15
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center gap-3 text-xs font-mono tabular-nums",
											children: isBuilding3DSpace ? /* @__PURE__ */ _jsxDEV("span", {
												className: "text-amber-300 font-semibold",
												children: [
													"Gemini 3.8 Flash przetwarza przestrzeń 3D: ",
													buildElapsedSec.toFixed(1),
													" s..."
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 783,
												columnNumber: 19
											}, this) : lastAiSpaceResult ? /* @__PURE__ */ _jsxDEV("span", {
												className: "text-emerald-400",
												children: [
													"Ostatnie wykonanie Gemini AI: ",
													lastAiSpaceResult.elapsedSeconds,
													" s"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 787,
												columnNumber: 19
											}, this) : /* @__PURE__ */ _jsxDEV("a", {
												href: "#gemini-ai-hub",
												className: "text-cyan-400 hover:underline font-sans",
												children: "Przejdź do Generatora Obrazów 2D / Wideo MP4 ↓"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 791,
												columnNumber: 19
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 781,
											columnNumber: 15
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 771,
										columnNumber: 13
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex flex-col sm:flex-row gap-2.5",
										children: [
											/* @__PURE__ */ _jsxDEV("input", {
												id: "main-prompt-input",
												type: "text",
												value: quickPromptText,
												onChange: (e) => setQuickPromptText(e.target.value),
												placeholder: "Wpisz opis przestrzeni 3D, np.: Wysokościowiec 1.5x, złote światło 3000K, 6 agentów skanujących elewację, rozstrzelone warstwy...",
												className: "flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 799,
												columnNumber: 15
											}, this),
											/* @__PURE__ */ _jsxDEV("button", {
												type: "submit",
												disabled: isBuilding3DSpace,
												className: "px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-2",
												children: isBuilding3DSpace ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(RefreshCw, { className: "w-4 h-4 animate-spin" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 814,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("span", { children: [
													"Budowanie 3D (",
													buildElapsedSec.toFixed(1),
													" s)..."
												] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 815,
													columnNumber: 21
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 813,
													columnNumber: 19
												}, this) : /* @__PURE__ */ _jsxDEV("span", { children: "Przebuduj Przestrzeń 3D przez Gemini" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 818,
													columnNumber: 19
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 807,
												columnNumber: 15
											}, this),
											/* @__PURE__ */ _jsxDEV("a", {
												href: "#gemini-ai-hub",
												className: "px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-medium text-xs sm:text-sm rounded-lg transition-colors text-center whitespace-nowrap shrink-0",
												children: "Studio AI (Czat / Obraz / Wideo)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 821,
												columnNumber: 15
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 798,
										columnNumber: 13
									}, this),
									lastAiSpaceResult && /* @__PURE__ */ _jsxDEV("div", {
										className: "bg-slate-950/90 border border-emerald-500/30 rounded-lg p-3 text-xs space-y-1.5",
										children: [
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ _jsxDEV("span", {
													className: "font-semibold text-emerald-300",
													children: [
														"Raport wykonania agenta ",
														lastAiSpaceResult.modelUsed,
														":"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 833,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "font-mono text-emerald-400 tabular-nums",
													children: [
														"Czas wnioskowania API: ",
														lastAiSpaceResult.elapsedSeconds,
														" s"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 836,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 832,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("p", {
												className: "text-slate-200",
												children: lastAiSpaceResult.architecturalSummary
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 840,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex flex-wrap gap-2 pt-1",
												children: lastAiSpaceResult.executionSteps.map((step, idx) => /* @__PURE__ */ _jsxDEV("span", {
													className: "px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300",
													children: step
												}, idx, false, {
													fileName: _jsxFileName,
													lineNumber: 843,
													columnNumber: 21
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 841,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 831,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 767,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(HologramViewport3D, {
								config,
								onUpdateConfig: updateConfig,
								onCaptureScreenshot: handleCaptureScreenshot,
								onExportMessage: showNotification
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 856,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(LuxurySpatialDeck, {
								config,
								onUpdateConfig: updateConfig,
								onUpdatePalette: (pal) => updateUiSettings({ palette: pal }),
								onNotify: showNotification
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 864,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "lg:col-span-7 bg-slate-900/60 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center justify-between gap-4",
												children: [/* @__PURE__ */ _jsxDEV("span", {
													className: "text-xs font-medium text-cyan-400",
													children: "Specyfikacja aktywnej sceny 3D"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 876,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "text-xs text-slate-400 font-mono tabular-nums",
													children: [
														activeSceneMeta.partsCount,
														" modułów · ",
														activeSceneMeta.verticesEstimate,
														" wierzchołków · Pow.",
														" ",
														activeSceneMeta.footprintSqm.toLocaleString("pl-PL"),
														" m²"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 879,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 875,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("h3", {
												className: "text-lg font-semibold text-white",
												children: activeSceneMeta.name
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 884,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("p", {
												className: "text-xs sm:text-sm text-slate-300 leading-relaxed",
												children: activeSceneMeta.description
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 885,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 874,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 mt-4 border-t border-slate-800/80 text-xs",
										children: activeSceneMeta.layers.map((layerName, idx) => /* @__PURE__ */ _jsxDEV("div", {
											className: "space-y-1",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "font-mono text-slate-400 tabular-nums",
												children: ["Warstwa 0", idx + 1]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 893,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("p", {
												className: "text-slate-200 font-medium leading-snug",
												children: layerName
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 896,
												columnNumber: 21
											}, this)]
										}, idx, true, {
											fileName: _jsxFileName,
											lineNumber: 892,
											columnNumber: 19
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 890,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 873,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "lg:col-span-5 bg-slate-900/60 border border-slate-800/90 rounded-xl p-5 space-y-3",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
											className: "text-sm font-semibold text-white",
											children: "Galeria Zrzutów Ekranu i Obraz Wzorcowy AR"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 906,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-xs text-slate-400",
											children: "Zrzuty zapisywane są bezpośrednio do urządzenia oraz do raportu PDF"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 909,
											columnNumber: 19
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 905,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs font-mono text-cyan-400 tabular-nums",
											children: [screenshots.length, " zapisanych"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 913,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 904,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "group relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950",
											children: [/* @__PURE__ */ _jsxDEV("img", {
												src: "/apps/holoarch_studio/assets/aistudio/Dashboard_dex_eeffcbc7.jpg",
												alt: "Wzorcowy stół konferencyjny AR z hologramem",
												referrerPolicy: "no-referrer",
												className: "w-full h-28 object-cover"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 921,
												columnNumber: 19
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "p-2 bg-slate-950/90",
												children: [/* @__PURE__ */ _jsxDEV("p", {
													className: "text-xs font-medium text-slate-200 truncate",
													children: "Wzorzec: Stół Konferencyjny AR"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 928,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("p", {
													className: "text-[11px] text-slate-400 font-mono tabular-nums",
													children: "Załączony plik referencyjny"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 931,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 927,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 920,
											columnNumber: 17
										}, this), screenshots.length > 0 ? /* @__PURE__ */ _jsxDEV("div", {
											className: "relative rounded-lg overflow-hidden border border-cyan-500/40 bg-slate-950",
											children: [/* @__PURE__ */ _jsxDEV("img", {
												src: screenshots[0].dataUrl,
												alt: screenshots[0].title,
												referrerPolicy: "no-referrer",
												className: "w-full h-28 object-cover"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 940,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "p-2 bg-slate-950/90 flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ _jsxDEV("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ _jsxDEV("p", {
														className: "text-xs font-medium text-cyan-300 truncate",
														children: screenshots[0].title
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 948,
														columnNumber: 25
													}, this), /* @__PURE__ */ _jsxDEV("p", {
														className: "text-[11px] text-slate-400 font-mono tabular-nums",
														children: screenshots[0].timestamp
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 951,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 947,
													columnNumber: 23
												}, this), /* @__PURE__ */ _jsxDEV("a", {
													href: screenshots[0].dataUrl,
													download: `HoloArch_${screenshots[0].id}.png`,
													className: "p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md shrink-0",
													title: "Pobierz ponownie do galerii",
													children: /* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 961,
														columnNumber: 25
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 955,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 946,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 939,
											columnNumber: 19
										}, this) : /* @__PURE__ */ _jsxDEV("div", {
											className: "rounded-lg border border-dashed border-slate-800 bg-slate-950/50 p-3 flex flex-col items-center justify-center text-center h-[160px]",
											children: [
												/* @__PURE__ */ _jsxDEV(ImageIcon, { className: "w-5 h-5 text-slate-500 mb-1.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 967,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("p", {
													className: "text-xs font-medium text-slate-300",
													children: "Brak zrzutów z sesji"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 968,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("p", {
													className: "text-[11px] text-slate-500 mt-0.5",
													children: "Kliknij „Zrzut do galerii” w dolnym doku 3D, aby zapisać kadr AR"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 969,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 966,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 918,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 903,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 872,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 535,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV(StudioExtensionsHub, {
						config,
						onUpdateConfig: updateConfig,
						onUpdatePalette: (pal) => updateUiSettings({ palette: pal }),
						onApplyPresetPrompt: (promptText) => setQuickPromptText(promptText),
						onNotify: showNotification
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 980,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV(GeminiStudioHub, {
						latestScreenshot: screenshots[0],
						defaultVisualPrompt: generatedPrompts.visualPromptEN,
						onNotify: showNotification
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 989,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("section", {
						id: "prompt-studio",
						className: "space-y-6 pt-4 border-t border-slate-800/80",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "text-xs text-amber-400 font-mono",
										children: "01. Inżynieria Promptów AR / Unity 6 / AI Generators"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 999,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("h2", {
										className: "text-2xl font-bold text-white font-display",
										children: "Jak napisać skutecznego prompta dla hologramów architektonicznych AR"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1002,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "text-sm text-slate-300 max-w-3xl",
										children: "Aby model AI (np. Claude, GPT-4o, Gemini, Cursor) lub generator wizualny wygenerował kompletną aplikację Unity z obsługą czujników głębi ARKit/ARCore, prompt musi być podzielony na 6 precyzyjnych bloków architektonicznych. Poniższy generator reaguje na żywo na Twoje ustawienia z symulatora."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1005,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 998,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0",
								children: [
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setActivePromptTab("pl_master"),
										className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activePromptTab === "pl_master" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
										children: "Prompt Systemowy (PL)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1015,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setActivePromptTab("en_master"),
										className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activePromptTab === "en_master" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
										children: "System Prompt (EN)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1025,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setActivePromptTab("visual_ai"),
										className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activePromptTab === "visual_ai" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
										children: "Wizualizacja AI (Midjourney)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1035,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setActivePromptTab("unity_csharp"),
										className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activePromptTab === "unity_csharp" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
										children: "Kod Unity C# (AR Foundation)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1045,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1014,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 997,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "lg:col-span-5 space-y-3",
								children: [/* @__PURE__ */ _jsxDEV("h3", {
									className: "text-sm font-semibold text-slate-200",
									children: "Anatomia idealnego prompta (6 modułów wymaganych w specyfikacji):"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1061,
									columnNumber: 15
								}, this), [
									{
										num: "01",
										title: "Detekcja blatów i podłóg przez czujniki głębi (ARKit / ARCore)",
										desc: "Wymuś użycie ARPlaneManager (Horizontal) połączonego z AROcclusionManager (ToF / LiDAR Depth API) oraz klasyfikacją semantyczną PlaneClassification.Table i Floor."
									},
									{
										num: "02",
										title: "Silnik Unity URP, Oświetlenie Środowiskowe i Okluzja",
										desc: "Określ subskrypcję zdarzenia ARCameraManager.frameReceived do odczytu temperatury barwowej (K), kierunku światła i okluzji głębi (EnvironmentDepthMode.Best)."
									},
									{
										num: "03",
										title: "Paralaksa 6DoF oraz efekty cząsteczkowe za oknami",
										desc: "Zdefiniuj wielowarstwową paralaksę (mapa w blacie -> hologram budynku -> panele HUD) oraz system cząsteczek Unity VFX Graph za płaszczyznami okien."
									},
									{
										num: "04",
										title: "Sterowanie dotykowe, płynne przejścia scen i zrzuty ekranu",
										desc: "Wskaż EnhancedTouch API (Pinch-to-scale 2 palcami, obrót wokół osi Y), animacje przejść (SmoothStep + Dissolve Shader) i zapis do MediaStore / PHPhotoLibrary."
									},
									{
										num: "05",
										title: "Tryb Offline, synchronizacja w chmurze oraz eksport OBJ/STL/PDF",
										desc: "Zażądaj lokalnego cache w Application.persistentDataPath (praca bez sieci), synchronizacji Cloud Anchors oraz serializacji siatek MeshFilter do .OBJ, .STL i raportu .PDF."
									},
									{
										num: "06",
										title: "Personalizacja UI oraz lista wspieranych urządzeń Android",
										desc: "Uwzględnij przełącznik palet shaderów, gęstości interfejsu oraz docelową macierz tabletów (Galaxy Tab S9 Ultra, OnePlus Pad 2) i smartfonów z sensorem ToF."
									}
								].map((item) => /* @__PURE__ */ _jsxDEV("div", {
									className: "p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs font-mono font-semibold text-cyan-400 tabular-nums",
											children: [item.num, "."]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1102,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("h4", {
											className: "text-xs sm:text-sm font-semibold text-white",
											children: item.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1105,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1101,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("p", {
										className: "text-xs text-slate-400 leading-relaxed pl-6",
										children: item.desc
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1107,
										columnNumber: 19
									}, this)]
								}, item.num, true, {
									fileName: _jsxFileName,
									lineNumber: 1097,
									columnNumber: 17
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1060,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "lg:col-span-7 bg-[#070A10] border border-slate-800 rounded-xl overflow-hidden",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-900/90 border-b border-slate-800",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-2 text-xs text-slate-300 font-mono",
										children: [/* @__PURE__ */ _jsxDEV(FileCode, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1116,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: generatedPrompts.title }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1117,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1115,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ _jsxDEV("button", {
											onClick: () => handleCopyPrompt(activePromptContent, activePromptTab),
											className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors whitespace-nowrap shrink-0",
											children: copiedKey === activePromptTab ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1127,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Skopiowano!" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1128,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1126,
												columnNumber: 23
											}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1132,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Kopiuj gotowy prompt" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1133,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1131,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1121,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1120,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1114,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("pre", {
									className: "p-5 text-xs sm:text-[13px] font-mono text-slate-200 leading-relaxed overflow-x-auto max-h-[540px] overflow-y-auto whitespace-pre-wrap",
									children: activePromptContent
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1140,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1113,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1058,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 996,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("section", {
						id: "ar-parameters",
						className: "space-y-6 pt-4 border-t border-slate-800/80",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-xs text-cyan-400 font-mono",
								children: "02. Konfiguracja Sprzętowa ARKit / ARCore i Moduł Eksportu"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1150,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("h2", {
								className: "text-2xl font-bold text-white font-display",
								children: "Parametry czujników głębi, oświetlenia środowiskowego i formatów eksportu"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1153,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1149,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-6",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxDEV("h3", {
											className: "text-base font-semibold text-white flex items-center gap-2",
											children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1163,
												columnNumber: 19
											}, this), "Detekcja Blatów i Podłóg"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1162,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs font-mono text-cyan-400",
											children: "ARPlaneManager"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1166,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1161,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "space-y-3 text-xs",
										children: [
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
												className: "block text-slate-300 mb-1.5 font-medium",
												children: "Docelowy Framework AR:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1171,
												columnNumber: 19
											}, this), /* @__PURE__ */ _jsxDEV("select", {
												value: config.framework,
												onChange: (e) => updateConfig({ framework: e.target.value }),
												className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500",
												children: [
													/* @__PURE__ */ _jsxDEV("option", {
														value: "unity_arfoundation",
														children: "Unity 6 AR Foundation (ARKit + ARCore Cross-Platform)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1183,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "arcore_native",
														children: "Google ARCore Extensions (Android Depth & Planes)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1186,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "arkit_native",
														children: "Apple ARKit 6 LiDAR Scene Reconstruction"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1189,
														columnNumber: 21
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1174,
												columnNumber: 19
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1170,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
												className: "block text-slate-300 mb-1.5 font-medium",
												children: "Tryb rozpoznawania powierzchni:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1196,
												columnNumber: 19
											}, this), /* @__PURE__ */ _jsxDEV("select", {
												value: config.planeDetectionMode,
												onChange: (e) => updateConfig({ planeDetectionMode: e.target.value }),
												className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500",
												children: [
													/* @__PURE__ */ _jsxDEV("option", {
														value: "table_and_floor",
														children: "Powierzchnie Blatu Stołu + Podłogi (Horizontal Dual)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1208,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "table_only",
														children: "Wyłącznie podwyższone blaty stołów i biurek (Tabletop)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1211,
														columnNumber: 21
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "full_spatial",
														children: "Pełna siatka pomieszczenia (Blat + Podłoga + Okna)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1214,
														columnNumber: 21
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1199,
												columnNumber: 19
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1195,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("label", {
												className: "flex items-center justify-between pt-2 cursor-pointer",
												children: [/* @__PURE__ */ _jsxDEV("span", {
													className: "text-slate-300",
													children: "Aktywuj czujnik głębi ToF / LiDAR"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1221,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("input", {
													type: "checkbox",
													checked: config.depthSensorActive,
													onChange: (e) => updateConfig({ depthSensorActive: e.target.checked }),
													className: "w-4 h-4 accent-cyan-500 rounded"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1222,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1220,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("label", {
												className: "flex items-center justify-between cursor-pointer",
												children: [/* @__PURE__ */ _jsxDEV("span", {
													className: "text-slate-300",
													children: "Widoczna siatka konstrukcyjna Wireframe"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1231,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("input", {
													type: "checkbox",
													checked: config.wireframeOverlay,
													onChange: (e) => updateConfig({ wireframeOverlay: e.target.checked }),
													className: "w-4 h-4 accent-cyan-500 rounded"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1232,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1230,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1169,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1160,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxDEV("h3", {
											className: "text-base font-semibold text-white flex items-center gap-2",
											children: [/* @__PURE__ */ _jsxDEV(Sun, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1246,
												columnNumber: 19
											}, this), "Oświetlenie i Okluzja"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1245,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs font-mono text-amber-400",
											children: "HDR Light Est."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1249,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1244,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "space-y-3.5 text-xs",
										children: [
											/* @__PURE__ */ _jsxDEV("label", {
												className: "flex items-center justify-between cursor-pointer",
												children: [/* @__PURE__ */ _jsxDEV("span", {
													className: "text-slate-300 font-medium",
													children: "Oświetlenie środowiskowe na żywo (HDR)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1254,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("input", {
													type: "checkbox",
													checked: config.environmentalLighting,
													onChange: (e) => updateConfig({ environmentalLighting: e.target.checked }),
													className: "w-4 h-4 accent-amber-400 rounded"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1257,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1253,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { children: [
												/* @__PURE__ */ _jsxDEV("div", {
													className: "flex justify-between text-slate-300 mb-1",
													children: [/* @__PURE__ */ _jsxDEV("span", { children: "Temperatura barwowa otoczenia:" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1267,
														columnNumber: 21
													}, this), /* @__PURE__ */ _jsxDEV("span", {
														className: "font-mono tabular-nums text-amber-400",
														children: [config.lightTemperatureK, " K"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1268,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1266,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ _jsxDEV("input", {
													type: "range",
													min: 2800,
													max: 6500,
													step: 100,
													value: config.lightTemperatureK,
													onChange: (e) => updateConfig({ lightTemperatureK: parseInt(e.target.value, 10) }),
													className: "w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1272,
													columnNumber: 19
												}, this),
												/* @__PURE__ */ _jsxDEV("div", {
													className: "flex justify-between text-[11px] text-slate-500 mt-1",
													children: [
														/* @__PURE__ */ _jsxDEV("span", { children: "2800K (Zachód słońca)" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1284,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ _jsxDEV("span", { children: "4500K (Biuro)" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1285,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ _jsxDEV("span", { children: "6500K (Dzień)" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1286,
															columnNumber: 21
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1283,
													columnNumber: 19
												}, this)
											] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1265,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("label", {
												className: "flex items-center justify-between pt-1 cursor-pointer",
												children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
													className: "text-slate-300 font-medium block",
													children: "Okluzja głębi obiektów (AROcclusion)"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1292,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "text-[11px] text-slate-400",
													children: "Przedmioty na blacie (kubek, tablet) przysłaniają hologram"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1295,
													columnNumber: 21
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1291,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("input", {
													type: "checkbox",
													checked: config.occlusionEnabled,
													onChange: (e) => updateConfig({ occlusionEnabled: e.target.checked }),
													className: "w-4 h-4 accent-cyan-500 rounded shrink-0"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1299,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1290,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1252,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1243,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "space-y-3",
										children: [
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ _jsxDEV("h3", {
													className: "text-base font-semibold text-white flex items-center gap-2",
													children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1314,
														columnNumber: 21
													}, this), "Eksport CAD i Dokumentacji"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1313,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "text-xs font-mono text-slate-400",
													children: "OBJ · STL · PDF"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1317,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1312,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("p", {
												className: "text-xs text-slate-300 leading-relaxed",
												children: "Uwzględnij w prompcie oraz wyeksportuj bezpośrednio z bieżącej sceny siatkę architektoniczną do programów CAD/Blender, druku 3D lub raportu PDF."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1320,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "space-y-2 text-xs pt-1",
												children: [/* @__PURE__ */ _jsxDEV("label", {
													className: "flex items-center justify-between cursor-pointer",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "text-slate-300",
														children: "Wsparcie eksportu Wavefront (.OBJ)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1327,
														columnNumber: 21
													}, this), /* @__PURE__ */ _jsxDEV("input", {
														type: "checkbox",
														checked: config.exportFormats.obj,
														onChange: (e) => updateConfig({ exportFormats: {
															...config.exportFormats,
															obj: e.target.checked
														} }),
														className: "w-4 h-4 accent-cyan-500 rounded"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1328,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1326,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("label", {
													className: "flex items-center justify-between cursor-pointer",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "text-slate-300",
														children: "Wsparcie eksportu druku 3D (.STL)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1340,
														columnNumber: 21
													}, this), /* @__PURE__ */ _jsxDEV("input", {
														type: "checkbox",
														checked: config.exportFormats.stl,
														onChange: (e) => updateConfig({ exportFormats: {
															...config.exportFormats,
															stl: e.target.checked
														} }),
														className: "w-4 h-4 accent-cyan-500 rounded"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1341,
														columnNumber: 21
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1339,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1325,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1311,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "pt-3 border-t border-slate-800 flex flex-col gap-2",
										children: [/* @__PURE__ */ _jsxDEV("button", {
											onClick: handleExportPDF,
											className: "w-full py-2.5 px-4 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors flex items-center justify-center gap-2",
											children: [/* @__PURE__ */ _jsxDEV(FileText, { className: "w-4 h-4" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1360,
												columnNumber: 19
											}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pobierz Zaawansowany Raport i Prompt (.PDF)" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1361,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1356,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "grid grid-cols-2 gap-2",
											children: [/* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => {
													const res = exportProjectToGLTF(config);
													showNotification(`Wyeksportowano .GLTF 2.0 (${res.nodeCount} węzłów PBR Transmission)`);
												},
												className: "py-2 px-3 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg transition-colors",
												children: "Eksport .GLTF 2.0"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1364,
												columnNumber: 19
											}, this), /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => {
													exportProjectToIFC(config);
													showNotification("Wyeksportowano plik BIM .IFC (Level 400)");
												},
												className: "py-2 px-3 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg transition-colors",
												children: "Eksport BIM .IFC"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1376,
												columnNumber: 19
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1363,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1355,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1310,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1158,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1148,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("section", {
						id: "personalization",
						className: "space-y-6 pt-4 border-t border-slate-800/80",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs text-amber-400 font-mono",
									children: "03. Personalizacja Interfejsu, Praca Offline i Synchronizacja Chmury"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1395,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("h2", {
									className: "text-2xl font-bold text-white font-display",
									children: "Ustawienia personalizacji HUD oraz moduł synchronizacji projektów między urządzeniami"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1398,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1394,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ _jsxDEV("h3", {
												className: "text-base font-semibold text-white flex items-center gap-2",
												children: [/* @__PURE__ */ _jsxDEV(Palette, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1408,
													columnNumber: 19
												}, this), "Menu Personalizacji Interfejsu i Shadera AR"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1407,
												columnNumber: 17
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "text-xs text-slate-400",
												children: "Motyw wizualny"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1411,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1406,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
											children: Object.keys(HOLOGRAM_PALETTES).map((palKey) => {
												const pal = HOLOGRAM_PALETTES[palKey];
												const isSelected = config.uiSettings.palette === palKey;
												return /* @__PURE__ */ _jsxDEV("button", {
													onClick: () => updateUiSettings({ palette: palKey }),
													className: `p-3 rounded-lg border text-left transition-all flex items-center justify-between ${isSelected ? "bg-slate-800/90 border-cyan-400" : "bg-slate-950/70 border-slate-800 hover:border-slate-700"}`,
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "text-xs font-medium text-slate-200",
														children: pal.name
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1428,
														columnNumber: 23
													}, this), /* @__PURE__ */ _jsxDEV("span", {
														className: "flex items-center gap-1.5 shrink-0",
														children: [/* @__PURE__ */ _jsxDEV("span", {
															className: "w-3.5 h-3.5 rounded-full border border-white/20",
															style: { backgroundColor: pal.primaryHex }
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1430,
															columnNumber: 25
														}, this), /* @__PURE__ */ _jsxDEV("span", {
															className: "w-3.5 h-3.5 rounded-full border border-white/20",
															style: { backgroundColor: pal.secondaryHex }
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1434,
															columnNumber: 25
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1429,
														columnNumber: 23
													}, this)]
												}, palKey, true, {
													fileName: _jsxFileName,
													lineNumber: 1419,
													columnNumber: 21
												}, this);
											})
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1414,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 text-xs",
											children: [
												/* @__PURE__ */ _jsxDEV("label", {
													className: "flex items-center justify-between cursor-pointer",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "text-slate-300",
														children: "Wyświetlaj siatkę płaszczyzny podłogi"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1446,
														columnNumber: 19
													}, this), /* @__PURE__ */ _jsxDEV("input", {
														type: "checkbox",
														checked: config.uiSettings.showPlaneGrid,
														onChange: (e) => updateUiSettings({ showPlaneGrid: e.target.checked }),
														className: "w-4 h-4 accent-cyan-500 rounded"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1447,
														columnNumber: 19
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1445,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("label", {
													className: "flex items-center justify-between cursor-pointer",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "text-slate-300",
														children: "Zawieszone tablice telemetryczne HUD"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1456,
														columnNumber: 19
													}, this), /* @__PURE__ */ _jsxDEV("input", {
														type: "checkbox",
														checked: config.uiSettings.showFloatingPanels,
														onChange: (e) => updateUiSettings({ showFloatingPanels: e.target.checked }),
														className: "w-4 h-4 accent-cyan-500 rounded"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1457,
														columnNumber: 19
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1455,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("label", {
													className: "flex items-center justify-between cursor-pointer",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "text-slate-300",
														children: "Automatyczny obrót hologramu 360°"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1466,
														columnNumber: 19
													}, this), /* @__PURE__ */ _jsxDEV("input", {
														type: "checkbox",
														checked: config.autoRotate,
														onChange: (e) => updateConfig({ autoRotate: e.target.checked }),
														className: "w-4 h-4 accent-cyan-500 rounded"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1467,
														columnNumber: 19
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1465,
													columnNumber: 17
												}, this),
												/* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "text-slate-300",
														children: "Gęstość opisów HUD:"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1476,
														columnNumber: 19
													}, this), /* @__PURE__ */ _jsxDEV("div", {
														className: "flex items-center gap-1 bg-slate-950 p-1 rounded-md border border-slate-800",
														children: [/* @__PURE__ */ _jsxDEV("button", {
															onClick: () => updateUiSettings({ hudDensity: "compact" }),
															className: `px-2 py-0.5 rounded text-[11px] ${config.uiSettings.hudDensity === "compact" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-400"}`,
															children: "Kompaktowy"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1478,
															columnNumber: 21
														}, this), /* @__PURE__ */ _jsxDEV("button", {
															onClick: () => updateUiSettings({ hudDensity: "detailed" }),
															className: `px-2 py-0.5 rounded text-[11px] ${config.uiSettings.hudDensity === "detailed" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-400"}`,
															children: "Pełny"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1488,
															columnNumber: 21
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1477,
														columnNumber: 19
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1475,
													columnNumber: 17
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1444,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1405,
									columnNumber: 13
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "lg:col-span-6 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex flex-wrap items-center justify-between gap-2",
											children: [/* @__PURE__ */ _jsxDEV("h3", {
												className: "text-base font-semibold text-white flex items-center gap-2",
												children: [/* @__PURE__ */ _jsxDEV(Cloud, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1507,
													columnNumber: 19
												}, this), "Tryb Offline i Synchronizacja Chmury"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1506,
												columnNumber: 17
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center gap-4 text-xs",
												children: [/* @__PURE__ */ _jsxDEV("label", {
													className: "flex items-center gap-1.5 cursor-pointer text-slate-300",
													children: [
														/* @__PURE__ */ _jsxDEV(HardDrive, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1512,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ _jsxDEV("span", { children: "Tryb Offline" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1513,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ _jsxDEV("input", {
															type: "checkbox",
															checked: config.offlineModeEnabled,
															onChange: (e) => updateConfig({ offlineModeEnabled: e.target.checked }),
															className: "accent-emerald-500"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1514,
															columnNumber: 21
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1511,
													columnNumber: 19
												}, this), /* @__PURE__ */ _jsxDEV("label", {
													className: "flex items-center gap-1.5 cursor-pointer text-slate-300",
													children: [
														/* @__PURE__ */ _jsxDEV(RefreshCw, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1522,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ _jsxDEV("span", { children: "Cloud Sync" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1523,
															columnNumber: 21
														}, this),
														/* @__PURE__ */ _jsxDEV("input", {
															type: "checkbox",
															checked: config.cloudSyncEnabled,
															onChange: (e) => updateConfig({ cloudSyncEnabled: e.target.checked }),
															className: "accent-cyan-500"
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1524,
															columnNumber: 21
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1521,
													columnNumber: 19
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1510,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1505,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("form", {
											onSubmit: handleSaveCloudProject,
											className: "flex gap-2",
											children: [/* @__PURE__ */ _jsxDEV("input", {
												type: "text",
												value: newProjectName,
												onChange: (e) => setNewProjectName(e.target.value),
												placeholder: "Nazwa nowego projektu AR (np. Makieta Wieżowca Wersja B)...",
												className: "flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1535,
												columnNumber: 17
											}, this), /* @__PURE__ */ _jsxDEV("button", {
												type: "submit",
												className: "px-4 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors whitespace-nowrap shrink-0",
												children: "Zapisz i Synchronizuj"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1542,
												columnNumber: 17
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1534,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "space-y-2 max-h-44 overflow-y-auto pr-1",
											children: savedProjects.map((proj) => /* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center justify-between gap-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/90 text-xs",
												children: [/* @__PURE__ */ _jsxDEV("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ _jsxDEV("p", {
														className: "font-medium text-slate-200 truncate",
														children: proj.name
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1557,
														columnNumber: 23
													}, this), /* @__PURE__ */ _jsxDEV("p", {
														className: "text-[11px] text-slate-400 font-mono tabular-nums",
														children: [
															proj.updatedAt,
															" · ",
															proj.syncStatus
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1558,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1556,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center gap-1.5 shrink-0",
													children: [/* @__PURE__ */ _jsxDEV("button", {
														onClick: () => {
															setConfig(mergeWithDefaultConfig(proj.config));
															showNotification(`Wczytano projekt: ${proj.name}`);
														},
														className: "px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded font-medium transition-colors",
														children: "Wczytaj"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1563,
														columnNumber: 23
													}, this), savedProjects.length > 1 && /* @__PURE__ */ _jsxDEV("button", {
														onClick: () => setSavedProjects((prev) => prev.filter((p) => p.id !== proj.id)),
														className: "p-1 text-slate-400 hover:text-rose-400 transition-colors",
														title: "Usuń zapisany projekt",
														children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 1580,
															columnNumber: 27
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1573,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1562,
													columnNumber: 21
												}, this)]
											}, proj.id, true, {
												fileName: _jsxFileName,
												lineNumber: 1552,
												columnNumber: 19
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1550,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1504,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1403,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV(GoogleDriveWorkspacePanel, {
								config,
								onLoadConfig: (loadedCfg, sourceLabel) => {
									setConfig(mergeWithDefaultConfig(loadedCfg));
									showNotification(`Wczytano konfigurację 3D z ${sourceLabel}`);
								},
								latestScreenshot: screenshots[0],
								systemPromptMarkdown: `${generatedPrompts.systemPromptPL}\n\n---\n\n\`\`\`csharp\n${generatedPrompts.unityCSharpCode}\n\`\`\``,
								onNotify: showNotification
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1591,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1393,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("section", {
						id: "devices",
						className: "space-y-6 pt-4 border-t border-slate-800/80",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-col md:flex-row md:items-end justify-between gap-4",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "text-xs text-cyan-400 font-mono",
										children: "04. Kompatybilność Sprzętowa ARCore / ARKit"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1607,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("h2", {
										className: "text-2xl font-bold text-white font-display",
										children: "Lista wspieranych urządzeń mobilnych (Smartfony i Tablety Android oraz iOS)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1610,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "text-sm text-slate-300 max-w-3xl",
										children: "Zestawienie certyfikowanych tabletów oraz smartfonów z systemem Android (oraz referencyjnych urządzeń iOS LiDAR) obsługujących śledzenie płaszczyzn stołów/podłóg, mapowanie głębi ToF oraz oświetlenie środowiskowe HDR w silniku Unity."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1613,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1606,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "relative",
									children: [/* @__PURE__ */ _jsxDEV(Search, { className: "w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1623,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "text",
										value: deviceSearch,
										onChange: (e) => setDeviceSearch(e.target.value),
										placeholder: "Szukaj modelu lub czujnika...",
										className: "bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1624,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1622,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg",
									children: [
										{
											id: "ALL",
											label: "Wszystkie"
										},
										{
											id: "Tablet Android",
											label: "Tablety Android"
										},
										{
											id: "Smartfon Android",
											label: "Smartfony Android"
										},
										{
											id: "Urządzenie iOS (Referencyjne)",
											label: "iOS LiDAR"
										}
									].map((tab) => /* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setDeviceFilter(tab.id),
										className: `px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${deviceFilter === tab.id ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
										children: tab.label
									}, tab.id, false, {
										fileName: _jsxFileName,
										lineNumber: 1641,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1634,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1620,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1605,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden",
							children: /* @__PURE__ */ _jsxDEV("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ _jsxDEV("table", {
									className: "w-full text-left border-collapse",
									children: [/* @__PURE__ */ _jsxDEV("thead", { children: /* @__PURE__ */ _jsxDEV("tr", {
										className: "border-b border-slate-800 bg-slate-950/70 text-[11px] font-mono text-slate-400",
										children: [
											/* @__PURE__ */ _jsxDEV("th", {
												className: "py-3 px-4",
												children: "Producent i Model"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1662,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("th", {
												className: "py-3 px-4",
												children: "Typ Urządzenia"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1663,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("th", {
												className: "py-3 px-4",
												children: "System i SDK AR"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1664,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("th", {
												className: "py-3 px-4",
												children: "Czujnik Głębi (Depth Sensor)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1665,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("th", {
												className: "py-3 px-4",
												children: "Precyzja Blat / Podłoga"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1666,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("th", {
												className: "py-3 px-4",
												children: "Okluzja"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1667,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("th", {
												className: "py-3 px-4 text-right",
												children: "Docelowe FPS"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1668,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("th", {
												className: "py-3 px-4",
												children: "Stabilność FPS w Sesji AR (Sparkline CSS)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1669,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1661,
										columnNumber: 19
									}, this) }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1660,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("tbody", {
										className: "divide-y divide-slate-800/70 text-xs",
										children: filteredDevices.map((dev) => {
											const samples = Array.isArray(dev.fpsSamples) && dev.fpsSamples.length > 0 ? dev.fpsSamples : [
												dev.targetFps,
												dev.targetFps,
												dev.targetFps,
												dev.targetFps
											];
											const stability = typeof dev.fpsStabilityPercent === "number" ? dev.fpsStabilityPercent : 99;
											const onePercentLow = typeof dev.fps1PercentLow === "number" ? dev.fps1PercentLow : dev.targetFps - 2;
											const sparkChars = [
												"▂",
												"▃",
												"▄",
												"▅",
												"▆",
												"▇",
												"█"
											];
											const minSample = dev.targetFps - 10;
											const textSparkline = samples.map((fps) => {
												const norm = Math.max(0, Math.min(1, (fps - minSample) / 10));
												const charIdx = Math.round(norm * (sparkChars.length - 1));
												return sparkChars[charIdx];
											}).join("");
											return /* @__PURE__ */ _jsxDEV("tr", {
												className: "hover:bg-slate-800/40 transition-colors",
												children: [
													/* @__PURE__ */ _jsxDEV("td", {
														className: "py-3 px-4 font-semibold text-white whitespace-nowrap",
														children: [
															dev.brand,
															" ",
															dev.model
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1699,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("td", {
														className: "py-3 px-4 text-slate-300 whitespace-nowrap",
														children: /* @__PURE__ */ _jsxDEV("span", {
															className: "inline-flex items-center gap-1.5",
															children: [dev.formFactor.includes("Tablet") ? /* @__PURE__ */ _jsxDEV(Tablet, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 1705,
																columnNumber: 31
															}, this) : /* @__PURE__ */ _jsxDEV(Smartphone, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 1707,
																columnNumber: 31
															}, this), dev.formFactor]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1703,
															columnNumber: 27
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1702,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("td", {
														className: "py-3 px-4 text-slate-300 font-mono text-[11px]",
														children: [
															dev.osVersion,
															" · ",
															dev.arCoreOrKitSupport
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1712,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("td", {
														className: "py-3 px-4 text-slate-300",
														children: dev.depthSensor
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1715,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("td", {
														className: "py-3 px-4 font-mono tabular-nums text-cyan-300",
														children: dev.planeDetectionAccuracy
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1716,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("td", {
														className: "py-3 px-4 text-slate-300",
														children: dev.occlusionSupport
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1719,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("td", {
														className: "py-3 px-4 text-right font-mono tabular-nums text-emerald-400 font-semibold whitespace-nowrap",
														children: [dev.targetFps, " FPS"]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 1720,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("td", {
														className: "py-3 px-4 whitespace-nowrap",
														children: /* @__PURE__ */ _jsxDEV("div", {
															className: "inline-flex items-center gap-2.5 font-mono tabular-nums",
															title: `Próbki sesji AR (${samples.length} pomiarów): ${samples.join(" / ")} FPS · 1% Low: ${onePercentLow} FPS`,
															children: [
																/* @__PURE__ */ _jsxDEV("div", {
																	className: "inline-flex items-end gap-[2px] h-4 px-1.5 py-0.5 rounded bg-slate-950/90 border border-slate-800",
																	children: samples.map((sample, sIdx) => {
																		const ratio = Math.max(.25, Math.min(1, (sample - (dev.targetFps - 12)) / 12));
																		const isDip = sample < dev.targetFps - 3;
																		return /* @__PURE__ */ _jsxDEV("span", {
																			style: { height: `${Math.round(ratio * 100)}%` },
																			className: `w-[3px] rounded-t-[1px] transition-all ${isDip ? "bg-amber-400" : stability >= 99 ? "bg-emerald-400" : "bg-cyan-400"}`
																		}, sIdx, false, {
																			fileName: _jsxFileName,
																			lineNumber: 1737,
																			columnNumber: 35
																		}, this);
																	})
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1729,
																	columnNumber: 29
																}, this),
																/* @__PURE__ */ _jsxDEV("span", {
																	className: `text-[11px] tracking-tighter select-all ${stability >= 99 ? "text-emerald-400" : "text-cyan-300"}`,
																	"aria-label": `Wykres tekstowy stabilności: ${textSparkline}`,
																	children: textSparkline
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 1753,
																	columnNumber: 29
																}, this),
																/* @__PURE__ */ _jsxDEV("span", {
																	className: "text-[11px] text-slate-300",
																	children: [
																		stability.toFixed(1),
																		"%",
																		" ",
																		/* @__PURE__ */ _jsxDEV("span", {
																			className: "text-slate-500",
																			children: [
																				"(min ",
																				onePercentLow,
																				")"
																			]
																		}, void 0, true, {
																			fileName: _jsxFileName,
																			lineNumber: 1767,
																			columnNumber: 31
																		}, this)
																	]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 1765,
																	columnNumber: 29
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 1724,
															columnNumber: 27
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1723,
														columnNumber: 25
													}, this)
												]
											}, dev.id, true, {
												fileName: _jsxFileName,
												lineNumber: 1695,
												columnNumber: 23
											}, this);
										})
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1672,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1659,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1658,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1657,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1604,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 533,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("footer", {
				className: "mt-auto border-t border-slate-800/80 py-6 px-6 text-xs text-slate-400",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4",
					children: [/* @__PURE__ */ _jsxDEV("p", { children: "HoloArch AR Studio — Generator Promptów Architektonicznych i Symulator 3D (Unity ARKit / ARCore)" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1786,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ _jsxDEV("button", {
								onClick: handleExportPDF,
								className: "hover:text-cyan-400 transition-colors",
								children: "Pobierz pełną dokumentację PDF"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1791,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("span", {
								"aria-hidden": "true",
								children: "·"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1797,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#prompt-studio",
								className: "hover:text-cyan-400 transition-colors",
								children: "Kopiuj Prompt Systemowy"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1798,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1790,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1785,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1784,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 467,
		columnNumber: 5
	}, this);
}

//# sourceMappingURL=data:application/json;base64,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V0FBVywwQ0FDVCxRQUNJLGlCQUNBLGFBQWEsS0FDYixtQkFDQTtrQkFFUCxHQVRNOzs7O3lCQVNOO2lCQUVMLENBQUM7Z0JBQ0U7Ozs7O2dCQUdMLHdCQUFDLFFBQUQ7aUJBQ0UsV0FBVywyQ0FDVCxhQUFhLEtBQ1QscUJBQ0E7aUJBRU4sY0FBWSxnQ0FBZ0M7MkJBRTNDO2dCQUNHOzs7OztnQkFHTix3QkFBQyxRQUFEO2lCQUFNLFdBQVU7MkJBQWhCO2tCQUNHLFVBQVUsUUFBUSxDQUFDO2tCQUFFO2tCQUFFO2tCQUN4Qix3QkFBQyxRQUFEO21CQUFNLFdBQVU7NkJBQWhCO29CQUFpQztvQkFDekI7b0JBQWM7bUJBQ2hCOzs7Ozs7aUJBQ0Y7Ozs7OztlQUNIOzs7Ozs7YUFDSDs7Ozs7WUFDRjtjQTdFRyxJQUFJOzs7O2tCQTZFUDtVQUVSLENBQUM7U0FDSTs7OztpQkFDRjs7Ozs7O09BQ0o7Ozs7O01BQ0Y7Ozs7Y0FDRTs7Ozs7O0lBQ0w7Ozs7OztHQUdOLHdCQUFDLFVBQUQ7SUFBUSxXQUFVO2NBQ2hCLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxLQUFELFlBQUcsbUdBR0E7Ozs7ZUFDSCx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFBZjtPQUNFLHdCQUFDLFVBQUQ7UUFDRSxTQUFTO1FBQ1QsV0FBVTtrQkFDWDtPQUVPOzs7OztPQUNSLHdCQUFDLFFBQUQ7UUFBTSxlQUFZO2tCQUFPO09BQU87Ozs7O09BQ2hDLHdCQUFDLEtBQUQ7UUFBRyxNQUFLO1FBQWlCLFdBQVU7a0JBQXdDO09BRXhFOzs7OztNQUNBOzs7OzthQUNGOzs7Ozs7R0FDQzs7Ozs7RUFDTDs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQXBwLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIENoZWNrLFxuICBDbG91ZCxcbiAgQ29weSxcbiAgQ3B1LFxuICBEb3dubG9hZCxcbiAgRmlsZUNvZGUsXG4gIEZpbGVUZXh0LFxuICBIYXJkRHJpdmUsXG4gIEltYWdlIGFzIEltYWdlSWNvbixcbiAgTGF5ZXJzLFxuICBQYWxldHRlLFxuICBSZWZyZXNoQ3csXG4gIFNlYXJjaCxcbiAgU2xpZGVycyxcbiAgU21hcnRwaG9uZSxcbiAgU3BhcmtsZXMsXG4gIFN1bixcbiAgVGFibGV0LFxuICBUcmFzaDIsXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQge1xuICBBUkNvbmZpZ1N0YXRlLFxuICBDYXB0dXJlZFNjcmVlbnNob3QsXG4gIEhvbG9ncmFtUGFsZXR0ZUlkLFxuICBTYXZlZENsb3VkUHJvamVjdCxcbn0gZnJvbSAnLi90eXBlcy9hclN0dWRpbyc7XG5pbXBvcnQge1xuICBBUkNISVRFQ1RVUkFMX1NDRU5FUyxcbiAgSE9MT0dSQU1fUEFMRVRURVMsXG4gIFNVUFBPUlRFRF9NT0JJTEVfREVWSUNFUyxcbiAgZ2VuZXJhdGVNYXN0ZXJQcm9tcHQsXG59IGZyb20gJy4vZGF0YS9hclN0dWRpb0RhdGEnO1xuaW1wb3J0IHsgSG9sb2dyYW1WaWV3cG9ydDNEIH0gZnJvbSAnLi9jb21wb25lbnRzL0hvbG9ncmFtVmlld3BvcnQzRCc7XG5pbXBvcnQgeyBMdXh1cnlTcGF0aWFsRGVjayB9IGZyb20gJy4vY29tcG9uZW50cy9MdXh1cnlTcGF0aWFsRGVjayc7XG5pbXBvcnQgeyBHZW1pbmlTdHVkaW9IdWIgfSBmcm9tICcuL2NvbXBvbmVudHMvR2VtaW5pU3R1ZGlvSHViJztcbmltcG9ydCB7IEdvb2dsZURyaXZlV29ya3NwYWNlUGFuZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvR29vZ2xlRHJpdmVXb3Jrc3BhY2VQYW5lbCc7XG5pbXBvcnQgeyBTdHVkaW9FeHRlbnNpb25zSHViIH0gZnJvbSAnLi9jb21wb25lbnRzL1N0dWRpb0V4dGVuc2lvbnNIdWInO1xuaW1wb3J0IHsgZXhwb3J0UHJvamVjdFRvUERGLCBleHBvcnRQcm9qZWN0VG9HTFRGLCBleHBvcnRQcm9qZWN0VG9JRkMgfSBmcm9tICcuL3V0aWxzL2V4cG9ydGVycyc7XG5cbmNvbnN0IFNUT1JBR0VfS0VZX0NPTkZJRyA9ICdob2xvYXJjaF9hcl9zdHVkaW9fY29uZmlnX3YxJztcbmNvbnN0IFNUT1JBR0VfS0VZX1BST0pFQ1RTID0gJ2hvbG9hcmNoX2FyX3NhdmVkX3Byb2plY3RzX3YxJztcblxuY29uc3QgREVGQVVMVF9DT05GSUc6IEFSQ29uZmlnU3RhdGUgPSB7XG4gIHNjZW5lSWQ6ICdza3lsaW5lX2ZpbmFuY2lhbCcsXG4gIGN1c3RvbVNjZW5lVGl0bGU6ICcnLFxuICB0b3dlckhlaWdodE11bHRpcGxpZXI6IDEuMCxcbiAgc2hvd1NwYXRpYWxBZ2VudHM6IHRydWUsXG4gIGFnZW50TmF2TW9kZTogJ2xpZGFyX29yYml0JyxcbiAgYWN0aXZlQWdlbnRzQ291bnQ6IDQsXG4gIHBlcnNwZWN0aXZlRm92RGVnOiA2NCxcbiAgd29ya3NwYWNlTWFyZ2luUHg6IDI4LFxuICBjb21wb3NpdGlvbkdyaWQ6ICdnb2xkZW5fcmF0aW8nLFxuICBkZXB0aE9mRmllbGRJbnRlbnNpdHk6IDAuNzUsXG4gIGhvcml6b25PZmZzZXRZOiAwLFxuICBkcm9uZUZsaWdodEFjdGl2ZTogdHJ1ZSxcbiAgZHJvbmVTcGVlZDogMS4wLFxuICBkcm9uZUFsdGl0dWRlTTogMTI1MCxcbiAgZHJvbmVMYW5kc2NhcGU6ICdhbHBpbmVfcGVha3MnLFxuICBob2JieUFzc2VtYmx5U3RlcDogMTIsXG4gIGhvYmJ5Qmx1ZXByaW50Q29ubmVjdG9yczogdHJ1ZSxcbiAgc2FmZUNsaWNrU291bmRFbmFibGVkOiB0cnVlLFxuICBneXJvUGl0Y2hEZWc6IDAsXG4gIGd5cm9Sb2xsRGVnOiAwLFxuICBmcmFtZXdvcms6ICd1bml0eV9hcmZvdW5kYXRpb24nLFxuICBwbGFuZURldGVjdGlvbk1vZGU6ICd0YWJsZV9hbmRfZmxvb3InLFxuICBkZXB0aFNlbnNvckFjdGl2ZTogdHJ1ZSxcbiAgZW52aXJvbm1lbnRhbExpZ2h0aW5nOiB0cnVlLFxuICBsaWdodFRlbXBlcmF0dXJlSzogNDIwMCxcbiAgb2NjbHVzaW9uRW5hYmxlZDogdHJ1ZSxcbiAgcGFyYWxsYXhJbnRlbnNpdHk6IDAuNzUsXG4gIHdpbmRvd1BhcnRpY2xlc0ludGVuc2l0eTogMC44LFxuICBtb2RlbFNjYWxlOiAxLjAsXG4gIG1vZGVsUm90YXRpb25ZOiAyNSxcbiAgZXhwbG9kZWRWaWV3RmFjdG9yOiAwLjAsXG4gIHdpcmVmcmFtZU92ZXJsYXk6IGZhbHNlLFxuICBhdXRvUm90YXRlOiB0cnVlLFxuICBvZmZsaW5lTW9kZUVuYWJsZWQ6IHRydWUsXG4gIGNsb3VkU3luY0VuYWJsZWQ6IHRydWUsXG4gIGFjdGl2ZVJlZmVyZW5jZUltYWdlSWQ6ICdyZWYtMTAwLWJvYXJkcm9vbScsXG4gIGFjdGl2ZUV4dGVuc2lvbnM6IFtcbiAgICAnZXh0X3Bicl9nbGFzc19pb3InLFxuICAgICdleHRfbGVkX3NsYWJfY29yZScsXG4gICAgJ2V4dF92b3Jvbm9pX2xhdHRpY2UnLFxuICAgICdleHRfZ2x0Zl9kcmFjbycsXG4gIF0sXG4gIGV4cG9ydEZvcm1hdHM6IHtcbiAgICBvYmo6IHRydWUsXG4gICAgc3RsOiB0cnVlLFxuICAgIHBkZjogdHJ1ZSxcbiAgICBnbHRmOiB0cnVlLFxuICAgIHVzZHo6IHRydWUsXG4gICAgaWZjOiB0cnVlLFxuICB9LFxuICB1aVNldHRpbmdzOiB7XG4gICAgcGFsZXR0ZTogJ2N5YW5fYmx1ZXByaW50JyxcbiAgICBodWREZW5zaXR5OiAnZGV0YWlsZWQnLFxuICAgIHNob3dQbGFuZUdyaWQ6IHRydWUsXG4gICAgc2hvd0Zsb2F0aW5nUGFuZWxzOiB0cnVlLFxuICAgIHByb21wdExhbmd1YWdlOiAncGwnLFxuICB9LFxufTtcblxuZnVuY3Rpb24gbWVyZ2VXaXRoRGVmYXVsdENvbmZpZyhyYXc6IFBhcnRpYWw8QVJDb25maWdTdGF0ZT4gfCBudWxsIHwgdW5kZWZpbmVkKTogQVJDb25maWdTdGF0ZSB7XG4gIGlmICghcmF3IHx8IHR5cGVvZiByYXcgIT09ICdvYmplY3QnKSByZXR1cm4gREVGQVVMVF9DT05GSUc7XG4gIHJldHVybiB7XG4gICAgLi4uREVGQVVMVF9DT05GSUcsXG4gICAgLi4ucmF3LFxuICAgIGV4cG9ydEZvcm1hdHM6IHtcbiAgICAgIC4uLkRFRkFVTFRfQ09ORklHLmV4cG9ydEZvcm1hdHMsXG4gICAgICAuLi4ocmF3LmV4cG9ydEZvcm1hdHMgfHwge30pLFxuICAgIH0sXG4gICAgdWlTZXR0aW5nczoge1xuICAgICAgLi4uREVGQVVMVF9DT05GSUcudWlTZXR0aW5ncyxcbiAgICAgIC4uLihyYXcudWlTZXR0aW5ncyB8fCB7fSksXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xuICBjb25zdCBbY29uZmlnLCBzZXRDb25maWddID0gdXNlU3RhdGU8QVJDb25maWdTdGF0ZT4oKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFNUT1JBR0VfS0VZX0NPTkZJRyk7XG4gICAgICBpZiAoc2F2ZWQpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlV2l0aERlZmF1bHRDb25maWcoSlNPTi5wYXJzZShzYXZlZCkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRmFsbGJhY2sgdG8gZGVmYXVsdFxuICAgIH1cbiAgICByZXR1cm4gREVGQVVMVF9DT05GSUc7XG4gIH0pO1xuXG4gIGNvbnN0IFtzYXZlZFByb2plY3RzLCBzZXRTYXZlZFByb2plY3RzXSA9IHVzZVN0YXRlPFNhdmVkQ2xvdWRQcm9qZWN0W10+KCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShTVE9SQUdFX0tFWV9QUk9KRUNUUyk7XG4gICAgICBpZiAoc2F2ZWQpIHJldHVybiBKU09OLnBhcnNlKHNhdmVkKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEZhbGxiYWNrXG4gICAgfVxuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAncHJlc2V0LXNreWxpbmUnLFxuICAgICAgICBuYW1lOiAnUHJlemVudGFjamEgWmFyesSFZHUg4oCUIFdpZcW8b3djZSBuYSBTdG9sZSBLb25mZXJlbmN5am55bScsXG4gICAgICAgIHVwZGF0ZWRBdDogJzIwMjYtMTAtMjYgMTE6MzAnLFxuICAgICAgICBzeW5jU3RhdHVzOiAnWnN5bmNocm9uaXpvd2FubyB3IGNobXVyemUnLFxuICAgICAgICBjb25maWc6IERFRkFVTFRfQ09ORklHLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdwcmVzZXQtY2FtcHVzJyxcbiAgICAgICAgbmFtZTogJ01ha2lldGEgUG9kxYJvZ293YSAxOjIwIOKAlCBLYW1wdXMgQmlva2xpbWF0eWN6bnknLFxuICAgICAgICB1cGRhdGVkQXQ6ICcyMDI2LTEwLTI1IDE2OjQ1JyxcbiAgICAgICAgc3luY1N0YXR1czogJ1phcGlzYW5vIGxva2FsbmllIChPZmZsaW5lKScsXG4gICAgICAgIGNvbmZpZzoge1xuICAgICAgICAgIC4uLkRFRkFVTFRfQ09ORklHLFxuICAgICAgICAgIHNjZW5lSWQ6ICdlY29fYXRyaXVtJyxcbiAgICAgICAgICBtb2RlbFNjYWxlOiAxLjM1LFxuICAgICAgICAgIGxpZ2h0VGVtcGVyYXR1cmVLOiA1MjAwLFxuICAgICAgICAgIHVpU2V0dGluZ3M6IHsgLi4uREVGQVVMVF9DT05GSUcudWlTZXR0aW5ncywgcGFsZXR0ZTogJ2VtZXJhbGRfbWF0cml4JyB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdO1xuICB9KTtcblxuICBjb25zdCBbc2NyZWVuc2hvdHMsIHNldFNjcmVlbnNob3RzXSA9IHVzZVN0YXRlPENhcHR1cmVkU2NyZWVuc2hvdFtdPihbXSk7XG4gIGNvbnN0IFthY3RpdmVQcm9tcHRUYWIsIHNldEFjdGl2ZVByb21wdFRhYl0gPSB1c2VTdGF0ZTxcbiAgICAncGxfbWFzdGVyJyB8ICdlbl9tYXN0ZXInIHwgJ3Zpc3VhbF9haScgfCAndW5pdHlfY3NoYXJwJ1xuICA+KCdwbF9tYXN0ZXInKTtcbiAgY29uc3QgW2NvcGllZEtleSwgc2V0Q29waWVkS2V5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc3RhdHVzVG9hc3QsIHNldFN0YXR1c1RvYXN0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZGV2aWNlRmlsdGVyLCBzZXREZXZpY2VGaWx0ZXJdID0gdXNlU3RhdGU8c3RyaW5nPignQUxMJyk7XG4gIGNvbnN0IFtkZXZpY2VTZWFyY2gsIHNldERldmljZVNlYXJjaF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW25ld1Byb2plY3ROYW1lLCBzZXROZXdQcm9qZWN0TmFtZV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW3F1aWNrUHJvbXB0VGV4dCwgc2V0UXVpY2tQcm9tcHRUZXh0XSA9IHVzZVN0YXRlPHN0cmluZz4oXG4gICAgJ0hvbG9ncmFtIHd5c29rb8WbY2lvd2NhIGZpbmFuc293ZWdvIDEuMzV4IG5hIGJsYWNpZSBrb25mZXJlbmN5am55bSwgesWCb3RlIG/Fm3dpZXRsZW5pZSB6YWNob2R1IHPFgm/FhGNhIDMyMDBLLCA1IGFnZW50w7N3IHNrYW51asSFY3ljaCBlbGV3YWNqxJkgaSByb3pzdHJ6ZWxvbmUgd2Fyc3R3eSBrb25zdHJ1a2N5am5lJ1xuICApO1xuXG4gIC8vIFJlYWwgR2VtaW5pIDNEIFNwYWNlIEJ1aWxkZXIgZXhlY3V0aW9uIHN0YXRlIChyZXBsYWNlcyBpbnN0YW50IDAuMHMgbG9jYWwgY2hlY2spXG4gIGNvbnN0IFtpc0J1aWxkaW5nM0RTcGFjZSwgc2V0SXNCdWlsZGluZzNEU3BhY2VdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbYnVpbGRFbGFwc2VkU2VjLCBzZXRCdWlsZEVsYXBzZWRTZWNdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW2xhc3RBaVNwYWNlUmVzdWx0LCBzZXRMYXN0QWlTcGFjZVJlc3VsdF0gPSB1c2VTdGF0ZTx7XG4gICAgZWxhcHNlZFNlY29uZHM6IHN0cmluZztcbiAgICBhcmNoaXRlY3R1cmFsU3VtbWFyeTogc3RyaW5nO1xuICAgIGV4ZWN1dGlvblN0ZXBzOiBzdHJpbmdbXTtcbiAgICBtb2RlbFVzZWQ6IHN0cmluZztcbiAgfSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbYWN0aXZlV29ya2Zsb3dTdGVwLCBzZXRBY3RpdmVXb3JrZmxvd1N0ZXBdID0gdXNlU3RhdGU8bnVtYmVyPigxKTtcbiAgY29uc3QgW3Nob3dBZ2VudEd1aWRlUGFuZWwsIHNldFNob3dBZ2VudEd1aWRlUGFuZWxdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgY29uc3QgaGFuZGxlQXBwbHlQcm9tcHRUbzNEU2NlbmUgPSBhc3luYyAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghcXVpY2tQcm9tcHRUZXh0LnRyaW0oKSB8fCBpc0J1aWxkaW5nM0RTcGFjZSkgcmV0dXJuO1xuXG4gICAgc2V0SXNCdWlsZGluZzNEU3BhY2UodHJ1ZSk7XG4gICAgc2V0QnVpbGRFbGFwc2VkU2VjKDAuMSk7XG4gICAgY29uc3Qgc3RhcnRUcyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIGNvbnN0IHRpbWVySW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2V0QnVpbGRFbGFwc2VkU2VjKE51bWJlcigoKHBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUcykgLyAxMDAwKS50b0ZpeGVkKDEpKSk7XG4gICAgfSwgMTAwKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCcvYXBpL2FpL2J1aWxkLTNkLXNwYWNlJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBwcm9tcHQ6IHF1aWNrUHJvbXB0VGV4dCxcbiAgICAgICAgICBjdXJyZW50Q29uZmlnOiBjb25maWcsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmVycm9yIHx8ICdCxYLEhWQga29tdW5pa2FjamkgeiBzZXJ3ZXJlbSBHZW1pbmkgMy44IEZsYXNoJyk7XG4gICAgICB9XG5cbiAgICAgIHNldENvbmZpZygocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgc2NlbmVJZDogZGF0YS5zY2VuZUlkIHx8IHByZXYuc2NlbmVJZCxcbiAgICAgICAgY3VzdG9tU2NlbmVUaXRsZTogZGF0YS5jdXN0b21UaXRsZSB8fCBwcmV2LmN1c3RvbVNjZW5lVGl0bGUsXG4gICAgICAgIHRvd2VySGVpZ2h0TXVsdGlwbGllcjpcbiAgICAgICAgICB0eXBlb2YgZGF0YS50b3dlckhlaWdodE11bHRpcGxpZXIgPT09ICdudW1iZXInXG4gICAgICAgICAgICA/IE1hdGgubWF4KDAuNiwgTWF0aC5taW4oMS44LCBkYXRhLnRvd2VySGVpZ2h0TXVsdGlwbGllcikpXG4gICAgICAgICAgICA6IHByZXYudG93ZXJIZWlnaHRNdWx0aXBsaWVyLFxuICAgICAgICBleHBsb2RlZFZpZXdGYWN0b3I6XG4gICAgICAgICAgdHlwZW9mIGRhdGEuZXhwbG9kZWRWaWV3RmFjdG9yID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgPyBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBkYXRhLmV4cGxvZGVkVmlld0ZhY3RvcikpXG4gICAgICAgICAgICA6IHByZXYuZXhwbG9kZWRWaWV3RmFjdG9yLFxuICAgICAgICBsaWdodFRlbXBlcmF0dXJlSzpcbiAgICAgICAgICB0eXBlb2YgZGF0YS5saWdodFRlbXBlcmF0dXJlSyA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8gTWF0aC5tYXgoMjgwMCwgTWF0aC5taW4oNjUwMCwgZGF0YS5saWdodFRlbXBlcmF0dXJlSykpXG4gICAgICAgICAgICA6IHByZXYubGlnaHRUZW1wZXJhdHVyZUssXG4gICAgICAgIHdpcmVmcmFtZU92ZXJsYXk6XG4gICAgICAgICAgdHlwZW9mIGRhdGEud2lyZWZyYW1lT3ZlcmxheSA9PT0gJ2Jvb2xlYW4nXG4gICAgICAgICAgICA/IGRhdGEud2lyZWZyYW1lT3ZlcmxheVxuICAgICAgICAgICAgOiBwcmV2LndpcmVmcmFtZU92ZXJsYXksXG4gICAgICAgIHNob3dTcGF0aWFsQWdlbnRzOiB0cnVlLFxuICAgICAgICBhZ2VudE5hdk1vZGU6IGRhdGEuYWdlbnROYXZNb2RlIHx8IHByZXYuYWdlbnROYXZNb2RlLFxuICAgICAgICBhY3RpdmVBZ2VudHNDb3VudDpcbiAgICAgICAgICB0eXBlb2YgZGF0YS5hY3RpdmVBZ2VudHNDb3VudCA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8gTWF0aC5tYXgoMiwgTWF0aC5taW4oNiwgZGF0YS5hY3RpdmVBZ2VudHNDb3VudCkpXG4gICAgICAgICAgICA6IHByZXYuYWN0aXZlQWdlbnRzQ291bnQsXG4gICAgICAgIHVpU2V0dGluZ3M6IHtcbiAgICAgICAgICAuLi5wcmV2LnVpU2V0dGluZ3MsXG4gICAgICAgICAgcGFsZXR0ZTogZGF0YS5wYWxldHRlIHx8IHByZXYudWlTZXR0aW5ncy5wYWxldHRlLFxuICAgICAgICB9LFxuICAgICAgfSkpO1xuXG4gICAgICBjb25zdCBmaW5hbFNlYyA9IGRhdGEuZWxhcHNlZFNlY29uZHMgfHwgKChwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0VHMpIC8gMTAwMCkudG9GaXhlZCgyKTtcbiAgICAgIHNldExhc3RBaVNwYWNlUmVzdWx0KHtcbiAgICAgICAgZWxhcHNlZFNlY29uZHM6IFN0cmluZyhmaW5hbFNlYyksXG4gICAgICAgIGFyY2hpdGVjdHVyYWxTdW1tYXJ5OlxuICAgICAgICAgIGRhdGEuYXJjaGl0ZWN0dXJhbFN1bW1hcnkgfHxcbiAgICAgICAgICAnWmFrdHVhbGl6b3dhbm8gcHJ6ZXN0cnplxYQgM0QsIHNpYXRrxJkgTmF2TWVzaCBhZ2VudMOzdyBvcmF6IHBhcmFtZXRyeSBzaGFkZXJhIEFSLicsXG4gICAgICAgIGV4ZWN1dGlvblN0ZXBzOiBBcnJheS5pc0FycmF5KGRhdGEuZXhlY3V0aW9uU3RlcHMpXG4gICAgICAgICAgPyBkYXRhLmV4ZWN1dGlvblN0ZXBzXG4gICAgICAgICAgOiBbXG4gICAgICAgICAgICAgICcxLiBBbmFsaXphIHNlbWFudHljem5hIHByb21wdHUgcHJ6ZXogbW9kZWwgR2VtaW5pIDMuOCBGbGFzaCcsXG4gICAgICAgICAgICAgICcyLiBQcnplbGljemVuaWUgc2lhdGtpIE5hdk1lc2ggaSB0cmFqZWt0b3JpaSBhZ2VudMOzdyBwcnplc3RyemVubnljaCAzRCcsXG4gICAgICAgICAgICAgICczLiBBa3R1YWxpemFjamEgYnJ5xYJ5IGJ1ZHlua3UsIHd5c29rb8WbY2kga29uZHlnbmFjamkgaSBrb2R1IFVuaXR5IEMjJyxcbiAgICAgICAgICAgIF0sXG4gICAgICAgIG1vZGVsVXNlZDogJ2dlbWluaS0zLjgtZmxhc2ggKFNlcnZlci1TaWRlIFN0cnVjdHVyZWQgSlNPTiknLFxuICAgICAgfSk7XG4gICAgICBzZXRBY3RpdmVXb3JrZmxvd1N0ZXAoMyk7XG4gICAgICBzaG93Tm90aWZpY2F0aW9uKFxuICAgICAgICBgR2VtaW5pIDMuOCBGbGFzaCBwcnplYnVkb3dhxYIgcHJ6ZXN0cnplxYQgM0QgaSB0cmFqZWt0b3JpZSBhZ2VudMOzdyB3ICR7ZmluYWxTZWN9IHMhYFxuICAgICAgKTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIGNvbnN0IHRleHQgPSBxdWlja1Byb21wdFRleHQudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHVwZGF0ZXM6IFBhcnRpYWw8QVJDb25maWdTdGF0ZT4gPSB7IHNob3dTcGF0aWFsQWdlbnRzOiB0cnVlIH07XG4gICAgICBjb25zdCB1aVVwZGF0ZXM6IFBhcnRpYWw8QVJDb25maWdTdGF0ZVsndWlTZXR0aW5ncyddPiA9IHt9O1xuXG4gICAgICBpZiAodGV4dC5pbmNsdWRlcygna2FtcHVzJykgfHwgdGV4dC5pbmNsdWRlcygnZWNvJykgfHwgdGV4dC5pbmNsdWRlcygna29wdcWCJykpIHtcbiAgICAgICAgdXBkYXRlcy5zY2VuZUlkID0gJ2Vjb19hdHJpdW0nO1xuICAgICAgfSBlbHNlIGlmICh0ZXh0LmluY2x1ZGVzKCd0ZXJtaW5hbCcpIHx8IHRleHQuaW5jbHVkZXMoJ2xvdG5pc2snKSB8fCB0ZXh0LmluY2x1ZGVzKCdhZXJvJykpIHtcbiAgICAgICAgdXBkYXRlcy5zY2VuZUlkID0gJ2Flcm9faHViJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZXMuc2NlbmVJZCA9ICdza3lsaW5lX2ZpbmFuY2lhbCc7XG4gICAgICB9XG5cbiAgICAgIGlmICh0ZXh0LmluY2x1ZGVzKCd6xYJvdCcpIHx8IHRleHQuaW5jbHVkZXMoJ3phY2jDs2QnKSB8fCB0ZXh0LmluY2x1ZGVzKCczMjAwJykpIHtcbiAgICAgICAgdWlVcGRhdGVzLnBhbGV0dGUgPSAnYW1iZXJfZ29sZCc7XG4gICAgICAgIHVwZGF0ZXMubGlnaHRUZW1wZXJhdHVyZUsgPSAzMjAwO1xuICAgICAgfSBlbHNlIGlmICh0ZXh0LmluY2x1ZGVzKCd6aWVsb24nKSB8fCB0ZXh0LmluY2x1ZGVzKCdzem1hcmFnZCcpIHx8IHRleHQuaW5jbHVkZXMoJ2xpZGFyJykpIHtcbiAgICAgICAgdWlVcGRhdGVzLnBhbGV0dGUgPSAnZW1lcmFsZF9tYXRyaXgnO1xuICAgICAgfVxuXG4gICAgICBpZiAodGV4dC5pbmNsdWRlcygnd2Fyc3R3JykgfHwgdGV4dC5pbmNsdWRlcygncm96c3RyemVsJykpIHtcbiAgICAgICAgdXBkYXRlcy5leHBsb2RlZFZpZXdGYWN0b3IgPSAwLjY7XG4gICAgICB9XG4gICAgICBpZiAodGV4dC5pbmNsdWRlcygnZWxld2FjJykpIHtcbiAgICAgICAgdXBkYXRlcy5hZ2VudE5hdk1vZGUgPSAnZmFjYWRlX3NjYW4nO1xuICAgICAgfSBlbHNlIGlmICh0ZXh0LmluY2x1ZGVzKCdwYXRyb2wnKSB8fCB0ZXh0LmluY2x1ZGVzKCdwb2TFgm9nJykpIHtcbiAgICAgICAgdXBkYXRlcy5hZ2VudE5hdk1vZGUgPSAnZmxvb3JfcGF0cm9sJztcbiAgICAgIH1cblxuICAgICAgc2V0Q29uZmlnKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICAuLi51cGRhdGVzLFxuICAgICAgICB1aVNldHRpbmdzOiB7IC4uLnByZXYudWlTZXR0aW5ncywgLi4udWlVcGRhdGVzIH0sXG4gICAgICB9KSk7XG4gICAgICBzaG93Tm90aWZpY2F0aW9uKCdaYXN0b3Nvd2FubyBwYXJhbWV0cnkgbmEgc2NlbmllIDNEICh0cnliIGxva2FsbnkgT2ZmbGluZSknKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XG4gICAgICBzZXRJc0J1aWxkaW5nM0RTcGFjZShmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJ1bkd1aWRlZERlbW9TdGVwID0gKHN0ZXBOdW1iZXI6IG51bWJlcikgPT4ge1xuICAgIHNldEFjdGl2ZVdvcmtmbG93U3RlcChzdGVwTnVtYmVyKTtcbiAgICBpZiAoc3RlcE51bWJlciA9PT0gMSkge1xuICAgICAgdXBkYXRlQ29uZmlnKHtcbiAgICAgICAgc2NlbmVJZDogJ3NreWxpbmVfZmluYW5jaWFsJyxcbiAgICAgICAgbW9kZWxTY2FsZTogMS4xNSxcbiAgICAgICAgdG93ZXJIZWlnaHRNdWx0aXBsaWVyOiAxLjI1LFxuICAgICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAuMCxcbiAgICAgICAgc2hvd1NwYXRpYWxBZ2VudHM6IHRydWUsXG4gICAgICAgIGFnZW50TmF2TW9kZTogJ2xpZGFyX29yYml0JyxcbiAgICAgICAgYWN0aXZlQWdlbnRzQ291bnQ6IDQsXG4gICAgICB9KTtcbiAgICAgIHNob3dOb3RpZmljYXRpb24oXG4gICAgICAgICdLcm9rIDE6IE9zYWR6b25vIGfFgsOzd255IG1vZGVsIDNEIHdpZcW8b3djw7N3IG5hIGJsYWNpZSBzdG/FgnUgQVIgaSB1cnVjaG9taW9ubyA0IGFnZW50w7N3IG5hIG9yYmljaWUgTGlEQVIuJ1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHN0ZXBOdW1iZXIgPT09IDIpIHtcbiAgICAgIHVwZGF0ZUNvbmZpZyh7XG4gICAgICAgIHNob3dTcGF0aWFsQWdlbnRzOiB0cnVlLFxuICAgICAgICBhZ2VudE5hdk1vZGU6ICdmYWNhZGVfc2NhbicsXG4gICAgICAgIGFjdGl2ZUFnZW50c0NvdW50OiA2LFxuICAgICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAuNTUsXG4gICAgICAgIHdpcmVmcmFtZU92ZXJsYXk6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIHNob3dOb3RpZmljYXRpb24oXG4gICAgICAgICdLcm9rIDI6IFByemXFgsSFY3pvbm8gNiBhZ2VudMOzdyAzRCB3IHRyeWIgUGlvbm93ZWdvIFNrYW5vd2FuaWEgRWxld2FjamkgaSByb3pzdHJ6ZWxvbm8gd2Fyc3R3eSBrb25zdHJ1a2N5am5lIEJJTSEnXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoc3RlcE51bWJlciA9PT0gMykge1xuICAgICAgc2V0UXVpY2tQcm9tcHRUZXh0KFxuICAgICAgICAnS2FtcHVzIGJpb2tsaW1hdHljem55IHoga29wdcWCxIUgZ2VvZGV6eWpuxIUgMS40eCwgc3ptYXJhZ2Rvd3kgTGlEQVIsIDUgYWdlbnTDs3cgcGF0cm9sdWrEhWN5Y2ggYmxhdCBpIHBvZMWCb2fEmSwgcm96c3RyemVsb25lIHdhcnN0d3kgNDAlJ1xuICAgICAgKTtcbiAgICAgIHNob3dOb3RpZmljYXRpb24oXG4gICAgICAgICdLcm9rIDM6IFdwaXNhbm8gcHJ6eWvFgmFkb3d5IHByb21wdCB3IHBhc2t1IHBvd3nFvGVqIOKAlCBrbGlrbmlqIOKAnlByemVidWR1aiBQcnplc3RyemXFhCAzRCBwcnpleiBHZW1pbmnigJ0sIGFieSB6b2JhY3p5xIcgY3phcyB3eWtvbmFuaWEgbmEgxbx5d28hJ1xuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHN0ZXBOdW1iZXIgPT09IDQpIHtcbiAgICAgIGhhbmRsZUV4cG9ydFBERigpO1xuICAgIH1cbiAgfTtcblxuICAvLyBQZXJzaXN0IGluIE9mZmxpbmUgU3RvcmFnZSBhdXRvbWF0aWNhbGx5IHdoZW4gb2ZmbGluZU1vZGVFbmFibGVkIGlzIHRydWVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoY29uZmlnLm9mZmxpbmVNb2RlRW5hYmxlZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oU1RPUkFHRV9LRVlfQ09ORklHLCBKU09OLnN0cmluZ2lmeShjb25maWcpKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBJZ25vcmUgc3RvcmFnZSBxdW90YSBlcnJvcnNcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtjb25maWddKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShTVE9SQUdFX0tFWV9QUk9KRUNUUywgSlNPTi5zdHJpbmdpZnkoc2F2ZWRQcm9qZWN0cykpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIHN0b3JhZ2UgcXVvdGEgZXJyb3JzXG4gICAgfVxuICB9LCBbc2F2ZWRQcm9qZWN0c10pO1xuXG4gIGNvbnN0IHVwZGF0ZUNvbmZpZyA9IChwYXJ0aWFsOiBQYXJ0aWFsPEFSQ29uZmlnU3RhdGU+KSA9PiB7XG4gICAgc2V0Q29uZmlnKChwcmV2KSA9PiAoeyAuLi5wcmV2LCAuLi5wYXJ0aWFsIH0pKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVVaVNldHRpbmdzID0gKHBhcnRpYWw6IFBhcnRpYWw8QVJDb25maWdTdGF0ZVsndWlTZXR0aW5ncyddPikgPT4ge1xuICAgIHNldENvbmZpZygocHJldikgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICB1aVNldHRpbmdzOiB7IC4uLnByZXYudWlTZXR0aW5ncywgLi4ucGFydGlhbCB9LFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBzaG93Tm90aWZpY2F0aW9uID0gKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgc2V0U3RhdHVzVG9hc3QobXNnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFN0YXR1c1RvYXN0KChjdXJyKSA9PiAoY3VyciA9PT0gbXNnID8gbnVsbCA6IGN1cnIpKTtcbiAgICB9LCA0NTAwKTtcbiAgfTtcblxuICBjb25zdCBnZW5lcmF0ZWRQcm9tcHRzID0gdXNlTWVtbygoKSA9PiBnZW5lcmF0ZU1hc3RlclByb21wdChjb25maWcpLCBbY29uZmlnXSk7XG5cbiAgY29uc3QgYWN0aXZlUHJvbXB0Q29udGVudCA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGlmIChhY3RpdmVQcm9tcHRUYWIgPT09ICdwbF9tYXN0ZXInKSByZXR1cm4gZ2VuZXJhdGVkUHJvbXB0cy5zeXN0ZW1Qcm9tcHRQTDtcbiAgICBpZiAoYWN0aXZlUHJvbXB0VGFiID09PSAnZW5fbWFzdGVyJykgcmV0dXJuIGdlbmVyYXRlZFByb21wdHMuc3lzdGVtUHJvbXB0RU47XG4gICAgaWYgKGFjdGl2ZVByb21wdFRhYiA9PT0gJ3Zpc3VhbF9haScpIHJldHVybiBnZW5lcmF0ZWRQcm9tcHRzLnZpc3VhbFByb21wdEVOO1xuICAgIHJldHVybiBnZW5lcmF0ZWRQcm9tcHRzLnVuaXR5Q1NoYXJwQ29kZTtcbiAgfSwgW2FjdGl2ZVByb21wdFRhYiwgZ2VuZXJhdGVkUHJvbXB0c10pO1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlQcm9tcHQgPSAodGV4dDogc3RyaW5nLCBrZXk6IHN0cmluZykgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpO1xuICAgIHNldENvcGllZEtleShrZXkpO1xuICAgIHNob3dOb3RpZmljYXRpb24oJ1Nrb3Bpb3dhbm8gZ290b3d5IHByb21wdCAvIGtvZCBkbyBzY2hvd2thJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRLZXkobnVsbCksIDIyMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNhcHR1cmVTY3JlZW5zaG90ID0gKGRhdGFVcmw6IHN0cmluZywgc2NlbmVOYW1lOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBuZXdTaG90OiBDYXB0dXJlZFNjcmVlbnNob3QgPSB7XG4gICAgICBpZDogYHNob3QtJHtEYXRlLm5vdygpfWAsXG4gICAgICB0aXRsZTogYFdpZG9rIEFSIOKAlCAke3NjZW5lTmFtZX1gLFxuICAgICAgc2NlbmVOYW1lLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygncGwtUEwnLCB7XG4gICAgICAgIGhvdXI6ICcyLWRpZ2l0JyxcbiAgICAgICAgbWludXRlOiAnMi1kaWdpdCcsXG4gICAgICAgIHNlY29uZDogJzItZGlnaXQnLFxuICAgICAgfSksXG4gICAgICBkYXRhVXJsLFxuICAgICAgcmVzb2x1dGlvbjogJzE5MjAgw5cgMTA4MCBweCAoSEQgM0QgQ2FudmFzKScsXG4gICAgfTtcbiAgICBzZXRTY3JlZW5zaG90cygocHJldikgPT4gW25ld1Nob3QsIC4uLnByZXZdKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVFeHBvcnRQREYgPSAoKSA9PiB7XG4gICAgY29uc3QgbGF0ZXN0U2hvdCA9IHNjcmVlbnNob3RzLmxlbmd0aCA+IDAgPyBzY3JlZW5zaG90c1swXS5kYXRhVXJsIDogdW5kZWZpbmVkO1xuICAgIGV4cG9ydFByb2plY3RUb1BERihjb25maWcsIGxhdGVzdFNob3QpO1xuICAgIHNob3dOb3RpZmljYXRpb24oJ1d5Z2VuZXJvd2FubyBpIHBvYnJhbm8gZG9rdW1lbnRhY2rEmSB0ZWNobmljem7EhSBvcmF6IHByb21wdCB3IGZvcm1hY2llIC5QREYnKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlQ2xvdWRQcm9qZWN0ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0aXRsZSA9XG4gICAgICBuZXdQcm9qZWN0TmFtZS50cmltKCkgfHxcbiAgICAgIGBLb25maWd1cmFjamEgQVIgKCR7QVJDSElURUNUVVJBTF9TQ0VORVMuZmluZCgocykgPT4gcy5pZCA9PT0gY29uZmlnLnNjZW5lSWQpPy5uYW1lfSlgO1xuICAgIGNvbnN0IHByb2o6IFNhdmVkQ2xvdWRQcm9qZWN0ID0ge1xuICAgICAgaWQ6IGBwcm9qLSR7RGF0ZS5ub3coKX1gLFxuICAgICAgbmFtZTogdGl0bGUsXG4gICAgICB1cGRhdGVkQXQ6IG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoJ3BsLVBMJywge1xuICAgICAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgICAgIG1vbnRoOiAnMi1kaWdpdCcsXG4gICAgICAgIGRheTogJzItZGlnaXQnLFxuICAgICAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgICAgIG1pbnV0ZTogJzItZGlnaXQnLFxuICAgICAgfSksXG4gICAgICBzeW5jU3RhdHVzOiBjb25maWcuY2xvdWRTeW5jRW5hYmxlZFxuICAgICAgICA/ICdac3luY2hyb25pem93YW5vIHcgY2htdXJ6ZSdcbiAgICAgICAgOiAnWmFwaXNhbm8gbG9rYWxuaWUgKE9mZmxpbmUpJyxcbiAgICAgIGNvbmZpZzogeyAuLi5jb25maWcgfSxcbiAgICB9O1xuICAgIHNldFNhdmVkUHJvamVjdHMoKHByZXYpID0+IFtwcm9qLCAuLi5wcmV2XSk7XG4gICAgc2V0TmV3UHJvamVjdE5hbWUoJycpO1xuICAgIHNob3dOb3RpZmljYXRpb24oXG4gICAgICBjb25maWcuY2xvdWRTeW5jRW5hYmxlZFxuICAgICAgICA/ICdQcm9qZWt0IHphcGlzYW55IGkgenN5bmNocm9uaXpvd2FueSB3IGNobXVyemUgdcW8eXRrb3duaWthJ1xuICAgICAgICA6ICdQcm9qZWt0IHphcGlzYW55IHcgcGFtacSZY2kgcG9kcsSZY3puZWogdHJ5YnUgT2ZmbGluZSdcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGZpbHRlcmVkRGV2aWNlcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBTVVBQT1JURURfTU9CSUxFX0RFVklDRVMuZmlsdGVyKChkKSA9PiB7XG4gICAgICBjb25zdCBtYXRjaGVzVHlwZSA9IGRldmljZUZpbHRlciA9PT0gJ0FMTCcgfHwgZC5mb3JtRmFjdG9yID09PSBkZXZpY2VGaWx0ZXI7XG4gICAgICBjb25zdCBxID0gZGV2aWNlU2VhcmNoLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgbWF0Y2hlc1F1ZXJ5ID1cbiAgICAgICAgIXEgfHxcbiAgICAgICAgZC5icmFuZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8XG4gICAgICAgIGQubW9kZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fFxuICAgICAgICBkLmRlcHRoU2Vuc29yLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSk7XG4gICAgICByZXR1cm4gbWF0Y2hlc1R5cGUgJiYgbWF0Y2hlc1F1ZXJ5O1xuICAgIH0pO1xuICB9LCBbZGV2aWNlRmlsdGVyLCBkZXZpY2VTZWFyY2hdKTtcblxuICBjb25zdCBhY3RpdmVTY2VuZU1ldGEgPVxuICAgIEFSQ0hJVEVDVFVSQUxfU0NFTkVTLmZpbmQoKHMpID0+IHMuaWQgPT09IGNvbmZpZy5zY2VuZUlkKSB8fCBBUkNISVRFQ1RVUkFMX1NDRU5FU1swXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLVsjMEIwRjE3XSB0ZXh0LXNsYXRlLTEwMCBmbGV4IGZsZXgtY29sXCI+XG4gICAgICB7LyogU3RyaWN0IDMtWm9uZSBUb3AgTmF2aWdhdGlvbiBCYXIgQ29udHJhY3QgKi99XG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cInN0aWNreSB0b3AtMCB6LTMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtOCBweC02IHB5LTQgYmctWyMwQjBGMTddLzk1IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAvOTBcIj5cbiAgICAgICAgey8qIFpvbmUgMTogU2luZ2xlIFRleHQgRWxlbWVudCBCcmFuZCBXb3JkbWFyayAqL31cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiI3RvcFwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdHJhY2tpbmctdGlnaHQgdGV4dC13aGl0ZSBmb250LWRpc3BsYXkgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICA+XG4gICAgICAgICAgSG9sb0FyY2ggQVIgU3R1ZGlvXG4gICAgICAgIDwvYT5cblxuICAgICAgICB7LyogWm9uZSAyOiA1IENvbmNpc2UgU2luZ2xlLUxpbmUgTmF2aWdhdGlvbiBMaW5rcyAqL31cbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTYgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwiI3NpbXVsYXRvclwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWN5YW4tNDAwIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBQcnplc3RyemXFhCAzRCBpIEFnZW5jaVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cIiNleHRlbnNpb25zLWdhbGxlcnlcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1jeWFuLTQwMCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCB0ZXh0LWFtYmVyLTMwMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgT2JyYXpraSBpIFJvenN6ZXJ6ZW5pYSAoNTIpXG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwiI2dlbWluaS1haS1odWJcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1jeWFuLTQwMCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgU3R1ZGlvIEdlbWluaSBBSVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cIiNnb29nbGUtZHJpdmVcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1jeWFuLTQwMCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCB0ZXh0LWN5YW4tMzAwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBHb29nbGUgRHJpdmUgJiBGaXJlc3RvcmVcbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCIjZGV2aWNlc1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWN5YW4tNDAwIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBXc3BpZXJhbmUgVXJ6xIVkemVuaWFcbiAgICAgICAgICA8L2E+XG4gICAgICAgIDwvbmF2PlxuXG4gICAgICAgIHsvKiBab25lIDM6IDEgUHJpbWFyeSBBY3Rpb24gQnV0dG9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHNocmluay0wXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhwb3J0UERGfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1jeWFuLTUwMCBob3ZlcjpiZy1jeWFuLTQwMCB0ZXh0LXNsYXRlLTk1MCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmlsZVRleHQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+RWtzcG9ydHVqIFByb2pla3QgZG8gUERGPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvaGVhZGVyPlxuXG4gICAgICB7LyogTm9uLWludHJ1c2l2ZSBTdGF0dXMgVG9hc3QgKi99XG4gICAgICB7c3RhdHVzVG9hc3QgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGJvdHRvbS01IHJpZ2h0LTUgei01MCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC81MCB0ZXh0LXNsYXRlLTEwMCBweC00IHB5LTMgcm91bmRlZC1sZyBzaGFkb3ctMnhsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgdGV4dC14cyBmb250LW1lZGl1bVwiPlxuICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgIDxzcGFuPntzdGF0dXNUb2FzdH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIE1haW4gQ29udGVudCBDb250YWluZXIgKDE0NDBweCBEZXNrdG9wIFByZXNlbmNlKSAqL31cbiAgICAgIDxtYWluIGlkPVwidG9wXCIgY2xhc3NOYW1lPVwibWF4LXctWzE0MDBweF0gdy1mdWxsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHktOCBzcGFjZS15LTE0XCI+XG4gICAgICAgIHsvKiBTZWN0aW9uIDE6IEludGVyYWN0aXZlIDNEL0FSIEhvbG9ncmFtIFNpbXVsYXRvciAmIFNjZW5lIFNlbGVjdG9yICovfVxuICAgICAgICA8c2VjdGlvbiBpZD1cInNpbXVsYXRvclwiIGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBsZzppdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIGdhcC02IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAvODAgcGItNlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LWN5YW4tNDAwIGZvbnQtbW9ubyB0YWJ1bGFyLW51bXNcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Vbml0eSA2IEFSIEZvdW5kYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+wrc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+QVJLaXQgTGlEQVIgJiBBUkNvcmUgRGVwdGggQVBJPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPkFnZW5jaSAzRCBOYXZNZXNoOiB7Y29uZmlnLmFjdGl2ZUFnZW50c0NvdW50fSBha3R5d255Y2g8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+wrc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+VHJ5YiBPZmZsaW5lOiB7Y29uZmlnLm9mZmxpbmVNb2RlRW5hYmxlZCA/ICdBa3R5d255JyA6ICdXecWCLid9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGgxXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC0yeGwgc206dGV4dC00eGwgZm9udC1ib2xkIHRleHQtd2hpdGUgdHJhY2tpbmctdGlnaHQgZm9udC1kaXNwbGF5XCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyB0ZXh0V3JhcDogJ2JhbGFuY2UnIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBTeW11bGF0b3IgSG9sb2dyYW3Ds3cgQXJjaGl0ZWt0b25pY3pueWNoIDNEIGkgQXV0b25vbWljem55Y2ggQWdlbnTDs3cgUHJ6ZXN0cnplbm55Y2hcbiAgICAgICAgICAgICAgPC9oMT5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWJhc2UgdGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgR8WCw7N3bnkgbW9kZWwgM0Qgem5hamR1amUgc2nEmSBiZXpwb8WbcmVkbmlvIHcgY2VudHJhbG55bSBva25pZSBwcm9qZWtjeWpueW0gcG9uacW8ZWouXG4gICAgICAgICAgICAgICAgV29rw7PFgiBidWR5bmvDs3cgcG9ydXN6YWrEhSBzacSZIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSBhdXRvbm9taWN6bmkgYWdlbmNpIHNrYW51asSFY3lcbiAgICAgICAgICAgICAgICAoYEFHLTAxYCDigJMgYEFHLTA2YCkgb3BhcmNpIG5hIHNpYXRjZSA8c3Ryb25nPjNEIE5hdk1lc2ggLyBXYXlwb2ludCBHcmFwaDwvc3Ryb25nPnsnICd9XG4gICAgICAgICAgICAgICAgb3JheiBjenVqbmlrYWNoIGfFgsSZYmkgc3RvxYJ1IGkgcG9kxYJvZ2kuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU2NlbmUgVHJhbnNpdGlvbiBDYXJkcyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yIHNocmluay0wXCI+XG4gICAgICAgICAgICAgIHtBUkNISVRFQ1RVUkFMX1NDRU5FUy5tYXAoKHNjZW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gY29uZmlnLnNjZW5lSWQgPT09IHNjZW5lLmlkO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17c2NlbmUuaWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZUNvbmZpZyh7IHNjZW5lSWQ6IHNjZW5lLmlkLCBjdXN0b21TY2VuZVRpdGxlOiAnJyB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMy41IHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi01MDAvMTUgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvODAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7c2NlbmUubmFtZX1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogSW50ZXJhY3RpdmUgR3VpZGU6IEhvdyBBZ2VudHMgTW92ZSBpbiBBSSBTdHVkaW8gJiBIb3cgdG8gV29yayBTdGVwLWJ5LVN0ZXAgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc206cC01IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgTmEgamFraWVqIGJhemllIHBvcnVzemFqxIUgc2nEmSBBZ2VuY2kgdyBBSSBTdHVkaW8gaSBQcnplc3RyemVuaSAzRCBvcmF6IEphayBQcmFjb3dhxIcgKEtyb2sgcG8gS3Jva3UpXG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93QWdlbnRHdWlkZVBhbmVsKChwcmV2KSA9PiAhcHJldil9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWN5YW4tNDAwIGhvdmVyOnRleHQtY3lhbi0zMDAgZm9udC1tZWRpdW1cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3Nob3dBZ2VudEd1aWRlUGFuZWwgPyAnVWtyeWogcGFuZWwgcHJ6ZXdvZG5pa2Eg4payJyA6ICdQb2thxbwgcHJ6ZXdvZG5payBpIHN0ZXJvd2FuaWUgYWdlbnRhbWkg4pa8J31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAge3Nob3dBZ2VudEd1aWRlUGFuZWwgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC00IHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICAgICAgICAgIHsvKiBMZWZ0OiAyLUxheWVyIEV4cGxhbmF0aW9uIG9mIEFnZW50IE1vdmVtZW50IEJhc2UgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC85MCByb3VuZGVkLWxnIHAtMy41IHNwYWNlLXktMi41IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDEuIEJhemEgcnVjaHUgYWdlbnTDs3cgKDIgd2Fyc3R3eSB0ZWNobm9sb2dpY3puZSk6XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj5BKSBXIHNpbG5pa3UgR2VtaW5pIEFJIFN0dWRpbyAoQmFja2VuZCk6PC9zdHJvbmc+eycgJ31cbiAgICAgICAgICAgICAgICAgICAgQWdlbmNpIHBvcnVzemFqxIUgc2nEmSB3IHDEmXRsaSA8c3Ryb25nPlJlQWN0IChSZWFzb24gKyBBY3QpPC9zdHJvbmc+IG9yYXp7JyAnfVxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPkludGVyYWN0aW9ucyBBUEk8L3N0cm9uZz4gKGBnZW1pbmktMy44LWZsYXNoYCAvIGBnZW1pbmktb21uaS0xLjEtZmxhc2hgKS5cbiAgICAgICAgICAgICAgICAgICAgT2RiaWVyYWrEhSBUd8OzaiBwcm9tcHQsIHBsYW51asSFIGtyb2tpIGkgendyYWNhasSFIHVzdHJ1a3R1cnl6b3dhbnkgc2NoZW1hdCBKU09OLlxuICAgICAgICAgICAgICAgICAgICBXY3plxZtuaWVqIGfDs3JueSBwYXNlayB3eWtvbnl3YcWCIHR5bGtvIGxva2Fsbnkgc2tyeXB0IEpTIChgMC4wIHNgKSDigJQgdGVyYXogd3l3b8WCdWplXG4gICAgICAgICAgICAgICAgICAgIHBlxYJueSBtb2RlbCBHZW1pbmkgbmEgc2Vyd2VyemUgeiBsaWN6bmlraWVtIGN6YXN1IG5hIMW8eXdvIChgMS4yIHMg4oCTIDMuNSBzYCkuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+QikgVyBwcnplc3RyemVuaSAzRCBBUiAvIFVuaXR5IChWaWV3cG9ydCk6PC9zdHJvbmc+eycgJ31cbiAgICAgICAgICAgICAgICAgICAgQWdlbmNpIChgQUctMDFgLi5gQUctMDZgIHdpZG9jem5pIG5hIHNjZW5pZSBwb25pxbxlaikgcG9ydXN6YWrEhSBzacSZIHBveycgJ31cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz5zaWF0Y2UgbmF3aWdhY3lqbmVqIDNEIE5hdk1lc2gsIGdyYWZpZSBwdW5rdMOzdyAoV2F5cG9pbnQgU3BsaW5lcyk8L3N0cm9uZz57JyAnfVxuICAgICAgICAgICAgICAgICAgICBvcmF6IHByb21pZW5pYWNoIDxzdHJvbmc+QVIgUmF5Y2FzdGluZzwvc3Ryb25nPiByenV0b3dhbnljaCBuYSB3eWtyeXR5IGJsYXQgc3RvxYJ1XG4gICAgICAgICAgICAgICAgICAgIChgUGxhbmVDbGFzc2lmaWNhdGlvbi5UYWJsZWApIGkgcG9kxYJvZ8SZIChgRmxvb3JgKS5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBNaWRkbGU6IExpdmUgM0QgU3BhdGlhbCBBZ2VudCBDb250cm9scyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTQgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzkwIHJvdW5kZWQtbGcgcC0zLjUgc3BhY2UteS0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAyLiBTdGVyb3dhbmllIEFnZW50YW1pIDNEIGkgQnJ5xYLEhSBuYSDFu3l3bzpcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlciB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy5zaG93U3BhdGlhbEFnZW50cyAhPT0gZmFsc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUNvbmZpZyh7IHNob3dTcGF0aWFsQWdlbnRzOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWNjZW50LWN5YW4tNTAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UG9rYcW8IEFnZW50w7N3IDNEPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgQmF6YSB0cmFqZWt0b3JpaSBhZ2VudMOzdyAoM0QgTmF2TWVzaCBNb2RlKTpcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0zIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2xpZGFyX29yYml0JywgbGFiZWw6ICdPcmJpdGEgTGlEQVInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnZmFjYWRlX3NjYW4nLCBsYWJlbDogJ1NrYW4gRWxld2FjamknIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnZmxvb3JfcGF0cm9sJywgbGFiZWw6ICdQYXRyb2wgQmxhdHUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXS5tYXAoKG1vZGUpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXttb2RlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnROYXZNb2RlOiBtb2RlLmlkIGFzIEFSQ29uZmlnU3RhdGVbJ2FnZW50TmF2TW9kZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hvd1NwYXRpYWxBZ2VudHM6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTEuNSByb3VuZGVkIGJvcmRlciB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChjb25maWcuYWdlbnROYXZNb2RlIHx8ICdsaWRhcl9vcmJpdCcpID09PSBtb2RlLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTUwMC8yMCBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bW9kZS5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+TGljemJhIGFnZW50w7N3Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWN5YW4tNDAwIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLmFjdGl2ZUFnZW50c0NvdW50IHx8IDR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsyfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXs2fVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcuYWN0aXZlQWdlbnRzQ291bnQgfHwgNH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVBZ2VudHNDb3VudDogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93U3BhdGlhbEFnZW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtY3lhbi00MDAgY3Vyc29yLXBvaW50ZXIgaC0xLjUgYmctc2xhdGUtODAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XeXNva2/Fm8SHIGJyecWCeTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1hbWJlci00MDAgdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHsoY29uZmlnLnRvd2VySGVpZ2h0TXVsdGlwbGllciB8fCAxLjApLnRvRml4ZWQoMil9eFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MC42fVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsxLjd9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXswLjA1fVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy50b3dlckhlaWdodE11bHRpcGxpZXIgfHwgMS4wfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvd2VySGVpZ2h0TXVsdGlwbGllcjogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMCBjdXJzb3ItcG9pbnRlciBoLTEuNSBiZy1zbGF0ZS04MDAgcm91bmRlZC1sZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBSaWdodDogNC1TdGVwIEludGVyYWN0aXZlIFdhbGt0aHJvdWdoIChcIlBva2HFvCBqYWsgcHJhY293YcSHXCIpICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMyBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvOTAgcm91bmRlZC1sZyBwLTMuNSBzcGFjZS15LTIgdGV4dC14cyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgMy4gUG9rYcW8IGphayBwcmFjb3dhxIcgKEtsaWtuaWoga3Jvayk6XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdLcm9rIDE6IE9zYWTFuiBtb2RlbCAzRCBpIDQgYWdlbnTDs3cgTGlEQVInLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnS3JvayAyOiBXxYLEhWN6IHNrYW4gZWxld2FjamkgKyByb3pzdHJ6ZWwgd2Fyc3R3eScsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwOiAzLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6ICdLcm9rIDM6IFphxYJhZHVqIHByb21wdCBBSSBkbGEgcHJ6ZXN0cnplbmkgM0QnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcDogNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiAnS3JvayA0OiBQb2JpZXJ6IHJhcG9ydCBQREYgLyBzaWF0a8SZIC5PQkonLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIF0ubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLnN0ZXB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJ1bkd1aWRlZERlbW9TdGVwKGl0ZW0uc3RlcCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgdGV4dC1sZWZ0IHB4LTIuNSBweS0xLjUgcm91bmRlZCBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVdvcmtmbG93U3RlcCA9PT0gaXRlbS5zdGVwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC01MDAvMTUgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0yMDAgZm9udC1zZW1pYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj57aXRlbS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gdGV4dC1lbWVyYWxkLTQwMCBzaHJpbmstMCBtbC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFVydWNob20g4oaSXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBQcm9taW5lbnQgVG9wIFByb21wdCBJbnB1dCBCYXIgd2l0aCBSZWFsIEdlbWluaSAzLjggRmxhc2ggRXhlY3V0aW9uICYgVGltZXIgKi99XG4gICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgIG9uU3VibWl0PXtoYW5kbGVBcHBseVByb21wdFRvM0RTY2VuZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIHJvdW5kZWQteGwgcC00IHNoYWRvdy1sZyBzcGFjZS15LTNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICBodG1sRm9yPVwibWFpbi1wcm9tcHQtaW5wdXRcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICBLUkVBVE9SIFBSWkVTVFJaRU5JIDNEIEdFTUlOSSBBSSAoV3Bpc3ogcG9sZWNlbmllLCBhYnkgcHJ6ZWJ1ZG93YcSHIG1vZGVsIDNEIGkgcnVjaCBhZ2VudMOzdyk6XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQteHMgZm9udC1tb25vIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgIHtpc0J1aWxkaW5nM0RTcGFjZSA/IChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgR2VtaW5pIDMuOCBGbGFzaCBwcnpldHdhcnphIHByemVzdHJ6ZcWEIDNEOiB7YnVpbGRFbGFwc2VkU2VjLnRvRml4ZWQoMSl9IHMuLi5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICApIDogbGFzdEFpU3BhY2VSZXN1bHQgPyAoXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIE9zdGF0bmllIHd5a29uYW5pZSBHZW1pbmkgQUk6IHtsYXN0QWlTcGFjZVJlc3VsdC5lbGFwc2VkU2Vjb25kc30gc1xuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8YSBocmVmPVwiI2dlbWluaS1haS1odWJcIiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGhvdmVyOnVuZGVybGluZSBmb250LXNhbnNcIj5cbiAgICAgICAgICAgICAgICAgICAgUHJ6ZWpkxbogZG8gR2VuZXJhdG9yYSBPYnJhesOzdyAyRCAvIFdpZGVvIE1QNCDihpNcbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBpZD1cIm1haW4tcHJvbXB0LWlucHV0XCJcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3F1aWNrUHJvbXB0VGV4dH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFF1aWNrUHJvbXB0VGV4dChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXcGlzeiBvcGlzIHByemVzdHJ6ZW5pIDNELCBucC46IFd5c29rb8WbY2lvd2llYyAxLjV4LCB6xYJvdGUgxZt3aWF0xYJvIDMwMDBLLCA2IGFnZW50w7N3IHNrYW51asSFY3ljaCBlbGV3YWNqxJksIHJvenN0cnplbG9uZSB3YXJzdHd5Li4uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtNCBweS0yLjUgdGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtd2hpdGUgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTQwMFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNCdWlsZGluZzNEU3BhY2V9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS0yLjUgYmctY3lhbi01MDAgaG92ZXI6YmctY3lhbi00MDAgZGlzYWJsZWQ6b3BhY2l0eS02MCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkIHRleHQteHMgc206dGV4dC1zbSByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpc0J1aWxkaW5nM0RTcGFjZSA/IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5CdWRvd2FuaWUgM0QgKHtidWlsZEVsYXBzZWRTZWMudG9GaXhlZCgxKX0gcykuLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPHNwYW4+UHJ6ZWJ1ZHVqIFByemVzdHJ6ZcWEIDNEIHByemV6IEdlbWluaTwvc3Bhbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBocmVmPVwiI2dlbWluaS1haS1odWJcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMi41IGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0xMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZm9udC1tZWRpdW0gdGV4dC14cyBzbTp0ZXh0LXNtIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgdGV4dC1jZW50ZXIgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgU3R1ZGlvIEFJIChDemF0IC8gT2JyYXogLyBXaWRlbylcbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQcm9vZi1vZi1Xb3JrIFRlbGVtZXRyeSBCb3ggc2hvd2luZyByZWFsIEdlbWluaSBleGVjdXRpb24gdGltZSAmIHN0ZXBzICovfVxuICAgICAgICAgICAge2xhc3RBaVNwYWNlUmVzdWx0ICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8zMCByb3VuZGVkLWxnIHAtMyB0ZXh0LXhzIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgUmFwb3J0IHd5a29uYW5pYSBhZ2VudGEge2xhc3RBaVNwYWNlUmVzdWx0Lm1vZGVsVXNlZH06XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1lbWVyYWxkLTQwMCB0YWJ1bGFyLW51bXNcIj5cbiAgICAgICAgICAgICAgICAgICAgQ3phcyB3bmlvc2tvd2FuaWEgQVBJOiB7bGFzdEFpU3BhY2VSZXN1bHQuZWxhcHNlZFNlY29uZHN9IHNcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntsYXN0QWlTcGFjZVJlc3VsdC5hcmNoaXRlY3R1cmFsU3VtbWFyeX08L3A+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMiBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICB7bGFzdEFpU3BhY2VSZXN1bHQuZXhlY3V0aW9uU3RlcHMubWFwKChzdGVwLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1jeWFuLTMwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7c3RlcH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Zvcm0+XG5cbiAgICAgICAgICB7LyogM0QgSG9sb2dyYW0sIEJvdW5kZWQgRGVlcC1QYXJhbGxheCBXb3Jrc3BhY2UgJiBWaXJ0dWFsIERyb25lIEZsaWdodCBWaWV3cG9ydCAqL31cbiAgICAgICAgICA8SG9sb2dyYW1WaWV3cG9ydDNEXG4gICAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnPXt1cGRhdGVDb25maWd9XG4gICAgICAgICAgICBvbkNhcHR1cmVTY3JlZW5zaG90PXtoYW5kbGVDYXB0dXJlU2NyZWVuc2hvdH1cbiAgICAgICAgICAgIG9uRXhwb3J0TWVzc2FnZT17c2hvd05vdGlmaWNhdGlvbn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgey8qIFRyYW5zbHVjZW50IEdsYXNzIEhhcmR3YXJlIENvbnNvbGU6IDI0IFRoaW4gTEVEcywgMTYgVGFjdGlsZSBQYWRzLCBTYWZlLUNsaWNrIFJvdGFyeSBNaXhlciBEaWFsLCBTY3JhdGNoIFBsYXR0ZXIgJiAzRCBHeXJvc2NvcGUgKi99XG4gICAgICAgICAgPEx1eHVyeVNwYXRpYWxEZWNrXG4gICAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnPXt1cGRhdGVDb25maWd9XG4gICAgICAgICAgICBvblVwZGF0ZVBhbGV0dGU9eyhwYWwpID0+IHVwZGF0ZVVpU2V0dGluZ3MoeyBwYWxldHRlOiBwYWwgfSl9XG4gICAgICAgICAgICBvbk5vdGlmeT17c2hvd05vdGlmaWNhdGlvbn1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgey8qIEFyY2hpdGVjdHVyYWwgVGVsZW1ldHJ5IEJhciAmIENhcHR1cmVkIERldmljZSBTY3JlZW5zaG90cyBTdHJpcCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02IHB0LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyBiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvOTAgcm91bmRlZC14bCBwLTUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWN5YW4tNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIFNwZWN5ZmlrYWNqYSBha3R5d25laiBzY2VueSAzRFxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVTY2VuZU1ldGEucGFydHNDb3VudH0gbW9kdcWCw7N3IMK3IHthY3RpdmVTY2VuZU1ldGEudmVydGljZXNFc3RpbWF0ZX0gd2llcnpjaG/FgmvDs3cgwrcgUG93LnsnICd9XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVTY2VuZU1ldGEuZm9vdHByaW50U3FtLnRvTG9jYWxlU3RyaW5nKCdwbC1QTCcpfSBtwrJcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtd2hpdGVcIj57YWN0aXZlU2NlbmVNZXRhLm5hbWV9PC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlU2NlbmVNZXRhLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0zIHB0LTQgbXQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlU2NlbmVNZXRhLmxheWVycy5tYXAoKGxheWVyTmFtZSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIFdhcnN0d2EgMHtpZHggKyAxfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIGZvbnQtbWVkaXVtIGxlYWRpbmctc251Z1wiPntsYXllck5hbWV9PC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBSZWZlcmVuY2UgVmlzdWFsaXphdGlvbiAmIENhcHR1cmVkIEdhbGxlcnkgU3RyaXAgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzkwIHJvdW5kZWQteGwgcC01IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgR2FsZXJpYSBacnp1dMOzdyBFa3JhbnUgaSBPYnJheiBXem9yY293eSBBUlxuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgWnJ6dXR5IHphcGlzeXdhbmUgc8SFIGJlenBvxZtyZWRuaW8gZG8gdXJ6xIVkemVuaWEgb3JheiBkbyByYXBvcnR1IFBERlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi00MDAgdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgICB7c2NyZWVuc2hvdHMubGVuZ3RofSB6YXBpc2FueWNoXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICB7LyogVXBsb2FkZWQgUmVmZXJlbmNlIEltYWdlIENhcmQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncm91cCByZWxhdGl2ZSByb3VuZGVkLWxnIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBiZy1zbGF0ZS05NTBcIj5cbiAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgc3JjPVwiL2Fzc2V0cy9haXN0dWRpby9EYXNoYm9hcmRfZGV4X2VlZmZjYmM3LmpwZ1wiXG4gICAgICAgICAgICAgICAgICAgIGFsdD1cIld6b3Jjb3d5IHN0w7PFgiBrb25mZXJlbmN5am55IEFSIHogaG9sb2dyYW1lbVwiXG4gICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0yOCBvYmplY3QtY292ZXJcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIGJnLXNsYXRlLTk1MC85MFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtMjAwIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgV3pvcnplYzogU3TDs8WCIEtvbmZlcmVuY3lqbnkgQVJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgWmHFgsSFY3pvbnkgcGxpayByZWZlcmVuY3lqbnlcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogTGF0ZXN0IENhcHR1cmVkIFNjcmVlbnNob3Qgb3IgRW1wdHkgU3RhdGUgKi99XG4gICAgICAgICAgICAgICAge3NjcmVlbnNob3RzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItY3lhbi01MDAvNDAgYmctc2xhdGUtOTUwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9e3NjcmVlbnNob3RzWzBdLmRhdGFVcmx9XG4gICAgICAgICAgICAgICAgICAgICAgYWx0PXtzY3JlZW5zaG90c1swXS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0yOCBvYmplY3QtY292ZXJcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiBiZy1zbGF0ZS05NTAvOTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtY3lhbi0zMDAgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3NjcmVlbnNob3RzWzBdLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2NyZWVuc2hvdHNbMF0udGltZXN0YW1wfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmPXtzY3JlZW5zaG90c1swXS5kYXRhVXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgZG93bmxvYWQ9e2BIb2xvQXJjaF8ke3NjcmVlbnNob3RzWzBdLmlkfS5wbmdgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCByb3VuZGVkLW1kIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBwb25vd25pZSBkbyBnYWxlcmlpXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1zbGF0ZS04MDAgYmctc2xhdGUtOTUwLzUwIHAtMyBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWNlbnRlciBoLVsxNjBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgPEltYWdlSWNvbiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtc2xhdGUtNTAwIG1iLTEuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0zMDBcIj5CcmFrIHpyenV0w7N3IHogc2Vzamk8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIEtsaWtuaWog4oCeWnJ6dXQgZG8gZ2FsZXJpaeKAnSB3IGRvbG55bSBkb2t1IDNELCBhYnkgemFwaXNhxIcga2FkciBBUlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgICAgey8qIFNlY3Rpb24gMUE6IDUyIFVwbG9hZGVkIFJlZmVyZW5jZSBJbWFnZXMgQ2F0YWxvZyAmIDNEL0FSIFNoYWRlciAmIENBRCBFeHRlbnNpb25zIEh1YiAqL31cbiAgICAgICAgPFN0dWRpb0V4dGVuc2lvbnNIdWJcbiAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgICBvblVwZGF0ZUNvbmZpZz17dXBkYXRlQ29uZmlnfVxuICAgICAgICAgIG9uVXBkYXRlUGFsZXR0ZT17KHBhbCkgPT4gdXBkYXRlVWlTZXR0aW5ncyh7IHBhbGV0dGU6IHBhbCB9KX1cbiAgICAgICAgICBvbkFwcGx5UHJlc2V0UHJvbXB0PXsocHJvbXB0VGV4dCkgPT4gc2V0UXVpY2tQcm9tcHRUZXh0KHByb21wdFRleHQpfVxuICAgICAgICAgIG9uTm90aWZ5PXtzaG93Tm90aWZpY2F0aW9ufVxuICAgICAgICAvPlxuXG4gICAgICAgIHsvKiBTZWN0aW9uIDFCOiBNdWx0aW1vZGFsIEdlbWluaSBBSSBTdHVkaW8gKENoYXQsIE5hbm8gQmFuYW5hIDIuMSBJbWFnZXMsIE9tbmkgRmxhc2ggVmlkZW8sIExpdmUgMy44IFZvaWNlLCBHb29nbGUgU2VhcmNoKSAqL31cbiAgICAgICAgPEdlbWluaVN0dWRpb0h1YlxuICAgICAgICAgIGxhdGVzdFNjcmVlbnNob3Q9e3NjcmVlbnNob3RzWzBdfVxuICAgICAgICAgIGRlZmF1bHRWaXN1YWxQcm9tcHQ9e2dlbmVyYXRlZFByb21wdHMudmlzdWFsUHJvbXB0RU59XG4gICAgICAgICAgb25Ob3RpZnk9e3Nob3dOb3RpZmljYXRpb259XG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIFNlY3Rpb24gMjogUHJvbXB0IEVuZ2luZWVyaW5nIFN0dWRpbyAoXCJKYWsgbmFwaXNhxIcgcHJvbXB0YS4uLlwiKSAqL31cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJwcm9tcHQtc3R1ZGlvXCIgY2xhc3NOYW1lPVwic3BhY2UteS02IHB0LTQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWFtYmVyLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAwMS4gSW7FvHluaWVyaWEgUHJvbXB0w7N3IEFSIC8gVW5pdHkgNiAvIEFJIEdlbmVyYXRvcnNcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC13aGl0ZSBmb250LWRpc3BsYXlcIj5cbiAgICAgICAgICAgICAgICBKYWsgbmFwaXNhxIcgc2t1dGVjem5lZ28gcHJvbXB0YSBkbGEgaG9sb2dyYW3Ds3cgYXJjaGl0ZWt0b25pY3pueWNoIEFSXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbWF4LXctM3hsXCI+XG4gICAgICAgICAgICAgICAgQWJ5IG1vZGVsIEFJIChucC4gQ2xhdWRlLCBHUFQtNG8sIEdlbWluaSwgQ3Vyc29yKSBsdWIgZ2VuZXJhdG9yIHdpenVhbG55XG4gICAgICAgICAgICAgICAgd3lnZW5lcm93YcWCIGtvbXBsZXRuxIUgYXBsaWthY2rEmSBVbml0eSB6IG9ic8WCdWfEhSBjenVqbmlrw7N3IGfFgsSZYmkgQVJLaXQvQVJDb3JlLFxuICAgICAgICAgICAgICAgIHByb21wdCBtdXNpIGJ5xIcgcG9kemllbG9ueSBuYSA2IHByZWN5enlqbnljaCBibG9rw7N3IGFyY2hpdGVrdG9uaWN6bnljaC4gUG9uacW8c3p5XG4gICAgICAgICAgICAgICAgZ2VuZXJhdG9yIHJlYWd1amUgbmEgxbx5d28gbmEgVHdvamUgdXN0YXdpZW5pYSB6IHN5bXVsYXRvcmEuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUHJvbXB0IE1vZGUgU2VsZWN0b3IgVGFicyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0xIHAtMSBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlUHJvbXB0VGFiKCdwbF9tYXN0ZXInKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZVByb21wdFRhYiA9PT0gJ3BsX21hc3RlcidcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi01MDAgdGV4dC1zbGF0ZS05NTAgZm9udC1zZW1pYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFByb21wdCBTeXN0ZW1vd3kgKFBMKVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVByb21wdFRhYignZW5fbWFzdGVyJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLW1kIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICBhY3RpdmVQcm9tcHRUYWIgPT09ICdlbl9tYXN0ZXInXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBTeXN0ZW0gUHJvbXB0IChFTilcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVQcm9tcHRUYWIoJ3Zpc3VhbF9haScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICAgICAgYWN0aXZlUHJvbXB0VGFiID09PSAndmlzdWFsX2FpJ1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgV2l6dWFsaXphY2phIEFJIChNaWRqb3VybmV5KVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVByb21wdFRhYigndW5pdHlfY3NoYXJwJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLW1kIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICBhY3RpdmVQcm9tcHRUYWIgPT09ICd1bml0eV9jc2hhcnAnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBLb2QgVW5pdHkgQyMgKEFSIEZvdW5kYXRpb24pXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02IGl0ZW1zLXN0YXJ0XCI+XG4gICAgICAgICAgICB7LyogTGVmdCBDb2x1bW46IDYgU3RydWN0dXJhbCBQaWxsYXJzIG9mIHRoZSBQcm9tcHQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICBBbmF0b21pYSBpZGVhbG5lZ28gcHJvbXB0YSAoNiBtb2R1xYLDs3cgd3ltYWdhbnljaCB3IHNwZWN5ZmlrYWNqaSk6XG4gICAgICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBudW06ICcwMScsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ0RldGVrY2phIGJsYXTDs3cgaSBwb2TFgsOzZyBwcnpleiBjenVqbmlraSBnxYLEmWJpIChBUktpdCAvIEFSQ29yZSknLFxuICAgICAgICAgICAgICAgICAgZGVzYzogJ1d5bXXFmyB1xbx5Y2llIEFSUGxhbmVNYW5hZ2VyIChIb3Jpem9udGFsKSBwb8WCxIVjem9uZWdvIHogQVJPY2NsdXNpb25NYW5hZ2VyIChUb0YgLyBMaURBUiBEZXB0aCBBUEkpIG9yYXoga2xhc3lmaWthY2rEhSBzZW1hbnR5Y3puxIUgUGxhbmVDbGFzc2lmaWNhdGlvbi5UYWJsZSBpIEZsb29yLicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBudW06ICcwMicsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ1NpbG5payBVbml0eSBVUlAsIE/Fm3dpZXRsZW5pZSDFmnJvZG93aXNrb3dlIGkgT2tsdXpqYScsXG4gICAgICAgICAgICAgICAgICBkZXNjOiAnT2tyZcWbbCBzdWJza3J5cGNqxJkgemRhcnplbmlhIEFSQ2FtZXJhTWFuYWdlci5mcmFtZVJlY2VpdmVkIGRvIG9kY3p5dHUgdGVtcGVyYXR1cnkgYmFyd293ZWogKEspLCBraWVydW5rdSDFm3dpYXTFgmEgaSBva2x1emppIGfFgsSZYmkgKEVudmlyb25tZW50RGVwdGhNb2RlLkJlc3QpLicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBudW06ICcwMycsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ1BhcmFsYWtzYSA2RG9GIG9yYXogZWZla3R5IGN6xIVzdGVjemtvd2UgemEgb2tuYW1pJyxcbiAgICAgICAgICAgICAgICAgIGRlc2M6ICdaZGVmaW5pdWogd2llbG93YXJzdHdvd8SFIHBhcmFsYWtzxJkgKG1hcGEgdyBibGFjaWUgLT4gaG9sb2dyYW0gYnVkeW5rdSAtPiBwYW5lbGUgSFVEKSBvcmF6IHN5c3RlbSBjesSFc3RlY3playBVbml0eSBWRlggR3JhcGggemEgcMWCYXN6Y3p5em5hbWkgb2tpZW4uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG51bTogJzA0JyxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3Rlcm93YW5pZSBkb3R5a293ZSwgcMWCeW5uZSBwcnplasWbY2lhIHNjZW4gaSB6cnp1dHkgZWtyYW51JyxcbiAgICAgICAgICAgICAgICAgIGRlc2M6ICdXc2thxbwgRW5oYW5jZWRUb3VjaCBBUEkgKFBpbmNoLXRvLXNjYWxlIDIgcGFsY2FtaSwgb2Jyw7N0IHdva8OzxYIgb3NpIFkpLCBhbmltYWNqZSBwcnplasWbxIcgKFNtb290aFN0ZXAgKyBEaXNzb2x2ZSBTaGFkZXIpIGkgemFwaXMgZG8gTWVkaWFTdG9yZSAvIFBIUGhvdG9MaWJyYXJ5LicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBudW06ICcwNScsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ1RyeWIgT2ZmbGluZSwgc3luY2hyb25pemFjamEgdyBjaG11cnplIG9yYXogZWtzcG9ydCBPQkovU1RML1BERicsXG4gICAgICAgICAgICAgICAgICBkZXNjOiAnWmHFvMSFZGFqIGxva2FsbmVnbyBjYWNoZSB3IEFwcGxpY2F0aW9uLnBlcnNpc3RlbnREYXRhUGF0aCAocHJhY2EgYmV6IHNpZWNpKSwgc3luY2hyb25pemFjamkgQ2xvdWQgQW5jaG9ycyBvcmF6IHNlcmlhbGl6YWNqaSBzaWF0ZWsgTWVzaEZpbHRlciBkbyAuT0JKLCAuU1RMIGkgcmFwb3J0dSAuUERGLicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBudW06ICcwNicsXG4gICAgICAgICAgICAgICAgICB0aXRsZTogJ1BlcnNvbmFsaXphY2phIFVJIG9yYXogbGlzdGEgd3NwaWVyYW55Y2ggdXJ6xIVkemXFhCBBbmRyb2lkJyxcbiAgICAgICAgICAgICAgICAgIGRlc2M6ICdVd3pnbMSZZG5paiBwcnplxYLEhWN6bmlrIHBhbGV0IHNoYWRlcsOzdywgZ8SZc3RvxZtjaSBpbnRlcmZlanN1IG9yYXogZG9jZWxvd8SFIG1hY2llcnogdGFibGV0w7N3IChHYWxheHkgVGFiIFM5IFVsdHJhLCBPbmVQbHVzIFBhZCAyKSBpIHNtYXJ0Zm9uw7N3IHogc2Vuc29yZW0gVG9GLicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXS5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0ubnVtfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0xXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgdGV4dC1jeWFuLTQwMCB0YWJ1bGFyLW51bXNcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5udW19LlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+e2l0ZW0udGl0bGV9PC9oND5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBsZWFkaW5nLXJlbGF4ZWQgcGwtNlwiPntpdGVtLmRlc2N9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBMaXZlIEludGVyYWN0aXZlIFByb21wdCBPdXRwdXQgQm94ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGJnLVsjMDcwQTEwXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcHgtNCBweS0zIGJnLXNsYXRlLTkwMC85MCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgPEZpbGVDb2RlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57Z2VuZXJhdGVkUHJvbXB0cy50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHlQcm9tcHQoYWN0aXZlUHJvbXB0Q29udGVudCwgYWN0aXZlUHJvbXB0VGFiKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctY3lhbi01MDAgaG92ZXI6YmctY3lhbi00MDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09IGFjdGl2ZVByb21wdFRhYiA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlNrb3Bpb3dhbm8hPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Lb3BpdWogZ290b3d5IHByb21wdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cInAtNSB0ZXh0LXhzIHNtOnRleHQtWzEzcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTIwMCBsZWFkaW5nLXJlbGF4ZWQgb3ZlcmZsb3cteC1hdXRvIG1heC1oLVs1NDBweF0gb3ZlcmZsb3cteS1hdXRvIHdoaXRlc3BhY2UtcHJlLXdyYXBcIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlUHJvbXB0Q29udGVudH1cbiAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICAgIHsvKiBTZWN0aW9uIDM6IEFSIFNlbnNvciBQYXJhbWV0ZXJzLCBFbnZpcm9ubWVudGFsIExpZ2h0aW5nLCBPY2NsdXNpb24gJiBDQUQgRXhwb3J0ICovfVxuICAgICAgICA8c2VjdGlvbiBpZD1cImFyLXBhcmFtZXRlcnNcIiBjbGFzc05hbWU9XCJzcGFjZS15LTYgcHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWN5YW4tNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAwMi4gS29uZmlndXJhY2phIFNwcnrEmXRvd2EgQVJLaXQgLyBBUkNvcmUgaSBNb2R1xYIgRWtzcG9ydHVcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtZGlzcGxheVwiPlxuICAgICAgICAgICAgICBQYXJhbWV0cnkgY3p1am5pa8OzdyBnxYLEmWJpLCBvxZt3aWV0bGVuaWEgxZtyb2Rvd2lza293ZWdvIGkgZm9ybWF0w7N3IGVrc3BvcnR1XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgICAgICB7LyogQ2FyZCAxOiBQbGFuZSBEZXRlY3Rpb24gJiBEZXB0aCBTZW5zb3JzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIERldGVrY2phIEJsYXTDs3cgaSBQb2TFgsOzZ1xuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1jeWFuLTQwMFwiPkFSUGxhbmVNYW5hZ2VyPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBtYi0xLjUgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgRG9jZWxvd3kgRnJhbWV3b3JrIEFSOlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5mcmFtZXdvcmt9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJhbWV3b3JrOiBlLnRhcmdldC52YWx1ZSBhcyBBUkNvbmZpZ1N0YXRlWydmcmFtZXdvcmsnXSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC1zbGF0ZS0yMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTUwMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ1bml0eV9hcmZvdW5kYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICBVbml0eSA2IEFSIEZvdW5kYXRpb24gKEFSS2l0ICsgQVJDb3JlIENyb3NzLVBsYXRmb3JtKVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFyY29yZV9uYXRpdmVcIj5cbiAgICAgICAgICAgICAgICAgICAgICBHb29nbGUgQVJDb3JlIEV4dGVuc2lvbnMgKEFuZHJvaWQgRGVwdGggJiBQbGFuZXMpXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXJraXRfbmF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgQXBwbGUgQVJLaXQgNiBMaURBUiBTY2VuZSBSZWNvbnN0cnVjdGlvblxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBtYi0xLjUgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICAgICAgVHJ5YiByb3pwb3puYXdhbmlhIHBvd2llcnpjaG5pOlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5wbGFuZURldGVjdGlvbk1vZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxhbmVEZXRlY3Rpb25Nb2RlOiBlLnRhcmdldC52YWx1ZSBhcyBBUkNvbmZpZ1N0YXRlWydwbGFuZURldGVjdGlvbk1vZGUnXSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC1zbGF0ZS0yMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTUwMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ0YWJsZV9hbmRfZmxvb3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICBQb3dpZXJ6Y2huaWUgQmxhdHUgU3RvxYJ1ICsgUG9kxYJvZ2kgKEhvcml6b250YWwgRHVhbClcbiAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ0YWJsZV9vbmx5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgV3nFgsSFY3puaWUgcG9kd3nFvHN6b25lIGJsYXR5IHN0b8WCw7N3IGkgYml1cmVrIChUYWJsZXRvcClcbiAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJmdWxsX3NwYXRpYWxcIj5cbiAgICAgICAgICAgICAgICAgICAgICBQZcWCbmEgc2lhdGthIHBvbWllc3pjemVuaWEgKEJsYXQgKyBQb2TFgm9nYSArIE9rbmEpXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB0LTIgY3Vyc29yLXBvaW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+QWt0eXd1aiBjenVqbmlrIGfFgsSZYmkgVG9GIC8gTGlEQVI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLmRlcHRoU2Vuc29yQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUNvbmZpZyh7IGRlcHRoU2Vuc29yQWN0aXZlOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IGFjY2VudC1jeWFuLTUwMCByb3VuZGVkXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gY3Vyc29yLXBvaW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+V2lkb2N6bmEgc2lhdGthIGtvbnN0cnVrY3lqbmEgV2lyZWZyYW1lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy53aXJlZnJhbWVPdmVybGF5fVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUNvbmZpZyh7IHdpcmVmcmFtZU92ZXJsYXk6IGUudGFyZ2V0LmNoZWNrZWQgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgYWNjZW50LWN5YW4tNTAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQ2FyZCAyOiBFbnZpcm9ubWVudGFsIExpZ2h0aW5nICYgRGVwdGggT2NjbHVzaW9uICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxTdW4gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICBPxZt3aWV0bGVuaWUgaSBPa2x1emphXG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTQwMFwiPkhEUiBMaWdodCBFc3QuPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMy41IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICBPxZt3aWV0bGVuaWUgxZtyb2Rvd2lza293ZSBuYSDFvHl3byAoSERSKVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy5lbnZpcm9ubWVudGFsTGlnaHRpbmd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQ29uZmlnKHsgZW52aXJvbm1lbnRhbExpZ2h0aW5nOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IGFjY2VudC1hbWJlci00MDAgcm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlRlbXBlcmF0dXJhIGJhcndvd2Egb3RvY3plbmlhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LWFtYmVyLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb25maWcubGlnaHRUZW1wZXJhdHVyZUt9IEtcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgbWluPXsyODAwfVxuICAgICAgICAgICAgICAgICAgICBtYXg9ezY1MDB9XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9ezEwMH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5saWdodFRlbXBlcmF0dXJlS31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNvbmZpZyh7IGxpZ2h0VGVtcGVyYXR1cmVLOiBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1hbWJlci00MDAgY3Vyc29yLXBvaW50ZXIgaC0xLjUgYmctc2xhdGUtODAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4yODAwSyAoWmFjaMOzZCBzxYJvxYRjYSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPjQ1MDBLIChCaXVybyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPjY1MDBLIChEemllxYQpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB0LTEgY3Vyc29yLXBvaW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgT2tsdXpqYSBnxYLEmWJpIG9iaWVrdMOzdyAoQVJPY2NsdXNpb24pXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBQcnplZG1pb3R5IG5hIGJsYWNpZSAoa3ViZWssIHRhYmxldCkgcHJ6eXPFgmFuaWFqxIUgaG9sb2dyYW1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLm9jY2x1c2lvbkVuYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlQ29uZmlnKHsgb2NjbHVzaW9uRW5hYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCBhY2NlbnQtY3lhbi01MDAgcm91bmRlZCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBDYXJkIDM6IEV4cG9ydCBGb3JtYXRzIChPQkosIFNUTCwgQWR2YW5jZWQgUERGKSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01IHNwYWNlLXktNCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgRWtzcG9ydCBDQUQgaSBEb2t1bWVudGFjamlcbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPk9CSiDCtyBTVEwgwrcgUERGPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgIFV3emdsxJlkbmlqIHcgcHJvbXBjaWUgb3JheiB3eWVrc3BvcnR1aiBiZXpwb8WbcmVkbmlvIHogYmllxbzEhWNlaiBzY2VueSBzaWF0a8SZXG4gICAgICAgICAgICAgICAgICBhcmNoaXRla3Rvbmljem7EhSBkbyBwcm9ncmFtw7N3IENBRC9CbGVuZGVyLCBkcnVrdSAzRCBsdWIgcmFwb3J0dSBQREYuXG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgdGV4dC14cyBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+V3NwYXJjaWUgZWtzcG9ydHUgV2F2ZWZyb250ICguT0JKKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb25maWcuZXhwb3J0Rm9ybWF0cy5vYmp9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0Rm9ybWF0czogeyAuLi5jb25maWcuZXhwb3J0Rm9ybWF0cywgb2JqOiBlLnRhcmdldC5jaGVja2VkIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IGFjY2VudC1jeWFuLTUwMCByb3VuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+V3NwYXJjaWUgZWtzcG9ydHUgZHJ1a3UgM0QgKC5TVEwpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy5leHBvcnRGb3JtYXRzLnN0bH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRGb3JtYXRzOiB7IC4uLmNvbmZpZy5leHBvcnRGb3JtYXRzLCBzdGw6IGUudGFyZ2V0LmNoZWNrZWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgYWNjZW50LWN5YW4tNTAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUV4cG9ydFBERn1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgcHgtNCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctY3lhbi01MDAgaG92ZXI6YmctY3lhbi00MDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBaYWF3YW5zb3dhbnkgUmFwb3J0IGkgUHJvbXB0ICguUERGKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBleHBvcnRQcm9qZWN0VG9HTFRGKGNvbmZpZyk7XG4gICAgICAgICAgICAgICAgICAgICAgc2hvd05vdGlmaWNhdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIGBXeWVrc3BvcnRvd2FubyAuR0xURiAyLjAgKCR7cmVzLm5vZGVDb3VudH0gd8SZesWCw7N3IFBCUiBUcmFuc21pc3Npb24pYFxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB5LTIgcHgtMyB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1jeWFuLTMwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgRWtzcG9ydCAuR0xURiAyLjBcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydFByb2plY3RUb0lGQyhjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgIHNob3dOb3RpZmljYXRpb24oJ1d5ZWtzcG9ydG93YW5vIHBsaWsgQklNIC5JRkMgKExldmVsIDQwMCknKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHktMiBweC0zIHRleHQteHMgZm9udC1tZWRpdW0gYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LWFtYmVyLTMwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgRWtzcG9ydCBCSU0gLklGQ1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICB7LyogU2VjdGlvbiA0OiBVSSBQZXJzb25hbGl6YXRpb24gTWVudSwgT2ZmbGluZSBNb2RlICYgQ2xvdWQgU3luY2hyb25pemF0aW9uICovfVxuICAgICAgICA8c2VjdGlvbiBpZD1cInBlcnNvbmFsaXphdGlvblwiIGNsYXNzTmFtZT1cInNwYWNlLXktNiBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtYW1iZXItNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAwMy4gUGVyc29uYWxpemFjamEgSW50ZXJmZWpzdSwgUHJhY2EgT2ZmbGluZSBpIFN5bmNocm9uaXphY2phIENobXVyeVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1kaXNwbGF5XCI+XG4gICAgICAgICAgICAgIFVzdGF3aWVuaWEgcGVyc29uYWxpemFjamkgSFVEIG9yYXogbW9kdcWCIHN5bmNocm9uaXphY2ppIHByb2pla3TDs3cgbWnEmWR6eSB1cnrEhWR6ZW5pYW1pXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICAgICAgey8qIFBlcnNvbmFsaXphdGlvbiBNZW51ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi02IGJnLXNsYXRlLTkwMC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNSBzcGFjZS15LTVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPFBhbGV0dGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIE1lbnUgUGVyc29uYWxpemFjamkgSW50ZXJmZWpzdSBpIFNoYWRlcmEgQVJcbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5Nb3R5dyB3aXp1YWxueTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgeyhPYmplY3Qua2V5cyhIT0xPR1JBTV9QQUxFVFRFUykgYXMgSG9sb2dyYW1QYWxldHRlSWRbXSkubWFwKChwYWxLZXkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhbCA9IEhPTE9HUkFNX1BBTEVUVEVTW3BhbEtleV07XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gY29uZmlnLnVpU2V0dGluZ3MucGFsZXR0ZSA9PT0gcGFsS2V5O1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17cGFsS2V5fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZVVpU2V0dGluZ3MoeyBwYWxldHRlOiBwYWxLZXkgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQtbGcgYm9yZGVyIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwLzkwIGJvcmRlci1jeWFuLTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzcwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0yMDBcIj57cGFsLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXdoaXRlLzIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBwYWwucHJpbWFyeUhleCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXdoaXRlLzIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBwYWwuc2Vjb25kYXJ5SGV4IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTQgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPld5xZt3aWV0bGFqIHNpYXRrxJkgcMWCYXN6Y3p5em55IHBvZMWCb2dpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2NvbmZpZy51aVNldHRpbmdzLnNob3dQbGFuZUdyaWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlVWlTZXR0aW5ncyh7IHNob3dQbGFuZUdyaWQ6IGUudGFyZ2V0LmNoZWNrZWQgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgYWNjZW50LWN5YW4tNTAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj5aYXdpZXN6b25lIHRhYmxpY2UgdGVsZW1ldHJ5Y3puZSBIVUQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLnVpU2V0dGluZ3Muc2hvd0Zsb2F0aW5nUGFuZWxzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZVVpU2V0dGluZ3MoeyBzaG93RmxvYXRpbmdQYW5lbHM6IGUudGFyZ2V0LmNoZWNrZWQgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgYWNjZW50LWN5YW4tNTAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj5BdXRvbWF0eWN6bnkgb2Jyw7N0IGhvbG9ncmFtdSAzNjDCsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtjb25maWcuYXV0b1JvdGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVDb25maWcoeyBhdXRvUm90YXRlOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IGFjY2VudC1jeWFuLTUwMCByb3VuZGVkXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPkfEmXN0b8WbxIcgb3Bpc8OzdyBIVUQ6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBiZy1zbGF0ZS05NTAgcC0xIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZVVpU2V0dGluZ3MoeyBodWREZW5zaXR5OiAnY29tcGFjdCcgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMXB4XSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnVpU2V0dGluZ3MuaHVkRGVuc2l0eSA9PT0gJ2NvbXBhY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgS29tcGFrdG93eVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVwZGF0ZVVpU2V0dGluZ3MoeyBodWREZW5zaXR5OiAnZGV0YWlsZWQnIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTFweF0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy51aVNldHRpbmdzLmh1ZERlbnNpdHkgPT09ICdkZXRhaWxlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi01MDAgdGV4dC1zbGF0ZS05NTAgZm9udC1zZW1pYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBQZcWCbnlcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE9mZmxpbmUgTW9kZSAmIENsb3VkIFByb2plY3QgU3luY2hyb25pemF0aW9uIE1vZHVsZSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNiBiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8Q2xvdWQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIFRyeWIgT2ZmbGluZSBpIFN5bmNocm9uaXphY2phIENobXVyeVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlciB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8SGFyZERyaXZlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5UcnliIE9mZmxpbmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLm9mZmxpbmVNb2RlRW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZUNvbmZpZyh7IG9mZmxpbmVNb2RlRW5hYmxlZDogZS50YXJnZXQuY2hlY2tlZCB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhY2NlbnQtZW1lcmFsZC01MDBcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkNsb3VkIFN5bmM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Y29uZmlnLmNsb3VkU3luY0VuYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVDb25maWcoeyBjbG91ZFN5bmNFbmFibGVkOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFjY2VudC1jeWFuLTUwMFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU2F2ZUNsb3VkUHJvamVjdH0gY2xhc3NOYW1lPVwiZmxleCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1Byb2plY3ROYW1lfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQcm9qZWN0TmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIk5hendhIG5vd2VnbyBwcm9qZWt0dSBBUiAobnAuIE1ha2lldGEgV2llxbxvd2NhIFdlcnNqYSBCKS4uLlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctY3lhbi01MDAgaG92ZXI6YmctY3lhbi00MDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgWmFwaXN6IGkgU3luY2hyb25penVqXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBtYXgtaC00NCBvdmVyZmxvdy15LWF1dG8gcHItMVwiPlxuICAgICAgICAgICAgICAgIHtzYXZlZFByb2plY3RzLm1hcCgocHJvaikgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e3Byb2ouaWR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBwLTIuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC85MCB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0yMDAgdHJ1bmNhdGVcIj57cHJvai5uYW1lfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvai51cGRhdGVkQXR9IMK3IHtwcm9qLnN5bmNTdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maWcobWVyZ2VXaXRoRGVmYXVsdENvbmZpZyhwcm9qLmNvbmZpZykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93Tm90aWZpY2F0aW9uKGBXY3p5dGFubyBwcm9qZWt0OiAke3Byb2oubmFtZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtY3lhbi0zMDAgcm91bmRlZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgV2N6eXRhalxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIHtzYXZlZFByb2plY3RzLmxlbmd0aCA+IDEgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNhdmVkUHJvamVjdHMoKHByZXYpID0+IHByZXYuZmlsdGVyKChwKSA9PiBwLmlkICE9PSBwcm9qLmlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1yb3NlLTQwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXN1xYQgemFwaXNhbnkgcHJvamVrdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBHb29nbGUgRHJpdmUgQVBJIHYzICYgRmlyZWJhc2UgRmlyZXN0b3JlIENsb3VkIFdvcmtzcGFjZSAqL31cbiAgICAgICAgICA8R29vZ2xlRHJpdmVXb3Jrc3BhY2VQYW5lbFxuICAgICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgICBvbkxvYWRDb25maWc9eyhsb2FkZWRDZmcsIHNvdXJjZUxhYmVsKSA9PiB7XG4gICAgICAgICAgICAgIHNldENvbmZpZyhtZXJnZVdpdGhEZWZhdWx0Q29uZmlnKGxvYWRlZENmZykpO1xuICAgICAgICAgICAgICBzaG93Tm90aWZpY2F0aW9uKGBXY3p5dGFubyBrb25maWd1cmFjasSZIDNEIHogJHtzb3VyY2VMYWJlbH1gKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBsYXRlc3RTY3JlZW5zaG90PXtzY3JlZW5zaG90c1swXX1cbiAgICAgICAgICAgIHN5c3RlbVByb21wdE1hcmtkb3duPXtgJHtnZW5lcmF0ZWRQcm9tcHRzLnN5c3RlbVByb21wdFBMfVxcblxcbi0tLVxcblxcblxcYFxcYFxcYGNzaGFycFxcbiR7Z2VuZXJhdGVkUHJvbXB0cy51bml0eUNTaGFycENvZGV9XFxuXFxgXFxgXFxgYH1cbiAgICAgICAgICAgIG9uTm90aWZ5PXtzaG93Tm90aWZpY2F0aW9ufVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICB7LyogU2VjdGlvbiA1OiBTdXBwb3J0ZWQgTW9iaWxlIERldmljZXMgTWF0cml4IChBbmRyb2lkIFRhYmxldHMgJiBTbWFydHBob25lcykgKi99XG4gICAgICAgIDxzZWN0aW9uIGlkPVwiZGV2aWNlc1wiIGNsYXNzTmFtZT1cInNwYWNlLXktNiBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWQ6aXRlbXMtZW5kIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtY3lhbi00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgMDQuIEtvbXBhdHliaWxub8WbxIcgU3ByesSZdG93YSBBUkNvcmUgLyBBUktpdFxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtZGlzcGxheVwiPlxuICAgICAgICAgICAgICAgIExpc3RhIHdzcGllcmFueWNoIHVyesSFZHplxYQgbW9iaWxueWNoIChTbWFydGZvbnkgaSBUYWJsZXR5IEFuZHJvaWQgb3JheiBpT1MpXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbWF4LXctM3hsXCI+XG4gICAgICAgICAgICAgICAgWmVzdGF3aWVuaWUgY2VydHlmaWtvd2FueWNoIHRhYmxldMOzdyBvcmF6IHNtYXJ0Zm9uw7N3IHogc3lzdGVtZW0gQW5kcm9pZCAob3JhelxuICAgICAgICAgICAgICAgIHJlZmVyZW5jeWpueWNoIHVyesSFZHplxYQgaU9TIExpREFSKSBvYnPFgnVndWrEhWN5Y2ggxZtsZWR6ZW5pZSBwxYJhc3pjenl6biBzdG/FgsOzdy9wb2TFgsOzZyxcbiAgICAgICAgICAgICAgICBtYXBvd2FuaWUgZ8WCxJliaSBUb0Ygb3JheiBvxZt3aWV0bGVuaWUgxZtyb2Rvd2lza293ZSBIRFIgdyBzaWxuaWt1IFVuaXR5LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgey8qIFNlYXJjaCBJbnB1dCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1zbGF0ZS00MDAgYWJzb2x1dGUgbGVmdC0zIHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMlwiIC8+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17ZGV2aWNlU2VhcmNofVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXREZXZpY2VTZWFyY2goZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTenVrYWogbW9kZWx1IGx1YiBjenVqbmlrYS4uLlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwbC04IHByLTMgcHktMS41IHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEZvcm0gRmFjdG9yIEZpbHRlciBCdXR0b25zICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHAtMSBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnQUxMJywgbGFiZWw6ICdXc3p5c3RraWUnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnVGFibGV0IEFuZHJvaWQnLCBsYWJlbDogJ1RhYmxldHkgQW5kcm9pZCcgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdTbWFydGZvbiBBbmRyb2lkJywgbGFiZWw6ICdTbWFydGZvbnkgQW5kcm9pZCcgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdVcnrEhWR6ZW5pZSBpT1MgKFJlZmVyZW5jeWpuZSknLCBsYWJlbDogJ2lPUyBMaURBUicgfSxcbiAgICAgICAgICAgICAgICBdLm1hcCgodGFiKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17dGFiLmlkfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXREZXZpY2VGaWx0ZXIodGFiLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLW1kIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICAgICAgZGV2aWNlRmlsdGVyID09PSB0YWIuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3RhYi5sYWJlbH1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IGJvcmRlci1jb2xsYXBzZVwiPlxuICAgICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGJnLXNsYXRlLTk1MC83MCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtNFwiPlByb2R1Y2VudCBpIE1vZGVsPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtNFwiPlR5cCBVcnrEhWR6ZW5pYTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTRcIj5TeXN0ZW0gaSBTREsgQVI8L3RoPlxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMyBweC00XCI+Q3p1am5payBHxYLEmWJpIChEZXB0aCBTZW5zb3IpPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtNFwiPlByZWN5emphIEJsYXQgLyBQb2TFgm9nYTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0zIHB4LTRcIj5Pa2x1emphPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtNCB0ZXh0LXJpZ2h0XCI+RG9jZWxvd2UgRlBTPC90aD5cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTMgcHgtNFwiPlN0YWJpbG5vxZvEhyBGUFMgdyBTZXNqaSBBUiAoU3BhcmtsaW5lIENTUyk8L3RoPlxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtODAwLzcwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZERldmljZXMubWFwKChkZXYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FtcGxlcyA9XG4gICAgICAgICAgICAgICAgICAgICAgQXJyYXkuaXNBcnJheShkZXYuZnBzU2FtcGxlcykgJiYgZGV2LmZwc1NhbXBsZXMubGVuZ3RoID4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkZXYuZnBzU2FtcGxlc1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBbZGV2LnRhcmdldEZwcywgZGV2LnRhcmdldEZwcywgZGV2LnRhcmdldEZwcywgZGV2LnRhcmdldEZwc107XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YWJpbGl0eSA9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGRldi5mcHNTdGFiaWxpdHlQZXJjZW50ID09PSAnbnVtYmVyJyA/IGRldi5mcHNTdGFiaWxpdHlQZXJjZW50IDogOTkuMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25lUGVyY2VudExvdyA9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIGRldi5mcHMxUGVyY2VudExvdyA9PT0gJ251bWJlcidcbiAgICAgICAgICAgICAgICAgICAgICAgID8gZGV2LmZwczFQZXJjZW50TG93XG4gICAgICAgICAgICAgICAgICAgICAgICA6IGRldi50YXJnZXRGcHMgLSAyO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGFya0NoYXJzID0gWyfiloInLCAn4paDJywgJ+KWhCcsICfiloUnLCAn4paGJywgJ+KWhycsICfilognXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWluU2FtcGxlID0gZGV2LnRhcmdldEZwcyAtIDEwO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0U3BhcmtsaW5lID0gc2FtcGxlc1xuICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKGZwcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9ybSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIChmcHMgLSBtaW5TYW1wbGUpIC8gMTApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoYXJJZHggPSBNYXRoLnJvdW5kKG5vcm0gKiAoc3BhcmtDaGFycy5sZW5ndGggLSAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3BhcmtDaGFyc1tjaGFySWR4XTtcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIC5qb2luKCcnKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkZXYuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJob3ZlcjpiZy1zbGF0ZS04MDAvNDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTQgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIHdoaXRlc3BhY2Utbm93cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtkZXYuYnJhbmR9IHtkZXYubW9kZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtNCB0ZXh0LXNsYXRlLTMwMCB3aGl0ZXNwYWNlLW5vd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtkZXYuZm9ybUZhY3Rvci5pbmNsdWRlcygnVGFibGV0JykgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGFibGV0IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGV2LmZvcm1GYWN0b3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC00IHRleHQtc2xhdGUtMzAwIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7ZGV2Lm9zVmVyc2lvbn0gwrcge2Rldi5hckNvcmVPcktpdFN1cHBvcnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtNCB0ZXh0LXNsYXRlLTMwMFwiPntkZXYuZGVwdGhTZW5zb3J9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTQgZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtkZXYucGxhbmVEZXRlY3Rpb25BY2N1cmFjeX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC00IHRleHQtc2xhdGUtMzAwXCI+e2Rldi5vY2NsdXNpb25TdXBwb3J0fTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC00IHRleHQtcmlnaHQgZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtc2VtaWJvbGQgd2hpdGVzcGFjZS1ub3dyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Rldi50YXJnZXRGcHN9IEZQU1xuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTQgd2hpdGVzcGFjZS1ub3dyYXBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IGZvbnQtbW9ubyB0YWJ1bGFyLW51bXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtgUHLDs2JraSBzZXNqaSBBUiAoJHtzYW1wbGVzLmxlbmd0aH0gcG9taWFyw7N3KTogJHtzYW1wbGVzLmpvaW4oJyAvICcpfSBGUFMgwrcgMSUgTG93OiAke29uZVBlcmNlbnRMb3d9IEZQU2B9XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogUHVyZS1DU1MgTWljcm8tQmFyICsgVGV4dHVhbCBCbG9jayBTcGFya2xpbmUgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1lbmQgZ2FwLVsycHhdIGgtNCBweC0xLjUgcHktMC41IHJvdW5kZWQgYmctc2xhdGUtOTUwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2FtcGxlcy5tYXAoKHNhbXBsZSwgc0lkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByYXRpbyA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAuMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5taW4oMSwgKHNhbXBsZSAtIChkZXYudGFyZ2V0RnBzIC0gMTIpKSAvIDEyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0RpcCA9IHNhbXBsZSA8IGRldi50YXJnZXRGcHMgLSAzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3NJZHh9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IGAke01hdGgucm91bmQocmF0aW8gKiAxMDApfSVgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LVszcHhdIHJvdW5kZWQtdC1bMXB4XSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0RpcFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTQwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHN0YWJpbGl0eSA+PSA5OVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWN5YW4tNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFRleHR1YWwgQ1NTIFNwYXJrbGluZSBHbHlwaCBTZXF1ZW5jZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTFweF0gdHJhY2tpbmctdGlnaHRlciBzZWxlY3QtYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWJpbGl0eSA+PSA5OVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1jeWFuLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17YFd5a3JlcyB0ZWtzdG93eSBzdGFiaWxub8WbY2k6ICR7dGV4dFNwYXJrbGluZX1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0U3BhcmtsaW5lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBTdGFiaWxpdHkgJSAmIDElIExvdyBUZWxlbWV0cnkgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdGFiaWxpdHkudG9GaXhlZCgxKX0leycgJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChtaW4ge29uZVBlcmNlbnRMb3d9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDwvbWFpbj5cblxuICAgICAgey8qIENsZWFuIFF1aWV0IEZvb3RlciAqL31cbiAgICAgIDxmb290ZXIgY2xhc3NOYW1lPVwibXQtYXV0byBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIHB5LTYgcHgtNiB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctWzE0MDBweF0gbXgtYXV0byBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIEhvbG9BcmNoIEFSIFN0dWRpbyDigJQgR2VuZXJhdG9yIFByb21wdMOzdyBBcmNoaXRla3Rvbmljem55Y2ggaSBTeW11bGF0b3IgM0QgKFVuaXR5IEFSS2l0IC9cbiAgICAgICAgICAgIEFSQ29yZSlcbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnRQREZ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtY3lhbi00MDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQb2JpZXJ6IHBlxYJuxIUgZG9rdW1lbnRhY2rEmSBQREZcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+wrc8L3NwYW4+XG4gICAgICAgICAgICA8YSBocmVmPVwiI3Byb21wdC1zdHVkaW9cIiBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWN5YW4tNDAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgIEtvcGl1aiBQcm9tcHQgU3lzdGVtb3d5XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb290ZXI+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXX0=