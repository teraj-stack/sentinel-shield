import * as THREE from "/apps/holoarch/node_modules/.vite/deps/three.js?v=50682de0";
/**
* Generates the glowing holographic World Map + Bottom Telemetry Console texture
* inspired by the boardroom table in the reference image.
*/
export function createWorldMapTableTexture(maxAnisotropy) {
	const canvas = document.createElement("canvas");
	canvas.width = 2048;
	canvas.height = 1024;
	const ctx = canvas.getContext("2d");
	// Deep obsidian reflective base
	const bgGrad = ctx.createRadialGradient(1024, 460, 80, 1024, 512, 1100);
	bgGrad.addColorStop(0, "#092438");
	bgGrad.addColorStop(.55, "#051322");
	bgGrad.addColorStop(1, "#02070e");
	ctx.fillStyle = bgGrad;
	ctx.fillRect(0, 0, 2048, 1024);
	// Subtle lat/lon cartographic grid
	ctx.strokeStyle = "rgba(56, 189, 248, 0.14)";
	ctx.lineWidth = 1;
	for (let x = 80; x < 1968; x += 64) {
		ctx.beginPath();
		ctx.moveTo(x, 40);
		ctx.lineTo(x, 800);
		ctx.stroke();
	}
	for (let y = 60; y < 800; y += 56) {
		ctx.beginPath();
		ctx.moveTo(80, y);
		ctx.lineTo(1968, y);
		ctx.stroke();
	}
	// Central rotary emitter rings
	const centerRings = [
		90,
		145,
		210,
		285,
		360
	];
	centerRings.forEach((r, idx) => {
		ctx.beginPath();
		ctx.arc(1024, 430, r, 0, Math.PI * 2);
		ctx.strokeStyle = idx % 2 === 0 ? "rgba(34, 211, 238, 0.45)" : "rgba(251, 191, 36, 0.32)";
		ctx.lineWidth = idx === 1 ? 3 : 1.5;
		ctx.stroke();
	});
	// Helper to draw stylized continent polygons with glowing city nodes
	const drawContinent = (points) => {
		ctx.beginPath();
		points.forEach(([px, py], i) => {
			if (i === 0) ctx.moveTo(px, py);
			else ctx.lineTo(px, py);
		});
		ctx.closePath();
		ctx.fillStyle = "rgba(245, 158, 11, 0.18)";
		ctx.fill();
		ctx.strokeStyle = "rgba(56, 189, 248, 0.72)";
		ctx.lineWidth = 2.2;
		ctx.stroke();
		// Scatter golden city light clusters inside bounding box
		let minX = 2048, maxX = 0, minY = 1024, maxY = 0;
		points.forEach(([x, y]) => {
			if (x < minX) minX = x;
			if (x > maxX) maxX = x;
			if (y < minY) minY = y;
			if (y > maxY) maxY = y;
		});
		ctx.save();
		ctx.clip();
		for (let i = 0; i < 160; i++) {
			const gx = minX + i * 97 % Math.max(20, maxX - minX);
			const gy = minY + i * 53 % Math.max(20, maxY - minY);
			const radius = i % 3 + 1.2;
			ctx.fillStyle = i % 4 === 0 ? "rgba(253, 224, 71, 0.92)" : "rgba(56, 189, 248, 0.65)";
			ctx.beginPath();
			ctx.arc(gx, gy, radius, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	};
	// North America
	drawContinent([
		[290, 210],
		[490, 190],
		[590, 290],
		[520, 410],
		[430, 460],
		[350, 380],
		[270, 290]
	]);
	// South America
	drawContinent([
		[510, 490],
		[640, 520],
		[690, 620],
		[610, 760],
		[540, 740],
		[495, 590]
	]);
	// Europe
	drawContinent([
		[890, 210],
		[1080, 195],
		[1140, 290],
		[1060, 360],
		[910, 355],
		[870, 280]
	]);
	// Africa
	drawContinent([
		[895, 390],
		[1095, 395],
		[1175, 510],
		[1110, 695],
		[995, 710],
		[925, 560]
	]);
	// Asia
	drawContinent([
		[1145, 195],
		[1560, 210],
		[1660, 340],
		[1540, 490],
		[1340, 510],
		[1170, 410]
	]);
	// Australia
	drawContinent([
		[1490, 575],
		[1675, 570],
		[1710, 685],
		[1560, 715],
		[1470, 650]
	]);
	// Glowing intercontinental telemetry arcs
	const arcs = [
		[
			460,
			320,
			1024,
			430
		],
		[
			590,
			610,
			1024,
			430
		],
		[
			1024,
			430,
			1480,
			350
		],
		[
			1024,
			430,
			1590,
			640
		],
		[
			460,
			320,
			980,
			290
		]
	];
	arcs.forEach(([x1, y1, x2, y2]) => {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.quadraticCurveTo((x1 + x2) / 2, Math.min(y1, y2) - 90, x2, y2);
		ctx.strokeStyle = "rgba(34, 211, 238, 0.55)";
		ctx.lineWidth = 2;
		ctx.stroke();
	});
	// Central concentric holographic emitter rings (matching Zdj. 2 central city base)
	const emitterRings = [
		110,
		165,
		225,
		295,
		370,
		430
	];
	emitterRings.forEach((r, idx) => {
		ctx.beginPath();
		ctx.arc(1024, 430, r, 0, Math.PI * 2);
		ctx.strokeStyle = idx % 2 === 0 ? "rgba(0, 240, 255, 0.72)" : "rgba(186, 230, 253, 0.45)";
		ctx.lineWidth = idx === 2 ? 4 : 2;
		ctx.stroke();
	});
	// Left Foreground "GLOBAL NETWORK" Telemetry Panel on Tabletop (exact match to Zdj. 2)
	const gnX = 48;
	const gnY = 470;
	const gnW = 360;
	const gnH = 335;
	ctx.fillStyle = "rgba(4, 16, 32, 0.88)";
	ctx.fillRect(gnX, gnY, gnW, gnH);
	ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
	ctx.lineWidth = 2.5;
	ctx.strokeRect(gnX, gnY, gnW, gnH);
	ctx.fillStyle = "#e0f2fe";
	ctx.font = "700 22px \"Outfit\", sans-serif";
	ctx.fillText("GLOBAL NETWORK", gnX + 20, gnY + 36);
	const gnRows = [
		["Total Assets", "$ 12.48 B"],
		["Active Projects", "247"],
		["Global Offices", "36"],
		["Team Members", "1,284"]
	];
	gnRows.forEach(([label, val], rIdx) => {
		const ry = gnY + 74 + rIdx * 38;
		ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.moveTo(gnX + 18, ry + 10);
		ctx.lineTo(gnX + gnW - 18, ry + 10);
		ctx.stroke();
		ctx.fillStyle = "#93c5fd";
		ctx.font = "500 17px \"Plus Jakarta Sans\", sans-serif";
		ctx.fillText(label, gnX + 20, ry);
		ctx.fillStyle = "#ffffff";
		ctx.font = "700 19px \"JetBrains Mono\", monospace";
		ctx.fillText(val, gnX + 225, ry);
	});
	// 3 Circular Gauges (72%, 46%, 16%) inside GLOBAL NETWORK panel
	const gnGauges = [
		{
			pct: "72%",
			sub: "72%",
			angle: .72 * Math.PI * 2
		},
		{
			pct: "46%",
			sub: "46%",
			angle: .46 * Math.PI * 2
		},
		{
			pct: "16%",
			sub: "93%",
			angle: .82 * Math.PI * 2
		}
	];
	gnGauges.forEach((g, gIdx) => {
		const gx = gnX + 68 + gIdx * 110;
		const gy = gnY + 258;
		ctx.beginPath();
		ctx.arc(gx, gy, 30, 0, Math.PI * 2);
		ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
		ctx.lineWidth = 5;
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(gx, gy, 30, -Math.PI / 2, -Math.PI / 2 + g.angle);
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 5;
		ctx.stroke();
		ctx.fillStyle = "#f8fafc";
		ctx.font = "700 16px \"JetBrains Mono\", monospace";
		ctx.fillText(g.pct, gx - 18, gy + 6);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "700 18px \"JetBrains Mono\", monospace";
		ctx.fillText(g.sub, gx - 20, gy + 58);
	});
	// Bottom Tabletop Telemetry Strip (matching the 5 lower panels on the table edge)
	const stripY = 825;
	const stripH = 165;
	ctx.fillStyle = "rgba(4, 15, 28, 0.92)";
	ctx.fillRect(60, stripY, 1928, stripH);
	ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
	ctx.lineWidth = 2;
	ctx.strokeRect(60, stripY, 1928, stripH);
	const modules = [
		{
			title: "GLOBAL NETWORK CORE",
			metrics: ["$12.48B", "247 PROJ"]
		},
		{
			title: "METROPOLIS SKYLINE BIM",
			metrics: ["1,284", "93% SYNC"]
		},
		{
			title: "REGIONAL ANALYTICS",
			metrics: [
				"72%",
				"46%",
				"93%"
			]
		},
		{
			title: "SUSTAINABLE FUTURE",
			metrics: ["CO2 -40%", "72% EFF"]
		},
		{
			title: "AI INSIGHTS TELEMETRY",
			metrics: ["ARKit 6", "ARCore"]
		}
	];
	const modW = 1928 / modules.length;
	modules.forEach((mod, idx) => {
		const mx = 60 + idx * modW;
		ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
		ctx.strokeRect(mx + 8, stripY + 8, modW - 16, stripH - 16);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "600 18px \"Plus Jakarta Sans\", sans-serif";
		ctx.fillText(mod.title, mx + 24, stripY + 36);
		// Draw circular gauge or bar chart inside each module
		if (idx === 2 || idx === 3) {
			mod.metrics.forEach((m, gIdx) => {
				const cx = mx + 75 + gIdx * 105;
				const cy = stripY + 102;
				ctx.beginPath();
				ctx.arc(cx, cy, 32, 0, Math.PI * 2);
				ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
				ctx.lineWidth = 5;
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(cx, cy, 32, -Math.PI / 2, Math.PI * .85);
				ctx.strokeStyle = gIdx === 1 ? "#fbbf24" : "#22d3ee";
				ctx.lineWidth = 5;
				ctx.stroke();
				ctx.fillStyle = "#f8fafc";
				ctx.font = "600 16px \"JetBrains Mono\", monospace";
				ctx.fillText(m, cx - 20, cy + 6);
			});
		} else {
			// Bar waveform
			for (let b = 0; b < 24; b++) {
				const bh = 18 + (b * 19 + idx * 13) % 68;
				ctx.fillStyle = b % 5 === 0 ? "#fbbf24" : "rgba(34, 211, 238, 0.75)";
				ctx.fillRect(mx + 26 + b * 13, stripY + 140 - bh, 8, bh);
			}
		}
	});
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = maxAnisotropy;
	texture.needsUpdate = true;
	return texture;
}
/**
* Generates the ARKit / ARCore Depth Sensor Surface Plane Detection Mesh texture
* for both Tabletop and Floor plane overlays.
*/
export function createLiDARPlaneGridTexture(maxAnisotropy, isTabletop) {
	const canvas = document.createElement("canvas");
	canvas.width = 1024;
	canvas.height = 1024;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 1024, 1024);
	const primaryColor = isTabletop ? "rgba(34, 211, 238, 0.55)" : "rgba(251, 191, 36, 0.38)";
	const nodeColor = isTabletop ? "rgba(165, 243, 252, 0.9)" : "rgba(253, 224, 71, 0.75)";
	// Draw triangulated / hexagonal LiDAR sensor mesh
	const step = 64;
	ctx.strokeStyle = primaryColor;
	ctx.lineWidth = 1.5;
	for (let y = 0; y <= 1024; y += step) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(1024, y);
		ctx.stroke();
	}
	for (let x = 0; x <= 1024; x += step) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, 1024);
		ctx.stroke();
		// Diagonal triangulation lines characteristic of ARPlaneMeshVisualizer
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(0, x);
		ctx.stroke();
	}
	// LiDAR feature points at intersections
	for (let y = step; y < 1024; y += step) {
		for (let x = step; x < 1024; x += step) {
			ctx.fillStyle = nodeColor;
			ctx.beginPath();
			ctx.arc(x, y, 2.8, 0, Math.PI * 2);
			ctx.fill();
			// Crosshair ticks every 4 cells
			if (x / step % 4 === 0 && y / step % 4 === 0) {
				ctx.strokeStyle = nodeColor;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.moveTo(x - 10, y);
				ctx.lineTo(x + 10, y);
				ctx.moveTo(x, y - 10);
				ctx.lineTo(x, y + 10);
				ctx.stroke();
			}
		}
	}
	// Outer AR Plane boundary frame
	ctx.strokeStyle = nodeColor;
	ctx.lineWidth = 6;
	ctx.strokeRect(8, 8, 1008, 1008);
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.anisotropy = maxAnisotropy;
	texture.needsUpdate = true;
	return texture;
}
/**
* Generates the architectural diagrid exoskeleton & BIM floor-slab facade texture
* for the holographic skyscrapers.
*/
export function createDiagridFacadeTexture(maxAnisotropy, style) {
	const canvas = document.createElement("canvas");
	canvas.width = 512;
	canvas.height = 1024;
	const ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, 512, 1024);
	const isGold = style === "Złoto-Błękitna Matryca Solarna";
	const isPureCyan = style === "Wolumetryczna Siatka Cyjanowa";
	const mainStroke = isGold ? "rgba(251, 191, 36, 0.92)" : "rgba(34, 211, 238, 0.92)";
	const secondaryStroke = isPureCyan ? "rgba(56, 189, 248, 0.65)" : "rgba(253, 224, 71, 0.68)";
	// Subtle translucent glass glow
	ctx.fillStyle = isGold ? "rgba(245, 158, 11, 0.08)" : "rgba(14, 165, 233, 0.09)";
	ctx.fillRect(0, 0, 512, 1024);
	// Horizontal BIM floor slabs (32 floors per texture repeat)
	for (let y = 0; y <= 1024; y += 32) {
		ctx.strokeStyle = y % 128 === 0 ? mainStroke : "rgba(56, 189, 248, 0.38)";
		ctx.lineWidth = y % 128 === 0 ? 3.5 : 1.5;
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(512, y);
		ctx.stroke();
	}
	// Vertical structural columns & mullions
	for (let x = 0; x <= 512; x += 32) {
		ctx.strokeStyle = x % 128 === 0 ? mainStroke : "rgba(56, 189, 248, 0.25)";
		ctx.lineWidth = x % 128 === 0 ? 3 : 1;
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, 1024);
		ctx.stroke();
	}
	// Parametric Diagrid Exoskeleton cross-bracing
	ctx.strokeStyle = secondaryStroke;
	ctx.lineWidth = 4.5;
	const diagStep = 128;
	for (let y = -512; y <= 1024; y += diagStep) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(512, y + 512);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(512, y);
		ctx.lineTo(0, y + 512);
		ctx.stroke();
	}
	// Glowing structural nodes at diagrid intersections
	for (let y = 0; y <= 1024; y += 64) {
		for (let x = 0; x <= 512; x += 64) {
			ctx.fillStyle = "#ffffff";
			ctx.beginPath();
			ctx.arc(x, y, 3.2, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.anisotropy = maxAnisotropy;
	texture.needsUpdate = true;
	return texture;
}
/**
* Helper to draw a rounded rectangle path on CanvasRenderingContext2D
*/
function drawRoundedRectPath(ctx, x, y, w, h, r) {
	const radius = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + radius, y);
	ctx.lineTo(x + w - radius, y);
	ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
	ctx.lineTo(x + w, y + h - radius);
	ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
	ctx.lineTo(x + radius, y + h);
	ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
	ctx.lineTo(x, y + radius);
	ctx.quadraticCurveTo(x, y, x + radius, y);
	ctx.closePath();
}
/**
* Generates textures for the floating 3D screens:
* - 'Szklany Panel Interaktywny (Frosted Glass UI)': Matches the attached frosted lavender-white glass card
*   with rounded white specular border, bold indigo-violet "Make It Pop!" typography, diagonal ↗ arrow,
*   and bottom rounded dock bar containing 4 circular icon buttons (Home, Spec Note, Module Cap, Cart/Export).
* - 'Hologram Techniczny CAD (Ciemny Cyjan)': Dark cyan technical CAD HUD.
*/
export function createFloatingHudTexture(maxAnisotropy, panelType, screenStyle = "Szklany Panel Interaktywny (Frosted Glass UI)", activeIconIndex = 0) {
	// Option 0: Zdj. 2 — "Hologramy Global Network (Zdj. 2 · Telemetria & Mapa)"
	// Matches the translucent cyan-glass holographic screens floating across the boardroom in zdj._2.png
	if (screenStyle === "Hologramy Global Network (Zdj. 2 · Telemetria & Mapa)") {
		const canvas = document.createElement("canvas");
		canvas.width = 880;
		canvas.height = 560;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 880, 560);
		// Translucent cyan-sapphire glass card with rounded corners & glowing double border
		drawRoundedRectPath(ctx, 14, 14, 852, 532, 22);
		const bgGrad = ctx.createLinearGradient(14, 14, 866, 546);
		bgGrad.addColorStop(0, "rgba(8, 36, 68, 0.76)");
		bgGrad.addColorStop(.5, "rgba(6, 25, 48, 0.68)");
		bgGrad.addColorStop(1, "rgba(4, 18, 38, 0.78)");
		ctx.fillStyle = bgGrad;
		ctx.fill();
		ctx.strokeStyle = "rgba(56, 189, 248, 0.92)";
		ctx.lineWidth = 3.5;
		ctx.stroke();
		drawRoundedRectPath(ctx, 24, 24, 832, 512, 16);
		ctx.strokeStyle = "rgba(186, 230, 253, 0.32)";
		ctx.lineWidth = 1.5;
		ctx.stroke();
		// Top Header Bar
		ctx.fillStyle = "rgba(14, 165, 233, 0.24)";
		ctx.fillRect(26, 26, 828, 52);
		const headerTitles = {
			prism: "GLOBAL NETWORK  ·  GLOBAL INTELLIGENCE",
			turbine: "REGIONAL ANALYTICS  ·  WORLD DISTRIBUTION",
			core: "PROJECT OVERVIEW  ·  SKYLINE METRICS",
			biosphere: "SUSTAINABLE FUTURE  ·  GLOBAL OPERATIONS",
			neural: "AI INSIGHTS  ·  PROJECT HORIZONS MATRIX"
		};
		ctx.fillStyle = "#f0f9ff";
		ctx.font = "700 22px \"Outfit\", sans-serif";
		ctx.fillText(headerTitles[panelType], 44, 60);
		ctx.fillStyle = "#38bdf8";
		ctx.font = "600 15px \"JetBrains Mono\", monospace";
		ctx.fillText(`CH-0${activeIconIndex % 4 + 1} LIVE`, 740, 58);
		if (panelType === "prism") {
			// Left side: 3D Holographic Skyscraper Bar Chart (like "GLOBAL NETWORK" screen on left of zdj._2.png)
			ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
			ctx.strokeRect(42, 96, 370, 345);
			const towerHeights = [
				140,
				210,
				285,
				195,
				250,
				165,
				230,
				130
			];
			towerHeights.forEach((th, idx) => {
				const bx = 66 + idx * 41;
				const by = 415 - th;
				const tGrad = ctx.createLinearGradient(bx, by, bx, 415);
				tGrad.addColorStop(0, "rgba(186, 230, 253, 0.95)");
				tGrad.addColorStop(1, "rgba(14, 165, 233, 0.28)");
				ctx.fillStyle = tGrad;
				ctx.fillRect(bx, by, 26, th);
				ctx.strokeStyle = "#7dd3fc";
				ctx.lineWidth = 1.5;
				ctx.strokeRect(bx, by, 26, th);
			});
			// Right side: "GLOBAL INTELLIGENCE" World Map + Wireframe Globe + Category List
			ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
			ctx.strokeRect(430, 96, 408, 345);
			ctx.fillStyle = "#bae6fd";
			ctx.font = "600 17px \"Plus Jakarta Sans\", sans-serif";
			const cats = [
				"• Next-Gen BIM Core",
				"• Global Data Mesh",
				"• Microdata Nodes",
				"• Smart Technology",
				"• Logistics & Flow"
			];
			cats.forEach((c, i) => {
				ctx.fillText(c, 448, 136 + i * 34);
			});
			// Wireframe Globe on right
			const gx = 745;
			const gy = 215;
			ctx.strokeStyle = "#38bdf8";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(gx, gy, 64, 0, Math.PI * 2);
			ctx.stroke();
			for (let rx = 20; rx <= 50; rx += 15) {
				ctx.beginPath();
				ctx.ellipse(gx, gy, rx, 64, 0, 0, Math.PI * 2);
				ctx.stroke();
			}
			// Bottom waveform inside right box
			ctx.beginPath();
			for (let x = 448; x <= 816; x += 16) {
				const wy = 395 - Math.sin(x * .05 + activeIconIndex) * 24 - x * 7 % 28;
				if (x === 448) ctx.moveTo(x, wy);
				else ctx.lineTo(x, wy);
			}
			ctx.strokeStyle = "#22d3ee";
			ctx.lineWidth = 2.5;
			ctx.stroke();
		} else if (panelType === "turbine") {
			// Top-Left Screen in zdj._2.png: Rotating Wireframe Globe + Regional Breakdown Table + Area Graph
			const gx = 155;
			const gy = 255;
			ctx.strokeStyle = "#38bdf8";
			ctx.lineWidth = 2.5;
			ctx.beginPath();
			ctx.arc(gx, gy, 92, 0, Math.PI * 2);
			ctx.stroke();
			for (let r = 28; r <= 78; r += 25) {
				ctx.beginPath();
				ctx.ellipse(gx, gy, r, 92, .2, 0, Math.PI * 2);
				ctx.stroke();
				ctx.beginPath();
				ctx.ellipse(gx, gy, 92, r, .2, 0, Math.PI * 2);
				ctx.stroke();
			}
			const regions = [
				["South America", "27%"],
				["Europe", "28%"],
				["Asia Pacific", "37%"],
				["North America", "25%"],
				["Middle East & Africa", "6%"]
			];
			regions.forEach(([rName, rPct], idx) => {
				const ry = 148 + idx * 48;
				ctx.fillStyle = "#e0f2fe";
				ctx.font = "500 20px \"Plus Jakarta Sans\", sans-serif";
				ctx.fillText(rName, 290, ry);
				ctx.fillStyle = "#38bdf8";
				ctx.font = "700 21px \"JetBrains Mono\", monospace";
				ctx.fillText(rPct, 535, ry);
			});
			// Right mini area chart
			ctx.beginPath();
			ctx.moveTo(625, 380);
			for (let x = 625; x <= 825; x += 20) {
				const py = 270 - Math.sin((x - 625) * .035) * 55 - x * 13 % 35;
				ctx.lineTo(x, py);
			}
			ctx.lineTo(825, 380);
			ctx.closePath();
			ctx.fillStyle = "rgba(56, 189, 248, 0.32)";
			ctx.fill();
			ctx.strokeStyle = "#7dd3fc";
			ctx.lineWidth = 2.5;
			ctx.stroke();
		} else if (panelType === "core") {
			// Center-Top Screen in zdj._2.png: "PROJECT OVERVIEW" Skyline Histogram + Metrics Table
			for (let b = 0; b < 22; b++) {
				const bh = 45 + (b * 37 + 19) % 210;
				const bx = 52 + b * 18;
				const by = 395 - bh;
				ctx.fillStyle = b % 3 === 0 ? "#bae6fd" : "rgba(56, 189, 248, 0.72)";
				ctx.fillRect(bx, by, 12, bh);
			}
			const projRows = [
				["Elevation Spire", "556"],
				["Central Nexus", "516"],
				["High Fullroof", "118"],
				["Active Nodes", "254"],
				["Core Capacity", "388"]
			];
			projRows.forEach(([label, val], idx) => {
				const ry = 152 + idx * 48;
				ctx.fillStyle = "#cbd5e1";
				ctx.font = "500 20px \"Plus Jakarta Sans\", sans-serif";
				ctx.fillText(label, 485, ry);
				ctx.fillStyle = "#ffffff";
				ctx.font = "700 22px \"JetBrains Mono\", monospace";
				ctx.fillText(val, 745, ry);
			});
		} else if (panelType === "biosphere") {
			// Right-Center Screen in zdj._2.png: "SUSTAINABLE FUTURE" (CO2 40%, Energy 50%, Waste 20%, 72% circle)
			// Eco Circle + Leaf on Left
			ctx.beginPath();
			ctx.arc(155, 225, 72, 0, Math.PI * 2);
			ctx.strokeStyle = "#7dd3fc";
			ctx.lineWidth = 3;
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(125, 255);
			ctx.quadraticCurveTo(130, 185, 190, 190);
			ctx.quadraticCurveTo(185, 250, 125, 255);
			ctx.strokeStyle = "#6ee7b7";
			ctx.lineWidth = 3.5;
			ctx.stroke();
			ctx.fillStyle = "#f8fafc";
			ctx.font = "700 26px \"Outfit\", sans-serif";
			ctx.fillText("CO₂  &  40%", 275, 175);
			ctx.fillText("Energy & 50%", 275, 240);
			ctx.fillText("Waste  & 20%", 275, 305);
			// Right 72% Circular Gauge
			ctx.beginPath();
			ctx.arc(675, 205, 68, 0, Math.PI * 2);
			ctx.strokeStyle = "rgba(186, 230, 253, 0.35)";
			ctx.lineWidth = 6;
			ctx.stroke();
			ctx.beginPath();
			ctx.arc(675, 205, 68, -Math.PI / 2, Math.PI * .95);
			ctx.strokeStyle = "#38bdf8";
			ctx.lineWidth = 7;
			ctx.stroke();
			ctx.fillStyle = "#ffffff";
			ctx.font = "700 28px \"JetBrains Mono\", monospace";
			ctx.fillText("72%", 642, 215);
			// Bottom mini bar chart
			for (let i = 0; i < 14; i++) {
				const h = 25 + i * 23 % 75;
				ctx.fillStyle = "#bae6fd";
				ctx.fillRect(565 + i * 18, 410 - h, 11, h);
			}
		} else {
			// Far-Right Screen in zdj._2.png: "AI INSIGHTS" & 2x3 City Perspective Grid ("PROJECT HORIZONS")
			for (let row = 0; row < 2; row++) {
				for (let col = 0; col < 3; col++) {
					const cx = 48 + col * 265;
					const cy = 104 + row * 162;
					const cw = 248;
					const ch = 144;
					ctx.fillStyle = "rgba(8, 47, 73, 0.65)";
					ctx.fillRect(cx, cy, cw, ch);
					ctx.strokeStyle = "#38bdf8";
					ctx.lineWidth = 2;
					ctx.strokeRect(cx, cy, cw, ch);
					// Perspective horizon & mini city bars inside each feed cell
					for (let b = 0; b < 9; b++) {
						const bh = 22 + (b * 19 + row * 17 + col * 11) % 78;
						ctx.fillStyle = b === 4 ? "#e0f2fe" : "rgba(56, 189, 248, 0.75)";
						ctx.fillRect(cx + 28 + b * 22, cy + ch - 18 - bh, 14, bh);
					}
				}
			}
		}
		// Bottom Interactive 4-Button Bar for clicking in 3D
		const btnLabels = [
			"01 OVERVIEW",
			"02 BIM DATA",
			"03 TELEMETRY",
			"04 SYNC AR"
		];
		btnLabels.forEach((lbl, idx) => {
			const bx = 42 + idx * 204;
			const by = 456;
			const isAct = idx === activeIconIndex % 4;
			ctx.fillStyle = isAct ? "rgba(14, 165, 233, 0.45)" : "rgba(15, 23, 42, 0.65)";
			ctx.fillRect(bx, by, 188, 54);
			ctx.strokeStyle = isAct ? "#e0f2fe" : "rgba(56, 189, 248, 0.45)";
			ctx.lineWidth = isAct ? 2.5 : 1.5;
			ctx.strokeRect(bx, by, 188, 54);
			ctx.fillStyle = isAct ? "#ffffff" : "#7dd3fc";
			ctx.font = "700 16px \"JetBrains Mono\", monospace";
			ctx.fillText(lbl, bx + 26, by + 33);
		});
		const texture = new THREE.CanvasTexture(canvas);
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.anisotropy = maxAnisotropy;
		texture.needsUpdate = true;
		return texture;
	}
	const isUltraClear98 = screenStyle === "Szklany Ekran Krystaliczny (98% Przezroczystości)";
	if (screenStyle === "Szklany Panel Interaktywny (Frosted Glass UI)" || isUltraClear98) {
		const canvas = document.createElement("canvas");
		canvas.width = 768;
		canvas.height = 880;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 768, 880);
		const cardX = 34;
		const cardY = 24;
		const cardW = 700;
		const cardH = 832;
		const cardRadius = 74;
		// 1. Clip to main rounded glass card
		ctx.save();
		drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, cardRadius);
		ctx.clip();
		// Base glass fill: either Milky-Lavender Frosted Glass or 98% Transparent Ultra-Clear Crystal Glass (alpha = 0.02)
		const glassGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
		if (isUltraClear98) {
			glassGrad.addColorStop(0, "rgba(244, 244, 255, 0.02)");
			glassGrad.addColorStop(.45, "rgba(232, 229, 254, 0.02)");
			glassGrad.addColorStop(.8, "rgba(221, 217, 250, 0.02)");
			glassGrad.addColorStop(1, "rgba(235, 232, 255, 0.02)");
		} else {
			glassGrad.addColorStop(0, "rgba(244, 244, 255, 0.92)");
			glassGrad.addColorStop(.45, "rgba(232, 229, 254, 0.88)");
			glassGrad.addColorStop(.8, "rgba(221, 217, 250, 0.89)");
			glassGrad.addColorStop(1, "rgba(235, 232, 255, 0.93)");
		}
		ctx.fillStyle = glassGrad;
		ctx.fillRect(cardX, cardY, cardW, cardH);
		// Soft pastel blue-lavender ambient orb behind top-center of glass
		const topOrbGrad = ctx.createRadialGradient(360, 60, 20, 360, 80, 320);
		topOrbGrad.addColorStop(0, isUltraClear98 ? "rgba(202, 218, 255, 0.04)" : "rgba(202, 218, 255, 0.55)");
		topOrbGrad.addColorStop(.6, isUltraClear98 ? "rgba(218, 212, 255, 0.02)" : "rgba(218, 212, 255, 0.25)");
		topOrbGrad.addColorStop(1, "rgba(235, 232, 255, 0)");
		ctx.fillStyle = topOrbGrad;
		ctx.fillRect(cardX, cardY, cardW, 420);
		// Diagonal specular light reflection band across the glass
		ctx.save();
		ctx.translate(295, 340);
		ctx.rotate(-.24);
		const sheenGrad = ctx.createLinearGradient(-190, -320, 190, 320);
		sheenGrad.addColorStop(0, "rgba(255, 255, 255, 0.0)");
		sheenGrad.addColorStop(.32, isUltraClear98 ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.52)");
		sheenGrad.addColorStop(.52, isUltraClear98 ? "rgba(255, 255, 255, 0.11)" : "rgba(255, 255, 255, 0.72)");
		sheenGrad.addColorStop(.72, isUltraClear98 ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.28)");
		sheenGrad.addColorStop(1, "rgba(255, 255, 255, 0.0)");
		ctx.fillStyle = sheenGrad;
		ctx.fillRect(-220, -380, 380, 760);
		ctx.restore();
		// Subtle holographic geometric watermark in the middle-right of the glass card
		ctx.save();
		ctx.translate(545, 445);
		ctx.strokeStyle = isUltraClear98 ? "rgba(196, 181, 253, 0.35)" : "rgba(136, 118, 235, 0.22)";
		ctx.fillStyle = isUltraClear98 ? "rgba(167, 152, 248, 0.03)" : "rgba(167, 152, 248, 0.12)";
		ctx.lineWidth = 2.5;
		if (panelType === "prism" || panelType === "core") {
			// Faceted crystal polyhedron watermark
			ctx.beginPath();
			ctx.moveTo(0, -85);
			ctx.lineTo(78, -22);
			ctx.lineTo(48, 72);
			ctx.lineTo(-48, 72);
			ctx.lineTo(-78, -22);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(0, -85);
			ctx.lineTo(0, 72);
			ctx.moveTo(-78, -22);
			ctx.lineTo(78, -22);
			ctx.stroke();
		} else {
			// Concentric architectural rings
			for (let r = 34; r <= 78; r += 22) {
				ctx.beginPath();
				ctx.arc(0, 0, r, 0, Math.PI * 2);
				ctx.stroke();
			}
		}
		ctx.restore();
		// 2. Bold Indigo-Violet Headline & Body Copy (changes dynamically with panelType & activeIconIndex)
		const panelContent = {
			prism: {
				headers: [
					"Make It Pop!",
					"BIM Spec LOD-400",
					"Diagrid Structure",
					"AR Anchor Sync"
				],
				lines: [
					[
						"Lorem Ipsum Dolor Sit Amet,",
						"Consectetur Adipiscing Elit Ut Aliquam,",
						"Purus Sit Amet Luctus Venenatis · Alpha Spire"
					],
					[
						"Egzoszkielet Diagridowy 9:16 i Rdzeń BIM,",
						"Rozpoznawanie Blatu LiDAR (99.4% Lock),",
						"Oświetlenie Środowiskowe i Paralaksa 6DoF"
					],
					[
						"Struktura Nośna: 86–118 Kondygnacji,",
						"Stropy Płytowe + Szyby Windowe w Hologramie,",
						"Dynamiczna Siatka Głębi ARKit / ARCore"
					],
					[
						"Kotwica Przestrzenna ARAnchor Aktywna,",
						"Eksport Prefabu Unity 6 URP + Shader Graph,",
						"Synchronizacja Płaszczyzny Blatu i Podłogi"
					]
				],
				tag: "RESONANCE PRISM · ALPHA"
			},
			turbine: {
				headers: [
					"Make It Pop!",
					"Orbital Spine BIM",
					"Aero Diagrid 9:16",
					"LiDAR Plane Lock"
				],
				lines: [
					[
						"Lorem Ipsum Dolor Sit Amet,",
						"Consectetur Adipiscing Elit Ut Aliquam,",
						"Purus Sit Amet Luctus Venenatis · Orbital A"
					],
					[
						"Horyzontalny Kompleks Architektoniczny 9:16,",
						"Czujniki Głębi ToF / LiDAR na Blacie Stołu,",
						"Płynna Regulacja Ruchu Wahadłowego 6DoF"
					],
					[
						"Kaskadowy Układ 3D poza Jedną Linią,",
						"Wielowarstwowe Rdzenie Termiczne i Stropy,",
						"Okluzja Foteli i Obiektów Pierwszoplanowych"
					],
					[
						"Gotowy Pakiet ARFoundation (ARKit + ARCore),",
						"Kalibracja Wymiarów Blatu i Pomieszczenia,",
						"Strumieniowanie Telemetrii GPU w Czasie Rzecz."
					]
				],
				tag: "ORBITAL SPINE · PROTOTYPE"
			},
			core: {
				headers: [
					"Make It Pop!",
					"Core Sync Nexus",
					"9:16 Horizon Wing",
					"Unity 6 URP Sync"
				],
				lines: [
					[
						"Lorem Ipsum Dolor Sit Amet,",
						"Consectetur Adipiscing Elit Ut Aliquam,",
						"Purus Sit Amet Luctus Venenatis · Core Sync"
					],
					[
						"Centralny Klaster Wieżowców ze Złotym Rdzeniem,",
						"Detekcja Płaszczyzn HorizontalUp (Blat + Posadzka),",
						"Harmoniki Sferyczne i Odbicia PBR na Stole"
					],
					[
						"Proporcje Modeli 9:16 oraz Układ Amfiteatralny,",
						"Rozstrzelenie Warstw Kondygnacji BIM w 3D,",
						"Cząsteczki Atmosferyczne za Łukowymi Oknami"
					],
					[
						"Zapisano Konfigurację Sceny Hologramowej,",
						"Aktywna Maska Szablonowa Stencil Buffer = 2,",
						"Stabilizacja Śledzenia 6DoF SLAM: 99.8%"
					]
				],
				tag: "CORE SYNC · NEURAL MESH"
			},
			biosphere: {
				headers: [
					"Make It Pop!",
					"Bio-Sphere Cure II",
					"Eco Atria & Floors",
					"Env Light Probe"
				],
				lines: [
					[
						"Lorem Ipsum Dolor Sit Amet,",
						"Consectetur Adipiscing Elit Ut Aliquam,",
						"Purus Sit Amet Luctus Venenatis · Biosphere"
					],
					[
						"Zintegrowane Ogrody Pionowe i Atria 9:16,",
						"Estymacja Światła Słonecznego z Okien Sali,",
						"Dynamiczny Pył Świetlny w Portalu Okiennym"
					],
					[
						"Symulacja Przepływu Powietrza i Nasłonecznienia,",
						"Grupy 2–5 Budynków na Nieliniowej Siatce 3D,",
						"Adaptacyjna Gęstość Siatki Hologramu LOD"
					],
					[
						"Moduł Środowiskowy ARCameraManager Aktywny,",
						"Eksport Oświetlenia HDRP / URP Reflection Probe,",
						"Poziom Ufności Skanera Głębi LiDAR: 99.6%"
					]
				],
				tag: "ECOLOGICAL BIOSPHERE · II"
			},
			neural: {
				headers: [
					"Make It Pop!",
					"Neural Array 3D",
					"Spatial Topology",
					"6DoF Depth Matrix"
				],
				lines: [
					[
						"Lorem Ipsum Dolor Sit Amet,",
						"Consectetur Adipiscing Elit Ut Aliquam,",
						"Purus Sit Amet Luctus Venenatis · Neural Mesh"
					],
					[
						"Wieloplanowa Siatka Neuronowa i Węzły BIM,",
						"Głębia Obrazu z Paralaksą Ruchową Urządzenia,",
						"Rozmieszczenie Kaskadowe i Łukowe na Blacie"
					],
					[
						"Poziome Skrzydła 9:16 + Iglice Wschodnie,",
						"Precyzyjna Okluzja Głębi (Environment Depth),",
						"Monitoring FPS, RAM/VRAM i Draw Calli na Żywo"
					],
					[
						"Synchronizacja Węzłów Geometrycznych Zakończona,",
						"Gotowość do Wdrożenia na iOS ARKit i Android ARCore,",
						"Kliknij Ikony Poniżej, aby Przełączyć Tryb Ekranu"
					]
				],
				tag: "ACTIVE MESH · NEURAL ARRAY"
			}
		};
		const safeIdx = (activeIconIndex % 4 + 4) % 4;
		const info = panelContent[panelType];
		// Subtle top category pill label
		ctx.save();
		if (isUltraClear98) {
			ctx.shadowColor = "rgba(15, 10, 40, 0.85)";
			ctx.shadowBlur = 10;
		}
		ctx.fillStyle = isUltraClear98 ? "rgba(221, 214, 254, 0.92)" : "rgba(91, 72, 212, 0.62)";
		ctx.font = "700 16px \"JetBrains Mono\", monospace";
		ctx.fillText(isUltraClear98 ? `${info.tag} · 98% CLEAR` : info.tag, 96, 118);
		// Main Bold Headline ("Make It Pop!" style from attached image)
		ctx.fillStyle = isUltraClear98 ? "#f5f3ff" : "#4c37c4";
		ctx.font = "800 58px \"Outfit\", sans-serif";
		ctx.fillText(info.headers[safeIdx], 94, 196);
		// 3 Lines of clean body text
		ctx.fillStyle = isUltraClear98 ? "#ddd6fe" : "#5643bf";
		ctx.font = "500 24px \"Plus Jakarta Sans\", sans-serif";
		const activeLines = info.lines[safeIdx];
		activeLines.forEach((line, lIdx) => {
			ctx.fillText(line, 96, 266 + lIdx * 40);
		});
		ctx.restore();
		// 3. Signature Diagonal Lavender-Indigo Arrow (↗) at middle-left (matching attached image)
		ctx.save();
		ctx.translate(132, 488);
		ctx.strokeStyle = isUltraClear98 ? "rgba(221, 214, 254, 0.95)" : "rgba(182, 168, 248, 0.85)";
		ctx.lineWidth = 7.5;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.beginPath();
		ctx.moveTo(-28, 28);
		ctx.lineTo(28, -28);
		ctx.moveTo(-6, -28);
		ctx.lineTo(28, -28);
		ctx.lineTo(28, 6);
		ctx.stroke();
		ctx.restore();
		// Subtle interactive status pill in lower-right above dock
		drawRoundedRectPath(ctx, 392, 540, 288, 48, 24);
		ctx.fillStyle = isUltraClear98 ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.55)";
		ctx.fill();
		ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
		ctx.lineWidth = 2;
		ctx.stroke();
		ctx.fillStyle = isUltraClear98 ? "#ede9fe" : "#4c37c4";
		ctx.font = "700 15px \"JetBrains Mono\", monospace";
		ctx.fillText(isUltraClear98 ? `SZKŁO 98% · TRYB 0${safeIdx + 1}/04` : `TRYB 0${safeIdx + 1}/04 · INTERAKTYWNY`, 412, 570);
		// 4. Bottom Rounded Interactive Dock Bar (y = 634 to 856) matching attached image
		const dockY = 634;
		const dockH = 222;
		drawRoundedRectPath(ctx, cardX, dockY, cardW, dockH, 72);
		const dockGrad = ctx.createLinearGradient(cardX, dockY, cardX, dockY + dockH);
		if (isUltraClear98) {
			dockGrad.addColorStop(0, "rgba(244, 242, 255, 0.025)");
			dockGrad.addColorStop(1, "rgba(232, 228, 254, 0.035)");
		} else {
			dockGrad.addColorStop(0, "rgba(244, 242, 255, 0.72)");
			dockGrad.addColorStop(1, "rgba(232, 228, 254, 0.88)");
		}
		ctx.fillStyle = dockGrad;
		ctx.fill();
		// Crisp white specular top border of the bottom dock bar
		ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
		ctx.lineWidth = 3.5;
		ctx.stroke();
		// 5. Four Circular Icon Buttons inside the Bottom Dock Bar
		const buttonCentersX = [
			168,
			312,
			456,
			600
		];
		const buttonCenterY = 745;
		const btnRadius = 52;
		buttonCentersX.forEach((cx, bIdx) => {
			const isActive = bIdx === safeIdx;
			ctx.save();
			if (isActive) {
				// Active deep indigo-violet glowing circular button (like button #1 in reference photo)
				ctx.shadowColor = "rgba(84, 58, 214, 0.55)";
				ctx.shadowBlur = 24;
				ctx.shadowOffsetY = 6;
				const activeBtnGrad = ctx.createRadialGradient(cx - 12, buttonCenterY - 14, 6, cx, buttonCenterY, btnRadius);
				activeBtnGrad.addColorStop(0, "#6e55f0");
				activeBtnGrad.addColorStop(.65, "#543ad6");
				activeBtnGrad.addColorStop(1, "#442bb8");
				ctx.beginPath();
				ctx.arc(cx, buttonCenterY, btnRadius, 0, Math.PI * 2);
				ctx.fillStyle = activeBtnGrad;
				ctx.fill();
				// Outer soft lavender halo ring
				ctx.shadowBlur = 0;
				ctx.shadowOffsetY = 0;
				ctx.lineWidth = 4;
				ctx.strokeStyle = "rgba(208, 198, 255, 0.88)";
				ctx.stroke();
			} else {
				// Inactive circular button (ultra-clear 98% glass or frosted lavender)
				ctx.beginPath();
				ctx.arc(cx, buttonCenterY, btnRadius + 5, 0, Math.PI * 2);
				ctx.strokeStyle = isUltraClear98 ? "rgba(221, 214, 254, 0.48)" : "rgba(198, 190, 248, 0.45)";
				ctx.lineWidth = 4;
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(cx, buttonCenterY, btnRadius, 0, Math.PI * 2);
				ctx.fillStyle = isUltraClear98 ? "rgba(235, 232, 255, 0.04)" : "rgba(235, 232, 255, 0.65)";
				ctx.fill();
				ctx.lineWidth = 2.5;
				ctx.strokeStyle = isUltraClear98 ? "rgba(221, 214, 254, 0.85)" : "rgba(168, 156, 240, 0.72)";
				ctx.stroke();
			}
			// Draw the 4 vector icons matching the attached image
			const inactiveIconColor = isUltraClear98 ? "#ede9fe" : "#4e38c2";
			ctx.strokeStyle = isActive ? "#ffffff" : inactiveIconColor;
			ctx.fillStyle = isActive ? "#ffffff" : inactiveIconColor;
			ctx.lineWidth = 3.5;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			if (bIdx === 0) {
				// Icon 0: Home / Architectural House icon
				ctx.beginPath();
				ctx.moveTo(cx, buttonCenterY - 20);
				ctx.lineTo(cx - 20, buttonCenterY - 3);
				ctx.lineTo(cx - 20, buttonCenterY + 18);
				ctx.quadraticCurveTo(cx - 20, buttonCenterY + 21, cx - 17, buttonCenterY + 21);
				ctx.lineTo(cx + 17, buttonCenterY + 21);
				ctx.quadraticCurveTo(cx + 20, buttonCenterY + 21, cx + 20, buttonCenterY + 18);
				ctx.lineTo(cx + 20, buttonCenterY - 3);
				ctx.closePath();
				ctx.stroke();
				// Inner arch door
				ctx.beginPath();
				ctx.moveTo(cx - 6, buttonCenterY + 21);
				ctx.lineTo(cx - 6, buttonCenterY + 8);
				ctx.arc(cx, buttonCenterY + 8, 6, Math.PI, 0, false);
				ctx.lineTo(cx + 6, buttonCenterY + 21);
				ctx.stroke();
			} else if (bIdx === 1) {
				// Icon 1: Document / Spec sheet with diagonal editing pen
				drawRoundedRectPath(ctx, cx - 19, buttonCenterY - 19, 32, 38, 7);
				ctx.stroke();
				// Horizontal lines inside document
				ctx.beginPath();
				ctx.moveTo(cx - 11, buttonCenterY - 8);
				ctx.lineTo(cx + 3, buttonCenterY - 8);
				ctx.moveTo(cx - 11, buttonCenterY);
				ctx.lineTo(cx + 1, buttonCenterY);
				ctx.moveTo(cx - 11, buttonCenterY + 8);
				ctx.lineTo(cx - 2, buttonCenterY + 8);
				ctx.stroke();
				// Diagonal pen
				ctx.beginPath();
				ctx.moveTo(cx + 4, buttonCenterY + 10);
				ctx.lineTo(cx + 21, buttonCenterY - 7);
				ctx.lineTo(cx + 15, buttonCenterY - 13);
				ctx.lineTo(cx - 2, buttonCenterY + 4);
				ctx.closePath();
				ctx.stroke();
			} else if (bIdx === 2) {
				// Icon 2: Puffed Cap / Crown / Architectural Dome Module icon (matching 3rd button in image)
				ctx.beginPath();
				ctx.moveTo(cx - 15, buttonCenterY + 4);
				ctx.lineTo(cx - 15, buttonCenterY + 18);
				ctx.quadraticCurveTo(cx, buttonCenterY + 21, cx + 15, buttonCenterY + 18);
				ctx.lineTo(cx + 15, buttonCenterY + 4);
				ctx.stroke();
				// 3 puffed top lobes
				ctx.beginPath();
				ctx.arc(cx - 11, buttonCenterY - 3, 9, Math.PI * .55, Math.PI * 1.65, false);
				ctx.arc(cx, buttonCenterY - 10, 11, Math.PI * 1.15, Math.PI * 1.85, false);
				ctx.arc(cx + 11, buttonCenterY - 3, 9, Math.PI * 1.35, Math.PI * .45, false);
				ctx.stroke();
				// Vertical ribs on base
				ctx.beginPath();
				ctx.moveTo(cx - 5, buttonCenterY + 7);
				ctx.lineTo(cx - 5, buttonCenterY + 16);
				ctx.moveTo(cx + 5, buttonCenterY + 7);
				ctx.lineTo(cx + 5, buttonCenterY + 16);
				ctx.stroke();
			} else if (bIdx === 3) {
				// Icon 3: Cart / Export Action icon (matching 4th button in image)
				ctx.beginPath();
				ctx.moveTo(cx - 23, buttonCenterY - 16);
				ctx.lineTo(cx - 15, buttonCenterY - 16);
				ctx.lineTo(cx - 9, buttonCenterY + 7);
				ctx.lineTo(cx + 15, buttonCenterY + 7);
				ctx.lineTo(cx + 21, buttonCenterY - 9);
				ctx.lineTo(cx - 12, buttonCenterY - 9);
				ctx.stroke();
				// Two wheels
				ctx.beginPath();
				ctx.arc(cx - 6, buttonCenterY + 16, 4, 0, Math.PI * 2);
				ctx.arc(cx + 11, buttonCenterY + 16, 4, 0, Math.PI * 2);
				ctx.stroke();
			}
			ctx.restore();
		});
		ctx.restore();
		// 6. Crisp Outer White Specular Glass Rim around the entire rounded card
		drawRoundedRectPath(ctx, cardX, cardY, cardW, cardH, cardRadius);
		const rimGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
		rimGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
		rimGrad.addColorStop(.5, "rgba(255, 255, 255, 0.85)");
		rimGrad.addColorStop(1, "rgba(240, 236, 255, 0.96)");
		ctx.strokeStyle = rimGrad;
		ctx.lineWidth = isUltraClear98 ? 5 : 4.5;
		ctx.stroke();
		const texture = new THREE.CanvasTexture(canvas);
		texture.colorSpace = THREE.SRGBColorSpace;
		texture.anisotropy = maxAnisotropy;
		texture.needsUpdate = true;
		return texture;
	}
	// Fallback / Option 2: Classic Dark Cyan Technical CAD Hologram
	const canvas = document.createElement("canvas");
	canvas.width = 768;
	canvas.height = 512;
	const ctx = canvas.getContext("2d");
	// Translucent dark-cyan glass frame
	ctx.fillStyle = "rgba(6, 24, 44, 0.58)";
	ctx.fillRect(12, 12, 744, 488);
	// Double technical border
	ctx.strokeStyle = "rgba(56, 189, 248, 0.85)";
	ctx.lineWidth = 3;
	ctx.strokeRect(12, 12, 744, 488);
	ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
	ctx.lineWidth = 1;
	ctx.strokeRect(22, 22, 724, 468);
	// Header bar
	ctx.fillStyle = "rgba(14, 165, 233, 0.22)";
	ctx.fillRect(14, 14, 740, 52);
	const titles = {
		prism: "RESONANCE PRISM. UNIT: ALPHA",
		turbine: "ORBITAL SPINE A. PROTOTYPE",
		core: "CORE SYNC. NEURAL ARCHITECTURE",
		biosphere: "ECOLOGICAL BIOSPHERE: CURE II",
		neural: "ACTIVE MESH: CLASS NEURAL ARRAY"
	};
	ctx.fillStyle = "#e0f2fe";
	ctx.font = "700 22px \"Outfit\", sans-serif";
	ctx.fillText(titles[panelType], 34, 48);
	// Panel-specific vector graphics
	ctx.save();
	ctx.translate(384, 275);
	if (panelType === "prism") {
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(0, -150);
		ctx.lineTo(-170, 110);
		ctx.lineTo(30, 145);
		ctx.closePath();
		ctx.fillStyle = "rgba(56, 189, 248, 0.18)";
		ctx.fill();
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(0, -150);
		ctx.lineTo(30, 145);
		ctx.lineTo(175, 95);
		ctx.closePath();
		ctx.fillStyle = "rgba(251, 191, 36, 0.22)";
		ctx.fill();
		ctx.stroke();
	} else if (panelType === "turbine") {
		for (let i = -3; i <= 3; i++) {
			ctx.beginPath();
			ctx.ellipse(i * 38, 0, 36, 95, .2, 0, Math.PI * 2);
			ctx.strokeStyle = i === 0 ? "#fbbf24" : "rgba(56, 189, 248, 0.75)";
			ctx.lineWidth = 2;
			ctx.stroke();
		}
		ctx.beginPath();
		ctx.moveTo(-180, 0);
		ctx.lineTo(180, 0);
		ctx.strokeStyle = "#38bdf8";
		ctx.lineWidth = 3;
		ctx.stroke();
	} else if (panelType === "core") {
		for (let r = -120; r <= 120; r += 40) {
			ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
			ctx.strokeRect(-260, r, 520, 26);
		}
	} else if (panelType === "biosphere") {
		ctx.beginPath();
		ctx.moveTo(-65, -140);
		ctx.bezierCurveTo(-30, -40, -110, 40, -85, 130);
		ctx.lineTo(85, 130);
		ctx.bezierCurveTo(110, 40, 30, -40, 65, -140);
		ctx.closePath();
		ctx.fillStyle = "rgba(16, 185, 129, 0.28)";
		ctx.fill();
		ctx.strokeStyle = "#6ee7b7";
		ctx.lineWidth = 3.5;
		ctx.stroke();
		for (let i = 0; i < 18; i++) {
			const bx = Math.sin(i * 2.1) * 48;
			const by = 40 + Math.cos(i * 1.7) * 55;
			ctx.fillStyle = i % 2 === 0 ? "rgba(52, 211, 153, 0.7)" : "rgba(163, 230, 53, 0.65)";
			ctx.beginPath();
			ctx.arc(bx, by, 18 + i % 10, 0, Math.PI * 2);
			ctx.fill();
		}
	} else if (panelType === "neural") {
		const nodes = [];
		for (let ring = 1; ring <= 2; ring++) {
			const count = ring * 6;
			const rad = ring * 72;
			for (let k = 0; k < count; k++) {
				const ang = k / count * Math.PI * 2;
				nodes.push([Math.cos(ang) * rad, Math.sin(ang) * rad]);
			}
		}
		nodes.push([0, 0]);
		ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
		ctx.lineWidth = 1.5;
		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				const dx = nodes[i][0] - nodes[j][0];
				const dy = nodes[i][1] - nodes[j][1];
				if (Math.hypot(dx, dy) < 115) {
					ctx.beginPath();
					ctx.moveTo(nodes[i][0], nodes[i][1]);
					ctx.lineTo(nodes[j][0], nodes[j][1]);
					ctx.stroke();
				}
			}
		}
		nodes.forEach(([nx, ny], idx) => {
			ctx.fillStyle = idx % 3 === 0 ? "#fbbf24" : "#38bdf8";
			ctx.beginPath();
			ctx.arc(nx, ny, 7, 0, Math.PI * 2);
			ctx.fill();
		});
	}
	ctx.restore();
	// Bottom technical readout
	ctx.fillStyle = "rgba(148, 163, 184, 0.9)";
	ctx.font = "400 15px \"JetBrains Mono\", monospace";
	ctx.fillText("DEPTH LOCK: 99.4%  ·  SH-PROBE: ACTIVE  ·  6DoF PARALLAX", 34, 476);
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = maxAnisotropy;
	texture.needsUpdate = true;
	return texture;
}
/**
* Generates high-resolution repeatable procedural architectural facade textures
* (curtain wall glass, brushed titanium & gold diagrid, brutalist BIM concrete, carbon-sapphire composite)
* for applying directly onto the 3D skyscraper models.
*/
export function createArchitecturalFacadeTexture(maxAnisotropy, preset) {
	const canvas = document.createElement("canvas");
	canvas.width = 512;
	canvas.height = 512;
	const ctx = canvas.getContext("2d");
	if (preset === "Fasada Szklana Refleksyjna (Skyscraper Curtain Wall)") {
		// Deep sapphire reflective curtain-wall glazing with warm & cyan illuminated office bays and aluminum mullions
		const grad = ctx.createLinearGradient(0, 0, 512, 512);
		grad.addColorStop(0, "#071b34");
		grad.addColorStop(.5, "#0c2d52");
		grad.addColorStop(1, "#061629");
		ctx.fillStyle = grad;
		ctx.fillRect(0, 0, 512, 512);
		const cols = 8;
		const rows = 16;
		const cellW = 512 / cols;
		const cellH = 512 / rows;
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const seed = Math.sin(r * 12.9898 + c * 78.233) * 43758.5453;
				const frac = seed - Math.floor(seed);
				if (frac > .62) {
					ctx.fillStyle = frac > .84 ? "rgba(253, 224, 71, 0.85)" : "rgba(125, 211, 252, 0.78)";
				} else if (frac > .32) {
					ctx.fillStyle = "rgba(30, 64, 115, 0.65)";
				} else {
					ctx.fillStyle = "rgba(10, 25, 48, 0.85)";
				}
				ctx.fillRect(c * cellW + 4, r * cellH + 3, cellW - 8, cellH - 6);
				// Metallic spandrel band & vertical mullion frame
				ctx.strokeStyle = "rgba(186, 230, 253, 0.7)";
				ctx.lineWidth = 2;
				ctx.strokeRect(c * cellW + 2, r * cellH + 1, cellW - 4, cellH - 2);
			}
		}
		// Diagonal structural wind-bracing mega-truss
		ctx.strokeStyle = "rgba(56, 189, 248, 0.9)";
		ctx.lineWidth = 6;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(512, 512);
		ctx.moveTo(512, 0);
		ctx.lineTo(0, 512);
		ctx.stroke();
	} else if (preset === "Tytan i Szczotkowane Złoto (Parametric Metal)") {
		// Anodized titanium metallic plates with warm brushed gold parametric diagrid ribs
		const bg = ctx.createLinearGradient(0, 0, 512, 0);
		bg.addColorStop(0, "#1e2430");
		bg.addColorStop(.5, "#333d4f");
		bg.addColorStop(1, "#1a202c");
		ctx.fillStyle = bg;
		ctx.fillRect(0, 0, 512, 512);
		// Fine horizontal brushed metal grain
		for (let y = 0; y < 512; y += 2) {
			ctx.fillStyle = y % 4 === 0 ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";
			ctx.fillRect(0, y, 512, 1);
		}
		// Horizontal gold floor bands
		for (let y = 0; y <= 512; y += 32) {
			ctx.fillStyle = "rgba(251, 191, 36, 0.88)";
			ctx.fillRect(0, y - 2, 512, 4);
		}
		// Parametric brushed gold diamond diagrid
		ctx.strokeStyle = "#fbbf24";
		ctx.lineWidth = 7;
		const step = 128;
		for (let i = -512; i <= 1024; i += step) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i + 512, 512);
			ctx.stroke();
			ctx.beginPath();
			ctx.moveTo(i + 512, 0);
			ctx.lineTo(i, 512);
			ctx.stroke();
		}
	} else if (preset === "Beton Architektoniczny i Rdzeń Świetlny (Brutalist BIM)") {
		// Tactile architectural precast concrete slabs with recessed luminous amber/cyan BIM joints
		ctx.fillStyle = "#383e48";
		ctx.fillRect(0, 0, 512, 512);
		// Concrete micro-speckle texture
		for (let i = 0; i < 2400; i++) {
			const x = i * 73 % 512;
			const y = i * 139 % 512;
			ctx.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.14)";
			ctx.fillRect(x, y, 3, 3);
		}
		// Formwork panel seams and tie-rod holes
		const slabH = 64;
		const slabW = 128;
		for (let y = 0; y < 512; y += slabH) {
			for (let x = 0; x < 512; x += slabW) {
				ctx.strokeStyle = "#1e293b";
				ctx.lineWidth = 3;
				ctx.strokeRect(x, y, slabW, slabH);
				// Tie-rod architectural indents
				ctx.fillStyle = "#0f172a";
				ctx.beginPath();
				ctx.arc(x + 16, y + slabH / 2, 4, 0, Math.PI * 2);
				ctx.arc(x + slabW - 16, y + slabH / 2, 4, 0, Math.PI * 2);
				ctx.fill();
			}
			// Glowing horizontal BIM core slit
			ctx.fillStyle = y % 128 === 0 ? "#38bdf8" : "#f59e0b";
			ctx.fillRect(0, y + slabH - 5, 512, 3);
		}
	} else if (preset === "Karbonowo-Szafirowy Kompozyt (Cyber-Facade)") {
		// Dark carbon weave with electric sapphire and violet neon structural veins
		ctx.fillStyle = "#070b14";
		ctx.fillRect(0, 0, 512, 512);
		const tile = 16;
		for (let y = 0; y < 512; y += tile) {
			for (let x = 0; x < 512; x += tile) {
				const odd = (x / tile + y / tile) % 2 === 0;
				ctx.fillStyle = odd ? "#111a2e" : "#090f1d";
				ctx.fillRect(x, y, tile, tile);
			}
		}
		// Glowing hexagonal / diamond cyber-veins
		ctx.strokeStyle = "#00f0ff";
		ctx.lineWidth = 4;
		const step = 64;
		for (let i = -512; i <= 1024; i += step) {
			ctx.beginPath();
			ctx.moveTo(i, 0);
			ctx.lineTo(i + 512, 512);
			ctx.stroke();
		}
		ctx.strokeStyle = "#a855f7";
		ctx.lineWidth = 3;
		for (let y = 0; y <= 512; y += 64) {
			ctx.beginPath();
			ctx.moveTo(0, y);
			ctx.lineTo(512, y);
			ctx.stroke();
		}
	} else {
		// Default Hologram Diagrid
		return createDiagridFacadeTexture(maxAnisotropy, "Diagrid Exoskeleton + Rdzeń BIM");
	}
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	texture.anisotropy = maxAnisotropy;
	texture.needsUpdate = true;
	return texture;
}
/**
* Generates the glowing cyan radar/globe UI texture for the interactive Smart Tablet
* resting on the right side of the conference table in zdj._2.png.
*/
export function createSmartTabletTexture(maxAnisotropy) {
	const canvas = document.createElement("canvas");
	canvas.width = 512;
	canvas.height = 384;
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "#04101f";
	ctx.fillRect(0, 0, 512, 384);
	ctx.strokeStyle = "#38bdf8";
	ctx.lineWidth = 4;
	ctx.strokeRect(10, 10, 492, 364);
	// Circular radar / globe on left of tablet screen
	const cx = 165;
	const cy = 192;
	[
		42,
		76,
		112
	].forEach((r, idx) => {
		ctx.beginPath();
		ctx.arc(cx, cy, r, 0, Math.PI * 2);
		ctx.strokeStyle = idx === 2 ? "#38bdf8" : "rgba(56, 189, 248, 0.45)";
		ctx.lineWidth = idx === 2 ? 3 : 1.5;
		ctx.stroke();
	});
	// Glowing cyan radar sector
	ctx.beginPath();
	ctx.moveTo(cx, cy);
	ctx.arc(cx, cy, 108, -.6, .4);
	ctx.closePath();
	ctx.fillStyle = "rgba(34, 211, 238, 0.35)";
	ctx.fill();
	// Right side telemetry bars on tablet
	ctx.fillStyle = "#e0f2fe";
	ctx.font = "700 18px \"JetBrains Mono\", monospace";
	ctx.fillText("TABLET SYNC · 6DoF", 300, 68);
	for (let i = 0; i < 6; i++) {
		const ry = 104 + i * 40;
		ctx.fillStyle = "rgba(56, 189, 248, 0.25)";
		ctx.fillRect(300, ry, 175, 18);
		ctx.fillStyle = i % 2 === 0 ? "#38bdf8" : "#7dd3fc";
		ctx.fillRect(300, ry, 65 + i * 37 % 105, 18);
	}
	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = maxAnisotropy;
	texture.needsUpdate = true;
	return texture;
}

