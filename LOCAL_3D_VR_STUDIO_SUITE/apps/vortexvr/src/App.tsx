const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport8_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport8_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/vortexvr/node_modules/.vite/deps/react.js?v=adc20043";
import { VrViewport3D } from "/apps/vortexvr/src/components/VrViewport3D.tsx";
import { AiStudioAndDocsPanel } from "/apps/vortexvr/src/components/AiStudioAndDocsPanel.tsx";
import { RentalCalendarAndFleet } from "/apps/vortexvr/src/components/RentalCalendarAndFleet.tsx";
import { CrmAdminWarehouseHub } from "/apps/vortexvr/src/components/CrmAdminWarehouseHub.tsx";
import { InteractiveTutorialGuide } from "/apps/vortexvr/src/components/InteractiveTutorialGuide.tsx";
import { exportEnterpriseMasterReportPdf } from "/apps/vortexvr/src/utils/pdfExport.ts";
import { ShieldCheck, Sun, Moon, Globe, KeyRound, Smartphone, Download, HelpCircle, X } from "/apps/vortexvr/node_modules/.vite/deps/lucide-react.js?v=867ef266";
var _jsxFileName = "/app/applet/src/App.tsx";
import __vite__cjsImport8_react_jsxDevRuntime from "/apps/vortexvr/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=adc20043";
const INITIAL_SCENE_OBJECTS = [
	{
		id: "obj_rover_1",
		name: "Łazik Eksploracyjny Helios #1",
		type: "rover",
		position: [
			-2.8,
			0,
			1.2
		],
		rotationY: 28,
		scale: 1.05,
		color: "#E2E8F0",
		secondaryColor: "#F59E0B",
		roughness: .24,
		metalness: .82,
		triangles: 1420,
		partsCount: 8,
		animation: {
			trajectoryType: "none",
			speed: 1,
			amplitude: .3
		}
	},
	{
		id: "obj_portal_2",
		name: "Brama Kwantowa Nexus #2",
		type: "portal",
		position: [
			0,
			0,
			-3.2
		],
		rotationY: 0,
		scale: 1.15,
		color: "#1E293B",
		secondaryColor: "#38BDF8",
		roughness: .18,
		metalness: .9,
		triangles: 1640,
		partsCount: 5,
		animation: {
			trajectoryType: "pulse",
			speed: 1.2,
			amplitude: .25
		}
	},
	{
		id: "obj_crystal_3",
		name: "Monolit Kryształowy #3",
		type: "crystal",
		position: [
			3.2,
			0,
			1.5
		],
		rotationY: 45,
		scale: 1,
		color: "#0284C7",
		secondaryColor: "#F59E0B",
		roughness: .12,
		metalness: .88,
		triangles: 680,
		partsCount: 4,
		animation: {
			trajectoryType: "hover",
			speed: 1.5,
			amplitude: .4
		}
	},
	{
		id: "obj_drone_4",
		name: "Dron Zwiadowczy 6-DoF #4",
		type: "drone",
		position: [
			1.6,
			.4,
			-.5
		],
		rotationY: -20,
		scale: .95,
		color: "#334155",
		secondaryColor: "#10B981",
		roughness: .28,
		metalness: .78,
		triangles: 960,
		partsCount: 5,
		animation: {
			trajectoryType: "orbit",
			speed: 1.1,
			amplitude: .55
		}
	}
];
const INITIAL_LOGIC_NODES = [
	{
		id: "rule_1",
		name: "1. Chwyt Kryształu (+100 PKT)",
		targetObjectId: "obj_crystal_3",
		event: "OnGrabClick",
		action: "AwardPoints100",
		enabled: true,
		position: {
			x: 32,
			y: 26
		},
		dependsOnIds: []
	},
	{
		id: "rule_2",
		name: "2. Obrót Turbo Bramy",
		targetObjectId: "obj_portal_2",
		event: "OnGaze",
		action: "ToggleTurboSpin",
		enabled: true,
		position: {
			x: 355,
			y: 26
		},
		dependsOnIds: ["rule_1"]
	},
	{
		id: "rule_3",
		name: "3. Impuls Rezonansu Drona",
		targetObjectId: "obj_drone_4",
		event: "OnProximity",
		action: "PulseEmissive",
		enabled: true,
		position: {
			x: 680,
			y: 26
		},
		dependsOnIds: ["rule_2"]
	}
];
const INITIAL_EQUIPMENT = [
	{
		id: "eq-1",
		sku: "VR-HMD-PRO-01",
		namePl: "Vortex Vision Pro XR (8K Micro-OLED)",
		nameEn: "Vortex Vision Pro XR (8K Micro-OLED)",
		category: "headset",
		dailyRatePln: 149,
		loyaltyPointsEarned: 120,
		availableUnits: 14,
		totalUnits: 20,
		specs: "2x 4K Micro-OLED, 110° FOV, Eye-Tracking, Wi-Fi 7, Automatyczne IPD 54-72mm",
		familyShareable: true,
		maxFamilyMembers: 5,
		batteryPct: 98,
		depotCity: "Warszawa"
	},
	{
		id: "eq-2",
		sku: "VR-FAM-PACK-04",
		namePl: "Zestaw Rodzinny DuoVR (2x Gogle + SafeVR)",
		nameEn: "Family Bundle DuoVR (2x Headsets + SafeVR)",
		category: "family_bundle",
		dailyRatePln: 229,
		loyaltyPointsEarned: 250,
		availableUnits: 11,
		totalUnits: 16,
		specs: "2x Gogle Bezprzewodowe, 4x Kontroler, Profile Rodzinne IPD, Kontrola Rodzicielska CRM",
		familyShareable: true,
		maxFamilyMembers: 6,
		batteryPct: 97,
		depotCity: "Warszawa"
	},
	{
		id: "eq-3",
		sku: "VR-GLV-HAP-02",
		namePl: "Rękawice Haptyczne ExoTouch Force",
		nameEn: "ExoTouch Force-Feedback Haptic Gloves",
		category: "haptic",
		dailyRatePln: 99,
		loyaltyPointsEarned: 90,
		availableUnits: 9,
		totalUnits: 12,
		specs: "Siłowe sprzężenie zwrotne 10 palców, mikro-siłowniki oporowe, czas pracy 8h",
		familyShareable: true,
		maxFamilyMembers: 4,
		batteryPct: 95,
		depotCity: "Kraków"
	},
	{
		id: "eq-4",
		sku: "VR-TRD-OMN-03",
		namePl: "Bieżnia Wielokierunkowa CyberWalk 360",
		nameEn: "CyberWalk 360 Omnidirectional Treadmill",
		category: "treadmill",
		dailyRatePln: 289,
		loyaltyPointsEarned: 300,
		availableUnits: 4,
		totalUnits: 6,
		specs: "Swobodny chód i bieg 360° w miejscu, uprząż magnetyczna, czujniki kroków 6-DoF",
		familyShareable: false,
		maxFamilyMembers: 2,
		batteryPct: 100,
		depotCity: "Wrocław"
	}
];
const INITIAL_CUSTOMERS = [
	{
		id: "cust-1",
		fullName: "Marek Kowalski",
		email: "m.kowalski@rodzina-vr.pl",
		phone: "+48 602 491 820",
		companyOrFamilyName: "Rodzina Kowalskich (Konto Family Pool)",
		tier: "Platinum VR",
		loyaltyPoints: 2480,
		totalSpentPln: 4290,
		activeRentalsCount: 2,
		overdueCount: 0,
		familyMembers: [
			{
				memberName: "Marek (Ojciec)",
				role: "Rodzic / Admin",
				hoursUsed: 18.5,
				favoriteGenre: "Symulatory Lotu XR",
				ipdPresetMm: 65
			},
			{
				memberName: "Anna (Matka)",
				role: "Partner",
				hoursUsed: 12,
				favoriteGenre: "Architektura 3D i Fitness",
				ipdPresetMm: 61
			},
			{
				memberName: "Kacper (15 lat)",
				role: "Nastolatek",
				hoursUsed: 24.5,
				favoriteGenre: "Wyścigi i Sci-Fi",
				ipdPresetMm: 60
			},
			{
				memberName: "Zosia (9 lat)",
				role: "Dziecko (Tryb SafeVR)",
				hoursUsed: 6.5,
				favoriteGenre: "Edukacja Kosmiczna",
				ipdPresetMm: 55
			}
		]
	},
	{
		id: "cust-2",
		fullName: "dr inż. Karolina Nowak",
		email: "k.nowak@edulab-krakow.pl",
		phone: "+48 511 839 104",
		companyOrFamilyName: "Rodzina Nowak & EduLab Studio",
		tier: "Gold",
		loyaltyPoints: 1640,
		totalSpentPln: 2850,
		activeRentalsCount: 1,
		overdueCount: 1,
		familyMembers: [
			{
				memberName: "Karolina",
				role: "Rodzic / Admin",
				hoursUsed: 21,
				favoriteGenre: "Projektowanie Scen 3D",
				ipdPresetMm: 62
			},
			{
				memberName: "Tomasz",
				role: "Partner",
				hoursUsed: 14.2,
				favoriteGenre: "Eksploracja VR",
				ipdPresetMm: 66
			},
			{
				memberName: "Michał (13 lat)",
				role: "Nastolatek",
				hoursUsed: 16,
				favoriteGenre: "Gry Zręcznościowe",
				ipdPresetMm: 59
			}
		]
	},
	{
		id: "cust-3",
		fullName: "Piotr Wiśniewski",
		email: "piotr.wisniewski@cyberarchitects.eu",
		phone: "+48 790 312 440",
		companyOrFamilyName: "Rodzina Wiśniewskich",
		tier: "Silver",
		loyaltyPoints: 890,
		totalSpentPln: 1490,
		activeRentalsCount: 1,
		overdueCount: 0,
		familyMembers: [{
			memberName: "Piotr",
			role: "Rodzic / Admin",
			hoursUsed: 11.5,
			favoriteGenre: "Kreator Gier VR",
			ipdPresetMm: 64
		}, {
			memberName: "Natalia (16 lat)",
			role: "Nastolatek",
			hoursUsed: 15,
			favoriteGenre: "Sztuka 3D i Muzyka",
			ipdPresetMm: 60
		}]
	}
];
const INITIAL_RESERVATIONS = [
	{
		id: "RES-9041A",
		equipmentId: "eq-2",
		equipmentName: "Zestaw Rodzinny DuoVR (2x Gogle + SafeVR)",
		customerId: "cust-1",
		customerName: "Marek Kowalski",
		startDate: "2026-10-25",
		endDate: "2026-10-31",
		isFamilyPlan: true,
		familyMembers: INITIAL_CUSTOMERS[0].familyMembers,
		totalPricePln: 1409,
		paymentMethod: "BLIK",
		paymentStatus: "PAID",
		status: "ACTIVE"
	},
	{
		id: "RES-8812B",
		equipmentId: "eq-1",
		equipmentName: "Vortex Vision Pro XR (8K Micro-OLED)",
		customerId: "cust-2",
		customerName: "dr inż. Karolina Nowak",
		startDate: "2026-10-24",
		endDate: "2026-10-26",
		isFamilyPlan: true,
		familyMembers: INITIAL_CUSTOMERS[1].familyMembers,
		totalPricePln: 482,
		paymentMethod: "Card",
		paymentStatus: "OVERDUE",
		status: "OVERDUE"
	},
	{
		id: "RES-7730C",
		equipmentId: "eq-3",
		equipmentName: "Rękawice Haptyczne ExoTouch Force",
		customerId: "cust-3",
		customerName: "Piotr Wiśniewski",
		startDate: "2026-10-28",
		endDate: "2026-11-02",
		isFamilyPlan: false,
		familyMembers: INITIAL_CUSTOMERS[2].familyMembers,
		totalPricePln: 495,
		paymentMethod: "ApplePay",
		paymentStatus: "PAID",
		status: "UPCOMING"
	}
];
export default function App() {
	const [lang, setLang] = useState("pl");
	const [theme, setTheme] = useState("dark");
	const [activeTab, setActiveTab] = useState("builder");
	const [projectName, setProjectName] = useState("Stacja Orbitalna Helios XR");
	// 3D Scene Builder State
	const [objects, setObjects] = useState(INITIAL_SCENE_OBJECTS);
	const [selectedObjectId, setSelectedObjectId] = useState("obj_rover_1");
	const [logicNodes, setLogicNodes] = useState(INITIAL_LOGIC_NODES);
	const [mobileConfig, setMobileConfig] = useState({
		playWithoutHeadset: false,
		controlScheme: "gyro_touch",
		ipdMm: 63,
		fovDegrees: 65,
		gyroSensitivity: 1.2,
		targetFps: 90,
		adaptiveResolutionPct: 90,
		tabletSplitUi: true
	});
	// Dock & Visual Logic Graph Sub-View & Interactive Tutorial State
	const [activeDockTab, setActiveDockTab] = useState("palette");
	const [isLogicGraphSubView, setIsLogicGraphSubView] = useState(false);
	const [tutorialModalOpen, setTutorialModalOpen] = useState(false);
	const [showLiveCoachmarks, setShowLiveCoachmarks] = useState(true);
	// Enterprise Rental, CRM & Notification State
	const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT);
	const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
	const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
	const [notifications, setNotifications] = useState([{
		id: "notif-1",
		timestamp: "05:18:42",
		type: "AVAILABILITY",
		titlePl: "Zestaw Rodzinny DuoVR dostępny w Magazynie WAW-01 (11 szt.)",
		titleEn: "Family Bundle DuoVR available in WAW-01 Depot (11 units)",
		detailPl: "Kalibracja optyczna soczewek i profili IPD zakończona pomyślnie.",
		detailEn: "Optical lens calibration and IPD presets verified."
	}, {
		id: "notif-2",
		timestamp: "05:14:10",
		type: "EMAIL_DISPATCH",
		titlePl: "Automatyczne przypomnienie o terminie zwrotu (RES-8812B)",
		titleEn: "Automated return reminder queued (RES-8812B)",
		detailPl: "System CRM wykrył zbliżający się termin zwrotu dla konta dr inż. Karolina Nowak.",
		detailEn: "CRM detected upcoming return window for dr inż. Karolina Nowak."
	}]);
	// SSO & E2E Security Session State
	const [ssoSession, setSsoSession] = useState({
		authenticated: true,
		provider: "Google Workspace SSO",
		name: "Marek Lasers (Architekt VR)",
		email: "mlasers0110@gmail.com",
		role: "Administrator Enterprise",
		e2eKeyFingerprint: "SHA256:9F:4A:2C:81:E7:0B:11:D4:55:C9",
		cloudRegion: "EU-Central (Warszawa / Frankfurt HA)"
	});
	const [ssoModalOpen, setSsoModalOpen] = useState(false);
	const [mobileExportModalOpen, setMobileExportModalOpen] = useState(false);
	// Sync Dark / Light mode class on <html>
	useEffect(() => {
		const root = document.documentElement;
		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [theme]);
	const pushNotification = (n) => {
		const newEntry = {
			...n,
			id: `notif-${Date.now().toString(36)}`,
			timestamp: new Date().toTimeString().slice(0, 8)
		};
		setNotifications((prev) => [newEntry, ...prev]);
	};
	const handleExecuteTutorialAction = (action) => {
		if (action.targetTab) {
			setActiveTab(action.targetTab);
		}
		if (action.dockTab) {
			setActiveDockTab(action.dockTab);
		}
		if (typeof action.openGraphSubView === "boolean") {
			setIsLogicGraphSubView(action.openGraphSubView);
		}
		setShowLiveCoachmarks(true);
	};
	const handleDownloadSceneJson = () => {
		const payload = {
			projectName,
			exportedAt: new Date().toISOString(),
			encryption: "AES-256-GCM-E2EE",
			mobileStandaloneConfig: mobileConfig,
			objects,
			logicNodes
		};
		const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${projectName.toLowerCase().replace(/\s+/g, "_")}_mobile_webxr.json`;
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors",
		children: [
			/* @__PURE__ */ _jsxDEV("header", {
				className: "flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950",
				children: [
					/* @__PURE__ */ _jsxDEV("a", {
						href: "#builder",
						onClick: (e) => {
							e.preventDefault();
							setActiveTab("builder");
						},
						className: "text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 font-display",
						children: "VortexVR Studio"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 420,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("nav", {
						className: "hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300",
						children: [
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#builder",
								onClick: (e) => {
									e.preventDefault();
									setActiveTab("builder");
								},
								className: `hover:text-amber-500 transition-colors whitespace-nowrap shrink-0 ${activeTab === "builder" ? "text-slate-900 dark:text-white underline underline-offset-8 decoration-amber-500 decoration-2 font-semibold" : ""}`,
								children: lang === "pl" ? "Kreator 3D" : "3D Builder"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 433,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#aistudio",
								onClick: (e) => {
									e.preventDefault();
									setActiveTab("aistudio");
								},
								className: `hover:text-amber-500 transition-colors whitespace-nowrap shrink-0 ${activeTab === "aistudio" ? "text-slate-900 dark:text-white underline underline-offset-8 decoration-amber-500 decoration-2 font-semibold" : ""}`,
								children: lang === "pl" ? "Studio AI" : "AI Studio"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 447,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#rentals",
								onClick: (e) => {
									e.preventDefault();
									setActiveTab("rentals");
								},
								className: `hover:text-amber-500 transition-colors whitespace-nowrap shrink-0 ${activeTab === "rentals" ? "text-slate-900 dark:text-white underline underline-offset-8 decoration-amber-500 decoration-2 font-semibold" : ""}`,
								children: lang === "pl" ? "Wypożyczalnia VR" : "VR Rentals"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 461,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ _jsxDEV("a", {
								href: "#crm",
								onClick: (e) => {
									e.preventDefault();
									setActiveTab("crm");
								},
								className: `hover:text-amber-500 transition-colors whitespace-nowrap shrink-0 ${activeTab === "crm" ? "text-slate-900 dark:text-white underline underline-offset-8 decoration-amber-500 decoration-2 font-semibold" : ""}`,
								children: lang === "pl" ? "CRM i Analityka" : "CRM & Analytics"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 475,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 432,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-3 shrink-0",
						children: /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setMobileExportModalOpen(true),
							className: "px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-500 rounded-lg hover:bg-amber-400 transition-colors whitespace-nowrap shrink-0",
							children: lang === "pl" ? "Eksport Mobilny i PDF" : "Mobile & PDF Export"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 493,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 492,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 418,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-wrap items-center justify-between gap-3 px-6 py-2 bg-slate-100 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 text-xs",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex md:hidden items-center gap-1",
							children: [
								"builder",
								"aistudio",
								"rentals",
								"crm"
							].map((t) => /* @__PURE__ */ _jsxDEV("button", {
								onClick: () => setActiveTab(t),
								className: `px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap ${activeTab === t ? "bg-amber-500 text-slate-950 font-semibold" : "text-slate-600 dark:text-slate-400"}`,
								children: t.toUpperCase()
							}, t, false, {
								fileName: _jsxFileName,
								lineNumber: 507,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 505,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("span", {
							className: "text-slate-600 dark:text-slate-400 font-mono",
							children: [
								"SSO: ",
								/* @__PURE__ */ _jsxDEV("strong", {
									className: "text-slate-900 dark:text-slate-200",
									children: ssoSession.provider
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 522,
									columnNumber: 18
								}, this),
								" (",
								ssoSession.email,
								")"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 521,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("span", {
							"aria-hidden": "true",
							className: "text-slate-400",
							children: "·"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 524,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("span", {
							className: "text-emerald-600 dark:text-emerald-400 font-mono hidden sm:inline",
							children: ["E2EE AES-256-GCM · ", ssoSession.cloudRegion]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 525,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 504,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setTutorialModalOpen(true),
							className: "px-3 py-1 rounded bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-colors flex items-center gap-1.5 whitespace-nowrap",
							children: [/* @__PURE__ */ _jsxDEV(HelpCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 536,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "Samouczek: Gdzie Klikać i Dodawać Grafiki" : "Tutorial & Graphics Guide" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 537,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 532,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setShowLiveCoachmarks((c) => !c),
							className: `px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${showLiveCoachmarks ? "bg-amber-500/15 border-amber-500/50 text-amber-600 dark:text-amber-300 font-semibold" : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"}`,
							children: showLiveCoachmarks ? lang === "pl" ? "Dymki Podpowiedzi: WŁ." : "Live Hints: ON" : lang === "pl" ? "Dymki Podpowiedzi: WYŁ." : "Live Hints: OFF"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 540,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setSsoModalOpen(true),
							className: "px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500 transition-colors flex items-center gap-1.5 whitespace-nowrap",
							children: [/* @__PURE__ */ _jsxDEV(KeyRound, { className: "w-3.5 h-3.5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 561,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "Konto SSO" : "SSO Vault" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 562,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 557,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setLang((l) => l === "pl" ? "en" : "pl"),
							className: "px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500 transition-colors flex items-center gap-1 font-mono whitespace-nowrap",
							children: [/* @__PURE__ */ _jsxDEV(Globe, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 569,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "PL / EN" : "EN / PL" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 570,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 565,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setTheme((t) => t === "dark" ? "light" : "dark"),
							className: "px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-amber-500 transition-colors flex items-center gap-1 whitespace-nowrap",
							children: theme === "dark" ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Sun, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 579,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "Jasny" : "Light" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 580,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 578,
								columnNumber: 15
							}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Moon, { className: "w-3.5 h-3.5 text-slate-700" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 584,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "Ciemny" : "Dark" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 585,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 583,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 573,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 531,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 503,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("main", { children: [
				activeTab === "builder" && /* @__PURE__ */ _jsxDEV(VrViewport3D, {
					lang,
					objects,
					setObjects,
					selectedObjectId,
					setSelectedObjectId,
					logicNodes,
					setLogicNodes,
					mobileConfig,
					setMobileConfig,
					onOpenAiStudioForSelected: () => setActiveTab("aistudio"),
					onExportMobileBundle: () => setMobileExportModalOpen(true),
					activeDockTab,
					setActiveDockTab,
					isLogicGraphSubView,
					setIsLogicGraphSubView,
					showLiveCoachmarks,
					setShowLiveCoachmarks,
					onOpenTutorialModal: () => setTutorialModalOpen(true)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 595,
					columnNumber: 11
				}, this),
				activeTab === "aistudio" && /* @__PURE__ */ _jsxDEV(AiStudioAndDocsPanel, {
					lang,
					projectName,
					setProjectName,
					objects,
					setObjects,
					selectedObjectId,
					setSelectedObjectId,
					logicNodes,
					mobileConfig,
					setMobileConfig,
					onSwitchToViewport: () => setActiveTab("builder")
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 618,
					columnNumber: 11
				}, this),
				activeTab === "rentals" && /* @__PURE__ */ _jsxDEV(RentalCalendarAndFleet, {
					lang,
					equipment,
					setEquipment,
					reservations,
					setReservations,
					customers,
					setCustomers,
					notifications,
					pushNotification
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 634,
					columnNumber: 11
				}, this),
				activeTab === "crm" && /* @__PURE__ */ _jsxDEV(CrmAdminWarehouseHub, {
					lang,
					equipment,
					reservations,
					customers,
					setCustomers,
					ssoSession,
					pushNotification
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 648,
					columnNumber: 11
				}, this)
			] }, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 593,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV(InteractiveTutorialGuide, {
				lang,
				isOpen: tutorialModalOpen,
				onClose: () => setTutorialModalOpen(false),
				showLiveCoachmarks,
				setShowLiveCoachmarks,
				onExecuteStepAction: handleExecuteTutorialAction
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 661,
				columnNumber: 7
			}, this),
			ssoModalOpen && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3",
							children: [/* @__PURE__ */ _jsxDEV("h3", {
								className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(ShieldCheck, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 676,
									columnNumber: 17
								}, this), lang === "pl" ? "Logowanie Enterprise SSO i Szyfrowanie End-to-End" : "Enterprise SSO Authentication & E2EE Security"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 675,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								onClick: () => setSsoModalOpen(false),
								className: "p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800",
								children: /* @__PURE__ */ _jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 685,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 681,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 674,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-3 text-xs",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "text-slate-600 dark:text-slate-400",
									children: lang === "pl" ? "Wybierz dostawcę tożsamości Single Sign-On (SAML 2.0 / OIDC) oraz region klastra wysokiej dostępności:" : "Select your Single Sign-On identity provider (SAML 2.0 / OIDC) and high-availability cloud region:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 690,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "grid grid-cols-2 gap-2.5",
									children: [
										"Google Workspace SSO",
										"Microsoft Entra ID",
										"Okta SAML 2.0",
										"Hardware Passkey"
									].map((prov) => /* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setSsoSession((prev) => ({
											...prev,
											provider: prov,
											e2eKeyFingerprint: `SHA256:${Math.random().toString(16).slice(2, 10).toUpperCase()}:E2EE`
										})),
										className: `p-3 rounded-lg border text-left font-medium transition-colors ${ssoSession.provider === prov ? "border-amber-500 bg-amber-500/10 text-slate-900 dark:text-white font-semibold" : "border-slate-200 dark:border-slate-800 hover:border-slate-400"}`,
										children: [/* @__PURE__ */ _jsxDEV("div", { children: prov }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 720,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("div", {
											className: "text-[10px] font-mono text-slate-500 mt-0.5",
											children: "OIDC + MFA Verified"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 721,
											columnNumber: 21
										}, this)]
									}, prov, true, {
										fileName: _jsxFileName,
										lineNumber: 705,
										columnNumber: 19
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 696,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "p-3.5 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-[11px] space-y-1",
									children: [
										/* @__PURE__ */ _jsxDEV("div", { children: [
											"USER: ",
											ssoSession.name,
											" (",
											ssoSession.email,
											")"
										] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 727,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("div", { children: ["ROLE: ", ssoSession.role] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 728,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "text-emerald-600 dark:text-emerald-400",
											children: ["E2EE FINGERPRINT: ", ssoSession.e2eKeyFingerprint]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 729,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("div", { children: ["CLOUD CLUSTER: ", ssoSession.cloudRegion] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 732,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 726,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 689,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ _jsxDEV("button", {
								onClick: () => setSsoModalOpen(false),
								className: "px-5 py-2 rounded-lg text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400",
								children: lang === "pl" ? "Zatwierdź Sesję SSO" : "Confirm SSO Session"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 737,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 736,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 673,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 672,
				columnNumber: 9
			}, this),
			mobileExportModalOpen && /* @__PURE__ */ _jsxDEV("div", {
				className: "fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "w-full max-w-xl rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3",
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Smartphone, { className: "w-5 h-5 text-amber-500" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 754,
								columnNumber: 17
							}, this), lang === "pl" ? "Natychmiastowy Eksport na Urządzenia Mobilne oraz Raporty PDF" : "Instant Mobile Device Export & Enterprise PDF Reports"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 753,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setMobileExportModalOpen(false),
							className: "p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800",
							children: /* @__PURE__ */ _jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 763,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 759,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 752,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-4 text-xs",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "font-semibold text-slate-900 dark:text-white text-sm",
									children: lang === "pl" ? "1. Pakiet Mobilny WebXR / Smartfon i Tablet (.GLTF / .JSON Bundle)" : "1. Mobile WebXR / Standalone Phone & Tablet Package (.GLTF / .JSON)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 769,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-slate-600 dark:text-slate-400",
									children: lang === "pl" ? `Zawiera ${objects.length} modeli kompozytowych 3D, ${logicNodes.length} połączonych węzłów logiki No-Code oraz profil sterowania żyroskopem (IPD ${mobileConfig.ipdMm}mm, ${mobileConfig.fovDegrees}° FOV).` : `Includes ${objects.length} composite 3D actors, ${logicNodes.length} wired No-Code logic nodes, and mobile gyroscope profile (IPD ${mobileConfig.ipdMm}mm, ${mobileConfig.fovDegrees}° FOV).`
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 774,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: handleDownloadSceneJson,
									className: "mt-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold inline-flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 783,
										columnNumber: 19
									}, this), lang === "pl" ? "Pobierz Pakiet Mobilny Sceny 3D (.JSON / WebXR)" : "Download Mobile 3D Scene Bundle (.JSON / WebXR)"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 779,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 768,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "font-semibold text-slate-900 dark:text-white text-sm",
									children: lang === "pl" ? "2. Zbiorczy Raport Enterprise PDF (Sprzedaż, Kalendarz, CRM Rodzinny, Magazyn API)" : "2. Master Enterprise PDF Report (Sales, Calendar, Family CRM, Warehouse API)"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 791,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-slate-600 dark:text-slate-400",
									children: lang === "pl" ? "Generuje pełny dokument PDF obejmujący analitykę wypożyczeń, statystyki rodzinne CRM, punkty lojalnościowe oraz stany magazynowe WMS." : "Generates a complete PDF report covering rental analytics, family sharing CRM stats, loyalty points, and WMS stock."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 796,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => exportEnterpriseMasterReportPdf(equipment, reservations, customers, []),
									className: "mt-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-700 font-semibold inline-flex items-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 807,
										columnNumber: 19
									}, this), lang === "pl" ? "Eksportuj Zbiorczy Raport PDF" : "Export Master Enterprise PDF"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 801,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 790,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 767,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 751,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 750,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 416,
		columnNumber: 5
	}, this);
}

//# sourceMappingURL=data:application/json;base64,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OztHQUNGOzs7OztFQUVKOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJBcHAudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQ3VzdG9tZXJDcm1Qcm9maWxlLFxuICBMYW5ndWFnZSxcbiAgTGl2ZU5vdGlmaWNhdGlvbixcbiAgTG9naWNOb2RlLFxuICBNb2JpbGVTdGFuZGFsb25lQ29uZmlnLFxuICBSZW50YWxSZXNlcnZhdGlvbixcbiAgU2NlbmVPYmplY3QsXG4gIFNzb1VzZXJTZXNzaW9uLFxuICBUaGVtZU1vZGUsXG4gIFZyRXF1aXBtZW50SXRlbSxcbn0gZnJvbSAnLi90eXBlcy92cic7XG5pbXBvcnQgeyBWclZpZXdwb3J0M0QgfSBmcm9tICcuL2NvbXBvbmVudHMvVnJWaWV3cG9ydDNEJztcbmltcG9ydCB7IEFpU3R1ZGlvQW5kRG9jc1BhbmVsIH0gZnJvbSAnLi9jb21wb25lbnRzL0FpU3R1ZGlvQW5kRG9jc1BhbmVsJztcbmltcG9ydCB7IFJlbnRhbENhbGVuZGFyQW5kRmxlZXQgfSBmcm9tICcuL2NvbXBvbmVudHMvUmVudGFsQ2FsZW5kYXJBbmRGbGVldCc7XG5pbXBvcnQgeyBDcm1BZG1pbldhcmVob3VzZUh1YiB9IGZyb20gJy4vY29tcG9uZW50cy9Dcm1BZG1pbldhcmVob3VzZUh1Yic7XG5pbXBvcnQge1xuICBJbnRlcmFjdGl2ZVR1dG9yaWFsR3VpZGUsXG4gIFR1dG9yaWFsU3RlcEFjdGlvbixcbn0gZnJvbSAnLi9jb21wb25lbnRzL0ludGVyYWN0aXZlVHV0b3JpYWxHdWlkZSc7XG5pbXBvcnQgeyBleHBvcnRFbnRlcnByaXNlTWFzdGVyUmVwb3J0UGRmIH0gZnJvbSAnLi91dGlscy9wZGZFeHBvcnQnO1xuaW1wb3J0IHtcbiAgU2hpZWxkQ2hlY2ssXG4gIFN1bixcbiAgTW9vbixcbiAgR2xvYmUsXG4gIEtleVJvdW5kLFxuICBTbWFydHBob25lLFxuICBEb3dubG9hZCxcbiAgSGVscENpcmNsZSxcbiAgWCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuY29uc3QgSU5JVElBTF9TQ0VORV9PQkpFQ1RTOiBTY2VuZU9iamVjdFtdID0gW1xuICB7XG4gICAgaWQ6ICdvYmpfcm92ZXJfMScsXG4gICAgbmFtZTogJ8WBYXppayBFa3NwbG9yYWN5am55IEhlbGlvcyAjMScsXG4gICAgdHlwZTogJ3JvdmVyJyxcbiAgICBwb3NpdGlvbjogWy0yLjgsIDAsIDEuMl0sXG4gICAgcm90YXRpb25ZOiAyOCxcbiAgICBzY2FsZTogMS4wNSxcbiAgICBjb2xvcjogJyNFMkU4RjAnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnI0Y1OUUwQicsXG4gICAgcm91Z2huZXNzOiAwLjI0LFxuICAgIG1ldGFsbmVzczogMC44MixcbiAgICB0cmlhbmdsZXM6IDE0MjAsXG4gICAgcGFydHNDb3VudDogOCxcbiAgICBhbmltYXRpb246IHsgdHJhamVjdG9yeVR5cGU6ICdub25lJywgc3BlZWQ6IDEuMCwgYW1wbGl0dWRlOiAwLjMgfSxcbiAgfSxcbiAge1xuICAgIGlkOiAnb2JqX3BvcnRhbF8yJyxcbiAgICBuYW1lOiAnQnJhbWEgS3dhbnRvd2EgTmV4dXMgIzInLFxuICAgIHR5cGU6ICdwb3J0YWwnLFxuICAgIHBvc2l0aW9uOiBbMCwgMCwgLTMuMl0sXG4gICAgcm90YXRpb25ZOiAwLFxuICAgIHNjYWxlOiAxLjE1LFxuICAgIGNvbG9yOiAnIzFFMjkzQicsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjMzhCREY4JyxcbiAgICByb3VnaG5lc3M6IDAuMTgsXG4gICAgbWV0YWxuZXNzOiAwLjksXG4gICAgdHJpYW5nbGVzOiAxNjQwLFxuICAgIHBhcnRzQ291bnQ6IDUsXG4gICAgYW5pbWF0aW9uOiB7IHRyYWplY3RvcnlUeXBlOiAncHVsc2UnLCBzcGVlZDogMS4yLCBhbXBsaXR1ZGU6IDAuMjUgfSxcbiAgfSxcbiAge1xuICAgIGlkOiAnb2JqX2NyeXN0YWxfMycsXG4gICAgbmFtZTogJ01vbm9saXQgS3J5c3p0YcWCb3d5ICMzJyxcbiAgICB0eXBlOiAnY3J5c3RhbCcsXG4gICAgcG9zaXRpb246IFszLjIsIDAsIDEuNV0sXG4gICAgcm90YXRpb25ZOiA0NSxcbiAgICBzY2FsZTogMS4wLFxuICAgIGNvbG9yOiAnIzAyODRDNycsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjRjU5RTBCJyxcbiAgICByb3VnaG5lc3M6IDAuMTIsXG4gICAgbWV0YWxuZXNzOiAwLjg4LFxuICAgIHRyaWFuZ2xlczogNjgwLFxuICAgIHBhcnRzQ291bnQ6IDQsXG4gICAgYW5pbWF0aW9uOiB7IHRyYWplY3RvcnlUeXBlOiAnaG92ZXInLCBzcGVlZDogMS41LCBhbXBsaXR1ZGU6IDAuNCB9LFxuICB9LFxuICB7XG4gICAgaWQ6ICdvYmpfZHJvbmVfNCcsXG4gICAgbmFtZTogJ0Ryb24gWndpYWRvd2N6eSA2LURvRiAjNCcsXG4gICAgdHlwZTogJ2Ryb25lJyxcbiAgICBwb3NpdGlvbjogWzEuNiwgMC40LCAtMC41XSxcbiAgICByb3RhdGlvblk6IC0yMCxcbiAgICBzY2FsZTogMC45NSxcbiAgICBjb2xvcjogJyMzMzQxNTUnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnIzEwQjk4MScsXG4gICAgcm91Z2huZXNzOiAwLjI4LFxuICAgIG1ldGFsbmVzczogMC43OCxcbiAgICB0cmlhbmdsZXM6IDk2MCxcbiAgICBwYXJ0c0NvdW50OiA1LFxuICAgIGFuaW1hdGlvbjogeyB0cmFqZWN0b3J5VHlwZTogJ29yYml0Jywgc3BlZWQ6IDEuMSwgYW1wbGl0dWRlOiAwLjU1IH0sXG4gIH0sXG5dO1xuXG5jb25zdCBJTklUSUFMX0xPR0lDX05PREVTOiBMb2dpY05vZGVbXSA9IFtcbiAge1xuICAgIGlkOiAncnVsZV8xJyxcbiAgICBuYW1lOiAnMS4gQ2h3eXQgS3J5c3p0YcWCdSAoKzEwMCBQS1QpJyxcbiAgICB0YXJnZXRPYmplY3RJZDogJ29ial9jcnlzdGFsXzMnLFxuICAgIGV2ZW50OiAnT25HcmFiQ2xpY2snLFxuICAgIGFjdGlvbjogJ0F3YXJkUG9pbnRzMTAwJyxcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIHBvc2l0aW9uOiB7IHg6IDMyLCB5OiAyNiB9LFxuICAgIGRlcGVuZHNPbklkczogW10sXG4gIH0sXG4gIHtcbiAgICBpZDogJ3J1bGVfMicsXG4gICAgbmFtZTogJzIuIE9icsOzdCBUdXJibyBCcmFteScsXG4gICAgdGFyZ2V0T2JqZWN0SWQ6ICdvYmpfcG9ydGFsXzInLFxuICAgIGV2ZW50OiAnT25HYXplJyxcbiAgICBhY3Rpb246ICdUb2dnbGVUdXJib1NwaW4nLFxuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgcG9zaXRpb246IHsgeDogMzU1LCB5OiAyNiB9LFxuICAgIGRlcGVuZHNPbklkczogWydydWxlXzEnXSxcbiAgfSxcbiAge1xuICAgIGlkOiAncnVsZV8zJyxcbiAgICBuYW1lOiAnMy4gSW1wdWxzIFJlem9uYW5zdSBEcm9uYScsXG4gICAgdGFyZ2V0T2JqZWN0SWQ6ICdvYmpfZHJvbmVfNCcsXG4gICAgZXZlbnQ6ICdPblByb3hpbWl0eScsXG4gICAgYWN0aW9uOiAnUHVsc2VFbWlzc2l2ZScsXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICBwb3NpdGlvbjogeyB4OiA2ODAsIHk6IDI2IH0sXG4gICAgZGVwZW5kc09uSWRzOiBbJ3J1bGVfMiddLFxuICB9LFxuXTtcblxuY29uc3QgSU5JVElBTF9FUVVJUE1FTlQ6IFZyRXF1aXBtZW50SXRlbVtdID0gW1xuICB7XG4gICAgaWQ6ICdlcS0xJyxcbiAgICBza3U6ICdWUi1ITUQtUFJPLTAxJyxcbiAgICBuYW1lUGw6ICdWb3J0ZXggVmlzaW9uIFBybyBYUiAoOEsgTWljcm8tT0xFRCknLFxuICAgIG5hbWVFbjogJ1ZvcnRleCBWaXNpb24gUHJvIFhSICg4SyBNaWNyby1PTEVEKScsXG4gICAgY2F0ZWdvcnk6ICdoZWFkc2V0JyxcbiAgICBkYWlseVJhdGVQbG46IDE0OSxcbiAgICBsb3lhbHR5UG9pbnRzRWFybmVkOiAxMjAsXG4gICAgYXZhaWxhYmxlVW5pdHM6IDE0LFxuICAgIHRvdGFsVW5pdHM6IDIwLFxuICAgIHNwZWNzOiAnMnggNEsgTWljcm8tT0xFRCwgMTEwwrAgRk9WLCBFeWUtVHJhY2tpbmcsIFdpLUZpIDcsIEF1dG9tYXR5Y3puZSBJUEQgNTQtNzJtbScsXG4gICAgZmFtaWx5U2hhcmVhYmxlOiB0cnVlLFxuICAgIG1heEZhbWlseU1lbWJlcnM6IDUsXG4gICAgYmF0dGVyeVBjdDogOTgsXG4gICAgZGVwb3RDaXR5OiAnV2Fyc3phd2EnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdlcS0yJyxcbiAgICBza3U6ICdWUi1GQU0tUEFDSy0wNCcsXG4gICAgbmFtZVBsOiAnWmVzdGF3IFJvZHppbm55IER1b1ZSICgyeCBHb2dsZSArIFNhZmVWUiknLFxuICAgIG5hbWVFbjogJ0ZhbWlseSBCdW5kbGUgRHVvVlIgKDJ4IEhlYWRzZXRzICsgU2FmZVZSKScsXG4gICAgY2F0ZWdvcnk6ICdmYW1pbHlfYnVuZGxlJyxcbiAgICBkYWlseVJhdGVQbG46IDIyOSxcbiAgICBsb3lhbHR5UG9pbnRzRWFybmVkOiAyNTAsXG4gICAgYXZhaWxhYmxlVW5pdHM6IDExLFxuICAgIHRvdGFsVW5pdHM6IDE2LFxuICAgIHNwZWNzOiAnMnggR29nbGUgQmV6cHJ6ZXdvZG93ZSwgNHggS29udHJvbGVyLCBQcm9maWxlIFJvZHppbm5lIElQRCwgS29udHJvbGEgUm9kemljaWVsc2thIENSTScsXG4gICAgZmFtaWx5U2hhcmVhYmxlOiB0cnVlLFxuICAgIG1heEZhbWlseU1lbWJlcnM6IDYsXG4gICAgYmF0dGVyeVBjdDogOTcsXG4gICAgZGVwb3RDaXR5OiAnV2Fyc3phd2EnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdlcS0zJyxcbiAgICBza3U6ICdWUi1HTFYtSEFQLTAyJyxcbiAgICBuYW1lUGw6ICdSxJlrYXdpY2UgSGFwdHljem5lIEV4b1RvdWNoIEZvcmNlJyxcbiAgICBuYW1lRW46ICdFeG9Ub3VjaCBGb3JjZS1GZWVkYmFjayBIYXB0aWMgR2xvdmVzJyxcbiAgICBjYXRlZ29yeTogJ2hhcHRpYycsXG4gICAgZGFpbHlSYXRlUGxuOiA5OSxcbiAgICBsb3lhbHR5UG9pbnRzRWFybmVkOiA5MCxcbiAgICBhdmFpbGFibGVVbml0czogOSxcbiAgICB0b3RhbFVuaXRzOiAxMixcbiAgICBzcGVjczogJ1NpxYJvd2Ugc3ByesSZxbxlbmllIHp3cm90bmUgMTAgcGFsY8OzdywgbWlrcm8tc2nFgm93bmlraSBvcG9yb3dlLCBjemFzIHByYWN5IDhoJyxcbiAgICBmYW1pbHlTaGFyZWFibGU6IHRydWUsXG4gICAgbWF4RmFtaWx5TWVtYmVyczogNCxcbiAgICBiYXR0ZXJ5UGN0OiA5NSxcbiAgICBkZXBvdENpdHk6ICdLcmFrw7N3JyxcbiAgfSxcbiAge1xuICAgIGlkOiAnZXEtNCcsXG4gICAgc2t1OiAnVlItVFJELU9NTi0wMycsXG4gICAgbmFtZVBsOiAnQmllxbxuaWEgV2llbG9raWVydW5rb3dhIEN5YmVyV2FsayAzNjAnLFxuICAgIG5hbWVFbjogJ0N5YmVyV2FsayAzNjAgT21uaWRpcmVjdGlvbmFsIFRyZWFkbWlsbCcsXG4gICAgY2F0ZWdvcnk6ICd0cmVhZG1pbGwnLFxuICAgIGRhaWx5UmF0ZVBsbjogMjg5LFxuICAgIGxveWFsdHlQb2ludHNFYXJuZWQ6IDMwMCxcbiAgICBhdmFpbGFibGVVbml0czogNCxcbiAgICB0b3RhbFVuaXRzOiA2LFxuICAgIHNwZWNzOiAnU3dvYm9kbnkgY2jDs2QgaSBiaWVnIDM2MMKwIHcgbWllanNjdSwgdXByesSFxbwgbWFnbmV0eWN6bmEsIGN6dWpuaWtpIGtyb2vDs3cgNi1Eb0YnLFxuICAgIGZhbWlseVNoYXJlYWJsZTogZmFsc2UsXG4gICAgbWF4RmFtaWx5TWVtYmVyczogMixcbiAgICBiYXR0ZXJ5UGN0OiAxMDAsXG4gICAgZGVwb3RDaXR5OiAnV3JvY8WCYXcnLFxuICB9LFxuXTtcblxuY29uc3QgSU5JVElBTF9DVVNUT01FUlM6IEN1c3RvbWVyQ3JtUHJvZmlsZVtdID0gW1xuICB7XG4gICAgaWQ6ICdjdXN0LTEnLFxuICAgIGZ1bGxOYW1lOiAnTWFyZWsgS293YWxza2knLFxuICAgIGVtYWlsOiAnbS5rb3dhbHNraUByb2R6aW5hLXZyLnBsJyxcbiAgICBwaG9uZTogJys0OCA2MDIgNDkxIDgyMCcsXG4gICAgY29tcGFueU9yRmFtaWx5TmFtZTogJ1JvZHppbmEgS293YWxza2ljaCAoS29udG8gRmFtaWx5IFBvb2wpJyxcbiAgICB0aWVyOiAnUGxhdGludW0gVlInLFxuICAgIGxveWFsdHlQb2ludHM6IDI0ODAsXG4gICAgdG90YWxTcGVudFBsbjogNDI5MCxcbiAgICBhY3RpdmVSZW50YWxzQ291bnQ6IDIsXG4gICAgb3ZlcmR1ZUNvdW50OiAwLFxuICAgIGZhbWlseU1lbWJlcnM6IFtcbiAgICAgIHsgbWVtYmVyTmFtZTogJ01hcmVrIChPamNpZWMpJywgcm9sZTogJ1JvZHppYyAvIEFkbWluJywgaG91cnNVc2VkOiAxOC41LCBmYXZvcml0ZUdlbnJlOiAnU3ltdWxhdG9yeSBMb3R1IFhSJywgaXBkUHJlc2V0TW06IDY1IH0sXG4gICAgICB7IG1lbWJlck5hbWU6ICdBbm5hIChNYXRrYSknLCByb2xlOiAnUGFydG5lcicsIGhvdXJzVXNlZDogMTIuMCwgZmF2b3JpdGVHZW5yZTogJ0FyY2hpdGVrdHVyYSAzRCBpIEZpdG5lc3MnLCBpcGRQcmVzZXRNbTogNjEgfSxcbiAgICAgIHsgbWVtYmVyTmFtZTogJ0thY3BlciAoMTUgbGF0KScsIHJvbGU6ICdOYXN0b2xhdGVrJywgaG91cnNVc2VkOiAyNC41LCBmYXZvcml0ZUdlbnJlOiAnV3nFm2NpZ2kgaSBTY2ktRmknLCBpcGRQcmVzZXRNbTogNjAgfSxcbiAgICAgIHsgbWVtYmVyTmFtZTogJ1pvc2lhICg5IGxhdCknLCByb2xlOiAnRHppZWNrbyAoVHJ5YiBTYWZlVlIpJywgaG91cnNVc2VkOiA2LjUsIGZhdm9yaXRlR2VucmU6ICdFZHVrYWNqYSBLb3NtaWN6bmEnLCBpcGRQcmVzZXRNbTogNTUgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgaWQ6ICdjdXN0LTInLFxuICAgIGZ1bGxOYW1lOiAnZHIgaW7FvC4gS2Fyb2xpbmEgTm93YWsnLFxuICAgIGVtYWlsOiAnay5ub3dha0BlZHVsYWIta3Jha293LnBsJyxcbiAgICBwaG9uZTogJys0OCA1MTEgODM5IDEwNCcsXG4gICAgY29tcGFueU9yRmFtaWx5TmFtZTogJ1JvZHppbmEgTm93YWsgJiBFZHVMYWIgU3R1ZGlvJyxcbiAgICB0aWVyOiAnR29sZCcsXG4gICAgbG95YWx0eVBvaW50czogMTY0MCxcbiAgICB0b3RhbFNwZW50UGxuOiAyODUwLFxuICAgIGFjdGl2ZVJlbnRhbHNDb3VudDogMSxcbiAgICBvdmVyZHVlQ291bnQ6IDEsXG4gICAgZmFtaWx5TWVtYmVyczogW1xuICAgICAgeyBtZW1iZXJOYW1lOiAnS2Fyb2xpbmEnLCByb2xlOiAnUm9kemljIC8gQWRtaW4nLCBob3Vyc1VzZWQ6IDIxLjAsIGZhdm9yaXRlR2VucmU6ICdQcm9qZWt0b3dhbmllIFNjZW4gM0QnLCBpcGRQcmVzZXRNbTogNjIgfSxcbiAgICAgIHsgbWVtYmVyTmFtZTogJ1RvbWFzeicsIHJvbGU6ICdQYXJ0bmVyJywgaG91cnNVc2VkOiAxNC4yLCBmYXZvcml0ZUdlbnJlOiAnRWtzcGxvcmFjamEgVlInLCBpcGRQcmVzZXRNbTogNjYgfSxcbiAgICAgIHsgbWVtYmVyTmFtZTogJ01pY2hhxYIgKDEzIGxhdCknLCByb2xlOiAnTmFzdG9sYXRlaycsIGhvdXJzVXNlZDogMTYuMCwgZmF2b3JpdGVHZW5yZTogJ0dyeSBacsSZY3pub8WbY2lvd2UnLCBpcGRQcmVzZXRNbTogNTkgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgaWQ6ICdjdXN0LTMnLFxuICAgIGZ1bGxOYW1lOiAnUGlvdHIgV2nFm25pZXdza2knLFxuICAgIGVtYWlsOiAncGlvdHIud2lzbmlld3NraUBjeWJlcmFyY2hpdGVjdHMuZXUnLFxuICAgIHBob25lOiAnKzQ4IDc5MCAzMTIgNDQwJyxcbiAgICBjb21wYW55T3JGYW1pbHlOYW1lOiAnUm9kemluYSBXacWbbmlld3NraWNoJyxcbiAgICB0aWVyOiAnU2lsdmVyJyxcbiAgICBsb3lhbHR5UG9pbnRzOiA4OTAsXG4gICAgdG90YWxTcGVudFBsbjogMTQ5MCxcbiAgICBhY3RpdmVSZW50YWxzQ291bnQ6IDEsXG4gICAgb3ZlcmR1ZUNvdW50OiAwLFxuICAgIGZhbWlseU1lbWJlcnM6IFtcbiAgICAgIHsgbWVtYmVyTmFtZTogJ1Bpb3RyJywgcm9sZTogJ1JvZHppYyAvIEFkbWluJywgaG91cnNVc2VkOiAxMS41LCBmYXZvcml0ZUdlbnJlOiAnS3JlYXRvciBHaWVyIFZSJywgaXBkUHJlc2V0TW06IDY0IH0sXG4gICAgICB7IG1lbWJlck5hbWU6ICdOYXRhbGlhICgxNiBsYXQpJywgcm9sZTogJ05hc3RvbGF0ZWsnLCBob3Vyc1VzZWQ6IDE1LjAsIGZhdm9yaXRlR2VucmU6ICdTenR1a2EgM0QgaSBNdXp5a2EnLCBpcGRQcmVzZXRNbTogNjAgfSxcbiAgICBdLFxuICB9LFxuXTtcblxuY29uc3QgSU5JVElBTF9SRVNFUlZBVElPTlM6IFJlbnRhbFJlc2VydmF0aW9uW10gPSBbXG4gIHtcbiAgICBpZDogJ1JFUy05MDQxQScsXG4gICAgZXF1aXBtZW50SWQ6ICdlcS0yJyxcbiAgICBlcXVpcG1lbnROYW1lOiAnWmVzdGF3IFJvZHppbm55IER1b1ZSICgyeCBHb2dsZSArIFNhZmVWUiknLFxuICAgIGN1c3RvbWVySWQ6ICdjdXN0LTEnLFxuICAgIGN1c3RvbWVyTmFtZTogJ01hcmVrIEtvd2Fsc2tpJyxcbiAgICBzdGFydERhdGU6ICcyMDI2LTEwLTI1JyxcbiAgICBlbmREYXRlOiAnMjAyNi0xMC0zMScsXG4gICAgaXNGYW1pbHlQbGFuOiB0cnVlLFxuICAgIGZhbWlseU1lbWJlcnM6IElOSVRJQUxfQ1VTVE9NRVJTWzBdLmZhbWlseU1lbWJlcnMsXG4gICAgdG90YWxQcmljZVBsbjogMTQwOSxcbiAgICBwYXltZW50TWV0aG9kOiAnQkxJSycsXG4gICAgcGF5bWVudFN0YXR1czogJ1BBSUQnLFxuICAgIHN0YXR1czogJ0FDVElWRScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ1JFUy04ODEyQicsXG4gICAgZXF1aXBtZW50SWQ6ICdlcS0xJyxcbiAgICBlcXVpcG1lbnROYW1lOiAnVm9ydGV4IFZpc2lvbiBQcm8gWFIgKDhLIE1pY3JvLU9MRUQpJyxcbiAgICBjdXN0b21lcklkOiAnY3VzdC0yJyxcbiAgICBjdXN0b21lck5hbWU6ICdkciBpbsW8LiBLYXJvbGluYSBOb3dhaycsXG4gICAgc3RhcnREYXRlOiAnMjAyNi0xMC0yNCcsXG4gICAgZW5kRGF0ZTogJzIwMjYtMTAtMjYnLFxuICAgIGlzRmFtaWx5UGxhbjogdHJ1ZSxcbiAgICBmYW1pbHlNZW1iZXJzOiBJTklUSUFMX0NVU1RPTUVSU1sxXS5mYW1pbHlNZW1iZXJzLFxuICAgIHRvdGFsUHJpY2VQbG46IDQ4MixcbiAgICBwYXltZW50TWV0aG9kOiAnQ2FyZCcsXG4gICAgcGF5bWVudFN0YXR1czogJ09WRVJEVUUnLFxuICAgIHN0YXR1czogJ09WRVJEVUUnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdSRVMtNzczMEMnLFxuICAgIGVxdWlwbWVudElkOiAnZXEtMycsXG4gICAgZXF1aXBtZW50TmFtZTogJ1LEmWthd2ljZSBIYXB0eWN6bmUgRXhvVG91Y2ggRm9yY2UnLFxuICAgIGN1c3RvbWVySWQ6ICdjdXN0LTMnLFxuICAgIGN1c3RvbWVyTmFtZTogJ1Bpb3RyIFdpxZtuaWV3c2tpJyxcbiAgICBzdGFydERhdGU6ICcyMDI2LTEwLTI4JyxcbiAgICBlbmREYXRlOiAnMjAyNi0xMS0wMicsXG4gICAgaXNGYW1pbHlQbGFuOiBmYWxzZSxcbiAgICBmYW1pbHlNZW1iZXJzOiBJTklUSUFMX0NVU1RPTUVSU1syXS5mYW1pbHlNZW1iZXJzLFxuICAgIHRvdGFsUHJpY2VQbG46IDQ5NSxcbiAgICBwYXltZW50TWV0aG9kOiAnQXBwbGVQYXknLFxuICAgIHBheW1lbnRTdGF0dXM6ICdQQUlEJyxcbiAgICBzdGF0dXM6ICdVUENPTUlORycsXG4gIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IFtsYW5nLCBzZXRMYW5nXSA9IHVzZVN0YXRlPExhbmd1YWdlPigncGwnKTtcbiAgY29uc3QgW3RoZW1lLCBzZXRUaGVtZV0gPSB1c2VTdGF0ZTxUaGVtZU1vZGU+KCdkYXJrJyk7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTwnYnVpbGRlcicgfCAnYWlzdHVkaW8nIHwgJ3JlbnRhbHMnIHwgJ2NybSc+KCdidWlsZGVyJyk7XG4gIGNvbnN0IFtwcm9qZWN0TmFtZSwgc2V0UHJvamVjdE5hbWVdID0gdXNlU3RhdGU8c3RyaW5nPignU3RhY2phIE9yYml0YWxuYSBIZWxpb3MgWFInKTtcblxuICAvLyAzRCBTY2VuZSBCdWlsZGVyIFN0YXRlXG4gIGNvbnN0IFtvYmplY3RzLCBzZXRPYmplY3RzXSA9IHVzZVN0YXRlPFNjZW5lT2JqZWN0W10+KElOSVRJQUxfU0NFTkVfT0JKRUNUUyk7XG4gIGNvbnN0IFtzZWxlY3RlZE9iamVjdElkLCBzZXRTZWxlY3RlZE9iamVjdElkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KCdvYmpfcm92ZXJfMScpO1xuICBjb25zdCBbbG9naWNOb2Rlcywgc2V0TG9naWNOb2Rlc10gPSB1c2VTdGF0ZTxMb2dpY05vZGVbXT4oSU5JVElBTF9MT0dJQ19OT0RFUyk7XG4gIGNvbnN0IFttb2JpbGVDb25maWcsIHNldE1vYmlsZUNvbmZpZ10gPSB1c2VTdGF0ZTxNb2JpbGVTdGFuZGFsb25lQ29uZmlnPih7XG4gICAgcGxheVdpdGhvdXRIZWFkc2V0OiBmYWxzZSxcbiAgICBjb250cm9sU2NoZW1lOiAnZ3lyb190b3VjaCcsXG4gICAgaXBkTW06IDYzLFxuICAgIGZvdkRlZ3JlZXM6IDY1LFxuICAgIGd5cm9TZW5zaXRpdml0eTogMS4yLFxuICAgIHRhcmdldEZwczogOTAsXG4gICAgYWRhcHRpdmVSZXNvbHV0aW9uUGN0OiA5MCxcbiAgICB0YWJsZXRTcGxpdFVpOiB0cnVlLFxuICB9KTtcblxuICAvLyBEb2NrICYgVmlzdWFsIExvZ2ljIEdyYXBoIFN1Yi1WaWV3ICYgSW50ZXJhY3RpdmUgVHV0b3JpYWwgU3RhdGVcbiAgY29uc3QgW2FjdGl2ZURvY2tUYWIsIHNldEFjdGl2ZURvY2tUYWJdID0gdXNlU3RhdGU8J3BhbGV0dGUnIHwgJ2luc3BlY3RvcicgfCAnbG9naWMnIHwgJ21vYmlsZSc+KCdwYWxldHRlJyk7XG4gIGNvbnN0IFtpc0xvZ2ljR3JhcGhTdWJWaWV3LCBzZXRJc0xvZ2ljR3JhcGhTdWJWaWV3XSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3R1dG9yaWFsTW9kYWxPcGVuLCBzZXRUdXRvcmlhbE1vZGFsT3Blbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtzaG93TGl2ZUNvYWNobWFya3MsIHNldFNob3dMaXZlQ29hY2htYXJrc10gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcblxuICAvLyBFbnRlcnByaXNlIFJlbnRhbCwgQ1JNICYgTm90aWZpY2F0aW9uIFN0YXRlXG4gIGNvbnN0IFtlcXVpcG1lbnQsIHNldEVxdWlwbWVudF0gPSB1c2VTdGF0ZTxWckVxdWlwbWVudEl0ZW1bXT4oSU5JVElBTF9FUVVJUE1FTlQpO1xuICBjb25zdCBbcmVzZXJ2YXRpb25zLCBzZXRSZXNlcnZhdGlvbnNdID0gdXNlU3RhdGU8UmVudGFsUmVzZXJ2YXRpb25bXT4oSU5JVElBTF9SRVNFUlZBVElPTlMpO1xuICBjb25zdCBbY3VzdG9tZXJzLCBzZXRDdXN0b21lcnNdID0gdXNlU3RhdGU8Q3VzdG9tZXJDcm1Qcm9maWxlW10+KElOSVRJQUxfQ1VTVE9NRVJTKTtcbiAgY29uc3QgW25vdGlmaWNhdGlvbnMsIHNldE5vdGlmaWNhdGlvbnNdID0gdXNlU3RhdGU8TGl2ZU5vdGlmaWNhdGlvbltdPihbXG4gICAge1xuICAgICAgaWQ6ICdub3RpZi0xJyxcbiAgICAgIHRpbWVzdGFtcDogJzA1OjE4OjQyJyxcbiAgICAgIHR5cGU6ICdBVkFJTEFCSUxJVFknLFxuICAgICAgdGl0bGVQbDogJ1plc3RhdyBSb2R6aW5ueSBEdW9WUiBkb3N0xJlwbnkgdyBNYWdhenluaWUgV0FXLTAxICgxMSBzenQuKScsXG4gICAgICB0aXRsZUVuOiAnRmFtaWx5IEJ1bmRsZSBEdW9WUiBhdmFpbGFibGUgaW4gV0FXLTAxIERlcG90ICgxMSB1bml0cyknLFxuICAgICAgZGV0YWlsUGw6ICdLYWxpYnJhY2phIG9wdHljem5hIHNvY3pld2VrIGkgcHJvZmlsaSBJUEQgemFrb8WEY3pvbmEgcG9tecWbbG5pZS4nLFxuICAgICAgZGV0YWlsRW46ICdPcHRpY2FsIGxlbnMgY2FsaWJyYXRpb24gYW5kIElQRCBwcmVzZXRzIHZlcmlmaWVkLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ25vdGlmLTInLFxuICAgICAgdGltZXN0YW1wOiAnMDU6MTQ6MTAnLFxuICAgICAgdHlwZTogJ0VNQUlMX0RJU1BBVENIJyxcbiAgICAgIHRpdGxlUGw6ICdBdXRvbWF0eWN6bmUgcHJ6eXBvbW5pZW5pZSBvIHRlcm1pbmllIHp3cm90dSAoUkVTLTg4MTJCKScsXG4gICAgICB0aXRsZUVuOiAnQXV0b21hdGVkIHJldHVybiByZW1pbmRlciBxdWV1ZWQgKFJFUy04ODEyQiknLFxuICAgICAgZGV0YWlsUGw6ICdTeXN0ZW0gQ1JNIHd5a3J5xYIgemJsacW8YWrEhWN5IHNpxJkgdGVybWluIHp3cm90dSBkbGEga29udGEgZHIgaW7FvC4gS2Fyb2xpbmEgTm93YWsuJyxcbiAgICAgIGRldGFpbEVuOiAnQ1JNIGRldGVjdGVkIHVwY29taW5nIHJldHVybiB3aW5kb3cgZm9yIGRyIGluxbwuIEthcm9saW5hIE5vd2FrLicsXG4gICAgfSxcbiAgXSk7XG5cbiAgLy8gU1NPICYgRTJFIFNlY3VyaXR5IFNlc3Npb24gU3RhdGVcbiAgY29uc3QgW3Nzb1Nlc3Npb24sIHNldFNzb1Nlc3Npb25dID0gdXNlU3RhdGU8U3NvVXNlclNlc3Npb24+KHtcbiAgICBhdXRoZW50aWNhdGVkOiB0cnVlLFxuICAgIHByb3ZpZGVyOiAnR29vZ2xlIFdvcmtzcGFjZSBTU08nLFxuICAgIG5hbWU6ICdNYXJlayBMYXNlcnMgKEFyY2hpdGVrdCBWUiknLFxuICAgIGVtYWlsOiAnbWxhc2VyczAxMTBAZ21haWwuY29tJyxcbiAgICByb2xlOiAnQWRtaW5pc3RyYXRvciBFbnRlcnByaXNlJyxcbiAgICBlMmVLZXlGaW5nZXJwcmludDogJ1NIQTI1Njo5Rjo0QToyQzo4MTpFNzowQjoxMTpENDo1NTpDOScsXG4gICAgY2xvdWRSZWdpb246ICdFVS1DZW50cmFsIChXYXJzemF3YSAvIEZyYW5rZnVydCBIQSknLFxuICB9KTtcbiAgY29uc3QgW3Nzb01vZGFsT3Blbiwgc2V0U3NvTW9kYWxPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW21vYmlsZUV4cG9ydE1vZGFsT3Blbiwgc2V0TW9iaWxlRXhwb3J0TW9kYWxPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICAvLyBTeW5jIERhcmsgLyBMaWdodCBtb2RlIGNsYXNzIG9uIDxodG1sPlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgaWYgKHRoZW1lID09PSAnZGFyaycpIHtcbiAgICAgIHJvb3QuY2xhc3NMaXN0LmFkZCgnZGFyaycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByb290LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKTtcbiAgICB9XG4gIH0sIFt0aGVtZV0pO1xuXG4gIGNvbnN0IHB1c2hOb3RpZmljYXRpb24gPSAobjogT21pdDxMaXZlTm90aWZpY2F0aW9uLCAnaWQnIHwgJ3RpbWVzdGFtcCc+KSA9PiB7XG4gICAgY29uc3QgbmV3RW50cnk6IExpdmVOb3RpZmljYXRpb24gPSB7XG4gICAgICAuLi5uLFxuICAgICAgaWQ6IGBub3RpZi0ke0RhdGUubm93KCkudG9TdHJpbmcoMzYpfWAsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9UaW1lU3RyaW5nKCkuc2xpY2UoMCwgOCksXG4gICAgfTtcbiAgICBzZXROb3RpZmljYXRpb25zKChwcmV2KSA9PiBbbmV3RW50cnksIC4uLnByZXZdKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVFeGVjdXRlVHV0b3JpYWxBY3Rpb24gPSAoYWN0aW9uOiBUdXRvcmlhbFN0ZXBBY3Rpb24pID0+IHtcbiAgICBpZiAoYWN0aW9uLnRhcmdldFRhYikge1xuICAgICAgc2V0QWN0aXZlVGFiKGFjdGlvbi50YXJnZXRUYWIpO1xuICAgIH1cbiAgICBpZiAoYWN0aW9uLmRvY2tUYWIpIHtcbiAgICAgIHNldEFjdGl2ZURvY2tUYWIoYWN0aW9uLmRvY2tUYWIpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGFjdGlvbi5vcGVuR3JhcGhTdWJWaWV3ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHNldElzTG9naWNHcmFwaFN1YlZpZXcoYWN0aW9uLm9wZW5HcmFwaFN1YlZpZXcpO1xuICAgIH1cbiAgICBzZXRTaG93TGl2ZUNvYWNobWFya3ModHJ1ZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRTY2VuZUpzb24gPSAoKSA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIHByb2plY3ROYW1lLFxuICAgICAgZXhwb3J0ZWRBdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgZW5jcnlwdGlvbjogJ0FFUy0yNTYtR0NNLUUyRUUnLFxuICAgICAgbW9iaWxlU3RhbmRhbG9uZUNvbmZpZzogbW9iaWxlQ29uZmlnLFxuICAgICAgb2JqZWN0cyxcbiAgICAgIGxvZ2ljTm9kZXMsXG4gICAgfTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KHBheWxvYWQsIG51bGwsIDIpXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gYCR7cHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICdfJyl9X21vYmlsZV93ZWJ4ci5qc29uYDtcbiAgICBhLmNsaWNrKCk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXNsYXRlLTEwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgey8qIFNUUklDVCAzLVpPTkUgVE9QIEJBUiBDT05UUkFDVCAqL31cbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC04IHB4LTYgcHktMy41IGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTUwXCI+XG4gICAgICAgIHsvKiBab25lIDE6IFNpbmdsZSB0ZXh0IGVsZW1lbnQgd29yZG1hcmsgKi99XG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cIiNidWlsZGVyXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2V0QWN0aXZlVGFiKCdidWlsZGVyJyk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0cmFja2luZy10aWdodCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgZm9udC1kaXNwbGF5XCJcbiAgICAgICAgPlxuICAgICAgICAgIFZvcnRleFZSIFN0dWRpb1xuICAgICAgICA8L2E+XG5cbiAgICAgICAgey8qIFpvbmUgMjogNCBjb25jaXNlIHNpbmdsZS1saW5lIHRleHQgbmF2aWdhdGlvbiBsaW5rcyAqL31cbiAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJoaWRkZW4gbWQ6ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTYgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCIjYnVpbGRlclwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHNldEFjdGl2ZVRhYignYnVpbGRlcicpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvdmVyOnRleHQtYW1iZXItNTAwIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2J1aWxkZXInXG4gICAgICAgICAgICAgICAgPyAndGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIHVuZGVybGluZSB1bmRlcmxpbmUtb2Zmc2V0LTggZGVjb3JhdGlvbi1hbWJlci01MDAgZGVjb3JhdGlvbi0yIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnS3JlYXRvciAzRCcgOiAnM0QgQnVpbGRlcid9XG4gICAgICAgICAgPC9hPlxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwiI2Fpc3R1ZGlvXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgc2V0QWN0aXZlVGFiKCdhaXN0dWRpbycpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvdmVyOnRleHQtYW1iZXItNTAwIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2Fpc3R1ZGlvJ1xuICAgICAgICAgICAgICAgID8gJ3RleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSB1bmRlcmxpbmUgdW5kZXJsaW5lLW9mZnNldC04IGRlY29yYXRpb24tYW1iZXItNTAwIGRlY29yYXRpb24tMiBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1N0dWRpbyBBSScgOiAnQUkgU3R1ZGlvJ31cbiAgICAgICAgICA8L2E+XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCIjcmVudGFsc1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgIHNldEFjdGl2ZVRhYigncmVudGFscycpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvdmVyOnRleHQtYW1iZXItNTAwIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3JlbnRhbHMnXG4gICAgICAgICAgICAgICAgPyAndGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIHVuZGVybGluZSB1bmRlcmxpbmUtb2Zmc2V0LTggZGVjb3JhdGlvbi1hbWJlci01MDAgZGVjb3JhdGlvbi0yIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnV3lwb8W8eWN6YWxuaWEgVlInIDogJ1ZSIFJlbnRhbHMnfVxuICAgICAgICAgIDwvYT5cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cIiNjcm1cIlxuICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBzZXRBY3RpdmVUYWIoJ2NybScpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvdmVyOnRleHQtYW1iZXItNTAwIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2NybSdcbiAgICAgICAgICAgICAgICA/ICd0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgdW5kZXJsaW5lIHVuZGVybGluZS1vZmZzZXQtOCBkZWNvcmF0aW9uLWFtYmVyLTUwMCBkZWNvcmF0aW9uLTIgZm9udC1zZW1pYm9sZCdcbiAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdDUk0gaSBBbmFsaXR5a2EnIDogJ0NSTSAmIEFuYWx5dGljcyd9XG4gICAgICAgICAgPC9hPlxuICAgICAgICA8L25hdj5cblxuICAgICAgICB7LyogWm9uZSAzOiAxIHByaW1hcnkgYWN0aW9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHNocmluay0wXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TW9iaWxlRXhwb3J0TW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTk1MCBiZy1hbWJlci01MDAgcm91bmRlZC1sZyBob3ZlcjpiZy1hbWJlci00MDAgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0Vrc3BvcnQgTW9iaWxueSBpIFBERicgOiAnTW9iaWxlICYgUERGIEV4cG9ydCd9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG5cbiAgICAgIHsvKiBTZWNvbmRhcnkgV29ya3NwYWNlIENvbnRleHQgJiBFbnRlcnByaXNlIFV0aWxpdHkgQmFyIGJlbG93IGhlYWRlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBweC02IHB5LTIgYmctc2xhdGUtMTAwIGRhcms6Ymctc2xhdGUtOTAwLzkwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHRleHQteHNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggbWQ6aGlkZGVuIGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgeyhbJ2J1aWxkZXInLCAnYWlzdHVkaW8nLCAncmVudGFscycsICdjcm0nXSBhcyBjb25zdCkubWFwKCh0KSA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e3R9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKHQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQgdGV4dC14cyBmb250LW1lZGl1bSB3aGl0ZXNwYWNlLW5vd3JhcCAke1xuICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSB0XG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3QudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwIGRhcms6dGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICBTU086IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXNsYXRlLTIwMFwiPntzc29TZXNzaW9uLnByb3ZpZGVyfTwvc3Ryb25nPiAoe3Nzb1Nlc3Npb24uZW1haWx9KVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPsK3PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC02MDAgZGFyazp0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtbW9ubyBoaWRkZW4gc206aW5saW5lXCI+XG4gICAgICAgICAgICBFMkVFIEFFUy0yNTYtR0NNIMK3IHtzc29TZXNzaW9uLmNsb3VkUmVnaW9ufVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFdvcmtzcGFjZSBDb250cm9sczogVHV0b3JpYWwgR3VpZGUsIExpdmUgSGludHMgVG9nZ2xlLCBTU08gU3dpdGNoZXIsIExhbmd1YWdlIFBML0VOLCBEYXJrL0xpZ2h0IFRoZW1lICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFR1dG9yaWFsTW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQgYmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQgaG92ZXI6YmctYW1iZXItNDAwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxIZWxwQ2lyY2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ1NhbW91Y3plazogR2R6aWUgS2xpa2HEhyBpIERvZGF3YcSHIEdyYWZpa2knIDogJ1R1dG9yaWFsICYgR3JhcGhpY3MgR3VpZGUnfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dMaXZlQ29hY2htYXJrcygoYykgPT4gIWMpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZCBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgJHtcbiAgICAgICAgICAgICAgc2hvd0xpdmVDb2FjaG1hcmtzXG4gICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwLzE1IGJvcmRlci1hbWJlci01MDAvNTAgdGV4dC1hbWJlci02MDAgZGFyazp0ZXh0LWFtYmVyLTMwMCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlIGRhcms6Ymctc2xhdGUtODAwIGJvcmRlci1zbGF0ZS0zMDAgZGFyazpib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtNzAwIGRhcms6dGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7c2hvd0xpdmVDb2FjaG1hcmtzXG4gICAgICAgICAgICAgID8gbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgID8gJ0R5bWtpIFBvZHBvd2llZHppOiBXxYEuJ1xuICAgICAgICAgICAgICAgIDogJ0xpdmUgSGludHM6IE9OJ1xuICAgICAgICAgICAgICA6IGxhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgPyAnRHlta2kgUG9kcG93aWVkemk6IFdZxYEuJ1xuICAgICAgICAgICAgICA6ICdMaXZlIEhpbnRzOiBPRkYnfVxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U3NvTW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBkYXJrOmJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS03MDAgZGFyazp0ZXh0LXNsYXRlLTIwMCBob3Zlcjpib3JkZXItYW1iZXItNTAwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgd2hpdGVzcGFjZS1ub3dyYXBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxLZXlSb3VuZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTUwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ3BsJyA/ICdLb250byBTU08nIDogJ1NTTyBWYXVsdCd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TGFuZygobCkgPT4gKGwgPT09ICdwbCcgPyAnZW4nIDogJ3BsJykpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZCBiZy13aGl0ZSBkYXJrOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTMwMCBkYXJrOmJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS03MDAgZGFyazp0ZXh0LXNsYXRlLTIwMCBob3Zlcjpib3JkZXItYW1iZXItNTAwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ubyB3aGl0ZXNwYWNlLW5vd3JhcFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEdsb2JlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ3BsJyA/ICdQTCAvIEVOJyA6ICdFTiAvIFBMJ308L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUaGVtZSgodCkgPT4gKHQgPT09ICdkYXJrJyA/ICdsaWdodCcgOiAnZGFyaycpKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQgYmctd2hpdGUgZGFyazpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS0zMDAgZGFyazpib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtNzAwIGRhcms6dGV4dC1zbGF0ZS0yMDAgaG92ZXI6Ym9yZGVyLWFtYmVyLTUwMCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB3aGl0ZXNwYWNlLW5vd3JhcFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge3RoZW1lID09PSAnZGFyaycgPyAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPFN1biBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnSmFzbnknIDogJ0xpZ2h0J308L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8TW9vbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTcwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnQ2llbW55JyA6ICdEYXJrJ308L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1BSU4gV09SS1NQQUNFIFZJRVdQT1JUICovfVxuICAgICAgPG1haW4+XG4gICAgICAgIHthY3RpdmVUYWIgPT09ICdidWlsZGVyJyAmJiAoXG4gICAgICAgICAgPFZyVmlld3BvcnQzRFxuICAgICAgICAgICAgbGFuZz17bGFuZ31cbiAgICAgICAgICAgIG9iamVjdHM9e29iamVjdHN9XG4gICAgICAgICAgICBzZXRPYmplY3RzPXtzZXRPYmplY3RzfVxuICAgICAgICAgICAgc2VsZWN0ZWRPYmplY3RJZD17c2VsZWN0ZWRPYmplY3RJZH1cbiAgICAgICAgICAgIHNldFNlbGVjdGVkT2JqZWN0SWQ9e3NldFNlbGVjdGVkT2JqZWN0SWR9XG4gICAgICAgICAgICBsb2dpY05vZGVzPXtsb2dpY05vZGVzfVxuICAgICAgICAgICAgc2V0TG9naWNOb2Rlcz17c2V0TG9naWNOb2Rlc31cbiAgICAgICAgICAgIG1vYmlsZUNvbmZpZz17bW9iaWxlQ29uZmlnfVxuICAgICAgICAgICAgc2V0TW9iaWxlQ29uZmlnPXtzZXRNb2JpbGVDb25maWd9XG4gICAgICAgICAgICBvbk9wZW5BaVN0dWRpb0ZvclNlbGVjdGVkPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2Fpc3R1ZGlvJyl9XG4gICAgICAgICAgICBvbkV4cG9ydE1vYmlsZUJ1bmRsZT17KCkgPT4gc2V0TW9iaWxlRXhwb3J0TW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgYWN0aXZlRG9ja1RhYj17YWN0aXZlRG9ja1RhYn1cbiAgICAgICAgICAgIHNldEFjdGl2ZURvY2tUYWI9e3NldEFjdGl2ZURvY2tUYWJ9XG4gICAgICAgICAgICBpc0xvZ2ljR3JhcGhTdWJWaWV3PXtpc0xvZ2ljR3JhcGhTdWJWaWV3fVxuICAgICAgICAgICAgc2V0SXNMb2dpY0dyYXBoU3ViVmlldz17c2V0SXNMb2dpY0dyYXBoU3ViVmlld31cbiAgICAgICAgICAgIHNob3dMaXZlQ29hY2htYXJrcz17c2hvd0xpdmVDb2FjaG1hcmtzfVxuICAgICAgICAgICAgc2V0U2hvd0xpdmVDb2FjaG1hcmtzPXtzZXRTaG93TGl2ZUNvYWNobWFya3N9XG4gICAgICAgICAgICBvbk9wZW5UdXRvcmlhbE1vZGFsPXsoKSA9PiBzZXRUdXRvcmlhbE1vZGFsT3Blbih0cnVlKX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuXG4gICAgICAgIHthY3RpdmVUYWIgPT09ICdhaXN0dWRpbycgJiYgKFxuICAgICAgICAgIDxBaVN0dWRpb0FuZERvY3NQYW5lbFxuICAgICAgICAgICAgbGFuZz17bGFuZ31cbiAgICAgICAgICAgIHByb2plY3ROYW1lPXtwcm9qZWN0TmFtZX1cbiAgICAgICAgICAgIHNldFByb2plY3ROYW1lPXtzZXRQcm9qZWN0TmFtZX1cbiAgICAgICAgICAgIG9iamVjdHM9e29iamVjdHN9XG4gICAgICAgICAgICBzZXRPYmplY3RzPXtzZXRPYmplY3RzfVxuICAgICAgICAgICAgc2VsZWN0ZWRPYmplY3RJZD17c2VsZWN0ZWRPYmplY3RJZH1cbiAgICAgICAgICAgIHNldFNlbGVjdGVkT2JqZWN0SWQ9e3NldFNlbGVjdGVkT2JqZWN0SWR9XG4gICAgICAgICAgICBsb2dpY05vZGVzPXtsb2dpY05vZGVzfVxuICAgICAgICAgICAgbW9iaWxlQ29uZmlnPXttb2JpbGVDb25maWd9XG4gICAgICAgICAgICBzZXRNb2JpbGVDb25maWc9e3NldE1vYmlsZUNvbmZpZ31cbiAgICAgICAgICAgIG9uU3dpdGNoVG9WaWV3cG9ydD17KCkgPT4gc2V0QWN0aXZlVGFiKCdidWlsZGVyJyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICB7YWN0aXZlVGFiID09PSAncmVudGFscycgJiYgKFxuICAgICAgICAgIDxSZW50YWxDYWxlbmRhckFuZEZsZWV0XG4gICAgICAgICAgICBsYW5nPXtsYW5nfVxuICAgICAgICAgICAgZXF1aXBtZW50PXtlcXVpcG1lbnR9XG4gICAgICAgICAgICBzZXRFcXVpcG1lbnQ9e3NldEVxdWlwbWVudH1cbiAgICAgICAgICAgIHJlc2VydmF0aW9ucz17cmVzZXJ2YXRpb25zfVxuICAgICAgICAgICAgc2V0UmVzZXJ2YXRpb25zPXtzZXRSZXNlcnZhdGlvbnN9XG4gICAgICAgICAgICBjdXN0b21lcnM9e2N1c3RvbWVyc31cbiAgICAgICAgICAgIHNldEN1c3RvbWVycz17c2V0Q3VzdG9tZXJzfVxuICAgICAgICAgICAgbm90aWZpY2F0aW9ucz17bm90aWZpY2F0aW9uc31cbiAgICAgICAgICAgIHB1c2hOb3RpZmljYXRpb249e3B1c2hOb3RpZmljYXRpb259XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cblxuICAgICAgICB7YWN0aXZlVGFiID09PSAnY3JtJyAmJiAoXG4gICAgICAgICAgPENybUFkbWluV2FyZWhvdXNlSHViXG4gICAgICAgICAgICBsYW5nPXtsYW5nfVxuICAgICAgICAgICAgZXF1aXBtZW50PXtlcXVpcG1lbnR9XG4gICAgICAgICAgICByZXNlcnZhdGlvbnM9e3Jlc2VydmF0aW9uc31cbiAgICAgICAgICAgIGN1c3RvbWVycz17Y3VzdG9tZXJzfVxuICAgICAgICAgICAgc2V0Q3VzdG9tZXJzPXtzZXRDdXN0b21lcnN9XG4gICAgICAgICAgICBzc29TZXNzaW9uPXtzc29TZXNzaW9ufVxuICAgICAgICAgICAgcHVzaE5vdGlmaWNhdGlvbj17cHVzaE5vdGlmaWNhdGlvbn1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9tYWluPlxuXG4gICAgICB7LyogSU5URVJBQ1RJVkUgU1RFUC1CWS1TVEVQIFRVVE9SSUFMICYgR1JBUEhJQ1MgR1VJREUgTU9EQUwgKi99XG4gICAgICA8SW50ZXJhY3RpdmVUdXRvcmlhbEd1aWRlXG4gICAgICAgIGxhbmc9e2xhbmd9XG4gICAgICAgIGlzT3Blbj17dHV0b3JpYWxNb2RhbE9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldFR1dG9yaWFsTW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgc2hvd0xpdmVDb2FjaG1hcmtzPXtzaG93TGl2ZUNvYWNobWFya3N9XG4gICAgICAgIHNldFNob3dMaXZlQ29hY2htYXJrcz17c2V0U2hvd0xpdmVDb2FjaG1hcmtzfVxuICAgICAgICBvbkV4ZWN1dGVTdGVwQWN0aW9uPXtoYW5kbGVFeGVjdXRlVHV0b3JpYWxBY3Rpb259XG4gICAgICAvPlxuXG4gICAgICB7LyogU1NPIEFVVEhFTlRJQ0FUSU9OICYgRU5ELVRPLUVORCBFTkNSWVBUSU9OIE1PREFMICovfVxuICAgICAge3Nzb01vZGFsT3BlbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJsYWNrLzcwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LWxnIHJvdW5kZWQteGwgYmctd2hpdGUgZGFyazpiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHAtNiBzcGFjZS15LTUgc2hhZG93LTJ4bFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICA/ICdMb2dvd2FuaWUgRW50ZXJwcmlzZSBTU08gaSBTenlmcm93YW5pZSBFbmQtdG8tRW5kJ1xuICAgICAgICAgICAgICAgICAgOiAnRW50ZXJwcmlzZSBTU08gQXV0aGVudGljYXRpb24gJiBFMkVFIFNlY3VyaXR5J31cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNzb01vZGFsT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgaG92ZXI6Ymctc2xhdGUtMTAwIGRhcms6aG92ZXI6Ymctc2xhdGUtODAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICA/ICdXeWJpZXJ6IGRvc3Rhd2PEmSB0b8W8c2Ftb8WbY2kgU2luZ2xlIFNpZ24tT24gKFNBTUwgMi4wIC8gT0lEQykgb3JheiByZWdpb24ga2xhc3RyYSB3eXNva2llaiBkb3N0xJlwbm/Fm2NpOidcbiAgICAgICAgICAgICAgICAgIDogJ1NlbGVjdCB5b3VyIFNpbmdsZSBTaWduLU9uIGlkZW50aXR5IHByb3ZpZGVyIChTQU1MIDIuMCAvIE9JREMpIGFuZCBoaWdoLWF2YWlsYWJpbGl0eSBjbG91ZCByZWdpb246J31cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICB7KFxuICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAnR29vZ2xlIFdvcmtzcGFjZSBTU08nLFxuICAgICAgICAgICAgICAgICAgICAnTWljcm9zb2Z0IEVudHJhIElEJyxcbiAgICAgICAgICAgICAgICAgICAgJ09rdGEgU0FNTCAyLjAnLFxuICAgICAgICAgICAgICAgICAgICAnSGFyZHdhcmUgUGFzc2tleScsXG4gICAgICAgICAgICAgICAgICBdIGFzIGNvbnN0XG4gICAgICAgICAgICAgICAgKS5tYXAoKHByb3YpID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtwcm92fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIHNldFNzb1Nlc3Npb24oKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IHByb3YsXG4gICAgICAgICAgICAgICAgICAgICAgICBlMmVLZXlGaW5nZXJwcmludDogYFNIQTI1Njoke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIsIDEwKS50b1VwcGVyQ2FzZSgpfTpFMkVFYCxcbiAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC1sZyBib3JkZXIgdGV4dC1sZWZ0IGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICAgICAgc3NvU2Vzc2lvbi5wcm92aWRlciA9PT0gcHJvdlxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWFtYmVyLTUwMCBiZy1hbWJlci01MDAvMTAgdGV4dC1zbGF0ZS05MDAgZGFyazp0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj57cHJvdn08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS01MDAgbXQtMC41XCI+T0lEQyArIE1GQSBWZXJpZmllZDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS0xMDAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlVTRVI6IHtzc29TZXNzaW9uLm5hbWV9ICh7c3NvU2Vzc2lvbi5lbWFpbH0pPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5ST0xFOiB7c3NvU2Vzc2lvbi5yb2xlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTYwMCBkYXJrOnRleHQtZW1lcmFsZC00MDBcIj5cbiAgICAgICAgICAgICAgICAgIEUyRUUgRklOR0VSUFJJTlQ6IHtzc29TZXNzaW9uLmUyZUtleUZpbmdlcnByaW50fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+Q0xPVUQgQ0xVU1RFUjoge3Nzb1Nlc3Npb24uY2xvdWRSZWdpb259PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U3NvTW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGhvdmVyOmJnLWFtYmVyLTQwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdaYXR3aWVyZMW6IFNlc2rEmSBTU08nIDogJ0NvbmZpcm0gU1NPIFNlc3Npb24nfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBJTlNUQU5UIE1PQklMRSBFWFBPUlQgJiBNQVNURVIgUERGIFJFUE9SVCBNT0RBTCAqL31cbiAgICAgIHttb2JpbGVFeHBvcnRNb2RhbE9wZW4gJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBiZy1ibGFjay83MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy14bCByb3VuZGVkLXhsIGJnLXdoaXRlIGRhcms6Ymctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGRhcms6Ym9yZGVyLXNsYXRlLTgwMCBwLTYgc3BhY2UteS01IHNoYWRvdy0yeGxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHBiLTNcIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxTbWFydHBob25lIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICA/ICdOYXR5Y2htaWFzdG93eSBFa3Nwb3J0IG5hIFVyesSFZHplbmlhIE1vYmlsbmUgb3JheiBSYXBvcnR5IFBERidcbiAgICAgICAgICAgICAgICAgIDogJ0luc3RhbnQgTW9iaWxlIERldmljZSBFeHBvcnQgJiBFbnRlcnByaXNlIFBERiBSZXBvcnRzJ31cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldE1vYmlsZUV4cG9ydE1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQgaG92ZXI6Ymctc2xhdGUtMTAwIGRhcms6aG92ZXI6Ymctc2xhdGUtODAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtbGcgYmctc2xhdGUtNTAgZGFyazpiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZGFyazpib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMCBkYXJrOnRleHQtd2hpdGUgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgICAgPyAnMS4gUGFraWV0IE1vYmlsbnkgV2ViWFIgLyBTbWFydGZvbiBpIFRhYmxldCAoLkdMVEYgLyAuSlNPTiBCdW5kbGUpJ1xuICAgICAgICAgICAgICAgICAgICA6ICcxLiBNb2JpbGUgV2ViWFIgLyBTdGFuZGFsb25lIFBob25lICYgVGFibGV0IFBhY2thZ2UgKC5HTFRGIC8gLkpTT04pJ31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBkYXJrOnRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgICA/IGBaYXdpZXJhICR7b2JqZWN0cy5sZW5ndGh9IG1vZGVsaSBrb21wb3p5dG93eWNoIDNELCAke2xvZ2ljTm9kZXMubGVuZ3RofSBwb8WCxIVjem9ueWNoIHfEmXrFgsOzdyBsb2dpa2kgTm8tQ29kZSBvcmF6IHByb2ZpbCBzdGVyb3dhbmlhIMW8eXJvc2tvcGVtIChJUEQgJHttb2JpbGVDb25maWcuaXBkTW19bW0sICR7bW9iaWxlQ29uZmlnLmZvdkRlZ3JlZXN9wrAgRk9WKS5gXG4gICAgICAgICAgICAgICAgICAgIDogYEluY2x1ZGVzICR7b2JqZWN0cy5sZW5ndGh9IGNvbXBvc2l0ZSAzRCBhY3RvcnMsICR7bG9naWNOb2Rlcy5sZW5ndGh9IHdpcmVkIE5vLUNvZGUgbG9naWMgbm9kZXMsIGFuZCBtb2JpbGUgZ3lyb3Njb3BlIHByb2ZpbGUgKElQRCAke21vYmlsZUNvbmZpZy5pcGRNbX1tbSwgJHttb2JpbGVDb25maWcuZm92RGVncmVlc33CsCBGT1YpLmB9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkU2NlbmVKc29ufVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMiBweC00IHB5LTIgcm91bmRlZC1sZyBiZy1hbWJlci01MDAgaG92ZXI6YmctYW1iZXItNDAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgICAgPyAnUG9iaWVyeiBQYWtpZXQgTW9iaWxueSBTY2VueSAzRCAoLkpTT04gLyBXZWJYUiknXG4gICAgICAgICAgICAgICAgICAgIDogJ0Rvd25sb2FkIE1vYmlsZSAzRCBTY2VuZSBCdW5kbGUgKC5KU09OIC8gV2ViWFIpJ31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC1sZyBiZy1zbGF0ZS01MCBkYXJrOmJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBkYXJrOmJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwIGRhcms6dGV4dC13aGl0ZSB0ZXh0LXNtXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgICA/ICcyLiBaYmlvcmN6eSBSYXBvcnQgRW50ZXJwcmlzZSBQREYgKFNwcnplZGHFvCwgS2FsZW5kYXJ6LCBDUk0gUm9kemlubnksIE1hZ2F6eW4gQVBJKSdcbiAgICAgICAgICAgICAgICAgICAgOiAnMi4gTWFzdGVyIEVudGVycHJpc2UgUERGIFJlcG9ydCAoU2FsZXMsIENhbGVuZGFyLCBGYW1pbHkgQ1JNLCBXYXJlaG91c2UgQVBJKSd9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgZGFyazp0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgICAgPyAnR2VuZXJ1amUgcGXFgm55IGRva3VtZW50IFBERiBvYmVqbXVqxIVjeSBhbmFsaXR5a8SZIHd5cG/FvHljemXFhCwgc3RhdHlzdHlraSByb2R6aW5uZSBDUk0sIHB1bmt0eSBsb2phbG5vxZtjaW93ZSBvcmF6IHN0YW55IG1hZ2F6eW5vd2UgV01TLidcbiAgICAgICAgICAgICAgICAgICAgOiAnR2VuZXJhdGVzIGEgY29tcGxldGUgUERGIHJlcG9ydCBjb3ZlcmluZyByZW50YWwgYW5hbHl0aWNzLCBmYW1pbHkgc2hhcmluZyBDUk0gc3RhdHMsIGxveWFsdHkgcG9pbnRzLCBhbmQgV01TIHN0b2NrLid9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydEVudGVycHJpc2VNYXN0ZXJSZXBvcnRQZGYoZXF1aXBtZW50LCByZXNlcnZhdGlvbnMsIGN1c3RvbWVycywgW10pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtdC0yIHB4LTQgcHktMiByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBkYXJrOmJnLXNsYXRlLTgwMCB0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTcwMCBmb250LXNlbWlib2xkIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICAgID8gJ0Vrc3BvcnR1aiBaYmlvcmN6eSBSYXBvcnQgUERGJ1xuICAgICAgICAgICAgICAgICAgICA6ICdFeHBvcnQgTWFzdGVyIEVudGVycHJpc2UgUERGJ31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufVxuIl19