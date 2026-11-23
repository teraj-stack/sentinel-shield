export const BUILDING_TELEMETRY = {
	alpha_spire: {
		id: "alpha_spire",
		name: "Kompleks Alpha Spire (Zachodni)",
		subtitle: "Skręcana wieża parametryczna z podwójnym egzoszkieletem diagridowym",
		heightMeters: 428,
		floors: 96,
		structuralSystem: "Egzoszkielet Diagrid + Rdzeń Żelbetowy BIM LOD-400",
		anchorPlane: "Płaszczyzna #01 (Blat stołu: Y = 0.00m, ARPlaneAlignment.HorizontalUp)",
		lidarConfidence: "99.4% (Czujnik głębi ToF / LiDAR)",
		shaderPass: "URP Custom Fresnel + Animated Vertical Scanline + Depth Fade",
		description: "Zespół trzech wieżowców po lewej stronie blatu z zakrzywionym podium i wyświetlaczem pryzmatu rezonansowego."
	},
	central_nexus: {
		id: "central_nexus",
		name: "Wieże Core Sync Neural Nexus (Centrum)",
		subtitle: "Główny wysokościowiec o strukturze heksagonalno-diagridowej ze złotym rdzeniem energetycznym",
		heightMeters: 540,
		floors: 118,
		structuralSystem: "Hybrydowa Krata Diagridowa + Złoty Rdzeń Termiczny",
		anchorPlane: "Płaszczyzna #01 (Centralny Emiter Blatu: Y = 0.00m)",
		lidarConfidence: "99.8% (Kotwica ARAnchor z korekcją dryfu SLAM)",
		shaderPass: "Dual-Pass Additive Hologram + Spherical Harmonics Env Probe",
		description: "Centralny klaster trzech wież wyrastający z pierścienia synchronicznego na mapie świata, reagujący na oświetlenie sali."
	},
	orbital_twin: {
		id: "orbital_twin",
		name: "Zespół Iglic Wschodnich & Neural Array",
		subtitle: "Smukła bliźniacza iglica szczelinowa z wieżą skrętną i modułem biosfery",
		heightMeters: 485,
		floors: 108,
		structuralSystem: "Podwójna Rama Mega-Kolumnowa + Siatka Strukturowa 3D",
		anchorPlane: "Płaszczyzna #01 (Wschodni Sektor Blatu: Y = 0.00m)",
		lidarConfidence: "99.2% (Okluzja głębi środowiska z fotelem na pierwszym planie)",
		shaderPass: "Volumetric Wireframe + Stencil Window Portal Refrakcja",
		description: "Prawy zespół wysokościowców połączony z wiszącymi panelami biosfery ekologicznej oraz przestrzenną siecią neuronową."
	}
};
export function generateMasterPrompts(config) {
	const frameworkDescPL = config.arFramework === "ARKit 6 (LiDAR Scanner)" ? "Apple ARKit 6 z natywnym skanerem LiDAR (ARMeshManager + Instant Plane Placement)" : config.arFramework === "ARCore Depth API" ? "Google ARCore Depth API (Raw Depth + Plane Finding HorizontalUp)" : "Unity AR Foundation (zunifikowany potok ARKit + ARCore z obsługą czujników głębi)";
	const frameworkDescEN = config.arFramework === "ARKit 6 (LiDAR Scanner)" ? "Apple ARKit 6 with hardware LiDAR Scanner (ARMeshManager & instant surface classification)" : config.arFramework === "ARCore Depth API" ? "Google ARCore Depth API (Full Depth Map & Horizontal Plane Detection)" : "Unity AR Foundation cross-platform pipeline (ARKit + ARCore with hardware depth sensors)";
	const baseStylePL = config.hologramStyle === "Diagrid Exoskeleton + Rdzeń BIM" ? "półprzezroczystych błękitno-złotych hologramów z precyzyjnymi detalami architektonicznymi BIM (zewnętrzny egzoszkielet diagridowy, stropy kondygnacji, szyby windowe i świetliste rdzenie konstrukcyjne)" : config.hologramStyle === "Wolumetryczna Siatka Cyjanowa" ? "wysokokontrastowych, wolumetrycznych siatek CAD/BIM w kolorze elektrycznego cyjanu z podświetleniem krawędzi Fresnela i liniami skanowania" : "ciepłych złoto-szafirowych matryc fotonicznych z widocznymi węzłami konstrukcyjnymi i przepływem energii w rdzeniu budynków";
	const stylePL = config.enableNightMode ? `${baseStylePL} w trybie 'Night Mode' (wygaszone oświetlenie otoczenia sali i neonowa paleta barw: elektryczny błękit #00F0FF oraz głęboki fiolet #7C3AED symulujące architekturę nocną w AR)` : baseStylePL;
	const baseStyleEN = config.hologramStyle === "Diagrid Exoskeleton + Rdzeń BIM" ? "translucent cyan-and-gold architectural BIM holograms featuring intricate parametric diagrid exoskeletons, internal floor slabs, elevator cores, and glowing structural columns" : config.hologramStyle === "Wolumetryczna Siatka Cyjanowa" ? "high-precision volumetric electric-cyan CAD/BIM wireframes with Fresnel edge rim lighting and vertical holographic scanlines" : "luminous golden-sapphire photonic matrices revealing structural nodes, diagrid trusses, and internal thermal core conduits";
	const styleEN = config.enableNightMode ? `${baseStyleEN} rendered in nocturnal AR 'Night Mode' (automatically dimmed ambient room lighting with a high-contrast neon palette of electric blue #00F0FF and deep violet #7C3AED)` : baseStyleEN;
	const particlesPL = config.windowParticles === "Cząsteczki Atmosferyczne + Ruch Powietrzny" ? "dynamiczne efekty cząsteczkowe unoszącego się pyłu świetlnego, cząstek atmosferycznych oraz świetlistych strumieni ruchu powietrznego futurystycznej metropolii o zachodzie słońca" : config.windowParticles === "Złoty Pył Świetlny + Smugi Wolumetryczne" ? "gęste chmury złotego pyłu fotonicznego oraz wolumetryczne smugi światła słonecznego przenikające przez łukowe okna" : "dynamiczny hologramowy deszcz cząsteczkowy oraz pionowe strumienie danych świetlnych unoszące się między wieżowcami w tle za oknami";
	const particlesEN = config.windowParticles === "Cząsteczki Atmosferyczne + Ruch Powietrzny" ? "dynamic volumetric particle effects of floating atmospheric light spores, golden sunset motes, and futuristic aerial traffic streams moving outside behind the arched windows" : config.windowParticles === "Złoty Pył Świetlny + Smugi Wolumetryczne" ? "dense golden photonic dust particles and volumetric crepuscular light rays streaming behind the monumental arched windows" : "dynamic holographic particle rain and ascending luminous data streams suspended outside the room windows";
	const totalBuildings = config.buildingsPerGroup * 3;
	const approxHeightMeters = Math.round(config.buildingFloorCount * 4.2);
	const orientationPL = config.modelOrientation916 === "Układ Poziomy 9:16 (Horyzontalne Kompleksy)" ? "w układzie poziomym 9:16 (rozłożyste horyzontalne kompleksy architektoniczne i poziome skrzydła o proporcjach 9:16)" : config.modelOrientation916 === "Hybrydowy 9:16 (Poziome Skrzydła + Wieże)" ? "w układzie hybrydowym 9:16 łączącym szerokie poziome skrzydła kompleksów 9:16 z dominującymi iglicami pionowymi" : "w klasycznym układzie smukłych wysokościowców pionowych";
	const orientationEN = config.modelOrientation916 === "Układ Poziomy 9:16 (Horyzontalne Kompleksy)" ? "in a horizontal 9:16 architectural layout (expansive horizontal groundscraper complexes and cantilevered 9:16 wings)" : config.modelOrientation916 === "Hybrydowy 9:16 (Poziome Skrzydła + Wieże)" ? "in a hybrid 9:16 architectural proportion combining wide horizontal 9:16 podium wings with central vertical spires" : "in a vertical high-rise skyscraper configuration";
	const screenStylePL = config.hudScreenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)" ? "krystalicznych szklanych ekranów interaktywnych przezroczystych w 98% (Ultra-Clear 98% Transparent Glass UI) z zaokrąglonymi świetlistymi krawędziami, świetlistą typografią i dolnym paskiem dokowania z 4 okrągłymi przyciskami funkcyjnymi" : config.hudScreenStyle === "Szklany Panel Interaktywny (Frosted Glass UI)" ? "półprzezroczystych, mleczno-lawendowych szklanych paneli interaktywnych (Frosted Glass UI) z zaokrąglonymi białymi krawędziami świetlnymi, fioletowo-indygo typografią i dolnym paskiem dokowania z 4 okrągłymi przyciskami funkcyjnymi" : "transparentnych hologramowych ekranów technicznych CAD/BIM";
	const screenStyleEN = config.hudScreenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)" ? "ultra-clear 98% transparent crystal glass interactive UI screens with rounded specular white rims, luminous typography, diagonal action arrows, and a bottom rounded dock bar featuring 4 circular icon buttons" : config.hudScreenStyle === "Szklany Panel Interaktywny (Frosted Glass UI)" ? "translucent frosted lavender-white interactive glass UI panels with rounded specular white rims, bold indigo-violet typography, diagonal action arrows, and a bottom rounded dock bar featuring 4 circular icon buttons" : "translucent cyan holographic CAD HUD screens";
	// 1. Prompt Wizualny / Wideo AI (Midjourney v6 / Sora / Veo / Runway Gen-3) - PL
	const visualPromptPL = `Fotorealistyczna wizualizacja Rozszerzonej Rzeczywistości (AR) w czasie rzeczywistym, wyrenderowana w silniku ${config.renderPipeline}, przedstawiająca monumentalną salę o wymiarach ${config.roomWidthMeters.toFixed(1)}m × ${config.roomDepthMeters.toFixed(1)}m (${config.roomSizePreset}) z klasycznymi gotycko-modernistycznymi sklepieniami łukowymi i dużymi panoramicznymi oknami. Na środku znajduje się lustrzany stół konferencyjny z blatem o wymiarach ${config.tableWidthMeters.toFixed(2)}m × ${config.tableDepthMeters.toFixed(2)}m (${config.tableSizePreset}) i wyświetlaczem świetlistej mapy świata, na którym osadzono w czasie rzeczywistym 3 zespoły architektoniczne rozmieszczone nieliniowo w formacji "${config.buildingLayout}" (rozrzut głębi 3D: ${Math.round(config.layoutDepthScatter * 100)}%, tak aby modele nie stały w jednej linii), liczące po ${config.buildingsPerGroup} budynków w każdej grupie (łącznie ${totalBuildings} obiektów, do ${config.buildingFloorCount} kondygnacji / ~${approxHeightMeters}m) zaprojektowanych ${orientationPL} w formie ${stylePL}. Wokół budynków unoszą się 5 ${screenStylePL}. Powierzchnia blatu stołu (${config.tableWidthMeters.toFixed(2)}m × ${config.tableDepthMeters.toFixed(2)}m) oraz posadzka pomieszczenia (${config.roomWidthMeters.toFixed(1)}m × ${config.roomDepthMeters.toFixed(1)}m) są aktywnie rozpoznawane przez czujniki głębi LiDAR/ToF przy użyciu frameworka ${frameworkDescPL} z widoczną subtelną siatką detekcji płaszczyzn (surface plane detection grid) i precyzyjnym zakotwiczeniem grup budynków (AR Anchors). Scena wykorzystuje zaawansowane oświetlenie środowiskowe (Environmental Light Estimation, odbicia PBR hologramów na polerowanym blacie stołu) oraz okluzję głębi w czasie rzeczywistym (${config.occlusionMode}). Zastosuj płynnie regulowany ruch wahadłowy kamery (prędkość ${Math.round(config.pendulumSpeed * 100)}%) oraz głęboki efekt paralaksy 6DoF (intensywność ${Math.round(config.parallaxIntensity * 100)}%), odsłaniający wielowarstwową głębię ${config.buildingFloorCount} kondygnacji i szklanych ekranów interaktywnych. Za łukowymi oknami pomieszczenia dodaj ${particlesPL}, odseparowane maską głębi (Stencil Portal). Rozdzielczość 8K, physically-based rendering, kinowa głębia ostrości, wysoka szczegółowość detali konstrukcyjnych.`;
	// 2. Visual / Video AI Prompt - EN (Best for Midjourney / Veo / Sora / Runway)
	const visualPromptEN = `Real-time Augmented Reality (AR) architectural visualization rendered in ${config.renderPipeline}, set inside a grand vaulted room measuring ${config.roomWidthMeters.toFixed(1)}m × ${config.roomDepthMeters.toFixed(1)}m with Neo-Gothic arches and panoramic floor-to-ceiling windows at golden hour. Centered on a sleek reflective dark glass conference tabletop measuring ${config.tableWidthMeters.toFixed(2)}m × ${config.tableDepthMeters.toFixed(2)}m glowing with a holographic world map are 3 architectural clusters arranged in a non-linear 3D formation ("${config.buildingLayout}", depth scatter ${Math.round(config.layoutDepthScatter * 100)}% so models do not stand in a single straight line), containing ${config.buildingsPerGroup} buildings per group (${totalBuildings} structures total, up to ${config.buildingFloorCount} storeys / ~${approxHeightMeters}m) designed ${orientationEN} and rendered as ${styleEN}. Floating beside the buildings are 5 ${screenStyleEN} accompanied by faceted lavender 3D polyhedron gems. Both the ${config.tableWidthMeters.toFixed(2)}m × ${config.tableDepthMeters.toFixed(2)}m tabletop surface and the surrounding ${config.roomWidthMeters.toFixed(1)}m × ${config.roomDepthMeters.toFixed(1)}m room floor are actively scanned and tracked by hardware depth sensors using ${frameworkDescEN}, displaying a calibrated LiDAR surface plane detection mesh and spatial anchor rings. Full environmental lighting estimation and real-time depth occlusion (${config.occlusionMode}). Smoothly regulated pendulum camera motion (speed ${Math.round(config.pendulumSpeed * 100)}%) with 6DoF motion parallax (depth factor ${config.parallaxIntensity.toFixed(2)}). Directly outside the room's arched windows via stencil window portals, render ${particlesEN}. 8k resolution, Unreal/Unity PBR shader quality, volumetric bloom, razor-sharp architectural geometry.`;
	// 3. Technical Prompt for AI Coding Assistant (Unity 6 + AR Foundation C# + Shaders) - PL
	const unitySystemPromptPL = `Działaj jako Senior Unity AR Graphics Engineer. Przygotuj kompletną architekturę projektu w silniku ${config.renderPipeline} (Unity 6) wykorzystującą ${frameworkDescPL}, która realizuje interaktywną makietę hologramowych grup budynków:

1. ROZPOZNAWANIE WYMIARÓW BLATU (${config.tableWidthMeters.toFixed(2)}m × ${config.tableDepthMeters.toFixed(2)}m) I POMIESZCZENIA (${config.roomWidthMeters.toFixed(1)}m × ${config.roomDepthMeters.toFixed(1)}m):
   - Skonfiguruj ARSession, XROrigin oraz ARPlaneManager wykrywający płaszczyzny poziome (PlaneAlignment.HorizontalUp).
   - Napisz skrypt klasyfikujący wykryte płaszczyzny na podstawie wysokości Y względem kamery oraz wymiarów (plane.extents): dopasuj skalę makiety do blatu o docelowym wymiarze ${config.tableWidthMeters.toFixed(2)}m × ${config.tableDepthMeters.toFixed(2)}m oraz przeskaluj siatkę LiDAR posadzki do wymiarów pomieszczenia ${config.roomWidthMeters.toFixed(1)}m × ${config.roomDepthMeters.toFixed(1)}m.
   - Wykorzystaj ARRaycastManager oraz ARAnchorManager do stabilnego zakotwiczenia (ARAnchor) hologramowej mapy świata i 3 grup budynków dokładnie na wykrytej płaszczyźnie blatu.

2. NIELINIOWY UKŁAD 3D (${config.buildingLayout}), PROPORCJE POZIOME 9:16 (${config.modelOrientation916}) ORAZ GRUPY 2–5 BUDYNKÓW:
   - Zaimplementuj parametryczny spawner architektoniczny rozmieszczający klastry w układzie nieliniowym "${config.buildingLayout}" (rozrzut osi Z: ${Math.round(config.layoutDepthScatter * 100)}%, poza jedną linią) oraz skalujący bryły ${orientationPL}.
   - W każdym klastrze generuj ${config.buildingsPerGroup} budynków (łącznie ${totalBuildings} obiektów, ${config.buildingFloorCount} kondygnacji) oraz 5 interaktywnych ekranów 3D w stylu "${config.hudScreenStyle}" z obsługą raycastingu na 4 okrągłych przyciskach dolnego paska dokowania.

3. OŚWIETLENIE ŚRODOWISKOWE I OKLUZJA (Environmental Lighting & Depth Occlusion):
   - Podłącz ARCameraManager.frameReceived i odczytuj args.lightEstimation (ambientSphericalHarmonics, mainLightDirection, mainLightColor, averageColorTemperature), aktualizując w czasie rzeczywistym Directional Light, Reflection Probe oraz intensywność emisji hologramu.
   - Aktywuj AROcclusionManager w trybie EnvironmentDepthMode.Best oraz EnvironmentDepthTemporalSmoothing, aby rzeczywiste krawędzie stołu, fotele i filary poprawnie przesłaniały (occlude) hologramowe budynki.

4. EFEKT PARALAKSY 6DoF I REGULACJA RUCHU WAHADŁOWEGO (Prędkość: ${Math.round(config.pendulumSpeed * 100)}%):
   - Zaimplementuj kontroler kamery łączący śledzenie pozycji 6DoF (TrackedPoseDriver) z płynną regulacją ruchu wahadłowego od 0% (pełne zatrzymanie) do 100% oraz wielowarstwowym przesunięciem paralaksy.

5. DYNAMICZNE EFEKTY CZĄSTECZKOWE ZA OKNAMI POMIESZCZENIA (Window Portal VFX):
   - Stwórz system Unity VFX Graph / ParticleSystem generujący ${particlesPL}.
   - Zastosuj bufor szablonowy (Stencil Buffer mask, Stencil Ref = 2) na płaszczyznach okien pomieszczenia (w odległości ~${(config.roomDepthMeters / 2).toFixed(1)}m od centrum stołu), tak aby dynamiczne cząsteczki były widoczne wyłącznie w obrysie za oknami sali.`;
	return {
		visualPromptPL,
		visualPromptEN,
		unitySystemPromptPL
	};
}
/**
* Parses a natural-language AR prompt (PL or EN) and extracts live 3D scene parameters
* (room size, table size, building layout, buildings per group, floor count, 9:16 orientation,
* pendulum speed, parallax depth, frosted glass screens, etc.).
*/
export function parsePromptToConfig(promptText) {
	const parsed = {};
	// 1. Room dimensions (e.g. "salę o wymiarach 21.0m × 18.0m" or "room measuring 21.0m × 18.0m")
	const roomMatch = promptText.match(/(?:sal[ęi]\s+o\s+wymiarach|posadzka\s+pomieszczenia\s*\(|room\s+measuring)\s*(\d+(?:\.\d+)?)m\s*[×x]\s*(\d+(?:\.\d+)?)m/i);
	if (roomMatch) {
		const rw = Math.min(24, Math.max(8, parseFloat(roomMatch[1])));
		const rd = Math.min(20, Math.max(7, parseFloat(roomMatch[2])));
		parsed.roomWidthMeters = rw;
		parsed.roomDepthMeters = rd;
		if (Math.abs(rw - 9) < .3 && Math.abs(rd - 8) < .3) {
			parsed.roomSizePreset = "Kameralny Gabinet (9m × 8m)";
		} else if (Math.abs(rw - 14) < .3 && Math.abs(rd - 12) < .3) {
			parsed.roomSizePreset = "Sala Konferencyjna (14m × 12m)";
		} else if (Math.abs(rw - 22) < .3 && Math.abs(rd - 18) < .3) {
			parsed.roomSizePreset = "Aula Architektoniczna (22m × 18m)";
		} else {
			parsed.roomSizePreset = "Niestandardowy wymiar sali";
		}
	}
	// 2. Table dimensions (e.g. "blatem o wymiarach 5.40m × 2.60m" or "tabletop measuring 5.40m × 2.60m")
	const tableMatch = promptText.match(/(?:blatem\s+o\s+wymiarach|blatu\s+stołu\s*\(|tabletop\s+measuring)\s*(\d+(?:\.\d+)?)m\s*[×x]\s*(\d+(?:\.\d+)?)m/i);
	if (tableMatch) {
		const tw = Math.min(6, Math.max(2, parseFloat(tableMatch[1])));
		const td = Math.min(3.2, Math.max(1.2, parseFloat(tableMatch[2])));
		parsed.tableWidthMeters = tw;
		parsed.tableDepthMeters = td;
		if (Math.abs(tw - 2.6) < .15) {
			parsed.tableSizePreset = "Kompaktowy (2.6m × 1.3m)";
		} else if (Math.abs(tw - 3.9) < .15) {
			parsed.tableSizePreset = "Standardowy Konferencyjny (3.9m × 1.95m)";
		} else if (Math.abs(tw - 5.4) < .15) {
			parsed.tableSizePreset = "Monumentalny Sztabowy (5.4m × 2.6m)";
		} else {
			parsed.tableSizePreset = "Niestandardowy wymiar blatu";
		}
	}
	// 3. Buildings per group (2 to 5)
	const bpgMatch = promptText.match(/(?:po\s+|containing\s+)([2345])\s+(?:budynk|buildings|skyscrapers)/i);
	if (bpgMatch) {
		parsed.buildingsPerGroup = parseInt(bpgMatch[1], 10);
	}
	// 4. Floor count (20 to 140)
	const floorMatch = promptText.match(/(?:do\s+|up\s+to\s+|głębię\s+)(\d{2,3})\s+(?:kondygnacji|pięter|storeys)/i);
	if (floorMatch) {
		parsed.buildingFloorCount = Math.min(140, Math.max(20, parseInt(floorMatch[1], 10)));
	}
	// 5. Building 3D Formation / Layout
	if (/Łuk Amfiteatralny|Półkole 3D|amphitheater/i.test(promptText)) {
		parsed.buildingLayout = "Łuk Amfiteatralny (Półkole 3D)";
	} else if (/Trójkąt Centralny|Układ Delta/i.test(promptText)) {
		parsed.buildingLayout = "Trójkąt Centralny (Układ Delta)";
	} else if (/Układ Diagonalny|Kaskadowy/i.test(promptText)) {
		parsed.buildingLayout = "Układ Diagonalny (Kaskadowy)";
	} else if (/Rozrzut Urbanistyczny|Wielopłaszczyznowy/i.test(promptText)) {
		parsed.buildingLayout = "Rozrzut Urbanistyczny (Wielopłaszczyznowy)";
	} else if (/Linia Klasyczna|Szeregowo/i.test(promptText)) {
		parsed.buildingLayout = "Linia Klasyczna (Szeregowo)";
	}
	// 6. Depth scatter %
	const scatterMatch = promptText.match(/(?:rozrzut\s+głębi\s+3D|depth\s+scatter)\s*:\s*(\d+)%/i);
	if (scatterMatch) {
		parsed.layoutDepthScatter = Math.min(1.5, Math.max(0, parseInt(scatterMatch[1], 10) / 100));
	}
	// 7. Model Orientation 9:16
	if (/hybrydow.*9:16|hybrid\s+9:16/i.test(promptText)) {
		parsed.modelOrientation916 = "Hybrydowy 9:16 (Poziome Skrzydła + Wieże)";
	} else if (/poziom.*9:16|horyzontaln|horizontal\s+9:16/i.test(promptText)) {
		parsed.modelOrientation916 = "Układ Poziomy 9:16 (Horyzontalne Kompleksy)";
	} else if (/pionow|vertical\s+high-rise/i.test(promptText)) {
		parsed.modelOrientation916 = "Pionowe Wieżowce (Klasyczne)";
	}
	// 8. Glass UI Screens (98% Transparent, Frosted Glass, or CAD)
	if (/98%|krystaliczn|Ultra-Clear/i.test(promptText)) {
		parsed.hudScreenStyle = "Szklany Ekran Krystaliczny (98% Przezroczystości)";
		parsed.showFloatingHudPanels = true;
	} else if (/Frosted Glass|szklanych paneli|mleczno-lawendowych/i.test(promptText)) {
		parsed.hudScreenStyle = "Szklany Panel Interaktywny (Frosted Glass UI)";
		parsed.showFloatingHudPanels = true;
	} else if (/CAD\/BIM|Hologram Techniczny CAD/i.test(promptText)) {
		parsed.hudScreenStyle = "Hologram Techniczny CAD (Ciemny Cyjan)";
	}
	// 9. Pendulum speed %
	const pendMatch = promptText.match(/(?:ruch\s+wahadłowy.*prędkość|pendulum.*speed)\s*(\d+)%/i);
	if (pendMatch) {
		parsed.pendulumSpeed = Math.min(1, Math.max(0, parseInt(pendMatch[1], 10) / 100));
	}
	// 10. Parallax intensity %
	const paraMatch = promptText.match(/(?:paralaksy\s+6DoF\s*\(intensywność|parallax.*factor)\s*(\d+(?:\.\d+)?)%?/i);
	if (paraMatch) {
		const val = parseFloat(paraMatch[1]);
		parsed.parallaxIntensity = val > 2 ? val / 100 : val;
	}
	return parsed;
}
/**
* Analizuje aktualnie wpisany tekst promptu oraz bieżący kontekst sceny 3D (ARStudioConfig)
* i zwraca gotowe, kontekstowe podpowiedzi dalszych elementów promptu.
* Elementy, których jeszcze brakuje w tekście promptu, są traktowane priorytetowo jako
* naturalna kontynuacja opisu krok po kroku.
*/
export function getContextualPromptSuggestions(promptText, config) {
	const normalized = promptText.trim();
	const roomW = (config.roomWidthMeters ?? 21).toFixed(1);
	const roomD = (config.roomDepthMeters ?? 18).toFixed(1);
	const tableW = (config.tableWidthMeters ?? 5.4).toFixed(2);
	const tableD = (config.tableDepthMeters ?? 2.6).toFixed(2);
	const totalBuildings = (config.buildingsPerGroup ?? 3) * 3;
	const approxHeightMeters = Math.round((config.buildingFloorCount ?? 86) * 4.2);
	const scatterPct = Math.round((config.layoutDepthScatter ?? .85) * 100);
	const pendulumPct = Math.round((config.pendulumSpeed ?? .15) * 100);
	const parallaxPct = Math.round((config.parallaxIntensity ?? .85) * 100);
	const envLightingPct = Math.round((config.envLightingIntensity ?? 1.2) * 100);
	const hasRoomAndTable = /sal[aię]|wymiar|blat|stoł|tabletop|room/i.test(normalized) && normalized.length > 25;
	const hasNonlinear916 = /9:16|amfiteatraln|nieliniow|kondygnacj|diagrid|BIM/i.test(normalized);
	const hasGlassScreens = /98%|Frosted Glass|szklanych|paneli|ekranów|HUD/i.test(normalized);
	const hasLidarScanning = /LiDAR|ToF|AR Foundation|siatk[aąe]|płaszczyzn|chmur[aąe]\s+punktów|Anchors/i.test(normalized);
	const hasLightingOcclusion = /Light Estimation|PBR|okluzj|Environment Depth|odbi[ćc]|mgł[ayę]|_FogDensity/i.test(normalized);
	const hasCameraParallax = /wahadłow|paralaks|6DoF|pendulum|parallax/i.test(normalized);
	const hasWindowPortal = /Stencil Portal|oknami|cząsteczk|metropoli|zachodzie\s+słońca|pyłu/i.test(normalized);
	const has8kRenderOptics = /8K|physically-based|głębia\s+ostrości|URP|HDRP|DOF/i.test(normalized);
	const rawSuggestions = [
		{
			id: "ctx_room_table",
			stepNumber: "01",
			category: "Architektura Sali i Stół AR",
			title: `Monumentalna Sala (${roomW}m × ${roomD}m) i Lustrzany Stół (${tableW}m × ${tableD}m)`,
			contextReason: hasRoomAndTable ? "Zaktualizuj wymiary sali gotycko-modernistycznej oraz polerowanego blatu stołu konferencyjnego." : "Brak opisu przestrzeni fizycznej — zacznij od zdefiniowania wymiarów sali i lustrzanego stołu ze świetlistą mapą świata.",
			snippetPL: `Przedstawiająca monumentalną salę o wymiarach ${roomW}m × ${roomD}m z klasynymi gotycko-modernistycznymi sklepieniami łukowymi i dużymi panoramicznymi oknami, na środku której znajduje się lustrzany stół konferencyjny z blatem ${tableW}m × ${tableD}m i wyświetlaczem świetlistej mapy świata.`,
			snippetEN: `Depicting a monumental ${roomW}m × ${roomD}m Gothic-modernist arched hall with panoramic windows and a central ${tableW}m × ${tableD}m polished mirror conference table displaying a luminous world map.`,
			isMissingFromPrompt: !hasRoomAndTable,
			configPatch: {
				roomSizePreset: "Niestandardowy wymiar sali",
				tableSizePreset: "Monumentalny Sztabowy (5.4m × 2.6m)"
			}
		},
		{
			id: "ctx_nonlinear_916_bim",
			stepNumber: "02",
			category: "Formacja 3D i Proporcje 9:16",
			title: `${config.buildingLayout.split(" (")[0]} (${totalBuildings} Obiektów, ${config.buildingFloorCount} Pięter, Układ 9:16)`,
			contextReason: hasNonlinear916 ? "Doprecyzuj nieliniowy rozrzut głębi 3D oraz horyzontalne skrzydła 9:16 z detalami konstrukcyjnymi BIM." : "Po opisie stołu dodaj rozmieszczenie 3 zespołów budynków w nieliniowym łuku 3D oraz proporcje poziome 9:16.",
			snippetPL: `Na blacie osadzono w czasie rzeczywistym 3 zespoły architektoniczne rozmieszczone nieliniowo w formacji "${config.buildingLayout}" (rozrzut głębi 3D: ${scatterPct}%, tak aby modele nie stały w jednej linii), liczące po ${config.buildingsPerGroup} budynków w grupie (łącznie ${totalBuildings} obiektów, do ${config.buildingFloorCount} kondygnacji / ~${approxHeightMeters}m) zaprojektowanych w układzie poziomym 9:16 jako półprzezroczyste błękitno-złote hologramy BIM (egzoszkielet diagridowy, stropy kondygnacji, szyby windowe i świetliste rdzenie).`,
			snippetEN: `Anchored in real time on the tabletop are 3 architectural clusters in a non-linear "${config.buildingLayout}" formation (${scatterPct}% 3D depth scatter), with ${config.buildingsPerGroup} buildings per group (${totalBuildings} structures total, up to ${config.buildingFloorCount} floors / ~${approxHeightMeters}m) designed in horizontal 9:16 proportions as translucent cyan-and-gold BIM holograms with diagrid exoskeletons, floor slabs, elevator shafts, and glowing structural cores.`,
			isMissingFromPrompt: !hasNonlinear916,
			configPatch: {
				buildingLayout: "Łuk Amfiteatralny (Półkole 3D)",
				modelOrientation916: "Układ Poziomy 9:16 (Horyzontalne Kompleksy)",
				layoutDepthScatter: Math.max(.75, config.layoutDepthScatter)
			}
		},
		{
			id: "ctx_glass_screens_98",
			stepNumber: "03",
			category: "Szklane Ekrany Interaktywne UI",
			title: config.hudScreenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)" ? "5 Krystalicznych Szklanych Ekranów (98% Przezroczystości)" : "Wariant Krystaliczny 98% Przezroczystości lub Frosted Glass UI",
			contextReason: !hasGlassScreens ? "Wokół budynków brakuje jeszcze opisu unoszących się interaktywnych ekranów szklanych z telemetrią BIM." : config.hudScreenStyle !== "Szklany Ekran Krystaliczny (98% Przezroczystości)" ? "Kontekstowa podpowiedź: wzbogać scenę o ultraprzejrzyste szklane ekrany przezroczyste w 98% (2% krycia tafli)." : "Doprecyzuj parametry optyczne 5 ekranów o 98% przezroczystości z dolnym dokiem 4 przycisków.",
			snippetPL: `Wokół budynków unoszą się 5 ultraprzejrzystych, krystalicznych szklanych ekranów interaktywnych przezroczystych w 98% (Ultra-Clear 98% Transparent Optical Glass UI, zaledwie 2% subtelnego połysku tafli, bez mlecznego zamglenia) z ostrymi białymi mikrokrawędziami świetlnymi, błękitno-indygo telemetrią BIM oraz dolnym paskiem dokowania z 4 okrągłymi przyciskami funkcyjnymi.`,
			snippetEN: `Floating around the towers are 5 ultra-clear 98% transparent optical crystal glass interactive screens (only 2% surface sheen, zero milky haze) featuring crisp white micro-rim highlights, cyan-indigo BIM telemetry typography, and a bottom dock with 4 circular action buttons.`,
			isMissingFromPrompt: !hasGlassScreens,
			configPatch: {
				showFloatingHudPanels: true,
				hudScreenStyle: "Szklany Ekran Krystaliczny (98% Przezroczystości)"
			}
		},
		{
			id: "ctx_glass_screens_frosted",
			stepNumber: "03B",
			category: "Szklane Ekrany Interaktywne UI",
			title: "5 Mleczno-Lawendowych Paneli Szklanych (Frosted Glass UI)",
			contextReason: "Alternatywny wariant materiałowy ze szronionym szkłem akrylowym, zaokrągloną białą ramką i fioletowo-indygo typografią.",
			snippetPL: `Wokół budynków unoszą się 5 półprzezroczystych, mleczno-lawendowych szklanych paneli interaktywnych (Frosted Glass UI) z zaokrąglonymi białymi krawędziami świetlnymi, fioletowo-indygo typografią i dolnym paskiem dokowania z 4 okrągłymi przyciskami funkcyjnymi.`,
			snippetEN: `Floating around the buildings are 5 translucent milky-lavender frosted glass interactive UI panels with glowing white rounded borders, violet-indigo typography, and a bottom dock bar with 4 circular buttons.`,
			isMissingFromPrompt: false,
			configPatch: {
				showFloatingHudPanels: true,
				hudScreenStyle: "Szklany Panel Interaktywny (Frosted Glass UI)"
			}
		},
		{
			id: "ctx_lidar_planes_pointcloud",
			stepNumber: "04",
			category: "Czujniki Głębi LiDAR i AR Foundation",
			title: "Detekcja Płaszczyzn Blatu i Posadzki + Chmura Punktów LiDAR",
			contextReason: !hasLidarScanning ? "Dodaj warstwę śledzenia przestrzennego: rozpoznawanie blatu i podłogi przez czujnik LiDAR/ToF oraz kotwice AR Anchors." : "Rozwiń opis o aktywną chmurę punktów (Point Cloud Visualization) i klasyfikację wysokości blatu stołu.",
			snippetPL: `Powierzchnia blatu stołu (${tableW}m × ${tableD}m) oraz posadzka pomieszczenia (${roomW}m × ${roomD}m) są aktywnie rozpoznawane przez czujniki głębi LiDAR/ToF w Unity AR Foundation (${config.arFramework}) z widoczną siatką detekcji płaszczyzn (surface plane detection grid), wizualizacją chmury punktów skanowania (point cloud visualization) oraz precyzyjnym zakotwiczeniem zespołów budynków (AR Anchors).`,
			snippetEN: `Both the ${tableW}m × ${tableD}m tabletop and the ${roomW}m × ${roomD}m floor surface are actively tracked by LiDAR/ToF depth sensors via Unity AR Foundation (${config.arFramework}) with a visible surface plane detection grid, live LiDAR point cloud visualization, and precision AR Anchors.`,
			isMissingFromPrompt: !hasLidarScanning,
			configPatch: { showDepthGrid: true }
		},
		{
			id: "ctx_lighting_occlusion",
			stepNumber: "05",
			category: "Oświetlenie PBR, Mgła Atmosferyczna i Okluzja",
			title: "Environmental Light Estimation, Mgła Atmosferyczna i Okluzja Głębi",
			contextReason: !hasLightingOcclusion ? "Kolejny naturalny krok: opisz realistyczne odbicia hologramów w polerowanym blacie, mgłę atmosferyczną oraz okluzję obiektów rzeczywistych." : "Wzmocnij realizm fizyczny PBR (natężenie odbić na blacie, mgłę atmosferyczną _FogDensity oraz wygładzanie mapy głębi).",
			snippetPL: `Scena wykorzystuje zaawansowane oświetlenie środowiskowe (Environmental Light Estimation, lustrzane odbicia PBR hologramów na polerowanym blacie stołu o natężeniu ${envLightingPct}%), wolumetryczny efekt mgły atmosferycznej (_FogDensity) oraz okluzję głębi w czasie rzeczywistym (${config.occlusionMode}) z wygładzaniem temporalnym krawędzi.`,
			snippetEN: `The scene leverages Environmental Light Estimation with physically-based mirror reflections (${envLightingPct}% intensity) across the polished tabletop, volumetric atmospheric fog attenuation (_FogDensity), and real-time ${config.occlusionMode} depth occlusion with temporal edge smoothing.`,
			isMissingFromPrompt: !hasLightingOcclusion,
			configPatch: {
				envLightingIntensity: Math.max(1.2, config.envLightingIntensity),
				enableAtmosphericFog: true
			}
		},
		{
			id: "ctx_camera_parallax_6dof",
			stepNumber: "06",
			category: "Ruch Kamery i Paralaksa 6DoF",
			title: `Ruch Wahadłowy Kamery (${pendulumPct}%) i Głęboka Paralaksa 6DoF (${parallaxPct}%)`,
			contextReason: !hasCameraParallax ? "Dodaj opis kinematografii AR: płynny ruch wahadłowy kamery oraz wielowarstwowy efekt paralaksy 6DoF." : "Dostosuj w prompcie dokładną prędkość wahadła kamery oraz siłę głębi paralaksy 6DoF.",
			snippetPL: `Zastosuj płynnie regulowany ruch wahadłowy kamery (prędkość ${pendulumPct}%) oraz głęboki efekt paralaksy 6DoF (intensywność ${parallaxPct}%), odsłaniający wielowarstwową głębię ${config.buildingFloorCount} kondygnacji, szybów windowych i szklanych ekranów interaktywnych.`,
			snippetEN: `Apply a smoothly regulated camera pendulum motion (${pendulumPct}% speed) combined with deep 6DoF motion parallax (${parallaxPct}% intensity), revealing the multi-layered depth of all ${config.buildingFloorCount} floors, elevator cores, and floating glass screens.`,
			isMissingFromPrompt: !hasCameraParallax,
			configPatch: { parallaxIntensity: Math.max(.85, config.parallaxIntensity) }
		},
		{
			id: "ctx_window_stencil_portal",
			stepNumber: "07",
			category: "Portal Okienny i Atmosfera",
			title: "Efekty Cząsteczkowe za Oknami i Maska Głębi (Stencil Portal)",
			contextReason: !hasWindowPortal ? "Wzbogać tło za łukowymi oknami o cząsteczki świetlnego pyłu i ruch powietrzny metropolii odseparowany maską Stencil Portal." : "Rozbuduj opis atmosfery za panoramicznymi oknami o wolumetryczne smugi zachodu słońca.",
			snippetPL: `Za łukowymi oknami pomieszczenia dodaj dynamiczne efekty cząsteczkowe unoszącego się pyłu świetlnego, cząstek atmosferycznych oraz świetlistych strumieni ruchu powietrznego futurystycznej metropolii o zachodzie słońca (${config.windowParticles}), odseparowane maską głębi (Stencil Portal).`,
			snippetEN: `Behind the arched panoramic windows, render dynamic volumetric dust motes, atmospheric particles, and glowing aerial traffic streams of a futuristic sunset metropolis (${config.windowParticles}), masked cleanly via a GPU Stencil Portal.`,
			isMissingFromPrompt: !hasWindowPortal,
			configPatch: { windowParticleDensity: Math.max(1, config.windowParticleDensity) }
		},
		{
			id: "ctx_8k_urp_optics",
			stepNumber: "08",
			category: "Finalizacja Renderu 8K",
			title: `Domknięcie Promptu: Rozdzielczość 8K, ${config.renderPipeline}, Kinowa Głębia Ostrości`,
			contextReason: !has8kRenderOptics ? "Domknij prompt parametrami jakości produkcyjnej: rozdzielczość 8K, PBR, kinowy bokeh i mikrodetale BIM." : "Podkreśl kinową optykę obiektywu, aberrację chromatyczną na krawędziach hologramów i precyzję BIM.",
			snippetPL: `Wyrenderowano w silniku ${config.renderPipeline} w rozdzielczości 8K, physically-based rendering (PBR), kinowa głębia ostrości (shallow DoF bokeh), fotorealistyczne mikrodetale konstrukcyjne BIM i brak artefaktów kompresji.`,
			snippetEN: `Rendered in ${config.renderPipeline} at 8K resolution, physically-based rendering (PBR), cinematic shallow depth of field bokeh, ultra-crisp structural BIM micro-details, photorealistic spatial computing aesthetics.`,
			isMissingFromPrompt: !has8kRenderOptics
		}
	];
	// Sort: missing elements from the current prompt text come first in logical order
	const sorted = [...rawSuggestions].sort((a, b) => {
		if (a.isMissingFromPrompt !== b.isMissingFromPrompt) {
			return a.isMissingFromPrompt ? -1 : 1;
		}
		return a.stepNumber.localeCompare(b.stepNumber);
	});
	let markedFirstMissing = false;
	return sorted.map((item) => {
		const isRecommendedNext = item.isMissingFromPrompt && !markedFirstMissing;
		if (isRecommendedNext) {
			markedFirstMissing = true;
		}
		return {
			...item,
			isRecommendedNext
		};
	});
}
export const PROMPT_ANATOMY_LAYERS = [
	{
		id: "layer_hologram",
		number: "01",
		title: "Modele Hologramowe i Detale Architektoniczne BIM",
		purpose: "Definiuje strukturę geometryczną wieżowców (egzoszkielet diagridowy, rdzenie, stropy) oraz właściwości optyczne shadera hologramu.",
		polishSnippet: "trójwymiarowe modele futurystycznych wieżowców wyświetlane w czasie rzeczywistym jako półprzezroczyste błękitno-złote hologramy z detalami architektonicznymi BIM: zewnętrzną kratownicą diagridową, stropami kondygnacji, rdzeniem konstrukcyjnym i bocznymi panelami HUD",
		englishSnippet: "real-time 3D futuristic skyscrapers rendered as translucent cyan-and-gold architectural BIM holograms with intricate parametric diagrid exoskeletons, internal floor slabs, structural cores, and floating glass HUD panels",
		unityComponent: "Custom URP Hologram Shader (Fresnel + World-Space Scanlines + Additive Core Pass)"
	},
	{
		id: "layer_planes",
		number: "02",
		title: "Rozpoznawanie Płaszczyzn Blatu i Podłogi (Czujniki Głębi)",
		purpose: "Instruuje model/silnik, aby użył skanera LiDAR/ToF do rozróżnienia wysokości blatu stołu od podłogi i osadził obiekty na stabilnych kotwicach.",
		polishSnippet: "powierzchnie blatu stołu oraz podłogi są aktywnie rozpoznawane przez czujniki głębi (LiDAR / ToF) z widoczną siatką detekcji płaszczyzn (surface plane detection mesh) i precyzyjnym osadzeniem obiektów na kotwicach przestrzennych",
		englishSnippet: "tabletop and floor surfaces are actively recognized by hardware depth sensors (LiDAR / ToF) displaying a calibrated surface plane detection mesh for accurate spatial anchor placement",
		unityComponent: "ARPlaneManager (HorizontalUp) + ARRaycastManager + ARAnchorManager + Height Classifier"
	},
	{
		id: "layer_frameworks",
		number: "03",
		title: "Frameworki ARKit / ARCore i Silnik Unity (URP/HDRP)",
		purpose: "Określa stos technologiczny zapewniający natywne śledzenie SLAM 6DoF, siatkowanie przestrzeni i fizyczne renderowanie.",
		polishSnippet: "przy użyciu frameworków Apple ARKit 6 oraz Google ARCore Depth API z obsługą planów powierzchni (AR Foundation) wewnątrz silnika Unity URP w czasie rzeczywistym",
		englishSnippet: "powered by Apple ARKit 6 and Google ARCore Depth API with surface plane tracking via Unity AR Foundation in Universal Render Pipeline (URP)",
		unityComponent: "XROrigin + ARSession + UniversalRenderPipelineAsset (HDR + Bloom)"
	},
	{
		id: "layer_lighting_occlusion",
		number: "04",
		title: "Oświetlenie Środowiskowe i Okluzja Głębi",
		purpose: "Sprawia, że hologram reaguje na światło z okien sali, rzuca odbicia na blat i jest realistycznie zasłaniany przez bliższe meble.",
		polishSnippet: "ze wsparciem dla estymacji oświetlenia środowiskowego (odbicia PBR na polerowanym blacie, harmoniki sferyczne) oraz okluzji głębi w czasie rzeczywistym, gdzie fotele i obiekty pierwszoplanowe naturalnie przesłaniają hologram",
		englishSnippet: "with real-time environmental light estimation (spherical harmonics, specular tabletop reflections) and hardware depth occlusion where foreground chairs accurately mask the hologram",
		unityComponent: "ARCameraManager.frameReceived + AROcclusionManager (EnvironmentDepthMode.Best)"
	},
	{
		id: "layer_parallax",
		number: "05",
		title: "Głębia Obrazu i Efekt Paralaksy w Ruchu (6DoF)",
		purpose: "Wymusza wieloplanowość sceny podczas poruszania urządzeniem wokół stołu (przesunięcie kątowe między pierwszym planem, rdzeniem wież i tłem).",
		polishSnippet: "utwórz wyraźny efekt paralaksy 6DoF pozwalający na uzyskanie wielowarstwowej głębi obrazu i perspektywy podczas poruszania urządzeniem wokół modelu architektonicznego",
		englishSnippet: "create pronounced 6DoF motion parallax delivering multi-plane spatial depth between internal building cores, floating HUDs, and background arches as the device moves around the model",
		unityComponent: "TrackedPoseDriver (6DoF) + Tangent-Space Parallax Offset Shader + Gyro Smoothing"
	},
	{
		id: "layer_window_particles",
		number: "06",
		title: "Dynamiczne Efekty Cząsteczkowe Za Oknami Pomieszczenia",
		purpose: "Dodaje żywą warstwę atmosferyczną za łukowymi oknami (odseparowaną maską głębi/szablonu), nie zaśmiecając wnętrza nad stołem.",
		polishSnippet: "bezpośrednio za łukowymi oknami pomieszczenia dodaj dynamiczne efekty cząsteczkowe (świetlisty pył atmosferyczny, smugi ruchu powietrznego i strumienie danych) osadzone w głębi sceny zewnętrznej przez maskę portalu okiennego",
		englishSnippet: "directly outside the arched room windows, add dynamic volumetric particle effects (atmospheric light spores and aerial streams) masked via stencil window portals in the background depth",
		unityComponent: "Unity VFX Graph / ParticleSystem + Stencil Buffer Window Portal Mask (Ref 2, Comp Equal)"
	}
];
export const UNITY_CODE_SCRIPTS = [
	{
		id: "plane_placement",
		filename: "ARSurfacePlanePlacement.cs",
		title: "1. Detekcja Blatu i Podłogi + Osadzanie Modeli (ARKit / ARCore)",
		description: "Rozpoznaje płaszczyzny poziome z czujników głębi, rozróżnia wysokość blatu stołu od podłogi pomieszczenia i kotwiczy hologram architektoniczny (ARAnchor).",
		language: "csharp",
		code: `using System.Collections.Generic;
using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

[RequireComponent(typeof(ARPlaneManager), typeof(ARRaycastManager), typeof(ARAnchorManager))]
public class ARSurfacePlanePlacement : MonoBehaviour
{
    [Header("Prefaby Architektoniczne AR")]
    [SerializeField] private GameObject holographicCityTablePrefab;
    [SerializeField] private Material tabletopGridMaterial;
    [SerializeField] private Material floorGridMaterial;

    [Header("Klasyfikacja Wysokości (Czujnik Głębi)")]
    [Tooltip("Różnica wysokości Y względem najniższej wykrytej podłogi uznawana za blat stołu (w metrach)")]
    [SerializeField] private float minTableElevationAboveFloor = 0.55f;
    [SerializeField] private float maxTableElevationAboveFloor = 1.15f;

    private ARPlaneManager _planeManager;
    private ARRaycastManager _raycastManager;
    private ARAnchorManager _anchorManager;

    private float _lowestFloorY = float.MaxValue;
    private ARAnchor _spawnedCityAnchor;
    private GameObject _spawnedCityInstance;
    private static readonly List<ARRaycastHit> Hits = new();

    private void Awake()
    {
        _planeManager = GetComponent<ARPlaneManager>();
        _raycastManager = GetComponent<ARRaycastManager>();
        _anchorManager = GetComponent<ARAnchorManager>();

        // Wymuszamy detekcję płaszczyzn poziomych (blaty i podłogi) oraz pionowych (okna)
        _planeManager.requestedDetectionMode = PlaneDetectionMode.Horizontal | PlaneDetectionMode.Vertical;
    }

    private void OnEnable() => _planeManager.planesChanged += OnPlanesChanged;
    private void OnDisable() => _planeManager.planesChanged -= OnPlanesChanged;

    private void OnPlanesChanged(ARPlanesChangedEventArgs args)
    {
        // 1. Wyznacz poziom podłogi (najniższa płaszczyzna pozioma)
        foreach (var plane in _planeManager.trackables)
        {
            if (plane.alignment == PlaneAlignment.HorizontalUp)
            {
                if (plane.transform.position.y < _lowestFloorY)
                    _lowestFloorY = plane.transform.position.y;
            }
        }

        // 2. Klasyfikuj płaszczyzny na Blat Stołu (Tabletop) oraz Podłogę (Floor)
        foreach (var plane in _planeManager.trackables)
        {
            if (plane.alignment != PlaneAlignment.HorizontalUp) continue;

            float heightAboveFloor = plane.transform.position.y - _lowestFloorY;
            bool isTabletop = plane.classification == PlaneClassification.Table ||
                              (heightAboveFloor >= minTableElevationAboveFloor &&
                               heightAboveFloor <= maxTableElevationAboveFloor);

            var meshRenderer = plane.GetComponent<MeshRenderer>();
            if (meshRenderer != null)
            {
                meshRenderer.sharedMaterial = isTabletop ? tabletopGridMaterial : floorGridMaterial;
            }

            // Automatyczne osadzenie makiety na rozpoznanym blacie stołu o wystarczającej powierzchni
            if (_spawnedCityInstance == null && isTabletop && plane.extents.x > 0.6f && plane.extents.y > 0.4f)
            {
                PlaceHologramOnPlane(plane, plane.center);
            }
        }
    }

    public void TryPlaceByScreenTap(Vector2 screenPosition)
    {
        if (_raycastManager.Raycast(screenPosition, Hits, TrackableType.PlaneWithinPolygon))
        {
            var hit = Hits[0];
            var plane = _planeManager.GetPlane(hit.trackableId);
            if (plane != null && plane.alignment == PlaneAlignment.HorizontalUp)
            {
                PlaceHologramOnPlane(plane, hit.pose.position);
            }
        }
    }

    private void PlaceHologramOnPlane(ARPlane targetPlane, Vector3 worldPosition)
    {
        Pose placementPose = new Pose(worldPosition, Quaternion.identity);
        _spawnedCityAnchor = _anchorManager.AttachAnchor(targetPlane, placementPose);

        if (_spawnedCityAnchor != null)
        {
            if (_spawnedCityInstance == null)
                _spawnedCityInstance = Instantiate(holographicCityTablePrefab, _spawnedCityAnchor.transform);
            else
                _spawnedCityInstance.transform.SetParent(_spawnedCityAnchor.transform, false);
        }
    }
}`
	},
	{
		id: "lighting_occlusion",
		filename: "EnvironmentLightingAndOcclusion.cs",
		title: "2. Oświetlenie Środowiskowe i Okluzja Głębi (ARKit LiDAR / ARCore Depth)",
		description: "Synchronizuje oświetlenie sceny Unity z kamerą AR (Spherical Harmonics, temperatura barwowa, envLightingIntensity) oraz uruchamia sprzętową okluzję głębi.",
		language: "csharp",
		code: `using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

[RequireComponent(typeof(ARCameraManager), typeof(AROcclusionManager))]
public class EnvironmentLightingAndOcclusion : MonoBehaviour
{
    [Header("Odnośniki Oświetlenia Sceny")]
    [SerializeField] private Light environmentDirectionalLight;
    [SerializeField] private ReflectionProbe tableReflectionProbe;
    [SerializeField] private Material[] hologramMaterials;

    [Header("Ustawienia Środowiska (Synchronizacja z ARStudioConfig)")]
    [SerializeField, Range(0.5f, 2.0f)] private float envLightingIntensity = 1.20f;

    private ARCameraManager _cameraManager;
    private AROcclusionManager _occlusionManager;
    private float _lastEstimatedBrightness = 1.0f;
    private static readonly int EnvBrightnessId = Shader.PropertyToID("_EnvBrightness");

    private void Awake()
    {
        _cameraManager = GetComponent<ARCameraManager>();
        _occlusionManager = GetComponent<AROcclusionManager>();

        // Aktywacja czujników głębi dla okluzji obiektów rzeczywistych (fotele, krawędź stołu, dłonie)
        _occlusionManager.requestedEnvironmentDepthMode = EnvironmentDepthMode.Best;
        _occlusionManager.environmentDepthTemporalSmoothingRequested = true;
        _occlusionManager.requestedOcclusionPreferenceMode = OcclusionPreferenceMode.PreferEnvironmentOcclusion;
    }

    private void OnEnable() => _cameraManager.frameReceived += OnCameraFrameReceived;
    private void OnDisable() => _cameraManager.frameReceived -= OnCameraFrameReceived;

    /// <summary>
    /// Dynamicznie aktualizuje mnożnik natężenia oświetlenia otoczenia (zakres 0.5 - 2.0)
    /// przekazywany z suwaka 'Intensywność Oświetlenia Otoczenia' w ARStudioConfig.
    /// </summary>
    public void SetEnvLightingIntensity(float intensity)
    {
        envLightingIntensity = Mathf.Clamp(intensity, 0.5f, 2.0f);
        if (environmentDirectionalLight != null)
        {
            environmentDirectionalLight.intensity = _lastEstimatedBrightness * envLightingIntensity;
        }
    }

    private void OnCameraFrameReceived(ARCameraFrameEventArgs args)
    {
        ARLightEstimationData lightData = args.lightEstimation;

        // 1. Natężenie światła otoczenia i dynamiczna modyfikacja environmentDirectionalLight przez envLightingIntensity
        if (lightData.averageBrightness.HasValue)
        {
            float brightness = Mathf.Clamp(lightData.averageBrightness.Value, 0.25f, 2.0f);
            _lastEstimatedBrightness = brightness;
            environmentDirectionalLight.intensity = brightness * envLightingIntensity;

            foreach (var mat in hologramMaterials)
                mat.SetFloat(EnvBrightnessId, brightness * envLightingIntensity);
        }

        // 2. Temperatura barwowa i kolor głównego źródła światła z okien
        if (lightData.averageColorTemperature.HasValue)
            environmentDirectionalLight.colorTemperature = lightData.averageColorTemperature.Value;

        if (lightData.mainLightColor.HasValue)
            environmentDirectionalLight.color = lightData.mainLightColor.Value;

        // 3. Kierunek padania światła (np. zachód słońca za łukowymi oknami)
        if (lightData.mainLightDirection.HasValue)
            environmentDirectionalLight.transform.rotation = Quaternion.LookRotation(lightData.mainLightDirection.Value);

        // 4. Harmoniki sferyczne dla realistycznych odbić PBR na blacie
        if (lightData.ambientSphericalHarmonics.HasValue)
        {
            RenderSettings.ambientMode = AmbientMode.Skybox;
            RenderSettings.ambientProbe = lightData.ambientSphericalHarmonics.Value;
        }
    }
}`
	},
	{
		id: "parallax_controller",
		filename: "ParallaxCameraRigController.cs",
		title: "3. Efekt Paralaksy 6DoF i Głębia Wieloplanowa",
		description: "Przekazuje wektor ruchu urządzenia 6DoF wokół stołu do warstw wewnętrznych budynków oraz wiszących paneli HUD, budując głębię stereoskopową.",
		language: "csharp",
		code: `using UnityEngine;

public class ParallaxCameraRigController : MonoBehaviour
{
    [Header("Konfiguracja Paralaksy Wokół Modelu")]
    [SerializeField] private Transform arCameraTransform;
    [SerializeField] private Transform tableCenterAnchor;
    [SerializeField, Range(0f, 1.5f)] private float parallaxStrength = 0.85f;
    [SerializeField] private float smoothingSpeed = 8.0f;

    [Header("Warstwy Głębi (Pływające Panele HUD i Rdzenie BIM)")]
    [SerializeField] private Transform[] floatingHudPanels;
    [SerializeField] private Transform[] buildingInnerCores;
    [SerializeField] private Material[] parallaxHologramMaterials;

    private Vector3[] _initialHudLocalPositions;
    private Vector3 _smoothedViewOffset;
    private static readonly int ViewParallaxOffsetId = Shader.PropertyToID("_ParallaxViewOffset");

    private void Start()
    {
        _initialHudLocalPositions = new Vector3[floatingHudPanels.Length];
        for (int i = 0; i < floatingHudPanels.Length; i++)
            _initialHudLocalPositions[i] = floatingHudPanels[i].localPosition;
    }

    private void LateUpdate()
    {
        if (arCameraTransform == null || tableCenterAnchor == null) return;

        // Oblicz znormalizowany wektor przemieszczenia urządzenia względem centrum makiety
        Vector3 worldOffset = arCameraTransform.position - tableCenterAnchor.position;
        Vector3 localViewOffset = tableCenterAnchor.InverseTransformDirection(worldOffset);

        _smoothedViewOffset = Vector3.Lerp(
            _smoothedViewOffset,
            localViewOffset * parallaxStrength,
            Time.deltaTime * smoothingSpeed
        );

        // 1. Subtelna paralaksa przestrzenna bocznych ekranów hologramowych (HUD)
        for (int i = 0; i < floatingHudPanels.Length; i++)
        {
            if (floatingHudPanels[i] == null) continue;
            float depthLayerFactor = (i % 2 == 0) ? 0.08f : -0.06f;
            floatingHudPanels[i].localPosition = _initialHudLocalPositions[i] +
                new Vector3(_smoothedViewOffset.x * depthLayerFactor, _smoothedViewOffset.y * 0.04f, 0f);
        }

        // 2. Przekazanie wektora kamery do shadera w celu przesunięcia wewnętrznej siatki BIM
        foreach (var mat in parallaxHologramMaterials)
        {
            if (mat != null)
                mat.SetVector(ViewParallaxOffsetId, _smoothedViewOffset);
        }
    }
}`
	},
	{
		id: "hologram_window_shader",
		filename: "HologramDiagridAndWindowPortal.hlsl",
		title: "4. Shader Hologramu Architektonicznego + Portal Cząsteczek Za Oknami",
		description: "Shader URP łączący siatkę konstrukcyjną diagrid z efektem Fresnela, zanikaniem na blacie (Depth Fade) oraz maską Stencil dla cząsteczek za oknami.",
		language: "hlsl",
		code: `Shader "HoloArch/URP_ArchitecturalHologram"
{
    Properties
    {
        _MainColor ("Kolor Cyjanowy Siatki", Color) = (0.05, 0.82, 1.0, 1.0)
        _CoreColor ("Kolor Rdzenia Złotego", Color) = (1.0, 0.72, 0.22, 1.0)
        _DiagridScale ("Gęstość Kratownicy Diagrid", Float) = 18.0
        _FresnelPower ("Ostrość Krawędzi Fresnela", Range(0.5, 6.0)) = 2.4
        _ScanlineSpeed ("Prędkość Skanowania Pionowego", Float) = 1.6
        _IntersectionFade ("Miękkie Osadzenie Na Blacie", Range(0.01, 0.5)) = 0.12
        _FogDensity ("Gęstość Mgły Atmosferycznej", Range(0.0, 0.25)) = 0.065
    }
    SubShader
    {
        Tags { "RenderType"="Transparent" "Queue"="Transparent" "RenderPipeline"="UniversalPipeline" }
        Blend SrcAlpha One // Additive Holographic Glow
        ZWrite Off
        Cull Back

        Pass
        {
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/DeclareDepthTexture.hlsl"

            struct Attributes
            {
                float4 positionOS : POSITION;
                float3 normalOS   : NORMAL;
                float2 uv         : TEXCOORD0;
            };

            struct Varyings
            {
                float4 positionCS : SV_POSITION;
                float3 positionWS : TEXCOORD0;
                float3 normalWS   : TEXCOORD1;
                float2 uv         : TEXCOORD2;
                float4 screenPos  : TEXCOORD3;
            };

            float4 _MainColor;
            float4 _CoreColor;
            float _DiagridScale;
            float _FresnelPower;
            float _ScanlineSpeed;
            float _IntersectionFade;
            float _FogDensity;
            float3 _ParallaxViewOffset;

            Varyings vert(Attributes IN)
            {
                Varyings OUT;
                OUT.positionWS = TransformObjectToWorld(IN.positionOS.xyz);
                OUT.positionCS = TransformWorldToHClip(OUT.positionWS);
                OUT.normalWS = TransformObjectToWorldNormal(IN.normalOS);
                // Dodanie przesunięcia paralaksy dla głębi wewnętrznych kondygnacji
                OUT.uv = IN.uv + _ParallaxViewOffset.xy * 0.035;
                OUT.screenPos = ComputeScreenPos(OUT.positionCS);
                return OUT;
            }

            half4 frag(Varyings IN) : SV_Target
            {
                float3 cameraOffsetWS = GetCameraPositionWS() - IN.positionWS;
                float cameraDistance = length(cameraOffsetWS);
                float3 viewDirWS = SafeNormalize(cameraOffsetWS);
                float fresnel = pow(1.0 - saturate(dot( normalize(IN.normalWS), viewDirWS )), _FresnelPower);

                // Proceduralna krata architektoniczna Diagrid + stropy kondygnacji
                float2 gridUV = IN.uv * _DiagridScale;
                float diag1 = abs(frac(gridUV.x + gridUV.y) - 0.5);
                float diag2 = abs(frac(gridUV.x - gridUV.y) - 0.5);
                float floorSlab = abs(frac(gridUV.y * 2.0) - 0.5);
                float lattice = smoothstep(0.06, 0.01, min(min(diag1, diag2), floorSlab));

                // Fala skanowania w przestrzeni świata
                float scanline = 0.65 + 0.35 * sin(IN.positionWS.y * 24.0 - _Time.y * _ScanlineSpeed);

                // Miękkie stykanie z rozpoznaną płaszczyzną blatu stołu
                float2 screenUV = IN.screenPos.xy / IN.screenPos.w;
                float sceneDepth = LinearEyeDepth(SampleSceneDepth(screenUV), _ZBufferParams);
                float partZ = IN.screenPos.w;
                float contactGlow = 1.0 - saturate((sceneDepth - partZ) / _IntersectionFade);

                // Obliczenie tłumienia wykładniczej mgły atmosferycznej na podstawie parametru _FogDensity
                float fogAttenuation = exp2(-pow(cameraDistance * _FogDensity, 2.0));
                float3 atmosphericFogColor = float3(0.03, 0.07, 0.12);

                float3 finalRGB = lerp(_CoreColor.rgb, _MainColor.rgb, fresnel + lattice * 0.7) * scanline;
                finalRGB += _MainColor.rgb * contactGlow * 1.4;
                finalRGB = lerp(atmosphericFogColor, finalRGB, saturate(fogAttenuation));
                float alpha = saturate((fresnel * 0.75 + lattice * 0.85 + contactGlow) * 0.9 * saturate(fogAttenuation + 0.25));

                return half4(finalRGB, alpha);
            }
            ENDHLSL
        }
    }
}`
	}
];
/**
* Zwraca listę skryptów Unity C# / HLSL z dynamicznie wstrzykniętymi parametrami
* z aktualnej konfiguracji ARStudioConfig (w tym envLightingIntensity, parallaxIntensity i _FogDensity).
*/
export function getUnityScriptsWithConfig(config) {
	const envLightStr = (config.envLightingIntensity ?? 1.2).toFixed(2);
	const parallaxStr = (config.parallaxIntensity ?? .85).toFixed(2);
	const fogDensityStr = config.enableAtmosphericFog ? "0.065" : "0.000";
	return UNITY_CODE_SCRIPTS.map((script) => {
		if (script.id === "lighting_occlusion") {
			return {
				...script,
				code: script.code.replace("private float envLightingIntensity = 1.20f;", `private float envLightingIntensity = ${envLightStr}f;`)
			};
		}
		if (script.id === "parallax_controller") {
			return {
				...script,
				code: script.code.replace("private float parallaxStrength = 0.85f;", `private float parallaxStrength = ${parallaxStr}f;`)
			};
		}
		if (script.id === "hologram_window_shader") {
			return {
				...script,
				code: script.code.replace("_FogDensity (\"Gęstość Mgły Atmosferycznej\", Range(0.0, 0.25)) = 0.065", `_FogDensity ("Gęstość Mgły Atmosferycznej", Range(0.0, 0.25)) = ${fogDensityStr}`)
			};
		}
		return script;
	});
}

//# sourceMappingURL=data:application/json;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNHUjtBQUNGOzs7OztBQU1BLE9BQU8sU0FBUywwQkFDZCxRQUNtQjtDQUNuQixNQUFNLGVBQWUsT0FBTyx3QkFBd0IsSUFBRyxDQUFFLFFBQVEsQ0FBQztDQUNsRSxNQUFNLGVBQWUsT0FBTyxxQkFBcUIsSUFBSSxDQUFFLFFBQVEsQ0FBQztDQUNoRSxNQUFNLGdCQUFnQixPQUFPLHVCQUF1QixVQUFVO0NBRTlELE9BQU8sbUJBQW1CLEtBQUssV0FBVztFQUN4QyxJQUFJLE9BQU8sT0FBTyxzQkFBc0I7R0FDdEMsT0FBTztJQUNMLEdBQUc7SUFDSCxNQUFNLE9BQU8sS0FBSyxRQUNoQiwrQ0FDQSx3Q0FBd0MsWUFBWSxHQUN0RDtHQUNGO0VBQ0Y7RUFDQSxJQUFJLE9BQU8sT0FBTyx1QkFBdUI7R0FDdkMsT0FBTztJQUNMLEdBQUc7SUFDSCxNQUFNLE9BQU8sS0FBSyxRQUNoQiwyQ0FDQSxvQ0FBb0MsWUFBWSxHQUNsRDtHQUNGO0VBQ0Y7RUFDQSxJQUFJLE9BQU8sT0FBTywwQkFBMEI7R0FDMUMsT0FBTztJQUNMLEdBQUc7SUFDSCxNQUFNLE9BQU8sS0FBSyxRQUNoQiwyRUFDQSxtRUFBbUUsZUFDckU7R0FDRjtFQUNGO0VBQ0EsT0FBTztDQUNULENBQUM7QUFDSCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJwcm9tcHRUZW1wbGF0ZXMudHMiXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQVJTdHVkaW9Db25maWcsXG4gIEJ1aWxkaW5nQ2x1c3RlcklkLFxuICBCdWlsZGluZ1RlbGVtZXRyeSxcbiAgUHJvbXB0TGF5ZXJCcmVha2Rvd24sXG4gIFVuaXR5Q29kZVNjcmlwdCxcbn0gZnJvbSAnLi4vdHlwZXMvYXJTdHVkaW8nO1xuXG5leHBvcnQgY29uc3QgQlVJTERJTkdfVEVMRU1FVFJZOiBSZWNvcmQ8QnVpbGRpbmdDbHVzdGVySWQsIEJ1aWxkaW5nVGVsZW1ldHJ5PiA9IHtcbiAgYWxwaGFfc3BpcmU6IHtcbiAgICBpZDogJ2FscGhhX3NwaXJlJyxcbiAgICBuYW1lOiAnS29tcGxla3MgQWxwaGEgU3BpcmUgKFphY2hvZG5pKScsXG4gICAgc3VidGl0bGU6ICdTa3LEmWNhbmEgd2llxbxhIHBhcmFtZXRyeWN6bmEgeiBwb2R3w7NqbnltIGVnem9zemtpZWxldGVtIGRpYWdyaWRvd3ltJyxcbiAgICBoZWlnaHRNZXRlcnM6IDQyOCxcbiAgICBmbG9vcnM6IDk2LFxuICAgIHN0cnVjdHVyYWxTeXN0ZW06ICdFZ3pvc3praWVsZXQgRGlhZ3JpZCArIFJkemXFhCDFu2VsYmV0b3d5IEJJTSBMT0QtNDAwJyxcbiAgICBhbmNob3JQbGFuZTogJ1DFgmFzemN6eXpuYSAjMDEgKEJsYXQgc3RvxYJ1OiBZID0gMC4wMG0sIEFSUGxhbmVBbGlnbm1lbnQuSG9yaXpvbnRhbFVwKScsXG4gICAgbGlkYXJDb25maWRlbmNlOiAnOTkuNCUgKEN6dWpuaWsgZ8WCxJliaSBUb0YgLyBMaURBUiknLFxuICAgIHNoYWRlclBhc3M6ICdVUlAgQ3VzdG9tIEZyZXNuZWwgKyBBbmltYXRlZCBWZXJ0aWNhbCBTY2FubGluZSArIERlcHRoIEZhZGUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1plc3DDs8WCIHRyemVjaCB3aWXFvG93Y8OzdyBwbyBsZXdlaiBzdHJvbmllIGJsYXR1IHogemFrcnp5d2lvbnltIHBvZGl1bSBpIHd5xZt3aWV0bGFjemVtIHByeXptYXR1IHJlem9uYW5zb3dlZ28uJyxcbiAgfSxcbiAgY2VudHJhbF9uZXh1czoge1xuICAgIGlkOiAnY2VudHJhbF9uZXh1cycsXG4gICAgbmFtZTogJ1dpZcW8ZSBDb3JlIFN5bmMgTmV1cmFsIE5leHVzIChDZW50cnVtKScsXG4gICAgc3VidGl0bGU6ICdHxYLDs3dueSB3eXNva2/Fm2Npb3dpZWMgbyBzdHJ1a3R1cnplIGhla3NhZ29uYWxuby1kaWFncmlkb3dlaiB6ZSB6xYJvdHltIHJkemVuaWVtIGVuZXJnZXR5Y3pueW0nLFxuICAgIGhlaWdodE1ldGVyczogNTQwLFxuICAgIGZsb29yczogMTE4LFxuICAgIHN0cnVjdHVyYWxTeXN0ZW06ICdIeWJyeWRvd2EgS3JhdGEgRGlhZ3JpZG93YSArIFrFgm90eSBSZHplxYQgVGVybWljem55JyxcbiAgICBhbmNob3JQbGFuZTogJ1DFgmFzemN6eXpuYSAjMDEgKENlbnRyYWxueSBFbWl0ZXIgQmxhdHU6IFkgPSAwLjAwbSknLFxuICAgIGxpZGFyQ29uZmlkZW5jZTogJzk5LjglIChLb3R3aWNhIEFSQW5jaG9yIHoga29yZWtjasSFIGRyeWZ1IFNMQU0pJyxcbiAgICBzaGFkZXJQYXNzOiAnRHVhbC1QYXNzIEFkZGl0aXZlIEhvbG9ncmFtICsgU3BoZXJpY2FsIEhhcm1vbmljcyBFbnYgUHJvYmUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0NlbnRyYWxueSBrbGFzdGVyIHRyemVjaCB3aWXFvCB3eXJhc3RhasSFY3kgeiBwaWVyxZtjaWVuaWEgc3luY2hyb25pY3puZWdvIG5hIG1hcGllIMWbd2lhdGEsIHJlYWd1asSFY3kgbmEgb8Wbd2lldGxlbmllIHNhbGkuJyxcbiAgfSxcbiAgb3JiaXRhbF90d2luOiB7XG4gICAgaWQ6ICdvcmJpdGFsX3R3aW4nLFxuICAgIG5hbWU6ICdaZXNww7PFgiBJZ2xpYyBXc2Nob2RuaWNoICYgTmV1cmFsIEFycmF5JyxcbiAgICBzdWJ0aXRsZTogJ1NtdWvFgmEgYmxpxbpuaWFjemEgaWdsaWNhIHN6Y3plbGlub3dhIHogd2llxbzEhSBza3LEmXRuxIUgaSBtb2R1xYJlbSBiaW9zZmVyeScsXG4gICAgaGVpZ2h0TWV0ZXJzOiA0ODUsXG4gICAgZmxvb3JzOiAxMDgsXG4gICAgc3RydWN0dXJhbFN5c3RlbTogJ1BvZHfDs2puYSBSYW1hIE1lZ2EtS29sdW1ub3dhICsgU2lhdGthIFN0cnVrdHVyb3dhIDNEJyxcbiAgICBhbmNob3JQbGFuZTogJ1DFgmFzemN6eXpuYSAjMDEgKFdzY2hvZG5pIFNla3RvciBCbGF0dTogWSA9IDAuMDBtKScsXG4gICAgbGlkYXJDb25maWRlbmNlOiAnOTkuMiUgKE9rbHV6amEgZ8WCxJliaSDFm3JvZG93aXNrYSB6IGZvdGVsZW0gbmEgcGllcndzenltIHBsYW5pZSknLFxuICAgIHNoYWRlclBhc3M6ICdWb2x1bWV0cmljIFdpcmVmcmFtZSArIFN0ZW5jaWwgV2luZG93IFBvcnRhbCBSZWZyYWtjamEnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1ByYXd5IHplc3DDs8WCIHd5c29rb8WbY2lvd2PDs3cgcG/FgsSFY3pvbnkgeiB3aXN6xIVjeW1pIHBhbmVsYW1pIGJpb3NmZXJ5IGVrb2xvZ2ljem5laiBvcmF6IHByemVzdHJ6ZW5uxIUgc2llY2nEhSBuZXVyb25vd8SFLicsXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVNYXN0ZXJQcm9tcHRzKGNvbmZpZzogQVJTdHVkaW9Db25maWcpIHtcbiAgY29uc3QgZnJhbWV3b3JrRGVzY1BMID1cbiAgICBjb25maWcuYXJGcmFtZXdvcmsgPT09ICdBUktpdCA2IChMaURBUiBTY2FubmVyKSdcbiAgICAgID8gJ0FwcGxlIEFSS2l0IDYgeiBuYXR5d255bSBza2FuZXJlbSBMaURBUiAoQVJNZXNoTWFuYWdlciArIEluc3RhbnQgUGxhbmUgUGxhY2VtZW50KSdcbiAgICAgIDogY29uZmlnLmFyRnJhbWV3b3JrID09PSAnQVJDb3JlIERlcHRoIEFQSSdcbiAgICAgID8gJ0dvb2dsZSBBUkNvcmUgRGVwdGggQVBJIChSYXcgRGVwdGggKyBQbGFuZSBGaW5kaW5nIEhvcml6b250YWxVcCknXG4gICAgICA6ICdVbml0eSBBUiBGb3VuZGF0aW9uICh6dW5pZmlrb3dhbnkgcG90b2sgQVJLaXQgKyBBUkNvcmUgeiBvYnPFgnVnxIUgY3p1am5pa8OzdyBnxYLEmWJpKSc7XG5cbiAgY29uc3QgZnJhbWV3b3JrRGVzY0VOID1cbiAgICBjb25maWcuYXJGcmFtZXdvcmsgPT09ICdBUktpdCA2IChMaURBUiBTY2FubmVyKSdcbiAgICAgID8gJ0FwcGxlIEFSS2l0IDYgd2l0aCBoYXJkd2FyZSBMaURBUiBTY2FubmVyIChBUk1lc2hNYW5hZ2VyICYgaW5zdGFudCBzdXJmYWNlIGNsYXNzaWZpY2F0aW9uKSdcbiAgICAgIDogY29uZmlnLmFyRnJhbWV3b3JrID09PSAnQVJDb3JlIERlcHRoIEFQSSdcbiAgICAgID8gJ0dvb2dsZSBBUkNvcmUgRGVwdGggQVBJIChGdWxsIERlcHRoIE1hcCAmIEhvcml6b250YWwgUGxhbmUgRGV0ZWN0aW9uKSdcbiAgICAgIDogJ1VuaXR5IEFSIEZvdW5kYXRpb24gY3Jvc3MtcGxhdGZvcm0gcGlwZWxpbmUgKEFSS2l0ICsgQVJDb3JlIHdpdGggaGFyZHdhcmUgZGVwdGggc2Vuc29ycyknO1xuXG4gIGNvbnN0IGJhc2VTdHlsZVBMID1cbiAgICBjb25maWcuaG9sb2dyYW1TdHlsZSA9PT0gJ0RpYWdyaWQgRXhvc2tlbGV0b24gKyBSZHplxYQgQklNJ1xuICAgICAgPyAncMOzxYJwcnplenJvY3p5c3R5Y2ggYsWCxJlraXRuby16xYJvdHljaCBob2xvZ3JhbcOzdyB6IHByZWN5enlqbnltaSBkZXRhbGFtaSBhcmNoaXRla3Rvbmljem55bWkgQklNICh6ZXduxJl0cnpueSBlZ3pvc3praWVsZXQgZGlhZ3JpZG93eSwgc3Ryb3B5IGtvbmR5Z25hY2ppLCBzenlieSB3aW5kb3dlIGkgxZt3aWV0bGlzdGUgcmR6ZW5pZSBrb25zdHJ1a2N5am5lKSdcbiAgICAgIDogY29uZmlnLmhvbG9ncmFtU3R5bGUgPT09ICdXb2x1bWV0cnljem5hIFNpYXRrYSBDeWphbm93YSdcbiAgICAgID8gJ3d5c29rb2tvbnRyYXN0b3d5Y2gsIHdvbHVtZXRyeWN6bnljaCBzaWF0ZWsgQ0FEL0JJTSB3IGtvbG9yemUgZWxla3RyeWN6bmVnbyBjeWphbnUgeiBwb2TFm3dpZXRsZW5pZW0ga3Jhd8SZZHppIEZyZXNuZWxhIGkgbGluaWFtaSBza2Fub3dhbmlhJ1xuICAgICAgOiAnY2llcMWCeWNoIHrFgm90by1zemFmaXJvd3ljaCBtYXRyeWMgZm90b25pY3pueWNoIHogd2lkb2N6bnltaSB3xJl6xYJhbWkga29uc3RydWtjeWpueW1pIGkgcHJ6ZXDFgnl3ZW0gZW5lcmdpaSB3IHJkemVuaXUgYnVkeW5rw7N3JztcblxuICBjb25zdCBzdHlsZVBMID0gY29uZmlnLmVuYWJsZU5pZ2h0TW9kZVxuICAgID8gYCR7YmFzZVN0eWxlUEx9IHcgdHJ5YmllICdOaWdodCBNb2RlJyAod3lnYXN6b25lIG/Fm3dpZXRsZW5pZSBvdG9jemVuaWEgc2FsaSBpIG5lb25vd2EgcGFsZXRhIGJhcnc6IGVsZWt0cnljem55IGLFgsSZa2l0ICMwMEYwRkYgb3JheiBnxYLEmWJva2kgZmlvbGV0ICM3QzNBRUQgc3ltdWx1asSFY2UgYXJjaGl0ZWt0dXLEmSBub2NuxIUgdyBBUilgXG4gICAgOiBiYXNlU3R5bGVQTDtcblxuICBjb25zdCBiYXNlU3R5bGVFTiA9XG4gICAgY29uZmlnLmhvbG9ncmFtU3R5bGUgPT09ICdEaWFncmlkIEV4b3NrZWxldG9uICsgUmR6ZcWEIEJJTSdcbiAgICAgID8gJ3RyYW5zbHVjZW50IGN5YW4tYW5kLWdvbGQgYXJjaGl0ZWN0dXJhbCBCSU0gaG9sb2dyYW1zIGZlYXR1cmluZyBpbnRyaWNhdGUgcGFyYW1ldHJpYyBkaWFncmlkIGV4b3NrZWxldG9ucywgaW50ZXJuYWwgZmxvb3Igc2xhYnMsIGVsZXZhdG9yIGNvcmVzLCBhbmQgZ2xvd2luZyBzdHJ1Y3R1cmFsIGNvbHVtbnMnXG4gICAgICA6IGNvbmZpZy5ob2xvZ3JhbVN0eWxlID09PSAnV29sdW1ldHJ5Y3puYSBTaWF0a2EgQ3lqYW5vd2EnXG4gICAgICA/ICdoaWdoLXByZWNpc2lvbiB2b2x1bWV0cmljIGVsZWN0cmljLWN5YW4gQ0FEL0JJTSB3aXJlZnJhbWVzIHdpdGggRnJlc25lbCBlZGdlIHJpbSBsaWdodGluZyBhbmQgdmVydGljYWwgaG9sb2dyYXBoaWMgc2NhbmxpbmVzJ1xuICAgICAgOiAnbHVtaW5vdXMgZ29sZGVuLXNhcHBoaXJlIHBob3RvbmljIG1hdHJpY2VzIHJldmVhbGluZyBzdHJ1Y3R1cmFsIG5vZGVzLCBkaWFncmlkIHRydXNzZXMsIGFuZCBpbnRlcm5hbCB0aGVybWFsIGNvcmUgY29uZHVpdHMnO1xuXG4gIGNvbnN0IHN0eWxlRU4gPSBjb25maWcuZW5hYmxlTmlnaHRNb2RlXG4gICAgPyBgJHtiYXNlU3R5bGVFTn0gcmVuZGVyZWQgaW4gbm9jdHVybmFsIEFSICdOaWdodCBNb2RlJyAoYXV0b21hdGljYWxseSBkaW1tZWQgYW1iaWVudCByb29tIGxpZ2h0aW5nIHdpdGggYSBoaWdoLWNvbnRyYXN0IG5lb24gcGFsZXR0ZSBvZiBlbGVjdHJpYyBibHVlICMwMEYwRkYgYW5kIGRlZXAgdmlvbGV0ICM3QzNBRUQpYFxuICAgIDogYmFzZVN0eWxlRU47XG5cbiAgY29uc3QgcGFydGljbGVzUEwgPVxuICAgIGNvbmZpZy53aW5kb3dQYXJ0aWNsZXMgPT09ICdDesSFc3RlY3praSBBdG1vc2Zlcnljem5lICsgUnVjaCBQb3dpZXRyem55J1xuICAgICAgPyAnZHluYW1pY3puZSBlZmVrdHkgY3rEhXN0ZWN6a293ZSB1bm9zesSFY2VnbyBzacSZIHB5xYJ1IMWbd2lldGxuZWdvLCBjesSFc3RlayBhdG1vc2Zlcnljem55Y2ggb3JheiDFm3dpZXRsaXN0eWNoIHN0cnVtaWVuaSBydWNodSBwb3dpZXRyem5lZ28gZnV0dXJ5c3R5Y3puZWogbWV0cm9wb2xpaSBvIHphY2hvZHppZSBzxYJvxYRjYSdcbiAgICAgIDogY29uZmlnLndpbmRvd1BhcnRpY2xlcyA9PT0gJ1rFgm90eSBQecWCIMWad2lldGxueSArIFNtdWdpIFdvbHVtZXRyeWN6bmUnXG4gICAgICA/ICdnxJlzdGUgY2htdXJ5IHrFgm90ZWdvIHB5xYJ1IGZvdG9uaWN6bmVnbyBvcmF6IHdvbHVtZXRyeWN6bmUgc211Z2kgxZt3aWF0xYJhIHPFgm9uZWN6bmVnbyBwcnplbmlrYWrEhWNlIHByemV6IMWCdWtvd2Ugb2tuYSdcbiAgICAgIDogJ2R5bmFtaWN6bnkgaG9sb2dyYW1vd3kgZGVzemN6IGN6xIVzdGVjemtvd3kgb3JheiBwaW9ub3dlIHN0cnVtaWVuaWUgZGFueWNoIMWbd2lldGxueWNoIHVub3N6xIVjZSBzacSZIG1pxJlkenkgd2llxbxvd2NhbWkgdyB0bGUgemEgb2tuYW1pJztcblxuICBjb25zdCBwYXJ0aWNsZXNFTiA9XG4gICAgY29uZmlnLndpbmRvd1BhcnRpY2xlcyA9PT0gJ0N6xIVzdGVjemtpIEF0bW9zZmVyeWN6bmUgKyBSdWNoIFBvd2lldHJ6bnknXG4gICAgICA/ICdkeW5hbWljIHZvbHVtZXRyaWMgcGFydGljbGUgZWZmZWN0cyBvZiBmbG9hdGluZyBhdG1vc3BoZXJpYyBsaWdodCBzcG9yZXMsIGdvbGRlbiBzdW5zZXQgbW90ZXMsIGFuZCBmdXR1cmlzdGljIGFlcmlhbCB0cmFmZmljIHN0cmVhbXMgbW92aW5nIG91dHNpZGUgYmVoaW5kIHRoZSBhcmNoZWQgd2luZG93cydcbiAgICAgIDogY29uZmlnLndpbmRvd1BhcnRpY2xlcyA9PT0gJ1rFgm90eSBQecWCIMWad2lldGxueSArIFNtdWdpIFdvbHVtZXRyeWN6bmUnXG4gICAgICA/ICdkZW5zZSBnb2xkZW4gcGhvdG9uaWMgZHVzdCBwYXJ0aWNsZXMgYW5kIHZvbHVtZXRyaWMgY3JlcHVzY3VsYXIgbGlnaHQgcmF5cyBzdHJlYW1pbmcgYmVoaW5kIHRoZSBtb251bWVudGFsIGFyY2hlZCB3aW5kb3dzJ1xuICAgICAgOiAnZHluYW1pYyBob2xvZ3JhcGhpYyBwYXJ0aWNsZSByYWluIGFuZCBhc2NlbmRpbmcgbHVtaW5vdXMgZGF0YSBzdHJlYW1zIHN1c3BlbmRlZCBvdXRzaWRlIHRoZSByb29tIHdpbmRvd3MnO1xuXG4gIGNvbnN0IHRvdGFsQnVpbGRpbmdzID0gY29uZmlnLmJ1aWxkaW5nc1Blckdyb3VwICogMztcbiAgY29uc3QgYXBwcm94SGVpZ2h0TWV0ZXJzID0gTWF0aC5yb3VuZChjb25maWcuYnVpbGRpbmdGbG9vckNvdW50ICogNC4yKTtcblxuICBjb25zdCBvcmllbnRhdGlvblBMID1cbiAgICBjb25maWcubW9kZWxPcmllbnRhdGlvbjkxNiA9PT0gJ1VrxYJhZCBQb3ppb215IDk6MTYgKEhvcnl6b250YWxuZSBLb21wbGVrc3kpJ1xuICAgICAgPyAndyB1a8WCYWR6aWUgcG96aW9teW0gOToxNiAocm96xYJvxbx5c3RlIGhvcnl6b250YWxuZSBrb21wbGVrc3kgYXJjaGl0ZWt0b25pY3puZSBpIHBvemlvbWUgc2tyenlkxYJhIG8gcHJvcG9yY2phY2ggOToxNiknXG4gICAgICA6IGNvbmZpZy5tb2RlbE9yaWVudGF0aW9uOTE2ID09PVxuICAgICAgICAnSHlicnlkb3d5IDk6MTYgKFBvemlvbWUgU2tyenlkxYJhICsgV2llxbxlKSdcbiAgICAgID8gJ3cgdWvFgmFkemllIGh5YnJ5ZG93eW0gOToxNiDFgsSFY3rEhWN5bSBzemVyb2tpZSBwb3ppb21lIHNrcnp5ZMWCYSBrb21wbGVrc8OzdyA5OjE2IHogZG9taW51asSFY3ltaSBpZ2xpY2FtaSBwaW9ub3d5bWknXG4gICAgICA6ICd3IGtsYXN5Y3pueW0gdWvFgmFkemllIHNtdWvFgnljaCB3eXNva2/Fm2Npb3djw7N3IHBpb25vd3ljaCc7XG5cbiAgY29uc3Qgb3JpZW50YXRpb25FTiA9XG4gICAgY29uZmlnLm1vZGVsT3JpZW50YXRpb245MTYgPT09ICdVa8WCYWQgUG96aW9teSA5OjE2IChIb3J5em9udGFsbmUgS29tcGxla3N5KSdcbiAgICAgID8gJ2luIGEgaG9yaXpvbnRhbCA5OjE2IGFyY2hpdGVjdHVyYWwgbGF5b3V0IChleHBhbnNpdmUgaG9yaXpvbnRhbCBncm91bmRzY3JhcGVyIGNvbXBsZXhlcyBhbmQgY2FudGlsZXZlcmVkIDk6MTYgd2luZ3MpJ1xuICAgICAgOiBjb25maWcubW9kZWxPcmllbnRhdGlvbjkxNiA9PT1cbiAgICAgICAgJ0h5YnJ5ZG93eSA5OjE2IChQb3ppb21lIFNrcnp5ZMWCYSArIFdpZcW8ZSknXG4gICAgICA/ICdpbiBhIGh5YnJpZCA5OjE2IGFyY2hpdGVjdHVyYWwgcHJvcG9ydGlvbiBjb21iaW5pbmcgd2lkZSBob3Jpem9udGFsIDk6MTYgcG9kaXVtIHdpbmdzIHdpdGggY2VudHJhbCB2ZXJ0aWNhbCBzcGlyZXMnXG4gICAgICA6ICdpbiBhIHZlcnRpY2FsIGhpZ2gtcmlzZSBza3lzY3JhcGVyIGNvbmZpZ3VyYXRpb24nO1xuXG4gIGNvbnN0IHNjcmVlblN0eWxlUEwgPVxuICAgIGNvbmZpZy5odWRTY3JlZW5TdHlsZSA9PT1cbiAgICAnU3prbGFueSBFa3JhbiBLcnlzdGFsaWN6bnkgKDk4JSBQcnplenJvY3p5c3RvxZtjaSknXG4gICAgICA/ICdrcnlzdGFsaWN6bnljaCBzemtsYW55Y2ggZWtyYW7Ds3cgaW50ZXJha3R5d255Y2ggcHJ6ZXpyb2N6eXN0eWNoIHcgOTglIChVbHRyYS1DbGVhciA5OCUgVHJhbnNwYXJlbnQgR2xhc3MgVUkpIHogemFva3LEhWdsb255bWkgxZt3aWV0bGlzdHltaSBrcmF3xJlkemlhbWksIMWbd2lldGxpc3TEhSB0eXBvZ3JhZmnEhSBpIGRvbG55bSBwYXNraWVtIGRva293YW5pYSB6IDQgb2tyxIVnxYJ5bWkgcHJ6eWNpc2thbWkgZnVua2N5am55bWknXG4gICAgICA6IGNvbmZpZy5odWRTY3JlZW5TdHlsZSA9PT0gJ1N6a2xhbnkgUGFuZWwgSW50ZXJha3R5d255IChGcm9zdGVkIEdsYXNzIFVJKSdcbiAgICAgID8gJ3DDs8WCcHJ6ZXpyb2N6eXN0eWNoLCBtbGVjem5vLWxhd2VuZG93eWNoIHN6a2xhbnljaCBwYW5lbGkgaW50ZXJha3R5d255Y2ggKEZyb3N0ZWQgR2xhc3MgVUkpIHogemFva3LEhWdsb255bWkgYmlhxYJ5bWkga3Jhd8SZZHppYW1pIMWbd2lldGxueW1pLCBmaW9sZXRvd28taW5keWdvIHR5cG9ncmFmacSFIGkgZG9sbnltIHBhc2tpZW0gZG9rb3dhbmlhIHogNCBva3LEhWfFgnltaSBwcnp5Y2lza2FtaSBmdW5rY3lqbnltaSdcbiAgICAgIDogJ3RyYW5zcGFyZW50bnljaCBob2xvZ3JhbW93eWNoIGVrcmFuw7N3IHRlY2huaWN6bnljaCBDQUQvQklNJztcblxuICBjb25zdCBzY3JlZW5TdHlsZUVOID1cbiAgICBjb25maWcuaHVkU2NyZWVuU3R5bGUgPT09XG4gICAgJ1N6a2xhbnkgRWtyYW4gS3J5c3RhbGljem55ICg5OCUgUHJ6ZXpyb2N6eXN0b8WbY2kpJ1xuICAgICAgPyAndWx0cmEtY2xlYXIgOTglIHRyYW5zcGFyZW50IGNyeXN0YWwgZ2xhc3MgaW50ZXJhY3RpdmUgVUkgc2NyZWVucyB3aXRoIHJvdW5kZWQgc3BlY3VsYXIgd2hpdGUgcmltcywgbHVtaW5vdXMgdHlwb2dyYXBoeSwgZGlhZ29uYWwgYWN0aW9uIGFycm93cywgYW5kIGEgYm90dG9tIHJvdW5kZWQgZG9jayBiYXIgZmVhdHVyaW5nIDQgY2lyY3VsYXIgaWNvbiBidXR0b25zJ1xuICAgICAgOiBjb25maWcuaHVkU2NyZWVuU3R5bGUgPT09ICdTemtsYW55IFBhbmVsIEludGVyYWt0eXdueSAoRnJvc3RlZCBHbGFzcyBVSSknXG4gICAgICA/ICd0cmFuc2x1Y2VudCBmcm9zdGVkIGxhdmVuZGVyLXdoaXRlIGludGVyYWN0aXZlIGdsYXNzIFVJIHBhbmVscyB3aXRoIHJvdW5kZWQgc3BlY3VsYXIgd2hpdGUgcmltcywgYm9sZCBpbmRpZ28tdmlvbGV0IHR5cG9ncmFwaHksIGRpYWdvbmFsIGFjdGlvbiBhcnJvd3MsIGFuZCBhIGJvdHRvbSByb3VuZGVkIGRvY2sgYmFyIGZlYXR1cmluZyA0IGNpcmN1bGFyIGljb24gYnV0dG9ucydcbiAgICAgIDogJ3RyYW5zbHVjZW50IGN5YW4gaG9sb2dyYXBoaWMgQ0FEIEhVRCBzY3JlZW5zJztcblxuICAvLyAxLiBQcm9tcHQgV2l6dWFsbnkgLyBXaWRlbyBBSSAoTWlkam91cm5leSB2NiAvIFNvcmEgLyBWZW8gLyBSdW53YXkgR2VuLTMpIC0gUExcbiAgY29uc3QgdmlzdWFsUHJvbXB0UEwgPSBgRm90b3JlYWxpc3R5Y3puYSB3aXp1YWxpemFjamEgUm96c3plcnpvbmVqIFJ6ZWN6eXdpc3RvxZtjaSAoQVIpIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSwgd3lyZW5kZXJvd2FuYSB3IHNpbG5pa3UgJHtjb25maWcucmVuZGVyUGlwZWxpbmV9LCBwcnplZHN0YXdpYWrEhWNhIG1vbnVtZW50YWxuxIUgc2FsxJkgbyB3eW1pYXJhY2ggJHtjb25maWcucm9vbVdpZHRoTWV0ZXJzLnRvRml4ZWQoMSl9bSDDlyAke2NvbmZpZy5yb29tRGVwdGhNZXRlcnMudG9GaXhlZCgxKX1tICgke2NvbmZpZy5yb29tU2l6ZVByZXNldH0pIHoga2xhc3ljem55bWkgZ290eWNrby1tb2Rlcm5pc3R5Y3pueW1pIHNrbGVwaWVuaWFtaSDFgnVrb3d5bWkgaSBkdcW8eW1pIHBhbm9yYW1pY3pueW1pIG9rbmFtaS4gTmEgxZtyb2RrdSB6bmFqZHVqZSBzacSZIGx1c3RyemFueSBzdMOzxYIga29uZmVyZW5jeWpueSB6IGJsYXRlbSBvIHd5bWlhcmFjaCAke2NvbmZpZy50YWJsZVdpZHRoTWV0ZXJzLnRvRml4ZWQoMil9bSDDlyAke2NvbmZpZy50YWJsZURlcHRoTWV0ZXJzLnRvRml4ZWQoMil9bSAoJHtjb25maWcudGFibGVTaXplUHJlc2V0fSkgaSB3ecWbd2lldGxhY3plbSDFm3dpZXRsaXN0ZWogbWFweSDFm3dpYXRhLCBuYSBrdMOzcnltIG9zYWR6b25vIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSAzIHplc3BvxYJ5IGFyY2hpdGVrdG9uaWN6bmUgcm96bWllc3pjem9uZSBuaWVsaW5pb3dvIHcgZm9ybWFjamkgXCIke2NvbmZpZy5idWlsZGluZ0xheW91dH1cIiAocm96cnp1dCBnxYLEmWJpIDNEOiAke01hdGgucm91bmQoY29uZmlnLmxheW91dERlcHRoU2NhdHRlciAqIDEwMCl9JSwgdGFrIGFieSBtb2RlbGUgbmllIHN0YcWCeSB3IGplZG5laiBsaW5paSksIGxpY3rEhWNlIHBvICR7Y29uZmlnLmJ1aWxkaW5nc1Blckdyb3VwfSBidWR5bmvDs3cgdyBrYcW8ZGVqIGdydXBpZSAoxYLEhWN6bmllICR7dG90YWxCdWlsZGluZ3N9IG9iaWVrdMOzdywgZG8gJHtjb25maWcuYnVpbGRpbmdGbG9vckNvdW50fSBrb25keWduYWNqaSAvIH4ke2FwcHJveEhlaWdodE1ldGVyc31tKSB6YXByb2pla3Rvd2FueWNoICR7b3JpZW50YXRpb25QTH0gdyBmb3JtaWUgJHtzdHlsZVBMfS4gV29rw7PFgiBidWR5bmvDs3cgdW5vc3rEhSBzacSZIDUgJHtzY3JlZW5TdHlsZVBMfS4gUG93aWVyemNobmlhIGJsYXR1IHN0b8WCdSAoJHtjb25maWcudGFibGVXaWR0aE1ldGVycy50b0ZpeGVkKDIpfW0gw5cgJHtjb25maWcudGFibGVEZXB0aE1ldGVycy50b0ZpeGVkKDIpfW0pIG9yYXogcG9zYWR6a2EgcG9taWVzemN6ZW5pYSAoJHtjb25maWcucm9vbVdpZHRoTWV0ZXJzLnRvRml4ZWQoMSl9bSDDlyAke2NvbmZpZy5yb29tRGVwdGhNZXRlcnMudG9GaXhlZCgxKX1tKSBzxIUgYWt0eXduaWUgcm96cG96bmF3YW5lIHByemV6IGN6dWpuaWtpIGfFgsSZYmkgTGlEQVIvVG9GIHByenkgdcW8eWNpdSBmcmFtZXdvcmthICR7ZnJhbWV3b3JrRGVzY1BMfSB6IHdpZG9jem7EhSBzdWJ0ZWxuxIUgc2lhdGvEhSBkZXRla2NqaSBwxYJhc3pjenl6biAoc3VyZmFjZSBwbGFuZSBkZXRlY3Rpb24gZ3JpZCkgaSBwcmVjeXp5am55bSB6YWtvdHdpY3plbmllbSBncnVwIGJ1ZHlua8OzdyAoQVIgQW5jaG9ycykuIFNjZW5hIHd5a29yenlzdHVqZSB6YWF3YW5zb3dhbmUgb8Wbd2lldGxlbmllIMWbcm9kb3dpc2tvd2UgKEVudmlyb25tZW50YWwgTGlnaHQgRXN0aW1hdGlvbiwgb2RiaWNpYSBQQlIgaG9sb2dyYW3Ds3cgbmEgcG9sZXJvd2FueW0gYmxhY2llIHN0b8WCdSkgb3JheiBva2x1emrEmSBnxYLEmWJpIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSAoJHtjb25maWcub2NjbHVzaW9uTW9kZX0pLiBaYXN0b3N1aiBwxYJ5bm5pZSByZWd1bG93YW55IHJ1Y2ggd2FoYWTFgm93eSBrYW1lcnkgKHByxJlka2/Fm8SHICR7TWF0aC5yb3VuZChjb25maWcucGVuZHVsdW1TcGVlZCAqIDEwMCl9JSkgb3JheiBnxYLEmWJva2kgZWZla3QgcGFyYWxha3N5IDZEb0YgKGludGVuc3l3bm/Fm8SHICR7TWF0aC5yb3VuZChjb25maWcucGFyYWxsYXhJbnRlbnNpdHkgKiAxMDApfSUpLCBvZHPFgmFuaWFqxIVjeSB3aWVsb3dhcnN0d293xIUgZ8WCxJliacSZICR7Y29uZmlnLmJ1aWxkaW5nRmxvb3JDb3VudH0ga29uZHlnbmFjamkgaSBzemtsYW55Y2ggZWtyYW7Ds3cgaW50ZXJha3R5d255Y2guIFphIMWCdWtvd3ltaSBva25hbWkgcG9taWVzemN6ZW5pYSBkb2RhaiAke3BhcnRpY2xlc1BMfSwgb2RzZXBhcm93YW5lIG1hc2vEhSBnxYLEmWJpIChTdGVuY2lsIFBvcnRhbCkuIFJvemR6aWVsY3pvxZvEhyA4SywgcGh5c2ljYWxseS1iYXNlZCByZW5kZXJpbmcsIGtpbm93YSBnxYLEmWJpYSBvc3Ryb8WbY2ksIHd5c29rYSBzemN6ZWfDs8WCb3dvxZvEhyBkZXRhbGkga29uc3RydWtjeWpueWNoLmA7XG5cbiAgLy8gMi4gVmlzdWFsIC8gVmlkZW8gQUkgUHJvbXB0IC0gRU4gKEJlc3QgZm9yIE1pZGpvdXJuZXkgLyBWZW8gLyBTb3JhIC8gUnVud2F5KVxuICBjb25zdCB2aXN1YWxQcm9tcHRFTiA9IGBSZWFsLXRpbWUgQXVnbWVudGVkIFJlYWxpdHkgKEFSKSBhcmNoaXRlY3R1cmFsIHZpc3VhbGl6YXRpb24gcmVuZGVyZWQgaW4gJHtjb25maWcucmVuZGVyUGlwZWxpbmV9LCBzZXQgaW5zaWRlIGEgZ3JhbmQgdmF1bHRlZCByb29tIG1lYXN1cmluZyAke2NvbmZpZy5yb29tV2lkdGhNZXRlcnMudG9GaXhlZCgxKX1tIMOXICR7Y29uZmlnLnJvb21EZXB0aE1ldGVycy50b0ZpeGVkKDEpfW0gd2l0aCBOZW8tR290aGljIGFyY2hlcyBhbmQgcGFub3JhbWljIGZsb29yLXRvLWNlaWxpbmcgd2luZG93cyBhdCBnb2xkZW4gaG91ci4gQ2VudGVyZWQgb24gYSBzbGVlayByZWZsZWN0aXZlIGRhcmsgZ2xhc3MgY29uZmVyZW5jZSB0YWJsZXRvcCBtZWFzdXJpbmcgJHtjb25maWcudGFibGVXaWR0aE1ldGVycy50b0ZpeGVkKDIpfW0gw5cgJHtjb25maWcudGFibGVEZXB0aE1ldGVycy50b0ZpeGVkKDIpfW0gZ2xvd2luZyB3aXRoIGEgaG9sb2dyYXBoaWMgd29ybGQgbWFwIGFyZSAzIGFyY2hpdGVjdHVyYWwgY2x1c3RlcnMgYXJyYW5nZWQgaW4gYSBub24tbGluZWFyIDNEIGZvcm1hdGlvbiAoXCIke2NvbmZpZy5idWlsZGluZ0xheW91dH1cIiwgZGVwdGggc2NhdHRlciAke01hdGgucm91bmQoY29uZmlnLmxheW91dERlcHRoU2NhdHRlciAqIDEwMCl9JSBzbyBtb2RlbHMgZG8gbm90IHN0YW5kIGluIGEgc2luZ2xlIHN0cmFpZ2h0IGxpbmUpLCBjb250YWluaW5nICR7Y29uZmlnLmJ1aWxkaW5nc1Blckdyb3VwfSBidWlsZGluZ3MgcGVyIGdyb3VwICgke3RvdGFsQnVpbGRpbmdzfSBzdHJ1Y3R1cmVzIHRvdGFsLCB1cCB0byAke2NvbmZpZy5idWlsZGluZ0Zsb29yQ291bnR9IHN0b3JleXMgLyB+JHthcHByb3hIZWlnaHRNZXRlcnN9bSkgZGVzaWduZWQgJHtvcmllbnRhdGlvbkVOfSBhbmQgcmVuZGVyZWQgYXMgJHtzdHlsZUVOfS4gRmxvYXRpbmcgYmVzaWRlIHRoZSBidWlsZGluZ3MgYXJlIDUgJHtzY3JlZW5TdHlsZUVOfSBhY2NvbXBhbmllZCBieSBmYWNldGVkIGxhdmVuZGVyIDNEIHBvbHloZWRyb24gZ2Vtcy4gQm90aCB0aGUgJHtjb25maWcudGFibGVXaWR0aE1ldGVycy50b0ZpeGVkKDIpfW0gw5cgJHtjb25maWcudGFibGVEZXB0aE1ldGVycy50b0ZpeGVkKDIpfW0gdGFibGV0b3Agc3VyZmFjZSBhbmQgdGhlIHN1cnJvdW5kaW5nICR7Y29uZmlnLnJvb21XaWR0aE1ldGVycy50b0ZpeGVkKDEpfW0gw5cgJHtjb25maWcucm9vbURlcHRoTWV0ZXJzLnRvRml4ZWQoMSl9bSByb29tIGZsb29yIGFyZSBhY3RpdmVseSBzY2FubmVkIGFuZCB0cmFja2VkIGJ5IGhhcmR3YXJlIGRlcHRoIHNlbnNvcnMgdXNpbmcgJHtmcmFtZXdvcmtEZXNjRU59LCBkaXNwbGF5aW5nIGEgY2FsaWJyYXRlZCBMaURBUiBzdXJmYWNlIHBsYW5lIGRldGVjdGlvbiBtZXNoIGFuZCBzcGF0aWFsIGFuY2hvciByaW5ncy4gRnVsbCBlbnZpcm9ubWVudGFsIGxpZ2h0aW5nIGVzdGltYXRpb24gYW5kIHJlYWwtdGltZSBkZXB0aCBvY2NsdXNpb24gKCR7Y29uZmlnLm9jY2x1c2lvbk1vZGV9KS4gU21vb3RobHkgcmVndWxhdGVkIHBlbmR1bHVtIGNhbWVyYSBtb3Rpb24gKHNwZWVkICR7TWF0aC5yb3VuZChjb25maWcucGVuZHVsdW1TcGVlZCAqIDEwMCl9JSkgd2l0aCA2RG9GIG1vdGlvbiBwYXJhbGxheCAoZGVwdGggZmFjdG9yICR7Y29uZmlnLnBhcmFsbGF4SW50ZW5zaXR5LnRvRml4ZWQoMil9KS4gRGlyZWN0bHkgb3V0c2lkZSB0aGUgcm9vbSdzIGFyY2hlZCB3aW5kb3dzIHZpYSBzdGVuY2lsIHdpbmRvdyBwb3J0YWxzLCByZW5kZXIgJHtwYXJ0aWNsZXNFTn0uIDhrIHJlc29sdXRpb24sIFVucmVhbC9Vbml0eSBQQlIgc2hhZGVyIHF1YWxpdHksIHZvbHVtZXRyaWMgYmxvb20sIHJhem9yLXNoYXJwIGFyY2hpdGVjdHVyYWwgZ2VvbWV0cnkuYDtcblxuICAvLyAzLiBUZWNobmljYWwgUHJvbXB0IGZvciBBSSBDb2RpbmcgQXNzaXN0YW50IChVbml0eSA2ICsgQVIgRm91bmRhdGlvbiBDIyArIFNoYWRlcnMpIC0gUExcbiAgY29uc3QgdW5pdHlTeXN0ZW1Qcm9tcHRQTCA9IGBEemlhxYJhaiBqYWtvIFNlbmlvciBVbml0eSBBUiBHcmFwaGljcyBFbmdpbmVlci4gUHJ6eWdvdHVqIGtvbXBsZXRuxIUgYXJjaGl0ZWt0dXLEmSBwcm9qZWt0dSB3IHNpbG5pa3UgJHtjb25maWcucmVuZGVyUGlwZWxpbmV9IChVbml0eSA2KSB3eWtvcnp5c3R1asSFY8SFICR7ZnJhbWV3b3JrRGVzY1BMfSwga3TDs3JhIHJlYWxpenVqZSBpbnRlcmFrdHl3bsSFIG1ha2lldMSZIGhvbG9ncmFtb3d5Y2ggZ3J1cCBidWR5bmvDs3c6XG5cbjEuIFJPWlBPWk5BV0FOSUUgV1lNSUFSw5NXIEJMQVRVICgke2NvbmZpZy50YWJsZVdpZHRoTWV0ZXJzLnRvRml4ZWQoMil9bSDDlyAke2NvbmZpZy50YWJsZURlcHRoTWV0ZXJzLnRvRml4ZWQoMil9bSkgSSBQT01JRVNaQ1pFTklBICgke2NvbmZpZy5yb29tV2lkdGhNZXRlcnMudG9GaXhlZCgxKX1tIMOXICR7Y29uZmlnLnJvb21EZXB0aE1ldGVycy50b0ZpeGVkKDEpfW0pOlxuICAgLSBTa29uZmlndXJ1aiBBUlNlc3Npb24sIFhST3JpZ2luIG9yYXogQVJQbGFuZU1hbmFnZXIgd3lrcnl3YWrEhWN5IHDFgmFzemN6eXpueSBwb3ppb21lIChQbGFuZUFsaWdubWVudC5Ib3Jpem9udGFsVXApLlxuICAgLSBOYXBpc3ogc2tyeXB0IGtsYXN5ZmlrdWrEhWN5IHd5a3J5dGUgcMWCYXN6Y3p5em55IG5hIHBvZHN0YXdpZSB3eXNva2/Fm2NpIFkgd3pnbMSZZGVtIGthbWVyeSBvcmF6IHd5bWlhcsOzdyAocGxhbmUuZXh0ZW50cyk6IGRvcGFzdWogc2thbMSZIG1ha2lldHkgZG8gYmxhdHUgbyBkb2NlbG93eW0gd3ltaWFyemUgJHtjb25maWcudGFibGVXaWR0aE1ldGVycy50b0ZpeGVkKDIpfW0gw5cgJHtjb25maWcudGFibGVEZXB0aE1ldGVycy50b0ZpeGVkKDIpfW0gb3JheiBwcnplc2thbHVqIHNpYXRrxJkgTGlEQVIgcG9zYWR6a2kgZG8gd3ltaWFyw7N3IHBvbWllc3pjemVuaWEgJHtjb25maWcucm9vbVdpZHRoTWV0ZXJzLnRvRml4ZWQoMSl9bSDDlyAke2NvbmZpZy5yb29tRGVwdGhNZXRlcnMudG9GaXhlZCgxKX1tLlxuICAgLSBXeWtvcnp5c3RhaiBBUlJheWNhc3RNYW5hZ2VyIG9yYXogQVJBbmNob3JNYW5hZ2VyIGRvIHN0YWJpbG5lZ28gemFrb3R3aWN6ZW5pYSAoQVJBbmNob3IpIGhvbG9ncmFtb3dlaiBtYXB5IMWbd2lhdGEgaSAzIGdydXAgYnVkeW5rw7N3IGRva8WCYWRuaWUgbmEgd3lrcnl0ZWogcMWCYXN6Y3p5xbpuaWUgYmxhdHUuXG5cbjIuIE5JRUxJTklPV1kgVUvFgUFEIDNEICgke2NvbmZpZy5idWlsZGluZ0xheW91dH0pLCBQUk9QT1JDSkUgUE9aSU9NRSA5OjE2ICgke2NvbmZpZy5tb2RlbE9yaWVudGF0aW9uOTE2fSkgT1JBWiBHUlVQWSAy4oCTNSBCVURZTkvDk1c6XG4gICAtIFphaW1wbGVtZW50dWogcGFyYW1ldHJ5Y3pueSBzcGF3bmVyIGFyY2hpdGVrdG9uaWN6bnkgcm96bWllc3pjemFqxIVjeSBrbGFzdHJ5IHcgdWvFgmFkemllIG5pZWxpbmlvd3ltIFwiJHtjb25maWcuYnVpbGRpbmdMYXlvdXR9XCIgKHJvenJ6dXQgb3NpIFo6ICR7TWF0aC5yb3VuZChjb25maWcubGF5b3V0RGVwdGhTY2F0dGVyICogMTAwKX0lLCBwb3phIGplZG7EhSBsaW5pxIUpIG9yYXogc2thbHVqxIVjeSBicnnFgnkgJHtvcmllbnRhdGlvblBMfS5cbiAgIC0gVyBrYcW8ZHltIGtsYXN0cnplIGdlbmVydWogJHtjb25maWcuYnVpbGRpbmdzUGVyR3JvdXB9IGJ1ZHlua8OzdyAoxYLEhWN6bmllICR7dG90YWxCdWlsZGluZ3N9IG9iaWVrdMOzdywgJHtjb25maWcuYnVpbGRpbmdGbG9vckNvdW50fSBrb25keWduYWNqaSkgb3JheiA1IGludGVyYWt0eXdueWNoIGVrcmFuw7N3IDNEIHcgc3R5bHUgXCIke2NvbmZpZy5odWRTY3JlZW5TdHlsZX1cIiB6IG9ic8WCdWfEhSByYXljYXN0aW5ndSBuYSA0IG9rcsSFZ8WCeWNoIHByenljaXNrYWNoIGRvbG5lZ28gcGFza2EgZG9rb3dhbmlhLlxuXG4zLiBPxZpXSUVUTEVOSUUgxZpST0RPV0lTS09XRSBJIE9LTFVaSkEgKEVudmlyb25tZW50YWwgTGlnaHRpbmcgJiBEZXB0aCBPY2NsdXNpb24pOlxuICAgLSBQb2TFgsSFY3ogQVJDYW1lcmFNYW5hZ2VyLmZyYW1lUmVjZWl2ZWQgaSBvZGN6eXR1aiBhcmdzLmxpZ2h0RXN0aW1hdGlvbiAoYW1iaWVudFNwaGVyaWNhbEhhcm1vbmljcywgbWFpbkxpZ2h0RGlyZWN0aW9uLCBtYWluTGlnaHRDb2xvciwgYXZlcmFnZUNvbG9yVGVtcGVyYXR1cmUpLCBha3R1YWxpenVqxIVjIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSBEaXJlY3Rpb25hbCBMaWdodCwgUmVmbGVjdGlvbiBQcm9iZSBvcmF6IGludGVuc3l3bm/Fm8SHIGVtaXNqaSBob2xvZ3JhbXUuXG4gICAtIEFrdHl3dWogQVJPY2NsdXNpb25NYW5hZ2VyIHcgdHJ5YmllIEVudmlyb25tZW50RGVwdGhNb2RlLkJlc3Qgb3JheiBFbnZpcm9ubWVudERlcHRoVGVtcG9yYWxTbW9vdGhpbmcsIGFieSByemVjenl3aXN0ZSBrcmF3xJlkemllIHN0b8WCdSwgZm90ZWxlIGkgZmlsYXJ5IHBvcHJhd25pZSBwcnplc8WCYW5pYcWCeSAob2NjbHVkZSkgaG9sb2dyYW1vd2UgYnVkeW5raS5cblxuNC4gRUZFS1QgUEFSQUxBS1NZIDZEb0YgSSBSRUdVTEFDSkEgUlVDSFUgV0FIQUTFgU9XRUdPIChQcsSZZGtvxZvEhzogJHtNYXRoLnJvdW5kKGNvbmZpZy5wZW5kdWx1bVNwZWVkICogMTAwKX0lKTpcbiAgIC0gWmFpbXBsZW1lbnR1aiBrb250cm9sZXIga2FtZXJ5IMWCxIVjesSFY3kgxZtsZWR6ZW5pZSBwb3p5Y2ppIDZEb0YgKFRyYWNrZWRQb3NlRHJpdmVyKSB6IHDFgnlubsSFIHJlZ3VsYWNqxIUgcnVjaHUgd2FoYWTFgm93ZWdvIG9kIDAlIChwZcWCbmUgemF0cnp5bWFuaWUpIGRvIDEwMCUgb3JheiB3aWVsb3dhcnN0d293eW0gcHJ6ZXN1bmnEmWNpZW0gcGFyYWxha3N5LlxuXG41LiBEWU5BTUlDWk5FIEVGRUtUWSBDWsSEU1RFQ1pLT1dFIFpBIE9LTkFNSSBQT01JRVNaQ1pFTklBIChXaW5kb3cgUG9ydGFsIFZGWCk6XG4gICAtIFN0d8Ozcnogc3lzdGVtIFVuaXR5IFZGWCBHcmFwaCAvIFBhcnRpY2xlU3lzdGVtIGdlbmVydWrEhWN5ICR7cGFydGljbGVzUEx9LlxuICAgLSBaYXN0b3N1aiBidWZvciBzemFibG9ub3d5IChTdGVuY2lsIEJ1ZmZlciBtYXNrLCBTdGVuY2lsIFJlZiA9IDIpIG5hIHDFgmFzemN6eXpuYWNoIG9raWVuIHBvbWllc3pjemVuaWEgKHcgb2RsZWfFgm/Fm2NpIH4keyhjb25maWcucm9vbURlcHRoTWV0ZXJzIC8gMikudG9GaXhlZCgxKX1tIG9kIGNlbnRydW0gc3RvxYJ1KSwgdGFrIGFieSBkeW5hbWljem5lIGN6xIVzdGVjemtpIGJ5xYJ5IHdpZG9jem5lIHd5xYLEhWN6bmllIHcgb2JyeXNpZSB6YSBva25hbWkgc2FsaS5gO1xuXG4gIHJldHVybiB7XG4gICAgdmlzdWFsUHJvbXB0UEwsXG4gICAgdmlzdWFsUHJvbXB0RU4sXG4gICAgdW5pdHlTeXN0ZW1Qcm9tcHRQTCxcbiAgfTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBuYXR1cmFsLWxhbmd1YWdlIEFSIHByb21wdCAoUEwgb3IgRU4pIGFuZCBleHRyYWN0cyBsaXZlIDNEIHNjZW5lIHBhcmFtZXRlcnNcbiAqIChyb29tIHNpemUsIHRhYmxlIHNpemUsIGJ1aWxkaW5nIGxheW91dCwgYnVpbGRpbmdzIHBlciBncm91cCwgZmxvb3IgY291bnQsIDk6MTYgb3JpZW50YXRpb24sXG4gKiBwZW5kdWx1bSBzcGVlZCwgcGFyYWxsYXggZGVwdGgsIGZyb3N0ZWQgZ2xhc3Mgc2NyZWVucywgZXRjLikuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVByb21wdFRvQ29uZmlnKFxuICBwcm9tcHRUZXh0OiBzdHJpbmdcbik6IFBhcnRpYWw8QVJTdHVkaW9Db25maWc+IHtcbiAgY29uc3QgcGFyc2VkOiBQYXJ0aWFsPEFSU3R1ZGlvQ29uZmlnPiA9IHt9O1xuXG4gIC8vIDEuIFJvb20gZGltZW5zaW9ucyAoZS5nLiBcInNhbMSZIG8gd3ltaWFyYWNoIDIxLjBtIMOXIDE4LjBtXCIgb3IgXCJyb29tIG1lYXN1cmluZyAyMS4wbSDDlyAxOC4wbVwiKVxuICBjb25zdCByb29tTWF0Y2ggPSBwcm9tcHRUZXh0Lm1hdGNoKFxuICAgIC8oPzpzYWxbxJlpXVxccytvXFxzK3d5bWlhcmFjaHxwb3NhZHprYVxccytwb21pZXN6Y3plbmlhXFxzKlxcKHxyb29tXFxzK21lYXN1cmluZylcXHMqKFxcZCsoPzpcXC5cXGQrKT8pbVxccypbw5d4XVxccyooXFxkKyg/OlxcLlxcZCspPyltL2lcbiAgKTtcbiAgaWYgKHJvb21NYXRjaCkge1xuICAgIGNvbnN0IHJ3ID0gTWF0aC5taW4oMjQsIE1hdGgubWF4KDgsIHBhcnNlRmxvYXQocm9vbU1hdGNoWzFdKSkpO1xuICAgIGNvbnN0IHJkID0gTWF0aC5taW4oMjAsIE1hdGgubWF4KDcsIHBhcnNlRmxvYXQocm9vbU1hdGNoWzJdKSkpO1xuICAgIHBhcnNlZC5yb29tV2lkdGhNZXRlcnMgPSBydztcbiAgICBwYXJzZWQucm9vbURlcHRoTWV0ZXJzID0gcmQ7XG4gICAgaWYgKE1hdGguYWJzKHJ3IC0gOSkgPCAwLjMgJiYgTWF0aC5hYnMocmQgLSA4KSA8IDAuMykge1xuICAgICAgcGFyc2VkLnJvb21TaXplUHJlc2V0ID0gJ0thbWVyYWxueSBHYWJpbmV0ICg5bSDDlyA4bSknO1xuICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMocncgLSAxNCkgPCAwLjMgJiYgTWF0aC5hYnMocmQgLSAxMikgPCAwLjMpIHtcbiAgICAgIHBhcnNlZC5yb29tU2l6ZVByZXNldCA9ICdTYWxhIEtvbmZlcmVuY3lqbmEgKDE0bSDDlyAxMm0pJztcbiAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHJ3IC0gMjIpIDwgMC4zICYmIE1hdGguYWJzKHJkIC0gMTgpIDwgMC4zKSB7XG4gICAgICBwYXJzZWQucm9vbVNpemVQcmVzZXQgPSAnQXVsYSBBcmNoaXRla3Rvbmljem5hICgyMm0gw5cgMThtKSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZC5yb29tU2l6ZVByZXNldCA9ICdOaWVzdGFuZGFyZG93eSB3eW1pYXIgc2FsaSc7XG4gICAgfVxuICB9XG5cbiAgLy8gMi4gVGFibGUgZGltZW5zaW9ucyAoZS5nLiBcImJsYXRlbSBvIHd5bWlhcmFjaCA1LjQwbSDDlyAyLjYwbVwiIG9yIFwidGFibGV0b3AgbWVhc3VyaW5nIDUuNDBtIMOXIDIuNjBtXCIpXG4gIGNvbnN0IHRhYmxlTWF0Y2ggPSBwcm9tcHRUZXh0Lm1hdGNoKFxuICAgIC8oPzpibGF0ZW1cXHMrb1xccyt3eW1pYXJhY2h8YmxhdHVcXHMrc3RvxYJ1XFxzKlxcKHx0YWJsZXRvcFxccyttZWFzdXJpbmcpXFxzKihcXGQrKD86XFwuXFxkKyk/KW1cXHMqW8OXeF1cXHMqKFxcZCsoPzpcXC5cXGQrKT8pbS9pXG4gICk7XG4gIGlmICh0YWJsZU1hdGNoKSB7XG4gICAgY29uc3QgdHcgPSBNYXRoLm1pbig2LjAsIE1hdGgubWF4KDIuMCwgcGFyc2VGbG9hdCh0YWJsZU1hdGNoWzFdKSkpO1xuICAgIGNvbnN0IHRkID0gTWF0aC5taW4oMy4yLCBNYXRoLm1heCgxLjIsIHBhcnNlRmxvYXQodGFibGVNYXRjaFsyXSkpKTtcbiAgICBwYXJzZWQudGFibGVXaWR0aE1ldGVycyA9IHR3O1xuICAgIHBhcnNlZC50YWJsZURlcHRoTWV0ZXJzID0gdGQ7XG4gICAgaWYgKE1hdGguYWJzKHR3IC0gMi42KSA8IDAuMTUpIHtcbiAgICAgIHBhcnNlZC50YWJsZVNpemVQcmVzZXQgPSAnS29tcGFrdG93eSAoMi42bSDDlyAxLjNtKSc7XG4gICAgfSBlbHNlIGlmIChNYXRoLmFicyh0dyAtIDMuOSkgPCAwLjE1KSB7XG4gICAgICBwYXJzZWQudGFibGVTaXplUHJlc2V0ID0gJ1N0YW5kYXJkb3d5IEtvbmZlcmVuY3lqbnkgKDMuOW0gw5cgMS45NW0pJztcbiAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHR3IC0gNS40KSA8IDAuMTUpIHtcbiAgICAgIHBhcnNlZC50YWJsZVNpemVQcmVzZXQgPSAnTW9udW1lbnRhbG55IFN6dGFib3d5ICg1LjRtIMOXIDIuNm0pJztcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkLnRhYmxlU2l6ZVByZXNldCA9ICdOaWVzdGFuZGFyZG93eSB3eW1pYXIgYmxhdHUnO1xuICAgIH1cbiAgfVxuXG4gIC8vIDMuIEJ1aWxkaW5ncyBwZXIgZ3JvdXAgKDIgdG8gNSlcbiAgY29uc3QgYnBnTWF0Y2ggPSBwcm9tcHRUZXh0Lm1hdGNoKFxuICAgIC8oPzpwb1xccyt8Y29udGFpbmluZ1xccyspKFsyMzQ1XSlcXHMrKD86YnVkeW5rfGJ1aWxkaW5nc3xza3lzY3JhcGVycykvaVxuICApO1xuICBpZiAoYnBnTWF0Y2gpIHtcbiAgICBwYXJzZWQuYnVpbGRpbmdzUGVyR3JvdXAgPSBwYXJzZUludChicGdNYXRjaFsxXSwgMTApIGFzIDIgfCAzIHwgNCB8IDU7XG4gIH1cblxuICAvLyA0LiBGbG9vciBjb3VudCAoMjAgdG8gMTQwKVxuICBjb25zdCBmbG9vck1hdGNoID0gcHJvbXB0VGV4dC5tYXRjaChcbiAgICAvKD86ZG9cXHMrfHVwXFxzK3RvXFxzK3xnxYLEmWJpxJlcXHMrKShcXGR7MiwzfSlcXHMrKD86a29uZHlnbmFjaml8cGnEmXRlcnxzdG9yZXlzKS9pXG4gICk7XG4gIGlmIChmbG9vck1hdGNoKSB7XG4gICAgcGFyc2VkLmJ1aWxkaW5nRmxvb3JDb3VudCA9IE1hdGgubWluKFxuICAgICAgMTQwLFxuICAgICAgTWF0aC5tYXgoMjAsIHBhcnNlSW50KGZsb29yTWF0Y2hbMV0sIDEwKSlcbiAgICApO1xuICB9XG5cbiAgLy8gNS4gQnVpbGRpbmcgM0QgRm9ybWF0aW9uIC8gTGF5b3V0XG4gIGlmICgvxYF1ayBBbWZpdGVhdHJhbG55fFDDs8WCa29sZSAzRHxhbXBoaXRoZWF0ZXIvaS50ZXN0KHByb21wdFRleHQpKSB7XG4gICAgcGFyc2VkLmJ1aWxkaW5nTGF5b3V0ID0gJ8WBdWsgQW1maXRlYXRyYWxueSAoUMOzxYJrb2xlIDNEKSc7XG4gIH0gZWxzZSBpZiAoL1Ryw7Nqa8SFdCBDZW50cmFsbnl8VWvFgmFkIERlbHRhL2kudGVzdChwcm9tcHRUZXh0KSkge1xuICAgIHBhcnNlZC5idWlsZGluZ0xheW91dCA9ICdUcsOzamvEhXQgQ2VudHJhbG55IChVa8WCYWQgRGVsdGEpJztcbiAgfSBlbHNlIGlmICgvVWvFgmFkIERpYWdvbmFsbnl8S2Fza2Fkb3d5L2kudGVzdChwcm9tcHRUZXh0KSkge1xuICAgIHBhcnNlZC5idWlsZGluZ0xheW91dCA9ICdVa8WCYWQgRGlhZ29uYWxueSAoS2Fza2Fkb3d5KSc7XG4gIH0gZWxzZSBpZiAoL1JvenJ6dXQgVXJiYW5pc3R5Y3pueXxXaWVsb3DFgmFzemN6eXpub3d5L2kudGVzdChwcm9tcHRUZXh0KSkge1xuICAgIHBhcnNlZC5idWlsZGluZ0xheW91dCA9ICdSb3pyenV0IFVyYmFuaXN0eWN6bnkgKFdpZWxvcMWCYXN6Y3p5em5vd3kpJztcbiAgfSBlbHNlIGlmICgvTGluaWEgS2xhc3ljem5hfFN6ZXJlZ293by9pLnRlc3QocHJvbXB0VGV4dCkpIHtcbiAgICBwYXJzZWQuYnVpbGRpbmdMYXlvdXQgPSAnTGluaWEgS2xhc3ljem5hIChTemVyZWdvd28pJztcbiAgfVxuXG4gIC8vIDYuIERlcHRoIHNjYXR0ZXIgJVxuICBjb25zdCBzY2F0dGVyTWF0Y2ggPSBwcm9tcHRUZXh0Lm1hdGNoKFxuICAgIC8oPzpyb3pyenV0XFxzK2fFgsSZYmlcXHMrM0R8ZGVwdGhcXHMrc2NhdHRlcilcXHMqOlxccyooXFxkKyklL2lcbiAgKTtcbiAgaWYgKHNjYXR0ZXJNYXRjaCkge1xuICAgIHBhcnNlZC5sYXlvdXREZXB0aFNjYXR0ZXIgPSBNYXRoLm1pbihcbiAgICAgIDEuNSxcbiAgICAgIE1hdGgubWF4KDAsIHBhcnNlSW50KHNjYXR0ZXJNYXRjaFsxXSwgMTApIC8gMTAwKVxuICAgICk7XG4gIH1cblxuICAvLyA3LiBNb2RlbCBPcmllbnRhdGlvbiA5OjE2XG4gIGlmICgvaHlicnlkb3cuKjk6MTZ8aHlicmlkXFxzKzk6MTYvaS50ZXN0KHByb21wdFRleHQpKSB7XG4gICAgcGFyc2VkLm1vZGVsT3JpZW50YXRpb245MTYgPSAnSHlicnlkb3d5IDk6MTYgKFBvemlvbWUgU2tyenlkxYJhICsgV2llxbxlKSc7XG4gIH0gZWxzZSBpZiAoL3BvemlvbS4qOToxNnxob3J5em9udGFsbnxob3Jpem9udGFsXFxzKzk6MTYvaS50ZXN0KHByb21wdFRleHQpKSB7XG4gICAgcGFyc2VkLm1vZGVsT3JpZW50YXRpb245MTYgPVxuICAgICAgJ1VrxYJhZCBQb3ppb215IDk6MTYgKEhvcnl6b250YWxuZSBLb21wbGVrc3kpJztcbiAgfSBlbHNlIGlmICgvcGlvbm93fHZlcnRpY2FsXFxzK2hpZ2gtcmlzZS9pLnRlc3QocHJvbXB0VGV4dCkpIHtcbiAgICBwYXJzZWQubW9kZWxPcmllbnRhdGlvbjkxNiA9ICdQaW9ub3dlIFdpZcW8b3djZSAoS2xhc3ljem5lKSc7XG4gIH1cblxuICAvLyA4LiBHbGFzcyBVSSBTY3JlZW5zICg5OCUgVHJhbnNwYXJlbnQsIEZyb3N0ZWQgR2xhc3MsIG9yIENBRClcbiAgaWYgKC85OCV8a3J5c3RhbGljem58VWx0cmEtQ2xlYXIvaS50ZXN0KHByb21wdFRleHQpKSB7XG4gICAgcGFyc2VkLmh1ZFNjcmVlblN0eWxlID0gJ1N6a2xhbnkgRWtyYW4gS3J5c3RhbGljem55ICg5OCUgUHJ6ZXpyb2N6eXN0b8WbY2kpJztcbiAgICBwYXJzZWQuc2hvd0Zsb2F0aW5nSHVkUGFuZWxzID0gdHJ1ZTtcbiAgfSBlbHNlIGlmICgvRnJvc3RlZCBHbGFzc3xzemtsYW55Y2ggcGFuZWxpfG1sZWN6bm8tbGF3ZW5kb3d5Y2gvaS50ZXN0KHByb21wdFRleHQpKSB7XG4gICAgcGFyc2VkLmh1ZFNjcmVlblN0eWxlID0gJ1N6a2xhbnkgUGFuZWwgSW50ZXJha3R5d255IChGcm9zdGVkIEdsYXNzIFVJKSc7XG4gICAgcGFyc2VkLnNob3dGbG9hdGluZ0h1ZFBhbmVscyA9IHRydWU7XG4gIH0gZWxzZSBpZiAoL0NBRFxcL0JJTXxIb2xvZ3JhbSBUZWNobmljem55IENBRC9pLnRlc3QocHJvbXB0VGV4dCkpIHtcbiAgICBwYXJzZWQuaHVkU2NyZWVuU3R5bGUgPSAnSG9sb2dyYW0gVGVjaG5pY3pueSBDQUQgKENpZW1ueSBDeWphbiknO1xuICB9XG5cbiAgLy8gOS4gUGVuZHVsdW0gc3BlZWQgJVxuICBjb25zdCBwZW5kTWF0Y2ggPSBwcm9tcHRUZXh0Lm1hdGNoKFxuICAgIC8oPzpydWNoXFxzK3dhaGFkxYJvd3kuKnByxJlka2/Fm8SHfHBlbmR1bHVtLipzcGVlZClcXHMqKFxcZCspJS9pXG4gICk7XG4gIGlmIChwZW5kTWF0Y2gpIHtcbiAgICBwYXJzZWQucGVuZHVsdW1TcGVlZCA9IE1hdGgubWluKFxuICAgICAgMS4wLFxuICAgICAgTWF0aC5tYXgoMCwgcGFyc2VJbnQocGVuZE1hdGNoWzFdLCAxMCkgLyAxMDApXG4gICAgKTtcbiAgfVxuXG4gIC8vIDEwLiBQYXJhbGxheCBpbnRlbnNpdHkgJVxuICBjb25zdCBwYXJhTWF0Y2ggPSBwcm9tcHRUZXh0Lm1hdGNoKFxuICAgIC8oPzpwYXJhbGFrc3lcXHMrNkRvRlxccypcXChpbnRlbnN5d25vxZvEh3xwYXJhbGxheC4qZmFjdG9yKVxccyooXFxkKyg/OlxcLlxcZCspPyklPy9pXG4gICk7XG4gIGlmIChwYXJhTWF0Y2gpIHtcbiAgICBjb25zdCB2YWwgPSBwYXJzZUZsb2F0KHBhcmFNYXRjaFsxXSk7XG4gICAgcGFyc2VkLnBhcmFsbGF4SW50ZW5zaXR5ID0gdmFsID4gMiA/IHZhbCAvIDEwMCA6IHZhbDtcbiAgfVxuXG4gIHJldHVybiBwYXJzZWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGV4dHVhbFByb21wdFN1Z2dlc3Rpb24ge1xuICBpZDogc3RyaW5nO1xuICBzdGVwTnVtYmVyOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGNvbnRleHRSZWFzb246IHN0cmluZztcbiAgc25pcHBldFBMOiBzdHJpbmc7XG4gIHNuaXBwZXRFTjogc3RyaW5nO1xuICBpc01pc3NpbmdGcm9tUHJvbXB0OiBib29sZWFuO1xuICBpc1JlY29tbWVuZGVkTmV4dDogYm9vbGVhbjtcbiAgY29uZmlnUGF0Y2g/OiBQYXJ0aWFsPEFSU3R1ZGlvQ29uZmlnPjtcbn1cblxuLyoqXG4gKiBBbmFsaXp1amUgYWt0dWFsbmllIHdwaXNhbnkgdGVrc3QgcHJvbXB0dSBvcmF6IGJpZcW8xIVjeSBrb250ZWtzdCBzY2VueSAzRCAoQVJTdHVkaW9Db25maWcpXG4gKiBpIHp3cmFjYSBnb3Rvd2UsIGtvbnRla3N0b3dlIHBvZHBvd2llZHppIGRhbHN6eWNoIGVsZW1lbnTDs3cgcHJvbXB0dS5cbiAqIEVsZW1lbnR5LCBrdMOzcnljaCBqZXN6Y3plIGJyYWt1amUgdyB0ZWvFm2NpZSBwcm9tcHR1LCBzxIUgdHJha3Rvd2FuZSBwcmlvcnl0ZXRvd28gamFrb1xuICogbmF0dXJhbG5hIGtvbnR5bnVhY2phIG9waXN1IGtyb2sgcG8ga3Jva3UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250ZXh0dWFsUHJvbXB0U3VnZ2VzdGlvbnMoXG4gIHByb21wdFRleHQ6IHN0cmluZyxcbiAgY29uZmlnOiBBUlN0dWRpb0NvbmZpZ1xuKTogQ29udGV4dHVhbFByb21wdFN1Z2dlc3Rpb25bXSB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBwcm9tcHRUZXh0LnRyaW0oKTtcbiAgY29uc3Qgcm9vbVcgPSAoY29uZmlnLnJvb21XaWR0aE1ldGVycyA/PyAyMS4wKS50b0ZpeGVkKDEpO1xuICBjb25zdCByb29tRCA9IChjb25maWcucm9vbURlcHRoTWV0ZXJzID8/IDE4LjApLnRvRml4ZWQoMSk7XG4gIGNvbnN0IHRhYmxlVyA9IChjb25maWcudGFibGVXaWR0aE1ldGVycyA/PyA1LjQpLnRvRml4ZWQoMik7XG4gIGNvbnN0IHRhYmxlRCA9IChjb25maWcudGFibGVEZXB0aE1ldGVycyA/PyAyLjYpLnRvRml4ZWQoMik7XG4gIGNvbnN0IHRvdGFsQnVpbGRpbmdzID0gKGNvbmZpZy5idWlsZGluZ3NQZXJHcm91cCA/PyAzKSAqIDM7XG4gIGNvbnN0IGFwcHJveEhlaWdodE1ldGVycyA9IE1hdGgucm91bmQoKGNvbmZpZy5idWlsZGluZ0Zsb29yQ291bnQgPz8gODYpICogNC4yKTtcbiAgY29uc3Qgc2NhdHRlclBjdCA9IE1hdGgucm91bmQoKGNvbmZpZy5sYXlvdXREZXB0aFNjYXR0ZXIgPz8gMC44NSkgKiAxMDApO1xuICBjb25zdCBwZW5kdWx1bVBjdCA9IE1hdGgucm91bmQoKGNvbmZpZy5wZW5kdWx1bVNwZWVkID8/IDAuMTUpICogMTAwKTtcbiAgY29uc3QgcGFyYWxsYXhQY3QgPSBNYXRoLnJvdW5kKChjb25maWcucGFyYWxsYXhJbnRlbnNpdHkgPz8gMC44NSkgKiAxMDApO1xuICBjb25zdCBlbnZMaWdodGluZ1BjdCA9IE1hdGgucm91bmQoKGNvbmZpZy5lbnZMaWdodGluZ0ludGVuc2l0eSA/PyAxLjIpICogMTAwKTtcblxuICBjb25zdCBoYXNSb29tQW5kVGFibGUgPVxuICAgIC9zYWxbYWnEmV18d3ltaWFyfGJsYXR8c3RvxYJ8dGFibGV0b3B8cm9vbS9pLnRlc3Qobm9ybWFsaXplZCkgJiZcbiAgICBub3JtYWxpemVkLmxlbmd0aCA+IDI1O1xuICBjb25zdCBoYXNOb25saW5lYXI5MTYgPVxuICAgIC85OjE2fGFtZml0ZWF0cmFsbnxuaWVsaW5pb3d8a29uZHlnbmFjanxkaWFncmlkfEJJTS9pLnRlc3Qobm9ybWFsaXplZCk7XG4gIGNvbnN0IGhhc0dsYXNzU2NyZWVucyA9XG4gICAgLzk4JXxGcm9zdGVkIEdsYXNzfHN6a2xhbnljaHxwYW5lbGl8ZWtyYW7Ds3d8SFVEL2kudGVzdChub3JtYWxpemVkKTtcbiAgY29uc3QgaGFzTGlkYXJTY2FubmluZyA9XG4gICAgL0xpREFSfFRvRnxBUiBGb3VuZGF0aW9ufHNpYXRrW2HEhWVdfHDFgmFzemN6eXpufGNobXVyW2HEhWVdXFxzK3B1bmt0w7N3fEFuY2hvcnMvaS50ZXN0KFxuICAgICAgbm9ybWFsaXplZFxuICAgICk7XG4gIGNvbnN0IGhhc0xpZ2h0aW5nT2NjbHVzaW9uID1cbiAgICAvTGlnaHQgRXN0aW1hdGlvbnxQQlJ8b2tsdXpqfEVudmlyb25tZW50IERlcHRofG9kYmlbxIdjXXxtZ8WCW2F5xJldfF9Gb2dEZW5zaXR5L2kudGVzdChcbiAgICAgIG5vcm1hbGl6ZWRcbiAgICApO1xuICBjb25zdCBoYXNDYW1lcmFQYXJhbGxheCA9XG4gICAgL3dhaGFkxYJvd3xwYXJhbGFrc3w2RG9GfHBlbmR1bHVtfHBhcmFsbGF4L2kudGVzdChub3JtYWxpemVkKTtcbiAgY29uc3QgaGFzV2luZG93UG9ydGFsID1cbiAgICAvU3RlbmNpbCBQb3J0YWx8b2tuYW1pfGN6xIVzdGVjemt8bWV0cm9wb2xpfHphY2hvZHppZVxccytzxYJvxYRjYXxwecWCdS9pLnRlc3QoXG4gICAgICBub3JtYWxpemVkXG4gICAgKTtcbiAgY29uc3QgaGFzOGtSZW5kZXJPcHRpY3MgPVxuICAgIC84S3xwaHlzaWNhbGx5LWJhc2VkfGfFgsSZYmlhXFxzK29zdHJvxZtjaXxVUlB8SERSUHxET0YvaS50ZXN0KG5vcm1hbGl6ZWQpO1xuXG4gIGNvbnN0IHJhd1N1Z2dlc3Rpb25zOiBPbWl0PFxuICAgIENvbnRleHR1YWxQcm9tcHRTdWdnZXN0aW9uLFxuICAgICdpc1JlY29tbWVuZGVkTmV4dCdcbiAgPltdID0gW1xuICAgIHtcbiAgICAgIGlkOiAnY3R4X3Jvb21fdGFibGUnLFxuICAgICAgc3RlcE51bWJlcjogJzAxJyxcbiAgICAgIGNhdGVnb3J5OiAnQXJjaGl0ZWt0dXJhIFNhbGkgaSBTdMOzxYIgQVInLFxuICAgICAgdGl0bGU6IGBNb251bWVudGFsbmEgU2FsYSAoJHtyb29tV31tIMOXICR7cm9vbUR9bSkgaSBMdXN0cnphbnkgU3TDs8WCICgke3RhYmxlV31tIMOXICR7dGFibGVEfW0pYCxcbiAgICAgIGNvbnRleHRSZWFzb246IGhhc1Jvb21BbmRUYWJsZVxuICAgICAgICA/ICdaYWt0dWFsaXp1aiB3eW1pYXJ5IHNhbGkgZ290eWNrby1tb2Rlcm5pc3R5Y3puZWogb3JheiBwb2xlcm93YW5lZ28gYmxhdHUgc3RvxYJ1IGtvbmZlcmVuY3lqbmVnby4nXG4gICAgICAgIDogJ0JyYWsgb3Bpc3UgcHJ6ZXN0cnplbmkgZml6eWN6bmVqIOKAlCB6YWN6bmlqIG9kIHpkZWZpbmlvd2FuaWEgd3ltaWFyw7N3IHNhbGkgaSBsdXN0cnphbmVnbyBzdG/FgnUgemUgxZt3aWV0bGlzdMSFIG1hcMSFIMWbd2lhdGEuJyxcbiAgICAgIHNuaXBwZXRQTDogYFByemVkc3Rhd2lhasSFY2EgbW9udW1lbnRhbG7EhSBzYWzEmSBvIHd5bWlhcmFjaCAke3Jvb21XfW0gw5cgJHtyb29tRH1tIHoga2xhc3lueW1pIGdvdHlja28tbW9kZXJuaXN0eWN6bnltaSBza2xlcGllbmlhbWkgxYJ1a293eW1pIGkgZHXFvHltaSBwYW5vcmFtaWN6bnltaSBva25hbWksIG5hIMWbcm9ka3Uga3TDs3JlaiB6bmFqZHVqZSBzacSZIGx1c3RyemFueSBzdMOzxYIga29uZmVyZW5jeWpueSB6IGJsYXRlbSAke3RhYmxlV31tIMOXICR7dGFibGVEfW0gaSB3ecWbd2lldGxhY3plbSDFm3dpZXRsaXN0ZWogbWFweSDFm3dpYXRhLmAsXG4gICAgICBzbmlwcGV0RU46IGBEZXBpY3RpbmcgYSBtb251bWVudGFsICR7cm9vbVd9bSDDlyAke3Jvb21EfW0gR290aGljLW1vZGVybmlzdCBhcmNoZWQgaGFsbCB3aXRoIHBhbm9yYW1pYyB3aW5kb3dzIGFuZCBhIGNlbnRyYWwgJHt0YWJsZVd9bSDDlyAke3RhYmxlRH1tIHBvbGlzaGVkIG1pcnJvciBjb25mZXJlbmNlIHRhYmxlIGRpc3BsYXlpbmcgYSBsdW1pbm91cyB3b3JsZCBtYXAuYCxcbiAgICAgIGlzTWlzc2luZ0Zyb21Qcm9tcHQ6ICFoYXNSb29tQW5kVGFibGUsXG4gICAgICBjb25maWdQYXRjaDoge1xuICAgICAgICByb29tU2l6ZVByZXNldDogJ05pZXN0YW5kYXJkb3d5IHd5bWlhciBzYWxpJyxcbiAgICAgICAgdGFibGVTaXplUHJlc2V0OiAnTW9udW1lbnRhbG55IFN6dGFib3d5ICg1LjRtIMOXIDIuNm0pJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2N0eF9ub25saW5lYXJfOTE2X2JpbScsXG4gICAgICBzdGVwTnVtYmVyOiAnMDInLFxuICAgICAgY2F0ZWdvcnk6ICdGb3JtYWNqYSAzRCBpIFByb3BvcmNqZSA5OjE2JyxcbiAgICAgIHRpdGxlOiBgJHtjb25maWcuYnVpbGRpbmdMYXlvdXQuc3BsaXQoJyAoJylbMF19ICgke3RvdGFsQnVpbGRpbmdzfSBPYmlla3TDs3csICR7Y29uZmlnLmJ1aWxkaW5nRmxvb3JDb3VudH0gUGnEmXRlciwgVWvFgmFkIDk6MTYpYCxcbiAgICAgIGNvbnRleHRSZWFzb246IGhhc05vbmxpbmVhcjkxNlxuICAgICAgICA/ICdEb3ByZWN5enVqIG5pZWxpbmlvd3kgcm96cnp1dCBnxYLEmWJpIDNEIG9yYXogaG9yeXpvbnRhbG5lIHNrcnp5ZMWCYSA5OjE2IHogZGV0YWxhbWkga29uc3RydWtjeWpueW1pIEJJTS4nXG4gICAgICAgIDogJ1BvIG9waXNpZSBzdG/FgnUgZG9kYWogcm96bWllc3pjemVuaWUgMyB6ZXNwb8WCw7N3IGJ1ZHlua8OzdyB3IG5pZWxpbmlvd3ltIMWCdWt1IDNEIG9yYXogcHJvcG9yY2plIHBvemlvbWUgOToxNi4nLFxuICAgICAgc25pcHBldFBMOiBgTmEgYmxhY2llIG9zYWR6b25vIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSAzIHplc3BvxYJ5IGFyY2hpdGVrdG9uaWN6bmUgcm96bWllc3pjem9uZSBuaWVsaW5pb3dvIHcgZm9ybWFjamkgXCIke2NvbmZpZy5idWlsZGluZ0xheW91dH1cIiAocm96cnp1dCBnxYLEmWJpIDNEOiAke3NjYXR0ZXJQY3R9JSwgdGFrIGFieSBtb2RlbGUgbmllIHN0YcWCeSB3IGplZG5laiBsaW5paSksIGxpY3rEhWNlIHBvICR7Y29uZmlnLmJ1aWxkaW5nc1Blckdyb3VwfSBidWR5bmvDs3cgdyBncnVwaWUgKMWCxIVjem5pZSAke3RvdGFsQnVpbGRpbmdzfSBvYmlla3TDs3csIGRvICR7Y29uZmlnLmJ1aWxkaW5nRmxvb3JDb3VudH0ga29uZHlnbmFjamkgLyB+JHthcHByb3hIZWlnaHRNZXRlcnN9bSkgemFwcm9qZWt0b3dhbnljaCB3IHVrxYJhZHppZSBwb3ppb215bSA5OjE2IGpha28gcMOzxYJwcnplenJvY3p5c3RlIGLFgsSZa2l0bm8tesWCb3RlIGhvbG9ncmFteSBCSU0gKGVnem9zemtpZWxldCBkaWFncmlkb3d5LCBzdHJvcHkga29uZHlnbmFjamksIHN6eWJ5IHdpbmRvd2UgaSDFm3dpZXRsaXN0ZSByZHplbmllKS5gLFxuICAgICAgc25pcHBldEVOOiBgQW5jaG9yZWQgaW4gcmVhbCB0aW1lIG9uIHRoZSB0YWJsZXRvcCBhcmUgMyBhcmNoaXRlY3R1cmFsIGNsdXN0ZXJzIGluIGEgbm9uLWxpbmVhciBcIiR7Y29uZmlnLmJ1aWxkaW5nTGF5b3V0fVwiIGZvcm1hdGlvbiAoJHtzY2F0dGVyUGN0fSUgM0QgZGVwdGggc2NhdHRlciksIHdpdGggJHtjb25maWcuYnVpbGRpbmdzUGVyR3JvdXB9IGJ1aWxkaW5ncyBwZXIgZ3JvdXAgKCR7dG90YWxCdWlsZGluZ3N9IHN0cnVjdHVyZXMgdG90YWwsIHVwIHRvICR7Y29uZmlnLmJ1aWxkaW5nRmxvb3JDb3VudH0gZmxvb3JzIC8gfiR7YXBwcm94SGVpZ2h0TWV0ZXJzfW0pIGRlc2lnbmVkIGluIGhvcml6b250YWwgOToxNiBwcm9wb3J0aW9ucyBhcyB0cmFuc2x1Y2VudCBjeWFuLWFuZC1nb2xkIEJJTSBob2xvZ3JhbXMgd2l0aCBkaWFncmlkIGV4b3NrZWxldG9ucywgZmxvb3Igc2xhYnMsIGVsZXZhdG9yIHNoYWZ0cywgYW5kIGdsb3dpbmcgc3RydWN0dXJhbCBjb3Jlcy5gLFxuICAgICAgaXNNaXNzaW5nRnJvbVByb21wdDogIWhhc05vbmxpbmVhcjkxNixcbiAgICAgIGNvbmZpZ1BhdGNoOiB7XG4gICAgICAgIGJ1aWxkaW5nTGF5b3V0OiAnxYF1ayBBbWZpdGVhdHJhbG55IChQw7PFgmtvbGUgM0QpJyxcbiAgICAgICAgbW9kZWxPcmllbnRhdGlvbjkxNjogJ1VrxYJhZCBQb3ppb215IDk6MTYgKEhvcnl6b250YWxuZSBLb21wbGVrc3kpJyxcbiAgICAgICAgbGF5b3V0RGVwdGhTY2F0dGVyOiBNYXRoLm1heCgwLjc1LCBjb25maWcubGF5b3V0RGVwdGhTY2F0dGVyKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2N0eF9nbGFzc19zY3JlZW5zXzk4JyxcbiAgICAgIHN0ZXBOdW1iZXI6ICcwMycsXG4gICAgICBjYXRlZ29yeTogJ1N6a2xhbmUgRWtyYW55IEludGVyYWt0eXduZSBVSScsXG4gICAgICB0aXRsZTpcbiAgICAgICAgY29uZmlnLmh1ZFNjcmVlblN0eWxlID09PVxuICAgICAgICAnU3prbGFueSBFa3JhbiBLcnlzdGFsaWN6bnkgKDk4JSBQcnplenJvY3p5c3RvxZtjaSknXG4gICAgICAgICAgPyAnNSBLcnlzdGFsaWN6bnljaCBTemtsYW55Y2ggRWtyYW7Ds3cgKDk4JSBQcnplenJvY3p5c3RvxZtjaSknXG4gICAgICAgICAgOiAnV2FyaWFudCBLcnlzdGFsaWN6bnkgOTglIFByemV6cm9jenlzdG/Fm2NpIGx1YiBGcm9zdGVkIEdsYXNzIFVJJyxcbiAgICAgIGNvbnRleHRSZWFzb246ICFoYXNHbGFzc1NjcmVlbnNcbiAgICAgICAgPyAnV29rw7PFgiBidWR5bmvDs3cgYnJha3VqZSBqZXN6Y3plIG9waXN1IHVub3N6xIVjeWNoIHNpxJkgaW50ZXJha3R5d255Y2ggZWtyYW7Ds3cgc3prbGFueWNoIHogdGVsZW1ldHJpxIUgQklNLidcbiAgICAgICAgOiBjb25maWcuaHVkU2NyZWVuU3R5bGUgIT09XG4gICAgICAgICAgJ1N6a2xhbnkgRWtyYW4gS3J5c3RhbGljem55ICg5OCUgUHJ6ZXpyb2N6eXN0b8WbY2kpJ1xuICAgICAgICA/ICdLb250ZWtzdG93YSBwb2Rwb3dpZWTFujogd3pib2dhxIcgc2NlbsSZIG8gdWx0cmFwcnplanJ6eXN0ZSBzemtsYW5lIGVrcmFueSBwcnplenJvY3p5c3RlIHcgOTglICgyJSBrcnljaWEgdGFmbGkpLidcbiAgICAgICAgOiAnRG9wcmVjeXp1aiBwYXJhbWV0cnkgb3B0eWN6bmUgNSBla3JhbsOzdyBvIDk4JSBwcnplenJvY3p5c3RvxZtjaSB6IGRvbG55bSBkb2tpZW0gNCBwcnp5Y2lza8Ozdy4nLFxuICAgICAgc25pcHBldFBMOiBgV29rw7PFgiBidWR5bmvDs3cgdW5vc3rEhSBzacSZIDUgdWx0cmFwcnplanJ6eXN0eWNoLCBrcnlzdGFsaWN6bnljaCBzemtsYW55Y2ggZWtyYW7Ds3cgaW50ZXJha3R5d255Y2ggcHJ6ZXpyb2N6eXN0eWNoIHcgOTglIChVbHRyYS1DbGVhciA5OCUgVHJhbnNwYXJlbnQgT3B0aWNhbCBHbGFzcyBVSSwgemFsZWR3aWUgMiUgc3VidGVsbmVnbyBwb8WCeXNrdSB0YWZsaSwgYmV6IG1sZWN6bmVnbyB6YW1nbGVuaWEpIHogb3N0cnltaSBiaWHFgnltaSBtaWtyb2tyYXfEmWR6aWFtaSDFm3dpZXRsbnltaSwgYsWCxJlraXRuby1pbmR5Z28gdGVsZW1ldHJpxIUgQklNIG9yYXogZG9sbnltIHBhc2tpZW0gZG9rb3dhbmlhIHogNCBva3LEhWfFgnltaSBwcnp5Y2lza2FtaSBmdW5rY3lqbnltaS5gLFxuICAgICAgc25pcHBldEVOOiBgRmxvYXRpbmcgYXJvdW5kIHRoZSB0b3dlcnMgYXJlIDUgdWx0cmEtY2xlYXIgOTglIHRyYW5zcGFyZW50IG9wdGljYWwgY3J5c3RhbCBnbGFzcyBpbnRlcmFjdGl2ZSBzY3JlZW5zIChvbmx5IDIlIHN1cmZhY2Ugc2hlZW4sIHplcm8gbWlsa3kgaGF6ZSkgZmVhdHVyaW5nIGNyaXNwIHdoaXRlIG1pY3JvLXJpbSBoaWdobGlnaHRzLCBjeWFuLWluZGlnbyBCSU0gdGVsZW1ldHJ5IHR5cG9ncmFwaHksIGFuZCBhIGJvdHRvbSBkb2NrIHdpdGggNCBjaXJjdWxhciBhY3Rpb24gYnV0dG9ucy5gLFxuICAgICAgaXNNaXNzaW5nRnJvbVByb21wdDogIWhhc0dsYXNzU2NyZWVucyxcbiAgICAgIGNvbmZpZ1BhdGNoOiB7XG4gICAgICAgIHNob3dGbG9hdGluZ0h1ZFBhbmVsczogdHJ1ZSxcbiAgICAgICAgaHVkU2NyZWVuU3R5bGU6ICdTemtsYW55IEVrcmFuIEtyeXN0YWxpY3pueSAoOTglIFByemV6cm9jenlzdG/Fm2NpKScsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdjdHhfZ2xhc3Nfc2NyZWVuc19mcm9zdGVkJyxcbiAgICAgIHN0ZXBOdW1iZXI6ICcwM0InLFxuICAgICAgY2F0ZWdvcnk6ICdTemtsYW5lIEVrcmFueSBJbnRlcmFrdHl3bmUgVUknLFxuICAgICAgdGl0bGU6ICc1IE1sZWN6bm8tTGF3ZW5kb3d5Y2ggUGFuZWxpIFN6a2xhbnljaCAoRnJvc3RlZCBHbGFzcyBVSSknLFxuICAgICAgY29udGV4dFJlYXNvbjpcbiAgICAgICAgJ0FsdGVybmF0eXdueSB3YXJpYW50IG1hdGVyaWHFgm93eSB6ZSBzenJvbmlvbnltIHN6a8WCZW0gYWtyeWxvd3ltLCB6YW9rcsSFZ2xvbsSFIGJpYcWCxIUgcmFta8SFIGkgZmlvbGV0b3dvLWluZHlnbyB0eXBvZ3JhZmnEhS4nLFxuICAgICAgc25pcHBldFBMOiBgV29rw7PFgiBidWR5bmvDs3cgdW5vc3rEhSBzacSZIDUgcMOzxYJwcnplenJvY3p5c3R5Y2gsIG1sZWN6bm8tbGF3ZW5kb3d5Y2ggc3prbGFueWNoIHBhbmVsaSBpbnRlcmFrdHl3bnljaCAoRnJvc3RlZCBHbGFzcyBVSSkgeiB6YW9rcsSFZ2xvbnltaSBiaWHFgnltaSBrcmF3xJlkemlhbWkgxZt3aWV0bG55bWksIGZpb2xldG93by1pbmR5Z28gdHlwb2dyYWZpxIUgaSBkb2xueW0gcGFza2llbSBkb2tvd2FuaWEgeiA0IG9rcsSFZ8WCeW1pIHByenljaXNrYW1pIGZ1bmtjeWpueW1pLmAsXG4gICAgICBzbmlwcGV0RU46IGBGbG9hdGluZyBhcm91bmQgdGhlIGJ1aWxkaW5ncyBhcmUgNSB0cmFuc2x1Y2VudCBtaWxreS1sYXZlbmRlciBmcm9zdGVkIGdsYXNzIGludGVyYWN0aXZlIFVJIHBhbmVscyB3aXRoIGdsb3dpbmcgd2hpdGUgcm91bmRlZCBib3JkZXJzLCB2aW9sZXQtaW5kaWdvIHR5cG9ncmFwaHksIGFuZCBhIGJvdHRvbSBkb2NrIGJhciB3aXRoIDQgY2lyY3VsYXIgYnV0dG9ucy5gLFxuICAgICAgaXNNaXNzaW5nRnJvbVByb21wdDogZmFsc2UsXG4gICAgICBjb25maWdQYXRjaDoge1xuICAgICAgICBzaG93RmxvYXRpbmdIdWRQYW5lbHM6IHRydWUsXG4gICAgICAgIGh1ZFNjcmVlblN0eWxlOiAnU3prbGFueSBQYW5lbCBJbnRlcmFrdHl3bnkgKEZyb3N0ZWQgR2xhc3MgVUkpJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2N0eF9saWRhcl9wbGFuZXNfcG9pbnRjbG91ZCcsXG4gICAgICBzdGVwTnVtYmVyOiAnMDQnLFxuICAgICAgY2F0ZWdvcnk6ICdDenVqbmlraSBHxYLEmWJpIExpREFSIGkgQVIgRm91bmRhdGlvbicsXG4gICAgICB0aXRsZTogJ0RldGVrY2phIFDFgmFzemN6eXpuIEJsYXR1IGkgUG9zYWR6a2kgKyBDaG11cmEgUHVua3TDs3cgTGlEQVInLFxuICAgICAgY29udGV4dFJlYXNvbjogIWhhc0xpZGFyU2Nhbm5pbmdcbiAgICAgICAgPyAnRG9kYWogd2Fyc3R3xJkgxZtsZWR6ZW5pYSBwcnplc3RyemVubmVnbzogcm96cG96bmF3YW5pZSBibGF0dSBpIHBvZMWCb2dpIHByemV6IGN6dWpuaWsgTGlEQVIvVG9GIG9yYXoga290d2ljZSBBUiBBbmNob3JzLidcbiAgICAgICAgOiAnUm96d2nFhCBvcGlzIG8gYWt0eXduxIUgY2htdXLEmSBwdW5rdMOzdyAoUG9pbnQgQ2xvdWQgVmlzdWFsaXphdGlvbikgaSBrbGFzeWZpa2FjasSZIHd5c29rb8WbY2kgYmxhdHUgc3RvxYJ1LicsXG4gICAgICBzbmlwcGV0UEw6IGBQb3dpZXJ6Y2huaWEgYmxhdHUgc3RvxYJ1ICgke3RhYmxlV31tIMOXICR7dGFibGVEfW0pIG9yYXogcG9zYWR6a2EgcG9taWVzemN6ZW5pYSAoJHtyb29tV31tIMOXICR7cm9vbUR9bSkgc8SFIGFrdHl3bmllIHJvenBvem5hd2FuZSBwcnpleiBjenVqbmlraSBnxYLEmWJpIExpREFSL1RvRiB3IFVuaXR5IEFSIEZvdW5kYXRpb24gKCR7Y29uZmlnLmFyRnJhbWV3b3JrfSkgeiB3aWRvY3puxIUgc2lhdGvEhSBkZXRla2NqaSBwxYJhc3pjenl6biAoc3VyZmFjZSBwbGFuZSBkZXRlY3Rpb24gZ3JpZCksIHdpenVhbGl6YWNqxIUgY2htdXJ5IHB1bmt0w7N3IHNrYW5vd2FuaWEgKHBvaW50IGNsb3VkIHZpc3VhbGl6YXRpb24pIG9yYXogcHJlY3l6eWpueW0gemFrb3R3aWN6ZW5pZW0gemVzcG/FgsOzdyBidWR5bmvDs3cgKEFSIEFuY2hvcnMpLmAsXG4gICAgICBzbmlwcGV0RU46IGBCb3RoIHRoZSAke3RhYmxlV31tIMOXICR7dGFibGVEfW0gdGFibGV0b3AgYW5kIHRoZSAke3Jvb21XfW0gw5cgJHtyb29tRH1tIGZsb29yIHN1cmZhY2UgYXJlIGFjdGl2ZWx5IHRyYWNrZWQgYnkgTGlEQVIvVG9GIGRlcHRoIHNlbnNvcnMgdmlhIFVuaXR5IEFSIEZvdW5kYXRpb24gKCR7Y29uZmlnLmFyRnJhbWV3b3JrfSkgd2l0aCBhIHZpc2libGUgc3VyZmFjZSBwbGFuZSBkZXRlY3Rpb24gZ3JpZCwgbGl2ZSBMaURBUiBwb2ludCBjbG91ZCB2aXN1YWxpemF0aW9uLCBhbmQgcHJlY2lzaW9uIEFSIEFuY2hvcnMuYCxcbiAgICAgIGlzTWlzc2luZ0Zyb21Qcm9tcHQ6ICFoYXNMaWRhclNjYW5uaW5nLFxuICAgICAgY29uZmlnUGF0Y2g6IHtcbiAgICAgICAgc2hvd0RlcHRoR3JpZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2N0eF9saWdodGluZ19vY2NsdXNpb24nLFxuICAgICAgc3RlcE51bWJlcjogJzA1JyxcbiAgICAgIGNhdGVnb3J5OiAnT8Wbd2lldGxlbmllIFBCUiwgTWfFgmEgQXRtb3NmZXJ5Y3puYSBpIE9rbHV6amEnLFxuICAgICAgdGl0bGU6ICdFbnZpcm9ubWVudGFsIExpZ2h0IEVzdGltYXRpb24sIE1nxYJhIEF0bW9zZmVyeWN6bmEgaSBPa2x1emphIEfFgsSZYmknLFxuICAgICAgY29udGV4dFJlYXNvbjogIWhhc0xpZ2h0aW5nT2NjbHVzaW9uXG4gICAgICAgID8gJ0tvbGVqbnkgbmF0dXJhbG55IGtyb2s6IG9waXN6IHJlYWxpc3R5Y3puZSBvZGJpY2lhIGhvbG9ncmFtw7N3IHcgcG9sZXJvd2FueW0gYmxhY2llLCBtZ8WCxJkgYXRtb3NmZXJ5Y3puxIUgb3JheiBva2x1emrEmSBvYmlla3TDs3cgcnplY3p5d2lzdHljaC4nXG4gICAgICAgIDogJ1d6bW9jbmlqIHJlYWxpem0gZml6eWN6bnkgUEJSIChuYXTEmcW8ZW5pZSBvZGJpxIcgbmEgYmxhY2llLCBtZ8WCxJkgYXRtb3NmZXJ5Y3puxIUgX0ZvZ0RlbnNpdHkgb3JheiB3eWfFgmFkemFuaWUgbWFweSBnxYLEmWJpKS4nLFxuICAgICAgc25pcHBldFBMOiBgU2NlbmEgd3lrb3J6eXN0dWplIHphYXdhbnNvd2FuZSBvxZt3aWV0bGVuaWUgxZtyb2Rvd2lza293ZSAoRW52aXJvbm1lbnRhbCBMaWdodCBFc3RpbWF0aW9uLCBsdXN0cnphbmUgb2RiaWNpYSBQQlIgaG9sb2dyYW3Ds3cgbmEgcG9sZXJvd2FueW0gYmxhY2llIHN0b8WCdSBvIG5hdMSZxbxlbml1ICR7ZW52TGlnaHRpbmdQY3R9JSksIHdvbHVtZXRyeWN6bnkgZWZla3QgbWfFgnkgYXRtb3NmZXJ5Y3puZWogKF9Gb2dEZW5zaXR5KSBvcmF6IG9rbHV6asSZIGfFgsSZYmkgdyBjemFzaWUgcnplY3p5d2lzdHltICgke2NvbmZpZy5vY2NsdXNpb25Nb2RlfSkgeiB3eWfFgmFkemFuaWVtIHRlbXBvcmFsbnltIGtyYXfEmWR6aS5gLFxuICAgICAgc25pcHBldEVOOiBgVGhlIHNjZW5lIGxldmVyYWdlcyBFbnZpcm9ubWVudGFsIExpZ2h0IEVzdGltYXRpb24gd2l0aCBwaHlzaWNhbGx5LWJhc2VkIG1pcnJvciByZWZsZWN0aW9ucyAoJHtlbnZMaWdodGluZ1BjdH0lIGludGVuc2l0eSkgYWNyb3NzIHRoZSBwb2xpc2hlZCB0YWJsZXRvcCwgdm9sdW1ldHJpYyBhdG1vc3BoZXJpYyBmb2cgYXR0ZW51YXRpb24gKF9Gb2dEZW5zaXR5KSwgYW5kIHJlYWwtdGltZSAke2NvbmZpZy5vY2NsdXNpb25Nb2RlfSBkZXB0aCBvY2NsdXNpb24gd2l0aCB0ZW1wb3JhbCBlZGdlIHNtb290aGluZy5gLFxuICAgICAgaXNNaXNzaW5nRnJvbVByb21wdDogIWhhc0xpZ2h0aW5nT2NjbHVzaW9uLFxuICAgICAgY29uZmlnUGF0Y2g6IHtcbiAgICAgICAgZW52TGlnaHRpbmdJbnRlbnNpdHk6IE1hdGgubWF4KDEuMiwgY29uZmlnLmVudkxpZ2h0aW5nSW50ZW5zaXR5KSxcbiAgICAgICAgZW5hYmxlQXRtb3NwaGVyaWNGb2c6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdjdHhfY2FtZXJhX3BhcmFsbGF4XzZkb2YnLFxuICAgICAgc3RlcE51bWJlcjogJzA2JyxcbiAgICAgIGNhdGVnb3J5OiAnUnVjaCBLYW1lcnkgaSBQYXJhbGFrc2EgNkRvRicsXG4gICAgICB0aXRsZTogYFJ1Y2ggV2FoYWTFgm93eSBLYW1lcnkgKCR7cGVuZHVsdW1QY3R9JSkgaSBHxYLEmWJva2EgUGFyYWxha3NhIDZEb0YgKCR7cGFyYWxsYXhQY3R9JSlgLFxuICAgICAgY29udGV4dFJlYXNvbjogIWhhc0NhbWVyYVBhcmFsbGF4XG4gICAgICAgID8gJ0RvZGFqIG9waXMga2luZW1hdG9ncmFmaWkgQVI6IHDFgnlubnkgcnVjaCB3YWhhZMWCb3d5IGthbWVyeSBvcmF6IHdpZWxvd2Fyc3R3b3d5IGVmZWt0IHBhcmFsYWtzeSA2RG9GLidcbiAgICAgICAgOiAnRG9zdG9zdWogdyBwcm9tcGNpZSBkb2vFgmFkbsSFIHByxJlka2/Fm8SHIHdhaGFkxYJhIGthbWVyeSBvcmF6IHNpxYLEmSBnxYLEmWJpIHBhcmFsYWtzeSA2RG9GLicsXG4gICAgICBzbmlwcGV0UEw6IGBaYXN0b3N1aiBwxYJ5bm5pZSByZWd1bG93YW55IHJ1Y2ggd2FoYWTFgm93eSBrYW1lcnkgKHByxJlka2/Fm8SHICR7cGVuZHVsdW1QY3R9JSkgb3JheiBnxYLEmWJva2kgZWZla3QgcGFyYWxha3N5IDZEb0YgKGludGVuc3l3bm/Fm8SHICR7cGFyYWxsYXhQY3R9JSksIG9kc8WCYW5pYWrEhWN5IHdpZWxvd2Fyc3R3b3fEhSBnxYLEmWJpxJkgJHtjb25maWcuYnVpbGRpbmdGbG9vckNvdW50fSBrb25keWduYWNqaSwgc3p5YsOzdyB3aW5kb3d5Y2ggaSBzemtsYW55Y2ggZWtyYW7Ds3cgaW50ZXJha3R5d255Y2guYCxcbiAgICAgIHNuaXBwZXRFTjogYEFwcGx5IGEgc21vb3RobHkgcmVndWxhdGVkIGNhbWVyYSBwZW5kdWx1bSBtb3Rpb24gKCR7cGVuZHVsdW1QY3R9JSBzcGVlZCkgY29tYmluZWQgd2l0aCBkZWVwIDZEb0YgbW90aW9uIHBhcmFsbGF4ICgke3BhcmFsbGF4UGN0fSUgaW50ZW5zaXR5KSwgcmV2ZWFsaW5nIHRoZSBtdWx0aS1sYXllcmVkIGRlcHRoIG9mIGFsbCAke2NvbmZpZy5idWlsZGluZ0Zsb29yQ291bnR9IGZsb29ycywgZWxldmF0b3IgY29yZXMsIGFuZCBmbG9hdGluZyBnbGFzcyBzY3JlZW5zLmAsXG4gICAgICBpc01pc3NpbmdGcm9tUHJvbXB0OiAhaGFzQ2FtZXJhUGFyYWxsYXgsXG4gICAgICBjb25maWdQYXRjaDoge1xuICAgICAgICBwYXJhbGxheEludGVuc2l0eTogTWF0aC5tYXgoMC44NSwgY29uZmlnLnBhcmFsbGF4SW50ZW5zaXR5KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ2N0eF93aW5kb3dfc3RlbmNpbF9wb3J0YWwnLFxuICAgICAgc3RlcE51bWJlcjogJzA3JyxcbiAgICAgIGNhdGVnb3J5OiAnUG9ydGFsIE9raWVubnkgaSBBdG1vc2ZlcmEnLFxuICAgICAgdGl0bGU6ICdFZmVrdHkgQ3rEhXN0ZWN6a293ZSB6YSBPa25hbWkgaSBNYXNrYSBHxYLEmWJpIChTdGVuY2lsIFBvcnRhbCknLFxuICAgICAgY29udGV4dFJlYXNvbjogIWhhc1dpbmRvd1BvcnRhbFxuICAgICAgICA/ICdXemJvZ2HEhyB0xYJvIHphIMWCdWtvd3ltaSBva25hbWkgbyBjesSFc3RlY3praSDFm3dpZXRsbmVnbyBwecWCdSBpIHJ1Y2ggcG93aWV0cnpueSBtZXRyb3BvbGlpIG9kc2VwYXJvd2FueSBtYXNrxIUgU3RlbmNpbCBQb3J0YWwuJ1xuICAgICAgICA6ICdSb3pidWR1aiBvcGlzIGF0bW9zZmVyeSB6YSBwYW5vcmFtaWN6bnltaSBva25hbWkgbyB3b2x1bWV0cnljem5lIHNtdWdpIHphY2hvZHUgc8WCb8WEY2EuJyxcbiAgICAgIHNuaXBwZXRQTDogYFphIMWCdWtvd3ltaSBva25hbWkgcG9taWVzemN6ZW5pYSBkb2RhaiBkeW5hbWljem5lIGVmZWt0eSBjesSFc3RlY3prb3dlIHVub3N6xIVjZWdvIHNpxJkgcHnFgnUgxZt3aWV0bG5lZ28sIGN6xIVzdGVrIGF0bW9zZmVyeWN6bnljaCBvcmF6IMWbd2lldGxpc3R5Y2ggc3RydW1pZW5pIHJ1Y2h1IHBvd2lldHJ6bmVnbyBmdXR1cnlzdHljem5laiBtZXRyb3BvbGlpIG8gemFjaG9kemllIHPFgm/FhGNhICgke2NvbmZpZy53aW5kb3dQYXJ0aWNsZXN9KSwgb2RzZXBhcm93YW5lIG1hc2vEhSBnxYLEmWJpIChTdGVuY2lsIFBvcnRhbCkuYCxcbiAgICAgIHNuaXBwZXRFTjogYEJlaGluZCB0aGUgYXJjaGVkIHBhbm9yYW1pYyB3aW5kb3dzLCByZW5kZXIgZHluYW1pYyB2b2x1bWV0cmljIGR1c3QgbW90ZXMsIGF0bW9zcGhlcmljIHBhcnRpY2xlcywgYW5kIGdsb3dpbmcgYWVyaWFsIHRyYWZmaWMgc3RyZWFtcyBvZiBhIGZ1dHVyaXN0aWMgc3Vuc2V0IG1ldHJvcG9saXMgKCR7Y29uZmlnLndpbmRvd1BhcnRpY2xlc30pLCBtYXNrZWQgY2xlYW5seSB2aWEgYSBHUFUgU3RlbmNpbCBQb3J0YWwuYCxcbiAgICAgIGlzTWlzc2luZ0Zyb21Qcm9tcHQ6ICFoYXNXaW5kb3dQb3J0YWwsXG4gICAgICBjb25maWdQYXRjaDoge1xuICAgICAgICB3aW5kb3dQYXJ0aWNsZURlbnNpdHk6IE1hdGgubWF4KDEuMCwgY29uZmlnLndpbmRvd1BhcnRpY2xlRGVuc2l0eSksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdjdHhfOGtfdXJwX29wdGljcycsXG4gICAgICBzdGVwTnVtYmVyOiAnMDgnLFxuICAgICAgY2F0ZWdvcnk6ICdGaW5hbGl6YWNqYSBSZW5kZXJ1IDhLJyxcbiAgICAgIHRpdGxlOiBgRG9ta25pxJljaWUgUHJvbXB0dTogUm96ZHppZWxjem/Fm8SHIDhLLCAke2NvbmZpZy5yZW5kZXJQaXBlbGluZX0sIEtpbm93YSBHxYLEmWJpYSBPc3Ryb8WbY2lgLFxuICAgICAgY29udGV4dFJlYXNvbjogIWhhczhrUmVuZGVyT3B0aWNzXG4gICAgICAgID8gJ0RvbWtuaWogcHJvbXB0IHBhcmFtZXRyYW1pIGpha2/Fm2NpIHByb2R1a2N5am5lajogcm96ZHppZWxjem/Fm8SHIDhLLCBQQlIsIGtpbm93eSBib2tlaCBpIG1pa3JvZGV0YWxlIEJJTS4nXG4gICAgICAgIDogJ1BvZGtyZcWbbCBraW5vd8SFIG9wdHlrxJkgb2JpZWt0eXd1LCBhYmVycmFjasSZIGNocm9tYXR5Y3puxIUgbmEga3Jhd8SZZHppYWNoIGhvbG9ncmFtw7N3IGkgcHJlY3l6asSZIEJJTS4nLFxuICAgICAgc25pcHBldFBMOiBgV3lyZW5kZXJvd2FubyB3IHNpbG5pa3UgJHtjb25maWcucmVuZGVyUGlwZWxpbmV9IHcgcm96ZHppZWxjem/Fm2NpIDhLLCBwaHlzaWNhbGx5LWJhc2VkIHJlbmRlcmluZyAoUEJSKSwga2lub3dhIGfFgsSZYmlhIG9zdHJvxZtjaSAoc2hhbGxvdyBEb0YgYm9rZWgpLCBmb3RvcmVhbGlzdHljem5lIG1pa3JvZGV0YWxlIGtvbnN0cnVrY3lqbmUgQklNIGkgYnJhayBhcnRlZmFrdMOzdyBrb21wcmVzamkuYCxcbiAgICAgIHNuaXBwZXRFTjogYFJlbmRlcmVkIGluICR7Y29uZmlnLnJlbmRlclBpcGVsaW5lfSBhdCA4SyByZXNvbHV0aW9uLCBwaHlzaWNhbGx5LWJhc2VkIHJlbmRlcmluZyAoUEJSKSwgY2luZW1hdGljIHNoYWxsb3cgZGVwdGggb2YgZmllbGQgYm9rZWgsIHVsdHJhLWNyaXNwIHN0cnVjdHVyYWwgQklNIG1pY3JvLWRldGFpbHMsIHBob3RvcmVhbGlzdGljIHNwYXRpYWwgY29tcHV0aW5nIGFlc3RoZXRpY3MuYCxcbiAgICAgIGlzTWlzc2luZ0Zyb21Qcm9tcHQ6ICFoYXM4a1JlbmRlck9wdGljcyxcbiAgICB9LFxuICBdO1xuXG4gIC8vIFNvcnQ6IG1pc3NpbmcgZWxlbWVudHMgZnJvbSB0aGUgY3VycmVudCBwcm9tcHQgdGV4dCBjb21lIGZpcnN0IGluIGxvZ2ljYWwgb3JkZXJcbiAgY29uc3Qgc29ydGVkID0gWy4uLnJhd1N1Z2dlc3Rpb25zXS5zb3J0KChhLCBiKSA9PiB7XG4gICAgaWYgKGEuaXNNaXNzaW5nRnJvbVByb21wdCAhPT0gYi5pc01pc3NpbmdGcm9tUHJvbXB0KSB7XG4gICAgICByZXR1cm4gYS5pc01pc3NpbmdGcm9tUHJvbXB0ID8gLTEgOiAxO1xuICAgIH1cbiAgICByZXR1cm4gYS5zdGVwTnVtYmVyLmxvY2FsZUNvbXBhcmUoYi5zdGVwTnVtYmVyKTtcbiAgfSk7XG5cbiAgbGV0IG1hcmtlZEZpcnN0TWlzc2luZyA9IGZhbHNlO1xuICByZXR1cm4gc29ydGVkLm1hcCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGlzUmVjb21tZW5kZWROZXh0ID0gaXRlbS5pc01pc3NpbmdGcm9tUHJvbXB0ICYmICFtYXJrZWRGaXJzdE1pc3Npbmc7XG4gICAgaWYgKGlzUmVjb21tZW5kZWROZXh0KSB7XG4gICAgICBtYXJrZWRGaXJzdE1pc3NpbmcgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgLi4uaXRlbSxcbiAgICAgIGlzUmVjb21tZW5kZWROZXh0LFxuICAgIH07XG4gIH0pO1xufVxuXG5cbmV4cG9ydCBjb25zdCBQUk9NUFRfQU5BVE9NWV9MQVlFUlM6IFByb21wdExheWVyQnJlYWtkb3duW10gPSBbXG4gIHtcbiAgICBpZDogJ2xheWVyX2hvbG9ncmFtJyxcbiAgICBudW1iZXI6ICcwMScsXG4gICAgdGl0bGU6ICdNb2RlbGUgSG9sb2dyYW1vd2UgaSBEZXRhbGUgQXJjaGl0ZWt0b25pY3puZSBCSU0nLFxuICAgIHB1cnBvc2U6XG4gICAgICAnRGVmaW5pdWplIHN0cnVrdHVyxJkgZ2VvbWV0cnljem7EhSB3aWXFvG93Y8OzdyAoZWd6b3N6a2llbGV0IGRpYWdyaWRvd3ksIHJkemVuaWUsIHN0cm9weSkgb3JheiB3xYJhxZtjaXdvxZtjaSBvcHR5Y3puZSBzaGFkZXJhIGhvbG9ncmFtdS4nLFxuICAgIHBvbGlzaFNuaXBwZXQ6XG4gICAgICAndHLDs2p3eW1pYXJvd2UgbW9kZWxlIGZ1dHVyeXN0eWN6bnljaCB3aWXFvG93Y8OzdyB3ecWbd2lldGxhbmUgdyBjemFzaWUgcnplY3p5d2lzdHltIGpha28gcMOzxYJwcnplenJvY3p5c3RlIGLFgsSZa2l0bm8tesWCb3RlIGhvbG9ncmFteSB6IGRldGFsYW1pIGFyY2hpdGVrdG9uaWN6bnltaSBCSU06IHpld27EmXRyem7EhSBrcmF0b3duaWPEhSBkaWFncmlkb3fEhSwgc3Ryb3BhbWkga29uZHlnbmFjamksIHJkemVuaWVtIGtvbnN0cnVrY3lqbnltIGkgYm9jem55bWkgcGFuZWxhbWkgSFVEJyxcbiAgICBlbmdsaXNoU25pcHBldDpcbiAgICAgICdyZWFsLXRpbWUgM0QgZnV0dXJpc3RpYyBza3lzY3JhcGVycyByZW5kZXJlZCBhcyB0cmFuc2x1Y2VudCBjeWFuLWFuZC1nb2xkIGFyY2hpdGVjdHVyYWwgQklNIGhvbG9ncmFtcyB3aXRoIGludHJpY2F0ZSBwYXJhbWV0cmljIGRpYWdyaWQgZXhvc2tlbGV0b25zLCBpbnRlcm5hbCBmbG9vciBzbGFicywgc3RydWN0dXJhbCBjb3JlcywgYW5kIGZsb2F0aW5nIGdsYXNzIEhVRCBwYW5lbHMnLFxuICAgIHVuaXR5Q29tcG9uZW50OiAnQ3VzdG9tIFVSUCBIb2xvZ3JhbSBTaGFkZXIgKEZyZXNuZWwgKyBXb3JsZC1TcGFjZSBTY2FubGluZXMgKyBBZGRpdGl2ZSBDb3JlIFBhc3MpJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnbGF5ZXJfcGxhbmVzJyxcbiAgICBudW1iZXI6ICcwMicsXG4gICAgdGl0bGU6ICdSb3pwb3puYXdhbmllIFDFgmFzemN6eXpuIEJsYXR1IGkgUG9kxYJvZ2kgKEN6dWpuaWtpIEfFgsSZYmkpJyxcbiAgICBwdXJwb3NlOlxuICAgICAgJ0luc3RydXVqZSBtb2RlbC9zaWxuaWssIGFieSB1xbx5xYIgc2thbmVyYSBMaURBUi9Ub0YgZG8gcm96csOzxbxuaWVuaWEgd3lzb2tvxZtjaSBibGF0dSBzdG/FgnUgb2QgcG9kxYJvZ2kgaSBvc2FkemnFgiBvYmlla3R5IG5hIHN0YWJpbG55Y2gga290d2ljYWNoLicsXG4gICAgcG9saXNoU25pcHBldDpcbiAgICAgICdwb3dpZXJ6Y2huaWUgYmxhdHUgc3RvxYJ1IG9yYXogcG9kxYJvZ2kgc8SFIGFrdHl3bmllIHJvenBvem5hd2FuZSBwcnpleiBjenVqbmlraSBnxYLEmWJpIChMaURBUiAvIFRvRikgeiB3aWRvY3puxIUgc2lhdGvEhSBkZXRla2NqaSBwxYJhc3pjenl6biAoc3VyZmFjZSBwbGFuZSBkZXRlY3Rpb24gbWVzaCkgaSBwcmVjeXp5am55bSBvc2FkemVuaWVtIG9iaWVrdMOzdyBuYSBrb3R3aWNhY2ggcHJ6ZXN0cnplbm55Y2gnLFxuICAgIGVuZ2xpc2hTbmlwcGV0OlxuICAgICAgJ3RhYmxldG9wIGFuZCBmbG9vciBzdXJmYWNlcyBhcmUgYWN0aXZlbHkgcmVjb2duaXplZCBieSBoYXJkd2FyZSBkZXB0aCBzZW5zb3JzIChMaURBUiAvIFRvRikgZGlzcGxheWluZyBhIGNhbGlicmF0ZWQgc3VyZmFjZSBwbGFuZSBkZXRlY3Rpb24gbWVzaCBmb3IgYWNjdXJhdGUgc3BhdGlhbCBhbmNob3IgcGxhY2VtZW50JyxcbiAgICB1bml0eUNvbXBvbmVudDogJ0FSUGxhbmVNYW5hZ2VyIChIb3Jpem9udGFsVXApICsgQVJSYXljYXN0TWFuYWdlciArIEFSQW5jaG9yTWFuYWdlciArIEhlaWdodCBDbGFzc2lmaWVyJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnbGF5ZXJfZnJhbWV3b3JrcycsXG4gICAgbnVtYmVyOiAnMDMnLFxuICAgIHRpdGxlOiAnRnJhbWV3b3JraSBBUktpdCAvIEFSQ29yZSBpIFNpbG5payBVbml0eSAoVVJQL0hEUlApJyxcbiAgICBwdXJwb3NlOlxuICAgICAgJ09rcmXFm2xhIHN0b3MgdGVjaG5vbG9naWN6bnkgemFwZXduaWFqxIVjeSBuYXR5d25lIMWbbGVkemVuaWUgU0xBTSA2RG9GLCBzaWF0a293YW5pZSBwcnplc3RyemVuaSBpIGZpenljem5lIHJlbmRlcm93YW5pZS4nLFxuICAgIHBvbGlzaFNuaXBwZXQ6XG4gICAgICAncHJ6eSB1xbx5Y2l1IGZyYW1ld29ya8OzdyBBcHBsZSBBUktpdCA2IG9yYXogR29vZ2xlIEFSQ29yZSBEZXB0aCBBUEkgeiBvYnPFgnVnxIUgcGxhbsOzdyBwb3dpZXJ6Y2huaSAoQVIgRm91bmRhdGlvbikgd2V3bsSFdHJ6IHNpbG5pa2EgVW5pdHkgVVJQIHcgY3phc2llIHJ6ZWN6eXdpc3R5bScsXG4gICAgZW5nbGlzaFNuaXBwZXQ6XG4gICAgICAncG93ZXJlZCBieSBBcHBsZSBBUktpdCA2IGFuZCBHb29nbGUgQVJDb3JlIERlcHRoIEFQSSB3aXRoIHN1cmZhY2UgcGxhbmUgdHJhY2tpbmcgdmlhIFVuaXR5IEFSIEZvdW5kYXRpb24gaW4gVW5pdmVyc2FsIFJlbmRlciBQaXBlbGluZSAoVVJQKScsXG4gICAgdW5pdHlDb21wb25lbnQ6ICdYUk9yaWdpbiArIEFSU2Vzc2lvbiArIFVuaXZlcnNhbFJlbmRlclBpcGVsaW5lQXNzZXQgKEhEUiArIEJsb29tKScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2xheWVyX2xpZ2h0aW5nX29jY2x1c2lvbicsXG4gICAgbnVtYmVyOiAnMDQnLFxuICAgIHRpdGxlOiAnT8Wbd2lldGxlbmllIMWacm9kb3dpc2tvd2UgaSBPa2x1emphIEfFgsSZYmknLFxuICAgIHB1cnBvc2U6XG4gICAgICAnU3ByYXdpYSwgxbxlIGhvbG9ncmFtIHJlYWd1amUgbmEgxZt3aWF0xYJvIHogb2tpZW4gc2FsaSwgcnp1Y2Egb2RiaWNpYSBuYSBibGF0IGkgamVzdCByZWFsaXN0eWN6bmllIHphc8WCYW5pYW55IHByemV6IGJsacW8c3plIG1lYmxlLicsXG4gICAgcG9saXNoU25pcHBldDpcbiAgICAgICd6ZSB3c3BhcmNpZW0gZGxhIGVzdHltYWNqaSBvxZt3aWV0bGVuaWEgxZtyb2Rvd2lza293ZWdvIChvZGJpY2lhIFBCUiBuYSBwb2xlcm93YW55bSBibGFjaWUsIGhhcm1vbmlraSBzZmVyeWN6bmUpIG9yYXogb2tsdXpqaSBnxYLEmWJpIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSwgZ2R6aWUgZm90ZWxlIGkgb2JpZWt0eSBwaWVyd3N6b3BsYW5vd2UgbmF0dXJhbG5pZSBwcnplc8WCYW5pYWrEhSBob2xvZ3JhbScsXG4gICAgZW5nbGlzaFNuaXBwZXQ6XG4gICAgICAnd2l0aCByZWFsLXRpbWUgZW52aXJvbm1lbnRhbCBsaWdodCBlc3RpbWF0aW9uIChzcGhlcmljYWwgaGFybW9uaWNzLCBzcGVjdWxhciB0YWJsZXRvcCByZWZsZWN0aW9ucykgYW5kIGhhcmR3YXJlIGRlcHRoIG9jY2x1c2lvbiB3aGVyZSBmb3JlZ3JvdW5kIGNoYWlycyBhY2N1cmF0ZWx5IG1hc2sgdGhlIGhvbG9ncmFtJyxcbiAgICB1bml0eUNvbXBvbmVudDogJ0FSQ2FtZXJhTWFuYWdlci5mcmFtZVJlY2VpdmVkICsgQVJPY2NsdXNpb25NYW5hZ2VyIChFbnZpcm9ubWVudERlcHRoTW9kZS5CZXN0KScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2xheWVyX3BhcmFsbGF4JyxcbiAgICBudW1iZXI6ICcwNScsXG4gICAgdGl0bGU6ICdHxYLEmWJpYSBPYnJhenUgaSBFZmVrdCBQYXJhbGFrc3kgdyBSdWNodSAoNkRvRiknLFxuICAgIHB1cnBvc2U6XG4gICAgICAnV3ltdXN6YSB3aWVsb3BsYW5vd2/Fm8SHIHNjZW55IHBvZGN6YXMgcG9ydXN6YW5pYSB1cnrEhWR6ZW5pZW0gd29rw7PFgiBzdG/FgnUgKHByemVzdW5pxJljaWUga8SFdG93ZSBtacSZZHp5IHBpZXJ3c3p5bSBwbGFuZW0sIHJkemVuaWVtIHdpZcW8IGkgdMWCZW0pLicsXG4gICAgcG9saXNoU25pcHBldDpcbiAgICAgICd1dHfDs3J6IHd5cmHFum55IGVmZWt0IHBhcmFsYWtzeSA2RG9GIHBvendhbGFqxIVjeSBuYSB1enlza2FuaWUgd2llbG93YXJzdHdvd2VqIGfFgsSZYmkgb2JyYXp1IGkgcGVyc3Bla3R5d3kgcG9kY3phcyBwb3J1c3phbmlhIHVyesSFZHplbmllbSB3b2vDs8WCIG1vZGVsdSBhcmNoaXRla3Rvbmljem5lZ28nLFxuICAgIGVuZ2xpc2hTbmlwcGV0OlxuICAgICAgJ2NyZWF0ZSBwcm9ub3VuY2VkIDZEb0YgbW90aW9uIHBhcmFsbGF4IGRlbGl2ZXJpbmcgbXVsdGktcGxhbmUgc3BhdGlhbCBkZXB0aCBiZXR3ZWVuIGludGVybmFsIGJ1aWxkaW5nIGNvcmVzLCBmbG9hdGluZyBIVURzLCBhbmQgYmFja2dyb3VuZCBhcmNoZXMgYXMgdGhlIGRldmljZSBtb3ZlcyBhcm91bmQgdGhlIG1vZGVsJyxcbiAgICB1bml0eUNvbXBvbmVudDogJ1RyYWNrZWRQb3NlRHJpdmVyICg2RG9GKSArIFRhbmdlbnQtU3BhY2UgUGFyYWxsYXggT2Zmc2V0IFNoYWRlciArIEd5cm8gU21vb3RoaW5nJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnbGF5ZXJfd2luZG93X3BhcnRpY2xlcycsXG4gICAgbnVtYmVyOiAnMDYnLFxuICAgIHRpdGxlOiAnRHluYW1pY3puZSBFZmVrdHkgQ3rEhXN0ZWN6a293ZSBaYSBPa25hbWkgUG9taWVzemN6ZW5pYScsXG4gICAgcHVycG9zZTpcbiAgICAgICdEb2RhamUgxbx5d8SFIHdhcnN0d8SZIGF0bW9zZmVyeWN6bsSFIHphIMWCdWtvd3ltaSBva25hbWkgKG9kc2VwYXJvd2FuxIUgbWFza8SFIGfFgsSZYmkvc3phYmxvbnUpLCBuaWUgemHFm21pZWNhasSFYyB3bsSZdHJ6YSBuYWQgc3RvxYJlbS4nLFxuICAgIHBvbGlzaFNuaXBwZXQ6XG4gICAgICAnYmV6cG/Fm3JlZG5pbyB6YSDFgnVrb3d5bWkgb2tuYW1pIHBvbWllc3pjemVuaWEgZG9kYWogZHluYW1pY3puZSBlZmVrdHkgY3rEhXN0ZWN6a293ZSAoxZt3aWV0bGlzdHkgcHnFgiBhdG1vc2Zlcnljem55LCBzbXVnaSBydWNodSBwb3dpZXRyem5lZ28gaSBzdHJ1bWllbmllIGRhbnljaCkgb3NhZHpvbmUgdyBnxYLEmWJpIHNjZW55IHpld27EmXRyem5laiBwcnpleiBtYXNrxJkgcG9ydGFsdSBva2llbm5lZ28nLFxuICAgIGVuZ2xpc2hTbmlwcGV0OlxuICAgICAgJ2RpcmVjdGx5IG91dHNpZGUgdGhlIGFyY2hlZCByb29tIHdpbmRvd3MsIGFkZCBkeW5hbWljIHZvbHVtZXRyaWMgcGFydGljbGUgZWZmZWN0cyAoYXRtb3NwaGVyaWMgbGlnaHQgc3BvcmVzIGFuZCBhZXJpYWwgc3RyZWFtcykgbWFza2VkIHZpYSBzdGVuY2lsIHdpbmRvdyBwb3J0YWxzIGluIHRoZSBiYWNrZ3JvdW5kIGRlcHRoJyxcbiAgICB1bml0eUNvbXBvbmVudDogJ1VuaXR5IFZGWCBHcmFwaCAvIFBhcnRpY2xlU3lzdGVtICsgU3RlbmNpbCBCdWZmZXIgV2luZG93IFBvcnRhbCBNYXNrIChSZWYgMiwgQ29tcCBFcXVhbCknLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IFVOSVRZX0NPREVfU0NSSVBUUzogVW5pdHlDb2RlU2NyaXB0W10gPSBbXG4gIHtcbiAgICBpZDogJ3BsYW5lX3BsYWNlbWVudCcsXG4gICAgZmlsZW5hbWU6ICdBUlN1cmZhY2VQbGFuZVBsYWNlbWVudC5jcycsXG4gICAgdGl0bGU6ICcxLiBEZXRla2NqYSBCbGF0dSBpIFBvZMWCb2dpICsgT3NhZHphbmllIE1vZGVsaSAoQVJLaXQgLyBBUkNvcmUpJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdSb3pwb3puYWplIHDFgmFzemN6eXpueSBwb3ppb21lIHogY3p1am5pa8OzdyBnxYLEmWJpLCByb3pyw7PFvG5pYSB3eXNva2/Fm8SHIGJsYXR1IHN0b8WCdSBvZCBwb2TFgm9naSBwb21pZXN6Y3plbmlhIGkga290d2ljenkgaG9sb2dyYW0gYXJjaGl0ZWt0b25pY3pueSAoQVJBbmNob3IpLicsXG4gICAgbGFuZ3VhZ2U6ICdjc2hhcnAnLFxuICAgIGNvZGU6IGB1c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcbnVzaW5nIFVuaXR5RW5naW5lO1xudXNpbmcgVW5pdHlFbmdpbmUuWFIuQVJGb3VuZGF0aW9uO1xudXNpbmcgVW5pdHlFbmdpbmUuWFIuQVJTdWJzeXN0ZW1zO1xuXG5bUmVxdWlyZUNvbXBvbmVudCh0eXBlb2YoQVJQbGFuZU1hbmFnZXIpLCB0eXBlb2YoQVJSYXljYXN0TWFuYWdlciksIHR5cGVvZihBUkFuY2hvck1hbmFnZXIpKV1cbnB1YmxpYyBjbGFzcyBBUlN1cmZhY2VQbGFuZVBsYWNlbWVudCA6IE1vbm9CZWhhdmlvdXJcbntcbiAgICBbSGVhZGVyKFwiUHJlZmFieSBBcmNoaXRla3Rvbmljem5lIEFSXCIpXVxuICAgIFtTZXJpYWxpemVGaWVsZF0gcHJpdmF0ZSBHYW1lT2JqZWN0IGhvbG9ncmFwaGljQ2l0eVRhYmxlUHJlZmFiO1xuICAgIFtTZXJpYWxpemVGaWVsZF0gcHJpdmF0ZSBNYXRlcmlhbCB0YWJsZXRvcEdyaWRNYXRlcmlhbDtcbiAgICBbU2VyaWFsaXplRmllbGRdIHByaXZhdGUgTWF0ZXJpYWwgZmxvb3JHcmlkTWF0ZXJpYWw7XG5cbiAgICBbSGVhZGVyKFwiS2xhc3lmaWthY2phIFd5c29rb8WbY2kgKEN6dWpuaWsgR8WCxJliaSlcIildXG4gICAgW1Rvb2x0aXAoXCJSw7PFvG5pY2Egd3lzb2tvxZtjaSBZIHd6Z2zEmWRlbSBuYWpuacW8c3plaiB3eWtyeXRlaiBwb2TFgm9naSB1em5hd2FuYSB6YSBibGF0IHN0b8WCdSAodyBtZXRyYWNoKVwiKV1cbiAgICBbU2VyaWFsaXplRmllbGRdIHByaXZhdGUgZmxvYXQgbWluVGFibGVFbGV2YXRpb25BYm92ZUZsb29yID0gMC41NWY7XG4gICAgW1NlcmlhbGl6ZUZpZWxkXSBwcml2YXRlIGZsb2F0IG1heFRhYmxlRWxldmF0aW9uQWJvdmVGbG9vciA9IDEuMTVmO1xuXG4gICAgcHJpdmF0ZSBBUlBsYW5lTWFuYWdlciBfcGxhbmVNYW5hZ2VyO1xuICAgIHByaXZhdGUgQVJSYXljYXN0TWFuYWdlciBfcmF5Y2FzdE1hbmFnZXI7XG4gICAgcHJpdmF0ZSBBUkFuY2hvck1hbmFnZXIgX2FuY2hvck1hbmFnZXI7XG5cbiAgICBwcml2YXRlIGZsb2F0IF9sb3dlc3RGbG9vclkgPSBmbG9hdC5NYXhWYWx1ZTtcbiAgICBwcml2YXRlIEFSQW5jaG9yIF9zcGF3bmVkQ2l0eUFuY2hvcjtcbiAgICBwcml2YXRlIEdhbWVPYmplY3QgX3NwYXduZWRDaXR5SW5zdGFuY2U7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTGlzdDxBUlJheWNhc3RIaXQ+IEhpdHMgPSBuZXcoKTtcblxuICAgIHByaXZhdGUgdm9pZCBBd2FrZSgpXG4gICAge1xuICAgICAgICBfcGxhbmVNYW5hZ2VyID0gR2V0Q29tcG9uZW50PEFSUGxhbmVNYW5hZ2VyPigpO1xuICAgICAgICBfcmF5Y2FzdE1hbmFnZXIgPSBHZXRDb21wb25lbnQ8QVJSYXljYXN0TWFuYWdlcj4oKTtcbiAgICAgICAgX2FuY2hvck1hbmFnZXIgPSBHZXRDb21wb25lbnQ8QVJBbmNob3JNYW5hZ2VyPigpO1xuXG4gICAgICAgIC8vIFd5bXVzemFteSBkZXRla2NqxJkgcMWCYXN6Y3p5em4gcG96aW9teWNoIChibGF0eSBpIHBvZMWCb2dpKSBvcmF6IHBpb25vd3ljaCAob2tuYSlcbiAgICAgICAgX3BsYW5lTWFuYWdlci5yZXF1ZXN0ZWREZXRlY3Rpb25Nb2RlID0gUGxhbmVEZXRlY3Rpb25Nb2RlLkhvcml6b250YWwgfCBQbGFuZURldGVjdGlvbk1vZGUuVmVydGljYWw7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2b2lkIE9uRW5hYmxlKCkgPT4gX3BsYW5lTWFuYWdlci5wbGFuZXNDaGFuZ2VkICs9IE9uUGxhbmVzQ2hhbmdlZDtcbiAgICBwcml2YXRlIHZvaWQgT25EaXNhYmxlKCkgPT4gX3BsYW5lTWFuYWdlci5wbGFuZXNDaGFuZ2VkIC09IE9uUGxhbmVzQ2hhbmdlZDtcblxuICAgIHByaXZhdGUgdm9pZCBPblBsYW5lc0NoYW5nZWQoQVJQbGFuZXNDaGFuZ2VkRXZlbnRBcmdzIGFyZ3MpXG4gICAge1xuICAgICAgICAvLyAxLiBXeXpuYWN6IHBvemlvbSBwb2TFgm9naSAobmFqbmnFvHN6YSBwxYJhc3pjenl6bmEgcG96aW9tYSlcbiAgICAgICAgZm9yZWFjaCAodmFyIHBsYW5lIGluIF9wbGFuZU1hbmFnZXIudHJhY2thYmxlcylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYgKHBsYW5lLmFsaWdubWVudCA9PSBQbGFuZUFsaWdubWVudC5Ib3Jpem9udGFsVXApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYW5lLnRyYW5zZm9ybS5wb3NpdGlvbi55IDwgX2xvd2VzdEZsb29yWSlcbiAgICAgICAgICAgICAgICAgICAgX2xvd2VzdEZsb29yWSA9IHBsYW5lLnRyYW5zZm9ybS5wb3NpdGlvbi55O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gMi4gS2xhc3lmaWt1aiBwxYJhc3pjenl6bnkgbmEgQmxhdCBTdG/FgnUgKFRhYmxldG9wKSBvcmF6IFBvZMWCb2fEmSAoRmxvb3IpXG4gICAgICAgIGZvcmVhY2ggKHZhciBwbGFuZSBpbiBfcGxhbmVNYW5hZ2VyLnRyYWNrYWJsZXMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChwbGFuZS5hbGlnbm1lbnQgIT0gUGxhbmVBbGlnbm1lbnQuSG9yaXpvbnRhbFVwKSBjb250aW51ZTtcblxuICAgICAgICAgICAgZmxvYXQgaGVpZ2h0QWJvdmVGbG9vciA9IHBsYW5lLnRyYW5zZm9ybS5wb3NpdGlvbi55IC0gX2xvd2VzdEZsb29yWTtcbiAgICAgICAgICAgIGJvb2wgaXNUYWJsZXRvcCA9IHBsYW5lLmNsYXNzaWZpY2F0aW9uID09IFBsYW5lQ2xhc3NpZmljYXRpb24uVGFibGUgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChoZWlnaHRBYm92ZUZsb29yID49IG1pblRhYmxlRWxldmF0aW9uQWJvdmVGbG9vciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodEFib3ZlRmxvb3IgPD0gbWF4VGFibGVFbGV2YXRpb25BYm92ZUZsb29yKTtcblxuICAgICAgICAgICAgdmFyIG1lc2hSZW5kZXJlciA9IHBsYW5lLkdldENvbXBvbmVudDxNZXNoUmVuZGVyZXI+KCk7XG4gICAgICAgICAgICBpZiAobWVzaFJlbmRlcmVyICE9IG51bGwpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbWVzaFJlbmRlcmVyLnNoYXJlZE1hdGVyaWFsID0gaXNUYWJsZXRvcCA/IHRhYmxldG9wR3JpZE1hdGVyaWFsIDogZmxvb3JHcmlkTWF0ZXJpYWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEF1dG9tYXR5Y3puZSBvc2FkemVuaWUgbWFraWV0eSBuYSByb3pwb3puYW55bSBibGFjaWUgc3RvxYJ1IG8gd3lzdGFyY3phasSFY2VqIHBvd2llcnpjaG5pXG4gICAgICAgICAgICBpZiAoX3NwYXduZWRDaXR5SW5zdGFuY2UgPT0gbnVsbCAmJiBpc1RhYmxldG9wICYmIHBsYW5lLmV4dGVudHMueCA+IDAuNmYgJiYgcGxhbmUuZXh0ZW50cy55ID4gMC40ZilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBQbGFjZUhvbG9ncmFtT25QbGFuZShwbGFuZSwgcGxhbmUuY2VudGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHB1YmxpYyB2b2lkIFRyeVBsYWNlQnlTY3JlZW5UYXAoVmVjdG9yMiBzY3JlZW5Qb3NpdGlvbilcbiAgICB7XG4gICAgICAgIGlmIChfcmF5Y2FzdE1hbmFnZXIuUmF5Y2FzdChzY3JlZW5Qb3NpdGlvbiwgSGl0cywgVHJhY2thYmxlVHlwZS5QbGFuZVdpdGhpblBvbHlnb24pKVxuICAgICAgICB7XG4gICAgICAgICAgICB2YXIgaGl0ID0gSGl0c1swXTtcbiAgICAgICAgICAgIHZhciBwbGFuZSA9IF9wbGFuZU1hbmFnZXIuR2V0UGxhbmUoaGl0LnRyYWNrYWJsZUlkKTtcbiAgICAgICAgICAgIGlmIChwbGFuZSAhPSBudWxsICYmIHBsYW5lLmFsaWdubWVudCA9PSBQbGFuZUFsaWdubWVudC5Ib3Jpem9udGFsVXApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgUGxhY2VIb2xvZ3JhbU9uUGxhbmUocGxhbmUsIGhpdC5wb3NlLnBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgdm9pZCBQbGFjZUhvbG9ncmFtT25QbGFuZShBUlBsYW5lIHRhcmdldFBsYW5lLCBWZWN0b3IzIHdvcmxkUG9zaXRpb24pXG4gICAge1xuICAgICAgICBQb3NlIHBsYWNlbWVudFBvc2UgPSBuZXcgUG9zZSh3b3JsZFBvc2l0aW9uLCBRdWF0ZXJuaW9uLmlkZW50aXR5KTtcbiAgICAgICAgX3NwYXduZWRDaXR5QW5jaG9yID0gX2FuY2hvck1hbmFnZXIuQXR0YWNoQW5jaG9yKHRhcmdldFBsYW5lLCBwbGFjZW1lbnRQb3NlKTtcblxuICAgICAgICBpZiAoX3NwYXduZWRDaXR5QW5jaG9yICE9IG51bGwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmIChfc3Bhd25lZENpdHlJbnN0YW5jZSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIF9zcGF3bmVkQ2l0eUluc3RhbmNlID0gSW5zdGFudGlhdGUoaG9sb2dyYXBoaWNDaXR5VGFibGVQcmVmYWIsIF9zcGF3bmVkQ2l0eUFuY2hvci50cmFuc2Zvcm0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIF9zcGF3bmVkQ2l0eUluc3RhbmNlLnRyYW5zZm9ybS5TZXRQYXJlbnQoX3NwYXduZWRDaXR5QW5jaG9yLnRyYW5zZm9ybSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgfVxufWAsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2xpZ2h0aW5nX29jY2x1c2lvbicsXG4gICAgZmlsZW5hbWU6ICdFbnZpcm9ubWVudExpZ2h0aW5nQW5kT2NjbHVzaW9uLmNzJyxcbiAgICB0aXRsZTogJzIuIE/Fm3dpZXRsZW5pZSDFmnJvZG93aXNrb3dlIGkgT2tsdXpqYSBHxYLEmWJpIChBUktpdCBMaURBUiAvIEFSQ29yZSBEZXB0aCknLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1N5bmNocm9uaXp1amUgb8Wbd2lldGxlbmllIHNjZW55IFVuaXR5IHoga2FtZXLEhSBBUiAoU3BoZXJpY2FsIEhhcm1vbmljcywgdGVtcGVyYXR1cmEgYmFyd293YSwgZW52TGlnaHRpbmdJbnRlbnNpdHkpIG9yYXogdXJ1Y2hhbWlhIHNwcnrEmXRvd8SFIG9rbHV6asSZIGfFgsSZYmkuJyxcbiAgICBsYW5ndWFnZTogJ2NzaGFycCcsXG4gICAgY29kZTogYHVzaW5nIFVuaXR5RW5naW5lO1xudXNpbmcgVW5pdHlFbmdpbmUuUmVuZGVyaW5nO1xudXNpbmcgVW5pdHlFbmdpbmUuWFIuQVJGb3VuZGF0aW9uO1xudXNpbmcgVW5pdHlFbmdpbmUuWFIuQVJTdWJzeXN0ZW1zO1xuXG5bUmVxdWlyZUNvbXBvbmVudCh0eXBlb2YoQVJDYW1lcmFNYW5hZ2VyKSwgdHlwZW9mKEFST2NjbHVzaW9uTWFuYWdlcikpXVxucHVibGljIGNsYXNzIEVudmlyb25tZW50TGlnaHRpbmdBbmRPY2NsdXNpb24gOiBNb25vQmVoYXZpb3VyXG57XG4gICAgW0hlYWRlcihcIk9kbm/Fm25pa2kgT8Wbd2lldGxlbmlhIFNjZW55XCIpXVxuICAgIFtTZXJpYWxpemVGaWVsZF0gcHJpdmF0ZSBMaWdodCBlbnZpcm9ubWVudERpcmVjdGlvbmFsTGlnaHQ7XG4gICAgW1NlcmlhbGl6ZUZpZWxkXSBwcml2YXRlIFJlZmxlY3Rpb25Qcm9iZSB0YWJsZVJlZmxlY3Rpb25Qcm9iZTtcbiAgICBbU2VyaWFsaXplRmllbGRdIHByaXZhdGUgTWF0ZXJpYWxbXSBob2xvZ3JhbU1hdGVyaWFscztcblxuICAgIFtIZWFkZXIoXCJVc3Rhd2llbmlhIMWacm9kb3dpc2thIChTeW5jaHJvbml6YWNqYSB6IEFSU3R1ZGlvQ29uZmlnKVwiKV1cbiAgICBbU2VyaWFsaXplRmllbGQsIFJhbmdlKDAuNWYsIDIuMGYpXSBwcml2YXRlIGZsb2F0IGVudkxpZ2h0aW5nSW50ZW5zaXR5ID0gMS4yMGY7XG5cbiAgICBwcml2YXRlIEFSQ2FtZXJhTWFuYWdlciBfY2FtZXJhTWFuYWdlcjtcbiAgICBwcml2YXRlIEFST2NjbHVzaW9uTWFuYWdlciBfb2NjbHVzaW9uTWFuYWdlcjtcbiAgICBwcml2YXRlIGZsb2F0IF9sYXN0RXN0aW1hdGVkQnJpZ2h0bmVzcyA9IDEuMGY7XG4gICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgaW50IEVudkJyaWdodG5lc3NJZCA9IFNoYWRlci5Qcm9wZXJ0eVRvSUQoXCJfRW52QnJpZ2h0bmVzc1wiKTtcblxuICAgIHByaXZhdGUgdm9pZCBBd2FrZSgpXG4gICAge1xuICAgICAgICBfY2FtZXJhTWFuYWdlciA9IEdldENvbXBvbmVudDxBUkNhbWVyYU1hbmFnZXI+KCk7XG4gICAgICAgIF9vY2NsdXNpb25NYW5hZ2VyID0gR2V0Q29tcG9uZW50PEFST2NjbHVzaW9uTWFuYWdlcj4oKTtcblxuICAgICAgICAvLyBBa3R5d2FjamEgY3p1am5pa8OzdyBnxYLEmWJpIGRsYSBva2x1emppIG9iaWVrdMOzdyByemVjenl3aXN0eWNoIChmb3RlbGUsIGtyYXfEmWTFuiBzdG/FgnUsIGTFgm9uaWUpXG4gICAgICAgIF9vY2NsdXNpb25NYW5hZ2VyLnJlcXVlc3RlZEVudmlyb25tZW50RGVwdGhNb2RlID0gRW52aXJvbm1lbnREZXB0aE1vZGUuQmVzdDtcbiAgICAgICAgX29jY2x1c2lvbk1hbmFnZXIuZW52aXJvbm1lbnREZXB0aFRlbXBvcmFsU21vb3RoaW5nUmVxdWVzdGVkID0gdHJ1ZTtcbiAgICAgICAgX29jY2x1c2lvbk1hbmFnZXIucmVxdWVzdGVkT2NjbHVzaW9uUHJlZmVyZW5jZU1vZGUgPSBPY2NsdXNpb25QcmVmZXJlbmNlTW9kZS5QcmVmZXJFbnZpcm9ubWVudE9jY2x1c2lvbjtcbiAgICB9XG5cbiAgICBwcml2YXRlIHZvaWQgT25FbmFibGUoKSA9PiBfY2FtZXJhTWFuYWdlci5mcmFtZVJlY2VpdmVkICs9IE9uQ2FtZXJhRnJhbWVSZWNlaXZlZDtcbiAgICBwcml2YXRlIHZvaWQgT25EaXNhYmxlKCkgPT4gX2NhbWVyYU1hbmFnZXIuZnJhbWVSZWNlaXZlZCAtPSBPbkNhbWVyYUZyYW1lUmVjZWl2ZWQ7XG5cbiAgICAvLy8gPHN1bW1hcnk+XG4gICAgLy8vIER5bmFtaWN6bmllIGFrdHVhbGl6dWplIG1ub8W8bmlrIG5hdMSZxbxlbmlhIG/Fm3dpZXRsZW5pYSBvdG9jemVuaWEgKHpha3JlcyAwLjUgLSAyLjApXG4gICAgLy8vIHByemVrYXp5d2FueSB6IHN1d2FrYSAnSW50ZW5zeXdub8WbxIcgT8Wbd2lldGxlbmlhIE90b2N6ZW5pYScgdyBBUlN0dWRpb0NvbmZpZy5cbiAgICAvLy8gPC9zdW1tYXJ5PlxuICAgIHB1YmxpYyB2b2lkIFNldEVudkxpZ2h0aW5nSW50ZW5zaXR5KGZsb2F0IGludGVuc2l0eSlcbiAgICB7XG4gICAgICAgIGVudkxpZ2h0aW5nSW50ZW5zaXR5ID0gTWF0aGYuQ2xhbXAoaW50ZW5zaXR5LCAwLjVmLCAyLjBmKTtcbiAgICAgICAgaWYgKGVudmlyb25tZW50RGlyZWN0aW9uYWxMaWdodCAhPSBudWxsKVxuICAgICAgICB7XG4gICAgICAgICAgICBlbnZpcm9ubWVudERpcmVjdGlvbmFsTGlnaHQuaW50ZW5zaXR5ID0gX2xhc3RFc3RpbWF0ZWRCcmlnaHRuZXNzICogZW52TGlnaHRpbmdJbnRlbnNpdHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIHZvaWQgT25DYW1lcmFGcmFtZVJlY2VpdmVkKEFSQ2FtZXJhRnJhbWVFdmVudEFyZ3MgYXJncylcbiAgICB7XG4gICAgICAgIEFSTGlnaHRFc3RpbWF0aW9uRGF0YSBsaWdodERhdGEgPSBhcmdzLmxpZ2h0RXN0aW1hdGlvbjtcblxuICAgICAgICAvLyAxLiBOYXTEmcW8ZW5pZSDFm3dpYXTFgmEgb3RvY3plbmlhIGkgZHluYW1pY3puYSBtb2R5ZmlrYWNqYSBlbnZpcm9ubWVudERpcmVjdGlvbmFsTGlnaHQgcHJ6ZXogZW52TGlnaHRpbmdJbnRlbnNpdHlcbiAgICAgICAgaWYgKGxpZ2h0RGF0YS5hdmVyYWdlQnJpZ2h0bmVzcy5IYXNWYWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZmxvYXQgYnJpZ2h0bmVzcyA9IE1hdGhmLkNsYW1wKGxpZ2h0RGF0YS5hdmVyYWdlQnJpZ2h0bmVzcy5WYWx1ZSwgMC4yNWYsIDIuMGYpO1xuICAgICAgICAgICAgX2xhc3RFc3RpbWF0ZWRCcmlnaHRuZXNzID0gYnJpZ2h0bmVzcztcbiAgICAgICAgICAgIGVudmlyb25tZW50RGlyZWN0aW9uYWxMaWdodC5pbnRlbnNpdHkgPSBicmlnaHRuZXNzICogZW52TGlnaHRpbmdJbnRlbnNpdHk7XG5cbiAgICAgICAgICAgIGZvcmVhY2ggKHZhciBtYXQgaW4gaG9sb2dyYW1NYXRlcmlhbHMpXG4gICAgICAgICAgICAgICAgbWF0LlNldEZsb2F0KEVudkJyaWdodG5lc3NJZCwgYnJpZ2h0bmVzcyAqIGVudkxpZ2h0aW5nSW50ZW5zaXR5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIuIFRlbXBlcmF0dXJhIGJhcndvd2EgaSBrb2xvciBnxYLDs3duZWdvIMW6csOzZMWCYSDFm3dpYXTFgmEgeiBva2llblxuICAgICAgICBpZiAobGlnaHREYXRhLmF2ZXJhZ2VDb2xvclRlbXBlcmF0dXJlLkhhc1ZhbHVlKVxuICAgICAgICAgICAgZW52aXJvbm1lbnREaXJlY3Rpb25hbExpZ2h0LmNvbG9yVGVtcGVyYXR1cmUgPSBsaWdodERhdGEuYXZlcmFnZUNvbG9yVGVtcGVyYXR1cmUuVmFsdWU7XG5cbiAgICAgICAgaWYgKGxpZ2h0RGF0YS5tYWluTGlnaHRDb2xvci5IYXNWYWx1ZSlcbiAgICAgICAgICAgIGVudmlyb25tZW50RGlyZWN0aW9uYWxMaWdodC5jb2xvciA9IGxpZ2h0RGF0YS5tYWluTGlnaHRDb2xvci5WYWx1ZTtcblxuICAgICAgICAvLyAzLiBLaWVydW5layBwYWRhbmlhIMWbd2lhdMWCYSAobnAuIHphY2jDs2Qgc8WCb8WEY2EgemEgxYJ1a293eW1pIG9rbmFtaSlcbiAgICAgICAgaWYgKGxpZ2h0RGF0YS5tYWluTGlnaHREaXJlY3Rpb24uSGFzVmFsdWUpXG4gICAgICAgICAgICBlbnZpcm9ubWVudERpcmVjdGlvbmFsTGlnaHQudHJhbnNmb3JtLnJvdGF0aW9uID0gUXVhdGVybmlvbi5Mb29rUm90YXRpb24obGlnaHREYXRhLm1haW5MaWdodERpcmVjdGlvbi5WYWx1ZSk7XG5cbiAgICAgICAgLy8gNC4gSGFybW9uaWtpIHNmZXJ5Y3puZSBkbGEgcmVhbGlzdHljem55Y2ggb2RiacSHIFBCUiBuYSBibGFjaWVcbiAgICAgICAgaWYgKGxpZ2h0RGF0YS5hbWJpZW50U3BoZXJpY2FsSGFybW9uaWNzLkhhc1ZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBSZW5kZXJTZXR0aW5ncy5hbWJpZW50TW9kZSA9IEFtYmllbnRNb2RlLlNreWJveDtcbiAgICAgICAgICAgIFJlbmRlclNldHRpbmdzLmFtYmllbnRQcm9iZSA9IGxpZ2h0RGF0YS5hbWJpZW50U3BoZXJpY2FsSGFybW9uaWNzLlZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufWAsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3BhcmFsbGF4X2NvbnRyb2xsZXInLFxuICAgIGZpbGVuYW1lOiAnUGFyYWxsYXhDYW1lcmFSaWdDb250cm9sbGVyLmNzJyxcbiAgICB0aXRsZTogJzMuIEVmZWt0IFBhcmFsYWtzeSA2RG9GIGkgR8WCxJliaWEgV2llbG9wbGFub3dhJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdQcnpla2F6dWplIHdla3RvciBydWNodSB1cnrEhWR6ZW5pYSA2RG9GIHdva8OzxYIgc3RvxYJ1IGRvIHdhcnN0dyB3ZXduxJl0cnpueWNoIGJ1ZHlua8OzdyBvcmF6IHdpc3rEhWN5Y2ggcGFuZWxpIEhVRCwgYnVkdWrEhWMgZ8WCxJliacSZIHN0ZXJlb3Nrb3Bvd8SFLicsXG4gICAgbGFuZ3VhZ2U6ICdjc2hhcnAnLFxuICAgIGNvZGU6IGB1c2luZyBVbml0eUVuZ2luZTtcblxucHVibGljIGNsYXNzIFBhcmFsbGF4Q2FtZXJhUmlnQ29udHJvbGxlciA6IE1vbm9CZWhhdmlvdXJcbntcbiAgICBbSGVhZGVyKFwiS29uZmlndXJhY2phIFBhcmFsYWtzeSBXb2vDs8WCIE1vZGVsdVwiKV1cbiAgICBbU2VyaWFsaXplRmllbGRdIHByaXZhdGUgVHJhbnNmb3JtIGFyQ2FtZXJhVHJhbnNmb3JtO1xuICAgIFtTZXJpYWxpemVGaWVsZF0gcHJpdmF0ZSBUcmFuc2Zvcm0gdGFibGVDZW50ZXJBbmNob3I7XG4gICAgW1NlcmlhbGl6ZUZpZWxkLCBSYW5nZSgwZiwgMS41ZildIHByaXZhdGUgZmxvYXQgcGFyYWxsYXhTdHJlbmd0aCA9IDAuODVmO1xuICAgIFtTZXJpYWxpemVGaWVsZF0gcHJpdmF0ZSBmbG9hdCBzbW9vdGhpbmdTcGVlZCA9IDguMGY7XG5cbiAgICBbSGVhZGVyKFwiV2Fyc3R3eSBHxYLEmWJpIChQxYJ5d2FqxIVjZSBQYW5lbGUgSFVEIGkgUmR6ZW5pZSBCSU0pXCIpXVxuICAgIFtTZXJpYWxpemVGaWVsZF0gcHJpdmF0ZSBUcmFuc2Zvcm1bXSBmbG9hdGluZ0h1ZFBhbmVscztcbiAgICBbU2VyaWFsaXplRmllbGRdIHByaXZhdGUgVHJhbnNmb3JtW10gYnVpbGRpbmdJbm5lckNvcmVzO1xuICAgIFtTZXJpYWxpemVGaWVsZF0gcHJpdmF0ZSBNYXRlcmlhbFtdIHBhcmFsbGF4SG9sb2dyYW1NYXRlcmlhbHM7XG5cbiAgICBwcml2YXRlIFZlY3RvcjNbXSBfaW5pdGlhbEh1ZExvY2FsUG9zaXRpb25zO1xuICAgIHByaXZhdGUgVmVjdG9yMyBfc21vb3RoZWRWaWV3T2Zmc2V0O1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IGludCBWaWV3UGFyYWxsYXhPZmZzZXRJZCA9IFNoYWRlci5Qcm9wZXJ0eVRvSUQoXCJfUGFyYWxsYXhWaWV3T2Zmc2V0XCIpO1xuXG4gICAgcHJpdmF0ZSB2b2lkIFN0YXJ0KClcbiAgICB7XG4gICAgICAgIF9pbml0aWFsSHVkTG9jYWxQb3NpdGlvbnMgPSBuZXcgVmVjdG9yM1tmbG9hdGluZ0h1ZFBhbmVscy5MZW5ndGhdO1xuICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGZsb2F0aW5nSHVkUGFuZWxzLkxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgX2luaXRpYWxIdWRMb2NhbFBvc2l0aW9uc1tpXSA9IGZsb2F0aW5nSHVkUGFuZWxzW2ldLmxvY2FsUG9zaXRpb247XG4gICAgfVxuXG4gICAgcHJpdmF0ZSB2b2lkIExhdGVVcGRhdGUoKVxuICAgIHtcbiAgICAgICAgaWYgKGFyQ2FtZXJhVHJhbnNmb3JtID09IG51bGwgfHwgdGFibGVDZW50ZXJBbmNob3IgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIE9ibGljeiB6bm9ybWFsaXpvd2FueSB3ZWt0b3IgcHJ6ZW1pZXN6Y3plbmlhIHVyesSFZHplbmlhIHd6Z2zEmWRlbSBjZW50cnVtIG1ha2lldHlcbiAgICAgICAgVmVjdG9yMyB3b3JsZE9mZnNldCA9IGFyQ2FtZXJhVHJhbnNmb3JtLnBvc2l0aW9uIC0gdGFibGVDZW50ZXJBbmNob3IucG9zaXRpb247XG4gICAgICAgIFZlY3RvcjMgbG9jYWxWaWV3T2Zmc2V0ID0gdGFibGVDZW50ZXJBbmNob3IuSW52ZXJzZVRyYW5zZm9ybURpcmVjdGlvbih3b3JsZE9mZnNldCk7XG5cbiAgICAgICAgX3Ntb290aGVkVmlld09mZnNldCA9IFZlY3RvcjMuTGVycChcbiAgICAgICAgICAgIF9zbW9vdGhlZFZpZXdPZmZzZXQsXG4gICAgICAgICAgICBsb2NhbFZpZXdPZmZzZXQgKiBwYXJhbGxheFN0cmVuZ3RoLFxuICAgICAgICAgICAgVGltZS5kZWx0YVRpbWUgKiBzbW9vdGhpbmdTcGVlZFxuICAgICAgICApO1xuXG4gICAgICAgIC8vIDEuIFN1YnRlbG5hIHBhcmFsYWtzYSBwcnplc3RyemVubmEgYm9jem55Y2ggZWtyYW7Ds3cgaG9sb2dyYW1vd3ljaCAoSFVEKVxuICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IGZsb2F0aW5nSHVkUGFuZWxzLkxlbmd0aDsgaSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAoZmxvYXRpbmdIdWRQYW5lbHNbaV0gPT0gbnVsbCkgY29udGludWU7XG4gICAgICAgICAgICBmbG9hdCBkZXB0aExheWVyRmFjdG9yID0gKGkgJSAyID09IDApID8gMC4wOGYgOiAtMC4wNmY7XG4gICAgICAgICAgICBmbG9hdGluZ0h1ZFBhbmVsc1tpXS5sb2NhbFBvc2l0aW9uID0gX2luaXRpYWxIdWRMb2NhbFBvc2l0aW9uc1tpXSArXG4gICAgICAgICAgICAgICAgbmV3IFZlY3RvcjMoX3Ntb290aGVkVmlld09mZnNldC54ICogZGVwdGhMYXllckZhY3RvciwgX3Ntb290aGVkVmlld09mZnNldC55ICogMC4wNGYsIDBmKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDIuIFByemVrYXphbmllIHdla3RvcmEga2FtZXJ5IGRvIHNoYWRlcmEgdyBjZWx1IHByemVzdW5pxJljaWEgd2V3bsSZdHJ6bmVqIHNpYXRraSBCSU1cbiAgICAgICAgZm9yZWFjaCAodmFyIG1hdCBpbiBwYXJhbGxheEhvbG9ncmFtTWF0ZXJpYWxzKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZiAobWF0ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgbWF0LlNldFZlY3RvcihWaWV3UGFyYWxsYXhPZmZzZXRJZCwgX3Ntb290aGVkVmlld09mZnNldCk7XG4gICAgICAgIH1cbiAgICB9XG59YCxcbiAgfSxcbiAge1xuICAgIGlkOiAnaG9sb2dyYW1fd2luZG93X3NoYWRlcicsXG4gICAgZmlsZW5hbWU6ICdIb2xvZ3JhbURpYWdyaWRBbmRXaW5kb3dQb3J0YWwuaGxzbCcsXG4gICAgdGl0bGU6ICc0LiBTaGFkZXIgSG9sb2dyYW11IEFyY2hpdGVrdG9uaWN6bmVnbyArIFBvcnRhbCBDesSFc3RlY3playBaYSBPa25hbWknLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1NoYWRlciBVUlAgxYLEhWN6xIVjeSBzaWF0a8SZIGtvbnN0cnVrY3lqbsSFIGRpYWdyaWQgeiBlZmVrdGVtIEZyZXNuZWxhLCB6YW5pa2FuaWVtIG5hIGJsYWNpZSAoRGVwdGggRmFkZSkgb3JheiBtYXNrxIUgU3RlbmNpbCBkbGEgY3rEhXN0ZWN6ZWsgemEgb2tuYW1pLicsXG4gICAgbGFuZ3VhZ2U6ICdobHNsJyxcbiAgICBjb2RlOiBgU2hhZGVyIFwiSG9sb0FyY2gvVVJQX0FyY2hpdGVjdHVyYWxIb2xvZ3JhbVwiXG57XG4gICAgUHJvcGVydGllc1xuICAgIHtcbiAgICAgICAgX01haW5Db2xvciAoXCJLb2xvciBDeWphbm93eSBTaWF0a2lcIiwgQ29sb3IpID0gKDAuMDUsIDAuODIsIDEuMCwgMS4wKVxuICAgICAgICBfQ29yZUNvbG9yIChcIktvbG9yIFJkemVuaWEgWsWCb3RlZ29cIiwgQ29sb3IpID0gKDEuMCwgMC43MiwgMC4yMiwgMS4wKVxuICAgICAgICBfRGlhZ3JpZFNjYWxlIChcIkfEmXN0b8WbxIcgS3JhdG93bmljeSBEaWFncmlkXCIsIEZsb2F0KSA9IDE4LjBcbiAgICAgICAgX0ZyZXNuZWxQb3dlciAoXCJPc3Ryb8WbxIcgS3Jhd8SZZHppIEZyZXNuZWxhXCIsIFJhbmdlKDAuNSwgNi4wKSkgPSAyLjRcbiAgICAgICAgX1NjYW5saW5lU3BlZWQgKFwiUHLEmWRrb8WbxIcgU2thbm93YW5pYSBQaW9ub3dlZ29cIiwgRmxvYXQpID0gMS42XG4gICAgICAgIF9JbnRlcnNlY3Rpb25GYWRlIChcIk1pxJlra2llIE9zYWR6ZW5pZSBOYSBCbGFjaWVcIiwgUmFuZ2UoMC4wMSwgMC41KSkgPSAwLjEyXG4gICAgICAgIF9Gb2dEZW5zaXR5IChcIkfEmXN0b8WbxIcgTWfFgnkgQXRtb3NmZXJ5Y3puZWpcIiwgUmFuZ2UoMC4wLCAwLjI1KSkgPSAwLjA2NVxuICAgIH1cbiAgICBTdWJTaGFkZXJcbiAgICB7XG4gICAgICAgIFRhZ3MgeyBcIlJlbmRlclR5cGVcIj1cIlRyYW5zcGFyZW50XCIgXCJRdWV1ZVwiPVwiVHJhbnNwYXJlbnRcIiBcIlJlbmRlclBpcGVsaW5lXCI9XCJVbml2ZXJzYWxQaXBlbGluZVwiIH1cbiAgICAgICAgQmxlbmQgU3JjQWxwaGEgT25lIC8vIEFkZGl0aXZlIEhvbG9ncmFwaGljIEdsb3dcbiAgICAgICAgWldyaXRlIE9mZlxuICAgICAgICBDdWxsIEJhY2tcblxuICAgICAgICBQYXNzXG4gICAgICAgIHtcbiAgICAgICAgICAgIEhMU0xQUk9HUkFNXG4gICAgICAgICAgICAjcHJhZ21hIHZlcnRleCB2ZXJ0XG4gICAgICAgICAgICAjcHJhZ21hIGZyYWdtZW50IGZyYWdcbiAgICAgICAgICAgICNpbmNsdWRlIFwiUGFja2FnZXMvY29tLnVuaXR5LnJlbmRlci1waXBlbGluZXMudW5pdmVyc2FsL1NoYWRlckxpYnJhcnkvQ29yZS5obHNsXCJcbiAgICAgICAgICAgICNpbmNsdWRlIFwiUGFja2FnZXMvY29tLnVuaXR5LnJlbmRlci1waXBlbGluZXMudW5pdmVyc2FsL1NoYWRlckxpYnJhcnkvRGVjbGFyZURlcHRoVGV4dHVyZS5obHNsXCJcblxuICAgICAgICAgICAgc3RydWN0IEF0dHJpYnV0ZXNcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmbG9hdDQgcG9zaXRpb25PUyA6IFBPU0lUSU9OO1xuICAgICAgICAgICAgICAgIGZsb2F0MyBub3JtYWxPUyAgIDogTk9STUFMO1xuICAgICAgICAgICAgICAgIGZsb2F0MiB1diAgICAgICAgIDogVEVYQ09PUkQwO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgc3RydWN0IFZhcnlpbmdzXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZmxvYXQ0IHBvc2l0aW9uQ1MgOiBTVl9QT1NJVElPTjtcbiAgICAgICAgICAgICAgICBmbG9hdDMgcG9zaXRpb25XUyA6IFRFWENPT1JEMDtcbiAgICAgICAgICAgICAgICBmbG9hdDMgbm9ybWFsV1MgICA6IFRFWENPT1JEMTtcbiAgICAgICAgICAgICAgICBmbG9hdDIgdXYgICAgICAgICA6IFRFWENPT1JEMjtcbiAgICAgICAgICAgICAgICBmbG9hdDQgc2NyZWVuUG9zICA6IFRFWENPT1JEMztcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZsb2F0NCBfTWFpbkNvbG9yO1xuICAgICAgICAgICAgZmxvYXQ0IF9Db3JlQ29sb3I7XG4gICAgICAgICAgICBmbG9hdCBfRGlhZ3JpZFNjYWxlO1xuICAgICAgICAgICAgZmxvYXQgX0ZyZXNuZWxQb3dlcjtcbiAgICAgICAgICAgIGZsb2F0IF9TY2FubGluZVNwZWVkO1xuICAgICAgICAgICAgZmxvYXQgX0ludGVyc2VjdGlvbkZhZGU7XG4gICAgICAgICAgICBmbG9hdCBfRm9nRGVuc2l0eTtcbiAgICAgICAgICAgIGZsb2F0MyBfUGFyYWxsYXhWaWV3T2Zmc2V0O1xuXG4gICAgICAgICAgICBWYXJ5aW5ncyB2ZXJ0KEF0dHJpYnV0ZXMgSU4pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgVmFyeWluZ3MgT1VUO1xuICAgICAgICAgICAgICAgIE9VVC5wb3NpdGlvbldTID0gVHJhbnNmb3JtT2JqZWN0VG9Xb3JsZChJTi5wb3NpdGlvbk9TLnh5eik7XG4gICAgICAgICAgICAgICAgT1VULnBvc2l0aW9uQ1MgPSBUcmFuc2Zvcm1Xb3JsZFRvSENsaXAoT1VULnBvc2l0aW9uV1MpO1xuICAgICAgICAgICAgICAgIE9VVC5ub3JtYWxXUyA9IFRyYW5zZm9ybU9iamVjdFRvV29ybGROb3JtYWwoSU4ubm9ybWFsT1MpO1xuICAgICAgICAgICAgICAgIC8vIERvZGFuaWUgcHJ6ZXN1bmnEmWNpYSBwYXJhbGFrc3kgZGxhIGfFgsSZYmkgd2V3bsSZdHJ6bnljaCBrb25keWduYWNqaVxuICAgICAgICAgICAgICAgIE9VVC51diA9IElOLnV2ICsgX1BhcmFsbGF4Vmlld09mZnNldC54eSAqIDAuMDM1O1xuICAgICAgICAgICAgICAgIE9VVC5zY3JlZW5Qb3MgPSBDb21wdXRlU2NyZWVuUG9zKE9VVC5wb3NpdGlvbkNTKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gT1VUO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoYWxmNCBmcmFnKFZhcnlpbmdzIElOKSA6IFNWX1RhcmdldFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZsb2F0MyBjYW1lcmFPZmZzZXRXUyA9IEdldENhbWVyYVBvc2l0aW9uV1MoKSAtIElOLnBvc2l0aW9uV1M7XG4gICAgICAgICAgICAgICAgZmxvYXQgY2FtZXJhRGlzdGFuY2UgPSBsZW5ndGgoY2FtZXJhT2Zmc2V0V1MpO1xuICAgICAgICAgICAgICAgIGZsb2F0MyB2aWV3RGlyV1MgPSBTYWZlTm9ybWFsaXplKGNhbWVyYU9mZnNldFdTKTtcbiAgICAgICAgICAgICAgICBmbG9hdCBmcmVzbmVsID0gcG93KDEuMCAtIHNhdHVyYXRlKGRvdCggbm9ybWFsaXplKElOLm5vcm1hbFdTKSwgdmlld0RpcldTICkpLCBfRnJlc25lbFBvd2VyKTtcblxuICAgICAgICAgICAgICAgIC8vIFByb2NlZHVyYWxuYSBrcmF0YSBhcmNoaXRla3Rvbmljem5hIERpYWdyaWQgKyBzdHJvcHkga29uZHlnbmFjamlcbiAgICAgICAgICAgICAgICBmbG9hdDIgZ3JpZFVWID0gSU4udXYgKiBfRGlhZ3JpZFNjYWxlO1xuICAgICAgICAgICAgICAgIGZsb2F0IGRpYWcxID0gYWJzKGZyYWMoZ3JpZFVWLnggKyBncmlkVVYueSkgLSAwLjUpO1xuICAgICAgICAgICAgICAgIGZsb2F0IGRpYWcyID0gYWJzKGZyYWMoZ3JpZFVWLnggLSBncmlkVVYueSkgLSAwLjUpO1xuICAgICAgICAgICAgICAgIGZsb2F0IGZsb29yU2xhYiA9IGFicyhmcmFjKGdyaWRVVi55ICogMi4wKSAtIDAuNSk7XG4gICAgICAgICAgICAgICAgZmxvYXQgbGF0dGljZSA9IHNtb290aHN0ZXAoMC4wNiwgMC4wMSwgbWluKG1pbihkaWFnMSwgZGlhZzIpLCBmbG9vclNsYWIpKTtcblxuICAgICAgICAgICAgICAgIC8vIEZhbGEgc2thbm93YW5pYSB3IHByemVzdHJ6ZW5pIMWbd2lhdGFcbiAgICAgICAgICAgICAgICBmbG9hdCBzY2FubGluZSA9IDAuNjUgKyAwLjM1ICogc2luKElOLnBvc2l0aW9uV1MueSAqIDI0LjAgLSBfVGltZS55ICogX1NjYW5saW5lU3BlZWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gTWnEmWtraWUgc3R5a2FuaWUgeiByb3pwb3puYW7EhSBwxYJhc3pjenl6bsSFIGJsYXR1IHN0b8WCdVxuICAgICAgICAgICAgICAgIGZsb2F0MiBzY3JlZW5VViA9IElOLnNjcmVlblBvcy54eSAvIElOLnNjcmVlblBvcy53O1xuICAgICAgICAgICAgICAgIGZsb2F0IHNjZW5lRGVwdGggPSBMaW5lYXJFeWVEZXB0aChTYW1wbGVTY2VuZURlcHRoKHNjcmVlblVWKSwgX1pCdWZmZXJQYXJhbXMpO1xuICAgICAgICAgICAgICAgIGZsb2F0IHBhcnRaID0gSU4uc2NyZWVuUG9zLnc7XG4gICAgICAgICAgICAgICAgZmxvYXQgY29udGFjdEdsb3cgPSAxLjAgLSBzYXR1cmF0ZSgoc2NlbmVEZXB0aCAtIHBhcnRaKSAvIF9JbnRlcnNlY3Rpb25GYWRlKTtcblxuICAgICAgICAgICAgICAgIC8vIE9ibGljemVuaWUgdMWCdW1pZW5pYSB3eWvFgmFkbmljemVqIG1nxYJ5IGF0bW9zZmVyeWN6bmVqIG5hIHBvZHN0YXdpZSBwYXJhbWV0cnUgX0ZvZ0RlbnNpdHlcbiAgICAgICAgICAgICAgICBmbG9hdCBmb2dBdHRlbnVhdGlvbiA9IGV4cDIoLXBvdyhjYW1lcmFEaXN0YW5jZSAqIF9Gb2dEZW5zaXR5LCAyLjApKTtcbiAgICAgICAgICAgICAgICBmbG9hdDMgYXRtb3NwaGVyaWNGb2dDb2xvciA9IGZsb2F0MygwLjAzLCAwLjA3LCAwLjEyKTtcblxuICAgICAgICAgICAgICAgIGZsb2F0MyBmaW5hbFJHQiA9IGxlcnAoX0NvcmVDb2xvci5yZ2IsIF9NYWluQ29sb3IucmdiLCBmcmVzbmVsICsgbGF0dGljZSAqIDAuNykgKiBzY2FubGluZTtcbiAgICAgICAgICAgICAgICBmaW5hbFJHQiArPSBfTWFpbkNvbG9yLnJnYiAqIGNvbnRhY3RHbG93ICogMS40O1xuICAgICAgICAgICAgICAgIGZpbmFsUkdCID0gbGVycChhdG1vc3BoZXJpY0ZvZ0NvbG9yLCBmaW5hbFJHQiwgc2F0dXJhdGUoZm9nQXR0ZW51YXRpb24pKTtcbiAgICAgICAgICAgICAgICBmbG9hdCBhbHBoYSA9IHNhdHVyYXRlKChmcmVzbmVsICogMC43NSArIGxhdHRpY2UgKiAwLjg1ICsgY29udGFjdEdsb3cpICogMC45ICogc2F0dXJhdGUoZm9nQXR0ZW51YXRpb24gKyAwLjI1KSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gaGFsZjQoZmluYWxSR0IsIGFscGhhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEVOREhMU0xcbiAgICAgICAgfVxuICAgIH1cbn1gLFxuICB9LFxuXTtcblxuLyoqXG4gKiBad3JhY2EgbGlzdMSZIHNrcnlwdMOzdyBVbml0eSBDIyAvIEhMU0wgeiBkeW5hbWljem5pZSB3c3RyenlrbmnEmXR5bWkgcGFyYW1ldHJhbWlcbiAqIHogYWt0dWFsbmVqIGtvbmZpZ3VyYWNqaSBBUlN0dWRpb0NvbmZpZyAodyB0eW0gZW52TGlnaHRpbmdJbnRlbnNpdHksIHBhcmFsbGF4SW50ZW5zaXR5IGkgX0ZvZ0RlbnNpdHkpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VW5pdHlTY3JpcHRzV2l0aENvbmZpZyhcbiAgY29uZmlnOiBBUlN0dWRpb0NvbmZpZ1xuKTogVW5pdHlDb2RlU2NyaXB0W10ge1xuICBjb25zdCBlbnZMaWdodFN0ciA9IChjb25maWcuZW52TGlnaHRpbmdJbnRlbnNpdHkgPz8gMS4yKS50b0ZpeGVkKDIpO1xuICBjb25zdCBwYXJhbGxheFN0ciA9IChjb25maWcucGFyYWxsYXhJbnRlbnNpdHkgPz8gMC44NSkudG9GaXhlZCgyKTtcbiAgY29uc3QgZm9nRGVuc2l0eVN0ciA9IGNvbmZpZy5lbmFibGVBdG1vc3BoZXJpY0ZvZyA/ICcwLjA2NScgOiAnMC4wMDAnO1xuXG4gIHJldHVybiBVTklUWV9DT0RFX1NDUklQVFMubWFwKChzY3JpcHQpID0+IHtcbiAgICBpZiAoc2NyaXB0LmlkID09PSAnbGlnaHRpbmdfb2NjbHVzaW9uJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc2NyaXB0LFxuICAgICAgICBjb2RlOiBzY3JpcHQuY29kZS5yZXBsYWNlKFxuICAgICAgICAgICdwcml2YXRlIGZsb2F0IGVudkxpZ2h0aW5nSW50ZW5zaXR5ID0gMS4yMGY7JyxcbiAgICAgICAgICBgcHJpdmF0ZSBmbG9hdCBlbnZMaWdodGluZ0ludGVuc2l0eSA9ICR7ZW52TGlnaHRTdHJ9ZjtgXG4gICAgICAgICksXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoc2NyaXB0LmlkID09PSAncGFyYWxsYXhfY29udHJvbGxlcicpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnNjcmlwdCxcbiAgICAgICAgY29kZTogc2NyaXB0LmNvZGUucmVwbGFjZShcbiAgICAgICAgICAncHJpdmF0ZSBmbG9hdCBwYXJhbGxheFN0cmVuZ3RoID0gMC44NWY7JyxcbiAgICAgICAgICBgcHJpdmF0ZSBmbG9hdCBwYXJhbGxheFN0cmVuZ3RoID0gJHtwYXJhbGxheFN0cn1mO2BcbiAgICAgICAgKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChzY3JpcHQuaWQgPT09ICdob2xvZ3JhbV93aW5kb3dfc2hhZGVyJykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc2NyaXB0LFxuICAgICAgICBjb2RlOiBzY3JpcHQuY29kZS5yZXBsYWNlKFxuICAgICAgICAgICdfRm9nRGVuc2l0eSAoXCJHxJlzdG/Fm8SHIE1nxYJ5IEF0bW9zZmVyeWN6bmVqXCIsIFJhbmdlKDAuMCwgMC4yNSkpID0gMC4wNjUnLFxuICAgICAgICAgIGBfRm9nRGVuc2l0eSAoXCJHxJlzdG/Fm8SHIE1nxYJ5IEF0bW9zZmVyeWN6bmVqXCIsIFJhbmdlKDAuMCwgMC4yNSkpID0gJHtmb2dEZW5zaXR5U3RyfWBcbiAgICAgICAgKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBzY3JpcHQ7XG4gIH0pO1xufVxuXG4iXX0=