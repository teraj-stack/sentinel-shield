import * as THREE from "/apps/holoarch_studio/node_modules/.vite/deps/three.js?v=c1c4f681";
import { jsPDF } from "/apps/holoarch_studio/node_modules/.vite/deps/jspdf.js?v=c1c4f681";
import { ARCHITECTURAL_SCENES, HOLOGRAM_PALETTES, SUPPORTED_MOBILE_DEVICES, generateMasterPrompt } from "/apps/holoarch_studio/src/data/arStudioData.ts";
/**
* Exports a Three.js Group containing architectural building meshes to Wavefront .OBJ format
*/
export function exportGroupToOBJ(group, filename) {
	const lines = [];
	lines.push("# HoloArch AR Studio - Wavefront OBJ Architectural Export");
	lines.push(`# Generated: ${new Date().toISOString()}`);
	lines.push(`o ${filename.replace(/\.obj$/i, "")}`);
	let vertexOffset = 1;
	let totalVertices = 0;
	let totalFaces = 0;
	const tempVertex = new THREE.Vector3();
	const tempNormal = new THREE.Vector3();
	const normalMatrix = new THREE.Matrix3();
	group.updateMatrixWorld(true);
	let partIndex = 1;
	group.traverse((child) => {
		if (child instanceof THREE.Mesh && child.geometry) {
			const geom = child.geometry;
			const posAttr = geom.getAttribute("position");
			if (!posAttr) return;
			lines.push(`\ng ArchPart_${partIndex++}_${child.name || "Structure"}`);
			normalMatrix.getNormalMatrix(child.matrixWorld);
			for (let i = 0; i < posAttr.count; i++) {
				tempVertex.fromBufferAttribute(posAttr, i);
				tempVertex.applyMatrix4(child.matrixWorld);
				lines.push(`v ${tempVertex.x.toFixed(5)} ${tempVertex.y.toFixed(5)} ${tempVertex.z.toFixed(5)}`);
				totalVertices++;
			}
			const normAttr = geom.getAttribute("normal");
			if (normAttr) {
				for (let i = 0; i < normAttr.count; i++) {
					tempNormal.fromBufferAttribute(normAttr, i);
					tempNormal.applyMatrix3(normalMatrix).normalize();
					lines.push(`vn ${tempNormal.x.toFixed(5)} ${tempNormal.y.toFixed(5)} ${tempNormal.z.toFixed(5)}`);
				}
			}
			const indexAttr = geom.getIndex();
			if (indexAttr) {
				for (let i = 0; i < indexAttr.count; i += 3) {
					const a = indexAttr.getX(i) + vertexOffset;
					const b = indexAttr.getX(i + 1) + vertexOffset;
					const c = indexAttr.getX(i + 2) + vertexOffset;
					lines.push(`f ${a}//${a} ${b}//${b} ${c}//${c}`);
					totalFaces++;
				}
			} else {
				for (let i = 0; i < posAttr.count; i += 3) {
					const a = i + vertexOffset;
					const b = i + 1 + vertexOffset;
					const c = i + 2 + vertexOffset;
					lines.push(`f ${a}//${a} ${b}//${b} ${c}//${c}`);
					totalFaces++;
				}
			}
			vertexOffset += posAttr.count;
		}
	});
	const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
	triggerDownload(blob, filename.endsWith(".obj") ? filename : `${filename}.obj`);
	return {
		vertexCount: totalVertices,
		faceCount: totalFaces
	};
}
/**
* Exports a Three.js Group containing architectural building meshes to ASCII .STL format
*/
export function exportGroupToSTL(group, filename) {
	const solidName = filename.replace(/\.stl$/i, "").replace(/\s+/g, "_");
	const lines = [`solid ${solidName}`];
	const vA = new THREE.Vector3();
	const vB = new THREE.Vector3();
	const vC = new THREE.Vector3();
	const cb = new THREE.Vector3();
	const ab = new THREE.Vector3();
	let triangleCount = 0;
	group.updateMatrixWorld(true);
	group.traverse((child) => {
		if (child instanceof THREE.Mesh && child.geometry) {
			const geom = child.geometry;
			const posAttr = geom.getAttribute("position");
			if (!posAttr) return;
			const indexAttr = geom.getIndex();
			const count = indexAttr ? indexAttr.count : posAttr.count;
			for (let i = 0; i < count; i += 3) {
				const iA = indexAttr ? indexAttr.getX(i) : i;
				const iB = indexAttr ? indexAttr.getX(i + 1) : i + 1;
				const iC = indexAttr ? indexAttr.getX(i + 2) : i + 2;
				vA.fromBufferAttribute(posAttr, iA).applyMatrix4(child.matrixWorld);
				vB.fromBufferAttribute(posAttr, iB).applyMatrix4(child.matrixWorld);
				vC.fromBufferAttribute(posAttr, iC).applyMatrix4(child.matrixWorld);
				cb.subVectors(vC, vB);
				ab.subVectors(vA, vB);
				cb.cross(ab).normalize();
				lines.push(`  facet normal ${cb.x.toFixed(5)} ${cb.y.toFixed(5)} ${cb.z.toFixed(5)}`);
				lines.push("    outer loop");
				lines.push(`      vertex ${vA.x.toFixed(5)} ${vA.y.toFixed(5)} ${vA.z.toFixed(5)}`);
				lines.push(`      vertex ${vB.x.toFixed(5)} ${vB.y.toFixed(5)} ${vB.z.toFixed(5)}`);
				lines.push(`      vertex ${vC.x.toFixed(5)} ${vC.y.toFixed(5)} ${vC.z.toFixed(5)}`);
				lines.push("    endloop");
				lines.push("  endfacet");
				triangleCount++;
			}
		}
	});
	lines.push(`endsolid ${solidName}`);
	const blob = new Blob([lines.join("\n")], { type: "application/sla;charset=utf-8" });
	triggerDownload(blob, filename.endsWith(".stl") ? filename : `${filename}.stl`);
	return { triangleCount };
}
/**
* Strips Polish diacritics for standard PDF Helvetica font compatibility
*/
function normalizePdfText(str) {
	const map = {
		ą: "a",
		ć: "c",
		ę: "e",
		ł: "l",
		ń: "n",
		ó: "o",
		ś: "s",
		ź: "z",
		ż: "z",
		Ą: "A",
		Ć: "C",
		Ę: "E",
		Ł: "L",
		Ń: "N",
		Ó: "O",
		Ś: "S",
		Ź: "Z",
		Ż: "Z",
		"„": "\"",
		"”": "\"",
		"–": "-",
		"—": "-",
		"±": "+/-",
		"°": " deg"
	};
	return str.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ„”–—±°]/g, (m) => map[m] || m);
}
/**
* Generates an advanced multi-page PDF architectural specification & prompt document
*/
export function exportProjectToPDF(config, screenshotDataUrl) {
	const doc = new jsPDF({
		orientation: "portrait",
		unit: "mm",
		format: "a4"
	});
	const sceneMeta = ARCHITECTURAL_SCENES.find((s) => s.id === config.sceneId) || ARCHITECTURAL_SCENES[0];
	const palette = HOLOGRAM_PALETTES[config.uiSettings.palette];
	const prompts = generateMasterPrompt(config);
	// Header Banner
	doc.setFillColor(11, 15, 23);
	doc.rect(0, 0, 210, 34, "F");
	doc.setTextColor(6, 182, 212);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(16);
	doc.text("HOLOARCH AR STUDIO - SPECYFIKACJA TECHNICZNA & PROMPT", 14, 15);
	doc.setTextColor(203, 213, 225);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9.5);
	doc.text(normalizePdfText(`Scena: ${sceneMeta.name} | Silnik: Unity AR Foundation (ARKit + ARCore) | Data: ${new Date().toLocaleDateString("pl-PL")}`), 14, 24);
	let y = 44;
	// Section 1: Parametry Konfiguracji AR
	doc.setTextColor(15, 23, 42);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(12);
	doc.text("1. Konfiguracja Systemu Hologramow AR i Czujnikow Glebi", 14, y);
	y += 7;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9.5);
	const specs = [
		`Model Architektoniczny: ${sceneMeta.name} (${sceneMeta.realWorldHeightM} m wysokosci, ${sceneMeta.partsCount} modulow)`,
		`Detekcja Powierzchni: ${config.planeDetectionMode} (Czujniki Glebi ToF / LiDAR: ${config.depthSensorActive ? "AKTYWNE" : "Wyl."})`,
		`Oswietlenie Srodowiskowe i Okluzja: HDR Light Estimation (${config.lightTemperatureK}K) | Okluzja: ${config.occlusionEnabled ? "TAK" : "NIE"}`,
		`Efekt Paralaksy 6DoF i Czasteczki: Paralaksa ${(config.parallaxIntensity * 100).toFixed(0)}% | Czasteczki za oknami ${(config.windowParticlesIntensity * 100).toFixed(0)}%`,
		`Sterowanie Dotykowe i Skala: Skala bazowa ${config.modelScale.toFixed(2)}x | Obrot Y: ${config.modelRotationY} deg | Exploded View: ${(config.explodedViewFactor * 100).toFixed(0)}%`,
		`Tryb Offline i Chmura: Offline Cache (${config.offlineModeEnabled ? "TAK" : "NIE"}) | Cloud Sync (${config.cloudSyncEnabled ? "TAK" : "NIE"})`,
		`Wsparcie Eksportu: OBJ (${config.exportFormats.obj ? "TAK" : "NIE"}), STL (${config.exportFormats.stl ? "TAK" : "NIE"}), PDF (Aktywny) | Paleta UI: ${palette.name}`
	];
	specs.forEach((line) => {
		doc.text(normalizePdfText(`• ${line}`), 16, y);
		y += 5.5;
	});
	// Optional embedded 3D viewport snapshot
	if (screenshotDataUrl && screenshotDataUrl.startsWith("data:image/")) {
		y += 3;
		doc.setFont("helvetica", "bold");
		doc.setFontSize(11);
		doc.text("Podglad Widoku Hologramu 3D (Zrzut z Symulatora):", 14, y);
		y += 4;
		try {
			doc.addImage(screenshotDataUrl, "PNG", 14, y, 115, 64);
			y += 70;
		} catch {
			y += 6;
		}
	} else {
		y += 4;
	}
	// Section 2: Master Prompt
	doc.setFont("helvetica", "bold");
	doc.setFontSize(12);
	doc.text("2. Gotowy Prompt Systemowy i Architektoniczny (PL / EN)", 14, y);
	y += 6;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(8.5);
	const rawPrompt = config.uiSettings.promptLanguage === "pl" ? prompts.systemPromptPL : prompts.systemPromptEN;
	const cleanPrompt = normalizePdfText(rawPrompt.replace(/### /g, "").replace(/\*\*/g, ""));
	const wrappedLines = doc.splitTextToSize(cleanPrompt, 182);
	wrappedLines.forEach((line) => {
		if (y > 280) {
			doc.addPage();
			y = 18;
		}
		doc.text(line, 14, y);
		y += 4.2;
	});
	// Section 3: Supported Mobile Devices Table
	if (y > 220) {
		doc.addPage();
		y = 18;
	} else {
		y += 8;
	}
	doc.setFont("helvetica", "bold");
	doc.setFontSize(12);
	doc.text("3. Lista Wspieranych Urzadzen Mobilnych (Smartfony i Tablety Android / iOS)", 14, y);
	y += 7;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(8.5);
	SUPPORTED_MOBILE_DEVICES.forEach((dev) => {
		if (y > 280) {
			doc.addPage();
			y = 18;
		}
		const devLine = `${dev.brand} ${dev.model} [${dev.formFactor}] - ${dev.depthSensor} | ${dev.planeDetectionAccuracy} (${dev.targetFps} FPS)`;
		doc.text(normalizePdfText(`• ${devLine}`), 16, y);
		y += 5;
	});
	doc.save(`HoloArch_AR_Specyfikacja_${config.sceneId}.pdf`);
}
function triggerDownload(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function createProceduralSceneGroup(config) {
	const group = new THREE.Group();
	const hMult = config.towerHeightMultiplier || 1;
	const scale = config.modelScale || 1;
	if (config.sceneId === "eco_atrium") {
		const dome = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4 * scale, 2));
		dome.name = "Geodesic_Atrium_Dome";
		dome.position.set(0, .9 * hMult, 0);
		group.add(dome);
	} else if (config.sceneId === "aero_hub") {
		const roof = new THREE.Mesh(new THREE.BoxGeometry(2.8 * scale, .35 * hMult, 1.6 * scale));
		roof.name = "Aero_Terminal_Span";
		roof.position.set(0, 1.1 * hMult, 0);
		group.add(roof);
	} else if (config.sceneId === "crystal_stacked_prism") {
		for (let i = 0; i < 6; i++) {
			const slab = new THREE.Mesh(new THREE.BoxGeometry((1.6 - i * .08) * scale, .16 * hMult, (1.2 - i * .05) * scale));
			slab.name = `Crystal_Glass_Slab_0${i + 1}`;
			slab.position.set((i % 2 - .5) * .15, (.2 + i * .34) * hMult * scale, 0);
			group.add(slab);
		}
	} else if (config.sceneId === "voronoi_bionic_spire") {
		const spire = new THREE.Mesh(new THREE.CylinderGeometry(.35 * scale, .85 * scale, 3.1 * hMult * scale, 16, 8));
		spire.name = "Voronoi_Helix_Spire_325m";
		spire.position.set(0, 1.55 * hMult * scale, 0);
		group.add(spire);
	} else if (config.sceneId === "kinetic_calatrava_wing") {
		for (let r = 0; r < 8; r++) {
			const rib = new THREE.Mesh(new THREE.BoxGeometry((1.2 + Math.sin(r / 7 * Math.PI) * .8) * scale, .14 * hMult, .14 * scale));
			rib.name = `Kinetic_Titanium_Rib_0${r + 1}`;
			rib.position.set(0, (.3 + r * .32) * hMult * scale, 0);
			rib.rotation.y = r * .12;
			group.add(rib);
		}
	} else if (config.sceneId === "hydro_aqua_sculpture") {
		const vessel = new THREE.Mesh(new THREE.CylinderGeometry(1.2 * scale, 1.1 * scale, .8 * hMult * scale, 24));
		vessel.name = "Hydro_Crystal_Vessel";
		vessel.position.set(0, .4 * hMult * scale, 0);
		group.add(vessel);
		const splash = new THREE.Mesh(new THREE.IcosahedronGeometry(.65 * scale, 2));
		splash.name = "Liquid_Splash_Crest";
		splash.position.set(0, 1.8 * hMult * scale, 0);
		group.add(splash);
	} else {
		const coreTower = new THREE.Mesh(new THREE.BoxGeometry(.85 * scale, 2.6 * hMult * scale, .85 * scale));
		coreTower.name = "Skyline_Main_Spire";
		coreTower.position.set(0, 1.3 * hMult * scale, 0);
		group.add(coreTower);
		const wingTower = new THREE.Mesh(new THREE.BoxGeometry(.65 * scale, 1.8 * hMult * scale, .65 * scale));
		wingTower.name = "Skyline_East_Tower";
		wingTower.position.set(1.1 * scale, .9 * hMult * scale, .3 * scale);
		group.add(wingTower);
	}
	group.updateMatrixWorld(true);
	return group;
}
/**
* Exports a Khronos glTF 2.0 (.gltf) JSON scene asset with PBR Metallic-Roughness & IOR Transmission extensions
*/
export function exportProjectToGLTF(config) {
	const group = createProceduralSceneGroup(config);
	const nodes = [];
	group.traverse((child) => {
		if (child instanceof THREE.Mesh) {
			nodes.push({
				name: child.name || "HoloArch_Node",
				translation: [
					Number(child.position.x.toFixed(4)),
					Number(child.position.y.toFixed(4)),
					Number(child.position.z.toFixed(4))
				],
				scale: [
					Number(child.scale.x.toFixed(4)),
					Number(child.scale.y.toFixed(4)),
					Number(child.scale.z.toFixed(4))
				],
				extras: {
					holoArchScene: config.sceneId,
					lightTemperatureK: config.lightTemperatureK,
					extensions: config.activeExtensions || []
				}
			});
		}
	});
	const gltfJson = {
		asset: {
			version: "2.0",
			generator: "HoloArch AR Studio - Khronos glTF 2.0 + KHR_materials_transmission Exporter",
			copyright: `HoloArch AR Studio (${new Date().getFullYear()})`
		},
		extensionsUsed: [
			"KHR_materials_transmission",
			"KHR_materials_ior",
			"KHR_materials_volume",
			"KHR_materials_emissive_strength"
		],
		scene: 0,
		scenes: [{
			name: `HoloArch_${config.sceneId}`,
			nodes: nodes.map((_, idx) => idx)
		}],
		nodes,
		materials: [{
			name: "HoloArch_Optical_Crystal_Glass",
			pbrMetallicRoughness: {
				baseColorFactor: [
					.024,
					.714,
					.831,
					.82
				],
				metallicFactor: .15,
				roughnessFactor: .08
			},
			extensions: {
				KHR_materials_transmission: { transmissionFactor: .92 },
				KHR_materials_ior: { ior: 1.52 },
				KHR_materials_emissive_strength: { emissiveStrength: 1.8 }
			}
		}]
	};
	const blob = new Blob([JSON.stringify(gltfJson, null, 2)], { type: "model/gltf+json;charset=utf-8" });
	triggerDownload(blob, `HoloArch_${config.sceneId}_PBR.gltf`);
	return { nodeCount: nodes.length };
}
/**
* Exports an ISO-10303-21 STEP / BIM Industry Foundation Classes (.IFC) Level 400 file
*/
export function exportProjectToIFC(config) {
	const sceneMeta = ARCHITECTURAL_SCENES.find((s) => s.id === config.sceneId) || ARCHITECTURAL_SCENES[0];
	const nowIso = new Date().toISOString().slice(0, 19);
	const ifcContent = [
		"ISO-10303-21;",
		"HEADER;",
		`FILE_DESCRIPTION(('ViewDefinition [CoordinationView_V2.0]','HoloArch AR Level 400 BIM'),'2;1');`,
		`FILE_NAME('HoloArch_${config.sceneId}.ifc','${nowIso}',('HoloArch Architect'),('HoloArch AR Studio'),'IFC4','HoloArch BIM Exporter','');`,
		`FILE_SCHEMA(('IFC4'));`,
		"ENDSEC;",
		"DATA;",
		`#10=IFCPROJECT('0HoloArch${config.sceneId.slice(0, 8)}',#12,'${normalizePdfText(sceneMeta.name)}','${normalizePdfText(sceneMeta.subtitle)}',$,$,$,(#20),#30);`,
		`#12=IFCOWNERHISTORY(#14,#16,$,.NOCHANGE.,$,$,$,1730000000);`,
		`#40=IFCSITE('1Site_${config.sceneId}',#12,'AR_Tabletop_Floor_Anchor',$,$,$,$,$,.ELEMENT.,(52,13,47),(21,0,42),115.,$,$);`,
		`#50=IFCBUILDING('2Bldg_${config.sceneId}',#12,'${normalizePdfText(sceneMeta.name)}',$,$,$,$,'${normalizePdfText(sceneMeta.architecturalStyle)}',.ELEMENT.,${sceneMeta.realWorldHeightM}.,0.,$);`,
		...sceneMeta.layers.map((layer, idx) => `#${100 + idx}=IFCBUILDINGSTOREY('3Lvl_0${idx + 1}',#12,'${normalizePdfText(layer)}',$,$,$,$,$,.ELEMENT.,${(idx * (sceneMeta.realWorldHeightM / 4)).toFixed(1)});`),
		"ENDSEC;",
		"END-ISO-10303-21;"
	].join("\n");
	const blob = new Blob([ifcContent], { type: "application/x-step;charset=utf-8" });
	triggerDownload(blob, `HoloArch_BIM_${config.sceneId}.ifc`);
}
export function generateOBJContent(config) {
	const group = createProceduralSceneGroup(config);
	const lines = [
		"# HoloArch AR Studio - Google Drive Cloud Export (.OBJ)",
		`# Scene: ${config.sceneId} | Scale: ${config.modelScale}x | Height: ${config.towerHeightMultiplier}x`,
		`o HoloArch_${config.sceneId}`
	];
	let vertexOffset = 1;
	const tempVertex = new THREE.Vector3();
	group.traverse((child) => {
		if (child instanceof THREE.Mesh && child.geometry) {
			const geom = child.geometry;
			const posAttr = geom.getAttribute("position");
			if (!posAttr) return;
			lines.push(`g ${child.name || "ArchMesh"}`);
			for (let i = 0; i < posAttr.count; i++) {
				tempVertex.fromBufferAttribute(posAttr, i).applyMatrix4(child.matrixWorld);
				lines.push(`v ${tempVertex.x.toFixed(5)} ${tempVertex.y.toFixed(5)} ${tempVertex.z.toFixed(5)}`);
			}
			const indexAttr = geom.getIndex();
			if (indexAttr) {
				for (let i = 0; i < indexAttr.count; i += 3) {
					const a = indexAttr.getX(i) + vertexOffset;
					const b = indexAttr.getX(i + 1) + vertexOffset;
					const c = indexAttr.getX(i + 2) + vertexOffset;
					lines.push(`f ${a} ${b} ${c}`);
				}
			}
			vertexOffset += posAttr.count;
		}
	});
	return lines.join("\n");
}
export function generateSTLContent(config) {
	const group = createProceduralSceneGroup(config);
	const solidName = `HoloArch_${config.sceneId}`;
	const lines = [`solid ${solidName}`];
	const vA = new THREE.Vector3();
	const vB = new THREE.Vector3();
	const vC = new THREE.Vector3();
	const cb = new THREE.Vector3();
	const ab = new THREE.Vector3();
	group.traverse((child) => {
		if (child instanceof THREE.Mesh && child.geometry) {
			const geom = child.geometry;
			const posAttr = geom.getAttribute("position");
			if (!posAttr) return;
			const indexAttr = geom.getIndex();
			const count = indexAttr ? indexAttr.count : posAttr.count;
			for (let i = 0; i < count; i += 3) {
				const iA = indexAttr ? indexAttr.getX(i) : i;
				const iB = indexAttr ? indexAttr.getX(i + 1) : i + 1;
				const iC = indexAttr ? indexAttr.getX(i + 2) : i + 2;
				vA.fromBufferAttribute(posAttr, iA).applyMatrix4(child.matrixWorld);
				vB.fromBufferAttribute(posAttr, iB).applyMatrix4(child.matrixWorld);
				vC.fromBufferAttribute(posAttr, iC).applyMatrix4(child.matrixWorld);
				cb.subVectors(vC, vB);
				ab.subVectors(vA, vB);
				cb.cross(ab).normalize();
				lines.push(`  facet normal ${cb.x.toFixed(5)} ${cb.y.toFixed(5)} ${cb.z.toFixed(5)}`);
				lines.push("    outer loop");
				lines.push(`      vertex ${vA.x.toFixed(5)} ${vA.y.toFixed(5)} ${vA.z.toFixed(5)}`);
				lines.push(`      vertex ${vB.x.toFixed(5)} ${vB.y.toFixed(5)} ${vB.z.toFixed(5)}`);
				lines.push(`      vertex ${vC.x.toFixed(5)} ${vC.y.toFixed(5)} ${vC.z.toFixed(5)}`);
				lines.push("    endloop");
				lines.push("  endfacet");
			}
		}
	});
	lines.push(`endsolid ${solidName}`);
	return lines.join("\n");
}

