export const HOLOGRAM_PALETTES = {
	cyan_blueprint: {
		name: "Cyan Blueprint (Standard AR)",
		primaryHex: "#06B6D4",
		secondaryHex: "#F59E0B",
		gridHex: "#0EA5E9",
		badgeBg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
		accentText: "text-cyan-400"
	},
	amber_gold: {
		name: "Złoty Bursztyn (Sunset Executive)",
		primaryHex: "#F59E0B",
		secondaryHex: "#38BDF8",
		gridHex: "#D97706",
		badgeBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
		accentText: "text-amber-400"
	},
	emerald_matrix: {
		name: "Szmaragdowy LiDAR (CAD Scan)",
		primaryHex: "#10B981",
		secondaryHex: "#06B6D4",
		gridHex: "#059669",
		badgeBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
		accentText: "text-emerald-400"
	},
	platinum_arch: {
		name: "Platynowy Monolit (White BIM)",
		primaryHex: "#E2E8F0",
		secondaryHex: "#38BDF8",
		gridHex: "#94A3B8",
		badgeBg: "bg-slate-200/15 text-slate-200 border-slate-400/30",
		accentText: "text-slate-200"
	}
};
export const ARCHITECTURAL_SCENES = [
	{
		id: "skyline_financial",
		name: "01. Kompleks Finansowy „Skyline Core”",
		subtitle: "Zespół wysokościowców z diagridem konstrukcyjnym i podium wielofunkcyjnym",
		architecturalStyle: "High-Tech / Supertall Parametric Glass",
		realWorldHeightM: 342,
		footprintSqm: 48500,
		partsCount: 11,
		verticesEstimate: 18420,
		layers: [
			"Płyta fundamentowa i siatka geodezyjna blatu",
			"Trzon żelbetowy i komunikacja pionowa",
			"Fasada kurtynowa z podziałem szprosowym (Diagrid)",
			"Mosty powietrzne (Skybridges) i iglica telekomunikacyjna"
		],
		description: "Wieloczęściowy hologram zespołu wieżowców inspirowany wizualizacją stołu konferencyjnego. Zawiera centralną dominantę wysokościową z uskokami (setbacks), cztery wieże satelitarne, przewiązki napowietrzne oraz podświetlaną mapę globalnej sieci na blacie."
	},
	{
		id: "eco_atrium",
		name: "02. Kampus Bioklimatyczny „Eco-Atrium”",
		subtitle: "Tarasowy kompleks badawczy z centralną kopułą geodezyjną i żaluzjami solarnymi",
		architecturalStyle: "Biophilic Sustainable Brutalism & Glass",
		realWorldHeightM: 128,
		footprintSqm: 64e3,
		partsCount: 9,
		verticesEstimate: 15680,
		layers: [
			"Podziemne atrium i obrys płaszczyzny podłogi",
			"Pierścienie konstrukcyjne i trzony klatek",
			"Kopuła bioklimatyczna i przeszklone tarasy kaskadowe",
			"Dynamiczne łamacze światła (Brise-soleil) i panele PV"
		],
		description: "Holograficzny model zrównoważonego kampusu technologicznego. Zaprojektowany do prezentacji na dużych blatach konferencyjnych oraz bezpośrednio w skali 1:20 na powierzchni podłogi z pełną okluzją środowiskową."
	},
	{
		id: "aero_hub",
		name: "03. Terminal Multimodalny „AeroHub”",
		subtitle: "Rozpiętościowa konstrukcja łupinowa z kratownicami dachowymi i wieżą kontroli",
		architecturalStyle: "Structural Expressionism / Parametric Shell",
		realWorldHeightM: 86,
		footprintSqm: 112e3,
		partsCount: 10,
		verticesEstimate: 21340,
		layers: [
			"Płyta peronowa i korytarze kolei dużych prędkości",
			"Filary podporowe V-kształtne i rdzenie komunikacyjne",
			"Hala główna odpraw z fasadą akustyczną",
			"Wielkoprzestrzenne przekrycie dachowe i wieża nawigacyjna"
		],
		description: "Model inżynieryjny węzła przesiadkowego z widoczną strukturą kratownic dachowych, peronami podziemnymi i aerodynamicznym zadaszeniem. Idealny do testowania efektu paralaksy 6DoF oraz eksportu siatki do formatów OBJ i STL."
	},
	{
		id: "crystal_stacked_prism",
		name: "04. Makieta Warstwowa „Crystal Prism LED”",
		subtitle: "Wspornikowa makieta ze szlifowanego szkła optycznego i ciepłych kolumn świetlnych LED",
		architecturalStyle: "Refractive Acrylic & Cantilevered Glass Slabs (IOR 1.52)",
		realWorldHeightM: 215,
		footprintSqm: 38400,
		partsCount: 12,
		verticesEstimate: 24600,
		layers: [
			"Czarny postument gablotowy z podświetleniem obwodowym",
			"Ciepłe trzony świetlne LED (2900K) i kolumny nośne",
			"Kaskadowe tafle ze szlifowanego szkła akrylowego z fazowaniem",
			"Wspornikowe tarasy widokowe i świetlik dachowy Prism"
		],
		description: "Bezpośrednie odwzorowanie załączonych fotografii fizycznych makiet architektonicznych ze szkła warstwowego (glass1.png, glass2.png, 50 Rise Tower). Łączy krystalicznie przezroczyste płyty stropowe z ciepłym bursztynowym rdzeniem LED."
	},
	{
		id: "voronoi_bionic_spire",
		name: "05. Wieża Bioniczna „Voronoi Helix Spire”",
		subtitle: "Parametryczny egzoszkielet komórkowy Voronoi ze skręconą helisą aerodynamiczną",
		architecturalStyle: "Parametric Bionic Voronoi & Twisted Diagrid",
		realWorldHeightM: 325,
		footprintSqm: 42e3,
		partsCount: 11,
		verticesEstimate: 31200,
		layers: [
			"Organiczna baza korzeniowa i pierścień kotwiący AR",
			"Skręcony trzon helikalny (The Torch / Spirala 325m)",
			"Komórkowy egzoszkielet Voronoi o zmiennej gęstości oczek",
			"Korona obserwacyjna z podwójną wstęgą Mobiusa i iglicą"
		],
		description: "Zainspirowana załączonymi wizualizacjami parametrycznych wieżowców (The Torch NY 325m, Tashkent City, struktury bioniczne Voronoi). Idealna do prezentacji złożonych siatek 3D oraz skanowania elewacji przez agentów AG-01..AG-06."
	},
	{
		id: "kinetic_calatrava_wing",
		name: "06. Rzeźba Kinetyczna „Aerodynamic Wing”",
		subtitle: "Wachlarzowa struktura bionicznych żeber tytanowych w spirali logarytmicznej",
		architecturalStyle: "Kinetic Sculptural Expressionism & Brushed Titanium",
		realWorldHeightM: 64,
		footprintSqm: 19500,
		partsCount: 12,
		verticesEstimate: 28900,
		layers: [
			"Ciężka baza z ciemnego szczotkowanego tytanu na blacie",
			"Wygięty łukowo kręgosłup konstrukcyjny (Cantilever Spine)",
			"Sekwencja 18 aerodynamicznych piór/żeber w układzie wachlarzowym",
			"Szczytowe pióra stabilizujące z refleksami krawędziowymi"
		],
		description: "Wierna rekonstrukcja 3D załączonych fotografii rzeźby kinetycznego skrzydła (-0.png, 67243a334ef658da6dda9b7adeabd8e0.jpg). Każde żebro obraca się ze stopniowym przesunięciem fazowym, tworząc hipnotyzującą bryłę w przestrzeni AR."
	},
	{
		id: "hydro_aqua_sculpture",
		name: "07. Hydro-Rzeźba „Liquid Crystal Splash”",
		subtitle: "Dynamiczna kompozycja płynnego szkła, zamrożonej fali i zawieszonych kropel w 6DoF",
		architecturalStyle: "Fluid Dynamics / Refractive Aqua Sculpture (IOR 1.333)",
		realWorldHeightM: 48,
		footprintSqm: 14200,
		partsCount: 12,
		verticesEstimate: 34800,
		layers: [
			"Cylindryczne naczynie krystaliczne z taflą wody i bąbelkami powietrza",
			"Dynamiczny trzon wodny wznoszący się z wiru (Hydro Vortex)",
			"Rozpostarte ramiona fali i korona rozbryzgu (Splash Crest)",
			"Zawieszone w próżni sferyczne krople refrakcyjne 3D"
		],
		description: "Trójwymiarowa interpretacja załączonych obrazów wodnych i szklanych rzeźb (0.jpg, 97a6d95b, 923f4fd5). Wykorzystuje zaawansowany shader refrakcji wodnej, zawieszone w przestrzeni sfery kropel oraz efekt paralaksy 6DoF."
	}
];
export const SUPPORTED_MOBILE_DEVICES = [
	{
		id: "s24-ultra",
		brand: "Samsung",
		model: "Galaxy S24 Ultra / S23 Ultra",
		formFactor: "Smartfon Android",
		osVersion: "Android 14 (One UI 6.1)",
		arCoreOrKitSupport: "ARCore 1.44 + Raw Depth API",
		depthSensor: "Laser AF + Dual Pixel Depth Map",
		planeDetectionAccuracy: "±1.2 mm (Blat i Podłoga)",
		occlusionSupport: "Sprzętowa (ToF / LiDAR)",
		targetFps: 120,
		fpsSamples: [
			119,
			120,
			120,
			118,
			120,
			119,
			117,
			120,
			120,
			119,
			120,
			120
		],
		fpsStabilityPercent: 99.1,
		fps1PercentLow: 116,
		verified: true
	},
	{
		id: "tab-s9-ultra",
		brand: "Samsung",
		model: "Galaxy Tab S9 Ultra / S9+ (14.6\" AMOLED)",
		formFactor: "Tablet Android",
		osVersion: "Android 14 (One UI 6.1)",
		arCoreOrKitSupport: "ARCore 1.44 + Environmental HDR",
		depthSensor: "Dual Camera Stereo Depth + IMU 6DoF",
		planeDetectionAccuracy: "±1.5 mm (Duże płaszczyzny stołów)",
		occlusionSupport: "Programowa (ARCore Depth API)",
		targetFps: 120,
		fpsSamples: [
			118,
			119,
			120,
			116,
			118,
			120,
			115,
			119,
			120,
			118,
			119,
			120
		],
		fpsStabilityPercent: 98.4,
		fps1PercentLow: 113,
		verified: true
	},
	{
		id: "pixel-9-pro",
		brand: "Google",
		model: "Pixel 9 Pro XL / Pixel 8 Pro",
		formFactor: "Smartfon Android",
		osVersion: "Android 15",
		arCoreOrKitSupport: "ARCore Native + Geospatial & Scene Semantics",
		depthSensor: "Multi-zone Laser Detect + Tensor G4 Depth",
		planeDetectionAccuracy: "±1.0 mm (Najwyższa precyzja ARCore)",
		occlusionSupport: "Sprzętowa (ToF / LiDAR)",
		targetFps: 120,
		fpsSamples: [
			120,
			120,
			119,
			120,
			120,
			118,
			120,
			119,
			120,
			120,
			119,
			120
		],
		fpsStabilityPercent: 99.5,
		fps1PercentLow: 118,
		verified: true
	},
	{
		id: "xiaomi-14-ultra",
		brand: "Xiaomi",
		model: "Xiaomi 14 Ultra / 14 Pro",
		formFactor: "Smartfon Android",
		osVersion: "Android 14 (HyperOS)",
		arCoreOrKitSupport: "ARCore 1.43 + Light Estimation HDR",
		depthSensor: "dToF (Direct Time-of-Flight) 3D Laser",
		planeDetectionAccuracy: "±1.3 mm (Szybkie wykrywanie szkła i drewna)",
		occlusionSupport: "Sprzętowa (ToF / LiDAR)",
		targetFps: 90,
		fpsSamples: [
			90,
			89,
			90,
			88,
			90,
			89,
			86,
			89,
			90,
			90,
			88,
			90
		],
		fpsStabilityPercent: 98.2,
		fps1PercentLow: 85,
		verified: true
	},
	{
		id: "oneplus-pad-2",
		brand: "OnePlus",
		model: "OnePlus Pad 2 (Snapdragon 8 Gen 3)",
		formFactor: "Tablet Android",
		osVersion: "Android 14 (OxygenOS 14)",
		arCoreOrKitSupport: "ARCore 1.44 + Plane Boundary Polygon",
		depthSensor: "AI Stereo Depth Engine",
		planeDetectionAccuracy: "±2.0 mm (Prezentacje makiet na stołach)",
		occlusionSupport: "Programowa (ARCore Depth API)",
		targetFps: 120,
		fpsSamples: [
			117,
			119,
			118,
			114,
			117,
			119,
			112,
			116,
			119,
			118,
			117,
			119
		],
		fpsStabilityPercent: 97.6,
		fps1PercentLow: 110,
		verified: true
	},
	{
		id: "lenovo-tab-p12-pro",
		brand: "Lenovo",
		model: "Tab P12 Pro / Legion Tab",
		formFactor: "Tablet Android",
		osVersion: "Android 13 / 14 (ZUI)",
		arCoreOrKitSupport: "ARCore + ToF Anti-Drift Anchors",
		depthSensor: "Czujnik głębi ToF (Time-of-Flight)",
		planeDetectionAccuracy: "±1.6 mm (Stabilne kotwiczenie podłogowe)",
		occlusionSupport: "Sprzętowa (ToF / LiDAR)",
		targetFps: 90,
		fpsSamples: [
			89,
			90,
			88,
			87,
			89,
			90,
			84,
			88,
			89,
			90,
			88,
			89
		],
		fpsStabilityPercent: 97.8,
		fps1PercentLow: 83,
		verified: true
	},
	{
		id: "sony-xperia-1-vi",
		brand: "Sony",
		model: "Xperia 1 VI / 1 V",
		formFactor: "Smartfon Android",
		osVersion: "Android 14",
		arCoreOrKitSupport: "ARCore + 3D iToF Sensor Integration",
		depthSensor: "dedykowany sensor 3D iToF",
		planeDetectionAccuracy: "±1.1 mm (Rozpoznawanie krawędzi mebli)",
		occlusionSupport: "Sprzętowa (ToF / LiDAR)",
		targetFps: 120,
		fpsSamples: [
			120,
			119,
			120,
			119,
			118,
			120,
			117,
			119,
			120,
			120,
			119,
			120
		],
		fpsStabilityPercent: 99,
		fps1PercentLow: 115,
		verified: true
	},
	{
		id: "ipad-pro-m4",
		brand: "Apple",
		model: "iPad Pro 13\" (M4) / iPhone 16 Pro Max",
		formFactor: "Urządzenie iOS (Referencyjne)",
		osVersion: "iPadOS 18 / iOS 18",
		arCoreOrKitSupport: "ARKit 6 + Scene Reconstruction Mesh",
		depthSensor: "Skaner LiDAR dToF (Direct Time-of-Flight)",
		planeDetectionAccuracy: "±0.8 mm (Siatka topologiczna w czasie rzeczywistym)",
		occlusionSupport: "Sprzętowa (ToF / LiDAR)",
		targetFps: 120,
		fpsSamples: [
			120,
			120,
			120,
			119,
			120,
			120,
			119,
			120,
			120,
			120,
			120,
			120
		],
		fpsStabilityPercent: 99.8,
		fps1PercentLow: 119,
		verified: true
	}
];
export function generateMasterPrompt(config) {
	const sceneMeta = ARCHITECTURAL_SCENES.find((s) => s.id === config.sceneId) || ARCHITECTURAL_SCENES[0];
	const frameworkLabel = config.framework === "unity_arfoundation" ? "Unity 6 (AR Foundation 6.0 + XR Interaction Toolkit z jednoczesnym wsparciem ARCore i ARKit)" : config.framework === "arcore_native" ? "Unity 6 + Google ARCore Extensions (Android Native Depth & Plane API)" : "Unity 6 + Apple ARKit XR Plugin (LiDAR Scene Mesh & Plane Detection)";
	const planeModeLabel = config.planeDetectionMode === "table_and_floor" ? "Rozpoznawanie płaszczyzn poziomych blatu stołu (Tabletop) oraz podłogi (Floor) za pomocą czujników głębi ToF/LiDAR i ARPlaneManager" : config.planeDetectionMode === "table_only" ? "Precyzyjne wykrywanie powierzchni poziomych podwyższonych (blaty stołów konferencyjnych i biurek)" : "Pełne skanowanie przestrzenne 3D (Blaty, Podłogi, Ściany oraz ramy okienne pomieszczenia)";
	const systemPromptPL = `### ROLA I CEL ZADANIA
Jesteś Starszym Architektem Systemów XR/AR oraz Głównym Inżynierem Unity 3D. Twoim zadaniem jest zaprojektowanie i wdrożenie kompletnej aplikacji rozszerzonej rzeczywistości (AR) prezentującej w czasie rzeczywistym hologramowe modele budynków z pełnymi detalami architektonicznymi ("${sceneMeta.name}"), osadzane precyzyjnie na powierzchniach blatów stołów oraz podłóg.

---

### 1. SILNIK, FRAMEWORKI AR I DETEKCJA POWIERZCHNI (CZUJNIKI GŁĘBI)
- **Silnik i SDK**: ${frameworkLabel}, potok renderowania **Universal Render Pipeline (URP)** zoptymalizowany pod urządzenia mobilne (${config.modelScale.toFixed(2)}x skala bazowa).
- **Wykrywanie powierzchni i czujniki głębi**:
  - Skonfiguruj \`ARPlaneManager\` (tryb: \`PlaneDetectionMode.Horizontal\`) oraz \`ARRaycastManager\` wspierany przez dane z czujnika głębi (\`AROcclusionManager\` / ARCore Depth API / LiDAR).
  - **Zakres rozpoznawania**: ${planeModeLabel}.
  - Rozróżniaj semantycznie poziom podłogi (\`PlaneClassification.Floor\`) od powierzchni blatu stołu (\`PlaneClassification.Table\`) na podstawie wysokości względnej względem kamery oraz obrysu poligonu \`ARPlane.boundary\`.
  - Wyświetlaj subtelną siatkę kalibracyjną (Holographic Grid Shader) podczas skanowania i automatycznie kotwicz (\`ARAnchorManager\`) model budynku po zatwierdzeniu pozycji.

### 2. HOLOGRAFICZNE MODELE BUDYNKÓW, OŚWIETLENIE ŚRODOWISKOWE I OKLUZJA
- **Detale architektoniczne w czasie rzeczywistym**:
  - Model docelowy: **${sceneMeta.name}** (${sceneMeta.architecturalStyle}, ${sceneMeta.partsCount} modułów konstrukcyjnych, ok. ${sceneMeta.verticesEstimate} wierzchołków).
  - Zastosuj autorski shader w **Unity Shader Graph** (Fresnel Rim Glow + Scanline + Vertex Wireframe Overlay + Additive Transparency) z obsługą przekrojów architektonicznych i rozstrzelenia warstw (Exploded View = ${(config.explodedViewFactor * 100).toFixed(0)}%).
- **Oświetlenie środowiskowe (Environmental Lighting)**:
  - Status: **${config.environmentalLighting ? "AKTYWNE (ARCameraManager Light Estimation)" : "Statyczne studyjne"}** (Temperatura barwowa otoczenia: **${config.lightTemperatureK}K**).
  - Odczytuj w czasie rzeczywistym \`args.lightEstimation.averageBrightness\`, \`averageColorTemperature\` oraz \`mainLightDirection\` + \`ambientSphericalHarmonics\`, dynamicznie modulując intensywność odbić na szklanych fasadach hologramu oraz miękkie cienie kontaktowe na blacie.
- **Okluzja głębi (Real-Time Depth Occlusion)**:
  - Status: **${config.occlusionEnabled ? "WŁĄCZONA (EnvironmentDepthMode.Best + HumanStencil)" : "Wyłączona"}**.
  - Obiekty fizyczne na stole (np. kubek, laptop, dłonie użytkownika) oraz krawędzie mebli znajdujące się bliżej kamery niż hologram muszą prawidłowo przysłaniać wirtualne budynki na podstawie mapy głębi z czujnika ToF/ARCore Depth API.

### 3. EFEKT PARALAKSY 6DoF I DYNAMICZNE CZĄSTECZKI ZA OKNAMI POMIESZCZENIA
- **Paralaksa głębi obrazu (Intensity: ${(config.parallaxIntensity * 100).toFixed(0)}%)**:
  - Wykorzystaj dane śledzenia 6DoF kamery (\`ARCamera\`) oraz żyroskopu urządzenia, aby wygenerować wielowarstwową paralaksę pomiędzy:
    1) Podświetloną mapą wektorową wewnątrz blatu stołu (warstwa głęboka),
    2) Trójwymiarową bryłą architektoniczną z wewnętrznym rdzeniem konstrukcyjnym (warstwa środkowa),
    3) Zawieszonymi w przestrzeni tablicami telemetrycznymi HUD (warstwa bliższa).
- **Dynamiczne efekty cząsteczkowe za oknami i wewnątrz sceny (Intensity: ${(config.windowParticlesIntensity * 100).toFixed(0)}%)**:
  - Wykorzystaj **Unity VFX Graph / Particle System** z kolizją płaszczyzn.
  - Za oknami pomieszczenia (wykrytymi przez pionowe płaszczyzny lub maskę głębi dalekiego planu) generuj dynamiczne smugi świetlne zachodu słońca i atmosferyczny pył miejski, a bezpośrednio wokół hologramu budynku unoszące się cząsteczki strumieni danych (Data Motes).

### 4. INTUICYJNE STEROWANIE DOTYKOWE, ANIMACJE PRZEJŚĆ I ZRZUTY EKRANU
- **Gesty dotykowe (Touch Input - EnhancedTouch API)**:
  - **Pinch-to-Scale (2 palce)**: Płynne skalowanie makiety w zakresie \`0.25x – 2.50x\` z zachowaniem punktu zakotwiczenia na blacie/podłodze.
  - **One/Two-Finger Twist & Drag**: Obrót modelu wokół osi Y (aktualnie \`${config.modelRotationY}°\`) z tłumieniem wykładniczym (\`Mathf.SmoothDamp\`).
- **Płynne animacje przejść między scenami 3D**:
  - Przy przełączaniu pomiędzy scenami (Kompleks Finansowy <-> Kampus Eco-Atrium <-> Terminal AeroHub) zastosuj sekwencję przejścia opartą na krzywych Beziera: zeskalowanie i rozproszenie cząsteczkowe bieżącej makiety (Dissolve Shader) oraz płynne wyłonienie nowego modelu z powierzchni blatu w czasie \`650 ms\`.
- **Zapis zrzutów ekranu do galerii urządzenia**:
  - Zaimplementuj przechwyt klatki \`ScreenCapture.CaptureScreenshotAsTexture()\` (z opcją ukrycia interfejsu UI przed renderem) i zapis bezpośrednio do natywnej galerii systemowej Android (\`MediaStore.Images.Media\`) oraz iOS (\`PHPhotoLibrary\`).

### 5. TRYB OFFLINE, SYNCHRONIZACJA W CHMURZE ORAZ EKSPORT (OBJ, STL, PDF)
- **Tryb Offline (${config.offlineModeEnabled ? "WŁĄCZONY" : "Opcjonalny"})**:
  - Wszystkie siatki 3D, shadery oraz konfiguracje scen przechowuj w lokalnej pamięci podręcznej (\`Application.persistentDataPath\` + SQLite/JSON). Aplikacja musi działać w 100% bez dostępu do sieci.
- **Moduł Chmury (${config.cloudSyncEnabled ? "AKTYWNY" : "Opcjonalny"})**:
  - Asynchroniczna synchronizacja projektów, kotwic przestrzennych (Cloud Anchors) i ustawień personalizacji pomiędzy smartfonem a tabletem użytkownika po wykryciu połączenia (Conflict-free Replicated Data State).
- **Eksport plików inżynierskich i dokumentacji**:
  - **Format .OBJ (Wavefront)**: Eksport pełnej siatki wielokątów (\`v\`, \`vn\`, \`vt\`, \`f\`) z podziałem na grupy konstrukcyjne budynku.
  - **Format .STL (Stereolithography)**: Eksport zamkniętej bryły trójkątów (ASCII/Binary STL) gotowej do druku 3D makiety architektonicznej.
  - **Zaawansowany eksport .PDF**: Generowanie wielostronicowego raportu PDF zawierającego zrzut widoku AR, parametry techniczne budynku, rzut warstw oraz specyfikację urządzenia.

### 6. MENU PERSONALIZACJI INTERFEJSU I WSPIERANE URZĄDZENIA MOBILNE
- **Personalizacja UI**: Wybór palety barwnej hologramu (aktualnie: *${HOLOGRAM_PALETTES[config.uiSettings.palette].name}*), gęstości paneli HUD (${config.uiSettings.hudDensity}), widoczności siatki LiDAR oraz języka dokumentacji.
- **Wspierane urządzenia mobilne (Smartfony i Tablety Android + iOS)**:
  - *Smartfony Android*: Samsung Galaxy S24/S23 Ultra, Google Pixel 9/8 Pro, Xiaomi 14 Ultra/Pro, Sony Xperia 1 VI (pełne wsparcie ARCore Depth API + ToF 120 FPS).
  - *Tablety Android*: Samsung Galaxy Tab S9 Ultra / S9+, OnePlus Pad 2, Lenovo Tab P12 Pro (optymalizacja pod duże ekrany 12"–14.6" do prezentacji przy stole konferencyjnym).`;
	const systemPromptEN = `### ROLE & OBJECTIVE
Act as a Principal XR/AR Systems Architect and Lead Unity 3D Developer. Design and implement a real-time Augmented Reality (AR) Architectural Hologram Application rendering high-detail building complexes ("${sceneMeta.name}") anchored accurately onto physical tabletops and floors.

### 1. ENGINE, AR FRAMEWORKS & DEPTH SENSOR PLANE DETECTION
- **Engine & SDK**: ${frameworkLabel} using Universal Render Pipeline (URP).
- **Surface Plane Recognition**: Use \`ARPlaneManager\` (Horizontal Tabletop & Floor classification) and \`ARRaycastManager\` fused with hardware Time-of-Flight (ToF) / LiDAR depth sensors via \`AROcclusionManager\`.
- **Environmental Lighting & Occlusion**: Enable HDR Light Estimation (\`${config.lightTemperatureK}K\` ambient adaptation, directional shadows) and real-time per-pixel depth occlusion (\`EnvironmentDepthMode.Best\`).

### 2. 6DoF PARALLAX, WINDOW PARTICLES & TOUCH CONTROLS
- **Parallax Depth (${(config.parallaxIntensity * 100).toFixed(0)}%)**: Multi-plane 6DoF parallax between the recessed tabletop world-map projection, the multi-layered 3D architectural hologram, and floating spatial telemetry cards.
- **Dynamic Window & Scene Particles (${(config.windowParticlesIntensity * 100).toFixed(0)}%)**: Volumetric atmospheric dust motes and sunset light shafts rendered behind detected room window planes using Unity VFX Graph, plus rising data particles around the towers.
- **Touch Gestures**: Two-finger pinch-to-scale (0.25x–2.50x) and single/two-finger twist rotation with exponential smoothing (\`Mathf.SmoothDamp\`).
- **Smooth 3D Scene Transitions**: Animated holographic dissolve and vertical emergence transitions between architectural scenes.

### 3. NATIVE GALLERY SCREENSHOTS, OFFLINE/CLOUD SYNC & OBJ/STL/PDF EXPORT
- **Direct Gallery Save**: Capture clean high-DPI frames directly into Android \`MediaStore\` / iOS \`PHPhotoLibrary\`.
- **Offline-First + Cloud Sync**: Full local caching in \`Application.persistentDataPath\` for offline site inspections, with automatic background cloud delta synchronization across user tablets and smartphones.
- **CAD & Documentation Export**: Real-time mesh serialization to Wavefront \`.OBJ\`, 3D-printable \`.STL\`, and multi-page architectural report \`.PDF\`.
- **Supported Android Hardware**: Optimized for Android Tablets (Samsung Galaxy Tab S9 Ultra, OnePlus Pad 2, Lenovo Tab P12 Pro) and Android Smartphones (Galaxy S24 Ultra, Pixel 9 Pro, Xiaomi 14 Ultra, Xperia 1 VI).`;
	const visualPromptEN = `Photorealistic architectural AR visualization inside a modern high-rise executive conference room at golden hour sunset, inspired by futuristic spatial computing dashboards. In the center of a sleek dark reflective obsidian conference table rises a detailed glowing cyan and golden holographic 3D architectural model of "${sceneMeta.name}" (${sceneMeta.architecturalStyle}), featuring intricate structural diagrid frames, translucent glass curtain walls, internal elevator cores, and skybridges. Across the tabletop surface spreads an illuminated vector world map network glowing with warm amber and electric blue fiber-optic nodes. Floating translucent holographic HUD data panels hover in mid-air with 6DoF depth parallax. Through the floor-to-ceiling panoramic room windows in the background, dynamic volumetric sunset particles and atmospheric light rays drift above a distant city skyline. LiDAR depth sensor surface grid lines subtly anchor the hologram base to the tabletop plane, Unreal Engine 5 / Unity URP Octane Render, 8k resolution, architectural photography --ar 16:9 --v 6.0`;
	const unityCSharpCode = `using System.Collections;
using System.IO;
using System.Text;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using UnityEngine.InputSystem.EnhancedTouch;
using Touch = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace HoloArchAR
{
    /// <summary>
    /// Kompleksowy kontroler osadzania hologramów architektonicznych na blatach i podłogach
    /// z obsługą czujników głębi (ARKit/ARCore), oświetlenia środowiskowego, paralaksy 6DoF,
    /// gestów dotykowych, zrzutów ekranu oraz eksportu OBJ/STL.
    /// </summary>
    [RequireComponent(typeof(ARPlaneManager), typeof(ARRaycastManager), typeof(AROcclusionManager))]
    public class HoloArchARController : MonoBehaviour
    {
        [Header("Komponenty AR Foundation")]
        public ARPlaneManager planeManager;
        public ARRaycastManager raycastManager;
        public AROcclusionManager occlusionManager;
        public ARCameraManager cameraManager;

        [Header("Sceny Architektoniczne 3D i Efekty")]
        public GameObject[] architecturalScenes;
        public ParticleSystem windowAtmosphericParticles;
        public Light directionalEnvLight;
        public Transform parallaxTableLayer;
        public Transform parallaxFloatingHudLayer;

        [Header("Parametry Sterowania i Paralaksy")]
        [Range(0.25f, 2.5f)] public float currentScale = ${config.modelScale.toFixed(2)}f;
        [Range(0f, 1f)] public float parallaxStrength = ${config.parallaxIntensity.toFixed(2)}f;
        private int activeSceneIndex = 0;
        private GameObject spawnedHologram;
        private Vector3 initialCameraLocalPos;

        private void OnEnable()
        {
            EnhancedTouchSupport.Enable();
            if (cameraManager != null)
                cameraManager.frameReceived += OnCameraFrameReceived;
        }

        private void OnDisable()
        {
            if (cameraManager != null)
                cameraManager.frameReceived -= OnCameraFrameReceived;
            EnhancedTouchSupport.Disable();
        }

        private void Start()
        {
            // Konfiguracja czujnika głębi i okluzji (ARCore Depth API / ARKit LiDAR)
            occlusionManager.requestedEnvironmentDepthMode = ${config.occlusionEnabled ? "EnvironmentDepthMode.Best" : "EnvironmentDepthMode.Disabled"};
            planeManager.requestedDetectionMode = PlaneDetectionMode.Horizontal;
            initialCameraLocalPos = Camera.main.transform.localPosition;
        }

        private void Update()
        {
            HandleTouchGestures();
            ApplySixDoFParallax();
        }

        /// <summary>
        /// Oświetlenie środowiskowe w czasie rzeczywistym (HDR Light Estimation)
        /// </summary>
        private void OnCameraFrameReceived(ARCameraFrameEventArgs args)
        {
            if (!${config.environmentalLighting ? "true" : "false"}) return;

            if (args.lightEstimation.averageBrightness.HasValue)
                directionalEnvLight.intensity = Mathf.Clamp(args.lightEstimation.averageBrightness.Value * 1.4f, 0.4f, 2.2f);

            if (args.lightEstimation.colorCorrection.HasValue)
                directionalEnvLight.color = args.lightEstimation.colorCorrection.Value;

            if (args.lightEstimation.mainLightDirection.HasValue)
                directionalEnvLight.transform.rotation = Quaternion.LookRotation(args.lightEstimation.mainLightDirection.Value);
        }

        /// <summary>
        /// Intuicyjne sterowanie dotykowe: Pinch-to-Scale, Rotacja oraz osadzanie na blacie/podłodze
        /// </summary>
        private void HandleTouchGestures()
        {
            var activeTouches = Touch.activeTouches;
            if (activeTouches.Count == 1 && activeTouches[0].phase == UnityEngine.InputSystem.TouchPhase.Moved)
            {
                if (spawnedHologram != null)
                {
                    float rotDelta = activeTouches[0].delta.x * 0.35f;
                    spawnedHologram.transform.Rotate(Vector3.up, -rotDelta, Space.World);
                }
            }
            else if (activeTouches.Count == 2)
            {
                var t0 = activeTouches[0];
                var t1 = activeTouches[1];
                float prevDist = Vector2.Distance(t0.screenPosition - t0.delta, t1.screenPosition - t1.delta);
                float currDist = Vector2.Distance(t0.screenPosition, t1.screenPosition);
                if (prevDist > 0.01f && spawnedHologram != null)
                {
                    currentScale = Mathf.Clamp(currentScale * (currDist / prevDist), 0.25f, 2.5f);
                    spawnedHologram.transform.localScale = Vector3.Lerp(
                        spawnedHologram.transform.localScale,
                        Vector3.one * currentScale,
                        Time.deltaTime * 12f
                    );
                }
            }
        }

        /// <summary>
        /// Efekt paralaksy głębi obrazu podczas poruszania urządzeniem wokół modelu
        /// </summary>
        private void ApplySixDoFParallax()
        {
            if (Camera.main == null || spawnedHologram == null) return;
            Vector3 camOffset = Camera.main.transform.position - spawnedHologram.transform.position;

            if (parallaxTableLayer != null)
                parallaxTableLayer.localPosition = new Vector3(-camOffset.x * 0.04f * parallaxStrength, 0f, -camOffset.z * 0.04f * parallaxStrength);

            if (parallaxFloatingHudLayer != null)
                parallaxFloatingHudLayer.localPosition = new Vector3(camOffset.x * 0.08f * parallaxStrength, 0.25f, camOffset.z * 0.08f * parallaxStrength);
        }

        /// <summary>
        /// Płynna animacja przejścia między poszczególnymi scenami 3D
        /// </summary>
        public IEnumerator TransitionToScene(int nextIndex)
        {
            if (spawnedHologram != null)
            {
                float t = 0f;
                Vector3 startScale = spawnedHologram.transform.localScale;
                while (t < 0.3f)
                {
                    t += Time.deltaTime;
                    spawnedHologram.transform.localScale = Vector3.Lerp(startScale, Vector3.zero, t / 0.3f);
                    yield return null;
                }
                Destroy(spawnedHologram);
            }

            activeSceneIndex = nextIndex % architecturalScenes.Length;
            spawnedHologram = Instantiate(architecturalScenes[activeSceneIndex], transform.position, Quaternion.identity);
            spawnedHologram.transform.localScale = Vector3.zero;

            float appearTime = 0f;
            while (appearTime < 0.35f)
            {
                appearTime += Time.deltaTime;
                float smooth = Mathf.SmoothStep(0f, 1f, appearTime / 0.35f);
                spawnedHologram.transform.localScale = Vector3.one * (currentScale * smooth);
                yield return null;
            }
        }
    }
}`;
	return {
		title: `Specyfikacja Promptu AR: ${sceneMeta.name}`,
		systemPromptPL,
		systemPromptEN,
		visualPromptEN,
		unityCSharpCode
	};
}