//# sourceMappingURL=data:application/json;base64,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VCxDQUFDLEtBQUssR0FBRztDQUNYLENBQUM7O0NBRUQsY0FBYztFQUNaLENBQUMsS0FBSyxHQUFHO0VBQ1QsQ0FBQyxLQUFLLEdBQUc7RUFDVCxDQUFDLEtBQUssR0FBRztFQUNULENBQUMsS0FBSyxHQUFHO0VBQ1QsQ0FBQyxLQUFLLEdBQUc7RUFDVCxDQUFDLEtBQUssR0FBRztDQUNYLENBQUM7O0NBRUQsY0FBYztFQUNaLENBQUMsS0FBSyxHQUFHO0VBQ1QsQ0FBQyxNQUFNLEdBQUc7RUFDVixDQUFDLE1BQU0sR0FBRztFQUNWLENBQUMsTUFBTSxHQUFHO0VBQ1YsQ0FBQyxLQUFLLEdBQUc7RUFDVCxDQUFDLEtBQUssR0FBRztDQUNYLENBQUM7O0NBRUQsY0FBYztFQUNaLENBQUMsS0FBSyxHQUFHO0VBQ1QsQ0FBQyxNQUFNLEdBQUc7RUFDVixDQUFDLE1BQU0sR0FBRztFQUNWLENBQUMsTUFBTSxHQUFHO0VBQ1YsQ0FBQyxLQUFLLEdBQUc7RUFDVCxDQUFDLEtBQUssR0FBRztDQUNYLENBQUM7O0NBRUQsY0FBYztFQUNaLENBQUMsTUFBTSxHQUFHO0VBQ1YsQ0FBQyxNQUFNLEdBQUc7RUFDVixDQUFDLE1BQU0sR0FBRztFQUNWLENBQUMsTUFBTSxHQUFHO0VBQ1YsQ0FBQyxNQUFNLEdBQUc7RUFDVixDQUFDLE1BQU0sR0FBRztDQUNaLENBQUM7O0NBRUQsY0FBYztFQUNaLENBQUMsTUFBTSxHQUFHO0VBQ1YsQ0FBQyxNQUFNLEdBQUc7RUFDVixDQUFDLE1BQU0sR0FBRztFQUNWLENBQUMsTUFBTSxHQUFHO0VBQ1YsQ0FBQyxNQUFNLEdBQUc7Q0FDWixDQUFDOztDQUdELE1BQU0sT0FBMkM7RUFDL0M7R0FBQztHQUFLO0dBQUs7R0FBTTtFQUFHO0VBQ3BCO0dBQUM7R0FBSztHQUFLO0dBQU07RUFBRztFQUNwQjtHQUFDO0dBQU07R0FBSztHQUFNO0VBQUc7RUFDckI7R0FBQztHQUFNO0dBQUs7R0FBTTtFQUFHO0VBQ3JCO0dBQUM7R0FBSztHQUFLO0dBQUs7RUFBRztDQUNyQjtDQUNBLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLFFBQVE7RUFDakMsSUFBSSxVQUFVO0VBQ2QsSUFBSSxPQUFPLElBQUksRUFBRTtFQUNqQixJQUFJLGtCQUFrQixLQUFLLE1BQU0sR0FBRyxLQUFLLElBQUksSUFBSSxFQUFFLElBQUksSUFBSSxJQUFJLEVBQUU7RUFDakUsSUFBSSxjQUFjO0VBQ2xCLElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87Q0FDYixDQUFDOztDQUdELE1BQU0sZUFBZTtFQUFDO0VBQUs7RUFBSztFQUFLO0VBQUs7RUFBSztDQUFHO0NBQ2xELGFBQWEsU0FBUyxHQUFHLFFBQVE7RUFDL0IsSUFBSSxVQUFVO0VBQ2QsSUFBSSxJQUFJLE1BQU0sS0FBSyxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUM7RUFDcEMsSUFBSSxjQUNGLE1BQU0sTUFBTSxJQUNSLDRCQUNBO0VBQ04sSUFBSSxZQUFZLFFBQVEsSUFBSSxJQUFJO0VBQ2hDLElBQUksT0FBTztDQUNiLENBQUM7O0NBR0QsTUFBTSxNQUFNO0NBQ1osTUFBTSxNQUFNO0NBQ1osTUFBTSxNQUFNO0NBQ1osTUFBTSxNQUFNO0NBQ1osSUFBSSxZQUFZO0NBQ2hCLElBQUksU0FBUyxLQUFLLEtBQUssS0FBSyxHQUFHO0NBQy9CLElBQUksY0FBYztDQUNsQixJQUFJLFlBQVk7Q0FDaEIsSUFBSSxXQUFXLEtBQUssS0FBSyxLQUFLLEdBQUc7Q0FFakMsSUFBSSxZQUFZO0NBQ2hCLElBQUksT0FBTztDQUNYLElBQUksU0FBUyxrQkFBa0IsTUFBTSxJQUFJLE1BQU0sRUFBRTtDQUVqRCxNQUFNLFNBQTZCO0VBQ2pDLENBQUMsZ0JBQWdCLFdBQVc7RUFDNUIsQ0FBQyxtQkFBbUIsS0FBSztFQUN6QixDQUFDLGtCQUFrQixJQUFJO0VBQ3ZCLENBQUMsZ0JBQWdCLE9BQU87Q0FDMUI7Q0FDQSxPQUFPLFNBQVMsQ0FBQyxPQUFPLE1BQU0sU0FBUztFQUNyQyxNQUFNLEtBQUssTUFBTSxLQUFLLE9BQU87RUFDN0IsSUFBSSxjQUFjO0VBQ2xCLElBQUksWUFBWTtFQUNoQixJQUFJLFVBQVU7RUFDZCxJQUFJLE9BQU8sTUFBTSxJQUFJLEtBQUssRUFBRTtFQUM1QixJQUFJLE9BQU8sTUFBTSxNQUFNLElBQUksS0FBSyxFQUFFO0VBQ2xDLElBQUksT0FBTztFQUVYLElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87RUFDWCxJQUFJLFNBQVMsT0FBTyxNQUFNLElBQUksRUFBRTtFQUVoQyxJQUFJLFlBQVk7RUFDaEIsSUFBSSxPQUFPO0VBQ1gsSUFBSSxTQUFTLEtBQUssTUFBTSxLQUFLLEVBQUU7Q0FDakMsQ0FBQzs7Q0FHRCxNQUFNLFdBQVc7RUFDZjtHQUFFLEtBQUs7R0FBTyxLQUFLO0dBQU8sT0FBTyxNQUFPLEtBQUssS0FBSztFQUFFO0VBQ3BEO0dBQUUsS0FBSztHQUFPLEtBQUs7R0FBTyxPQUFPLE1BQU8sS0FBSyxLQUFLO0VBQUU7RUFDcEQ7R0FBRSxLQUFLO0dBQU8sS0FBSztHQUFPLE9BQU8sTUFBTyxLQUFLLEtBQUs7RUFBRTtDQUN0RDtDQUNBLFNBQVMsU0FBUyxHQUFHLFNBQVM7RUFDNUIsTUFBTSxLQUFLLE1BQU0sS0FBSyxPQUFPO0VBQzdCLE1BQU0sS0FBSyxNQUFNO0VBQ2pCLElBQUksVUFBVTtFQUNkLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssS0FBSyxDQUFDO0VBQ2xDLElBQUksY0FBYztFQUNsQixJQUFJLFlBQVk7RUFDaEIsSUFBSSxPQUFPO0VBRVgsSUFBSSxVQUFVO0VBQ2QsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUssSUFBSSxFQUFFLEtBQUs7RUFDeEQsSUFBSSxjQUFjO0VBQ2xCLElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87RUFFWCxJQUFJLFlBQVk7RUFDaEIsSUFBSSxPQUFPO0VBQ1gsSUFBSSxTQUFTLEVBQUUsS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDO0VBRW5DLElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87RUFDWCxJQUFJLFNBQVMsRUFBRSxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUU7Q0FDdEMsQ0FBQzs7Q0FHRCxNQUFNLFNBQVM7Q0FDZixNQUFNLFNBQVM7Q0FDZixJQUFJLFlBQVk7Q0FDaEIsSUFBSSxTQUFTLElBQUksUUFBUSxNQUFNLE1BQU07Q0FDckMsSUFBSSxjQUFjO0NBQ2xCLElBQUksWUFBWTtDQUNoQixJQUFJLFdBQVcsSUFBSSxRQUFRLE1BQU0sTUFBTTtDQUV2QyxNQUFNLFVBQVU7RUFDZDtHQUFFLE9BQU87R0FBdUIsU0FBUyxDQUFDLFdBQVcsVUFBVTtFQUFFO0VBQ2pFO0dBQUUsT0FBTztHQUEwQixTQUFTLENBQUMsU0FBUyxVQUFVO0VBQUU7RUFDbEU7R0FBRSxPQUFPO0dBQXNCLFNBQVM7SUFBQztJQUFPO0lBQU87R0FBSztFQUFFO0VBQzlEO0dBQUUsT0FBTztHQUFzQixTQUFTLENBQUMsWUFBWSxTQUFTO0VBQUU7RUFDaEU7R0FBRSxPQUFPO0dBQXlCLFNBQVMsQ0FBQyxXQUFXLFFBQVE7RUFBRTtDQUNuRTtDQUVBLE1BQU0sT0FBTyxPQUFPLFFBQVE7Q0FDNUIsUUFBUSxTQUFTLEtBQUssUUFBUTtFQUM1QixNQUFNLEtBQUssS0FBSyxNQUFNO0VBQ3RCLElBQUksY0FBYztFQUNsQixJQUFJLFdBQVcsS0FBSyxHQUFHLFNBQVMsR0FBRyxPQUFPLElBQUksU0FBUyxFQUFFO0VBRXpELElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87RUFDWCxJQUFJLFNBQVMsSUFBSSxPQUFPLEtBQUssSUFBSSxTQUFTLEVBQUU7O0VBRzVDLElBQUksUUFBUSxLQUFLLFFBQVEsR0FBRztHQUMxQixJQUFJLFFBQVEsU0FBUyxHQUFHLFNBQVM7SUFDL0IsTUFBTSxLQUFLLEtBQUssS0FBSyxPQUFPO0lBQzVCLE1BQU0sS0FBSyxTQUFTO0lBQ3BCLElBQUksVUFBVTtJQUNkLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssS0FBSyxDQUFDO0lBQ2xDLElBQUksY0FBYztJQUNsQixJQUFJLFlBQVk7SUFDaEIsSUFBSSxPQUFPO0lBRVgsSUFBSSxVQUFVO0lBQ2QsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEdBQUcsS0FBSyxLQUFLLEdBQUk7SUFDaEQsSUFBSSxjQUFjLFNBQVMsSUFBSSxZQUFZO0lBQzNDLElBQUksWUFBWTtJQUNoQixJQUFJLE9BQU87SUFFWCxJQUFJLFlBQVk7SUFDaEIsSUFBSSxPQUFPO0lBQ1gsSUFBSSxTQUFTLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQztHQUNqQyxDQUFDO0VBQ0gsT0FBTzs7R0FFTCxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLO0lBQzNCLE1BQU0sS0FBSyxNQUFPLElBQUksS0FBSyxNQUFNLE1BQU07SUFDdkMsSUFBSSxZQUFZLElBQUksTUFBTSxJQUFJLFlBQVk7SUFDMUMsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLElBQUksU0FBUyxNQUFNLElBQUksR0FBRyxFQUFFO0dBQ3pEO0VBQ0Y7Q0FDRixDQUFDO0NBRUQsTUFBTSxVQUFVLElBQUksTUFBTSxjQUFjLE1BQU07Q0FDOUMsUUFBUSxhQUFhLE1BQU07Q0FDM0IsUUFBUSxhQUFhO0NBQ3JCLFFBQVEsY0FBYztDQUN0QixPQUFPO0FBQ1Q7Ozs7O0FBTUEsT0FBTyxTQUFTLDRCQUNkLGVBQ0EsWUFDcUI7Q0FDckIsTUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0NBQzlDLE9BQU8sUUFBUTtDQUNmLE9BQU8sU0FBUztDQUNoQixNQUFNLE1BQU0sT0FBTyxXQUFXLElBQUk7Q0FFbEMsSUFBSSxVQUFVLEdBQUcsR0FBRyxNQUFNLElBQUk7Q0FFOUIsTUFBTSxlQUFlLGFBQ2pCLDZCQUNBO0NBQ0osTUFBTSxZQUFZLGFBQ2QsNkJBQ0E7O0NBR0osTUFBTSxPQUFPO0NBQ2IsSUFBSSxjQUFjO0NBQ2xCLElBQUksWUFBWTtDQUVoQixLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssTUFBTSxLQUFLLE1BQU07RUFDcEMsSUFBSSxVQUFVO0VBQ2QsSUFBSSxPQUFPLEdBQUcsQ0FBQztFQUNmLElBQUksT0FBTyxNQUFNLENBQUM7RUFDbEIsSUFBSSxPQUFPO0NBQ2I7Q0FFQSxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssTUFBTSxLQUFLLE1BQU07RUFDcEMsSUFBSSxVQUFVO0VBQ2QsSUFBSSxPQUFPLEdBQUcsQ0FBQztFQUNmLElBQUksT0FBTyxHQUFHLElBQUk7RUFDbEIsSUFBSSxPQUFPOztFQUdYLElBQUksVUFBVTtFQUNkLElBQUksT0FBTyxHQUFHLENBQUM7RUFDZixJQUFJLE9BQU8sR0FBRyxDQUFDO0VBQ2YsSUFBSSxPQUFPO0NBQ2I7O0NBR0EsS0FBSyxJQUFJLElBQUksTUFBTSxJQUFJLE1BQU0sS0FBSyxNQUFNO0VBQ3RDLEtBQUssSUFBSSxJQUFJLE1BQU0sSUFBSSxNQUFNLEtBQUssTUFBTTtHQUN0QyxJQUFJLFlBQVk7R0FDaEIsSUFBSSxVQUFVO0dBQ2QsSUFBSSxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsS0FBSyxLQUFLLENBQUM7R0FDakMsSUFBSSxLQUFLOztHQUdULElBQUssSUFBSSxPQUFRLE1BQU0sS0FBTSxJQUFJLE9BQVEsTUFBTSxHQUFHO0lBQ2hELElBQUksY0FBYztJQUNsQixJQUFJLFlBQVk7SUFDaEIsSUFBSSxVQUFVO0lBQ2QsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDO0lBQ3BCLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQztJQUNwQixJQUFJLE9BQU8sR0FBRyxJQUFJLEVBQUU7SUFDcEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxFQUFFO0lBQ3BCLElBQUksT0FBTztHQUNiO0VBQ0Y7Q0FDRjs7Q0FHQSxJQUFJLGNBQWM7Q0FDbEIsSUFBSSxZQUFZO0NBQ2hCLElBQUksV0FBVyxHQUFHLEdBQUcsTUFBTSxJQUFJO0NBRS9CLE1BQU0sVUFBVSxJQUFJLE1BQU0sY0FBYyxNQUFNO0NBQzlDLFFBQVEsYUFBYSxNQUFNO0NBQzNCLFFBQVEsUUFBUSxNQUFNO0NBQ3RCLFFBQVEsUUFBUSxNQUFNO0NBQ3RCLFFBQVEsYUFBYTtDQUNyQixRQUFRLGNBQWM7Q0FDdEIsT0FBTztBQUNUOzs7OztBQU1BLE9BQU8sU0FBUywyQkFDZCxlQUNBLE9BQ3FCO0NBQ3JCLE1BQU0sU0FBUyxTQUFTLGNBQWMsUUFBUTtDQUM5QyxPQUFPLFFBQVE7Q0FDZixPQUFPLFNBQVM7Q0FDaEIsTUFBTSxNQUFNLE9BQU8sV0FBVyxJQUFJO0NBRWxDLElBQUksVUFBVSxHQUFHLEdBQUcsS0FBSyxJQUFJO0NBRTdCLE1BQU0sU0FBUyxVQUFVO0NBQ3pCLE1BQU0sYUFBYSxVQUFVO0NBRTdCLE1BQU0sYUFBYSxTQUNmLDZCQUNBO0NBQ0osTUFBTSxrQkFBa0IsYUFDcEIsNkJBQ0E7O0NBR0osSUFBSSxZQUFZLFNBQ1osNkJBQ0E7Q0FDSixJQUFJLFNBQVMsR0FBRyxHQUFHLEtBQUssSUFBSTs7Q0FHNUIsS0FBSyxJQUFJLElBQUksR0FBRyxLQUFLLE1BQU0sS0FBSyxJQUFJO0VBQ2xDLElBQUksY0FBYyxJQUFJLFFBQVEsSUFBSSxhQUFhO0VBQy9DLElBQUksWUFBWSxJQUFJLFFBQVEsSUFBSSxNQUFNO0VBQ3RDLElBQUksVUFBVTtFQUNkLElBQUksT0FBTyxHQUFHLENBQUM7RUFDZixJQUFJLE9BQU8sS0FBSyxDQUFDO0VBQ2pCLElBQUksT0FBTztDQUNiOztDQUdBLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxLQUFLLEtBQUssSUFBSTtFQUNqQyxJQUFJLGNBQWMsSUFBSSxRQUFRLElBQUksYUFBYTtFQUMvQyxJQUFJLFlBQVksSUFBSSxRQUFRLElBQUksSUFBSTtFQUNwQyxJQUFJLFVBQVU7RUFDZCxJQUFJLE9BQU8sR0FBRyxDQUFDO0VBQ2YsSUFBSSxPQUFPLEdBQUcsSUFBSTtFQUNsQixJQUFJLE9BQU87Q0FDYjs7Q0FHQSxJQUFJLGNBQWM7Q0FDbEIsSUFBSSxZQUFZO0NBQ2hCLE1BQU0sV0FBVztDQUNqQixLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLEtBQUssVUFBVTtFQUMzQyxJQUFJLFVBQVU7RUFDZCxJQUFJLE9BQU8sR0FBRyxDQUFDO0VBQ2YsSUFBSSxPQUFPLEtBQUssSUFBSSxHQUFHO0VBQ3ZCLElBQUksT0FBTztFQUVYLElBQUksVUFBVTtFQUNkLElBQUksT0FBTyxLQUFLLENBQUM7RUFDakIsSUFBSSxPQUFPLEdBQUcsSUFBSSxHQUFHO0VBQ3JCLElBQUksT0FBTztDQUNiOztDQUdBLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxNQUFNLEtBQUssSUFBSTtFQUNsQyxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssS0FBSyxLQUFLLElBQUk7R0FDakMsSUFBSSxZQUFZO0dBQ2hCLElBQUksVUFBVTtHQUNkLElBQUksSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEtBQUssS0FBSyxDQUFDO0dBQ2pDLElBQUksS0FBSztFQUNYO0NBQ0Y7Q0FFQSxNQUFNLFVBQVUsSUFBSSxNQUFNLGNBQWMsTUFBTTtDQUM5QyxRQUFRLGFBQWEsTUFBTTtDQUMzQixRQUFRLFFBQVEsTUFBTTtDQUN0QixRQUFRLFFBQVEsTUFBTTtDQUN0QixRQUFRLGFBQWE7Q0FDckIsUUFBUSxjQUFjO0NBQ3RCLE9BQU87QUFDVDs7OztBQUtBLFNBQVMsb0JBQ1AsS0FDQSxHQUNBLEdBQ0EsR0FDQSxHQUNBLEdBQ0E7Q0FDQSxNQUFNLFNBQVMsS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztDQUN2QyxJQUFJLFVBQVU7Q0FDZCxJQUFJLE9BQU8sSUFBSSxRQUFRLENBQUM7Q0FDeEIsSUFBSSxPQUFPLElBQUksSUFBSSxRQUFRLENBQUM7Q0FDNUIsSUFBSSxpQkFBaUIsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLElBQUksTUFBTTtDQUNoRCxJQUFJLE9BQU8sSUFBSSxHQUFHLElBQUksSUFBSSxNQUFNO0NBQ2hDLElBQUksaUJBQWlCLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsSUFBSSxDQUFDO0NBQ3hELElBQUksT0FBTyxJQUFJLFFBQVEsSUFBSSxDQUFDO0NBQzVCLElBQUksaUJBQWlCLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLE1BQU07Q0FDaEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxNQUFNO0NBQ3hCLElBQUksaUJBQWlCLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQztDQUN4QyxJQUFJLFVBQVU7QUFDaEI7Ozs7Ozs7O0FBU0EsT0FBTyxTQUFTLHlCQUNkLGVBQ0EsV0FDQSxjQUFvQyxpREFDcEMsa0JBQTBCLEdBQ0w7OztDQUdyQixJQUFJLGdCQUFnQix5REFBeUQ7RUFDM0UsTUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0VBQzlDLE9BQU8sUUFBUTtFQUNmLE9BQU8sU0FBUztFQUNoQixNQUFNLE1BQU0sT0FBTyxXQUFXLElBQUk7RUFDbEMsSUFBSSxVQUFVLEdBQUcsR0FBRyxLQUFLLEdBQUc7O0VBRzVCLG9CQUFvQixLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtFQUM3QyxNQUFNLFNBQVMsSUFBSSxxQkFBcUIsSUFBSSxJQUFJLEtBQUssR0FBRztFQUN4RCxPQUFPLGFBQWEsR0FBRyx1QkFBdUI7RUFDOUMsT0FBTyxhQUFhLElBQUssdUJBQXVCO0VBQ2hELE9BQU8sYUFBYSxHQUFHLHVCQUF1QjtFQUM5QyxJQUFJLFlBQVk7RUFDaEIsSUFBSSxLQUFLO0VBRVQsSUFBSSxjQUFjO0VBQ2xCLElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87RUFFWCxvQkFBb0IsS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7RUFDN0MsSUFBSSxjQUFjO0VBQ2xCLElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87O0VBR1gsSUFBSSxZQUFZO0VBQ2hCLElBQUksU0FBUyxJQUFJLElBQUksS0FBSyxFQUFFO0VBRTVCLE1BQU0sZUFBNkM7R0FDakQsT0FBTztHQUNQLFNBQVM7R0FDVCxNQUFNO0dBQ04sV0FBVztHQUNYLFFBQVE7RUFDVjtFQUVBLElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87RUFDWCxJQUFJLFNBQVMsYUFBYSxZQUFZLElBQUksRUFBRTtFQUU1QyxJQUFJLFlBQVk7RUFDaEIsSUFBSSxPQUFPO0VBQ1gsSUFBSSxTQUFTLE9BQVEsa0JBQWtCLElBQUssRUFBRSxRQUFRLEtBQUssRUFBRTtFQUU3RCxJQUFJLGNBQWMsU0FBUzs7R0FFekIsSUFBSSxjQUFjO0dBQ2xCLElBQUksV0FBVyxJQUFJLElBQUksS0FBSyxHQUFHO0dBQy9CLE1BQU0sZUFBZTtJQUFDO0lBQUs7SUFBSztJQUFLO0lBQUs7SUFBSztJQUFLO0lBQUs7R0FBRztHQUM1RCxhQUFhLFNBQVMsSUFBSSxRQUFRO0lBQ2hDLE1BQU0sS0FBSyxLQUFLLE1BQU07SUFDdEIsTUFBTSxLQUFLLE1BQU07SUFDakIsTUFBTSxRQUFRLElBQUkscUJBQXFCLElBQUksSUFBSSxJQUFJLEdBQUc7SUFDdEQsTUFBTSxhQUFhLEdBQUcsMkJBQTJCO0lBQ2pELE1BQU0sYUFBYSxHQUFHLDBCQUEwQjtJQUNoRCxJQUFJLFlBQVk7SUFDaEIsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLEVBQUU7SUFDM0IsSUFBSSxjQUFjO0lBQ2xCLElBQUksWUFBWTtJQUNoQixJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksRUFBRTtHQUMvQixDQUFDOztHQUdELElBQUksY0FBYztHQUNsQixJQUFJLFdBQVcsS0FBSyxJQUFJLEtBQUssR0FBRztHQUNoQyxJQUFJLFlBQVk7R0FDaEIsSUFBSSxPQUFPO0dBQ1gsTUFBTSxPQUFPO0lBQ1g7SUFDQTtJQUNBO0lBQ0E7SUFDQTtHQUNGO0dBQ0EsS0FBSyxTQUFTLEdBQUcsTUFBTTtJQUNyQixJQUFJLFNBQVMsR0FBRyxLQUFLLE1BQU0sSUFBSSxFQUFFO0dBQ25DLENBQUM7O0dBR0QsTUFBTSxLQUFLO0dBQ1gsTUFBTSxLQUFLO0dBQ1gsSUFBSSxjQUFjO0dBQ2xCLElBQUksWUFBWTtHQUNoQixJQUFJLFVBQVU7R0FDZCxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLEtBQUssQ0FBQztHQUNsQyxJQUFJLE9BQU87R0FDWCxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUk7SUFDcEMsSUFBSSxVQUFVO0lBQ2QsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDO0lBQzdDLElBQUksT0FBTztHQUNiOztHQUVBLElBQUksVUFBVTtHQUNkLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUssSUFBSTtJQUNuQyxNQUFNLEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxNQUFPLGVBQWUsSUFBSSxLQUFPLElBQUksSUFBSztJQUN4RSxJQUFJLE1BQU0sS0FBSyxJQUFJLE9BQU8sR0FBRyxFQUFFO1NBQzFCLElBQUksT0FBTyxHQUFHLEVBQUU7R0FDdkI7R0FDQSxJQUFJLGNBQWM7R0FDbEIsSUFBSSxZQUFZO0dBQ2hCLElBQUksT0FBTztFQUNiLE9BQU8sSUFBSSxjQUFjLFdBQVc7O0dBRWxDLE1BQU0sS0FBSztHQUNYLE1BQU0sS0FBSztHQUNYLElBQUksY0FBYztHQUNsQixJQUFJLFlBQVk7R0FDaEIsSUFBSSxVQUFVO0dBQ2QsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxLQUFLLENBQUM7R0FDbEMsSUFBSSxPQUFPO0dBQ1gsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJO0lBQ2pDLElBQUksVUFBVTtJQUNkLElBQUksUUFBUSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUssR0FBRyxLQUFLLEtBQUssQ0FBQztJQUM5QyxJQUFJLE9BQU87SUFDWCxJQUFJLFVBQVU7SUFDZCxJQUFJLFFBQVEsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFLLEdBQUcsS0FBSyxLQUFLLENBQUM7SUFDOUMsSUFBSSxPQUFPO0dBQ2I7R0FFQSxNQUFNLFVBQThCO0lBQ2xDLENBQUMsaUJBQWlCLEtBQUs7SUFDdkIsQ0FBQyxVQUFVLEtBQUs7SUFDaEIsQ0FBQyxnQkFBZ0IsS0FBSztJQUN0QixDQUFDLGlCQUFpQixLQUFLO0lBQ3ZCLENBQUMsd0JBQXdCLElBQUk7R0FDL0I7R0FDQSxRQUFRLFNBQVMsQ0FBQyxPQUFPLE9BQU8sUUFBUTtJQUN0QyxNQUFNLEtBQUssTUFBTSxNQUFNO0lBQ3ZCLElBQUksWUFBWTtJQUNoQixJQUFJLE9BQU87SUFDWCxJQUFJLFNBQVMsT0FBTyxLQUFLLEVBQUU7SUFDM0IsSUFBSSxZQUFZO0lBQ2hCLElBQUksT0FBTztJQUNYLElBQUksU0FBUyxNQUFNLEtBQUssRUFBRTtHQUM1QixDQUFDOztHQUdELElBQUksVUFBVTtHQUNkLElBQUksT0FBTyxLQUFLLEdBQUc7R0FDbkIsS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssS0FBSyxJQUFJO0lBQ25DLE1BQU0sS0FBSyxNQUFNLEtBQUssS0FBSyxJQUFJLE9BQU8sSUFBSyxJQUFJLEtBQU8sSUFBSSxLQUFNO0lBQ2hFLElBQUksT0FBTyxHQUFHLEVBQUU7R0FDbEI7R0FDQSxJQUFJLE9BQU8sS0FBSyxHQUFHO0dBQ25CLElBQUksVUFBVTtHQUNkLElBQUksWUFBWTtHQUNoQixJQUFJLEtBQUs7R0FDVCxJQUFJLGNBQWM7R0FDbEIsSUFBSSxZQUFZO0dBQ2hCLElBQUksT0FBTztFQUNiLE9BQU8sSUFBSSxjQUFjLFFBQVE7O0dBRS9CLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7SUFDM0IsTUFBTSxLQUFLLE1BQU8sSUFBSSxLQUFLLE1BQU07SUFDakMsTUFBTSxLQUFLLEtBQUssSUFBSTtJQUNwQixNQUFNLEtBQUssTUFBTTtJQUNqQixJQUFJLFlBQVksSUFBSSxNQUFNLElBQUksWUFBWTtJQUMxQyxJQUFJLFNBQVMsSUFBSSxJQUFJLElBQUksRUFBRTtHQUM3QjtHQUVBLE1BQU0sV0FBK0I7SUFDbkMsQ0FBQyxtQkFBbUIsS0FBSztJQUN6QixDQUFDLGlCQUFpQixLQUFLO0lBQ3ZCLENBQUMsaUJBQWlCLEtBQUs7SUFDdkIsQ0FBQyxnQkFBZ0IsS0FBSztJQUN0QixDQUFDLGlCQUFpQixLQUFLO0dBQ3pCO0dBQ0EsU0FBUyxTQUFTLENBQUMsT0FBTyxNQUFNLFFBQVE7SUFDdEMsTUFBTSxLQUFLLE1BQU0sTUFBTTtJQUN2QixJQUFJLFlBQVk7SUFDaEIsSUFBSSxPQUFPO0lBQ1gsSUFBSSxTQUFTLE9BQU8sS0FBSyxFQUFFO0lBQzNCLElBQUksWUFBWTtJQUNoQixJQUFJLE9BQU87SUFDWCxJQUFJLFNBQVMsS0FBSyxLQUFLLEVBQUU7R0FDM0IsQ0FBQztFQUNILE9BQU8sSUFBSSxjQUFjLGFBQWE7OztHQUdwQyxJQUFJLFVBQVU7R0FDZCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLEtBQUssQ0FBQztHQUNwQyxJQUFJLGNBQWM7R0FDbEIsSUFBSSxZQUFZO0dBQ2hCLElBQUksT0FBTztHQUVYLElBQUksVUFBVTtHQUNkLElBQUksT0FBTyxLQUFLLEdBQUc7R0FDbkIsSUFBSSxpQkFBaUIsS0FBSyxLQUFLLEtBQUssR0FBRztHQUN2QyxJQUFJLGlCQUFpQixLQUFLLEtBQUssS0FBSyxHQUFHO0dBQ3ZDLElBQUksY0FBYztHQUNsQixJQUFJLFlBQVk7R0FDaEIsSUFBSSxPQUFPO0dBRVgsSUFBSSxZQUFZO0dBQ2hCLElBQUksT0FBTztHQUNYLElBQUksU0FBUyxlQUFlLEtBQUssR0FBRztHQUNwQyxJQUFJLFNBQVMsZ0JBQWdCLEtBQUssR0FBRztHQUNyQyxJQUFJLFNBQVMsZ0JBQWdCLEtBQUssR0FBRzs7R0FHckMsSUFBSSxVQUFVO0dBQ2QsSUFBSSxJQUFJLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxLQUFLLENBQUM7R0FDcEMsSUFBSSxjQUFjO0dBQ2xCLElBQUksWUFBWTtHQUNoQixJQUFJLE9BQU87R0FDWCxJQUFJLFVBQVU7R0FDZCxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEtBQUssR0FBRyxLQUFLLEtBQUssR0FBSTtHQUNsRCxJQUFJLGNBQWM7R0FDbEIsSUFBSSxZQUFZO0dBQ2hCLElBQUksT0FBTztHQUNYLElBQUksWUFBWTtHQUNoQixJQUFJLE9BQU87R0FDWCxJQUFJLFNBQVMsT0FBTyxLQUFLLEdBQUc7O0dBRzVCLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUs7SUFDM0IsTUFBTSxJQUFJLEtBQU8sSUFBSSxLQUFNO0lBQzNCLElBQUksWUFBWTtJQUNoQixJQUFJLFNBQVMsTUFBTSxJQUFJLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztHQUMzQztFQUNGLE9BQU87O0dBRUwsS0FBSyxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsT0FBTztJQUNoQyxLQUFLLElBQUksTUFBTSxHQUFHLE1BQU0sR0FBRyxPQUFPO0tBQ2hDLE1BQU0sS0FBSyxLQUFLLE1BQU07S0FDdEIsTUFBTSxLQUFLLE1BQU0sTUFBTTtLQUN2QixNQUFNLEtBQUs7S0FDWCxNQUFNLEtBQUs7S0FDWCxJQUFJLFlBQVk7S0FDaEIsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLEVBQUU7S0FDM0IsSUFBSSxjQUFjO0tBQ2xCLElBQUksWUFBWTtLQUNoQixJQUFJLFdBQVcsSUFBSSxJQUFJLElBQUksRUFBRTs7S0FHN0IsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSztNQUMxQixNQUFNLEtBQUssTUFBTyxJQUFJLEtBQUssTUFBTSxLQUFLLE1BQU0sTUFBTTtNQUNsRCxJQUFJLFlBQVksTUFBTSxJQUFJLFlBQVk7TUFDdEMsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssSUFBSSxJQUFJLEVBQUU7S0FDMUQ7SUFDRjtHQUNGO0VBQ0Y7O0VBR0EsTUFBTSxZQUFZO0dBQUM7R0FBZTtHQUFlO0dBQWdCO0VBQVk7RUFDN0UsVUFBVSxTQUFTLEtBQUssUUFBUTtHQUM5QixNQUFNLEtBQUssS0FBSyxNQUFNO0dBQ3RCLE1BQU0sS0FBSztHQUNYLE1BQU0sUUFBUSxRQUFRLGtCQUFrQjtHQUN4QyxJQUFJLFlBQVksUUFDWiw2QkFDQTtHQUNKLElBQUksU0FBUyxJQUFJLElBQUksS0FBSyxFQUFFO0dBQzVCLElBQUksY0FBYyxRQUFRLFlBQVk7R0FDdEMsSUFBSSxZQUFZLFFBQVEsTUFBTTtHQUM5QixJQUFJLFdBQVcsSUFBSSxJQUFJLEtBQUssRUFBRTtHQUM5QixJQUFJLFlBQVksUUFBUSxZQUFZO0dBQ3BDLElBQUksT0FBTztHQUNYLElBQUksU0FBUyxLQUFLLEtBQUssSUFBSSxLQUFLLEVBQUU7RUFDcEMsQ0FBQztFQUVELE1BQU0sVUFBVSxJQUFJLE1BQU0sY0FBYyxNQUFNO0VBQzlDLFFBQVEsYUFBYSxNQUFNO0VBQzNCLFFBQVEsYUFBYTtFQUNyQixRQUFRLGNBQWM7RUFDdEIsT0FBTztDQUNUO0NBRUEsTUFBTSxpQkFDSixnQkFBZ0I7Q0FFbEIsSUFDRSxnQkFBZ0IsbURBQ2hCLGdCQUNBO0VBQ0EsTUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0VBQzlDLE9BQU8sUUFBUTtFQUNmLE9BQU8sU0FBUztFQUNoQixNQUFNLE1BQU0sT0FBTyxXQUFXLElBQUk7RUFDbEMsSUFBSSxVQUFVLEdBQUcsR0FBRyxLQUFLLEdBQUc7RUFFNUIsTUFBTSxRQUFRO0VBQ2QsTUFBTSxRQUFRO0VBQ2QsTUFBTSxRQUFRO0VBQ2QsTUFBTSxRQUFRO0VBQ2QsTUFBTSxhQUFhOztFQUduQixJQUFJLEtBQUs7RUFDVCxvQkFBb0IsS0FBSyxPQUFPLE9BQU8sT0FBTyxPQUFPLFVBQVU7RUFDL0QsSUFBSSxLQUFLOztFQUdULE1BQU0sWUFBWSxJQUFJLHFCQUNwQixPQUNBLE9BQ0EsUUFBUSxPQUNSLFFBQVEsS0FDVjtFQUNBLElBQUksZ0JBQWdCO0dBQ2xCLFVBQVUsYUFBYSxHQUFLLDJCQUEyQjtHQUN2RCxVQUFVLGFBQWEsS0FBTSwyQkFBMkI7R0FDeEQsVUFBVSxhQUFhLElBQUssMkJBQTJCO0dBQ3ZELFVBQVUsYUFBYSxHQUFLLDJCQUEyQjtFQUN6RCxPQUFPO0dBQ0wsVUFBVSxhQUFhLEdBQUssMkJBQTJCO0dBQ3ZELFVBQVUsYUFBYSxLQUFNLDJCQUEyQjtHQUN4RCxVQUFVLGFBQWEsSUFBSywyQkFBMkI7R0FDdkQsVUFBVSxhQUFhLEdBQUssMkJBQTJCO0VBQ3pEO0VBQ0EsSUFBSSxZQUFZO0VBQ2hCLElBQUksU0FBUyxPQUFPLE9BQU8sT0FBTyxLQUFLOztFQUd2QyxNQUFNLGFBQWEsSUFBSSxxQkFBcUIsS0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUc7RUFDckUsV0FBVyxhQUNULEdBQ0EsaUJBQWlCLDhCQUE4QiwyQkFDakQ7RUFDQSxXQUFXLGFBQ1QsSUFDQSxpQkFBaUIsOEJBQThCLDJCQUNqRDtFQUNBLFdBQVcsYUFBYSxHQUFHLHdCQUF3QjtFQUNuRCxJQUFJLFlBQVk7RUFDaEIsSUFBSSxTQUFTLE9BQU8sT0FBTyxPQUFPLEdBQUc7O0VBR3JDLElBQUksS0FBSztFQUNULElBQUksVUFBVSxLQUFLLEdBQUc7RUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBSTtFQUNoQixNQUFNLFlBQVksSUFBSSxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEdBQUc7RUFDL0QsVUFBVSxhQUFhLEdBQUssMEJBQTBCO0VBQ3RELFVBQVUsYUFDUixLQUNBLGlCQUFpQiw4QkFBOEIsMkJBQ2pEO0VBQ0EsVUFBVSxhQUNSLEtBQ0EsaUJBQWlCLDhCQUE4QiwyQkFDakQ7RUFDQSxVQUFVLGFBQ1IsS0FDQSxpQkFBaUIsOEJBQThCLDJCQUNqRDtFQUNBLFVBQVUsYUFBYSxHQUFLLDBCQUEwQjtFQUN0RCxJQUFJLFlBQVk7RUFDaEIsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxHQUFHO0VBQ2pDLElBQUksUUFBUTs7RUFHWixJQUFJLEtBQUs7RUFDVCxJQUFJLFVBQVUsS0FBSyxHQUFHO0VBQ3RCLElBQUksY0FBYyxpQkFDZCw4QkFDQTtFQUNKLElBQUksWUFBWSxpQkFDWiw4QkFDQTtFQUNKLElBQUksWUFBWTtFQUNoQixJQUFJLGNBQWMsV0FBVyxjQUFjLFFBQVE7O0dBRWpELElBQUksVUFBVTtHQUNkLElBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtHQUNqQixJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7R0FDbEIsSUFBSSxPQUFPLElBQUksRUFBRTtHQUNqQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7R0FDbEIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7R0FDbkIsSUFBSSxVQUFVO0dBQ2QsSUFBSSxLQUFLO0dBQ1QsSUFBSSxPQUFPO0dBRVgsSUFBSSxVQUFVO0dBQ2QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxFQUFFO0dBQ2pCLElBQUksT0FBTyxHQUFHLEVBQUU7R0FDaEIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7R0FDbkIsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO0dBQ2xCLElBQUksT0FBTztFQUNiLE9BQU87O0dBRUwsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJO0lBQ2pDLElBQUksVUFBVTtJQUNkLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDO0lBQy9CLElBQUksT0FBTztHQUNiO0VBQ0Y7RUFDQSxJQUFJLFFBQVE7O0VBR1osTUFBTSxlQU9GO0dBQ0YsT0FBTztJQUNMLFNBQVM7S0FDUDtLQUNBO0tBQ0E7S0FDQTtJQUNGO0lBQ0EsT0FBTztLQUNMO01BQ0U7TUFDQTtNQUNBO0tBQ0Y7S0FDQTtNQUNFO01BQ0E7TUFDQTtLQUNGO0tBQ0E7TUFDRTtNQUNBO01BQ0E7S0FDRjtLQUNBO01BQ0U7TUFDQTtNQUNBO0tBQ0Y7SUFDRjtJQUNBLEtBQUs7R0FDUDtHQUNBLFNBQVM7SUFDUCxTQUFTO0tBQ1A7S0FDQTtLQUNBO0tBQ0E7SUFDRjtJQUNBLE9BQU87S0FDTDtNQUNFO01BQ0E7TUFDQTtLQUNGO0tBQ0E7TUFDRTtNQUNBO01BQ0E7S0FDRjtLQUNBO01BQ0U7TUFDQTtNQUNBO0tBQ0Y7S0FDQTtNQUNFO01BQ0E7TUFDQTtLQUNGO0lBQ0Y7SUFDQSxLQUFLO0dBQ1A7R0FDQSxNQUFNO0lBQ0osU0FBUztLQUNQO0tBQ0E7S0FDQTtLQUNBO0lBQ0Y7SUFDQSxPQUFPO0tBQ0w7TUFDRTtNQUNBO01BQ0E7S0FDRjtLQUNBO01BQ0U7TUFDQTtNQUNBO0tBQ0Y7S0FDQTtNQUNFO01BQ0E7TUFDQTtLQUNGO0tBQ0E7TUFDRTtNQUNBO01BQ0E7S0FDRjtJQUNGO0lBQ0EsS0FBSztHQUNQO0dBQ0EsV0FBVztJQUNULFNBQVM7S0FDUDtLQUNBO0tBQ0E7S0FDQTtJQUNGO0lBQ0EsT0FBTztLQUNMO01BQ0U7TUFDQTtNQUNBO0tBQ0Y7S0FDQTtNQUNFO01BQ0E7TUFDQTtLQUNGO0tBQ0E7TUFDRTtNQUNBO01BQ0E7S0FDRjtLQUNBO01BQ0U7TUFDQTtNQUNBO0tBQ0Y7SUFDRjtJQUNBLEtBQUs7R0FDUDtHQUNBLFFBQVE7SUFDTixTQUFTO0tBQ1A7S0FDQTtLQUNBO0tBQ0E7SUFDRjtJQUNBLE9BQU87S0FDTDtNQUNFO01BQ0E7TUFDQTtLQUNGO0tBQ0E7TUFDRTtNQUNBO01BQ0E7S0FDRjtLQUNBO01BQ0U7TUFDQTtNQUNBO0tBQ0Y7S0FDQTtNQUNFO01BQ0E7TUFDQTtLQUNGO0lBQ0Y7SUFDQSxLQUFLO0dBQ1A7RUFDRjtFQUVBLE1BQU0sV0FBWSxrQkFBa0IsSUFBSyxLQUFLO0VBQzlDLE1BQU0sT0FBTyxhQUFhOztFQUcxQixJQUFJLEtBQUs7RUFDVCxJQUFJLGdCQUFnQjtHQUNsQixJQUFJLGNBQWM7R0FDbEIsSUFBSSxhQUFhO0VBQ25CO0VBQ0EsSUFBSSxZQUFZLGlCQUNaLDhCQUNBO0VBQ0osSUFBSSxPQUFPO0VBQ1gsSUFBSSxTQUNGLGlCQUFpQixHQUFHLEtBQUssSUFBSSxnQkFBZ0IsS0FBSyxLQUNsRCxJQUNBLEdBQ0Y7O0VBR0EsSUFBSSxZQUFZLGlCQUFpQixZQUFZO0VBQzdDLElBQUksT0FBTztFQUNYLElBQUksU0FBUyxLQUFLLFFBQVEsVUFBVSxJQUFJLEdBQUc7O0VBRzNDLElBQUksWUFBWSxpQkFBaUIsWUFBWTtFQUM3QyxJQUFJLE9BQU87RUFDWCxNQUFNLGNBQWMsS0FBSyxNQUFNO0VBQy9CLFlBQVksU0FBUyxNQUFNLFNBQVM7R0FDbEMsSUFBSSxTQUFTLE1BQU0sSUFBSSxNQUFNLE9BQU8sRUFBRTtFQUN4QyxDQUFDO0VBQ0QsSUFBSSxRQUFROztFQUdaLElBQUksS0FBSztFQUNULElBQUksVUFBVSxLQUFLLEdBQUc7RUFDdEIsSUFBSSxjQUFjLGlCQUNkLDhCQUNBO0VBQ0osSUFBSSxZQUFZO0VBQ2hCLElBQUksVUFBVTtFQUNkLElBQUksV0FBVztFQUNmLElBQUksVUFBVTtFQUNkLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtFQUNsQixJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7RUFDbEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7RUFDbEIsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFO0VBQ2xCLElBQUksT0FBTyxJQUFJLENBQUM7RUFDaEIsSUFBSSxPQUFPO0VBQ1gsSUFBSSxRQUFROztFQUdaLG9CQUFvQixLQUFLLEtBQUssS0FBSyxLQUFLLElBQUksRUFBRTtFQUM5QyxJQUFJLFlBQVksaUJBQ1osOEJBQ0E7RUFDSixJQUFJLEtBQUs7RUFDVCxJQUFJLGNBQWM7RUFDbEIsSUFBSSxZQUFZO0VBQ2hCLElBQUksT0FBTztFQUNYLElBQUksWUFBWSxpQkFBaUIsWUFBWTtFQUM3QyxJQUFJLE9BQU87RUFDWCxJQUFJLFNBQ0YsaUJBQ0kscUJBQXFCLFVBQVUsRUFBRSxPQUNqQyxTQUFTLFVBQVUsRUFBRSxxQkFDekIsS0FDQSxHQUNGOztFQUdBLE1BQU0sUUFBUTtFQUNkLE1BQU0sUUFBUTtFQUNkLG9CQUFvQixLQUFLLE9BQU8sT0FBTyxPQUFPLE9BQU8sRUFBRTtFQUN2RCxNQUFNLFdBQVcsSUFBSSxxQkFBcUIsT0FBTyxPQUFPLE9BQU8sUUFBUSxLQUFLO0VBQzVFLElBQUksZ0JBQWdCO0dBQ2xCLFNBQVMsYUFBYSxHQUFHLDRCQUE0QjtHQUNyRCxTQUFTLGFBQWEsR0FBRyw0QkFBNEI7RUFDdkQsT0FBTztHQUNMLFNBQVMsYUFBYSxHQUFHLDJCQUEyQjtHQUNwRCxTQUFTLGFBQWEsR0FBRywyQkFBMkI7RUFDdEQ7RUFDQSxJQUFJLFlBQVk7RUFDaEIsSUFBSSxLQUFLOztFQUdULElBQUksY0FBYztFQUNsQixJQUFJLFlBQVk7RUFDaEIsSUFBSSxPQUFPOztFQUdYLE1BQU0saUJBQWlCO0dBQUM7R0FBSztHQUFLO0dBQUs7RUFBRztFQUMxQyxNQUFNLGdCQUFnQjtFQUN0QixNQUFNLFlBQVk7RUFFbEIsZUFBZSxTQUFTLElBQUksU0FBUztHQUNuQyxNQUFNLFdBQVcsU0FBUztHQUUxQixJQUFJLEtBQUs7R0FDVCxJQUFJLFVBQVU7O0lBRVosSUFBSSxjQUFjO0lBQ2xCLElBQUksYUFBYTtJQUNqQixJQUFJLGdCQUFnQjtJQUVwQixNQUFNLGdCQUFnQixJQUFJLHFCQUN4QixLQUFLLElBQ0wsZ0JBQWdCLElBQ2hCLEdBQ0EsSUFDQSxlQUNBLFNBQ0Y7SUFDQSxjQUFjLGFBQWEsR0FBRyxTQUFTO0lBQ3ZDLGNBQWMsYUFBYSxLQUFNLFNBQVM7SUFDMUMsY0FBYyxhQUFhLEdBQUcsU0FBUztJQUV2QyxJQUFJLFVBQVU7SUFDZCxJQUFJLElBQUksSUFBSSxlQUFlLFdBQVcsR0FBRyxLQUFLLEtBQUssQ0FBQztJQUNwRCxJQUFJLFlBQVk7SUFDaEIsSUFBSSxLQUFLOztJQUdULElBQUksYUFBYTtJQUNqQixJQUFJLGdCQUFnQjtJQUNwQixJQUFJLFlBQVk7SUFDaEIsSUFBSSxjQUFjO0lBQ2xCLElBQUksT0FBTztHQUNiLE9BQU87O0lBRUwsSUFBSSxVQUFVO0lBQ2QsSUFBSSxJQUFJLElBQUksZUFBZSxZQUFZLEdBQUcsR0FBRyxLQUFLLEtBQUssQ0FBQztJQUN4RCxJQUFJLGNBQWMsaUJBQ2QsOEJBQ0E7SUFDSixJQUFJLFlBQVk7SUFDaEIsSUFBSSxPQUFPO0lBRVgsSUFBSSxVQUFVO0lBQ2QsSUFBSSxJQUFJLElBQUksZUFBZSxXQUFXLEdBQUcsS0FBSyxLQUFLLENBQUM7SUFDcEQsSUFBSSxZQUFZLGlCQUNaLDhCQUNBO0lBQ0osSUFBSSxLQUFLO0lBQ1QsSUFBSSxZQUFZO0lBQ2hCLElBQUksY0FBYyxpQkFDZCw4QkFDQTtJQUNKLElBQUksT0FBTztHQUNiOztHQUdBLE1BQU0sb0JBQW9CLGlCQUFpQixZQUFZO0dBQ3ZELElBQUksY0FBYyxXQUFXLFlBQVk7R0FDekMsSUFBSSxZQUFZLFdBQVcsWUFBWTtHQUN2QyxJQUFJLFlBQVk7R0FDaEIsSUFBSSxVQUFVO0dBQ2QsSUFBSSxXQUFXO0dBRWYsSUFBSSxTQUFTLEdBQUc7O0lBRWQsSUFBSSxVQUFVO0lBQ2QsSUFBSSxPQUFPLElBQUksZ0JBQWdCLEVBQUU7SUFDakMsSUFBSSxPQUFPLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQztJQUNyQyxJQUFJLE9BQU8sS0FBSyxJQUFJLGdCQUFnQixFQUFFO0lBQ3RDLElBQUksaUJBQWlCLEtBQUssSUFBSSxnQkFBZ0IsSUFBSSxLQUFLLElBQUksZ0JBQWdCLEVBQUU7SUFDN0UsSUFBSSxPQUFPLEtBQUssSUFBSSxnQkFBZ0IsRUFBRTtJQUN0QyxJQUFJLGlCQUFpQixLQUFLLElBQUksZ0JBQWdCLElBQUksS0FBSyxJQUFJLGdCQUFnQixFQUFFO0lBQzdFLElBQUksT0FBTyxLQUFLLElBQUksZ0JBQWdCLENBQUM7SUFDckMsSUFBSSxVQUFVO0lBQ2QsSUFBSSxPQUFPOztJQUdYLElBQUksVUFBVTtJQUNkLElBQUksT0FBTyxLQUFLLEdBQUcsZ0JBQWdCLEVBQUU7SUFDckMsSUFBSSxPQUFPLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztJQUNwQyxJQUFJLElBQUksSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLEtBQUssSUFBSSxHQUFHLEtBQUs7SUFDbkQsSUFBSSxPQUFPLEtBQUssR0FBRyxnQkFBZ0IsRUFBRTtJQUNyQyxJQUFJLE9BQU87R0FDYixPQUFPLElBQUksU0FBUyxHQUFHOztJQUVyQixvQkFBb0IsS0FBSyxLQUFLLElBQUksZ0JBQWdCLElBQUksSUFBSSxJQUFJLENBQUM7SUFDL0QsSUFBSSxPQUFPOztJQUVYLElBQUksVUFBVTtJQUNkLElBQUksT0FBTyxLQUFLLElBQUksZ0JBQWdCLENBQUM7SUFDckMsSUFBSSxPQUFPLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztJQUNwQyxJQUFJLE9BQU8sS0FBSyxJQUFJLGFBQWE7SUFDakMsSUFBSSxPQUFPLEtBQUssR0FBRyxhQUFhO0lBQ2hDLElBQUksT0FBTyxLQUFLLElBQUksZ0JBQWdCLENBQUM7SUFDckMsSUFBSSxPQUFPLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztJQUNwQyxJQUFJLE9BQU87O0lBRVgsSUFBSSxVQUFVO0lBQ2QsSUFBSSxPQUFPLEtBQUssR0FBRyxnQkFBZ0IsRUFBRTtJQUNyQyxJQUFJLE9BQU8sS0FBSyxJQUFJLGdCQUFnQixDQUFDO0lBQ3JDLElBQUksT0FBTyxLQUFLLElBQUksZ0JBQWdCLEVBQUU7SUFDdEMsSUFBSSxPQUFPLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztJQUNwQyxJQUFJLFVBQVU7SUFDZCxJQUFJLE9BQU87R0FDYixPQUFPLElBQUksU0FBUyxHQUFHOztJQUVyQixJQUFJLFVBQVU7SUFDZCxJQUFJLE9BQU8sS0FBSyxJQUFJLGdCQUFnQixDQUFDO0lBQ3JDLElBQUksT0FBTyxLQUFLLElBQUksZ0JBQWdCLEVBQUU7SUFDdEMsSUFBSSxpQkFBaUIsSUFBSSxnQkFBZ0IsSUFBSSxLQUFLLElBQUksZ0JBQWdCLEVBQUU7SUFDeEUsSUFBSSxPQUFPLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQztJQUNyQyxJQUFJLE9BQU87O0lBR1gsSUFBSSxVQUFVO0lBQ2QsSUFBSSxJQUFJLEtBQUssSUFBSSxnQkFBZ0IsR0FBRyxHQUFHLEtBQUssS0FBSyxLQUFNLEtBQUssS0FBSyxNQUFNLEtBQUs7SUFDNUUsSUFBSSxJQUFJLElBQUksZ0JBQWdCLElBQUksSUFBSSxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssTUFBTSxLQUFLO0lBQ3pFLElBQUksSUFBSSxLQUFLLElBQUksZ0JBQWdCLEdBQUcsR0FBRyxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssS0FBTSxLQUFLO0lBQzVFLElBQUksT0FBTzs7SUFHWCxJQUFJLFVBQVU7SUFDZCxJQUFJLE9BQU8sS0FBSyxHQUFHLGdCQUFnQixDQUFDO0lBQ3BDLElBQUksT0FBTyxLQUFLLEdBQUcsZ0JBQWdCLEVBQUU7SUFDckMsSUFBSSxPQUFPLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQztJQUNwQyxJQUFJLE9BQU8sS0FBSyxHQUFHLGdCQUFnQixFQUFFO0lBQ3JDLElBQUksT0FBTztHQUNiLE9BQU8sSUFBSSxTQUFTLEdBQUc7O0lBRXJCLElBQUksVUFBVTtJQUNkLElBQUksT0FBTyxLQUFLLElBQUksZ0JBQWdCLEVBQUU7SUFDdEMsSUFBSSxPQUFPLEtBQUssSUFBSSxnQkFBZ0IsRUFBRTtJQUN0QyxJQUFJLE9BQU8sS0FBSyxHQUFHLGdCQUFnQixDQUFDO0lBQ3BDLElBQUksT0FBTyxLQUFLLElBQUksZ0JBQWdCLENBQUM7SUFDckMsSUFBSSxPQUFPLEtBQUssSUFBSSxnQkFBZ0IsQ0FBQztJQUNyQyxJQUFJLE9BQU8sS0FBSyxJQUFJLGdCQUFnQixDQUFDO0lBQ3JDLElBQUksT0FBTzs7SUFHWCxJQUFJLFVBQVU7SUFDZCxJQUFJLElBQUksS0FBSyxHQUFHLGdCQUFnQixJQUFJLEdBQUcsR0FBRyxLQUFLLEtBQUssQ0FBQztJQUNyRCxJQUFJLElBQUksS0FBSyxJQUFJLGdCQUFnQixJQUFJLEdBQUcsR0FBRyxLQUFLLEtBQUssQ0FBQztJQUN0RCxJQUFJLE9BQU87R0FDYjtHQUNBLElBQUksUUFBUTtFQUNkLENBQUM7RUFFRCxJQUFJLFFBQVE7O0VBR1osb0JBQW9CLEtBQUssT0FBTyxPQUFPLE9BQU8sT0FBTyxVQUFVO0VBQy9ELE1BQU0sVUFBVSxJQUFJLHFCQUNsQixPQUNBLE9BQ0EsUUFBUSxPQUNSLFFBQVEsS0FDVjtFQUNBLFFBQVEsYUFBYSxHQUFLLDJCQUEyQjtFQUNyRCxRQUFRLGFBQWEsSUFBSywyQkFBMkI7RUFDckQsUUFBUSxhQUFhLEdBQUssMkJBQTJCO0VBQ3JELElBQUksY0FBYztFQUNsQixJQUFJLFlBQVksaUJBQWlCLElBQU07RUFDdkMsSUFBSSxPQUFPO0VBRVgsTUFBTSxVQUFVLElBQUksTUFBTSxjQUFjLE1BQU07RUFDOUMsUUFBUSxhQUFhLE1BQU07RUFDM0IsUUFBUSxhQUFhO0VBQ3JCLFFBQVEsY0FBYztFQUN0QixPQUFPO0NBQ1Q7O0NBR0EsTUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0NBQzlDLE9BQU8sUUFBUTtDQUNmLE9BQU8sU0FBUztDQUNoQixNQUFNLE1BQU0sT0FBTyxXQUFXLElBQUk7O0NBR2xDLElBQUksWUFBWTtDQUNoQixJQUFJLFNBQVMsSUFBSSxJQUFJLEtBQUssR0FBRzs7Q0FHN0IsSUFBSSxjQUFjO0NBQ2xCLElBQUksWUFBWTtDQUNoQixJQUFJLFdBQVcsSUFBSSxJQUFJLEtBQUssR0FBRztDQUMvQixJQUFJLGNBQWM7Q0FDbEIsSUFBSSxZQUFZO0NBQ2hCLElBQUksV0FBVyxJQUFJLElBQUksS0FBSyxHQUFHOztDQUcvQixJQUFJLFlBQVk7Q0FDaEIsSUFBSSxTQUFTLElBQUksSUFBSSxLQUFLLEVBQUU7Q0FFNUIsTUFBTSxTQUF1QztFQUMzQyxPQUFPO0VBQ1AsU0FBUztFQUNULE1BQU07RUFDTixXQUFXO0VBQ1gsUUFBUTtDQUNWO0NBRUEsSUFBSSxZQUFZO0NBQ2hCLElBQUksT0FBTztDQUNYLElBQUksU0FBUyxPQUFPLFlBQVksSUFBSSxFQUFFOztDQUd0QyxJQUFJLEtBQUs7Q0FDVCxJQUFJLFVBQVUsS0FBSyxHQUFHO0NBRXRCLElBQUksY0FBYyxTQUFTO0VBQ3pCLElBQUksY0FBYztFQUNsQixJQUFJLFlBQVk7RUFDaEIsSUFBSSxVQUFVO0VBQ2QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHO0VBQ2xCLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRztFQUNwQixJQUFJLE9BQU8sSUFBSSxHQUFHO0VBQ2xCLElBQUksVUFBVTtFQUNkLElBQUksWUFBWTtFQUNoQixJQUFJLEtBQUs7RUFDVCxJQUFJLE9BQU87RUFFWCxJQUFJLFVBQVU7RUFDZCxJQUFJLE9BQU8sR0FBRyxDQUFDLEdBQUc7RUFDbEIsSUFBSSxPQUFPLElBQUksR0FBRztFQUNsQixJQUFJLE9BQU8sS0FBSyxFQUFFO0VBQ2xCLElBQUksVUFBVTtFQUNkLElBQUksWUFBWTtFQUNoQixJQUFJLEtBQUs7RUFDVCxJQUFJLE9BQU87Q0FDYixPQUFPLElBQUksY0FBYyxXQUFXO0VBQ2xDLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSztHQUM1QixJQUFJLFVBQVU7R0FDZCxJQUFJLFFBQVEsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUssR0FBRyxLQUFLLEtBQUssQ0FBQztHQUNsRCxJQUFJLGNBQWMsTUFBTSxJQUFJLFlBQVk7R0FDeEMsSUFBSSxZQUFZO0dBQ2hCLElBQUksT0FBTztFQUNiO0VBQ0EsSUFBSSxVQUFVO0VBQ2QsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDO0VBQ2xCLElBQUksT0FBTyxLQUFLLENBQUM7RUFDakIsSUFBSSxjQUFjO0VBQ2xCLElBQUksWUFBWTtFQUNoQixJQUFJLE9BQU87Q0FDYixPQUFPLElBQUksY0FBYyxRQUFRO0VBQy9CLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssS0FBSyxJQUFJO0dBQ3BDLElBQUksY0FBYztHQUNsQixJQUFJLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxFQUFFO0VBQ2pDO0NBQ0YsT0FBTyxJQUFJLGNBQWMsYUFBYTtFQUNwQyxJQUFJLFVBQVU7RUFDZCxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRztFQUNwQixJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRztFQUM5QyxJQUFJLE9BQU8sSUFBSSxHQUFHO0VBQ2xCLElBQUksY0FBYyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUc7RUFDNUMsSUFBSSxVQUFVO0VBQ2QsSUFBSSxZQUFZO0VBQ2hCLElBQUksS0FBSztFQUNULElBQUksY0FBYztFQUNsQixJQUFJLFlBQVk7RUFDaEIsSUFBSSxPQUFPO0VBRVgsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksS0FBSztHQUMzQixNQUFNLEtBQUssS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJO0dBQy9CLE1BQU0sS0FBSyxLQUFLLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSTtHQUNwQyxJQUFJLFlBQ0YsSUFBSSxNQUFNLElBQUksNEJBQTRCO0dBQzVDLElBQUksVUFBVTtHQUNkLElBQUksSUFBSSxJQUFJLElBQUksS0FBTSxJQUFJLElBQUssR0FBRyxLQUFLLEtBQUssQ0FBQztHQUM3QyxJQUFJLEtBQUs7RUFDWDtDQUNGLE9BQU8sSUFBSSxjQUFjLFVBQVU7RUFDakMsTUFBTSxRQUE0QixDQUFDO0VBQ25DLEtBQUssSUFBSSxPQUFPLEdBQUcsUUFBUSxHQUFHLFFBQVE7R0FDcEMsTUFBTSxRQUFRLE9BQU87R0FDckIsTUFBTSxNQUFNLE9BQU87R0FDbkIsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSztJQUM5QixNQUFNLE1BQU8sSUFBSSxRQUFTLEtBQUssS0FBSztJQUNwQyxNQUFNLEtBQUssQ0FBQyxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7R0FDdkQ7RUFDRjtFQUNBLE1BQU0sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBRWpCLElBQUksY0FBYztFQUNsQixJQUFJLFlBQVk7RUFDaEIsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0dBQ3JDLEtBQUssSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLO0lBQ3pDLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQyxLQUFLLE1BQU0sRUFBRSxDQUFDO0lBQ2xDLE1BQU0sS0FBSyxNQUFNLEVBQUUsQ0FBQyxLQUFLLE1BQU0sRUFBRSxDQUFDO0lBQ2xDLElBQUksS0FBSyxNQUFNLElBQUksRUFBRSxJQUFJLEtBQUs7S0FDNUIsSUFBSSxVQUFVO0tBQ2QsSUFBSSxPQUFPLE1BQU0sRUFBRSxDQUFDLElBQUksTUFBTSxFQUFFLENBQUMsRUFBRTtLQUNuQyxJQUFJLE9BQU8sTUFBTSxFQUFFLENBQUMsSUFBSSxNQUFNLEVBQUUsQ0FBQyxFQUFFO0tBQ25DLElBQUksT0FBTztJQUNiO0dBQ0Y7RUFDRjtFQUNBLE1BQU0sU0FBUyxDQUFDLElBQUksS0FBSyxRQUFRO0dBQy9CLElBQUksWUFBWSxNQUFNLE1BQU0sSUFBSSxZQUFZO0dBQzVDLElBQUksVUFBVTtHQUNkLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDO0dBQ2pDLElBQUksS0FBSztFQUNYLENBQUM7Q0FDSDtDQUVBLElBQUksUUFBUTs7Q0FHWixJQUFJLFlBQVk7Q0FDaEIsSUFBSSxPQUFPO0NBQ1gsSUFBSSxTQUNGLDREQUNBLElBQ0EsR0FDRjtDQUVBLE1BQU0sVUFBVSxJQUFJLE1BQU0sY0FBYyxNQUFNO0NBQzlDLFFBQVEsYUFBYSxNQUFNO0NBQzNCLFFBQVEsYUFBYTtDQUNyQixRQUFRLGNBQWM7Q0FDdEIsT0FBTztBQUNUOzs7Ozs7QUFPQSxPQUFPLFNBQVMsaUNBQ2QsZUFDQSxRQUNxQjtDQUNyQixNQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7Q0FDOUMsT0FBTyxRQUFRO0NBQ2YsT0FBTyxTQUFTO0NBQ2hCLE1BQU0sTUFBTSxPQUFPLFdBQVcsSUFBSTtDQUVsQyxJQUFJLFdBQVcsd0RBQXdEOztFQUVyRSxNQUFNLE9BQU8sSUFBSSxxQkFBcUIsR0FBRyxHQUFHLEtBQUssR0FBRztFQUNwRCxLQUFLLGFBQWEsR0FBRyxTQUFTO0VBQzlCLEtBQUssYUFBYSxJQUFLLFNBQVM7RUFDaEMsS0FBSyxhQUFhLEdBQUcsU0FBUztFQUM5QixJQUFJLFlBQVk7RUFDaEIsSUFBSSxTQUFTLEdBQUcsR0FBRyxLQUFLLEdBQUc7RUFFM0IsTUFBTSxPQUFPO0VBQ2IsTUFBTSxPQUFPO0VBQ2IsTUFBTSxRQUFRLE1BQU07RUFDcEIsTUFBTSxRQUFRLE1BQU07RUFFcEIsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLE1BQU0sS0FBSztHQUM3QixLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLO0lBQzdCLE1BQU0sT0FBTyxLQUFLLElBQUksSUFBSSxVQUFVLElBQUksTUFBTSxJQUFJO0lBQ2xELE1BQU0sT0FBTyxPQUFPLEtBQUssTUFBTSxJQUFJO0lBRW5DLElBQUksT0FBTyxLQUFNO0tBQ2YsSUFBSSxZQUNGLE9BQU8sTUFDSCw2QkFDQTtJQUNSLE9BQU8sSUFBSSxPQUFPLEtBQU07S0FDdEIsSUFBSSxZQUFZO0lBQ2xCLE9BQU87S0FDTCxJQUFJLFlBQVk7SUFDbEI7SUFFQSxJQUFJLFNBQVMsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7SUFHL0QsSUFBSSxjQUFjO0lBQ2xCLElBQUksWUFBWTtJQUNoQixJQUFJLFdBQVcsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztHQUNuRTtFQUNGOztFQUdBLElBQUksY0FBYztFQUNsQixJQUFJLFlBQVk7RUFDaEIsSUFBSSxVQUFVO0VBQ2QsSUFBSSxPQUFPLEdBQUcsQ0FBQztFQUNmLElBQUksT0FBTyxLQUFLLEdBQUc7RUFDbkIsSUFBSSxPQUFPLEtBQUssQ0FBQztFQUNqQixJQUFJLE9BQU8sR0FBRyxHQUFHO0VBQ2pCLElBQUksT0FBTztDQUNiLE9BQU8sSUFBSSxXQUFXLGlEQUFpRDs7RUFFckUsTUFBTSxLQUFLLElBQUkscUJBQXFCLEdBQUcsR0FBRyxLQUFLLENBQUM7RUFDaEQsR0FBRyxhQUFhLEdBQUcsU0FBUztFQUM1QixHQUFHLGFBQWEsSUFBSyxTQUFTO0VBQzlCLEdBQUcsYUFBYSxHQUFHLFNBQVM7RUFDNUIsSUFBSSxZQUFZO0VBQ2hCLElBQUksU0FBUyxHQUFHLEdBQUcsS0FBSyxHQUFHOztFQUczQixLQUFLLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLLEdBQUc7R0FDL0IsSUFBSSxZQUNGLElBQUksTUFBTSxJQUFJLDJCQUEyQjtHQUMzQyxJQUFJLFNBQVMsR0FBRyxHQUFHLEtBQUssQ0FBQztFQUMzQjs7RUFHQSxLQUFLLElBQUksSUFBSSxHQUFHLEtBQUssS0FBSyxLQUFLLElBQUk7R0FDakMsSUFBSSxZQUFZO0dBQ2hCLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7RUFDL0I7O0VBR0EsSUFBSSxjQUFjO0VBQ2xCLElBQUksWUFBWTtFQUNoQixNQUFNLE9BQU87RUFDYixLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxNQUFNLEtBQUssTUFBTTtHQUN2QyxJQUFJLFVBQVU7R0FDZCxJQUFJLE9BQU8sR0FBRyxDQUFDO0dBQ2YsSUFBSSxPQUFPLElBQUksS0FBSyxHQUFHO0dBQ3ZCLElBQUksT0FBTztHQUVYLElBQUksVUFBVTtHQUNkLElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQztHQUNyQixJQUFJLE9BQU8sR0FBRyxHQUFHO0dBQ2pCLElBQUksT0FBTztFQUNiO0NBQ0YsT0FBTyxJQUNMLFdBQVcsMkRBQ1g7O0VBRUEsSUFBSSxZQUFZO0VBQ2hCLElBQUksU0FBUyxHQUFHLEdBQUcsS0FBSyxHQUFHOztFQUczQixLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLO0dBQzdCLE1BQU0sSUFBSyxJQUFJLEtBQU07R0FDckIsTUFBTSxJQUFLLElBQUksTUFBTztHQUN0QixJQUFJLFlBQ0YsSUFBSSxNQUFNLElBQUksMkJBQTJCO0dBQzNDLElBQUksU0FBUyxHQUFHLEdBQUcsR0FBRyxDQUFDO0VBQ3pCOztFQUdBLE1BQU0sUUFBUTtFQUNkLE1BQU0sUUFBUTtFQUNkLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUssT0FBTztHQUNuQyxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLLE9BQU87SUFDbkMsSUFBSSxjQUFjO0lBQ2xCLElBQUksWUFBWTtJQUNoQixJQUFJLFdBQVcsR0FBRyxHQUFHLE9BQU8sS0FBSzs7SUFHakMsSUFBSSxZQUFZO0lBQ2hCLElBQUksVUFBVTtJQUNkLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDO0lBQ2hELElBQUksSUFBSSxJQUFJLFFBQVEsSUFBSSxJQUFJLFFBQVEsR0FBRyxHQUFHLEdBQUcsS0FBSyxLQUFLLENBQUM7SUFDeEQsSUFBSSxLQUFLO0dBQ1g7O0dBR0EsSUFBSSxZQUFZLElBQUksUUFBUSxJQUFJLFlBQVk7R0FDNUMsSUFBSSxTQUFTLEdBQUcsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO0VBQ3ZDO0NBQ0YsT0FBTyxJQUFJLFdBQVcsK0NBQStDOztFQUVuRSxJQUFJLFlBQVk7RUFDaEIsSUFBSSxTQUFTLEdBQUcsR0FBRyxLQUFLLEdBQUc7RUFFM0IsTUFBTSxPQUFPO0VBQ2IsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxNQUFNO0dBQ2xDLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUssTUFBTTtJQUNsQyxNQUFNLE9BQU8sSUFBSSxPQUFPLElBQUksUUFBUSxNQUFNO0lBQzFDLElBQUksWUFBWSxNQUFNLFlBQVk7SUFDbEMsSUFBSSxTQUFTLEdBQUcsR0FBRyxNQUFNLElBQUk7R0FDL0I7RUFDRjs7RUFHQSxJQUFJLGNBQWM7RUFDbEIsSUFBSSxZQUFZO0VBQ2hCLE1BQU0sT0FBTztFQUNiLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE1BQU0sS0FBSyxNQUFNO0dBQ3ZDLElBQUksVUFBVTtHQUNkLElBQUksT0FBTyxHQUFHLENBQUM7R0FDZixJQUFJLE9BQU8sSUFBSSxLQUFLLEdBQUc7R0FDdkIsSUFBSSxPQUFPO0VBQ2I7RUFFQSxJQUFJLGNBQWM7RUFDbEIsSUFBSSxZQUFZO0VBQ2hCLEtBQUssSUFBSSxJQUFJLEdBQUcsS0FBSyxLQUFLLEtBQUssSUFBSTtHQUNqQyxJQUFJLFVBQVU7R0FDZCxJQUFJLE9BQU8sR0FBRyxDQUFDO0dBQ2YsSUFBSSxPQUFPLEtBQUssQ0FBQztHQUNqQixJQUFJLE9BQU87RUFDYjtDQUNGLE9BQU87O0VBRUwsT0FBTywyQkFDTCxlQUNBLGlDQUNGO0NBQ0Y7Q0FFQSxNQUFNLFVBQVUsSUFBSSxNQUFNLGNBQWMsTUFBTTtDQUM5QyxRQUFRLGFBQWEsTUFBTTtDQUMzQixRQUFRLFFBQVEsTUFBTTtDQUN0QixRQUFRLFFBQVEsTUFBTTtDQUN0QixRQUFRLGFBQWE7Q0FDckIsUUFBUSxjQUFjO0NBQ3RCLE9BQU87QUFDVDs7Ozs7QUFNQSxPQUFPLFNBQVMseUJBQ2QsZUFDcUI7Q0FDckIsTUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0NBQzlDLE9BQU8sUUFBUTtDQUNmLE9BQU8sU0FBUztDQUNoQixNQUFNLE1BQU0sT0FBTyxXQUFXLElBQUk7Q0FFbEMsSUFBSSxZQUFZO0NBQ2hCLElBQUksU0FBUyxHQUFHLEdBQUcsS0FBSyxHQUFHO0NBRTNCLElBQUksY0FBYztDQUNsQixJQUFJLFlBQVk7Q0FDaEIsSUFBSSxXQUFXLElBQUksSUFBSSxLQUFLLEdBQUc7O0NBRy9CLE1BQU0sS0FBSztDQUNYLE1BQU0sS0FBSztDQUNYO0VBQUM7RUFBSTtFQUFJO0NBQUcsQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRO0VBQ2hDLElBQUksVUFBVTtFQUNkLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEtBQUssS0FBSyxDQUFDO0VBQ2pDLElBQUksY0FDRixRQUFRLElBQUksWUFBWTtFQUMxQixJQUFJLFlBQVksUUFBUSxJQUFJLElBQUk7RUFDaEMsSUFBSSxPQUFPO0NBQ2IsQ0FBQzs7Q0FHRCxJQUFJLFVBQVU7Q0FDZCxJQUFJLE9BQU8sSUFBSSxFQUFFO0NBQ2pCLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUssRUFBRztDQUM5QixJQUFJLFVBQVU7Q0FDZCxJQUFJLFlBQVk7Q0FDaEIsSUFBSSxLQUFLOztDQUdULElBQUksWUFBWTtDQUNoQixJQUFJLE9BQU87Q0FDWCxJQUFJLFNBQVMsc0JBQXNCLEtBQUssRUFBRTtDQUUxQyxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0VBQzFCLE1BQU0sS0FBSyxNQUFNLElBQUk7RUFDckIsSUFBSSxZQUFZO0VBQ2hCLElBQUksU0FBUyxLQUFLLElBQUksS0FBSyxFQUFFO0VBQzdCLElBQUksWUFBWSxJQUFJLE1BQU0sSUFBSSxZQUFZO0VBQzFDLElBQUksU0FBUyxLQUFLLElBQUksS0FBTyxJQUFJLEtBQU0sS0FBTSxFQUFFO0NBQ2pEO0NBRUEsTUFBTSxVQUFVLElBQUksTUFBTSxjQUFjLE1BQU07Q0FDOUMsUUFBUSxhQUFhLE1BQU07Q0FDM0IsUUFBUSxhQUFhO0NBQ3JCLFFBQVEsY0FBYztDQUN0QixPQUFPO0FBQ1QiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsicHJvY2VkdXJhbFRleHR1cmVzLnRzIl0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7XG4gIEJ1aWxkaW5nVGV4dHVyZVByZXNldE9wdGlvbixcbiAgSG9sb2dyYW1TdHlsZU9wdGlvbixcbiAgSHVkUGFuZWxUeXBlLFxuICBIdWRTY3JlZW5TdHlsZU9wdGlvbixcbn0gZnJvbSAnLi4vdHlwZXMvYXJTdHVkaW8nO1xuXG4vKipcbiAqIEdlbmVyYXRlcyB0aGUgZ2xvd2luZyBob2xvZ3JhcGhpYyBXb3JsZCBNYXAgKyBCb3R0b20gVGVsZW1ldHJ5IENvbnNvbGUgdGV4dHVyZVxuICogaW5zcGlyZWQgYnkgdGhlIGJvYXJkcm9vbSB0YWJsZSBpbiB0aGUgcmVmZXJlbmNlIGltYWdlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ybGRNYXBUYWJsZVRleHR1cmUobWF4QW5pc290cm9weTogbnVtYmVyKTogVEhSRUUuQ2FudmFzVGV4dHVyZSB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjYW52YXMud2lkdGggPSAyMDQ4O1xuICBjYW52YXMuaGVpZ2h0ID0gMTAyNDtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xuXG4gIC8vIERlZXAgb2JzaWRpYW4gcmVmbGVjdGl2ZSBiYXNlXG4gIGNvbnN0IGJnR3JhZCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudCgxMDI0LCA0NjAsIDgwLCAxMDI0LCA1MTIsIDExMDApO1xuICBiZ0dyYWQuYWRkQ29sb3JTdG9wKDAsICcjMDkyNDM4Jyk7XG4gIGJnR3JhZC5hZGRDb2xvclN0b3AoMC41NSwgJyMwNTEzMjInKTtcbiAgYmdHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzAyMDcwZScpO1xuICBjdHguZmlsbFN0eWxlID0gYmdHcmFkO1xuICBjdHguZmlsbFJlY3QoMCwgMCwgMjA0OCwgMTAyNCk7XG5cbiAgLy8gU3VidGxlIGxhdC9sb24gY2FydG9ncmFwaGljIGdyaWRcbiAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjE0KSc7XG4gIGN0eC5saW5lV2lkdGggPSAxO1xuICBmb3IgKGxldCB4ID0gODA7IHggPCAxOTY4OyB4ICs9IDY0KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oeCwgNDApO1xuICAgIGN0eC5saW5lVG8oeCwgODAwKTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbiAgZm9yIChsZXQgeSA9IDYwOyB5IDwgODAwOyB5ICs9IDU2KSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oODAsIHkpO1xuICAgIGN0eC5saW5lVG8oMTk2OCwgeSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgLy8gQ2VudHJhbCByb3RhcnkgZW1pdHRlciByaW5nc1xuICBjb25zdCBjZW50ZXJSaW5ncyA9IFs5MCwgMTQ1LCAyMTAsIDI4NSwgMzYwXTtcbiAgY2VudGVyUmluZ3MuZm9yRWFjaCgociwgaWR4KSA9PiB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoMTAyNCwgNDMwLCByLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID1cbiAgICAgIGlkeCAlIDIgPT09IDAgPyAncmdiYSgzNCwgMjExLCAyMzgsIDAuNDUpJyA6ICdyZ2JhKDI1MSwgMTkxLCAzNiwgMC4zMiknO1xuICAgIGN0eC5saW5lV2lkdGggPSBpZHggPT09IDEgPyAzIDogMS41O1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfSk7XG5cbiAgLy8gSGVscGVyIHRvIGRyYXcgc3R5bGl6ZWQgY29udGluZW50IHBvbHlnb25zIHdpdGggZ2xvd2luZyBjaXR5IG5vZGVzXG4gIGNvbnN0IGRyYXdDb250aW5lbnQgPSAocG9pbnRzOiBbbnVtYmVyLCBudW1iZXJdW10pID0+IHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgcG9pbnRzLmZvckVhY2goKFtweCwgcHldLCBpKSA9PiB7XG4gICAgICBpZiAoaSA9PT0gMCkgY3R4Lm1vdmVUbyhweCwgcHkpO1xuICAgICAgZWxzZSBjdHgubGluZVRvKHB4LCBweSk7XG4gICAgfSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyNDUsIDE1OCwgMTEsIDAuMTgpJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC43MiknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyLjI7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gU2NhdHRlciBnb2xkZW4gY2l0eSBsaWdodCBjbHVzdGVycyBpbnNpZGUgYm91bmRpbmcgYm94XG4gICAgbGV0IG1pblggPSAyMDQ4LFxuICAgICAgbWF4WCA9IDAsXG4gICAgICBtaW5ZID0gMTAyNCxcbiAgICAgIG1heFkgPSAwO1xuICAgIHBvaW50cy5mb3JFYWNoKChbeCwgeV0pID0+IHtcbiAgICAgIGlmICh4IDwgbWluWCkgbWluWCA9IHg7XG4gICAgICBpZiAoeCA+IG1heFgpIG1heFggPSB4O1xuICAgICAgaWYgKHkgPCBtaW5ZKSBtaW5ZID0geTtcbiAgICAgIGlmICh5ID4gbWF4WSkgbWF4WSA9IHk7XG4gICAgfSk7XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5jbGlwKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjA7IGkrKykge1xuICAgICAgY29uc3QgZ3ggPSBtaW5YICsgKChpICogOTcpICUgTWF0aC5tYXgoMjAsIG1heFggLSBtaW5YKSk7XG4gICAgICBjb25zdCBneSA9IG1pblkgKyAoKGkgKiA1MykgJSBNYXRoLm1heCgyMCwgbWF4WSAtIG1pblkpKTtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IChpICUgMykgKyAxLjI7XG4gICAgICBjdHguZmlsbFN0eWxlID1cbiAgICAgICAgaSAlIDQgPT09IDAgPyAncmdiYSgyNTMsIDIyNCwgNzEsIDAuOTIpJyA6ICdyZ2JhKDU2LCAxODksIDI0OCwgMC42NSknO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhneCwgZ3ksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfTtcblxuICAvLyBOb3J0aCBBbWVyaWNhXG4gIGRyYXdDb250aW5lbnQoW1xuICAgIFsyOTAsIDIxMF0sXG4gICAgWzQ5MCwgMTkwXSxcbiAgICBbNTkwLCAyOTBdLFxuICAgIFs1MjAsIDQxMF0sXG4gICAgWzQzMCwgNDYwXSxcbiAgICBbMzUwLCAzODBdLFxuICAgIFsyNzAsIDI5MF0sXG4gIF0pO1xuICAvLyBTb3V0aCBBbWVyaWNhXG4gIGRyYXdDb250aW5lbnQoW1xuICAgIFs1MTAsIDQ5MF0sXG4gICAgWzY0MCwgNTIwXSxcbiAgICBbNjkwLCA2MjBdLFxuICAgIFs2MTAsIDc2MF0sXG4gICAgWzU0MCwgNzQwXSxcbiAgICBbNDk1LCA1OTBdLFxuICBdKTtcbiAgLy8gRXVyb3BlXG4gIGRyYXdDb250aW5lbnQoW1xuICAgIFs4OTAsIDIxMF0sXG4gICAgWzEwODAsIDE5NV0sXG4gICAgWzExNDAsIDI5MF0sXG4gICAgWzEwNjAsIDM2MF0sXG4gICAgWzkxMCwgMzU1XSxcbiAgICBbODcwLCAyODBdLFxuICBdKTtcbiAgLy8gQWZyaWNhXG4gIGRyYXdDb250aW5lbnQoW1xuICAgIFs4OTUsIDM5MF0sXG4gICAgWzEwOTUsIDM5NV0sXG4gICAgWzExNzUsIDUxMF0sXG4gICAgWzExMTAsIDY5NV0sXG4gICAgWzk5NSwgNzEwXSxcbiAgICBbOTI1LCA1NjBdLFxuICBdKTtcbiAgLy8gQXNpYVxuICBkcmF3Q29udGluZW50KFtcbiAgICBbMTE0NSwgMTk1XSxcbiAgICBbMTU2MCwgMjEwXSxcbiAgICBbMTY2MCwgMzQwXSxcbiAgICBbMTU0MCwgNDkwXSxcbiAgICBbMTM0MCwgNTEwXSxcbiAgICBbMTE3MCwgNDEwXSxcbiAgXSk7XG4gIC8vIEF1c3RyYWxpYVxuICBkcmF3Q29udGluZW50KFtcbiAgICBbMTQ5MCwgNTc1XSxcbiAgICBbMTY3NSwgNTcwXSxcbiAgICBbMTcxMCwgNjg1XSxcbiAgICBbMTU2MCwgNzE1XSxcbiAgICBbMTQ3MCwgNjUwXSxcbiAgXSk7XG5cbiAgLy8gR2xvd2luZyBpbnRlcmNvbnRpbmVudGFsIHRlbGVtZXRyeSBhcmNzXG4gIGNvbnN0IGFyY3M6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdW10gPSBbXG4gICAgWzQ2MCwgMzIwLCAxMDI0LCA0MzBdLFxuICAgIFs1OTAsIDYxMCwgMTAyNCwgNDMwXSxcbiAgICBbMTAyNCwgNDMwLCAxNDgwLCAzNTBdLFxuICAgIFsxMDI0LCA0MzAsIDE1OTAsIDY0MF0sXG4gICAgWzQ2MCwgMzIwLCA5ODAsIDI5MF0sXG4gIF07XG4gIGFyY3MuZm9yRWFjaCgoW3gxLCB5MSwgeDIsIHkyXSkgPT4ge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHgxLCB5MSk7XG4gICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oKHgxICsgeDIpIC8gMiwgTWF0aC5taW4oeTEsIHkyKSAtIDkwLCB4MiwgeTIpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDM0LCAyMTEsIDIzOCwgMC41NSknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfSk7XG5cbiAgLy8gQ2VudHJhbCBjb25jZW50cmljIGhvbG9ncmFwaGljIGVtaXR0ZXIgcmluZ3MgKG1hdGNoaW5nIFpkai4gMiBjZW50cmFsIGNpdHkgYmFzZSlcbiAgY29uc3QgZW1pdHRlclJpbmdzID0gWzExMCwgMTY1LCAyMjUsIDI5NSwgMzcwLCA0MzBdO1xuICBlbWl0dGVyUmluZ3MuZm9yRWFjaCgociwgaWR4KSA9PiB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoMTAyNCwgNDMwLCByLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID1cbiAgICAgIGlkeCAlIDIgPT09IDBcbiAgICAgICAgPyAncmdiYSgwLCAyNDAsIDI1NSwgMC43MiknXG4gICAgICAgIDogJ3JnYmEoMTg2LCAyMzAsIDI1MywgMC40NSknO1xuICAgIGN0eC5saW5lV2lkdGggPSBpZHggPT09IDIgPyA0IDogMjtcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH0pO1xuXG4gIC8vIExlZnQgRm9yZWdyb3VuZCBcIkdMT0JBTCBORVRXT1JLXCIgVGVsZW1ldHJ5IFBhbmVsIG9uIFRhYmxldG9wIChleGFjdCBtYXRjaCB0byBaZGouIDIpXG4gIGNvbnN0IGduWCA9IDQ4O1xuICBjb25zdCBnblkgPSA0NzA7XG4gIGNvbnN0IGduVyA9IDM2MDtcbiAgY29uc3QgZ25IID0gMzM1O1xuICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoNCwgMTYsIDMyLCAwLjg4KSc7XG4gIGN0eC5maWxsUmVjdChnblgsIGduWSwgZ25XLCBnbkgpO1xuICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSg1NiwgMTg5LCAyNDgsIDAuODUpJztcbiAgY3R4LmxpbmVXaWR0aCA9IDIuNTtcbiAgY3R4LnN0cm9rZVJlY3QoZ25YLCBnblksIGduVywgZ25IKTtcblxuICBjdHguZmlsbFN0eWxlID0gJyNlMGYyZmUnO1xuICBjdHguZm9udCA9ICc3MDAgMjJweCBcIk91dGZpdFwiLCBzYW5zLXNlcmlmJztcbiAgY3R4LmZpbGxUZXh0KCdHTE9CQUwgTkVUV09SSycsIGduWCArIDIwLCBnblkgKyAzNik7XG5cbiAgY29uc3QgZ25Sb3dzOiBbc3RyaW5nLCBzdHJpbmddW10gPSBbXG4gICAgWydUb3RhbCBBc3NldHMnLCAnJCAxMi40OCBCJ10sXG4gICAgWydBY3RpdmUgUHJvamVjdHMnLCAnMjQ3J10sXG4gICAgWydHbG9iYWwgT2ZmaWNlcycsICczNiddLFxuICAgIFsnVGVhbSBNZW1iZXJzJywgJzEsMjg0J10sXG4gIF07XG4gIGduUm93cy5mb3JFYWNoKChbbGFiZWwsIHZhbF0sIHJJZHgpID0+IHtcbiAgICBjb25zdCByeSA9IGduWSArIDc0ICsgcklkeCAqIDM4O1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4yNSknO1xuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKGduWCArIDE4LCByeSArIDEwKTtcbiAgICBjdHgubGluZVRvKGduWCArIGduVyAtIDE4LCByeSArIDEwKTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gJyM5M2M1ZmQnO1xuICAgIGN0eC5mb250ID0gJzUwMCAxN3B4IFwiUGx1cyBKYWthcnRhIFNhbnNcIiwgc2Fucy1zZXJpZic7XG4gICAgY3R4LmZpbGxUZXh0KGxhYmVsLCBnblggKyAyMCwgcnkpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICBjdHguZm9udCA9ICc3MDAgMTlweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgY3R4LmZpbGxUZXh0KHZhbCwgZ25YICsgMjI1LCByeSk7XG4gIH0pO1xuXG4gIC8vIDMgQ2lyY3VsYXIgR2F1Z2VzICg3MiUsIDQ2JSwgMTYlKSBpbnNpZGUgR0xPQkFMIE5FVFdPUksgcGFuZWxcbiAgY29uc3QgZ25HYXVnZXMgPSBbXG4gICAgeyBwY3Q6ICc3MiUnLCBzdWI6ICc3MiUnLCBhbmdsZTogMC43MiAqIE1hdGguUEkgKiAyIH0sXG4gICAgeyBwY3Q6ICc0NiUnLCBzdWI6ICc0NiUnLCBhbmdsZTogMC40NiAqIE1hdGguUEkgKiAyIH0sXG4gICAgeyBwY3Q6ICcxNiUnLCBzdWI6ICc5MyUnLCBhbmdsZTogMC44MiAqIE1hdGguUEkgKiAyIH0sXG4gIF07XG4gIGduR2F1Z2VzLmZvckVhY2goKGcsIGdJZHgpID0+IHtcbiAgICBjb25zdCBneCA9IGduWCArIDY4ICsgZ0lkeCAqIDExMDtcbiAgICBjb25zdCBneSA9IGduWSArIDI1ODtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhneCwgZ3ksIDMwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjI1KSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDU7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoZ3gsIGd5LCAzMCwgLU1hdGguUEkgLyAyLCAtTWF0aC5QSSAvIDIgKyBnLmFuZ2xlKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzM4YmRmOCc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDU7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjZjhmYWZjJztcbiAgICBjdHguZm9udCA9ICc3MDAgMTZweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgY3R4LmZpbGxUZXh0KGcucGN0LCBneCAtIDE4LCBneSArIDYpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMzhiZGY4JztcbiAgICBjdHguZm9udCA9ICc3MDAgMThweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgY3R4LmZpbGxUZXh0KGcuc3ViLCBneCAtIDIwLCBneSArIDU4KTtcbiAgfSk7XG5cbiAgLy8gQm90dG9tIFRhYmxldG9wIFRlbGVtZXRyeSBTdHJpcCAobWF0Y2hpbmcgdGhlIDUgbG93ZXIgcGFuZWxzIG9uIHRoZSB0YWJsZSBlZGdlKVxuICBjb25zdCBzdHJpcFkgPSA4MjU7XG4gIGNvbnN0IHN0cmlwSCA9IDE2NTtcbiAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDQsIDE1LCAyOCwgMC45MiknO1xuICBjdHguZmlsbFJlY3QoNjAsIHN0cmlwWSwgMTkyOCwgc3RyaXBIKTtcbiAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjY1KSc7XG4gIGN0eC5saW5lV2lkdGggPSAyO1xuICBjdHguc3Ryb2tlUmVjdCg2MCwgc3RyaXBZLCAxOTI4LCBzdHJpcEgpO1xuXG4gIGNvbnN0IG1vZHVsZXMgPSBbXG4gICAgeyB0aXRsZTogJ0dMT0JBTCBORVRXT1JLIENPUkUnLCBtZXRyaWNzOiBbJyQxMi40OEInLCAnMjQ3IFBST0onXSB9LFxuICAgIHsgdGl0bGU6ICdNRVRST1BPTElTIFNLWUxJTkUgQklNJywgbWV0cmljczogWycxLDI4NCcsICc5MyUgU1lOQyddIH0sXG4gICAgeyB0aXRsZTogJ1JFR0lPTkFMIEFOQUxZVElDUycsIG1ldHJpY3M6IFsnNzIlJywgJzQ2JScsICc5MyUnXSB9LFxuICAgIHsgdGl0bGU6ICdTVVNUQUlOQUJMRSBGVVRVUkUnLCBtZXRyaWNzOiBbJ0NPMiAtNDAlJywgJzcyJSBFRkYnXSB9LFxuICAgIHsgdGl0bGU6ICdBSSBJTlNJR0hUUyBURUxFTUVUUlknLCBtZXRyaWNzOiBbJ0FSS2l0IDYnLCAnQVJDb3JlJ10gfSxcbiAgXTtcblxuICBjb25zdCBtb2RXID0gMTkyOCAvIG1vZHVsZXMubGVuZ3RoO1xuICBtb2R1bGVzLmZvckVhY2goKG1vZCwgaWR4KSA9PiB7XG4gICAgY29uc3QgbXggPSA2MCArIGlkeCAqIG1vZFc7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjM1KSc7XG4gICAgY3R4LnN0cm9rZVJlY3QobXggKyA4LCBzdHJpcFkgKyA4LCBtb2RXIC0gMTYsIHN0cmlwSCAtIDE2KTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSAnIzM4YmRmOCc7XG4gICAgY3R4LmZvbnQgPSAnNjAwIDE4cHggXCJQbHVzIEpha2FydGEgU2Fuc1wiLCBzYW5zLXNlcmlmJztcbiAgICBjdHguZmlsbFRleHQobW9kLnRpdGxlLCBteCArIDI0LCBzdHJpcFkgKyAzNik7XG5cbiAgICAvLyBEcmF3IGNpcmN1bGFyIGdhdWdlIG9yIGJhciBjaGFydCBpbnNpZGUgZWFjaCBtb2R1bGVcbiAgICBpZiAoaWR4ID09PSAyIHx8IGlkeCA9PT0gMykge1xuICAgICAgbW9kLm1ldHJpY3MuZm9yRWFjaCgobSwgZ0lkeCkgPT4ge1xuICAgICAgICBjb25zdCBjeCA9IG14ICsgNzUgKyBnSWR4ICogMTA1O1xuICAgICAgICBjb25zdCBjeSA9IHN0cmlwWSArIDEwMjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKGN4LCBjeSwgMzIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjMpJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoY3gsIGN5LCAzMiwgLU1hdGguUEkgLyAyLCBNYXRoLlBJICogMC44NSk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGdJZHggPT09IDEgPyAnI2ZiYmYyNCcgOiAnIzIyZDNlZSc7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSA1O1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZjhmYWZjJztcbiAgICAgICAgY3R4LmZvbnQgPSAnNjAwIDE2cHggXCJKZXRCcmFpbnMgTW9ub1wiLCBtb25vc3BhY2UnO1xuICAgICAgICBjdHguZmlsbFRleHQobSwgY3ggLSAyMCwgY3kgKyA2KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBCYXIgd2F2ZWZvcm1cbiAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgMjQ7IGIrKykge1xuICAgICAgICBjb25zdCBiaCA9IDE4ICsgKChiICogMTkgKyBpZHggKiAxMykgJSA2OCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBiICUgNSA9PT0gMCA/ICcjZmJiZjI0JyA6ICdyZ2JhKDM0LCAyMTEsIDIzOCwgMC43NSknO1xuICAgICAgICBjdHguZmlsbFJlY3QobXggKyAyNiArIGIgKiAxMywgc3RyaXBZICsgMTQwIC0gYmgsIDgsIGJoKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICB0ZXh0dXJlLmNvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgdGV4dHVyZS5hbmlzb3Ryb3B5ID0gbWF4QW5pc290cm9weTtcbiAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIHJldHVybiB0ZXh0dXJlO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyB0aGUgQVJLaXQgLyBBUkNvcmUgRGVwdGggU2Vuc29yIFN1cmZhY2UgUGxhbmUgRGV0ZWN0aW9uIE1lc2ggdGV4dHVyZVxuICogZm9yIGJvdGggVGFibGV0b3AgYW5kIEZsb29yIHBsYW5lIG92ZXJsYXlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGlEQVJQbGFuZUdyaWRUZXh0dXJlKFxuICBtYXhBbmlzb3Ryb3B5OiBudW1iZXIsXG4gIGlzVGFibGV0b3A6IGJvb2xlYW5cbik6IFRIUkVFLkNhbnZhc1RleHR1cmUge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY2FudmFzLndpZHRoID0gMTAyNDtcbiAgY2FudmFzLmhlaWdodCA9IDEwMjQ7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcblxuICBjdHguY2xlYXJSZWN0KDAsIDAsIDEwMjQsIDEwMjQpO1xuXG4gIGNvbnN0IHByaW1hcnlDb2xvciA9IGlzVGFibGV0b3BcbiAgICA/ICdyZ2JhKDM0LCAyMTEsIDIzOCwgMC41NSknXG4gICAgOiAncmdiYSgyNTEsIDE5MSwgMzYsIDAuMzgpJztcbiAgY29uc3Qgbm9kZUNvbG9yID0gaXNUYWJsZXRvcFxuICAgID8gJ3JnYmEoMTY1LCAyNDMsIDI1MiwgMC45KSdcbiAgICA6ICdyZ2JhKDI1MywgMjI0LCA3MSwgMC43NSknO1xuXG4gIC8vIERyYXcgdHJpYW5ndWxhdGVkIC8gaGV4YWdvbmFsIExpREFSIHNlbnNvciBtZXNoXG4gIGNvbnN0IHN0ZXAgPSA2NDtcbiAgY3R4LnN0cm9rZVN0eWxlID0gcHJpbWFyeUNvbG9yO1xuICBjdHgubGluZVdpZHRoID0gMS41O1xuXG4gIGZvciAobGV0IHkgPSAwOyB5IDw9IDEwMjQ7IHkgKz0gc3RlcCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDAsIHkpO1xuICAgIGN0eC5saW5lVG8oMTAyNCwgeSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgZm9yIChsZXQgeCA9IDA7IHggPD0gMTAyNDsgeCArPSBzdGVwKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oeCwgMCk7XG4gICAgY3R4LmxpbmVUbyh4LCAxMDI0KTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBEaWFnb25hbCB0cmlhbmd1bGF0aW9uIGxpbmVzIGNoYXJhY3RlcmlzdGljIG9mIEFSUGxhbmVNZXNoVmlzdWFsaXplclxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHgsIDApO1xuICAgIGN0eC5saW5lVG8oMCwgeCk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9XG5cbiAgLy8gTGlEQVIgZmVhdHVyZSBwb2ludHMgYXQgaW50ZXJzZWN0aW9uc1xuICBmb3IgKGxldCB5ID0gc3RlcDsgeSA8IDEwMjQ7IHkgKz0gc3RlcCkge1xuICAgIGZvciAobGV0IHggPSBzdGVwOyB4IDwgMTAyNDsgeCArPSBzdGVwKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gbm9kZUNvbG9yO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyh4LCB5LCAyLjgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgIC8vIENyb3NzaGFpciB0aWNrcyBldmVyeSA0IGNlbGxzXG4gICAgICBpZiAoKHggLyBzdGVwKSAlIDQgPT09IDAgJiYgKHkgLyBzdGVwKSAlIDQgPT09IDApIHtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbm9kZUNvbG9yO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKHggLSAxMCwgeSk7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIDEwLCB5KTtcbiAgICAgICAgY3R4Lm1vdmVUbyh4LCB5IC0gMTApO1xuICAgICAgICBjdHgubGluZVRvKHgsIHkgKyAxMCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBPdXRlciBBUiBQbGFuZSBib3VuZGFyeSBmcmFtZVxuICBjdHguc3Ryb2tlU3R5bGUgPSBub2RlQ29sb3I7XG4gIGN0eC5saW5lV2lkdGggPSA2O1xuICBjdHguc3Ryb2tlUmVjdCg4LCA4LCAxMDA4LCAxMDA4KTtcblxuICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgdGV4dHVyZS5jb2xvclNwYWNlID0gVEhSRUUuU1JHQkNvbG9yU3BhY2U7XG4gIHRleHR1cmUud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZztcbiAgdGV4dHVyZS53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nO1xuICB0ZXh0dXJlLmFuaXNvdHJvcHkgPSBtYXhBbmlzb3Ryb3B5O1xuICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgcmV0dXJuIHRleHR1cmU7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHRoZSBhcmNoaXRlY3R1cmFsIGRpYWdyaWQgZXhvc2tlbGV0b24gJiBCSU0gZmxvb3Itc2xhYiBmYWNhZGUgdGV4dHVyZVxuICogZm9yIHRoZSBob2xvZ3JhcGhpYyBza3lzY3JhcGVycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpYWdyaWRGYWNhZGVUZXh0dXJlKFxuICBtYXhBbmlzb3Ryb3B5OiBudW1iZXIsXG4gIHN0eWxlOiBIb2xvZ3JhbVN0eWxlT3B0aW9uXG4pOiBUSFJFRS5DYW52YXNUZXh0dXJlIHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGNhbnZhcy53aWR0aCA9IDUxMjtcbiAgY2FudmFzLmhlaWdodCA9IDEwMjQ7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcblxuICBjdHguY2xlYXJSZWN0KDAsIDAsIDUxMiwgMTAyNCk7XG5cbiAgY29uc3QgaXNHb2xkID0gc3R5bGUgPT09ICdaxYJvdG8tQsWCxJlraXRuYSBNYXRyeWNhIFNvbGFybmEnO1xuICBjb25zdCBpc1B1cmVDeWFuID0gc3R5bGUgPT09ICdXb2x1bWV0cnljem5hIFNpYXRrYSBDeWphbm93YSc7XG5cbiAgY29uc3QgbWFpblN0cm9rZSA9IGlzR29sZFxuICAgID8gJ3JnYmEoMjUxLCAxOTEsIDM2LCAwLjkyKSdcbiAgICA6ICdyZ2JhKDM0LCAyMTEsIDIzOCwgMC45MiknO1xuICBjb25zdCBzZWNvbmRhcnlTdHJva2UgPSBpc1B1cmVDeWFuXG4gICAgPyAncmdiYSg1NiwgMTg5LCAyNDgsIDAuNjUpJ1xuICAgIDogJ3JnYmEoMjUzLCAyMjQsIDcxLCAwLjY4KSc7XG5cbiAgLy8gU3VidGxlIHRyYW5zbHVjZW50IGdsYXNzIGdsb3dcbiAgY3R4LmZpbGxTdHlsZSA9IGlzR29sZFxuICAgID8gJ3JnYmEoMjQ1LCAxNTgsIDExLCAwLjA4KSdcbiAgICA6ICdyZ2JhKDE0LCAxNjUsIDIzMywgMC4wOSknO1xuICBjdHguZmlsbFJlY3QoMCwgMCwgNTEyLCAxMDI0KTtcblxuICAvLyBIb3Jpem9udGFsIEJJTSBmbG9vciBzbGFicyAoMzIgZmxvb3JzIHBlciB0ZXh0dXJlIHJlcGVhdClcbiAgZm9yIChsZXQgeSA9IDA7IHkgPD0gMTAyNDsgeSArPSAzMikge1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IHkgJSAxMjggPT09IDAgPyBtYWluU3Ryb2tlIDogJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjM4KSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHkgJSAxMjggPT09IDAgPyAzLjUgOiAxLjU7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oMCwgeSk7XG4gICAgY3R4LmxpbmVUbyg1MTIsIHkpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIC8vIFZlcnRpY2FsIHN0cnVjdHVyYWwgY29sdW1ucyAmIG11bGxpb25zXG4gIGZvciAobGV0IHggPSAwOyB4IDw9IDUxMjsgeCArPSAzMikge1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IHggJSAxMjggPT09IDAgPyBtYWluU3Ryb2tlIDogJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjI1KSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IHggJSAxMjggPT09IDAgPyAzIDogMTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyh4LCAwKTtcbiAgICBjdHgubGluZVRvKHgsIDEwMjQpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIC8vIFBhcmFtZXRyaWMgRGlhZ3JpZCBFeG9za2VsZXRvbiBjcm9zcy1icmFjaW5nXG4gIGN0eC5zdHJva2VTdHlsZSA9IHNlY29uZGFyeVN0cm9rZTtcbiAgY3R4LmxpbmVXaWR0aCA9IDQuNTtcbiAgY29uc3QgZGlhZ1N0ZXAgPSAxMjg7XG4gIGZvciAobGV0IHkgPSAtNTEyOyB5IDw9IDEwMjQ7IHkgKz0gZGlhZ1N0ZXApIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygwLCB5KTtcbiAgICBjdHgubGluZVRvKDUxMiwgeSArIDUxMik7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oNTEyLCB5KTtcbiAgICBjdHgubGluZVRvKDAsIHkgKyA1MTIpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfVxuXG4gIC8vIEdsb3dpbmcgc3RydWN0dXJhbCBub2RlcyBhdCBkaWFncmlkIGludGVyc2VjdGlvbnNcbiAgZm9yIChsZXQgeSA9IDA7IHkgPD0gMTAyNDsgeSArPSA2NCkge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDw9IDUxMjsgeCArPSA2NCkge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMoeCwgeSwgMy4yLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICB0ZXh0dXJlLmNvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgdGV4dHVyZS53cmFwUyA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nO1xuICB0ZXh0dXJlLndyYXBUID0gVEhSRUUuUmVwZWF0V3JhcHBpbmc7XG4gIHRleHR1cmUuYW5pc290cm9weSA9IG1heEFuaXNvdHJvcHk7XG4gIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICByZXR1cm4gdGV4dHVyZTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgdG8gZHJhdyBhIHJvdW5kZWQgcmVjdGFuZ2xlIHBhdGggb24gQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gKi9cbmZ1bmN0aW9uIGRyYXdSb3VuZGVkUmVjdFBhdGgoXG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbiAgdzogbnVtYmVyLFxuICBoOiBudW1iZXIsXG4gIHI6IG51bWJlclxuKSB7XG4gIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKHIsIHcgLyAyLCBoIC8gMik7XG4gIGN0eC5iZWdpblBhdGgoKTtcbiAgY3R4Lm1vdmVUbyh4ICsgcmFkaXVzLCB5KTtcbiAgY3R4LmxpbmVUbyh4ICsgdyAtIHJhZGl1cywgeSk7XG4gIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3LCB5LCB4ICsgdywgeSArIHJhZGl1cyk7XG4gIGN0eC5saW5lVG8oeCArIHcsIHkgKyBoIC0gcmFkaXVzKTtcbiAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCArIHcsIHkgKyBoLCB4ICsgdyAtIHJhZGl1cywgeSArIGgpO1xuICBjdHgubGluZVRvKHggKyByYWRpdXMsIHkgKyBoKTtcbiAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSArIGgsIHgsIHkgKyBoIC0gcmFkaXVzKTtcbiAgY3R4LmxpbmVUbyh4LCB5ICsgcmFkaXVzKTtcbiAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cywgeSk7XG4gIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgdGV4dHVyZXMgZm9yIHRoZSBmbG9hdGluZyAzRCBzY3JlZW5zOlxuICogLSAnU3prbGFueSBQYW5lbCBJbnRlcmFrdHl3bnkgKEZyb3N0ZWQgR2xhc3MgVUkpJzogTWF0Y2hlcyB0aGUgYXR0YWNoZWQgZnJvc3RlZCBsYXZlbmRlci13aGl0ZSBnbGFzcyBjYXJkXG4gKiAgIHdpdGggcm91bmRlZCB3aGl0ZSBzcGVjdWxhciBib3JkZXIsIGJvbGQgaW5kaWdvLXZpb2xldCBcIk1ha2UgSXQgUG9wIVwiIHR5cG9ncmFwaHksIGRpYWdvbmFsIOKGlyBhcnJvdyxcbiAqICAgYW5kIGJvdHRvbSByb3VuZGVkIGRvY2sgYmFyIGNvbnRhaW5pbmcgNCBjaXJjdWxhciBpY29uIGJ1dHRvbnMgKEhvbWUsIFNwZWMgTm90ZSwgTW9kdWxlIENhcCwgQ2FydC9FeHBvcnQpLlxuICogLSAnSG9sb2dyYW0gVGVjaG5pY3pueSBDQUQgKENpZW1ueSBDeWphbiknOiBEYXJrIGN5YW4gdGVjaG5pY2FsIENBRCBIVUQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGbG9hdGluZ0h1ZFRleHR1cmUoXG4gIG1heEFuaXNvdHJvcHk6IG51bWJlcixcbiAgcGFuZWxUeXBlOiBIdWRQYW5lbFR5cGUsXG4gIHNjcmVlblN0eWxlOiBIdWRTY3JlZW5TdHlsZU9wdGlvbiA9ICdTemtsYW55IFBhbmVsIEludGVyYWt0eXdueSAoRnJvc3RlZCBHbGFzcyBVSSknLFxuICBhY3RpdmVJY29uSW5kZXg6IG51bWJlciA9IDBcbik6IFRIUkVFLkNhbnZhc1RleHR1cmUge1xuICAvLyBPcHRpb24gMDogWmRqLiAyIOKAlCBcIkhvbG9ncmFteSBHbG9iYWwgTmV0d29yayAoWmRqLiAyIMK3IFRlbGVtZXRyaWEgJiBNYXBhKVwiXG4gIC8vIE1hdGNoZXMgdGhlIHRyYW5zbHVjZW50IGN5YW4tZ2xhc3MgaG9sb2dyYXBoaWMgc2NyZWVucyBmbG9hdGluZyBhY3Jvc3MgdGhlIGJvYXJkcm9vbSBpbiB6ZGouXzIucG5nXG4gIGlmIChzY3JlZW5TdHlsZSA9PT0gJ0hvbG9ncmFteSBHbG9iYWwgTmV0d29yayAoWmRqLiAyIMK3IFRlbGVtZXRyaWEgJiBNYXBhKScpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSA4ODA7XG4gICAgY2FudmFzLmhlaWdodCA9IDU2MDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA4ODAsIDU2MCk7XG5cbiAgICAvLyBUcmFuc2x1Y2VudCBjeWFuLXNhcHBoaXJlIGdsYXNzIGNhcmQgd2l0aCByb3VuZGVkIGNvcm5lcnMgJiBnbG93aW5nIGRvdWJsZSBib3JkZXJcbiAgICBkcmF3Um91bmRlZFJlY3RQYXRoKGN0eCwgMTQsIDE0LCA4NTIsIDUzMiwgMjIpO1xuICAgIGNvbnN0IGJnR3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgxNCwgMTQsIDg2NiwgNTQ2KTtcbiAgICBiZ0dyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDgsIDM2LCA2OCwgMC43NiknKTtcbiAgICBiZ0dyYWQuYWRkQ29sb3JTdG9wKDAuNSwgJ3JnYmEoNiwgMjUsIDQ4LCAwLjY4KScpO1xuICAgIGJnR3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoNCwgMTgsIDM4LCAwLjc4KScpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBiZ0dyYWQ7XG4gICAgY3R4LmZpbGwoKTtcblxuICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC45MiknO1xuICAgIGN0eC5saW5lV2lkdGggPSAzLjU7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgZHJhd1JvdW5kZWRSZWN0UGF0aChjdHgsIDI0LCAyNCwgODMyLCA1MTIsIDE2KTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgxODYsIDIzMCwgMjUzLCAwLjMyKSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBUb3AgSGVhZGVyIEJhclxuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgxNCwgMTY1LCAyMzMsIDAuMjQpJztcbiAgICBjdHguZmlsbFJlY3QoMjYsIDI2LCA4MjgsIDUyKTtcblxuICAgIGNvbnN0IGhlYWRlclRpdGxlczogUmVjb3JkPEh1ZFBhbmVsVHlwZSwgc3RyaW5nPiA9IHtcbiAgICAgIHByaXNtOiAnR0xPQkFMIE5FVFdPUksgIMK3ICBHTE9CQUwgSU5URUxMSUdFTkNFJyxcbiAgICAgIHR1cmJpbmU6ICdSRUdJT05BTCBBTkFMWVRJQ1MgIMK3ICBXT1JMRCBESVNUUklCVVRJT04nLFxuICAgICAgY29yZTogJ1BST0pFQ1QgT1ZFUlZJRVcgIMK3ICBTS1lMSU5FIE1FVFJJQ1MnLFxuICAgICAgYmlvc3BoZXJlOiAnU1VTVEFJTkFCTEUgRlVUVVJFICDCtyAgR0xPQkFMIE9QRVJBVElPTlMnLFxuICAgICAgbmV1cmFsOiAnQUkgSU5TSUdIVFMgIMK3ICBQUk9KRUNUIEhPUklaT05TIE1BVFJJWCcsXG4gICAgfTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSAnI2YwZjlmZic7XG4gICAgY3R4LmZvbnQgPSAnNzAwIDIycHggXCJPdXRmaXRcIiwgc2Fucy1zZXJpZic7XG4gICAgY3R4LmZpbGxUZXh0KGhlYWRlclRpdGxlc1twYW5lbFR5cGVdLCA0NCwgNjApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMzhiZGY4JztcbiAgICBjdHguZm9udCA9ICc2MDAgMTVweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgY3R4LmZpbGxUZXh0KGBDSC0wJHsoYWN0aXZlSWNvbkluZGV4ICUgNCkgKyAxfSBMSVZFYCwgNzQwLCA1OCk7XG5cbiAgICBpZiAocGFuZWxUeXBlID09PSAncHJpc20nKSB7XG4gICAgICAvLyBMZWZ0IHNpZGU6IDNEIEhvbG9ncmFwaGljIFNreXNjcmFwZXIgQmFyIENoYXJ0IChsaWtlIFwiR0xPQkFMIE5FVFdPUktcIiBzY3JlZW4gb24gbGVmdCBvZiB6ZGouXzIucG5nKVxuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjM1KSc7XG4gICAgICBjdHguc3Ryb2tlUmVjdCg0MiwgOTYsIDM3MCwgMzQ1KTtcbiAgICAgIGNvbnN0IHRvd2VySGVpZ2h0cyA9IFsxNDAsIDIxMCwgMjg1LCAxOTUsIDI1MCwgMTY1LCAyMzAsIDEzMF07XG4gICAgICB0b3dlckhlaWdodHMuZm9yRWFjaCgodGgsIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBieCA9IDY2ICsgaWR4ICogNDE7XG4gICAgICAgIGNvbnN0IGJ5ID0gNDE1IC0gdGg7XG4gICAgICAgIGNvbnN0IHRHcmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KGJ4LCBieSwgYngsIDQxNSk7XG4gICAgICAgIHRHcmFkLmFkZENvbG9yU3RvcCgwLCAncmdiYSgxODYsIDIzMCwgMjUzLCAwLjk1KScpO1xuICAgICAgICB0R3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMTQsIDE2NSwgMjMzLCAwLjI4KScpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdEdyYWQ7XG4gICAgICAgIGN0eC5maWxsUmVjdChieCwgYnksIDI2LCB0aCk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjN2RkM2ZjJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoYngsIGJ5LCAyNiwgdGgpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJpZ2h0IHNpZGU6IFwiR0xPQkFMIElOVEVMTElHRU5DRVwiIFdvcmxkIE1hcCArIFdpcmVmcmFtZSBHbG9iZSArIENhdGVnb3J5IExpc3RcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4zNSknO1xuICAgICAgY3R4LnN0cm9rZVJlY3QoNDMwLCA5NiwgNDA4LCAzNDUpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjYmFlNmZkJztcbiAgICAgIGN0eC5mb250ID0gJzYwMCAxN3B4IFwiUGx1cyBKYWthcnRhIFNhbnNcIiwgc2Fucy1zZXJpZic7XG4gICAgICBjb25zdCBjYXRzID0gW1xuICAgICAgICAn4oCiIE5leHQtR2VuIEJJTSBDb3JlJyxcbiAgICAgICAgJ+KAoiBHbG9iYWwgRGF0YSBNZXNoJyxcbiAgICAgICAgJ+KAoiBNaWNyb2RhdGEgTm9kZXMnLFxuICAgICAgICAn4oCiIFNtYXJ0IFRlY2hub2xvZ3knLFxuICAgICAgICAn4oCiIExvZ2lzdGljcyAmIEZsb3cnLFxuICAgICAgXTtcbiAgICAgIGNhdHMuZm9yRWFjaCgoYywgaSkgPT4ge1xuICAgICAgICBjdHguZmlsbFRleHQoYywgNDQ4LCAxMzYgKyBpICogMzQpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFdpcmVmcmFtZSBHbG9iZSBvbiByaWdodFxuICAgICAgY29uc3QgZ3ggPSA3NDU7XG4gICAgICBjb25zdCBneSA9IDIxNTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjMzhiZGY4JztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhneCwgZ3ksIDY0LCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBmb3IgKGxldCByeCA9IDIwOyByeCA8PSA1MDsgcnggKz0gMTUpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguZWxsaXBzZShneCwgZ3ksIHJ4LCA2NCwgMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgICAvLyBCb3R0b20gd2F2ZWZvcm0gaW5zaWRlIHJpZ2h0IGJveFxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgZm9yIChsZXQgeCA9IDQ0ODsgeCA8PSA4MTY7IHggKz0gMTYpIHtcbiAgICAgICAgY29uc3Qgd3kgPSAzOTUgLSBNYXRoLnNpbih4ICogMC4wNSArIGFjdGl2ZUljb25JbmRleCkgKiAyNCAtICgoeCAqIDcpICUgMjgpO1xuICAgICAgICBpZiAoeCA9PT0gNDQ4KSBjdHgubW92ZVRvKHgsIHd5KTtcbiAgICAgICAgZWxzZSBjdHgubGluZVRvKHgsIHd5KTtcbiAgICAgIH1cbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjMjJkM2VlJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAyLjU7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSBlbHNlIGlmIChwYW5lbFR5cGUgPT09ICd0dXJiaW5lJykge1xuICAgICAgLy8gVG9wLUxlZnQgU2NyZWVuIGluIHpkai5fMi5wbmc6IFJvdGF0aW5nIFdpcmVmcmFtZSBHbG9iZSArIFJlZ2lvbmFsIEJyZWFrZG93biBUYWJsZSArIEFyZWEgR3JhcGhcbiAgICAgIGNvbnN0IGd4ID0gMTU1O1xuICAgICAgY29uc3QgZ3kgPSAyNTU7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzM4YmRmOCc7XG4gICAgICBjdHgubGluZVdpZHRoID0gMi41O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhneCwgZ3ksIDkyLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBmb3IgKGxldCByID0gMjg7IHIgPD0gNzg7IHIgKz0gMjUpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguZWxsaXBzZShneCwgZ3ksIHIsIDkyLCAwLjIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5lbGxpcHNlKGd4LCBneSwgOTIsIHIsIDAuMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlZ2lvbnM6IFtzdHJpbmcsIHN0cmluZ11bXSA9IFtcbiAgICAgICAgWydTb3V0aCBBbWVyaWNhJywgJzI3JSddLFxuICAgICAgICBbJ0V1cm9wZScsICcyOCUnXSxcbiAgICAgICAgWydBc2lhIFBhY2lmaWMnLCAnMzclJ10sXG4gICAgICAgIFsnTm9ydGggQW1lcmljYScsICcyNSUnXSxcbiAgICAgICAgWydNaWRkbGUgRWFzdCAmIEFmcmljYScsICc2JSddLFxuICAgICAgXTtcbiAgICAgIHJlZ2lvbnMuZm9yRWFjaCgoW3JOYW1lLCByUGN0XSwgaWR4KSA9PiB7XG4gICAgICAgIGNvbnN0IHJ5ID0gMTQ4ICsgaWR4ICogNDg7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2UwZjJmZSc7XG4gICAgICAgIGN0eC5mb250ID0gJzUwMCAyMHB4IFwiUGx1cyBKYWthcnRhIFNhbnNcIiwgc2Fucy1zZXJpZic7XG4gICAgICAgIGN0eC5maWxsVGV4dChyTmFtZSwgMjkwLCByeSk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnIzM4YmRmOCc7XG4gICAgICAgIGN0eC5mb250ID0gJzcwMCAyMXB4IFwiSmV0QnJhaW5zIE1vbm9cIiwgbW9ub3NwYWNlJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KHJQY3QsIDUzNSwgcnkpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIFJpZ2h0IG1pbmkgYXJlYSBjaGFydFxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyg2MjUsIDM4MCk7XG4gICAgICBmb3IgKGxldCB4ID0gNjI1OyB4IDw9IDgyNTsgeCArPSAyMCkge1xuICAgICAgICBjb25zdCBweSA9IDI3MCAtIE1hdGguc2luKCh4IC0gNjI1KSAqIDAuMDM1KSAqIDU1IC0gKCh4ICogMTMpICUgMzUpO1xuICAgICAgICBjdHgubGluZVRvKHgsIHB5KTtcbiAgICAgIH1cbiAgICAgIGN0eC5saW5lVG8oODI1LCAzODApO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDU2LCAxODksIDI0OCwgMC4zMiknO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjN2RkM2ZjJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAyLjU7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSBlbHNlIGlmIChwYW5lbFR5cGUgPT09ICdjb3JlJykge1xuICAgICAgLy8gQ2VudGVyLVRvcCBTY3JlZW4gaW4gemRqLl8yLnBuZzogXCJQUk9KRUNUIE9WRVJWSUVXXCIgU2t5bGluZSBIaXN0b2dyYW0gKyBNZXRyaWNzIFRhYmxlXG4gICAgICBmb3IgKGxldCBiID0gMDsgYiA8IDIyOyBiKyspIHtcbiAgICAgICAgY29uc3QgYmggPSA0NSArICgoYiAqIDM3ICsgMTkpICUgMjEwKTtcbiAgICAgICAgY29uc3QgYnggPSA1MiArIGIgKiAxODtcbiAgICAgICAgY29uc3QgYnkgPSAzOTUgLSBiaDtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGIgJSAzID09PSAwID8gJyNiYWU2ZmQnIDogJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjcyKSc7XG4gICAgICAgIGN0eC5maWxsUmVjdChieCwgYnksIDEyLCBiaCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb2pSb3dzOiBbc3RyaW5nLCBzdHJpbmddW10gPSBbXG4gICAgICAgIFsnRWxldmF0aW9uIFNwaXJlJywgJzU1NiddLFxuICAgICAgICBbJ0NlbnRyYWwgTmV4dXMnLCAnNTE2J10sXG4gICAgICAgIFsnSGlnaCBGdWxscm9vZicsICcxMTgnXSxcbiAgICAgICAgWydBY3RpdmUgTm9kZXMnLCAnMjU0J10sXG4gICAgICAgIFsnQ29yZSBDYXBhY2l0eScsICczODgnXSxcbiAgICAgIF07XG4gICAgICBwcm9qUm93cy5mb3JFYWNoKChbbGFiZWwsIHZhbF0sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCByeSA9IDE1MiArIGlkeCAqIDQ4O1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNjYmQ1ZTEnO1xuICAgICAgICBjdHguZm9udCA9ICc1MDAgMjBweCBcIlBsdXMgSmFrYXJ0YSBTYW5zXCIsIHNhbnMtc2VyaWYnO1xuICAgICAgICBjdHguZmlsbFRleHQobGFiZWwsIDQ4NSwgcnkpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgICAgICBjdHguZm9udCA9ICc3MDAgMjJweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgICAgIGN0eC5maWxsVGV4dCh2YWwsIDc0NSwgcnkpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChwYW5lbFR5cGUgPT09ICdiaW9zcGhlcmUnKSB7XG4gICAgICAvLyBSaWdodC1DZW50ZXIgU2NyZWVuIGluIHpkai5fMi5wbmc6IFwiU1VTVEFJTkFCTEUgRlVUVVJFXCIgKENPMiA0MCUsIEVuZXJneSA1MCUsIFdhc3RlIDIwJSwgNzIlIGNpcmNsZSlcbiAgICAgIC8vIEVjbyBDaXJjbGUgKyBMZWFmIG9uIExlZnRcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMoMTU1LCAyMjUsIDcyLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzdkZDNmYyc7XG4gICAgICBjdHgubGluZVdpZHRoID0gMztcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygxMjUsIDI1NSk7XG4gICAgICBjdHgucXVhZHJhdGljQ3VydmVUbygxMzAsIDE4NSwgMTkwLCAxOTApO1xuICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oMTg1LCAyNTAsIDEyNSwgMjU1KTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNmVlN2I3JztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAzLjU7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2Y4ZmFmYyc7XG4gICAgICBjdHguZm9udCA9ICc3MDAgMjZweCBcIk91dGZpdFwiLCBzYW5zLXNlcmlmJztcbiAgICAgIGN0eC5maWxsVGV4dCgnQ0/igoIgICYgIDQwJScsIDI3NSwgMTc1KTtcbiAgICAgIGN0eC5maWxsVGV4dCgnRW5lcmd5ICYgNTAlJywgMjc1LCAyNDApO1xuICAgICAgY3R4LmZpbGxUZXh0KCdXYXN0ZSAgJiAyMCUnLCAyNzUsIDMwNSk7XG5cbiAgICAgIC8vIFJpZ2h0IDcyJSBDaXJjdWxhciBHYXVnZVxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyg2NzUsIDIwNSwgNjgsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDE4NiwgMjMwLCAyNTMsIDAuMzUpJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSA2O1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyg2NzUsIDIwNSwgNjgsIC1NYXRoLlBJIC8gMiwgTWF0aC5QSSAqIDAuOTUpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyMzOGJkZjgnO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDc7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgICAgY3R4LmZvbnQgPSAnNzAwIDI4cHggXCJKZXRCcmFpbnMgTW9ub1wiLCBtb25vc3BhY2UnO1xuICAgICAgY3R4LmZpbGxUZXh0KCc3MiUnLCA2NDIsIDIxNSk7XG5cbiAgICAgIC8vIEJvdHRvbSBtaW5pIGJhciBjaGFydFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGggPSAyNSArICgoaSAqIDIzKSAlIDc1KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjYmFlNmZkJztcbiAgICAgICAgY3R4LmZpbGxSZWN0KDU2NSArIGkgKiAxOCwgNDEwIC0gaCwgMTEsIGgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBGYXItUmlnaHQgU2NyZWVuIGluIHpkai5fMi5wbmc6IFwiQUkgSU5TSUdIVFNcIiAmIDJ4MyBDaXR5IFBlcnNwZWN0aXZlIEdyaWQgKFwiUFJPSkVDVCBIT1JJWk9OU1wiKVxuICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMjsgcm93KyspIHtcbiAgICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgMzsgY29sKyspIHtcbiAgICAgICAgICBjb25zdCBjeCA9IDQ4ICsgY29sICogMjY1O1xuICAgICAgICAgIGNvbnN0IGN5ID0gMTA0ICsgcm93ICogMTYyO1xuICAgICAgICAgIGNvbnN0IGN3ID0gMjQ4O1xuICAgICAgICAgIGNvbnN0IGNoID0gMTQ0O1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSg4LCA0NywgNzMsIDAuNjUpJztcbiAgICAgICAgICBjdHguZmlsbFJlY3QoY3gsIGN5LCBjdywgY2gpO1xuICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjMzhiZGY4JztcbiAgICAgICAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICAgICAgICBjdHguc3Ryb2tlUmVjdChjeCwgY3ksIGN3LCBjaCk7XG5cbiAgICAgICAgICAvLyBQZXJzcGVjdGl2ZSBob3Jpem9uICYgbWluaSBjaXR5IGJhcnMgaW5zaWRlIGVhY2ggZmVlZCBjZWxsXG4gICAgICAgICAgZm9yIChsZXQgYiA9IDA7IGIgPCA5OyBiKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJoID0gMjIgKyAoKGIgKiAxOSArIHJvdyAqIDE3ICsgY29sICogMTEpICUgNzgpO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGIgPT09IDQgPyAnI2UwZjJmZScgOiAncmdiYSg1NiwgMTg5LCAyNDgsIDAuNzUpJztcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChjeCArIDI4ICsgYiAqIDIyLCBjeSArIGNoIC0gMTggLSBiaCwgMTQsIGJoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBCb3R0b20gSW50ZXJhY3RpdmUgNC1CdXR0b24gQmFyIGZvciBjbGlja2luZyBpbiAzRFxuICAgIGNvbnN0IGJ0bkxhYmVscyA9IFsnMDEgT1ZFUlZJRVcnLCAnMDIgQklNIERBVEEnLCAnMDMgVEVMRU1FVFJZJywgJzA0IFNZTkMgQVInXTtcbiAgICBidG5MYWJlbHMuZm9yRWFjaCgobGJsLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IGJ4ID0gNDIgKyBpZHggKiAyMDQ7XG4gICAgICBjb25zdCBieSA9IDQ1NjtcbiAgICAgIGNvbnN0IGlzQWN0ID0gaWR4ID09PSBhY3RpdmVJY29uSW5kZXggJSA0O1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQWN0XG4gICAgICAgID8gJ3JnYmEoMTQsIDE2NSwgMjMzLCAwLjQ1KSdcbiAgICAgICAgOiAncmdiYSgxNSwgMjMsIDQyLCAwLjY1KSc7XG4gICAgICBjdHguZmlsbFJlY3QoYngsIGJ5LCAxODgsIDU0KTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGlzQWN0ID8gJyNlMGYyZmUnIDogJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjQ1KSc7XG4gICAgICBjdHgubGluZVdpZHRoID0gaXNBY3QgPyAyLjUgOiAxLjU7XG4gICAgICBjdHguc3Ryb2tlUmVjdChieCwgYnksIDE4OCwgNTQpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQWN0ID8gJyNmZmZmZmYnIDogJyM3ZGQzZmMnO1xuICAgICAgY3R4LmZvbnQgPSAnNzAwIDE2cHggXCJKZXRCcmFpbnMgTW9ub1wiLCBtb25vc3BhY2UnO1xuICAgICAgY3R4LmZpbGxUZXh0KGxibCwgYnggKyAyNiwgYnkgKyAzMyk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgICB0ZXh0dXJlLmNvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgICB0ZXh0dXJlLmFuaXNvdHJvcHkgPSBtYXhBbmlzb3Ryb3B5O1xuICAgIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgIHJldHVybiB0ZXh0dXJlO1xuICB9XG5cbiAgY29uc3QgaXNVbHRyYUNsZWFyOTggPVxuICAgIHNjcmVlblN0eWxlID09PSAnU3prbGFueSBFa3JhbiBLcnlzdGFsaWN6bnkgKDk4JSBQcnplenJvY3p5c3RvxZtjaSknO1xuXG4gIGlmIChcbiAgICBzY3JlZW5TdHlsZSA9PT0gJ1N6a2xhbnkgUGFuZWwgSW50ZXJha3R5d255IChGcm9zdGVkIEdsYXNzIFVJKScgfHxcbiAgICBpc1VsdHJhQ2xlYXI5OFxuICApIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSA3Njg7XG4gICAgY2FudmFzLmhlaWdodCA9IDg4MDtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCA3NjgsIDg4MCk7XG5cbiAgICBjb25zdCBjYXJkWCA9IDM0O1xuICAgIGNvbnN0IGNhcmRZID0gMjQ7XG4gICAgY29uc3QgY2FyZFcgPSA3MDA7XG4gICAgY29uc3QgY2FyZEggPSA4MzI7XG4gICAgY29uc3QgY2FyZFJhZGl1cyA9IDc0O1xuXG4gICAgLy8gMS4gQ2xpcCB0byBtYWluIHJvdW5kZWQgZ2xhc3MgY2FyZFxuICAgIGN0eC5zYXZlKCk7XG4gICAgZHJhd1JvdW5kZWRSZWN0UGF0aChjdHgsIGNhcmRYLCBjYXJkWSwgY2FyZFcsIGNhcmRILCBjYXJkUmFkaXVzKTtcbiAgICBjdHguY2xpcCgpO1xuXG4gICAgLy8gQmFzZSBnbGFzcyBmaWxsOiBlaXRoZXIgTWlsa3ktTGF2ZW5kZXIgRnJvc3RlZCBHbGFzcyBvciA5OCUgVHJhbnNwYXJlbnQgVWx0cmEtQ2xlYXIgQ3J5c3RhbCBHbGFzcyAoYWxwaGEgPSAwLjAyKVxuICAgIGNvbnN0IGdsYXNzR3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChcbiAgICAgIGNhcmRYLFxuICAgICAgY2FyZFksXG4gICAgICBjYXJkWCArIGNhcmRXLFxuICAgICAgY2FyZFkgKyBjYXJkSFxuICAgICk7XG4gICAgaWYgKGlzVWx0cmFDbGVhcjk4KSB7XG4gICAgICBnbGFzc0dyYWQuYWRkQ29sb3JTdG9wKDAuMCwgJ3JnYmEoMjQ0LCAyNDQsIDI1NSwgMC4wMiknKTtcbiAgICAgIGdsYXNzR3JhZC5hZGRDb2xvclN0b3AoMC40NSwgJ3JnYmEoMjMyLCAyMjksIDI1NCwgMC4wMiknKTtcbiAgICAgIGdsYXNzR3JhZC5hZGRDb2xvclN0b3AoMC44LCAncmdiYSgyMjEsIDIxNywgMjUwLCAwLjAyKScpO1xuICAgICAgZ2xhc3NHcmFkLmFkZENvbG9yU3RvcCgxLjAsICdyZ2JhKDIzNSwgMjMyLCAyNTUsIDAuMDIpJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdsYXNzR3JhZC5hZGRDb2xvclN0b3AoMC4wLCAncmdiYSgyNDQsIDI0NCwgMjU1LCAwLjkyKScpO1xuICAgICAgZ2xhc3NHcmFkLmFkZENvbG9yU3RvcCgwLjQ1LCAncmdiYSgyMzIsIDIyOSwgMjU0LCAwLjg4KScpO1xuICAgICAgZ2xhc3NHcmFkLmFkZENvbG9yU3RvcCgwLjgsICdyZ2JhKDIyMSwgMjE3LCAyNTAsIDAuODkpJyk7XG4gICAgICBnbGFzc0dyYWQuYWRkQ29sb3JTdG9wKDEuMCwgJ3JnYmEoMjM1LCAyMzIsIDI1NSwgMC45MyknKTtcbiAgICB9XG4gICAgY3R4LmZpbGxTdHlsZSA9IGdsYXNzR3JhZDtcbiAgICBjdHguZmlsbFJlY3QoY2FyZFgsIGNhcmRZLCBjYXJkVywgY2FyZEgpO1xuXG4gICAgLy8gU29mdCBwYXN0ZWwgYmx1ZS1sYXZlbmRlciBhbWJpZW50IG9yYiBiZWhpbmQgdG9wLWNlbnRlciBvZiBnbGFzc1xuICAgIGNvbnN0IHRvcE9yYkdyYWQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoMzYwLCA2MCwgMjAsIDM2MCwgODAsIDMyMCk7XG4gICAgdG9wT3JiR3JhZC5hZGRDb2xvclN0b3AoXG4gICAgICAwLFxuICAgICAgaXNVbHRyYUNsZWFyOTggPyAncmdiYSgyMDIsIDIxOCwgMjU1LCAwLjA0KScgOiAncmdiYSgyMDIsIDIxOCwgMjU1LCAwLjU1KSdcbiAgICApO1xuICAgIHRvcE9yYkdyYWQuYWRkQ29sb3JTdG9wKFxuICAgICAgMC42LFxuICAgICAgaXNVbHRyYUNsZWFyOTggPyAncmdiYSgyMTgsIDIxMiwgMjU1LCAwLjAyKScgOiAncmdiYSgyMTgsIDIxMiwgMjU1LCAwLjI1KSdcbiAgICApO1xuICAgIHRvcE9yYkdyYWQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDIzNSwgMjMyLCAyNTUsIDApJyk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHRvcE9yYkdyYWQ7XG4gICAgY3R4LmZpbGxSZWN0KGNhcmRYLCBjYXJkWSwgY2FyZFcsIDQyMCk7XG5cbiAgICAvLyBEaWFnb25hbCBzcGVjdWxhciBsaWdodCByZWZsZWN0aW9uIGJhbmQgYWNyb3NzIHRoZSBnbGFzc1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnRyYW5zbGF0ZSgyOTUsIDM0MCk7XG4gICAgY3R4LnJvdGF0ZSgtMC4yNCk7XG4gICAgY29uc3Qgc2hlZW5HcmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC0xOTAsIC0zMjAsIDE5MCwgMzIwKTtcbiAgICBzaGVlbkdyYWQuYWRkQ29sb3JTdG9wKDAuMCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4wKScpO1xuICAgIHNoZWVuR3JhZC5hZGRDb2xvclN0b3AoXG4gICAgICAwLjMyLFxuICAgICAgaXNVbHRyYUNsZWFyOTggPyAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA2KScgOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUyKSdcbiAgICApO1xuICAgIHNoZWVuR3JhZC5hZGRDb2xvclN0b3AoXG4gICAgICAwLjUyLFxuICAgICAgaXNVbHRyYUNsZWFyOTggPyAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjExKScgOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcyKSdcbiAgICApO1xuICAgIHNoZWVuR3JhZC5hZGRDb2xvclN0b3AoXG4gICAgICAwLjcyLFxuICAgICAgaXNVbHRyYUNsZWFyOTggPyAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0KScgOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI4KSdcbiAgICApO1xuICAgIHNoZWVuR3JhZC5hZGRDb2xvclN0b3AoMS4wLCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjApJyk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHNoZWVuR3JhZDtcbiAgICBjdHguZmlsbFJlY3QoLTIyMCwgLTM4MCwgMzgwLCA3NjApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyBTdWJ0bGUgaG9sb2dyYXBoaWMgZ2VvbWV0cmljIHdhdGVybWFyayBpbiB0aGUgbWlkZGxlLXJpZ2h0IG9mIHRoZSBnbGFzcyBjYXJkXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHgudHJhbnNsYXRlKDU0NSwgNDQ1KTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBpc1VsdHJhQ2xlYXI5OFxuICAgICAgPyAncmdiYSgxOTYsIDE4MSwgMjUzLCAwLjM1KSdcbiAgICAgIDogJ3JnYmEoMTM2LCAxMTgsIDIzNSwgMC4yMiknO1xuICAgIGN0eC5maWxsU3R5bGUgPSBpc1VsdHJhQ2xlYXI5OFxuICAgICAgPyAncmdiYSgxNjcsIDE1MiwgMjQ4LCAwLjAzKSdcbiAgICAgIDogJ3JnYmEoMTY3LCAxNTIsIDI0OCwgMC4xMiknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyLjU7XG4gICAgaWYgKHBhbmVsVHlwZSA9PT0gJ3ByaXNtJyB8fCBwYW5lbFR5cGUgPT09ICdjb3JlJykge1xuICAgICAgLy8gRmFjZXRlZCBjcnlzdGFsIHBvbHloZWRyb24gd2F0ZXJtYXJrXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDAsIC04NSk7XG4gICAgICBjdHgubGluZVRvKDc4LCAtMjIpO1xuICAgICAgY3R4LmxpbmVUbyg0OCwgNzIpO1xuICAgICAgY3R4LmxpbmVUbygtNDgsIDcyKTtcbiAgICAgIGN0eC5saW5lVG8oLTc4LCAtMjIpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygwLCAtODUpO1xuICAgICAgY3R4LmxpbmVUbygwLCA3Mik7XG4gICAgICBjdHgubW92ZVRvKC03OCwgLTIyKTtcbiAgICAgIGN0eC5saW5lVG8oNzgsIC0yMik7XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENvbmNlbnRyaWMgYXJjaGl0ZWN0dXJhbCByaW5nc1xuICAgICAgZm9yIChsZXQgciA9IDM0OyByIDw9IDc4OyByICs9IDIyKSB7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYygwLCAwLCByLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIC8vIDIuIEJvbGQgSW5kaWdvLVZpb2xldCBIZWFkbGluZSAmIEJvZHkgQ29weSAoY2hhbmdlcyBkeW5hbWljYWxseSB3aXRoIHBhbmVsVHlwZSAmIGFjdGl2ZUljb25JbmRleClcbiAgICBjb25zdCBwYW5lbENvbnRlbnQ6IFJlY29yZDxcbiAgICAgIEh1ZFBhbmVsVHlwZSxcbiAgICAgIHtcbiAgICAgICAgaGVhZGVyczogW3N0cmluZywgc3RyaW5nLCBzdHJpbmcsIHN0cmluZ107XG4gICAgICAgIGxpbmVzOiBbc3RyaW5nW10sIHN0cmluZ1tdLCBzdHJpbmdbXSwgc3RyaW5nW11dO1xuICAgICAgICB0YWc6IHN0cmluZztcbiAgICAgIH1cbiAgICA+ID0ge1xuICAgICAgcHJpc206IHtcbiAgICAgICAgaGVhZGVyczogW1xuICAgICAgICAgICdNYWtlIEl0IFBvcCEnLFxuICAgICAgICAgICdCSU0gU3BlYyBMT0QtNDAwJyxcbiAgICAgICAgICAnRGlhZ3JpZCBTdHJ1Y3R1cmUnLFxuICAgICAgICAgICdBUiBBbmNob3IgU3luYycsXG4gICAgICAgIF0sXG4gICAgICAgIGxpbmVzOiBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ0xvcmVtIElwc3VtIERvbG9yIFNpdCBBbWV0LCcsXG4gICAgICAgICAgICAnQ29uc2VjdGV0dXIgQWRpcGlzY2luZyBFbGl0IFV0IEFsaXF1YW0sJyxcbiAgICAgICAgICAgICdQdXJ1cyBTaXQgQW1ldCBMdWN0dXMgVmVuZW5hdGlzIMK3IEFscGhhIFNwaXJlJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgICdFZ3pvc3praWVsZXQgRGlhZ3JpZG93eSA5OjE2IGkgUmR6ZcWEIEJJTSwnLFxuICAgICAgICAgICAgJ1JvenBvem5hd2FuaWUgQmxhdHUgTGlEQVIgKDk5LjQlIExvY2spLCcsXG4gICAgICAgICAgICAnT8Wbd2lldGxlbmllIMWacm9kb3dpc2tvd2UgaSBQYXJhbGFrc2EgNkRvRicsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnU3RydWt0dXJhIE5vxZtuYTogODbigJMxMTggS29uZHlnbmFjamksJyxcbiAgICAgICAgICAgICdTdHJvcHkgUMWCeXRvd2UgKyBTenlieSBXaW5kb3dlIHcgSG9sb2dyYW1pZSwnLFxuICAgICAgICAgICAgJ0R5bmFtaWN6bmEgU2lhdGthIEfFgsSZYmkgQVJLaXQgLyBBUkNvcmUnLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ0tvdHdpY2EgUHJ6ZXN0cnplbm5hIEFSQW5jaG9yIEFrdHl3bmEsJyxcbiAgICAgICAgICAgICdFa3Nwb3J0IFByZWZhYnUgVW5pdHkgNiBVUlAgKyBTaGFkZXIgR3JhcGgsJyxcbiAgICAgICAgICAgICdTeW5jaHJvbml6YWNqYSBQxYJhc3pjenl6bnkgQmxhdHUgaSBQb2TFgm9naScsXG4gICAgICAgICAgXSxcbiAgICAgICAgXSxcbiAgICAgICAgdGFnOiAnUkVTT05BTkNFIFBSSVNNIMK3IEFMUEhBJyxcbiAgICAgIH0sXG4gICAgICB0dXJiaW5lOiB7XG4gICAgICAgIGhlYWRlcnM6IFtcbiAgICAgICAgICAnTWFrZSBJdCBQb3AhJyxcbiAgICAgICAgICAnT3JiaXRhbCBTcGluZSBCSU0nLFxuICAgICAgICAgICdBZXJvIERpYWdyaWQgOToxNicsXG4gICAgICAgICAgJ0xpREFSIFBsYW5lIExvY2snLFxuICAgICAgICBdLFxuICAgICAgICBsaW5lczogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgICdMb3JlbSBJcHN1bSBEb2xvciBTaXQgQW1ldCwnLFxuICAgICAgICAgICAgJ0NvbnNlY3RldHVyIEFkaXBpc2NpbmcgRWxpdCBVdCBBbGlxdWFtLCcsXG4gICAgICAgICAgICAnUHVydXMgU2l0IEFtZXQgTHVjdHVzIFZlbmVuYXRpcyDCtyBPcmJpdGFsIEEnLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ0hvcnl6b250YWxueSBLb21wbGVrcyBBcmNoaXRla3Rvbmljem55IDk6MTYsJyxcbiAgICAgICAgICAgICdDenVqbmlraSBHxYLEmWJpIFRvRiAvIExpREFSIG5hIEJsYWNpZSBTdG/FgnUsJyxcbiAgICAgICAgICAgICdQxYJ5bm5hIFJlZ3VsYWNqYSBSdWNodSBXYWhhZMWCb3dlZ28gNkRvRicsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnS2Fza2Fkb3d5IFVrxYJhZCAzRCBwb3phIEplZG7EhSBMaW5pxIUsJyxcbiAgICAgICAgICAgICdXaWVsb3dhcnN0d293ZSBSZHplbmllIFRlcm1pY3puZSBpIFN0cm9weSwnLFxuICAgICAgICAgICAgJ09rbHV6amEgRm90ZWxpIGkgT2JpZWt0w7N3IFBpZXJ3c3pvcGxhbm93eWNoJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgICdHb3Rvd3kgUGFraWV0IEFSRm91bmRhdGlvbiAoQVJLaXQgKyBBUkNvcmUpLCcsXG4gICAgICAgICAgICAnS2FsaWJyYWNqYSBXeW1pYXLDs3cgQmxhdHUgaSBQb21pZXN6Y3plbmlhLCcsXG4gICAgICAgICAgICAnU3RydW1pZW5pb3dhbmllIFRlbGVtZXRyaWkgR1BVIHcgQ3phc2llIFJ6ZWN6LicsXG4gICAgICAgICAgXSxcbiAgICAgICAgXSxcbiAgICAgICAgdGFnOiAnT1JCSVRBTCBTUElORSDCtyBQUk9UT1RZUEUnLFxuICAgICAgfSxcbiAgICAgIGNvcmU6IHtcbiAgICAgICAgaGVhZGVyczogW1xuICAgICAgICAgICdNYWtlIEl0IFBvcCEnLFxuICAgICAgICAgICdDb3JlIFN5bmMgTmV4dXMnLFxuICAgICAgICAgICc5OjE2IEhvcml6b24gV2luZycsXG4gICAgICAgICAgJ1VuaXR5IDYgVVJQIFN5bmMnLFxuICAgICAgICBdLFxuICAgICAgICBsaW5lczogW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgICdMb3JlbSBJcHN1bSBEb2xvciBTaXQgQW1ldCwnLFxuICAgICAgICAgICAgJ0NvbnNlY3RldHVyIEFkaXBpc2NpbmcgRWxpdCBVdCBBbGlxdWFtLCcsXG4gICAgICAgICAgICAnUHVydXMgU2l0IEFtZXQgTHVjdHVzIFZlbmVuYXRpcyDCtyBDb3JlIFN5bmMnLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ0NlbnRyYWxueSBLbGFzdGVyIFdpZcW8b3djw7N3IHplIFrFgm90eW0gUmR6ZW5pZW0sJyxcbiAgICAgICAgICAgICdEZXRla2NqYSBQxYJhc3pjenl6biBIb3Jpem9udGFsVXAgKEJsYXQgKyBQb3NhZHprYSksJyxcbiAgICAgICAgICAgICdIYXJtb25pa2kgU2Zlcnljem5lIGkgT2RiaWNpYSBQQlIgbmEgU3RvbGUnLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ1Byb3BvcmNqZSBNb2RlbGkgOToxNiBvcmF6IFVrxYJhZCBBbWZpdGVhdHJhbG55LCcsXG4gICAgICAgICAgICAnUm96c3RyemVsZW5pZSBXYXJzdHcgS29uZHlnbmFjamkgQklNIHcgM0QsJyxcbiAgICAgICAgICAgICdDesSFc3RlY3praSBBdG1vc2Zlcnljem5lIHphIMWBdWtvd3ltaSBPa25hbWknLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ1phcGlzYW5vIEtvbmZpZ3VyYWNqxJkgU2NlbnkgSG9sb2dyYW1vd2VqLCcsXG4gICAgICAgICAgICAnQWt0eXduYSBNYXNrYSBTemFibG9ub3dhIFN0ZW5jaWwgQnVmZmVyID0gMiwnLFxuICAgICAgICAgICAgJ1N0YWJpbGl6YWNqYSDFmmxlZHplbmlhIDZEb0YgU0xBTTogOTkuOCUnLFxuICAgICAgICAgIF0sXG4gICAgICAgIF0sXG4gICAgICAgIHRhZzogJ0NPUkUgU1lOQyDCtyBORVVSQUwgTUVTSCcsXG4gICAgICB9LFxuICAgICAgYmlvc3BoZXJlOiB7XG4gICAgICAgIGhlYWRlcnM6IFtcbiAgICAgICAgICAnTWFrZSBJdCBQb3AhJyxcbiAgICAgICAgICAnQmlvLVNwaGVyZSBDdXJlIElJJyxcbiAgICAgICAgICAnRWNvIEF0cmlhICYgRmxvb3JzJyxcbiAgICAgICAgICAnRW52IExpZ2h0IFByb2JlJyxcbiAgICAgICAgXSxcbiAgICAgICAgbGluZXM6IFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnTG9yZW0gSXBzdW0gRG9sb3IgU2l0IEFtZXQsJyxcbiAgICAgICAgICAgICdDb25zZWN0ZXR1ciBBZGlwaXNjaW5nIEVsaXQgVXQgQWxpcXVhbSwnLFxuICAgICAgICAgICAgJ1B1cnVzIFNpdCBBbWV0IEx1Y3R1cyBWZW5lbmF0aXMgwrcgQmlvc3BoZXJlJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgICdaaW50ZWdyb3dhbmUgT2dyb2R5IFBpb25vd2UgaSBBdHJpYSA5OjE2LCcsXG4gICAgICAgICAgICAnRXN0eW1hY2phIMWad2lhdMWCYSBTxYJvbmVjem5lZ28geiBPa2llbiBTYWxpLCcsXG4gICAgICAgICAgICAnRHluYW1pY3pueSBQecWCIMWad2lldGxueSB3IFBvcnRhbHUgT2tpZW5ueW0nLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ1N5bXVsYWNqYSBQcnplcMWCeXd1IFBvd2lldHJ6YSBpIE5hc8WCb25lY3puaWVuaWEsJyxcbiAgICAgICAgICAgICdHcnVweSAy4oCTNSBCdWR5bmvDs3cgbmEgTmllbGluaW93ZWogU2lhdGNlIDNELCcsXG4gICAgICAgICAgICAnQWRhcHRhY3lqbmEgR8SZc3RvxZvEhyBTaWF0a2kgSG9sb2dyYW11IExPRCcsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICAnTW9kdcWCIMWacm9kb3dpc2tvd3kgQVJDYW1lcmFNYW5hZ2VyIEFrdHl3bnksJyxcbiAgICAgICAgICAgICdFa3Nwb3J0IE/Fm3dpZXRsZW5pYSBIRFJQIC8gVVJQIFJlZmxlY3Rpb24gUHJvYmUsJyxcbiAgICAgICAgICAgICdQb3ppb20gVWZub8WbY2kgU2thbmVyYSBHxYLEmWJpIExpREFSOiA5OS42JScsXG4gICAgICAgICAgXSxcbiAgICAgICAgXSxcbiAgICAgICAgdGFnOiAnRUNPTE9HSUNBTCBCSU9TUEhFUkUgwrcgSUknLFxuICAgICAgfSxcbiAgICAgIG5ldXJhbDoge1xuICAgICAgICBoZWFkZXJzOiBbXG4gICAgICAgICAgJ01ha2UgSXQgUG9wIScsXG4gICAgICAgICAgJ05ldXJhbCBBcnJheSAzRCcsXG4gICAgICAgICAgJ1NwYXRpYWwgVG9wb2xvZ3knLFxuICAgICAgICAgICc2RG9GIERlcHRoIE1hdHJpeCcsXG4gICAgICAgIF0sXG4gICAgICAgIGxpbmVzOiBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ0xvcmVtIElwc3VtIERvbG9yIFNpdCBBbWV0LCcsXG4gICAgICAgICAgICAnQ29uc2VjdGV0dXIgQWRpcGlzY2luZyBFbGl0IFV0IEFsaXF1YW0sJyxcbiAgICAgICAgICAgICdQdXJ1cyBTaXQgQW1ldCBMdWN0dXMgVmVuZW5hdGlzIMK3IE5ldXJhbCBNZXNoJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgICdXaWVsb3BsYW5vd2EgU2lhdGthIE5ldXJvbm93YSBpIFfEmXrFgnkgQklNLCcsXG4gICAgICAgICAgICAnR8WCxJliaWEgT2JyYXp1IHogUGFyYWxha3PEhSBSdWNob3fEhSBVcnrEhWR6ZW5pYSwnLFxuICAgICAgICAgICAgJ1Jvem1pZXN6Y3plbmllIEthc2thZG93ZSBpIMWBdWtvd2UgbmEgQmxhY2llJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgICdQb3ppb21lIFNrcnp5ZMWCYSA5OjE2ICsgSWdsaWNlIFdzY2hvZG5pZSwnLFxuICAgICAgICAgICAgJ1ByZWN5enlqbmEgT2tsdXpqYSBHxYLEmWJpIChFbnZpcm9ubWVudCBEZXB0aCksJyxcbiAgICAgICAgICAgICdNb25pdG9yaW5nIEZQUywgUkFNL1ZSQU0gaSBEcmF3IENhbGxpIG5hIMW7eXdvJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgICdTeW5jaHJvbml6YWNqYSBXxJl6xYLDs3cgR2VvbWV0cnljem55Y2ggWmFrb8WEY3pvbmEsJyxcbiAgICAgICAgICAgICdHb3Rvd2/Fm8SHIGRvIFdkcm/FvGVuaWEgbmEgaU9TIEFSS2l0IGkgQW5kcm9pZCBBUkNvcmUsJyxcbiAgICAgICAgICAgICdLbGlrbmlqIElrb255IFBvbmnFvGVqLCBhYnkgUHJ6ZcWCxIVjennEhyBUcnliIEVrcmFudScsXG4gICAgICAgICAgXSxcbiAgICAgICAgXSxcbiAgICAgICAgdGFnOiAnQUNUSVZFIE1FU0ggwrcgTkVVUkFMIEFSUkFZJyxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIGNvbnN0IHNhZmVJZHggPSAoKGFjdGl2ZUljb25JbmRleCAlIDQpICsgNCkgJSA0O1xuICAgIGNvbnN0IGluZm8gPSBwYW5lbENvbnRlbnRbcGFuZWxUeXBlXTtcblxuICAgIC8vIFN1YnRsZSB0b3AgY2F0ZWdvcnkgcGlsbCBsYWJlbFxuICAgIGN0eC5zYXZlKCk7XG4gICAgaWYgKGlzVWx0cmFDbGVhcjk4KSB7XG4gICAgICBjdHguc2hhZG93Q29sb3IgPSAncmdiYSgxNSwgMTAsIDQwLCAwLjg1KSc7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDEwO1xuICAgIH1cbiAgICBjdHguZmlsbFN0eWxlID0gaXNVbHRyYUNsZWFyOThcbiAgICAgID8gJ3JnYmEoMjIxLCAyMTQsIDI1NCwgMC45MiknXG4gICAgICA6ICdyZ2JhKDkxLCA3MiwgMjEyLCAwLjYyKSc7XG4gICAgY3R4LmZvbnQgPSAnNzAwIDE2cHggXCJKZXRCcmFpbnMgTW9ub1wiLCBtb25vc3BhY2UnO1xuICAgIGN0eC5maWxsVGV4dChcbiAgICAgIGlzVWx0cmFDbGVhcjk4ID8gYCR7aW5mby50YWd9IMK3IDk4JSBDTEVBUmAgOiBpbmZvLnRhZyxcbiAgICAgIDk2LFxuICAgICAgMTE4XG4gICAgKTtcblxuICAgIC8vIE1haW4gQm9sZCBIZWFkbGluZSAoXCJNYWtlIEl0IFBvcCFcIiBzdHlsZSBmcm9tIGF0dGFjaGVkIGltYWdlKVxuICAgIGN0eC5maWxsU3R5bGUgPSBpc1VsdHJhQ2xlYXI5OCA/ICcjZjVmM2ZmJyA6ICcjNGMzN2M0JztcbiAgICBjdHguZm9udCA9ICc4MDAgNThweCBcIk91dGZpdFwiLCBzYW5zLXNlcmlmJztcbiAgICBjdHguZmlsbFRleHQoaW5mby5oZWFkZXJzW3NhZmVJZHhdLCA5NCwgMTk2KTtcblxuICAgIC8vIDMgTGluZXMgb2YgY2xlYW4gYm9keSB0ZXh0XG4gICAgY3R4LmZpbGxTdHlsZSA9IGlzVWx0cmFDbGVhcjk4ID8gJyNkZGQ2ZmUnIDogJyM1NjQzYmYnO1xuICAgIGN0eC5mb250ID0gJzUwMCAyNHB4IFwiUGx1cyBKYWthcnRhIFNhbnNcIiwgc2Fucy1zZXJpZic7XG4gICAgY29uc3QgYWN0aXZlTGluZXMgPSBpbmZvLmxpbmVzW3NhZmVJZHhdO1xuICAgIGFjdGl2ZUxpbmVzLmZvckVhY2goKGxpbmUsIGxJZHgpID0+IHtcbiAgICAgIGN0eC5maWxsVGV4dChsaW5lLCA5NiwgMjY2ICsgbElkeCAqIDQwKTtcbiAgICB9KTtcbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgLy8gMy4gU2lnbmF0dXJlIERpYWdvbmFsIExhdmVuZGVyLUluZGlnbyBBcnJvdyAo4oaXKSBhdCBtaWRkbGUtbGVmdCAobWF0Y2hpbmcgYXR0YWNoZWQgaW1hZ2UpXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHgudHJhbnNsYXRlKDEzMiwgNDg4KTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBpc1VsdHJhQ2xlYXI5OFxuICAgICAgPyAncmdiYSgyMjEsIDIxNCwgMjU0LCAwLjk1KSdcbiAgICAgIDogJ3JnYmEoMTgyLCAxNjgsIDI0OCwgMC44NSknO1xuICAgIGN0eC5saW5lV2lkdGggPSA3LjU7XG4gICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xuICAgIGN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oLTI4LCAyOCk7XG4gICAgY3R4LmxpbmVUbygyOCwgLTI4KTtcbiAgICBjdHgubW92ZVRvKC02LCAtMjgpO1xuICAgIGN0eC5saW5lVG8oMjgsIC0yOCk7XG4gICAgY3R4LmxpbmVUbygyOCwgNik7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyBTdWJ0bGUgaW50ZXJhY3RpdmUgc3RhdHVzIHBpbGwgaW4gbG93ZXItcmlnaHQgYWJvdmUgZG9ja1xuICAgIGRyYXdSb3VuZGVkUmVjdFBhdGgoY3R4LCAzOTIsIDU0MCwgMjg4LCA0OCwgMjQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBpc1VsdHJhQ2xlYXI5OFxuICAgICAgPyAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0KSdcbiAgICAgIDogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC41NSknO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC45KSc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBpc1VsdHJhQ2xlYXI5OCA/ICcjZWRlOWZlJyA6ICcjNGMzN2M0JztcbiAgICBjdHguZm9udCA9ICc3MDAgMTVweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgY3R4LmZpbGxUZXh0KFxuICAgICAgaXNVbHRyYUNsZWFyOThcbiAgICAgICAgPyBgU1pLxYFPIDk4JSDCtyBUUllCIDAke3NhZmVJZHggKyAxfS8wNGBcbiAgICAgICAgOiBgVFJZQiAwJHtzYWZlSWR4ICsgMX0vMDQgwrcgSU5URVJBS1RZV05ZYCxcbiAgICAgIDQxMixcbiAgICAgIDU3MFxuICAgICk7XG5cbiAgICAvLyA0LiBCb3R0b20gUm91bmRlZCBJbnRlcmFjdGl2ZSBEb2NrIEJhciAoeSA9IDYzNCB0byA4NTYpIG1hdGNoaW5nIGF0dGFjaGVkIGltYWdlXG4gICAgY29uc3QgZG9ja1kgPSA2MzQ7XG4gICAgY29uc3QgZG9ja0ggPSAyMjI7XG4gICAgZHJhd1JvdW5kZWRSZWN0UGF0aChjdHgsIGNhcmRYLCBkb2NrWSwgY2FyZFcsIGRvY2tILCA3Mik7XG4gICAgY29uc3QgZG9ja0dyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoY2FyZFgsIGRvY2tZLCBjYXJkWCwgZG9ja1kgKyBkb2NrSCk7XG4gICAgaWYgKGlzVWx0cmFDbGVhcjk4KSB7XG4gICAgICBkb2NrR3JhZC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjQ0LCAyNDIsIDI1NSwgMC4wMjUpJyk7XG4gICAgICBkb2NrR3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMjMyLCAyMjgsIDI1NCwgMC4wMzUpJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY2tHcmFkLmFkZENvbG9yU3RvcCgwLCAncmdiYSgyNDQsIDI0MiwgMjU1LCAwLjcyKScpO1xuICAgICAgZG9ja0dyYWQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDIzMiwgMjI4LCAyNTQsIDAuODgpJyk7XG4gICAgfVxuICAgIGN0eC5maWxsU3R5bGUgPSBkb2NrR3JhZDtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgLy8gQ3Jpc3Agd2hpdGUgc3BlY3VsYXIgdG9wIGJvcmRlciBvZiB0aGUgYm90dG9tIGRvY2sgYmFyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC45NSknO1xuICAgIGN0eC5saW5lV2lkdGggPSAzLjU7XG4gICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgLy8gNS4gRm91ciBDaXJjdWxhciBJY29uIEJ1dHRvbnMgaW5zaWRlIHRoZSBCb3R0b20gRG9jayBCYXJcbiAgICBjb25zdCBidXR0b25DZW50ZXJzWCA9IFsxNjgsIDMxMiwgNDU2LCA2MDBdO1xuICAgIGNvbnN0IGJ1dHRvbkNlbnRlclkgPSA3NDU7XG4gICAgY29uc3QgYnRuUmFkaXVzID0gNTI7XG5cbiAgICBidXR0b25DZW50ZXJzWC5mb3JFYWNoKChjeCwgYklkeCkgPT4ge1xuICAgICAgY29uc3QgaXNBY3RpdmUgPSBiSWR4ID09PSBzYWZlSWR4O1xuXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgaWYgKGlzQWN0aXZlKSB7XG4gICAgICAgIC8vIEFjdGl2ZSBkZWVwIGluZGlnby12aW9sZXQgZ2xvd2luZyBjaXJjdWxhciBidXR0b24gKGxpa2UgYnV0dG9uICMxIGluIHJlZmVyZW5jZSBwaG90bylcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJ3JnYmEoODQsIDU4LCAyMTQsIDAuNTUpJztcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAyNDtcbiAgICAgICAgY3R4LnNoYWRvd09mZnNldFkgPSA2O1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZUJ0bkdyYWQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoXG4gICAgICAgICAgY3ggLSAxMixcbiAgICAgICAgICBidXR0b25DZW50ZXJZIC0gMTQsXG4gICAgICAgICAgNixcbiAgICAgICAgICBjeCxcbiAgICAgICAgICBidXR0b25DZW50ZXJZLFxuICAgICAgICAgIGJ0blJhZGl1c1xuICAgICAgICApO1xuICAgICAgICBhY3RpdmVCdG5HcmFkLmFkZENvbG9yU3RvcCgwLCAnIzZlNTVmMCcpO1xuICAgICAgICBhY3RpdmVCdG5HcmFkLmFkZENvbG9yU3RvcCgwLjY1LCAnIzU0M2FkNicpO1xuICAgICAgICBhY3RpdmVCdG5HcmFkLmFkZENvbG9yU3RvcCgxLCAnIzQ0MmJiOCcpO1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhjeCwgYnV0dG9uQ2VudGVyWSwgYnRuUmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBhY3RpdmVCdG5HcmFkO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIC8vIE91dGVyIHNvZnQgbGF2ZW5kZXIgaGFsbyByaW5nXG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcbiAgICAgICAgY3R4LnNoYWRvd09mZnNldFkgPSAwO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gNDtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMjA4LCAxOTgsIDI1NSwgMC44OCknO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJbmFjdGl2ZSBjaXJjdWxhciBidXR0b24gKHVsdHJhLWNsZWFyIDk4JSBnbGFzcyBvciBmcm9zdGVkIGxhdmVuZGVyKVxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoY3gsIGJ1dHRvbkNlbnRlclksIGJ0blJhZGl1cyArIDUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNVbHRyYUNsZWFyOThcbiAgICAgICAgICA/ICdyZ2JhKDIyMSwgMjE0LCAyNTQsIDAuNDgpJ1xuICAgICAgICAgIDogJ3JnYmEoMTk4LCAxOTAsIDI0OCwgMC40NSknO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gNDtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhjeCwgYnV0dG9uQ2VudGVyWSwgYnRuUmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBpc1VsdHJhQ2xlYXI5OFxuICAgICAgICAgID8gJ3JnYmEoMjM1LCAyMzIsIDI1NSwgMC4wNCknXG4gICAgICAgICAgOiAncmdiYSgyMzUsIDIzMiwgMjU1LCAwLjY1KSc7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSAyLjU7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGlzVWx0cmFDbGVhcjk4XG4gICAgICAgICAgPyAncmdiYSgyMjEsIDIxNCwgMjU0LCAwLjg1KSdcbiAgICAgICAgICA6ICdyZ2JhKDE2OCwgMTU2LCAyNDAsIDAuNzIpJztcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBEcmF3IHRoZSA0IHZlY3RvciBpY29ucyBtYXRjaGluZyB0aGUgYXR0YWNoZWQgaW1hZ2VcbiAgICAgIGNvbnN0IGluYWN0aXZlSWNvbkNvbG9yID0gaXNVbHRyYUNsZWFyOTggPyAnI2VkZTlmZScgOiAnIzRlMzhjMic7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBpc0FjdGl2ZSA/ICcjZmZmZmZmJyA6IGluYWN0aXZlSWNvbkNvbG9yO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQWN0aXZlID8gJyNmZmZmZmYnIDogaW5hY3RpdmVJY29uQ29sb3I7XG4gICAgICBjdHgubGluZVdpZHRoID0gMy41O1xuICAgICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xuICAgICAgY3R4LmxpbmVKb2luID0gJ3JvdW5kJztcblxuICAgICAgaWYgKGJJZHggPT09IDApIHtcbiAgICAgICAgLy8gSWNvbiAwOiBIb21lIC8gQXJjaGl0ZWN0dXJhbCBIb3VzZSBpY29uXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjeCwgYnV0dG9uQ2VudGVyWSAtIDIwKTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIDIwLCBidXR0b25DZW50ZXJZIC0gMyk7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSAyMCwgYnV0dG9uQ2VudGVyWSArIDE4KTtcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oY3ggLSAyMCwgYnV0dG9uQ2VudGVyWSArIDIxLCBjeCAtIDE3LCBidXR0b25DZW50ZXJZICsgMjEpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgMTcsIGJ1dHRvbkNlbnRlclkgKyAyMSk7XG4gICAgICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKGN4ICsgMjAsIGJ1dHRvbkNlbnRlclkgKyAyMSwgY3ggKyAyMCwgYnV0dG9uQ2VudGVyWSArIDE4KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIDIwLCBidXR0b25DZW50ZXJZIC0gMyk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIC8vIElubmVyIGFyY2ggZG9vclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3ggLSA2LCBidXR0b25DZW50ZXJZICsgMjEpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gNiwgYnV0dG9uQ2VudGVyWSArIDgpO1xuICAgICAgICBjdHguYXJjKGN4LCBidXR0b25DZW50ZXJZICsgOCwgNiwgTWF0aC5QSSwgMCwgZmFsc2UpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgNiwgYnV0dG9uQ2VudGVyWSArIDIxKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgfSBlbHNlIGlmIChiSWR4ID09PSAxKSB7XG4gICAgICAgIC8vIEljb24gMTogRG9jdW1lbnQgLyBTcGVjIHNoZWV0IHdpdGggZGlhZ29uYWwgZWRpdGluZyBwZW5cbiAgICAgICAgZHJhd1JvdW5kZWRSZWN0UGF0aChjdHgsIGN4IC0gMTksIGJ1dHRvbkNlbnRlclkgLSAxOSwgMzIsIDM4LCA3KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAvLyBIb3Jpem9udGFsIGxpbmVzIGluc2lkZSBkb2N1bWVudFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3ggLSAxMSwgYnV0dG9uQ2VudGVyWSAtIDgpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgMywgYnV0dG9uQ2VudGVyWSAtIDgpO1xuICAgICAgICBjdHgubW92ZVRvKGN4IC0gMTEsIGJ1dHRvbkNlbnRlclkpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgMSwgYnV0dG9uQ2VudGVyWSk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3ggLSAxMSwgYnV0dG9uQ2VudGVyWSArIDgpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gMiwgYnV0dG9uQ2VudGVyWSArIDgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIC8vIERpYWdvbmFsIHBlblxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY3ggKyA0LCBidXR0b25DZW50ZXJZICsgMTApO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgMjEsIGJ1dHRvbkNlbnRlclkgLSA3KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIDE1LCBidXR0b25DZW50ZXJZIC0gMTMpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gMiwgYnV0dG9uQ2VudGVyWSArIDQpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH0gZWxzZSBpZiAoYklkeCA9PT0gMikge1xuICAgICAgICAvLyBJY29uIDI6IFB1ZmZlZCBDYXAgLyBDcm93biAvIEFyY2hpdGVjdHVyYWwgRG9tZSBNb2R1bGUgaWNvbiAobWF0Y2hpbmcgM3JkIGJ1dHRvbiBpbiBpbWFnZSlcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGN4IC0gMTUsIGJ1dHRvbkNlbnRlclkgKyA0KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIDE1LCBidXR0b25DZW50ZXJZICsgMTgpO1xuICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyhjeCwgYnV0dG9uQ2VudGVyWSArIDIxLCBjeCArIDE1LCBidXR0b25DZW50ZXJZICsgMTgpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgMTUsIGJ1dHRvbkNlbnRlclkgKyA0KTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIC8vIDMgcHVmZmVkIHRvcCBsb2Jlc1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoY3ggLSAxMSwgYnV0dG9uQ2VudGVyWSAtIDMsIDksIE1hdGguUEkgKiAwLjU1LCBNYXRoLlBJICogMS42NSwgZmFsc2UpO1xuICAgICAgICBjdHguYXJjKGN4LCBidXR0b25DZW50ZXJZIC0gMTAsIDExLCBNYXRoLlBJICogMS4xNSwgTWF0aC5QSSAqIDEuODUsIGZhbHNlKTtcbiAgICAgICAgY3R4LmFyYyhjeCArIDExLCBidXR0b25DZW50ZXJZIC0gMywgOSwgTWF0aC5QSSAqIDEuMzUsIE1hdGguUEkgKiAwLjQ1LCBmYWxzZSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAvLyBWZXJ0aWNhbCByaWJzIG9uIGJhc2VcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGN4IC0gNSwgYnV0dG9uQ2VudGVyWSArIDcpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gNSwgYnV0dG9uQ2VudGVyWSArIDE2KTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjeCArIDUsIGJ1dHRvbkNlbnRlclkgKyA3KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCArIDUsIGJ1dHRvbkNlbnRlclkgKyAxNik7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIH0gZWxzZSBpZiAoYklkeCA9PT0gMykge1xuICAgICAgICAvLyBJY29uIDM6IENhcnQgLyBFeHBvcnQgQWN0aW9uIGljb24gKG1hdGNoaW5nIDR0aCBidXR0b24gaW4gaW1hZ2UpXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjeCAtIDIzLCBidXR0b25DZW50ZXJZIC0gMTYpO1xuICAgICAgICBjdHgubGluZVRvKGN4IC0gMTUsIGJ1dHRvbkNlbnRlclkgLSAxNik7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggLSA5LCBidXR0b25DZW50ZXJZICsgNyk7XG4gICAgICAgIGN0eC5saW5lVG8oY3ggKyAxNSwgYnV0dG9uQ2VudGVyWSArIDcpO1xuICAgICAgICBjdHgubGluZVRvKGN4ICsgMjEsIGJ1dHRvbkNlbnRlclkgLSA5KTtcbiAgICAgICAgY3R4LmxpbmVUbyhjeCAtIDEyLCBidXR0b25DZW50ZXJZIC0gOSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgICAvLyBUd28gd2hlZWxzXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhjeCAtIDYsIGJ1dHRvbkNlbnRlclkgKyAxNiwgNCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguYXJjKGN4ICsgMTEsIGJ1dHRvbkNlbnRlclkgKyAxNiwgNCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICB9XG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgY3R4LnJlc3RvcmUoKTsgLy8gRW5kIGNsaXBcblxuICAgIC8vIDYuIENyaXNwIE91dGVyIFdoaXRlIFNwZWN1bGFyIEdsYXNzIFJpbSBhcm91bmQgdGhlIGVudGlyZSByb3VuZGVkIGNhcmRcbiAgICBkcmF3Um91bmRlZFJlY3RQYXRoKGN0eCwgY2FyZFgsIGNhcmRZLCBjYXJkVywgY2FyZEgsIGNhcmRSYWRpdXMpO1xuICAgIGNvbnN0IHJpbUdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoXG4gICAgICBjYXJkWCxcbiAgICAgIGNhcmRZLFxuICAgICAgY2FyZFggKyBjYXJkVyxcbiAgICAgIGNhcmRZICsgY2FyZEhcbiAgICApO1xuICAgIHJpbUdyYWQuYWRkQ29sb3JTdG9wKDAuMCwgJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC45OCknKTtcbiAgICByaW1HcmFkLmFkZENvbG9yU3RvcCgwLjUsICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJyk7XG4gICAgcmltR3JhZC5hZGRDb2xvclN0b3AoMS4wLCAncmdiYSgyNDAsIDIzNiwgMjU1LCAwLjk2KScpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IHJpbUdyYWQ7XG4gICAgY3R4LmxpbmVXaWR0aCA9IGlzVWx0cmFDbGVhcjk4ID8gNS4wIDogNC41O1xuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICAgIHRleHR1cmUuY29sb3JTcGFjZSA9IFRIUkVFLlNSR0JDb2xvclNwYWNlO1xuICAgIHRleHR1cmUuYW5pc290cm9weSA9IG1heEFuaXNvdHJvcHk7XG4gICAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgcmV0dXJuIHRleHR1cmU7XG4gIH1cblxuICAvLyBGYWxsYmFjayAvIE9wdGlvbiAyOiBDbGFzc2ljIERhcmsgQ3lhbiBUZWNobmljYWwgQ0FEIEhvbG9ncmFtXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjYW52YXMud2lkdGggPSA3Njg7XG4gIGNhbnZhcy5oZWlnaHQgPSA1MTI7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcblxuICAvLyBUcmFuc2x1Y2VudCBkYXJrLWN5YW4gZ2xhc3MgZnJhbWVcbiAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDYsIDI0LCA0NCwgMC41OCknO1xuICBjdHguZmlsbFJlY3QoMTIsIDEyLCA3NDQsIDQ4OCk7XG5cbiAgLy8gRG91YmxlIHRlY2huaWNhbCBib3JkZXJcbiAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjg1KSc7XG4gIGN0eC5saW5lV2lkdGggPSAzO1xuICBjdHguc3Ryb2tlUmVjdCgxMiwgMTIsIDc0NCwgNDg4KTtcbiAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjMpJztcbiAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gIGN0eC5zdHJva2VSZWN0KDIyLCAyMiwgNzI0LCA0NjgpO1xuXG4gIC8vIEhlYWRlciBiYXJcbiAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDE0LCAxNjUsIDIzMywgMC4yMiknO1xuICBjdHguZmlsbFJlY3QoMTQsIDE0LCA3NDAsIDUyKTtcblxuICBjb25zdCB0aXRsZXM6IFJlY29yZDxIdWRQYW5lbFR5cGUsIHN0cmluZz4gPSB7XG4gICAgcHJpc206ICdSRVNPTkFOQ0UgUFJJU00uIFVOSVQ6IEFMUEhBJyxcbiAgICB0dXJiaW5lOiAnT1JCSVRBTCBTUElORSBBLiBQUk9UT1RZUEUnLFxuICAgIGNvcmU6ICdDT1JFIFNZTkMuIE5FVVJBTCBBUkNISVRFQ1RVUkUnLFxuICAgIGJpb3NwaGVyZTogJ0VDT0xPR0lDQUwgQklPU1BIRVJFOiBDVVJFIElJJyxcbiAgICBuZXVyYWw6ICdBQ1RJVkUgTUVTSDogQ0xBU1MgTkVVUkFMIEFSUkFZJyxcbiAgfTtcblxuICBjdHguZmlsbFN0eWxlID0gJyNlMGYyZmUnO1xuICBjdHguZm9udCA9ICc3MDAgMjJweCBcIk91dGZpdFwiLCBzYW5zLXNlcmlmJztcbiAgY3R4LmZpbGxUZXh0KHRpdGxlc1twYW5lbFR5cGVdLCAzNCwgNDgpO1xuXG4gIC8vIFBhbmVsLXNwZWNpZmljIHZlY3RvciBncmFwaGljc1xuICBjdHguc2F2ZSgpO1xuICBjdHgudHJhbnNsYXRlKDM4NCwgMjc1KTtcblxuICBpZiAocGFuZWxUeXBlID09PSAncHJpc20nKSB7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyMzOGJkZjgnO1xuICAgIGN0eC5saW5lV2lkdGggPSAzO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDAsIC0xNTApO1xuICAgIGN0eC5saW5lVG8oLTE3MCwgMTEwKTtcbiAgICBjdHgubGluZVRvKDMwLCAxNDUpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjE4KSc7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygwLCAtMTUwKTtcbiAgICBjdHgubGluZVRvKDMwLCAxNDUpO1xuICAgIGN0eC5saW5lVG8oMTc1LCA5NSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyNTEsIDE5MSwgMzYsIDAuMjIpJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfSBlbHNlIGlmIChwYW5lbFR5cGUgPT09ICd0dXJiaW5lJykge1xuICAgIGZvciAobGV0IGkgPSAtMzsgaSA8PSAzOyBpKyspIHtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5lbGxpcHNlKGkgKiAzOCwgMCwgMzYsIDk1LCAwLjIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGkgPT09IDAgPyAnI2ZiYmYyNCcgOiAncmdiYSg1NiwgMTg5LCAyNDgsIDAuNzUpJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygtMTgwLCAwKTtcbiAgICBjdHgubGluZVRvKDE4MCwgMCk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyMzOGJkZjgnO1xuICAgIGN0eC5saW5lV2lkdGggPSAzO1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfSBlbHNlIGlmIChwYW5lbFR5cGUgPT09ICdjb3JlJykge1xuICAgIGZvciAobGV0IHIgPSAtMTIwOyByIDw9IDEyMDsgciArPSA0MCkge1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjU1KSc7XG4gICAgICBjdHguc3Ryb2tlUmVjdCgtMjYwLCByLCA1MjAsIDI2KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocGFuZWxUeXBlID09PSAnYmlvc3BoZXJlJykge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKC02NSwgLTE0MCk7XG4gICAgY3R4LmJlemllckN1cnZlVG8oLTMwLCAtNDAsIC0xMTAsIDQwLCAtODUsIDEzMCk7XG4gICAgY3R4LmxpbmVUbyg4NSwgMTMwKTtcbiAgICBjdHguYmV6aWVyQ3VydmVUbygxMTAsIDQwLCAzMCwgLTQwLCA2NSwgLTE0MCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgxNiwgMTg1LCAxMjksIDAuMjgpJztcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNmVlN2I3JztcbiAgICBjdHgubGluZVdpZHRoID0gMy41O1xuICAgIGN0eC5zdHJva2UoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgY29uc3QgYnggPSBNYXRoLnNpbihpICogMi4xKSAqIDQ4O1xuICAgICAgY29uc3QgYnkgPSA0MCArIE1hdGguY29zKGkgKiAxLjcpICogNTU7XG4gICAgICBjdHguZmlsbFN0eWxlID1cbiAgICAgICAgaSAlIDIgPT09IDAgPyAncmdiYSg1MiwgMjExLCAxNTMsIDAuNyknIDogJ3JnYmEoMTYzLCAyMzAsIDUzLCAwLjY1KSc7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKGJ4LCBieSwgMTggKyAoaSAlIDEwKSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAocGFuZWxUeXBlID09PSAnbmV1cmFsJykge1xuICAgIGNvbnN0IG5vZGVzOiBbbnVtYmVyLCBudW1iZXJdW10gPSBbXTtcbiAgICBmb3IgKGxldCByaW5nID0gMTsgcmluZyA8PSAyOyByaW5nKyspIHtcbiAgICAgIGNvbnN0IGNvdW50ID0gcmluZyAqIDY7XG4gICAgICBjb25zdCByYWQgPSByaW5nICogNzI7XG4gICAgICBmb3IgKGxldCBrID0gMDsgayA8IGNvdW50OyBrKyspIHtcbiAgICAgICAgY29uc3QgYW5nID0gKGsgLyBjb3VudCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgbm9kZXMucHVzaChbTWF0aC5jb3MoYW5nKSAqIHJhZCwgTWF0aC5zaW4oYW5nKSAqIHJhZF0pO1xuICAgICAgfVxuICAgIH1cbiAgICBub2Rlcy5wdXNoKFswLCAwXSk7XG5cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSg1NiwgMTg5LCAyNDgsIDAuNDUpJztcbiAgICBjdHgubGluZVdpZHRoID0gMS41O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSBpICsgMTsgaiA8IG5vZGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGNvbnN0IGR4ID0gbm9kZXNbaV1bMF0gLSBub2Rlc1tqXVswXTtcbiAgICAgICAgY29uc3QgZHkgPSBub2Rlc1tpXVsxXSAtIG5vZGVzW2pdWzFdO1xuICAgICAgICBpZiAoTWF0aC5oeXBvdChkeCwgZHkpIDwgMTE1KSB7XG4gICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgIGN0eC5tb3ZlVG8obm9kZXNbaV1bMF0sIG5vZGVzW2ldWzFdKTtcbiAgICAgICAgICBjdHgubGluZVRvKG5vZGVzW2pdWzBdLCBub2Rlc1tqXVsxXSk7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIG5vZGVzLmZvckVhY2goKFtueCwgbnldLCBpZHgpID0+IHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBpZHggJSAzID09PSAwID8gJyNmYmJmMjQnIDogJyMzOGJkZjgnO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhueCwgbnksIDcsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgfSk7XG4gIH1cblxuICBjdHgucmVzdG9yZSgpO1xuXG4gIC8vIEJvdHRvbSB0ZWNobmljYWwgcmVhZG91dFxuICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMTQ4LCAxNjMsIDE4NCwgMC45KSc7XG4gIGN0eC5mb250ID0gJzQwMCAxNXB4IFwiSmV0QnJhaW5zIE1vbm9cIiwgbW9ub3NwYWNlJztcbiAgY3R4LmZpbGxUZXh0KFxuICAgICdERVBUSCBMT0NLOiA5OS40JSAgwrcgIFNILVBST0JFOiBBQ1RJVkUgIMK3ICA2RG9GIFBBUkFMTEFYJyxcbiAgICAzNCxcbiAgICA0NzZcbiAgKTtcblxuICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgdGV4dHVyZS5jb2xvclNwYWNlID0gVEhSRUUuU1JHQkNvbG9yU3BhY2U7XG4gIHRleHR1cmUuYW5pc290cm9weSA9IG1heEFuaXNvdHJvcHk7XG4gIHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuICByZXR1cm4gdGV4dHVyZTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgaGlnaC1yZXNvbHV0aW9uIHJlcGVhdGFibGUgcHJvY2VkdXJhbCBhcmNoaXRlY3R1cmFsIGZhY2FkZSB0ZXh0dXJlc1xuICogKGN1cnRhaW4gd2FsbCBnbGFzcywgYnJ1c2hlZCB0aXRhbml1bSAmIGdvbGQgZGlhZ3JpZCwgYnJ1dGFsaXN0IEJJTSBjb25jcmV0ZSwgY2FyYm9uLXNhcHBoaXJlIGNvbXBvc2l0ZSlcbiAqIGZvciBhcHBseWluZyBkaXJlY3RseSBvbnRvIHRoZSAzRCBza3lzY3JhcGVyIG1vZGVscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUFyY2hpdGVjdHVyYWxGYWNhZGVUZXh0dXJlKFxuICBtYXhBbmlzb3Ryb3B5OiBudW1iZXIsXG4gIHByZXNldDogQnVpbGRpbmdUZXh0dXJlUHJlc2V0T3B0aW9uXG4pOiBUSFJFRS5DYW52YXNUZXh0dXJlIHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGNhbnZhcy53aWR0aCA9IDUxMjtcbiAgY2FudmFzLmhlaWdodCA9IDUxMjtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xuXG4gIGlmIChwcmVzZXQgPT09ICdGYXNhZGEgU3prbGFuYSBSZWZsZWtzeWpuYSAoU2t5c2NyYXBlciBDdXJ0YWluIFdhbGwpJykge1xuICAgIC8vIERlZXAgc2FwcGhpcmUgcmVmbGVjdGl2ZSBjdXJ0YWluLXdhbGwgZ2xhemluZyB3aXRoIHdhcm0gJiBjeWFuIGlsbHVtaW5hdGVkIG9mZmljZSBiYXlzIGFuZCBhbHVtaW51bSBtdWxsaW9uc1xuICAgIGNvbnN0IGdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgNTEyLCA1MTIpO1xuICAgIGdyYWQuYWRkQ29sb3JTdG9wKDAsICcjMDcxYjM0Jyk7XG4gICAgZ3JhZC5hZGRDb2xvclN0b3AoMC41LCAnIzBjMmQ1MicpO1xuICAgIGdyYWQuYWRkQ29sb3JTdG9wKDEsICcjMDYxNjI5Jyk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGdyYWQ7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIDUxMiwgNTEyKTtcblxuICAgIGNvbnN0IGNvbHMgPSA4O1xuICAgIGNvbnN0IHJvd3MgPSAxNjtcbiAgICBjb25zdCBjZWxsVyA9IDUxMiAvIGNvbHM7XG4gICAgY29uc3QgY2VsbEggPSA1MTIgLyByb3dzO1xuXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCByb3dzOyByKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgY29sczsgYysrKSB7XG4gICAgICAgIGNvbnN0IHNlZWQgPSBNYXRoLnNpbihyICogMTIuOTg5OCArIGMgKiA3OC4yMzMpICogNDM3NTguNTQ1MztcbiAgICAgICAgY29uc3QgZnJhYyA9IHNlZWQgLSBNYXRoLmZsb29yKHNlZWQpO1xuXG4gICAgICAgIGlmIChmcmFjID4gMC42Mikge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPVxuICAgICAgICAgICAgZnJhYyA+IDAuODRcbiAgICAgICAgICAgICAgPyAncmdiYSgyNTMsIDIyNCwgNzEsIDAuODUpJ1xuICAgICAgICAgICAgICA6ICdyZ2JhKDEyNSwgMjExLCAyNTIsIDAuNzgpJztcbiAgICAgICAgfSBlbHNlIGlmIChmcmFjID4gMC4zMikge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgzMCwgNjQsIDExNSwgMC42NSknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgxMCwgMjUsIDQ4LCAwLjg1KSc7XG4gICAgICAgIH1cblxuICAgICAgICBjdHguZmlsbFJlY3QoYyAqIGNlbGxXICsgNCwgciAqIGNlbGxIICsgMywgY2VsbFcgLSA4LCBjZWxsSCAtIDYpO1xuXG4gICAgICAgIC8vIE1ldGFsbGljIHNwYW5kcmVsIGJhbmQgJiB2ZXJ0aWNhbCBtdWxsaW9uIGZyYW1lXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDE4NiwgMjMwLCAyNTMsIDAuNyknO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoYyAqIGNlbGxXICsgMiwgciAqIGNlbGxIICsgMSwgY2VsbFcgLSA0LCBjZWxsSCAtIDIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERpYWdvbmFsIHN0cnVjdHVyYWwgd2luZC1icmFjaW5nIG1lZ2EtdHJ1c3NcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSg1NiwgMTg5LCAyNDgsIDAuOSknO1xuICAgIGN0eC5saW5lV2lkdGggPSA2O1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKDAsIDApO1xuICAgIGN0eC5saW5lVG8oNTEyLCA1MTIpO1xuICAgIGN0eC5tb3ZlVG8oNTEyLCAwKTtcbiAgICBjdHgubGluZVRvKDAsIDUxMik7XG4gICAgY3R4LnN0cm9rZSgpO1xuICB9IGVsc2UgaWYgKHByZXNldCA9PT0gJ1R5dGFuIGkgU3pjem90a293YW5lIFrFgm90byAoUGFyYW1ldHJpYyBNZXRhbCknKSB7XG4gICAgLy8gQW5vZGl6ZWQgdGl0YW5pdW0gbWV0YWxsaWMgcGxhdGVzIHdpdGggd2FybSBicnVzaGVkIGdvbGQgcGFyYW1ldHJpYyBkaWFncmlkIHJpYnNcbiAgICBjb25zdCBiZyA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCA1MTIsIDApO1xuICAgIGJnLmFkZENvbG9yU3RvcCgwLCAnIzFlMjQzMCcpO1xuICAgIGJnLmFkZENvbG9yU3RvcCgwLjUsICcjMzMzZDRmJyk7XG4gICAgYmcuYWRkQ29sb3JTdG9wKDEsICcjMWEyMDJjJyk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGJnO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCA1MTIsIDUxMik7XG5cbiAgICAvLyBGaW5lIGhvcml6b250YWwgYnJ1c2hlZCBtZXRhbCBncmFpblxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgNTEyOyB5ICs9IDIpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPVxuICAgICAgICB5ICUgNCA9PT0gMCA/ICdyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpJyA6ICdyZ2JhKDAsMCwwLDAuMDgpJztcbiAgICAgIGN0eC5maWxsUmVjdCgwLCB5LCA1MTIsIDEpO1xuICAgIH1cblxuICAgIC8vIEhvcml6b250YWwgZ29sZCBmbG9vciBiYW5kc1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDw9IDUxMjsgeSArPSAzMikge1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDI1MSwgMTkxLCAzNiwgMC44OCknO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIHkgLSAyLCA1MTIsIDQpO1xuICAgIH1cblxuICAgIC8vIFBhcmFtZXRyaWMgYnJ1c2hlZCBnb2xkIGRpYW1vbmQgZGlhZ3JpZFxuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmJiZjI0JztcbiAgICBjdHgubGluZVdpZHRoID0gNztcbiAgICBjb25zdCBzdGVwID0gMTI4O1xuICAgIGZvciAobGV0IGkgPSAtNTEyOyBpIDw9IDEwMjQ7IGkgKz0gc3RlcCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhpLCAwKTtcbiAgICAgIGN0eC5saW5lVG8oaSArIDUxMiwgNTEyKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhpICsgNTEyLCAwKTtcbiAgICAgIGN0eC5saW5lVG8oaSwgNTEyKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoXG4gICAgcHJlc2V0ID09PSAnQmV0b24gQXJjaGl0ZWt0b25pY3pueSBpIFJkemXFhCDFmndpZXRsbnkgKEJydXRhbGlzdCBCSU0pJ1xuICApIHtcbiAgICAvLyBUYWN0aWxlIGFyY2hpdGVjdHVyYWwgcHJlY2FzdCBjb25jcmV0ZSBzbGFicyB3aXRoIHJlY2Vzc2VkIGx1bWlub3VzIGFtYmVyL2N5YW4gQklNIGpvaW50c1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzM4M2U0OCc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIDUxMiwgNTEyKTtcblxuICAgIC8vIENvbmNyZXRlIG1pY3JvLXNwZWNrbGUgdGV4dHVyZVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjQwMDsgaSsrKSB7XG4gICAgICBjb25zdCB4ID0gKGkgKiA3MykgJSA1MTI7XG4gICAgICBjb25zdCB5ID0gKGkgKiAxMzkpICUgNTEyO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9XG4gICAgICAgIGkgJSAyID09PSAwID8gJ3JnYmEoMjU1LDI1NSwyNTUsMC4wNyknIDogJ3JnYmEoMTUsMjMsNDIsMC4xNCknO1xuICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIDMsIDMpO1xuICAgIH1cblxuICAgIC8vIEZvcm13b3JrIHBhbmVsIHNlYW1zIGFuZCB0aWUtcm9kIGhvbGVzXG4gICAgY29uc3Qgc2xhYkggPSA2NDtcbiAgICBjb25zdCBzbGFiVyA9IDEyODtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDUxMjsgeSArPSBzbGFiSCkge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCA1MTI7IHggKz0gc2xhYlcpIHtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyMxZTI5M2InO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMztcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoeCwgeSwgc2xhYlcsIHNsYWJIKTtcblxuICAgICAgICAvLyBUaWUtcm9kIGFyY2hpdGVjdHVyYWwgaW5kZW50c1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJyMwZjE3MmEnO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoeCArIDE2LCB5ICsgc2xhYkggLyAyLCA0LCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5hcmMoeCArIHNsYWJXIC0gMTYsIHkgKyBzbGFiSCAvIDIsIDQsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIH1cblxuICAgICAgLy8gR2xvd2luZyBob3Jpem9udGFsIEJJTSBjb3JlIHNsaXRcbiAgICAgIGN0eC5maWxsU3R5bGUgPSB5ICUgMTI4ID09PSAwID8gJyMzOGJkZjgnIDogJyNmNTllMGInO1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIHkgKyBzbGFiSCAtIDUsIDUxMiwgMyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHByZXNldCA9PT0gJ0thcmJvbm93by1TemFmaXJvd3kgS29tcG96eXQgKEN5YmVyLUZhY2FkZSknKSB7XG4gICAgLy8gRGFyayBjYXJib24gd2VhdmUgd2l0aCBlbGVjdHJpYyBzYXBwaGlyZSBhbmQgdmlvbGV0IG5lb24gc3RydWN0dXJhbCB2ZWluc1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzA3MGIxNCc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIDUxMiwgNTEyKTtcblxuICAgIGNvbnN0IHRpbGUgPSAxNjtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IDUxMjsgeSArPSB0aWxlKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IDUxMjsgeCArPSB0aWxlKSB7XG4gICAgICAgIGNvbnN0IG9kZCA9ICh4IC8gdGlsZSArIHkgLyB0aWxlKSAlIDIgPT09IDA7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBvZGQgPyAnIzExMWEyZScgOiAnIzA5MGYxZCc7XG4gICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCB0aWxlLCB0aWxlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHbG93aW5nIGhleGFnb25hbCAvIGRpYW1vbmQgY3liZXItdmVpbnNcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnIzAwZjBmZic7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDQ7XG4gICAgY29uc3Qgc3RlcCA9IDY0O1xuICAgIGZvciAobGV0IGkgPSAtNTEyOyBpIDw9IDEwMjQ7IGkgKz0gc3RlcCkge1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhpLCAwKTtcbiAgICAgIGN0eC5saW5lVG8oaSArIDUxMiwgNTEyKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG5cbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2E4NTVmNyc7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPD0gNTEyOyB5ICs9IDY0KSB7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDAsIHkpO1xuICAgICAgY3R4LmxpbmVUbyg1MTIsIHkpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBEZWZhdWx0IEhvbG9ncmFtIERpYWdyaWRcbiAgICByZXR1cm4gY3JlYXRlRGlhZ3JpZEZhY2FkZVRleHR1cmUoXG4gICAgICBtYXhBbmlzb3Ryb3B5LFxuICAgICAgJ0RpYWdyaWQgRXhvc2tlbGV0b24gKyBSZHplxYQgQklNJ1xuICAgICk7XG4gIH1cblxuICBjb25zdCB0ZXh0dXJlID0gbmV3IFRIUkVFLkNhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgdGV4dHVyZS5jb2xvclNwYWNlID0gVEhSRUUuU1JHQkNvbG9yU3BhY2U7XG4gIHRleHR1cmUud3JhcFMgPSBUSFJFRS5SZXBlYXRXcmFwcGluZztcbiAgdGV4dHVyZS53cmFwVCA9IFRIUkVFLlJlcGVhdFdyYXBwaW5nO1xuICB0ZXh0dXJlLmFuaXNvdHJvcHkgPSBtYXhBbmlzb3Ryb3B5O1xuICB0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgcmV0dXJuIHRleHR1cmU7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIHRoZSBnbG93aW5nIGN5YW4gcmFkYXIvZ2xvYmUgVUkgdGV4dHVyZSBmb3IgdGhlIGludGVyYWN0aXZlIFNtYXJ0IFRhYmxldFxuICogcmVzdGluZyBvbiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgY29uZmVyZW5jZSB0YWJsZSBpbiB6ZGouXzIucG5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU21hcnRUYWJsZXRUZXh0dXJlKFxuICBtYXhBbmlzb3Ryb3B5OiBudW1iZXJcbik6IFRIUkVFLkNhbnZhc1RleHR1cmUge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY2FudmFzLndpZHRoID0gNTEyO1xuICBjYW52YXMuaGVpZ2h0ID0gMzg0O1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG5cbiAgY3R4LmZpbGxTdHlsZSA9ICcjMDQxMDFmJztcbiAgY3R4LmZpbGxSZWN0KDAsIDAsIDUxMiwgMzg0KTtcblxuICBjdHguc3Ryb2tlU3R5bGUgPSAnIzM4YmRmOCc7XG4gIGN0eC5saW5lV2lkdGggPSA0O1xuICBjdHguc3Ryb2tlUmVjdCgxMCwgMTAsIDQ5MiwgMzY0KTtcblxuICAvLyBDaXJjdWxhciByYWRhciAvIGdsb2JlIG9uIGxlZnQgb2YgdGFibGV0IHNjcmVlblxuICBjb25zdCBjeCA9IDE2NTtcbiAgY29uc3QgY3kgPSAxOTI7XG4gIFs0MiwgNzYsIDExMl0uZm9yRWFjaCgociwgaWR4KSA9PiB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmMoY3gsIGN5LCByLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID1cbiAgICAgIGlkeCA9PT0gMiA/ICcjMzhiZGY4JyA6ICdyZ2JhKDU2LCAxODksIDI0OCwgMC40NSknO1xuICAgIGN0eC5saW5lV2lkdGggPSBpZHggPT09IDIgPyAzIDogMS41O1xuICAgIGN0eC5zdHJva2UoKTtcbiAgfSk7XG5cbiAgLy8gR2xvd2luZyBjeWFuIHJhZGFyIHNlY3RvclxuICBjdHguYmVnaW5QYXRoKCk7XG4gIGN0eC5tb3ZlVG8oY3gsIGN5KTtcbiAgY3R4LmFyYyhjeCwgY3ksIDEwOCwgLTAuNiwgMC40KTtcbiAgY3R4LmNsb3NlUGF0aCgpO1xuICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMzQsIDIxMSwgMjM4LCAwLjM1KSc7XG4gIGN0eC5maWxsKCk7XG5cbiAgLy8gUmlnaHQgc2lkZSB0ZWxlbWV0cnkgYmFycyBvbiB0YWJsZXRcbiAgY3R4LmZpbGxTdHlsZSA9ICcjZTBmMmZlJztcbiAgY3R4LmZvbnQgPSAnNzAwIDE4cHggXCJKZXRCcmFpbnMgTW9ub1wiLCBtb25vc3BhY2UnO1xuICBjdHguZmlsbFRleHQoJ1RBQkxFVCBTWU5DIMK3IDZEb0YnLCAzMDAsIDY4KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgIGNvbnN0IHJ5ID0gMTA0ICsgaSAqIDQwO1xuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSg1NiwgMTg5LCAyNDgsIDAuMjUpJztcbiAgICBjdHguZmlsbFJlY3QoMzAwLCByeSwgMTc1LCAxOCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGkgJSAyID09PSAwID8gJyMzOGJkZjgnIDogJyM3ZGQzZmMnO1xuICAgIGN0eC5maWxsUmVjdCgzMDAsIHJ5LCA2NSArICgoaSAqIDM3KSAlIDEwNSksIDE4KTtcbiAgfVxuXG4gIGNvbnN0IHRleHR1cmUgPSBuZXcgVEhSRUUuQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICB0ZXh0dXJlLmNvbG9yU3BhY2UgPSBUSFJFRS5TUkdCQ29sb3JTcGFjZTtcbiAgdGV4dHVyZS5hbmlzb3Ryb3B5ID0gbWF4QW5pc290cm9weTtcbiAgdGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gIHJldHVybiB0ZXh0dXJlO1xufVxuXG5cblxuIl19