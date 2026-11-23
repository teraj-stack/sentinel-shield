/**
* Procedurally generates high-fidelity sample images and accurate depth maps
* using pure HTML5 2D Canvas so there are ZERO external network dependencies or 404s.
*/
// 1. Cinematic Neon Portrait
function createPortraitPreset() {
	const w = 800;
	const h = 1e3;
	// Color canvas
	const cCanvas = document.createElement("canvas");
	cCanvas.width = w;
	cCanvas.height = h;
	const cCtx = cCanvas.getContext("2d");
	// Depth canvas
	const dCanvas = document.createElement("canvas");
	dCanvas.width = w;
	dCanvas.height = h;
	const dCtx = dCanvas.getContext("2d");
	// Background
	const bgGrad = cCtx.createRadialGradient(w * .5, h * .4, 50, w * .5, h * .5, 600);
	bgGrad.addColorStop(0, "#1e1b4b");
	bgGrad.addColorStop(.5, "#0f172a");
	bgGrad.addColorStop(1, "#020617");
	cCtx.fillStyle = bgGrad;
	cCtx.fillRect(0, 0, w, h);
	// Background bokeh lights
	for (let i = 0; i < 25; i++) {
		const bx = (Math.sin(i * 1.7) * .5 + .5) * w;
		const by = (Math.cos(i * 2.3) * .4 + .3) * h;
		const br = 20 + i % 5 * 15;
		const bGrad = cCtx.createRadialGradient(bx, by, 0, bx, by, br);
		const hue = i * 45 % 360;
		bGrad.addColorStop(0, `hsla(${hue}, 80%, 65%, 0.4)`);
		bGrad.addColorStop(1, `hsla(${hue}, 80%, 50%, 0)`);
		cCtx.fillStyle = bGrad;
		cCtx.beginPath();
		cCtx.arc(bx, by, br, 0, Math.PI * 2);
		cCtx.fill();
	}
	// Depth for background
	dCtx.fillStyle = "#151515";
	dCtx.fillRect(0, 0, w, h);
	// Torso / Shoulders
	cCtx.fillStyle = "#0b0f19";
	cCtx.beginPath();
	cCtx.moveTo(w * .1, h);
	cCtx.bezierCurveTo(w * .15, h * .65, w * .35, h * .62, w * .4, h * .6);
	cCtx.lineTo(w * .6, h * .6);
	cCtx.bezierCurveTo(w * .65, h * .62, w * .85, h * .65, w * .9, h);
	cCtx.closePath();
	cCtx.fill();
	// Depth for Torso
	dCtx.fillStyle = "#b0b0b0";
	dCtx.beginPath();
	dCtx.moveTo(w * .1, h);
	dCtx.bezierCurveTo(w * .15, h * .65, w * .35, h * .62, w * .4, h * .6);
	dCtx.lineTo(w * .6, h * .6);
	dCtx.bezierCurveTo(w * .65, h * .62, w * .85, h * .65, w * .9, h);
	dCtx.closePath();
	dCtx.fill();
	// Neck
	cCtx.fillStyle = "#e29d7e";
	cCtx.fillRect(w * .42, h * .48, w * .16, h * .15);
	dCtx.fillStyle = "#cccccc";
	dCtx.fillRect(w * .42, h * .48, w * .16, h * .15);
	// Head / Face silhouette
	const faceCx = w * .5;
	const faceCy = h * .4;
	const faceRx = w * .18;
	const faceRy = h * .19;
	// Face color
	const skinGrad = cCtx.createLinearGradient(faceCx - faceRx, faceCy, faceCx + faceRx, faceCy);
	skinGrad.addColorStop(0, "#f472b6");
	skinGrad.addColorStop(.25, "#fb923c");
	skinGrad.addColorStop(.5, "#fbcfe8");
	skinGrad.addColorStop(.85, "#38bdf8");
	skinGrad.addColorStop(1, "#0284c7");
	cCtx.fillStyle = skinGrad;
	cCtx.beginPath();
	cCtx.ellipse(faceCx, faceCy, faceRx, faceRy, 0, 0, Math.PI * 2);
	cCtx.fill();
	// Depth for head (convex dome: brightest at nose/center, darker at edges)
	const faceDepthGrad = dCtx.createRadialGradient(faceCx, faceCy - 10, 10, faceCx, faceCy, faceRx * 1.1);
	faceDepthGrad.addColorStop(0, "#ffffff");
	faceDepthGrad.addColorStop(.6, "#e8e8e8");
	faceDepthGrad.addColorStop(1, "#a8a8a8");
	dCtx.fillStyle = faceDepthGrad;
	dCtx.beginPath();
	dCtx.ellipse(faceCx, faceCy, faceRx, faceRy, 0, 0, Math.PI * 2);
	dCtx.fill();
	// Sunglasses / Cyber Visor (popping out closest!)
	const visorY = faceCy - 15;
	const visorW = faceRx * 1.6;
	const visorH = 45;
	cCtx.fillStyle = "#0f172a";
	cCtx.beginPath();
	cCtx.roundRect(faceCx - visorW / 2, visorY - visorH / 2, visorW, visorH, 10);
	cCtx.fill();
	cCtx.lineWidth = 3;
	cCtx.strokeStyle = "#38bdf8";
	cCtx.stroke();
	// Visor reflection
	const visGrad = cCtx.createLinearGradient(faceCx - visorW / 2, visorY, faceCx + visorW / 2, visorY);
	visGrad.addColorStop(.1, "rgba(236, 72, 153, 0.6)");
	visGrad.addColorStop(.5, "rgba(56, 189, 248, 0.8)");
	visGrad.addColorStop(.9, "rgba(168, 85, 247, 0.5)");
	cCtx.fillStyle = visGrad;
	cCtx.beginPath();
	cCtx.roundRect(faceCx - visorW / 2 + 4, visorY - visorH / 2 + 4, visorW - 8, visorH - 8, 8);
	cCtx.fill();
	// Depth for visor (ultra close)
	dCtx.fillStyle = "#ffffff";
	dCtx.beginPath();
	dCtx.roundRect(faceCx - visorW / 2, visorY - visorH / 2, visorW, visorH, 10);
	dCtx.fill();
	// Stylized hair
	cCtx.fillStyle = "#1e1b4b";
	cCtx.beginPath();
	cCtx.arc(faceCx, faceCy - 40, faceRx * 1.08, Math.PI * .8, Math.PI * 2.2);
	cCtx.fill();
	return {
		imageUrl: cCanvas.toDataURL("image/jpeg", .92),
		depthUrl: dCanvas.toDataURL("image/png"),
		width: w,
		height: h
	};
}
// 2. Majestic Mountain Landscape & Lake
function createLandscapePreset() {
	const w = 1024;
	const h = 680;
	const cCanvas = document.createElement("canvas");
	cCanvas.width = w;
	cCanvas.height = h;
	const cCtx = cCanvas.getContext("2d");
	const dCanvas = document.createElement("canvas");
	dCanvas.width = w;
	dCanvas.height = h;
	const dCtx = dCanvas.getContext("2d");
	// Sky
	const skyGrad = cCtx.createLinearGradient(0, 0, 0, h * .55);
	skyGrad.addColorStop(0, "#0f172a");
	skyGrad.addColorStop(.4, "#ea580c");
	skyGrad.addColorStop(.7, "#fbbf24");
	skyGrad.addColorStop(1, "#fde68a");
	cCtx.fillStyle = skyGrad;
	cCtx.fillRect(0, 0, w, h * .55);
	// Depth for sky (infinitely far = near 0)
	dCtx.fillStyle = "#080808";
	dCtx.fillRect(0, 0, w, h * .55);
	// Glowing Sun
	const sunX = w * .65;
	const sunY = h * .32;
	const sunGrad = cCtx.createRadialGradient(sunX, sunY, 5, sunX, sunY, 90);
	sunGrad.addColorStop(0, "#ffffff");
	sunGrad.addColorStop(.4, "#fed7aa");
	sunGrad.addColorStop(1, "rgba(251, 191, 36, 0)");
	cCtx.fillStyle = sunGrad;
	cCtx.beginPath();
	cCtx.arc(sunX, sunY, 90, 0, Math.PI * 2);
	cCtx.fill();
	// Distant Mountain Ridge 1
	cCtx.fillStyle = "#475569";
	dCtx.fillStyle = "#303030";
	cCtx.beginPath();
	dCtx.beginPath();
	cCtx.moveTo(0, h * .45);
	dCtx.moveTo(0, h * .45);
	const peaks1 = [
		[.1, .28],
		[.22, .38],
		[.35, .22],
		[.48, .35],
		[.6, .25],
		[.75, .32],
		[.88, .2],
		[1, .38]
	];
	peaks1.forEach(([px, py]) => {
		cCtx.lineTo(w * px, h * py);
		dCtx.lineTo(w * px, h * py);
	});
	cCtx.lineTo(w, h * .55);
	cCtx.lineTo(0, h * .55);
	dCtx.lineTo(w, h * .55);
	dCtx.lineTo(0, h * .55);
	cCtx.fill();
	dCtx.fill();
	// Midground Mountain Ridge 2
	cCtx.fillStyle = "#1e293b";
	dCtx.fillStyle = "#656565";
	cCtx.beginPath();
	dCtx.beginPath();
	cCtx.moveTo(0, h * .55);
	dCtx.moveTo(0, h * .55);
	const peaks2 = [
		[.15, .38],
		[.3, .48],
		[.5, .35],
		[.7, .42],
		[.85, .36],
		[1, .48]
	];
	peaks2.forEach(([px, py]) => {
		cCtx.lineTo(w * px, h * py);
		dCtx.lineTo(w * px, h * py);
	});
	cCtx.lineTo(w, h * .55);
	cCtx.lineTo(0, h * .55);
	dCtx.lineTo(w, h * .55);
	dCtx.lineTo(0, h * .55);
	cCtx.fill();
	dCtx.fill();
	// Pine tree silhouettes along midground ridge
	cCtx.fillStyle = "#0f172a";
	dCtx.fillStyle = "#808080";
	for (let i = 0; i < 40; i++) {
		const tx = i / 40 * w;
		const ty = h * .52 - Math.sin(i * .3) * 20;
		const th = 25 + i % 7 * 4;
		cCtx.beginPath();
		dCtx.beginPath();
		cCtx.moveTo(tx - 6, ty);
		cCtx.lineTo(tx, ty - th);
		cCtx.lineTo(tx + 6, ty);
		cCtx.closePath();
		dCtx.moveTo(tx - 6, ty);
		dCtx.lineTo(tx, ty - th);
		dCtx.lineTo(tx + 6, ty);
		dCtx.closePath();
		cCtx.fill();
		dCtx.fill();
	}
	// Mirror Lake
	const lakeGrad = cCtx.createLinearGradient(0, h * .55, 0, h);
	lakeGrad.addColorStop(0, "#1e293b");
	lakeGrad.addColorStop(.3, "#334155");
	lakeGrad.addColorStop(1, "#0284c7");
	cCtx.fillStyle = lakeGrad;
	cCtx.fillRect(0, h * .55, w, h * .45);
	// Depth for lake (ramp from 0.4 at horizon up to 0.9 at foreground)
	const lakeDepthGrad = dCtx.createLinearGradient(0, h * .55, 0, h);
	lakeDepthGrad.addColorStop(0, "#555555");
	lakeDepthGrad.addColorStop(1, "#e5e5e5");
	dCtx.fillStyle = lakeDepthGrad;
	dCtx.fillRect(0, h * .55, w, h * .45);
	// Foreground rocks and dock (very close foreground)
	cCtx.fillStyle = "#1c1917";
	dCtx.fillStyle = "#ffffff";
	cCtx.beginPath();
	dCtx.beginPath();
	cCtx.moveTo(0, h);
	cCtx.lineTo(w * .35, h);
	cCtx.lineTo(w * .25, h * .82);
	cCtx.lineTo(0, h * .78);
	cCtx.closePath();
	dCtx.moveTo(0, h);
	dCtx.lineTo(w * .35, h);
	dCtx.lineTo(w * .25, h * .82);
	dCtx.lineTo(0, h * .78);
	dCtx.closePath();
	cCtx.fill();
	dCtx.fill();
	return {
		imageUrl: cCanvas.toDataURL("image/jpeg", .92),
		depthUrl: dCanvas.toDataURL("image/png"),
		width: w,
		height: h
	};
}
// 3. Cyberpunk Street with Vanishing Perspective
function createCyberpunkPreset() {
	const w = 900;
	const h = 700;
	const cCanvas = document.createElement("canvas");
	cCanvas.width = w;
	cCanvas.height = h;
	const cCtx = cCanvas.getContext("2d");
	const dCanvas = document.createElement("canvas");
	dCanvas.width = w;
	dCanvas.height = h;
	const dCtx = dCanvas.getContext("2d");
	const vpX = w * .5;
	const vpY = h * .42;
	// Sky / Deep city backdrop
	cCtx.fillStyle = "#050510";
	cCtx.fillRect(0, 0, w, h);
	dCtx.fillStyle = "#101010";
	dCtx.fillRect(0, 0, w, h);
	// Road
	cCtx.beginPath();
	cCtx.moveTo(0, h);
	cCtx.lineTo(w, h);
	cCtx.lineTo(vpX + 40, vpY);
	cCtx.lineTo(vpX - 40, vpY);
	cCtx.closePath();
	const roadGrad = cCtx.createLinearGradient(0, h, 0, vpY);
	roadGrad.addColorStop(0, "#181824");
	roadGrad.addColorStop(.5, "#0d0d18");
	roadGrad.addColorStop(1, "#05050f");
	cCtx.fillStyle = roadGrad;
	cCtx.fill();
	// Depth for road
	const roadDGrad = dCtx.createLinearGradient(0, h, 0, vpY);
	roadDGrad.addColorStop(0, "#ffffff");
	roadDGrad.addColorStop(1, "#252525");
	dCtx.fillStyle = roadDGrad;
	dCtx.beginPath();
	dCtx.moveTo(0, h);
	dCtx.lineTo(w, h);
	dCtx.lineTo(vpX + 40, vpY);
	dCtx.lineTo(vpX - 40, vpY);
	dCtx.closePath();
	dCtx.fill();
	// Left Building Façade
	cCtx.beginPath();
	cCtx.moveTo(0, 0);
	cCtx.lineTo(vpX - 40, vpY - 60);
	cCtx.lineTo(vpX - 40, vpY);
	cCtx.lineTo(0, h);
	cCtx.closePath();
	cCtx.fillStyle = "#111827";
	cCtx.fill();
	// Left Building Depth
	const leftDGrad = dCtx.createLinearGradient(0, h / 2, vpX - 40, vpY);
	leftDGrad.addColorStop(0, "#e0e0e0");
	leftDGrad.addColorStop(1, "#282828");
	dCtx.fillStyle = leftDGrad;
	dCtx.beginPath();
	dCtx.moveTo(0, 0);
	dCtx.lineTo(vpX - 40, vpY - 60);
	dCtx.lineTo(vpX - 40, vpY);
	dCtx.lineTo(0, h);
	dCtx.closePath();
	dCtx.fill();
	// Right Building Façade
	cCtx.beginPath();
	cCtx.moveTo(w, 0);
	cCtx.lineTo(vpX + 40, vpY - 80);
	cCtx.lineTo(vpX + 40, vpY);
	cCtx.lineTo(w, h);
	cCtx.closePath();
	cCtx.fillStyle = "#0f172a";
	cCtx.fill();
	const rightDGrad = dCtx.createLinearGradient(w, h / 2, vpX + 40, vpY);
	rightDGrad.addColorStop(0, "#e0e0e0");
	rightDGrad.addColorStop(1, "#282828");
	dCtx.fillStyle = rightDGrad;
	dCtx.beginPath();
	dCtx.moveTo(w, 0);
	dCtx.lineTo(vpX + 40, vpY - 80);
	dCtx.lineTo(vpX + 40, vpY);
	dCtx.lineTo(w, h);
	dCtx.closePath();
	dCtx.fill();
	// Neon Signs & Holograms
	// Left Neon: Pink Kanagawa bar sign
	cCtx.fillStyle = "#ec4899";
	cCtx.shadowColor = "#f43f5e";
	cCtx.shadowBlur = 15;
	cCtx.fillRect(60, 200, 30, 180);
	cCtx.shadowBlur = 0;
	// Right Neon: Cyan Cyber bar
	cCtx.fillStyle = "#06b6d4";
	cCtx.shadowColor = "#22d3ee";
	cCtx.shadowBlur = 20;
	cCtx.fillRect(w - 140, 150, 45, 130);
	cCtx.shadowBlur = 0;
	// Wet pavement reflections
	for (let r = 0; r < 12; r++) {
		const rx = vpX + Math.sin(r * 2.1) * .4 * w;
		const ry = vpY + r / 12 * (h - vpY);
		const rw = 20 + r * 15;
		const rh = 4;
		cCtx.fillStyle = r % 2 === 0 ? "rgba(236, 72, 153, 0.5)" : "rgba(6, 182, 212, 0.5)";
		cCtx.fillRect(rx - rw / 2, ry, rw, rh);
	}
	// Futuristic Hovercar in midground/foreground
	const carX = vpX - 60;
	const carY = h * .65;
	const carW = 180;
	const carH = 70;
	cCtx.fillStyle = "#e11d48";
	cCtx.beginPath();
	cCtx.roundRect(carX, carY, carW, carH, 12);
	cCtx.fill();
	// Car headlights
	cCtx.fillStyle = "#38bdf8";
	cCtx.shadowColor = "#38bdf8";
	cCtx.shadowBlur = 25;
	cCtx.beginPath();
	cCtx.arc(carX + 25, carY + carH * .5, 12, 0, Math.PI * 2);
	cCtx.arc(carX + carW - 25, carY + carH * .5, 12, 0, Math.PI * 2);
	cCtx.fill();
	cCtx.shadowBlur = 0;
	// Car depth (very prominent 3D pop!)
	dCtx.fillStyle = "#f5f5f5";
	dCtx.beginPath();
	dCtx.roundRect(carX, carY, carW, carH, 12);
	dCtx.fill();
	return {
		imageUrl: cCanvas.toDataURL("image/jpeg", .92),
		depthUrl: dCanvas.toDataURL("image/png"),
		width: w,
		height: h
	};
}
// 4. Macro Botanical Exotic Leaf & Dewdrops
function createMacroPreset() {
	const w = 800;
	const h = 800;
	const cCanvas = document.createElement("canvas");
	cCanvas.width = w;
	cCanvas.height = h;
	const cCtx = cCanvas.getContext("2d");
	const dCanvas = document.createElement("canvas");
	dCanvas.width = w;
	dCanvas.height = h;
	const dCtx = dCanvas.getContext("2d");
	// Deep forest background
	const bg = cCtx.createLinearGradient(0, 0, w, h);
	bg.addColorStop(0, "#064e3b");
	bg.addColorStop(.5, "#022c22");
	bg.addColorStop(1, "#052e16");
	cCtx.fillStyle = bg;
	cCtx.fillRect(0, 0, w, h);
	dCtx.fillStyle = "#202020";
	dCtx.fillRect(0, 0, w, h);
	// Bokeh orbs
	for (let i = 0; i < 15; i++) {
		const ox = i * 97 % w;
		const oy = i * 123 % h;
		const rad = 30 + i % 4 * 20;
		const bGrad = cCtx.createRadialGradient(ox, oy, 0, ox, oy, rad);
		bGrad.addColorStop(0, "rgba(110, 231, 183, 0.25)");
		bGrad.addColorStop(1, "rgba(16, 185, 129, 0)");
		cCtx.fillStyle = bGrad;
		cCtx.beginPath();
		cCtx.arc(ox, oy, rad, 0, Math.PI * 2);
		cCtx.fill();
	}
	// Giant hero leaf (diagonal curve)
	cCtx.fillStyle = "#10b981";
	dCtx.fillStyle = "#b8b8b8";
	cCtx.beginPath();
	dCtx.beginPath();
	cCtx.moveTo(w * .1, h * .9);
	cCtx.bezierCurveTo(w * .2, h * .2, w * .6, h * .1, w * .9, h * .3);
	cCtx.bezierCurveTo(w * .8, h * .7, w * .5, h * .9, w * .1, h * .9);
	cCtx.closePath();
	dCtx.moveTo(w * .1, h * .9);
	dCtx.bezierCurveTo(w * .2, h * .2, w * .6, h * .1, w * .9, h * .3);
	dCtx.bezierCurveTo(w * .8, h * .7, w * .5, h * .9, w * .1, h * .9);
	dCtx.closePath();
	cCtx.fill();
	dCtx.fill();
	// Leaf veins
	cCtx.strokeStyle = "#059669";
	cCtx.lineWidth = 4;
	cCtx.beginPath();
	cCtx.moveTo(w * .1, h * .9);
	cCtx.quadraticCurveTo(w * .45, h * .45, w * .9, h * .3);
	cCtx.stroke();
	// Giant crystal dewdrop (popping out dramatically in 3D foreground)
	const dropX = w * .52;
	const dropY = h * .48;
	const dropR = 55;
	const dropGrad = cCtx.createRadialGradient(dropX - 15, dropY - 15, 5, dropX, dropY, dropR);
	dropGrad.addColorStop(0, "#ffffff");
	dropGrad.addColorStop(.3, "#a7f3d0");
	dropGrad.addColorStop(.8, "#34d399");
	dropGrad.addColorStop(1, "#059669");
	cCtx.fillStyle = dropGrad;
	cCtx.beginPath();
	cCtx.arc(dropX, dropY, dropR, 0, Math.PI * 2);
	cCtx.fill();
	// Specular highlight on drop
	cCtx.fillStyle = "#ffffff";
	cCtx.beginPath();
	cCtx.ellipse(dropX - 18, dropY - 20, 14, 8, -Math.PI / 4, 0, Math.PI * 2);
	cCtx.fill();
	// Depth for drop (bright white = maximum foreground elevation)
	const dropDepthGrad = dCtx.createRadialGradient(dropX, dropY, 5, dropX, dropY, dropR);
	dropDepthGrad.addColorStop(0, "#ffffff");
	dropDepthGrad.addColorStop(.8, "#f0f0f0");
	dropDepthGrad.addColorStop(1, "#c0c0c0");
	dCtx.fillStyle = dropDepthGrad;
	dCtx.beginPath();
	dCtx.arc(dropX, dropY, dropR, 0, Math.PI * 2);
	dCtx.fill();
	return {
		imageUrl: cCanvas.toDataURL("image/jpeg", .92),
		depthUrl: dCanvas.toDataURL("image/png"),
		width: w,
		height: h
	};
}
export const PRESET_IMAGES = [
	{
		id: "portrait",
		title: "Portret Cyber-Noir",
		category: "Portret",
		description: "Wyrazista postać na pierwszym planie z neonowym światłem kontrowym i rozmyciem tła.",
		createImage: createPortraitPreset
	},
	{
		id: "landscape",
		title: "Alpejskie Szczyty i Jezioro",
		category: "Krajobraz",
		description: "Wielowarstwowa przestrzeń: skalisty brzeg, lustro wody, pasmo górskie i zamglone niebo.",
		createImage: createLandscapePreset
	},
	{
		id: "street",
		title: "Neonowa Metropolia 3D",
		category: "Architektura",
		description: "Głęboka perspektywa zbieżna z wieżowcami, neonami i lewitującym pojazdem.",
		createImage: createCyberpunkPreset
	},
	{
		id: "macro",
		title: "Makro Kropla Rosy",
		category: "Natura / Makro",
		description: "Trójwymiarowa, wypukła kropla wody na egzotycznym liściu z miękkim bokeh.",
		createImage: createMacroPreset
	}
];

