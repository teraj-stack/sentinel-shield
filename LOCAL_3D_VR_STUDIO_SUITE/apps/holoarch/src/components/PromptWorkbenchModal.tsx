const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport3_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch/node_modules/.vite/deps/react.js?v=50682de0";
import { Check, Code2, Copy, Download, Eye, FileCode, ImagePlus, Layers, RotateCcw, Sliders, Sparkles, Upload, X } from "/apps/holoarch/node_modules/.vite/deps/lucide-react.js?v=50682de0";
import { generateMasterPrompts, getContextualPromptSuggestions, getUnityScriptsWithConfig, parsePromptToConfig, PROMPT_ANATOMY_LAYERS, UNITY_CODE_SCRIPTS } from "/apps/holoarch/src/data/promptTemplates.ts";
var _jsxFileName = "/app/applet/src/components/PromptWorkbenchModal.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/apps/holoarch/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=50682de0";
export const PromptWorkbenchModal = ({ isOpen, activeTab, onTabChange, onClose, config, onUpdateConfig }) => {
	const [copiedKey, setCopiedKey] = useState(null);
	const [selectedScriptId, setSelectedScriptId] = useState(UNITY_CODE_SCRIPTS[0].id);
	const [refImageError, setRefImageError] = useState(false);
	const [customUrlInput, setCustomUrlInput] = useState("");
	const [customPromptInput, setCustomPromptInput] = useState("");
	const [promptAppliedFeedback, setPromptAppliedFeedback] = useState(false);
	const [scriptSyncFeedback, setScriptSyncFeedback] = useState(false);
	const [suggestionLang, setSuggestionLang] = useState("PL");
	const [lastAppendedId, setLastAppendedId] = useState(null);
	if (!isOpen) return null;
	const handleDownloadTextFile = (filename, content) => {
		const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		setTimeout(() => URL.revokeObjectURL(url), 1500);
	};
	const liveUnityScripts = getUnityScriptsWithConfig(config);
	const handleDownloadAllUnityScripts = () => {
		const combined = liveUnityScripts.map((s) => `// ============================================================================\n// PLIK: ${s.filename}\n// OPIS: ${s.title}\n// ============================================================================\n\n${s.code}\n`).join("\n\n");
		handleDownloadTextFile("HoloArch_Unity6_ARFoundation_Scripts.cs", combined);
	};
	const handleApplyUnityScriptsToScene = () => {
		onUpdateConfig({
			arFramework: "ARFoundation (ARKit + ARCore)",
			renderPipeline: "Unity URP (Universal Render Pipeline)",
			planeDetection: "Blat stołu + Podłoga (Dual Horizontal)",
			hologramStyle: "Diagrid Exoskeleton + Rdzeń BIM",
			occlusionMode: "Głębia Środowiskowa (Environment Depth)",
			parallaxIntensity: .85,
			envLightingIntensity: 1.35,
			showDepthGrid: true,
			showOcclusionObjects: true,
			showFloatingHudPanels: true,
			triggerScanPulse: Date.now()
		});
		setScriptSyncFeedback(true);
		setTimeout(() => setScriptSyncFeedback(false), 2400);
	};
	const { visualPromptPL, visualPromptEN, unitySystemPromptPL } = generateMasterPrompts(config);
	const contextualSuggestions = getContextualPromptSuggestions(customPromptInput, config);
	const missingSuggestionsCount = contextualSuggestions.filter((s) => s.isMissingFromPrompt).length;
	const recommendedNextSuggestion = contextualSuggestions.find((s) => s.isRecommendedNext) || contextualSuggestions[0];
	const handleAppendSuggestion = (suggestion, applyTo3D = true) => {
		const snippet = suggestionLang === "PL" ? suggestion.snippetPL : suggestion.snippetEN;
		const baseText = customPromptInput.trim();
		const separator = baseText.length === 0 ? "" : /[.!?]$/.test(baseText) ? " " : ". ";
		const updatedText = `${baseText}${separator}${snippet}`;
		setCustomPromptInput(updatedText);
		setLastAppendedId(suggestion.id);
		setTimeout(() => setLastAppendedId(null), 1800);
		if (applyTo3D) {
			const extracted = parsePromptToConfig(updatedText);
			onUpdateConfig({
				...extracted,
				...suggestion.configPatch || {},
				triggerScanPulse: Date.now()
			});
		}
	};
	const handleCopy = (key, text) => {
		navigator.clipboard.writeText(text);
		setCopiedKey(key);
		setTimeout(() => setCopiedKey(null), 2e3);
	};
	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result === "string") {
				setRefImageError(false);
				onUpdateConfig({
					customReferenceImageUrl: reader.result,
					showReferenceBillboardIn3D: true
				});
			}
		};
		reader.readAsDataURL(file);
	};
	const activeScript = liveUnityScripts.find((s) => s.id === selectedScriptId) || liveUnityScripts[0];
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-30 flex items-center justify-center p-4 md:p-8 bg-[#040810]/85",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "workbench-modal-title",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "w-full max-w-[1180px] h-[84vh] bg-[#0b1322] border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center justify-between gap-4 px-6 py-4 border-b border-slate-800 bg-[#080f1c]",
				children: [
					/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
						id: "workbench-modal-title",
						className: "text-lg font-bold text-slate-100 tracking-tight",
						children: "Inżynieria Promptów AR & Architektura Unity (ARKit / ARCore)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 192,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-xs text-slate-400 mt-0.5",
						children: "Gotowe prompty wizualne, dekompozycja 6 warstw technicznych oraz kompletne skrypty C# i shadery HLSL"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 198,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 191,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-1 p-1 bg-[#111c30] rounded-lg border border-slate-800",
						children: [
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => onTabChange("prompts"),
								className: `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${activeTab === "prompts" ? "bg-sky-500 text-slate-950" : "text-slate-300 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 214,
									columnNumber: 15
								}, this), "Gotowe Prompty (PL / EN)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 205,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => onTabChange("anatomy"),
								className: `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${activeTab === "anatomy" ? "bg-sky-500 text-slate-950" : "text-slate-300 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 226,
									columnNumber: 15
								}, this), "Jak Napisać Prompt (6 Warstw)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 217,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => onTabChange("unity_code"),
								className: `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${activeTab === "unity_code" ? "bg-sky-500 text-slate-950" : "text-slate-300 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV(Code2, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 238,
									columnNumber: 15
								}, this), "Skrypty Unity C# & HLSL"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 229,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: () => onTabChange("reference"),
								className: `px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${activeTab === "reference" ? "bg-sky-500 text-slate-950" : "text-slate-300 hover:text-white"}`,
								children: [/* @__PURE__ */ _jsxDEV(Eye, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 250,
									columnNumber: 15
								}, this), "Obraz Referencyjny"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 241,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 204,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: onClose,
						className: "px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
						children: [/* @__PURE__ */ _jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 260,
							columnNumber: 13
						}, this), "Wróć do sceny 3D"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 255,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 190,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "flex-1 overflow-y-auto p-6",
				children: [
					activeTab === "prompts" && /* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "lg:col-span-4 bg-[#0e182a] border border-slate-800 rounded-xl p-5 space-y-4",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between border-b border-slate-800 pb-3",
								children: [/* @__PURE__ */ _jsxDEV("h3", {
									className: "text-sm font-semibold text-slate-100 flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV(Sliders, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 273,
										columnNumber: 21
									}, this), "Parametry Techniczne Promptu"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 272,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs text-slate-400",
									children: "Synchronizacja 3D"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 276,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 271,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-medium text-slate-300 mb-1",
										children: "Framework AR i Czujniki Głębi"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 281,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: config.arFramework,
										onChange: (e) => onUpdateConfig({ arFramework: e.target.value }),
										className: "w-full bg-[#080f1c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "ARFoundation (ARKit + ARCore)",
												children: "ARFoundation (ARKit + ARCore)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 293,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "ARKit 6 (LiDAR Scanner)",
												children: "ARKit 6 (LiDAR Scanner)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 296,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "ARCore Depth API",
												children: "ARCore Depth API"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 299,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 284,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 280,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-medium text-slate-300 mb-1",
										children: "Silnik Renderujący Unity"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 304,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: config.renderPipeline,
										onChange: (e) => onUpdateConfig({ renderPipeline: e.target.value }),
										className: "w-full bg-[#080f1c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
										children: [/* @__PURE__ */ _jsxDEV("option", {
											value: "Unity URP (Universal Render Pipeline)",
											children: "Unity URP (Universal Render Pipeline)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 316,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("option", {
											value: "Unity HDRP (High Definition)",
											children: "Unity HDRP (High Definition)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 319,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 307,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 303,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-medium text-slate-300 mb-1",
										children: "Rozpoznawanie Płaszczyzn (Blat i Podłoga)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 326,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: config.planeDetection,
										onChange: (e) => onUpdateConfig({ planeDetection: e.target.value }),
										className: "w-full bg-[#080f1c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Blat stołu + Podłoga (Dual Horizontal)",
												children: "Blat stołu + Podłoga (Dual Horizontal)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 338,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Pełna siatka głębi LiDAR (Scene Mesh)",
												children: "Pełna siatka głębi LiDAR (Scene Mesh)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 341,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Tylko blat stołu (Tabletop Anchor)",
												children: "Tylko blat stołu (Tabletop Anchor)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 344,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 329,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-medium text-slate-300 mb-1",
										children: "Styl Architektoniczny Hologramu"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 351,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: config.hologramStyle,
										onChange: (e) => onUpdateConfig({ hologramStyle: e.target.value }),
										className: "w-full bg-[#080f1c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Diagrid Exoskeleton + Rdzeń BIM",
												children: "Diagrid Exoskeleton + Rdzeń BIM"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 363,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Wolumetryczna Siatka Cyjanowa",
												children: "Wolumetryczna Siatka Cyjanowa"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 366,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Złoto-Błękitna Matryca Solarna",
												children: "Złoto-Błękitna Matryca Solarna"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 369,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 354,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 350,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-medium text-slate-300 mb-1",
										children: "Tryb Okluzji Środowiskowej"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 376,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: config.occlusionMode,
										onChange: (e) => onUpdateConfig({ occlusionMode: e.target.value }),
										className: "w-full bg-[#080f1c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Głębia Środowiskowa (Environment Depth)",
												children: "Głębia Środowiskowa (Environment Depth)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 388,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Maska Stencil (Meble i Filary)",
												children: "Maska Stencil (Meble i Filary)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 391,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Wyłączona",
												children: "Wyłączona"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 394,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 379,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 375,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-medium text-slate-300 mb-1",
										children: "Efekty Cząsteczkowe Za Oknami Salonu"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 399,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: config.windowParticles,
										onChange: (e) => onUpdateConfig({ windowParticles: e.target.value }),
										className: "w-full bg-[#080f1c] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-sky-400",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Cząsteczki Atmosferyczne + Ruch Powietrzny",
												children: "Cząsteczki Atmosferyczne + Ruch Powietrzny"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 412,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Złoty Pył Świetlny + Smugi Wolumetryczne",
												children: "Złoty Pył Świetlny + Smugi Wolumetryczne"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 415,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "Cyber-Deszcz + Strumienie Danych Za Oknem",
												children: "Cyber-Deszcz + Strumienie Danych Za Oknem"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 418,
												columnNumber: 23
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 402,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 398,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "pt-1 border-t border-slate-800/80 space-y-2.5",
										children: [
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-xs text-slate-300 mb-1",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "Liczba Budynków w Grupie (2–5)" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 427,
													columnNumber: 25
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "font-mono tabular-nums text-sky-400",
													children: [
														config.buildingsPerGroup,
														" (",
														config.buildingsPerGroup * 3,
														" łącznie)"
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 428,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 426,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "grid grid-cols-4 gap-1",
												children: [
													2,
													3,
													4,
													5
												].map((n) => /* @__PURE__ */ _jsxDEV("button", {
													type: "button",
													onClick: () => onUpdateConfig({ buildingsPerGroup: n }),
													className: `py-1 text-xs font-mono font-semibold rounded ${config.buildingsPerGroup === n ? "bg-sky-500 text-slate-950" : "bg-[#080f1c] text-slate-300 border border-slate-800"}`,
													children: [n, " bud."]
												}, n, true, {
													fileName: _jsxFileName,
													lineNumber: 434,
													columnNumber: 27
												}, this))
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 432,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 425,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-xs text-slate-300 mb-1",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "Liczba Kondygnacji" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 454,
													columnNumber: 25
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "font-mono tabular-nums text-amber-300",
													children: [config.buildingFloorCount, " pięter"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 455,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 453,
												columnNumber: 23
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
												lineNumber: 459,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 452,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-xs text-slate-300 mb-1",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "Wielkość Blatu Stołu" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 476,
													columnNumber: 25
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
													lineNumber: 477,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 475,
												columnNumber: 23
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
												lineNumber: 482,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 474,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-xs text-slate-300 mb-1",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "Wielkość Pomieszczenia" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 502,
													columnNumber: 25
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
													lineNumber: 503,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 501,
												columnNumber: 23
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
												lineNumber: 508,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 500,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
												className: "block text-xs text-slate-300 mb-1",
												children: "Rozmieszczenie 3D (Poza Jedną Linią)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 527,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("select", {
												value: config.buildingLayout,
												onChange: (e) => onUpdateConfig({ buildingLayout: e.target.value }),
												className: "w-full bg-[#080f1c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100",
												children: [
													/* @__PURE__ */ _jsxDEV("option", {
														value: "Łuk Amfiteatralny (Półkole 3D)",
														children: "Łuk Amfiteatralny (Półkole 3D)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 540,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "Trójkąt Centralny (Układ Delta)",
														children: "Trójkąt Centralny (Układ Delta)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 543,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "Układ Diagonalny (Kaskadowy)",
														children: "Układ Diagonalny (Kaskadowy)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 546,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "Rozrzut Urbanistyczny (Wielopłaszczyznowy)",
														children: "Rozrzut Urbanistyczny (Wielopłaszczyznowy)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 549,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "Linia Klasyczna (Szeregowo)",
														children: "Linia Klasyczna (Szeregowo)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 552,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 530,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 526,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
												className: "block text-xs text-slate-300 mb-1",
												children: "Proporcje Modeli (Układ Poziomy 9:16)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 559,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("select", {
												value: config.modelOrientation916,
												onChange: (e) => onUpdateConfig({ modelOrientation916: e.target.value }),
												className: "w-full bg-[#080f1c] border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-100",
												children: [
													/* @__PURE__ */ _jsxDEV("option", {
														value: "Układ Poziomy 9:16 (Horyzontalne Kompleksy)",
														children: "Układ Poziomy 9:16 (Horyzontalne Kompleksy)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 572,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "Hybrydowy 9:16 (Poziome Skrzydła + Wieże)",
														children: "Hybrydowy 9:16 (Poziome Skrzydła + Wieże)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 575,
														columnNumber: 25
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "Pionowe Wieżowce (Klasyczne)",
														children: "Pionowe Wieżowce (Klasyczne)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 578,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 562,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 558,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-xs text-slate-300 mb-1",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "Głębia Paralaksy 6DoF" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 586,
													columnNumber: 25
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "font-mono tabular-nums text-sky-400",
													children: [Math.round(config.parallaxIntensity * 100), "%"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 587,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 585,
												columnNumber: 23
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
												lineNumber: 591,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 584,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 424,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 279,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 270,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "lg:col-span-8 space-y-5",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "bg-[#0e182a] border border-sky-500/40 rounded-xl p-4 space-y-2.5",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
												className: "text-xs font-bold uppercase tracking-wider text-sky-400",
												children: "Wklej / Zmodyfikuj Prompt i Zbuduj Scenę 3D na Żywo"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 615,
												columnNumber: 23
											}, this), /* @__PURE__ */ _jsxDEV("p", {
												className: "text-[11px] text-slate-400",
												children: "Wklej dowolny wariant promptu AR (wymiary sali, blatu, układ 3D, kondygnacje, 9:16, ruch wahadłowy) i kliknij przycisk, aby zastosować go w scenie 3D."
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 618,
												columnNumber: 23
											}, this)] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 614,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => {
													const textToParse = customPromptInput.trim() || visualPromptPL;
													const extracted = parsePromptToConfig(textToParse);
													onUpdateConfig({
														...extracted,
														triggerScanPulse: Date.now()
													});
													setPromptAppliedFeedback(true);
													setTimeout(() => setPromptAppliedFeedback(false), 2200);
												},
												className: "px-3.5 py-2 text-xs font-bold bg-sky-400 hover:bg-sky-300 text-slate-950 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5",
												children: promptAppliedFeedback ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 639,
													columnNumber: 27
												}, this), "Zastosowano w 3D!"] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 638,
													columnNumber: 25
												}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 644,
													columnNumber: 27
												}, this), "Zastosuj Prompt w Scenie 3D"] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 643,
													columnNumber: 25
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 622,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 613,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("textarea", {
											rows: 4,
											value: customPromptInput,
											onChange: (e) => setCustomPromptInput(e.target.value),
											placeholder: "Wpisz początek promptu (np. 'Fotorealistyczna wizualizacja AR w Unity URP...') lub wybierz gotowe podpowiedzi poniżej, aby budować prompt krok po kroku z kontekstu...",
											className: "w-full bg-[#070d19] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-sky-400"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 650,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex flex-wrap items-center justify-between gap-2 pt-1",
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "flex flex-wrap items-center gap-1.5",
												children: [
													/* @__PURE__ */ _jsxDEV("button", {
														type: "button",
														onClick: () => setCustomPromptInput(suggestionLang === "PL" ? `Fotorealistyczna wizualizacja Rozszerzonej Rzeczywistości (AR) w czasie rzeczywistym, wyrenderowana w silniku ${config.renderPipeline}.` : `Photorealistic real-time Augmented Reality (AR) visualization rendered in ${config.renderPipeline}.`),
														className: "px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition-colors",
														children: "Zacznij od zdania bazowego"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 661,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ _jsxDEV("button", {
														type: "button",
														onClick: () => setCustomPromptInput(suggestionLang === "PL" ? visualPromptPL : visualPromptEN),
														className: "px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-md transition-colors",
														children: "Załaduj pełny prompt sceny"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 674,
														columnNumber: 23
													}, this),
													customPromptInput.trim().length > 0 && /* @__PURE__ */ _jsxDEV("button", {
														type: "button",
														onClick: () => setCustomPromptInput(""),
														className: "px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-rose-300 transition-colors",
														children: "Wyczyść pole"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 688,
														columnNumber: 25
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 660,
												columnNumber: 21
											}, this), recommendedNextSuggestion && /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => handleAppendSuggestion(recommendedNextSuggestion, true),
												className: "px-3 py-1.5 text-[11px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-md transition-colors flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 706,
														columnNumber: 25
													}, this),
													"+ Dopisz kolejny element z kontekstu (Krok",
													" ",
													recommendedNextSuggestion.stepNumber,
													")"
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 699,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 659,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "mt-3 pt-3 border-t border-slate-800/90 space-y-2.5",
											children: [/* @__PURE__ */ _jsxDEV("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ _jsxDEV("span", {
														className: "text-xs font-bold text-slate-100",
														children: "Gotowe Podpowiedzi Dalszych Elementów Promptu (Z Kontekstu)"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 718,
														columnNumber: 27
													}, this), /* @__PURE__ */ _jsxDEV("span", {
														className: "px-2 py-0.5 text-[10px] font-mono font-semibold bg-sky-500/15 text-sky-300 border border-sky-500/30 rounded",
														children: missingSuggestionsCount > 0 ? `Do uzupełnienia: ${missingSuggestionsCount} z ${contextualSuggestions.length}` : "Wszystkie warstwy uwzględnione w prompcie"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 721,
														columnNumber: 27
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 717,
													columnNumber: 25
												}, this), /* @__PURE__ */ _jsxDEV("p", {
													className: "text-[11px] text-slate-400 mt-0.5",
													children: "System analizuje brakujące warstwy w polu tekstowym oraz aktualne parametry sceny 3D i podpowiada kolejne gotowe fragmenty do dopisania jednym kliknięciem:"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 727,
													columnNumber: 25
												}, this)] }, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 716,
													columnNumber: 23
												}, this), /* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center gap-1 bg-[#070d19] p-1 rounded-lg border border-slate-800",
													children: [/* @__PURE__ */ _jsxDEV("button", {
														type: "button",
														onClick: () => setSuggestionLang("PL"),
														className: `px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${suggestionLang === "PL" ? "bg-sky-500 text-slate-950" : "text-slate-400 hover:text-white"}`,
														children: "Podpowiedzi PL"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 734,
														columnNumber: 25
													}, this), /* @__PURE__ */ _jsxDEV("button", {
														type: "button",
														onClick: () => setSuggestionLang("EN"),
														className: `px-2 py-0.5 text-[10px] font-bold rounded transition-colors ${suggestionLang === "EN" ? "bg-sky-500 text-slate-950" : "text-slate-400 hover:text-white"}`,
														children: "Suggestions EN"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 745,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 733,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 715,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("div", {
												className: "grid grid-cols-1 md:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1",
												children: contextualSuggestions.map((item) => {
													const snippetText = suggestionLang === "PL" ? item.snippetPL : item.snippetEN;
													const isJustAppended = lastAppendedId === item.id;
													return /* @__PURE__ */ _jsxDEV("div", {
														className: `rounded-lg p-3 border transition-colors flex flex-col justify-between gap-2 ${item.isRecommendedNext ? "bg-sky-950/35 border-sky-400/70" : item.isMissingFromPrompt ? "bg-[#081120] border-slate-700/90 hover:border-sky-500/50" : "bg-[#060c17]/80 border-slate-800/80 opacity-85 hover:opacity-100"}`,
														children: [/* @__PURE__ */ _jsxDEV("div", {
															className: "space-y-1",
															children: [
																/* @__PURE__ */ _jsxDEV("div", {
																	className: "flex items-center justify-between gap-1.5",
																	children: [/* @__PURE__ */ _jsxDEV("span", {
																		className: "text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold",
																		children: [
																			"Krok ",
																			item.stepNumber,
																			" · ",
																			item.category
																		]
																	}, void 0, true, {
																		fileName: _jsxFileName,
																		lineNumber: 781,
																		columnNumber: 33
																	}, this), item.isRecommendedNext ? /* @__PURE__ */ _jsxDEV("span", {
																		className: "px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded",
																		children: "Rekomendowany dalej"
																	}, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 785,
																		columnNumber: 35
																	}, this) : item.isMissingFromPrompt ? /* @__PURE__ */ _jsxDEV("span", {
																		className: "px-1.5 py-0.5 text-[9px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded",
																		children: "Brak w tekście"
																	}, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 789,
																		columnNumber: 35
																	}, this) : /* @__PURE__ */ _jsxDEV("span", {
																		className: "px-1.5 py-0.5 text-[9px] font-mono bg-slate-800 text-slate-400 rounded",
																		children: "Wariant / w tekście"
																	}, void 0, false, {
																		fileName: _jsxFileName,
																		lineNumber: 793,
																		columnNumber: 35
																	}, this)]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 780,
																	columnNumber: 31
																}, this),
																/* @__PURE__ */ _jsxDEV("div", {
																	className: "text-xs font-bold text-slate-100 leading-snug",
																	children: item.title
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 799,
																	columnNumber: 31
																}, this),
																/* @__PURE__ */ _jsxDEV("p", {
																	className: "text-[11px] text-amber-200/90 leading-tight",
																	children: item.contextReason
																}, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 803,
																	columnNumber: 31
																}, this),
																/* @__PURE__ */ _jsxDEV("div", {
																	className: "mt-1 p-2 rounded bg-[#050912] border border-slate-800/90 text-[11px] font-mono text-slate-300 line-clamp-3",
																	children: [
																		"“",
																		snippetText,
																		"”"
																	]
																}, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 807,
																	columnNumber: 31
																}, this)
															]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 779,
															columnNumber: 29
														}, this), /* @__PURE__ */ _jsxDEV("div", {
															className: "flex items-center justify-between gap-1.5 pt-1",
															children: [/* @__PURE__ */ _jsxDEV("button", {
																type: "button",
																onClick: () => handleAppendSuggestion(item, true),
																className: `flex-1 px-2.5 py-1.5 text-[11px] font-bold rounded transition-colors flex items-center justify-center gap-1 ${isJustAppended ? "bg-emerald-500 text-slate-950" : item.isRecommendedNext ? "bg-sky-400 hover:bg-sky-300 text-slate-950" : "bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40"}`,
																children: isJustAppended ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3 h-3" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 828,
																	columnNumber: 37
																}, this), "Dopisano i zastosowano!"] }, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 827,
																	columnNumber: 35
																}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3 h-3" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 833,
																	columnNumber: 37
																}, this), "+ Dopisz do promptu i 3D"] }, void 0, true, {
																	fileName: _jsxFileName,
																	lineNumber: 832,
																	columnNumber: 35
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 813,
																columnNumber: 31
															}, this), /* @__PURE__ */ _jsxDEV("button", {
																type: "button",
																onClick: () => handleCopy(`ctx_${item.id}`, snippetText),
																title: "Skopiuj sam fragment podpowiedzi do schowka",
																className: "px-2 py-1.5 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700 flex items-center gap-1 shrink-0",
																children: copiedKey === `ctx_${item.id}` ? /* @__PURE__ */ _jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 848,
																	columnNumber: 35
																}, this) : /* @__PURE__ */ _jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
																	fileName: _jsxFileName,
																	lineNumber: 850,
																	columnNumber: 35
																}, this)
															}, void 0, false, {
																fileName: _jsxFileName,
																lineNumber: 839,
																columnNumber: 31
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName,
															lineNumber: 812,
															columnNumber: 29
														}, this)]
													}, item.id, true, {
														fileName: _jsxFileName,
														lineNumber: 769,
														columnNumber: 27
													}, this);
												})
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 760,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 714,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 612,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "bg-[#0e182a] border border-slate-800 rounded-xl p-5",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between gap-4 mb-3",
										children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
											className: "text-sm font-bold text-slate-100",
											children: "01. Kompletny Prompt Wizualno-Techniczny (Język Polski)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 865,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-xs text-slate-400 mt-0.5",
											children: "Zoptymalizowany do generatorów scen 3D/Wideo AI (Veo, Sora, Runway Gen-3) oraz specyfikacji AR"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 868,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 864,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => handleCopy("pl_visual", visualPromptPL),
											className: "px-3.5 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
											children: copiedKey === "pl_visual" ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 879,
												columnNumber: 27
											}, this), "Skopiowano"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 878,
												columnNumber: 25
											}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 884,
												columnNumber: 27
											}, this), "Kopiuj Prompt (PL)"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 883,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 872,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 863,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "p-4 bg-[#070d19] border border-slate-800/80 rounded-lg text-xs text-slate-200 leading-relaxed select-all font-mono",
										children: visualPromptPL
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 890,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 862,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "bg-[#0e182a] border border-slate-800 rounded-xl p-5",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between gap-4 mb-3",
										children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
											className: "text-sm font-bold text-slate-100",
											children: "02. Master Prompt for AI Video & 3D Engines (English — Midjourney v6 / Veo / Sora / Unreal)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 899,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-xs text-slate-400 mt-0.5",
											children: "Wersja angielska zapewniająca najwyższą precyzję detali architektonicznych, LiDAR i paralaksy"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 902,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 898,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => handleCopy("en_visual", visualPromptEN),
											className: "px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
											children: copiedKey === "en_visual" ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 913,
												columnNumber: 27
											}, this), "Skopiowano"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 912,
												columnNumber: 25
											}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 918,
												columnNumber: 27
											}, this), "Kopiuj Prompt (EN)"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 917,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 906,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 897,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "p-4 bg-[#070d19] border border-slate-800/80 rounded-lg text-xs text-slate-200 leading-relaxed select-all font-mono",
										children: visualPromptEN
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 924,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 896,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "bg-[#0e182a] border border-slate-800 rounded-xl p-5",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between gap-4 mb-3",
										children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h3", {
											className: "text-sm font-bold text-slate-100",
											children: "03. Prompt Inżynieryjny dla Asystenta Kodowania Unity 6 (AR Foundation + C# + HLSL)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 933,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-xs text-slate-400 mt-0.5",
											children: "Wklej ten prompt do asystenta AI w IDE, aby wygenerować kompletną logikę ARPlaneManager, AROcclusionManager i VFX Graph"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 936,
											columnNumber: 23
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 932,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => handleCopy("unity_sys", unitySystemPromptPL),
											className: "px-3.5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
											children: copiedKey === "unity_sys" ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 949,
												columnNumber: 27
											}, this), "Skopiowano"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 948,
												columnNumber: 25
											}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 954,
												columnNumber: 27
											}, this), "Kopiuj Specyfikację Unity"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 953,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 940,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 931,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("pre", {
										className: "p-4 bg-[#070d19] border border-slate-800/80 rounded-lg text-xs text-slate-200 leading-relaxed whitespace-pre-wrap select-all font-mono",
										children: unitySystemPromptPL
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 960,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 930,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 610,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 13
					}, this),
					activeTab === "anatomy" && /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "max-w-3xl",
							children: [/* @__PURE__ */ _jsxDEV("h3", {
								className: "text-base font-bold text-slate-100",
								children: "Formula 6 Warstw: Jak skonstruować skuteczny prompt AR dla hologramów architektonicznych"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 971,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "text-xs text-slate-400 mt-1 leading-relaxed",
								children: "Aby model AI lub asystent silnikowy w Unity wiernie odwzorował wszystkie wymagania (detale budynków, czujniki głębi blatu i podłogi, ARKit/ARCore, oświetlenie z okluzją, paralaksę oraz cząsteczki za oknami), prompt musi być podzielony na 6 jednoznacznych klauzul technicznych:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 974,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 970,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-4",
							children: PROMPT_ANATOMY_LAYERS.map((layer) => /* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#0e182a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between gap-2 text-xs text-slate-400 mb-1.5",
										children: [
											/* @__PURE__ */ _jsxDEV("span", {
												className: "font-mono font-semibold text-sky-400",
												children: ["Warstwa ", layer.number]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 987,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("span", { children: "·" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 990,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("span", {
												className: "font-mono text-amber-300/90 truncate",
												children: layer.unityComponent
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 991,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 986,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ _jsxDEV("h4", {
										className: "text-sm font-bold text-slate-100",
										children: layer.title
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 995,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "text-xs text-slate-400 mt-1 leading-relaxed",
										children: layer.purpose
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 998,
										columnNumber: 23
									}, this)
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 985,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "space-y-2.5 pt-2 border-t border-slate-800/80",
									children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between text-xs text-slate-400 mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", { children: "Fraza po polsku (PL)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1006,
											columnNumber: 27
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => handleCopy(`${layer.id}_pl`, layer.polishSnippet),
											className: "text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1",
											children: copiedKey === `${layer.id}_pl` ? "Skopiowano" : "Kopiuj PL"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1007,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1005,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("p", {
										className: "p-2.5 rounded bg-[#070d19] border border-slate-800 text-xs font-mono text-slate-200 select-all",
										children: [
											"\"",
											layer.polishSnippet,
											"\""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1019,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1004,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between text-xs text-slate-400 mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", { children: "Fraza po angielsku (EN)" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1026,
											columnNumber: 27
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => handleCopy(`${layer.id}_en`, layer.englishSnippet),
											className: "text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1",
											children: copiedKey === `${layer.id}_en` ? "Skopiowano" : "Kopiuj EN"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1027,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1025,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("p", {
										className: "p-2.5 rounded bg-[#070d19] border border-slate-800 text-xs font-mono text-slate-300 select-all",
										children: [
											"\"",
											layer.englishSnippet,
											"\""
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1039,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1024,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1003,
									columnNumber: 21
								}, this)]
							}, layer.id, true, {
								fileName: _jsxFileName,
								lineNumber: 981,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 979,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 969,
						columnNumber: 13
					}, this),
					activeTab === "unity_code" && /* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 lg:grid-cols-12 gap-6 h-full",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "lg:col-span-4 space-y-2.5",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ _jsxDEV("h3", {
										className: "text-xs font-semibold text-slate-400",
										children: "Moduły wykonawcze projektu Unity AR"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1055,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: handleDownloadAllUnityScripts,
										className: "px-2.5 py-1 text-[11px] font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-lg transition-colors flex items-center gap-1",
										title: "Pobierz wszystkie 4 skrypty C# i shader HLSL w jednym pliku zbiorczym",
										children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3 h-3" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1064,
											columnNumber: 21
										}, this), "Pobierz Wszystkie (4)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1058,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1054,
									columnNumber: 17
								}, this),
								UNITY_CODE_SCRIPTS.map((script) => {
									const active = script.id === activeScript.id;
									return /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => setSelectedScriptId(script.id),
										className: `w-full text-left p-4 rounded-xl border transition-colors ${active ? "bg-[#12223a] border-sky-500/70 text-white" : "bg-[#0e182a] border-slate-800 text-slate-300 hover:border-slate-700"}`,
										children: [
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex items-center justify-between text-xs font-mono text-sky-400 mb-1",
												children: [/* @__PURE__ */ _jsxDEV("span", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ _jsxDEV(FileCode, { className: "w-3.5 h-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1083,
														columnNumber: 27
													}, this), script.filename]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1082,
													columnNumber: 25
												}, this), /* @__PURE__ */ _jsxDEV("span", { children: script.language.toUpperCase() }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1086,
													columnNumber: 25
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1081,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "text-xs font-bold text-slate-100",
												children: script.title
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1088,
												columnNumber: 23
											}, this),
											/* @__PURE__ */ _jsxDEV("p", {
												className: "text-xs text-slate-400 mt-1 line-clamp-2",
												children: script.description
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1091,
												columnNumber: 23
											}, this)
										]
									}, script.id, true, {
										fileName: _jsxFileName,
										lineNumber: 1071,
										columnNumber: 21
									}, this);
								}),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "p-3.5 rounded-xl bg-[#0e182a] border border-emerald-500/40 space-y-2",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "text-xs font-bold text-emerald-300",
											children: "Synchronizacja Skryptów z Symulatorem 3D"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1100,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("p", {
											className: "text-[11px] text-slate-400 leading-relaxed",
											children: [
												"Zastosuj wartości z klas ",
												/* @__PURE__ */ _jsxDEV("code", {
													className: "text-slate-200",
													children: "ARSurfacePlanePlacement"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1104,
													columnNumber: 46
												}, this),
												",",
												" ",
												/* @__PURE__ */ _jsxDEV("code", {
													className: "text-slate-200",
													children: "EnvironmentLightingAndOcclusion"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1105,
													columnNumber: 21
												}, this),
												",",
												" ",
												/* @__PURE__ */ _jsxDEV("code", {
													className: "text-slate-200",
													children: "ParallaxCameraRigController"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1106,
													columnNumber: 21
												}, this),
												" (0.85f) oraz shadera",
												" ",
												/* @__PURE__ */ _jsxDEV("code", {
													className: "text-slate-200",
													children: "URP_ArchitecturalHologram"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1107,
													columnNumber: 21
												}, this),
												" bezpośrednio w scenie 3D."
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1103,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: handleApplyUnityScriptsToScene,
											className: "w-full py-2 px-3 text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg transition-colors flex items-center justify-center gap-1.5",
											children: scriptSyncFeedback ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1116,
												columnNumber: 25
											}, this), "Zsynchronizowano ze Sceną 3D!"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1115,
												columnNumber: 23
											}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1121,
												columnNumber: 25
											}, this), "Zastosuj Parametry Skryptów w 3D"] }, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1120,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1109,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1099,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1053,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "lg:col-span-8 bg-[#070d19] border border-slate-800 rounded-xl flex flex-col overflow-hidden",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 bg-[#0e182a] border-b border-slate-800",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-xs font-mono font-semibold text-sky-400",
									children: activeScript.filename
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1133,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "text-xs text-slate-400 mt-0.5",
									children: activeScript.description
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1136,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1132,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2 shrink-0",
									children: [/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleDownloadTextFile(activeScript.filename, activeScript.code),
										className: "px-3 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap",
										children: [
											/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1151,
												columnNumber: 23
											}, this),
											"Pobierz ",
											activeScript.filename
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1141,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleCopy(activeScript.id, activeScript.code),
										className: "px-3.5 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
										children: copiedKey === activeScript.id ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1163,
											columnNumber: 27
										}, this), "Skopiowano kod"] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1162,
											columnNumber: 25
										}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [
											/* @__PURE__ */ _jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1168,
												columnNumber: 27
											}, this),
											"Kopiuj ",
											activeScript.filename
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1167,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1154,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1140,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1131,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("pre", {
								className: "p-5 text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed select-all",
								children: /* @__PURE__ */ _jsxDEV("code", { children: activeScript.code }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1176,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1175,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1130,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1051,
						columnNumber: 13
					}, this),
					activeTab === "reference" && /* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "lg:col-span-7 space-y-4",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#070d19] border-2 border-sky-500/40 rounded-2xl overflow-hidden shadow-2xl",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "px-4 py-2.5 bg-[#050a14] border-b border-slate-800 flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-xs font-bold text-slate-200 flex items-center gap-2",
										children: [/* @__PURE__ */ _jsxDEV(ImagePlus, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1189,
											columnNumber: 23
										}, this), "Obraz Referencyjny · Kształt Poziomego Prostokąta (16:9)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1188,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "text-[11px] font-mono text-sky-400",
										children: "PROSTOKĄT POZIOMY (LANDSCAPE)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1192,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1187,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "relative w-full aspect-video bg-[#040811] flex items-center justify-center overflow-hidden",
									children: !refImageError ? /* @__PURE__ */ _jsxDEV("img", {
										src: config.customReferenceImageUrl,
										alt: "Poziomy obraz referencyjny sceny AR",
										referrerPolicy: "no-referrer",
										onError: () => setRefImageError(true),
										className: "w-full h-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1200,
										columnNumber: 23
									}, this) : /* @__PURE__ */ _jsxDEV("div", {
										className: "p-8 text-center",
										children: [/* @__PURE__ */ _jsxDEV("p", {
											className: "text-sm font-semibold text-slate-200",
											children: "Poziomy Obraz Referencyjny Centrum Holograficznego"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1209,
											columnNumber: 25
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-xs text-slate-400 mt-1",
											children: "Wgraj własny plik graficzny poniżej lub przywróć domyślny obraz referencyjny."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1212,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1208,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1198,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1186,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "bg-[#0e182a] border border-slate-800 rounded-xl p-4 space-y-3",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex flex-wrap items-center justify-between gap-2",
									children: [
										/* @__PURE__ */ _jsxDEV("label", {
											className: "px-3.5 py-2 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg cursor-pointer transition-colors flex items-center gap-2",
											children: [
												/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1224,
													columnNumber: 23
												}, this),
												"Wgraj własny obraz z dysku (Prostokąt Poziomy)",
												/* @__PURE__ */ _jsxDEV("input", {
													type: "file",
													accept: "image/*",
													onChange: handleFileUpload,
													className: "hidden"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1226,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1223,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => onUpdateConfig({ showReferenceBillboardIn3D: !config.showReferenceBillboardIn3D }),
											className: `px-3 py-2 text-xs font-semibold rounded-lg border transition-colors ${config.showReferenceBillboardIn3D ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50" : "bg-[#080f1c] text-slate-300 border-slate-700"}`,
											children: [
												"Poziomy ekran referencyjny w 3D:",
												" ",
												config.showReferenceBillboardIn3D ? "Włączony" : "Ukryty"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1234,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => {
												setRefImageError(false);
												onUpdateConfig({ customReferenceImageUrl: "/apps/holoarch/assets/aistudio/Pulpit_centrum_1_33b90400.jpg" });
											},
											className: "px-2.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-[#080f1c] border border-slate-700 rounded-lg flex items-center gap-1",
											children: [/* @__PURE__ */ _jsxDEV(RotateCcw, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1263,
												columnNumber: 23
											}, this), "Domyślny"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1252,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1222,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV("input", {
										type: "url",
										value: customUrlInput,
										onChange: (e) => setCustomUrlInput(e.target.value),
										placeholder: "Lub wklej adres URL poziomego obrazu referencyjnego (https://...)",
										className: "flex-1 bg-[#080f1c] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-sky-400"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1269,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => {
											if (customUrlInput.trim()) {
												setRefImageError(false);
												onUpdateConfig({
													customReferenceImageUrl: customUrlInput.trim(),
													showReferenceBillboardIn3D: true
												});
											}
										},
										className: "px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-lg border border-slate-700",
										children: "Zastosuj URL"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1276,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1268,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1221,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1185,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "lg:col-span-5 bg-[#0e182a] border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ _jsxDEV("h3", {
										className: "text-base font-bold text-slate-100",
										children: "Mapowanie Poziomego Obrazu Referencyjnego na Scenę 3D AR"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1297,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "text-xs text-slate-300 leading-relaxed",
										children: "Wstawiony obraz referencyjny o kształcie poziomego prostokąta (16:9) jest automatycznie osadzany jako szeroki ekran referencyjny wewnątrz sceny 3D oraz stanowi bazę dla kompozycji makiety:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1300,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "space-y-2.5 pt-2",
										children: [
											/* @__PURE__ */ _jsxDEV("div", {
												className: "p-3 rounded-lg bg-[#080f1c] border border-slate-800",
												children: [/* @__PURE__ */ _jsxDEV("div", {
													className: "text-xs font-semibold text-sky-400",
													children: "1. Trzy Klastry Budynków (Układ Nieliniowy i 9:16) + Szklane Ekrany"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1306,
													columnNumber: 23
												}, this), /* @__PURE__ */ _jsxDEV("p", {
													className: "text-xs text-slate-400 mt-0.5",
													children: "Złożone modele grupowe z opcją tworzenia Wspólnego Modelu Przestrzennego i edycji pojedynczych brył oraz 5 interaktywnych szklanych ekranów (Frosted Glass UI)."
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1309,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1305,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "p-3 rounded-lg bg-[#080f1c] border border-slate-800",
												children: [/* @__PURE__ */ _jsxDEV("div", {
													className: "text-xs font-semibold text-sky-400",
													children: "2. Blat Stołu z Mapą Świata + Posadzka Sali"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1315,
													columnNumber: 23
												}, this), /* @__PURE__ */ _jsxDEV("p", {
													className: "text-xs text-slate-400 mt-0.5",
													children: "Wykrywane jako dwie niezależne płaszczyzny poziome (ARPlaneAlignment.HorizontalUp) przez skaner LiDAR/ToF (Y = 0.00m dla blatu oraz Y = -0.82m dla podłogi)."
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1318,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1314,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "p-3 rounded-lg bg-[#080f1c] border border-slate-800",
												children: [/* @__PURE__ */ _jsxDEV("div", {
													className: "text-xs font-semibold text-sky-400",
													children: "3. Skórzane Fotele na Pierwszym Planie i Odbicia Blatu"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1324,
													columnNumber: 23
												}, this), /* @__PURE__ */ _jsxDEV("p", {
													className: "text-xs text-slate-400 mt-0.5",
													children: "Obsługiwane przez AROcclusionManager (Environment Depth) oraz estymację harmonik sferycznych (Spherical Harmonics) rzucającą błękitno-złotą poświatę na blat."
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1327,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1323,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "p-3 rounded-lg bg-[#080f1c] border border-slate-800",
												children: [/* @__PURE__ */ _jsxDEV("div", {
													className: "text-xs font-semibold text-sky-400",
													children: "4. Panorama Miasta i Cząsteczki Za Łukowymi Oknami"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1333,
													columnNumber: 23
												}, this), /* @__PURE__ */ _jsxDEV("p", {
													className: "text-xs text-slate-400 mt-0.5",
													children: "Dynamiczny system cząsteczkowy i strumienie świetlne umieszczone w głębi za arkadami okiennymi, reagujące na ruch kamery z efektem paralaksy."
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1336,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1332,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1304,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1296,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "button",
								onClick: onClose,
								className: "w-full py-2.5 text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-lg transition-colors",
								children: "Przetestuj na żywo w symulatorze 3D AR"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1343,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1295,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1183,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 266,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 188,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 182,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUFDLE1BQUQ7VUFBSSxXQUFVO29CQUFxQztTQUUvQzs7Ozs7U0FDSix3QkFBQyxLQUFEO1VBQUcsV0FBVTtvQkFBeUM7U0FFbkQ7Ozs7O1NBRUgsd0JBQUMsT0FBRDtVQUFLLFdBQVU7b0JBQWY7V0FDRSx3QkFBQyxPQUFEO1lBQUssV0FBVTtzQkFBZixDQUNFLHdCQUFDLE9BQUQ7YUFBSyxXQUFVO3VCQUFxQztZQUUvQzs7OztzQkFDTCx3QkFBQyxLQUFEO2FBQUcsV0FBVTt1QkFBZ0M7WUFFMUM7Ozs7b0JBQ0E7Ozs7OztXQUVMLHdCQUFDLE9BQUQ7WUFBSyxXQUFVO3NCQUFmLENBQ0Usd0JBQUMsT0FBRDthQUFLLFdBQVU7dUJBQXFDO1lBRS9DOzs7O3NCQUNMLHdCQUFDLEtBQUQ7YUFBRyxXQUFVO3VCQUFnQztZQUUxQzs7OztvQkFDQTs7Ozs7O1dBRUwsd0JBQUMsT0FBRDtZQUFLLFdBQVU7c0JBQWYsQ0FDRSx3QkFBQyxPQUFEO2FBQUssV0FBVTt1QkFBcUM7WUFFL0M7Ozs7c0JBQ0wsd0JBQUMsS0FBRDthQUFHLFdBQVU7dUJBQWdDO1lBRTFDOzs7O29CQUNBOzs7Ozs7V0FFTCx3QkFBQyxPQUFEO1lBQUssV0FBVTtzQkFBZixDQUNFLHdCQUFDLE9BQUQ7YUFBSyxXQUFVO3VCQUFxQztZQUUvQzs7OztzQkFDTCx3QkFBQyxLQUFEO2FBQUcsV0FBVTt1QkFBZ0M7WUFFMUM7Ozs7b0JBQ0E7Ozs7OztVQUNGOzs7Ozs7UUFDRjs7Ozs7aUJBRUwsd0JBQUMsVUFBRDtRQUNFLE1BQUs7UUFDTCxTQUFTO1FBQ1QsV0FBVTtrQkFDWDtPQUVPOzs7O2VBQ0w7Ozs7O2NBQ0Y7Ozs7OztJQUVKOzs7OztXQUNGOzs7Ozs7Q0FDRjs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJQcm9tcHRXb3JrYmVuY2hNb2RhbC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQ2hlY2ssXG4gIENvZGUyLFxuICBDb3B5LFxuICBEb3dubG9hZCxcbiAgRXllLFxuICBGaWxlQ29kZSxcbiAgSW1hZ2VQbHVzLFxuICBMYXllcnMsXG4gIFJvdGF0ZUNjdyxcbiAgU2xpZGVycyxcbiAgU3BhcmtsZXMsXG4gIFVwbG9hZCxcbiAgWCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7XG4gIEFSRnJhbWV3b3JrT3B0aW9uLFxuICBBUlN0dWRpb0NvbmZpZyxcbiAgQnVpbGRpbmdMYXlvdXRPcHRpb24sXG4gIEhvbG9ncmFtU3R5bGVPcHRpb24sXG4gIE1vZGVsT3JpZW50YXRpb245MTZPcHRpb24sXG4gIE9jY2x1c2lvbk9wdGlvbixcbiAgUGxhbmVEZXRlY3Rpb25PcHRpb24sXG4gIFJlbmRlclBpcGVsaW5lT3B0aW9uLFxuICBXaW5kb3dQYXJ0aWNsZXNPcHRpb24sXG59IGZyb20gJy4uL3R5cGVzL2FyU3R1ZGlvJztcbmltcG9ydCB7XG4gIENvbnRleHR1YWxQcm9tcHRTdWdnZXN0aW9uLFxuICBnZW5lcmF0ZU1hc3RlclByb21wdHMsXG4gIGdldENvbnRleHR1YWxQcm9tcHRTdWdnZXN0aW9ucyxcbiAgZ2V0VW5pdHlTY3JpcHRzV2l0aENvbmZpZyxcbiAgcGFyc2VQcm9tcHRUb0NvbmZpZyxcbiAgUFJPTVBUX0FOQVRPTVlfTEFZRVJTLFxuICBVTklUWV9DT0RFX1NDUklQVFMsXG59IGZyb20gJy4uL2RhdGEvcHJvbXB0VGVtcGxhdGVzJztcblxuZXhwb3J0IHR5cGUgV29ya2JlbmNoVGFiID0gJ3Byb21wdHMnIHwgJ2FuYXRvbXknIHwgJ3VuaXR5X2NvZGUnIHwgJ3JlZmVyZW5jZSc7XG5cbmludGVyZmFjZSBQcm9tcHRXb3JrYmVuY2hNb2RhbFByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBhY3RpdmVUYWI6IFdvcmtiZW5jaFRhYjtcbiAgb25UYWJDaGFuZ2U6ICh0YWI6IFdvcmtiZW5jaFRhYikgPT4gdm9pZDtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgY29uZmlnOiBBUlN0dWRpb0NvbmZpZztcbiAgb25VcGRhdGVDb25maWc6IChwYXJ0aWFsOiBQYXJ0aWFsPEFSU3R1ZGlvQ29uZmlnPikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IFByb21wdFdvcmtiZW5jaE1vZGFsOiBSZWFjdC5GQzxQcm9tcHRXb3JrYmVuY2hNb2RhbFByb3BzPiA9ICh7XG4gIGlzT3BlbixcbiAgYWN0aXZlVGFiLFxuICBvblRhYkNoYW5nZSxcbiAgb25DbG9zZSxcbiAgY29uZmlnLFxuICBvblVwZGF0ZUNvbmZpZyxcbn0pID0+IHtcbiAgY29uc3QgW2NvcGllZEtleSwgc2V0Q29waWVkS2V5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VsZWN0ZWRTY3JpcHRJZCwgc2V0U2VsZWN0ZWRTY3JpcHRJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KFxuICAgIFVOSVRZX0NPREVfU0NSSVBUU1swXS5pZFxuICApO1xuICBjb25zdCBbcmVmSW1hZ2VFcnJvciwgc2V0UmVmSW1hZ2VFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjdXN0b21VcmxJbnB1dCwgc2V0Q3VzdG9tVXJsSW5wdXRdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbY3VzdG9tUHJvbXB0SW5wdXQsIHNldEN1c3RvbVByb21wdElucHV0XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3Byb21wdEFwcGxpZWRGZWVkYmFjaywgc2V0UHJvbXB0QXBwbGllZEZlZWRiYWNrXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NjcmlwdFN5bmNGZWVkYmFjaywgc2V0U2NyaXB0U3luY0ZlZWRiYWNrXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3N1Z2dlc3Rpb25MYW5nLCBzZXRTdWdnZXN0aW9uTGFuZ10gPSB1c2VTdGF0ZTwnUEwnIHwgJ0VOJz4oJ1BMJyk7XG4gIGNvbnN0IFtsYXN0QXBwZW5kZWRJZCwgc2V0TGFzdEFwcGVuZGVkSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkVGV4dEZpbGUgPSAoZmlsZW5hbWU6IHN0cmluZywgY29udGVudDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSwgeyB0eXBlOiAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04JyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gdXJsO1xuICAgIGxpbmsuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpLCAxNTAwKTtcbiAgfTtcblxuICBjb25zdCBsaXZlVW5pdHlTY3JpcHRzID0gZ2V0VW5pdHlTY3JpcHRzV2l0aENvbmZpZyhjb25maWcpO1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkQWxsVW5pdHlTY3JpcHRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGNvbWJpbmVkID0gbGl2ZVVuaXR5U2NyaXB0c1xuICAgICAgLm1hcChcbiAgICAgICAgKHMpID0+XG4gICAgICAgICAgYC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG4vLyBQTElLOiAke3MuZmlsZW5hbWV9XFxuLy8gT1BJUzogJHtzLnRpdGxlfVxcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG5cXG4ke3MuY29kZX1cXG5gXG4gICAgICApXG4gICAgICAuam9pbignXFxuXFxuJyk7XG4gICAgaGFuZGxlRG93bmxvYWRUZXh0RmlsZSgnSG9sb0FyY2hfVW5pdHk2X0FSRm91bmRhdGlvbl9TY3JpcHRzLmNzJywgY29tYmluZWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFwcGx5VW5pdHlTY3JpcHRzVG9TY2VuZSA9ICgpID0+IHtcbiAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICBhckZyYW1ld29yazogJ0FSRm91bmRhdGlvbiAoQVJLaXQgKyBBUkNvcmUpJyxcbiAgICAgIHJlbmRlclBpcGVsaW5lOiAnVW5pdHkgVVJQIChVbml2ZXJzYWwgUmVuZGVyIFBpcGVsaW5lKScsXG4gICAgICBwbGFuZURldGVjdGlvbjogJ0JsYXQgc3RvxYJ1ICsgUG9kxYJvZ2EgKER1YWwgSG9yaXpvbnRhbCknLFxuICAgICAgaG9sb2dyYW1TdHlsZTogJ0RpYWdyaWQgRXhvc2tlbGV0b24gKyBSZHplxYQgQklNJyxcbiAgICAgIG9jY2x1c2lvbk1vZGU6ICdHxYLEmWJpYSDFmnJvZG93aXNrb3dhIChFbnZpcm9ubWVudCBEZXB0aCknLFxuICAgICAgcGFyYWxsYXhJbnRlbnNpdHk6IDAuODUsXG4gICAgICBlbnZMaWdodGluZ0ludGVuc2l0eTogMS4zNSxcbiAgICAgIHNob3dEZXB0aEdyaWQ6IHRydWUsXG4gICAgICBzaG93T2NjbHVzaW9uT2JqZWN0czogdHJ1ZSxcbiAgICAgIHNob3dGbG9hdGluZ0h1ZFBhbmVsczogdHJ1ZSxcbiAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgfSk7XG4gICAgc2V0U2NyaXB0U3luY0ZlZWRiYWNrKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2NyaXB0U3luY0ZlZWRiYWNrKGZhbHNlKSwgMjQwMCk7XG4gIH07XG5cbiAgY29uc3QgeyB2aXN1YWxQcm9tcHRQTCwgdmlzdWFsUHJvbXB0RU4sIHVuaXR5U3lzdGVtUHJvbXB0UEwgfSA9XG4gICAgZ2VuZXJhdGVNYXN0ZXJQcm9tcHRzKGNvbmZpZyk7XG5cbiAgY29uc3QgY29udGV4dHVhbFN1Z2dlc3Rpb25zID0gZ2V0Q29udGV4dHVhbFByb21wdFN1Z2dlc3Rpb25zKFxuICAgIGN1c3RvbVByb21wdElucHV0LFxuICAgIGNvbmZpZ1xuICApO1xuICBjb25zdCBtaXNzaW5nU3VnZ2VzdGlvbnNDb3VudCA9IGNvbnRleHR1YWxTdWdnZXN0aW9ucy5maWx0ZXIoXG4gICAgKHMpID0+IHMuaXNNaXNzaW5nRnJvbVByb21wdFxuICApLmxlbmd0aDtcbiAgY29uc3QgcmVjb21tZW5kZWROZXh0U3VnZ2VzdGlvbiA9XG4gICAgY29udGV4dHVhbFN1Z2dlc3Rpb25zLmZpbmQoKHMpID0+IHMuaXNSZWNvbW1lbmRlZE5leHQpIHx8XG4gICAgY29udGV4dHVhbFN1Z2dlc3Rpb25zWzBdO1xuXG4gIGNvbnN0IGhhbmRsZUFwcGVuZFN1Z2dlc3Rpb24gPSAoXG4gICAgc3VnZ2VzdGlvbjogQ29udGV4dHVhbFByb21wdFN1Z2dlc3Rpb24sXG4gICAgYXBwbHlUbzNEID0gdHJ1ZVxuICApID0+IHtcbiAgICBjb25zdCBzbmlwcGV0ID1cbiAgICAgIHN1Z2dlc3Rpb25MYW5nID09PSAnUEwnID8gc3VnZ2VzdGlvbi5zbmlwcGV0UEwgOiBzdWdnZXN0aW9uLnNuaXBwZXRFTjtcbiAgICBjb25zdCBiYXNlVGV4dCA9IGN1c3RvbVByb21wdElucHV0LnRyaW0oKTtcbiAgICBjb25zdCBzZXBhcmF0b3IgPVxuICAgICAgYmFzZVRleHQubGVuZ3RoID09PSAwXG4gICAgICAgID8gJydcbiAgICAgICAgOiAvWy4hP10kLy50ZXN0KGJhc2VUZXh0KVxuICAgICAgICA/ICcgJ1xuICAgICAgICA6ICcuICc7XG4gICAgY29uc3QgdXBkYXRlZFRleHQgPSBgJHtiYXNlVGV4dH0ke3NlcGFyYXRvcn0ke3NuaXBwZXR9YDtcbiAgICBzZXRDdXN0b21Qcm9tcHRJbnB1dCh1cGRhdGVkVGV4dCk7XG4gICAgc2V0TGFzdEFwcGVuZGVkSWQoc3VnZ2VzdGlvbi5pZCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRMYXN0QXBwZW5kZWRJZChudWxsKSwgMTgwMCk7XG5cbiAgICBpZiAoYXBwbHlUbzNEKSB7XG4gICAgICBjb25zdCBleHRyYWN0ZWQgPSBwYXJzZVByb21wdFRvQ29uZmlnKHVwZGF0ZWRUZXh0KTtcbiAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgLi4uZXh0cmFjdGVkLFxuICAgICAgICAuLi4oc3VnZ2VzdGlvbi5jb25maWdQYXRjaCB8fCB7fSksXG4gICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weSA9IChrZXk6IHN0cmluZywgdGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCk7XG4gICAgc2V0Q29waWVkS2V5KGtleSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRLZXkobnVsbCksIDIwMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZpbGVVcGxvYWQgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHJlYWRlci5yZXN1bHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHNldFJlZkltYWdlRXJyb3IoZmFsc2UpO1xuICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgY3VzdG9tUmVmZXJlbmNlSW1hZ2VVcmw6IHJlYWRlci5yZXN1bHQsXG4gICAgICAgICAgc2hvd1JlZmVyZW5jZUJpbGxib2FyZEluM0Q6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH07XG5cbiAgY29uc3QgYWN0aXZlU2NyaXB0ID1cbiAgICBsaXZlVW5pdHlTY3JpcHRzLmZpbmQoKHMpID0+IHMuaWQgPT09IHNlbGVjdGVkU2NyaXB0SWQpIHx8XG4gICAgbGl2ZVVuaXR5U2NyaXB0c1swXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei0zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgbWQ6cC04IGJnLVsjMDQwODEwXS84NVwiXG4gICAgICByb2xlPVwiZGlhbG9nXCJcbiAgICAgIGFyaWEtbW9kYWw9XCJ0cnVlXCJcbiAgICAgIGFyaWEtbGFiZWxsZWRieT1cIndvcmtiZW5jaC1tb2RhbC10aXRsZVwiXG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctWzExODBweF0gaC1bODR2aF0gYmctWyMwYjEzMjJdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgc2hhZG93LTJ4bCBmbGV4IGZsZXgtY29sIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICB7LyogTW9kYWwgSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBweC02IHB5LTQgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBiZy1bIzA4MGYxY11cIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgyXG4gICAgICAgICAgICAgIGlkPVwid29ya2JlbmNoLW1vZGFsLXRpdGxlXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDAgdHJhY2tpbmctdGlnaHRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBJbsW8eW5pZXJpYSBQcm9tcHTDs3cgQVIgJiBBcmNoaXRla3R1cmEgVW5pdHkgKEFSS2l0IC8gQVJDb3JlKVxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgIEdvdG93ZSBwcm9tcHR5IHdpenVhbG5lLCBkZWtvbXBvenljamEgNiB3YXJzdHcgdGVjaG5pY3pueWNoIG9yYXoga29tcGxldG5lIHNrcnlwdHkgQyMgaSBzaGFkZXJ5IEhMU0xcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTZWdtZW50ZWQgTW9kZSBTd2l0Y2hlciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHAtMSBiZy1bIzExMWMzMF0gcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25UYWJDaGFuZ2UoJ3Byb21wdHMnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3Byb21wdHMnXG4gICAgICAgICAgICAgICAgICA/ICdiZy1za3ktNTAwIHRleHQtc2xhdGUtOTUwJ1xuICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIEdvdG93ZSBQcm9tcHR5IChQTCAvIEVOKVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRhYkNoYW5nZSgnYW5hdG9teScpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnYW5hdG9teSdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIEphayBOYXBpc2HEhyBQcm9tcHQgKDYgV2Fyc3R3KVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRhYkNoYW5nZSgndW5pdHlfY29kZScpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAndW5pdHlfY29kZSdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENvZGUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgU2tyeXB0eSBVbml0eSBDIyAmIEhMU0xcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25UYWJDaGFuZ2UoJ3JlZmVyZW5jZScpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAncmVmZXJlbmNlJ1xuICAgICAgICAgICAgICAgICAgPyAnYmctc2t5LTUwMCB0ZXh0LXNsYXRlLTk1MCdcbiAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgT2JyYXogUmVmZXJlbmN5am55XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1zbGF0ZS04MDAvODAgaG92ZXI6Ymctc2xhdGUtNzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICBXcsOzxIcgZG8gc2NlbnkgM0RcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1vZGFsIEJvZHkgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTZcIj5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAncHJvbXB0cycgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNiBpdGVtcy1zdGFydFwiPlxuICAgICAgICAgICAgICB7LyogTGVmdCBDb2x1bW46IExpdmUgUHJvbXB0IFBhcmFtZXRlciBDdXN0b21pemVyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTQgYmctWyMwZTE4MmFdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8U2xpZGVycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIFBhcmFtZXRyeSBUZWNobmljem5lIFByb21wdHVcbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+U3luY2hyb25pemFjamEgM0Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIEZyYW1ld29yayBBUiBpIEN6dWpuaWtpIEfFgsSZYmlcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcuYXJGcmFtZXdvcmt9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhckZyYW1ld29yazogZS50YXJnZXQudmFsdWUgYXMgQVJGcmFtZXdvcmtPcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwODBmMWNdIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1za3ktNDAwXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBUkZvdW5kYXRpb24gKEFSS2l0ICsgQVJDb3JlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQVJGb3VuZGF0aW9uIChBUktpdCArIEFSQ29yZSlcbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQVJLaXQgNiAoTGlEQVIgU2Nhbm5lcilcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEFSS2l0IDYgKExpREFSIFNjYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkFSQ29yZSBEZXB0aCBBUElcIj5BUkNvcmUgRGVwdGggQVBJPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICBTaWxuaWsgUmVuZGVydWrEhWN5IFVuaXR5XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLnJlbmRlclBpcGVsaW5lfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyUGlwZWxpbmU6IGUudGFyZ2V0LnZhbHVlIGFzIFJlbmRlclBpcGVsaW5lT3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDgwZjFjXSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVW5pdHkgVVJQIChVbml2ZXJzYWwgUmVuZGVyIFBpcGVsaW5lKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgVW5pdHkgVVJQIChVbml2ZXJzYWwgUmVuZGVyIFBpcGVsaW5lKVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJVbml0eSBIRFJQIChIaWdoIERlZmluaXRpb24pXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBVbml0eSBIRFJQIChIaWdoIERlZmluaXRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICBSb3pwb3puYXdhbmllIFDFgmFzemN6eXpuIChCbGF0IGkgUG9kxYJvZ2EpXG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLnBsYW5lRGV0ZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhbmVEZXRlY3Rpb246IGUudGFyZ2V0LnZhbHVlIGFzIFBsYW5lRGV0ZWN0aW9uT3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDgwZjFjXSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQmxhdCBzdG/FgnUgKyBQb2TFgm9nYSAoRHVhbCBIb3Jpem9udGFsKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQmxhdCBzdG/FgnUgKyBQb2TFgm9nYSAoRHVhbCBIb3Jpem9udGFsKVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQZcWCbmEgc2lhdGthIGfFgsSZYmkgTGlEQVIgKFNjZW5lIE1lc2gpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBQZcWCbmEgc2lhdGthIGfFgsSZYmkgTGlEQVIgKFNjZW5lIE1lc2gpXG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlR5bGtvIGJsYXQgc3RvxYJ1IChUYWJsZXRvcCBBbmNob3IpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBUeWxrbyBibGF0IHN0b8WCdSAoVGFibGV0b3AgQW5jaG9yKVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgU3R5bCBBcmNoaXRla3Rvbmljem55IEhvbG9ncmFtdVxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5ob2xvZ3JhbVN0eWxlfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaG9sb2dyYW1TdHlsZTogZS50YXJnZXQudmFsdWUgYXMgSG9sb2dyYW1TdHlsZU9wdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1bIzA4MGYxY10gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXNreS00MDBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkRpYWdyaWQgRXhvc2tlbGV0b24gKyBSZHplxYQgQklNXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBEaWFncmlkIEV4b3NrZWxldG9uICsgUmR6ZcWEIEJJTVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJXb2x1bWV0cnljem5hIFNpYXRrYSBDeWphbm93YVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgV29sdW1ldHJ5Y3puYSBTaWF0a2EgQ3lqYW5vd2FcbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiWsWCb3RvLULFgsSZa2l0bmEgTWF0cnljYSBTb2xhcm5hXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBaxYJvdG8tQsWCxJlraXRuYSBNYXRyeWNhIFNvbGFybmFcbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIFRyeWIgT2tsdXpqaSDFmnJvZG93aXNrb3dlalxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5vY2NsdXNpb25Nb2RlfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb2NjbHVzaW9uTW9kZTogZS50YXJnZXQudmFsdWUgYXMgT2NjbHVzaW9uT3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDgwZjFjXSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiR8WCxJliaWEgxZpyb2Rvd2lza293YSAoRW52aXJvbm1lbnQgRGVwdGgpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBHxYLEmWJpYSDFmnJvZG93aXNrb3dhIChFbnZpcm9ubWVudCBEZXB0aClcbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTWFza2EgU3RlbmNpbCAoTWVibGUgaSBGaWxhcnkpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBNYXNrYSBTdGVuY2lsIChNZWJsZSBpIEZpbGFyeSlcbiAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiV3nFgsSFY3pvbmFcIj5XecWCxIVjem9uYTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgRWZla3R5IEN6xIVzdGVjemtvd2UgWmEgT2tuYW1pIFNhbG9udVxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy53aW5kb3dQYXJ0aWNsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dQYXJ0aWNsZXM6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgYXMgV2luZG93UGFydGljbGVzT3B0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLVsjMDgwZjFjXSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQ3rEhXN0ZWN6a2kgQXRtb3NmZXJ5Y3puZSArIFJ1Y2ggUG93aWV0cnpueVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgQ3rEhXN0ZWN6a2kgQXRtb3NmZXJ5Y3puZSArIFJ1Y2ggUG93aWV0cnpueVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJaxYJvdHkgUHnFgiDFmndpZXRsbnkgKyBTbXVnaSBXb2x1bWV0cnljem5lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBaxYJvdHkgUHnFgiDFmndpZXRsbnkgKyBTbXVnaSBXb2x1bWV0cnljem5lXG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkN5YmVyLURlc3pjeiArIFN0cnVtaWVuaWUgRGFueWNoIFphIE9rbmVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBDeWJlci1EZXN6Y3ogKyBTdHJ1bWllbmllIERhbnljaCBaYSBPa25lbVxuICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTEgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5MaWN6YmEgQnVkeW5rw7N3IHcgR3J1cGllICgy4oCTNSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLmJ1aWxkaW5nc1Blckdyb3VwfSAoe2NvbmZpZy5idWlsZGluZ3NQZXJHcm91cCAqIDN9IMWCxIVjem5pZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTQgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoWzIsIDMsIDQsIDVdIGFzIGNvbnN0KS5tYXAoKG4pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17bn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoeyBidWlsZGluZ3NQZXJHcm91cDogbiB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweS0xIHRleHQteHMgZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgcm91bmRlZCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmJ1aWxkaW5nc1Blckdyb3VwID09PSBuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLVsjMDgwZjFjXSB0ZXh0LXNsYXRlLTMwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtufSBidWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkxpY3piYSBLb25keWduYWNqaTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1hbWJlci0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbmZpZy5idWlsZGluZ0Zsb29yQ291bnR9IHBpxJl0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW49ezIwfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsxNDB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXsyfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5idWlsZGluZ0Zsb29yQ291bnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWlsZGluZ0Zsb29yQ291bnQ6IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+V2llbGtvxZvEhyBCbGF0dSBTdG/FgnU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnRhYmxlV2lkdGhNZXRlcnMudG9GaXhlZCgxKX1tIMOXeycgJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbmZpZy50YWJsZURlcHRoTWV0ZXJzLnRvRml4ZWQoMSl9bVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17Mi4yfVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXs1Ljh9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGVwPXswLjF9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLnRhYmxlV2lkdGhNZXRlcnN9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdyA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVTaXplUHJlc2V0OiAnTmllc3RhbmRhcmRvd3kgd3ltaWFyIGJsYXR1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZVdpZHRoTWV0ZXJzOiB3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlRGVwdGhNZXRlcnM6IE51bWJlcigodyAqIDAuNSkudG9GaXhlZCgyKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+V2llbGtvxZvEhyBQb21pZXN6Y3plbmlhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LWFtYmVyLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnJvb21XaWR0aE1ldGVycy50b0ZpeGVkKDApfW0gw5d7JyAnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnJvb21EZXB0aE1ldGVycy50b0ZpeGVkKDApfW1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW49ezh9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezI0fVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcucm9vbVdpZHRoTWV0ZXJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJ3ID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb29tU2l6ZVByZXNldDogJ05pZXN0YW5kYXJkb3d5IHd5bWlhciBzYWxpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb29tV2lkdGhNZXRlcnM6IHJ3LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb21EZXB0aE1ldGVyczogTWF0aC5yb3VuZChydyAqIDAuODUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTQwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBSb3ptaWVzemN6ZW5pZSAzRCAoUG96YSBKZWRuxIUgTGluacSFKVxuICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5idWlsZGluZ0xheW91dH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nTGF5b3V0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgYXMgQnVpbGRpbmdMYXlvdXRPcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwODBmMWNdIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTEuNSB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwixYF1ayBBbWZpdGVhdHJhbG55IChQw7PFgmtvbGUgM0QpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIMWBdWsgQW1maXRlYXRyYWxueSAoUMOzxYJrb2xlIDNEKVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVHLDs2prxIV0IENlbnRyYWxueSAoVWvFgmFkIERlbHRhKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBUcsOzamvEhXQgQ2VudHJhbG55IChVa8WCYWQgRGVsdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJVa8WCYWQgRGlhZ29uYWxueSAoS2Fza2Fkb3d5KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBVa8WCYWQgRGlhZ29uYWxueSAoS2Fza2Fkb3d5KVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUm96cnp1dCBVcmJhbmlzdHljem55IChXaWVsb3DFgmFzemN6eXpub3d5KVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBSb3pyenV0IFVyYmFuaXN0eWN6bnkgKFdpZWxvcMWCYXN6Y3p5em5vd3kpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJMaW5pYSBLbGFzeWN6bmEgKFN6ZXJlZ293bylcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgTGluaWEgS2xhc3ljem5hIChTemVyZWdvd28pXG4gICAgICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9wb3JjamUgTW9kZWxpIChVa8WCYWQgUG96aW9teSA5OjE2KVxuICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5tb2RlbE9yaWVudGF0aW9uOTE2fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxPcmllbnRhdGlvbjkxNjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlIGFzIE1vZGVsT3JpZW50YXRpb245MTZPcHRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwODBmMWNdIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTEuNSB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVWvFgmFkIFBvemlvbXkgOToxNiAoSG9yeXpvbnRhbG5lIEtvbXBsZWtzeSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgVWvFgmFkIFBvemlvbXkgOToxNiAoSG9yeXpvbnRhbG5lIEtvbXBsZWtzeSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkh5YnJ5ZG93eSA5OjE2IChQb3ppb21lIFNrcnp5ZMWCYSArIFdpZcW8ZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgSHlicnlkb3d5IDk6MTYgKFBvemlvbWUgU2tyenlkxYJhICsgV2llxbxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUGlvbm93ZSBXaWXFvG93Y2UgKEtsYXN5Y3puZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgUGlvbm93ZSBXaWXFvG93Y2UgKEtsYXN5Y3puZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5HxYLEmWJpYSBQYXJhbGFrc3kgNkRvRjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1za3ktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtNYXRoLnJvdW5kKGNvbmZpZy5wYXJhbGxheEludGVuc2l0eSAqIDEwMCl9JVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1heD17MS41fVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD17MC4wNX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcucGFyYWxsYXhJbnRlbnNpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEludGVuc2l0eTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LXNreS00MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBSaWdodCBDb2x1bW46IEdlbmVyYXRlZCBSZWFkeS10by1Vc2UgUHJvbXB0cyArIEludGVyYWN0aXZlIFByb21wdCBQYXJzZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tOCBzcGFjZS15LTVcIj5cbiAgICAgICAgICAgICAgICB7LyogSW50ZXJhY3RpdmUgUHJvbXB0LXRvLTNEIFNjZW5lIEFwcGxpZXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzBlMTgyYV0gYm9yZGVyIGJvcmRlci1za3ktNTAwLzQwIHJvdW5kZWQteGwgcC00IHNwYWNlLXktMi41XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1za3ktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBXa2xlaiAvIFptb2R5ZmlrdWogUHJvbXB0IGkgWmJ1ZHVqIFNjZW7EmSAzRCBuYSDFu3l3b1xuICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFdrbGVqIGRvd29sbnkgd2FyaWFudCBwcm9tcHR1IEFSICh3eW1pYXJ5IHNhbGksIGJsYXR1LCB1a8WCYWQgM0QsIGtvbmR5Z25hY2plLCA5OjE2LCBydWNoIHdhaGFkxYJvd3kpIGkga2xpa25paiBwcnp5Y2lzaywgYWJ5IHphc3Rvc293YcSHIGdvIHcgc2NlbmllIDNELlxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXh0VG9QYXJzZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVByb21wdElucHV0LnRyaW0oKSB8fCB2aXN1YWxQcm9tcHRQTDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZCA9IHBhcnNlUHJvbXB0VG9Db25maWcodGV4dFRvUGFyc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5leHRyYWN0ZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJTY2FuUHVsc2U6IERhdGUubm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFByb21wdEFwcGxpZWRGZWVkYmFjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0UHJvbXB0QXBwbGllZEZlZWRiYWNrKGZhbHNlKSwgMjIwMCk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtYm9sZCBiZy1za3ktNDAwIGhvdmVyOmJnLXNreS0zMDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtwcm9tcHRBcHBsaWVkRmVlZGJhY2sgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBaYXN0b3Nvd2FubyB3IDNEIVxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFphc3Rvc3VqIFByb21wdCB3IFNjZW5pZSAzRFxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgICByb3dzPXs0fVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VzdG9tUHJvbXB0SW5wdXR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q3VzdG9tUHJvbXB0SW5wdXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldwaXN6IHBvY3rEhXRlayBwcm9tcHR1IChucC4gJ0ZvdG9yZWFsaXN0eWN6bmEgd2l6dWFsaXphY2phIEFSIHcgVW5pdHkgVVJQLi4uJykgbHViIHd5YmllcnogZ290b3dlIHBvZHBvd2llZHppIHBvbmnFvGVqLCBhYnkgYnVkb3dhxIcgcHJvbXB0IGtyb2sgcG8ga3Jva3UgeiBrb250ZWtzdHUuLi5cIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctWyMwNzBkMTldIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcC0zIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMjAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICB7LyogUXVpY2sgU2VlZCAvIENsZWFyIC8gQXV0by1OZXh0IEFjdGlvbiBCYXIgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXN0b21Qcm9tcHRJbnB1dChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uTGFuZyA9PT0gJ1BMJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgRm90b3JlYWxpc3R5Y3puYSB3aXp1YWxpemFjamEgUm96c3plcnpvbmVqIFJ6ZWN6eXdpc3RvxZtjaSAoQVIpIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSwgd3lyZW5kZXJvd2FuYSB3IHNpbG5pa3UgJHtjb25maWcucmVuZGVyUGlwZWxpbmV9LmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYFBob3RvcmVhbGlzdGljIHJlYWwtdGltZSBBdWdtZW50ZWQgUmVhbGl0eSAoQVIpIHZpc3VhbGl6YXRpb24gcmVuZGVyZWQgaW4gJHtjb25maWcucmVuZGVyUGlwZWxpbmV9LmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFphY3puaWogb2QgemRhbmlhIGJhem93ZWdvXG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXN0b21Qcm9tcHRJbnB1dChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWdnZXN0aW9uTGFuZyA9PT0gJ1BMJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB2aXN1YWxQcm9tcHRQTFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB2aXN1YWxQcm9tcHRFTlxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1za3ktMzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFphxYJhZHVqIHBlxYJueSBwcm9tcHQgc2NlbnlcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICB7Y3VzdG9tUHJvbXB0SW5wdXQudHJpbSgpLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q3VzdG9tUHJvbXB0SW5wdXQoJycpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgdGV4dC1bMTFweF0gZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1yb3NlLTMwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFd5Y3p5xZvEhyBwb2xlXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7cmVjb21tZW5kZWROZXh0U3VnZ2VzdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVBcHBlbmRTdWdnZXN0aW9uKHJlY29tbWVuZGVkTmV4dFN1Z2dlc3Rpb24sIHRydWUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSB0ZXh0LVsxMXB4XSBmb250LWJvbGQgYmctZW1lcmFsZC01MDAvMjAgaG92ZXI6YmctZW1lcmFsZC01MDAvMzAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICsgRG9waXN6IGtvbGVqbnkgZWxlbWVudCB6IGtvbnRla3N0dSAoS3Jva3snICd9XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmVjb21tZW5kZWROZXh0U3VnZ2VzdGlvbi5zdGVwTnVtYmVyfSlcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogQ29udGV4dHVhbCBOZXh0IFByb21wdCBFbGVtZW50cyBQYW5lbCAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvOTAgc3BhY2UteS0yLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHb3Rvd2UgUG9kcG93aWVkemkgRGFsc3p5Y2ggRWxlbWVudMOzdyBQcm9tcHR1IChaIEtvbnRla3N0dSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1zZW1pYm9sZCBiZy1za3ktNTAwLzE1IHRleHQtc2t5LTMwMCBib3JkZXIgYm9yZGVyLXNreS01MDAvMzAgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttaXNzaW5nU3VnZ2VzdGlvbnNDb3VudCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYERvIHV6dXBlxYJuaWVuaWE6ICR7bWlzc2luZ1N1Z2dlc3Rpb25zQ291bnR9IHogJHtjb250ZXh0dWFsU3VnZ2VzdGlvbnMubGVuZ3RofWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ1dzenlzdGtpZSB3YXJzdHd5IHV3emdsxJlkbmlvbmUgdyBwcm9tcGNpZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFN5c3RlbSBhbmFsaXp1amUgYnJha3VqxIVjZSB3YXJzdHd5IHcgcG9sdSB0ZWtzdG93eW0gb3JheiBha3R1YWxuZSBwYXJhbWV0cnkgc2NlbnkgM0QgaSBwb2Rwb3dpYWRhIGtvbGVqbmUgZ290b3dlIGZyYWdtZW50eSBkbyBkb3Bpc2FuaWEgamVkbnltIGtsaWtuacSZY2llbTpcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBMYW5ndWFnZSBTd2l0Y2hlciBmb3IgQ29udGV4dHVhbCBTbmlwcGV0cyAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJnLVsjMDcwZDE5XSBwLTEgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U3VnZ2VzdGlvbkxhbmcoJ1BMJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHRleHQtWzEwcHhdIGZvbnQtYm9sZCByb3VuZGVkIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkxhbmcgPT09ICdQTCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgUG9kcG93aWVkemkgUExcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U3VnZ2VzdGlvbkxhbmcoJ0VOJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHRleHQtWzEwcHhdIGZvbnQtYm9sZCByb3VuZGVkIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkxhbmcgPT09ICdFTidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgU3VnZ2VzdGlvbnMgRU5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogR3JpZCBvZiBSZWFkeS10by1Vc2UgQ29udGV4dHVhbCBDb250aW51YXRpb24gQ2FyZHMgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtMi41IG1heC1oLTgwIG92ZXJmbG93LXktYXV0byBwci0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2NvbnRleHR1YWxTdWdnZXN0aW9ucy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNuaXBwZXRUZXh0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3VnZ2VzdGlvbkxhbmcgPT09ICdQTCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGl0ZW0uc25pcHBldFBMXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpdGVtLnNuaXBwZXRFTjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzSnVzdEFwcGVuZGVkID0gbGFzdEFwcGVuZGVkSWQgPT09IGl0ZW0uaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcm91bmRlZC1sZyBwLTMgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGdhcC0yICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmlzUmVjb21tZW5kZWROZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNreS05NTAvMzUgYm9yZGVyLXNreS00MDAvNzAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogaXRlbS5pc01pc3NpbmdGcm9tUHJvbXB0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLVsjMDgxMTIwXSBib3JkZXItc2xhdGUtNzAwLzkwIGhvdmVyOmJvcmRlci1za3ktNTAwLzUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1bIzA2MGMxN10vODAgYm9yZGVyLXNsYXRlLTgwMC84MCBvcGFjaXR5LTg1IGhvdmVyOm9wYWNpdHktMTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXNreS00MDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEtyb2sge2l0ZW0uc3RlcE51bWJlcn0gwrcge2l0ZW0uY2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0uaXNSZWNvbW1lbmRlZE5leHQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmctZW1lcmFsZC01MDAvMjAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJla29tZW5kb3dhbnkgZGFsZWpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiBpdGVtLmlzTWlzc2luZ0Zyb21Qcm9tcHQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSB0ZXh0LVs5cHhdIGZvbnQtbW9ubyBiZy1hbWJlci01MDAvMTUgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzAgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQnJhayB3IHRla8WbY2llXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjUgdGV4dC1bOXB4XSBmb250LW1vbm8gYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdhcmlhbnQgLyB3IHRla8WbY2llXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDAgbGVhZGluZy1zbnVnXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtYW1iZXItMjAwLzkwIGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0uY29udGV4dFJlYXNvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIHAtMiByb3VuZGVkIGJnLVsjMDUwOTEyXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC85MCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgbGluZS1jbGFtcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICZsZHF1bzt7c25pcHBldFRleHR9JnJkcXVvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMS41IHB0LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQXBwZW5kU3VnZ2VzdGlvbihpdGVtLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweC0yLjUgcHktMS41IHRleHQtWzExcHhdIGZvbnQtYm9sZCByb3VuZGVkIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNKdXN0QXBwZW5kZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNTAwIHRleHQtc2xhdGUtOTUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBpdGVtLmlzUmVjb21tZW5kZWROZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1za3ktNDAwIGhvdmVyOmJnLXNreS0zMDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1za3ktNTAwLzIwIGhvdmVyOmJnLXNreS01MDAvMzAgdGV4dC1za3ktMzAwIGJvcmRlciBib3JkZXItc2t5LTUwMC80MCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0p1c3RBcHBlbmRlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRG9waXNhbm8gaSB6YXN0b3Nvd2FubyFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKyBEb3Bpc3ogZG8gcHJvbXB0dSBpIDNEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDb3B5KGBjdHhfJHtpdGVtLmlkfWAsIHNuaXBwZXRUZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiU2tvcGl1aiBzYW0gZnJhZ21lbnQgcG9kcG93aWVkemkgZG8gc2Nob3drYVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMS41IHRleHQtWzExcHhdIGZvbnQtbWVkaXVtIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09IGBjdHhfJHtpdGVtLmlkfWAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPENvcHkgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIDEuIE1hc3RlciBQcm9tcHQgaW4gUG9saXNoICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctWyMwZTE4MmFdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAwMS4gS29tcGxldG55IFByb21wdCBXaXp1YWxuby1UZWNobmljem55IChKxJl6eWsgUG9sc2tpKVxuICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFpvcHR5bWFsaXpvd2FueSBkbyBnZW5lcmF0b3LDs3cgc2NlbiAzRC9XaWRlbyBBSSAoVmVvLCBTb3JhLCBSdW53YXkgR2VuLTMpIG9yYXogc3BlY3lmaWthY2ppIEFSXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoJ3BsX3Zpc3VhbCcsIHZpc3VhbFByb21wdFBMKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctc2t5LTUwMCBob3ZlcjpiZy1za3ktNDAwIHRleHQtc2xhdGUtOTUwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkS2V5ID09PSAncGxfdmlzdWFsJyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFNrb3Bpb3dhbm9cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEtvcGl1aiBQcm9tcHQgKFBMKVxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLVsjMDcwZDE5XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCByb3VuZGVkLWxnIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgbGVhZGluZy1yZWxheGVkIHNlbGVjdC1hbGwgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIHt2aXN1YWxQcm9tcHRQTH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIDIuIE1hc3RlciBQcm9tcHQgaW4gRW5nbGlzaCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMGUxODJhXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgbWItM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgMDIuIE1hc3RlciBQcm9tcHQgZm9yIEFJIFZpZGVvICYgM0QgRW5naW5lcyAoRW5nbGlzaCDigJQgTWlkam91cm5leSB2NiAvIFZlbyAvIFNvcmEgLyBVbnJlYWwpXG4gICAgICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgV2Vyc2phIGFuZ2llbHNrYSB6YXBld25pYWrEhWNhIG5hand5xbxzesSFIHByZWN5emrEmSBkZXRhbGkgYXJjaGl0ZWt0b25pY3pueWNoLCBMaURBUiBpIHBhcmFsYWtzeVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KCdlbl92aXN1YWwnLCB2aXN1YWxQcm9tcHRFTil9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0xMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09ICdlbl92aXN1YWwnID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBTa29waW93YW5vXG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBLb3BpdWogUHJvbXB0IChFTilcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1bIzA3MGQxOV0gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgcm91bmRlZC1sZyB0ZXh0LXhzIHRleHQtc2xhdGUtMjAwIGxlYWRpbmctcmVsYXhlZCBzZWxlY3QtYWxsIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICB7dmlzdWFsUHJvbXB0RU59XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiAzLiBTeXN0ZW0gUHJvbXB0IGZvciBVbml0eSBDb2RpbmcgQUkgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzBlMTgyYV0gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTVcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDAzLiBQcm9tcHQgSW7FvHluaWVyeWpueSBkbGEgQXN5c3RlbnRhIEtvZG93YW5pYSBVbml0eSA2IChBUiBGb3VuZGF0aW9uICsgQyMgKyBITFNMKVxuICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFdrbGVqIHRlbiBwcm9tcHQgZG8gYXN5c3RlbnRhIEFJIHcgSURFLCBhYnkgd3lnZW5lcm93YcSHIGtvbXBsZXRuxIUgbG9naWvEmSBBUlBsYW5lTWFuYWdlciwgQVJPY2NsdXNpb25NYW5hZ2VyIGkgVkZYIEdyYXBoXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDb3B5KCd1bml0eV9zeXMnLCB1bml0eVN5c3RlbVByb21wdFBMKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTEwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gJ3VuaXR5X3N5cycgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFNrb3Bpb3dhbm9cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEtvcGl1aiBTcGVjeWZpa2FjasSZIFVuaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJwLTQgYmctWyMwNzBkMTldIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIHJvdW5kZWQtbGcgdGV4dC14cyB0ZXh0LXNsYXRlLTIwMCBsZWFkaW5nLXJlbGF4ZWQgd2hpdGVzcGFjZS1wcmUtd3JhcCBzZWxlY3QtYWxsIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICB7dW5pdHlTeXN0ZW1Qcm9tcHRQTH1cbiAgICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnYW5hdG9teScgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGxcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgICAgRm9ybXVsYSA2IFdhcnN0dzogSmFrIHNrb25zdHJ1b3dhxIcgc2t1dGVjem55IHByb21wdCBBUiBkbGEgaG9sb2dyYW3Ds3cgYXJjaGl0ZWt0b25pY3pueWNoXG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTEgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICBBYnkgbW9kZWwgQUkgbHViIGFzeXN0ZW50IHNpbG5pa293eSB3IFVuaXR5IHdpZXJuaWUgb2R3em9yb3dhxYIgd3N6eXN0a2llIHd5bWFnYW5pYSAoZGV0YWxlIGJ1ZHlua8OzdywgY3p1am5pa2kgZ8WCxJliaSBibGF0dSBpIHBvZMWCb2dpLCBBUktpdC9BUkNvcmUsIG/Fm3dpZXRsZW5pZSB6IG9rbHV6asSFLCBwYXJhbGFrc8SZIG9yYXogY3rEhXN0ZWN6a2kgemEgb2tuYW1pKSwgcHJvbXB0IG11c2kgYnnEhyBwb2R6aWVsb255IG5hIDYgamVkbm96bmFjem55Y2gga2xhdXp1bCB0ZWNobmljem55Y2g6XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICB7UFJPTVBUX0FOQVRPTVlfTEFZRVJTLm1hcCgobGF5ZXIpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAga2V5PXtsYXllci5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctWyMwZTE4MmFdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01IGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktNFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LXNlbWlib2xkIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBXYXJzdHdhIHtsYXllci5udW1iZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7Ctzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWFtYmVyLTMwMC85MCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bGF5ZXIudW5pdHlDb21wb25lbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGF5ZXIudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTEgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGF5ZXIucHVycG9zZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yLjUgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS00MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5GcmF6YSBwbyBwb2xza3UgKFBMKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVDb3B5KGAke2xheWVyLmlkfV9wbGAsIGxheWVyLnBvbGlzaFNuaXBwZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBob3Zlcjp0ZXh0LXNreS0zMDAgZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gYCR7bGF5ZXIuaWR9X3BsYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnU2tvcGlvd2FubydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ0tvcGl1aiBQTCd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkIGJnLVsjMDcwZDE5XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTIwMCBzZWxlY3QtYWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwie2xheWVyLnBvbGlzaFNuaXBwZXR9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RnJhemEgcG8gYW5naWVsc2t1IChFTik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ29weShgJHtsYXllci5pZH1fZW5gLCBsYXllci5lbmdsaXNoU25pcHBldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1za3ktNDAwIGhvdmVyOnRleHQtc2t5LTMwMCBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkS2V5ID09PSBgJHtsYXllci5pZH1fZW5gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdTa29waW93YW5vJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnS29waXVqIEVOJ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQgYmctWyMwNzBkMTldIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMzAwIHNlbGVjdC1hbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ7bGF5ZXIuZW5nbGlzaFNuaXBwZXR9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3VuaXR5X2NvZGUnICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTYgaC1mdWxsXCI+XG4gICAgICAgICAgICAgIHsvKiBTY3JpcHQgU2VsZWN0b3IgTGlzdCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi00IHNwYWNlLXktMi41XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMlwiPlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICBNb2R1xYJ5IHd5a29uYXdjemUgcHJvamVrdHUgVW5pdHkgQVJcbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZEFsbFVuaXR5U2NyaXB0c31cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCBiZy1hbWJlci01MDAvMjAgaG92ZXI6YmctYW1iZXItNTAwLzMwIHRleHQtYW1iZXItMzAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzQwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogd3N6eXN0a2llIDQgc2tyeXB0eSBDIyBpIHNoYWRlciBITFNMIHcgamVkbnltIHBsaWt1IHpiaW9yY3p5bVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgUG9iaWVyeiBXc3p5c3RraWUgKDQpXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7VU5JVFlfQ09ERV9TQ1JJUFRTLm1hcCgoc2NyaXB0KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhY3RpdmUgPSBzY3JpcHQuaWQgPT09IGFjdGl2ZVNjcmlwdC5pZDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e3NjcmlwdC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFNjcmlwdElkKHNjcmlwdC5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHRleHQtbGVmdCBwLTQgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1bIzEyMjIzYV0gYm9yZGVyLXNreS01MDAvNzAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctWyMwZTE4MmFdIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vIHRleHQtc2t5LTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxGaWxlQ29kZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzY3JpcHQuZmlsZW5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57c2NyaXB0Lmxhbmd1YWdlLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzY3JpcHQudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0xIGxpbmUtY2xhbXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3NjcmlwdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cblxuICAgICAgICAgICAgICAgIHsvKiBTeW5jIFVuaXR5IEMjICYgSExTTCBQYXJhbWV0ZXJzIHRvIExpdmUgM0QgU2NlbmUgQ2FyZCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctWyMwZTE4MmFdIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgU3luY2hyb25pemFjamEgU2tyeXB0w7N3IHogU3ltdWxhdG9yZW0gM0RcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIFphc3Rvc3VqIHdhcnRvxZtjaSB6IGtsYXMgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj5BUlN1cmZhY2VQbGFuZVBsYWNlbWVudDwvY29kZT4seycgJ31cbiAgICAgICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj5FbnZpcm9ubWVudExpZ2h0aW5nQW5kT2NjbHVzaW9uPC9jb2RlPix7JyAnfVxuICAgICAgICAgICAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPlBhcmFsbGF4Q2FtZXJhUmlnQ29udHJvbGxlcjwvY29kZT4gKDAuODVmKSBvcmF6IHNoYWRlcmF7JyAnfVxuICAgICAgICAgICAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPlVSUF9BcmNoaXRlY3R1cmFsSG9sb2dyYW08L2NvZGU+IGJlenBvxZtyZWRuaW8gdyBzY2VuaWUgM0QuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBcHBseVVuaXR5U2NyaXB0c1RvU2NlbmV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yIHB4LTMgdGV4dC14cyBmb250LWJvbGQgYmctZW1lcmFsZC00MDAgaG92ZXI6YmctZW1lcmFsZC0zMDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3NjcmlwdFN5bmNGZWVkYmFjayA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIFpzeW5jaHJvbml6b3dhbm8gemUgU2NlbsSFIDNEIVxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgWmFzdG9zdWogUGFyYW1ldHJ5IFNrcnlwdMOzdyB3IDNEXG4gICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIENvZGUgVmlld2VyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTggYmctWyMwNzBkMTldIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgZmxleCBmbGV4LWNvbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcHgtNSBweS0zLjUgYmctWyMwZTE4MmFdIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgdGV4dC1za3ktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZVNjcmlwdC5maWxlbmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVTY3JpcHQuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZURvd25sb2FkVGV4dEZpbGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNjcmlwdC5maWxlbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU2NyaXB0LmNvZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIFBvYmllcnoge2FjdGl2ZVNjcmlwdC5maWxlbmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlQ29weShhY3RpdmVTY3JpcHQuaWQsIGFjdGl2ZVNjcmlwdC5jb2RlKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctc2t5LTUwMCBob3ZlcjpiZy1za3ktNDAwIHRleHQtc2xhdGUtOTUwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkS2V5ID09PSBhY3RpdmVTY3JpcHQuaWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBTa29waW93YW5vIGtvZFxuICAgICAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgS29waXVqIHthY3RpdmVTY3JpcHQuZmlsZW5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwicC01IHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMjAwIG92ZXJmbG93LXgtYXV0byBsZWFkaW5nLXJlbGF4ZWQgc2VsZWN0LWFsbFwiPlxuICAgICAgICAgICAgICAgICAgPGNvZGU+e2FjdGl2ZVNjcmlwdC5jb2RlfTwvY29kZT5cbiAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3JlZmVyZW5jZScgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNiBpdGVtcy1zdGFydFwiPlxuICAgICAgICAgICAgICB7LyogTGVmdCBDb2x1bW46IEhvcml6b250YWwgUmVjdGFuZ3VsYXIgUmVmZXJlbmNlIEltYWdlIEZyYW1lICgxNjo5KSArIFVwbG9hZGVyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1bIzA3MGQxOV0gYm9yZGVyLTIgYm9yZGVyLXNreS01MDAvNDAgcm91bmRlZC0yeGwgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy0yeGxcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgYmctWyMwNTBhMTRdIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEltYWdlUGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgT2JyYXogUmVmZXJlbmN5am55IMK3IEtzenRhxYJ0IFBvemlvbWVnbyBQcm9zdG9rxIV0YSAoMTY6OSlcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1za3ktNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgUFJPU1RPS8SEVCBQT1pJT01ZIChMQU5EU0NBUEUpXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogU3RyaWN0bHkgSG9yaXpvbnRhbCBSZWN0YW5ndWxhciBGcmFtZSAoYXNwZWN0LXZpZGVvIC8gMTY6OSkgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBhc3BlY3QtdmlkZW8gYmctWyMwNDA4MTFdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICB7IXJlZkltYWdlRXJyb3IgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtjb25maWcuY3VzdG9tUmVmZXJlbmNlSW1hZ2VVcmx9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbHQ9XCJQb3ppb215IG9icmF6IHJlZmVyZW5jeWpueSBzY2VueSBBUlwiXG4gICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRXJyb3I9eygpID0+IHNldFJlZkltYWdlRXJyb3IodHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlclwiXG4gICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFBvemlvbXkgT2JyYXogUmVmZXJlbmN5am55IENlbnRydW0gSG9sb2dyYWZpY3puZWdvXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgV2dyYWogd8WCYXNueSBwbGlrIGdyYWZpY3pueSBwb25pxbxlaiBsdWIgcHJ6eXdyw7PEhyBkb215xZtsbnkgb2JyYXogcmVmZXJlbmN5am55LlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogVXBsb2FkIC8gVVJMIENvbnRyb2xzIGZvciBIb3Jpem9udGFsIFJlY3Rhbmd1bGFyIFJlZmVyZW5jZSBJbWFnZSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLVsjMGUxODJhXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIGJnLXNreS01MDAgaG92ZXI6Ymctc2t5LTQwMCB0ZXh0LXNsYXRlLTk1MCByb3VuZGVkLWxnIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFVwbG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgV2dyYWogd8WCYXNueSBvYnJheiB6IGR5c2t1IChQcm9zdG9rxIV0IFBvemlvbXkpXG4gICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVGaWxlVXBsb2FkfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UmVmZXJlbmNlQmlsbGJvYXJkSW4zRDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhY29uZmlnLnNob3dSZWZlcmVuY2VCaWxsYm9hcmRJbjNELFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLnNob3dSZWZlcmVuY2VCaWxsYm9hcmRJbjNEXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNTAwLzIwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyLWVtZXJhbGQtNTAwLzUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1bIzA4MGYxY10gdGV4dC1zbGF0ZS0zMDAgYm9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFBvemlvbXkgZWtyYW4gcmVmZXJlbmN5am55IHcgM0Q6eycgJ31cbiAgICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLnNob3dSZWZlcmVuY2VCaWxsYm9hcmRJbjNEID8gJ1fFgsSFY3pvbnknIDogJ1Vrcnl0eSd9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZWZJbWFnZUVycm9yKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUmVmZXJlbmNlSW1hZ2VVcmw6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy9hc3NldHMvYWlzdHVkaW8vUHVscGl0X2NlbnRydW1fMV8zM2I5MDQwMC5qcGcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgYmctWyMwODBmMWNdIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQtbGcgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFJvdGF0ZUNjdyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgRG9tecWbbG55XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInVybFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2N1c3RvbVVybElucHV0fVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q3VzdG9tVXJsSW5wdXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTHViIHdrbGVqIGFkcmVzIFVSTCBwb3ppb21lZ28gb2JyYXp1IHJlZmVyZW5jeWpuZWdvIChodHRwczovLy4uLilcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1bIzA4MGYxY10gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBweC0zIHB5LTEuNSB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItc2t5LTQwMFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VzdG9tVXJsSW5wdXQudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlZkltYWdlRXJyb3IoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tUmVmZXJlbmNlSW1hZ2VVcmw6IGN1c3RvbVVybElucHV0LnRyaW0oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaG93UmVmZXJlbmNlQmlsbGJvYXJkSW4zRDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNreS0zMDAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBaYXN0b3N1aiBVUkxcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IGJnLVsjMGUxODJhXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgTWFwb3dhbmllIFBvemlvbWVnbyBPYnJhenUgUmVmZXJlbmN5am5lZ28gbmEgU2NlbsSZIDNEIEFSXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgV3N0YXdpb255IG9icmF6IHJlZmVyZW5jeWpueSBvIGtzenRhxYJjaWUgcG96aW9tZWdvIHByb3N0b2vEhXRhICgxNjo5KSBqZXN0IGF1dG9tYXR5Y3puaWUgb3NhZHphbnkgamFrbyBzemVyb2tpIGVrcmFuIHJlZmVyZW5jeWpueSB3ZXduxIV0cnogc2NlbnkgM0Qgb3JheiBzdGFub3dpIGJhesSZIGRsYSBrb21wb3p5Y2ppIG1ha2lldHk6XG4gICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yLjUgcHQtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWxnIGJnLVsjMDgwZjFjXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgMS4gVHJ6eSBLbGFzdHJ5IEJ1ZHlua8OzdyAoVWvFgmFkIE5pZWxpbmlvd3kgaSA5OjE2KSArIFN6a2xhbmUgRWtyYW55XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFrFgm/FvG9uZSBtb2RlbGUgZ3J1cG93ZSB6IG9wY2rEhSB0d29yemVuaWEgV3Nww7NsbmVnbyBNb2RlbHUgUHJ6ZXN0cnplbm5lZ28gaSBlZHljamkgcG9qZWR5bmN6eWNoIGJyecWCIG9yYXogNSBpbnRlcmFrdHl3bnljaCBzemtsYW55Y2ggZWtyYW7Ds3cgKEZyb3N0ZWQgR2xhc3MgVUkpLlxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC1sZyBiZy1bIzA4MGYxY10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNreS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDIuIEJsYXQgU3RvxYJ1IHogTWFwxIUgxZp3aWF0YSArIFBvc2FkemthIFNhbGlcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgV3lrcnl3YW5lIGpha28gZHdpZSBuaWV6YWxlxbxuZSBwxYJhc3pjenl6bnkgcG96aW9tZSAoQVJQbGFuZUFsaWdubWVudC5Ib3Jpem9udGFsVXApIHByemV6IHNrYW5lciBMaURBUi9Ub0YgKFkgPSAwLjAwbSBkbGEgYmxhdHUgb3JheiBZID0gLTAuODJtIGRsYSBwb2TFgm9naSkuXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWxnIGJnLVsjMDgwZjFjXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2t5LTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgMy4gU2vDs3J6YW5lIEZvdGVsZSBuYSBQaWVyd3N6eW0gUGxhbmllIGkgT2RiaWNpYSBCbGF0dVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBPYnPFgnVnaXdhbmUgcHJ6ZXogQVJPY2NsdXNpb25NYW5hZ2VyIChFbnZpcm9ubWVudCBEZXB0aCkgb3JheiBlc3R5bWFjasSZIGhhcm1vbmlrIHNmZXJ5Y3pueWNoIChTcGhlcmljYWwgSGFybW9uaWNzKSByenVjYWrEhWPEhSBixYLEmWtpdG5vLXrFgm90xIUgcG/Fm3dpYXTEmSBuYSBibGF0LlxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC1sZyBiZy1bIzA4MGYxY10gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNreS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDQuIFBhbm9yYW1hIE1pYXN0YSBpIEN6xIVzdGVjemtpIFphIMWBdWtvd3ltaSBPa25hbWlcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgRHluYW1pY3pueSBzeXN0ZW0gY3rEhXN0ZWN6a293eSBpIHN0cnVtaWVuaWUgxZt3aWV0bG5lIHVtaWVzemN6b25lIHcgZ8WCxJliaSB6YSBhcmthZGFtaSBva2llbm55bWksIHJlYWd1asSFY2UgbmEgcnVjaCBrYW1lcnkgeiBlZmVrdGVtIHBhcmFsYWtzeS5cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1za3ktNTAwIGhvdmVyOmJnLXNreS00MDAgdGV4dC1zbGF0ZS05NTAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgUHJ6ZXRlc3R1aiBuYSDFvHl3byB3IHN5bXVsYXRvcnplIDNEIEFSXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=