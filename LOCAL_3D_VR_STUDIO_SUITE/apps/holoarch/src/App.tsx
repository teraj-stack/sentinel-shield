const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport12_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport12_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch/node_modules/.vite/deps/react.js?v=50682de0";
import { BookmarkPlus, Boxes, Check, Cloud, Copy, Download, ExternalLink, FilePlus2, FolderOpen, ImagePlus, LogIn, LogOut, Maximize, Paintbrush, Sparkles, Trash2, X } from "/apps/holoarch/node_modules/.vite/deps/lucide-react.js?v=50682de0";
import { BUILDING_TELEMETRY, generateMasterPrompts, getContextualPromptSuggestions } from "/apps/holoarch/src/data/promptTemplates.ts";
import { HoloArchScene } from "/apps/holoarch/src/three/HoloArchScene.tsx";
import { BottomControlDock } from "/apps/holoarch/src/components/BottomControlDock.tsx";
import { ResourceMonitorPanel } from "/apps/holoarch/src/components/ResourceMonitorPanel.tsx";
import { InteractiveGlassPanelWidget } from "/apps/holoarch/src/components/InteractiveGlassPanelWidget.tsx";
import { createInitialSubModelOverrides, UnifiedSpatialModelComposer } from "/apps/holoarch/src/components/UnifiedSpatialModelComposer.tsx";
import { PromptWorkbenchModal } from "/apps/holoarch/src/components/PromptWorkbenchModal.tsx";
import { FullScreenModelViewerModal, TEXTURE_PRESET_OPTIONS } from "/apps/holoarch/src/components/FullScreenModelViewerModal.tsx";
import { broadcastConfigToWindows, createFreshNewModelConfig, deleteProjectSlotFromLocal, exportARConfigToJsonFile, getSavedProjectSlots, loadSyncedWindowConfig, parseARConfigFromJsonString, saveProjectSlotToLocal, subscribeToWindowConfigSync } from "/apps/holoarch/src/utils/configStorage.ts";
import { auth, deleteProjectFromFirestore, onAuthStateChanged, restoreConfigFromCloudProject, saveProjectToFirestore, signInWithGooglePopup, signOutUser, subscribeUserProjects } from "/apps/holoarch/src/firebase.ts";
var _jsxFileName = "/app/applet/src/App.tsx";
import __vite__cjsImport12_react_jsxDevRuntime from "/apps/holoarch/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=50682de0";
export default function App() {
	const [config, setConfig] = useState(() => {
		const initialBase = {
			arFramework: "ARFoundation (ARKit + ARCore)",
			renderPipeline: "Unity URP (Universal Render Pipeline)",
			planeDetection: "Blat stołu + Podłoga (Dual Horizontal)",
			hologramStyle: "Wolumetryczna Siatka Cyjanowa",
			occlusionMode: "Głębia Środowiskowa (Environment Depth)",
			windowParticles: "Złoty Pył Świetlny + Smugi Wolumetryczne",
			mobileDeviceProfile: "iPhone 16 Pro (A18 Pro + LiDAR)",
			buildingsPerGroup: 5,
			buildingFloorCount: 108,
			buildingLayout: "Metropolia Centralna (Zdj. 2 · Global Network)",
			layoutDepthScatter: .9,
			modelOrientation916: "Pionowe Wieżowce (Klasyczne)",
			hudScreenStyle: "Hologramy Global Network (Zdj. 2 · Telemetria & Mapa)",
			buildingTexturePreset: "Hologram Diagrid (Domyślny Cyjan-Złoto)",
			customBuildingTextureUrl: null,
			buildingTextureScale: 1,
			buildingTextureOpacity: .88,
			unifiedModelAssembled: true,
			selectedSubModelId: "central_nexus_0",
			subModelOverrides: {},
			customReferenceImageUrl: "/apps/holoarch/assets/aistudio/zdj._2.png_2K_20261023121510_e9b21b0c.jpg",
			showReferenceBillboardIn3D: true,
			tableSizePreset: "Monumentalny Sztabowy (5.4m × 2.6m)",
			tableWidthMeters: 5.4,
			tableDepthMeters: 2.6,
			roomSizePreset: "Niestandardowy wymiar sali",
			roomWidthMeters: 21,
			roomDepthMeters: 18,
			hologramMeshDensity: 1,
			parallaxIntensity: .85,
			pendulumSpeed: .15,
			autoParallax: true,
			explodedView: 0,
			envLightingIntensity: 1.2,
			windowParticleDensity: 1,
			enableAtmosphericFog: true,
			enableNightMode: false,
			enableBuildingShadows: true,
			shadowMapQuality: "Wysoka (2048×2048 · Crisp PCF)",
			showDepthGrid: true,
			showOcclusionObjects: true,
			showFloatingHudPanels: true,
			showResourceMonitor: true,
			cameraPreset: "overview",
			selectedBuilding: null,
			triggerScanPulse: 0
		};
		initialBase.subModelOverrides = createInitialSubModelOverrides(initialBase);
		const isStandaloneParam = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("fullscreenModel") === "1";
		if (isStandaloneParam) {
			return loadSyncedWindowConfig(initialBase);
		}
		return initialBase;
	});
	const [liveMetrics, setLiveMetrics] = useState({
		measuredWebglFps: 60,
		webglDrawCalls: 48,
		webglTriangles: 24500
	});
	const [workbenchOpen, setWorkbenchOpen] = useState(false);
	const [workbenchTab, setWorkbenchTab] = useState("prompts");
	const [copiedHeaderCta, setCopiedHeaderCta] = useState(false);
	// Interactive Glass Screen state (synced with the 5 floating 3D glass panels)
	const [activeGlassPanel, setActiveGlassPanel] = useState("prism");
	const [activeGlassIconIdx, setActiveGlassIconIdx] = useState(0);
	const [glassWidgetExpanded, setGlassWidgetExpanded] = useState(true);
	// Unified Composite Spatial Model Composer drawer & Fullscreen Texture Viewer state
	const [composerOpen, setComposerOpen] = useState(false);
	const [isStandaloneWindow] = useState(() => {
		if (typeof window === "undefined") return false;
		return new URLSearchParams(window.location.search).get("fullscreenModel") === "1";
	});
	const [fullscreenViewerOpen, setFullscreenViewerOpen] = useState(() => {
		if (typeof window === "undefined") return false;
		return new URLSearchParams(window.location.search).get("fullscreenModel") === "1";
	});
	const [jsonStatusMessage, setJsonStatusMessage] = useState(null);
	const [savedSlots, setSavedSlots] = useState(() => getSavedProjectSlots());
	const [currentUser, setCurrentUser] = useState(null);
	const [cloudProjects, setCloudProjects] = useState([]);
	useEffect(() => {
		const unsubAuth = onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
		return () => unsubAuth();
	}, []);
	useEffect(() => {
		if (!currentUser) {
			setCloudProjects([]);
			return;
		}
		const unsubCloud = subscribeUserProjects(currentUser, (items) => {
			setCloudProjects(items);
		});
		return () => unsubCloud();
	}, [currentUser]);
	// Keep separate windows (?fullscreenModel=1) synchronized in real time via BroadcastChannel
	useEffect(() => {
		const unsubSync = subscribeToWindowConfigSync(config, (syncedConfig) => {
			setConfig(syncedConfig);
		});
		return () => unsubSync();
	}, []);
	const handleUpdateConfig = (partial) => {
		setConfig((prev) => {
			const next = {
				...prev,
				...partial
			};
			broadcastConfigToWindows(next);
			return next;
		});
	};
	const handleGoogleSignIn = async () => {
		try {
			await signInWithGooglePopup();
			setJsonStatusMessage("Zalogowano przez Google (Chmura Firebase)");
			setTimeout(() => setJsonStatusMessage(null), 3e3);
		} catch {
			setJsonStatusMessage("Logowanie Google przerwane");
			setTimeout(() => setJsonStatusMessage(null), 3e3);
		}
	};
	const handleGoogleSignOut = async () => {
		await signOutUser();
		setJsonStatusMessage("Wylogowano z chmury Firebase");
		setTimeout(() => setJsonStatusMessage(null), 2500);
	};
	const handleSaveToCloudFirestore = async () => {
		try {
			let user = currentUser;
			if (!user) {
				user = await signInWithGooglePopup();
			}
			await saveProjectToFirestore(user, config);
			setJsonStatusMessage("Zapisano model i tekstury w Chmurze Firestore!");
			setTimeout(() => setJsonStatusMessage(null), 3500);
		} catch {
			setJsonStatusMessage("Błąd zapisu do Chmury Firestore");
			setTimeout(() => setJsonStatusMessage(null), 3500);
		}
	};
	const handleLoadFromCloudFirestore = (proj) => {
		setConfig((prev) => {
			const restored = restoreConfigFromCloudProject(proj, prev);
			broadcastConfigToWindows(restored);
			return restored;
		});
		setJsonStatusMessage(`Wczytano z chmury: ${proj.name}`);
		setTimeout(() => setJsonStatusMessage(null), 3e3);
	};
	const handleCustomBuildingTextureUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				handleUpdateConfig({
					customBuildingTextureUrl: reader.result,
					buildingTexturePreset: "Własna Tekstura z Pliku (Custom UV Map)",
					buildingTextureOpacity: Math.max(.92, config.buildingTextureOpacity)
				});
				setJsonStatusMessage("Nałożono własną teksturę UV na model 3D");
				setTimeout(() => setJsonStatusMessage(null), 3e3);
			}
		};
		reader.readAsDataURL(file);
	};
	const handleExportConfigJson = () => {
		exportARConfigToJsonFile(config);
		setJsonStatusMessage("Zapisano ustawienia do pliku .JSON");
		setTimeout(() => setJsonStatusMessage(null), 3e3);
	};
	const handleSaveSlotToBrowser = () => {
		const nextSlots = saveProjectSlotToLocal(config);
		setSavedSlots(nextSlots);
		setJsonStatusMessage("Zapisano projekt na liście w przeglądarce");
		setTimeout(() => setJsonStatusMessage(null), 3e3);
	};
	const handleLoadSlotFromBrowser = (slot) => {
		setConfig({
			...slot.config,
			triggerScanPulse: Date.now()
		});
		setJsonStatusMessage(`Wczytano: ${slot.name}`);
		setTimeout(() => setJsonStatusMessage(null), 3e3);
	};
	const handleDeleteSlotFromBrowser = (slotId) => {
		setSavedSlots(deleteProjectSlotFromLocal(slotId));
	};
	const handleStartNewModel = () => {
		// Auto-save current model to browser slots so user can always come back to it in 1 click
		const nextSlots = saveProjectSlotToLocal(config, "Auto-zapis przed Nowym Modelem");
		setSavedSlots(nextSlots);
		setConfig((prev) => createFreshNewModelConfig(prev));
		setJsonStatusMessage("Zapisano poprzedni stan i otwarto Nowy Model");
		setTimeout(() => setJsonStatusMessage(null), 3500);
	};
	const handleImportConfigJsonFile = (file) => {
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				try {
					setConfig((prev) => {
						const loaded = parseARConfigFromJsonString(reader.result, prev);
						return loaded;
					});
					setJsonStatusMessage("Wczytano ustawienia projektu z .JSON");
					setTimeout(() => setJsonStatusMessage(null), 3500);
				} catch {
					setJsonStatusMessage("Błąd odczytu pliku .JSON");
					setTimeout(() => setJsonStatusMessage(null), 3500);
				}
			}
		};
		reader.readAsText(file);
	};
	const handleAssembleUnifiedModel = () => {
		setConfig((prev) => {
			const freshOverrides = Object.keys(prev.subModelOverrides).length > 0 && prev.unifiedModelAssembled ? prev.subModelOverrides : createInitialSubModelOverrides(prev);
			return {
				...prev,
				unifiedModelAssembled: true,
				subModelOverrides: freshOverrides,
				selectedSubModelId: prev.selectedSubModelId || "central_nexus_0",
				triggerScanPulse: Date.now()
			};
		});
		setComposerOpen(true);
	};
	const handleRebuildCompositeFromGlobal = () => {
		setConfig((prev) => ({
			...prev,
			unifiedModelAssembled: true,
			subModelOverrides: createInitialSubModelOverrides(prev),
			triggerScanPulse: Date.now()
		}));
	};
	const handleUpdateSubModel = (id, partial) => {
		setConfig((prev) => {
			const existing = prev.subModelOverrides[id];
			if (!existing) return prev;
			return {
				...prev,
				unifiedModelAssembled: true,
				subModelOverrides: {
					...prev.subModelOverrides,
					[id]: {
						...existing,
						...partial
					}
				}
			};
		});
	};
	const handleOpenWorkbench = (tab) => {
		setWorkbenchTab(tab);
		setWorkbenchOpen(true);
	};
	const handleCopyMasterPrompt = () => {
		const { visualPromptPL } = generateMasterPrompts(config);
		navigator.clipboard.writeText(visualPromptPL);
		setCopiedHeaderCta(true);
		setTimeout(() => setCopiedHeaderCta(false), 2200);
	};
	const quickContextualSuggestions = getContextualPromptSuggestions("", config);
	const handleApplyQuickSuggestion = (suggestion) => {
		if (suggestion.configPatch) {
			handleUpdateConfig({
				...suggestion.configPatch,
				triggerScanPulse: Date.now()
			});
		}
		navigator.clipboard.writeText(suggestion.snippetPL);
		setJsonStatusMessage(`Skopiowano i zastosowano: Krok ${suggestion.stepNumber}`);
		setTimeout(() => setJsonStatusMessage(null), 2800);
	};
	const handleTopReferenceUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				handleUpdateConfig({
					customReferenceImageUrl: reader.result,
					showReferenceBillboardIn3D: true
				});
			}
		};
		reader.readAsDataURL(file);
	};
	useEffect(() => {
		const onKeyDown = (e) => {
			if (e.key === "Escape") {
				if (workbenchOpen) setWorkbenchOpen(false);
				else if (composerOpen) setComposerOpen(false);
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [workbenchOpen, composerOpen]);
	const selectedTelemetry = config.selectedBuilding ? BUILDING_TELEMETRY[config.selectedBuilding] : null;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "relative w-screen h-screen overflow-hidden bg-[#060b13] text-slate-100 select-none flex flex-col",
		children: [/* @__PURE__ */ _jsxDEV("header", {
			className: "relative z-20 flex items-center justify-between gap-8 px-6 py-3.5 bg-[#070d18] border-b border-slate-800/90",
			children: [
				/* @__PURE__ */ _jsxDEV("a", {
					href: "#top",
					onClick: (e) => {
						e.preventDefault();
						setWorkbenchOpen(false);
					},
					className: "text-lg font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0",
					children: "HoloArch AR"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 443,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("nav", {
					className: "hidden md:flex items-center gap-6 text-sm font-medium text-slate-300",
					children: [
						/* @__PURE__ */ _jsxDEV("a", {
							href: "#symulator",
							onClick: (e) => {
								e.preventDefault();
								setWorkbenchOpen(false);
							},
							className: `hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${!workbenchOpen && !composerOpen ? "text-sky-400 underline" : ""}`,
							children: "Symulator 3D AR"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 456,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("a", {
							href: "#wspolny-model",
							onClick: (e) => {
								e.preventDefault();
								setWorkbenchOpen(false);
								handleAssembleUnifiedModel();
							},
							className: `hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${composerOpen && !workbenchOpen ? "text-sky-400 underline" : ""}`,
							children: "Wspólny Model 3D"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 468,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("a", {
							href: "#prompty",
							onClick: (e) => {
								e.preventDefault();
								handleOpenWorkbench("prompts");
							},
							className: `hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${workbenchOpen && workbenchTab === "prompts" ? "text-sky-400 underline" : ""}`,
							children: "Kreator Promptów"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 481,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("a", {
							href: "#skrypty-unity",
							onClick: (e) => {
								e.preventDefault();
								handleOpenWorkbench("unity_code");
							},
							className: `hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${workbenchOpen && workbenchTab === "unity_code" ? "text-sky-400 underline" : ""}`,
							children: "Skrypty Unity C#"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 495,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("a", {
							href: "#referencja",
							onClick: (e) => {
								e.preventDefault();
								handleOpenWorkbench("reference");
							},
							className: `hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${workbenchOpen && workbenchTab === "reference" ? "text-sky-400 underline" : ""}`,
							children: "Obraz Referencyjny (16:9)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 509,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 455,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-3 shrink-0",
					children: /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: handleCopyMasterPrompt,
						className: "px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5",
						children: copiedHeaderCta ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 534,
							columnNumber: 17
						}, this), "Skopiowano Prompt AR"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 533,
							columnNumber: 15
						}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 539,
							columnNumber: 17
						}, this), "Kopiuj Prompt Główny"] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 538,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 527,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 526,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 441,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("main", {
			className: "relative flex-1 w-full overflow-hidden",
			children: [
				/* @__PURE__ */ _jsxDEV(HoloArchScene, {
					config,
					onSelectBuilding: (id) => handleUpdateConfig({ selectedBuilding: id }),
					onSelectSubModel: (subId, clusterId) => {
						handleUpdateConfig({
							selectedSubModelId: subId,
							selectedBuilding: clusterId
						});
					},
					onSelectHudScreen: (panelType, activeIconIndex) => {
						setActiveGlassPanel(panelType);
						setActiveGlassIconIdx(activeIconIndex);
						setGlassWidgetExpanded(true);
					},
					onUpdateMetrics: setLiveMetrics
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 549,
					columnNumber: 9
				}, this),
				!workbenchOpen && /* @__PURE__ */ _jsxDEV("div", {
					className: "absolute top-4 left-6 z-10 max-w-md pointer-events-auto max-h-[calc(100vh-140px)] overflow-y-auto pr-1",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-[#091220]/90 border border-slate-800 rounded-xl p-3.5 shadow-xl",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ _jsxDEV("h1", {
									className: "text-sm font-bold text-slate-100 tracking-tight",
									children: "Hologramy Architektoniczne AR w Czasie Rzeczywistym"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 576,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1.5 shrink-0",
									children: [/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: handleAssembleUnifiedModel,
										className: "px-2.5 py-1 text-xs font-bold bg-indigo-500/25 hover:bg-indigo-500/40 text-indigo-200 border border-indigo-400/50 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap",
										children: [/* @__PURE__ */ _jsxDEV(Boxes, { className: "w-3 h-3 text-indigo-300" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 585,
											columnNumber: 21
										}, this), "Wspólny Model"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 580,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleOpenWorkbench("prompts"),
										className: "px-2.5 py-1 text-xs font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded-md transition-colors flex items-center gap-1 whitespace-nowrap",
										children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3 h-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 593,
											columnNumber: 21
										}, this), "Prompt"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 588,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 579,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 575,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mt-1.5 font-mono tabular-nums",
								children: [
									/* @__PURE__ */ _jsxDEV("span", { children: config.buildingLayout.split(" ")[0] }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 601,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										"aria-hidden": "true",
										children: "·"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 602,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: config.modelOrientation916.split(" (")[0] }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 603,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										"aria-hidden": "true",
										children: "·"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 604,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: [config.buildingsPerGroup, " bud./grupę"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 605,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										"aria-hidden": "true",
										children: "·"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 606,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: [config.buildingFloorCount, " pięter"] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 607,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 600,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2.5 pt-2.5 border-t border-slate-800/80 space-y-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between gap-2.5",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "w-20 aspect-video rounded-md overflow-hidden border border-sky-500/40 bg-[#040811] shrink-0",
											children: /* @__PURE__ */ _jsxDEV("img", {
												src: config.customReferenceImageUrl,
												alt: "Miniatura poziomego obrazu referencyjnego",
												referrerPolicy: "no-referrer",
												className: "w-full h-full object-cover"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 615,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 614,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "text-[11px] text-slate-300 leading-tight",
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "font-semibold text-slate-100",
												children: "Obraz Referencyjny (Prostokąt Poziomy)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 623,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "text-slate-400 mt-0.5",
												children: [
													"Format 16:9 ·",
													" ",
													config.showReferenceBillboardIn3D ? "Aktywny w 3D" : "Gotowy do podglądu"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 626,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 622,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 613,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "px-2 py-1 text-[11px] font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded cursor-pointer transition-colors flex items-center gap-1",
											children: [
												/* @__PURE__ */ _jsxDEV(ImagePlus, { className: "w-3 h-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 637,
													columnNumber: 23
												}, this),
												"Wgraj",
												/* @__PURE__ */ _jsxDEV("input", {
													type: "file",
													accept: "image/*",
													onChange: handleTopReferenceUpload,
													className: "hidden"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 639,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 636,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => handleOpenWorkbench("reference"),
											className: "px-2 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700",
											children: "16:9"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 646,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 635,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 612,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-2 gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => {
											setConfig((prev) => {
												const nextCfg = {
													...prev,
													buildingsPerGroup: 5,
													buildingFloorCount: 108,
													buildingLayout: "Metropolia Centralna (Zdj. 2 · Global Network)",
													modelOrientation916: "Pionowe Wieżowce (Klasyczne)",
													hudScreenStyle: "Hologramy Global Network (Zdj. 2 · Telemetria & Mapa)",
													hologramStyle: "Wolumetryczna Siatka Cyjanowa",
													customReferenceImageUrl: "/apps/holoarch/assets/aistudio/zdj._2.png_2K_20261023121510_e9b21b0c.jpg",
													triggerScanPulse: Date.now()
												};
												nextCfg.subModelOverrides = createInitialSubModelOverrides(nextCfg);
												broadcastConfigToWindows(nextCfg);
												return nextCfg;
											});
											setJsonStatusMessage("Wczytano Model 3D: Zdj. 2 (Global Network Metropolis)");
											setTimeout(() => setJsonStatusMessage(null), 3e3);
										},
										className: `px-2 py-1.5 text-[11px] font-semibold rounded-md border transition-colors flex items-center justify-center gap-1 ${config.buildingLayout === "Metropolia Centralna (Zdj. 2 · Global Network)" ? "bg-sky-500/25 border-sky-400 text-sky-200" : "bg-[#060c17] border-slate-800 text-slate-300 hover:text-white"}`,
										children: "Model Zdj. 2 (Global Network)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 658,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => {
											setConfig((prev) => {
												const nextCfg = {
													...prev,
													buildingsPerGroup: 3,
													buildingFloorCount: 86,
													buildingLayout: "Łuk Amfiteatralny (Półkole 3D)",
													modelOrientation916: "Układ Poziomy 9:16 (Horyzontalne Kompleksy)",
													hudScreenStyle: "Szklany Panel Interaktywny (Frosted Glass UI)",
													hologramStyle: "Diagrid Exoskeleton + Rdzeń BIM",
													customReferenceImageUrl: "/apps/holoarch/assets/aistudio/Pulpit_centrum_1_33b90400.jpg",
													triggerScanPulse: Date.now()
												};
												nextCfg.subModelOverrides = createInitialSubModelOverrides(nextCfg);
												broadcastConfigToWindows(nextCfg);
												return nextCfg;
											});
											setJsonStatusMessage("Wczytano Model 3D: Zdj. 1 (3 Klastry Architektoniczne)");
											setTimeout(() => setJsonStatusMessage(null), 3e3);
										},
										className: `px-2 py-1.5 text-[11px] font-semibold rounded-md border transition-colors flex items-center justify-center gap-1 ${config.buildingLayout !== "Metropolia Centralna (Zdj. 2 · Global Network)" ? "bg-indigo-500/25 border-indigo-400 text-indigo-200" : "bg-[#060c17] border-slate-800 text-slate-300 hover:text-white"}`,
										children: "Model Zdj. 1 (3 Klastry 9:16)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 695,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 657,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 611,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2.5 pt-2.5 border-t border-slate-800/80 space-y-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-[11px] font-bold text-sky-300 flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Paintbrush, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 739,
											columnNumber: 21
										}, this), "Tekstury Modelu 3D & Pełny Ekran:"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 738,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [/* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => {
												broadcastConfigToWindows(config);
												setFullscreenViewerOpen(true);
											},
											title: "Otwórz dedykowane okno wizualizacji modelu 3D na pełnym ekranie wraz ze studiem nakładania tekstur",
											className: "px-2.5 py-1 text-[11px] font-bold bg-sky-400 hover:bg-sky-300 text-slate-950 rounded transition-colors flex items-center gap-1",
											children: [/* @__PURE__ */ _jsxDEV(Maximize, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 753,
												columnNumber: 23
											}, this), "Pełny Ekran 3D"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 744,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("a", {
											href: `${window.location.origin}${window.location.pathname}?fullscreenModel=1`,
											target: "_blank",
											rel: "noopener noreferrer",
											onClick: () => broadcastConfigToWindows(config),
											title: "Otwórz wizualizację modelu 3D na pełnym ekranie w osobnym oknie przeglądarki (synchronizacja na żywo)",
											className: "px-2 py-1 text-[11px] font-bold bg-indigo-500/25 hover:bg-indigo-500/40 text-indigo-200 border border-indigo-400/50 rounded transition-colors flex items-center gap-1",
											children: [/* @__PURE__ */ _jsxDEV(ExternalLink, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 765,
												columnNumber: 23
											}, this), "Osobne Okno"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 757,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 743,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 737,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV("select", {
										value: config.buildingTexturePreset,
										onChange: (e) => {
											const nextPreset = e.target.value;
											handleUpdateConfig({
												buildingTexturePreset: nextPreset,
												buildingTextureOpacity: nextPreset === "Hologram Diagrid (Domyślny Cyjan-Złoto)" ? .84 : Math.max(.92, config.buildingTextureOpacity)
											});
										},
										"aria-label": "Wybierz teksturę fasady modelu 3D",
										className: "flex-1 min-w-0 bg-[#050b14] border border-slate-700 rounded px-2 py-1 text-[11px] text-slate-100 focus:outline-none focus:border-sky-400",
										children: TEXTURE_PRESET_OPTIONS.map((opt) => /* @__PURE__ */ _jsxDEV("option", {
											value: opt.id,
											children: ["Tekstura: ", opt.shortLabel]
										}, opt.id, true, {
											fileName: _jsxFileName,
											lineNumber: 791,
											columnNumber: 23
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 773,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("label", {
										title: "Wgraj własną teksturę z pliku (.JPG, .PNG) i nałóż ją bezpośrednio na bryły budynków 3D",
										className: "px-2 py-1 text-[11px] font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded cursor-pointer transition-colors flex items-center gap-1 shrink-0",
										children: [
											/* @__PURE__ */ _jsxDEV(ImagePlus, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 801,
												columnNumber: 21
											}, this),
											"Tekstura UV",
											/* @__PURE__ */ _jsxDEV("input", {
												type: "file",
												accept: "image/*",
												onChange: handleCustomBuildingTextureUpload,
												className: "hidden"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 803,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 797,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 772,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 736,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2.5 pt-2.5 border-t border-slate-800/80 space-y-2",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-[11px] font-medium text-slate-300 truncate",
											children: jsonStatusMessage ? /* @__PURE__ */ _jsxDEV("span", {
												className: "text-emerald-300 font-semibold",
												children: jsonStatusMessage
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 818,
												columnNumber: 23
											}, this) : "Zapis projektu i Nowy Model:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 816,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: handleStartNewModel,
											title: "Automatycznie zapisuje bieżący projekt na liście i otwiera czysty Nowy Model do edycji",
											className: "px-2.5 py-1 text-[11px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded transition-colors flex items-center gap-1 shrink-0",
											children: [/* @__PURE__ */ _jsxDEV(FilePlus2, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 832,
												columnNumber: 21
											}, this), "Nowy Model"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 826,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 815,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex flex-wrap items-center gap-1.5",
										children: [
											/* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: handleExportConfigJson,
												title: "Pobierz cały projekt (wszystkie parametry i sub-modele) do pliku .JSON na dysk",
												className: "px-2.5 py-1 text-[11px] font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded transition-colors flex items-center gap-1",
												children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3 h-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 844,
													columnNumber: 21
												}, this), "Zapisz .JSON"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 838,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("label", {
												title: "Wczytaj wcześniej zapisany plik .JSON z dysku",
												className: "px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded cursor-pointer transition-colors flex items-center gap-1",
												children: [
													/* @__PURE__ */ _jsxDEV(FolderOpen, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 852,
														columnNumber: 21
													}, this),
													"Wczytaj .JSON",
													/* @__PURE__ */ _jsxDEV("input", {
														type: "file",
														accept: ".json,application/json",
														onChange: (e) => {
															const file = e.target.files?.[0];
															if (file) {
																handleImportConfigJsonFile(file);
																e.target.value = "";
															}
														},
														className: "hidden"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 854,
														columnNumber: 21
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 848,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: handleSaveSlotToBrowser,
												title: "Zapisz bieżący projekt w pamięci podręcznej przeglądarki, by móc wrócić do niego jednym kliknięciem",
												className: "px-2.5 py-1 text-[11px] font-semibold bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 rounded transition-colors flex items-center gap-1",
												children: [/* @__PURE__ */ _jsxDEV(BookmarkPlus, { className: "w-3 h-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 874,
													columnNumber: 21
												}, this), "Zapisz w Pamięci"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 868,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: handleSaveToCloudFirestore,
												title: "Zapisz model 3D i nałożone tekstury w bazie danych Firebase Firestore (Konto Google)",
												className: "px-2.5 py-1 text-[11px] font-semibold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-400/50 rounded transition-colors flex items-center gap-1",
												children: [/* @__PURE__ */ _jsxDEV(Cloud, { className: "w-3 h-3 text-indigo-300" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 884,
													columnNumber: 21
												}, this), "Zapisz w Chmurze"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 878,
												columnNumber: 19
											}, this),
											currentUser ? /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: handleGoogleSignOut,
												title: `Zalogowano jako ${currentUser.email || currentUser.displayName}. Kliknij, aby wylogować.`,
												className: "px-2 py-1 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded flex items-center gap-1",
												children: [/* @__PURE__ */ _jsxDEV(LogOut, { className: "w-2.5 h-2.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 895,
													columnNumber: 23
												}, this), "Wyloguj"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 889,
												columnNumber: 21
											}, this) : /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: handleGoogleSignIn,
												className: "px-2 py-1 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded flex items-center gap-1",
												children: [/* @__PURE__ */ _jsxDEV(LogIn, { className: "w-2.5 h-2.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 904,
													columnNumber: 23
												}, this), "Google Login"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 899,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 837,
										columnNumber: 17
									}, this),
									cloudProjects.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
										className: "pt-1 space-y-1 max-h-24 overflow-y-auto",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "text-[10px] font-mono text-indigo-300",
											children: [
												"Projekty w Chmurze Firebase (",
												cloudProjects.length,
												") — kliknij, aby wczytać:"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 913,
											columnNumber: 21
										}, this), cloudProjects.map((proj) => /* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between gap-1.5 bg-[#060f20] border border-indigo-500/30 rounded px-2 py-1 text-[11px]",
											children: [/* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => handleLoadFromCloudFirestore(proj),
												className: "text-left text-slate-100 hover:text-sky-300 truncate flex-1 font-medium",
												title: `${proj.name} (${proj.summary})`,
												children: [
													proj.name,
													" ",
													/* @__PURE__ */ _jsxDEV("span", {
														className: "text-[10px] text-indigo-300/80 font-mono",
														children: [
															"(",
															proj.summary,
															")"
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 928,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 921,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => deleteProjectFromFirestore(proj.id),
												className: "text-slate-500 hover:text-rose-400 p-0.5 shrink-0",
												title: "Usuń projekt z chmury",
												children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3 h-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 938,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 932,
												columnNumber: 25
											}, this)]
										}, proj.id, true, {
											fileName: _jsxFileName,
											lineNumber: 917,
											columnNumber: 23
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 912,
										columnNumber: 19
									}, this),
									savedSlots.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
										className: "pt-1 space-y-1 max-h-24 overflow-y-auto",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "text-[10px] font-mono text-slate-400",
											children: [
												"Zapisane projekty w pamięci (",
												savedSlots.length,
												") — kliknij, aby wrócić:"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 948,
											columnNumber: 21
										}, this), savedSlots.map((slot) => /* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between gap-1.5 bg-[#050b14] border border-slate-800 rounded px-2 py-1 text-[11px]",
											children: [/* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => handleLoadSlotFromBrowser(slot),
												className: "text-left text-slate-200 hover:text-sky-300 truncate flex-1 font-medium",
												title: `Wczytaj: ${slot.name} (${slot.summary})`,
												children: [
													slot.name,
													" ",
													/* @__PURE__ */ _jsxDEV("span", {
														className: "text-[10px] text-slate-400 font-mono",
														children: [
															"(",
															slot.summary,
															")"
														]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 963,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 956,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => handleDeleteSlotFromBrowser(slot.id),
												className: "text-slate-500 hover:text-rose-400 p-0.5 shrink-0",
												title: "Usuń zapisany slot",
												children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3 h-3" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 973,
													columnNumber: 27
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 967,
												columnNumber: 25
											}, this)]
										}, slot.id, true, {
											fileName: _jsxFileName,
											lineNumber: 952,
											columnNumber: 23
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 947,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 814,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2.5 pt-2.5 border-t border-slate-800/80 space-y-1.5",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-[11px] font-semibold text-sky-300 flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3 h-3 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 985,
											columnNumber: 21
										}, this), "Podpowiedzi Dalszych Elementów Promptu:"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 984,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleOpenWorkbench("prompts"),
										className: "text-[10px] font-mono text-slate-400 hover:text-sky-300 underline underline-offset-2",
										children: [
											"Wszystkie (",
											quickContextualSuggestions.length,
											") →"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 988,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 983,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "space-y-1 max-h-28 overflow-y-auto pr-0.5",
									children: quickContextualSuggestions.slice(0, 4).map((sugg) => /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleApplyQuickSuggestion(sugg),
										title: `${sugg.contextReason}\n\nKliknij, aby zastosować w 3D i skopiować gotowy fragment:\n"${sugg.snippetPL}"`,
										className: "w-full text-left bg-[#060d19] hover:bg-sky-950/50 border border-slate-800 hover:border-sky-500/50 rounded-md px-2 py-1.5 transition-colors flex items-start justify-between gap-2 group",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "text-[10px] font-mono text-sky-400 font-semibold truncate",
												children: [
													"+ Krok ",
													sugg.stepNumber,
													": ",
													sugg.category
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1007,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "text-[11px] text-slate-200 font-medium truncate",
												children: sugg.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1010,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1006,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "px-1.5 py-0.5 text-[9px] font-bold bg-sky-500/15 group-hover:bg-sky-400 group-hover:text-slate-950 text-sky-300 rounded shrink-0 transition-colors",
											children: "+ Dopisz"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1014,
											columnNumber: 23
										}, this)]
									}, sugg.id, true, {
										fileName: _jsxFileName,
										lineNumber: 999,
										columnNumber: 21
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 997,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 982,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-2.5 pt-2.5 border-t border-slate-800/80 space-y-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "text-[11px] font-semibold text-slate-200",
										children: "Ustawienia Środowiska"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1026,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "text-[10px] text-slate-400 font-mono",
										children: [
											"Shader _FogDensity:",
											" ",
											config.enableAtmosphericFog ? "0.065 (Aktywna)" : "0.000 (Wył.)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1029,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1025,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										role: "switch",
										"aria-checked": config.enableAtmosphericFog,
										onClick: () => handleUpdateConfig({ enableAtmosphericFog: !config.enableAtmosphericFog }),
										className: `px-2.5 py-1 text-[11px] font-semibold rounded-md border transition-colors flex items-center gap-1.5 shrink-0 ${config.enableAtmosphericFog ? "bg-sky-500/20 border-sky-400/60 text-sky-300" : "bg-slate-800/80 border-slate-700 text-slate-400"}`,
										children: [/* @__PURE__ */ _jsxDEV("span", { children: "Efekt Mgły Atmosferycznej:" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1051,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono font-bold",
											children: config.enableAtmosphericFog ? "WŁ." : "WYŁ."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1052,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1036,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1024,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "bg-[#060d19] border border-slate-800/90 rounded-lg px-2.5 py-1.5 space-y-1",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between text-[11px]",
											children: [/* @__PURE__ */ _jsxDEV("label", {
												htmlFor: "env-lighting-intensity-slider",
												className: "font-medium text-slate-200",
												children: "Intensywność Oświetlenia Otoczenia"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1061,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "font-mono font-bold text-amber-300 tabular-nums",
												children: [
													config.envLightingIntensity.toFixed(2),
													"x (",
													Math.round(config.envLightingIntensity * 100),
													"%)"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1067,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1060,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("input", {
											id: "env-lighting-intensity-slider",
											type: "range",
											min: .5,
											max: 2,
											step: .05,
											value: config.envLightingIntensity,
											onChange: (e) => handleUpdateConfig({ envLightingIntensity: parseFloat(e.target.value) }),
											"aria-label": "Intensywność Oświetlenia Otoczenia",
											className: "w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1072,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex justify-between text-[9px] font-mono text-slate-400",
											children: [
												/* @__PURE__ */ _jsxDEV("span", { children: "0.5x" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1088,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("span", { children: [
													"Unity: environmentDirectionalLight.intensity = brightness * ",
													config.envLightingIntensity.toFixed(2),
													"f"
												] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1089,
													columnNumber: 21
												}, this),
												/* @__PURE__ */ _jsxDEV("span", { children: "2.0x" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1093,
													columnNumber: 21
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1087,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1059,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1023,
								columnNumber: 15
							}, this),
							selectedTelemetry && /* @__PURE__ */ _jsxDEV("div", {
								className: "mt-3 pt-2.5 border-t border-slate-800/90 space-y-1",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-bold text-amber-300",
										children: selectedTelemetry.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1102,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleUpdateConfig({ selectedBuilding: null }),
										className: "text-slate-400 hover:text-white p-0.5",
										"aria-label": "Zamknij inspekcję budynku",
										children: /* @__PURE__ */ _jsxDEV(X, { className: "w-3.5 h-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1113,
											columnNumber: 23
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1105,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1101,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between pt-0.5",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs text-slate-300",
										children: "Kliknij przycisk poniżej, aby edytować pojedynczą bryłę:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1117,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: handleAssembleUnifiedModel,
										className: "px-2 py-0.5 text-[11px] font-semibold bg-amber-400 text-slate-950 rounded",
										children: "Edytuj bryłę →"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1120,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1116,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1100,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 574,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV(InteractiveGlassPanelWidget, {
						config,
						activePanelType: activeGlassPanel,
						activeIconIndex: activeGlassIconIdx,
						isExpanded: glassWidgetExpanded,
						onToggleExpand: () => setGlassWidgetExpanded((prev) => !prev),
						onSelectPanelType: (pType) => setActiveGlassPanel(pType),
						onSelectIconIndex: (idx) => setActiveGlassIconIdx(idx),
						onUpdateConfig: handleUpdateConfig,
						onActionArrowClick: () => handleOpenWorkbench("prompts")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1133,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 573,
					columnNumber: 11
				}, this),
				!workbenchOpen && /* @__PURE__ */ _jsxDEV(UnifiedSpatialModelComposer, {
					isOpen: composerOpen,
					config,
					onClose: () => setComposerOpen(false),
					onUpdateConfig: handleUpdateConfig,
					onUpdateSubModel: handleUpdateSubModel,
					onRebuildCompositeFromGlobal: handleRebuildCompositeFromGlobal,
					onExportJson: handleExportConfigJson,
					onImportJsonFile: handleImportConfigJsonFile
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1149,
					columnNumber: 11
				}, this),
				!workbenchOpen && !composerOpen && /* @__PURE__ */ _jsxDEV(ResourceMonitorPanel, {
					config,
					liveMetrics,
					onUpdateConfig: handleUpdateConfig
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1163,
					columnNumber: 11
				}, this),
				!workbenchOpen && /* @__PURE__ */ _jsxDEV(BottomControlDock, {
					config,
					onUpdateConfig: handleUpdateConfig,
					onOpenWorkbench: handleOpenWorkbench,
					onAssembleUnifiedModel: handleAssembleUnifiedModel,
					onExportJson: handleExportConfigJson,
					onImportJsonFile: handleImportConfigJsonFile
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1172,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV(PromptWorkbenchModal, {
					isOpen: workbenchOpen,
					activeTab: workbenchTab,
					onTabChange: setWorkbenchTab,
					onClose: () => setWorkbenchOpen(false),
					config,
					onUpdateConfig: handleUpdateConfig
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1183,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV(FullScreenModelViewerModal, {
					isOpen: fullscreenViewerOpen,
					isStandaloneWindow,
					config,
					onUpdateConfig: handleUpdateConfig,
					onClose: () => setFullscreenViewerOpen(false)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1193,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 548,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 439,
		columnNumber: 5
	}, this);
}

//# sourceMappingURL=data:application/json;base64,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QW9CLFVBQVUsb0JBQW9CLEtBQUs7TUFDdkQsb0JBQW9CLFFBQVEsc0JBQXNCLEdBQUc7TUFDckQsZ0JBQWdCO01BQ2hCLDBCQUEwQixvQkFBb0IsU0FBUztLQUN4RDs7OzthQUNFOzs7Ozs7SUFJTixDQUFDLGlCQUNBLHdCQUFDLDZCQUFEO0tBQ0UsUUFBUTtLQUNBO0tBQ1IsZUFBZSxnQkFBZ0IsS0FBSztLQUNwQyxnQkFBZ0I7S0FDaEIsa0JBQWtCO0tBQ2xCLDhCQUE4QjtLQUM5QixjQUFjO0tBQ2Qsa0JBQWtCO0lBQ25COzs7OztJQUlGLENBQUMsaUJBQWlCLENBQUMsZ0JBQ2xCLHdCQUFDLHNCQUFEO0tBQ1U7S0FDSztLQUNiLGdCQUFnQjtJQUNqQjs7Ozs7SUFJRixDQUFDLGlCQUNBLHdCQUFDLG1CQUFEO0tBQ1U7S0FDUixnQkFBZ0I7S0FDaEIsaUJBQWlCO0tBQ2pCLHdCQUF3QjtLQUN4QixjQUFjO0tBQ2Qsa0JBQWtCO0lBQ25COzs7OztJQUlILHdCQUFDLHNCQUFEO0tBQ0UsUUFBUTtLQUNSLFdBQVc7S0FDWCxhQUFhO0tBQ2IsZUFBZSxpQkFBaUIsS0FBSztLQUM3QjtLQUNSLGdCQUFnQjtJQUNqQjs7Ozs7SUFHRCx3QkFBQyw0QkFBRDtLQUNFLFFBQVE7S0FDWTtLQUNaO0tBQ1IsZ0JBQWdCO0tBQ2hCLGVBQWUsd0JBQXdCLEtBQUs7SUFDN0M7Ozs7O0dBQ0c7Ozs7O1VBQ0g7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkFwcC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBCb29rbWFya1BsdXMsXG4gIEJveGVzLFxuICBDaGVjayxcbiAgQ2xvdWQsXG4gIENvcHksXG4gIERvd25sb2FkLFxuICBFeHRlcm5hbExpbmssXG4gIEZpbGVQbHVzMixcbiAgRm9sZGVyT3BlbixcbiAgSW1hZ2VQbHVzLFxuICBMb2dJbixcbiAgTG9nT3V0LFxuICBNYXhpbWl6ZSxcbiAgUGFpbnRicnVzaCxcbiAgU3BhcmtsZXMsXG4gIFRyYXNoMixcbiAgWCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7XG4gIEFSU3R1ZGlvQ29uZmlnLFxuICBCdWlsZGluZ0NsdXN0ZXJJZCxcbiAgQnVpbGRpbmdUZXh0dXJlUHJlc2V0T3B0aW9uLFxuICBIdWRQYW5lbFR5cGUsXG4gIExpdmVSZW5kZXJlck1ldHJpY3MsXG4gIFN1Yk1vZGVsT3ZlcnJpZGUsXG59IGZyb20gJy4vdHlwZXMvYXJTdHVkaW8nO1xuaW1wb3J0IHtcbiAgQlVJTERJTkdfVEVMRU1FVFJZLFxuICBDb250ZXh0dWFsUHJvbXB0U3VnZ2VzdGlvbixcbiAgZ2VuZXJhdGVNYXN0ZXJQcm9tcHRzLFxuICBnZXRDb250ZXh0dWFsUHJvbXB0U3VnZ2VzdGlvbnMsXG59IGZyb20gJy4vZGF0YS9wcm9tcHRUZW1wbGF0ZXMnO1xuaW1wb3J0IHsgSG9sb0FyY2hTY2VuZSB9IGZyb20gJy4vdGhyZWUvSG9sb0FyY2hTY2VuZSc7XG5pbXBvcnQgeyBCb3R0b21Db250cm9sRG9jayB9IGZyb20gJy4vY29tcG9uZW50cy9Cb3R0b21Db250cm9sRG9jayc7XG5pbXBvcnQgeyBSZXNvdXJjZU1vbml0b3JQYW5lbCB9IGZyb20gJy4vY29tcG9uZW50cy9SZXNvdXJjZU1vbml0b3JQYW5lbCc7XG5pbXBvcnQgeyBJbnRlcmFjdGl2ZUdsYXNzUGFuZWxXaWRnZXQgfSBmcm9tICcuL2NvbXBvbmVudHMvSW50ZXJhY3RpdmVHbGFzc1BhbmVsV2lkZ2V0JztcbmltcG9ydCB7XG4gIGNyZWF0ZUluaXRpYWxTdWJNb2RlbE92ZXJyaWRlcyxcbiAgVW5pZmllZFNwYXRpYWxNb2RlbENvbXBvc2VyLFxufSBmcm9tICcuL2NvbXBvbmVudHMvVW5pZmllZFNwYXRpYWxNb2RlbENvbXBvc2VyJztcbmltcG9ydCB7XG4gIFByb21wdFdvcmtiZW5jaE1vZGFsLFxuICBXb3JrYmVuY2hUYWIsXG59IGZyb20gJy4vY29tcG9uZW50cy9Qcm9tcHRXb3JrYmVuY2hNb2RhbCc7XG5pbXBvcnQge1xuICBGdWxsU2NyZWVuTW9kZWxWaWV3ZXJNb2RhbCxcbiAgVEVYVFVSRV9QUkVTRVRfT1BUSU9OUyxcbn0gZnJvbSAnLi9jb21wb25lbnRzL0Z1bGxTY3JlZW5Nb2RlbFZpZXdlck1vZGFsJztcbmltcG9ydCB7XG4gIGJyb2FkY2FzdENvbmZpZ1RvV2luZG93cyxcbiAgY3JlYXRlRnJlc2hOZXdNb2RlbENvbmZpZyxcbiAgZGVsZXRlUHJvamVjdFNsb3RGcm9tTG9jYWwsXG4gIGV4cG9ydEFSQ29uZmlnVG9Kc29uRmlsZSxcbiAgZ2V0U2F2ZWRQcm9qZWN0U2xvdHMsXG4gIGxvYWRTeW5jZWRXaW5kb3dDb25maWcsXG4gIHBhcnNlQVJDb25maWdGcm9tSnNvblN0cmluZyxcbiAgU2F2ZWRQcm9qZWN0U2xvdCxcbiAgc2F2ZVByb2plY3RTbG90VG9Mb2NhbCxcbiAgc3Vic2NyaWJlVG9XaW5kb3dDb25maWdTeW5jLFxufSBmcm9tICcuL3V0aWxzL2NvbmZpZ1N0b3JhZ2UnO1xuaW1wb3J0IHtcbiAgYXV0aCxcbiAgQ2xvdWRTYXZlZFByb2plY3QsXG4gIGRlbGV0ZVByb2plY3RGcm9tRmlyZXN0b3JlLFxuICBvbkF1dGhTdGF0ZUNoYW5nZWQsXG4gIHJlc3RvcmVDb25maWdGcm9tQ2xvdWRQcm9qZWN0LFxuICBzYXZlUHJvamVjdFRvRmlyZXN0b3JlLFxuICBzaWduSW5XaXRoR29vZ2xlUG9wdXAsXG4gIHNpZ25PdXRVc2VyLFxuICBzdWJzY3JpYmVVc2VyUHJvamVjdHMsXG4gIFVzZXIsXG59IGZyb20gJy4vZmlyZWJhc2UnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IFtjb25maWcsIHNldENvbmZpZ10gPSB1c2VTdGF0ZTxBUlN0dWRpb0NvbmZpZz4oKCkgPT4ge1xuICAgIGNvbnN0IGluaXRpYWxCYXNlOiBBUlN0dWRpb0NvbmZpZyA9IHtcbiAgICAgIGFyRnJhbWV3b3JrOiAnQVJGb3VuZGF0aW9uIChBUktpdCArIEFSQ29yZSknLFxuICAgICAgcmVuZGVyUGlwZWxpbmU6ICdVbml0eSBVUlAgKFVuaXZlcnNhbCBSZW5kZXIgUGlwZWxpbmUpJyxcbiAgICAgIHBsYW5lRGV0ZWN0aW9uOiAnQmxhdCBzdG/FgnUgKyBQb2TFgm9nYSAoRHVhbCBIb3Jpem9udGFsKScsXG4gICAgICBob2xvZ3JhbVN0eWxlOiAnV29sdW1ldHJ5Y3puYSBTaWF0a2EgQ3lqYW5vd2EnLFxuICAgICAgb2NjbHVzaW9uTW9kZTogJ0fFgsSZYmlhIMWacm9kb3dpc2tvd2EgKEVudmlyb25tZW50IERlcHRoKScsXG4gICAgICB3aW5kb3dQYXJ0aWNsZXM6ICdaxYJvdHkgUHnFgiDFmndpZXRsbnkgKyBTbXVnaSBXb2x1bWV0cnljem5lJyxcbiAgICAgIG1vYmlsZURldmljZVByb2ZpbGU6ICdpUGhvbmUgMTYgUHJvIChBMTggUHJvICsgTGlEQVIpJyxcbiAgICAgIGJ1aWxkaW5nc1Blckdyb3VwOiA1LFxuICAgICAgYnVpbGRpbmdGbG9vckNvdW50OiAxMDgsXG4gICAgICBidWlsZGluZ0xheW91dDogJ01ldHJvcG9saWEgQ2VudHJhbG5hIChaZGouIDIgwrcgR2xvYmFsIE5ldHdvcmspJyxcbiAgICAgIGxheW91dERlcHRoU2NhdHRlcjogMC45LFxuICAgICAgbW9kZWxPcmllbnRhdGlvbjkxNjogJ1Bpb25vd2UgV2llxbxvd2NlIChLbGFzeWN6bmUpJyxcbiAgICAgIGh1ZFNjcmVlblN0eWxlOiAnSG9sb2dyYW15IEdsb2JhbCBOZXR3b3JrIChaZGouIDIgwrcgVGVsZW1ldHJpYSAmIE1hcGEpJyxcbiAgICAgIGJ1aWxkaW5nVGV4dHVyZVByZXNldDogJ0hvbG9ncmFtIERpYWdyaWQgKERvbXnFm2xueSBDeWphbi1axYJvdG8pJyxcbiAgICAgIGN1c3RvbUJ1aWxkaW5nVGV4dHVyZVVybDogbnVsbCxcbiAgICAgIGJ1aWxkaW5nVGV4dHVyZVNjYWxlOiAxLjAsXG4gICAgICBidWlsZGluZ1RleHR1cmVPcGFjaXR5OiAwLjg4LFxuICAgICAgdW5pZmllZE1vZGVsQXNzZW1ibGVkOiB0cnVlLFxuICAgICAgc2VsZWN0ZWRTdWJNb2RlbElkOiAnY2VudHJhbF9uZXh1c18wJyxcbiAgICAgIHN1Yk1vZGVsT3ZlcnJpZGVzOiB7fSxcbiAgICAgIGN1c3RvbVJlZmVyZW5jZUltYWdlVXJsOlxuICAgICAgICAnL2Fzc2V0cy9haXN0dWRpby96ZGouXzIucG5nXzJLXzIwMjYxMDIzMTIxNTEwX2U5YjIxYjBjLmpwZycsXG4gICAgICBzaG93UmVmZXJlbmNlQmlsbGJvYXJkSW4zRDogdHJ1ZSxcbiAgICAgIHRhYmxlU2l6ZVByZXNldDogJ01vbnVtZW50YWxueSBTenRhYm93eSAoNS40bSDDlyAyLjZtKScsXG4gICAgICB0YWJsZVdpZHRoTWV0ZXJzOiA1LjQsXG4gICAgICB0YWJsZURlcHRoTWV0ZXJzOiAyLjYsXG4gICAgICByb29tU2l6ZVByZXNldDogJ05pZXN0YW5kYXJkb3d5IHd5bWlhciBzYWxpJyxcbiAgICAgIHJvb21XaWR0aE1ldGVyczogMjEuMCxcbiAgICAgIHJvb21EZXB0aE1ldGVyczogMTguMCxcbiAgICAgIGhvbG9ncmFtTWVzaERlbnNpdHk6IDEuMCxcbiAgICAgIHBhcmFsbGF4SW50ZW5zaXR5OiAwLjg1LFxuICAgICAgcGVuZHVsdW1TcGVlZDogMC4xNSxcbiAgICAgIGF1dG9QYXJhbGxheDogdHJ1ZSxcbiAgICAgIGV4cGxvZGVkVmlldzogMC4wLFxuICAgICAgZW52TGlnaHRpbmdJbnRlbnNpdHk6IDEuMixcbiAgICAgIHdpbmRvd1BhcnRpY2xlRGVuc2l0eTogMS4wLFxuICAgICAgZW5hYmxlQXRtb3NwaGVyaWNGb2c6IHRydWUsXG4gICAgICBlbmFibGVOaWdodE1vZGU6IGZhbHNlLFxuICAgICAgZW5hYmxlQnVpbGRpbmdTaGFkb3dzOiB0cnVlLFxuICAgICAgc2hhZG93TWFwUXVhbGl0eTogJ1d5c29rYSAoMjA0OMOXMjA0OCDCtyBDcmlzcCBQQ0YpJyxcbiAgICAgIHNob3dEZXB0aEdyaWQ6IHRydWUsXG4gICAgICBzaG93T2NjbHVzaW9uT2JqZWN0czogdHJ1ZSxcbiAgICAgIHNob3dGbG9hdGluZ0h1ZFBhbmVsczogdHJ1ZSxcbiAgICAgIHNob3dSZXNvdXJjZU1vbml0b3I6IHRydWUsXG4gICAgICBjYW1lcmFQcmVzZXQ6ICdvdmVydmlldycsXG4gICAgICBzZWxlY3RlZEJ1aWxkaW5nOiBudWxsLFxuICAgICAgdHJpZ2dlclNjYW5QdWxzZTogMCxcbiAgICB9O1xuICAgIGluaXRpYWxCYXNlLnN1Yk1vZGVsT3ZlcnJpZGVzID0gY3JlYXRlSW5pdGlhbFN1Yk1vZGVsT3ZlcnJpZGVzKGluaXRpYWxCYXNlKTtcblxuICAgIGNvbnN0IGlzU3RhbmRhbG9uZVBhcmFtID1cbiAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLmdldCgnZnVsbHNjcmVlbk1vZGVsJykgPT09ICcxJztcbiAgICBpZiAoaXNTdGFuZGFsb25lUGFyYW0pIHtcbiAgICAgIHJldHVybiBsb2FkU3luY2VkV2luZG93Q29uZmlnKGluaXRpYWxCYXNlKTtcbiAgICB9XG4gICAgcmV0dXJuIGluaXRpYWxCYXNlO1xuICB9KTtcblxuICBjb25zdCBbbGl2ZU1ldHJpY3MsIHNldExpdmVNZXRyaWNzXSA9IHVzZVN0YXRlPExpdmVSZW5kZXJlck1ldHJpY3M+KHtcbiAgICBtZWFzdXJlZFdlYmdsRnBzOiA2MCxcbiAgICB3ZWJnbERyYXdDYWxsczogNDgsXG4gICAgd2ViZ2xUcmlhbmdsZXM6IDI0NTAwLFxuICB9KTtcblxuICBjb25zdCBbd29ya2JlbmNoT3Blbiwgc2V0V29ya2JlbmNoT3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFt3b3JrYmVuY2hUYWIsIHNldFdvcmtiZW5jaFRhYl0gPSB1c2VTdGF0ZTxXb3JrYmVuY2hUYWI+KCdwcm9tcHRzJyk7XG4gIGNvbnN0IFtjb3BpZWRIZWFkZXJDdGEsIHNldENvcGllZEhlYWRlckN0YV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gSW50ZXJhY3RpdmUgR2xhc3MgU2NyZWVuIHN0YXRlIChzeW5jZWQgd2l0aCB0aGUgNSBmbG9hdGluZyAzRCBnbGFzcyBwYW5lbHMpXG4gIGNvbnN0IFthY3RpdmVHbGFzc1BhbmVsLCBzZXRBY3RpdmVHbGFzc1BhbmVsXSA9XG4gICAgdXNlU3RhdGU8SHVkUGFuZWxUeXBlPigncHJpc20nKTtcbiAgY29uc3QgW2FjdGl2ZUdsYXNzSWNvbklkeCwgc2V0QWN0aXZlR2xhc3NJY29uSWR4XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIGNvbnN0IFtnbGFzc1dpZGdldEV4cGFuZGVkLCBzZXRHbGFzc1dpZGdldEV4cGFuZGVkXSA9XG4gICAgdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG5cbiAgLy8gVW5pZmllZCBDb21wb3NpdGUgU3BhdGlhbCBNb2RlbCBDb21wb3NlciBkcmF3ZXIgJiBGdWxsc2NyZWVuIFRleHR1cmUgVmlld2VyIHN0YXRlXG4gIGNvbnN0IFtjb21wb3Nlck9wZW4sIHNldENvbXBvc2VyT3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtpc1N0YW5kYWxvbmVXaW5kb3ddID0gdXNlU3RhdGU8Ym9vbGVhbj4oKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiAoXG4gICAgICBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpLmdldCgnZnVsbHNjcmVlbk1vZGVsJykgPT09ICcxJ1xuICAgICk7XG4gIH0pO1xuICBjb25zdCBbZnVsbHNjcmVlblZpZXdlck9wZW4sIHNldEZ1bGxzY3JlZW5WaWV3ZXJPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KFxuICAgICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKS5nZXQoJ2Z1bGxzY3JlZW5Nb2RlbCcpID09PVxuICAgICAgICAnMSdcbiAgICAgICk7XG4gICAgfVxuICApO1xuICBjb25zdCBbanNvblN0YXR1c01lc3NhZ2UsIHNldEpzb25TdGF0dXNNZXNzYWdlXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KFxuICAgIG51bGxcbiAgKTtcbiAgY29uc3QgW3NhdmVkU2xvdHMsIHNldFNhdmVkU2xvdHNdID0gdXNlU3RhdGU8U2F2ZWRQcm9qZWN0U2xvdFtdPigoKSA9PlxuICAgIGdldFNhdmVkUHJvamVjdFNsb3RzKClcbiAgKTtcbiAgY29uc3QgW2N1cnJlbnRVc2VyLCBzZXRDdXJyZW50VXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtjbG91ZFByb2plY3RzLCBzZXRDbG91ZFByb2plY3RzXSA9IHVzZVN0YXRlPENsb3VkU2F2ZWRQcm9qZWN0W10+KFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViQXV0aCA9IG9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoLCAodXNlcikgPT4ge1xuICAgICAgc2V0Q3VycmVudFVzZXIodXNlcik7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHVuc3ViQXV0aCgpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWN1cnJlbnRVc2VyKSB7XG4gICAgICBzZXRDbG91ZFByb2plY3RzKFtdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdW5zdWJDbG91ZCA9IHN1YnNjcmliZVVzZXJQcm9qZWN0cyhjdXJyZW50VXNlciwgKGl0ZW1zKSA9PiB7XG4gICAgICBzZXRDbG91ZFByb2plY3RzKGl0ZW1zKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWJDbG91ZCgpO1xuICB9LCBbY3VycmVudFVzZXJdKTtcblxuICAvLyBLZWVwIHNlcGFyYXRlIHdpbmRvd3MgKD9mdWxsc2NyZWVuTW9kZWw9MSkgc3luY2hyb25pemVkIGluIHJlYWwgdGltZSB2aWEgQnJvYWRjYXN0Q2hhbm5lbFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViU3luYyA9IHN1YnNjcmliZVRvV2luZG93Q29uZmlnU3luYyhjb25maWcsIChzeW5jZWRDb25maWcpID0+IHtcbiAgICAgIHNldENvbmZpZyhzeW5jZWRDb25maWcpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YlN5bmMoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZUNvbmZpZyA9IChwYXJ0aWFsOiBQYXJ0aWFsPEFSU3R1ZGlvQ29uZmlnPikgPT4ge1xuICAgIHNldENvbmZpZygocHJldikgPT4ge1xuICAgICAgY29uc3QgbmV4dCA9IHsgLi4ucHJldiwgLi4ucGFydGlhbCB9O1xuICAgICAgYnJvYWRjYXN0Q29uZmlnVG9XaW5kb3dzKG5leHQpO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlR29vZ2xlU2lnbkluID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzaWduSW5XaXRoR29vZ2xlUG9wdXAoKTtcbiAgICAgIHNldEpzb25TdGF0dXNNZXNzYWdlKCdaYWxvZ293YW5vIHByemV6IEdvb2dsZSAoQ2htdXJhIEZpcmViYXNlKScpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRKc29uU3RhdHVzTWVzc2FnZShudWxsKSwgMzAwMCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRKc29uU3RhdHVzTWVzc2FnZSgnTG9nb3dhbmllIEdvb2dsZSBwcnplcndhbmUnKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SnNvblN0YXR1c01lc3NhZ2UobnVsbCksIDMwMDApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVHb29nbGVTaWduT3V0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHNpZ25PdXRVc2VyKCk7XG4gICAgc2V0SnNvblN0YXR1c01lc3NhZ2UoJ1d5bG9nb3dhbm8geiBjaG11cnkgRmlyZWJhc2UnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEpzb25TdGF0dXNNZXNzYWdlKG51bGwpLCAyNTAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlVG9DbG91ZEZpcmVzdG9yZSA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHVzZXIgPSBjdXJyZW50VXNlcjtcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICB1c2VyID0gYXdhaXQgc2lnbkluV2l0aEdvb2dsZVBvcHVwKCk7XG4gICAgICB9XG4gICAgICBhd2FpdCBzYXZlUHJvamVjdFRvRmlyZXN0b3JlKHVzZXIsIGNvbmZpZyk7XG4gICAgICBzZXRKc29uU3RhdHVzTWVzc2FnZSgnWmFwaXNhbm8gbW9kZWwgaSB0ZWtzdHVyeSB3IENobXVyemUgRmlyZXN0b3JlIScpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRKc29uU3RhdHVzTWVzc2FnZShudWxsKSwgMzUwMCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICBzZXRKc29uU3RhdHVzTWVzc2FnZSgnQsWCxIVkIHphcGlzdSBkbyBDaG11cnkgRmlyZXN0b3JlJyk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHNldEpzb25TdGF0dXNNZXNzYWdlKG51bGwpLCAzNTAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlTG9hZEZyb21DbG91ZEZpcmVzdG9yZSA9IChwcm9qOiBDbG91ZFNhdmVkUHJvamVjdCkgPT4ge1xuICAgIHNldENvbmZpZygocHJldikgPT4ge1xuICAgICAgY29uc3QgcmVzdG9yZWQgPSByZXN0b3JlQ29uZmlnRnJvbUNsb3VkUHJvamVjdChwcm9qLCBwcmV2KTtcbiAgICAgIGJyb2FkY2FzdENvbmZpZ1RvV2luZG93cyhyZXN0b3JlZCk7XG4gICAgICByZXR1cm4gcmVzdG9yZWQ7XG4gICAgfSk7XG4gICAgc2V0SnNvblN0YXR1c01lc3NhZ2UoYFdjenl0YW5vIHogY2htdXJ5OiAke3Byb2oubmFtZX1gKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEpzb25TdGF0dXNNZXNzYWdlKG51bGwpLCAzMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDdXN0b21CdWlsZGluZ1RleHR1cmVVcGxvYWQgPSAoXG4gICAgZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD5cbiAgKSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZWFkZXIucmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBoYW5kbGVVcGRhdGVDb25maWcoe1xuICAgICAgICAgIGN1c3RvbUJ1aWxkaW5nVGV4dHVyZVVybDogcmVhZGVyLnJlc3VsdCxcbiAgICAgICAgICBidWlsZGluZ1RleHR1cmVQcmVzZXQ6ICdXxYJhc25hIFRla3N0dXJhIHogUGxpa3UgKEN1c3RvbSBVViBNYXApJyxcbiAgICAgICAgICBidWlsZGluZ1RleHR1cmVPcGFjaXR5OiBNYXRoLm1heCgwLjkyLCBjb25maWcuYnVpbGRpbmdUZXh0dXJlT3BhY2l0eSksXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRKc29uU3RhdHVzTWVzc2FnZSgnTmHFgm/FvG9ubyB3xYJhc27EhSB0ZWtzdHVyxJkgVVYgbmEgbW9kZWwgM0QnKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRKc29uU3RhdHVzTWVzc2FnZShudWxsKSwgMzAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVFeHBvcnRDb25maWdKc29uID0gKCkgPT4ge1xuICAgIGV4cG9ydEFSQ29uZmlnVG9Kc29uRmlsZShjb25maWcpO1xuICAgIHNldEpzb25TdGF0dXNNZXNzYWdlKCdaYXBpc2FubyB1c3Rhd2llbmlhIGRvIHBsaWt1IC5KU09OJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRKc29uU3RhdHVzTWVzc2FnZShudWxsKSwgMzAwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2F2ZVNsb3RUb0Jyb3dzZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV4dFNsb3RzID0gc2F2ZVByb2plY3RTbG90VG9Mb2NhbChjb25maWcpO1xuICAgIHNldFNhdmVkU2xvdHMobmV4dFNsb3RzKTtcbiAgICBzZXRKc29uU3RhdHVzTWVzc2FnZSgnWmFwaXNhbm8gcHJvamVrdCBuYSBsacWbY2llIHcgcHJ6ZWdsxIVkYXJjZScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SnNvblN0YXR1c01lc3NhZ2UobnVsbCksIDMwMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxvYWRTbG90RnJvbUJyb3dzZXIgPSAoc2xvdDogU2F2ZWRQcm9qZWN0U2xvdCkgPT4ge1xuICAgIHNldENvbmZpZyh7XG4gICAgICAuLi5zbG90LmNvbmZpZyxcbiAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgfSk7XG4gICAgc2V0SnNvblN0YXR1c01lc3NhZ2UoYFdjenl0YW5vOiAke3Nsb3QubmFtZX1gKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEpzb25TdGF0dXNNZXNzYWdlKG51bGwpLCAzMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEZWxldGVTbG90RnJvbUJyb3dzZXIgPSAoc2xvdElkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTYXZlZFNsb3RzKGRlbGV0ZVByb2plY3RTbG90RnJvbUxvY2FsKHNsb3RJZCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN0YXJ0TmV3TW9kZWwgPSAoKSA9PiB7XG4gICAgLy8gQXV0by1zYXZlIGN1cnJlbnQgbW9kZWwgdG8gYnJvd3NlciBzbG90cyBzbyB1c2VyIGNhbiBhbHdheXMgY29tZSBiYWNrIHRvIGl0IGluIDEgY2xpY2tcbiAgICBjb25zdCBuZXh0U2xvdHMgPSBzYXZlUHJvamVjdFNsb3RUb0xvY2FsKGNvbmZpZywgJ0F1dG8temFwaXMgcHJ6ZWQgTm93eW0gTW9kZWxlbScpO1xuICAgIHNldFNhdmVkU2xvdHMobmV4dFNsb3RzKTtcbiAgICBzZXRDb25maWcoKHByZXYpID0+IGNyZWF0ZUZyZXNoTmV3TW9kZWxDb25maWcocHJldikpO1xuICAgIHNldEpzb25TdGF0dXNNZXNzYWdlKCdaYXBpc2FubyBwb3ByemVkbmkgc3RhbiBpIG90d2FydG8gTm93eSBNb2RlbCcpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SnNvblN0YXR1c01lc3NhZ2UobnVsbCksIDM1MDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUltcG9ydENvbmZpZ0pzb25GaWxlID0gKGZpbGU6IEZpbGUpID0+IHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2V0Q29uZmlnKChwcmV2KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2FkZWQgPSBwYXJzZUFSQ29uZmlnRnJvbUpzb25TdHJpbmcoXG4gICAgICAgICAgICAgIHJlYWRlci5yZXN1bHQgYXMgc3RyaW5nLFxuICAgICAgICAgICAgICBwcmV2XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGxvYWRlZDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzZXRKc29uU3RhdHVzTWVzc2FnZSgnV2N6eXRhbm8gdXN0YXdpZW5pYSBwcm9qZWt0dSB6IC5KU09OJyk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRKc29uU3RhdHVzTWVzc2FnZShudWxsKSwgMzUwMCk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHNldEpzb25TdGF0dXNNZXNzYWdlKCdCxYLEhWQgb2Rjenl0dSBwbGlrdSAuSlNPTicpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SnNvblN0YXR1c01lc3NhZ2UobnVsbCksIDM1MDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBc3NlbWJsZVVuaWZpZWRNb2RlbCA9ICgpID0+IHtcbiAgICBzZXRDb25maWcoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGZyZXNoT3ZlcnJpZGVzID1cbiAgICAgICAgT2JqZWN0LmtleXMocHJldi5zdWJNb2RlbE92ZXJyaWRlcykubGVuZ3RoID4gMCAmJlxuICAgICAgICBwcmV2LnVuaWZpZWRNb2RlbEFzc2VtYmxlZFxuICAgICAgICAgID8gcHJldi5zdWJNb2RlbE92ZXJyaWRlc1xuICAgICAgICAgIDogY3JlYXRlSW5pdGlhbFN1Yk1vZGVsT3ZlcnJpZGVzKHByZXYpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgdW5pZmllZE1vZGVsQXNzZW1ibGVkOiB0cnVlLFxuICAgICAgICBzdWJNb2RlbE92ZXJyaWRlczogZnJlc2hPdmVycmlkZXMsXG4gICAgICAgIHNlbGVjdGVkU3ViTW9kZWxJZDogcHJldi5zZWxlY3RlZFN1Yk1vZGVsSWQgfHwgJ2NlbnRyYWxfbmV4dXNfMCcsXG4gICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICB9O1xuICAgIH0pO1xuICAgIHNldENvbXBvc2VyT3Blbih0cnVlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZWJ1aWxkQ29tcG9zaXRlRnJvbUdsb2JhbCA9ICgpID0+IHtcbiAgICBzZXRDb25maWcoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgdW5pZmllZE1vZGVsQXNzZW1ibGVkOiB0cnVlLFxuICAgICAgc3ViTW9kZWxPdmVycmlkZXM6IGNyZWF0ZUluaXRpYWxTdWJNb2RlbE92ZXJyaWRlcyhwcmV2KSxcbiAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgfSkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVVwZGF0ZVN1Yk1vZGVsID0gKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcGFydGlhbDogUGFydGlhbDxTdWJNb2RlbE92ZXJyaWRlPlxuICApID0+IHtcbiAgICBzZXRDb25maWcoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gcHJldi5zdWJNb2RlbE92ZXJyaWRlc1tpZF07XG4gICAgICBpZiAoIWV4aXN0aW5nKSByZXR1cm4gcHJldjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIHVuaWZpZWRNb2RlbEFzc2VtYmxlZDogdHJ1ZSxcbiAgICAgICAgc3ViTW9kZWxPdmVycmlkZXM6IHtcbiAgICAgICAgICAuLi5wcmV2LnN1Yk1vZGVsT3ZlcnJpZGVzLFxuICAgICAgICAgIFtpZF06IHsgLi4uZXhpc3RpbmcsIC4uLnBhcnRpYWwgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlT3BlbldvcmtiZW5jaCA9ICh0YWI6IFdvcmtiZW5jaFRhYikgPT4ge1xuICAgIHNldFdvcmtiZW5jaFRhYih0YWIpO1xuICAgIHNldFdvcmtiZW5jaE9wZW4odHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weU1hc3RlclByb21wdCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHZpc3VhbFByb21wdFBMIH0gPSBnZW5lcmF0ZU1hc3RlclByb21wdHMoY29uZmlnKTtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh2aXN1YWxQcm9tcHRQTCk7XG4gICAgc2V0Q29waWVkSGVhZGVyQ3RhKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkSGVhZGVyQ3RhKGZhbHNlKSwgMjIwMCk7XG4gIH07XG5cbiAgY29uc3QgcXVpY2tDb250ZXh0dWFsU3VnZ2VzdGlvbnMgPSBnZXRDb250ZXh0dWFsUHJvbXB0U3VnZ2VzdGlvbnMoJycsIGNvbmZpZyk7XG5cbiAgY29uc3QgaGFuZGxlQXBwbHlRdWlja1N1Z2dlc3Rpb24gPSAoXG4gICAgc3VnZ2VzdGlvbjogQ29udGV4dHVhbFByb21wdFN1Z2dlc3Rpb25cbiAgKSA9PiB7XG4gICAgaWYgKHN1Z2dlc3Rpb24uY29uZmlnUGF0Y2gpIHtcbiAgICAgIGhhbmRsZVVwZGF0ZUNvbmZpZyh7XG4gICAgICAgIC4uLnN1Z2dlc3Rpb24uY29uZmlnUGF0Y2gsXG4gICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICB9KTtcbiAgICB9XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoc3VnZ2VzdGlvbi5zbmlwcGV0UEwpO1xuICAgIHNldEpzb25TdGF0dXNNZXNzYWdlKGBTa29waW93YW5vIGkgemFzdG9zb3dhbm86IEtyb2sgJHtzdWdnZXN0aW9uLnN0ZXBOdW1iZXJ9YCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRKc29uU3RhdHVzTWVzc2FnZShudWxsKSwgMjgwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG9wUmVmZXJlbmNlVXBsb2FkID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZWFkZXIucmVzdWx0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBoYW5kbGVVcGRhdGVDb25maWcoe1xuICAgICAgICAgIGN1c3RvbVJlZmVyZW5jZUltYWdlVXJsOiByZWFkZXIucmVzdWx0LFxuICAgICAgICAgIHNob3dSZWZlcmVuY2VCaWxsYm9hcmRJbjNEOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25LZXlEb3duID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgaWYgKHdvcmtiZW5jaE9wZW4pIHNldFdvcmtiZW5jaE9wZW4oZmFsc2UpO1xuICAgICAgICBlbHNlIGlmIChjb21wb3Nlck9wZW4pIHNldENvbXBvc2VyT3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcbiAgfSwgW3dvcmtiZW5jaE9wZW4sIGNvbXBvc2VyT3Blbl0pO1xuXG4gIGNvbnN0IHNlbGVjdGVkVGVsZW1ldHJ5ID0gY29uZmlnLnNlbGVjdGVkQnVpbGRpbmdcbiAgICA/IEJVSUxESU5HX1RFTEVNRVRSWVtjb25maWcuc2VsZWN0ZWRCdWlsZGluZ11cbiAgICA6IG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctc2NyZWVuIGgtc2NyZWVuIG92ZXJmbG93LWhpZGRlbiBiZy1bIzA2MGIxM10gdGV4dC1zbGF0ZS0xMDAgc2VsZWN0LW5vbmUgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgey8qIFRvcCBCYXIgQ29udHJhY3Q6IFN0cmljdGx5IDMgem9uZXMgc2VwYXJhdGVkIGJ5IGdhcC04ICovfVxuICAgICAgPGhlYWRlciBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtOCBweC02IHB5LTMuNSBiZy1bIzA3MGQxOF0gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMC85MFwiPlxuICAgICAgICB7LyogWm9uZSAxOiBTaW5nbGUgdGV4dCBlbGVtZW50IEJyYW5kIFdvcmRtYXJrICovfVxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9XCIjdG9wXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2V0V29ya2JlbmNoT3BlbihmYWxzZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIGZvbnQtZGlzcGxheSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgID5cbiAgICAgICAgICBIb2xvQXJjaCBBUlxuICAgICAgICA8L2E+XG5cbiAgICAgICAgey8qIFpvbmUgMjogNSBjb25jaXNlIHNpbmdsZS1saW5lIHRleHQgbmF2aWdhdGlvbiBsaW5rcyAqL31cbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTYgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwiI3N5bXVsYXRvclwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHNldFdvcmtiZW5jaE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6dW5kZXJsaW5lIHVuZGVybGluZS1vZmZzZXQtNCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICAhd29ya2JlbmNoT3BlbiAmJiAhY29tcG9zZXJPcGVuID8gJ3RleHQtc2t5LTQwMCB1bmRlcmxpbmUnIDogJydcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIFN5bXVsYXRvciAzRCBBUlxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cIiN3c3BvbG55LW1vZGVsXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgc2V0V29ya2JlbmNoT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgIGhhbmRsZUFzc2VtYmxlVW5pZmllZE1vZGVsKCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgaG92ZXI6dGV4dC13aGl0ZSBob3Zlcjp1bmRlcmxpbmUgdW5kZXJsaW5lLW9mZnNldC00IHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgIGNvbXBvc2VyT3BlbiAmJiAhd29ya2JlbmNoT3BlbiA/ICd0ZXh0LXNreS00MDAgdW5kZXJsaW5lJyA6ICcnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBXc3DDs2xueSBNb2RlbCAzRFxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cIiNwcm9tcHR5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaGFuZGxlT3BlbldvcmtiZW5jaCgncHJvbXB0cycpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6dW5kZXJsaW5lIHVuZGVybGluZS1vZmZzZXQtNCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICB3b3JrYmVuY2hPcGVuICYmIHdvcmtiZW5jaFRhYiA9PT0gJ3Byb21wdHMnXG4gICAgICAgICAgICAgICAgPyAndGV4dC1za3ktNDAwIHVuZGVybGluZSdcbiAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBLcmVhdG9yIFByb21wdMOzd1xuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cIiNza3J5cHR5LXVuaXR5XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgaGFuZGxlT3BlbldvcmtiZW5jaCgndW5pdHlfY29kZScpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6dW5kZXJsaW5lIHVuZGVybGluZS1vZmZzZXQtNCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICB3b3JrYmVuY2hPcGVuICYmIHdvcmtiZW5jaFRhYiA9PT0gJ3VuaXR5X2NvZGUnXG4gICAgICAgICAgICAgICAgPyAndGV4dC1za3ktNDAwIHVuZGVybGluZSdcbiAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBTa3J5cHR5IFVuaXR5IEMjXG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwiI3JlZmVyZW5jamFcIlxuICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBoYW5kbGVPcGVuV29ya2JlbmNoKCdyZWZlcmVuY2UnKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOnVuZGVybGluZSB1bmRlcmxpbmUtb2Zmc2V0LTQgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgd29ya2JlbmNoT3BlbiAmJiB3b3JrYmVuY2hUYWIgPT09ICdyZWZlcmVuY2UnXG4gICAgICAgICAgICAgICAgPyAndGV4dC1za3ktNDAwIHVuZGVybGluZSdcbiAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBPYnJheiBSZWZlcmVuY3lqbnkgKDE2OjkpXG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L25hdj5cblxuICAgICAgICB7LyogWm9uZSAzOiAxIFByaW1hcnkgQWN0aW9uIENUQSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBzaHJpbmstMFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29weU1hc3RlclByb21wdH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05NTAgYmctc2t5LTQwMCBob3ZlcjpiZy1za3ktMzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2NvcGllZEhlYWRlckN0YSA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIFNrb3Bpb3dhbm8gUHJvbXB0IEFSXG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgS29waXVqIFByb21wdCBHxYLDs3dueVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG5cbiAgICAgIHsvKiBNYWluIFVub2JzdHJ1Y3RlZCAzRCBTY2VuZSBWaWV3cG9ydCAqL31cbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXgtMSB3LWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxIb2xvQXJjaFNjZW5lXG4gICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgb25TZWxlY3RCdWlsZGluZz17KGlkOiBCdWlsZGluZ0NsdXN0ZXJJZCB8IG51bGwpID0+XG4gICAgICAgICAgICBoYW5kbGVVcGRhdGVDb25maWcoeyBzZWxlY3RlZEJ1aWxkaW5nOiBpZCB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBvblNlbGVjdFN1Yk1vZGVsPXsoc3ViSWQ6IHN0cmluZywgY2x1c3RlcklkOiBCdWlsZGluZ0NsdXN0ZXJJZCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWRTdWJNb2RlbElkOiBzdWJJZCxcbiAgICAgICAgICAgICAgc2VsZWN0ZWRCdWlsZGluZzogY2x1c3RlcklkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvblNlbGVjdEh1ZFNjcmVlbj17KFxuICAgICAgICAgICAgcGFuZWxUeXBlOiBIdWRQYW5lbFR5cGUsXG4gICAgICAgICAgICBhY3RpdmVJY29uSW5kZXg6IG51bWJlclxuICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgc2V0QWN0aXZlR2xhc3NQYW5lbChwYW5lbFR5cGUpO1xuICAgICAgICAgICAgc2V0QWN0aXZlR2xhc3NJY29uSWR4KGFjdGl2ZUljb25JbmRleCk7XG4gICAgICAgICAgICBzZXRHbGFzc1dpZGdldEV4cGFuZGVkKHRydWUpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25VcGRhdGVNZXRyaWNzPXtzZXRMaXZlTWV0cmljc31cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogVG9wLUxlZnQgU3BlYyBIZWFkZXIgKyBJbnRlcmFjdGl2ZSBGcm9zdGVkIEdsYXNzIFBhbmVsICsgSG9yaXpvbnRhbCBSZWZlcmVuY2UgSW1hZ2UgTWluaS1GcmFtZSAqL31cbiAgICAgICAgeyF3b3JrYmVuY2hPcGVuICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC00IGxlZnQtNiB6LTEwIG1heC13LW1kIHBvaW50ZXItZXZlbnRzLWF1dG8gbWF4LWgtW2NhbGMoMTAwdmgtMTQwcHgpXSBvdmVyZmxvdy15LWF1dG8gcHItMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA5MTIyMF0vOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTMuNSBzaGFkb3cteGxcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDAgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIEhvbG9ncmFteSBBcmNoaXRla3Rvbmljem5lIEFSIHcgQ3phc2llIFJ6ZWN6eXdpc3R5bVxuICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBc3NlbWJsZVVuaWZpZWRNb2RlbH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgdGV4dC14cyBmb250LWJvbGQgYmctaW5kaWdvLTUwMC8yNSBob3ZlcjpiZy1pbmRpZ28tNTAwLzQwIHRleHQtaW5kaWdvLTIwMCBib3JkZXIgYm9yZGVyLWluZGlnby00MDAvNTAgcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB3aGl0ZXNwYWNlLW5vd3JhcFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxCb3hlcyBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtaW5kaWdvLTMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIFdzcMOzbG55IE1vZGVsXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wZW5Xb3JrYmVuY2goJ3Byb21wdHMnKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgdGV4dC14cyBmb250LXNlbWlib2xkIGJnLXNreS01MDAvMjAgaG92ZXI6Ymctc2t5LTUwMC8zMCB0ZXh0LXNreS0zMDAgYm9yZGVyIGJvcmRlci1za3ktNTAwLzQwIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgd2hpdGVzcGFjZS1ub3dyYXBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIFByb21wdFxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBDbGVhbiB1bmJveGVkIG1ldGFkYXRhIHdpdGggdHlwb2dyYXBoaWMgc2VwYXJhdG9ycyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTEuNSBmb250LW1vbm8gdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2NvbmZpZy5idWlsZGluZ0xheW91dC5zcGxpdCgnICcpWzBdfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj7Ctzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj57Y29uZmlnLm1vZGVsT3JpZW50YXRpb245MTYuc3BsaXQoJyAoJylbMF19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPntjb25maWcuYnVpbGRpbmdzUGVyR3JvdXB9IGJ1ZC4vZ3J1cMSZPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPntjb25maWcuYnVpbGRpbmdGbG9vckNvdW50fSBwacSZdGVyPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogSG9yaXpvbnRhbCBSZWN0YW5ndWxhciBSZWZlcmVuY2UgSW1hZ2UgUXVpY2stUHJldmlldyAmIFVwbG9hZGVyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIuNSBwdC0yLjUgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIwIGFzcGVjdC12aWRlbyByb3VuZGVkLW1kIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXNreS01MDAvNDAgYmctWyMwNDA4MTFdIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtjb25maWcuY3VzdG9tUmVmZXJlbmNlSW1hZ2VVcmx9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJNaW5pYXR1cmEgcG96aW9tZWdvIG9icmF6dSByZWZlcmVuY3lqbmVnb1wiXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBPYnJheiBSZWZlcmVuY3lqbnkgKFByb3N0b2vEhXQgUG96aW9teSlcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgRm9ybWF0IDE2Ojkgwrd7JyAnfVxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbmZpZy5zaG93UmVmZXJlbmNlQmlsbGJvYXJkSW4zRFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdBa3R5d255IHcgM0QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ0dvdG93eSBkbyBwb2RnbMSFZHUnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJweC0yIHB5LTEgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCBiZy1za3ktNTAwLzIwIGhvdmVyOmJnLXNreS01MDAvMzAgdGV4dC1za3ktMzAwIGJvcmRlciBib3JkZXItc2t5LTUwMC80MCByb3VuZGVkIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEltYWdlUGx1cyBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBXZ3JhalxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlVG9wUmVmZXJlbmNlVXBsb2FkfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlT3BlbldvcmtiZW5jaCgncmVmZXJlbmNlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIHRleHQtWzExcHhdIGZvbnQtbWVkaXVtIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAxNjo5XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogUXVpY2sgMS1DbGljayBSZWZlcmVuY2UgU2NlbmUgTW9kZWwgU3dpdGNoZXIgKFpkai4gMiBHbG9iYWwgTmV0d29yayB2cyBaZGouIDEpICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0Q29uZmlnKChwcmV2KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0Q2ZnOiBBUlN0dWRpb0NvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdzUGVyR3JvdXA6IDUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nRmxvb3JDb3VudDogMTA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZGluZ0xheW91dDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTWV0cm9wb2xpYSBDZW50cmFsbmEgKFpkai4gMiDCtyBHbG9iYWwgTmV0d29yayknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE9yaWVudGF0aW9uOTE2OiAnUGlvbm93ZSBXaWXFvG93Y2UgKEtsYXN5Y3puZSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBodWRTY3JlZW5TdHlsZTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnSG9sb2dyYW15IEdsb2JhbCBOZXR3b3JrIChaZGouIDIgwrcgVGVsZW1ldHJpYSAmIE1hcGEpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sb2dyYW1TdHlsZTogJ1dvbHVtZXRyeWN6bmEgU2lhdGthIEN5amFub3dhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUmVmZXJlbmNlSW1hZ2VVcmw6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9hc3NldHMvYWlzdHVkaW8vemRqLl8yLnBuZ18yS18yMDI2MTAyMzEyMTUxMF9lOWIyMWIwYy5qcGcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyU2NhblB1bHNlOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRDZmcuc3ViTW9kZWxPdmVycmlkZXMgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGVJbml0aWFsU3ViTW9kZWxPdmVycmlkZXMobmV4dENmZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicm9hZGNhc3RDb25maWdUb1dpbmRvd3MobmV4dENmZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dENmZztcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRKc29uU3RhdHVzTWVzc2FnZShcbiAgICAgICAgICAgICAgICAgICAgICAgICdXY3p5dGFubyBNb2RlbCAzRDogWmRqLiAyIChHbG9iYWwgTmV0d29yayBNZXRyb3BvbGlzKSdcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SnNvblN0YXR1c01lc3NhZ2UobnVsbCksIDMwMDApO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTEuNSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xICR7XG4gICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmJ1aWxkaW5nTGF5b3V0ID09PVxuICAgICAgICAgICAgICAgICAgICAgICdNZXRyb3BvbGlhIENlbnRyYWxuYSAoWmRqLiAyIMK3IEdsb2JhbCBOZXR3b3JrKSdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAvMjUgYm9yZGVyLXNreS00MDAgdGV4dC1za3ktMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctWyMwNjBjMTddIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIE1vZGVsIFpkai4gMiAoR2xvYmFsIE5ldHdvcmspXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRDb25maWcoKHByZXYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRDZmc6IEFSU3R1ZGlvQ29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZGluZ3NQZXJHcm91cDogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdGbG9vckNvdW50OiA4NixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdMYXlvdXQ6ICfFgXVrIEFtZml0ZWF0cmFsbnkgKFDDs8WCa29sZSAzRCknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RlbE9yaWVudGF0aW9uOTE2OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdVa8WCYWQgUG96aW9teSA5OjE2IChIb3J5em9udGFsbmUgS29tcGxla3N5KScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGh1ZFNjcmVlblN0eWxlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdTemtsYW55IFBhbmVsIEludGVyYWt0eXdueSAoRnJvc3RlZCBHbGFzcyBVSSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBob2xvZ3JhbVN0eWxlOiAnRGlhZ3JpZCBFeG9za2VsZXRvbiArIFJkemXFhCBCSU0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21SZWZlcmVuY2VJbWFnZVVybDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnL2Fzc2V0cy9haXN0dWRpby9QdWxwaXRfY2VudHJ1bV8xXzMzYjkwNDAwLmpwZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dENmZy5zdWJNb2RlbE92ZXJyaWRlcyA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZUluaXRpYWxTdWJNb2RlbE92ZXJyaWRlcyhuZXh0Q2ZnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyb2FkY2FzdENvbmZpZ1RvV2luZG93cyhuZXh0Q2ZnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0Q2ZnO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHNldEpzb25TdGF0dXNNZXNzYWdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ1djenl0YW5vIE1vZGVsIDNEOiBaZGouIDEgKDMgS2xhc3RyeSBBcmNoaXRla3Rvbmljem5lKSdcbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SnNvblN0YXR1c01lc3NhZ2UobnVsbCksIDMwMDApO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTEuNSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xICR7XG4gICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmJ1aWxkaW5nTGF5b3V0ICE9PVxuICAgICAgICAgICAgICAgICAgICAgICdNZXRyb3BvbGlhIENlbnRyYWxuYSAoWmRqLiAyIMK3IEdsb2JhbCBOZXR3b3JrKSdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby01MDAvMjUgYm9yZGVyLWluZGlnby00MDAgdGV4dC1pbmRpZ28tMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctWyMwNjBjMTddIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIE1vZGVsIFpkai4gMSAoMyBLbGFzdHJ5IDk6MTYpXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEFyY2hpdGVjdHVyYWwgRmFjYWRlIFRleHR1cmUgU3R1ZGlvICYgU2VwYXJhdGUgV2luZG93IEZ1bGxzY3JlZW4gVmlzdWFsaXplciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yLjUgcHQtMi41IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LXNreS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPFBhaW50YnJ1c2ggY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgVGVrc3R1cnkgTW9kZWx1IDNEICYgUGXFgm55IEVrcmFuOlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicm9hZGNhc3RDb25maWdUb1dpbmRvd3MoY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEZ1bGxzY3JlZW5WaWV3ZXJPcGVuKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPdHfDs3J6IGRlZHlrb3dhbmUgb2tubyB3aXp1YWxpemFjamkgbW9kZWx1IDNEIG5hIHBlxYJueW0gZWtyYW5pZSB3cmF6IHplIHN0dWRpZW0gbmFrxYJhZGFuaWEgdGVrc3R1clwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgdGV4dC1bMTFweF0gZm9udC1ib2xkIGJnLXNreS00MDAgaG92ZXI6Ymctc2t5LTMwMCB0ZXh0LXNsYXRlLTk1MCByb3VuZGVkIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxNYXhpbWl6ZSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBQZcWCbnkgRWtyYW4gM0RcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICBocmVmPXtgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfT9mdWxsc2NyZWVuTW9kZWw9MWB9XG4gICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBicm9hZGNhc3RDb25maWdUb1dpbmRvd3MoY29uZmlnKX1cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIk90d8Ozcnogd2l6dWFsaXphY2rEmSBtb2RlbHUgM0QgbmEgcGXFgm55bSBla3JhbmllIHcgb3NvYm55bSBva25pZSBwcnplZ2zEhWRhcmtpIChzeW5jaHJvbml6YWNqYSBuYSDFvHl3bylcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSB0ZXh0LVsxMXB4XSBmb250LWJvbGQgYmctaW5kaWdvLTUwMC8yNSBob3ZlcjpiZy1pbmRpZ28tNTAwLzQwIHRleHQtaW5kaWdvLTIwMCBib3JkZXIgYm9yZGVyLWluZGlnby00MDAvNTAgcm91bmRlZCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8RXh0ZXJuYWxMaW5rIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIE9zb2JuZSBPa25vXG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFF1aWNrIFRleHR1cmUgU2VsZWN0b3IgJiBDdXN0b20gVGV4dHVyZSBGaWxlIFVwbG9hZCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5idWlsZGluZ1RleHR1cmVQcmVzZXR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRQcmVzZXQgPSBlLnRhcmdldFxuICAgICAgICAgICAgICAgICAgICAgICAgLnZhbHVlIGFzIEJ1aWxkaW5nVGV4dHVyZVByZXNldE9wdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVVcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdUZXh0dXJlUHJlc2V0OiBuZXh0UHJlc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdUZXh0dXJlT3BhY2l0eTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFByZXNldCA9PT1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0hvbG9ncmFtIERpYWdyaWQgKERvbXnFm2xueSBDeWphbi1axYJvdG8pJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gMC44NFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogTWF0aC5tYXgoMC45MiwgY29uZmlnLmJ1aWxkaW5nVGV4dHVyZU9wYWNpdHkpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiV3liaWVyeiB0ZWtzdHVyxJkgZmFzYWR5IG1vZGVsdSAzRFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBtaW4tdy0wIGJnLVsjMDUwYjE0XSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkIHB4LTIgcHktMSB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7VEVYVFVSRV9QUkVTRVRfT1BUSU9OUy5tYXAoKG9wdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtvcHQuaWR9IHZhbHVlPXtvcHQuaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgVGVrc3R1cmE6IHtvcHQuc2hvcnRMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiV2dyYWogd8WCYXNuxIUgdGVrc3R1csSZIHogcGxpa3UgKC5KUEcsIC5QTkcpIGkgbmHFgsOzxbwgasSFIGJlenBvxZtyZWRuaW8gbmEgYnJ5xYJ5IGJ1ZHlua8OzdyAzRFwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIGJnLWVtZXJhbGQtNTAwLzIwIGhvdmVyOmJnLWVtZXJhbGQtNTAwLzMwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MCByb3VuZGVkIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEltYWdlUGx1cyBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgVGVrc3R1cmEgVVZcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDdXN0b21CdWlsZGluZ1RleHR1cmVVcGxvYWR9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTYXZlIC8gTG9hZCBQcm9qZWN0ICguSlNPTiAmIEJyb3dzZXIgU2xvdHMpICsgTmV3IE1vZGVsIFN0cmlwICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIuNSBwdC0yLjUgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0zMDAgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAge2pzb25TdGF0dXNNZXNzYWdlID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2pzb25TdGF0dXNNZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAnWmFwaXMgcHJvamVrdHUgaSBOb3d5IE1vZGVsOidcbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU3RhcnROZXdNb2RlbH1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJBdXRvbWF0eWN6bmllIHphcGlzdWplIGJpZcW8xIVjeSBwcm9qZWt0IG5hIGxpxZtjaWUgaSBvdHdpZXJhIGN6eXN0eSBOb3d5IE1vZGVsIGRvIGVkeWNqaVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHRleHQtWzExcHhdIGZvbnQtYm9sZCBiZy1lbWVyYWxkLTUwMC8yMCBob3ZlcjpiZy1lbWVyYWxkLTUwMC8zMCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNDAgcm91bmRlZCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxGaWxlUGx1czIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIE5vd3kgTW9kZWxcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhwb3J0Q29uZmlnSnNvbn1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IGNhxYJ5IHByb2pla3QgKHdzenlzdGtpZSBwYXJhbWV0cnkgaSBzdWItbW9kZWxlKSBkbyBwbGlrdSAuSlNPTiBuYSBkeXNrXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCBiZy1hbWJlci01MDAvMjAgaG92ZXI6YmctYW1iZXItNTAwLzMwIHRleHQtYW1iZXItMzAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzQwIHJvdW5kZWQgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIFphcGlzeiAuSlNPTlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIldjenl0YWogd2N6ZcWbbmllaiB6YXBpc2FueSBwbGlrIC5KU09OIHogZHlza3VcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZCBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxGb2xkZXJPcGVuIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgV2N6eXRhaiAuSlNPTlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiLmpzb24sYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUltcG9ydENvbmZpZ0pzb25GaWxlKGZpbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNhdmVTbG90VG9Ccm93c2VyfVxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlphcGlzeiBiaWXFvMSFY3kgcHJvamVrdCB3IHBhbWnEmWNpIHBvZHLEmWN6bmVqIHByemVnbMSFZGFya2ksIGJ5IG3Ds2Mgd3LDs2NpxIcgZG8gbmllZ28gamVkbnltIGtsaWtuacSZY2llbVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgYmctc2t5LTUwMC8yMCBob3ZlcjpiZy1za3ktNTAwLzMwIHRleHQtc2t5LTMwMCBib3JkZXIgYm9yZGVyLXNreS01MDAvNDAgcm91bmRlZCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxCb29rbWFya1BsdXMgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIFphcGlzeiB3IFBhbWnEmWNpXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZVRvQ2xvdWRGaXJlc3RvcmV9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiWmFwaXN6IG1vZGVsIDNEIGkgbmHFgm/FvG9uZSB0ZWtzdHVyeSB3IGJhemllIGRhbnljaCBGaXJlYmFzZSBGaXJlc3RvcmUgKEtvbnRvIEdvb2dsZSlcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIGJnLWluZGlnby01MDAvMjAgaG92ZXI6YmctaW5kaWdvLTUwMC8zMCB0ZXh0LWluZGlnby0yMDAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNDAwLzUwIHJvdW5kZWQgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2xvdWQgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWluZGlnby0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICBaYXBpc3ogdyBDaG11cnplXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAge2N1cnJlbnRVc2VyID8gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlR29vZ2xlU2lnbk91dH1cbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17YFphbG9nb3dhbm8gamFrbyAke2N1cnJlbnRVc2VyLmVtYWlsIHx8IGN1cnJlbnRVc2VyLmRpc3BsYXlOYW1lfS4gS2xpa25paiwgYWJ5IHd5bG9nb3dhxIcuYH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgdGV4dC1bMTBweF0gZm9udC1tb25vIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8TG9nT3V0IGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBXeWxvZ3VqXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUdvb2dsZVNpZ25Jbn1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgdGV4dC1bMTBweF0gZm9udC1tb25vIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1za3ktMzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPExvZ0luIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBHb29nbGUgTG9naW5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIENsb3VkIEZpcmVzdG9yZSBTYXZlZCBQcm9qZWN0cyAqL31cbiAgICAgICAgICAgICAgICB7Y2xvdWRQcm9qZWN0cy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMSBzcGFjZS15LTEgbWF4LWgtMjQgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFByb2pla3R5IHcgQ2htdXJ6ZSBGaXJlYmFzZSAoe2Nsb3VkUHJvamVjdHMubGVuZ3RofSkg4oCUIGtsaWtuaWosIGFieSB3Y3p5dGHEhzpcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtjbG91ZFByb2plY3RzLm1hcCgocHJvaikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cHJvai5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMS41IGJnLVsjMDYwZjIwXSBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgcm91bmRlZCBweC0yIHB5LTEgdGV4dC1bMTFweF1cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUxvYWRGcm9tQ2xvdWRGaXJlc3RvcmUocHJvail9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtbGVmdCB0ZXh0LXNsYXRlLTEwMCBob3Zlcjp0ZXh0LXNreS0zMDAgdHJ1bmNhdGUgZmxleC0xIGZvbnQtbWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2Ake3Byb2oubmFtZX0gKCR7cHJvai5zdW1tYXJ5fSlgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cHJvai5uYW1lfXsnICd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtaW5kaWdvLTMwMC84MCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoe3Byb2ouc3VtbWFyeX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZGVsZXRlUHJvamVjdEZyb21GaXJlc3RvcmUocHJvai5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcm9zZS00MDAgcC0wLjUgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlVzdcWEIHByb2pla3QgeiBjaG11cnlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBRdWljayBTYXZlZCBCcm93c2VyIFByb2plY3QgU2xvdHMgKi99XG4gICAgICAgICAgICAgICAge3NhdmVkU2xvdHMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTEgc3BhY2UteS0xIG1heC1oLTI0IG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFphcGlzYW5lIHByb2pla3R5IHcgcGFtacSZY2kgKHtzYXZlZFNsb3RzLmxlbmd0aH0pIOKAlCBrbGlrbmlqLCBhYnkgd3LDs2NpxIc6XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7c2F2ZWRTbG90cy5tYXAoKHNsb3QpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3Nsb3QuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTEuNSBiZy1bIzA1MGIxNF0gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZCBweC0yIHB5LTEgdGV4dC1bMTFweF1cIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUxvYWRTbG90RnJvbUJyb3dzZXIoc2xvdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtbGVmdCB0ZXh0LXNsYXRlLTIwMCBob3Zlcjp0ZXh0LXNreS0zMDAgdHJ1bmNhdGUgZmxleC0xIGZvbnQtbWVkaXVtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2BXY3p5dGFqOiAke3Nsb3QubmFtZX0gKCR7c2xvdC5zdW1tYXJ5fSlgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2xvdC5uYW1lfXsnICd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICh7c2xvdC5zdW1tYXJ5fSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVEZWxldGVTbG90RnJvbUJyb3dzZXIoc2xvdC5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcm9zZS00MDAgcC0wLjUgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlVzdcWEIHphcGlzYW55IHNsb3RcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIENvbnRleHR1YWwgUHJvbXB0IE5leHQtRWxlbWVudCBTdWdnZXN0aW9ucyBTdHJpcCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yLjUgcHQtMi41IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNreS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgUG9kcG93aWVkemkgRGFsc3p5Y2ggRWxlbWVudMOzdyBQcm9tcHR1OlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlT3BlbldvcmtiZW5jaCgncHJvbXB0cycpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1za3ktMzAwIHVuZGVybGluZSB1bmRlcmxpbmUtb2Zmc2V0LTJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBXc3p5c3RraWUgKHtxdWlja0NvbnRleHR1YWxTdWdnZXN0aW9ucy5sZW5ndGh9KSDihpJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgbWF4LWgtMjggb3ZlcmZsb3cteS1hdXRvIHByLTAuNVwiPlxuICAgICAgICAgICAgICAgICAge3F1aWNrQ29udGV4dHVhbFN1Z2dlc3Rpb25zLnNsaWNlKDAsIDQpLm1hcCgoc3VnZykgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtzdWdnLmlkfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUFwcGx5UXVpY2tTdWdnZXN0aW9uKHN1Z2cpfVxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtgJHtzdWdnLmNvbnRleHRSZWFzb259XFxuXFxuS2xpa25paiwgYWJ5IHphc3Rvc293YcSHIHcgM0QgaSBza29waW93YcSHIGdvdG93eSBmcmFnbWVudDpcXG5cIiR7c3VnZy5zbmlwcGV0UEx9XCJgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgYmctWyMwNjBkMTldIGhvdmVyOmJnLXNreS05NTAvNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNreS01MDAvNTAgcm91bmRlZC1tZCBweC0yIHB5LTEuNSB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBnYXAtMiBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNreS00MDAgZm9udC1zZW1pYm9sZCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICArIEtyb2sge3N1Z2cuc3RlcE51bWJlcn06IHtzdWdnLmNhdGVnb3J5fVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtMjAwIGZvbnQtbWVkaXVtIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzdWdnLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSB0ZXh0LVs5cHhdIGZvbnQtYm9sZCBiZy1za3ktNTAwLzE1IGdyb3VwLWhvdmVyOmJnLXNreS00MDAgZ3JvdXAtaG92ZXI6dGV4dC1zbGF0ZS05NTAgdGV4dC1za3ktMzAwIHJvdW5kZWQgc2hyaW5rLTAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICsgRG9waXN6XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogVXN0YXdpZW5pYSDFmnJvZG93aXNrYTogRWZla3QgTWfFgnkgQXRtb3NmZXJ5Y3puZWogJiBJbnRlbnN5d25vxZvEhyBPxZt3aWV0bGVuaWEgT3RvY3plbmlhICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIuNSBwdC0yLjUgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgVXN0YXdpZW5pYSDFmnJvZG93aXNrYVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICBTaGFkZXIgX0ZvZ0RlbnNpdHk6eycgJ31cbiAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLmVuYWJsZUF0bW9zcGhlcmljRm9nXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICcwLjA2NSAoQWt0eXduYSknXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcwLjAwMCAoV3nFgi4pJ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIHJvbGU9XCJzd2l0Y2hcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e2NvbmZpZy5lbmFibGVBdG1vc3BoZXJpY0ZvZ31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVVcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlQXRtb3NwaGVyaWNGb2c6ICFjb25maWcuZW5hYmxlQXRtb3NwaGVyaWNGb2csXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25maWcuZW5hYmxlQXRtb3NwaGVyaWNGb2dcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAvMjAgYm9yZGVyLXNreS00MDAvNjAgdGV4dC1za3ktMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwLzgwIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5FZmVrdCBNZ8WCeSBBdG1vc2Zlcnljem5lajo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLmVuYWJsZUF0bW9zcGhlcmljRm9nID8gJ1fFgS4nIDogJ1dZxYEuJ31cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogU2xpZGVyOiBJbnRlbnN5d25vxZvEhyBPxZt3aWV0bGVuaWEgT3RvY3plbmlhICgwLjUgLSAyLjApICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBkMTldIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzkwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTEuNSBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbFxuICAgICAgICAgICAgICAgICAgICAgIGh0bWxGb3I9XCJlbnYtbGlnaHRpbmctaW50ZW5zaXR5LXNsaWRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgSW50ZW5zeXdub8WbxIcgT8Wbd2lldGxlbmlhIE90b2N6ZW5pYVxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtYW1iZXItMzAwIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb25maWcuZW52TGlnaHRpbmdJbnRlbnNpdHkudG9GaXhlZCgyKX14IChcbiAgICAgICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChjb25maWcuZW52TGlnaHRpbmdJbnRlbnNpdHkgKiAxMDApfSUpXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIGlkPVwiZW52LWxpZ2h0aW5nLWludGVuc2l0eS1zbGlkZXJcIlxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICBtaW49ezAuNX1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXsyLjB9XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9ezAuMDV9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcuZW52TGlnaHRpbmdJbnRlbnNpdHl9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVVcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZW52TGlnaHRpbmdJbnRlbnNpdHk6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkludGVuc3l3bm/Fm8SHIE/Fm3dpZXRsZW5pYSBPdG9jemVuaWFcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMCBjdXJzb3ItcG9pbnRlciBoLTEuNSBiZy1zbGF0ZS04MDAgcm91bmRlZC1sZ1wiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4wLjV4PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICBVbml0eTogZW52aXJvbm1lbnREaXJlY3Rpb25hbExpZ2h0LmludGVuc2l0eSA9IGJyaWdodG5lc3NcbiAgICAgICAgICAgICAgICAgICAgICAqIHtjb25maWcuZW52TGlnaHRpbmdJbnRlbnNpdHkudG9GaXhlZCgyKX1mXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Mi4weDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQ29udGV4dHVhbCBTZWxlY3RlZCBCdWlsZGluZyBCSU0gSW5zcGVjdG9yICovfVxuICAgICAgICAgICAgICB7c2VsZWN0ZWRUZWxlbWV0cnkgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBwdC0yLjUgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC85MCBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtYW1iZXItMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkVGVsZW1ldHJ5Lm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVVcGRhdGVDb25maWcoeyBzZWxlY3RlZEJ1aWxkaW5nOiBudWxsIH0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgcC0wLjVcIlxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJaYW1rbmlqIGluc3Bla2NqxJkgYnVkeW5rdVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIEtsaWtuaWogcHJ6eWNpc2sgcG9uacW8ZWosIGFieSBlZHl0b3dhxIcgcG9qZWR5bmN6xIUgYnJ5xYLEmTpcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQXNzZW1ibGVVbmlmaWVkTW9kZWx9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCBiZy1hbWJlci00MDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBFZHl0dWogYnJ5xYLEmSDihpJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogSW50ZXJhY3RpdmUgRnJvc3RlZCBHbGFzcyBQYW5lbCBXaWRnZXQgbWF0Y2hpbmcgdGhlIHVzZXIncyBhdHRhY2hlZCByZWZlcmVuY2UgaW1hZ2UgKi99XG4gICAgICAgICAgICA8SW50ZXJhY3RpdmVHbGFzc1BhbmVsV2lkZ2V0XG4gICAgICAgICAgICAgIGNvbmZpZz17Y29uZmlnfVxuICAgICAgICAgICAgICBhY3RpdmVQYW5lbFR5cGU9e2FjdGl2ZUdsYXNzUGFuZWx9XG4gICAgICAgICAgICAgIGFjdGl2ZUljb25JbmRleD17YWN0aXZlR2xhc3NJY29uSWR4fVxuICAgICAgICAgICAgICBpc0V4cGFuZGVkPXtnbGFzc1dpZGdldEV4cGFuZGVkfVxuICAgICAgICAgICAgICBvblRvZ2dsZUV4cGFuZD17KCkgPT4gc2V0R2xhc3NXaWRnZXRFeHBhbmRlZCgocHJldikgPT4gIXByZXYpfVxuICAgICAgICAgICAgICBvblNlbGVjdFBhbmVsVHlwZT17KHBUeXBlKSA9PiBzZXRBY3RpdmVHbGFzc1BhbmVsKHBUeXBlKX1cbiAgICAgICAgICAgICAgb25TZWxlY3RJY29uSW5kZXg9eyhpZHgpID0+IHNldEFjdGl2ZUdsYXNzSWNvbklkeChpZHgpfVxuICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZz17aGFuZGxlVXBkYXRlQ29uZmlnfVxuICAgICAgICAgICAgICBvbkFjdGlvbkFycm93Q2xpY2s9eygpID0+IGhhbmRsZU9wZW5Xb3JrYmVuY2goJ3Byb21wdHMnKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFVuaWZpZWQgQ29tcG9zaXRlIFNwYXRpYWwgTW9kZWwgJiBJbmRpdmlkdWFsIFN1Yi1Nb2RlbCBFZGl0b3IgRHJhd2VyICovfVxuICAgICAgICB7IXdvcmtiZW5jaE9wZW4gJiYgKFxuICAgICAgICAgIDxVbmlmaWVkU3BhdGlhbE1vZGVsQ29tcG9zZXJcbiAgICAgICAgICAgIGlzT3Blbj17Y29tcG9zZXJPcGVufVxuICAgICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRDb21wb3Nlck9wZW4oZmFsc2UpfVxuICAgICAgICAgICAgb25VcGRhdGVDb25maWc9e2hhbmRsZVVwZGF0ZUNvbmZpZ31cbiAgICAgICAgICAgIG9uVXBkYXRlU3ViTW9kZWw9e2hhbmRsZVVwZGF0ZVN1Yk1vZGVsfVxuICAgICAgICAgICAgb25SZWJ1aWxkQ29tcG9zaXRlRnJvbUdsb2JhbD17aGFuZGxlUmVidWlsZENvbXBvc2l0ZUZyb21HbG9iYWx9XG4gICAgICAgICAgICBvbkV4cG9ydEpzb249e2hhbmRsZUV4cG9ydENvbmZpZ0pzb259XG4gICAgICAgICAgICBvbkltcG9ydEpzb25GaWxlPXtoYW5kbGVJbXBvcnRDb25maWdKc29uRmlsZX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBNb2JpbGUgQVIgUmVzb3VyY2UgTW9uaXRvcmluZyBQYW5lbCAoRlBTLCBNZW1vcnksIERyYXcgQ2FsbHMsIE1lc2gvVkZYIEltcGFjdCkgKi99XG4gICAgICAgIHshd29ya2JlbmNoT3BlbiAmJiAhY29tcG9zZXJPcGVuICYmIChcbiAgICAgICAgICA8UmVzb3VyY2VNb25pdG9yUGFuZWxcbiAgICAgICAgICAgIGNvbmZpZz17Y29uZmlnfVxuICAgICAgICAgICAgbGl2ZU1ldHJpY3M9e2xpdmVNZXRyaWNzfVxuICAgICAgICAgICAgb25VcGRhdGVDb25maWc9e2hhbmRsZVVwZGF0ZUNvbmZpZ31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBVbmlmaWVkIENvbGxhcHNpYmxlIEJvdHRvbSBDb250cm9sIERvY2sgKi99XG4gICAgICAgIHshd29ya2JlbmNoT3BlbiAmJiAoXG4gICAgICAgICAgPEJvdHRvbUNvbnRyb2xEb2NrXG4gICAgICAgICAgICBjb25maWc9e2NvbmZpZ31cbiAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnPXtoYW5kbGVVcGRhdGVDb25maWd9XG4gICAgICAgICAgICBvbk9wZW5Xb3JrYmVuY2g9e2hhbmRsZU9wZW5Xb3JrYmVuY2h9XG4gICAgICAgICAgICBvbkFzc2VtYmxlVW5pZmllZE1vZGVsPXtoYW5kbGVBc3NlbWJsZVVuaWZpZWRNb2RlbH1cbiAgICAgICAgICAgIG9uRXhwb3J0SnNvbj17aGFuZGxlRXhwb3J0Q29uZmlnSnNvbn1cbiAgICAgICAgICAgIG9uSW1wb3J0SnNvbkZpbGU9e2hhbmRsZUltcG9ydENvbmZpZ0pzb25GaWxlfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFNlY29uZGFyeSBNb2RhbCBWaWV3OiBQcm9tcHQgRW5naW5lZXJpbmcgJiBVbml0eSBDIyBDb2RlIFdvcmtiZW5jaCAqL31cbiAgICAgICAgPFByb21wdFdvcmtiZW5jaE1vZGFsXG4gICAgICAgICAgaXNPcGVuPXt3b3JrYmVuY2hPcGVufVxuICAgICAgICAgIGFjdGl2ZVRhYj17d29ya2JlbmNoVGFifVxuICAgICAgICAgIG9uVGFiQ2hhbmdlPXtzZXRXb3JrYmVuY2hUYWJ9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0V29ya2JlbmNoT3BlbihmYWxzZSl9XG4gICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgb25VcGRhdGVDb25maWc9e2hhbmRsZVVwZGF0ZUNvbmZpZ31cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogRGVkaWNhdGVkIEZ1bGxzY3JlZW4gLyBTZXBhcmF0ZSBXaW5kb3cgM0QgTW9kZWwgJiBUZXh0dXJlIFZpc3VhbGl6ZXIgKi99XG4gICAgICAgIDxGdWxsU2NyZWVuTW9kZWxWaWV3ZXJNb2RhbFxuICAgICAgICAgIGlzT3Blbj17ZnVsbHNjcmVlblZpZXdlck9wZW59XG4gICAgICAgICAgaXNTdGFuZGFsb25lV2luZG93PXtpc1N0YW5kYWxvbmVXaW5kb3d9XG4gICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgb25VcGRhdGVDb25maWc9e2hhbmRsZVVwZGF0ZUNvbmZpZ31cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRGdWxsc2NyZWVuVmlld2VyT3BlbihmYWxzZSl9XG4gICAgICAgIC8+XG4gICAgICA8L21haW4+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXX0=