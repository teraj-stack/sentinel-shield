const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/parallax3d/node_modules/.vite/deps/react.js?v=b44980a7";
import { Compass, Layers, Sparkles, Download, ChevronDown, ChevronUp, Video, Camera, Brush, Rotate3d } from "/apps/parallax3d/node_modules/.vite/deps/lucide-react.js?v=eff26b65";
var _jsxFileName = "/app/applet/src/components/ControlDock.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/parallax3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b44980a7";
export const ControlDock = ({ depthConfig, onUpdateDepthConfig, motionConfig, onUpdateMotionConfig, displayMode, onChangeDisplayMode, depthColorMap, onChangeDepthColorMap, onOpenDepthEditor, onRecordVideo, onCaptureSnapshot, onDownloadDepthMap, isRecording, recordingProgress }) => {
	const [activeTab, setActiveTab] = useState("motion");
	const [isCollapsed, setIsCollapsed] = useState(false);
	const motionModes = [
		{
			id: "circle",
			label: "Okrąg",
			desc: "Płynny, kolisty ruch kadru"
		},
		{
			id: "horizontal",
			label: "Kołysanie",
			desc: "Klasyczna paralaksa pozioma"
		},
		{
			id: "infinity",
			label: "Ósemka 3D",
			desc: "Kinowa figura lemniskaty"
		},
		{
			id: "breathe",
			label: "Oddech",
			desc: "Pulsowanie głębi i zoom"
		},
		{
			id: "vertical",
			label: "Pion",
			desc: "Przesunięcie góra-dół"
		},
		{
			id: "mouse",
			label: "Myszka",
			desc: "Śledzenie kursora/dotyku"
		},
		{
			id: "orbit",
			label: "Obrót 3D",
			desc: "Swobodna inspekcja bryły"
		}
	];
	const displayModes = [
		{
			id: "standard",
			label: "Przestrzenne 3D"
		},
		{
			id: "framed",
			label: "Galeryjna Ramka"
		},
		{
			id: "anaglyph",
			label: "Anaglyf (Okulary 3D)"
		},
		{
			id: "depthmap",
			label: "Wizualizacja Głębi"
		},
		{
			id: "mesh_wireframe",
			label: "Siatka 3D"
		}
	];
	return /* @__PURE__ */ _jsxDEV("div", {
		className: `fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-[940px] transition-transform duration-300 ease-in-out select-none ${isCollapsed ? "translate-y-[calc(100%-36px)]" : "translate-y-0"}`,
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "flex justify-center mb-1",
			children: /* @__PURE__ */ _jsxDEV("button", {
				onClick: () => setIsCollapsed(!isCollapsed),
				className: "flex items-center gap-1.5 px-3 py-1 rounded-t-lg bg-zinc-900 border-t border-x border-zinc-700 text-[11px] font-medium text-zinc-300 hover:text-white transition shadow-lg",
				children: isCollapsed ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(ChevronUp, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 94,
					columnNumber: 15
				}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pokaż Panel Kontrolny" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 95,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 93,
					columnNumber: 13
				}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(ChevronDown, { className: "w-3.5 h-3.5 text-zinc-400" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 99,
					columnNumber: 15
				}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Ukryj Panel (Tryb Pełny)" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 98,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 88,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 87,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "flex border-b border-zinc-800 bg-zinc-950/80 px-3 pt-2 gap-1 overflow-x-auto",
				children: [
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							setActiveTab("motion");
							setIsCollapsed(false);
						},
						className: `flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-t-lg transition border-b-2 ${activeTab === "motion" ? "border-indigo-500 text-white bg-zinc-900 font-semibold" : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"}`,
						children: [/* @__PURE__ */ _jsxDEV(Compass, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 121,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Kamera & Kadr" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 110,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							setActiveTab("depth");
							setIsCollapsed(false);
						},
						className: `flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-t-lg transition border-b-2 ${activeTab === "depth" ? "border-indigo-500 text-white bg-zinc-900 font-semibold" : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"}`,
						children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 136,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Głębia & Przestrzeń" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 137,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 125,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							setActiveTab("display");
							setIsCollapsed(false);
						},
						className: `flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-t-lg transition border-b-2 ${activeTab === "display" ? "border-indigo-500 text-white bg-zinc-900 font-semibold" : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"}`,
						children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 151,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Widok & Optyka" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 152,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 140,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => {
							setActiveTab("export");
							setIsCollapsed(false);
						},
						className: `flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-t-lg transition border-b-2 ${activeTab === "export" ? "border-indigo-500 text-white bg-zinc-900 font-semibold" : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50"}`,
						children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 166,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Eksport Wideo / Foto" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 167,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 109,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "p-4 bg-zinc-900",
				children: [
					activeTab === "motion" && /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-3.5",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-2",
								children: "Styl ruchu przesuwającego się kadru"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 178,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5",
								children: motionModes.map((m) => {
									const isSelected = motionConfig.mode === m.id;
									return /* @__PURE__ */ _jsxDEV("button", {
										onClick: () => onUpdateMotionConfig({ mode: m.id }),
										className: `flex flex-col items-center justify-center p-2 rounded-xl text-center border transition ${isSelected ? "bg-indigo-600 border-indigo-400 text-white shadow-sm" : "bg-zinc-800/80 border-zinc-700/60 text-zinc-300 hover:bg-zinc-750"}`,
										title: m.desc,
										children: /* @__PURE__ */ _jsxDEV("span", {
											className: "text-xs font-medium",
											children: m.label
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 195,
											columnNumber: 25
										}, this)
									}, m.id, false, {
										fileName: _jsxFileName,
										lineNumber: 185,
										columnNumber: 23
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 181,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 177,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1",
								children: [
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex justify-between text-xs text-zinc-400 mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", { children: "Zasięg ruchu kadru (Amplituda)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 206,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono text-zinc-200",
											children: [Math.round(motionConfig.amplitude * 100), "%"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 207,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 205,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "range",
										min: .05,
										max: 1,
										step: .05,
										value: motionConfig.amplitude,
										onChange: (e) => onUpdateMotionConfig({ amplitude: Number(e.target.value) }),
										className: "w-full"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 211,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 204,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex justify-between text-xs text-zinc-400 mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", { children: "Szybkość animacji" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 224,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono text-zinc-200",
											children: [motionConfig.speed.toFixed(1), "x"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 225,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 223,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "range",
										min: .3,
										max: 2.5,
										step: .1,
										value: motionConfig.speed,
										onChange: (e) => onUpdateMotionConfig({ speed: Number(e.target.value) }),
										className: "w-full"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 229,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 222,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center pt-3 sm:pt-0",
										children: /* @__PURE__ */ _jsxDEV("label", {
											className: "flex items-center gap-2 cursor-pointer text-xs text-zinc-300 hover:text-white",
											children: [/* @__PURE__ */ _jsxDEV("input", {
												type: "checkbox",
												checked: motionConfig.interactiveMouse,
												onChange: (e) => onUpdateMotionConfig({ interactiveMouse: e.target.checked }),
												className: "rounded border-zinc-700 text-indigo-600 focus:ring-0 w-4 h-4 bg-zinc-800"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 242,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Reakcja na kursor myszy / żyroskop" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 248,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 241,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 240,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-2 border-t border-zinc-800/80",
								children: /* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-3 items-center",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between p-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: `p-1.5 rounded-lg transition ${motionConfig.autoRotate ? "bg-indigo-600 text-white" : "bg-zinc-700/60 text-zinc-400"}`,
												children: /* @__PURE__ */ _jsxDEV(Rotate3d, { className: "w-4 h-4" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 266,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 259,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "text-xs font-semibold text-zinc-200 block",
												children: "Auto-rotate (Obrót wokół centrum)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 269,
												columnNumber: 25
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "text-[10px] text-zinc-400 block",
												children: "Automatyczny obrót kamery 360° niezależnie od myszy"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 272,
												columnNumber: 25
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 268,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 258,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("label", {
											className: "relative inline-flex items-center cursor-pointer ml-2",
											children: [/* @__PURE__ */ _jsxDEV("input", {
												type: "checkbox",
												checked: motionConfig.autoRotate,
												onChange: (e) => onUpdateMotionConfig({ autoRotate: e.target.checked }),
												className: "sr-only peer"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 278,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("div", { className: "w-9 h-5 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 284,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 277,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 257,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: `p-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/60 transition ${motionConfig.autoRotate ? "opacity-100" : "opacity-50"}`,
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "flex justify-between text-xs text-zinc-400 mb-1",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "font-medium text-zinc-300",
												children: "Prędkość obrotu Auto-rotate"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 295,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "font-mono text-zinc-200",
												children: [(motionConfig.autoRotateSpeed ?? 1).toFixed(1), "x"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 296,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 294,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: .2,
											max: 4,
											step: .1,
											disabled: !motionConfig.autoRotate,
											value: motionConfig.autoRotateSpeed ?? 1,
											onChange: (e) => onUpdateMotionConfig({ autoRotateSpeed: Number(e.target.value) }),
											className: "w-full"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 300,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 289,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 255,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 254,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 175,
						columnNumber: 13
					}, this),
					activeTab === "depth" && /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-3.5",
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
							children: [
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-zinc-400 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Moc głębi 3D (Wypukłość)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-zinc-200",
										children: [depthConfig.scale.toFixed(1), "x"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 326,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 324,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: .2,
									max: 2.5,
									step: .1,
									value: depthConfig.scale,
									onChange: (e) => onUpdateDepthConfig({ scale: Number(e.target.value) }),
									className: "w-full"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 330,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 323,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-zinc-400 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Płaszczyzna ostrości (Nieruchomy plan)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 344,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-zinc-200",
										children: [Math.round(depthConfig.focusPlane * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 345,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .05,
									value: depthConfig.focusPlane,
									onChange: (e) => onUpdateDepthConfig({ focusPlane: Number(e.target.value) }),
									className: "w-full"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 349,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 342,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV("button", {
										onClick: onOpenDepthEditor,
										className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition",
										children: [/* @__PURE__ */ _jsxDEV(Brush, { className: "w-3.5 h-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 366,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pędzel Mapy Głębi" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 367,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 362,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										onClick: () => onUpdateDepthConfig({ inverted: !depthConfig.inverted }),
										className: `px-3 py-2 text-xs font-medium rounded-xl border transition ${depthConfig.inverted ? "bg-indigo-600 border-indigo-500 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750"}`,
										title: "Odwróć kierunek przód-tył",
										children: "Odwróć"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 370,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 361,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 321,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 320,
						columnNumber: 13
					}, this),
					activeTab === "display" && /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-3.5",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-2",
							children: "Tryb wyświetlania sceny"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 391,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-wrap gap-2",
							children: displayModes.map((dm) => {
								const isSelected = displayMode === dm.id;
								return /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => onChangeDisplayMode(dm.id),
									className: `px-3 py-1.5 text-xs font-medium rounded-lg border transition ${isSelected ? "bg-indigo-600 border-indigo-400 text-white shadow-sm" : "bg-zinc-800 border-zinc-700/80 text-zinc-300 hover:bg-zinc-750"}`,
									children: dm.label
								}, dm.id, false, {
									fileName: _jsxFileName,
									lineNumber: 398,
									columnNumber: 23
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 394,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 390,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1",
							children: [
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-zinc-400 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Rozmycie bokeh (DOF)" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 418,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-zinc-200",
										children: [Math.round(depthConfig.dofStrength * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 419,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 417,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .05,
									value: depthConfig.dofStrength,
									onChange: (e) => onUpdateDepthConfig({ dofStrength: Number(e.target.value) }),
									className: "w-full"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 423,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 416,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-zinc-400 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: "Aberracja soczewki" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 436,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-zinc-200",
										children: [Math.round(depthConfig.chromaticAberration * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 437,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 435,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .05,
									value: depthConfig.chromaticAberration,
									onChange: (e) => onUpdateDepthConfig({ chromaticAberration: Number(e.target.value) }),
									className: "w-full"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 441,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 434,
									columnNumber: 17
								}, this),
								displayMode === "depthmap" && /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs text-zinc-400 block mb-1",
									children: "Paleta mapy głębi"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 456,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex gap-1.5",
									children: [
										"turbo",
										"magma",
										"cyber",
										"grayscale"
									].map((cm) => /* @__PURE__ */ _jsxDEV("button", {
										onClick: () => onChangeDepthColorMap(cm),
										className: `flex-1 py-1 text-[11px] font-medium rounded border capitalize transition ${depthColorMap === cm ? "bg-indigo-600 border-indigo-400 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white"}`,
										children: cm
									}, cm, false, {
										fileName: _jsxFileName,
										lineNumber: 459,
										columnNumber: 25
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 457,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 455,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 415,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 388,
						columnNumber: 13
					}, this),
					activeTab === "export" && /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ _jsxDEV("span", {
								className: "text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block",
								children: "Eksport trójwymiarowego efektu"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 481,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
								children: [
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: onRecordVideo,
										disabled: isRecording,
										className: `flex items-center justify-center gap-2 p-3 rounded-xl font-medium text-xs border transition ${isRecording ? "bg-zinc-800 text-zinc-400 border-zinc-700 cursor-wait" : "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-500 shadow-md"}`,
										children: [/* @__PURE__ */ _jsxDEV(Video, { className: "w-4 h-4 text-white" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 495,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: isRecording ? `Nagrywanie pętli (${Math.round(recordingProgress * 100)}%)...` : "Nagraj Wideo Pętli 3D (WebM)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 496,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 486,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: onCaptureSnapshot,
										className: "flex items-center justify-center gap-2 p-3 rounded-xl font-medium text-xs bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 transition shadow-sm",
										children: [/* @__PURE__ */ _jsxDEV(Camera, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 508,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Zapisz Kadr Przestrzenny (PNG)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 509,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 504,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: onDownloadDepthMap,
										className: "flex items-center justify-center gap-2 p-3 rounded-xl font-medium text-xs bg-zinc-800 hover:bg-zinc-750 text-zinc-200 border border-zinc-700 transition shadow-sm",
										children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 517,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pobierz Mapę Głębi (PNG)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 518,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 513,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 484,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("p", {
								className: "text-[11px] text-zinc-400 pt-1",
								children: "Wideo rejestruje pełny cykl przesuwającego się kadru z płynną animacją paralaksy, idealne do mediów społecznościowych."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 521,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 480,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 172,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 107,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 81,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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OztXQUNGOzs7OztVQUNGOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJDb250cm9sRG9jay50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQ29tcGFzcyxcbiAgTGF5ZXJzLFxuICBTcGFya2xlcyxcbiAgRG93bmxvYWQsXG4gIENoZXZyb25Eb3duLFxuICBDaGV2cm9uVXAsXG4gIFZpZGVvLFxuICBDYW1lcmEsXG4gIEJydXNoLFxuICBTbGlkZXJzLFxuICBNb3ZlLFxuICBSb3RhdGUzZCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7XG4gIENhbWVyYU1vdGlvbk1vZGUsXG4gIERpc3BsYXlNb2RlLFxuICBEZXB0aENvbmZpZyxcbiAgTW90aW9uQ29uZmlnLFxuICBEZXB0aE1hcENvbG9yTWFwLFxufSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBDb250cm9sRG9ja1Byb3BzIHtcbiAgZGVwdGhDb25maWc6IERlcHRoQ29uZmlnO1xuICBvblVwZGF0ZURlcHRoQ29uZmlnOiAobmV3Q2ZnOiBQYXJ0aWFsPERlcHRoQ29uZmlnPikgPT4gdm9pZDtcbiAgbW90aW9uQ29uZmlnOiBNb3Rpb25Db25maWc7XG4gIG9uVXBkYXRlTW90aW9uQ29uZmlnOiAobmV3Q2ZnOiBQYXJ0aWFsPE1vdGlvbkNvbmZpZz4pID0+IHZvaWQ7XG4gIGRpc3BsYXlNb2RlOiBEaXNwbGF5TW9kZTtcbiAgb25DaGFuZ2VEaXNwbGF5TW9kZTogKG1vZGU6IERpc3BsYXlNb2RlKSA9PiB2b2lkO1xuICBkZXB0aENvbG9yTWFwOiBEZXB0aE1hcENvbG9yTWFwO1xuICBvbkNoYW5nZURlcHRoQ29sb3JNYXA6IChjbTogRGVwdGhNYXBDb2xvck1hcCkgPT4gdm9pZDtcbiAgb25PcGVuRGVwdGhFZGl0b3I6ICgpID0+IHZvaWQ7XG4gIG9uUmVjb3JkVmlkZW86ICgpID0+IHZvaWQ7XG4gIG9uQ2FwdHVyZVNuYXBzaG90OiAoKSA9PiB2b2lkO1xuICBvbkRvd25sb2FkRGVwdGhNYXA6ICgpID0+IHZvaWQ7XG4gIGlzUmVjb3JkaW5nOiBib29sZWFuO1xuICByZWNvcmRpbmdQcm9ncmVzczogbnVtYmVyO1xufVxuXG50eXBlIFRhYlR5cGUgPSAnbW90aW9uJyB8ICdkZXB0aCcgfCAnZGlzcGxheScgfCAnZXhwb3J0JztcblxuZXhwb3J0IGNvbnN0IENvbnRyb2xEb2NrOiBSZWFjdC5GQzxDb250cm9sRG9ja1Byb3BzPiA9ICh7XG4gIGRlcHRoQ29uZmlnLFxuICBvblVwZGF0ZURlcHRoQ29uZmlnLFxuICBtb3Rpb25Db25maWcsXG4gIG9uVXBkYXRlTW90aW9uQ29uZmlnLFxuICBkaXNwbGF5TW9kZSxcbiAgb25DaGFuZ2VEaXNwbGF5TW9kZSxcbiAgZGVwdGhDb2xvck1hcCxcbiAgb25DaGFuZ2VEZXB0aENvbG9yTWFwLFxuICBvbk9wZW5EZXB0aEVkaXRvcixcbiAgb25SZWNvcmRWaWRlbyxcbiAgb25DYXB0dXJlU25hcHNob3QsXG4gIG9uRG93bmxvYWREZXB0aE1hcCxcbiAgaXNSZWNvcmRpbmcsXG4gIHJlY29yZGluZ1Byb2dyZXNzLFxufSkgPT4ge1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8VGFiVHlwZT4oJ21vdGlvbicpO1xuICBjb25zdCBbaXNDb2xsYXBzZWQsIHNldElzQ29sbGFwc2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBtb3Rpb25Nb2RlczogeyBpZDogQ2FtZXJhTW90aW9uTW9kZTsgbGFiZWw6IHN0cmluZzsgZGVzYzogc3RyaW5nIH1bXSA9IFtcbiAgICB7IGlkOiAnY2lyY2xlJywgbGFiZWw6ICdPa3LEhWcnLCBkZXNjOiAnUMWCeW5ueSwga29saXN0eSBydWNoIGthZHJ1JyB9LFxuICAgIHsgaWQ6ICdob3Jpem9udGFsJywgbGFiZWw6ICdLb8WCeXNhbmllJywgZGVzYzogJ0tsYXN5Y3puYSBwYXJhbGFrc2EgcG96aW9tYScgfSxcbiAgICB7IGlkOiAnaW5maW5pdHknLCBsYWJlbDogJ8OTc2Vta2EgM0QnLCBkZXNjOiAnS2lub3dhIGZpZ3VyYSBsZW1uaXNrYXR5JyB9LFxuICAgIHsgaWQ6ICdicmVhdGhlJywgbGFiZWw6ICdPZGRlY2gnLCBkZXNjOiAnUHVsc293YW5pZSBnxYLEmWJpIGkgem9vbScgfSxcbiAgICB7IGlkOiAndmVydGljYWwnLCBsYWJlbDogJ1Bpb24nLCBkZXNjOiAnUHJ6ZXN1bmnEmWNpZSBnw7NyYS1kw7PFgicgfSxcbiAgICB7IGlkOiAnbW91c2UnLCBsYWJlbDogJ015c3prYScsIGRlc2M6ICfFmmxlZHplbmllIGt1cnNvcmEvZG90eWt1JyB9LFxuICAgIHsgaWQ6ICdvcmJpdCcsIGxhYmVsOiAnT2Jyw7N0IDNEJywgZGVzYzogJ1N3b2JvZG5hIGluc3Bla2NqYSBicnnFgnknIH0sXG4gIF07XG5cbiAgY29uc3QgZGlzcGxheU1vZGVzOiB7IGlkOiBEaXNwbGF5TW9kZTsgbGFiZWw6IHN0cmluZyB9W10gPSBbXG4gICAgeyBpZDogJ3N0YW5kYXJkJywgbGFiZWw6ICdQcnplc3RyemVubmUgM0QnIH0sXG4gICAgeyBpZDogJ2ZyYW1lZCcsIGxhYmVsOiAnR2FsZXJ5am5hIFJhbWthJyB9LFxuICAgIHsgaWQ6ICdhbmFnbHlwaCcsIGxhYmVsOiAnQW5hZ2x5ZiAoT2t1bGFyeSAzRCknIH0sXG4gICAgeyBpZDogJ2RlcHRobWFwJywgbGFiZWw6ICdXaXp1YWxpemFjamEgR8WCxJliaScgfSxcbiAgICB7IGlkOiAnbWVzaF93aXJlZnJhbWUnLCBsYWJlbDogJ1NpYXRrYSAzRCcgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17YGZpeGVkIGJvdHRvbS00IGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgei00MCB3LVs5NHZ3XSBtYXgtdy1bOTQwcHhdIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMCBlYXNlLWluLW91dCBzZWxlY3Qtbm9uZSAke1xuICAgICAgICBpc0NvbGxhcHNlZCA/ICd0cmFuc2xhdGUteS1bY2FsYygxMDAlLTM2cHgpXScgOiAndHJhbnNsYXRlLXktMCdcbiAgICAgIH1gfVxuICAgID5cbiAgICAgIHsvKiBDb2xsYXBzZSAvIEV4cGFuZCBUb2dnbGUgQnV0dG9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktY2VudGVyIG1iLTFcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQ29sbGFwc2VkKCFpc0NvbGxhcHNlZCl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEgcm91bmRlZC10LWxnIGJnLXppbmMtOTAwIGJvcmRlci10IGJvcmRlci14IGJvcmRlci16aW5jLTcwMCB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSB0ZXh0LXppbmMtMzAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbiBzaGFkb3ctbGdcIlxuICAgICAgICA+XG4gICAgICAgICAge2lzQ29sbGFwc2VkID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPENoZXZyb25VcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Qb2thxbwgUGFuZWwgS29udHJvbG55PC9zcGFuPlxuICAgICAgICAgICAgPC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxDaGV2cm9uRG93biBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXppbmMtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+VWtyeWogUGFuZWwgKFRyeWIgUGXFgm55KTwvc3Bhbj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIERvY2sgQ29udGFpbmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwLzgwIHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIHsvKiBOYXZpZ2F0aW9uIFRhYnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItemluYy04MDAgYmctemluYy05NTAvODAgcHgtMyBwdC0yIGdhcC0xIG92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0QWN0aXZlVGFiKCdtb3Rpb24nKTtcbiAgICAgICAgICAgICAgc2V0SXNDb2xsYXBzZWQoZmFsc2UpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMy41IHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLXQtbGcgdHJhbnNpdGlvbiBib3JkZXItYi0yICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ21vdGlvbidcbiAgICAgICAgICAgICAgICA/ICdib3JkZXItaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGJnLXppbmMtOTAwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCBob3ZlcjpiZy16aW5jLTkwMC81MCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxDb21wYXNzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5LYW1lcmEgJiBLYWRyPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRBY3RpdmVUYWIoJ2RlcHRoJyk7XG4gICAgICAgICAgICAgIHNldElzQ29sbGFwc2VkKGZhbHNlKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMuNSBweS0yIHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC10LWxnIHRyYW5zaXRpb24gYm9yZGVyLWItMiAke1xuICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdkZXB0aCdcbiAgICAgICAgICAgICAgICA/ICdib3JkZXItaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGJnLXppbmMtOTAwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCBob3ZlcjpiZy16aW5jLTkwMC81MCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkfFgsSZYmlhICYgUHJ6ZXN0cnplxYQ8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldEFjdGl2ZVRhYignZGlzcGxheScpO1xuICAgICAgICAgICAgICBzZXRJc0NvbGxhcHNlZChmYWxzZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtdC1sZyB0cmFuc2l0aW9uIGJvcmRlci1iLTIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnZGlzcGxheSdcbiAgICAgICAgICAgICAgICA/ICdib3JkZXItaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGJnLXppbmMtOTAwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCBob3ZlcjpiZy16aW5jLTkwMC81MCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5XaWRvayAmIE9wdHlrYTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgc2V0QWN0aXZlVGFiKCdleHBvcnQnKTtcbiAgICAgICAgICAgICAgc2V0SXNDb2xsYXBzZWQoZmFsc2UpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMy41IHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLXQtbGcgdHJhbnNpdGlvbiBib3JkZXItYi0yICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2V4cG9ydCdcbiAgICAgICAgICAgICAgICA/ICdib3JkZXItaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGJnLXppbmMtOTAwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtemluYy00MDAgaG92ZXI6dGV4dC16aW5jLTIwMCBob3ZlcjpiZy16aW5jLTkwMC81MCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkVrc3BvcnQgV2lkZW8gLyBGb3RvPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGFiIEJvZHkgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXppbmMtOTAwXCI+XG4gICAgICAgICAgey8qIDEuIE1vdGlvbiAmIENhbWVyYSBUYWIgKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ21vdGlvbicgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMuNVwiPlxuICAgICAgICAgICAgICB7LyogTW90aW9uIE1vZGUgU2VsZWN0aW9uICovfVxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtemluYy00MDAgYmxvY2sgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgU3R5bCBydWNodSBwcnplc3V3YWrEhWNlZ28gc2nEmSBrYWRydVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgbWQ6Z3JpZC1jb2xzLTcgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAge21vdGlvbk1vZGVzLm1hcCgobSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gbW90aW9uQ29uZmlnLm1vZGUgPT09IG0uaWQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXttLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25VcGRhdGVNb3Rpb25Db25maWcoeyBtb2RlOiBtLmlkIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0yIHJvdW5kZWQteGwgdGV4dC1jZW50ZXIgYm9yZGVyIHRyYW5zaXRpb24gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgYm9yZGVyLWluZGlnby00MDAgdGV4dC13aGl0ZSBzaGFkb3ctc20nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy04MDAvODAgYm9yZGVyLXppbmMtNzAwLzYwIHRleHQtemluYy0zMDAgaG92ZXI6YmctemluYy03NTAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXttLmRlc2N9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bVwiPnttLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU2xpZGVycyByb3cgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXppbmMtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+WmFzacSZZyBydWNodSBrYWRydSAoQW1wbGl0dWRhKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtemluYy0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChtb3Rpb25Db25maWcuYW1wbGl0dWRlICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MC4wNX1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXsxLjB9XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9ezAuMDV9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXttb3Rpb25Db25maWcuYW1wbGl0dWRlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uVXBkYXRlTW90aW9uQ29uZmlnKHsgYW1wbGl0dWRlOiBOdW1iZXIoZS50YXJnZXQudmFsdWUpIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC16aW5jLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlN6eWJrb8WbxIcgYW5pbWFjamk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXppbmMtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge21vdGlvbkNvbmZpZy5zcGVlZC50b0ZpeGVkKDEpfXhcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgbWluPXswLjN9XG4gICAgICAgICAgICAgICAgICAgIG1heD17Mi41fVxuICAgICAgICAgICAgICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXttb3Rpb25Db25maWcuc3BlZWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25VcGRhdGVNb3Rpb25Db25maWcoeyBzcGVlZDogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHB0LTMgc206cHQtMFwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGN1cnNvci1wb2ludGVyIHRleHQteHMgdGV4dC16aW5jLTMwMCBob3Zlcjp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17bW90aW9uQ29uZmlnLmludGVyYWN0aXZlTW91c2V9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvblVwZGF0ZU1vdGlvbkNvbmZpZyh7IGludGVyYWN0aXZlTW91c2U6IGUudGFyZ2V0LmNoZWNrZWQgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCBib3JkZXItemluYy03MDAgdGV4dC1pbmRpZ28tNjAwIGZvY3VzOnJpbmctMCB3LTQgaC00IGJnLXppbmMtODAwXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmVha2NqYSBuYSBrdXJzb3IgbXlzenkgLyDFvHlyb3Nrb3A8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQXV0by1yb3RhdGUgU2V0dGluZ3MgU2VjdGlvbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci16aW5jLTgwMC84MFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtMyBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIHsvKiBBdXRvLXJvdGF0ZSBUb2dnbGUgU3dpdGNoICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0yLjUgcm91bmRlZC14bCBiZy16aW5jLTgwMC82MCBib3JkZXIgYm9yZGVyLXppbmMtNzAwLzYwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMS41IHJvdW5kZWQtbGcgdHJhbnNpdGlvbiAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtb3Rpb25Db25maWcuYXV0b1JvdGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTcwMC82MCB0ZXh0LXppbmMtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFJvdGF0ZTNkIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC16aW5jLTIwMCBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBBdXRvLXJvdGF0ZSAoT2Jyw7N0IHdva8OzxYIgY2VudHJ1bSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtemluYy00MDAgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgQXV0b21hdHljem55IG9icsOzdCBrYW1lcnkgMzYwwrAgbmllemFsZcW8bmllIG9kIG15c3p5XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGN1cnNvci1wb2ludGVyIG1sLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXttb3Rpb25Db25maWcuYXV0b1JvdGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25VcGRhdGVNb3Rpb25Db25maWcoeyBhdXRvUm90YXRlOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3Itb25seSBwZWVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy05IGgtNSBiZy16aW5jLTcwMCBwZWVyLWZvY3VzOm91dGxpbmUtbm9uZSByb3VuZGVkLWZ1bGwgcGVlciBwZWVyLWNoZWNrZWQ6YWZ0ZXI6dHJhbnNsYXRlLXgtZnVsbCBwZWVyLWNoZWNrZWQ6YWZ0ZXI6Ym9yZGVyLXdoaXRlIGFmdGVyOmNvbnRlbnQtWycnXSBhZnRlcjphYnNvbHV0ZSBhZnRlcjp0b3AtWzJweF0gYWZ0ZXI6bGVmdC1bMnB4XSBhZnRlcjpiZy13aGl0ZSBhZnRlcjpib3JkZXItemluYy0zMDAgYWZ0ZXI6Ym9yZGVyIGFmdGVyOnJvdW5kZWQtZnVsbCBhZnRlcjpoLTQgYWZ0ZXI6dy00IGFmdGVyOnRyYW5zaXRpb24tYWxsIHBlZXItY2hlY2tlZDpiZy1pbmRpZ28tNjAwXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIENvbmZpZ3VyYWJsZSBTcGVlZCBTbGlkZXIgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMi41IHJvdW5kZWQteGwgYmctemluYy04MDAvNjAgYm9yZGVyIGJvcmRlci16aW5jLTcwMC82MCB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgbW90aW9uQ29uZmlnLmF1dG9Sb3RhdGUgPyAnb3BhY2l0eS0xMDAnIDogJ29wYWNpdHktNTAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC16aW5jLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC16aW5jLTMwMFwiPlByxJlka2/Fm8SHIG9icm90dSBBdXRvLXJvdGF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC16aW5jLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyhtb3Rpb25Db25maWcuYXV0b1JvdGF0ZVNwZWVkID8/IDEuMCkudG9GaXhlZCgxKX14XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICBtaW49ezAuMn1cbiAgICAgICAgICAgICAgICAgICAgICBtYXg9ezQuMH1cbiAgICAgICAgICAgICAgICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFtb3Rpb25Db25maWcuYXV0b1JvdGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bW90aW9uQ29uZmlnLmF1dG9Sb3RhdGVTcGVlZCA/PyAxLjB9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVNb3Rpb25Db25maWcoeyBhdXRvUm90YXRlU3BlZWQ6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogMi4gRGVwdGggJiAzRCBFeHRydXNpb24gVGFiICovfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdkZXB0aCcgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMuNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICB7LyogM0QgRGVwdGggU2NhbGUgKi99XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXppbmMtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+TW9jIGfFgsSZYmkgM0QgKFd5cHVrxYJvxZvEhyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXppbmMtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2RlcHRoQ29uZmlnLnNjYWxlLnRvRml4ZWQoMSl9eFxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICBtaW49ezAuMn1cbiAgICAgICAgICAgICAgICAgICAgbWF4PXsyLjV9XG4gICAgICAgICAgICAgICAgICAgIHN0ZXA9ezAuMX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RlcHRoQ29uZmlnLnNjYWxlfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uVXBkYXRlRGVwdGhDb25maWcoeyBzY2FsZTogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogRm9jYWwgUGxhbmUgKi99XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXppbmMtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UMWCYXN6Y3p5em5hIG9zdHJvxZtjaSAoTmllcnVjaG9teSBwbGFuKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtemluYy0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChkZXB0aENvbmZpZy5mb2N1c1BsYW5lICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgIG1pbj17MC4wfVxuICAgICAgICAgICAgICAgICAgICBtYXg9ezEuMH1cbiAgICAgICAgICAgICAgICAgICAgc3RlcD17MC4wNX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RlcHRoQ29uZmlnLmZvY3VzUGxhbmV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gb25VcGRhdGVEZXB0aENvbmZpZyh7IGZvY3VzUGxhbmU6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIEVkaXQgJiBJbnZlcnQgYnV0dG9ucyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkRlcHRoRWRpdG9yfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQteGwgYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgc2hhZG93LXNtIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QnJ1c2ggY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QxJlkemVsIE1hcHkgR8WCxJliaTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVXBkYXRlRGVwdGhDb25maWcoeyBpbnZlcnRlZDogIWRlcHRoQ29uZmlnLmludmVydGVkIH0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgZGVwdGhDb25maWcuaW52ZXJ0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgYm9yZGVyLWluZGlnby01MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtODAwIGJvcmRlci16aW5jLTcwMCB0ZXh0LXppbmMtMzAwIGhvdmVyOmJnLXppbmMtNzUwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPZHdyw7PEhyBraWVydW5layBwcnrDs2QtdHnFglwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIE9kd3LDs8SHXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIDMuIERpc3BsYXkgJiBPcHRpY3MgVGFiICovfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdkaXNwbGF5JyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMy41XCI+XG4gICAgICAgICAgICAgIHsvKiBEaXNwbGF5IE1vZGUgQ2hpcHMgKi99XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC16aW5jLTQwMCBibG9jayBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICBUcnliIHd5xZt3aWV0bGFuaWEgc2NlbnlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAge2Rpc3BsYXlNb2Rlcy5tYXAoKGRtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBkaXNwbGF5TW9kZSA9PT0gZG0uaWQ7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlRGlzcGxheU1vZGUoZG0uaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tNjAwIGJvcmRlci1pbmRpZ28tNDAwIHRleHQtd2hpdGUgc2hhZG93LXNtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtODAwIGJvcmRlci16aW5jLTcwMC84MCB0ZXh0LXppbmMtMzAwIGhvdmVyOmJnLXppbmMtNzUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2RtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTbGlkZXJzIGZvciBPcHRpY3MgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtNCBwdC0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXppbmMtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Um96bXljaWUgYm9rZWggKERPRik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXppbmMtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge01hdGgucm91bmQoZGVwdGhDb25maWcuZG9mU3RyZW5ndGggKiAxMDApfSVcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgbWluPXswfVxuICAgICAgICAgICAgICAgICAgICBtYXg9ezEuMH1cbiAgICAgICAgICAgICAgICAgICAgc3RlcD17MC4wNX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2RlcHRoQ29uZmlnLmRvZlN0cmVuZ3RofVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uVXBkYXRlRGVwdGhDb25maWcoeyBkb2ZTdHJlbmd0aDogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtemluYy00MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5BYmVycmFjamEgc29jemV3a2k8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXppbmMtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge01hdGgucm91bmQoZGVwdGhDb25maWcuY2hyb21hdGljQWJlcnJhdGlvbiAqIDEwMCl9JVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICBtaW49ezB9XG4gICAgICAgICAgICAgICAgICAgIG1heD17MS4wfVxuICAgICAgICAgICAgICAgICAgICBzdGVwPXswLjA1fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZGVwdGhDb25maWcuY2hyb21hdGljQWJlcnJhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlRGVwdGhDb25maWcoeyBjaHJvbWF0aWNBYmVycmF0aW9uOiBOdW1iZXIoZS50YXJnZXQudmFsdWUpIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7ZGlzcGxheU1vZGUgPT09ICdkZXB0aG1hcCcgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXppbmMtNDAwIGJsb2NrIG1iLTFcIj5QYWxldGEgbWFweSBnxYLEmWJpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHsoWyd0dXJibycsICdtYWdtYScsICdjeWJlcicsICdncmF5c2NhbGUnXSBhcyBEZXB0aE1hcENvbG9yTWFwW10pLm1hcCgoY20pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjbX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2VEZXB0aENvbG9yTWFwKGNtKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIHB5LTEgdGV4dC1bMTFweF0gZm9udC1tZWRpdW0gcm91bmRlZCBib3JkZXIgY2FwaXRhbGl6ZSB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGhDb2xvck1hcCA9PT0gY21cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgYm9yZGVyLWluZGlnby00MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtODAwIGJvcmRlci16aW5jLTcwMCB0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y219XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogNC4gRXhwb3J0IFRhYiAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnZXhwb3J0JyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXppbmMtNDAwIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgRWtzcG9ydCB0csOzand5bWlhcm93ZWdvIGVmZWt0dVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIHsvKiBSZWNvcmQgVmlkZW8gKi99XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17b25SZWNvcmRWaWRlb31cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1JlY29yZGluZ31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHAtMyByb3VuZGVkLXhsIGZvbnQtbWVkaXVtIHRleHQteHMgYm9yZGVyIHRyYW5zaXRpb24gJHtcbiAgICAgICAgICAgICAgICAgICAgaXNSZWNvcmRpbmdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy16aW5jLTgwMCB0ZXh0LXppbmMtNDAwIGJvcmRlci16aW5jLTcwMCBjdXJzb3Itd2FpdCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBib3JkZXItaW5kaWdvLTUwMCBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8VmlkZW8gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICB7aXNSZWNvcmRpbmdcbiAgICAgICAgICAgICAgICAgICAgICA/IGBOYWdyeXdhbmllIHDEmXRsaSAoJHtNYXRoLnJvdW5kKHJlY29yZGluZ1Byb2dyZXNzICogMTAwKX0lKS4uLmBcbiAgICAgICAgICAgICAgICAgICAgICA6ICdOYWdyYWogV2lkZW8gUMSZdGxpIDNEIChXZWJNKSd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICB7LyogU25hcHNob3QgKi99XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17b25DYXB0dXJlU25hcHNob3R9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBwLTMgcm91bmRlZC14bCBmb250LW1lZGl1bSB0ZXh0LXhzIGJnLXppbmMtODAwIGhvdmVyOmJnLXppbmMtNzUwIHRleHQtemluYy0yMDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCB0cmFuc2l0aW9uIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPENhbWVyYSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5aYXBpc3ogS2FkciBQcnplc3RyemVubnkgKFBORyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICB7LyogRG93bmxvYWQgRGVwdGggTWFwICovfVxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uRG93bmxvYWREZXB0aE1hcH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHAtMyByb3VuZGVkLXhsIGZvbnQtbWVkaXVtIHRleHQteHMgYmctemluYy04MDAgaG92ZXI6YmctemluYy03NTAgdGV4dC16aW5jLTIwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwIHRyYW5zaXRpb24gc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogTWFwxJkgR8WCxJliaSAoUE5HKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtemluYy00MDAgcHQtMVwiPlxuICAgICAgICAgICAgICAgIFdpZGVvIHJlamVzdHJ1amUgcGXFgm55IGN5a2wgcHJ6ZXN1d2FqxIVjZWdvIHNpxJkga2FkcnUgeiBwxYJ5bm7EhSBhbmltYWNqxIUgcGFyYWxha3N5LCBpZGVhbG5lIGRvIG1lZGnDs3cgc3BvxYJlY3pub8WbY2lvd3ljaC5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=