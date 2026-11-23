const React = __vite__cjsImport0_react; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport3_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch_studio/node_modules/.vite/deps/react.js?v=c1c4f681";
import { Boxes, Check, Code2, Cpu, Download, Eye, Filter, Image as ImageIcon, Layers, PackagePlus, Sparkles, Wand2 } from "/apps/holoarch_studio/node_modules/.vite/deps/lucide-react.js?v=c1c4f681";
import { exportProjectToGLTF, exportProjectToIFC } from "/apps/holoarch_studio/src/utils/exporters.ts";
var _jsxFileName = "/app/applet/src/components/StudioExtensionsHub.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/apps/holoarch_studio/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c1c4f681";
export const STUDIO_EXTENSIONS_CATALOG = [
	{
		id: "ext_pbr_glass_ior",
		name: "Optical Crystal Glass Shader (IOR 1.52 + Chromatic Dispersion)",
		version: "v2.4.0",
		category: "Shader & Optics",
		badge: "KHR_materials_transmission",
		description: "Zaawansowany shader refrakcji szkła akrylowego i optycznego dla makiet warstwowych (glass1..glass34). Dodaje dyspersję pryzmatyczną na fazowanych krawędziach stropów.",
		unityPackage: "com.holoarch.urp.optical-glass"
	},
	{
		id: "ext_led_slab_core",
		name: "Warm LED Core & Floor Slab Array (2900K Emissive Volumetrics)",
		version: "v1.9.2",
		category: "Shader & Optics",
		badge: "HDR Bloom + AreaLight",
		description: "Wewnętrzne kolumny świetlne LED o ciepłej barwie 2900K–3200K podświetlające przezroczyste tafle stropowe od środka makiety.",
		unityPackage: "com.holoarch.vfx.led-core-array"
	},
	{
		id: "ext_voronoi_lattice",
		name: "Bionic Voronoi Exoskeleton & Twisted Diagrid Generator",
		version: "v3.1.0",
		category: "Parametric Geometry",
		badge: "Procedural Mesh / Compute",
		description: "Generator komórkowych struktur bionicznych Voronoi oraz skręconych helis wysokościowych (inspirowany The Torch 325m oraz wieżami bioniczno-parametrycznymi).",
		unityPackage: "com.holoarch.parametric.voronoi-spire"
	},
	{
		id: "ext_kinetic_ribs",
		name: "Kinetic Titanium Wing & Logarithmic Fin Animator",
		version: "v2.0.5",
		category: "Parametric Geometry",
		badge: "6DoF Harmonic Solver",
		description: "Moduł animacji wachlarzowych żeber i piór tytanowych ze zmiennym przesunięciem fazowym (wzorowany na rzeźbie kinetycznego skrzydła -0.png / Calatrava style).",
		unityPackage: "com.holoarch.kinetic.aerowing"
	},
	{
		id: "ext_hydro_refraction",
		name: "Hydro-Aqua Fluid Vortex & Suspended Droplet Emitter",
		version: "v1.8.4",
		category: "Shader & Optics",
		badge: "IOR 1.333 + Caustics",
		description: "Symulacja zamrożonej w czasie fali wodnej, wiru w cylindrycznym naczyniu oraz zawieszonych w powietrzu sferycznych kropel z kaustyką świetlną (0.jpg).",
		unityPackage: "com.holoarch.fluids.aqua-sculpture"
	},
	{
		id: "ext_gltf_draco",
		name: "Khronos glTF 2.0 / GLB PBR Transmission Exporter",
		version: "v4.0.1",
		category: "CAD / BIM / XR Pipeline",
		badge: ".GLTF / .GLB 2.0",
		description: "Bezpośrednia serializacja sceny 3D z zachowaniem materiałów przezroczystych IOR, węzłów hierarchii i metadanych AR do formatu Khronos glTF 2.0.",
		unityPackage: "com.unity.cloud.gltfast"
	},
	{
		id: "ext_bim_ifc400",
		name: "ISO-10303-21 IFC4 BIM Level 400 Architectural Exporter",
		version: "v2.7.0",
		category: "CAD / BIM / XR Pipeline",
		badge: ".IFC (Revit / ArchiCAD)",
		description: "Eksport struktury kondygnacji (IfcBuildingStorey), rzędnych wysokościowych i osi konstrukcyjnych do natywnego formatu BIM IFC4.",
		unityPackage: "com.holoarch.bim.ifc4-bridge"
	},
	{
		id: "ext_usdz_visionos",
		name: "Apple VisionOS & ARKit QuickLook USDZ Spatial Bridge",
		version: "v1.6.0",
		category: "CAD / BIM / XR Pipeline",
		badge: ".USDZ / RealityKit",
		description: "Profil kompatybilności z Apple Vision Pro (RealityKit ShaderGraph) oraz natywnym podglądem AR QuickLook na iPad Pro M4 i iPhone 16 Pro.",
		unityPackage: "com.unity.polyspatial.visionos"
	}
];
export const UPLOADED_REFERENCE_GALLERY = [
	(
	// 1. Direct local workspace assets in /public/assets/aistudio/
	{
		id: "ref-dashboard-dex",
		fileName: "Obrazek Apple Creator Studio 2026-10-26_10-27-52_2.png",
		title: "Stół Konferencyjny AR „Global Network Hologram”",
		collection: "AR_BOARDROOM",
		collectionLabel: "Stoły Holograficzne AR",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Dashboard_dex_eeffcbc7.jpg",
		proceduralTheme: "boardroom_holo",
		accentColor: "#06B6D4",
		secondaryColor: "#F59E0B",
		targetSceneId: "skyline_financial",
		targetPalette: "cyan_blueprint",
		lightTempK: 3400,
		heightMult: 1.25,
		explodedFactor: 0,
		recommendedExtensions: ["ext_pbr_glass_ior", "ext_gltf_draco"],
		promptPreset: "Holograficzna makieta kompleksu wieżowców finansowych na czarnym lustrzanym stole konferencyjnym o zachodzie słońca 3400K, świecąca mapa świata w blacie i zawieszone panele telemetrii AR 6DoF",
		specs: "Scena: Skyline Core · Blat + Mapa Świata · HDR 3400K"
	}),
	{
		id: "ref-50-rise-tower",
		fileName: "50_Rise_Tower_66976ad1.jpeg",
		title: "50 Rise Tower — Kaskadowa Wieża z Zielonymi Tarasami",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		localUrl: "/apps/holoarch_studio/assets/aistudio/50_Rise_Tower_66976ad1.jpeg",
		proceduralTheme: "stacked_glass",
		accentColor: "#38BDF8",
		secondaryColor: "#10B981",
		targetSceneId: "crystal_stacked_prism",
		targetPalette: "cyan_blueprint",
		lightTempK: 4800,
		heightMult: 1.35,
		explodedFactor: .15,
		recommendedExtensions: ["ext_pbr_glass_ior", "ext_led_slab_core"],
		promptPreset: "Wysokościowiec 50 Rise Tower z zaokrąglonymi narożnikami, warstwowymi płytami stropowymi i zielonym podium bioklimatycznym, prezentacja AR 1:100 na stole architektonicznym",
		specs: "Wysokość: 245m · Zaokrąglone stropy · Podium kaskadowe"
	},
	{
		id: "ref-ny-the-torch",
		fileName: "NEW_YORK___The_Torch_-_740_8th_Avenue___325m.jpeg",
		title: "NEW YORK | The Torch (740 8th Ave) — 325m Spiral Spire",
		collection: "VORONOI_TOWERS",
		collectionLabel: "Struktury Bioniczne i Helisy",
		localUrl: "/apps/holoarch_studio/assets/aistudio/NEW_YORK___The_Torch_-_740_8th_Avenue___325m___1067ft___.._dad21242.jpeg",
		proceduralTheme: "voronoi_spire",
		accentColor: "#F59E0B",
		secondaryColor: "#38BDF8",
		targetSceneId: "voronoi_bionic_spire",
		targetPalette: "amber_gold",
		lightTempK: 3200,
		heightMult: 1.5,
		explodedFactor: .1,
		recommendedExtensions: [
			"ext_voronoi_lattice",
			"ext_led_slab_core",
			"ext_bim_ifc400"
		],
		promptPreset: "Hologram wieżowca The Torch 325m (Nowy Jork) ze skręconą koroną helikalną i podświetlonym trzonem obserwacyjnym, złote oświetlenie zachodu słońca 3200K i 6 agentów skanujących elewację",
		specs: "Wysokość: 325m (1067 ft) · Helikalna Korona · Diagrid"
	},
	{
		id: "ref-tashkent-city",
		fileName: "Tashkent_City__Uzbekistan_5fa897cb.jpeg",
		title: "Tashkent City Financial Complex — Zespół Wysokościowców",
		collection: "AR_BOARDROOM",
		collectionLabel: "Stoły Holograficzne AR",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Tashkent_City__Uzbekistan_5fa897cb.jpeg",
		proceduralTheme: "boardroom_holo",
		accentColor: "#06B6D4",
		secondaryColor: "#E2E8F0",
		targetSceneId: "skyline_financial",
		targetPalette: "platinum_arch",
		lightTempK: 4500,
		heightMult: 1.3,
		explodedFactor: 0,
		recommendedExtensions: ["ext_pbr_glass_ior", "ext_bim_ifc400"],
		promptPreset: "Kompleks wysokościowców Tashkent City w formie platynowej makiety BIM na stole konferencyjnym, pełna okluzja LiDAR i siatka urbanistyczna 36 budynków sąsiednich",
		specs: "Masterplan Urbanistyczny · 11 Modułów · BIM Level 400"
	},
	{
		id: "ref-unknown-17-courtyard",
		fileName: "Unknown_17_77d8920d.jpeg",
		title: "Kompleks Trzech Wież z Dziedzińcem Wstęgowym LED",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Unknown_17_77d8920d.jpeg",
		proceduralTheme: "stacked_glass",
		accentColor: "#38BDF8",
		secondaryColor: "#F59E0B",
		targetSceneId: "eco_atrium",
		targetPalette: "cyan_blueprint",
		lightTempK: 5e3,
		heightMult: 1.15,
		explodedFactor: 0,
		recommendedExtensions: ["ext_led_slab_core", "ext_bim_ifc400"],
		promptPreset: "Trzy biurowce z poziomymi wstęgami elewacyjnymi LED i geometrycznym dziedzińcem rekreacyjnym w skali 1:50 na blacie stołu AR",
		specs: "Fasada Wstęgowa · Dziedziniec Centralny · ARCore Depth"
	},
	{
		id: "ref-unknown-11-acrylic",
		fileName: "Unknown_11_7796abba.jpeg",
		title: "Pryzmatyczne Bloki Akrylowe z Fluorescencyjną Krawędzią",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Unknown_11_7796abba.jpeg",
		proceduralTheme: "prism_blocks",
		accentColor: "#38BDF8",
		secondaryColor: "#EC4899",
		targetSceneId: "crystal_stacked_prism",
		targetPalette: "platinum_arch",
		lightTempK: 5800,
		heightMult: .9,
		explodedFactor: .25,
		recommendedExtensions: ["ext_pbr_glass_ior", "ext_usdz_visionos"],
		promptPreset: "Minimalistyczne matowe bryły ze szkła akrylowego z dichroicznymi, neonowymi krawędziami (błękit, róż i bursztyn) w przestrzeni AR VisionOS",
		specs: "Szkło Dichroiczne · IOR 1.49 · Krawędzie Fluorescencyjne"
	},
	{
		id: "ref-unknown-15-scifi-city",
		fileName: "Unknown_15_711a6bf4.jpeg",
		title: "Metropolia Przyszłości z Bioniczna Wieżą i Estakadami",
		collection: "VORONOI_TOWERS",
		collectionLabel: "Struktury Bioniczne i Helisy",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Unknown_15_711a6bf4.jpeg",
		proceduralTheme: "voronoi_spire",
		accentColor: "#06B6D4",
		secondaryColor: "#38BDF8",
		targetSceneId: "voronoi_bionic_spire",
		targetPalette: "cyan_blueprint",
		lightTempK: 5400,
		heightMult: 1.45,
		explodedFactor: 0,
		recommendedExtensions: ["ext_voronoi_lattice", "ext_gltf_draco"],
		promptPreset: "Futurystyczna metropolia z bioniczną wieżą łupinową, wielopoziomowymi estakadami magnetycznymi i autonomicznymi dronami patrolowymi w przestrzeni 3D",
		specs: "Egzoszkielet Bioniczny · Estakady 3D · Lot Drona"
	},
	{
		id: "ref-unknown-16-floating-glass",
		fileName: "Unknown_16_c3a65e84.jpeg",
		title: "Zawieszone Tafle Szkła Spatial UI (VisionOS Glass Panels)",
		collection: "AR_BOARDROOM",
		collectionLabel: "Stoły Holograficzne AR",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Unknown_16_c3a65e84.jpeg",
		proceduralTheme: "prism_blocks",
		accentColor: "#E2E8F0",
		secondaryColor: "#38BDF8",
		targetSceneId: "crystal_stacked_prism",
		targetPalette: "platinum_arch",
		lightTempK: 6e3,
		heightMult: 1.1,
		explodedFactor: .65,
		recommendedExtensions: ["ext_pbr_glass_ior", "ext_usdz_visionos"],
		promptPreset: "Wielowarstwowe zawieszone w powietrzu tafle matowego szkła optycznego z mikro-typografią i kostkami refrakcyjnymi, głęboka paralaksa 6DoF",
		specs: "Spatial Glass UI · Rozstrzelenie 65% · Paralaksa 6DoF"
	},
	{
		id: "ref-unknown-12-aero",
		fileName: "Unknown_12_bba1e6ab.jpeg",
		title: "Pawilon Parametryczny i Struktura Powłokowa",
		collection: "KINETIC_AERO",
		collectionLabel: "Kinetyczne Skrzydła i Aerodynamika",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Unknown_12_bba1e6ab.jpeg",
		proceduralTheme: "kinetic_wing",
		accentColor: "#10B981",
		secondaryColor: "#06B6D4",
		targetSceneId: "aero_hub",
		targetPalette: "emerald_matrix",
		lightTempK: 4600,
		heightMult: 1.15,
		explodedFactor: .2,
		recommendedExtensions: ["ext_kinetic_ribs", "ext_bim_ifc400"],
		promptPreset: "Rozpiętościowy terminal i pawilon parametryczny z kratownicą powłokową, zielony skan laserowy LiDAR i eksport siatki .STL do druku 3D",
		specs: "Powłoka Kratownicowa · Skan LiDAR · Eksport STL/OBJ"
	},
	{
		id: "ref-unknown-18-tower",
		fileName: "Unknown_18_dd448f4a.jpeg",
		title: "Dominanta Wysokościowa z Podświetleniem Krawędziowym",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Unknown_18_dd448f4a.jpeg",
		proceduralTheme: "stacked_glass",
		accentColor: "#F59E0B",
		secondaryColor: "#06B6D4",
		targetSceneId: "skyline_financial",
		targetPalette: "amber_gold",
		lightTempK: 3300,
		heightMult: 1.4,
		explodedFactor: .1,
		recommendedExtensions: ["ext_led_slab_core", "ext_pbr_glass_ior"],
		promptPreset: "Wysokościowiec ze świetlnymi krawędziami kondygnacji i ciepłym rdzeniem bursztynowym 3300K na blacie konferencyjnym",
		specs: "Iluminacja Krawędzi · Rdzeń 3300K · Skala 1.4x"
	},
	{
		id: "ref-unknown-10",
		fileName: "Unknown_10_9f8953aa.jpeg",
		title: "Makieta Koncepcyjna z Warstwowym Rdzeniem Świetlnym",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Unknown_10_9f8953aa.jpeg",
		proceduralTheme: "stacked_glass",
		accentColor: "#38BDF8",
		secondaryColor: "#F59E0B",
		targetSceneId: "crystal_stacked_prism",
		targetPalette: "cyan_blueprint",
		lightTempK: 4100,
		heightMult: 1.2,
		explodedFactor: .3,
		recommendedExtensions: ["ext_pbr_glass_ior", "ext_led_slab_core"],
		promptPreset: "Warstwowa makieta architektoniczna ze szlifowanego szkła z rozstrzelonymi kondygnacjami 30% i kolumnami LED",
		specs: "Szkło Warstwowe · Exploded View 30% · CAD OBJ"
	},
	{
		id: "ref-unknown-13",
		fileName: "Unknown_13_e4f01b9d.jpeg",
		title: "Struktura Przestrzenna i Analiza Kompozycji Głębi",
		collection: "VORONOI_TOWERS",
		collectionLabel: "Struktury Bioniczne i Helisy",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Unknown_13_e4f01b9d.jpeg",
		proceduralTheme: "voronoi_spire",
		accentColor: "#10B981",
		secondaryColor: "#38BDF8",
		targetSceneId: "voronoi_bionic_spire",
		targetPalette: "emerald_matrix",
		lightTempK: 4900,
		heightMult: 1.25,
		explodedFactor: .15,
		recommendedExtensions: ["ext_voronoi_lattice", "ext_gltf_draco"],
		promptPreset: "Analiza kompozycji przestrzennej i głębi obrazu dla parametrycznej wieży z podziałem złotego podziału (Golden Ratio)",
		specs: "Złoty Podział · Głębia Ostrości · Siatka Voronoi"
	},
	{
		id: "ref-img-1813",
		fileName: "IMG_1813_1fda0aa6.jpg",
		title: "Studium Bryłowe i Oświetlenie Środowiskowe HDR (IMG_1813)",
		collection: "AR_BOARDROOM",
		collectionLabel: "Stoły Holograficzne AR",
		localUrl: "/apps/holoarch_studio/assets/aistudio/IMG_1813_1fda0aa6.jpg",
		proceduralTheme: "boardroom_holo",
		accentColor: "#06B6D4",
		secondaryColor: "#F59E0B",
		targetSceneId: "skyline_financial",
		targetPalette: "cyan_blueprint",
		lightTempK: 3800,
		heightMult: 1.15,
		explodedFactor: 0,
		recommendedExtensions: ["ext_pbr_glass_ior", "ext_bim_ifc400"],
		promptPreset: "Studium bryłowe zespołu budynków z dynamiczną estymacją światła otoczenia HDR 3800K i cieniami kontaktowymi na blacie",
		specs: "HDR Light Estimation · Cienie Kontaktowe · ARKit 6"
	},
	{
		id: "ref-img-1814",
		fileName: "IMG_1814_964ef07f.jpg",
		title: "Detal Architektoniczny i Okluzja Czujnika Głębi (IMG_1814)",
		collection: "AR_BOARDROOM",
		collectionLabel: "Stoły Holograficzne AR",
		localUrl: "/apps/holoarch_studio/assets/aistudio/IMG_1814_964ef07f.jpg",
		proceduralTheme: "boardroom_holo",
		accentColor: "#F59E0B",
		secondaryColor: "#38BDF8",
		targetSceneId: "eco_atrium",
		targetPalette: "amber_gold",
		lightTempK: 3500,
		heightMult: 1.2,
		explodedFactor: .2,
		recommendedExtensions: ["ext_led_slab_core", "ext_usdz_visionos"],
		promptPreset: "Prezentacja detalu architektonicznego kampusu Eco-Atrium z włączoną okluzją głębi ToF/LiDAR i rozstrzeleniem warstw 20%",
		specs: "ToF Depth Occlusion · 120 FPS · Eco-Atrium"
	},
	{
		id: "ref-img-1820",
		fileName: "IMG_1820_c84a58a0.PNG",
		title: "Interfejs Przestrzenny i Telemetria LiDAR (IMG_1820)",
		collection: "AR_BOARDROOM",
		collectionLabel: "Stoły Holograficzne AR",
		localUrl: "/apps/holoarch_studio/assets/aistudio/IMG_1820_c84a58a0.PNG",
		proceduralTheme: "boardroom_holo",
		accentColor: "#10B981",
		secondaryColor: "#06B6D4",
		targetSceneId: "aero_hub",
		targetPalette: "emerald_matrix",
		lightTempK: 5200,
		heightMult: 1.1,
		explodedFactor: 0,
		recommendedExtensions: ["ext_gltf_draco", "ext_usdz_visionos"],
		promptPreset: "Widok telemetrii skanera LiDAR i siatki płaszczyzn stołu/podłogi dla węzła AeroHub z 6 agentami patrolowymi",
		specs: "Telemetria LiDAR · Siatka Płaszczyzn · 6 Agentów"
	},
	{
		id: "ref-img-1821",
		fileName: "IMG_1821_419a0ff6.PNG",
		title: "Konfiguracja Wielowarstwowa i Eksport CAD (IMG_1821)",
		collection: "AR_BOARDROOM",
		collectionLabel: "Stoły Holograficzne AR",
		localUrl: "/apps/holoarch_studio/assets/aistudio/IMG_1821_419a0ff6.PNG",
		proceduralTheme: "boardroom_holo",
		accentColor: "#E2E8F0",
		secondaryColor: "#38BDF8",
		targetSceneId: "crystal_stacked_prism",
		targetPalette: "platinum_arch",
		lightTempK: 4700,
		heightMult: 1.25,
		explodedFactor: .35,
		recommendedExtensions: ["ext_bim_ifc400", "ext_gltf_draco"],
		promptPreset: "Konfiguracja wielowarstwowa BIM z prowadnicami montażowymi i eksportem do .OBJ, .STL, .GLTF oraz .IFC",
		specs: "Prowadnice Montażowe · Eksport Multi-CAD"
	},
	(
	// 2. Inline Vision Attachments from User's 52-Image Batch
	{
		id: "ref-spirit-spire",
		fileName: "spirit.png",
		title: "Spirit Tower — Cylindryczny Wieżowiec z Żaglem Szklanym",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		proceduralTheme: "voronoi_spire",
		accentColor: "#38BDF8",
		secondaryColor: "#E2E8F0",
		targetSceneId: "voronoi_bionic_spire",
		targetPalette: "cyan_blueprint",
		lightTempK: 5600,
		heightMult: 1.55,
		explodedFactor: 0,
		recommendedExtensions: ["ext_pbr_glass_ior", "ext_bim_ifc400"],
		promptPreset: "Wysmukły cylindryczny wieżowiec Spirit Tower z podwójną szklaną osłoną żaglową zwężającą się ku szczytowi i portalowym wejściem u podstawy",
		specs: "Załącznik: spirit.png · Fasada Żaglowa · 310m"
	}),
	{
		id: "ref-100-boardroom",
		fileName: "100.png / 100.png_2K_20261026105650.jpg",
		title: "Hologram Wieżowców na Stole Zarządu + Złota Mapa Świata 2K",
		collection: "AR_BOARDROOM",
		collectionLabel: "Stoły Holograficzne AR",
		localUrl: "/apps/holoarch_studio/assets/aistudio/Dashboard_dex_eeffcbc7.jpg",
		proceduralTheme: "boardroom_holo",
		accentColor: "#06B6D4",
		secondaryColor: "#F59E0B",
		targetSceneId: "skyline_financial",
		targetPalette: "cyan_blueprint",
		lightTempK: 3200,
		heightMult: 1.3,
		explodedFactor: 0,
		recommendedExtensions: [
			"ext_pbr_glass_ior",
			"ext_led_slab_core",
			"ext_gltf_draco"
		],
		promptPreset: "Fotorealistyczna sala zarządu o zachodzie słońca 2K (100.png): na lustrzanym stole świeci błękitny hologram kompleksu wieżowców otoczony złotą mapą sieci globalnej i zawieszonymi ekranami HUD",
		specs: "Załącznik: 100.png (2K Master) · Stół AR + HUD"
	},
	{
		id: "ref-kinetic-wing-0",
		fileName: "-0.png / 67243a334ef658da6dda9b7adeabd8e0.jpg",
		title: "Rzeźba Kinetyczna „Titanium Wing” — Wachlarz 28 Piór",
		collection: "KINETIC_AERO",
		collectionLabel: "Kinetyczne Skrzydła i Aerodynamika",
		proceduralTheme: "kinetic_wing",
		accentColor: "#E2E8F0",
		secondaryColor: "#F59E0B",
		targetSceneId: "kinetic_calatrava_wing",
		targetPalette: "platinum_arch",
		lightTempK: 4300,
		heightMult: 1.35,
		explodedFactor: .12,
		recommendedExtensions: ["ext_kinetic_ribs", "ext_gltf_draco"],
		promptPreset: "Rzeźba kinetyczna ze szczotkowanego tytanu (-0.png): wygięty łukowo kręgosłup wspornikowy z rozpostartym wachlarzem 28 ostrych żeber aerodynamicznych na okrągłej bazie",
		specs: "Załącznik: -0.png · Szczotkowany Tytan · Spirala"
	},
	{
		id: "ref-hydro-splash-0",
		fileName: "0.jpg / 97a6d95b3b5cd53112ce5f0ec544853e.jpg",
		title: "Hydro-Rzeźba „Wodny Atletai Kula Refrakcyjna” (Liquid Splash)",
		collection: "HYDRO_CRYSTAL",
		collectionLabel: "Hydro-Rzeźby i Płynny Kryształ",
		proceduralTheme: "hydro_splash",
		accentColor: "#38BDF8",
		secondaryColor: "#E2E8F0",
		targetSceneId: "hydro_aqua_sculpture",
		targetPalette: "cyan_blueprint",
		lightTempK: 6200,
		heightMult: 1.25,
		explodedFactor: .18,
		recommendedExtensions: [
			"ext_hydro_refraction",
			"ext_pbr_glass_ior",
			"ext_usdz_visionos"
		],
		promptPreset: "Dynamiczna rzeźba wodna wyłaniająca się ze szklanego cylindra (0.jpg) z zawieszoną w powietrzu kulą wodną, bąbelkami tlenu i pełną refrakcją IOR 1.333",
		specs: "Załącznik: 0.jpg · Refrakcja Wody IOR 1.333 · Krople 3D"
	},
	{
		id: "ref-glass-series-1-34",
		fileName: "glass1.png · glass2.png · glass3.png · glass34.png",
		title: "Seria „Glass 1–34” — Warstwowe Makiety Szklane z Kolumnami LED",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		proceduralTheme: "stacked_glass",
		accentColor: "#38BDF8",
		secondaryColor: "#F59E0B",
		targetSceneId: "crystal_stacked_prism",
		targetPalette: "amber_gold",
		lightTempK: 3100,
		heightMult: 1.3,
		explodedFactor: .08,
		recommendedExtensions: [
			"ext_pbr_glass_ior",
			"ext_led_slab_core",
			"ext_bim_ifc400"
		],
		promptPreset: "Kolekcja makiet architektonicznych z grubych, fazowanych płyt szkła optycznego (glass1–glass34) przekładanych ciepłymi bursztynowymi kolumnami LED 3000K na czarnym postumencie",
		specs: "Załączniki: glass1..glass34.png · Tafle Akrylowe + LED"
	},
	{
		id: "ref-slamp-bach",
		fileName: "Floor_Table Lamp BACH by Slamp(1).jpg / cc.png",
		title: "Kolumna Świetlna „BACH by Slamp” — Plisowana Struktura Opalflex",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		proceduralTheme: "stacked_glass",
		accentColor: "#F59E0B",
		secondaryColor: "#E2E8F0",
		targetSceneId: "crystal_stacked_prism",
		targetPalette: "amber_gold",
		lightTempK: 2900,
		heightMult: 1.45,
		explodedFactor: 0,
		recommendedExtensions: ["ext_led_slab_core", "ext_pbr_glass_ior"],
		promptPreset: "Smukła, plisowana kolumna świetlna inspirowana lampą BACH by Slamp o ciepłej bursztynowej poświacie 2900K i rytmicznych wertykalnych żebrach rozpraszających światło",
		specs: "Załącznik: BACH by Slamp · Ciepły Rdzeń 2900K"
	},
	{
		id: "ref-voronoi-cellular-1fe",
		fileName: "1fecc7425ef19f12fa3d54b6d5ac5484.jpg / 2efa4e90.jpg",
		title: "Bioniczny Egzoszkielet Komórkowy Voronoi (Parametric Tower)",
		collection: "VORONOI_TOWERS",
		collectionLabel: "Struktury Bioniczne i Helisy",
		proceduralTheme: "voronoi_spire",
		accentColor: "#10B981",
		secondaryColor: "#06B6D4",
		targetSceneId: "voronoi_bionic_spire",
		targetPalette: "emerald_matrix",
		lightTempK: 4600,
		heightMult: 1.4,
		explodedFactor: .15,
		recommendedExtensions: ["ext_voronoi_lattice", "ext_bim_ifc400"],
		promptPreset: "Wieżowiec z organicznym egzoszkieletem komórkowym Voronoi (1fecc742 / 2efa4e90), ażurowa fasada strukturalna drukowana w 3D (.STL) i skanowana przez 6 agentów",
		specs: "Załączniki: 1fecc742 / 2efa4e90 · Siatka Voronoi"
	},
	{
		id: "ref-twisted-helix-343",
		fileName: "343118065365248330.jpg · 416090453061542214.jpg · 43002346.jpg",
		title: "Skręcone Wieże Helikalne i Diagrid Aerodynamiczny",
		collection: "VORONOI_TOWERS",
		collectionLabel: "Struktury Bioniczne i Helisy",
		proceduralTheme: "voronoi_spire",
		accentColor: "#06B6D4",
		secondaryColor: "#F59E0B",
		targetSceneId: "voronoi_bionic_spire",
		targetPalette: "cyan_blueprint",
		lightTempK: 4200,
		heightMult: 1.5,
		explodedFactor: .1,
		recommendedExtensions: ["ext_voronoi_lattice", "ext_pbr_glass_ior"],
		promptPreset: "Zespół skręconych wieżowców helikalnych o obrocie kondygnacji 90 stopni od bazy do korony, szklana fasada kurtynowa i stalowy diagrid obwodowy",
		specs: "Załączniki: 343118..430023 · Obrót Helisy 90°"
	},
	{
		id: "ref-aero-shells-5cc",
		fileName: "5cc3212a469f6df4e2b0d93e34009b1079066b98 m.jpg · 41820151.jpg",
		title: "Aerodynamiczne Łupiny Przemysłowe i Mosty Powietrzne",
		collection: "KINETIC_AERO",
		collectionLabel: "Kinetyczne Skrzydła i Aerodynamika",
		proceduralTheme: "kinetic_wing",
		accentColor: "#38BDF8",
		secondaryColor: "#F59E0B",
		targetSceneId: "aero_hub",
		targetPalette: "cyan_blueprint",
		lightTempK: 4800,
		heightMult: 1.2,
		explodedFactor: .2,
		recommendedExtensions: ["ext_kinetic_ribs", "ext_gltf_draco"],
		promptPreset: "Wielkoprzestrzenna forma aerodynamiczna z płynnymi przejściami fasady i wspornikowymi zadaszeniami (5cc3212a / 41820151), widoczna w locie drona nad górami",
		specs: "Załączniki: 5cc3212a / 41820151 · Forma Łupinowa"
	},
	{
		id: "ref-hydro-waves-923",
		fileName: "923f4fd53d66a355f323550495cae3e7.jpg · 66424b3d.jpg · 56a6072f.jpg",
		title: "Płynne Rzeźby Krystaliczne i Kaskady Wodne 6DoF",
		collection: "HYDRO_CRYSTAL",
		collectionLabel: "Hydro-Rzeźby i Płynny Kryształ",
		proceduralTheme: "hydro_splash",
		accentColor: "#06B6D4",
		secondaryColor: "#38BDF8",
		targetSceneId: "hydro_aqua_sculpture",
		targetPalette: "cyan_blueprint",
		lightTempK: 5900,
		heightMult: 1.3,
		explodedFactor: .25,
		recommendedExtensions: ["ext_hydro_refraction", "ext_pbr_glass_ior"],
		promptPreset: "Organiczna kaskada płynnego kryształu i zamrożonych kropel wody (923f4fd5 / 66424b3d / 56a6072f) z głęboką refrakcją światła i kaustyką na blacie stołu AR",
		specs: "Załączniki: 923f4fd5 / 66424b3d · Kaustyka Wodna"
	},
	{
		id: "ref-parametric-658-series",
		fileName: "658440408053312079.jpg · 658440408053313040.jpg · 658440408053313958.jpg",
		title: "Tryptyk Parametryczny „658440” — Bioniczne Rdzenie i Żebra",
		collection: "KINETIC_AERO",
		collectionLabel: "Kinetyczne Skrzydła i Aerodynamika",
		proceduralTheme: "kinetic_wing",
		accentColor: "#F59E0B",
		secondaryColor: "#E2E8F0",
		targetSceneId: "kinetic_calatrava_wing",
		targetPalette: "amber_gold",
		lightTempK: 3600,
		heightMult: 1.35,
		explodedFactor: .15,
		recommendedExtensions: ["ext_kinetic_ribs", "ext_voronoi_lattice"],
		promptPreset: "Tryptyk bionicznych struktur żebrowych (seria 65844040805331...) z płynną modulacją przekroju i metaliczną powłoką tytanowo-złotą",
		specs: "Załączniki: Seria 658440 (3 warianty) · Żebra 3D"
	},
	{
		id: "ref-studio-batch-12-23-as-bb-gg",
		fileName: "12.png · 13.png · 14.png · 23.png · as.png · bb.png · gg.png",
		title: "Kolekcja Makiety Szklane & Iluminacje Gablotowe (12..23, as, bb, gg)",
		collection: "GLASS_MAQUETTE",
		collectionLabel: "Wieżowce i Makiety Szklane",
		proceduralTheme: "stacked_glass",
		accentColor: "#38BDF8",
		secondaryColor: "#F59E0B",
		targetSceneId: "crystal_stacked_prism",
		targetPalette: "cyan_blueprint",
		lightTempK: 3900,
		heightMult: 1.25,
		explodedFactor: .2,
		recommendedExtensions: [
			"ext_pbr_glass_ior",
			"ext_led_slab_core",
			"ext_gltf_draco"
		],
		promptPreset: "Pełny zestaw gablotowych makiet architektonicznych (12.png, 13.png, 14.png, 23.png, as.png, bb.png, gg.png) z precyzyjnie wycinanymi laserowo płytami akrylowymi i podświetleniem rdzeniowym",
		specs: "Załączniki: 12..23.png, as, bb, gg · Makiety Laser-Cut"
	}
];
function renderProceduralPreviewSVG(item) {
	const { proceduralTheme, accentColor, secondaryColor } = item;
	if (proceduralTheme === "kinetic_wing") {
		return /* @__PURE__ */ _jsxDEV("svg", {
			viewBox: "0 0 320 180",
			className: "w-full h-32 bg-slate-950 block",
			children: [
				/* @__PURE__ */ _jsxDEV("defs", { children: /* @__PURE__ */ _jsxDEV("linearGradient", {
					id: `grad-${item.id}`,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [/* @__PURE__ */ _jsxDEV("stop", {
						offset: "0%",
						stopColor: accentColor,
						stopOpacity: "0.85"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 722,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("stop", {
						offset: "100%",
						stopColor: secondaryColor,
						stopOpacity: "0.35"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 723,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 721,
					columnNumber: 11
				}, this) }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 720,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("ellipse", {
					cx: "185",
					cy: "162",
					rx: "58",
					ry: "7",
					fill: accentColor,
					fillOpacity: "0.25"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 726,
					columnNumber: 9
				}, this),
				Array.from({ length: 18 }).map((_, i) => {
					const angle = -68 + i * 4.2;
					const len = 52 + Math.sin(i / 17 * Math.PI) * 58;
					return /* @__PURE__ */ _jsxDEV("g", {
						transform: `translate(185, 152) rotate(${angle})`,
						stroke: i % 3 === 0 ? secondaryColor : accentColor,
						children: /* @__PURE__ */ _jsxDEV("line", {
							x1: "0",
							y1: "0",
							x2: -len,
							y2: -i * 3.5,
							strokeWidth: "2.4",
							strokeLinecap: "round",
							opacity: .55 + i / 18 * .45
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 736,
							columnNumber: 15
						}, this)
					}, i, false, {
						fileName: _jsxFileName,
						lineNumber: 731,
						columnNumber: 13
					}, this);
				}),
				/* @__PURE__ */ _jsxDEV("path", {
					d: "M 185 156 Q 145 105 215 24",
					fill: "none",
					stroke: `url(#grad-${item.id})`,
					strokeWidth: "6",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 748,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 719,
			columnNumber: 7
		}, this);
	}
	if (proceduralTheme === "hydro_splash") {
		return /* @__PURE__ */ _jsxDEV("svg", {
			viewBox: "0 0 320 180",
			className: "w-full h-32 bg-slate-950 block",
			children: [
				/* @__PURE__ */ _jsxDEV("rect", {
					x: "105",
					y: "108",
					width: "110",
					height: "62",
					rx: "6",
					fill: accentColor,
					fillOpacity: "0.16",
					stroke: accentColor,
					strokeWidth: "1.5"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 762,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("ellipse", {
					cx: "160",
					cy: "108",
					rx: "55",
					ry: "9",
					fill: accentColor,
					fillOpacity: "0.3",
					stroke: secondaryColor,
					strokeWidth: "1.2"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 773,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("path", {
					d: "M 145 110 C 130 75, 110 55, 88 38 M 160 110 C 162 70, 175 48, 165 25 M 172 108 C 190 80, 215 72, 238 68",
					fill: "none",
					stroke: accentColor,
					strokeWidth: "5",
					strokeLinecap: "round"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 783,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("circle", {
					cx: "228",
					cy: "44",
					r: "16",
					fill: accentColor,
					fillOpacity: "0.28",
					stroke: secondaryColor,
					strokeWidth: "1.8"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 790,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("circle", {
					cx: "102",
					cy: "64",
					r: "6",
					fill: secondaryColor,
					fillOpacity: "0.7"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 799,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("circle", {
					cx: "135",
					cy: "34",
					r: "4.5",
					fill: accentColor,
					fillOpacity: "0.8"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 800,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("circle", {
					cx: "192",
					cy: "52",
					r: "5",
					fill: secondaryColor,
					fillOpacity: "0.75"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 801,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 761,
			columnNumber: 7
		}, this);
	}
	if (proceduralTheme === "voronoi_spire") {
		return /* @__PURE__ */ _jsxDEV("svg", {
			viewBox: "0 0 320 180",
			className: "w-full h-32 bg-slate-950 block",
			children: [
				/* @__PURE__ */ _jsxDEV("ellipse", {
					cx: "160",
					cy: "164",
					rx: "70",
					ry: "8",
					fill: accentColor,
					fillOpacity: "0.18"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 809,
					columnNumber: 9
				}, this),
				Array.from({ length: 8 }).map((_, idx) => {
					const y = 142 - idx * 16;
					const w = 56 - idx * 4.2;
					const shift = Math.sin(idx * .7) * 8;
					return /* @__PURE__ */ _jsxDEV("g", { children: /* @__PURE__ */ _jsxDEV("polygon", {
						points: `${160 - w + shift},${y} ${160 + w + shift},${y} ${160 + w * .85 - shift},${y - 14} ${160 - w * .85 - shift},${y - 14}`,
						fill: idx % 2 === 0 ? accentColor : secondaryColor,
						fillOpacity: "0.2",
						stroke: idx % 2 === 0 ? accentColor : secondaryColor,
						strokeWidth: "1.3"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 816,
						columnNumber: 15
					}, this) }, idx, false, {
						fileName: _jsxFileName,
						lineNumber: 815,
						columnNumber: 13
					}, this);
				}),
				/* @__PURE__ */ _jsxDEV("circle", {
					cx: "160",
					cy: "24",
					r: "10",
					fill: secondaryColor,
					fillOpacity: "0.4",
					stroke: accentColor,
					strokeWidth: "1.5"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 826,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 808,
			columnNumber: 7
		}, this);
	}
	// Default: stacked_glass or boardroom_holo
	return /* @__PURE__ */ _jsxDEV("svg", {
		viewBox: "0 0 320 180",
		className: "w-full h-32 bg-slate-950 block",
		children: [
			/* @__PURE__ */ _jsxDEV("polygon", {
				points: "60,158 260,158 285,172 35,172",
				fill: "#0F172A",
				stroke: accentColor,
				strokeWidth: "1.2"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 842,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("rect", {
				x: "132",
				y: "34",
				width: "14",
				height: "122",
				fill: secondaryColor,
				fillOpacity: "0.75"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 849,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("rect", {
				x: "174",
				y: "26",
				width: "14",
				height: "130",
				fill: secondaryColor,
				fillOpacity: "0.75"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 857,
				columnNumber: 7
			}, this),
			Array.from({ length: 9 }).map((_, s) => {
				const y = 142 - s * 13;
				const offset = (s % 3 - 1) * 9;
				const width = 116 - s * 4;
				return /* @__PURE__ */ _jsxDEV("rect", {
					x: 160 - width / 2 + offset,
					y,
					width,
					height: "7",
					rx: "1.5",
					fill: accentColor,
					fillOpacity: "0.32",
					stroke: accentColor,
					strokeWidth: "1.1"
				}, s, false, {
					fileName: _jsxFileName,
					lineNumber: 871,
					columnNumber: 11
				}, this);
			})
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 841,
		columnNumber: 5
	}, this);
}
export const StudioExtensionsHub = ({ config, onUpdateConfig, onUpdatePalette, onApplyPresetPrompt, onNotify }) => {
	const [selectedCollection, setSelectedCollection] = useState("ALL");
	const [searchQuery, setSearchQuery] = useState("");
	const [inspectedAsset, setInspectedAsset] = useState(null);
	const activeExtensions = config.activeExtensions || [
		"ext_pbr_glass_ior",
		"ext_led_slab_core",
		"ext_voronoi_lattice",
		"ext_gltf_draco"
	];
	const toggleExtension = (extId, extName) => {
		const exists = activeExtensions.includes(extId);
		const next = exists ? activeExtensions.filter((id) => id !== extId) : [...activeExtensions, extId];
		const partial = { activeExtensions: next };
		if (extId === "ext_voronoi_lattice" && !exists) {
			partial.wireframeOverlay = true;
		}
		if (extId === "ext_led_slab_core" && !exists) {
			partial.lightTemperatureK = 3100;
		}
		onUpdateConfig(partial);
		onNotify(exists ? `Wyłączono rozszerzenie: ${extName}` : `Aktywowano rozszerzenie: ${extName} w potoku renderowania 3D`);
	};
	const handleApplyAssetToStudio = (item) => {
		onUpdateConfig({
			sceneId: item.targetSceneId,
			customSceneTitle: item.title,
			activeReferenceImageId: item.id,
			lightTemperatureK: item.lightTempK,
			towerHeightMultiplier: item.heightMult,
			explodedViewFactor: item.explodedFactor,
			activeExtensions: Array.from(new Set([...activeExtensions, ...item.recommendedExtensions])),
			showSpatialAgents: true
		});
		onUpdatePalette(item.targetPalette);
		onApplyPresetPrompt(item.promptPreset);
		onNotify(`Załadowano wzorzec „${item.title}” (${item.fileName}) na scenę 3D wraz z rozszerzeniami shaderów!`);
	};
	const filteredAssets = useMemo(() => {
		return UPLOADED_REFERENCE_GALLERY.filter((item) => {
			const matchesCat = selectedCollection === "ALL" || item.collection === selectedCollection;
			const q = searchQuery.trim().toLowerCase();
			const matchesQuery = !q || item.title.toLowerCase().includes(q) || item.fileName.toLowerCase().includes(q) || item.specs.toLowerCase().includes(q) || item.collectionLabel.toLowerCase().includes(q);
			return matchesCat && matchesQuery;
		});
	}, [selectedCollection, searchQuery]);
	return /* @__PURE__ */ _jsxDEV("section", {
		id: "extensions-gallery",
		className: "space-y-8 pt-6 border-t border-slate-800/80",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-col lg:flex-row lg:items-end justify-between gap-4",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 text-xs text-cyan-400 font-mono",
							children: [/* @__PURE__ */ _jsxDEV(PackagePlus, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 971,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "01B. BIBLIOTEKA 52 ZAŁĄCZONYCH OBRAZKÓW WZORCOWYCH & ROZSZERZENIA 3D/AR" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 972,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 970,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("h2", {
							className: "text-2xl sm:text-3xl font-bold text-white font-display",
							children: "Galeria Obrazków Referencyjnych oraz Rozszerzenia Silnika (Shadery PBR, Voronoi, Hydro & CAD/BIM)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 974,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-sm text-slate-300 max-w-3xl leading-relaxed",
							children: [
								"Wszystkie przesłane obrazki referencyjne (makiety ze szlifowanego szkła",
								" ",
								/* @__PURE__ */ _jsxDEV("code", {
									className: "text-cyan-300",
									children: "glass1..34"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 979,
									columnNumber: 13
								}, this),
								", wieże bioniczne",
								" ",
								/* @__PURE__ */ _jsxDEV("code", {
									className: "text-cyan-300",
									children: "spirit.png / The Torch 325m"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 980,
									columnNumber: 13
								}, this),
								", rzeźba kinetycznego skrzydła ",
								/* @__PURE__ */ _jsxDEV("code", {
									className: "text-cyan-300",
									children: "-0.png"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 981,
									columnNumber: 35
								}, this),
								" oraz hydro-kryształy ",
								/* @__PURE__ */ _jsxDEV("code", {
									className: "text-cyan-300",
									children: "0.jpg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 982,
									columnNumber: 29
								}, this),
								") zostały zmapowane na nowe sceny 3D i rozszerzenia potoku Unity URP / Khronos glTF 2.0."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 977,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 969,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => {
							const res = exportProjectToGLTF(config);
							onNotify(`Wyeksportowano scenę 3D do formatu Khronos .GLTF 2.0 (${res.nodeCount} węzłów PBR Transmission)`);
						},
						className: "flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/40 rounded-lg transition-colors",
						children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 999,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pobierz .GLTF 2.0 (PBR Glass)" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1e3,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 989,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						type: "button",
						onClick: () => {
							exportProjectToIFC(config);
							onNotify("Wyeksportowano strukturę kondygnacji do formatu BIM .IFC (ISO-10303-21 IFC4)");
						},
						className: "flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 rounded-lg transition-colors",
						children: [/* @__PURE__ */ _jsxDEV(Boxes, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1012,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pobierz .IFC (BIM Level 400)" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1013,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1002,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 988,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 968,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5",
				children: [
					{
						sceneId: "crystal_stacked_prism",
						badge: "glass1..34.png · 50 Rise",
						title: "04. Makieta „Crystal Prism LED”",
						desc: "Kaskadowe tafle ze szlifowanego szkła optycznego IOR 1.52 z ciepłym rdzeniem LED 2900K.",
						palette: "amber_gold",
						color: "border-amber-500/40 bg-amber-500/10 text-amber-300"
					},
					{
						sceneId: "voronoi_bionic_spire",
						badge: "spirit.png · The Torch 325m",
						title: "05. Wieża „Voronoi Helix Spire”",
						desc: "Skręcona helisa wysokościowa 325m z komórkowym egzoszkieletem bionicznym Voronoi.",
						palette: "emerald_matrix",
						color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
					},
					{
						sceneId: "kinetic_calatrava_wing",
						badge: "-0.png · 67243a33.jpg",
						title: "06. Rzeźba „Aerodynamic Wing”",
						desc: "Wachlarzowa struktura bionicznych żeber tytanowych w spirali logarytmicznej.",
						palette: "platinum_arch",
						color: "border-slate-400/40 bg-slate-400/10 text-slate-200"
					},
					{
						sceneId: "hydro_aqua_sculpture",
						badge: "0.jpg · 97a6d95b · 923f4fd5",
						title: "07. Hydro-Rzeźba „Liquid Splash”",
						desc: "Dynamiczny wir wodny w cylindrze szklanym i zawieszone w próżni krople 3D.",
						palette: "cyan_blueprint",
						color: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
					}
				].map((card) => {
					const isCurrent = config.sceneId === card.sceneId;
					return /* @__PURE__ */ _jsxDEV("div", {
						className: `rounded-xl border p-4 flex flex-col justify-between transition-all ${isCurrent ? "bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"}`,
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: `px-2 py-0.5 text-[10px] font-mono rounded border ${card.color}`,
										children: card.badge
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1066,
										columnNumber: 19
									}, this), isCurrent && /* @__PURE__ */ _jsxDEV("span", {
										className: "text-[11px] font-mono text-cyan-400 flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1073,
											columnNumber: 23
										}, this), " Aktywna w 3D"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1072,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1065,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("h3", {
									className: "text-sm font-bold text-white",
									children: card.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1077,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-xs text-slate-400 leading-relaxed",
									children: card.desc
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1078,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1064,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => {
								onUpdateConfig({
									sceneId: card.sceneId,
									customSceneTitle: card.title,
									showSpatialAgents: true
								});
								onUpdatePalette(card.palette);
								onNotify(`Przełączono symulator 3D na nową scenę: ${card.title}`);
								const el = document.getElementById("simulator");
								if (el) el.scrollIntoView({ behavior: "smooth" });
							},
							className: `mt-3 w-full py-2 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${isCurrent ? "bg-cyan-500 text-slate-950" : "bg-slate-800 hover:bg-slate-700 text-slate-100"}`,
							children: [/* @__PURE__ */ _jsxDEV(Wand2, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1100,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: isCurrent ? "Widoczna na Scenie 3D ↑" : "Aktywuj ten Model 3D ↑" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1101,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1081,
							columnNumber: 15
						}, this)]
					}, card.sceneId, true, {
						fileName: _jsxFileName,
						lineNumber: 1056,
						columnNumber: 13
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1019,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-5",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ _jsxDEV("h3", {
								className: "text-base font-semibold text-white flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(ImageIcon, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1113,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Katalog Załączonych Obrazków i Wzorców Architektonicznych (Kliknij, aby załadować do 3D)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1114,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1112,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "text-xs text-slate-400",
								children: "Każdy obrazek posiada przypisany profil geometrii 3D, temperaturę barwową K, paletę shadera oraz gotowy prompt konstrukcyjny."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1118,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1111,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-wrap items-center gap-2",
							children: /* @__PURE__ */ _jsxDEV("div", {
								className: "relative",
								children: [/* @__PURE__ */ _jsxDEV(Filter, { className: "w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1126,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "text",
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									placeholder: "Szukaj pliku (np. spirit, glass1, 0.jpg)...",
									className: "bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1127,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1125,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1124,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1110,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex flex-wrap items-center gap-1.5",
						children: [
							{
								id: "ALL",
								label: "Wszystkie Kolekcje (52 pliki w 26 profilach)"
							},
							{
								id: "GLASS_MAQUETTE",
								label: "Makiety Szklane LED (glass1..34, 50 Rise)"
							},
							{
								id: "VORONOI_TOWERS",
								label: "Wieże Bioniczne Voronoi (spirit, The Torch)"
							},
							{
								id: "KINETIC_AERO",
								label: "Skrzydła Kinetyczne (-0.png, Seria 658)"
							},
							{
								id: "HYDRO_CRYSTAL",
								label: "Hydro-Rzeźby Wodne (0.jpg, 923f)"
							},
							{
								id: "AR_BOARDROOM",
								label: "Stoły Konferencyjne AR (100.png, IMG_1813..21)"
							}
						].map((tab) => /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => setSelectedCollection(tab.id),
							className: `px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedCollection === tab.id ? "bg-cyan-500 text-slate-950 border-cyan-400 font-semibold" : "bg-slate-950/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"}`,
							children: tab.label
						}, tab.id, false, {
							fileName: _jsxFileName,
							lineNumber: 1148,
							columnNumber: 13
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1139,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
						children: filteredAssets.map((item) => {
							const isSelected = config.activeReferenceImageId === item.id;
							return /* @__PURE__ */ _jsxDEV("div", {
								className: `group rounded-xl overflow-hidden border flex flex-col justify-between transition-all ${isSelected ? "bg-slate-900 border-cyan-400 ring-1 ring-cyan-400/40" : "bg-slate-950/90 border-slate-800/90 hover:border-slate-700"}`,
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "relative h-32 w-full overflow-hidden bg-slate-950 border-b border-slate-800/80",
									children: [
										item.localUrl ? /* @__PURE__ */ _jsxDEV("img", {
											src: item.localUrl,
											alt: item.title,
											referrerPolicy: "no-referrer",
											className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1182,
											columnNumber: 23
										}, this) : renderProceduralPreviewSVG(item),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-950/90 border border-slate-700/80 text-[10px] font-mono text-cyan-300",
											children: item.collectionLabel
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1191,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => setInspectedAsset(item),
											className: "absolute top-2 right-2 p-1.5 rounded bg-slate-950/85 hover:bg-slate-900 text-slate-200 border border-slate-700/80",
											title: "Podgląd szczegółów i promptu wzorca",
											children: /* @__PURE__ */ _jsxDEV(Eye, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1200,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1194,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1180,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "p-3.5 space-y-1.5",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "text-[11px] font-mono text-amber-400 truncate",
											title: item.fileName,
											children: item.fileName
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1206,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("h4", {
											className: "text-xs sm:text-sm font-semibold text-white leading-snug line-clamp-2",
											children: item.title
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1209,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("p", {
											className: "text-[11px] text-slate-400 font-mono",
											children: item.specs
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1212,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1205,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1178,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: "p-3 pt-0 flex items-center gap-2",
									children: /* @__PURE__ */ _jsxDEV("button", {
										type: "button",
										onClick: () => handleApplyAssetToStudio(item),
										className: `flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${isSelected ? "bg-emerald-500 text-slate-950" : "bg-cyan-500/15 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30"}`,
										children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1227,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", { children: isSelected ? "Aktywny w 3D" : "Załaduj do 3D i Promptu" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1228,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1218,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1217,
									columnNumber: 17
								}, this)]
							}, item.id, true, {
								fileName: _jsxFileName,
								lineNumber: 1170,
								columnNumber: 15
							}, this);
						})
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1166,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1109,
				columnNumber: 7
			}, this),
			inspectedAsset && /* @__PURE__ */ _jsxDEV("div", {
				className: "bg-slate-900 border border-cyan-500/50 rounded-xl p-5 space-y-4 shadow-2xl",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3",
					children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
						className: "text-xs font-mono text-cyan-400",
						children: ["Szczegóły załączonego wzorca: ", inspectedAsset.fileName]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1242,
						columnNumber: 15
					}, this), /* @__PURE__ */ _jsxDEV("h4", {
						className: "text-lg font-bold text-white",
						children: inspectedAsset.title
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1245,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1241,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => {
								handleApplyAssetToStudio(inspectedAsset);
								setInspectedAsset(null);
							},
							className: "px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs rounded-lg",
							children: "Zastosuj na Scenie 3D"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1248,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => setInspectedAsset(null),
							className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg",
							children: "Zamknij"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1258,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1247,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1240,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-12 gap-4 items-center",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "md:col-span-4 rounded-lg overflow-hidden border border-slate-800 bg-slate-950",
						children: inspectedAsset.localUrl ? /* @__PURE__ */ _jsxDEV("img", {
							src: inspectedAsset.localUrl,
							alt: inspectedAsset.title,
							referrerPolicy: "no-referrer",
							className: "w-full h-48 object-cover"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1271,
							columnNumber: 17
						}, this) : renderProceduralPreviewSVG(inspectedAsset)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1269,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "md:col-span-8 space-y-3 text-xs",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 gap-2",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: "p-2.5 rounded bg-slate-950 border border-slate-800",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-400 block",
										children: "Docelowa Scena 3D:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1284,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-cyan-300 font-semibold",
										children: inspectedAsset.targetSceneId
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1285,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1283,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "p-2.5 rounded bg-slate-950 border border-slate-800",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-400 block",
										children: "Temperatura Światła:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1290,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-amber-300 font-semibold",
										children: [inspectedAsset.lightTempK, " K"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1291,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1289,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "p-2.5 rounded bg-slate-950 border border-slate-800",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-400 block",
										children: "Skala Wysokości / Warstwy:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1296,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-emerald-300 font-semibold",
										children: [
											inspectedAsset.heightMult,
											"x / ",
											(inspectedAsset.explodedFactor * 100).toFixed(0),
											"%"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1297,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1295,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1282,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "p-3 rounded bg-slate-950 border border-slate-800 space-y-1",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "text-slate-400 font-medium block",
								children: "Przypisany Prompt Architektoniczny AI:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1303,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("p", {
								className: "text-slate-200 font-mono leading-relaxed",
								children: inspectedAsset.promptPreset
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1306,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1302,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1281,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1268,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1239,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-5",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-base font-semibold text-white flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Cpu, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1320,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Menedżer Rozszerzeń Systemowych Unity 6 URP, Shaderów PBR i Eksporterów CAD/BIM" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1321,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1319,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-400",
							children: "Włącz lub wyłącz dedykowane rozszerzenia silnika. Aktywne wtyczki natychmiast aktualizują render 3D oraz dołączają pakiety C# / ShaderGraph do specyfikacji."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1325,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1318,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("span", {
						className: "text-xs font-mono text-emerald-400 shrink-0",
						children: [
							"Aktywne rozszerzenia: ",
							activeExtensions.length,
							" / ",
							STUDIO_EXTENSIONS_CATALOG.length
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1330,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1317,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
					children: STUDIO_EXTENSIONS_CATALOG.map((ext) => {
						const isEnabled = activeExtensions.includes(ext.id);
						return /* @__PURE__ */ _jsxDEV("div", {
							className: `p-4 rounded-xl border flex flex-col justify-between transition-all ${isEnabled ? "bg-slate-950/95 border-cyan-500/50" : "bg-slate-950/50 border-slate-800/80 opacity-80"}`,
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-cyan-300",
											children: ext.badge
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1349,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "text-[10px] font-mono text-slate-400",
											children: ext.version
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1352,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1348,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("h4", {
										className: "text-xs sm:text-sm font-bold text-white leading-snug",
										children: ext.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1354,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("p", {
										className: "text-xs text-slate-400 leading-relaxed",
										children: ext.description
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1357,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1347,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "pt-3 mt-3 border-t border-slate-800/80 space-y-2",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-1.5 text-[10px] font-mono text-slate-400 truncate",
									children: [/* @__PURE__ */ _jsxDEV(Code2, { className: "w-3 h-3 text-amber-400 shrink-0" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1362,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "truncate",
										children: ext.unityPackage
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1363,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1361,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									type: "button",
									onClick: () => toggleExtension(ext.id, ext.name),
									className: `w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${isEnabled ? "bg-emerald-500/20 border border-emerald-500/50 text-emerald-300" : "bg-slate-800 hover:bg-slate-700 text-slate-300"}`,
									children: isEnabled ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1376,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Rozszerzenie Aktywne" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1377,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1375,
										columnNumber: 23
									}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1381,
										columnNumber: 25
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Włącz Rozszerzenie" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1382,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1380,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1365,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1360,
								columnNumber: 17
							}, this)]
						}, ext.id, true, {
							fileName: _jsxFileName,
							lineNumber: 1339,
							columnNumber: 15
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1335,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1316,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 966,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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RDs7Ozs7a0JBQ0wsd0JBQUMsVUFBRDtTQUNFLE1BQUs7U0FDTCxlQUFlLGdCQUFnQixJQUFJLElBQUksSUFBSSxJQUFJO1NBQy9DLFdBQVcsa0hBQ1QsWUFDSSxvRUFDQTttQkFHTCxZQUNDLGdEQUNFLHdCQUFDLE9BQUQsRUFBTyxXQUFVLGNBQWU7Ozs7bUJBQ2hDLHdCQUFDLFFBQUQsWUFBTSx1QkFBMEI7Ozs7aUJBQ2hDOzs7O29CQUVGLGdEQUNFLHdCQUFDLFFBQUQsRUFBUSxXQUFVLGNBQWU7Ozs7bUJBQ2pDLHdCQUFDLFFBQUQsWUFBTSxxQkFBd0I7Ozs7aUJBQzlCOzs7OztRQUVFOzs7O2dCQUNMOzs7OztlQUNGO1NBL0NFLElBQUk7Ozs7YUErQ047S0FFVCxDQUFDO0lBQ0U7Ozs7WUFDRjs7Ozs7O0VBQ0U7Ozs7OztBQUViIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIlN0dWRpb0V4dGVuc2lvbnNIdWIudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIEJveGVzLFxuICBDaGVjayxcbiAgQ29kZTIsXG4gIENwdSxcbiAgRG93bmxvYWQsXG4gIEV5ZSxcbiAgRmlsZUNvZGUsXG4gIEZpbHRlcixcbiAgSW1hZ2UgYXMgSW1hZ2VJY29uLFxuICBMYXllcnMsXG4gIFBhY2thZ2VQbHVzLFxuICBTcGFya2xlcyxcbiAgV2FuZDIsXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQge1xuICBBUkNvbmZpZ1N0YXRlLFxuICBBcmNoaXRlY3R1cmFsU2NlbmVJZCxcbiAgSG9sb2dyYW1QYWxldHRlSWQsXG4gIFN0dWRpb0V4dGVuc2lvbklkLFxufSBmcm9tICcuLi90eXBlcy9hclN0dWRpbyc7XG5pbXBvcnQgeyBleHBvcnRQcm9qZWN0VG9HTFRGLCBleHBvcnRQcm9qZWN0VG9JRkMgfSBmcm9tICcuLi91dGlscy9leHBvcnRlcnMnO1xuXG5pbnRlcmZhY2UgU3R1ZGlvRXh0ZW5zaW9uc0h1YlByb3BzIHtcbiAgY29uZmlnOiBBUkNvbmZpZ1N0YXRlO1xuICBvblVwZGF0ZUNvbmZpZzogKHBhcnRpYWw6IFBhcnRpYWw8QVJDb25maWdTdGF0ZT4pID0+IHZvaWQ7XG4gIG9uVXBkYXRlUGFsZXR0ZTogKHBhbGV0dGU6IEhvbG9ncmFtUGFsZXR0ZUlkKSA9PiB2b2lkO1xuICBvbkFwcGx5UHJlc2V0UHJvbXB0OiAocHJvbXB0VGV4dDogc3RyaW5nKSA9PiB2b2lkO1xuICBvbk5vdGlmeTogKG1zZzogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlZmVyZW5jZUFzc2V0SXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbGxlY3Rpb246XG4gICAgfCAnQUxMJ1xuICAgIHwgJ0dMQVNTX01BUVVFVFRFJ1xuICAgIHwgJ1ZPUk9OT0lfVE9XRVJTJ1xuICAgIHwgJ0tJTkVUSUNfQUVSTydcbiAgICB8ICdIWURST19DUllTVEFMJ1xuICAgIHwgJ0FSX0JPQVJEUk9PTSc7XG4gIGNvbGxlY3Rpb25MYWJlbDogc3RyaW5nO1xuICBsb2NhbFVybD86IHN0cmluZztcbiAgcHJvY2VkdXJhbFRoZW1lOlxuICAgIHwgJ3N0YWNrZWRfZ2xhc3MnXG4gICAgfCAndm9yb25vaV9zcGlyZSdcbiAgICB8ICdraW5ldGljX3dpbmcnXG4gICAgfCAnaHlkcm9fc3BsYXNoJ1xuICAgIHwgJ2JvYXJkcm9vbV9ob2xvJ1xuICAgIHwgJ3ByaXNtX2Jsb2Nrcyc7XG4gIGFjY2VudENvbG9yOiBzdHJpbmc7XG4gIHNlY29uZGFyeUNvbG9yOiBzdHJpbmc7XG4gIHRhcmdldFNjZW5lSWQ6IEFyY2hpdGVjdHVyYWxTY2VuZUlkO1xuICB0YXJnZXRQYWxldHRlOiBIb2xvZ3JhbVBhbGV0dGVJZDtcbiAgbGlnaHRUZW1wSzogbnVtYmVyO1xuICBoZWlnaHRNdWx0OiBudW1iZXI7XG4gIGV4cGxvZGVkRmFjdG9yOiBudW1iZXI7XG4gIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogU3R1ZGlvRXh0ZW5zaW9uSWRbXTtcbiAgcHJvbXB0UHJlc2V0OiBzdHJpbmc7XG4gIHNwZWNzOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU3R1ZGlvRXh0ZW5zaW9uRGVmaW5pdGlvbiB7XG4gIGlkOiBTdHVkaW9FeHRlbnNpb25JZDtcbiAgbmFtZTogc3RyaW5nO1xuICB2ZXJzaW9uOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiAnU2hhZGVyICYgT3B0aWNzJyB8ICdQYXJhbWV0cmljIEdlb21ldHJ5JyB8ICdDQUQgLyBCSU0gLyBYUiBQaXBlbGluZSc7XG4gIGJhZGdlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHVuaXR5UGFja2FnZTogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgU1RVRElPX0VYVEVOU0lPTlNfQ0FUQUxPRzogU3R1ZGlvRXh0ZW5zaW9uRGVmaW5pdGlvbltdID0gW1xuICB7XG4gICAgaWQ6ICdleHRfcGJyX2dsYXNzX2lvcicsXG4gICAgbmFtZTogJ09wdGljYWwgQ3J5c3RhbCBHbGFzcyBTaGFkZXIgKElPUiAxLjUyICsgQ2hyb21hdGljIERpc3BlcnNpb24pJyxcbiAgICB2ZXJzaW9uOiAndjIuNC4wJyxcbiAgICBjYXRlZ29yeTogJ1NoYWRlciAmIE9wdGljcycsXG4gICAgYmFkZ2U6ICdLSFJfbWF0ZXJpYWxzX3RyYW5zbWlzc2lvbicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnWmFhd2Fuc293YW55IHNoYWRlciByZWZyYWtjamkgc3prxYJhIGFrcnlsb3dlZ28gaSBvcHR5Y3puZWdvIGRsYSBtYWtpZXQgd2Fyc3R3b3d5Y2ggKGdsYXNzMS4uZ2xhc3MzNCkuIERvZGFqZSBkeXNwZXJzasSZIHByeXptYXR5Y3puxIUgbmEgZmF6b3dhbnljaCBrcmF3xJlkemlhY2ggc3Ryb3DDs3cuJyxcbiAgICB1bml0eVBhY2thZ2U6ICdjb20uaG9sb2FyY2gudXJwLm9wdGljYWwtZ2xhc3MnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdleHRfbGVkX3NsYWJfY29yZScsXG4gICAgbmFtZTogJ1dhcm0gTEVEIENvcmUgJiBGbG9vciBTbGFiIEFycmF5ICgyOTAwSyBFbWlzc2l2ZSBWb2x1bWV0cmljcyknLFxuICAgIHZlcnNpb246ICd2MS45LjInLFxuICAgIGNhdGVnb3J5OiAnU2hhZGVyICYgT3B0aWNzJyxcbiAgICBiYWRnZTogJ0hEUiBCbG9vbSArIEFyZWFMaWdodCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnV2V3bsSZdHJ6bmUga29sdW1ueSDFm3dpZXRsbmUgTEVEIG8gY2llcMWCZWogYmFyd2llIDI5MDBL4oCTMzIwMEsgcG9kxZt3aWV0bGFqxIVjZSBwcnplenJvY3p5c3RlIHRhZmxlIHN0cm9wb3dlIG9kIMWbcm9ka2EgbWFraWV0eS4nLFxuICAgIHVuaXR5UGFja2FnZTogJ2NvbS5ob2xvYXJjaC52ZngubGVkLWNvcmUtYXJyYXknLFxuICB9LFxuICB7XG4gICAgaWQ6ICdleHRfdm9yb25vaV9sYXR0aWNlJyxcbiAgICBuYW1lOiAnQmlvbmljIFZvcm9ub2kgRXhvc2tlbGV0b24gJiBUd2lzdGVkIERpYWdyaWQgR2VuZXJhdG9yJyxcbiAgICB2ZXJzaW9uOiAndjMuMS4wJyxcbiAgICBjYXRlZ29yeTogJ1BhcmFtZXRyaWMgR2VvbWV0cnknLFxuICAgIGJhZGdlOiAnUHJvY2VkdXJhbCBNZXNoIC8gQ29tcHV0ZScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnR2VuZXJhdG9yIGtvbcOzcmtvd3ljaCBzdHJ1a3R1ciBiaW9uaWN6bnljaCBWb3Jvbm9pIG9yYXogc2tyxJljb255Y2ggaGVsaXMgd3lzb2tvxZtjaW93eWNoIChpbnNwaXJvd2FueSBUaGUgVG9yY2ggMzI1bSBvcmF6IHdpZcW8YW1pIGJpb25pY3puby1wYXJhbWV0cnljem55bWkpLicsXG4gICAgdW5pdHlQYWNrYWdlOiAnY29tLmhvbG9hcmNoLnBhcmFtZXRyaWMudm9yb25vaS1zcGlyZScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2V4dF9raW5ldGljX3JpYnMnLFxuICAgIG5hbWU6ICdLaW5ldGljIFRpdGFuaXVtIFdpbmcgJiBMb2dhcml0aG1pYyBGaW4gQW5pbWF0b3InLFxuICAgIHZlcnNpb246ICd2Mi4wLjUnLFxuICAgIGNhdGVnb3J5OiAnUGFyYW1ldHJpYyBHZW9tZXRyeScsXG4gICAgYmFkZ2U6ICc2RG9GIEhhcm1vbmljIFNvbHZlcicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnTW9kdcWCIGFuaW1hY2ppIHdhY2hsYXJ6b3d5Y2ggxbxlYmVyIGkgcGnDs3IgdHl0YW5vd3ljaCB6ZSB6bWllbm55bSBwcnplc3VuacSZY2llbSBmYXpvd3ltICh3em9yb3dhbnkgbmEgcnplxbpiaWUga2luZXR5Y3puZWdvIHNrcnp5ZMWCYSAtMC5wbmcgLyBDYWxhdHJhdmEgc3R5bGUpLicsXG4gICAgdW5pdHlQYWNrYWdlOiAnY29tLmhvbG9hcmNoLmtpbmV0aWMuYWVyb3dpbmcnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdleHRfaHlkcm9fcmVmcmFjdGlvbicsXG4gICAgbmFtZTogJ0h5ZHJvLUFxdWEgRmx1aWQgVm9ydGV4ICYgU3VzcGVuZGVkIERyb3BsZXQgRW1pdHRlcicsXG4gICAgdmVyc2lvbjogJ3YxLjguNCcsXG4gICAgY2F0ZWdvcnk6ICdTaGFkZXIgJiBPcHRpY3MnLFxuICAgIGJhZGdlOiAnSU9SIDEuMzMzICsgQ2F1c3RpY3MnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1N5bXVsYWNqYSB6YW1yb8W8b25laiB3IGN6YXNpZSBmYWxpIHdvZG5laiwgd2lydSB3IGN5bGluZHJ5Y3pueW0gbmFjenluaXUgb3JheiB6YXdpZXN6b255Y2ggdyBwb3dpZXRyenUgc2Zlcnljem55Y2gga3JvcGVsIHoga2F1c3R5a8SFIMWbd2lldGxuxIUgKDAuanBnKS4nLFxuICAgIHVuaXR5UGFja2FnZTogJ2NvbS5ob2xvYXJjaC5mbHVpZHMuYXF1YS1zY3VscHR1cmUnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdleHRfZ2x0Zl9kcmFjbycsXG4gICAgbmFtZTogJ0tocm9ub3MgZ2xURiAyLjAgLyBHTEIgUEJSIFRyYW5zbWlzc2lvbiBFeHBvcnRlcicsXG4gICAgdmVyc2lvbjogJ3Y0LjAuMScsXG4gICAgY2F0ZWdvcnk6ICdDQUQgLyBCSU0gLyBYUiBQaXBlbGluZScsXG4gICAgYmFkZ2U6ICcuR0xURiAvIC5HTEIgMi4wJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdCZXpwb8WbcmVkbmlhIHNlcmlhbGl6YWNqYSBzY2VueSAzRCB6IHphY2hvd2FuaWVtIG1hdGVyaWHFgsOzdyBwcnplenJvY3p5c3R5Y2ggSU9SLCB3xJl6xYLDs3cgaGllcmFyY2hpaSBpIG1ldGFkYW55Y2ggQVIgZG8gZm9ybWF0dSBLaHJvbm9zIGdsVEYgMi4wLicsXG4gICAgdW5pdHlQYWNrYWdlOiAnY29tLnVuaXR5LmNsb3VkLmdsdGZhc3QnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdleHRfYmltX2lmYzQwMCcsXG4gICAgbmFtZTogJ0lTTy0xMDMwMy0yMSBJRkM0IEJJTSBMZXZlbCA0MDAgQXJjaGl0ZWN0dXJhbCBFeHBvcnRlcicsXG4gICAgdmVyc2lvbjogJ3YyLjcuMCcsXG4gICAgY2F0ZWdvcnk6ICdDQUQgLyBCSU0gLyBYUiBQaXBlbGluZScsXG4gICAgYmFkZ2U6ICcuSUZDIChSZXZpdCAvIEFyY2hpQ0FEKScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRWtzcG9ydCBzdHJ1a3R1cnkga29uZHlnbmFjamkgKElmY0J1aWxkaW5nU3RvcmV5KSwgcnrEmWRueWNoIHd5c29rb8WbY2lvd3ljaCBpIG9zaSBrb25zdHJ1a2N5am55Y2ggZG8gbmF0eXduZWdvIGZvcm1hdHUgQklNIElGQzQuJyxcbiAgICB1bml0eVBhY2thZ2U6ICdjb20uaG9sb2FyY2guYmltLmlmYzQtYnJpZGdlJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnZXh0X3VzZHpfdmlzaW9ub3MnLFxuICAgIG5hbWU6ICdBcHBsZSBWaXNpb25PUyAmIEFSS2l0IFF1aWNrTG9vayBVU0RaIFNwYXRpYWwgQnJpZGdlJyxcbiAgICB2ZXJzaW9uOiAndjEuNi4wJyxcbiAgICBjYXRlZ29yeTogJ0NBRCAvIEJJTSAvIFhSIFBpcGVsaW5lJyxcbiAgICBiYWRnZTogJy5VU0RaIC8gUmVhbGl0eUtpdCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnUHJvZmlsIGtvbXBhdHliaWxub8WbY2kgeiBBcHBsZSBWaXNpb24gUHJvIChSZWFsaXR5S2l0IFNoYWRlckdyYXBoKSBvcmF6IG5hdHl3bnltIHBvZGdsxIVkZW0gQVIgUXVpY2tMb29rIG5hIGlQYWQgUHJvIE00IGkgaVBob25lIDE2IFByby4nLFxuICAgIHVuaXR5UGFja2FnZTogJ2NvbS51bml0eS5wb2x5c3BhdGlhbC52aXNpb25vcycsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgVVBMT0FERURfUkVGRVJFTkNFX0dBTExFUlk6IFJlZmVyZW5jZUFzc2V0SXRlbVtdID0gW1xuICAvLyAxLiBEaXJlY3QgbG9jYWwgd29ya3NwYWNlIGFzc2V0cyBpbiAvcHVibGljL2Fzc2V0cy9haXN0dWRpby9cbiAge1xuICAgIGlkOiAncmVmLWRhc2hib2FyZC1kZXgnLFxuICAgIGZpbGVOYW1lOiAnT2JyYXplayBBcHBsZSBDcmVhdG9yIFN0dWRpbyAyMDI2LTEwLTI2XzEwLTI3LTUyXzIucG5nJyxcbiAgICB0aXRsZTogJ1N0w7PFgiBLb25mZXJlbmN5am55IEFSIOKAnkdsb2JhbCBOZXR3b3JrIEhvbG9ncmFt4oCdJyxcbiAgICBjb2xsZWN0aW9uOiAnQVJfQk9BUkRST09NJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdG/FgnkgSG9sb2dyYWZpY3puZSBBUicsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL0Rhc2hib2FyZF9kZXhfZWVmZmNiYzcuanBnJyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICdib2FyZHJvb21faG9sbycsXG4gICAgYWNjZW50Q29sb3I6ICcjMDZCNkQ0JyxcbiAgICBzZWNvbmRhcnlDb2xvcjogJyNGNTlFMEInLFxuICAgIHRhcmdldFNjZW5lSWQ6ICdza3lsaW5lX2ZpbmFuY2lhbCcsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ2N5YW5fYmx1ZXByaW50JyxcbiAgICBsaWdodFRlbXBLOiAzNDAwLFxuICAgIGhlaWdodE11bHQ6IDEuMjUsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMCxcbiAgICByZWNvbW1lbmRlZEV4dGVuc2lvbnM6IFsnZXh0X3Bicl9nbGFzc19pb3InLCAnZXh0X2dsdGZfZHJhY28nXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnSG9sb2dyYWZpY3puYSBtYWtpZXRhIGtvbXBsZWtzdSB3aWXFvG93Y8OzdyBmaW5hbnNvd3ljaCBuYSBjemFybnltIGx1c3RyemFueW0gc3RvbGUga29uZmVyZW5jeWpueW0gbyB6YWNob2R6aWUgc8WCb8WEY2EgMzQwMEssIMWbd2llY8SFY2EgbWFwYSDFm3dpYXRhIHcgYmxhY2llIGkgemF3aWVzem9uZSBwYW5lbGUgdGVsZW1ldHJpaSBBUiA2RG9GJyxcbiAgICBzcGVjczogJ1NjZW5hOiBTa3lsaW5lIENvcmUgwrcgQmxhdCArIE1hcGEgxZp3aWF0YSDCtyBIRFIgMzQwMEsnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtNTAtcmlzZS10b3dlcicsXG4gICAgZmlsZU5hbWU6ICc1MF9SaXNlX1Rvd2VyXzY2OTc2YWQxLmpwZWcnLFxuICAgIHRpdGxlOiAnNTAgUmlzZSBUb3dlciDigJQgS2Fza2Fkb3dhIFdpZcW8YSB6IFppZWxvbnltaSBUYXJhc2FtaScsXG4gICAgY29sbGVjdGlvbjogJ0dMQVNTX01BUVVFVFRFJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdXaWXFvG93Y2UgaSBNYWtpZXR5IFN6a2xhbmUnLFxuICAgIGxvY2FsVXJsOiAnL2Fzc2V0cy9haXN0dWRpby81MF9SaXNlX1Rvd2VyXzY2OTc2YWQxLmpwZWcnLFxuICAgIHByb2NlZHVyYWxUaGVtZTogJ3N0YWNrZWRfZ2xhc3MnLFxuICAgIGFjY2VudENvbG9yOiAnIzM4QkRGOCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjMTBCOTgxJyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnY3J5c3RhbF9zdGFja2VkX3ByaXNtJyxcbiAgICB0YXJnZXRQYWxldHRlOiAnY3lhbl9ibHVlcHJpbnQnLFxuICAgIGxpZ2h0VGVtcEs6IDQ4MDAsXG4gICAgaGVpZ2h0TXVsdDogMS4zNSxcbiAgICBleHBsb2RlZEZhY3RvcjogMC4xNSxcbiAgICByZWNvbW1lbmRlZEV4dGVuc2lvbnM6IFsnZXh0X3Bicl9nbGFzc19pb3InLCAnZXh0X2xlZF9zbGFiX2NvcmUnXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnV3lzb2tvxZtjaW93aWVjIDUwIFJpc2UgVG93ZXIgeiB6YW9rcsSFZ2xvbnltaSBuYXJvxbxuaWthbWksIHdhcnN0d293eW1pIHDFgnl0YW1pIHN0cm9wb3d5bWkgaSB6aWVsb255bSBwb2RpdW0gYmlva2xpbWF0eWN6bnltLCBwcmV6ZW50YWNqYSBBUiAxOjEwMCBuYSBzdG9sZSBhcmNoaXRla3Rvbmljem55bScsXG4gICAgc3BlY3M6ICdXeXNva2/Fm8SHOiAyNDVtIMK3IFphb2tyxIVnbG9uZSBzdHJvcHkgwrcgUG9kaXVtIGthc2thZG93ZScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1ueS10aGUtdG9yY2gnLFxuICAgIGZpbGVOYW1lOiAnTkVXX1lPUktfX19UaGVfVG9yY2hfLV83NDBfOHRoX0F2ZW51ZV9fXzMyNW0uanBlZycsXG4gICAgdGl0bGU6ICdORVcgWU9SSyB8IFRoZSBUb3JjaCAoNzQwIDh0aCBBdmUpIOKAlCAzMjVtIFNwaXJhbCBTcGlyZScsXG4gICAgY29sbGVjdGlvbjogJ1ZPUk9OT0lfVE9XRVJTJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdHJ1a3R1cnkgQmlvbmljem5lIGkgSGVsaXN5JyxcbiAgICBsb2NhbFVybDpcbiAgICAgICcvYXNzZXRzL2Fpc3R1ZGlvL05FV19ZT1JLX19fVGhlX1RvcmNoXy1fNzQwXzh0aF9BdmVudWVfX18zMjVtX19fMTA2N2Z0X19fLi5fZGFkMjEyNDIuanBlZycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAndm9yb25vaV9zcGlyZScsXG4gICAgYWNjZW50Q29sb3I6ICcjRjU5RTBCJyxcbiAgICBzZWNvbmRhcnlDb2xvcjogJyMzOEJERjgnLFxuICAgIHRhcmdldFNjZW5lSWQ6ICd2b3Jvbm9pX2Jpb25pY19zcGlyZScsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ2FtYmVyX2dvbGQnLFxuICAgIGxpZ2h0VGVtcEs6IDMyMDAsXG4gICAgaGVpZ2h0TXVsdDogMS41LFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjEsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF92b3Jvbm9pX2xhdHRpY2UnLCAnZXh0X2xlZF9zbGFiX2NvcmUnLCAnZXh0X2JpbV9pZmM0MDAnXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnSG9sb2dyYW0gd2llxbxvd2NhIFRoZSBUb3JjaCAzMjVtIChOb3d5IEpvcmspIHplIHNrcsSZY29uxIUga29yb27EhSBoZWxpa2FsbsSFIGkgcG9kxZt3aWV0bG9ueW0gdHJ6b25lbSBvYnNlcndhY3lqbnltLCB6xYJvdGUgb8Wbd2lldGxlbmllIHphY2hvZHUgc8WCb8WEY2EgMzIwMEsgaSA2IGFnZW50w7N3IHNrYW51asSFY3ljaCBlbGV3YWNqxJknLFxuICAgIHNwZWNzOiAnV3lzb2tvxZvEhzogMzI1bSAoMTA2NyBmdCkgwrcgSGVsaWthbG5hIEtvcm9uYSDCtyBEaWFncmlkJyxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLXRhc2hrZW50LWNpdHknLFxuICAgIGZpbGVOYW1lOiAnVGFzaGtlbnRfQ2l0eV9fVXpiZWtpc3Rhbl81ZmE4OTdjYi5qcGVnJyxcbiAgICB0aXRsZTogJ1Rhc2hrZW50IENpdHkgRmluYW5jaWFsIENvbXBsZXgg4oCUIFplc3DDs8WCIFd5c29rb8WbY2lvd2PDs3cnLFxuICAgIGNvbGxlY3Rpb246ICdBUl9CT0FSRFJPT00nLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ1N0b8WCeSBIb2xvZ3JhZmljem5lIEFSJyxcbiAgICBsb2NhbFVybDogJy9hc3NldHMvYWlzdHVkaW8vVGFzaGtlbnRfQ2l0eV9fVXpiZWtpc3Rhbl81ZmE4OTdjYi5qcGVnJyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICdib2FyZHJvb21faG9sbycsXG4gICAgYWNjZW50Q29sb3I6ICcjMDZCNkQ0JyxcbiAgICBzZWNvbmRhcnlDb2xvcjogJyNFMkU4RjAnLFxuICAgIHRhcmdldFNjZW5lSWQ6ICdza3lsaW5lX2ZpbmFuY2lhbCcsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ3BsYXRpbnVtX2FyY2gnLFxuICAgIGxpZ2h0VGVtcEs6IDQ1MDAsXG4gICAgaGVpZ2h0TXVsdDogMS4zLFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjAsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF9wYnJfZ2xhc3NfaW9yJywgJ2V4dF9iaW1faWZjNDAwJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ0tvbXBsZWtzIHd5c29rb8WbY2lvd2PDs3cgVGFzaGtlbnQgQ2l0eSB3IGZvcm1pZSBwbGF0eW5vd2VqIG1ha2lldHkgQklNIG5hIHN0b2xlIGtvbmZlcmVuY3lqbnltLCBwZcWCbmEgb2tsdXpqYSBMaURBUiBpIHNpYXRrYSB1cmJhbmlzdHljem5hIDM2IGJ1ZHlua8OzdyBzxIVzaWVkbmljaCcsXG4gICAgc3BlY3M6ICdNYXN0ZXJwbGFuIFVyYmFuaXN0eWN6bnkgwrcgMTEgTW9kdcWCw7N3IMK3IEJJTSBMZXZlbCA0MDAnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtdW5rbm93bi0xNy1jb3VydHlhcmQnLFxuICAgIGZpbGVOYW1lOiAnVW5rbm93bl8xN183N2Q4OTIwZC5qcGVnJyxcbiAgICB0aXRsZTogJ0tvbXBsZWtzIFRyemVjaCBXaWXFvCB6IER6aWVkemnFhGNlbSBXc3TEmWdvd3ltIExFRCcsXG4gICAgY29sbGVjdGlvbjogJ0dMQVNTX01BUVVFVFRFJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdXaWXFvG93Y2UgaSBNYWtpZXR5IFN6a2xhbmUnLFxuICAgIGxvY2FsVXJsOiAnL2Fzc2V0cy9haXN0dWRpby9Vbmtub3duXzE3Xzc3ZDg5MjBkLmpwZWcnLFxuICAgIHByb2NlZHVyYWxUaGVtZTogJ3N0YWNrZWRfZ2xhc3MnLFxuICAgIGFjY2VudENvbG9yOiAnIzM4QkRGOCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjRjU5RTBCJyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnZWNvX2F0cml1bScsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ2N5YW5fYmx1ZXByaW50JyxcbiAgICBsaWdodFRlbXBLOiA1MDAwLFxuICAgIGhlaWdodE11bHQ6IDEuMTUsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMCxcbiAgICByZWNvbW1lbmRlZEV4dGVuc2lvbnM6IFsnZXh0X2xlZF9zbGFiX2NvcmUnLCAnZXh0X2JpbV9pZmM0MDAnXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnVHJ6eSBiaXVyb3djZSB6IHBvemlvbXltaSB3c3TEmWdhbWkgZWxld2FjeWpueW1pIExFRCBpIGdlb21ldHJ5Y3pueW0gZHppZWR6acWEY2VtIHJla3JlYWN5am55bSB3IHNrYWxpIDE6NTAgbmEgYmxhY2llIHN0b8WCdSBBUicsXG4gICAgc3BlY3M6ICdGYXNhZGEgV3N0xJlnb3dhIMK3IER6aWVkemluaWVjIENlbnRyYWxueSDCtyBBUkNvcmUgRGVwdGgnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtdW5rbm93bi0xMS1hY3J5bGljJyxcbiAgICBmaWxlTmFtZTogJ1Vua25vd25fMTFfNzc5NmFiYmEuanBlZycsXG4gICAgdGl0bGU6ICdQcnl6bWF0eWN6bmUgQmxva2kgQWtyeWxvd2UgeiBGbHVvcmVzY2VuY3lqbsSFIEtyYXfEmWR6acSFJyxcbiAgICBjb2xsZWN0aW9uOiAnR0xBU1NfTUFRVUVUVEUnLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ1dpZcW8b3djZSBpIE1ha2lldHkgU3prbGFuZScsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL1Vua25vd25fMTFfNzc5NmFiYmEuanBlZycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAncHJpc21fYmxvY2tzJyxcbiAgICBhY2NlbnRDb2xvcjogJyMzOEJERjgnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnI0VDNDg5OScsXG4gICAgdGFyZ2V0U2NlbmVJZDogJ2NyeXN0YWxfc3RhY2tlZF9wcmlzbScsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ3BsYXRpbnVtX2FyY2gnLFxuICAgIGxpZ2h0VGVtcEs6IDU4MDAsXG4gICAgaGVpZ2h0TXVsdDogMC45LFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjI1LFxuICAgIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogWydleHRfcGJyX2dsYXNzX2lvcicsICdleHRfdXNkel92aXNpb25vcyddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdNaW5pbWFsaXN0eWN6bmUgbWF0b3dlIGJyecWCeSB6ZSBzemvFgmEgYWtyeWxvd2VnbyB6IGRpY2hyb2ljem55bWksIG5lb25vd3ltaSBrcmF3xJlkemlhbWkgKGLFgsSZa2l0LCByw7PFvCBpIGJ1cnN6dHluKSB3IHByemVzdHJ6ZW5pIEFSIFZpc2lvbk9TJyxcbiAgICBzcGVjczogJ1N6a8WCbyBEaWNocm9pY3puZSDCtyBJT1IgMS40OSDCtyBLcmF3xJlkemllIEZsdW9yZXNjZW5jeWpuZScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi11bmtub3duLTE1LXNjaWZpLWNpdHknLFxuICAgIGZpbGVOYW1lOiAnVW5rbm93bl8xNV83MTFhNmJmNC5qcGVnJyxcbiAgICB0aXRsZTogJ01ldHJvcG9saWEgUHJ6eXN6xYJvxZtjaSB6IEJpb25pY3puYSBXaWXFvMSFIGkgRXN0YWthZGFtaScsXG4gICAgY29sbGVjdGlvbjogJ1ZPUk9OT0lfVE9XRVJTJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdHJ1a3R1cnkgQmlvbmljem5lIGkgSGVsaXN5JyxcbiAgICBsb2NhbFVybDogJy9hc3NldHMvYWlzdHVkaW8vVW5rbm93bl8xNV83MTFhNmJmNC5qcGVnJyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICd2b3Jvbm9pX3NwaXJlJyxcbiAgICBhY2NlbnRDb2xvcjogJyMwNkI2RDQnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnIzM4QkRGOCcsXG4gICAgdGFyZ2V0U2NlbmVJZDogJ3Zvcm9ub2lfYmlvbmljX3NwaXJlJyxcbiAgICB0YXJnZXRQYWxldHRlOiAnY3lhbl9ibHVlcHJpbnQnLFxuICAgIGxpZ2h0VGVtcEs6IDU0MDAsXG4gICAgaGVpZ2h0TXVsdDogMS40NSxcbiAgICBleHBsb2RlZEZhY3RvcjogMC4wLFxuICAgIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogWydleHRfdm9yb25vaV9sYXR0aWNlJywgJ2V4dF9nbHRmX2RyYWNvJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ0Z1dHVyeXN0eWN6bmEgbWV0cm9wb2xpYSB6IGJpb25pY3puxIUgd2llxbzEhSDFgnVwaW5vd8SFLCB3aWVsb3BvemlvbW93eW1pIGVzdGFrYWRhbWkgbWFnbmV0eWN6bnltaSBpIGF1dG9ub21pY3pueW1pIGRyb25hbWkgcGF0cm9sb3d5bWkgdyBwcnplc3RyemVuaSAzRCcsXG4gICAgc3BlY3M6ICdFZ3pvc3praWVsZXQgQmlvbmljem55IMK3IEVzdGFrYWR5IDNEIMK3IExvdCBEcm9uYScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi11bmtub3duLTE2LWZsb2F0aW5nLWdsYXNzJyxcbiAgICBmaWxlTmFtZTogJ1Vua25vd25fMTZfYzNhNjVlODQuanBlZycsXG4gICAgdGl0bGU6ICdaYXdpZXN6b25lIFRhZmxlIFN6a8WCYSBTcGF0aWFsIFVJIChWaXNpb25PUyBHbGFzcyBQYW5lbHMpJyxcbiAgICBjb2xsZWN0aW9uOiAnQVJfQk9BUkRST09NJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdG/FgnkgSG9sb2dyYWZpY3puZSBBUicsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL1Vua25vd25fMTZfYzNhNjVlODQuanBlZycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAncHJpc21fYmxvY2tzJyxcbiAgICBhY2NlbnRDb2xvcjogJyNFMkU4RjAnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnIzM4QkRGOCcsXG4gICAgdGFyZ2V0U2NlbmVJZDogJ2NyeXN0YWxfc3RhY2tlZF9wcmlzbScsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ3BsYXRpbnVtX2FyY2gnLFxuICAgIGxpZ2h0VGVtcEs6IDYwMDAsXG4gICAgaGVpZ2h0TXVsdDogMS4xLFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjY1LFxuICAgIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogWydleHRfcGJyX2dsYXNzX2lvcicsICdleHRfdXNkel92aXNpb25vcyddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdXaWVsb3dhcnN0d293ZSB6YXdpZXN6b25lIHcgcG93aWV0cnp1IHRhZmxlIG1hdG93ZWdvIHN6a8WCYSBvcHR5Y3puZWdvIHogbWlrcm8tdHlwb2dyYWZpxIUgaSBrb3N0a2FtaSByZWZyYWtjeWpueW1pLCBnxYLEmWJva2EgcGFyYWxha3NhIDZEb0YnLFxuICAgIHNwZWNzOiAnU3BhdGlhbCBHbGFzcyBVSSDCtyBSb3pzdHJ6ZWxlbmllIDY1JSDCtyBQYXJhbGFrc2EgNkRvRicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi11bmtub3duLTEyLWFlcm8nLFxuICAgIGZpbGVOYW1lOiAnVW5rbm93bl8xMl9iYmExZTZhYi5qcGVnJyxcbiAgICB0aXRsZTogJ1Bhd2lsb24gUGFyYW1ldHJ5Y3pueSBpIFN0cnVrdHVyYSBQb3fFgm9rb3dhJyxcbiAgICBjb2xsZWN0aW9uOiAnS0lORVRJQ19BRVJPJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdLaW5ldHljem5lIFNrcnp5ZMWCYSBpIEFlcm9keW5hbWlrYScsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL1Vua25vd25fMTJfYmJhMWU2YWIuanBlZycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAna2luZXRpY193aW5nJyxcbiAgICBhY2NlbnRDb2xvcjogJyMxMEI5ODEnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnIzA2QjZENCcsXG4gICAgdGFyZ2V0U2NlbmVJZDogJ2Flcm9faHViJyxcbiAgICB0YXJnZXRQYWxldHRlOiAnZW1lcmFsZF9tYXRyaXgnLFxuICAgIGxpZ2h0VGVtcEs6IDQ2MDAsXG4gICAgaGVpZ2h0TXVsdDogMS4xNSxcbiAgICBleHBsb2RlZEZhY3RvcjogMC4yLFxuICAgIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogWydleHRfa2luZXRpY19yaWJzJywgJ2V4dF9iaW1faWZjNDAwJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ1JvenBpxJl0b8WbY2lvd3kgdGVybWluYWwgaSBwYXdpbG9uIHBhcmFtZXRyeWN6bnkgeiBrcmF0b3duaWPEhSBwb3fFgm9rb3fEhSwgemllbG9ueSBza2FuIGxhc2Vyb3d5IExpREFSIGkgZWtzcG9ydCBzaWF0a2kgLlNUTCBkbyBkcnVrdSAzRCcsXG4gICAgc3BlY3M6ICdQb3fFgm9rYSBLcmF0b3duaWNvd2EgwrcgU2thbiBMaURBUiDCtyBFa3Nwb3J0IFNUTC9PQkonLFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtdW5rbm93bi0xOC10b3dlcicsXG4gICAgZmlsZU5hbWU6ICdVbmtub3duXzE4X2RkNDQ4ZjRhLmpwZWcnLFxuICAgIHRpdGxlOiAnRG9taW5hbnRhIFd5c29rb8WbY2lvd2EgeiBQb2TFm3dpZXRsZW5pZW0gS3Jhd8SZZHppb3d5bScsXG4gICAgY29sbGVjdGlvbjogJ0dMQVNTX01BUVVFVFRFJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdXaWXFvG93Y2UgaSBNYWtpZXR5IFN6a2xhbmUnLFxuICAgIGxvY2FsVXJsOiAnL2Fzc2V0cy9haXN0dWRpby9Vbmtub3duXzE4X2RkNDQ4ZjRhLmpwZWcnLFxuICAgIHByb2NlZHVyYWxUaGVtZTogJ3N0YWNrZWRfZ2xhc3MnLFxuICAgIGFjY2VudENvbG9yOiAnI0Y1OUUwQicsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjMDZCNkQ0JyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnc2t5bGluZV9maW5hbmNpYWwnLFxuICAgIHRhcmdldFBhbGV0dGU6ICdhbWJlcl9nb2xkJyxcbiAgICBsaWdodFRlbXBLOiAzMzAwLFxuICAgIGhlaWdodE11bHQ6IDEuNCxcbiAgICBleHBsb2RlZEZhY3RvcjogMC4xLFxuICAgIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogWydleHRfbGVkX3NsYWJfY29yZScsICdleHRfcGJyX2dsYXNzX2lvciddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdXeXNva2/Fm2Npb3dpZWMgemUgxZt3aWV0bG55bWkga3Jhd8SZZHppYW1pIGtvbmR5Z25hY2ppIGkgY2llcMWCeW0gcmR6ZW5pZW0gYnVyc3p0eW5vd3ltIDMzMDBLIG5hIGJsYWNpZSBrb25mZXJlbmN5am55bScsXG4gICAgc3BlY3M6ICdJbHVtaW5hY2phIEtyYXfEmWR6aSDCtyBSZHplxYQgMzMwMEsgwrcgU2thbGEgMS40eCcsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi11bmtub3duLTEwJyxcbiAgICBmaWxlTmFtZTogJ1Vua25vd25fMTBfOWY4OTUzYWEuanBlZycsXG4gICAgdGl0bGU6ICdNYWtpZXRhIEtvbmNlcGN5am5hIHogV2Fyc3R3b3d5bSBSZHplbmllbSDFmndpZXRsbnltJyxcbiAgICBjb2xsZWN0aW9uOiAnR0xBU1NfTUFRVUVUVEUnLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ1dpZcW8b3djZSBpIE1ha2lldHkgU3prbGFuZScsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL1Vua25vd25fMTBfOWY4OTUzYWEuanBlZycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAnc3RhY2tlZF9nbGFzcycsXG4gICAgYWNjZW50Q29sb3I6ICcjMzhCREY4JyxcbiAgICBzZWNvbmRhcnlDb2xvcjogJyNGNTlFMEInLFxuICAgIHRhcmdldFNjZW5lSWQ6ICdjcnlzdGFsX3N0YWNrZWRfcHJpc20nLFxuICAgIHRhcmdldFBhbGV0dGU6ICdjeWFuX2JsdWVwcmludCcsXG4gICAgbGlnaHRUZW1wSzogNDEwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjIsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMyxcbiAgICByZWNvbW1lbmRlZEV4dGVuc2lvbnM6IFsnZXh0X3Bicl9nbGFzc19pb3InLCAnZXh0X2xlZF9zbGFiX2NvcmUnXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnV2Fyc3R3b3dhIG1ha2lldGEgYXJjaGl0ZWt0b25pY3puYSB6ZSBzemxpZm93YW5lZ28gc3prxYJhIHogcm96c3RyemVsb255bWkga29uZHlnbmFjamFtaSAzMCUgaSBrb2x1bW5hbWkgTEVEJyxcbiAgICBzcGVjczogJ1N6a8WCbyBXYXJzdHdvd2UgwrcgRXhwbG9kZWQgVmlldyAzMCUgwrcgQ0FEIE9CSicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi11bmtub3duLTEzJyxcbiAgICBmaWxlTmFtZTogJ1Vua25vd25fMTNfZTRmMDFiOWQuanBlZycsXG4gICAgdGl0bGU6ICdTdHJ1a3R1cmEgUHJ6ZXN0cnplbm5hIGkgQW5hbGl6YSBLb21wb3p5Y2ppIEfFgsSZYmknLFxuICAgIGNvbGxlY3Rpb246ICdWT1JPTk9JX1RPV0VSUycsXG4gICAgY29sbGVjdGlvbkxhYmVsOiAnU3RydWt0dXJ5IEJpb25pY3puZSBpIEhlbGlzeScsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL1Vua25vd25fMTNfZTRmMDFiOWQuanBlZycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAndm9yb25vaV9zcGlyZScsXG4gICAgYWNjZW50Q29sb3I6ICcjMTBCOTgxJyxcbiAgICBzZWNvbmRhcnlDb2xvcjogJyMzOEJERjgnLFxuICAgIHRhcmdldFNjZW5lSWQ6ICd2b3Jvbm9pX2Jpb25pY19zcGlyZScsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ2VtZXJhbGRfbWF0cml4JyxcbiAgICBsaWdodFRlbXBLOiA0OTAwLFxuICAgIGhlaWdodE11bHQ6IDEuMjUsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMTUsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF92b3Jvbm9pX2xhdHRpY2UnLCAnZXh0X2dsdGZfZHJhY28nXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnQW5hbGl6YSBrb21wb3p5Y2ppIHByemVzdHJ6ZW5uZWogaSBnxYLEmWJpIG9icmF6dSBkbGEgcGFyYW1ldHJ5Y3puZWogd2llxbx5IHogcG9kemlhxYJlbSB6xYJvdGVnbyBwb2R6aWHFgnUgKEdvbGRlbiBSYXRpbyknLFxuICAgIHNwZWNzOiAnWsWCb3R5IFBvZHppYcWCIMK3IEfFgsSZYmlhIE9zdHJvxZtjaSDCtyBTaWF0a2EgVm9yb25vaScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1pbWctMTgxMycsXG4gICAgZmlsZU5hbWU6ICdJTUdfMTgxM18xZmRhMGFhNi5qcGcnLFxuICAgIHRpdGxlOiAnU3R1ZGl1bSBCcnnFgm93ZSBpIE/Fm3dpZXRsZW5pZSDFmnJvZG93aXNrb3dlIEhEUiAoSU1HXzE4MTMpJyxcbiAgICBjb2xsZWN0aW9uOiAnQVJfQk9BUkRST09NJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdG/FgnkgSG9sb2dyYWZpY3puZSBBUicsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL0lNR18xODEzXzFmZGEwYWE2LmpwZycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAnYm9hcmRyb29tX2hvbG8nLFxuICAgIGFjY2VudENvbG9yOiAnIzA2QjZENCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjRjU5RTBCJyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnc2t5bGluZV9maW5hbmNpYWwnLFxuICAgIHRhcmdldFBhbGV0dGU6ICdjeWFuX2JsdWVwcmludCcsXG4gICAgbGlnaHRUZW1wSzogMzgwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjE1LFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjAsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF9wYnJfZ2xhc3NfaW9yJywgJ2V4dF9iaW1faWZjNDAwJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ1N0dWRpdW0gYnJ5xYJvd2UgemVzcG/FgnUgYnVkeW5rw7N3IHogZHluYW1pY3puxIUgZXN0eW1hY2rEhSDFm3dpYXTFgmEgb3RvY3plbmlhIEhEUiAzODAwSyBpIGNpZW5pYW1pIGtvbnRha3Rvd3ltaSBuYSBibGFjaWUnLFxuICAgIHNwZWNzOiAnSERSIExpZ2h0IEVzdGltYXRpb24gwrcgQ2llbmllIEtvbnRha3Rvd2UgwrcgQVJLaXQgNicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1pbWctMTgxNCcsXG4gICAgZmlsZU5hbWU6ICdJTUdfMTgxNF85NjRlZjA3Zi5qcGcnLFxuICAgIHRpdGxlOiAnRGV0YWwgQXJjaGl0ZWt0b25pY3pueSBpIE9rbHV6amEgQ3p1am5pa2EgR8WCxJliaSAoSU1HXzE4MTQpJyxcbiAgICBjb2xsZWN0aW9uOiAnQVJfQk9BUkRST09NJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdG/FgnkgSG9sb2dyYWZpY3puZSBBUicsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL0lNR18xODE0Xzk2NGVmMDdmLmpwZycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAnYm9hcmRyb29tX2hvbG8nLFxuICAgIGFjY2VudENvbG9yOiAnI0Y1OUUwQicsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjMzhCREY4JyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnZWNvX2F0cml1bScsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ2FtYmVyX2dvbGQnLFxuICAgIGxpZ2h0VGVtcEs6IDM1MDAsXG4gICAgaGVpZ2h0TXVsdDogMS4yLFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjIsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF9sZWRfc2xhYl9jb3JlJywgJ2V4dF91c2R6X3Zpc2lvbm9zJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ1ByZXplbnRhY2phIGRldGFsdSBhcmNoaXRla3Rvbmljem5lZ28ga2FtcHVzdSBFY28tQXRyaXVtIHogd8WCxIVjem9uxIUgb2tsdXpqxIUgZ8WCxJliaSBUb0YvTGlEQVIgaSByb3pzdHJ6ZWxlbmllbSB3YXJzdHcgMjAlJyxcbiAgICBzcGVjczogJ1RvRiBEZXB0aCBPY2NsdXNpb24gwrcgMTIwIEZQUyDCtyBFY28tQXRyaXVtJyxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLWltZy0xODIwJyxcbiAgICBmaWxlTmFtZTogJ0lNR18xODIwX2M4NGE1OGEwLlBORycsXG4gICAgdGl0bGU6ICdJbnRlcmZlanMgUHJ6ZXN0cnplbm55IGkgVGVsZW1ldHJpYSBMaURBUiAoSU1HXzE4MjApJyxcbiAgICBjb2xsZWN0aW9uOiAnQVJfQk9BUkRST09NJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdG/FgnkgSG9sb2dyYWZpY3puZSBBUicsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL0lNR18xODIwX2M4NGE1OGEwLlBORycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAnYm9hcmRyb29tX2hvbG8nLFxuICAgIGFjY2VudENvbG9yOiAnIzEwQjk4MScsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjMDZCNkQ0JyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnYWVyb19odWInLFxuICAgIHRhcmdldFBhbGV0dGU6ICdlbWVyYWxkX21hdHJpeCcsXG4gICAgbGlnaHRUZW1wSzogNTIwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjEsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMCxcbiAgICByZWNvbW1lbmRlZEV4dGVuc2lvbnM6IFsnZXh0X2dsdGZfZHJhY28nLCAnZXh0X3VzZHpfdmlzaW9ub3MnXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnV2lkb2sgdGVsZW1ldHJpaSBza2FuZXJhIExpREFSIGkgc2lhdGtpIHDFgmFzemN6eXpuIHN0b8WCdS9wb2TFgm9naSBkbGEgd8SZesWCYSBBZXJvSHViIHogNiBhZ2VudGFtaSBwYXRyb2xvd3ltaScsXG4gICAgc3BlY3M6ICdUZWxlbWV0cmlhIExpREFSIMK3IFNpYXRrYSBQxYJhc3pjenl6biDCtyA2IEFnZW50w7N3JyxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLWltZy0xODIxJyxcbiAgICBmaWxlTmFtZTogJ0lNR18xODIxXzQxOWEwZmY2LlBORycsXG4gICAgdGl0bGU6ICdLb25maWd1cmFjamEgV2llbG93YXJzdHdvd2EgaSBFa3Nwb3J0IENBRCAoSU1HXzE4MjEpJyxcbiAgICBjb2xsZWN0aW9uOiAnQVJfQk9BUkRST09NJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdG/FgnkgSG9sb2dyYWZpY3puZSBBUicsXG4gICAgbG9jYWxVcmw6ICcvYXNzZXRzL2Fpc3R1ZGlvL0lNR18xODIxXzQxOWEwZmY2LlBORycsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAnYm9hcmRyb29tX2hvbG8nLFxuICAgIGFjY2VudENvbG9yOiAnI0UyRThGMCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjMzhCREY4JyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnY3J5c3RhbF9zdGFja2VkX3ByaXNtJyxcbiAgICB0YXJnZXRQYWxldHRlOiAncGxhdGludW1fYXJjaCcsXG4gICAgbGlnaHRUZW1wSzogNDcwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjI1LFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjM1LFxuICAgIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogWydleHRfYmltX2lmYzQwMCcsICdleHRfZ2x0Zl9kcmFjbyddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdLb25maWd1cmFjamEgd2llbG93YXJzdHdvd2EgQklNIHogcHJvd2FkbmljYW1pIG1vbnRhxbxvd3ltaSBpIGVrc3BvcnRlbSBkbyAuT0JKLCAuU1RMLCAuR0xURiBvcmF6IC5JRkMnLFxuICAgIHNwZWNzOiAnUHJvd2FkbmljZSBNb250YcW8b3dlIMK3IEVrc3BvcnQgTXVsdGktQ0FEJyxcbiAgfSxcblxuICAvLyAyLiBJbmxpbmUgVmlzaW9uIEF0dGFjaG1lbnRzIGZyb20gVXNlcidzIDUyLUltYWdlIEJhdGNoXG4gIHtcbiAgICBpZDogJ3JlZi1zcGlyaXQtc3BpcmUnLFxuICAgIGZpbGVOYW1lOiAnc3Bpcml0LnBuZycsXG4gICAgdGl0bGU6ICdTcGlyaXQgVG93ZXIg4oCUIEN5bGluZHJ5Y3pueSBXaWXFvG93aWVjIHogxbthZ2xlbSBTemtsYW55bScsXG4gICAgY29sbGVjdGlvbjogJ0dMQVNTX01BUVVFVFRFJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdXaWXFvG93Y2UgaSBNYWtpZXR5IFN6a2xhbmUnLFxuICAgIHByb2NlZHVyYWxUaGVtZTogJ3Zvcm9ub2lfc3BpcmUnLFxuICAgIGFjY2VudENvbG9yOiAnIzM4QkRGOCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjRTJFOEYwJyxcbiAgICB0YXJnZXRTY2VuZUlkOiAndm9yb25vaV9iaW9uaWNfc3BpcmUnLFxuICAgIHRhcmdldFBhbGV0dGU6ICdjeWFuX2JsdWVwcmludCcsXG4gICAgbGlnaHRUZW1wSzogNTYwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjU1LFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjAsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF9wYnJfZ2xhc3NfaW9yJywgJ2V4dF9iaW1faWZjNDAwJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ1d5c211a8WCeSBjeWxpbmRyeWN6bnkgd2llxbxvd2llYyBTcGlyaXQgVG93ZXIgeiBwb2R3w7NqbsSFIHN6a2xhbsSFIG9zxYJvbsSFIMW8YWdsb3fEhSB6d8SZxbxhasSFY8SFIHNpxJkga3Ugc3pjenl0b3dpIGkgcG9ydGFsb3d5bSB3ZWrFm2NpZW0gdSBwb2RzdGF3eScsXG4gICAgc3BlY3M6ICdaYcWCxIVjem5pazogc3Bpcml0LnBuZyDCtyBGYXNhZGEgxbthZ2xvd2EgwrcgMzEwbScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi0xMDAtYm9hcmRyb29tJyxcbiAgICBmaWxlTmFtZTogJzEwMC5wbmcgLyAxMDAucG5nXzJLXzIwMjYxMDI2MTA1NjUwLmpwZycsXG4gICAgdGl0bGU6ICdIb2xvZ3JhbSBXaWXFvG93Y8OzdyBuYSBTdG9sZSBaYXJ6xIVkdSArIFrFgm90YSBNYXBhIMWad2lhdGEgMksnLFxuICAgIGNvbGxlY3Rpb246ICdBUl9CT0FSRFJPT00nLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ1N0b8WCeSBIb2xvZ3JhZmljem5lIEFSJyxcbiAgICBsb2NhbFVybDogJy9hc3NldHMvYWlzdHVkaW8vRGFzaGJvYXJkX2RleF9lZWZmY2JjNy5qcGcnLFxuICAgIHByb2NlZHVyYWxUaGVtZTogJ2JvYXJkcm9vbV9ob2xvJyxcbiAgICBhY2NlbnRDb2xvcjogJyMwNkI2RDQnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnI0Y1OUUwQicsXG4gICAgdGFyZ2V0U2NlbmVJZDogJ3NreWxpbmVfZmluYW5jaWFsJyxcbiAgICB0YXJnZXRQYWxldHRlOiAnY3lhbl9ibHVlcHJpbnQnLFxuICAgIGxpZ2h0VGVtcEs6IDMyMDAsXG4gICAgaGVpZ2h0TXVsdDogMS4zLFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjAsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF9wYnJfZ2xhc3NfaW9yJywgJ2V4dF9sZWRfc2xhYl9jb3JlJywgJ2V4dF9nbHRmX2RyYWNvJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ0ZvdG9yZWFsaXN0eWN6bmEgc2FsYSB6YXJ6xIVkdSBvIHphY2hvZHppZSBzxYJvxYRjYSAySyAoMTAwLnBuZyk6IG5hIGx1c3RyemFueW0gc3RvbGUgxZt3aWVjaSBixYLEmWtpdG55IGhvbG9ncmFtIGtvbXBsZWtzdSB3aWXFvG93Y8OzdyBvdG9jem9ueSB6xYJvdMSFIG1hcMSFIHNpZWNpIGdsb2JhbG5laiBpIHphd2llc3pvbnltaSBla3JhbmFtaSBIVUQnLFxuICAgIHNwZWNzOiAnWmHFgsSFY3puaWs6IDEwMC5wbmcgKDJLIE1hc3RlcikgwrcgU3TDs8WCIEFSICsgSFVEJyxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLWtpbmV0aWMtd2luZy0wJyxcbiAgICBmaWxlTmFtZTogJy0wLnBuZyAvIDY3MjQzYTMzNGVmNjU4ZGE2ZGRhOWI3YWRlYWJkOGUwLmpwZycsXG4gICAgdGl0bGU6ICdSemXFumJhIEtpbmV0eWN6bmEg4oCeVGl0YW5pdW0gV2luZ+KAnSDigJQgV2FjaGxhcnogMjggUGnDs3InLFxuICAgIGNvbGxlY3Rpb246ICdLSU5FVElDX0FFUk8nLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ0tpbmV0eWN6bmUgU2tyenlkxYJhIGkgQWVyb2R5bmFtaWthJyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICdraW5ldGljX3dpbmcnLFxuICAgIGFjY2VudENvbG9yOiAnI0UyRThGMCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjRjU5RTBCJyxcbiAgICB0YXJnZXRTY2VuZUlkOiAna2luZXRpY19jYWxhdHJhdmFfd2luZycsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ3BsYXRpbnVtX2FyY2gnLFxuICAgIGxpZ2h0VGVtcEs6IDQzMDAsXG4gICAgaGVpZ2h0TXVsdDogMS4zNSxcbiAgICBleHBsb2RlZEZhY3RvcjogMC4xMixcbiAgICByZWNvbW1lbmRlZEV4dGVuc2lvbnM6IFsnZXh0X2tpbmV0aWNfcmlicycsICdleHRfZ2x0Zl9kcmFjbyddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdSemXFumJhIGtpbmV0eWN6bmEgemUgc3pjem90a293YW5lZ28gdHl0YW51ICgtMC5wbmcpOiB3eWdpxJl0eSDFgnVrb3dvIGtyxJlnb3PFgnVwIHdzcG9ybmlrb3d5IHogcm96cG9zdGFydHltIHdhY2hsYXJ6ZW0gMjggb3N0cnljaCDFvGViZXIgYWVyb2R5bmFtaWN6bnljaCBuYSBva3LEhWfFgmVqIGJhemllJyxcbiAgICBzcGVjczogJ1phxYLEhWN6bmlrOiAtMC5wbmcgwrcgU3pjem90a293YW55IFR5dGFuIMK3IFNwaXJhbGEnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtaHlkcm8tc3BsYXNoLTAnLFxuICAgIGZpbGVOYW1lOiAnMC5qcGcgLyA5N2E2ZDk1YjNiNWNkNTMxMTJjZTVmMGVjNTQ0ODUzZS5qcGcnLFxuICAgIHRpdGxlOiAnSHlkcm8tUnplxbpiYSDigJ5Xb2RueSBBdGxldGFpIEt1bGEgUmVmcmFrY3lqbmHigJ0gKExpcXVpZCBTcGxhc2gpJyxcbiAgICBjb2xsZWN0aW9uOiAnSFlEUk9fQ1JZU1RBTCcsXG4gICAgY29sbGVjdGlvbkxhYmVsOiAnSHlkcm8tUnplxbpieSBpIFDFgnlubnkgS3J5c3p0YcWCJyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICdoeWRyb19zcGxhc2gnLFxuICAgIGFjY2VudENvbG9yOiAnIzM4QkRGOCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjRTJFOEYwJyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnaHlkcm9fYXF1YV9zY3VscHR1cmUnLFxuICAgIHRhcmdldFBhbGV0dGU6ICdjeWFuX2JsdWVwcmludCcsXG4gICAgbGlnaHRUZW1wSzogNjIwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjI1LFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjE4LFxuICAgIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogWydleHRfaHlkcm9fcmVmcmFjdGlvbicsICdleHRfcGJyX2dsYXNzX2lvcicsICdleHRfdXNkel92aXNpb25vcyddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdEeW5hbWljem5hIHJ6ZcW6YmEgd29kbmEgd3nFgmFuaWFqxIVjYSBzacSZIHplIHN6a2xhbmVnbyBjeWxpbmRyYSAoMC5qcGcpIHogemF3aWVzem9uxIUgdyBwb3dpZXRyenUga3VsxIUgd29kbsSFLCBixIViZWxrYW1pIHRsZW51IGkgcGXFgm7EhSByZWZyYWtjasSFIElPUiAxLjMzMycsXG4gICAgc3BlY3M6ICdaYcWCxIVjem5pazogMC5qcGcgwrcgUmVmcmFrY2phIFdvZHkgSU9SIDEuMzMzIMK3IEtyb3BsZSAzRCcsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1nbGFzcy1zZXJpZXMtMS0zNCcsXG4gICAgZmlsZU5hbWU6ICdnbGFzczEucG5nIMK3IGdsYXNzMi5wbmcgwrcgZ2xhc3MzLnBuZyDCtyBnbGFzczM0LnBuZycsXG4gICAgdGl0bGU6ICdTZXJpYSDigJ5HbGFzcyAx4oCTMzTigJ0g4oCUIFdhcnN0d293ZSBNYWtpZXR5IFN6a2xhbmUgeiBLb2x1bW5hbWkgTEVEJyxcbiAgICBjb2xsZWN0aW9uOiAnR0xBU1NfTUFRVUVUVEUnLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ1dpZcW8b3djZSBpIE1ha2lldHkgU3prbGFuZScsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAnc3RhY2tlZF9nbGFzcycsXG4gICAgYWNjZW50Q29sb3I6ICcjMzhCREY4JyxcbiAgICBzZWNvbmRhcnlDb2xvcjogJyNGNTlFMEInLFxuICAgIHRhcmdldFNjZW5lSWQ6ICdjcnlzdGFsX3N0YWNrZWRfcHJpc20nLFxuICAgIHRhcmdldFBhbGV0dGU6ICdhbWJlcl9nb2xkJyxcbiAgICBsaWdodFRlbXBLOiAzMTAwLFxuICAgIGhlaWdodE11bHQ6IDEuMyxcbiAgICBleHBsb2RlZEZhY3RvcjogMC4wOCxcbiAgICByZWNvbW1lbmRlZEV4dGVuc2lvbnM6IFsnZXh0X3Bicl9nbGFzc19pb3InLCAnZXh0X2xlZF9zbGFiX2NvcmUnLCAnZXh0X2JpbV9pZmM0MDAnXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnS29sZWtjamEgbWFraWV0IGFyY2hpdGVrdG9uaWN6bnljaCB6IGdydWJ5Y2gsIGZhem93YW55Y2ggcMWCeXQgc3prxYJhIG9wdHljem5lZ28gKGdsYXNzMeKAk2dsYXNzMzQpIHByemVrxYJhZGFueWNoIGNpZXDFgnltaSBidXJzenR5bm93eW1pIGtvbHVtbmFtaSBMRUQgMzAwMEsgbmEgY3phcm55bSBwb3N0dW1lbmNpZScsXG4gICAgc3BlY3M6ICdaYcWCxIVjem5pa2k6IGdsYXNzMS4uZ2xhc3MzNC5wbmcgwrcgVGFmbGUgQWtyeWxvd2UgKyBMRUQnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtc2xhbXAtYmFjaCcsXG4gICAgZmlsZU5hbWU6ICdGbG9vcl9UYWJsZSBMYW1wIEJBQ0ggYnkgU2xhbXAoMSkuanBnIC8gY2MucG5nJyxcbiAgICB0aXRsZTogJ0tvbHVtbmEgxZp3aWV0bG5hIOKAnkJBQ0ggYnkgU2xhbXDigJ0g4oCUIFBsaXNvd2FuYSBTdHJ1a3R1cmEgT3BhbGZsZXgnLFxuICAgIGNvbGxlY3Rpb246ICdHTEFTU19NQVFVRVRURScsXG4gICAgY29sbGVjdGlvbkxhYmVsOiAnV2llxbxvd2NlIGkgTWFraWV0eSBTemtsYW5lJyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICdzdGFja2VkX2dsYXNzJyxcbiAgICBhY2NlbnRDb2xvcjogJyNGNTlFMEInLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnI0UyRThGMCcsXG4gICAgdGFyZ2V0U2NlbmVJZDogJ2NyeXN0YWxfc3RhY2tlZF9wcmlzbScsXG4gICAgdGFyZ2V0UGFsZXR0ZTogJ2FtYmVyX2dvbGQnLFxuICAgIGxpZ2h0VGVtcEs6IDI5MDAsXG4gICAgaGVpZ2h0TXVsdDogMS40NSxcbiAgICBleHBsb2RlZEZhY3RvcjogMC4wLFxuICAgIHJlY29tbWVuZGVkRXh0ZW5zaW9uczogWydleHRfbGVkX3NsYWJfY29yZScsICdleHRfcGJyX2dsYXNzX2lvciddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdTbXVrxYJhLCBwbGlzb3dhbmEga29sdW1uYSDFm3dpZXRsbmEgaW5zcGlyb3dhbmEgbGFtcMSFIEJBQ0ggYnkgU2xhbXAgbyBjaWVwxYJlaiBidXJzenR5bm93ZWogcG/Fm3dpYWNpZSAyOTAwSyBpIHJ5dG1pY3pueWNoIHdlcnR5a2FsbnljaCDFvGVicmFjaCByb3pwcmFzemFqxIVjeWNoIMWbd2lhdMWCbycsXG4gICAgc3BlY3M6ICdaYcWCxIVjem5pazogQkFDSCBieSBTbGFtcCDCtyBDaWVwxYJ5IFJkemXFhCAyOTAwSycsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi12b3Jvbm9pLWNlbGx1bGFyLTFmZScsXG4gICAgZmlsZU5hbWU6ICcxZmVjYzc0MjVlZjE5ZjEyZmEzZDU0YjZkNWFjNTQ4NC5qcGcgLyAyZWZhNGU5MC5qcGcnLFxuICAgIHRpdGxlOiAnQmlvbmljem55IEVnem9zemtpZWxldCBLb23Ds3Jrb3d5IFZvcm9ub2kgKFBhcmFtZXRyaWMgVG93ZXIpJyxcbiAgICBjb2xsZWN0aW9uOiAnVk9ST05PSV9UT1dFUlMnLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ1N0cnVrdHVyeSBCaW9uaWN6bmUgaSBIZWxpc3knLFxuICAgIHByb2NlZHVyYWxUaGVtZTogJ3Zvcm9ub2lfc3BpcmUnLFxuICAgIGFjY2VudENvbG9yOiAnIzEwQjk4MScsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjMDZCNkQ0JyxcbiAgICB0YXJnZXRTY2VuZUlkOiAndm9yb25vaV9iaW9uaWNfc3BpcmUnLFxuICAgIHRhcmdldFBhbGV0dGU6ICdlbWVyYWxkX21hdHJpeCcsXG4gICAgbGlnaHRUZW1wSzogNDYwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjQsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMTUsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF92b3Jvbm9pX2xhdHRpY2UnLCAnZXh0X2JpbV9pZmM0MDAnXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnV2llxbxvd2llYyB6IG9yZ2FuaWN6bnltIGVnem9zemtpZWxldGVtIGtvbcOzcmtvd3ltIFZvcm9ub2kgKDFmZWNjNzQyIC8gMmVmYTRlOTApLCBhxbx1cm93YSBmYXNhZGEgc3RydWt0dXJhbG5hIGRydWtvd2FuYSB3IDNEICguU1RMKSBpIHNrYW5vd2FuYSBwcnpleiA2IGFnZW50w7N3JyxcbiAgICBzcGVjczogJ1phxYLEhWN6bmlraTogMWZlY2M3NDIgLyAyZWZhNGU5MCDCtyBTaWF0a2EgVm9yb25vaScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi10d2lzdGVkLWhlbGl4LTM0MycsXG4gICAgZmlsZU5hbWU6ICczNDMxMTgwNjUzNjUyNDgzMzAuanBnIMK3IDQxNjA5MDQ1MzA2MTU0MjIxNC5qcGcgwrcgNDMwMDIzNDYuanBnJyxcbiAgICB0aXRsZTogJ1NrcsSZY29uZSBXaWXFvGUgSGVsaWthbG5lIGkgRGlhZ3JpZCBBZXJvZHluYW1pY3pueScsXG4gICAgY29sbGVjdGlvbjogJ1ZPUk9OT0lfVE9XRVJTJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdTdHJ1a3R1cnkgQmlvbmljem5lIGkgSGVsaXN5JyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICd2b3Jvbm9pX3NwaXJlJyxcbiAgICBhY2NlbnRDb2xvcjogJyMwNkI2RDQnLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnI0Y1OUUwQicsXG4gICAgdGFyZ2V0U2NlbmVJZDogJ3Zvcm9ub2lfYmlvbmljX3NwaXJlJyxcbiAgICB0YXJnZXRQYWxldHRlOiAnY3lhbl9ibHVlcHJpbnQnLFxuICAgIGxpZ2h0VGVtcEs6IDQyMDAsXG4gICAgaGVpZ2h0TXVsdDogMS41LFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjEsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF92b3Jvbm9pX2xhdHRpY2UnLCAnZXh0X3Bicl9nbGFzc19pb3InXSxcbiAgICBwcm9tcHRQcmVzZXQ6XG4gICAgICAnWmVzcMOzxYIgc2tyxJljb255Y2ggd2llxbxvd2PDs3cgaGVsaWthbG55Y2ggbyBvYnJvY2llIGtvbmR5Z25hY2ppIDkwIHN0b3BuaSBvZCBiYXp5IGRvIGtvcm9ueSwgc3prbGFuYSBmYXNhZGEga3VydHlub3dhIGkgc3RhbG93eSBkaWFncmlkIG9id29kb3d5JyxcbiAgICBzcGVjczogJ1phxYLEhWN6bmlraTogMzQzMTE4Li40MzAwMjMgwrcgT2Jyw7N0IEhlbGlzeSA5MMKwJyxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLWFlcm8tc2hlbGxzLTVjYycsXG4gICAgZmlsZU5hbWU6ICc1Y2MzMjEyYTQ2OWY2ZGY0ZTJiMGQ5M2UzNDAwOWIxMDc5MDY2Yjk4IG0uanBnIMK3IDQxODIwMTUxLmpwZycsXG4gICAgdGl0bGU6ICdBZXJvZHluYW1pY3puZSDFgXVwaW55IFByemVteXPFgm93ZSBpIE1vc3R5IFBvd2lldHJ6bmUnLFxuICAgIGNvbGxlY3Rpb246ICdLSU5FVElDX0FFUk8nLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ0tpbmV0eWN6bmUgU2tyenlkxYJhIGkgQWVyb2R5bmFtaWthJyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICdraW5ldGljX3dpbmcnLFxuICAgIGFjY2VudENvbG9yOiAnIzM4QkRGOCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjRjU5RTBCJyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnYWVyb19odWInLFxuICAgIHRhcmdldFBhbGV0dGU6ICdjeWFuX2JsdWVwcmludCcsXG4gICAgbGlnaHRUZW1wSzogNDgwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjIsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMixcbiAgICByZWNvbW1lbmRlZEV4dGVuc2lvbnM6IFsnZXh0X2tpbmV0aWNfcmlicycsICdleHRfZ2x0Zl9kcmFjbyddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdXaWVsa29wcnplc3RyemVubmEgZm9ybWEgYWVyb2R5bmFtaWN6bmEgeiBwxYJ5bm55bWkgcHJ6ZWrFm2NpYW1pIGZhc2FkeSBpIHdzcG9ybmlrb3d5bWkgemFkYXN6ZW5pYW1pICg1Y2MzMjEyYSAvIDQxODIwMTUxKSwgd2lkb2N6bmEgdyBsb2NpZSBkcm9uYSBuYWQgZ8OzcmFtaScsXG4gICAgc3BlY3M6ICdaYcWCxIVjem5pa2k6IDVjYzMyMTJhIC8gNDE4MjAxNTEgwrcgRm9ybWEgxYF1cGlub3dhJyxcbiAgfSxcbiAge1xuICAgIGlkOiAncmVmLWh5ZHJvLXdhdmVzLTkyMycsXG4gICAgZmlsZU5hbWU6ICc5MjNmNGZkNTNkNjZhMzU1ZjMyMzU1MDQ5NWNhZTNlNy5qcGcgwrcgNjY0MjRiM2QuanBnIMK3IDU2YTYwNzJmLmpwZycsXG4gICAgdGl0bGU6ICdQxYJ5bm5lIFJ6ZcW6YnkgS3J5c3RhbGljem5lIGkgS2Fza2FkeSBXb2RuZSA2RG9GJyxcbiAgICBjb2xsZWN0aW9uOiAnSFlEUk9fQ1JZU1RBTCcsXG4gICAgY29sbGVjdGlvbkxhYmVsOiAnSHlkcm8tUnplxbpieSBpIFDFgnlubnkgS3J5c3p0YcWCJyxcbiAgICBwcm9jZWR1cmFsVGhlbWU6ICdoeWRyb19zcGxhc2gnLFxuICAgIGFjY2VudENvbG9yOiAnIzA2QjZENCcsXG4gICAgc2Vjb25kYXJ5Q29sb3I6ICcjMzhCREY4JyxcbiAgICB0YXJnZXRTY2VuZUlkOiAnaHlkcm9fYXF1YV9zY3VscHR1cmUnLFxuICAgIHRhcmdldFBhbGV0dGU6ICdjeWFuX2JsdWVwcmludCcsXG4gICAgbGlnaHRUZW1wSzogNTkwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjMsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMjUsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF9oeWRyb19yZWZyYWN0aW9uJywgJ2V4dF9wYnJfZ2xhc3NfaW9yJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ09yZ2FuaWN6bmEga2Fza2FkYSBwxYJ5bm5lZ28ga3J5c3p0YcWCdSBpIHphbXJvxbxvbnljaCBrcm9wZWwgd29keSAoOTIzZjRmZDUgLyA2NjQyNGIzZCAvIDU2YTYwNzJmKSB6IGfFgsSZYm9rxIUgcmVmcmFrY2rEhSDFm3dpYXTFgmEgaSBrYXVzdHlrxIUgbmEgYmxhY2llIHN0b8WCdSBBUicsXG4gICAgc3BlY3M6ICdaYcWCxIVjem5pa2k6IDkyM2Y0ZmQ1IC8gNjY0MjRiM2QgwrcgS2F1c3R5a2EgV29kbmEnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdyZWYtcGFyYW1ldHJpYy02NTgtc2VyaWVzJyxcbiAgICBmaWxlTmFtZTogJzY1ODQ0MDQwODA1MzMxMjA3OS5qcGcgwrcgNjU4NDQwNDA4MDUzMzEzMDQwLmpwZyDCtyA2NTg0NDA0MDgwNTMzMTM5NTguanBnJyxcbiAgICB0aXRsZTogJ1RyeXB0eWsgUGFyYW1ldHJ5Y3pueSDigJ42NTg0NDDigJ0g4oCUIEJpb25pY3puZSBSZHplbmllIGkgxbtlYnJhJyxcbiAgICBjb2xsZWN0aW9uOiAnS0lORVRJQ19BRVJPJyxcbiAgICBjb2xsZWN0aW9uTGFiZWw6ICdLaW5ldHljem5lIFNrcnp5ZMWCYSBpIEFlcm9keW5hbWlrYScsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAna2luZXRpY193aW5nJyxcbiAgICBhY2NlbnRDb2xvcjogJyNGNTlFMEInLFxuICAgIHNlY29uZGFyeUNvbG9yOiAnI0UyRThGMCcsXG4gICAgdGFyZ2V0U2NlbmVJZDogJ2tpbmV0aWNfY2FsYXRyYXZhX3dpbmcnLFxuICAgIHRhcmdldFBhbGV0dGU6ICdhbWJlcl9nb2xkJyxcbiAgICBsaWdodFRlbXBLOiAzNjAwLFxuICAgIGhlaWdodE11bHQ6IDEuMzUsXG4gICAgZXhwbG9kZWRGYWN0b3I6IDAuMTUsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF9raW5ldGljX3JpYnMnLCAnZXh0X3Zvcm9ub2lfbGF0dGljZSddLFxuICAgIHByb21wdFByZXNldDpcbiAgICAgICdUcnlwdHlrIGJpb25pY3pueWNoIHN0cnVrdHVyIMW8ZWJyb3d5Y2ggKHNlcmlhIDY1ODQ0MDQwODA1MzMxLi4uKSB6IHDFgnlubsSFIG1vZHVsYWNqxIUgcHJ6ZWtyb2p1IGkgbWV0YWxpY3puxIUgcG93xYJva8SFIHR5dGFub3dvLXrFgm90xIUnLFxuICAgIHNwZWNzOiAnWmHFgsSFY3puaWtpOiBTZXJpYSA2NTg0NDAgKDMgd2FyaWFudHkpIMK3IMW7ZWJyYSAzRCcsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3JlZi1zdHVkaW8tYmF0Y2gtMTItMjMtYXMtYmItZ2cnLFxuICAgIGZpbGVOYW1lOiAnMTIucG5nIMK3IDEzLnBuZyDCtyAxNC5wbmcgwrcgMjMucG5nIMK3IGFzLnBuZyDCtyBiYi5wbmcgwrcgZ2cucG5nJyxcbiAgICB0aXRsZTogJ0tvbGVrY2phIE1ha2lldHkgU3prbGFuZSAmIElsdW1pbmFjamUgR2FibG90b3dlICgxMi4uMjMsIGFzLCBiYiwgZ2cpJyxcbiAgICBjb2xsZWN0aW9uOiAnR0xBU1NfTUFRVUVUVEUnLFxuICAgIGNvbGxlY3Rpb25MYWJlbDogJ1dpZcW8b3djZSBpIE1ha2lldHkgU3prbGFuZScsXG4gICAgcHJvY2VkdXJhbFRoZW1lOiAnc3RhY2tlZF9nbGFzcycsXG4gICAgYWNjZW50Q29sb3I6ICcjMzhCREY4JyxcbiAgICBzZWNvbmRhcnlDb2xvcjogJyNGNTlFMEInLFxuICAgIHRhcmdldFNjZW5lSWQ6ICdjcnlzdGFsX3N0YWNrZWRfcHJpc20nLFxuICAgIHRhcmdldFBhbGV0dGU6ICdjeWFuX2JsdWVwcmludCcsXG4gICAgbGlnaHRUZW1wSzogMzkwMCxcbiAgICBoZWlnaHRNdWx0OiAxLjI1LFxuICAgIGV4cGxvZGVkRmFjdG9yOiAwLjIsXG4gICAgcmVjb21tZW5kZWRFeHRlbnNpb25zOiBbJ2V4dF9wYnJfZ2xhc3NfaW9yJywgJ2V4dF9sZWRfc2xhYl9jb3JlJywgJ2V4dF9nbHRmX2RyYWNvJ10sXG4gICAgcHJvbXB0UHJlc2V0OlxuICAgICAgJ1BlxYJueSB6ZXN0YXcgZ2FibG90b3d5Y2ggbWFraWV0IGFyY2hpdGVrdG9uaWN6bnljaCAoMTIucG5nLCAxMy5wbmcsIDE0LnBuZywgMjMucG5nLCBhcy5wbmcsIGJiLnBuZywgZ2cucG5nKSB6IHByZWN5enlqbmllIHd5Y2luYW55bWkgbGFzZXJvd28gcMWCeXRhbWkgYWtyeWxvd3ltaSBpIHBvZMWbd2lldGxlbmllbSByZHplbmlvd3ltJyxcbiAgICBzcGVjczogJ1phxYLEhWN6bmlraTogMTIuLjIzLnBuZywgYXMsIGJiLCBnZyDCtyBNYWtpZXR5IExhc2VyLUN1dCcsXG4gIH0sXG5dO1xuXG5mdW5jdGlvbiByZW5kZXJQcm9jZWR1cmFsUHJldmlld1NWRyhpdGVtOiBSZWZlcmVuY2VBc3NldEl0ZW0pIHtcbiAgY29uc3QgeyBwcm9jZWR1cmFsVGhlbWUsIGFjY2VudENvbG9yLCBzZWNvbmRhcnlDb2xvciB9ID0gaXRlbTtcblxuICBpZiAocHJvY2VkdXJhbFRoZW1lID09PSAna2luZXRpY193aW5nJykge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMzIwIDE4MFwiIGNsYXNzTmFtZT1cInctZnVsbCBoLTMyIGJnLXNsYXRlLTk1MCBibG9ja1wiPlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9e2BncmFkLSR7aXRlbS5pZH1gfSB4MT1cIjBcIiB5MT1cIjBcIiB4Mj1cIjFcIiB5Mj1cIjFcIj5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPXthY2NlbnRDb2xvcn0gc3RvcE9wYWNpdHk9XCIwLjg1XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9e3NlY29uZGFyeUNvbG9yfSBzdG9wT3BhY2l0eT1cIjAuMzVcIiAvPlxuICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgIDwvZGVmcz5cbiAgICAgICAgPGVsbGlwc2UgY3g9XCIxODVcIiBjeT1cIjE2MlwiIHJ4PVwiNThcIiByeT1cIjdcIiBmaWxsPXthY2NlbnRDb2xvcn0gZmlsbE9wYWNpdHk9XCIwLjI1XCIgLz5cbiAgICAgICAge0FycmF5LmZyb20oeyBsZW5ndGg6IDE4IH0pLm1hcCgoXywgaSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGFuZ2xlID0gLTY4ICsgaSAqIDQuMjtcbiAgICAgICAgICBjb25zdCBsZW4gPSA1MiArIE1hdGguc2luKChpIC8gMTcpICogTWF0aC5QSSkgKiA1ODtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGdcbiAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoMTg1LCAxNTIpIHJvdGF0ZSgke2FuZ2xlfSlgfVxuICAgICAgICAgICAgICBzdHJva2U9e2kgJSAzID09PSAwID8gc2Vjb25kYXJ5Q29sb3IgOiBhY2NlbnRDb2xvcn1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGxpbmVcbiAgICAgICAgICAgICAgICB4MT1cIjBcIlxuICAgICAgICAgICAgICAgIHkxPVwiMFwiXG4gICAgICAgICAgICAgICAgeDI9ey1sZW59XG4gICAgICAgICAgICAgICAgeTI9ey1pICogMy41fVxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMi40XCJcbiAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxuICAgICAgICAgICAgICAgIG9wYWNpdHk9ezAuNTUgKyAoaSAvIDE4KSAqIDAuNDV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICAgIDxwYXRoXG4gICAgICAgICAgZD1cIk0gMTg1IDE1NiBRIDE0NSAxMDUgMjE1IDI0XCJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgc3Ryb2tlPXtgdXJsKCNncmFkLSR7aXRlbS5pZH0pYH1cbiAgICAgICAgICBzdHJva2VXaWR0aD1cIjZcIlxuICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgIC8+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG5cbiAgaWYgKHByb2NlZHVyYWxUaGVtZSA9PT0gJ2h5ZHJvX3NwbGFzaCcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDMyMCAxODBcIiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0zMiBiZy1zbGF0ZS05NTAgYmxvY2tcIj5cbiAgICAgICAgPHJlY3RcbiAgICAgICAgICB4PVwiMTA1XCJcbiAgICAgICAgICB5PVwiMTA4XCJcbiAgICAgICAgICB3aWR0aD1cIjExMFwiXG4gICAgICAgICAgaGVpZ2h0PVwiNjJcIlxuICAgICAgICAgIHJ4PVwiNlwiXG4gICAgICAgICAgZmlsbD17YWNjZW50Q29sb3J9XG4gICAgICAgICAgZmlsbE9wYWNpdHk9XCIwLjE2XCJcbiAgICAgICAgICBzdHJva2U9e2FjY2VudENvbG9yfVxuICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCJcbiAgICAgICAgLz5cbiAgICAgICAgPGVsbGlwc2VcbiAgICAgICAgICBjeD1cIjE2MFwiXG4gICAgICAgICAgY3k9XCIxMDhcIlxuICAgICAgICAgIHJ4PVwiNTVcIlxuICAgICAgICAgIHJ5PVwiOVwiXG4gICAgICAgICAgZmlsbD17YWNjZW50Q29sb3J9XG4gICAgICAgICAgZmlsbE9wYWNpdHk9XCIwLjNcIlxuICAgICAgICAgIHN0cm9rZT17c2Vjb25kYXJ5Q29sb3J9XG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjJcIlxuICAgICAgICAvPlxuICAgICAgICA8cGF0aFxuICAgICAgICAgIGQ9XCJNIDE0NSAxMTAgQyAxMzAgNzUsIDExMCA1NSwgODggMzggTSAxNjAgMTEwIEMgMTYyIDcwLCAxNzUgNDgsIDE2NSAyNSBNIDE3MiAxMDggQyAxOTAgODAsIDIxNSA3MiwgMjM4IDY4XCJcbiAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgc3Ryb2tlPXthY2NlbnRDb2xvcn1cbiAgICAgICAgICBzdHJva2VXaWR0aD1cIjVcIlxuICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICAgIC8+XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICBjeD1cIjIyOFwiXG4gICAgICAgICAgY3k9XCI0NFwiXG4gICAgICAgICAgcj1cIjE2XCJcbiAgICAgICAgICBmaWxsPXthY2NlbnRDb2xvcn1cbiAgICAgICAgICBmaWxsT3BhY2l0eT1cIjAuMjhcIlxuICAgICAgICAgIHN0cm9rZT17c2Vjb25kYXJ5Q29sb3J9XG4gICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjhcIlxuICAgICAgICAvPlxuICAgICAgICA8Y2lyY2xlIGN4PVwiMTAyXCIgY3k9XCI2NFwiIHI9XCI2XCIgZmlsbD17c2Vjb25kYXJ5Q29sb3J9IGZpbGxPcGFjaXR5PVwiMC43XCIgLz5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjEzNVwiIGN5PVwiMzRcIiByPVwiNC41XCIgZmlsbD17YWNjZW50Q29sb3J9IGZpbGxPcGFjaXR5PVwiMC44XCIgLz5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjE5MlwiIGN5PVwiNTJcIiByPVwiNVwiIGZpbGw9e3NlY29uZGFyeUNvbG9yfSBmaWxsT3BhY2l0eT1cIjAuNzVcIiAvPlxuICAgICAgPC9zdmc+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChwcm9jZWR1cmFsVGhlbWUgPT09ICd2b3Jvbm9pX3NwaXJlJykge1xuICAgIHJldHVybiAoXG4gICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMzIwIDE4MFwiIGNsYXNzTmFtZT1cInctZnVsbCBoLTMyIGJnLXNsYXRlLTk1MCBibG9ja1wiPlxuICAgICAgICA8ZWxsaXBzZSBjeD1cIjE2MFwiIGN5PVwiMTY0XCIgcng9XCI3MFwiIHJ5PVwiOFwiIGZpbGw9e2FjY2VudENvbG9yfSBmaWxsT3BhY2l0eT1cIjAuMThcIiAvPlxuICAgICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogOCB9KS5tYXAoKF8sIGlkeCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHkgPSAxNDIgLSBpZHggKiAxNjtcbiAgICAgICAgICBjb25zdCB3ID0gNTYgLSBpZHggKiA0LjI7XG4gICAgICAgICAgY29uc3Qgc2hpZnQgPSBNYXRoLnNpbihpZHggKiAwLjcpICogODtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGcga2V5PXtpZHh9PlxuICAgICAgICAgICAgICA8cG9seWdvblxuICAgICAgICAgICAgICAgIHBvaW50cz17YCR7MTYwIC0gdyArIHNoaWZ0fSwke3l9ICR7MTYwICsgdyArIHNoaWZ0fSwke3l9ICR7MTYwICsgdyAqIDAuODUgLSBzaGlmdH0sJHt5IC0gMTR9ICR7MTYwIC0gdyAqIDAuODUgLSBzaGlmdH0sJHt5IC0gMTR9YH1cbiAgICAgICAgICAgICAgICBmaWxsPXtpZHggJSAyID09PSAwID8gYWNjZW50Q29sb3IgOiBzZWNvbmRhcnlDb2xvcn1cbiAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eT1cIjAuMlwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlPXtpZHggJSAyID09PSAwID8gYWNjZW50Q29sb3IgOiBzZWNvbmRhcnlDb2xvcn1cbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuM1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2c+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICAgIDxjaXJjbGVcbiAgICAgICAgICBjeD1cIjE2MFwiXG4gICAgICAgICAgY3k9XCIyNFwiXG4gICAgICAgICAgcj1cIjEwXCJcbiAgICAgICAgICBmaWxsPXtzZWNvbmRhcnlDb2xvcn1cbiAgICAgICAgICBmaWxsT3BhY2l0eT1cIjAuNFwiXG4gICAgICAgICAgc3Ryb2tlPXthY2NlbnRDb2xvcn1cbiAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXG4gICAgICAgIC8+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9XG5cbiAgLy8gRGVmYXVsdDogc3RhY2tlZF9nbGFzcyBvciBib2FyZHJvb21faG9sb1xuICByZXR1cm4gKFxuICAgIDxzdmcgdmlld0JveD1cIjAgMCAzMjAgMTgwXCIgY2xhc3NOYW1lPVwidy1mdWxsIGgtMzIgYmctc2xhdGUtOTUwIGJsb2NrXCI+XG4gICAgICA8cG9seWdvblxuICAgICAgICBwb2ludHM9XCI2MCwxNTggMjYwLDE1OCAyODUsMTcyIDM1LDE3MlwiXG4gICAgICAgIGZpbGw9XCIjMEYxNzJBXCJcbiAgICAgICAgc3Ryb2tlPXthY2NlbnRDb2xvcn1cbiAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjJcIlxuICAgICAgLz5cbiAgICAgIHsvKiBXYXJtIFZlcnRpY2FsIExFRCBDb3JlcyAqL31cbiAgICAgIDxyZWN0XG4gICAgICAgIHg9XCIxMzJcIlxuICAgICAgICB5PVwiMzRcIlxuICAgICAgICB3aWR0aD1cIjE0XCJcbiAgICAgICAgaGVpZ2h0PVwiMTIyXCJcbiAgICAgICAgZmlsbD17c2Vjb25kYXJ5Q29sb3J9XG4gICAgICAgIGZpbGxPcGFjaXR5PVwiMC43NVwiXG4gICAgICAvPlxuICAgICAgPHJlY3RcbiAgICAgICAgeD1cIjE3NFwiXG4gICAgICAgIHk9XCIyNlwiXG4gICAgICAgIHdpZHRoPVwiMTRcIlxuICAgICAgICBoZWlnaHQ9XCIxMzBcIlxuICAgICAgICBmaWxsPXtzZWNvbmRhcnlDb2xvcn1cbiAgICAgICAgZmlsbE9wYWNpdHk9XCIwLjc1XCJcbiAgICAgIC8+XG4gICAgICB7LyogQ2FudGlsZXZlcmVkIEhvcml6b250YWwgR2xhc3MgU2xhYnMgKi99XG4gICAgICB7QXJyYXkuZnJvbSh7IGxlbmd0aDogOSB9KS5tYXAoKF8sIHMpID0+IHtcbiAgICAgICAgY29uc3QgeSA9IDE0MiAtIHMgKiAxMztcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKChzICUgMykgLSAxKSAqIDk7XG4gICAgICAgIGNvbnN0IHdpZHRoID0gMTE2IC0gcyAqIDQ7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPHJlY3RcbiAgICAgICAgICAgIGtleT17c31cbiAgICAgICAgICAgIHg9ezE2MCAtIHdpZHRoIC8gMiArIG9mZnNldH1cbiAgICAgICAgICAgIHk9e3l9XG4gICAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgICBoZWlnaHQ9XCI3XCJcbiAgICAgICAgICAgIHJ4PVwiMS41XCJcbiAgICAgICAgICAgIGZpbGw9e2FjY2VudENvbG9yfVxuICAgICAgICAgICAgZmlsbE9wYWNpdHk9XCIwLjMyXCJcbiAgICAgICAgICAgIHN0cm9rZT17YWNjZW50Q29sb3J9XG4gICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuMVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuICAgIDwvc3ZnPlxuICApO1xufVxuXG5leHBvcnQgY29uc3QgU3R1ZGlvRXh0ZW5zaW9uc0h1YjogUmVhY3QuRkM8U3R1ZGlvRXh0ZW5zaW9uc0h1YlByb3BzPiA9ICh7XG4gIGNvbmZpZyxcbiAgb25VcGRhdGVDb25maWcsXG4gIG9uVXBkYXRlUGFsZXR0ZSxcbiAgb25BcHBseVByZXNldFByb21wdCxcbiAgb25Ob3RpZnksXG59KSA9PiB7XG4gIGNvbnN0IFtzZWxlY3RlZENvbGxlY3Rpb24sIHNldFNlbGVjdGVkQ29sbGVjdGlvbl0gPSB1c2VTdGF0ZTxcbiAgICBSZWZlcmVuY2VBc3NldEl0ZW1bJ2NvbGxlY3Rpb24nXVxuICA+KCdBTEwnKTtcbiAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcbiAgY29uc3QgW2luc3BlY3RlZEFzc2V0LCBzZXRJbnNwZWN0ZWRBc3NldF0gPSB1c2VTdGF0ZTxSZWZlcmVuY2VBc3NldEl0ZW0gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBhY3RpdmVFeHRlbnNpb25zID0gY29uZmlnLmFjdGl2ZUV4dGVuc2lvbnMgfHwgW1xuICAgICdleHRfcGJyX2dsYXNzX2lvcicsXG4gICAgJ2V4dF9sZWRfc2xhYl9jb3JlJyxcbiAgICAnZXh0X3Zvcm9ub2lfbGF0dGljZScsXG4gICAgJ2V4dF9nbHRmX2RyYWNvJyxcbiAgXTtcblxuICBjb25zdCB0b2dnbGVFeHRlbnNpb24gPSAoZXh0SWQ6IFN0dWRpb0V4dGVuc2lvbklkLCBleHROYW1lOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBleGlzdHMgPSBhY3RpdmVFeHRlbnNpb25zLmluY2x1ZGVzKGV4dElkKTtcbiAgICBjb25zdCBuZXh0ID0gZXhpc3RzXG4gICAgICA/IGFjdGl2ZUV4dGVuc2lvbnMuZmlsdGVyKChpZCkgPT4gaWQgIT09IGV4dElkKVxuICAgICAgOiBbLi4uYWN0aXZlRXh0ZW5zaW9ucywgZXh0SWRdO1xuXG4gICAgY29uc3QgcGFydGlhbDogUGFydGlhbDxBUkNvbmZpZ1N0YXRlPiA9IHsgYWN0aXZlRXh0ZW5zaW9uczogbmV4dCB9O1xuICAgIGlmIChleHRJZCA9PT0gJ2V4dF92b3Jvbm9pX2xhdHRpY2UnICYmICFleGlzdHMpIHtcbiAgICAgIHBhcnRpYWwud2lyZWZyYW1lT3ZlcmxheSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChleHRJZCA9PT0gJ2V4dF9sZWRfc2xhYl9jb3JlJyAmJiAhZXhpc3RzKSB7XG4gICAgICBwYXJ0aWFsLmxpZ2h0VGVtcGVyYXR1cmVLID0gMzEwMDtcbiAgICB9XG4gICAgb25VcGRhdGVDb25maWcocGFydGlhbCk7XG4gICAgb25Ob3RpZnkoXG4gICAgICBleGlzdHNcbiAgICAgICAgPyBgV3nFgsSFY3pvbm8gcm96c3plcnplbmllOiAke2V4dE5hbWV9YFxuICAgICAgICA6IGBBa3R5d293YW5vIHJvenN6ZXJ6ZW5pZTogJHtleHROYW1lfSB3IHBvdG9rdSByZW5kZXJvd2FuaWEgM0RgXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBcHBseUFzc2V0VG9TdHVkaW8gPSAoaXRlbTogUmVmZXJlbmNlQXNzZXRJdGVtKSA9PiB7XG4gICAgb25VcGRhdGVDb25maWcoe1xuICAgICAgc2NlbmVJZDogaXRlbS50YXJnZXRTY2VuZUlkLFxuICAgICAgY3VzdG9tU2NlbmVUaXRsZTogaXRlbS50aXRsZSxcbiAgICAgIGFjdGl2ZVJlZmVyZW5jZUltYWdlSWQ6IGl0ZW0uaWQsXG4gICAgICBsaWdodFRlbXBlcmF0dXJlSzogaXRlbS5saWdodFRlbXBLLFxuICAgICAgdG93ZXJIZWlnaHRNdWx0aXBsaWVyOiBpdGVtLmhlaWdodE11bHQsXG4gICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IGl0ZW0uZXhwbG9kZWRGYWN0b3IsXG4gICAgICBhY3RpdmVFeHRlbnNpb25zOiBBcnJheS5mcm9tKFxuICAgICAgICBuZXcgU2V0KFsuLi5hY3RpdmVFeHRlbnNpb25zLCAuLi5pdGVtLnJlY29tbWVuZGVkRXh0ZW5zaW9uc10pXG4gICAgICApLFxuICAgICAgc2hvd1NwYXRpYWxBZ2VudHM6IHRydWUsXG4gICAgfSk7XG4gICAgb25VcGRhdGVQYWxldHRlKGl0ZW0udGFyZ2V0UGFsZXR0ZSk7XG4gICAgb25BcHBseVByZXNldFByb21wdChpdGVtLnByb21wdFByZXNldCk7XG4gICAgb25Ob3RpZnkoXG4gICAgICBgWmHFgmFkb3dhbm8gd3pvcnplYyDigJ4ke2l0ZW0udGl0bGV94oCdICgke2l0ZW0uZmlsZU5hbWV9KSBuYSBzY2VuxJkgM0Qgd3JheiB6IHJvenN6ZXJ6ZW5pYW1pIHNoYWRlcsOzdyFgXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBmaWx0ZXJlZEFzc2V0cyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBVUExPQURFRF9SRUZFUkVOQ0VfR0FMTEVSWS5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IG1hdGNoZXNDYXQgPVxuICAgICAgICBzZWxlY3RlZENvbGxlY3Rpb24gPT09ICdBTEwnIHx8IGl0ZW0uY29sbGVjdGlvbiA9PT0gc2VsZWN0ZWRDb2xsZWN0aW9uO1xuICAgICAgY29uc3QgcSA9IHNlYXJjaFF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgbWF0Y2hlc1F1ZXJ5ID1cbiAgICAgICAgIXEgfHxcbiAgICAgICAgaXRlbS50aXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8XG4gICAgICAgIGl0ZW0uZmlsZU5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fFxuICAgICAgICBpdGVtLnNwZWNzLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgICAgaXRlbS5jb2xsZWN0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKTtcbiAgICAgIHJldHVybiBtYXRjaGVzQ2F0ICYmIG1hdGNoZXNRdWVyeTtcbiAgICB9KTtcbiAgfSwgW3NlbGVjdGVkQ29sbGVjdGlvbiwgc2VhcmNoUXVlcnldKTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGlkPVwiZXh0ZW5zaW9ucy1nYWxsZXJ5XCIgY2xhc3NOYW1lPVwic3BhY2UteS04IHB0LTYgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBsZzppdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgdGV4dC1jeWFuLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgIDxQYWNrYWdlUGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPjAxQi4gQklCTElPVEVLQSA1MiBaQcWBxIRDWk9OWUNIIE9CUkFaS8OTVyBXWk9SQ09XWUNIICYgUk9aU1pFUlpFTklBIDNEL0FSPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC13aGl0ZSBmb250LWRpc3BsYXlcIj5cbiAgICAgICAgICAgIEdhbGVyaWEgT2JyYXprw7N3IFJlZmVyZW5jeWpueWNoIG9yYXogUm96c3plcnplbmlhIFNpbG5pa2EgKFNoYWRlcnkgUEJSLCBWb3Jvbm9pLCBIeWRybyAmIENBRC9CSU0pXG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIG1heC13LTN4bCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgIFdzenlzdGtpZSBwcnplc8WCYW5lIG9icmF6a2kgcmVmZXJlbmN5am5lIChtYWtpZXR5IHplIHN6bGlmb3dhbmVnbyBzemvFgmF7JyAnfVxuICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMFwiPmdsYXNzMS4uMzQ8L2NvZGU+LCB3aWXFvGUgYmlvbmljem5leycgJ31cbiAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDBcIj5zcGlyaXQucG5nIC8gVGhlIFRvcmNoIDMyNW08L2NvZGU+LCByemXFumJhXG4gICAgICAgICAgICBraW5ldHljem5lZ28gc2tyenlkxYJhIDxjb2RlIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDBcIj4tMC5wbmc8L2NvZGU+IG9yYXpcbiAgICAgICAgICAgIGh5ZHJvLWtyeXN6dGHFgnkgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMFwiPjAuanBnPC9jb2RlPikgem9zdGHFgnkgem1hcG93YW5lIG5hXG4gICAgICAgICAgICBub3dlIHNjZW55IDNEIGkgcm96c3plcnplbmlhIHBvdG9rdSBVbml0eSBVUlAgLyBLaHJvbm9zIGdsVEYgMi4wLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIERpcmVjdCBFeHRlbnNpb24gRm9ybWF0IFF1aWNrIEV4cG9ydGVycyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hyaW5rLTBcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgcmVzID0gZXhwb3J0UHJvamVjdFRvR0xURihjb25maWcpO1xuICAgICAgICAgICAgICBvbk5vdGlmeShcbiAgICAgICAgICAgICAgICBgV3lla3Nwb3J0b3dhbm8gc2NlbsSZIDNEIGRvIGZvcm1hdHUgS2hyb25vcyAuR0xURiAyLjAgKCR7cmVzLm5vZGVDb3VudH0gd8SZesWCw7N3IFBCUiBUcmFuc21pc3Npb24pYFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMy41IHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIGJnLWN5YW4tNTAwLzE1IGhvdmVyOmJnLWN5YW4tNTAwLzI1IHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC80MCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiAuR0xURiAyLjAgKFBCUiBHbGFzcyk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGV4cG9ydFByb2plY3RUb0lGQyhjb25maWcpO1xuICAgICAgICAgICAgICBvbk5vdGlmeShcbiAgICAgICAgICAgICAgICAnV3lla3Nwb3J0b3dhbm8gc3RydWt0dXLEmSBrb25keWduYWNqaSBkbyBmb3JtYXR1IEJJTSAuSUZDIChJU08tMTAzMDMtMjEgSUZDNCknXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctYW1iZXItNTAwLzE1IGhvdmVyOmJnLWFtYmVyLTUwMC8yNSB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC80MCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Qm94ZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiAuSUZDIChCSU0gTGV2ZWwgNDAwKTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFBhcnQgMTogNCBOZXcgM0QgU2NlbmVzIFF1aWNrLVN3aXRjaCBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTMuNVwiPlxuICAgICAgICB7W1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjZW5lSWQ6ICdjcnlzdGFsX3N0YWNrZWRfcHJpc20nIGFzIEFyY2hpdGVjdHVyYWxTY2VuZUlkLFxuICAgICAgICAgICAgYmFkZ2U6ICdnbGFzczEuLjM0LnBuZyDCtyA1MCBSaXNlJyxcbiAgICAgICAgICAgIHRpdGxlOiAnMDQuIE1ha2lldGEg4oCeQ3J5c3RhbCBQcmlzbSBMRUTigJ0nLFxuICAgICAgICAgICAgZGVzYzogJ0thc2thZG93ZSB0YWZsZSB6ZSBzemxpZm93YW5lZ28gc3prxYJhIG9wdHljem5lZ28gSU9SIDEuNTIgeiBjaWVwxYJ5bSByZHplbmllbSBMRUQgMjkwMEsuJyxcbiAgICAgICAgICAgIHBhbGV0dGU6ICdhbWJlcl9nb2xkJyBhcyBIb2xvZ3JhbVBhbGV0dGVJZCxcbiAgICAgICAgICAgIGNvbG9yOiAnYm9yZGVyLWFtYmVyLTUwMC80MCBiZy1hbWJlci01MDAvMTAgdGV4dC1hbWJlci0zMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2NlbmVJZDogJ3Zvcm9ub2lfYmlvbmljX3NwaXJlJyBhcyBBcmNoaXRlY3R1cmFsU2NlbmVJZCxcbiAgICAgICAgICAgIGJhZGdlOiAnc3Bpcml0LnBuZyDCtyBUaGUgVG9yY2ggMzI1bScsXG4gICAgICAgICAgICB0aXRsZTogJzA1LiBXaWXFvGEg4oCeVm9yb25vaSBIZWxpeCBTcGlyZeKAnScsXG4gICAgICAgICAgICBkZXNjOiAnU2tyxJljb25hIGhlbGlzYSB3eXNva2/Fm2Npb3dhIDMyNW0geiBrb23Ds3Jrb3d5bSBlZ3pvc3praWVsZXRlbSBiaW9uaWN6bnltIFZvcm9ub2kuJyxcbiAgICAgICAgICAgIHBhbGV0dGU6ICdlbWVyYWxkX21hdHJpeCcgYXMgSG9sb2dyYW1QYWxldHRlSWQsXG4gICAgICAgICAgICBjb2xvcjogJ2JvcmRlci1lbWVyYWxkLTUwMC80MCBiZy1lbWVyYWxkLTUwMC8xMCB0ZXh0LWVtZXJhbGQtMzAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNjZW5lSWQ6ICdraW5ldGljX2NhbGF0cmF2YV93aW5nJyBhcyBBcmNoaXRlY3R1cmFsU2NlbmVJZCxcbiAgICAgICAgICAgIGJhZGdlOiAnLTAucG5nIMK3IDY3MjQzYTMzLmpwZycsXG4gICAgICAgICAgICB0aXRsZTogJzA2LiBSemXFumJhIOKAnkFlcm9keW5hbWljIFdpbmfigJ0nLFxuICAgICAgICAgICAgZGVzYzogJ1dhY2hsYXJ6b3dhIHN0cnVrdHVyYSBiaW9uaWN6bnljaCDFvGViZXIgdHl0YW5vd3ljaCB3IHNwaXJhbGkgbG9nYXJ5dG1pY3puZWouJyxcbiAgICAgICAgICAgIHBhbGV0dGU6ICdwbGF0aW51bV9hcmNoJyBhcyBIb2xvZ3JhbVBhbGV0dGVJZCxcbiAgICAgICAgICAgIGNvbG9yOiAnYm9yZGVyLXNsYXRlLTQwMC80MCBiZy1zbGF0ZS00MDAvMTAgdGV4dC1zbGF0ZS0yMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgc2NlbmVJZDogJ2h5ZHJvX2FxdWFfc2N1bHB0dXJlJyBhcyBBcmNoaXRlY3R1cmFsU2NlbmVJZCxcbiAgICAgICAgICAgIGJhZGdlOiAnMC5qcGcgwrcgOTdhNmQ5NWIgwrcgOTIzZjRmZDUnLFxuICAgICAgICAgICAgdGl0bGU6ICcwNy4gSHlkcm8tUnplxbpiYSDigJ5MaXF1aWQgU3BsYXNo4oCdJyxcbiAgICAgICAgICAgIGRlc2M6ICdEeW5hbWljem55IHdpciB3b2RueSB3IGN5bGluZHJ6ZSBzemtsYW55bSBpIHphd2llc3pvbmUgdyBwcsOzxbxuaSBrcm9wbGUgM0QuJyxcbiAgICAgICAgICAgIHBhbGV0dGU6ICdjeWFuX2JsdWVwcmludCcgYXMgSG9sb2dyYW1QYWxldHRlSWQsXG4gICAgICAgICAgICBjb2xvcjogJ2JvcmRlci1jeWFuLTUwMC80MCBiZy1jeWFuLTUwMC8xMCB0ZXh0LWN5YW4tMzAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLm1hcCgoY2FyZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzQ3VycmVudCA9IGNvbmZpZy5zY2VuZUlkID09PSBjYXJkLnNjZW5lSWQ7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtjYXJkLnNjZW5lSWR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJvdW5kZWQteGwgYm9yZGVyIHAtNCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgIGlzQ3VycmVudFxuICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTAwIGJvcmRlci1jeWFuLTQwMCBzaGFkb3ctbGcgc2hhZG93LWN5YW4tOTUwLzUwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzYwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHRleHQtWzEwcHhdIGZvbnQtbW9ubyByb3VuZGVkIGJvcmRlciAke2NhcmQuY29sb3J9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2NhcmQuYmFkZ2V9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7aXNDdXJyZW50ICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtY3lhbi00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiBBa3R5d25hIHcgM0RcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZVwiPntjYXJkLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBsZWFkaW5nLXJlbGF4ZWRcIj57Y2FyZC5kZXNjfTwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgc2NlbmVJZDogY2FyZC5zY2VuZUlkLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21TY2VuZVRpdGxlOiBjYXJkLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICBzaG93U3BhdGlhbEFnZW50czogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgb25VcGRhdGVQYWxldHRlKGNhcmQucGFsZXR0ZSk7XG4gICAgICAgICAgICAgICAgICBvbk5vdGlmeShgUHJ6ZcWCxIVjem9ubyBzeW11bGF0b3IgM0QgbmEgbm93xIUgc2NlbsSZOiAke2NhcmQudGl0bGV9YCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaW11bGF0b3InKTtcbiAgICAgICAgICAgICAgICAgIGlmIChlbCkgZWwuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BtdC0zIHctZnVsbCBweS0yIHB4LTMgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgICAgaXNDdXJyZW50XG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwIHRleHQtc2xhdGUtOTUwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMTAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFdhbmQyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj57aXNDdXJyZW50ID8gJ1dpZG9jem5hIG5hIFNjZW5pZSAzRCDihpEnIDogJ0FrdHl3dWogdGVuIE1vZGVsIDNEIOKGkSd9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBQYXJ0IDI6IEZpbHRlcmFibGUgVmlzdWFsIFJlZmVyZW5jZSBHYWxsZXJ5IChBbGwgVXBsb2FkZWQgSW1hZ2VzICYgQ29sbGVjdGlvbnMpICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvNzAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc3BhY2UteS01XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8SW1hZ2VJY29uIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIEthdGFsb2cgWmHFgsSFY3pvbnljaCBPYnJhemvDs3cgaSBXem9yY8OzdyBBcmNoaXRla3Rvbmljem55Y2ggKEtsaWtuaWosIGFieSB6YcWCYWRvd2HEhyBkbyAzRClcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgS2HFvGR5IG9icmF6ZWsgcG9zaWFkYSBwcnp5cGlzYW55IHByb2ZpbCBnZW9tZXRyaWkgM0QsIHRlbXBlcmF0dXLEmSBiYXJ3b3fEhSBLLCBwYWxldMSZXG4gICAgICAgICAgICAgIHNoYWRlcmEgb3JheiBnb3Rvd3kgcHJvbXB0IGtvbnN0cnVrY3lqbnkuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8RmlsdGVyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2xhdGUtNDAwIGFic29sdXRlIGxlZnQtMyB0b3AtMS8yIC10cmFuc2xhdGUteS0xLzJcIiAvPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU3p1a2FqIHBsaWt1IChucC4gc3Bpcml0LCBnbGFzczEsIDAuanBnKS4uLlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcGwtOCBwci0zIHB5LTEuNSB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItY3lhbi00MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDYXRlZ29yeSBGaWx0ZXIgVGFicyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgIHtbXG4gICAgICAgICAgICB7IGlkOiAnQUxMJywgbGFiZWw6ICdXc3p5c3RraWUgS29sZWtjamUgKDUyIHBsaWtpIHcgMjYgcHJvZmlsYWNoKScgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdHTEFTU19NQVFVRVRURScsIGxhYmVsOiAnTWFraWV0eSBTemtsYW5lIExFRCAoZ2xhc3MxLi4zNCwgNTAgUmlzZSknIH0sXG4gICAgICAgICAgICB7IGlkOiAnVk9ST05PSV9UT1dFUlMnLCBsYWJlbDogJ1dpZcW8ZSBCaW9uaWN6bmUgVm9yb25vaSAoc3Bpcml0LCBUaGUgVG9yY2gpJyB9LFxuICAgICAgICAgICAgeyBpZDogJ0tJTkVUSUNfQUVSTycsIGxhYmVsOiAnU2tyenlkxYJhIEtpbmV0eWN6bmUgKC0wLnBuZywgU2VyaWEgNjU4KScgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdIWURST19DUllTVEFMJywgbGFiZWw6ICdIeWRyby1SemXFumJ5IFdvZG5lICgwLmpwZywgOTIzZiknIH0sXG4gICAgICAgICAgICB7IGlkOiAnQVJfQk9BUkRST09NJywgbGFiZWw6ICdTdG/FgnkgS29uZmVyZW5jeWpuZSBBUiAoMTAwLnBuZywgSU1HXzE4MTMuLjIxKScgfSxcbiAgICAgICAgICBdLm1hcCgodGFiKSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17dGFiLmlkfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENvbGxlY3Rpb24odGFiLmlkIGFzIFJlZmVyZW5jZUFzc2V0SXRlbVsnY29sbGVjdGlvbiddKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1lZGl1bSBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENvbGxlY3Rpb24gPT09IHRhYi5pZFxuICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi01MDAgdGV4dC1zbGF0ZS05NTAgYm9yZGVyLWN5YW4tNDAwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvOTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7dGFiLmxhYmVsfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBHcmlkIG9mIENhcmRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgICB7ZmlsdGVyZWRBc3NldHMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gY29uZmlnLmFjdGl2ZVJlZmVyZW5jZUltYWdlSWQgPT09IGl0ZW0uaWQ7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGdyb3VwIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05MDAgYm9yZGVyLWN5YW4tNDAwIHJpbmctMSByaW5nLWN5YW4tNDAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvOTAgYm9yZGVyLXNsYXRlLTgwMC85MCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIHsvKiBJbWFnZSBvciBIaWdoLURQSSBQcm9jZWR1cmFsIEJsdWVwcmludCBQcmV2aWV3ICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTMyIHctZnVsbCBvdmVyZmxvdy1oaWRkZW4gYmctc2xhdGUtOTUwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICAgICAgICAgICAge2l0ZW0ubG9jYWxVcmwgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtpdGVtLmxvY2FsVXJsfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtpdGVtLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciBncm91cC1ob3ZlcjpzY2FsZS0xMDUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclByb2NlZHVyYWxQcmV2aWV3U1ZHKGl0ZW0pXG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgbGVmdC0yIHB4LTIgcHktMC41IHJvdW5kZWQgYmctc2xhdGUtOTUwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzgwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0uY29sbGVjdGlvbkxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEluc3BlY3RlZEFzc2V0KGl0ZW0pfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTIgcC0xLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAvODUgaG92ZXI6Ymctc2xhdGUtOTAwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzgwXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlBvZGdsxIVkIHN6Y3plZ8OzxYLDs3cgaSBwcm9tcHR1IHd6b3JjYVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIE1ldGFkYXRhICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTQwMCB0cnVuY2F0ZVwiIHRpdGxlPXtpdGVtLmZpbGVOYW1lfT5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5maWxlTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGxlYWRpbmctc251ZyBsaW5lLWNsYW1wLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+e2l0ZW0uc3BlY3N9PC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogQWN0aW9uIEZvb3RlciAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBwdC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVBcHBseUFzc2V0VG9TdHVkaW8oaXRlbSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0xLjUgcHgtMi41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTUwMCB0ZXh0LXNsYXRlLTk1MCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWN5YW4tNTAwLzE1IGhvdmVyOmJnLWN5YW4tNTAwIHRleHQtY3lhbi0zMDAgaG92ZXI6dGV4dC1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntpc1NlbGVjdGVkID8gJ0FrdHl3bnkgdyAzRCcgOiAnWmHFgmFkdWogZG8gM0QgaSBQcm9tcHR1J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTW9kYWwgLyBEcmF3ZXIgZm9yIEluc3BlY3RlZCBSZWZlcmVuY2UgQXNzZXQgKi99XG4gICAgICB7aW5zcGVjdGVkQXNzZXQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzUwIHJvdW5kZWQteGwgcC01IHNwYWNlLXktNCBzaGFkb3ctMnhsXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1jeWFuLTQwMFwiPlxuICAgICAgICAgICAgICAgIFN6Y3plZ8OzxYJ5IHphxYLEhWN6b25lZ28gd3pvcmNhOiB7aW5zcGVjdGVkQXNzZXQuZmlsZU5hbWV9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtd2hpdGVcIj57aW5zcGVjdGVkQXNzZXQudGl0bGV9PC9oND5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaGFuZGxlQXBwbHlBc3NldFRvU3R1ZGlvKGluc3BlY3RlZEFzc2V0KTtcbiAgICAgICAgICAgICAgICAgIHNldEluc3BlY3RlZEFzc2V0KG51bGwpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSBiZy1jeWFuLTUwMCBob3ZlcjpiZy1jeWFuLTQwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkIHRleHQteHMgcm91bmRlZC1sZ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBaYXN0b3N1aiBuYSBTY2VuaWUgM0RcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJbnNwZWN0ZWRBc3NldChudWxsKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgcm91bmRlZC1sZ1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBaYW1rbmlqXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTEyIGdhcC00IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi00IHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGJnLXNsYXRlLTk1MFwiPlxuICAgICAgICAgICAgICB7aW5zcGVjdGVkQXNzZXQubG9jYWxVcmwgPyAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgc3JjPXtpbnNwZWN0ZWRBc3NldC5sb2NhbFVybH1cbiAgICAgICAgICAgICAgICAgIGFsdD17aW5zcGVjdGVkQXNzZXQudGl0bGV9XG4gICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLTQ4IG9iamVjdC1jb3ZlclwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9jZWR1cmFsUHJldmlld1NWRyhpbnNwZWN0ZWRBc3NldClcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZDpjb2wtc3Bhbi04IHNwYWNlLXktMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtMyBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGJsb2NrXCI+RG9jZWxvd2EgU2NlbmEgM0Q6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtY3lhbi0zMDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICB7aW5zcGVjdGVkQXNzZXQudGFyZ2V0U2NlbmVJZH1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBibG9ja1wiPlRlbXBlcmF0dXJhIMWad2lhdMWCYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1hbWJlci0zMDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICB7aW5zcGVjdGVkQXNzZXQubGlnaHRUZW1wS30gS1xuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGJsb2NrXCI+U2thbGEgV3lzb2tvxZtjaSAvIFdhcnN0d3k6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtZW1lcmFsZC0zMDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICB7aW5zcGVjdGVkQXNzZXQuaGVpZ2h0TXVsdH14IC8geyhpbnNwZWN0ZWRBc3NldC5leHBsb2RlZEZhY3RvciAqIDEwMCkudG9GaXhlZCgwKX0lXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBmb250LW1lZGl1bSBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgUHJ6eXBpc2FueSBQcm9tcHQgQXJjaGl0ZWt0b25pY3pueSBBSTpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDAgZm9udC1tb25vIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAge2luc3BlY3RlZEFzc2V0LnByb21wdFByZXNldH1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFBhcnQgMzogU3lzdGVtIEV4dGVuc2lvbnMgJiBTaGFkZXIvQ0FEIFBsdWdpbnMgTWFuYWdlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzcwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01IHNwYWNlLXktNVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgTWVuZWTFvGVyIFJvenN6ZXJ6ZcWEIFN5c3RlbW93eWNoIFVuaXR5IDYgVVJQLCBTaGFkZXLDs3cgUEJSIGkgRWtzcG9ydGVyw7N3IENBRC9CSU1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgV8WCxIVjeiBsdWIgd3nFgsSFY3ogZGVkeWtvd2FuZSByb3pzemVyemVuaWEgc2lsbmlrYS4gQWt0eXduZSB3dHljemtpIG5hdHljaG1pYXN0XG4gICAgICAgICAgICAgIGFrdHVhbGl6dWrEhSByZW5kZXIgM0Qgb3JheiBkb8WCxIVjemFqxIUgcGFraWV0eSBDIyAvIFNoYWRlckdyYXBoIGRvIHNwZWN5ZmlrYWNqaS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwIHNocmluay0wXCI+XG4gICAgICAgICAgICBBa3R5d25lIHJvenN6ZXJ6ZW5pYToge2FjdGl2ZUV4dGVuc2lvbnMubGVuZ3RofSAvIHtTVFVESU9fRVhURU5TSU9OU19DQVRBTE9HLmxlbmd0aH1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNFwiPlxuICAgICAgICAgIHtTVFVESU9fRVhURU5TSU9OU19DQVRBTE9HLm1hcCgoZXh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSBhY3RpdmVFeHRlbnNpb25zLmluY2x1ZGVzKGV4dC5pZCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtleHQuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQteGwgYm9yZGVyIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBpc0VuYWJsZWRcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTUwLzk1IGJvcmRlci1jeWFuLTUwMC81MCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzUwIGJvcmRlci1zbGF0ZS04MDAvODAgb3BhY2l0eS04MCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtleHQuYmFkZ2V9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+e2V4dC52ZXJzaW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBsZWFkaW5nLXNudWdcIj5cbiAgICAgICAgICAgICAgICAgICAge2V4dC5uYW1lfVxuICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbGVhZGluZy1yZWxheGVkXCI+e2V4dC5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTMgbXQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8Q29kZTIgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWFtYmVyLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2V4dC51bml0eVBhY2thZ2V9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB0b2dnbGVFeHRlbnNpb24oZXh0LmlkLCBleHQubmFtZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0xLjUgcHgtMyByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNFbmFibGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTUwMC8yMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHRleHQtZW1lcmFsZC0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2lzRW5hYmxlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlJvenN6ZXJ6ZW5pZSBBa3R5d25lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlfFgsSFY3ogUm96c3plcnplbmllPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuIl19