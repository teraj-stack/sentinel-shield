const React = __vite__cjsImport0_react; const useState = __vite__cjsImport0_react["useState"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useCallback = __vite__cjsImport0_react["useCallback"];const _jsxDEV = __vite__cjsImport9_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/parallax3d/node_modules/.vite/deps/react.js?v=b44980a7";
import { ThreeCanvas } from "/apps/parallax3d/src/components/ThreeCanvas.tsx";
import { TopBar } from "/apps/parallax3d/src/components/TopBar.tsx";
import { ControlDock } from "/apps/parallax3d/src/components/ControlDock.tsx";
import { DepthEditorModal } from "/apps/parallax3d/src/components/DepthEditorModal.tsx";
import { PRESET_IMAGES } from "/apps/parallax3d/src/utils/proceduralImages.ts";
import { generateDepthMapFromImage } from "/apps/parallax3d/src/utils/depthEstimator.ts";
import { recordCanvasLoop, downloadBlob } from "/apps/parallax3d/src/utils/videoRecorder.ts";
import { Sparkles, X } from "/apps/parallax3d/node_modules/.vite/deps/lucide-react.js?v=eff26b65";
var _jsxFileName = "/app/applet/src/App.tsx";
import __vite__cjsImport9_react_jsxDevRuntime from "/apps/parallax3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b44980a7";
export default function App() {
	// Current active image & depth data
	const [currentPresetId, setCurrentPresetId] = useState("portrait");
	const [imageUrl, setImageUrl] = useState("");
	const [depthUrl, setDepthUrl] = useState("");
	const [imageDimensions, setImageDimensions] = useState({
		width: 800,
		height: 1e3
	});
	// 3D Scene Configurations
	const [depthConfig, setDepthConfig] = useState({
		scale: 1.1,
		focusPlane: .5,
		inverted: false,
		contrast: 1,
		brightness: 0,
		edgeDilation: 1,
		dofStrength: 0,
		chromaticAberration: 0
	});
	const [motionConfig, setMotionConfig] = useState({
		mode: "circle",
		amplitude: .35,
		speed: 1,
		interactiveMouse: true,
		mouseSensitivity: .8,
		autoRotate: false,
		autoRotateSpeed: 1
	});
	const [displayMode, setDisplayMode] = useState("standard");
	const [depthColorMap, setDepthColorMap] = useState("turbo");
	// UI States
	const [isDepthEditorOpen, setIsDepthEditorOpen] = useState(false);
	const [zenMode, setZenMode] = useState(false);
	const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
	const [aiAnalysis, setAiAnalysis] = useState(null);
	const [showAiTip, setShowAiTip] = useState(false);
	// Recording & Canvas ref
	const [isRecording, setIsRecording] = useState(false);
	const [recordingProgress, setRecordingProgress] = useState(0);
	const webglCanvasRef = useRef(null);
	// Initialize with the first procedural preset on mount
	useEffect(() => {
		loadPreset("portrait");
	}, []);
	const loadPreset = (presetId) => {
		const preset = PRESET_IMAGES.find((p) => p.id === presetId) || PRESET_IMAGES[0];
		const { imageUrl: iUrl, depthUrl: dUrl, width, height } = preset.createImage();
		setCurrentPresetId(preset.id);
		setImageUrl(iUrl);
		setDepthUrl(dUrl);
		setImageDimensions({
			width,
			height
		});
		setAiAnalysis(null);
		setShowAiTip(false);
		// Context-sensitive defaults per preset
		if (preset.id === "portrait") {
			setDepthConfig((prev) => ({
				...prev,
				scale: 1.2,
				focusPlane: .65
			}));
			setMotionConfig((prev) => ({
				...prev,
				mode: "circle",
				amplitude: .35
			}));
		} else if (preset.id === "landscape") {
			setDepthConfig((prev) => ({
				...prev,
				scale: 1.4,
				focusPlane: .4
			}));
			setMotionConfig((prev) => ({
				...prev,
				mode: "horizontal",
				amplitude: .4
			}));
		} else if (preset.id === "street") {
			setDepthConfig((prev) => ({
				...prev,
				scale: 1.5,
				focusPlane: .35
			}));
			setMotionConfig((prev) => ({
				...prev,
				mode: "infinity",
				amplitude: .38
			}));
		} else if (preset.id === "macro") {
			setDepthConfig((prev) => ({
				...prev,
				scale: 1.6,
				focusPlane: .55
			}));
			setMotionConfig((prev) => ({
				...prev,
				mode: "breathe",
				amplitude: .4
			}));
		}
	};
	// Upload user image
	const handleUploadUserImage = (file) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const dataUrl = e.target?.result;
			const img = new Image();
			img.onload = async () => {
				setImageDimensions({
					width: img.width,
					height: img.height
				});
				setImageUrl(dataUrl);
				setCurrentPresetId("custom");
				// Automatically synthesize an initial high-fidelity depth map
				try {
					const { depthDataUrl } = await generateDepthMapFromImage(img, {
						mode: "general",
						contrast: 1.1,
						smoothness: 4
					});
					setDepthUrl(depthDataUrl);
				} catch (err) {
					console.error("Błąd generowania głębi:", err);
				}
			};
			img.src = dataUrl;
		};
		reader.readAsDataURL(file);
	};
	// Upload custom paired depth map
	const handleUploadDepthMap = (file) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const dataUrl = e.target?.result;
			setDepthUrl(dataUrl);
		};
		reader.readAsDataURL(file);
	};
	// Drag and drop image onto window
	const handleDragOver = (e) => {
		e.preventDefault();
	};
	const handleDrop = (e) => {
		e.preventDefault();
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleUploadUserImage(e.dataTransfer.files[0]);
		}
	};
	// Trigger Gemini AI depth analysis
	const handleRunAiAnalysis = async () => {
		if (!imageUrl) return;
		setIsAiAnalyzing(true);
		try {
			const res = await fetch("/api/analyze-depth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ imageBase64: imageUrl })
			});
			const data = await res.json();
			if (data.success && data.analysis) {
				const analysis = data.analysis;
				setAiAnalysis(analysis);
				setShowAiTip(true);
				// Apply AI suggestions
				if (analysis.recommendedDepthScale) {
					setDepthConfig((prev) => ({
						...prev,
						scale: Math.min(2, Math.max(.4, analysis.recommendedDepthScale))
					}));
				}
				if (analysis.focalPoint) {
					setDepthConfig((prev) => ({
						...prev,
						focusPlane: Math.min(.9, Math.max(.1, analysis.focalPoint.y))
					}));
				}
			}
		} catch (err) {
			console.error("Błąd analizy AI:", err);
		} finally {
			setIsAiAnalyzing(false);
		}
	};
	// Update depth config helper
	const updateDepthConfig = useCallback((newCfg) => {
		setDepthConfig((prev) => ({
			...prev,
			...newCfg
		}));
	}, []);
	// Update motion config helper
	const updateMotionConfig = useCallback((newCfg) => {
		setMotionConfig((prev) => ({
			...prev,
			...newCfg
		}));
	}, []);
	// Record WebM loop video
	const handleRecordVideo = async () => {
		if (!webglCanvasRef.current || isRecording) return;
		setIsRecording(true);
		setRecordingProgress(0);
		try {
			const blob = await recordCanvasLoop(webglCanvasRef.current, 3600, (p) => {
				setRecordingProgress(p);
			});
			downloadBlob(blob, `parallax3d-loop-${Date.now()}.webm`);
		} catch (err) {
			console.error("Błąd nagrywania wideo:", err);
		} finally {
			setIsRecording(false);
			setRecordingProgress(0);
		}
	};
	// Capture spatial snapshot (PNG)
	const handleCaptureSnapshot = () => {
		const canvas = webglCanvasRef.current;
		if (!canvas) return;
		const url = canvas.toDataURL("image/png");
		const a = document.createElement("a");
		a.href = url;
		a.download = `parallax3d-kadr-${Date.now()}.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	// Download depth map (PNG)
	const handleDownloadDepthMap = () => {
		if (!depthUrl) return;
		const a = document.createElement("a");
		a.href = depthUrl;
		a.download = `depth-map-${Date.now()}.png`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};
	return /* @__PURE__ */ _jsxDEV("div", {
		onDragOver: handleDragOver,
		onDrop: handleDrop,
		className: "relative w-screen h-screen overflow-hidden bg-zinc-950 text-white select-none",
		children: [
			imageUrl && depthUrl && /* @__PURE__ */ _jsxDEV(ThreeCanvas, {
				imageUrl,
				depthUrl,
				imageDimensions,
				depthConfig,
				motionConfig,
				displayMode,
				depthColorMap,
				onCanvasReady: (canvas) => {
					webglCanvasRef.current = canvas;
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 245,
				columnNumber: 9
			}, this),
			!zenMode && /* @__PURE__ */ _jsxDEV(TopBar, {
				currentPresetId,
				onSelectPreset: loadPreset,
				onUploadImage: handleUploadUserImage,
				onUploadDepthMap: handleUploadDepthMap,
				isAiAnalyzing,
				onRunAiAnalysis: handleRunAiAnalysis,
				aiAnalysis,
				zenMode,
				onToggleZenMode: () => setZenMode(true)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 261,
				columnNumber: 9
			}, this),
			zenMode && /* @__PURE__ */ _jsxDEV("button", {
				onClick: () => setZenMode(false),
				className: "absolute top-4 right-4 z-50 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-700 text-xs font-medium text-zinc-200 hover:text-white transition shadow-lg",
				children: "Przywróć Interfejs"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 276,
				columnNumber: 9
			}, this),
			showAiTip && aiAnalysis && !zenMode && /* @__PURE__ */ _jsxDEV("div", {
				className: "absolute top-16 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[90vw] p-3 rounded-xl bg-zinc-900 border border-indigo-500/50 shadow-2xl text-xs flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-start gap-2.5",
					children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-4 h-4 text-indigo-400 shrink-0 mt-0.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 288,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("p", {
						className: "font-semibold text-white",
						children: ["Analiza AI: ", aiAnalysis.subjectType ? `Kadr ${aiAnalysis.subjectType}` : "Zoptymalizowano głębię"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 290,
						columnNumber: 15
					}, this), aiAnalysis.cinematicTip && /* @__PURE__ */ _jsxDEV("p", {
						className: "text-zinc-300 mt-0.5",
						children: aiAnalysis.cinematicTip
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 294,
						columnNumber: 17
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 289,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 287,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("button", {
					onClick: () => setShowAiTip(false),
					className: "text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition",
					children: /* @__PURE__ */ _jsxDEV(X, { className: "w-3.5 h-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 302,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 298,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 286,
				columnNumber: 9
			}, this),
			!zenMode && /* @__PURE__ */ _jsxDEV(ControlDock, {
				depthConfig,
				onUpdateDepthConfig: updateDepthConfig,
				motionConfig,
				onUpdateMotionConfig: updateMotionConfig,
				displayMode,
				onChangeDisplayMode: setDisplayMode,
				depthColorMap,
				onChangeDepthColorMap: setDepthColorMap,
				onOpenDepthEditor: () => setIsDepthEditorOpen(true),
				onRecordVideo: handleRecordVideo,
				onCaptureSnapshot: handleCaptureSnapshot,
				onDownloadDepthMap: handleDownloadDepthMap,
				isRecording,
				recordingProgress
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 309,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ _jsxDEV(DepthEditorModal, {
				isOpen: isDepthEditorOpen,
				onClose: () => setIsDepthEditorOpen(false),
				originalImageUrl: imageUrl,
				depthImageUrl: depthUrl,
				onSaveDepthMap: (newDepthUrl) => {
					setDepthUrl(newDepthUrl);
				}
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 328,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 238,
		columnNumber: 5
	}, this);
}

//# sourceMappingURL=data:application/json;base64,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InNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVGhyZWVDYW52YXMgfSBmcm9tICcuL2NvbXBvbmVudHMvVGhyZWVDYW52YXMnO1xuaW1wb3J0IHsgVG9wQmFyIH0gZnJvbSAnLi9jb21wb25lbnRzL1RvcEJhcic7XG5pbXBvcnQgeyBDb250cm9sRG9jayB9IGZyb20gJy4vY29tcG9uZW50cy9Db250cm9sRG9jayc7XG5pbXBvcnQgeyBEZXB0aEVkaXRvck1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL0RlcHRoRWRpdG9yTW9kYWwnO1xuaW1wb3J0IHsgUFJFU0VUX0lNQUdFUyB9IGZyb20gJy4vdXRpbHMvcHJvY2VkdXJhbEltYWdlcyc7XG5pbXBvcnQgeyBnZW5lcmF0ZURlcHRoTWFwRnJvbUltYWdlIH0gZnJvbSAnLi91dGlscy9kZXB0aEVzdGltYXRvcic7XG5pbXBvcnQgeyByZWNvcmRDYW52YXNMb29wLCBkb3dubG9hZEJsb2IgfSBmcm9tICcuL3V0aWxzL3ZpZGVvUmVjb3JkZXInO1xuaW1wb3J0IHtcbiAgRGVwdGhDb25maWcsXG4gIE1vdGlvbkNvbmZpZyxcbiAgRGlzcGxheU1vZGUsXG4gIERlcHRoTWFwQ29sb3JNYXAsXG4gIEFJRGVwdGhBbmFseXNpcyxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBTcGFya2xlcywgWCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgLy8gQ3VycmVudCBhY3RpdmUgaW1hZ2UgJiBkZXB0aCBkYXRhXG4gIGNvbnN0IFtjdXJyZW50UHJlc2V0SWQsIHNldEN1cnJlbnRQcmVzZXRJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdwb3J0cmFpdCcpO1xuICBjb25zdCBbaW1hZ2VVcmwsIHNldEltYWdlVXJsXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbZGVwdGhVcmwsIHNldERlcHRoVXJsXSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbaW1hZ2VEaW1lbnNpb25zLCBzZXRJbWFnZURpbWVuc2lvbnNdID0gdXNlU3RhdGU8eyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9Pih7XG4gICAgd2lkdGg6IDgwMCxcbiAgICBoZWlnaHQ6IDEwMDAsXG4gIH0pO1xuXG4gIC8vIDNEIFNjZW5lIENvbmZpZ3VyYXRpb25zXG4gIGNvbnN0IFtkZXB0aENvbmZpZywgc2V0RGVwdGhDb25maWddID0gdXNlU3RhdGU8RGVwdGhDb25maWc+KHtcbiAgICBzY2FsZTogMS4xLFxuICAgIGZvY3VzUGxhbmU6IDAuNSxcbiAgICBpbnZlcnRlZDogZmFsc2UsXG4gICAgY29udHJhc3Q6IDEuMCxcbiAgICBicmlnaHRuZXNzOiAwLjAsXG4gICAgZWRnZURpbGF0aW9uOiAxLjAsXG4gICAgZG9mU3RyZW5ndGg6IDAuMCxcbiAgICBjaHJvbWF0aWNBYmVycmF0aW9uOiAwLjAsXG4gIH0pO1xuXG4gIGNvbnN0IFttb3Rpb25Db25maWcsIHNldE1vdGlvbkNvbmZpZ10gPSB1c2VTdGF0ZTxNb3Rpb25Db25maWc+KHtcbiAgICBtb2RlOiAnY2lyY2xlJyxcbiAgICBhbXBsaXR1ZGU6IDAuMzUsXG4gICAgc3BlZWQ6IDEuMCxcbiAgICBpbnRlcmFjdGl2ZU1vdXNlOiB0cnVlLFxuICAgIG1vdXNlU2Vuc2l0aXZpdHk6IDAuOCxcbiAgICBhdXRvUm90YXRlOiBmYWxzZSxcbiAgICBhdXRvUm90YXRlU3BlZWQ6IDEuMCxcbiAgfSk7XG5cbiAgY29uc3QgW2Rpc3BsYXlNb2RlLCBzZXREaXNwbGF5TW9kZV0gPSB1c2VTdGF0ZTxEaXNwbGF5TW9kZT4oJ3N0YW5kYXJkJyk7XG4gIGNvbnN0IFtkZXB0aENvbG9yTWFwLCBzZXREZXB0aENvbG9yTWFwXSA9IHVzZVN0YXRlPERlcHRoTWFwQ29sb3JNYXA+KCd0dXJibycpO1xuXG4gIC8vIFVJIFN0YXRlc1xuICBjb25zdCBbaXNEZXB0aEVkaXRvck9wZW4sIHNldElzRGVwdGhFZGl0b3JPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3plbk1vZGUsIHNldFplbk1vZGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNBaUFuYWx5emluZywgc2V0SXNBaUFuYWx5emluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthaUFuYWx5c2lzLCBzZXRBaUFuYWx5c2lzXSA9IHVzZVN0YXRlPEFJRGVwdGhBbmFseXNpcyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2hvd0FpVGlwLCBzZXRTaG93QWlUaXBdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFJlY29yZGluZyAmIENhbnZhcyByZWZcbiAgY29uc3QgW2lzUmVjb3JkaW5nLCBzZXRJc1JlY29yZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtyZWNvcmRpbmdQcm9ncmVzcywgc2V0UmVjb3JkaW5nUHJvZ3Jlc3NdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IHdlYmdsQ2FudmFzUmVmID0gdXNlUmVmPEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSB3aXRoIHRoZSBmaXJzdCBwcm9jZWR1cmFsIHByZXNldCBvbiBtb3VudFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvYWRQcmVzZXQoJ3BvcnRyYWl0Jyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBsb2FkUHJlc2V0ID0gKHByZXNldElkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBwcmVzZXQgPSBQUkVTRVRfSU1BR0VTLmZpbmQoKHApID0+IHAuaWQgPT09IHByZXNldElkKSB8fCBQUkVTRVRfSU1BR0VTWzBdO1xuICAgIGNvbnN0IHsgaW1hZ2VVcmw6IGlVcmwsIGRlcHRoVXJsOiBkVXJsLCB3aWR0aCwgaGVpZ2h0IH0gPSBwcmVzZXQuY3JlYXRlSW1hZ2UoKTtcbiAgICBzZXRDdXJyZW50UHJlc2V0SWQocHJlc2V0LmlkKTtcbiAgICBzZXRJbWFnZVVybChpVXJsKTtcbiAgICBzZXREZXB0aFVybChkVXJsKTtcbiAgICBzZXRJbWFnZURpbWVuc2lvbnMoeyB3aWR0aCwgaGVpZ2h0IH0pO1xuICAgIHNldEFpQW5hbHlzaXMobnVsbCk7XG4gICAgc2V0U2hvd0FpVGlwKGZhbHNlKTtcblxuICAgIC8vIENvbnRleHQtc2Vuc2l0aXZlIGRlZmF1bHRzIHBlciBwcmVzZXRcbiAgICBpZiAocHJlc2V0LmlkID09PSAncG9ydHJhaXQnKSB7XG4gICAgICBzZXREZXB0aENvbmZpZygocHJldikgPT4gKHsgLi4ucHJldiwgc2NhbGU6IDEuMiwgZm9jdXNQbGFuZTogMC42NSB9KSk7XG4gICAgICBzZXRNb3Rpb25Db25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIG1vZGU6ICdjaXJjbGUnLCBhbXBsaXR1ZGU6IDAuMzUgfSkpO1xuICAgIH0gZWxzZSBpZiAocHJlc2V0LmlkID09PSAnbGFuZHNjYXBlJykge1xuICAgICAgc2V0RGVwdGhDb25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIHNjYWxlOiAxLjQsIGZvY3VzUGxhbmU6IDAuNCB9KSk7XG4gICAgICBzZXRNb3Rpb25Db25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIG1vZGU6ICdob3Jpem9udGFsJywgYW1wbGl0dWRlOiAwLjQgfSkpO1xuICAgIH0gZWxzZSBpZiAocHJlc2V0LmlkID09PSAnc3RyZWV0Jykge1xuICAgICAgc2V0RGVwdGhDb25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIHNjYWxlOiAxLjUsIGZvY3VzUGxhbmU6IDAuMzUgfSkpO1xuICAgICAgc2V0TW90aW9uQ29uZmlnKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBtb2RlOiAnaW5maW5pdHknLCBhbXBsaXR1ZGU6IDAuMzggfSkpO1xuICAgIH0gZWxzZSBpZiAocHJlc2V0LmlkID09PSAnbWFjcm8nKSB7XG4gICAgICBzZXREZXB0aENvbmZpZygocHJldikgPT4gKHsgLi4ucHJldiwgc2NhbGU6IDEuNiwgZm9jdXNQbGFuZTogMC41NSB9KSk7XG4gICAgICBzZXRNb3Rpb25Db25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIG1vZGU6ICdicmVhdGhlJywgYW1wbGl0dWRlOiAwLjQgfSkpO1xuICAgIH1cbiAgfTtcblxuICAvLyBVcGxvYWQgdXNlciBpbWFnZVxuICBjb25zdCBoYW5kbGVVcGxvYWRVc2VySW1hZ2UgPSAoZmlsZTogRmlsZSkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBjb25zdCBkYXRhVXJsID0gZS50YXJnZXQ/LnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIHNldEltYWdlRGltZW5zaW9ucyh7IHdpZHRoOiBpbWcud2lkdGgsIGhlaWdodDogaW1nLmhlaWdodCB9KTtcbiAgICAgICAgc2V0SW1hZ2VVcmwoZGF0YVVybCk7XG4gICAgICAgIHNldEN1cnJlbnRQcmVzZXRJZCgnY3VzdG9tJyk7XG5cbiAgICAgICAgLy8gQXV0b21hdGljYWxseSBzeW50aGVzaXplIGFuIGluaXRpYWwgaGlnaC1maWRlbGl0eSBkZXB0aCBtYXBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7IGRlcHRoRGF0YVVybCB9ID0gYXdhaXQgZ2VuZXJhdGVEZXB0aE1hcEZyb21JbWFnZShpbWcsIHtcbiAgICAgICAgICAgIG1vZGU6ICdnZW5lcmFsJyxcbiAgICAgICAgICAgIGNvbnRyYXN0OiAxLjEsXG4gICAgICAgICAgICBzbW9vdGhuZXNzOiA0LFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHNldERlcHRoVXJsKGRlcHRoRGF0YVVybCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0LFgsSFZCBnZW5lcm93YW5pYSBnxYLEmWJpOicsIGVycik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBpbWcuc3JjID0gZGF0YVVybDtcbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9O1xuXG4gIC8vIFVwbG9hZCBjdXN0b20gcGFpcmVkIGRlcHRoIG1hcFxuICBjb25zdCBoYW5kbGVVcGxvYWREZXB0aE1hcCA9IChmaWxlOiBGaWxlKSA9PiB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIub25sb2FkID0gKGUpID0+IHtcbiAgICAgIGNvbnN0IGRhdGFVcmwgPSBlLnRhcmdldD8ucmVzdWx0IGFzIHN0cmluZztcbiAgICAgIHNldERlcHRoVXJsKGRhdGFVcmwpO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH07XG5cbiAgLy8gRHJhZyBhbmQgZHJvcCBpbWFnZSBvbnRvIHdpbmRvd1xuICBjb25zdCBoYW5kbGVEcmFnT3ZlciA9IChlOiBSZWFjdC5EcmFnRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRHJvcCA9IChlOiBSZWFjdC5EcmFnRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKGUuZGF0YVRyYW5zZmVyLmZpbGVzICYmIGUuZGF0YVRyYW5zZmVyLmZpbGVzWzBdKSB7XG4gICAgICBoYW5kbGVVcGxvYWRVc2VySW1hZ2UoZS5kYXRhVHJhbnNmZXIuZmlsZXNbMF0pO1xuICAgIH1cbiAgfTtcblxuICAvLyBUcmlnZ2VyIEdlbWluaSBBSSBkZXB0aCBhbmFseXNpc1xuICBjb25zdCBoYW5kbGVSdW5BaUFuYWx5c2lzID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghaW1hZ2VVcmwpIHJldHVybjtcbiAgICBzZXRJc0FpQW5hbHl6aW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9hbmFseXplLWRlcHRoJywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBpbWFnZUJhc2U2NDogaW1hZ2VVcmwsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5hbmFseXNpcykge1xuICAgICAgICBjb25zdCBhbmFseXNpczogQUlEZXB0aEFuYWx5c2lzID0gZGF0YS5hbmFseXNpcztcbiAgICAgICAgc2V0QWlBbmFseXNpcyhhbmFseXNpcyk7XG4gICAgICAgIHNldFNob3dBaVRpcCh0cnVlKTtcblxuICAgICAgICAvLyBBcHBseSBBSSBzdWdnZXN0aW9uc1xuICAgICAgICBpZiAoYW5hbHlzaXMucmVjb21tZW5kZWREZXB0aFNjYWxlKSB7XG4gICAgICAgICAgc2V0RGVwdGhDb25maWcoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgc2NhbGU6IE1hdGgubWluKDIuMCwgTWF0aC5tYXgoMC40LCBhbmFseXNpcy5yZWNvbW1lbmRlZERlcHRoU2NhbGUhKSksXG4gICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmFseXNpcy5mb2NhbFBvaW50KSB7XG4gICAgICAgICAgc2V0RGVwdGhDb25maWcoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgZm9jdXNQbGFuZTogTWF0aC5taW4oMC45LCBNYXRoLm1heCgwLjEsIGFuYWx5c2lzLmZvY2FsUG9pbnQhLnkpKSxcbiAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0LFgsSFZCBhbmFsaXp5IEFJOicsIGVycik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzQWlBbmFseXppbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICAvLyBVcGRhdGUgZGVwdGggY29uZmlnIGhlbHBlclxuICBjb25zdCB1cGRhdGVEZXB0aENvbmZpZyA9IHVzZUNhbGxiYWNrKChuZXdDZmc6IFBhcnRpYWw8RGVwdGhDb25maWc+KSA9PiB7XG4gICAgc2V0RGVwdGhDb25maWcoKHByZXYpID0+ICh7IC4uLnByZXYsIC4uLm5ld0NmZyB9KSk7XG4gIH0sIFtdKTtcblxuICAvLyBVcGRhdGUgbW90aW9uIGNvbmZpZyBoZWxwZXJcbiAgY29uc3QgdXBkYXRlTW90aW9uQ29uZmlnID0gdXNlQ2FsbGJhY2soKG5ld0NmZzogUGFydGlhbDxNb3Rpb25Db25maWc+KSA9PiB7XG4gICAgc2V0TW90aW9uQ29uZmlnKChwcmV2KSA9PiAoeyAuLi5wcmV2LCAuLi5uZXdDZmcgfSkpO1xuICB9LCBbXSk7XG5cbiAgLy8gUmVjb3JkIFdlYk0gbG9vcCB2aWRlb1xuICBjb25zdCBoYW5kbGVSZWNvcmRWaWRlbyA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXdlYmdsQ2FudmFzUmVmLmN1cnJlbnQgfHwgaXNSZWNvcmRpbmcpIHJldHVybjtcbiAgICBzZXRJc1JlY29yZGluZyh0cnVlKTtcbiAgICBzZXRSZWNvcmRpbmdQcm9ncmVzcygwKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlY29yZENhbnZhc0xvb3Aod2ViZ2xDYW52YXNSZWYuY3VycmVudCwgMzYwMCwgKHApID0+IHtcbiAgICAgICAgc2V0UmVjb3JkaW5nUHJvZ3Jlc3MocCk7XG4gICAgICB9KTtcbiAgICAgIGRvd25sb2FkQmxvYihibG9iLCBgcGFyYWxsYXgzZC1sb29wLSR7RGF0ZS5ub3coKX0ud2VibWApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQsWCxIVkIG5hZ3J5d2FuaWEgd2lkZW86JywgZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNSZWNvcmRpbmcoZmFsc2UpO1xuICAgICAgc2V0UmVjb3JkaW5nUHJvZ3Jlc3MoMCk7XG4gICAgfVxuICB9O1xuXG4gIC8vIENhcHR1cmUgc3BhdGlhbCBzbmFwc2hvdCAoUE5HKVxuICBjb25zdCBoYW5kbGVDYXB0dXJlU25hcHNob3QgPSAoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gd2ViZ2xDYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgIGNvbnN0IHVybCA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSBgcGFyYWxsYXgzZC1rYWRyLSR7RGF0ZS5ub3coKX0ucG5nYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICB9O1xuXG4gIC8vIERvd25sb2FkIGRlcHRoIG1hcCAoUE5HKVxuICBjb25zdCBoYW5kbGVEb3dubG9hZERlcHRoTWFwID0gKCkgPT4ge1xuICAgIGlmICghZGVwdGhVcmwpIHJldHVybjtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IGRlcHRoVXJsO1xuICAgIGEuZG93bmxvYWQgPSBgZGVwdGgtbWFwLSR7RGF0ZS5ub3coKX0ucG5nYDtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgb25EcmFnT3Zlcj17aGFuZGxlRHJhZ092ZXJ9XG4gICAgICBvbkRyb3A9e2hhbmRsZURyb3B9XG4gICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LXNjcmVlbiBoLXNjcmVlbiBvdmVyZmxvdy1oaWRkZW4gYmctemluYy05NTAgdGV4dC13aGl0ZSBzZWxlY3Qtbm9uZVwiXG4gICAgPlxuICAgICAgey8qIDNEIFdlYkdMIENhbnZhcyBMYXllciAqL31cbiAgICAgIHtpbWFnZVVybCAmJiBkZXB0aFVybCAmJiAoXG4gICAgICAgIDxUaHJlZUNhbnZhc1xuICAgICAgICAgIGltYWdlVXJsPXtpbWFnZVVybH1cbiAgICAgICAgICBkZXB0aFVybD17ZGVwdGhVcmx9XG4gICAgICAgICAgaW1hZ2VEaW1lbnNpb25zPXtpbWFnZURpbWVuc2lvbnN9XG4gICAgICAgICAgZGVwdGhDb25maWc9e2RlcHRoQ29uZmlnfVxuICAgICAgICAgIG1vdGlvbkNvbmZpZz17bW90aW9uQ29uZmlnfVxuICAgICAgICAgIGRpc3BsYXlNb2RlPXtkaXNwbGF5TW9kZX1cbiAgICAgICAgICBkZXB0aENvbG9yTWFwPXtkZXB0aENvbG9yTWFwfVxuICAgICAgICAgIG9uQ2FudmFzUmVhZHk9eyhjYW52YXMpID0+IHtcbiAgICAgICAgICAgIHdlYmdsQ2FudmFzUmVmLmN1cnJlbnQgPSBjYW52YXM7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUb3AgQmFyIChIZWFkZXIpICovfVxuICAgICAgeyF6ZW5Nb2RlICYmIChcbiAgICAgICAgPFRvcEJhclxuICAgICAgICAgIGN1cnJlbnRQcmVzZXRJZD17Y3VycmVudFByZXNldElkfVxuICAgICAgICAgIG9uU2VsZWN0UHJlc2V0PXtsb2FkUHJlc2V0fVxuICAgICAgICAgIG9uVXBsb2FkSW1hZ2U9e2hhbmRsZVVwbG9hZFVzZXJJbWFnZX1cbiAgICAgICAgICBvblVwbG9hZERlcHRoTWFwPXtoYW5kbGVVcGxvYWREZXB0aE1hcH1cbiAgICAgICAgICBpc0FpQW5hbHl6aW5nPXtpc0FpQW5hbHl6aW5nfVxuICAgICAgICAgIG9uUnVuQWlBbmFseXNpcz17aGFuZGxlUnVuQWlBbmFseXNpc31cbiAgICAgICAgICBhaUFuYWx5c2lzPXthaUFuYWx5c2lzfVxuICAgICAgICAgIHplbk1vZGU9e3plbk1vZGV9XG4gICAgICAgICAgb25Ub2dnbGVaZW5Nb2RlPXsoKSA9PiBzZXRaZW5Nb2RlKHRydWUpfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIFplbiBtb2RlIHF1aWNrIHJlc3RvcmUgYnV0dG9uICovfVxuICAgICAge3plbk1vZGUgJiYgKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0WmVuTW9kZShmYWxzZSl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgcmlnaHQtNCB6LTUwIHB4LTMgcHktMS41IHJvdW5kZWQtbGcgYmctemluYy05MDAvOTAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtemluYy0yMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uIHNoYWRvdy1sZ1wiXG4gICAgICAgID5cbiAgICAgICAgICBQcnp5d3LDs8SHIEludGVyZmVqc1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBBSSBBbmFseXNpcyBGbG9hdGluZyBGZWVkYmFjayBCYWRnZSAqL31cbiAgICAgIHtzaG93QWlUaXAgJiYgYWlBbmFseXNpcyAmJiAhemVuTW9kZSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTE2IGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgei00MCBtYXgtdy1sZyB3LVs5MHZ3XSBwLTMgcm91bmRlZC14bCBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvNTAgc2hhZG93LTJ4bCB0ZXh0LXhzIGZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yLjVcIj5cbiAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTQwMCBzaHJpbmstMCBtdC0wLjVcIiAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgQW5hbGl6YSBBSToge2FpQW5hbHlzaXMuc3ViamVjdFR5cGUgPyBgS2FkciAke2FpQW5hbHlzaXMuc3ViamVjdFR5cGV9YCA6ICdab3B0eW1hbGl6b3dhbm8gZ8WCxJliacSZJ31cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICB7YWlBbmFseXNpcy5jaW5lbWF0aWNUaXAgJiYgKFxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDAgbXQtMC41XCI+e2FpQW5hbHlzaXMuY2luZW1hdGljVGlwfTwvcD5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dBaVRpcChmYWxzZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtd2hpdGUgcC0xIHJvdW5kZWQgaG92ZXI6YmctemluYy04MDAgdHJhbnNpdGlvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBCb3R0b20gQ29sbGFwc2libGUgQ29udHJvbCBEb2NrICovfVxuICAgICAgeyF6ZW5Nb2RlICYmIChcbiAgICAgICAgPENvbnRyb2xEb2NrXG4gICAgICAgICAgZGVwdGhDb25maWc9e2RlcHRoQ29uZmlnfVxuICAgICAgICAgIG9uVXBkYXRlRGVwdGhDb25maWc9e3VwZGF0ZURlcHRoQ29uZmlnfVxuICAgICAgICAgIG1vdGlvbkNvbmZpZz17bW90aW9uQ29uZmlnfVxuICAgICAgICAgIG9uVXBkYXRlTW90aW9uQ29uZmlnPXt1cGRhdGVNb3Rpb25Db25maWd9XG4gICAgICAgICAgZGlzcGxheU1vZGU9e2Rpc3BsYXlNb2RlfVxuICAgICAgICAgIG9uQ2hhbmdlRGlzcGxheU1vZGU9e3NldERpc3BsYXlNb2RlfVxuICAgICAgICAgIGRlcHRoQ29sb3JNYXA9e2RlcHRoQ29sb3JNYXB9XG4gICAgICAgICAgb25DaGFuZ2VEZXB0aENvbG9yTWFwPXtzZXREZXB0aENvbG9yTWFwfVxuICAgICAgICAgIG9uT3BlbkRlcHRoRWRpdG9yPXsoKSA9PiBzZXRJc0RlcHRoRWRpdG9yT3Blbih0cnVlKX1cbiAgICAgICAgICBvblJlY29yZFZpZGVvPXtoYW5kbGVSZWNvcmRWaWRlb31cbiAgICAgICAgICBvbkNhcHR1cmVTbmFwc2hvdD17aGFuZGxlQ2FwdHVyZVNuYXBzaG90fVxuICAgICAgICAgIG9uRG93bmxvYWREZXB0aE1hcD17aGFuZGxlRG93bmxvYWREZXB0aE1hcH1cbiAgICAgICAgICBpc1JlY29yZGluZz17aXNSZWNvcmRpbmd9XG4gICAgICAgICAgcmVjb3JkaW5nUHJvZ3Jlc3M9e3JlY29yZGluZ1Byb2dyZXNzfVxuICAgICAgICAvPlxuICAgICAgKX1cblxuICAgICAgey8qIERlcHRoIE1hcCBQYWludGVyICYgRWRpdG9yIE1vZGFsICovfVxuICAgICAgPERlcHRoRWRpdG9yTW9kYWxcbiAgICAgICAgaXNPcGVuPXtpc0RlcHRoRWRpdG9yT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNEZXB0aEVkaXRvck9wZW4oZmFsc2UpfVxuICAgICAgICBvcmlnaW5hbEltYWdlVXJsPXtpbWFnZVVybH1cbiAgICAgICAgZGVwdGhJbWFnZVVybD17ZGVwdGhVcmx9XG4gICAgICAgIG9uU2F2ZURlcHRoTWFwPXsobmV3RGVwdGhVcmwpID0+IHtcbiAgICAgICAgICBzZXREZXB0aFVybChuZXdEZXB0aFVybCk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl19