const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch/node_modules/.vite/deps/react.js?v=50682de0";
import { Boxes, Building2, Camera, ChevronDown, ChevronUp, Compass, Download, FolderOpen, Grid, ImagePlus, Layers, Maximize2, Moon, Radar, Sparkles, Sun } from "/apps/holoarch/node_modules/.vite/deps/lucide-react.js?v=50682de0";
var _jsxFileName = "/app/applet/src/components/BottomControlDock.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/holoarch/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=50682de0";
export const BottomControlDock = ({ config, onUpdateConfig, onOpenWorkbench, onAssembleUnifiedModel, onExportJson, onImportJsonFile }) => {
	const [collapsed, setCollapsed] = useState(false);
	const [activeDockTab, setActiveDockTab] = useState("buildings_floors");
	const handleHorizontalReferenceUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				onUpdateConfig({
					customReferenceImageUrl: reader.result,
					showReferenceBillboardIn3D: true
				});
			}
		};
		reader.readAsDataURL(file);
	};
	const cameraPresets = [
		{
			id: "overview",
			label: "Widok Główny"
		},
		{
			id: "tabletop_close",
			label: "Zbliżenie BIM"
		},
		{
			id: "window_parallax",
			label: "Paralaksa & Okna"
		},
		{
			id: "floor_lidar",
			label: "Siatka Blat + Podłoga"
		}
	];
	const handleTablePresetChange = (preset) => {
		if (preset === "Kompaktowy (2.6m × 1.3m)") {
			onUpdateConfig({
				tableSizePreset: preset,
				tableWidthMeters: 2.6,
				tableDepthMeters: 1.3
			});
		} else if (preset === "Standardowy Konferencyjny (3.9m × 1.95m)") {
			onUpdateConfig({
				tableSizePreset: preset,
				tableWidthMeters: 3.9,
				tableDepthMeters: 1.95
			});
		} else if (preset === "Monumentalny Sztabowy (5.4m × 2.6m)") {
			onUpdateConfig({
				tableSizePreset: preset,
				tableWidthMeters: 5.4,
				tableDepthMeters: 2.6
			});
		} else {
			onUpdateConfig({ tableSizePreset: preset });
		}
	};
	const handleRoomPresetChange = (preset) => {
		if (preset === "Kameralny Gabinet (9m × 8m)") {
			onUpdateConfig({
				roomSizePreset: preset,
				roomWidthMeters: 9,
				roomDepthMeters: 8
			});
		} else if (preset === "Sala Konferencyjna (14m × 12m)") {
			onUpdateConfig({
				roomSizePreset: preset,
				roomWidthMeters: 14,
				roomDepthMeters: 12
			});
		} else if (preset === "Aula Architektoniczna (22m × 18m)") {
			onUpdateConfig({
				roomSizePreset: preset,
				roomWidthMeters: 22,
				roomDepthMeters: 18
			});
		} else {
			onUpdateConfig({ roomSizePreset: preset });
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		style: {
			bottom: "20px",
			left: "50%",
			transform: "translateX(-50%)",
			maxWidth: "min(960px, 95vw)"
		},
		className: "fixed z-20 w-full pointer-events-auto",
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "flex justify-center mb-1.5",
			children: /* @__PURE__ */ _jsxDEV("button", {
				type: "button",
				onClick: () => setCollapsed((prev) => !prev),
				className: "px-3.5 py-1 text-xs font-medium text-slate-200 bg-[#091220] border border-slate-700/80 rounded-lg hover:border-sky-400/60 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-lg",
				children: collapsed ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(ChevronUp, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 152,
					columnNumber: 15
				}, this), "Pokaż panel sterowania AR"] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 151,
					columnNumber: 13
				}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(ChevronDown, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 157,
					columnNumber: 15
				}, this), "Ukryj panel (Widok pełnoekranowy)"] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 156,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 145,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 144,
			columnNumber: 7
		}, this), !collapsed && /* @__PURE__ */ _jsxDEV("div", {
			className: "bg-[#091220]/95 border border-slate-800 rounded-xl shadow-2xl p-4 space-y-3.5",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-800/90 pb-3",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center gap-1 p-1 bg-[#050b14] rounded-lg border border-slate-800/80",
						children: [
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => setActiveDockTab("buildings_floors"),
								className: `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${activeDockTab === "buildings_floors" ? "bg-sky-500 text-slate-950" : "text-slate-300 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV(Building2, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 180,
									columnNumber: 17
								}, this), "Grupy 2–5 Budynków & Piętra"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => setActiveDockTab("table_room_size"),
								className: `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${activeDockTab === "table_room_size" ? "bg-sky-500 text-slate-950" : "text-slate-300 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV(Maximize2, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 192,
									columnNumber: 17
								}, this), "Wielkość Blatu i Pomieszczenia"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 183,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => setActiveDockTab("planes_occlusion"),
								className: `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${activeDockTab === "planes_occlusion" ? "bg-sky-500 text-slate-950" : "text-slate-300 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV(Grid, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 204,
									columnNumber: 17
								}, this), "Czujniki Głębi & Okluzja"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 195,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => setActiveDockTab("parallax_vfx"),
								className: `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${activeDockTab === "parallax_vfx" ? "bg-sky-500 text-slate-950" : "text-slate-300 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV(Compass, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 216,
									columnNumber: 17
								}, this), "Paralaksa & Cząsteczki Za Oknem"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 170,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ _jsxDEV(Camera, { className: "w-3.5 h-3.5 text-slate-400 mr-0.5 hidden sm:inline" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 15
						}, this), cameraPresets.map((cp) => /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => onUpdateConfig({ cameraPreset: cp.id }),
							className: `px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${config.cameraPreset === cp.id ? "bg-[#132847] border-sky-400 text-sky-300" : "bg-[#0d1829] border-slate-800 text-slate-300 hover:text-white"}`,
							children: cp.label
						}, cp.id, false, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 17
						}, this))]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 222,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 11
				}, this),
				activeDockTab === "buildings_floors" && /* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 md:grid-cols-4 gap-3 items-center",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-slate-300 mb-1.5",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Budynki w grupie (2–5)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 248,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-sky-400",
										children: [
											config.buildingsPerGroup,
											" (",
											config.buildingsPerGroup * 3,
											" ",
											"łącznie)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 249,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 247,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-4 gap-1",
									children: [
										2,
										3,
										4,
										5
									].map((num) => /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateConfig({ buildingsPerGroup: num }),
										className: `py-1 text-xs font-mono font-semibold rounded transition-colors ${config.buildingsPerGroup === num ? "bg-sky-500 text-slate-950" : "bg-[#0d1829] text-slate-300 hover:text-white"}`,
										children: [num, " bud."]
									}, num, true, {
										fileName: _jsxFileName,
										lineNumber: 256,
										columnNumber: 23
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 254,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Liczba kondygnacji" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 277,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-amber-300",
										children: [
											config.buildingFloorCount,
											" pięter (~",
											Math.round(config.buildingFloorCount * 4.2),
											"m)"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 278,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 276,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 20,
									max: 140,
									step: 2,
									value: config.buildingFloorCount,
									onChange: (e) => onUpdateConfig({ buildingFloorCount: parseInt(e.target.value, 10) }),
									className: "w-full accent-amber-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 283,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 275,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-[11px] text-slate-400 mb-1",
								children: "Rozmieszczenie 3D (Poza Jedną Linią)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 300,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: config.buildingLayout,
								onChange: (e) => onUpdateConfig({ buildingLayout: e.target.value }),
								className: "w-full bg-[#060c17] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Metropolia Centralna (Zdj. 2 · Global Network)",
										children: "Metropolia Centralna (Zdj. 2 · Global Network)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 312,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Łuk Amfiteatralny (Półkole 3D)",
										children: "Łuk Amfiteatralny (Półkole 3D)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 315,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Trójkąt Centralny (Układ Delta)",
										children: "Trójkąt Centralny (Układ Delta)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 318,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Układ Diagonalny (Kaskadowy)",
										children: "Układ Diagonalny (Kaskadowy)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Rozrzut Urbanistyczny (Wielopłaszczyznowy)",
										children: "Rozrzut Urbanistyczny 3D"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 324,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Linia Klasyczna (Szeregowo)",
										children: "Linia Klasyczna (W jednej linii)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 327,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 303,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-[11px] text-slate-400 mb-1",
								children: "Układ i Proporcje Modeli (w tym 9:16)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 335,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: config.modelOrientation916,
								onChange: (e) => onUpdateConfig({ modelOrientation916: e.target.value }),
								className: "w-full bg-[#060c17] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Układ Poziomy 9:16 (Horyzontalne Kompleksy)",
										children: "Układ Poziomy 9:16 (Horyzontalny)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 348,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Hybrydowy 9:16 (Poziome Skrzydła + Wieże)",
										children: "Hybrydowy 9:16 (Skrzydła + Wieże)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 351,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Pionowe Wieżowce (Klasyczne)",
										children: "Pionowe Wieżowce (Klasyczne)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 354,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 334,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 244,
						columnNumber: 15
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 md:grid-cols-4 gap-3 items-center pt-1",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-1.5",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Głębia Rozrzutu 3D (Oś Z)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 366,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-sky-400",
										children: [Math.round(config.layoutDepthScatter * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 367,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 365,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1.5,
									step: .05,
									value: config.layoutDepthScatter,
									onChange: (e) => onUpdateConfig({ layoutDepthScatter: parseFloat(e.target.value) }),
									className: "w-full accent-sky-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 371,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 364,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-1.5",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between text-xs text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Ruch Wahadłowy" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 389,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1.5",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono tabular-nums text-amber-300",
											children: config.pendulumSpeed === 0 ? "STOP (0%)" : `${Math.round(config.pendulumSpeed * 100)}%`
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 391,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => onUpdateConfig({ pendulumSpeed: config.pendulumSpeed > 0 ? 0 : .15 }),
											className: "px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-sky-300 rounded border border-slate-700",
											children: config.pendulumSpeed > 0 ? "Stop" : "15%"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 396,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 390,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 388,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .02,
									value: config.pendulumSpeed,
									onChange: (e) => onUpdateConfig({ pendulumSpeed: parseFloat(e.target.value) }),
									className: "w-full accent-amber-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 409,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 387,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-1.5",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 428,
											columnNumber: 23
										}, this), "Rozstrzelenie BIM"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 427,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-sky-400",
										children: [Math.round(config.explodedView * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 431,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 426,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .02,
									value: config.explodedView,
									onChange: (e) => onUpdateConfig({ explodedView: parseFloat(e.target.value) }),
									className: "w-full accent-sky-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 435,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 425,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("select", {
								value: config.hologramStyle,
								onChange: (e) => onUpdateConfig({ hologramStyle: e.target.value }),
								"aria-label": "Styl shadera hologramu",
								className: "bg-[#060c17] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Diagrid Exoskeleton + Rdzeń BIM",
										children: "Shader: Diagrid + Złoty Rdzeń"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 461,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Wolumetryczna Siatka Cyjanowa",
										children: "Shader: Siatka CAD Cyjan"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 464,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Złoto-Błękitna Matryca Solarna",
										children: "Shader: Matryca Solarna"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 467,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 451,
								columnNumber: 17
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 362,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 243,
					columnNumber: 13
				}, this),
				activeDockTab === "table_room_size" && /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-3.5 items-center",
					children: [
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
							className: "block text-[11px] text-slate-400 mb-1",
							children: "Wariant Wielkości Blatu"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 480,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("select", {
							value: config.tableSizePreset,
							onChange: (e) => handleTablePresetChange(e.target.value),
							className: "w-full bg-[#060c17] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
							children: [
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Kompaktowy (2.6m × 1.3m)",
									children: "Kompaktowy (2.6m × 1.3m)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 492,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Standardowy Konferencyjny (3.9m × 1.95m)",
									children: "Standardowy (3.9m × 1.95m)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 495,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Monumentalny Sztabowy (5.4m × 2.6m)",
									children: "Monumentalny (5.4m × 2.6m)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 498,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Niestandardowy wymiar blatu",
									children: "Niestandardowy wymiar blatu"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 501,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 483,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 479,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-xs text-slate-300 mb-1",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Wymiar Blatu (Szer. × Gł.)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 510,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono tabular-nums text-sky-400",
									children: [
										config.tableWidthMeters.toFixed(1),
										"m ×",
										" ",
										config.tableDepthMeters.toFixed(1),
										"m"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 511,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 509,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: 2.2,
								max: 5.8,
								step: .1,
								value: config.tableWidthMeters,
								onChange: (e) => {
									const w = parseFloat(e.target.value);
									onUpdateConfig({
										tableSizePreset: "Niestandardowy wymiar blatu",
										tableWidthMeters: w,
										tableDepthMeters: Number((w * .5).toFixed(2))
									});
								},
								className: "w-full accent-sky-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 516,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 508,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
							className: "block text-[11px] text-slate-400 mb-1",
							children: "Wariant Wielkości Pomieszczenia"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 536,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("select", {
							value: config.roomSizePreset,
							onChange: (e) => handleRoomPresetChange(e.target.value),
							className: "w-full bg-[#060c17] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
							children: [
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Kameralny Gabinet (9m × 8m)",
									children: "Kameralny Gabinet (9m × 8m)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 548,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Sala Konferencyjna (14m × 12m)",
									children: "Sala Konferencyjna (14m × 12m)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 551,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Aula Architektoniczna (22m × 18m)",
									children: "Aula Architektoniczna (22m × 18m)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 554,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Niestandardowy wymiar sali",
									children: "Niestandardowy wymiar sali"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 557,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 539,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 535,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-xs text-slate-300 mb-1",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Wymiar Sali (Szer. × Gł.)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 566,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono tabular-nums text-amber-300",
									children: [
										config.roomWidthMeters.toFixed(0),
										"m ×",
										" ",
										config.roomDepthMeters.toFixed(0),
										"m"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 567,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 565,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: 8,
								max: 24,
								step: 1,
								value: config.roomWidthMeters,
								onChange: (e) => {
									const rw = parseFloat(e.target.value);
									onUpdateConfig({
										roomSizePreset: "Niestandardowy wymiar sali",
										roomWidthMeters: rw,
										roomDepthMeters: Math.round(rw * .85)
									});
								},
								className: "w-full accent-amber-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 572,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 564,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 477,
					columnNumber: 13
				}, this),
				activeDockTab === "planes_occlusion" && /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-3 items-center",
					children: [
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => onUpdateConfig({
								showDepthGrid: true,
								triggerScanPulse: Date.now()
							}),
							className: "px-3.5 py-2 text-xs font-semibold bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/40 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0",
							children: [/* @__PURE__ */ _jsxDEV(Radar, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 605,
								columnNumber: 17
							}, this), "Skanuj Blat i Podłogę (LiDAR)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 595,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => onUpdateConfig({ showDepthGrid: !config.showDepthGrid }),
							className: `px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${config.showDepthGrid ? "bg-[#12253e] border-sky-500/60 text-slate-100" : "bg-[#0c1626] border-slate-800 text-slate-400"}`,
							children: [
								"Siatka Płaszczyzn AR:",
								" ",
								config.showDepthGrid ? "Włączona" : "Ukryta"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 609,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => onUpdateConfig({ showOcclusionObjects: !config.showOcclusionObjects }),
							className: `px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${config.showOcclusionObjects ? "bg-[#12253e] border-amber-400/60 text-slate-100" : "bg-[#0c1626] border-slate-800 text-slate-400"}`,
							children: [
								"Okluzja Foteli (Depth):",
								" ",
								config.showOcclusionObjects ? "Aktywna" : "Wył."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 624,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => onUpdateConfig({ showFloatingHudPanels: !config.showFloatingHudPanels }),
								className: `px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${config.showFloatingHudPanels ? "bg-[#12253e] border-sky-500/60 text-slate-100" : "bg-[#0c1626] border-slate-800 text-slate-400"}`,
								children: ["Ekrany: ", config.showFloatingHudPanels ? "Wł." : "Ukryte"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 642,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: config.hudScreenStyle,
								onChange: (e) => onUpdateConfig({
									hudScreenStyle: e.target.value,
									showFloatingHudPanels: true
								}),
								"aria-label": "Wariant szklanych ekranów 3D",
								className: "flex-1 min-w-0 bg-[#060c17] border border-slate-700 rounded-lg px-2 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Hologramy Global Network (Zdj. 2 · Telemetria & Mapa)",
										children: "Global Network (Zdj. 2 · Telemetria)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 669,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Szklany Panel Interaktywny (Frosted Glass UI)",
										children: "Szklany Panel (Frosted Glass)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 672,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Szklany Ekran Krystaliczny (98% Przezroczystości)",
										children: "Szklany (98% Przezroczystości)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 675,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Hologram Techniczny CAD (Ciemny Cyjan)",
										children: "Hologram CAD (Cyjan)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 678,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 658,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 641,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 594,
					columnNumber: 13
				}, this),
				activeDockTab === "parallax_vfx" && /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-3.5 items-center",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-xs text-slate-300 mb-1",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Głębia Paralaksy 6DoF" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 691,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono tabular-nums text-sky-400",
									children: [Math.round(config.parallaxIntensity * 100), "%"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 692,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 690,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: 0,
								max: 1.5,
								step: .05,
								value: config.parallaxIntensity,
								onChange: (e) => onUpdateConfig({ parallaxIntensity: parseFloat(e.target.value) }),
								className: "w-full accent-sky-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 696,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 689,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("select", {
							value: config.windowParticles,
							onChange: (e) => onUpdateConfig({ windowParticles: e.target.value }),
							"aria-label": "Tryb efektów cząsteczkowych za oknami",
							className: "w-full bg-[#060c17] border border-slate-700 rounded-lg px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
							children: [
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Cząsteczki Atmosferyczne + Ruch Powietrzny",
									children: "Za oknem: Atmosfera + Ruch Powietrzny"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 721,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Złoty Pył Świetlny + Smugi Wolumetryczne",
									children: "Za oknem: Złoty Pył + Smugi Słoneczne"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 724,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("option", {
									value: "Cyber-Deszcz + Strumienie Danych Za Oknem",
									children: "Za oknem: Cyber-Deszcz + Strumienie"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 727,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 711,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-xs text-slate-300 mb-1",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ _jsxDEV(Sun, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 735,
										columnNumber: 21
									}, this), "Dynamika Cząsteczek"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 734,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono tabular-nums text-amber-300",
									children: [Math.round(config.windowParticleDensity * 100), "%"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 738,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 733,
								columnNumber: 17
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
								lineNumber: 742,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 732,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between text-xs text-slate-300 mb-1",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Prędkość Wahadłowa" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 759,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-sky-400",
										children: config.pendulumSpeed === 0 ? "STOP (0%)" : `${Math.round(config.pendulumSpeed * 100)}%`
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 761,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateConfig({ pendulumSpeed: config.pendulumSpeed > 0 ? 0 : .15 }),
										className: "px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-sky-300 rounded border border-slate-700",
										children: config.pendulumSpeed > 0 ? "Min (0%)" : "15%"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 766,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 760,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 758,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .02,
								value: config.pendulumSpeed,
								onChange: (e) => onUpdateConfig({ pendulumSpeed: parseFloat(e.target.value) }),
								className: "w-full accent-sky-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 779,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 757,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 688,
					columnNumber: 13
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-3 items-center pt-2 border-t border-slate-800/80",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-wrap items-center justify-between gap-1.5 bg-[#060c17] border border-slate-800/80 rounded-lg px-2.5 py-2",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								role: "switch",
								"aria-checked": config.enableNightMode,
								onClick: () => {
									const nextNight = !config.enableNightMode;
									onUpdateConfig({
										enableNightMode: nextNight,
										envLightingIntensity: nextNight ? .55 : 1.2
									});
								},
								title: "Włącz Night Mode: automatycznie wygasza oświetlenie otoczenia i zmienia paletę na neonowy elektryczny błękit (#00F0FF) i głęboki fiolet (#7C3AED)",
								className: `px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${config.enableNightMode ? "bg-[#1a103c] border-violet-400/80 text-violet-200 shadow-[0_0_12px_rgba(139,92,246,0.35)]" : "bg-[#0b1526] border-slate-800 text-slate-300 hover:text-white"}`,
								children: [
									/* @__PURE__ */ _jsxDEV(Moon, { className: "w-3.5 h-3.5 text-violet-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 818,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: "Night Mode" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 819,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										className: `px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${config.enableNightMode ? "bg-gradient-to-r from-cyan-400 to-violet-500 text-slate-950" : "bg-slate-800 text-slate-400"}`,
										children: config.enableNightMode ? "NEON WŁ." : "WYŁ."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 820,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 800,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								role: "switch",
								"aria-checked": config.enableAtmosphericFog,
								onClick: () => onUpdateConfig({ enableAtmosphericFog: !config.enableAtmosphericFog }),
								className: `px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${config.enableAtmosphericFog ? "bg-[#12253e] border-sky-400/70 text-sky-300" : "bg-[#0b1526] border-slate-800 text-slate-400 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Mgła" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 847,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: `px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${config.enableAtmosphericFog ? "bg-sky-400 text-slate-950" : "bg-slate-800 text-slate-400"}`,
									children: config.enableAtmosphericFog ? "WŁ." : "WYŁ."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 848,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 832,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 798,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between text-xs text-slate-300 mb-1",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Intensywność Oświetlenia Otoczenia" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 863,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono font-semibold tabular-nums text-amber-300",
									children: [
										config.envLightingIntensity.toFixed(2),
										"x (",
										Math.round(config.envLightingIntensity * 100),
										"%)"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 864,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 862,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: .5,
								max: 2,
								step: .05,
								value: config.envLightingIntensity,
								onChange: (e) => onUpdateConfig({ envLightingIntensity: parseFloat(e.target.value) }),
								"aria-label": "Intensywność Oświetlenia Otoczenia",
								className: "w-full accent-amber-400 cursor-pointer"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 869,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 861,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between gap-2 bg-[#060c17] border border-slate-800/80 rounded-lg px-3 py-2",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								role: "switch",
								"aria-checked": config.enableBuildingShadows,
								onClick: () => onUpdateConfig({ enableBuildingShadows: !config.enableBuildingShadows }),
								className: `px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${config.enableBuildingShadows ? "bg-[#12253e] border-amber-400/70 text-amber-300" : "bg-[#0b1526] border-slate-800 text-slate-400 hover:text-white"}`,
								title: "Włącz lub wyłącz rzucanie cieni (Shadow Mapping) przez budynki na wirtualną podłogę i blat",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Cienie Budynków" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 903,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: `px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${config.enableBuildingShadows ? "bg-amber-400 text-slate-950" : "bg-slate-800 text-slate-400"}`,
									children: config.enableBuildingShadows ? "WŁ." : "WYŁ."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 904,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 887,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: config.shadowMapQuality,
								disabled: !config.enableBuildingShadows,
								onChange: (e) => onUpdateConfig({ shadowMapQuality: e.target.value }),
								"aria-label": "Jakość Shadow Mapy",
								title: "Wybierz rozdzielczość i jakość filtrowania PCF Shadow Mapy",
								className: "flex-1 min-w-0 bg-[#050b14] border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-100 focus:outline-none focus:border-amber-400 disabled:opacity-40",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Niska (512×512 · Mobile Fast)",
										children: "Shadow Map: 512px (Niska)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 927,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Średnia (1024×1024 · Standard AR)",
										children: "Shadow Map: 1024px (Średnia)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 930,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Wysoka (2048×2048 · Crisp PCF)",
										children: "Shadow Map: 2048px (Wysoka PCF)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 933,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "Ultra (4096×4096 · Studio BIM)",
										children: "Shadow Map: 4096px (Ultra BIM)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 936,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 915,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 886,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 797,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800/90 text-xs text-slate-400",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: onAssembleUnifiedModel,
								className: "px-3.5 py-2 text-xs font-bold bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-300 text-slate-950 rounded-lg shadow-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0",
								children: [/* @__PURE__ */ _jsxDEV(Boxes, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 952,
									columnNumber: 17
								}, this), "Utwórz Wspólny Model Przestrzenny (Edycja Sub-Modeli)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 947,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("label", {
								className: "px-3 py-2 text-xs font-semibold bg-[#112038] hover:bg-[#172b4a] text-sky-300 border border-sky-500/40 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
								children: [
									/* @__PURE__ */ _jsxDEV(ImagePlus, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 958,
										columnNumber: 17
									}, this),
									"Wstaw Obraz Referencyjny (Prostokąt Poziomy)",
									/* @__PURE__ */ _jsxDEV("input", {
										type: "file",
										accept: "image/*",
										onChange: handleHorizontalReferenceUpload,
										className: "hidden"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 960,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 957,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => onUpdateConfig({ showReferenceBillboardIn3D: !config.showReferenceBillboardIn3D }),
								className: `px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 ${config.showReferenceBillboardIn3D ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300" : "bg-[#0b1526] border-slate-800 text-slate-400 hover:text-white"}`,
								children: [
									"Ekran Referencyjny 16:9 w 3D:",
									" ",
									config.showReferenceBillboardIn3D ? "Wł." : "Wył."
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 968,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: onExportJson,
								title: "Zapisz pełną konfigurację ARStudioConfig do pliku .json",
								className: "px-3 py-2 text-xs font-semibold bg-[#0f1e36] hover:bg-[#162a4a] text-amber-300 border border-amber-500/40 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
								children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 993,
									columnNumber: 17
								}, this), "Zapisz Projekt (.JSON)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 987,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("label", {
								title: "Wczytaj zapisaną konfigurację ARStudioConfig z pliku .json",
								className: "px-3 py-2 text-xs font-semibold bg-[#0f1e36] hover:bg-[#162a4a] text-slate-200 border border-slate-700 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
								children: [
									/* @__PURE__ */ _jsxDEV(FolderOpen, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1002,
										columnNumber: 17
									}, this),
									"Wczytaj (.JSON)",
									/* @__PURE__ */ _jsxDEV("input", {
										type: "file",
										accept: ".json,application/json",
										onChange: (e) => {
											const file = e.target.files?.[0];
											if (file) {
												onImportJsonFile(file);
												e.target.value = "";
											}
										},
										className: "hidden"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1004,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 998,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 945,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => onOpenWorkbench("prompts"),
						className: "text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1 whitespace-nowrap shrink-0",
						children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1024,
							columnNumber: 15
						}, this), "Otwórz pełny prompt i kod Unity C# →"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1019,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 944,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 166,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 134,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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SUFBSTtZQUNyQixFQUFFLE9BQU8sUUFBUTtXQUNuQjtVQUNGO1VBQ0EsV0FBVTtTQUNYOzs7OztRQUNJOzs7Ozs7TUFDSjs7Ozs7ZUFFTCx3QkFBQyxVQUFEO01BQ0UsTUFBSztNQUNMLGVBQWUsZ0JBQWdCLFNBQVM7TUFDeEMsV0FBVTtnQkFIWixDQUtFLHdCQUFDLFVBQUQsRUFBVSxXQUFVLGNBQWU7Ozs7Z0JBQUMsc0NBRTlCOzs7OzthQUNMOzs7Ozs7R0FDRjs7Ozs7VUFFSjs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiQm90dG9tQ29udHJvbERvY2sudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveGVzLFxuICBCdWlsZGluZzIsXG4gIENhbWVyYSxcbiAgQ2hldnJvbkRvd24sXG4gIENoZXZyb25VcCxcbiAgQ29tcGFzcyxcbiAgRG93bmxvYWQsXG4gIEZvbGRlck9wZW4sXG4gIEdyaWQsXG4gIEltYWdlUGx1cyxcbiAgTGF5ZXJzLFxuICBNYXhpbWl6ZTIsXG4gIE1vb24sXG4gIFJhZGFyLFxuICBTcGFya2xlcyxcbiAgU3VuLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHtcbiAgQVJTdHVkaW9Db25maWcsXG4gIEJ1aWxkaW5nTGF5b3V0T3B0aW9uLFxuICBDYW1lcmFQcmVzZXRJZCxcbiAgSG9sb2dyYW1TdHlsZU9wdGlvbixcbiAgSHVkU2NyZWVuU3R5bGVPcHRpb24sXG4gIE1vZGVsT3JpZW50YXRpb245MTZPcHRpb24sXG4gIFJvb21TaXplUHJlc2V0T3B0aW9uLFxuICBTaGFkb3dNYXBRdWFsaXR5T3B0aW9uLFxuICBUYWJsZVNpemVQcmVzZXRPcHRpb24sXG4gIFdpbmRvd1BhcnRpY2xlc09wdGlvbixcbn0gZnJvbSAnLi4vdHlwZXMvYXJTdHVkaW8nO1xuaW1wb3J0IHsgV29ya2JlbmNoVGFiIH0gZnJvbSAnLi9Qcm9tcHRXb3JrYmVuY2hNb2RhbCc7XG5cbmludGVyZmFjZSBCb3R0b21Db250cm9sRG9ja1Byb3BzIHtcbiAgY29uZmlnOiBBUlN0dWRpb0NvbmZpZztcbiAgb25VcGRhdGVDb25maWc6IChwYXJ0aWFsOiBQYXJ0aWFsPEFSU3R1ZGlvQ29uZmlnPikgPT4gdm9pZDtcbiAgb25PcGVuV29ya2JlbmNoOiAodGFiOiBXb3JrYmVuY2hUYWIpID0+IHZvaWQ7XG4gIG9uQXNzZW1ibGVVbmlmaWVkTW9kZWw6ICgpID0+IHZvaWQ7XG4gIG9uRXhwb3J0SnNvbjogKCkgPT4gdm9pZDtcbiAgb25JbXBvcnRKc29uRmlsZTogKGZpbGU6IEZpbGUpID0+IHZvaWQ7XG59XG5cbnR5cGUgRG9ja1RhYiA9XG4gIHwgJ2J1aWxkaW5nc19mbG9vcnMnXG4gIHwgJ3RhYmxlX3Jvb21fc2l6ZSdcbiAgfCAncGxhbmVzX29jY2x1c2lvbidcbiAgfCAncGFyYWxsYXhfdmZ4JztcblxuZXhwb3J0IGNvbnN0IEJvdHRvbUNvbnRyb2xEb2NrOiBSZWFjdC5GQzxCb3R0b21Db250cm9sRG9ja1Byb3BzPiA9ICh7XG4gIGNvbmZpZyxcbiAgb25VcGRhdGVDb25maWcsXG4gIG9uT3BlbldvcmtiZW5jaCxcbiAgb25Bc3NlbWJsZVVuaWZpZWRNb2RlbCxcbiAgb25FeHBvcnRKc29uLFxuICBvbkltcG9ydEpzb25GaWxlLFxufSkgPT4ge1xuICBjb25zdCBbY29sbGFwc2VkLCBzZXRDb2xsYXBzZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlRG9ja1RhYiwgc2V0QWN0aXZlRG9ja1RhYl0gPVxuICAgIHVzZVN0YXRlPERvY2tUYWI+KCdidWlsZGluZ3NfZmxvb3JzJyk7XG5cbiAgY29uc3QgaGFuZGxlSG9yaXpvbnRhbFJlZmVyZW5jZVVwbG9hZCA9IChcbiAgICBlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PlxuICApID0+IHtcbiAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICBjdXN0b21SZWZlcmVuY2VJbWFnZVVybDogcmVhZGVyLnJlc3VsdCxcbiAgICAgICAgICBzaG93UmVmZXJlbmNlQmlsbGJvYXJkSW4zRDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgfTtcblxuICBjb25zdCBjYW1lcmFQcmVzZXRzOiB7IGlkOiBDYW1lcmFQcmVzZXRJZDsgbGFiZWw6IHN0cmluZyB9W10gPSBbXG4gICAgeyBpZDogJ292ZXJ2aWV3JywgbGFiZWw6ICdXaWRvayBHxYLDs3dueScgfSxcbiAgICB7IGlkOiAndGFibGV0b3BfY2xvc2UnLCBsYWJlbDogJ1pibGnFvGVuaWUgQklNJyB9LFxuICAgIHsgaWQ6ICd3aW5kb3dfcGFyYWxsYXgnLCBsYWJlbDogJ1BhcmFsYWtzYSAmIE9rbmEnIH0sXG4gICAgeyBpZDogJ2Zsb29yX2xpZGFyJywgbGFiZWw6ICdTaWF0a2EgQmxhdCArIFBvZMWCb2dhJyB9LFxuICBdO1xuXG4gIGNvbnN0IGhhbmRsZVRhYmxlUHJlc2V0Q2hhbmdlID0gKHByZXNldDogVGFibGVTaXplUHJlc2V0T3B0aW9uKSA9PiB7XG4gICAgaWYgKHByZXNldCA9PT0gJ0tvbXBha3Rvd3kgKDIuNm0gw5cgMS4zbSknKSB7XG4gICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgIHRhYmxlU2l6ZVByZXNldDogcHJlc2V0LFxuICAgICAgICB0YWJsZVdpZHRoTWV0ZXJzOiAyLjYsXG4gICAgICAgIHRhYmxlRGVwdGhNZXRlcnM6IDEuMyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocHJlc2V0ID09PSAnU3RhbmRhcmRvd3kgS29uZmVyZW5jeWpueSAoMy45bSDDlyAxLjk1bSknKSB7XG4gICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgIHRhYmxlU2l6ZVByZXNldDogcHJlc2V0LFxuICAgICAgICB0YWJsZVdpZHRoTWV0ZXJzOiAzLjksXG4gICAgICAgIHRhYmxlRGVwdGhNZXRlcnM6IDEuOTUsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHByZXNldCA9PT0gJ01vbnVtZW50YWxueSBTenRhYm93eSAoNS40bSDDlyAyLjZtKScpIHtcbiAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgdGFibGVTaXplUHJlc2V0OiBwcmVzZXQsXG4gICAgICAgIHRhYmxlV2lkdGhNZXRlcnM6IDUuNCxcbiAgICAgICAgdGFibGVEZXB0aE1ldGVyczogMi42LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9uVXBkYXRlQ29uZmlnKHsgdGFibGVTaXplUHJlc2V0OiBwcmVzZXQgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJvb21QcmVzZXRDaGFuZ2UgPSAocHJlc2V0OiBSb29tU2l6ZVByZXNldE9wdGlvbikgPT4ge1xuICAgIGlmIChwcmVzZXQgPT09ICdLYW1lcmFsbnkgR2FiaW5ldCAoOW0gw5cgOG0pJykge1xuICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICByb29tU2l6ZVByZXNldDogcHJlc2V0LFxuICAgICAgICByb29tV2lkdGhNZXRlcnM6IDkuMCxcbiAgICAgICAgcm9vbURlcHRoTWV0ZXJzOiA4LjAsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHByZXNldCA9PT0gJ1NhbGEgS29uZmVyZW5jeWpuYSAoMTRtIMOXIDEybSknKSB7XG4gICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgIHJvb21TaXplUHJlc2V0OiBwcmVzZXQsXG4gICAgICAgIHJvb21XaWR0aE1ldGVyczogMTQuMCxcbiAgICAgICAgcm9vbURlcHRoTWV0ZXJzOiAxMi4wLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChwcmVzZXQgPT09ICdBdWxhIEFyY2hpdGVrdG9uaWN6bmEgKDIybSDDlyAxOG0pJykge1xuICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICByb29tU2l6ZVByZXNldDogcHJlc2V0LFxuICAgICAgICByb29tV2lkdGhNZXRlcnM6IDIyLjAsXG4gICAgICAgIHJvb21EZXB0aE1ldGVyczogMTguMCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvblVwZGF0ZUNvbmZpZyh7IHJvb21TaXplUHJlc2V0OiBwcmVzZXQgfSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgYm90dG9tOiAnMjBweCcsXG4gICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcbiAgICAgICAgbWF4V2lkdGg6ICdtaW4oOTYwcHgsIDk1dncpJyxcbiAgICAgIH19XG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCB6LTIwIHctZnVsbCBwb2ludGVyLWV2ZW50cy1hdXRvXCJcbiAgICA+XG4gICAgICB7LyogQ29sbGFwc2UgLyBFeHBhbmQgVG9nZ2xlIEhhbmRsZSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBtYi0xLjVcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENvbGxhcHNlZCgocHJldikgPT4gIXByZXYpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0yMDAgYmctWyMwOTEyMjBdIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzgwIHJvdW5kZWQtbGcgaG92ZXI6Ym9yZGVyLXNreS00MDAvNjAgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCBzaGFkb3ctbGdcIlxuICAgICAgICA+XG4gICAgICAgICAge2NvbGxhcHNlZCA/IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxDaGV2cm9uVXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgUG9rYcW8IHBhbmVsIHN0ZXJvd2FuaWEgQVJcbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8Q2hldnJvbkRvd24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgVWtyeWogcGFuZWwgKFdpZG9rIHBlxYJub2VrcmFub3d5KVxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFVuaWZpZWQgSG9yaXpvbnRhbCBDb250cm9sIERvY2sgKi99XG4gICAgICB7IWNvbGxhcHNlZCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwOTEyMjBdLzk1IGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgc2hhZG93LTJ4bCBwLTQgc3BhY2UteS0zLjVcIj5cbiAgICAgICAgICB7LyogVG9wIFJvdyBpbnNpZGUgRG9jazogU2VjdGlvbiBUYWJzICsgQ2FtZXJhIFByZXNldHMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yLjUgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMC85MCBwYi0zXCI+XG4gICAgICAgICAgICB7LyogQ29udHJvbCBDYXRlZ29yeSBUYWJzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTEgcC0xIGJnLVsjMDUwYjE0XSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVEb2NrVGFiKCdidWlsZGluZ3NfZmxvb3JzJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgICAgYWN0aXZlRG9ja1RhYiA9PT0gJ2J1aWxkaW5nc19mbG9vcnMnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QnVpbGRpbmcyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICBHcnVweSAy4oCTNSBCdWR5bmvDs3cgJiBQacSZdHJhXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlRG9ja1RhYigndGFibGVfcm9vbV9zaXplJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgICAgYWN0aXZlRG9ja1RhYiA9PT0gJ3RhYmxlX3Jvb21fc2l6ZSdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctc2t5LTUwMCB0ZXh0LXNsYXRlLTk1MCdcbiAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxNYXhpbWl6ZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIFdpZWxrb8WbxIcgQmxhdHUgaSBQb21pZXN6Y3plbmlhXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlRG9ja1RhYigncGxhbmVzX29jY2x1c2lvbicpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLW1kIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZURvY2tUYWIgPT09ICdwbGFuZXNfb2NjbHVzaW9uJ1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1za3ktNTAwIHRleHQtc2xhdGUtOTUwJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEdyaWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIEN6dWpuaWtpIEfFgsSZYmkgJiBPa2x1emphXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlRG9ja1RhYigncGFyYWxsYXhfdmZ4Jyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgICAgYWN0aXZlRG9ja1RhYiA9PT0gJ3BhcmFsbGF4X3ZmeCdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctc2t5LTUwMCB0ZXh0LXNsYXRlLTk1MCdcbiAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxDb21wYXNzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICBQYXJhbGFrc2EgJiBDesSFc3RlY3praSBaYSBPa25lbVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQ2FtZXJhIFZpZXdwb2ludCBQcmVzZXRzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxDYW1lcmEgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1zbGF0ZS00MDAgbXItMC41IGhpZGRlbiBzbTppbmxpbmVcIiAvPlxuICAgICAgICAgICAgICB7Y2FtZXJhUHJlc2V0cy5tYXAoKGNwKSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtjcC5pZH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25VcGRhdGVDb25maWcoeyBjYW1lcmFQcmVzZXQ6IGNwLmlkIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEuNSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5jYW1lcmFQcmVzZXQgPT09IGNwLmlkXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctWyMxMzI4NDddIGJvcmRlci1za3ktNDAwIHRleHQtc2t5LTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1bIzBkMTgyOV0gYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2NwLmxhYmVsfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFRhYiAxOiBCdWlsZGluZyBHcm91cHMgKDItNSksIE5vbi1MaW5lYXIgM0QgTGF5b3V0LCA5OjE2IEhvcml6b250YWwgT3JpZW50YXRpb24gJiBGbG9vciBDb3VudCAqL31cbiAgICAgICAgICB7YWN0aXZlRG9ja1RhYiA9PT0gJ2J1aWxkaW5nc19mbG9vcnMnICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtNCBnYXAtMyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICB7LyogMS4gTnVtYmVyIG9mIEJ1aWxkaW5ncyBwZXIgR3JvdXAgKDIgdG8gNSkgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgcm91bmRlZC1sZyBweC0zIHB5LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+QnVkeW5raSB3IGdydXBpZSAoMuKAkzUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb25maWcuYnVpbGRpbmdzUGVyR3JvdXB9ICh7Y29uZmlnLmJ1aWxkaW5nc1Blckdyb3VwICogM317JyAnfVxuICAgICAgICAgICAgICAgICAgICAgIMWCxIVjem5pZSlcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTQgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgeyhbMiwgMywgNCwgNV0gYXMgY29uc3QpLm1hcCgobnVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtudW19XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHsgYnVpbGRpbmdzUGVyR3JvdXA6IG51bSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHktMSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LXNlbWlib2xkIHJvdW5kZWQgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmJ1aWxkaW5nc1Blckdyb3VwID09PSBudW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1za3ktNTAwIHRleHQtc2xhdGUtOTUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMGQxODI5XSB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge251bX0gYnVkLlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIDIuIE51bWJlciBvZiBGbG9vcnMgLyBTdG9yZXlzICgyMCB0byAxNDApICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIHJvdW5kZWQtbGcgcHgtMyBweS0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5MaWN6YmEga29uZHlnbmFjamk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLmJ1aWxkaW5nRmxvb3JDb3VudH0gcGnEmXRlciAoflxuICAgICAgICAgICAgICAgICAgICAgIHtNYXRoLnJvdW5kKGNvbmZpZy5idWlsZGluZ0Zsb29yQ291bnQgKiA0LjIpfW0pXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MjB9XG4gICAgICAgICAgICAgICAgICAgIG1heD17MTQwfVxuICAgICAgICAgICAgICAgICAgICBzdGVwPXsyfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLmJ1aWxkaW5nRmxvb3JDb3VudH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nRmxvb3JDb3VudDogcGFyc2VJbnQoZS50YXJnZXQudmFsdWUsIDEwKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtYW1iZXItNDAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogMy4gTm9uLUxpbmVhciAzRCBTcGF0aWFsIFBsYWNlbWVudCBvbiBUYWJsZXRvcCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgUm96bWllc3pjemVuaWUgM0QgKFBvemEgSmVkbsSFIExpbmnEhSlcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcuYnVpbGRpbmdMYXlvdXR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZGluZ0xheW91dDogZS50YXJnZXQudmFsdWUgYXMgQnVpbGRpbmdMYXlvdXRPcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTWV0cm9wb2xpYSBDZW50cmFsbmEgKFpkai4gMiDCtyBHbG9iYWwgTmV0d29yaylcIj5cbiAgICAgICAgICAgICAgICAgICAgICBNZXRyb3BvbGlhIENlbnRyYWxuYSAoWmRqLiAyIMK3IEdsb2JhbCBOZXR3b3JrKVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIsWBdWsgQW1maXRlYXRyYWxueSAoUMOzxYJrb2xlIDNEKVwiPlxuICAgICAgICAgICAgICAgICAgICAgIMWBdWsgQW1maXRlYXRyYWxueSAoUMOzxYJrb2xlIDNEKVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlRyw7Nqa8SFdCBDZW50cmFsbnkgKFVrxYJhZCBEZWx0YSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICBUcsOzamvEhXQgQ2VudHJhbG55IChVa8WCYWQgRGVsdGEpXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVWvFgmFkIERpYWdvbmFsbnkgKEthc2thZG93eSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICBVa8WCYWQgRGlhZ29uYWxueSAoS2Fza2Fkb3d5KVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJvenJ6dXQgVXJiYW5pc3R5Y3pueSAoV2llbG9wxYJhc3pjenl6bm93eSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICBSb3pyenV0IFVyYmFuaXN0eWN6bnkgM0RcbiAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMaW5pYSBLbGFzeWN6bmEgKFN6ZXJlZ293bylcIj5cbiAgICAgICAgICAgICAgICAgICAgICBMaW5pYSBLbGFzeWN6bmEgKFcgamVkbmVqIGxpbmlpKVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIDQuIEhvcml6b250YWwgOToxNiBNb2RlbCBQcm9wb3J0aW9ucyBTZWxlY3RvciAqL31cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgVWvFgmFkIGkgUHJvcG9yY2plIE1vZGVsaSAodyB0eW0gOToxNilcbiAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcubW9kZWxPcmllbnRhdGlvbjkxNn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsT3JpZW50YXRpb245MTY6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlIGFzIE1vZGVsT3JpZW50YXRpb245MTZPcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVWvFgmFkIFBvemlvbXkgOToxNiAoSG9yeXpvbnRhbG5lIEtvbXBsZWtzeSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICBVa8WCYWQgUG96aW9teSA5OjE2IChIb3J5em9udGFsbnkpXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSHlicnlkb3d5IDk6MTYgKFBvemlvbWUgU2tyenlkxYJhICsgV2llxbxlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgIEh5YnJ5ZG93eSA5OjE2IChTa3J6eWTFgmEgKyBXaWXFvGUpXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUGlvbm93ZSBXaWXFvG93Y2UgKEtsYXN5Y3puZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICBQaW9ub3dlIFdpZcW8b3djZSAoS2xhc3ljem5lKVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU2Vjb25kIFJvdyBpbiBUYWIgMTogRGVwdGggU2NhdHRlciwgUGVuZHVsdW0gU3BlZWQgUmVndWxhdGlvbiwgRXhwbG9kZWQgVmlldyAmIFNoYWRlciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy00IGdhcC0zIGl0ZW1zLWNlbnRlciBwdC0xXCI+XG4gICAgICAgICAgICAgICAgey8qIERlcHRoIFogU2NhdHRlciBTbGlkZXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgcm91bmRlZC1sZyBweC0zIHB5LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+R8WCxJliaWEgUm96cnp1dHUgM0QgKE/FmyBaKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LXNreS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChjb25maWcubGF5b3V0RGVwdGhTY2F0dGVyICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MH1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXsxLjV9XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9ezAuMDV9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcubGF5b3V0RGVwdGhTY2F0dGVyfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGF5b3V0RGVwdGhTY2F0dGVyOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFBlbmR1bHVtIE1vdGlvbiBTcGVlZCBSZWd1bGF0aW9uICh3aXRoIDAlIE1pbi9TdG9wKSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCByb3VuZGVkLWxnIHB4LTMgcHktMS41XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UnVjaCBXYWhhZMWCb3d5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtYW1iZXItMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnBlbmR1bHVtU3BlZWQgPT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnU1RPUCAoMCUpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IGAke01hdGgucm91bmQoY29uZmlnLnBlbmR1bHVtU3BlZWQgKiAxMDApfSVgfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwZW5kdWx1bVNwZWVkOiBjb25maWcucGVuZHVsdW1TcGVlZCA+IDAgPyAwLjAgOiAwLjE1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSB0ZXh0LVsxMHB4XSBmb250LW1vbm8gYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNreS0zMDAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2NvbmZpZy5wZW5kdWx1bVNwZWVkID4gMCA/ICdTdG9wJyA6ICcxNSUnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MH1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXsxfVxuICAgICAgICAgICAgICAgICAgICBzdGVwPXswLjAyfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLnBlbmR1bHVtU3BlZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5kdWx1bVNwZWVkOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtYW1iZXItNDAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogRXhwbG9kZWQgQklNIFZpZXcgU2xpZGVyICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIHJvdW5kZWQtbGcgcHgtMyBweS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIFJvenN0cnplbGVuaWUgQklNXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LXNreS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChjb25maWcuZXhwbG9kZWRWaWV3ICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MH1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXsxfVxuICAgICAgICAgICAgICAgICAgICBzdGVwPXswLjAyfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLmV4cGxvZGVkVmlld31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGxvZGVkVmlldzogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXNreS00MDBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBIb2xvZ3JhbSBTaGFkZXIgU3R5bGUgKi99XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5ob2xvZ3JhbVN0eWxlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgaG9sb2dyYW1TdHlsZTogZS50YXJnZXQudmFsdWUgYXMgSG9sb2dyYW1TdHlsZU9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTdHlsIHNoYWRlcmEgaG9sb2dyYW11XCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkRpYWdyaWQgRXhvc2tlbGV0b24gKyBSZHplxYQgQklNXCI+XG4gICAgICAgICAgICAgICAgICAgIFNoYWRlcjogRGlhZ3JpZCArIFrFgm90eSBSZHplxYRcbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIldvbHVtZXRyeWN6bmEgU2lhdGthIEN5amFub3dhXCI+XG4gICAgICAgICAgICAgICAgICAgIFNoYWRlcjogU2lhdGthIENBRCBDeWphblxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiWsWCb3RvLULFgsSZa2l0bmEgTWF0cnljYSBTb2xhcm5hXCI+XG4gICAgICAgICAgICAgICAgICAgIFNoYWRlcjogTWF0cnljYSBTb2xhcm5hXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIFRhYiAyOiBUYWJsZXRvcCAmIFJvb20gU2l6ZSBWYXJpYW50cyBhbmQgU2xpZGVycyAqL31cbiAgICAgICAgICB7YWN0aXZlRG9ja1RhYiA9PT0gJ3RhYmxlX3Jvb21fc2l6ZScgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy00IGdhcC0zLjUgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgIHsvKiAxLiBUYWJsZXRvcCBTaXplIFZhcmlhbnQgU2VsZWN0b3IgKi99XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIFdhcmlhbnQgV2llbGtvxZtjaSBCbGF0dVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy50YWJsZVNpemVQcmVzZXR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVRhYmxlUHJlc2V0Q2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlIGFzIFRhYmxlU2l6ZVByZXNldE9wdGlvblxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJLb21wYWt0b3d5ICgyLjZtIMOXIDEuM20pXCI+XG4gICAgICAgICAgICAgICAgICAgIEtvbXBha3Rvd3kgKDIuNm0gw5cgMS4zbSlcbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlN0YW5kYXJkb3d5IEtvbmZlcmVuY3lqbnkgKDMuOW0gw5cgMS45NW0pXCI+XG4gICAgICAgICAgICAgICAgICAgIFN0YW5kYXJkb3d5ICgzLjltIMOXIDEuOTVtKVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTW9udW1lbnRhbG55IFN6dGFib3d5ICg1LjRtIMOXIDIuNm0pXCI+XG4gICAgICAgICAgICAgICAgICAgIE1vbnVtZW50YWxueSAoNS40bSDDlyAyLjZtKVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTmllc3RhbmRhcmRvd3kgd3ltaWFyIGJsYXR1XCI+XG4gICAgICAgICAgICAgICAgICAgIE5pZXN0YW5kYXJkb3d5IHd5bWlhciBibGF0dVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiAyLiBDdXN0b20gVGFibGV0b3AgRGltZW5zaW9ucyBTbGlkZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIHJvdW5kZWQtbGcgcHgtMyBweS0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPld5bWlhciBCbGF0dSAoU3plci4gw5cgR8WCLik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnRhYmxlV2lkdGhNZXRlcnMudG9GaXhlZCgxKX1tIMOXeycgJ31cbiAgICAgICAgICAgICAgICAgICAge2NvbmZpZy50YWJsZURlcHRoTWV0ZXJzLnRvRml4ZWQoMSl9bVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgIG1pbj17Mi4yfVxuICAgICAgICAgICAgICAgICAgbWF4PXs1Ljh9XG4gICAgICAgICAgICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLnRhYmxlV2lkdGhNZXRlcnN9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdyA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGVTaXplUHJlc2V0OiAnTmllc3RhbmRhcmRvd3kgd3ltaWFyIGJsYXR1JyxcbiAgICAgICAgICAgICAgICAgICAgICB0YWJsZVdpZHRoTWV0ZXJzOiB3LFxuICAgICAgICAgICAgICAgICAgICAgIHRhYmxlRGVwdGhNZXRlcnM6IE51bWJlcigodyAqIDAuNSkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIDMuIFJvb20gU2l6ZSBWYXJpYW50IFNlbGVjdG9yICovfVxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBXYXJpYW50IFdpZWxrb8WbY2kgUG9taWVzemN6ZW5pYVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5yb29tU2l6ZVByZXNldH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUm9vbVByZXNldENoYW5nZShcbiAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSBhcyBSb29tU2l6ZVByZXNldE9wdGlvblxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJLYW1lcmFsbnkgR2FiaW5ldCAoOW0gw5cgOG0pXCI+XG4gICAgICAgICAgICAgICAgICAgIEthbWVyYWxueSBHYWJpbmV0ICg5bSDDlyA4bSlcbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlNhbGEgS29uZmVyZW5jeWpuYSAoMTRtIMOXIDEybSlcIj5cbiAgICAgICAgICAgICAgICAgICAgU2FsYSBLb25mZXJlbmN5am5hICgxNG0gw5cgMTJtKVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQXVsYSBBcmNoaXRla3Rvbmljem5hICgyMm0gw5cgMThtKVwiPlxuICAgICAgICAgICAgICAgICAgICBBdWxhIEFyY2hpdGVrdG9uaWN6bmEgKDIybSDDlyAxOG0pXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJOaWVzdGFuZGFyZG93eSB3eW1pYXIgc2FsaVwiPlxuICAgICAgICAgICAgICAgICAgICBOaWVzdGFuZGFyZG93eSB3eW1pYXIgc2FsaVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiA0LiBDdXN0b20gUm9vbSBEaW1lbnNpb25zIFNsaWRlciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgcm91bmRlZC1sZyBweC0zIHB5LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3ltaWFyIFNhbGkgKFN6ZXIuIMOXIEfFgi4pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LWFtYmVyLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnJvb21XaWR0aE1ldGVycy50b0ZpeGVkKDApfW0gw5d7JyAnfVxuICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnJvb21EZXB0aE1ldGVycy50b0ZpeGVkKDApfW1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICBtaW49ezh9XG4gICAgICAgICAgICAgICAgICBtYXg9ezI0fVxuICAgICAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcucm9vbVdpZHRoTWV0ZXJzfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJ3ID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICByb29tU2l6ZVByZXNldDogJ05pZXN0YW5kYXJkb3d5IHd5bWlhciBzYWxpJyxcbiAgICAgICAgICAgICAgICAgICAgICByb29tV2lkdGhNZXRlcnM6IHJ3LFxuICAgICAgICAgICAgICAgICAgICAgIHJvb21EZXB0aE1ldGVyczogTWF0aC5yb3VuZChydyAqIDAuODUpLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIFRhYiAzOiBEZXB0aCBTZW5zb3JzLCBTdXJmYWNlIFBsYW5lcyAmIE9jY2x1c2lvbiAqL31cbiAgICAgICAgICB7YWN0aXZlRG9ja1RhYiA9PT0gJ3BsYW5lc19vY2NsdXNpb24nICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtNCBnYXAtMyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgIHNob3dEZXB0aEdyaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctc2t5LTUwMC8xNSBob3ZlcjpiZy1za3ktNTAwLzI1IHRleHQtc2t5LTMwMCBib3JkZXIgYm9yZGVyLXNreS01MDAvNDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8UmFkYXIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIFNrYW51aiBCbGF0IGkgUG9kxYJvZ8SZIChMaURBUilcbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7IHNob3dEZXB0aEdyaWQ6ICFjb25maWcuc2hvd0RlcHRoR3JpZCB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICBjb25maWcuc2hvd0RlcHRoR3JpZFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1bIzEyMjUzZV0gYm9yZGVyLXNreS01MDAvNjAgdGV4dC1zbGF0ZS0xMDAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMGMxNjI2XSBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgU2lhdGthIFDFgmFzemN6eXpuIEFSOnsnICd9XG4gICAgICAgICAgICAgICAge2NvbmZpZy5zaG93RGVwdGhHcmlkID8gJ1fFgsSFY3pvbmEnIDogJ1Vrcnl0YSd9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICBzaG93T2NjbHVzaW9uT2JqZWN0czogIWNvbmZpZy5zaG93T2NjbHVzaW9uT2JqZWN0cyxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgIGNvbmZpZy5zaG93T2NjbHVzaW9uT2JqZWN0c1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1bIzEyMjUzZV0gYm9yZGVyLWFtYmVyLTQwMC82MCB0ZXh0LXNsYXRlLTEwMCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctWyMwYzE2MjZdIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBPa2x1emphIEZvdGVsaSAoRGVwdGgpOnsnICd9XG4gICAgICAgICAgICAgICAge2NvbmZpZy5zaG93T2NjbHVzaW9uT2JqZWN0cyA/ICdBa3R5d25hJyA6ICdXecWCLid9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgIHNob3dGbG9hdGluZ0h1ZFBhbmVsczogIWNvbmZpZy5zaG93RmxvYXRpbmdIdWRQYW5lbHMsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zaG93RmxvYXRpbmdIdWRQYW5lbHNcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1bIzEyMjUzZV0gYm9yZGVyLXNreS01MDAvNjAgdGV4dC1zbGF0ZS0xMDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctWyMwYzE2MjZdIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBFa3Jhbnk6IHtjb25maWcuc2hvd0Zsb2F0aW5nSHVkUGFuZWxzID8gJ1fFgi4nIDogJ1Vrcnl0ZSd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLmh1ZFNjcmVlblN0eWxlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgaHVkU2NyZWVuU3R5bGU6IGUudGFyZ2V0LnZhbHVlIGFzIEh1ZFNjcmVlblN0eWxlT3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgIHNob3dGbG9hdGluZ0h1ZFBhbmVsczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJXYXJpYW50IHN6a2xhbnljaCBla3JhbsOzdyAzRFwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMCBiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0yIHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIb2xvZ3JhbXkgR2xvYmFsIE5ldHdvcmsgKFpkai4gMiDCtyBUZWxlbWV0cmlhICYgTWFwYSlcIj5cbiAgICAgICAgICAgICAgICAgICAgR2xvYmFsIE5ldHdvcmsgKFpkai4gMiDCtyBUZWxlbWV0cmlhKVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiU3prbGFueSBQYW5lbCBJbnRlcmFrdHl3bnkgKEZyb3N0ZWQgR2xhc3MgVUkpXCI+XG4gICAgICAgICAgICAgICAgICAgIFN6a2xhbnkgUGFuZWwgKEZyb3N0ZWQgR2xhc3MpXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTemtsYW55IEVrcmFuIEtyeXN0YWxpY3pueSAoOTglIFByemV6cm9jenlzdG/Fm2NpKVwiPlxuICAgICAgICAgICAgICAgICAgICBTemtsYW55ICg5OCUgUHJ6ZXpyb2N6eXN0b8WbY2kpXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJIb2xvZ3JhbSBUZWNobmljem55IENBRCAoQ2llbW55IEN5amFuKVwiPlxuICAgICAgICAgICAgICAgICAgICBIb2xvZ3JhbSBDQUQgKEN5amFuKVxuICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBUYWIgNDogUGFyYWxsYXggNkRvRiAmIFdpbmRvdyBQYXJ0aWNsZXMgVkZYICovfVxuICAgICAgICAgIHthY3RpdmVEb2NrVGFiID09PSAncGFyYWxsYXhfdmZ4JyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTQgZ2FwLTMuNSBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgcm91bmRlZC1sZyBweC0zIHB5LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+R8WCxJliaWEgUGFyYWxha3N5IDZEb0Y8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChjb25maWcucGFyYWxsYXhJbnRlbnNpdHkgKiAxMDApfSVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICBtaW49ezB9XG4gICAgICAgICAgICAgICAgICBtYXg9ezEuNX1cbiAgICAgICAgICAgICAgICAgIHN0ZXA9ezAuMDV9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLnBhcmFsbGF4SW50ZW5zaXR5fVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJbnRlbnNpdHk6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1za3ktNDAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy53aW5kb3dQYXJ0aWNsZXN9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3dQYXJ0aWNsZXM6IGUudGFyZ2V0LnZhbHVlIGFzIFdpbmRvd1BhcnRpY2xlc09wdGlvbixcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJUcnliIGVmZWt0w7N3IGN6xIVzdGVjemtvd3ljaCB6YSBva25hbWlcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0zIHB5LTIuNSB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQ3rEhXN0ZWN6a2kgQXRtb3NmZXJ5Y3puZSArIFJ1Y2ggUG93aWV0cnpueVwiPlxuICAgICAgICAgICAgICAgICAgWmEgb2tuZW06IEF0bW9zZmVyYSArIFJ1Y2ggUG93aWV0cnpueVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJaxYJvdHkgUHnFgiDFmndpZXRsbnkgKyBTbXVnaSBXb2x1bWV0cnljem5lXCI+XG4gICAgICAgICAgICAgICAgICBaYSBva25lbTogWsWCb3R5IFB5xYIgKyBTbXVnaSBTxYJvbmVjem5lXG4gICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkN5YmVyLURlc3pjeiArIFN0cnVtaWVuaWUgRGFueWNoIFphIE9rbmVtXCI+XG4gICAgICAgICAgICAgICAgICBaYSBva25lbTogQ3liZXItRGVzemN6ICsgU3RydW1pZW5pZVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCByb3VuZGVkLWxnIHB4LTMgcHktMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8U3VuIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgRHluYW1pa2EgQ3rEhXN0ZWN6ZWtcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge01hdGgucm91bmQoY29uZmlnLndpbmRvd1BhcnRpY2xlRGVuc2l0eSAqIDEwMCl9JVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgIG1pbj17MC4yfVxuICAgICAgICAgICAgICAgICAgbWF4PXsyLjB9XG4gICAgICAgICAgICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLndpbmRvd1BhcnRpY2xlRGVuc2l0eX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd1BhcnRpY2xlRGVuc2l0eTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgcm91bmRlZC1sZyBweC0zIHB5LTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlByxJlka2/Fm8SHIFdhaGFkxYJvd2E8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LXNreS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnBlbmR1bHVtU3BlZWQgPT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ1NUT1AgKDAlKSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogYCR7TWF0aC5yb3VuZChjb25maWcucGVuZHVsdW1TcGVlZCAqIDEwMCl9JWB9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBlbmR1bHVtU3BlZWQ6IGNvbmZpZy5wZW5kdWx1bVNwZWVkID4gMCA/IDAuMCA6IDAuMTUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHRleHQtWzEwcHhdIGZvbnQtbW9ubyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2t5LTMwMCByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb25maWcucGVuZHVsdW1TcGVlZCA+IDAgPyAnTWluICgwJSknIDogJzE1JSd9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgbWluPXswfVxuICAgICAgICAgICAgICAgICAgbWF4PXsxLjB9XG4gICAgICAgICAgICAgICAgICBzdGVwPXswLjAyfVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5wZW5kdWx1bVNwZWVkfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgcGVuZHVsdW1TcGVlZDogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXNreS00MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBVc3Rhd2llbmlhIMWacm9kb3dpc2thOiBOaWdodCBNb2RlIChOZW9uIEFSKSwgTWfFgmEgQXRtb3NmZXJ5Y3puYSAoX0ZvZ0RlbnNpdHkpLCBJbnRlbnN5d25vxZvEhyBPxZt3aWV0bGVuaWEgJiBTaGFkb3cgTWFwcGluZyBCdWR5bmvDs3cgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC0zIGl0ZW1zLWNlbnRlciBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMS41IGJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCByb3VuZGVkLWxnIHB4LTIuNSBweS0yXCI+XG4gICAgICAgICAgICAgIHsvKiBUb2dnbGUgMTogTmlnaHQgTW9kZSAoTmVvbiBFbGVjdHJpYyBCbHVlICYgRGVlcCBWaW9sZXQgKyBBdXRvIERpbSBBbWJpZW50IExpZ2h0KSAqL31cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJzd2l0Y2hcIlxuICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17Y29uZmlnLmVuYWJsZU5pZ2h0TW9kZX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBuZXh0TmlnaHQgPSAhY29uZmlnLmVuYWJsZU5pZ2h0TW9kZTtcbiAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlTmlnaHRNb2RlOiBuZXh0TmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIGVudkxpZ2h0aW5nSW50ZW5zaXR5OiBuZXh0TmlnaHQgPyAwLjU1IDogMS4yLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlfFgsSFY3ogTmlnaHQgTW9kZTogYXV0b21hdHljem5pZSB3eWdhc3phIG/Fm3dpZXRsZW5pZSBvdG9jemVuaWEgaSB6bWllbmlhIHBhbGV0xJkgbmEgbmVvbm93eSBlbGVrdHJ5Y3pueSBixYLEmWtpdCAoIzAwRjBGRikgaSBnxYLEmWJva2kgZmlvbGV0ICgjN0MzQUVEKVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgIGNvbmZpZy5lbmFibGVOaWdodE1vZGVcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctWyMxYTEwM2NdIGJvcmRlci12aW9sZXQtNDAwLzgwIHRleHQtdmlvbGV0LTIwMCBzaGFkb3ctWzBfMF8xMnB4X3JnYmEoMTM5LDkyLDI0NiwwLjM1KV0nXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMGIxNTI2XSBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TW9vbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXZpb2xldC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPk5pZ2h0IE1vZGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTEuNSBweS0wLjUgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCByb3VuZGVkICR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5lbmFibGVOaWdodE1vZGVcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi00MDAgdG8tdmlvbGV0LTUwMCB0ZXh0LXNsYXRlLTk1MCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Y29uZmlnLmVuYWJsZU5pZ2h0TW9kZSA/ICdORU9OIFfFgS4nIDogJ1dZxYEuJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIHsvKiBUb2dnbGUgMjogQXRtb3NwaGVyaWMgRm9nIChfRm9nRGVuc2l0eSkgKi99XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICByb2xlPVwic3dpdGNoXCJcbiAgICAgICAgICAgICAgICBhcmlhLWNoZWNrZWQ9e2NvbmZpZy5lbmFibGVBdG1vc3BoZXJpY0ZvZ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVBdG1vc3BoZXJpY0ZvZzogIWNvbmZpZy5lbmFibGVBdG1vc3BoZXJpY0ZvZyxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICBjb25maWcuZW5hYmxlQXRtb3NwaGVyaWNGb2dcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctWyMxMjI1M2VdIGJvcmRlci1za3ktNDAwLzcwIHRleHQtc2t5LTMwMCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctWyMwYjE1MjZdIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPk1nxYJhPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0xLjUgcHktMC41IHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgcm91bmRlZCAke1xuICAgICAgICAgICAgICAgICAgICBjb25maWcuZW5hYmxlQXRtb3NwaGVyaWNGb2dcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1za3ktNDAwIHRleHQtc2xhdGUtOTUwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtjb25maWcuZW5hYmxlQXRtb3NwaGVyaWNGb2cgPyAnV8WBLicgOiAnV1nFgS4nfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNsaWRlcjogSW50ZW5zeXdub8WbxIcgT8Wbd2lldGxlbmlhIE90b2N6ZW5pYSAoMC41IC0gMi4wKSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIHJvdW5kZWQtbGcgcHgtMyBweS0yXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPkludGVuc3l3bm/Fm8SHIE/Fm3dpZXRsZW5pYSBPdG9jemVuaWE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgdGFidWxhci1udW1zIHRleHQtYW1iZXItMzAwXCI+XG4gICAgICAgICAgICAgICAgICB7Y29uZmlnLmVudkxpZ2h0aW5nSW50ZW5zaXR5LnRvRml4ZWQoMil9eCAoXG4gICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChjb25maWcuZW52TGlnaHRpbmdJbnRlbnNpdHkgKiAxMDApfSUpXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICBtaW49ezAuNX1cbiAgICAgICAgICAgICAgICBtYXg9ezIuMH1cbiAgICAgICAgICAgICAgICBzdGVwPXswLjA1fVxuICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcuZW52TGlnaHRpbmdJbnRlbnNpdHl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICBlbnZMaWdodGluZ0ludGVuc2l0eTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiSW50ZW5zeXdub8WbxIcgT8Wbd2lldGxlbmlhIE90b2N6ZW5pYVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1hbWJlci00MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTaGFkb3cgTWFwcGluZyBUb2dnbGUgJiBTaGFkb3cgTWFwIFF1YWxpdHkgU2VsZWN0b3IgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgcm91bmRlZC1sZyBweC0zIHB5LTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIHJvbGU9XCJzd2l0Y2hcIlxuICAgICAgICAgICAgICAgIGFyaWEtY2hlY2tlZD17Y29uZmlnLmVuYWJsZUJ1aWxkaW5nU2hhZG93c31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICBlbmFibGVCdWlsZGluZ1NoYWRvd3M6ICFjb25maWcuZW5hYmxlQnVpbGRpbmdTaGFkb3dzLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgIGNvbmZpZy5lbmFibGVCdWlsZGluZ1NoYWRvd3NcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctWyMxMjI1M2VdIGJvcmRlci1hbWJlci00MDAvNzAgdGV4dC1hbWJlci0zMDAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMGIxNTI2XSBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJXxYLEhWN6IGx1YiB3ecWCxIVjeiByenVjYW5pZSBjaWVuaSAoU2hhZG93IE1hcHBpbmcpIHByemV6IGJ1ZHlua2kgbmEgd2lydHVhbG7EhSBwb2TFgm9nxJkgaSBibGF0XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPkNpZW5pZSBCdWR5bmvDs3c8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTEuNSBweS0wLjUgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCByb3VuZGVkICR7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5lbmFibGVCdWlsZGluZ1NoYWRvd3NcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci00MDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2NvbmZpZy5lbmFibGVCdWlsZGluZ1NoYWRvd3MgPyAnV8WBLicgOiAnV1nFgS4nfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcuc2hhZG93TWFwUXVhbGl0eX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWNvbmZpZy5lbmFibGVCdWlsZGluZ1NoYWRvd3N9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICBzaGFkb3dNYXBRdWFsaXR5OiBlLnRhcmdldC52YWx1ZSBhcyBTaGFkb3dNYXBRdWFsaXR5T3B0aW9uLFxuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkpha2/Fm8SHIFNoYWRvdyBNYXB5XCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIld5Ymllcnogcm96ZHppZWxjem/Fm8SHIGkgamFrb8WbxIcgZmlsdHJvd2FuaWEgUENGIFNoYWRvdyBNYXB5XCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgbWluLXctMCBiZy1bIzA1MGIxNF0gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0yIHB5LTEgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWFtYmVyLTQwMCBkaXNhYmxlZDpvcGFjaXR5LTQwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJOaXNrYSAoNTEyw5c1MTIgwrcgTW9iaWxlIEZhc3QpXCI+XG4gICAgICAgICAgICAgICAgICBTaGFkb3cgTWFwOiA1MTJweCAoTmlza2EpXG4gICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIsWacmVkbmlhICgxMDI0w5cxMDI0IMK3IFN0YW5kYXJkIEFSKVwiPlxuICAgICAgICAgICAgICAgICAgU2hhZG93IE1hcDogMTAyNHB4ICjFmnJlZG5pYSlcbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiV3lzb2thICgyMDQ4w5cyMDQ4IMK3IENyaXNwIFBDRilcIj5cbiAgICAgICAgICAgICAgICAgIFNoYWRvdyBNYXA6IDIwNDhweCAoV3lzb2thIFBDRilcbiAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVWx0cmEgKDQwOTbDlzQwOTYgwrcgU3R1ZGlvIEJJTSlcIj5cbiAgICAgICAgICAgICAgICAgIFNoYWRvdyBNYXA6IDQwOTZweCAoVWx0cmEgQklNKVxuICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEJvdHRvbSBBY3Rpb24gJiBTeW50aGVzaXMgU3RyaXAgaW5zaWRlIERvY2sgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yLjUgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzkwIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIHsvKiBQcmltYXJ5IEFjdGlvbjogQXNzZW1ibGUgVW5pZmllZCBDb21wb3NpdGUgU3BhdGlhbCBNb2RlbCAmIEVkaXQgSW5kaXZpZHVhbCBTdWItTW9kZWxzICovfVxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25Bc3NlbWJsZVVuaWZpZWRNb2RlbH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtYm9sZCBiZy1ncmFkaWVudC10by1yIGZyb20tc2t5LTQwMCB0by1pbmRpZ28tNDAwIGhvdmVyOmZyb20tc2t5LTMwMCBob3Zlcjp0by1pbmRpZ28tMzAwIHRleHQtc2xhdGUtOTUwIHJvdW5kZWQtbGcgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEJveGVzIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIFV0d8OzcnogV3Nww7NsbnkgTW9kZWwgUHJ6ZXN0cnplbm55IChFZHljamEgU3ViLU1vZGVsaSlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgey8qIFVwbG9hZCBIb3Jpem9udGFsIFJlY3Rhbmd1bGFyIFJlZmVyZW5jZSBJbWFnZSAqL31cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctWyMxMTIwMzhdIGhvdmVyOmJnLVsjMTcyYjRhXSB0ZXh0LXNreS0zMDAgYm9yZGVyIGJvcmRlci1za3ktNTAwLzQwIHJvdW5kZWQtbGcgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgIDxJbWFnZVBsdXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBXc3RhdyBPYnJheiBSZWZlcmVuY3lqbnkgKFByb3N0b2vEhXQgUG96aW9teSlcbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUhvcml6b250YWxSZWZlcmVuY2VVcGxvYWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgIHNob3dSZWZlcmVuY2VCaWxsYm9hcmRJbjNEOlxuICAgICAgICAgICAgICAgICAgICAgICFjb25maWcuc2hvd1JlZmVyZW5jZUJpbGxib2FyZEluM0QsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICBjb25maWcuc2hvd1JlZmVyZW5jZUJpbGxib2FyZEluM0RcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC01MDAvMTUgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHRleHQtZW1lcmFsZC0zMDAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMGIxNTI2XSBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBFa3JhbiBSZWZlcmVuY3lqbnkgMTY6OSB3IDNEOnsnICd9XG4gICAgICAgICAgICAgICAge2NvbmZpZy5zaG93UmVmZXJlbmNlQmlsbGJvYXJkSW4zRCA/ICdXxYIuJyA6ICdXecWCLid9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIHsvKiBFeHBvcnQgQVJTdHVkaW9Db25maWcgdG8gLkpTT04gZmlsZSAqL31cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uRXhwb3J0SnNvbn1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlphcGlzeiBwZcWCbsSFIGtvbmZpZ3VyYWNqxJkgQVJTdHVkaW9Db25maWcgZG8gcGxpa3UgLmpzb25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctWyMwZjFlMzZdIGhvdmVyOmJnLVsjMTYyYTRhXSB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC80MCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBaYXBpc3ogUHJvamVrdCAoLkpTT04pXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIHsvKiBJbXBvcnQgQVJTdHVkaW9Db25maWcgZnJvbSAuSlNPTiBmaWxlICovfVxuICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICB0aXRsZT1cIldjenl0YWogemFwaXNhbsSFIGtvbmZpZ3VyYWNqxJkgQVJTdHVkaW9Db25maWcgeiBwbGlrdSAuanNvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1bIzBmMWUzNl0gaG92ZXI6YmctWyMxNjJhNGFdIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Rm9sZGVyT3BlbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIFdjenl0YWogKC5KU09OKVxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiLmpzb24sYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgb25JbXBvcnRKc29uRmlsZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uT3BlbldvcmtiZW5jaCgncHJvbXB0cycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNreS00MDAgaG92ZXI6dGV4dC1za3ktMzAwIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICBPdHfDs3J6IHBlxYJueSBwcm9tcHQgaSBrb2QgVW5pdHkgQyMg4oaSXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==