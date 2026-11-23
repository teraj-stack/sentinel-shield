const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/vortexvr/node_modules/.vite/deps/react.js?v=adc20043";
import { Sparkles, ChevronRight, ChevronLeft, CheckCircle2, X, Eye, Compass } from "/apps/vortexvr/node_modules/.vite/deps/lucide-react.js?v=867ef266";
var _jsxFileName = "/app/applet/src/components/InteractiveTutorialGuide.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/vortexvr/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=adc20043";
export const InteractiveTutorialGuide = ({ lang, isOpen, onClose, showLiveCoachmarks, setShowLiveCoachmarks, onExecuteStepAction }) => {
	const [activeStepIdx, setActiveStepIdx] = useState(0);
	const steps = [
		{
			badgePl: "KROK 1 Z 5 · BUDOWANIE ŚWIATA 3D",
			badgeEn: "STEP 1 OF 5 · BUILDING THE 3D WORLD",
			titlePl: "Gdzie klikać, aby dodawać obiekty i poruszać się po świecie?",
			titleEn: "Where to click to add 3D objects and navigate the world?",
			descPl: "W dolnym doku znajduje się zakładka \"1. Paleta Obiektów (Przeciągnij i Upuść)\". Możesz kliknąć dowolny kafelek (np. Łazik XR, Brama Portalowa, Kryształ) lub przeciągnąć go myszką bezpośrednio na wybrane miejsce podłogi 3D. Lewym przyciskiem myszy obracasz kamerę, prawym przesuwasz widok, a kółkiem przybliżasz.",
			descEn: "In the bottom dock, open \"1. Object Palette (Drag & Drop)\". Click any card or drag it directly onto the 3D floor. Left-click and drag on the canvas to orbit the camera, right-click to pan, and scroll to zoom.",
			whereToClickPl: [
				"Dolny dok ➔ zakładka \"1. Paleta Obiektów\" (przeciągnij model na scenę)",
				"Kliknij bezpośrednio na dowolny obiekt 3D na scenie, aby zaznaczyć go złotym pierścieniem",
				"Przyciski \"Kamera: Orbit / Gracz VR / Widok z Góry\" na pasku doku do szybkiej zmiany ujęcia"
			],
			whereToClickEn: [
				"Bottom dock ➔ \"1. Object Palette\" tab (drag any model onto the 3D floor)",
				"Click any 3D object in the scene to select it with the amber ring",
				"Use \"Cam: Orbit / Player VR / Top-Down\" buttons on the dock bar for instant camera angles"
			],
			ctaLabelPl: "Pokaż Paletę Obiektów 3D",
			ctaLabelEn: "Highlight 3D Object Palette",
			action: {
				targetTab: "builder",
				dockTab: "palette",
				openGraphSubView: false
			}
		},
		{
			badgePl: "KROK 2 Z 5 · WPROWADZANIE GRAFIK I UPIĘKSZANIE ŚWIATA",
			badgeEn: "STEP 2 OF 5 · ADDING GRAPHICS, TEXTURES & SKYBOXES",
			titlePl: "Gdzie wprowadzać własne grafiki i tekstury, aby stworzyć piękniejszy świat?",
			titleEn: "Where to upload or generate graphics to create a more beautiful world?",
			descPl: "Masz aż 3 miejsca, w których możesz wprowadzać grafiki i upiększać świat: (1) Przycisk \"Wgraj Grafikę (.PNG/.JPG)\" na górnym pasku sceny 3D pozwala wgrać dowolny obrazek z dysku jako teksturę zaznaczonego obiektu lub jako panoramiczne tło nieba (Skybox). (2) Zakładka \"2. Inspektor Obiektu i PBR\" pozwala zmieniać kolory, połysk metaliczny i wgrywać tekstury. (3) Zakładka \"Studio AI\" generuje unikalne tekstury PBR i animacje na podstawie Twojego opisu tekstowego!",
			descEn: "You have 3 dedicated places to add graphics: (1) The \"Upload Graphic (.PNG/.JPG)\" button in the top bar applies any image from your device onto a 3D object or as the world Skybox backdrop. (2) \"2. Object & PBR Inspector\" adjusts colors, metallic sheen, and custom textures. (3) \"AI Studio\" synthesizes custom PBR textures from text prompts!",
			whereToClickPl: [
				"Górny pasek 3D ➔ przycisk \"Wgraj Grafikę / Teksturę (.PNG/.JPG)\" (nakłada obraz na obiekt lub niebo Skybox)",
				"Dolny dok ➔ zakładka \"2. Inspektor Obiektu i PBR\" (wybór kolorów, metaliczności i przycisk \"Generuj Teksturę AI\")",
				"Górne menu ➔ \"Studio AI\" (wpisz prompt np. \"Złoto-szmaragdowy kryształ\" i kliknij \"Generuj przez AI\")"
			],
			whereToClickEn: [
				"Top 3D bar ➔ \"Upload Graphic / Texture (.PNG/.JPG)\" button (applies image to object or Skybox)",
				"Bottom dock ➔ \"2. Object & PBR Inspector\" (color pickers, metallic sliders, and AI Texture button)",
				"Top navigation ➔ \"AI Studio\" (enter a text prompt and click \"Generate with AI\")"
			],
			ctaLabelPl: "Otwórz Inspektor Grafiki i Materiałów PBR",
			ctaLabelEn: "Open Graphics & PBR Inspector",
			action: {
				targetTab: "builder",
				dockTab: "inspector",
				openGraphSubView: false
			}
		},
		{
			badgePl: "KROK 3 Z 5 · IMPORT WŁASNYCH MODELI 3D",
			badgeEn: "STEP 3 OF 5 · IMPORTING CUSTOM 3D MODELS",
			titlePl: "Gdzie zaimportować własne modele 3D (.OBJ, .GLTF, .JSON)?",
			titleEn: "Where to import custom 3D models (.OBJ, .GLTF, .JSON)?",
			descPl: "Jeśli posiadasz własne modele 3D stworzone w programach typu Blender lub pobrane z internetu, kliknij przycisk \"Import 3D (.OBJ/.GLTF)\" w prawym górnym rogu widoku 3D lub ostatni kafelek \"+ Własny 3D\" w palecie obiektów. Model zostanie natychmiast przetworzony i osadzony na piedestale w Twoim świecie.",
			descEn: "To import your own 3D meshes from Blender or asset libraries, click \"Import 3D (.OBJ/.GLTF)\" in the top-right corner of the 3D viewport or the \"+ Custom 3D\" tile in the object palette.",
			whereToClickPl: ["Prawy górny róg widoku 3D ➔ przycisk \"Import 3D (.OBJ/.GLTF)\"", "Paleta Obiektów ➔ pomarańczowy kafelek \"+ Własny 3D (.OBJ · .GLTF · .JSON)\""],
			whereToClickEn: ["Top-right corner of 3D viewport ➔ \"Import 3D (.OBJ/.GLTF)\" button", "Object Palette ➔ dashed amber tile \"+ Custom 3D (.OBJ · .GLTF · .JSON)\""],
			ctaLabelPl: "Otwórz Okno Importu Modelu 3D",
			ctaLabelEn: "Open 3D Model Import Dialog",
			action: {
				targetTab: "builder",
				dockTab: "palette",
				triggerModelUpload: true
			}
		},
		{
			badgePl: "KROK 4 Z 5 · WIZUALNY GRAF LOGIKI (DRAG & DROP LINII)",
			badgeEn: "STEP 4 OF 5 · VISUAL NODE DEPENDENCY GRAPH",
			titlePl: "Jak łączyć węzły logiki liniami bez programowania?",
			titleEn: "How to wire LogicNodes with drag-and-drop dependency lines?",
			descPl: "W zakładce \"3. Graf Logiki No-Code\" (lub po kliknięciu \"Graf Logiki (Sub-View)\" na górnym pasku) zobaczysz wizualny edytor węzłów. Chwyć pomarańczową kropkę wyjściową (WYJ ●) po prawej stronie jednego węzła i przeciągnij linię do niebieskiej kropki wejściowej (● WEJ) kolejnego węzła. Dzięki temu wyzwolenie pierwszego zdarzenia automatycznie uruchomi całą kaskadę kolejnych efektów!",
			descEn: "In \"3. No-Code Logic Graph\" (or via the \"Logic Graph (Sub-View)\" button), drag a Bezier line from any node’s right amber Output port (OUT ●) to another node’s left blue Input port (● IN) to chain event-trigger dependencies.",
			whereToClickPl: [
				"Dolny dok ➔ zakładka \"3. Graf Logiki No-Code\" lub przycisk \"Pełny Widok Grafu (Sub-View)\"",
				"Przeciągnij linię z prawego portu (●) węzła do lewego portu (●) innego węzła",
				"Kliknij zielony przycisk ▶ na karcie węzła, aby przetestować kaskadę wyzwalaczy na żywo"
			],
			whereToClickEn: [
				"Bottom dock ➔ \"3. No-Code Logic Graph\" tab or \"Full Graph Sub-View\" button",
				"Drag a wire from a node’s right port (●) to another node’s left port (●)",
				"Click the green ▶ button on any node card to test the trigger cascade live"
			],
			ctaLabelPl: "Otwórz Wizualny Edytor Połączeń Logiki",
			ctaLabelEn: "Open Visual Logic Connection Editor",
			action: {
				targetTab: "builder",
				dockTab: "logic",
				openGraphSubView: true
			}
		},
		{
			badgePl: "KROK 5 Z 5 · TESTOWANIE GRY I GENERATOR AI",
			badgeEn: "STEP 5 OF 5 · LIVE PLAYTEST & AI STUDIO",
			titlePl: "Testowanie świata w VR / na telefonie oraz Generator AI",
			titleEn: "Testing your world in VR / Mobile and using AI Studio",
			descPl: "Kliknij pomarańczowy przycisk \"Testuj Grę na Żywo\", aby wejść do świata (poruszaj się klawiszami WASD lub wirtualnym padem dotykowym i klikaj w obiekty 3D, aby zdobywać punkty i wyzwalać połączone węzły logiki). Przejdź też do zakładki \"Studio AI\" w górnym menu, aby wygenerować proceduralne tekstury wysokiej rozdzielczości oraz pełną dokumentację PDF!",
			descEn: "Click \"Live Playtest\" to walk through your world with WASD or virtual touch sticks and click 3D objects to trigger your wired logic chains. Visit \"AI Studio\" in the top bar to synthesize custom PBR textures and export PDF technical documentation!",
			whereToClickPl: ["Górny pasek 3D ➔ \"Testuj Grę na Żywo\" oraz \"VR Split-Screen\" (widok na dwoje oczu)", "Górna nawigacja ➔ \"Studio AI\" (generator tekstur PBR, animacji 3D oraz dokumentacji PDF)"],
			whereToClickEn: ["Top 3D bar ➔ \"Live Playtest\" and \"Stereo Split\" (dual-eye VR view)", "Top navigation ➔ \"AI Studio\" (AI PBR texture generator, 3D animations, and PDF docs)"],
			ctaLabelPl: "Przejdź do Generatora Grafiki w Studio AI",
			ctaLabelEn: "Go to AI Graphics Studio",
			action: { targetTab: "aistudio" }
		}
	];
	if (!isOpen) return null;
	const current = steps[activeStepIdx];
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400",
							children: /* @__PURE__ */ _jsxDEV(Compass, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-base font-bold text-white",
							children: lang === "pl" ? "Interaktywny Samouczek: Jak tworzyć i upiększać świat VR" : "Interactive Tutorial: How to Build & Beautify Your VR World"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 174,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-400",
							children: lang === "pl" ? "Przewodnik krok po kroku: gdzie klikać, gdzie wgrywać grafiki i jak łączyć logikę gry" : "Step-by-step guide: where to click, where to add graphics, and how to wire game logic"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 179,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 173,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 169,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: onClose,
						className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors",
						children: /* @__PURE__ */ _jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 191,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 187,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 168,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "px-6 pt-4 flex items-center gap-2",
					children: steps.map((_, i) => /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => setActiveStepIdx(i),
						className: `h-2 flex-1 rounded-full transition-colors ${i === activeStepIdx ? "bg-amber-500" : i < activeStepIdx ? "bg-emerald-500/60" : "bg-slate-200 dark:bg-slate-800"}`,
						title: `Krok ${i + 1}`
					}, i, false, {
						fileName: _jsxFileName,
						lineNumber: 198,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 196,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "p-6 space-y-4",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "text-xs font-mono font-semibold text-amber-600 dark:text-amber-400",
							children: lang === "pl" ? current.badgePl : current.badgeEn
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 215,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("h4", {
							className: "text-xl font-bold text-slate-900 dark:text-white",
							children: lang === "pl" ? current.titlePl : current.titleEn
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 219,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-sm text-slate-600 dark:text-slate-300 leading-relaxed",
							children: lang === "pl" ? current.descPl : current.descEn
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 223,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 space-y-2",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1.5",
								children: [/* @__PURE__ */ _jsxDEV(Eye, { className: "w-4 h-4 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 230,
									columnNumber: 15
								}, this), lang === "pl" ? "Gdzie dokładnie kliknąć w interfejsie:" : "Exact places to click in the interface:"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 13
							}, this), (lang === "pl" ? current.whereToClickPl : current.whereToClickEn).map((hint, idx) => /* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300",
								children: [/* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-500 shrink-0 mt-0.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 241,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: hint }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 242,
									columnNumber: 19
								}, this)]
							}, idx, true, {
								fileName: _jsxFileName,
								lineNumber: 237,
								columnNumber: 17
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 228,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-wrap items-center justify-between gap-3 pt-2",
							children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer",
								children: [/* @__PURE__ */ _jsxDEV("input", {
									type: "checkbox",
									checked: showLiveCoachmarks,
									onChange: (e) => setShowLiveCoachmarks(e.target.checked),
									className: "accent-amber-500 w-4 h-4"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 251,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "Wyświetlaj ponumerowane dymki z podpowiedziami bezpośrednio na ekranie 3D" : "Show numbered visual hint callouts directly over the 3D workspace" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 257,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 250,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								onClick: () => {
									onExecuteStepAction(current.action);
									onClose();
								},
								className: "px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 whitespace-nowrap",
								children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 271,
									columnNumber: 15
								}, this), lang === "pl" ? current.ctaLabelPl : current.ctaLabelEn]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 249,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "px-6 py-3.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs",
					children: [
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setActiveStepIdx((i) => Math.max(0, i - 1)),
							disabled: activeStepIdx === 0,
							className: "px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1",
							children: [/* @__PURE__ */ _jsxDEV(ChevronLeft, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 284,
								columnNumber: 13
							}, this), lang === "pl" ? "Poprzedni krok" : "Previous"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 279,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("span", {
							className: "font-mono text-slate-500",
							children: [
								activeStepIdx + 1,
								" / ",
								steps.length
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 288,
							columnNumber: 11
						}, this),
						activeStepIdx < steps.length - 1 ? /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setActiveStepIdx((i) => Math.min(steps.length - 1, i + 1)),
							className: "px-4 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 font-semibold flex items-center gap-1",
							children: [lang === "pl" ? "Następny krok" : "Next Step", /* @__PURE__ */ _jsxDEV(ChevronRight, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 298,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 13
						}, this) : /* @__PURE__ */ _jsxDEV("button", {
							onClick: onClose,
							className: "px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold",
							children: lang === "pl" ? "Gotowe – Rozpocznij Tworzenie!" : "Finish & Start Building"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 301,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 278,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 166,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 165,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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d0JBQUMsVUFBRCxFQUFVLFdBQVUsY0FBZTs7OztrQkFDbEMsU0FBUyxPQUFPLFFBQVEsYUFBYSxRQUFRLFVBQ3hDOzs7OztlQUNMOzs7Ozs7S0FDRjs7Ozs7O0lBR0wsd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZjtNQUNFLHdCQUFDLFVBQUQ7T0FDRSxlQUFlLGtCQUFrQixNQUFNLEtBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO09BQ3pELFVBQVUsa0JBQWtCO09BQzVCLFdBQVU7aUJBSFosQ0FLRSx3QkFBQyxhQUFELEVBQWEsV0FBVSxjQUFlOzs7O2lCQUNyQyxTQUFTLE9BQU8sbUJBQW1CLFVBQzlCOzs7Ozs7TUFFUix3QkFBQyxRQUFEO09BQU0sV0FBVTtpQkFBaEI7UUFDRyxnQkFBZ0I7UUFBRTtRQUFJLE1BQU07T0FDekI7Ozs7OztNQUVMLGdCQUFnQixNQUFNLFNBQVMsSUFDOUIsd0JBQUMsVUFBRDtPQUNFLGVBQWUsa0JBQWtCLE1BQU0sS0FBSyxJQUFJLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDO09BQ3hFLFdBQVU7aUJBRlosQ0FJRyxTQUFTLE9BQU8sa0JBQWtCLGFBQ25DLHdCQUFDLGNBQUQsRUFBYyxXQUFVLGNBQWU7Ozs7ZUFDakM7Ozs7O2lCQUVSLHdCQUFDLFVBQUQ7T0FDRSxTQUFTO09BQ1QsV0FBVTtpQkFFVCxTQUFTLE9BQU8sbUNBQW1DO01BQzlDOzs7OztLQUVQOzs7Ozs7R0FDRjs7Ozs7O0NBQ0Y7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiSW50ZXJhY3RpdmVUdXRvcmlhbEd1aWRlLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBMYW5ndWFnZSB9IGZyb20gJy4uL3R5cGVzL3ZyJztcbmltcG9ydCB7XG4gIEhlbHBDaXJjbGUsXG4gIFNwYXJrbGVzLFxuICBJbWFnZSBhcyBJbWFnZUljb24sXG4gIFVwbG9hZCxcbiAgR2l0QnJhbmNoLFxuICBQbGF5LFxuICBDaGV2cm9uUmlnaHQsXG4gIENoZXZyb25MZWZ0LFxuICBDaGVja0NpcmNsZTIsXG4gIFgsXG4gIEV5ZSxcbiAgQ29tcGFzcyxcbiAgTGF5ZXJzLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFR1dG9yaWFsU3RlcEFjdGlvbiB7XG4gIHRhcmdldFRhYj86ICdidWlsZGVyJyB8ICdhaXN0dWRpbycgfCAncmVudGFscycgfCAnY3JtJztcbiAgZG9ja1RhYj86ICdwYWxldHRlJyB8ICdpbnNwZWN0b3InIHwgJ2xvZ2ljJyB8ICdtb2JpbGUnO1xuICBvcGVuR3JhcGhTdWJWaWV3PzogYm9vbGVhbjtcbiAgdHJpZ2dlckltYWdlVXBsb2FkPzogYm9vbGVhbjtcbiAgdHJpZ2dlck1vZGVsVXBsb2FkPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIEludGVyYWN0aXZlVHV0b3JpYWxHdWlkZVByb3BzIHtcbiAgbGFuZzogTGFuZ3VhZ2U7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgc2hvd0xpdmVDb2FjaG1hcmtzOiBib29sZWFuO1xuICBzZXRTaG93TGl2ZUNvYWNobWFya3M6ICh2YWw6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9uRXhlY3V0ZVN0ZXBBY3Rpb246IChhY3Rpb246IFR1dG9yaWFsU3RlcEFjdGlvbikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEludGVyYWN0aXZlVHV0b3JpYWxHdWlkZTogUmVhY3QuRkM8SW50ZXJhY3RpdmVUdXRvcmlhbEd1aWRlUHJvcHM+ID0gKHtcbiAgbGFuZyxcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuICBzaG93TGl2ZUNvYWNobWFya3MsXG4gIHNldFNob3dMaXZlQ29hY2htYXJrcyxcbiAgb25FeGVjdXRlU3RlcEFjdGlvbixcbn0pID0+IHtcbiAgY29uc3QgW2FjdGl2ZVN0ZXBJZHgsIHNldEFjdGl2ZVN0ZXBJZHhdID0gdXNlU3RhdGUoMCk7XG5cbiAgY29uc3Qgc3RlcHMgPSBbXG4gICAge1xuICAgICAgYmFkZ2VQbDogJ0tST0sgMSBaIDUgwrcgQlVET1dBTklFIMWaV0lBVEEgM0QnLFxuICAgICAgYmFkZ2VFbjogJ1NURVAgMSBPRiA1IMK3IEJVSUxESU5HIFRIRSAzRCBXT1JMRCcsXG4gICAgICB0aXRsZVBsOiAnR2R6aWUga2xpa2HEhywgYWJ5IGRvZGF3YcSHIG9iaWVrdHkgaSBwb3J1c3phxIcgc2nEmSBwbyDFm3dpZWNpZT8nLFxuICAgICAgdGl0bGVFbjogJ1doZXJlIHRvIGNsaWNrIHRvIGFkZCAzRCBvYmplY3RzIGFuZCBuYXZpZ2F0ZSB0aGUgd29ybGQ/JyxcbiAgICAgIGRlc2NQbDpcbiAgICAgICAgJ1cgZG9sbnltIGRva3Ugem5hamR1amUgc2nEmSB6YWvFgmFka2EgXCIxLiBQYWxldGEgT2JpZWt0w7N3IChQcnplY2nEhWduaWogaSBVcHXFm8SHKVwiLiBNb8W8ZXN6IGtsaWtuxIXEhyBkb3dvbG55IGthZmVsZWsgKG5wLiDFgWF6aWsgWFIsIEJyYW1hIFBvcnRhbG93YSwgS3J5c3p0YcWCKSBsdWIgcHJ6ZWNpxIVnbsSFxIcgZ28gbXlzemvEhSBiZXpwb8WbcmVkbmlvIG5hIHd5YnJhbmUgbWllanNjZSBwb2TFgm9naSAzRC4gTGV3eW0gcHJ6eWNpc2tpZW0gbXlzenkgb2JyYWNhc3oga2FtZXLEmSwgcHJhd3ltIHByemVzdXdhc3ogd2lkb2ssIGEga8OzxYJraWVtIHByenlibGnFvGFzei4nLFxuICAgICAgZGVzY0VuOlxuICAgICAgICAnSW4gdGhlIGJvdHRvbSBkb2NrLCBvcGVuIFwiMS4gT2JqZWN0IFBhbGV0dGUgKERyYWcgJiBEcm9wKVwiLiBDbGljayBhbnkgY2FyZCBvciBkcmFnIGl0IGRpcmVjdGx5IG9udG8gdGhlIDNEIGZsb29yLiBMZWZ0LWNsaWNrIGFuZCBkcmFnIG9uIHRoZSBjYW52YXMgdG8gb3JiaXQgdGhlIGNhbWVyYSwgcmlnaHQtY2xpY2sgdG8gcGFuLCBhbmQgc2Nyb2xsIHRvIHpvb20uJyxcbiAgICAgIHdoZXJlVG9DbGlja1BsOiBbXG4gICAgICAgICdEb2xueSBkb2sg4p6UIHpha8WCYWRrYSBcIjEuIFBhbGV0YSBPYmlla3TDs3dcIiAocHJ6ZWNpxIVnbmlqIG1vZGVsIG5hIHNjZW7EmSknLFxuICAgICAgICAnS2xpa25paiBiZXpwb8WbcmVkbmlvIG5hIGRvd29sbnkgb2JpZWt0IDNEIG5hIHNjZW5pZSwgYWJ5IHphem5hY3p5xIcgZ28gesWCb3R5bSBwaWVyxZtjaWVuaWVtJyxcbiAgICAgICAgJ1ByenljaXNraSBcIkthbWVyYTogT3JiaXQgLyBHcmFjeiBWUiAvIFdpZG9rIHogR8OzcnlcIiBuYSBwYXNrdSBkb2t1IGRvIHN6eWJraWVqIHptaWFueSB1asSZY2lhJyxcbiAgICAgIF0sXG4gICAgICB3aGVyZVRvQ2xpY2tFbjogW1xuICAgICAgICAnQm90dG9tIGRvY2sg4p6UIFwiMS4gT2JqZWN0IFBhbGV0dGVcIiB0YWIgKGRyYWcgYW55IG1vZGVsIG9udG8gdGhlIDNEIGZsb29yKScsXG4gICAgICAgICdDbGljayBhbnkgM0Qgb2JqZWN0IGluIHRoZSBzY2VuZSB0byBzZWxlY3QgaXQgd2l0aCB0aGUgYW1iZXIgcmluZycsXG4gICAgICAgICdVc2UgXCJDYW06IE9yYml0IC8gUGxheWVyIFZSIC8gVG9wLURvd25cIiBidXR0b25zIG9uIHRoZSBkb2NrIGJhciBmb3IgaW5zdGFudCBjYW1lcmEgYW5nbGVzJyxcbiAgICAgIF0sXG4gICAgICBjdGFMYWJlbFBsOiAnUG9rYcW8IFBhbGV0xJkgT2JpZWt0w7N3IDNEJyxcbiAgICAgIGN0YUxhYmVsRW46ICdIaWdobGlnaHQgM0QgT2JqZWN0IFBhbGV0dGUnLFxuICAgICAgYWN0aW9uOiB7IHRhcmdldFRhYjogJ2J1aWxkZXInLCBkb2NrVGFiOiAncGFsZXR0ZScsIG9wZW5HcmFwaFN1YlZpZXc6IGZhbHNlIH0gYXMgVHV0b3JpYWxTdGVwQWN0aW9uLFxuICAgIH0sXG4gICAge1xuICAgICAgYmFkZ2VQbDogJ0tST0sgMiBaIDUgwrcgV1BST1dBRFpBTklFIEdSQUZJSyBJIFVQScSYS1NaQU5JRSDFmldJQVRBJyxcbiAgICAgIGJhZGdlRW46ICdTVEVQIDIgT0YgNSDCtyBBRERJTkcgR1JBUEhJQ1MsIFRFWFRVUkVTICYgU0tZQk9YRVMnLFxuICAgICAgdGl0bGVQbDogJ0dkemllIHdwcm93YWR6YcSHIHfFgmFzbmUgZ3JhZmlraSBpIHRla3N0dXJ5LCBhYnkgc3R3b3J6ecSHIHBpxJlrbmllanN6eSDFm3dpYXQ/JyxcbiAgICAgIHRpdGxlRW46ICdXaGVyZSB0byB1cGxvYWQgb3IgZ2VuZXJhdGUgZ3JhcGhpY3MgdG8gY3JlYXRlIGEgbW9yZSBiZWF1dGlmdWwgd29ybGQ/JyxcbiAgICAgIGRlc2NQbDpcbiAgICAgICAgJ01hc3ogYcW8IDMgbWllanNjYSwgdyBrdMOzcnljaCBtb8W8ZXN6IHdwcm93YWR6YcSHIGdyYWZpa2kgaSB1cGnEmWtzemHEhyDFm3dpYXQ6ICgxKSBQcnp5Y2lzayBcIldncmFqIEdyYWZpa8SZICguUE5HLy5KUEcpXCIgbmEgZ8Ozcm55bSBwYXNrdSBzY2VueSAzRCBwb3p3YWxhIHdncmHEhyBkb3dvbG55IG9icmF6ZWsgeiBkeXNrdSBqYWtvIHRla3N0dXLEmSB6YXpuYWN6b25lZ28gb2JpZWt0dSBsdWIgamFrbyBwYW5vcmFtaWN6bmUgdMWCbyBuaWViYSAoU2t5Ym94KS4gKDIpIFpha8WCYWRrYSBcIjIuIEluc3Bla3RvciBPYmlla3R1IGkgUEJSXCIgcG96d2FsYSB6bWllbmlhxIcga29sb3J5LCBwb8WCeXNrIG1ldGFsaWN6bnkgaSB3Z3J5d2HEhyB0ZWtzdHVyeS4gKDMpIFpha8WCYWRrYSBcIlN0dWRpbyBBSVwiIGdlbmVydWplIHVuaWthbG5lIHRla3N0dXJ5IFBCUiBpIGFuaW1hY2plIG5hIHBvZHN0YXdpZSBUd29qZWdvIG9waXN1IHRla3N0b3dlZ28hJyxcbiAgICAgIGRlc2NFbjpcbiAgICAgICAgJ1lvdSBoYXZlIDMgZGVkaWNhdGVkIHBsYWNlcyB0byBhZGQgZ3JhcGhpY3M6ICgxKSBUaGUgXCJVcGxvYWQgR3JhcGhpYyAoLlBORy8uSlBHKVwiIGJ1dHRvbiBpbiB0aGUgdG9wIGJhciBhcHBsaWVzIGFueSBpbWFnZSBmcm9tIHlvdXIgZGV2aWNlIG9udG8gYSAzRCBvYmplY3Qgb3IgYXMgdGhlIHdvcmxkIFNreWJveCBiYWNrZHJvcC4gKDIpIFwiMi4gT2JqZWN0ICYgUEJSIEluc3BlY3RvclwiIGFkanVzdHMgY29sb3JzLCBtZXRhbGxpYyBzaGVlbiwgYW5kIGN1c3RvbSB0ZXh0dXJlcy4gKDMpIFwiQUkgU3R1ZGlvXCIgc3ludGhlc2l6ZXMgY3VzdG9tIFBCUiB0ZXh0dXJlcyBmcm9tIHRleHQgcHJvbXB0cyEnLFxuICAgICAgd2hlcmVUb0NsaWNrUGw6IFtcbiAgICAgICAgJ0fDs3JueSBwYXNlayAzRCDinpQgcHJ6eWNpc2sgXCJXZ3JhaiBHcmFmaWvEmSAvIFRla3N0dXLEmSAoLlBORy8uSlBHKVwiIChuYWvFgmFkYSBvYnJheiBuYSBvYmlla3QgbHViIG5pZWJvIFNreWJveCknLFxuICAgICAgICAnRG9sbnkgZG9rIOKelCB6YWvFgmFka2EgXCIyLiBJbnNwZWt0b3IgT2JpZWt0dSBpIFBCUlwiICh3eWLDs3Iga29sb3LDs3csIG1ldGFsaWN6bm/Fm2NpIGkgcHJ6eWNpc2sgXCJHZW5lcnVqIFRla3N0dXLEmSBBSVwiKScsXG4gICAgICAgICdHw7NybmUgbWVudSDinpQgXCJTdHVkaW8gQUlcIiAod3Bpc3ogcHJvbXB0IG5wLiBcIlrFgm90by1zem1hcmFnZG93eSBrcnlzenRhxYJcIiBpIGtsaWtuaWogXCJHZW5lcnVqIHByemV6IEFJXCIpJyxcbiAgICAgIF0sXG4gICAgICB3aGVyZVRvQ2xpY2tFbjogW1xuICAgICAgICAnVG9wIDNEIGJhciDinpQgXCJVcGxvYWQgR3JhcGhpYyAvIFRleHR1cmUgKC5QTkcvLkpQRylcIiBidXR0b24gKGFwcGxpZXMgaW1hZ2UgdG8gb2JqZWN0IG9yIFNreWJveCknLFxuICAgICAgICAnQm90dG9tIGRvY2sg4p6UIFwiMi4gT2JqZWN0ICYgUEJSIEluc3BlY3RvclwiIChjb2xvciBwaWNrZXJzLCBtZXRhbGxpYyBzbGlkZXJzLCBhbmQgQUkgVGV4dHVyZSBidXR0b24pJyxcbiAgICAgICAgJ1RvcCBuYXZpZ2F0aW9uIOKelCBcIkFJIFN0dWRpb1wiIChlbnRlciBhIHRleHQgcHJvbXB0IGFuZCBjbGljayBcIkdlbmVyYXRlIHdpdGggQUlcIiknLFxuICAgICAgXSxcbiAgICAgIGN0YUxhYmVsUGw6ICdPdHfDs3J6IEluc3Bla3RvciBHcmFmaWtpIGkgTWF0ZXJpYcWCw7N3IFBCUicsXG4gICAgICBjdGFMYWJlbEVuOiAnT3BlbiBHcmFwaGljcyAmIFBCUiBJbnNwZWN0b3InLFxuICAgICAgYWN0aW9uOiB7IHRhcmdldFRhYjogJ2J1aWxkZXInLCBkb2NrVGFiOiAnaW5zcGVjdG9yJywgb3BlbkdyYXBoU3ViVmlldzogZmFsc2UgfSBhcyBUdXRvcmlhbFN0ZXBBY3Rpb24sXG4gICAgfSxcbiAgICB7XG4gICAgICBiYWRnZVBsOiAnS1JPSyAzIFogNSDCtyBJTVBPUlQgV8WBQVNOWUNIIE1PREVMSSAzRCcsXG4gICAgICBiYWRnZUVuOiAnU1RFUCAzIE9GIDUgwrcgSU1QT1JUSU5HIENVU1RPTSAzRCBNT0RFTFMnLFxuICAgICAgdGl0bGVQbDogJ0dkemllIHphaW1wb3J0b3dhxIcgd8WCYXNuZSBtb2RlbGUgM0QgKC5PQkosIC5HTFRGLCAuSlNPTik/JyxcbiAgICAgIHRpdGxlRW46ICdXaGVyZSB0byBpbXBvcnQgY3VzdG9tIDNEIG1vZGVscyAoLk9CSiwgLkdMVEYsIC5KU09OKT8nLFxuICAgICAgZGVzY1BsOlxuICAgICAgICAnSmXFm2xpIHBvc2lhZGFzeiB3xYJhc25lIG1vZGVsZSAzRCBzdHdvcnpvbmUgdyBwcm9ncmFtYWNoIHR5cHUgQmxlbmRlciBsdWIgcG9icmFuZSB6IGludGVybmV0dSwga2xpa25paiBwcnp5Y2lzayBcIkltcG9ydCAzRCAoLk9CSi8uR0xURilcIiB3IHByYXd5bSBnw7NybnltIHJvZ3Ugd2lkb2t1IDNEIGx1YiBvc3RhdG5pIGthZmVsZWsgXCIrIFfFgmFzbnkgM0RcIiB3IHBhbGVjaWUgb2JpZWt0w7N3LiBNb2RlbCB6b3N0YW5pZSBuYXR5Y2htaWFzdCBwcnpldHdvcnpvbnkgaSBvc2Fkem9ueSBuYSBwaWVkZXN0YWxlIHcgVHdvaW0gxZt3aWVjaWUuJyxcbiAgICAgIGRlc2NFbjpcbiAgICAgICAgJ1RvIGltcG9ydCB5b3VyIG93biAzRCBtZXNoZXMgZnJvbSBCbGVuZGVyIG9yIGFzc2V0IGxpYnJhcmllcywgY2xpY2sgXCJJbXBvcnQgM0QgKC5PQkovLkdMVEYpXCIgaW4gdGhlIHRvcC1yaWdodCBjb3JuZXIgb2YgdGhlIDNEIHZpZXdwb3J0IG9yIHRoZSBcIisgQ3VzdG9tIDNEXCIgdGlsZSBpbiB0aGUgb2JqZWN0IHBhbGV0dGUuJyxcbiAgICAgIHdoZXJlVG9DbGlja1BsOiBbXG4gICAgICAgICdQcmF3eSBnw7NybnkgcsOzZyB3aWRva3UgM0Qg4p6UIHByenljaXNrIFwiSW1wb3J0IDNEICguT0JKLy5HTFRGKVwiJyxcbiAgICAgICAgJ1BhbGV0YSBPYmlla3TDs3cg4p6UIHBvbWFyYcWEY3pvd3kga2FmZWxlayBcIisgV8WCYXNueSAzRCAoLk9CSiDCtyAuR0xURiDCtyAuSlNPTilcIicsXG4gICAgICBdLFxuICAgICAgd2hlcmVUb0NsaWNrRW46IFtcbiAgICAgICAgJ1RvcC1yaWdodCBjb3JuZXIgb2YgM0Qgdmlld3BvcnQg4p6UIFwiSW1wb3J0IDNEICguT0JKLy5HTFRGKVwiIGJ1dHRvbicsXG4gICAgICAgICdPYmplY3QgUGFsZXR0ZSDinpQgZGFzaGVkIGFtYmVyIHRpbGUgXCIrIEN1c3RvbSAzRCAoLk9CSiDCtyAuR0xURiDCtyAuSlNPTilcIicsXG4gICAgICBdLFxuICAgICAgY3RhTGFiZWxQbDogJ090d8OzcnogT2tubyBJbXBvcnR1IE1vZGVsdSAzRCcsXG4gICAgICBjdGFMYWJlbEVuOiAnT3BlbiAzRCBNb2RlbCBJbXBvcnQgRGlhbG9nJyxcbiAgICAgIGFjdGlvbjogeyB0YXJnZXRUYWI6ICdidWlsZGVyJywgZG9ja1RhYjogJ3BhbGV0dGUnLCB0cmlnZ2VyTW9kZWxVcGxvYWQ6IHRydWUgfSBhcyBUdXRvcmlhbFN0ZXBBY3Rpb24sXG4gICAgfSxcbiAgICB7XG4gICAgICBiYWRnZVBsOiAnS1JPSyA0IFogNSDCtyBXSVpVQUxOWSBHUkFGIExPR0lLSSAoRFJBRyAmIERST1AgTElOSUkpJyxcbiAgICAgIGJhZGdlRW46ICdTVEVQIDQgT0YgNSDCtyBWSVNVQUwgTk9ERSBERVBFTkRFTkNZIEdSQVBIJyxcbiAgICAgIHRpdGxlUGw6ICdKYWsgxYLEhWN6ecSHIHfEmXrFgnkgbG9naWtpIGxpbmlhbWkgYmV6IHByb2dyYW1vd2FuaWE/JyxcbiAgICAgIHRpdGxlRW46ICdIb3cgdG8gd2lyZSBMb2dpY05vZGVzIHdpdGggZHJhZy1hbmQtZHJvcCBkZXBlbmRlbmN5IGxpbmVzPycsXG4gICAgICBkZXNjUGw6XG4gICAgICAgICdXIHpha8WCYWRjZSBcIjMuIEdyYWYgTG9naWtpIE5vLUNvZGVcIiAobHViIHBvIGtsaWtuacSZY2l1IFwiR3JhZiBMb2dpa2kgKFN1Yi1WaWV3KVwiIG5hIGfDs3JueW0gcGFza3UpIHpvYmFjenlzeiB3aXp1YWxueSBlZHl0b3Igd8SZesWCw7N3LiBDaHd5xIcgcG9tYXJhxYRjem93xIUga3JvcGvEmSB3eWrFm2Npb3fEhSAoV1lKIOKXjykgcG8gcHJhd2VqIHN0cm9uaWUgamVkbmVnbyB3xJl6xYJhIGkgcHJ6ZWNpxIVnbmlqIGxpbmnEmSBkbyBuaWViaWVza2llaiBrcm9wa2kgd2VqxZtjaW93ZWogKOKXjyBXRUopIGtvbGVqbmVnbyB3xJl6xYJhLiBEemnEmWtpIHRlbXUgd3l6d29sZW5pZSBwaWVyd3N6ZWdvIHpkYXJ6ZW5pYSBhdXRvbWF0eWN6bmllIHVydWNob21pIGNhxYLEhSBrYXNrYWTEmSBrb2xlam55Y2ggZWZla3TDs3chJyxcbiAgICAgIGRlc2NFbjpcbiAgICAgICAgJ0luIFwiMy4gTm8tQ29kZSBMb2dpYyBHcmFwaFwiIChvciB2aWEgdGhlIFwiTG9naWMgR3JhcGggKFN1Yi1WaWV3KVwiIGJ1dHRvbiksIGRyYWcgYSBCZXppZXIgbGluZSBmcm9tIGFueSBub2Rl4oCZcyByaWdodCBhbWJlciBPdXRwdXQgcG9ydCAoT1VUIOKXjykgdG8gYW5vdGhlciBub2Rl4oCZcyBsZWZ0IGJsdWUgSW5wdXQgcG9ydCAo4pePIElOKSB0byBjaGFpbiBldmVudC10cmlnZ2VyIGRlcGVuZGVuY2llcy4nLFxuICAgICAgd2hlcmVUb0NsaWNrUGw6IFtcbiAgICAgICAgJ0RvbG55IGRvayDinpQgemFrxYJhZGthIFwiMy4gR3JhZiBMb2dpa2kgTm8tQ29kZVwiIGx1YiBwcnp5Y2lzayBcIlBlxYJueSBXaWRvayBHcmFmdSAoU3ViLVZpZXcpXCInLFxuICAgICAgICAnUHJ6ZWNpxIVnbmlqIGxpbmnEmSB6IHByYXdlZ28gcG9ydHUgKOKXjykgd8SZesWCYSBkbyBsZXdlZ28gcG9ydHUgKOKXjykgaW5uZWdvIHfEmXrFgmEnLFxuICAgICAgICAnS2xpa25paiB6aWVsb255IHByenljaXNrIOKWtiBuYSBrYXJjaWUgd8SZesWCYSwgYWJ5IHByemV0ZXN0b3dhxIcga2Fza2FkxJkgd3l6d2FsYWN6eSBuYSDFvHl3bycsXG4gICAgICBdLFxuICAgICAgd2hlcmVUb0NsaWNrRW46IFtcbiAgICAgICAgJ0JvdHRvbSBkb2NrIOKelCBcIjMuIE5vLUNvZGUgTG9naWMgR3JhcGhcIiB0YWIgb3IgXCJGdWxsIEdyYXBoIFN1Yi1WaWV3XCIgYnV0dG9uJyxcbiAgICAgICAgJ0RyYWcgYSB3aXJlIGZyb20gYSBub2Rl4oCZcyByaWdodCBwb3J0ICjil48pIHRvIGFub3RoZXIgbm9kZeKAmXMgbGVmdCBwb3J0ICjil48pJyxcbiAgICAgICAgJ0NsaWNrIHRoZSBncmVlbiDilrYgYnV0dG9uIG9uIGFueSBub2RlIGNhcmQgdG8gdGVzdCB0aGUgdHJpZ2dlciBjYXNjYWRlIGxpdmUnLFxuICAgICAgXSxcbiAgICAgIGN0YUxhYmVsUGw6ICdPdHfDs3J6IFdpenVhbG55IEVkeXRvciBQb8WCxIVjemXFhCBMb2dpa2knLFxuICAgICAgY3RhTGFiZWxFbjogJ09wZW4gVmlzdWFsIExvZ2ljIENvbm5lY3Rpb24gRWRpdG9yJyxcbiAgICAgIGFjdGlvbjogeyB0YXJnZXRUYWI6ICdidWlsZGVyJywgZG9ja1RhYjogJ2xvZ2ljJywgb3BlbkdyYXBoU3ViVmlldzogdHJ1ZSB9IGFzIFR1dG9yaWFsU3RlcEFjdGlvbixcbiAgICB9LFxuICAgIHtcbiAgICAgIGJhZGdlUGw6ICdLUk9LIDUgWiA1IMK3IFRFU1RPV0FOSUUgR1JZIEkgR0VORVJBVE9SIEFJJyxcbiAgICAgIGJhZGdlRW46ICdTVEVQIDUgT0YgNSDCtyBMSVZFIFBMQVlURVNUICYgQUkgU1RVRElPJyxcbiAgICAgIHRpdGxlUGw6ICdUZXN0b3dhbmllIMWbd2lhdGEgdyBWUiAvIG5hIHRlbGVmb25pZSBvcmF6IEdlbmVyYXRvciBBSScsXG4gICAgICB0aXRsZUVuOiAnVGVzdGluZyB5b3VyIHdvcmxkIGluIFZSIC8gTW9iaWxlIGFuZCB1c2luZyBBSSBTdHVkaW8nLFxuICAgICAgZGVzY1BsOlxuICAgICAgICAnS2xpa25paiBwb21hcmHFhGN6b3d5IHByenljaXNrIFwiVGVzdHVqIEdyxJkgbmEgxbt5d29cIiwgYWJ5IHdlasWbxIcgZG8gxZt3aWF0YSAocG9ydXN6YWogc2nEmSBrbGF3aXN6YW1pIFdBU0QgbHViIHdpcnR1YWxueW0gcGFkZW0gZG90eWtvd3ltIGkga2xpa2FqIHcgb2JpZWt0eSAzRCwgYWJ5IHpkb2J5d2HEhyBwdW5rdHkgaSB3eXp3YWxhxIcgcG/FgsSFY3pvbmUgd8SZesWCeSBsb2dpa2kpLiBQcnplamTFuiB0ZcW8IGRvIHpha8WCYWRraSBcIlN0dWRpbyBBSVwiIHcgZ8Ozcm55bSBtZW51LCBhYnkgd3lnZW5lcm93YcSHIHByb2NlZHVyYWxuZSB0ZWtzdHVyeSB3eXNva2llaiByb3pkemllbGN6b8WbY2kgb3JheiBwZcWCbsSFIGRva3VtZW50YWNqxJkgUERGIScsXG4gICAgICBkZXNjRW46XG4gICAgICAgICdDbGljayBcIkxpdmUgUGxheXRlc3RcIiB0byB3YWxrIHRocm91Z2ggeW91ciB3b3JsZCB3aXRoIFdBU0Qgb3IgdmlydHVhbCB0b3VjaCBzdGlja3MgYW5kIGNsaWNrIDNEIG9iamVjdHMgdG8gdHJpZ2dlciB5b3VyIHdpcmVkIGxvZ2ljIGNoYWlucy4gVmlzaXQgXCJBSSBTdHVkaW9cIiBpbiB0aGUgdG9wIGJhciB0byBzeW50aGVzaXplIGN1c3RvbSBQQlIgdGV4dHVyZXMgYW5kIGV4cG9ydCBQREYgdGVjaG5pY2FsIGRvY3VtZW50YXRpb24hJyxcbiAgICAgIHdoZXJlVG9DbGlja1BsOiBbXG4gICAgICAgICdHw7NybnkgcGFzZWsgM0Qg4p6UIFwiVGVzdHVqIEdyxJkgbmEgxbt5d29cIiBvcmF6IFwiVlIgU3BsaXQtU2NyZWVuXCIgKHdpZG9rIG5hIGR3b2plIG9jenUpJyxcbiAgICAgICAgJ0fDs3JuYSBuYXdpZ2FjamEg4p6UIFwiU3R1ZGlvIEFJXCIgKGdlbmVyYXRvciB0ZWtzdHVyIFBCUiwgYW5pbWFjamkgM0Qgb3JheiBkb2t1bWVudGFjamkgUERGKScsXG4gICAgICBdLFxuICAgICAgd2hlcmVUb0NsaWNrRW46IFtcbiAgICAgICAgJ1RvcCAzRCBiYXIg4p6UIFwiTGl2ZSBQbGF5dGVzdFwiIGFuZCBcIlN0ZXJlbyBTcGxpdFwiIChkdWFsLWV5ZSBWUiB2aWV3KScsXG4gICAgICAgICdUb3AgbmF2aWdhdGlvbiDinpQgXCJBSSBTdHVkaW9cIiAoQUkgUEJSIHRleHR1cmUgZ2VuZXJhdG9yLCAzRCBhbmltYXRpb25zLCBhbmQgUERGIGRvY3MpJyxcbiAgICAgIF0sXG4gICAgICBjdGFMYWJlbFBsOiAnUHJ6ZWpkxbogZG8gR2VuZXJhdG9yYSBHcmFmaWtpIHcgU3R1ZGlvIEFJJyxcbiAgICAgIGN0YUxhYmVsRW46ICdHbyB0byBBSSBHcmFwaGljcyBTdHVkaW8nLFxuICAgICAgYWN0aW9uOiB7IHRhcmdldFRhYjogJ2Fpc3R1ZGlvJyB9IGFzIFR1dG9yaWFsU3RlcEFjdGlvbixcbiAgICB9LFxuICBdO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBjdXJyZW50ID0gc3RlcHNbYWN0aXZlU3RlcElkeF07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBiZy1ibGFjay83NSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTJ4bCByb3VuZGVkLTJ4bCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgc2hhZG93LTJ4bCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNiBweS00IGJnLXNsYXRlLTk1MCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1sZyBiZy1hbWJlci01MDAvMjAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1hbWJlci00MDBcIj5cbiAgICAgICAgICAgICAgPENvbXBhc3MgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgPyAnSW50ZXJha3R5d255IFNhbW91Y3plazogSmFrIHR3b3J6ecSHIGkgdXBpxJlrc3phxIcgxZt3aWF0IFZSJ1xuICAgICAgICAgICAgICAgICAgOiAnSW50ZXJhY3RpdmUgVHV0b3JpYWw6IEhvdyB0byBCdWlsZCAmIEJlYXV0aWZ5IFlvdXIgVlIgV29ybGQnfVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgID8gJ1ByemV3b2RuaWsga3JvayBwbyBrcm9rdTogZ2R6aWUga2xpa2HEhywgZ2R6aWUgd2dyeXdhxIcgZ3JhZmlraSBpIGphayDFgsSFY3p5xIcgbG9naWvEmSBncnknXG4gICAgICAgICAgICAgICAgICA6ICdTdGVwLWJ5LXN0ZXAgZ3VpZGU6IHdoZXJlIHRvIGNsaWNrLCB3aGVyZSB0byBhZGQgZ3JhcGhpY3MsIGFuZCBob3cgdG8gd2lyZSBnYW1lIGxvZ2ljJ31cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTdGVwIFByb2dyZXNzIEluZGljYXRvcnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNiBwdC00IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAge3N0ZXBzLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVN0ZXBJZHgoaSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtMiBmbGV4LTEgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgaSA9PT0gYWN0aXZlU3RlcElkeFxuICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwJ1xuICAgICAgICAgICAgICAgICAgOiBpIDwgYWN0aXZlU3RlcElkeFxuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC01MDAvNjAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS0yMDAgZGFyazpiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICB0aXRsZT17YEtyb2sgJHtpICsgMX1gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFN0ZXAgQ29udGVudCBCb2R5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgdGV4dC1hbWJlci02MDAgZGFyazp0ZXh0LWFtYmVyLTQwMFwiPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyBjdXJyZW50LmJhZGdlUGwgOiBjdXJyZW50LmJhZGdlRW59XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/IGN1cnJlbnQudGl0bGVQbCA6IGN1cnJlbnQudGl0bGVFbn1cbiAgICAgICAgICA8L2g0PlxuXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyBjdXJyZW50LmRlc2NQbCA6IGN1cnJlbnQuZGVzY0VufVxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIHsvKiBXaGVyZSB0byBjbGljayBjaGVja2xpc3QgYm94ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgcC00IHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNTAwXCIgLz5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICA/ICdHZHppZSBkb2vFgmFkbmllIGtsaWtuxIXEhyB3IGludGVyZmVqc2llOidcbiAgICAgICAgICAgICAgICA6ICdFeGFjdCBwbGFjZXMgdG8gY2xpY2sgaW4gdGhlIGludGVyZmFjZTonfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7KGxhbmcgPT09ICdwbCcgPyBjdXJyZW50LndoZXJlVG9DbGlja1BsIDogY3VycmVudC53aGVyZVRvQ2xpY2tFbikubWFwKFxuICAgICAgICAgICAgICAoaGludCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yIHRleHQteHMgdGV4dC1zbGF0ZS03MDAgZGFyazp0ZXh0LXNsYXRlLTMwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC01MDAgc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntoaW50fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBUb2dnbGUgTGl2ZSBPbi1TY3JlZW4gQ29hY2htYXJrcyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcHQtMlwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS03MDAgZGFyazp0ZXh0LXNsYXRlLTMwMCBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3Nob3dMaXZlQ29hY2htYXJrc31cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNob3dMaXZlQ29hY2htYXJrcyhlLnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhY2NlbnQtYW1iZXItNTAwIHctNCBoLTRcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgPyAnV3nFm3dpZXRsYWogcG9udW1lcm93YW5lIGR5bWtpIHogcG9kcG93aWVkemlhbWkgYmV6cG/Fm3JlZG5pbyBuYSBla3JhbmllIDNEJ1xuICAgICAgICAgICAgICAgICAgOiAnU2hvdyBudW1iZXJlZCB2aXN1YWwgaGludCBjYWxsb3V0cyBkaXJlY3RseSBvdmVyIHRoZSAzRCB3b3Jrc3BhY2UnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBvbkV4ZWN1dGVTdGVwQWN0aW9uKGN1cnJlbnQuYWN0aW9uKTtcbiAgICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1hbWJlci01MDAgaG92ZXI6YmctYW1iZXItNDAwIHRleHQtc2xhdGUtOTUwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/IGN1cnJlbnQuY3RhTGFiZWxQbCA6IGN1cnJlbnQuY3RhTGFiZWxFbn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRm9vdGVyIE5hdmlnYXRpb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNiBweS0zLjUgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVTdGVwSWR4KChpKSA9PiBNYXRoLm1heCgwLCBpIC0gMSkpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2FjdGl2ZVN0ZXBJZHggPT09IDB9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGRhcms6Ym9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTcwMCBkYXJrOnRleHQtc2xhdGUtMzAwIGhvdmVyOmJnLXNsYXRlLTEwMCBkYXJrOmhvdmVyOmJnLXNsYXRlLTgwMCBkaXNhYmxlZDpvcGFjaXR5LTQwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q2hldnJvbkxlZnQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUG9wcnplZG5pIGtyb2snIDogJ1ByZXZpb3VzJ31cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAge2FjdGl2ZVN0ZXBJZHggKyAxfSAvIHtzdGVwcy5sZW5ndGh9XG4gICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAge2FjdGl2ZVN0ZXBJZHggPCBzdGVwcy5sZW5ndGggLSAxID8gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVTdGVwSWR4KChpKSA9PiBNYXRoLm1pbihzdGVwcy5sZW5ndGggLSAxLCBpICsgMSkpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBkYXJrOmJnLXNsYXRlLTgwMCB0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMCBkYXJrOmhvdmVyOmJnLXNsYXRlLTcwMCBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnTmFzdMSZcG55IGtyb2snIDogJ05leHQgU3RlcCd9XG4gICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0xLjUgcm91bmRlZC1sZyBiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdHb3Rvd2Ug4oCTIFJvenBvY3puaWogVHdvcnplbmllIScgOiAnRmluaXNoICYgU3RhcnQgQnVpbGRpbmcnfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=