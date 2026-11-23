const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch/node_modules/.vite/deps/react.js?v=50682de0";
import { Boxes, Building2, Check, Copy, Download, Eye, EyeOff, FolderOpen, RefreshCw, X } from "/apps/holoarch/node_modules/.vite/deps/lucide-react.js?v=50682de0";
var _jsxFileName = "/app/applet/src/components/UnifiedSpatialModelComposer.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/holoarch/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=50682de0";
const CLUSTER_LABELS = {
	alpha_spire: {
		code: "A",
		title: "Klaster Zachodni · Alpha Spire",
		badgeColor: "text-sky-300 border-sky-500/50 bg-sky-500/15"
	},
	central_nexus: {
		code: "B",
		title: "Klaster Centralny · Core Sync Nexus",
		badgeColor: "text-amber-300 border-amber-500/50 bg-amber-500/15"
	},
	orbital_twin: {
		code: "C",
		title: "Klaster Wschodni · Orbital & Neural",
		badgeColor: "text-indigo-300 border-indigo-500/50 bg-indigo-500/15"
	}
};
export function createInitialSubModelOverrides(config) {
	const clusters = [
		"alpha_spire",
		"central_nexus",
		"orbital_twin"
	];
	const baseFloorMultipliers = [
		1,
		.84,
		.68,
		.76,
		.62
	];
	const isHoriz916 = config.modelOrientation916 === "Układ Poziomy 9:16 (Horyzontalne Kompleksy)";
	const isHybrid916 = config.modelOrientation916 === "Hybrydowy 9:16 (Poziome Skrzydła + Wieże)";
	const map = {};
	clusters.forEach((cId, cIdx) => {
		const code = cIdx === 0 ? "A" : cIdx === 1 ? "B" : "C";
		for (let tIdx = 0; tIdx < 5; tIdx++) {
			const id = `${cId}_${tIdx}`;
			const isVisible = tIdx < config.buildingsPerGroup;
			const defaultFloors = Math.max(16, Math.round(config.buildingFloorCount * baseFloorMultipliers[tIdx]));
			let widthScale = 1;
			let depthScale = 1;
			if (isHoriz916) {
				widthScale = 1.65;
				depthScale = .93;
			} else if (isHybrid916) {
				widthScale = tIdx === 0 ? 1.08 : 1.75;
				depthScale = tIdx === 0 ? 1.08 : .98;
			}
			map[id] = {
				id,
				clusterId: cId,
				towerIndex: tIdx,
				customName: `Moduł ${code}${tIdx + 1} (${tIdx === 0 ? "Wieża Główna" : `Skrzydło 0${tIdx}`})`,
				floors: defaultFloors,
				widthScale,
				depthScale,
				offsetX: 0,
				offsetZ: 0,
				rotationDeg: 0,
				coreType: (tIdx + cIdx) % 2 === 1 ? "gold" : "cyan",
				visible: isVisible
			};
		}
	});
	return map;
}
export const UnifiedSpatialModelComposer = ({ isOpen, config, onClose, onUpdateConfig, onUpdateSubModel, onRebuildCompositeFromGlobal, onExportJson, onImportJsonFile }) => {
	const [copiedSpec, setCopiedSpec] = useState(false);
	if (!isOpen) return null;
	const allSubModels = Object.values(config.subModelOverrides);
	const activeSubModels = allSubModels.filter((m) => m.visible);
	const selectedId = config.selectedSubModelId && config.subModelOverrides[config.selectedSubModelId] ? config.selectedSubModelId : activeSubModels[0]?.id || "central_nexus_0";
	const currentSub = config.subModelOverrides[selectedId];
	const totalFloorsSum = activeSubModels.reduce((acc, m) => acc + m.floors, 0);
	const totalGfaSqMeters = activeSubModels.reduce((acc, m) => acc + Math.round(m.floors * 1450 * m.widthScale * m.depthScale), 0);
	const handleExportCompositeSpec = () => {
		const compositePayload = {
			project: "HoloArch AR - Unified Composite Spatial Model",
			timestamp: new Date().toISOString(),
			arFramework: config.arFramework,
			renderPipeline: config.renderPipeline,
			environment: {
				tabletopMeters: {
					width: config.tableWidthMeters,
					depth: config.tableDepthMeters,
					preset: config.tableSizePreset
				},
				roomMeters: {
					width: config.roomWidthMeters,
					depth: config.roomDepthMeters,
					preset: config.roomSizePreset
				},
				spatialFormation: config.buildingLayout,
				depthScatter: config.layoutDepthScatter,
				orientationMode: config.modelOrientation916
			},
			compositeSummary: {
				activeSubModelsCount: activeSubModels.length,
				totalCombinedFloors: totalFloorsSum,
				estimatedTotalGFA_m2: totalGfaSqMeters
			},
			individualSubModels: activeSubModels
		};
		navigator.clipboard.writeText(JSON.stringify(compositePayload, null, 2));
		setCopiedSpec(true);
		setTimeout(() => setCopiedSpec(false), 2200);
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed right-6 top-16 bottom-24 z-30 w-[410px] max-w-[94vw] bg-[#08101f]/95 border border-sky-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "px-4 py-3.5 bg-[#050b16] border-b border-slate-800 flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/50 flex items-center justify-center text-sky-300",
						children: /* @__PURE__ */ _jsxDEV(Boxes, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-xs font-bold uppercase tracking-wider text-white",
						children: "Wspólny Model Przestrzenny 3D"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 186,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-[11px] text-slate-400",
						children: [
							"Kompozyt ",
							activeSubModels.length,
							" brył · Edycja pojedynczych modeli na żywo"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 185,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: onClose,
					className: "p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors",
					"aria-label": "Zamknij edytor wspólnego modelu",
					children: /* @__PURE__ */ _jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 201,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 195,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 180,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-3 gap-2 px-4 py-2.5 bg-[#0b1528] border-b border-slate-800/90 text-center font-mono tabular-nums",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-[#060c18] border border-slate-800 rounded-lg py-1.5 px-2",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-slate-400",
							children: "AKTYWNE BRYŁY"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-sm font-bold text-sky-400",
							children: [activeSubModels.length, " / 15"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 209,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 207,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-[#060c18] border border-slate-800 rounded-lg py-1.5 px-2",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-slate-400",
							children: "SUMA PIĘTER"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-sm font-bold text-amber-300",
							children: [totalFloorsSum, " kond."]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 213,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-[#060c18] border border-slate-800 rounded-lg py-1.5 px-2",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-slate-400",
							children: "POW. CAŁKOWITA"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-sm font-bold text-emerald-300",
							children: [(totalGfaSqMeters / 1e3).toFixed(0), "k m²"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 221,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 219,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 206,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex-1 overflow-y-auto p-4 space-y-4",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-2.5",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "text-xs font-semibold text-slate-200 flex items-center gap-1.5",
							children: [/* @__PURE__ */ _jsxDEV(Building2, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 233,
								columnNumber: 15
							}, this), "Wybierz pojedynczy model do edycji (lub kliknij w 3D)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 232,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: onRebuildCompositeFromGlobal,
							title: "Zresetuj i odbuduj wspólny model z bieżących parametrów globalnych",
							className: "px-2 py-1 text-[11px] font-medium text-sky-300 hover:text-white bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 rounded-md flex items-center gap-1 transition-colors",
							children: [/* @__PURE__ */ _jsxDEV(RefreshCw, { className: "w-3 h-3" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 242,
								columnNumber: 15
							}, this), "Synchronizuj z bazą"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 236,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 231,
						columnNumber: 11
					}, this), [
						"alpha_spire",
						"central_nexus",
						"orbital_twin"
					].map((cId) => {
						const cInfo = CLUSTER_LABELS[cId];
						const clusterModels = allSubModels.filter((m) => m.clusterId === cId);
						return /* @__PURE__ */ _jsxDEV("div", {
							className: "bg-[#060c17] border border-slate-800/90 rounded-xl p-2.5 space-y-1.5",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-[11px] font-semibold text-slate-300",
									children: cInfo.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 259,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: `text-[10px] font-mono px-1.5 py-0.5 rounded border ${cInfo.badgeColor}`,
									children: [clusterModels.filter((m) => m.visible).length, " aktywne"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 258,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-5 gap-1.5",
								children: clusterModels.map((sub) => {
									const isSelected = sub.id === selectedId;
									return /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => onUpdateConfig({
											selectedSubModelId: sub.id,
											selectedBuilding: sub.clusterId
										}),
										className: `px-1.5 py-1.5 rounded-lg border text-center transition-all font-mono ${isSelected ? "bg-sky-500 text-slate-950 border-white font-bold shadow-md" : sub.visible ? "bg-[#0e192d] text-slate-200 border-slate-700 hover:border-sky-400" : "bg-[#050911] text-slate-500 border-slate-800/60 opacity-60 hover:opacity-100"}`,
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "text-xs",
											children: [cInfo.code, sub.towerIndex + 1]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 290,
											columnNumber: 27
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "text-[10px] opacity-85",
											children: sub.visible ? `${sub.floors}p` : "Wył."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 294,
											columnNumber: 27
										}, this)]
									}, sub.id, true, {
										fileName: _jsxFileName,
										lineNumber: 273,
										columnNumber: 25
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 269,
								columnNumber: 19
							}, this)]
						}, cId, true, {
							fileName: _jsxFileName,
							lineNumber: 254,
							columnNumber: 17
						}, this);
					})]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 230,
					columnNumber: 9
				}, this), currentSub && /* @__PURE__ */ _jsxDEV("div", {
					className: "bg-[#0b1527] border border-sky-500/40 rounded-xl p-3.5 space-y-3",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between border-b border-slate-800 pb-2.5",
							children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "text-[10px] font-mono uppercase tracking-wider text-sky-400",
								children: [
									"EDYCJA POJEDYNCZEJ BRYŁY (",
									currentSub.id,
									")"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 312,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: currentSub.customName,
								onChange: (e) => onUpdateSubModel(currentSub.id, { customName: e.target.value }),
								className: "block w-full mt-0.5 bg-[#060c17] border border-slate-700 rounded px-2 py-1 text-xs font-bold text-white focus:outline-none focus:border-sky-400"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 311,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => onUpdateSubModel(currentSub.id, { visible: !currentSub.visible }),
								className: `px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1 shrink-0 ${currentSub.visible ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50" : "bg-slate-800 text-slate-400 border-slate-700"}`,
								children: currentSub.visible ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Eye, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 342,
									columnNumber: 21
								}, this), "Widoczny"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 341,
									columnNumber: 19
								}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(EyeOff, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 347,
									columnNumber: 21
								}, this), "Ukryty"] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 346,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 310,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex justify-between text-xs text-slate-300 mb-1",
							children: [/* @__PURE__ */ _jsxDEV("span", { children: "Liczba kondygnacji tego budynku" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 357,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "font-mono tabular-nums text-amber-300",
								children: [
									currentSub.floors,
									" pięter (~",
									Math.round(currentSub.floors * 4.2),
									"m)"
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 358,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 356,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("input", {
							type: "range",
							min: 15,
							max: 160,
							step: 1,
							value: currentSub.floors,
							onChange: (e) => onUpdateSubModel(currentSub.id, {
								floors: parseInt(e.target.value, 10),
								visible: true
							}),
							className: "w-full accent-amber-400"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 363,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 355,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-2 gap-2.5",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800 rounded-lg p-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-[11px] text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Szerokość X (9:16)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 383,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-sky-400",
										children: [currentSub.widthScale.toFixed(2), "x"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 382,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: .5,
									max: 2.4,
									step: .05,
									value: currentSub.widthScale,
									onChange: (e) => onUpdateSubModel(currentSub.id, { widthScale: parseFloat(e.target.value) }),
									className: "w-full accent-sky-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 388,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 381,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800 rounded-lg p-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-[11px] text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Głębokość Z" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 405,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-sky-400",
										children: [currentSub.depthScale.toFixed(2), "x"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 406,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 404,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: .5,
									max: 2.4,
									step: .05,
									value: currentSub.depthScale,
									onChange: (e) => onUpdateSubModel(currentSub.id, { depthScale: parseFloat(e.target.value) }),
									className: "w-full accent-sky-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 410,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 403,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 380,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-2 gap-2.5",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800 rounded-lg p-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-[11px] text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Przesunięcie ΔX" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 430,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-emerald-300",
										children: [
											currentSub.offsetX >= 0 ? "+" : "",
											currentSub.offsetX.toFixed(2),
											"m"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 431,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 429,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: -.65,
									max: .65,
									step: .02,
									value: currentSub.offsetX,
									onChange: (e) => onUpdateSubModel(currentSub.id, { offsetX: parseFloat(e.target.value) }),
									className: "w-full accent-emerald-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 436,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 428,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800 rounded-lg p-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-[11px] text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Przesunięcie ΔZ" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 453,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-emerald-300",
										children: [
											currentSub.offsetZ >= 0 ? "+" : "",
											currentSub.offsetZ.toFixed(2),
											"m"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 454,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 452,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: -.65,
									max: .65,
									step: .02,
									value: currentSub.offsetZ,
									onChange: (e) => onUpdateSubModel(currentSub.id, { offsetZ: parseFloat(e.target.value) }),
									className: "w-full accent-emerald-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 459,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 451,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 427,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-2 gap-2.5 items-center",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#060c17] border border-slate-800 rounded-lg p-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-[11px] text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Obrót bryły Y" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 479,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-amber-300",
										children: [currentSub.rotationDeg, "°"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 480,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 478,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: -180,
									max: 180,
									step: 5,
									value: currentSub.rotationDeg,
									onChange: (e) => onUpdateSubModel(currentSub.id, { rotationDeg: parseInt(e.target.value, 10) }),
									className: "w-full accent-amber-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 484,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 477,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onUpdateSubModel(currentSub.id, { coreType: currentSub.coreType === "gold" ? "cyan" : "gold" }),
									className: `w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-colors ${currentSub.coreType === "gold" ? "bg-amber-500/20 text-amber-300 border-amber-500/50" : "bg-sky-500/20 text-sky-300 border-sky-500/50"}`,
									children: [
										"Rdzeń:",
										" ",
										currentSub.coreType === "gold" ? "Złoty Termiczny" : "Cyjanowy BIM"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 500,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onUpdateSubModel(currentSub.id, {
										widthScale: 1.75,
										depthScale: .95,
										floors: 46
									}),
									className: "w-full py-1 px-2 rounded-lg text-[10px] font-mono bg-[#060c17] hover:bg-slate-800 text-slate-300 border border-slate-700",
									children: "Preset bryły: Poziomy 9:16"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 520,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 499,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 476,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 309,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 228,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "p-3.5 bg-[#050b16] border-t border-slate-800 space-y-2",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: onExportJson,
						className: "py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5",
						children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 547,
							columnNumber: 13
						}, this), "Zapisz Plik (.JSON)"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 542,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("label", {
						className: "py-2 px-3 bg-[#101e36] hover:bg-[#172b4c] text-sky-300 border border-sky-500/40 font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-1.5",
						children: [
							/* @__PURE__ */ _jsxDEV(FolderOpen, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 552,
								columnNumber: 13
							}, this),
							"Wczytaj Plik (.JSON)",
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
								lineNumber: 554,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 551,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 541,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: handleExportCompositeSpec,
					className: "w-full py-2 px-3 bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5",
					children: copiedSpec ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-4 h-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 576,
						columnNumber: 15
					}, this), "Skopiowano Wspólny Model 3D do Schowka"] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 575,
						columnNumber: 13
					}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 581,
						columnNumber: 15
					}, this), "Kopiuj Specyfikację Wspólnego Modelu (JSON)"] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 580,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 569,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 540,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 178,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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O1VBQ1osUUFBUTtTQUNWLENBQUM7U0FFSCxXQUFVO21CQUNYO1FBRU87Ozs7Z0JBQ0w7Ozs7O2VBQ0Y7Ozs7OztLQUNGOzs7OztZQUVKOzs7Ozs7R0FHTCx3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmLENBQ0Usd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZixDQUNFLHdCQUFDLFVBQUQ7TUFDRSxNQUFLO01BQ0wsU0FBUztNQUNULFdBQVU7Z0JBSFosQ0FLRSx3QkFBQyxVQUFELEVBQVUsV0FBVSxjQUFlOzs7O2dCQUFDLHFCQUU5Qjs7Ozs7ZUFFUix3QkFBQyxTQUFEO01BQU8sV0FBVTtnQkFBakI7T0FDRSx3QkFBQyxZQUFELEVBQVksV0FBVSwyQkFBNEI7Ozs7O09BQUM7T0FFbkQsd0JBQUMsU0FBRDtRQUNFLE1BQUs7UUFDTCxRQUFPO1FBQ1AsV0FBVyxNQUFNO1NBQ2YsTUFBTSxPQUFPLEVBQUUsT0FBTyxRQUFRO1NBQzlCLElBQUksTUFBTTtVQUNSLGlCQUFpQixJQUFJO1VBQ3JCLEVBQUUsT0FBTyxRQUFRO1NBQ25CO1FBQ0Y7UUFDQSxXQUFVO09BQ1g7Ozs7O01BQ0k7Ozs7O2FBQ0o7Ozs7O2NBRUwsd0JBQUMsVUFBRDtLQUNFLE1BQUs7S0FDTCxTQUFTO0tBQ1QsV0FBVTtlQUVULGFBQ0MsZ0RBQ0Usd0JBQUMsT0FBRCxFQUFPLFdBQVUsVUFBVzs7OztlQUFDLHdDQUU3Qjs7OztnQkFFRixnREFDRSx3QkFBQyxNQUFELEVBQU0sV0FBVSxVQUFXOzs7O2VBQUMsNkNBRTVCOzs7OztJQUVFOzs7O1lBQ0w7Ozs7OztFQUNGOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJVbmlmaWVkU3BhdGlhbE1vZGVsQ29tcG9zZXIudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveGVzLFxuICBCdWlsZGluZzIsXG4gIENoZWNrLFxuICBDb3B5LFxuICBEb3dubG9hZCxcbiAgRXllLFxuICBFeWVPZmYsXG4gIEZvbGRlck9wZW4sXG4gIFJlZnJlc2hDdyxcbiAgWCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7XG4gIEFSU3R1ZGlvQ29uZmlnLFxuICBCdWlsZGluZ0NsdXN0ZXJJZCxcbiAgU3ViTW9kZWxPdmVycmlkZSxcbn0gZnJvbSAnLi4vdHlwZXMvYXJTdHVkaW8nO1xuXG5pbnRlcmZhY2UgVW5pZmllZFNwYXRpYWxNb2RlbENvbXBvc2VyUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIGNvbmZpZzogQVJTdHVkaW9Db25maWc7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uVXBkYXRlQ29uZmlnOiAocGFydGlhbDogUGFydGlhbDxBUlN0dWRpb0NvbmZpZz4pID0+IHZvaWQ7XG4gIG9uVXBkYXRlU3ViTW9kZWw6IChpZDogc3RyaW5nLCBwYXJ0aWFsOiBQYXJ0aWFsPFN1Yk1vZGVsT3ZlcnJpZGU+KSA9PiB2b2lkO1xuICBvblJlYnVpbGRDb21wb3NpdGVGcm9tR2xvYmFsOiAoKSA9PiB2b2lkO1xuICBvbkV4cG9ydEpzb246ICgpID0+IHZvaWQ7XG4gIG9uSW1wb3J0SnNvbkZpbGU6IChmaWxlOiBGaWxlKSA9PiB2b2lkO1xufVxuXG5jb25zdCBDTFVTVEVSX0xBQkVMUzogUmVjb3JkPFxuICBCdWlsZGluZ0NsdXN0ZXJJZCxcbiAgeyBjb2RlOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmc7IGJhZGdlQ29sb3I6IHN0cmluZyB9XG4+ID0ge1xuICBhbHBoYV9zcGlyZToge1xuICAgIGNvZGU6ICdBJyxcbiAgICB0aXRsZTogJ0tsYXN0ZXIgWmFjaG9kbmkgwrcgQWxwaGEgU3BpcmUnLFxuICAgIGJhZGdlQ29sb3I6ICd0ZXh0LXNreS0zMDAgYm9yZGVyLXNreS01MDAvNTAgYmctc2t5LTUwMC8xNScsXG4gIH0sXG4gIGNlbnRyYWxfbmV4dXM6IHtcbiAgICBjb2RlOiAnQicsXG4gICAgdGl0bGU6ICdLbGFzdGVyIENlbnRyYWxueSDCtyBDb3JlIFN5bmMgTmV4dXMnLFxuICAgIGJhZGdlQ29sb3I6ICd0ZXh0LWFtYmVyLTMwMCBib3JkZXItYW1iZXItNTAwLzUwIGJnLWFtYmVyLTUwMC8xNScsXG4gIH0sXG4gIG9yYml0YWxfdHdpbjoge1xuICAgIGNvZGU6ICdDJyxcbiAgICB0aXRsZTogJ0tsYXN0ZXIgV3NjaG9kbmkgwrcgT3JiaXRhbCAmIE5ldXJhbCcsXG4gICAgYmFkZ2VDb2xvcjogJ3RleHQtaW5kaWdvLTMwMCBib3JkZXItaW5kaWdvLTUwMC81MCBiZy1pbmRpZ28tNTAwLzE1JyxcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbml0aWFsU3ViTW9kZWxPdmVycmlkZXMoXG4gIGNvbmZpZzogQVJTdHVkaW9Db25maWdcbik6IFJlY29yZDxzdHJpbmcsIFN1Yk1vZGVsT3ZlcnJpZGU+IHtcbiAgY29uc3QgY2x1c3RlcnM6IEJ1aWxkaW5nQ2x1c3RlcklkW10gPSBbXG4gICAgJ2FscGhhX3NwaXJlJyxcbiAgICAnY2VudHJhbF9uZXh1cycsXG4gICAgJ29yYml0YWxfdHdpbicsXG4gIF07XG4gIGNvbnN0IGJhc2VGbG9vck11bHRpcGxpZXJzID0gWzEuMCwgMC44NCwgMC42OCwgMC43NiwgMC42Ml07XG4gIGNvbnN0IGlzSG9yaXo5MTYgPVxuICAgIGNvbmZpZy5tb2RlbE9yaWVudGF0aW9uOTE2ID09PVxuICAgICdVa8WCYWQgUG96aW9teSA5OjE2IChIb3J5em9udGFsbmUgS29tcGxla3N5KSc7XG4gIGNvbnN0IGlzSHlicmlkOTE2ID1cbiAgICBjb25maWcubW9kZWxPcmllbnRhdGlvbjkxNiA9PT0gJ0h5YnJ5ZG93eSA5OjE2IChQb3ppb21lIFNrcnp5ZMWCYSArIFdpZcW8ZSknO1xuXG4gIGNvbnN0IG1hcDogUmVjb3JkPHN0cmluZywgU3ViTW9kZWxPdmVycmlkZT4gPSB7fTtcblxuICBjbHVzdGVycy5mb3JFYWNoKChjSWQsIGNJZHgpID0+IHtcbiAgICBjb25zdCBjb2RlID0gY0lkeCA9PT0gMCA/ICdBJyA6IGNJZHggPT09IDEgPyAnQicgOiAnQyc7XG4gICAgZm9yIChsZXQgdElkeCA9IDA7IHRJZHggPCA1OyB0SWR4KyspIHtcbiAgICAgIGNvbnN0IGlkID0gYCR7Y0lkfV8ke3RJZHh9YDtcbiAgICAgIGNvbnN0IGlzVmlzaWJsZSA9IHRJZHggPCBjb25maWcuYnVpbGRpbmdzUGVyR3JvdXA7XG4gICAgICBjb25zdCBkZWZhdWx0Rmxvb3JzID0gTWF0aC5tYXgoXG4gICAgICAgIDE2LFxuICAgICAgICBNYXRoLnJvdW5kKGNvbmZpZy5idWlsZGluZ0Zsb29yQ291bnQgKiBiYXNlRmxvb3JNdWx0aXBsaWVyc1t0SWR4XSlcbiAgICAgICk7XG5cbiAgICAgIGxldCB3aWR0aFNjYWxlID0gMS4wO1xuICAgICAgbGV0IGRlcHRoU2NhbGUgPSAxLjA7XG4gICAgICBpZiAoaXNIb3JpejkxNikge1xuICAgICAgICB3aWR0aFNjYWxlID0gMS42NTtcbiAgICAgICAgZGVwdGhTY2FsZSA9IDAuOTM7XG4gICAgICB9IGVsc2UgaWYgKGlzSHlicmlkOTE2KSB7XG4gICAgICAgIHdpZHRoU2NhbGUgPSB0SWR4ID09PSAwID8gMS4wOCA6IDEuNzU7XG4gICAgICAgIGRlcHRoU2NhbGUgPSB0SWR4ID09PSAwID8gMS4wOCA6IDAuOTg7XG4gICAgICB9XG5cbiAgICAgIG1hcFtpZF0gPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBjbHVzdGVySWQ6IGNJZCxcbiAgICAgICAgdG93ZXJJbmRleDogdElkeCxcbiAgICAgICAgY3VzdG9tTmFtZTogYE1vZHXFgiAke2NvZGV9JHt0SWR4ICsgMX0gKCR7XG4gICAgICAgICAgdElkeCA9PT0gMCA/ICdXaWXFvGEgR8WCw7N3bmEnIDogYFNrcnp5ZMWCbyAwJHt0SWR4fWBcbiAgICAgICAgfSlgLFxuICAgICAgICBmbG9vcnM6IGRlZmF1bHRGbG9vcnMsXG4gICAgICAgIHdpZHRoU2NhbGUsXG4gICAgICAgIGRlcHRoU2NhbGUsXG4gICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgIG9mZnNldFo6IDAsXG4gICAgICAgIHJvdGF0aW9uRGVnOiAwLFxuICAgICAgICBjb3JlVHlwZTogKHRJZHggKyBjSWR4KSAlIDIgPT09IDEgPyAnZ29sZCcgOiAnY3lhbicsXG4gICAgICAgIHZpc2libGU6IGlzVmlzaWJsZSxcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbWFwO1xufVxuXG5leHBvcnQgY29uc3QgVW5pZmllZFNwYXRpYWxNb2RlbENvbXBvc2VyOiBSZWFjdC5GQzxcbiAgVW5pZmllZFNwYXRpYWxNb2RlbENvbXBvc2VyUHJvcHNcbj4gPSAoe1xuICBpc09wZW4sXG4gIGNvbmZpZyxcbiAgb25DbG9zZSxcbiAgb25VcGRhdGVDb25maWcsXG4gIG9uVXBkYXRlU3ViTW9kZWwsXG4gIG9uUmVidWlsZENvbXBvc2l0ZUZyb21HbG9iYWwsXG4gIG9uRXhwb3J0SnNvbixcbiAgb25JbXBvcnRKc29uRmlsZSxcbn0pID0+IHtcbiAgY29uc3QgW2NvcGllZFNwZWMsIHNldENvcGllZFNwZWNdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBhbGxTdWJNb2RlbHMgPSBPYmplY3QudmFsdWVzKGNvbmZpZy5zdWJNb2RlbE92ZXJyaWRlcyk7XG4gIGNvbnN0IGFjdGl2ZVN1Yk1vZGVscyA9IGFsbFN1Yk1vZGVscy5maWx0ZXIoKG0pID0+IG0udmlzaWJsZSk7XG4gIGNvbnN0IHNlbGVjdGVkSWQgPVxuICAgIGNvbmZpZy5zZWxlY3RlZFN1Yk1vZGVsSWQgJiYgY29uZmlnLnN1Yk1vZGVsT3ZlcnJpZGVzW2NvbmZpZy5zZWxlY3RlZFN1Yk1vZGVsSWRdXG4gICAgICA/IGNvbmZpZy5zZWxlY3RlZFN1Yk1vZGVsSWRcbiAgICAgIDogYWN0aXZlU3ViTW9kZWxzWzBdPy5pZCB8fCAnY2VudHJhbF9uZXh1c18wJztcblxuICBjb25zdCBjdXJyZW50U3ViID0gY29uZmlnLnN1Yk1vZGVsT3ZlcnJpZGVzW3NlbGVjdGVkSWRdO1xuXG4gIGNvbnN0IHRvdGFsRmxvb3JzU3VtID0gYWN0aXZlU3ViTW9kZWxzLnJlZHVjZSgoYWNjLCBtKSA9PiBhY2MgKyBtLmZsb29ycywgMCk7XG4gIGNvbnN0IHRvdGFsR2ZhU3FNZXRlcnMgPSBhY3RpdmVTdWJNb2RlbHMucmVkdWNlKFxuICAgIChhY2MsIG0pID0+XG4gICAgICBhY2MgKyBNYXRoLnJvdW5kKG0uZmxvb3JzICogMTQ1MCAqIG0ud2lkdGhTY2FsZSAqIG0uZGVwdGhTY2FsZSksXG4gICAgMFxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydENvbXBvc2l0ZVNwZWMgPSAoKSA9PiB7XG4gICAgY29uc3QgY29tcG9zaXRlUGF5bG9hZCA9IHtcbiAgICAgIHByb2plY3Q6ICdIb2xvQXJjaCBBUiAtIFVuaWZpZWQgQ29tcG9zaXRlIFNwYXRpYWwgTW9kZWwnLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBhckZyYW1ld29yazogY29uZmlnLmFyRnJhbWV3b3JrLFxuICAgICAgcmVuZGVyUGlwZWxpbmU6IGNvbmZpZy5yZW5kZXJQaXBlbGluZSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIHRhYmxldG9wTWV0ZXJzOiB7XG4gICAgICAgICAgd2lkdGg6IGNvbmZpZy50YWJsZVdpZHRoTWV0ZXJzLFxuICAgICAgICAgIGRlcHRoOiBjb25maWcudGFibGVEZXB0aE1ldGVycyxcbiAgICAgICAgICBwcmVzZXQ6IGNvbmZpZy50YWJsZVNpemVQcmVzZXQsXG4gICAgICAgIH0sXG4gICAgICAgIHJvb21NZXRlcnM6IHtcbiAgICAgICAgICB3aWR0aDogY29uZmlnLnJvb21XaWR0aE1ldGVycyxcbiAgICAgICAgICBkZXB0aDogY29uZmlnLnJvb21EZXB0aE1ldGVycyxcbiAgICAgICAgICBwcmVzZXQ6IGNvbmZpZy5yb29tU2l6ZVByZXNldCxcbiAgICAgICAgfSxcbiAgICAgICAgc3BhdGlhbEZvcm1hdGlvbjogY29uZmlnLmJ1aWxkaW5nTGF5b3V0LFxuICAgICAgICBkZXB0aFNjYXR0ZXI6IGNvbmZpZy5sYXlvdXREZXB0aFNjYXR0ZXIsXG4gICAgICAgIG9yaWVudGF0aW9uTW9kZTogY29uZmlnLm1vZGVsT3JpZW50YXRpb245MTYsXG4gICAgICB9LFxuICAgICAgY29tcG9zaXRlU3VtbWFyeToge1xuICAgICAgICBhY3RpdmVTdWJNb2RlbHNDb3VudDogYWN0aXZlU3ViTW9kZWxzLmxlbmd0aCxcbiAgICAgICAgdG90YWxDb21iaW5lZEZsb29yczogdG90YWxGbG9vcnNTdW0sXG4gICAgICAgIGVzdGltYXRlZFRvdGFsR0ZBX20yOiB0b3RhbEdmYVNxTWV0ZXJzLFxuICAgICAgfSxcbiAgICAgIGluZGl2aWR1YWxTdWJNb2RlbHM6IGFjdGl2ZVN1Yk1vZGVscyxcbiAgICB9O1xuXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoSlNPTi5zdHJpbmdpZnkoY29tcG9zaXRlUGF5bG9hZCwgbnVsbCwgMikpO1xuICAgIHNldENvcGllZFNwZWModHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRTcGVjKGZhbHNlKSwgMjIwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIHJpZ2h0LTYgdG9wLTE2IGJvdHRvbS0yNCB6LTMwIHctWzQxMHB4XSBtYXgtdy1bOTR2d10gYmctWyMwODEwMWZdLzk1IGJvcmRlciBib3JkZXItc2t5LTUwMC80MCByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIGZsZXggZmxleC1jb2wgb3ZlcmZsb3ctaGlkZGVuIHBvaW50ZXItZXZlbnRzLWF1dG9cIj5cbiAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMy41IGJnLVsjMDUwYjE2XSBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQtbGcgYmctc2t5LTUwMC8yMCBib3JkZXIgYm9yZGVyLXNreS00MDAvNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1za3ktMzAwXCI+XG4gICAgICAgICAgICA8Qm94ZXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICBXc3DDs2xueSBNb2RlbCBQcnplc3RyemVubnkgM0RcbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICBLb21wb3p5dCB7YWN0aXZlU3ViTW9kZWxzLmxlbmd0aH0gYnJ5xYIgwrcgRWR5Y2phIHBvamVkeW5jenljaCBtb2RlbGkgbmEgxbx5d29cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1zbGF0ZS04MDAvODAgaG92ZXI6Ymctc2xhdGUtNzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgIGFyaWEtbGFiZWw9XCJaYW1rbmlqIGVkeXRvciB3c3DDs2xuZWdvIG1vZGVsdVwiXG4gICAgICAgID5cbiAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENvbXBvc2l0ZSBNYXN0ZXJwbGFuIFRlbGVtZXRyeSBTdHJpcCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMiBweC00IHB5LTIuNSBiZy1bIzBiMTUyOF0gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMC85MCB0ZXh0LWNlbnRlciBmb250LW1vbm8gdGFidWxhci1udW1zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMThdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHktMS41IHB4LTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+QUtUWVdORSBCUlnFgVk8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAge2FjdGl2ZVN1Yk1vZGVscy5sZW5ndGh9IC8gMTVcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMThdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHktMS41IHB4LTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+U1VNQSBQScSYVEVSPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTMwMFwiPlxuICAgICAgICAgICAge3RvdGFsRmxvb3JzU3VtfSBrb25kLlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA2MGMxOF0gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBweS0xLjUgcHgtMlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5QT1cuIENBxYFLT1dJVEE8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgIHsodG90YWxHZmFTcU1ldGVycyAvIDEwMDApLnRvRml4ZWQoMCl9ayBtwrJcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFNjcm9sbGFibGUgQm9keTogU3ViLU1vZGVsIFNlbGVjdG9yIE1hdHJpeCArIEluZGl2aWR1YWwgU3ViLU1vZGVsIEluc3BlY3RvciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTQgc3BhY2UteS00XCI+XG4gICAgICAgIHsvKiAxLiBJbnRlcmFjdGl2ZSBTdWItTW9kZWwgU2VsZWN0b3IgR3JpZCAoMyBDbHVzdGVycyB4IDUgQnVpbGRpbmdzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8QnVpbGRpbmcyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICAgIFd5YmllcnogcG9qZWR5bmN6eSBtb2RlbCBkbyBlZHljamkgKGx1YiBrbGlrbmlqIHcgM0QpXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblJlYnVpbGRDb21wb3NpdGVGcm9tR2xvYmFsfVxuICAgICAgICAgICAgICB0aXRsZT1cIlpyZXNldHVqIGkgb2RidWR1aiB3c3DDs2xueSBtb2RlbCB6IGJpZcW8xIVjeWNoIHBhcmFtZXRyw7N3IGdsb2JhbG55Y2hcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgdGV4dC1bMTFweF0gZm9udC1tZWRpdW0gdGV4dC1za3ktMzAwIGhvdmVyOnRleHQtd2hpdGUgYmctc2t5LTUwMC8xNSBob3ZlcjpiZy1za3ktNTAwLzI1IGJvcmRlciBib3JkZXItc2t5LTUwMC80MCByb3VuZGVkLW1kIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgU3luY2hyb25penVqIHogYmF6xIVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgeyhbJ2FscGhhX3NwaXJlJywgJ2NlbnRyYWxfbmV4dXMnLCAnb3JiaXRhbF90d2luJ10gYXMgY29uc3QpLm1hcChcbiAgICAgICAgICAgIChjSWQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgY0luZm8gPSBDTFVTVEVSX0xBQkVMU1tjSWRdO1xuICAgICAgICAgICAgICBjb25zdCBjbHVzdGVyTW9kZWxzID0gYWxsU3ViTW9kZWxzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAobSkgPT4gbS5jbHVzdGVySWQgPT09IGNJZFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGtleT17Y0lkfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzkwIHJvdW5kZWQteGwgcC0yLjUgc3BhY2UteS0xLjVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y0luZm8udGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMS41IHB5LTAuNSByb3VuZGVkIGJvcmRlciAke2NJbmZvLmJhZGdlQ29sb3J9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjbHVzdGVyTW9kZWxzLmZpbHRlcigobSkgPT4gbS52aXNpYmxlKS5sZW5ndGh9IGFrdHl3bmVcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtNSBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIHtjbHVzdGVyTW9kZWxzLm1hcCgoc3ViKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHN1Yi5pZCA9PT0gc2VsZWN0ZWRJZDtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3N1Yi5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRTdWJNb2RlbElkOiBzdWIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEJ1aWxkaW5nOiBzdWIuY2x1c3RlcklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMS41IHB5LTEuNSByb3VuZGVkLWxnIGJvcmRlciB0ZXh0LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBmb250LW1vbm8gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1za3ktNTAwIHRleHQtc2xhdGUtOTUwIGJvcmRlci13aGl0ZSBmb250LWJvbGQgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdWIudmlzaWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctWyMwZTE5MmRdIHRleHQtc2xhdGUtMjAwIGJvcmRlci1zbGF0ZS03MDAgaG92ZXI6Ym9yZGVyLXNreS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1bIzA1MDkxMV0gdGV4dC1zbGF0ZS01MDAgYm9yZGVyLXNsYXRlLTgwMC82MCBvcGFjaXR5LTYwIGhvdmVyOm9wYWNpdHktMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NJbmZvLmNvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3N1Yi50b3dlckluZGV4ICsgMX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gb3BhY2l0eS04NVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdWIudmlzaWJsZSA/IGAke3N1Yi5mbG9vcnN9cGAgOiAnV3nFgi4nfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIDIuIEluZGl2aWR1YWwgU3ViLU1vZGVsIFJlYWwtVGltZSBQYXJhbWV0ZXIgRWRpdG9yICovfVxuICAgICAgICB7Y3VycmVudFN1YiAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzBiMTUyN10gYm9yZGVyIGJvcmRlci1za3ktNTAwLzQwIHJvdW5kZWQteGwgcC0zLjUgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTIuNVwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1za3ktNDAwXCI+XG4gICAgICAgICAgICAgICAgICBFRFlDSkEgUE9KRURZTkNaRUogQlJZxYFZICh7Y3VycmVudFN1Yi5pZH0pXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1cnJlbnRTdWIuY3VzdG9tTmFtZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTdWJNb2RlbChjdXJyZW50U3ViLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgY3VzdG9tTmFtZTogZS50YXJnZXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJibG9jayB3LWZ1bGwgbXQtMC41IGJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkIHB4LTIgcHktMSB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICBvblVwZGF0ZVN1Yk1vZGVsKGN1cnJlbnRTdWIuaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogIWN1cnJlbnRTdWIudmlzaWJsZSxcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50U3ViLnZpc2libGVcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC01MDAvMjAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC01MDAvNTAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2N1cnJlbnRTdWIudmlzaWJsZSA/IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxFeWUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICBXaWRvY3pueVxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxFeWVPZmYgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICBVa3J5dHlcbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBJbmRpdmlkdWFsIEZsb29yIENvdW50ICovfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5MaWN6YmEga29uZHlnbmFjamkgdGVnbyBidWR5bmt1PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIHtjdXJyZW50U3ViLmZsb29yc30gcGnEmXRlciAoflxuICAgICAgICAgICAgICAgICAge01hdGgucm91bmQoY3VycmVudFN1Yi5mbG9vcnMgKiA0LjIpfW0pXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICBtaW49ezE1fVxuICAgICAgICAgICAgICAgIG1heD17MTYwfVxuICAgICAgICAgICAgICAgIHN0ZXA9ezF9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2N1cnJlbnRTdWIuZmxvb3JzfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgIG9uVXBkYXRlU3ViTW9kZWwoY3VycmVudFN1Yi5pZCwge1xuICAgICAgICAgICAgICAgICAgICBmbG9vcnM6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCksXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEluZGl2aWR1YWwgV2lkdGggWCAmIERlcHRoIFogU2NhbGUgKDk6MTYgSG9yaXpvbnRhbCB2cyBWZXJ0aWNhbCkgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHAtMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+U3plcm9rb8WbxIcgWCAoOToxNik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y3VycmVudFN1Yi53aWR0aFNjYWxlLnRvRml4ZWQoMil9eFxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgIG1pbj17MC41fVxuICAgICAgICAgICAgICAgICAgbWF4PXsyLjR9XG4gICAgICAgICAgICAgICAgICBzdGVwPXswLjA1fVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1cnJlbnRTdWIud2lkdGhTY2FsZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTdWJNb2RlbChjdXJyZW50U3ViLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgd2lkdGhTY2FsZTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXNreS00MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5HxYLEmWJva2/Fm8SHIFo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y3VycmVudFN1Yi5kZXB0aFNjYWxlLnRvRml4ZWQoMil9eFxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgIG1pbj17MC41fVxuICAgICAgICAgICAgICAgICAgbWF4PXsyLjR9XG4gICAgICAgICAgICAgICAgICBzdGVwPXswLjA1fVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1cnJlbnRTdWIuZGVwdGhTY2FsZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTdWJNb2RlbChjdXJyZW50U3ViLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVwdGhTY2FsZTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXNreS00MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBJbmRpdmlkdWFsIFBvc2l0aW9uIE9mZnNldCAoRGVsdGEgWCwgRGVsdGEgWikgb24gVGFibGV0b3AgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMDYwYzE3XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHAtMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UHJ6ZXN1bmnEmWNpZSDOlFg8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge2N1cnJlbnRTdWIub2Zmc2V0WCA+PSAwID8gJysnIDogJyd9XG4gICAgICAgICAgICAgICAgICAgIHtjdXJyZW50U3ViLm9mZnNldFgudG9GaXhlZCgyKX1tXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgbWluPXstMC42NX1cbiAgICAgICAgICAgICAgICAgIG1heD17MC42NX1cbiAgICAgICAgICAgICAgICAgIHN0ZXA9ezAuMDJ9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VycmVudFN1Yi5vZmZzZXRYfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZVN1Yk1vZGVsKGN1cnJlbnRTdWIuaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRYOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtZW1lcmFsZC00MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwNjBjMTddIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Qcnplc3VuacSZY2llIM6UWjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1lbWVyYWxkLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y3VycmVudFN1Yi5vZmZzZXRaID49IDAgPyAnKycgOiAnJ31cbiAgICAgICAgICAgICAgICAgICAge2N1cnJlbnRTdWIub2Zmc2V0Wi50b0ZpeGVkKDIpfW1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICBtaW49ey0wLjY1fVxuICAgICAgICAgICAgICAgICAgbWF4PXswLjY1fVxuICAgICAgICAgICAgICAgICAgc3RlcD17MC4wMn1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjdXJyZW50U3ViLm9mZnNldFp9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlU3ViTW9kZWwoY3VycmVudFN1Yi5pZCwge1xuICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFo6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1lbWVyYWxkLTQwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEluZGl2aWR1YWwgUm90YXRpb24gJiBDb3JlIFR5cGUgKyBRdWljayA5OjE2IFByZXNldHMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIuNSBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA2MGMxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwLTJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQtWzExcHhdIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPk9icsOzdCBicnnFgnkgWTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge2N1cnJlbnRTdWIucm90YXRpb25EZWd9wrBcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICBtaW49ey0xODB9XG4gICAgICAgICAgICAgICAgICBtYXg9ezE4MH1cbiAgICAgICAgICAgICAgICAgIHN0ZXA9ezV9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VycmVudFN1Yi5yb3RhdGlvbkRlZ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTdWJNb2RlbChjdXJyZW50U3ViLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgcm90YXRpb25EZWc6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCksXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVTdWJNb2RlbChjdXJyZW50U3ViLmlkLCB7XG4gICAgICAgICAgICAgICAgICAgICAgY29yZVR5cGU6XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ViLmNvcmVUeXBlID09PSAnZ29sZCcgPyAnY3lhbicgOiAnZ29sZCcsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcHktMS41IHB4LTIgcm91bmRlZC1sZyB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50U3ViLmNvcmVUeXBlID09PSAnZ29sZCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci01MDAvMjAgdGV4dC1hbWJlci0zMDAgYm9yZGVyLWFtYmVyLTUwMC81MCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1za3ktNTAwLzIwIHRleHQtc2t5LTMwMCBib3JkZXItc2t5LTUwMC81MCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFJkemXFhDp7JyAnfVxuICAgICAgICAgICAgICAgICAge2N1cnJlbnRTdWIuY29yZVR5cGUgPT09ICdnb2xkJ1xuICAgICAgICAgICAgICAgICAgICA/ICdaxYJvdHkgVGVybWljem55J1xuICAgICAgICAgICAgICAgICAgICA6ICdDeWphbm93eSBCSU0nfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZVN1Yk1vZGVsKGN1cnJlbnRTdWIuaWQsIHtcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aFNjYWxlOiAxLjc1LFxuICAgICAgICAgICAgICAgICAgICAgIGRlcHRoU2NhbGU6IDAuOTUsXG4gICAgICAgICAgICAgICAgICAgICAgZmxvb3JzOiA0NixcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0xIHB4LTIgcm91bmRlZC1sZyB0ZXh0LVsxMHB4XSBmb250LW1vbm8gYmctWyMwNjBjMTddIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgUHJlc2V0IGJyecWCeTogUG96aW9teSA5OjE2XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEZvb3RlciBBY3Rpb25zOiBFeHBvcnQgVW5pZmllZCBTcGF0aWFsIE1vZGVsICYgU2F2ZS9Mb2FkIC5KU09OIEZpbGUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IGJnLVsjMDUwYjE2XSBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29uRXhwb3J0SnNvbn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB5LTIgcHgtMyBiZy1hbWJlci00MDAgaG92ZXI6YmctYW1iZXItMzAwIHRleHQtc2xhdGUtOTUwIGZvbnQtYm9sZCB0ZXh0LXhzIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIFphcGlzeiBQbGlrICguSlNPTilcbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJweS0yIHB4LTMgYmctWyMxMDFlMzZdIGhvdmVyOmJnLVsjMTcyYjRjXSB0ZXh0LXNreS0zMDAgYm9yZGVyIGJvcmRlci1za3ktNTAwLzQwIGZvbnQtYm9sZCB0ZXh0LXhzIHJvdW5kZWQteGwgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPEZvbGRlck9wZW4gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgIFdjenl0YWogUGxpayAoLkpTT04pXG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIlxuICAgICAgICAgICAgICBhY2NlcHQ9XCIuanNvbixhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgICAgICAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICAgICAgICAgIG9uSW1wb3J0SnNvbkZpbGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUV4cG9ydENvbXBvc2l0ZVNwZWN9XG4gICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIgcHgtMyBiZy1za3ktNDAwIGhvdmVyOmJnLXNreS0zMDAgdGV4dC1zbGF0ZS05NTAgZm9udC1ib2xkIHRleHQteHMgcm91bmRlZC14bCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgPlxuICAgICAgICAgIHtjb3BpZWRTcGVjID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICBTa29waW93YW5vIFdzcMOzbG55IE1vZGVsIDNEIGRvIFNjaG93a2FcbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICA8PlxuICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgS29waXVqIFNwZWN5ZmlrYWNqxJkgV3Nww7NsbmVnbyBNb2RlbHUgKEpTT04pXG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==