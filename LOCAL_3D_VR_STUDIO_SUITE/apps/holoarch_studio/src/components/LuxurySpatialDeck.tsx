const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/holoarch_studio/node_modules/.vite/deps/react.js?v=c1c4f681";
import { Compass, Disc, Eye, Grid, Maximize2, Mountain, Sliders, Sparkles, Volume2, VolumeX, Wrench } from "/apps/holoarch_studio/node_modules/.vite/deps/lucide-react.js?v=c1c4f681";
import { playSafeLockDetentClick, playScratchJogPulse } from "/apps/holoarch_studio/src/utils/soundEffects.ts";
var _jsxFileName = "/app/applet/src/components/LuxurySpatialDeck.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/apps/holoarch_studio/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c1c4f681";
export const UPLOADED_INSPIRATION_GALLERY = [
	{
		id: "ref-glass-panels",
		title: "Szklane Panele Przestrzenne UI",
		category: "Trend: Frosted Glass HUD",
		src: "/apps/holoarch_studio/assets/aistudio/Unknown_12_bba1e6ab.jpeg",
		preset: {
			sceneId: "skyline_financial",
			palette: "platinum_arch",
			droneLandscape: "alpine_peaks",
			towerHeightMultiplier: 1.15,
			explodedViewFactor: .35,
			wireframeOverlay: false,
			perspectiveFovDeg: 62
		}
	},
	{
		id: "ref-acrylic-cubes",
		title: "Półprzezroczyste Bryły Akrylowe",
		category: "Narzędzia Głębi i Kompozycji",
		src: "/apps/holoarch_studio/assets/aistudio/Unknown_11_7796abba.jpeg",
		preset: {
			sceneId: "eco_atrium",
			palette: "cyan_blueprint",
			droneLandscape: "ocean_wellness",
			towerHeightMultiplier: .95,
			explodedViewFactor: .45,
			wireframeOverlay: false,
			perspectiveFovDeg: 55
		}
	},
	{
		id: "ref-golden-grid",
		title: "Złota Siatka Perspektywiczna 3D",
		category: "Grid in Architecture",
		src: "/apps/holoarch_studio/assets/aistudio/IMG_1821_419a0ff6.PNG",
		preset: {
			sceneId: "skyline_financial",
			palette: "amber_gold",
			droneLandscape: "cosmic_orbital",
			towerHeightMultiplier: 1.45,
			explodedViewFactor: .15,
			wireframeOverlay: true,
			perspectiveFovDeg: 74
		}
	},
	{
		id: "ref-multiverse-blueprint",
		title: "Błękitny Blueprint Kwantowy",
		category: "Głęboka Paralaksa",
		src: "/apps/holoarch_studio/assets/aistudio/IMG_1820_c84a58a0.PNG",
		preset: {
			sceneId: "skyline_financial",
			palette: "cyan_blueprint",
			droneLandscape: "cosmic_orbital",
			towerHeightMultiplier: 1.5,
			explodedViewFactor: .55,
			wireframeOverlay: true,
			perspectiveFovDeg: 72
		}
	},
	{
		id: "ref-emerald-cube-matrix",
		title: "Szmaragdowa Kostka Modułowa",
		category: "Modelarstwo / Kitbash 3D",
		src: "/apps/holoarch_studio/assets/aistudio/IMG_1814_964ef07f.jpg",
		preset: {
			sceneId: "eco_atrium",
			palette: "emerald_matrix",
			droneLandscape: "cosmic_orbital",
			towerHeightMultiplier: 1.25,
			explodedViewFactor: .65,
			wireframeOverlay: false,
			perspectiveFovDeg: 64
		}
	},
	{
		id: "ref-node-cluster",
		title: "Sieć Modułów Centralnego Rdzenia",
		category: "Topologia Układu 3D",
		src: "/apps/holoarch_studio/assets/aistudio/IMG_1813_1fda0aa6.jpg",
		preset: {
			sceneId: "aero_hub",
			palette: "cyan_blueprint",
			droneLandscape: "metropolis_dawn",
			towerHeightMultiplier: 1.1,
			explodedViewFactor: .5,
			wireframeOverlay: false,
			perspectiveFovDeg: 68
		}
	},
	{
		id: "ref-50-rise-tower",
		title: "50 Rise Tower — Żyletkowa Iglica",
		category: "Wieżowiec o ZmiennejZbieżności",
		src: "/apps/holoarch_studio/assets/aistudio/50_Rise_Tower_66976ad1.jpeg",
		preset: {
			sceneId: "skyline_financial",
			palette: "amber_gold",
			droneLandscape: "alpine_peaks",
			towerHeightMultiplier: 1.65,
			explodedViewFactor: 0,
			wireframeOverlay: false,
			perspectiveFovDeg: 66
		}
	},
	{
		id: "ref-twisted-tower",
		title: "Wieża Skrętna Parametric Twist",
		category: "Geometria Żyroskopowa",
		src: "/apps/holoarch_studio/assets/aistudio/Unknown_18_dd448f4a.jpeg",
		preset: {
			sceneId: "skyline_financial",
			palette: "platinum_arch",
			droneLandscape: "alpine_peaks",
			towerHeightMultiplier: 1.6,
			explodedViewFactor: .2,
			wireframeOverlay: false,
			perspectiveFovDeg: 70
		}
	},
	{
		id: "ref-nyc-torch",
		title: "The Torch NYC (325m Diagrid)",
		category: "Konstrukcja Diagrid",
		src: "/apps/holoarch_studio/assets/aistudio/NEW_YORK___The_Torch_-_740_8th_Avenue___325m___1067ft___.._dad21242.jpeg",
		preset: {
			sceneId: "skyline_financial",
			palette: "platinum_arch",
			droneLandscape: "metropolis_dawn",
			towerHeightMultiplier: 1.5,
			explodedViewFactor: .25,
			wireframeOverlay: true,
			perspectiveFovDeg: 60
		}
	},
	{
		id: "ref-tashkent-city",
		title: "Tashkent City — Kompleks Wież",
		category: "Kompozycja Wielobryłowa",
		src: "/apps/holoarch_studio/assets/aistudio/Tashkent_City__Uzbekistan_5fa897cb.jpeg",
		preset: {
			sceneId: "skyline_financial",
			palette: "cyan_blueprint",
			droneLandscape: "alpine_peaks",
			towerHeightMultiplier: 1.35,
			explodedViewFactor: .1,
			wireframeOverlay: false,
			perspectiveFovDeg: 65
		}
	},
	{
		id: "ref-wellness-ocean",
		title: "Next Generation Wellness Horizon",
		category: "Space to Luksus — Ocean",
		src: "/apps/holoarch_studio/assets/aistudio/Unknown_10_9f8953aa.jpeg",
		preset: {
			sceneId: "eco_atrium",
			palette: "platinum_arch",
			droneLandscape: "ocean_wellness",
			towerHeightMultiplier: .9,
			explodedViewFactor: .3,
			wireframeOverlay: false,
			perspectiveFovDeg: 75
		}
	},
	{
		id: "ref-futuristic-aero",
		title: "Aero-Metropolia i Korytarze Dronów",
		category: "Wirtualny Lot Dronem",
		src: "/apps/holoarch_studio/assets/aistudio/Unknown_15_711a6bf4.jpeg",
		preset: {
			sceneId: "aero_hub",
			palette: "cyan_blueprint",
			droneLandscape: "metropolis_dawn",
			towerHeightMultiplier: 1.3,
			explodedViewFactor: .15,
			wireframeOverlay: false,
			perspectiveFovDeg: 78
		}
	},
	{
		id: "ref-courtyard-campus",
		title: "Dziedziniec Biurowy z Tarasami",
		category: "Perspektywa z Lotu Ptaka",
		src: "/apps/holoarch_studio/assets/aistudio/Unknown_17_77d8920d.jpeg",
		preset: {
			sceneId: "eco_atrium",
			palette: "emerald_matrix",
			droneLandscape: "alpine_peaks",
			towerHeightMultiplier: 1.15,
			explodedViewFactor: 0,
			wireframeOverlay: false,
			perspectiveFovDeg: 68
		}
	},
	{
		id: "ref-green-podium",
		title: "Wieżowiec z Zielonym Podium",
		category: "Warstwy Kondygnacji",
		src: "/apps/holoarch_studio/assets/aistudio/Unknown_16_c3a65e84.jpeg",
		preset: {
			sceneId: "skyline_financial",
			palette: "emerald_matrix",
			droneLandscape: "alpine_peaks",
			towerHeightMultiplier: 1.4,
			explodedViewFactor: .35,
			wireframeOverlay: false,
			perspectiveFovDeg: 62
		}
	},
	{
		id: "ref-white-massing",
		title: "Makieta Urbanistyczna (Massing)",
		category: "Planowanie Kompozycji",
		src: "/apps/holoarch_studio/assets/aistudio/Unknown_13_e4f01b9d.jpeg",
		preset: {
			sceneId: "skyline_financial",
			palette: "platinum_arch",
			droneLandscape: "executive_boardroom",
			towerHeightMultiplier: 1.25,
			explodedViewFactor: .2,
			wireframeOverlay: true,
			perspectiveFovDeg: 52
		}
	}
];
const TOTAL_LED_BARS = 24;
export const LuxurySpatialDeck = ({ config, onUpdateConfig, onUpdatePalette, onNotify }) => {
	const [dialTarget, setDialTarget] = useState("scale_size");
	const [activePadIndex, setActivePadIndex] = useState(0);
	const [lastDetentFlash, setLastDetentFlash] = useState(false);
	const [resistanceTension, setResistanceTension] = useState(0);
	const [scratchAngle, setScratchAngle] = useState(config.modelRotationY || 25);
	const [isScratching, setIsScratching] = useState(false);
	const [gyroAnimPhase, setGyroAnimPhase] = useState(0);
	const dialRef = useRef(null);
	const scratchRef = useRef(null);
	const isDraggingDialRef = useRef(false);
	const dragAccumRef = useRef(0);
	const lastYRef = useRef(0);
	const lastScratchAngleRef = useRef(0);
	// Continuous smooth 3-axis gyroscope animation loop
	useEffect(() => {
		let rafId = 0;
		const tick = (now) => {
			setGyroAnimPhase(now * .0012);
			rafId = requestAnimationFrame(tick);
		};
		rafId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId);
	}, []);
	// Normalize current dial target value to 0..24 discrete safe-lock detent steps
	const getNormalizedStep = () => {
		if (dialTarget === "scale_size") {
			const norm = (config.modelScale - .4) / (2.2 - .4);
			return Math.round(Math.max(0, Math.min(1, norm)) * TOTAL_LED_BARS);
		}
		if (dialTarget === "levels_exploded") {
			return Math.round(Math.max(0, Math.min(1, config.explodedViewFactor)) * TOTAL_LED_BARS);
		}
		if (dialTarget === "perspective_fov") {
			const fov = config.perspectiveFovDeg || 60;
			const norm = (fov - 28) / (85 - 28);
			return Math.round(Math.max(0, Math.min(1, norm)) * TOTAL_LED_BARS);
		}
		const alt = config.droneAltitudeM || 650;
		const norm = (alt - 120) / (2400 - 120);
		return Math.round(Math.max(0, Math.min(1, norm)) * TOTAL_LED_BARS);
	};
	const currentStep = getNormalizedStep();
	const applyStepValue = (nextStep) => {
		const clamped = Math.max(0, Math.min(TOTAL_LED_BARS, nextStep));
		if (clamped === currentStep) return;
		const isMajor = clamped % 4 === 0;
		playSafeLockDetentClick(clamped, TOTAL_LED_BARS, config.safeClickSoundEnabled !== false, isMajor);
		setLastDetentFlash(true);
		window.setTimeout(() => setLastDetentFlash(false), 140);
		const ratio = clamped / TOTAL_LED_BARS;
		if (dialTarget === "scale_size") {
			const val = Number((.4 + ratio * (2.2 - .4)).toFixed(2));
			onUpdateConfig({ modelScale: val });
		} else if (dialTarget === "levels_exploded") {
			const val = Number(ratio.toFixed(2));
			onUpdateConfig({ explodedViewFactor: val });
		} else if (dialTarget === "perspective_fov") {
			const val = Math.round(28 + ratio * (85 - 28));
			onUpdateConfig({ perspectiveFovDeg: val });
		} else {
			const val = Math.round(120 + ratio * (2400 - 120));
			onUpdateConfig({ droneAltitudeM: val });
		}
	};
	// Safe-lock rotary dial pointer handlers with mechanical resistance threshold ("wrażenie oporu i przeskoku")
	const handleDialPointerDown = (e) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		isDraggingDialRef.current = true;
		lastYRef.current = e.clientY;
		dragAccumRef.current = 0;
	};
	const handleDialPointerMove = (e) => {
		if (!isDraggingDialRef.current) return;
		const dy = lastYRef.current - e.clientY;
		lastYRef.current = e.clientY;
		// Build mechanical resistance tension before snapping to next safe notch (18px threshold)
		dragAccumRef.current += dy;
		const DETENT_RESISTANCE_PX = 16;
		const tension = Math.max(-1, Math.min(1, dragAccumRef.current / DETENT_RESISTANCE_PX));
		setResistanceTension(tension);
		if (Math.abs(dragAccumRef.current) >= DETENT_RESISTANCE_PX) {
			const deltaSteps = Math.trunc(dragAccumRef.current / DETENT_RESISTANCE_PX);
			dragAccumRef.current -= deltaSteps * DETENT_RESISTANCE_PX;
			setResistanceTension(0);
			applyStepValue(currentStep + deltaSteps);
		}
	};
	const handleDialPointerUp = () => {
		isDraggingDialRef.current = false;
		dragAccumRef.current = 0;
		setResistanceTension(0);
	};
	// Right-side DJ Scratch / Jog Platter handlers
	const computeAngleFromCenter = (clientX, clientY, el) => {
		const rect = el.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
	};
	const handleScratchPointerDown = (e) => {
		if (!scratchRef.current) return;
		e.currentTarget.setPointerCapture(e.pointerId);
		setIsScratching(true);
		lastScratchAngleRef.current = computeAngleFromCenter(e.clientX, e.clientY, scratchRef.current);
	};
	const handleScratchPointerMove = (e) => {
		if (!isScratching || !scratchRef.current) return;
		const angle = computeAngleFromCenter(e.clientX, e.clientY, scratchRef.current);
		let delta = angle - lastScratchAngleRef.current;
		if (delta > 180) delta -= 360;
		if (delta < -180) delta += 360;
		lastScratchAngleRef.current = angle;
		if (Math.abs(delta) > 1.2) {
			const nextRot = (scratchAngle + delta * 1.15 + 360) % 360;
			setScratchAngle(nextRot);
			playScratchJogPulse(delta, config.safeClickSoundEnabled !== false);
			// Update 3D model rotation + subtle gyroscope roll/pitch bank
			onUpdateConfig({
				modelRotationY: Math.round(nextRot),
				autoRotate: false,
				gyroRollDeg: Math.max(-35, Math.min(35, Math.round(delta * 1.8)))
			});
		}
	};
	const handleScratchPointerUp = () => {
		setIsScratching(false);
		onUpdateConfig({ gyroRollDeg: 0 });
	};
	// 16 Tactile Studio / MPC Pads Definition (4x4 Matrix on the Left Glass Panel)
	const tactilePads = [
		{
			id: 1,
			code: "PAD 01",
			label: "Szeroki Kąt 76°",
			sub: "Perspektywa Wide",
			accent: "cyan",
			onTrigger: () => {
				onUpdateConfig({
					perspectiveFovDeg: 76,
					workspaceMarginPx: 28
				});
				onNotify("Ustawiono szeroką perspektywę 76° z zachowaniem marginesu kadru 28px");
			}
		},
		{
			id: 2,
			code: "PAD 02",
			label: "Teleobiektyw 36°",
			sub: "Izometria Arch.",
			accent: "cyan",
			onTrigger: () => {
				onUpdateConfig({
					perspectiveFovDeg: 36,
					workspaceMarginPx: 32
				});
				onNotify("Ustawiono długą ogniskową 36° (kompresja perspektywy architektonicznej)");
			}
		},
		{
			id: 3,
			code: "PAD 03",
			label: "Złoty Podział",
			sub: "Kompozycja Phi",
			accent: "amber",
			onTrigger: () => {
				onUpdateConfig({ compositionGrid: "golden_ratio" });
				onNotify("Włączono linie kompozycyjne Złotego Podziału (Golden Ratio 1:1.618)");
			}
		},
		{
			id: 4,
			code: "PAD 04",
			label: "Promienie Zbiegu",
			sub: "Punkt Perspektywy",
			accent: "amber",
			onTrigger: () => {
				onUpdateConfig({ compositionGrid: "perspective_rays" });
				onNotify("Włączono promienie punktów zbiegu perspektywy i linii horyzontu");
			}
		},
		{
			id: 5,
			code: "PAD 05",
			label: "Plany Głębi Z",
			sub: "1 / 2 / 3 Plan",
			accent: "cyan",
			onTrigger: () => {
				onUpdateConfig({
					compositionGrid: "depth_planes",
					depthOfFieldIntensity: .85
				});
				onNotify("Aktywowano podział przestrzeni na 3 plany głębi ostrości (DOF)");
			}
		},
		{
			id: 6,
			code: "PAD 06",
			label: "Margines Luksus",
			sub: "Ramka 42px",
			accent: "emerald",
			onTrigger: () => {
				const nextMargin = (config.workspaceMarginPx || 24) >= 40 ? 18 : 42;
				onUpdateConfig({ workspaceMarginPx: nextMargin });
				onNotify(`Margines ograniczonej przestrzeni głębokiej paralaksy: ${nextMargin}px`);
			}
		},
		{
			id: 7,
			code: "PAD 07",
			label: "Lot: Góry Alpy",
			sub: "Krajobraz Drona",
			accent: "emerald",
			onTrigger: () => {
				onUpdateConfig({
					droneLandscape: "alpine_peaks",
					droneFlightActive: true,
					droneAltitudeM: 1450
				});
				onNotify("Wirtualny lot dronem: Szczyty Alpejskie (1450 m n.p.m.) — „Space to Luksus”");
			}
		},
		{
			id: 8,
			code: "PAD 08",
			label: "Lot: Kosmos",
			sub: "Orbita & Mgławica",
			accent: "violet",
			onTrigger: () => {
				onUpdateConfig({
					droneLandscape: "cosmic_orbital",
					droneFlightActive: true,
					droneAltitudeM: 2400
				});
				onNotify("Wirtualny lot dronem: Przestrzeń Orbitalna — „Space to Luksus”");
			}
		},
		{
			id: 9,
			code: "PAD 09",
			label: "Lot: Metropolia",
			sub: "Korytarz Powietrzny",
			accent: "cyan",
			onTrigger: () => {
				onUpdateConfig({
					droneLandscape: "metropolis_dawn",
					droneFlightActive: true,
					droneAltitudeM: 520
				});
				onNotify("Wirtualny lot dronem: Korytarz powietrzny nad futurystyczną metropolią");
			}
		},
		{
			id: 10,
			code: "PAD 10",
			label: "Lot: Ocean Zen",
			sub: "Horyzont Wellness",
			accent: "emerald",
			onTrigger: () => {
				onUpdateConfig({
					droneLandscape: "ocean_wellness",
					droneFlightActive: true,
					droneAltitudeM: 220
				});
				onNotify("Wirtualny lot dronem: Spokojny oceaniczny horyzont do relaksu i modelarstwa");
			}
		},
		{
			id: 11,
			code: "PAD 11",
			label: "Klej Moduł +1",
			sub: "Hobby: Składanie",
			accent: "amber",
			onTrigger: () => {
				const current = config.hobbyAssemblyStep || 12;
				const next = current >= 12 ? 1 : current + 1;
				onUpdateConfig({
					hobbyAssemblyStep: next,
					hobbyBlueprintConnectors: true
				});
				onNotify(`Warsztat modelarski: Przyklejono sekcję konstrukcyjną ${next} z 12`);
			}
		},
		{
			id: 12,
			code: "PAD 12",
			label: "Rozłóż Zestaw",
			sub: "Widok Części CAD",
			accent: "amber",
			onTrigger: () => {
				const nextExp = config.explodedViewFactor > .4 ? 0 : .72;
				onUpdateConfig({
					explodedViewFactor: nextExp,
					hobbyBlueprintConnectors: true
				});
				onNotify(nextExp > 0 ? "Rozłożono model na części pierwsze (widok instrukcji sklejania 3D)" : "Złożono wszystkie podzespoły modelu w jednolitą bryłę");
			}
		},
		{
			id: 13,
			code: "PAD 13",
			label: "Łączniki Kleju",
			sub: "Wektory Montażu",
			accent: "cyan",
			onTrigger: () => {
				onUpdateConfig({ hobbyBlueprintConnectors: !config.hobbyBlueprintConnectors });
				onNotify(!config.hobbyBlueprintConnectors ? "Włączono linie prowadzące i punkty klejenia modułów 3D" : "Ukryto pomocnicze wektory montażowe");
			}
		},
		{
			id: 14,
			code: "PAD 14",
			label: "Siatka Złota 3D",
			sub: "Styl Wireframe",
			accent: "amber",
			onTrigger: () => {
				onUpdatePalette("amber_gold");
				onUpdateConfig({ wireframeOverlay: !config.wireframeOverlay });
				onNotify("Przełączono złotą siatkę architektoniczną (Grid in Architecture)");
			}
		},
		{
			id: 15,
			code: "PAD 15",
			label: "Kalibruj Żyro",
			sub: "Poziom 0.0°",
			accent: "emerald",
			onTrigger: () => {
				onUpdateConfig({
					gyroPitchDeg: 0,
					gyroRollDeg: 0,
					horizonOffsetY: 0,
					modelRotationY: 30
				});
				onNotify("Żyroskop 3-osiowy wyzerowany do idealnego poziomu horyzontu 0.0°");
			}
		},
		{
			id: 16,
			code: "PAD 16",
			label: "Klik Sejfowy",
			sub: config.safeClickSoundEnabled !== false ? "Dźwięk AKTYWNY" : "Wyciszono",
			accent: "violet",
			onTrigger: () => {
				const nextSound = config.safeClickSoundEnabled === false;
				onUpdateConfig({ safeClickSoundEnabled: nextSound });
				onNotify(nextSound ? "Aktywowano mechaniczny dźwięk zapadek sejfu na pokrętle i padach" : "Wyciszono dźwięk zapadek sejfu");
			}
		}
	];
	// Dial rotation angle (-135deg to +135deg) + subtle spring resistance offset
	const dialAngleDeg = -135 + currentStep / TOTAL_LED_BARS * 270 + resistanceTension * 6.5;
	const formattedDialValue = () => {
		if (dialTarget === "scale_size") return `${config.modelScale.toFixed(2)}×`;
		if (dialTarget === "levels_exploded") return `${Math.round(config.explodedViewFactor * 100)}%`;
		if (dialTarget === "perspective_fov") return `${config.perspectiveFovDeg || 60}° FOV`;
		return `${config.droneAltitudeM || 650} m`;
	};
	// Live animated gyroscope angles
	const livePitch = (config.gyroPitchDeg || 0) + (config.droneFlightActive ? Math.sin(gyroAnimPhase * 1.4) * 8 : Math.sin(gyroAnimPhase * .5) * 2);
	const liveRoll = (config.gyroRollDeg || 0) + (config.droneFlightActive ? Math.cos(gyroAnimPhase * 1.1) * 11 : Math.cos(gyroAnimPhase * .4) * 2);
	const liveYaw = (config.modelRotationY + (config.droneFlightActive ? gyroAnimPhase * 18 : 0)) % 360;
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ _jsxDEV("div", {
			className: "relative rounded-2xl bg-slate-950/65 backdrop-blur-xl border border-white/15 shadow-2xl p-4 sm:p-5 overflow-hidden",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent",
					"aria-hidden": "true"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 700,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-white/10",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-0.5",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 text-xs text-cyan-300 font-mono tabular-nums",
							children: [
								/* @__PURE__ */ _jsxDEV("span", { children: "SPACE TO LUKSUS" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 709,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									"aria-hidden": "true",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 710,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("span", { children: "SZKLANA KONSOLA KOMPOZYCJI, PERSPEKTYWY I LOTU DRONEM" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 711,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									"aria-hidden": "true",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 712,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("span", { children: "TRYB HOBBY / MODELARSTWO 3D" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 713,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 708,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("h3", {
							className: "text-sm sm:text-base font-semibold text-white",
							children: "Szklany Panel Sterowania: 24 Diody LED Stopni · 16 Przycisków Warsztatowych · Masywne Pokrętło Sejfowe · Scratch Platter i Żyroskop"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 715,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 707,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => onUpdateConfig({ safeClickSoundEnabled: config.safeClickSoundEnabled === false }),
							className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${config.safeClickSoundEnabled !== false ? "bg-cyan-500/15 border-cyan-400/50 text-cyan-200" : "bg-slate-900/70 border-white/10 text-slate-400"}`,
							children: [config.safeClickSoundEnabled !== false ? /* @__PURE__ */ _jsxDEV(Volume2, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 735,
								columnNumber: 17
							}, this) : /* @__PURE__ */ _jsxDEV(VolumeX, { className: "w-3.5 h-3.5 text-slate-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 737,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: ["Klik Sejfowy: ", config.safeClickSoundEnabled !== false ? "WŁ." : "WYŁ."] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 739,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 721,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => onUpdateConfig({ droneFlightActive: !config.droneFlightActive }),
							className: `flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${config.droneFlightActive ? "bg-emerald-500/20 border-emerald-400/60 text-emerald-200" : "bg-slate-900/70 border-white/10 text-slate-300"}`,
							children: [/* @__PURE__ */ _jsxDEV(Mountain, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 757,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: ["Lot Dronem: ", config.droneFlightActive ? "W LOCIE" : "PAUZA"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 758,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 744,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 720,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 706,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "xl:col-span-5 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex gap-3.5",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-col items-center justify-between py-1 px-2 rounded-lg bg-slate-950/90 border border-white/10 shrink-0 w-14",
								children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-[9px] font-mono text-cyan-300 tracking-wider uppercase",
										children: [
											"LED ",
											currentStep,
											"/",
											TOTAL_LED_BARS
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 771,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex flex-col-reverse gap-1 my-1.5 w-full",
										children: Array.from({ length: TOTAL_LED_BARS }).map((_, idx) => {
											const stepNum = idx + 1;
											const isLit = stepNum <= currentStep;
											const isTopPeak = stepNum === currentStep;
											const barColor = stepNum > 20 ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.85)]" : stepNum > 14 ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]";
											return /* @__PURE__ */ _jsxDEV("button", {
												type: "button",
												onClick: () => applyStepValue(stepNum),
												title: `Ustaw stopień ${stepNum}/${TOTAL_LED_BARS}`,
												className: "group w-full py-0.5 flex items-center justify-center focus:outline-none",
												children: /* @__PURE__ */ _jsxDEV("span", { className: `block w-full transition-all duration-75 rounded-full ${isTopPeak && lastDetentFlash ? "h-[4px] bg-white shadow-[0_0_12px_#ffffff]" : isLit ? `h-[3px] ${barColor}` : "h-[2px] bg-slate-800 group-hover:bg-slate-600"}` }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 795,
													columnNumber: 23
												}, this)
											}, stepNum, false, {
												fileName: _jsxFileName,
												lineNumber: 788,
												columnNumber: 21
											}, this);
										})
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 775,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-[9px] font-mono text-slate-400 tabular-nums",
										children: "STOPNIE"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 809,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 770,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "flex-1 flex flex-col justify-between space-y-2.5",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "font-semibold text-slate-200 flex items-center gap-1.5",
										children: [/* @__PURE__ */ _jsxDEV(Grid, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 818,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Panel 16 Przycisków Warsztatowych i Perspektywy" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 819,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 817,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-[11px] text-slate-400 tabular-nums",
										children: "4×4 PAD MATRIX"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 821,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 816,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-1.5",
									children: tactilePads.map((pad, idx) => {
										const isSelected = activePadIndex === idx;
										const borderAccent = pad.accent === "amber" ? "hover:border-amber-400/70" : pad.accent === "emerald" ? "hover:border-emerald-400/70" : pad.accent === "violet" ? "hover:border-violet-400/70" : "hover:border-cyan-400/70";
										return /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => {
												setActivePadIndex(idx);
												playSafeLockDetentClick(idx + 4, 16, config.safeClickSoundEnabled !== false, true);
												pad.onTrigger();
											},
											className: `group relative text-left p-2 rounded-lg border transition-all active:scale-95 ${borderAccent} ${isSelected ? "bg-cyan-500/20 border-cyan-400 shadow-[inset_0_0_12px_rgba(34,211,238,0.25)]" : "bg-slate-900/75 border-white/10 hover:bg-slate-900"}`,
											children: [
												/* @__PURE__ */ _jsxDEV("div", {
													className: "flex items-center justify-between text-[9px] font-mono text-slate-400",
													children: [/* @__PURE__ */ _jsxDEV("span", { children: pad.code }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 859,
														columnNumber: 25
													}, this), /* @__PURE__ */ _jsxDEV("span", { className: `w-2 h-1 rounded-full ${isSelected ? "bg-cyan-300" : "bg-slate-700 group-hover:bg-slate-500"}` }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 860,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 858,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ _jsxDEV("div", {
													className: "text-[11px] font-semibold text-white truncate mt-0.5",
													children: pad.label
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 866,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ _jsxDEV("div", {
													className: "text-[10px] text-slate-400 truncate",
													children: pad.sub
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 869,
													columnNumber: 23
												}, this)
											]
										}, pad.id, true, {
											fileName: _jsxFileName,
											lineNumber: 839,
											columnNumber: 21
										}, this);
									})
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 826,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 815,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 768,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "xl:col-span-4 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col justify-between items-center text-center",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "w-full flex items-center justify-between text-xs mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "font-semibold text-white flex items-center gap-1.5",
										children: [/* @__PURE__ */ _jsxDEV(Sliders, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 881,
											columnNumber: 17
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Masywne Pokrętło Poziomów i Wielkości" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 882,
											columnNumber: 17
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 880,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-[11px] text-amber-300 tabular-nums",
										children: "OPÓR SEJFOWY 24-ST."
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 884,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 879,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-2 sm:grid-cols-4 gap-1 w-full bg-slate-950/80 p-1 rounded-lg border border-white/10 text-[11px] mb-3",
									children: [
										{
											id: "scale_size",
											label: "Wielkość"
										},
										{
											id: "levels_exploded",
											label: "Poziomy"
										},
										{
											id: "perspective_fov",
											label: "Perspektywa"
										},
										{
											id: "drone_altitude",
											label: "Pułap Drona"
										}
									].map((t) => /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => {
											setDialTarget(t.id);
											playSafeLockDetentClick(12, 24, config.safeClickSoundEnabled !== false, false);
										},
										className: `py-1 px-1.5 rounded font-medium transition-colors truncate ${dialTarget === t.id ? "bg-amber-400 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
										children: t.label
									}, t.id, false, {
										fileName: _jsxFileName,
										lineNumber: 897,
										columnNumber: 17
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 890,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "relative flex items-center justify-center my-1",
									children: [/* @__PURE__ */ _jsxDEV("svg", {
										className: "w-48 h-48 -rotate-90 pointer-events-none",
										viewBox: "0 0 180 180",
										children: Array.from({ length: TOTAL_LED_BARS + 1 }).map((_, i) => {
											const ratio = i / TOTAL_LED_BARS;
											const deg = -135 + ratio * 270;
											const rad = deg * Math.PI / 180;
											const rInner = i % 4 === 0 ? 74 : 77;
											const rOuter = 84;
											const x1 = 90 + Math.cos(rad) * rInner;
											const y1 = 90 + Math.sin(rad) * rInner;
											const x2 = 90 + Math.cos(rad) * rOuter;
											const y2 = 90 + Math.sin(rad) * rOuter;
											const isActive = i <= currentStep;
											return /* @__PURE__ */ _jsxDEV("line", {
												x1,
												y1,
												x2,
												y2,
												stroke: isActive ? "#38BDF8" : "#334155",
												strokeWidth: i % 4 === 0 ? 2.5 : 1.5,
												strokeLinecap: "round"
											}, i, false, {
												fileName: _jsxFileName,
												lineNumber: 931,
												columnNumber: 21
											}, this);
										})
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 918,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										ref: dialRef,
										onPointerDown: handleDialPointerDown,
										onPointerMove: handleDialPointerMove,
										onPointerUp: handleDialPointerUp,
										onPointerCancel: handleDialPointerUp,
										onWheel: (e) => {
											e.preventDefault();
											applyStepValue(currentStep + (e.deltaY < 0 ? 1 : -1));
										},
										title: "Przeciągnij w górę/dół lub użyj kółka myszy — wyczuwalny opór i przeskok zapadki sejfu",
										className: `absolute w-34 h-34 rounded-full cursor-ns-resize select-none flex flex-col items-center justify-center border-2 transition-shadow ${lastDetentFlash ? "border-cyan-300 shadow-[0_0_28px_rgba(34,211,238,0.55),inset_0_2px_12px_rgba(255,255,255,0.35)]" : "border-slate-600/90 shadow-[0_12px_30px_rgba(0,0,0,0.85),inset_0_2px_10px_rgba(255,255,255,0.18)]"}`,
										style: { background: "radial-gradient(circle at 32% 28%, #1e293b 0%, #0f172a 55%, #020617 100%)" },
										children: [
											/* @__PURE__ */ _jsxDEV("div", {
												className: "absolute inset-1.5 rounded-full border border-dashed border-white/15 pointer-events-none",
												style: {
													transform: `rotate(${dialAngleDeg}deg)`,
													transition: isDraggingDialRef.current ? "transform 45ms cubic-bezier(0.22, 1, 0.36, 1)" : "transform 140ms cubic-bezier(0.34, 1.56, 0.64, 1)"
												},
												children: /* @__PURE__ */ _jsxDEV("div", { className: "w-2.5 h-5 bg-amber-400 rounded-full mx-auto -mt-1 shadow-[0_0_10px_#f59e0b]" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 977,
													columnNumber: 19
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 968,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("span", {
												className: "text-[10px] font-mono uppercase tracking-wider text-slate-400",
												children: [
													"STOP. ",
													currentStep,
													"/",
													TOTAL_LED_BARS
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 981,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("span", {
												className: "text-base font-bold font-mono text-white tabular-nums mt-0.5",
												children: formattedDialValue()
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 984,
												columnNumber: 17
											}, this),
											/* @__PURE__ */ _jsxDEV("span", {
												className: "text-[9px] font-mono text-cyan-300 mt-0.5",
												children: Math.abs(resistanceTension) > .15 ? "OPÓR ZAPADKI..." : "KLIK SEJFOWY"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 987,
												columnNumber: 17
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 946,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 916,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between w-full gap-2 pt-2",
									children: [/* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => applyStepValue(currentStep - 1),
										className: "flex-1 py-1.5 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-xs font-mono text-slate-200 transition-colors",
										children: "−1 Stopień (Klik)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 995,
										columnNumber: 15
									}, this), /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => applyStepValue(currentStep + 1),
										className: "flex-1 py-1.5 px-3 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-white/10 text-xs font-mono text-cyan-300 transition-colors",
										children: "+1 Stopień (Klik)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1002,
										columnNumber: 15
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 994,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 878,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "xl:col-span-3 bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-xl p-3.5 flex flex-col justify-between space-y-3",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "font-semibold text-white flex items-center gap-1.5",
										children: [/* @__PURE__ */ _jsxDEV(Disc, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1018,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Tarcza Scratch / Jog 360°" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1019,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1017,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-[11px] text-cyan-300 tabular-nums",
										children: [Math.round(scratchAngle), "° YAW"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1021,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1016,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										ref: scratchRef,
										onPointerDown: handleScratchPointerDown,
										onPointerMove: handleScratchPointerMove,
										onPointerUp: handleScratchPointerUp,
										onPointerCancel: handleScratchPointerUp,
										title: "Obracaj tarczę jak w konsolecie DJ (Scratching obrotu bryły 3D i lotu drona)",
										className: "relative w-24 h-24 rounded-full cursor-grab active:cursor-grabbing select-none shrink-0 border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center justify-center",
										style: {
											background: "repeating-radial-gradient(circle at center, #090d16 0px, #090d16 4px, #162032 5px, #090d16 6px)",
											transform: `rotate(${scratchAngle}deg)`
										},
										children: [/* @__PURE__ */ _jsxDEV("div", { className: "absolute top-1.5 left-1/2 -translate-x-1/2 w-2 h-4 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1043,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "w-7 h-7 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center",
											children: /* @__PURE__ */ _jsxDEV("span", {
												className: "text-[8px] font-mono text-amber-300",
												children: "JOG"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1045,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1044,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1028,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex-1 space-y-1.5 text-xs",
										children: [/* @__PURE__ */ _jsxDEV("p", {
											className: "text-[11px] text-slate-300 leading-snug",
											children: "Przeciągnij po tarczy, aby „scratchować” obrót makiety 3D oraz kąt nalotu drona."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1051,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between bg-slate-950/80 px-2.5 py-1.5 rounded border border-white/10 font-mono text-[11px]",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "text-slate-400",
												children: "Etap klejenia:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1055,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("span", {
												className: "text-amber-300 font-semibold tabular-nums",
												children: [config.hobbyAssemblyStep || 12, "/12"]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1056,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1054,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1050,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1026,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1015,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "pt-2.5 border-t border-white/10 space-y-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between text-xs",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "font-semibold text-white flex items-center gap-1.5",
										children: [/* @__PURE__ */ _jsxDEV(Compass, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1068,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Animowany Żyroskop 3D" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1069,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1067,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-[10px] text-emerald-300 tabular-nums",
										children: [
											"P:",
											livePitch.toFixed(1),
											"° R:",
											liveRoll.toFixed(1),
											"°"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1071,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1066,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-3 bg-slate-950/85 border border-white/10 rounded-xl p-2.5",
									children: [/* @__PURE__ */ _jsxDEV("svg", {
										className: "w-20 h-20 shrink-0",
										viewBox: "0 0 100 100",
										children: [
											/* @__PURE__ */ _jsxDEV("circle", {
												cx: "50",
												cy: "50",
												r: "46",
												fill: "none",
												stroke: "rgba(148,163,184,0.25)",
												strokeWidth: "1.5"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1080,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("g", {
												style: {
													transform: `rotate(${liveYaw}deg)`,
													transformOrigin: "50px 50px"
												},
												children: /* @__PURE__ */ _jsxDEV("circle", {
													cx: "50",
													cy: "50",
													r: "39",
													fill: "none",
													stroke: "#38BDF8",
													strokeWidth: "1.8",
													strokeDasharray: "14 6"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1095,
													columnNumber: 21
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1089,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("g", {
												style: {
													transform: `rotate(${liveRoll * 2.2}deg)`,
													transformOrigin: "50px 50px"
												},
												children: [/* @__PURE__ */ _jsxDEV("ellipse", {
													cx: "50",
													cy: "50",
													rx: "31",
													ry: "18",
													fill: "none",
													stroke: "#F59E0B",
													strokeWidth: "1.8"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1112,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("line", {
													x1: "16",
													y1: "50",
													x2: "84",
													y2: "50",
													stroke: "#10B981",
													strokeWidth: "1.5"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1121,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1106,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("g", {
												style: {
													transform: `rotate(${livePitch * 2.5}deg)`,
													transformOrigin: "50px 50px"
												},
												children: /* @__PURE__ */ _jsxDEV("ellipse", {
													cx: "50",
													cy: "50",
													rx: "15",
													ry: "29",
													fill: "none",
													stroke: "#10B981",
													strokeWidth: "1.5"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1137,
													columnNumber: 21
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1131,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("circle", {
												cx: "50",
												cy: "50",
												r: "4",
												fill: "#F8FAFC"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1148,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1078,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex-1 space-y-1 font-mono text-[10px]",
										children: [
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-slate-300",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "PITCH (Nachylenie):" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1153,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "text-emerald-400 tabular-nums",
													children: [livePitch.toFixed(1), "°"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1154,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1152,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-slate-300",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "ROLL (Przechył):" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1157,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "text-amber-400 tabular-nums",
													children: [liveRoll.toFixed(1), "°"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1158,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1156,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-slate-300",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "YAW (Azymut):" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1161,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "text-cyan-400 tabular-nums",
													children: [Math.round(liveYaw), "°"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1162,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1160,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ _jsxDEV("div", {
												className: "flex justify-between text-slate-400 pt-0.5 border-t border-white/10",
												children: [/* @__PURE__ */ _jsxDEV("span", { children: "PUŁAP DRONA:" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1165,
													columnNumber: 21
												}, this), /* @__PURE__ */ _jsxDEV("span", {
													className: "text-white tabular-nums",
													children: [config.droneAltitudeM || 650, " m"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 1166,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1164,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1151,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1076,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1065,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1013,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 766,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-3 pt-4 mt-4 border-t border-white/10 text-xs",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-lg p-2.5 space-y-1.5",
							children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "text-slate-300 font-medium flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV(Mountain, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1182,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Krajobraz Lotu Dronem:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1183,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1181,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-[10px] font-mono text-emerald-300",
									children: "Space to Luksus"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1185,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1180,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: config.droneLandscape || "alpine_peaks",
								onChange: (e) => {
									onUpdateConfig({
										droneLandscape: e.target.value,
										droneFlightActive: true
									});
									playSafeLockDetentClick(8, 24, config.safeClickSoundEnabled !== false, true);
								},
								className: "w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "alpine_peaks",
										children: "Góry Alpejskie i Przełęcze (Wysoka Głębia)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1198,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "cosmic_orbital",
										children: "Orbita Kosmiczna i Mgławica („Space to Luksus”)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1199,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "metropolis_dawn",
										children: "Futurystyczna Metropolia o Świcie"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1200,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "ocean_wellness",
										children: "Oceaniczny Horyzont Wellness (Zen)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1201,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "executive_boardroom",
										children: "Klasyczny Stół Konferencyjny AR"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1202,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1187,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1179,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-lg p-2.5 space-y-1.5",
							children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "text-slate-300 font-medium flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV(Eye, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1210,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Planowanie Kompozycji i Głębi:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1211,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1209,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-[10px] font-mono text-cyan-300",
									children: [
										"FOV ",
										config.perspectiveFovDeg || 60,
										"°"
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1213,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1208,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: config.compositionGrid || "golden_ratio",
								onChange: (e) => {
									onUpdateConfig({ compositionGrid: e.target.value });
									playSafeLockDetentClick(10, 24, config.safeClickSoundEnabled !== false, true);
								},
								className: "w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "golden_ratio",
										children: "Siatka Złotego Podziału + Margines Passe-Partout"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1227,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "perspective_rays",
										children: "Linie Zbiegu Perspektywy i Horyzontu"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1228,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "depth_planes",
										children: "Plany Głębi Ostrości (1. Plan / Środek / Tło)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1229,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "rule_of_thirds",
										children: "Klasyczny Trójpodział Kadru (Rule of Thirds)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1230,
										columnNumber: 15
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "none",
										children: "Tylko Margines Roboczy (Bez linii pomocniczych)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1231,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1217,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1207,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-lg p-2.5 space-y-1.5",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between text-slate-300 font-medium",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV(Wrench, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1239,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Sklejanie Modelu (Etapy):" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1240,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1238,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-amber-300 tabular-nums",
									children: [config.hobbyAssemblyStep || 12, " / 12 części"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1242,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1237,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: 1,
								max: 12,
								step: 1,
								value: config.hobbyAssemblyStep || 12,
								onChange: (e) => {
									const step = parseInt(e.target.value, 10);
									playSafeLockDetentClick(step * 2, 24, config.safeClickSoundEnabled !== false);
									onUpdateConfig({
										hobbyAssemblyStep: step,
										hobbyBlueprintConnectors: true
									});
								},
								className: "w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg mt-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1246,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1236,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-slate-900/60 border border-white/10 rounded-lg p-2.5 space-y-1.5",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center justify-between text-slate-300 font-medium",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsxDEV(Maximize2, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1268,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Margines Ramy Paralaksy:" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1269,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1267,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-cyan-300 tabular-nums",
									children: [config.workspaceMarginPx || 28, " px"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1271,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1266,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: 12,
								max: 52,
								step: 2,
								value: config.workspaceMarginPx || 28,
								onChange: (e) => {
									const m = parseInt(e.target.value, 10);
									onUpdateConfig({ workspaceMarginPx: m });
								},
								className: "w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg mt-2"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1275,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1265,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1177,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 698,
			columnNumber: 7
		}, this), /* @__PURE__ */ _jsxDEV("div", {
			className: "rounded-xl bg-slate-950/60 backdrop-blur-md border border-white/10 p-4 space-y-3",
			children: [/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1295,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("h4", {
						className: "text-xs sm:text-sm font-semibold text-white",
						children: "Twoja Biblioteka 15 Wzorców: Szklane Panele, Głęboka Perspektywa i Wieżowce (Kliknij, aby załadować na scenę 3D)"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1296,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1294,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: "text-xs font-mono text-slate-400 tabular-nums",
					children: "15 załączonych referencji wizualnych"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1300,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1293,
				columnNumber: 9
			}, this), /* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5",
				children: UPLOADED_INSPIRATION_GALLERY.map((item, idx) => /* @__PURE__ */ _jsxDEV("button", {
					type: "button",
					onClick: () => {
						playSafeLockDetentClick(idx + 1, 15, config.safeClickSoundEnabled !== false, true);
						onUpdatePalette(item.preset.palette);
						onUpdateConfig({
							sceneId: item.preset.sceneId,
							customSceneTitle: item.title,
							droneLandscape: item.preset.droneLandscape,
							droneFlightActive: true,
							towerHeightMultiplier: item.preset.towerHeightMultiplier,
							explodedViewFactor: item.preset.explodedViewFactor,
							wireframeOverlay: item.preset.wireframeOverlay,
							perspectiveFovDeg: item.preset.perspectiveFovDeg
						});
						onNotify(`Załadowano wzorzec 3D i perspektywę: ${item.title}`);
					},
					className: "group text-left rounded-lg overflow-hidden border border-white/10 hover:border-cyan-400/80 bg-slate-900/70 transition-all flex flex-col",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "relative h-20 w-full overflow-hidden bg-slate-950",
						children: [/* @__PURE__ */ _jsxDEV("img", {
							src: item.src,
							alt: item.title,
							referrerPolicy: "no-referrer",
							className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1328,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-slate-950/85 text-[9px] font-mono text-cyan-300",
							children: [item.preset.perspectiveFovDeg, "° FOV"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1334,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1327,
						columnNumber: 15
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "p-2",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "text-[11px] font-semibold text-white truncate",
							children: item.title
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1339,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "text-[10px] text-slate-400 truncate",
							children: item.category
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1340,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1338,
						columnNumber: 15
					}, this)]
				}, item.id, true, {
					fileName: _jsxFileName,
					lineNumber: 1307,
					columnNumber: 13
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1305,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 1292,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 696,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUssT0FBTztPQUNoQyxrQkFBa0IsS0FBSyxPQUFPO09BQzlCLG1CQUFtQixLQUFLLE9BQU87TUFDakMsQ0FBQztNQUNELFNBQVMsd0NBQXdDLEtBQUssT0FBTztLQUMvRDtLQUNBLFdBQVU7ZUFsQlosQ0FvQkUsd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQWYsQ0FDRSx3QkFBQyxPQUFEO09BQ0UsS0FBSyxLQUFLO09BQ1YsS0FBSyxLQUFLO09BQ1YsZ0JBQWU7T0FDZixXQUFVO01BQ1g7Ozs7Z0JBQ0Qsd0JBQUMsUUFBRDtPQUFNLFdBQVU7aUJBQWhCLENBQ0csS0FBSyxPQUFPLG1CQUFrQixPQUMzQjs7Ozs7Y0FDSDs7Ozs7ZUFDTCx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFBZixDQUNFLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFpRCxLQUFLO01BQVc7Ozs7Z0JBQ2hGLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUF1QyxLQUFLO01BQWM7Ozs7Y0FDdEU7Ozs7O2FBQ0M7T0FsQ0QsS0FBSzs7OztXQWtDSixDQUNUO0dBQ0U7Ozs7V0FDRjs7Ozs7VUFDRjs7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiTHV4dXJ5U3BhdGlhbERlY2sudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBDb21wYXNzLFxuICBEaXNjLFxuICBFeWUsXG4gIEdyaWQsXG4gIExheWVycyxcbiAgTWF4aW1pemUyLFxuICBNb3VudGFpbixcbiAgU2xpZGVycyxcbiAgU3BhcmtsZXMsXG4gIFZvbHVtZTIsXG4gIFZvbHVtZVgsXG4gIFdyZW5jaCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7XG4gIEFSQ29uZmlnU3RhdGUsXG4gIENvbXBvc2l0aW9uR3JpZE1vZGUsXG4gIERyb25lTGFuZHNjYXBlSWQsXG4gIEhvbG9ncmFtUGFsZXR0ZUlkLFxuICBNaXhlckRpYWxUYXJnZXQsXG59IGZyb20gJy4uL3R5cGVzL2FyU3R1ZGlvJztcbmltcG9ydCB7IHBsYXlTYWZlTG9ja0RldGVudENsaWNrLCBwbGF5U2NyYXRjaEpvZ1B1bHNlIH0gZnJvbSAnLi4vdXRpbHMvc291bmRFZmZlY3RzJztcblxuaW50ZXJmYWNlIEx1eHVyeVNwYXRpYWxEZWNrUHJvcHMge1xuICBjb25maWc6IEFSQ29uZmlnU3RhdGU7XG4gIG9uVXBkYXRlQ29uZmlnOiAocGFydGlhbDogUGFydGlhbDxBUkNvbmZpZ1N0YXRlPikgPT4gdm9pZDtcbiAgb25VcGRhdGVQYWxldHRlOiAocGFsZXR0ZTogSG9sb2dyYW1QYWxldHRlSWQpID0+IHZvaWQ7XG4gIG9uTm90aWZ5OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkZWRJbnNwaXJhdGlvbkl0ZW0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICBzcmM6IHN0cmluZztcbiAgcHJlc2V0OiB7XG4gICAgc2NlbmVJZDogQVJDb25maWdTdGF0ZVsnc2NlbmVJZCddO1xuICAgIHBhbGV0dGU6IEhvbG9ncmFtUGFsZXR0ZUlkO1xuICAgIGRyb25lTGFuZHNjYXBlOiBEcm9uZUxhbmRzY2FwZUlkO1xuICAgIHRvd2VySGVpZ2h0TXVsdGlwbGllcjogbnVtYmVyO1xuICAgIGV4cGxvZGVkVmlld0ZhY3RvcjogbnVtYmVyO1xuICAgIHdpcmVmcmFtZU92ZXJsYXk6IGJvb2xlYW47XG4gICAgcGVyc3BlY3RpdmVGb3ZEZWc6IG51bWJlcjtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFVQTE9BREVEX0lOU1BJUkFUSU9OX0dBTExFUlk6IFVwbG9hZGVkSW5zcGlyYXRpb25JdGVtW10gPSBbXG4gIHtcbiAgICBpZDogJ3JlZi1nbGFzcy1wYW5lbHMnLFxuICAgIHRpdGxlOiAnU3prbGFuZSBQYW5lbGUgUHJ6ZXN0cnplbm5lIFVJJyxcbiAgICBjYXRlZ29yeTogJ1RyZW5kOiBGcm9zdGVkIEdsYXNzIEhVRCcsXG4gICAgc3JjOiAnL2Fzc2V0cy9haXN0dWRpby9Vbmtub3duXzEyX2JiYTFlNmFiLmpwZWcnLFxuICAgIHByZXNldDoge1xuICAgICAgc2NlbmVJZDogJ3NreWxpbmVfZmluYW5jaWFsJyxcbiAgICAgIHBhbGV0dGU6ICdwbGF0aW51bV9hcmNoJyxcbiAgICAgIGRyb25lTGFuZHNjYXBlOiAnYWxwaW5lX3BlYWtzJyxcbiAgICAgIHRvd2VySGVpZ2h0TXVsdGlwbGllcjogMS4xNSxcbiAgICAgIGV4cGxvZGVkVmlld0ZhY3RvcjogMC4zNSxcbiAgICAgIHdpcmVmcmFtZU92ZXJsYXk6IGZhbHNlLFxuICAgICAgcGVyc3BlY3RpdmVGb3ZEZWc6IDYyLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1hY3J5bGljLWN1YmVzJyxcbiAgICB0aXRsZTogJ1DDs8WCcHJ6ZXpyb2N6eXN0ZSBCcnnFgnkgQWtyeWxvd2UnLFxuICAgIGNhdGVnb3J5OiAnTmFyesSZZHppYSBHxYLEmWJpIGkgS29tcG96eWNqaScsXG4gICAgc3JjOiAnL2Fzc2V0cy9haXN0dWRpby9Vbmtub3duXzExXzc3OTZhYmJhLmpwZWcnLFxuICAgIHByZXNldDoge1xuICAgICAgc2NlbmVJZDogJ2Vjb19hdHJpdW0nLFxuICAgICAgcGFsZXR0ZTogJ2N5YW5fYmx1ZXByaW50JyxcbiAgICAgIGRyb25lTGFuZHNjYXBlOiAnb2NlYW5fd2VsbG5lc3MnLFxuICAgICAgdG93ZXJIZWlnaHRNdWx0aXBsaWVyOiAwLjk1LFxuICAgICAgZXhwbG9kZWRWaWV3RmFjdG9yOiAwLjQ1LFxuICAgICAgd2lyZWZyYW1lT3ZlcmxheTogZmFsc2UsXG4gICAgICBwZXJzcGVjdGl2ZUZvdkRlZzogNTUsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLWdvbGRlbi1ncmlkJyxcbiAgICB0aXRsZTogJ1rFgm90YSBTaWF0a2EgUGVyc3Bla3R5d2ljem5hIDNEJyxcbiAgICBjYXRlZ29yeTogJ0dyaWQgaW4gQXJjaGl0ZWN0dXJlJyxcbiAgICBzcmM6ICcvYXNzZXRzL2Fpc3R1ZGlvL0lNR18xODIxXzQxOWEwZmY2LlBORycsXG4gICAgcHJlc2V0OiB7XG4gICAgICBzY2VuZUlkOiAnc2t5bGluZV9maW5hbmNpYWwnLFxuICAgICAgcGFsZXR0ZTogJ2FtYmVyX2dvbGQnLFxuICAgICAgZHJvbmVMYW5kc2NhcGU6ICdjb3NtaWNfb3JiaXRhbCcsXG4gICAgICB0b3dlckhlaWdodE11bHRpcGxpZXI6IDEuNDUsXG4gICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAuMTUsXG4gICAgICB3aXJlZnJhbWVPdmVybGF5OiB0cnVlLFxuICAgICAgcGVyc3BlY3RpdmVGb3ZEZWc6IDc0LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1tdWx0aXZlcnNlLWJsdWVwcmludCcsXG4gICAgdGl0bGU6ICdCxYLEmWtpdG55IEJsdWVwcmludCBLd2FudG93eScsXG4gICAgY2F0ZWdvcnk6ICdHxYLEmWJva2EgUGFyYWxha3NhJyxcbiAgICBzcmM6ICcvYXNzZXRzL2Fpc3R1ZGlvL0lNR18xODIwX2M4NGE1OGEwLlBORycsXG4gICAgcHJlc2V0OiB7XG4gICAgICBzY2VuZUlkOiAnc2t5bGluZV9maW5hbmNpYWwnLFxuICAgICAgcGFsZXR0ZTogJ2N5YW5fYmx1ZXByaW50JyxcbiAgICAgIGRyb25lTGFuZHNjYXBlOiAnY29zbWljX29yYml0YWwnLFxuICAgICAgdG93ZXJIZWlnaHRNdWx0aXBsaWVyOiAxLjUsXG4gICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAuNTUsXG4gICAgICB3aXJlZnJhbWVPdmVybGF5OiB0cnVlLFxuICAgICAgcGVyc3BlY3RpdmVGb3ZEZWc6IDcyLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1lbWVyYWxkLWN1YmUtbWF0cml4JyxcbiAgICB0aXRsZTogJ1N6bWFyYWdkb3dhIEtvc3RrYSBNb2R1xYJvd2EnLFxuICAgIGNhdGVnb3J5OiAnTW9kZWxhcnN0d28gLyBLaXRiYXNoIDNEJyxcbiAgICBzcmM6ICcvYXNzZXRzL2Fpc3R1ZGlvL0lNR18xODE0Xzk2NGVmMDdmLmpwZycsXG4gICAgcHJlc2V0OiB7XG4gICAgICBzY2VuZUlkOiAnZWNvX2F0cml1bScsXG4gICAgICBwYWxldHRlOiAnZW1lcmFsZF9tYXRyaXgnLFxuICAgICAgZHJvbmVMYW5kc2NhcGU6ICdjb3NtaWNfb3JiaXRhbCcsXG4gICAgICB0b3dlckhlaWdodE11bHRpcGxpZXI6IDEuMjUsXG4gICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAuNjUsXG4gICAgICB3aXJlZnJhbWVPdmVybGF5OiBmYWxzZSxcbiAgICAgIHBlcnNwZWN0aXZlRm92RGVnOiA2NCxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtbm9kZS1jbHVzdGVyJyxcbiAgICB0aXRsZTogJ1NpZcSHIE1vZHXFgsOzdyBDZW50cmFsbmVnbyBSZHplbmlhJyxcbiAgICBjYXRlZ29yeTogJ1RvcG9sb2dpYSBVa8WCYWR1IDNEJyxcbiAgICBzcmM6ICcvYXNzZXRzL2Fpc3R1ZGlvL0lNR18xODEzXzFmZGEwYWE2LmpwZycsXG4gICAgcHJlc2V0OiB7XG4gICAgICBzY2VuZUlkOiAnYWVyb19odWInLFxuICAgICAgcGFsZXR0ZTogJ2N5YW5fYmx1ZXByaW50JyxcbiAgICAgIGRyb25lTGFuZHNjYXBlOiAnbWV0cm9wb2xpc19kYXduJyxcbiAgICAgIHRvd2VySGVpZ2h0TXVsdGlwbGllcjogMS4xLFxuICAgICAgZXhwbG9kZWRWaWV3RmFjdG9yOiAwLjUsXG4gICAgICB3aXJlZnJhbWVPdmVybGF5OiBmYWxzZSxcbiAgICAgIHBlcnNwZWN0aXZlRm92RGVnOiA2OCxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtNTAtcmlzZS10b3dlcicsXG4gICAgdGl0bGU6ICc1MCBSaXNlIFRvd2VyIOKAlCDFu3lsZXRrb3dhIElnbGljYScsXG4gICAgY2F0ZWdvcnk6ICdXaWXFvG93aWVjIG8gWm1pZW5uZWpaYmllxbxub8WbY2knLFxuICAgIHNyYzogJy9hc3NldHMvYWlzdHVkaW8vNTBfUmlzZV9Ub3dlcl82Njk3NmFkMS5qcGVnJyxcbiAgICBwcmVzZXQ6IHtcbiAgICAgIHNjZW5lSWQ6ICdza3lsaW5lX2ZpbmFuY2lhbCcsXG4gICAgICBwYWxldHRlOiAnYW1iZXJfZ29sZCcsXG4gICAgICBkcm9uZUxhbmRzY2FwZTogJ2FscGluZV9wZWFrcycsXG4gICAgICB0b3dlckhlaWdodE11bHRpcGxpZXI6IDEuNjUsXG4gICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAuMCxcbiAgICAgIHdpcmVmcmFtZU92ZXJsYXk6IGZhbHNlLFxuICAgICAgcGVyc3BlY3RpdmVGb3ZEZWc6IDY2LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi10d2lzdGVkLXRvd2VyJyxcbiAgICB0aXRsZTogJ1dpZcW8YSBTa3LEmXRuYSBQYXJhbWV0cmljIFR3aXN0JyxcbiAgICBjYXRlZ29yeTogJ0dlb21ldHJpYSDFu3lyb3Nrb3Bvd2EnLFxuICAgIHNyYzogJy9hc3NldHMvYWlzdHVkaW8vVW5rbm93bl8xOF9kZDQ0OGY0YS5qcGVnJyxcbiAgICBwcmVzZXQ6IHtcbiAgICAgIHNjZW5lSWQ6ICdza3lsaW5lX2ZpbmFuY2lhbCcsXG4gICAgICBwYWxldHRlOiAncGxhdGludW1fYXJjaCcsXG4gICAgICBkcm9uZUxhbmRzY2FwZTogJ2FscGluZV9wZWFrcycsXG4gICAgICB0b3dlckhlaWdodE11bHRpcGxpZXI6IDEuNixcbiAgICAgIGV4cGxvZGVkVmlld0ZhY3RvcjogMC4yLFxuICAgICAgd2lyZWZyYW1lT3ZlcmxheTogZmFsc2UsXG4gICAgICBwZXJzcGVjdGl2ZUZvdkRlZzogNzAsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLW55Yy10b3JjaCcsXG4gICAgdGl0bGU6ICdUaGUgVG9yY2ggTllDICgzMjVtIERpYWdyaWQpJyxcbiAgICBjYXRlZ29yeTogJ0tvbnN0cnVrY2phIERpYWdyaWQnLFxuICAgIHNyYzogJy9hc3NldHMvYWlzdHVkaW8vTkVXX1lPUktfX19UaGVfVG9yY2hfLV83NDBfOHRoX0F2ZW51ZV9fXzMyNW1fX18xMDY3ZnRfX18uLl9kYWQyMTI0Mi5qcGVnJyxcbiAgICBwcmVzZXQ6IHtcbiAgICAgIHNjZW5lSWQ6ICdza3lsaW5lX2ZpbmFuY2lhbCcsXG4gICAgICBwYWxldHRlOiAncGxhdGludW1fYXJjaCcsXG4gICAgICBkcm9uZUxhbmRzY2FwZTogJ21ldHJvcG9saXNfZGF3bicsXG4gICAgICB0b3dlckhlaWdodE11bHRpcGxpZXI6IDEuNSxcbiAgICAgIGV4cGxvZGVkVmlld0ZhY3RvcjogMC4yNSxcbiAgICAgIHdpcmVmcmFtZU92ZXJsYXk6IHRydWUsXG4gICAgICBwZXJzcGVjdGl2ZUZvdkRlZzogNjAsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLXRhc2hrZW50LWNpdHknLFxuICAgIHRpdGxlOiAnVGFzaGtlbnQgQ2l0eSDigJQgS29tcGxla3MgV2llxbwnLFxuICAgIGNhdGVnb3J5OiAnS29tcG96eWNqYSBXaWVsb2JyecWCb3dhJyxcbiAgICBzcmM6ICcvYXNzZXRzL2Fpc3R1ZGlvL1Rhc2hrZW50X0NpdHlfX1V6YmVraXN0YW5fNWZhODk3Y2IuanBlZycsXG4gICAgcHJlc2V0OiB7XG4gICAgICBzY2VuZUlkOiAnc2t5bGluZV9maW5hbmNpYWwnLFxuICAgICAgcGFsZXR0ZTogJ2N5YW5fYmx1ZXByaW50JyxcbiAgICAgIGRyb25lTGFuZHNjYXBlOiAnYWxwaW5lX3BlYWtzJyxcbiAgICAgIHRvd2VySGVpZ2h0TXVsdGlwbGllcjogMS4zNSxcbiAgICAgIGV4cGxvZGVkVmlld0ZhY3RvcjogMC4xLFxuICAgICAgd2lyZWZyYW1lT3ZlcmxheTogZmFsc2UsXG4gICAgICBwZXJzcGVjdGl2ZUZvdkRlZzogNjUsXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLXdlbGxuZXNzLW9jZWFuJyxcbiAgICB0aXRsZTogJ05leHQgR2VuZXJhdGlvbiBXZWxsbmVzcyBIb3Jpem9uJyxcbiAgICBjYXRlZ29yeTogJ1NwYWNlIHRvIEx1a3N1cyDigJQgT2NlYW4nLFxuICAgIHNyYzogJy9hc3NldHMvYWlzdHVkaW8vVW5rbm93bl8xMF85Zjg5NTNhYS5qcGVnJyxcbiAgICBwcmVzZXQ6IHtcbiAgICAgIHNjZW5lSWQ6ICdlY29fYXRyaXVtJyxcbiAgICAgIHBhbGV0dGU6ICdwbGF0aW51bV9hcmNoJyxcbiAgICAgIGRyb25lTGFuZHNjYXBlOiAnb2NlYW5fd2VsbG5lc3MnLFxuICAgICAgdG93ZXJIZWlnaHRNdWx0aXBsaWVyOiAwLjksXG4gICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAuMyxcbiAgICAgIHdpcmVmcmFtZU92ZXJsYXk6IGZhbHNlLFxuICAgICAgcGVyc3BlY3RpdmVGb3ZEZWc6IDc1LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1mdXR1cmlzdGljLWFlcm8nLFxuICAgIHRpdGxlOiAnQWVyby1NZXRyb3BvbGlhIGkgS29yeXRhcnplIERyb27Ds3cnLFxuICAgIGNhdGVnb3J5OiAnV2lydHVhbG55IExvdCBEcm9uZW0nLFxuICAgIHNyYzogJy9hc3NldHMvYWlzdHVkaW8vVW5rbm93bl8xNV83MTFhNmJmNC5qcGVnJyxcbiAgICBwcmVzZXQ6IHtcbiAgICAgIHNjZW5lSWQ6ICdhZXJvX2h1YicsXG4gICAgICBwYWxldHRlOiAnY3lhbl9ibHVlcHJpbnQnLFxuICAgICAgZHJvbmVMYW5kc2NhcGU6ICdtZXRyb3BvbGlzX2Rhd24nLFxuICAgICAgdG93ZXJIZWlnaHRNdWx0aXBsaWVyOiAxLjMsXG4gICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAuMTUsXG4gICAgICB3aXJlZnJhbWVPdmVybGF5OiBmYWxzZSxcbiAgICAgIHBlcnNwZWN0aXZlRm92RGVnOiA3OCxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtY291cnR5YXJkLWNhbXB1cycsXG4gICAgdGl0bGU6ICdEemllZHppbmllYyBCaXVyb3d5IHogVGFyYXNhbWknLFxuICAgIGNhdGVnb3J5OiAnUGVyc3Bla3R5d2EgeiBMb3R1IFB0YWthJyxcbiAgICBzcmM6ICcvYXNzZXRzL2Fpc3R1ZGlvL1Vua25vd25fMTdfNzdkODkyMGQuanBlZycsXG4gICAgcHJlc2V0OiB7XG4gICAgICBzY2VuZUlkOiAnZWNvX2F0cml1bScsXG4gICAgICBwYWxldHRlOiAnZW1lcmFsZF9tYXRyaXgnLFxuICAgICAgZHJvbmVMYW5kc2NhcGU6ICdhbHBpbmVfcGVha3MnLFxuICAgICAgdG93ZXJIZWlnaHRNdWx0aXBsaWVyOiAxLjE1LFxuICAgICAgZXhwbG9kZWRWaWV3RmFjdG9yOiAwLjAsXG4gICAgICB3aXJlZnJhbWVPdmVybGF5OiBmYWxzZSxcbiAgICAgIHBlcnNwZWN0aXZlRm92RGVnOiA2OCxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtZ3JlZW4tcG9kaXVtJyxcbiAgICB0aXRsZTogJ1dpZcW8b3dpZWMgeiBaaWVsb255bSBQb2RpdW0nLFxuICAgIGNhdGVnb3J5OiAnV2Fyc3R3eSBLb25keWduYWNqaScsXG4gICAgc3JjOiAnL2Fzc2V0cy9haXN0dWRpby9Vbmtub3duXzE2X2MzYTY1ZTg0LmpwZWcnLFxuICAgIHByZXNldDoge1xuICAgICAgc2NlbmVJZDogJ3NreWxpbmVfZmluYW5jaWFsJyxcbiAgICAgIHBhbGV0dGU6ICdlbWVyYWxkX21hdHJpeCcsXG4gICAgICBkcm9uZUxhbmRzY2FwZTogJ2FscGluZV9wZWFrcycsXG4gICAgICB0b3dlckhlaWdodE11bHRpcGxpZXI6IDEuNCxcbiAgICAgIGV4cGxvZGVkVmlld0ZhY3RvcjogMC4zNSxcbiAgICAgIHdpcmVmcmFtZU92ZXJsYXk6IGZhbHNlLFxuICAgICAgcGVyc3BlY3RpdmVGb3ZEZWc6IDYyLFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi13aGl0ZS1tYXNzaW5nJyxcbiAgICB0aXRsZTogJ01ha2lldGEgVXJiYW5pc3R5Y3puYSAoTWFzc2luZyknLFxuICAgIGNhdGVnb3J5OiAnUGxhbm93YW5pZSBLb21wb3p5Y2ppJyxcbiAgICBzcmM6ICcvYXNzZXRzL2Fpc3R1ZGlvL1Vua25vd25fMTNfZTRmMDFiOWQuanBlZycsXG4gICAgcHJlc2V0OiB7XG4gICAgICBzY2VuZUlkOiAnc2t5bGluZV9maW5hbmNpYWwnLFxuICAgICAgcGFsZXR0ZTogJ3BsYXRpbnVtX2FyY2gnLFxuICAgICAgZHJvbmVMYW5kc2NhcGU6ICdleGVjdXRpdmVfYm9hcmRyb29tJyxcbiAgICAgIHRvd2VySGVpZ2h0TXVsdGlwbGllcjogMS4yNSxcbiAgICAgIGV4cGxvZGVkVmlld0ZhY3RvcjogMC4yLFxuICAgICAgd2lyZWZyYW1lT3ZlcmxheTogdHJ1ZSxcbiAgICAgIHBlcnNwZWN0aXZlRm92RGVnOiA1MixcbiAgICB9LFxuICB9LFxuXTtcblxuY29uc3QgVE9UQUxfTEVEX0JBUlMgPSAyNDtcblxuZXhwb3J0IGNvbnN0IEx1eHVyeVNwYXRpYWxEZWNrOiBSZWFjdC5GQzxMdXh1cnlTcGF0aWFsRGVja1Byb3BzPiA9ICh7XG4gIGNvbmZpZyxcbiAgb25VcGRhdGVDb25maWcsXG4gIG9uVXBkYXRlUGFsZXR0ZSxcbiAgb25Ob3RpZnksXG59KSA9PiB7XG4gIGNvbnN0IFtkaWFsVGFyZ2V0LCBzZXREaWFsVGFyZ2V0XSA9IHVzZVN0YXRlPE1peGVyRGlhbFRhcmdldD4oJ3NjYWxlX3NpemUnKTtcbiAgY29uc3QgW2FjdGl2ZVBhZEluZGV4LCBzZXRBY3RpdmVQYWRJbmRleF0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbbGFzdERldGVudEZsYXNoLCBzZXRMYXN0RGV0ZW50Rmxhc2hdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbcmVzaXN0YW5jZVRlbnNpb24sIHNldFJlc2lzdGFuY2VUZW5zaW9uXSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7IC8vIC0xIHRvIDEgdmlzdWFsIHNwcmluZyB0ZW5zaW9uIGJlZm9yZSBkZXRlbnQganVtcFxuICBjb25zdCBbc2NyYXRjaEFuZ2xlLCBzZXRTY3JhdGNoQW5nbGVdID0gdXNlU3RhdGU8bnVtYmVyPihjb25maWcubW9kZWxSb3RhdGlvblkgfHwgMjUpO1xuICBjb25zdCBbaXNTY3JhdGNoaW5nLCBzZXRJc1NjcmF0Y2hpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbZ3lyb0FuaW1QaGFzZSwgc2V0R3lyb0FuaW1QaGFzZV0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuXG4gIGNvbnN0IGRpYWxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgc2NyYXRjaFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBpc0RyYWdnaW5nRGlhbFJlZiA9IHVzZVJlZjxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IGRyYWdBY2N1bVJlZiA9IHVzZVJlZjxudW1iZXI+KDApO1xuICBjb25zdCBsYXN0WVJlZiA9IHVzZVJlZjxudW1iZXI+KDApO1xuICBjb25zdCBsYXN0U2NyYXRjaEFuZ2xlUmVmID0gdXNlUmVmPG51bWJlcj4oMCk7XG5cbiAgLy8gQ29udGludW91cyBzbW9vdGggMy1heGlzIGd5cm9zY29wZSBhbmltYXRpb24gbG9vcFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCByYWZJZCA9IDA7XG4gICAgY29uc3QgdGljayA9IChub3c6IG51bWJlcikgPT4ge1xuICAgICAgc2V0R3lyb0FuaW1QaGFzZShub3cgKiAwLjAwMTIpO1xuICAgICAgcmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG4gICAgfTtcbiAgICByYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICByZXR1cm4gKCkgPT4gY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWQpO1xuICB9LCBbXSk7XG5cbiAgLy8gTm9ybWFsaXplIGN1cnJlbnQgZGlhbCB0YXJnZXQgdmFsdWUgdG8gMC4uMjQgZGlzY3JldGUgc2FmZS1sb2NrIGRldGVudCBzdGVwc1xuICBjb25zdCBnZXROb3JtYWxpemVkU3RlcCA9ICgpOiBudW1iZXIgPT4ge1xuICAgIGlmIChkaWFsVGFyZ2V0ID09PSAnc2NhbGVfc2l6ZScpIHtcbiAgICAgIGNvbnN0IG5vcm0gPSAoY29uZmlnLm1vZGVsU2NhbGUgLSAwLjQpIC8gKDIuMiAtIDAuNCk7XG4gICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBub3JtKSkgKiBUT1RBTF9MRURfQkFSUyk7XG4gICAgfVxuICAgIGlmIChkaWFsVGFyZ2V0ID09PSAnbGV2ZWxzX2V4cGxvZGVkJykge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgY29uZmlnLmV4cGxvZGVkVmlld0ZhY3RvcikpICogVE9UQUxfTEVEX0JBUlMpO1xuICAgIH1cbiAgICBpZiAoZGlhbFRhcmdldCA9PT0gJ3BlcnNwZWN0aXZlX2ZvdicpIHtcbiAgICAgIGNvbnN0IGZvdiA9IGNvbmZpZy5wZXJzcGVjdGl2ZUZvdkRlZyB8fCA2MDtcbiAgICAgIGNvbnN0IG5vcm0gPSAoZm92IC0gMjgpIC8gKDg1IC0gMjgpO1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgbm9ybSkpICogVE9UQUxfTEVEX0JBUlMpO1xuICAgIH1cbiAgICBjb25zdCBhbHQgPSBjb25maWcuZHJvbmVBbHRpdHVkZU0gfHwgNjUwO1xuICAgIGNvbnN0IG5vcm0gPSAoYWx0IC0gMTIwKSAvICgyNDAwIC0gMTIwKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBub3JtKSkgKiBUT1RBTF9MRURfQkFSUyk7XG4gIH07XG5cbiAgY29uc3QgY3VycmVudFN0ZXAgPSBnZXROb3JtYWxpemVkU3RlcCgpO1xuXG4gIGNvbnN0IGFwcGx5U3RlcFZhbHVlID0gKG5leHRTdGVwOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBjbGFtcGVkID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oVE9UQUxfTEVEX0JBUlMsIG5leHRTdGVwKSk7XG4gICAgaWYgKGNsYW1wZWQgPT09IGN1cnJlbnRTdGVwKSByZXR1cm47XG5cbiAgICBjb25zdCBpc01ham9yID0gY2xhbXBlZCAlIDQgPT09IDA7XG4gICAgcGxheVNhZmVMb2NrRGV0ZW50Q2xpY2soXG4gICAgICBjbGFtcGVkLFxuICAgICAgVE9UQUxfTEVEX0JBUlMsXG4gICAgICBjb25maWcuc2FmZUNsaWNrU291bmRFbmFibGVkICE9PSBmYWxzZSxcbiAgICAgIGlzTWFqb3JcbiAgICApO1xuXG4gICAgc2V0TGFzdERldGVudEZsYXNoKHRydWUpO1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHNldExhc3REZXRlbnRGbGFzaChmYWxzZSksIDE0MCk7XG5cbiAgICBjb25zdCByYXRpbyA9IGNsYW1wZWQgLyBUT1RBTF9MRURfQkFSUztcbiAgICBpZiAoZGlhbFRhcmdldCA9PT0gJ3NjYWxlX3NpemUnKSB7XG4gICAgICBjb25zdCB2YWwgPSBOdW1iZXIoKDAuNCArIHJhdGlvICogKDIuMiAtIDAuNCkpLnRvRml4ZWQoMikpO1xuICAgICAgb25VcGRhdGVDb25maWcoeyBtb2RlbFNjYWxlOiB2YWwgfSk7XG4gICAgfSBlbHNlIGlmIChkaWFsVGFyZ2V0ID09PSAnbGV2ZWxzX2V4cGxvZGVkJykge1xuICAgICAgY29uc3QgdmFsID0gTnVtYmVyKHJhdGlvLnRvRml4ZWQoMikpO1xuICAgICAgb25VcGRhdGVDb25maWcoeyBleHBsb2RlZFZpZXdGYWN0b3I6IHZhbCB9KTtcbiAgICB9IGVsc2UgaWYgKGRpYWxUYXJnZXQgPT09ICdwZXJzcGVjdGl2ZV9mb3YnKSB7XG4gICAgICBjb25zdCB2YWwgPSBNYXRoLnJvdW5kKDI4ICsgcmF0aW8gKiAoODUgLSAyOCkpO1xuICAgICAgb25VcGRhdGVDb25maWcoeyBwZXJzcGVjdGl2ZUZvdkRlZzogdmFsIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCB2YWwgPSBNYXRoLnJvdW5kKDEyMCArIHJhdGlvICogKDI0MDAgLSAxMjApKTtcbiAgICAgIG9uVXBkYXRlQ29uZmlnKHsgZHJvbmVBbHRpdHVkZU06IHZhbCB9KTtcbiAgICB9XG4gIH07XG5cbiAgLy8gU2FmZS1sb2NrIHJvdGFyeSBkaWFsIHBvaW50ZXIgaGFuZGxlcnMgd2l0aCBtZWNoYW5pY2FsIHJlc2lzdGFuY2UgdGhyZXNob2xkIChcIndyYcW8ZW5pZSBvcG9ydSBpIHByemVza29rdVwiKVxuICBjb25zdCBoYW5kbGVEaWFsUG9pbnRlckRvd24gPSAoZTogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgIGUuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShlLnBvaW50ZXJJZCk7XG4gICAgaXNEcmFnZ2luZ0RpYWxSZWYuY3VycmVudCA9IHRydWU7XG4gICAgbGFzdFlSZWYuY3VycmVudCA9IGUuY2xpZW50WTtcbiAgICBkcmFnQWNjdW1SZWYuY3VycmVudCA9IDA7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGlhbFBvaW50ZXJNb3ZlID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICBpZiAoIWlzRHJhZ2dpbmdEaWFsUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBkeSA9IGxhc3RZUmVmLmN1cnJlbnQgLSBlLmNsaWVudFk7XG4gICAgbGFzdFlSZWYuY3VycmVudCA9IGUuY2xpZW50WTtcblxuICAgIC8vIEJ1aWxkIG1lY2hhbmljYWwgcmVzaXN0YW5jZSB0ZW5zaW9uIGJlZm9yZSBzbmFwcGluZyB0byBuZXh0IHNhZmUgbm90Y2ggKDE4cHggdGhyZXNob2xkKVxuICAgIGRyYWdBY2N1bVJlZi5jdXJyZW50ICs9IGR5O1xuICAgIGNvbnN0IERFVEVOVF9SRVNJU1RBTkNFX1BYID0gMTY7XG4gICAgY29uc3QgdGVuc2lvbiA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBkcmFnQWNjdW1SZWYuY3VycmVudCAvIERFVEVOVF9SRVNJU1RBTkNFX1BYKSk7XG4gICAgc2V0UmVzaXN0YW5jZVRlbnNpb24odGVuc2lvbik7XG5cbiAgICBpZiAoTWF0aC5hYnMoZHJhZ0FjY3VtUmVmLmN1cnJlbnQpID49IERFVEVOVF9SRVNJU1RBTkNFX1BYKSB7XG4gICAgICBjb25zdCBkZWx0YVN0ZXBzID0gTWF0aC50cnVuYyhkcmFnQWNjdW1SZWYuY3VycmVudCAvIERFVEVOVF9SRVNJU1RBTkNFX1BYKTtcbiAgICAgIGRyYWdBY2N1bVJlZi5jdXJyZW50IC09IGRlbHRhU3RlcHMgKiBERVRFTlRfUkVTSVNUQU5DRV9QWDtcbiAgICAgIHNldFJlc2lzdGFuY2VUZW5zaW9uKDApO1xuICAgICAgYXBwbHlTdGVwVmFsdWUoY3VycmVudFN0ZXAgKyBkZWx0YVN0ZXBzKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGlhbFBvaW50ZXJVcCA9ICgpID0+IHtcbiAgICBpc0RyYWdnaW5nRGlhbFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgZHJhZ0FjY3VtUmVmLmN1cnJlbnQgPSAwO1xuICAgIHNldFJlc2lzdGFuY2VUZW5zaW9uKDApO1xuICB9O1xuXG4gIC8vIFJpZ2h0LXNpZGUgREogU2NyYXRjaCAvIEpvZyBQbGF0dGVyIGhhbmRsZXJzXG4gIGNvbnN0IGNvbXB1dGVBbmdsZUZyb21DZW50ZXIgPSAoY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIsIGVsOiBIVE1MRGl2RWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBjeCA9IHJlY3QubGVmdCArIHJlY3Qud2lkdGggLyAyO1xuICAgIGNvbnN0IGN5ID0gcmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDI7XG4gICAgcmV0dXJuIE1hdGguYXRhbjIoY2xpZW50WSAtIGN5LCBjbGllbnRYIC0gY3gpICogKDE4MCAvIE1hdGguUEkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNjcmF0Y2hQb2ludGVyRG93biA9IChlOiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgaWYgKCFzY3JhdGNoUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBlLmN1cnJlbnRUYXJnZXQuc2V0UG9pbnRlckNhcHR1cmUoZS5wb2ludGVySWQpO1xuICAgIHNldElzU2NyYXRjaGluZyh0cnVlKTtcbiAgICBsYXN0U2NyYXRjaEFuZ2xlUmVmLmN1cnJlbnQgPSBjb21wdXRlQW5nbGVGcm9tQ2VudGVyKFxuICAgICAgZS5jbGllbnRYLFxuICAgICAgZS5jbGllbnRZLFxuICAgICAgc2NyYXRjaFJlZi5jdXJyZW50XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTY3JhdGNoUG9pbnRlck1vdmUgPSAoZTogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgIGlmICghaXNTY3JhdGNoaW5nIHx8ICFzY3JhdGNoUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBhbmdsZSA9IGNvbXB1dGVBbmdsZUZyb21DZW50ZXIoZS5jbGllbnRYLCBlLmNsaWVudFksIHNjcmF0Y2hSZWYuY3VycmVudCk7XG4gICAgbGV0IGRlbHRhID0gYW5nbGUgLSBsYXN0U2NyYXRjaEFuZ2xlUmVmLmN1cnJlbnQ7XG4gICAgaWYgKGRlbHRhID4gMTgwKSBkZWx0YSAtPSAzNjA7XG4gICAgaWYgKGRlbHRhIDwgLTE4MCkgZGVsdGEgKz0gMzYwO1xuICAgIGxhc3RTY3JhdGNoQW5nbGVSZWYuY3VycmVudCA9IGFuZ2xlO1xuXG4gICAgaWYgKE1hdGguYWJzKGRlbHRhKSA+IDEuMikge1xuICAgICAgY29uc3QgbmV4dFJvdCA9IChzY3JhdGNoQW5nbGUgKyBkZWx0YSAqIDEuMTUgKyAzNjApICUgMzYwO1xuICAgICAgc2V0U2NyYXRjaEFuZ2xlKG5leHRSb3QpO1xuICAgICAgcGxheVNjcmF0Y2hKb2dQdWxzZShkZWx0YSwgY29uZmlnLnNhZmVDbGlja1NvdW5kRW5hYmxlZCAhPT0gZmFsc2UpO1xuXG4gICAgICAvLyBVcGRhdGUgM0QgbW9kZWwgcm90YXRpb24gKyBzdWJ0bGUgZ3lyb3Njb3BlIHJvbGwvcGl0Y2ggYmFua1xuICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICBtb2RlbFJvdGF0aW9uWTogTWF0aC5yb3VuZChuZXh0Um90KSxcbiAgICAgICAgYXV0b1JvdGF0ZTogZmFsc2UsXG4gICAgICAgIGd5cm9Sb2xsRGVnOiBNYXRoLm1heCgtMzUsIE1hdGgubWluKDM1LCBNYXRoLnJvdW5kKGRlbHRhICogMS44KSkpLFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNjcmF0Y2hQb2ludGVyVXAgPSAoKSA9PiB7XG4gICAgc2V0SXNTY3JhdGNoaW5nKGZhbHNlKTtcbiAgICBvblVwZGF0ZUNvbmZpZyh7IGd5cm9Sb2xsRGVnOiAwIH0pO1xuICB9O1xuXG4gIC8vIDE2IFRhY3RpbGUgU3R1ZGlvIC8gTVBDIFBhZHMgRGVmaW5pdGlvbiAoNHg0IE1hdHJpeCBvbiB0aGUgTGVmdCBHbGFzcyBQYW5lbClcbiAgY29uc3QgdGFjdGlsZVBhZHM6IEFycmF5PHtcbiAgICBpZDogbnVtYmVyO1xuICAgIGNvZGU6IHN0cmluZztcbiAgICBsYWJlbDogc3RyaW5nO1xuICAgIHN1Yjogc3RyaW5nO1xuICAgIGFjY2VudDogJ2N5YW4nIHwgJ2FtYmVyJyB8ICdlbWVyYWxkJyB8ICd2aW9sZXQnO1xuICAgIG9uVHJpZ2dlcjogKCkgPT4gdm9pZDtcbiAgfT4gPSBbXG4gICAge1xuICAgICAgaWQ6IDEsXG4gICAgICBjb2RlOiAnUEFEIDAxJyxcbiAgICAgIGxhYmVsOiAnU3plcm9raSBLxIV0IDc2wrAnLFxuICAgICAgc3ViOiAnUGVyc3Bla3R5d2EgV2lkZScsXG4gICAgICBhY2NlbnQ6ICdjeWFuJyxcbiAgICAgIG9uVHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICBvblVwZGF0ZUNvbmZpZyh7IHBlcnNwZWN0aXZlRm92RGVnOiA3Niwgd29ya3NwYWNlTWFyZ2luUHg6IDI4IH0pO1xuICAgICAgICBvbk5vdGlmeSgnVXN0YXdpb25vIHN6ZXJva8SFIHBlcnNwZWt0eXfEmSA3NsKwIHogemFjaG93YW5pZW0gbWFyZ2luZXN1IGthZHJ1IDI4cHgnKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMixcbiAgICAgIGNvZGU6ICdQQUQgMDInLFxuICAgICAgbGFiZWw6ICdUZWxlb2JpZWt0eXcgMzbCsCcsXG4gICAgICBzdWI6ICdJem9tZXRyaWEgQXJjaC4nLFxuICAgICAgYWNjZW50OiAnY3lhbicsXG4gICAgICBvblRyaWdnZXI6ICgpID0+IHtcbiAgICAgICAgb25VcGRhdGVDb25maWcoeyBwZXJzcGVjdGl2ZUZvdkRlZzogMzYsIHdvcmtzcGFjZU1hcmdpblB4OiAzMiB9KTtcbiAgICAgICAgb25Ob3RpZnkoJ1VzdGF3aW9ubyBkxYJ1Z8SFIG9nbmlza293xIUgMzbCsCAoa29tcHJlc2phIHBlcnNwZWt0eXd5IGFyY2hpdGVrdG9uaWN6bmVqKScpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAzLFxuICAgICAgY29kZTogJ1BBRCAwMycsXG4gICAgICBsYWJlbDogJ1rFgm90eSBQb2R6aWHFgicsXG4gICAgICBzdWI6ICdLb21wb3p5Y2phIFBoaScsXG4gICAgICBhY2NlbnQ6ICdhbWJlcicsXG4gICAgICBvblRyaWdnZXI6ICgpID0+IHtcbiAgICAgICAgb25VcGRhdGVDb25maWcoeyBjb21wb3NpdGlvbkdyaWQ6ICdnb2xkZW5fcmF0aW8nIH0pO1xuICAgICAgICBvbk5vdGlmeSgnV8WCxIVjem9ubyBsaW5pZSBrb21wb3p5Y3lqbmUgWsWCb3RlZ28gUG9kemlhxYJ1IChHb2xkZW4gUmF0aW8gMToxLjYxOCknKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogNCxcbiAgICAgIGNvZGU6ICdQQUQgMDQnLFxuICAgICAgbGFiZWw6ICdQcm9taWVuaWUgWmJpZWd1JyxcbiAgICAgIHN1YjogJ1B1bmt0IFBlcnNwZWt0eXd5JyxcbiAgICAgIGFjY2VudDogJ2FtYmVyJyxcbiAgICAgIG9uVHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICBvblVwZGF0ZUNvbmZpZyh7IGNvbXBvc2l0aW9uR3JpZDogJ3BlcnNwZWN0aXZlX3JheXMnIH0pO1xuICAgICAgICBvbk5vdGlmeSgnV8WCxIVjem9ubyBwcm9taWVuaWUgcHVua3TDs3cgemJpZWd1IHBlcnNwZWt0eXd5IGkgbGluaWkgaG9yeXpvbnR1Jyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDUsXG4gICAgICBjb2RlOiAnUEFEIDA1JyxcbiAgICAgIGxhYmVsOiAnUGxhbnkgR8WCxJliaSBaJyxcbiAgICAgIHN1YjogJzEgLyAyIC8gMyBQbGFuJyxcbiAgICAgIGFjY2VudDogJ2N5YW4nLFxuICAgICAgb25UcmlnZ2VyOiAoKSA9PiB7XG4gICAgICAgIG9uVXBkYXRlQ29uZmlnKHsgY29tcG9zaXRpb25HcmlkOiAnZGVwdGhfcGxhbmVzJywgZGVwdGhPZkZpZWxkSW50ZW5zaXR5OiAwLjg1IH0pO1xuICAgICAgICBvbk5vdGlmeSgnQWt0eXdvd2FubyBwb2R6aWHFgiBwcnplc3RyemVuaSBuYSAzIHBsYW55IGfFgsSZYmkgb3N0cm/Fm2NpIChET0YpJyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDYsXG4gICAgICBjb2RlOiAnUEFEIDA2JyxcbiAgICAgIGxhYmVsOiAnTWFyZ2luZXMgTHVrc3VzJyxcbiAgICAgIHN1YjogJ1JhbWthIDQycHgnLFxuICAgICAgYWNjZW50OiAnZW1lcmFsZCcsXG4gICAgICBvblRyaWdnZXI6ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dE1hcmdpbiA9IChjb25maWcud29ya3NwYWNlTWFyZ2luUHggfHwgMjQpID49IDQwID8gMTggOiA0MjtcbiAgICAgICAgb25VcGRhdGVDb25maWcoeyB3b3Jrc3BhY2VNYXJnaW5QeDogbmV4dE1hcmdpbiB9KTtcbiAgICAgICAgb25Ob3RpZnkoYE1hcmdpbmVzIG9ncmFuaWN6b25laiBwcnplc3RyemVuaSBnxYLEmWJva2llaiBwYXJhbGFrc3k6ICR7bmV4dE1hcmdpbn1weGApO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiA3LFxuICAgICAgY29kZTogJ1BBRCAwNycsXG4gICAgICBsYWJlbDogJ0xvdDogR8OzcnkgQWxweScsXG4gICAgICBzdWI6ICdLcmFqb2JyYXogRHJvbmEnLFxuICAgICAgYWNjZW50OiAnZW1lcmFsZCcsXG4gICAgICBvblRyaWdnZXI6ICgpID0+IHtcbiAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgIGRyb25lTGFuZHNjYXBlOiAnYWxwaW5lX3BlYWtzJyxcbiAgICAgICAgICBkcm9uZUZsaWdodEFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICBkcm9uZUFsdGl0dWRlTTogMTQ1MCxcbiAgICAgICAgfSk7XG4gICAgICAgIG9uTm90aWZ5KCdXaXJ0dWFsbnkgbG90IGRyb25lbTogU3pjenl0eSBBbHBlanNraWUgKDE0NTAgbSBuLnAubS4pIOKAlCDigJ5TcGFjZSB0byBMdWtzdXPigJ0nKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogOCxcbiAgICAgIGNvZGU6ICdQQUQgMDgnLFxuICAgICAgbGFiZWw6ICdMb3Q6IEtvc21vcycsXG4gICAgICBzdWI6ICdPcmJpdGEgJiBNZ8WCYXdpY2EnLFxuICAgICAgYWNjZW50OiAndmlvbGV0JyxcbiAgICAgIG9uVHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgZHJvbmVMYW5kc2NhcGU6ICdjb3NtaWNfb3JiaXRhbCcsXG4gICAgICAgICAgZHJvbmVGbGlnaHRBY3RpdmU6IHRydWUsXG4gICAgICAgICAgZHJvbmVBbHRpdHVkZU06IDI0MDAsXG4gICAgICAgIH0pO1xuICAgICAgICBvbk5vdGlmeSgnV2lydHVhbG55IGxvdCBkcm9uZW06IFByemVzdHJ6ZcWEIE9yYml0YWxuYSDigJQg4oCeU3BhY2UgdG8gTHVrc3Vz4oCdJyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDksXG4gICAgICBjb2RlOiAnUEFEIDA5JyxcbiAgICAgIGxhYmVsOiAnTG90OiBNZXRyb3BvbGlhJyxcbiAgICAgIHN1YjogJ0tvcnl0YXJ6IFBvd2lldHJ6bnknLFxuICAgICAgYWNjZW50OiAnY3lhbicsXG4gICAgICBvblRyaWdnZXI6ICgpID0+IHtcbiAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgIGRyb25lTGFuZHNjYXBlOiAnbWV0cm9wb2xpc19kYXduJyxcbiAgICAgICAgICBkcm9uZUZsaWdodEFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICBkcm9uZUFsdGl0dWRlTTogNTIwLFxuICAgICAgICB9KTtcbiAgICAgICAgb25Ob3RpZnkoJ1dpcnR1YWxueSBsb3QgZHJvbmVtOiBLb3J5dGFyeiBwb3dpZXRyem55IG5hZCBmdXR1cnlzdHljem7EhSBtZXRyb3BvbGnEhScpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAxMCxcbiAgICAgIGNvZGU6ICdQQUQgMTAnLFxuICAgICAgbGFiZWw6ICdMb3Q6IE9jZWFuIFplbicsXG4gICAgICBzdWI6ICdIb3J5em9udCBXZWxsbmVzcycsXG4gICAgICBhY2NlbnQ6ICdlbWVyYWxkJyxcbiAgICAgIG9uVHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgZHJvbmVMYW5kc2NhcGU6ICdvY2Vhbl93ZWxsbmVzcycsXG4gICAgICAgICAgZHJvbmVGbGlnaHRBY3RpdmU6IHRydWUsXG4gICAgICAgICAgZHJvbmVBbHRpdHVkZU06IDIyMCxcbiAgICAgICAgfSk7XG4gICAgICAgIG9uTm90aWZ5KCdXaXJ0dWFsbnkgbG90IGRyb25lbTogU3Bva29qbnkgb2NlYW5pY3pueSBob3J5em9udCBkbyByZWxha3N1IGkgbW9kZWxhcnN0d2EnKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMTEsXG4gICAgICBjb2RlOiAnUEFEIDExJyxcbiAgICAgIGxhYmVsOiAnS2xlaiBNb2R1xYIgKzEnLFxuICAgICAgc3ViOiAnSG9iYnk6IFNrxYJhZGFuaWUnLFxuICAgICAgYWNjZW50OiAnYW1iZXInLFxuICAgICAgb25UcmlnZ2VyOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSBjb25maWcuaG9iYnlBc3NlbWJseVN0ZXAgfHwgMTI7XG4gICAgICAgIGNvbnN0IG5leHQgPSBjdXJyZW50ID49IDEyID8gMSA6IGN1cnJlbnQgKyAxO1xuICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgaG9iYnlBc3NlbWJseVN0ZXA6IG5leHQsXG4gICAgICAgICAgaG9iYnlCbHVlcHJpbnRDb25uZWN0b3JzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgb25Ob3RpZnkoYFdhcnN6dGF0IG1vZGVsYXJza2k6IFByenlrbGVqb25vIHNla2NqxJkga29uc3RydWtjeWpuxIUgJHtuZXh0fSB6IDEyYCk7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDEyLFxuICAgICAgY29kZTogJ1BBRCAxMicsXG4gICAgICBsYWJlbDogJ1JvesWCw7PFvCBaZXN0YXcnLFxuICAgICAgc3ViOiAnV2lkb2sgQ3rEmcWbY2kgQ0FEJyxcbiAgICAgIGFjY2VudDogJ2FtYmVyJyxcbiAgICAgIG9uVHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICBjb25zdCBuZXh0RXhwID0gY29uZmlnLmV4cGxvZGVkVmlld0ZhY3RvciA+IDAuNCA/IDAuMCA6IDAuNzI7XG4gICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IG5leHRFeHAsXG4gICAgICAgICAgaG9iYnlCbHVlcHJpbnRDb25uZWN0b3JzOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgb25Ob3RpZnkoXG4gICAgICAgICAgbmV4dEV4cCA+IDBcbiAgICAgICAgICAgID8gJ1JvesWCb8W8b25vIG1vZGVsIG5hIGN6xJnFm2NpIHBpZXJ3c3plICh3aWRvayBpbnN0cnVrY2ppIHNrbGVqYW5pYSAzRCknXG4gICAgICAgICAgICA6ICdaxYJvxbxvbm8gd3N6eXN0a2llIHBvZHplc3BvxYJ5IG1vZGVsdSB3IGplZG5vbGl0xIUgYnJ5xYLEmSdcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMTMsXG4gICAgICBjb2RlOiAnUEFEIDEzJyxcbiAgICAgIGxhYmVsOiAnxYHEhWN6bmlraSBLbGVqdScsXG4gICAgICBzdWI6ICdXZWt0b3J5IE1vbnRhxbx1JyxcbiAgICAgIGFjY2VudDogJ2N5YW4nLFxuICAgICAgb25UcmlnZ2VyOiAoKSA9PiB7XG4gICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICBob2JieUJsdWVwcmludENvbm5lY3RvcnM6ICFjb25maWcuaG9iYnlCbHVlcHJpbnRDb25uZWN0b3JzLFxuICAgICAgICB9KTtcbiAgICAgICAgb25Ob3RpZnkoXG4gICAgICAgICAgIWNvbmZpZy5ob2JieUJsdWVwcmludENvbm5lY3RvcnNcbiAgICAgICAgICAgID8gJ1fFgsSFY3pvbm8gbGluaWUgcHJvd2FkesSFY2UgaSBwdW5rdHkga2xlamVuaWEgbW9kdcWCw7N3IDNEJ1xuICAgICAgICAgICAgOiAnVWtyeXRvIHBvbW9jbmljemUgd2VrdG9yeSBtb250YcW8b3dlJ1xuICAgICAgICApO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAxNCxcbiAgICAgIGNvZGU6ICdQQUQgMTQnLFxuICAgICAgbGFiZWw6ICdTaWF0a2EgWsWCb3RhIDNEJyxcbiAgICAgIHN1YjogJ1N0eWwgV2lyZWZyYW1lJyxcbiAgICAgIGFjY2VudDogJ2FtYmVyJyxcbiAgICAgIG9uVHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICBvblVwZGF0ZVBhbGV0dGUoJ2FtYmVyX2dvbGQnKTtcbiAgICAgICAgb25VcGRhdGVDb25maWcoeyB3aXJlZnJhbWVPdmVybGF5OiAhY29uZmlnLndpcmVmcmFtZU92ZXJsYXkgfSk7XG4gICAgICAgIG9uTm90aWZ5KCdQcnplxYLEhWN6b25vIHrFgm90xIUgc2lhdGvEmSBhcmNoaXRla3Rvbmljem7EhSAoR3JpZCBpbiBBcmNoaXRlY3R1cmUpJyk7XG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6IDE1LFxuICAgICAgY29kZTogJ1BBRCAxNScsXG4gICAgICBsYWJlbDogJ0thbGlicnVqIMW7eXJvJyxcbiAgICAgIHN1YjogJ1BvemlvbSAwLjDCsCcsXG4gICAgICBhY2NlbnQ6ICdlbWVyYWxkJyxcbiAgICAgIG9uVHJpZ2dlcjogKCkgPT4ge1xuICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgZ3lyb1BpdGNoRGVnOiAwLFxuICAgICAgICAgIGd5cm9Sb2xsRGVnOiAwLFxuICAgICAgICAgIGhvcml6b25PZmZzZXRZOiAwLFxuICAgICAgICAgIG1vZGVsUm90YXRpb25ZOiAzMCxcbiAgICAgICAgfSk7XG4gICAgICAgIG9uTm90aWZ5KCfFu3lyb3Nrb3AgMy1vc2lvd3kgd3l6ZXJvd2FueSBkbyBpZGVhbG5lZ28gcG96aW9tdSBob3J5em9udHUgMC4wwrAnKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogMTYsXG4gICAgICBjb2RlOiAnUEFEIDE2JyxcbiAgICAgIGxhYmVsOiAnS2xpayBTZWpmb3d5JyxcbiAgICAgIHN1YjogY29uZmlnLnNhZmVDbGlja1NvdW5kRW5hYmxlZCAhPT0gZmFsc2UgPyAnRMW6d2nEmWsgQUtUWVdOWScgOiAnV3ljaXN6b25vJyxcbiAgICAgIGFjY2VudDogJ3Zpb2xldCcsXG4gICAgICBvblRyaWdnZXI6ICgpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dFNvdW5kID0gY29uZmlnLnNhZmVDbGlja1NvdW5kRW5hYmxlZCA9PT0gZmFsc2U7XG4gICAgICAgIG9uVXBkYXRlQ29uZmlnKHsgc2FmZUNsaWNrU291bmRFbmFibGVkOiBuZXh0U291bmQgfSk7XG4gICAgICAgIG9uTm90aWZ5KFxuICAgICAgICAgIG5leHRTb3VuZFxuICAgICAgICAgICAgPyAnQWt0eXdvd2FubyBtZWNoYW5pY3pueSBkxbp3acSZayB6YXBhZGVrIHNlamZ1IG5hIHBva3LEmXRsZSBpIHBhZGFjaCdcbiAgICAgICAgICAgIDogJ1d5Y2lzem9ubyBkxbp3acSZayB6YXBhZGVrIHNlamZ1J1xuICAgICAgICApO1xuICAgICAgfSxcbiAgICB9LFxuICBdO1xuXG4gIC8vIERpYWwgcm90YXRpb24gYW5nbGUgKC0xMzVkZWcgdG8gKzEzNWRlZykgKyBzdWJ0bGUgc3ByaW5nIHJlc2lzdGFuY2Ugb2Zmc2V0XG4gIGNvbnN0IGRpYWxBbmdsZURlZyA9XG4gICAgLTEzNSArIChjdXJyZW50U3RlcCAvIFRPVEFMX0xFRF9CQVJTKSAqIDI3MCArIHJlc2lzdGFuY2VUZW5zaW9uICogNi41O1xuXG4gIGNvbnN0IGZvcm1hdHRlZERpYWxWYWx1ZSA9ICgpID0+IHtcbiAgICBpZiAoZGlhbFRhcmdldCA9PT0gJ3NjYWxlX3NpemUnKSByZXR1cm4gYCR7Y29uZmlnLm1vZGVsU2NhbGUudG9GaXhlZCgyKX3Dl2A7XG4gICAgaWYgKGRpYWxUYXJnZXQgPT09ICdsZXZlbHNfZXhwbG9kZWQnKSByZXR1cm4gYCR7TWF0aC5yb3VuZChjb25maWcuZXhwbG9kZWRWaWV3RmFjdG9yICogMTAwKX0lYDtcbiAgICBpZiAoZGlhbFRhcmdldCA9PT0gJ3BlcnNwZWN0aXZlX2ZvdicpIHJldHVybiBgJHtjb25maWcucGVyc3BlY3RpdmVGb3ZEZWcgfHwgNjB9wrAgRk9WYDtcbiAgICByZXR1cm4gYCR7Y29uZmlnLmRyb25lQWx0aXR1ZGVNIHx8IDY1MH0gbWA7XG4gIH07XG5cbiAgLy8gTGl2ZSBhbmltYXRlZCBneXJvc2NvcGUgYW5nbGVzXG4gIGNvbnN0IGxpdmVQaXRjaCA9XG4gICAgKGNvbmZpZy5neXJvUGl0Y2hEZWcgfHwgMCkgK1xuICAgIChjb25maWcuZHJvbmVGbGlnaHRBY3RpdmUgPyBNYXRoLnNpbihneXJvQW5pbVBoYXNlICogMS40KSAqIDggOiBNYXRoLnNpbihneXJvQW5pbVBoYXNlICogMC41KSAqIDIpO1xuICBjb25zdCBsaXZlUm9sbCA9XG4gICAgKGNvbmZpZy5neXJvUm9sbERlZyB8fCAwKSArXG4gICAgKGNvbmZpZy5kcm9uZUZsaWdodEFjdGl2ZSA/IE1hdGguY29zKGd5cm9BbmltUGhhc2UgKiAxLjEpICogMTEgOiBNYXRoLmNvcyhneXJvQW5pbVBoYXNlICogMC40KSAqIDIpO1xuICBjb25zdCBsaXZlWWF3ID0gKGNvbmZpZy5tb2RlbFJvdGF0aW9uWSArIChjb25maWcuZHJvbmVGbGlnaHRBY3RpdmUgPyBneXJvQW5pbVBoYXNlICogMTggOiAwKSkgJSAzNjA7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgey8qIE1haW4gVHJhbnNsdWNlbnQgRnJvc3RlZC1HbGFzcyBUYWN0aWxlIENvbnNvbGUgRGVjayAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwLzY1IGJhY2tkcm9wLWJsdXIteGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xNSBzaGFkb3ctMnhsIHAtNCBzbTpwLTUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIHsvKiBTdWJ0bGUgR2xhc3MgVG9wIFNwZWN1bGFyIEhpZ2hsaWdodCAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteC0wIHRvcC0wIGgtcHggYmctZ3JhZGllbnQtdG8tciBmcm9tLXRyYW5zcGFyZW50IHZpYS1jeWFuLTMwMC81MCB0by10cmFuc3BhcmVudFwiXG4gICAgICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICAgICAgLz5cblxuICAgICAgICB7LyogQ29uc29sZSBIZWFkZXIgQmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcGItNCBtYi00IGJvcmRlci1iIGJvcmRlci13aGl0ZS8xMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0wLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LWN5YW4tMzAwIGZvbnQtbW9ubyB0YWJ1bGFyLW51bXNcIj5cbiAgICAgICAgICAgICAgPHNwYW4+U1BBQ0UgVE8gTFVLU1VTPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj7Ctzwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+U1pLTEFOQSBLT05TT0xBIEtPTVBPWllDSkksIFBFUlNQRUtUWVdZIEkgTE9UVSBEUk9ORU08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj5UUllCIEhPQkJZIC8gTU9ERUxBUlNUV08gM0Q8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgU3prbGFueSBQYW5lbCBTdGVyb3dhbmlhOiAyNCBEaW9keSBMRUQgU3RvcG5pIMK3IDE2IFByenljaXNrw7N3IFdhcnN6dGF0b3d5Y2ggwrcgTWFzeXduZSBQb2tyxJl0xYJvIFNlamZvd2UgwrcgU2NyYXRjaCBQbGF0dGVyIGkgxbt5cm9za29wXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICBzYWZlQ2xpY2tTb3VuZEVuYWJsZWQ6IGNvbmZpZy5zYWZlQ2xpY2tTb3VuZEVuYWJsZWQgPT09IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJvcmRlciB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgY29uZmlnLnNhZmVDbGlja1NvdW5kRW5hYmxlZCAhPT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwLzE1IGJvcmRlci1jeWFuLTQwMC81MCB0ZXh0LWN5YW4tMjAwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzcwIGJvcmRlci13aGl0ZS8xMCB0ZXh0LXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjb25maWcuc2FmZUNsaWNrU291bmRFbmFibGVkICE9PSBmYWxzZSA/IChcbiAgICAgICAgICAgICAgICA8Vm9sdW1lMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8Vm9sdW1lWCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIEtsaWsgU2VqZm93eToge2NvbmZpZy5zYWZlQ2xpY2tTb3VuZEVuYWJsZWQgIT09IGZhbHNlID8gJ1fFgS4nIDogJ1dZxYEuJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgZHJvbmVGbGlnaHRBY3RpdmU6ICFjb25maWcuZHJvbmVGbGlnaHRBY3RpdmUsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHJvdW5kZWQtbGcgYm9yZGVyIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgIGNvbmZpZy5kcm9uZUZsaWdodEFjdGl2ZVxuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC01MDAvMjAgYm9yZGVyLWVtZXJhbGQtNDAwLzYwIHRleHQtZW1lcmFsZC0yMDAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNzAgYm9yZGVyLXdoaXRlLzEwIHRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPE1vdW50YWluIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICBMb3QgRHJvbmVtOiB7Y29uZmlnLmRyb25lRmxpZ2h0QWN0aXZlID8gJ1cgTE9DSUUnIDogJ1BBVVpBJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiAzLUNvbHVtbiBHbGFzcyBIYXJkd2FyZSBMYXlvdXQ6IExlZnQgKExFRCBMYWRkZXIgKyAxNiBQYWRzKSB8IENlbnRlciAoTWFzc2l2ZSBTYWZlL01peGVyIERpYWwpIHwgUmlnaHQgKFNjcmF0Y2ggV2hlZWwgKyAzRCBHeXJvc2NvcGUpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgeGw6Z3JpZC1jb2xzLTEyIGdhcC01IGl0ZW1zLXN0cmV0Y2hcIj5cbiAgICAgICAgICB7LyogTEVGVCBXSU5HOiBOdW1lcm91cyBUaGluIExFRCBCYXJzICsgMTYgVGFjdGlsZSBCdXR0b25zICg0eDQgTWF0cml4KSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInhsOmNvbC1zcGFuLTUgYmctd2hpdGUvWzAuMDNdIGJhY2tkcm9wLWJsdXItbWQgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMy41IGZsZXggZ2FwLTMuNVwiPlxuICAgICAgICAgICAgey8qIEZhci1MZWZ0IENvbHVtbjogMjQgVGhpbiBIb3Jpem9udGFsIExFRCBCYXJzIENvbmZpcm1pbmcgRWFjaCBTdGVwcGVkIERlZ3JlZSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB5LTEgcHgtMiByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MC85MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHNocmluay0wIHctMTRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1jeWFuLTMwMCB0cmFja2luZy13aWRlciB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICBMRUQge2N1cnJlbnRTdGVwfS97VE9UQUxfTEVEX0JBUlN9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wtcmV2ZXJzZSBnYXAtMSBteS0xLjUgdy1mdWxsXCI+XG4gICAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IFRPVEFMX0xFRF9CQVJTIH0pLm1hcCgoXywgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBzdGVwTnVtID0gaWR4ICsgMTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTGl0ID0gc3RlcE51bSA8PSBjdXJyZW50U3RlcDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzVG9wUGVhayA9IHN0ZXBOdW0gPT09IGN1cnJlbnRTdGVwO1xuICAgICAgICAgICAgICAgICAgY29uc3QgYmFyQ29sb3IgPVxuICAgICAgICAgICAgICAgICAgICBzdGVwTnVtID4gMjBcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci00MDAgc2hhZG93LVswXzBfOHB4X3JnYmEoMjUxLDE5MSwzNiwwLjg1KV0nXG4gICAgICAgICAgICAgICAgICAgICAgOiBzdGVwTnVtID4gMTRcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTQwMCBzaGFkb3ctWzBfMF84cHhfcmdiYSg1MiwyMTEsMTUzLDAuOCldJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWN5YW4tNDAwIHNoYWRvdy1bMF8wXzhweF9yZ2JhKDM0LDIxMSwyMzgsMC44KV0nO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtzdGVwTnVtfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5U3RlcFZhbHVlKHN0ZXBOdW0pfVxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtgVXN0YXcgc3RvcGllxYQgJHtzdGVwTnVtfS8ke1RPVEFMX0xFRF9CQVJTfWB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgdy1mdWxsIHB5LTAuNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJsb2NrIHctZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi03NSByb3VuZGVkLWZ1bGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUb3BQZWFrICYmIGxhc3REZXRlbnRGbGFzaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2gtWzRweF0gYmctd2hpdGUgc2hhZG93LVswXzBfMTJweF8jZmZmZmZmXSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzTGl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgaC1bM3B4XSAke2JhckNvbG9yfWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdoLVsycHhdIGJnLXNsYXRlLTgwMCBncm91cC1ob3ZlcjpiZy1zbGF0ZS02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgIFNUT1BOSUVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiA0eDQgVGFjdGlsZSBQYWQgTWF0cml4ICgxNiBDb252ZW5pZW50IEJ1dHRvbnMpICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0yLjVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPEdyaWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5QYW5lbCAxNiBQcnp5Y2lza8OzdyBXYXJzenRhdG93eWNoIGkgUGVyc3Bla3R5d3k8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCB0YWJ1bGFyLW51bXNcIj5cbiAgICAgICAgICAgICAgICAgIDTDlzQgUEFEIE1BVFJJWFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICB7dGFjdGlsZVBhZHMubWFwKChwYWQsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGFjdGl2ZVBhZEluZGV4ID09PSBpZHg7XG4gICAgICAgICAgICAgICAgICBjb25zdCBib3JkZXJBY2NlbnQgPVxuICAgICAgICAgICAgICAgICAgICBwYWQuYWNjZW50ID09PSAnYW1iZXInXG4gICAgICAgICAgICAgICAgICAgICAgPyAnaG92ZXI6Ym9yZGVyLWFtYmVyLTQwMC83MCdcbiAgICAgICAgICAgICAgICAgICAgICA6IHBhZC5hY2NlbnQgPT09ICdlbWVyYWxkJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ2hvdmVyOmJvcmRlci1lbWVyYWxkLTQwMC83MCdcbiAgICAgICAgICAgICAgICAgICAgICA6IHBhZC5hY2NlbnQgPT09ICd2aW9sZXQnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnaG92ZXI6Ym9yZGVyLXZpb2xldC00MDAvNzAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnaG92ZXI6Ym9yZGVyLWN5YW4tNDAwLzcwJztcblxuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17cGFkLmlkfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFjdGl2ZVBhZEluZGV4KGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5U2FmZUxvY2tEZXRlbnRDbGljayhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4ICsgNCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgMTYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5zYWZlQ2xpY2tTb3VuZEVuYWJsZWQgIT09IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFkLm9uVHJpZ2dlcigpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZ3JvdXAgcmVsYXRpdmUgdGV4dC1sZWZ0IHAtMiByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBhY3RpdmU6c2NhbGUtOTUgJHtib3JkZXJBY2NlbnR9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwLzIwIGJvcmRlci1jeWFuLTQwMCBzaGFkb3ctW2luc2V0XzBfMF8xMnB4X3JnYmEoMzQsMjExLDIzOCwwLjI1KV0nXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC83NSBib3JkZXItd2hpdGUvMTAgaG92ZXI6Ymctc2xhdGUtOTAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntwYWQuY29kZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTIgaC0xIHJvdW5kZWQtZnVsbCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQgPyAnYmctY3lhbi0zMDAnIDogJ2JnLXNsYXRlLTcwMCBncm91cC1ob3ZlcjpiZy1zbGF0ZS01MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSB0cnVuY2F0ZSBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwYWQubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB0cnVuY2F0ZVwiPntwYWQuc3VifTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ0VOVEVSIENPTlNPTEU6IE1hc3NpdmUgU3R1ZGlvIE1peGVyIC8gU2FmZS1Mb2NrIFJvdGFyeSBEaWFsICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieGw6Y29sLXNwYW4tNCBiZy13aGl0ZS9bMC4wM10gYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC00IGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgbWItMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxTbGlkZXJzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5NYXN5d25lIFBva3LEmXTFgm8gUG96aW9tw7N3IGkgV2llbGtvxZtjaTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci0zMDAgdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgT1DDk1IgU0VKRk9XWSAyNC1TVC5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBUYXJnZXQgUGFyYW1ldGVyIFNlbGVjdG9yIFRhYnMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTEgdy1mdWxsIGJnLXNsYXRlLTk1MC84MCBwLTEgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtWzExcHhdIG1iLTNcIj5cbiAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICB7IGlkOiAnc2NhbGVfc2l6ZScsIGxhYmVsOiAnV2llbGtvxZvEhycgfSxcbiAgICAgICAgICAgICAgICB7IGlkOiAnbGV2ZWxzX2V4cGxvZGVkJywgbGFiZWw6ICdQb3ppb215JyB9LFxuICAgICAgICAgICAgICAgIHsgaWQ6ICdwZXJzcGVjdGl2ZV9mb3YnLCBsYWJlbDogJ1BlcnNwZWt0eXdhJyB9LFxuICAgICAgICAgICAgICAgIHsgaWQ6ICdkcm9uZV9hbHRpdHVkZScsIGxhYmVsOiAnUHXFgmFwIERyb25hJyB9LFxuICAgICAgICAgICAgICBdLm1hcCgodCkgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17dC5pZH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXREaWFsVGFyZ2V0KHQuaWQgYXMgTWl4ZXJEaWFsVGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgcGxheVNhZmVMb2NrRGV0ZW50Q2xpY2soMTIsIDI0LCBjb25maWcuc2FmZUNsaWNrU291bmRFbmFibGVkICE9PSBmYWxzZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTEgcHgtMS41IHJvdW5kZWQgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgdHJ1bmNhdGUgJHtcbiAgICAgICAgICAgICAgICAgICAgZGlhbFRhcmdldCA9PT0gdC5pZFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTQwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7dC5sYWJlbH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE1hc3NpdmUgUm90YXJ5IFNhZmUtTG9jayAvIFN0dWRpbyBDb25zb2xlIEtub2IgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG15LTFcIj5cbiAgICAgICAgICAgICAgey8qIE91dGVyIDI0LU5vdGNoIERldGVudCBSaW5nIFNWRyAqL31cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LTQ4IGgtNDggLXJvdGF0ZS05MCBwb2ludGVyLWV2ZW50cy1ub25lXCIgdmlld0JveD1cIjAgMCAxODAgMTgwXCI+XG4gICAgICAgICAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IFRPVEFMX0xFRF9CQVJTICsgMSB9KS5tYXAoKF8sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJhdGlvID0gaSAvIFRPVEFMX0xFRF9CQVJTO1xuICAgICAgICAgICAgICAgICAgY29uc3QgZGVnID0gLTEzNSArIHJhdGlvICogMjcwO1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmFkID0gKGRlZyAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgICAgICAgICAgICAgY29uc3QgcklubmVyID0gaSAlIDQgPT09IDAgPyA3NCA6IDc3O1xuICAgICAgICAgICAgICAgICAgY29uc3Qgck91dGVyID0gODQ7XG4gICAgICAgICAgICAgICAgICBjb25zdCB4MSA9IDkwICsgTWF0aC5jb3MocmFkKSAqIHJJbm5lcjtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHkxID0gOTAgKyBNYXRoLnNpbihyYWQpICogcklubmVyO1xuICAgICAgICAgICAgICAgICAgY29uc3QgeDIgPSA5MCArIE1hdGguY29zKHJhZCkgKiByT3V0ZXI7XG4gICAgICAgICAgICAgICAgICBjb25zdCB5MiA9IDkwICsgTWF0aC5zaW4ocmFkKSAqIHJPdXRlcjtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaSA8PSBjdXJyZW50U3RlcDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxsaW5lXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgIHgxPXt4MX1cbiAgICAgICAgICAgICAgICAgICAgICB5MT17eTF9XG4gICAgICAgICAgICAgICAgICAgICAgeDI9e3gyfVxuICAgICAgICAgICAgICAgICAgICAgIHkyPXt5Mn1cbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9e2lzQWN0aXZlID8gJyMzOEJERjgnIDogJyMzMzQxNTUnfVxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPXtpICUgNCA9PT0gMCA/IDIuNSA6IDEuNX1cbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgICAgICAgey8qIEhlYXZ5IEJydXNoZWQtTWV0YWwgJiBGcm9zdGVkLUdsYXNzIFJvdGFyeSBEcnVtICovfVxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgcmVmPXtkaWFsUmVmfVxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckRvd249e2hhbmRsZURpYWxQb2ludGVyRG93bn1cbiAgICAgICAgICAgICAgICBvblBvaW50ZXJNb3ZlPXtoYW5kbGVEaWFsUG9pbnRlck1vdmV9XG4gICAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2hhbmRsZURpYWxQb2ludGVyVXB9XG4gICAgICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtoYW5kbGVEaWFsUG9pbnRlclVwfVxuICAgICAgICAgICAgICAgIG9uV2hlZWw9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICBhcHBseVN0ZXBWYWx1ZShjdXJyZW50U3RlcCArIChlLmRlbHRhWSA8IDAgPyAxIDogLTEpKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHRpdGxlPVwiUHJ6ZWNpxIVnbmlqIHcgZ8OzcsSZL2TDs8WCIGx1YiB1xbx5aiBrw7PFgmthIG15c3p5IOKAlCB3eWN6dXdhbG55IG9ww7NyIGkgcHJ6ZXNrb2sgemFwYWRraSBzZWpmdVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdy0zNCBoLTM0IHJvdW5kZWQtZnVsbCBjdXJzb3ItbnMtcmVzaXplIHNlbGVjdC1ub25lIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJvcmRlci0yIHRyYW5zaXRpb24tc2hhZG93ICR7XG4gICAgICAgICAgICAgICAgICBsYXN0RGV0ZW50Rmxhc2hcbiAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWN5YW4tMzAwIHNoYWRvdy1bMF8wXzI4cHhfcmdiYSgzNCwyMTEsMjM4LDAuNTUpLGluc2V0XzBfMnB4XzEycHhfcmdiYSgyNTUsMjU1LDI1NSwwLjM1KV0nXG4gICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1zbGF0ZS02MDAvOTAgc2hhZG93LVswXzEycHhfMzBweF9yZ2JhKDAsMCwwLDAuODUpLGluc2V0XzBfMnB4XzEwcHhfcmdiYSgyNTUsMjU1LDI1NSwwLjE4KV0nXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAgICAgICAgICdyYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDMyJSAyOCUsICMxZTI5M2IgMCUsICMwZjE3MmEgNTUlLCAjMDIwNjE3IDEwMCUpJyxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgey8qIFJvdGF0aW5nIEluZGljYXRvciBSaW5nICovfVxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTEuNSByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1kYXNoZWQgYm9yZGVyLXdoaXRlLzE1IHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7ZGlhbEFuZ2xlRGVnfWRlZylgLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBpc0RyYWdnaW5nRGlhbFJlZi5jdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgPyAndHJhbnNmb3JtIDQ1bXMgY3ViaWMtYmV6aWVyKDAuMjIsIDEsIDAuMzYsIDEpJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RyYW5zZm9ybSAxNDBtcyBjdWJpYy1iZXppZXIoMC4zNCwgMS41NiwgMC42NCwgMSknLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMi41IGgtNSBiZy1hbWJlci00MDAgcm91bmRlZC1mdWxsIG14LWF1dG8gLW10LTEgc2hhZG93LVswXzBfMTBweF8jZjU5ZTBiXVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogQ2VudGVyIERpZ2l0YWwgUmVhZG91dCBJbnNpZGUgTWFzc2l2ZSBLbm9iICovfVxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIFNUT1AuIHtjdXJyZW50U3RlcH0ve1RPVEFMX0xFRF9CQVJTfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlIHRhYnVsYXItbnVtcyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgIHtmb3JtYXR0ZWREaWFsVmFsdWUoKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1jeWFuLTMwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgIHtNYXRoLmFicyhyZXNpc3RhbmNlVGVuc2lvbikgPiAwLjE1ID8gJ09Qw5NSIFpBUEFES0kuLi4nIDogJ0tMSUsgU0VKRk9XWSd9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogRmluZSBTaW5nbGUtTm90Y2ggU3RlcHBlciBCdXR0b25zICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdy1mdWxsIGdhcC0yIHB0LTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5U3RlcFZhbHVlKGN1cnJlbnRTdGVwIC0gMSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTEuNSBweC0zIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwLzkwIGhvdmVyOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMjAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIOKIkjEgU3RvcGllxYQgKEtsaWspXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlTdGVwVmFsdWUoY3VycmVudFN0ZXAgKyAxKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHB4LTMgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAvOTAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC14cyBmb250LW1vbm8gdGV4dC1jeWFuLTMwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICArMSBTdG9waWXFhCAoS2xpaylcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBSSUdIVCBXSU5HOiBESiBTY3JhdGNoIC8gSm9nIFBsYXR0ZXIgKyBBbmltYXRlZCAzLUF4aXMgR3lyb3Njb3BlICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwieGw6Y29sLXNwYW4tMyBiZy13aGl0ZS9bMC4wM10gYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQteGwgcC0zLjUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0zXCI+XG4gICAgICAgICAgICB7LyogVG9wIEhhbGY6IERKIFNjcmF0Y2ggLyBKb2cgQ29udHJvbGxlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPERpc2MgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5UYXJjemEgU2NyYXRjaCAvIEpvZyAzNjDCsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtY3lhbi0zMDAgdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgICB7TWF0aC5yb3VuZChzY3JhdGNoQW5nbGUpfcKwIFlBV1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIHsvKiBJbnRlcmFjdGl2ZSBTY3JhdGNoIFR1cm50YWJsZSBQbGF0dGVyICovfVxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIHJlZj17c2NyYXRjaFJlZn1cbiAgICAgICAgICAgICAgICAgIG9uUG9pbnRlckRvd249e2hhbmRsZVNjcmF0Y2hQb2ludGVyRG93bn1cbiAgICAgICAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e2hhbmRsZVNjcmF0Y2hQb2ludGVyTW92ZX1cbiAgICAgICAgICAgICAgICAgIG9uUG9pbnRlclVwPXtoYW5kbGVTY3JhdGNoUG9pbnRlclVwfVxuICAgICAgICAgICAgICAgICAgb25Qb2ludGVyQ2FuY2VsPXtoYW5kbGVTY3JhdGNoUG9pbnRlclVwfVxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPYnJhY2FqIHRhcmN6xJkgamFrIHcga29uc29sZWNpZSBESiAoU2NyYXRjaGluZyBvYnJvdHUgYnJ5xYJ5IDNEIGkgbG90dSBkcm9uYSlcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy0yNCBoLTI0IHJvdW5kZWQtZnVsbCBjdXJzb3ItZ3JhYiBhY3RpdmU6Y3Vyc29yLWdyYWJiaW5nIHNlbGVjdC1ub25lIHNocmluay0wIGJvcmRlci0yIGJvcmRlci1jeWFuLTUwMC80MCBzaGFkb3ctWzBfMF8yMHB4X3JnYmEoNiwxODIsMjEyLDAuMildIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICAgICAgICAgICAgJ3JlcGVhdGluZy1yYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IGNlbnRlciwgIzA5MGQxNiAwcHgsICMwOTBkMTYgNHB4LCAjMTYyMDMyIDVweCwgIzA5MGQxNiA2cHgpJyxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgcm90YXRlKCR7c2NyYXRjaEFuZ2xlfWRlZylgLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7LyogU2NyYXRjaCBQbGF0dGVyIFBvc2l0aW9uIE1hcmtlciAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEuNSBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIHctMiBoLTQgcm91bmRlZC1mdWxsIGJnLWN5YW4tNDAwIHNoYWRvdy1bMF8wXzhweF8jMjJkM2VlXVwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNyBoLTcgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1tb25vIHRleHQtYW1iZXItMzAwXCI+Sk9HPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogU2NyYXRjaCBQbGF0dGVyIFF1aWNrIEFjdGlvbnMgJiBIb2JieSBTdGVwICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIHNwYWNlLXktMS41IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctc251Z1wiPlxuICAgICAgICAgICAgICAgICAgICBQcnplY2nEhWduaWogcG8gdGFyY3p5LCBhYnkg4oCec2NyYXRjaG93YcSH4oCdIG9icsOzdCBtYWtpZXR5IDNEIG9yYXoga8SFdCBuYWxvdHUgZHJvbmEuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBiZy1zbGF0ZS05NTAvODAgcHgtMi41IHB5LTEuNSByb3VuZGVkIGJvcmRlciBib3JkZXItd2hpdGUvMTAgZm9udC1tb25vIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+RXRhcCBrbGVqZW5pYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtc2VtaWJvbGQgdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2NvbmZpZy5ob2JieUFzc2VtYmx5U3RlcCB8fCAxMn0vMTJcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBCb3R0b20gSGFsZjogQW5pbWF0ZWQgMy1BeGlzIEd5cm9zY29wZSAoUGl0Y2ggLyBSb2xsIC8gWWF3KSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMi41IGJvcmRlci10IGJvcmRlci13aGl0ZS8xMCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8Q29tcGFzcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkFuaW1vd2FueSDFu3lyb3Nrb3AgM0Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtMzAwIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgICAgUDp7bGl2ZVBpdGNoLnRvRml4ZWQoMSl9wrAgUjp7bGl2ZVJvbGwudG9GaXhlZCgxKX3CsFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBiZy1zbGF0ZS05NTAvODUgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCByb3VuZGVkLXhsIHAtMi41XCI+XG4gICAgICAgICAgICAgICAgey8qIEFuaW1hdGVkIFNWRyAzLVJpbmcgR2ltYmFsIEd5cm9zY29wZSAqL31cbiAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctMjAgaC0yMCBzaHJpbmstMFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiPlxuICAgICAgICAgICAgICAgICAgey8qIE91dGVyIEZpeGVkIEJlemVsICovfVxuICAgICAgICAgICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgICAgICAgICBjeD1cIjUwXCJcbiAgICAgICAgICAgICAgICAgICAgY3k9XCI1MFwiXG4gICAgICAgICAgICAgICAgICAgIHI9XCI0NlwiXG4gICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwicmdiYSgxNDgsMTYzLDE4NCwwLjI1KVwiXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB7LyogWWF3IFJpbmcgKi99XG4gICAgICAgICAgICAgICAgICA8Z1xuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHJvdGF0ZSgke2xpdmVZYXd9ZGVnKWAsXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnNTBweCA1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgICAgICAgICAgIGN4PVwiNTBcIlxuICAgICAgICAgICAgICAgICAgICAgIGN5PVwiNTBcIlxuICAgICAgICAgICAgICAgICAgICAgIHI9XCIzOVwiXG4gICAgICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cIiMzOEJERjhcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS44XCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2VEYXNoYXJyYXk9XCIxNCA2XCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICAgIHsvKiBSb2xsIEdpbWJhbCBSaW5nICovfVxuICAgICAgICAgICAgICAgICAgPGdcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGByb3RhdGUoJHtsaXZlUm9sbCAqIDIuMn1kZWcpYCxcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1PcmlnaW46ICc1MHB4IDUwcHgnLFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZWxsaXBzZVxuICAgICAgICAgICAgICAgICAgICAgIGN4PVwiNTBcIlxuICAgICAgICAgICAgICAgICAgICAgIGN5PVwiNTBcIlxuICAgICAgICAgICAgICAgICAgICAgIHJ4PVwiMzFcIlxuICAgICAgICAgICAgICAgICAgICAgIHJ5PVwiMThcIlxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCIjRjU5RTBCXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuOFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxsaW5lXG4gICAgICAgICAgICAgICAgICAgICAgeDE9XCIxNlwiXG4gICAgICAgICAgICAgICAgICAgICAgeTE9XCI1MFwiXG4gICAgICAgICAgICAgICAgICAgICAgeDI9XCI4NFwiXG4gICAgICAgICAgICAgICAgICAgICAgeTI9XCI1MFwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzEwQjk4MVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgey8qIFBpdGNoIEdpbWJhbCBSaW5nICovfVxuICAgICAgICAgICAgICAgICAgPGdcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGByb3RhdGUoJHtsaXZlUGl0Y2ggKiAyLjV9ZGVnKWAsXG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luOiAnNTBweCA1MHB4JyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGVsbGlwc2VcbiAgICAgICAgICAgICAgICAgICAgICBjeD1cIjUwXCJcbiAgICAgICAgICAgICAgICAgICAgICBjeT1cIjUwXCJcbiAgICAgICAgICAgICAgICAgICAgICByeD1cIjE1XCJcbiAgICAgICAgICAgICAgICAgICAgICByeT1cIjI5XCJcbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzEwQjk4MVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9nPlxuICAgICAgICAgICAgICAgICAgey8qIENlbnRlciBDb3JlICovfVxuICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD1cIjUwXCIgY3k9XCI1MFwiIHI9XCI0XCIgZmlsbD1cIiNGOEZBRkNcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgc3BhY2UteS0xIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5QSVRDSCAoTmFjaHlsZW5pZSk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIHRhYnVsYXItbnVtc1wiPntsaXZlUGl0Y2gudG9GaXhlZCgxKX3CsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ST0xMIChQcnplY2h5xYIpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDAgdGFidWxhci1udW1zXCI+e2xpdmVSb2xsLnRvRml4ZWQoMSl9wrA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+WUFXIChBenltdXQpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCB0YWJ1bGFyLW51bXNcIj57TWF0aC5yb3VuZChsaXZlWWF3KX3CsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTQwMCBwdC0wLjUgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzEwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBVxYFBUCBEUk9OQTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2NvbmZpZy5kcm9uZUFsdGl0dWRlTSB8fCA2NTB9IG1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBEZWVwIFBhcmFsbGF4LCBQZXJzcGVjdGl2ZSwgQ29tcG9zaXRpb24gJiBIb2JieSBNb2RlbC1DcmFmdGluZyBRdWljayBCYXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtNCBnYXAtMyBwdC00IG10LTQgYm9yZGVyLXQgYm9yZGVyLXdoaXRlLzEwIHRleHQteHNcIj5cbiAgICAgICAgICB7LyogQ29udHJvbCAxOiBEcm9uZSBGbGlnaHQgTGFuZHNjYXBlIChcIlNwYWNlIHRvIEx1a3N1c1wiKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcC0yLjUgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMCBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxNb3VudGFpbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5LcmFqb2JyYXogTG90dSBEcm9uZW06PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtMzAwXCI+U3BhY2UgdG8gTHVrc3VzPC9zcGFuPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5kcm9uZUxhbmRzY2FwZSB8fCAnYWxwaW5lX3BlYWtzJ31cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgZHJvbmVMYW5kc2NhcGU6IGUudGFyZ2V0LnZhbHVlIGFzIERyb25lTGFuZHNjYXBlSWQsXG4gICAgICAgICAgICAgICAgICBkcm9uZUZsaWdodEFjdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwbGF5U2FmZUxvY2tEZXRlbnRDbGljayg4LCAyNCwgY29uZmlnLnNhZmVDbGlja1NvdW5kRW5hYmxlZCAhPT0gZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQgcHgtMi41IHB5LTEuNSB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTQwMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbHBpbmVfcGVha3NcIj5Hw7NyeSBBbHBlanNraWUgaSBQcnplxYLEmWN6ZSAoV3lzb2thIEfFgsSZYmlhKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY29zbWljX29yYml0YWxcIj5PcmJpdGEgS29zbWljem5hIGkgTWfFgmF3aWNhICjigJ5TcGFjZSB0byBMdWtzdXPigJ0pPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtZXRyb3BvbGlzX2Rhd25cIj5GdXR1cnlzdHljem5hIE1ldHJvcG9saWEgbyDFmndpY2llPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJvY2Vhbl93ZWxsbmVzc1wiPk9jZWFuaWN6bnkgSG9yeXpvbnQgV2VsbG5lc3MgKFplbik8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImV4ZWN1dGl2ZV9ib2FyZHJvb21cIj5LbGFzeWN6bnkgU3TDs8WCIEtvbmZlcmVuY3lqbnkgQVI8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENvbnRyb2wgMjogQ29tcG9zaXRpb24gJiBQZXJzcGVjdGl2ZSBHcmlkICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBwLTIuNSBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5QbGFub3dhbmllIEtvbXBvenljamkgaSBHxYLEmWJpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgICAgIEZPViB7Y29uZmlnLnBlcnNwZWN0aXZlRm92RGVnIHx8IDYwfcKwXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgIHZhbHVlPXtjb25maWcuY29tcG9zaXRpb25HcmlkIHx8ICdnb2xkZW5fcmF0aW8nfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICBjb21wb3NpdGlvbkdyaWQ6IGUudGFyZ2V0LnZhbHVlIGFzIENvbXBvc2l0aW9uR3JpZE1vZGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGxheVNhZmVMb2NrRGV0ZW50Q2xpY2soMTAsIDI0LCBjb25maWcuc2FmZUNsaWNrU291bmRFbmFibGVkICE9PSBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZCBweC0yLjUgcHktMS41IHRleHQteHMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWN5YW4tNDAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImdvbGRlbl9yYXRpb1wiPlNpYXRrYSBaxYJvdGVnbyBQb2R6aWHFgnUgKyBNYXJnaW5lcyBQYXNzZS1QYXJ0b3V0PC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwZXJzcGVjdGl2ZV9yYXlzXCI+TGluaWUgWmJpZWd1IFBlcnNwZWt0eXd5IGkgSG9yeXpvbnR1PC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJkZXB0aF9wbGFuZXNcIj5QbGFueSBHxYLEmWJpIE9zdHJvxZtjaSAoMS4gUGxhbiAvIMWacm9kZWsgLyBUxYJvKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicnVsZV9vZl90aGlyZHNcIj5LbGFzeWN6bnkgVHLDs2pwb2R6aWHFgiBLYWRydSAoUnVsZSBvZiBUaGlyZHMpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJub25lXCI+VHlsa28gTWFyZ2luZXMgUm9ib2N6eSAoQmV6IGxpbmlpIHBvbW9jbmljenljaCk8L29wdGlvbj5cbiAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENvbnRyb2wgMzogSG9iYnkgTW9kZWwtR2x1aW5nIC8gS2l0YmFzaCBTdGVwIFNsaWRlciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC82MCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHJvdW5kZWQtbGcgcC0yLjUgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8V3JlbmNoIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Ta2xlamFuaWUgTW9kZWx1IChFdGFweSk6PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWFtYmVyLTMwMCB0YWJ1bGFyLW51bXNcIj5cbiAgICAgICAgICAgICAgICB7Y29uZmlnLmhvYmJ5QXNzZW1ibHlTdGVwIHx8IDEyfSAvIDEyIGN6xJnFm2NpXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgIG1pbj17MX1cbiAgICAgICAgICAgICAgbWF4PXsxMn1cbiAgICAgICAgICAgICAgc3RlcD17MX1cbiAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5ob2JieUFzc2VtYmx5U3RlcCB8fCAxMn1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcCA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCk7XG4gICAgICAgICAgICAgICAgcGxheVNhZmVMb2NrRGV0ZW50Q2xpY2soc3RlcCAqIDIsIDI0LCBjb25maWcuc2FmZUNsaWNrU291bmRFbmFibGVkICE9PSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgICAgICAgICAgICAgaG9iYnlBc3NlbWJseVN0ZXA6IHN0ZXAsXG4gICAgICAgICAgICAgICAgICBob2JieUJsdWVwcmludENvbm5lY3RvcnM6IHRydWUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtYW1iZXItNDAwIGN1cnNvci1wb2ludGVyIGgtMS41IGJnLXNsYXRlLTgwMCByb3VuZGVkLWxnIG10LTJcIlxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDb250cm9sIDQ6IEZyYW1lZCBXb3Jrc3BhY2UgTWFyZ2luICYgSG9yaXpvbiBUaWx0ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgcm91bmRlZC1sZyBwLTIuNSBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS0zMDAgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxNYXhpbWl6ZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+TWFyZ2luZXMgUmFteSBQYXJhbGFrc3k6PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwIHRhYnVsYXItbnVtc1wiPlxuICAgICAgICAgICAgICAgIHtjb25maWcud29ya3NwYWNlTWFyZ2luUHggfHwgMjh9IHB4XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgIG1pbj17MTJ9XG4gICAgICAgICAgICAgIG1heD17NTJ9XG4gICAgICAgICAgICAgIHN0ZXA9ezJ9XG4gICAgICAgICAgICAgIHZhbHVlPXtjb25maWcud29ya3NwYWNlTWFyZ2luUHggfHwgMjh9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG0gPSBwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApO1xuICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHsgd29ya3NwYWNlTWFyZ2luUHg6IG0gfSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBhY2NlbnQtY3lhbi00MDAgY3Vyc29yLXBvaW50ZXIgaC0xLjUgYmctc2xhdGUtODAwIHJvdW5kZWQtbGcgbXQtMlwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSW50ZXJhY3RpdmUgR2FsbGVyeSBvZiB0aGUgMTUgVXBsb2FkZWQgQXJjaGl0ZWN0dXJhbCAmIEdsYXNzLVVJIEluc3BpcmF0aW9ucyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBiZy1zbGF0ZS05NTAvNjAgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICBUd29qYSBCaWJsaW90ZWthIDE1IFd6b3Jjw7N3OiBTemtsYW5lIFBhbmVsZSwgR8WCxJlib2thIFBlcnNwZWt0eXdhIGkgV2llxbxvd2NlIChLbGlrbmlqLCBhYnkgemHFgmFkb3dhxIcgbmEgc2NlbsSZIDNEKVxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB0YWJ1bGFyLW51bXNcIj5cbiAgICAgICAgICAgIDE1IHphxYLEhWN6b255Y2ggcmVmZXJlbmNqaSB3aXp1YWxueWNoXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTMgbWQ6Z3JpZC1jb2xzLTUgZ2FwLTIuNVwiPlxuICAgICAgICAgIHtVUExPQURFRF9JTlNQSVJBVElPTl9HQUxMRVJZLm1hcCgoaXRlbSwgaWR4KSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBwbGF5U2FmZUxvY2tEZXRlbnRDbGljayhpZHggKyAxLCAxNSwgY29uZmlnLnNhZmVDbGlja1NvdW5kRW5hYmxlZCAhPT0gZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIG9uVXBkYXRlUGFsZXR0ZShpdGVtLnByZXNldC5wYWxldHRlKTtcbiAgICAgICAgICAgICAgICBvblVwZGF0ZUNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICBzY2VuZUlkOiBpdGVtLnByZXNldC5zY2VuZUlkLFxuICAgICAgICAgICAgICAgICAgY3VzdG9tU2NlbmVUaXRsZTogaXRlbS50aXRsZSxcbiAgICAgICAgICAgICAgICAgIGRyb25lTGFuZHNjYXBlOiBpdGVtLnByZXNldC5kcm9uZUxhbmRzY2FwZSxcbiAgICAgICAgICAgICAgICAgIGRyb25lRmxpZ2h0QWN0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgdG93ZXJIZWlnaHRNdWx0aXBsaWVyOiBpdGVtLnByZXNldC50b3dlckhlaWdodE11bHRpcGxpZXIsXG4gICAgICAgICAgICAgICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IGl0ZW0ucHJlc2V0LmV4cGxvZGVkVmlld0ZhY3RvcixcbiAgICAgICAgICAgICAgICAgIHdpcmVmcmFtZU92ZXJsYXk6IGl0ZW0ucHJlc2V0LndpcmVmcmFtZU92ZXJsYXksXG4gICAgICAgICAgICAgICAgICBwZXJzcGVjdGl2ZUZvdkRlZzogaXRlbS5wcmVzZXQucGVyc3BlY3RpdmVGb3ZEZWcsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgb25Ob3RpZnkoYFphxYJhZG93YW5vIHd6b3J6ZWMgM0QgaSBwZXJzcGVrdHl3xJk6ICR7aXRlbS50aXRsZX1gKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgdGV4dC1sZWZ0IHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItd2hpdGUvMTAgaG92ZXI6Ym9yZGVyLWN5YW4tNDAwLzgwIGJnLXNsYXRlLTkwMC83MCB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTIwIHctZnVsbCBvdmVyZmxvdy1oaWRkZW4gYmctc2xhdGUtOTUwXCI+XG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgc3JjPXtpdGVtLnNyY31cbiAgICAgICAgICAgICAgICAgIGFsdD17aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBvYmplY3QtY292ZXIgZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMSByaWdodC0xIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAvODUgdGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgICAgICAge2l0ZW0ucHJlc2V0LnBlcnNwZWN0aXZlRm92RGVnfcKwIEZPVlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgdHJ1bmNhdGVcIj57aXRlbS50aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHRydW5jYXRlXCI+e2l0ZW0uY2F0ZWdvcnl9PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19