//# sourceMappingURL=data:application/json;base64,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ZjtDQUNBO0VBQ0UsSUFBSTtFQUNKLE9BQU87RUFDUCxVQUFVO0VBQ1YsYUFBYTtFQUNiLGFBQWE7Q0FDZjtBQUNGIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbInByb2NlZHVyYWxJbWFnZXMudHMiXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJlc2V0SW1hZ2UgfSBmcm9tICcuLi90eXBlcyc7XG5cbi8qKlxuICogUHJvY2VkdXJhbGx5IGdlbmVyYXRlcyBoaWdoLWZpZGVsaXR5IHNhbXBsZSBpbWFnZXMgYW5kIGFjY3VyYXRlIGRlcHRoIG1hcHNcbiAqIHVzaW5nIHB1cmUgSFRNTDUgMkQgQ2FudmFzIHNvIHRoZXJlIGFyZSBaRVJPIGV4dGVybmFsIG5ldHdvcmsgZGVwZW5kZW5jaWVzIG9yIDQwNHMuXG4gKi9cblxuLy8gMS4gQ2luZW1hdGljIE5lb24gUG9ydHJhaXRcbmZ1bmN0aW9uIGNyZWF0ZVBvcnRyYWl0UHJlc2V0KCkge1xuICBjb25zdCB3ID0gODAwO1xuICBjb25zdCBoID0gMTAwMDtcblxuICAvLyBDb2xvciBjYW52YXNcbiAgY29uc3QgY0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBjQ2FudmFzLndpZHRoID0gdztcbiAgY0NhbnZhcy5oZWlnaHQgPSBoO1xuICBjb25zdCBjQ3R4ID0gY0NhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcblxuICAvLyBEZXB0aCBjYW52YXNcbiAgY29uc3QgZENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBkQ2FudmFzLndpZHRoID0gdztcbiAgZENhbnZhcy5oZWlnaHQgPSBoO1xuICBjb25zdCBkQ3R4ID0gZENhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcblxuICAvLyBCYWNrZ3JvdW5kXG4gIGNvbnN0IGJnR3JhZCA9IGNDdHguY3JlYXRlUmFkaWFsR3JhZGllbnQodyAqIDAuNSwgaCAqIDAuNCwgNTAsIHcgKiAwLjUsIGggKiAwLjUsIDYwMCk7XG4gIGJnR3JhZC5hZGRDb2xvclN0b3AoMCwgJyMxZTFiNGInKTtcbiAgYmdHcmFkLmFkZENvbG9yU3RvcCgwLjUsICcjMGYxNzJhJyk7XG4gIGJnR3JhZC5hZGRDb2xvclN0b3AoMSwgJyMwMjA2MTcnKTtcbiAgY0N0eC5maWxsU3R5bGUgPSBiZ0dyYWQ7XG4gIGNDdHguZmlsbFJlY3QoMCwgMCwgdywgaCk7XG5cbiAgLy8gQmFja2dyb3VuZCBib2tlaCBsaWdodHNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTsgaSsrKSB7XG4gICAgY29uc3QgYnggPSAoTWF0aC5zaW4oaSAqIDEuNykgKiAwLjUgKyAwLjUpICogdztcbiAgICBjb25zdCBieSA9IChNYXRoLmNvcyhpICogMi4zKSAqIDAuNCArIDAuMykgKiBoO1xuICAgIGNvbnN0IGJyID0gMjAgKyAoaSAlIDUpICogMTU7XG4gICAgY29uc3QgYkdyYWQgPSBjQ3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGJ4LCBieSwgMCwgYngsIGJ5LCBicik7XG4gICAgY29uc3QgaHVlID0gKGkgKiA0NSkgJSAzNjA7XG4gICAgYkdyYWQuYWRkQ29sb3JTdG9wKDAsIGBoc2xhKCR7aHVlfSwgODAlLCA2NSUsIDAuNClgKTtcbiAgICBiR3JhZC5hZGRDb2xvclN0b3AoMSwgYGhzbGEoJHtodWV9LCA4MCUsIDUwJSwgMClgKTtcbiAgICBjQ3R4LmZpbGxTdHlsZSA9IGJHcmFkO1xuICAgIGNDdHguYmVnaW5QYXRoKCk7XG4gICAgY0N0eC5hcmMoYngsIGJ5LCBiciwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGNDdHguZmlsbCgpO1xuICB9XG5cbiAgLy8gRGVwdGggZm9yIGJhY2tncm91bmRcbiAgZEN0eC5maWxsU3R5bGUgPSAnIzE1MTUxNSc7XG4gIGRDdHguZmlsbFJlY3QoMCwgMCwgdywgaCk7XG5cbiAgLy8gVG9yc28gLyBTaG91bGRlcnNcbiAgY0N0eC5maWxsU3R5bGUgPSAnIzBiMGYxOSc7XG4gIGNDdHguYmVnaW5QYXRoKCk7XG4gIGNDdHgubW92ZVRvKHcgKiAwLjEsIGgpO1xuICBjQ3R4LmJlemllckN1cnZlVG8odyAqIDAuMTUsIGggKiAwLjY1LCB3ICogMC4zNSwgaCAqIDAuNjIsIHcgKiAwLjQsIGggKiAwLjYpO1xuICBjQ3R4LmxpbmVUbyh3ICogMC42LCBoICogMC42KTtcbiAgY0N0eC5iZXppZXJDdXJ2ZVRvKHcgKiAwLjY1LCBoICogMC42MiwgdyAqIDAuODUsIGggKiAwLjY1LCB3ICogMC45LCBoKTtcbiAgY0N0eC5jbG9zZVBhdGgoKTtcbiAgY0N0eC5maWxsKCk7XG5cbiAgLy8gRGVwdGggZm9yIFRvcnNvXG4gIGRDdHguZmlsbFN0eWxlID0gJyNiMGIwYjAnO1xuICBkQ3R4LmJlZ2luUGF0aCgpO1xuICBkQ3R4Lm1vdmVUbyh3ICogMC4xLCBoKTtcbiAgZEN0eC5iZXppZXJDdXJ2ZVRvKHcgKiAwLjE1LCBoICogMC42NSwgdyAqIDAuMzUsIGggKiAwLjYyLCB3ICogMC40LCBoICogMC42KTtcbiAgZEN0eC5saW5lVG8odyAqIDAuNiwgaCAqIDAuNik7XG4gIGRDdHguYmV6aWVyQ3VydmVUbyh3ICogMC42NSwgaCAqIDAuNjIsIHcgKiAwLjg1LCBoICogMC42NSwgdyAqIDAuOSwgaCk7XG4gIGRDdHguY2xvc2VQYXRoKCk7XG4gIGRDdHguZmlsbCgpO1xuXG4gIC8vIE5lY2tcbiAgY0N0eC5maWxsU3R5bGUgPSAnI2UyOWQ3ZSc7XG4gIGNDdHguZmlsbFJlY3QodyAqIDAuNDIsIGggKiAwLjQ4LCB3ICogMC4xNiwgaCAqIDAuMTUpO1xuICBkQ3R4LmZpbGxTdHlsZSA9ICcjY2NjY2NjJztcbiAgZEN0eC5maWxsUmVjdCh3ICogMC40MiwgaCAqIDAuNDgsIHcgKiAwLjE2LCBoICogMC4xNSk7XG5cbiAgLy8gSGVhZCAvIEZhY2Ugc2lsaG91ZXR0ZVxuICBjb25zdCBmYWNlQ3ggPSB3ICogMC41O1xuICBjb25zdCBmYWNlQ3kgPSBoICogMC40O1xuICBjb25zdCBmYWNlUnggPSB3ICogMC4xODtcbiAgY29uc3QgZmFjZVJ5ID0gaCAqIDAuMTk7XG5cbiAgLy8gRmFjZSBjb2xvclxuICBjb25zdCBza2luR3JhZCA9IGNDdHguY3JlYXRlTGluZWFyR3JhZGllbnQoZmFjZUN4IC0gZmFjZVJ4LCBmYWNlQ3ksIGZhY2VDeCArIGZhY2VSeCwgZmFjZUN5KTtcbiAgc2tpbkdyYWQuYWRkQ29sb3JTdG9wKDAsICcjZjQ3MmI2Jyk7IC8vIFJpbSBsaWdodCBsZWZ0IChuZW9uIHBpbmspXG4gIHNraW5HcmFkLmFkZENvbG9yU3RvcCgwLjI1LCAnI2ZiOTIzYycpO1xuICBza2luR3JhZC5hZGRDb2xvclN0b3AoMC41LCAnI2ZiY2ZlOCcpO1xuICBza2luR3JhZC5hZGRDb2xvclN0b3AoMC44NSwgJyMzOGJkZjgnKTsgLy8gUmltIGxpZ2h0IHJpZ2h0IChjeWFuKVxuICBza2luR3JhZC5hZGRDb2xvclN0b3AoMSwgJyMwMjg0YzcnKTtcbiAgY0N0eC5maWxsU3R5bGUgPSBza2luR3JhZDtcbiAgY0N0eC5iZWdpblBhdGgoKTtcbiAgY0N0eC5lbGxpcHNlKGZhY2VDeCwgZmFjZUN5LCBmYWNlUngsIGZhY2VSeSwgMCwgMCwgTWF0aC5QSSAqIDIpO1xuICBjQ3R4LmZpbGwoKTtcblxuICAvLyBEZXB0aCBmb3IgaGVhZCAoY29udmV4IGRvbWU6IGJyaWdodGVzdCBhdCBub3NlL2NlbnRlciwgZGFya2VyIGF0IGVkZ2VzKVxuICBjb25zdCBmYWNlRGVwdGhHcmFkID0gZEN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChmYWNlQ3gsIGZhY2VDeSAtIDEwLCAxMCwgZmFjZUN4LCBmYWNlQ3ksIGZhY2VSeCAqIDEuMSk7XG4gIGZhY2VEZXB0aEdyYWQuYWRkQ29sb3JTdG9wKDAsICcjZmZmZmZmJyk7IC8vIE5vc2UvZnJvbnQgaXMgY2xvc2VzdFxuICBmYWNlRGVwdGhHcmFkLmFkZENvbG9yU3RvcCgwLjYsICcjZThlOGU4Jyk7XG4gIGZhY2VEZXB0aEdyYWQuYWRkQ29sb3JTdG9wKDEsICcjYThhOGE4Jyk7XG4gIGRDdHguZmlsbFN0eWxlID0gZmFjZURlcHRoR3JhZDtcbiAgZEN0eC5iZWdpblBhdGgoKTtcbiAgZEN0eC5lbGxpcHNlKGZhY2VDeCwgZmFjZUN5LCBmYWNlUngsIGZhY2VSeSwgMCwgMCwgTWF0aC5QSSAqIDIpO1xuICBkQ3R4LmZpbGwoKTtcblxuICAvLyBTdW5nbGFzc2VzIC8gQ3liZXIgVmlzb3IgKHBvcHBpbmcgb3V0IGNsb3Nlc3QhKVxuICBjb25zdCB2aXNvclkgPSBmYWNlQ3kgLSAxNTtcbiAgY29uc3Qgdmlzb3JXID0gZmFjZVJ4ICogMS42O1xuICBjb25zdCB2aXNvckggPSA0NTtcbiAgY0N0eC5maWxsU3R5bGUgPSAnIzBmMTcyYSc7XG4gIGNDdHguYmVnaW5QYXRoKCk7XG4gIGNDdHgucm91bmRSZWN0KGZhY2VDeCAtIHZpc29yVyAvIDIsIHZpc29yWSAtIHZpc29ySCAvIDIsIHZpc29yVywgdmlzb3JILCAxMCk7XG4gIGNDdHguZmlsbCgpO1xuICBjQ3R4LmxpbmVXaWR0aCA9IDM7XG4gIGNDdHguc3Ryb2tlU3R5bGUgPSAnIzM4YmRmOCc7XG4gIGNDdHguc3Ryb2tlKCk7XG5cbiAgLy8gVmlzb3IgcmVmbGVjdGlvblxuICBjb25zdCB2aXNHcmFkID0gY0N0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChmYWNlQ3ggLSB2aXNvclcgLyAyLCB2aXNvclksIGZhY2VDeCArIHZpc29yVyAvIDIsIHZpc29yWSk7XG4gIHZpc0dyYWQuYWRkQ29sb3JTdG9wKDAuMSwgJ3JnYmEoMjM2LCA3MiwgMTUzLCAwLjYpJyk7XG4gIHZpc0dyYWQuYWRkQ29sb3JTdG9wKDAuNSwgJ3JnYmEoNTYsIDE4OSwgMjQ4LCAwLjgpJyk7XG4gIHZpc0dyYWQuYWRkQ29sb3JTdG9wKDAuOSwgJ3JnYmEoMTY4LCA4NSwgMjQ3LCAwLjUpJyk7XG4gIGNDdHguZmlsbFN0eWxlID0gdmlzR3JhZDtcbiAgY0N0eC5iZWdpblBhdGgoKTtcbiAgY0N0eC5yb3VuZFJlY3QoZmFjZUN4IC0gdmlzb3JXIC8gMiArIDQsIHZpc29yWSAtIHZpc29ySCAvIDIgKyA0LCB2aXNvclcgLSA4LCB2aXNvckggLSA4LCA4KTtcbiAgY0N0eC5maWxsKCk7XG5cbiAgLy8gRGVwdGggZm9yIHZpc29yICh1bHRyYSBjbG9zZSlcbiAgZEN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gIGRDdHguYmVnaW5QYXRoKCk7XG4gIGRDdHgucm91bmRSZWN0KGZhY2VDeCAtIHZpc29yVyAvIDIsIHZpc29yWSAtIHZpc29ySCAvIDIsIHZpc29yVywgdmlzb3JILCAxMCk7XG4gIGRDdHguZmlsbCgpO1xuXG4gIC8vIFN0eWxpemVkIGhhaXJcbiAgY0N0eC5maWxsU3R5bGUgPSAnIzFlMWI0Yic7XG4gIGNDdHguYmVnaW5QYXRoKCk7XG4gIGNDdHguYXJjKGZhY2VDeCwgZmFjZUN5IC0gNDAsIGZhY2VSeCAqIDEuMDgsIE1hdGguUEkgKiAwLjgsIE1hdGguUEkgKiAyLjIpO1xuICBjQ3R4LmZpbGwoKTtcblxuICByZXR1cm4ge1xuICAgIGltYWdlVXJsOiBjQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycsIDAuOTIpLFxuICAgIGRlcHRoVXJsOiBkQ2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyksXG4gICAgd2lkdGg6IHcsXG4gICAgaGVpZ2h0OiBoLFxuICB9O1xufVxuXG4vLyAyLiBNYWplc3RpYyBNb3VudGFpbiBMYW5kc2NhcGUgJiBMYWtlXG5mdW5jdGlvbiBjcmVhdGVMYW5kc2NhcGVQcmVzZXQoKSB7XG4gIGNvbnN0IHcgPSAxMDI0O1xuICBjb25zdCBoID0gNjgwO1xuXG4gIGNvbnN0IGNDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY0NhbnZhcy53aWR0aCA9IHc7XG4gIGNDYW52YXMuaGVpZ2h0ID0gaDtcbiAgY29uc3QgY0N0eCA9IGNDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG5cbiAgY29uc3QgZENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBkQ2FudmFzLndpZHRoID0gdztcbiAgZENhbnZhcy5oZWlnaHQgPSBoO1xuICBjb25zdCBkQ3R4ID0gZENhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcblxuICAvLyBTa3lcbiAgY29uc3Qgc2t5R3JhZCA9IGNDdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgaCAqIDAuNTUpO1xuICBza3lHcmFkLmFkZENvbG9yU3RvcCgwLCAnIzBmMTcyYScpO1xuICBza3lHcmFkLmFkZENvbG9yU3RvcCgwLjQsICcjZWE1ODBjJyk7XG4gIHNreUdyYWQuYWRkQ29sb3JTdG9wKDAuNywgJyNmYmJmMjQnKTtcbiAgc2t5R3JhZC5hZGRDb2xvclN0b3AoMSwgJyNmZGU2OGEnKTtcbiAgY0N0eC5maWxsU3R5bGUgPSBza3lHcmFkO1xuICBjQ3R4LmZpbGxSZWN0KDAsIDAsIHcsIGggKiAwLjU1KTtcblxuICAvLyBEZXB0aCBmb3Igc2t5IChpbmZpbml0ZWx5IGZhciA9IG5lYXIgMClcbiAgZEN0eC5maWxsU3R5bGUgPSAnIzA4MDgwOCc7XG4gIGRDdHguZmlsbFJlY3QoMCwgMCwgdywgaCAqIDAuNTUpO1xuXG4gIC8vIEdsb3dpbmcgU3VuXG4gIGNvbnN0IHN1blggPSB3ICogMC42NTtcbiAgY29uc3Qgc3VuWSA9IGggKiAwLjMyO1xuICBjb25zdCBzdW5HcmFkID0gY0N0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChzdW5YLCBzdW5ZLCA1LCBzdW5YLCBzdW5ZLCA5MCk7XG4gIHN1bkdyYWQuYWRkQ29sb3JTdG9wKDAsICcjZmZmZmZmJyk7XG4gIHN1bkdyYWQuYWRkQ29sb3JTdG9wKDAuNCwgJyNmZWQ3YWEnKTtcbiAgc3VuR3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMjUxLCAxOTEsIDM2LCAwKScpO1xuICBjQ3R4LmZpbGxTdHlsZSA9IHN1bkdyYWQ7XG4gIGNDdHguYmVnaW5QYXRoKCk7XG4gIGNDdHguYXJjKHN1blgsIHN1blksIDkwLCAwLCBNYXRoLlBJICogMik7XG4gIGNDdHguZmlsbCgpO1xuXG4gIC8vIERpc3RhbnQgTW91bnRhaW4gUmlkZ2UgMVxuICBjQ3R4LmZpbGxTdHlsZSA9ICcjNDc1NTY5JztcbiAgZEN0eC5maWxsU3R5bGUgPSAnIzMwMzAzMCc7XG4gIGNDdHguYmVnaW5QYXRoKCk7XG4gIGRDdHguYmVnaW5QYXRoKCk7XG4gIGNDdHgubW92ZVRvKDAsIGggKiAwLjQ1KTtcbiAgZEN0eC5tb3ZlVG8oMCwgaCAqIDAuNDUpO1xuXG4gIGNvbnN0IHBlYWtzMSA9IFtcbiAgICBbMC4xLCAwLjI4XSwgWzAuMjIsIDAuMzhdLCBbMC4zNSwgMC4yMl0sIFswLjQ4LCAwLjM1XSxcbiAgICBbMC42LCAwLjI1XSwgWzAuNzUsIDAuMzJdLCBbMC44OCwgMC4yXSwgWzEuMCwgMC4zOF1cbiAgXTtcbiAgcGVha3MxLmZvckVhY2goKFtweCwgcHldKSA9PiB7XG4gICAgY0N0eC5saW5lVG8odyAqIHB4LCBoICogcHkpO1xuICAgIGRDdHgubGluZVRvKHcgKiBweCwgaCAqIHB5KTtcbiAgfSk7XG4gIGNDdHgubGluZVRvKHcsIGggKiAwLjU1KTtcbiAgY0N0eC5saW5lVG8oMCwgaCAqIDAuNTUpO1xuICBkQ3R4LmxpbmVUbyh3LCBoICogMC41NSk7XG4gIGRDdHgubGluZVRvKDAsIGggKiAwLjU1KTtcbiAgY0N0eC5maWxsKCk7XG4gIGRDdHguZmlsbCgpO1xuXG4gIC8vIE1pZGdyb3VuZCBNb3VudGFpbiBSaWRnZSAyXG4gIGNDdHguZmlsbFN0eWxlID0gJyMxZTI5M2InO1xuICBkQ3R4LmZpbGxTdHlsZSA9ICcjNjU2NTY1JztcbiAgY0N0eC5iZWdpblBhdGgoKTtcbiAgZEN0eC5iZWdpblBhdGgoKTtcbiAgY0N0eC5tb3ZlVG8oMCwgaCAqIDAuNTUpO1xuICBkQ3R4Lm1vdmVUbygwLCBoICogMC41NSk7XG5cbiAgY29uc3QgcGVha3MyID0gW1xuICAgIFswLjE1LCAwLjM4XSwgWzAuMywgMC40OF0sIFswLjUsIDAuMzVdLCBbMC43LCAwLjQyXSwgWzAuODUsIDAuMzZdLCBbMS4wLCAwLjQ4XVxuICBdO1xuICBwZWFrczIuZm9yRWFjaCgoW3B4LCBweV0pID0+IHtcbiAgICBjQ3R4LmxpbmVUbyh3ICogcHgsIGggKiBweSk7XG4gICAgZEN0eC5saW5lVG8odyAqIHB4LCBoICogcHkpO1xuICB9KTtcbiAgY0N0eC5saW5lVG8odywgaCAqIDAuNTUpO1xuICBjQ3R4LmxpbmVUbygwLCBoICogMC41NSk7XG4gIGRDdHgubGluZVRvKHcsIGggKiAwLjU1KTtcbiAgZEN0eC5saW5lVG8oMCwgaCAqIDAuNTUpO1xuICBjQ3R4LmZpbGwoKTtcbiAgZEN0eC5maWxsKCk7XG5cbiAgLy8gUGluZSB0cmVlIHNpbGhvdWV0dGVzIGFsb25nIG1pZGdyb3VuZCByaWRnZVxuICBjQ3R4LmZpbGxTdHlsZSA9ICcjMGYxNzJhJztcbiAgZEN0eC5maWxsU3R5bGUgPSAnIzgwODA4MCc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgNDA7IGkrKykge1xuICAgIGNvbnN0IHR4ID0gKGkgLyA0MCkgKiB3O1xuICAgIGNvbnN0IHR5ID0gaCAqIDAuNTIgLSBNYXRoLnNpbihpICogMC4zKSAqIDIwO1xuICAgIGNvbnN0IHRoID0gMjUgKyAoaSAlIDcpICogNDtcbiAgICBjQ3R4LmJlZ2luUGF0aCgpO1xuICAgIGRDdHguYmVnaW5QYXRoKCk7XG4gICAgY0N0eC5tb3ZlVG8odHggLSA2LCB0eSk7XG4gICAgY0N0eC5saW5lVG8odHgsIHR5IC0gdGgpO1xuICAgIGNDdHgubGluZVRvKHR4ICsgNiwgdHkpO1xuICAgIGNDdHguY2xvc2VQYXRoKCk7XG4gICAgZEN0eC5tb3ZlVG8odHggLSA2LCB0eSk7XG4gICAgZEN0eC5saW5lVG8odHgsIHR5IC0gdGgpO1xuICAgIGRDdHgubGluZVRvKHR4ICsgNiwgdHkpO1xuICAgIGRDdHguY2xvc2VQYXRoKCk7XG4gICAgY0N0eC5maWxsKCk7XG4gICAgZEN0eC5maWxsKCk7XG4gIH1cblxuICAvLyBNaXJyb3IgTGFrZVxuICBjb25zdCBsYWtlR3JhZCA9IGNDdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgaCAqIDAuNTUsIDAsIGgpO1xuICBsYWtlR3JhZC5hZGRDb2xvclN0b3AoMCwgJyMxZTI5M2InKTtcbiAgbGFrZUdyYWQuYWRkQ29sb3JTdG9wKDAuMywgJyMzMzQxNTUnKTtcbiAgbGFrZUdyYWQuYWRkQ29sb3JTdG9wKDEsICcjMDI4NGM3Jyk7XG4gIGNDdHguZmlsbFN0eWxlID0gbGFrZUdyYWQ7XG4gIGNDdHguZmlsbFJlY3QoMCwgaCAqIDAuNTUsIHcsIGggKiAwLjQ1KTtcblxuICAvLyBEZXB0aCBmb3IgbGFrZSAocmFtcCBmcm9tIDAuNCBhdCBob3Jpem9uIHVwIHRvIDAuOSBhdCBmb3JlZ3JvdW5kKVxuICBjb25zdCBsYWtlRGVwdGhHcmFkID0gZEN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCBoICogMC41NSwgMCwgaCk7XG4gIGxha2VEZXB0aEdyYWQuYWRkQ29sb3JTdG9wKDAsICcjNTU1NTU1Jyk7XG4gIGxha2VEZXB0aEdyYWQuYWRkQ29sb3JTdG9wKDEsICcjZTVlNWU1Jyk7XG4gIGRDdHguZmlsbFN0eWxlID0gbGFrZURlcHRoR3JhZDtcbiAgZEN0eC5maWxsUmVjdCgwLCBoICogMC41NSwgdywgaCAqIDAuNDUpO1xuXG4gIC8vIEZvcmVncm91bmQgcm9ja3MgYW5kIGRvY2sgKHZlcnkgY2xvc2UgZm9yZWdyb3VuZClcbiAgY0N0eC5maWxsU3R5bGUgPSAnIzFjMTkxNyc7XG4gIGRDdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuXG4gIGNDdHguYmVnaW5QYXRoKCk7XG4gIGRDdHguYmVnaW5QYXRoKCk7XG4gIGNDdHgubW92ZVRvKDAsIGgpO1xuICBjQ3R4LmxpbmVUbyh3ICogMC4zNSwgaCk7XG4gIGNDdHgubGluZVRvKHcgKiAwLjI1LCBoICogMC44Mik7XG4gIGNDdHgubGluZVRvKDAsIGggKiAwLjc4KTtcbiAgY0N0eC5jbG9zZVBhdGgoKTtcbiAgZEN0eC5tb3ZlVG8oMCwgaCk7XG4gIGRDdHgubGluZVRvKHcgKiAwLjM1LCBoKTtcbiAgZEN0eC5saW5lVG8odyAqIDAuMjUsIGggKiAwLjgyKTtcbiAgZEN0eC5saW5lVG8oMCwgaCAqIDAuNzgpO1xuICBkQ3R4LmNsb3NlUGF0aCgpO1xuICBjQ3R4LmZpbGwoKTtcbiAgZEN0eC5maWxsKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBpbWFnZVVybDogY0NhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnLCAwLjkyKSxcbiAgICBkZXB0aFVybDogZENhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpLFxuICAgIHdpZHRoOiB3LFxuICAgIGhlaWdodDogaCxcbiAgfTtcbn1cblxuLy8gMy4gQ3liZXJwdW5rIFN0cmVldCB3aXRoIFZhbmlzaGluZyBQZXJzcGVjdGl2ZVxuZnVuY3Rpb24gY3JlYXRlQ3liZXJwdW5rUHJlc2V0KCkge1xuICBjb25zdCB3ID0gOTAwO1xuICBjb25zdCBoID0gNzAwO1xuXG4gIGNvbnN0IGNDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY0NhbnZhcy53aWR0aCA9IHc7XG4gIGNDYW52YXMuaGVpZ2h0ID0gaDtcbiAgY29uc3QgY0N0eCA9IGNDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG5cbiAgY29uc3QgZENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBkQ2FudmFzLndpZHRoID0gdztcbiAgZENhbnZhcy5oZWlnaHQgPSBoO1xuICBjb25zdCBkQ3R4ID0gZENhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcblxuICBjb25zdCB2cFggPSB3ICogMC41O1xuICBjb25zdCB2cFkgPSBoICogMC40MjtcblxuICAvLyBTa3kgLyBEZWVwIGNpdHkgYmFja2Ryb3BcbiAgY0N0eC5maWxsU3R5bGUgPSAnIzA1MDUxMCc7XG4gIGNDdHguZmlsbFJlY3QoMCwgMCwgdywgaCk7XG4gIGRDdHguZmlsbFN0eWxlID0gJyMxMDEwMTAnO1xuICBkQ3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xuXG4gIC8vIFJvYWRcbiAgY0N0eC5iZWdpblBhdGgoKTtcbiAgY0N0eC5tb3ZlVG8oMCwgaCk7XG4gIGNDdHgubGluZVRvKHcsIGgpO1xuICBjQ3R4LmxpbmVUbyh2cFggKyA0MCwgdnBZKTtcbiAgY0N0eC5saW5lVG8odnBYIC0gNDAsIHZwWSk7XG4gIGNDdHguY2xvc2VQYXRoKCk7XG4gIGNvbnN0IHJvYWRHcmFkID0gY0N0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCBoLCAwLCB2cFkpO1xuICByb2FkR3JhZC5hZGRDb2xvclN0b3AoMCwgJyMxODE4MjQnKTtcbiAgcm9hZEdyYWQuYWRkQ29sb3JTdG9wKDAuNSwgJyMwZDBkMTgnKTtcbiAgcm9hZEdyYWQuYWRkQ29sb3JTdG9wKDEsICcjMDUwNTBmJyk7XG4gIGNDdHguZmlsbFN0eWxlID0gcm9hZEdyYWQ7XG4gIGNDdHguZmlsbCgpO1xuXG4gIC8vIERlcHRoIGZvciByb2FkXG4gIGNvbnN0IHJvYWRER3JhZCA9IGRDdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgaCwgMCwgdnBZKTtcbiAgcm9hZERHcmFkLmFkZENvbG9yU3RvcCgwLCAnI2ZmZmZmZicpOyAvLyBjbG9zZXN0IHJvYWRcbiAgcm9hZERHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzI1MjUyNScpOyAvLyB2YW5pc2hpbmcgcG9pbnRcbiAgZEN0eC5maWxsU3R5bGUgPSByb2FkREdyYWQ7XG4gIGRDdHguYmVnaW5QYXRoKCk7XG4gIGRDdHgubW92ZVRvKDAsIGgpO1xuICBkQ3R4LmxpbmVUbyh3LCBoKTtcbiAgZEN0eC5saW5lVG8odnBYICsgNDAsIHZwWSk7XG4gIGRDdHgubGluZVRvKHZwWCAtIDQwLCB2cFkpO1xuICBkQ3R4LmNsb3NlUGF0aCgpO1xuICBkQ3R4LmZpbGwoKTtcblxuICAvLyBMZWZ0IEJ1aWxkaW5nIEZhw6dhZGVcbiAgY0N0eC5iZWdpblBhdGgoKTtcbiAgY0N0eC5tb3ZlVG8oMCwgMCk7XG4gIGNDdHgubGluZVRvKHZwWCAtIDQwLCB2cFkgLSA2MCk7XG4gIGNDdHgubGluZVRvKHZwWCAtIDQwLCB2cFkpO1xuICBjQ3R4LmxpbmVUbygwLCBoKTtcbiAgY0N0eC5jbG9zZVBhdGgoKTtcbiAgY0N0eC5maWxsU3R5bGUgPSAnIzExMTgyNyc7XG4gIGNDdHguZmlsbCgpO1xuXG4gIC8vIExlZnQgQnVpbGRpbmcgRGVwdGhcbiAgY29uc3QgbGVmdERHcmFkID0gZEN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCBoIC8gMiwgdnBYIC0gNDAsIHZwWSk7XG4gIGxlZnRER3JhZC5hZGRDb2xvclN0b3AoMCwgJyNlMGUwZTAnKTtcbiAgbGVmdERHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzI4MjgyOCcpO1xuICBkQ3R4LmZpbGxTdHlsZSA9IGxlZnRER3JhZDtcbiAgZEN0eC5iZWdpblBhdGgoKTtcbiAgZEN0eC5tb3ZlVG8oMCwgMCk7XG4gIGRDdHgubGluZVRvKHZwWCAtIDQwLCB2cFkgLSA2MCk7XG4gIGRDdHgubGluZVRvKHZwWCAtIDQwLCB2cFkpO1xuICBkQ3R4LmxpbmVUbygwLCBoKTtcbiAgZEN0eC5jbG9zZVBhdGgoKTtcbiAgZEN0eC5maWxsKCk7XG5cbiAgLy8gUmlnaHQgQnVpbGRpbmcgRmHDp2FkZVxuICBjQ3R4LmJlZ2luUGF0aCgpO1xuICBjQ3R4Lm1vdmVUbyh3LCAwKTtcbiAgY0N0eC5saW5lVG8odnBYICsgNDAsIHZwWSAtIDgwKTtcbiAgY0N0eC5saW5lVG8odnBYICsgNDAsIHZwWSk7XG4gIGNDdHgubGluZVRvKHcsIGgpO1xuICBjQ3R4LmNsb3NlUGF0aCgpO1xuICBjQ3R4LmZpbGxTdHlsZSA9ICcjMGYxNzJhJztcbiAgY0N0eC5maWxsKCk7XG5cbiAgY29uc3QgcmlnaHRER3JhZCA9IGRDdHguY3JlYXRlTGluZWFyR3JhZGllbnQodywgaCAvIDIsIHZwWCArIDQwLCB2cFkpO1xuICByaWdodERHcmFkLmFkZENvbG9yU3RvcCgwLCAnI2UwZTBlMCcpO1xuICByaWdodERHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzI4MjgyOCcpO1xuICBkQ3R4LmZpbGxTdHlsZSA9IHJpZ2h0REdyYWQ7XG4gIGRDdHguYmVnaW5QYXRoKCk7XG4gIGRDdHgubW92ZVRvKHcsIDApO1xuICBkQ3R4LmxpbmVUbyh2cFggKyA0MCwgdnBZIC0gODApO1xuICBkQ3R4LmxpbmVUbyh2cFggKyA0MCwgdnBZKTtcbiAgZEN0eC5saW5lVG8odywgaCk7XG4gIGRDdHguY2xvc2VQYXRoKCk7XG4gIGRDdHguZmlsbCgpO1xuXG4gIC8vIE5lb24gU2lnbnMgJiBIb2xvZ3JhbXNcbiAgLy8gTGVmdCBOZW9uOiBQaW5rIEthbmFnYXdhIGJhciBzaWduXG4gIGNDdHguZmlsbFN0eWxlID0gJyNlYzQ4OTknO1xuICBjQ3R4LnNoYWRvd0NvbG9yID0gJyNmNDNmNWUnO1xuICBjQ3R4LnNoYWRvd0JsdXIgPSAxNTtcbiAgY0N0eC5maWxsUmVjdCg2MCwgMjAwLCAzMCwgMTgwKTtcbiAgY0N0eC5zaGFkb3dCbHVyID0gMDtcblxuICAvLyBSaWdodCBOZW9uOiBDeWFuIEN5YmVyIGJhclxuICBjQ3R4LmZpbGxTdHlsZSA9ICcjMDZiNmQ0JztcbiAgY0N0eC5zaGFkb3dDb2xvciA9ICcjMjJkM2VlJztcbiAgY0N0eC5zaGFkb3dCbHVyID0gMjA7XG4gIGNDdHguZmlsbFJlY3QodyAtIDE0MCwgMTUwLCA0NSwgMTMwKTtcbiAgY0N0eC5zaGFkb3dCbHVyID0gMDtcblxuICAvLyBXZXQgcGF2ZW1lbnQgcmVmbGVjdGlvbnNcbiAgZm9yIChsZXQgciA9IDA7IHIgPCAxMjsgcisrKSB7XG4gICAgY29uc3QgcnggPSB2cFggKyAoTWF0aC5zaW4ociAqIDIuMSkgKiAwLjQpICogdztcbiAgICBjb25zdCByeSA9IHZwWSArIChyIC8gMTIpICogKGggLSB2cFkpO1xuICAgIGNvbnN0IHJ3ID0gMjAgKyByICogMTU7XG4gICAgY29uc3QgcmggPSA0O1xuICAgIGNDdHguZmlsbFN0eWxlID0gciAlIDIgPT09IDAgPyAncmdiYSgyMzYsIDcyLCAxNTMsIDAuNSknIDogJ3JnYmEoNiwgMTgyLCAyMTIsIDAuNSknO1xuICAgIGNDdHguZmlsbFJlY3QocnggLSBydyAvIDIsIHJ5LCBydywgcmgpO1xuICB9XG5cbiAgLy8gRnV0dXJpc3RpYyBIb3ZlcmNhciBpbiBtaWRncm91bmQvZm9yZWdyb3VuZFxuICBjb25zdCBjYXJYID0gdnBYIC0gNjA7XG4gIGNvbnN0IGNhclkgPSBoICogMC42NTtcbiAgY29uc3QgY2FyVyA9IDE4MDtcbiAgY29uc3QgY2FySCA9IDcwO1xuXG4gIGNDdHguZmlsbFN0eWxlID0gJyNlMTFkNDgnO1xuICBjQ3R4LmJlZ2luUGF0aCgpO1xuICBjQ3R4LnJvdW5kUmVjdChjYXJYLCBjYXJZLCBjYXJXLCBjYXJILCAxMik7XG4gIGNDdHguZmlsbCgpO1xuXG4gIC8vIENhciBoZWFkbGlnaHRzXG4gIGNDdHguZmlsbFN0eWxlID0gJyMzOGJkZjgnO1xuICBjQ3R4LnNoYWRvd0NvbG9yID0gJyMzOGJkZjgnO1xuICBjQ3R4LnNoYWRvd0JsdXIgPSAyNTtcbiAgY0N0eC5iZWdpblBhdGgoKTtcbiAgY0N0eC5hcmMoY2FyWCArIDI1LCBjYXJZICsgY2FySCAqIDAuNSwgMTIsIDAsIE1hdGguUEkgKiAyKTtcbiAgY0N0eC5hcmMoY2FyWCArIGNhclcgLSAyNSwgY2FyWSArIGNhckggKiAwLjUsIDEyLCAwLCBNYXRoLlBJICogMik7XG4gIGNDdHguZmlsbCgpO1xuICBjQ3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gIC8vIENhciBkZXB0aCAodmVyeSBwcm9taW5lbnQgM0QgcG9wISlcbiAgZEN0eC5maWxsU3R5bGUgPSAnI2Y1ZjVmNSc7XG4gIGRDdHguYmVnaW5QYXRoKCk7XG4gIGRDdHgucm91bmRSZWN0KGNhclgsIGNhclksIGNhclcsIGNhckgsIDEyKTtcbiAgZEN0eC5maWxsKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBpbWFnZVVybDogY0NhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnLCAwLjkyKSxcbiAgICBkZXB0aFVybDogZENhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpLFxuICAgIHdpZHRoOiB3LFxuICAgIGhlaWdodDogaCxcbiAgfTtcbn1cblxuLy8gNC4gTWFjcm8gQm90YW5pY2FsIEV4b3RpYyBMZWFmICYgRGV3ZHJvcHNcbmZ1bmN0aW9uIGNyZWF0ZU1hY3JvUHJlc2V0KCkge1xuICBjb25zdCB3ID0gODAwO1xuICBjb25zdCBoID0gODAwO1xuXG4gIGNvbnN0IGNDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY0NhbnZhcy53aWR0aCA9IHc7XG4gIGNDYW52YXMuaGVpZ2h0ID0gaDtcbiAgY29uc3QgY0N0eCA9IGNDYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG5cbiAgY29uc3QgZENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICBkQ2FudmFzLndpZHRoID0gdztcbiAgZENhbnZhcy5oZWlnaHQgPSBoO1xuICBjb25zdCBkQ3R4ID0gZENhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcblxuICAvLyBEZWVwIGZvcmVzdCBiYWNrZ3JvdW5kXG4gIGNvbnN0IGJnID0gY0N0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCB3LCBoKTtcbiAgYmcuYWRkQ29sb3JTdG9wKDAsICcjMDY0ZTNiJyk7XG4gIGJnLmFkZENvbG9yU3RvcCgwLjUsICcjMDIyYzIyJyk7XG4gIGJnLmFkZENvbG9yU3RvcCgxLCAnIzA1MmUxNicpO1xuICBjQ3R4LmZpbGxTdHlsZSA9IGJnO1xuICBjQ3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xuXG4gIGRDdHguZmlsbFN0eWxlID0gJyMyMDIwMjAnO1xuICBkQ3R4LmZpbGxSZWN0KDAsIDAsIHcsIGgpO1xuXG4gIC8vIEJva2VoIG9yYnNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgY29uc3Qgb3ggPSAoaSAqIDk3KSAlIHc7XG4gICAgY29uc3Qgb3kgPSAoaSAqIDEyMykgJSBoO1xuICAgIGNvbnN0IHJhZCA9IDMwICsgKGkgJSA0KSAqIDIwO1xuICAgIGNvbnN0IGJHcmFkID0gY0N0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChveCwgb3ksIDAsIG94LCBveSwgcmFkKTtcbiAgICBiR3JhZC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMTEwLCAyMzEsIDE4MywgMC4yNSknKTtcbiAgICBiR3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMTYsIDE4NSwgMTI5LCAwKScpO1xuICAgIGNDdHguZmlsbFN0eWxlID0gYkdyYWQ7XG4gICAgY0N0eC5iZWdpblBhdGgoKTtcbiAgICBjQ3R4LmFyYyhveCwgb3ksIHJhZCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGNDdHguZmlsbCgpO1xuICB9XG5cbiAgLy8gR2lhbnQgaGVybyBsZWFmIChkaWFnb25hbCBjdXJ2ZSlcbiAgY0N0eC5maWxsU3R5bGUgPSAnIzEwYjk4MSc7XG4gIGRDdHguZmlsbFN0eWxlID0gJyNiOGI4YjgnO1xuXG4gIGNDdHguYmVnaW5QYXRoKCk7XG4gIGRDdHguYmVnaW5QYXRoKCk7XG4gIGNDdHgubW92ZVRvKHcgKiAwLjEsIGggKiAwLjkpO1xuICBjQ3R4LmJlemllckN1cnZlVG8odyAqIDAuMiwgaCAqIDAuMiwgdyAqIDAuNiwgaCAqIDAuMSwgdyAqIDAuOSwgaCAqIDAuMyk7XG4gIGNDdHguYmV6aWVyQ3VydmVUbyh3ICogMC44LCBoICogMC43LCB3ICogMC41LCBoICogMC45LCB3ICogMC4xLCBoICogMC45KTtcbiAgY0N0eC5jbG9zZVBhdGgoKTtcbiAgZEN0eC5tb3ZlVG8odyAqIDAuMSwgaCAqIDAuOSk7XG4gIGRDdHguYmV6aWVyQ3VydmVUbyh3ICogMC4yLCBoICogMC4yLCB3ICogMC42LCBoICogMC4xLCB3ICogMC45LCBoICogMC4zKTtcbiAgZEN0eC5iZXppZXJDdXJ2ZVRvKHcgKiAwLjgsIGggKiAwLjcsIHcgKiAwLjUsIGggKiAwLjksIHcgKiAwLjEsIGggKiAwLjkpO1xuICBkQ3R4LmNsb3NlUGF0aCgpO1xuICBjQ3R4LmZpbGwoKTtcbiAgZEN0eC5maWxsKCk7XG5cbiAgLy8gTGVhZiB2ZWluc1xuICBjQ3R4LnN0cm9rZVN0eWxlID0gJyMwNTk2NjknO1xuICBjQ3R4LmxpbmVXaWR0aCA9IDQ7XG4gIGNDdHguYmVnaW5QYXRoKCk7XG4gIGNDdHgubW92ZVRvKHcgKiAwLjEsIGggKiAwLjkpO1xuICBjQ3R4LnF1YWRyYXRpY0N1cnZlVG8odyAqIDAuNDUsIGggKiAwLjQ1LCB3ICogMC45LCBoICogMC4zKTtcbiAgY0N0eC5zdHJva2UoKTtcblxuICAvLyBHaWFudCBjcnlzdGFsIGRld2Ryb3AgKHBvcHBpbmcgb3V0IGRyYW1hdGljYWxseSBpbiAzRCBmb3JlZ3JvdW5kKVxuICBjb25zdCBkcm9wWCA9IHcgKiAwLjUyO1xuICBjb25zdCBkcm9wWSA9IGggKiAwLjQ4O1xuICBjb25zdCBkcm9wUiA9IDU1O1xuXG4gIGNvbnN0IGRyb3BHcmFkID0gY0N0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChkcm9wWCAtIDE1LCBkcm9wWSAtIDE1LCA1LCBkcm9wWCwgZHJvcFksIGRyb3BSKTtcbiAgZHJvcEdyYWQuYWRkQ29sb3JTdG9wKDAsICcjZmZmZmZmJyk7XG4gIGRyb3BHcmFkLmFkZENvbG9yU3RvcCgwLjMsICcjYTdmM2QwJyk7XG4gIGRyb3BHcmFkLmFkZENvbG9yU3RvcCgwLjgsICcjMzRkMzk5Jyk7XG4gIGRyb3BHcmFkLmFkZENvbG9yU3RvcCgxLCAnIzA1OTY2OScpO1xuICBjQ3R4LmZpbGxTdHlsZSA9IGRyb3BHcmFkO1xuICBjQ3R4LmJlZ2luUGF0aCgpO1xuICBjQ3R4LmFyYyhkcm9wWCwgZHJvcFksIGRyb3BSLCAwLCBNYXRoLlBJICogMik7XG4gIGNDdHguZmlsbCgpO1xuXG4gIC8vIFNwZWN1bGFyIGhpZ2hsaWdodCBvbiBkcm9wXG4gIGNDdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICBjQ3R4LmJlZ2luUGF0aCgpO1xuICBjQ3R4LmVsbGlwc2UoZHJvcFggLSAxOCwgZHJvcFkgLSAyMCwgMTQsIDgsIC1NYXRoLlBJIC8gNCwgMCwgTWF0aC5QSSAqIDIpO1xuICBjQ3R4LmZpbGwoKTtcblxuICAvLyBEZXB0aCBmb3IgZHJvcCAoYnJpZ2h0IHdoaXRlID0gbWF4aW11bSBmb3JlZ3JvdW5kIGVsZXZhdGlvbilcbiAgY29uc3QgZHJvcERlcHRoR3JhZCA9IGRDdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoZHJvcFgsIGRyb3BZLCA1LCBkcm9wWCwgZHJvcFksIGRyb3BSKTtcbiAgZHJvcERlcHRoR3JhZC5hZGRDb2xvclN0b3AoMCwgJyNmZmZmZmYnKTtcbiAgZHJvcERlcHRoR3JhZC5hZGRDb2xvclN0b3AoMC44LCAnI2YwZjBmMCcpO1xuICBkcm9wRGVwdGhHcmFkLmFkZENvbG9yU3RvcCgxLCAnI2MwYzBjMCcpO1xuICBkQ3R4LmZpbGxTdHlsZSA9IGRyb3BEZXB0aEdyYWQ7XG4gIGRDdHguYmVnaW5QYXRoKCk7XG4gIGRDdHguYXJjKGRyb3BYLCBkcm9wWSwgZHJvcFIsIDAsIE1hdGguUEkgKiAyKTtcbiAgZEN0eC5maWxsKCk7XG5cbiAgcmV0dXJuIHtcbiAgICBpbWFnZVVybDogY0NhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnLCAwLjkyKSxcbiAgICBkZXB0aFVybDogZENhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpLFxuICAgIHdpZHRoOiB3LFxuICAgIGhlaWdodDogaCxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFBSRVNFVF9JTUFHRVM6IFByZXNldEltYWdlW10gPSBbXG4gIHtcbiAgICBpZDogJ3BvcnRyYWl0JyxcbiAgICB0aXRsZTogJ1BvcnRyZXQgQ3liZXItTm9pcicsXG4gICAgY2F0ZWdvcnk6ICdQb3J0cmV0JyxcbiAgICBkZXNjcmlwdGlvbjogJ1d5cmF6aXN0YSBwb3N0YcSHIG5hIHBpZXJ3c3p5bSBwbGFuaWUgeiBuZW9ub3d5bSDFm3dpYXTFgmVtIGtvbnRyb3d5bSBpIHJvem15Y2llbSB0xYJhLicsXG4gICAgY3JlYXRlSW1hZ2U6IGNyZWF0ZVBvcnRyYWl0UHJlc2V0LFxuICB9LFxuICB7XG4gICAgaWQ6ICdsYW5kc2NhcGUnLFxuICAgIHRpdGxlOiAnQWxwZWpza2llIFN6Y3p5dHkgaSBKZXppb3JvJyxcbiAgICBjYXRlZ29yeTogJ0tyYWpvYnJheicsXG4gICAgZGVzY3JpcHRpb246ICdXaWVsb3dhcnN0d293YSBwcnplc3RyemXFhDogc2thbGlzdHkgYnJ6ZWcsIGx1c3RybyB3b2R5LCBwYXNtbyBnw7Nyc2tpZSBpIHphbWdsb25lIG5pZWJvLicsXG4gICAgY3JlYXRlSW1hZ2U6IGNyZWF0ZUxhbmRzY2FwZVByZXNldCxcbiAgfSxcbiAge1xuICAgIGlkOiAnc3RyZWV0JyxcbiAgICB0aXRsZTogJ05lb25vd2EgTWV0cm9wb2xpYSAzRCcsXG4gICAgY2F0ZWdvcnk6ICdBcmNoaXRla3R1cmEnLFxuICAgIGRlc2NyaXB0aW9uOiAnR8WCxJlib2thIHBlcnNwZWt0eXdhIHpiaWXFvG5hIHogd2llxbxvd2NhbWksIG5lb25hbWkgaSBsZXdpdHVqxIVjeW0gcG9qYXpkZW0uJyxcbiAgICBjcmVhdGVJbWFnZTogY3JlYXRlQ3liZXJwdW5rUHJlc2V0LFxuICB9LFxuICB7XG4gICAgaWQ6ICdtYWNybycsXG4gICAgdGl0bGU6ICdNYWtybyBLcm9wbGEgUm9zeScsXG4gICAgY2F0ZWdvcnk6ICdOYXR1cmEgLyBNYWtybycsXG4gICAgZGVzY3JpcHRpb246ICdUcsOzand5bWlhcm93YSwgd3lwdWvFgmEga3JvcGxhIHdvZHkgbmEgZWd6b3R5Y3pueW0gbGnFm2NpdSB6IG1pxJlra2ltIGJva2VoLicsXG4gICAgY3JlYXRlSW1hZ2U6IGNyZWF0ZU1hY3JvUHJlc2V0LFxuICB9LFxuXTtcbiJdfQ==