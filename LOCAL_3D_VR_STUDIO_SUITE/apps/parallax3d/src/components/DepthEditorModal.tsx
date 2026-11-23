const React = __vite__cjsImport0_react; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/parallax3d/node_modules/.vite/deps/react.js?v=b44980a7";
import { Brush, Eraser, Sparkles, RotateCcw, Check, X, Sliders, Droplets } from "/apps/parallax3d/node_modules/.vite/deps/lucide-react.js?v=eff26b65";
var _jsxFileName = "/app/applet/src/components/DepthEditorModal.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/parallax3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b44980a7";
export const DepthEditorModal = ({ isOpen, onClose, originalImageUrl, depthImageUrl, onSaveDepthMap }) => {
	const canvasRef = useRef(null);
	const [tool, setTool] = useState("near");
	const [brushSize, setBrushSize] = useState(45);
	const [brushIntensity, setBrushIntensity] = useState(.35);
	const [overlayAlpha, setOverlayAlpha] = useState(.3);
	const [isDrawing, setIsDrawing] = useState(false);
	const origImgRef = useRef(null);
	// Initialize canvas with current depth map
	useEffect(() => {
		if (!isOpen) return;
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = depthImageUrl;
		img.onload = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(img, 0, 0);
			}
		};
		const orig = new Image();
		orig.crossOrigin = "anonymous";
		orig.src = originalImageUrl;
		origImgRef.current = orig;
	}, [
		isOpen,
		depthImageUrl,
		originalImageUrl
	]);
	if (!isOpen) return null;
	const handlePointerDown = (e) => {
		setIsDrawing(true);
		draw(e);
	};
	const handlePointerUp = () => {
		setIsDrawing(false);
	};
	const draw = (e) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const x = (e.clientX - rect.left) * scaleX;
		const y = (e.clientY - rect.top) * scaleY;
		ctx.save();
		if (tool === "smooth") {
			// Gaussian blur box around brush location
			const r = brushSize * .8;
			const sx = Math.max(0, x - r);
			const sy = Math.max(0, y - r);
			const sw = Math.min(canvas.width - sx, r * 2);
			const sh = Math.min(canvas.height - sy, r * 2);
			const imgData = ctx.getImageData(sx, sy, sw, sh);
			const data = imgData.data;
			for (let py = 1; py < sh - 1; py += 2) {
				for (let px = 1; px < sw - 1; px += 2) {
					const idx = (py * sw + px) * 4;
					const left = (py * sw + (px - 1)) * 4;
					const right = (py * sw + (px + 1)) * 4;
					const up = ((py - 1) * sw + px) * 4;
					const down = ((py + 1) * sw + px) * 4;
					const avg = (data[idx] + data[left] + data[right] + data[up] + data[down]) / 5;
					const blended = Math.round(data[idx] * (1 - brushIntensity) + avg * brushIntensity);
					data[idx] = blended;
					data[idx + 1] = blended;
					data[idx + 2] = blended;
				}
			}
			ctx.putImageData(imgData, sx, sy);
		} else {
			// Near (+white) or Far (+black) brush
			const grad = ctx.createRadialGradient(x, y, 0, x, y, brushSize);
			let color = "";
			if (tool === "near") {
				color = `rgba(255, 255, 255, ${brushIntensity * .4})`;
			} else if (tool === "far") {
				color = `rgba(0, 0, 0, ${brushIntensity * .4})`;
			} else {
				// Neutral gray (midground)
				color = `rgba(128, 128, 128, ${brushIntensity * .4})`;
			}
			grad.addColorStop(0, color);
			grad.addColorStop(1, "rgba(128, 128, 128, 0)");
			ctx.fillStyle = grad;
			ctx.beginPath();
			ctx.arc(x, y, brushSize, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
	};
	const handleInvert = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		const d = imgData.data;
		for (let i = 0; i < d.length; i += 4) {
			d[i] = 255 - d[i];
			d[i + 1] = 255 - d[i + 1];
			d[i + 2] = 255 - d[i + 2];
		}
		ctx.putImageData(imgData, 0, 0);
	};
	const handleReset = () => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.src = depthImageUrl;
		img.onload = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const ctx = canvas.getContext("2d");
			if (ctx) ctx.drawImage(img, 0, 0);
		};
	};
	const handleSave = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const newUrl = canvas.toDataURL("image/png");
		onSaveDepthMap(newUrl);
		onClose();
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-none select-none",
		children: /* @__PURE__ */ _jsxDEV("div", {
			className: "flex flex-col w-full max-w-4xl max-h-[92vh] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden",
			children: [
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _jsxDEV(Brush, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 169,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("h2", {
							className: "text-lg font-semibold text-white",
							children: "Precyzyjny Edytor Mapy Głębi 3D"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 168,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: onClose,
						className: "p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition",
						children: /* @__PURE__ */ _jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 176,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 172,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 167,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-col md:flex-row flex-1 overflow-hidden",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "relative flex-1 flex items-center justify-center p-4 bg-zinc-950/70 overflow-auto",
						children: /* @__PURE__ */ _jsxDEV("div", {
							className: "relative border border-zinc-800 rounded-lg shadow-lg overflow-hidden max-h-[62vh]",
							children: [overlayAlpha > 0 && origImgRef.current && /* @__PURE__ */ _jsxDEV("img", {
								src: originalImageUrl,
								alt: "Original reference",
								className: "absolute inset-0 w-full h-full object-contain pointer-events-none",
								style: { opacity: overlayAlpha }
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 187,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("canvas", {
								ref: canvasRef,
								onPointerDown: handlePointerDown,
								onPointerMove: (e) => isDrawing && draw(e),
								onPointerUp: handlePointerUp,
								className: "max-h-[60vh] max-w-full object-contain cursor-crosshair touch-none"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 194,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 183,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "w-full md:w-72 p-5 border-t md:border-t-0 md:border-l border-zinc-800 bg-zinc-900/90 flex flex-col gap-5 overflow-y-auto",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2 block",
								children: "Narzędzie malowania"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 208,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-2",
								children: [
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setTool("near"),
										className: `flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition ${tool === "near" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750"}`,
										children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-4 h-4 text-amber-300" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 220,
											columnNumber: 19
										}, this), "Wypukłość (+)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 212,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setTool("far"),
										className: `flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition ${tool === "far" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750"}`,
										children: [/* @__PURE__ */ _jsxDEV(Brush, { className: "w-4 h-4 text-zinc-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 231,
											columnNumber: 19
										}, this), "Oddalenie (-)"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 223,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setTool("smooth"),
										className: `flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition ${tool === "smooth" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750"}`,
										children: [/* @__PURE__ */ _jsxDEV(Droplets, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 242,
											columnNumber: 19
										}, this), "Wygładzanie"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 234,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("button", {
										onClick: () => setTool("eraser"),
										className: `flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition ${tool === "eraser" ? "bg-indigo-600 border-indigo-500 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-750"}`,
										children: [/* @__PURE__ */ _jsxDEV(Eraser, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 253,
											columnNumber: 19
										}, this), "Średni plan"]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 245,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 211,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 207,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-xs text-zinc-400 mb-1.5",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Rozmiar pędzla" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 262,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-zinc-300",
									children: [brushSize, "px"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 263,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 261,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: 10,
								max: 150,
								value: brushSize,
								onChange: (e) => setBrushSize(Number(e.target.value)),
								className: "w-full"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 265,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 260,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-xs text-zinc-400 mb-1.5",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Siła pędzla" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 278,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-zinc-300",
									children: [Math.round(brushIntensity * 100), "%"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 279,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 277,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: .05,
								max: .9,
								step: .05,
								value: brushIntensity,
								onChange: (e) => setBrushIntensity(Number(e.target.value)),
								className: "w-full"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 281,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 276,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex justify-between text-xs text-zinc-400 mb-1.5",
								children: [/* @__PURE__ */ _jsxDEV("span", { children: "Podgląd oryginalnego zdjęcia" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 295,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-zinc-300",
									children: [Math.round(overlayAlpha * 100), "%"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 296,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 294,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("input", {
								type: "range",
								min: 0,
								max: .8,
								step: .05,
								value: overlayAlpha,
								onChange: (e) => setOverlayAlpha(Number(e.target.value)),
								className: "w-full"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 298,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 293,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-2 border-t border-zinc-800 flex flex-col gap-2",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									onClick: handleInvert,
									className: "flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700 transition",
									children: [/* @__PURE__ */ _jsxDEV(Sliders, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 315,
										columnNumber: 17
									}, this), "Odwróć głębię (Invert)"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 311,
									columnNumber: 15
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									onClick: handleReset,
									className: "flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-zinc-800 hover:bg-zinc-750 text-zinc-300 border border-zinc-700 transition",
									children: [/* @__PURE__ */ _jsxDEV(RotateCcw, { className: "w-3.5 h-3.5" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 322,
										columnNumber: 17
									}, this), "Przywróć początkową mapę"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 318,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 205,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-end gap-3 px-6 py-3.5 border-t border-zinc-800 bg-zinc-950",
					children: [/* @__PURE__ */ _jsxDEV("button", {
						onClick: onClose,
						className: "px-4 py-2 text-xs font-medium rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-800 transition",
						children: "Anuluj"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 331,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("button", {
						onClick: handleSave,
						className: "flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition",
						children: [/* @__PURE__ */ _jsxDEV(Check, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 341,
							columnNumber: 13
						}, this), "Zastosuj do Sceny 3D"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 337,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 330,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 165,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 164,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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Ozs7O2tCQUNSLHdCQUFDLFVBQUQ7U0FDRSxTQUFTO1NBQ1QsV0FBVTttQkFGWixDQUlFLHdCQUFDLFdBQUQsRUFBVyxXQUFVLGNBQWU7Ozs7bUJBQUMsMEJBRS9COzs7OztnQkFDTDs7Ozs7O01BQ0Y7Ozs7O2FBQ0Y7Ozs7OztJQUdMLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxVQUFEO01BQ0UsU0FBUztNQUNULFdBQVU7Z0JBQ1g7S0FFTzs7OztlQUNSLHdCQUFDLFVBQUQ7TUFDRSxTQUFTO01BQ1QsV0FBVTtnQkFGWixDQUlFLHdCQUFDLE9BQUQsRUFBTyxXQUFVLFVBQVc7Ozs7Z0JBQUMsc0JBRXZCOzs7OzthQUNMOzs7Ozs7R0FDRjs7Ozs7O0NBQ0Y7Ozs7O0FBRVQiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiRGVwdGhFZGl0b3JNb2RhbC50c3giXSwidmVyc2lvbiI6Mywic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiwgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEJydXNoLCBFcmFzZXIsIFNwYXJrbGVzLCBSb3RhdGVDY3csIENoZWNrLCBYLCBTbGlkZXJzLCBEcm9wbGV0cyB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBEZXB0aEVkaXRvck1vZGFsUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9yaWdpbmFsSW1hZ2VVcmw6IHN0cmluZztcbiAgZGVwdGhJbWFnZVVybDogc3RyaW5nO1xuICBvblNhdmVEZXB0aE1hcDogKG5ld0RlcHRoVXJsOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBEZXB0aEVkaXRvck1vZGFsOiBSZWFjdC5GQzxEZXB0aEVkaXRvck1vZGFsUHJvcHM+ID0gKHtcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuICBvcmlnaW5hbEltYWdlVXJsLFxuICBkZXB0aEltYWdlVXJsLFxuICBvblNhdmVEZXB0aE1hcCxcbn0pID0+IHtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmPEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt0b29sLCBzZXRUb29sXSA9IHVzZVN0YXRlPCduZWFyJyB8ICdmYXInIHwgJ3Ntb290aCcgfCAnZXJhc2VyJz4oJ25lYXInKTtcbiAgY29uc3QgW2JydXNoU2l6ZSwgc2V0QnJ1c2hTaXplXSA9IHVzZVN0YXRlPG51bWJlcj4oNDUpO1xuICBjb25zdCBbYnJ1c2hJbnRlbnNpdHksIHNldEJydXNoSW50ZW5zaXR5XSA9IHVzZVN0YXRlPG51bWJlcj4oMC4zNSk7XG4gIGNvbnN0IFtvdmVybGF5QWxwaGEsIHNldE92ZXJsYXlBbHBoYV0gPSB1c2VTdGF0ZTxudW1iZXI+KDAuMyk7XG4gIGNvbnN0IFtpc0RyYXdpbmcsIHNldElzRHJhd2luZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IG9yaWdJbWdSZWYgPSB1c2VSZWY8SFRNTEltYWdlRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIC8vIEluaXRpYWxpemUgY2FudmFzIHdpdGggY3VycmVudCBkZXB0aCBtYXBcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgaW1nLnNyYyA9IGRlcHRoSW1hZ2VVcmw7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICAgIGNhbnZhcy53aWR0aCA9IGltZy53aWR0aDtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBpbWcuaGVpZ2h0O1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBpZiAoY3R4KSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb3JpZyA9IG5ldyBJbWFnZSgpO1xuICAgIG9yaWcuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICBvcmlnLnNyYyA9IG9yaWdpbmFsSW1hZ2VVcmw7XG4gICAgb3JpZ0ltZ1JlZi5jdXJyZW50ID0gb3JpZztcbiAgfSwgW2lzT3BlbiwgZGVwdGhJbWFnZVVybCwgb3JpZ2luYWxJbWFnZVVybF0pO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IChlOiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KSA9PiB7XG4gICAgc2V0SXNEcmF3aW5nKHRydWUpO1xuICAgIGRyYXcoZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlclVwID0gKCkgPT4ge1xuICAgIHNldElzRHJhd2luZyhmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgZHJhdyA9IChlOiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgY29uc3QgcmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBzY2FsZVggPSBjYW52YXMud2lkdGggLyByZWN0LndpZHRoO1xuICAgIGNvbnN0IHNjYWxlWSA9IGNhbnZhcy5oZWlnaHQgLyByZWN0LmhlaWdodDtcbiAgICBjb25zdCB4ID0gKGUuY2xpZW50WCAtIHJlY3QubGVmdCkgKiBzY2FsZVg7XG4gICAgY29uc3QgeSA9IChlLmNsaWVudFkgLSByZWN0LnRvcCkgKiBzY2FsZVk7XG5cbiAgICBjdHguc2F2ZSgpO1xuXG4gICAgaWYgKHRvb2wgPT09ICdzbW9vdGgnKSB7XG4gICAgICAvLyBHYXVzc2lhbiBibHVyIGJveCBhcm91bmQgYnJ1c2ggbG9jYXRpb25cbiAgICAgIGNvbnN0IHIgPSBicnVzaFNpemUgKiAwLjg7XG4gICAgICBjb25zdCBzeCA9IE1hdGgubWF4KDAsIHggLSByKTtcbiAgICAgIGNvbnN0IHN5ID0gTWF0aC5tYXgoMCwgeSAtIHIpO1xuICAgICAgY29uc3Qgc3cgPSBNYXRoLm1pbihjYW52YXMud2lkdGggLSBzeCwgciAqIDIpO1xuICAgICAgY29uc3Qgc2ggPSBNYXRoLm1pbihjYW52YXMuaGVpZ2h0IC0gc3ksIHIgKiAyKTtcblxuICAgICAgY29uc3QgaW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoc3gsIHN5LCBzdywgc2gpO1xuICAgICAgY29uc3QgZGF0YSA9IGltZ0RhdGEuZGF0YTtcblxuICAgICAgZm9yIChsZXQgcHkgPSAxOyBweSA8IHNoIC0gMTsgcHkgKz0gMikge1xuICAgICAgICBmb3IgKGxldCBweCA9IDE7IHB4IDwgc3cgLSAxOyBweCArPSAyKSB7XG4gICAgICAgICAgY29uc3QgaWR4ID0gKHB5ICogc3cgKyBweCkgKiA0O1xuICAgICAgICAgIGNvbnN0IGxlZnQgPSAoKHB5KSAqIHN3ICsgKHB4IC0gMSkpICogNDtcbiAgICAgICAgICBjb25zdCByaWdodCA9ICgocHkpICogc3cgKyAocHggKyAxKSkgKiA0O1xuICAgICAgICAgIGNvbnN0IHVwID0gKChweSAtIDEpICogc3cgKyBweCkgKiA0O1xuICAgICAgICAgIGNvbnN0IGRvd24gPSAoKHB5ICsgMSkgKiBzdyArIHB4KSAqIDQ7XG5cbiAgICAgICAgICBjb25zdCBhdmcgPSAoZGF0YVtpZHhdICsgZGF0YVtsZWZ0XSArIGRhdGFbcmlnaHRdICsgZGF0YVt1cF0gKyBkYXRhW2Rvd25dKSAvIDU7XG4gICAgICAgICAgY29uc3QgYmxlbmRlZCA9IE1hdGgucm91bmQoZGF0YVtpZHhdICogKDEgLSBicnVzaEludGVuc2l0eSkgKyBhdmcgKiBicnVzaEludGVuc2l0eSk7XG4gICAgICAgICAgZGF0YVtpZHhdID0gYmxlbmRlZDtcbiAgICAgICAgICBkYXRhW2lkeCArIDFdID0gYmxlbmRlZDtcbiAgICAgICAgICBkYXRhW2lkeCArIDJdID0gYmxlbmRlZDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWdEYXRhLCBzeCwgc3kpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOZWFyICgrd2hpdGUpIG9yIEZhciAoK2JsYWNrKSBicnVzaFxuICAgICAgY29uc3QgZ3JhZCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudCh4LCB5LCAwLCB4LCB5LCBicnVzaFNpemUpO1xuICAgICAgbGV0IGNvbG9yID0gJyc7XG4gICAgICBpZiAodG9vbCA9PT0gJ25lYXInKSB7XG4gICAgICAgIGNvbG9yID0gYHJnYmEoMjU1LCAyNTUsIDI1NSwgJHticnVzaEludGVuc2l0eSAqIDAuNH0pYDtcbiAgICAgIH0gZWxzZSBpZiAodG9vbCA9PT0gJ2ZhcicpIHtcbiAgICAgICAgY29sb3IgPSBgcmdiYSgwLCAwLCAwLCAke2JydXNoSW50ZW5zaXR5ICogMC40fSlgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmV1dHJhbCBncmF5IChtaWRncm91bmQpXG4gICAgICAgIGNvbG9yID0gYHJnYmEoMTI4LCAxMjgsIDEyOCwgJHticnVzaEludGVuc2l0eSAqIDAuNH0pYDtcbiAgICAgIH1cblxuICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMCwgY29sb3IpO1xuICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMTI4LCAxMjgsIDEyOCwgMCknKTtcblxuICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWQ7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKHgsIHksIGJydXNoU2l6ZSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUludmVydCA9ICgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGlmICghY3R4KSByZXR1cm47XG4gICAgY29uc3QgaW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjb25zdCBkID0gaW1nRGF0YS5kYXRhO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZC5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgZFtpXSA9IDI1NSAtIGRbaV07XG4gICAgICBkW2kgKyAxXSA9IDI1NSAtIGRbaSArIDFdO1xuICAgICAgZFtpICsgMl0gPSAyNTUgLSBkW2kgKyAyXTtcbiAgICB9XG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWdEYXRhLCAwLCAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXNldCA9ICgpID0+IHtcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuY3Jvc3NPcmlnaW4gPSAnYW5vbnltb3VzJztcbiAgICBpbWcuc3JjID0gZGVwdGhJbWFnZVVybDtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBpZiAoY3R4KSBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgfTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTYXZlID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgbmV3VXJsID0gY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gICAgb25TYXZlRGVwdGhNYXAobmV3VXJsKTtcbiAgICBvbkNsb3NlKCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgYmctYmxhY2svODUgYmFja2Ryb3AtYmx1ci1ub25lIHNlbGVjdC1ub25lXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgdy1mdWxsIG1heC13LTR4bCBtYXgtaC1bOTJ2aF0gYmctemluYy05MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC02IHB5LTQgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwIGJnLXppbmMtOTUwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPEJydXNoIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlByZWN5enlqbnkgRWR5dG9yIE1hcHkgR8WCxJliaSAzRDwvaDI+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgdGV4dC16aW5jLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXppbmMtODAwIHRyYW5zaXRpb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ29udGVudCBhcmVhOiBjYW52YXMgKyBzaWRlIHRvb2xzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgZmxleC0xIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgIHsvKiBNYWluIENhbnZhcyB2aWV3ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy16aW5jLTk1MC83MCBvdmVyZmxvdy1hdXRvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGJvcmRlciBib3JkZXItemluYy04MDAgcm91bmRlZC1sZyBzaGFkb3ctbGcgb3ZlcmZsb3ctaGlkZGVuIG1heC1oLVs2MnZoXVwiPlxuICAgICAgICAgICAgICB7LyogT3B0aW9uYWwgYmFja2dyb3VuZCByZWZlcmVuY2UgaW1hZ2UgKi99XG4gICAgICAgICAgICAgIHtvdmVybGF5QWxwaGEgPiAwICYmIG9yaWdJbWdSZWYuY3VycmVudCAmJiAoXG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgc3JjPXtvcmlnaW5hbEltYWdlVXJsfVxuICAgICAgICAgICAgICAgICAgYWx0PVwiT3JpZ2luYWwgcmVmZXJlbmNlXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgdy1mdWxsIGgtZnVsbCBvYmplY3QtY29udGFpbiBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IG9wYWNpdHk6IG92ZXJsYXlBbHBoYSB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDxjYW52YXNcbiAgICAgICAgICAgICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXtoYW5kbGVQb2ludGVyRG93bn1cbiAgICAgICAgICAgICAgICBvblBvaW50ZXJNb3ZlPXsoZSkgPT4gaXNEcmF3aW5nICYmIGRyYXcoZSl9XG4gICAgICAgICAgICAgICAgb25Qb2ludGVyVXA9e2hhbmRsZVBvaW50ZXJVcH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYXgtaC1bNjB2aF0gbWF4LXctZnVsbCBvYmplY3QtY29udGFpbiBjdXJzb3ItY3Jvc3NoYWlyIHRvdWNoLW5vbmVcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogVG9vbCBwYW5lbCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtZDp3LTcyIHAtNSBib3JkZXItdCBtZDpib3JkZXItdC0wIG1kOmJvcmRlci1sIGJvcmRlci16aW5jLTgwMCBiZy16aW5jLTkwMC85MCBmbGV4IGZsZXgtY29sIGdhcC01IG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgey8qIFRvb2xzIHNlbGVjdGlvbiAqL31cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC16aW5jLTQwMCBtYi0yIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgTmFyesSZZHppZSBtYWxvd2FuaWFcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUb29sKCduZWFyJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgIHRvb2wgPT09ICduZWFyJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgYm9yZGVyLWluZGlnby01MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTgwMCBib3JkZXItemluYy03MDAgdGV4dC16aW5jLTMwMCBob3ZlcjpiZy16aW5jLTc1MCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIFd5cHVrxYJvxZvEhyAoKylcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUb29sKCdmYXInKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24gJHtcbiAgICAgICAgICAgICAgICAgICAgdG9vbCA9PT0gJ2ZhcidcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tNjAwIGJvcmRlci1pbmRpZ28tNTAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy04MDAgYm9yZGVyLXppbmMtNzAwIHRleHQtemluYy0zMDAgaG92ZXI6YmctemluYy03NTAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8QnJ1c2ggY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXppbmMtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIE9kZGFsZW5pZSAoLSlcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUb29sKCdzbW9vdGgnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24gJHtcbiAgICAgICAgICAgICAgICAgICAgdG9vbCA9PT0gJ3Ntb290aCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tNjAwIGJvcmRlci1pbmRpZ28tNTAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy04MDAgYm9yZGVyLXppbmMtNzAwIHRleHQtemluYy0zMDAgaG92ZXI6YmctemluYy03NTAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8RHJvcGxldHMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgV3lnxYJhZHphbmllXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VG9vbCgnZXJhc2VyJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgICAgIHRvb2wgPT09ICdlcmFzZXInXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTYwMCBib3JkZXItaW5kaWdvLTUwMCB0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtODAwIGJvcmRlci16aW5jLTcwMCB0ZXh0LXppbmMtMzAwIGhvdmVyOmJnLXppbmMtNzUwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEVyYXNlciBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcm9zZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgxZpyZWRuaSBwbGFuXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBCcnVzaCBTaXplICovfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQtemluYy00MDAgbWItMS41XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+Um96bWlhciBwxJlkemxhPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXppbmMtMzAwXCI+e2JydXNoU2l6ZX1weDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgbWluPXsxMH1cbiAgICAgICAgICAgICAgICBtYXg9ezE1MH1cbiAgICAgICAgICAgICAgICB2YWx1ZT17YnJ1c2hTaXplfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QnJ1c2hTaXplKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEJydXNoIEludGVuc2l0eSAqL31cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXppbmMtNDAwIG1iLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlNpxYJhIHDEmWR6bGE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtemluYy0zMDBcIj57TWF0aC5yb3VuZChicnVzaEludGVuc2l0eSAqIDEwMCl9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICAgICAgICAgICAgbWluPXswLjA1fVxuICAgICAgICAgICAgICAgIG1heD17MC45fVxuICAgICAgICAgICAgICAgIHN0ZXA9ezAuMDV9XG4gICAgICAgICAgICAgICAgdmFsdWU9e2JydXNoSW50ZW5zaXR5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QnJ1c2hJbnRlbnNpdHkoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUmVmZXJlbmNlIEltYWdlIE92ZXJsYXkgKi99XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC16aW5jLTQwMCBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb2RnbMSFZCBvcnlnaW5hbG5lZ28gemRqxJljaWE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtemluYy0zMDBcIj57TWF0aC5yb3VuZChvdmVybGF5QWxwaGEgKiAxMDApfSU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj17MH1cbiAgICAgICAgICAgICAgICBtYXg9ezAuOH1cbiAgICAgICAgICAgICAgICBzdGVwPXswLjA1fVxuICAgICAgICAgICAgICAgIHZhbHVlPXtvdmVybGF5QWxwaGF9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRPdmVybGF5QWxwaGEoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUXVpY2sgQWN0aW9ucyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItemluYy04MDAgZmxleCBmbGV4LWNvbCBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlSW52ZXJ0fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgYmctemluYy04MDAgaG92ZXI6YmctemluYy03NTAgdGV4dC16aW5jLTMwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIE9kd3LDs8SHIGfFgsSZYmnEmSAoSW52ZXJ0KVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHJvdW5kZWQtbGcgYmctemluYy04MDAgaG92ZXI6YmctemluYy03NTAgdGV4dC16aW5jLTMwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwIHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFJvdGF0ZUNjdyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgUHJ6eXdyw7PEhyBwb2N6xIV0a293xIUgbWFwxJlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZvb3RlciBhY3Rpb25zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0zIHB4LTYgcHktMy41IGJvcmRlci10IGJvcmRlci16aW5jLTgwMCBiZy16aW5jLTk1MFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLWxnIHRleHQtemluYy0zMDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy16aW5jLTgwMCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBBbnVsdWpcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTYXZlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC00IHB5LTIgdGV4dC14cyBmb250LXNlbWlib2xkIHJvdW5kZWQtbGcgYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHRyYW5zaXRpb25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIFphc3Rvc3VqIGRvIFNjZW55IDNEXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl19