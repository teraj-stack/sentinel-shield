const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport3_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch/node_modules/.vite/deps/react.js?v=50682de0";
import { Camera, ExternalLink, Eye, EyeOff, ImagePlus, Layers, Maximize, Minimize, Paintbrush, Sparkles, X } from "/apps/holoarch/node_modules/.vite/deps/lucide-react.js?v=50682de0";
import { HoloArchScene } from "/apps/holoarch/src/three/HoloArchScene.tsx";
var _jsxFileName = "/app/applet/src/components/FullScreenModelViewerModal.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/apps/holoarch/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=50682de0";
export const TEXTURE_PRESET_OPTIONS = [
	{
		id: "Hologram Diagrid (Domyślny Cyjan-Złoto)",
		shortLabel: "Hologram Diagrid",
		desc: "Półprzezroczysta siatka cyjanowo-złota z efektem Fresnela",
		swatchClass: "from-cyan-400 to-amber-400"
	},
	{
		id: "Fasada Szklana Refleksyjna (Skyscraper Curtain Wall)",
		shortLabel: "Fasada Szklana PBR",
		desc: "Refleksyjna ściana kurtynowa z podświetlonymi kondygnacjami biurowymi",
		swatchClass: "from-sky-500 to-blue-900"
	},
	{
		id: "Tytan i Szczotkowane Złoto (Parametric Metal)",
		shortLabel: "Tytan + Złoto",
		desc: "Anodowane płyty tytanowe z parametryczną kratownicą ze szczotkowanego złota",
		swatchClass: "from-amber-400 to-slate-600"
	},
	{
		id: "Beton Architektoniczny i Rdzeń Świetlny (Brutalist BIM)",
		shortLabel: "Beton Architektoniczny",
		desc: "Płyty betonu szalunkowego z podświetlonymi dylatacjami rdzenia BIM",
		swatchClass: "from-slate-400 to-amber-500"
	},
	{
		id: "Karbonowo-Szafirowy Kompozyt (Cyber-Facade)",
		shortLabel: "Kompozyt Karbon-Szafir",
		desc: "Włókno węglowe o splocie diagonalnym z neonowymi żyłami szafirowymi",
		swatchClass: "from-indigo-500 to-cyan-400"
	},
	{
		id: "Własna Tekstura z Pliku (Custom UV Map)",
		shortLabel: "Własna Tekstura UV",
		desc: "Nałóż dowolną własną teksturę z pliku .JPG / .PNG na bryły budynków",
		swatchClass: "from-emerald-400 to-teal-600"
	}
];
export const FullScreenModelViewerModal = ({ isOpen, isStandaloneWindow = false, config, onUpdateConfig, onClose }) => {
	const [hudHidden, setHudHidden] = useState(false);
	const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
	useEffect(() => {
		const onFsChange = () => {
			setIsNativeFullscreen(Boolean(document.fullscreenElement));
		};
		document.addEventListener("fullscreenchange", onFsChange);
		return () => document.removeEventListener("fullscreenchange", onFsChange);
	}, []);
	if (!isOpen) return null;
	const handleToggleNativeFullscreen = async () => {
		try {
			if (!document.fullscreenElement) {
				await document.documentElement.requestFullscreen();
			} else {
				await document.exitFullscreen();
			}
		} catch {}
	};
	const handleCustomTextureUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				onUpdateConfig({
					customBuildingTextureUrl: reader.result,
					buildingTexturePreset: "Własna Tekstura z Pliku (Custom UV Map)",
					buildingTextureOpacity: Math.max(.9, config.buildingTextureOpacity)
				});
			}
		};
		reader.readAsDataURL(file);
	};
	const selectedSubModel = config.selectedSubModelId ? config.subModelOverrides[config.selectedSubModelId] : null;
	const handleAssignTextureToSelectedSubModel = (preset) => {
		if (!config.selectedSubModelId || !selectedSubModel) return;
		onUpdateConfig({ subModelOverrides: {
			...config.subModelOverrides,
			[config.selectedSubModelId]: {
				...selectedSubModel,
				texturePreset: preset
			}
		} });
	};
	const standaloneUrl = `${window.location.origin}${window.location.pathname}?fullscreenModel=1`;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 w-screen h-screen bg-[#040811] text-slate-100 overflow-hidden select-none",
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Wizualizacja modelu 3D na pełnym ekranie i studio tekstur",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "relative w-full h-full",
			children: [
				/* @__PURE__ */ _jsxDEV(HoloArchScene, {
					config,
					onSelectBuilding: (id) => onUpdateConfig({ selectedBuilding: id }),
					onSelectSubModel: (subId, clusterId) => onUpdateConfig({
						selectedSubModelId: subId,
						selectedBuilding: clusterId
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 157,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "absolute top-4 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "pointer-events-auto bg-[#081120]/95 border border-slate-800 rounded-xl px-4 py-2.5 shadow-2xl flex items-center gap-3",
						children: [/* @__PURE__ */ _jsxDEV("div", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-xs font-bold text-white tracking-tight flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV("span", { children: "Pełnoekranowa Wizualizacja Modelu 3D & Studio Tekstur PBR" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 176,
								columnNumber: 17
							}, this), isStandaloneWindow && /* @__PURE__ */ _jsxDEV("span", {
								className: "px-2 py-0.5 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded",
								children: "Osobne Okno (Live Sync)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 180,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 175,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-[11px] text-slate-400 font-mono",
							children: [
								"Aktywna tekstura:",
								" ",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "text-sky-300 font-semibold",
									children: config.buildingTexturePreset
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 187,
									columnNumber: 17
								}, this),
								" ",
								"· Skala UV: ",
								config.buildingTextureScale.toFixed(1),
								"x · Krycie:",
								" ",
								Math.round(config.buildingTextureOpacity * 100),
								"%"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 185,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 172,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "pointer-events-auto flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => setHudHidden((prev) => !prev),
								className: "px-3 py-2 text-xs font-semibold bg-[#081120]/95 hover:bg-[#10203a] text-slate-200 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-xl",
								children: hudHidden ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Eye, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 19
								}, this), "Pokaż Panel Tekstur"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 203,
									columnNumber: 17
								}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(EyeOff, { className: "w-3.5 h-3.5 text-slate-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 209,
									columnNumber: 19
								}, this), "Czysty Ekran 3D"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 208,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 197,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: handleToggleNativeFullscreen,
								className: "px-3 py-2 text-xs font-semibold bg-[#081120]/95 hover:bg-[#10203a] text-sky-300 border border-sky-500/40 rounded-lg transition-colors flex items-center gap-1.5 shadow-xl",
								children: isNativeFullscreen ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Minimize, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 222,
									columnNumber: 19
								}, this), "Wyjdź z Pełnego Ekranu (ESC)"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 221,
									columnNumber: 17
								}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Maximize, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 227,
									columnNumber: 19
								}, this), "Pełny Ekran Monitora (F11)"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 215,
								columnNumber: 13
							}, this),
							!isStandaloneWindow && /* @__PURE__ */ _jsxDEV("a", {
								href: standaloneUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								title: "Otwórz wizualizację 3D w całkowicie osobnym oknie / karcie przeglądarki z synchronizacją na żywo",
								className: "px-3.5 py-2 text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 shadow-xl",
								children: [/* @__PURE__ */ _jsxDEV(ExternalLink, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 241,
									columnNumber: 17
								}, this), "Otwórz w Osobnym Oknie ↗"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 234,
								columnNumber: 15
							}, this),
							!isStandaloneWindow && /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: onClose,
								className: "px-3.5 py-2 text-xs font-bold bg-rose-500/20 hover:bg-rose-500/35 text-rose-200 border border-rose-500/40 rounded-lg transition-colors flex items-center gap-1.5 shadow-xl",
								children: [/* @__PURE__ */ _jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 252,
									columnNumber: 17
								}, this), "Powrót do Studia"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 171,
					columnNumber: 9
				}, this),
				!hudHidden && /* @__PURE__ */ _jsxDEV("div", {
					className: "absolute bottom-5 left-6 right-6 z-20 pointer-events-none flex justify-center",
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "pointer-events-auto w-full max-w-5xl bg-[#081120]/95 border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3.5",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ _jsxDEV(Paintbrush, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 267,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs font-bold uppercase tracking-wider text-slate-100",
											children: "Nakładanie Tekstur i Materiałów Fasadowych PBR na Model 3D"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 268,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 266,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-2",
										children: /* @__PURE__ */ _jsxDEV("label", {
											className: "px-3 py-1.5 text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ _jsxDEV(ImagePlus, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 275,
													columnNumber: 23
												}, this),
												"Wgraj Własną Teksturę (.JPG / .PNG)",
												/* @__PURE__ */ _jsxDEV("input", {
													type: "file",
													accept: "image/*",
													onChange: handleCustomTextureUpload,
													className: "hidden"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 277,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 274,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 273,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 265,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2",
									children: TEXTURE_PRESET_OPTIONS.map((item) => {
										const isSelected = config.buildingTexturePreset === item.id;
										return /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => onUpdateConfig({
												buildingTexturePreset: item.id,
												buildingTextureOpacity: item.id === "Hologram Diagrid (Domyślny Cyjan-Złoto)" ? .84 : Math.max(.92, config.buildingTextureOpacity)
											}),
											title: item.desc,
											className: `p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${isSelected ? "bg-sky-950/60 border-sky-400 shadow-lg" : "bg-[#050b14] border-slate-800 hover:border-slate-600"}`,
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center justify-between gap-1.5",
												children: [/* @__PURE__ */ _jsxDEV("span", { className: `w-5 h-5 rounded-md bg-gradient-to-br ${item.swatchClass} border border-white/20 shrink-0` }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 313,
													columnNumber: 27
												}, this), isSelected && /* @__PURE__ */ _jsxDEV("span", {
													className: "px-1.5 py-0.5 text-[9px] font-mono font-bold bg-sky-400 text-slate-950 rounded",
													children: "AKTYWNA"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 317,
													columnNumber: 29
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 312,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "text-xs font-bold text-slate-100 leading-tight truncate",
												children: item.shortLabel
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 323,
												columnNumber: 27
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "text-[10px] text-slate-400 line-clamp-1 mt-0.5",
												children: item.desc
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 326,
												columnNumber: 27
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 322,
												columnNumber: 25
											}, this)]
										}, item.id, true, {
											fileName: _jsxFileName,
											lineNumber: 292,
											columnNumber: 23
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 287,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800/90 items-center",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "bg-[#050b14] border border-slate-800 rounded-lg px-3 py-2",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "flex justify-between text-xs text-slate-300 mb-1",
											children: [/* @__PURE__ */ _jsxDEV("span", { children: "Skala Mapowania Tekstury (UV)" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 341,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "font-mono text-sky-400",
												children: [config.buildingTextureScale.toFixed(1), "x"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 342,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 340,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: .5,
											max: 4,
											step: .1,
											value: config.buildingTextureScale,
											onChange: (e) => onUpdateConfig({ buildingTextureScale: parseFloat(e.target.value) }),
											className: "w-full accent-sky-400"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 346,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 339,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "bg-[#050b14] border border-slate-800 rounded-lg px-3 py-2",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "flex justify-between text-xs text-slate-300 mb-1",
											children: [/* @__PURE__ */ _jsxDEV("span", { children: "Krycie Tekstury (Hologram / PBR)" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 364,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "font-mono text-amber-300",
												children: [Math.round(config.buildingTextureOpacity * 100), "%"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 365,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 363,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: .25,
											max: 1,
											step: .03,
											value: config.buildingTextureOpacity,
											onChange: (e) => onUpdateConfig({ buildingTextureOpacity: parseFloat(e.target.value) }),
											className: "w-full accent-amber-400"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 369,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 362,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "bg-[#050b14] border border-slate-800 rounded-lg px-3 py-2",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "flex justify-between text-xs text-slate-300 mb-1",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "flex items-center gap-1",
												children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 388,
													columnNumber: 23
												}, this), "Rozstrzelenie Kondygnacji BIM"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 387,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "font-mono text-indigo-300",
												children: [Math.round(config.explodedView * 100), "%"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 391,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 386,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: 0,
											max: 1,
											step: .05,
											value: config.explodedView,
											onChange: (e) => onUpdateConfig({ explodedView: parseFloat(e.target.value) }),
											className: "w-full accent-indigo-400"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 395,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 385,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex flex-wrap items-center gap-1.5 justify-end",
										children: [/* @__PURE__ */ _jsxDEV(Camera, { className: "w-3.5 h-3.5 text-slate-400 mr-0.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 412,
											columnNumber: 19
										}, this), [
											{
												id: "tabletop_close",
												label: "Zbliżenie"
											},
											{
												id: "overview",
												label: "Cała Sala"
											},
											{
												id: "window_parallax",
												label: "Paralaksa"
											}
										].map((cam) => /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => onUpdateConfig({ cameraPreset: cam.id }),
											className: `px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${config.cameraPreset === cam.id ? "bg-sky-500 text-slate-950 border-sky-400" : "bg-[#050b14] text-slate-300 border-slate-800 hover:text-white"}`,
											children: cam.label
										}, cam.id, false, {
											fileName: _jsxFileName,
											lineNumber: 420,
											columnNumber: 21
										}, this))]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 411,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 337,
								columnNumber: 15
							}, this),
							selectedSubModel && /* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 440,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-300",
										children: [
											"Wybrana bryła:",
											" ",
											/* @__PURE__ */ _jsxDEV("strong", {
												className: "text-amber-300",
												children: selectedSubModel.customName
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 443,
												columnNumber: 23
											}, this),
											" ",
											"— przypisz indywidualną teksturę tylko temu budynkowi:"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 441,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 439,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex flex-wrap items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleAssignTextureToSelectedSubModel(undefined),
										className: `px-2 py-1 text-[11px] rounded border ${!selectedSubModel.texturePreset ? "bg-sky-500/20 border-sky-400 text-sky-300 font-bold" : "bg-slate-900 border-slate-700 text-slate-400"}`,
										children: "Użyj globalnej"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 450,
										columnNumber: 21
									}, this), TEXTURE_PRESET_OPTIONS.slice(0, 5).map((opt) => /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleAssignTextureToSelectedSubModel(opt.id),
										className: `px-2 py-1 text-[11px] rounded border ${selectedSubModel.texturePreset === opt.id ? "bg-amber-400 text-slate-950 border-amber-300 font-bold" : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"}`,
										children: opt.shortLabel
									}, opt.id, false, {
										fileName: _jsxFileName,
										lineNumber: 464,
										columnNumber: 23
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 449,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 438,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 262,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 261,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 156,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 149,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUFmLENBQ0Usd0JBQUMsVUFBRCxFQUFVLFdBQVUsNkJBQThCOzs7O21CQUNsRCx3QkFBQyxRQUFEO1VBQU0sV0FBVTtvQkFBaEI7V0FBaUM7V0FDaEI7V0FDZix3QkFBQyxVQUFEO1lBQVEsV0FBVTtzQkFDZixpQkFBaUI7V0FDWjs7Ozs7V0FBRTtXQUFJO1VBRVY7Ozs7O2lCQUNIOzs7OztrQkFDTCx3QkFBQyxPQUFEO1NBQUssV0FBVTttQkFBZixDQUNFLHdCQUFDLFVBQUQ7VUFDRSxNQUFLO1VBQ0wsZUFDRSxzQ0FBc0MsU0FBUztVQUVqRCxXQUFXLHdDQUNULENBQUMsaUJBQWlCLGdCQUNkLHdEQUNBO29CQUVQO1NBRU87Ozs7bUJBQ1AsdUJBQXVCLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLFFBQ3ZDLHdCQUFDLFVBQUQ7VUFFRSxNQUFLO1VBQ0wsZUFDRSxzQ0FBc0MsSUFBSSxFQUFFO1VBRTlDLFdBQVcsd0NBQ1QsaUJBQWlCLGtCQUFrQixJQUFJLEtBQ25DLDJEQUNBO29CQUdMLElBQUk7U0FDQyxHQVpELElBQUk7Ozs7Z0JBWUgsQ0FDVCxDQUNFOzs7OztnQkFDRjs7Ozs7O01BRUo7Ozs7OztJQUNGOzs7OztHQUVKOzs7Ozs7Q0FDRjs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJGdWxsU2NyZWVuTW9kZWxWaWV3ZXJNb2RhbC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBDYW1lcmEsXG4gIEV4dGVybmFsTGluayxcbiAgRXllLFxuICBFeWVPZmYsXG4gIEltYWdlUGx1cyxcbiAgTGF5ZXJzLFxuICBNYXhpbWl6ZSxcbiAgTWluaW1pemUsXG4gIFBhaW50YnJ1c2gsXG4gIFNwYXJrbGVzLFxuICBYLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHtcbiAgQVJTdHVkaW9Db25maWcsXG4gIEJ1aWxkaW5nQ2x1c3RlcklkLFxuICBCdWlsZGluZ1RleHR1cmVQcmVzZXRPcHRpb24sXG4gIENhbWVyYVByZXNldElkLFxufSBmcm9tICcuLi90eXBlcy9hclN0dWRpbyc7XG5pbXBvcnQgeyBIb2xvQXJjaFNjZW5lIH0gZnJvbSAnLi4vdGhyZWUvSG9sb0FyY2hTY2VuZSc7XG5cbmludGVyZmFjZSBGdWxsU2NyZWVuTW9kZWxWaWV3ZXJNb2RhbFByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBpc1N0YW5kYWxvbmVXaW5kb3c/OiBib29sZWFuO1xuICBjb25maWc6IEFSU3R1ZGlvQ29uZmlnO1xuICBvblVwZGF0ZUNvbmZpZzogKHBhcnRpYWw6IFBhcnRpYWw8QVJTdHVkaW9Db25maWc+KSA9PiB2b2lkO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgVEVYVFVSRV9QUkVTRVRfT1BUSU9OUzoge1xuICBpZDogQnVpbGRpbmdUZXh0dXJlUHJlc2V0T3B0aW9uO1xuICBzaG9ydExhYmVsOiBzdHJpbmc7XG4gIGRlc2M6IHN0cmluZztcbiAgc3dhdGNoQ2xhc3M6IHN0cmluZztcbn1bXSA9IFtcbiAge1xuICAgIGlkOiAnSG9sb2dyYW0gRGlhZ3JpZCAoRG9tecWbbG55IEN5amFuLVrFgm90byknLFxuICAgIHNob3J0TGFiZWw6ICdIb2xvZ3JhbSBEaWFncmlkJyxcbiAgICBkZXNjOiAnUMOzxYJwcnplenJvY3p5c3RhIHNpYXRrYSBjeWphbm93by16xYJvdGEgeiBlZmVrdGVtIEZyZXNuZWxhJyxcbiAgICBzd2F0Y2hDbGFzczogJ2Zyb20tY3lhbi00MDAgdG8tYW1iZXItNDAwJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnRmFzYWRhIFN6a2xhbmEgUmVmbGVrc3lqbmEgKFNreXNjcmFwZXIgQ3VydGFpbiBXYWxsKScsXG4gICAgc2hvcnRMYWJlbDogJ0Zhc2FkYSBTemtsYW5hIFBCUicsXG4gICAgZGVzYzogJ1JlZmxla3N5am5hIMWbY2lhbmEga3VydHlub3dhIHogcG9kxZt3aWV0bG9ueW1pIGtvbmR5Z25hY2phbWkgYml1cm93eW1pJyxcbiAgICBzd2F0Y2hDbGFzczogJ2Zyb20tc2t5LTUwMCB0by1ibHVlLTkwMCcsXG4gIH0sXG4gIHtcbiAgICBpZDogJ1R5dGFuIGkgU3pjem90a293YW5lIFrFgm90byAoUGFyYW1ldHJpYyBNZXRhbCknLFxuICAgIHNob3J0TGFiZWw6ICdUeXRhbiArIFrFgm90bycsXG4gICAgZGVzYzogJ0Fub2Rvd2FuZSBwxYJ5dHkgdHl0YW5vd2UgeiBwYXJhbWV0cnljem7EhSBrcmF0b3duaWPEhSB6ZSBzemN6b3Rrb3dhbmVnbyB6xYJvdGEnLFxuICAgIHN3YXRjaENsYXNzOiAnZnJvbS1hbWJlci00MDAgdG8tc2xhdGUtNjAwJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnQmV0b24gQXJjaGl0ZWt0b25pY3pueSBpIFJkemXFhCDFmndpZXRsbnkgKEJydXRhbGlzdCBCSU0pJyxcbiAgICBzaG9ydExhYmVsOiAnQmV0b24gQXJjaGl0ZWt0b25pY3pueScsXG4gICAgZGVzYzogJ1DFgnl0eSBiZXRvbnUgc3phbHVua293ZWdvIHogcG9kxZt3aWV0bG9ueW1pIGR5bGF0YWNqYW1pIHJkemVuaWEgQklNJyxcbiAgICBzd2F0Y2hDbGFzczogJ2Zyb20tc2xhdGUtNDAwIHRvLWFtYmVyLTUwMCcsXG4gIH0sXG4gIHtcbiAgICBpZDogJ0thcmJvbm93by1TemFmaXJvd3kgS29tcG96eXQgKEN5YmVyLUZhY2FkZSknLFxuICAgIHNob3J0TGFiZWw6ICdLb21wb3p5dCBLYXJib24tU3phZmlyJyxcbiAgICBkZXNjOiAnV8WCw7Nrbm8gd8SZZ2xvd2UgbyBzcGxvY2llIGRpYWdvbmFsbnltIHogbmVvbm93eW1pIMW8ecWCYW1pIHN6YWZpcm93eW1pJyxcbiAgICBzd2F0Y2hDbGFzczogJ2Zyb20taW5kaWdvLTUwMCB0by1jeWFuLTQwMCcsXG4gIH0sXG4gIHtcbiAgICBpZDogJ1fFgmFzbmEgVGVrc3R1cmEgeiBQbGlrdSAoQ3VzdG9tIFVWIE1hcCknLFxuICAgIHNob3J0TGFiZWw6ICdXxYJhc25hIFRla3N0dXJhIFVWJyxcbiAgICBkZXNjOiAnTmHFgsOzxbwgZG93b2xuxIUgd8WCYXNuxIUgdGVrc3R1csSZIHogcGxpa3UgLkpQRyAvIC5QTkcgbmEgYnJ5xYJ5IGJ1ZHlua8OzdycsXG4gICAgc3dhdGNoQ2xhc3M6ICdmcm9tLWVtZXJhbGQtNDAwIHRvLXRlYWwtNjAwJyxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBGdWxsU2NyZWVuTW9kZWxWaWV3ZXJNb2RhbDogUmVhY3QuRkM8XG4gIEZ1bGxTY3JlZW5Nb2RlbFZpZXdlck1vZGFsUHJvcHNcbj4gPSAoe1xuICBpc09wZW4sXG4gIGlzU3RhbmRhbG9uZVdpbmRvdyA9IGZhbHNlLFxuICBjb25maWcsXG4gIG9uVXBkYXRlQ29uZmlnLFxuICBvbkNsb3NlLFxufSkgPT4ge1xuICBjb25zdCBbaHVkSGlkZGVuLCBzZXRIdWRIaWRkZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNOYXRpdmVGdWxsc2NyZWVuLCBzZXRJc05hdGl2ZUZ1bGxzY3JlZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Gc0NoYW5nZSA9ICgpID0+IHtcbiAgICAgIHNldElzTmF0aXZlRnVsbHNjcmVlbihCb29sZWFuKGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50KSk7XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgb25Gc0NoYW5nZSk7XG4gICAgcmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBvbkZzQ2hhbmdlKTtcbiAgfSwgW10pO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYW5kbGVUb2dnbGVOYXRpdmVGdWxsc2NyZWVuID0gYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIWRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50KSB7XG4gICAgICAgIGF3YWl0IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBpZiBicm93c2VyIGJsb2NrcyByZXF1ZXN0RnVsbHNjcmVlblxuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDdXN0b21UZXh0dXJlVXBsb2FkID0gKFxuICAgIGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+XG4gICkgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgIGlmICghZmlsZSkgcmV0dXJuO1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcmVhZGVyLnJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgIGN1c3RvbUJ1aWxkaW5nVGV4dHVyZVVybDogcmVhZGVyLnJlc3VsdCxcbiAgICAgICAgICBidWlsZGluZ1RleHR1cmVQcmVzZXQ6ICdXxYJhc25hIFRla3N0dXJhIHogUGxpa3UgKEN1c3RvbSBVViBNYXApJyxcbiAgICAgICAgICBidWlsZGluZ1RleHR1cmVPcGFjaXR5OiBNYXRoLm1heCgwLjksIGNvbmZpZy5idWlsZGluZ1RleHR1cmVPcGFjaXR5KSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgfTtcblxuICBjb25zdCBzZWxlY3RlZFN1Yk1vZGVsID0gY29uZmlnLnNlbGVjdGVkU3ViTW9kZWxJZFxuICAgID8gY29uZmlnLnN1Yk1vZGVsT3ZlcnJpZGVzW2NvbmZpZy5zZWxlY3RlZFN1Yk1vZGVsSWRdXG4gICAgOiBudWxsO1xuXG4gIGNvbnN0IGhhbmRsZUFzc2lnblRleHR1cmVUb1NlbGVjdGVkU3ViTW9kZWwgPSAoXG4gICAgcHJlc2V0OiBCdWlsZGluZ1RleHR1cmVQcmVzZXRPcHRpb24gfCB1bmRlZmluZWRcbiAgKSA9PiB7XG4gICAgaWYgKCFjb25maWcuc2VsZWN0ZWRTdWJNb2RlbElkIHx8ICFzZWxlY3RlZFN1Yk1vZGVsKSByZXR1cm47XG4gICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgc3ViTW9kZWxPdmVycmlkZXM6IHtcbiAgICAgICAgLi4uY29uZmlnLnN1Yk1vZGVsT3ZlcnJpZGVzLFxuICAgICAgICBbY29uZmlnLnNlbGVjdGVkU3ViTW9kZWxJZF06IHtcbiAgICAgICAgICAuLi5zZWxlY3RlZFN1Yk1vZGVsLFxuICAgICAgICAgIHRleHR1cmVQcmVzZXQ6IHByZXNldCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3Qgc3RhbmRhbG9uZVVybCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59JHt3aW5kb3cubG9jYXRpb24ucGF0aG5hbWV9P2Z1bGxzY3JlZW5Nb2RlbD0xYDtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCB3LXNjcmVlbiBoLXNjcmVlbiBiZy1bIzA0MDgxMV0gdGV4dC1zbGF0ZS0xMDAgb3ZlcmZsb3ctaGlkZGVuIHNlbGVjdC1ub25lXCJcbiAgICAgIHJvbGU9XCJkaWFsb2dcIlxuICAgICAgYXJpYS1tb2RhbD1cInRydWVcIlxuICAgICAgYXJpYS1sYWJlbD1cIldpenVhbGl6YWNqYSBtb2RlbHUgM0QgbmEgcGXFgm55bSBla3JhbmllIGkgc3R1ZGlvIHRla3N0dXJcIlxuICAgID5cbiAgICAgIHsvKiBEZWRpY2F0ZWQgRnVsbC1CbGVlZCAxMDB2dyB4IDEwMHZoIDNEIFZpZXdwb3J0ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgaC1mdWxsXCI+XG4gICAgICAgIDxIb2xvQXJjaFNjZW5lXG4gICAgICAgICAgY29uZmlnPXtjb25maWd9XG4gICAgICAgICAgb25TZWxlY3RCdWlsZGluZz17KGlkOiBCdWlsZGluZ0NsdXN0ZXJJZCB8IG51bGwpID0+XG4gICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7IHNlbGVjdGVkQnVpbGRpbmc6IGlkIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIG9uU2VsZWN0U3ViTW9kZWw9eyhzdWJJZDogc3RyaW5nLCBjbHVzdGVySWQ6IEJ1aWxkaW5nQ2x1c3RlcklkKSA9PlxuICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICBzZWxlY3RlZFN1Yk1vZGVsSWQ6IHN1YklkLFxuICAgICAgICAgICAgICBzZWxlY3RlZEJ1aWxkaW5nOiBjbHVzdGVySWQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogVG9wIEZsb2F0aW5nIEJhcjogVGl0bGUsIE5hdGl2ZSBGdWxsc2NyZWVuLCBPcGVuIGluIFNlcGFyYXRlIEJyb3dzZXIgV2luZG93LCBIaWRlIFVJLCBDbG9zZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNCBsZWZ0LTYgcmlnaHQtNiB6LTIwIGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtYXV0byBiZy1bIzA4MTEyMF0vOTUgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBweC00IHB5LTIuNSBzaGFkb3ctMnhsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMi41IGgtMi41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgUGXFgm5vZWtyYW5vd2EgV2l6dWFsaXphY2phIE1vZGVsdSAzRCAmIFN0dWRpbyBUZWtzdHVyIFBCUlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7aXNTdGFuZGFsb25lV2luZG93ICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHRleHQtWzEwcHhdIGZvbnQtbW9ubyBiZy1lbWVyYWxkLTUwMC8yMCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNDAgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgICAgICBPc29ibmUgT2tubyAoTGl2ZSBTeW5jKVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIEFrdHl3bmEgdGVrc3R1cmE6eycgJ31cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNreS0zMDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAge2NvbmZpZy5idWlsZGluZ1RleHR1cmVQcmVzZXR9XG4gICAgICAgICAgICAgICAgPC9zcGFuPnsnICd9XG4gICAgICAgICAgICAgICAgwrcgU2thbGEgVVY6IHtjb25maWcuYnVpbGRpbmdUZXh0dXJlU2NhbGUudG9GaXhlZCgxKX14IMK3IEtyeWNpZTp7JyAnfVxuICAgICAgICAgICAgICAgIHtNYXRoLnJvdW5kKGNvbmZpZy5idWlsZGluZ1RleHR1cmVPcGFjaXR5ICogMTAwKX0lXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLWF1dG8gZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRIdWRIaWRkZW4oKHByZXYpID0+ICFwcmV2KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1bIzA4MTEyMF0vOTUgaG92ZXI6YmctWyMxMDIwM2FdIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3cteGxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aHVkSGlkZGVuID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICBQb2thxbwgUGFuZWwgVGVrc3R1clxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8RXllT2ZmIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2xhdGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIEN6eXN0eSBFa3JhbiAzRFxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRvZ2dsZU5hdGl2ZUZ1bGxzY3JlZW59XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctWyMwODExMjBdLzk1IGhvdmVyOmJnLVsjMTAyMDNhXSB0ZXh0LXNreS0zMDAgYm9yZGVyIGJvcmRlci1za3ktNTAwLzQwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3cteGxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXNOYXRpdmVGdWxsc2NyZWVuID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8TWluaW1pemUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgV3lqZMW6IHogUGXFgm5lZ28gRWtyYW51IChFU0MpXG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxNYXhpbWl6ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICBQZcWCbnkgRWtyYW4gTW9uaXRvcmEgKEYxMSlcbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7IWlzU3RhbmRhbG9uZVdpbmRvdyAmJiAoXG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgaHJlZj17c3RhbmRhbG9uZVVybH1cbiAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiT3R3w7NyeiB3aXp1YWxpemFjasSZIDNEIHcgY2HFgmtvd2ljaWUgb3NvYm55bSBva25pZSAvIGthcmNpZSBwcnplZ2zEhWRhcmtpIHogc3luY2hyb25pemFjasSFIG5hIMW8eXdvXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtYm9sZCBiZy1pbmRpZ28tNTAwIGhvdmVyOmJnLWluZGlnby00MDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy14bFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RXh0ZXJuYWxMaW5rIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICBPdHfDs3J6IHcgT3NvYm55bSBPa25pZSDihpdcbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgeyFpc1N0YW5kYWxvbmVXaW5kb3cgJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtYm9sZCBiZy1yb3NlLTUwMC8yMCBob3ZlcjpiZy1yb3NlLTUwMC8zNSB0ZXh0LXJvc2UtMjAwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy14bFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICBQb3dyw7N0IGRvIFN0dWRpYVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBCb3R0b20gRmxvYXRpbmcgVGV4dHVyZSAmIE1hdGVyaWFsIEFwcGxpY2F0aW9uIFN0dWRpbyBEb2NrICovfVxuICAgICAgICB7IWh1ZEhpZGRlbiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tNSBsZWZ0LTYgcmlnaHQtNiB6LTIwIHBvaW50ZXItZXZlbnRzLW5vbmUgZmxleCBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1hdXRvIHctZnVsbCBtYXgtdy01eGwgYmctWyMwODExMjBdLzk1IGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtNCBzaGFkb3ctMnhsIHNwYWNlLXktMy41XCI+XG4gICAgICAgICAgICAgIHsvKiBSb3cgMTogVGV4dHVyZSBQcmVzZXRzIFN3YXRjaCBCYXIgKyBDdXN0b20gVGV4dHVyZSBGaWxlIFVwbG9hZCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFBhaW50YnJ1c2ggY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBOYWvFgmFkYW5pZSBUZWtzdHVyIGkgTWF0ZXJpYcWCw7N3IEZhc2Fkb3d5Y2ggUEJSIG5hIE1vZGVsIDNEXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtYm9sZCBiZy1lbWVyYWxkLTUwMC8yMCBob3ZlcjpiZy1lbWVyYWxkLTUwMC8zMCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNDAgcm91bmRlZC1sZyBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEltYWdlUGx1cyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgV2dyYWogV8WCYXNuxIUgVGVrc3R1csSZICguSlBHIC8gLlBORylcbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUN1c3RvbVRleHR1cmVVcGxvYWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtMyBsZzpncmlkLWNvbHMtNiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAge1RFWFRVUkVfUFJFU0VUX09QVElPTlMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPVxuICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5idWlsZGluZ1RleHR1cmVQcmVzZXQgPT09IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdUZXh0dXJlUHJlc2V0OiBpdGVtLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nVGV4dHVyZU9wYWNpdHk6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmlkID09PVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0hvbG9ncmFtIERpYWdyaWQgKERvbXnFm2xueSBDeWphbi1axYJvdG8pJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IDAuODRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBNYXRoLm1heCgwLjkyLCBjb25maWcuYnVpbGRpbmdUZXh0dXJlT3BhY2l0eSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT17aXRlbS5kZXNjfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS05NTAvNjAgYm9yZGVyLXNreS00MDAgc2hhZG93LWxnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMDUwYjE0XSBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy01IGgtNSByb3VuZGVkLW1kIGJnLWdyYWRpZW50LXRvLWJyICR7aXRlbS5zd2F0Y2hDbGFzc30gYm9yZGVyIGJvcmRlci13aGl0ZS8yMCBzaHJpbmstMGB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpc1NlbGVjdGVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHRleHQtWzlweF0gZm9udC1tb25vIGZvbnQtYm9sZCBiZy1za3ktNDAwIHRleHQtc2xhdGUtOTUwIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEFLVFlXTkFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDAgbGVhZGluZy10aWdodCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnNob3J0TGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGxpbmUtY2xhbXAtMSBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5kZXNjfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBSb3cgMjogVVYgVGlsaW5nIFNjYWxlLCBNYXRlcmlhbCBPcGFjaXR5LCBFeHBsb2RlZCBWaWV3ICYgQ2FtZXJhIEFuZ2xlcyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy00IGdhcC0zIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC85MCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICB7LyogVVYgVGlsaW5nIFNjYWxlICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNTBiMTRdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMyBweS0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Ta2FsYSBNYXBvd2FuaWEgVGVrc3R1cnkgKFVWKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb25maWcuYnVpbGRpbmdUZXh0dXJlU2NhbGUudG9GaXhlZCgxKX14XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MC41fVxuICAgICAgICAgICAgICAgICAgICBtYXg9ezQuMH1cbiAgICAgICAgICAgICAgICAgICAgc3RlcD17MC4xfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLmJ1aWxkaW5nVGV4dHVyZVNjYWxlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdUZXh0dXJlU2NhbGU6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1za3ktNDAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogTWF0ZXJpYWwgT3BhY2l0eSAvIFNvbGlkIFBCUiB2cyBIb2xvZ3JhbSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMDUwYjE0XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHB4LTMgcHktMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+S3J5Y2llIFRla3N0dXJ5IChIb2xvZ3JhbSAvIFBCUik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWFtYmVyLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtNYXRoLnJvdW5kKGNvbmZpZy5idWlsZGluZ1RleHR1cmVPcGFjaXR5ICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MC4yNX1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXsxLjB9XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9ezAuMDN9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcuYnVpbGRpbmdUZXh0dXJlT3BhY2l0eX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nVGV4dHVyZU9wYWNpdHk6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1hbWJlci00MDBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBFeHBsb2RlZCBWaWV3IEJJTSBJbnNwZWN0aW9uICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNTBiMTRdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMyBweS0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBSb3pzdHJ6ZWxlbmllIEtvbmR5Z25hY2ppIEJJTVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWluZGlnby0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChjb25maWcuZXhwbG9kZWRWaWV3ICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MC4wfVxuICAgICAgICAgICAgICAgICAgICBtYXg9ezEuMH1cbiAgICAgICAgICAgICAgICAgICAgc3RlcD17MC4wNX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5leHBsb2RlZFZpZXd9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHBsb2RlZFZpZXc6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1pbmRpZ28tNDAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogQ2FtZXJhIFByZXNldHMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICAgICAgPENhbWVyYSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTQwMCBtci0wLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgeyhcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICd0YWJsZXRvcF9jbG9zZScsIGxhYmVsOiAnWmJsacW8ZW5pZScgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnb3ZlcnZpZXcnLCBsYWJlbDogJ0NhxYJhIFNhbGEnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3dpbmRvd19wYXJhbGxheCcsIGxhYmVsOiAnUGFyYWxha3NhJyB9LFxuICAgICAgICAgICAgICAgICAgICBdIGFzIHsgaWQ6IENhbWVyYVByZXNldElkOyBsYWJlbDogc3RyaW5nIH1bXVxuICAgICAgICAgICAgICAgICAgKS5tYXAoKGNhbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtjYW0uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25VcGRhdGVDb25maWcoeyBjYW1lcmFQcmVzZXQ6IGNhbS5pZCB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMS41IHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmNhbWVyYVByZXNldCA9PT0gY2FtLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAgdGV4dC1zbGF0ZS05NTAgYm9yZGVyLXNreS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMDUwYjE0XSB0ZXh0LXNsYXRlLTMwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y2FtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogT3B0aW9uYWwgUGVyLUJ1aWxkaW5nIFRleHR1cmUgT3ZlcnJpZGUgd2hlbiBhIHN1Yi1tb2RlbCBpcyBjbGlja2VkICovfVxuICAgICAgICAgICAgICB7c2VsZWN0ZWRTdWJNb2RlbCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgV3licmFuYSBicnnFgmE6eycgJ31cbiAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRTdWJNb2RlbC5jdXN0b21OYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Ryb25nPnsnICd9XG4gICAgICAgICAgICAgICAgICAgICAg4oCUIHByenlwaXN6IGluZHl3aWR1YWxuxIUgdGVrc3R1csSZIHR5bGtvIHRlbXUgYnVkeW5rb3dpOlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBc3NpZ25UZXh0dXJlVG9TZWxlY3RlZFN1Yk1vZGVsKHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMiBweS0xIHRleHQtWzExcHhdIHJvdW5kZWQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAhc2VsZWN0ZWRTdWJNb2RlbC50ZXh0dXJlUHJlc2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAvMjAgYm9yZGVyLXNreS00MDAgdGV4dC1za3ktMzAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBVxbx5aiBnbG9iYWxuZWpcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIHtURVhUVVJFX1BSRVNFVF9PUFRJT05TLnNsaWNlKDAsIDUpLm1hcCgob3B0KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtvcHQuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUFzc2lnblRleHR1cmVUb1NlbGVjdGVkU3ViTW9kZWwob3B0LmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMiBweS0xIHRleHQtWzExcHhdIHJvdW5kZWQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU3ViTW9kZWwudGV4dHVyZVByZXNldCA9PT0gb3B0LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNDAwIHRleHQtc2xhdGUtOTUwIGJvcmRlci1hbWJlci0zMDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0LnNob3J0TGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==