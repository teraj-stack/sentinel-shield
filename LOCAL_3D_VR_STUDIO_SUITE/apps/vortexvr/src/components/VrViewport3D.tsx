const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport7_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport7_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/vortexvr/node_modules/.vite/deps/react.js?v=adc20043";
import * as THREE from "/apps/vortexvr/node_modules/.vite/deps/three.js?v=32c3fd5d";
import { OrbitControls } from "/apps/vortexvr/node_modules/.vite/deps/three_addons_controls_OrbitControls__js.js?v=0e69a801";
import { RoomEnvironment } from "/apps/vortexvr/node_modules/.vite/deps/three_addons_environments_RoomEnvironment__js.js?v=a85a4e3f";
import { renderProceduralTextureCanvas } from "/apps/vortexvr/src/utils/cryptoE2E.ts";
import { VisualLogicGraphEditor } from "/apps/vortexvr/src/components/VisualLogicGraphEditor.tsx";
import { Play, Square, Upload, Smartphone, Eye, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Move, RotateCw, Compass, GitBranch, Image as ImageIcon, HelpCircle, Palette } from "/apps/vortexvr/node_modules/.vite/deps/lucide-react.js?v=867ef266";
var _jsxFileName = "/app/applet/src/components/VrViewport3D.tsx";
import __vite__cjsImport7_react_jsxDevRuntime from "/apps/vortexvr/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=adc20043";
// Pre-allocated math helpers at module scope (Zero GC in render loop)
const _vec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3();
const _raycaster = new THREE.Raycaster();
const _mouse = new THREE.Vector2();
const _groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const _intersectPt = new THREE.Vector3();
const _dummyObj = new THREE.Object3D();
const _instColor = new THREE.Color();
// Procedural Web Audio API sound effect helper (Zero external MP3 404s)
function playProceduralSfx(type) {
	try {
		const AudioCtx = window.AudioContext || window.webkitAudioContext;
		if (!AudioCtx) return;
		const ctx = new AudioCtx();
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.connect(gain);
		gain.connect(ctx.destination);
		const now = ctx.currentTime;
		if (type === "place") {
			osc.type = "triangle";
			osc.frequency.setValueAtTime(280, now);
			osc.frequency.exponentialRampToValueAtTime(560, now + .12);
			gain.gain.setValueAtTime(.12, now);
			gain.gain.exponentialRampToValueAtTime(.001, now + .14);
			osc.start(now);
			osc.stop(now + .14);
		} else if (type === "score") {
			osc.type = "sine";
			osc.frequency.setValueAtTime(440, now);
			osc.frequency.exponentialRampToValueAtTime(880, now + .18);
			gain.gain.setValueAtTime(.15, now);
			gain.gain.exponentialRampToValueAtTime(.001, now + .2);
			osc.start(now);
			osc.stop(now + .2);
		} else if (type === "teleport") {
			osc.type = "sawtooth";
			osc.frequency.setValueAtTime(620, now);
			osc.frequency.exponentialRampToValueAtTime(180, now + .22);
			gain.gain.setValueAtTime(.1, now);
			gain.gain.exponentialRampToValueAtTime(.001, now + .24);
			osc.start(now);
			osc.stop(now + .24);
		} else {
			osc.type = "sine";
			osc.frequency.setValueAtTime(520, now);
			gain.gain.setValueAtTime(.08, now);
			gain.gain.exponentialRampToValueAtTime(.001, now + .06);
			osc.start(now);
			osc.stop(now + .06);
		}
	} catch {}
}
/**
* Builds a composite 4–9 part THREE.Group model with varied roughness (>= 0.25 delta)
* and metalness, pivoted at bottom-center (Y = 0) so nothing floats.
*/
function buildCompositeActorGroup(item, renderer, isSoftwareGl) {
	const group = new THREE.Group();
	group.name = item.id;
	group.userData = { sceneObjectId: item.id };
	let customTexture = null;
	if (item.customImageDataUrl) {
		const loader = new THREE.TextureLoader();
		customTexture = loader.load(item.customImageDataUrl);
		customTexture.colorSpace = THREE.SRGBColorSpace;
		customTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
	} else if (item.textureSpec) {
		const texCanvas = renderProceduralTextureCanvas(item.textureSpec, 512);
		customTexture = new THREE.CanvasTexture(texCanvas);
		customTexture.colorSpace = THREE.SRGBColorSpace;
		customTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
		customTexture.wrapS = THREE.RepeatWrapping;
		customTexture.wrapT = THREE.RepeatWrapping;
	}
	const primaryMat = new THREE.MeshStandardMaterial({
		color: new THREE.Color(item.color),
		roughness: Math.min(.95, Math.max(.05, item.roughness)),
		metalness: Math.min(.98, Math.max(.05, item.metalness)),
		map: customTexture || null
	});
	// Ensure >= 0.30 roughness difference on secondary material for visual separation
	const secRoughness = item.roughness > .5 ? item.roughness - .35 : item.roughness + .35;
	const secondaryMat = new THREE.MeshStandardMaterial({
		color: new THREE.Color(item.secondaryColor || "#38BDF8"),
		roughness: Math.min(.95, Math.max(.08, secRoughness)),
		metalness: Math.max(.1, 1 - item.metalness)
	});
	const accentEmissiveMat = new THREE.MeshStandardMaterial({
		color: new THREE.Color(item.secondaryColor || "#F59E0B"),
		emissive: new THREE.Color(item.secondaryColor || "#F59E0B"),
		emissiveIntensity: .75,
		roughness: .15,
		metalness: .9
	});
	// Soft radial contact shadow directly beneath the actor (offset Y = 0.015 to prevent Z-fighting)
	const shadowGeo = new THREE.CircleGeometry(1.15, 24);
	shadowGeo.rotateX(-Math.PI / 2);
	const shadowMat = new THREE.MeshBasicMaterial({
		color: 132631,
		transparent: true,
		opacity: .42,
		depthWrite: false
	});
	const contactShadow = new THREE.Mesh(shadowGeo, shadowMat);
	contactShadow.position.y = .015;
	group.add(contactShadow);
	if (item.type === "rover") {
		const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.7, .48, 1.15), primaryMat);
		chassis.position.y = .48;
		chassis.castShadow = !isSoftwareGl;
		chassis.receiveShadow = !isSoftwareGl;
		group.add(chassis);
		const canopy = new THREE.Mesh(new THREE.CylinderGeometry(.38, .52, .36, 16), secondaryMat);
		canopy.position.set(.2, .88, 0);
		canopy.castShadow = !isSoftwareGl;
		group.add(canopy);
		const wheelGeo = new THREE.CylinderGeometry(.28, .28, .22, 18);
		wheelGeo.rotateX(Math.PI / 2);
		const wheelOffsets = [
			[
				-.6,
				.28,
				.62
			],
			[
				.6,
				.28,
				.62
			],
			[
				-.6,
				.28,
				-.62
			],
			[
				.6,
				.28,
				-.62
			]
		];
		wheelOffsets.forEach(([wx, wy, wz]) => {
			const wheel = new THREE.Mesh(wheelGeo, secondaryMat);
			wheel.position.set(wx, wy, wz);
			wheel.castShadow = !isSoftwareGl;
			group.add(wheel);
		});
		const mast = new THREE.Mesh(new THREE.CylinderGeometry(.04, .04, .55, 8), primaryMat);
		mast.position.set(-.5, .98, 0);
		group.add(mast);
		const beacon = new THREE.Mesh(new THREE.SphereGeometry(.11, 14, 14), accentEmissiveMat);
		beacon.position.set(-.5, 1.28, 0);
		group.add(beacon);
	} else if (item.type === "turret") {
		const base = new THREE.Mesh(new THREE.CylinderGeometry(.68, .85, .35, 8), primaryMat);
		base.position.y = .175;
		base.castShadow = !isSoftwareGl;
		group.add(base);
		const column = new THREE.Mesh(new THREE.CylinderGeometry(.42, .52, .75, 12), secondaryMat);
		column.position.y = .72;
		column.castShadow = !isSoftwareGl;
		group.add(column);
		const head = new THREE.Mesh(new THREE.BoxGeometry(.85, .46, .68), primaryMat);
		head.position.y = 1.28;
		head.castShadow = !isSoftwareGl;
		group.add(head);
		const barrelGeo = new THREE.CylinderGeometry(.06, .08, .95, 12);
		barrelGeo.rotateZ(Math.PI / 2);
		const barrelL = new THREE.Mesh(barrelGeo, secondaryMat);
		barrelL.position.set(.62, 1.28, .18);
		const barrelR = new THREE.Mesh(barrelGeo, secondaryMat);
		barrelR.position.set(.62, 1.28, -.18);
		group.add(barrelL, barrelR);
		const sensor = new THREE.Mesh(new THREE.SphereGeometry(.12, 14, 14), accentEmissiveMat);
		sensor.position.set(.44, 1.32, 0);
		group.add(sensor);
	} else if (item.type === "portal") {
		const plinth = new THREE.Mesh(new THREE.BoxGeometry(2.2, .24, .9), primaryMat);
		plinth.position.y = .12;
		plinth.castShadow = !isSoftwareGl;
		group.add(plinth);
		const ring = new THREE.Mesh(new THREE.TorusGeometry(1.05, .14, 16, 36), primaryMat);
		ring.position.y = 1.28;
		ring.castShadow = !isSoftwareGl;
		group.add(ring);
		const innerRing = new THREE.Mesh(new THREE.TorusGeometry(.88, .05, 12, 32), accentEmissiveMat);
		innerRing.position.y = 1.28;
		group.add(innerRing);
		const pylonGeo = new THREE.BoxGeometry(.18, 1.4, .32);
		const pylonL = new THREE.Mesh(pylonGeo, secondaryMat);
		pylonL.position.set(-1.05, .82, 0);
		const pylonR = new THREE.Mesh(pylonGeo, secondaryMat);
		pylonR.position.set(1.05, .82, 0);
		group.add(pylonL, pylonR);
	} else if (item.type === "crystal") {
		const base = new THREE.Mesh(new THREE.CylinderGeometry(.7, .82, .24, 6), secondaryMat);
		base.position.y = .12;
		group.add(base);
		const mainSpire = new THREE.Mesh(new THREE.ConeGeometry(.38, 1.85, 6), primaryMat);
		mainSpire.position.y = 1.14;
		mainSpire.castShadow = !isSoftwareGl;
		group.add(mainSpire);
		const shardL = new THREE.Mesh(new THREE.ConeGeometry(.22, 1.15, 5), accentEmissiveMat);
		shardL.position.set(-.35, .68, .15);
		shardL.rotation.z = .32;
		const shardR = new THREE.Mesh(new THREE.ConeGeometry(.2, .95, 5), accentEmissiveMat);
		shardR.position.set(.36, .58, -.12);
		shardR.rotation.z = -.36;
		group.add(shardL, shardR);
	} else if (item.type === "habitat") {
		const domeBase = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.22, .45, 16), primaryMat);
		domeBase.position.y = .225;
		group.add(domeBase);
		const domeRoof = new THREE.Mesh(new THREE.SphereGeometry(1.12, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2), secondaryMat);
		domeRoof.position.y = .45;
		domeRoof.castShadow = !isSoftwareGl;
		group.add(domeRoof);
		const airlock = new THREE.Mesh(new THREE.BoxGeometry(.65, .62, .75), primaryMat);
		airlock.position.set(0, .31, 1.15);
		group.add(airlock);
		const dishPole = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, .5, 8), primaryMat);
		dishPole.position.set(0, 1.72, 0);
		const beacon = new THREE.Mesh(new THREE.OctahedronGeometry(.16), accentEmissiveMat);
		beacon.position.set(0, 2.02, 0);
		group.add(dishPole, beacon);
	} else if (item.type === "custom_obj" && item.customMesh?.vertices?.length) {
		const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(.75, .85, .2, 16), secondaryMat);
		pedestal.position.y = .1;
		group.add(pedestal);
		const bufferGeo = new THREE.BufferGeometry();
		const verts = new Float32Array(item.customMesh.vertices);
		bufferGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
		bufferGeo.computeVertexNormals();
		bufferGeo.computeBoundingBox();
		const customMesh = new THREE.Mesh(bufferGeo, primaryMat);
		const bbox = bufferGeo.boundingBox;
		if (bbox) {
			const minY = bbox.min.y;
			customMesh.position.y = .2 - minY;
		} else {
			customMesh.position.y = .8;
		}
		customMesh.castShadow = !isSoftwareGl;
		group.add(customMesh);
		const holoRing = new THREE.Mesh(new THREE.TorusGeometry(.78, .03, 10, 32), accentEmissiveMat);
		holoRing.rotation.x = Math.PI / 2;
		holoRing.position.y = .22;
		group.add(holoRing);
	} else {
		const stand = new THREE.Mesh(new THREE.CylinderGeometry(.45, .55, .14, 16), secondaryMat);
		stand.position.y = .07;
		group.add(stand);
		const core = new THREE.Mesh(new THREE.SphereGeometry(.42, 20, 20), primaryMat);
		core.position.y = 1.05;
		core.castShadow = !isSoftwareGl;
		group.add(core);
		const eyeRing = new THREE.Mesh(new THREE.TorusGeometry(.46, .05, 12, 28), accentEmissiveMat);
		eyeRing.position.y = 1.05;
		group.add(eyeRing);
		const wingL = new THREE.Mesh(new THREE.BoxGeometry(.55, .08, .24), secondaryMat);
		wingL.position.set(-.58, 1.12, 0);
		const wingR = new THREE.Mesh(new THREE.BoxGeometry(.55, .08, .24), secondaryMat);
		wingR.position.set(.58, 1.12, 0);
		group.add(wingL, wingR);
	}
	group.position.set(item.position[0], item.position[1], item.position[2]);
	group.rotation.y = THREE.MathUtils.degToRad(item.rotationY);
	group.scale.setScalar(item.scale);
	return group;
}
/**
* Real-time .OBJ / .JSON vertex parser for user-uploaded 3D files
*/
function parseObjOrJsonFile(content, fileName) {
	const lower = fileName.toLowerCase();
	if (lower.endsWith(".json") || lower.endsWith(".gltf")) {
		try {
			const parsed = JSON.parse(content);
			if (Array.isArray(parsed.vertices) && parsed.vertices.length >= 9) {
				return {
					vertices: parsed.vertices,
					triangles: Math.floor(parsed.vertices.length / 9)
				};
			}
		} catch {}
	}
	const rawVerts = [];
	const outTriangles = [];
	const lines = content.split(/\r?\n/);
	for (const line of lines) {
		const trimmed = line.trim();
		if (trimmed.startsWith("v ")) {
			const parts = trimmed.split(/\s+/);
			if (parts.length >= 4) {
				rawVerts.push([
					parseFloat(parts[1]) || 0,
					parseFloat(parts[2]) || 0,
					parseFloat(parts[3]) || 0
				]);
			}
		} else if (trimmed.startsWith("f ")) {
			const parts = trimmed.slice(2).trim().split(/\s+/);
			const indices = parts.map((p) => parseInt(p.split("/")[0], 10) - 1);
			for (let i = 1; i < indices.length - 1; i++) {
				const v0 = rawVerts[indices[0]];
				const v1 = rawVerts[indices[i]];
				const v2 = rawVerts[indices[i + 1]];
				if (v0 && v1 && v2) {
					outTriangles.push(...v0, ...v1, ...v2);
				}
			}
		}
	}
	if (outTriangles.length >= 9) {
		return {
			vertices: outTriangles,
			triangles: Math.floor(outTriangles.length / 9)
		};
	}
	const fallbackGeo = new THREE.TorusKnotGeometry(.55, .18, 64, 12);
	const posAttr = fallbackGeo.getAttribute("position");
	const indexAttr = fallbackGeo.getIndex();
	const verts = [];
	if (indexAttr) {
		for (let i = 0; i < indexAttr.count; i++) {
			const idx = indexAttr.getX(i);
			verts.push(posAttr.getX(idx), posAttr.getY(idx) + .75, posAttr.getZ(idx));
		}
	}
	fallbackGeo.dispose();
	return {
		vertices: verts,
		triangles: Math.floor(verts.length / 9)
	};
}
export const VrViewport3D = ({ lang, objects, setObjects, selectedObjectId, setSelectedObjectId, logicNodes, setLogicNodes, mobileConfig, setMobileConfig, onOpenAiStudioForSelected, onExportMobileBundle, activeDockTab, setActiveDockTab, isLogicGraphSubView, setIsLogicGraphSubView, showLiveCoachmarks, setShowLiveCoachmarks, onOpenTutorialModal }) => {
	const canvasMountRef = useRef(null);
	const fileInputRef = useRef(null);
	const imageTextureInputRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [stereoSplit, setStereoSplit] = useState(false);
	const [playScore, setPlayScore] = useState(0);
	const [playFeed, setPlayFeed] = useState(lang === "pl" ? "Wskazówka: Kliknij \"? Samouczek\", aby zobaczyć gdzie dodawać grafiki, modele 3D i jak łączyć węzły logiki!" : "Tip: Click \"? Tutorial\" to see where to add custom graphics, 3D models, and wire logic nodes!");
	const [dockCollapsed, setDockCollapsed] = useState(false);
	const [gyroActive, setGyroActive] = useState(false);
	const [imageUploadTarget, setImageUploadTarget] = useState("object");
	// Mutable refs for Three.js loop access
	const objectsRef = useRef(objects);
	objectsRef.current = objects;
	const selectedIdRef = useRef(selectedObjectId);
	selectedIdRef.current = selectedObjectId;
	const isPlayingRef = useRef(isPlaying);
	isPlayingRef.current = isPlaying;
	const stereoSplitRef = useRef(stereoSplit);
	stereoSplitRef.current = stereoSplit;
	const logicNodesRef = useRef(logicNodes);
	logicNodesRef.current = logicNodes;
	const mobileConfigRef = useRef(mobileConfig);
	mobileConfigRef.current = mobileConfig;
	const sceneRef = useRef(null);
	const rendererRef = useRef(null);
	const cameraRef = useRef(null);
	const controlsRef = useRef(null);
	const actorGroupMapRef = useRef(new Map());
	const isSoftwareGlRef = useRef(false);
	const keysPressedRef = useRef({});
	const virtualStickRef = useRef({
		x: 0,
		y: 0
	});
	const cameraPresetTargetRef = useRef(null);
	const selectedObject = objects.find((o) => o.id === selectedObjectId) || null;
	// Execute a LogicNode and recursively cascade along all downstream dependency wires!
	const executeNodeAndCascade = (rootNodeId, hitObjectId) => {
		const visited = new Set();
		const currentNodes = logicNodesRef.current;
		const runStep = (nodeId, delayMs) => {
			if (visited.has(nodeId)) return;
			visited.add(nodeId);
			const rule = currentNodes.find((n) => n.id === nodeId && n.enabled);
			if (!rule) return;
			window.setTimeout(() => {
				// Highlight node in the visual graph
				setLogicNodes((prev) => prev.map((n) => n.id === rule.id ? {
					...n,
					lastTriggeredAt: Date.now()
				} : n));
				const targetObjId = rule.targetObjectId !== "ALL" ? rule.targetObjectId : hitObjectId || selectedIdRef.current;
				if (rule.action === "AwardPoints100") {
					setPlayScore((s) => s + 100);
					playProceduralSfx("score");
					setPlayFeed(lang === "pl" ? `+100 PKT! Wyzwolono węzeł: ${rule.name}` : `+100 PTS! Triggered node: ${rule.name}`);
				} else if (rule.action === "TeleportToCenter") {
					if (cameraRef.current && controlsRef.current) {
						cameraRef.current.position.set(0, 3.2, 5.5);
						controlsRef.current.target.set(0, 1, 0);
					}
					playProceduralSfx("teleport");
					setPlayFeed(lang === "pl" ? `Teleportacja gracza (${rule.name})` : `Player teleported (${rule.name})`);
				} else if (rule.action === "ToggleTurboSpin" && targetObjId) {
					setObjects((prev) => prev.map((o) => o.id === targetObjId ? {
						...o,
						animation: {
							...o.animation,
							trajectoryType: o.animation.trajectoryType === "spin" ? "hover" : "spin",
							speed: 2.6
						}
					} : o));
					playProceduralSfx("place");
					setPlayFeed(lang === "pl" ? `Kaskada: Przełączono obrót obiektu (${rule.name})` : `Cascade: Toggled turbo spin (${rule.name})`);
				} else if (rule.action === "PulseEmissive" && targetObjId) {
					setObjects((prev) => prev.map((o) => o.id === targetObjId ? {
						...o,
						animation: {
							...o.animation,
							trajectoryType: "pulse",
							speed: 2.2,
							amplitude: .65
						}
					} : o));
					playProceduralSfx("score");
					setPlayFeed(lang === "pl" ? `Kaskada: Pulsowanie rezonansowe (${rule.name})` : `Cascade: Emissive resonance pulse (${rule.name})`);
				} else {
					setPlayScore((s) => s + 50);
					playProceduralSfx("score");
					setPlayFeed(lang === "pl" ? `Wykonano węzeł logiki: ${rule.name}` : `Executed logic node: ${rule.name}`);
				}
			}, delayMs);
			// Find all downstream nodes that depend on this nodeId and trigger them in cascade
			const downstreamNodes = currentNodes.filter((n) => n.enabled && (n.dependsOnIds || []).includes(nodeId));
			downstreamNodes.forEach((child, idx) => {
				runStep(child.id, delayMs + 420 * (idx + 1));
			});
		};
		runStep(rootNodeId, 0);
	};
	// Keyboard shortcut 'H' to collapse/expand bottom HUD dock
	useEffect(() => {
		const onKeyDown = (e) => {
			if (document.activeElement?.tagName === "INPUT" || document.activeElement?.tagName === "TEXTAREA" || document.activeElement?.tagName === "SELECT") {
				return;
			}
			keysPressedRef.current[e.code] = true;
			if (e.key === "h" || e.key === "H") {
				setDockCollapsed((prev) => !prev);
			}
		};
		const onKeyUp = (e) => {
			keysPressedRef.current[e.code] = false;
		};
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
		};
	}, []);
	// DeviceOrientation Gyroscope handler for Standalone Mobile/Tablet play
	useEffect(() => {
		if (!gyroActive) return;
		const handleOrientation = (e) => {
			if (!cameraRef.current || !isPlayingRef.current) return;
			const alpha = THREE.MathUtils.degToRad(e.alpha || 0);
			const beta = THREE.MathUtils.degToRad(Math.max(-60, Math.min(60, (e.beta || 45) - 45)));
			const sens = mobileConfigRef.current.gyroSensitivity || 1;
			cameraRef.current.rotation.order = "YXZ";
			cameraRef.current.rotation.y = alpha * sens * .5;
			cameraRef.current.rotation.x = beta * sens * .5;
		};
		window.addEventListener("deviceorientation", handleOrientation);
		return () => window.removeEventListener("deviceorientation", handleOrientation);
	}, [gyroActive]);
	// Initialize Three.js WebGLRenderer & Studio Scene once
	useEffect(() => {
		const mount = canvasMountRef.current;
		if (!mount) return;
		const isSoftwareGl = (() => {
			const gl = document.createElement("canvas").getContext("webgl2");
			if (!gl) return true;
			const ext = gl.getExtension("WEBGL_debug_renderer_info");
			const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
			const gpu = String(gl.getParameter(param));
			gl.getExtension("WEBGL_lose_context")?.loseContext();
			return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
		})();
		isSoftwareGlRef.current = isSoftwareGl;
		const width = mount.clientWidth || 1024;
		const height = mount.clientHeight || 620;
		const renderer = new THREE.WebGLRenderer({
			antialias: !isSoftwareGl,
			powerPreference: "high-performance",
			preserveDrawingBuffer: true
		});
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.12;
		renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = !isSoftwareGl;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		rendererRef.current = renderer;
		mount.innerHTML = "";
		mount.appendChild(renderer.domElement);
		const scene = new THREE.Scene();
		const bgHex = 593174;
		scene.background = new THREE.Color(bgHex);
		scene.fog = new THREE.FogExp2(bgHex, .022);
		sceneRef.current = scene;
		const pmremGenerator = new THREE.PMREMGenerator(renderer);
		scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), .04).texture;
		pmremGenerator.dispose();
		const camera = new THREE.PerspectiveCamera(60, width / height, .1, 160);
		camera.position.set(8.5, 6.2, 10.5);
		cameraRef.current = camera;
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.enableDamping = !isSoftwareGl;
		controls.dampingFactor = .06;
		controls.maxPolarAngle = Math.PI / 2 - .03;
		controls.minDistance = 2.5;
		controls.maxDistance = 42;
		controls.target.set(0, .8, 0);
		controls.update();
		controlsRef.current = controls;
		controls.addEventListener("start", () => {
			cameraPresetTargetRef.current = null;
		});
		const hemiLight = new THREE.HemisphereLight(3718648, 988970, .65);
		scene.add(hemiLight);
		const keyLight = new THREE.DirectionalLight(16776171, 1.9);
		keyLight.position.set(12, 18, 10);
		keyLight.castShadow = !isSoftwareGl;
		keyLight.shadow.camera.left = -16;
		keyLight.shadow.camera.right = 16;
		keyLight.shadow.camera.top = 16;
		keyLight.shadow.camera.bottom = -16;
		keyLight.shadow.bias = -5e-4;
		keyLight.shadow.normalBias = .02;
		keyLight.shadow.mapSize.width = 1024;
		keyLight.shadow.mapSize.height = 1024;
		scene.add(keyLight);
		const rimLight = new THREE.DirectionalLight(3718648, .85);
		rimLight.position.set(-14, 9, -12);
		scene.add(rimLight);
		const floorGeo = new THREE.CircleGeometry(36, 64);
		floorGeo.rotateX(-Math.PI / 2);
		const floorMat = new THREE.MeshStandardMaterial({
			color: 988970,
			roughness: .82,
			metalness: .18
		});
		const floorMesh = new THREE.Mesh(floorGeo, floorMat);
		floorMesh.receiveShadow = !isSoftwareGl;
		scene.add(floorMesh);
		const gridHelper = new THREE.GridHelper(32, 32, 16096779, 1976635);
		gridHelper.position.y = .02;
		scene.add(gridHelper);
		const pillarCount = 28;
		const pillarGeo = new THREE.ConeGeometry(.65, 2.2, 6);
		const pillarMat = new THREE.MeshStandardMaterial({
			color: 1976635,
			roughness: .65,
			metalness: .35
		});
		const instancedPillars = new THREE.InstancedMesh(pillarGeo, pillarMat, pillarCount);
		for (let i = 0; i < pillarCount; i++) {
			const angle = i / pillarCount * Math.PI * 2;
			const rad = 17.5 + i % 3 * .8;
			const scaleY = .75 + i * 7 % 5 * .18;
			_dummyObj.position.set(Math.cos(angle) * rad, 1.1 * scaleY, Math.sin(angle) * rad);
			_dummyObj.rotation.set(0, angle, 0);
			_dummyObj.scale.set(1 + i % 2 * .15, scaleY, 1);
			_dummyObj.updateMatrix();
			instancedPillars.setMatrixAt(i, _dummyObj.matrix);
			_instColor.setHSL(.58 + i % 4 * .02, .32, .16 + i % 3 * .04);
			instancedPillars.setColorAt(i, _instColor);
		}
		instancedPillars.instanceMatrix.needsUpdate = true;
		if (instancedPillars.instanceColor) instancedPillars.instanceColor.needsUpdate = true;
		instancedPillars.computeBoundingSphere();
		scene.add(instancedPillars);
		const selRingGeo = new THREE.RingGeometry(.95, 1.12, 36);
		selRingGeo.rotateX(-Math.PI / 2);
		const selRingMat = new THREE.MeshBasicMaterial({
			color: 16096779,
			side: THREE.DoubleSide,
			polygonOffset: true,
			polygonOffsetFactor: -1,
			polygonOffsetUnits: -1
		});
		const selectionRing = new THREE.Mesh(selRingGeo, selRingMat);
		selectionRing.position.y = .025;
		selectionRing.visible = false;
		scene.add(selectionRing);
		if (!isSoftwareGl) {
			renderer.compile(scene, camera);
		}
		const handlePointerDown = (event) => {
			const rect = renderer.domElement.getBoundingClientRect();
			_mouse.x = (event.clientX - rect.left) / rect.width * 2 - 1;
			_mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
			_raycaster.setFromCamera(_mouse, camera);
			const groups = Array.from(actorGroupMapRef.current.values());
			const intersects = _raycaster.intersectObjects(groups, true);
			if (intersects.length > 0) {
				let curr = intersects[0].object;
				while (curr && !curr.userData?.sceneObjectId) {
					curr = curr.parent;
				}
				const hitId = curr?.userData?.sceneObjectId;
				if (hitId) {
					setSelectedObjectId(hitId);
					playProceduralSfx("click");
					if (isPlayingRef.current) {
						const matchingRootRules = logicNodesRef.current.filter((ln) => ln.enabled && (ln.targetObjectId === hitId || ln.targetObjectId === "ALL") && (ln.event === "OnGrabClick" || ln.event === "OnGaze"));
						matchingRootRules.forEach((rule) => {
							executeNodeAndCascade(rule.id, hitId);
						});
					}
				}
			}
		};
		renderer.domElement.addEventListener("pointerdown", handlePointerDown);
		const handleResize = () => {
			if (!mount) return;
			const w = mount.clientWidth || 1024;
			const h = mount.clientHeight || 620;
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			renderer.setSize(w, h);
		};
		window.addEventListener("resize", handleResize);
		let frameId = 0;
		const clock = new THREE.Clock();
		function afterDraw(cb) {
			const gl = renderer.getContext();
			const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
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
			if (cameraPresetTargetRef.current) {
				camera.position.lerp(cameraPresetTargetRef.current, 1 - Math.exp(-6 * delta));
				if (camera.position.distanceTo(cameraPresetTargetRef.current) < .08) {
					cameraPresetTargetRef.current = null;
				}
			}
			if (isPlayingRef.current) {
				const speed = 6.5 * delta;
				const forward = (keysPressedRef.current["KeyW"] || keysPressedRef.current["ArrowUp"] ? 1 : 0) - (keysPressedRef.current["KeyS"] || keysPressedRef.current["ArrowDown"] ? 1 : 0) - virtualStickRef.current.y;
				const strafe = (keysPressedRef.current["KeyD"] || keysPressedRef.current["ArrowRight"] ? 1 : 0) - (keysPressedRef.current["KeyA"] || keysPressedRef.current["ArrowLeft"] ? 1 : 0) + virtualStickRef.current.x;
				if (Math.abs(forward) > .01 || Math.abs(strafe) > .01) {
					camera.getWorldDirection(_vec3);
					_vec3.y = 0;
					_vec3.normalize();
					camera.position.addScaledVector(_vec3, forward * speed);
					controls.target.addScaledVector(_vec3, forward * speed);
					_vec3.cross(camera.up).normalize();
					camera.position.addScaledVector(_vec3, strafe * speed);
					controls.target.addScaledVector(_vec3, strafe * speed);
				}
			}
			const currentObjects = objectsRef.current;
			for (const obj of currentObjects) {
				const grp = actorGroupMapRef.current.get(obj.id);
				if (!grp) continue;
				const anim = obj.animation;
				const spd = anim.speed || 1.2;
				const amp = anim.amplitude || .35;
				if (anim.trajectoryType === "hover") {
					grp.position.y = obj.position[1] + Math.sin(elapsed * spd * 2) * amp * .45;
					grp.rotation.y = THREE.MathUtils.degToRad(obj.rotationY) + Math.sin(elapsed * spd * .5) * .25;
				} else if (anim.trajectoryType === "spin") {
					grp.position.y = obj.position[1];
					grp.rotation.y += delta * spd * 2.2;
				} else if (anim.trajectoryType === "orbit") {
					grp.position.x = obj.position[0] + Math.cos(elapsed * spd) * amp * 2.2;
					grp.position.z = obj.position[2] + Math.sin(elapsed * spd) * amp * 2.2;
					grp.rotation.y = -elapsed * spd;
				} else if (anim.trajectoryType === "figure8") {
					grp.position.x = obj.position[0] + Math.sin(elapsed * spd) * amp * 2.4;
					grp.position.z = obj.position[2] + Math.sin(elapsed * spd * 2) * amp * 1.2;
				} else if (anim.trajectoryType === "pulse") {
					const s = obj.scale * (1 + Math.sin(elapsed * spd * 3) * .14 * amp);
					grp.scale.setScalar(s);
				} else {
					grp.position.set(obj.position[0], obj.position[1], obj.position[2]);
				}
			}
			const selId = selectedIdRef.current;
			const selGrp = selId ? actorGroupMapRef.current.get(selId) : null;
			if (selGrp) {
				selectionRing.visible = true;
				selectionRing.position.x = selGrp.position.x;
				selectionRing.position.z = selGrp.position.z;
				selectionRing.rotation.z = elapsed * .8;
			} else {
				selectionRing.visible = false;
			}
			controls.update();
			const w = renderer.domElement.clientWidth;
			const h = renderer.domElement.clientHeight;
			if (stereoSplitRef.current) {
				renderer.setScissorTest(true);
				const halfW = Math.floor(w / 2);
				const ipdOffset = ((mobileConfigRef.current.ipdMm || 63) - 60) * .004 + .06;
				renderer.setViewport(0, 0, halfW, h);
				renderer.setScissor(0, 0, halfW, h);
				camera.aspect = halfW / h;
				camera.updateProjectionMatrix();
				camera.position.x -= ipdOffset;
				renderer.render(scene, camera);
				renderer.setViewport(halfW, 0, w - halfW, h);
				renderer.setScissor(halfW, 0, w - halfW, h);
				camera.position.x += ipdOffset * 2;
				renderer.render(scene, camera);
				camera.position.x -= ipdOffset;
				renderer.setScissorTest(false);
				renderer.setViewport(0, 0, w, h);
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
			} else {
				renderer.setScissorTest(false);
				renderer.setViewport(0, 0, w, h);
				renderer.render(scene, camera);
			}
			if (isSoftwareGl) {
				afterDraw(tick);
			} else {
				frameId = requestAnimationFrame(tick);
			}
		}
		tick();
		return () => {
			cancelAnimationFrame(frameId);
			clearTimeout(frameId);
			window.removeEventListener("resize", handleResize);
			renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
			controls.dispose();
			renderer.dispose();
		};
	}, []);
	// Reconcile Three.js scene actors whenever `objects` state updates
	useEffect(() => {
		const scene = sceneRef.current;
		const renderer = rendererRef.current;
		if (!scene || !renderer) return;
		const currentIds = new Set(objects.map((o) => o.id));
		actorGroupMapRef.current.forEach((grp, id) => {
			if (!currentIds.has(id)) {
				scene.remove(grp);
				actorGroupMapRef.current.delete(id);
			}
		});
		objects.forEach((item) => {
			const existing = actorGroupMapRef.current.get(item.id);
			if (existing) {
				scene.remove(existing);
			}
			const newGrp = buildCompositeActorGroup(item, renderer, isSoftwareGlRef.current);
			scene.add(newGrp);
			actorGroupMapRef.current.set(item.id, newGrp);
		});
	}, [objects]);
	const handleDropOnCanvas = (e) => {
		e.preventDefault();
		const modelType = e.dataTransfer.getData("application/vortex-model");
		if (!modelType || !rendererRef.current || !cameraRef.current) return;
		const rect = rendererRef.current.domElement.getBoundingClientRect();
		_mouse.x = (e.clientX - rect.left) / rect.width * 2 - 1;
		_mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
		_raycaster.setFromCamera(_mouse, cameraRef.current);
		let dropX = (Math.random() - .5) * 6;
		let dropZ = (Math.random() - .5) * 6;
		if (_raycaster.ray.intersectPlane(_groundPlane, _intersectPt)) {
			dropX = Math.max(-12, Math.min(12, Number(_intersectPt.x.toFixed(1))));
			dropZ = Math.max(-12, Math.min(12, Number(_intersectPt.z.toFixed(1))));
		}
		spawnNewObject(modelType, [
			dropX,
			0,
			dropZ
		]);
	};
	const spawnNewObject = (type, coords) => {
		const defaults = {
			rover: {
				namePl: "Łazik Eksploracyjny XR",
				nameEn: "XR Exploration Rover",
				color: "#E2E8F0",
				sec: "#F59E0B",
				tris: 1420,
				parts: 8
			},
			turret: {
				namePl: "Wieżyczka Obronna Strażnik",
				nameEn: "Sentinel Defense Turret",
				color: "#334155",
				sec: "#38BDF8",
				tris: 1180,
				parts: 6
			},
			portal: {
				namePl: "Brama Kwantowa Portal",
				nameEn: "Quantum Portal Gate",
				color: "#1E293B",
				sec: "#A855F7",
				tris: 1640,
				parts: 5
			},
			crystal: {
				namePl: "Monolit Energetyczny",
				nameEn: "Energy Crystal Monolith",
				color: "#0284C7",
				sec: "#22D3EE",
				tris: 680,
				parts: 4
			},
			habitat: {
				namePl: "Kopuła Bazy Modułowej",
				nameEn: "Modular Habitat Dome",
				color: "#CBD5E1",
				sec: "#F97316",
				tris: 1890,
				parts: 5
			},
			drone: {
				namePl: "Dron Zwiadowczy 6-DoF",
				nameEn: "6-DoF Recon Drone",
				color: "#475569",
				sec: "#10B981",
				tris: 960,
				parts: 5
			},
			custom_obj: {
				namePl: "Model Własny CAD/3D",
				nameEn: "Custom CAD/3D Mesh",
				color: "#F59E0B",
				sec: "#38BDF8",
				tris: 2048,
				parts: 4
			}
		};
		const spec = defaults[type];
		const id = `obj_${Date.now().toString(36)}`;
		const pos = coords || [
			Number(((Math.random() - .5) * 8).toFixed(1)),
			0,
			Number(((Math.random() - .5) * 8).toFixed(1))
		];
		const newObj = {
			id,
			name: lang === "pl" ? `${spec.namePl} #${objects.length + 1}` : `${spec.nameEn} #${objects.length + 1}`,
			type,
			position: pos,
			rotationY: 0,
			scale: 1,
			color: spec.color,
			secondaryColor: spec.sec,
			roughness: .25,
			metalness: .78,
			triangles: spec.tris,
			partsCount: spec.parts,
			animation: {
				trajectoryType: type === "drone" || type === "crystal" ? "hover" : "none",
				speed: 1.2,
				amplitude: .35
			}
		};
		setObjects((prev) => [...prev, newObj]);
		setSelectedObjectId(id);
		playProceduralSfx("place");
		setPlayFeed(lang === "pl" ? `Dodano na scenę: ${newObj.name} w punkcie [${pos[0]}, ${pos[2]}]` : `Spawned ${newObj.name} at [${pos[0]}, ${pos[2]}]`);
	};
	// Real-time Custom 3D File Upload (.OBJ / .GLTF / .JSON)
	const handleFileUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const content = String(reader.result || "");
			const parsed = parseObjOrJsonFile(content, file.name);
			const id = `custom_${Date.now().toString(36)}`;
			const newObj = {
				id,
				name: `Import: ${file.name.slice(0, 22)}`,
				type: "custom_obj",
				position: [
					0,
					0,
					0
				],
				rotationY: 0,
				scale: 1.15,
				color: "#F59E0B",
				secondaryColor: "#38BDF8",
				roughness: .2,
				metalness: .85,
				triangles: parsed.triangles,
				partsCount: 4,
				customMesh: { vertices: parsed.vertices },
				animation: {
					trajectoryType: "spin",
					speed: 1,
					amplitude: .3
				}
			};
			setObjects((prev) => [...prev, newObj]);
			setSelectedObjectId(id);
			playProceduralSfx("score");
			setPlayFeed(lang === "pl" ? `Zaimportowano model 3D "${file.name}" (${parsed.triangles} trójkątów) w czasie rzeczywistym!` : `Imported 3D model "${file.name}" (${parsed.triangles} triangles) in real time!`);
		};
		reader.readAsText(file);
		e.target.value = "";
	};
	// Direct Custom Graphic / Texture / Skybox Image Upload (.PNG / .JPG / .WEBP)
	const handleImageTextureUpload = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			const dataUrl = String(reader.result || "");
			if (imageUploadTarget === "skybox" && sceneRef.current) {
				const loader = new THREE.TextureLoader();
				const skyTex = loader.load(dataUrl);
				skyTex.colorSpace = THREE.SRGBColorSpace;
				skyTex.mapping = THREE.EquirectangularReflectionMapping;
				sceneRef.current.background = skyTex;
				playProceduralSfx("score");
				setPlayFeed(lang === "pl" ? `Wgrano własną grafikę nieba (Skybox): "${file.name}"! Świat zyskał nową atmosferę.` : `Applied custom Skybox panorama "${file.name}" to the 3D world!`);
			} else {
				const targetId = selectedObjectId || objects[0]?.id;
				if (targetId) {
					setObjects((prev) => prev.map((o) => o.id === targetId ? {
						...o,
						customImageDataUrl: dataUrl
					} : o));
					playProceduralSfx("score");
					setPlayFeed(lang === "pl" ? `Nałożono własną grafikę "${file.name}" jako teksturę 3D na wybrany obiekt!` : `Applied custom graphic "${file.name}" onto the selected 3D actor!`);
				}
			}
		};
		reader.readAsDataURL(file);
		e.target.value = "";
	};
	// Change World Atmosphere Skybox Preset
	const applyAtmospherePreset = (hexBg) => {
		if (!sceneRef.current) return;
		sceneRef.current.background = new THREE.Color(hexBg);
		sceneRef.current.fog = new THREE.FogExp2(hexBg, .02);
		playProceduralSfx("click");
	};
	const updateSelectedProp = (key, value) => {
		if (!selectedObjectId) return;
		setObjects((prev) => prev.map((o) => o.id === selectedObjectId ? {
			...o,
			[key]: value
		} : o));
	};
	const totalTriangles = objects.reduce((sum, o) => sum + o.triangles, 0);
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "relative w-full h-[calc(100vh-105px)] min-h-[640px] bg-slate-950 overflow-hidden select-none",
		children: [
			/* @__PURE__ */ _jsxDEV("input", {
				ref: fileInputRef,
				type: "file",
				accept: ".obj,.gltf,.glb,.stl,.json",
				className: "hidden",
				onChange: handleFileUpload
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1162,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("input", {
				ref: imageTextureInputRef,
				type: "file",
				accept: "image/png,image/jpeg,image/webp,image/svg+xml",
				className: "hidden",
				onChange: handleImageTextureUpload
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1171,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				ref: canvasMountRef,
				onDragOver: (e) => e.preventDefault(),
				onDrop: handleDropOnCanvas,
				className: "w-full h-full cursor-grab active:cursor-grabbing"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1180,
				columnNumber: 7
			}, this),
			stereoSplit && /* @__PURE__ */ _jsxDEV("div", {
				className: "pointer-events-none absolute inset-y-0 left-1/2 w-0.5 bg-amber-400/70 z-10 flex flex-col items-center justify-between py-6",
				children: /* @__PURE__ */ _jsxDEV("span", {
					className: "px-2 py-0.5 text-[11px] font-mono bg-slate-900 text-amber-300 border border-slate-700 rounded",
					children: [
						"LEFT EYE · RIGHT EYE (IPD ",
						mobileConfig.ipdMm,
						"mm)"
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1190,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1189,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "pointer-events-auto absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 z-20",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-900/95 border border-slate-800 text-xs text-slate-200",
					children: [
						/* @__PURE__ */ _jsxDEV("span", {
							className: "font-semibold text-white",
							children: lang === "pl" ? "Scena VR: Stacja Helios" : "VR Scene: Helios Station"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1199,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("span", {
							"aria-hidden": "true",
							className: "text-slate-600",
							children: "·"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1202,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("span", {
							className: "font-mono tabular-nums text-slate-300",
							children: [
								objects.length,
								" ",
								lang === "pl" ? "obiektów" : "actors"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1203,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("span", {
							"aria-hidden": "true",
							className: "text-slate-600",
							children: "·"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1206,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("span", {
							className: "font-mono tabular-nums text-slate-300",
							children: [totalTriangles.toLocaleString(), " tris"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1207,
							columnNumber: 11
						}, this),
						isPlaying && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV("span", {
							"aria-hidden": "true",
							className: "text-slate-600",
							children: "·"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1212,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "font-mono tabular-nums font-semibold text-emerald-400",
							children: [
								"SCORE: ",
								playScore,
								" PKT"
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1213,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1211,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1198,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: onOpenTutorialModal,
							className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-500/20 border border-amber-400 text-amber-300 hover:bg-amber-500/30 transition-colors whitespace-nowrap shrink-0",
							children: [/* @__PURE__ */ _jsxDEV(HelpCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1227,
								columnNumber: 13
							}, this), lang === "pl" ? "? Samouczek i Gdzie Klikać" : "? Tutorial & Hints"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1223,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => {
								setActiveDockTab("logic");
								setIsLogicGraphSubView(!isLogicGraphSubView);
								setDockCollapsed(false);
							},
							className: `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${isLogicGraphSubView ? "bg-sky-500 text-slate-950 font-semibold border-sky-400" : "bg-slate-900/95 border-slate-800 text-slate-200 hover:border-slate-700"}`,
							children: [/* @__PURE__ */ _jsxDEV(GitBranch, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1244,
								columnNumber: 13
							}, this), lang === "pl" ? "Graf Logiki (Sub-View)" : "Logic Graph (Sub-View)"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1232,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "relative",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								onClick: () => {
									setImageUploadTarget("object");
									imageTextureInputRef.current?.click();
								},
								className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-900/95 border border-slate-800 text-slate-200 hover:border-amber-500/60 transition-colors whitespace-nowrap shrink-0",
								children: [/* @__PURE__ */ _jsxDEV(ImageIcon, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1257,
									columnNumber: 15
								}, this), lang === "pl" ? "Wgraj Grafikę (.PNG/.JPG)" : "Upload Graphic (.PNG/.JPG)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1250,
								columnNumber: 13
							}, this), showLiveCoachmarks && /* @__PURE__ */ _jsxDEV("div", {
								className: "absolute top-11 left-0 w-60 p-2.5 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-semibold shadow-xl z-30",
								children: "1. Kliknij tutaj, aby wgrać własną grafikę lub teksturę z dysku na obiekt 3D!"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1261,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1249,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "relative",
							children: [/* @__PURE__ */ _jsxDEV("button", {
								onClick: () => fileInputRef.current?.click(),
								className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-900/95 border border-slate-800 text-slate-200 hover:border-slate-700 transition-colors whitespace-nowrap shrink-0",
								children: [/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1273,
									columnNumber: 15
								}, this), lang === "pl" ? "Import 3D (.OBJ/.GLTF)" : "Import 3D (.OBJ/.GLTF)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1269,
								columnNumber: 13
							}, this), showLiveCoachmarks && /* @__PURE__ */ _jsxDEV("div", {
								className: "absolute top-11 right-0 w-56 p-2.5 rounded-lg bg-sky-400 text-slate-950 text-[11px] font-semibold shadow-xl z-30",
								children: "2. Tutaj zaimportujesz własne modele 3D (.OBJ / .GLTF)!"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1277,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1268,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => {
								setIsPlaying((p) => !p);
								playProceduralSfx("click");
							},
							className: `flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${isPlaying ? "bg-rose-600 hover:bg-rose-500 text-white" : "bg-amber-500 hover:bg-amber-400 text-slate-950"}`,
							children: [isPlaying ? /* @__PURE__ */ _jsxDEV(Square, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1294,
								columnNumber: 26
							}, this) : /* @__PURE__ */ _jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1294,
								columnNumber: 63
							}, this), isPlaying ? lang === "pl" ? "Zatrzymaj Test" : "Stop Playtest" : lang === "pl" ? "Testuj Grę na Żywo" : "Live Playtest"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1283,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setStereoSplit((s) => !s),
							className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${stereoSplit ? "bg-sky-500/20 border-sky-400 text-sky-200" : "bg-slate-900/95 border-slate-800 text-slate-200 hover:border-slate-700"}`,
							children: [/* @__PURE__ */ _jsxDEV(Eye, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1312,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "VR Split" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1313,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1304,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1221,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1197,
				columnNumber: 7
			}, this),
			isLogicGraphSubView && /* @__PURE__ */ _jsxDEV("div", {
				className: "pointer-events-auto absolute inset-x-4 top-16 bottom-4 z-30 rounded-2xl bg-slate-900/95 border border-slate-700 p-5 shadow-2xl flex flex-col",
				children: /* @__PURE__ */ _jsxDEV(VisualLogicGraphEditor, {
					lang,
					logicNodes,
					setLogicNodes,
					objects,
					selectedObjectId,
					isExpandedSubView: true,
					setIsExpandedSubView: setIsLogicGraphSubView,
					onTriggerNodeCascade: (nodeId) => executeNodeAndCascade(nodeId)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 1321,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 1320,
				columnNumber: 9
			}, this),
			(isPlaying || mobileConfig.playWithoutHeadset) && !isLogicGraphSubView && /* @__PURE__ */ _jsxDEV("div", {
				className: "pointer-events-auto absolute top-20 left-4 z-10 flex flex-col gap-2 bg-slate-900/95 border border-slate-800 rounded-xl p-3 w-52",
				children: [
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between text-[11px] text-slate-300",
						children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "font-semibold flex items-center gap-1",
							children: [/* @__PURE__ */ _jsxDEV(Smartphone, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1339,
								columnNumber: 15
							}, this), lang === "pl" ? "Sterowanie Mobilne" : "Mobile Touch Pad"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1338,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "font-mono text-slate-400",
							children: [mobileConfig.fovDegrees, "° FOV"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1342,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1337,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "grid grid-cols-3 gap-1.5 text-xs font-mono",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1345,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onPointerDown: () => virtualStickRef.current.y = -1,
								onPointerUp: () => virtualStickRef.current.y = 0,
								onPointerLeave: () => virtualStickRef.current.y = 0,
								className: "py-1.5 rounded bg-slate-800 hover:bg-slate-700 active:bg-amber-500 active:text-slate-950 text-center text-white",
								children: "▲ W"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1346,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1354,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onPointerDown: () => virtualStickRef.current.x = -1,
								onPointerUp: () => virtualStickRef.current.x = 0,
								onPointerLeave: () => virtualStickRef.current.x = 0,
								className: "py-1.5 rounded bg-slate-800 hover:bg-slate-700 active:bg-amber-500 active:text-slate-950 text-center text-white",
								children: "◀ A"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1355,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onPointerDown: () => virtualStickRef.current.y = 1,
								onPointerUp: () => virtualStickRef.current.y = 0,
								onPointerLeave: () => virtualStickRef.current.y = 0,
								className: "py-1.5 rounded bg-slate-800 hover:bg-slate-700 active:bg-amber-500 active:text-slate-950 text-center text-white",
								children: "▼ S"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1363,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onPointerDown: () => virtualStickRef.current.x = 1,
								onPointerUp: () => virtualStickRef.current.x = 0,
								onPointerLeave: () => virtualStickRef.current.x = 0,
								className: "py-1.5 rounded bg-slate-800 hover:bg-slate-700 active:bg-amber-500 active:text-slate-950 text-center text-white",
								children: "D ▶"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1371,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1344,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => setGyroActive((g) => !g),
						className: `w-full py-1.5 rounded text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors ${gyroActive ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`,
						children: [/* @__PURE__ */ _jsxDEV(Compass, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1386,
							columnNumber: 13
						}, this), gyroActive ? lang === "pl" ? "Żyroskop: AKTYWNY" : "Gyroscope: ACTIVE" : lang === "pl" ? "Włącz Żyroskop (Telefon/Tablet)" : "Enable Gyroscope Sensor"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1380,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1336,
				columnNumber: 9
			}, this),
			!isLogicGraphSubView && /* @__PURE__ */ _jsxDEV("div", {
				className: "pointer-events-auto absolute left-1/2 -translate-x-1/2 bottom-4 z-20 w-[95vw] max-w-[1020px] transition-transform duration-200",
				style: { transform: dockCollapsed ? "translate(-50%, calc(100% - 36px))" : "translate(-50%, 0)" },
				children: [
					showLiveCoachmarks && !dockCollapsed && /* @__PURE__ */ _jsxDEV("div", {
						className: "mb-2 flex flex-wrap items-center justify-between gap-2 px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-semibold shadow-lg",
						children: [/* @__PURE__ */ _jsxDEV("span", { children: "3. Dolny Panel Sterowania: Przeciągaj modele z Palety (1), wgrywaj grafiki i kolory w Inspektorze (2) lub łącz linie zależności w Grafie Logiki (3)!" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1408,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setShowLiveCoachmarks(false),
							className: "px-2 py-0.5 rounded bg-slate-950 text-amber-300 text-[11px]",
							children: "Ukryj podpowiedzi"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1411,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1407,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between px-4 py-1.5 rounded-t-xl bg-slate-900 border border-b-0 border-slate-800 text-xs text-slate-300",
						children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "truncate max-w-[500px] text-slate-300",
							children: playFeed
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1422,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "hidden lg:flex items-center gap-1 text-[11px]",
								children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-400 mr-1 flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Palette, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1427,
											columnNumber: 19
										}, this), lang === "pl" ? "Klimat świata:" : "Atmosphere:"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1426,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => applyAtmospherePreset(593174),
										className: "px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200",
										children: "Kosmos"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1430,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => applyAtmospherePreset(1973067),
										className: "px-2 py-0.5 rounded bg-indigo-950 hover:bg-indigo-900 text-indigo-200",
										children: "Mgławica"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1436,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => applyAtmospherePreset(274222),
										className: "px-2 py-0.5 rounded bg-teal-950 hover:bg-teal-900 text-teal-200",
										children: "Zorza"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1442,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => {
											setImageUploadTarget("skybox");
											imageTextureInputRef.current?.click();
										},
										className: "px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30",
										children: "+ Własne Niebo (.JPG)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1448,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1425,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								onClick: () => setDockCollapsed((c) => !c),
								className: "flex items-center gap-1 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium whitespace-nowrap shrink-0",
								children: [dockCollapsed ? /* @__PURE__ */ _jsxDEV(ChevronUp, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1463,
									columnNumber: 34
								}, this) : /* @__PURE__ */ _jsxDEV(ChevronDown, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1463,
									columnNumber: 74
								}, this), dockCollapsed ? lang === "pl" ? "Pokaż panel (H)" : "Show Dock (H)" : lang === "pl" ? "Ukryj panel (H)" : "Hide Dock (H)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1459,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1423,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1421,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ _jsxDEV("div", {
						className: "bg-slate-900 border border-slate-800 rounded-b-xl p-4 shadow-2xl",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex flex-wrap items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800",
									children: [
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: () => setActiveDockTab("palette"),
											className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeDockTab === "palette" ? "bg-amber-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
											children: lang === "pl" ? "1. Paleta Obiektów (Przeciągnij)" : "1. Object Palette (Drag & Drop)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1480,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: () => setActiveDockTab("inspector"),
											className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeDockTab === "inspector" ? "bg-amber-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
											children: lang === "pl" ? "2. Grafika, Kolory i Inspektor PBR" : "2. Graphics & PBR Inspector"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1490,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: () => setActiveDockTab("logic"),
											className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeDockTab === "logic" ? "bg-amber-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
											children: lang === "pl" ? `3. Wizualny Graf Logiki (${logicNodes.length})` : `3. Visual Logic Graph (${logicNodes.length})`
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1500,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: () => setActiveDockTab("mobile"),
											className: `px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeDockTab === "mobile" ? "bg-amber-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
											children: lang === "pl" ? "4. Gra na Telefonie / Tablecie" : "4. Phone & Tablet Config"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1512,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1479,
									columnNumber: 15
								}, this), selectedObject && /* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: () => {
												setImageUploadTarget("object");
												imageTextureInputRef.current?.click();
											},
											className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/15 border border-sky-500/40 text-sky-300 hover:bg-sky-500/25 transition-colors whitespace-nowrap shrink-0",
											children: [/* @__PURE__ */ _jsxDEV(ImageIcon, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1533,
												columnNumber: 21
											}, this), lang === "pl" ? "Wgraj Grafikę na Obiekt" : "Upload Texture Image"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1526,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: onOpenAiStudioForSelected,
											className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 transition-colors whitespace-nowrap shrink-0",
											children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1540,
												columnNumber: 21
											}, this), lang === "pl" ? "Generator Grafiki AI" : "AI Texture Studio"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1536,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("button", {
											onClick: () => {
												setObjects((prev) => prev.filter((o) => o.id !== selectedObject.id));
												setSelectedObjectId(null);
											},
											className: "p-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 text-rose-300 hover:bg-rose-900/70 transition-colors",
											title: lang === "pl" ? "Usuń obiekt ze sceny" : "Delete actor",
											children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1551,
												columnNumber: 21
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1543,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1525,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1478,
								columnNumber: 13
							}, this),
							activeDockTab === "palette" && /* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5",
								children: [[
									{
										type: "rover",
										labelPl: "Łazik XR (8 cz.)",
										labelEn: "XR Rover (8 pts)",
										meta: "1,420 tris"
									},
									{
										type: "turret",
										labelPl: "Wieżyczka (6 cz.)",
										labelEn: "Turret (6 pts)",
										meta: "1,180 tris"
									},
									{
										type: "portal",
										labelPl: "Portal VR (5 cz.)",
										labelEn: "VR Portal (5 pts)",
										meta: "1,640 tris"
									},
									{
										type: "crystal",
										labelPl: "Kryształ (4 cz.)",
										labelEn: "Crystal (4 pts)",
										meta: "680 tris"
									},
									{
										type: "habitat",
										labelPl: "Baza Hab (5 cz.)",
										labelEn: "Habitat (5 pts)",
										meta: "1,890 tris"
									},
									{
										type: "drone",
										labelPl: "Dron 6-DoF (5 cz.)",
										labelEn: "6-DoF Drone",
										meta: "960 tris"
									}
								].map((entry) => /* @__PURE__ */ _jsxDEV("div", {
									draggable: true,
									onDragStart: (e) => {
										e.dataTransfer.setData("application/vortex-model", entry.type);
									},
									onClick: () => spawnNewObject(entry.type),
									className: "group cursor-pointer rounded-lg bg-slate-950 border border-slate-800 hover:border-amber-500/60 p-2.5 transition-colors flex flex-col justify-between",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between text-xs font-semibold text-slate-100 group-hover:text-amber-300",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "truncate",
											children: lang === "pl" ? entry.labelPl : entry.labelEn
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1580,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV(Plus, { className: "w-3.5 h-3.5 shrink-0 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1581,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1579,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "mt-1.5 text-[11px] font-mono text-slate-400",
										children: [
											entry.meta,
											" · ",
											lang === "pl" ? "Przeciągnij" : "Drag/Click"
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1583,
										columnNumber: 21
									}, this)]
								}, entry.type, true, {
									fileName: _jsxFileName,
									lineNumber: 1570,
									columnNumber: 19
								}, this)), /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => fileInputRef.current?.click(),
									className: "cursor-pointer rounded-lg bg-amber-500/10 border border-dashed border-amber-500/50 hover:bg-amber-500/20 p-2.5 transition-colors flex flex-col justify-between text-left",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between text-xs font-semibold text-amber-300",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "truncate",
											children: lang === "pl" ? "Własny 3D" : "Custom 3D"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1594,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5 shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1595,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1593,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "mt-1.5 text-[11px] font-mono text-amber-200/80",
										children: ".OBJ · .GLTF · .JSON"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1597,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1589,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1559,
								columnNumber: 15
							}, this),
							activeDockTab === "inspector" && /* @__PURE__ */ _jsxDEV("div", { children: selectedObject ? /* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 md:grid-cols-4 gap-4 items-center text-xs",
								children: [
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-slate-400 mb-1",
										children: lang === "pl" ? "Nazwa Obiektu i Tekstura" : "Actor Name & Graphic"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1610,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex gap-1.5",
										children: [/* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											value: selectedObject.name,
											onChange: (e) => updateSelectedProp("name", e.target.value),
											className: "w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white font-medium"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1614,
											columnNumber: 25
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onClick: () => {
												setImageUploadTarget("object");
												imageTextureInputRef.current?.click();
											},
											className: "px-2.5 py-1.5 rounded bg-amber-500 text-slate-950 font-semibold whitespace-nowrap shrink-0",
											title: lang === "pl" ? "Wgraj własny plik graficzny .PNG/.JPG na ten obiekt" : "Upload custom image texture",
											children: "+ Grafika"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1620,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1613,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1609,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-slate-400 mb-1 flex items-center gap-1",
										children: [/* @__PURE__ */ _jsxDEV(Move, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1636,
											columnNumber: 25
										}, this), lang === "pl" ? "Pozycja X / Z (m)" : "Position X / Z (m)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1635,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "grid grid-cols-2 gap-2 font-mono",
										children: [/* @__PURE__ */ _jsxDEV("input", {
											type: "number",
											step: "0.5",
											value: selectedObject.position[0],
											onChange: (e) => updateSelectedProp("position", [
												parseFloat(e.target.value) || 0,
												selectedObject.position[1],
												selectedObject.position[2]
											]),
											className: "px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1640,
											columnNumber: 25
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "number",
											step: "0.5",
											value: selectedObject.position[2],
											onChange: (e) => updateSelectedProp("position", [
												selectedObject.position[0],
												selectedObject.position[1],
												parseFloat(e.target.value) || 0
											]),
											className: "px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1653,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1639,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1634,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-slate-400 mb-1 flex items-center justify-between",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ _jsxDEV(RotateCw, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1672,
												columnNumber: 27
											}, this), lang === "pl" ? "Obrót Y / Skala" : "Rotation Y / Scale"]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1671,
											columnNumber: 25
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono text-slate-300",
											children: [
												selectedObject.rotationY,
												"° · ",
												selectedObject.scale.toFixed(1),
												"x"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1675,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1670,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: "0",
											max: "360",
											value: selectedObject.rotationY,
											onChange: (e) => updateSelectedProp("rotationY", Number(e.target.value)),
											className: "accent-amber-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1680,
											columnNumber: 25
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: "0.4",
											max: "2.5",
											step: "0.1",
											value: selectedObject.scale,
											onChange: (e) => updateSelectedProp("scale", Number(e.target.value)),
											className: "accent-amber-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1688,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1679,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1669,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-slate-400 mb-1 flex items-center justify-between",
										children: /* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "Kolory PBR i Ruch Obiektu" : "PBR Colors & Motion" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1702,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1701,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ _jsxDEV("input", {
												type: "color",
												value: selectedObject.color,
												onChange: (e) => updateSelectedProp("color", e.target.value),
												className: "w-7 h-7 rounded bg-transparent cursor-pointer"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1705,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("input", {
												type: "color",
												value: selectedObject.secondaryColor,
												onChange: (e) => updateSelectedProp("secondaryColor", e.target.value),
												className: "w-7 h-7 rounded bg-transparent cursor-pointer"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1711,
												columnNumber: 25
											}, this),
											/* @__PURE__ */ _jsxDEV("select", {
												value: selectedObject.animation.trajectoryType,
												onChange: (e) => updateSelectedProp("animation", {
													...selectedObject.animation,
													trajectoryType: e.target.value
												}),
												className: "flex-1 px-2 py-1.5 rounded bg-slate-950 border border-slate-800 text-white",
												children: [
													/* @__PURE__ */ _jsxDEV("option", {
														value: "none",
														children: lang === "pl" ? "Statyczny" : "Static"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1727,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "hover",
														children: lang === "pl" ? "Lewitacja (Hover)" : "Hover"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1728,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "spin",
														children: lang === "pl" ? "Obrót 360° (Spin)" : "Spin 360°"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1729,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "orbit",
														children: lang === "pl" ? "Orbita Kołowa" : "Circular Orbit"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1730,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "figure8",
														children: lang === "pl" ? "Trajektoria 8" : "Figure-8 Path"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1731,
														columnNumber: 27
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "pulse",
														children: lang === "pl" ? "Pulsowanie Skali" : "Scale Pulse"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 1732,
														columnNumber: 27
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1717,
												columnNumber: 25
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1704,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1700,
										columnNumber: 21
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1608,
								columnNumber: 19
							}, this) : /* @__PURE__ */ _jsxDEV("div", {
								className: "text-xs text-slate-400 py-2",
								children: lang === "pl" ? "Kliknij dowolny obiekt 3D na scenie, aby wgrać na niego własną grafikę, zmienić kolory PBR lub przypisać teksturę AI." : "Click any 3D actor in the viewport to upload a custom graphic, modify PBR colors, or apply an AI texture."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1738,
								columnNumber: 19
							}, this) }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1606,
								columnNumber: 15
							}, this),
							activeDockTab === "logic" && /* @__PURE__ */ _jsxDEV(VisualLogicGraphEditor, {
								lang,
								logicNodes,
								setLogicNodes,
								objects,
								selectedObjectId,
								isExpandedSubView: false,
								setIsExpandedSubView: setIsLogicGraphSubView,
								onTriggerNodeCascade: (nodeId) => executeNodeAndCascade(nodeId)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1749,
								columnNumber: 15
							}, this),
							activeDockTab === "mobile" && /* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-1 md:grid-cols-4 gap-3 text-xs items-center",
								children: [
									/* @__PURE__ */ _jsxDEV("div", {
										className: "bg-slate-950 border border-slate-800 rounded-lg p-2.5",
										children: [/* @__PURE__ */ _jsxDEV("label", {
											className: "flex items-center justify-between text-slate-300 font-medium mb-1",
											children: [/* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "Tryb Telefon / Tablet (Bez Gogli)" : "Headset-Free Mobile Play" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1766,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("input", {
												type: "checkbox",
												checked: mobileConfig.playWithoutHeadset,
												onChange: (e) => setMobileConfig((prev) => ({
													...prev,
													playWithoutHeadset: e.target.checked
												})),
												className: "accent-amber-500"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1767,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1765,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("p", {
											className: "text-[11px] text-slate-400",
											children: lang === "pl" ? "Aktywuje wirtualne drążki Multi-Touch oraz żyroskop DeviceOrientation." : "Enables on-screen Multi-Touch sticks and DeviceOrientation gyro."
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1776,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1764,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-slate-400 mb-1",
										children: lang === "pl" ? "Schemat Sterowania Mobilnego" : "Mobile Control Scheme"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1784,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("select", {
										value: mobileConfig.controlScheme,
										onChange: (e) => setMobileConfig((prev) => ({
											...prev,
											controlScheme: e.target.value
										})),
										className: "w-full px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 text-white",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "gyro_touch",
												children: lang === "pl" ? "Żyroskop 360° + Dotyk (Telefon/Tablet)" : "360° Gyroscope + Touch"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1794,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "dual_touch_sticks",
												children: lang === "pl" ? "Podwójne Drążki Ekranowe (Tablet)" : "Dual Virtual Touch Joysticks"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1797,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "cardboard_split",
												children: lang === "pl" ? "Adapter Cardboard Split-Screen VR" : "Cardboard Split-Screen VR"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1800,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1787,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1783,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
										className: "flex items-center justify-between text-slate-400 mb-1",
										children: [/* @__PURE__ */ _jsxDEV("span", { children: lang === "pl" ? "Rozstaw Źrenic (IPD) / Pole Widzenia" : "IPD / Field of View" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1808,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "font-mono text-amber-300",
											children: [
												mobileConfig.ipdMm,
												"mm · ",
												mobileConfig.fovDegrees,
												"°"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1809,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1807,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "grid grid-cols-2 gap-2",
										children: [/* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: "54",
											max: "72",
											value: mobileConfig.ipdMm,
											onChange: (e) => setMobileConfig((prev) => ({
												...prev,
												ipdMm: Number(e.target.value)
											})),
											className: "accent-amber-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1814,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "range",
											min: "50",
											max: "105",
											value: mobileConfig.fovDegrees,
											onChange: (e) => {
												const fov = Number(e.target.value);
												setMobileConfig((prev) => ({
													...prev,
													fovDegrees: fov
												}));
												if (cameraRef.current) {
													cameraRef.current.fov = fov;
													cameraRef.current.updateProjectionMatrix();
												}
											},
											className: "accent-amber-500"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1824,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1813,
										columnNumber: 19
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1806,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-[11px] text-slate-300",
										children: [/* @__PURE__ */ _jsxDEV("div", {
											className: "font-semibold text-amber-300 mb-0.5",
											children: lang === "pl" ? "Możliwości Konfiguracji:" : "Configuration Capabilities:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1843,
											columnNumber: 19
										}, this), /* @__PURE__ */ _jsxDEV("div", { children: lang === "pl" ? "iOS / Android WebGL2, skalowanie DPR 50-100%, blokada orientacji poziomej, kalibracja dryfu żyroskopu." : "iOS / Android WebGL2, 50-100% DPR scaling, landscape lock, gyro drift calibration." }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1846,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1842,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1763,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1476,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1400,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 1160,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJWclZpZXdwb3J0M0QudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBPcmJpdENvbnRyb2xzIH0gZnJvbSAndGhyZWUvYWRkb25zL2NvbnRyb2xzL09yYml0Q29udHJvbHMuanMnO1xuaW1wb3J0IHsgUm9vbUVudmlyb25tZW50IH0gZnJvbSAndGhyZWUvYWRkb25zL2Vudmlyb25tZW50cy9Sb29tRW52aXJvbm1lbnQuanMnO1xuaW1wb3J0IHtcbiAgTGFuZ3VhZ2UsXG4gIExvZ2ljTm9kZSxcbiAgTW9iaWxlU3RhbmRhbG9uZUNvbmZpZyxcbiAgTW9kZWxDYXRlZ29yeSxcbiAgU2NlbmVPYmplY3QsXG59IGZyb20gJy4uL3R5cGVzL3ZyJztcbmltcG9ydCB7IHJlbmRlclByb2NlZHVyYWxUZXh0dXJlQ2FudmFzIH0gZnJvbSAnLi4vdXRpbHMvY3J5cHRvRTJFJztcbmltcG9ydCB7IFZpc3VhbExvZ2ljR3JhcGhFZGl0b3IgfSBmcm9tICcuL1Zpc3VhbExvZ2ljR3JhcGhFZGl0b3InO1xuaW1wb3J0IHtcbiAgUGxheSxcbiAgU3F1YXJlLFxuICBVcGxvYWQsXG4gIFNtYXJ0cGhvbmUsXG4gIEV5ZSxcbiAgUGx1cyxcbiAgVHJhc2gyLFxuICBDaGV2cm9uRG93bixcbiAgQ2hldnJvblVwLFxuICBTcGFya2xlcyxcbiAgRG93bmxvYWQsXG4gIE1vdmUsXG4gIFJvdGF0ZUN3LFxuICBDb21wYXNzLFxuICBHaXRCcmFuY2gsXG4gIEltYWdlIGFzIEltYWdlSWNvbixcbiAgSGVscENpcmNsZSxcbiAgUGFsZXR0ZSxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIFZyVmlld3BvcnQzRFByb3BzIHtcbiAgbGFuZzogTGFuZ3VhZ2U7XG4gIG9iamVjdHM6IFNjZW5lT2JqZWN0W107XG4gIHNldE9iamVjdHM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPFNjZW5lT2JqZWN0W10+PjtcbiAgc2VsZWN0ZWRPYmplY3RJZDogc3RyaW5nIHwgbnVsbDtcbiAgc2V0U2VsZWN0ZWRPYmplY3RJZDogKGlkOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkO1xuICBsb2dpY05vZGVzOiBMb2dpY05vZGVbXTtcbiAgc2V0TG9naWNOb2RlczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248TG9naWNOb2RlW10+PjtcbiAgbW9iaWxlQ29uZmlnOiBNb2JpbGVTdGFuZGFsb25lQ29uZmlnO1xuICBzZXRNb2JpbGVDb25maWc6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPE1vYmlsZVN0YW5kYWxvbmVDb25maWc+PjtcbiAgb25PcGVuQWlTdHVkaW9Gb3JTZWxlY3RlZDogKCkgPT4gdm9pZDtcbiAgb25FeHBvcnRNb2JpbGVCdW5kbGU6ICgpID0+IHZvaWQ7XG4gIGFjdGl2ZURvY2tUYWI6ICdwYWxldHRlJyB8ICdpbnNwZWN0b3InIHwgJ2xvZ2ljJyB8ICdtb2JpbGUnO1xuICBzZXRBY3RpdmVEb2NrVGFiOiAodGFiOiAncGFsZXR0ZScgfCAnaW5zcGVjdG9yJyB8ICdsb2dpYycgfCAnbW9iaWxlJykgPT4gdm9pZDtcbiAgaXNMb2dpY0dyYXBoU3ViVmlldzogYm9vbGVhbjtcbiAgc2V0SXNMb2dpY0dyYXBoU3ViVmlldzogKHZhbDogYm9vbGVhbikgPT4gdm9pZDtcbiAgc2hvd0xpdmVDb2FjaG1hcmtzOiBib29sZWFuO1xuICBzZXRTaG93TGl2ZUNvYWNobWFya3M6ICh2YWw6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9uT3BlblR1dG9yaWFsTW9kYWw6ICgpID0+IHZvaWQ7XG59XG5cbi8vIFByZS1hbGxvY2F0ZWQgbWF0aCBoZWxwZXJzIGF0IG1vZHVsZSBzY29wZSAoWmVybyBHQyBpbiByZW5kZXIgbG9vcClcbmNvbnN0IF92ZWMzID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF90YXJnZXRDYW1Qb3MgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuY29uc3QgX3JheWNhc3RlciA9IG5ldyBUSFJFRS5SYXljYXN0ZXIoKTtcbmNvbnN0IF9tb3VzZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5jb25zdCBfZ3JvdW5kUGxhbmUgPSBuZXcgVEhSRUUuUGxhbmUobmV3IFRIUkVFLlZlY3RvcjMoMCwgMSwgMCksIDApO1xuY29uc3QgX2ludGVyc2VjdFB0ID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbmNvbnN0IF9kdW1teU9iaiA9IG5ldyBUSFJFRS5PYmplY3QzRCgpO1xuY29uc3QgX2luc3RDb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpO1xuXG4vLyBQcm9jZWR1cmFsIFdlYiBBdWRpbyBBUEkgc291bmQgZWZmZWN0IGhlbHBlciAoWmVybyBleHRlcm5hbCBNUDMgNDA0cylcbmZ1bmN0aW9uIHBsYXlQcm9jZWR1cmFsU2Z4KHR5cGU6ICdwbGFjZScgfCAnc2NvcmUnIHwgJ3RlbGVwb3J0JyB8ICdjbGljaycpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBBdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgKHdpbmRvdyBhcyBhbnkpLndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICBpZiAoIUF1ZGlvQ3R4KSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcblxuICAgIGNvbnN0IG5vdyA9IGN0eC5jdXJyZW50VGltZTtcbiAgICBpZiAodHlwZSA9PT0gJ3BsYWNlJykge1xuICAgICAgb3NjLnR5cGUgPSAndHJpYW5nbGUnO1xuICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgyODAsIG5vdyk7XG4gICAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoNTYwLCBub3cgKyAwLjEyKTtcbiAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjEyLCBub3cpO1xuICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIG5vdyArIDAuMTQpO1xuICAgICAgb3NjLnN0YXJ0KG5vdyk7XG4gICAgICBvc2Muc3RvcChub3cgKyAwLjE0KTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzY29yZScpIHtcbiAgICAgIG9zYy50eXBlID0gJ3NpbmUnO1xuICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg0NDAsIG5vdyk7XG4gICAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoODgwLCBub3cgKyAwLjE4KTtcbiAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjE1LCBub3cpO1xuICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIG5vdyArIDAuMik7XG4gICAgICBvc2Muc3RhcnQobm93KTtcbiAgICAgIG9zYy5zdG9wKG5vdyArIDAuMik7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAndGVsZXBvcnQnKSB7XG4gICAgICBvc2MudHlwZSA9ICdzYXd0b290aCc7XG4gICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDYyMCwgbm93KTtcbiAgICAgIG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxODAsIG5vdyArIDAuMjIpO1xuICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMSwgbm93KTtcbiAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBub3cgKyAwLjI0KTtcbiAgICAgIG9zYy5zdGFydChub3cpO1xuICAgICAgb3NjLnN0b3Aobm93ICsgMC4yNCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9zYy50eXBlID0gJ3NpbmUnO1xuICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg1MjAsIG5vdyk7XG4gICAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wOCwgbm93KTtcbiAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBub3cgKyAwLjA2KTtcbiAgICAgIG9zYy5zdGFydChub3cpO1xuICAgICAgb3NjLnN0b3Aobm93ICsgMC4wNik7XG4gICAgfVxuICB9IGNhdGNoIHtcbiAgICAvLyBJZ25vcmUgYXVkaW8gY29udGV4dCBhdXRvcGxheSByZXN0cmljdGlvbnNcbiAgfVxufVxuXG4vKipcbiAqIEJ1aWxkcyBhIGNvbXBvc2l0ZSA04oCTOSBwYXJ0IFRIUkVFLkdyb3VwIG1vZGVsIHdpdGggdmFyaWVkIHJvdWdobmVzcyAoPj0gMC4yNSBkZWx0YSlcbiAqIGFuZCBtZXRhbG5lc3MsIHBpdm90ZWQgYXQgYm90dG9tLWNlbnRlciAoWSA9IDApIHNvIG5vdGhpbmcgZmxvYXRzLlxuICovXG5mdW5jdGlvbiBidWlsZENvbXBvc2l0ZUFjdG9yR3JvdXAoXG4gIGl0ZW06IFNjZW5lT2JqZWN0LFxuICByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcixcbiAgaXNTb2Z0d2FyZUdsOiBib29sZWFuXG4pOiBUSFJFRS5Hcm91cCB7XG4gIGNvbnN0IGdyb3VwID0gbmV3IFRIUkVFLkdyb3VwKCk7XG4gIGdyb3VwLm5hbWUgPSBpdGVtLmlkO1xuICBncm91cC51c2VyRGF0YSA9IHsgc2NlbmVPYmplY3RJZDogaXRlbS5pZCB9O1xuXG4gIGxldCBjdXN0b21UZXh0dXJlOiBUSFJFRS5UZXh0dXJlIHwgbnVsbCA9IG51bGw7XG4gIGlmIChpdGVtLmN1c3RvbUltYWdlRGF0YVVybCkge1xuICAgIGNvbnN0IGxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgY3VzdG9tVGV4dHVyZSA9IGxvYWRlci5sb2FkKGl0ZW0uY3VzdG9tSW1hZ2VEYXRhVXJsKTtcbiAgICBjdXN0b21UZXh0dXJlLmNvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgICBjdXN0b21UZXh0dXJlLmFuaXNvdHJvcHkgPSByZW5kZXJlci5jYXBhYmlsaXRpZXMuZ2V0TWF4QW5pc290cm9weSgpO1xuICB9IGVsc2UgaWYgKGl0ZW0udGV4dHVyZVNwZWMpIHtcbiAgICBjb25zdCB0ZXhDYW52YXMgPSByZW5kZXJQcm9jZWR1cmFsVGV4dHVyZUNhbnZhcyhpdGVtLnRleHR1cmVTcGVjLCA1MTIpO1xuICAgIGN1c3RvbVRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZSh0ZXhDYW52YXMpO1xuICAgIGN1c3RvbVRleHR1cmUuY29sb3JTcGFjZSA9IFRIUkVFLlNSR0JDb2xvclNwYWNlO1xuICAgIGN1c3RvbVRleHR1cmUuYW5pc290cm9weSA9IHJlbmRlcmVyLmNhcGFiaWxpdGllcy5nZXRNYXhBbmlzb3Ryb3B5KCk7XG4gICAgY3VzdG9tVGV4dHVyZS53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nO1xuICAgIGN1c3RvbVRleHR1cmUud3JhcFQgPSBUSFJFRS5SZXBlYXRXcmFwcGluZztcbiAgfVxuXG4gIGNvbnN0IHByaW1hcnlNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgIGNvbG9yOiBuZXcgVEhSRUUuQ29sb3IoaXRlbS5jb2xvciksXG4gICAgcm91Z2huZXNzOiBNYXRoLm1pbigwLjk1LCBNYXRoLm1heCgwLjA1LCBpdGVtLnJvdWdobmVzcykpLFxuICAgIG1ldGFsbmVzczogTWF0aC5taW4oMC45OCwgTWF0aC5tYXgoMC4wNSwgaXRlbS5tZXRhbG5lc3MpKSxcbiAgICBtYXA6IGN1c3RvbVRleHR1cmUgfHwgbnVsbCxcbiAgfSk7XG5cbiAgLy8gRW5zdXJlID49IDAuMzAgcm91Z2huZXNzIGRpZmZlcmVuY2Ugb24gc2Vjb25kYXJ5IG1hdGVyaWFsIGZvciB2aXN1YWwgc2VwYXJhdGlvblxuICBjb25zdCBzZWNSb3VnaG5lc3MgPSBpdGVtLnJvdWdobmVzcyA+IDAuNSA/IGl0ZW0ucm91Z2huZXNzIC0gMC4zNSA6IGl0ZW0ucm91Z2huZXNzICsgMC4zNTtcbiAgY29uc3Qgc2Vjb25kYXJ5TWF0ID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHtcbiAgICBjb2xvcjogbmV3IFRIUkVFLkNvbG9yKGl0ZW0uc2Vjb25kYXJ5Q29sb3IgfHwgJyMzOEJERjgnKSxcbiAgICByb3VnaG5lc3M6IE1hdGgubWluKDAuOTUsIE1hdGgubWF4KDAuMDgsIHNlY1JvdWdobmVzcykpLFxuICAgIG1ldGFsbmVzczogTWF0aC5tYXgoMC4xLCAxIC0gaXRlbS5tZXRhbG5lc3MpLFxuICB9KTtcblxuICBjb25zdCBhY2NlbnRFbWlzc2l2ZU1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgY29sb3I6IG5ldyBUSFJFRS5Db2xvcihpdGVtLnNlY29uZGFyeUNvbG9yIHx8ICcjRjU5RTBCJyksXG4gICAgZW1pc3NpdmU6IG5ldyBUSFJFRS5Db2xvcihpdGVtLnNlY29uZGFyeUNvbG9yIHx8ICcjRjU5RTBCJyksXG4gICAgZW1pc3NpdmVJbnRlbnNpdHk6IDAuNzUsXG4gICAgcm91Z2huZXNzOiAwLjE1LFxuICAgIG1ldGFsbmVzczogMC45LFxuICB9KTtcblxuICAvLyBTb2Z0IHJhZGlhbCBjb250YWN0IHNoYWRvdyBkaXJlY3RseSBiZW5lYXRoIHRoZSBhY3RvciAob2Zmc2V0IFkgPSAwLjAxNSB0byBwcmV2ZW50IFotZmlnaHRpbmcpXG4gIGNvbnN0IHNoYWRvd0dlbyA9IG5ldyBUSFJFRS5DaXJjbGVHZW9tZXRyeSgxLjE1LCAyNCk7XG4gIHNoYWRvd0dlby5yb3RhdGVYKC1NYXRoLlBJIC8gMik7XG4gIGNvbnN0IHNoYWRvd01hdCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7XG4gICAgY29sb3I6IDB4MDIwNjE3LFxuICAgIHRyYW5zcGFyZW50OiB0cnVlLFxuICAgIG9wYWNpdHk6IDAuNDIsXG4gICAgZGVwdGhXcml0ZTogZmFsc2UsXG4gIH0pO1xuICBjb25zdCBjb250YWN0U2hhZG93ID0gbmV3IFRIUkVFLk1lc2goc2hhZG93R2VvLCBzaGFkb3dNYXQpO1xuICBjb250YWN0U2hhZG93LnBvc2l0aW9uLnkgPSAwLjAxNTtcbiAgZ3JvdXAuYWRkKGNvbnRhY3RTaGFkb3cpO1xuXG4gIGlmIChpdGVtLnR5cGUgPT09ICdyb3ZlcicpIHtcbiAgICBjb25zdCBjaGFzc2lzID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDEuNywgMC40OCwgMS4xNSksIHByaW1hcnlNYXQpO1xuICAgIGNoYXNzaXMucG9zaXRpb24ueSA9IDAuNDg7XG4gICAgY2hhc3Npcy5jYXN0U2hhZG93ID0gIWlzU29mdHdhcmVHbDtcbiAgICBjaGFzc2lzLnJlY2VpdmVTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGdyb3VwLmFkZChjaGFzc2lzKTtcblxuICAgIGNvbnN0IGNhbm9weSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMzgsIDAuNTIsIDAuMzYsIDE2KSwgc2Vjb25kYXJ5TWF0KTtcbiAgICBjYW5vcHkucG9zaXRpb24uc2V0KDAuMiwgMC44OCwgMCk7XG4gICAgY2Fub3B5LmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGdyb3VwLmFkZChjYW5vcHkpO1xuXG4gICAgY29uc3Qgd2hlZWxHZW8gPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjI4LCAwLjI4LCAwLjIyLCAxOCk7XG4gICAgd2hlZWxHZW8ucm90YXRlWChNYXRoLlBJIC8gMik7XG4gICAgY29uc3Qgd2hlZWxPZmZzZXRzOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl1bXSA9IFtcbiAgICAgIFstMC42LCAwLjI4LCAwLjYyXSxcbiAgICAgIFswLjYsIDAuMjgsIDAuNjJdLFxuICAgICAgWy0wLjYsIDAuMjgsIC0wLjYyXSxcbiAgICAgIFswLjYsIDAuMjgsIC0wLjYyXSxcbiAgICBdO1xuICAgIHdoZWVsT2Zmc2V0cy5mb3JFYWNoKChbd3gsIHd5LCB3el0pID0+IHtcbiAgICAgIGNvbnN0IHdoZWVsID0gbmV3IFRIUkVFLk1lc2god2hlZWxHZW8sIHNlY29uZGFyeU1hdCk7XG4gICAgICB3aGVlbC5wb3NpdGlvbi5zZXQod3gsIHd5LCB3eik7XG4gICAgICB3aGVlbC5jYXN0U2hhZG93ID0gIWlzU29mdHdhcmVHbDtcbiAgICAgIGdyb3VwLmFkZCh3aGVlbCk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYXN0ID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4wNCwgMC4wNCwgMC41NSwgOCksIHByaW1hcnlNYXQpO1xuICAgIG1hc3QucG9zaXRpb24uc2V0KC0wLjUsIDAuOTgsIDApO1xuICAgIGdyb3VwLmFkZChtYXN0KTtcblxuICAgIGNvbnN0IGJlYWNvbiA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjExLCAxNCwgMTQpLCBhY2NlbnRFbWlzc2l2ZU1hdCk7XG4gICAgYmVhY29uLnBvc2l0aW9uLnNldCgtMC41LCAxLjI4LCAwKTtcbiAgICBncm91cC5hZGQoYmVhY29uKTtcbiAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICd0dXJyZXQnKSB7XG4gICAgY29uc3QgYmFzZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuNjgsIDAuODUsIDAuMzUsIDgpLCBwcmltYXJ5TWF0KTtcbiAgICBiYXNlLnBvc2l0aW9uLnkgPSAwLjE3NTtcbiAgICBiYXNlLmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGdyb3VwLmFkZChiYXNlKTtcblxuICAgIGNvbnN0IGNvbHVtbiA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuNDIsIDAuNTIsIDAuNzUsIDEyKSwgc2Vjb25kYXJ5TWF0KTtcbiAgICBjb2x1bW4ucG9zaXRpb24ueSA9IDAuNzI7XG4gICAgY29sdW1uLmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGdyb3VwLmFkZChjb2x1bW4pO1xuXG4gICAgY29uc3QgaGVhZCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjg1LCAwLjQ2LCAwLjY4KSwgcHJpbWFyeU1hdCk7XG4gICAgaGVhZC5wb3NpdGlvbi55ID0gMS4yODtcbiAgICBoZWFkLmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGdyb3VwLmFkZChoZWFkKTtcblxuICAgIGNvbnN0IGJhcnJlbEdlbyA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMDYsIDAuMDgsIDAuOTUsIDEyKTtcbiAgICBiYXJyZWxHZW8ucm90YXRlWihNYXRoLlBJIC8gMik7XG4gICAgY29uc3QgYmFycmVsTCA9IG5ldyBUSFJFRS5NZXNoKGJhcnJlbEdlbywgc2Vjb25kYXJ5TWF0KTtcbiAgICBiYXJyZWxMLnBvc2l0aW9uLnNldCgwLjYyLCAxLjI4LCAwLjE4KTtcbiAgICBjb25zdCBiYXJyZWxSID0gbmV3IFRIUkVFLk1lc2goYmFycmVsR2VvLCBzZWNvbmRhcnlNYXQpO1xuICAgIGJhcnJlbFIucG9zaXRpb24uc2V0KDAuNjIsIDEuMjgsIC0wLjE4KTtcbiAgICBncm91cC5hZGQoYmFycmVsTCwgYmFycmVsUik7XG5cbiAgICBjb25zdCBzZW5zb3IgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMC4xMiwgMTQsIDE0KSwgYWNjZW50RW1pc3NpdmVNYXQpO1xuICAgIHNlbnNvci5wb3NpdGlvbi5zZXQoMC40NCwgMS4zMiwgMCk7XG4gICAgZ3JvdXAuYWRkKHNlbnNvcik7XG4gIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAncG9ydGFsJykge1xuICAgIGNvbnN0IHBsaW50aCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgyLjIsIDAuMjQsIDAuOSksIHByaW1hcnlNYXQpO1xuICAgIHBsaW50aC5wb3NpdGlvbi55ID0gMC4xMjtcbiAgICBwbGludGguY2FzdFNoYWRvdyA9ICFpc1NvZnR3YXJlR2w7XG4gICAgZ3JvdXAuYWRkKHBsaW50aCk7XG5cbiAgICBjb25zdCByaW5nID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLlRvcnVzR2VvbWV0cnkoMS4wNSwgMC4xNCwgMTYsIDM2KSwgcHJpbWFyeU1hdCk7XG4gICAgcmluZy5wb3NpdGlvbi55ID0gMS4yODtcbiAgICByaW5nLmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGdyb3VwLmFkZChyaW5nKTtcblxuICAgIGNvbnN0IGlubmVyUmluZyA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KDAuODgsIDAuMDUsIDEyLCAzMiksIGFjY2VudEVtaXNzaXZlTWF0KTtcbiAgICBpbm5lclJpbmcucG9zaXRpb24ueSA9IDEuMjg7XG4gICAgZ3JvdXAuYWRkKGlubmVyUmluZyk7XG5cbiAgICBjb25zdCBweWxvbkdlbyA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjE4LCAxLjQsIDAuMzIpO1xuICAgIGNvbnN0IHB5bG9uTCA9IG5ldyBUSFJFRS5NZXNoKHB5bG9uR2VvLCBzZWNvbmRhcnlNYXQpO1xuICAgIHB5bG9uTC5wb3NpdGlvbi5zZXQoLTEuMDUsIDAuODIsIDApO1xuICAgIGNvbnN0IHB5bG9uUiA9IG5ldyBUSFJFRS5NZXNoKHB5bG9uR2VvLCBzZWNvbmRhcnlNYXQpO1xuICAgIHB5bG9uUi5wb3NpdGlvbi5zZXQoMS4wNSwgMC44MiwgMCk7XG4gICAgZ3JvdXAuYWRkKHB5bG9uTCwgcHlsb25SKTtcbiAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdjcnlzdGFsJykge1xuICAgIGNvbnN0IGJhc2UgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjcsIDAuODIsIDAuMjQsIDYpLCBzZWNvbmRhcnlNYXQpO1xuICAgIGJhc2UucG9zaXRpb24ueSA9IDAuMTI7XG4gICAgZ3JvdXAuYWRkKGJhc2UpO1xuXG4gICAgY29uc3QgbWFpblNwaXJlID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkNvbmVHZW9tZXRyeSgwLjM4LCAxLjg1LCA2KSwgcHJpbWFyeU1hdCk7XG4gICAgbWFpblNwaXJlLnBvc2l0aW9uLnkgPSAxLjE0O1xuICAgIG1haW5TcGlyZS5jYXN0U2hhZG93ID0gIWlzU29mdHdhcmVHbDtcbiAgICBncm91cC5hZGQobWFpblNwaXJlKTtcblxuICAgIGNvbnN0IHNoYXJkTCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Db25lR2VvbWV0cnkoMC4yMiwgMS4xNSwgNSksIGFjY2VudEVtaXNzaXZlTWF0KTtcbiAgICBzaGFyZEwucG9zaXRpb24uc2V0KC0wLjM1LCAwLjY4LCAwLjE1KTtcbiAgICBzaGFyZEwucm90YXRpb24ueiA9IDAuMzI7XG4gICAgY29uc3Qgc2hhcmRSID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkNvbmVHZW9tZXRyeSgwLjIsIDAuOTUsIDUpLCBhY2NlbnRFbWlzc2l2ZU1hdCk7XG4gICAgc2hhcmRSLnBvc2l0aW9uLnNldCgwLjM2LCAwLjU4LCAtMC4xMik7XG4gICAgc2hhcmRSLnJvdGF0aW9uLnogPSAtMC4zNjtcbiAgICBncm91cC5hZGQoc2hhcmRMLCBzaGFyZFIpO1xuICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ2hhYml0YXQnKSB7XG4gICAgY29uc3QgZG9tZUJhc2UgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgxLjE1LCAxLjIyLCAwLjQ1LCAxNiksIHByaW1hcnlNYXQpO1xuICAgIGRvbWVCYXNlLnBvc2l0aW9uLnkgPSAwLjIyNTtcbiAgICBncm91cC5hZGQoZG9tZUJhc2UpO1xuXG4gICAgY29uc3QgZG9tZVJvb2YgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgxLjEyLCAyMCwgMTQsIDAsIE1hdGguUEkgKiAyLCAwLCBNYXRoLlBJIC8gMiksXG4gICAgICBzZWNvbmRhcnlNYXRcbiAgICApO1xuICAgIGRvbWVSb29mLnBvc2l0aW9uLnkgPSAwLjQ1O1xuICAgIGRvbWVSb29mLmNhc3RTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGdyb3VwLmFkZChkb21lUm9vZik7XG5cbiAgICBjb25zdCBhaXJsb2NrID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuNjUsIDAuNjIsIDAuNzUpLCBwcmltYXJ5TWF0KTtcbiAgICBhaXJsb2NrLnBvc2l0aW9uLnNldCgwLCAwLjMxLCAxLjE1KTtcbiAgICBncm91cC5hZGQoYWlybG9jayk7XG5cbiAgICBjb25zdCBkaXNoUG9sZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuMDUsIDAuMDUsIDAuNSwgOCksIHByaW1hcnlNYXQpO1xuICAgIGRpc2hQb2xlLnBvc2l0aW9uLnNldCgwLCAxLjcyLCAwKTtcbiAgICBjb25zdCBiZWFjb24gPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuT2N0YWhlZHJvbkdlb21ldHJ5KDAuMTYpLCBhY2NlbnRFbWlzc2l2ZU1hdCk7XG4gICAgYmVhY29uLnBvc2l0aW9uLnNldCgwLCAyLjAyLCAwKTtcbiAgICBncm91cC5hZGQoZGlzaFBvbGUsIGJlYWNvbik7XG4gIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnY3VzdG9tX29iaicgJiYgaXRlbS5jdXN0b21NZXNoPy52ZXJ0aWNlcz8ubGVuZ3RoKSB7XG4gICAgY29uc3QgcGVkZXN0YWwgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLjc1LCAwLjg1LCAwLjIsIDE2KSwgc2Vjb25kYXJ5TWF0KTtcbiAgICBwZWRlc3RhbC5wb3NpdGlvbi55ID0gMC4xO1xuICAgIGdyb3VwLmFkZChwZWRlc3RhbCk7XG5cbiAgICBjb25zdCBidWZmZXJHZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcbiAgICBjb25zdCB2ZXJ0cyA9IG5ldyBGbG9hdDMyQXJyYXkoaXRlbS5jdXN0b21NZXNoLnZlcnRpY2VzKTtcbiAgICBidWZmZXJHZW8uc2V0QXR0cmlidXRlKCdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUodmVydHMsIDMpKTtcbiAgICBidWZmZXJHZW8uY29tcHV0ZVZlcnRleE5vcm1hbHMoKTtcbiAgICBidWZmZXJHZW8uY29tcHV0ZUJvdW5kaW5nQm94KCk7XG5cbiAgICBjb25zdCBjdXN0b21NZXNoID0gbmV3IFRIUkVFLk1lc2goYnVmZmVyR2VvLCBwcmltYXJ5TWF0KTtcbiAgICBjb25zdCBiYm94ID0gYnVmZmVyR2VvLmJvdW5kaW5nQm94O1xuICAgIGlmIChiYm94KSB7XG4gICAgICBjb25zdCBtaW5ZID0gYmJveC5taW4ueTtcbiAgICAgIGN1c3RvbU1lc2gucG9zaXRpb24ueSA9IDAuMiAtIG1pblk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1c3RvbU1lc2gucG9zaXRpb24ueSA9IDAuODtcbiAgICB9XG4gICAgY3VzdG9tTWVzaC5jYXN0U2hhZG93ID0gIWlzU29mdHdhcmVHbDtcbiAgICBncm91cC5hZGQoY3VzdG9tTWVzaCk7XG5cbiAgICBjb25zdCBob2xvUmluZyA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KDAuNzgsIDAuMDMsIDEwLCAzMiksIGFjY2VudEVtaXNzaXZlTWF0KTtcbiAgICBob2xvUmluZy5yb3RhdGlvbi54ID0gTWF0aC5QSSAvIDI7XG4gICAgaG9sb1JpbmcucG9zaXRpb24ueSA9IDAuMjI7XG4gICAgZ3JvdXAuYWRkKGhvbG9SaW5nKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBzdGFuZCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAuNDUsIDAuNTUsIDAuMTQsIDE2KSwgc2Vjb25kYXJ5TWF0KTtcbiAgICBzdGFuZC5wb3NpdGlvbi55ID0gMC4wNztcbiAgICBncm91cC5hZGQoc3RhbmQpO1xuXG4gICAgY29uc3QgY29yZSA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgwLjQyLCAyMCwgMjApLCBwcmltYXJ5TWF0KTtcbiAgICBjb3JlLnBvc2l0aW9uLnkgPSAxLjA1O1xuICAgIGNvcmUuY2FzdFNoYWRvdyA9ICFpc1NvZnR3YXJlR2w7XG4gICAgZ3JvdXAuYWRkKGNvcmUpO1xuXG4gICAgY29uc3QgZXllUmluZyA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5Ub3J1c0dlb21ldHJ5KDAuNDYsIDAuMDUsIDEyLCAyOCksIGFjY2VudEVtaXNzaXZlTWF0KTtcbiAgICBleWVSaW5nLnBvc2l0aW9uLnkgPSAxLjA1O1xuICAgIGdyb3VwLmFkZChleWVSaW5nKTtcblxuICAgIGNvbnN0IHdpbmdMID0gbmV3IFRIUkVFLk1lc2gobmV3IFRIUkVFLkJveEdlb21ldHJ5KDAuNTUsIDAuMDgsIDAuMjQpLCBzZWNvbmRhcnlNYXQpO1xuICAgIHdpbmdMLnBvc2l0aW9uLnNldCgtMC41OCwgMS4xMiwgMCk7XG4gICAgY29uc3Qgd2luZ1IgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC41NSwgMC4wOCwgMC4yNCksIHNlY29uZGFyeU1hdCk7XG4gICAgd2luZ1IucG9zaXRpb24uc2V0KDAuNTgsIDEuMTIsIDApO1xuICAgIGdyb3VwLmFkZCh3aW5nTCwgd2luZ1IpO1xuICB9XG5cbiAgZ3JvdXAucG9zaXRpb24uc2V0KGl0ZW0ucG9zaXRpb25bMF0sIGl0ZW0ucG9zaXRpb25bMV0sIGl0ZW0ucG9zaXRpb25bMl0pO1xuICBncm91cC5yb3RhdGlvbi55ID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKGl0ZW0ucm90YXRpb25ZKTtcbiAgZ3JvdXAuc2NhbGUuc2V0U2NhbGFyKGl0ZW0uc2NhbGUpO1xuXG4gIHJldHVybiBncm91cDtcbn1cblxuLyoqXG4gKiBSZWFsLXRpbWUgLk9CSiAvIC5KU09OIHZlcnRleCBwYXJzZXIgZm9yIHVzZXItdXBsb2FkZWQgM0QgZmlsZXNcbiAqL1xuZnVuY3Rpb24gcGFyc2VPYmpPckpzb25GaWxlKGNvbnRlbnQ6IHN0cmluZywgZmlsZU5hbWU6IHN0cmluZyk6IHsgdmVydGljZXM6IG51bWJlcltdOyB0cmlhbmdsZXM6IG51bWJlciB9IHtcbiAgY29uc3QgbG93ZXIgPSBmaWxlTmFtZS50b0xvd2VyQ2FzZSgpO1xuICBpZiAobG93ZXIuZW5kc1dpdGgoJy5qc29uJykgfHwgbG93ZXIuZW5kc1dpdGgoJy5nbHRmJykpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcGFyc2VkID0gSlNPTi5wYXJzZShjb250ZW50KTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcnNlZC52ZXJ0aWNlcykgJiYgcGFyc2VkLnZlcnRpY2VzLmxlbmd0aCA+PSA5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmVydGljZXM6IHBhcnNlZC52ZXJ0aWNlcyxcbiAgICAgICAgICB0cmlhbmdsZXM6IE1hdGguZmxvb3IocGFyc2VkLnZlcnRpY2VzLmxlbmd0aCAvIDkpLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gRmFsbCB0aHJvdWdoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgcmF3VmVydHM6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXVtdID0gW107XG4gIGNvbnN0IG91dFRyaWFuZ2xlczogbnVtYmVyW10gPSBbXTtcbiAgY29uc3QgbGluZXMgPSBjb250ZW50LnNwbGl0KC9cXHI/XFxuLyk7XG5cbiAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgY29uc3QgdHJpbW1lZCA9IGxpbmUudHJpbSgpO1xuICAgIGlmICh0cmltbWVkLnN0YXJ0c1dpdGgoJ3YgJykpIHtcbiAgICAgIGNvbnN0IHBhcnRzID0gdHJpbW1lZC5zcGxpdCgvXFxzKy8pO1xuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgIHJhd1ZlcnRzLnB1c2goW3BhcnNlRmxvYXQocGFydHNbMV0pIHx8IDAsIHBhcnNlRmxvYXQocGFydHNbMl0pIHx8IDAsIHBhcnNlRmxvYXQocGFydHNbM10pIHx8IDBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aCgnZiAnKSkge1xuICAgICAgY29uc3QgcGFydHMgPSB0cmltbWVkLnNsaWNlKDIpLnRyaW0oKS5zcGxpdCgvXFxzKy8pO1xuICAgICAgY29uc3QgaW5kaWNlcyA9IHBhcnRzLm1hcCgocCkgPT4gcGFyc2VJbnQocC5zcGxpdCgnLycpWzBdLCAxMCkgLSAxKTtcbiAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgaW5kaWNlcy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgY29uc3QgdjAgPSByYXdWZXJ0c1tpbmRpY2VzWzBdXTtcbiAgICAgICAgY29uc3QgdjEgPSByYXdWZXJ0c1tpbmRpY2VzW2ldXTtcbiAgICAgICAgY29uc3QgdjIgPSByYXdWZXJ0c1tpbmRpY2VzW2kgKyAxXV07XG4gICAgICAgIGlmICh2MCAmJiB2MSAmJiB2Mikge1xuICAgICAgICAgIG91dFRyaWFuZ2xlcy5wdXNoKC4uLnYwLCAuLi52MSwgLi4udjIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKG91dFRyaWFuZ2xlcy5sZW5ndGggPj0gOSkge1xuICAgIHJldHVybiB7XG4gICAgICB2ZXJ0aWNlczogb3V0VHJpYW5nbGVzLFxuICAgICAgdHJpYW5nbGVzOiBNYXRoLmZsb29yKG91dFRyaWFuZ2xlcy5sZW5ndGggLyA5KSxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZmFsbGJhY2tHZW8gPSBuZXcgVEhSRUUuVG9ydXNLbm90R2VvbWV0cnkoMC41NSwgMC4xOCwgNjQsIDEyKTtcbiAgY29uc3QgcG9zQXR0ciA9IGZhbGxiYWNrR2VvLmdldEF0dHJpYnV0ZSgncG9zaXRpb24nKTtcbiAgY29uc3QgaW5kZXhBdHRyID0gZmFsbGJhY2tHZW8uZ2V0SW5kZXgoKTtcbiAgY29uc3QgdmVydHM6IG51bWJlcltdID0gW107XG4gIGlmIChpbmRleEF0dHIpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZGV4QXR0ci5jb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBpZHggPSBpbmRleEF0dHIuZ2V0WChpKTtcbiAgICAgIHZlcnRzLnB1c2gocG9zQXR0ci5nZXRYKGlkeCksIHBvc0F0dHIuZ2V0WShpZHgpICsgMC43NSwgcG9zQXR0ci5nZXRaKGlkeCkpO1xuICAgIH1cbiAgfVxuICBmYWxsYmFja0dlby5kaXNwb3NlKCk7XG4gIHJldHVybiB7XG4gICAgdmVydGljZXM6IHZlcnRzLFxuICAgIHRyaWFuZ2xlczogTWF0aC5mbG9vcih2ZXJ0cy5sZW5ndGggLyA5KSxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFZyVmlld3BvcnQzRDogUmVhY3QuRkM8VnJWaWV3cG9ydDNEUHJvcHM+ID0gKHtcbiAgbGFuZyxcbiAgb2JqZWN0cyxcbiAgc2V0T2JqZWN0cyxcbiAgc2VsZWN0ZWRPYmplY3RJZCxcbiAgc2V0U2VsZWN0ZWRPYmplY3RJZCxcbiAgbG9naWNOb2RlcyxcbiAgc2V0TG9naWNOb2RlcyxcbiAgbW9iaWxlQ29uZmlnLFxuICBzZXRNb2JpbGVDb25maWcsXG4gIG9uT3BlbkFpU3R1ZGlvRm9yU2VsZWN0ZWQsXG4gIG9uRXhwb3J0TW9iaWxlQnVuZGxlLFxuICBhY3RpdmVEb2NrVGFiLFxuICBzZXRBY3RpdmVEb2NrVGFiLFxuICBpc0xvZ2ljR3JhcGhTdWJWaWV3LFxuICBzZXRJc0xvZ2ljR3JhcGhTdWJWaWV3LFxuICBzaG93TGl2ZUNvYWNobWFya3MsXG4gIHNldFNob3dMaXZlQ29hY2htYXJrcyxcbiAgb25PcGVuVHV0b3JpYWxNb2RhbCxcbn0pID0+IHtcbiAgY29uc3QgY2FudmFzTW91bnRSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaW1hZ2VUZXh0dXJlSW5wdXRSZWYgPSB1c2VSZWY8SFRNTElucHV0RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IFtpc1BsYXlpbmcsIHNldElzUGxheWluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzdGVyZW9TcGxpdCwgc2V0U3RlcmVvU3BsaXRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcGxheVNjb3JlLCBzZXRQbGF5U2NvcmVdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtwbGF5RmVlZCwgc2V0UGxheUZlZWRdID0gdXNlU3RhdGU8c3RyaW5nPihcbiAgICBsYW5nID09PSAncGwnXG4gICAgICA/ICdXc2thesOzd2thOiBLbGlrbmlqIFwiPyBTYW1vdWN6ZWtcIiwgYWJ5IHpvYmFjennEhyBnZHppZSBkb2Rhd2HEhyBncmFmaWtpLCBtb2RlbGUgM0QgaSBqYWsgxYLEhWN6ecSHIHfEmXrFgnkgbG9naWtpISdcbiAgICAgIDogJ1RpcDogQ2xpY2sgXCI/IFR1dG9yaWFsXCIgdG8gc2VlIHdoZXJlIHRvIGFkZCBjdXN0b20gZ3JhcGhpY3MsIDNEIG1vZGVscywgYW5kIHdpcmUgbG9naWMgbm9kZXMhJ1xuICApO1xuICBjb25zdCBbZG9ja0NvbGxhcHNlZCwgc2V0RG9ja0NvbGxhcHNlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtneXJvQWN0aXZlLCBzZXRHeXJvQWN0aXZlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2ltYWdlVXBsb2FkVGFyZ2V0LCBzZXRJbWFnZVVwbG9hZFRhcmdldF0gPSB1c2VTdGF0ZTwnb2JqZWN0JyB8ICdza3lib3gnPignb2JqZWN0Jyk7XG5cbiAgLy8gTXV0YWJsZSByZWZzIGZvciBUaHJlZS5qcyBsb29wIGFjY2Vzc1xuICBjb25zdCBvYmplY3RzUmVmID0gdXNlUmVmKG9iamVjdHMpO1xuICBvYmplY3RzUmVmLmN1cnJlbnQgPSBvYmplY3RzO1xuICBjb25zdCBzZWxlY3RlZElkUmVmID0gdXNlUmVmKHNlbGVjdGVkT2JqZWN0SWQpO1xuICBzZWxlY3RlZElkUmVmLmN1cnJlbnQgPSBzZWxlY3RlZE9iamVjdElkO1xuICBjb25zdCBpc1BsYXlpbmdSZWYgPSB1c2VSZWYoaXNQbGF5aW5nKTtcbiAgaXNQbGF5aW5nUmVmLmN1cnJlbnQgPSBpc1BsYXlpbmc7XG4gIGNvbnN0IHN0ZXJlb1NwbGl0UmVmID0gdXNlUmVmKHN0ZXJlb1NwbGl0KTtcbiAgc3RlcmVvU3BsaXRSZWYuY3VycmVudCA9IHN0ZXJlb1NwbGl0O1xuICBjb25zdCBsb2dpY05vZGVzUmVmID0gdXNlUmVmKGxvZ2ljTm9kZXMpO1xuICBsb2dpY05vZGVzUmVmLmN1cnJlbnQgPSBsb2dpY05vZGVzO1xuICBjb25zdCBtb2JpbGVDb25maWdSZWYgPSB1c2VSZWYobW9iaWxlQ29uZmlnKTtcbiAgbW9iaWxlQ29uZmlnUmVmLmN1cnJlbnQgPSBtb2JpbGVDb25maWc7XG5cbiAgY29uc3Qgc2NlbmVSZWYgPSB1c2VSZWY8VEhSRUUuU2NlbmUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcmVuZGVyZXJSZWYgPSB1c2VSZWY8VEhSRUUuV2ViR0xSZW5kZXJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjYW1lcmFSZWYgPSB1c2VSZWY8VEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY29udHJvbHNSZWYgPSB1c2VSZWY8T3JiaXRDb250cm9scyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhY3Rvckdyb3VwTWFwUmVmID0gdXNlUmVmPE1hcDxzdHJpbmcsIFRIUkVFLkdyb3VwPj4obmV3IE1hcCgpKTtcbiAgY29uc3QgaXNTb2Z0d2FyZUdsUmVmID0gdXNlUmVmPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3Qga2V5c1ByZXNzZWRSZWYgPSB1c2VSZWY8UmVjb3JkPHN0cmluZywgYm9vbGVhbj4+KHt9KTtcbiAgY29uc3QgdmlydHVhbFN0aWNrUmVmID0gdXNlUmVmPHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfT4oeyB4OiAwLCB5OiAwIH0pO1xuICBjb25zdCBjYW1lcmFQcmVzZXRUYXJnZXRSZWYgPSB1c2VSZWY8VEhSRUUuVmVjdG9yMyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHNlbGVjdGVkT2JqZWN0ID0gb2JqZWN0cy5maW5kKChvKSA9PiBvLmlkID09PSBzZWxlY3RlZE9iamVjdElkKSB8fCBudWxsO1xuXG4gIC8vIEV4ZWN1dGUgYSBMb2dpY05vZGUgYW5kIHJlY3Vyc2l2ZWx5IGNhc2NhZGUgYWxvbmcgYWxsIGRvd25zdHJlYW0gZGVwZW5kZW5jeSB3aXJlcyFcbiAgY29uc3QgZXhlY3V0ZU5vZGVBbmRDYXNjYWRlID0gKHJvb3ROb2RlSWQ6IHN0cmluZywgaGl0T2JqZWN0SWQ/OiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB2aXNpdGVkID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgY29uc3QgY3VycmVudE5vZGVzID0gbG9naWNOb2Rlc1JlZi5jdXJyZW50O1xuXG4gICAgY29uc3QgcnVuU3RlcCA9IChub2RlSWQ6IHN0cmluZywgZGVsYXlNczogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAodmlzaXRlZC5oYXMobm9kZUlkKSkgcmV0dXJuO1xuICAgICAgdmlzaXRlZC5hZGQobm9kZUlkKTtcblxuICAgICAgY29uc3QgcnVsZSA9IGN1cnJlbnROb2Rlcy5maW5kKChuKSA9PiBuLmlkID09PSBub2RlSWQgJiYgbi5lbmFibGVkKTtcbiAgICAgIGlmICghcnVsZSkgcmV0dXJuO1xuXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIC8vIEhpZ2hsaWdodCBub2RlIGluIHRoZSB2aXN1YWwgZ3JhcGhcbiAgICAgICAgc2V0TG9naWNOb2RlcygocHJldikgPT5cbiAgICAgICAgICBwcmV2Lm1hcCgobikgPT4gKG4uaWQgPT09IHJ1bGUuaWQgPyB7IC4uLm4sIGxhc3RUcmlnZ2VyZWRBdDogRGF0ZS5ub3coKSB9IDogbikpXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0T2JqSWQgPVxuICAgICAgICAgIHJ1bGUudGFyZ2V0T2JqZWN0SWQgIT09ICdBTEwnID8gcnVsZS50YXJnZXRPYmplY3RJZCA6IGhpdE9iamVjdElkIHx8IHNlbGVjdGVkSWRSZWYuY3VycmVudDtcblxuICAgICAgICBpZiAocnVsZS5hY3Rpb24gPT09ICdBd2FyZFBvaW50czEwMCcpIHtcbiAgICAgICAgICBzZXRQbGF5U2NvcmUoKHMpID0+IHMgKyAxMDApO1xuICAgICAgICAgIHBsYXlQcm9jZWR1cmFsU2Z4KCdzY29yZScpO1xuICAgICAgICAgIHNldFBsYXlGZWVkKFxuICAgICAgICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICA/IGArMTAwIFBLVCEgV3l6d29sb25vIHfEmXplxYI6ICR7cnVsZS5uYW1lfWBcbiAgICAgICAgICAgICAgOiBgKzEwMCBQVFMhIFRyaWdnZXJlZCBub2RlOiAke3J1bGUubmFtZX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChydWxlLmFjdGlvbiA9PT0gJ1RlbGVwb3J0VG9DZW50ZXInKSB7XG4gICAgICAgICAgaWYgKGNhbWVyYVJlZi5jdXJyZW50ICYmIGNvbnRyb2xzUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIGNhbWVyYVJlZi5jdXJyZW50LnBvc2l0aW9uLnNldCgwLCAzLjIsIDUuNSk7XG4gICAgICAgICAgICBjb250cm9sc1JlZi5jdXJyZW50LnRhcmdldC5zZXQoMCwgMSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHBsYXlQcm9jZWR1cmFsU2Z4KCd0ZWxlcG9ydCcpO1xuICAgICAgICAgIHNldFBsYXlGZWVkKFxuICAgICAgICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICA/IGBUZWxlcG9ydGFjamEgZ3JhY3phICgke3J1bGUubmFtZX0pYFxuICAgICAgICAgICAgICA6IGBQbGF5ZXIgdGVsZXBvcnRlZCAoJHtydWxlLm5hbWV9KWBcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHJ1bGUuYWN0aW9uID09PSAnVG9nZ2xlVHVyYm9TcGluJyAmJiB0YXJnZXRPYmpJZCkge1xuICAgICAgICAgIHNldE9iamVjdHMoKHByZXYpID0+XG4gICAgICAgICAgICBwcmV2Lm1hcCgobykgPT5cbiAgICAgICAgICAgICAgby5pZCA9PT0gdGFyZ2V0T2JqSWRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ubyxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uby5hbmltYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgdHJhamVjdG9yeVR5cGU6IG8uYW5pbWF0aW9uLnRyYWplY3RvcnlUeXBlID09PSAnc3BpbicgPyAnaG92ZXInIDogJ3NwaW4nLFxuICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiAyLjYsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBvXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwbGF5UHJvY2VkdXJhbFNmeCgncGxhY2UnKTtcbiAgICAgICAgICBzZXRQbGF5RmVlZChcbiAgICAgICAgICAgIGxhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgPyBgS2Fza2FkYTogUHJ6ZcWCxIVjem9ubyBvYnLDs3Qgb2JpZWt0dSAoJHtydWxlLm5hbWV9KWBcbiAgICAgICAgICAgICAgOiBgQ2FzY2FkZTogVG9nZ2xlZCB0dXJibyBzcGluICgke3J1bGUubmFtZX0pYFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAocnVsZS5hY3Rpb24gPT09ICdQdWxzZUVtaXNzaXZlJyAmJiB0YXJnZXRPYmpJZCkge1xuICAgICAgICAgIHNldE9iamVjdHMoKHByZXYpID0+XG4gICAgICAgICAgICBwcmV2Lm1hcCgobykgPT5cbiAgICAgICAgICAgICAgby5pZCA9PT0gdGFyZ2V0T2JqSWRcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgLi4ubyxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uby5hbmltYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgdHJhamVjdG9yeVR5cGU6ICdwdWxzZScsXG4gICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IDIuMixcbiAgICAgICAgICAgICAgICAgICAgICBhbXBsaXR1ZGU6IDAuNjUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBvXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwbGF5UHJvY2VkdXJhbFNmeCgnc2NvcmUnKTtcbiAgICAgICAgICBzZXRQbGF5RmVlZChcbiAgICAgICAgICAgIGxhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgPyBgS2Fza2FkYTogUHVsc293YW5pZSByZXpvbmFuc293ZSAoJHtydWxlLm5hbWV9KWBcbiAgICAgICAgICAgICAgOiBgQ2FzY2FkZTogRW1pc3NpdmUgcmVzb25hbmNlIHB1bHNlICgke3J1bGUubmFtZX0pYFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0UGxheVNjb3JlKChzKSA9PiBzICsgNTApO1xuICAgICAgICAgIHBsYXlQcm9jZWR1cmFsU2Z4KCdzY29yZScpO1xuICAgICAgICAgIHNldFBsYXlGZWVkKFxuICAgICAgICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICA/IGBXeWtvbmFubyB3xJl6ZcWCIGxvZ2lraTogJHtydWxlLm5hbWV9YFxuICAgICAgICAgICAgICA6IGBFeGVjdXRlZCBsb2dpYyBub2RlOiAke3J1bGUubmFtZX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSwgZGVsYXlNcyk7XG5cbiAgICAgIC8vIEZpbmQgYWxsIGRvd25zdHJlYW0gbm9kZXMgdGhhdCBkZXBlbmQgb24gdGhpcyBub2RlSWQgYW5kIHRyaWdnZXIgdGhlbSBpbiBjYXNjYWRlXG4gICAgICBjb25zdCBkb3duc3RyZWFtTm9kZXMgPSBjdXJyZW50Tm9kZXMuZmlsdGVyKFxuICAgICAgICAobikgPT4gbi5lbmFibGVkICYmIChuLmRlcGVuZHNPbklkcyB8fCBbXSkuaW5jbHVkZXMobm9kZUlkKVxuICAgICAgKTtcbiAgICAgIGRvd25zdHJlYW1Ob2Rlcy5mb3JFYWNoKChjaGlsZCwgaWR4KSA9PiB7XG4gICAgICAgIHJ1blN0ZXAoY2hpbGQuaWQsIGRlbGF5TXMgKyA0MjAgKiAoaWR4ICsgMSkpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJ1blN0ZXAocm9vdE5vZGVJZCwgMCk7XG4gIH07XG5cbiAgLy8gS2V5Ym9hcmQgc2hvcnRjdXQgJ0gnIHRvIGNvbGxhcHNlL2V4cGFuZCBib3R0b20gSFVEIGRvY2tcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvbktleURvd24gPSAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50Py50YWdOYW1lID09PSAnSU5QVVQnIHx8XG4gICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LnRhZ05hbWUgPT09ICdURVhUQVJFQScgfHxcbiAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudD8udGFnTmFtZSA9PT0gJ1NFTEVDVCdcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBrZXlzUHJlc3NlZFJlZi5jdXJyZW50W2UuY29kZV0gPSB0cnVlO1xuICAgICAgaWYgKGUua2V5ID09PSAnaCcgfHwgZS5rZXkgPT09ICdIJykge1xuICAgICAgICBzZXREb2NrQ29sbGFwc2VkKChwcmV2KSA9PiAhcHJldik7XG4gICAgICB9XG4gICAgfTtcbiAgICBjb25zdCBvbktleVVwID0gKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgIGtleXNQcmVzc2VkUmVmLmN1cnJlbnRbZS5jb2RlXSA9IGZhbHNlO1xuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIG9uS2V5VXApO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93bik7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBvbktleVVwKTtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgLy8gRGV2aWNlT3JpZW50YXRpb24gR3lyb3Njb3BlIGhhbmRsZXIgZm9yIFN0YW5kYWxvbmUgTW9iaWxlL1RhYmxldCBwbGF5XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFneXJvQWN0aXZlKSByZXR1cm47XG4gICAgY29uc3QgaGFuZGxlT3JpZW50YXRpb24gPSAoZTogRGV2aWNlT3JpZW50YXRpb25FdmVudCkgPT4ge1xuICAgICAgaWYgKCFjYW1lcmFSZWYuY3VycmVudCB8fCAhaXNQbGF5aW5nUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGNvbnN0IGFscGhhID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKGUuYWxwaGEgfHwgMCk7XG4gICAgICBjb25zdCBiZXRhID0gVEhSRUUuTWF0aFV0aWxzLmRlZ1RvUmFkKE1hdGgubWF4KC02MCwgTWF0aC5taW4oNjAsIChlLmJldGEgfHwgNDUpIC0gNDUpKSk7XG4gICAgICBjb25zdCBzZW5zID0gbW9iaWxlQ29uZmlnUmVmLmN1cnJlbnQuZ3lyb1NlbnNpdGl2aXR5IHx8IDEuMDtcbiAgICAgIGNhbWVyYVJlZi5jdXJyZW50LnJvdGF0aW9uLm9yZGVyID0gJ1lYWic7XG4gICAgICBjYW1lcmFSZWYuY3VycmVudC5yb3RhdGlvbi55ID0gYWxwaGEgKiBzZW5zICogMC41O1xuICAgICAgY2FtZXJhUmVmLmN1cnJlbnQucm90YXRpb24ueCA9IGJldGEgKiBzZW5zICogMC41O1xuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZW9yaWVudGF0aW9uJywgaGFuZGxlT3JpZW50YXRpb24pO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZGV2aWNlb3JpZW50YXRpb24nLCBoYW5kbGVPcmllbnRhdGlvbik7XG4gIH0sIFtneXJvQWN0aXZlXSk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBUaHJlZS5qcyBXZWJHTFJlbmRlcmVyICYgU3R1ZGlvIFNjZW5lIG9uY2VcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBtb3VudCA9IGNhbnZhc01vdW50UmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFtb3VudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgaXNTb2Z0d2FyZUdsID0gKCgpID0+IHtcbiAgICAgIGNvbnN0IGdsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dCgnd2ViZ2wyJyk7XG4gICAgICBpZiAoIWdsKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGNvbnN0IGV4dCA9IGdsLmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpO1xuICAgICAgY29uc3QgcGFyYW0gPSBleHQgPyBleHQuVU5NQVNLRURfUkVOREVSRVJfV0VCR0wgOiBnbC5SRU5ERVJFUjtcbiAgICAgIGNvbnN0IGdwdSA9IFN0cmluZyhnbC5nZXRQYXJhbWV0ZXIocGFyYW0pKTtcbiAgICAgIGdsLmdldEV4dGVuc2lvbignV0VCR0xfbG9zZV9jb250ZXh0Jyk/Lmxvc2VDb250ZXh0KCk7XG4gICAgICByZXR1cm4gL1N3aWZ0U2hhZGVyfGxsdm1waXBlfHNvZnRwaXBlfFNvZnR3YXJlfEJhc2ljIFJlbmRlci9pLnRlc3QoZ3B1KTtcbiAgICB9KSgpO1xuICAgIGlzU29mdHdhcmVHbFJlZi5jdXJyZW50ID0gaXNTb2Z0d2FyZUdsO1xuXG4gICAgY29uc3Qgd2lkdGggPSBtb3VudC5jbGllbnRXaWR0aCB8fCAxMDI0O1xuICAgIGNvbnN0IGhlaWdodCA9IG1vdW50LmNsaWVudEhlaWdodCB8fCA2MjA7XG5cbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKHtcbiAgICAgIGFudGlhbGlhczogIWlzU29mdHdhcmVHbCxcbiAgICAgIHBvd2VyUHJlZmVyZW5jZTogJ2hpZ2gtcGVyZm9ybWFuY2UnLFxuICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0cnVlLFxuICAgIH0pO1xuICAgIHJlbmRlcmVyLm91dHB1dENvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgICByZW5kZXJlci50b25lTWFwcGluZyA9IFRIUkVFLkFDRVNGaWxtaWNUb25lTWFwcGluZztcbiAgICByZW5kZXJlci50b25lTWFwcGluZ0V4cG9zdXJlID0gMS4xMjtcbiAgICByZW5kZXJlci5zZXRQaXhlbFJhdGlvKGlzU29mdHdhcmVHbCA/IDEgOiBNYXRoLm1pbih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgMikpO1xuICAgIHJlbmRlcmVyLnNldFNpemUod2lkdGgsIGhlaWdodCk7XG4gICAgcmVuZGVyZXIuc2hhZG93TWFwLmVuYWJsZWQgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIHJlbmRlcmVyLnNoYWRvd01hcC50eXBlID0gVEhSRUUuUENGU29mdFNoYWRvd01hcDtcbiAgICByZW5kZXJlclJlZi5jdXJyZW50ID0gcmVuZGVyZXI7XG5cbiAgICBtb3VudC5pbm5lckhUTUwgPSAnJztcbiAgICBtb3VudC5hcHBlbmRDaGlsZChyZW5kZXJlci5kb21FbGVtZW50KTtcblxuICAgIGNvbnN0IHNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgY29uc3QgYmdIZXggPSAweDA5MGQxNjtcbiAgICBzY2VuZS5iYWNrZ3JvdW5kID0gbmV3IFRIUkVFLkNvbG9yKGJnSGV4KTtcbiAgICBzY2VuZS5mb2cgPSBuZXcgVEhSRUUuRm9nRXhwMihiZ0hleCwgMC4wMjIpO1xuICAgIHNjZW5lUmVmLmN1cnJlbnQgPSBzY2VuZTtcblxuICAgIGNvbnN0IHBtcmVtR2VuZXJhdG9yID0gbmV3IFRIUkVFLlBNUkVNR2VuZXJhdG9yKHJlbmRlcmVyKTtcbiAgICBzY2VuZS5lbnZpcm9ubWVudCA9IHBtcmVtR2VuZXJhdG9yLmZyb21TY2VuZShuZXcgUm9vbUVudmlyb25tZW50KCksIDAuMDQpLnRleHR1cmU7XG4gICAgcG1yZW1HZW5lcmF0b3IuZGlzcG9zZSgpO1xuXG4gICAgY29uc3QgY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKDYwLCB3aWR0aCAvIGhlaWdodCwgMC4xLCAxNjApO1xuICAgIGNhbWVyYS5wb3NpdGlvbi5zZXQoOC41LCA2LjIsIDEwLjUpO1xuICAgIGNhbWVyYVJlZi5jdXJyZW50ID0gY2FtZXJhO1xuXG4gICAgY29uc3QgY29udHJvbHMgPSBuZXcgT3JiaXRDb250cm9scyhjYW1lcmEsIHJlbmRlcmVyLmRvbUVsZW1lbnQpO1xuICAgIGNvbnRyb2xzLmVuYWJsZURhbXBpbmcgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIGNvbnRyb2xzLmRhbXBpbmdGYWN0b3IgPSAwLjA2O1xuICAgIGNvbnRyb2xzLm1heFBvbGFyQW5nbGUgPSBNYXRoLlBJIC8gMiAtIDAuMDM7XG4gICAgY29udHJvbHMubWluRGlzdGFuY2UgPSAyLjU7XG4gICAgY29udHJvbHMubWF4RGlzdGFuY2UgPSA0MjtcbiAgICBjb250cm9scy50YXJnZXQuc2V0KDAsIDAuOCwgMCk7XG4gICAgY29udHJvbHMudXBkYXRlKCk7XG4gICAgY29udHJvbHNSZWYuY3VycmVudCA9IGNvbnRyb2xzO1xuXG4gICAgY29udHJvbHMuYWRkRXZlbnRMaXN0ZW5lcignc3RhcnQnLCAoKSA9PiB7XG4gICAgICBjYW1lcmFQcmVzZXRUYXJnZXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfSk7XG5cbiAgICBjb25zdCBoZW1pTGlnaHQgPSBuZXcgVEhSRUUuSGVtaXNwaGVyZUxpZ2h0KDB4MzhiZGY4LCAweDBmMTcyYSwgMC42NSk7XG4gICAgc2NlbmUuYWRkKGhlbWlMaWdodCk7XG5cbiAgICBjb25zdCBrZXlMaWdodCA9IG5ldyBUSFJFRS5EaXJlY3Rpb25hbExpZ2h0KDB4ZmZmYmViLCAxLjkpO1xuICAgIGtleUxpZ2h0LnBvc2l0aW9uLnNldCgxMiwgMTgsIDEwKTtcbiAgICBrZXlMaWdodC5jYXN0U2hhZG93ID0gIWlzU29mdHdhcmVHbDtcbiAgICBrZXlMaWdodC5zaGFkb3cuY2FtZXJhLmxlZnQgPSAtMTY7XG4gICAga2V5TGlnaHQuc2hhZG93LmNhbWVyYS5yaWdodCA9IDE2O1xuICAgIGtleUxpZ2h0LnNoYWRvdy5jYW1lcmEudG9wID0gMTY7XG4gICAga2V5TGlnaHQuc2hhZG93LmNhbWVyYS5ib3R0b20gPSAtMTY7XG4gICAga2V5TGlnaHQuc2hhZG93LmJpYXMgPSAtMC4wMDA1O1xuICAgIGtleUxpZ2h0LnNoYWRvdy5ub3JtYWxCaWFzID0gMC4wMjtcbiAgICBrZXlMaWdodC5zaGFkb3cubWFwU2l6ZS53aWR0aCA9IDEwMjQ7XG4gICAga2V5TGlnaHQuc2hhZG93Lm1hcFNpemUuaGVpZ2h0ID0gMTAyNDtcbiAgICBzY2VuZS5hZGQoa2V5TGlnaHQpO1xuXG4gICAgY29uc3QgcmltTGlnaHQgPSBuZXcgVEhSRUUuRGlyZWN0aW9uYWxMaWdodCgweDM4YmRmOCwgMC44NSk7XG4gICAgcmltTGlnaHQucG9zaXRpb24uc2V0KC0xNCwgOSwgLTEyKTtcbiAgICBzY2VuZS5hZGQocmltTGlnaHQpO1xuXG4gICAgY29uc3QgZmxvb3JHZW8gPSBuZXcgVEhSRUUuQ2lyY2xlR2VvbWV0cnkoMzYsIDY0KTtcbiAgICBmbG9vckdlby5yb3RhdGVYKC1NYXRoLlBJIC8gMik7XG4gICAgY29uc3QgZmxvb3JNYXQgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoe1xuICAgICAgY29sb3I6IDB4MGYxNzJhLFxuICAgICAgcm91Z2huZXNzOiAwLjgyLFxuICAgICAgbWV0YWxuZXNzOiAwLjE4LFxuICAgIH0pO1xuICAgIGNvbnN0IGZsb29yTWVzaCA9IG5ldyBUSFJFRS5NZXNoKGZsb29yR2VvLCBmbG9vck1hdCk7XG4gICAgZmxvb3JNZXNoLnJlY2VpdmVTaGFkb3cgPSAhaXNTb2Z0d2FyZUdsO1xuICAgIHNjZW5lLmFkZChmbG9vck1lc2gpO1xuXG4gICAgY29uc3QgZ3JpZEhlbHBlciA9IG5ldyBUSFJFRS5HcmlkSGVscGVyKDMyLCAzMiwgMHhmNTllMGIsIDB4MWUyOTNiKTtcbiAgICBncmlkSGVscGVyLnBvc2l0aW9uLnkgPSAwLjAyO1xuICAgIHNjZW5lLmFkZChncmlkSGVscGVyKTtcblxuICAgIGNvbnN0IHBpbGxhckNvdW50ID0gMjg7XG4gICAgY29uc3QgcGlsbGFyR2VvID0gbmV3IFRIUkVFLkNvbmVHZW9tZXRyeSgwLjY1LCAyLjIsIDYpO1xuICAgIGNvbnN0IHBpbGxhck1hdCA9IG5ldyBUSFJFRS5NZXNoU3RhbmRhcmRNYXRlcmlhbCh7XG4gICAgICBjb2xvcjogMHgxZTI5M2IsXG4gICAgICByb3VnaG5lc3M6IDAuNjUsXG4gICAgICBtZXRhbG5lc3M6IDAuMzUsXG4gICAgfSk7XG4gICAgY29uc3QgaW5zdGFuY2VkUGlsbGFycyA9IG5ldyBUSFJFRS5JbnN0YW5jZWRNZXNoKHBpbGxhckdlbywgcGlsbGFyTWF0LCBwaWxsYXJDb3VudCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaWxsYXJDb3VudDsgaSsrKSB7XG4gICAgICBjb25zdCBhbmdsZSA9IChpIC8gcGlsbGFyQ291bnQpICogTWF0aC5QSSAqIDI7XG4gICAgICBjb25zdCByYWQgPSAxNy41ICsgKGkgJSAzKSAqIDAuODtcbiAgICAgIGNvbnN0IHNjYWxlWSA9IDAuNzUgKyAoKGkgKiA3KSAlIDUpICogMC4xODtcbiAgICAgIF9kdW1teU9iai5wb3NpdGlvbi5zZXQoTWF0aC5jb3MoYW5nbGUpICogcmFkLCAxLjEgKiBzY2FsZVksIE1hdGguc2luKGFuZ2xlKSAqIHJhZCk7XG4gICAgICBfZHVtbXlPYmoucm90YXRpb24uc2V0KDAsIGFuZ2xlLCAwKTtcbiAgICAgIF9kdW1teU9iai5zY2FsZS5zZXQoMSArIChpICUgMikgKiAwLjE1LCBzY2FsZVksIDEpO1xuICAgICAgX2R1bW15T2JqLnVwZGF0ZU1hdHJpeCgpO1xuICAgICAgaW5zdGFuY2VkUGlsbGFycy5zZXRNYXRyaXhBdChpLCBfZHVtbXlPYmoubWF0cml4KTtcbiAgICAgIF9pbnN0Q29sb3Iuc2V0SFNMKDAuNTggKyAoaSAlIDQpICogMC4wMiwgMC4zMiwgMC4xNiArIChpICUgMykgKiAwLjA0KTtcbiAgICAgIGluc3RhbmNlZFBpbGxhcnMuc2V0Q29sb3JBdChpLCBfaW5zdENvbG9yKTtcbiAgICB9XG4gICAgaW5zdGFuY2VkUGlsbGFycy5pbnN0YW5jZU1hdHJpeC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgaWYgKGluc3RhbmNlZFBpbGxhcnMuaW5zdGFuY2VDb2xvcikgaW5zdGFuY2VkUGlsbGFycy5pbnN0YW5jZUNvbG9yLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgICBpbnN0YW5jZWRQaWxsYXJzLmNvbXB1dGVCb3VuZGluZ1NwaGVyZSgpO1xuICAgIHNjZW5lLmFkZChpbnN0YW5jZWRQaWxsYXJzKTtcblxuICAgIGNvbnN0IHNlbFJpbmdHZW8gPSBuZXcgVEhSRUUuUmluZ0dlb21ldHJ5KDAuOTUsIDEuMTIsIDM2KTtcbiAgICBzZWxSaW5nR2VvLnJvdGF0ZVgoLU1hdGguUEkgLyAyKTtcbiAgICBjb25zdCBzZWxSaW5nTWF0ID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHtcbiAgICAgIGNvbG9yOiAweGY1OWUwYixcbiAgICAgIHNpZGU6IFRIUkVFLkRvdWJsZVNpZGUsXG4gICAgICBwb2x5Z29uT2Zmc2V0OiB0cnVlLFxuICAgICAgcG9seWdvbk9mZnNldEZhY3RvcjogLTEsXG4gICAgICBwb2x5Z29uT2Zmc2V0VW5pdHM6IC0xLFxuICAgIH0pO1xuICAgIGNvbnN0IHNlbGVjdGlvblJpbmcgPSBuZXcgVEhSRUUuTWVzaChzZWxSaW5nR2VvLCBzZWxSaW5nTWF0KTtcbiAgICBzZWxlY3Rpb25SaW5nLnBvc2l0aW9uLnkgPSAwLjAyNTtcbiAgICBzZWxlY3Rpb25SaW5nLnZpc2libGUgPSBmYWxzZTtcbiAgICBzY2VuZS5hZGQoc2VsZWN0aW9uUmluZyk7XG5cbiAgICBpZiAoIWlzU29mdHdhcmVHbCkge1xuICAgICAgcmVuZGVyZXIuY29tcGlsZShzY2VuZSwgY2FtZXJhKTtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChldmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gcmVuZGVyZXIuZG9tRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIF9tb3VzZS54ID0gKChldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGgpICogMiAtIDE7XG4gICAgICBfbW91c2UueSA9IC0oKGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcCkgLyByZWN0LmhlaWdodCkgKiAyICsgMTtcbiAgICAgIF9yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYShfbW91c2UsIGNhbWVyYSk7XG5cbiAgICAgIGNvbnN0IGdyb3VwcyA9IEFycmF5LmZyb20oYWN0b3JHcm91cE1hcFJlZi5jdXJyZW50LnZhbHVlcygpKTtcbiAgICAgIGNvbnN0IGludGVyc2VjdHMgPSBfcmF5Y2FzdGVyLmludGVyc2VjdE9iamVjdHMoZ3JvdXBzLCB0cnVlKTtcblxuICAgICAgaWYgKGludGVyc2VjdHMubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgY3VycjogVEhSRUUuT2JqZWN0M0QgfCBudWxsID0gaW50ZXJzZWN0c1swXS5vYmplY3Q7XG4gICAgICAgIHdoaWxlIChjdXJyICYmICFjdXJyLnVzZXJEYXRhPy5zY2VuZU9iamVjdElkKSB7XG4gICAgICAgICAgY3VyciA9IGN1cnIucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhpdElkID0gY3Vycj8udXNlckRhdGE/LnNjZW5lT2JqZWN0SWQ7XG4gICAgICAgIGlmIChoaXRJZCkge1xuICAgICAgICAgIHNldFNlbGVjdGVkT2JqZWN0SWQoaGl0SWQpO1xuICAgICAgICAgIHBsYXlQcm9jZWR1cmFsU2Z4KCdjbGljaycpO1xuXG4gICAgICAgICAgaWYgKGlzUGxheWluZ1JlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICBjb25zdCBtYXRjaGluZ1Jvb3RSdWxlcyA9IGxvZ2ljTm9kZXNSZWYuY3VycmVudC5maWx0ZXIoXG4gICAgICAgICAgICAgIChsbikgPT5cbiAgICAgICAgICAgICAgICBsbi5lbmFibGVkICYmXG4gICAgICAgICAgICAgICAgKGxuLnRhcmdldE9iamVjdElkID09PSBoaXRJZCB8fCBsbi50YXJnZXRPYmplY3RJZCA9PT0gJ0FMTCcpICYmXG4gICAgICAgICAgICAgICAgKGxuLmV2ZW50ID09PSAnT25HcmFiQ2xpY2snIHx8IGxuLmV2ZW50ID09PSAnT25HYXplJylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYXRjaGluZ1Jvb3RSdWxlcy5mb3JFYWNoKChydWxlKSA9PiB7XG4gICAgICAgICAgICAgIGV4ZWN1dGVOb2RlQW5kQ2FzY2FkZShydWxlLmlkLCBoaXRJZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyZXIuZG9tRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZG93bicsIGhhbmRsZVBvaW50ZXJEb3duKTtcblxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIGlmICghbW91bnQpIHJldHVybjtcbiAgICAgIGNvbnN0IHcgPSBtb3VudC5jbGllbnRXaWR0aCB8fCAxMDI0O1xuICAgICAgY29uc3QgaCA9IG1vdW50LmNsaWVudEhlaWdodCB8fCA2MjA7XG4gICAgICBjYW1lcmEuYXNwZWN0ID0gdyAvIGg7XG4gICAgICBjYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgcmVuZGVyZXIuc2V0U2l6ZSh3LCBoKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgbGV0IGZyYW1lSWQgPSAwO1xuICAgIGNvbnN0IGNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG5cbiAgICBmdW5jdGlvbiBhZnRlckRyYXcoY2I6ICgpID0+IHZvaWQpIHtcbiAgICAgIGNvbnN0IGdsID0gcmVuZGVyZXIuZ2V0Q29udGV4dCgpIGFzIFdlYkdMMlJlbmRlcmluZ0NvbnRleHQ7XG4gICAgICBjb25zdCBzeW5jID0gZ2wuZmVuY2VTeW5jID8gZ2wuZmVuY2VTeW5jKGdsLlNZTkNfR1BVX0NPTU1BTkRTX0NPTVBMRVRFLCAwKSA6IG51bGw7XG4gICAgICBnbC5mbHVzaCgpO1xuICAgICAgY29uc3QgcG9sbCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBzeW5jICYmIGdsLmdldFN5bmNQYXJhbWV0ZXIoc3luYywgZ2wuU1lOQ19TVEFUVVMpO1xuICAgICAgICBpZiAoc3RhdGUgPT09IGdsLlVOU0lHTkFMRUQpIHtcbiAgICAgICAgICBmcmFtZUlkID0gd2luZG93LnNldFRpbWVvdXQocG9sbCwgNSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHN5bmMpIGdsLmRlbGV0ZVN5bmMoc3luYyk7XG4gICAgICAgICAgZnJhbWVJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGNiLCA4MCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBmcmFtZUlkID0gd2luZG93LnNldFRpbWVvdXQocG9sbCwgNSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGljaygpIHtcbiAgICAgIGNvbnN0IGRlbHRhID0gTWF0aC5taW4oY2xvY2suZ2V0RGVsdGEoKSwgMC4xKTtcbiAgICAgIGNvbnN0IGVsYXBzZWQgPSBjbG9jay5nZXRFbGFwc2VkVGltZSgpO1xuXG4gICAgICBpZiAoY2FtZXJhUHJlc2V0VGFyZ2V0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLmxlcnAoY2FtZXJhUHJlc2V0VGFyZ2V0UmVmLmN1cnJlbnQsIDEgLSBNYXRoLmV4cCgtNiAqIGRlbHRhKSk7XG4gICAgICAgIGlmIChjYW1lcmEucG9zaXRpb24uZGlzdGFuY2VUbyhjYW1lcmFQcmVzZXRUYXJnZXRSZWYuY3VycmVudCkgPCAwLjA4KSB7XG4gICAgICAgICAgY2FtZXJhUHJlc2V0VGFyZ2V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1BsYXlpbmdSZWYuY3VycmVudCkge1xuICAgICAgICBjb25zdCBzcGVlZCA9IDYuNSAqIGRlbHRhO1xuICAgICAgICBjb25zdCBmb3J3YXJkID1cbiAgICAgICAgICAoa2V5c1ByZXNzZWRSZWYuY3VycmVudFsnS2V5VyddIHx8IGtleXNQcmVzc2VkUmVmLmN1cnJlbnRbJ0Fycm93VXAnXSA/IDEgOiAwKSAtXG4gICAgICAgICAgKGtleXNQcmVzc2VkUmVmLmN1cnJlbnRbJ0tleVMnXSB8fCBrZXlzUHJlc3NlZFJlZi5jdXJyZW50WydBcnJvd0Rvd24nXSA/IDEgOiAwKSAtXG4gICAgICAgICAgdmlydHVhbFN0aWNrUmVmLmN1cnJlbnQueTtcbiAgICAgICAgY29uc3Qgc3RyYWZlID1cbiAgICAgICAgICAoa2V5c1ByZXNzZWRSZWYuY3VycmVudFsnS2V5RCddIHx8IGtleXNQcmVzc2VkUmVmLmN1cnJlbnRbJ0Fycm93UmlnaHQnXSA/IDEgOiAwKSAtXG4gICAgICAgICAgKGtleXNQcmVzc2VkUmVmLmN1cnJlbnRbJ0tleUEnXSB8fCBrZXlzUHJlc3NlZFJlZi5jdXJyZW50WydBcnJvd0xlZnQnXSA/IDEgOiAwKSArXG4gICAgICAgICAgdmlydHVhbFN0aWNrUmVmLmN1cnJlbnQueDtcblxuICAgICAgICBpZiAoTWF0aC5hYnMoZm9yd2FyZCkgPiAwLjAxIHx8IE1hdGguYWJzKHN0cmFmZSkgPiAwLjAxKSB7XG4gICAgICAgICAgY2FtZXJhLmdldFdvcmxkRGlyZWN0aW9uKF92ZWMzKTtcbiAgICAgICAgICBfdmVjMy55ID0gMDtcbiAgICAgICAgICBfdmVjMy5ub3JtYWxpemUoKTtcbiAgICAgICAgICBjYW1lcmEucG9zaXRpb24uYWRkU2NhbGVkVmVjdG9yKF92ZWMzLCBmb3J3YXJkICogc3BlZWQpO1xuICAgICAgICAgIGNvbnRyb2xzLnRhcmdldC5hZGRTY2FsZWRWZWN0b3IoX3ZlYzMsIGZvcndhcmQgKiBzcGVlZCk7XG5cbiAgICAgICAgICBfdmVjMy5jcm9zcyhjYW1lcmEudXApLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgIGNhbWVyYS5wb3NpdGlvbi5hZGRTY2FsZWRWZWN0b3IoX3ZlYzMsIHN0cmFmZSAqIHNwZWVkKTtcbiAgICAgICAgICBjb250cm9scy50YXJnZXQuYWRkU2NhbGVkVmVjdG9yKF92ZWMzLCBzdHJhZmUgKiBzcGVlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgY3VycmVudE9iamVjdHMgPSBvYmplY3RzUmVmLmN1cnJlbnQ7XG4gICAgICBmb3IgKGNvbnN0IG9iaiBvZiBjdXJyZW50T2JqZWN0cykge1xuICAgICAgICBjb25zdCBncnAgPSBhY3Rvckdyb3VwTWFwUmVmLmN1cnJlbnQuZ2V0KG9iai5pZCk7XG4gICAgICAgIGlmICghZ3JwKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBhbmltID0gb2JqLmFuaW1hdGlvbjtcbiAgICAgICAgY29uc3Qgc3BkID0gYW5pbS5zcGVlZCB8fCAxLjI7XG4gICAgICAgIGNvbnN0IGFtcCA9IGFuaW0uYW1wbGl0dWRlIHx8IDAuMzU7XG5cbiAgICAgICAgaWYgKGFuaW0udHJhamVjdG9yeVR5cGUgPT09ICdob3ZlcicpIHtcbiAgICAgICAgICBncnAucG9zaXRpb24ueSA9IG9iai5wb3NpdGlvblsxXSArIE1hdGguc2luKGVsYXBzZWQgKiBzcGQgKiAyKSAqIGFtcCAqIDAuNDU7XG4gICAgICAgICAgZ3JwLnJvdGF0aW9uLnkgPSBUSFJFRS5NYXRoVXRpbHMuZGVnVG9SYWQob2JqLnJvdGF0aW9uWSkgKyBNYXRoLnNpbihlbGFwc2VkICogc3BkICogMC41KSAqIDAuMjU7XG4gICAgICAgIH0gZWxzZSBpZiAoYW5pbS50cmFqZWN0b3J5VHlwZSA9PT0gJ3NwaW4nKSB7XG4gICAgICAgICAgZ3JwLnBvc2l0aW9uLnkgPSBvYmoucG9zaXRpb25bMV07XG4gICAgICAgICAgZ3JwLnJvdGF0aW9uLnkgKz0gZGVsdGEgKiBzcGQgKiAyLjI7XG4gICAgICAgIH0gZWxzZSBpZiAoYW5pbS50cmFqZWN0b3J5VHlwZSA9PT0gJ29yYml0Jykge1xuICAgICAgICAgIGdycC5wb3NpdGlvbi54ID0gb2JqLnBvc2l0aW9uWzBdICsgTWF0aC5jb3MoZWxhcHNlZCAqIHNwZCkgKiBhbXAgKiAyLjI7XG4gICAgICAgICAgZ3JwLnBvc2l0aW9uLnogPSBvYmoucG9zaXRpb25bMl0gKyBNYXRoLnNpbihlbGFwc2VkICogc3BkKSAqIGFtcCAqIDIuMjtcbiAgICAgICAgICBncnAucm90YXRpb24ueSA9IC1lbGFwc2VkICogc3BkO1xuICAgICAgICB9IGVsc2UgaWYgKGFuaW0udHJhamVjdG9yeVR5cGUgPT09ICdmaWd1cmU4Jykge1xuICAgICAgICAgIGdycC5wb3NpdGlvbi54ID0gb2JqLnBvc2l0aW9uWzBdICsgTWF0aC5zaW4oZWxhcHNlZCAqIHNwZCkgKiBhbXAgKiAyLjQ7XG4gICAgICAgICAgZ3JwLnBvc2l0aW9uLnogPSBvYmoucG9zaXRpb25bMl0gKyBNYXRoLnNpbihlbGFwc2VkICogc3BkICogMikgKiBhbXAgKiAxLjI7XG4gICAgICAgIH0gZWxzZSBpZiAoYW5pbS50cmFqZWN0b3J5VHlwZSA9PT0gJ3B1bHNlJykge1xuICAgICAgICAgIGNvbnN0IHMgPSBvYmouc2NhbGUgKiAoMSArIE1hdGguc2luKGVsYXBzZWQgKiBzcGQgKiAzKSAqIDAuMTQgKiBhbXApO1xuICAgICAgICAgIGdycC5zY2FsZS5zZXRTY2FsYXIocyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ3JwLnBvc2l0aW9uLnNldChvYmoucG9zaXRpb25bMF0sIG9iai5wb3NpdGlvblsxXSwgb2JqLnBvc2l0aW9uWzJdKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzZWxJZCA9IHNlbGVjdGVkSWRSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IHNlbEdycCA9IHNlbElkID8gYWN0b3JHcm91cE1hcFJlZi5jdXJyZW50LmdldChzZWxJZCkgOiBudWxsO1xuICAgICAgaWYgKHNlbEdycCkge1xuICAgICAgICBzZWxlY3Rpb25SaW5nLnZpc2libGUgPSB0cnVlO1xuICAgICAgICBzZWxlY3Rpb25SaW5nLnBvc2l0aW9uLnggPSBzZWxHcnAucG9zaXRpb24ueDtcbiAgICAgICAgc2VsZWN0aW9uUmluZy5wb3NpdGlvbi56ID0gc2VsR3JwLnBvc2l0aW9uLno7XG4gICAgICAgIHNlbGVjdGlvblJpbmcucm90YXRpb24ueiA9IGVsYXBzZWQgKiAwLjg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxlY3Rpb25SaW5nLnZpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY29udHJvbHMudXBkYXRlKCk7XG5cbiAgICAgIGNvbnN0IHcgPSByZW5kZXJlci5kb21FbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgY29uc3QgaCA9IHJlbmRlcmVyLmRvbUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgaWYgKHN0ZXJlb1NwbGl0UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2Npc3NvclRlc3QodHJ1ZSk7XG4gICAgICAgIGNvbnN0IGhhbGZXID0gTWF0aC5mbG9vcih3IC8gMik7XG4gICAgICAgIGNvbnN0IGlwZE9mZnNldCA9ICgobW9iaWxlQ29uZmlnUmVmLmN1cnJlbnQuaXBkTW0gfHwgNjMpIC0gNjApICogMC4wMDQgKyAwLjA2O1xuXG4gICAgICAgIHJlbmRlcmVyLnNldFZpZXdwb3J0KDAsIDAsIGhhbGZXLCBoKTtcbiAgICAgICAgcmVuZGVyZXIuc2V0U2Npc3NvcigwLCAwLCBoYWxmVywgaCk7XG4gICAgICAgIGNhbWVyYS5hc3BlY3QgPSBoYWxmVyAvIGg7XG4gICAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICAgIGNhbWVyYS5wb3NpdGlvbi54IC09IGlwZE9mZnNldDtcbiAgICAgICAgcmVuZGVyZXIucmVuZGVyKHNjZW5lLCBjYW1lcmEpO1xuXG4gICAgICAgIHJlbmRlcmVyLnNldFZpZXdwb3J0KGhhbGZXLCAwLCB3IC0gaGFsZlcsIGgpO1xuICAgICAgICByZW5kZXJlci5zZXRTY2lzc29yKGhhbGZXLCAwLCB3IC0gaGFsZlcsIGgpO1xuICAgICAgICBjYW1lcmEucG9zaXRpb24ueCArPSBpcGRPZmZzZXQgKiAyO1xuICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG5cbiAgICAgICAgY2FtZXJhLnBvc2l0aW9uLnggLT0gaXBkT2Zmc2V0O1xuICAgICAgICByZW5kZXJlci5zZXRTY2lzc29yVGVzdChmYWxzZSk7XG4gICAgICAgIHJlbmRlcmVyLnNldFZpZXdwb3J0KDAsIDAsIHcsIGgpO1xuICAgICAgICBjYW1lcmEuYXNwZWN0ID0gdyAvIGg7XG4gICAgICAgIGNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZW5kZXJlci5zZXRTY2lzc29yVGVzdChmYWxzZSk7XG4gICAgICAgIHJlbmRlcmVyLnNldFZpZXdwb3J0KDAsIDAsIHcsIGgpO1xuICAgICAgICByZW5kZXJlci5yZW5kZXIoc2NlbmUsIGNhbWVyYSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1NvZnR3YXJlR2wpIHtcbiAgICAgICAgYWZ0ZXJEcmF3KHRpY2spO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aWNrKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoZnJhbWVJZCk7XG4gICAgICBjbGVhclRpbWVvdXQoZnJhbWVJZCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgaGFuZGxlUmVzaXplKTtcbiAgICAgIHJlbmRlcmVyLmRvbUVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCBoYW5kbGVQb2ludGVyRG93bik7XG4gICAgICBjb250cm9scy5kaXNwb3NlKCk7XG4gICAgICByZW5kZXJlci5kaXNwb3NlKCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIC8vIFJlY29uY2lsZSBUaHJlZS5qcyBzY2VuZSBhY3RvcnMgd2hlbmV2ZXIgYG9iamVjdHNgIHN0YXRlIHVwZGF0ZXNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBzY2VuZSA9IHNjZW5lUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgcmVuZGVyZXIgPSByZW5kZXJlclJlZi5jdXJyZW50O1xuICAgIGlmICghc2NlbmUgfHwgIXJlbmRlcmVyKSByZXR1cm47XG5cbiAgICBjb25zdCBjdXJyZW50SWRzID0gbmV3IFNldChvYmplY3RzLm1hcCgobykgPT4gby5pZCkpO1xuXG4gICAgYWN0b3JHcm91cE1hcFJlZi5jdXJyZW50LmZvckVhY2goKGdycCwgaWQpID0+IHtcbiAgICAgIGlmICghY3VycmVudElkcy5oYXMoaWQpKSB7XG4gICAgICAgIHNjZW5lLnJlbW92ZShncnApO1xuICAgICAgICBhY3Rvckdyb3VwTWFwUmVmLmN1cnJlbnQuZGVsZXRlKGlkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG9iamVjdHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSBhY3Rvckdyb3VwTWFwUmVmLmN1cnJlbnQuZ2V0KGl0ZW0uaWQpO1xuICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgIHNjZW5lLnJlbW92ZShleGlzdGluZyk7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdHcnAgPSBidWlsZENvbXBvc2l0ZUFjdG9yR3JvdXAoaXRlbSwgcmVuZGVyZXIsIGlzU29mdHdhcmVHbFJlZi5jdXJyZW50KTtcbiAgICAgIHNjZW5lLmFkZChuZXdHcnApO1xuICAgICAgYWN0b3JHcm91cE1hcFJlZi5jdXJyZW50LnNldChpdGVtLmlkLCBuZXdHcnApO1xuICAgIH0pO1xuICB9LCBbb2JqZWN0c10pO1xuXG4gIGNvbnN0IGhhbmRsZURyb3BPbkNhbnZhcyA9IChlOiBSZWFjdC5EcmFnRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IG1vZGVsVHlwZSA9IGUuZGF0YVRyYW5zZmVyLmdldERhdGEoJ2FwcGxpY2F0aW9uL3ZvcnRleC1tb2RlbCcpIGFzIE1vZGVsQ2F0ZWdvcnk7XG4gICAgaWYgKCFtb2RlbFR5cGUgfHwgIXJlbmRlcmVyUmVmLmN1cnJlbnQgfHwgIWNhbWVyYVJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICBjb25zdCByZWN0ID0gcmVuZGVyZXJSZWYuY3VycmVudC5kb21FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIF9tb3VzZS54ID0gKChlLmNsaWVudFggLSByZWN0LmxlZnQpIC8gcmVjdC53aWR0aCkgKiAyIC0gMTtcbiAgICBfbW91c2UueSA9IC0oKGUuY2xpZW50WSAtIHJlY3QudG9wKSAvIHJlY3QuaGVpZ2h0KSAqIDIgKyAxO1xuICAgIF9yYXljYXN0ZXIuc2V0RnJvbUNhbWVyYShfbW91c2UsIGNhbWVyYVJlZi5jdXJyZW50KTtcblxuICAgIGxldCBkcm9wWCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDY7XG4gICAgbGV0IGRyb3BaID0gKE1hdGgucmFuZG9tKCkgLSAwLjUpICogNjtcbiAgICBpZiAoX3JheWNhc3Rlci5yYXkuaW50ZXJzZWN0UGxhbmUoX2dyb3VuZFBsYW5lLCBfaW50ZXJzZWN0UHQpKSB7XG4gICAgICBkcm9wWCA9IE1hdGgubWF4KC0xMiwgTWF0aC5taW4oMTIsIE51bWJlcihfaW50ZXJzZWN0UHQueC50b0ZpeGVkKDEpKSkpO1xuICAgICAgZHJvcFogPSBNYXRoLm1heCgtMTIsIE1hdGgubWluKDEyLCBOdW1iZXIoX2ludGVyc2VjdFB0LnoudG9GaXhlZCgxKSkpKTtcbiAgICB9XG5cbiAgICBzcGF3bk5ld09iamVjdChtb2RlbFR5cGUsIFtkcm9wWCwgMCwgZHJvcFpdKTtcbiAgfTtcblxuICBjb25zdCBzcGF3bk5ld09iamVjdCA9ICh0eXBlOiBNb2RlbENhdGVnb3J5LCBjb29yZHM/OiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0pID0+IHtcbiAgICBjb25zdCBkZWZhdWx0czogUmVjb3JkPFxuICAgICAgTW9kZWxDYXRlZ29yeSxcbiAgICAgIHsgbmFtZVBsOiBzdHJpbmc7IG5hbWVFbjogc3RyaW5nOyBjb2xvcjogc3RyaW5nOyBzZWM6IHN0cmluZzsgdHJpczogbnVtYmVyOyBwYXJ0czogbnVtYmVyIH1cbiAgICA+ID0ge1xuICAgICAgcm92ZXI6IHsgbmFtZVBsOiAnxYFhemlrIEVrc3Bsb3JhY3lqbnkgWFInLCBuYW1lRW46ICdYUiBFeHBsb3JhdGlvbiBSb3ZlcicsIGNvbG9yOiAnI0UyRThGMCcsIHNlYzogJyNGNTlFMEInLCB0cmlzOiAxNDIwLCBwYXJ0czogOCB9LFxuICAgICAgdHVycmV0OiB7IG5hbWVQbDogJ1dpZcW8eWN6a2EgT2Jyb25uYSBTdHJhxbxuaWsnLCBuYW1lRW46ICdTZW50aW5lbCBEZWZlbnNlIFR1cnJldCcsIGNvbG9yOiAnIzMzNDE1NScsIHNlYzogJyMzOEJERjgnLCB0cmlzOiAxMTgwLCBwYXJ0czogNiB9LFxuICAgICAgcG9ydGFsOiB7IG5hbWVQbDogJ0JyYW1hIEt3YW50b3dhIFBvcnRhbCcsIG5hbWVFbjogJ1F1YW50dW0gUG9ydGFsIEdhdGUnLCBjb2xvcjogJyMxRTI5M0InLCBzZWM6ICcjQTg1NUY3JywgdHJpczogMTY0MCwgcGFydHM6IDUgfSxcbiAgICAgIGNyeXN0YWw6IHsgbmFtZVBsOiAnTW9ub2xpdCBFbmVyZ2V0eWN6bnknLCBuYW1lRW46ICdFbmVyZ3kgQ3J5c3RhbCBNb25vbGl0aCcsIGNvbG9yOiAnIzAyODRDNycsIHNlYzogJyMyMkQzRUUnLCB0cmlzOiA2ODAsIHBhcnRzOiA0IH0sXG4gICAgICBoYWJpdGF0OiB7IG5hbWVQbDogJ0tvcHXFgmEgQmF6eSBNb2R1xYJvd2VqJywgbmFtZUVuOiAnTW9kdWxhciBIYWJpdGF0IERvbWUnLCBjb2xvcjogJyNDQkQ1RTEnLCBzZWM6ICcjRjk3MzE2JywgdHJpczogMTg5MCwgcGFydHM6IDUgfSxcbiAgICAgIGRyb25lOiB7IG5hbWVQbDogJ0Ryb24gWndpYWRvd2N6eSA2LURvRicsIG5hbWVFbjogJzYtRG9GIFJlY29uIERyb25lJywgY29sb3I6ICcjNDc1NTY5Jywgc2VjOiAnIzEwQjk4MScsIHRyaXM6IDk2MCwgcGFydHM6IDUgfSxcbiAgICAgIGN1c3RvbV9vYmo6IHsgbmFtZVBsOiAnTW9kZWwgV8WCYXNueSBDQUQvM0QnLCBuYW1lRW46ICdDdXN0b20gQ0FELzNEIE1lc2gnLCBjb2xvcjogJyNGNTlFMEInLCBzZWM6ICcjMzhCREY4JywgdHJpczogMjA0OCwgcGFydHM6IDQgfSxcbiAgICB9O1xuXG4gICAgY29uc3Qgc3BlYyA9IGRlZmF1bHRzW3R5cGVdO1xuICAgIGNvbnN0IGlkID0gYG9ial8ke0RhdGUubm93KCkudG9TdHJpbmcoMzYpfWA7XG4gICAgY29uc3QgcG9zOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gPSBjb29yZHMgfHwgW1xuICAgICAgTnVtYmVyKCgoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiA4KS50b0ZpeGVkKDEpKSxcbiAgICAgIDAsXG4gICAgICBOdW1iZXIoKChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIDgpLnRvRml4ZWQoMSkpLFxuICAgIF07XG5cbiAgICBjb25zdCBuZXdPYmo6IFNjZW5lT2JqZWN0ID0ge1xuICAgICAgaWQsXG4gICAgICBuYW1lOiBsYW5nID09PSAncGwnID8gYCR7c3BlYy5uYW1lUGx9ICMke29iamVjdHMubGVuZ3RoICsgMX1gIDogYCR7c3BlYy5uYW1lRW59ICMke29iamVjdHMubGVuZ3RoICsgMX1gLFxuICAgICAgdHlwZSxcbiAgICAgIHBvc2l0aW9uOiBwb3MsXG4gICAgICByb3RhdGlvblk6IDAsXG4gICAgICBzY2FsZTogMSxcbiAgICAgIGNvbG9yOiBzcGVjLmNvbG9yLFxuICAgICAgc2Vjb25kYXJ5Q29sb3I6IHNwZWMuc2VjLFxuICAgICAgcm91Z2huZXNzOiAwLjI1LFxuICAgICAgbWV0YWxuZXNzOiAwLjc4LFxuICAgICAgdHJpYW5nbGVzOiBzcGVjLnRyaXMsXG4gICAgICBwYXJ0c0NvdW50OiBzcGVjLnBhcnRzLFxuICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgIHRyYWplY3RvcnlUeXBlOiB0eXBlID09PSAnZHJvbmUnIHx8IHR5cGUgPT09ICdjcnlzdGFsJyA/ICdob3ZlcicgOiAnbm9uZScsXG4gICAgICAgIHNwZWVkOiAxLjIsXG4gICAgICAgIGFtcGxpdHVkZTogMC4zNSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHNldE9iamVjdHMoKHByZXYpID0+IFsuLi5wcmV2LCBuZXdPYmpdKTtcbiAgICBzZXRTZWxlY3RlZE9iamVjdElkKGlkKTtcbiAgICBwbGF5UHJvY2VkdXJhbFNmeCgncGxhY2UnKTtcbiAgICBzZXRQbGF5RmVlZChcbiAgICAgIGxhbmcgPT09ICdwbCdcbiAgICAgICAgPyBgRG9kYW5vIG5hIHNjZW7EmTogJHtuZXdPYmoubmFtZX0gdyBwdW5rY2llIFske3Bvc1swXX0sICR7cG9zWzJdfV1gXG4gICAgICAgIDogYFNwYXduZWQgJHtuZXdPYmoubmFtZX0gYXQgWyR7cG9zWzBdfSwgJHtwb3NbMl19XWBcbiAgICApO1xuICB9O1xuXG4gIC8vIFJlYWwtdGltZSBDdXN0b20gM0QgRmlsZSBVcGxvYWQgKC5PQkogLyAuR0xURiAvIC5KU09OKVxuICBjb25zdCBoYW5kbGVGaWxlVXBsb2FkID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gU3RyaW5nKHJlYWRlci5yZXN1bHQgfHwgJycpO1xuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VPYmpPckpzb25GaWxlKGNvbnRlbnQsIGZpbGUubmFtZSk7XG4gICAgICBjb25zdCBpZCA9IGBjdXN0b21fJHtEYXRlLm5vdygpLnRvU3RyaW5nKDM2KX1gO1xuICAgICAgY29uc3QgbmV3T2JqOiBTY2VuZU9iamVjdCA9IHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5hbWU6IGBJbXBvcnQ6ICR7ZmlsZS5uYW1lLnNsaWNlKDAsIDIyKX1gLFxuICAgICAgICB0eXBlOiAnY3VzdG9tX29iaicsXG4gICAgICAgIHBvc2l0aW9uOiBbMCwgMCwgMF0sXG4gICAgICAgIHJvdGF0aW9uWTogMCxcbiAgICAgICAgc2NhbGU6IDEuMTUsXG4gICAgICAgIGNvbG9yOiAnI0Y1OUUwQicsXG4gICAgICAgIHNlY29uZGFyeUNvbG9yOiAnIzM4QkRGOCcsXG4gICAgICAgIHJvdWdobmVzczogMC4yLFxuICAgICAgICBtZXRhbG5lc3M6IDAuODUsXG4gICAgICAgIHRyaWFuZ2xlczogcGFyc2VkLnRyaWFuZ2xlcyxcbiAgICAgICAgcGFydHNDb3VudDogNCxcbiAgICAgICAgY3VzdG9tTWVzaDogeyB2ZXJ0aWNlczogcGFyc2VkLnZlcnRpY2VzIH0sXG4gICAgICAgIGFuaW1hdGlvbjogeyB0cmFqZWN0b3J5VHlwZTogJ3NwaW4nLCBzcGVlZDogMS4wLCBhbXBsaXR1ZGU6IDAuMyB9LFxuICAgICAgfTtcbiAgICAgIHNldE9iamVjdHMoKHByZXYpID0+IFsuLi5wcmV2LCBuZXdPYmpdKTtcbiAgICAgIHNldFNlbGVjdGVkT2JqZWN0SWQoaWQpO1xuICAgICAgcGxheVByb2NlZHVyYWxTZngoJ3Njb3JlJyk7XG4gICAgICBzZXRQbGF5RmVlZChcbiAgICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgID8gYFphaW1wb3J0b3dhbm8gbW9kZWwgM0QgXCIke2ZpbGUubmFtZX1cIiAoJHtwYXJzZWQudHJpYW5nbGVzfSB0csOzamvEhXTDs3cpIHcgY3phc2llIHJ6ZWN6eXdpc3R5bSFgXG4gICAgICAgICAgOiBgSW1wb3J0ZWQgM0QgbW9kZWwgXCIke2ZpbGUubmFtZX1cIiAoJHtwYXJzZWQudHJpYW5nbGVzfSB0cmlhbmdsZXMpIGluIHJlYWwgdGltZSFgXG4gICAgICApO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgZS50YXJnZXQudmFsdWUgPSAnJztcbiAgfTtcblxuICAvLyBEaXJlY3QgQ3VzdG9tIEdyYXBoaWMgLyBUZXh0dXJlIC8gU2t5Ym94IEltYWdlIFVwbG9hZCAoLlBORyAvIC5KUEcgLyAuV0VCUClcbiAgY29uc3QgaGFuZGxlSW1hZ2VUZXh0dXJlVXBsb2FkID0gKGU6IFJlYWN0LkNoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzPy5bMF07XG4gICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBkYXRhVXJsID0gU3RyaW5nKHJlYWRlci5yZXN1bHQgfHwgJycpO1xuICAgICAgaWYgKGltYWdlVXBsb2FkVGFyZ2V0ID09PSAnc2t5Ym94JyAmJiBzY2VuZVJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNvbnN0IGxvYWRlciA9IG5ldyBUSFJFRS5UZXh0dXJlTG9hZGVyKCk7XG4gICAgICAgIGNvbnN0IHNreVRleCA9IGxvYWRlci5sb2FkKGRhdGFVcmwpO1xuICAgICAgICBza3lUZXguY29sb3JTcGFjZSA9IFRIUkVFLlNSR0JDb2xvclNwYWNlO1xuICAgICAgICBza3lUZXgubWFwcGluZyA9IFRIUkVFLkVxdWlyZWN0YW5ndWxhclJlZmxlY3Rpb25NYXBwaW5nO1xuICAgICAgICBzY2VuZVJlZi5jdXJyZW50LmJhY2tncm91bmQgPSBza3lUZXg7XG4gICAgICAgIHBsYXlQcm9jZWR1cmFsU2Z4KCdzY29yZScpO1xuICAgICAgICBzZXRQbGF5RmVlZChcbiAgICAgICAgICBsYW5nID09PSAncGwnXG4gICAgICAgICAgICA/IGBXZ3Jhbm8gd8WCYXNuxIUgZ3JhZmlrxJkgbmllYmEgKFNreWJveCk6IFwiJHtmaWxlLm5hbWV9XCIhIMWad2lhdCB6eXNrYcWCIG5vd8SFIGF0bW9zZmVyxJkuYFxuICAgICAgICAgICAgOiBgQXBwbGllZCBjdXN0b20gU2t5Ym94IHBhbm9yYW1hIFwiJHtmaWxlLm5hbWV9XCIgdG8gdGhlIDNEIHdvcmxkIWBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHRhcmdldElkID0gc2VsZWN0ZWRPYmplY3RJZCB8fCBvYmplY3RzWzBdPy5pZDtcbiAgICAgICAgaWYgKHRhcmdldElkKSB7XG4gICAgICAgICAgc2V0T2JqZWN0cygocHJldikgPT5cbiAgICAgICAgICAgIHByZXYubWFwKChvKSA9PlxuICAgICAgICAgICAgICBvLmlkID09PSB0YXJnZXRJZCA/IHsgLi4ubywgY3VzdG9tSW1hZ2VEYXRhVXJsOiBkYXRhVXJsIH0gOiBvXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgICBwbGF5UHJvY2VkdXJhbFNmeCgnc2NvcmUnKTtcbiAgICAgICAgICBzZXRQbGF5RmVlZChcbiAgICAgICAgICAgIGxhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgPyBgTmHFgm/FvG9ubyB3xYJhc27EhSBncmFmaWvEmSBcIiR7ZmlsZS5uYW1lfVwiIGpha28gdGVrc3R1csSZIDNEIG5hIHd5YnJhbnkgb2JpZWt0IWBcbiAgICAgICAgICAgICAgOiBgQXBwbGllZCBjdXN0b20gZ3JhcGhpYyBcIiR7ZmlsZS5uYW1lfVwiIG9udG8gdGhlIHNlbGVjdGVkIDNEIGFjdG9yIWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICBlLnRhcmdldC52YWx1ZSA9ICcnO1xuICB9O1xuXG4gIC8vIENoYW5nZSBXb3JsZCBBdG1vc3BoZXJlIFNreWJveCBQcmVzZXRcbiAgY29uc3QgYXBwbHlBdG1vc3BoZXJlUHJlc2V0ID0gKGhleEJnOiBudW1iZXIpID0+IHtcbiAgICBpZiAoIXNjZW5lUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBzY2VuZVJlZi5jdXJyZW50LmJhY2tncm91bmQgPSBuZXcgVEhSRUUuQ29sb3IoaGV4QmcpO1xuICAgIHNjZW5lUmVmLmN1cnJlbnQuZm9nID0gbmV3IFRIUkVFLkZvZ0V4cDIoaGV4QmcsIDAuMDIpO1xuICAgIHBsYXlQcm9jZWR1cmFsU2Z4KCdjbGljaycpO1xuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVNlbGVjdGVkUHJvcCA9IDxLIGV4dGVuZHMga2V5b2YgU2NlbmVPYmplY3Q+KGtleTogSywgdmFsdWU6IFNjZW5lT2JqZWN0W0tdKSA9PiB7XG4gICAgaWYgKCFzZWxlY3RlZE9iamVjdElkKSByZXR1cm47XG4gICAgc2V0T2JqZWN0cygocHJldikgPT4gcHJldi5tYXAoKG8pID0+IChvLmlkID09PSBzZWxlY3RlZE9iamVjdElkID8geyAuLi5vLCBba2V5XTogdmFsdWUgfSA6IG8pKSk7XG4gIH07XG5cbiAgY29uc3QgdG90YWxUcmlhbmdsZXMgPSBvYmplY3RzLnJlZHVjZSgoc3VtLCBvKSA9PiBzdW0gKyBvLnRyaWFuZ2xlcywgMCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBoLVtjYWxjKDEwMHZoLTEwNXB4KV0gbWluLWgtWzY0MHB4XSBiZy1zbGF0ZS05NTAgb3ZlcmZsb3ctaGlkZGVuIHNlbGVjdC1ub25lXCI+XG4gICAgICB7LyogSGlkZGVuIDNEIE1vZGVsIEZpbGUgSW5wdXQgKC5vYmosIC5nbHRmLCAuZ2xiLCAuc3RsLCAuanNvbikgKi99XG4gICAgICA8aW5wdXRcbiAgICAgICAgcmVmPXtmaWxlSW5wdXRSZWZ9XG4gICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgYWNjZXB0PVwiLm9iaiwuZ2x0ZiwuZ2xiLC5zdGwsLmpzb25cIlxuICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICBvbkNoYW5nZT17aGFuZGxlRmlsZVVwbG9hZH1cbiAgICAgIC8+XG5cbiAgICAgIHsvKiBIaWRkZW4gQ3VzdG9tIEdyYXBoaWMgLyBUZXh0dXJlIEltYWdlIEZpbGUgSW5wdXQgKC5wbmcsIC5qcGcsIC53ZWJwKSAqL31cbiAgICAgIDxpbnB1dFxuICAgICAgICByZWY9e2ltYWdlVGV4dHVyZUlucHV0UmVmfVxuICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgIGFjY2VwdD1cImltYWdlL3BuZyxpbWFnZS9qcGVnLGltYWdlL3dlYnAsaW1hZ2Uvc3ZnK3htbFwiXG4gICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVJbWFnZVRleHR1cmVVcGxvYWR9XG4gICAgICAvPlxuXG4gICAgICB7LyogRGVkaWNhdGVkIEVtcHR5IFdlYkdMIENhbnZhcyBNb3VudCBDb250YWluZXIgKDEwMCUgRnVsbCBWaWV3cG9ydCkgKi99XG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17Y2FudmFzTW91bnRSZWZ9XG4gICAgICAgIG9uRHJhZ092ZXI9eyhlKSA9PiBlLnByZXZlbnREZWZhdWx0KCl9XG4gICAgICAgIG9uRHJvcD17aGFuZGxlRHJvcE9uQ2FudmFzfVxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGN1cnNvci1ncmFiIGFjdGl2ZTpjdXJzb3ItZ3JhYmJpbmdcIlxuICAgICAgLz5cblxuICAgICAgey8qIFN0ZXJlb3Njb3BpYyBDZW50ZXIgRGl2aWRlciBMaW5lIHdoZW4gaW4gU3BsaXQtU2NyZWVuIFZSIE1vZGUgKi99XG4gICAgICB7c3RlcmVvU3BsaXQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMS8yIHctMC41IGJnLWFtYmVyLTQwMC83MCB6LTEwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweS02XCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgdGV4dC1bMTFweF0gZm9udC1tb25vIGJnLXNsYXRlLTkwMCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkXCI+XG4gICAgICAgICAgICBMRUZUIEVZRSDCtyBSSUdIVCBFWUUgKElQRCB7bW9iaWxlQ29uZmlnLmlwZE1tfW1tKVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogVG9wIEJhciBvdmVyIDNEIFZpZXdwb3J0ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1hdXRvIGFic29sdXRlIHRvcC00IGxlZnQtNCByaWdodC00IGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgei0yMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHB4LTQgcHktMiByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMC85NSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdTY2VuYSBWUjogU3RhY2phIEhlbGlvcycgOiAnVlIgU2NlbmU6IEhlbGlvcyBTdGF0aW9uJ31cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDBcIj7Ctzwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICB7b2JqZWN0cy5sZW5ndGh9IHtsYW5nID09PSAncGwnID8gJ29iaWVrdMOzdycgOiAnYWN0b3JzJ31cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDBcIj7Ctzwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGFidWxhci1udW1zIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICB7dG90YWxUcmlhbmdsZXMudG9Mb2NhbGVTdHJpbmcoKX0gdHJpc1xuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICB7aXNQbGF5aW5nICYmIChcbiAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwXCI+wrc8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0YWJ1bGFyLW51bXMgZm9udC1zZW1pYm9sZCB0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICAgICAgU0NPUkU6IHtwbGF5U2NvcmV9IFBLVFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUHJpbWFyeSBWaWV3cG9ydCBNb2RlIEFjdGlvbnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgey8qIEludGVyYWN0aXZlIFR1dG9yaWFsICYgSGludHMgQnV0dG9uICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlblR1dG9yaWFsTW9kYWx9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMuNSBweS0yIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGJnLWFtYmVyLTUwMC8yMCBib3JkZXIgYm9yZGVyLWFtYmVyLTQwMCB0ZXh0LWFtYmVyLTMwMCBob3ZlcjpiZy1hbWJlci01MDAvMzAgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxIZWxwQ2lyY2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJz8gU2Ftb3VjemVrIGkgR2R6aWUgS2xpa2HEhycgOiAnPyBUdXRvcmlhbCAmIEhpbnRzJ31cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBUb2dnbGUgVmlzdWFsIE5vZGUgR3JhcGggU3ViLVZpZXcgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRBY3RpdmVEb2NrVGFiKCdsb2dpYycpO1xuICAgICAgICAgICAgICBzZXRJc0xvZ2ljR3JhcGhTdWJWaWV3KCFpc0xvZ2ljR3JhcGhTdWJWaWV3KTtcbiAgICAgICAgICAgICAgc2V0RG9ja0NvbGxhcHNlZChmYWxzZSk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zLjUgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tZWRpdW0gYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgIGlzTG9naWNHcmFwaFN1YlZpZXdcbiAgICAgICAgICAgICAgICA/ICdiZy1za3ktNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQgYm9yZGVyLXNreS00MDAnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzk1IGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0yMDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxHaXRCcmFuY2ggY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0dyYWYgTG9naWtpIChTdWItVmlldyknIDogJ0xvZ2ljIEdyYXBoIChTdWItVmlldyknfVxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIERpcmVjdCBHcmFwaGljIC8gVGV4dHVyZSBVcGxvYWQgQnV0dG9uICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldEltYWdlVXBsb2FkVGFyZ2V0KCdvYmplY3QnKTtcbiAgICAgICAgICAgICAgICBpbWFnZVRleHR1cmVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMuNSBweS0yIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1lZGl1bSBiZy1zbGF0ZS05MDAvOTUgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0yMDAgaG92ZXI6Ym9yZGVyLWFtYmVyLTUwMC82MCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxJbWFnZUljb24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdXZ3JhaiBHcmFmaWvEmSAoLlBORy8uSlBHKScgOiAnVXBsb2FkIEdyYXBoaWMgKC5QTkcvLkpQRyknfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7c2hvd0xpdmVDb2FjaG1hcmtzICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMTEgbGVmdC0wIHctNjAgcC0yLjUgcm91bmRlZC1sZyBiZy1hbWJlci01MDAgdGV4dC1zbGF0ZS05NTAgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCBzaGFkb3cteGwgei0zMFwiPlxuICAgICAgICAgICAgICAgIDEuIEtsaWtuaWogdHV0YWosIGFieSB3Z3JhxIcgd8WCYXNuxIUgZ3JhZmlrxJkgbHViIHRla3N0dXLEmSB6IGR5c2t1IG5hIG9iaWVrdCAzRCFcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIDNEIE1vZGVsIEltcG9ydCBCdXR0b24gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zLjUgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tZWRpdW0gYmctc2xhdGUtOTAwLzk1IGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMjAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnSW1wb3J0IDNEICguT0JKLy5HTFRGKScgOiAnSW1wb3J0IDNEICguT0JKLy5HTFRGKSd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIHtzaG93TGl2ZUNvYWNobWFya3MgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xMSByaWdodC0wIHctNTYgcC0yLjUgcm91bmRlZC1sZyBiZy1za3ktNDAwIHRleHQtc2xhdGUtOTUwIHRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgc2hhZG93LXhsIHotMzBcIj5cbiAgICAgICAgICAgICAgICAyLiBUdXRhaiB6YWltcG9ydHVqZXN6IHfFgmFzbmUgbW9kZWxlIDNEICguT0JKIC8gLkdMVEYpIVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIHNldElzUGxheWluZygocCkgPT4gIXApO1xuICAgICAgICAgICAgICBwbGF5UHJvY2VkdXJhbFNmeCgnY2xpY2snKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgaXNQbGF5aW5nXG4gICAgICAgICAgICAgICAgPyAnYmctcm9zZS02MDAgaG92ZXI6Ymctcm9zZS01MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICA6ICdiZy1hbWJlci01MDAgaG92ZXI6YmctYW1iZXItNDAwIHRleHQtc2xhdGUtOTUwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzUGxheWluZyA/IDxTcXVhcmUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiA6IDxQbGF5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICB7aXNQbGF5aW5nXG4gICAgICAgICAgICAgID8gbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgID8gJ1phdHJ6eW1haiBUZXN0J1xuICAgICAgICAgICAgICAgIDogJ1N0b3AgUGxheXRlc3QnXG4gICAgICAgICAgICAgIDogbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICA/ICdUZXN0dWogR3LEmSBuYSDFu3l3bydcbiAgICAgICAgICAgICAgOiAnTGl2ZSBQbGF5dGVzdCd9XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTdGVyZW9TcGxpdCgocykgPT4gIXMpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJvcmRlciB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICBzdGVyZW9TcGxpdFxuICAgICAgICAgICAgICAgID8gJ2JnLXNreS01MDAvMjAgYm9yZGVyLXNreS00MDAgdGV4dC1za3ktMjAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC85NSBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMjAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlZSIFNwbGl0PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRGVkaWNhdGVkIEZ1bGwtQ2FudmFzIFZpc3VhbCBMb2dpYyBOb2RlIEdyYXBoIFN1Yi1WaWV3IHdoZW4gRXhwYW5kZWQgKi99XG4gICAgICB7aXNMb2dpY0dyYXBoU3ViVmlldyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtYXV0byBhYnNvbHV0ZSBpbnNldC14LTQgdG9wLTE2IGJvdHRvbS00IHotMzAgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzk1IGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHAtNSBzaGFkb3ctMnhsIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICA8VmlzdWFsTG9naWNHcmFwaEVkaXRvclxuICAgICAgICAgICAgbGFuZz17bGFuZ31cbiAgICAgICAgICAgIGxvZ2ljTm9kZXM9e2xvZ2ljTm9kZXN9XG4gICAgICAgICAgICBzZXRMb2dpY05vZGVzPXtzZXRMb2dpY05vZGVzfVxuICAgICAgICAgICAgb2JqZWN0cz17b2JqZWN0c31cbiAgICAgICAgICAgIHNlbGVjdGVkT2JqZWN0SWQ9e3NlbGVjdGVkT2JqZWN0SWR9XG4gICAgICAgICAgICBpc0V4cGFuZGVkU3ViVmlldz17dHJ1ZX1cbiAgICAgICAgICAgIHNldElzRXhwYW5kZWRTdWJWaWV3PXtzZXRJc0xvZ2ljR3JhcGhTdWJWaWV3fVxuICAgICAgICAgICAgb25UcmlnZ2VyTm9kZUNhc2NhZGU9eyhub2RlSWQpID0+IGV4ZWN1dGVOb2RlQW5kQ2FzY2FkZShub2RlSWQpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFN0YW5kYWxvbmUgUGhvbmUvVGFibGV0IFZpcnR1YWwgVG91Y2ggSm95c3RpY2sgd2hlbiBpbiBQbGF5dGVzdCBvciBNb2JpbGUgTW9kZSAqL31cbiAgICAgIHsoaXNQbGF5aW5nIHx8IG1vYmlsZUNvbmZpZy5wbGF5V2l0aG91dEhlYWRzZXQpICYmICFpc0xvZ2ljR3JhcGhTdWJWaWV3ICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1hdXRvIGFic29sdXRlIHRvcC0yMCBsZWZ0LTQgei0xMCBmbGV4IGZsZXgtY29sIGdhcC0yIGJnLXNsYXRlLTkwMC85NSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtMyB3LTUyXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFNtYXJ0cGhvbmUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdTdGVyb3dhbmllIE1vYmlsbmUnIDogJ01vYmlsZSBUb3VjaCBQYWQnfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+e21vYmlsZUNvbmZpZy5mb3ZEZWdyZWVzfcKwIEZPVjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTEuNSB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXsoKSA9PiAodmlydHVhbFN0aWNrUmVmLmN1cnJlbnQueSA9IC0xKX1cbiAgICAgICAgICAgICAgb25Qb2ludGVyVXA9eygpID0+ICh2aXJ0dWFsU3RpY2tSZWYuY3VycmVudC55ID0gMCl9XG4gICAgICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXsoKSA9PiAodmlydHVhbFN0aWNrUmVmLmN1cnJlbnQueSA9IDApfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweS0xLjUgcm91bmRlZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGFjdGl2ZTpiZy1hbWJlci01MDAgYWN0aXZlOnRleHQtc2xhdGUtOTUwIHRleHQtY2VudGVyIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDilrIgV1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uUG9pbnRlckRvd249eygpID0+ICh2aXJ0dWFsU3RpY2tSZWYuY3VycmVudC54ID0gLTEpfVxuICAgICAgICAgICAgICBvblBvaW50ZXJVcD17KCkgPT4gKHZpcnR1YWxTdGlja1JlZi5jdXJyZW50LnggPSAwKX1cbiAgICAgICAgICAgICAgb25Qb2ludGVyTGVhdmU9eygpID0+ICh2aXJ0dWFsU3RpY2tSZWYuY3VycmVudC54ID0gMCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB5LTEuNSByb3VuZGVkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgYWN0aXZlOmJnLWFtYmVyLTUwMCBhY3RpdmU6dGV4dC1zbGF0ZS05NTAgdGV4dC1jZW50ZXIgdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIOKXgCBBXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KCkgPT4gKHZpcnR1YWxTdGlja1JlZi5jdXJyZW50LnkgPSAxKX1cbiAgICAgICAgICAgICAgb25Qb2ludGVyVXA9eygpID0+ICh2aXJ0dWFsU3RpY2tSZWYuY3VycmVudC55ID0gMCl9XG4gICAgICAgICAgICAgIG9uUG9pbnRlckxlYXZlPXsoKSA9PiAodmlydHVhbFN0aWNrUmVmLmN1cnJlbnQueSA9IDApfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweS0xLjUgcm91bmRlZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGFjdGl2ZTpiZy1hbWJlci01MDAgYWN0aXZlOnRleHQtc2xhdGUtOTUwIHRleHQtY2VudGVyIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDilrwgU1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uUG9pbnRlckRvd249eygpID0+ICh2aXJ0dWFsU3RpY2tSZWYuY3VycmVudC54ID0gMSl9XG4gICAgICAgICAgICAgIG9uUG9pbnRlclVwPXsoKSA9PiAodmlydHVhbFN0aWNrUmVmLmN1cnJlbnQueCA9IDApfVxuICAgICAgICAgICAgICBvblBvaW50ZXJMZWF2ZT17KCkgPT4gKHZpcnR1YWxTdGlja1JlZi5jdXJyZW50LnggPSAwKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHktMS41IHJvdW5kZWQgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCBhY3RpdmU6YmctYW1iZXItNTAwIGFjdGl2ZTp0ZXh0LXNsYXRlLTk1MCB0ZXh0LWNlbnRlciB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgRCDilrZcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEd5cm9BY3RpdmUoKGcpID0+ICFnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0xLjUgcm91bmRlZCB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgIGd5cm9BY3RpdmUgPyAnYmctZW1lcmFsZC02MDAgdGV4dC13aGl0ZScgOiAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOmJnLXNsYXRlLTcwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxDb21wYXNzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIHtneXJvQWN0aXZlXG4gICAgICAgICAgICAgID8gbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgID8gJ8W7eXJvc2tvcDogQUtUWVdOWSdcbiAgICAgICAgICAgICAgICA6ICdHeXJvc2NvcGU6IEFDVElWRSdcbiAgICAgICAgICAgICAgOiBsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgID8gJ1fFgsSFY3ogxbt5cm9za29wIChUZWxlZm9uL1RhYmxldCknXG4gICAgICAgICAgICAgIDogJ0VuYWJsZSBHeXJvc2NvcGUgU2Vuc29yJ31cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogVW5pZmllZCBDb2xsYXBzaWJsZSBCb3R0b20gQ29udHJvbCBEb2NrICovfVxuICAgICAgeyFpc0xvZ2ljR3JhcGhTdWJWaWV3ICYmIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLWF1dG8gYWJzb2x1dGUgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiBib3R0b20tNCB6LTIwIHctWzk1dnddIG1heC13LVsxMDIwcHhdIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTIwMFwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHRyYW5zZm9ybTogZG9ja0NvbGxhcHNlZCA/ICd0cmFuc2xhdGUoLTUwJSwgY2FsYygxMDAlIC0gMzZweCkpJyA6ICd0cmFuc2xhdGUoLTUwJSwgMCknLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7c2hvd0xpdmVDb2FjaG1hcmtzICYmICFkb2NrQ29sbGFwc2VkICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWItMiBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHB4LTQgcHktMiByb3VuZGVkLWxnIGJnLWFtYmVyLTUwMCB0ZXh0LXNsYXRlLTk1MCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDMuIERvbG55IFBhbmVsIFN0ZXJvd2FuaWE6IFByemVjacSFZ2FqIG1vZGVsZSB6IFBhbGV0eSAoMSksIHdncnl3YWogZ3JhZmlraSBpIGtvbG9yeSB3IEluc3Bla3RvcnplICgyKSBsdWIgxYLEhWN6IGxpbmllIHphbGXFvG5vxZtjaSB3IEdyYWZpZSBMb2dpa2kgKDMpIVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93TGl2ZUNvYWNobWFya3MoZmFsc2UpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctc2xhdGUtOTUwIHRleHQtYW1iZXItMzAwIHRleHQtWzExcHhdXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFVrcnlqIHBvZHBvd2llZHppXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBDb2xsYXBzZSAvIEV4cGFuZCBIYW5kbGUgQmFyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB4LTQgcHktMS41IHJvdW5kZWQtdC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1iLTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZSBtYXgtdy1bNTAwcHhdIHRleHQtc2xhdGUtMzAwXCI+e3BsYXlGZWVkfTwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgey8qIFdvcmxkIEF0bW9zcGhlcmUgUXVpY2sgQmVhdXRpZmllciBQcmVzZXRzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBsZzpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIG1yLTEgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxQYWxldHRlIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnS2xpbWF0IMWbd2lhdGE6JyA6ICdBdG1vc3BoZXJlOid9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5QXRtb3NwaGVyZVByZXNldCgweDA5MGQxNil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEtvc21vc1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5QXRtb3NwaGVyZVByZXNldCgweDFlMWI0Yil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLWluZGlnby05NTAgaG92ZXI6YmctaW5kaWdvLTkwMCB0ZXh0LWluZGlnby0yMDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIE1nxYJhd2ljYVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5QXRtb3NwaGVyZVByZXNldCgweDA0MmYyZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXRlYWwtOTUwIGhvdmVyOmJnLXRlYWwtOTAwIHRleHQtdGVhbC0yMDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFpvcnphXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZVVwbG9hZFRhcmdldCgnc2t5Ym94Jyk7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlVGV4dHVyZUlucHV0UmVmLmN1cnJlbnQ/LmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1hbWJlci01MDAvMjAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgdGV4dC1hbWJlci0zMDAgaG92ZXI6YmctYW1iZXItNTAwLzMwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICArIFfFgmFzbmUgTmllYm8gKC5KUEcpXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXREb2NrQ29sbGFwc2VkKChjKSA9PiAhYyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMi41IHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1hbWJlci0zMDAgZm9udC1tZWRpdW0gd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2RvY2tDb2xsYXBzZWQgPyA8Q2hldnJvblVwIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gOiA8Q2hldnJvbkRvd24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICB7ZG9ja0NvbGxhcHNlZFxuICAgICAgICAgICAgICAgICAgPyBsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICAgID8gJ1Bva2HFvCBwYW5lbCAoSCknXG4gICAgICAgICAgICAgICAgICAgIDogJ1Nob3cgRG9jayAoSCknXG4gICAgICAgICAgICAgICAgICA6IGxhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgID8gJ1VrcnlqIHBhbmVsIChIKSdcbiAgICAgICAgICAgICAgICAgIDogJ0hpZGUgRG9jayAoSCknfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1haW4gRG9jayBCb2R5ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtYi14bCBwLTQgc2hhZG93LTJ4bFwiPlxuICAgICAgICAgICAgey8qIFNlZ21lbnRlZCBEb2NrIE1vZGUgVGFicyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBwYi0zIG1iLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMSBwLTEgYmctc2xhdGUtOTUwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVEb2NrVGFiKCdwYWxldHRlJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbWQgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRG9ja1RhYiA9PT0gJ3BhbGV0dGUnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJzEuIFBhbGV0YSBPYmlla3TDs3cgKFByemVjacSFZ25paiknIDogJzEuIE9iamVjdCBQYWxldHRlIChEcmFnICYgRHJvcCknfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZURvY2tUYWIoJ2luc3BlY3RvcicpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLW1kIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZURvY2tUYWIgPT09ICdpbnNwZWN0b3InXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJzIuIEdyYWZpa2EsIEtvbG9yeSBpIEluc3Bla3RvciBQQlInIDogJzIuIEdyYXBoaWNzICYgUEJSIEluc3BlY3Rvcid9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlRG9ja1RhYignbG9naWMnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVEb2NrVGFiID09PSAnbG9naWMnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICAgID8gYDMuIFdpenVhbG55IEdyYWYgTG9naWtpICgke2xvZ2ljTm9kZXMubGVuZ3RofSlgXG4gICAgICAgICAgICAgICAgICAgIDogYDMuIFZpc3VhbCBMb2dpYyBHcmFwaCAoJHtsb2dpY05vZGVzLmxlbmd0aH0pYH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVEb2NrVGFiKCdtb2JpbGUnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVEb2NrVGFiID09PSAnbW9iaWxlJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICc0LiBHcmEgbmEgVGVsZWZvbmllIC8gVGFibGVjaWUnIDogJzQuIFBob25lICYgVGFibGV0IENvbmZpZyd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHtzZWxlY3RlZE9iamVjdCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2VVcGxvYWRUYXJnZXQoJ29iamVjdCcpO1xuICAgICAgICAgICAgICAgICAgICAgIGltYWdlVGV4dHVyZUlucHV0UmVmLmN1cnJlbnQ/LmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgYmctc2t5LTUwMC8xNSBib3JkZXIgYm9yZGVyLXNreS01MDAvNDAgdGV4dC1za3ktMzAwIGhvdmVyOmJnLXNreS01MDAvMjUgdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8SW1hZ2VJY29uIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnV2dyYWogR3JhZmlrxJkgbmEgT2JpZWt0JyA6ICdVcGxvYWQgVGV4dHVyZSBJbWFnZSd9XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25PcGVuQWlTdHVkaW9Gb3JTZWxlY3RlZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1hbWJlci01MDAvMTUgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgdGV4dC1hbWJlci0zMDAgaG92ZXI6YmctYW1iZXItNTAwLzI1IHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnR2VuZXJhdG9yIEdyYWZpa2kgQUknIDogJ0FJIFRleHR1cmUgU3R1ZGlvJ31cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0T2JqZWN0cygocHJldikgPT4gcHJldi5maWx0ZXIoKG8pID0+IG8uaWQgIT09IHNlbGVjdGVkT2JqZWN0LmlkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRPYmplY3RJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1yb3NlLTk1MC82MCBib3JkZXIgYm9yZGVyLXJvc2UtODAwLzYwIHRleHQtcm9zZS0zMDAgaG92ZXI6Ymctcm9zZS05MDAvNzAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICB0aXRsZT17bGFuZyA9PT0gJ3BsJyA/ICdVc3XFhCBvYmlla3QgemUgc2NlbnknIDogJ0RlbGV0ZSBhY3Rvcid9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFRBQiAxOiBEUkFHICYgRFJPUCBPQkpFQ1QgUEFMRVRURSAqL31cbiAgICAgICAgICAgIHthY3RpdmVEb2NrVGFiID09PSAncGFsZXR0ZScgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgbWQ6Z3JpZC1jb2xzLTcgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgIHsoXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ3JvdmVyJywgbGFiZWxQbDogJ8WBYXppayBYUiAoOCBjei4pJywgbGFiZWxFbjogJ1hSIFJvdmVyICg4IHB0cyknLCBtZXRhOiAnMSw0MjAgdHJpcycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAndHVycmV0JywgbGFiZWxQbDogJ1dpZcW8eWN6a2EgKDYgY3ouKScsIGxhYmVsRW46ICdUdXJyZXQgKDYgcHRzKScsIG1ldGE6ICcxLDE4MCB0cmlzJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHR5cGU6ICdwb3J0YWwnLCBsYWJlbFBsOiAnUG9ydGFsIFZSICg1IGN6LiknLCBsYWJlbEVuOiAnVlIgUG9ydGFsICg1IHB0cyknLCBtZXRhOiAnMSw2NDAgdHJpcycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnY3J5c3RhbCcsIGxhYmVsUGw6ICdLcnlzenRhxYIgKDQgY3ouKScsIGxhYmVsRW46ICdDcnlzdGFsICg0IHB0cyknLCBtZXRhOiAnNjgwIHRyaXMnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdHlwZTogJ2hhYml0YXQnLCBsYWJlbFBsOiAnQmF6YSBIYWIgKDUgY3ouKScsIGxhYmVsRW46ICdIYWJpdGF0ICg1IHB0cyknLCBtZXRhOiAnMSw4OTAgdHJpcycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0eXBlOiAnZHJvbmUnLCBsYWJlbFBsOiAnRHJvbiA2LURvRiAoNSBjei4pJywgbGFiZWxFbjogJzYtRG9GIERyb25lJywgbWV0YTogJzk2MCB0cmlzJyB9LFxuICAgICAgICAgICAgICAgICAgXSBhcyB7IHR5cGU6IE1vZGVsQ2F0ZWdvcnk7IGxhYmVsUGw6IHN0cmluZzsgbGFiZWxFbjogc3RyaW5nOyBtZXRhOiBzdHJpbmcgfVtdXG4gICAgICAgICAgICAgICAgKS5tYXAoKGVudHJ5KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGtleT17ZW50cnkudHlwZX1cbiAgICAgICAgICAgICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGUuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2FwcGxpY2F0aW9uL3ZvcnRleC1tb2RlbCcsIGVudHJ5LnR5cGUpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzcGF3bk5ld09iamVjdChlbnRyeS50eXBlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgY3Vyc29yLXBvaW50ZXIgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLWFtYmVyLTUwMC82MCBwLTIuNSB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTEwMCBncm91cC1ob3Zlcjp0ZXh0LWFtYmVyLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2xhbmcgPT09ICdwbCcgPyBlbnRyeS5sYWJlbFBsIDogZW50cnkubGFiZWxFbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgc2hyaW5rLTAgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xLjUgdGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2VudHJ5Lm1ldGF9IMK3IHtsYW5nID09PSAncGwnID8gJ1ByemVjacSFZ25paicgOiAnRHJhZy9DbGljayd9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSl9XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImN1cnNvci1wb2ludGVyIHJvdW5kZWQtbGcgYmctYW1iZXItNTAwLzEwIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1hbWJlci01MDAvNTAgaG92ZXI6YmctYW1iZXItNTAwLzIwIHAtMi41IHRyYW5zaXRpb24tY29sb3JzIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHRleHQtbGVmdFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtYW1iZXItMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2xhbmcgPT09ICdwbCcgPyAnV8WCYXNueSAzRCcgOiAnQ3VzdG9tIDNEJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxVcGxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEuNSB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1hbWJlci0yMDAvODBcIj5cbiAgICAgICAgICAgICAgICAgICAgLk9CSiDCtyAuR0xURiDCtyAuSlNPTlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIFRBQiAyOiBTRUxFQ1RFRCBPQkpFQ1QsIEdSQVBISUNTIFVQTE9BRCAmIFBCUiBJTlNQRUNUT1IgKi99XG4gICAgICAgICAgICB7YWN0aXZlRG9ja1RhYiA9PT0gJ2luc3BlY3RvcicgJiYgKFxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZE9iamVjdCA/IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtNCBnYXAtNCBpdGVtcy1jZW50ZXIgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdOYXp3YSBPYmlla3R1IGkgVGVrc3R1cmEnIDogJ0FjdG9yIE5hbWUgJiBHcmFwaGljJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPYmplY3QubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVTZWxlY3RlZFByb3AoJ25hbWUnLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yLjUgcHktMS41IHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtd2hpdGUgZm9udC1tZWRpdW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZVVwbG9hZFRhcmdldCgnb2JqZWN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VUZXh0dXJlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEuNSByb3VuZGVkIGJnLWFtYmVyLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2xhbmcgPT09ICdwbCcgPyAnV2dyYWogd8WCYXNueSBwbGlrIGdyYWZpY3pueSAuUE5HLy5KUEcgbmEgdGVuIG9iaWVrdCcgOiAnVXBsb2FkIGN1c3RvbSBpbWFnZSB0ZXh0dXJlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBHcmFmaWthXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS00MDAgbWItMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1vdmUgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdQb3p5Y2phIFggLyBaIChtKScgOiAnUG9zaXRpb24gWCAvIFogKG0pJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD1cIjAuNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9iamVjdC5wb3NpdGlvblswXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkUHJvcCgncG9zaXRpb24nLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKSB8fCAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRPYmplY3QucG9zaXRpb25bMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9iamVjdC5wb3NpdGlvblsyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMS41IHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RlcD1cIjAuNVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9iamVjdC5wb3NpdGlvblsyXX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkUHJvcCgncG9zaXRpb24nLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZE9iamVjdC5wb3NpdGlvblswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkT2JqZWN0LnBvc2l0aW9uWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSkgfHwgMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMS41IHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS00MDAgbWItMSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxSb3RhdGVDdyBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnT2Jyw7N0IFkgLyBTa2FsYScgOiAnUm90YXRpb24gWSAvIFNjYWxlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRPYmplY3Qucm90YXRpb25ZfcKwIMK3IHtzZWxlY3RlZE9iamVjdC5zY2FsZS50b0ZpeGVkKDEpfXhcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9XCIzNjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPYmplY3Qucm90YXRpb25ZfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZVNlbGVjdGVkUHJvcCgncm90YXRpb25ZJywgTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFjY2VudC1hbWJlci01MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49XCIwLjRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9XCIyLjVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGVwPVwiMC4xXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkT2JqZWN0LnNjYWxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHVwZGF0ZVNlbGVjdGVkUHJvcCgnc2NhbGUnLCBOdW1iZXIoZS50YXJnZXQudmFsdWUpKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWNjZW50LWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnS29sb3J5IFBCUiBpIFJ1Y2ggT2JpZWt0dScgOiAnUEJSIENvbG9ycyAmIE1vdGlvbid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjb2xvclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9iamVjdC5jb2xvcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB1cGRhdGVTZWxlY3RlZFByb3AoJ2NvbG9yJywgZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHJvdW5kZWQgYmctdHJhbnNwYXJlbnQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY29sb3JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRPYmplY3Quc2Vjb25kYXJ5Q29sb3J9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gdXBkYXRlU2VsZWN0ZWRQcm9wKCdzZWNvbmRhcnlDb2xvcicsIGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyByb3VuZGVkIGJnLXRyYW5zcGFyZW50IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzZWxlY3RlZE9iamVjdC5hbmltYXRpb24udHJhamVjdG9yeVR5cGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFByb3AoJ2FuaW1hdGlvbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnNlbGVjdGVkT2JqZWN0LmFuaW1hdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYWplY3RvcnlUeXBlOiBlLnRhcmdldC52YWx1ZSBhcyBhbnksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHgtMiBweS0xLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJub25lXCI+e2xhbmcgPT09ICdwbCcgPyAnU3RhdHljem55JyA6ICdTdGF0aWMnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiaG92ZXJcIj57bGFuZyA9PT0gJ3BsJyA/ICdMZXdpdGFjamEgKEhvdmVyKScgOiAnSG92ZXInfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3BpblwiPntsYW5nID09PSAncGwnID8gJ09icsOzdCAzNjDCsCAoU3BpbiknIDogJ1NwaW4gMzYwwrAnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib3JiaXRcIj57bGFuZyA9PT0gJ3BsJyA/ICdPcmJpdGEgS2/Fgm93YScgOiAnQ2lyY3VsYXIgT3JiaXQnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZmlndXJlOFwiPntsYW5nID09PSAncGwnID8gJ1RyYWpla3RvcmlhIDgnIDogJ0ZpZ3VyZS04IFBhdGgnfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicHVsc2VcIj57bGFuZyA9PT0gJ3BsJyA/ICdQdWxzb3dhbmllIFNrYWxpJyA6ICdTY2FsZSBQdWxzZSd9PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIHB5LTJcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdLbGlrbmlqIGRvd29sbnkgb2JpZWt0IDNEIG5hIHNjZW5pZSwgYWJ5IHdncmHEhyBuYSBuaWVnbyB3xYJhc27EhSBncmFmaWvEmSwgem1pZW5pxIcga29sb3J5IFBCUiBsdWIgcHJ6eXBpc2HEhyB0ZWtzdHVyxJkgQUkuJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ0NsaWNrIGFueSAzRCBhY3RvciBpbiB0aGUgdmlld3BvcnQgdG8gdXBsb2FkIGEgY3VzdG9tIGdyYXBoaWMsIG1vZGlmeSBQQlIgY29sb3JzLCBvciBhcHBseSBhbiBBSSB0ZXh0dXJlLid9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHsvKiBUQUIgMzogVklTVUFMIE5PREUgREVQRU5ERU5DWSAmIENPTk5FQ1RJT04gRURJVE9SIChSZXBsYWNlcyBsaXN0LWJhc2VkIFVJKSAqL31cbiAgICAgICAgICAgIHthY3RpdmVEb2NrVGFiID09PSAnbG9naWMnICYmIChcbiAgICAgICAgICAgICAgPFZpc3VhbExvZ2ljR3JhcGhFZGl0b3JcbiAgICAgICAgICAgICAgICBsYW5nPXtsYW5nfVxuICAgICAgICAgICAgICAgIGxvZ2ljTm9kZXM9e2xvZ2ljTm9kZXN9XG4gICAgICAgICAgICAgICAgc2V0TG9naWNOb2Rlcz17c2V0TG9naWNOb2Rlc31cbiAgICAgICAgICAgICAgICBvYmplY3RzPXtvYmplY3RzfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkT2JqZWN0SWQ9e3NlbGVjdGVkT2JqZWN0SWR9XG4gICAgICAgICAgICAgICAgaXNFeHBhbmRlZFN1YlZpZXc9e2ZhbHNlfVxuICAgICAgICAgICAgICAgIHNldElzRXhwYW5kZWRTdWJWaWV3PXtzZXRJc0xvZ2ljR3JhcGhTdWJWaWV3fVxuICAgICAgICAgICAgICAgIG9uVHJpZ2dlck5vZGVDYXNjYWRlPXsobm9kZUlkKSA9PiBleGVjdXRlTm9kZUFuZENhc2NhZGUobm9kZUlkKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHsvKiBUQUIgNDogU1RBTkRBTE9ORSBNT0JJTEUgJiBUQUJMRVQgUExBWSBDT05GSUdVUkFUSU9OICovfVxuICAgICAgICAgICAge2FjdGl2ZURvY2tUYWIgPT09ICdtb2JpbGUnICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy00IGdhcC0zIHRleHQteHMgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMCBmb250LW1lZGl1bSBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ1RyeWIgVGVsZWZvbiAvIFRhYmxldCAoQmV6IEdvZ2xpKScgOiAnSGVhZHNldC1GcmVlIE1vYmlsZSBQbGF5J308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17bW9iaWxlQ29uZmlnLnBsYXlXaXRob3V0SGVhZHNldH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2JpbGVDb25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIHBsYXlXaXRob3V0SGVhZHNldDogZS50YXJnZXQuY2hlY2tlZCB9KSlcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWNjZW50LWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdBa3R5d3VqZSB3aXJ0dWFsbmUgZHLEhcW8a2kgTXVsdGktVG91Y2ggb3JheiDFvHlyb3Nrb3AgRGV2aWNlT3JpZW50YXRpb24uJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ0VuYWJsZXMgb24tc2NyZWVuIE11bHRpLVRvdWNoIHN0aWNrcyBhbmQgRGV2aWNlT3JpZW50YXRpb24gZ3lyby4nfVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1NjaGVtYXQgU3Rlcm93YW5pYSBNb2JpbG5lZ28nIDogJ01vYmlsZSBDb250cm9sIFNjaGVtZSd9XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bW9iaWxlQ29uZmlnLmNvbnRyb2xTY2hlbWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBzZXRNb2JpbGVDb25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIGNvbnRyb2xTY2hlbWU6IGUudGFyZ2V0LnZhbHVlIGFzIGFueSB9KSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMi41IHB5LTEuNSByb3VuZGVkIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImd5cm9fdG91Y2hcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICfFu3lyb3Nrb3AgMzYwwrAgKyBEb3R5ayAoVGVsZWZvbi9UYWJsZXQpJyA6ICczNjDCsCBHeXJvc2NvcGUgKyBUb3VjaCd9XG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZHVhbF90b3VjaF9zdGlja3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdQb2R3w7NqbmUgRHLEhcW8a2kgRWtyYW5vd2UgKFRhYmxldCknIDogJ0R1YWwgVmlydHVhbCBUb3VjaCBKb3lzdGlja3MnfVxuICAgICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNhcmRib2FyZF9zcGxpdFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0FkYXB0ZXIgQ2FyZGJvYXJkIFNwbGl0LVNjcmVlbiBWUicgOiAnQ2FyZGJvYXJkIFNwbGl0LVNjcmVlbiBWUid9XG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ1JvenN0YXcgxblyZW5pYyAoSVBEKSAvIFBvbGUgV2lkemVuaWEnIDogJ0lQRCAvIEZpZWxkIG9mIFZpZXcnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtYW1iZXItMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge21vYmlsZUNvbmZpZy5pcGRNbX1tbSDCtyB7bW9iaWxlQ29uZmlnLmZvdkRlZ3JlZXN9wrBcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgICAgICAgIG1pbj1cIjU0XCJcbiAgICAgICAgICAgICAgICAgICAgICBtYXg9XCI3MlwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e21vYmlsZUNvbmZpZy5pcGRNbX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRNb2JpbGVDb25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIGlwZE1tOiBOdW1iZXIoZS50YXJnZXQudmFsdWUpIH0pKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhY2NlbnQtYW1iZXItNTAwXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgICBtaW49XCI1MFwiXG4gICAgICAgICAgICAgICAgICAgICAgbWF4PVwiMTA1XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bW9iaWxlQ29uZmlnLmZvdkRlZ3JlZXN9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmb3YgPSBOdW1iZXIoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TW9iaWxlQ29uZmlnKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBmb3ZEZWdyZWVzOiBmb3YgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbWVyYVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbWVyYVJlZi5jdXJyZW50LmZvdiA9IGZvdjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FtZXJhUmVmLmN1cnJlbnQudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWNjZW50LWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcC0yLjUgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWFtYmVyLTMwMCBtYi0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnTW/FvGxpd2/Fm2NpIEtvbmZpZ3VyYWNqaTonIDogJ0NvbmZpZ3VyYXRpb24gQ2FwYWJpbGl0aWVzOid9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnaU9TIC8gQW5kcm9pZCBXZWJHTDIsIHNrYWxvd2FuaWUgRFBSIDUwLTEwMCUsIGJsb2thZGEgb3JpZW50YWNqaSBwb3ppb21laiwga2FsaWJyYWNqYSBkcnlmdSDFvHlyb3Nrb3B1LidcbiAgICAgICAgICAgICAgICAgICAgICA6ICdpT1MgLyBBbmRyb2lkIFdlYkdMMiwgNTAtMTAwJSBEUFIgc2NhbGluZywgbGFuZHNjYXBlIGxvY2ssIGd5cm8gZHJpZnQgY2FsaWJyYXRpb24uJ31cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=