//# sourceMappingURL=data:application/json;base64,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QzNCLE1BQU0sS0FBSyxnQkFBZ0IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHO0lBQ2xGLE1BQU0sS0FBSyxnQkFBZ0IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHO0lBQ2xGLE1BQU0sS0FBSyxnQkFBZ0IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHO0lBQ2xGLE1BQU0sS0FBSyxhQUFhO0lBQ3hCLE1BQU0sS0FBSyxZQUFZO0dBQ3pCO0VBQ0Y7Q0FDRixDQUFDO0NBQ0QsTUFBTSxLQUFLLFlBQVksV0FBVztDQUNsQyxPQUFPLE1BQU0sS0FBSyxJQUFJO0FBQ3hCIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbImV4cG9ydGVycy50cyJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBqc1BERiB9IGZyb20gJ2pzcGRmJztcbmltcG9ydCB7IEFSQ29uZmlnU3RhdGUgfSBmcm9tICcuLi90eXBlcy9hclN0dWRpbyc7XG5pbXBvcnQge1xuICBBUkNISVRFQ1RVUkFMX1NDRU5FUyxcbiAgSE9MT0dSQU1fUEFMRVRURVMsXG4gIFNVUFBPUlRFRF9NT0JJTEVfREVWSUNFUyxcbiAgZ2VuZXJhdGVNYXN0ZXJQcm9tcHQsXG59IGZyb20gJy4uL2RhdGEvYXJTdHVkaW9EYXRhJztcblxuLyoqXG4gKiBFeHBvcnRzIGEgVGhyZWUuanMgR3JvdXAgY29udGFpbmluZyBhcmNoaXRlY3R1cmFsIGJ1aWxkaW5nIG1lc2hlcyB0byBXYXZlZnJvbnQgLk9CSiBmb3JtYXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydEdyb3VwVG9PQkooZ3JvdXA6IFRIUkVFLkdyb3VwLCBmaWxlbmFtZTogc3RyaW5nKToge1xuICB2ZXJ0ZXhDb3VudDogbnVtYmVyO1xuICBmYWNlQ291bnQ6IG51bWJlcjtcbn0ge1xuICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXTtcbiAgbGluZXMucHVzaCgnIyBIb2xvQXJjaCBBUiBTdHVkaW8gLSBXYXZlZnJvbnQgT0JKIEFyY2hpdGVjdHVyYWwgRXhwb3J0Jyk7XG4gIGxpbmVzLnB1c2goYCMgR2VuZXJhdGVkOiAke25ldyBEYXRlKCkudG9JU09TdHJpbmcoKX1gKTtcbiAgbGluZXMucHVzaChgbyAke2ZpbGVuYW1lLnJlcGxhY2UoL1xcLm9iaiQvaSwgJycpfWApO1xuXG4gIGxldCB2ZXJ0ZXhPZmZzZXQgPSAxO1xuICBsZXQgdG90YWxWZXJ0aWNlcyA9IDA7XG4gIGxldCB0b3RhbEZhY2VzID0gMDtcbiAgY29uc3QgdGVtcFZlcnRleCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIGNvbnN0IHRlbXBOb3JtYWwgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBjb25zdCBub3JtYWxNYXRyaXggPSBuZXcgVEhSRUUuTWF0cml4MygpO1xuXG4gIGdyb3VwLnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpO1xuXG4gIGxldCBwYXJ0SW5kZXggPSAxO1xuICBncm91cC50cmF2ZXJzZSgoY2hpbGQpID0+IHtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUSFJFRS5NZXNoICYmIGNoaWxkLmdlb21ldHJ5KSB7XG4gICAgICBjb25zdCBnZW9tID0gY2hpbGQuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgICBjb25zdCBwb3NBdHRyID0gZ2VvbS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJyk7XG4gICAgICBpZiAoIXBvc0F0dHIpIHJldHVybjtcblxuICAgICAgbGluZXMucHVzaChgXFxuZyBBcmNoUGFydF8ke3BhcnRJbmRleCsrfV8ke2NoaWxkLm5hbWUgfHwgJ1N0cnVjdHVyZSd9YCk7XG4gICAgICBub3JtYWxNYXRyaXguZ2V0Tm9ybWFsTWF0cml4KGNoaWxkLm1hdHJpeFdvcmxkKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NBdHRyLmNvdW50OyBpKyspIHtcbiAgICAgICAgdGVtcFZlcnRleC5mcm9tQnVmZmVyQXR0cmlidXRlKHBvc0F0dHIsIGkpO1xuICAgICAgICB0ZW1wVmVydGV4LmFwcGx5TWF0cml4NChjaGlsZC5tYXRyaXhXb3JsZCk7XG4gICAgICAgIGxpbmVzLnB1c2goXG4gICAgICAgICAgYHYgJHt0ZW1wVmVydGV4LngudG9GaXhlZCg1KX0gJHt0ZW1wVmVydGV4LnkudG9GaXhlZCg1KX0gJHt0ZW1wVmVydGV4LnoudG9GaXhlZCg1KX1gXG4gICAgICAgICk7XG4gICAgICAgIHRvdGFsVmVydGljZXMrKztcbiAgICAgIH1cblxuICAgICAgY29uc3Qgbm9ybUF0dHIgPSBnZW9tLmdldEF0dHJpYnV0ZSgnbm9ybWFsJyk7XG4gICAgICBpZiAobm9ybUF0dHIpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub3JtQXR0ci5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgdGVtcE5vcm1hbC5mcm9tQnVmZmVyQXR0cmlidXRlKG5vcm1BdHRyLCBpKTtcbiAgICAgICAgICB0ZW1wTm9ybWFsLmFwcGx5TWF0cml4Myhub3JtYWxNYXRyaXgpLm5vcm1hbGl6ZSgpO1xuICAgICAgICAgIGxpbmVzLnB1c2goXG4gICAgICAgICAgICBgdm4gJHt0ZW1wTm9ybWFsLngudG9GaXhlZCg1KX0gJHt0ZW1wTm9ybWFsLnkudG9GaXhlZCg1KX0gJHt0ZW1wTm9ybWFsLnoudG9GaXhlZCg1KX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBpbmRleEF0dHIgPSBnZW9tLmdldEluZGV4KCk7XG4gICAgICBpZiAoaW5kZXhBdHRyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhBdHRyLmNvdW50OyBpICs9IDMpIHtcbiAgICAgICAgICBjb25zdCBhID0gaW5kZXhBdHRyLmdldFgoaSkgKyB2ZXJ0ZXhPZmZzZXQ7XG4gICAgICAgICAgY29uc3QgYiA9IGluZGV4QXR0ci5nZXRYKGkgKyAxKSArIHZlcnRleE9mZnNldDtcbiAgICAgICAgICBjb25zdCBjID0gaW5kZXhBdHRyLmdldFgoaSArIDIpICsgdmVydGV4T2Zmc2V0O1xuICAgICAgICAgIGxpbmVzLnB1c2goYGYgJHthfS8vJHthfSAke2J9Ly8ke2J9ICR7Y30vLyR7Y31gKTtcbiAgICAgICAgICB0b3RhbEZhY2VzKys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcG9zQXR0ci5jb3VudDsgaSArPSAzKSB7XG4gICAgICAgICAgY29uc3QgYSA9IGkgKyB2ZXJ0ZXhPZmZzZXQ7XG4gICAgICAgICAgY29uc3QgYiA9IGkgKyAxICsgdmVydGV4T2Zmc2V0O1xuICAgICAgICAgIGNvbnN0IGMgPSBpICsgMiArIHZlcnRleE9mZnNldDtcbiAgICAgICAgICBsaW5lcy5wdXNoKGBmICR7YX0vLyR7YX0gJHtifS8vJHtifSAke2N9Ly8ke2N9YCk7XG4gICAgICAgICAgdG90YWxGYWNlcysrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZlcnRleE9mZnNldCArPSBwb3NBdHRyLmNvdW50O1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtsaW5lcy5qb2luKCdcXG4nKV0sIHsgdHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcgfSk7XG4gIHRyaWdnZXJEb3dubG9hZChibG9iLCBmaWxlbmFtZS5lbmRzV2l0aCgnLm9iaicpID8gZmlsZW5hbWUgOiBgJHtmaWxlbmFtZX0ub2JqYCk7XG4gIHJldHVybiB7IHZlcnRleENvdW50OiB0b3RhbFZlcnRpY2VzLCBmYWNlQ291bnQ6IHRvdGFsRmFjZXMgfTtcbn1cblxuLyoqXG4gKiBFeHBvcnRzIGEgVGhyZWUuanMgR3JvdXAgY29udGFpbmluZyBhcmNoaXRlY3R1cmFsIGJ1aWxkaW5nIG1lc2hlcyB0byBBU0NJSSAuU1RMIGZvcm1hdFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0R3JvdXBUb1NUTChncm91cDogVEhSRUUuR3JvdXAsIGZpbGVuYW1lOiBzdHJpbmcpOiB7XG4gIHRyaWFuZ2xlQ291bnQ6IG51bWJlcjtcbn0ge1xuICBjb25zdCBzb2xpZE5hbWUgPSBmaWxlbmFtZS5yZXBsYWNlKC9cXC5zdGwkL2ksICcnKS5yZXBsYWNlKC9cXHMrL2csICdfJyk7XG4gIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtgc29saWQgJHtzb2xpZE5hbWV9YF07XG5cbiAgY29uc3QgdkEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBjb25zdCB2QiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIGNvbnN0IHZDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgY29uc3QgY2IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBjb25zdCBhYiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgbGV0IHRyaWFuZ2xlQ291bnQgPSAwO1xuICBncm91cC51cGRhdGVNYXRyaXhXb3JsZCh0cnVlKTtcblxuICBncm91cC50cmF2ZXJzZSgoY2hpbGQpID0+IHtcbiAgICBpZiAoY2hpbGQgaW5zdGFuY2VvZiBUSFJFRS5NZXNoICYmIGNoaWxkLmdlb21ldHJ5KSB7XG4gICAgICBjb25zdCBnZW9tID0gY2hpbGQuZ2VvbWV0cnkgYXMgVEhSRUUuQnVmZmVyR2VvbWV0cnk7XG4gICAgICBjb25zdCBwb3NBdHRyID0gZ2VvbS5nZXRBdHRyaWJ1dGUoJ3Bvc2l0aW9uJyk7XG4gICAgICBpZiAoIXBvc0F0dHIpIHJldHVybjtcblxuICAgICAgY29uc3QgaW5kZXhBdHRyID0gZ2VvbS5nZXRJbmRleCgpO1xuICAgICAgY29uc3QgY291bnQgPSBpbmRleEF0dHIgPyBpbmRleEF0dHIuY291bnQgOiBwb3NBdHRyLmNvdW50O1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgaUEgPSBpbmRleEF0dHIgPyBpbmRleEF0dHIuZ2V0WChpKSA6IGk7XG4gICAgICAgIGNvbnN0IGlCID0gaW5kZXhBdHRyID8gaW5kZXhBdHRyLmdldFgoaSArIDEpIDogaSArIDE7XG4gICAgICAgIGNvbnN0IGlDID0gaW5kZXhBdHRyID8gaW5kZXhBdHRyLmdldFgoaSArIDIpIDogaSArIDI7XG5cbiAgICAgICAgdkEuZnJvbUJ1ZmZlckF0dHJpYnV0ZShwb3NBdHRyLCBpQSkuYXBwbHlNYXRyaXg0KGNoaWxkLm1hdHJpeFdvcmxkKTtcbiAgICAgICAgdkIuZnJvbUJ1ZmZlckF0dHJpYnV0ZShwb3NBdHRyLCBpQikuYXBwbHlNYXRyaXg0KGNoaWxkLm1hdHJpeFdvcmxkKTtcbiAgICAgICAgdkMuZnJvbUJ1ZmZlckF0dHJpYnV0ZShwb3NBdHRyLCBpQykuYXBwbHlNYXRyaXg0KGNoaWxkLm1hdHJpeFdvcmxkKTtcblxuICAgICAgICBjYi5zdWJWZWN0b3JzKHZDLCB2Qik7XG4gICAgICAgIGFiLnN1YlZlY3RvcnModkEsIHZCKTtcbiAgICAgICAgY2IuY3Jvc3MoYWIpLm5vcm1hbGl6ZSgpO1xuXG4gICAgICAgIGxpbmVzLnB1c2goXG4gICAgICAgICAgYCAgZmFjZXQgbm9ybWFsICR7Y2IueC50b0ZpeGVkKDUpfSAke2NiLnkudG9GaXhlZCg1KX0gJHtjYi56LnRvRml4ZWQoNSl9YFxuICAgICAgICApO1xuICAgICAgICBsaW5lcy5wdXNoKCcgICAgb3V0ZXIgbG9vcCcpO1xuICAgICAgICBsaW5lcy5wdXNoKGAgICAgICB2ZXJ0ZXggJHt2QS54LnRvRml4ZWQoNSl9ICR7dkEueS50b0ZpeGVkKDUpfSAke3ZBLnoudG9GaXhlZCg1KX1gKTtcbiAgICAgICAgbGluZXMucHVzaChgICAgICAgdmVydGV4ICR7dkIueC50b0ZpeGVkKDUpfSAke3ZCLnkudG9GaXhlZCg1KX0gJHt2Qi56LnRvRml4ZWQoNSl9YCk7XG4gICAgICAgIGxpbmVzLnB1c2goYCAgICAgIHZlcnRleCAke3ZDLngudG9GaXhlZCg1KX0gJHt2Qy55LnRvRml4ZWQoNSl9ICR7dkMuei50b0ZpeGVkKDUpfWApO1xuICAgICAgICBsaW5lcy5wdXNoKCcgICAgZW5kbG9vcCcpO1xuICAgICAgICBsaW5lcy5wdXNoKCcgIGVuZGZhY2V0Jyk7XG4gICAgICAgIHRyaWFuZ2xlQ291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGxpbmVzLnB1c2goYGVuZHNvbGlkICR7c29saWROYW1lfWApO1xuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2xpbmVzLmpvaW4oJ1xcbicpXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vc2xhO2NoYXJzZXQ9dXRmLTgnIH0pO1xuICB0cmlnZ2VyRG93bmxvYWQoYmxvYiwgZmlsZW5hbWUuZW5kc1dpdGgoJy5zdGwnKSA/IGZpbGVuYW1lIDogYCR7ZmlsZW5hbWV9LnN0bGApO1xuICByZXR1cm4geyB0cmlhbmdsZUNvdW50IH07XG59XG5cbi8qKlxuICogU3RyaXBzIFBvbGlzaCBkaWFjcml0aWNzIGZvciBzdGFuZGFyZCBQREYgSGVsdmV0aWNhIGZvbnQgY29tcGF0aWJpbGl0eVxuICovXG5mdW5jdGlvbiBub3JtYWxpemVQZGZUZXh0KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgbWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgIMSFOiAnYScsIMSHOiAnYycsIMSZOiAnZScsIMWCOiAnbCcsIMWEOiAnbicsIMOzOiAnbycsIMWbOiAncycsIMW6OiAneicsIMW8OiAneicsXG4gICAgxIQ6ICdBJywgxIY6ICdDJywgxJg6ICdFJywgxYE6ICdMJywgxYM6ICdOJywgw5M6ICdPJywgxZo6ICdTJywgxbk6ICdaJywgxbs6ICdaJyxcbiAgICAn4oCeJzogJ1wiJywgJ+KAnSc6ICdcIicsICfigJMnOiAnLScsICfigJQnOiAnLScsICfCsSc6ICcrLy0nLCAnwrAnOiAnIGRlZycsXG4gIH07XG4gIHJldHVybiBzdHIucmVwbGFjZSgvW8SFxIfEmcWCxYTDs8WbxbrFvMSExIbEmMWBxYPDk8WaxbnFu+KAnuKAneKAk+KAlMKxwrBdL2csIChtKSA9PiBtYXBbbV0gfHwgbSk7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGFuIGFkdmFuY2VkIG11bHRpLXBhZ2UgUERGIGFyY2hpdGVjdHVyYWwgc3BlY2lmaWNhdGlvbiAmIHByb21wdCBkb2N1bWVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0UHJvamVjdFRvUERGKFxuICBjb25maWc6IEFSQ29uZmlnU3RhdGUsXG4gIHNjcmVlbnNob3REYXRhVXJsPzogc3RyaW5nXG4pOiB2b2lkIHtcbiAgY29uc3QgZG9jID0gbmV3IGpzUERGKHsgb3JpZW50YXRpb246ICdwb3J0cmFpdCcsIHVuaXQ6ICdtbScsIGZvcm1hdDogJ2E0JyB9KTtcbiAgY29uc3Qgc2NlbmVNZXRhID1cbiAgICBBUkNISVRFQ1RVUkFMX1NDRU5FUy5maW5kKChzKSA9PiBzLmlkID09PSBjb25maWcuc2NlbmVJZCkgfHwgQVJDSElURUNUVVJBTF9TQ0VORVNbMF07XG4gIGNvbnN0IHBhbGV0dGUgPSBIT0xPR1JBTV9QQUxFVFRFU1tjb25maWcudWlTZXR0aW5ncy5wYWxldHRlXTtcbiAgY29uc3QgcHJvbXB0cyA9IGdlbmVyYXRlTWFzdGVyUHJvbXB0KGNvbmZpZyk7XG5cbiAgLy8gSGVhZGVyIEJhbm5lclxuICBkb2Muc2V0RmlsbENvbG9yKDExLCAxNSwgMjMpO1xuICBkb2MucmVjdCgwLCAwLCAyMTAsIDM0LCAnRicpO1xuICBkb2Muc2V0VGV4dENvbG9yKDYsIDE4MiwgMjEyKTtcbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdib2xkJyk7XG4gIGRvYy5zZXRGb250U2l6ZSgxNik7XG4gIGRvYy50ZXh0KCdIT0xPQVJDSCBBUiBTVFVESU8gLSBTUEVDWUZJS0FDSkEgVEVDSE5JQ1pOQSAmIFBST01QVCcsIDE0LCAxNSk7XG5cbiAgZG9jLnNldFRleHRDb2xvcigyMDMsIDIxMywgMjI1KTtcbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdub3JtYWwnKTtcbiAgZG9jLnNldEZvbnRTaXplKDkuNSk7XG4gIGRvYy50ZXh0KFxuICAgIG5vcm1hbGl6ZVBkZlRleHQoXG4gICAgICBgU2NlbmE6ICR7c2NlbmVNZXRhLm5hbWV9IHwgU2lsbmlrOiBVbml0eSBBUiBGb3VuZGF0aW9uIChBUktpdCArIEFSQ29yZSkgfCBEYXRhOiAke25ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdwbC1QTCcpfWBcbiAgICApLFxuICAgIDE0LFxuICAgIDI0XG4gICk7XG5cbiAgbGV0IHkgPSA0NDtcblxuICAvLyBTZWN0aW9uIDE6IFBhcmFtZXRyeSBLb25maWd1cmFjamkgQVJcbiAgZG9jLnNldFRleHRDb2xvcigxNSwgMjMsIDQyKTtcbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdib2xkJyk7XG4gIGRvYy5zZXRGb250U2l6ZSgxMik7XG4gIGRvYy50ZXh0KCcxLiBLb25maWd1cmFjamEgU3lzdGVtdSBIb2xvZ3JhbW93IEFSIGkgQ3p1am5pa293IEdsZWJpJywgMTQsIHkpO1xuICB5ICs9IDc7XG5cbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdub3JtYWwnKTtcbiAgZG9jLnNldEZvbnRTaXplKDkuNSk7XG4gIGNvbnN0IHNwZWNzID0gW1xuICAgIGBNb2RlbCBBcmNoaXRla3Rvbmljem55OiAke3NjZW5lTWV0YS5uYW1lfSAoJHtzY2VuZU1ldGEucmVhbFdvcmxkSGVpZ2h0TX0gbSB3eXNva29zY2ksICR7c2NlbmVNZXRhLnBhcnRzQ291bnR9IG1vZHVsb3cpYCxcbiAgICBgRGV0ZWtjamEgUG93aWVyemNobmk6ICR7Y29uZmlnLnBsYW5lRGV0ZWN0aW9uTW9kZX0gKEN6dWpuaWtpIEdsZWJpIFRvRiAvIExpREFSOiAke2NvbmZpZy5kZXB0aFNlbnNvckFjdGl2ZSA/ICdBS1RZV05FJyA6ICdXeWwuJ30pYCxcbiAgICBgT3N3aWV0bGVuaWUgU3JvZG93aXNrb3dlIGkgT2tsdXpqYTogSERSIExpZ2h0IEVzdGltYXRpb24gKCR7Y29uZmlnLmxpZ2h0VGVtcGVyYXR1cmVLfUspIHwgT2tsdXpqYTogJHtjb25maWcub2NjbHVzaW9uRW5hYmxlZCA/ICdUQUsnIDogJ05JRSd9YCxcbiAgICBgRWZla3QgUGFyYWxha3N5IDZEb0YgaSBDemFzdGVjemtpOiBQYXJhbGFrc2EgJHsoY29uZmlnLnBhcmFsbGF4SW50ZW5zaXR5ICogMTAwKS50b0ZpeGVkKDApfSUgfCBDemFzdGVjemtpIHphIG9rbmFtaSAkeyhjb25maWcud2luZG93UGFydGljbGVzSW50ZW5zaXR5ICogMTAwKS50b0ZpeGVkKDApfSVgLFxuICAgIGBTdGVyb3dhbmllIERvdHlrb3dlIGkgU2thbGE6IFNrYWxhIGJhem93YSAke2NvbmZpZy5tb2RlbFNjYWxlLnRvRml4ZWQoMil9eCB8IE9icm90IFk6ICR7Y29uZmlnLm1vZGVsUm90YXRpb25ZfSBkZWcgfCBFeHBsb2RlZCBWaWV3OiAkeyhjb25maWcuZXhwbG9kZWRWaWV3RmFjdG9yICogMTAwKS50b0ZpeGVkKDApfSVgLFxuICAgIGBUcnliIE9mZmxpbmUgaSBDaG11cmE6IE9mZmxpbmUgQ2FjaGUgKCR7Y29uZmlnLm9mZmxpbmVNb2RlRW5hYmxlZCA/ICdUQUsnIDogJ05JRSd9KSB8IENsb3VkIFN5bmMgKCR7Y29uZmlnLmNsb3VkU3luY0VuYWJsZWQgPyAnVEFLJyA6ICdOSUUnfSlgLFxuICAgIGBXc3BhcmNpZSBFa3Nwb3J0dTogT0JKICgke2NvbmZpZy5leHBvcnRGb3JtYXRzLm9iaiA/ICdUQUsnIDogJ05JRSd9KSwgU1RMICgke2NvbmZpZy5leHBvcnRGb3JtYXRzLnN0bCA/ICdUQUsnIDogJ05JRSd9KSwgUERGIChBa3R5d255KSB8IFBhbGV0YSBVSTogJHtwYWxldHRlLm5hbWV9YCxcbiAgXTtcblxuICBzcGVjcy5mb3JFYWNoKChsaW5lKSA9PiB7XG4gICAgZG9jLnRleHQobm9ybWFsaXplUGRmVGV4dChg4oCiICR7bGluZX1gKSwgMTYsIHkpO1xuICAgIHkgKz0gNS41O1xuICB9KTtcblxuICAvLyBPcHRpb25hbCBlbWJlZGRlZCAzRCB2aWV3cG9ydCBzbmFwc2hvdFxuICBpZiAoc2NyZWVuc2hvdERhdGFVcmwgJiYgc2NyZWVuc2hvdERhdGFVcmwuc3RhcnRzV2l0aCgnZGF0YTppbWFnZS8nKSkge1xuICAgIHkgKz0gMztcbiAgICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ2JvbGQnKTtcbiAgICBkb2Muc2V0Rm9udFNpemUoMTEpO1xuICAgIGRvYy50ZXh0KCdQb2RnbGFkIFdpZG9rdSBIb2xvZ3JhbXUgM0QgKFpyenV0IHogU3ltdWxhdG9yYSk6JywgMTQsIHkpO1xuICAgIHkgKz0gNDtcbiAgICB0cnkge1xuICAgICAgZG9jLmFkZEltYWdlKHNjcmVlbnNob3REYXRhVXJsLCAnUE5HJywgMTQsIHksIDExNSwgNjQpO1xuICAgICAgeSArPSA3MDtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHkgKz0gNjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgeSArPSA0O1xuICB9XG5cbiAgLy8gU2VjdGlvbiAyOiBNYXN0ZXIgUHJvbXB0XG4gIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnYm9sZCcpO1xuICBkb2Muc2V0Rm9udFNpemUoMTIpO1xuICBkb2MudGV4dCgnMi4gR290b3d5IFByb21wdCBTeXN0ZW1vd3kgaSBBcmNoaXRla3Rvbmljem55IChQTCAvIEVOKScsIDE0LCB5KTtcbiAgeSArPSA2O1xuXG4gIGRvYy5zZXRGb250KCdoZWx2ZXRpY2EnLCAnbm9ybWFsJyk7XG4gIGRvYy5zZXRGb250U2l6ZSg4LjUpO1xuICBjb25zdCByYXdQcm9tcHQgPVxuICAgIGNvbmZpZy51aVNldHRpbmdzLnByb21wdExhbmd1YWdlID09PSAncGwnID8gcHJvbXB0cy5zeXN0ZW1Qcm9tcHRQTCA6IHByb21wdHMuc3lzdGVtUHJvbXB0RU47XG4gIGNvbnN0IGNsZWFuUHJvbXB0ID0gbm9ybWFsaXplUGRmVGV4dChyYXdQcm9tcHQucmVwbGFjZSgvIyMjIC9nLCAnJykucmVwbGFjZSgvXFwqXFwqL2csICcnKSk7XG4gIGNvbnN0IHdyYXBwZWRMaW5lcyA9IGRvYy5zcGxpdFRleHRUb1NpemUoY2xlYW5Qcm9tcHQsIDE4Mik7XG5cbiAgd3JhcHBlZExpbmVzLmZvckVhY2goKGxpbmU6IHN0cmluZykgPT4ge1xuICAgIGlmICh5ID4gMjgwKSB7XG4gICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgeSA9IDE4O1xuICAgIH1cbiAgICBkb2MudGV4dChsaW5lLCAxNCwgeSk7XG4gICAgeSArPSA0LjI7XG4gIH0pO1xuXG4gIC8vIFNlY3Rpb24gMzogU3VwcG9ydGVkIE1vYmlsZSBEZXZpY2VzIFRhYmxlXG4gIGlmICh5ID4gMjIwKSB7XG4gICAgZG9jLmFkZFBhZ2UoKTtcbiAgICB5ID0gMTg7XG4gIH0gZWxzZSB7XG4gICAgeSArPSA4O1xuICB9XG5cbiAgZG9jLnNldEZvbnQoJ2hlbHZldGljYScsICdib2xkJyk7XG4gIGRvYy5zZXRGb250U2l6ZSgxMik7XG4gIGRvYy50ZXh0KCczLiBMaXN0YSBXc3BpZXJhbnljaCBVcnphZHplbiBNb2JpbG55Y2ggKFNtYXJ0Zm9ueSBpIFRhYmxldHkgQW5kcm9pZCAvIGlPUyknLCAxNCwgeSk7XG4gIHkgKz0gNztcblxuICBkb2Muc2V0Rm9udCgnaGVsdmV0aWNhJywgJ25vcm1hbCcpO1xuICBkb2Muc2V0Rm9udFNpemUoOC41KTtcbiAgU1VQUE9SVEVEX01PQklMRV9ERVZJQ0VTLmZvckVhY2goKGRldikgPT4ge1xuICAgIGlmICh5ID4gMjgwKSB7XG4gICAgICBkb2MuYWRkUGFnZSgpO1xuICAgICAgeSA9IDE4O1xuICAgIH1cbiAgICBjb25zdCBkZXZMaW5lID0gYCR7ZGV2LmJyYW5kfSAke2Rldi5tb2RlbH0gWyR7ZGV2LmZvcm1GYWN0b3J9XSAtICR7ZGV2LmRlcHRoU2Vuc29yfSB8ICR7ZGV2LnBsYW5lRGV0ZWN0aW9uQWNjdXJhY3l9ICgke2Rldi50YXJnZXRGcHN9IEZQUylgO1xuICAgIGRvYy50ZXh0KG5vcm1hbGl6ZVBkZlRleHQoYOKAoiAke2RldkxpbmV9YCksIDE2LCB5KTtcbiAgICB5ICs9IDU7XG4gIH0pO1xuXG4gIGRvYy5zYXZlKGBIb2xvQXJjaF9BUl9TcGVjeWZpa2FjamFfJHtjb25maWcuc2NlbmVJZH0ucGRmYCk7XG59XG5cbmZ1bmN0aW9uIHRyaWdnZXJEb3dubG9hZChibG9iOiBCbG9iLCBmaWxlbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuaHJlZiA9IHVybDtcbiAgYS5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICBhLmNsaWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gIHNldFRpbWVvdXQoKCkgPT4gVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpLCAxMDAwKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvY2VkdXJhbFNjZW5lR3JvdXAoY29uZmlnOiBBUkNvbmZpZ1N0YXRlKTogVEhSRUUuR3JvdXAge1xuICBjb25zdCBncm91cCA9IG5ldyBUSFJFRS5Hcm91cCgpO1xuICBjb25zdCBoTXVsdCA9IGNvbmZpZy50b3dlckhlaWdodE11bHRpcGxpZXIgfHwgMS4wO1xuICBjb25zdCBzY2FsZSA9IGNvbmZpZy5tb2RlbFNjYWxlIHx8IDEuMDtcblxuICBpZiAoY29uZmlnLnNjZW5lSWQgPT09ICdlY29fYXRyaXVtJykge1xuICAgIGNvbnN0IGRvbWUgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuSWNvc2FoZWRyb25HZW9tZXRyeSgxLjQgKiBzY2FsZSwgMikpO1xuICAgIGRvbWUubmFtZSA9ICdHZW9kZXNpY19BdHJpdW1fRG9tZSc7XG4gICAgZG9tZS5wb3NpdGlvbi5zZXQoMCwgMC45ICogaE11bHQsIDApO1xuICAgIGdyb3VwLmFkZChkb21lKTtcbiAgfSBlbHNlIGlmIChjb25maWcuc2NlbmVJZCA9PT0gJ2Flcm9faHViJykge1xuICAgIGNvbnN0IHJvb2YgPSBuZXcgVEhSRUUuTWVzaChuZXcgVEhSRUUuQm94R2VvbWV0cnkoMi44ICogc2NhbGUsIDAuMzUgKiBoTXVsdCwgMS42ICogc2NhbGUpKTtcbiAgICByb29mLm5hbWUgPSAnQWVyb19UZXJtaW5hbF9TcGFuJztcbiAgICByb29mLnBvc2l0aW9uLnNldCgwLCAxLjEgKiBoTXVsdCwgMCk7XG4gICAgZ3JvdXAuYWRkKHJvb2YpO1xuICB9IGVsc2UgaWYgKGNvbmZpZy5zY2VuZUlkID09PSAnY3J5c3RhbF9zdGFja2VkX3ByaXNtJykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICBjb25zdCBzbGFiID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgoMS42IC0gaSAqIDAuMDgpICogc2NhbGUsIDAuMTYgKiBoTXVsdCwgKDEuMiAtIGkgKiAwLjA1KSAqIHNjYWxlKVxuICAgICAgKTtcbiAgICAgIHNsYWIubmFtZSA9IGBDcnlzdGFsX0dsYXNzX1NsYWJfMCR7aSArIDF9YDtcbiAgICAgIHNsYWIucG9zaXRpb24uc2V0KCgoaSAlIDIpIC0gMC41KSAqIDAuMTUsICgwLjIgKyBpICogMC4zNCkgKiBoTXVsdCAqIHNjYWxlLCAwKTtcbiAgICAgIGdyb3VwLmFkZChzbGFiKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoY29uZmlnLnNjZW5lSWQgPT09ICd2b3Jvbm9pX2Jpb25pY19zcGlyZScpIHtcbiAgICBjb25zdCBzcGlyZSA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMC4zNSAqIHNjYWxlLCAwLjg1ICogc2NhbGUsIDMuMSAqIGhNdWx0ICogc2NhbGUsIDE2LCA4KVxuICAgICk7XG4gICAgc3BpcmUubmFtZSA9ICdWb3Jvbm9pX0hlbGl4X1NwaXJlXzMyNW0nO1xuICAgIHNwaXJlLnBvc2l0aW9uLnNldCgwLCAxLjU1ICogaE11bHQgKiBzY2FsZSwgMCk7XG4gICAgZ3JvdXAuYWRkKHNwaXJlKTtcbiAgfSBlbHNlIGlmIChjb25maWcuc2NlbmVJZCA9PT0gJ2tpbmV0aWNfY2FsYXRyYXZhX3dpbmcnKSB7XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCA4OyByKyspIHtcbiAgICAgIGNvbnN0IHJpYiA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkoKDEuMiArIE1hdGguc2luKChyIC8gNykgKiBNYXRoLlBJKSAqIDAuOCkgKiBzY2FsZSwgMC4xNCAqIGhNdWx0LCAwLjE0ICogc2NhbGUpXG4gICAgICApO1xuICAgICAgcmliLm5hbWUgPSBgS2luZXRpY19UaXRhbml1bV9SaWJfMCR7ciArIDF9YDtcbiAgICAgIHJpYi5wb3NpdGlvbi5zZXQoMCwgKDAuMyArIHIgKiAwLjMyKSAqIGhNdWx0ICogc2NhbGUsIDApO1xuICAgICAgcmliLnJvdGF0aW9uLnkgPSByICogMC4xMjtcbiAgICAgIGdyb3VwLmFkZChyaWIpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChjb25maWcuc2NlbmVJZCA9PT0gJ2h5ZHJvX2FxdWFfc2N1bHB0dXJlJykge1xuICAgIGNvbnN0IHZlc3NlbCA9IG5ldyBUSFJFRS5NZXNoKFxuICAgICAgbmV3IFRIUkVFLkN5bGluZGVyR2VvbWV0cnkoMS4yICogc2NhbGUsIDEuMSAqIHNjYWxlLCAwLjggKiBoTXVsdCAqIHNjYWxlLCAyNClcbiAgICApO1xuICAgIHZlc3NlbC5uYW1lID0gJ0h5ZHJvX0NyeXN0YWxfVmVzc2VsJztcbiAgICB2ZXNzZWwucG9zaXRpb24uc2V0KDAsIDAuNCAqIGhNdWx0ICogc2NhbGUsIDApO1xuICAgIGdyb3VwLmFkZCh2ZXNzZWwpO1xuICAgIGNvbnN0IHNwbGFzaCA9IG5ldyBUSFJFRS5NZXNoKG5ldyBUSFJFRS5JY29zYWhlZHJvbkdlb21ldHJ5KDAuNjUgKiBzY2FsZSwgMikpO1xuICAgIHNwbGFzaC5uYW1lID0gJ0xpcXVpZF9TcGxhc2hfQ3Jlc3QnO1xuICAgIHNwbGFzaC5wb3NpdGlvbi5zZXQoMCwgMS44ICogaE11bHQgKiBzY2FsZSwgMCk7XG4gICAgZ3JvdXAuYWRkKHNwbGFzaCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgY29yZVRvd2VyID0gbmV3IFRIUkVFLk1lc2goXG4gICAgICBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMC44NSAqIHNjYWxlLCAyLjYgKiBoTXVsdCAqIHNjYWxlLCAwLjg1ICogc2NhbGUpXG4gICAgKTtcbiAgICBjb3JlVG93ZXIubmFtZSA9ICdTa3lsaW5lX01haW5fU3BpcmUnO1xuICAgIGNvcmVUb3dlci5wb3NpdGlvbi5zZXQoMCwgMS4zICogaE11bHQgKiBzY2FsZSwgMCk7XG4gICAgZ3JvdXAuYWRkKGNvcmVUb3dlcik7XG5cbiAgICBjb25zdCB3aW5nVG93ZXIgPSBuZXcgVEhSRUUuTWVzaChcbiAgICAgIG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgwLjY1ICogc2NhbGUsIDEuOCAqIGhNdWx0ICogc2NhbGUsIDAuNjUgKiBzY2FsZSlcbiAgICApO1xuICAgIHdpbmdUb3dlci5uYW1lID0gJ1NreWxpbmVfRWFzdF9Ub3dlcic7XG4gICAgd2luZ1Rvd2VyLnBvc2l0aW9uLnNldCgxLjEgKiBzY2FsZSwgMC45ICogaE11bHQgKiBzY2FsZSwgMC4zICogc2NhbGUpO1xuICAgIGdyb3VwLmFkZCh3aW5nVG93ZXIpO1xuICB9XG4gIGdyb3VwLnVwZGF0ZU1hdHJpeFdvcmxkKHRydWUpO1xuICByZXR1cm4gZ3JvdXA7XG59XG5cbi8qKlxuICogRXhwb3J0cyBhIEtocm9ub3MgZ2xURiAyLjAgKC5nbHRmKSBKU09OIHNjZW5lIGFzc2V0IHdpdGggUEJSIE1ldGFsbGljLVJvdWdobmVzcyAmIElPUiBUcmFuc21pc3Npb24gZXh0ZW5zaW9uc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZXhwb3J0UHJvamVjdFRvR0xURihjb25maWc6IEFSQ29uZmlnU3RhdGUpOiB7IG5vZGVDb3VudDogbnVtYmVyIH0ge1xuICBjb25zdCBncm91cCA9IGNyZWF0ZVByb2NlZHVyYWxTY2VuZUdyb3VwKGNvbmZpZyk7XG4gIGNvbnN0IG5vZGVzOiBBcnJheTxSZWNvcmQ8c3RyaW5nLCB1bmtub3duPj4gPSBbXTtcbiAgZ3JvdXAudHJhdmVyc2UoKGNoaWxkKSA9PiB7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVEhSRUUuTWVzaCkge1xuICAgICAgbm9kZXMucHVzaCh7XG4gICAgICAgIG5hbWU6IGNoaWxkLm5hbWUgfHwgJ0hvbG9BcmNoX05vZGUnLFxuICAgICAgICB0cmFuc2xhdGlvbjogW1xuICAgICAgICAgIE51bWJlcihjaGlsZC5wb3NpdGlvbi54LnRvRml4ZWQoNCkpLFxuICAgICAgICAgIE51bWJlcihjaGlsZC5wb3NpdGlvbi55LnRvRml4ZWQoNCkpLFxuICAgICAgICAgIE51bWJlcihjaGlsZC5wb3NpdGlvbi56LnRvRml4ZWQoNCkpLFxuICAgICAgICBdLFxuICAgICAgICBzY2FsZTogW1xuICAgICAgICAgIE51bWJlcihjaGlsZC5zY2FsZS54LnRvRml4ZWQoNCkpLFxuICAgICAgICAgIE51bWJlcihjaGlsZC5zY2FsZS55LnRvRml4ZWQoNCkpLFxuICAgICAgICAgIE51bWJlcihjaGlsZC5zY2FsZS56LnRvRml4ZWQoNCkpLFxuICAgICAgICBdLFxuICAgICAgICBleHRyYXM6IHtcbiAgICAgICAgICBob2xvQXJjaFNjZW5lOiBjb25maWcuc2NlbmVJZCxcbiAgICAgICAgICBsaWdodFRlbXBlcmF0dXJlSzogY29uZmlnLmxpZ2h0VGVtcGVyYXR1cmVLLFxuICAgICAgICAgIGV4dGVuc2lvbnM6IGNvbmZpZy5hY3RpdmVFeHRlbnNpb25zIHx8IFtdLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBnbHRmSnNvbiA9IHtcbiAgICBhc3NldDoge1xuICAgICAgdmVyc2lvbjogJzIuMCcsXG4gICAgICBnZW5lcmF0b3I6ICdIb2xvQXJjaCBBUiBTdHVkaW8gLSBLaHJvbm9zIGdsVEYgMi4wICsgS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24gRXhwb3J0ZXInLFxuICAgICAgY29weXJpZ2h0OiBgSG9sb0FyY2ggQVIgU3R1ZGlvICgke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0pYCxcbiAgICB9LFxuICAgIGV4dGVuc2lvbnNVc2VkOiBbXG4gICAgICAnS0hSX21hdGVyaWFsc190cmFuc21pc3Npb24nLFxuICAgICAgJ0tIUl9tYXRlcmlhbHNfaW9yJyxcbiAgICAgICdLSFJfbWF0ZXJpYWxzX3ZvbHVtZScsXG4gICAgICAnS0hSX21hdGVyaWFsc19lbWlzc2l2ZV9zdHJlbmd0aCcsXG4gICAgXSxcbiAgICBzY2VuZTogMCxcbiAgICBzY2VuZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogYEhvbG9BcmNoXyR7Y29uZmlnLnNjZW5lSWR9YCxcbiAgICAgICAgbm9kZXM6IG5vZGVzLm1hcCgoXywgaWR4KSA9PiBpZHgpLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG5vZGVzLFxuICAgIG1hdGVyaWFsczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnSG9sb0FyY2hfT3B0aWNhbF9DcnlzdGFsX0dsYXNzJyxcbiAgICAgICAgcGJyTWV0YWxsaWNSb3VnaG5lc3M6IHtcbiAgICAgICAgICBiYXNlQ29sb3JGYWN0b3I6IFswLjAyNCwgMC43MTQsIDAuODMxLCAwLjgyXSxcbiAgICAgICAgICBtZXRhbGxpY0ZhY3RvcjogMC4xNSxcbiAgICAgICAgICByb3VnaG5lc3NGYWN0b3I6IDAuMDgsXG4gICAgICAgIH0sXG4gICAgICAgIGV4dGVuc2lvbnM6IHtcbiAgICAgICAgICBLSFJfbWF0ZXJpYWxzX3RyYW5zbWlzc2lvbjogeyB0cmFuc21pc3Npb25GYWN0b3I6IDAuOTIgfSxcbiAgICAgICAgICBLSFJfbWF0ZXJpYWxzX2lvcjogeyBpb3I6IDEuNTIgfSxcbiAgICAgICAgICBLSFJfbWF0ZXJpYWxzX2VtaXNzaXZlX3N0cmVuZ3RoOiB7IGVtaXNzaXZlU3RyZW5ndGg6IDEuOCB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuXG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoZ2x0Zkpzb24sIG51bGwsIDIpXSwge1xuICAgIHR5cGU6ICdtb2RlbC9nbHRmK2pzb247Y2hhcnNldD11dGYtOCcsXG4gIH0pO1xuICB0cmlnZ2VyRG93bmxvYWQoYmxvYiwgYEhvbG9BcmNoXyR7Y29uZmlnLnNjZW5lSWR9X1BCUi5nbHRmYCk7XG4gIHJldHVybiB7IG5vZGVDb3VudDogbm9kZXMubGVuZ3RoIH07XG59XG5cbi8qKlxuICogRXhwb3J0cyBhbiBJU08tMTAzMDMtMjEgU1RFUCAvIEJJTSBJbmR1c3RyeSBGb3VuZGF0aW9uIENsYXNzZXMgKC5JRkMpIExldmVsIDQwMCBmaWxlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnRQcm9qZWN0VG9JRkMoY29uZmlnOiBBUkNvbmZpZ1N0YXRlKTogdm9pZCB7XG4gIGNvbnN0IHNjZW5lTWV0YSA9XG4gICAgQVJDSElURUNUVVJBTF9TQ0VORVMuZmluZCgocykgPT4gcy5pZCA9PT0gY29uZmlnLnNjZW5lSWQpIHx8IEFSQ0hJVEVDVFVSQUxfU0NFTkVTWzBdO1xuICBjb25zdCBub3dJc28gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTkpO1xuICBjb25zdCBpZmNDb250ZW50ID0gW1xuICAgICdJU08tMTAzMDMtMjE7JyxcbiAgICAnSEVBREVSOycsXG4gICAgYEZJTEVfREVTQ1JJUFRJT04oKCdWaWV3RGVmaW5pdGlvbiBbQ29vcmRpbmF0aW9uVmlld19WMi4wXScsJ0hvbG9BcmNoIEFSIExldmVsIDQwMCBCSU0nKSwnMjsxJyk7YCxcbiAgICBgRklMRV9OQU1FKCdIb2xvQXJjaF8ke2NvbmZpZy5zY2VuZUlkfS5pZmMnLCcke25vd0lzb30nLCgnSG9sb0FyY2ggQXJjaGl0ZWN0JyksKCdIb2xvQXJjaCBBUiBTdHVkaW8nKSwnSUZDNCcsJ0hvbG9BcmNoIEJJTSBFeHBvcnRlcicsJycpO2AsXG4gICAgYEZJTEVfU0NIRU1BKCgnSUZDNCcpKTtgLFxuICAgICdFTkRTRUM7JyxcbiAgICAnREFUQTsnLFxuICAgIGAjMTA9SUZDUFJPSkVDVCgnMEhvbG9BcmNoJHtjb25maWcuc2NlbmVJZC5zbGljZSgwLCA4KX0nLCMxMiwnJHtub3JtYWxpemVQZGZUZXh0KHNjZW5lTWV0YS5uYW1lKX0nLCcke25vcm1hbGl6ZVBkZlRleHQoc2NlbmVNZXRhLnN1YnRpdGxlKX0nLCQsJCwkLCgjMjApLCMzMCk7YCxcbiAgICBgIzEyPUlGQ09XTkVSSElTVE9SWSgjMTQsIzE2LCQsLk5PQ0hBTkdFLiwkLCQsJCwxNzMwMDAwMDAwKTtgLFxuICAgIGAjNDA9SUZDU0lURSgnMVNpdGVfJHtjb25maWcuc2NlbmVJZH0nLCMxMiwnQVJfVGFibGV0b3BfRmxvb3JfQW5jaG9yJywkLCQsJCwkLCQsLkVMRU1FTlQuLCg1MiwxMyw0NyksKDIxLDAsNDIpLDExNS4sJCwkKTtgLFxuICAgIGAjNTA9SUZDQlVJTERJTkcoJzJCbGRnXyR7Y29uZmlnLnNjZW5lSWR9JywjMTIsJyR7bm9ybWFsaXplUGRmVGV4dChzY2VuZU1ldGEubmFtZSl9JywkLCQsJCwkLCcke25vcm1hbGl6ZVBkZlRleHQoc2NlbmVNZXRhLmFyY2hpdGVjdHVyYWxTdHlsZSl9JywuRUxFTUVOVC4sJHtzY2VuZU1ldGEucmVhbFdvcmxkSGVpZ2h0TX0uLDAuLCQpO2AsXG4gICAgLi4uc2NlbmVNZXRhLmxheWVycy5tYXAoXG4gICAgICAobGF5ZXIsIGlkeCkgPT5cbiAgICAgICAgYCMkezEwMCArIGlkeH09SUZDQlVJTERJTkdTVE9SRVkoJzNMdmxfMCR7aWR4ICsgMX0nLCMxMiwnJHtub3JtYWxpemVQZGZUZXh0KGxheWVyKX0nLCQsJCwkLCQsJCwuRUxFTUVOVC4sJHsoaWR4ICogKHNjZW5lTWV0YS5yZWFsV29ybGRIZWlnaHRNIC8gNCkpLnRvRml4ZWQoMSl9KTtgXG4gICAgKSxcbiAgICAnRU5EU0VDOycsXG4gICAgJ0VORC1JU08tMTAzMDMtMjE7JyxcbiAgXS5qb2luKCdcXG4nKTtcblxuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2lmY0NvbnRlbnRdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi94LXN0ZXA7Y2hhcnNldD11dGYtOCcgfSk7XG4gIHRyaWdnZXJEb3dubG9hZChibG9iLCBgSG9sb0FyY2hfQklNXyR7Y29uZmlnLnNjZW5lSWR9LmlmY2ApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVPQkpDb250ZW50KGNvbmZpZzogQVJDb25maWdTdGF0ZSk6IHN0cmluZyB7XG4gIGNvbnN0IGdyb3VwID0gY3JlYXRlUHJvY2VkdXJhbFNjZW5lR3JvdXAoY29uZmlnKTtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW1xuICAgICcjIEhvbG9BcmNoIEFSIFN0dWRpbyAtIEdvb2dsZSBEcml2ZSBDbG91ZCBFeHBvcnQgKC5PQkopJyxcbiAgICBgIyBTY2VuZTogJHtjb25maWcuc2NlbmVJZH0gfCBTY2FsZTogJHtjb25maWcubW9kZWxTY2FsZX14IHwgSGVpZ2h0OiAke2NvbmZpZy50b3dlckhlaWdodE11bHRpcGxpZXJ9eGAsXG4gICAgYG8gSG9sb0FyY2hfJHtjb25maWcuc2NlbmVJZH1gLFxuICBdO1xuICBsZXQgdmVydGV4T2Zmc2V0ID0gMTtcbiAgY29uc3QgdGVtcFZlcnRleCA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgZ3JvdXAudHJhdmVyc2UoKGNoaWxkKSA9PiB7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVEhSRUUuTWVzaCAmJiBjaGlsZC5nZW9tZXRyeSkge1xuICAgICAgY29uc3QgZ2VvbSA9IGNoaWxkLmdlb21ldHJ5IGFzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5O1xuICAgICAgY29uc3QgcG9zQXR0ciA9IGdlb20uZ2V0QXR0cmlidXRlKCdwb3NpdGlvbicpO1xuICAgICAgaWYgKCFwb3NBdHRyKSByZXR1cm47XG4gICAgICBsaW5lcy5wdXNoKGBnICR7Y2hpbGQubmFtZSB8fCAnQXJjaE1lc2gnfWApO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3NBdHRyLmNvdW50OyBpKyspIHtcbiAgICAgICAgdGVtcFZlcnRleC5mcm9tQnVmZmVyQXR0cmlidXRlKHBvc0F0dHIsIGkpLmFwcGx5TWF0cml4NChjaGlsZC5tYXRyaXhXb3JsZCk7XG4gICAgICAgIGxpbmVzLnB1c2goXG4gICAgICAgICAgYHYgJHt0ZW1wVmVydGV4LngudG9GaXhlZCg1KX0gJHt0ZW1wVmVydGV4LnkudG9GaXhlZCg1KX0gJHt0ZW1wVmVydGV4LnoudG9GaXhlZCg1KX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmRleEF0dHIgPSBnZW9tLmdldEluZGV4KCk7XG4gICAgICBpZiAoaW5kZXhBdHRyKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhBdHRyLmNvdW50OyBpICs9IDMpIHtcbiAgICAgICAgICBjb25zdCBhID0gaW5kZXhBdHRyLmdldFgoaSkgKyB2ZXJ0ZXhPZmZzZXQ7XG4gICAgICAgICAgY29uc3QgYiA9IGluZGV4QXR0ci5nZXRYKGkgKyAxKSArIHZlcnRleE9mZnNldDtcbiAgICAgICAgICBjb25zdCBjID0gaW5kZXhBdHRyLmdldFgoaSArIDIpICsgdmVydGV4T2Zmc2V0O1xuICAgICAgICAgIGxpbmVzLnB1c2goYGYgJHthfSAke2J9ICR7Y31gKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmVydGV4T2Zmc2V0ICs9IHBvc0F0dHIuY291bnQ7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVTVExDb250ZW50KGNvbmZpZzogQVJDb25maWdTdGF0ZSk6IHN0cmluZyB7XG4gIGNvbnN0IGdyb3VwID0gY3JlYXRlUHJvY2VkdXJhbFNjZW5lR3JvdXAoY29uZmlnKTtcbiAgY29uc3Qgc29saWROYW1lID0gYEhvbG9BcmNoXyR7Y29uZmlnLnNjZW5lSWR9YDtcbiAgY29uc3QgbGluZXM6IHN0cmluZ1tdID0gW2Bzb2xpZCAke3NvbGlkTmFtZX1gXTtcbiAgY29uc3QgdkEgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBjb25zdCB2QiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG4gIGNvbnN0IHZDID0gbmV3IFRIUkVFLlZlY3RvcjMoKTtcbiAgY29uc3QgY2IgPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xuICBjb25zdCBhYiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XG5cbiAgZ3JvdXAudHJhdmVyc2UoKGNoaWxkKSA9PiB7XG4gICAgaWYgKGNoaWxkIGluc3RhbmNlb2YgVEhSRUUuTWVzaCAmJiBjaGlsZC5nZW9tZXRyeSkge1xuICAgICAgY29uc3QgZ2VvbSA9IGNoaWxkLmdlb21ldHJ5IGFzIFRIUkVFLkJ1ZmZlckdlb21ldHJ5O1xuICAgICAgY29uc3QgcG9zQXR0ciA9IGdlb20uZ2V0QXR0cmlidXRlKCdwb3NpdGlvbicpO1xuICAgICAgaWYgKCFwb3NBdHRyKSByZXR1cm47XG4gICAgICBjb25zdCBpbmRleEF0dHIgPSBnZW9tLmdldEluZGV4KCk7XG4gICAgICBjb25zdCBjb3VudCA9IGluZGV4QXR0ciA/IGluZGV4QXR0ci5jb3VudCA6IHBvc0F0dHIuY291bnQ7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpICs9IDMpIHtcbiAgICAgICAgY29uc3QgaUEgPSBpbmRleEF0dHIgPyBpbmRleEF0dHIuZ2V0WChpKSA6IGk7XG4gICAgICAgIGNvbnN0IGlCID0gaW5kZXhBdHRyID8gaW5kZXhBdHRyLmdldFgoaSArIDEpIDogaSArIDE7XG4gICAgICAgIGNvbnN0IGlDID0gaW5kZXhBdHRyID8gaW5kZXhBdHRyLmdldFgoaSArIDIpIDogaSArIDI7XG4gICAgICAgIHZBLmZyb21CdWZmZXJBdHRyaWJ1dGUocG9zQXR0ciwgaUEpLmFwcGx5TWF0cml4NChjaGlsZC5tYXRyaXhXb3JsZCk7XG4gICAgICAgIHZCLmZyb21CdWZmZXJBdHRyaWJ1dGUocG9zQXR0ciwgaUIpLmFwcGx5TWF0cml4NChjaGlsZC5tYXRyaXhXb3JsZCk7XG4gICAgICAgIHZDLmZyb21CdWZmZXJBdHRyaWJ1dGUocG9zQXR0ciwgaUMpLmFwcGx5TWF0cml4NChjaGlsZC5tYXRyaXhXb3JsZCk7XG4gICAgICAgIGNiLnN1YlZlY3RvcnModkMsIHZCKTtcbiAgICAgICAgYWIuc3ViVmVjdG9ycyh2QSwgdkIpO1xuICAgICAgICBjYi5jcm9zcyhhYikubm9ybWFsaXplKCk7XG4gICAgICAgIGxpbmVzLnB1c2goYCAgZmFjZXQgbm9ybWFsICR7Y2IueC50b0ZpeGVkKDUpfSAke2NiLnkudG9GaXhlZCg1KX0gJHtjYi56LnRvRml4ZWQoNSl9YCk7XG4gICAgICAgIGxpbmVzLnB1c2goJyAgICBvdXRlciBsb29wJyk7XG4gICAgICAgIGxpbmVzLnB1c2goYCAgICAgIHZlcnRleCAke3ZBLngudG9GaXhlZCg1KX0gJHt2QS55LnRvRml4ZWQoNSl9ICR7dkEuei50b0ZpeGVkKDUpfWApO1xuICAgICAgICBsaW5lcy5wdXNoKGAgICAgICB2ZXJ0ZXggJHt2Qi54LnRvRml4ZWQoNSl9ICR7dkIueS50b0ZpeGVkKDUpfSAke3ZCLnoudG9GaXhlZCg1KX1gKTtcbiAgICAgICAgbGluZXMucHVzaChgICAgICAgdmVydGV4ICR7dkMueC50b0ZpeGVkKDUpfSAke3ZDLnkudG9GaXhlZCg1KX0gJHt2Qy56LnRvRml4ZWQoNSl9YCk7XG4gICAgICAgIGxpbmVzLnB1c2goJyAgICBlbmRsb29wJyk7XG4gICAgICAgIGxpbmVzLnB1c2goJyAgZW5kZmFjZXQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBsaW5lcy5wdXNoKGBlbmRzb2xpZCAke3NvbGlkTmFtZX1gKTtcbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xufVxuXG4iXX0=