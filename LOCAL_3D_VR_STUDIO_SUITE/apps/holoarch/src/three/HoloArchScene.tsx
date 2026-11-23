const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport5_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/holoarch/node_modules/.vite/deps/react.js?v=50682de0";
import * as THREE from "/apps/holoarch/node_modules/.vite/deps/three.js?v=50682de0";
import { OrbitControls } from "/apps/holoarch/node_modules/.vite/deps/three_addons_controls_OrbitControls__js.js?v=50682de0";
import { RoomEnvironment } from "/apps/holoarch/node_modules/.vite/deps/three_addons_environments_RoomEnvironment__js.js?v=50682de0";
import { createArchitecturalFacadeTexture, createDiagridFacadeTexture, createFloatingHudTexture, createLiDARPlaneGridTexture, createSmartTabletTexture, createWorldMapTableTexture } from "/apps/holoarch/src/three/proceduralTextures.ts";
var _jsxFileName = "/app/applet/src/three/HoloArchScene.tsx";
import __vite__cjsImport5_react_jsxDevRuntime from "/apps/holoarch/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=50682de0";
// Pre-allocated math helpers outside the animation loop (Zero GC)
const _targetCamPos = new THREE.Vector3();
const _targetLookAt = new THREE.Vector3();
const _pointerNdc = new THREE.Vector2();
const _dummyMatrixObj = new THREE.Object3D();
const _subTargetPos = new THREE.Vector3();
const _subTargetScale = new THREE.Vector3();
const _windDirVec = new THREE.Vector3();
const _windUpAxis = new THREE.Vector3(0, 1, 0);
// Pre-allocated Day vs. Night Mode (Electric Blue & Deep Violet) color palette constants (Zero GC)
const _colBgDay = new THREE.Color(396051);
const _colBgNight = new THREE.Color(131338);
const _colFogDay = new THREE.Color(528670);
const _colFogNight = new THREE.Color(393750);
const _colSunDay = new THREE.Color(16757867);
const _colSunNight = new THREE.Color(6514417);
const _colHemiSkyDay = new THREE.Color(3718648);
const _colHemiSkyNight = new THREE.Color(58879);
const _colHemiGroundDay = new THREE.Color(1973016);
const _colHemiGroundNight = new THREE.Color(1771318);
const _colTableCyanDay = new THREE.Color(58879);
const _colTableCyanNight = new THREE.Color(61695);
const _colTableAccentDay = new THREE.Color(16498468);
const _colTableAccentNight = new THREE.Color(9647082);
const _colCoreDay = new THREE.Color(16498468);
const _colCoreNight = new THREE.Color(12616956);
const _colCoreEmissiveDay = new THREE.Color(16096779);
const _colCoreEmissiveNight = new THREE.Color(8141549);
const _colWireDay = new THREE.Color(8246268);
const _colWireNight = new THREE.Color(62975);
const _colSlabDay = new THREE.Color(3718648);
const _colSlabNight = new THREE.Color(9133302);
const _colShellHoloDay = new THREE.Color(3718648);
const _colShellHoloNight = new THREE.Color(61695);
const _colShellEmissiveDay = new THREE.Color(959977);
const _colShellEmissiveNight = new THREE.Color(7153881);
const _colLedDay = new THREE.Color(16639626);
const _colLedNight = new THREE.Color(11032055);
const _colMapEmissiveDay = new THREE.Color(16777215);
const _colMapEmissiveNight = new THREE.Color(10859772);
const _colFloorDay = new THREE.Color(1450030);
const _colFloorNight = new THREE.Color(526102);
const _colSilhouetteEmissiveDay = new THREE.Color(988970);
const _colSilhouetteEmissiveNight = new THREE.Color(3868516);
const CAMERA_PRESETS = {
	overview: {
		pos: [
			0,
			1.48,
			3.65
		],
		target: [
			0,
			.52,
			-.2
		]
	},
	tabletop_close: {
		pos: [
			.35,
			1.02,
			2.25
		],
		target: [
			0,
			.55,
			0
		]
	},
	window_parallax: {
		pos: [
			-1.45,
			.92,
			2.85
		],
		target: [
			.25,
			.68,
			-1.2
		]
	},
	floor_lidar: {
		pos: [
			2.15,
			1.85,
			3.45
		],
		target: [
			0,
			.15,
			-.3
		]
	}
};
function getShadowQualityConfig(quality) {
	switch (quality) {
		case "Niska (512×512 · Mobile Fast)": return {
			mapSize: 512,
			radius: 2.2,
			bias: -8e-4,
			normalBias: .03
		};
		case "Średnia (1024×1024 · Standard AR)": return {
			mapSize: 1024,
			radius: 1.4,
			bias: -5e-4,
			normalBias: .022
		};
		case "Ultra (4096×4096 · Studio BIM)": return {
			mapSize: 4096,
			radius: .6,
			bias: -2e-4,
			normalBias: .01
		};
		case "Wysoka (2048×2048 · Crisp PCF)":
		default: return {
			mapSize: 2048,
			radius: 1,
			bias: -35e-5,
			normalBias: .016
		};
	}
}
export const HoloArchScene = ({ config, onSelectBuilding, onSelectSubModel, onSelectHudScreen, onUpdateMetrics }) => {
	const canvasMountRef = useRef(null);
	const configRef = useRef(config);
	const onSelectRef = useRef(onSelectBuilding);
	const onSelectSubModelRef = useRef(onSelectSubModel);
	const onSelectHudRef = useRef(onSelectHudScreen);
	const onMetricsRef = useRef(onUpdateMetrics);
	useEffect(() => {
		configRef.current = config;
	}, [config]);
	useEffect(() => {
		onSelectRef.current = onSelectBuilding;
	}, [onSelectBuilding]);
	useEffect(() => {
		onSelectSubModelRef.current = onSelectSubModel;
	}, [onSelectSubModel]);
	useEffect(() => {
		onSelectHudRef.current = onSelectHudScreen;
	}, [onSelectHudScreen]);
	useEffect(() => {
		onMetricsRef.current = onUpdateMetrics;
	}, [onUpdateMetrics]);
	useEffect(() => {
		const container = canvasMountRef.current;
		if (!container) return;
		// 1. Software WebGL Guard (Three.js r160+ Best Practice)
		const isSoftwareGl = (() => {
			const gl = document.createElement("canvas").getContext("webgl2");
			if (!gl) return true;
			const ext = gl.getExtension("WEBGL_debug_renderer_info");
			const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
			const gpu = String(gl.getParameter(param));
			gl.getExtension("WEBGL_lose_context")?.loseContext();
			return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
		})();
		const width = container.clientWidth || window.innerWidth;
		const height = container.clientHeight || window.innerHeight;
		let currentShadowsEnabled = configRef.current.enableBuildingShadows ?? true;
		let currentShadowQuality = configRef.current.shadowMapQuality || "Wysoka (2048×2048 · Crisp PCF)";
		const initialShadowParams = getShadowQualityConfig(currentShadowQuality);
		const renderer = new THREE.WebGLRenderer({
			antialias: !isSoftwareGl,
			powerPreference: "high-performance"
		});
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.15;
		renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = !isSoftwareGl && currentShadowsEnabled;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		container.innerHTML = "";
		container.appendChild(renderer.domElement);
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(396051);
		const atmosphericFog = new THREE.FogExp2(528670, configRef.current.enableAtmosphericFog ? .065 : 0);
		scene.fog = atmosphericFog;
		// 2. Mandatory Studio Environment Reflection (RoomEnvironment)
		const pmremGenerator = new THREE.PMREMGenerator(renderer);
		scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), .04).texture;
		pmremGenerator.dispose();
		const camera = new THREE.PerspectiveCamera(46, width / height, .1, 60);
		camera.position.set(0, 1.48, 3.65);
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.target.set(0, .52, -.2);
		controls.enableDamping = !isSoftwareGl;
		controls.dampingFactor = .06;
		controls.maxPolarAngle = Math.PI * .56;
		controls.minDistance = 1.4;
		controls.maxDistance = 6.8;
		let userDragging = false;
		let activePresetTransition = false;
		let lastPreset = configRef.current.cameraPreset;
		let lastBuildingLayout = configRef.current.buildingLayout;
		let layoutTransitionProgress = 1;
		controls.addEventListener("start", () => {
			userDragging = true;
			activePresetTransition = false;
		});
		controls.addEventListener("end", () => {
			userDragging = false;
		});
		const maxAniso = renderer.capabilities.getMaxAnisotropy();
		// 3. Studio & Environmental Lighting Rig
		const hemiLight = new THREE.HemisphereLight(3718648, 1973016, .75);
		scene.add(hemiLight);
		// Warm golden sunset key light entering through the arched windows (casts building shadows onto virtual floor & tabletop)
		const sunKeyLight = new THREE.DirectionalLight(16757867, 1.85);
		sunKeyLight.position.set(2.2, 3.8, -4.2);
		sunKeyLight.castShadow = !isSoftwareGl && currentShadowsEnabled;
		sunKeyLight.shadow.mapSize.set(initialShadowParams.mapSize, initialShadowParams.mapSize);
		sunKeyLight.shadow.radius = initialShadowParams.radius;
		sunKeyLight.shadow.camera.near = .5;
		sunKeyLight.shadow.camera.far = 16;
		const d = 4.6;
		sunKeyLight.shadow.camera.left = -d;
		sunKeyLight.shadow.camera.right = d;
		sunKeyLight.shadow.camera.top = d;
		sunKeyLight.shadow.camera.bottom = -d;
		sunKeyLight.shadow.bias = initialShadowParams.bias;
		sunKeyLight.shadow.normalBias = initialShadowParams.normalBias;
		scene.add(sunKeyLight);
		// Holographic table upward cyan fill light
		const tableCyanLight = new THREE.PointLight(58879, 2.4, 5.5);
		tableCyanLight.position.set(0, .45, 0);
		scene.add(tableCyanLight);
		const tableGoldLight = new THREE.PointLight(16498468, 1.5, 4);
		tableGoldLight.position.set(0, .9, 0);
		scene.add(tableGoldLight);
		// 4. Room Floor & ARKit/ARCore Floor Surface Plane Detection (Y = -0.82)
		const floorY = -.82;
		const floorGeo = new THREE.PlaneGeometry(16, 14);
		const floorMat = new THREE.MeshStandardMaterial({
			color: 1450030,
			roughness: .3,
			metalness: .42
		});
		const floorMesh = new THREE.Mesh(floorGeo, floorMat);
		floorMesh.rotation.x = -Math.PI / 2;
		floorMesh.position.y = floorY;
		floorMesh.receiveShadow = true;
		scene.add(floorMesh);
		// Dedicated Virtual Floor Shadow Catcher Plane (projects crisp PCF building shadows onto the virtual floor)
		const floorShadowMat = new THREE.ShadowMaterial({
			color: 132631,
			opacity: .74,
			transparent: true,
			depthWrite: false
		});
		const floorShadowReceiver = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), floorShadowMat);
		floorShadowReceiver.rotation.x = -Math.PI / 2;
		floorShadowReceiver.position.y = floorY + .004;
		floorShadowReceiver.receiveShadow = true;
		floorShadowReceiver.visible = !isSoftwareGl && currentShadowsEnabled;
		scene.add(floorShadowReceiver);
		const floorLidarTex = createLiDARPlaneGridTexture(maxAniso, false);
		floorLidarTex.repeat.set(5, 4);
		const floorLidarMat = new THREE.MeshBasicMaterial({
			map: floorLidarTex,
			transparent: true,
			opacity: .55,
			depthWrite: false,
			polygonOffset: true,
			polygonOffsetFactor: -1,
			polygonOffsetUnits: -1
		});
		const floorLidarPlane = new THREE.Mesh(new THREE.PlaneGeometry(9.2, 6.4), floorLidarMat);
		floorLidarPlane.rotation.x = -Math.PI / 2;
		floorLidarPlane.position.set(0, floorY + .015, .2);
		scene.add(floorLidarPlane);
		// 5. Conference Table & Tabletop Surface Plane Detection (Y = 0.00)
		const tableGroup = new THREE.Group();
		scene.add(tableGroup);
		const tableWidth = 3.9;
		const tableDepth = 1.95;
		// Brushed metallic chamfered table base
		const tableHullMat = new THREE.MeshStandardMaterial({
			color: 988970,
			roughness: .32,
			metalness: .85
		});
		const tableBaseMesh = new THREE.Mesh(new THREE.BoxGeometry(tableWidth + .14, .09, tableDepth + .14), tableHullMat);
		tableBaseMesh.position.y = -.05;
		// Allow building shadows to project all the way onto the virtual floor without the solid table hull masking them
		tableBaseMesh.castShadow = false;
		tableBaseMesh.receiveShadow = true;
		tableGroup.add(tableBaseMesh);
		// Twin structural pedestals connecting table to floor
		const pedestalMat = new THREE.MeshStandardMaterial({
			color: 1976635,
			roughness: .5,
			metalness: .7
		});
		[-1.15, 1.15].forEach((px) => {
			const ped = new THREE.Mesh(new THREE.CylinderGeometry(.18, .26, Math.abs(floorY) - .05, 24), pedestalMat);
			ped.position.set(px, floorY / 2 - .02, 0);
			tableGroup.add(ped);
		});
		// Glowing World Map + Bottom Telemetry Console Surface on Tabletop
		const worldMapTex = createWorldMapTableTexture(maxAniso);
		const tabletopMapMat = new THREE.MeshStandardMaterial({
			map: worldMapTex,
			emissiveMap: worldMapTex,
			emissive: new THREE.Color(16777215),
			emissiveIntensity: .92,
			roughness: .12,
			metalness: .65
		});
		const tabletopMapMesh = new THREE.Mesh(new THREE.PlaneGeometry(tableWidth, tableDepth), tabletopMapMat);
		tabletopMapMesh.rotation.x = -Math.PI / 2;
		tabletopMapMesh.position.y = .002;
		tabletopMapMesh.receiveShadow = true;
		tableGroup.add(tabletopMapMesh);
		// Tabletop Shadow Receiver Overlay (so building shadows are also visible across the illuminated world map)
		const tableShadowMat = new THREE.ShadowMaterial({
			color: 132631,
			opacity: .54,
			transparent: true,
			depthWrite: false
		});
		const tableShadowReceiver = new THREE.Mesh(new THREE.PlaneGeometry(tableWidth, tableDepth), tableShadowMat);
		tableShadowReceiver.rotation.x = -Math.PI / 2;
		tableShadowReceiver.position.y = .005;
		tableShadowReceiver.receiveShadow = true;
		tableShadowReceiver.visible = !isSoftwareGl && currentShadowsEnabled;
		tableGroup.add(tableShadowReceiver);
		// ARKit / ARCore Tabletop Plane Detection Mesh (Y = +0.012)
		const tableLidarTex = createLiDARPlaneGridTexture(maxAniso, true);
		tableLidarTex.repeat.set(3, 1.5);
		const tableLidarMat = new THREE.MeshBasicMaterial({
			map: tableLidarTex,
			transparent: true,
			opacity: .65,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			polygonOffset: true,
			polygonOffsetFactor: -2,
			polygonOffsetUnits: -2
		});
		const tableLidarPlane = new THREE.Mesh(new THREE.PlaneGeometry(tableWidth - .08, tableDepth - .08), tableLidarMat);
		tableLidarPlane.rotation.x = -Math.PI / 2;
		tableLidarPlane.position.y = .012;
		tableGroup.add(tableLidarPlane);
		// 5a. Multi-Layered Radial LiDAR Laser Scan Wave (Tabletop, 3D Building Volume & Virtual Floor)
		const lidarScanWaveGroup = new THREE.Group();
		tableGroup.add(lidarScanWaveGroup);
		// Primary high-intensity radial laser wavefront ring on tabletop
		const scanRingGeo = new THREE.RingGeometry(.93, 1, 96);
		const scanRingMat = new THREE.MeshBasicMaterial({
			color: 65484,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const scanRingMesh = new THREE.Mesh(scanRingGeo, scanRingMat);
		scanRingMesh.rotation.x = -Math.PI / 2;
		scanRingMesh.position.y = .019;
		lidarScanWaveGroup.add(scanRingMesh);
		// Secondary trailing harmonic laser echo ring on tabletop
		const scanTrailingRingMat = new THREE.MeshBasicMaterial({
			color: 3718648,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const scanTrailingRingMesh = new THREE.Mesh(new THREE.RingGeometry(.74, .88, 96), scanTrailingRingMat);
		scanTrailingRingMesh.rotation.x = -Math.PI / 2;
		scanTrailingRingMesh.position.y = .017;
		lidarScanWaveGroup.add(scanTrailingRingMesh);
		// 3D Vertical Cylindrical Laser Curtain slicing radially through the skyscraper clusters
		const scanLaserCurtainMat = new THREE.MeshBasicMaterial({
			color: 62932,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const scanLaserCurtainMesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1.75, 64, 1, true), scanLaserCurtainMat);
		scanLaserCurtainMesh.position.y = .875;
		lidarScanWaveGroup.add(scanLaserCurtainMesh);
		// 3D Hemispherical ToF / LiDAR Dome Wireframe Wave expanding from the model center
		const scanDomeWireMat = new THREE.MeshBasicMaterial({
			color: 3718648,
			wireframe: true,
			transparent: true,
			opacity: 0,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const scanDomeWireMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 28, 14, 0, Math.PI * 2, 0, Math.PI * .5), scanDomeWireMat);
		scanDomeWireMesh.position.y = .015;
		lidarScanWaveGroup.add(scanDomeWireMesh);
		// 24 Radial Laser Spokes radiating from model center (0, 0.02, 0) to the expanding laser ring
		const SPOKE_COUNT = 24;
		const spokePositions = new Float32Array(SPOKE_COUNT * 6);
		for (let s = 0; s < SPOKE_COUNT; s++) {
			const ang = s / SPOKE_COUNT * Math.PI * 2;
			spokePositions[s * 6] = Math.cos(ang) * .12;
			spokePositions[s * 6 + 1] = .021;
			spokePositions[s * 6 + 2] = Math.sin(ang) * .12;
			spokePositions[s * 6 + 3] = Math.cos(ang) * 1;
			spokePositions[s * 6 + 4] = .021;
			spokePositions[s * 6 + 5] = Math.sin(ang) * 1;
		}
		const spokeGeo = new THREE.BufferGeometry();
		spokeGeo.setAttribute("position", new THREE.BufferAttribute(spokePositions, 3));
		const spokeMat = new THREE.LineBasicMaterial({
			color: 65484,
			transparent: true,
			opacity: 0,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const scanRadialSpokes = new THREE.LineSegments(spokeGeo, spokeMat);
		lidarScanWaveGroup.add(scanRadialSpokes);
		// Synchronized Virtual Floor Radial Laser Wavefront Ring (sweeps across floorLidarPlane)
		const floorScanRingMat = new THREE.MeshBasicMaterial({
			color: 65484,
			transparent: true,
			opacity: 0,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const floorScanRingMesh = new THREE.Mesh(new THREE.RingGeometry(.94, 1, 96), floorScanRingMat);
		floorScanRingMesh.rotation.x = -Math.PI / 2;
		floorScanRingMesh.position.set(0, floorY + .022, .2);
		scene.add(floorScanRingMesh);
		// 5a-bis. Central Metropolis Concentric Emitter Rings & Vertical Light Columns (Zdj. 2 Global Network Centerpiece)
		const metropolisEmitterGroup = new THREE.Group();
		metropolisEmitterGroup.position.set(0, .016, -.02);
		tableGroup.add(metropolisEmitterGroup);
		const metroEmitterRings = [];
		[
			{
				rIn: .56,
				rOut: .6,
				color: 61695,
				op: .85
			},
			{
				rIn: .72,
				rOut: .75,
				color: 3718648,
				op: .65
			},
			{
				rIn: .88,
				rOut: .91,
				color: 12248829,
				op: .5
			}
		].forEach((rc) => {
			const rMesh = new THREE.Mesh(new THREE.RingGeometry(rc.rIn, rc.rOut, 64), new THREE.MeshBasicMaterial({
				color: rc.color,
				transparent: true,
				opacity: rc.op,
				side: THREE.DoubleSide,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			}));
			rMesh.rotation.x = -Math.PI / 2;
			metropolisEmitterGroup.add(rMesh);
			metroEmitterRings.push(rMesh);
		});
		// Vertical holographic light beam cylinder rising through the central metropolis
		const metroLightColumn = new THREE.Mesh(new THREE.CylinderGeometry(.62, .74, 1.45, 32, 1, true), new THREE.MeshBasicMaterial({
			color: 58879,
			transparent: true,
			opacity: .11,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		}));
		metroLightColumn.position.y = .725;
		metropolisEmitterGroup.add(metroLightColumn);
		// Right Foreground Tabletop Accessories from Zdj. 2: Interactive Smart Tablet + Matte-Black Coffee Mug on Coaster
		const tabletAndMugGroup = new THREE.Group();
		tabletAndMugGroup.position.set(1.24, .015, .44);
		tableGroup.add(tabletAndMugGroup);
		const smartTabletTex = createSmartTabletTexture(maxAniso);
		const tabletChassisMat = new THREE.MeshStandardMaterial({
			color: 988970,
			roughness: .22,
			metalness: .88
		});
		const tabletBody = new THREE.Mesh(new THREE.BoxGeometry(.46, .014, .34), tabletChassisMat);
		tabletBody.rotation.y = -.22;
		tabletAndMugGroup.add(tabletBody);
		const tabletScreen = new THREE.Mesh(new THREE.PlaneGeometry(.42, .3), new THREE.MeshBasicMaterial({
			map: smartTabletTex,
			transparent: true,
			opacity: .96
		}));
		tabletScreen.rotation.x = -Math.PI / 2;
		tabletScreen.position.y = .008;
		tabletBody.add(tabletScreen);
		// Executive Matte-Black Coffee Mug + Coaster next to the tablet (composite 4-part 3D prop)
		const mugGroup = new THREE.Group();
		mugGroup.position.set(.24, 0, -.34);
		tabletAndMugGroup.add(mugGroup);
		const mugMatteMat = new THREE.MeshStandardMaterial({
			color: 1120295,
			roughness: .38,
			metalness: .25
		});
		const coasterMesh = new THREE.Mesh(new THREE.BoxGeometry(.18, .008, .18), tabletChassisMat);
		coasterMesh.position.y = .004;
		mugGroup.add(coasterMesh);
		const mugCylinder = new THREE.Mesh(new THREE.CylinderGeometry(.046, .042, .11, 24), mugMatteMat);
		mugCylinder.position.y = .06;
		mugCylinder.castShadow = true;
		mugGroup.add(mugCylinder);
		const mugHandle = new THREE.Mesh(new THREE.TorusGeometry(.028, .007, 10, 20, Math.PI), mugMatteMat);
		mugHandle.rotation.z = -Math.PI / 2;
		mugHandle.position.set(.045, .06, 0);
		mugGroup.add(mugHandle);
		const createLidarPointCloud = (spanX, spanZ, cols, rows, yBase, isTable) => {
			const count = cols * rows;
			const positions = new Float32Array(count * 3);
			const colors = new Float32Array(count * 3);
			const baseY = new Float32Array(count);
			const baseColors = new Float32Array(count * 3);
			const radialDist = new Float32Array(count);
			let maxRadius = .1;
			let ptr = 0;
			for (let ix = 0; ix < cols; ix++) {
				for (let iz = 0; iz < rows; iz++) {
					const u = ix / (cols - 1) - .5;
					const v = iz / (rows - 1) - .5;
					const px = u * spanX;
					const py = yBase + Math.sin(ix * .7 + iz * .7) * .004;
					const pz = v * spanZ;
					positions[ptr * 3] = px;
					positions[ptr * 3 + 1] = py;
					positions[ptr * 3 + 2] = pz;
					baseY[ptr] = py;
					const dist = Math.hypot(px, pz);
					radialDist[ptr] = dist;
					if (dist > maxRadius) maxRadius = dist;
					const isHighlight = (ix + iz) % 4 === 0;
					const r = isTable ? isHighlight ? .2 : .13 : isHighlight ? .98 : .22;
					const g = isTable ? isHighlight ? .98 : .82 : isHighlight ? .78 : .88;
					const b = isTable ? isHighlight ? .78 : .96 : isHighlight ? .22 : .65;
					colors[ptr * 3] = r;
					colors[ptr * 3 + 1] = g;
					colors[ptr * 3 + 2] = b;
					baseColors[ptr * 3] = r;
					baseColors[ptr * 3 + 1] = g;
					baseColors[ptr * 3 + 2] = b;
					ptr++;
				}
			}
			const geo = new THREE.BufferGeometry();
			geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
			geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
			const mat = new THREE.PointsMaterial({
				size: isTable ? .028 : .036,
				vertexColors: true,
				transparent: true,
				opacity: .9,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			});
			const points = new THREE.Points(geo, mat);
			return {
				points,
				geo,
				mat,
				baseY,
				baseColors,
				radialDist,
				maxRadius
			};
		};
		const lidarTableCloudData = createLidarPointCloud(tableWidth - .12, tableDepth - .12, 28, 16, .022, true);
		const lidarTablePointCloud = lidarTableCloudData.points;
		tableGroup.add(lidarTablePointCloud);
		const lidarFloorCloudData = createLidarPointCloud(9, 6.2, 30, 20, floorY + .028, false);
		const lidarFloorPointCloud = lidarFloorCloudData.points;
		scene.add(lidarFloorPointCloud);
		// 6. Holographic & Textured Architectural Skyscraper Materials
		let diagridTex = createDiagridFacadeTexture(maxAniso, configRef.current.hologramStyle);
		diagridTex.repeat.set(2, 4);
		let currentHoloStyle = configRef.current.hologramStyle;
		let currentTexturePreset = configRef.current.buildingTexturePreset || "Hologram Diagrid (Domyślny Cyjan-Złoto)";
		let currentCustomTexUrl = configRef.current.customBuildingTextureUrl || null;
		const holoShellMat = new THREE.MeshPhysicalMaterial({
			color: 3718648,
			emissive: 959977,
			emissiveIntensity: .78,
			map: diagridTex,
			emissiveMap: diagridTex,
			transparent: true,
			opacity: configRef.current.buildingTextureOpacity ?? .84,
			roughness: .15,
			metalness: .2,
			clearcoat: 1,
			side: THREE.DoubleSide,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});
		// Cache of per-preset materials for individual sub-model texture overrides
		const subModelMaterialCache = new Map();
		const getOrCreatePresetMaterial = (preset) => {
			if (preset === currentTexturePreset) return holoShellMat;
			const existing = subModelMaterialCache.get(preset);
			if (existing) return existing;
			const tex = preset === "Hologram Diagrid (Domyślny Cyjan-Złoto)" ? createDiagridFacadeTexture(maxAniso, configRef.current.hologramStyle) : createArchitecturalFacadeTexture(maxAniso, preset);
			tex.repeat.set(2, 4);
			const isHolo = preset === "Hologram Diagrid (Domyślny Cyjan-Złoto)";
			const mat = new THREE.MeshPhysicalMaterial({
				color: isHolo ? 3718648 : 16777215,
				emissive: isHolo ? 959977 : 1976635,
				emissiveIntensity: isHolo ? .78 : .45,
				map: tex,
				emissiveMap: tex,
				transparent: true,
				opacity: configRef.current.buildingTextureOpacity ?? .9,
				roughness: preset === "Beton Architektoniczny i Rdzeń Świetlny (Brutalist BIM)" ? .65 : .18,
				metalness: preset === "Tytan i Szczotkowane Złoto (Parametric Metal)" ? .75 : .25,
				clearcoat: .9,
				side: THREE.DoubleSide,
				depthWrite: !isHolo,
				blending: isHolo ? THREE.AdditiveBlending : THREE.NormalBlending
			});
			subModelMaterialCache.set(preset, mat);
			return mat;
		};
		const applyBuildingTexturePreset = (preset, customUrl) => {
			if (preset === "Własna Tekstura z Pliku (Custom UV Map)" && customUrl) {
				const loader = new THREE.TextureLoader();
				loader.load(customUrl, (loadedTex) => {
					loadedTex.colorSpace = THREE.SRGBColorSpace;
					loadedTex.wrapS = THREE.RepeatWrapping;
					loadedTex.wrapT = THREE.RepeatWrapping;
					loadedTex.anisotropy = maxAniso;
					diagridTex.dispose();
					diagridTex = loadedTex;
					holoShellMat.map = diagridTex;
					holoShellMat.emissiveMap = diagridTex;
					holoShellMat.color.setHex(16777215);
					holoShellMat.emissive.setHex(3718648);
					holoShellMat.emissiveIntensity = .32;
					holoShellMat.roughness = .22;
					holoShellMat.metalness = .3;
					holoShellMat.blending = THREE.NormalBlending;
					holoShellMat.depthWrite = true;
					holoShellMat.needsUpdate = true;
				});
				return;
			}
			const isHolo = preset === "Hologram Diagrid (Domyślny Cyjan-Złoto)";
			const nextTex = isHolo ? createDiagridFacadeTexture(maxAniso, configRef.current.hologramStyle) : createArchitecturalFacadeTexture(maxAniso, preset);
			diagridTex.dispose();
			diagridTex = nextTex;
			holoShellMat.map = diagridTex;
			holoShellMat.emissiveMap = diagridTex;
			if (isHolo) {
				holoShellMat.color.setHex(3718648);
				holoShellMat.emissive.setHex(959977);
				holoShellMat.emissiveIntensity = .78;
				holoShellMat.roughness = .15;
				holoShellMat.metalness = .2;
				holoShellMat.blending = THREE.AdditiveBlending;
				holoShellMat.depthWrite = false;
			} else if (preset === "Fasada Szklana Refleksyjna (Skyscraper Curtain Wall)") {
				holoShellMat.color.setHex(14742270);
				holoShellMat.emissive.setHex(3718648);
				holoShellMat.emissiveIntensity = .48;
				holoShellMat.roughness = .08;
				holoShellMat.metalness = .45;
				holoShellMat.blending = THREE.NormalBlending;
				holoShellMat.depthWrite = true;
			} else if (preset === "Tytan i Szczotkowane Złoto (Parametric Metal)") {
				holoShellMat.color.setHex(16708551);
				holoShellMat.emissive.setHex(16096779);
				holoShellMat.emissiveIntensity = .42;
				holoShellMat.roughness = .22;
				holoShellMat.metalness = .82;
				holoShellMat.blending = THREE.NormalBlending;
				holoShellMat.depthWrite = true;
			} else if (preset === "Beton Architektoniczny i Rdzeń Świetlny (Brutalist BIM)") {
				holoShellMat.color.setHex(14870768);
				holoShellMat.emissive.setHex(16096779);
				holoShellMat.emissiveIntensity = .35;
				holoShellMat.roughness = .68;
				holoShellMat.metalness = .15;
				holoShellMat.blending = THREE.NormalBlending;
				holoShellMat.depthWrite = true;
			} else {
				// Karbonowo-Szafirowy Kompozyt (Cyber-Facade)
				holoShellMat.color.setHex(13630206);
				holoShellMat.emissive.setHex(440020);
				holoShellMat.emissiveIntensity = .62;
				holoShellMat.roughness = .18;
				holoShellMat.metalness = .55;
				holoShellMat.blending = THREE.NormalBlending;
				holoShellMat.depthWrite = true;
			}
			holoShellMat.needsUpdate = true;
		};
		applyBuildingTexturePreset(currentTexturePreset, currentCustomTexUrl);
		const holoGoldCoreMat = new THREE.MeshStandardMaterial({
			color: 16498468,
			emissive: 16096779,
			emissiveIntensity: 1.15,
			transparent: true,
			opacity: .72,
			roughness: .25,
			metalness: .6,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});
		const holoWireMat = new THREE.LineBasicMaterial({
			color: 8246268,
			transparent: true,
			opacity: .72,
			blending: THREE.AdditiveBlending
		});
		const holoFloorSlabMat = new THREE.MeshBasicMaterial({
			color: 3718648,
			transparent: true,
			opacity: .42,
			depthWrite: false,
			blending: THREE.AdditiveBlending
		});
		const buildingClusters = [];
		const raycastProxies = [];
		const buildingShadowCasters = [];
		const buildingShadowDepthMat = new THREE.MeshDepthMaterial({
			depthPacking: THREE.RGBADepthPacking,
			side: THREE.DoubleSide
		});
		const buildSkyscraperCluster = (clusterId, posX, posZ, towers) => {
			const group = new THREE.Group();
			group.position.set(posX, .015, posZ);
			tableGroup.add(group);
			const towerSubGroups = [];
			const innerCores = [];
			const explodableLayers = [];
			const baseRings = [];
			// Part 1: Anchor Base Platform & Rotary Emitter Rings
			const baseRing1 = new THREE.Mesh(new THREE.RingGeometry(.32, .36, 48), new THREE.MeshBasicMaterial({
				color: 2282478,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: .8,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			}));
			baseRing1.rotation.x = -Math.PI / 2;
			baseRing1.position.y = .008;
			group.add(baseRing1);
			baseRings.push(baseRing1);
			const baseRing2 = new THREE.Mesh(new THREE.RingGeometry(.42, .44, 6), new THREE.MeshBasicMaterial({
				color: 16498468,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: .65,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			}));
			baseRing2.rotation.x = -Math.PI / 2;
			baseRing2.position.y = .012;
			group.add(baseRing2);
			baseRings.push(baseRing2);
			// Selection Highlight Ring
			const selectionRing = new THREE.Mesh(new THREE.RingGeometry(.47, .51, 64), new THREE.MeshBasicMaterial({
				color: 16638023,
				side: THREE.DoubleSide,
				transparent: true,
				opacity: 0,
				blending: THREE.AdditiveBlending,
				depthWrite: false
			}));
			selectionRing.rotation.x = -Math.PI / 2;
			selectionRing.position.y = .016;
			group.add(selectionRing);
			// Build each tower in the cluster (up to 5 towers per group)
			towers.forEach((t, tIdx) => {
				const subModelId = `${clusterId}_${tIdx}`;
				const towerSubGroup = new THREE.Group();
				towerSubGroup.position.set(t.dx, 0, t.dz);
				towerSubGroup.userData.baseDx = t.dx;
				towerSubGroup.userData.baseDz = t.dz;
				towerSubGroup.userData.subModelId = subModelId;
				group.add(towerSubGroup);
				towerSubGroups.push(towerSubGroup);
				// Individual sub-model selection ring at base
				const subSelectRing = new THREE.Mesh(new THREE.RingGeometry(t.radiusBottom * 1.18, t.radiusBottom * 1.38, 32), new THREE.MeshBasicMaterial({
					color: 3718648,
					transparent: true,
					opacity: 0,
					side: THREE.DoubleSide,
					blending: THREE.AdditiveBlending,
					depthWrite: false
				}));
				subSelectRing.rotation.x = -Math.PI / 2;
				subSelectRing.position.y = .014;
				towerSubGroup.add(subSelectRing);
				towerSubGroup.userData.subSelectRing = subSelectRing;
				// Individual sub-model raycast proxy cylinder
				const subProxy = new THREE.Mesh(new THREE.CylinderGeometry(t.radiusBottom * 1.25, t.radiusBottom * 1.25, t.height + .25, 10), new THREE.MeshBasicMaterial({ visible: false }));
				subProxy.position.y = (t.height + .25) / 2;
				subProxy.userData.clusterId = clusterId;
				subProxy.userData.subModelId = subModelId;
				towerSubGroup.add(subProxy);
				raycastProxies.push(subProxy);
				// Part 2: Primary Diagrid Exoskeleton Shell (twisted cylinder/prism)
				const shellGeo = new THREE.CylinderGeometry(t.radiusTop, t.radiusBottom, t.height, t.radialSegments, 24, true);
				// Apply architectural twist along height
				const posAttr = shellGeo.attributes.position;
				for (let i = 0; i < posAttr.count; i++) {
					const vx = posAttr.getX(i);
					const vy = posAttr.getY(i);
					const vz = posAttr.getZ(i);
					const normY = (vy + t.height / 2) / t.height;
					const angle = normY * t.twistAngle;
					const cosA = Math.cos(angle);
					const sinA = Math.sin(angle);
					posAttr.setXYZ(i, vx * cosA - vz * sinA, vy, vx * sinA + vz * cosA);
				}
				shellGeo.computeVertexNormals();
				const shellMesh = new THREE.Mesh(shellGeo, holoShellMat);
				shellMesh.position.y = t.height / 2;
				shellMesh.renderOrder = 3;
				shellMesh.castShadow = !isSoftwareGl && currentShadowsEnabled;
				shellMesh.receiveShadow = true;
				shellMesh.customDepthMaterial = buildingShadowDepthMat;
				buildingShadowCasters.push(shellMesh);
				towerSubGroup.add(shellMesh);
				towerSubGroup.userData.shellMesh = shellMesh;
				explodableLayers.push({
					mesh: shellMesh,
					baseY: t.height / 2,
					explodeOffset: .14 * (tIdx + 1)
				});
				// Part 3: Crisp Architectural Edge Wireframe
				const edgesGeo = new THREE.EdgesGeometry(shellGeo, 18);
				const edgesLines = new THREE.LineSegments(edgesGeo, holoWireMat);
				edgesLines.position.y = t.height / 2;
				towerSubGroup.add(edgesLines);
				explodableLayers.push({
					mesh: edgesLines,
					baseY: t.height / 2,
					explodeOffset: .24 * (tIdx + 1)
				});
				// Part 4: Internal BIM Structural Core (reacts to Parallax)
				const coreGeo = new THREE.CylinderGeometry(t.radiusTop * .48, t.radiusBottom * .52, t.height * .94, 8);
				const coreMesh = new THREE.Mesh(coreGeo, t.isGoldCore ? holoGoldCoreMat : holoFloorSlabMat);
				coreMesh.position.y = t.height * .94 / 2;
				coreMesh.renderOrder = 2;
				coreMesh.castShadow = !isSoftwareGl && currentShadowsEnabled;
				coreMesh.receiveShadow = true;
				coreMesh.customDepthMaterial = buildingShadowDepthMat;
				buildingShadowCasters.push(coreMesh);
				towerSubGroup.add(coreMesh);
				towerSubGroup.userData.coreMesh = coreMesh;
				innerCores.push(coreMesh);
				// Part 5: Stacked Horizontal Floor Plates inside the skyscraper
				const slabCount = Math.floor(t.height * 11);
				for (let s = 1; s <= slabCount; s++) {
					const frac = s / (slabCount + 1);
					const slabRadius = THREE.MathUtils.lerp(t.radiusBottom * .86, t.radiusTop * .86, frac);
					const slabMesh = new THREE.Mesh(new THREE.CylinderGeometry(slabRadius, slabRadius, .008, t.radialSegments), holoFloorSlabMat);
					const sy = frac * t.height;
					slabMesh.position.y = sy;
					slabMesh.castShadow = !isSoftwareGl && currentShadowsEnabled;
					slabMesh.customDepthMaterial = buildingShadowDepthMat;
					buildingShadowCasters.push(slabMesh);
					towerSubGroup.add(slabMesh);
					explodableLayers.push({
						mesh: slabMesh,
						baseY: sy,
						explodeOffset: frac * .35
					});
				}
				// Part 6: Rooftop Architectural Crown & Telemetry Spire
				const crownHeight = .24;
				const spireMesh = new THREE.Mesh(new THREE.ConeGeometry(t.radiusTop * .65, crownHeight, t.radialSegments), t.isGoldCore ? holoGoldCoreMat : holoShellMat);
				const spireY = t.height + crownHeight / 2;
				spireMesh.position.y = spireY;
				spireMesh.castShadow = !isSoftwareGl && currentShadowsEnabled;
				spireMesh.receiveShadow = true;
				spireMesh.customDepthMaterial = buildingShadowDepthMat;
				buildingShadowCasters.push(spireMesh);
				towerSubGroup.add(spireMesh);
				explodableLayers.push({
					mesh: spireMesh,
					baseY: spireY,
					explodeOffset: .48
				});
			});
			// Invisible Raycast Proxy Box for instant hover/click selection
			const proxyMesh = new THREE.Mesh(new THREE.BoxGeometry(.95, 1.75, .85), new THREE.MeshBasicMaterial({ visible: false }));
			proxyMesh.position.y = .875;
			proxyMesh.userData.clusterId = clusterId;
			group.add(proxyMesh);
			raycastProxies.push(proxyMesh);
			buildingClusters.push({
				clusterId,
				group,
				basePosX: posX,
				basePosZ: posZ,
				targetPosition: new THREE.Vector3(posX, .015, posZ),
				towerSubGroups,
				innerCores,
				explodableLayers,
				baseRings,
				selectionRing
			});
		};
		// Build Left Cluster (Alpha Spire Complex — up to 5 buildings)
		buildSkyscraperCluster("alpha_spire", -1.12, -.05, [
			{
				dx: -.08,
				dz: .04,
				height: 1.48,
				radiusBottom: .14,
				radiusTop: .09,
				radialSegments: 16,
				twistAngle: .85,
				isGoldCore: false
			},
			{
				dx: .15,
				dz: .12,
				height: 1.16,
				radiusBottom: .11,
				radiusTop: .1,
				radialSegments: 20,
				twistAngle: .4,
				isGoldCore: true
			},
			{
				dx: .28,
				dz: -.08,
				height: .66,
				radiusBottom: .16,
				radiusTop: .14,
				radialSegments: 6,
				twistAngle: .15,
				isGoldCore: false
			},
			{
				dx: -.26,
				dz: -.14,
				height: .94,
				radiusBottom: .11,
				radiusTop: .08,
				radialSegments: 8,
				twistAngle: -.55,
				isGoldCore: true
			},
			{
				dx: -.02,
				dz: .25,
				height: .78,
				radiusBottom: .1,
				radiusTop: .08,
				radialSegments: 12,
				twistAngle: .5,
				isGoldCore: false
			}
		]);
		// Build Center Cluster (Core Sync Neural Nexus — up to 5 buildings)
		buildSkyscraperCluster("central_nexus", 0, -.08, [
			{
				dx: 0,
				dz: 0,
				height: 1.68,
				radiusBottom: .16,
				radiusTop: .12,
				radialSegments: 6,
				twistAngle: .95,
				isGoldCore: true
			},
			{
				dx: .28,
				dz: .05,
				height: 1.28,
				radiusBottom: .13,
				radiusTop: .11,
				radialSegments: 8,
				twistAngle: -.65,
				isGoldCore: true
			},
			{
				dx: -.24,
				dz: -.06,
				height: .96,
				radiusBottom: .11,
				radiusTop: .09,
				radialSegments: 6,
				twistAngle: .35,
				isGoldCore: false
			},
			{
				dx: .14,
				dz: -.22,
				height: 1.12,
				radiusBottom: .11,
				radiusTop: .08,
				radialSegments: 10,
				twistAngle: .75,
				isGoldCore: false
			},
			{
				dx: -.18,
				dz: .22,
				height: .84,
				radiusBottom: .1,
				radiusTop: .08,
				radialSegments: 14,
				twistAngle: -.45,
				isGoldCore: true
			}
		]);
		// Build Right Cluster (Orbital Twin & Neural Array Complex — up to 5 buildings)
		buildSkyscraperCluster("orbital_twin", 1.12, -.02, [
			{
				dx: -.1,
				dz: -.05,
				height: 1.62,
				radiusBottom: .12,
				radiusTop: .09,
				radialSegments: 4,
				twistAngle: .25,
				isGoldCore: false
			},
			{
				dx: .16,
				dz: .1,
				height: 1.38,
				radiusBottom: .14,
				radiusTop: .11,
				radialSegments: 12,
				twistAngle: -.9,
				isGoldCore: true
			},
			{
				dx: -.26,
				dz: .14,
				height: 1.04,
				radiusBottom: .11,
				radiusTop: .09,
				radialSegments: 6,
				twistAngle: .6,
				isGoldCore: false
			},
			{
				dx: .26,
				dz: -.15,
				height: .88,
				radiusBottom: .11,
				radiusTop: .08,
				radialSegments: 8,
				twistAngle: -.5,
				isGoldCore: true
			},
			{
				dx: .02,
				dz: -.24,
				height: 1.18,
				radiusBottom: .1,
				radiusTop: .07,
				radialSegments: 16,
				twistAngle: .8,
				isGoldCore: false
			}
		]);
		// 7. Floating Interactive Glass Screens (Frosted Glass UI matching attached image + CAD mode)
		const hudPanelsGroup = new THREE.Group();
		scene.add(hudPanelsGroup);
		const hudConfigs = [
			{
				type: "prism",
				pos: [
					-1.85,
					1.08,
					.25
				],
				rotY: .34,
				scale: [.68, .78],
				parallaxDepth: .18,
				initialIconIndex: 0
			},
			{
				type: "turbine",
				pos: [
					-.95,
					1.07,
					-.58
				],
				rotY: .14,
				scale: [.62, .71],
				parallaxDepth: -.12,
				initialIconIndex: 0
			},
			{
				type: "core",
				pos: [
					.02,
					1.1,
					-.72
				],
				rotY: 0,
				scale: [.68, .78],
				parallaxDepth: -.16,
				initialIconIndex: 0
			},
			{
				type: "biosphere",
				pos: [
					.96,
					1.07,
					-.55
				],
				rotY: -.14,
				scale: [.62, .71],
				parallaxDepth: -.12,
				initialIconIndex: 0
			},
			{
				type: "neural",
				pos: [
					1.85,
					1.08,
					.22
				],
				rotY: -.34,
				scale: [.68, .78],
				parallaxDepth: .18,
				initialIconIndex: 0
			}
		];
		let currentHudScreenStyle = configRef.current.hudScreenStyle;
		const floatingHudMeshes = [];
		const floatingHudItems = [];
		// Shared faceted lavender-violet crystal material (like the floating 3D gem beside the glass panel in the attached image)
		const lavenderGemMat = new THREE.MeshPhysicalMaterial({
			color: 12891645,
			emissive: 7153881,
			emissiveIntensity: .28,
			roughness: .18,
			metalness: .15,
			flatShading: true,
			transparent: true,
			opacity: .92
		});
		hudConfigs.forEach((hc) => {
			const isGlassUi = currentHudScreenStyle === "Szklany Panel Interaktywny (Frosted Glass UI)" || currentHudScreenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)";
			const isUltraClear98 = currentHudScreenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)";
			const tex = createFloatingHudTexture(maxAniso, hc.type, currentHudScreenStyle, hc.initialIconIndex);
			const mat = new THREE.MeshBasicMaterial({
				map: tex,
				transparent: true,
				opacity: isUltraClear98 ? .98 : isGlassUi ? .95 : .86,
				side: THREE.DoubleSide,
				depthWrite: false,
				blending: isGlassUi ? THREE.NormalBlending : THREE.AdditiveBlending
			});
			const panelMesh = new THREE.Mesh(new THREE.PlaneGeometry(hc.scale[0], hc.scale[1]), mat);
			panelMesh.position.set(...hc.pos);
			panelMesh.rotation.y = hc.rotY;
			panelMesh.renderOrder = 5;
			panelMesh.userData.hudPanelType = hc.type;
			hudPanelsGroup.add(panelMesh);
			floatingHudMeshes.push(panelMesh);
			// Attach the faceted lavender 3D polyhedron floating beside the glass screen (matching reference photo)
			const gemMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(.095, 0), lavenderGemMat);
			gemMesh.position.set(hc.scale[0] * .56, .08, -.04);
			panelMesh.add(gemMesh);
			const holoProp = gemMesh;
			floatingHudItems.push({
				type: hc.type,
				mesh: panelMesh,
				mat,
				basePos: new THREE.Vector3(...hc.pos),
				parallaxDepth: hc.parallaxDepth,
				activeIconIndex: hc.initialIconIndex,
				holoProp
			});
		});
		// 7b. Horizontal Rectangular Reference Image 3D Screen (16:9 Landscape Aspect Ratio)
		const refBillboardGroup = new THREE.Group();
		refBillboardGroup.position.set(0, 2.04, -1.25);
		scene.add(refBillboardGroup);
		// Frosted white/lavender outer glass bezel for the horizontal rectangle screen
		const refBezelMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.84, 1.06), new THREE.MeshBasicMaterial({
			color: 15591934,
			transparent: true,
			opacity: .78,
			side: THREE.DoubleSide,
			depthWrite: false
		}));
		refBezelMesh.position.z = -.008;
		refBillboardGroup.add(refBezelMesh);
		const refScreenMat = new THREE.MeshBasicMaterial({
			color: 16777215,
			transparent: true,
			opacity: .96,
			side: THREE.DoubleSide
		});
		const refScreenMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.76, .99), refScreenMat);
		refBillboardGroup.add(refScreenMesh);
		let currentRefImageUrl = "";
		const texLoader = new THREE.TextureLoader();
		const loadRefBillboardTexture = (url) => {
			if (!url) return;
			texLoader.load(url, (loadedTex) => {
				loadedTex.colorSpace = THREE.SRGBColorSpace;
				loadedTex.anisotropy = maxAniso;
				if (refScreenMat.map) refScreenMat.map.dispose();
				refScreenMat.map = loadedTex;
				refScreenMat.needsUpdate = true;
			}, undefined, () => {
				// Ignore load errors gracefully
			});
		};
		currentRefImageUrl = configRef.current.customReferenceImageUrl;
		loadRefBillboardTexture(currentRefImageUrl);
		// 8. Foreground Depth Occlusion Objects (Executive Chairs & Boardroom Pillars)
		// Demonstrates ARKit/ARCore Environment Depth Occlusion when camera moves
		const occlusionGroup = new THREE.Group();
		scene.add(occlusionGroup);
		const chairLeatherMat = new THREE.MeshStandardMaterial({
			color: 1448742,
			roughness: .42,
			metalness: .25
		});
		const chairChromeMat = new THREE.MeshStandardMaterial({
			color: 9741240,
			roughness: .2,
			metalness: .9
		});
		const buildExecutiveChair = (x, z, rotY) => {
			const chair = new THREE.Group();
			chair.position.set(x, floorY, z);
			chair.rotation.y = rotY;
			// Pedestal column
			const base = new THREE.Mesh(new THREE.CylinderGeometry(.04, .24, .42, 16), chairChromeMat);
			base.position.y = .21;
			chair.add(base);
			// Seat cushion
			const seat = new THREE.Mesh(new THREE.BoxGeometry(.52, .08, .5), chairLeatherMat);
			seat.position.y = .44;
			chair.add(seat);
			// High backrest (projects above tabletop to demonstrate real-time depth occlusion)
			const backrest = new THREE.Mesh(new THREE.BoxGeometry(.5, .68, .08), chairLeatherMat);
			backrest.position.set(0, .8, .22);
			backrest.rotation.x = -.12;
			chair.add(backrest);
			// Chrome armrests
			[-.26, .26].forEach((ax) => {
				const arm = new THREE.Mesh(new THREE.BoxGeometry(.04, .04, .36), chairChromeMat);
				arm.position.set(ax, .62, .05);
				chair.add(arm);
			});
			occlusionGroup.add(chair);
		};
		buildExecutiveChair(-2.15, .82, .65);
		buildExecutiveChair(2.15, .82, -.65);
		buildExecutiveChair(-1.35, -1.25, 2.85);
		buildExecutiveChair(1.35, -1.25, -2.85);
		// 9. Arched Boardroom Architecture & Exterior Window Portals (Background Z = -2.8)
		const archWallGroup = new THREE.Group();
		archWallGroup.position.z = -2.65;
		scene.add(archWallGroup);
		const stoneArchMat = new THREE.MeshStandardMaterial({
			color: 3879723,
			roughness: .55,
			metalness: .25
		});
		// 5 Neo-Gothic / Modernist Columns & Vaulted Arches framing the windows
		const pillarPositions = [
			-3.6,
			-1.8,
			0,
			1.8,
			3.6
		];
		pillarPositions.forEach((px) => {
			const col = new THREE.Mesh(new THREE.CylinderGeometry(.16, .22, 4.2, 16), stoneArchMat);
			col.position.set(px, floorY + 2.1, 0);
			archWallGroup.add(col);
		});
		// Upper mezzanine balcony beam (matching the curved upper gallery in the photo)
		const balconyBeam = new THREE.Mesh(new THREE.BoxGeometry(8.2, .22, .45), stoneArchMat);
		balconyBeam.position.set(0, 1.72, .12);
		archWallGroup.add(balconyBeam);
		// Pointed Gothic-Modern Arches above the gallery
		for (let i = 0; i < pillarPositions.length - 1; i++) {
			const midX = (pillarPositions[i] + pillarPositions[i + 1]) / 2;
			const archRing = new THREE.Mesh(new THREE.TorusGeometry(.92, .09, 12, 32, Math.PI), stoneArchMat);
			archRing.position.set(midX, 1.82, 0);
			archWallGroup.add(archRing);
		}
		// 9b. Modern Recessed Linear LED Ceiling Strips & Sunset Horizon Glow (matching Zdj. 2 boardroom ceiling & sunset)
		const ceilingAndSunsetGroup = new THREE.Group();
		scene.add(ceilingAndSunsetGroup);
		const ledStripMat = new THREE.MeshBasicMaterial({
			color: 16639626,
			transparent: true,
			opacity: .85
		});
		[
			-2.4,
			-.8,
			.8,
			2.4
		].forEach((cx) => {
			const strip = new THREE.Mesh(new THREE.BoxGeometry(.045, .015, 6.2), ledStripMat);
			strip.position.set(cx, 2.85, -.5);
			ceilingAndSunsetGroup.add(strip);
		});
		[
			-2.2,
			-.6,
			1
		].forEach((cz) => {
			const crossStrip = new THREE.Mesh(new THREE.BoxGeometry(6.8, .015, .045), ledStripMat);
			crossStrip.position.set(0, 2.85, cz);
			ceilingAndSunsetGroup.add(crossStrip);
		});
		// Warm Golden Sunset Solar Orb on the right horizon behind the glass curtain wall (Zdj. 2 right window glow)
		const sunsetOrbMesh = new THREE.Mesh(new THREE.SphereGeometry(.55, 24, 24), new THREE.MeshBasicMaterial({
			color: 16498468,
			transparent: true,
			opacity: .65,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		}));
		sunsetOrbMesh.position.set(2.85, .72, -5.8);
		ceilingAndSunsetGroup.add(sunsetOrbMesh);
		// 10. Exterior Skyline & Dynamic Window Particle Effects (Behind the Windows Z = -3.4 to -7.8)
		const exteriorWindowGroup = new THREE.Group();
		exteriorWindowGroup.position.z = -3.6;
		scene.add(exteriorWindowGroup);
		// Distant futuristic city silhouettes outside the windows
		const silhouetteMat = new THREE.MeshStandardMaterial({
			color: 1976635,
			emissive: 988970,
			roughness: .4,
			metalness: .7
		});
		const exteriorTowers = [
			{
				x: -2.6,
				z: -1.8,
				w: .55,
				h: 3.8
			},
			{
				x: -1.1,
				z: -2.4,
				w: .42,
				h: 4.5
			},
			{
				x: .85,
				z: -2.1,
				w: .48,
				h: 4.2
			},
			{
				x: 2.35,
				z: -1.6,
				w: .62,
				h: 3.9
			}
		];
		exteriorTowers.forEach((et) => {
			const m = new THREE.Mesh(new THREE.BoxGeometry(et.w, et.h, et.w), silhouetteMat);
			m.position.set(et.x, floorY + et.h / 2, et.z);
			exteriorWindowGroup.add(m);
		});
		// DYNAMIC WINDOW PARTICLES (Atmospheric Spores / Solar Motes / Cyber Rain behind windows)
		const MAX_PARTICLES = 900;
		const particlePositions = new Float32Array(MAX_PARTICLES * 3);
		const particleColors = new Float32Array(MAX_PARTICLES * 3);
		const particleVelocities = new Float32Array(MAX_PARTICLES * 3);
		for (let i = 0; i < MAX_PARTICLES; i++) {
			particlePositions[i * 3] = (Math.random() - .5) * 7.6;
			particlePositions[i * 3 + 1] = floorY + Math.random() * 4.2;
			particlePositions[i * 3 + 2] = -Math.random() * 3.2;
			particleVelocities[i * 3] = (Math.random() - .5) * .25;
			particleVelocities[i * 3 + 1] = .18 + Math.random() * .35;
			particleVelocities[i * 3 + 2] = (Math.random() - .5) * .15;
			// Mix of cyan and warm golden sunset particles
			const isGold = i % 3 === 0;
			particleColors[i * 3] = isGold ? 1 : .22;
			particleColors[i * 3 + 1] = isGold ? .76 : .88;
			particleColors[i * 3 + 2] = isGold ? .28 : 1;
		}
		const windowParticlesGeo = new THREE.BufferGeometry();
		windowParticlesGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
		windowParticlesGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
		const windowParticlesMat = new THREE.PointsMaterial({
			size: .055,
			vertexColors: true,
			transparent: true,
			opacity: .88,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const windowParticleSystem = new THREE.Points(windowParticlesGeo, windowParticlesMat);
		exteriorWindowGroup.add(windowParticleSystem);
		// Instanced Aerial Light Streams moving across the exterior window vista
		const STREAM_COUNT = 36;
		const streamGeo = new THREE.BoxGeometry(.32, .018, .018);
		const streamMat = new THREE.MeshBasicMaterial({
			color: 16638023,
			transparent: true,
			opacity: .75,
			blending: THREE.AdditiveBlending
		});
		const aerialStreams = new THREE.InstancedMesh(streamGeo, streamMat, STREAM_COUNT);
		aerialStreams.frustumCulled = false;
		exteriorWindowGroup.add(aerialStreams);
		const streamData = Array.from({ length: STREAM_COUNT }, (_, idx) => ({
			x: (Math.random() - .5) * 7.2,
			y: -.2 + Math.random() * 2.8,
			z: -.4 - Math.random() * 2.5,
			speed: (idx % 2 === 0 ? 1 : -1) * (.65 + Math.random() * .9)
		}));
		// 10b. Aerodynamic Wind Direction & Force Vector Particle Visualization (Reacts to windowParticleDensity)
		const windFieldGroup = new THREE.Group();
		tableGroup.add(windFieldGroup);
		const MAX_WIND_VECTORS = 140;
		const windArrowGeo = new THREE.ConeGeometry(.015, .068, 6);
		const windArrowMat = new THREE.MeshBasicMaterial({
			color: 16777215,
			transparent: true,
			opacity: .88,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const windVectorArrows = new THREE.InstancedMesh(windArrowGeo, windArrowMat, MAX_WIND_VECTORS);
		windVectorArrows.frustumCulled = false;
		windFieldGroup.add(windVectorArrows);
		// Per-instance color tinting (cyan to golden-amber high-velocity gusts)
		const windColorHelper = new THREE.Color();
		for (let i = 0; i < MAX_WIND_VECTORS; i++) {
			windColorHelper.setHex(i % 4 === 0 ? 16498468 : i % 2 === 0 ? 61695 : 3718648);
			windVectorArrows.setColorAt(i, windColorHelper);
		}
		if (windVectorArrows.instanceColor) {
			windVectorArrows.instanceColor.needsUpdate = true;
		}
		// Streamline vector tail segments (2 vertices per wind vector particle)
		const windLinePositions = new Float32Array(MAX_WIND_VECTORS * 6);
		const windLineColors = new Float32Array(MAX_WIND_VECTORS * 6);
		for (let i = 0; i < MAX_WIND_VECTORS; i++) {
			const isWarmGust = i % 4 === 0;
			// Head vertex (bright)
			windLineColors[i * 6] = isWarmGust ? 1 : .13;
			windLineColors[i * 6 + 1] = isWarmGust ? .78 : .92;
			windLineColors[i * 6 + 2] = isWarmGust ? .22 : 1;
			// Tail vertex (faded)
			windLineColors[i * 6 + 3] = .05;
			windLineColors[i * 6 + 4] = .38;
			windLineColors[i * 6 + 5] = .62;
		}
		const windVectorLinesGeo = new THREE.BufferGeometry();
		windVectorLinesGeo.setAttribute("position", new THREE.BufferAttribute(windLinePositions, 3));
		windVectorLinesGeo.setAttribute("color", new THREE.BufferAttribute(windLineColors, 3));
		const windVectorLinesMat = new THREE.LineBasicMaterial({
			vertexColors: true,
			transparent: true,
			opacity: .78,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		const windVectorLines = new THREE.LineSegments(windVectorLinesGeo, windVectorLinesMat);
		windVectorLines.frustumCulled = false;
		windFieldGroup.add(windVectorLines);
		const windParticlesData = Array.from({ length: MAX_WIND_VECTORS }, (_, idx) => ({
			x: (Math.random() - .5) * 3.6,
			y: .08 + Math.random() * 1.65,
			z: (Math.random() - .5) * 1.75,
			baseSpeed: .55 + idx % 7 * .12,
			phase: idx * .47
		}));
		// 3D Holographic Wind Compass & Anemometer Indicator on Left Tabletop Corner
		const windCompassGroup = new THREE.Group();
		windCompassGroup.position.set(-1.55, .018, .68);
		tableGroup.add(windCompassGroup);
		const compassRingMesh = new THREE.Mesh(new THREE.RingGeometry(.14, .165, 32), new THREE.MeshBasicMaterial({
			color: 3718648,
			transparent: true,
			opacity: .82,
			side: THREE.DoubleSide,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		}));
		compassRingMesh.rotation.x = -Math.PI / 2;
		windCompassGroup.add(compassRingMesh);
		const windCompassArrowGroup = new THREE.Group();
		windCompassArrowGroup.position.y = .012;
		windCompassGroup.add(windCompassArrowGroup);
		const compassArrowShaft = new THREE.Mesh(new THREE.BoxGeometry(.18, .008, .016), new THREE.MeshBasicMaterial({
			color: 61695,
			transparent: true,
			opacity: .9,
			blending: THREE.AdditiveBlending
		}));
		windCompassArrowGroup.add(compassArrowShaft);
		const compassArrowHead = new THREE.Mesh(new THREE.ConeGeometry(.032, .075, 8), new THREE.MeshBasicMaterial({
			color: 16498468,
			transparent: true,
			opacity: .95,
			blending: THREE.AdditiveBlending
		}));
		compassArrowHead.rotation.z = -Math.PI / 2;
		compassArrowHead.position.x = .11;
		windCompassArrowGroup.add(compassArrowHead);
		// 11. Pointer Parallax & Raycasting Setup
		const raycaster = new THREE.Raycaster();
		let pointerX = 0;
		let pointerY = 0;
		let smoothedParallaxX = 0;
		let smoothedParallaxY = 0;
		const handlePointerMove = (e) => {
			const rect = renderer.domElement.getBoundingClientRect();
			pointerX = (e.clientX - rect.left) / rect.width * 2 - 1;
			pointerY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
		};
		let pointerDownPos = {
			x: 0,
			y: 0
		};
		const handlePointerDown = (e) => {
			pointerDownPos = {
				x: e.clientX,
				y: e.clientY
			};
		};
		const handlePointerUp = (e) => {
			const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
			if (dist > 6) return;
			const rect = renderer.domElement.getBoundingClientRect();
			_pointerNdc.set((e.clientX - rect.left) / rect.width * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
			raycaster.setFromCamera(_pointerNdc, camera);
			// 1. Check interactive 3D Floating Glass Screens first (supports clicking the 4 bottom dock icons!)
			if (configRef.current.showFloatingHudPanels) {
				const hudHits = raycaster.intersectObjects(floatingHudMeshes, false);
				if (hudHits.length > 0) {
					const hit = hudHits[0];
					const hitItem = floatingHudItems.find((item) => item.mesh === hit.object);
					if (hitItem) {
						let nextIconIdx = (hitItem.activeIconIndex + 1) % 4;
						if (hit.uv) {
							// If user clicked in the bottom rounded dock bar region (uv.y < 0.32), pick the exact icon 0..3
							if (hit.uv.y < .32) {
								if (hit.uv.x < .31) nextIconIdx = 0;
								else if (hit.uv.x < .5) nextIconIdx = 1;
								else if (hit.uv.x < .69) nextIconIdx = 2;
								else nextIconIdx = 3;
							}
						}
						hitItem.activeIconIndex = nextIconIdx;
						const nextTex = createFloatingHudTexture(maxAniso, hitItem.type, configRef.current.hudScreenStyle, nextIconIdx);
						if (hitItem.mat.map) hitItem.mat.map.dispose();
						hitItem.mat.map = nextTex;
						hitItem.mat.needsUpdate = true;
						if (onSelectHudRef.current) {
							onSelectHudRef.current(hitItem.type, nextIconIdx);
						}
						return;
					}
				}
			}
			// 2. Check 3D Holographic Individual Sub-Models & Building Clusters
			const hits = raycaster.intersectObjects(raycastProxies, false);
			if (hits.length > 0) {
				const hitObj = hits[0].object;
				const hitId = hitObj.userData.clusterId;
				const hitSubId = hitObj.userData.subModelId;
				if (hitSubId && onSelectSubModelRef.current) {
					onSelectSubModelRef.current(hitSubId, hitId);
				} else {
					onSelectRef.current(configRef.current.selectedBuilding === hitId ? null : hitId);
				}
			}
		};
		renderer.domElement.addEventListener("pointermove", handlePointerMove);
		renderer.domElement.addEventListener("pointerdown", handlePointerDown);
		renderer.domElement.addEventListener("pointerup", handlePointerUp);
		// Pre-warm shaders
		if (!isSoftwareGl) {
			renderer.compile(scene, camera);
		}
		// 12. Paced Render Loop (with Software-WebGL afterDraw sync)
		let frameId = 0;
		const clock = new THREE.Clock();
		let lastScanTrigger = configRef.current.triggerScanPulse;
		// Start at 0.0 so an initial radial LiDAR laser scan wave sweeps the model on startup and whenever triggerScanPulse fires
		let scanPulseProgress = 0;
		let scanRefreshsettled = false;
		let fpsFrameCounter = 0;
		let fpsAccumulator = 0;
		let pendulumPhase = 0;
		let nightModeBlend = configRef.current.enableNightMode ? 1 : 0;
		// Helper to update a LiDAR point cloud during the radial laser wave sweep
		const updatePointCloudWave = (cloud, waveNorm, isScanning) => {
			const posAttr = cloud.geo.attributes.position;
			const colAttr = cloud.geo.attributes.color;
			const count = cloud.radialDist.length;
			if (!isScanning) {
				for (let i = 0; i < count; i++) {
					posAttr.setY(i, cloud.baseY[i]);
					colAttr.setXYZ(i, cloud.baseColors[i * 3], cloud.baseColors[i * 3 + 1], cloud.baseColors[i * 3 + 2]);
				}
				posAttr.needsUpdate = true;
				colAttr.needsUpdate = true;
				return;
			}
			const waveFrontRadius = waveNorm * (cloud.maxRadius * 1.18);
			const bandWidth = cloud.maxRadius * .18;
			for (let i = 0; i < count; i++) {
				const dist = cloud.radialDist[i];
				const deltaDist = dist - waveFrontRadius;
				const absDelta = Math.abs(deltaDist);
				// Gaussian-like laser excitation crest right on the expanding radial wavefront
				const waveExcitation = absDelta < bandWidth ? Math.cos(absDelta / bandWidth * (Math.PI * .5)) : 0;
				// Points already swept by the radial laser wave are freshly illuminated; points ahead dim briefly before the laser hits them
				const sweptFactor = deltaDist <= 0 ? 1 : Math.max(.22, 1 - Math.min(1, deltaDist / (bandWidth * 2.2)) * .78);
				posAttr.setY(i, cloud.baseY[i] + waveExcitation * .042);
				const br = cloud.baseColors[i * 3] * sweptFactor;
				const bg = cloud.baseColors[i * 3 + 1] * sweptFactor;
				const bb = cloud.baseColors[i * 3 + 2] * sweptFactor;
				// Laser wavefront flash (bright cyan-emerald / white)
				colAttr.setXYZ(i, THREE.MathUtils.lerp(br, .55, waveExcitation), THREE.MathUtils.lerp(bg, 1, waveExcitation), THREE.MathUtils.lerp(bb, .96, waveExcitation));
			}
			posAttr.needsUpdate = true;
			colAttr.needsUpdate = true;
		};
		function afterDraw(cb) {
			const gl = renderer.getContext();
			const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
			gl.flush();
			const poll = () => {
				const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
				if (state === gl.UNSIGNALED) {
					frameId = window.setTimeout(poll, 5);
				} else {
					if (sync) gl.deleteSync(sync);
					frameId = window.setTimeout(cb, 80);
				}
			};
			frameId = window.setTimeout(poll, 5);
		}
		function tick() {
			const delta = Math.min(clock.getDelta(), .1);
			const elapsed = clock.getElapsedTime();
			const cfg = configRef.current;
			// Smoothly advance pendulum phase proportional to user-selected pendulumSpeed (0 = stopped/minimum)
			pendulumPhase += delta * cfg.pendulumSpeed * .42;
			// Update hologram / architectural facade texture if style, preset, or custom texture URL changed
			const nextPreset = cfg.buildingTexturePreset || "Hologram Diagrid (Domyślny Cyjan-Złoto)";
			const nextCustomUrl = cfg.customBuildingTextureUrl || null;
			if (cfg.hologramStyle !== currentHoloStyle || nextPreset !== currentTexturePreset || nextCustomUrl !== currentCustomTexUrl) {
				currentHoloStyle = cfg.hologramStyle;
				currentTexturePreset = nextPreset;
				currentCustomTexUrl = nextCustomUrl;
				applyBuildingTexturePreset(currentTexturePreset, currentCustomTexUrl);
			}
			const texScale = cfg.buildingTextureScale ?? 1;
			const texOpacity = cfg.buildingTextureOpacity ?? .88;
			holoShellMat.opacity = texOpacity;
			// Dynamically scale facade texture repeat & wireframe intensity by hologramMeshDensity and buildingTextureScale
			diagridTex.repeat.set(2 * cfg.hologramMeshDensity * texScale, 4 * cfg.hologramMeshDensity * texScale);
			holoWireMat.opacity = Math.min(.95, .42 + cfg.hologramMeshDensity * .25);
			// Check camera preset change
			if (cfg.cameraPreset !== lastPreset) {
				lastPreset = cfg.cameraPreset;
				activePresetTransition = true;
			}
			const preset = CAMERA_PRESETS[cfg.cameraPreset];
			// Compute 6DoF Parallax Offset (combining mouse pointer + regulated pendulum sway)
			const swayAmplitudeScale = Math.min(1, cfg.pendulumSpeed * 1.25);
			const autoOffsetX = cfg.autoParallax && cfg.pendulumSpeed > .001 ? Math.sin(pendulumPhase) * .32 * swayAmplitudeScale : 0;
			const autoOffsetY = cfg.autoParallax && cfg.pendulumSpeed > .001 ? Math.cos(pendulumPhase * .7) * .11 * swayAmplitudeScale : 0;
			const targetPx = (pointerX * .45 + autoOffsetX) * cfg.parallaxIntensity;
			const targetPy = (pointerY * .22 + autoOffsetY) * cfg.parallaxIntensity;
			smoothedParallaxX = THREE.MathUtils.damp(smoothedParallaxX, targetPx, 5.5, delta);
			smoothedParallaxY = THREE.MathUtils.damp(smoothedParallaxY, targetPy, 5.5, delta);
			if (!userDragging) {
				_targetCamPos.set(preset.pos[0] + smoothedParallaxX, preset.pos[1] + smoothedParallaxY * .6, preset.pos[2]);
				_targetLookAt.set(preset.target[0] - smoothedParallaxX * .15, preset.target[1], preset.target[2]);
				camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 4.2, delta);
				camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 4.2, delta);
				camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 4.2, delta);
				controls.target.lerp(_targetLookAt, Math.min(1, delta * 5));
				if (activePresetTransition && camera.position.distanceTo(_targetCamPos) < .05) {
					activePresetTransition = false;
				}
			}
			controls.update();
			// Smoothly interpolate Night Mode transition (0.0 = Standard Mode, 1.0 = Nocturnal Neon AR)
			nightModeBlend = THREE.MathUtils.damp(nightModeBlend, cfg.enableNightMode ? 1 : 0, 5.5, delta);
			// Update Environmental Lighting intensity & Atmospheric Fog (_FogDensity)
			// In Night Mode, ambient room lighting automatically dims and shifts to Electric Blue (#00f0ff) & Deep Violet (#7c3aed)
			const nightAmbientDim = 1 - nightModeBlend * .65;
			sunKeyLight.intensity = 1.5 * cfg.envLightingIntensity * nightAmbientDim;
			sunKeyLight.color.lerpColors(_colSunDay, _colSunNight, nightModeBlend);
			hemiLight.intensity = .65 * cfg.envLightingIntensity * (1 - nightModeBlend * .5);
			hemiLight.color.lerpColors(_colHemiSkyDay, _colHemiSkyNight, nightModeBlend);
			hemiLight.groundColor.lerpColors(_colHemiGroundDay, _colHemiGroundNight, nightModeBlend);
			tableCyanLight.intensity = 2.1 * cfg.envLightingIntensity * (1 + nightModeBlend * .55);
			tableCyanLight.color.lerpColors(_colTableCyanDay, _colTableCyanNight, nightModeBlend);
			tableGoldLight.intensity = 1.5 * (1 + nightModeBlend * .9);
			tableGoldLight.color.lerpColors(_colTableAccentDay, _colTableAccentNight, nightModeBlend);
			scene.background.lerpColors(_colBgDay, _colBgNight, nightModeBlend);
			atmosphericFog.color.lerpColors(_colFogDay, _colFogNight, nightModeBlend);
			atmosphericFog.density = cfg.enableAtmosphericFog ? .065 + nightModeBlend * .018 : 0;
			floorMat.color.lerpColors(_colFloorDay, _colFloorNight, nightModeBlend);
			tabletopMapMat.emissive.lerpColors(_colMapEmissiveDay, _colMapEmissiveNight, nightModeBlend);
			tabletopMapMat.emissiveIntensity = .92 + nightModeBlend * .28;
			// Shift Hologram & BIM Structural Core palette to Electric Blue (#00f0ff) and Deep Violet (#7c3aed) in Night Mode
			holoGoldCoreMat.color.lerpColors(_colCoreDay, _colCoreNight, nightModeBlend);
			holoGoldCoreMat.emissive.lerpColors(_colCoreEmissiveDay, _colCoreEmissiveNight, nightModeBlend);
			holoGoldCoreMat.emissiveIntensity = 1.15 + nightModeBlend * .65;
			holoWireMat.color.lerpColors(_colWireDay, _colWireNight, nightModeBlend);
			holoFloorSlabMat.color.lerpColors(_colSlabDay, _colSlabNight, nightModeBlend);
			if (currentTexturePreset === "Hologram Diagrid (Domyślny Cyjan-Złoto)") {
				holoShellMat.color.lerpColors(_colShellHoloDay, _colShellHoloNight, nightModeBlend);
				holoShellMat.emissive.lerpColors(_colShellEmissiveDay, _colShellEmissiveNight, nightModeBlend);
				holoShellMat.emissiveIntensity = .78 + nightModeBlend * .52;
			}
			ledStripMat.color.lerpColors(_colLedDay, _colLedNight, nightModeBlend);
			sunsetOrbMesh.material.color.lerpColors(_colTableAccentDay, _colTableAccentNight, nightModeBlend);
			sunsetOrbMesh.material.opacity = .65 * (1 - nightModeBlend * .45);
			silhouetteMat.emissive.lerpColors(_colSilhouetteEmissiveDay, _colSilhouetteEmissiveNight, nightModeBlend);
			streamMat.color.lerpColors(_colLedDay, _colCoreNight, nightModeBlend);
			// Update Building Shadow Mapping (Cast Shadows onto Virtual Floor & Tabletop) and Shadow Map Quality
			const nextShadowsEnabled = cfg.enableBuildingShadows ?? true;
			const nextShadowQuality = cfg.shadowMapQuality || "Wysoka (2048×2048 · Crisp PCF)";
			if (nextShadowsEnabled !== currentShadowsEnabled) {
				currentShadowsEnabled = nextShadowsEnabled;
				const shadowsActive = !isSoftwareGl && currentShadowsEnabled;
				renderer.shadowMap.enabled = shadowsActive;
				sunKeyLight.castShadow = shadowsActive;
				floorShadowReceiver.visible = shadowsActive;
				tableShadowReceiver.visible = shadowsActive;
				for (let i = 0; i < buildingShadowCasters.length; i++) {
					buildingShadowCasters[i].castShadow = shadowsActive;
				}
				floorMat.needsUpdate = true;
				tabletopMapMat.needsUpdate = true;
				floorShadowMat.needsUpdate = true;
				tableShadowMat.needsUpdate = true;
				renderer.shadowMap.needsUpdate = true;
			}
			if (nextShadowQuality !== currentShadowQuality) {
				currentShadowQuality = nextShadowQuality;
				const qParams = getShadowQualityConfig(currentShadowQuality);
				sunKeyLight.shadow.mapSize.set(qParams.mapSize, qParams.mapSize);
				sunKeyLight.shadow.radius = qParams.radius;
				sunKeyLight.shadow.bias = qParams.bias;
				sunKeyLight.shadow.normalBias = qParams.normalBias;
				if (sunKeyLight.shadow.map) {
					sunKeyLight.shadow.map.dispose();
					sunKeyLight.shadow.map = null;
				}
				renderer.shadowMap.needsUpdate = true;
			}
			// Dynamically scale Tabletop & Room geometry based on user-configured dimensions
			const tableScaleX = cfg.tableWidthMeters / 3.9;
			const tableScaleZ = cfg.tableDepthMeters / 1.95;
			tableBaseMesh.scale.set(tableScaleX, 1, tableScaleZ);
			tabletopMapMesh.scale.set(tableScaleX, tableScaleZ, 1);
			tableShadowReceiver.scale.set(tableScaleX, tableScaleZ, 1);
			tableLidarPlane.scale.set(tableScaleX, tableScaleZ, 1);
			const roomScaleX = cfg.roomWidthMeters / 14;
			const roomScaleZ = cfg.roomDepthMeters / 12;
			floorMesh.scale.set(roomScaleX, roomScaleZ, 1);
			floorShadowReceiver.scale.set(roomScaleX, roomScaleZ, 1);
			floorLidarPlane.scale.set(roomScaleX, roomScaleZ, 1);
			archWallGroup.scale.set(roomScaleX, 1, 1);
			archWallGroup.position.z = THREE.MathUtils.damp(archWallGroup.position.z, -2.65 * roomScaleZ, 6, delta);
			exteriorWindowGroup.scale.set(roomScaleX, 1, 1);
			exteriorWindowGroup.position.z = THREE.MathUtils.damp(exteriorWindowGroup.position.z, -3.6 * roomScaleZ, 6, delta);
			// Update ARKit/ARCore Surface Plane Detection Grids & LiDAR Point Cloud (Tabletop & Floor)
			const showTablePlane = cfg.showDepthGrid;
			const showFloorPlane = cfg.showDepthGrid && cfg.planeDetection !== "Tylko blat stołu (Tabletop Anchor)";
			tableLidarPlane.visible = showTablePlane;
			floorLidarPlane.visible = showFloorPlane;
			lidarTablePointCloud.visible = showTablePlane;
			lidarFloorPointCloud.visible = showFloorPlane;
			lidarTablePointCloud.scale.set(tableScaleX, 1, tableScaleZ);
			lidarFloorPointCloud.scale.set(roomScaleX, 1, roomScaleZ);
			// Radial LiDAR Laser Scan Wave & Depth Grid Refresh Animation (activated on triggerScanPulse)
			if (cfg.triggerScanPulse !== lastScanTrigger) {
				lastScanTrigger = cfg.triggerScanPulse;
				scanPulseProgress = 0;
				scanRefreshsettled = false;
			}
			if (scanPulseProgress < 1) {
				scanPulseProgress = Math.min(1, scanPulseProgress + delta * .58);
				// Smooth ease-out radial expansion curve
				const easedWave = 1 - Math.pow(1 - scanPulseProgress, 2.15);
				const fadeEnvelope = Math.sin(scanPulseProgress * Math.PI);
				const tailFade = 1 - scanPulseProgress;
				// 1. Expand Tabletop Primary & Trailing Laser Rings from center (0,0,0)
				const tableRadius = .08 + easedWave * 2.35 * tableScaleX;
				scanRingMesh.scale.set(tableRadius, tableRadius, 1);
				scanRingMat.opacity = tailFade * .95;
				const trailingRadius = Math.max(.04, tableRadius * .82);
				scanTrailingRingMesh.scale.set(trailingRadius, trailingRadius, 1);
				scanTrailingRingMat.opacity = fadeEnvelope * .72;
				// 2. Expand 3D Vertical Cylindrical Laser Curtain slicing through the buildings
				const curtainRadius = .06 + easedWave * 1.95 * tableScaleX;
				scanLaserCurtainMesh.scale.set(curtainRadius, .35 + fadeEnvelope * .85, curtainRadius);
				scanLaserCurtainMat.opacity = fadeEnvelope * .28;
				// 3. Expand 3D Hemispherical LiDAR Wireframe Dome
				const domeRadius = .1 + easedWave * 2.15 * tableScaleX;
				scanDomeWireMesh.scale.set(domeRadius, domeRadius * .78, domeRadius);
				scanDomeWireMesh.rotation.y = elapsed * .85;
				scanDomeWireMat.opacity = fadeEnvelope * .34;
				// 4. Expand & Rotate 24 Radial Laser Spokes on Tabletop
				scanRadialSpokes.scale.set(tableRadius, 1, tableRadius);
				scanRadialSpokes.rotation.y = elapsed * 1.25;
				spokeMat.opacity = fadeEnvelope * .65;
				// 5. Expand Virtual Floor Radial Laser Wavefront Ring
				const floorRadius = .25 + easedWave * 5.6 * roomScaleX;
				floorScanRingMesh.scale.set(floorRadius, floorRadius, 1);
				floorScanRingMat.opacity = showFloorPlane ? tailFade * .88 : 0;
				// 6. Dynamically Refresh & Pulse Depth Grid Planes (tableLidarPlane & floorLidarPlane)
				tableLidarMat.opacity = .65 + fadeEnvelope * .32;
				floorLidarMat.opacity = .55 + fadeEnvelope * .35;
				tableLidarTex.offset.y = -easedWave * 1.5;
				floorLidarTex.offset.y = -easedWave * 2;
				// 7. Refresh Tabletop & Floor 3D LiDAR Point Clouds with radial laser wave crest
				updatePointCloudWave(lidarTableCloudData, easedWave, true);
				updatePointCloudWave(lidarFloorCloudData, easedWave, true);
				// 8. Briefly boost building wireframe luminosity as the LiDAR laser curtain scans through them
				holoWireMat.opacity = Math.min(1, holoWireMat.opacity + fadeEnvelope * .28);
			} else {
				scanRingMat.opacity = 0;
				scanTrailingRingMat.opacity = 0;
				scanLaserCurtainMat.opacity = 0;
				scanDomeWireMat.opacity = 0;
				spokeMat.opacity = 0;
				floorScanRingMat.opacity = 0;
				tableLidarMat.opacity = .65;
				floorLidarMat.opacity = .55;
				if (!scanRefreshsettled) {
					scanRefreshsettled = true;
					tableLidarTex.offset.set(0, 0);
					floorLidarTex.offset.set(0, 0);
					updatePointCloudWave(lidarTableCloudData, 1, false);
					updatePointCloudWave(lidarFloorCloudData, 1, false);
				}
			}
			// Update Foreground Depth Occlusion Objects (positioned relative to table width/depth)
			occlusionGroup.visible = cfg.showOcclusionObjects && cfg.occlusionMode !== "Wyłączona";
			occlusionGroup.scale.set(THREE.MathUtils.lerp(1, tableScaleX, .65), 1, THREE.MathUtils.lerp(1, tableScaleZ, .65));
			// Update Horizontal Rectangular Reference Image 3D Billboard
			refBillboardGroup.visible = cfg.showReferenceBillboardIn3D;
			if (cfg.customReferenceImageUrl !== currentRefImageUrl) {
				currentRefImageUrl = cfg.customReferenceImageUrl;
				loadRefBillboardTexture(currentRefImageUrl);
			}
			if (refBillboardGroup.visible) {
				refBillboardGroup.position.x = -smoothedParallaxX * .14;
				refBillboardGroup.position.y = 2.04 + Math.sin(pendulumPhase * .9) * .012 * swayAmplitudeScale;
			}
			// Update Floating Glass Screens if hudScreenStyle changed
			if (cfg.hudScreenStyle !== currentHudScreenStyle) {
				currentHudScreenStyle = cfg.hudScreenStyle;
				const isGlassUi = currentHudScreenStyle === "Szklany Panel Interaktywny (Frosted Glass UI)" || currentHudScreenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)";
				const isUltraClear98 = currentHudScreenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)";
				lavenderGemMat.opacity = isUltraClear98 ? .42 : .92;
				floatingHudItems.forEach((item) => {
					const nextTex = createFloatingHudTexture(maxAniso, item.type, currentHudScreenStyle, item.activeIconIndex);
					if (item.mat.map) item.mat.map.dispose();
					item.mat.map = nextTex;
					item.mat.opacity = isUltraClear98 ? .98 : isGlassUi ? .95 : .86;
					item.mat.blending = isGlassUi ? THREE.NormalBlending : THREE.AdditiveBlending;
					item.mat.needsUpdate = true;
				});
			}
			// Update Floating HUD Screens & their 3D Parallax Depth Shift
			hudPanelsGroup.visible = cfg.showFloatingHudPanels;
			floatingHudItems.forEach((item, idx) => {
				item.mesh.position.x = item.basePos.x * tableScaleX + smoothedParallaxX * item.parallaxDepth;
				item.mesh.position.y = item.basePos.y + Math.sin(pendulumPhase * 1.2 + idx) * .01 * swayAmplitudeScale + smoothedParallaxY * item.parallaxDepth * .5;
				if (item.holoProp) {
					item.holoProp.rotation.y = pendulumPhase * 1.1 + idx * .6;
					item.holoProp.rotation.x = Math.sin(pendulumPhase * .8 + idx) * .25;
				}
			});
			// Animate Holographic Skyscraper Clusters (Non-linear 3D placement, 9:16 horizontal complexes, 2-5 buildings, floor count)
			const floorHeightScale = cfg.buildingFloorCount / 85;
			const diagridRepeatY = Math.max(1.5, cfg.buildingFloorCount / 22 * cfg.hologramMeshDensity);
			diagridTex.repeat.set(2 * cfg.hologramMeshDensity, diagridRepeatY);
			diagridTex.offset.y = -pendulumPhase * .12;
			// Track buildingLayout preset changes to trigger a smooth holographic transition arc & lerp
			if (cfg.buildingLayout !== lastBuildingLayout) {
				lastBuildingLayout = cfg.buildingLayout;
				layoutTransitionProgress = 0;
			}
			if (layoutTransitionProgress < 1) {
				layoutTransitionProgress = Math.min(1, layoutTransitionProgress + delta * 1.65);
			}
			// Smooth sine-wave levitation arc during layout preset reconfiguration
			const layoutHoverArcY = Math.sin(layoutTransitionProgress * Math.PI) * .065;
			// Frame-rate independent lerp factor for cluster & sub-tower spatial transitions
			const clusterLerpAlpha = 1 - Math.exp(-5.2 * delta);
			const subModelLerpAlpha = 1 - Math.exp(-6.5 * delta);
			const scatter = cfg.layoutDepthScatter;
			const isMetropolisZdj2 = cfg.buildingLayout === "Metropolia Centralna (Zdj. 2 · Global Network)";
			// Animate Central Metropolis Concentric Emitter Rings & Right-Side Tabletop Smart Pad
			metropolisEmitterGroup.visible = true;
			const targetMetroRingScale = isMetropolisZdj2 ? 1.18 : .72;
			metropolisEmitterGroup.scale.x = THREE.MathUtils.lerp(metropolisEmitterGroup.scale.x, targetMetroRingScale * tableScaleX, clusterLerpAlpha);
			metropolisEmitterGroup.scale.z = THREE.MathUtils.lerp(metropolisEmitterGroup.scale.z, targetMetroRingScale * tableScaleZ, clusterLerpAlpha);
			metroEmitterRings.forEach((rMesh, rIdx) => {
				rMesh.rotation.z = pendulumPhase * (rIdx % 2 === 0 ? .35 : -.45) * (isMetropolisZdj2 ? 1.4 : .8);
			});
			metroLightColumn.material.opacity = isMetropolisZdj2 ? .14 : .04;
			tabletAndMugGroup.position.x = 1.24 * tableScaleX;
			tabletAndMugGroup.position.z = .44 * tableScaleZ;
			buildingClusters.forEach((bc, cIdx) => {
				// Compute non-linear 3D spatial placement (X, Z) so models do not stand in a single straight line
				let layoutOffsetX = bc.basePosX;
				let layoutOffsetZ = bc.basePosZ;
				let clusterRotY = 0;
				if (isMetropolisZdj2) {
					// Dense unified Central Metropolitan Skyline Island (matching zdj._2.png centerpiece)
					if (cIdx === 0) {
						layoutOffsetX = -.31;
						layoutOffsetZ = .09 * scatter;
						clusterRotY = .08;
					} else if (cIdx === 1) {
						layoutOffsetX = 0;
						layoutOffsetZ = -.02 * scatter;
						clusterRotY = 0;
					} else {
						layoutOffsetX = .31;
						layoutOffsetZ = .07 * scatter;
						clusterRotY = -.08;
					}
				} else if (cfg.buildingLayout === "Łuk Amfiteatralny (Półkole 3D)") {
					if (cIdx === 0) {
						layoutOffsetX = -1.08;
						layoutOffsetZ = .34 * scatter;
						clusterRotY = .28;
					} else if (cIdx === 1) {
						layoutOffsetX = 0;
						layoutOffsetZ = -.32 * scatter;
						clusterRotY = 0;
					} else {
						layoutOffsetX = 1.08;
						layoutOffsetZ = .34 * scatter;
						clusterRotY = -.28;
					}
				} else if (cfg.buildingLayout === "Trójkąt Centralny (Układ Delta)") {
					if (cIdx === 0) {
						layoutOffsetX = -.82;
						layoutOffsetZ = -.38 * scatter;
						clusterRotY = .35;
					} else if (cIdx === 1) {
						layoutOffsetX = 0;
						layoutOffsetZ = .42 * scatter;
						clusterRotY = 0;
					} else {
						layoutOffsetX = .82;
						layoutOffsetZ = -.38 * scatter;
						clusterRotY = -.35;
					}
				} else if (cfg.buildingLayout === "Układ Diagonalny (Kaskadowy)") {
					if (cIdx === 0) {
						layoutOffsetX = -1.12;
						layoutOffsetZ = .42 * scatter;
						clusterRotY = .22;
					} else if (cIdx === 1) {
						layoutOffsetX = 0;
						layoutOffsetZ = 0;
						clusterRotY = .15;
					} else {
						layoutOffsetX = 1.12;
						layoutOffsetZ = -.42 * scatter;
						clusterRotY = .22;
					}
				} else if (cfg.buildingLayout === "Rozrzut Urbanistyczny (Wielopłaszczyznowy)") {
					if (cIdx === 0) {
						layoutOffsetX = -.96;
						layoutOffsetZ = -.34 * scatter;
						clusterRotY = -.32;
					} else if (cIdx === 1) {
						layoutOffsetX = .14;
						layoutOffsetZ = .36 * scatter;
						clusterRotY = .24;
					} else {
						layoutOffsetX = 1.04;
						layoutOffsetZ = -.22 * scatter;
						clusterRotY = -.18;
					}
				}
				// Smoothly lerp cluster 3D position (X, Y levitation arc, Z) towards target layout coordinates
				bc.targetPosition.set(layoutOffsetX * tableScaleX, .015 + layoutHoverArcY * (1 + cIdx * .12), layoutOffsetZ * tableScaleZ);
				bc.group.position.lerp(bc.targetPosition, clusterLerpAlpha);
				// Combine layout preset rotation with subtle pendulum sway and smoothly interpolate
				const swayRotY = Math.sin(pendulumPhase * .55 + cIdx) * .025 * swayAmplitudeScale;
				const combinedClusterRotY = clusterRotY + swayRotY;
				bc.group.rotation.y = THREE.MathUtils.lerp(bc.group.rotation.y, combinedClusterRotY, clusterLerpAlpha);
				// Toggle 2 to 5 buildings per group & apply individual sub-model overrides or global 9:16 proportions
				bc.towerSubGroups.forEach((tGroup, tIdx) => {
					const subId = `${bc.clusterId}_${tIdx}`;
					const subOverride = cfg.unifiedModelAssembled ? cfg.subModelOverrides[subId] : undefined;
					if (subOverride) {
						tGroup.visible = subOverride.visible;
					} else {
						tGroup.visible = tIdx < cfg.buildingsPerGroup;
					}
					let targetScaleX = 1;
					let targetScaleZ = 1;
					let targetScaleY = floorHeightScale;
					let targetPosX = tGroup.userData.baseDx || 0;
					let targetPosZ = tGroup.userData.baseDz || 0;
					let targetRotY = 0;
					if (subOverride) {
						targetScaleX = subOverride.widthScale;
						targetScaleZ = subOverride.depthScale;
						targetScaleY = subOverride.floors / 85;
						targetPosX += subOverride.offsetX;
						targetPosZ += subOverride.offsetZ;
						targetRotY = THREE.MathUtils.degToRad(subOverride.rotationDeg);
						const coreMesh = tGroup.userData.coreMesh;
						if (coreMesh) {
							coreMesh.material = subOverride.coreType === "gold" ? holoGoldCoreMat : holoFloorSlabMat;
						}
						const shellMesh = tGroup.userData.shellMesh;
						if (shellMesh) {
							shellMesh.material = subOverride.texturePreset ? getOrCreatePresetMaterial(subOverride.texturePreset) : holoShellMat;
						}
					} else {
						const shellMesh = tGroup.userData.shellMesh;
						if (shellMesh) {
							shellMesh.material = holoShellMat;
						}
						if (cfg.modelOrientation916 === "Układ Poziomy 9:16 (Horyzontalne Kompleksy)") {
							targetScaleX = 1.65;
							targetScaleZ = .93;
							targetScaleY = floorHeightScale * .56;
						} else if (cfg.modelOrientation916 === "Hybrydowy 9:16 (Poziome Skrzydła + Wieże)") {
							if (tIdx === 0) {
								targetScaleX = 1.08;
								targetScaleZ = 1.08;
								targetScaleY = floorHeightScale;
							} else {
								targetScaleX = 1.75;
								targetScaleZ = .98;
								targetScaleY = floorHeightScale * .48;
							}
						}
					}
					_subTargetPos.set(targetPosX, 0, targetPosZ);
					tGroup.position.lerp(_subTargetPos, subModelLerpAlpha);
					tGroup.rotation.y = THREE.MathUtils.lerp(tGroup.rotation.y, targetRotY, subModelLerpAlpha);
					_subTargetScale.set(targetScaleX, targetScaleY, targetScaleZ);
					tGroup.scale.lerp(_subTargetScale, subModelLerpAlpha);
					// Highlight individual sub-model selection ring when selected
					const subSelectRing = tGroup.userData.subSelectRing;
					if (subSelectRing) {
						const isSubSelected = cfg.selectedSubModelId === subId;
						subSelectRing.material.opacity = isSubSelected ? .92 : 0;
					}
				});
				// Rotate base emitter rings (boost rotation speed smoothly during layout transitions)
				const layoutSpinBoost = 1 + Math.sin(layoutTransitionProgress * Math.PI) * 2.2;
				bc.baseRings.forEach((ring, rIdx) => {
					ring.rotation.z = pendulumPhase * (rIdx % 2 === 0 ? .5 : -.7) * layoutSpinBoost;
				});
				// Selection ring pulse
				const isSelected = cfg.selectedBuilding === bc.clusterId;
				bc.selectionRing.material.opacity = isSelected ? .85 : 0;
				// Parallax offset on internal BIM structural cores
				bc.innerCores.forEach((core) => {
					core.position.x = -smoothedParallaxX * .045;
				});
				// Smooth Exploded View separation & LOD floor-slab culling based on hologramMeshDensity
				bc.explodableLayers.forEach((layer, lIdx) => {
					const targetY = layer.baseY + cfg.explodedView * layer.explodeOffset;
					layer.mesh.position.y = THREE.MathUtils.lerp(layer.mesh.position.y, targetY, subModelLerpAlpha);
					if (lIdx > 2) {
						if (cfg.hologramMeshDensity < .75) {
							layer.mesh.visible = lIdx % 3 === 0;
						} else if (cfg.hologramMeshDensity < 1.15) {
							layer.mesh.visible = lIdx % 2 === 0;
						} else {
							layer.mesh.visible = true;
						}
					}
				});
			});
			// Animate Dynamic Window Particles outside the room's arched windows
			const posAttr = windowParticlesGeo.attributes.position;
			const isRain = cfg.windowParticles === "Cyber-Deszcz + Strumienie Danych Za Oknem";
			const speedMult = cfg.windowParticleDensity;
			const activeParticleCount = Math.min(MAX_PARTICLES, Math.max(90, Math.round(MAX_PARTICLES * (cfg.windowParticleDensity / 2))));
			windowParticlesGeo.setDrawRange(0, activeParticleCount);
			for (let i = 0; i < activeParticleCount; i++) {
				let px = posAttr.getX(i);
				let py = posAttr.getY(i);
				let pz = posAttr.getZ(i);
				if (isRain) {
					py -= particleVelocities[i * 3 + 1] * 2.6 * speedMult * delta;
					if (py < floorY) py = floorY + 4.2;
				} else {
					px += particleVelocities[i * 3] * speedMult * delta;
					py += particleVelocities[i * 3 + 1] * .65 * speedMult * delta;
					if (py > floorY + 4.2) py = floorY;
					if (px > 3.8) px = -3.8;
					if (px < -3.8) px = 3.8;
				}
				posAttr.setXYZ(i, px, py, pz);
			}
			posAttr.needsUpdate = true;
			// Update Instanced Aerial Traffic Streams behind windows
			const activeStreams = Math.min(STREAM_COUNT, Math.max(6, Math.round(STREAM_COUNT * (cfg.windowParticleDensity / 2))));
			aerialStreams.count = activeStreams;
			for (let i = 0; i < activeStreams; i++) {
				const st = streamData[i];
				st.x += st.speed * speedMult * delta;
				if (st.x > 4.2) st.x = -4.2;
				if (st.x < -4.2) st.x = 4.2;
				_dummyMatrixObj.position.set(st.x, st.y, st.z);
				_dummyMatrixObj.scale.set(cfg.windowParticleDensity, 1, 1);
				_dummyMatrixObj.updateMatrix();
				aerialStreams.setMatrixAt(i, _dummyMatrixObj.matrix);
			}
			aerialStreams.instanceMatrix.needsUpdate = true;
			// Update Aerodynamic Wind Direction & Force Vector Particles (Reacts to windowParticleDensity)
			const windForce = cfg.windowParticleDensity;
			const activeWindCount = Math.min(MAX_WIND_VECTORS, Math.max(20, Math.round(MAX_WIND_VECTORS * Math.min(1, windForce / 1.85))));
			windVectorArrows.count = activeWindCount;
			windVectorLinesGeo.setDrawRange(0, activeWindCount * 2);
			// Prevailing wind azimuth angle & dynamic gust oscillation
			const windAzimuth = -.18 + Math.sin(elapsed * .35) * (.14 + .1 * windForce);
			const baseWindDirX = Math.cos(windAzimuth);
			const baseWindDirZ = Math.sin(windAzimuth);
			// Update 3D Holographic Wind Compass & Anemometer on Tabletop Corner
			windCompassGroup.position.x = -1.55 * tableScaleX;
			windCompassGroup.position.z = .68 * tableScaleZ;
			windCompassArrowGroup.rotation.y = -windAzimuth;
			const compassScale = .78 + windForce * .28;
			windCompassArrowGroup.scale.set(compassScale, 1, compassScale);
			compassRingMesh.rotation.z += delta * windForce * 1.8;
			const windHalfSpanX = 1.85 * tableScaleX;
			const windHalfSpanZ = .92 * tableScaleZ;
			const windLinePosAttr = windVectorLinesGeo.attributes.position;
			for (let i = 0; i < activeWindCount; i++) {
				const wp = windParticlesData[i];
				// Compute aerodynamic vortex deflection around skyscraper clusters
				const distToCenter = Math.hypot(wp.x, wp.z);
				const vortexInfluence = Math.max(0, 1 - distToCenter / 1.15);
				const crossFlowZ = distToCenter > .02 ? -wp.x / distToCenter * vortexInfluence * .48 : 0;
				const updraftY = Math.sin(elapsed * 1.6 + wp.phase + wp.x * 1.4) * .14 * windForce + vortexInfluence * .18 * windForce;
				const vx = (baseWindDirX + vortexInfluence * .32) * wp.baseSpeed * (.65 + windForce * .85);
				const vy = updraftY;
				const vz = (baseWindDirZ + crossFlowZ) * wp.baseSpeed * (.65 + windForce * .85);
				wp.x += vx * delta;
				wp.y += vy * delta * .45;
				wp.z += vz * delta;
				// Wrap around tabletop aerodynamic volume bounds
				if (wp.x > windHalfSpanX) wp.x = -windHalfSpanX;
				if (wp.x < -windHalfSpanX) wp.x = windHalfSpanX;
				if (wp.z > windHalfSpanZ) wp.z = -windHalfSpanZ;
				if (wp.z < -windHalfSpanZ) wp.z = windHalfSpanZ;
				if (wp.y > 1.85) wp.y = .08;
				if (wp.y < .06) wp.y = 1.65;
				// Orient instanced vector cone along 3D velocity vector (vx, vy, vz)
				_windDirVec.set(vx, vy, vz);
				const speedMag = Math.max(.001, _windDirVec.length());
				_windDirVec.divideScalar(speedMag);
				_dummyMatrixObj.position.set(wp.x, wp.y, wp.z);
				_dummyMatrixObj.quaternion.setFromUnitVectors(_windUpAxis, _windDirVec);
				const arrowScale = .7 + windForce * .45;
				_dummyMatrixObj.scale.set(arrowScale, arrowScale * (.85 + speedMag * .25), arrowScale);
				_dummyMatrixObj.updateMatrix();
				windVectorArrows.setMatrixAt(i, _dummyMatrixObj.matrix);
				// Update vector streamline tail length proportional to wind force & local speed
				const tailLen = (.09 + .15 * windForce) * Math.min(1.8, speedMag);
				windLinePosAttr.setXYZ(i * 2, wp.x, wp.y, wp.z);
				windLinePosAttr.setXYZ(i * 2 + 1, wp.x - _windDirVec.x * tailLen, wp.y - _windDirVec.y * tailLen, wp.z - _windDirVec.z * tailLen);
			}
			windVectorArrows.instanceMatrix.needsUpdate = true;
			windLinePosAttr.needsUpdate = true;
			renderer.render(scene, camera);
			// Report live WebGL renderer metrics every ~0.5s
			fpsFrameCounter++;
			fpsAccumulator += delta;
			if (fpsAccumulator >= .5) {
				const measuredFps = Math.min(120, Math.max(1, Math.round(fpsFrameCounter / fpsAccumulator)));
				if (onMetricsRef.current) {
					onMetricsRef.current({
						measuredWebglFps: measuredFps,
						webglDrawCalls: renderer.info.render.calls,
						webglTriangles: renderer.info.render.triangles
					});
				}
				fpsFrameCounter = 0;
				fpsAccumulator = 0;
			}
			if (isSoftwareGl) afterDraw(tick);
			else frameId = requestAnimationFrame(tick);
		}
		frameId = requestAnimationFrame(tick);
		const handleResize = () => {
			if (!container) return;
			const w = container.clientWidth || window.innerWidth;
			const h = container.clientHeight || window.innerHeight;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			cancelAnimationFrame(frameId);
			clearTimeout(frameId);
			window.removeEventListener("resize", handleResize);
			renderer.domElement.removeEventListener("pointermove", handlePointerMove);
			renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
			renderer.domElement.removeEventListener("pointerup", handlePointerUp);
			controls.dispose();
			renderer.dispose();
		};
	}, []);
	return /* @__PURE__ */ _jsxDEV("div", {
		ref: canvasMountRef,
		className: "w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing",
		"aria-label": "Interaktywna symulacja 3D AR hologramowych budynków na stole konferencyjnym"
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 3065,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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R0FDcEIsT0FBTyxvQkFBb0IsVUFBVSxZQUFZO0dBQ2pELFNBQVMsV0FBVyxvQkFBb0IsZUFBZSxpQkFBaUI7R0FDeEUsU0FBUyxXQUFXLG9CQUFvQixlQUFlLGlCQUFpQjtHQUN4RSxTQUFTLFdBQVcsb0JBQW9CLGFBQWEsZUFBZTtHQUNwRSxTQUFTLFFBQVE7R0FDakIsU0FBUyxRQUFRO0VBQ25CO0NBQ0YsR0FBRyxDQUFDLENBQUM7Q0FFTCxPQUNFLHdCQUFDLE9BQUQ7RUFDRSxLQUFLO0VBQ0wsV0FBVTtFQUNWLGNBQVc7Q0FDWjs7Ozs7QUFFTCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJIb2xvQXJjaFNjZW5lLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvYWRkb25zL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanMnO1xuaW1wb3J0IHsgUm9vbUVudmlyb25tZW50IH0gZnJvbSAndGhyZWUvYWRkb25zL2Vudmlyb25tZW50cy9Sb29tRW52aXJvbm1lbnQuanMnO1xuaW1wb3J0IHtcbiAgQVJTdHVkaW9Db25maWcsXG4gIEJ1aWxkaW5nQ2x1c3RlcklkLFxuICBCdWlsZGluZ1RleHR1cmVQcmVzZXRPcHRpb24sXG4gIEh1ZFBhbmVsVHlwZSxcbiAgSHVkU2NyZWVuU3R5bGVPcHRpb24sXG4gIExpdmVSZW5kZXJlck1ldHJpY3MsXG4gIFNoYWRvd01hcFF1YWxpdHlPcHRpb24sXG59IGZyb20gJy4uL3R5cGVzL2FyU3R1ZGlvJztcbmltcG9ydCB7XG4gIGNyZWF0ZUFyY2hpdGVjdHVyYWxGYWNhZGVUZXh0dXJlLFxuICBjcmVhdGVEaWFncmlkRmFjYWRlVGV4dHVyZSxcbiAgY3JlYXRlRmxvYXRpbmdIdWRUZXh0dXJlLFxuICBjcmVhdGVMaURBUlBsYW5lR3JpZFRleHR1cmUsXG4gIGNyZWF0ZVNtYXJ0VGFibGV0VGV4dHVyZSxcbiAgY3JlYXRlV29ybGRNYXBUYWJsZVRleHR1cmUsXG59IGZyb20gJy4vcHJvY2VkdXJhbFRleHR1cmVzJztcblxuaW50ZXJmYWNlIEhvbG9BcmNoU2NlbmVQcm9wcyB7XG4gIGNvbmZpZzogQVJTdHVkaW9Db25maWc7XG4gIG9uU2VsZWN0QnVpbGRpbmc6IChpZDogQnVpbGRpbmdDbHVzdGVySWQgfCBudWxsKSA9PiB2b2lkO1xuICBvblNlbGVjdFN1Yk1vZGVsPzogKHN1Yk1vZGVsSWQ6IHN0cmluZywgY2x1c3RlcklkOiBCdWlsZGluZ0NsdXN0ZXJJZCkgPT4gdm9pZDtcbiAgb25TZWxlY3RIdWRTY3JlZW4/OiAocGFuZWxUeXBlOiBIdWRQYW5lbFR5cGUsIGFjdGl2ZUljb25JbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuICBvblVwZGF0ZU1ldHJpY3M/OiAobWV0cmljczogTGl2ZVJlbmRlcmVyTWV0cmljcykgPT4gdm9pZDtcbn1cblxuLy8gUHJlLWFsbG9jYXRlZCBtYXRoIGhlbHBlcnMgb3V0c2lkZSB0aGUgYW5pbWF0aW9uIGxvb3AgKFplcm8gR0MpXG5jb25zdCBfdGFyZ2V0Q2FtUG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF90YXJnZXRMb29rQXQgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3BvaW50ZXJOZGMgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuY29uc3QgX2R1bW15TWF0cml4T2JqID0gbmV3IFRIUkVFLk9iamVjdDNEKCk7XG5jb25zdCBfc3ViVGFyZ2V0UG9zID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9zdWJUYXJnZXRTY2FsZSA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfd2luZERpclZlYyA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5jb25zdCBfd2luZFVwQXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKDAsIDEsIDApO1xuXG4vLyBQcmUtYWxsb2NhdGVkIERheSB2cy4gTmlnaHQgTW9kZSAoRWxlY3RyaWMgQmx1ZSAmIERlZXAgVmlvbGV0KSBjb2xvciBwYWxldHRlIGNvbnN0YW50cyAoWmVybyBHQylcbmNvbnN0IF9jb2xCZ0RheSA9IG5ldyBUSFJFRS5Db2xvcigweDA2MGIxMyk7XG5jb25zdCBfY29sQmdOaWdodCA9IG5ldyBUSFJFRS5Db2xvcigweDAyMDEwYSk7XG5jb25zdCBfY29sRm9nRGF5ID0gbmV3IFRIUkVFLkNvbG9yKDB4MDgxMTFlKTtcbmNvbnN0IF9jb2xGb2dOaWdodCA9IG5ldyBUSFJFRS5Db2xvcigweDA2MDIxNik7XG5jb25zdCBfY29sU3VuRGF5ID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZiNDZiKTtcbmNvbnN0IF9jb2xTdW5OaWdodCA9IG5ldyBUSFJFRS5Db2xvcigweDYzNjZmMSk7IC8vIERlZXAgZWxlY3RyaWMgaW5kaWdvLXZpb2xldCBtb29ubGlnaHRcbmNvbnN0IF9jb2xIZW1pU2t5RGF5ID0gbmV3IFRIUkVFLkNvbG9yKDB4MzhiZGY4KTtcbmNvbnN0IF9jb2xIZW1pU2t5TmlnaHQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwMGU1ZmYpOyAvLyBFbGVjdHJpYyBibHVlXG5jb25zdCBfY29sSGVtaUdyb3VuZERheSA9IG5ldyBUSFJFRS5Db2xvcigweDFlMWIxOCk7XG5jb25zdCBfY29sSGVtaUdyb3VuZE5pZ2h0ID0gbmV3IFRIUkVFLkNvbG9yKDB4MWIwNzM2KTsgLy8gRGVlcCBub2N0dXJuYWwgdmlvbGV0XG5jb25zdCBfY29sVGFibGVDeWFuRGF5ID0gbmV3IFRIUkVFLkNvbG9yKDB4MDBlNWZmKTtcbmNvbnN0IF9jb2xUYWJsZUN5YW5OaWdodCA9IG5ldyBUSFJFRS5Db2xvcigweDAwZjBmZik7IC8vIEh5cGVyIGVsZWN0cmljIGJsdWVcbmNvbnN0IF9jb2xUYWJsZUFjY2VudERheSA9IG5ldyBUSFJFRS5Db2xvcigweGZiYmYyNCk7XG5jb25zdCBfY29sVGFibGVBY2NlbnROaWdodCA9IG5ldyBUSFJFRS5Db2xvcigweDkzMzNlYSk7IC8vIERlZXAgbmVvbiB2aW9sZXRcbmNvbnN0IF9jb2xDb3JlRGF5ID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmJiZjI0KTtcbmNvbnN0IF9jb2xDb3JlTmlnaHQgPSBuZXcgVEhSRUUuQ29sb3IoMHhjMDg0ZmMpOyAvLyBMdW1pbm91cyB2aW9sZXQgY29yZVxuY29uc3QgX2NvbENvcmVFbWlzc2l2ZURheSA9IG5ldyBUSFJFRS5Db2xvcigweGY1OWUwYik7XG5jb25zdCBfY29sQ29yZUVtaXNzaXZlTmlnaHQgPSBuZXcgVEhSRUUuQ29sb3IoMHg3YzNhZWQpOyAvLyBEZWVwIHZpb2xldCBlbWlzc2lvblxuY29uc3QgX2NvbFdpcmVEYXkgPSBuZXcgVEhSRUUuQ29sb3IoMHg3ZGQzZmMpO1xuY29uc3QgX2NvbFdpcmVOaWdodCA9IG5ldyBUSFJFRS5Db2xvcigweDAwZjVmZik7IC8vIEVsZWN0cmljIGJsdWUgd2lyZWZyYW1lXG5jb25zdCBfY29sU2xhYkRheSA9IG5ldyBUSFJFRS5Db2xvcigweDM4YmRmOCk7XG5jb25zdCBfY29sU2xhYk5pZ2h0ID0gbmV3IFRIUkVFLkNvbG9yKDB4OGI1Y2Y2KTsgLy8gTmVvbiB2aW9sZXQgZmxvb3IgcGxhdGVzXG5jb25zdCBfY29sU2hlbGxIb2xvRGF5ID0gbmV3IFRIUkVFLkNvbG9yKDB4MzhiZGY4KTtcbmNvbnN0IF9jb2xTaGVsbEhvbG9OaWdodCA9IG5ldyBUSFJFRS5Db2xvcigweDAwZjBmZik7IC8vIEVsZWN0cmljIGJsdWUgc2hlbGxcbmNvbnN0IF9jb2xTaGVsbEVtaXNzaXZlRGF5ID0gbmV3IFRIUkVFLkNvbG9yKDB4MGVhNWU5KTtcbmNvbnN0IF9jb2xTaGVsbEVtaXNzaXZlTmlnaHQgPSBuZXcgVEhSRUUuQ29sb3IoMHg2ZDI4ZDkpOyAvLyBEZWVwIG5lb24gdmlvbGV0LWJsdWUgZ2xvd1xuY29uc3QgX2NvbExlZERheSA9IG5ldyBUSFJFRS5Db2xvcigweGZkZTY4YSk7XG5jb25zdCBfY29sTGVkTmlnaHQgPSBuZXcgVEhSRUUuQ29sb3IoMHhhODU1ZjcpOyAvLyBOZW9uIHZpb2xldCBjZWlsaW5nIHN0cmlwc1xuY29uc3QgX2NvbE1hcEVtaXNzaXZlRGF5ID0gbmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKTtcbmNvbnN0IF9jb2xNYXBFbWlzc2l2ZU5pZ2h0ID0gbmV3IFRIUkVFLkNvbG9yKDB4YTViNGZjKTsgLy8gTm9jdHVybmFsIGVsZWN0cmljIGJsdWUtdmlvbGV0IG1hcCB0aW50XG5jb25zdCBfY29sRmxvb3JEYXkgPSBuZXcgVEhSRUUuQ29sb3IoMHgxNjIwMmUpO1xuY29uc3QgX2NvbEZsb29yTmlnaHQgPSBuZXcgVEhSRUUuQ29sb3IoMHgwODA3MTYpO1xuY29uc3QgX2NvbFNpbGhvdWV0dGVFbWlzc2l2ZURheSA9IG5ldyBUSFJFRS5Db2xvcigweDBmMTcyYSk7XG5jb25zdCBfY29sU2lsaG91ZXR0ZUVtaXNzaXZlTmlnaHQgPSBuZXcgVEhSRUUuQ29sb3IoMHgzYjA3NjQpO1xuXG5jb25zdCBDQU1FUkFfUFJFU0VUUzogUmVjb3JkPFxuICBBUlN0dWRpb0NvbmZpZ1snY2FtZXJhUHJlc2V0J10sXG4gIHsgcG9zOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07IHRhcmdldDogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIH1cbj4gPSB7XG4gIG92ZXJ2aWV3OiB7IHBvczogWzAsIDEuNDgsIDMuNjVdLCB0YXJnZXQ6IFswLCAwLjUyLCAtMC4yXSB9LFxuICB0YWJsZXRvcF9jbG9zZTogeyBwb3M6IFswLjM1LCAxLjAyLCAyLjI1XSwgdGFyZ2V0OiBbMCwgMC41NSwgMF0gfSxcbiAgd2luZG93X3BhcmFsbGF4OiB7IHBvczogWy0xLjQ1LCAwLjkyLCAyLjg1XSwgdGFyZ2V0OiBbMC4yNSwgMC42OCwgLTEuMl0gfSxcbiAgZmxvb3JfbGlkYXI6IHsgcG9zOiBbMi4xNSwgMS44NSwgMy40NV0sIHRhcmdldDogWzAsIDAuMTUsIC0wLjNdIH0sXG59O1xuXG5mdW5jdGlvbiBnZXRTaGFkb3dRdWFsaXR5Q29uZmlnKHF1YWxpdHk6IFNoYWRvd01hcFF1YWxpdHlPcHRpb24pOiB7XG4gIG1hcFNpemU6IG51bWJlcjtcbiAgcmFkaXVzOiBudW1iZXI7XG4gIGJpYXM6IG51bWJlcjtcbiAgbm9ybWFsQmlhczogbnVtYmVyO1xufSB7XG4gIHN3aXRjaCAocXVhbGl0eSkge1xuICAgIGNhc2UgJ05pc2thICg1MTLDlzUxMiDCtyBNb2JpbGUgRmFzdCknOlxuICAgICAgcmV0dXJuIHsgbWFwU2l6ZTogNTEyLCByYWRpdXM6IDIuMiwgYmlhczogLTAuMDAwOCwgbm9ybWFsQmlhczogMC4wMyB9O1xuICAgIGNhc2UgJ8WacmVkbmlhICgxMDI0w5cxMDI0IMK3IFN0YW5kYXJkIEFSKSc6XG4gICAgICByZXR1cm4geyBtYXBTaXplOiAxMDI0LCByYWRpdXM6IDEuNCwgYmlhczogLTAuMDAwNSwgbm9ybWFsQmlhczogMC4wMjIgfTtcbiAgICBjYXNlICdVbHRyYSAoNDA5NsOXNDA5NiDCtyBTdHVkaW8gQklNKSc6XG4gICAgICByZXR1cm4geyBtYXBTaXplOiA0MDk2LCByYWRpdXM6IDAuNiwgYmlhczogLTAuMDAwMiwgbm9ybWFsQmlhczogMC4wMSB9O1xuICAgIGNhc2UgJ1d5c29rYSAoMjA0OMOXMjA0OCDCtyBDcmlzcCBQQ0YpJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHsgbWFwU2l6ZTogMjA0OCwgcmFkaXVzOiAxLjAsIGJpYXM6IC0wLjAwMDM1LCBub3JtYWxCaWFzOiAwLjAxNiB9O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBIb2xvQXJjaFNjZW5lOiBSZWFjdC5GQzxIb2xvQXJjaFNjZW5lUHJvcHM+ID0gKHtcbiAgY29uZmlnLFxuICBvblNlbGVjdEJ1aWxkaW5nLFxuICBvblNlbGVjdFN1Yk1vZGVsLFxuICBvblNlbGVjdEh1ZFNjcmVlbixcbiAgb25VcGRhdGVNZXRyaWNzLFxufSkgPT4ge1xuICBjb25zdCBjYW52YXNNb3VudFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudD4obnVsbCk7XG4gIGNvbnN0IGNvbmZpZ1JlZiA9IHVzZVJlZjxBUlN0dWRpb0NvbmZpZz4oY29uZmlnKTtcbiAgY29uc3Qgb25TZWxlY3RSZWYgPSB1c2VSZWYob25TZWxlY3RCdWlsZGluZyk7XG4gIGNvbnN0IG9uU2VsZWN0U3ViTW9kZWxSZWYgPSB1c2VSZWYob25TZWxlY3RTdWJNb2RlbCk7XG4gIGNvbnN0IG9uU2VsZWN0SHVkUmVmID0gdXNlUmVmKG9uU2VsZWN0SHVkU2NyZWVuKTtcbiAgY29uc3Qgb25NZXRyaWNzUmVmID0gdXNlUmVmKG9uVXBkYXRlTWV0cmljcyk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25maWdSZWYuY3VycmVudCA9IGNvbmZpZztcbiAgfSwgW2NvbmZpZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25TZWxlY3RSZWYuY3VycmVudCA9IG9uU2VsZWN0QnVpbGRpbmc7XG4gIH0sIFtvblNlbGVjdEJ1aWxkaW5nXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBvblNlbGVjdFN1Yk1vZGVsUmVmLmN1cnJlbnQgPSBvblNlbGVjdFN1Yk1vZGVsO1xuICB9LCBbb25TZWxlY3RTdWJNb2RlbF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgb25TZWxlY3RIdWRSZWYuY3VycmVudCA9IG9uU2VsZWN0SHVkU2NyZWVuO1xuICB9LCBbb25TZWxlY3RIdWRTY3JlZW5dKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uTWV0cmljc1JlZi5jdXJyZW50ID0gb25VcGRhdGVNZXRyaWNzO1xuICB9LCBbb25VcGRhdGVNZXRyaWNzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjb250YWluZXIgPSBjYW52YXNNb3VudFJlZi5jdXJyZW50O1xuICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XG5cbiAgICAvLyAxLiBTb2Z0d2FyZSBXZWJHTCBHdWFyZCAoVGhyZWUuanMgcjE2MCsgQmVzdCBQcmFjdGljZSlcbiAgICBjb25zdCBpc1NvZnR3YXJlR2wgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgZ2wgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0KCd3ZWJnbDInKTtcbiAgICAgIGlmICghZ2wpIHJldHVybiB0cnVlO1xuICAgICAgY29uc3QgZXh0ID0gZ2wuZ2V0RXh0ZW5zaW9uKCdXRUJHTF9kZWJ1Z19yZW5kZXJlcl9pbmZvJyk7XG4gICAgICBjb25zdCBwYXJhbSA9IGV4dCA/IGV4dC5VTk1BU0tFRF9SRU5ERVJFUl9XRUJHTCA6IGdsLlJFTkRFUkVSO1xuICAgICAgY29uc3QgZ3B1ID0gU3RyaW5nKGdsLmdldFBhcmFtZXRlcihwYXJhbSkpO1xuICAgICAgZ2wuZ2V0RXh0ZW5zaW9uKCdXRUJHTF9sb3NlX2NvbnRleHQnKT8ubG9zZUNvbnRleHQoKTtcbiAgICAgIHJldHVybiAvU3dpZnRTaGFkZXJ8bGx2bXBpcGV8c29mdHBpcGV8U29mdHdhcmV8QmFzaWMgUmVuZGVyL2kudGVzdChncHUpO1xuICAgIH0pKCk7XG5cbiAgICBjb25zdCB3aWR0aCA9IGNvbnRhaW5lci5jbGllbnRXaWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBjb250YWluZXIuY2xpZW50SGVpZ2h0IHx8IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgIGxldCBjdXJyZW50U2hhZG93c0VuYWJsZWQgPVxuICAgICAgY29uZmlnUmVmLmN1cnJlbnQuZW5hYmxlQnVpbGRpbmdTaGFkb3dzID8/IHRydWU7XG4gICAgbGV0IGN1cnJlbnRTaGFkb3dRdWFsaXR5OiBTaGFkb3dNYXBRdWFsaXR5T3B0aW9uID1cbiAgICAgIGNvbmZpZ1JlZi5jdXJyZW50LnNoYWRvd01hcFF1YWxpdHkgfHwgJ1d5c29rYSAoMjA0OMOXMjA0OCDCtyBDcmlzcCBQQ0YpJztcbiAgICBjb25zdCBpbml0aWFsU2hhZG93UGFyYW1zID0gZ2V0U2hhZG93UXVhbGl0eUNvbmZpZyhjdXJyZW50U2hhZG93UXVhbGl0eSk7XG5cbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGFudGlhbGlhczogIWlzU29mdHdhcmVHbCxcbiAgICAgIHBvd2VyUHJlZmVyZW5jZTogJ2hpZ2gtcGVyZm9ybWFuY2UnLFxuICAgIH0pO1xuICAgIHJlbmRlcmVyLm91dHB1dENvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgICByZW5kZXJlci50b25lTWFwcGluZyA9IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZztcbiAgICByZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlID0gMS4xNTtcbiAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKGlzU29mdHdhcmVHbCA/IDEgOiBNYXRoLm1pbih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgMikpO1xuICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSAhaXNTb2Z0d2FyZUdsICYmIGN1cnJlbnRTaGFkb3dzRW5hYmxlZDtcbiAgICByZW5kZXJlci5zaGFkb3dNYXAudHlwZSA9IFRIUkVFLlBDRlNvZnRTaGFkb3dNYXA7XG5cbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuXG4gICAgY29uc3Qgc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKDB4MDYwYjEzKTtcbiAgICBjb25zdCBhdG1vc3BoZXJpY0ZvZyA9IG5ldyBUSFJFRS5Gb2dFeHAyKFxuICAgICAgMHgwODExMWUsXG4gICAgICBjb25maWdSZWYuY3VycmVudC5lbmFibGVBdG1vc3BoZXJpY0ZvZyA/IDAuMDY1IDogMC4wXG4gICAgKTtcbiAgICBzY2VuZS5mb2cgPSBhdG1vc3BoZXJpY0ZvZztcblxuICAgIC8vIDIuIE1hbmRhdG9yeSBTdHVkaW8gRW52aXJvbm1lbnQgUmVmbGVjdGlvbiAoUm9vbUVudmlyb25tZW50KVxuICAgIGNvbnN0IHBtcmVtR2VuZXJhdG9yID0gbmV3IFRIUkVFLlBNUkVNR2VuZXJhdG9yKHJlbmRlcmVyKTtcbiAgICBzY2VuZS5lbnZpcm9ubWVudCA9IHBtcmVtR2VuZXJhdG9yLmZyb21TY2VuZShcbiAgICAgIG5ldyBSb29tRW52aXJvbm1lbnQoKSxcbiAgICAgIDAuMDRcbiAgICApLnRleHR1cmU7XG4gICAgcG1yZW1HZW5lcmF0b3IuZGlzcG9zZSgpO1xuXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDQ2LCB3aWR0aCAvIGhlaWdodCwgMC4xLCA2MCk7XG4gICAgY2FtZXJhLnBvc2l0aW9uLnNldCgwLCAxLjQ4LCAzLjY1KTtcblxuICAgIGNvbnN0IGNvbnRyb2xzID0gbmV3IE9yYml0Q29udHJvbHMoY2FtZXJhLCByZW5kZXJlci5kb21FbGVtZW50KTtcbiAgICBjb250cm9scy50YXJnZXQuc2V0KDAsIDAuNTIsIC0wLjIpO1xuICAgIGNvbnRyb2xzLmVuYWJsZURhbXBpbmcgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGNvbnRyb2xzLmRhbXBpbmdGYWN0b3IgPSAwLjA2O1xuICAgIGNvbnRyb2xzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJICogMC41NjtcbiAgICBjb250cm9scy5taW5EaXN0YW5jZSA9IDEuNDtcbiAgICBjb250cm9scy5tYXhEaXN0YW5jZSA9IDYuODtcblxuICAgIGxldCB1c2VyRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBsZXQgYWN0aXZlUHJlc2V0VHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgIGxldCBsYXN0UHJlc2V0ID0gY29uZmlnUmVmLmN1cnJlbnQuY2FtZXJhUHJlc2V0O1xuICAgIGxldCBsYXN0QnVpbGRpbmdMYXlvdXQgPSBjb25maWdSZWYuY3VycmVudC5idWlsZGluZ0xheW91dDtcbiAgICBsZXQgbGF5b3V0VHJhbnNpdGlvblByb2dyZXNzID0gMS4wO1xuXG4gICAgY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignc3RhcnQnLCAoKSA9PiB7XG4gICAgICB1c2VyRHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgYWN0aXZlUHJlc2V0VHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgIH0pO1xuICAgIGNvbnRyb2xzLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZCcsICgpID0+IHtcbiAgICAgIHVzZXJEcmFnZ2luZyA9IGZhbHNlO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbWF4QW5pc28gPSByZW5kZXJlci5jYXBhYmlsaXRpZXMuZ2V0TWF4QW5pc290cm9weSgpO1xuXG4gICAgLy8gMy4gU3R1ZGlvICYgRW52aXJvbm1lbnRhbCBMaWdodGluZyBSaWdcbiAgICBjb25zdCBoZW1pTGlnaHQgPSBuZXcgVEhSRUUuSGVtaXNwaGVyZUxpZ2h0KDB4MzhiZGY4LCAweDFlMWIxOCwgMC43NSk7XG4gICAgc2NlbmUuYWRkKGhlbWlMaWdodCk7XG5cbiAgICAvLyBXYXJtIGdvbGRlbiBzdW5zZXQga2V5IGxpZ2h0IGVudGVyaW5nIHRocm91Z2ggdGhlIGFyY2hlZCB3aW5kb3dzIChjYXN0cyBidWlsZGluZyBzaGFkb3dzIG9udG8gdmlydHVhbCBmbG9vciAmIHRhYmxldG9wKVxuICAgIGNvbnN0IHN1bktleUxpZ2h0ID0gbmV3IFRIUkVFLkRpcmVjdGlvbmFsTGlnaHQoMHhmZmI0NmIsIDEuODUpO1xuICAgIHN1bktleUxpZ2h0LnBvc2l0aW9uLnNldCgyLjIsIDMuOCwgLTQuMik7XG4gICAgc3VuS2V5TGlnaHQuY2FzdFNoYWRvdyA9ICFpc1NvZnR3YXJlR2wgJiYgY3VycmVudFNoYWRvd3NFbmFibGVkO1xuICAgIHN1bktleUxpZ2h0LnNoYWRvdy5tYXBTaXplLnNldChcbiAgICAgIGluaXRpYWxTaGFkb3dQYXJhbXMubWFwU2l6ZSxcbiAgICAgIGluaXRpYWxTaGFkb3dQYXJhbXMubWFwU2l6ZVxuICAgICk7XG4gICAgc3VuS2V5TGlnaHQuc2hhZG93LnJhZGl1cyA9IGluaXRpYWxTaGFkb3dQYXJhbXMucmFkaXVzO1xuICAgIHN1bktleUxpZ2h0LnNoYWRvdy5jYW1lcmEubmVhciA9IDAuNTtcbiAgICBzdW5LZXlMaWdodC5zaGFkb3cuY2FtZXJhLmZhciA9IDE2O1xuICAgIGNvbnN0IGQgPSA0LjY7XG4gICAgc3VuS2V5TGlnaHQuc2hhZG93LmNhbWVyYS5sZWZ0ID0gLWQ7XG4gICAgc3VuS2V5TGlnaHQuc2hhZG93LmNhbWVyYS5yaWdodCA9IGQ7XG4gICAgc3VuS2V5TGlnaHQuc2hhZG93LmNhbWVyYS50b3AgPSBkO1xuICAgIHN1bktleUxpZ2h0LnNoYWRvdy5jYW1lcmEuYm90dG9tID0gLWQ7XG4gICAgc3VuS2V5TGlnaHQuc2hhZG93LmJpYXMgPSBpbml0aWFsU2hhZG93UGFyYW1zLmJpYXM7XG4gICAgc3VuS2V5TGlnaHQuc2hhZG93Lm5vcm1hbEJpYXMgPSBpbml0aWFsU2hhZG93UGFyYW1zLm5vcm1hbEJpYXM7XG4gICAgc2NlbmUuYWRkKHN1bktleUxpZ2h0KTtcblxuICAgIC8vIEhvbG9ncmFwaGljIHRhYmxlIHVwd2FyZCBjeWFuIGZpbGwgbGlnaHRcbiAgICBjb25zdCB0YWJsZUN5YW5MaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4MDBlNWZmLCAyLjQsIDUuNSk7XG4gICAgdGFibGVDeWFuTGlnaHQucG9zaXRpb24uc2V0KDAsIDAuNDUsIDApO1xuICAgIHNjZW5lLmFkZCh0YWJsZUN5YW5MaWdodCk7XG5cbiAgICBjb25zdCB0YWJsZUdvbGRMaWdodCA9IG5ldyBUSFJFRS5Qb2ludExpZ2h0KDB4ZmJiZjI0LCAxLjUsIDQuMCk7XG4gICAgdGFibGVHb2xkTGlnaHQucG9zaXRpb24uc2V0KDAsIDAuOSwgMCk7XG4gICAgc2NlbmUuYWRkKHRhYmxlR29sZExpZ2h0KTtcblxuICAgIC8vIDQuIFJvb20gRmxvb3IgJiBBUktpdC9BUkNvcmUgRmxvb3IgU3VyZmFjZSBQbGFuZSBEZXRlY3Rpb24gKFkgPSAtMC44MilcbiAgICBjb25zdCBmbG9vclkgPSAtMC44MjtcbiAgICBjb25zdCBmbG9vckdlbyA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KDE2LCAxNCk7XG4gICAgY29uc3QgZmxvb3JNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MTYyMDJlLFxuICAgICAgcm91Z2huZXNzOiAwLjMsXG4gICAgICBtZXRhbG5lc3M6IDAuNDIsXG4gICAgfSk7XG4gICAgY29uc3QgZmxvb3JNZXNoID0gbmV3IFRIUkVFLk1lc2goZmxvb3JHZW8sIGZsb29yTWF0KTtcbiAgICBmbG9vck1lc2gucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICBmbG9vck1lc2gucG9zaXRpb24ueSA9IGZsb29yWTtcbiAgICBmbG9vck1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG4gICAgc2NlbmUuYWRkKGZsb29yTWVzaCk7XG5cbiAgICAvLyBEZWRpY2F0ZWQgVmlydHVhbCBGbG9vciBTaGFkb3cgQ2F0Y2hlciBQbGFuZSAocHJvamVjdHMgY3Jpc3AgUENGIGJ1aWxkaW5nIHNoYWRvd3Mgb250byB0aGUgdmlydHVhbCBmbG9vcilcbiAgICBjb25zdCBmbG9vclNoYWRvd01hdCA9IG5ldyBUSFJFRS5TaGFkb3dNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgwMjA2MTcsXG4gICAgICBvcGFjaXR5OiAwLjc0LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBmbG9vclNoYWRvd1JlY2VpdmVyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxNiwgMTQpLFxuICAgICAgZmxvb3JTaGFkb3dNYXRcbiAgICApO1xuICAgIGZsb29yU2hhZG93UmVjZWl2ZXIucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICBmbG9vclNoYWRvd1JlY2VpdmVyLnBvc2l0aW9uLnkgPSBmbG9vclkgKyAwLjAwNDtcbiAgICBmbG9vclNoYWRvd1JlY2VpdmVyLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgIGZsb29yU2hhZG93UmVjZWl2ZXIudmlzaWJsZSA9ICFpc1NvZnR3YXJlR2wgJiYgY3VycmVudFNoYWRvd3NFbmFibGVkO1xuICAgIHNjZW5lLmFkZChmbG9vclNoYWRvd1JlY2VpdmVyKTtcblxuICAgIGNvbnN0IGZsb29yTGlkYXJUZXggPSBjcmVhdGVMaURBUlBsYW5lR3JpZFRleHR1cmUobWF4QW5pc28sIGZhbHNlKTtcbiAgICBmbG9vckxpZGFyVGV4LnJlcGVhdC5zZXQoNSwgNCk7XG4gICAgY29uc3QgZmxvb3JMaWRhck1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICBtYXA6IGZsb29yTGlkYXJUZXgsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuNTUsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIHBvbHlnb25PZmZzZXQ6IHRydWUsXG4gICAgICBwb2x5Z29uT2Zmc2V0RmFjdG9yOiAtMSxcbiAgICAgIHBvbHlnb25PZmZzZXRVbml0czogLTEsXG4gICAgfSk7XG4gICAgY29uc3QgZmxvb3JMaWRhclBsYW5lID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSg5LjIsIDYuNCksXG4gICAgICBmbG9vckxpZGFyTWF0XG4gICAgKTtcbiAgICBmbG9vckxpZGFyUGxhbmUucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICBmbG9vckxpZGFyUGxhbmUucG9zaXRpb24uc2V0KDAsIGZsb29yWSArIDAuMDE1LCAwLjIpO1xuICAgIHNjZW5lLmFkZChmbG9vckxpZGFyUGxhbmUpO1xuXG4gICAgLy8gNS4gQ29uZmVyZW5jZSBUYWJsZSAmIFRhYmxldG9wIFN1cmZhY2UgUGxhbmUgRGV0ZWN0aW9uIChZID0gMC4wMClcbiAgICBjb25zdCB0YWJsZUdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgc2NlbmUuYWRkKHRhYmxlR3JvdXApO1xuXG4gICAgY29uc3QgdGFibGVXaWR0aCA9IDMuOTtcbiAgICBjb25zdCB0YWJsZURlcHRoID0gMS45NTtcblxuICAgIC8vIEJydXNoZWQgbWV0YWxsaWMgY2hhbWZlcmVkIHRhYmxlIGJhc2VcbiAgICBjb25zdCB0YWJsZUh1bGxNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MGYxNzJhLFxuICAgICAgcm91Z2huZXNzOiAwLjMyLFxuICAgICAgbWV0YWxuZXNzOiAwLjg1LFxuICAgIH0pO1xuICAgIGNvbnN0IHRhYmxlQmFzZU1lc2ggPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSh0YWJsZVdpZHRoICsgMC4xNCwgMC4wOSwgdGFibGVEZXB0aCArIDAuMTQpLFxuICAgICAgdGFibGVIdWxsTWF0XG4gICAgKTtcbiAgICB0YWJsZUJhc2VNZXNoLnBvc2l0aW9uLnkgPSAtMC4wNTtcbiAgICAvLyBBbGxvdyBidWlsZGluZyBzaGFkb3dzIHRvIHByb2plY3QgYWxsIHRoZSB3YXkgb250byB0aGUgdmlydHVhbCBmbG9vciB3aXRob3V0IHRoZSBzb2xpZCB0YWJsZSBodWxsIG1hc2tpbmcgdGhlbVxuICAgIHRhYmxlQmFzZU1lc2guY2FzdFNoYWRvdyA9IGZhbHNlO1xuICAgIHRhYmxlQmFzZU1lc2gucmVjZWl2ZVNoYWRvdyA9IHRydWU7XG4gICAgdGFibGVHcm91cC5hZGQodGFibGVCYXNlTWVzaCk7XG5cbiAgICAvLyBUd2luIHN0cnVjdHVyYWwgcGVkZXN0YWxzIGNvbm5lY3RpbmcgdGFibGUgdG8gZmxvb3JcbiAgICBjb25zdCBwZWRlc3RhbE1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgxZTI5M2IsXG4gICAgICByb3VnaG5lc3M6IDAuNSxcbiAgICAgIG1ldGFsbmVzczogMC43LFxuICAgIH0pO1xuICAgIFstMS4xNSwgMS4xNV0uZm9yRWFjaCgocHgpID0+IHtcbiAgICAgIGNvbnN0IHBlZCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjE4LCAwLjI2LCBNYXRoLmFicyhmbG9vclkpIC0gMC4wNSwgMjQpLFxuICAgICAgICBwZWRlc3RhbE1hdFxuICAgICAgKTtcbiAgICAgIHBlZC5wb3NpdGlvbi5zZXQocHgsIGZsb29yWSAvIDIgLSAwLjAyLCAwKTtcbiAgICAgIHRhYmxlR3JvdXAuYWRkKHBlZCk7XG4gICAgfSk7XG5cbiAgICAvLyBHbG93aW5nIFdvcmxkIE1hcCArIEJvdHRvbSBUZWxlbWV0cnkgQ29uc29sZSBTdXJmYWNlIG9uIFRhYmxldG9wXG4gICAgY29uc3Qgd29ybGRNYXBUZXggPSBjcmVhdGVXb3JsZE1hcFRhYmxlVGV4dHVyZShtYXhBbmlzbyk7XG4gICAgY29uc3QgdGFibGV0b3BNYXBNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgbWFwOiB3b3JsZE1hcFRleCxcbiAgICAgIGVtaXNzaXZlTWFwOiB3b3JsZE1hcFRleCxcbiAgICAgIGVtaXNzaXZlOiBuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpLFxuICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuOTIsXG4gICAgICByb3VnaG5lc3M6IDAuMTIsXG4gICAgICBtZXRhbG5lc3M6IDAuNjUsXG4gICAgfSk7XG4gICAgY29uc3QgdGFibGV0b3BNYXBNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSh0YWJsZVdpZHRoLCB0YWJsZURlcHRoKSxcbiAgICAgIHRhYmxldG9wTWFwTWF0XG4gICAgKTtcbiAgICB0YWJsZXRvcE1hcE1lc2gucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICB0YWJsZXRvcE1hcE1lc2gucG9zaXRpb24ueSA9IDAuMDAyO1xuICAgIHRhYmxldG9wTWFwTWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcbiAgICB0YWJsZUdyb3VwLmFkZCh0YWJsZXRvcE1hcE1lc2gpO1xuXG4gICAgLy8gVGFibGV0b3AgU2hhZG93IFJlY2VpdmVyIE92ZXJsYXkgKHNvIGJ1aWxkaW5nIHNoYWRvd3MgYXJlIGFsc28gdmlzaWJsZSBhY3Jvc3MgdGhlIGlsbHVtaW5hdGVkIHdvcmxkIG1hcClcbiAgICBjb25zdCB0YWJsZVNoYWRvd01hdCA9IG5ldyBUSFJFRS5TaGFkb3dNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgwMjA2MTcsXG4gICAgICBvcGFjaXR5OiAwLjU0LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCB0YWJsZVNoYWRvd1JlY2VpdmVyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSh0YWJsZVdpZHRoLCB0YWJsZURlcHRoKSxcbiAgICAgIHRhYmxlU2hhZG93TWF0XG4gICAgKTtcbiAgICB0YWJsZVNoYWRvd1JlY2VpdmVyLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgdGFibGVTaGFkb3dSZWNlaXZlci5wb3NpdGlvbi55ID0gMC4wMDU7XG4gICAgdGFibGVTaGFkb3dSZWNlaXZlci5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcbiAgICB0YWJsZVNoYWRvd1JlY2VpdmVyLnZpc2libGUgPSAhaXNTb2Z0d2FyZUdsICYmIGN1cnJlbnRTaGFkb3dzRW5hYmxlZDtcbiAgICB0YWJsZUdyb3VwLmFkZCh0YWJsZVNoYWRvd1JlY2VpdmVyKTtcblxuICAgIC8vIEFSS2l0IC8gQVJDb3JlIFRhYmxldG9wIFBsYW5lIERldGVjdGlvbiBNZXNoIChZID0gKzAuMDEyKVxuICAgIGNvbnN0IHRhYmxlTGlkYXJUZXggPSBjcmVhdGVMaURBUlBsYW5lR3JpZFRleHR1cmUobWF4QW5pc28sIHRydWUpO1xuICAgIHRhYmxlTGlkYXJUZXgucmVwZWF0LnNldCgzLCAxLjUpO1xuICAgIGNvbnN0IHRhYmxlTGlkYXJNYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgbWFwOiB0YWJsZUxpZGFyVGV4LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjY1LFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgIHBvbHlnb25PZmZzZXQ6IHRydWUsXG4gICAgICBwb2x5Z29uT2Zmc2V0RmFjdG9yOiAtMixcbiAgICAgIHBvbHlnb25PZmZzZXRVbml0czogLTIsXG4gICAgfSk7XG4gICAgY29uc3QgdGFibGVMaWRhclBsYW5lID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSh0YWJsZVdpZHRoIC0gMC4wOCwgdGFibGVEZXB0aCAtIDAuMDgpLFxuICAgICAgdGFibGVMaWRhck1hdFxuICAgICk7XG4gICAgdGFibGVMaWRhclBsYW5lLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgdGFibGVMaWRhclBsYW5lLnBvc2l0aW9uLnkgPSAwLjAxMjtcbiAgICB0YWJsZUdyb3VwLmFkZCh0YWJsZUxpZGFyUGxhbmUpO1xuXG4gICAgLy8gNWEuIE11bHRpLUxheWVyZWQgUmFkaWFsIExpREFSIExhc2VyIFNjYW4gV2F2ZSAoVGFibGV0b3AsIDNEIEJ1aWxkaW5nIFZvbHVtZSAmIFZpcnR1YWwgRmxvb3IpXG4gICAgY29uc3QgbGlkYXJTY2FuV2F2ZUdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgdGFibGVHcm91cC5hZGQobGlkYXJTY2FuV2F2ZUdyb3VwKTtcblxuICAgIC8vIFByaW1hcnkgaGlnaC1pbnRlbnNpdHkgcmFkaWFsIGxhc2VyIHdhdmVmcm9udCByaW5nIG9uIHRhYmxldG9wXG4gICAgY29uc3Qgc2NhblJpbmdHZW8gPSBuZXcgVEhSRUUuUmluZ0dlb21ldHJ5KDAuOTMsIDEuMCwgOTYpO1xuICAgIGNvbnN0IHNjYW5SaW5nTWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweDAwZmZjYyxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC4wLFxuICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3Qgc2NhblJpbmdNZXNoID0gbmV3IFRIUkVFLk1lc2goc2NhblJpbmdHZW8sIHNjYW5SaW5nTWF0KTtcbiAgICBzY2FuUmluZ01lc2gucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICBzY2FuUmluZ01lc2gucG9zaXRpb24ueSA9IDAuMDE5O1xuICAgIGxpZGFyU2NhbldhdmVHcm91cC5hZGQoc2NhblJpbmdNZXNoKTtcblxuICAgIC8vIFNlY29uZGFyeSB0cmFpbGluZyBoYXJtb25pYyBsYXNlciBlY2hvIHJpbmcgb24gdGFibGV0b3BcbiAgICBjb25zdCBzY2FuVHJhaWxpbmdSaW5nTWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweDM4YmRmOCxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC4wLFxuICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3Qgc2NhblRyYWlsaW5nUmluZ01lc2ggPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5SaW5nR2VvbWV0cnkoMC43NCwgMC44OCwgOTYpLFxuICAgICAgc2NhblRyYWlsaW5nUmluZ01hdFxuICAgICk7XG4gICAgc2NhblRyYWlsaW5nUmluZ01lc2gucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICBzY2FuVHJhaWxpbmdSaW5nTWVzaC5wb3NpdGlvbi55ID0gMC4wMTc7XG4gICAgbGlkYXJTY2FuV2F2ZUdyb3VwLmFkZChzY2FuVHJhaWxpbmdSaW5nTWVzaCk7XG5cbiAgICAvLyAzRCBWZXJ0aWNhbCBDeWxpbmRyaWNhbCBMYXNlciBDdXJ0YWluIHNsaWNpbmcgcmFkaWFsbHkgdGhyb3VnaCB0aGUgc2t5c2NyYXBlciBjbHVzdGVyc1xuICAgIGNvbnN0IHNjYW5MYXNlckN1cnRhaW5NYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MDBmNWQ0LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjAsXG4gICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBzY2FuTGFzZXJDdXJ0YWluTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMS4wLCAxLjAsIDEuNzUsIDY0LCAxLCB0cnVlKSxcbiAgICAgIHNjYW5MYXNlckN1cnRhaW5NYXRcbiAgICApO1xuICAgIHNjYW5MYXNlckN1cnRhaW5NZXNoLnBvc2l0aW9uLnkgPSAwLjg3NTtcbiAgICBsaWRhclNjYW5XYXZlR3JvdXAuYWRkKHNjYW5MYXNlckN1cnRhaW5NZXNoKTtcblxuICAgIC8vIDNEIEhlbWlzcGhlcmljYWwgVG9GIC8gTGlEQVIgRG9tZSBXaXJlZnJhbWUgV2F2ZSBleHBhbmRpbmcgZnJvbSB0aGUgbW9kZWwgY2VudGVyXG4gICAgY29uc3Qgc2NhbkRvbWVXaXJlTWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweDM4YmRmOCxcbiAgICAgIHdpcmVmcmFtZTogdHJ1ZSxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC4wLFxuICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBzY2FuRG9tZVdpcmVNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoXG4gICAgICAgIDEuMCxcbiAgICAgICAgMjgsXG4gICAgICAgIDE0LFxuICAgICAgICAwLFxuICAgICAgICBNYXRoLlBJICogMixcbiAgICAgICAgMCxcbiAgICAgICAgTWF0aC5QSSAqIDAuNVxuICAgICAgKSxcbiAgICAgIHNjYW5Eb21lV2lyZU1hdFxuICAgICk7XG4gICAgc2NhbkRvbWVXaXJlTWVzaC5wb3NpdGlvbi55ID0gMC4wMTU7XG4gICAgbGlkYXJTY2FuV2F2ZUdyb3VwLmFkZChzY2FuRG9tZVdpcmVNZXNoKTtcblxuICAgIC8vIDI0IFJhZGlhbCBMYXNlciBTcG9rZXMgcmFkaWF0aW5nIGZyb20gbW9kZWwgY2VudGVyICgwLCAwLjAyLCAwKSB0byB0aGUgZXhwYW5kaW5nIGxhc2VyIHJpbmdcbiAgICBjb25zdCBTUE9LRV9DT1VOVCA9IDI0O1xuICAgIGNvbnN0IHNwb2tlUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShTUE9LRV9DT1VOVCAqIDYpO1xuICAgIGZvciAobGV0IHMgPSAwOyBzIDwgU1BPS0VfQ09VTlQ7IHMrKykge1xuICAgICAgY29uc3QgYW5nID0gKHMgLyBTUE9LRV9DT1VOVCkgKiBNYXRoLlBJICogMjtcbiAgICAgIHNwb2tlUG9zaXRpb25zW3MgKiA2XSA9IE1hdGguY29zKGFuZykgKiAwLjEyO1xuICAgICAgc3Bva2VQb3NpdGlvbnNbcyAqIDYgKyAxXSA9IDAuMDIxO1xuICAgICAgc3Bva2VQb3NpdGlvbnNbcyAqIDYgKyAyXSA9IE1hdGguc2luKGFuZykgKiAwLjEyO1xuICAgICAgc3Bva2VQb3NpdGlvbnNbcyAqIDYgKyAzXSA9IE1hdGguY29zKGFuZykgKiAxLjA7XG4gICAgICBzcG9rZVBvc2l0aW9uc1tzICogNiArIDRdID0gMC4wMjE7XG4gICAgICBzcG9rZVBvc2l0aW9uc1tzICogNiArIDVdID0gTWF0aC5zaW4oYW5nKSAqIDEuMDtcbiAgICB9XG4gICAgY29uc3Qgc3Bva2VHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBzcG9rZUdlby5zZXRBdHRyaWJ1dGUoXG4gICAgICAncG9zaXRpb24nLFxuICAgICAgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShzcG9rZVBvc2l0aW9ucywgMylcbiAgICApO1xuICAgIGNvbnN0IHNwb2tlTWF0ID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweDAwZmZjYyxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC4wLFxuICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBzY2FuUmFkaWFsU3Bva2VzID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhzcG9rZUdlbywgc3Bva2VNYXQpO1xuICAgIGxpZGFyU2NhbldhdmVHcm91cC5hZGQoc2NhblJhZGlhbFNwb2tlcyk7XG5cbiAgICAvLyBTeW5jaHJvbml6ZWQgVmlydHVhbCBGbG9vciBSYWRpYWwgTGFzZXIgV2F2ZWZyb250IFJpbmcgKHN3ZWVwcyBhY3Jvc3MgZmxvb3JMaWRhclBsYW5lKVxuICAgIGNvbnN0IGZsb29yU2NhblJpbmdNYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MDBmZmNjLFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjAsXG4gICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCBmbG9vclNjYW5SaW5nTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLlJpbmdHZW9tZXRyeSgwLjk0LCAxLjAsIDk2KSxcbiAgICAgIGZsb29yU2NhblJpbmdNYXRcbiAgICApO1xuICAgIGZsb29yU2NhblJpbmdNZXNoLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgZmxvb3JTY2FuUmluZ01lc2gucG9zaXRpb24uc2V0KDAsIGZsb29yWSArIDAuMDIyLCAwLjIpO1xuICAgIHNjZW5lLmFkZChmbG9vclNjYW5SaW5nTWVzaCk7XG5cbiAgICAvLyA1YS1iaXMuIENlbnRyYWwgTWV0cm9wb2xpcyBDb25jZW50cmljIEVtaXR0ZXIgUmluZ3MgJiBWZXJ0aWNhbCBMaWdodCBDb2x1bW5zIChaZGouIDIgR2xvYmFsIE5ldHdvcmsgQ2VudGVycGllY2UpXG4gICAgY29uc3QgbWV0cm9wb2xpc0VtaXR0ZXJHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgIG1ldHJvcG9saXNFbWl0dGVyR3JvdXAucG9zaXRpb24uc2V0KDAsIDAuMDE2LCAtMC4wMik7XG4gICAgdGFibGVHcm91cC5hZGQobWV0cm9wb2xpc0VtaXR0ZXJHcm91cCk7XG5cbiAgICBjb25zdCBtZXRyb0VtaXR0ZXJSaW5nczogVEhSRUUuTWVzaFtdID0gW107XG4gICAgW1xuICAgICAgeyBySW46IDAuNTYsIHJPdXQ6IDAuNiwgY29sb3I6IDB4MDBmMGZmLCBvcDogMC44NSB9LFxuICAgICAgeyBySW46IDAuNzIsIHJPdXQ6IDAuNzUsIGNvbG9yOiAweDM4YmRmOCwgb3A6IDAuNjUgfSxcbiAgICAgIHsgckluOiAwLjg4LCByT3V0OiAwLjkxLCBjb2xvcjogMHhiYWU2ZmQsIG9wOiAwLjUgfSxcbiAgICBdLmZvckVhY2goKHJjKSA9PiB7XG4gICAgICBjb25zdCByTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICBuZXcgVEhSRUUuUmluZ0dlb21ldHJ5KHJjLnJJbiwgcmMuck91dCwgNjQpLFxuICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICAgIGNvbG9yOiByYy5jb2xvcixcbiAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICBvcGFjaXR5OiByYy5vcCxcbiAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHJNZXNoLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgICBtZXRyb3BvbGlzRW1pdHRlckdyb3VwLmFkZChyTWVzaCk7XG4gICAgICBtZXRyb0VtaXR0ZXJSaW5ncy5wdXNoKHJNZXNoKTtcbiAgICB9KTtcblxuICAgIC8vIFZlcnRpY2FsIGhvbG9ncmFwaGljIGxpZ2h0IGJlYW0gY3lsaW5kZXIgcmlzaW5nIHRocm91Z2ggdGhlIGNlbnRyYWwgbWV0cm9wb2xpc1xuICAgIGNvbnN0IG1ldHJvTGlnaHRDb2x1bW4gPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuNjIsIDAuNzQsIDEuNDUsIDMyLCAxLCB0cnVlKSxcbiAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweDAwZTVmZixcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuMTEsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBtZXRyb0xpZ2h0Q29sdW1uLnBvc2l0aW9uLnkgPSAwLjcyNTtcbiAgICBtZXRyb3BvbGlzRW1pdHRlckdyb3VwLmFkZChtZXRyb0xpZ2h0Q29sdW1uKTtcblxuICAgIC8vIFJpZ2h0IEZvcmVncm91bmQgVGFibGV0b3AgQWNjZXNzb3JpZXMgZnJvbSBaZGouIDI6IEludGVyYWN0aXZlIFNtYXJ0IFRhYmxldCArIE1hdHRlLUJsYWNrIENvZmZlZSBNdWcgb24gQ29hc3RlclxuICAgIGNvbnN0IHRhYmxldEFuZE11Z0dyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgdGFibGV0QW5kTXVnR3JvdXAucG9zaXRpb24uc2V0KDEuMjQsIDAuMDE1LCAwLjQ0KTtcbiAgICB0YWJsZUdyb3VwLmFkZCh0YWJsZXRBbmRNdWdHcm91cCk7XG5cbiAgICBjb25zdCBzbWFydFRhYmxldFRleCA9IGNyZWF0ZVNtYXJ0VGFibGV0VGV4dHVyZShtYXhBbmlzbyk7XG4gICAgY29uc3QgdGFibGV0Q2hhc3Npc01hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgwZjE3MmEsXG4gICAgICByb3VnaG5lc3M6IDAuMjIsXG4gICAgICBtZXRhbG5lc3M6IDAuODgsXG4gICAgfSk7XG4gICAgY29uc3QgdGFibGV0Qm9keSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuNDYsIDAuMDE0LCAwLjM0KSxcbiAgICAgIHRhYmxldENoYXNzaXNNYXRcbiAgICApO1xuICAgIHRhYmxldEJvZHkucm90YXRpb24ueSA9IC0wLjIyO1xuICAgIHRhYmxldEFuZE11Z0dyb3VwLmFkZCh0YWJsZXRCb2R5KTtcblxuICAgIGNvbnN0IHRhYmxldFNjcmVlbiA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMC40MiwgMC4zKSxcbiAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIG1hcDogc21hcnRUYWJsZXRUZXgsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjk2LFxuICAgICAgfSlcbiAgICApO1xuICAgIHRhYmxldFNjcmVlbi5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICAgIHRhYmxldFNjcmVlbi5wb3NpdGlvbi55ID0gMC4wMDg7XG4gICAgdGFibGV0Qm9keS5hZGQodGFibGV0U2NyZWVuKTtcblxuICAgIC8vIEV4ZWN1dGl2ZSBNYXR0ZS1CbGFjayBDb2ZmZWUgTXVnICsgQ29hc3RlciBuZXh0IHRvIHRoZSB0YWJsZXQgKGNvbXBvc2l0ZSA0LXBhcnQgM0QgcHJvcClcbiAgICBjb25zdCBtdWdHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgIG11Z0dyb3VwLnBvc2l0aW9uLnNldCgwLjI0LCAwLjAsIC0wLjM0KTtcbiAgICB0YWJsZXRBbmRNdWdHcm91cC5hZGQobXVnR3JvdXApO1xuXG4gICAgY29uc3QgbXVnTWF0dGVNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MTExODI3LFxuICAgICAgcm91Z2huZXNzOiAwLjM4LFxuICAgICAgbWV0YWxuZXNzOiAwLjI1LFxuICAgIH0pO1xuICAgIGNvbnN0IGNvYXN0ZXJNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4xOCwgMC4wMDgsIDAuMTgpLFxuICAgICAgdGFibGV0Q2hhc3Npc01hdFxuICAgICk7XG4gICAgY29hc3Rlck1lc2gucG9zaXRpb24ueSA9IDAuMDA0O1xuICAgIG11Z0dyb3VwLmFkZChjb2FzdGVyTWVzaCk7XG5cbiAgICBjb25zdCBtdWdDeWxpbmRlciA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4wNDYsIDAuMDQyLCAwLjExLCAyNCksXG4gICAgICBtdWdNYXR0ZU1hdFxuICAgICk7XG4gICAgbXVnQ3lsaW5kZXIucG9zaXRpb24ueSA9IDAuMDY7XG4gICAgbXVnQ3lsaW5kZXIuY2FzdFNoYWRvdyA9IHRydWU7XG4gICAgbXVnR3JvdXAuYWRkKG11Z0N5bGluZGVyKTtcblxuICAgIGNvbnN0IG11Z0hhbmRsZSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMC4wMjgsIDAuMDA3LCAxMCwgMjAsIE1hdGguUEkpLFxuICAgICAgbXVnTWF0dGVNYXRcbiAgICApO1xuICAgIG11Z0hhbmRsZS5yb3RhdGlvbi56ID0gLU1hdGguUEkgLyAyO1xuICAgIG11Z0hhbmRsZS5wb3NpdGlvbi5zZXQoMC4wNDUsIDAuMDYsIDApO1xuICAgIG11Z0dyb3VwLmFkZChtdWdIYW5kbGUpO1xuXG4gICAgLy8gNWIuIExpREFSIDNEIFBvaW50IENsb3VkIFZpc3VhbGl6YXRpb24gKFRhYmxldG9wICYgRmxvb3IgRmVhdHVyZSBQb2ludCBHcmlkIGNvbnRyb2xsZWQgYnkgc2hvd0RlcHRoR3JpZClcbiAgICBpbnRlcmZhY2UgQW5pbWF0ZWRMaWRhckNsb3VkIHtcbiAgICAgIHBvaW50czogVEhSRUUuUG9pbnRzO1xuICAgICAgZ2VvOiBUSFJFRS5CdWZmZXJHZW9tZXRyeTtcbiAgICAgIG1hdDogVEhSRUUuUG9pbnRzTWF0ZXJpYWw7XG4gICAgICBiYXNlWTogRmxvYXQzMkFycmF5O1xuICAgICAgYmFzZUNvbG9yczogRmxvYXQzMkFycmF5O1xuICAgICAgcmFkaWFsRGlzdDogRmxvYXQzMkFycmF5O1xuICAgICAgbWF4UmFkaXVzOiBudW1iZXI7XG4gICAgfVxuXG4gICAgY29uc3QgY3JlYXRlTGlkYXJQb2ludENsb3VkID0gKFxuICAgICAgc3Bhblg6IG51bWJlcixcbiAgICAgIHNwYW5aOiBudW1iZXIsXG4gICAgICBjb2xzOiBudW1iZXIsXG4gICAgICByb3dzOiBudW1iZXIsXG4gICAgICB5QmFzZTogbnVtYmVyLFxuICAgICAgaXNUYWJsZTogYm9vbGVhblxuICAgICk6IEFuaW1hdGVkTGlkYXJDbG91ZCA9PiB7XG4gICAgICBjb25zdCBjb3VudCA9IGNvbHMgKiByb3dzO1xuICAgICAgY29uc3QgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCAqIDMpO1xuICAgICAgY29uc3QgY29sb3JzID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCAqIDMpO1xuICAgICAgY29uc3QgYmFzZVkgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50KTtcbiAgICAgIGNvbnN0IGJhc2VDb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KGNvdW50ICogMyk7XG4gICAgICBjb25zdCByYWRpYWxEaXN0ID0gbmV3IEZsb2F0MzJBcnJheShjb3VudCk7XG4gICAgICBsZXQgbWF4UmFkaXVzID0gMC4xO1xuICAgICAgbGV0IHB0ciA9IDA7XG4gICAgICBmb3IgKGxldCBpeCA9IDA7IGl4IDwgY29sczsgaXgrKykge1xuICAgICAgICBmb3IgKGxldCBpeiA9IDA7IGl6IDwgcm93czsgaXorKykge1xuICAgICAgICAgIGNvbnN0IHUgPSBpeCAvIChjb2xzIC0gMSkgLSAwLjU7XG4gICAgICAgICAgY29uc3QgdiA9IGl6IC8gKHJvd3MgLSAxKSAtIDAuNTtcbiAgICAgICAgICBjb25zdCBweCA9IHUgKiBzcGFuWDtcbiAgICAgICAgICBjb25zdCBweSA9IHlCYXNlICsgTWF0aC5zaW4oaXggKiAwLjcgKyBpeiAqIDAuNykgKiAwLjAwNDtcbiAgICAgICAgICBjb25zdCBweiA9IHYgKiBzcGFuWjtcbiAgICAgICAgICBwb3NpdGlvbnNbcHRyICogM10gPSBweDtcbiAgICAgICAgICBwb3NpdGlvbnNbcHRyICogMyArIDFdID0gcHk7XG4gICAgICAgICAgcG9zaXRpb25zW3B0ciAqIDMgKyAyXSA9IHB6O1xuICAgICAgICAgIGJhc2VZW3B0cl0gPSBweTtcblxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLmh5cG90KHB4LCBweik7XG4gICAgICAgICAgcmFkaWFsRGlzdFtwdHJdID0gZGlzdDtcbiAgICAgICAgICBpZiAoZGlzdCA+IG1heFJhZGl1cykgbWF4UmFkaXVzID0gZGlzdDtcblxuICAgICAgICAgIGNvbnN0IGlzSGlnaGxpZ2h0ID0gKGl4ICsgaXopICUgNCA9PT0gMDtcbiAgICAgICAgICBjb25zdCByID0gaXNUYWJsZVxuICAgICAgICAgICAgPyBpc0hpZ2hsaWdodFxuICAgICAgICAgICAgICA/IDAuMlxuICAgICAgICAgICAgICA6IDAuMTNcbiAgICAgICAgICAgIDogaXNIaWdobGlnaHRcbiAgICAgICAgICAgID8gMC45OFxuICAgICAgICAgICAgOiAwLjIyO1xuICAgICAgICAgIGNvbnN0IGcgPSBpc1RhYmxlXG4gICAgICAgICAgICA/IGlzSGlnaGxpZ2h0XG4gICAgICAgICAgICAgID8gMC45OFxuICAgICAgICAgICAgICA6IDAuODJcbiAgICAgICAgICAgIDogaXNIaWdobGlnaHRcbiAgICAgICAgICAgID8gMC43OFxuICAgICAgICAgICAgOiAwLjg4O1xuICAgICAgICAgIGNvbnN0IGIgPSBpc1RhYmxlXG4gICAgICAgICAgICA/IGlzSGlnaGxpZ2h0XG4gICAgICAgICAgICAgID8gMC43OFxuICAgICAgICAgICAgICA6IDAuOTZcbiAgICAgICAgICAgIDogaXNIaWdobGlnaHRcbiAgICAgICAgICAgID8gMC4yMlxuICAgICAgICAgICAgOiAwLjY1O1xuXG4gICAgICAgICAgY29sb3JzW3B0ciAqIDNdID0gcjtcbiAgICAgICAgICBjb2xvcnNbcHRyICogMyArIDFdID0gZztcbiAgICAgICAgICBjb2xvcnNbcHRyICogMyArIDJdID0gYjtcbiAgICAgICAgICBiYXNlQ29sb3JzW3B0ciAqIDNdID0gcjtcbiAgICAgICAgICBiYXNlQ29sb3JzW3B0ciAqIDMgKyAxXSA9IGc7XG4gICAgICAgICAgYmFzZUNvbG9yc1twdHIgKiAzICsgMl0gPSBiO1xuICAgICAgICAgIHB0cisrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCBnZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICAgIGdlby5zZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShwb3NpdGlvbnMsIDMpKTtcbiAgICAgIGdlby5zZXRBdHRyaWJ1dGUoJ2NvbG9yJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZShjb2xvcnMsIDMpKTtcbiAgICAgIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICAgIHNpemU6IGlzVGFibGUgPyAwLjAyOCA6IDAuMDM2LFxuICAgICAgICB2ZXJ0ZXhDb2xvcnM6IHRydWUsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjksXG4gICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcG9pbnRzID0gbmV3IFRIUkVFLlBvaW50cyhnZW8sIG1hdCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwb2ludHMsXG4gICAgICAgIGdlbyxcbiAgICAgICAgbWF0LFxuICAgICAgICBiYXNlWSxcbiAgICAgICAgYmFzZUNvbG9ycyxcbiAgICAgICAgcmFkaWFsRGlzdCxcbiAgICAgICAgbWF4UmFkaXVzLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgbGlkYXJUYWJsZUNsb3VkRGF0YSA9IGNyZWF0ZUxpZGFyUG9pbnRDbG91ZChcbiAgICAgIHRhYmxlV2lkdGggLSAwLjEyLFxuICAgICAgdGFibGVEZXB0aCAtIDAuMTIsXG4gICAgICAyOCxcbiAgICAgIDE2LFxuICAgICAgMC4wMjIsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgICBjb25zdCBsaWRhclRhYmxlUG9pbnRDbG91ZCA9IGxpZGFyVGFibGVDbG91ZERhdGEucG9pbnRzO1xuICAgIHRhYmxlR3JvdXAuYWRkKGxpZGFyVGFibGVQb2ludENsb3VkKTtcblxuICAgIGNvbnN0IGxpZGFyRmxvb3JDbG91ZERhdGEgPSBjcmVhdGVMaWRhclBvaW50Q2xvdWQoXG4gICAgICA5LjAsXG4gICAgICA2LjIsXG4gICAgICAzMCxcbiAgICAgIDIwLFxuICAgICAgZmxvb3JZICsgMC4wMjgsXG4gICAgICBmYWxzZVxuICAgICk7XG4gICAgY29uc3QgbGlkYXJGbG9vclBvaW50Q2xvdWQgPSBsaWRhckZsb29yQ2xvdWREYXRhLnBvaW50cztcbiAgICBzY2VuZS5hZGQobGlkYXJGbG9vclBvaW50Q2xvdWQpO1xuXG4gICAgLy8gNi4gSG9sb2dyYXBoaWMgJiBUZXh0dXJlZCBBcmNoaXRlY3R1cmFsIFNreXNjcmFwZXIgTWF0ZXJpYWxzXG4gICAgbGV0IGRpYWdyaWRUZXggPSBjcmVhdGVEaWFncmlkRmFjYWRlVGV4dHVyZShcbiAgICAgIG1heEFuaXNvLFxuICAgICAgY29uZmlnUmVmLmN1cnJlbnQuaG9sb2dyYW1TdHlsZVxuICAgICk7XG4gICAgZGlhZ3JpZFRleC5yZXBlYXQuc2V0KDIsIDQpO1xuICAgIGxldCBjdXJyZW50SG9sb1N0eWxlID0gY29uZmlnUmVmLmN1cnJlbnQuaG9sb2dyYW1TdHlsZTtcbiAgICBsZXQgY3VycmVudFRleHR1cmVQcmVzZXQ6IEJ1aWxkaW5nVGV4dHVyZVByZXNldE9wdGlvbiA9XG4gICAgICBjb25maWdSZWYuY3VycmVudC5idWlsZGluZ1RleHR1cmVQcmVzZXQgfHxcbiAgICAgICdIb2xvZ3JhbSBEaWFncmlkIChEb215xZtsbnkgQ3lqYW4tWsWCb3RvKSc7XG4gICAgbGV0IGN1cnJlbnRDdXN0b21UZXhVcmw6IHN0cmluZyB8IG51bGwgPVxuICAgICAgY29uZmlnUmVmLmN1cnJlbnQuY3VzdG9tQnVpbGRpbmdUZXh0dXJlVXJsIHx8IG51bGw7XG5cbiAgICBjb25zdCBob2xvU2hlbGxNYXQgPSBuZXcgVEhSRUUuTWVzaFBoeXNpY2FsTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MzhiZGY4LFxuICAgICAgZW1pc3NpdmU6IDB4MGVhNWU5LFxuICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuNzgsXG4gICAgICBtYXA6IGRpYWdyaWRUZXgsXG4gICAgICBlbWlzc2l2ZU1hcDogZGlhZ3JpZFRleCxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogY29uZmlnUmVmLmN1cnJlbnQuYnVpbGRpbmdUZXh0dXJlT3BhY2l0eSA/PyAwLjg0LFxuICAgICAgcm91Z2huZXNzOiAwLjE1LFxuICAgICAgbWV0YWxuZXNzOiAwLjIsXG4gICAgICBjbGVhcmNvYXQ6IDEuMCxcbiAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgIH0pO1xuXG4gICAgLy8gQ2FjaGUgb2YgcGVyLXByZXNldCBtYXRlcmlhbHMgZm9yIGluZGl2aWR1YWwgc3ViLW1vZGVsIHRleHR1cmUgb3ZlcnJpZGVzXG4gICAgY29uc3Qgc3ViTW9kZWxNYXRlcmlhbENhY2hlID0gbmV3IE1hcDxcbiAgICAgIEJ1aWxkaW5nVGV4dHVyZVByZXNldE9wdGlvbixcbiAgICAgIFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsXG4gICAgPigpO1xuICAgIGNvbnN0IGdldE9yQ3JlYXRlUHJlc2V0TWF0ZXJpYWwgPSAoXG4gICAgICBwcmVzZXQ6IEJ1aWxkaW5nVGV4dHVyZVByZXNldE9wdGlvblxuICAgICk6IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsID0+IHtcbiAgICAgIGlmIChwcmVzZXQgPT09IGN1cnJlbnRUZXh0dXJlUHJlc2V0KSByZXR1cm4gaG9sb1NoZWxsTWF0O1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSBzdWJNb2RlbE1hdGVyaWFsQ2FjaGUuZ2V0KHByZXNldCk7XG4gICAgICBpZiAoZXhpc3RpbmcpIHJldHVybiBleGlzdGluZztcblxuICAgICAgY29uc3QgdGV4ID1cbiAgICAgICAgcHJlc2V0ID09PSAnSG9sb2dyYW0gRGlhZ3JpZCAoRG9tecWbbG55IEN5amFuLVrFgm90byknXG4gICAgICAgICAgPyBjcmVhdGVEaWFncmlkRmFjYWRlVGV4dHVyZShtYXhBbmlzbywgY29uZmlnUmVmLmN1cnJlbnQuaG9sb2dyYW1TdHlsZSlcbiAgICAgICAgICA6IGNyZWF0ZUFyY2hpdGVjdHVyYWxGYWNhZGVUZXh0dXJlKG1heEFuaXNvLCBwcmVzZXQpO1xuICAgICAgdGV4LnJlcGVhdC5zZXQoMiwgNCk7XG5cbiAgICAgIGNvbnN0IGlzSG9sbyA9IHByZXNldCA9PT0gJ0hvbG9ncmFtIERpYWdyaWQgKERvbXnFm2xueSBDeWphbi1axYJvdG8pJztcbiAgICAgIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoUGh5c2ljYWxNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiBpc0hvbG8gPyAweDM4YmRmOCA6IDB4ZmZmZmZmLFxuICAgICAgICBlbWlzc2l2ZTogaXNIb2xvID8gMHgwZWE1ZTkgOiAweDFlMjkzYixcbiAgICAgICAgZW1pc3NpdmVJbnRlbnNpdHk6IGlzSG9sbyA/IDAuNzggOiAwLjQ1LFxuICAgICAgICBtYXA6IHRleCxcbiAgICAgICAgZW1pc3NpdmVNYXA6IHRleCxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IGNvbmZpZ1JlZi5jdXJyZW50LmJ1aWxkaW5nVGV4dHVyZU9wYWNpdHkgPz8gMC45LFxuICAgICAgICByb3VnaG5lc3M6XG4gICAgICAgICAgcHJlc2V0ID09PSAnQmV0b24gQXJjaGl0ZWt0b25pY3pueSBpIFJkemXFhCDFmndpZXRsbnkgKEJydXRhbGlzdCBCSU0pJ1xuICAgICAgICAgICAgPyAwLjY1XG4gICAgICAgICAgICA6IDAuMTgsXG4gICAgICAgIG1ldGFsbmVzczpcbiAgICAgICAgICBwcmVzZXQgPT09ICdUeXRhbiBpIFN6Y3pvdGtvd2FuZSBaxYJvdG8gKFBhcmFtZXRyaWMgTWV0YWwpJ1xuICAgICAgICAgICAgPyAwLjc1XG4gICAgICAgICAgICA6IDAuMjUsXG4gICAgICAgIGNsZWFyY29hdDogMC45LFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBkZXB0aFdyaXRlOiAhaXNIb2xvLFxuICAgICAgICBibGVuZGluZzogaXNIb2xvID8gVEhSRUUuQWRkaXRpdmVCbGVuZGluZyA6IFRIUkVFLk5vcm1hbEJsZW5kaW5nLFxuICAgICAgfSk7XG4gICAgICBzdWJNb2RlbE1hdGVyaWFsQ2FjaGUuc2V0KHByZXNldCwgbWF0KTtcbiAgICAgIHJldHVybiBtYXQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGFwcGx5QnVpbGRpbmdUZXh0dXJlUHJlc2V0ID0gKFxuICAgICAgcHJlc2V0OiBCdWlsZGluZ1RleHR1cmVQcmVzZXRPcHRpb24sXG4gICAgICBjdXN0b21Vcmw6IHN0cmluZyB8IG51bGxcbiAgICApID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgcHJlc2V0ID09PSAnV8WCYXNuYSBUZWtzdHVyYSB6IFBsaWt1IChDdXN0b20gVVYgTWFwKScgJiZcbiAgICAgICAgY3VzdG9tVXJsXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgbG9hZGVyID0gbmV3IFRIUkVFLlRleHR1cmVMb2FkZXIoKTtcbiAgICAgICAgbG9hZGVyLmxvYWQoY3VzdG9tVXJsLCAobG9hZGVkVGV4KSA9PiB7XG4gICAgICAgICAgbG9hZGVkVGV4LmNvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgICAgICAgICBsb2FkZWRUZXgud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZztcbiAgICAgICAgICBsb2FkZWRUZXgud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZztcbiAgICAgICAgICBsb2FkZWRUZXguYW5pc290cm9weSA9IG1heEFuaXNvO1xuICAgICAgICAgIGRpYWdyaWRUZXguZGlzcG9zZSgpO1xuICAgICAgICAgIGRpYWdyaWRUZXggPSBsb2FkZWRUZXg7XG4gICAgICAgICAgaG9sb1NoZWxsTWF0Lm1hcCA9IGRpYWdyaWRUZXg7XG4gICAgICAgICAgaG9sb1NoZWxsTWF0LmVtaXNzaXZlTWFwID0gZGlhZ3JpZFRleDtcbiAgICAgICAgICBob2xvU2hlbGxNYXQuY29sb3Iuc2V0SGV4KDB4ZmZmZmZmKTtcbiAgICAgICAgICBob2xvU2hlbGxNYXQuZW1pc3NpdmUuc2V0SGV4KDB4MzhiZGY4KTtcbiAgICAgICAgICBob2xvU2hlbGxNYXQuZW1pc3NpdmVJbnRlbnNpdHkgPSAwLjMyO1xuICAgICAgICAgIGhvbG9TaGVsbE1hdC5yb3VnaG5lc3MgPSAwLjIyO1xuICAgICAgICAgIGhvbG9TaGVsbE1hdC5tZXRhbG5lc3MgPSAwLjM7XG4gICAgICAgICAgaG9sb1NoZWxsTWF0LmJsZW5kaW5nID0gVEhSRUUuTm9ybWFsQmxlbmRpbmc7XG4gICAgICAgICAgaG9sb1NoZWxsTWF0LmRlcHRoV3JpdGUgPSB0cnVlO1xuICAgICAgICAgIGhvbG9TaGVsbE1hdC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzSG9sbyA9IHByZXNldCA9PT0gJ0hvbG9ncmFtIERpYWdyaWQgKERvbXnFm2xueSBDeWphbi1axYJvdG8pJztcbiAgICAgIGNvbnN0IG5leHRUZXggPSBpc0hvbG9cbiAgICAgICAgPyBjcmVhdGVEaWFncmlkRmFjYWRlVGV4dHVyZShtYXhBbmlzbywgY29uZmlnUmVmLmN1cnJlbnQuaG9sb2dyYW1TdHlsZSlcbiAgICAgICAgOiBjcmVhdGVBcmNoaXRlY3R1cmFsRmFjYWRlVGV4dHVyZShtYXhBbmlzbywgcHJlc2V0KTtcbiAgICAgIGRpYWdyaWRUZXguZGlzcG9zZSgpO1xuICAgICAgZGlhZ3JpZFRleCA9IG5leHRUZXg7XG4gICAgICBob2xvU2hlbGxNYXQubWFwID0gZGlhZ3JpZFRleDtcbiAgICAgIGhvbG9TaGVsbE1hdC5lbWlzc2l2ZU1hcCA9IGRpYWdyaWRUZXg7XG5cbiAgICAgIGlmIChpc0hvbG8pIHtcbiAgICAgICAgaG9sb1NoZWxsTWF0LmNvbG9yLnNldEhleCgweDM4YmRmOCk7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5lbWlzc2l2ZS5zZXRIZXgoMHgwZWE1ZTkpO1xuICAgICAgICBob2xvU2hlbGxNYXQuZW1pc3NpdmVJbnRlbnNpdHkgPSAwLjc4O1xuICAgICAgICBob2xvU2hlbGxNYXQucm91Z2huZXNzID0gMC4xNTtcbiAgICAgICAgaG9sb1NoZWxsTWF0Lm1ldGFsbmVzcyA9IDAuMjtcbiAgICAgICAgaG9sb1NoZWxsTWF0LmJsZW5kaW5nID0gVEhSRUUuQWRkaXRpdmVCbGVuZGluZztcbiAgICAgICAgaG9sb1NoZWxsTWF0LmRlcHRoV3JpdGUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHByZXNldCA9PT0gJ0Zhc2FkYSBTemtsYW5hIFJlZmxla3N5am5hIChTa3lzY3JhcGVyIEN1cnRhaW4gV2FsbCknXG4gICAgICApIHtcbiAgICAgICAgaG9sb1NoZWxsTWF0LmNvbG9yLnNldEhleCgweGUwZjJmZSk7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5lbWlzc2l2ZS5zZXRIZXgoMHgzOGJkZjgpO1xuICAgICAgICBob2xvU2hlbGxNYXQuZW1pc3NpdmVJbnRlbnNpdHkgPSAwLjQ4O1xuICAgICAgICBob2xvU2hlbGxNYXQucm91Z2huZXNzID0gMC4wODtcbiAgICAgICAgaG9sb1NoZWxsTWF0Lm1ldGFsbmVzcyA9IDAuNDU7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5ibGVuZGluZyA9IFRIUkVFLk5vcm1hbEJsZW5kaW5nO1xuICAgICAgICBob2xvU2hlbGxNYXQuZGVwdGhXcml0ZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBwcmVzZXQgPT09ICdUeXRhbiBpIFN6Y3pvdGtvd2FuZSBaxYJvdG8gKFBhcmFtZXRyaWMgTWV0YWwpJ1xuICAgICAgKSB7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5jb2xvci5zZXRIZXgoMHhmZWYzYzcpO1xuICAgICAgICBob2xvU2hlbGxNYXQuZW1pc3NpdmUuc2V0SGV4KDB4ZjU5ZTBiKTtcbiAgICAgICAgaG9sb1NoZWxsTWF0LmVtaXNzaXZlSW50ZW5zaXR5ID0gMC40MjtcbiAgICAgICAgaG9sb1NoZWxsTWF0LnJvdWdobmVzcyA9IDAuMjI7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5tZXRhbG5lc3MgPSAwLjgyO1xuICAgICAgICBob2xvU2hlbGxNYXQuYmxlbmRpbmcgPSBUSFJFRS5Ob3JtYWxCbGVuZGluZztcbiAgICAgICAgaG9sb1NoZWxsTWF0LmRlcHRoV3JpdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgcHJlc2V0ID09PSAnQmV0b24gQXJjaGl0ZWt0b25pY3pueSBpIFJkemXFhCDFmndpZXRsbnkgKEJydXRhbGlzdCBCSU0pJ1xuICAgICAgKSB7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5jb2xvci5zZXRIZXgoMHhlMmU4ZjApO1xuICAgICAgICBob2xvU2hlbGxNYXQuZW1pc3NpdmUuc2V0SGV4KDB4ZjU5ZTBiKTtcbiAgICAgICAgaG9sb1NoZWxsTWF0LmVtaXNzaXZlSW50ZW5zaXR5ID0gMC4zNTtcbiAgICAgICAgaG9sb1NoZWxsTWF0LnJvdWdobmVzcyA9IDAuNjg7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5tZXRhbG5lc3MgPSAwLjE1O1xuICAgICAgICBob2xvU2hlbGxNYXQuYmxlbmRpbmcgPSBUSFJFRS5Ob3JtYWxCbGVuZGluZztcbiAgICAgICAgaG9sb1NoZWxsTWF0LmRlcHRoV3JpdGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gS2FyYm9ub3dvLVN6YWZpcm93eSBLb21wb3p5dCAoQ3liZXItRmFjYWRlKVxuICAgICAgICBob2xvU2hlbGxNYXQuY29sb3Iuc2V0SGV4KDB4Y2ZmYWZlKTtcbiAgICAgICAgaG9sb1NoZWxsTWF0LmVtaXNzaXZlLnNldEhleCgweDA2YjZkNCk7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5lbWlzc2l2ZUludGVuc2l0eSA9IDAuNjI7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5yb3VnaG5lc3MgPSAwLjE4O1xuICAgICAgICBob2xvU2hlbGxNYXQubWV0YWxuZXNzID0gMC41NTtcbiAgICAgICAgaG9sb1NoZWxsTWF0LmJsZW5kaW5nID0gVEhSRUUuTm9ybWFsQmxlbmRpbmc7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5kZXB0aFdyaXRlID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGhvbG9TaGVsbE1hdC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgfTtcblxuICAgIGFwcGx5QnVpbGRpbmdUZXh0dXJlUHJlc2V0KGN1cnJlbnRUZXh0dXJlUHJlc2V0LCBjdXJyZW50Q3VzdG9tVGV4VXJsKTtcblxuICAgIGNvbnN0IGhvbG9Hb2xkQ29yZU1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmYmJmMjQsXG4gICAgICBlbWlzc2l2ZTogMHhmNTllMGIsXG4gICAgICBlbWlzc2l2ZUludGVuc2l0eTogMS4xNSxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC43MixcbiAgICAgIHJvdWdobmVzczogMC4yNSxcbiAgICAgIG1ldGFsbmVzczogMC42LFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICB9KTtcblxuICAgIGNvbnN0IGhvbG9XaXJlTWF0ID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweDdkZDNmYyxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC43MixcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgIH0pO1xuXG4gICAgY29uc3QgaG9sb0Zsb29yU2xhYk1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgzOGJkZjgsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuNDIsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgIH0pO1xuXG4gICAgLy8gSGVscGVyIHRvIGJ1aWxkIGEgbXVsdGktcGFydCBjb21wb3NpdGUgc2t5c2NyYXBlciBjbHVzdGVyICh3aXRoIHVwIHRvIDUgZGlzdGluY3QgdG93ZXJzIHBlciBncm91cClcbiAgICBpbnRlcmZhY2UgQW5pbWF0ZWRCdWlsZGluZ1BhcnRzIHtcbiAgICAgIGNsdXN0ZXJJZDogQnVpbGRpbmdDbHVzdGVySWQ7XG4gICAgICBncm91cDogVEhSRUUuR3JvdXA7XG4gICAgICBiYXNlUG9zWDogbnVtYmVyO1xuICAgICAgYmFzZVBvc1o6IG51bWJlcjtcbiAgICAgIHRhcmdldFBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzO1xuICAgICAgdG93ZXJTdWJHcm91cHM6IFRIUkVFLkdyb3VwW107XG4gICAgICBpbm5lckNvcmVzOiBUSFJFRS5PYmplY3QzRFtdO1xuICAgICAgZXhwbG9kYWJsZUxheWVyczogeyBtZXNoOiBUSFJFRS5PYmplY3QzRDsgYmFzZVk6IG51bWJlcjsgZXhwbG9kZU9mZnNldDogbnVtYmVyIH1bXTtcbiAgICAgIGJhc2VSaW5nczogVEhSRUUuT2JqZWN0M0RbXTtcbiAgICAgIHNlbGVjdGlvblJpbmc6IFRIUkVFLk1lc2g7XG4gICAgfVxuXG4gICAgY29uc3QgYnVpbGRpbmdDbHVzdGVyczogQW5pbWF0ZWRCdWlsZGluZ1BhcnRzW10gPSBbXTtcbiAgICBjb25zdCByYXljYXN0UHJveGllczogVEhSRUUuTWVzaFtdID0gW107XG4gICAgY29uc3QgYnVpbGRpbmdTaGFkb3dDYXN0ZXJzOiBUSFJFRS5NZXNoW10gPSBbXTtcbiAgICBjb25zdCBidWlsZGluZ1NoYWRvd0RlcHRoTWF0ID0gbmV3IFRIUkVFLk1lc2hEZXB0aE1hdGVyaWFsKHtcbiAgICAgIGRlcHRoUGFja2luZzogVEhSRUUuUkdCQURlcHRoUGFja2luZyxcbiAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBidWlsZFNreXNjcmFwZXJDbHVzdGVyID0gKFxuICAgICAgY2x1c3RlcklkOiBCdWlsZGluZ0NsdXN0ZXJJZCxcbiAgICAgIHBvc1g6IG51bWJlcixcbiAgICAgIHBvc1o6IG51bWJlcixcbiAgICAgIHRvd2Vyczoge1xuICAgICAgICBkeDogbnVtYmVyO1xuICAgICAgICBkejogbnVtYmVyO1xuICAgICAgICBoZWlnaHQ6IG51bWJlcjtcbiAgICAgICAgcmFkaXVzQm90dG9tOiBudW1iZXI7XG4gICAgICAgIHJhZGl1c1RvcDogbnVtYmVyO1xuICAgICAgICByYWRpYWxTZWdtZW50czogbnVtYmVyO1xuICAgICAgICB0d2lzdEFuZ2xlOiBudW1iZXI7XG4gICAgICAgIGlzR29sZENvcmU6IGJvb2xlYW47XG4gICAgICB9W11cbiAgICApID0+IHtcbiAgICAgIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICBncm91cC5wb3NpdGlvbi5zZXQocG9zWCwgMC4wMTUsIHBvc1opO1xuICAgICAgdGFibGVHcm91cC5hZGQoZ3JvdXApO1xuXG4gICAgICBjb25zdCB0b3dlclN1Ykdyb3VwczogVEhSRUUuR3JvdXBbXSA9IFtdO1xuICAgICAgY29uc3QgaW5uZXJDb3JlczogVEhSRUUuT2JqZWN0M0RbXSA9IFtdO1xuICAgICAgY29uc3QgZXhwbG9kYWJsZUxheWVyczoge1xuICAgICAgICBtZXNoOiBUSFJFRS5PYmplY3QzRDtcbiAgICAgICAgYmFzZVk6IG51bWJlcjtcbiAgICAgICAgZXhwbG9kZU9mZnNldDogbnVtYmVyO1xuICAgICAgfVtdID0gW107XG4gICAgICBjb25zdCBiYXNlUmluZ3M6IFRIUkVFLk9iamVjdDNEW10gPSBbXTtcblxuICAgICAgLy8gUGFydCAxOiBBbmNob3IgQmFzZSBQbGF0Zm9ybSAmIFJvdGFyeSBFbWl0dGVyIFJpbmdzXG4gICAgICBjb25zdCBiYXNlUmluZzEgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLlJpbmdHZW9tZXRyeSgwLjMyLCAwLjM2LCA0OCksXG4gICAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgICAgY29sb3I6IDB4MjJkM2VlLFxuICAgICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgb3BhY2l0eTogMC44LFxuICAgICAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIGJhc2VSaW5nMS5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICAgICAgYmFzZVJpbmcxLnBvc2l0aW9uLnkgPSAwLjAwODtcbiAgICAgIGdyb3VwLmFkZChiYXNlUmluZzEpO1xuICAgICAgYmFzZVJpbmdzLnB1c2goYmFzZVJpbmcxKTtcblxuICAgICAgY29uc3QgYmFzZVJpbmcyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5SaW5nR2VvbWV0cnkoMC40MiwgMC40NCwgNiksXG4gICAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgICAgY29sb3I6IDB4ZmJiZjI0LFxuICAgICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgb3BhY2l0eTogMC42NSxcbiAgICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICBiYXNlUmluZzIucm90YXRpb24ueCA9IC1NYXRoLlBJIC8gMjtcbiAgICAgIGJhc2VSaW5nMi5wb3NpdGlvbi55ID0gMC4wMTI7XG4gICAgICBncm91cC5hZGQoYmFzZVJpbmcyKTtcbiAgICAgIGJhc2VSaW5ncy5wdXNoKGJhc2VSaW5nMik7XG5cbiAgICAgIC8vIFNlbGVjdGlvbiBIaWdobGlnaHQgUmluZ1xuICAgICAgY29uc3Qgc2VsZWN0aW9uUmluZyA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICBuZXcgVEhSRUUuUmluZ0dlb21ldHJ5KDAuNDcsIDAuNTEsIDY0KSxcbiAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgICBjb2xvcjogMHhmZGUwNDcsXG4gICAgICAgICAgc2lkZTogVEhSRUUuRG91YmxlU2lkZSxcbiAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgICBvcGFjaXR5OiAwLjAsXG4gICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgICAgc2VsZWN0aW9uUmluZy5yb3RhdGlvbi54ID0gLU1hdGguUEkgLyAyO1xuICAgICAgc2VsZWN0aW9uUmluZy5wb3NpdGlvbi55ID0gMC4wMTY7XG4gICAgICBncm91cC5hZGQoc2VsZWN0aW9uUmluZyk7XG5cbiAgICAgIC8vIEJ1aWxkIGVhY2ggdG93ZXIgaW4gdGhlIGNsdXN0ZXIgKHVwIHRvIDUgdG93ZXJzIHBlciBncm91cClcbiAgICAgIHRvd2Vycy5mb3JFYWNoKCh0LCB0SWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHN1Yk1vZGVsSWQgPSBgJHtjbHVzdGVySWR9XyR7dElkeH1gO1xuICAgICAgICBjb25zdCB0b3dlclN1Ykdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgICAgIHRvd2VyU3ViR3JvdXAucG9zaXRpb24uc2V0KHQuZHgsIDAsIHQuZHopO1xuICAgICAgICB0b3dlclN1Ykdyb3VwLnVzZXJEYXRhLmJhc2VEeCA9IHQuZHg7XG4gICAgICAgIHRvd2VyU3ViR3JvdXAudXNlckRhdGEuYmFzZUR6ID0gdC5kejtcbiAgICAgICAgdG93ZXJTdWJHcm91cC51c2VyRGF0YS5zdWJNb2RlbElkID0gc3ViTW9kZWxJZDtcbiAgICAgICAgZ3JvdXAuYWRkKHRvd2VyU3ViR3JvdXApO1xuICAgICAgICB0b3dlclN1Ykdyb3Vwcy5wdXNoKHRvd2VyU3ViR3JvdXApO1xuXG4gICAgICAgIC8vIEluZGl2aWR1YWwgc3ViLW1vZGVsIHNlbGVjdGlvbiByaW5nIGF0IGJhc2VcbiAgICAgICAgY29uc3Qgc3ViU2VsZWN0UmluZyA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgIG5ldyBUSFJFRS5SaW5nR2VvbWV0cnkodC5yYWRpdXNCb3R0b20gKiAxLjE4LCB0LnJhZGl1c0JvdHRvbSAqIDEuMzgsIDMyKSxcbiAgICAgICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICAgICAgY29sb3I6IDB4MzhiZGY4LFxuICAgICAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgICAgICBvcGFjaXR5OiAwLjAsXG4gICAgICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgICBzdWJTZWxlY3RSaW5nLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgICAgIHN1YlNlbGVjdFJpbmcucG9zaXRpb24ueSA9IDAuMDE0O1xuICAgICAgICB0b3dlclN1Ykdyb3VwLmFkZChzdWJTZWxlY3RSaW5nKTtcbiAgICAgICAgdG93ZXJTdWJHcm91cC51c2VyRGF0YS5zdWJTZWxlY3RSaW5nID0gc3ViU2VsZWN0UmluZztcblxuICAgICAgICAvLyBJbmRpdmlkdWFsIHN1Yi1tb2RlbCByYXljYXN0IHByb3h5IGN5bGluZGVyXG4gICAgICAgIGNvbnN0IHN1YlByb3h5ID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoXG4gICAgICAgICAgICB0LnJhZGl1c0JvdHRvbSAqIDEuMjUsXG4gICAgICAgICAgICB0LnJhZGl1c0JvdHRvbSAqIDEuMjUsXG4gICAgICAgICAgICB0LmhlaWdodCArIDAuMjUsXG4gICAgICAgICAgICAxMFxuICAgICAgICAgICksXG4gICAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgdmlzaWJsZTogZmFsc2UgfSlcbiAgICAgICAgKTtcbiAgICAgICAgc3ViUHJveHkucG9zaXRpb24ueSA9ICh0LmhlaWdodCArIDAuMjUpIC8gMjtcbiAgICAgICAgc3ViUHJveHkudXNlckRhdGEuY2x1c3RlcklkID0gY2x1c3RlcklkO1xuICAgICAgICBzdWJQcm94eS51c2VyRGF0YS5zdWJNb2RlbElkID0gc3ViTW9kZWxJZDtcbiAgICAgICAgdG93ZXJTdWJHcm91cC5hZGQoc3ViUHJveHkpO1xuICAgICAgICByYXljYXN0UHJveGllcy5wdXNoKHN1YlByb3h5KTtcblxuICAgICAgICAvLyBQYXJ0IDI6IFByaW1hcnkgRGlhZ3JpZCBFeG9za2VsZXRvbiBTaGVsbCAodHdpc3RlZCBjeWxpbmRlci9wcmlzbSlcbiAgICAgICAgY29uc3Qgc2hlbGxHZW8gPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeShcbiAgICAgICAgICB0LnJhZGl1c1RvcCxcbiAgICAgICAgICB0LnJhZGl1c0JvdHRvbSxcbiAgICAgICAgICB0LmhlaWdodCxcbiAgICAgICAgICB0LnJhZGlhbFNlZ21lbnRzLFxuICAgICAgICAgIDI0LFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcbiAgICAgICAgLy8gQXBwbHkgYXJjaGl0ZWN0dXJhbCB0d2lzdCBhbG9uZyBoZWlnaHRcbiAgICAgICAgY29uc3QgcG9zQXR0ciA9IHNoZWxsR2VvLmF0dHJpYnV0ZXMucG9zaXRpb247XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zQXR0ci5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgdnggPSBwb3NBdHRyLmdldFgoaSk7XG4gICAgICAgICAgY29uc3QgdnkgPSBwb3NBdHRyLmdldFkoaSk7XG4gICAgICAgICAgY29uc3QgdnogPSBwb3NBdHRyLmdldFooaSk7XG4gICAgICAgICAgY29uc3Qgbm9ybVkgPSAodnkgKyB0LmhlaWdodCAvIDIpIC8gdC5oZWlnaHQ7XG4gICAgICAgICAgY29uc3QgYW5nbGUgPSBub3JtWSAqIHQudHdpc3RBbmdsZTtcbiAgICAgICAgICBjb25zdCBjb3NBID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgIGNvbnN0IHNpbkEgPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgICAgcG9zQXR0ci5zZXRYWVooaSwgdnggKiBjb3NBIC0gdnogKiBzaW5BLCB2eSwgdnggKiBzaW5BICsgdnogKiBjb3NBKTtcbiAgICAgICAgfVxuICAgICAgICBzaGVsbEdlby5jb21wdXRlVmVydGV4Tm9ybWFscygpO1xuXG4gICAgICAgIGNvbnN0IHNoZWxsTWVzaCA9IG5ldyBUSFJFRS5NZXNoKHNoZWxsR2VvLCBob2xvU2hlbGxNYXQpO1xuICAgICAgICBzaGVsbE1lc2gucG9zaXRpb24ueSA9IHQuaGVpZ2h0IC8gMjtcbiAgICAgICAgc2hlbGxNZXNoLnJlbmRlck9yZGVyID0gMztcbiAgICAgICAgc2hlbGxNZXNoLmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsICYmIGN1cnJlbnRTaGFkb3dzRW5hYmxlZDtcbiAgICAgICAgc2hlbGxNZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgICAgICBzaGVsbE1lc2guY3VzdG9tRGVwdGhNYXRlcmlhbCA9IGJ1aWxkaW5nU2hhZG93RGVwdGhNYXQ7XG4gICAgICAgIGJ1aWxkaW5nU2hhZG93Q2FzdGVycy5wdXNoKHNoZWxsTWVzaCk7XG4gICAgICAgIHRvd2VyU3ViR3JvdXAuYWRkKHNoZWxsTWVzaCk7XG4gICAgICAgIHRvd2VyU3ViR3JvdXAudXNlckRhdGEuc2hlbGxNZXNoID0gc2hlbGxNZXNoO1xuICAgICAgICBleHBsb2RhYmxlTGF5ZXJzLnB1c2goe1xuICAgICAgICAgIG1lc2g6IHNoZWxsTWVzaCxcbiAgICAgICAgICBiYXNlWTogdC5oZWlnaHQgLyAyLFxuICAgICAgICAgIGV4cGxvZGVPZmZzZXQ6IDAuMTQgKiAodElkeCArIDEpLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBQYXJ0IDM6IENyaXNwIEFyY2hpdGVjdHVyYWwgRWRnZSBXaXJlZnJhbWVcbiAgICAgICAgY29uc3QgZWRnZXNHZW8gPSBuZXcgVEhSRUUuRWRnZXNHZW9tZXRyeShzaGVsbEdlbywgMTgpO1xuICAgICAgICBjb25zdCBlZGdlc0xpbmVzID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhlZGdlc0dlbywgaG9sb1dpcmVNYXQpO1xuICAgICAgICBlZGdlc0xpbmVzLnBvc2l0aW9uLnkgPSB0LmhlaWdodCAvIDI7XG4gICAgICAgIHRvd2VyU3ViR3JvdXAuYWRkKGVkZ2VzTGluZXMpO1xuICAgICAgICBleHBsb2RhYmxlTGF5ZXJzLnB1c2goe1xuICAgICAgICAgIG1lc2g6IGVkZ2VzTGluZXMsXG4gICAgICAgICAgYmFzZVk6IHQuaGVpZ2h0IC8gMixcbiAgICAgICAgICBleHBsb2RlT2Zmc2V0OiAwLjI0ICogKHRJZHggKyAxKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUGFydCA0OiBJbnRlcm5hbCBCSU0gU3RydWN0dXJhbCBDb3JlIChyZWFjdHMgdG8gUGFyYWxsYXgpXG4gICAgICAgIGNvbnN0IGNvcmVHZW8gPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeShcbiAgICAgICAgICB0LnJhZGl1c1RvcCAqIDAuNDgsXG4gICAgICAgICAgdC5yYWRpdXNCb3R0b20gKiAwLjUyLFxuICAgICAgICAgIHQuaGVpZ2h0ICogMC45NCxcbiAgICAgICAgICA4XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGNvcmVNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgY29yZUdlbyxcbiAgICAgICAgICB0LmlzR29sZENvcmUgPyBob2xvR29sZENvcmVNYXQgOiBob2xvRmxvb3JTbGFiTWF0XG4gICAgICAgICk7XG4gICAgICAgIGNvcmVNZXNoLnBvc2l0aW9uLnkgPSAodC5oZWlnaHQgKiAwLjk0KSAvIDI7XG4gICAgICAgIGNvcmVNZXNoLnJlbmRlck9yZGVyID0gMjtcbiAgICAgICAgY29yZU1lc2guY2FzdFNoYWRvdyA9ICFpc1NvZnR3YXJlR2wgJiYgY3VycmVudFNoYWRvd3NFbmFibGVkO1xuICAgICAgICBjb3JlTWVzaC5yZWNlaXZlU2hhZG93ID0gdHJ1ZTtcbiAgICAgICAgY29yZU1lc2guY3VzdG9tRGVwdGhNYXRlcmlhbCA9IGJ1aWxkaW5nU2hhZG93RGVwdGhNYXQ7XG4gICAgICAgIGJ1aWxkaW5nU2hhZG93Q2FzdGVycy5wdXNoKGNvcmVNZXNoKTtcbiAgICAgICAgdG93ZXJTdWJHcm91cC5hZGQoY29yZU1lc2gpO1xuICAgICAgICB0b3dlclN1Ykdyb3VwLnVzZXJEYXRhLmNvcmVNZXNoID0gY29yZU1lc2g7XG4gICAgICAgIGlubmVyQ29yZXMucHVzaChjb3JlTWVzaCk7XG5cbiAgICAgICAgLy8gUGFydCA1OiBTdGFja2VkIEhvcml6b250YWwgRmxvb3IgUGxhdGVzIGluc2lkZSB0aGUgc2t5c2NyYXBlclxuICAgICAgICBjb25zdCBzbGFiQ291bnQgPSBNYXRoLmZsb29yKHQuaGVpZ2h0ICogMTEpO1xuICAgICAgICBmb3IgKGxldCBzID0gMTsgcyA8PSBzbGFiQ291bnQ7IHMrKykge1xuICAgICAgICAgIGNvbnN0IGZyYWMgPSBzIC8gKHNsYWJDb3VudCArIDEpO1xuICAgICAgICAgIGNvbnN0IHNsYWJSYWRpdXMgPSBUSFJFRS5NYXRoVXRpbHMubGVycChcbiAgICAgICAgICAgIHQucmFkaXVzQm90dG9tICogMC44NixcbiAgICAgICAgICAgIHQucmFkaXVzVG9wICogMC44NixcbiAgICAgICAgICAgIGZyYWNcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHNsYWJNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeShcbiAgICAgICAgICAgICAgc2xhYlJhZGl1cyxcbiAgICAgICAgICAgICAgc2xhYlJhZGl1cyxcbiAgICAgICAgICAgICAgMC4wMDgsXG4gICAgICAgICAgICAgIHQucmFkaWFsU2VnbWVudHNcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBob2xvRmxvb3JTbGFiTWF0XG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBzeSA9IGZyYWMgKiB0LmhlaWdodDtcbiAgICAgICAgICBzbGFiTWVzaC5wb3NpdGlvbi55ID0gc3k7XG4gICAgICAgICAgc2xhYk1lc2guY2FzdFNoYWRvdyA9ICFpc1NvZnR3YXJlR2wgJiYgY3VycmVudFNoYWRvd3NFbmFibGVkO1xuICAgICAgICAgIHNsYWJNZXNoLmN1c3RvbURlcHRoTWF0ZXJpYWwgPSBidWlsZGluZ1NoYWRvd0RlcHRoTWF0O1xuICAgICAgICAgIGJ1aWxkaW5nU2hhZG93Q2FzdGVycy5wdXNoKHNsYWJNZXNoKTtcbiAgICAgICAgICB0b3dlclN1Ykdyb3VwLmFkZChzbGFiTWVzaCk7XG4gICAgICAgICAgZXhwbG9kYWJsZUxheWVycy5wdXNoKHtcbiAgICAgICAgICAgIG1lc2g6IHNsYWJNZXNoLFxuICAgICAgICAgICAgYmFzZVk6IHN5LFxuICAgICAgICAgICAgZXhwbG9kZU9mZnNldDogZnJhYyAqIDAuMzUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYXJ0IDY6IFJvb2Z0b3AgQXJjaGl0ZWN0dXJhbCBDcm93biAmIFRlbGVtZXRyeSBTcGlyZVxuICAgICAgICBjb25zdCBjcm93bkhlaWdodCA9IDAuMjQ7XG4gICAgICAgIGNvbnN0IHNwaXJlTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgIG5ldyBUSFJFRS5Db25lR2VvbWV0cnkodC5yYWRpdXNUb3AgKiAwLjY1LCBjcm93bkhlaWdodCwgdC5yYWRpYWxTZWdtZW50cyksXG4gICAgICAgICAgdC5pc0dvbGRDb3JlID8gaG9sb0dvbGRDb3JlTWF0IDogaG9sb1NoZWxsTWF0XG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNwaXJlWSA9IHQuaGVpZ2h0ICsgY3Jvd25IZWlnaHQgLyAyO1xuICAgICAgICBzcGlyZU1lc2gucG9zaXRpb24ueSA9IHNwaXJlWTtcbiAgICAgICAgc3BpcmVNZXNoLmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsICYmIGN1cnJlbnRTaGFkb3dzRW5hYmxlZDtcbiAgICAgICAgc3BpcmVNZXNoLnJlY2VpdmVTaGFkb3cgPSB0cnVlO1xuICAgICAgICBzcGlyZU1lc2guY3VzdG9tRGVwdGhNYXRlcmlhbCA9IGJ1aWxkaW5nU2hhZG93RGVwdGhNYXQ7XG4gICAgICAgIGJ1aWxkaW5nU2hhZG93Q2FzdGVycy5wdXNoKHNwaXJlTWVzaCk7XG4gICAgICAgIHRvd2VyU3ViR3JvdXAuYWRkKHNwaXJlTWVzaCk7XG4gICAgICAgIGV4cGxvZGFibGVMYXllcnMucHVzaCh7XG4gICAgICAgICAgbWVzaDogc3BpcmVNZXNoLFxuICAgICAgICAgIGJhc2VZOiBzcGlyZVksXG4gICAgICAgICAgZXhwbG9kZU9mZnNldDogMC40OCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gSW52aXNpYmxlIFJheWNhc3QgUHJveHkgQm94IGZvciBpbnN0YW50IGhvdmVyL2NsaWNrIHNlbGVjdGlvblxuICAgICAgY29uc3QgcHJveHlNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjk1LCAxLjc1LCAwLjg1KSxcbiAgICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgdmlzaWJsZTogZmFsc2UgfSlcbiAgICAgICk7XG4gICAgICBwcm94eU1lc2gucG9zaXRpb24ueSA9IDAuODc1O1xuICAgICAgcHJveHlNZXNoLnVzZXJEYXRhLmNsdXN0ZXJJZCA9IGNsdXN0ZXJJZDtcbiAgICAgIGdyb3VwLmFkZChwcm94eU1lc2gpO1xuICAgICAgcmF5Y2FzdFByb3hpZXMucHVzaChwcm94eU1lc2gpO1xuXG4gICAgICBidWlsZGluZ0NsdXN0ZXJzLnB1c2goe1xuICAgICAgICBjbHVzdGVySWQsXG4gICAgICAgIGdyb3VwLFxuICAgICAgICBiYXNlUG9zWDogcG9zWCxcbiAgICAgICAgYmFzZVBvc1o6IHBvc1osXG4gICAgICAgIHRhcmdldFBvc2l0aW9uOiBuZXcgVEhSRUUuVmVjdG9yMyhwb3NYLCAwLjAxNSwgcG9zWiksXG4gICAgICAgIHRvd2VyU3ViR3JvdXBzLFxuICAgICAgICBpbm5lckNvcmVzLFxuICAgICAgICBleHBsb2RhYmxlTGF5ZXJzLFxuICAgICAgICBiYXNlUmluZ3MsXG4gICAgICAgIHNlbGVjdGlvblJpbmcsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gQnVpbGQgTGVmdCBDbHVzdGVyIChBbHBoYSBTcGlyZSBDb21wbGV4IOKAlCB1cCB0byA1IGJ1aWxkaW5ncylcbiAgICBidWlsZFNreXNjcmFwZXJDbHVzdGVyKCdhbHBoYV9zcGlyZScsIC0xLjEyLCAtMC4wNSwgW1xuICAgICAge1xuICAgICAgICBkeDogLTAuMDgsXG4gICAgICAgIGR6OiAwLjA0LFxuICAgICAgICBoZWlnaHQ6IDEuNDgsXG4gICAgICAgIHJhZGl1c0JvdHRvbTogMC4xNCxcbiAgICAgICAgcmFkaXVzVG9wOiAwLjA5LFxuICAgICAgICByYWRpYWxTZWdtZW50czogMTYsXG4gICAgICAgIHR3aXN0QW5nbGU6IDAuODUsXG4gICAgICAgIGlzR29sZENvcmU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZHg6IDAuMTUsXG4gICAgICAgIGR6OiAwLjEyLFxuICAgICAgICBoZWlnaHQ6IDEuMTYsXG4gICAgICAgIHJhZGl1c0JvdHRvbTogMC4xMSxcbiAgICAgICAgcmFkaXVzVG9wOiAwLjEsXG4gICAgICAgIHJhZGlhbFNlZ21lbnRzOiAyMCxcbiAgICAgICAgdHdpc3RBbmdsZTogMC40LFxuICAgICAgICBpc0dvbGRDb3JlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZHg6IDAuMjgsXG4gICAgICAgIGR6OiAtMC4wOCxcbiAgICAgICAgaGVpZ2h0OiAwLjY2LFxuICAgICAgICByYWRpdXNCb3R0b206IDAuMTYsXG4gICAgICAgIHJhZGl1c1RvcDogMC4xNCxcbiAgICAgICAgcmFkaWFsU2VnbWVudHM6IDYsXG4gICAgICAgIHR3aXN0QW5nbGU6IDAuMTUsXG4gICAgICAgIGlzR29sZENvcmU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZHg6IC0wLjI2LFxuICAgICAgICBkejogLTAuMTQsXG4gICAgICAgIGhlaWdodDogMC45NCxcbiAgICAgICAgcmFkaXVzQm90dG9tOiAwLjExLFxuICAgICAgICByYWRpdXNUb3A6IDAuMDgsXG4gICAgICAgIHJhZGlhbFNlZ21lbnRzOiA4LFxuICAgICAgICB0d2lzdEFuZ2xlOiAtMC41NSxcbiAgICAgICAgaXNHb2xkQ29yZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGR4OiAtMC4wMixcbiAgICAgICAgZHo6IDAuMjUsXG4gICAgICAgIGhlaWdodDogMC43OCxcbiAgICAgICAgcmFkaXVzQm90dG9tOiAwLjEsXG4gICAgICAgIHJhZGl1c1RvcDogMC4wOCxcbiAgICAgICAgcmFkaWFsU2VnbWVudHM6IDEyLFxuICAgICAgICB0d2lzdEFuZ2xlOiAwLjUsXG4gICAgICAgIGlzR29sZENvcmU6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdKTtcblxuICAgIC8vIEJ1aWxkIENlbnRlciBDbHVzdGVyIChDb3JlIFN5bmMgTmV1cmFsIE5leHVzIOKAlCB1cCB0byA1IGJ1aWxkaW5ncylcbiAgICBidWlsZFNreXNjcmFwZXJDbHVzdGVyKCdjZW50cmFsX25leHVzJywgMC4wLCAtMC4wOCwgW1xuICAgICAge1xuICAgICAgICBkeDogMC4wLFxuICAgICAgICBkejogMC4wLFxuICAgICAgICBoZWlnaHQ6IDEuNjgsXG4gICAgICAgIHJhZGl1c0JvdHRvbTogMC4xNixcbiAgICAgICAgcmFkaXVzVG9wOiAwLjEyLFxuICAgICAgICByYWRpYWxTZWdtZW50czogNixcbiAgICAgICAgdHdpc3RBbmdsZTogMC45NSxcbiAgICAgICAgaXNHb2xkQ29yZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGR4OiAwLjI4LFxuICAgICAgICBkejogMC4wNSxcbiAgICAgICAgaGVpZ2h0OiAxLjI4LFxuICAgICAgICByYWRpdXNCb3R0b206IDAuMTMsXG4gICAgICAgIHJhZGl1c1RvcDogMC4xMSxcbiAgICAgICAgcmFkaWFsU2VnbWVudHM6IDgsXG4gICAgICAgIHR3aXN0QW5nbGU6IC0wLjY1LFxuICAgICAgICBpc0dvbGRDb3JlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZHg6IC0wLjI0LFxuICAgICAgICBkejogLTAuMDYsXG4gICAgICAgIGhlaWdodDogMC45NixcbiAgICAgICAgcmFkaXVzQm90dG9tOiAwLjExLFxuICAgICAgICByYWRpdXNUb3A6IDAuMDksXG4gICAgICAgIHJhZGlhbFNlZ21lbnRzOiA2LFxuICAgICAgICB0d2lzdEFuZ2xlOiAwLjM1LFxuICAgICAgICBpc0dvbGRDb3JlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGR4OiAwLjE0LFxuICAgICAgICBkejogLTAuMjIsXG4gICAgICAgIGhlaWdodDogMS4xMixcbiAgICAgICAgcmFkaXVzQm90dG9tOiAwLjExLFxuICAgICAgICByYWRpdXNUb3A6IDAuMDgsXG4gICAgICAgIHJhZGlhbFNlZ21lbnRzOiAxMCxcbiAgICAgICAgdHdpc3RBbmdsZTogMC43NSxcbiAgICAgICAgaXNHb2xkQ29yZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkeDogLTAuMTgsXG4gICAgICAgIGR6OiAwLjIyLFxuICAgICAgICBoZWlnaHQ6IDAuODQsXG4gICAgICAgIHJhZGl1c0JvdHRvbTogMC4xLFxuICAgICAgICByYWRpdXNUb3A6IDAuMDgsXG4gICAgICAgIHJhZGlhbFNlZ21lbnRzOiAxNCxcbiAgICAgICAgdHdpc3RBbmdsZTogLTAuNDUsXG4gICAgICAgIGlzR29sZENvcmU6IHRydWUsXG4gICAgICB9LFxuICAgIF0pO1xuXG4gICAgLy8gQnVpbGQgUmlnaHQgQ2x1c3RlciAoT3JiaXRhbCBUd2luICYgTmV1cmFsIEFycmF5IENvbXBsZXgg4oCUIHVwIHRvIDUgYnVpbGRpbmdzKVxuICAgIGJ1aWxkU2t5c2NyYXBlckNsdXN0ZXIoJ29yYml0YWxfdHdpbicsIDEuMTIsIC0wLjAyLCBbXG4gICAgICB7XG4gICAgICAgIGR4OiAtMC4xLFxuICAgICAgICBkejogLTAuMDUsXG4gICAgICAgIGhlaWdodDogMS42MixcbiAgICAgICAgcmFkaXVzQm90dG9tOiAwLjEyLFxuICAgICAgICByYWRpdXNUb3A6IDAuMDksXG4gICAgICAgIHJhZGlhbFNlZ21lbnRzOiA0LFxuICAgICAgICB0d2lzdEFuZ2xlOiAwLjI1LFxuICAgICAgICBpc0dvbGRDb3JlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGR4OiAwLjE2LFxuICAgICAgICBkejogMC4xLFxuICAgICAgICBoZWlnaHQ6IDEuMzgsXG4gICAgICAgIHJhZGl1c0JvdHRvbTogMC4xNCxcbiAgICAgICAgcmFkaXVzVG9wOiAwLjExLFxuICAgICAgICByYWRpYWxTZWdtZW50czogMTIsXG4gICAgICAgIHR3aXN0QW5nbGU6IC0wLjksXG4gICAgICAgIGlzR29sZENvcmU6IHRydWUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkeDogLTAuMjYsXG4gICAgICAgIGR6OiAwLjE0LFxuICAgICAgICBoZWlnaHQ6IDEuMDQsXG4gICAgICAgIHJhZGl1c0JvdHRvbTogMC4xMSxcbiAgICAgICAgcmFkaXVzVG9wOiAwLjA5LFxuICAgICAgICByYWRpYWxTZWdtZW50czogNixcbiAgICAgICAgdHdpc3RBbmdsZTogMC42LFxuICAgICAgICBpc0dvbGRDb3JlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGR4OiAwLjI2LFxuICAgICAgICBkejogLTAuMTUsXG4gICAgICAgIGhlaWdodDogMC44OCxcbiAgICAgICAgcmFkaXVzQm90dG9tOiAwLjExLFxuICAgICAgICByYWRpdXNUb3A6IDAuMDgsXG4gICAgICAgIHJhZGlhbFNlZ21lbnRzOiA4LFxuICAgICAgICB0d2lzdEFuZ2xlOiAtMC41LFxuICAgICAgICBpc0dvbGRDb3JlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZHg6IDAuMDIsXG4gICAgICAgIGR6OiAtMC4yNCxcbiAgICAgICAgaGVpZ2h0OiAxLjE4LFxuICAgICAgICByYWRpdXNCb3R0b206IDAuMSxcbiAgICAgICAgcmFkaXVzVG9wOiAwLjA3LFxuICAgICAgICByYWRpYWxTZWdtZW50czogMTYsXG4gICAgICAgIHR3aXN0QW5nbGU6IDAuOCxcbiAgICAgICAgaXNHb2xkQ29yZTogZmFsc2UsXG4gICAgICB9LFxuICAgIF0pO1xuXG4gICAgLy8gNy4gRmxvYXRpbmcgSW50ZXJhY3RpdmUgR2xhc3MgU2NyZWVucyAoRnJvc3RlZCBHbGFzcyBVSSBtYXRjaGluZyBhdHRhY2hlZCBpbWFnZSArIENBRCBtb2RlKVxuICAgIGNvbnN0IGh1ZFBhbmVsc0dyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgc2NlbmUuYWRkKGh1ZFBhbmVsc0dyb3VwKTtcblxuICAgIGNvbnN0IGh1ZENvbmZpZ3M6IHtcbiAgICAgIHR5cGU6IEh1ZFBhbmVsVHlwZTtcbiAgICAgIHBvczogW251bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICAgICAgcm90WTogbnVtYmVyO1xuICAgICAgc2NhbGU6IFtudW1iZXIsIG51bWJlcl07XG4gICAgICBwYXJhbGxheERlcHRoOiBudW1iZXI7XG4gICAgICBpbml0aWFsSWNvbkluZGV4OiBudW1iZXI7XG4gICAgfVtdID0gW1xuICAgICAge1xuICAgICAgICB0eXBlOiAncHJpc20nLFxuICAgICAgICBwb3M6IFstMS44NSwgMS4wOCwgMC4yNV0sXG4gICAgICAgIHJvdFk6IDAuMzQsXG4gICAgICAgIHNjYWxlOiBbMC42OCwgMC43OF0sXG4gICAgICAgIHBhcmFsbGF4RGVwdGg6IDAuMTgsXG4gICAgICAgIGluaXRpYWxJY29uSW5kZXg6IDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiAndHVyYmluZScsXG4gICAgICAgIHBvczogWy0wLjk1LCAxLjA3LCAtMC41OF0sXG4gICAgICAgIHJvdFk6IDAuMTQsXG4gICAgICAgIHNjYWxlOiBbMC42MiwgMC43MV0sXG4gICAgICAgIHBhcmFsbGF4RGVwdGg6IC0wLjEyLFxuICAgICAgICBpbml0aWFsSWNvbkluZGV4OiAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ2NvcmUnLFxuICAgICAgICBwb3M6IFswLjAyLCAxLjEsIC0wLjcyXSxcbiAgICAgICAgcm90WTogMC4wLFxuICAgICAgICBzY2FsZTogWzAuNjgsIDAuNzhdLFxuICAgICAgICBwYXJhbGxheERlcHRoOiAtMC4xNixcbiAgICAgICAgaW5pdGlhbEljb25JbmRleDogMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdiaW9zcGhlcmUnLFxuICAgICAgICBwb3M6IFswLjk2LCAxLjA3LCAtMC41NV0sXG4gICAgICAgIHJvdFk6IC0wLjE0LFxuICAgICAgICBzY2FsZTogWzAuNjIsIDAuNzFdLFxuICAgICAgICBwYXJhbGxheERlcHRoOiAtMC4xMixcbiAgICAgICAgaW5pdGlhbEljb25JbmRleDogMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICduZXVyYWwnLFxuICAgICAgICBwb3M6IFsxLjg1LCAxLjA4LCAwLjIyXSxcbiAgICAgICAgcm90WTogLTAuMzQsXG4gICAgICAgIHNjYWxlOiBbMC42OCwgMC43OF0sXG4gICAgICAgIHBhcmFsbGF4RGVwdGg6IDAuMTgsXG4gICAgICAgIGluaXRpYWxJY29uSW5kZXg6IDAsXG4gICAgICB9LFxuICAgIF07XG5cbiAgICBsZXQgY3VycmVudEh1ZFNjcmVlblN0eWxlOiBIdWRTY3JlZW5TdHlsZU9wdGlvbiA9XG4gICAgICBjb25maWdSZWYuY3VycmVudC5odWRTY3JlZW5TdHlsZTtcblxuICAgIGNvbnN0IGZsb2F0aW5nSHVkTWVzaGVzOiBUSFJFRS5NZXNoW10gPSBbXTtcbiAgICBjb25zdCBmbG9hdGluZ0h1ZEl0ZW1zOiB7XG4gICAgICB0eXBlOiBIdWRQYW5lbFR5cGU7XG4gICAgICBtZXNoOiBUSFJFRS5NZXNoO1xuICAgICAgbWF0OiBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbDtcbiAgICAgIGJhc2VQb3M6IFRIUkVFLlZlY3RvcjM7XG4gICAgICBwYXJhbGxheERlcHRoOiBudW1iZXI7XG4gICAgICBhY3RpdmVJY29uSW5kZXg6IG51bWJlcjtcbiAgICAgIGhvbG9Qcm9wPzogVEhSRUUuT2JqZWN0M0Q7XG4gICAgfVtdID0gW107XG5cbiAgICAvLyBTaGFyZWQgZmFjZXRlZCBsYXZlbmRlci12aW9sZXQgY3J5c3RhbCBtYXRlcmlhbCAobGlrZSB0aGUgZmxvYXRpbmcgM0QgZ2VtIGJlc2lkZSB0aGUgZ2xhc3MgcGFuZWwgaW4gdGhlIGF0dGFjaGVkIGltYWdlKVxuICAgIGNvbnN0IGxhdmVuZGVyR2VtTWF0ID0gbmV3IFRIUkVFLk1lc2hQaHlzaWNhbE1hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGM0YjVmZCxcbiAgICAgIGVtaXNzaXZlOiAweDZkMjhkOSxcbiAgICAgIGVtaXNzaXZlSW50ZW5zaXR5OiAwLjI4LFxuICAgICAgcm91Z2huZXNzOiAwLjE4LFxuICAgICAgbWV0YWxuZXNzOiAwLjE1LFxuICAgICAgZmxhdFNoYWRpbmc6IHRydWUsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuOTIsXG4gICAgfSk7XG5cbiAgICBodWRDb25maWdzLmZvckVhY2goKGhjKSA9PiB7XG4gICAgICBjb25zdCBpc0dsYXNzVWkgPVxuICAgICAgICBjdXJyZW50SHVkU2NyZWVuU3R5bGUgPT09XG4gICAgICAgICAgJ1N6a2xhbnkgUGFuZWwgSW50ZXJha3R5d255IChGcm9zdGVkIEdsYXNzIFVJKScgfHxcbiAgICAgICAgY3VycmVudEh1ZFNjcmVlblN0eWxlID09PVxuICAgICAgICAgICdTemtsYW55IEVrcmFuIEtyeXN0YWxpY3pueSAoOTglIFByemV6cm9jenlzdG/Fm2NpKSc7XG4gICAgICBjb25zdCBpc1VsdHJhQ2xlYXI5OCA9XG4gICAgICAgIGN1cnJlbnRIdWRTY3JlZW5TdHlsZSA9PT1cbiAgICAgICAgJ1N6a2xhbnkgRWtyYW4gS3J5c3RhbGljem55ICg5OCUgUHJ6ZXpyb2N6eXN0b8WbY2kpJztcbiAgICAgIGNvbnN0IHRleCA9IGNyZWF0ZUZsb2F0aW5nSHVkVGV4dHVyZShcbiAgICAgICAgbWF4QW5pc28sXG4gICAgICAgIGhjLnR5cGUsXG4gICAgICAgIGN1cnJlbnRIdWRTY3JlZW5TdHlsZSxcbiAgICAgICAgaGMuaW5pdGlhbEljb25JbmRleFxuICAgICAgKTtcbiAgICAgIGNvbnN0IG1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIG1hcDogdGV4LFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogaXNVbHRyYUNsZWFyOTggPyAwLjk4IDogaXNHbGFzc1VpID8gMC45NSA6IDAuODYsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgICBibGVuZGluZzogaXNHbGFzc1VpID8gVEhSRUUuTm9ybWFsQmxlbmRpbmcgOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBwYW5lbE1lc2ggPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoaGMuc2NhbGVbMF0sIGhjLnNjYWxlWzFdKSxcbiAgICAgICAgbWF0XG4gICAgICApO1xuICAgICAgcGFuZWxNZXNoLnBvc2l0aW9uLnNldCguLi5oYy5wb3MpO1xuICAgICAgcGFuZWxNZXNoLnJvdGF0aW9uLnkgPSBoYy5yb3RZO1xuICAgICAgcGFuZWxNZXNoLnJlbmRlck9yZGVyID0gNTtcbiAgICAgIHBhbmVsTWVzaC51c2VyRGF0YS5odWRQYW5lbFR5cGUgPSBoYy50eXBlO1xuICAgICAgaHVkUGFuZWxzR3JvdXAuYWRkKHBhbmVsTWVzaCk7XG4gICAgICBmbG9hdGluZ0h1ZE1lc2hlcy5wdXNoKHBhbmVsTWVzaCk7XG5cbiAgICAgIC8vIEF0dGFjaCB0aGUgZmFjZXRlZCBsYXZlbmRlciAzRCBwb2x5aGVkcm9uIGZsb2F0aW5nIGJlc2lkZSB0aGUgZ2xhc3Mgc2NyZWVuIChtYXRjaGluZyByZWZlcmVuY2UgcGhvdG8pXG4gICAgICBjb25zdCBnZW1NZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5JY29zYWhlZHJvbkdlb21ldHJ5KDAuMDk1LCAwKSxcbiAgICAgICAgbGF2ZW5kZXJHZW1NYXRcbiAgICAgICk7XG4gICAgICBnZW1NZXNoLnBvc2l0aW9uLnNldChoYy5zY2FsZVswXSAqIDAuNTYsIDAuMDgsIC0wLjA0KTtcbiAgICAgIHBhbmVsTWVzaC5hZGQoZ2VtTWVzaCk7XG4gICAgICBjb25zdCBob2xvUHJvcDogVEhSRUUuT2JqZWN0M0QgPSBnZW1NZXNoO1xuXG4gICAgICBmbG9hdGluZ0h1ZEl0ZW1zLnB1c2goe1xuICAgICAgICB0eXBlOiBoYy50eXBlLFxuICAgICAgICBtZXNoOiBwYW5lbE1lc2gsXG4gICAgICAgIG1hdCxcbiAgICAgICAgYmFzZVBvczogbmV3IFRIUkVFLlZlY3RvcjMoLi4uaGMucG9zKSxcbiAgICAgICAgcGFyYWxsYXhEZXB0aDogaGMucGFyYWxsYXhEZXB0aCxcbiAgICAgICAgYWN0aXZlSWNvbkluZGV4OiBoYy5pbml0aWFsSWNvbkluZGV4LFxuICAgICAgICBob2xvUHJvcCxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gN2IuIEhvcml6b250YWwgUmVjdGFuZ3VsYXIgUmVmZXJlbmNlIEltYWdlIDNEIFNjcmVlbiAoMTY6OSBMYW5kc2NhcGUgQXNwZWN0IFJhdGlvKVxuICAgIGNvbnN0IHJlZkJpbGxib2FyZEdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgcmVmQmlsbGJvYXJkR3JvdXAucG9zaXRpb24uc2V0KDAuMCwgMi4wNCwgLTEuMjUpO1xuICAgIHNjZW5lLmFkZChyZWZCaWxsYm9hcmRHcm91cCk7XG5cbiAgICAvLyBGcm9zdGVkIHdoaXRlL2xhdmVuZGVyIG91dGVyIGdsYXNzIGJlemVsIGZvciB0aGUgaG9yaXpvbnRhbCByZWN0YW5nbGUgc2NyZWVuXG4gICAgY29uc3QgcmVmQmV6ZWxNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuUGxhbmVHZW9tZXRyeSgxLjg0LCAxLjA2KSxcbiAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweGVkZTlmZSxcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuNzgsXG4gICAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSlcbiAgICApO1xuICAgIHJlZkJlemVsTWVzaC5wb3NpdGlvbi56ID0gLTAuMDA4O1xuICAgIHJlZkJpbGxib2FyZEdyb3VwLmFkZChyZWZCZXplbE1lc2gpO1xuXG4gICAgY29uc3QgcmVmU2NyZWVuTWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGZmZmZmZixcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC45NixcbiAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgfSk7XG4gICAgY29uc3QgcmVmU2NyZWVuTWVzaCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoMS43NiwgMC45OSksXG4gICAgICByZWZTY3JlZW5NYXRcbiAgICApO1xuICAgIHJlZkJpbGxib2FyZEdyb3VwLmFkZChyZWZTY3JlZW5NZXNoKTtcblxuICAgIGxldCBjdXJyZW50UmVmSW1hZ2VVcmwgPSAnJztcbiAgICBjb25zdCB0ZXhMb2FkZXIgPSBuZXcgVEhSRUUuVGV4dHVyZUxvYWRlcigpO1xuICAgIGNvbnN0IGxvYWRSZWZCaWxsYm9hcmRUZXh0dXJlID0gKHVybDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIXVybCkgcmV0dXJuO1xuICAgICAgdGV4TG9hZGVyLmxvYWQoXG4gICAgICAgIHVybCxcbiAgICAgICAgKGxvYWRlZFRleCkgPT4ge1xuICAgICAgICAgIGxvYWRlZFRleC5jb2xvclNwYWNlID0gVEhSRUUuU1JHQkNvbG9yU3BhY2U7XG4gICAgICAgICAgbG9hZGVkVGV4LmFuaXNvdHJvcHkgPSBtYXhBbmlzbztcbiAgICAgICAgICBpZiAocmVmU2NyZWVuTWF0Lm1hcCkgcmVmU2NyZWVuTWF0Lm1hcC5kaXNwb3NlKCk7XG4gICAgICAgICAgcmVmU2NyZWVuTWF0Lm1hcCA9IGxvYWRlZFRleDtcbiAgICAgICAgICByZWZTY3JlZW5NYXQubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICAvLyBJZ25vcmUgbG9hZCBlcnJvcnMgZ3JhY2VmdWxseVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH07XG4gICAgY3VycmVudFJlZkltYWdlVXJsID0gY29uZmlnUmVmLmN1cnJlbnQuY3VzdG9tUmVmZXJlbmNlSW1hZ2VVcmw7XG4gICAgbG9hZFJlZkJpbGxib2FyZFRleHR1cmUoY3VycmVudFJlZkltYWdlVXJsKTtcblxuICAgIC8vIDguIEZvcmVncm91bmQgRGVwdGggT2NjbHVzaW9uIE9iamVjdHMgKEV4ZWN1dGl2ZSBDaGFpcnMgJiBCb2FyZHJvb20gUGlsbGFycylcbiAgICAvLyBEZW1vbnN0cmF0ZXMgQVJLaXQvQVJDb3JlIEVudmlyb25tZW50IERlcHRoIE9jY2x1c2lvbiB3aGVuIGNhbWVyYSBtb3Zlc1xuICAgIGNvbnN0IG9jY2x1c2lvbkdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgc2NlbmUuYWRkKG9jY2x1c2lvbkdyb3VwKTtcblxuICAgIGNvbnN0IGNoYWlyTGVhdGhlck1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgxNjFiMjYsXG4gICAgICByb3VnaG5lc3M6IDAuNDIsXG4gICAgICBtZXRhbG5lc3M6IDAuMjUsXG4gICAgfSk7XG4gICAgY29uc3QgY2hhaXJDaHJvbWVNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4OTRhM2I4LFxuICAgICAgcm91Z2huZXNzOiAwLjIsXG4gICAgICBtZXRhbG5lc3M6IDAuOSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGJ1aWxkRXhlY3V0aXZlQ2hhaXIgPSAoeDogbnVtYmVyLCB6OiBudW1iZXIsIHJvdFk6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgY2hhaXIgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICAgIGNoYWlyLnBvc2l0aW9uLnNldCh4LCBmbG9vclksIHopO1xuICAgICAgY2hhaXIucm90YXRpb24ueSA9IHJvdFk7XG5cbiAgICAgIC8vIFBlZGVzdGFsIGNvbHVtblxuICAgICAgY29uc3QgYmFzZSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjA0LCAwLjI0LCAwLjQyLCAxNiksXG4gICAgICAgIGNoYWlyQ2hyb21lTWF0XG4gICAgICApO1xuICAgICAgYmFzZS5wb3NpdGlvbi55ID0gMC4yMTtcbiAgICAgIGNoYWlyLmFkZChiYXNlKTtcblxuICAgICAgLy8gU2VhdCBjdXNoaW9uXG4gICAgICBjb25zdCBzZWF0ID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjUyLCAwLjA4LCAwLjUpLFxuICAgICAgICBjaGFpckxlYXRoZXJNYXRcbiAgICAgICk7XG4gICAgICBzZWF0LnBvc2l0aW9uLnkgPSAwLjQ0O1xuICAgICAgY2hhaXIuYWRkKHNlYXQpO1xuXG4gICAgICAvLyBIaWdoIGJhY2tyZXN0IChwcm9qZWN0cyBhYm92ZSB0YWJsZXRvcCB0byBkZW1vbnN0cmF0ZSByZWFsLXRpbWUgZGVwdGggb2NjbHVzaW9uKVxuICAgICAgY29uc3QgYmFja3Jlc3QgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuNSwgMC42OCwgMC4wOCksXG4gICAgICAgIGNoYWlyTGVhdGhlck1hdFxuICAgICAgKTtcbiAgICAgIGJhY2tyZXN0LnBvc2l0aW9uLnNldCgwLCAwLjgsIDAuMjIpO1xuICAgICAgYmFja3Jlc3Qucm90YXRpb24ueCA9IC0wLjEyO1xuICAgICAgY2hhaXIuYWRkKGJhY2tyZXN0KTtcblxuICAgICAgLy8gQ2hyb21lIGFybXJlc3RzXG4gICAgICBbLTAuMjYsIDAuMjZdLmZvckVhY2goKGF4KSA9PiB7XG4gICAgICAgIGNvbnN0IGFybSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjA0LCAwLjA0LCAwLjM2KSxcbiAgICAgICAgICBjaGFpckNocm9tZU1hdFxuICAgICAgICApO1xuICAgICAgICBhcm0ucG9zaXRpb24uc2V0KGF4LCAwLjYyLCAwLjA1KTtcbiAgICAgICAgY2hhaXIuYWRkKGFybSk7XG4gICAgICB9KTtcblxuICAgICAgb2NjbHVzaW9uR3JvdXAuYWRkKGNoYWlyKTtcbiAgICB9O1xuXG4gICAgYnVpbGRFeGVjdXRpdmVDaGFpcigtMi4xNSwgMC44MiwgMC42NSk7XG4gICAgYnVpbGRFeGVjdXRpdmVDaGFpcigyLjE1LCAwLjgyLCAtMC42NSk7XG4gICAgYnVpbGRFeGVjdXRpdmVDaGFpcigtMS4zNSwgLTEuMjUsIDIuODUpO1xuICAgIGJ1aWxkRXhlY3V0aXZlQ2hhaXIoMS4zNSwgLTEuMjUsIC0yLjg1KTtcblxuICAgIC8vIDkuIEFyY2hlZCBCb2FyZHJvb20gQXJjaGl0ZWN0dXJlICYgRXh0ZXJpb3IgV2luZG93IFBvcnRhbHMgKEJhY2tncm91bmQgWiA9IC0yLjgpXG4gICAgY29uc3QgYXJjaFdhbGxHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgIGFyY2hXYWxsR3JvdXAucG9zaXRpb24ueiA9IC0yLjY1O1xuICAgIHNjZW5lLmFkZChhcmNoV2FsbEdyb3VwKTtcblxuICAgIGNvbnN0IHN0b25lQXJjaE1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgzYjMzMmIsXG4gICAgICByb3VnaG5lc3M6IDAuNTUsXG4gICAgICBtZXRhbG5lc3M6IDAuMjUsXG4gICAgfSk7XG5cbiAgICAvLyA1IE5lby1Hb3RoaWMgLyBNb2Rlcm5pc3QgQ29sdW1ucyAmIFZhdWx0ZWQgQXJjaGVzIGZyYW1pbmcgdGhlIHdpbmRvd3NcbiAgICBjb25zdCBwaWxsYXJQb3NpdGlvbnMgPSBbLTMuNiwgLTEuOCwgMC4wLCAxLjgsIDMuNl07XG4gICAgcGlsbGFyUG9zaXRpb25zLmZvckVhY2goKHB4KSA9PiB7XG4gICAgICBjb25zdCBjb2wgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4xNiwgMC4yMiwgNC4yLCAxNiksXG4gICAgICAgIHN0b25lQXJjaE1hdFxuICAgICAgKTtcbiAgICAgIGNvbC5wb3NpdGlvbi5zZXQocHgsIGZsb29yWSArIDIuMSwgMCk7XG4gICAgICBhcmNoV2FsbEdyb3VwLmFkZChjb2wpO1xuICAgIH0pO1xuXG4gICAgLy8gVXBwZXIgbWV6emFuaW5lIGJhbGNvbnkgYmVhbSAobWF0Y2hpbmcgdGhlIGN1cnZlZCB1cHBlciBnYWxsZXJ5IGluIHRoZSBwaG90bylcbiAgICBjb25zdCBiYWxjb255QmVhbSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDguMiwgMC4yMiwgMC40NSksXG4gICAgICBzdG9uZUFyY2hNYXRcbiAgICApO1xuICAgIGJhbGNvbnlCZWFtLnBvc2l0aW9uLnNldCgwLCAxLjcyLCAwLjEyKTtcbiAgICBhcmNoV2FsbEdyb3VwLmFkZChiYWxjb255QmVhbSk7XG5cbiAgICAvLyBQb2ludGVkIEdvdGhpYy1Nb2Rlcm4gQXJjaGVzIGFib3ZlIHRoZSBnYWxsZXJ5XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaWxsYXJQb3NpdGlvbnMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICBjb25zdCBtaWRYID0gKHBpbGxhclBvc2l0aW9uc1tpXSArIHBpbGxhclBvc2l0aW9uc1tpICsgMV0pIC8gMjtcbiAgICAgIGNvbnN0IGFyY2hSaW5nID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KDAuOTIsIDAuMDksIDEyLCAzMiwgTWF0aC5QSSksXG4gICAgICAgIHN0b25lQXJjaE1hdFxuICAgICAgKTtcbiAgICAgIGFyY2hSaW5nLnBvc2l0aW9uLnNldChtaWRYLCAxLjgyLCAwKTtcbiAgICAgIGFyY2hXYWxsR3JvdXAuYWRkKGFyY2hSaW5nKTtcbiAgICB9XG5cbiAgICAvLyA5Yi4gTW9kZXJuIFJlY2Vzc2VkIExpbmVhciBMRUQgQ2VpbGluZyBTdHJpcHMgJiBTdW5zZXQgSG9yaXpvbiBHbG93IChtYXRjaGluZyBaZGouIDIgYm9hcmRyb29tIGNlaWxpbmcgJiBzdW5zZXQpXG4gICAgY29uc3QgY2VpbGluZ0FuZFN1bnNldEdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gICAgc2NlbmUuYWRkKGNlaWxpbmdBbmRTdW5zZXRHcm91cCk7XG5cbiAgICBjb25zdCBsZWRTdHJpcE1hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHhmZGU2OGEsXG4gICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgIG9wYWNpdHk6IDAuODUsXG4gICAgfSk7XG4gICAgWy0yLjQsIC0wLjgsIDAuOCwgMi40XS5mb3JFYWNoKChjeCkgPT4ge1xuICAgICAgY29uc3Qgc3RyaXAgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuMDQ1LCAwLjAxNSwgNi4yKSxcbiAgICAgICAgbGVkU3RyaXBNYXRcbiAgICAgICk7XG4gICAgICBzdHJpcC5wb3NpdGlvbi5zZXQoY3gsIDIuODUsIC0wLjUpO1xuICAgICAgY2VpbGluZ0FuZFN1bnNldEdyb3VwLmFkZChzdHJpcCk7XG4gICAgfSk7XG4gICAgWy0yLjIsIC0wLjYsIDEuMF0uZm9yRWFjaCgoY3opID0+IHtcbiAgICAgIGNvbnN0IGNyb3NzU3RyaXAgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KDYuOCwgMC4wMTUsIDAuMDQ1KSxcbiAgICAgICAgbGVkU3RyaXBNYXRcbiAgICAgICk7XG4gICAgICBjcm9zc1N0cmlwLnBvc2l0aW9uLnNldCgwLCAyLjg1LCBjeik7XG4gICAgICBjZWlsaW5nQW5kU3Vuc2V0R3JvdXAuYWRkKGNyb3NzU3RyaXApO1xuICAgIH0pO1xuXG4gICAgLy8gV2FybSBHb2xkZW4gU3Vuc2V0IFNvbGFyIE9yYiBvbiB0aGUgcmlnaHQgaG9yaXpvbiBiZWhpbmQgdGhlIGdsYXNzIGN1cnRhaW4gd2FsbCAoWmRqLiAyIHJpZ2h0IHdpbmRvdyBnbG93KVxuICAgIGNvbnN0IHN1bnNldE9yYk1lc2ggPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjU1LCAyNCwgMjQpLFxuICAgICAgbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgICAgY29sb3I6IDB4ZmJiZjI0LFxuICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogMC42NSxcbiAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICAgIGRlcHRoV3JpdGU6IGZhbHNlLFxuICAgICAgfSlcbiAgICApO1xuICAgIHN1bnNldE9yYk1lc2gucG9zaXRpb24uc2V0KDIuODUsIDAuNzIsIC01LjgpO1xuICAgIGNlaWxpbmdBbmRTdW5zZXRHcm91cC5hZGQoc3Vuc2V0T3JiTWVzaCk7XG5cbiAgICAvLyAxMC4gRXh0ZXJpb3IgU2t5bGluZSAmIER5bmFtaWMgV2luZG93IFBhcnRpY2xlIEVmZmVjdHMgKEJlaGluZCB0aGUgV2luZG93cyBaID0gLTMuNCB0byAtNy44KVxuICAgIGNvbnN0IGV4dGVyaW9yV2luZG93R3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICBleHRlcmlvcldpbmRvd0dyb3VwLnBvc2l0aW9uLnogPSAtMy42O1xuICAgIHNjZW5lLmFkZChleHRlcmlvcldpbmRvd0dyb3VwKTtcblxuICAgIC8vIERpc3RhbnQgZnV0dXJpc3RpYyBjaXR5IHNpbGhvdWV0dGVzIG91dHNpZGUgdGhlIHdpbmRvd3NcbiAgICBjb25zdCBzaWxob3VldHRlTWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweDFlMjkzYixcbiAgICAgIGVtaXNzaXZlOiAweDBmMTcyYSxcbiAgICAgIHJvdWdobmVzczogMC40LFxuICAgICAgbWV0YWxuZXNzOiAwLjcsXG4gICAgfSk7XG4gICAgY29uc3QgZXh0ZXJpb3JUb3dlcnMgPSBbXG4gICAgICB7IHg6IC0yLjYsIHo6IC0xLjgsIHc6IDAuNTUsIGg6IDMuOCB9LFxuICAgICAgeyB4OiAtMS4xLCB6OiAtMi40LCB3OiAwLjQyLCBoOiA0LjUgfSxcbiAgICAgIHsgeDogMC44NSwgejogLTIuMSwgdzogMC40OCwgaDogNC4yIH0sXG4gICAgICB7IHg6IDIuMzUsIHo6IC0xLjYsIHc6IDAuNjIsIGg6IDMuOSB9LFxuICAgIF07XG4gICAgZXh0ZXJpb3JUb3dlcnMuZm9yRWFjaCgoZXQpID0+IHtcbiAgICAgIGNvbnN0IG0gPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgICAgbmV3IFRIUkVFLkJveEdlb21ldHJ5KGV0LncsIGV0LmgsIGV0LncpLFxuICAgICAgICBzaWxob3VldHRlTWF0XG4gICAgICApO1xuICAgICAgbS5wb3NpdGlvbi5zZXQoZXQueCwgZmxvb3JZICsgZXQuaCAvIDIsIGV0LnopO1xuICAgICAgZXh0ZXJpb3JXaW5kb3dHcm91cC5hZGQobSk7XG4gICAgfSk7XG5cbiAgICAvLyBEWU5BTUlDIFdJTkRPVyBQQVJUSUNMRVMgKEF0bW9zcGhlcmljIFNwb3JlcyAvIFNvbGFyIE1vdGVzIC8gQ3liZXIgUmFpbiBiZWhpbmQgd2luZG93cylcbiAgICBjb25zdCBNQVhfUEFSVElDTEVTID0gOTAwO1xuICAgIGNvbnN0IHBhcnRpY2xlUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShNQVhfUEFSVElDTEVTICogMyk7XG4gICAgY29uc3QgcGFydGljbGVDb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KE1BWF9QQVJUSUNMRVMgKiAzKTtcbiAgICBjb25zdCBwYXJ0aWNsZVZlbG9jaXRpZXMgPSBuZXcgRmxvYXQzMkFycmF5KE1BWF9QQVJUSUNMRVMgKiAzKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTUFYX1BBUlRJQ0xFUzsgaSsrKSB7XG4gICAgICBwYXJ0aWNsZVBvc2l0aW9uc1tpICogM10gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA3LjY7IC8vIFggYWNyb3NzIGFsbCA0IGFyY2hlZCB3aW5kb3dzXG4gICAgICBwYXJ0aWNsZVBvc2l0aW9uc1tpICogMyArIDFdID0gZmxvb3JZICsgTWF0aC5yYW5kb20oKSAqIDQuMjsgLy8gWSBoZWlnaHRcbiAgICAgIHBhcnRpY2xlUG9zaXRpb25zW2kgKiAzICsgMl0gPSAtTWF0aC5yYW5kb20oKSAqIDMuMjsgLy8gWiBzdHJpY3RseSBvdXRzaWRlIHRoZSB3aW5kb3dzXG5cbiAgICAgIHBhcnRpY2xlVmVsb2NpdGllc1tpICogM10gPSAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAwLjI1O1xuICAgICAgcGFydGljbGVWZWxvY2l0aWVzW2kgKiAzICsgMV0gPSAwLjE4ICsgTWF0aC5yYW5kb20oKSAqIDAuMzU7XG4gICAgICBwYXJ0aWNsZVZlbG9jaXRpZXNbaSAqIDMgKyAyXSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDAuMTU7XG5cbiAgICAgIC8vIE1peCBvZiBjeWFuIGFuZCB3YXJtIGdvbGRlbiBzdW5zZXQgcGFydGljbGVzXG4gICAgICBjb25zdCBpc0dvbGQgPSBpICUgMyA9PT0gMDtcbiAgICAgIHBhcnRpY2xlQ29sb3JzW2kgKiAzXSA9IGlzR29sZCA/IDEuMCA6IDAuMjI7XG4gICAgICBwYXJ0aWNsZUNvbG9yc1tpICogMyArIDFdID0gaXNHb2xkID8gMC43NiA6IDAuODg7XG4gICAgICBwYXJ0aWNsZUNvbG9yc1tpICogMyArIDJdID0gaXNHb2xkID8gMC4yOCA6IDEuMDtcbiAgICB9XG5cbiAgICBjb25zdCB3aW5kb3dQYXJ0aWNsZXNHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICB3aW5kb3dQYXJ0aWNsZXNHZW8uc2V0QXR0cmlidXRlKFxuICAgICAgJ3Bvc2l0aW9uJyxcbiAgICAgIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocGFydGljbGVQb3NpdGlvbnMsIDMpXG4gICAgKTtcbiAgICB3aW5kb3dQYXJ0aWNsZXNHZW8uc2V0QXR0cmlidXRlKFxuICAgICAgJ2NvbG9yJyxcbiAgICAgIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUocGFydGljbGVDb2xvcnMsIDMpXG4gICAgKTtcblxuICAgIGNvbnN0IHdpbmRvd1BhcnRpY2xlc01hdCA9IG5ldyBUSFJFRS5Qb2ludHNNYXRlcmlhbCh7XG4gICAgICBzaXplOiAwLjA1NSxcbiAgICAgIHZlcnRleENvbG9yczogdHJ1ZSxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC44OCxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCB3aW5kb3dQYXJ0aWNsZVN5c3RlbSA9IG5ldyBUSFJFRS5Qb2ludHMoXG4gICAgICB3aW5kb3dQYXJ0aWNsZXNHZW8sXG4gICAgICB3aW5kb3dQYXJ0aWNsZXNNYXRcbiAgICApO1xuICAgIGV4dGVyaW9yV2luZG93R3JvdXAuYWRkKHdpbmRvd1BhcnRpY2xlU3lzdGVtKTtcblxuICAgIC8vIEluc3RhbmNlZCBBZXJpYWwgTGlnaHQgU3RyZWFtcyBtb3ZpbmcgYWNyb3NzIHRoZSBleHRlcmlvciB3aW5kb3cgdmlzdGFcbiAgICBjb25zdCBTVFJFQU1fQ09VTlQgPSAzNjtcbiAgICBjb25zdCBzdHJlYW1HZW8gPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4zMiwgMC4wMTgsIDAuMDE4KTtcbiAgICBjb25zdCBzdHJlYW1NYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmRlMDQ3LFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjc1LFxuICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgfSk7XG4gICAgY29uc3QgYWVyaWFsU3RyZWFtcyA9IG5ldyBUSFJFRS5JbnN0YW5jZWRNZXNoKFxuICAgICAgc3RyZWFtR2VvLFxuICAgICAgc3RyZWFtTWF0LFxuICAgICAgU1RSRUFNX0NPVU5UXG4gICAgKTtcbiAgICBhZXJpYWxTdHJlYW1zLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgICBleHRlcmlvcldpbmRvd0dyb3VwLmFkZChhZXJpYWxTdHJlYW1zKTtcblxuICAgIGNvbnN0IHN0cmVhbURhdGEgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBTVFJFQU1fQ09VTlQgfSwgKF8sIGlkeCkgPT4gKHtcbiAgICAgIHg6IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDcuMixcbiAgICAgIHk6IC0wLjIgKyBNYXRoLnJhbmRvbSgpICogMi44LFxuICAgICAgejogLTAuNCAtIE1hdGgucmFuZG9tKCkgKiAyLjUsXG4gICAgICBzcGVlZDogKGlkeCAlIDIgPT09IDAgPyAxIDogLTEpICogKDAuNjUgKyBNYXRoLnJhbmRvbSgpICogMC45KSxcbiAgICB9KSk7XG5cbiAgICAvLyAxMGIuIEFlcm9keW5hbWljIFdpbmQgRGlyZWN0aW9uICYgRm9yY2UgVmVjdG9yIFBhcnRpY2xlIFZpc3VhbGl6YXRpb24gKFJlYWN0cyB0byB3aW5kb3dQYXJ0aWNsZURlbnNpdHkpXG4gICAgY29uc3Qgd2luZEZpZWxkR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICB0YWJsZUdyb3VwLmFkZCh3aW5kRmllbGRHcm91cCk7XG5cbiAgICBjb25zdCBNQVhfV0lORF9WRUNUT1JTID0gMTQwO1xuICAgIGNvbnN0IHdpbmRBcnJvd0dlbyA9IG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoMC4wMTUsIDAuMDY4LCA2KTtcbiAgICBjb25zdCB3aW5kQXJyb3dNYXQgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICBvcGFjaXR5OiAwLjg4LFxuICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICBkZXB0aFdyaXRlOiBmYWxzZSxcbiAgICB9KTtcbiAgICBjb25zdCB3aW5kVmVjdG9yQXJyb3dzID0gbmV3IFRIUkVFLkluc3RhbmNlZE1lc2goXG4gICAgICB3aW5kQXJyb3dHZW8sXG4gICAgICB3aW5kQXJyb3dNYXQsXG4gICAgICBNQVhfV0lORF9WRUNUT1JTXG4gICAgKTtcbiAgICB3aW5kVmVjdG9yQXJyb3dzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgICB3aW5kRmllbGRHcm91cC5hZGQod2luZFZlY3RvckFycm93cyk7XG5cbiAgICAvLyBQZXItaW5zdGFuY2UgY29sb3IgdGludGluZyAoY3lhbiB0byBnb2xkZW4tYW1iZXIgaGlnaC12ZWxvY2l0eSBndXN0cylcbiAgICBjb25zdCB3aW5kQ29sb3JIZWxwZXIgPSBuZXcgVEhSRUUuQ29sb3IoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9XSU5EX1ZFQ1RPUlM7IGkrKykge1xuICAgICAgd2luZENvbG9ySGVscGVyLnNldEhleChcbiAgICAgICAgaSAlIDQgPT09IDAgPyAweGZiYmYyNCA6IGkgJSAyID09PSAwID8gMHgwMGYwZmYgOiAweDM4YmRmOFxuICAgICAgKTtcbiAgICAgIHdpbmRWZWN0b3JBcnJvd3Muc2V0Q29sb3JBdChpLCB3aW5kQ29sb3JIZWxwZXIpO1xuICAgIH1cbiAgICBpZiAod2luZFZlY3RvckFycm93cy5pbnN0YW5jZUNvbG9yKSB7XG4gICAgICB3aW5kVmVjdG9yQXJyb3dzLmluc3RhbmNlQ29sb3IubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIFN0cmVhbWxpbmUgdmVjdG9yIHRhaWwgc2VnbWVudHMgKDIgdmVydGljZXMgcGVyIHdpbmQgdmVjdG9yIHBhcnRpY2xlKVxuICAgIGNvbnN0IHdpbmRMaW5lUG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheShNQVhfV0lORF9WRUNUT1JTICogNik7XG4gICAgY29uc3Qgd2luZExpbmVDb2xvcnMgPSBuZXcgRmxvYXQzMkFycmF5KE1BWF9XSU5EX1ZFQ1RPUlMgKiA2KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IE1BWF9XSU5EX1ZFQ1RPUlM7IGkrKykge1xuICAgICAgY29uc3QgaXNXYXJtR3VzdCA9IGkgJSA0ID09PSAwO1xuICAgICAgLy8gSGVhZCB2ZXJ0ZXggKGJyaWdodClcbiAgICAgIHdpbmRMaW5lQ29sb3JzW2kgKiA2XSA9IGlzV2FybUd1c3QgPyAxLjAgOiAwLjEzO1xuICAgICAgd2luZExpbmVDb2xvcnNbaSAqIDYgKyAxXSA9IGlzV2FybUd1c3QgPyAwLjc4IDogMC45MjtcbiAgICAgIHdpbmRMaW5lQ29sb3JzW2kgKiA2ICsgMl0gPSBpc1dhcm1HdXN0ID8gMC4yMiA6IDEuMDtcbiAgICAgIC8vIFRhaWwgdmVydGV4IChmYWRlZClcbiAgICAgIHdpbmRMaW5lQ29sb3JzW2kgKiA2ICsgM10gPSAwLjA1O1xuICAgICAgd2luZExpbmVDb2xvcnNbaSAqIDYgKyA0XSA9IDAuMzg7XG4gICAgICB3aW5kTGluZUNvbG9yc1tpICogNiArIDVdID0gMC42MjtcbiAgICB9XG4gICAgY29uc3Qgd2luZFZlY3RvckxpbmVzR2VvID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG4gICAgd2luZFZlY3RvckxpbmVzR2VvLnNldEF0dHJpYnV0ZShcbiAgICAgICdwb3NpdGlvbicsXG4gICAgICBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHdpbmRMaW5lUG9zaXRpb25zLCAzKVxuICAgICk7XG4gICAgd2luZFZlY3RvckxpbmVzR2VvLnNldEF0dHJpYnV0ZShcbiAgICAgICdjb2xvcicsXG4gICAgICBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKHdpbmRMaW5lQ29sb3JzLCAzKVxuICAgICk7XG4gICAgY29uc3Qgd2luZFZlY3RvckxpbmVzTWF0ID0gbmV3IFRIUkVFLkxpbmVCYXNpY01hdGVyaWFsKHtcbiAgICAgIHZlcnRleENvbG9yczogdHJ1ZSxcbiAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgb3BhY2l0eTogMC43OCxcbiAgICAgIGJsZW5kaW5nOiBUSFJFRS5BZGRpdGl2ZUJsZW5kaW5nLFxuICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3Qgd2luZFZlY3RvckxpbmVzID0gbmV3IFRIUkVFLkxpbmVTZWdtZW50cyhcbiAgICAgIHdpbmRWZWN0b3JMaW5lc0dlbyxcbiAgICAgIHdpbmRWZWN0b3JMaW5lc01hdFxuICAgICk7XG4gICAgd2luZFZlY3RvckxpbmVzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcbiAgICB3aW5kRmllbGRHcm91cC5hZGQod2luZFZlY3RvckxpbmVzKTtcblxuICAgIGNvbnN0IHdpbmRQYXJ0aWNsZXNEYXRhID0gQXJyYXkuZnJvbShcbiAgICAgIHsgbGVuZ3RoOiBNQVhfV0lORF9WRUNUT1JTIH0sXG4gICAgICAoXywgaWR4KSA9PiAoe1xuICAgICAgICB4OiAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAzLjYsXG4gICAgICAgIHk6IDAuMDggKyBNYXRoLnJhbmRvbSgpICogMS42NSxcbiAgICAgICAgejogKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMS43NSxcbiAgICAgICAgYmFzZVNwZWVkOiAwLjU1ICsgKGlkeCAlIDcpICogMC4xMixcbiAgICAgICAgcGhhc2U6IGlkeCAqIDAuNDcsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyAzRCBIb2xvZ3JhcGhpYyBXaW5kIENvbXBhc3MgJiBBbmVtb21ldGVyIEluZGljYXRvciBvbiBMZWZ0IFRhYmxldG9wIENvcm5lclxuICAgIGNvbnN0IHdpbmRDb21wYXNzR3JvdXAgPSBuZXcgVEhSRUUuR3JvdXAoKTtcbiAgICB3aW5kQ29tcGFzc0dyb3VwLnBvc2l0aW9uLnNldCgtMS41NSwgMC4wMTgsIDAuNjgpO1xuICAgIHRhYmxlR3JvdXAuYWRkKHdpbmRDb21wYXNzR3JvdXApO1xuXG4gICAgY29uc3QgY29tcGFzc1JpbmdNZXNoID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuUmluZ0dlb21ldHJ5KDAuMTQsIDAuMTY1LCAzMiksXG4gICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHgzOGJkZjgsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjgyLFxuICAgICAgICBzaWRlOiBUSFJFRS5Eb3VibGVTaWRlLFxuICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gICAgICB9KVxuICAgICk7XG4gICAgY29tcGFzc1JpbmdNZXNoLnJvdGF0aW9uLnggPSAtTWF0aC5QSSAvIDI7XG4gICAgd2luZENvbXBhc3NHcm91cC5hZGQoY29tcGFzc1JpbmdNZXNoKTtcblxuICAgIGNvbnN0IHdpbmRDb21wYXNzQXJyb3dHcm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICAgIHdpbmRDb21wYXNzQXJyb3dHcm91cC5wb3NpdGlvbi55ID0gMC4wMTI7XG4gICAgd2luZENvbXBhc3NHcm91cC5hZGQod2luZENvbXBhc3NBcnJvd0dyb3VwKTtcblxuICAgIGNvbnN0IGNvbXBhc3NBcnJvd1NoYWZ0ID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC4xOCwgMC4wMDgsIDAuMDE2KSxcbiAgICAgIG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgICAgIGNvbG9yOiAweDAwZjBmZixcbiAgICAgICAgdHJhbnNwYXJlbnQ6IHRydWUsXG4gICAgICAgIG9wYWNpdHk6IDAuOSxcbiAgICAgICAgYmxlbmRpbmc6IFRIUkVFLkFkZGl0aXZlQmxlbmRpbmcsXG4gICAgICB9KVxuICAgICk7XG4gICAgd2luZENvbXBhc3NBcnJvd0dyb3VwLmFkZChjb21wYXNzQXJyb3dTaGFmdCk7XG5cbiAgICBjb25zdCBjb21wYXNzQXJyb3dIZWFkID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuQ29uZUdlb21ldHJ5KDAuMDMyLCAwLjA3NSwgOCksXG4gICAgICBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoe1xuICAgICAgICBjb2xvcjogMHhmYmJmMjQsXG4gICAgICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgICAgICBvcGFjaXR5OiAwLjk1LFxuICAgICAgICBibGVuZGluZzogVEhSRUUuQWRkaXRpdmVCbGVuZGluZyxcbiAgICAgIH0pXG4gICAgKTtcbiAgICBjb21wYXNzQXJyb3dIZWFkLnJvdGF0aW9uLnogPSAtTWF0aC5QSSAvIDI7XG4gICAgY29tcGFzc0Fycm93SGVhZC5wb3NpdGlvbi54ID0gMC4xMTtcbiAgICB3aW5kQ29tcGFzc0Fycm93R3JvdXAuYWRkKGNvbXBhc3NBcnJvd0hlYWQpO1xuXG4gICAgLy8gMTEuIFBvaW50ZXIgUGFyYWxsYXggJiBSYXljYXN0aW5nIFNldHVwXG4gICAgY29uc3QgcmF5Y2FzdGVyID0gbmV3IFRIUkVFLlJheWNhc3RlcigpO1xuICAgIGxldCBwb2ludGVyWCA9IDA7XG4gICAgbGV0IHBvaW50ZXJZID0gMDtcbiAgICBsZXQgc21vb3RoZWRQYXJhbGxheFggPSAwO1xuICAgIGxldCBzbW9vdGhlZFBhcmFsbGF4WSA9IDA7XG5cbiAgICBjb25zdCBoYW5kbGVQb2ludGVyTW92ZSA9IChlOiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHJlY3QgPSByZW5kZXJlci5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcG9pbnRlclggPSAoKGUuY2xpZW50WCAtIHJlY3QubGVmdCkgLyByZWN0LndpZHRoKSAqIDIgLSAxO1xuICAgICAgcG9pbnRlclkgPSAtKChlLmNsaWVudFkgLSByZWN0LnRvcCkgLyByZWN0LmhlaWdodCkgKiAyICsgMTtcbiAgICB9O1xuXG4gICAgbGV0IHBvaW50ZXJEb3duUG9zID0geyB4OiAwLCB5OiAwIH07XG4gICAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSAoZTogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBwb2ludGVyRG93blBvcyA9IHsgeDogZS5jbGllbnRYLCB5OiBlLmNsaWVudFkgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlUG9pbnRlclVwID0gKGU6IFBvaW50ZXJFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZGlzdCA9IE1hdGguaHlwb3QoXG4gICAgICAgIGUuY2xpZW50WCAtIHBvaW50ZXJEb3duUG9zLngsXG4gICAgICAgIGUuY2xpZW50WSAtIHBvaW50ZXJEb3duUG9zLnlcbiAgICAgICk7XG4gICAgICBpZiAoZGlzdCA+IDYpIHJldHVybjsgLy8gSWdub3JlIGRyYWdcblxuICAgICAgY29uc3QgcmVjdCA9IHJlbmRlcmVyLmRvbUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBfcG9pbnRlck5kYy5zZXQoXG4gICAgICAgICgoZS5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGgpICogMiAtIDEsXG4gICAgICAgIC0oKGUuY2xpZW50WSAtIHJlY3QudG9wKSAvIHJlY3QuaGVpZ2h0KSAqIDIgKyAxXG4gICAgICApO1xuICAgICAgcmF5Y2FzdGVyLnNldEZyb21DYW1lcmEoX3BvaW50ZXJOZGMsIGNhbWVyYSk7XG5cbiAgICAgIC8vIDEuIENoZWNrIGludGVyYWN0aXZlIDNEIEZsb2F0aW5nIEdsYXNzIFNjcmVlbnMgZmlyc3QgKHN1cHBvcnRzIGNsaWNraW5nIHRoZSA0IGJvdHRvbSBkb2NrIGljb25zISlcbiAgICAgIGlmIChjb25maWdSZWYuY3VycmVudC5zaG93RmxvYXRpbmdIdWRQYW5lbHMpIHtcbiAgICAgICAgY29uc3QgaHVkSGl0cyA9IHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKGZsb2F0aW5nSHVkTWVzaGVzLCBmYWxzZSk7XG4gICAgICAgIGlmIChodWRIaXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBoaXQgPSBodWRIaXRzWzBdO1xuICAgICAgICAgIGNvbnN0IGhpdEl0ZW0gPSBmbG9hdGluZ0h1ZEl0ZW1zLmZpbmQoKGl0ZW0pID0+IGl0ZW0ubWVzaCA9PT0gaGl0Lm9iamVjdCk7XG4gICAgICAgICAgaWYgKGhpdEl0ZW0pIHtcbiAgICAgICAgICAgIGxldCBuZXh0SWNvbklkeCA9IChoaXRJdGVtLmFjdGl2ZUljb25JbmRleCArIDEpICUgNDtcbiAgICAgICAgICAgIGlmIChoaXQudXYpIHtcbiAgICAgICAgICAgICAgLy8gSWYgdXNlciBjbGlja2VkIGluIHRoZSBib3R0b20gcm91bmRlZCBkb2NrIGJhciByZWdpb24gKHV2LnkgPCAwLjMyKSwgcGljayB0aGUgZXhhY3QgaWNvbiAwLi4zXG4gICAgICAgICAgICAgIGlmIChoaXQudXYueSA8IDAuMzIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGl0LnV2LnggPCAwLjMxKSBuZXh0SWNvbklkeCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGl0LnV2LnggPCAwLjUpIG5leHRJY29uSWR4ID0gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoaXQudXYueCA8IDAuNjkpIG5leHRJY29uSWR4ID0gMjtcbiAgICAgICAgICAgICAgICBlbHNlIG5leHRJY29uSWR4ID0gMztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGl0SXRlbS5hY3RpdmVJY29uSW5kZXggPSBuZXh0SWNvbklkeDtcbiAgICAgICAgICAgIGNvbnN0IG5leHRUZXggPSBjcmVhdGVGbG9hdGluZ0h1ZFRleHR1cmUoXG4gICAgICAgICAgICAgIG1heEFuaXNvLFxuICAgICAgICAgICAgICBoaXRJdGVtLnR5cGUsXG4gICAgICAgICAgICAgIGNvbmZpZ1JlZi5jdXJyZW50Lmh1ZFNjcmVlblN0eWxlLFxuICAgICAgICAgICAgICBuZXh0SWNvbklkeFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmIChoaXRJdGVtLm1hdC5tYXApIGhpdEl0ZW0ubWF0Lm1hcC5kaXNwb3NlKCk7XG4gICAgICAgICAgICBoaXRJdGVtLm1hdC5tYXAgPSBuZXh0VGV4O1xuICAgICAgICAgICAgaGl0SXRlbS5tYXQubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAob25TZWxlY3RIdWRSZWYuY3VycmVudCkge1xuICAgICAgICAgICAgICBvblNlbGVjdEh1ZFJlZi5jdXJyZW50KGhpdEl0ZW0udHlwZSwgbmV4dEljb25JZHgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyAyLiBDaGVjayAzRCBIb2xvZ3JhcGhpYyBJbmRpdmlkdWFsIFN1Yi1Nb2RlbHMgJiBCdWlsZGluZyBDbHVzdGVyc1xuICAgICAgY29uc3QgaGl0cyA9IHJheWNhc3Rlci5pbnRlcnNlY3RPYmplY3RzKHJheWNhc3RQcm94aWVzLCBmYWxzZSk7XG4gICAgICBpZiAoaGl0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IGhpdE9iaiA9IGhpdHNbMF0ub2JqZWN0O1xuICAgICAgICBjb25zdCBoaXRJZCA9IGhpdE9iai51c2VyRGF0YS5jbHVzdGVySWQgYXMgQnVpbGRpbmdDbHVzdGVySWQ7XG4gICAgICAgIGNvbnN0IGhpdFN1YklkID0gaGl0T2JqLnVzZXJEYXRhLnN1Yk1vZGVsSWQgYXMgc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgICBpZiAoaGl0U3ViSWQgJiYgb25TZWxlY3RTdWJNb2RlbFJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgb25TZWxlY3RTdWJNb2RlbFJlZi5jdXJyZW50KGhpdFN1YklkLCBoaXRJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb25TZWxlY3RSZWYuY3VycmVudChcbiAgICAgICAgICAgIGNvbmZpZ1JlZi5jdXJyZW50LnNlbGVjdGVkQnVpbGRpbmcgPT09IGhpdElkID8gbnVsbCA6IGhpdElkXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZW5kZXJlci5kb21FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgaGFuZGxlUG9pbnRlck1vdmUpO1xuICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgcmVuZGVyZXIuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBoYW5kbGVQb2ludGVyVXApO1xuXG4gICAgLy8gUHJlLXdhcm0gc2hhZGVyc1xuICAgIGlmICghaXNTb2Z0d2FyZUdsKSB7XG4gICAgICByZW5kZXJlci5jb21waWxlKHNjZW5lLCBjYW1lcmEpO1xuICAgIH1cblxuICAgIC8vIDEyLiBQYWNlZCBSZW5kZXIgTG9vcCAod2l0aCBTb2Z0d2FyZS1XZWJHTCBhZnRlckRyYXcgc3luYylcbiAgICBsZXQgZnJhbWVJZCA9IDA7XG4gICAgY29uc3QgY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcbiAgICBsZXQgbGFzdFNjYW5UcmlnZ2VyID0gY29uZmlnUmVmLmN1cnJlbnQudHJpZ2dlclNjYW5QdWxzZTtcbiAgICAvLyBTdGFydCBhdCAwLjAgc28gYW4gaW5pdGlhbCByYWRpYWwgTGlEQVIgbGFzZXIgc2NhbiB3YXZlIHN3ZWVwcyB0aGUgbW9kZWwgb24gc3RhcnR1cCBhbmQgd2hlbmV2ZXIgdHJpZ2dlclNjYW5QdWxzZSBmaXJlc1xuICAgIGxldCBzY2FuUHVsc2VQcm9ncmVzcyA9IDAuMDtcbiAgICBsZXQgc2NhblJlZnJlc2hzZXR0bGVkID0gZmFsc2U7XG4gICAgbGV0IGZwc0ZyYW1lQ291bnRlciA9IDA7XG4gICAgbGV0IGZwc0FjY3VtdWxhdG9yID0gMDtcbiAgICBsZXQgcGVuZHVsdW1QaGFzZSA9IDA7XG4gICAgbGV0IG5pZ2h0TW9kZUJsZW5kID0gY29uZmlnUmVmLmN1cnJlbnQuZW5hYmxlTmlnaHRNb2RlID8gMS4wIDogMC4wO1xuXG4gICAgLy8gSGVscGVyIHRvIHVwZGF0ZSBhIExpREFSIHBvaW50IGNsb3VkIGR1cmluZyB0aGUgcmFkaWFsIGxhc2VyIHdhdmUgc3dlZXBcbiAgICBjb25zdCB1cGRhdGVQb2ludENsb3VkV2F2ZSA9IChcbiAgICAgIGNsb3VkOiBBbmltYXRlZExpZGFyQ2xvdWQsXG4gICAgICB3YXZlTm9ybTogbnVtYmVyLFxuICAgICAgaXNTY2FubmluZzogYm9vbGVhblxuICAgICkgPT4ge1xuICAgICAgY29uc3QgcG9zQXR0ciA9IGNsb3VkLmdlby5hdHRyaWJ1dGVzLnBvc2l0aW9uIGFzIFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZTtcbiAgICAgIGNvbnN0IGNvbEF0dHIgPSBjbG91ZC5nZW8uYXR0cmlidXRlcy5jb2xvciBhcyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGU7XG4gICAgICBjb25zdCBjb3VudCA9IGNsb3VkLnJhZGlhbERpc3QubGVuZ3RoO1xuXG4gICAgICBpZiAoIWlzU2Nhbm5pbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgcG9zQXR0ci5zZXRZKGksIGNsb3VkLmJhc2VZW2ldKTtcbiAgICAgICAgICBjb2xBdHRyLnNldFhZWihcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICBjbG91ZC5iYXNlQ29sb3JzW2kgKiAzXSxcbiAgICAgICAgICAgIGNsb3VkLmJhc2VDb2xvcnNbaSAqIDMgKyAxXSxcbiAgICAgICAgICAgIGNsb3VkLmJhc2VDb2xvcnNbaSAqIDMgKyAyXVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcG9zQXR0ci5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIGNvbEF0dHIubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHdhdmVGcm9udFJhZGl1cyA9IHdhdmVOb3JtICogKGNsb3VkLm1heFJhZGl1cyAqIDEuMTgpO1xuICAgICAgY29uc3QgYmFuZFdpZHRoID0gY2xvdWQubWF4UmFkaXVzICogMC4xODtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRpc3QgPSBjbG91ZC5yYWRpYWxEaXN0W2ldO1xuICAgICAgICBjb25zdCBkZWx0YURpc3QgPSBkaXN0IC0gd2F2ZUZyb250UmFkaXVzO1xuICAgICAgICBjb25zdCBhYnNEZWx0YSA9IE1hdGguYWJzKGRlbHRhRGlzdCk7XG5cbiAgICAgICAgLy8gR2F1c3NpYW4tbGlrZSBsYXNlciBleGNpdGF0aW9uIGNyZXN0IHJpZ2h0IG9uIHRoZSBleHBhbmRpbmcgcmFkaWFsIHdhdmVmcm9udFxuICAgICAgICBjb25zdCB3YXZlRXhjaXRhdGlvbiA9XG4gICAgICAgICAgYWJzRGVsdGEgPCBiYW5kV2lkdGhcbiAgICAgICAgICAgID8gTWF0aC5jb3MoKGFic0RlbHRhIC8gYmFuZFdpZHRoKSAqIChNYXRoLlBJICogMC41KSlcbiAgICAgICAgICAgIDogMC4wO1xuXG4gICAgICAgIC8vIFBvaW50cyBhbHJlYWR5IHN3ZXB0IGJ5IHRoZSByYWRpYWwgbGFzZXIgd2F2ZSBhcmUgZnJlc2hseSBpbGx1bWluYXRlZDsgcG9pbnRzIGFoZWFkIGRpbSBicmllZmx5IGJlZm9yZSB0aGUgbGFzZXIgaGl0cyB0aGVtXG4gICAgICAgIGNvbnN0IHN3ZXB0RmFjdG9yID1cbiAgICAgICAgICBkZWx0YURpc3QgPD0gMFxuICAgICAgICAgICAgPyAxLjBcbiAgICAgICAgICAgIDogTWF0aC5tYXgoMC4yMiwgMS4wIC0gTWF0aC5taW4oMS4wLCBkZWx0YURpc3QgLyAoYmFuZFdpZHRoICogMi4yKSkgKiAwLjc4KTtcblxuICAgICAgICBwb3NBdHRyLnNldFkoaSwgY2xvdWQuYmFzZVlbaV0gKyB3YXZlRXhjaXRhdGlvbiAqIDAuMDQyKTtcblxuICAgICAgICBjb25zdCBiciA9IGNsb3VkLmJhc2VDb2xvcnNbaSAqIDNdICogc3dlcHRGYWN0b3I7XG4gICAgICAgIGNvbnN0IGJnID0gY2xvdWQuYmFzZUNvbG9yc1tpICogMyArIDFdICogc3dlcHRGYWN0b3I7XG4gICAgICAgIGNvbnN0IGJiID0gY2xvdWQuYmFzZUNvbG9yc1tpICogMyArIDJdICogc3dlcHRGYWN0b3I7XG5cbiAgICAgICAgLy8gTGFzZXIgd2F2ZWZyb250IGZsYXNoIChicmlnaHQgY3lhbi1lbWVyYWxkIC8gd2hpdGUpXG4gICAgICAgIGNvbEF0dHIuc2V0WFlaKFxuICAgICAgICAgIGksXG4gICAgICAgICAgVEhSRUUuTWF0aFV0aWxzLmxlcnAoYnIsIDAuNTUsIHdhdmVFeGNpdGF0aW9uKSxcbiAgICAgICAgICBUSFJFRS5NYXRoVXRpbHMubGVycChiZywgMS4wLCB3YXZlRXhjaXRhdGlvbiksXG4gICAgICAgICAgVEhSRUUuTWF0aFV0aWxzLmxlcnAoYmIsIDAuOTYsIHdhdmVFeGNpdGF0aW9uKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBwb3NBdHRyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgIGNvbEF0dHIubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhZnRlckRyYXcoY2I6ICgpID0+IHZvaWQpIHtcbiAgICAgIGNvbnN0IGdsID0gcmVuZGVyZXIuZ2V0Q29udGV4dCgpIGFzIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG4gICAgICBjb25zdCBzeW5jID0gZ2wuZmVuY2VTeW5jKGdsLlNZTkNfR1BVX0NPTU1BTkRTX0NPTVBMRVRFLCAwKTtcbiAgICAgIGdsLmZsdXNoKCk7XG4gICAgICBjb25zdCBwb2xsID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHN5bmMgJiYgZ2wuZ2V0U3luY1BhcmFtZXRlcihzeW5jLCBnbC5TWU5DX1NUQVRVUyk7XG4gICAgICAgIGlmIChzdGF0ZSA9PT0gZ2wuVU5TSUdOQUxFRCkge1xuICAgICAgICAgIGZyYW1lSWQgPSB3aW5kb3cuc2V0VGltZW91dChwb2xsLCA1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc3luYykgZ2wuZGVsZXRlU3luYyhzeW5jKTtcbiAgICAgICAgICBmcmFtZUlkID0gd2luZG93LnNldFRpbWVvdXQoY2IsIDgwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGZyYW1lSWQgPSB3aW5kb3cuc2V0VGltZW91dChwb2xsLCA1KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0aWNrKCkge1xuICAgICAgY29uc3QgZGVsdGEgPSBNYXRoLm1pbihjbG9jay5nZXREZWx0YSgpLCAwLjEpO1xuICAgICAgY29uc3QgZWxhcHNlZCA9IGNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG4gICAgICBjb25zdCBjZmcgPSBjb25maWdSZWYuY3VycmVudDtcblxuICAgICAgLy8gU21vb3RobHkgYWR2YW5jZSBwZW5kdWx1bSBwaGFzZSBwcm9wb3J0aW9uYWwgdG8gdXNlci1zZWxlY3RlZCBwZW5kdWx1bVNwZWVkICgwID0gc3RvcHBlZC9taW5pbXVtKVxuICAgICAgcGVuZHVsdW1QaGFzZSArPSBkZWx0YSAqIGNmZy5wZW5kdWx1bVNwZWVkICogMC40MjtcblxuICAgICAgLy8gVXBkYXRlIGhvbG9ncmFtIC8gYXJjaGl0ZWN0dXJhbCBmYWNhZGUgdGV4dHVyZSBpZiBzdHlsZSwgcHJlc2V0LCBvciBjdXN0b20gdGV4dHVyZSBVUkwgY2hhbmdlZFxuICAgICAgY29uc3QgbmV4dFByZXNldCA9XG4gICAgICAgIGNmZy5idWlsZGluZ1RleHR1cmVQcmVzZXQgfHwgJ0hvbG9ncmFtIERpYWdyaWQgKERvbXnFm2xueSBDeWphbi1axYJvdG8pJztcbiAgICAgIGNvbnN0IG5leHRDdXN0b21VcmwgPSBjZmcuY3VzdG9tQnVpbGRpbmdUZXh0dXJlVXJsIHx8IG51bGw7XG4gICAgICBpZiAoXG4gICAgICAgIGNmZy5ob2xvZ3JhbVN0eWxlICE9PSBjdXJyZW50SG9sb1N0eWxlIHx8XG4gICAgICAgIG5leHRQcmVzZXQgIT09IGN1cnJlbnRUZXh0dXJlUHJlc2V0IHx8XG4gICAgICAgIG5leHRDdXN0b21VcmwgIT09IGN1cnJlbnRDdXN0b21UZXhVcmxcbiAgICAgICkge1xuICAgICAgICBjdXJyZW50SG9sb1N0eWxlID0gY2ZnLmhvbG9ncmFtU3R5bGU7XG4gICAgICAgIGN1cnJlbnRUZXh0dXJlUHJlc2V0ID0gbmV4dFByZXNldDtcbiAgICAgICAgY3VycmVudEN1c3RvbVRleFVybCA9IG5leHRDdXN0b21Vcmw7XG4gICAgICAgIGFwcGx5QnVpbGRpbmdUZXh0dXJlUHJlc2V0KGN1cnJlbnRUZXh0dXJlUHJlc2V0LCBjdXJyZW50Q3VzdG9tVGV4VXJsKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGV4U2NhbGUgPSBjZmcuYnVpbGRpbmdUZXh0dXJlU2NhbGUgPz8gMS4wO1xuICAgICAgY29uc3QgdGV4T3BhY2l0eSA9IGNmZy5idWlsZGluZ1RleHR1cmVPcGFjaXR5ID8/IDAuODg7XG4gICAgICBob2xvU2hlbGxNYXQub3BhY2l0eSA9IHRleE9wYWNpdHk7XG5cbiAgICAgIC8vIER5bmFtaWNhbGx5IHNjYWxlIGZhY2FkZSB0ZXh0dXJlIHJlcGVhdCAmIHdpcmVmcmFtZSBpbnRlbnNpdHkgYnkgaG9sb2dyYW1NZXNoRGVuc2l0eSBhbmQgYnVpbGRpbmdUZXh0dXJlU2NhbGVcbiAgICAgIGRpYWdyaWRUZXgucmVwZWF0LnNldChcbiAgICAgICAgMiAqIGNmZy5ob2xvZ3JhbU1lc2hEZW5zaXR5ICogdGV4U2NhbGUsXG4gICAgICAgIDQgKiBjZmcuaG9sb2dyYW1NZXNoRGVuc2l0eSAqIHRleFNjYWxlXG4gICAgICApO1xuICAgICAgaG9sb1dpcmVNYXQub3BhY2l0eSA9IE1hdGgubWluKFxuICAgICAgICAwLjk1LFxuICAgICAgICAwLjQyICsgY2ZnLmhvbG9ncmFtTWVzaERlbnNpdHkgKiAwLjI1XG4gICAgICApO1xuXG4gICAgICAvLyBDaGVjayBjYW1lcmEgcHJlc2V0IGNoYW5nZVxuICAgICAgaWYgKGNmZy5jYW1lcmFQcmVzZXQgIT09IGxhc3RQcmVzZXQpIHtcbiAgICAgICAgbGFzdFByZXNldCA9IGNmZy5jYW1lcmFQcmVzZXQ7XG4gICAgICAgIGFjdGl2ZVByZXNldFRyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcmVzZXQgPSBDQU1FUkFfUFJFU0VUU1tjZmcuY2FtZXJhUHJlc2V0XTtcblxuICAgICAgLy8gQ29tcHV0ZSA2RG9GIFBhcmFsbGF4IE9mZnNldCAoY29tYmluaW5nIG1vdXNlIHBvaW50ZXIgKyByZWd1bGF0ZWQgcGVuZHVsdW0gc3dheSlcbiAgICAgIGNvbnN0IHN3YXlBbXBsaXR1ZGVTY2FsZSA9IE1hdGgubWluKDEuMCwgY2ZnLnBlbmR1bHVtU3BlZWQgKiAxLjI1KTtcbiAgICAgIGNvbnN0IGF1dG9PZmZzZXRYID1cbiAgICAgICAgY2ZnLmF1dG9QYXJhbGxheCAmJiBjZmcucGVuZHVsdW1TcGVlZCA+IDAuMDAxXG4gICAgICAgICAgPyBNYXRoLnNpbihwZW5kdWx1bVBoYXNlKSAqIDAuMzIgKiBzd2F5QW1wbGl0dWRlU2NhbGVcbiAgICAgICAgICA6IDA7XG4gICAgICBjb25zdCBhdXRvT2Zmc2V0WSA9XG4gICAgICAgIGNmZy5hdXRvUGFyYWxsYXggJiYgY2ZnLnBlbmR1bHVtU3BlZWQgPiAwLjAwMVxuICAgICAgICAgID8gTWF0aC5jb3MocGVuZHVsdW1QaGFzZSAqIDAuNykgKiAwLjExICogc3dheUFtcGxpdHVkZVNjYWxlXG4gICAgICAgICAgOiAwO1xuICAgICAgY29uc3QgdGFyZ2V0UHggPSAocG9pbnRlclggKiAwLjQ1ICsgYXV0b09mZnNldFgpICogY2ZnLnBhcmFsbGF4SW50ZW5zaXR5O1xuICAgICAgY29uc3QgdGFyZ2V0UHkgPSAocG9pbnRlclkgKiAwLjIyICsgYXV0b09mZnNldFkpICogY2ZnLnBhcmFsbGF4SW50ZW5zaXR5O1xuXG4gICAgICBzbW9vdGhlZFBhcmFsbGF4WCA9IFRIUkVFLk1hdGhVdGlscy5kYW1wKFxuICAgICAgICBzbW9vdGhlZFBhcmFsbGF4WCxcbiAgICAgICAgdGFyZ2V0UHgsXG4gICAgICAgIDUuNSxcbiAgICAgICAgZGVsdGFcbiAgICAgICk7XG4gICAgICBzbW9vdGhlZFBhcmFsbGF4WSA9IFRIUkVFLk1hdGhVdGlscy5kYW1wKFxuICAgICAgICBzbW9vdGhlZFBhcmFsbGF4WSxcbiAgICAgICAgdGFyZ2V0UHksXG4gICAgICAgIDUuNSxcbiAgICAgICAgZGVsdGFcbiAgICAgICk7XG5cbiAgICAgIGlmICghdXNlckRyYWdnaW5nKSB7XG4gICAgICAgIF90YXJnZXRDYW1Qb3Muc2V0KFxuICAgICAgICAgIHByZXNldC5wb3NbMF0gKyBzbW9vdGhlZFBhcmFsbGF4WCxcbiAgICAgICAgICBwcmVzZXQucG9zWzFdICsgc21vb3RoZWRQYXJhbGxheFkgKiAwLjYsXG4gICAgICAgICAgcHJlc2V0LnBvc1syXVxuICAgICAgICApO1xuICAgICAgICBfdGFyZ2V0TG9va0F0LnNldChcbiAgICAgICAgICBwcmVzZXQudGFyZ2V0WzBdIC0gc21vb3RoZWRQYXJhbGxheFggKiAwLjE1LFxuICAgICAgICAgIHByZXNldC50YXJnZXRbMV0sXG4gICAgICAgICAgcHJlc2V0LnRhcmdldFsyXVxuICAgICAgICApO1xuXG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi54ID0gVEhSRUUuTWF0aFV0aWxzLmRhbXAoXG4gICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLngsXG4gICAgICAgICAgX3RhcmdldENhbVBvcy54LFxuICAgICAgICAgIDQuMixcbiAgICAgICAgICBkZWx0YVxuICAgICAgICApO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24ueSA9IFRIUkVFLk1hdGhVdGlscy5kYW1wKFxuICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi55LFxuICAgICAgICAgIF90YXJnZXRDYW1Qb3MueSxcbiAgICAgICAgICA0LjIsXG4gICAgICAgICAgZGVsdGFcbiAgICAgICAgKTtcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnogPSBUSFJFRS5NYXRoVXRpbHMuZGFtcChcbiAgICAgICAgICBjYW1lcmEucG9zaXRpb24ueixcbiAgICAgICAgICBfdGFyZ2V0Q2FtUG9zLnosXG4gICAgICAgICAgNC4yLFxuICAgICAgICAgIGRlbHRhXG4gICAgICAgICk7XG5cbiAgICAgICAgY29udHJvbHMudGFyZ2V0LmxlcnAoX3RhcmdldExvb2tBdCwgTWF0aC5taW4oMSwgZGVsdGEgKiA1KSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBhY3RpdmVQcmVzZXRUcmFuc2l0aW9uICYmXG4gICAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmRpc3RhbmNlVG8oX3RhcmdldENhbVBvcykgPCAwLjA1XG4gICAgICAgICkge1xuICAgICAgICAgIGFjdGl2ZVByZXNldFRyYW5zaXRpb24gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29udHJvbHMudXBkYXRlKCk7XG5cbiAgICAgIC8vIFNtb290aGx5IGludGVycG9sYXRlIE5pZ2h0IE1vZGUgdHJhbnNpdGlvbiAoMC4wID0gU3RhbmRhcmQgTW9kZSwgMS4wID0gTm9jdHVybmFsIE5lb24gQVIpXG4gICAgICBuaWdodE1vZGVCbGVuZCA9IFRIUkVFLk1hdGhVdGlscy5kYW1wKFxuICAgICAgICBuaWdodE1vZGVCbGVuZCxcbiAgICAgICAgY2ZnLmVuYWJsZU5pZ2h0TW9kZSA/IDEuMCA6IDAuMCxcbiAgICAgICAgNS41LFxuICAgICAgICBkZWx0YVxuICAgICAgKTtcblxuICAgICAgLy8gVXBkYXRlIEVudmlyb25tZW50YWwgTGlnaHRpbmcgaW50ZW5zaXR5ICYgQXRtb3NwaGVyaWMgRm9nIChfRm9nRGVuc2l0eSlcbiAgICAgIC8vIEluIE5pZ2h0IE1vZGUsIGFtYmllbnQgcm9vbSBsaWdodGluZyBhdXRvbWF0aWNhbGx5IGRpbXMgYW5kIHNoaWZ0cyB0byBFbGVjdHJpYyBCbHVlICgjMDBmMGZmKSAmIERlZXAgVmlvbGV0ICgjN2MzYWVkKVxuICAgICAgY29uc3QgbmlnaHRBbWJpZW50RGltID0gMS4wIC0gbmlnaHRNb2RlQmxlbmQgKiAwLjY1O1xuICAgICAgc3VuS2V5TGlnaHQuaW50ZW5zaXR5ID0gMS41ICogY2ZnLmVudkxpZ2h0aW5nSW50ZW5zaXR5ICogbmlnaHRBbWJpZW50RGltO1xuICAgICAgc3VuS2V5TGlnaHQuY29sb3IubGVycENvbG9ycyhfY29sU3VuRGF5LCBfY29sU3VuTmlnaHQsIG5pZ2h0TW9kZUJsZW5kKTtcblxuICAgICAgaGVtaUxpZ2h0LmludGVuc2l0eSA9XG4gICAgICAgIDAuNjUgKiBjZmcuZW52TGlnaHRpbmdJbnRlbnNpdHkgKiAoMS4wIC0gbmlnaHRNb2RlQmxlbmQgKiAwLjUpO1xuICAgICAgaGVtaUxpZ2h0LmNvbG9yLmxlcnBDb2xvcnMoXG4gICAgICAgIF9jb2xIZW1pU2t5RGF5LFxuICAgICAgICBfY29sSGVtaVNreU5pZ2h0LFxuICAgICAgICBuaWdodE1vZGVCbGVuZFxuICAgICAgKTtcbiAgICAgIGhlbWlMaWdodC5ncm91bmRDb2xvci5sZXJwQ29sb3JzKFxuICAgICAgICBfY29sSGVtaUdyb3VuZERheSxcbiAgICAgICAgX2NvbEhlbWlHcm91bmROaWdodCxcbiAgICAgICAgbmlnaHRNb2RlQmxlbmRcbiAgICAgICk7XG5cbiAgICAgIHRhYmxlQ3lhbkxpZ2h0LmludGVuc2l0eSA9XG4gICAgICAgIDIuMSAqIGNmZy5lbnZMaWdodGluZ0ludGVuc2l0eSAqICgxLjAgKyBuaWdodE1vZGVCbGVuZCAqIDAuNTUpO1xuICAgICAgdGFibGVDeWFuTGlnaHQuY29sb3IubGVycENvbG9ycyhcbiAgICAgICAgX2NvbFRhYmxlQ3lhbkRheSxcbiAgICAgICAgX2NvbFRhYmxlQ3lhbk5pZ2h0LFxuICAgICAgICBuaWdodE1vZGVCbGVuZFxuICAgICAgKTtcblxuICAgICAgdGFibGVHb2xkTGlnaHQuaW50ZW5zaXR5ID0gMS41ICogKDEuMCArIG5pZ2h0TW9kZUJsZW5kICogMC45KTtcbiAgICAgIHRhYmxlR29sZExpZ2h0LmNvbG9yLmxlcnBDb2xvcnMoXG4gICAgICAgIF9jb2xUYWJsZUFjY2VudERheSxcbiAgICAgICAgX2NvbFRhYmxlQWNjZW50TmlnaHQsXG4gICAgICAgIG5pZ2h0TW9kZUJsZW5kXG4gICAgICApO1xuXG4gICAgICAoc2NlbmUuYmFja2dyb3VuZCBhcyBUSFJFRS5Db2xvcikubGVycENvbG9ycyhcbiAgICAgICAgX2NvbEJnRGF5LFxuICAgICAgICBfY29sQmdOaWdodCxcbiAgICAgICAgbmlnaHRNb2RlQmxlbmRcbiAgICAgICk7XG4gICAgICBhdG1vc3BoZXJpY0ZvZy5jb2xvci5sZXJwQ29sb3JzKFxuICAgICAgICBfY29sRm9nRGF5LFxuICAgICAgICBfY29sRm9nTmlnaHQsXG4gICAgICAgIG5pZ2h0TW9kZUJsZW5kXG4gICAgICApO1xuICAgICAgYXRtb3NwaGVyaWNGb2cuZGVuc2l0eSA9IGNmZy5lbmFibGVBdG1vc3BoZXJpY0ZvZ1xuICAgICAgICA/IDAuMDY1ICsgbmlnaHRNb2RlQmxlbmQgKiAwLjAxOFxuICAgICAgICA6IDAuMDtcblxuICAgICAgZmxvb3JNYXQuY29sb3IubGVycENvbG9ycyhfY29sRmxvb3JEYXksIF9jb2xGbG9vck5pZ2h0LCBuaWdodE1vZGVCbGVuZCk7XG4gICAgICB0YWJsZXRvcE1hcE1hdC5lbWlzc2l2ZS5sZXJwQ29sb3JzKFxuICAgICAgICBfY29sTWFwRW1pc3NpdmVEYXksXG4gICAgICAgIF9jb2xNYXBFbWlzc2l2ZU5pZ2h0LFxuICAgICAgICBuaWdodE1vZGVCbGVuZFxuICAgICAgKTtcbiAgICAgIHRhYmxldG9wTWFwTWF0LmVtaXNzaXZlSW50ZW5zaXR5ID0gMC45MiArIG5pZ2h0TW9kZUJsZW5kICogMC4yODtcblxuICAgICAgLy8gU2hpZnQgSG9sb2dyYW0gJiBCSU0gU3RydWN0dXJhbCBDb3JlIHBhbGV0dGUgdG8gRWxlY3RyaWMgQmx1ZSAoIzAwZjBmZikgYW5kIERlZXAgVmlvbGV0ICgjN2MzYWVkKSBpbiBOaWdodCBNb2RlXG4gICAgICBob2xvR29sZENvcmVNYXQuY29sb3IubGVycENvbG9ycyhcbiAgICAgICAgX2NvbENvcmVEYXksXG4gICAgICAgIF9jb2xDb3JlTmlnaHQsXG4gICAgICAgIG5pZ2h0TW9kZUJsZW5kXG4gICAgICApO1xuICAgICAgaG9sb0dvbGRDb3JlTWF0LmVtaXNzaXZlLmxlcnBDb2xvcnMoXG4gICAgICAgIF9jb2xDb3JlRW1pc3NpdmVEYXksXG4gICAgICAgIF9jb2xDb3JlRW1pc3NpdmVOaWdodCxcbiAgICAgICAgbmlnaHRNb2RlQmxlbmRcbiAgICAgICk7XG4gICAgICBob2xvR29sZENvcmVNYXQuZW1pc3NpdmVJbnRlbnNpdHkgPSAxLjE1ICsgbmlnaHRNb2RlQmxlbmQgKiAwLjY1O1xuXG4gICAgICBob2xvV2lyZU1hdC5jb2xvci5sZXJwQ29sb3JzKF9jb2xXaXJlRGF5LCBfY29sV2lyZU5pZ2h0LCBuaWdodE1vZGVCbGVuZCk7XG4gICAgICBob2xvRmxvb3JTbGFiTWF0LmNvbG9yLmxlcnBDb2xvcnMoXG4gICAgICAgIF9jb2xTbGFiRGF5LFxuICAgICAgICBfY29sU2xhYk5pZ2h0LFxuICAgICAgICBuaWdodE1vZGVCbGVuZFxuICAgICAgKTtcblxuICAgICAgaWYgKGN1cnJlbnRUZXh0dXJlUHJlc2V0ID09PSAnSG9sb2dyYW0gRGlhZ3JpZCAoRG9tecWbbG55IEN5amFuLVrFgm90byknKSB7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5jb2xvci5sZXJwQ29sb3JzKFxuICAgICAgICAgIF9jb2xTaGVsbEhvbG9EYXksXG4gICAgICAgICAgX2NvbFNoZWxsSG9sb05pZ2h0LFxuICAgICAgICAgIG5pZ2h0TW9kZUJsZW5kXG4gICAgICAgICk7XG4gICAgICAgIGhvbG9TaGVsbE1hdC5lbWlzc2l2ZS5sZXJwQ29sb3JzKFxuICAgICAgICAgIF9jb2xTaGVsbEVtaXNzaXZlRGF5LFxuICAgICAgICAgIF9jb2xTaGVsbEVtaXNzaXZlTmlnaHQsXG4gICAgICAgICAgbmlnaHRNb2RlQmxlbmRcbiAgICAgICAgKTtcbiAgICAgICAgaG9sb1NoZWxsTWF0LmVtaXNzaXZlSW50ZW5zaXR5ID0gMC43OCArIG5pZ2h0TW9kZUJsZW5kICogMC41MjtcbiAgICAgIH1cblxuICAgICAgbGVkU3RyaXBNYXQuY29sb3IubGVycENvbG9ycyhfY29sTGVkRGF5LCBfY29sTGVkTmlnaHQsIG5pZ2h0TW9kZUJsZW5kKTtcbiAgICAgIChzdW5zZXRPcmJNZXNoLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKS5jb2xvci5sZXJwQ29sb3JzKFxuICAgICAgICBfY29sVGFibGVBY2NlbnREYXksXG4gICAgICAgIF9jb2xUYWJsZUFjY2VudE5pZ2h0LFxuICAgICAgICBuaWdodE1vZGVCbGVuZFxuICAgICAgKTtcbiAgICAgIChzdW5zZXRPcmJNZXNoLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKS5vcGFjaXR5ID1cbiAgICAgICAgMC42NSAqICgxLjAgLSBuaWdodE1vZGVCbGVuZCAqIDAuNDUpO1xuICAgICAgc2lsaG91ZXR0ZU1hdC5lbWlzc2l2ZS5sZXJwQ29sb3JzKFxuICAgICAgICBfY29sU2lsaG91ZXR0ZUVtaXNzaXZlRGF5LFxuICAgICAgICBfY29sU2lsaG91ZXR0ZUVtaXNzaXZlTmlnaHQsXG4gICAgICAgIG5pZ2h0TW9kZUJsZW5kXG4gICAgICApO1xuICAgICAgc3RyZWFtTWF0LmNvbG9yLmxlcnBDb2xvcnMoX2NvbExlZERheSwgX2NvbENvcmVOaWdodCwgbmlnaHRNb2RlQmxlbmQpO1xuXG4gICAgICAvLyBVcGRhdGUgQnVpbGRpbmcgU2hhZG93IE1hcHBpbmcgKENhc3QgU2hhZG93cyBvbnRvIFZpcnR1YWwgRmxvb3IgJiBUYWJsZXRvcCkgYW5kIFNoYWRvdyBNYXAgUXVhbGl0eVxuICAgICAgY29uc3QgbmV4dFNoYWRvd3NFbmFibGVkID0gY2ZnLmVuYWJsZUJ1aWxkaW5nU2hhZG93cyA/PyB0cnVlO1xuICAgICAgY29uc3QgbmV4dFNoYWRvd1F1YWxpdHk6IFNoYWRvd01hcFF1YWxpdHlPcHRpb24gPVxuICAgICAgICBjZmcuc2hhZG93TWFwUXVhbGl0eSB8fCAnV3lzb2thICgyMDQ4w5cyMDQ4IMK3IENyaXNwIFBDRiknO1xuXG4gICAgICBpZiAobmV4dFNoYWRvd3NFbmFibGVkICE9PSBjdXJyZW50U2hhZG93c0VuYWJsZWQpIHtcbiAgICAgICAgY3VycmVudFNoYWRvd3NFbmFibGVkID0gbmV4dFNoYWRvd3NFbmFibGVkO1xuICAgICAgICBjb25zdCBzaGFkb3dzQWN0aXZlID0gIWlzU29mdHdhcmVHbCAmJiBjdXJyZW50U2hhZG93c0VuYWJsZWQ7XG4gICAgICAgIHJlbmRlcmVyLnNoYWRvd01hcC5lbmFibGVkID0gc2hhZG93c0FjdGl2ZTtcbiAgICAgICAgc3VuS2V5TGlnaHQuY2FzdFNoYWRvdyA9IHNoYWRvd3NBY3RpdmU7XG4gICAgICAgIGZsb29yU2hhZG93UmVjZWl2ZXIudmlzaWJsZSA9IHNoYWRvd3NBY3RpdmU7XG4gICAgICAgIHRhYmxlU2hhZG93UmVjZWl2ZXIudmlzaWJsZSA9IHNoYWRvd3NBY3RpdmU7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVpbGRpbmdTaGFkb3dDYXN0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYnVpbGRpbmdTaGFkb3dDYXN0ZXJzW2ldLmNhc3RTaGFkb3cgPSBzaGFkb3dzQWN0aXZlO1xuICAgICAgICB9XG4gICAgICAgIGZsb29yTWF0Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgdGFibGV0b3BNYXBNYXQubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgICBmbG9vclNoYWRvd01hdC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIHRhYmxlU2hhZG93TWF0Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5leHRTaGFkb3dRdWFsaXR5ICE9PSBjdXJyZW50U2hhZG93UXVhbGl0eSkge1xuICAgICAgICBjdXJyZW50U2hhZG93UXVhbGl0eSA9IG5leHRTaGFkb3dRdWFsaXR5O1xuICAgICAgICBjb25zdCBxUGFyYW1zID0gZ2V0U2hhZG93UXVhbGl0eUNvbmZpZyhjdXJyZW50U2hhZG93UXVhbGl0eSk7XG4gICAgICAgIHN1bktleUxpZ2h0LnNoYWRvdy5tYXBTaXplLnNldChxUGFyYW1zLm1hcFNpemUsIHFQYXJhbXMubWFwU2l6ZSk7XG4gICAgICAgIHN1bktleUxpZ2h0LnNoYWRvdy5yYWRpdXMgPSBxUGFyYW1zLnJhZGl1cztcbiAgICAgICAgc3VuS2V5TGlnaHQuc2hhZG93LmJpYXMgPSBxUGFyYW1zLmJpYXM7XG4gICAgICAgIHN1bktleUxpZ2h0LnNoYWRvdy5ub3JtYWxCaWFzID0gcVBhcmFtcy5ub3JtYWxCaWFzO1xuICAgICAgICBpZiAoc3VuS2V5TGlnaHQuc2hhZG93Lm1hcCkge1xuICAgICAgICAgIHN1bktleUxpZ2h0LnNoYWRvdy5tYXAuZGlzcG9zZSgpO1xuICAgICAgICAgIHN1bktleUxpZ2h0LnNoYWRvdy5tYXAgPSBudWxsIGFzIHVua25vd24gYXMgVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyZXIuc2hhZG93TWFwLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gRHluYW1pY2FsbHkgc2NhbGUgVGFibGV0b3AgJiBSb29tIGdlb21ldHJ5IGJhc2VkIG9uIHVzZXItY29uZmlndXJlZCBkaW1lbnNpb25zXG4gICAgICBjb25zdCB0YWJsZVNjYWxlWCA9IGNmZy50YWJsZVdpZHRoTWV0ZXJzIC8gMy45O1xuICAgICAgY29uc3QgdGFibGVTY2FsZVogPSBjZmcudGFibGVEZXB0aE1ldGVycyAvIDEuOTU7XG4gICAgICB0YWJsZUJhc2VNZXNoLnNjYWxlLnNldCh0YWJsZVNjYWxlWCwgMSwgdGFibGVTY2FsZVopO1xuICAgICAgdGFibGV0b3BNYXBNZXNoLnNjYWxlLnNldCh0YWJsZVNjYWxlWCwgdGFibGVTY2FsZVosIDEpO1xuICAgICAgdGFibGVTaGFkb3dSZWNlaXZlci5zY2FsZS5zZXQodGFibGVTY2FsZVgsIHRhYmxlU2NhbGVaLCAxKTtcbiAgICAgIHRhYmxlTGlkYXJQbGFuZS5zY2FsZS5zZXQodGFibGVTY2FsZVgsIHRhYmxlU2NhbGVaLCAxKTtcblxuICAgICAgY29uc3Qgcm9vbVNjYWxlWCA9IGNmZy5yb29tV2lkdGhNZXRlcnMgLyAxNC4wO1xuICAgICAgY29uc3Qgcm9vbVNjYWxlWiA9IGNmZy5yb29tRGVwdGhNZXRlcnMgLyAxMi4wO1xuICAgICAgZmxvb3JNZXNoLnNjYWxlLnNldChyb29tU2NhbGVYLCByb29tU2NhbGVaLCAxKTtcbiAgICAgIGZsb29yU2hhZG93UmVjZWl2ZXIuc2NhbGUuc2V0KHJvb21TY2FsZVgsIHJvb21TY2FsZVosIDEpO1xuICAgICAgZmxvb3JMaWRhclBsYW5lLnNjYWxlLnNldChyb29tU2NhbGVYLCByb29tU2NhbGVaLCAxKTtcbiAgICAgIGFyY2hXYWxsR3JvdXAuc2NhbGUuc2V0KHJvb21TY2FsZVgsIDEsIDEpO1xuICAgICAgYXJjaFdhbGxHcm91cC5wb3NpdGlvbi56ID0gVEhSRUUuTWF0aFV0aWxzLmRhbXAoXG4gICAgICAgIGFyY2hXYWxsR3JvdXAucG9zaXRpb24ueixcbiAgICAgICAgLTIuNjUgKiByb29tU2NhbGVaLFxuICAgICAgICA2LjAsXG4gICAgICAgIGRlbHRhXG4gICAgICApO1xuICAgICAgZXh0ZXJpb3JXaW5kb3dHcm91cC5zY2FsZS5zZXQocm9vbVNjYWxlWCwgMSwgMSk7XG4gICAgICBleHRlcmlvcldpbmRvd0dyb3VwLnBvc2l0aW9uLnogPSBUSFJFRS5NYXRoVXRpbHMuZGFtcChcbiAgICAgICAgZXh0ZXJpb3JXaW5kb3dHcm91cC5wb3NpdGlvbi56LFxuICAgICAgICAtMy42ICogcm9vbVNjYWxlWixcbiAgICAgICAgNi4wLFxuICAgICAgICBkZWx0YVxuICAgICAgKTtcblxuICAgICAgLy8gVXBkYXRlIEFSS2l0L0FSQ29yZSBTdXJmYWNlIFBsYW5lIERldGVjdGlvbiBHcmlkcyAmIExpREFSIFBvaW50IENsb3VkIChUYWJsZXRvcCAmIEZsb29yKVxuICAgICAgY29uc3Qgc2hvd1RhYmxlUGxhbmUgPSBjZmcuc2hvd0RlcHRoR3JpZDtcbiAgICAgIGNvbnN0IHNob3dGbG9vclBsYW5lID1cbiAgICAgICAgY2ZnLnNob3dEZXB0aEdyaWQgJiZcbiAgICAgICAgY2ZnLnBsYW5lRGV0ZWN0aW9uICE9PSAnVHlsa28gYmxhdCBzdG/FgnUgKFRhYmxldG9wIEFuY2hvciknO1xuICAgICAgdGFibGVMaWRhclBsYW5lLnZpc2libGUgPSBzaG93VGFibGVQbGFuZTtcbiAgICAgIGZsb29yTGlkYXJQbGFuZS52aXNpYmxlID0gc2hvd0Zsb29yUGxhbmU7XG4gICAgICBsaWRhclRhYmxlUG9pbnRDbG91ZC52aXNpYmxlID0gc2hvd1RhYmxlUGxhbmU7XG4gICAgICBsaWRhckZsb29yUG9pbnRDbG91ZC52aXNpYmxlID0gc2hvd0Zsb29yUGxhbmU7XG4gICAgICBsaWRhclRhYmxlUG9pbnRDbG91ZC5zY2FsZS5zZXQodGFibGVTY2FsZVgsIDEsIHRhYmxlU2NhbGVaKTtcbiAgICAgIGxpZGFyRmxvb3JQb2ludENsb3VkLnNjYWxlLnNldChyb29tU2NhbGVYLCAxLCByb29tU2NhbGVaKTtcblxuICAgICAgLy8gUmFkaWFsIExpREFSIExhc2VyIFNjYW4gV2F2ZSAmIERlcHRoIEdyaWQgUmVmcmVzaCBBbmltYXRpb24gKGFjdGl2YXRlZCBvbiB0cmlnZ2VyU2NhblB1bHNlKVxuICAgICAgaWYgKGNmZy50cmlnZ2VyU2NhblB1bHNlICE9PSBsYXN0U2NhblRyaWdnZXIpIHtcbiAgICAgICAgbGFzdFNjYW5UcmlnZ2VyID0gY2ZnLnRyaWdnZXJTY2FuUHVsc2U7XG4gICAgICAgIHNjYW5QdWxzZVByb2dyZXNzID0gMC4wO1xuICAgICAgICBzY2FuUmVmcmVzaHNldHRsZWQgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjYW5QdWxzZVByb2dyZXNzIDwgMS4wKSB7XG4gICAgICAgIHNjYW5QdWxzZVByb2dyZXNzID0gTWF0aC5taW4oMS4wLCBzY2FuUHVsc2VQcm9ncmVzcyArIGRlbHRhICogMC41OCk7XG4gICAgICAgIC8vIFNtb290aCBlYXNlLW91dCByYWRpYWwgZXhwYW5zaW9uIGN1cnZlXG4gICAgICAgIGNvbnN0IGVhc2VkV2F2ZSA9IDEuMCAtIE1hdGgucG93KDEuMCAtIHNjYW5QdWxzZVByb2dyZXNzLCAyLjE1KTtcbiAgICAgICAgY29uc3QgZmFkZUVudmVsb3BlID0gTWF0aC5zaW4oc2NhblB1bHNlUHJvZ3Jlc3MgKiBNYXRoLlBJKTtcbiAgICAgICAgY29uc3QgdGFpbEZhZGUgPSAxLjAgLSBzY2FuUHVsc2VQcm9ncmVzcztcblxuICAgICAgICAvLyAxLiBFeHBhbmQgVGFibGV0b3AgUHJpbWFyeSAmIFRyYWlsaW5nIExhc2VyIFJpbmdzIGZyb20gY2VudGVyICgwLDAsMClcbiAgICAgICAgY29uc3QgdGFibGVSYWRpdXMgPSAwLjA4ICsgZWFzZWRXYXZlICogMi4zNSAqIHRhYmxlU2NhbGVYO1xuICAgICAgICBzY2FuUmluZ01lc2guc2NhbGUuc2V0KHRhYmxlUmFkaXVzLCB0YWJsZVJhZGl1cywgMSk7XG4gICAgICAgIHNjYW5SaW5nTWF0Lm9wYWNpdHkgPSB0YWlsRmFkZSAqIDAuOTU7XG5cbiAgICAgICAgY29uc3QgdHJhaWxpbmdSYWRpdXMgPSBNYXRoLm1heCgwLjA0LCB0YWJsZVJhZGl1cyAqIDAuODIpO1xuICAgICAgICBzY2FuVHJhaWxpbmdSaW5nTWVzaC5zY2FsZS5zZXQodHJhaWxpbmdSYWRpdXMsIHRyYWlsaW5nUmFkaXVzLCAxKTtcbiAgICAgICAgc2NhblRyYWlsaW5nUmluZ01hdC5vcGFjaXR5ID0gZmFkZUVudmVsb3BlICogMC43MjtcblxuICAgICAgICAvLyAyLiBFeHBhbmQgM0QgVmVydGljYWwgQ3lsaW5kcmljYWwgTGFzZXIgQ3VydGFpbiBzbGljaW5nIHRocm91Z2ggdGhlIGJ1aWxkaW5nc1xuICAgICAgICBjb25zdCBjdXJ0YWluUmFkaXVzID0gMC4wNiArIGVhc2VkV2F2ZSAqIDEuOTUgKiB0YWJsZVNjYWxlWDtcbiAgICAgICAgc2Nhbkxhc2VyQ3VydGFpbk1lc2guc2NhbGUuc2V0KFxuICAgICAgICAgIGN1cnRhaW5SYWRpdXMsXG4gICAgICAgICAgMC4zNSArIGZhZGVFbnZlbG9wZSAqIDAuODUsXG4gICAgICAgICAgY3VydGFpblJhZGl1c1xuICAgICAgICApO1xuICAgICAgICBzY2FuTGFzZXJDdXJ0YWluTWF0Lm9wYWNpdHkgPSBmYWRlRW52ZWxvcGUgKiAwLjI4O1xuXG4gICAgICAgIC8vIDMuIEV4cGFuZCAzRCBIZW1pc3BoZXJpY2FsIExpREFSIFdpcmVmcmFtZSBEb21lXG4gICAgICAgIGNvbnN0IGRvbWVSYWRpdXMgPSAwLjEgKyBlYXNlZFdhdmUgKiAyLjE1ICogdGFibGVTY2FsZVg7XG4gICAgICAgIHNjYW5Eb21lV2lyZU1lc2guc2NhbGUuc2V0KGRvbWVSYWRpdXMsIGRvbWVSYWRpdXMgKiAwLjc4LCBkb21lUmFkaXVzKTtcbiAgICAgICAgc2NhbkRvbWVXaXJlTWVzaC5yb3RhdGlvbi55ID0gZWxhcHNlZCAqIDAuODU7XG4gICAgICAgIHNjYW5Eb21lV2lyZU1hdC5vcGFjaXR5ID0gZmFkZUVudmVsb3BlICogMC4zNDtcblxuICAgICAgICAvLyA0LiBFeHBhbmQgJiBSb3RhdGUgMjQgUmFkaWFsIExhc2VyIFNwb2tlcyBvbiBUYWJsZXRvcFxuICAgICAgICBzY2FuUmFkaWFsU3Bva2VzLnNjYWxlLnNldCh0YWJsZVJhZGl1cywgMSwgdGFibGVSYWRpdXMpO1xuICAgICAgICBzY2FuUmFkaWFsU3Bva2VzLnJvdGF0aW9uLnkgPSBlbGFwc2VkICogMS4yNTtcbiAgICAgICAgc3Bva2VNYXQub3BhY2l0eSA9IGZhZGVFbnZlbG9wZSAqIDAuNjU7XG5cbiAgICAgICAgLy8gNS4gRXhwYW5kIFZpcnR1YWwgRmxvb3IgUmFkaWFsIExhc2VyIFdhdmVmcm9udCBSaW5nXG4gICAgICAgIGNvbnN0IGZsb29yUmFkaXVzID0gMC4yNSArIGVhc2VkV2F2ZSAqIDUuNiAqIHJvb21TY2FsZVg7XG4gICAgICAgIGZsb29yU2NhblJpbmdNZXNoLnNjYWxlLnNldChmbG9vclJhZGl1cywgZmxvb3JSYWRpdXMsIDEpO1xuICAgICAgICBmbG9vclNjYW5SaW5nTWF0Lm9wYWNpdHkgPSBzaG93Rmxvb3JQbGFuZSA/IHRhaWxGYWRlICogMC44OCA6IDAuMDtcblxuICAgICAgICAvLyA2LiBEeW5hbWljYWxseSBSZWZyZXNoICYgUHVsc2UgRGVwdGggR3JpZCBQbGFuZXMgKHRhYmxlTGlkYXJQbGFuZSAmIGZsb29yTGlkYXJQbGFuZSlcbiAgICAgICAgdGFibGVMaWRhck1hdC5vcGFjaXR5ID0gMC42NSArIGZhZGVFbnZlbG9wZSAqIDAuMzI7XG4gICAgICAgIGZsb29yTGlkYXJNYXQub3BhY2l0eSA9IDAuNTUgKyBmYWRlRW52ZWxvcGUgKiAwLjM1O1xuICAgICAgICB0YWJsZUxpZGFyVGV4Lm9mZnNldC55ID0gLWVhc2VkV2F2ZSAqIDEuNTtcbiAgICAgICAgZmxvb3JMaWRhclRleC5vZmZzZXQueSA9IC1lYXNlZFdhdmUgKiAyLjA7XG5cbiAgICAgICAgLy8gNy4gUmVmcmVzaCBUYWJsZXRvcCAmIEZsb29yIDNEIExpREFSIFBvaW50IENsb3VkcyB3aXRoIHJhZGlhbCBsYXNlciB3YXZlIGNyZXN0XG4gICAgICAgIHVwZGF0ZVBvaW50Q2xvdWRXYXZlKGxpZGFyVGFibGVDbG91ZERhdGEsIGVhc2VkV2F2ZSwgdHJ1ZSk7XG4gICAgICAgIHVwZGF0ZVBvaW50Q2xvdWRXYXZlKGxpZGFyRmxvb3JDbG91ZERhdGEsIGVhc2VkV2F2ZSwgdHJ1ZSk7XG5cbiAgICAgICAgLy8gOC4gQnJpZWZseSBib29zdCBidWlsZGluZyB3aXJlZnJhbWUgbHVtaW5vc2l0eSBhcyB0aGUgTGlEQVIgbGFzZXIgY3VydGFpbiBzY2FucyB0aHJvdWdoIHRoZW1cbiAgICAgICAgaG9sb1dpcmVNYXQub3BhY2l0eSA9IE1hdGgubWluKFxuICAgICAgICAgIDEuMCxcbiAgICAgICAgICBob2xvV2lyZU1hdC5vcGFjaXR5ICsgZmFkZUVudmVsb3BlICogMC4yOFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2NhblJpbmdNYXQub3BhY2l0eSA9IDAuMDtcbiAgICAgICAgc2NhblRyYWlsaW5nUmluZ01hdC5vcGFjaXR5ID0gMC4wO1xuICAgICAgICBzY2FuTGFzZXJDdXJ0YWluTWF0Lm9wYWNpdHkgPSAwLjA7XG4gICAgICAgIHNjYW5Eb21lV2lyZU1hdC5vcGFjaXR5ID0gMC4wO1xuICAgICAgICBzcG9rZU1hdC5vcGFjaXR5ID0gMC4wO1xuICAgICAgICBmbG9vclNjYW5SaW5nTWF0Lm9wYWNpdHkgPSAwLjA7XG4gICAgICAgIHRhYmxlTGlkYXJNYXQub3BhY2l0eSA9IDAuNjU7XG4gICAgICAgIGZsb29yTGlkYXJNYXQub3BhY2l0eSA9IDAuNTU7XG4gICAgICAgIGlmICghc2NhblJlZnJlc2hzZXR0bGVkKSB7XG4gICAgICAgICAgc2NhblJlZnJlc2hzZXR0bGVkID0gdHJ1ZTtcbiAgICAgICAgICB0YWJsZUxpZGFyVGV4Lm9mZnNldC5zZXQoMCwgMCk7XG4gICAgICAgICAgZmxvb3JMaWRhclRleC5vZmZzZXQuc2V0KDAsIDApO1xuICAgICAgICAgIHVwZGF0ZVBvaW50Q2xvdWRXYXZlKGxpZGFyVGFibGVDbG91ZERhdGEsIDEuMCwgZmFsc2UpO1xuICAgICAgICAgIHVwZGF0ZVBvaW50Q2xvdWRXYXZlKGxpZGFyRmxvb3JDbG91ZERhdGEsIDEuMCwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBGb3JlZ3JvdW5kIERlcHRoIE9jY2x1c2lvbiBPYmplY3RzIChwb3NpdGlvbmVkIHJlbGF0aXZlIHRvIHRhYmxlIHdpZHRoL2RlcHRoKVxuICAgICAgb2NjbHVzaW9uR3JvdXAudmlzaWJsZSA9XG4gICAgICAgIGNmZy5zaG93T2NjbHVzaW9uT2JqZWN0cyAmJiBjZmcub2NjbHVzaW9uTW9kZSAhPT0gJ1d5xYLEhWN6b25hJztcbiAgICAgIG9jY2x1c2lvbkdyb3VwLnNjYWxlLnNldChcbiAgICAgICAgVEhSRUUuTWF0aFV0aWxzLmxlcnAoMSwgdGFibGVTY2FsZVgsIDAuNjUpLFxuICAgICAgICAxLFxuICAgICAgICBUSFJFRS5NYXRoVXRpbHMubGVycCgxLCB0YWJsZVNjYWxlWiwgMC42NSlcbiAgICAgICk7XG5cbiAgICAgIC8vIFVwZGF0ZSBIb3Jpem9udGFsIFJlY3Rhbmd1bGFyIFJlZmVyZW5jZSBJbWFnZSAzRCBCaWxsYm9hcmRcbiAgICAgIHJlZkJpbGxib2FyZEdyb3VwLnZpc2libGUgPSBjZmcuc2hvd1JlZmVyZW5jZUJpbGxib2FyZEluM0Q7XG4gICAgICBpZiAoY2ZnLmN1c3RvbVJlZmVyZW5jZUltYWdlVXJsICE9PSBjdXJyZW50UmVmSW1hZ2VVcmwpIHtcbiAgICAgICAgY3VycmVudFJlZkltYWdlVXJsID0gY2ZnLmN1c3RvbVJlZmVyZW5jZUltYWdlVXJsO1xuICAgICAgICBsb2FkUmVmQmlsbGJvYXJkVGV4dHVyZShjdXJyZW50UmVmSW1hZ2VVcmwpO1xuICAgICAgfVxuICAgICAgaWYgKHJlZkJpbGxib2FyZEdyb3VwLnZpc2libGUpIHtcbiAgICAgICAgcmVmQmlsbGJvYXJkR3JvdXAucG9zaXRpb24ueCA9IC1zbW9vdGhlZFBhcmFsbGF4WCAqIDAuMTQ7XG4gICAgICAgIHJlZkJpbGxib2FyZEdyb3VwLnBvc2l0aW9uLnkgPVxuICAgICAgICAgIDIuMDQgKyBNYXRoLnNpbihwZW5kdWx1bVBoYXNlICogMC45KSAqIDAuMDEyICogc3dheUFtcGxpdHVkZVNjYWxlO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgRmxvYXRpbmcgR2xhc3MgU2NyZWVucyBpZiBodWRTY3JlZW5TdHlsZSBjaGFuZ2VkXG4gICAgICBpZiAoY2ZnLmh1ZFNjcmVlblN0eWxlICE9PSBjdXJyZW50SHVkU2NyZWVuU3R5bGUpIHtcbiAgICAgICAgY3VycmVudEh1ZFNjcmVlblN0eWxlID0gY2ZnLmh1ZFNjcmVlblN0eWxlO1xuICAgICAgICBjb25zdCBpc0dsYXNzVWkgPVxuICAgICAgICAgIGN1cnJlbnRIdWRTY3JlZW5TdHlsZSA9PT1cbiAgICAgICAgICAgICdTemtsYW55IFBhbmVsIEludGVyYWt0eXdueSAoRnJvc3RlZCBHbGFzcyBVSSknIHx8XG4gICAgICAgICAgY3VycmVudEh1ZFNjcmVlblN0eWxlID09PVxuICAgICAgICAgICAgJ1N6a2xhbnkgRWtyYW4gS3J5c3RhbGljem55ICg5OCUgUHJ6ZXpyb2N6eXN0b8WbY2kpJztcbiAgICAgICAgY29uc3QgaXNVbHRyYUNsZWFyOTggPVxuICAgICAgICAgIGN1cnJlbnRIdWRTY3JlZW5TdHlsZSA9PT1cbiAgICAgICAgICAnU3prbGFueSBFa3JhbiBLcnlzdGFsaWN6bnkgKDk4JSBQcnplenJvY3p5c3RvxZtjaSknO1xuICAgICAgICBsYXZlbmRlckdlbU1hdC5vcGFjaXR5ID0gaXNVbHRyYUNsZWFyOTggPyAwLjQyIDogMC45MjtcbiAgICAgICAgZmxvYXRpbmdIdWRJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV4dFRleCA9IGNyZWF0ZUZsb2F0aW5nSHVkVGV4dHVyZShcbiAgICAgICAgICAgIG1heEFuaXNvLFxuICAgICAgICAgICAgaXRlbS50eXBlLFxuICAgICAgICAgICAgY3VycmVudEh1ZFNjcmVlblN0eWxlLFxuICAgICAgICAgICAgaXRlbS5hY3RpdmVJY29uSW5kZXhcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpdGVtLm1hdC5tYXApIGl0ZW0ubWF0Lm1hcC5kaXNwb3NlKCk7XG4gICAgICAgICAgaXRlbS5tYXQubWFwID0gbmV4dFRleDtcbiAgICAgICAgICBpdGVtLm1hdC5vcGFjaXR5ID0gaXNVbHRyYUNsZWFyOTggPyAwLjk4IDogaXNHbGFzc1VpID8gMC45NSA6IDAuODY7XG4gICAgICAgICAgaXRlbS5tYXQuYmxlbmRpbmcgPSBpc0dsYXNzVWlcbiAgICAgICAgICAgID8gVEhSRUUuTm9ybWFsQmxlbmRpbmdcbiAgICAgICAgICAgIDogVEhSRUUuQWRkaXRpdmVCbGVuZGluZztcbiAgICAgICAgICBpdGVtLm1hdC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgRmxvYXRpbmcgSFVEIFNjcmVlbnMgJiB0aGVpciAzRCBQYXJhbGxheCBEZXB0aCBTaGlmdFxuICAgICAgaHVkUGFuZWxzR3JvdXAudmlzaWJsZSA9IGNmZy5zaG93RmxvYXRpbmdIdWRQYW5lbHM7XG4gICAgICBmbG9hdGluZ0h1ZEl0ZW1zLmZvckVhY2goKGl0ZW0sIGlkeCkgPT4ge1xuICAgICAgICBpdGVtLm1lc2gucG9zaXRpb24ueCA9XG4gICAgICAgICAgaXRlbS5iYXNlUG9zLnggKiB0YWJsZVNjYWxlWCArIHNtb290aGVkUGFyYWxsYXhYICogaXRlbS5wYXJhbGxheERlcHRoO1xuICAgICAgICBpdGVtLm1lc2gucG9zaXRpb24ueSA9XG4gICAgICAgICAgaXRlbS5iYXNlUG9zLnkgK1xuICAgICAgICAgIE1hdGguc2luKHBlbmR1bHVtUGhhc2UgKiAxLjIgKyBpZHgpICogMC4wMSAqIHN3YXlBbXBsaXR1ZGVTY2FsZSArXG4gICAgICAgICAgc21vb3RoZWRQYXJhbGxheFkgKiBpdGVtLnBhcmFsbGF4RGVwdGggKiAwLjU7XG4gICAgICAgIGlmIChpdGVtLmhvbG9Qcm9wKSB7XG4gICAgICAgICAgaXRlbS5ob2xvUHJvcC5yb3RhdGlvbi55ID0gcGVuZHVsdW1QaGFzZSAqIDEuMSArIGlkeCAqIDAuNjtcbiAgICAgICAgICBpdGVtLmhvbG9Qcm9wLnJvdGF0aW9uLnggPSBNYXRoLnNpbihwZW5kdWx1bVBoYXNlICogMC44ICsgaWR4KSAqIDAuMjU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBBbmltYXRlIEhvbG9ncmFwaGljIFNreXNjcmFwZXIgQ2x1c3RlcnMgKE5vbi1saW5lYXIgM0QgcGxhY2VtZW50LCA5OjE2IGhvcml6b250YWwgY29tcGxleGVzLCAyLTUgYnVpbGRpbmdzLCBmbG9vciBjb3VudClcbiAgICAgIGNvbnN0IGZsb29ySGVpZ2h0U2NhbGUgPSBjZmcuYnVpbGRpbmdGbG9vckNvdW50IC8gODUuMDtcbiAgICAgIGNvbnN0IGRpYWdyaWRSZXBlYXRZID0gTWF0aC5tYXgoXG4gICAgICAgIDEuNSxcbiAgICAgICAgKGNmZy5idWlsZGluZ0Zsb29yQ291bnQgLyAyMikgKiBjZmcuaG9sb2dyYW1NZXNoRGVuc2l0eVxuICAgICAgKTtcbiAgICAgIGRpYWdyaWRUZXgucmVwZWF0LnNldCgyICogY2ZnLmhvbG9ncmFtTWVzaERlbnNpdHksIGRpYWdyaWRSZXBlYXRZKTtcbiAgICAgIGRpYWdyaWRUZXgub2Zmc2V0LnkgPSAtcGVuZHVsdW1QaGFzZSAqIDAuMTI7XG5cbiAgICAgIC8vIFRyYWNrIGJ1aWxkaW5nTGF5b3V0IHByZXNldCBjaGFuZ2VzIHRvIHRyaWdnZXIgYSBzbW9vdGggaG9sb2dyYXBoaWMgdHJhbnNpdGlvbiBhcmMgJiBsZXJwXG4gICAgICBpZiAoY2ZnLmJ1aWxkaW5nTGF5b3V0ICE9PSBsYXN0QnVpbGRpbmdMYXlvdXQpIHtcbiAgICAgICAgbGFzdEJ1aWxkaW5nTGF5b3V0ID0gY2ZnLmJ1aWxkaW5nTGF5b3V0O1xuICAgICAgICBsYXlvdXRUcmFuc2l0aW9uUHJvZ3Jlc3MgPSAwLjA7XG4gICAgICB9XG4gICAgICBpZiAobGF5b3V0VHJhbnNpdGlvblByb2dyZXNzIDwgMS4wKSB7XG4gICAgICAgIGxheW91dFRyYW5zaXRpb25Qcm9ncmVzcyA9IE1hdGgubWluKFxuICAgICAgICAgIDEuMCxcbiAgICAgICAgICBsYXlvdXRUcmFuc2l0aW9uUHJvZ3Jlc3MgKyBkZWx0YSAqIDEuNjVcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIFNtb290aCBzaW5lLXdhdmUgbGV2aXRhdGlvbiBhcmMgZHVyaW5nIGxheW91dCBwcmVzZXQgcmVjb25maWd1cmF0aW9uXG4gICAgICBjb25zdCBsYXlvdXRIb3ZlckFyY1kgPVxuICAgICAgICBNYXRoLnNpbihsYXlvdXRUcmFuc2l0aW9uUHJvZ3Jlc3MgKiBNYXRoLlBJKSAqIDAuMDY1O1xuICAgICAgLy8gRnJhbWUtcmF0ZSBpbmRlcGVuZGVudCBsZXJwIGZhY3RvciBmb3IgY2x1c3RlciAmIHN1Yi10b3dlciBzcGF0aWFsIHRyYW5zaXRpb25zXG4gICAgICBjb25zdCBjbHVzdGVyTGVycEFscGhhID0gMSAtIE1hdGguZXhwKC01LjIgKiBkZWx0YSk7XG4gICAgICBjb25zdCBzdWJNb2RlbExlcnBBbHBoYSA9IDEgLSBNYXRoLmV4cCgtNi41ICogZGVsdGEpO1xuXG4gICAgICBjb25zdCBzY2F0dGVyID0gY2ZnLmxheW91dERlcHRoU2NhdHRlcjtcbiAgICAgIGNvbnN0IGlzTWV0cm9wb2xpc1pkajIgPVxuICAgICAgICBjZmcuYnVpbGRpbmdMYXlvdXQgPT09ICdNZXRyb3BvbGlhIENlbnRyYWxuYSAoWmRqLiAyIMK3IEdsb2JhbCBOZXR3b3JrKSc7XG5cbiAgICAgIC8vIEFuaW1hdGUgQ2VudHJhbCBNZXRyb3BvbGlzIENvbmNlbnRyaWMgRW1pdHRlciBSaW5ncyAmIFJpZ2h0LVNpZGUgVGFibGV0b3AgU21hcnQgUGFkXG4gICAgICBtZXRyb3BvbGlzRW1pdHRlckdyb3VwLnZpc2libGUgPSB0cnVlO1xuICAgICAgY29uc3QgdGFyZ2V0TWV0cm9SaW5nU2NhbGUgPSBpc01ldHJvcG9saXNaZGoyID8gMS4xOCA6IDAuNzI7XG4gICAgICBtZXRyb3BvbGlzRW1pdHRlckdyb3VwLnNjYWxlLnggPSBUSFJFRS5NYXRoVXRpbHMubGVycChcbiAgICAgICAgbWV0cm9wb2xpc0VtaXR0ZXJHcm91cC5zY2FsZS54LFxuICAgICAgICB0YXJnZXRNZXRyb1JpbmdTY2FsZSAqIHRhYmxlU2NhbGVYLFxuICAgICAgICBjbHVzdGVyTGVycEFscGhhXG4gICAgICApO1xuICAgICAgbWV0cm9wb2xpc0VtaXR0ZXJHcm91cC5zY2FsZS56ID0gVEhSRUUuTWF0aFV0aWxzLmxlcnAoXG4gICAgICAgIG1ldHJvcG9saXNFbWl0dGVyR3JvdXAuc2NhbGUueixcbiAgICAgICAgdGFyZ2V0TWV0cm9SaW5nU2NhbGUgKiB0YWJsZVNjYWxlWixcbiAgICAgICAgY2x1c3RlckxlcnBBbHBoYVxuICAgICAgKTtcbiAgICAgIG1ldHJvRW1pdHRlclJpbmdzLmZvckVhY2goKHJNZXNoLCBySWR4KSA9PiB7XG4gICAgICAgIHJNZXNoLnJvdGF0aW9uLnogPVxuICAgICAgICAgIHBlbmR1bHVtUGhhc2UgKiAocklkeCAlIDIgPT09IDAgPyAwLjM1IDogLTAuNDUpICogKGlzTWV0cm9wb2xpc1pkajIgPyAxLjQgOiAwLjgpO1xuICAgICAgfSk7XG4gICAgICAobWV0cm9MaWdodENvbHVtbi5tYXRlcmlhbCBhcyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCkub3BhY2l0eSA9XG4gICAgICAgIGlzTWV0cm9wb2xpc1pkajIgPyAwLjE0IDogMC4wNDtcblxuICAgICAgdGFibGV0QW5kTXVnR3JvdXAucG9zaXRpb24ueCA9IDEuMjQgKiB0YWJsZVNjYWxlWDtcbiAgICAgIHRhYmxldEFuZE11Z0dyb3VwLnBvc2l0aW9uLnogPSAwLjQ0ICogdGFibGVTY2FsZVo7XG5cbiAgICAgIGJ1aWxkaW5nQ2x1c3RlcnMuZm9yRWFjaCgoYmMsIGNJZHgpID0+IHtcbiAgICAgICAgLy8gQ29tcHV0ZSBub24tbGluZWFyIDNEIHNwYXRpYWwgcGxhY2VtZW50IChYLCBaKSBzbyBtb2RlbHMgZG8gbm90IHN0YW5kIGluIGEgc2luZ2xlIHN0cmFpZ2h0IGxpbmVcbiAgICAgICAgbGV0IGxheW91dE9mZnNldFggPSBiYy5iYXNlUG9zWDtcbiAgICAgICAgbGV0IGxheW91dE9mZnNldFogPSBiYy5iYXNlUG9zWjtcbiAgICAgICAgbGV0IGNsdXN0ZXJSb3RZID0gMDtcblxuICAgICAgICBpZiAoaXNNZXRyb3BvbGlzWmRqMikge1xuICAgICAgICAgIC8vIERlbnNlIHVuaWZpZWQgQ2VudHJhbCBNZXRyb3BvbGl0YW4gU2t5bGluZSBJc2xhbmQgKG1hdGNoaW5nIHpkai5fMi5wbmcgY2VudGVycGllY2UpXG4gICAgICAgICAgaWYgKGNJZHggPT09IDApIHtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFggPSAtMC4zMTtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFogPSAwLjA5ICogc2NhdHRlcjtcbiAgICAgICAgICAgIGNsdXN0ZXJSb3RZID0gMC4wODtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNJZHggPT09IDEpIHtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFggPSAwLjA7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRaID0gLTAuMDIgKiBzY2F0dGVyO1xuICAgICAgICAgICAgY2x1c3RlclJvdFkgPSAwLjA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFggPSAwLjMxO1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WiA9IDAuMDcgKiBzY2F0dGVyO1xuICAgICAgICAgICAgY2x1c3RlclJvdFkgPSAtMC4wODtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2ZnLmJ1aWxkaW5nTGF5b3V0ID09PSAnxYF1ayBBbWZpdGVhdHJhbG55IChQw7PFgmtvbGUgM0QpJykge1xuICAgICAgICAgIGlmIChjSWR4ID09PSAwKSB7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRYID0gLTEuMDg7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRaID0gMC4zNCAqIHNjYXR0ZXI7XG4gICAgICAgICAgICBjbHVzdGVyUm90WSA9IDAuMjg7XG4gICAgICAgICAgfSBlbHNlIGlmIChjSWR4ID09PSAxKSB7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRYID0gMC4wO1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WiA9IC0wLjMyICogc2NhdHRlcjtcbiAgICAgICAgICAgIGNsdXN0ZXJSb3RZID0gMC4wO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRYID0gMS4wODtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFogPSAwLjM0ICogc2NhdHRlcjtcbiAgICAgICAgICAgIGNsdXN0ZXJSb3RZID0gLTAuMjg7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNmZy5idWlsZGluZ0xheW91dCA9PT0gJ1Ryw7Nqa8SFdCBDZW50cmFsbnkgKFVrxYJhZCBEZWx0YSknKSB7XG4gICAgICAgICAgaWYgKGNJZHggPT09IDApIHtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFggPSAtMC44MjtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFogPSAtMC4zOCAqIHNjYXR0ZXI7XG4gICAgICAgICAgICBjbHVzdGVyUm90WSA9IDAuMzU7XG4gICAgICAgICAgfSBlbHNlIGlmIChjSWR4ID09PSAxKSB7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRYID0gMC4wO1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WiA9IDAuNDIgKiBzY2F0dGVyO1xuICAgICAgICAgICAgY2x1c3RlclJvdFkgPSAwLjA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFggPSAwLjgyO1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WiA9IC0wLjM4ICogc2NhdHRlcjtcbiAgICAgICAgICAgIGNsdXN0ZXJSb3RZID0gLTAuMzU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNmZy5idWlsZGluZ0xheW91dCA9PT0gJ1VrxYJhZCBEaWFnb25hbG55IChLYXNrYWRvd3kpJykge1xuICAgICAgICAgIGlmIChjSWR4ID09PSAwKSB7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRYID0gLTEuMTI7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRaID0gMC40MiAqIHNjYXR0ZXI7XG4gICAgICAgICAgICBjbHVzdGVyUm90WSA9IDAuMjI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjSWR4ID09PSAxKSB7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRYID0gMC4wO1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WiA9IDAuMDtcbiAgICAgICAgICAgIGNsdXN0ZXJSb3RZID0gMC4xNTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WCA9IDEuMTI7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRaID0gLTAuNDIgKiBzY2F0dGVyO1xuICAgICAgICAgICAgY2x1c3RlclJvdFkgPSAwLjIyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBjZmcuYnVpbGRpbmdMYXlvdXQgPT09ICdSb3pyenV0IFVyYmFuaXN0eWN6bnkgKFdpZWxvcMWCYXN6Y3p5em5vd3kpJ1xuICAgICAgICApIHtcbiAgICAgICAgICBpZiAoY0lkeCA9PT0gMCkge1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WCA9IC0wLjk2O1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WiA9IC0wLjM0ICogc2NhdHRlcjtcbiAgICAgICAgICAgIGNsdXN0ZXJSb3RZID0gLTAuMzI7XG4gICAgICAgICAgfSBlbHNlIGlmIChjSWR4ID09PSAxKSB7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRYID0gMC4xNDtcbiAgICAgICAgICAgIGxheW91dE9mZnNldFogPSAwLjM2ICogc2NhdHRlcjtcbiAgICAgICAgICAgIGNsdXN0ZXJSb3RZID0gMC4yNDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGF5b3V0T2Zmc2V0WCA9IDEuMDQ7XG4gICAgICAgICAgICBsYXlvdXRPZmZzZXRaID0gLTAuMjIgKiBzY2F0dGVyO1xuICAgICAgICAgICAgY2x1c3RlclJvdFkgPSAtMC4xODtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTbW9vdGhseSBsZXJwIGNsdXN0ZXIgM0QgcG9zaXRpb24gKFgsIFkgbGV2aXRhdGlvbiBhcmMsIFopIHRvd2FyZHMgdGFyZ2V0IGxheW91dCBjb29yZGluYXRlc1xuICAgICAgICBiYy50YXJnZXRQb3NpdGlvbi5zZXQoXG4gICAgICAgICAgbGF5b3V0T2Zmc2V0WCAqIHRhYmxlU2NhbGVYLFxuICAgICAgICAgIDAuMDE1ICsgbGF5b3V0SG92ZXJBcmNZICogKDEgKyBjSWR4ICogMC4xMiksXG4gICAgICAgICAgbGF5b3V0T2Zmc2V0WiAqIHRhYmxlU2NhbGVaXG4gICAgICAgICk7XG4gICAgICAgIGJjLmdyb3VwLnBvc2l0aW9uLmxlcnAoYmMudGFyZ2V0UG9zaXRpb24sIGNsdXN0ZXJMZXJwQWxwaGEpO1xuXG4gICAgICAgIC8vIENvbWJpbmUgbGF5b3V0IHByZXNldCByb3RhdGlvbiB3aXRoIHN1YnRsZSBwZW5kdWx1bSBzd2F5IGFuZCBzbW9vdGhseSBpbnRlcnBvbGF0ZVxuICAgICAgICBjb25zdCBzd2F5Um90WSA9XG4gICAgICAgICAgTWF0aC5zaW4ocGVuZHVsdW1QaGFzZSAqIDAuNTUgKyBjSWR4KSAqIDAuMDI1ICogc3dheUFtcGxpdHVkZVNjYWxlO1xuICAgICAgICBjb25zdCBjb21iaW5lZENsdXN0ZXJSb3RZID0gY2x1c3RlclJvdFkgKyBzd2F5Um90WTtcbiAgICAgICAgYmMuZ3JvdXAucm90YXRpb24ueSA9IFRIUkVFLk1hdGhVdGlscy5sZXJwKFxuICAgICAgICAgIGJjLmdyb3VwLnJvdGF0aW9uLnksXG4gICAgICAgICAgY29tYmluZWRDbHVzdGVyUm90WSxcbiAgICAgICAgICBjbHVzdGVyTGVycEFscGhhXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gVG9nZ2xlIDIgdG8gNSBidWlsZGluZ3MgcGVyIGdyb3VwICYgYXBwbHkgaW5kaXZpZHVhbCBzdWItbW9kZWwgb3ZlcnJpZGVzIG9yIGdsb2JhbCA5OjE2IHByb3BvcnRpb25zXG4gICAgICAgIGJjLnRvd2VyU3ViR3JvdXBzLmZvckVhY2goKHRHcm91cCwgdElkeCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHN1YklkID0gYCR7YmMuY2x1c3RlcklkfV8ke3RJZHh9YDtcbiAgICAgICAgICBjb25zdCBzdWJPdmVycmlkZSA9IGNmZy51bmlmaWVkTW9kZWxBc3NlbWJsZWRcbiAgICAgICAgICAgID8gY2ZnLnN1Yk1vZGVsT3ZlcnJpZGVzW3N1YklkXVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICBpZiAoc3ViT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHRHcm91cC52aXNpYmxlID0gc3ViT3ZlcnJpZGUudmlzaWJsZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdEdyb3VwLnZpc2libGUgPSB0SWR4IDwgY2ZnLmJ1aWxkaW5nc1Blckdyb3VwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCB0YXJnZXRTY2FsZVggPSAxLjA7XG4gICAgICAgICAgbGV0IHRhcmdldFNjYWxlWiA9IDEuMDtcbiAgICAgICAgICBsZXQgdGFyZ2V0U2NhbGVZID0gZmxvb3JIZWlnaHRTY2FsZTtcbiAgICAgICAgICBsZXQgdGFyZ2V0UG9zWCA9ICh0R3JvdXAudXNlckRhdGEuYmFzZUR4IGFzIG51bWJlcikgfHwgMDtcbiAgICAgICAgICBsZXQgdGFyZ2V0UG9zWiA9ICh0R3JvdXAudXNlckRhdGEuYmFzZUR6IGFzIG51bWJlcikgfHwgMDtcbiAgICAgICAgICBsZXQgdGFyZ2V0Um90WSA9IDA7XG5cbiAgICAgICAgICBpZiAoc3ViT3ZlcnJpZGUpIHtcbiAgICAgICAgICAgIHRhcmdldFNjYWxlWCA9IHN1Yk92ZXJyaWRlLndpZHRoU2NhbGU7XG4gICAgICAgICAgICB0YXJnZXRTY2FsZVogPSBzdWJPdmVycmlkZS5kZXB0aFNjYWxlO1xuICAgICAgICAgICAgdGFyZ2V0U2NhbGVZID0gc3ViT3ZlcnJpZGUuZmxvb3JzIC8gODUuMDtcbiAgICAgICAgICAgIHRhcmdldFBvc1ggKz0gc3ViT3ZlcnJpZGUub2Zmc2V0WDtcbiAgICAgICAgICAgIHRhcmdldFBvc1ogKz0gc3ViT3ZlcnJpZGUub2Zmc2V0WjtcbiAgICAgICAgICAgIHRhcmdldFJvdFkgPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQoc3ViT3ZlcnJpZGUucm90YXRpb25EZWcpO1xuXG4gICAgICAgICAgICBjb25zdCBjb3JlTWVzaCA9IHRHcm91cC51c2VyRGF0YS5jb3JlTWVzaCBhcyBUSFJFRS5NZXNoIHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGNvcmVNZXNoKSB7XG4gICAgICAgICAgICAgIGNvcmVNZXNoLm1hdGVyaWFsID1cbiAgICAgICAgICAgICAgICBzdWJPdmVycmlkZS5jb3JlVHlwZSA9PT0gJ2dvbGQnXG4gICAgICAgICAgICAgICAgICA/IGhvbG9Hb2xkQ29yZU1hdFxuICAgICAgICAgICAgICAgICAgOiBob2xvRmxvb3JTbGFiTWF0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgc2hlbGxNZXNoID0gdEdyb3VwLnVzZXJEYXRhLnNoZWxsTWVzaCBhc1xuICAgICAgICAgICAgICB8IFRIUkVFLk1lc2hcbiAgICAgICAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoc2hlbGxNZXNoKSB7XG4gICAgICAgICAgICAgIHNoZWxsTWVzaC5tYXRlcmlhbCA9IHN1Yk92ZXJyaWRlLnRleHR1cmVQcmVzZXRcbiAgICAgICAgICAgICAgICA/IGdldE9yQ3JlYXRlUHJlc2V0TWF0ZXJpYWwoc3ViT3ZlcnJpZGUudGV4dHVyZVByZXNldClcbiAgICAgICAgICAgICAgICA6IGhvbG9TaGVsbE1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3Qgc2hlbGxNZXNoID0gdEdyb3VwLnVzZXJEYXRhLnNoZWxsTWVzaCBhc1xuICAgICAgICAgICAgICB8IFRIUkVFLk1lc2hcbiAgICAgICAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAoc2hlbGxNZXNoKSB7XG4gICAgICAgICAgICAgIHNoZWxsTWVzaC5tYXRlcmlhbCA9IGhvbG9TaGVsbE1hdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgY2ZnLm1vZGVsT3JpZW50YXRpb245MTYgPT09XG4gICAgICAgICAgICAgICdVa8WCYWQgUG96aW9teSA5OjE2IChIb3J5em9udGFsbmUgS29tcGxla3N5KSdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0YXJnZXRTY2FsZVggPSAxLjY1O1xuICAgICAgICAgICAgICB0YXJnZXRTY2FsZVogPSAwLjkzO1xuICAgICAgICAgICAgICB0YXJnZXRTY2FsZVkgPSBmbG9vckhlaWdodFNjYWxlICogMC41NjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIGNmZy5tb2RlbE9yaWVudGF0aW9uOTE2ID09PVxuICAgICAgICAgICAgICAnSHlicnlkb3d5IDk6MTYgKFBvemlvbWUgU2tyenlkxYJhICsgV2llxbxlKSdcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBpZiAodElkeCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNjYWxlWCA9IDEuMDg7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2NhbGVaID0gMS4wODtcbiAgICAgICAgICAgICAgICB0YXJnZXRTY2FsZVkgPSBmbG9vckhlaWdodFNjYWxlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFNjYWxlWCA9IDEuNzU7XG4gICAgICAgICAgICAgICAgdGFyZ2V0U2NhbGVaID0gMC45ODtcbiAgICAgICAgICAgICAgICB0YXJnZXRTY2FsZVkgPSBmbG9vckhlaWdodFNjYWxlICogMC40ODtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIF9zdWJUYXJnZXRQb3Muc2V0KHRhcmdldFBvc1gsIDAsIHRhcmdldFBvc1opO1xuICAgICAgICAgIHRHcm91cC5wb3NpdGlvbi5sZXJwKF9zdWJUYXJnZXRQb3MsIHN1Yk1vZGVsTGVycEFscGhhKTtcblxuICAgICAgICAgIHRHcm91cC5yb3RhdGlvbi55ID0gVEhSRUUuTWF0aFV0aWxzLmxlcnAoXG4gICAgICAgICAgICB0R3JvdXAucm90YXRpb24ueSxcbiAgICAgICAgICAgIHRhcmdldFJvdFksXG4gICAgICAgICAgICBzdWJNb2RlbExlcnBBbHBoYVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBfc3ViVGFyZ2V0U2NhbGUuc2V0KHRhcmdldFNjYWxlWCwgdGFyZ2V0U2NhbGVZLCB0YXJnZXRTY2FsZVopO1xuICAgICAgICAgIHRHcm91cC5zY2FsZS5sZXJwKF9zdWJUYXJnZXRTY2FsZSwgc3ViTW9kZWxMZXJwQWxwaGEpO1xuXG4gICAgICAgICAgLy8gSGlnaGxpZ2h0IGluZGl2aWR1YWwgc3ViLW1vZGVsIHNlbGVjdGlvbiByaW5nIHdoZW4gc2VsZWN0ZWRcbiAgICAgICAgICBjb25zdCBzdWJTZWxlY3RSaW5nID0gdEdyb3VwLnVzZXJEYXRhLnN1YlNlbGVjdFJpbmcgYXNcbiAgICAgICAgICAgIHwgVEhSRUUuTWVzaFxuICAgICAgICAgICAgfCB1bmRlZmluZWQ7XG4gICAgICAgICAgaWYgKHN1YlNlbGVjdFJpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzU3ViU2VsZWN0ZWQgPSBjZmcuc2VsZWN0ZWRTdWJNb2RlbElkID09PSBzdWJJZDtcbiAgICAgICAgICAgIChzdWJTZWxlY3RSaW5nLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKS5vcGFjaXR5ID1cbiAgICAgICAgICAgICAgaXNTdWJTZWxlY3RlZCA/IDAuOTIgOiAwLjA7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSb3RhdGUgYmFzZSBlbWl0dGVyIHJpbmdzIChib29zdCByb3RhdGlvbiBzcGVlZCBzbW9vdGhseSBkdXJpbmcgbGF5b3V0IHRyYW5zaXRpb25zKVxuICAgICAgICBjb25zdCBsYXlvdXRTcGluQm9vc3QgPSAxICsgTWF0aC5zaW4obGF5b3V0VHJhbnNpdGlvblByb2dyZXNzICogTWF0aC5QSSkgKiAyLjI7XG4gICAgICAgIGJjLmJhc2VSaW5ncy5mb3JFYWNoKChyaW5nLCBySWR4KSA9PiB7XG4gICAgICAgICAgcmluZy5yb3RhdGlvbi56ID1cbiAgICAgICAgICAgIHBlbmR1bHVtUGhhc2UgKiAocklkeCAlIDIgPT09IDAgPyAwLjUgOiAtMC43KSAqIGxheW91dFNwaW5Cb29zdDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU2VsZWN0aW9uIHJpbmcgcHVsc2VcbiAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGNmZy5zZWxlY3RlZEJ1aWxkaW5nID09PSBiYy5jbHVzdGVySWQ7XG4gICAgICAgIChiYy5zZWxlY3Rpb25SaW5nLm1hdGVyaWFsIGFzIFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKS5vcGFjaXR5ID1cbiAgICAgICAgICBpc1NlbGVjdGVkID8gMC44NSA6IDAuMDtcblxuICAgICAgICAvLyBQYXJhbGxheCBvZmZzZXQgb24gaW50ZXJuYWwgQklNIHN0cnVjdHVyYWwgY29yZXNcbiAgICAgICAgYmMuaW5uZXJDb3Jlcy5mb3JFYWNoKChjb3JlKSA9PiB7XG4gICAgICAgICAgY29yZS5wb3NpdGlvbi54ID0gLXNtb290aGVkUGFyYWxsYXhYICogMC4wNDU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNtb290aCBFeHBsb2RlZCBWaWV3IHNlcGFyYXRpb24gJiBMT0QgZmxvb3Itc2xhYiBjdWxsaW5nIGJhc2VkIG9uIGhvbG9ncmFtTWVzaERlbnNpdHlcbiAgICAgICAgYmMuZXhwbG9kYWJsZUxheWVycy5mb3JFYWNoKChsYXllciwgbElkeCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRhcmdldFkgPSBsYXllci5iYXNlWSArIGNmZy5leHBsb2RlZFZpZXcgKiBsYXllci5leHBsb2RlT2Zmc2V0O1xuICAgICAgICAgIGxheWVyLm1lc2gucG9zaXRpb24ueSA9IFRIUkVFLk1hdGhVdGlscy5sZXJwKFxuICAgICAgICAgICAgbGF5ZXIubWVzaC5wb3NpdGlvbi55LFxuICAgICAgICAgICAgdGFyZ2V0WSxcbiAgICAgICAgICAgIHN1Yk1vZGVsTGVycEFscGhhXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobElkeCA+IDIpIHtcbiAgICAgICAgICAgIGlmIChjZmcuaG9sb2dyYW1NZXNoRGVuc2l0eSA8IDAuNzUpIHtcbiAgICAgICAgICAgICAgbGF5ZXIubWVzaC52aXNpYmxlID0gbElkeCAlIDMgPT09IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNmZy5ob2xvZ3JhbU1lc2hEZW5zaXR5IDwgMS4xNSkge1xuICAgICAgICAgICAgICBsYXllci5tZXNoLnZpc2libGUgPSBsSWR4ICUgMiA9PT0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGxheWVyLm1lc2gudmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBbmltYXRlIER5bmFtaWMgV2luZG93IFBhcnRpY2xlcyBvdXRzaWRlIHRoZSByb29tJ3MgYXJjaGVkIHdpbmRvd3NcbiAgICAgIGNvbnN0IHBvc0F0dHIgPSB3aW5kb3dQYXJ0aWNsZXNHZW8uYXR0cmlidXRlc1xuICAgICAgICAucG9zaXRpb24gYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuICAgICAgY29uc3QgaXNSYWluID1cbiAgICAgICAgY2ZnLndpbmRvd1BhcnRpY2xlcyA9PT0gJ0N5YmVyLURlc3pjeiArIFN0cnVtaWVuaWUgRGFueWNoIFphIE9rbmVtJztcbiAgICAgIGNvbnN0IHNwZWVkTXVsdCA9IGNmZy53aW5kb3dQYXJ0aWNsZURlbnNpdHk7XG4gICAgICBjb25zdCBhY3RpdmVQYXJ0aWNsZUNvdW50ID0gTWF0aC5taW4oXG4gICAgICAgIE1BWF9QQVJUSUNMRVMsXG4gICAgICAgIE1hdGgubWF4KDkwLCBNYXRoLnJvdW5kKE1BWF9QQVJUSUNMRVMgKiAoY2ZnLndpbmRvd1BhcnRpY2xlRGVuc2l0eSAvIDIuMCkpKVxuICAgICAgKTtcbiAgICAgIHdpbmRvd1BhcnRpY2xlc0dlby5zZXREcmF3UmFuZ2UoMCwgYWN0aXZlUGFydGljbGVDb3VudCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlUGFydGljbGVDb3VudDsgaSsrKSB7XG4gICAgICAgIGxldCBweCA9IHBvc0F0dHIuZ2V0WChpKTtcbiAgICAgICAgbGV0IHB5ID0gcG9zQXR0ci5nZXRZKGkpO1xuICAgICAgICBsZXQgcHogPSBwb3NBdHRyLmdldFooaSk7XG5cbiAgICAgICAgaWYgKGlzUmFpbikge1xuICAgICAgICAgIHB5IC09IHBhcnRpY2xlVmVsb2NpdGllc1tpICogMyArIDFdICogMi42ICogc3BlZWRNdWx0ICogZGVsdGE7XG4gICAgICAgICAgaWYgKHB5IDwgZmxvb3JZKSBweSA9IGZsb29yWSArIDQuMjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBweCArPSBwYXJ0aWNsZVZlbG9jaXRpZXNbaSAqIDNdICogc3BlZWRNdWx0ICogZGVsdGE7XG4gICAgICAgICAgcHkgKz0gcGFydGljbGVWZWxvY2l0aWVzW2kgKiAzICsgMV0gKiAwLjY1ICogc3BlZWRNdWx0ICogZGVsdGE7XG4gICAgICAgICAgaWYgKHB5ID4gZmxvb3JZICsgNC4yKSBweSA9IGZsb29yWTtcbiAgICAgICAgICBpZiAocHggPiAzLjgpIHB4ID0gLTMuODtcbiAgICAgICAgICBpZiAocHggPCAtMy44KSBweCA9IDMuODtcbiAgICAgICAgfVxuXG4gICAgICAgIHBvc0F0dHIuc2V0WFlaKGksIHB4LCBweSwgcHopO1xuICAgICAgfVxuICAgICAgcG9zQXR0ci5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICAgIC8vIFVwZGF0ZSBJbnN0YW5jZWQgQWVyaWFsIFRyYWZmaWMgU3RyZWFtcyBiZWhpbmQgd2luZG93c1xuICAgICAgY29uc3QgYWN0aXZlU3RyZWFtcyA9IE1hdGgubWluKFxuICAgICAgICBTVFJFQU1fQ09VTlQsXG4gICAgICAgIE1hdGgubWF4KDYsIE1hdGgucm91bmQoU1RSRUFNX0NPVU5UICogKGNmZy53aW5kb3dQYXJ0aWNsZURlbnNpdHkgLyAyLjApKSlcbiAgICAgICk7XG4gICAgICBhZXJpYWxTdHJlYW1zLmNvdW50ID0gYWN0aXZlU3RyZWFtcztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlU3RyZWFtczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0ID0gc3RyZWFtRGF0YVtpXTtcbiAgICAgICAgc3QueCArPSBzdC5zcGVlZCAqIHNwZWVkTXVsdCAqIGRlbHRhO1xuICAgICAgICBpZiAoc3QueCA+IDQuMikgc3QueCA9IC00LjI7XG4gICAgICAgIGlmIChzdC54IDwgLTQuMikgc3QueCA9IDQuMjtcblxuICAgICAgICBfZHVtbXlNYXRyaXhPYmoucG9zaXRpb24uc2V0KHN0LngsIHN0LnksIHN0LnopO1xuICAgICAgICBfZHVtbXlNYXRyaXhPYmouc2NhbGUuc2V0KGNmZy53aW5kb3dQYXJ0aWNsZURlbnNpdHksIDEsIDEpO1xuICAgICAgICBfZHVtbXlNYXRyaXhPYmoudXBkYXRlTWF0cml4KCk7XG4gICAgICAgIGFlcmlhbFN0cmVhbXMuc2V0TWF0cml4QXQoaSwgX2R1bW15TWF0cml4T2JqLm1hdHJpeCk7XG4gICAgICB9XG4gICAgICBhZXJpYWxTdHJlYW1zLmluc3RhbmNlTWF0cml4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgLy8gVXBkYXRlIEFlcm9keW5hbWljIFdpbmQgRGlyZWN0aW9uICYgRm9yY2UgVmVjdG9yIFBhcnRpY2xlcyAoUmVhY3RzIHRvIHdpbmRvd1BhcnRpY2xlRGVuc2l0eSlcbiAgICAgIGNvbnN0IHdpbmRGb3JjZSA9IGNmZy53aW5kb3dQYXJ0aWNsZURlbnNpdHk7IC8vIDAuMiB0byAyLjBcbiAgICAgIGNvbnN0IGFjdGl2ZVdpbmRDb3VudCA9IE1hdGgubWluKFxuICAgICAgICBNQVhfV0lORF9WRUNUT1JTLFxuICAgICAgICBNYXRoLm1heChcbiAgICAgICAgICAyMCxcbiAgICAgICAgICBNYXRoLnJvdW5kKE1BWF9XSU5EX1ZFQ1RPUlMgKiBNYXRoLm1pbigxLjAsIHdpbmRGb3JjZSAvIDEuODUpKVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgd2luZFZlY3RvckFycm93cy5jb3VudCA9IGFjdGl2ZVdpbmRDb3VudDtcbiAgICAgIHdpbmRWZWN0b3JMaW5lc0dlby5zZXREcmF3UmFuZ2UoMCwgYWN0aXZlV2luZENvdW50ICogMik7XG5cbiAgICAgIC8vIFByZXZhaWxpbmcgd2luZCBhemltdXRoIGFuZ2xlICYgZHluYW1pYyBndXN0IG9zY2lsbGF0aW9uXG4gICAgICBjb25zdCB3aW5kQXppbXV0aCA9XG4gICAgICAgIC0wLjE4ICsgTWF0aC5zaW4oZWxhcHNlZCAqIDAuMzUpICogKDAuMTQgKyAwLjEgKiB3aW5kRm9yY2UpO1xuICAgICAgY29uc3QgYmFzZVdpbmREaXJYID0gTWF0aC5jb3Mod2luZEF6aW11dGgpO1xuICAgICAgY29uc3QgYmFzZVdpbmREaXJaID0gTWF0aC5zaW4od2luZEF6aW11dGgpO1xuXG4gICAgICAvLyBVcGRhdGUgM0QgSG9sb2dyYXBoaWMgV2luZCBDb21wYXNzICYgQW5lbW9tZXRlciBvbiBUYWJsZXRvcCBDb3JuZXJcbiAgICAgIHdpbmRDb21wYXNzR3JvdXAucG9zaXRpb24ueCA9IC0xLjU1ICogdGFibGVTY2FsZVg7XG4gICAgICB3aW5kQ29tcGFzc0dyb3VwLnBvc2l0aW9uLnogPSAwLjY4ICogdGFibGVTY2FsZVo7XG4gICAgICB3aW5kQ29tcGFzc0Fycm93R3JvdXAucm90YXRpb24ueSA9IC13aW5kQXppbXV0aDtcbiAgICAgIGNvbnN0IGNvbXBhc3NTY2FsZSA9IDAuNzggKyB3aW5kRm9yY2UgKiAwLjI4O1xuICAgICAgd2luZENvbXBhc3NBcnJvd0dyb3VwLnNjYWxlLnNldChjb21wYXNzU2NhbGUsIDEsIGNvbXBhc3NTY2FsZSk7XG4gICAgICBjb21wYXNzUmluZ01lc2gucm90YXRpb24ueiArPSBkZWx0YSAqIHdpbmRGb3JjZSAqIDEuODtcblxuICAgICAgY29uc3Qgd2luZEhhbGZTcGFuWCA9IDEuODUgKiB0YWJsZVNjYWxlWDtcbiAgICAgIGNvbnN0IHdpbmRIYWxmU3BhblogPSAwLjkyICogdGFibGVTY2FsZVo7XG4gICAgICBjb25zdCB3aW5kTGluZVBvc0F0dHIgPSB3aW5kVmVjdG9yTGluZXNHZW8uYXR0cmlidXRlc1xuICAgICAgICAucG9zaXRpb24gYXMgVEhSRUUuQnVmZmVyQXR0cmlidXRlO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGl2ZVdpbmRDb3VudDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHdwID0gd2luZFBhcnRpY2xlc0RhdGFbaV07XG5cbiAgICAgICAgLy8gQ29tcHV0ZSBhZXJvZHluYW1pYyB2b3J0ZXggZGVmbGVjdGlvbiBhcm91bmQgc2t5c2NyYXBlciBjbHVzdGVyc1xuICAgICAgICBjb25zdCBkaXN0VG9DZW50ZXIgPSBNYXRoLmh5cG90KHdwLngsIHdwLnopO1xuICAgICAgICBjb25zdCB2b3J0ZXhJbmZsdWVuY2UgPSBNYXRoLm1heCgwLCAxLjAgLSBkaXN0VG9DZW50ZXIgLyAxLjE1KTtcbiAgICAgICAgY29uc3QgY3Jvc3NGbG93WiA9XG4gICAgICAgICAgZGlzdFRvQ2VudGVyID4gMC4wMlxuICAgICAgICAgICAgPyAoLXdwLnggLyBkaXN0VG9DZW50ZXIpICogdm9ydGV4SW5mbHVlbmNlICogMC40OFxuICAgICAgICAgICAgOiAwO1xuICAgICAgICBjb25zdCB1cGRyYWZ0WSA9XG4gICAgICAgICAgTWF0aC5zaW4oZWxhcHNlZCAqIDEuNiArIHdwLnBoYXNlICsgd3AueCAqIDEuNCkgKlxuICAgICAgICAgICAgMC4xNCAqXG4gICAgICAgICAgICB3aW5kRm9yY2UgK1xuICAgICAgICAgIHZvcnRleEluZmx1ZW5jZSAqIDAuMTggKiB3aW5kRm9yY2U7XG5cbiAgICAgICAgY29uc3QgdnggPVxuICAgICAgICAgIChiYXNlV2luZERpclggKyB2b3J0ZXhJbmZsdWVuY2UgKiAwLjMyKSAqXG4gICAgICAgICAgd3AuYmFzZVNwZWVkICpcbiAgICAgICAgICAoMC42NSArIHdpbmRGb3JjZSAqIDAuODUpO1xuICAgICAgICBjb25zdCB2eSA9IHVwZHJhZnRZO1xuICAgICAgICBjb25zdCB2eiA9XG4gICAgICAgICAgKGJhc2VXaW5kRGlyWiArIGNyb3NzRmxvd1opICpcbiAgICAgICAgICB3cC5iYXNlU3BlZWQgKlxuICAgICAgICAgICgwLjY1ICsgd2luZEZvcmNlICogMC44NSk7XG5cbiAgICAgICAgd3AueCArPSB2eCAqIGRlbHRhO1xuICAgICAgICB3cC55ICs9IHZ5ICogZGVsdGEgKiAwLjQ1O1xuICAgICAgICB3cC56ICs9IHZ6ICogZGVsdGE7XG5cbiAgICAgICAgLy8gV3JhcCBhcm91bmQgdGFibGV0b3AgYWVyb2R5bmFtaWMgdm9sdW1lIGJvdW5kc1xuICAgICAgICBpZiAod3AueCA+IHdpbmRIYWxmU3BhblgpIHdwLnggPSAtd2luZEhhbGZTcGFuWDtcbiAgICAgICAgaWYgKHdwLnggPCAtd2luZEhhbGZTcGFuWCkgd3AueCA9IHdpbmRIYWxmU3Bhblg7XG4gICAgICAgIGlmICh3cC56ID4gd2luZEhhbGZTcGFuWikgd3AueiA9IC13aW5kSGFsZlNwYW5aO1xuICAgICAgICBpZiAod3AueiA8IC13aW5kSGFsZlNwYW5aKSB3cC56ID0gd2luZEhhbGZTcGFuWjtcbiAgICAgICAgaWYgKHdwLnkgPiAxLjg1KSB3cC55ID0gMC4wODtcbiAgICAgICAgaWYgKHdwLnkgPCAwLjA2KSB3cC55ID0gMS42NTtcblxuICAgICAgICAvLyBPcmllbnQgaW5zdGFuY2VkIHZlY3RvciBjb25lIGFsb25nIDNEIHZlbG9jaXR5IHZlY3RvciAodngsIHZ5LCB2eilcbiAgICAgICAgX3dpbmREaXJWZWMuc2V0KHZ4LCB2eSwgdnopO1xuICAgICAgICBjb25zdCBzcGVlZE1hZyA9IE1hdGgubWF4KDAuMDAxLCBfd2luZERpclZlYy5sZW5ndGgoKSk7XG4gICAgICAgIF93aW5kRGlyVmVjLmRpdmlkZVNjYWxhcihzcGVlZE1hZyk7XG5cbiAgICAgICAgX2R1bW15TWF0cml4T2JqLnBvc2l0aW9uLnNldCh3cC54LCB3cC55LCB3cC56KTtcbiAgICAgICAgX2R1bW15TWF0cml4T2JqLnF1YXRlcm5pb24uc2V0RnJvbVVuaXRWZWN0b3JzKFxuICAgICAgICAgIF93aW5kVXBBeGlzLFxuICAgICAgICAgIF93aW5kRGlyVmVjXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFycm93U2NhbGUgPSAwLjcgKyB3aW5kRm9yY2UgKiAwLjQ1O1xuICAgICAgICBfZHVtbXlNYXRyaXhPYmouc2NhbGUuc2V0KFxuICAgICAgICAgIGFycm93U2NhbGUsXG4gICAgICAgICAgYXJyb3dTY2FsZSAqICgwLjg1ICsgc3BlZWRNYWcgKiAwLjI1KSxcbiAgICAgICAgICBhcnJvd1NjYWxlXG4gICAgICAgICk7XG4gICAgICAgIF9kdW1teU1hdHJpeE9iai51cGRhdGVNYXRyaXgoKTtcbiAgICAgICAgd2luZFZlY3RvckFycm93cy5zZXRNYXRyaXhBdChpLCBfZHVtbXlNYXRyaXhPYmoubWF0cml4KTtcblxuICAgICAgICAvLyBVcGRhdGUgdmVjdG9yIHN0cmVhbWxpbmUgdGFpbCBsZW5ndGggcHJvcG9ydGlvbmFsIHRvIHdpbmQgZm9yY2UgJiBsb2NhbCBzcGVlZFxuICAgICAgICBjb25zdCB0YWlsTGVuID0gKDAuMDkgKyAwLjE1ICogd2luZEZvcmNlKSAqIE1hdGgubWluKDEuOCwgc3BlZWRNYWcpO1xuICAgICAgICB3aW5kTGluZVBvc0F0dHIuc2V0WFlaKGkgKiAyLCB3cC54LCB3cC55LCB3cC56KTtcbiAgICAgICAgd2luZExpbmVQb3NBdHRyLnNldFhZWihcbiAgICAgICAgICBpICogMiArIDEsXG4gICAgICAgICAgd3AueCAtIF93aW5kRGlyVmVjLnggKiB0YWlsTGVuLFxuICAgICAgICAgIHdwLnkgLSBfd2luZERpclZlYy55ICogdGFpbExlbixcbiAgICAgICAgICB3cC56IC0gX3dpbmREaXJWZWMueiAqIHRhaWxMZW5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHdpbmRWZWN0b3JBcnJvd3MuaW5zdGFuY2VNYXRyaXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgICAgd2luZExpbmVQb3NBdHRyLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuXG4gICAgICAvLyBSZXBvcnQgbGl2ZSBXZWJHTCByZW5kZXJlciBtZXRyaWNzIGV2ZXJ5IH4wLjVzXG4gICAgICBmcHNGcmFtZUNvdW50ZXIrKztcbiAgICAgIGZwc0FjY3VtdWxhdG9yICs9IGRlbHRhO1xuICAgICAgaWYgKGZwc0FjY3VtdWxhdG9yID49IDAuNSkge1xuICAgICAgICBjb25zdCBtZWFzdXJlZEZwcyA9IE1hdGgubWluKFxuICAgICAgICAgIDEyMCxcbiAgICAgICAgICBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKGZwc0ZyYW1lQ291bnRlciAvIGZwc0FjY3VtdWxhdG9yKSlcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG9uTWV0cmljc1JlZi5jdXJyZW50KSB7XG4gICAgICAgICAgb25NZXRyaWNzUmVmLmN1cnJlbnQoe1xuICAgICAgICAgICAgbWVhc3VyZWRXZWJnbEZwczogbWVhc3VyZWRGcHMsXG4gICAgICAgICAgICB3ZWJnbERyYXdDYWxsczogcmVuZGVyZXIuaW5mby5yZW5kZXIuY2FsbHMsXG4gICAgICAgICAgICB3ZWJnbFRyaWFuZ2xlczogcmVuZGVyZXIuaW5mby5yZW5kZXIudHJpYW5nbGVzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZwc0ZyYW1lQ291bnRlciA9IDA7XG4gICAgICAgIGZwc0FjY3VtdWxhdG9yID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU29mdHdhcmVHbCkgYWZ0ZXJEcmF3KHRpY2spO1xuICAgICAgZWxzZSBmcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spO1xuICAgIH1cblxuICAgIGZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7XG5cbiAgICBjb25zdCBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XG4gICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xuICAgICAgY29uc3QgdyA9IGNvbnRhaW5lci5jbGllbnRXaWR0aCB8fCB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGNvbnN0IGggPSBjb250YWluZXIuY2xpZW50SGVpZ2h0IHx8IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgIGNhbWVyYS5hc3BlY3QgPSB3IC8gaDtcbiAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICByZW5kZXJlci5zZXRTaXplKHcsIGgpO1xuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVJlc2l6ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZnJhbWVJZCk7XG4gICAgICBjbGVhclRpbWVvdXQoZnJhbWVJZCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplKTtcbiAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcm1vdmUnLCBoYW5kbGVQb2ludGVyTW92ZSk7XG4gICAgICByZW5kZXJlci5kb21FbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgaGFuZGxlUG9pbnRlckRvd24pO1xuICAgICAgcmVuZGVyZXIuZG9tRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVydXAnLCBoYW5kbGVQb2ludGVyVXApO1xuICAgICAgY29udHJvbHMuZGlzcG9zZSgpO1xuICAgICAgcmVuZGVyZXIuZGlzcG9zZSgpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHJlZj17Y2FudmFzTW91bnRSZWZ9XG4gICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBjdXJzb3ItZ3JhYiBhY3RpdmU6Y3Vyc29yLWdyYWJiaW5nXCJcbiAgICAgIGFyaWEtbGFiZWw9XCJJbnRlcmFrdHl3bmEgc3ltdWxhY2phIDNEIEFSIGhvbG9ncmFtb3d5Y2ggYnVkeW5rw7N3IG5hIHN0b2xlIGtvbmZlcmVuY3lqbnltXCJcbiAgICAvPlxuICApO1xufTtcbiJdfQ==