//# sourceMappingURL=data:application/json;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBNkZqRSxPQUFPO0VBQ0wsT0FBTyw0QkFBNEIsVUFBVTtFQUM3QztFQUNBO0VBQ0E7RUFDQTtDQUNGO0FBQ0YiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiYXJTdHVkaW9EYXRhLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFSQ29uZmlnU3RhdGUsXG4gIEFyY2hpdGVjdHVyYWxTY2VuZU1ldGEsXG4gIEhvbG9ncmFtUGFsZXR0ZUlkLFxuICBTdXBwb3J0ZWREZXZpY2UsXG59IGZyb20gJy4uL3R5cGVzL2FyU3R1ZGlvJztcblxuZXhwb3J0IGNvbnN0IEhPTE9HUkFNX1BBTEVUVEVTOiBSZWNvcmQ8XG4gIEhvbG9ncmFtUGFsZXR0ZUlkLFxuICB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHByaW1hcnlIZXg6IHN0cmluZztcbiAgICBzZWNvbmRhcnlIZXg6IHN0cmluZztcbiAgICBncmlkSGV4OiBzdHJpbmc7XG4gICAgYmFkZ2VCZzogc3RyaW5nO1xuICAgIGFjY2VudFRleHQ6IHN0cmluZztcbiAgfVxuPiA9IHtcbiAgY3lhbl9ibHVlcHJpbnQ6IHtcbiAgICBuYW1lOiAnQ3lhbiBCbHVlcHJpbnQgKFN0YW5kYXJkIEFSKScsXG4gICAgcHJpbWFyeUhleDogJyMwNkI2RDQnLFxuICAgIHNlY29uZGFyeUhleDogJyNGNTlFMEInLFxuICAgIGdyaWRIZXg6ICcjMEVBNUU5JyxcbiAgICBiYWRnZUJnOiAnYmctY3lhbi01MDAvMTUgdGV4dC1jeWFuLTMwMCBib3JkZXItY3lhbi01MDAvMzAnLFxuICAgIGFjY2VudFRleHQ6ICd0ZXh0LWN5YW4tNDAwJyxcbiAgfSxcbiAgYW1iZXJfZ29sZDoge1xuICAgIG5hbWU6ICdaxYJvdHkgQnVyc3p0eW4gKFN1bnNldCBFeGVjdXRpdmUpJyxcbiAgICBwcmltYXJ5SGV4OiAnI0Y1OUUwQicsXG4gICAgc2Vjb25kYXJ5SGV4OiAnIzM4QkRGOCcsXG4gICAgZ3JpZEhleDogJyNEOTc3MDYnLFxuICAgIGJhZGdlQmc6ICdiZy1hbWJlci01MDAvMTUgdGV4dC1hbWJlci0zMDAgYm9yZGVyLWFtYmVyLTUwMC8zMCcsXG4gICAgYWNjZW50VGV4dDogJ3RleHQtYW1iZXItNDAwJyxcbiAgfSxcbiAgZW1lcmFsZF9tYXRyaXg6IHtcbiAgICBuYW1lOiAnU3ptYXJhZ2Rvd3kgTGlEQVIgKENBRCBTY2FuKScsXG4gICAgcHJpbWFyeUhleDogJyMxMEI5ODEnLFxuICAgIHNlY29uZGFyeUhleDogJyMwNkI2RDQnLFxuICAgIGdyaWRIZXg6ICcjMDU5NjY5JyxcbiAgICBiYWRnZUJnOiAnYmctZW1lcmFsZC01MDAvMTUgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC01MDAvMzAnLFxuICAgIGFjY2VudFRleHQ6ICd0ZXh0LWVtZXJhbGQtNDAwJyxcbiAgfSxcbiAgcGxhdGludW1fYXJjaDoge1xuICAgIG5hbWU6ICdQbGF0eW5vd3kgTW9ub2xpdCAoV2hpdGUgQklNKScsXG4gICAgcHJpbWFyeUhleDogJyNFMkU4RjAnLFxuICAgIHNlY29uZGFyeUhleDogJyMzOEJERjgnLFxuICAgIGdyaWRIZXg6ICcjOTRBM0I4JyxcbiAgICBiYWRnZUJnOiAnYmctc2xhdGUtMjAwLzE1IHRleHQtc2xhdGUtMjAwIGJvcmRlci1zbGF0ZS00MDAvMzAnLFxuICAgIGFjY2VudFRleHQ6ICd0ZXh0LXNsYXRlLTIwMCcsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgQVJDSElURUNUVVJBTF9TQ0VORVM6IEFyY2hpdGVjdHVyYWxTY2VuZU1ldGFbXSA9IFtcbiAge1xuICAgIGlkOiAnc2t5bGluZV9maW5hbmNpYWwnLFxuICAgIG5hbWU6ICcwMS4gS29tcGxla3MgRmluYW5zb3d5IOKAnlNreWxpbmUgQ29yZeKAnScsXG4gICAgc3VidGl0bGU6ICdaZXNww7PFgiB3eXNva2/Fm2Npb3djw7N3IHogZGlhZ3JpZGVtIGtvbnN0cnVrY3lqbnltIGkgcG9kaXVtIHdpZWxvZnVua2N5am55bScsXG4gICAgYXJjaGl0ZWN0dXJhbFN0eWxlOiAnSGlnaC1UZWNoIC8gU3VwZXJ0YWxsIFBhcmFtZXRyaWMgR2xhc3MnLFxuICAgIHJlYWxXb3JsZEhlaWdodE06IDM0MixcbiAgICBmb290cHJpbnRTcW06IDQ4NTAwLFxuICAgIHBhcnRzQ291bnQ6IDExLFxuICAgIHZlcnRpY2VzRXN0aW1hdGU6IDE4NDIwLFxuICAgIGxheWVyczogW1xuICAgICAgJ1DFgnl0YSBmdW5kYW1lbnRvd2EgaSBzaWF0a2EgZ2VvZGV6eWpuYSBibGF0dScsXG4gICAgICAnVHJ6b24gxbxlbGJldG93eSBpIGtvbXVuaWthY2phIHBpb25vd2EnLFxuICAgICAgJ0Zhc2FkYSBrdXJ0eW5vd2EgeiBwb2R6aWHFgmVtIHN6cHJvc293eW0gKERpYWdyaWQpJyxcbiAgICAgICdNb3N0eSBwb3dpZXRyem5lIChTa3licmlkZ2VzKSBpIGlnbGljYSB0ZWxla29tdW5pa2FjeWpuYScsXG4gICAgXSxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdXaWVsb2N6xJnFm2Npb3d5IGhvbG9ncmFtIHplc3BvxYJ1IHdpZcW8b3djw7N3IGluc3Bpcm93YW55IHdpenVhbGl6YWNqxIUgc3RvxYJ1IGtvbmZlcmVuY3lqbmVnby4gWmF3aWVyYSBjZW50cmFsbsSFIGRvbWluYW50xJkgd3lzb2tvxZtjaW93xIUgeiB1c2tva2FtaSAoc2V0YmFja3MpLCBjenRlcnkgd2llxbxlIHNhdGVsaXRhcm5lLCBwcnpld2nEhXpraSBuYXBvd2lldHJ6bmUgb3JheiBwb2TFm3dpZXRsYW7EhSBtYXDEmSBnbG9iYWxuZWogc2llY2kgbmEgYmxhY2llLicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Vjb19hdHJpdW0nLFxuICAgIG5hbWU6ICcwMi4gS2FtcHVzIEJpb2tsaW1hdHljem55IOKAnkVjby1BdHJpdW3igJ0nLFxuICAgIHN1YnRpdGxlOiAnVGFyYXNvd3kga29tcGxla3MgYmFkYXdjenkgeiBjZW50cmFsbsSFIGtvcHXFgsSFIGdlb2RlenlqbsSFIGkgxbxhbHV6amFtaSBzb2xhcm55bWknLFxuICAgIGFyY2hpdGVjdHVyYWxTdHlsZTogJ0Jpb3BoaWxpYyBTdXN0YWluYWJsZSBCcnV0YWxpc20gJiBHbGFzcycsXG4gICAgcmVhbFdvcmxkSGVpZ2h0TTogMTI4LFxuICAgIGZvb3RwcmludFNxbTogNjQwMDAsXG4gICAgcGFydHNDb3VudDogOSxcbiAgICB2ZXJ0aWNlc0VzdGltYXRlOiAxNTY4MCxcbiAgICBsYXllcnM6IFtcbiAgICAgICdQb2R6aWVtbmUgYXRyaXVtIGkgb2JyeXMgcMWCYXN6Y3p5em55IHBvZMWCb2dpJyxcbiAgICAgICdQaWVyxZtjaWVuaWUga29uc3RydWtjeWpuZSBpIHRyem9ueSBrbGF0ZWsnLFxuICAgICAgJ0tvcHXFgmEgYmlva2xpbWF0eWN6bmEgaSBwcnplc3prbG9uZSB0YXJhc3kga2Fza2Fkb3dlJyxcbiAgICAgICdEeW5hbWljem5lIMWCYW1hY3plIMWbd2lhdMWCYSAoQnJpc2Utc29sZWlsKSBpIHBhbmVsZSBQVicsXG4gICAgXSxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdIb2xvZ3JhZmljem55IG1vZGVsIHpyw7N3bm93YcW8b25lZ28ga2FtcHVzdSB0ZWNobm9sb2dpY3puZWdvLiBaYXByb2pla3Rvd2FueSBkbyBwcmV6ZW50YWNqaSBuYSBkdcW8eWNoIGJsYXRhY2gga29uZmVyZW5jeWpueWNoIG9yYXogYmV6cG/Fm3JlZG5pbyB3IHNrYWxpIDE6MjAgbmEgcG93aWVyemNobmkgcG9kxYJvZ2kgeiBwZcWCbsSFIG9rbHV6asSFIMWbcm9kb3dpc2tvd8SFLicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Flcm9faHViJyxcbiAgICBuYW1lOiAnMDMuIFRlcm1pbmFsIE11bHRpbW9kYWxueSDigJ5BZXJvSHVi4oCdJyxcbiAgICBzdWJ0aXRsZTogJ1JvenBpxJl0b8WbY2lvd2Ega29uc3RydWtjamEgxYJ1cGlub3dhIHoga3JhdG93bmljYW1pIGRhY2hvd3ltaSBpIHdpZcW8xIUga29udHJvbGknLFxuICAgIGFyY2hpdGVjdHVyYWxTdHlsZTogJ1N0cnVjdHVyYWwgRXhwcmVzc2lvbmlzbSAvIFBhcmFtZXRyaWMgU2hlbGwnLFxuICAgIHJlYWxXb3JsZEhlaWdodE06IDg2LFxuICAgIGZvb3RwcmludFNxbTogMTEyMDAwLFxuICAgIHBhcnRzQ291bnQ6IDEwLFxuICAgIHZlcnRpY2VzRXN0aW1hdGU6IDIxMzQwLFxuICAgIGxheWVyczogW1xuICAgICAgJ1DFgnl0YSBwZXJvbm93YSBpIGtvcnl0YXJ6ZSBrb2xlaSBkdcW8eWNoIHByxJlka2/Fm2NpJyxcbiAgICAgICdGaWxhcnkgcG9kcG9yb3dlIFYta3N6dGHFgnRuZSBpIHJkemVuaWUga29tdW5pa2FjeWpuZScsXG4gICAgICAnSGFsYSBnxYLDs3duYSBvZHByYXcgeiBmYXNhZMSFIGFrdXN0eWN6bsSFJyxcbiAgICAgICdXaWVsa29wcnplc3RyemVubmUgcHJ6ZWtyeWNpZSBkYWNob3dlIGkgd2llxbxhIG5hd2lnYWN5am5hJyxcbiAgICBdLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ01vZGVsIGluxbx5bmllcnlqbnkgd8SZesWCYSBwcnplc2lhZGtvd2VnbyB6IHdpZG9jem7EhSBzdHJ1a3R1csSFIGtyYXRvd25pYyBkYWNob3d5Y2gsIHBlcm9uYW1pIHBvZHppZW1ueW1pIGkgYWVyb2R5bmFtaWN6bnltIHphZGFzemVuaWVtLiBJZGVhbG55IGRvIHRlc3Rvd2FuaWEgZWZla3R1IHBhcmFsYWtzeSA2RG9GIG9yYXogZWtzcG9ydHUgc2lhdGtpIGRvIGZvcm1hdMOzdyBPQkogaSBTVEwuJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnY3J5c3RhbF9zdGFja2VkX3ByaXNtJyxcbiAgICBuYW1lOiAnMDQuIE1ha2lldGEgV2Fyc3R3b3dhIOKAnkNyeXN0YWwgUHJpc20gTEVE4oCdJyxcbiAgICBzdWJ0aXRsZTogJ1dzcG9ybmlrb3dhIG1ha2lldGEgemUgc3psaWZvd2FuZWdvIHN6a8WCYSBvcHR5Y3puZWdvIGkgY2llcMWCeWNoIGtvbHVtbiDFm3dpZXRsbnljaCBMRUQnLFxuICAgIGFyY2hpdGVjdHVyYWxTdHlsZTogJ1JlZnJhY3RpdmUgQWNyeWxpYyAmIENhbnRpbGV2ZXJlZCBHbGFzcyBTbGFicyAoSU9SIDEuNTIpJyxcbiAgICByZWFsV29ybGRIZWlnaHRNOiAyMTUsXG4gICAgZm9vdHByaW50U3FtOiAzODQwMCxcbiAgICBwYXJ0c0NvdW50OiAxMixcbiAgICB2ZXJ0aWNlc0VzdGltYXRlOiAyNDYwMCxcbiAgICBsYXllcnM6IFtcbiAgICAgICdDemFybnkgcG9zdHVtZW50IGdhYmxvdG93eSB6IHBvZMWbd2lldGxlbmllbSBvYndvZG93eW0nLFxuICAgICAgJ0NpZXDFgmUgdHJ6b255IMWbd2lldGxuZSBMRUQgKDI5MDBLKSBpIGtvbHVtbnkgbm/Fm25lJyxcbiAgICAgICdLYXNrYWRvd2UgdGFmbGUgemUgc3psaWZvd2FuZWdvIHN6a8WCYSBha3J5bG93ZWdvIHogZmF6b3dhbmllbScsXG4gICAgICAnV3Nwb3JuaWtvd2UgdGFyYXN5IHdpZG9rb3dlIGkgxZt3aWV0bGlrIGRhY2hvd3kgUHJpc20nLFxuICAgIF0sXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnQmV6cG/Fm3JlZG5pZSBvZHd6b3Jvd2FuaWUgemHFgsSFY3pvbnljaCBmb3RvZ3JhZmlpIGZpenljem55Y2ggbWFraWV0IGFyY2hpdGVrdG9uaWN6bnljaCB6ZSBzemvFgmEgd2Fyc3R3b3dlZ28gKGdsYXNzMS5wbmcsIGdsYXNzMi5wbmcsIDUwIFJpc2UgVG93ZXIpLiDFgcSFY3p5IGtyeXN0YWxpY3puaWUgcHJ6ZXpyb2N6eXN0ZSBwxYJ5dHkgc3Ryb3Bvd2UgeiBjaWVwxYJ5bSBidXJzenR5bm93eW0gcmR6ZW5pZW0gTEVELicsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3Zvcm9ub2lfYmlvbmljX3NwaXJlJyxcbiAgICBuYW1lOiAnMDUuIFdpZcW8YSBCaW9uaWN6bmEg4oCeVm9yb25vaSBIZWxpeCBTcGlyZeKAnScsXG4gICAgc3VidGl0bGU6ICdQYXJhbWV0cnljem55IGVnem9zemtpZWxldCBrb23Ds3Jrb3d5IFZvcm9ub2kgemUgc2tyxJljb27EhSBoZWxpc8SFIGFlcm9keW5hbWljem7EhScsXG4gICAgYXJjaGl0ZWN0dXJhbFN0eWxlOiAnUGFyYW1ldHJpYyBCaW9uaWMgVm9yb25vaSAmIFR3aXN0ZWQgRGlhZ3JpZCcsXG4gICAgcmVhbFdvcmxkSGVpZ2h0TTogMzI1LFxuICAgIGZvb3RwcmludFNxbTogNDIwMDAsXG4gICAgcGFydHNDb3VudDogMTEsXG4gICAgdmVydGljZXNFc3RpbWF0ZTogMzEyMDAsXG4gICAgbGF5ZXJzOiBbXG4gICAgICAnT3JnYW5pY3puYSBiYXphIGtvcnplbmlvd2EgaSBwaWVyxZtjaWXFhCBrb3R3acSFY3kgQVInLFxuICAgICAgJ1NrcsSZY29ueSB0cnpvbiBoZWxpa2FsbnkgKFRoZSBUb3JjaCAvIFNwaXJhbGEgMzI1bSknLFxuICAgICAgJ0tvbcOzcmtvd3kgZWd6b3N6a2llbGV0IFZvcm9ub2kgbyB6bWllbm5laiBnxJlzdG/Fm2NpIG9jemVrJyxcbiAgICAgICdLb3JvbmEgb2JzZXJ3YWN5am5hIHogcG9kd8Ozam7EhSB3c3TEmWfEhSBNb2JpdXNhIGkgaWdsaWPEhScsXG4gICAgXSxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdaYWluc3Bpcm93YW5hIHphxYLEhWN6b255bWkgd2l6dWFsaXphY2phbWkgcGFyYW1ldHJ5Y3pueWNoIHdpZcW8b3djw7N3IChUaGUgVG9yY2ggTlkgMzI1bSwgVGFzaGtlbnQgQ2l0eSwgc3RydWt0dXJ5IGJpb25pY3puZSBWb3Jvbm9pKS4gSWRlYWxuYSBkbyBwcmV6ZW50YWNqaSB6xYJvxbxvbnljaCBzaWF0ZWsgM0Qgb3JheiBza2Fub3dhbmlhIGVsZXdhY2ppIHByemV6IGFnZW50w7N3IEFHLTAxLi5BRy0wNi4nLFxuICB9LFxuICB7XG4gICAgaWQ6ICdraW5ldGljX2NhbGF0cmF2YV93aW5nJyxcbiAgICBuYW1lOiAnMDYuIFJ6ZcW6YmEgS2luZXR5Y3puYSDigJ5BZXJvZHluYW1pYyBXaW5n4oCdJyxcbiAgICBzdWJ0aXRsZTogJ1dhY2hsYXJ6b3dhIHN0cnVrdHVyYSBiaW9uaWN6bnljaCDFvGViZXIgdHl0YW5vd3ljaCB3IHNwaXJhbGkgbG9nYXJ5dG1pY3puZWonLFxuICAgIGFyY2hpdGVjdHVyYWxTdHlsZTogJ0tpbmV0aWMgU2N1bHB0dXJhbCBFeHByZXNzaW9uaXNtICYgQnJ1c2hlZCBUaXRhbml1bScsXG4gICAgcmVhbFdvcmxkSGVpZ2h0TTogNjQsXG4gICAgZm9vdHByaW50U3FtOiAxOTUwMCxcbiAgICBwYXJ0c0NvdW50OiAxMixcbiAgICB2ZXJ0aWNlc0VzdGltYXRlOiAyODkwMCxcbiAgICBsYXllcnM6IFtcbiAgICAgICdDacSZxbxrYSBiYXphIHogY2llbW5lZ28gc3pjem90a293YW5lZ28gdHl0YW51IG5hIGJsYWNpZScsXG4gICAgICAnV3lnacSZdHkgxYJ1a293byBrcsSZZ29zxYJ1cCBrb25zdHJ1a2N5am55IChDYW50aWxldmVyIFNwaW5lKScsXG4gICAgICAnU2Vrd2VuY2phIDE4IGFlcm9keW5hbWljem55Y2ggcGnDs3IvxbxlYmVyIHcgdWvFgmFkemllIHdhY2hsYXJ6b3d5bScsXG4gICAgICAnU3pjenl0b3dlIHBpw7NyYSBzdGFiaWxpenVqxIVjZSB6IHJlZmxla3NhbWkga3Jhd8SZZHppb3d5bWknLFxuICAgIF0sXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnV2llcm5hIHJla29uc3RydWtjamEgM0QgemHFgsSFY3pvbnljaCBmb3RvZ3JhZmlpIHJ6ZcW6Ynkga2luZXR5Y3puZWdvIHNrcnp5ZMWCYSAoLTAucG5nLCA2NzI0M2EzMzRlZjY1OGRhNmRkYTliN2FkZWFiZDhlMC5qcGcpLiBLYcW8ZGUgxbxlYnJvIG9icmFjYSBzacSZIHplIHN0b3BuaW93eW0gcHJ6ZXN1bmnEmWNpZW0gZmF6b3d5bSwgdHdvcnrEhWMgaGlwbm90eXp1asSFY8SFIGJyecWCxJkgdyBwcnplc3RyemVuaSBBUi4nLFxuICB9LFxuICB7XG4gICAgaWQ6ICdoeWRyb19hcXVhX3NjdWxwdHVyZScsXG4gICAgbmFtZTogJzA3LiBIeWRyby1SemXFumJhIOKAnkxpcXVpZCBDcnlzdGFsIFNwbGFzaOKAnScsXG4gICAgc3VidGl0bGU6ICdEeW5hbWljem5hIGtvbXBvenljamEgcMWCeW5uZWdvIHN6a8WCYSwgemFtcm/FvG9uZWogZmFsaSBpIHphd2llc3pvbnljaCBrcm9wZWwgdyA2RG9GJyxcbiAgICBhcmNoaXRlY3R1cmFsU3R5bGU6ICdGbHVpZCBEeW5hbWljcyAvIFJlZnJhY3RpdmUgQXF1YSBTY3VscHR1cmUgKElPUiAxLjMzMyknLFxuICAgIHJlYWxXb3JsZEhlaWdodE06IDQ4LFxuICAgIGZvb3RwcmludFNxbTogMTQyMDAsXG4gICAgcGFydHNDb3VudDogMTIsXG4gICAgdmVydGljZXNFc3RpbWF0ZTogMzQ4MDAsXG4gICAgbGF5ZXJzOiBbXG4gICAgICAnQ3lsaW5kcnljem5lIG5hY3p5bmllIGtyeXN0YWxpY3puZSB6IHRhZmzEhSB3b2R5IGkgYsSFYmVsa2FtaSBwb3dpZXRyemEnLFxuICAgICAgJ0R5bmFtaWN6bnkgdHJ6b24gd29kbnkgd3pub3N6xIVjeSBzacSZIHogd2lydSAoSHlkcm8gVm9ydGV4KScsXG4gICAgICAnUm96cG9zdGFydGUgcmFtaW9uYSBmYWxpIGkga29yb25hIHJvemJyeXpndSAoU3BsYXNoIENyZXN0KScsXG4gICAgICAnWmF3aWVzem9uZSB3IHByw7PFvG5pIHNmZXJ5Y3puZSBrcm9wbGUgcmVmcmFrY3lqbmUgM0QnLFxuICAgIF0sXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnVHLDs2p3eW1pYXJvd2EgaW50ZXJwcmV0YWNqYSB6YcWCxIVjem9ueWNoIG9icmF6w7N3IHdvZG55Y2ggaSBzemtsYW55Y2ggcnplxbpiICgwLmpwZywgOTdhNmQ5NWIsIDkyM2Y0ZmQ1KS4gV3lrb3J6eXN0dWplIHphYXdhbnNvd2FueSBzaGFkZXIgcmVmcmFrY2ppIHdvZG5laiwgemF3aWVzem9uZSB3IHByemVzdHJ6ZW5pIHNmZXJ5IGtyb3BlbCBvcmF6IGVmZWt0IHBhcmFsYWtzeSA2RG9GLicsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgU1VQUE9SVEVEX01PQklMRV9ERVZJQ0VTOiBTdXBwb3J0ZWREZXZpY2VbXSA9IFtcbiAge1xuICAgIGlkOiAnczI0LXVsdHJhJyxcbiAgICBicmFuZDogJ1NhbXN1bmcnLFxuICAgIG1vZGVsOiAnR2FsYXh5IFMyNCBVbHRyYSAvIFMyMyBVbHRyYScsXG4gICAgZm9ybUZhY3RvcjogJ1NtYXJ0Zm9uIEFuZHJvaWQnLFxuICAgIG9zVmVyc2lvbjogJ0FuZHJvaWQgMTQgKE9uZSBVSSA2LjEpJyxcbiAgICBhckNvcmVPcktpdFN1cHBvcnQ6ICdBUkNvcmUgMS40NCArIFJhdyBEZXB0aCBBUEknLFxuICAgIGRlcHRoU2Vuc29yOiAnTGFzZXIgQUYgKyBEdWFsIFBpeGVsIERlcHRoIE1hcCcsXG4gICAgcGxhbmVEZXRlY3Rpb25BY2N1cmFjeTogJ8KxMS4yIG1tIChCbGF0IGkgUG9kxYJvZ2EpJyxcbiAgICBvY2NsdXNpb25TdXBwb3J0OiAnU3ByesSZdG93YSAoVG9GIC8gTGlEQVIpJyxcbiAgICB0YXJnZXRGcHM6IDEyMCxcbiAgICBmcHNTYW1wbGVzOiBbMTE5LCAxMjAsIDEyMCwgMTE4LCAxMjAsIDExOSwgMTE3LCAxMjAsIDEyMCwgMTE5LCAxMjAsIDEyMF0sXG4gICAgZnBzU3RhYmlsaXR5UGVyY2VudDogOTkuMSxcbiAgICBmcHMxUGVyY2VudExvdzogMTE2LFxuICAgIHZlcmlmaWVkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaWQ6ICd0YWItczktdWx0cmEnLFxuICAgIGJyYW5kOiAnU2Ftc3VuZycsXG4gICAgbW9kZWw6ICdHYWxheHkgVGFiIFM5IFVsdHJhIC8gUzkrICgxNC42XCIgQU1PTEVEKScsXG4gICAgZm9ybUZhY3RvcjogJ1RhYmxldCBBbmRyb2lkJyxcbiAgICBvc1ZlcnNpb246ICdBbmRyb2lkIDE0IChPbmUgVUkgNi4xKScsXG4gICAgYXJDb3JlT3JLaXRTdXBwb3J0OiAnQVJDb3JlIDEuNDQgKyBFbnZpcm9ubWVudGFsIEhEUicsXG4gICAgZGVwdGhTZW5zb3I6ICdEdWFsIENhbWVyYSBTdGVyZW8gRGVwdGggKyBJTVUgNkRvRicsXG4gICAgcGxhbmVEZXRlY3Rpb25BY2N1cmFjeTogJ8KxMS41IG1tIChEdcW8ZSBwxYJhc3pjenl6bnkgc3RvxYLDs3cpJyxcbiAgICBvY2NsdXNpb25TdXBwb3J0OiAnUHJvZ3JhbW93YSAoQVJDb3JlIERlcHRoIEFQSSknLFxuICAgIHRhcmdldEZwczogMTIwLFxuICAgIGZwc1NhbXBsZXM6IFsxMTgsIDExOSwgMTIwLCAxMTYsIDExOCwgMTIwLCAxMTUsIDExOSwgMTIwLCAxMTgsIDExOSwgMTIwXSxcbiAgICBmcHNTdGFiaWxpdHlQZXJjZW50OiA5OC40LFxuICAgIGZwczFQZXJjZW50TG93OiAxMTMsXG4gICAgdmVyaWZpZWQ6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3BpeGVsLTktcHJvJyxcbiAgICBicmFuZDogJ0dvb2dsZScsXG4gICAgbW9kZWw6ICdQaXhlbCA5IFBybyBYTCAvIFBpeGVsIDggUHJvJyxcbiAgICBmb3JtRmFjdG9yOiAnU21hcnRmb24gQW5kcm9pZCcsXG4gICAgb3NWZXJzaW9uOiAnQW5kcm9pZCAxNScsXG4gICAgYXJDb3JlT3JLaXRTdXBwb3J0OiAnQVJDb3JlIE5hdGl2ZSArIEdlb3NwYXRpYWwgJiBTY2VuZSBTZW1hbnRpY3MnLFxuICAgIGRlcHRoU2Vuc29yOiAnTXVsdGktem9uZSBMYXNlciBEZXRlY3QgKyBUZW5zb3IgRzQgRGVwdGgnLFxuICAgIHBsYW5lRGV0ZWN0aW9uQWNjdXJhY3k6ICfCsTEuMCBtbSAoTmFqd3nFvHN6YSBwcmVjeXpqYSBBUkNvcmUpJyxcbiAgICBvY2NsdXNpb25TdXBwb3J0OiAnU3ByesSZdG93YSAoVG9GIC8gTGlEQVIpJyxcbiAgICB0YXJnZXRGcHM6IDEyMCxcbiAgICBmcHNTYW1wbGVzOiBbMTIwLCAxMjAsIDExOSwgMTIwLCAxMjAsIDExOCwgMTIwLCAxMTksIDEyMCwgMTIwLCAxMTksIDEyMF0sXG4gICAgZnBzU3RhYmlsaXR5UGVyY2VudDogOTkuNSxcbiAgICBmcHMxUGVyY2VudExvdzogMTE4LFxuICAgIHZlcmlmaWVkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaWQ6ICd4aWFvbWktMTQtdWx0cmEnLFxuICAgIGJyYW5kOiAnWGlhb21pJyxcbiAgICBtb2RlbDogJ1hpYW9taSAxNCBVbHRyYSAvIDE0IFBybycsXG4gICAgZm9ybUZhY3RvcjogJ1NtYXJ0Zm9uIEFuZHJvaWQnLFxuICAgIG9zVmVyc2lvbjogJ0FuZHJvaWQgMTQgKEh5cGVyT1MpJyxcbiAgICBhckNvcmVPcktpdFN1cHBvcnQ6ICdBUkNvcmUgMS40MyArIExpZ2h0IEVzdGltYXRpb24gSERSJyxcbiAgICBkZXB0aFNlbnNvcjogJ2RUb0YgKERpcmVjdCBUaW1lLW9mLUZsaWdodCkgM0QgTGFzZXInLFxuICAgIHBsYW5lRGV0ZWN0aW9uQWNjdXJhY3k6ICfCsTEuMyBtbSAoU3p5YmtpZSB3eWtyeXdhbmllIHN6a8WCYSBpIGRyZXduYSknLFxuICAgIG9jY2x1c2lvblN1cHBvcnQ6ICdTcHJ6xJl0b3dhIChUb0YgLyBMaURBUiknLFxuICAgIHRhcmdldEZwczogOTAsXG4gICAgZnBzU2FtcGxlczogWzkwLCA4OSwgOTAsIDg4LCA5MCwgODksIDg2LCA4OSwgOTAsIDkwLCA4OCwgOTBdLFxuICAgIGZwc1N0YWJpbGl0eVBlcmNlbnQ6IDk4LjIsXG4gICAgZnBzMVBlcmNlbnRMb3c6IDg1LFxuICAgIHZlcmlmaWVkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaWQ6ICdvbmVwbHVzLXBhZC0yJyxcbiAgICBicmFuZDogJ09uZVBsdXMnLFxuICAgIG1vZGVsOiAnT25lUGx1cyBQYWQgMiAoU25hcGRyYWdvbiA4IEdlbiAzKScsXG4gICAgZm9ybUZhY3RvcjogJ1RhYmxldCBBbmRyb2lkJyxcbiAgICBvc1ZlcnNpb246ICdBbmRyb2lkIDE0IChPeHlnZW5PUyAxNCknLFxuICAgIGFyQ29yZU9yS2l0U3VwcG9ydDogJ0FSQ29yZSAxLjQ0ICsgUGxhbmUgQm91bmRhcnkgUG9seWdvbicsXG4gICAgZGVwdGhTZW5zb3I6ICdBSSBTdGVyZW8gRGVwdGggRW5naW5lJyxcbiAgICBwbGFuZURldGVjdGlvbkFjY3VyYWN5OiAnwrEyLjAgbW0gKFByZXplbnRhY2plIG1ha2lldCBuYSBzdG/FgmFjaCknLFxuICAgIG9jY2x1c2lvblN1cHBvcnQ6ICdQcm9ncmFtb3dhIChBUkNvcmUgRGVwdGggQVBJKScsXG4gICAgdGFyZ2V0RnBzOiAxMjAsXG4gICAgZnBzU2FtcGxlczogWzExNywgMTE5LCAxMTgsIDExNCwgMTE3LCAxMTksIDExMiwgMTE2LCAxMTksIDExOCwgMTE3LCAxMTldLFxuICAgIGZwc1N0YWJpbGl0eVBlcmNlbnQ6IDk3LjYsXG4gICAgZnBzMVBlcmNlbnRMb3c6IDExMCxcbiAgICB2ZXJpZmllZDogdHJ1ZSxcbiAgfSxcbiAge1xuICAgIGlkOiAnbGVub3ZvLXRhYi1wMTItcHJvJyxcbiAgICBicmFuZDogJ0xlbm92bycsXG4gICAgbW9kZWw6ICdUYWIgUDEyIFBybyAvIExlZ2lvbiBUYWInLFxuICAgIGZvcm1GYWN0b3I6ICdUYWJsZXQgQW5kcm9pZCcsXG4gICAgb3NWZXJzaW9uOiAnQW5kcm9pZCAxMyAvIDE0IChaVUkpJyxcbiAgICBhckNvcmVPcktpdFN1cHBvcnQ6ICdBUkNvcmUgKyBUb0YgQW50aS1EcmlmdCBBbmNob3JzJyxcbiAgICBkZXB0aFNlbnNvcjogJ0N6dWpuaWsgZ8WCxJliaSBUb0YgKFRpbWUtb2YtRmxpZ2h0KScsXG4gICAgcGxhbmVEZXRlY3Rpb25BY2N1cmFjeTogJ8KxMS42IG1tIChTdGFiaWxuZSBrb3R3aWN6ZW5pZSBwb2TFgm9nb3dlKScsXG4gICAgb2NjbHVzaW9uU3VwcG9ydDogJ1NwcnrEmXRvd2EgKFRvRiAvIExpREFSKScsXG4gICAgdGFyZ2V0RnBzOiA5MCxcbiAgICBmcHNTYW1wbGVzOiBbODksIDkwLCA4OCwgODcsIDg5LCA5MCwgODQsIDg4LCA4OSwgOTAsIDg4LCA4OV0sXG4gICAgZnBzU3RhYmlsaXR5UGVyY2VudDogOTcuOCxcbiAgICBmcHMxUGVyY2VudExvdzogODMsXG4gICAgdmVyaWZpZWQ6IHRydWUsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3NvbnkteHBlcmlhLTEtdmknLFxuICAgIGJyYW5kOiAnU29ueScsXG4gICAgbW9kZWw6ICdYcGVyaWEgMSBWSSAvIDEgVicsXG4gICAgZm9ybUZhY3RvcjogJ1NtYXJ0Zm9uIEFuZHJvaWQnLFxuICAgIG9zVmVyc2lvbjogJ0FuZHJvaWQgMTQnLFxuICAgIGFyQ29yZU9yS2l0U3VwcG9ydDogJ0FSQ29yZSArIDNEIGlUb0YgU2Vuc29yIEludGVncmF0aW9uJyxcbiAgICBkZXB0aFNlbnNvcjogJ2RlZHlrb3dhbnkgc2Vuc29yIDNEIGlUb0YnLFxuICAgIHBsYW5lRGV0ZWN0aW9uQWNjdXJhY3k6ICfCsTEuMSBtbSAoUm96cG96bmF3YW5pZSBrcmF3xJlkemkgbWVibGkpJyxcbiAgICBvY2NsdXNpb25TdXBwb3J0OiAnU3ByesSZdG93YSAoVG9GIC8gTGlEQVIpJyxcbiAgICB0YXJnZXRGcHM6IDEyMCxcbiAgICBmcHNTYW1wbGVzOiBbMTIwLCAxMTksIDEyMCwgMTE5LCAxMTgsIDEyMCwgMTE3LCAxMTksIDEyMCwgMTIwLCAxMTksIDEyMF0sXG4gICAgZnBzU3RhYmlsaXR5UGVyY2VudDogOTkuMCxcbiAgICBmcHMxUGVyY2VudExvdzogMTE1LFxuICAgIHZlcmlmaWVkOiB0cnVlLFxuICB9LFxuICB7XG4gICAgaWQ6ICdpcGFkLXByby1tNCcsXG4gICAgYnJhbmQ6ICdBcHBsZScsXG4gICAgbW9kZWw6ICdpUGFkIFBybyAxM1wiIChNNCkgLyBpUGhvbmUgMTYgUHJvIE1heCcsXG4gICAgZm9ybUZhY3RvcjogJ1VyesSFZHplbmllIGlPUyAoUmVmZXJlbmN5am5lKScsXG4gICAgb3NWZXJzaW9uOiAnaVBhZE9TIDE4IC8gaU9TIDE4JyxcbiAgICBhckNvcmVPcktpdFN1cHBvcnQ6ICdBUktpdCA2ICsgU2NlbmUgUmVjb25zdHJ1Y3Rpb24gTWVzaCcsXG4gICAgZGVwdGhTZW5zb3I6ICdTa2FuZXIgTGlEQVIgZFRvRiAoRGlyZWN0IFRpbWUtb2YtRmxpZ2h0KScsXG4gICAgcGxhbmVEZXRlY3Rpb25BY2N1cmFjeTogJ8KxMC44IG1tIChTaWF0a2EgdG9wb2xvZ2ljem5hIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSknLFxuICAgIG9jY2x1c2lvblN1cHBvcnQ6ICdTcHJ6xJl0b3dhIChUb0YgLyBMaURBUiknLFxuICAgIHRhcmdldEZwczogMTIwLFxuICAgIGZwc1NhbXBsZXM6IFsxMjAsIDEyMCwgMTIwLCAxMTksIDEyMCwgMTIwLCAxMTksIDEyMCwgMTIwLCAxMjAsIDEyMCwgMTIwXSxcbiAgICBmcHNTdGFiaWxpdHlQZXJjZW50OiA5OS44LFxuICAgIGZwczFQZXJjZW50TG93OiAxMTksXG4gICAgdmVyaWZpZWQ6IHRydWUsXG4gIH0sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNYXN0ZXJQcm9tcHQoY29uZmlnOiBBUkNvbmZpZ1N0YXRlKToge1xuICB0aXRsZTogc3RyaW5nO1xuICBzeXN0ZW1Qcm9tcHRQTDogc3RyaW5nO1xuICBzeXN0ZW1Qcm9tcHRFTjogc3RyaW5nO1xuICB2aXN1YWxQcm9tcHRFTjogc3RyaW5nO1xuICB1bml0eUNTaGFycENvZGU6IHN0cmluZztcbn0ge1xuICBjb25zdCBzY2VuZU1ldGEgPVxuICAgIEFSQ0hJVEVDVFVSQUxfU0NFTkVTLmZpbmQoKHMpID0+IHMuaWQgPT09IGNvbmZpZy5zY2VuZUlkKSB8fCBBUkNISVRFQ1RVUkFMX1NDRU5FU1swXTtcbiAgY29uc3QgZnJhbWV3b3JrTGFiZWwgPVxuICAgIGNvbmZpZy5mcmFtZXdvcmsgPT09ICd1bml0eV9hcmZvdW5kYXRpb24nXG4gICAgICA/ICdVbml0eSA2IChBUiBGb3VuZGF0aW9uIDYuMCArIFhSIEludGVyYWN0aW9uIFRvb2xraXQgeiBqZWRub2N6ZXNueW0gd3NwYXJjaWVtIEFSQ29yZSBpIEFSS2l0KSdcbiAgICAgIDogY29uZmlnLmZyYW1ld29yayA9PT0gJ2FyY29yZV9uYXRpdmUnXG4gICAgICA/ICdVbml0eSA2ICsgR29vZ2xlIEFSQ29yZSBFeHRlbnNpb25zIChBbmRyb2lkIE5hdGl2ZSBEZXB0aCAmIFBsYW5lIEFQSSknXG4gICAgICA6ICdVbml0eSA2ICsgQXBwbGUgQVJLaXQgWFIgUGx1Z2luIChMaURBUiBTY2VuZSBNZXNoICYgUGxhbmUgRGV0ZWN0aW9uKSc7XG5cbiAgY29uc3QgcGxhbmVNb2RlTGFiZWwgPVxuICAgIGNvbmZpZy5wbGFuZURldGVjdGlvbk1vZGUgPT09ICd0YWJsZV9hbmRfZmxvb3InXG4gICAgICA/ICdSb3pwb3puYXdhbmllIHDFgmFzemN6eXpuIHBvemlvbXljaCBibGF0dSBzdG/FgnUgKFRhYmxldG9wKSBvcmF6IHBvZMWCb2dpIChGbG9vcikgemEgcG9tb2PEhSBjenVqbmlrw7N3IGfFgsSZYmkgVG9GL0xpREFSIGkgQVJQbGFuZU1hbmFnZXInXG4gICAgICA6IGNvbmZpZy5wbGFuZURldGVjdGlvbk1vZGUgPT09ICd0YWJsZV9vbmx5J1xuICAgICAgPyAnUHJlY3l6eWpuZSB3eWtyeXdhbmllIHBvd2llcnpjaG5pIHBvemlvbXljaCBwb2R3ecW8c3pvbnljaCAoYmxhdHkgc3RvxYLDs3cga29uZmVyZW5jeWpueWNoIGkgYml1cmVrKSdcbiAgICAgIDogJ1BlxYJuZSBza2Fub3dhbmllIHByemVzdHJ6ZW5uZSAzRCAoQmxhdHksIFBvZMWCb2dpLCDFmmNpYW55IG9yYXogcmFteSBva2llbm5lIHBvbWllc3pjemVuaWEpJztcblxuICBjb25zdCBzeXN0ZW1Qcm9tcHRQTCA9IGAjIyMgUk9MQSBJIENFTCBaQURBTklBXG5KZXN0ZcWbIFN0YXJzenltIEFyY2hpdGVrdGVtIFN5c3RlbcOzdyBYUi9BUiBvcmF6IEfFgsOzd255bSBJbsW8eW5pZXJlbSBVbml0eSAzRC4gVHdvaW0gemFkYW5pZW0gamVzdCB6YXByb2pla3Rvd2FuaWUgaSB3ZHJvxbxlbmllIGtvbXBsZXRuZWogYXBsaWthY2ppIHJvenN6ZXJ6b25laiByemVjenl3aXN0b8WbY2kgKEFSKSBwcmV6ZW50dWrEhWNlaiB3IGN6YXNpZSByemVjenl3aXN0eW0gaG9sb2dyYW1vd2UgbW9kZWxlIGJ1ZHlua8OzdyB6IHBlxYJueW1pIGRldGFsYW1pIGFyY2hpdGVrdG9uaWN6bnltaSAoXCIke3NjZW5lTWV0YS5uYW1lfVwiKSwgb3NhZHphbmUgcHJlY3l6eWpuaWUgbmEgcG93aWVyemNobmlhY2ggYmxhdMOzdyBzdG/FgsOzdyBvcmF6IHBvZMWCw7NnLlxuXG4tLS1cblxuIyMjIDEuIFNJTE5JSywgRlJBTUVXT1JLSSBBUiBJIERFVEVLQ0pBIFBPV0lFUlpDSE5JIChDWlVKTklLSSBHxYHEmEJJKVxuLSAqKlNpbG5payBpIFNESyoqOiAke2ZyYW1ld29ya0xhYmVsfSwgcG90b2sgcmVuZGVyb3dhbmlhICoqVW5pdmVyc2FsIFJlbmRlciBQaXBlbGluZSAoVVJQKSoqIHpvcHR5bWFsaXpvd2FueSBwb2QgdXJ6xIVkemVuaWEgbW9iaWxuZSAoJHtjb25maWcubW9kZWxTY2FsZS50b0ZpeGVkKDIpfXggc2thbGEgYmF6b3dhKS5cbi0gKipXeWtyeXdhbmllIHBvd2llcnpjaG5pIGkgY3p1am5pa2kgZ8WCxJliaSoqOlxuICAtIFNrb25maWd1cnVqIFxcYEFSUGxhbmVNYW5hZ2VyXFxgICh0cnliOiBcXGBQbGFuZURldGVjdGlvbk1vZGUuSG9yaXpvbnRhbFxcYCkgb3JheiBcXGBBUlJheWNhc3RNYW5hZ2VyXFxgIHdzcGllcmFueSBwcnpleiBkYW5lIHogY3p1am5pa2EgZ8WCxJliaSAoXFxgQVJPY2NsdXNpb25NYW5hZ2VyXFxgIC8gQVJDb3JlIERlcHRoIEFQSSAvIExpREFSKS5cbiAgLSAqKlpha3JlcyByb3pwb3puYXdhbmlhKio6ICR7cGxhbmVNb2RlTGFiZWx9LlxuICAtIFJvenLDs8W8bmlhaiBzZW1hbnR5Y3puaWUgcG96aW9tIHBvZMWCb2dpIChcXGBQbGFuZUNsYXNzaWZpY2F0aW9uLkZsb29yXFxgKSBvZCBwb3dpZXJ6Y2huaSBibGF0dSBzdG/FgnUgKFxcYFBsYW5lQ2xhc3NpZmljYXRpb24uVGFibGVcXGApIG5hIHBvZHN0YXdpZSB3eXNva2/Fm2NpIHd6Z2zEmWRuZWogd3pnbMSZZGVtIGthbWVyeSBvcmF6IG9icnlzdSBwb2xpZ29udSBcXGBBUlBsYW5lLmJvdW5kYXJ5XFxgLlxuICAtIFd5xZt3aWV0bGFqIHN1YnRlbG7EhSBzaWF0a8SZIGthbGlicmFjeWpuxIUgKEhvbG9ncmFwaGljIEdyaWQgU2hhZGVyKSBwb2RjemFzIHNrYW5vd2FuaWEgaSBhdXRvbWF0eWN6bmllIGtvdHdpY3ogKFxcYEFSQW5jaG9yTWFuYWdlclxcYCkgbW9kZWwgYnVkeW5rdSBwbyB6YXR3aWVyZHplbml1IHBvenljamkuXG5cbiMjIyAyLiBIT0xPR1JBRklDWk5FIE1PREVMRSBCVURZTkvDk1csIE/FmldJRVRMRU5JRSDFmlJPRE9XSVNLT1dFIEkgT0tMVVpKQVxuLSAqKkRldGFsZSBhcmNoaXRla3Rvbmljem5lIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSoqOlxuICAtIE1vZGVsIGRvY2Vsb3d5OiAqKiR7c2NlbmVNZXRhLm5hbWV9KiogKCR7c2NlbmVNZXRhLmFyY2hpdGVjdHVyYWxTdHlsZX0sICR7c2NlbmVNZXRhLnBhcnRzQ291bnR9IG1vZHXFgsOzdyBrb25zdHJ1a2N5am55Y2gsIG9rLiAke3NjZW5lTWV0YS52ZXJ0aWNlc0VzdGltYXRlfSB3aWVyemNob8WCa8OzdykuXG4gIC0gWmFzdG9zdWogYXV0b3Jza2kgc2hhZGVyIHcgKipVbml0eSBTaGFkZXIgR3JhcGgqKiAoRnJlc25lbCBSaW0gR2xvdyArIFNjYW5saW5lICsgVmVydGV4IFdpcmVmcmFtZSBPdmVybGF5ICsgQWRkaXRpdmUgVHJhbnNwYXJlbmN5KSB6IG9ic8WCdWfEhSBwcnpla3JvasOzdyBhcmNoaXRla3Rvbmljem55Y2ggaSByb3pzdHJ6ZWxlbmlhIHdhcnN0dyAoRXhwbG9kZWQgVmlldyA9ICR7KGNvbmZpZy5leHBsb2RlZFZpZXdGYWN0b3IgKiAxMDApLnRvRml4ZWQoMCl9JSkuXG4tICoqT8Wbd2lldGxlbmllIMWbcm9kb3dpc2tvd2UgKEVudmlyb25tZW50YWwgTGlnaHRpbmcpKio6XG4gIC0gU3RhdHVzOiAqKiR7Y29uZmlnLmVudmlyb25tZW50YWxMaWdodGluZyA/ICdBS1RZV05FIChBUkNhbWVyYU1hbmFnZXIgTGlnaHQgRXN0aW1hdGlvbiknIDogJ1N0YXR5Y3puZSBzdHVkeWpuZSd9KiogKFRlbXBlcmF0dXJhIGJhcndvd2Egb3RvY3plbmlhOiAqKiR7Y29uZmlnLmxpZ2h0VGVtcGVyYXR1cmVLfUsqKikuXG4gIC0gT2Rjenl0dWogdyBjemFzaWUgcnplY3p5d2lzdHltIFxcYGFyZ3MubGlnaHRFc3RpbWF0aW9uLmF2ZXJhZ2VCcmlnaHRuZXNzXFxgLCBcXGBhdmVyYWdlQ29sb3JUZW1wZXJhdHVyZVxcYCBvcmF6IFxcYG1haW5MaWdodERpcmVjdGlvblxcYCArIFxcYGFtYmllbnRTcGhlcmljYWxIYXJtb25pY3NcXGAsIGR5bmFtaWN6bmllIG1vZHVsdWrEhWMgaW50ZW5zeXdub8WbxIcgb2RiacSHIG5hIHN6a2xhbnljaCBmYXNhZGFjaCBob2xvZ3JhbXUgb3JheiBtacSZa2tpZSBjaWVuaWUga29udGFrdG93ZSBuYSBibGFjaWUuXG4tICoqT2tsdXpqYSBnxYLEmWJpIChSZWFsLVRpbWUgRGVwdGggT2NjbHVzaW9uKSoqOlxuICAtIFN0YXR1czogKioke2NvbmZpZy5vY2NsdXNpb25FbmFibGVkID8gJ1fFgcSEQ1pPTkEgKEVudmlyb25tZW50RGVwdGhNb2RlLkJlc3QgKyBIdW1hblN0ZW5jaWwpJyA6ICdXecWCxIVjem9uYSd9KiouXG4gIC0gT2JpZWt0eSBmaXp5Y3puZSBuYSBzdG9sZSAobnAuIGt1YmVrLCBsYXB0b3AsIGTFgm9uaWUgdcW8eXRrb3duaWthKSBvcmF6IGtyYXfEmWR6aWUgbWVibGkgem5hamR1asSFY2Ugc2nEmSBibGnFvGVqIGthbWVyeSBuacW8IGhvbG9ncmFtIG11c3rEhSBwcmF3aWTFgm93byBwcnp5c8WCYW5pYcSHIHdpcnR1YWxuZSBidWR5bmtpIG5hIHBvZHN0YXdpZSBtYXB5IGfFgsSZYmkgeiBjenVqbmlrYSBUb0YvQVJDb3JlIERlcHRoIEFQSS5cblxuIyMjIDMuIEVGRUtUIFBBUkFMQUtTWSA2RG9GIEkgRFlOQU1JQ1pORSBDWsSEU1RFQ1pLSSBaQSBPS05BTUkgUE9NSUVTWkNaRU5JQVxuLSAqKlBhcmFsYWtzYSBnxYLEmWJpIG9icmF6dSAoSW50ZW5zaXR5OiAkeyhjb25maWcucGFyYWxsYXhJbnRlbnNpdHkgKiAxMDApLnRvRml4ZWQoMCl9JSkqKjpcbiAgLSBXeWtvcnp5c3RhaiBkYW5lIMWbbGVkemVuaWEgNkRvRiBrYW1lcnkgKFxcYEFSQ2FtZXJhXFxgKSBvcmF6IMW8eXJvc2tvcHUgdXJ6xIVkemVuaWEsIGFieSB3eWdlbmVyb3dhxIcgd2llbG93YXJzdHdvd8SFIHBhcmFsYWtzxJkgcG9tacSZZHp5OlxuICAgIDEpIFBvZMWbd2lldGxvbsSFIG1hcMSFIHdla3Rvcm93xIUgd2V3bsSFdHJ6IGJsYXR1IHN0b8WCdSAod2Fyc3R3YSBnxYLEmWJva2EpLFxuICAgIDIpIFRyw7Nqd3ltaWFyb3fEhSBicnnFgsSFIGFyY2hpdGVrdG9uaWN6bsSFIHogd2V3bsSZdHJ6bnltIHJkemVuaWVtIGtvbnN0cnVrY3lqbnltICh3YXJzdHdhIMWbcm9ka293YSksXG4gICAgMykgWmF3aWVzem9ueW1pIHcgcHJ6ZXN0cnplbmkgdGFibGljYW1pIHRlbGVtZXRyeWN6bnltaSBIVUQgKHdhcnN0d2EgYmxpxbxzemEpLlxuLSAqKkR5bmFtaWN6bmUgZWZla3R5IGN6xIVzdGVjemtvd2UgemEgb2tuYW1pIGkgd2V3bsSFdHJ6IHNjZW55IChJbnRlbnNpdHk6ICR7KGNvbmZpZy53aW5kb3dQYXJ0aWNsZXNJbnRlbnNpdHkgKiAxMDApLnRvRml4ZWQoMCl9JSkqKjpcbiAgLSBXeWtvcnp5c3RhaiAqKlVuaXR5IFZGWCBHcmFwaCAvIFBhcnRpY2xlIFN5c3RlbSoqIHoga29saXpqxIUgcMWCYXN6Y3p5em4uXG4gIC0gWmEgb2tuYW1pIHBvbWllc3pjemVuaWEgKHd5a3J5dHltaSBwcnpleiBwaW9ub3dlIHDFgmFzemN6eXpueSBsdWIgbWFza8SZIGfFgsSZYmkgZGFsZWtpZWdvIHBsYW51KSBnZW5lcnVqIGR5bmFtaWN6bmUgc211Z2kgxZt3aWV0bG5lIHphY2hvZHUgc8WCb8WEY2EgaSBhdG1vc2Zlcnljem55IHB5xYIgbWllanNraSwgYSBiZXpwb8WbcmVkbmlvIHdva8OzxYIgaG9sb2dyYW11IGJ1ZHlua3UgdW5vc3rEhWNlIHNpxJkgY3rEhXN0ZWN6a2kgc3RydW1pZW5pIGRhbnljaCAoRGF0YSBNb3RlcykuXG5cbiMjIyA0LiBJTlRVSUNZSk5FIFNURVJPV0FOSUUgRE9UWUtPV0UsIEFOSU1BQ0pFIFBSWkVKxZrEhiBJIFpSWlVUWSBFS1JBTlVcbi0gKipHZXN0eSBkb3R5a293ZSAoVG91Y2ggSW5wdXQgLSBFbmhhbmNlZFRvdWNoIEFQSSkqKjpcbiAgLSAqKlBpbmNoLXRvLVNjYWxlICgyIHBhbGNlKSoqOiBQxYJ5bm5lIHNrYWxvd2FuaWUgbWFraWV0eSB3IHpha3Jlc2llIFxcYDAuMjV4IOKAkyAyLjUweFxcYCB6IHphY2hvd2FuaWVtIHB1bmt0dSB6YWtvdHdpY3plbmlhIG5hIGJsYWNpZS9wb2TFgm9kemUuXG4gIC0gKipPbmUvVHdvLUZpbmdlciBUd2lzdCAmIERyYWcqKjogT2Jyw7N0IG1vZGVsdSB3b2vDs8WCIG9zaSBZIChha3R1YWxuaWUgXFxgJHtjb25maWcubW9kZWxSb3RhdGlvbll9wrBcXGApIHogdMWCdW1pZW5pZW0gd3lrxYJhZG5pY3p5bSAoXFxgTWF0aGYuU21vb3RoRGFtcFxcYCkuXG4tICoqUMWCeW5uZSBhbmltYWNqZSBwcnplasWbxIcgbWnEmWR6eSBzY2VuYW1pIDNEKio6XG4gIC0gUHJ6eSBwcnplxYLEhWN6YW5pdSBwb21pxJlkenkgc2NlbmFtaSAoS29tcGxla3MgRmluYW5zb3d5IDwtPiBLYW1wdXMgRWNvLUF0cml1bSA8LT4gVGVybWluYWwgQWVyb0h1YikgemFzdG9zdWogc2Vrd2VuY2rEmSBwcnplasWbY2lhIG9wYXJ0xIUgbmEga3J6eXd5Y2ggQmV6aWVyYTogemVza2Fsb3dhbmllIGkgcm96cHJvc3plbmllIGN6xIVzdGVjemtvd2UgYmllxbzEhWNlaiBtYWtpZXR5IChEaXNzb2x2ZSBTaGFkZXIpIG9yYXogcMWCeW5uZSB3ecWCb25pZW5pZSBub3dlZ28gbW9kZWx1IHogcG93aWVyemNobmkgYmxhdHUgdyBjemFzaWUgXFxgNjUwIG1zXFxgLlxuLSAqKlphcGlzIHpyenV0w7N3IGVrcmFudSBkbyBnYWxlcmlpIHVyesSFZHplbmlhKio6XG4gIC0gWmFpbXBsZW1lbnR1aiBwcnplY2h3eXQga2xhdGtpIFxcYFNjcmVlbkNhcHR1cmUuQ2FwdHVyZVNjcmVlbnNob3RBc1RleHR1cmUoKVxcYCAoeiBvcGNqxIUgdWtyeWNpYSBpbnRlcmZlanN1IFVJIHByemVkIHJlbmRlcmVtKSBpIHphcGlzIGJlenBvxZtyZWRuaW8gZG8gbmF0eXduZWogZ2FsZXJpaSBzeXN0ZW1vd2VqIEFuZHJvaWQgKFxcYE1lZGlhU3RvcmUuSW1hZ2VzLk1lZGlhXFxgKSBvcmF6IGlPUyAoXFxgUEhQaG90b0xpYnJhcnlcXGApLlxuXG4jIyMgNS4gVFJZQiBPRkZMSU5FLCBTWU5DSFJPTklaQUNKQSBXIENITVVSWkUgT1JBWiBFS1NQT1JUIChPQkosIFNUTCwgUERGKVxuLSAqKlRyeWIgT2ZmbGluZSAoJHtjb25maWcub2ZmbGluZU1vZGVFbmFibGVkID8gJ1fFgcSEQ1pPTlknIDogJ09wY2pvbmFsbnknfSkqKjpcbiAgLSBXc3p5c3RraWUgc2lhdGtpIDNELCBzaGFkZXJ5IG9yYXoga29uZmlndXJhY2plIHNjZW4gcHJ6ZWNob3d1aiB3IGxva2FsbmVqIHBhbWnEmWNpIHBvZHLEmWN6bmVqIChcXGBBcHBsaWNhdGlvbi5wZXJzaXN0ZW50RGF0YVBhdGhcXGAgKyBTUUxpdGUvSlNPTikuIEFwbGlrYWNqYSBtdXNpIGR6aWHFgmHEhyB3IDEwMCUgYmV6IGRvc3TEmXB1IGRvIHNpZWNpLlxuLSAqKk1vZHXFgiBDaG11cnkgKCR7Y29uZmlnLmNsb3VkU3luY0VuYWJsZWQgPyAnQUtUWVdOWScgOiAnT3Bjam9uYWxueSd9KSoqOlxuICAtIEFzeW5jaHJvbmljem5hIHN5bmNocm9uaXphY2phIHByb2pla3TDs3csIGtvdHdpYyBwcnplc3RyemVubnljaCAoQ2xvdWQgQW5jaG9ycykgaSB1c3Rhd2llxYQgcGVyc29uYWxpemFjamkgcG9tacSZZHp5IHNtYXJ0Zm9uZW0gYSB0YWJsZXRlbSB1xbx5dGtvd25pa2EgcG8gd3lrcnljaXUgcG/FgsSFY3plbmlhIChDb25mbGljdC1mcmVlIFJlcGxpY2F0ZWQgRGF0YSBTdGF0ZSkuXG4tICoqRWtzcG9ydCBwbGlrw7N3IGluxbx5bmllcnNraWNoIGkgZG9rdW1lbnRhY2ppKio6XG4gIC0gKipGb3JtYXQgLk9CSiAoV2F2ZWZyb250KSoqOiBFa3Nwb3J0IHBlxYJuZWogc2lhdGtpIHdpZWxva8SFdMOzdyAoXFxgdlxcYCwgXFxgdm5cXGAsIFxcYHZ0XFxgLCBcXGBmXFxgKSB6IHBvZHppYcWCZW0gbmEgZ3J1cHkga29uc3RydWtjeWpuZSBidWR5bmt1LlxuICAtICoqRm9ybWF0IC5TVEwgKFN0ZXJlb2xpdGhvZ3JhcGh5KSoqOiBFa3Nwb3J0IHphbWtuacSZdGVqIGJyecWCeSB0csOzamvEhXTDs3cgKEFTQ0lJL0JpbmFyeSBTVEwpIGdvdG93ZWogZG8gZHJ1a3UgM0QgbWFraWV0eSBhcmNoaXRla3Rvbmljem5lai5cbiAgLSAqKlphYXdhbnNvd2FueSBla3Nwb3J0IC5QREYqKjogR2VuZXJvd2FuaWUgd2llbG9zdHJvbmljb3dlZ28gcmFwb3J0dSBQREYgemF3aWVyYWrEhWNlZ28genJ6dXQgd2lkb2t1IEFSLCBwYXJhbWV0cnkgdGVjaG5pY3puZSBidWR5bmt1LCByenV0IHdhcnN0dyBvcmF6IHNwZWN5ZmlrYWNqxJkgdXJ6xIVkemVuaWEuXG5cbiMjIyA2LiBNRU5VIFBFUlNPTkFMSVpBQ0pJIElOVEVSRkVKU1UgSSBXU1BJRVJBTkUgVVJaxIREWkVOSUEgTU9CSUxORVxuLSAqKlBlcnNvbmFsaXphY2phIFVJKio6IFd5YsOzciBwYWxldHkgYmFyd25laiBob2xvZ3JhbXUgKGFrdHVhbG5pZTogKiR7SE9MT0dSQU1fUEFMRVRURVNbY29uZmlnLnVpU2V0dGluZ3MucGFsZXR0ZV0ubmFtZX0qKSwgZ8SZc3RvxZtjaSBwYW5lbGkgSFVEICgke2NvbmZpZy51aVNldHRpbmdzLmh1ZERlbnNpdHl9KSwgd2lkb2N6bm/Fm2NpIHNpYXRraSBMaURBUiBvcmF6IGrEmXp5a2EgZG9rdW1lbnRhY2ppLlxuLSAqKldzcGllcmFuZSB1cnrEhWR6ZW5pYSBtb2JpbG5lIChTbWFydGZvbnkgaSBUYWJsZXR5IEFuZHJvaWQgKyBpT1MpKio6XG4gIC0gKlNtYXJ0Zm9ueSBBbmRyb2lkKjogU2Ftc3VuZyBHYWxheHkgUzI0L1MyMyBVbHRyYSwgR29vZ2xlIFBpeGVsIDkvOCBQcm8sIFhpYW9taSAxNCBVbHRyYS9Qcm8sIFNvbnkgWHBlcmlhIDEgVkkgKHBlxYJuZSB3c3BhcmNpZSBBUkNvcmUgRGVwdGggQVBJICsgVG9GIDEyMCBGUFMpLlxuICAtICpUYWJsZXR5IEFuZHJvaWQqOiBTYW1zdW5nIEdhbGF4eSBUYWIgUzkgVWx0cmEgLyBTOSssIE9uZVBsdXMgUGFkIDIsIExlbm92byBUYWIgUDEyIFBybyAob3B0eW1hbGl6YWNqYSBwb2QgZHXFvGUgZWtyYW55IDEyXCLigJMxNC42XCIgZG8gcHJlemVudGFjamkgcHJ6eSBzdG9sZSBrb25mZXJlbmN5am55bSkuYDtcblxuICBjb25zdCBzeXN0ZW1Qcm9tcHRFTiA9IGAjIyMgUk9MRSAmIE9CSkVDVElWRVxuQWN0IGFzIGEgUHJpbmNpcGFsIFhSL0FSIFN5c3RlbXMgQXJjaGl0ZWN0IGFuZCBMZWFkIFVuaXR5IDNEIERldmVsb3Blci4gRGVzaWduIGFuZCBpbXBsZW1lbnQgYSByZWFsLXRpbWUgQXVnbWVudGVkIFJlYWxpdHkgKEFSKSBBcmNoaXRlY3R1cmFsIEhvbG9ncmFtIEFwcGxpY2F0aW9uIHJlbmRlcmluZyBoaWdoLWRldGFpbCBidWlsZGluZyBjb21wbGV4ZXMgKFwiJHtzY2VuZU1ldGEubmFtZX1cIikgYW5jaG9yZWQgYWNjdXJhdGVseSBvbnRvIHBoeXNpY2FsIHRhYmxldG9wcyBhbmQgZmxvb3JzLlxuXG4jIyMgMS4gRU5HSU5FLCBBUiBGUkFNRVdPUktTICYgREVQVEggU0VOU09SIFBMQU5FIERFVEVDVElPTlxuLSAqKkVuZ2luZSAmIFNESyoqOiAke2ZyYW1ld29ya0xhYmVsfSB1c2luZyBVbml2ZXJzYWwgUmVuZGVyIFBpcGVsaW5lIChVUlApLlxuLSAqKlN1cmZhY2UgUGxhbmUgUmVjb2duaXRpb24qKjogVXNlIFxcYEFSUGxhbmVNYW5hZ2VyXFxgIChIb3Jpem9udGFsIFRhYmxldG9wICYgRmxvb3IgY2xhc3NpZmljYXRpb24pIGFuZCBcXGBBUlJheWNhc3RNYW5hZ2VyXFxgIGZ1c2VkIHdpdGggaGFyZHdhcmUgVGltZS1vZi1GbGlnaHQgKFRvRikgLyBMaURBUiBkZXB0aCBzZW5zb3JzIHZpYSBcXGBBUk9jY2x1c2lvbk1hbmFnZXJcXGAuXG4tICoqRW52aXJvbm1lbnRhbCBMaWdodGluZyAmIE9jY2x1c2lvbioqOiBFbmFibGUgSERSIExpZ2h0IEVzdGltYXRpb24gKFxcYCR7Y29uZmlnLmxpZ2h0VGVtcGVyYXR1cmVLfUtcXGAgYW1iaWVudCBhZGFwdGF0aW9uLCBkaXJlY3Rpb25hbCBzaGFkb3dzKSBhbmQgcmVhbC10aW1lIHBlci1waXhlbCBkZXB0aCBvY2NsdXNpb24gKFxcYEVudmlyb25tZW50RGVwdGhNb2RlLkJlc3RcXGApLlxuXG4jIyMgMi4gNkRvRiBQQVJBTExBWCwgV0lORE9XIFBBUlRJQ0xFUyAmIFRPVUNIIENPTlRST0xTXG4tICoqUGFyYWxsYXggRGVwdGggKCR7KGNvbmZpZy5wYXJhbGxheEludGVuc2l0eSAqIDEwMCkudG9GaXhlZCgwKX0lKSoqOiBNdWx0aS1wbGFuZSA2RG9GIHBhcmFsbGF4IGJldHdlZW4gdGhlIHJlY2Vzc2VkIHRhYmxldG9wIHdvcmxkLW1hcCBwcm9qZWN0aW9uLCB0aGUgbXVsdGktbGF5ZXJlZCAzRCBhcmNoaXRlY3R1cmFsIGhvbG9ncmFtLCBhbmQgZmxvYXRpbmcgc3BhdGlhbCB0ZWxlbWV0cnkgY2FyZHMuXG4tICoqRHluYW1pYyBXaW5kb3cgJiBTY2VuZSBQYXJ0aWNsZXMgKCR7KGNvbmZpZy53aW5kb3dQYXJ0aWNsZXNJbnRlbnNpdHkgKiAxMDApLnRvRml4ZWQoMCl9JSkqKjogVm9sdW1ldHJpYyBhdG1vc3BoZXJpYyBkdXN0IG1vdGVzIGFuZCBzdW5zZXQgbGlnaHQgc2hhZnRzIHJlbmRlcmVkIGJlaGluZCBkZXRlY3RlZCByb29tIHdpbmRvdyBwbGFuZXMgdXNpbmcgVW5pdHkgVkZYIEdyYXBoLCBwbHVzIHJpc2luZyBkYXRhIHBhcnRpY2xlcyBhcm91bmQgdGhlIHRvd2Vycy5cbi0gKipUb3VjaCBHZXN0dXJlcyoqOiBUd28tZmluZ2VyIHBpbmNoLXRvLXNjYWxlICgwLjI1eOKAkzIuNTB4KSBhbmQgc2luZ2xlL3R3by1maW5nZXIgdHdpc3Qgcm90YXRpb24gd2l0aCBleHBvbmVudGlhbCBzbW9vdGhpbmcgKFxcYE1hdGhmLlNtb290aERhbXBcXGApLlxuLSAqKlNtb290aCAzRCBTY2VuZSBUcmFuc2l0aW9ucyoqOiBBbmltYXRlZCBob2xvZ3JhcGhpYyBkaXNzb2x2ZSBhbmQgdmVydGljYWwgZW1lcmdlbmNlIHRyYW5zaXRpb25zIGJldHdlZW4gYXJjaGl0ZWN0dXJhbCBzY2VuZXMuXG5cbiMjIyAzLiBOQVRJVkUgR0FMTEVSWSBTQ1JFRU5TSE9UUywgT0ZGTElORS9DTE9VRCBTWU5DICYgT0JKL1NUTC9QREYgRVhQT1JUXG4tICoqRGlyZWN0IEdhbGxlcnkgU2F2ZSoqOiBDYXB0dXJlIGNsZWFuIGhpZ2gtRFBJIGZyYW1lcyBkaXJlY3RseSBpbnRvIEFuZHJvaWQgXFxgTWVkaWFTdG9yZVxcYCAvIGlPUyBcXGBQSFBob3RvTGlicmFyeVxcYC5cbi0gKipPZmZsaW5lLUZpcnN0ICsgQ2xvdWQgU3luYyoqOiBGdWxsIGxvY2FsIGNhY2hpbmcgaW4gXFxgQXBwbGljYXRpb24ucGVyc2lzdGVudERhdGFQYXRoXFxgIGZvciBvZmZsaW5lIHNpdGUgaW5zcGVjdGlvbnMsIHdpdGggYXV0b21hdGljIGJhY2tncm91bmQgY2xvdWQgZGVsdGEgc3luY2hyb25pemF0aW9uIGFjcm9zcyB1c2VyIHRhYmxldHMgYW5kIHNtYXJ0cGhvbmVzLlxuLSAqKkNBRCAmIERvY3VtZW50YXRpb24gRXhwb3J0Kio6IFJlYWwtdGltZSBtZXNoIHNlcmlhbGl6YXRpb24gdG8gV2F2ZWZyb250IFxcYC5PQkpcXGAsIDNELXByaW50YWJsZSBcXGAuU1RMXFxgLCBhbmQgbXVsdGktcGFnZSBhcmNoaXRlY3R1cmFsIHJlcG9ydCBcXGAuUERGXFxgLlxuLSAqKlN1cHBvcnRlZCBBbmRyb2lkIEhhcmR3YXJlKio6IE9wdGltaXplZCBmb3IgQW5kcm9pZCBUYWJsZXRzIChTYW1zdW5nIEdhbGF4eSBUYWIgUzkgVWx0cmEsIE9uZVBsdXMgUGFkIDIsIExlbm92byBUYWIgUDEyIFBybykgYW5kIEFuZHJvaWQgU21hcnRwaG9uZXMgKEdhbGF4eSBTMjQgVWx0cmEsIFBpeGVsIDkgUHJvLCBYaWFvbWkgMTQgVWx0cmEsIFhwZXJpYSAxIFZJKS5gO1xuXG4gIGNvbnN0IHZpc3VhbFByb21wdEVOID0gYFBob3RvcmVhbGlzdGljIGFyY2hpdGVjdHVyYWwgQVIgdmlzdWFsaXphdGlvbiBpbnNpZGUgYSBtb2Rlcm4gaGlnaC1yaXNlIGV4ZWN1dGl2ZSBjb25mZXJlbmNlIHJvb20gYXQgZ29sZGVuIGhvdXIgc3Vuc2V0LCBpbnNwaXJlZCBieSBmdXR1cmlzdGljIHNwYXRpYWwgY29tcHV0aW5nIGRhc2hib2FyZHMuIEluIHRoZSBjZW50ZXIgb2YgYSBzbGVlayBkYXJrIHJlZmxlY3RpdmUgb2JzaWRpYW4gY29uZmVyZW5jZSB0YWJsZSByaXNlcyBhIGRldGFpbGVkIGdsb3dpbmcgY3lhbiBhbmQgZ29sZGVuIGhvbG9ncmFwaGljIDNEIGFyY2hpdGVjdHVyYWwgbW9kZWwgb2YgXCIke3NjZW5lTWV0YS5uYW1lfVwiICgke3NjZW5lTWV0YS5hcmNoaXRlY3R1cmFsU3R5bGV9KSwgZmVhdHVyaW5nIGludHJpY2F0ZSBzdHJ1Y3R1cmFsIGRpYWdyaWQgZnJhbWVzLCB0cmFuc2x1Y2VudCBnbGFzcyBjdXJ0YWluIHdhbGxzLCBpbnRlcm5hbCBlbGV2YXRvciBjb3JlcywgYW5kIHNreWJyaWRnZXMuIEFjcm9zcyB0aGUgdGFibGV0b3Agc3VyZmFjZSBzcHJlYWRzIGFuIGlsbHVtaW5hdGVkIHZlY3RvciB3b3JsZCBtYXAgbmV0d29yayBnbG93aW5nIHdpdGggd2FybSBhbWJlciBhbmQgZWxlY3RyaWMgYmx1ZSBmaWJlci1vcHRpYyBub2Rlcy4gRmxvYXRpbmcgdHJhbnNsdWNlbnQgaG9sb2dyYXBoaWMgSFVEIGRhdGEgcGFuZWxzIGhvdmVyIGluIG1pZC1haXIgd2l0aCA2RG9GIGRlcHRoIHBhcmFsbGF4LiBUaHJvdWdoIHRoZSBmbG9vci10by1jZWlsaW5nIHBhbm9yYW1pYyByb29tIHdpbmRvd3MgaW4gdGhlIGJhY2tncm91bmQsIGR5bmFtaWMgdm9sdW1ldHJpYyBzdW5zZXQgcGFydGljbGVzIGFuZCBhdG1vc3BoZXJpYyBsaWdodCByYXlzIGRyaWZ0IGFib3ZlIGEgZGlzdGFudCBjaXR5IHNreWxpbmUuIExpREFSIGRlcHRoIHNlbnNvciBzdXJmYWNlIGdyaWQgbGluZXMgc3VidGx5IGFuY2hvciB0aGUgaG9sb2dyYW0gYmFzZSB0byB0aGUgdGFibGV0b3AgcGxhbmUsIFVucmVhbCBFbmdpbmUgNSAvIFVuaXR5IFVSUCBPY3RhbmUgUmVuZGVyLCA4ayByZXNvbHV0aW9uLCBhcmNoaXRlY3R1cmFsIHBob3RvZ3JhcGh5IC0tYXIgMTY6OSAtLXYgNi4wYDtcblxuICBjb25zdCB1bml0eUNTaGFycENvZGUgPSBgdXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zO1xudXNpbmcgU3lzdGVtLklPO1xudXNpbmcgU3lzdGVtLlRleHQ7XG51c2luZyBVbml0eUVuZ2luZTtcbnVzaW5nIFVuaXR5RW5naW5lLlhSLkFSRm91bmRhdGlvbjtcbnVzaW5nIFVuaXR5RW5naW5lLlhSLkFSU3Vic3lzdGVtcztcbnVzaW5nIFVuaXR5RW5naW5lLklucHV0U3lzdGVtLkVuaGFuY2VkVG91Y2g7XG51c2luZyBUb3VjaCA9IFVuaXR5RW5naW5lLklucHV0U3lzdGVtLkVuaGFuY2VkVG91Y2guVG91Y2g7XG5cbm5hbWVzcGFjZSBIb2xvQXJjaEFSXG57XG4gICAgLy8vIDxzdW1tYXJ5PlxuICAgIC8vLyBLb21wbGVrc293eSBrb250cm9sZXIgb3NhZHphbmlhIGhvbG9ncmFtw7N3IGFyY2hpdGVrdG9uaWN6bnljaCBuYSBibGF0YWNoIGkgcG9kxYJvZ2FjaFxuICAgIC8vLyB6IG9ic8WCdWfEhSBjenVqbmlrw7N3IGfFgsSZYmkgKEFSS2l0L0FSQ29yZSksIG/Fm3dpZXRsZW5pYSDFm3JvZG93aXNrb3dlZ28sIHBhcmFsYWtzeSA2RG9GLFxuICAgIC8vLyBnZXN0w7N3IGRvdHlrb3d5Y2gsIHpyenV0w7N3IGVrcmFudSBvcmF6IGVrc3BvcnR1IE9CSi9TVEwuXG4gICAgLy8vIDwvc3VtbWFyeT5cbiAgICBbUmVxdWlyZUNvbXBvbmVudCh0eXBlb2YoQVJQbGFuZU1hbmFnZXIpLCB0eXBlb2YoQVJSYXljYXN0TWFuYWdlciksIHR5cGVvZihBUk9jY2x1c2lvbk1hbmFnZXIpKV1cbiAgICBwdWJsaWMgY2xhc3MgSG9sb0FyY2hBUkNvbnRyb2xsZXIgOiBNb25vQmVoYXZpb3VyXG4gICAge1xuICAgICAgICBbSGVhZGVyKFwiS29tcG9uZW50eSBBUiBGb3VuZGF0aW9uXCIpXVxuICAgICAgICBwdWJsaWMgQVJQbGFuZU1hbmFnZXIgcGxhbmVNYW5hZ2VyO1xuICAgICAgICBwdWJsaWMgQVJSYXljYXN0TWFuYWdlciByYXljYXN0TWFuYWdlcjtcbiAgICAgICAgcHVibGljIEFST2NjbHVzaW9uTWFuYWdlciBvY2NsdXNpb25NYW5hZ2VyO1xuICAgICAgICBwdWJsaWMgQVJDYW1lcmFNYW5hZ2VyIGNhbWVyYU1hbmFnZXI7XG5cbiAgICAgICAgW0hlYWRlcihcIlNjZW55IEFyY2hpdGVrdG9uaWN6bmUgM0QgaSBFZmVrdHlcIildXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0W10gYXJjaGl0ZWN0dXJhbFNjZW5lcztcbiAgICAgICAgcHVibGljIFBhcnRpY2xlU3lzdGVtIHdpbmRvd0F0bW9zcGhlcmljUGFydGljbGVzO1xuICAgICAgICBwdWJsaWMgTGlnaHQgZGlyZWN0aW9uYWxFbnZMaWdodDtcbiAgICAgICAgcHVibGljIFRyYW5zZm9ybSBwYXJhbGxheFRhYmxlTGF5ZXI7XG4gICAgICAgIHB1YmxpYyBUcmFuc2Zvcm0gcGFyYWxsYXhGbG9hdGluZ0h1ZExheWVyO1xuXG4gICAgICAgIFtIZWFkZXIoXCJQYXJhbWV0cnkgU3Rlcm93YW5pYSBpIFBhcmFsYWtzeVwiKV1cbiAgICAgICAgW1JhbmdlKDAuMjVmLCAyLjVmKV0gcHVibGljIGZsb2F0IGN1cnJlbnRTY2FsZSA9ICR7Y29uZmlnLm1vZGVsU2NhbGUudG9GaXhlZCgyKX1mO1xuICAgICAgICBbUmFuZ2UoMGYsIDFmKV0gcHVibGljIGZsb2F0IHBhcmFsbGF4U3RyZW5ndGggPSAke2NvbmZpZy5wYXJhbGxheEludGVuc2l0eS50b0ZpeGVkKDIpfWY7XG4gICAgICAgIHByaXZhdGUgaW50IGFjdGl2ZVNjZW5lSW5kZXggPSAwO1xuICAgICAgICBwcml2YXRlIEdhbWVPYmplY3Qgc3Bhd25lZEhvbG9ncmFtO1xuICAgICAgICBwcml2YXRlIFZlY3RvcjMgaW5pdGlhbENhbWVyYUxvY2FsUG9zO1xuXG4gICAgICAgIHByaXZhdGUgdm9pZCBPbkVuYWJsZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIEVuaGFuY2VkVG91Y2hTdXBwb3J0LkVuYWJsZSgpO1xuICAgICAgICAgICAgaWYgKGNhbWVyYU1hbmFnZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBjYW1lcmFNYW5hZ2VyLmZyYW1lUmVjZWl2ZWQgKz0gT25DYW1lcmFGcmFtZVJlY2VpdmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uRGlzYWJsZSgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChjYW1lcmFNYW5hZ2VyICE9IG51bGwpXG4gICAgICAgICAgICAgICAgY2FtZXJhTWFuYWdlci5mcmFtZVJlY2VpdmVkIC09IE9uQ2FtZXJhRnJhbWVSZWNlaXZlZDtcbiAgICAgICAgICAgIEVuaGFuY2VkVG91Y2hTdXBwb3J0LkRpc2FibGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgdm9pZCBTdGFydCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIC8vIEtvbmZpZ3VyYWNqYSBjenVqbmlrYSBnxYLEmWJpIGkgb2tsdXpqaSAoQVJDb3JlIERlcHRoIEFQSSAvIEFSS2l0IExpREFSKVxuICAgICAgICAgICAgb2NjbHVzaW9uTWFuYWdlci5yZXF1ZXN0ZWRFbnZpcm9ubWVudERlcHRoTW9kZSA9ICR7XG4gICAgICAgICAgICAgIGNvbmZpZy5vY2NsdXNpb25FbmFibGVkXG4gICAgICAgICAgICAgICAgPyAnRW52aXJvbm1lbnREZXB0aE1vZGUuQmVzdCdcbiAgICAgICAgICAgICAgICA6ICdFbnZpcm9ubWVudERlcHRoTW9kZS5EaXNhYmxlZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwbGFuZU1hbmFnZXIucmVxdWVzdGVkRGV0ZWN0aW9uTW9kZSA9IFBsYW5lRGV0ZWN0aW9uTW9kZS5Ib3Jpem9udGFsO1xuICAgICAgICAgICAgaW5pdGlhbENhbWVyYUxvY2FsUG9zID0gQ2FtZXJhLm1haW4udHJhbnNmb3JtLmxvY2FsUG9zaXRpb247XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHZvaWQgVXBkYXRlKClcbiAgICAgICAge1xuICAgICAgICAgICAgSGFuZGxlVG91Y2hHZXN0dXJlcygpO1xuICAgICAgICAgICAgQXBwbHlTaXhEb0ZQYXJhbGxheCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gT8Wbd2lldGxlbmllIMWbcm9kb3dpc2tvd2UgdyBjemFzaWUgcnplY3p5d2lzdHltIChIRFIgTGlnaHQgRXN0aW1hdGlvbilcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHJpdmF0ZSB2b2lkIE9uQ2FtZXJhRnJhbWVSZWNlaXZlZChBUkNhbWVyYUZyYW1lRXZlbnRBcmdzIGFyZ3MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmICghJHtjb25maWcuZW52aXJvbm1lbnRhbExpZ2h0aW5nID8gJ3RydWUnIDogJ2ZhbHNlJ30pIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKGFyZ3MubGlnaHRFc3RpbWF0aW9uLmF2ZXJhZ2VCcmlnaHRuZXNzLkhhc1ZhbHVlKVxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbmFsRW52TGlnaHQuaW50ZW5zaXR5ID0gTWF0aGYuQ2xhbXAoYXJncy5saWdodEVzdGltYXRpb24uYXZlcmFnZUJyaWdodG5lc3MuVmFsdWUgKiAxLjRmLCAwLjRmLCAyLjJmKTtcblxuICAgICAgICAgICAgaWYgKGFyZ3MubGlnaHRFc3RpbWF0aW9uLmNvbG9yQ29ycmVjdGlvbi5IYXNWYWx1ZSlcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25hbEVudkxpZ2h0LmNvbG9yID0gYXJncy5saWdodEVzdGltYXRpb24uY29sb3JDb3JyZWN0aW9uLlZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoYXJncy5saWdodEVzdGltYXRpb24ubWFpbkxpZ2h0RGlyZWN0aW9uLkhhc1ZhbHVlKVxuICAgICAgICAgICAgICAgIGRpcmVjdGlvbmFsRW52TGlnaHQudHJhbnNmb3JtLnJvdGF0aW9uID0gUXVhdGVybmlvbi5Mb29rUm90YXRpb24oYXJncy5saWdodEVzdGltYXRpb24ubWFpbkxpZ2h0RGlyZWN0aW9uLlZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vLyA8c3VtbWFyeT5cbiAgICAgICAgLy8vIEludHVpY3lqbmUgc3Rlcm93YW5pZSBkb3R5a293ZTogUGluY2gtdG8tU2NhbGUsIFJvdGFjamEgb3JheiBvc2FkemFuaWUgbmEgYmxhY2llL3BvZMWCb2R6ZVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwcml2YXRlIHZvaWQgSGFuZGxlVG91Y2hHZXN0dXJlcygpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmVUb3VjaGVzID0gVG91Y2guYWN0aXZlVG91Y2hlcztcbiAgICAgICAgICAgIGlmIChhY3RpdmVUb3VjaGVzLkNvdW50ID09IDEgJiYgYWN0aXZlVG91Y2hlc1swXS5waGFzZSA9PSBVbml0eUVuZ2luZS5JbnB1dFN5c3RlbS5Ub3VjaFBoYXNlLk1vdmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmIChzcGF3bmVkSG9sb2dyYW0gIT0gbnVsbClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IHJvdERlbHRhID0gYWN0aXZlVG91Y2hlc1swXS5kZWx0YS54ICogMC4zNWY7XG4gICAgICAgICAgICAgICAgICAgIHNwYXduZWRIb2xvZ3JhbS50cmFuc2Zvcm0uUm90YXRlKFZlY3RvcjMudXAsIC1yb3REZWx0YSwgU3BhY2UuV29ybGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFjdGl2ZVRvdWNoZXMuQ291bnQgPT0gMilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YXIgdDAgPSBhY3RpdmVUb3VjaGVzWzBdO1xuICAgICAgICAgICAgICAgIHZhciB0MSA9IGFjdGl2ZVRvdWNoZXNbMV07XG4gICAgICAgICAgICAgICAgZmxvYXQgcHJldkRpc3QgPSBWZWN0b3IyLkRpc3RhbmNlKHQwLnNjcmVlblBvc2l0aW9uIC0gdDAuZGVsdGEsIHQxLnNjcmVlblBvc2l0aW9uIC0gdDEuZGVsdGEpO1xuICAgICAgICAgICAgICAgIGZsb2F0IGN1cnJEaXN0ID0gVmVjdG9yMi5EaXN0YW5jZSh0MC5zY3JlZW5Qb3NpdGlvbiwgdDEuc2NyZWVuUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2RGlzdCA+IDAuMDFmICYmIHNwYXduZWRIb2xvZ3JhbSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFNjYWxlID0gTWF0aGYuQ2xhbXAoY3VycmVudFNjYWxlICogKGN1cnJEaXN0IC8gcHJldkRpc3QpLCAwLjI1ZiwgMi41Zik7XG4gICAgICAgICAgICAgICAgICAgIHNwYXduZWRIb2xvZ3JhbS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IFZlY3RvcjMuTGVycChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXduZWRIb2xvZ3JhbS50cmFuc2Zvcm0ubG9jYWxTY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFZlY3RvcjMub25lICogY3VycmVudFNjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgVGltZS5kZWx0YVRpbWUgKiAxMmZcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8gPHN1bW1hcnk+XG4gICAgICAgIC8vLyBFZmVrdCBwYXJhbGFrc3kgZ8WCxJliaSBvYnJhenUgcG9kY3phcyBwb3J1c3phbmlhIHVyesSFZHplbmllbSB3b2vDs8WCIG1vZGVsdVxuICAgICAgICAvLy8gPC9zdW1tYXJ5PlxuICAgICAgICBwcml2YXRlIHZvaWQgQXBwbHlTaXhEb0ZQYXJhbGxheCgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChDYW1lcmEubWFpbiA9PSBudWxsIHx8IHNwYXduZWRIb2xvZ3JhbSA9PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICBWZWN0b3IzIGNhbU9mZnNldCA9IENhbWVyYS5tYWluLnRyYW5zZm9ybS5wb3NpdGlvbiAtIHNwYXduZWRIb2xvZ3JhbS50cmFuc2Zvcm0ucG9zaXRpb247XG5cbiAgICAgICAgICAgIGlmIChwYXJhbGxheFRhYmxlTGF5ZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBwYXJhbGxheFRhYmxlTGF5ZXIubG9jYWxQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKC1jYW1PZmZzZXQueCAqIDAuMDRmICogcGFyYWxsYXhTdHJlbmd0aCwgMGYsIC1jYW1PZmZzZXQueiAqIDAuMDRmICogcGFyYWxsYXhTdHJlbmd0aCk7XG5cbiAgICAgICAgICAgIGlmIChwYXJhbGxheEZsb2F0aW5nSHVkTGF5ZXIgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBwYXJhbGxheEZsb2F0aW5nSHVkTGF5ZXIubG9jYWxQb3NpdGlvbiA9IG5ldyBWZWN0b3IzKGNhbU9mZnNldC54ICogMC4wOGYgKiBwYXJhbGxheFN0cmVuZ3RoLCAwLjI1ZiwgY2FtT2Zmc2V0LnogKiAwLjA4ZiAqIHBhcmFsbGF4U3RyZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8vIDxzdW1tYXJ5PlxuICAgICAgICAvLy8gUMWCeW5uYSBhbmltYWNqYSBwcnplasWbY2lhIG1pxJlkenkgcG9zemN6ZWfDs2xueW1pIHNjZW5hbWkgM0RcbiAgICAgICAgLy8vIDwvc3VtbWFyeT5cbiAgICAgICAgcHVibGljIElFbnVtZXJhdG9yIFRyYW5zaXRpb25Ub1NjZW5lKGludCBuZXh0SW5kZXgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChzcGF3bmVkSG9sb2dyYW0gIT0gbnVsbClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmbG9hdCB0ID0gMGY7XG4gICAgICAgICAgICAgICAgVmVjdG9yMyBzdGFydFNjYWxlID0gc3Bhd25lZEhvbG9ncmFtLnRyYW5zZm9ybS5sb2NhbFNjYWxlO1xuICAgICAgICAgICAgICAgIHdoaWxlICh0IDwgMC4zZilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHQgKz0gVGltZS5kZWx0YVRpbWU7XG4gICAgICAgICAgICAgICAgICAgIHNwYXduZWRIb2xvZ3JhbS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IFZlY3RvcjMuTGVycChzdGFydFNjYWxlLCBWZWN0b3IzLnplcm8sIHQgLyAwLjNmKTtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIERlc3Ryb3koc3Bhd25lZEhvbG9ncmFtKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYWN0aXZlU2NlbmVJbmRleCA9IG5leHRJbmRleCAlIGFyY2hpdGVjdHVyYWxTY2VuZXMuTGVuZ3RoO1xuICAgICAgICAgICAgc3Bhd25lZEhvbG9ncmFtID0gSW5zdGFudGlhdGUoYXJjaGl0ZWN0dXJhbFNjZW5lc1thY3RpdmVTY2VuZUluZGV4XSwgdHJhbnNmb3JtLnBvc2l0aW9uLCBRdWF0ZXJuaW9uLmlkZW50aXR5KTtcbiAgICAgICAgICAgIHNwYXduZWRIb2xvZ3JhbS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IFZlY3RvcjMuemVybztcblxuICAgICAgICAgICAgZmxvYXQgYXBwZWFyVGltZSA9IDBmO1xuICAgICAgICAgICAgd2hpbGUgKGFwcGVhclRpbWUgPCAwLjM1ZilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhcHBlYXJUaW1lICs9IFRpbWUuZGVsdGFUaW1lO1xuICAgICAgICAgICAgICAgIGZsb2F0IHNtb290aCA9IE1hdGhmLlNtb290aFN0ZXAoMGYsIDFmLCBhcHBlYXJUaW1lIC8gMC4zNWYpO1xuICAgICAgICAgICAgICAgIHNwYXduZWRIb2xvZ3JhbS50cmFuc2Zvcm0ubG9jYWxTY2FsZSA9IFZlY3RvcjMub25lICogKGN1cnJlbnRTY2FsZSAqIHNtb290aCk7XG4gICAgICAgICAgICAgICAgeWllbGQgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59YDtcblxuICByZXR1cm4ge1xuICAgIHRpdGxlOiBgU3BlY3lmaWthY2phIFByb21wdHUgQVI6ICR7c2NlbmVNZXRhLm5hbWV9YCxcbiAgICBzeXN0ZW1Qcm9tcHRQTCxcbiAgICBzeXN0ZW1Qcm9tcHRFTixcbiAgICB2aXN1YWxQcm9tcHRFTixcbiAgICB1bml0eUNTaGFycENvZGUsXG4gIH07XG59XG4iXX0=