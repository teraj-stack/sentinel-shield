const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/holoarch/node_modules/.vite/deps/react.js?v=50682de0";
import { ArrowUpRight, ChevronDown, ChevronUp, ChefHat, FileEdit, Home, ShoppingCart } from "/apps/holoarch/node_modules/.vite/deps/lucide-react.js?v=50682de0";
var _jsxFileName = "/app/applet/src/components/InteractiveGlassPanelWidget.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/holoarch/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=50682de0";
const PANEL_SCREEN_DATA = {
	prism: {
		shortLabel: "Alpha Prism",
		titles: [
			"Make It Pop!",
			"BIM Spec LOD-400",
			"Diagrid 9:16 Wing",
			"AR Anchor Sync"
		],
		descriptions: [
			"Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Ut Aliquam, Purus Sit Amet Luctus Venenatis · Ekran Alpha Prism AR",
			"Egzoszkielet Diagridowy 9:16 z rozpoznawaniem blatu i podłogi przez czujniki głębi LiDAR (99.4% Lock).",
			"Struktura nośna kondygnacji BIM, rdzeń konstrukcyjny i nieliniowe ustawienie modeli 3D w układzie łukowym.",
			"Kotwica przestrzenna ARAnchor zsynchronizowana z oświetleniem środowiskowym URP i paralaksą 6DoF."
		]
	},
	turbine: {
		shortLabel: "Orbital Spine",
		titles: [
			"Make It Pop!",
			"Orbital Spine BIM",
			"Kaskada 3D & 9:16",
			"LiDAR Plane Lock"
		],
		descriptions: [
			"Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Ut Aliquam, Purus Sit Amet Luctus Venenatis · Orbital Spine A",
			"Horyzontalny kompleks architektoniczny 9:16 z płynną regulacją ruchu wahadłowego od 0% (Stop).",
			"Wielopłaszczyznowe rozmieszczenie budynków poza jedną linią wraz z okluzją głębi mebli.",
			"Gotowy profil ARFoundation (ARKit 6 + ARCore Depth API) z kalibracją wymiaru blatu i sali."
		]
	},
	core: {
		shortLabel: "Core Sync",
		titles: [
			"Make It Pop!",
			"Core Sync Nexus",
			"9:16 Horizon Wing",
			"Unity 6 URP Sync"
		],
		descriptions: [
			"Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Ut Aliquam, Purus Sit Amet Luctus Venenatis · Core Sync Neural",
			"Centralny klaster wieżowców ze złotym rdzeniem, harmonikami sferycznymi i odbiciami na blacie stołu.",
			"Proporcje modeli 9:16 i rozstrzelenie warstw stropów BIM z dynamicznymi cząsteczkami za oknem.",
			"Maska szablonowa Stencil Buffer = 2 dla portali okiennych oraz stabilizacja SLAM 6DoF."
		]
	},
	biosphere: {
		shortLabel: "Biosphere II",
		titles: [
			"Make It Pop!",
			"Bio-Sphere Cure II",
			"Eco Atria & 9:16",
			"Env Light Probe"
		],
		descriptions: [
			"Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Ut Aliquam, Purus Sit Amet Luctus Venenatis · Ecological Cure II",
			"Zintegrowane atria biologiczne i ogrody pionowe reagujące na kierunek światła słonecznego z okien.",
			"Grupy 2–5 budynków rozmieszczone na siatce 3D z adaptacyjną gęstością siatki hologramu LOD.",
			"Aktywna sonda środowiskowa ARCameraManager i strumieniowanie telemetrii wydajności GPU."
		]
	},
	neural: {
		shortLabel: "Neural Array",
		titles: [
			"Make It Pop!",
			"Neural Array 3D",
			"Spatial Topology",
			"6DoF Depth Matrix"
		],
		descriptions: [
			"Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Ut Aliquam, Purus Sit Amet Luctus Venenatis · Active Neural Mesh",
			"Wieloplanowa siatka neuronowa i węzły konstrukcyjne z głębią obrazu podczas ruchu wokół stołu.",
			"Poziome skrzydła 9:16 połączone z iglicami wschodnimi i precyzyjną okluzją głębi AR.",
			"Synchronizacja wszystkich 5 szklanych ekranów 3D — kliknij ikony dokowania poniżej lub w scenie 3D."
		]
	}
};
export const InteractiveGlassPanelWidget = ({ config, activePanelType, activeIconIndex, isExpanded, onToggleExpand, onSelectPanelType, onSelectIconIndex, onUpdateConfig, onActionArrowClick }) => {
	const safeIconIdx = (activeIconIndex % 4 + 4) % 4;
	const currentData = PANEL_SCREEN_DATA[activePanelType];
	const isUltraClear98 = config.hudScreenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)";
	const handleDockIconClick = (idx) => {
		onSelectIconIndex(idx);
		// Also trigger a subtle visual interaction in the 3D scene when clicking dock icons
		if (idx === 0) {
			onUpdateConfig({ cameraPreset: "overview" });
		} else if (idx === 1) {
			onUpdateConfig({ cameraPreset: "tabletop_close" });
		} else if (idx === 2) {
			onUpdateConfig({ explodedView: config.explodedView > .3 ? 0 : .55 });
		} else if (idx === 3) {
			onUpdateConfig({
				showDepthGrid: true,
				triggerScanPulse: Date.now()
			});
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "mt-2.5 pointer-events-auto",
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "flex flex-wrap items-center justify-between gap-1.5 mb-2",
			children: [/* @__PURE__ */ _jsxDEV("button", {
				type: "button",
				onClick: onToggleExpand,
				className: `px-3 py-1.5 text-xs font-semibold rounded-xl border shadow-lg transition-colors flex items-center gap-1.5 ${isUltraClear98 ? "bg-white/5 text-violet-100 border-white/80 hover:bg-white/10" : "bg-[#ebe8ff]/90 text-[#4c37c4] border-white/90 hover:bg-[#f3f1ff]"}`,
				children: [/* @__PURE__ */ _jsxDEV("span", { children: isUltraClear98 ? "Szklany Ekran (98% Przezroczysty)" : "Szklany Panel Interaktywny (Ekrany 3D)" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 164,
					columnNumber: 11
				}, this), isExpanded ? /* @__PURE__ */ _jsxDEV(ChevronUp, { className: "w-3.5 h-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 170,
					columnNumber: 13
				}, this) : /* @__PURE__ */ _jsxDEV(ChevronDown, { className: "w-3.5 h-3.5" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 172,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 155,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => onUpdateConfig({
						hudScreenStyle: isUltraClear98 ? "Szklany Panel Interaktywny (Frosted Glass UI)" : "Szklany Ekran Krystaliczny (98% Przezroczystości)",
						showFloatingHudPanels: true
					}),
					title: "Przełącz wariant szklanych ekranów przezroczystych w 98%",
					className: `px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${isUltraClear98 ? "bg-violet-500/30 border-white/90 text-white shadow-md" : "bg-[#091220]/95 border-slate-700 text-violet-300 hover:border-violet-400"}`,
					children: "98% Przezroczysty"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("select", {
					value: config.hudScreenStyle,
					onChange: (e) => onUpdateConfig({
						hudScreenStyle: e.target.value,
						showFloatingHudPanels: true
					}),
					"aria-label": "Styl ekranów 3D",
					className: "bg-[#091220]/95 border border-slate-700/90 rounded-lg px-2 py-1 text-[11px] text-slate-200 focus:outline-none focus:border-sky-400",
					children: [
						/* @__PURE__ */ _jsxDEV("option", {
							value: "Szklany Panel Interaktywny (Frosted Glass UI)",
							children: "Frosted Glass (Mleczno-Lawendowy)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 208,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("option", {
							value: "Szklany Ekran Krystaliczny (98% Przezroczystości)",
							children: "Szklany Krystaliczny (98% Przezroczystości)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 211,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("option", {
							value: "Hologram Techniczny CAD (Ciemny Cyjan)",
							children: "Hologram CAD (Ciemny Cyjan)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 214,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 197,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 176,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 154,
			columnNumber: 7
		}, this), isExpanded && /* @__PURE__ */ _jsxDEV("div", {
			className: "relative w-[320px] sm:w-[348px]",
			children: [/* @__PURE__ */ _jsxDEV("svg", {
				viewBox: "0 0 80 80",
				style: { opacity: isUltraClear98 ? .55 : 1 },
				className: "w-12 h-12 absolute -right-4 top-10 z-20 pointer-events-none drop-shadow-md transition-opacity",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ _jsxDEV("polygon", {
						points: "40,6 72,26 60,66 20,66 8,26",
						fill: "#d4c6ff",
						stroke: "#ede7ff",
						strokeWidth: "2"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 230,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("polygon", {
						points: "40,6 72,26 40,42",
						fill: "#e5dcff",
						opacity: "0.85"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 236,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("polygon", {
						points: "8,26 40,6 40,42",
						fill: "#c4b2fc",
						opacity: "0.9"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 237,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("polygon", {
						points: "8,26 40,42 20,66",
						fill: "#ab96f4",
						opacity: "0.9"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 238,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("polygon", {
						points: "72,26 60,66 40,42",
						fill: "#bca8fa",
						opacity: "0.9"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 239,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("polygon", {
						points: "40,42 60,66 20,66",
						fill: "#9a82ea",
						opacity: "0.9"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 240,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 224,
				columnNumber: 11
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				style: isUltraClear98 ? {
					background: "linear-gradient(145deg, rgba(245, 245, 255, 0.02) 0%, rgba(230, 226, 254, 0.02) 52%, rgba(220, 215, 251, 0.02) 100%)",
					boxShadow: "0 16px 40px rgba(8, 6, 25, 0.35), inset 0 1px 3px rgba(255, 255, 255, 0.85)"
				} : {
					background: "linear-gradient(145deg, rgba(245, 245, 255, 0.92) 0%, rgba(230, 226, 254, 0.88) 52%, rgba(220, 215, 251, 0.91) 100%)",
					boxShadow: "0 20px 50px rgba(15, 12, 45, 0.48), inset 0 2px 3px rgba(255, 255, 255, 0.95)"
				},
				className: `relative rounded-[32px] border-[2.5px] border-white/95 overflow-hidden transition-all ${isUltraClear98 ? "text-white" : "text-[#4c37c4]"}`,
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						style: { background: isUltraClear98 ? "linear-gradient(115deg, rgba(255,255,255,0) 22%, rgba(255,255,255,0.08) 48%, rgba(255,255,255,0) 74%)" : "linear-gradient(115deg, rgba(255,255,255,0) 22%, rgba(255,255,255,0.62) 48%, rgba(255,255,255,0) 74%)" },
						className: "absolute inset-0 pointer-events-none"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 265,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "relative z-10 px-6 pt-5 pb-4",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-1 mb-3 overflow-x-auto pb-0.5",
								children: [
									"prism",
									"turbine",
									"core",
									"biosphere",
									"neural"
								].map((pType) => /* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => onSelectPanelType(pType),
									className: `px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors whitespace-nowrap ${activePanelType === pType ? "bg-[#543ad6] text-white shadow-sm" : isUltraClear98 ? "bg-white/10 text-violet-100 border border-white/30 hover:bg-white/20" : "bg-white/55 text-[#543ad6] hover:bg-white/80"}`,
									children: PANEL_SCREEN_DATA[pType].shortLabel
								}, pType, false, {
									fileName: _jsxFileName,
									lineNumber: 281,
									columnNumber: 19
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 277,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("h2", {
								style: isUltraClear98 ? { textShadow: "0 2px 10px rgba(10, 8, 30, 0.9)" } : undefined,
								className: `text-2xl font-extrabold tracking-tight font-display leading-tight ${isUltraClear98 ? "text-white" : "text-[#4b35c4]"}`,
								children: currentData.titles[safeIconIdx]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 299,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								style: isUltraClear98 ? { textShadow: "0 1px 8px rgba(10, 8, 30, 0.95)" } : undefined,
								className: `mt-2 text-xs font-medium leading-relaxed ${isUltraClear98 ? "text-violet-100" : "text-[#5844c2]"}`,
								children: currentData.descriptions[safeIconIdx]
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 313,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-4 flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: onActionArrowClick,
									title: "Otwórz specyfikację promptu i kodu AR",
									className: "group p-1.5 rounded-xl hover:bg-white/25 transition-colors",
									children: /* @__PURE__ */ _jsxDEV(ArrowUpRight, { className: `w-7 h-7 transition-colors stroke-[2.25] ${isUltraClear98 ? "text-violet-200 group-hover:text-white" : "text-[#b3a2f8] group-hover:text-[#543ad6]"}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 334,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 328,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: `text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full border ${isUltraClear98 ? "text-violet-100 bg-white/5 border-white/80" : "text-[#5b47c6]/80 bg-white/55 border-white/80"}`,
									children: isUltraClear98 ? `SZKŁO 98% · TRYB 0${safeIconIdx + 1}/04` : `EKRAN 3D · TRYB 0{safeIconIdx + 1}/04`.replace("{safeIconIdx + 1}", String(safeIconIdx + 1))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 327,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 275,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						style: { background: isUltraClear98 ? "linear-gradient(180deg, rgba(244, 242, 255, 0.02) 0%, rgba(232, 228, 254, 0.03) 100%)" : "linear-gradient(180deg, rgba(244, 242, 255, 0.72) 0%, rgba(232, 228, 254, 0.92) 100%)" },
						className: "relative z-10 rounded-t-[28px] border-t-[2.5px] border-white/95 px-5 py-3.5 flex items-center justify-between",
						children: [
							{
								idx: 0,
								Icon: Home,
								label: "Widok główny ekranu (Make It Pop!)"
							},
							{
								idx: 1,
								Icon: FileEdit,
								label: "Specyfikacja BIM i zbliżenie"
							},
							{
								idx: 2,
								Icon: ChefHat,
								label: "Struktura kondygnacji i rozstrzelenie BIM"
							},
							{
								idx: 3,
								Icon: ShoppingCart,
								label: "Synchronizacja kotwic LiDAR i eksport AR"
							}
						].map(({ idx, Icon, label }) => {
							const isActive = safeIconIdx === idx;
							return /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => handleDockIconClick(idx),
								"aria-label": label,
								title: label,
								style: isActive ? {
									background: "radial-gradient(circle at 35% 30%, #6e55f0 0%, #543ad6 65%, #442bb8 100%)",
									boxShadow: "0 6px 18px rgba(84, 58, 214, 0.48), 0 0 0 3px rgba(208, 198, 255, 0.85)"
								} : isUltraClear98 ? {
									background: "rgba(236, 233, 255, 0.03)",
									boxShadow: "0 0 0 3px rgba(221, 214, 254, 0.35), inset 0 1px 2px rgba(255,255,255,0.75)"
								} : {
									background: "rgba(236, 233, 255, 0.72)",
									boxShadow: "0 0 0 3px rgba(196, 186, 248, 0.38), inset 0 1px 2px rgba(255,255,255,0.9)"
								},
								className: `w-11 h-11 rounded-full flex items-center justify-center transition-all ${isActive ? "text-white scale-105" : isUltraClear98 ? "text-white border border-white/80 hover:scale-105" : "text-[#503ac2] border border-[#a99bf0]/75 hover:scale-105"}`,
								children: /* @__PURE__ */ _jsxDEV(Icon, { className: "w-5 h-5 stroke-[2.2]" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 419,
									columnNumber: 21
								}, this)
							}, idx, false, {
								fileName: _jsxFileName,
								lineNumber: 385,
								columnNumber: 19
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 361,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 244,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 222,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 152,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QU87UUFDUCxPQUNFLFdBQ0k7U0FDRSxZQUNFO1NBQ0YsV0FDRTtRQUNKLElBQ0EsaUJBQ0E7U0FDRSxZQUFZO1NBQ1osV0FDRTtRQUNKLElBQ0E7U0FDRSxZQUFZO1NBQ1osV0FDRTtRQUNKO1FBRU4sV0FBVywwRUFDVCxXQUNJLHlCQUNBLGlCQUNBLHNEQUNBO2tCQUdOLHdCQUFDLE1BQUQsRUFBTSxXQUFVLHVCQUF3Qjs7Ozs7T0FDbEMsR0FsQ0Q7Ozs7Y0FrQ0M7TUFFWixDQUFDO0tBQ0U7Ozs7O0lBQ0Y7Ozs7O1dBQ0Y7Ozs7O1VBRUo7Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkludGVyYWN0aXZlR2xhc3NQYW5lbFdpZGdldC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEFycm93VXBSaWdodCxcbiAgQ2hldnJvbkRvd24sXG4gIENoZXZyb25VcCxcbiAgQ2hlZkhhdCxcbiAgRmlsZUVkaXQsXG4gIEhvbWUsXG4gIFNob3BwaW5nQ2FydCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7XG4gIEFSU3R1ZGlvQ29uZmlnLFxuICBIdWRQYW5lbFR5cGUsXG4gIEh1ZFNjcmVlblN0eWxlT3B0aW9uLFxufSBmcm9tICcuLi90eXBlcy9hclN0dWRpbyc7XG5cbmludGVyZmFjZSBJbnRlcmFjdGl2ZUdsYXNzUGFuZWxXaWRnZXRQcm9wcyB7XG4gIGNvbmZpZzogQVJTdHVkaW9Db25maWc7XG4gIGFjdGl2ZVBhbmVsVHlwZTogSHVkUGFuZWxUeXBlO1xuICBhY3RpdmVJY29uSW5kZXg6IG51bWJlcjtcbiAgaXNFeHBhbmRlZDogYm9vbGVhbjtcbiAgb25Ub2dnbGVFeHBhbmQ6ICgpID0+IHZvaWQ7XG4gIG9uU2VsZWN0UGFuZWxUeXBlOiAocGFuZWxUeXBlOiBIdWRQYW5lbFR5cGUpID0+IHZvaWQ7XG4gIG9uU2VsZWN0SWNvbkluZGV4OiAoaWR4OiBudW1iZXIpID0+IHZvaWQ7XG4gIG9uVXBkYXRlQ29uZmlnOiAocGFydGlhbDogUGFydGlhbDxBUlN0dWRpb0NvbmZpZz4pID0+IHZvaWQ7XG4gIG9uQWN0aW9uQXJyb3dDbGljazogKCkgPT4gdm9pZDtcbn1cblxuY29uc3QgUEFORUxfU0NSRUVOX0RBVEE6IFJlY29yZDxcbiAgSHVkUGFuZWxUeXBlLFxuICB7XG4gICAgc2hvcnRMYWJlbDogc3RyaW5nO1xuICAgIHRpdGxlczogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG4gICAgZGVzY3JpcHRpb25zOiBbc3RyaW5nLCBzdHJpbmcsIHN0cmluZywgc3RyaW5nXTtcbiAgfVxuPiA9IHtcbiAgcHJpc206IHtcbiAgICBzaG9ydExhYmVsOiAnQWxwaGEgUHJpc20nLFxuICAgIHRpdGxlczogW1xuICAgICAgJ01ha2UgSXQgUG9wIScsXG4gICAgICAnQklNIFNwZWMgTE9ELTQwMCcsXG4gICAgICAnRGlhZ3JpZCA5OjE2IFdpbmcnLFxuICAgICAgJ0FSIEFuY2hvciBTeW5jJyxcbiAgICBdLFxuICAgIGRlc2NyaXB0aW9uczogW1xuICAgICAgJ0xvcmVtIElwc3VtIERvbG9yIFNpdCBBbWV0LCBDb25zZWN0ZXR1ciBBZGlwaXNjaW5nIEVsaXQgVXQgQWxpcXVhbSwgUHVydXMgU2l0IEFtZXQgTHVjdHVzIFZlbmVuYXRpcyDCtyBFa3JhbiBBbHBoYSBQcmlzbSBBUicsXG4gICAgICAnRWd6b3N6a2llbGV0IERpYWdyaWRvd3kgOToxNiB6IHJvenBvem5hd2FuaWVtIGJsYXR1IGkgcG9kxYJvZ2kgcHJ6ZXogY3p1am5pa2kgZ8WCxJliaSBMaURBUiAoOTkuNCUgTG9jaykuJyxcbiAgICAgICdTdHJ1a3R1cmEgbm/Fm25hIGtvbmR5Z25hY2ppIEJJTSwgcmR6ZcWEIGtvbnN0cnVrY3lqbnkgaSBuaWVsaW5pb3dlIHVzdGF3aWVuaWUgbW9kZWxpIDNEIHcgdWvFgmFkemllIMWCdWtvd3ltLicsXG4gICAgICAnS290d2ljYSBwcnplc3RyemVubmEgQVJBbmNob3IgenN5bmNocm9uaXpvd2FuYSB6IG/Fm3dpZXRsZW5pZW0gxZtyb2Rvd2lza293eW0gVVJQIGkgcGFyYWxha3PEhSA2RG9GLicsXG4gICAgXSxcbiAgfSxcbiAgdHVyYmluZToge1xuICAgIHNob3J0TGFiZWw6ICdPcmJpdGFsIFNwaW5lJyxcbiAgICB0aXRsZXM6IFtcbiAgICAgICdNYWtlIEl0IFBvcCEnLFxuICAgICAgJ09yYml0YWwgU3BpbmUgQklNJyxcbiAgICAgICdLYXNrYWRhIDNEICYgOToxNicsXG4gICAgICAnTGlEQVIgUGxhbmUgTG9jaycsXG4gICAgXSxcbiAgICBkZXNjcmlwdGlvbnM6IFtcbiAgICAgICdMb3JlbSBJcHN1bSBEb2xvciBTaXQgQW1ldCwgQ29uc2VjdGV0dXIgQWRpcGlzY2luZyBFbGl0IFV0IEFsaXF1YW0sIFB1cnVzIFNpdCBBbWV0IEx1Y3R1cyBWZW5lbmF0aXMgwrcgT3JiaXRhbCBTcGluZSBBJyxcbiAgICAgICdIb3J5em9udGFsbnkga29tcGxla3MgYXJjaGl0ZWt0b25pY3pueSA5OjE2IHogcMWCeW5uxIUgcmVndWxhY2rEhSBydWNodSB3YWhhZMWCb3dlZ28gb2QgMCUgKFN0b3ApLicsXG4gICAgICAnV2llbG9wxYJhc3pjenl6bm93ZSByb3ptaWVzemN6ZW5pZSBidWR5bmvDs3cgcG96YSBqZWRuxIUgbGluacSFIHdyYXogeiBva2x1emrEhSBnxYLEmWJpIG1lYmxpLicsXG4gICAgICAnR290b3d5IHByb2ZpbCBBUkZvdW5kYXRpb24gKEFSS2l0IDYgKyBBUkNvcmUgRGVwdGggQVBJKSB6IGthbGlicmFjasSFIHd5bWlhcnUgYmxhdHUgaSBzYWxpLicsXG4gICAgXSxcbiAgfSxcbiAgY29yZToge1xuICAgIHNob3J0TGFiZWw6ICdDb3JlIFN5bmMnLFxuICAgIHRpdGxlczogW1xuICAgICAgJ01ha2UgSXQgUG9wIScsXG4gICAgICAnQ29yZSBTeW5jIE5leHVzJyxcbiAgICAgICc5OjE2IEhvcml6b24gV2luZycsXG4gICAgICAnVW5pdHkgNiBVUlAgU3luYycsXG4gICAgXSxcbiAgICBkZXNjcmlwdGlvbnM6IFtcbiAgICAgICdMb3JlbSBJcHN1bSBEb2xvciBTaXQgQW1ldCwgQ29uc2VjdGV0dXIgQWRpcGlzY2luZyBFbGl0IFV0IEFsaXF1YW0sIFB1cnVzIFNpdCBBbWV0IEx1Y3R1cyBWZW5lbmF0aXMgwrcgQ29yZSBTeW5jIE5ldXJhbCcsXG4gICAgICAnQ2VudHJhbG55IGtsYXN0ZXIgd2llxbxvd2PDs3cgemUgesWCb3R5bSByZHplbmllbSwgaGFybW9uaWthbWkgc2Zlcnljem55bWkgaSBvZGJpY2lhbWkgbmEgYmxhY2llIHN0b8WCdS4nLFxuICAgICAgJ1Byb3BvcmNqZSBtb2RlbGkgOToxNiBpIHJvenN0cnplbGVuaWUgd2Fyc3R3IHN0cm9ww7N3IEJJTSB6IGR5bmFtaWN6bnltaSBjesSFc3RlY3prYW1pIHphIG9rbmVtLicsXG4gICAgICAnTWFza2Egc3phYmxvbm93YSBTdGVuY2lsIEJ1ZmZlciA9IDIgZGxhIHBvcnRhbGkgb2tpZW5ueWNoIG9yYXogc3RhYmlsaXphY2phIFNMQU0gNkRvRi4nLFxuICAgIF0sXG4gIH0sXG4gIGJpb3NwaGVyZToge1xuICAgIHNob3J0TGFiZWw6ICdCaW9zcGhlcmUgSUknLFxuICAgIHRpdGxlczogW1xuICAgICAgJ01ha2UgSXQgUG9wIScsXG4gICAgICAnQmlvLVNwaGVyZSBDdXJlIElJJyxcbiAgICAgICdFY28gQXRyaWEgJiA5OjE2JyxcbiAgICAgICdFbnYgTGlnaHQgUHJvYmUnLFxuICAgIF0sXG4gICAgZGVzY3JpcHRpb25zOiBbXG4gICAgICAnTG9yZW0gSXBzdW0gRG9sb3IgU2l0IEFtZXQsIENvbnNlY3RldHVyIEFkaXBpc2NpbmcgRWxpdCBVdCBBbGlxdWFtLCBQdXJ1cyBTaXQgQW1ldCBMdWN0dXMgVmVuZW5hdGlzIMK3IEVjb2xvZ2ljYWwgQ3VyZSBJSScsXG4gICAgICAnWmludGVncm93YW5lIGF0cmlhIGJpb2xvZ2ljem5lIGkgb2dyb2R5IHBpb25vd2UgcmVhZ3VqxIVjZSBuYSBraWVydW5layDFm3dpYXTFgmEgc8WCb25lY3puZWdvIHogb2tpZW4uJyxcbiAgICAgICdHcnVweSAy4oCTNSBidWR5bmvDs3cgcm96bWllc3pjem9uZSBuYSBzaWF0Y2UgM0QgeiBhZGFwdGFjeWpuxIUgZ8SZc3RvxZtjacSFIHNpYXRraSBob2xvZ3JhbXUgTE9ELicsXG4gICAgICAnQWt0eXduYSBzb25kYSDFm3JvZG93aXNrb3dhIEFSQ2FtZXJhTWFuYWdlciBpIHN0cnVtaWVuaW93YW5pZSB0ZWxlbWV0cmlpIHd5ZGFqbm/Fm2NpIEdQVS4nLFxuICAgIF0sXG4gIH0sXG4gIG5ldXJhbDoge1xuICAgIHNob3J0TGFiZWw6ICdOZXVyYWwgQXJyYXknLFxuICAgIHRpdGxlczogW1xuICAgICAgJ01ha2UgSXQgUG9wIScsXG4gICAgICAnTmV1cmFsIEFycmF5IDNEJyxcbiAgICAgICdTcGF0aWFsIFRvcG9sb2d5JyxcbiAgICAgICc2RG9GIERlcHRoIE1hdHJpeCcsXG4gICAgXSxcbiAgICBkZXNjcmlwdGlvbnM6IFtcbiAgICAgICdMb3JlbSBJcHN1bSBEb2xvciBTaXQgQW1ldCwgQ29uc2VjdGV0dXIgQWRpcGlzY2luZyBFbGl0IFV0IEFsaXF1YW0sIFB1cnVzIFNpdCBBbWV0IEx1Y3R1cyBWZW5lbmF0aXMgwrcgQWN0aXZlIE5ldXJhbCBNZXNoJyxcbiAgICAgICdXaWVsb3BsYW5vd2Egc2lhdGthIG5ldXJvbm93YSBpIHfEmXrFgnkga29uc3RydWtjeWpuZSB6IGfFgsSZYmnEhSBvYnJhenUgcG9kY3phcyBydWNodSB3b2vDs8WCIHN0b8WCdS4nLFxuICAgICAgJ1BvemlvbWUgc2tyenlkxYJhIDk6MTYgcG/FgsSFY3pvbmUgeiBpZ2xpY2FtaSB3c2Nob2RuaW1pIGkgcHJlY3l6eWpuxIUgb2tsdXpqxIUgZ8WCxJliaSBBUi4nLFxuICAgICAgJ1N5bmNocm9uaXphY2phIHdzenlzdGtpY2ggNSBzemtsYW55Y2ggZWtyYW7Ds3cgM0Qg4oCUIGtsaWtuaWogaWtvbnkgZG9rb3dhbmlhIHBvbmnFvGVqIGx1YiB3IHNjZW5pZSAzRC4nLFxuICAgIF0sXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgSW50ZXJhY3RpdmVHbGFzc1BhbmVsV2lkZ2V0OiBSZWFjdC5GQzxcbiAgSW50ZXJhY3RpdmVHbGFzc1BhbmVsV2lkZ2V0UHJvcHNcbj4gPSAoe1xuICBjb25maWcsXG4gIGFjdGl2ZVBhbmVsVHlwZSxcbiAgYWN0aXZlSWNvbkluZGV4LFxuICBpc0V4cGFuZGVkLFxuICBvblRvZ2dsZUV4cGFuZCxcbiAgb25TZWxlY3RQYW5lbFR5cGUsXG4gIG9uU2VsZWN0SWNvbkluZGV4LFxuICBvblVwZGF0ZUNvbmZpZyxcbiAgb25BY3Rpb25BcnJvd0NsaWNrLFxufSkgPT4ge1xuICBjb25zdCBzYWZlSWNvbklkeCA9ICgoYWN0aXZlSWNvbkluZGV4ICUgNCkgKyA0KSAlIDQ7XG4gIGNvbnN0IGN1cnJlbnREYXRhID0gUEFORUxfU0NSRUVOX0RBVEFbYWN0aXZlUGFuZWxUeXBlXTtcbiAgY29uc3QgaXNVbHRyYUNsZWFyOTggPVxuICAgIGNvbmZpZy5odWRTY3JlZW5TdHlsZSA9PT0gJ1N6a2xhbnkgRWtyYW4gS3J5c3RhbGljem55ICg5OCUgUHJ6ZXpyb2N6eXN0b8WbY2kpJztcblxuICBjb25zdCBoYW5kbGVEb2NrSWNvbkNsaWNrID0gKGlkeDogbnVtYmVyKSA9PiB7XG4gICAgb25TZWxlY3RJY29uSW5kZXgoaWR4KTtcbiAgICAvLyBBbHNvIHRyaWdnZXIgYSBzdWJ0bGUgdmlzdWFsIGludGVyYWN0aW9uIGluIHRoZSAzRCBzY2VuZSB3aGVuIGNsaWNraW5nIGRvY2sgaWNvbnNcbiAgICBpZiAoaWR4ID09PSAwKSB7XG4gICAgICBvblVwZGF0ZUNvbmZpZyh7IGNhbWVyYVByZXNldDogJ292ZXJ2aWV3JyB9KTtcbiAgICB9IGVsc2UgaWYgKGlkeCA9PT0gMSkge1xuICAgICAgb25VcGRhdGVDb25maWcoeyBjYW1lcmFQcmVzZXQ6ICd0YWJsZXRvcF9jbG9zZScgfSk7XG4gICAgfSBlbHNlIGlmIChpZHggPT09IDIpIHtcbiAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgZXhwbG9kZWRWaWV3OiBjb25maWcuZXhwbG9kZWRWaWV3ID4gMC4zID8gMC4wIDogMC41NSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaWR4ID09PSAzKSB7XG4gICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgIHNob3dEZXB0aEdyaWQ6IHRydWUsXG4gICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIuNSBwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICB7LyogQ29tcGFjdCBUb2dnbGUgSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0xLjUgbWItMlwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17b25Ub2dnbGVFeHBhbmR9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQteGwgYm9yZGVyIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICBpc1VsdHJhQ2xlYXI5OFxuICAgICAgICAgICAgICA/ICdiZy13aGl0ZS81IHRleHQtdmlvbGV0LTEwMCBib3JkZXItd2hpdGUvODAgaG92ZXI6Ymctd2hpdGUvMTAnXG4gICAgICAgICAgICAgIDogJ2JnLVsjZWJlOGZmXS85MCB0ZXh0LVsjNGMzN2M0XSBib3JkZXItd2hpdGUvOTAgaG92ZXI6YmctWyNmM2YxZmZdJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7aXNVbHRyYUNsZWFyOThcbiAgICAgICAgICAgICAgPyAnU3prbGFueSBFa3JhbiAoOTglIFByemV6cm9jenlzdHkpJ1xuICAgICAgICAgICAgICA6ICdTemtsYW55IFBhbmVsIEludGVyYWt0eXdueSAoRWtyYW55IDNEKSd9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIHtpc0V4cGFuZGVkID8gKFxuICAgICAgICAgICAgPENoZXZyb25VcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxDaGV2cm9uRG93biBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgaHVkU2NyZWVuU3R5bGU6IGlzVWx0cmFDbGVhcjk4XG4gICAgICAgICAgICAgICAgICA/ICdTemtsYW55IFBhbmVsIEludGVyYWt0eXdueSAoRnJvc3RlZCBHbGFzcyBVSSknXG4gICAgICAgICAgICAgICAgICA6ICdTemtsYW55IEVrcmFuIEtyeXN0YWxpY3pueSAoOTglIFByemV6cm9jenlzdG/Fm2NpKScsXG4gICAgICAgICAgICAgICAgc2hvd0Zsb2F0aW5nSHVkUGFuZWxzOiB0cnVlLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGl0bGU9XCJQcnplxYLEhWN6IHdhcmlhbnQgc3prbGFueWNoIGVrcmFuw7N3IHByemV6cm9jenlzdHljaCB3IDk4JVwiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSB0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1zZW1pYm9sZCByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICBpc1VsdHJhQ2xlYXI5OFxuICAgICAgICAgICAgICAgID8gJ2JnLXZpb2xldC01MDAvMzAgYm9yZGVyLXdoaXRlLzkwIHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgIDogJ2JnLVsjMDkxMjIwXS85NSBib3JkZXItc2xhdGUtNzAwIHRleHQtdmlvbGV0LTMwMCBob3Zlcjpib3JkZXItdmlvbGV0LTQwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDk4JSBQcnplenJvY3p5c3R5XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICB2YWx1ZT17Y29uZmlnLmh1ZFNjcmVlblN0eWxlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgaHVkU2NyZWVuU3R5bGU6IGUudGFyZ2V0LnZhbHVlIGFzIEh1ZFNjcmVlblN0eWxlT3B0aW9uLFxuICAgICAgICAgICAgICAgIHNob3dGbG9hdGluZ0h1ZFBhbmVsczogdHJ1ZSxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJTdHlsIGVrcmFuw7N3IDNEXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLVsjMDkxMjIwXS85NSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC85MCByb3VuZGVkLWxnIHB4LTIgcHktMSB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTemtsYW55IFBhbmVsIEludGVyYWt0eXdueSAoRnJvc3RlZCBHbGFzcyBVSSlcIj5cbiAgICAgICAgICAgICAgRnJvc3RlZCBHbGFzcyAoTWxlY3puby1MYXdlbmRvd3kpXG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJTemtsYW55IEVrcmFuIEtyeXN0YWxpY3pueSAoOTglIFByemV6cm9jenlzdG/Fm2NpKVwiPlxuICAgICAgICAgICAgICBTemtsYW55IEtyeXN0YWxpY3pueSAoOTglIFByemV6cm9jenlzdG/Fm2NpKVxuICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSG9sb2dyYW0gVGVjaG5pY3pueSBDQUQgKENpZW1ueSBDeWphbilcIj5cbiAgICAgICAgICAgICAgSG9sb2dyYW0gQ0FEIChDaWVtbnkgQ3lqYW4pXG4gICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAge2lzRXhwYW5kZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctWzMyMHB4XSBzbTp3LVszNDhweF1cIj5cbiAgICAgICAgICB7LyogRGVjb3JhdGl2ZSBGYWNldGVkIExhdmVuZGVyIDNEIFBvbHloZWRyb24gR2VtIG9uIHRoZSByaWdodCBlZGdlIChtYXRjaGluZyByZWZlcmVuY2UgaW1hZ2UpICovfVxuICAgICAgICAgIDxzdmdcbiAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgODAgODBcIlxuICAgICAgICAgICAgc3R5bGU9e3sgb3BhY2l0eTogaXNVbHRyYUNsZWFyOTggPyAwLjU1IDogMSB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMiBoLTEyIGFic29sdXRlIC1yaWdodC00IHRvcC0xMCB6LTIwIHBvaW50ZXItZXZlbnRzLW5vbmUgZHJvcC1zaGFkb3ctbWQgdHJhbnNpdGlvbi1vcGFjaXR5XCJcbiAgICAgICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHBvbHlnb25cbiAgICAgICAgICAgICAgcG9pbnRzPVwiNDAsNiA3MiwyNiA2MCw2NiAyMCw2NiA4LDI2XCJcbiAgICAgICAgICAgICAgZmlsbD1cIiNkNGM2ZmZcIlxuICAgICAgICAgICAgICBzdHJva2U9XCIjZWRlN2ZmXCJcbiAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIyXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCI0MCw2IDcyLDI2IDQwLDQyXCIgZmlsbD1cIiNlNWRjZmZcIiBvcGFjaXR5PVwiMC44NVwiIC8+XG4gICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCI4LDI2IDQwLDYgNDAsNDJcIiBmaWxsPVwiI2M0YjJmY1wiIG9wYWNpdHk9XCIwLjlcIiAvPlxuICAgICAgICAgICAgPHBvbHlnb24gcG9pbnRzPVwiOCwyNiA0MCw0MiAyMCw2NlwiIGZpbGw9XCIjYWI5NmY0XCIgb3BhY2l0eT1cIjAuOVwiIC8+XG4gICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCI3MiwyNiA2MCw2NiA0MCw0MlwiIGZpbGw9XCIjYmNhOGZhXCIgb3BhY2l0eT1cIjAuOVwiIC8+XG4gICAgICAgICAgICA8cG9seWdvbiBwb2ludHM9XCI0MCw0MiA2MCw2NiAyMCw2NlwiIGZpbGw9XCIjOWE4MmVhXCIgb3BhY2l0eT1cIjAuOVwiIC8+XG4gICAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgICB7LyogTWFpbiBJbnRlcmFjdGl2ZSBHbGFzcyBDYXJkIChGcm9zdGVkIEdsYXNzIG9yIDk4JSBUcmFuc3BhcmVudCBDcnlzdGFsIEdsYXNzKSAqL31cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgIGlzVWx0cmFDbGVhcjk4XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAgICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgxNDVkZWcsIHJnYmEoMjQ1LCAyNDUsIDI1NSwgMC4wMikgMCUsIHJnYmEoMjMwLCAyMjYsIDI1NCwgMC4wMikgNTIlLCByZ2JhKDIyMCwgMjE1LCAyNTEsIDAuMDIpIDEwMCUpJyxcbiAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OlxuICAgICAgICAgICAgICAgICAgICAgICcwIDE2cHggNDBweCByZ2JhKDgsIDYsIDI1LCAwLjM1KSwgaW5zZXQgMCAxcHggM3B4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSknLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMTQ1ZGVnLCByZ2JhKDI0NSwgMjQ1LCAyNTUsIDAuOTIpIDAlLCByZ2JhKDIzMCwgMjI2LCAyNTQsIDAuODgpIDUyJSwgcmdiYSgyMjAsIDIxNSwgMjUxLCAwLjkxKSAxMDAlKScsXG4gICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzpcbiAgICAgICAgICAgICAgICAgICAgICAnMCAyMHB4IDUwcHggcmdiYSgxNSwgMTIsIDQ1LCAwLjQ4KSwgaW5zZXQgMCAycHggM3B4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSknLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcm91bmRlZC1bMzJweF0gYm9yZGVyLVsyLjVweF0gYm9yZGVyLXdoaXRlLzk1IG92ZXJmbG93LWhpZGRlbiB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBpc1VsdHJhQ2xlYXI5OCA/ICd0ZXh0LXdoaXRlJyA6ICd0ZXh0LVsjNGMzN2M0XSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsvKiBEaWFnb25hbCBXaGl0ZSBTcGVjdWxhciBMaWdodCBSZWZsZWN0aW9uIEJhbmQgKi99XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNVbHRyYUNsZWFyOThcbiAgICAgICAgICAgICAgICAgID8gJ2xpbmVhci1ncmFkaWVudCgxMTVkZWcsIHJnYmEoMjU1LDI1NSwyNTUsMCkgMjIlLCByZ2JhKDI1NSwyNTUsMjU1LDAuMDgpIDQ4JSwgcmdiYSgyNTUsMjU1LDI1NSwwKSA3NCUpJ1xuICAgICAgICAgICAgICAgICAgOiAnbGluZWFyLWdyYWRpZW50KDExNWRlZywgcmdiYSgyNTUsMjU1LDI1NSwwKSAyMiUsIHJnYmEoMjU1LDI1NSwyNTUsMC42MikgNDglLCByZ2JhKDI1NSwyNTUsMjU1LDApIDc0JSknLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgey8qIFVwcGVyIEdsYXNzIENvbnRlbnQgQXJlYSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBweC02IHB0LTUgcGItNFwiPlxuICAgICAgICAgICAgICB7LyogNSBTY3JlZW4gU2VsZWN0b3IgTWluaS1UYWJzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIG1iLTMgb3ZlcmZsb3cteC1hdXRvIHBiLTAuNVwiPlxuICAgICAgICAgICAgICAgIHsoXG4gICAgICAgICAgICAgICAgICBbJ3ByaXNtJywgJ3R1cmJpbmUnLCAnY29yZScsICdiaW9zcGhlcmUnLCAnbmV1cmFsJ10gYXMgY29uc3RcbiAgICAgICAgICAgICAgICApLm1hcCgocFR5cGUpID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtwVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0UGFuZWxUeXBlKHBUeXBlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgdGV4dC1bMTBweF0gZm9udC1ib2xkIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCAke1xuICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVBhbmVsVHlwZSA9PT0gcFR5cGVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLVsjNTQzYWQ2XSB0ZXh0LXdoaXRlIHNoYWRvdy1zbSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogaXNVbHRyYUNsZWFyOThcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlLzEwIHRleHQtdmlvbGV0LTEwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzMwIGhvdmVyOmJnLXdoaXRlLzIwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctd2hpdGUvNTUgdGV4dC1bIzU0M2FkNl0gaG92ZXI6Ymctd2hpdGUvODAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7UEFORUxfU0NSRUVOX0RBVEFbcFR5cGVdLnNob3J0TGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEJvbGQgSGVhZGxpbmUgKFwiTWFrZSBJdCBQb3AhXCIgYWVzdGhldGljKSAqL31cbiAgICAgICAgICAgICAgPGgyXG4gICAgICAgICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgICAgICAgaXNVbHRyYUNsZWFyOThcbiAgICAgICAgICAgICAgICAgICAgPyB7IHRleHRTaGFkb3c6ICcwIDJweCAxMHB4IHJnYmEoMTAsIDgsIDMwLCAwLjkpJyB9XG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQtMnhsIGZvbnQtZXh0cmFib2xkIHRyYWNraW5nLXRpZ2h0IGZvbnQtZGlzcGxheSBsZWFkaW5nLXRpZ2h0ICR7XG4gICAgICAgICAgICAgICAgICBpc1VsdHJhQ2xlYXI5OCA/ICd0ZXh0LXdoaXRlJyA6ICd0ZXh0LVsjNGIzNWM0XSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjdXJyZW50RGF0YS50aXRsZXNbc2FmZUljb25JZHhdfVxuICAgICAgICAgICAgICA8L2gyPlxuXG4gICAgICAgICAgICAgIHsvKiBDbGVhbiBCb2R5IENvcHkgKi99XG4gICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAgc3R5bGU9e1xuICAgICAgICAgICAgICAgICAgaXNVbHRyYUNsZWFyOThcbiAgICAgICAgICAgICAgICAgICAgPyB7IHRleHRTaGFkb3c6ICcwIDFweCA4cHggcmdiYSgxMCwgOCwgMzAsIDAuOTUpJyB9XG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YG10LTIgdGV4dC14cyBmb250LW1lZGl1bSBsZWFkaW5nLXJlbGF4ZWQgJHtcbiAgICAgICAgICAgICAgICAgIGlzVWx0cmFDbGVhcjk4ID8gJ3RleHQtdmlvbGV0LTEwMCcgOiAndGV4dC1bIzU4NDRjMl0nXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y3VycmVudERhdGEuZGVzY3JpcHRpb25zW3NhZmVJY29uSWR4XX1cbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIHsvKiBEaWFnb25hbCBJbnRlcmFjdGl2ZSBBY3Rpb24gQXJyb3cgKOKGlykgKyBTdGF0dXMgUm93ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbkFjdGlvbkFycm93Q2xpY2t9XG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIk90d8Ozcnogc3BlY3lmaWthY2rEmSBwcm9tcHR1IGkga29kdSBBUlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJncm91cCBwLTEuNSByb3VuZGVkLXhsIGhvdmVyOmJnLXdoaXRlLzI1IHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8QXJyb3dVcFJpZ2h0XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNyBoLTcgdHJhbnNpdGlvbi1jb2xvcnMgc3Ryb2tlLVsyLjI1XSAke1xuICAgICAgICAgICAgICAgICAgICAgIGlzVWx0cmFDbGVhcjk4XG4gICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LXZpb2xldC0yMDAgZ3JvdXAtaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtWyNiM2EyZjhdIGdyb3VwLWhvdmVyOnRleHQtWyM1NDNhZDZdJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgcHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIGJvcmRlciAke1xuICAgICAgICAgICAgICAgICAgICBpc1VsdHJhQ2xlYXI5OFxuICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtdmlvbGV0LTEwMCBiZy13aGl0ZS81IGJvcmRlci13aGl0ZS84MCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LVsjNWI0N2M2XS84MCBiZy13aGl0ZS81NSBib3JkZXItd2hpdGUvODAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXNVbHRyYUNsZWFyOThcbiAgICAgICAgICAgICAgICAgICAgPyBgU1pLxYFPIDk4JSDCtyBUUllCIDAke3NhZmVJY29uSWR4ICsgMX0vMDRgXG4gICAgICAgICAgICAgICAgICAgIDogYEVLUkFOIDNEIMK3IFRSWUIgMHtzYWZlSWNvbklkeCArIDF9LzA0YC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3tzYWZlSWNvbklkeCArIDF9JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIFN0cmluZyhzYWZlSWNvbklkeCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBCb3R0b20gU2VwYXJhdGVkIFJvdW5kZWQgR2xhc3MgRG9jayBCYXIgd2l0aCA0IENpcmN1bGFyIEljb24gQnV0dG9ucyAqL31cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBpc1VsdHJhQ2xlYXI5OFxuICAgICAgICAgICAgICAgICAgPyAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNDQsIDI0MiwgMjU1LCAwLjAyKSAwJSwgcmdiYSgyMzIsIDIyOCwgMjU0LCAwLjAzKSAxMDAlKSdcbiAgICAgICAgICAgICAgICAgIDogJ2xpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMjQ0LCAyNDIsIDI1NSwgMC43MikgMCUsIHJnYmEoMjMyLCAyMjgsIDI1NCwgMC45MikgMTAwJSknLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTEwIHJvdW5kZWQtdC1bMjhweF0gYm9yZGVyLXQtWzIuNXB4XSBib3JkZXItd2hpdGUvOTUgcHgtNSBweS0zLjUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICB7IGlkeDogMCwgSWNvbjogSG9tZSwgbGFiZWw6ICdXaWRvayBnxYLDs3dueSBla3JhbnUgKE1ha2UgSXQgUG9wISknIH0sXG4gICAgICAgICAgICAgICAgeyBpZHg6IDEsIEljb246IEZpbGVFZGl0LCBsYWJlbDogJ1NwZWN5ZmlrYWNqYSBCSU0gaSB6YmxpxbxlbmllJyB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkeDogMixcbiAgICAgICAgICAgICAgICAgIEljb246IENoZWZIYXQsXG4gICAgICAgICAgICAgICAgICBsYWJlbDogJ1N0cnVrdHVyYSBrb25keWduYWNqaSBpIHJvenN0cnplbGVuaWUgQklNJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGlkeDogMyxcbiAgICAgICAgICAgICAgICAgIEljb246IFNob3BwaW5nQ2FydCxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAnU3luY2hyb25pemFjamEga290d2ljIExpREFSIGkgZWtzcG9ydCBBUicsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXS5tYXAoKHsgaWR4LCBJY29uLCBsYWJlbCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBzYWZlSWNvbklkeCA9PT0gaWR4O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRG9ja0ljb25DbGljayhpZHgpfVxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2xhYmVsfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCAzNSUgMzAlLCAjNmU1NWYwIDAlLCAjNTQzYWQ2IDY1JSwgIzQ0MmJiOCAxMDAlKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzAgNnB4IDE4cHggcmdiYSg4NCwgNTgsIDIxNCwgMC40OCksIDAgMCAwIDNweCByZ2JhKDIwOCwgMTk4LCAyNTUsIDAuODUpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBpc1VsdHJhQ2xlYXI5OFxuICAgICAgICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMjM2LCAyMzMsIDI1NSwgMC4wMyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcwIDAgMCAzcHggcmdiYSgyMjEsIDIxNCwgMjU0LCAwLjM1KSwgaW5zZXQgMCAxcHggMnB4IHJnYmEoMjU1LDI1NSwyNTUsMC43NSknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyMzYsIDIzMywgMjU1LCAwLjcyKScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzAgMCAwIDNweCByZ2JhKDE5NiwgMTg2LCAyNDgsIDAuMzgpLCBpbnNldCAwIDFweCAycHggcmdiYSgyNTUsMjU1LDI1NSwwLjkpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTEgaC0xMSByb3VuZGVkLWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC13aGl0ZSBzY2FsZS0xMDUnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGlzVWx0cmFDbGVhcjk4XG4gICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItd2hpdGUvODAgaG92ZXI6c2NhbGUtMTA1J1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1bIzUwM2FjMl0gYm9yZGVyIGJvcmRlci1bI2E5OWJmMF0vNzUgaG92ZXI6c2NhbGUtMTA1J1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEljb24gY2xhc3NOYW1lPVwidy01IGgtNSBzdHJva2UtWzIuMl1cIiAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdfQ==