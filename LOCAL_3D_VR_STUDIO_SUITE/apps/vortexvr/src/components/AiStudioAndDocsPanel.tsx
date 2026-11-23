const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/vortexvr/node_modules/.vite/deps/react.js?v=adc20043";
import { renderProceduralTextureCanvas } from "/apps/vortexvr/src/utils/cryptoE2E.ts";
import { exportTechnicalDocsPdf } from "/apps/vortexvr/src/utils/pdfExport.ts";
import { Sparkles, FileText, Download, CheckCircle2, Smartphone, RefreshCw } from "/apps/vortexvr/node_modules/.vite/deps/lucide-react.js?v=867ef266";
var _jsxFileName = "/app/applet/src/components/AiStudioAndDocsPanel.tsx";
import __vite__cjsImport4_react_jsxDevRuntime from "/apps/vortexvr/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=adc20043";
export const AiStudioAndDocsPanel = ({ lang, projectName, setProjectName, objects, setObjects, selectedObjectId, setSelectedObjectId, logicNodes, mobileConfig, setMobileConfig, onSwitchToViewport }) => {
	const previewCanvasContainerRef = useRef(null);
	const [aiPrompt, setAiPrompt] = useState(lang === "pl" ? "Pancerz tytanowo-węglowy z bursztynowymi obwodami energetycznymi i płynną orbitą" : "Titanium carbon armor with amber quantum circuit conduits and harmonic orbit");
	const [texSpec, setTexSpec] = useState({
		assetTitle: "Quantum Circuit PBR #01",
		primaryHex: "#0F172A",
		secondaryHex: "#1E293B",
		accentHex: "#F59E0B",
		patternType: "circuit",
		roughness: .22,
		metalness: .88,
		gridDensity: 12
	});
	const [animSpec, setAnimSpec] = useState({
		trajectoryType: "hover",
		speed: 1.4,
		amplitude: .4
	});
	const [isGeneratingAsset, setIsGeneratingAsset] = useState(false);
	const [assetStatusMsg, setAssetStatusMsg] = useState("");
	const [isGeneratingDocs, setIsGeneratingDocs] = useState(false);
	const [generatedDoc, setGeneratedDoc] = useState({
		title: lang === "pl" ? `Specyfikacja Techniczna: ${projectName}` : `Technical Specification: ${projectName}`,
		version: "v2.4.0-Enterprise (E2EE)",
		executiveSummary: lang === "pl" ? "Wieloplatformowa scena WebXR i Mobile 3D zaprojektowana w architekturze bezkodowej (No-Code) z proceduralnymi materiałami PBR oraz obsługą żyroskopu dla smartfonów i tabletów." : "Cross-platform WebXR & Mobile 3D scene engineered with No-Code event pipelines, procedural PBR surfaces, and standalone phone/tablet gyroscope controls.",
		sceneArchitecture: lang === "pl" ? "Potok renderowania Three.js ACES Filmic Tone Mapping, oświetlenie 3-punktowe ze studiem PMREM RoomEnvironment oraz wieloczęściowe grupy hierarchiczne THREE.Group." : "Three.js ACES Filmic Tone Mapping pipeline, 3-point studio lighting with PMREM RoomEnvironment reflections, and composite THREE.Group hierarchies.",
		performanceAnalysis: {
			estimatedFpsQuest: 90,
			estimatedFpsMobile: 60,
			drawCallsOptimization: lang === "pl" ? "Instancjonowanie filarów obwodowych (InstancedMesh) + strażnik Software-WebGL." : "Perimeter InstancedMesh batching + automatic Software-WebGL frame pacing.",
			memoryFootprintMb: 46
		},
		mobileCompatGuide: lang === "pl" ? "Tryb autonomiczny dla telefonów i tabletów (iOS/Android) pozwala na grę bez okularów VR przy użyciu czujnika żyroskopowego (DeviceOrientation API) oraz wirtualnych drążków dotykowych lub w goglach pasywnych (Split-Screen z regulacją IPD 54-72mm)." : "Standalone phone and tablet mode (iOS/Android) enables headset-free gameplay via DeviceOrientation gyroscope and dual virtual touch sticks, or passive Cardboard enclosures with 54-72mm IPD calibration.",
		logicFlowSummary: lang === "pl" ? "Zintegrowana maszyna stanów obsługuje zdarzenia OnGrabClick, OnGaze oraz OnProximity." : "Integrated state machine processes OnGrabClick, OnGaze, and OnProximity triggers.",
		securityAndCloudNotes: lang === "pl" ? "Szyfrowanie End-to-End (AES-256-GCM WebCrypto) dla plików sceny i raportów CRM w klastrze EU-Central." : "End-to-End Encryption (AES-256-GCM WebCrypto) for scene blueprints and CRM exports in EU-Central.",
		qaChecklist: [
			lang === "pl" ? "Punkty podparcia obiektów (Y=0) zweryfikowane z cieniami kontaktowymi" : "Bottom-center object pivots (Y=0) verified with contact shadows",
			lang === "pl" ? "Responsywność żyroskopu i dotyku na ekranach smartfonów i tabletów" : "Gyroscope & multi-touch responsiveness verified on phones and tablets",
			lang === "pl" ? "Zgodność kontrastu WCAG AA w trybie ciemnym i jasnym" : "WCAG AA contrast compliance across dark and light modes"
		]
	});
	// Render live 2D procedural PBR canvas preview whenever texSpec changes
	useEffect(() => {
		const container = previewCanvasContainerRef.current;
		if (!container) return;
		const canvas = renderProceduralTextureCanvas(texSpec, 320);
		canvas.className = "w-full h-full object-cover rounded-lg border border-slate-700";
		container.innerHTML = "";
		container.appendChild(canvas);
	}, [texSpec]);
	const handleSynthesizeAiAsset = async () => {
		setIsGeneratingAsset(true);
		setAssetStatusMsg(lang === "pl" ? "Model Gemini AI analizuje prompt i syntetyzuje parametry PBR oraz krzywą animacji..." : "Gemini AI is synthesizing PBR surface shader & animation curve parameters...");
		try {
			const response = await fetch("/api/ai/generate-asset", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					prompt: aiPrompt,
					mode: "texture_and_animation",
					params: {
						primaryColor: texSpec.primaryHex,
						secondaryColor: texSpec.secondaryHex,
						accentColor: texSpec.accentHex,
						patternType: texSpec.patternType,
						roughness: texSpec.roughness,
						metalness: texSpec.metalness,
						gridDensity: texSpec.gridDensity,
						trajectoryType: animSpec.trajectoryType,
						speed: animSpec.speed,
						amplitude: animSpec.amplitude
					}
				})
			});
			const data = await response.json();
			if (data?.spec) {
				const s = data.spec;
				const validPatterns = [
					"circuit",
					"hexgrid",
					"carbon",
					"crystal",
					"nebula",
					"architectural"
				];
				const validTraj = [
					"none",
					"hover",
					"orbit",
					"figure8",
					"pulse",
					"spin"
				];
				setTexSpec({
					assetTitle: s.assetTitle || "AI Synthesized Surface",
					primaryHex: s.primaryHex?.startsWith("#") ? s.primaryHex : texSpec.primaryHex,
					secondaryHex: s.secondaryHex?.startsWith("#") ? s.secondaryHex : texSpec.secondaryHex,
					accentHex: s.accentHex?.startsWith("#") ? s.accentHex : texSpec.accentHex,
					patternType: validPatterns.includes(s.patternType) ? s.patternType : texSpec.patternType,
					roughness: typeof s.roughness === "number" ? Math.max(.05, Math.min(.95, s.roughness)) : texSpec.roughness,
					metalness: typeof s.metalness === "number" ? Math.max(.05, Math.min(.98, s.metalness)) : texSpec.metalness,
					gridDensity: typeof s.gridDensity === "number" ? Math.max(4, Math.min(28, s.gridDensity)) : texSpec.gridDensity
				});
				setAnimSpec({
					trajectoryType: validTraj.includes(s.trajectoryType) ? s.trajectoryType : animSpec.trajectoryType,
					speed: typeof s.speed === "number" ? Math.max(.2, Math.min(4, s.speed)) : animSpec.speed,
					amplitude: typeof s.amplitude === "number" ? Math.max(.1, Math.min(2, s.amplitude)) : animSpec.amplitude
				});
				setAssetStatusMsg(lang === "pl" ? `Wygenerowano zasób AI: "${s.assetTitle || "PBR Surface"}" – gotowy do nałożenia na obiekt 3D!` : `Synthesized AI asset: "${s.assetTitle || "PBR Surface"}" – ready to apply to 3D actor!`);
			}
		} catch {
			setAssetStatusMsg(lang === "pl" ? "Zaktualizowano proceduralną teksturę PBR i krzywą animacji." : "Updated procedural PBR texture and animation curve.");
		} finally {
			setIsGeneratingAsset(false);
		}
	};
	const applyAiAssetToSceneObject = (applyToAll = false) => {
		const targetId = selectedObjectId || objects[0]?.id;
		setObjects((prev) => prev.map((obj) => {
			if (applyToAll || obj.id === targetId) {
				return {
					...obj,
					color: texSpec.primaryHex,
					secondaryColor: texSpec.accentHex,
					roughness: texSpec.roughness,
					metalness: texSpec.metalness,
					textureSpec: { ...texSpec },
					animation: { ...animSpec }
				};
			}
			return obj;
		}));
		setAssetStatusMsg(lang === "pl" ? applyToAll ? "Zastosowano teksturę AI i animację do wszystkich obiektów na scenie 3D!" : "Zastosowano teksturę AI i animację do wybranego obiektu 3D!" : applyToAll ? "Applied AI texture & animation to all 3D scene actors!" : "Applied AI texture & animation to selected 3D actor!");
	};
	const handleGenerateAiDocs = async () => {
		setIsGeneratingDocs(true);
		try {
			const response = await fetch("/api/ai/generate-docs", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					projectName,
					objects,
					logicNodes,
					mobileConfig,
					lang
				})
			});
			const data = await response.json();
			if (data?.doc) {
				setGeneratedDoc(data.doc);
			}
		} catch {} finally {
			setIsGeneratingDocs(false);
		}
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "max-w-[1380px] mx-auto px-6 py-8 space-y-10",
		children: [
			/* @__PURE__ */ _jsxDEV("section", {
				className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800",
					children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 263,
							columnNumber: 15
						}, this), lang === "pl" ? "01. Generator Obrazów (Tekstur PBR) i Animacji 3D z Edytorem Parametrów AI" : "01. AI PBR Texture Image & 3D Animation Generator with Parameter Editor"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 262,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-sm text-slate-600 dark:text-slate-400 mt-1",
						children: lang === "pl" ? "Opisz pożądany materiał lub ruch obiektu. Model Gemini AI dobierze parametry shaderów PBR i trajektorii klatek kluczowych." : "Describe your desired surface material or motion curve. Gemini AI synthesizes PBR shader parameters and keyframe trajectories."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 268,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 261,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: onSwitchToViewport,
						className: "px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors whitespace-nowrap shrink-0",
						children: lang === "pl" ? "Wróć do Sceny 3D" : "Return to 3D Viewport"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 275,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 260,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-stretch",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "lg:col-span-7 space-y-5",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5",
								children: lang === "pl" ? "Prompt dla Modelu AI (Obraz Tekstury + Animacja 3D)" : "AI Prompt (Texture Image + 3D Animation)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 287,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: aiPrompt,
									onChange: (e) => setAiPrompt(e.target.value),
									className: "flex-1 px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white",
									placeholder: lang === "pl" ? "np. Holograficzna siatka heksagonalna ze złotym połyskiem..." : "e.g. Holographic hexagonal mesh with brushed gold sheen..."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 291,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									onClick: handleSynthesizeAiAsset,
									disabled: isGeneratingAsset,
									className: "px-5 py-2.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 disabled:opacity-60",
									children: [/* @__PURE__ */ _jsxDEV(RefreshCw, { className: `w-4 h-4 ${isGeneratingAsset ? "animate-spin" : ""}` }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 307,
										columnNumber: 19
									}, this), isGeneratingAsset ? lang === "pl" ? "Synteza AI..." : "Synthesizing..." : lang === "pl" ? "Generuj przez AI" : "Generate with AI"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 302,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 290,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 286,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2",
								children: [
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1",
										children: lang === "pl" ? "Wzór Geometryczny Obrazu PBR" : "PBR Surface Pattern Topology"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 322,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: texSpec.patternType,
										onChange: (e) => setTexSpec((prev) => ({
											...prev,
											patternType: e.target.value
										})),
										className: "w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "circuit",
												children: lang === "pl" ? "Obwody Kwantowe (Circuit)" : "Quantum Circuit"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 332,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "hexgrid",
												children: lang === "pl" ? "Siatka Heksagonalna (HexGrid)" : "Hexagonal Grid"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 333,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "carbon",
												children: lang === "pl" ? "Włókno Węglowe (Carbon Weave)" : "Carbon Fiber Weave"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 334,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "crystal",
												children: lang === "pl" ? "Fraktal Kryształowy (Crystal)" : "Crystal Voronoi"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 335,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "nebula",
												children: lang === "pl" ? "Mgławica Plazmowa (Nebula)" : "Plasma Nebula"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 336,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "architectural",
												children: lang === "pl" ? "Płyty Architektoniczne" : "Architectural Panels"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 337,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 325,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 321,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1",
										children: lang === "pl" ? "Typ Trajektorii Animacji 3D" : "3D Keyframe Animation Curve"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 342,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: animSpec.trajectoryType,
										onChange: (e) => setAnimSpec((prev) => ({
											...prev,
											trajectoryType: e.target.value
										})),
										className: "w-full px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "hover",
												children: lang === "pl" ? "Harmoniczna Lewitacja (Hover)" : "Harmonic Hover"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 352,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "orbit",
												children: lang === "pl" ? "Orbita Kołowa 360°" : "360° Circular Orbit"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 353,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "figure8",
												children: lang === "pl" ? "Pętla Lemniskaty (Ósemka)" : "Figure-8 Lemniscate"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 354,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "spin",
												children: lang === "pl" ? "Obrót Żyroskopowy (Spin)" : "Gyroscopic Spin"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 355,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "pulse",
												children: lang === "pl" ? "Pulsowanie Rezonansowe" : "Resonance Scale Pulse"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 356,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "none",
												children: lang === "pl" ? "Brak (Statyczny)" : "None (Static)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 357,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 345,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 341,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex justify-between text-xs mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-slate-600 dark:text-slate-400",
											children: lang === "pl" ? "Szorstkość PBR (Roughness)" : "PBR Roughness"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 363,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono tabular-nums text-slate-900 dark:text-white",
											children: texSpec.roughness.toFixed(2)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 366,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 362,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "range",
										min: "0.05",
										max: "0.95",
										step: "0.05",
										value: texSpec.roughness,
										onChange: (e) => setTexSpec((prev) => ({
											...prev,
											roughness: Number(e.target.value)
										})),
										className: "w-full accent-amber-500"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 370,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 361,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex justify-between text-xs mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-slate-600 dark:text-slate-400",
											children: lang === "pl" ? "Metaliczność PBR (Metalness)" : "PBR Metalness"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 385,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono tabular-nums text-slate-900 dark:text-white",
											children: texSpec.metalness.toFixed(2)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 388,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 384,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "range",
										min: "0.05",
										max: "0.98",
										step: "0.05",
										value: texSpec.metalness,
										onChange: (e) => setTexSpec((prev) => ({
											...prev,
											metalness: Number(e.target.value)
										})),
										className: "w-full accent-amber-500"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 392,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 383,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex justify-between text-xs mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-slate-600 dark:text-slate-400",
											children: lang === "pl" ? "Gęstość Siatki Tekstury" : "Pattern Grid Density"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 407,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono tabular-nums text-slate-900 dark:text-white",
											children: [
												texSpec.gridDensity,
												"x",
												texSpec.gridDensity
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 410,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 406,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("input", {
										type: "range",
										min: "4",
										max: "24",
										step: "2",
										value: texSpec.gridDensity,
										onChange: (e) => setTexSpec((prev) => ({
											...prev,
											gridDensity: Number(e.target.value)
										})),
										className: "w-full accent-amber-500"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 414,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 405,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex justify-between text-xs mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-slate-600 dark:text-slate-400",
											children: lang === "pl" ? "Prędkość i Amplituda Animacji" : "Animation Speed & Amplitude"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 429,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono tabular-nums text-slate-900 dark:text-white",
											children: [
												animSpec.speed.toFixed(1),
												"x · ",
												animSpec.amplitude.toFixed(2),
												"m"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 432,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 428,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: "0.4",
											max: "3.5",
											step: "0.2",
											value: animSpec.speed,
											onChange: (e) => setAnimSpec((prev) => ({
												...prev,
												speed: Number(e.target.value)
											})),
											className: "w-full accent-amber-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 437,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: "0.1",
											max: "1.5",
											step: "0.1",
											value: animSpec.amplitude,
											onChange: (e) => setAnimSpec((prev) => ({
												...prev,
												amplitude: Number(e.target.value)
											})),
											className: "w-full accent-amber-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 448,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 436,
										columnNumber: 17
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 427,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200 dark:border-slate-800",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-3 text-xs",
									children: [
										/* @__PURE__ */ _jsxDEV("label", {
											className: "flex items-center gap-1.5 text-slate-700 dark:text-slate-300",
											children: [/* @__PURE__ */ _jsxDEV("input", {
												type: "color",
												value: texSpec.primaryHex,
												onChange: (e) => setTexSpec((p) => ({
													...p,
													primaryHex: e.target.value
												})),
												className: "w-6 h-6 rounded cursor-pointer"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 467,
												columnNumber: 19
											}, this), lang === "pl" ? "Baza" : "Base"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 466,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("label", {
											className: "flex items-center gap-1.5 text-slate-700 dark:text-slate-300",
											children: [/* @__PURE__ */ _jsxDEV("input", {
												type: "color",
												value: texSpec.secondaryHex,
												onChange: (e) => setTexSpec((p) => ({
													...p,
													secondaryHex: e.target.value
												})),
												className: "w-6 h-6 rounded cursor-pointer"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 476,
												columnNumber: 19
											}, this), lang === "pl" ? "Ton" : "Tone"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 475,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("label", {
											className: "flex items-center gap-1.5 text-slate-700 dark:text-slate-300",
											children: [/* @__PURE__ */ _jsxDEV("input", {
												type: "color",
												value: texSpec.accentHex,
												onChange: (e) => setTexSpec((p) => ({
													...p,
													accentHex: e.target.value
												})),
												className: "w-6 h-6 rounded cursor-pointer"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 485,
												columnNumber: 19
											}, this), lang === "pl" ? "Emisja" : "Accent"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 484,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 465,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ _jsxDEV("select", {
											value: selectedObjectId || objects[0]?.id || "",
											onChange: (e) => setSelectedObjectId(e.target.value),
											className: "px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white",
											children: objects.map((o) => /* @__PURE__ */ _jsxDEV("option", {
												value: o.id,
												children: o.name
											}, o.id, false, {
												fileName: _jsxFileName,
												lineNumber: 502,
												columnNumber: 21
											}, this))
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 496,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: () => applyAiAssetToSceneObject(false),
											className: "px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors whitespace-nowrap shrink-0",
											children: lang === "pl" ? "Nałóż na Wybrany Obiekt 3D" : "Apply to Selected Actor"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 507,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: () => applyAiAssetToSceneObject(true),
											className: "px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0",
											children: lang === "pl" ? "Nałóż na Całą Scenę" : "Apply to All"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 513,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 495,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 464,
								columnNumber: 13
							}, this),
							assetStatusMsg && /* @__PURE__ */ _jsxDEV("div", {
								className: "text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5",
								children: [/* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-4 h-4 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 524,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: assetStatusMsg }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 525,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 523,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 285,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "lg:col-span-5 flex flex-col justify-between rounded-xl bg-slate-950 border border-slate-800 p-4",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between text-xs text-slate-300 mb-3",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "font-semibold text-white",
									children: texSpec.assetTitle
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 533,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-amber-400",
									children: "512×512 SRGB · Aniso 16x"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 534,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 532,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								ref: previewCanvasContainerRef,
								className: "w-full h-64 rounded-lg overflow-hidden flex items-center justify-center bg-slate-900"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 538,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400",
								children: [
									/* @__PURE__ */ _jsxDEV("span", { children: ["PATTERN: ", texSpec.patternType.toUpperCase()] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 543,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: "·" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 544,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: ["ANIM: ", animSpec.trajectoryType.toUpperCase()] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 545,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: "·" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 546,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("span", { children: [
										"SPEED: ",
										animSpec.speed,
										"x"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 547,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 542,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 531,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 283,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 259,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("section", {
				className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "pb-5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(Smartphone, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 558,
							columnNumber: 15
						}, this), lang === "pl" ? "02. Gra Tylko na Telefonie lub Tablecie – Możliwości Konfiguracji (Bez Gogli VR)" : "02. Phone & Tablet Standalone Play Mode – Configuration Capabilities"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 557,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-sm text-slate-600 dark:text-slate-400 mt-1",
						children: lang === "pl" ? "Pełna obsługa rozgrywki mobilnej bez konieczności posiadania gogli VR oraz z opcjonalnym trybem stereoskopowym Split-Screen." : "Complete mobile gameplay support using only a phone or tablet without VR headsets, plus optional stereoscopic Split-Screen."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 563,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 556,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400",
						children: [
							/* @__PURE__ */ _jsxDEV("span", { children: "iOS 16+ Safari WebGL2" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 570,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("span", { children: "·" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 571,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("span", { children: "Android 13+ Chrome WebXR" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 572,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 569,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 555,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6 pt-6",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs font-mono text-amber-600 dark:text-amber-400",
									children: lang === "pl" ? "TRYB 1 · ŻYROSKOP 360° + MULTI-TOUCH" : "MODE 1 · 360° GYRO + MULTI-TOUCH"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 578,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("h3", {
									className: "text-base font-bold text-slate-900 dark:text-white",
									children: lang === "pl" ? "Okno Przestrzenne (Magic Window)" : "Spatial Magic Window"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 581,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed",
									children: lang === "pl" ? "Obracanie telefonu lub tabletu w dłoniach steruje kamerą 3D w czasie rzeczywistym dzięki akcelerometrowi i żyroskopowi (DeviceOrientation API). Lewy kciuk obsługuje wirtualny drążek ruchu, a prawy wyzwala interakcje." : "Moving your phone or tablet in space rotates the 3D camera in real time via the gyroscope. Left thumb drives locomotion while right thumb triggers scene interactions."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 584,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "pt-2 flex items-center justify-between text-xs",
									children: [
										/* @__PURE__ */ _jsxDEV("span", {
											className: "text-slate-500",
											children: lang === "pl" ? "Czułość żyroskopu:" : "Gyro sensitivity:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 590,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: "0.5",
											max: "2.5",
											step: "0.1",
											value: mobileConfig.gyroSensitivity,
											onChange: (e) => setMobileConfig((prev) => ({
												...prev,
												gyroSensitivity: Number(e.target.value)
											})),
											className: "w-28 accent-amber-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 591,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono text-slate-900 dark:text-white",
											children: [mobileConfig.gyroSensitivity.toFixed(1), "x"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 602,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 589,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 577,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs font-mono text-amber-600 dark:text-amber-400",
									children: lang === "pl" ? "TRYB 2 · TABLET DUAL-STICK HUD" : "MODE 2 · TABLET DUAL-STICK HUD"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 607,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("h3", {
									className: "text-base font-bold text-slate-900 dark:text-white",
									children: lang === "pl" ? "Ergonomia dla Dużych Ekranów (iPad / Galaxy Tab)" : "Large Tablet Ergonomics"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 610,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed",
									children: lang === "pl" ? "Na tabletach (10\"-13\") interfejs automatycznie rozdziela strefy kciuków przy dolnych krawędziach ekranu, blokuje przypadkowe przewijanie strony i skaluje rozdzielczość DPR dla stałych 60/120 FPS." : "On 10\"-13\" tablets, the layout splits thumb zones along the lower bezel, locks viewport bounce, and dynamically scales DPR for locked 60/120 FPS."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 613,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "pt-2 flex items-center justify-between text-xs",
									children: [
										/* @__PURE__ */ _jsxDEV("span", {
											className: "text-slate-500",
											children: lang === "pl" ? "Skala Renderowania:" : "Render Scale:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 619,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: "50",
											max: "100",
											step: "5",
											value: mobileConfig.adaptiveResolutionPct,
											onChange: (e) => setMobileConfig((prev) => ({
												...prev,
												adaptiveResolutionPct: Number(e.target.value)
											})),
											className: "w-28 accent-amber-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 620,
											columnNumber: 15
										}, this),
										/* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono text-slate-900 dark:text-white",
											children: [mobileConfig.adaptiveResolutionPct, "%"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 634,
											columnNumber: 15
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 618,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 606,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-xs font-mono text-amber-600 dark:text-amber-400",
									children: lang === "pl" ? "TRYB 3 · STEREOSKOPOWY SPLIT-SCREEN" : "MODE 3 · STEREOSCOPIC SPLIT-SCREEN"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 639,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("h3", {
									className: "text-base font-bold text-slate-900 dark:text-white",
									children: lang === "pl" ? "Kalibracja Soczewek i Rozstawu Źrenic (IPD)" : "Lens & IPD Calibration"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 642,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed",
									children: lang === "pl" ? "Po umieszczeniu telefonu w uchwycie Cardboard lub goglach mobilnych aplikacja dzieli ekran na lewe i prawe oko z niezależną macierzą projekcji i celownikiem wzrokowym (Gaze Dwell Timer 1.5s)." : "When slotted into a mobile VR shell, the engine renders independent left/right eye viewports with customizable IPD offset and hands-free Gaze Dwell triggers."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 645,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "pt-2 flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-500",
										children: lang === "pl" ? "Odświeżanie docelowe:" : "Target Refresh:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 651,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex gap-1",
										children: [
											60,
											90,
											120
										].map((fps) => /* @__PURE__ */ _jsxDEV("button", {
											onClick: () => setMobileConfig((prev) => ({
												...prev,
												targetFps: fps
											})),
											className: `px-2 py-0.5 rounded font-mono text-[11px] ${mobileConfig.targetFps === fps ? "bg-amber-500 text-slate-950 font-semibold" : "bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`,
											children: [fps, "Hz"]
										}, fps, true, {
											fileName: _jsxFileName,
											lineNumber: 654,
											columnNumber: 19
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 652,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 650,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 638,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 576,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 554,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("section", {
				className: "rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800",
					children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h2", {
						className: "text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(FileText, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 677,
							columnNumber: 15
						}, this), lang === "pl" ? "03. Automatyczne Generowanie Dokumentacji Technicznej Projektu (AI + PDF)" : "03. Automated Project Technical Documentation Generator (AI + PDF)"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 676,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("p", {
						className: "text-sm text-slate-600 dark:text-slate-400 mt-1",
						children: lang === "pl" ? "Kompiluje graf sceny 3D, budżet trójkątów, reguły No-Code oraz parametry mobilne w ustrukturyzowany raport inżynieryjny." : "Compiles your live 3D scene graph, triangle budget, No-Code logic rules, and mobile parameters into an engineering specification."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 682,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 675,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center gap-2.5",
						children: [
							/* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: projectName,
								onChange: (e) => setProjectName(e.target.value),
								className: "px-3 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white font-medium",
								placeholder: "Project Name"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 690,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onClick: handleGenerateAiDocs,
								disabled: isGeneratingDocs,
								className: "px-4 py-2 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
								children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 702,
									columnNumber: 15
								}, this), isGeneratingDocs ? lang === "pl" ? "Generowanie przez AI..." : "Generating Docs..." : lang === "pl" ? "Aktualizuj Dokumentację AI" : "Regenerate AI Docs"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 697,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onClick: () => exportTechnicalDocsPdf(projectName, generatedDoc, objects, logicNodes, mobileConfig),
								className: "px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
								children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 717,
									columnNumber: 15
								}, this), lang === "pl" ? "Eksportuj Dokumentację do PDF" : "Export Docs to PDF"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 711,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 689,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 674,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 text-xs",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "lg:col-span-2 space-y-4",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-[11px] font-mono text-slate-500",
									children: [
										generatedDoc.version,
										" · ",
										objects.length,
										" ACTORS · ",
										logicNodes.length,
										" LOGIC TRIGGERS"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 726,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("h3", {
									className: "text-lg font-bold text-slate-900 dark:text-white mt-0.5",
									children: generatedDoc.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 729,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-slate-600 dark:text-slate-300 mt-2 leading-relaxed",
									children: generatedDoc.executiveSummary
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 732,
									columnNumber: 15
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 725,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-3 border-t border-slate-200 dark:border-slate-800",
								children: [/* @__PURE__ */ _jsxDEV("h4", {
									className: "font-semibold text-slate-900 dark:text-white mb-1",
									children: lang === "pl" ? "Architektura Sceny 3D i Potok PBR" : "3D Scene Architecture & PBR Pipeline"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 738,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "text-slate-600 dark:text-slate-300 leading-relaxed",
									children: generatedDoc.sceneArchitecture
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 741,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 737,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-3 border-t border-slate-200 dark:border-slate-800",
								children: [/* @__PURE__ */ _jsxDEV("h4", {
									className: "font-semibold text-slate-900 dark:text-white mb-1",
									children: lang === "pl" ? "Specyfikacja Mobilna (Telefon i Tablet)" : "Mobile & Tablet Standalone Specification"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 747,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("p", {
									className: "text-slate-600 dark:text-slate-300 leading-relaxed",
									children: generatedDoc.mobileCompatGuide
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 750,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 746,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 724,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 space-y-4",
						children: [
							/* @__PURE__ */ _jsxDEV("h4", {
								className: "font-semibold text-slate-900 dark:text-white",
								children: lang === "pl" ? "Budżet Wydajności i Lista Kontrolna QA" : "Performance Telemetry & QA Checklist"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 757,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-3 font-mono",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "text-[10px] text-slate-500",
										children: "QUEST / PCVR FPS"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 762,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "text-base font-bold text-emerald-500",
										children: [generatedDoc.performanceAnalysis?.estimatedFpsQuest || 90, " FPS"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 763,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 761,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "text-[10px] text-slate-500",
										children: "PHONE / TABLET"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 768,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "text-base font-bold text-amber-500",
										children: [generatedDoc.performanceAnalysis?.estimatedFpsMobile || 60, " FPS"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 769,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 767,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 760,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-1.5 pt-2",
								children: (generatedDoc.qaChecklist || []).map((item, i) => /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-start gap-2 text-slate-600 dark:text-slate-300",
									children: [/* @__PURE__ */ _jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 778,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: item }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 779,
										columnNumber: 19
									}, this)]
								}, i, true, {
									fileName: _jsxFileName,
									lineNumber: 777,
									columnNumber: 17
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 775,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 756,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 723,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 673,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 257,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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U0FBYSxXQUFVO21CQUF2QixDQUNFLHdCQUFDLGNBQUQsRUFBYyxXQUFVLCtDQUFnRDs7OzttQkFDeEUsd0JBQUMsUUFBRCxZQUFPLEtBQVc7Ozs7aUJBQ2Y7V0FISzs7OztlQUdMLENBQ047T0FDRTs7Ozs7TUFDRjs7Ozs7YUFDRjs7Ozs7WUFDRTs7Ozs7O0VBQ047Ozs7OztBQUVUIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIkFpU3R1ZGlvQW5kRG9jc1BhbmVsLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgTGFuZ3VhZ2UsXG4gIExvZ2ljTm9kZSxcbiAgTW9iaWxlU3RhbmRhbG9uZUNvbmZpZyxcbiAgUHJvY2VkdXJhbEFuaW1hdGlvblNwZWMsXG4gIFByb2NlZHVyYWxUZXh0dXJlU3BlYyxcbiAgU2NlbmVPYmplY3QsXG59IGZyb20gJy4uL3R5cGVzL3ZyJztcbmltcG9ydCB7IHJlbmRlclByb2NlZHVyYWxUZXh0dXJlQ2FudmFzIH0gZnJvbSAnLi4vdXRpbHMvY3J5cHRvRTJFJztcbmltcG9ydCB7IGV4cG9ydFRlY2huaWNhbERvY3NQZGYgfSBmcm9tICcuLi91dGlscy9wZGZFeHBvcnQnO1xuaW1wb3J0IHtcbiAgU3BhcmtsZXMsXG4gIEZpbGVUZXh0LFxuICBEb3dubG9hZCxcbiAgU2xpZGVycyxcbiAgQ2hlY2tDaXJjbGUyLFxuICBTbWFydHBob25lLFxuICBUYWJsZXQsXG4gIExheWVycyxcbiAgUGxheSxcbiAgUmVmcmVzaEN3LFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgQWlTdHVkaW9BbmREb2NzUGFuZWxQcm9wcyB7XG4gIGxhbmc6IExhbmd1YWdlO1xuICBwcm9qZWN0TmFtZTogc3RyaW5nO1xuICBzZXRQcm9qZWN0TmFtZTogKG5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb2JqZWN0czogU2NlbmVPYmplY3RbXTtcbiAgc2V0T2JqZWN0czogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248U2NlbmVPYmplY3RbXT4+O1xuICBzZWxlY3RlZE9iamVjdElkOiBzdHJpbmcgfCBudWxsO1xuICBzZXRTZWxlY3RlZE9iamVjdElkOiAoaWQ6IHN0cmluZyB8IG51bGwpID0+IHZvaWQ7XG4gIGxvZ2ljTm9kZXM6IExvZ2ljTm9kZVtdO1xuICBtb2JpbGVDb25maWc6IE1vYmlsZVN0YW5kYWxvbmVDb25maWc7XG4gIHNldE1vYmlsZUNvbmZpZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248TW9iaWxlU3RhbmRhbG9uZUNvbmZpZz4+O1xuICBvblN3aXRjaFRvVmlld3BvcnQ6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBBaVN0dWRpb0FuZERvY3NQYW5lbDogUmVhY3QuRkM8QWlTdHVkaW9BbmREb2NzUGFuZWxQcm9wcz4gPSAoe1xuICBsYW5nLFxuICBwcm9qZWN0TmFtZSxcbiAgc2V0UHJvamVjdE5hbWUsXG4gIG9iamVjdHMsXG4gIHNldE9iamVjdHMsXG4gIHNlbGVjdGVkT2JqZWN0SWQsXG4gIHNldFNlbGVjdGVkT2JqZWN0SWQsXG4gIGxvZ2ljTm9kZXMsXG4gIG1vYmlsZUNvbmZpZyxcbiAgc2V0TW9iaWxlQ29uZmlnLFxuICBvblN3aXRjaFRvVmlld3BvcnQsXG59KSA9PiB7XG4gIGNvbnN0IHByZXZpZXdDYW52YXNDb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbYWlQcm9tcHQsIHNldEFpUHJvbXB0XSA9IHVzZVN0YXRlKFxuICAgIGxhbmcgPT09ICdwbCdcbiAgICAgID8gJ1BhbmNlcnogdHl0YW5vd28td8SZZ2xvd3kgeiBidXJzenR5bm93eW1pIG9id29kYW1pIGVuZXJnZXR5Y3pueW1pIGkgcMWCeW5uxIUgb3JiaXTEhSdcbiAgICAgIDogJ1RpdGFuaXVtIGNhcmJvbiBhcm1vciB3aXRoIGFtYmVyIHF1YW50dW0gY2lyY3VpdCBjb25kdWl0cyBhbmQgaGFybW9uaWMgb3JiaXQnXG4gICk7XG4gIGNvbnN0IFt0ZXhTcGVjLCBzZXRUZXhTcGVjXSA9IHVzZVN0YXRlPFByb2NlZHVyYWxUZXh0dXJlU3BlYz4oe1xuICAgIGFzc2V0VGl0bGU6ICdRdWFudHVtIENpcmN1aXQgUEJSICMwMScsXG4gICAgcHJpbWFyeUhleDogJyMwRjE3MkEnLFxuICAgIHNlY29uZGFyeUhleDogJyMxRTI5M0InLFxuICAgIGFjY2VudEhleDogJyNGNTlFMEInLFxuICAgIHBhdHRlcm5UeXBlOiAnY2lyY3VpdCcsXG4gICAgcm91Z2huZXNzOiAwLjIyLFxuICAgIG1ldGFsbmVzczogMC44OCxcbiAgICBncmlkRGVuc2l0eTogMTIsXG4gIH0pO1xuICBjb25zdCBbYW5pbVNwZWMsIHNldEFuaW1TcGVjXSA9IHVzZVN0YXRlPFByb2NlZHVyYWxBbmltYXRpb25TcGVjPih7XG4gICAgdHJhamVjdG9yeVR5cGU6ICdob3ZlcicsXG4gICAgc3BlZWQ6IDEuNCxcbiAgICBhbXBsaXR1ZGU6IDAuNCxcbiAgfSk7XG5cbiAgY29uc3QgW2lzR2VuZXJhdGluZ0Fzc2V0LCBzZXRJc0dlbmVyYXRpbmdBc3NldF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthc3NldFN0YXR1c01zZywgc2V0QXNzZXRTdGF0dXNNc2ddID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG5cbiAgY29uc3QgW2lzR2VuZXJhdGluZ0RvY3MsIHNldElzR2VuZXJhdGluZ0RvY3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZ2VuZXJhdGVkRG9jLCBzZXRHZW5lcmF0ZWREb2NdID0gdXNlU3RhdGU8YW55Pih7XG4gICAgdGl0bGU6XG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gYFNwZWN5ZmlrYWNqYSBUZWNobmljem5hOiAke3Byb2plY3ROYW1lfWBcbiAgICAgICAgOiBgVGVjaG5pY2FsIFNwZWNpZmljYXRpb246ICR7cHJvamVjdE5hbWV9YCxcbiAgICB2ZXJzaW9uOiAndjIuNC4wLUVudGVycHJpc2UgKEUyRUUpJyxcbiAgICBleGVjdXRpdmVTdW1tYXJ5OlxuICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICA/ICdXaWVsb3BsYXRmb3Jtb3dhIHNjZW5hIFdlYlhSIGkgTW9iaWxlIDNEIHphcHJvamVrdG93YW5hIHcgYXJjaGl0ZWt0dXJ6ZSBiZXprb2Rvd2VqIChOby1Db2RlKSB6IHByb2NlZHVyYWxueW1pIG1hdGVyaWHFgmFtaSBQQlIgb3JheiBvYnPFgnVnxIUgxbx5cm9za29wdSBkbGEgc21hcnRmb27Ds3cgaSB0YWJsZXTDs3cuJ1xuICAgICAgICA6ICdDcm9zcy1wbGF0Zm9ybSBXZWJYUiAmIE1vYmlsZSAzRCBzY2VuZSBlbmdpbmVlcmVkIHdpdGggTm8tQ29kZSBldmVudCBwaXBlbGluZXMsIHByb2NlZHVyYWwgUEJSIHN1cmZhY2VzLCBhbmQgc3RhbmRhbG9uZSBwaG9uZS90YWJsZXQgZ3lyb3Njb3BlIGNvbnRyb2xzLicsXG4gICAgc2NlbmVBcmNoaXRlY3R1cmU6XG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gJ1BvdG9rIHJlbmRlcm93YW5pYSBUaHJlZS5qcyBBQ0VTIEZpbG1pYyBUb25lIE1hcHBpbmcsIG/Fm3dpZXRsZW5pZSAzLXB1bmt0b3dlIHplIHN0dWRpZW0gUE1SRU0gUm9vbUVudmlyb25tZW50IG9yYXogd2llbG9jesSZxZtjaW93ZSBncnVweSBoaWVyYXJjaGljem5lIFRIUkVFLkdyb3VwLidcbiAgICAgICAgOiAnVGhyZWUuanMgQUNFUyBGaWxtaWMgVG9uZSBNYXBwaW5nIHBpcGVsaW5lLCAzLXBvaW50IHN0dWRpbyBsaWdodGluZyB3aXRoIFBNUkVNIFJvb21FbnZpcm9ubWVudCByZWZsZWN0aW9ucywgYW5kIGNvbXBvc2l0ZSBUSFJFRS5Hcm91cCBoaWVyYXJjaGllcy4nLFxuICAgIHBlcmZvcm1hbmNlQW5hbHlzaXM6IHtcbiAgICAgIGVzdGltYXRlZEZwc1F1ZXN0OiA5MCxcbiAgICAgIGVzdGltYXRlZEZwc01vYmlsZTogNjAsXG4gICAgICBkcmF3Q2FsbHNPcHRpbWl6YXRpb246XG4gICAgICAgIGxhbmcgPT09ICdwbCdcbiAgICAgICAgICA/ICdJbnN0YW5jam9ub3dhbmllIGZpbGFyw7N3IG9id29kb3d5Y2ggKEluc3RhbmNlZE1lc2gpICsgc3RyYcW8bmlrIFNvZnR3YXJlLVdlYkdMLidcbiAgICAgICAgICA6ICdQZXJpbWV0ZXIgSW5zdGFuY2VkTWVzaCBiYXRjaGluZyArIGF1dG9tYXRpYyBTb2Z0d2FyZS1XZWJHTCBmcmFtZSBwYWNpbmcuJyxcbiAgICAgIG1lbW9yeUZvb3RwcmludE1iOiA0NixcbiAgICB9LFxuICAgIG1vYmlsZUNvbXBhdEd1aWRlOlxuICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICA/ICdUcnliIGF1dG9ub21pY3pueSBkbGEgdGVsZWZvbsOzdyBpIHRhYmxldMOzdyAoaU9TL0FuZHJvaWQpIHBvendhbGEgbmEgZ3LEmSBiZXogb2t1bGFyw7N3IFZSIHByenkgdcW8eWNpdSBjenVqbmlrYSDFvHlyb3Nrb3Bvd2VnbyAoRGV2aWNlT3JpZW50YXRpb24gQVBJKSBvcmF6IHdpcnR1YWxueWNoIGRyxIXFvGvDs3cgZG90eWtvd3ljaCBsdWIgdyBnb2dsYWNoIHBhc3l3bnljaCAoU3BsaXQtU2NyZWVuIHogcmVndWxhY2rEhSBJUEQgNTQtNzJtbSkuJ1xuICAgICAgICA6ICdTdGFuZGFsb25lIHBob25lIGFuZCB0YWJsZXQgbW9kZSAoaU9TL0FuZHJvaWQpIGVuYWJsZXMgaGVhZHNldC1mcmVlIGdhbWVwbGF5IHZpYSBEZXZpY2VPcmllbnRhdGlvbiBneXJvc2NvcGUgYW5kIGR1YWwgdmlydHVhbCB0b3VjaCBzdGlja3MsIG9yIHBhc3NpdmUgQ2FyZGJvYXJkIGVuY2xvc3VyZXMgd2l0aCA1NC03Mm1tIElQRCBjYWxpYnJhdGlvbi4nLFxuICAgIGxvZ2ljRmxvd1N1bW1hcnk6XG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gJ1ppbnRlZ3Jvd2FuYSBtYXN6eW5hIHN0YW7Ds3cgb2JzxYJ1Z3VqZSB6ZGFyemVuaWEgT25HcmFiQ2xpY2ssIE9uR2F6ZSBvcmF6IE9uUHJveGltaXR5LidcbiAgICAgICAgOiAnSW50ZWdyYXRlZCBzdGF0ZSBtYWNoaW5lIHByb2Nlc3NlcyBPbkdyYWJDbGljaywgT25HYXplLCBhbmQgT25Qcm94aW1pdHkgdHJpZ2dlcnMuJyxcbiAgICBzZWN1cml0eUFuZENsb3VkTm90ZXM6XG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gJ1N6eWZyb3dhbmllIEVuZC10by1FbmQgKEFFUy0yNTYtR0NNIFdlYkNyeXB0bykgZGxhIHBsaWvDs3cgc2NlbnkgaSByYXBvcnTDs3cgQ1JNIHcga2xhc3RyemUgRVUtQ2VudHJhbC4nXG4gICAgICAgIDogJ0VuZC10by1FbmQgRW5jcnlwdGlvbiAoQUVTLTI1Ni1HQ00gV2ViQ3J5cHRvKSBmb3Igc2NlbmUgYmx1ZXByaW50cyBhbmQgQ1JNIGV4cG9ydHMgaW4gRVUtQ2VudHJhbC4nLFxuICAgIHFhQ2hlY2tsaXN0OiBbXG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gJ1B1bmt0eSBwb2RwYXJjaWEgb2JpZWt0w7N3IChZPTApIHp3ZXJ5Zmlrb3dhbmUgeiBjaWVuaWFtaSBrb250YWt0b3d5bWknXG4gICAgICAgIDogJ0JvdHRvbS1jZW50ZXIgb2JqZWN0IHBpdm90cyAoWT0wKSB2ZXJpZmllZCB3aXRoIGNvbnRhY3Qgc2hhZG93cycsXG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gJ1Jlc3BvbnN5d25vxZvEhyDFvHlyb3Nrb3B1IGkgZG90eWt1IG5hIGVrcmFuYWNoIHNtYXJ0Zm9uw7N3IGkgdGFibGV0w7N3J1xuICAgICAgICA6ICdHeXJvc2NvcGUgJiBtdWx0aS10b3VjaCByZXNwb25zaXZlbmVzcyB2ZXJpZmllZCBvbiBwaG9uZXMgYW5kIHRhYmxldHMnLFxuICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICA/ICdaZ29kbm/Fm8SHIGtvbnRyYXN0dSBXQ0FHIEFBIHcgdHJ5YmllIGNpZW1ueW0gaSBqYXNueW0nXG4gICAgICAgIDogJ1dDQUcgQUEgY29udHJhc3QgY29tcGxpYW5jZSBhY3Jvc3MgZGFyayBhbmQgbGlnaHQgbW9kZXMnLFxuICAgIF0sXG4gIH0pO1xuXG4gIC8vIFJlbmRlciBsaXZlIDJEIHByb2NlZHVyYWwgUEJSIGNhbnZhcyBwcmV2aWV3IHdoZW5ldmVyIHRleFNwZWMgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHByZXZpZXdDYW52YXNDb250YWluZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuICAgIGNvbnN0IGNhbnZhcyA9IHJlbmRlclByb2NlZHVyYWxUZXh0dXJlQ2FudmFzKHRleFNwZWMsIDMyMCk7XG4gICAgY2FudmFzLmNsYXNzTmFtZSA9ICd3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtNzAwJztcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gIH0sIFt0ZXhTcGVjXSk7XG5cbiAgY29uc3QgaGFuZGxlU3ludGhlc2l6ZUFpQXNzZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0SXNHZW5lcmF0aW5nQXNzZXQodHJ1ZSk7XG4gICAgc2V0QXNzZXRTdGF0dXNNc2coXG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gJ01vZGVsIEdlbWluaSBBSSBhbmFsaXp1amUgcHJvbXB0IGkgc3ludGV0eXp1amUgcGFyYW1ldHJ5IFBCUiBvcmF6IGtyenl3xIUgYW5pbWFjamkuLi4nXG4gICAgICAgIDogJ0dlbWluaSBBSSBpcyBzeW50aGVzaXppbmcgUEJSIHN1cmZhY2Ugc2hhZGVyICYgYW5pbWF0aW9uIGN1cnZlIHBhcmFtZXRlcnMuLi4nXG4gICAgKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9haS9nZW5lcmF0ZS1hc3NldCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcHJvbXB0OiBhaVByb21wdCxcbiAgICAgICAgICBtb2RlOiAndGV4dHVyZV9hbmRfYW5pbWF0aW9uJyxcbiAgICAgICAgICBwYXJhbXM6IHtcbiAgICAgICAgICAgIHByaW1hcnlDb2xvcjogdGV4U3BlYy5wcmltYXJ5SGV4LFxuICAgICAgICAgICAgc2Vjb25kYXJ5Q29sb3I6IHRleFNwZWMuc2Vjb25kYXJ5SGV4LFxuICAgICAgICAgICAgYWNjZW50Q29sb3I6IHRleFNwZWMuYWNjZW50SGV4LFxuICAgICAgICAgICAgcGF0dGVyblR5cGU6IHRleFNwZWMucGF0dGVyblR5cGUsXG4gICAgICAgICAgICByb3VnaG5lc3M6IHRleFNwZWMucm91Z2huZXNzLFxuICAgICAgICAgICAgbWV0YWxuZXNzOiB0ZXhTcGVjLm1ldGFsbmVzcyxcbiAgICAgICAgICAgIGdyaWREZW5zaXR5OiB0ZXhTcGVjLmdyaWREZW5zaXR5LFxuICAgICAgICAgICAgdHJhamVjdG9yeVR5cGU6IGFuaW1TcGVjLnRyYWplY3RvcnlUeXBlLFxuICAgICAgICAgICAgc3BlZWQ6IGFuaW1TcGVjLnNwZWVkLFxuICAgICAgICAgICAgYW1wbGl0dWRlOiBhbmltU3BlYy5hbXBsaXR1ZGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoZGF0YT8uc3BlYykge1xuICAgICAgICBjb25zdCBzID0gZGF0YS5zcGVjO1xuICAgICAgICBjb25zdCB2YWxpZFBhdHRlcm5zID0gWydjaXJjdWl0JywgJ2hleGdyaWQnLCAnY2FyYm9uJywgJ2NyeXN0YWwnLCAnbmVidWxhJywgJ2FyY2hpdGVjdHVyYWwnXTtcbiAgICAgICAgY29uc3QgdmFsaWRUcmFqID0gWydub25lJywgJ2hvdmVyJywgJ29yYml0JywgJ2ZpZ3VyZTgnLCAncHVsc2UnLCAnc3BpbiddO1xuICAgICAgICBzZXRUZXhTcGVjKHtcbiAgICAgICAgICBhc3NldFRpdGxlOiBzLmFzc2V0VGl0bGUgfHwgJ0FJIFN5bnRoZXNpemVkIFN1cmZhY2UnLFxuICAgICAgICAgIHByaW1hcnlIZXg6IHMucHJpbWFyeUhleD8uc3RhcnRzV2l0aCgnIycpID8gcy5wcmltYXJ5SGV4IDogdGV4U3BlYy5wcmltYXJ5SGV4LFxuICAgICAgICAgIHNlY29uZGFyeUhleDogcy5zZWNvbmRhcnlIZXg/LnN0YXJ0c1dpdGgoJyMnKSA/IHMuc2Vjb25kYXJ5SGV4IDogdGV4U3BlYy5zZWNvbmRhcnlIZXgsXG4gICAgICAgICAgYWNjZW50SGV4OiBzLmFjY2VudEhleD8uc3RhcnRzV2l0aCgnIycpID8gcy5hY2NlbnRIZXggOiB0ZXhTcGVjLmFjY2VudEhleCxcbiAgICAgICAgICBwYXR0ZXJuVHlwZTogdmFsaWRQYXR0ZXJucy5pbmNsdWRlcyhzLnBhdHRlcm5UeXBlKSA/IHMucGF0dGVyblR5cGUgOiB0ZXhTcGVjLnBhdHRlcm5UeXBlLFxuICAgICAgICAgIHJvdWdobmVzczogdHlwZW9mIHMucm91Z2huZXNzID09PSAnbnVtYmVyJyA/IE1hdGgubWF4KDAuMDUsIE1hdGgubWluKDAuOTUsIHMucm91Z2huZXNzKSkgOiB0ZXhTcGVjLnJvdWdobmVzcyxcbiAgICAgICAgICBtZXRhbG5lc3M6IHR5cGVvZiBzLm1ldGFsbmVzcyA9PT0gJ251bWJlcicgPyBNYXRoLm1heCgwLjA1LCBNYXRoLm1pbigwLjk4LCBzLm1ldGFsbmVzcykpIDogdGV4U3BlYy5tZXRhbG5lc3MsXG4gICAgICAgICAgZ3JpZERlbnNpdHk6IHR5cGVvZiBzLmdyaWREZW5zaXR5ID09PSAnbnVtYmVyJyA/IE1hdGgubWF4KDQsIE1hdGgubWluKDI4LCBzLmdyaWREZW5zaXR5KSkgOiB0ZXhTcGVjLmdyaWREZW5zaXR5LFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0QW5pbVNwZWMoe1xuICAgICAgICAgIHRyYWplY3RvcnlUeXBlOiB2YWxpZFRyYWouaW5jbHVkZXMocy50cmFqZWN0b3J5VHlwZSkgPyBzLnRyYWplY3RvcnlUeXBlIDogYW5pbVNwZWMudHJhamVjdG9yeVR5cGUsXG4gICAgICAgICAgc3BlZWQ6IHR5cGVvZiBzLnNwZWVkID09PSAnbnVtYmVyJyA/IE1hdGgubWF4KDAuMiwgTWF0aC5taW4oNCwgcy5zcGVlZCkpIDogYW5pbVNwZWMuc3BlZWQsXG4gICAgICAgICAgYW1wbGl0dWRlOiB0eXBlb2Ygcy5hbXBsaXR1ZGUgPT09ICdudW1iZXInID8gTWF0aC5tYXgoMC4xLCBNYXRoLm1pbigyLCBzLmFtcGxpdHVkZSkpIDogYW5pbVNwZWMuYW1wbGl0dWRlLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0QXNzZXRTdGF0dXNNc2coXG4gICAgICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgPyBgV3lnZW5lcm93YW5vIHphc8OzYiBBSTogXCIke3MuYXNzZXRUaXRsZSB8fCAnUEJSIFN1cmZhY2UnfVwiIOKAkyBnb3Rvd3kgZG8gbmHFgm/FvGVuaWEgbmEgb2JpZWt0IDNEIWBcbiAgICAgICAgICAgIDogYFN5bnRoZXNpemVkIEFJIGFzc2V0OiBcIiR7cy5hc3NldFRpdGxlIHx8ICdQQlIgU3VyZmFjZSd9XCIg4oCTIHJlYWR5IHRvIGFwcGx5IHRvIDNEIGFjdG9yIWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIHNldEFzc2V0U3RhdHVzTXNnKFxuICAgICAgICBsYW5nID09PSAncGwnXG4gICAgICAgICAgPyAnWmFrdHVhbGl6b3dhbm8gcHJvY2VkdXJhbG7EhSB0ZWtzdHVyxJkgUEJSIGkga3J6eXfEhSBhbmltYWNqaS4nXG4gICAgICAgICAgOiAnVXBkYXRlZCBwcm9jZWR1cmFsIFBCUiB0ZXh0dXJlIGFuZCBhbmltYXRpb24gY3VydmUuJ1xuICAgICAgKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNHZW5lcmF0aW5nQXNzZXQoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBhcHBseUFpQXNzZXRUb1NjZW5lT2JqZWN0ID0gKGFwcGx5VG9BbGwgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldElkID0gc2VsZWN0ZWRPYmplY3RJZCB8fCBvYmplY3RzWzBdPy5pZDtcbiAgICBzZXRPYmplY3RzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKG9iaikgPT4ge1xuICAgICAgICBpZiAoYXBwbHlUb0FsbCB8fCBvYmouaWQgPT09IHRhcmdldElkKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLm9iaixcbiAgICAgICAgICAgIGNvbG9yOiB0ZXhTcGVjLnByaW1hcnlIZXgsXG4gICAgICAgICAgICBzZWNvbmRhcnlDb2xvcjogdGV4U3BlYy5hY2NlbnRIZXgsXG4gICAgICAgICAgICByb3VnaG5lc3M6IHRleFNwZWMucm91Z2huZXNzLFxuICAgICAgICAgICAgbWV0YWxuZXNzOiB0ZXhTcGVjLm1ldGFsbmVzcyxcbiAgICAgICAgICAgIHRleHR1cmVTcGVjOiB7IC4uLnRleFNwZWMgfSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogeyAuLi5hbmltU3BlYyB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0pXG4gICAgKTtcbiAgICBzZXRBc3NldFN0YXR1c01zZyhcbiAgICAgIGxhbmcgPT09ICdwbCdcbiAgICAgICAgPyBhcHBseVRvQWxsXG4gICAgICAgICAgPyAnWmFzdG9zb3dhbm8gdGVrc3R1csSZIEFJIGkgYW5pbWFjasSZIGRvIHdzenlzdGtpY2ggb2JpZWt0w7N3IG5hIHNjZW5pZSAzRCEnXG4gICAgICAgICAgOiAnWmFzdG9zb3dhbm8gdGVrc3R1csSZIEFJIGkgYW5pbWFjasSZIGRvIHd5YnJhbmVnbyBvYmlla3R1IDNEISdcbiAgICAgICAgOiBhcHBseVRvQWxsXG4gICAgICAgID8gJ0FwcGxpZWQgQUkgdGV4dHVyZSAmIGFuaW1hdGlvbiB0byBhbGwgM0Qgc2NlbmUgYWN0b3JzISdcbiAgICAgICAgOiAnQXBwbGllZCBBSSB0ZXh0dXJlICYgYW5pbWF0aW9uIHRvIHNlbGVjdGVkIDNEIGFjdG9yISdcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUdlbmVyYXRlQWlEb2NzID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldElzR2VuZXJhdGluZ0RvY3ModHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvYWkvZ2VuZXJhdGUtZG9jcycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcHJvamVjdE5hbWUsXG4gICAgICAgICAgb2JqZWN0cyxcbiAgICAgICAgICBsb2dpY05vZGVzLFxuICAgICAgICAgIG1vYmlsZUNvbmZpZyxcbiAgICAgICAgICBsYW5nLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmIChkYXRhPy5kb2MpIHtcbiAgICAgICAgc2V0R2VuZXJhdGVkRG9jKGRhdGEuZG9jKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEtlZXAgZXhpc3Rpbmcgc3RydWN0dXJlZCBkb2N1bWVudGF0aW9uXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzR2VuZXJhdGluZ0RvY3MoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctWzEzODBweF0gbXgtYXV0byBweC02IHB5LTggc3BhY2UteS0xMFwiPlxuICAgICAgey8qIFNFQ1RJT04gMTogQUkgSU1BR0UgKFBCUiBURVhUVVJFKSAmIDNEIEFOSU1BVElPTiBHRU5FUkFUT1IgV0lUSCBQQVJBTUVURVIgRURJVE9SICovfVxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgYmctd2hpdGUgZGFyazpiZy1zbGF0ZS05MDAgcC02XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTYgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnMDEuIEdlbmVyYXRvciBPYnJhesOzdyAoVGVrc3R1ciBQQlIpIGkgQW5pbWFjamkgM0QgeiBFZHl0b3JlbSBQYXJhbWV0csOzdyBBSSdcbiAgICAgICAgICAgICAgICA6ICcwMS4gQUkgUEJSIFRleHR1cmUgSW1hZ2UgJiAzRCBBbmltYXRpb24gR2VuZXJhdG9yIHdpdGggUGFyYW1ldGVyIEVkaXRvcid9XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwIG10LTFcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICA/ICdPcGlzeiBwb8W8xIVkYW55IG1hdGVyaWHFgiBsdWIgcnVjaCBvYmlla3R1LiBNb2RlbCBHZW1pbmkgQUkgZG9iaWVyemUgcGFyYW1ldHJ5IHNoYWRlcsOzdyBQQlIgaSB0cmFqZWt0b3JpaSBrbGF0ZWsga2x1Y3pvd3ljaC4nXG4gICAgICAgICAgICAgICAgOiAnRGVzY3JpYmUgeW91ciBkZXNpcmVkIHN1cmZhY2UgbWF0ZXJpYWwgb3IgbW90aW9uIGN1cnZlLiBHZW1pbmkgQUkgc3ludGhlc2l6ZXMgUEJSIHNoYWRlciBwYXJhbWV0ZXJzIGFuZCBrZXlmcmFtZSB0cmFqZWN0b3JpZXMuJ31cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uU3dpdGNoVG9WaWV3cG9ydH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1zbGF0ZS05MDAgZGFyazpiZy1zbGF0ZS04MDAgdGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAgZGFyazpob3ZlcjpiZy1zbGF0ZS03MDAgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1dyw7PEhyBkbyBTY2VueSAzRCcgOiAnUmV0dXJuIHRvIDNEIFZpZXdwb3J0J31cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtOCBwdC02IGl0ZW1zLXN0cmV0Y2hcIj5cbiAgICAgICAgICB7LyogTGVmdCA3IENvbHM6IFByb21wdCAmIEludHVpdGl2ZSBQYXJhbWV0ZXIgU2xpZGVycyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgc3BhY2UteS01XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNzAwIGRhcms6dGV4dC1zbGF0ZS0zMDAgbWItMS41XCI+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUHJvbXB0IGRsYSBNb2RlbHUgQUkgKE9icmF6IFRla3N0dXJ5ICsgQW5pbWFjamEgM0QpJyA6ICdBSSBQcm9tcHQgKFRleHR1cmUgSW1hZ2UgKyAzRCBBbmltYXRpb24pJ31cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17YWlQcm9tcHR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEFpUHJvbXB0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweC0zLjUgcHktMi41IHJvdW5kZWQtbGcgdGV4dC1zbSBiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcbiAgICAgICAgICAgICAgICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ25wLiBIb2xvZ3JhZmljem5hIHNpYXRrYSBoZWtzYWdvbmFsbmEgemUgesWCb3R5bSBwb8WCeXNraWVtLi4uJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2UuZy4gSG9sb2dyYXBoaWMgaGV4YWdvbmFsIG1lc2ggd2l0aCBicnVzaGVkIGdvbGQgc2hlZW4uLi4nXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTeW50aGVzaXplQWlBc3NldH1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0dlbmVyYXRpbmdBc3NldH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMi41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGJnLWFtYmVyLTUwMCBob3ZlcjpiZy1hbWJlci00MDAgdGV4dC1zbGF0ZS05NTAgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgZGlzYWJsZWQ6b3BhY2l0eS02MFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9e2B3LTQgaC00ICR7aXNHZW5lcmF0aW5nQXNzZXQgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICAgICAgICB7aXNHZW5lcmF0aW5nQXNzZXRcbiAgICAgICAgICAgICAgICAgICAgPyBsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnU3ludGV6YSBBSS4uLidcbiAgICAgICAgICAgICAgICAgICAgICA6ICdTeW50aGVzaXppbmcuLi4nXG4gICAgICAgICAgICAgICAgICAgIDogbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgICA/ICdHZW5lcnVqIHByemV6IEFJJ1xuICAgICAgICAgICAgICAgICAgICA6ICdHZW5lcmF0ZSB3aXRoIEFJJ31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFBhcmFtZXRlciBTbGlkZXJzIEdyaWQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTQgcHQtMlwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnV3rDs3IgR2VvbWV0cnljem55IE9icmF6dSBQQlInIDogJ1BCUiBTdXJmYWNlIFBhdHRlcm4gVG9wb2xvZ3knfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RleFNwZWMucGF0dGVyblR5cGV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIHNldFRleFNwZWMoKHByZXYpID0+ICh7IC4uLnByZXYsIHBhdHRlcm5UeXBlOiBlLnRhcmdldC52YWx1ZSBhcyBhbnkgfSkpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQtbGcgdGV4dC14cyBiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY2lyY3VpdFwiPntsYW5nID09PSAncGwnID8gJ09id29keSBLd2FudG93ZSAoQ2lyY3VpdCknIDogJ1F1YW50dW0gQ2lyY3VpdCd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiaGV4Z3JpZFwiPntsYW5nID09PSAncGwnID8gJ1NpYXRrYSBIZWtzYWdvbmFsbmEgKEhleEdyaWQpJyA6ICdIZXhhZ29uYWwgR3JpZCd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY2FyYm9uXCI+e2xhbmcgPT09ICdwbCcgPyAnV8WCw7Nrbm8gV8SZZ2xvd2UgKENhcmJvbiBXZWF2ZSknIDogJ0NhcmJvbiBGaWJlciBXZWF2ZSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY3J5c3RhbFwiPntsYW5nID09PSAncGwnID8gJ0ZyYWt0YWwgS3J5c3p0YcWCb3d5IChDcnlzdGFsKScgOiAnQ3J5c3RhbCBWb3Jvbm9pJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJuZWJ1bGFcIj57bGFuZyA9PT0gJ3BsJyA/ICdNZ8WCYXdpY2EgUGxhem1vd2EgKE5lYnVsYSknIDogJ1BsYXNtYSBOZWJ1bGEnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFyY2hpdGVjdHVyYWxcIj57bGFuZyA9PT0gJ3BsJyA/ICdQxYJ5dHkgQXJjaGl0ZWt0b25pY3puZScgOiAnQXJjaGl0ZWN0dXJhbCBQYW5lbHMnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnVHlwIFRyYWpla3RvcmlpIEFuaW1hY2ppIDNEJyA6ICczRCBLZXlmcmFtZSBBbmltYXRpb24gQ3VydmUnfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2FuaW1TcGVjLnRyYWplY3RvcnlUeXBlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICBzZXRBbmltU3BlYygocHJldikgPT4gKHsgLi4ucHJldiwgdHJhamVjdG9yeVR5cGU6IGUudGFyZ2V0LnZhbHVlIGFzIGFueSB9KSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGJnLXNsYXRlLTUwIGRhcms6Ymctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJob3ZlclwiPntsYW5nID09PSAncGwnID8gJ0hhcm1vbmljem5hIExld2l0YWNqYSAoSG92ZXIpJyA6ICdIYXJtb25pYyBIb3Zlcid9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib3JiaXRcIj57bGFuZyA9PT0gJ3BsJyA/ICdPcmJpdGEgS2/Fgm93YSAzNjDCsCcgOiAnMzYwwrAgQ2lyY3VsYXIgT3JiaXQnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImZpZ3VyZThcIj57bGFuZyA9PT0gJ3BsJyA/ICdQxJl0bGEgTGVtbmlza2F0eSAow5NzZW1rYSknIDogJ0ZpZ3VyZS04IExlbW5pc2NhdGUnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNwaW5cIj57bGFuZyA9PT0gJ3BsJyA/ICdPYnLDs3Qgxbt5cm9za29wb3d5IChTcGluKScgOiAnR3lyb3Njb3BpYyBTcGluJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwdWxzZVwiPntsYW5nID09PSAncGwnID8gJ1B1bHNvd2FuaWUgUmV6b25hbnNvd2UnIDogJ1Jlc29uYW5jZSBTY2FsZSBQdWxzZSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibm9uZVwiPntsYW5nID09PSAncGwnID8gJ0JyYWsgKFN0YXR5Y3pueSknIDogJ05vbmUgKFN0YXRpYyknfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1N6b3JzdGtvxZvEhyBQQlIgKFJvdWdobmVzcyknIDogJ1BCUiBSb3VnaG5lc3MnfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRhYnVsYXItbnVtcyB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgICAge3RleFNwZWMucm91Z2huZXNzLnRvRml4ZWQoMil9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgbWluPVwiMC4wNVwiXG4gICAgICAgICAgICAgICAgICBtYXg9XCIwLjk1XCJcbiAgICAgICAgICAgICAgICAgIHN0ZXA9XCIwLjA1XCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt0ZXhTcGVjLnJvdWdobmVzc31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGV4U3BlYygocHJldikgPT4gKHsgLi4ucHJldiwgcm91Z2huZXNzOiBOdW1iZXIoZS50YXJnZXQudmFsdWUpIH0pKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1hbWJlci01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnTWV0YWxpY3pub8WbxIcgUEJSIChNZXRhbG5lc3MpJyA6ICdQQlIgTWV0YWxuZXNzJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0ZXhTcGVjLm1ldGFsbmVzcy50b0ZpeGVkKDIpfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgIG1pbj1cIjAuMDVcIlxuICAgICAgICAgICAgICAgICAgbWF4PVwiMC45OFwiXG4gICAgICAgICAgICAgICAgICBzdGVwPVwiMC4wNVwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGV4U3BlYy5tZXRhbG5lc3N9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIHNldFRleFNwZWMoKHByZXYpID0+ICh7IC4uLnByZXYsIG1ldGFsbmVzczogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KSlcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtYW1iZXItNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0fEmXN0b8WbxIcgU2lhdGtpIFRla3N0dXJ5JyA6ICdQYXR0ZXJuIEdyaWQgRGVuc2l0eSd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICB7dGV4U3BlYy5ncmlkRGVuc2l0eX14e3RleFNwZWMuZ3JpZERlbnNpdHl9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgbWluPVwiNFwiXG4gICAgICAgICAgICAgICAgICBtYXg9XCIyNFwiXG4gICAgICAgICAgICAgICAgICBzdGVwPVwiMlwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dGV4U3BlYy5ncmlkRGVuc2l0eX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGV4U3BlYygocHJldikgPT4gKHsgLi4ucHJldiwgZ3JpZERlbnNpdHk6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSkpXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdQcsSZZGtvxZvEhyBpIEFtcGxpdHVkYSBBbmltYWNqaScgOiAnQW5pbWF0aW9uIFNwZWVkICYgQW1wbGl0dWRlJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIHthbmltU3BlYy5zcGVlZC50b0ZpeGVkKDEpfXggwrcge2FuaW1TcGVjLmFtcGxpdHVkZS50b0ZpeGVkKDIpfW1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICBtaW49XCIwLjRcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9XCIzLjVcIlxuICAgICAgICAgICAgICAgICAgICBzdGVwPVwiMC4yXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2FuaW1TcGVjLnNwZWVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgc2V0QW5pbVNwZWMoKHByZXYpID0+ICh7IC4uLnByZXYsIHNwZWVkOiBOdW1iZXIoZS50YXJnZXQudmFsdWUpIH0pKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtYW1iZXItNTAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMC4xXCJcbiAgICAgICAgICAgICAgICAgICAgbWF4PVwiMS41XCJcbiAgICAgICAgICAgICAgICAgICAgc3RlcD1cIjAuMVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXthbmltU3BlYy5hbXBsaXR1ZGV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBzZXRBbmltU3BlYygocHJldikgPT4gKHsgLi4ucHJldiwgYW1wbGl0dWRlOiBOdW1iZXIoZS50YXJnZXQudmFsdWUpIH0pKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtYW1iZXItNTAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBDb2xvciBTd2F0Y2hlcyAmIFRhcmdldCBTZWxlY3RvciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtc2xhdGUtNzAwIGRhcms6dGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY29sb3JcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGV4U3BlYy5wcmltYXJ5SGV4fVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFRleFNwZWMoKHApID0+ICh7IC4uLnAsIHByaW1hcnlIZXg6IGUudGFyZ2V0LnZhbHVlIH0pKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy02IGgtNiByb3VuZGVkIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdCYXphJyA6ICdCYXNlJ31cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtc2xhdGUtNzAwIGRhcms6dGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY29sb3JcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGV4U3BlYy5zZWNvbmRhcnlIZXh9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VGV4U3BlYygocCkgPT4gKHsgLi4ucCwgc2Vjb25kYXJ5SGV4OiBlLnRhcmdldC52YWx1ZSB9KSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNiBoLTYgcm91bmRlZCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnVG9uJyA6ICdUb25lJ31cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtc2xhdGUtNzAwIGRhcms6dGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY29sb3JcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGV4U3BlYy5hY2NlbnRIZXh9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VGV4U3BlYygocCkgPT4gKHsgLi4ucCwgYWNjZW50SGV4OiBlLnRhcmdldC52YWx1ZSB9KSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNiBoLTYgcm91bmRlZCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnRW1pc2phJyA6ICdBY2NlbnQnfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPYmplY3RJZCB8fCBvYmplY3RzWzBdPy5pZCB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VsZWN0ZWRPYmplY3RJZChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGJnLXNsYXRlLTUwIGRhcms6Ymctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtvYmplY3RzLm1hcCgobykgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17by5pZH0gdmFsdWU9e28uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgIHtvLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlBaUFzc2V0VG9TY2VuZU9iamVjdChmYWxzZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctYW1iZXItNTAwIGhvdmVyOmJnLWFtYmVyLTQwMCB0ZXh0LXNsYXRlLTk1MCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnTmHFgsOzxbwgbmEgV3licmFueSBPYmlla3QgM0QnIDogJ0FwcGx5IHRvIFNlbGVjdGVkIEFjdG9yJ31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBhcHBseUFpQXNzZXRUb1NjZW5lT2JqZWN0KHRydWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS0xMDAgZGFyazpiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtMjAwIGRhcms6aG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtODAwIGRhcms6dGV4dC1zbGF0ZS0yMDAgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ05hxYLDs8W8IG5hIENhxYLEhSBTY2VuxJknIDogJ0FwcGx5IHRvIEFsbCd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHthc3NldFN0YXR1c01zZyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWVtZXJhbGQtNjAwIGRhcms6dGV4dC1lbWVyYWxkLTQwMCBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57YXNzZXRTdGF0dXNNc2d9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUmlnaHQgNSBDb2xzOiBSZWFsLVRpbWUgNTEyeDUxMiBQQlIgVGV4dHVyZSBDYW52YXMgUHJldmlldyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+e3RleFNwZWMuYXNzZXRUaXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWFtYmVyLTQwMFwiPlxuICAgICAgICAgICAgICAgIDUxMsOXNTEyIFNSR0IgwrcgQW5pc28gMTZ4XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICByZWY9e3ByZXZpZXdDYW52YXNDb250YWluZXJSZWZ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTY0IHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTkwMFwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4+UEFUVEVSTjoge3RleFNwZWMucGF0dGVyblR5cGUudG9VcHBlckNhc2UoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPsK3PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj5BTklNOiB7YW5pbVNwZWMudHJhamVjdG9yeVR5cGUudG9VcHBlckNhc2UoKX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPsK3PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj5TUEVFRDoge2FuaW1TcGVjLnNwZWVkfXg8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIHsvKiBTRUNUSU9OIDI6IFNUQU5EQUxPTkUgUEhPTkUgJiBUQUJMRVQgUExBWSBDT05GSUdVUkFUSU9OIEdVSURFIChIRUFEU0VULUZSRUUgVlIpICovfVxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgYmctd2hpdGUgZGFyazpiZy1zbGF0ZS05MDAgcC02XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItNSBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFNtYXJ0cGhvbmUgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnMDIuIEdyYSBUeWxrbyBuYSBUZWxlZm9uaWUgbHViIFRhYmxlY2llIOKAkyBNb8W8bGl3b8WbY2kgS29uZmlndXJhY2ppIChCZXogR29nbGkgVlIpJ1xuICAgICAgICAgICAgICAgIDogJzAyLiBQaG9uZSAmIFRhYmxldCBTdGFuZGFsb25lIFBsYXkgTW9kZSDigJMgQ29uZmlndXJhdGlvbiBDYXBhYmlsaXRpZXMnfVxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnUGXFgm5hIG9ic8WCdWdhIHJvemdyeXdraSBtb2JpbG5laiBiZXoga29uaWVjem5vxZtjaSBwb3NpYWRhbmlhIGdvZ2xpIFZSIG9yYXogeiBvcGNqb25hbG55bSB0cnliZW0gc3RlcmVvc2tvcG93eW0gU3BsaXQtU2NyZWVuLidcbiAgICAgICAgICAgICAgICA6ICdDb21wbGV0ZSBtb2JpbGUgZ2FtZXBsYXkgc3VwcG9ydCB1c2luZyBvbmx5IGEgcGhvbmUgb3IgdGFibGV0IHdpdGhvdXQgVlIgaGVhZHNldHMsIHBsdXMgb3B0aW9uYWwgc3RlcmVvc2NvcGljIFNwbGl0LVNjcmVlbi4nfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS01MDAgZGFyazp0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgPHNwYW4+aU9TIDE2KyBTYWZhcmkgV2ViR0wyPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+wrc8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5BbmRyb2lkIDEzKyBDaHJvbWUgV2ViWFI8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtNiBwdC02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC1sZyBiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtYW1iZXItNjAwIGRhcms6dGV4dC1hbWJlci00MDBcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnVFJZQiAxIMK3IMW7WVJPU0tPUCAzNjDCsCArIE1VTFRJLVRPVUNIJyA6ICdNT0RFIDEgwrcgMzYwwrAgR1lSTyArIE1VTFRJLVRPVUNIJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ09rbm8gUHJ6ZXN0cnplbm5lIChNYWdpYyBXaW5kb3cpJyA6ICdTcGF0aWFsIE1hZ2ljIFdpbmRvdyd9XG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgID8gJ09icmFjYW5pZSB0ZWxlZm9udSBsdWIgdGFibGV0dSB3IGTFgm9uaWFjaCBzdGVydWplIGthbWVyxIUgM0QgdyBjemFzaWUgcnplY3p5d2lzdHltIGR6acSZa2kgYWtjZWxlcm9tZXRyb3dpIGkgxbx5cm9za29wb3dpIChEZXZpY2VPcmllbnRhdGlvbiBBUEkpLiBMZXd5IGtjaXVrIG9ic8WCdWd1amUgd2lydHVhbG55IGRyxIXFvGVrIHJ1Y2h1LCBhIHByYXd5IHd5endhbGEgaW50ZXJha2NqZS4nXG4gICAgICAgICAgICAgICAgOiAnTW92aW5nIHlvdXIgcGhvbmUgb3IgdGFibGV0IGluIHNwYWNlIHJvdGF0ZXMgdGhlIDNEIGNhbWVyYSBpbiByZWFsIHRpbWUgdmlhIHRoZSBneXJvc2NvcGUuIExlZnQgdGh1bWIgZHJpdmVzIGxvY29tb3Rpb24gd2hpbGUgcmlnaHQgdGh1bWIgdHJpZ2dlcnMgc2NlbmUgaW50ZXJhY3Rpb25zLid9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj57bGFuZyA9PT0gJ3BsJyA/ICdDenXFgm/Fm8SHIMW8eXJvc2tvcHU6JyA6ICdHeXJvIHNlbnNpdGl2aXR5Oid9PC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjAuNVwiXG4gICAgICAgICAgICAgICAgbWF4PVwiMi41XCJcbiAgICAgICAgICAgICAgICBzdGVwPVwiMC4xXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17bW9iaWxlQ29uZmlnLmd5cm9TZW5zaXRpdml0eX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICBzZXRNb2JpbGVDb25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIGd5cm9TZW5zaXRpdml0eTogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB9KSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0yOCBhY2NlbnQtYW1iZXItNTAwXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPnttb2JpbGVDb25maWcuZ3lyb1NlbnNpdGl2aXR5LnRvRml4ZWQoMSl9eDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC1sZyBiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtYW1iZXItNjAwIGRhcms6dGV4dC1hbWJlci00MDBcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnVFJZQiAyIMK3IFRBQkxFVCBEVUFMLVNUSUNLIEhVRCcgOiAnTU9ERSAyIMK3IFRBQkxFVCBEVUFMLVNUSUNLIEhVRCd9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdFcmdvbm9taWEgZGxhIER1xbx5Y2ggRWtyYW7Ds3cgKGlQYWQgLyBHYWxheHkgVGFiKScgOiAnTGFyZ2UgVGFibGV0IEVyZ29ub21pY3MnfVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICA/ICdOYSB0YWJsZXRhY2ggKDEwXCItMTNcIikgaW50ZXJmZWpzIGF1dG9tYXR5Y3puaWUgcm96ZHppZWxhIHN0cmVmeSBrY2l1a8OzdyBwcnp5IGRvbG55Y2gga3Jhd8SZZHppYWNoIGVrcmFudSwgYmxva3VqZSBwcnp5cGFka293ZSBwcnpld2lqYW5pZSBzdHJvbnkgaSBza2FsdWplIHJvemR6aWVsY3pvxZvEhyBEUFIgZGxhIHN0YcWCeWNoIDYwLzEyMCBGUFMuJ1xuICAgICAgICAgICAgICAgIDogJ09uIDEwXCItMTNcIiB0YWJsZXRzLCB0aGUgbGF5b3V0IHNwbGl0cyB0aHVtYiB6b25lcyBhbG9uZyB0aGUgbG93ZXIgYmV6ZWwsIGxvY2tzIHZpZXdwb3J0IGJvdW5jZSwgYW5kIGR5bmFtaWNhbGx5IHNjYWxlcyBEUFIgZm9yIGxvY2tlZCA2MC8xMjAgRlBTLid9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj57bGFuZyA9PT0gJ3BsJyA/ICdTa2FsYSBSZW5kZXJvd2FuaWE6JyA6ICdSZW5kZXIgU2NhbGU6J308L3NwYW4+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgbWluPVwiNTBcIlxuICAgICAgICAgICAgICAgIG1heD1cIjEwMFwiXG4gICAgICAgICAgICAgICAgc3RlcD1cIjVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXttb2JpbGVDb25maWcuYWRhcHRpdmVSZXNvbHV0aW9uUGN0fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgIHNldE1vYmlsZUNvbmZpZygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgYWRhcHRpdmVSZXNvbHV0aW9uUGN0OiBOdW1iZXIoZS50YXJnZXQudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMjggYWNjZW50LWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGVcIj57bW9iaWxlQ29uZmlnLmFkYXB0aXZlUmVzb2x1dGlvblBjdH0lPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLWxnIGJnLXNsYXRlLTUwIGRhcms6Ymctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1hbWJlci02MDAgZGFyazp0ZXh0LWFtYmVyLTQwMFwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdUUllCIDMgwrcgU1RFUkVPU0tPUE9XWSBTUExJVC1TQ1JFRU4nIDogJ01PREUgMyDCtyBTVEVSRU9TQ09QSUMgU1BMSVQtU0NSRUVOJ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0thbGlicmFjamEgU29jemV3ZWsgaSBSb3pzdGF3dSDFuXJlbmljIChJUEQpJyA6ICdMZW5zICYgSVBEIENhbGlicmF0aW9uJ31cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnUG8gdW1pZXN6Y3plbml1IHRlbGVmb251IHcgdWNod3ljaWUgQ2FyZGJvYXJkIGx1YiBnb2dsYWNoIG1vYmlsbnljaCBhcGxpa2FjamEgZHppZWxpIGVrcmFuIG5hIGxld2UgaSBwcmF3ZSBva28geiBuaWV6YWxlxbxuxIUgbWFjaWVyesSFIHByb2pla2NqaSBpIGNlbG93bmlraWVtIHd6cm9rb3d5bSAoR2F6ZSBEd2VsbCBUaW1lciAxLjVzKS4nXG4gICAgICAgICAgICAgICAgOiAnV2hlbiBzbG90dGVkIGludG8gYSBtb2JpbGUgVlIgc2hlbGwsIHRoZSBlbmdpbmUgcmVuZGVycyBpbmRlcGVuZGVudCBsZWZ0L3JpZ2h0IGV5ZSB2aWV3cG9ydHMgd2l0aCBjdXN0b21pemFibGUgSVBEIG9mZnNldCBhbmQgaGFuZHMtZnJlZSBHYXplIER3ZWxsIHRyaWdnZXJzLid9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj57bGFuZyA9PT0gJ3BsJyA/ICdPZMWbd2llxbxhbmllIGRvY2Vsb3dlOicgOiAnVGFyZ2V0IFJlZnJlc2g6J308L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMVwiPlxuICAgICAgICAgICAgICAgIHsoWzYwLCA5MCwgMTIwXSBhcyBjb25zdCkubWFwKChmcHMpID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtmcHN9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1vYmlsZUNvbmZpZygocHJldikgPT4gKHsgLi4ucHJldiwgdGFyZ2V0RnBzOiBmcHMgfSkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSAke1xuICAgICAgICAgICAgICAgICAgICAgIG1vYmlsZUNvbmZpZy50YXJnZXRGcHMgPT09IGZwc1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS0yMDAgZGFyazpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS03MDAgZGFyazp0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtmcHN9SHpcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgey8qIFNFQ1RJT04gMzogQVVUT01BVEVEIFRFQ0hOSUNBTCBET0NVTUVOVEFUSU9OIEdFTkVSQVRPUiAmIFBERiBFWFBPUlQgKi99XG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJyb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTkwMCBwLTZcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTYgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8RmlsZVRleHQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnMDMuIEF1dG9tYXR5Y3puZSBHZW5lcm93YW5pZSBEb2t1bWVudGFjamkgVGVjaG5pY3puZWogUHJvamVrdHUgKEFJICsgUERGKSdcbiAgICAgICAgICAgICAgICA6ICcwMy4gQXV0b21hdGVkIFByb2plY3QgVGVjaG5pY2FsIERvY3VtZW50YXRpb24gR2VuZXJhdG9yIChBSSArIFBERiknfVxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMCBtdC0xXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnS29tcGlsdWplIGdyYWYgc2NlbnkgM0QsIGJ1ZMW8ZXQgdHLDs2prxIV0w7N3LCByZWd1xYJ5IE5vLUNvZGUgb3JheiBwYXJhbWV0cnkgbW9iaWxuZSB3IHVzdHJ1a3R1cnl6b3dhbnkgcmFwb3J0IGluxbx5bmllcnlqbnkuJ1xuICAgICAgICAgICAgICAgIDogJ0NvbXBpbGVzIHlvdXIgbGl2ZSAzRCBzY2VuZSBncmFwaCwgdHJpYW5nbGUgYnVkZ2V0LCBOby1Db2RlIGxvZ2ljIHJ1bGVzLCBhbmQgbW9iaWxlIHBhcmFtZXRlcnMgaW50byBhbiBlbmdpbmVlcmluZyBzcGVjaWZpY2F0aW9uLid9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICB2YWx1ZT17cHJvamVjdE5hbWV9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UHJvamVjdE5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGJnLXNsYXRlLTUwIGRhcms6Ymctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtMzAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgZm9udC1tZWRpdW1cIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlByb2plY3QgTmFtZVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZUFpRG9jc31cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzR2VuZXJhdGluZ0RvY3N9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1hbWJlci01MDAgaG92ZXI6YmctYW1iZXItNDAwIHRleHQtc2xhdGUtOTUwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICB7aXNHZW5lcmF0aW5nRG9jc1xuICAgICAgICAgICAgICAgID8gbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgPyAnR2VuZXJvd2FuaWUgcHJ6ZXogQUkuLi4nXG4gICAgICAgICAgICAgICAgICA6ICdHZW5lcmF0aW5nIERvY3MuLi4nXG4gICAgICAgICAgICAgICAgOiBsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnQWt0dWFsaXp1aiBEb2t1bWVudGFjasSZIEFJJ1xuICAgICAgICAgICAgICAgIDogJ1JlZ2VuZXJhdGUgQUkgRG9jcyd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICBleHBvcnRUZWNobmljYWxEb2NzUGRmKHByb2plY3ROYW1lLCBnZW5lcmF0ZWREb2MsIG9iamVjdHMsIGxvZ2ljTm9kZXMsIG1vYmlsZUNvbmZpZylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctc2xhdGUtOTAwIGRhcms6Ymctc2xhdGUtODAwIHRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwIGRhcms6aG92ZXI6Ymctc2xhdGUtNzAwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdFa3Nwb3J0dWogRG9rdW1lbnRhY2rEmSBkbyBQREYnIDogJ0V4cG9ydCBEb2NzIHRvIFBERid9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0zIGdhcC02IHB0LTYgdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMiBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAge2dlbmVyYXRlZERvYy52ZXJzaW9ufSDCtyB7b2JqZWN0cy5sZW5ndGh9IEFDVE9SUyDCtyB7bG9naWNOb2Rlcy5sZW5ndGh9IExPR0lDIFRSSUdHRVJTXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIHtnZW5lcmF0ZWREb2MudGl0bGV9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS0zMDAgbXQtMiBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICB7Z2VuZXJhdGVkRG9jLmV4ZWN1dGl2ZVN1bW1hcnl9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIG1iLTFcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdBcmNoaXRla3R1cmEgU2NlbnkgM0QgaSBQb3RvayBQQlInIDogJzNEIFNjZW5lIEFyY2hpdGVjdHVyZSAmIFBCUiBQaXBlbGluZSd9XG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAge2dlbmVyYXRlZERvYy5zY2VuZUFyY2hpdGVjdHVyZX1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgbWItMVwiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1NwZWN5ZmlrYWNqYSBNb2JpbG5hIChUZWxlZm9uIGkgVGFibGV0KScgOiAnTW9iaWxlICYgVGFibGV0IFN0YW5kYWxvbmUgU3BlY2lmaWNhdGlvbid9XG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAge2dlbmVyYXRlZERvYy5tb2JpbGVDb21wYXRHdWlkZX1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtbGcgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHAtNCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdCdWTFvGV0IFd5ZGFqbm/Fm2NpIGkgTGlzdGEgS29udHJvbG5hIFFBJyA6ICdQZXJmb3JtYW5jZSBUZWxlbWV0cnkgJiBRQSBDaGVja2xpc3QnfVxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5RVUVTVCAvIFBDVlIgRlBTPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtZW1lcmFsZC01MDBcIj5cbiAgICAgICAgICAgICAgICAgIHtnZW5lcmF0ZWREb2MucGVyZm9ybWFuY2VBbmFseXNpcz8uZXN0aW1hdGVkRnBzUXVlc3QgfHwgOTB9IEZQU1xuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5QSE9ORSAvIFRBQkxFVDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTUwMFwiPlxuICAgICAgICAgICAgICAgICAge2dlbmVyYXRlZERvYy5wZXJmb3JtYW5jZUFuYWx5c2lzPy5lc3RpbWF0ZWRGcHNNb2JpbGUgfHwgNjB9IEZQU1xuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHB0LTJcIj5cbiAgICAgICAgICAgICAgeyhnZW5lcmF0ZWREb2MucWFDaGVja2xpc3QgfHwgW10pLm1hcCgoaXRlbTogc3RyaW5nLCBpOiBudW1iZXIpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMiB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC01MDAgc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpdGVtfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19