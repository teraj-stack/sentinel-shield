const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport5_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport5_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch_studio/node_modules/.vite/deps/react.js?v=c1c4f681";
import * as THREE from "/apps/holoarch_studio/node_modules/.vite/deps/three.js?v=c1c4f681";
import { Bot, Camera, ChevronDown, ChevronUp, Download, Eye, Layers, Maximize2, Minimize2, RotateCcw, Sliders, Sparkles } from "/apps/holoarch_studio/node_modules/.vite/deps/lucide-react.js?v=c1c4f681";
import { ARCHITECTURAL_SCENES, HOLOGRAM_PALETTES } from "/apps/holoarch_studio/src/data/arStudioData.ts";
import { exportGroupToOBJ, exportGroupToSTL } from "/apps/holoarch_studio/src/utils/exporters.ts";
var _jsxFileName = "/app/applet/src/components/HologramViewport3D.tsx";
import __vite__cjsImport5_react_jsxDevRuntime from "/apps/holoarch_studio/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c1c4f681";
const _dummyMatrix = new THREE.Matrix4();
const _dummyPos = new THREE.Vector3();
const _dummyQuat = new THREE.Quaternion();
const _dummyScale = new THREE.Vector3();
const _dummyColor = new THREE.Color();
function createBeveledTowerGeometry(width, depth, height, bevel = .04) {
	const shape = new THREE.Shape();
	const hw = width / 2;
	const hd = depth / 2;
	shape.moveTo(-hw, -hd);
	shape.lineTo(hw, -hd);
	shape.lineTo(hw, hd);
	shape.lineTo(-hw, hd);
	shape.closePath();
	const geom = new THREE.ExtrudeGeometry(shape, {
		depth: height,
		bevelEnabled: true,
		bevelSegments: 2,
		steps: 1,
		bevelSize: bevel,
		bevelThickness: bevel
	});
	geom.rotateX(-Math.PI / 2);
	geom.computeVertexNormals();
	return geom;
}
/**
* Builds composite 8-12 part procedural architectural building groups for each scene
* so both the 3D viewport and the .OBJ / .STL CAD exporters have full 3D mesh geometry.
*/
export function buildArchitecturalSceneGroup(sceneId, primaryHex, secondaryHex, wireframeEnabled, heightMult = 1) {
	const group = new THREE.Group();
	group.name = `HoloScene_${sceneId}`;
	const primaryColor = new THREE.Color(primaryHex);
	const secondaryColor = new THREE.Color(secondaryHex);
	const glassMat = new THREE.MeshPhysicalMaterial({
		color: primaryColor,
		emissive: primaryColor,
		emissiveIntensity: .45,
		roughness: .12,
		metalness: .25,
		clearcoat: 1,
		clearcoatRoughness: .1,
		transparent: true,
		opacity: .78,
		wireframe: wireframeEnabled
	});
	const coreMat = new THREE.MeshStandardMaterial({
		color: secondaryColor,
		emissive: secondaryColor,
		emissiveIntensity: .55,
		roughness: .45,
		metalness: .82,
		transparent: true,
		opacity: .9
	});
	const frameMat = new THREE.MeshStandardMaterial({
		color: primaryColor,
		emissive: primaryColor,
		emissiveIntensity: .75,
		roughness: .2,
		metalness: .9,
		wireframe: true
	});
	const podiumMat = new THREE.MeshStandardMaterial({
		color: new THREE.Color("#0F172A"),
		emissive: primaryColor,
		emissiveIntensity: .3,
		roughness: .65,
		metalness: .35,
		transparent: true,
		opacity: .92
	});
	const addPart = (geom, mat, pos, layerIndex, name, rotY = 0, shapeType = "tower") => {
		geom.computeBoundingBox();
		const bbox = geom.boundingBox;
		const size = new THREE.Vector3(.6, 1.2, .6);
		if (bbox) {
			bbox.getSize(size);
		}
		const mesh = new THREE.Mesh(geom, mat);
		mesh.position.set(pos[0], pos[1], pos[2]);
		mesh.rotation.y = rotY;
		mesh.name = name;
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.userData = {
			baseY: pos[1],
			layerIndex,
			boxSize: [
				size.x,
				size.y,
				size.z
			],
			shapeType,
			partLabel: name.replace(/_/g, " ")
		};
		group.add(mesh);
		if (!wireframeEnabled && layerIndex >= 1) {
			const edges = new THREE.EdgesGeometry(geom);
			const lineMat = new THREE.LineBasicMaterial({
				color: layerIndex === 3 ? secondaryColor : primaryColor,
				transparent: true,
				opacity: .85
			});
			const lineSeg = new THREE.LineSegments(edges, lineMat);
			mesh.add(lineSeg);
		}
	};
	// InstancedMesh (>20 repeated surrounding urban context blocks & LiDAR boundary markers)
	const instCount = 36;
	const instBlockGeom = new THREE.BoxGeometry(.18, .28, .18);
	instBlockGeom.translate(0, .14, 0);
	const instMat = new THREE.MeshStandardMaterial({
		color: "#ffffff",
		emissive: primaryColor,
		emissiveIntensity: .35,
		roughness: .35,
		metalness: .6,
		transparent: true,
		opacity: .72
	});
	const cityInstanced = new THREE.InstancedMesh(instBlockGeom, instMat, instCount);
	cityInstanced.name = "Urban_Context_Instanced";
	cityInstanced.userData = {
		baseY: 0,
		layerIndex: 0
	};
	for (let i = 0; i < instCount; i++) {
		const angle = i / instCount * Math.PI * 2;
		const radius = 1.75 + i % 3 * .26;
		_dummyPos.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
		_dummyQuat.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angle);
		const sXZ = .85 + i % 5 * .08;
		const sY = (.55 + i * 7 % 11 * .16) * heightMult;
		_dummyScale.set(sXZ, sY, sXZ);
		_dummyMatrix.compose(_dummyPos, _dummyQuat, _dummyScale);
		cityInstanced.setMatrixAt(i, _dummyMatrix);
		_dummyColor.copy(i % 4 === 0 ? secondaryColor : primaryColor).multiplyScalar(.8 + i % 3 * .12);
		cityInstanced.setColorAt(i, _dummyColor);
	}
	cityInstanced.instanceMatrix.needsUpdate = true;
	if (cityInstanced.instanceColor) cityInstanced.instanceColor.needsUpdate = true;
	cityInstanced.computeBoundingSphere();
	group.add(cityInstanced);
	const hm = heightMult;
	if (sceneId === "skyline_financial") {
		const podiumCyl = new THREE.CylinderGeometry(2.3, 2.48, .14, 36);
		podiumCyl.translate(0, .07, 0);
		addPart(podiumCyl, podiumMat, [
			0,
			0,
			0
		], 0, "Podium_Base", 0, "cylinder");
		addPart(createBeveledTowerGeometry(2.6, 1.8, .22, .03), podiumMat, [
			0,
			.08,
			0
		], 0, "Atrium_Concourse");
		// Layer 1: Internal Structural Cores
		addPart(createBeveledTowerGeometry(.46, .46, 3.2 * hm, .02), coreMat, [
			0,
			.12,
			0
		], 1, "Rdzeń_Główny_342m");
		addPart(createBeveledTowerGeometry(.34, .34, 2.15 * hm, .02), coreMat, [
			-1.05,
			.12,
			.35
		], 1, "Rdzeń_Zachodni");
		addPart(createBeveledTowerGeometry(.34, .34, 2.4 * hm, .02), coreMat, [
			1.05,
			.12,
			-.25
		], 1, "Rdzeń_Wschodni");
		// Layer 2: Beveled Curtain Wall Facades & Setback Tiers
		addPart(createBeveledTowerGeometry(.88, .88, 2.4 * hm, .05), glassMat, [
			0,
			.12,
			0
		], 2, "Wieża_Centralna_T1");
		addPart(createBeveledTowerGeometry(.66, .66, 1.3 * hm, .04), glassMat, [
			0,
			2.42 * hm,
			0
		], 2, "Głowica_Diagrid_T1", Math.PI / 4);
		addPart(createBeveledTowerGeometry(.66, .66, 2.05 * hm, .04), glassMat, [
			-1.05,
			.12,
			.35
		], 2, "Wieża_Finansowa_W2");
		addPart(createBeveledTowerGeometry(.68, .68, 2.3 * hm, .04), glassMat, [
			1.05,
			.12,
			-.25
		], 2, "Wieża_Finansowa_E3");
		addPart(createBeveledTowerGeometry(.54, .54, 1.48 * hm, .03), glassMat, [
			.78,
			.12,
			.82
		], 2, "Wieża_Południowa_S4");
		addPart(createBeveledTowerGeometry(.5, .5, 1.32 * hm, .03), glassMat, [
			-.82,
			.12,
			-.72
		], 2, "Wieża_Północna_N5");
		// Layer 3: Skybridges & Spire
		addPart(createBeveledTowerGeometry(1.05, .24, .16, .02), coreMat, [
			-.52,
			1.55 * hm,
			.18
		], 3, "Skybridge_Zachód", 0, "bridge");
		addPart(createBeveledTowerGeometry(1.05, .24, .16, .02), coreMat, [
			.52,
			1.78 * hm,
			-.12
		], 3, "Skybridge_Wschód", 0, "bridge");
		const lathePoints = [
			new THREE.Vector2(.36, 0),
			new THREE.Vector2(.24, .3 * hm),
			new THREE.Vector2(.1, .7 * hm),
			new THREE.Vector2(.02, 1.35 * hm)
		];
		addPart(new THREE.LatheGeometry(lathePoints, 16), frameMat, [
			0,
			3.68 * hm,
			0
		], 3, "Iglica_Telekomunikacyjna", 0, "cylinder");
	} else if (sceneId === "eco_atrium") {
		const baseCyl = new THREE.CylinderGeometry(2.45, 2.6, .16, 40);
		baseCyl.translate(0, .08, 0);
		addPart(baseCyl, podiumMat, [
			0,
			0,
			0
		], 0, "Baza_Kampusu", 0, "cylinder");
		for (let i = 0; i < 4; i++) {
			const angle = i * Math.PI / 2 + Math.PI / 4;
			addPart(createBeveledTowerGeometry(.52, .52, 1.9 * hm, .04), coreMat, [
				Math.cos(angle) * 1.15,
				.12,
				Math.sin(angle) * 1.15
			], 1, `Trzon_Bioklimatyczny_${i + 1}`);
		}
		addPart(createBeveledTowerGeometry(1.85, 1.85, .55 * hm, .06), glassMat, [
			0,
			.45 * hm,
			0
		], 2, "Taras_Dolny_Atrium");
		addPart(createBeveledTowerGeometry(1.45, 1.45, .55 * hm, .05), glassMat, [
			0,
			1.12 * hm,
			0
		], 2, "Taras_Środkowy_Ogrody");
		addPart(new THREE.SphereGeometry(.92, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2), glassMat, [
			0,
			.16,
			0
		], 2, "Kopuła_Geodezyjna_Bio", 0, "dome");
		addPart(createBeveledTowerGeometry(1.1, 1.1, .35 * hm, .04), frameMat, [
			0,
			1.75 * hm,
			0
		], 3, "Korona_Solarna_PV");
		addPart(createBeveledTowerGeometry(2.35, .28, .14, .02), coreMat, [
			0,
			1.25 * hm,
			0
		], 3, "Pasaż_Powietrzny_NS", 0, "bridge");
		addPart(createBeveledTowerGeometry(.28, 2.35, .14, .02), coreMat, [
			0,
			1.25 * hm,
			0
		], 3, "Pasaż_Powietrzny_EW", 0, "bridge");
	} else if (sceneId === "crystal_stacked_prism") {
		// 04. Makieta Warstwowa "Crystal Prism LED" (inspired by glass1.png, glass2.png, 50 Rise Tower)
		addPart(createBeveledTowerGeometry(2.6, 1.9, .14, .03), podiumMat, [
			0,
			0,
			0
		], 0, "Czarny_Postument_Gabloty");
		// Warm LED illuminated vertical cores
		addPart(createBeveledTowerGeometry(.32, .32, 2.55 * hm, .02), coreMat, [
			-.38,
			.12,
			-.15
		], 1, "Kolumna_LED_Bursztyn_W1");
		addPart(createBeveledTowerGeometry(.32, .32, 2.85 * hm, .02), coreMat, [
			.38,
			.12,
			.15
		], 1, "Kolumna_LED_Bursztyn_E2");
		// Cantilevered horizontal optical glass slabs (8 stacked tiers with shifts)
		for (let s = 0; s < 8; s++) {
			const slabY = (.24 + s * .32) * hm;
			const offsetX = (s % 3 - 1) * .16;
			const offsetZ = ((s + 1) % 3 - 1) * .12;
			const wSlab = 1.65 - s * .06;
			const dSlab = 1.25 - s * .04;
			addPart(createBeveledTowerGeometry(wSlab, dSlab, .15 * hm, .025), glassMat, [
				offsetX,
				slabY,
				offsetZ
			], s < 5 ? 2 : 3, `Tafla_Szkła_Optycznego_P0${s + 1}`);
		}
		addPart(createBeveledTowerGeometry(.95, .75, .24 * hm, .03), frameMat, [
			.12,
			2.84 * hm,
			0
		], 3, "Świetlik_Pryzmatyczny_Korony");
	} else if (sceneId === "voronoi_bionic_spire") {
		// 05. Wieża Bioniczna "Voronoi Helix Spire" (inspired by The Torch 325m, Voronoi cellular towers)
		const voronoiBase = new THREE.CylinderGeometry(2.1, 2.35, .16, 32);
		voronoiBase.translate(0, .08, 0);
		addPart(voronoiBase, podiumMat, [
			0,
			0,
			0
		], 0, "Baza_Korzeniowa_Voronoi", 0, "cylinder");
		// Twisted Helical Core & 7 Rotating Bionic Tiers
		addPart(new THREE.CylinderGeometry(.34, .48, 3.3 * hm, 20), coreMat, [
			0,
			.14,
			0
		], 1, "Rdzeń_Helikalny_Torch_325m", 0, "cylinder");
		for (let t = 0; t < 7; t++) {
			const tierY = (.18 + t * .44) * hm;
			const scaleR = 1.18 - t * .08;
			const twistRot = t * Math.PI / 9;
			addPart(createBeveledTowerGeometry(scaleR, scaleR * .86, .38 * hm, .04), t % 2 === 0 ? glassMat : frameMat, [
				Math.sin(twistRot) * .08,
				tierY,
				Math.cos(twistRot) * .08
			], t < 5 ? 2 : 3, `Segment_Voronoi_Helix_0${t + 1}`, twistRot);
		}
		// Crown observation spiral ring
		addPart(new THREE.SphereGeometry(.56, 20, 16), glassMat, [
			0,
			3.35 * hm,
			0
		], 3, "Kopuła_Obserwacyjna_Torch", 0, "dome");
		addPart(createBeveledTowerGeometry(.14, .14, .95 * hm, .01), frameMat, [
			0,
			3.65 * hm,
			0
		], 3, "Iglica_Bioniczna_325m");
	} else if (sceneId === "kinetic_calatrava_wing") {
		// 06. Rzeźba Kinetyczna "Aerodynamic Wing" (inspired by -0.png, 67243a334ef658da6dda9b7adeabd8e0.jpg)
		const pedestal = new THREE.CylinderGeometry(1.35, 1.5, .12, 36);
		pedestal.translate(0, .06, 0);
		addPart(pedestal, podiumMat, [
			0,
			0,
			0
		], 0, "Dysk_Bazowy_Tytan", 0, "cylinder");
		// Sweeping curved spine base
		addPart(createBeveledTowerGeometry(.55, .36, .95 * hm, .04), coreMat, [
			.45,
			.12,
			0
		], 1, "Kręgosłup_Nośny_Skrzydła", -.25);
		// 10 Fanning Aerodynamic Titanium Ribs following a logarithmic spiral curve
		for (let r = 0; r < 10; r++) {
			const progress = r / 9;
			const ribY = (.35 + progress * 2.75) * hm;
			const ribX = .35 - Math.sin(progress * Math.PI * .85) * .65;
			const ribZ = (progress - .5) * .42;
			const ribLength = (1.35 + Math.sin(progress * Math.PI) * .95) * hm;
			addPart(createBeveledTowerGeometry(ribLength, .12, .18 * hm, .02), r % 3 === 0 ? coreMat : glassMat, [
				ribX,
				ribY,
				ribZ
			], r < 7 ? 2 : 3, `Pióro_Kinetyczne_Tytan_0${r + 1}`, progress * .65 - .3, "bridge");
		}
	} else if (sceneId === "hydro_aqua_sculpture") {
		// 07. Hydro-Rzeźba "Liquid Crystal Splash" (inspired by 0.jpg, 97a6d95b, 923f4fd5)
		const glassVessel = new THREE.CylinderGeometry(1.45, 1.32, .85 * hm, 36);
		glassVessel.translate(0, .42 * hm, 0);
		addPart(glassVessel, glassMat, [
			0,
			0,
			0
		], 0, "Szklane_Naczynie_Krystaliczne", 0, "cylinder");
		// Rising Fluid Vortex Torso & Crest Waves
		addPart(createBeveledTowerGeometry(.68, .58, 1.65 * hm, .06), glassMat, [
			0,
			.72 * hm,
			0
		], 1, "Wir_Wodny_Rdzeń_Hydro");
		addPart(createBeveledTowerGeometry(1.55, .32, .38 * hm, .04), coreMat, [
			-.45,
			1.95 * hm,
			.15
		], 2, "Lewe_Ramię_Rozbryzgu", .35, "bridge");
		addPart(createBeveledTowerGeometry(1.45, .32, .36 * hm, .04), coreMat, [
			.48,
			1.75 * hm,
			-.15
		], 2, "Prawe_Ramię_Fali", -.35, "bridge");
		addPart(new THREE.SphereGeometry(.42, 24, 18), glassMat, [
			.05,
			2.48 * hm,
			0
		], 2, "Głowica_Wodna_Refrakcja", 0, "dome");
		// Suspended 3D Water Droplets in mid-air
		const droplets = [
			[
				1.05,
				2.65 * hm,
				.25,
				.34,
				"Kropla_Sferyczna_Główna"
			],
			[
				-.95,
				2.45 * hm,
				-.2,
				.22,
				"Kropla_Zawieszona_W1"
			],
			[
				.72,
				1.35 * hm,
				.55,
				.18,
				"Kropla_Krystaliczna_E2"
			],
			[
				-.68,
				1.45 * hm,
				-.48,
				.19,
				"Kropla_Krystaliczna_N3"
			],
			[
				.15,
				3.12 * hm,
				.1,
				.24,
				"Korona_Kropli_Zenith"
			]
		];
		droplets.forEach(([dx, dy, dz, rDrop, dName]) => {
			addPart(new THREE.SphereGeometry(rDrop, 18, 14), glassMat, [
				dx,
				dy,
				dz
			], 3, dName, 0, "dome");
		});
	} else {
		// aero_hub
		addPart(createBeveledTowerGeometry(3.4, 2.1, .18, .03), podiumMat, [
			0,
			0,
			0
		], 0, "Płyta_Peronowa_KDP");
		addPart(createBeveledTowerGeometry(2.9, .38, .65 * hm, .03), coreMat, [
			0,
			.16,
			-.65
		], 1, "Nawa_Północna_Terminalu");
		addPart(createBeveledTowerGeometry(2.9, .38, .65 * hm, .03), coreMat, [
			0,
			.16,
			.65
		], 1, "Nawa_Południowa_Terminalu");
		addPart(createBeveledTowerGeometry(.46, .46, 2.85 * hm, .04), coreMat, [
			1.35,
			.14,
			0
		], 1, "Wieża_Kontroli_Lotów_ATC");
		addPart(createBeveledTowerGeometry(2.6, 1.35, 1.15 * hm, .06), glassMat, [
			0,
			.22,
			0
		], 2, "Hala_Główna_Odpraw");
		addPart(createBeveledTowerGeometry(3.15, 1.75, .22 * hm, .04), frameMat, [
			0,
			1.45 * hm,
			0
		], 3, "Dach_Kratownicowy_Wave");
		addPart(createBeveledTowerGeometry(.76, .76, .42 * hm, .04), glassMat, [
			1.35,
			2.95 * hm,
			0
		], 3, "Kopuła_Radarowa_ATC");
	}
	return group;
}
/**
* High-Precision, Zero-Fail 3D Holographic Architectural & Spatial Agent Renderer.
* Renders crystal-clear 3D buildings with floor slabs, diagrids, glowing cores, tabletop world map,
* LiDAR surface grid, window particles, and live 3D Autonomous AI Agents moving on a 3D NavMesh!
*/
function startHologram3DEngine(container, configRef, pointerStateRef, buildingGroupRef, canvasRef) {
	const canvas = document.createElement("canvas");
	canvas.className = "w-full h-full block";
	container.innerHTML = "";
	container.appendChild(canvas);
	canvasRef.current = canvas;
	const ctx = canvas.getContext("2d");
	let frameId = 0;
	let isDisposed = false;
	// Atmospheric & Window Particles
	const particles = Array.from({ length: 160 }, (_, i) => ({
		x: (Math.random() - .5) * 9,
		y: Math.random() * 4.2,
		z: i < 100 ? -2.4 - Math.random() * 1.6 : (Math.random() - .5) * 3.2,
		speed: .25 + i % 5 * .09,
		isGold: i < 100
	}));
	// 36 Urban Context Blocks around the main complex (matches InstancedMesh)
	const urbanContextBlocks = Array.from({ length: 32 }, (_, i) => {
		const angle = i / 32 * Math.PI * 2;
		const radius = 1.82 + i % 3 * .28;
		return {
			x: Math.cos(angle) * radius,
			z: Math.sin(angle) * radius,
			w: .11 + i % 3 * .03,
			h: .22 + i * 7 % 9 * .08,
			isSecondary: i % 4 === 0
		};
	});
	// Autonomous Spatial AI Agents Definitions
	const agentCatalog = [
		{
			id: "AG-01",
			role: "LiDAR Depth Scanner",
			color: "#38BDF8",
			phaseOffset: 0
		},
		{
			id: "AG-02",
			role: "BIM Structure Inspector",
			color: "#F59E0B",
			phaseOffset: 1.57
		},
		{
			id: "AG-03",
			role: "NavMesh Path Planner",
			color: "#10B981",
			phaseOffset: 3.14
		},
		{
			id: "AG-04",
			role: "HDR Light Probe",
			color: "#A855F7",
			phaseOffset: 4.71
		},
		{
			id: "AG-05",
			role: "Occlusion Raycaster",
			color: "#EC4899",
			phaseOffset: .85
		},
		{
			id: "AG-06",
			role: "CAD Mesh Serializer",
			color: "#E2E8F0",
			phaseOffset: 2.35
		}
	];
	const resize = () => {
		const rect = container.getBoundingClientRect();
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const w = Math.max(rect.width || container.clientWidth || 960, 320);
		const h = Math.max(rect.height || container.clientHeight || 620, 320);
		canvas.width = Math.round(w * dpr);
		canvas.height = Math.round(h * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	};
	resize();
	const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => resize()) : null;
	if (resizeObserver) resizeObserver.observe(container);
	window.addEventListener("resize", resize);
	let lastTime = performance.now();
	let accumTime = 0;
	const renderFrame = (now) => {
		if (isDisposed) return;
		const dt = Math.min((now - lastTime) / 1e3, .1);
		lastTime = now;
		accumTime += dt;
		const cfg = configRef.current;
		const pState = pointerStateRef.current;
		const pal = HOLOGRAM_PALETTES[cfg.uiSettings.palette];
		pState.transitionScale = THREE.MathUtils.damp(pState.transitionScale, cfg.modelScale, 6.5, dt);
		if (cfg.autoRotate && !pState.isDragging && buildingGroupRef.current) {
			buildingGroupRef.current.rotation.y += dt * .25;
		} else if (buildingGroupRef.current) {
			buildingGroupRef.current.rotation.y = THREE.MathUtils.damp(buildingGroupRef.current.rotation.y, THREE.MathUtils.degToRad(cfg.modelRotationY), 8, dt);
		}
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		const w = canvas.width / dpr;
		const h = canvas.height / dpr;
		const cx = w / 2;
		const horizonShift = (cfg.horizonOffsetY || 0) * h;
		const cy = h * .65 + horizonShift;
		// Deep Parallax Multi-Layer Offsets (Foreground, Midground, Distant Landscape)
		const droneDriftX = cfg.droneFlightActive ? Math.sin(accumTime * .38) * 26 : 0;
		const droneDriftY = cfg.droneFlightActive ? Math.cos(accumTime * .29) * 11 : 0;
		const px = pState.parallaxX * cfg.parallaxIntensity * 44 + droneDriftX;
		const py = pState.parallaxY * cfg.parallaxIntensity * 24 + droneDriftY;
		const landscape = cfg.droneLandscape || "alpine_peaks";
		// 1. Virtual Drone Flight Landscape Backdrop ("Space to Luksus")
		const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
		if (landscape === "cosmic_orbital") {
			bgGrad.addColorStop(0, "#02040A");
			bgGrad.addColorStop(.38, "#090D24");
			bgGrad.addColorStop(.68, "#111836");
			bgGrad.addColorStop(1, "#040711");
		} else if (landscape === "ocean_wellness") {
			bgGrad.addColorStop(0, "#071929");
			bgGrad.addColorStop(.45, "#0F2E47");
			bgGrad.addColorStop(.65, "#0A2239");
			bgGrad.addColorStop(1, "#04101C");
		} else if (landscape === "alpine_peaks") {
			bgGrad.addColorStop(0, "#040B16");
			bgGrad.addColorStop(.42, "#0D1F33");
			bgGrad.addColorStop(.64, "#091526");
			bgGrad.addColorStop(1, "#040811");
		} else {
			bgGrad.addColorStop(0, "#050912");
			bgGrad.addColorStop(.42, "#0B1324");
			bgGrad.addColorStop(.62, "#08101E");
			bgGrad.addColorStop(1, "#04070D");
		}
		ctx.fillStyle = bgGrad;
		ctx.fillRect(0, 0, w, h);
		// 2. Environmental Lighting & Nebula / Sun Glow
		if (cfg.environmentalLighting) {
			const tNorm = (cfg.lightTemperatureK - 2800) / (6500 - 2800);
			const glowColor = landscape === "cosmic_orbital" ? "rgba(139, 92, 246, 0.26)" : tNorm < .45 ? "rgba(245, 158, 11, 0.24)" : "rgba(56, 189, 248, 0.22)";
			const sunGrad = ctx.createRadialGradient(cx - px * .35, h * .32 - py * .25, 18, cx - px * .35, h * .32 - py * .25, w * .62);
			sunGrad.addColorStop(0, glowColor);
			sunGrad.addColorStop(.55, "rgba(6, 182, 212, 0.09)");
			sunGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
			ctx.fillStyle = sunGrad;
			ctx.fillRect(0, 0, w, h * .75);
		}
		// 2B. Deep-Parallax Drone Vista Geometry (Mountains, Cosmic Rings, Ocean Waves, or Skyline)
		ctx.save();
		if (landscape === "alpine_peaks") {
			// Distant Mountain Range Layer 1 (Deepest Parallax)
			ctx.fillStyle = "rgba(15, 32, 56, 0.72)";
			ctx.strokeStyle = "rgba(56, 189, 248, 0.28)";
			ctx.lineWidth = 1.2;
			ctx.beginPath();
			ctx.moveTo(0, h * .52);
			for (let mx = -120; mx <= w + 120; mx += 65) {
				const peakH = 65 + Math.sin(mx * .014 + 1.2) * 48 + Math.cos(mx * .029) * 32;
				ctx.lineTo(mx - px * .18, h * .48 - peakH - py * .12);
			}
			ctx.lineTo(w, h * .52);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			// Mid-Distance Alpine Ridges with Wireframe Topographic Contours (Layer 2 Parallax)
			ctx.fillStyle = "rgba(9, 20, 38, 0.84)";
			ctx.strokeStyle = "rgba(34, 211, 238, 0.38)";
			ctx.beginPath();
			ctx.moveTo(0, h * .56);
			for (let mx = -100; mx <= w + 100; mx += 48) {
				const peakH = 38 + Math.cos(mx * .019 + .5) * 36 + Math.sin(mx * .037) * 22;
				ctx.lineTo(mx - px * .36, h * .53 - peakH - py * .22);
			}
			ctx.lineTo(w, h * .56);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		} else if (landscape === "cosmic_orbital") {
			// Deep Space Starfield & Orbital Horizon Curve
			for (let s = 0; s < 55; s++) {
				const sx = s * 97 % w - px * (.08 + s % 3 * .06);
				const sy = s * 53 % (h * .52) - py * .1;
				ctx.fillStyle = s % 5 === 0 ? "#F59E0B" : "#E2E8F0";
				ctx.globalAlpha = .35 + s * 13 % 50 / 100;
				ctx.beginPath();
				ctx.arc((sx + w) % w, (sy + h * .52) % (h * .52), s % 4 === 0 ? 1.8 : 1.1, 0, Math.PI * 2);
				ctx.fill();
			}
			// Planetary Orbital Arc
			ctx.globalAlpha = .45;
			ctx.strokeStyle = "#38BDF8";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(cx - px * .2, h * 1.42 - py * .15, h * .98, Math.PI * 1.18, Math.PI * 1.82);
			ctx.stroke();
		} else if (landscape === "ocean_wellness") {
			// Calm Zen Ocean Horizon & Shimmering Water Lines
			ctx.strokeStyle = "rgba(56, 189, 248, 0.28)";
			ctx.lineWidth = 1;
			for (let wl = 0; wl < 9; wl++) {
				const wy = h * .43 + wl * 11 - py * .15;
				ctx.beginPath();
				ctx.moveTo(w * .1, wy);
				ctx.lineTo(w * .9, wy);
				ctx.stroke();
			}
		} else {
			// Metropolis Dawn / Executive Skyline Silhouettes
			ctx.fillStyle = "rgba(15, 23, 42, 0.6)";
			for (let s = -9; s <= 9; s++) {
				const bw = 26 + Math.abs(s) * 13 % 20;
				const bh = 38 + Math.abs(Math.sin(s * 2.1)) * 88;
				ctx.fillRect(cx + s * 56 - px * .28, h * .46 - bh - py * .15, bw, bh);
			}
		}
		ctx.restore();
		// 3D -> 2D Wide-Perspective Projection Helper (Responsive to perspectiveFovDeg 28°..85°)
		const fovDeg = cfg.perspectiveFovDeg || 62;
		const fovFactor = (fovDeg - 28) / (85 - 28);
		const rotY = buildingGroupRef.current ? buildingGroupRef.current.rotation.y : .45;
		const cosY = Math.cos(rotY);
		const sinY = Math.sin(rotY);
		const baseScale = pState.transitionScale * Math.min(w, h) * (.145 + (1 - fovFactor) * .035);
		const tilt = THREE.MathUtils.clamp((pState.cameraElevation - 1.2) * .22 + (cfg.gyroPitchDeg || 0) * .005, .18, .56);
		const cameraDist = 6.6 - fovFactor * 1.85;
		const focalLen = 5.8 - fovFactor * 1.15;
		const project3D = (x, y, z) => {
			const rx = x * cosY - z * sinY;
			const rz = x * sinY + z * cosY;
			const depth = cameraDist + rz * (.42 + fovFactor * .35);
			const persp = focalLen / Math.max(1.4, depth);
			return {
				sx: cx + rx * baseScale * persp + px * (.65 + persp * .35),
				sy: cy - y * baseScale * persp + rz * baseScale * tilt * persp + py * .75,
				depth,
				persp
			};
		};
		// 3. Floor Plane Detection Grid (PlaneClassification.Floor)
		if (cfg.uiSettings.showPlaneGrid && cfg.planeDetectionMode !== "table_only") {
			ctx.save();
			ctx.strokeStyle = "rgba(6, 182, 212, 0.14)";
			ctx.lineWidth = 1;
			for (let fg = -4.2; fg <= 4.2; fg += .85) {
				const fp1 = project3D(fg, -.85, -3);
				const fp2 = project3D(fg, -.85, 3);
				ctx.beginPath();
				ctx.moveTo(fp1.sx, fp1.sy);
				ctx.lineTo(fp2.sx, fp2.sy);
				ctx.stroke();
			}
			ctx.restore();
		}
		// 4. Holographic Craftbench / AR Tabletop Surface Plane
		ctx.save();
		const tCorners = [
			project3D(-3.6, 0, -2.25),
			project3D(3.6, 0, -2.25),
			project3D(3.6, 0, 2.25),
			project3D(-3.6, 0, 2.25)
		];
		ctx.fillStyle = "rgba(7, 13, 25, 0.84)";
		ctx.strokeStyle = pal.primaryHex;
		ctx.lineWidth = 1.5;
		ctx.beginPath();
		ctx.moveTo(tCorners[0].sx, tCorners[0].sy);
		tCorners.slice(1).forEach((c) => ctx.lineTo(c.sx, c.sy));
		ctx.closePath();
		ctx.fill();
		ctx.globalAlpha = .55;
		ctx.stroke();
		// Tabletop LiDAR & Perspective Grid
		ctx.strokeStyle = pal.primaryHex;
		ctx.globalAlpha = .22;
		ctx.lineWidth = 1;
		for (let g = -3.2; g <= 3.2; g += .4) {
			const p1 = project3D(g, 0, -2.1);
			const p2 = project3D(g, 0, 2.1);
			ctx.beginPath();
			ctx.moveTo(p1.sx, p1.sy);
			ctx.lineTo(p2.sx, p2.sy);
			ctx.stroke();
		}
		for (let gz = -2; gz <= 2; gz += .4) {
			const p3 = project3D(-3.2, 0, gz);
			const p4 = project3D(3.2, 0, gz);
			ctx.beginPath();
			ctx.moveTo(p3.sx, p3.sy);
			ctx.lineTo(p4.sx, p4.sy);
			ctx.stroke();
		}
		// Glowing Concentric Radar & AR Anchor Rings on Tabletop
		[
			.95,
			1.6,
			2.35
		].forEach((r, idx) => {
			ctx.strokeStyle = idx % 2 === 0 ? pal.primaryHex : pal.secondaryHex;
			ctx.globalAlpha = .6 - idx * .12;
			ctx.lineWidth = idx === 0 ? 2.2 : 1.3;
			ctx.beginPath();
			for (let a = 0; a <= 64; a++) {
				const ang = a / 64 * Math.PI * 2 + (idx === 1 ? accumTime * .18 : 0);
				const pt = project3D(Math.cos(ang) * r, .01, Math.sin(ang) * r);
				if (a === 0) ctx.moveTo(pt.sx, pt.sy);
				else ctx.lineTo(pt.sx, pt.sy);
			}
			ctx.stroke();
		});
		ctx.restore();
		// 5. Render Surrounding Urban Context Blocks (InstancedMesh Representation)
		urbanContextBlocks.forEach((ub) => {
			const bh = ub.h * (cfg.towerHeightMultiplier || 1);
			const b2 = project3D(ub.x + ub.w, 0, ub.z + ub.w);
			const b3 = project3D(ub.x - ub.w, 0, ub.z + ub.w);
			const t0 = project3D(ub.x - ub.w, bh, ub.z - ub.w);
			const t1 = project3D(ub.x + ub.w, bh, ub.z - ub.w);
			const t2 = project3D(ub.x + ub.w, bh, ub.z + ub.w);
			const t3 = project3D(ub.x - ub.w, bh, ub.z + ub.w);
			const col = ub.isSecondary ? pal.secondaryHex : pal.primaryHex;
			ctx.strokeStyle = col;
			ctx.fillStyle = col;
			ctx.globalAlpha = .18;
			ctx.beginPath();
			ctx.moveTo(b3.sx, b3.sy);
			ctx.lineTo(b2.sx, b2.sy);
			ctx.lineTo(t2.sx, t2.sy);
			ctx.lineTo(t3.sx, t3.sy);
			ctx.closePath();
			ctx.fill();
			ctx.globalAlpha = .48;
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(t0.sx, t0.sy);
			ctx.lineTo(t1.sx, t1.sy);
			ctx.lineTo(t2.sx, t2.sy);
			ctx.lineTo(t3.sx, t3.sy);
			ctx.closePath();
			ctx.stroke();
		});
		// 6. Render Main 3D Architectural Hologram Complex & Hobby Model-Gluing Stages
		if (buildingGroupRef.current) {
			const drawItems = [];
			let meshCounter = 0;
			buildingGroupRef.current.children.forEach((child) => {
				if (child instanceof THREE.Mesh && child.userData?.boxSize) {
					meshCounter++;
					const maxHobbyStep = cfg.hobbyAssemblyStep || 12;
					if (meshCounter > maxHobbyStep) return;
					const layerIdx = child.userData.layerIndex || 0;
					const baseY = child.userData.baseY || 0;
					const [bx, by, bz] = child.userData.boxSize;
					// If this is the active hobby assembly piece being glued, give it a gentle hover offset
					const isBeingGlued = meshCounter === maxHobbyStep && maxHobbyStep < 12;
					const glueHover = isBeingGlued ? .28 + Math.sin(accumTime * 5) * .08 : 0;
					const curY = baseY + layerIdx * cfg.explodedViewFactor * .65 + glueHover;
					const centerPt = project3D(child.position.x, curY + by * .5, child.position.z);
					drawItems.push({
						orderIdx: meshCounter,
						depth: centerPt.depth,
						cx: child.position.x,
						cy: curY,
						cz: child.position.z,
						wx: bx * .5,
						wy: by,
						wz: bz * .5,
						layerIndex: layerIdx,
						shapeType: child.userData.shapeType || "tower",
						label: child.userData.partLabel || ""
					});
				}
			});
			drawItems.sort((a, b) => b.depth - a.depth);
			drawItems.forEach((item) => {
				const { cx: ix, cy: iy, cz: iz, wx, wy, wz, layerIndex, shapeType, orderIdx } = item;
				const c00 = project3D(ix - wx, iy, iz - wz);
				const c10 = project3D(ix + wx, iy, iz - wz);
				const c11 = project3D(ix + wx, iy, iz + wz);
				const c01 = project3D(ix - wx, iy, iz + wz);
				const t00 = project3D(ix - wx, iy + wy, iz - wz);
				const t10 = project3D(ix + wx, iy + wy, iz - wz);
				const t11 = project3D(ix + wx, iy + wy, iz + wz);
				const t01 = project3D(ix - wx, iy + wy, iz + wz);
				const isCoreOrCrown = layerIndex === 1 || layerIndex === 3;
				const strokeCol = isCoreOrCrown ? pal.secondaryHex : pal.primaryHex;
				ctx.save();
				ctx.strokeStyle = strokeCol;
				ctx.fillStyle = strokeCol;
				// Hobbyist CAD Assembly / Gluing Guide Connectors
				if (cfg.hobbyBlueprintConnectors && (cfg.explodedViewFactor > .05 || (cfg.hobbyAssemblyStep || 12) < 12)) {
					const baseAnchor = project3D(ix, 0, iz);
					const partBottom = project3D(ix, iy, iz);
					ctx.save();
					ctx.setLineDash([3, 3]);
					ctx.strokeStyle = "#F59E0B";
					ctx.globalAlpha = .65;
					ctx.lineWidth = 1.1;
					ctx.beginPath();
					ctx.moveTo(baseAnchor.sx, baseAnchor.sy);
					ctx.lineTo(partBottom.sx, partBottom.sy);
					ctx.stroke();
					ctx.restore();
				}
				// Holographic Shaded Faces
				if (!cfg.wireframeOverlay) {
					ctx.globalAlpha = layerIndex === 0 ? .35 : isCoreOrCrown ? .32 : .24;
					ctx.beginPath();
					ctx.moveTo(c01.sx, c01.sy);
					ctx.lineTo(c11.sx, c11.sy);
					ctx.lineTo(t11.sx, t11.sy);
					ctx.lineTo(t01.sx, t01.sy);
					ctx.closePath();
					ctx.fill();
					ctx.globalAlpha = layerIndex === 0 ? .28 : .18;
					ctx.beginPath();
					ctx.moveTo(c10.sx, c10.sy);
					ctx.lineTo(c11.sx, c11.sy);
					ctx.lineTo(t11.sx, t11.sy);
					ctx.lineTo(t10.sx, t10.sy);
					ctx.closePath();
					ctx.fill();
					ctx.globalAlpha = .38;
					ctx.beginPath();
					ctx.moveTo(t00.sx, t00.sy);
					ctx.lineTo(t10.sx, t10.sy);
					ctx.lineTo(t11.sx, t11.sy);
					ctx.lineTo(t01.sx, t01.sy);
					ctx.closePath();
					ctx.fill();
				}
				// Architectural Floor Plates
				if (wy > .45 && shapeType === "tower") {
					ctx.globalAlpha = .38;
					ctx.lineWidth = .85;
					const floors = Math.min(12, Math.max(3, Math.floor(wy * 4.5)));
					for (let f = 1; f < floors; f++) {
						const fy = iy + wy * f / floors;
						const f00 = project3D(ix - wx, fy, iz - wz);
						const f10 = project3D(ix + wx, fy, iz - wz);
						const f11 = project3D(ix + wx, fy, iz + wz);
						const f01 = project3D(ix - wx, fy, iz + wz);
						ctx.beginPath();
						ctx.moveTo(f00.sx, f00.sy);
						ctx.lineTo(f10.sx, f10.sy);
						ctx.lineTo(f11.sx, f11.sy);
						ctx.lineTo(f01.sx, f01.sy);
						ctx.closePath();
						ctx.stroke();
					}
				}
				// Crisp Glowing Structural Wireframe Edges
				ctx.globalAlpha = .95;
				ctx.lineWidth = layerIndex === 2 ? 1.8 : 1.3;
				ctx.beginPath();
				ctx.moveTo(c00.sx, c00.sy);
				ctx.lineTo(c10.sx, c10.sy);
				ctx.lineTo(c11.sx, c11.sy);
				ctx.lineTo(c01.sx, c01.sy);
				ctx.closePath();
				ctx.stroke();
				ctx.beginPath();
				ctx.moveTo(t00.sx, t00.sy);
				ctx.lineTo(t10.sx, t10.sy);
				ctx.lineTo(t11.sx, t11.sy);
				ctx.lineTo(t01.sx, t01.sy);
				ctx.closePath();
				ctx.stroke();
				[
					[c00, t00],
					[c10, t10],
					[c11, t11],
					[c01, t01]
				].forEach(([b, t]) => {
					ctx.beginPath();
					ctx.moveTo(b.sx, b.sy);
					ctx.lineTo(t.sx, t.sy);
					ctx.stroke();
				});
				if (layerIndex >= 2 && wy > .8) {
					ctx.globalAlpha = .42;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(c01.sx, c01.sy);
					ctx.lineTo(t11.sx, t11.sy);
					ctx.moveTo(c11.sx, c11.sy);
					ctx.lineTo(t01.sx, t01.sy);
					ctx.stroke();
				}
				// Show hobby assembly part tag if in step-by-step gluing mode
				if ((cfg.hobbyAssemblyStep || 12) < 12 && orderIdx === cfg.hobbyAssemblyStep) {
					ctx.fillStyle = "#F59E0B";
					ctx.font = "600 10px \"JetBrains Mono\", monospace";
					ctx.fillText(`KLEJENIE MODUŁU #0${orderIdx}: ${item.label}`, t01.sx - 20, t01.sy - 10);
				}
				ctx.restore();
			});
		}
		// 7. Render Autonomous 3D Spatial AI Agents & NavMesh Trajectories
		if (cfg.showSpatialAgents) {
			const count = Math.min(agentCatalog.length, Math.max(2, cfg.activeAgentsCount || 4));
			const hm = cfg.towerHeightMultiplier || 1;
			ctx.save();
			ctx.setLineDash([5, 5]);
			ctx.strokeStyle = "#38BDF8";
			ctx.globalAlpha = .45;
			ctx.lineWidth = 1.2;
			const navRadius = cfg.agentNavMode === "facade_scan" ? 1.25 : 2.05;
			const navHeight = cfg.agentNavMode === "floor_patrol" ? .08 : cfg.agentNavMode === "facade_scan" ? 1.45 * hm : .95 * hm;
			ctx.beginPath();
			for (let s = 0; s <= 48; s++) {
				const ang = s / 48 * Math.PI * 2;
				const np = project3D(Math.cos(ang) * navRadius, navHeight, Math.sin(ang) * navRadius);
				if (s === 0) ctx.moveTo(np.sx, np.sy);
				else ctx.lineTo(np.sx, np.sy);
			}
			ctx.stroke();
			ctx.setLineDash([]);
			for (let i = 0; i < count; i++) {
				const ag = agentCatalog[i];
				const t = accumTime * .65 + ag.phaseOffset;
				let ax = Math.cos(t) * navRadius;
				let az = Math.sin(t) * navRadius;
				let ay = navHeight + Math.sin(accumTime * 2.2 + i) * .18;
				if (cfg.agentNavMode === "facade_scan") {
					ay = (.4 + (Math.sin(t * 1.3) + 1) * .5 * 2.4) * hm;
				} else if (cfg.agentNavMode === "floor_patrol") {
					ay = .08;
					ax = Math.cos(t * .8) * (1.5 + i % 2 * .65);
					az = Math.sin(t * .8) * (1.2 + i % 2 * .45);
				}
				const agentPt = project3D(ax, ay, az);
				const scanTargetY = cfg.agentNavMode === "floor_patrol" ? 0 : ay * .65;
				const targetPt = project3D(0, scanTargetY, 0);
				const beamGrad = ctx.createLinearGradient(agentPt.sx, agentPt.sy, targetPt.sx, targetPt.sy);
				beamGrad.addColorStop(0, ag.color);
				beamGrad.addColorStop(1, "rgba(6, 182, 212, 0.02)");
				ctx.strokeStyle = beamGrad;
				ctx.lineWidth = 1.6;
				ctx.globalAlpha = .75;
				ctx.beginPath();
				ctx.moveTo(agentPt.sx, agentPt.sy);
				ctx.lineTo(targetPt.sx, targetPt.sy);
				ctx.stroke();
				const groundPt = project3D(ax, 0, az);
				ctx.strokeStyle = ag.color;
				ctx.globalAlpha = .35;
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(agentPt.sx, agentPt.sy);
				ctx.lineTo(groundPt.sx, groundPt.sy);
				ctx.stroke();
				ctx.globalAlpha = 1;
				ctx.fillStyle = ag.color;
				ctx.beginPath();
				ctx.arc(agentPt.sx, agentPt.sy, 5.5, 0, Math.PI * 2);
				ctx.fill();
				ctx.strokeStyle = "#FFFFFF";
				ctx.lineWidth = 1.5;
				ctx.beginPath();
				ctx.arc(agentPt.sx, agentPt.sy, 9, 0, Math.PI * 2);
				ctx.stroke();
				ctx.fillStyle = "rgba(11, 15, 23, 0.78)";
				ctx.strokeStyle = ag.color;
				ctx.lineWidth = 1;
				const bx = agentPt.sx + 12;
				const by = agentPt.sy - 14;
				ctx.fillRect(bx, by, 136, 22);
				ctx.strokeRect(bx, by, 136, 22);
				ctx.fillStyle = "#F8FAFC";
				ctx.font = "600 10px \"JetBrains Mono\", monospace";
				ctx.fillText(`${ag.id}: ${ag.role.slice(0, 14)}`, bx + 5, by + 14);
			}
			ctx.restore();
		}
		// 8. Dynamic Window & Atmospheric Drone Particles
		if (cfg.windowParticlesIntensity > .02) {
			particles.forEach((p) => {
				p.y += dt * p.speed * cfg.windowParticlesIntensity;
				if (p.y > 4.2) p.y = .05;
				const pt = project3D(p.x * .55, p.y, p.z * .55);
				ctx.fillStyle = p.isGold ? "#F59E0B" : pal.primaryHex;
				ctx.globalAlpha = cfg.windowParticlesIntensity * .78;
				ctx.beginPath();
				ctx.arc(pt.sx, pt.sy, p.isGold ? 2.2 : 1.7, 0, Math.PI * 2);
				ctx.fill();
			});
		}
		// 9. Bounded Deep-Parallax Workspace Frame (Passe-partout Margin) & Composition Planning Tools
		const margin = cfg.workspaceMarginPx || 28;
		const fw = w - margin * 2;
		const fh = h - margin * 2;
		const compMode = cfg.compositionGrid || "golden_ratio";
		ctx.save();
		// Outer Passe-Partout Optical Frame Border
		ctx.strokeStyle = "rgba(226, 232, 240, 0.28)";
		ctx.lineWidth = 1.25;
		ctx.strokeRect(margin, margin, fw, fh);
		// Corner Precision Calibration Brackets
		const bLen = 18;
		ctx.strokeStyle = pal.primaryHex;
		ctx.lineWidth = 2;
		[
			[
				margin,
				margin,
				1,
				1
			],
			[
				w - margin,
				margin,
				-1,
				1
			],
			[
				margin,
				h - margin,
				1,
				-1
			],
			[
				w - margin,
				h - margin,
				-1,
				-1
			]
		].forEach(([bx, by, dx, dy]) => {
			ctx.beginPath();
			ctx.moveTo(bx + dx * bLen, by);
			ctx.lineTo(bx, by);
			ctx.lineTo(bx, by + dy * bLen);
			ctx.stroke();
		});
		// Composition & Perspective Planning Guides inside the Bounded Workspace
		if (compMode === "golden_ratio") {
			const phiX1 = margin + fw * .382;
			const phiX2 = margin + fw * .618;
			const phiY1 = margin + fh * .382;
			const phiY2 = margin + fh * .618;
			ctx.strokeStyle = "rgba(245, 158, 11, 0.26)";
			ctx.setLineDash([6, 6]);
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(phiX1, margin);
			ctx.lineTo(phiX1, h - margin);
			ctx.moveTo(phiX2, margin);
			ctx.lineTo(phiX2, h - margin);
			ctx.moveTo(margin, phiY1);
			ctx.lineTo(w - margin, phiY1);
			ctx.moveTo(margin, phiY2);
			ctx.lineTo(w - margin, phiY2);
			ctx.stroke();
			ctx.setLineDash([]);
		} else if (compMode === "perspective_rays") {
			const vpX = cx + px * .35;
			const vpY = h * .44 + horizonShift + py * .25;
			ctx.strokeStyle = "rgba(56, 189, 248, 0.32)";
			ctx.lineWidth = 1;
			// Horizon line
			ctx.beginPath();
			ctx.moveTo(margin, vpY);
			ctx.lineTo(w - margin, vpY);
			ctx.stroke();
			// Vanishing point perspective rays
			ctx.setLineDash([4, 6]);
			for (let r = 0; r < 12; r++) {
				const ang = r / 12 * Math.PI * 2;
				ctx.beginPath();
				ctx.moveTo(vpX, vpY);
				ctx.lineTo(vpX + Math.cos(ang) * w * .7, vpY + Math.sin(ang) * h * .7);
				ctx.stroke();
			}
			ctx.setLineDash([]);
			ctx.fillStyle = "#F59E0B";
			ctx.beginPath();
			ctx.arc(vpX, vpY, 4, 0, Math.PI * 2);
			ctx.fill();
		} else if (compMode === "depth_planes") {
			// 3 Depth Planes (1. Plan / 2. Plan / 3. Plan Głębi)
			[{
				ratio: .14,
				label: "3. PLAN TŁA (KRAJOBRAZ DRONA — GŁĘBOKA PARALAKSA)",
				col: "rgba(148,163,184,0.35)"
			}, {
				ratio: .08,
				label: "2. PLAN ŚRODKOWY (BRYŁA ARCHITEKTONICZNA / WARSZTAT)",
				col: "rgba(56,189,248,0.4)"
			}].forEach((pl) => {
				const ox = margin + fw * pl.ratio;
				const oy = margin + fh * pl.ratio;
				ctx.strokeStyle = pl.col;
				ctx.setLineDash([4, 4]);
				ctx.strokeRect(ox, oy, fw * (1 - pl.ratio * 2), fh * (1 - pl.ratio * 2));
				ctx.setLineDash([]);
				ctx.fillStyle = "#94A3B8";
				ctx.font = "500 9px \"JetBrains Mono\", monospace";
				ctx.fillText(pl.label, ox + 8, oy + 14);
			});
		} else if (compMode === "rule_of_thirds") {
			ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
			ctx.lineWidth = 1;
			for (let i = 1; i <= 2; i++) {
				ctx.beginPath();
				ctx.moveTo(margin + fw * i / 3, margin);
				ctx.lineTo(margin + fw * i / 3, h - margin);
				ctx.moveTo(margin, margin + fh * i / 3);
				ctx.lineTo(w - margin, margin + fh * i / 3);
				ctx.stroke();
			}
		}
		ctx.restore();
		// 10. Translucent Frosted-Glass Spatial Telemetry Panels Inside Workspace
		if (cfg.uiSettings.showFloatingPanels && w > 680) {
			ctx.save();
			const panels = [{
				x: margin + 16 - px * .28,
				y: h * .2 - py * .22,
				title: "PERSPEKTYWA I KOMPOZYCJA 3D",
				line1: `OGNISKOWA: ${fovDeg}° FOV · MARGINES: ${margin}px`,
				line2: `SIATKA: ${compMode.toUpperCase()} · DOF: ${Math.round((cfg.depthOfFieldIntensity || .7) * 100)}%`
			}, {
				x: w - margin - 236 - px * .28,
				y: h * .2 - py * .22,
				title: "LOT DRONEM („SPACE TO LUKSUS”)",
				line1: `KRAJOBRAZ: ${landscape.toUpperCase()}`,
				line2: `PUŁAP: ${cfg.droneAltitudeM || 650}m · KLEJENIE: ${cfg.hobbyAssemblyStep || 12}/12`
			}];
			panels.forEach((fp) => {
				ctx.fillStyle = "rgba(15, 23, 42, 0.58)";
				ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
				ctx.lineWidth = 1;
				ctx.fillRect(fp.x, fp.y, 220, 64);
				ctx.strokeRect(fp.x, fp.y, 220, 64);
				ctx.fillStyle = "#38BDF8";
				ctx.font = "600 10px \"JetBrains Mono\", monospace";
				ctx.fillText(fp.title, fp.x + 10, fp.y + 18);
				ctx.fillStyle = "#F8FAFC";
				ctx.font = "500 10px \"JetBrains Mono\", monospace";
				ctx.fillText(fp.line1, fp.x + 10, fp.y + 36);
				ctx.fillStyle = "#CBD5E1";
				ctx.fillText(fp.line2, fp.x + 10, fp.y + 52);
			});
			ctx.restore();
		}
		ctx.globalAlpha = 1;
		frameId = requestAnimationFrame(renderFrame);
	};
	frameId = requestAnimationFrame(renderFrame);
	return () => {
		isDisposed = true;
		cancelAnimationFrame(frameId);
		if (resizeObserver) resizeObserver.disconnect();
		window.removeEventListener("resize", resize);
	};
}
export const HologramViewport3D = ({ config, onUpdateConfig, onCaptureScreenshot, onExportMessage }) => {
	const canvasMountRef = useRef(null);
	const canvasRef = useRef(null);
	const buildingGroupRef = useRef(null);
	const configRef = useRef(config);
	configRef.current = config;
	const pointerStateRef = useRef({
		isDragging: false,
		lastX: 0,
		lastY: 0,
		parallaxX: 0,
		parallaxY: 0,
		cameraOrbitAngle: .35,
		cameraElevation: 2.35,
		transitionScale: .01
	});
	const [dockCollapsed, setDockCollapsed] = useState(false);
	const [isFullscreenBleed, setIsFullscreenBleed] = useState(false);
	const [showReferenceComparison, setShowReferenceComparison] = useState(false);
	const activeSceneMeta = ARCHITECTURAL_SCENES.find((s) => s.id === config.sceneId) || ARCHITECTURAL_SCENES[0];
	const activePalette = HOLOGRAM_PALETTES[config.uiSettings.palette];
	// Mount High-Precision 3D Hologram & Spatial Agent Engine Once
	useEffect(() => {
		const container = canvasMountRef.current;
		if (!container) return;
		buildingGroupRef.current = buildArchitecturalSceneGroup(configRef.current.sceneId, activePalette.primaryHex, activePalette.secondaryHex, configRef.current.wireframeOverlay, configRef.current.towerHeightMultiplier || 1);
		return startHologram3DEngine(container, configRef, pointerStateRef, buildingGroupRef, canvasRef);
	}, []);
	// Rebuild 3D Mesh Group whenever sceneId, palette, wireframe, or towerHeightMultiplier changes
	useEffect(() => {
		const nextGroup = buildArchitecturalSceneGroup(config.sceneId, activePalette.primaryHex, activePalette.secondaryHex, config.wireframeOverlay, config.towerHeightMultiplier || 1);
		nextGroup.rotation.y = THREE.MathUtils.degToRad(config.modelRotationY);
		pointerStateRef.current.transitionScale = .25;
		buildingGroupRef.current = nextGroup;
	}, [
		config.sceneId,
		config.uiSettings.palette,
		config.wireframeOverlay,
		config.towerHeightMultiplier
	]);
	const handlePointerDown = (e) => {
		pointerStateRef.current.isDragging = true;
		pointerStateRef.current.lastX = e.clientX;
		pointerStateRef.current.lastY = e.clientY;
	};
	const handlePointerMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const normX = ((e.clientX - rect.left) / rect.width - .5) * 2;
		const normY = -((e.clientY - rect.top) / rect.height - .5) * 2;
		pointerStateRef.current.parallaxX = normX;
		pointerStateRef.current.parallaxY = normY;
		if (pointerStateRef.current.isDragging) {
			const dx = e.clientX - pointerStateRef.current.lastX;
			const dy = e.clientY - pointerStateRef.current.lastY;
			pointerStateRef.current.lastX = e.clientX;
			pointerStateRef.current.lastY = e.clientY;
			const nextRot = (config.modelRotationY + dx * .65) % 360;
			onUpdateConfig({
				modelRotationY: Math.round(nextRot),
				autoRotate: false
			});
			pointerStateRef.current.cameraElevation = THREE.MathUtils.clamp(pointerStateRef.current.cameraElevation + dy * .01, .65, 4.2);
		}
	};
	const handlePointerUp = () => {
		pointerStateRef.current.isDragging = false;
	};
	const handleWheel = (e) => {
		const scaleDelta = e.deltaY > 0 ? -.08 : .08;
		const nextScale = THREE.MathUtils.clamp(Number((config.modelScale + scaleDelta).toFixed(2)), .4, 2.2);
		onUpdateConfig({ modelScale: nextScale });
	};
	const handleScreenshotCapture = () => {
		if (!canvasRef.current) return;
		const dataUrl = canvasRef.current.toDataURL("image/png");
		if (!dataUrl) return;
		onCaptureScreenshot(dataUrl, config.customSceneTitle || activeSceneMeta.name);
		const link = document.createElement("a");
		link.href = dataUrl;
		link.download = `HoloArch_AR_${config.sceneId}_${Date.now()}.png`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		onExportMessage("Zrzut ekranu AR zapisany bezpośrednio do galerii urządzenia (.PNG)");
	};
	const handleExportOBJ = () => {
		if (!buildingGroupRef.current) return;
		const stats = exportGroupToOBJ(buildingGroupRef.current, `HoloArch_${config.sceneId}.obj`);
		onExportMessage(`Wyeksportowano model 3D do .OBJ (${stats.vertexCount} wierzchołków, ${stats.faceCount} ścian)`);
	};
	const handleExportSTL = () => {
		if (!buildingGroupRef.current) return;
		const stats = exportGroupToSTL(buildingGroupRef.current, `HoloArch_${config.sceneId}.stl`);
		onExportMessage(`Wyeksportowano bryłę do .STL (${stats.triangleCount} trójkątów gotowych do druku 3D / CAD)`);
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: isFullscreenBleed ? "fixed inset-0 z-50 w-screen h-screen bg-[#070B12] select-none overflow-hidden" : "relative w-full h-[620px] lg:h-[680px] rounded-xl overflow-hidden border border-slate-800 bg-[#070B12] select-none",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				ref: canvasMountRef,
				onPointerDown: handlePointerDown,
				onPointerMove: handlePointerMove,
				onPointerUp: handlePointerUp,
				onPointerLeave: handlePointerUp,
				onWheel: handleWheel,
				className: "w-full h-full cursor-grab active:cursor-grabbing"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1632,
				columnNumber: 7
			}, this),
			showReferenceComparison && /* @__PURE__ */ _jsxDEV("div", {
				className: "absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-black/75 p-6",
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "max-w-3xl w-full bg-[#0B0F17] border border-slate-700 rounded-xl overflow-hidden shadow-2xl pointer-events-auto",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between px-4 py-3 border-b border-slate-800",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h4", {
							className: "text-sm font-semibold text-white",
							children: "Wizualizacja Referencyjna Stołu Holograficznego AR"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1648,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-400",
							children: "Wzorzec oświetlenia środowiskowego, mapy blatu, hologramu wysokościowców i paneli przestrzennych"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1651,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1647,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setShowReferenceComparison(false),
							className: "px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0",
							children: "Zamknij podgląd"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1656,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1646,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("img", {
						src: "/apps/holoarch_studio/assets/aistudio/Dashboard_dex_eeffcbc7.jpg",
						alt: "Referencyjny hologram architektoniczny na stole konferencyjnym",
						referrerPolicy: "no-referrer",
						className: "w-full h-auto max-h-[440px] object-cover"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1663,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1645,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1644,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "absolute top-6 left-6 right-6 z-10 flex flex-wrap items-start justify-between gap-4 pointer-events-none",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "bg-slate-950/55 backdrop-blur-xl border border-white/15 rounded-xl px-4 py-2.5 pointer-events-auto max-w-md shadow-2xl",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 text-xs text-cyan-300 font-mono tabular-nums",
							children: [
								/* @__PURE__ */ _jsxDEV("span", { children: [
									"FOV ",
									config.perspectiveFovDeg || 62,
									"°"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1677,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									"aria-hidden": "true",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1678,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", { children: [
									"Skala ",
									config.modelScale.toFixed(2),
									"x"
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1679,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									"aria-hidden": "true",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1680,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", { children: [Math.round(activeSceneMeta.realWorldHeightM * (config.towerHeightMultiplier || 1)), " m wys."] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1681,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1676,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("h2", {
							className: "text-base font-semibold text-white tracking-tight mt-0.5",
							children: config.customSceneTitle || activeSceneMeta.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1686,
							columnNumber: 11
						}, this),
						config.uiSettings.hudDensity === "detailed" && /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-300 mt-1 line-clamp-1",
							children: activeSceneMeta.subtitle
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1690,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1675,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-2 pointer-events-auto",
					children: [
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => onUpdateConfig({ showSpatialAgents: !config.showSpatialAgents }),
							className: `flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border backdrop-blur-xl transition-colors whitespace-nowrap shrink-0 ${config.showSpatialAgents ? "bg-emerald-500/20 border-emerald-400/70 text-emerald-200" : "bg-slate-950/55 border-white/15 text-slate-200"}`,
							title: "Włącz lub wyłącz autonomicznych agentów AI poruszających się po siatce NavMesh 3D",
							children: [/* @__PURE__ */ _jsxDEV(Bot, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1704,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: ["Agenci 3D: ", config.showSpatialAgents ? "AKTYWNI" : "Wył."] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1705,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1695,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-1 p-1 bg-slate-950/55 backdrop-blur-xl border border-white/15 rounded-lg",
							children: ARCHITECTURAL_SCENES.map((scene, idx) => /* @__PURE__ */ _jsxDEV("button", {
								onClick: () => onUpdateConfig({
									sceneId: scene.id,
									customSceneTitle: undefined
								}),
								className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${config.sceneId === scene.id ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-200 hover:text-white hover:bg-white/10"}`,
								children: ["Scena 0", idx + 1]
							}, scene.id, true, {
								fileName: _jsxFileName,
								lineNumber: 1710,
								columnNumber: 15
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1708,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setShowReferenceComparison((v) => !v),
							className: "flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-950/55 backdrop-blur-xl hover:bg-slate-900/80 text-slate-100 border border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0",
							title: "Porównaj z obrazem referencyjnym stołu AR",
							children: [/* @__PURE__ */ _jsxDEV(Eye, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1729,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wzorzec AR" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1730,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1724,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setIsFullscreenBleed((v) => !v),
							className: "flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-950/55 backdrop-blur-xl hover:bg-slate-900/80 text-slate-100 border border-white/15 rounded-lg transition-colors whitespace-nowrap shrink-0",
							title: "Przełącz pełnoekranowy widok 100vw x 100vh",
							children: isFullscreenBleed ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Minimize2, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1740,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Zamknij 100vh" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1741,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1739,
								columnNumber: 15
							}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Maximize2, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1745,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "100vw × 100vh" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1746,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1744,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1733,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1694,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1674,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "absolute left-1/2 -translate-x-1/2 bottom-6 z-10 w-[92%] max-w-[940px] transition-transform duration-200",
				style: { transform: dockCollapsed ? "translate(-50%, calc(100% - 34px))" : "translate(-50%, 0)" },
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex justify-center mb-1",
					children: /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => setDockCollapsed((c) => !c),
						className: "flex items-center gap-1.5 px-3.5 py-1 text-xs font-medium bg-slate-950/65 backdrop-blur-xl text-slate-200 hover:text-white border border-white/15 rounded-t-lg transition-colors whitespace-nowrap shrink-0",
						children: dockCollapsed ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(ChevronUp, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1769,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pokaż szklany dok parametrów AR" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1770,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1768,
							columnNumber: 15
						}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(ChevronDown, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1774,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Ukryj dok HUD (Czysty Kadr Paralaksy)" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1775,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1773,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1763,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1762,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "bg-slate-950/60 backdrop-blur-xl border border-white/15 rounded-xl p-3.5 shadow-2xl",
					children: /* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-1 md:grid-cols-12 gap-4 items-center",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3",
							children: [
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Maximize2, { className: "w-3 h-3 text-cyan-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1787,
											columnNumber: 21
										}, this), "Skala (Pinch)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1786,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-cyan-400",
										children: [config.modelScale.toFixed(2), "x"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1790,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1785,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: .4,
									max: 2.2,
									step: .05,
									value: config.modelScale,
									onChange: (e) => onUpdateConfig({ modelScale: parseFloat(e.target.value) }),
									className: "w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1794,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1784,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1808,
											columnNumber: 21
										}, this), "Warstwy 3D"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1807,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-amber-400",
										children: [Math.round(config.explodedViewFactor * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1811,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1806,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .05,
									value: config.explodedViewFactor,
									onChange: (e) => onUpdateConfig({ explodedViewFactor: parseFloat(e.target.value) }),
									className: "w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1815,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1805,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Sliders, { className: "w-3 h-3 text-cyan-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1831,
											columnNumber: 21
										}, this), "Paralaksa 6DoF"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1830,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-cyan-400",
										children: [Math.round(config.parallaxIntensity * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1834,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1829,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .05,
									value: config.parallaxIntensity,
									onChange: (e) => onUpdateConfig({ parallaxIntensity: parseFloat(e.target.value) }),
									className: "w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1838,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1828,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex justify-between text-xs text-slate-300 mb-1",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1854,
											columnNumber: 21
										}, this), "Cząsteczki okien"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1853,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono tabular-nums text-amber-400",
										children: [Math.round(config.windowParticlesIntensity * 100), "%"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1857,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1852,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "range",
									min: 0,
									max: 1,
									step: .05,
									value: config.windowParticlesIntensity,
									onChange: (e) => onUpdateConfig({ windowParticlesIntensity: parseFloat(e.target.value) }),
									className: "w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1861,
									columnNumber: 17
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1851,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1783,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "md:col-span-4 flex flex-wrap items-center justify-end gap-2",
							children: [
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: handleScreenshotCapture,
									className: "flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg transition-colors whitespace-nowrap shrink-0",
									title: "Zapisz zrzut ekranu hologramu bezpośrednio do galerii urządzenia",
									children: [/* @__PURE__ */ _jsxDEV(Camera, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1881,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Zrzut do galerii" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1882,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1876,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: handleExportOBJ,
									className: "flex items-center gap-1 px-2.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0",
									title: "Eksportuj siatkę budynku do formatu Wavefront .OBJ",
									children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1890,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: ".OBJ" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1891,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1885,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: handleExportSTL,
									className: "flex items-center gap-1 px-2.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0",
									title: "Eksportuj bryłę architektoniczną do formatu druku 3D .STL",
									children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1899,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: ".STL" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1900,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1894,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => onUpdateConfig({
										modelScale: 1,
										towerHeightMultiplier: 1,
										modelRotationY: 25,
										explodedViewFactor: 0,
										autoRotate: true
									}),
									className: "p-2 text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors shrink-0",
									title: "Resetuj pozycję i skalę modelu",
									children: /* @__PURE__ */ _jsxDEV(RotateCcw, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1916,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1903,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1875,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1782,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1781,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1754,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1624,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUNFLFNBQVM7U0FDVCxXQUFVO1NBQ1YsT0FBTTttQkFIUixDQUtFLHdCQUFDLFVBQUQsRUFBVSxXQUFVLDRCQUE2Qjs7OzttQkFDakQsd0JBQUMsUUFBRCxZQUFNLE9BQVU7Ozs7aUJBQ1Y7Ozs7OztRQUVSLHdCQUFDLFVBQUQ7U0FDRSxTQUFTO1NBQ1QsV0FBVTtTQUNWLE9BQU07bUJBSFIsQ0FLRSx3QkFBQyxVQUFELEVBQVUsV0FBVSw2QkFBOEI7Ozs7bUJBQ2xELHdCQUFDLFFBQUQsWUFBTSxPQUFVOzs7O2lCQUNWOzs7Ozs7UUFFUix3QkFBQyxVQUFEO1NBQ0UsZUFDRSxlQUFlO1VBQ2IsWUFBWTtVQUNaLHVCQUF1QjtVQUN2QixnQkFBZ0I7VUFDaEIsb0JBQW9CO1VBQ3BCLFlBQVk7U0FDZCxDQUFDO1NBRUgsV0FBVTtTQUNWLE9BQU07bUJBRU4sd0JBQUMsV0FBRCxFQUFXLFdBQVUsY0FBZTs7Ozs7UUFDOUI7Ozs7O09BQ0w7Ozs7O2NBQ0Y7Ozs7OztJQUNGOzs7O1lBQ0Y7Ozs7OztFQUNGOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJIb2xvZ3JhbVZpZXdwb3J0M0QudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQge1xuICBCb3QsXG4gIENhbWVyYSxcbiAgQ2hldnJvbkRvd24sXG4gIENoZXZyb25VcCxcbiAgRG93bmxvYWQsXG4gIEV5ZSxcbiAgTGF5ZXJzLFxuICBNYXhpbWl6ZTIsXG4gIE1pbmltaXplMixcbiAgUm90YXRlQ2N3LFxuICBTbGlkZXJzLFxuICBTcGFya2xlcyxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IEFSQ29uZmlnU3RhdGUsIEFyY2hpdGVjdHVyYWxTY2VuZUlkIH0gZnJvbSAnLi4vdHlwZXMvYXJTdHVkaW8nO1xuaW1wb3J0IHsgQVJDSElURUNUVVJBTF9TQ0VORVMsIEhPTE9HUkFNX1BBTEVUVEVTIH0gZnJvbSAnLi4vZGF0YS9hclN0dWRpb0RhdGEnO1xuaW1wb3J0IHsgZXhwb3J0R3JvdXBUb09CSiwgZXhwb3J0R3JvdXBUb1NUTCB9IGZyb20gJy4uL3V0aWxzL2V4cG9ydGVycyc7XG5cbmludGVyZmFjZSBIb2xvZ3JhbVZpZXdwb3J0M0RQcm9wcyB7XG4gIGNvbmZpZzogQVJDb25maWdTdGF0ZTtcbiAgb25VcGRhdGVDb25maWc6IChwYXJ0aWFsOiBQYXJ0aWFsPEFSQ29uZmlnU3RhdGU+KSA9PiB2b2lkO1xuICBvbkNhcHR1cmVTY3JlZW5zaG90OiAoZGF0YVVybDogc3RyaW5nLCBzY2VuZU5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25FeHBvcnRNZXNzYWdlOiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmNvbnN0IF9kdW1teU1hdHJpeCA9IG5ldyBUSFJFRS5NYXRyaXg0KCk7XG5jb25zdCBfZHVtbXlQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX2R1bW15UXVhdCA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCk7XG5jb25zdCBfZHVtbXlTY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfZHVtbXlDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuXG5mdW5jdGlvbiBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeShcbiAgd2lkdGg6IG51bWJlcixcbiAgZGVwdGg6IG51bWJlcixcbiAgaGVpZ2h0OiBudW1iZXIsXG4gIGJldmVsID0gMC4wNFxuKTogVEhSRUUuQnVmZmVyR2VvbWV0cnkge1xuICBjb25zdCBzaGFwZSA9IG5ldyBUSFJFRS5TaGFwZSgpO1xuICBjb25zdCBodyA9IHdpZHRoIC8gMjtcbiAgY29uc3QgaGQgPSBkZXB0aCAvIDI7XG4gIHNoYXBlLm1vdmVUbygtaHcsIC1oZCk7XG4gIHNoYXBlLmxpbmVUbyhodywgLWhkKTtcbiAgc2hhcGUubGluZVRvKGh3LCBoZCk7XG4gIHNoYXBlLmxpbmVUbygtaHcsIGhkKTtcbiAgc2hhcGUuY2xvc2VQYXRoKCk7XG5cbiAgY29uc3QgZ2VvbSA9IG5ldyBUSFJFRS5FeHRydWRlR2VvbWV0cnkoc2hhcGUsIHtcbiAgICBkZXB0aDogaGVpZ2h0LFxuICAgIGJldmVsRW5hYmxlZDogdHJ1ZSxcbiAgICBiZXZlbFNlZ21lbnRzOiAyLFxuICAgIHN0ZXBzOiAxLFxuICAgIGJldmVsU2l6ZTogYmV2ZWwsXG4gICAgYmV2ZWxUaGlja25lc3M6IGJldmVsLFxuICB9KTtcbiAgZ2VvbS5yb3RhdGVYKC1NYXRoLlBJIC8gMik7XG4gIGdlb20uY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcbiAgcmV0dXJuIGdlb207XG59XG5cbi8qKlxuICogQnVpbGRzIGNvbXBvc2l0ZSA4LTEyIHBhcnQgcHJvY2VkdXJhbCBhcmNoaXRlY3R1cmFsIGJ1aWxkaW5nIGdyb3VwcyBmb3IgZWFjaCBzY2VuZVxuICogc28gYm90aCB0aGUgM0Qgdmlld3BvcnQgYW5kIHRoZSAuT0JKIC8gLlNUTCBDQUQgZXhwb3J0ZXJzIGhhdmUgZnVsbCAzRCBtZXNoIGdlb21ldHJ5LlxuICovXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBcmNoaXRlY3R1cmFsU2NlbmVHcm91cChcbiAgc2NlbmVJZDogQXJjaGl0ZWN0dXJhbFNjZW5lSWQsXG4gIHByaW1hcnlIZXg6IHN0cmluZyxcbiAgc2Vjb25kYXJ5SGV4OiBzdHJpbmcsXG4gIHdpcmVmcmFtZUVuYWJsZWQ6IGJvb2xlYW4sXG4gIGhlaWdodE11bHQgPSAxLjBcbik6IFRIUkVFLkdyb3VwIHtcbiAgY29uc3QgZ3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgZ3JvdXAubmFtZSA9IGBIb2xvU2NlbmVfJHtzY2VuZUlkfWA7XG5cbiAgY29uc3QgcHJpbWFyeUNvbG9yID0gbmV3IFRIUkVFLkNvbG9yKHByaW1hcnlIZXgpO1xuICBjb25zdCBzZWNvbmRhcnlDb2xvciA9IG5ldyBUSFJFRS5Db2xvcihzZWNvbmRhcnlIZXgpO1xuXG4gIGNvbnN0IGdsYXNzTWF0ID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHtcbiAgICBjb2xvcjogcHJpbWFyeUNvbG9yLFxuICAgIGVtaXNzaXZlOiBwcmltYXJ5Q29sb3IsXG4gICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuNDUsXG4gICAgcm91Z2huZXNzOiAwLjEyLFxuICAgIG1ldGFsbmVzczogMC4yNSxcbiAgICBjbGVhcmNvYXQ6IDEuMCxcbiAgICBjbGVhcmNvYXRSb3VnaG5lc3M6IDAuMSxcbiAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICBvcGFjaXR5OiAwLjc4LFxuICAgIHdpcmVmcmFtZTogd2lyZWZyYW1lRW5hYmxlZCxcbiAgfSk7XG5cbiAgY29uc3QgY29yZU1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgY29sb3I6IHNlY29uZGFyeUNvbG9yLFxuICAgIGVtaXNzaXZlOiBzZWNvbmRhcnlDb2xvcixcbiAgICBlbWlzc2l2ZUludGVuc2l0eTogMC41NSxcbiAgICByb3VnaG5lc3M6IDAuNDUsXG4gICAgbWV0YWxuZXNzOiAwLjgyLFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIG9wYWNpdHk6IDAuOSxcbiAgfSk7XG5cbiAgY29uc3QgZnJhbWVNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiBwcmltYXJ5Q29sb3IsXG4gICAgZW1pc3NpdmU6IHByaW1hcnlDb2xvcixcbiAgICBlbWlzc2l2ZUludGVuc2l0eTogMC43NSxcbiAgICByb3VnaG5lc3M6IDAuMixcbiAgICBtZXRhbG5lc3M6IDAuOSxcbiAgICB3aXJlZnJhbWU6IHRydWUsXG4gIH0pO1xuXG4gIGNvbnN0IHBvZGl1bU1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgY29sb3I6IG5ldyBUSFJFRS5Db2xvcignIzBGMTcyQScpLFxuICAgIGVtaXNzaXZlOiBwcmltYXJ5Q29sb3IsXG4gICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuMyxcbiAgICByb3VnaG5lc3M6IDAuNjUsXG4gICAgbWV0YWxuZXNzOiAwLjM1LFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIG9wYWNpdHk6IDAuOTIsXG4gIH0pO1xuXG4gIGNvbnN0IGFkZFBhcnQgPSAoXG4gICAgZ2VvbTogVEhSRUUuQnVmZmVyR2VvbWV0cnksXG4gICAgbWF0OiBUSFJFRS5NYXRlcmlhbCxcbiAgICBwb3M6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSxcbiAgICBsYXllckluZGV4OiBudW1iZXIsXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHJvdFkgPSAwLFxuICAgIHNoYXBlVHlwZTogJ3Rvd2VyJyB8ICdjeWxpbmRlcicgfCAnZG9tZScgfCAnYnJpZGdlJyA9ICd0b3dlcidcbiAgKSA9PiB7XG4gICAgZ2VvbS5jb21wdXRlQm91bmRpbmdCb3goKTtcbiAgICBjb25zdCBiYm94ID0gZ2VvbS5ib3VuZGluZ0JveDtcbiAgICBjb25zdCBzaXplID0gbmV3IFRIUkVFLlZlY3RvcjMoMC42LCAxLjIsIDAuNik7XG4gICAgaWYgKGJib3gpIHtcbiAgICAgIGJib3guZ2V0U2l6ZShzaXplKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNoID0gbmV3IFRIUkVFLk1lc2goZ2VvbSwgbWF0KTtcbiAgICBtZXNoLnBvc2l0aW9uLnNldChwb3NbMF0sIHBvc1sxXSwgcG9zWzJdKTtcbiAgICBtZXNoLnJvdGF0aW9uLnkgPSByb3RZO1xuICAgIG1lc2gubmFtZSA9IG5hbWU7XG4gICAgbWVzaC5jYXN0U2hhZG93ID0gdHJ1ZTtcbiAgICBtZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgIG1lc2gudXNlckRhdGEgPSB7XG4gICAgICBiYXNlWTogcG9zWzFdLFxuICAgICAgbGF5ZXJJbmRleCxcbiAgICAgIGJveFNpemU6IFtzaXplLngsIHNpemUueSwgc2l6ZS56XSxcbiAgICAgIHNoYXBlVHlwZSxcbiAgICAgIHBhcnRMYWJlbDogbmFtZS5yZXBsYWNlKC9fL2csICcgJyksXG4gICAgfTtcbiAgICBncm91cC5hZGQobWVzaCk7XG5cbiAgICBpZiAoIXdpcmVmcmFtZUVuYWJsZWQgJiYgbGF5ZXJJbmRleCA+PSAxKSB7XG4gICAgICBjb25zdCBlZGdlcyA9IG5ldyBUSFJFRS5FZGdlc0dlb21ldHJ5KGdlb20pO1xuICAgICAgY29uc3QgbGluZU1hdCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiBsYXllckluZGV4ID09PSAzID8gc2Vjb25kYXJ5Q29sb3IgOiBwcmltYXJ5Q29sb3IsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjg1LFxuICAgICAgfSk7XG4gICAgICBjb25zdCBsaW5lU2VnID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhlZGdlcywgbGluZU1hdCk7XG4gICAgICBtZXNoLmFkZChsaW5lU2VnKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSW5zdGFuY2VkTWVzaCAoPjIwIHJlcGVhdGVkIHN1cnJvdW5kaW5nIHVyYmFuIGNvbnRleHQgYmxvY2tzICYgTGlEQVIgYm91bmRhcnkgbWFya2VycylcbiAgY29uc3QgaW5zdENvdW50ID0gMzY7XG4gIGNvbnN0IGluc3RCbG9ja0dlb20gPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4xOCwgMC4yOCwgMC4xOCk7XG4gIGluc3RCbG9ja0dlb20udHJhbnNsYXRlKDAsIDAuMTQsIDApO1xuICBjb25zdCBpbnN0TWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogJyNmZmZmZmYnLFxuICAgIGVtaXNzaXZlOiBwcmltYXJ5Q29sb3IsXG4gICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuMzUsXG4gICAgcm91Z2huZXNzOiAwLjM1LFxuICAgIG1ldGFsbmVzczogMC42LFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIG9wYWNpdHk6IDAuNzIsXG4gIH0pO1xuICBjb25zdCBjaXR5SW5zdGFuY2VkID0gbmV3IFRIUkVFLkluc3RhbmNlZE1lc2goaW5zdEJsb2NrR2VvbSwgaW5zdE1hdCwgaW5zdENvdW50KTtcbiAgY2l0eUluc3RhbmNlZC5uYW1lID0gJ1VyYmFuX0NvbnRleHRfSW5zdGFuY2VkJztcbiAgY2l0eUluc3RhbmNlZC51c2VyRGF0YSA9IHsgYmFzZVk6IDAsIGxheWVySW5kZXg6IDAgfTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RDb3VudDsgaSsrKSB7XG4gICAgY29uc3QgYW5nbGUgPSAoaSAvIGluc3RDb3VudCkgKiBNYXRoLlBJICogMjtcbiAgICBjb25zdCByYWRpdXMgPSAxLjc1ICsgKGkgJSAzKSAqIDAuMjY7XG4gICAgX2R1bW15UG9zLnNldChNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXMsIDAsIE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cyk7XG4gICAgX2R1bW15UXVhdC5zZXRGcm9tQXhpc0FuZ2xlKG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApLCBhbmdsZSk7XG4gICAgY29uc3Qgc1haID0gMC44NSArIChpICUgNSkgKiAwLjA4O1xuICAgIGNvbnN0IHNZID0gKDAuNTUgKyAoKGkgKiA3KSAlIDExKSAqIDAuMTYpICogaGVpZ2h0TXVsdDtcbiAgICBfZHVtbXlTY2FsZS5zZXQoc1haLCBzWSwgc1haKTtcbiAgICBfZHVtbXlNYXRyaXguY29tcG9zZShfZHVtbXlQb3MsIF9kdW1teVF1YXQsIF9kdW1teVNjYWxlKTtcbiAgICBjaXR5SW5zdGFuY2VkLnNldE1hdHJpeEF0KGksIF9kdW1teU1hdHJpeCk7XG5cbiAgICBfZHVtbXlDb2xvclxuICAgICAgLmNvcHkoaSAlIDQgPT09IDAgPyBzZWNvbmRhcnlDb2xvciA6IHByaW1hcnlDb2xvcilcbiAgICAgIC5tdWx0aXBseVNjYWxhcigwLjggKyAoaSAlIDMpICogMC4xMik7XG4gICAgY2l0eUluc3RhbmNlZC5zZXRDb2xvckF0KGksIF9kdW1teUNvbG9yKTtcbiAgfVxuICBjaXR5SW5zdGFuY2VkLmluc3RhbmNlTWF0cml4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgaWYgKGNpdHlJbnN0YW5jZWQuaW5zdGFuY2VDb2xvcikgY2l0eUluc3RhbmNlZC5pbnN0YW5jZUNvbG9yLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgY2l0eUluc3RhbmNlZC5jb21wdXRlQm91bmRpbmdTcGhlcmUoKTtcbiAgZ3JvdXAuYWRkKGNpdHlJbnN0YW5jZWQpO1xuXG4gIGNvbnN0IGhtID0gaGVpZ2h0TXVsdDtcblxuICBpZiAoc2NlbmVJZCA9PT0gJ3NreWxpbmVfZmluYW5jaWFsJykge1xuICAgIGNvbnN0IHBvZGl1bUN5bCA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDIuMywgMi40OCwgMC4xNCwgMzYpO1xuICAgIHBvZGl1bUN5bC50cmFuc2xhdGUoMCwgMC4wNywgMCk7XG4gICAgYWRkUGFydChwb2RpdW1DeWwsIHBvZGl1bU1hdCwgWzAsIDAsIDBdLCAwLCAnUG9kaXVtX0Jhc2UnLCAwLCAnY3lsaW5kZXInKTtcbiAgICBhZGRQYXJ0KFxuICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMi42LCAxLjgsIDAuMjIsIDAuMDMpLFxuICAgICAgcG9kaXVtTWF0LFxuICAgICAgWzAsIDAuMDgsIDBdLFxuICAgICAgMCxcbiAgICAgICdBdHJpdW1fQ29uY291cnNlJ1xuICAgICk7XG5cbiAgICAvLyBMYXllciAxOiBJbnRlcm5hbCBTdHJ1Y3R1cmFsIENvcmVzXG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDAuNDYsIDAuNDYsIDMuMiAqIGhtLCAwLjAyKSxcbiAgICAgIGNvcmVNYXQsXG4gICAgICBbMCwgMC4xMiwgMF0sXG4gICAgICAxLFxuICAgICAgJ1JkemXFhF9HxYLDs3dueV8zNDJtJ1xuICAgICk7XG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDAuMzQsIDAuMzQsIDIuMTUgKiBobSwgMC4wMiksXG4gICAgICBjb3JlTWF0LFxuICAgICAgWy0xLjA1LCAwLjEyLCAwLjM1XSxcbiAgICAgIDEsXG4gICAgICAnUmR6ZcWEX1phY2hvZG5pJ1xuICAgICk7XG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDAuMzQsIDAuMzQsIDIuNCAqIGhtLCAwLjAyKSxcbiAgICAgIGNvcmVNYXQsXG4gICAgICBbMS4wNSwgMC4xMiwgLTAuMjVdLFxuICAgICAgMSxcbiAgICAgICdSZHplxYRfV3NjaG9kbmknXG4gICAgKTtcblxuICAgIC8vIExheWVyIDI6IEJldmVsZWQgQ3VydGFpbiBXYWxsIEZhY2FkZXMgJiBTZXRiYWNrIFRpZXJzXG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDAuODgsIDAuODgsIDIuNCAqIGhtLCAwLjA1KSxcbiAgICAgIGdsYXNzTWF0LFxuICAgICAgWzAsIDAuMTIsIDBdLFxuICAgICAgMixcbiAgICAgICdXaWXFvGFfQ2VudHJhbG5hX1QxJ1xuICAgICk7XG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDAuNjYsIDAuNjYsIDEuMyAqIGhtLCAwLjA0KSxcbiAgICAgIGdsYXNzTWF0LFxuICAgICAgWzAsIDIuNDIgKiBobSwgMF0sXG4gICAgICAyLFxuICAgICAgJ0fFgm93aWNhX0RpYWdyaWRfVDEnLFxuICAgICAgTWF0aC5QSSAvIDRcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgwLjY2LCAwLjY2LCAyLjA1ICogaG0sIDAuMDQpLFxuICAgICAgZ2xhc3NNYXQsXG4gICAgICBbLTEuMDUsIDAuMTIsIDAuMzVdLFxuICAgICAgMixcbiAgICAgICdXaWXFvGFfRmluYW5zb3dhX1cyJ1xuICAgICk7XG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDAuNjgsIDAuNjgsIDIuMyAqIGhtLCAwLjA0KSxcbiAgICAgIGdsYXNzTWF0LFxuICAgICAgWzEuMDUsIDAuMTIsIC0wLjI1XSxcbiAgICAgIDIsXG4gICAgICAnV2llxbxhX0ZpbmFuc293YV9FMydcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgwLjU0LCAwLjU0LCAxLjQ4ICogaG0sIDAuMDMpLFxuICAgICAgZ2xhc3NNYXQsXG4gICAgICBbMC43OCwgMC4xMiwgMC44Ml0sXG4gICAgICAyLFxuICAgICAgJ1dpZcW8YV9Qb8WCdWRuaW93YV9TNCdcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgwLjUsIDAuNSwgMS4zMiAqIGhtLCAwLjAzKSxcbiAgICAgIGdsYXNzTWF0LFxuICAgICAgWy0wLjgyLCAwLjEyLCAtMC43Ml0sXG4gICAgICAyLFxuICAgICAgJ1dpZcW8YV9Qw7PFgm5vY25hX041J1xuICAgICk7XG5cbiAgICAvLyBMYXllciAzOiBTa3licmlkZ2VzICYgU3BpcmVcbiAgICBhZGRQYXJ0KFxuICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMS4wNSwgMC4yNCwgMC4xNiwgMC4wMiksXG4gICAgICBjb3JlTWF0LFxuICAgICAgWy0wLjUyLCAxLjU1ICogaG0sIDAuMThdLFxuICAgICAgMyxcbiAgICAgICdTa3licmlkZ2VfWmFjaMOzZCcsXG4gICAgICAwLFxuICAgICAgJ2JyaWRnZSdcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgxLjA1LCAwLjI0LCAwLjE2LCAwLjAyKSxcbiAgICAgIGNvcmVNYXQsXG4gICAgICBbMC41MiwgMS43OCAqIGhtLCAtMC4xMl0sXG4gICAgICAzLFxuICAgICAgJ1NreWJyaWRnZV9Xc2Now7NkJyxcbiAgICAgIDAsXG4gICAgICAnYnJpZGdlJ1xuICAgICk7XG5cbiAgICBjb25zdCBsYXRoZVBvaW50cyA9IFtcbiAgICAgIG5ldyBUSFJFRS5WZWN0b3IyKDAuMzYsIDApLFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4yNCwgMC4zICogaG0pLFxuICAgICAgbmV3IFRIUkVFLlZlY3RvcjIoMC4xLCAwLjcgKiBobSksXG4gICAgICBuZXcgVEhSRUUuVmVjdG9yMigwLjAyLCAxLjM1ICogaG0pLFxuICAgIF07XG4gICAgYWRkUGFydChcbiAgICAgIG5ldyBUSFJFRS5MYXRoZUdlb21ldHJ5KGxhdGhlUG9pbnRzLCAxNiksXG4gICAgICBmcmFtZU1hdCxcbiAgICAgIFswLCAzLjY4ICogaG0sIDBdLFxuICAgICAgMyxcbiAgICAgICdJZ2xpY2FfVGVsZWtvbXVuaWthY3lqbmEnLFxuICAgICAgMCxcbiAgICAgICdjeWxpbmRlcidcbiAgICApO1xuICB9IGVsc2UgaWYgKHNjZW5lSWQgPT09ICdlY29fYXRyaXVtJykge1xuICAgIGNvbnN0IGJhc2VDeWwgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgyLjQ1LCAyLjYsIDAuMTYsIDQwKTtcbiAgICBiYXNlQ3lsLnRyYW5zbGF0ZSgwLCAwLjA4LCAwKTtcbiAgICBhZGRQYXJ0KGJhc2VDeWwsIHBvZGl1bU1hdCwgWzAsIDAsIDBdLCAwLCAnQmF6YV9LYW1wdXN1JywgMCwgJ2N5bGluZGVyJyk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgY29uc3QgYW5nbGUgPSAoaSAqIE1hdGguUEkpIC8gMiArIE1hdGguUEkgLyA0O1xuICAgICAgYWRkUGFydChcbiAgICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMC41MiwgMC41MiwgMS45ICogaG0sIDAuMDQpLFxuICAgICAgICBjb3JlTWF0LFxuICAgICAgICBbTWF0aC5jb3MoYW5nbGUpICogMS4xNSwgMC4xMiwgTWF0aC5zaW4oYW5nbGUpICogMS4xNV0sXG4gICAgICAgIDEsXG4gICAgICAgIGBUcnpvbl9CaW9rbGltYXR5Y3pueV8ke2kgKyAxfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDEuODUsIDEuODUsIDAuNTUgKiBobSwgMC4wNiksXG4gICAgICBnbGFzc01hdCxcbiAgICAgIFswLCAwLjQ1ICogaG0sIDBdLFxuICAgICAgMixcbiAgICAgICdUYXJhc19Eb2xueV9BdHJpdW0nXG4gICAgKTtcbiAgICBhZGRQYXJ0KFxuICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMS40NSwgMS40NSwgMC41NSAqIGhtLCAwLjA1KSxcbiAgICAgIGdsYXNzTWF0LFxuICAgICAgWzAsIDEuMTIgKiBobSwgMF0sXG4gICAgICAyLFxuICAgICAgJ1RhcmFzX8Wacm9ka293eV9PZ3JvZHknXG4gICAgKTtcbiAgICBhZGRQYXJ0KFxuICAgICAgbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuOTIsIDI0LCAxNiwgMCwgTWF0aC5QSSAqIDIsIDAsIE1hdGguUEkgLyAyKSxcbiAgICAgIGdsYXNzTWF0LFxuICAgICAgWzAsIDAuMTYsIDBdLFxuICAgICAgMixcbiAgICAgICdLb3B1xYJhX0dlb2RlenlqbmFfQmlvJyxcbiAgICAgIDAsXG4gICAgICAnZG9tZSdcbiAgICApO1xuXG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDEuMSwgMS4xLCAwLjM1ICogaG0sIDAuMDQpLFxuICAgICAgZnJhbWVNYXQsXG4gICAgICBbMCwgMS43NSAqIGhtLCAwXSxcbiAgICAgIDMsXG4gICAgICAnS29yb25hX1NvbGFybmFfUFYnXG4gICAgKTtcbiAgICBhZGRQYXJ0KFxuICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMi4zNSwgMC4yOCwgMC4xNCwgMC4wMiksXG4gICAgICBjb3JlTWF0LFxuICAgICAgWzAsIDEuMjUgKiBobSwgMF0sXG4gICAgICAzLFxuICAgICAgJ1Bhc2HFvF9Qb3dpZXRyem55X05TJyxcbiAgICAgIDAsXG4gICAgICAnYnJpZGdlJ1xuICAgICk7XG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDAuMjgsIDIuMzUsIDAuMTQsIDAuMDIpLFxuICAgICAgY29yZU1hdCxcbiAgICAgIFswLCAxLjI1ICogaG0sIDBdLFxuICAgICAgMyxcbiAgICAgICdQYXNhxbxfUG93aWV0cnpueV9FVycsXG4gICAgICAwLFxuICAgICAgJ2JyaWRnZSdcbiAgICApO1xuICB9IGVsc2UgaWYgKHNjZW5lSWQgPT09ICdjcnlzdGFsX3N0YWNrZWRfcHJpc20nKSB7XG4gICAgLy8gMDQuIE1ha2lldGEgV2Fyc3R3b3dhIFwiQ3J5c3RhbCBQcmlzbSBMRURcIiAoaW5zcGlyZWQgYnkgZ2xhc3MxLnBuZywgZ2xhc3MyLnBuZywgNTAgUmlzZSBUb3dlcilcbiAgICBhZGRQYXJ0KFxuICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMi42LCAxLjksIDAuMTQsIDAuMDMpLFxuICAgICAgcG9kaXVtTWF0LFxuICAgICAgWzAsIDAsIDBdLFxuICAgICAgMCxcbiAgICAgICdDemFybnlfUG9zdHVtZW50X0dhYmxvdHknXG4gICAgKTtcbiAgICAvLyBXYXJtIExFRCBpbGx1bWluYXRlZCB2ZXJ0aWNhbCBjb3Jlc1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgwLjMyLCAwLjMyLCAyLjU1ICogaG0sIDAuMDIpLFxuICAgICAgY29yZU1hdCxcbiAgICAgIFstMC4zOCwgMC4xMiwgLTAuMTVdLFxuICAgICAgMSxcbiAgICAgICdLb2x1bW5hX0xFRF9CdXJzenR5bl9XMSdcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgwLjMyLCAwLjMyLCAyLjg1ICogaG0sIDAuMDIpLFxuICAgICAgY29yZU1hdCxcbiAgICAgIFswLjM4LCAwLjEyLCAwLjE1XSxcbiAgICAgIDEsXG4gICAgICAnS29sdW1uYV9MRURfQnVyc3p0eW5fRTInXG4gICAgKTtcbiAgICAvLyBDYW50aWxldmVyZWQgaG9yaXpvbnRhbCBvcHRpY2FsIGdsYXNzIHNsYWJzICg4IHN0YWNrZWQgdGllcnMgd2l0aCBzaGlmdHMpXG4gICAgZm9yIChsZXQgcyA9IDA7IHMgPCA4OyBzKyspIHtcbiAgICAgIGNvbnN0IHNsYWJZID0gKDAuMjQgKyBzICogMC4zMikgKiBobTtcbiAgICAgIGNvbnN0IG9mZnNldFggPSAoKHMgJSAzKSAtIDEpICogMC4xNjtcbiAgICAgIGNvbnN0IG9mZnNldFogPSAoKChzICsgMSkgJSAzKSAtIDEpICogMC4xMjtcbiAgICAgIGNvbnN0IHdTbGFiID0gMS42NSAtIHMgKiAwLjA2O1xuICAgICAgY29uc3QgZFNsYWIgPSAxLjI1IC0gcyAqIDAuMDQ7XG4gICAgICBhZGRQYXJ0KFxuICAgICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSh3U2xhYiwgZFNsYWIsIDAuMTUgKiBobSwgMC4wMjUpLFxuICAgICAgICBnbGFzc01hdCxcbiAgICAgICAgW29mZnNldFgsIHNsYWJZLCBvZmZzZXRaXSxcbiAgICAgICAgcyA8IDUgPyAyIDogMyxcbiAgICAgICAgYFRhZmxhX1N6a8WCYV9PcHR5Y3puZWdvX1AwJHtzICsgMX1gXG4gICAgICApO1xuICAgIH1cbiAgICBhZGRQYXJ0KFxuICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMC45NSwgMC43NSwgMC4yNCAqIGhtLCAwLjAzKSxcbiAgICAgIGZyYW1lTWF0LFxuICAgICAgWzAuMTIsIDIuODQgKiBobSwgMF0sXG4gICAgICAzLFxuICAgICAgJ8Wad2lldGxpa19Qcnl6bWF0eWN6bnlfS29yb255J1xuICAgICk7XG4gIH0gZWxzZSBpZiAoc2NlbmVJZCA9PT0gJ3Zvcm9ub2lfYmlvbmljX3NwaXJlJykge1xuICAgIC8vIDA1LiBXaWXFvGEgQmlvbmljem5hIFwiVm9yb25vaSBIZWxpeCBTcGlyZVwiIChpbnNwaXJlZCBieSBUaGUgVG9yY2ggMzI1bSwgVm9yb25vaSBjZWxsdWxhciB0b3dlcnMpXG4gICAgY29uc3Qgdm9yb25vaUJhc2UgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgyLjEsIDIuMzUsIDAuMTYsIDMyKTtcbiAgICB2b3Jvbm9pQmFzZS50cmFuc2xhdGUoMCwgMC4wOCwgMCk7XG4gICAgYWRkUGFydCh2b3Jvbm9pQmFzZSwgcG9kaXVtTWF0LCBbMCwgMCwgMF0sIDAsICdCYXphX0tvcnplbmlvd2FfVm9yb25vaScsIDAsICdjeWxpbmRlcicpO1xuXG4gICAgLy8gVHdpc3RlZCBIZWxpY2FsIENvcmUgJiA3IFJvdGF0aW5nIEJpb25pYyBUaWVyc1xuICAgIGFkZFBhcnQoXG4gICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjM0LCAwLjQ4LCAzLjMgKiBobSwgMjApLFxuICAgICAgY29yZU1hdCxcbiAgICAgIFswLCAwLjE0LCAwXSxcbiAgICAgIDEsXG4gICAgICAnUmR6ZcWEX0hlbGlrYWxueV9Ub3JjaF8zMjVtJyxcbiAgICAgIDAsXG4gICAgICAnY3lsaW5kZXInXG4gICAgKTtcbiAgICBmb3IgKGxldCB0ID0gMDsgdCA8IDc7IHQrKykge1xuICAgICAgY29uc3QgdGllclkgPSAoMC4xOCArIHQgKiAwLjQ0KSAqIGhtO1xuICAgICAgY29uc3Qgc2NhbGVSID0gMS4xOCAtIHQgKiAwLjA4O1xuICAgICAgY29uc3QgdHdpc3RSb3QgPSAodCAqIE1hdGguUEkpIC8gOTtcbiAgICAgIGFkZFBhcnQoXG4gICAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KHNjYWxlUiwgc2NhbGVSICogMC44NiwgMC4zOCAqIGhtLCAwLjA0KSxcbiAgICAgICAgdCAlIDIgPT09IDAgPyBnbGFzc01hdCA6IGZyYW1lTWF0LFxuICAgICAgICBbTWF0aC5zaW4odHdpc3RSb3QpICogMC4wOCwgdGllclksIE1hdGguY29zKHR3aXN0Um90KSAqIDAuMDhdLFxuICAgICAgICB0IDwgNSA/IDIgOiAzLFxuICAgICAgICBgU2VnbWVudF9Wb3Jvbm9pX0hlbGl4XzAke3QgKyAxfWAsXG4gICAgICAgIHR3aXN0Um90XG4gICAgICApO1xuICAgIH1cbiAgICAvLyBDcm93biBvYnNlcnZhdGlvbiBzcGlyYWwgcmluZ1xuICAgIGFkZFBhcnQoXG4gICAgICBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC41NiwgMjAsIDE2KSxcbiAgICAgIGdsYXNzTWF0LFxuICAgICAgWzAsIDMuMzUgKiBobSwgMF0sXG4gICAgICAzLFxuICAgICAgJ0tvcHXFgmFfT2JzZXJ3YWN5am5hX1RvcmNoJyxcbiAgICAgIDAsXG4gICAgICAnZG9tZSdcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgwLjE0LCAwLjE0LCAwLjk1ICogaG0sIDAuMDEpLFxuICAgICAgZnJhbWVNYXQsXG4gICAgICBbMCwgMy42NSAqIGhtLCAwXSxcbiAgICAgIDMsXG4gICAgICAnSWdsaWNhX0Jpb25pY3puYV8zMjVtJ1xuICAgICk7XG4gIH0gZWxzZSBpZiAoc2NlbmVJZCA9PT0gJ2tpbmV0aWNfY2FsYXRyYXZhX3dpbmcnKSB7XG4gICAgLy8gMDYuIFJ6ZcW6YmEgS2luZXR5Y3puYSBcIkFlcm9keW5hbWljIFdpbmdcIiAoaW5zcGlyZWQgYnkgLTAucG5nLCA2NzI0M2EzMzRlZjY1OGRhNmRkYTliN2FkZWFiZDhlMC5qcGcpXG4gICAgY29uc3QgcGVkZXN0YWwgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgxLjM1LCAxLjUsIDAuMTIsIDM2KTtcbiAgICBwZWRlc3RhbC50cmFuc2xhdGUoMCwgMC4wNiwgMCk7XG4gICAgYWRkUGFydChwZWRlc3RhbCwgcG9kaXVtTWF0LCBbMCwgMCwgMF0sIDAsICdEeXNrX0Jhem93eV9UeXRhbicsIDAsICdjeWxpbmRlcicpO1xuXG4gICAgLy8gU3dlZXBpbmcgY3VydmVkIHNwaW5lIGJhc2VcbiAgICBhZGRQYXJ0KFxuICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMC41NSwgMC4zNiwgMC45NSAqIGhtLCAwLjA0KSxcbiAgICAgIGNvcmVNYXQsXG4gICAgICBbMC40NSwgMC4xMiwgMF0sXG4gICAgICAxLFxuICAgICAgJ0tyxJlnb3PFgnVwX05vxZtueV9Ta3J6eWTFgmEnLFxuICAgICAgLTAuMjVcbiAgICApO1xuXG4gICAgLy8gMTAgRmFubmluZyBBZXJvZHluYW1pYyBUaXRhbml1bSBSaWJzIGZvbGxvd2luZyBhIGxvZ2FyaXRobWljIHNwaXJhbCBjdXJ2ZVxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgMTA7IHIrKykge1xuICAgICAgY29uc3QgcHJvZ3Jlc3MgPSByIC8gOTtcbiAgICAgIGNvbnN0IHJpYlkgPSAoMC4zNSArIHByb2dyZXNzICogMi43NSkgKiBobTtcbiAgICAgIGNvbnN0IHJpYlggPSAwLjM1IC0gTWF0aC5zaW4ocHJvZ3Jlc3MgKiBNYXRoLlBJICogMC44NSkgKiAwLjY1O1xuICAgICAgY29uc3QgcmliWiA9IChwcm9ncmVzcyAtIDAuNSkgKiAwLjQyO1xuICAgICAgY29uc3QgcmliTGVuZ3RoID0gKDEuMzUgKyBNYXRoLnNpbihwcm9ncmVzcyAqIE1hdGguUEkpICogMC45NSkgKiBobTtcbiAgICAgIGFkZFBhcnQoXG4gICAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KHJpYkxlbmd0aCwgMC4xMiwgMC4xOCAqIGhtLCAwLjAyKSxcbiAgICAgICAgciAlIDMgPT09IDAgPyBjb3JlTWF0IDogZ2xhc3NNYXQsXG4gICAgICAgIFtyaWJYLCByaWJZLCByaWJaXSxcbiAgICAgICAgciA8IDcgPyAyIDogMyxcbiAgICAgICAgYFBpw7Nyb19LaW5ldHljem5lX1R5dGFuXzAke3IgKyAxfWAsXG4gICAgICAgIHByb2dyZXNzICogMC42NSAtIDAuMyxcbiAgICAgICAgJ2JyaWRnZSdcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNjZW5lSWQgPT09ICdoeWRyb19hcXVhX3NjdWxwdHVyZScpIHtcbiAgICAvLyAwNy4gSHlkcm8tUnplxbpiYSBcIkxpcXVpZCBDcnlzdGFsIFNwbGFzaFwiIChpbnNwaXJlZCBieSAwLmpwZywgOTdhNmQ5NWIsIDkyM2Y0ZmQ1KVxuICAgIGNvbnN0IGdsYXNzVmVzc2VsID0gbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMS40NSwgMS4zMiwgMC44NSAqIGhtLCAzNik7XG4gICAgZ2xhc3NWZXNzZWwudHJhbnNsYXRlKDAsIDAuNDIgKiBobSwgMCk7XG4gICAgYWRkUGFydChcbiAgICAgIGdsYXNzVmVzc2VsLFxuICAgICAgZ2xhc3NNYXQsXG4gICAgICBbMCwgMCwgMF0sXG4gICAgICAwLFxuICAgICAgJ1N6a2xhbmVfTmFjenluaWVfS3J5c3RhbGljem5lJyxcbiAgICAgIDAsXG4gICAgICAnY3lsaW5kZXInXG4gICAgKTtcblxuICAgIC8vIFJpc2luZyBGbHVpZCBWb3J0ZXggVG9yc28gJiBDcmVzdCBXYXZlc1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgwLjY4LCAwLjU4LCAxLjY1ICogaG0sIDAuMDYpLFxuICAgICAgZ2xhc3NNYXQsXG4gICAgICBbMCwgMC43MiAqIGhtLCAwXSxcbiAgICAgIDEsXG4gICAgICAnV2lyX1dvZG55X1JkemXFhF9IeWRybydcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgxLjU1LCAwLjMyLCAwLjM4ICogaG0sIDAuMDQpLFxuICAgICAgY29yZU1hdCxcbiAgICAgIFstMC40NSwgMS45NSAqIGhtLCAwLjE1XSxcbiAgICAgIDIsXG4gICAgICAnTGV3ZV9SYW1pxJlfUm96YnJ5emd1JyxcbiAgICAgIDAuMzUsXG4gICAgICAnYnJpZGdlJ1xuICAgICk7XG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDEuNDUsIDAuMzIsIDAuMzYgKiBobSwgMC4wNCksXG4gICAgICBjb3JlTWF0LFxuICAgICAgWzAuNDgsIDEuNzUgKiBobSwgLTAuMTVdLFxuICAgICAgMixcbiAgICAgICdQcmF3ZV9SYW1pxJlfRmFsaScsXG4gICAgICAtMC4zNSxcbiAgICAgICdicmlkZ2UnXG4gICAgKTtcbiAgICBhZGRQYXJ0KFxuICAgICAgbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KDAuNDIsIDI0LCAxOCksXG4gICAgICBnbGFzc01hdCxcbiAgICAgIFswLjA1LCAyLjQ4ICogaG0sIDBdLFxuICAgICAgMixcbiAgICAgICdHxYJvd2ljYV9Xb2RuYV9SZWZyYWtjamEnLFxuICAgICAgMCxcbiAgICAgICdkb21lJ1xuICAgICk7XG4gICAgLy8gU3VzcGVuZGVkIDNEIFdhdGVyIERyb3BsZXRzIGluIG1pZC1haXJcbiAgICBjb25zdCBkcm9wbGV0czogQXJyYXk8W251bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgc3RyaW5nXT4gPSBbXG4gICAgICBbMS4wNSwgMi42NSAqIGhtLCAwLjI1LCAwLjM0LCAnS3JvcGxhX1NmZXJ5Y3puYV9HxYLDs3duYSddLFxuICAgICAgWy0wLjk1LCAyLjQ1ICogaG0sIC0wLjIsIDAuMjIsICdLcm9wbGFfWmF3aWVzem9uYV9XMSddLFxuICAgICAgWzAuNzIsIDEuMzUgKiBobSwgMC41NSwgMC4xOCwgJ0tyb3BsYV9LcnlzdGFsaWN6bmFfRTInXSxcbiAgICAgIFstMC42OCwgMS40NSAqIGhtLCAtMC40OCwgMC4xOSwgJ0tyb3BsYV9LcnlzdGFsaWN6bmFfTjMnXSxcbiAgICAgIFswLjE1LCAzLjEyICogaG0sIDAuMSwgMC4yNCwgJ0tvcm9uYV9Lcm9wbGlfWmVuaXRoJ10sXG4gICAgXTtcbiAgICBkcm9wbGV0cy5mb3JFYWNoKChbZHgsIGR5LCBkeiwgckRyb3AsIGROYW1lXSkgPT4ge1xuICAgICAgYWRkUGFydChcbiAgICAgICAgbmV3IFRIUkVFLlNwaGVyZUdlb21ldHJ5KHJEcm9wLCAxOCwgMTQpLFxuICAgICAgICBnbGFzc01hdCxcbiAgICAgICAgW2R4LCBkeSwgZHpdLFxuICAgICAgICAzLFxuICAgICAgICBkTmFtZSxcbiAgICAgICAgMCxcbiAgICAgICAgJ2RvbWUnXG4gICAgICApO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIGFlcm9faHViXG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDMuNCwgMi4xLCAwLjE4LCAwLjAzKSxcbiAgICAgIHBvZGl1bU1hdCxcbiAgICAgIFswLCAwLCAwXSxcbiAgICAgIDAsXG4gICAgICAnUMWCeXRhX1Blcm9ub3dhX0tEUCdcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgyLjksIDAuMzgsIDAuNjUgKiBobSwgMC4wMyksXG4gICAgICBjb3JlTWF0LFxuICAgICAgWzAsIDAuMTYsIC0wLjY1XSxcbiAgICAgIDEsXG4gICAgICAnTmF3YV9Qw7PFgm5vY25hX1Rlcm1pbmFsdSdcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgyLjksIDAuMzgsIDAuNjUgKiBobSwgMC4wMyksXG4gICAgICBjb3JlTWF0LFxuICAgICAgWzAsIDAuMTYsIDAuNjVdLFxuICAgICAgMSxcbiAgICAgICdOYXdhX1BvxYJ1ZG5pb3dhX1Rlcm1pbmFsdSdcbiAgICApO1xuICAgIGFkZFBhcnQoXG4gICAgICBjcmVhdGVCZXZlbGVkVG93ZXJHZW9tZXRyeSgwLjQ2LCAwLjQ2LCAyLjg1ICogaG0sIDAuMDQpLFxuICAgICAgY29yZU1hdCxcbiAgICAgIFsxLjM1LCAwLjE0LCAwXSxcbiAgICAgIDEsXG4gICAgICAnV2llxbxhX0tvbnRyb2xpX0xvdMOzd19BVEMnXG4gICAgKTtcbiAgICBhZGRQYXJ0KFxuICAgICAgY3JlYXRlQmV2ZWxlZFRvd2VyR2VvbWV0cnkoMi42LCAxLjM1LCAxLjE1ICogaG0sIDAuMDYpLFxuICAgICAgZ2xhc3NNYXQsXG4gICAgICBbMCwgMC4yMiwgMF0sXG4gICAgICAyLFxuICAgICAgJ0hhbGFfR8WCw7N3bmFfT2RwcmF3J1xuICAgICk7XG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDMuMTUsIDEuNzUsIDAuMjIgKiBobSwgMC4wNCksXG4gICAgICBmcmFtZU1hdCxcbiAgICAgIFswLCAxLjQ1ICogaG0sIDBdLFxuICAgICAgMyxcbiAgICAgICdEYWNoX0tyYXRvd25pY293eV9XYXZlJ1xuICAgICk7XG4gICAgYWRkUGFydChcbiAgICAgIGNyZWF0ZUJldmVsZWRUb3dlckdlb21ldHJ5KDAuNzYsIDAuNzYsIDAuNDIgKiBobSwgMC4wNCksXG4gICAgICBnbGFzc01hdCxcbiAgICAgIFsxLjM1LCAyLjk1ICogaG0sIDBdLFxuICAgICAgMyxcbiAgICAgICdLb3B1xYJhX1JhZGFyb3dhX0FUQydcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGdyb3VwO1xufVxuXG4vKipcbiAqIEhpZ2gtUHJlY2lzaW9uLCBaZXJvLUZhaWwgM0QgSG9sb2dyYXBoaWMgQXJjaGl0ZWN0dXJhbCAmIFNwYXRpYWwgQWdlbnQgUmVuZGVyZXIuXG4gKiBSZW5kZXJzIGNyeXN0YWwtY2xlYXIgM0QgYnVpbGRpbmdzIHdpdGggZmxvb3Igc2xhYnMsIGRpYWdyaWRzLCBnbG93aW5nIGNvcmVzLCB0YWJsZXRvcCB3b3JsZCBtYXAsXG4gKiBMaURBUiBzdXJmYWNlIGdyaWQsIHdpbmRvdyBwYXJ0aWNsZXMsIGFuZCBsaXZlIDNEIEF1dG9ub21vdXMgQUkgQWdlbnRzIG1vdmluZyBvbiBhIDNEIE5hdk1lc2ghXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0SG9sb2dyYW0zREVuZ2luZShcbiAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCxcbiAgY29uZmlnUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PEFSQ29uZmlnU3RhdGU+LFxuICBwb2ludGVyU3RhdGVSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8e1xuICAgIGlzRHJhZ2dpbmc6IGJvb2xlYW47XG4gICAgbGFzdFg6IG51bWJlcjtcbiAgICBsYXN0WTogbnVtYmVyO1xuICAgIHBhcmFsbGF4WDogbnVtYmVyO1xuICAgIHBhcmFsbGF4WTogbnVtYmVyO1xuICAgIGNhbWVyYU9yYml0QW5nbGU6IG51bWJlcjtcbiAgICBjYW1lcmFFbGV2YXRpb246IG51bWJlcjtcbiAgICB0cmFuc2l0aW9uU2NhbGU6IG51bWJlcjtcbiAgfT4sXG4gIGJ1aWxkaW5nR3JvdXBSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8VEhSRUUuR3JvdXAgfCBudWxsPixcbiAgY2FudmFzUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD5cbik6ICgpID0+IHZvaWQge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY2FudmFzLmNsYXNzTmFtZSA9ICd3LWZ1bGwgaC1mdWxsIGJsb2NrJztcbiAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgY2FudmFzUmVmLmN1cnJlbnQgPSBjYW52YXM7XG5cbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xuICBsZXQgZnJhbWVJZCA9IDA7XG4gIGxldCBpc0Rpc3Bvc2VkID0gZmFsc2U7XG5cbiAgLy8gQXRtb3NwaGVyaWMgJiBXaW5kb3cgUGFydGljbGVzXG4gIGNvbnN0IHBhcnRpY2xlcyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDE2MCB9LCAoXywgaSkgPT4gKHtcbiAgICB4OiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA5LFxuICAgIHk6IE1hdGgucmFuZG9tKCkgKiA0LjIsXG4gICAgejogaSA8IDEwMCA/IC0yLjQgLSBNYXRoLnJhbmRvbSgpICogMS42IDogKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMy4yLFxuICAgIHNwZWVkOiAwLjI1ICsgKGkgJSA1KSAqIDAuMDksXG4gICAgaXNHb2xkOiBpIDwgMTAwLFxuICB9KSk7XG5cbiAgLy8gMzYgVXJiYW4gQ29udGV4dCBCbG9ja3MgYXJvdW5kIHRoZSBtYWluIGNvbXBsZXggKG1hdGNoZXMgSW5zdGFuY2VkTWVzaClcbiAgY29uc3QgdXJiYW5Db250ZXh0QmxvY2tzID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMzIgfSwgKF8sIGkpID0+IHtcbiAgICBjb25zdCBhbmdsZSA9IChpIC8gMzIpICogTWF0aC5QSSAqIDI7XG4gICAgY29uc3QgcmFkaXVzID0gMS44MiArIChpICUgMykgKiAwLjI4O1xuICAgIHJldHVybiB7XG4gICAgICB4OiBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXMsXG4gICAgICB6OiBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXMsXG4gICAgICB3OiAwLjExICsgKGkgJSAzKSAqIDAuMDMsXG4gICAgICBoOiAwLjIyICsgKChpICogNykgJSA5KSAqIDAuMDgsXG4gICAgICBpc1NlY29uZGFyeTogaSAlIDQgPT09IDAsXG4gICAgfTtcbiAgfSk7XG5cbiAgLy8gQXV0b25vbW91cyBTcGF0aWFsIEFJIEFnZW50cyBEZWZpbml0aW9uc1xuICBjb25zdCBhZ2VudENhdGFsb2cgPSBbXG4gICAgeyBpZDogJ0FHLTAxJywgcm9sZTogJ0xpREFSIERlcHRoIFNjYW5uZXInLCBjb2xvcjogJyMzOEJERjgnLCBwaGFzZU9mZnNldDogMCB9LFxuICAgIHsgaWQ6ICdBRy0wMicsIHJvbGU6ICdCSU0gU3RydWN0dXJlIEluc3BlY3RvcicsIGNvbG9yOiAnI0Y1OUUwQicsIHBoYXNlT2Zmc2V0OiAxLjU3IH0sXG4gICAgeyBpZDogJ0FHLTAzJywgcm9sZTogJ05hdk1lc2ggUGF0aCBQbGFubmVyJywgY29sb3I6ICcjMTBCOTgxJywgcGhhc2VPZmZzZXQ6IDMuMTQgfSxcbiAgICB7IGlkOiAnQUctMDQnLCByb2xlOiAnSERSIExpZ2h0IFByb2JlJywgY29sb3I6ICcjQTg1NUY3JywgcGhhc2VPZmZzZXQ6IDQuNzEgfSxcbiAgICB7IGlkOiAnQUctMDUnLCByb2xlOiAnT2NjbHVzaW9uIFJheWNhc3RlcicsIGNvbG9yOiAnI0VDNDg5OScsIHBoYXNlT2Zmc2V0OiAwLjg1IH0sXG4gICAgeyBpZDogJ0FHLTA2Jywgcm9sZTogJ0NBRCBNZXNoIFNlcmlhbGl6ZXInLCBjb2xvcjogJyNFMkU4RjAnLCBwaGFzZU9mZnNldDogMi4zNSB9LFxuICBdO1xuXG4gIGNvbnN0IHJlc2l6ZSA9ICgpID0+IHtcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGRwciA9IE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsIDIpO1xuICAgIGNvbnN0IHcgPSBNYXRoLm1heChyZWN0LndpZHRoIHx8IGNvbnRhaW5lci5jbGllbnRXaWR0aCB8fCA5NjAsIDMyMCk7XG4gICAgY29uc3QgaCA9IE1hdGgubWF4KHJlY3QuaGVpZ2h0IHx8IGNvbnRhaW5lci5jbGllbnRIZWlnaHQgfHwgNjIwLCAzMjApO1xuICAgIGNhbnZhcy53aWR0aCA9IE1hdGgucm91bmQodyAqIGRwcik7XG4gICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoaCAqIGRwcik7XG4gICAgY3R4LnNldFRyYW5zZm9ybShkcHIsIDAsIDAsIGRwciwgMCwgMCk7XG4gIH07XG5cbiAgcmVzaXplKCk7XG4gIGNvbnN0IHJlc2l6ZU9ic2VydmVyID1cbiAgICB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnID8gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHJlc2l6ZSgpKSA6IG51bGw7XG4gIGlmIChyZXNpemVPYnNlcnZlcikgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShjb250YWluZXIpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcblxuICBsZXQgbGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgbGV0IGFjY3VtVGltZSA9IDA7XG5cbiAgY29uc3QgcmVuZGVyRnJhbWUgPSAobm93OiBudW1iZXIpID0+IHtcbiAgICBpZiAoaXNEaXNwb3NlZCkgcmV0dXJuO1xuICAgIGNvbnN0IGR0ID0gTWF0aC5taW4oKG5vdyAtIGxhc3RUaW1lKSAvIDEwMDAsIDAuMSk7XG4gICAgbGFzdFRpbWUgPSBub3c7XG4gICAgYWNjdW1UaW1lICs9IGR0O1xuXG4gICAgY29uc3QgY2ZnID0gY29uZmlnUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgcFN0YXRlID0gcG9pbnRlclN0YXRlUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgcGFsID0gSE9MT0dSQU1fUEFMRVRURVNbY2ZnLnVpU2V0dGluZ3MucGFsZXR0ZV07XG5cbiAgICBwU3RhdGUudHJhbnNpdGlvblNjYWxlID0gVEhSRUUuTWF0aFV0aWxzLmRhbXAoXG4gICAgICBwU3RhdGUudHJhbnNpdGlvblNjYWxlLFxuICAgICAgY2ZnLm1vZGVsU2NhbGUsXG4gICAgICA2LjUsXG4gICAgICBkdFxuICAgICk7XG5cbiAgICBpZiAoY2ZnLmF1dG9Sb3RhdGUgJiYgIXBTdGF0ZS5pc0RyYWdnaW5nICYmIGJ1aWxkaW5nR3JvdXBSZWYuY3VycmVudCkge1xuICAgICAgYnVpbGRpbmdHcm91cFJlZi5jdXJyZW50LnJvdGF0aW9uLnkgKz0gZHQgKiAwLjI1O1xuICAgIH0gZWxzZSBpZiAoYnVpbGRpbmdHcm91cFJlZi5jdXJyZW50KSB7XG4gICAgICBidWlsZGluZ0dyb3VwUmVmLmN1cnJlbnQucm90YXRpb24ueSA9IFRIUkVFLk1hdGhVdGlscy5kYW1wKFxuICAgICAgICBidWlsZGluZ0dyb3VwUmVmLmN1cnJlbnQucm90YXRpb24ueSxcbiAgICAgICAgVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKGNmZy5tb2RlbFJvdGF0aW9uWSksXG4gICAgICAgIDgsXG4gICAgICAgIGR0XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRwciA9IE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEsIDIpO1xuICAgIGNvbnN0IHcgPSBjYW52YXMud2lkdGggLyBkcHI7XG4gICAgY29uc3QgaCA9IGNhbnZhcy5oZWlnaHQgLyBkcHI7XG4gICAgY29uc3QgY3ggPSB3IC8gMjtcbiAgICBjb25zdCBob3Jpem9uU2hpZnQgPSAoY2ZnLmhvcml6b25PZmZzZXRZIHx8IDApICogaDtcbiAgICBjb25zdCBjeSA9IGggKiAwLjY1ICsgaG9yaXpvblNoaWZ0O1xuXG4gICAgLy8gRGVlcCBQYXJhbGxheCBNdWx0aS1MYXllciBPZmZzZXRzIChGb3JlZ3JvdW5kLCBNaWRncm91bmQsIERpc3RhbnQgTGFuZHNjYXBlKVxuICAgIGNvbnN0IGRyb25lRHJpZnRYID0gY2ZnLmRyb25lRmxpZ2h0QWN0aXZlID8gTWF0aC5zaW4oYWNjdW1UaW1lICogMC4zOCkgKiAyNiA6IDA7XG4gICAgY29uc3QgZHJvbmVEcmlmdFkgPSBjZmcuZHJvbmVGbGlnaHRBY3RpdmUgPyBNYXRoLmNvcyhhY2N1bVRpbWUgKiAwLjI5KSAqIDExIDogMDtcbiAgICBjb25zdCBweCA9IHBTdGF0ZS5wYXJhbGxheFggKiBjZmcucGFyYWxsYXhJbnRlbnNpdHkgKiA0NCArIGRyb25lRHJpZnRYO1xuICAgIGNvbnN0IHB5ID0gcFN0YXRlLnBhcmFsbGF4WSAqIGNmZy5wYXJhbGxheEludGVuc2l0eSAqIDI0ICsgZHJvbmVEcmlmdFk7XG5cbiAgICBjb25zdCBsYW5kc2NhcGUgPSBjZmcuZHJvbmVMYW5kc2NhcGUgfHwgJ2FscGluZV9wZWFrcyc7XG5cbiAgICAvLyAxLiBWaXJ0dWFsIERyb25lIEZsaWdodCBMYW5kc2NhcGUgQmFja2Ryb3AgKFwiU3BhY2UgdG8gTHVrc3VzXCIpXG4gICAgY29uc3QgYmdHcmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIGgpO1xuICAgIGlmIChsYW5kc2NhcGUgPT09ICdjb3NtaWNfb3JiaXRhbCcpIHtcbiAgICAgIGJnR3JhZC5hZGRDb2xvclN0b3AoMCwgJyMwMjA0MEEnKTtcbiAgICAgIGJnR3JhZC5hZGRDb2xvclN0b3AoMC4zOCwgJyMwOTBEMjQnKTtcbiAgICAgIGJnR3JhZC5hZGRDb2xvclN0b3AoMC42OCwgJyMxMTE4MzYnKTtcbiAgICAgIGJnR3JhZC5hZGRDb2xvclN0b3AoMSwgJyMwNDA3MTEnKTtcbiAgICB9IGVsc2UgaWYgKGxhbmRzY2FwZSA9PT0gJ29jZWFuX3dlbGxuZXNzJykge1xuICAgICAgYmdHcmFkLmFkZENvbG9yU3RvcCgwLCAnIzA3MTkyOScpO1xuICAgICAgYmdHcmFkLmFkZENvbG9yU3RvcCgwLjQ1LCAnIzBGMkU0NycpO1xuICAgICAgYmdHcmFkLmFkZENvbG9yU3RvcCgwLjY1LCAnIzBBMjIzOScpO1xuICAgICAgYmdHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzA0MTAxQycpO1xuICAgIH0gZWxzZSBpZiAobGFuZHNjYXBlID09PSAnYWxwaW5lX3BlYWtzJykge1xuICAgICAgYmdHcmFkLmFkZENvbG9yU3RvcCgwLCAnIzA0MEIxNicpO1xuICAgICAgYmdHcmFkLmFkZENvbG9yU3RvcCgwLjQyLCAnIzBEMUYzMycpO1xuICAgICAgYmdHcmFkLmFkZENvbG9yU3RvcCgwLjY0LCAnIzA5MTUyNicpO1xuICAgICAgYmdHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzA0MDgxMScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiZ0dyYWQuYWRkQ29sb3JTdG9wKDAsICcjMDUwOTEyJyk7XG4gICAgICBiZ0dyYWQuYWRkQ29sb3JTdG9wKDAuNDIsICcjMEIxMzI0Jyk7XG4gICAgICBiZ0dyYWQuYWRkQ29sb3JTdG9wKDAuNjIsICcjMDgxMDFFJyk7XG4gICAgICBiZ0dyYWQuYWRkQ29sb3JTdG9wKDEsICcjMDQwNzBEJyk7XG4gICAgfVxuICAgIGN0eC5maWxsU3R5bGUgPSBiZ0dyYWQ7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xuXG4gICAgLy8gMi4gRW52aXJvbm1lbnRhbCBMaWdodGluZyAmIE5lYnVsYSAvIFN1biBHbG93XG4gICAgaWYgKGNmZy5lbnZpcm9ubWVudGFsTGlnaHRpbmcpIHtcbiAgICAgIGNvbnN0IHROb3JtID0gKGNmZy5saWdodFRlbXBlcmF0dXJlSyAtIDI4MDApIC8gKDY1MDAgLSAyODAwKTtcbiAgICAgIGNvbnN0IGdsb3dDb2xvciA9XG4gICAgICAgIGxhbmRzY2FwZSA9PT0gJ2Nvc21pY19vcmJpdGFsJ1xuICAgICAgICAgID8gJ3JnYmEoMTM5LCA5MiwgMjQ2LCAwLjI2KSdcbiAgICAgICAgICA6IHROb3JtIDwgMC40NVxuICAgICAgICAgID8gJ3JnYmEoMjQ1LCAxNTgsIDExLCAwLjI0KSdcbiAgICAgICAgICA6ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4yMiknO1xuICAgICAgY29uc3Qgc3VuR3JhZCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChcbiAgICAgICAgY3ggLSBweCAqIDAuMzUsXG4gICAgICAgIGggKiAwLjMyIC0gcHkgKiAwLjI1LFxuICAgICAgICAxOCxcbiAgICAgICAgY3ggLSBweCAqIDAuMzUsXG4gICAgICAgIGggKiAwLjMyIC0gcHkgKiAwLjI1LFxuICAgICAgICB3ICogMC42MlxuICAgICAgKTtcbiAgICAgIHN1bkdyYWQuYWRkQ29sb3JTdG9wKDAsIGdsb3dDb2xvcik7XG4gICAgICBzdW5HcmFkLmFkZENvbG9yU3RvcCgwLjU1LCAncmdiYSg2LCAxODIsIDIxMiwgMC4wOSknKTtcbiAgICAgIHN1bkdyYWQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsIDAsIDAsIDApJyk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gc3VuR3JhZDtcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3LCBoICogMC43NSk7XG4gICAgfVxuXG4gICAgLy8gMkIuIERlZXAtUGFyYWxsYXggRHJvbmUgVmlzdGEgR2VvbWV0cnkgKE1vdW50YWlucywgQ29zbWljIFJpbmdzLCBPY2VhbiBXYXZlcywgb3IgU2t5bGluZSlcbiAgICBjdHguc2F2ZSgpO1xuICAgIGlmIChsYW5kc2NhcGUgPT09ICdhbHBpbmVfcGVha3MnKSB7XG4gICAgICAvLyBEaXN0YW50IE1vdW50YWluIFJhbmdlIExheWVyIDEgKERlZXBlc3QgUGFyYWxsYXgpXG4gICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMTUsIDMyLCA1NiwgMC43MiknO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjI4KSc7XG4gICAgICBjdHgubGluZVdpZHRoID0gMS4yO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygwLCBoICogMC41Mik7XG4gICAgICBmb3IgKGxldCBteCA9IC0xMjA7IG14IDw9IHcgKyAxMjA7IG14ICs9IDY1KSB7XG4gICAgICAgIGNvbnN0IHBlYWtIID1cbiAgICAgICAgICA2NSArXG4gICAgICAgICAgTWF0aC5zaW4obXggKiAwLjAxNCArIDEuMikgKiA0OCArXG4gICAgICAgICAgTWF0aC5jb3MobXggKiAwLjAyOSkgKiAzMjtcbiAgICAgICAgY3R4LmxpbmVUbyhteCAtIHB4ICogMC4xOCwgaCAqIDAuNDggLSBwZWFrSCAtIHB5ICogMC4xMik7XG4gICAgICB9XG4gICAgICBjdHgubGluZVRvKHcsIGggKiAwLjUyKTtcbiAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIE1pZC1EaXN0YW5jZSBBbHBpbmUgUmlkZ2VzIHdpdGggV2lyZWZyYW1lIFRvcG9ncmFwaGljIENvbnRvdXJzIChMYXllciAyIFBhcmFsbGF4KVxuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDksIDIwLCAzOCwgMC44NCknO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMzQsIDIxMSwgMjM4LCAwLjM4KSc7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDAsIGggKiAwLjU2KTtcbiAgICAgIGZvciAobGV0IG14ID0gLTEwMDsgbXggPD0gdyArIDEwMDsgbXggKz0gNDgpIHtcbiAgICAgICAgY29uc3QgcGVha0ggPVxuICAgICAgICAgIDM4ICtcbiAgICAgICAgICBNYXRoLmNvcyhteCAqIDAuMDE5ICsgMC41KSAqIDM2ICtcbiAgICAgICAgICBNYXRoLnNpbihteCAqIDAuMDM3KSAqIDIyO1xuICAgICAgICBjdHgubGluZVRvKG14IC0gcHggKiAwLjM2LCBoICogMC41MyAtIHBlYWtIIC0gcHkgKiAwLjIyKTtcbiAgICAgIH1cbiAgICAgIGN0eC5saW5lVG8odywgaCAqIDAuNTYpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9IGVsc2UgaWYgKGxhbmRzY2FwZSA9PT0gJ2Nvc21pY19vcmJpdGFsJykge1xuICAgICAgLy8gRGVlcCBTcGFjZSBTdGFyZmllbGQgJiBPcmJpdGFsIEhvcml6b24gQ3VydmVcbiAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgNTU7IHMrKykge1xuICAgICAgICBjb25zdCBzeCA9ICgocyAqIDk3KSAlIHcpIC0gcHggKiAoMC4wOCArIChzICUgMykgKiAwLjA2KTtcbiAgICAgICAgY29uc3Qgc3kgPSAoKHMgKiA1MykgJSAoaCAqIDAuNTIpKSAtIHB5ICogMC4xO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcyAlIDUgPT09IDAgPyAnI0Y1OUUwQicgOiAnI0UyRThGMCc7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMzUgKyAoKHMgKiAxMykgJSA1MCkgLyAxMDA7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYygoc3ggKyB3KSAlIHcsIChzeSArIGggKiAwLjUyKSAlIChoICogMC41MiksIHMgJSA0ID09PSAwID8gMS44IDogMS4xLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICB9XG4gICAgICAvLyBQbGFuZXRhcnkgT3JiaXRhbCBBcmNcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNDU7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzM4QkRGOCc7XG4gICAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMoY3ggLSBweCAqIDAuMiwgaCAqIDEuNDIgLSBweSAqIDAuMTUsIGggKiAwLjk4LCBNYXRoLlBJICogMS4xOCwgTWF0aC5QSSAqIDEuODIpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0gZWxzZSBpZiAobGFuZHNjYXBlID09PSAnb2NlYW5fd2VsbG5lc3MnKSB7XG4gICAgICAvLyBDYWxtIFplbiBPY2VhbiBIb3Jpem9uICYgU2hpbW1lcmluZyBXYXRlciBMaW5lc1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjI4KSc7XG4gICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgIGZvciAobGV0IHdsID0gMDsgd2wgPCA5OyB3bCsrKSB7XG4gICAgICAgIGNvbnN0IHd5ID0gaCAqIDAuNDMgKyB3bCAqIDExIC0gcHkgKiAwLjE1O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8odyAqIDAuMSwgd3kpO1xuICAgICAgICBjdHgubGluZVRvKHcgKiAwLjksIHd5KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBNZXRyb3BvbGlzIERhd24gLyBFeGVjdXRpdmUgU2t5bGluZSBTaWxob3VldHRlc1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDE1LCAyMywgNDIsIDAuNiknO1xuICAgICAgZm9yIChsZXQgcyA9IC05OyBzIDw9IDk7IHMrKykge1xuICAgICAgICBjb25zdCBidyA9IDI2ICsgKChNYXRoLmFicyhzKSAqIDEzKSAlIDIwKTtcbiAgICAgICAgY29uc3QgYmggPSAzOCArIE1hdGguYWJzKE1hdGguc2luKHMgKiAyLjEpKSAqIDg4O1xuICAgICAgICBjdHguZmlsbFJlY3QoY3ggKyBzICogNTYgLSBweCAqIDAuMjgsIGggKiAwLjQ2IC0gYmggLSBweSAqIDAuMTUsIGJ3LCBiaCk7XG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyAzRCAtPiAyRCBXaWRlLVBlcnNwZWN0aXZlIFByb2plY3Rpb24gSGVscGVyIChSZXNwb25zaXZlIHRvIHBlcnNwZWN0aXZlRm92RGVnIDI4wrAuLjg1wrApXG4gICAgY29uc3QgZm92RGVnID0gY2ZnLnBlcnNwZWN0aXZlRm92RGVnIHx8IDYyO1xuICAgIGNvbnN0IGZvdkZhY3RvciA9IChmb3ZEZWcgLSAyOCkgLyAoODUgLSAyOCk7IC8vIDAgKFRlbGVwaG90bykgdG8gMSAoVWx0cmEtV2lkZSBQZXJzcGVjdGl2ZSlcbiAgICBjb25zdCByb3RZID0gYnVpbGRpbmdHcm91cFJlZi5jdXJyZW50ID8gYnVpbGRpbmdHcm91cFJlZi5jdXJyZW50LnJvdGF0aW9uLnkgOiAwLjQ1O1xuICAgIGNvbnN0IGNvc1kgPSBNYXRoLmNvcyhyb3RZKTtcbiAgICBjb25zdCBzaW5ZID0gTWF0aC5zaW4ocm90WSk7XG4gICAgY29uc3QgYmFzZVNjYWxlID1cbiAgICAgIHBTdGF0ZS50cmFuc2l0aW9uU2NhbGUgKiBNYXRoLm1pbih3LCBoKSAqICgwLjE0NSArICgxIC0gZm92RmFjdG9yKSAqIDAuMDM1KTtcbiAgICBjb25zdCB0aWx0ID0gVEhSRUUuTWF0aFV0aWxzLmNsYW1wKFxuICAgICAgKHBTdGF0ZS5jYW1lcmFFbGV2YXRpb24gLSAxLjIpICogMC4yMiArIChjZmcuZ3lyb1BpdGNoRGVnIHx8IDApICogMC4wMDUsXG4gICAgICAwLjE4LFxuICAgICAgMC41NlxuICAgICk7XG4gICAgY29uc3QgY2FtZXJhRGlzdCA9IDYuNiAtIGZvdkZhY3RvciAqIDEuODU7XG4gICAgY29uc3QgZm9jYWxMZW4gPSA1LjggLSBmb3ZGYWN0b3IgKiAxLjE1O1xuXG4gICAgY29uc3QgcHJvamVjdDNEID0gKHg6IG51bWJlciwgeTogbnVtYmVyLCB6OiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IHJ4ID0geCAqIGNvc1kgLSB6ICogc2luWTtcbiAgICAgIGNvbnN0IHJ6ID0geCAqIHNpblkgKyB6ICogY29zWTtcbiAgICAgIGNvbnN0IGRlcHRoID0gY2FtZXJhRGlzdCArIHJ6ICogKDAuNDIgKyBmb3ZGYWN0b3IgKiAwLjM1KTtcbiAgICAgIGNvbnN0IHBlcnNwID0gZm9jYWxMZW4gLyBNYXRoLm1heCgxLjQsIGRlcHRoKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN4OiBjeCArIHJ4ICogYmFzZVNjYWxlICogcGVyc3AgKyBweCAqICgwLjY1ICsgcGVyc3AgKiAwLjM1KSxcbiAgICAgICAgc3k6IGN5IC0geSAqIGJhc2VTY2FsZSAqIHBlcnNwICsgcnogKiBiYXNlU2NhbGUgKiB0aWx0ICogcGVyc3AgKyBweSAqIDAuNzUsXG4gICAgICAgIGRlcHRoLFxuICAgICAgICBwZXJzcCxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIDMuIEZsb29yIFBsYW5lIERldGVjdGlvbiBHcmlkIChQbGFuZUNsYXNzaWZpY2F0aW9uLkZsb29yKVxuICAgIGlmIChjZmcudWlTZXR0aW5ncy5zaG93UGxhbmVHcmlkICYmIGNmZy5wbGFuZURldGVjdGlvbk1vZGUgIT09ICd0YWJsZV9vbmx5Jykge1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDYsIDE4MiwgMjEyLCAwLjE0KSc7XG4gICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgIGZvciAobGV0IGZnID0gLTQuMjsgZmcgPD0gNC4yOyBmZyArPSAwLjg1KSB7XG4gICAgICAgIGNvbnN0IGZwMSA9IHByb2plY3QzRChmZywgLTAuODUsIC0zLjApO1xuICAgICAgICBjb25zdCBmcDIgPSBwcm9qZWN0M0QoZmcsIC0wLjg1LCAzLjApO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oZnAxLnN4LCBmcDEuc3kpO1xuICAgICAgICBjdHgubGluZVRvKGZwMi5zeCwgZnAyLnN5KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvLyA0LiBIb2xvZ3JhcGhpYyBDcmFmdGJlbmNoIC8gQVIgVGFibGV0b3AgU3VyZmFjZSBQbGFuZVxuICAgIGN0eC5zYXZlKCk7XG4gICAgY29uc3QgdENvcm5lcnMgPSBbXG4gICAgICBwcm9qZWN0M0QoLTMuNiwgMCwgLTIuMjUpLFxuICAgICAgcHJvamVjdDNEKDMuNiwgMCwgLTIuMjUpLFxuICAgICAgcHJvamVjdDNEKDMuNiwgMCwgMi4yNSksXG4gICAgICBwcm9qZWN0M0QoLTMuNiwgMCwgMi4yNSksXG4gICAgXTtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoNywgMTMsIDI1LCAwLjg0KSc7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gcGFsLnByaW1hcnlIZXg7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyh0Q29ybmVyc1swXS5zeCwgdENvcm5lcnNbMF0uc3kpO1xuICAgIHRDb3JuZXJzLnNsaWNlKDEpLmZvckVhY2goKGMpID0+IGN0eC5saW5lVG8oYy5zeCwgYy5zeSkpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNTU7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gVGFibGV0b3AgTGlEQVIgJiBQZXJzcGVjdGl2ZSBHcmlkXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gcGFsLnByaW1hcnlIZXg7XG4gICAgY3R4Lmdsb2JhbEFscGhhID0gMC4yMjtcbiAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICBmb3IgKGxldCBnID0gLTMuMjsgZyA8PSAzLjI7IGcgKz0gMC40KSB7XG4gICAgICBjb25zdCBwMSA9IHByb2plY3QzRChnLCAwLCAtMi4xKTtcbiAgICAgIGNvbnN0IHAyID0gcHJvamVjdDNEKGcsIDAsIDIuMSk7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKHAxLnN4LCBwMS5zeSk7XG4gICAgICBjdHgubGluZVRvKHAyLnN4LCBwMi5zeSk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxuICAgIGZvciAobGV0IGd6ID0gLTIuMDsgZ3ogPD0gMi4wOyBneiArPSAwLjQpIHtcbiAgICAgIGNvbnN0IHAzID0gcHJvamVjdDNEKC0zLjIsIDAsIGd6KTtcbiAgICAgIGNvbnN0IHA0ID0gcHJvamVjdDNEKDMuMiwgMCwgZ3opO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhwMy5zeCwgcDMuc3kpO1xuICAgICAgY3R4LmxpbmVUbyhwNC5zeCwgcDQuc3kpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cblxuICAgIC8vIEdsb3dpbmcgQ29uY2VudHJpYyBSYWRhciAmIEFSIEFuY2hvciBSaW5ncyBvbiBUYWJsZXRvcFxuICAgIFswLjk1LCAxLjYsIDIuMzVdLmZvckVhY2goKHIsIGlkeCkgPT4ge1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaWR4ICUgMiA9PT0gMCA/IHBhbC5wcmltYXJ5SGV4IDogcGFsLnNlY29uZGFyeUhleDtcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNiAtIGlkeCAqIDAuMTI7XG4gICAgICBjdHgubGluZVdpZHRoID0gaWR4ID09PSAwID8gMi4yIDogMS4zO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgZm9yIChsZXQgYSA9IDA7IGEgPD0gNjQ7IGErKykge1xuICAgICAgICBjb25zdCBhbmcgPSAoYSAvIDY0KSAqIE1hdGguUEkgKiAyICsgKGlkeCA9PT0gMSA/IGFjY3VtVGltZSAqIDAuMTggOiAwKTtcbiAgICAgICAgY29uc3QgcHQgPSBwcm9qZWN0M0QoTWF0aC5jb3MoYW5nKSAqIHIsIDAuMDEsIE1hdGguc2luKGFuZykgKiByKTtcbiAgICAgICAgaWYgKGEgPT09IDApIGN0eC5tb3ZlVG8ocHQuc3gsIHB0LnN5KTtcbiAgICAgICAgZWxzZSBjdHgubGluZVRvKHB0LnN4LCBwdC5zeSk7XG4gICAgICB9XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSk7XG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIC8vIDUuIFJlbmRlciBTdXJyb3VuZGluZyBVcmJhbiBDb250ZXh0IEJsb2NrcyAoSW5zdGFuY2VkTWVzaCBSZXByZXNlbnRhdGlvbilcbiAgICB1cmJhbkNvbnRleHRCbG9ja3MuZm9yRWFjaCgodWIpID0+IHtcbiAgICAgIGNvbnN0IGJoID0gdWIuaCAqIChjZmcudG93ZXJIZWlnaHRNdWx0aXBsaWVyIHx8IDEuMCk7XG4gICAgICBjb25zdCBiMiA9IHByb2plY3QzRCh1Yi54ICsgdWIudywgMCwgdWIueiArIHViLncpO1xuICAgICAgY29uc3QgYjMgPSBwcm9qZWN0M0QodWIueCAtIHViLncsIDAsIHViLnogKyB1Yi53KTtcbiAgICAgIGNvbnN0IHQwID0gcHJvamVjdDNEKHViLnggLSB1Yi53LCBiaCwgdWIueiAtIHViLncpO1xuICAgICAgY29uc3QgdDEgPSBwcm9qZWN0M0QodWIueCArIHViLncsIGJoLCB1Yi56IC0gdWIudyk7XG4gICAgICBjb25zdCB0MiA9IHByb2plY3QzRCh1Yi54ICsgdWIudywgYmgsIHViLnogKyB1Yi53KTtcbiAgICAgIGNvbnN0IHQzID0gcHJvamVjdDNEKHViLnggLSB1Yi53LCBiaCwgdWIueiArIHViLncpO1xuXG4gICAgICBjb25zdCBjb2wgPSB1Yi5pc1NlY29uZGFyeSA/IHBhbC5zZWNvbmRhcnlIZXggOiBwYWwucHJpbWFyeUhleDtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbDtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb2w7XG4gICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjE4O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhiMy5zeCwgYjMuc3kpO1xuICAgICAgY3R4LmxpbmVUbyhiMi5zeCwgYjIuc3kpO1xuICAgICAgY3R4LmxpbmVUbyh0Mi5zeCwgdDIuc3kpO1xuICAgICAgY3R4LmxpbmVUbyh0My5zeCwgdDMuc3kpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC40ODtcbiAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyh0MC5zeCwgdDAuc3kpO1xuICAgICAgY3R4LmxpbmVUbyh0MS5zeCwgdDEuc3kpO1xuICAgICAgY3R4LmxpbmVUbyh0Mi5zeCwgdDIuc3kpO1xuICAgICAgY3R4LmxpbmVUbyh0My5zeCwgdDMuc3kpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gNi4gUmVuZGVyIE1haW4gM0QgQXJjaGl0ZWN0dXJhbCBIb2xvZ3JhbSBDb21wbGV4ICYgSG9iYnkgTW9kZWwtR2x1aW5nIFN0YWdlc1xuICAgIGlmIChidWlsZGluZ0dyb3VwUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IGRyYXdJdGVtczogQXJyYXk8e1xuICAgICAgICBvcmRlcklkeDogbnVtYmVyO1xuICAgICAgICBkZXB0aDogbnVtYmVyO1xuICAgICAgICBjeDogbnVtYmVyO1xuICAgICAgICBjeTogbnVtYmVyO1xuICAgICAgICBjejogbnVtYmVyO1xuICAgICAgICB3eDogbnVtYmVyO1xuICAgICAgICB3eTogbnVtYmVyO1xuICAgICAgICB3ejogbnVtYmVyO1xuICAgICAgICBsYXllckluZGV4OiBudW1iZXI7XG4gICAgICAgIHNoYXBlVHlwZTogc3RyaW5nO1xuICAgICAgICBsYWJlbDogc3RyaW5nO1xuICAgICAgfT4gPSBbXTtcblxuICAgICAgbGV0IG1lc2hDb3VudGVyID0gMDtcbiAgICAgIGJ1aWxkaW5nR3JvdXBSZWYuY3VycmVudC5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUSFJFRS5NZXNoICYmIGNoaWxkLnVzZXJEYXRhPy5ib3hTaXplKSB7XG4gICAgICAgICAgbWVzaENvdW50ZXIrKztcbiAgICAgICAgICBjb25zdCBtYXhIb2JieVN0ZXAgPSBjZmcuaG9iYnlBc3NlbWJseVN0ZXAgfHwgMTI7XG4gICAgICAgICAgaWYgKG1lc2hDb3VudGVyID4gbWF4SG9iYnlTdGVwKSByZXR1cm47XG5cbiAgICAgICAgICBjb25zdCBsYXllcklkeCA9IGNoaWxkLnVzZXJEYXRhLmxheWVySW5kZXggfHwgMDtcbiAgICAgICAgICBjb25zdCBiYXNlWSA9IGNoaWxkLnVzZXJEYXRhLmJhc2VZIHx8IDA7XG4gICAgICAgICAgY29uc3QgW2J4LCBieSwgYnpdID0gY2hpbGQudXNlckRhdGEuYm94U2l6ZTtcbiAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBhY3RpdmUgaG9iYnkgYXNzZW1ibHkgcGllY2UgYmVpbmcgZ2x1ZWQsIGdpdmUgaXQgYSBnZW50bGUgaG92ZXIgb2Zmc2V0XG4gICAgICAgICAgY29uc3QgaXNCZWluZ0dsdWVkID0gbWVzaENvdW50ZXIgPT09IG1heEhvYmJ5U3RlcCAmJiBtYXhIb2JieVN0ZXAgPCAxMjtcbiAgICAgICAgICBjb25zdCBnbHVlSG92ZXIgPSBpc0JlaW5nR2x1ZWQgPyAwLjI4ICsgTWF0aC5zaW4oYWNjdW1UaW1lICogNSkgKiAwLjA4IDogMDtcbiAgICAgICAgICBjb25zdCBjdXJZID0gYmFzZVkgKyBsYXllcklkeCAqIGNmZy5leHBsb2RlZFZpZXdGYWN0b3IgKiAwLjY1ICsgZ2x1ZUhvdmVyO1xuICAgICAgICAgIGNvbnN0IGNlbnRlclB0ID0gcHJvamVjdDNEKGNoaWxkLnBvc2l0aW9uLngsIGN1clkgKyBieSAqIDAuNSwgY2hpbGQucG9zaXRpb24ueik7XG4gICAgICAgICAgZHJhd0l0ZW1zLnB1c2goe1xuICAgICAgICAgICAgb3JkZXJJZHg6IG1lc2hDb3VudGVyLFxuICAgICAgICAgICAgZGVwdGg6IGNlbnRlclB0LmRlcHRoLFxuICAgICAgICAgICAgY3g6IGNoaWxkLnBvc2l0aW9uLngsXG4gICAgICAgICAgICBjeTogY3VyWSxcbiAgICAgICAgICAgIGN6OiBjaGlsZC5wb3NpdGlvbi56LFxuICAgICAgICAgICAgd3g6IGJ4ICogMC41LFxuICAgICAgICAgICAgd3k6IGJ5LFxuICAgICAgICAgICAgd3o6IGJ6ICogMC41LFxuICAgICAgICAgICAgbGF5ZXJJbmRleDogbGF5ZXJJZHgsXG4gICAgICAgICAgICBzaGFwZVR5cGU6IGNoaWxkLnVzZXJEYXRhLnNoYXBlVHlwZSB8fCAndG93ZXInLFxuICAgICAgICAgICAgbGFiZWw6IGNoaWxkLnVzZXJEYXRhLnBhcnRMYWJlbCB8fCAnJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGRyYXdJdGVtcy5zb3J0KChhLCBiKSA9PiBiLmRlcHRoIC0gYS5kZXB0aCk7XG5cbiAgICAgIGRyYXdJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgY3g6IGl4LCBjeTogaXksIGN6OiBpeiwgd3gsIHd5LCB3eiwgbGF5ZXJJbmRleCwgc2hhcGVUeXBlLCBvcmRlcklkeCB9ID0gaXRlbTtcbiAgICAgICAgY29uc3QgYzAwID0gcHJvamVjdDNEKGl4IC0gd3gsIGl5LCBpeiAtIHd6KTtcbiAgICAgICAgY29uc3QgYzEwID0gcHJvamVjdDNEKGl4ICsgd3gsIGl5LCBpeiAtIHd6KTtcbiAgICAgICAgY29uc3QgYzExID0gcHJvamVjdDNEKGl4ICsgd3gsIGl5LCBpeiArIHd6KTtcbiAgICAgICAgY29uc3QgYzAxID0gcHJvamVjdDNEKGl4IC0gd3gsIGl5LCBpeiArIHd6KTtcblxuICAgICAgICBjb25zdCB0MDAgPSBwcm9qZWN0M0QoaXggLSB3eCwgaXkgKyB3eSwgaXogLSB3eik7XG4gICAgICAgIGNvbnN0IHQxMCA9IHByb2plY3QzRChpeCArIHd4LCBpeSArIHd5LCBpeiAtIHd6KTtcbiAgICAgICAgY29uc3QgdDExID0gcHJvamVjdDNEKGl4ICsgd3gsIGl5ICsgd3ksIGl6ICsgd3opO1xuICAgICAgICBjb25zdCB0MDEgPSBwcm9qZWN0M0QoaXggLSB3eCwgaXkgKyB3eSwgaXogKyB3eik7XG5cbiAgICAgICAgY29uc3QgaXNDb3JlT3JDcm93biA9IGxheWVySW5kZXggPT09IDEgfHwgbGF5ZXJJbmRleCA9PT0gMztcbiAgICAgICAgY29uc3Qgc3Ryb2tlQ29sID0gaXNDb3JlT3JDcm93biA/IHBhbC5zZWNvbmRhcnlIZXggOiBwYWwucHJpbWFyeUhleDtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2w7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdHJva2VDb2w7XG5cbiAgICAgICAgLy8gSG9iYnlpc3QgQ0FEIEFzc2VtYmx5IC8gR2x1aW5nIEd1aWRlIENvbm5lY3RvcnNcbiAgICAgICAgaWYgKGNmZy5ob2JieUJsdWVwcmludENvbm5lY3RvcnMgJiYgKGNmZy5leHBsb2RlZFZpZXdGYWN0b3IgPiAwLjA1IHx8IChjZmcuaG9iYnlBc3NlbWJseVN0ZXAgfHwgMTIpIDwgMTIpKSB7XG4gICAgICAgICAgY29uc3QgYmFzZUFuY2hvciA9IHByb2plY3QzRChpeCwgMCwgaXopO1xuICAgICAgICAgIGNvbnN0IHBhcnRCb3R0b20gPSBwcm9qZWN0M0QoaXgsIGl5LCBpeik7XG4gICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICBjdHguc2V0TGluZURhc2goWzMsIDNdKTtcbiAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI0Y1OUUwQic7XG4gICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC42NTtcbiAgICAgICAgICBjdHgubGluZVdpZHRoID0gMS4xO1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHgubW92ZVRvKGJhc2VBbmNob3Iuc3gsIGJhc2VBbmNob3Iuc3kpO1xuICAgICAgICAgIGN0eC5saW5lVG8ocGFydEJvdHRvbS5zeCwgcGFydEJvdHRvbS5zeSk7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIb2xvZ3JhcGhpYyBTaGFkZWQgRmFjZXNcbiAgICAgICAgaWYgKCFjZmcud2lyZWZyYW1lT3ZlcmxheSkge1xuICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IGxheWVySW5kZXggPT09IDAgPyAwLjM1IDogaXNDb3JlT3JDcm93biA/IDAuMzIgOiAwLjI0O1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHgubW92ZVRvKGMwMS5zeCwgYzAxLnN5KTtcbiAgICAgICAgICBjdHgubGluZVRvKGMxMS5zeCwgYzExLnN5KTtcbiAgICAgICAgICBjdHgubGluZVRvKHQxMS5zeCwgdDExLnN5KTtcbiAgICAgICAgICBjdHgubGluZVRvKHQwMS5zeCwgdDAxLnN5KTtcbiAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IGxheWVySW5kZXggPT09IDAgPyAwLjI4IDogMC4xODtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4Lm1vdmVUbyhjMTAuc3gsIGMxMC5zeSk7XG4gICAgICAgICAgY3R4LmxpbmVUbyhjMTEuc3gsIGMxMS5zeSk7XG4gICAgICAgICAgY3R4LmxpbmVUbyh0MTEuc3gsIHQxMS5zeSk7XG4gICAgICAgICAgY3R4LmxpbmVUbyh0MTAuc3gsIHQxMC5zeSk7XG4gICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjM4O1xuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHgubW92ZVRvKHQwMC5zeCwgdDAwLnN5KTtcbiAgICAgICAgICBjdHgubGluZVRvKHQxMC5zeCwgdDEwLnN5KTtcbiAgICAgICAgICBjdHgubGluZVRvKHQxMS5zeCwgdDExLnN5KTtcbiAgICAgICAgICBjdHgubGluZVRvKHQwMS5zeCwgdDAxLnN5KTtcbiAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFyY2hpdGVjdHVyYWwgRmxvb3IgUGxhdGVzXG4gICAgICAgIGlmICh3eSA+IDAuNDUgJiYgc2hhcGVUeXBlID09PSAndG93ZXInKSB7XG4gICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4zODtcbiAgICAgICAgICBjdHgubGluZVdpZHRoID0gMC44NTtcbiAgICAgICAgICBjb25zdCBmbG9vcnMgPSBNYXRoLm1pbigxMiwgTWF0aC5tYXgoMywgTWF0aC5mbG9vcih3eSAqIDQuNSkpKTtcbiAgICAgICAgICBmb3IgKGxldCBmID0gMTsgZiA8IGZsb29yczsgZisrKSB7XG4gICAgICAgICAgICBjb25zdCBmeSA9IGl5ICsgKHd5ICogZikgLyBmbG9vcnM7XG4gICAgICAgICAgICBjb25zdCBmMDAgPSBwcm9qZWN0M0QoaXggLSB3eCwgZnksIGl6IC0gd3opO1xuICAgICAgICAgICAgY29uc3QgZjEwID0gcHJvamVjdDNEKGl4ICsgd3gsIGZ5LCBpeiAtIHd6KTtcbiAgICAgICAgICAgIGNvbnN0IGYxMSA9IHByb2plY3QzRChpeCArIHd4LCBmeSwgaXogKyB3eik7XG4gICAgICAgICAgICBjb25zdCBmMDEgPSBwcm9qZWN0M0QoaXggLSB3eCwgZnksIGl6ICsgd3opO1xuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyhmMDAuc3gsIGYwMC5zeSk7XG4gICAgICAgICAgICBjdHgubGluZVRvKGYxMC5zeCwgZjEwLnN5KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oZjExLnN4LCBmMTEuc3kpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyhmMDEuc3gsIGYwMS5zeSk7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3Jpc3AgR2xvd2luZyBTdHJ1Y3R1cmFsIFdpcmVmcmFtZSBFZGdlc1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjk1O1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbGF5ZXJJbmRleCA9PT0gMiA/IDEuOCA6IDEuMztcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oYzAwLnN4LCBjMDAuc3kpO1xuICAgICAgICBjdHgubGluZVRvKGMxMC5zeCwgYzEwLnN5KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjMTEuc3gsIGMxMS5zeSk7XG4gICAgICAgIGN0eC5saW5lVG8oYzAxLnN4LCBjMDEuc3kpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8odDAwLnN4LCB0MDAuc3kpO1xuICAgICAgICBjdHgubGluZVRvKHQxMC5zeCwgdDEwLnN5KTtcbiAgICAgICAgY3R4LmxpbmVUbyh0MTEuc3gsIHQxMS5zeSk7XG4gICAgICAgIGN0eC5saW5lVG8odDAxLnN4LCB0MDEuc3kpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICBbXG4gICAgICAgICAgW2MwMCwgdDAwXSxcbiAgICAgICAgICBbYzEwLCB0MTBdLFxuICAgICAgICAgIFtjMTEsIHQxMV0sXG4gICAgICAgICAgW2MwMSwgdDAxXSxcbiAgICAgICAgXS5mb3JFYWNoKChbYiwgdF0pID0+IHtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4Lm1vdmVUbyhiLnN4LCBiLnN5KTtcbiAgICAgICAgICBjdHgubGluZVRvKHQuc3gsIHQuc3kpO1xuICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGxheWVySW5kZXggPj0gMiAmJiB3eSA+IDAuOCkge1xuICAgICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNDI7XG4gICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuMDtcbiAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgY3R4Lm1vdmVUbyhjMDEuc3gsIGMwMS5zeSk7XG4gICAgICAgICAgY3R4LmxpbmVUbyh0MTEuc3gsIHQxMS5zeSk7XG4gICAgICAgICAgY3R4Lm1vdmVUbyhjMTEuc3gsIGMxMS5zeSk7XG4gICAgICAgICAgY3R4LmxpbmVUbyh0MDEuc3gsIHQwMS5zeSk7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2hvdyBob2JieSBhc3NlbWJseSBwYXJ0IHRhZyBpZiBpbiBzdGVwLWJ5LXN0ZXAgZ2x1aW5nIG1vZGVcbiAgICAgICAgaWYgKChjZmcuaG9iYnlBc3NlbWJseVN0ZXAgfHwgMTIpIDwgMTIgJiYgb3JkZXJJZHggPT09IGNmZy5ob2JieUFzc2VtYmx5U3RlcCkge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI0Y1OUUwQic7XG4gICAgICAgICAgY3R4LmZvbnQgPSAnNjAwIDEwcHggXCJKZXRCcmFpbnMgTW9ub1wiLCBtb25vc3BhY2UnO1xuICAgICAgICAgIGN0eC5maWxsVGV4dChgS0xFSkVOSUUgTU9EVcWBVSAjMCR7b3JkZXJJZHh9OiAke2l0ZW0ubGFiZWx9YCwgdDAxLnN4IC0gMjAsIHQwMS5zeSAtIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gNy4gUmVuZGVyIEF1dG9ub21vdXMgM0QgU3BhdGlhbCBBSSBBZ2VudHMgJiBOYXZNZXNoIFRyYWplY3Rvcmllc1xuICAgIGlmIChjZmcuc2hvd1NwYXRpYWxBZ2VudHMpIHtcbiAgICAgIGNvbnN0IGNvdW50ID0gTWF0aC5taW4oYWdlbnRDYXRhbG9nLmxlbmd0aCwgTWF0aC5tYXgoMiwgY2ZnLmFjdGl2ZUFnZW50c0NvdW50IHx8IDQpKTtcbiAgICAgIGNvbnN0IGhtID0gY2ZnLnRvd2VySGVpZ2h0TXVsdGlwbGllciB8fCAxLjA7XG5cbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguc2V0TGluZURhc2goWzUsIDVdKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjMzhCREY4JztcbiAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNDU7XG4gICAgICBjdHgubGluZVdpZHRoID0gMS4yO1xuICAgICAgY29uc3QgbmF2UmFkaXVzID0gY2ZnLmFnZW50TmF2TW9kZSA9PT0gJ2ZhY2FkZV9zY2FuJyA/IDEuMjUgOiAyLjA1O1xuICAgICAgY29uc3QgbmF2SGVpZ2h0ID1cbiAgICAgICAgY2ZnLmFnZW50TmF2TW9kZSA9PT0gJ2Zsb29yX3BhdHJvbCdcbiAgICAgICAgICA/IDAuMDhcbiAgICAgICAgICA6IGNmZy5hZ2VudE5hdk1vZGUgPT09ICdmYWNhZGVfc2NhbidcbiAgICAgICAgICA/IDEuNDUgKiBobVxuICAgICAgICAgIDogMC45NSAqIGhtO1xuXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBmb3IgKGxldCBzID0gMDsgcyA8PSA0ODsgcysrKSB7XG4gICAgICAgIGNvbnN0IGFuZyA9IChzIC8gNDgpICogTWF0aC5QSSAqIDI7XG4gICAgICAgIGNvbnN0IG5wID0gcHJvamVjdDNEKE1hdGguY29zKGFuZykgKiBuYXZSYWRpdXMsIG5hdkhlaWdodCwgTWF0aC5zaW4oYW5nKSAqIG5hdlJhZGl1cyk7XG4gICAgICAgIGlmIChzID09PSAwKSBjdHgubW92ZVRvKG5wLnN4LCBucC5zeSk7XG4gICAgICAgIGVsc2UgY3R4LmxpbmVUbyhucC5zeCwgbnAuc3kpO1xuICAgICAgfVxuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGFnID0gYWdlbnRDYXRhbG9nW2ldO1xuICAgICAgICBjb25zdCB0ID0gYWNjdW1UaW1lICogMC42NSArIGFnLnBoYXNlT2Zmc2V0O1xuXG4gICAgICAgIGxldCBheCA9IE1hdGguY29zKHQpICogbmF2UmFkaXVzO1xuICAgICAgICBsZXQgYXogPSBNYXRoLnNpbih0KSAqIG5hdlJhZGl1cztcbiAgICAgICAgbGV0IGF5ID0gbmF2SGVpZ2h0ICsgTWF0aC5zaW4oYWNjdW1UaW1lICogMi4yICsgaSkgKiAwLjE4O1xuXG4gICAgICAgIGlmIChjZmcuYWdlbnROYXZNb2RlID09PSAnZmFjYWRlX3NjYW4nKSB7XG4gICAgICAgICAgYXkgPSAoMC40ICsgKChNYXRoLnNpbih0ICogMS4zKSArIDEpICogMC41KSAqIDIuNCkgKiBobTtcbiAgICAgICAgfSBlbHNlIGlmIChjZmcuYWdlbnROYXZNb2RlID09PSAnZmxvb3JfcGF0cm9sJykge1xuICAgICAgICAgIGF5ID0gMC4wODtcbiAgICAgICAgICBheCA9IE1hdGguY29zKHQgKiAwLjgpICogKDEuNSArIChpICUgMikgKiAwLjY1KTtcbiAgICAgICAgICBheiA9IE1hdGguc2luKHQgKiAwLjgpICogKDEuMiArIChpICUgMikgKiAwLjQ1KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFnZW50UHQgPSBwcm9qZWN0M0QoYXgsIGF5LCBheik7XG4gICAgICAgIGNvbnN0IHNjYW5UYXJnZXRZID0gY2ZnLmFnZW50TmF2TW9kZSA9PT0gJ2Zsb29yX3BhdHJvbCcgPyAwIDogYXkgKiAwLjY1O1xuICAgICAgICBjb25zdCB0YXJnZXRQdCA9IHByb2plY3QzRCgwLCBzY2FuVGFyZ2V0WSwgMCk7XG5cbiAgICAgICAgY29uc3QgYmVhbUdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoXG4gICAgICAgICAgYWdlbnRQdC5zeCxcbiAgICAgICAgICBhZ2VudFB0LnN5LFxuICAgICAgICAgIHRhcmdldFB0LnN4LFxuICAgICAgICAgIHRhcmdldFB0LnN5XG4gICAgICAgICk7XG4gICAgICAgIGJlYW1HcmFkLmFkZENvbG9yU3RvcCgwLCBhZy5jb2xvcik7XG4gICAgICAgIGJlYW1HcmFkLmFkZENvbG9yU3RvcCgxLCAncmdiYSg2LCAxODIsIDIxMiwgMC4wMiknKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYmVhbUdyYWQ7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxLjY7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuNzU7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhhZ2VudFB0LnN4LCBhZ2VudFB0LnN5KTtcbiAgICAgICAgY3R4LmxpbmVUbyh0YXJnZXRQdC5zeCwgdGFyZ2V0UHQuc3kpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgY29uc3QgZ3JvdW5kUHQgPSBwcm9qZWN0M0QoYXgsIDAsIGF6KTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYWcuY29sb3I7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMzU7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oYWdlbnRQdC5zeCwgYWdlbnRQdC5zeSk7XG4gICAgICAgIGN0eC5saW5lVG8oZ3JvdW5kUHQuc3gsIGdyb3VuZFB0LnN5KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDEuMDtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGFnLmNvbG9yO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoYWdlbnRQdC5zeCwgYWdlbnRQdC5zeSwgNS41LCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyNGRkZGRkYnO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMS41O1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoYWdlbnRQdC5zeCwgYWdlbnRQdC5zeSwgOSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDExLCAxNSwgMjMsIDAuNzgpJztcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYWcuY29sb3I7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjb25zdCBieCA9IGFnZW50UHQuc3ggKyAxMjtcbiAgICAgICAgY29uc3QgYnkgPSBhZ2VudFB0LnN5IC0gMTQ7XG4gICAgICAgIGN0eC5maWxsUmVjdChieCwgYnksIDEzNiwgMjIpO1xuICAgICAgICBjdHguc3Ryb2tlUmVjdChieCwgYnksIDEzNiwgMjIpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI0Y4RkFGQyc7XG4gICAgICAgIGN0eC5mb250ID0gJzYwMCAxMHB4IFwiSmV0QnJhaW5zIE1vbm9cIiwgbW9ub3NwYWNlJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KGAke2FnLmlkfTogJHthZy5yb2xlLnNsaWNlKDAsIDE0KX1gLCBieCArIDUsIGJ5ICsgMTQpO1xuICAgICAgfVxuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICAvLyA4LiBEeW5hbWljIFdpbmRvdyAmIEF0bW9zcGhlcmljIERyb25lIFBhcnRpY2xlc1xuICAgIGlmIChjZmcud2luZG93UGFydGljbGVzSW50ZW5zaXR5ID4gMC4wMikge1xuICAgICAgcGFydGljbGVzLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgcC55ICs9IGR0ICogcC5zcGVlZCAqIGNmZy53aW5kb3dQYXJ0aWNsZXNJbnRlbnNpdHk7XG4gICAgICAgIGlmIChwLnkgPiA0LjIpIHAueSA9IDAuMDU7XG4gICAgICAgIGNvbnN0IHB0ID0gcHJvamVjdDNEKHAueCAqIDAuNTUsIHAueSwgcC56ICogMC41NSk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwLmlzR29sZCA/ICcjRjU5RTBCJyA6IHBhbC5wcmltYXJ5SGV4O1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBjZmcud2luZG93UGFydGljbGVzSW50ZW5zaXR5ICogMC43ODtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHB0LnN4LCBwdC5zeSwgcC5pc0dvbGQgPyAyLjIgOiAxLjcsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIDkuIEJvdW5kZWQgRGVlcC1QYXJhbGxheCBXb3Jrc3BhY2UgRnJhbWUgKFBhc3NlLXBhcnRvdXQgTWFyZ2luKSAmIENvbXBvc2l0aW9uIFBsYW5uaW5nIFRvb2xzXG4gICAgY29uc3QgbWFyZ2luID0gY2ZnLndvcmtzcGFjZU1hcmdpblB4IHx8IDI4O1xuICAgIGNvbnN0IGZ3ID0gdyAtIG1hcmdpbiAqIDI7XG4gICAgY29uc3QgZmggPSBoIC0gbWFyZ2luICogMjtcbiAgICBjb25zdCBjb21wTW9kZSA9IGNmZy5jb21wb3NpdGlvbkdyaWQgfHwgJ2dvbGRlbl9yYXRpbyc7XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIC8vIE91dGVyIFBhc3NlLVBhcnRvdXQgT3B0aWNhbCBGcmFtZSBCb3JkZXJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgyMjYsIDIzMiwgMjQwLCAwLjI4KSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEuMjU7XG4gICAgY3R4LnN0cm9rZVJlY3QobWFyZ2luLCBtYXJnaW4sIGZ3LCBmaCk7XG5cbiAgICAvLyBDb3JuZXIgUHJlY2lzaW9uIENhbGlicmF0aW9uIEJyYWNrZXRzXG4gICAgY29uc3QgYkxlbiA9IDE4O1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IHBhbC5wcmltYXJ5SGV4O1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIFtcbiAgICAgIFttYXJnaW4sIG1hcmdpbiwgMSwgMV0sXG4gICAgICBbdyAtIG1hcmdpbiwgbWFyZ2luLCAtMSwgMV0sXG4gICAgICBbbWFyZ2luLCBoIC0gbWFyZ2luLCAxLCAtMV0sXG4gICAgICBbdyAtIG1hcmdpbiwgaCAtIG1hcmdpbiwgLTEsIC0xXSxcbiAgICBdLmZvckVhY2goKFtieCwgYnksIGR4LCBkeV0pID0+IHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oYnggKyBkeCAqIGJMZW4sIGJ5KTtcbiAgICAgIGN0eC5saW5lVG8oYngsIGJ5KTtcbiAgICAgIGN0eC5saW5lVG8oYngsIGJ5ICsgZHkgKiBiTGVuKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9KTtcblxuICAgIC8vIENvbXBvc2l0aW9uICYgUGVyc3BlY3RpdmUgUGxhbm5pbmcgR3VpZGVzIGluc2lkZSB0aGUgQm91bmRlZCBXb3Jrc3BhY2VcbiAgICBpZiAoY29tcE1vZGUgPT09ICdnb2xkZW5fcmF0aW8nKSB7XG4gICAgICBjb25zdCBwaGlYMSA9IG1hcmdpbiArIGZ3ICogMC4zODI7XG4gICAgICBjb25zdCBwaGlYMiA9IG1hcmdpbiArIGZ3ICogMC42MTg7XG4gICAgICBjb25zdCBwaGlZMSA9IG1hcmdpbiArIGZoICogMC4zODI7XG4gICAgICBjb25zdCBwaGlZMiA9IG1hcmdpbiArIGZoICogMC42MTg7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgyNDUsIDE1OCwgMTEsIDAuMjYpJztcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbNiwgNl0pO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKHBoaVgxLCBtYXJnaW4pO1xuICAgICAgY3R4LmxpbmVUbyhwaGlYMSwgaCAtIG1hcmdpbik7XG4gICAgICBjdHgubW92ZVRvKHBoaVgyLCBtYXJnaW4pO1xuICAgICAgY3R4LmxpbmVUbyhwaGlYMiwgaCAtIG1hcmdpbik7XG4gICAgICBjdHgubW92ZVRvKG1hcmdpbiwgcGhpWTEpO1xuICAgICAgY3R4LmxpbmVUbyh3IC0gbWFyZ2luLCBwaGlZMSk7XG4gICAgICBjdHgubW92ZVRvKG1hcmdpbiwgcGhpWTIpO1xuICAgICAgY3R4LmxpbmVUbyh3IC0gbWFyZ2luLCBwaGlZMik7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguc2V0TGluZURhc2goW10pO1xuICAgIH0gZWxzZSBpZiAoY29tcE1vZGUgPT09ICdwZXJzcGVjdGl2ZV9yYXlzJykge1xuICAgICAgY29uc3QgdnBYID0gY3ggKyBweCAqIDAuMzU7XG4gICAgICBjb25zdCB2cFkgPSBoICogMC40NCArIGhvcml6b25TaGlmdCArIHB5ICogMC4yNTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4zMiknO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAvLyBIb3Jpem9uIGxpbmVcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8obWFyZ2luLCB2cFkpO1xuICAgICAgY3R4LmxpbmVUbyh3IC0gbWFyZ2luLCB2cFkpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgLy8gVmFuaXNoaW5nIHBvaW50IHBlcnNwZWN0aXZlIHJheXNcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChbNCwgNl0pO1xuICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCAxMjsgcisrKSB7XG4gICAgICAgIGNvbnN0IGFuZyA9IChyIC8gMTIpICogTWF0aC5QSSAqIDI7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh2cFgsIHZwWSk7XG4gICAgICAgIGN0eC5saW5lVG8odnBYICsgTWF0aC5jb3MoYW5nKSAqIHcgKiAwLjcsIHZwWSArIE1hdGguc2luKGFuZykgKiBoICogMC43KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI0Y1OUUwQic7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKHZwWCwgdnBZLCA0LCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH0gZWxzZSBpZiAoY29tcE1vZGUgPT09ICdkZXB0aF9wbGFuZXMnKSB7XG4gICAgICAvLyAzIERlcHRoIFBsYW5lcyAoMS4gUGxhbiAvIDIuIFBsYW4gLyAzLiBQbGFuIEfFgsSZYmkpXG4gICAgICBbXG4gICAgICAgIHsgcmF0aW86IDAuMTQsIGxhYmVsOiAnMy4gUExBTiBUxYFBIChLUkFKT0JSQVogRFJPTkEg4oCUIEfFgcSYQk9LQSBQQVJBTEFLU0EpJywgY29sOiAncmdiYSgxNDgsMTYzLDE4NCwwLjM1KScgfSxcbiAgICAgICAgeyByYXRpbzogMC4wOCwgbGFiZWw6ICcyLiBQTEFOIMWaUk9ES09XWSAoQlJZxYFBIEFSQ0hJVEVLVE9OSUNaTkEgLyBXQVJTWlRBVCknLCBjb2w6ICdyZ2JhKDU2LDE4OSwyNDgsMC40KScgfSxcbiAgICAgIF0uZm9yRWFjaCgocGwpID0+IHtcbiAgICAgICAgY29uc3Qgb3ggPSBtYXJnaW4gKyBmdyAqIHBsLnJhdGlvO1xuICAgICAgICBjb25zdCBveSA9IG1hcmdpbiArIGZoICogcGwucmF0aW87XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHBsLmNvbDtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFs0LCA0XSk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KG94LCBveSwgZncgKiAoMSAtIHBsLnJhdGlvICogMiksIGZoICogKDEgLSBwbC5yYXRpbyAqIDIpKTtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjOTRBM0I4JztcbiAgICAgICAgY3R4LmZvbnQgPSAnNTAwIDlweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dChwbC5sYWJlbCwgb3ggKyA4LCBveSArIDE0KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoY29tcE1vZGUgPT09ICdydWxlX29mX3RoaXJkcycpIHtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAyOyBpKyspIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKG1hcmdpbiArIChmdyAqIGkpIC8gMywgbWFyZ2luKTtcbiAgICAgICAgY3R4LmxpbmVUbyhtYXJnaW4gKyAoZncgKiBpKSAvIDMsIGggLSBtYXJnaW4pO1xuICAgICAgICBjdHgubW92ZVRvKG1hcmdpbiwgbWFyZ2luICsgKGZoICogaSkgLyAzKTtcbiAgICAgICAgY3R4LmxpbmVUbyh3IC0gbWFyZ2luLCBtYXJnaW4gKyAoZmggKiBpKSAvIDMpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyAxMC4gVHJhbnNsdWNlbnQgRnJvc3RlZC1HbGFzcyBTcGF0aWFsIFRlbGVtZXRyeSBQYW5lbHMgSW5zaWRlIFdvcmtzcGFjZVxuICAgIGlmIChjZmcudWlTZXR0aW5ncy5zaG93RmxvYXRpbmdQYW5lbHMgJiYgdyA+IDY4MCkge1xuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGNvbnN0IHBhbmVscyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHg6IG1hcmdpbiArIDE2IC0gcHggKiAwLjI4LFxuICAgICAgICAgIHk6IGggKiAwLjIgLSBweSAqIDAuMjIsXG4gICAgICAgICAgdGl0bGU6ICdQRVJTUEVLVFlXQSBJIEtPTVBPWllDSkEgM0QnLFxuICAgICAgICAgIGxpbmUxOiBgT0dOSVNLT1dBOiAke2ZvdkRlZ33CsCBGT1YgwrcgTUFSR0lORVM6ICR7bWFyZ2lufXB4YCxcbiAgICAgICAgICBsaW5lMjogYFNJQVRLQTogJHtjb21wTW9kZS50b1VwcGVyQ2FzZSgpfSDCtyBET0Y6ICR7TWF0aC5yb3VuZCgoY2ZnLmRlcHRoT2ZGaWVsZEludGVuc2l0eSB8fCAwLjcpICogMTAwKX0lYCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHg6IHcgLSBtYXJnaW4gLSAyMzYgLSBweCAqIDAuMjgsXG4gICAgICAgICAgeTogaCAqIDAuMiAtIHB5ICogMC4yMixcbiAgICAgICAgICB0aXRsZTogJ0xPVCBEUk9ORU0gKOKAnlNQQUNFIFRPIExVS1NVU+KAnSknLFxuICAgICAgICAgIGxpbmUxOiBgS1JBSk9CUkFaOiAke2xhbmRzY2FwZS50b1VwcGVyQ2FzZSgpfWAsXG4gICAgICAgICAgbGluZTI6IGBQVcWBQVA6ICR7Y2ZnLmRyb25lQWx0aXR1ZGVNIHx8IDY1MH1tIMK3IEtMRUpFTklFOiAke2NmZy5ob2JieUFzc2VtYmx5U3RlcCB8fCAxMn0vMTJgLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIHBhbmVscy5mb3JFYWNoKChmcCkgPT4ge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMTUsIDIzLCA0MiwgMC41OCknO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIyKSc7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICBjdHguZmlsbFJlY3QoZnAueCwgZnAueSwgMjIwLCA2NCk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KGZwLngsIGZwLnksIDIyMCwgNjQpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMzOEJERjgnO1xuICAgICAgICBjdHguZm9udCA9ICc2MDAgMTBweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dChmcC50aXRsZSwgZnAueCArIDEwLCBmcC55ICsgMTgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNGOEZBRkMnO1xuICAgICAgICBjdHguZm9udCA9ICc1MDAgMTBweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dChmcC5saW5lMSwgZnAueCArIDEwLCBmcC55ICsgMzYpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNDQkQ1RTEnO1xuICAgICAgICBjdHguZmlsbFRleHQoZnAubGluZTIsIGZwLnggKyAxMCwgZnAueSArIDUyKTtcbiAgICAgIH0pO1xuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9XG5cbiAgICBjdHguZ2xvYmFsQWxwaGEgPSAxLjA7XG4gICAgZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJGcmFtZSk7XG4gIH07XG5cbiAgZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJGcmFtZSk7XG5cbiAgcmV0dXJuICgpID0+IHtcbiAgICBpc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZUlkKTtcbiAgICBpZiAocmVzaXplT2JzZXJ2ZXIpIHJlc2l6ZU9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IEhvbG9ncmFtVmlld3BvcnQzRDogUmVhY3QuRkM8SG9sb2dyYW1WaWV3cG9ydDNEUHJvcHM+ID0gKHtcbiAgY29uZmlnLFxuICBvblVwZGF0ZUNvbmZpZyxcbiAgb25DYXB0dXJlU2NyZWVuc2hvdCxcbiAgb25FeHBvcnRNZXNzYWdlLFxufSkgPT4ge1xuICBjb25zdCBjYW52YXNNb3VudFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYnVpbGRpbmdHcm91cFJlZiA9IHVzZVJlZjxUSFJFRS5Hcm91cCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGNvbmZpZ1JlZiA9IHVzZVJlZjxBUkNvbmZpZ1N0YXRlPihjb25maWcpO1xuICBjb25maWdSZWYuY3VycmVudCA9IGNvbmZpZztcblxuICBjb25zdCBwb2ludGVyU3RhdGVSZWYgPSB1c2VSZWYoe1xuICAgIGlzRHJhZ2dpbmc6IGZhbHNlLFxuICAgIGxhc3RYOiAwLFxuICAgIGxhc3RZOiAwLFxuICAgIHBhcmFsbGF4WDogMCxcbiAgICBwYXJhbGxheFk6IDAsXG4gICAgY2FtZXJhT3JiaXRBbmdsZTogMC4zNSxcbiAgICBjYW1lcmFFbGV2YXRpb246IDIuMzUsXG4gICAgdHJhbnNpdGlvblNjYWxlOiAwLjAxLFxuICB9KTtcblxuICBjb25zdCBbZG9ja0NvbGxhcHNlZCwgc2V0RG9ja0NvbGxhcHNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0Z1bGxzY3JlZW5CbGVlZCwgc2V0SXNGdWxsc2NyZWVuQmxlZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd1JlZmVyZW5jZUNvbXBhcmlzb24sIHNldFNob3dSZWZlcmVuY2VDb21wYXJpc29uXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBhY3RpdmVTY2VuZU1ldGEgPVxuICAgIEFSQ0hJVEVDVFVSQUxfU0NFTkVTLmZpbmQoKHMpID0+IHMuaWQgPT09IGNvbmZpZy5zY2VuZUlkKSB8fCBBUkNISVRFQ1RVUkFMX1NDRU5FU1swXTtcbiAgY29uc3QgYWN0aXZlUGFsZXR0ZSA9IEhPTE9HUkFNX1BBTEVUVEVTW2NvbmZpZy51aVNldHRpbmdzLnBhbGV0dGVdO1xuXG4gIC8vIE1vdW50IEhpZ2gtUHJlY2lzaW9uIDNEIEhvbG9ncmFtICYgU3BhdGlhbCBBZ2VudCBFbmdpbmUgT25jZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNhbnZhc01vdW50UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcblxuICAgIGJ1aWxkaW5nR3JvdXBSZWYuY3VycmVudCA9IGJ1aWxkQXJjaGl0ZWN0dXJhbFNjZW5lR3JvdXAoXG4gICAgICBjb25maWdSZWYuY3VycmVudC5zY2VuZUlkLFxuICAgICAgYWN0aXZlUGFsZXR0ZS5wcmltYXJ5SGV4LFxuICAgICAgYWN0aXZlUGFsZXR0ZS5zZWNvbmRhcnlIZXgsXG4gICAgICBjb25maWdSZWYuY3VycmVudC53aXJlZnJhbWVPdmVybGF5LFxuICAgICAgY29uZmlnUmVmLmN1cnJlbnQudG93ZXJIZWlnaHRNdWx0aXBsaWVyIHx8IDEuMFxuICAgICk7XG5cbiAgICByZXR1cm4gc3RhcnRIb2xvZ3JhbTNERW5naW5lKFxuICAgICAgY29udGFpbmVyLFxuICAgICAgY29uZmlnUmVmLFxuICAgICAgcG9pbnRlclN0YXRlUmVmLFxuICAgICAgYnVpbGRpbmdHcm91cFJlZixcbiAgICAgIGNhbnZhc1JlZlxuICAgICk7XG4gIH0sIFtdKTtcblxuICAvLyBSZWJ1aWxkIDNEIE1lc2ggR3JvdXAgd2hlbmV2ZXIgc2NlbmVJZCwgcGFsZXR0ZSwgd2lyZWZyYW1lLCBvciB0b3dlckhlaWdodE11bHRpcGxpZXIgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG5leHRHcm91cCA9IGJ1aWxkQXJjaGl0ZWN0dXJhbFNjZW5lR3JvdXAoXG4gICAgICBjb25maWcuc2NlbmVJZCxcbiAgICAgIGFjdGl2ZVBhbGV0dGUucHJpbWFyeUhleCxcbiAgICAgIGFjdGl2ZVBhbGV0dGUuc2Vjb25kYXJ5SGV4LFxuICAgICAgY29uZmlnLndpcmVmcmFtZU92ZXJsYXksXG4gICAgICBjb25maWcudG93ZXJIZWlnaHRNdWx0aXBsaWVyIHx8IDEuMFxuICAgICk7XG4gICAgbmV4dEdyb3VwLnJvdGF0aW9uLnkgPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoY29uZmlnLm1vZGVsUm90YXRpb25ZKTtcbiAgICBwb2ludGVyU3RhdGVSZWYuY3VycmVudC50cmFuc2l0aW9uU2NhbGUgPSAwLjI1O1xuICAgIGJ1aWxkaW5nR3JvdXBSZWYuY3VycmVudCA9IG5leHRHcm91cDtcbiAgfSwgW1xuICAgIGNvbmZpZy5zY2VuZUlkLFxuICAgIGNvbmZpZy51aVNldHRpbmdzLnBhbGV0dGUsXG4gICAgY29uZmlnLndpcmVmcmFtZU92ZXJsYXksXG4gICAgY29uZmlnLnRvd2VySGVpZ2h0TXVsdGlwbGllcixcbiAgXSk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZTogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgIHBvaW50ZXJTdGF0ZVJlZi5jdXJyZW50LmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAgIHBvaW50ZXJTdGF0ZVJlZi5jdXJyZW50Lmxhc3RYID0gZS5jbGllbnRYO1xuICAgIHBvaW50ZXJTdGF0ZVJlZi5jdXJyZW50Lmxhc3RZID0gZS5jbGllbnRZO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gKGU6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCByZWN0ID0gZS5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IG5vcm1YID0gKChlLmNsaWVudFggLSByZWN0LmxlZnQpIC8gcmVjdC53aWR0aCAtIDAuNSkgKiAyO1xuICAgIGNvbnN0IG5vcm1ZID0gLSgoZS5jbGllbnRZIC0gcmVjdC50b3ApIC8gcmVjdC5oZWlnaHQgLSAwLjUpICogMjtcbiAgICBwb2ludGVyU3RhdGVSZWYuY3VycmVudC5wYXJhbGxheFggPSBub3JtWDtcbiAgICBwb2ludGVyU3RhdGVSZWYuY3VycmVudC5wYXJhbGxheFkgPSBub3JtWTtcblxuICAgIGlmIChwb2ludGVyU3RhdGVSZWYuY3VycmVudC5pc0RyYWdnaW5nKSB7XG4gICAgICBjb25zdCBkeCA9IGUuY2xpZW50WCAtIHBvaW50ZXJTdGF0ZVJlZi5jdXJyZW50Lmxhc3RYO1xuICAgICAgY29uc3QgZHkgPSBlLmNsaWVudFkgLSBwb2ludGVyU3RhdGVSZWYuY3VycmVudC5sYXN0WTtcbiAgICAgIHBvaW50ZXJTdGF0ZVJlZi5jdXJyZW50Lmxhc3RYID0gZS5jbGllbnRYO1xuICAgICAgcG9pbnRlclN0YXRlUmVmLmN1cnJlbnQubGFzdFkgPSBlLmNsaWVudFk7XG5cbiAgICAgIGNvbnN0IG5leHRSb3QgPSAoY29uZmlnLm1vZGVsUm90YXRpb25ZICsgZHggKiAwLjY1KSAlIDM2MDtcbiAgICAgIG9uVXBkYXRlQ29uZmlnKHsgbW9kZWxSb3RhdGlvblk6IE1hdGgucm91bmQobmV4dFJvdCksIGF1dG9Sb3RhdGU6IGZhbHNlIH0pO1xuXG4gICAgICBwb2ludGVyU3RhdGVSZWYuY3VycmVudC5jYW1lcmFFbGV2YXRpb24gPSBUSFJFRS5NYXRoVXRpbHMuY2xhbXAoXG4gICAgICAgIHBvaW50ZXJTdGF0ZVJlZi5jdXJyZW50LmNhbWVyYUVsZXZhdGlvbiArIGR5ICogMC4wMSxcbiAgICAgICAgMC42NSxcbiAgICAgICAgNC4yXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyVXAgPSAoKSA9PiB7XG4gICAgcG9pbnRlclN0YXRlUmVmLmN1cnJlbnQuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVdoZWVsID0gKGU6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3Qgc2NhbGVEZWx0YSA9IGUuZGVsdGFZID4gMCA/IC0wLjA4IDogMC4wODtcbiAgICBjb25zdCBuZXh0U2NhbGUgPSBUSFJFRS5NYXRoVXRpbHMuY2xhbXAoXG4gICAgICBOdW1iZXIoKGNvbmZpZy5tb2RlbFNjYWxlICsgc2NhbGVEZWx0YSkudG9GaXhlZCgyKSksXG4gICAgICAwLjQsXG4gICAgICAyLjJcbiAgICApO1xuICAgIG9uVXBkYXRlQ29uZmlnKHsgbW9kZWxTY2FsZTogbmV4dFNjYWxlIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNjcmVlbnNob3RDYXB0dXJlID0gKCkgPT4ge1xuICAgIGlmICghY2FudmFzUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBkYXRhVXJsID0gY2FudmFzUmVmLmN1cnJlbnQudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICBpZiAoIWRhdGFVcmwpIHJldHVybjtcbiAgICBvbkNhcHR1cmVTY3JlZW5zaG90KGRhdGFVcmwsIGNvbmZpZy5jdXN0b21TY2VuZVRpdGxlIHx8IGFjdGl2ZVNjZW5lTWV0YS5uYW1lKTtcblxuICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgbGluay5ocmVmID0gZGF0YVVybDtcbiAgICBsaW5rLmRvd25sb2FkID0gYEhvbG9BcmNoX0FSXyR7Y29uZmlnLnNjZW5lSWR9XyR7RGF0ZS5ub3coKX0ucG5nYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgIG9uRXhwb3J0TWVzc2FnZSgnWnJ6dXQgZWtyYW51IEFSIHphcGlzYW55IGJlenBvxZtyZWRuaW8gZG8gZ2FsZXJpaSB1cnrEhWR6ZW5pYSAoLlBORyknKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVFeHBvcnRPQkogPSAoKSA9PiB7XG4gICAgaWYgKCFidWlsZGluZ0dyb3VwUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBjb25zdCBzdGF0cyA9IGV4cG9ydEdyb3VwVG9PQkooYnVpbGRpbmdHcm91cFJlZi5jdXJyZW50LCBgSG9sb0FyY2hfJHtjb25maWcuc2NlbmVJZH0ub2JqYCk7XG4gICAgb25FeHBvcnRNZXNzYWdlKFxuICAgICAgYFd5ZWtzcG9ydG93YW5vIG1vZGVsIDNEIGRvIC5PQkogKCR7c3RhdHMudmVydGV4Q291bnR9IHdpZXJ6Y2hvxYJrw7N3LCAke3N0YXRzLmZhY2VDb3VudH0gxZtjaWFuKWBcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydFNUTCA9ICgpID0+IHtcbiAgICBpZiAoIWJ1aWxkaW5nR3JvdXBSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGNvbnN0IHN0YXRzID0gZXhwb3J0R3JvdXBUb1NUTChidWlsZGluZ0dyb3VwUmVmLmN1cnJlbnQsIGBIb2xvQXJjaF8ke2NvbmZpZy5zY2VuZUlkfS5zdGxgKTtcbiAgICBvbkV4cG9ydE1lc3NhZ2UoXG4gICAgICBgV3lla3Nwb3J0b3dhbm8gYnJ5xYLEmSBkbyAuU1RMICgke3N0YXRzLnRyaWFuZ2xlQ291bnR9IHRyw7Nqa8SFdMOzdyBnb3Rvd3ljaCBkbyBkcnVrdSAzRCAvIENBRClgXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgIGlzRnVsbHNjcmVlbkJsZWVkXG4gICAgICAgICAgPyAnZml4ZWQgaW5zZXQtMCB6LTUwIHctc2NyZWVuIGgtc2NyZWVuIGJnLVsjMDcwQjEyXSBzZWxlY3Qtbm9uZSBvdmVyZmxvdy1oaWRkZW4nXG4gICAgICAgICAgOiAncmVsYXRpdmUgdy1mdWxsIGgtWzYyMHB4XSBsZzpoLVs2ODBweF0gcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgYmctWyMwNzBCMTJdIHNlbGVjdC1ub25lJ1xuICAgICAgfVxuICAgID5cbiAgICAgIHsvKiBEZWRpY2F0ZWQgSXNvbGF0ZWQgM0QgQ2FudmFzIE1vdW50ICovfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2NhbnZhc01vdW50UmVmfVxuICAgICAgICBvblBvaW50ZXJEb3duPXtoYW5kbGVQb2ludGVyRG93bn1cbiAgICAgICAgb25Qb2ludGVyTW92ZT17aGFuZGxlUG9pbnRlck1vdmV9XG4gICAgICAgIG9uUG9pbnRlclVwPXtoYW5kbGVQb2ludGVyVXB9XG4gICAgICAgIG9uUG9pbnRlckxlYXZlPXtoYW5kbGVQb2ludGVyVXB9XG4gICAgICAgIG9uV2hlZWw9e2hhbmRsZVdoZWVsfVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGN1cnNvci1ncmFiIGFjdGl2ZTpjdXJzb3ItZ3JhYmJpbmdcIlxuICAgICAgLz5cblxuICAgICAgey8qIE9wdGlvbmFsIFJlZmVyZW5jZSBJbWFnZSBTcGxpdC9PdmVybGF5IENvbXBhcmlzb24gKi99XG4gICAgICB7c2hvd1JlZmVyZW5jZUNvbXBhcmlzb24gJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0yMCBwb2ludGVyLWV2ZW50cy1ub25lIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLWJsYWNrLzc1IHAtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsIHctZnVsbCBiZy1bIzBCMEYxN10gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gc2hhZG93LTJ4bCBwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC00IHB5LTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgV2l6dWFsaXphY2phIFJlZmVyZW5jeWpuYSBTdG/FgnUgSG9sb2dyYWZpY3puZWdvIEFSXG4gICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICBXem9yemVjIG/Fm3dpZXRsZW5pYSDFm3JvZG93aXNrb3dlZ28sIG1hcHkgYmxhdHUsIGhvbG9ncmFtdSB3eXNva2/Fm2Npb3djw7N3IGkgcGFuZWxpXG4gICAgICAgICAgICAgICAgICBwcnplc3RyemVubnljaFxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UmVmZXJlbmNlQ29tcGFyaXNvbihmYWxzZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgWmFta25paiBwb2RnbMSFZFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICBzcmM9XCIvYXNzZXRzL2Fpc3R1ZGlvL0Rhc2hib2FyZF9kZXhfZWVmZmNiYzcuanBnXCJcbiAgICAgICAgICAgICAgYWx0PVwiUmVmZXJlbmN5am55IGhvbG9ncmFtIGFyY2hpdGVrdG9uaWN6bnkgbmEgc3RvbGUga29uZmVyZW5jeWpueW1cIlxuICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGgtYXV0byBtYXgtaC1bNDQwcHhdIG9iamVjdC1jb3ZlclwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBNaW5pbWFsIFRvcC1MZWZ0IFNjZW5lIFNwZWMgSGVhZGVyIChUcmFuc2x1Y2VudCBGcm9zdGVkIEdsYXNzKSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTYgbGVmdC02IHJpZ2h0LTYgei0xMCBmbGV4IGZsZXgtd3JhcCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC81NSBiYWNrZHJvcC1ibHVyLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTUgcm91bmRlZC14bCBweC00IHB5LTIuNSBwb2ludGVyLWV2ZW50cy1hdXRvIG1heC13LW1kIHNoYWRvdy0yeGxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgdGV4dC1jeWFuLTMwMCBmb250LW1vbm8gdGFidWxhci1udW1zXCI+XG4gICAgICAgICAgICA8c3Bhbj5GT1Yge2NvbmZpZy5wZXJzcGVjdGl2ZUZvdkRlZyB8fCA2Mn3CsDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+U2thbGEge2NvbmZpZy5tb2RlbFNjYWxlLnRvRml4ZWQoMil9eDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIHtNYXRoLnJvdW5kKGFjdGl2ZVNjZW5lTWV0YS5yZWFsV29ybGRIZWlnaHRNICogKGNvbmZpZy50b3dlckhlaWdodE11bHRpcGxpZXIgfHwgMSkpfSBtXG4gICAgICAgICAgICAgIHd5cy5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodCBtdC0wLjVcIj5cbiAgICAgICAgICAgIHtjb25maWcuY3VzdG9tU2NlbmVUaXRsZSB8fCBhY3RpdmVTY2VuZU1ldGEubmFtZX1cbiAgICAgICAgICA8L2gyPlxuICAgICAgICAgIHtjb25maWcudWlTZXR0aW5ncy5odWREZW5zaXR5ID09PSAnZGV0YWlsZWQnICYmIChcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbXQtMSBsaW5lLWNsYW1wLTFcIj57YWN0aXZlU2NlbmVNZXRhLnN1YnRpdGxlfTwvcD5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMiBwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25VcGRhdGVDb25maWcoeyBzaG93U3BhdGlhbEFnZW50czogIWNvbmZpZy5zaG93U3BhdGlhbEFnZW50cyB9KX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLWxnIGJvcmRlciBiYWNrZHJvcC1ibHVyLXhsIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgIGNvbmZpZy5zaG93U3BhdGlhbEFnZW50c1xuICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNTAwLzIwIGJvcmRlci1lbWVyYWxkLTQwMC83MCB0ZXh0LWVtZXJhbGQtMjAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC81NSBib3JkZXItd2hpdGUvMTUgdGV4dC1zbGF0ZS0yMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPVwiV8WCxIVjeiBsdWIgd3nFgsSFY3ogYXV0b25vbWljem55Y2ggYWdlbnTDs3cgQUkgcG9ydXN6YWrEhWN5Y2ggc2nEmSBwbyBzaWF0Y2UgTmF2TWVzaCAzRFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEJvdCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5BZ2VuY2kgM0Q6IHtjb25maWcuc2hvd1NwYXRpYWxBZ2VudHMgPyAnQUtUWVdOSScgOiAnV3nFgi4nfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcC0xIGJnLXNsYXRlLTk1MC81NSBiYWNrZHJvcC1ibHVyLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTUgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgICAge0FSQ0hJVEVDVFVSQUxfU0NFTkVTLm1hcCgoc2NlbmUsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXtzY2VuZS5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblVwZGF0ZUNvbmZpZyh7IHNjZW5lSWQ6IHNjZW5lLmlkLCBjdXN0b21TY2VuZVRpdGxlOiB1bmRlZmluZWQgfSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLW1kIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICBjb25maWcuc2NlbmVJZCA9PT0gc2NlbmUuaWRcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi01MDAgdGV4dC1zbGF0ZS05NTAgZm9udC1zZW1pYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0yMDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy13aGl0ZS8xMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFNjZW5hIDB7aWR4ICsgMX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dSZWZlcmVuY2VDb21wYXJpc29uKCh2KSA9PiAhdil9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJnLXNsYXRlLTk1MC81NSBiYWNrZHJvcC1ibHVyLXhsIGhvdmVyOmJnLXNsYXRlLTkwMC84MCB0ZXh0LXNsYXRlLTEwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzE1IHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgdGl0bGU9XCJQb3LDs3duYWogeiBvYnJhemVtIHJlZmVyZW5jeWpueW0gc3RvxYJ1IEFSXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+V3pvcnplYyBBUjwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzRnVsbHNjcmVlbkJsZWVkKCh2KSA9PiAhdil9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJnLXNsYXRlLTk1MC81NSBiYWNrZHJvcC1ibHVyLXhsIGhvdmVyOmJnLXNsYXRlLTkwMC84MCB0ZXh0LXNsYXRlLTEwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzE1IHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgdGl0bGU9XCJQcnplxYLEhWN6IHBlxYJub2VrcmFub3d5IHdpZG9rIDEwMHZ3IHggMTAwdmhcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0Z1bGxzY3JlZW5CbGVlZCA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8TWluaW1pemUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5aYW1rbmlqIDEwMHZoPC9zcGFuPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPE1heGltaXplMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj4xMDB2dyDDlyAxMDB2aDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVW5pZmllZCBDb2xsYXBzaWJsZSBCb3R0b20gQ29udHJvbCBEb2NrIChUcmFuc2x1Y2VudCBHbGFzcyA8PSAxNSUgVmlld3BvcnQgRm9vdHByaW50KSAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBib3R0b20tNiB6LTEwIHctWzkyJV0gbWF4LXctWzk0MHB4XSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0yMDBcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHRyYW5zZm9ybTogZG9ja0NvbGxhcHNlZFxuICAgICAgICAgICAgPyAndHJhbnNsYXRlKC01MCUsIGNhbGMoMTAwJSAtIDM0cHgpKSdcbiAgICAgICAgICAgIDogJ3RyYW5zbGF0ZSgtNTAlLCAwKScsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWNlbnRlciBtYi0xXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RG9ja0NvbGxhcHNlZCgoYykgPT4gIWMpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zLjUgcHktMSB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJnLXNsYXRlLTk1MC82NSBiYWNrZHJvcC1ibHVyLXhsIHRleHQtc2xhdGUtMjAwIGhvdmVyOnRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci13aGl0ZS8xNSByb3VuZGVkLXQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtkb2NrQ29sbGFwc2VkID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxDaGV2cm9uVXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UG9rYcW8IHN6a2xhbnkgZG9rIHBhcmFtZXRyw7N3IEFSPC9zcGFuPlxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPENoZXZyb25Eb3duIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlVrcnlqIGRvayBIVUQgKEN6eXN0eSBLYWRyIFBhcmFsYWtzeSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvNjAgYmFja2Ryb3AtYmx1ci14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzE1IHJvdW5kZWQteGwgcC0zLjUgc2hhZG93LTJ4bFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMTIgZ2FwLTQgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1kOmNvbC1zcGFuLTggZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8TWF4aW1pemUyIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIFNrYWxhIChQaW5jaClcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgdGV4dC1jeWFuLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICB7Y29uZmlnLm1vZGVsU2NhbGUudG9GaXhlZCgyKX14XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgbWluPXswLjR9XG4gICAgICAgICAgICAgICAgICBtYXg9ezIuMn1cbiAgICAgICAgICAgICAgICAgIHN0ZXA9ezAuMDV9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uZmlnLm1vZGVsU2NhbGV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uVXBkYXRlQ29uZmlnKHsgbW9kZWxTY2FsZTogcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWN5YW4tNDAwIGN1cnNvci1wb2ludGVyIGgtMS41IGJnLXNsYXRlLTgwMCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICBXYXJzdHd5IDNEXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtYW1iZXItNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtNYXRoLnJvdW5kKGNvbmZpZy5leHBsb2RlZFZpZXdGYWN0b3IgKiAxMDApfSVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICBtaW49ezB9XG4gICAgICAgICAgICAgICAgICBtYXg9ezF9XG4gICAgICAgICAgICAgICAgICBzdGVwPXswLjA1fVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy5leHBsb2RlZFZpZXdGYWN0b3J9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHsgZXhwbG9kZWRWaWV3RmFjdG9yOiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1hbWJlci00MDAgY3Vyc29yLXBvaW50ZXIgaC0xLjUgYmctc2xhdGUtODAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTbGlkZXJzIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIFBhcmFsYWtzYSA2RG9GXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtY3lhbi00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAge01hdGgucm91bmQoY29uZmlnLnBhcmFsbGF4SW50ZW5zaXR5ICogMTAwKX0lXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgbWluPXswfVxuICAgICAgICAgICAgICAgICAgbWF4PXsxfVxuICAgICAgICAgICAgICAgICAgc3RlcD17MC4wNX1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjb25maWcucGFyYWxsYXhJbnRlbnNpdHl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHsgcGFyYWxsYXhJbnRlbnNpdHk6IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpIH0pXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYWNjZW50LWN5YW4tNDAwIGN1cnNvci1wb2ludGVyIGgtMS41IGJnLXNsYXRlLTgwMCByb3VuZGVkLWxnXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIEN6xIVzdGVjemtpIG9raWVuXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtYW1iZXItNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtNYXRoLnJvdW5kKGNvbmZpZy53aW5kb3dQYXJ0aWNsZXNJbnRlbnNpdHkgKiAxMDApfSVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICBtaW49ezB9XG4gICAgICAgICAgICAgICAgICBtYXg9ezF9XG4gICAgICAgICAgICAgICAgICBzdGVwPXswLjA1fVxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2NvbmZpZy53aW5kb3dQYXJ0aWNsZXNJbnRlbnNpdHl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHsgd2luZG93UGFydGljbGVzSW50ZW5zaXR5OiBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSB9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGFjY2VudC1hbWJlci00MDAgY3Vyc29yLXBvaW50ZXIgaC0xLjUgYmctc2xhdGUtODAwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tNCBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNjcmVlbnNob3RDYXB0dXJlfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1jeWFuLTUwMCBob3ZlcjpiZy1jeWFuLTQwMCB0ZXh0LXNsYXRlLTk1MCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIlphcGlzeiB6cnp1dCBla3JhbnUgaG9sb2dyYW11IGJlenBvxZtyZWRuaW8gZG8gZ2FsZXJpaSB1cnrEhWR6ZW5pYVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Q2FtZXJhIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5acnp1dCBkbyBnYWxlcmlpPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhwb3J0T0JKfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTIuNSBweS0yIHRleHQteHMgZm9udC1tZWRpdW0gYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIkVrc3BvcnR1aiBzaWF0a8SZIGJ1ZHlua3UgZG8gZm9ybWF0dSBXYXZlZnJvbnQgLk9CSlwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+Lk9CSjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUV4cG9ydFNUTH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBweC0yLjUgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJFa3Nwb3J0dWogYnJ5xYLEmSBhcmNoaXRla3Rvbmljem7EhSBkbyBmb3JtYXR1IGRydWt1IDNEIC5TVExcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj4uU1RMPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgIG9uVXBkYXRlQ29uZmlnKHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxTY2FsZTogMS4wLFxuICAgICAgICAgICAgICAgICAgICB0b3dlckhlaWdodE11bHRpcGxpZXI6IDEuMCxcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxSb3RhdGlvblk6IDI1LFxuICAgICAgICAgICAgICAgICAgICBleHBsb2RlZFZpZXdGYWN0b3I6IDAsXG4gICAgICAgICAgICAgICAgICAgIGF1dG9Sb3RhdGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgdGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS04MDAvODAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiUmVzZXR1aiBwb3p5Y2rEmSBpIHNrYWzEmSBtb2RlbHVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFJvdGF0ZUNjdyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19