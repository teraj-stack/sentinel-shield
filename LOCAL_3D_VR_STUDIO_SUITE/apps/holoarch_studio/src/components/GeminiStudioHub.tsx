const React = __vite__cjsImport0_react; const useEffect = __vite__cjsImport0_react["useEffect"]; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/holoarch_studio/node_modules/.vite/deps/react.js?v=c1c4f681";
import { Bot, Download, ExternalLink, Film, Globe, Image as ImageIcon, Loader2, MessageSquare, Mic, MicOff, Send, Sparkles, Upload, Video, Volume2, Wand2 } from "/apps/holoarch_studio/node_modules/.vite/deps/lucide-react.js?v=c1c4f681";
var _jsxFileName = "/app/applet/src/components/GeminiStudioHub.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/holoarch_studio/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c1c4f681";
// Helper to convert Float32Array mic buffer (16kHz) to base64 16-bit PCM little-endian
function float32ToPcm16Base64(float32Array) {
	const buffer = new ArrayBuffer(float32Array.length * 2);
	const view = new DataView(buffer);
	for (let i = 0; i < float32Array.length; i++) {
		const s = Math.max(-1, Math.min(1, float32Array[i]));
		view.setInt16(i * 2, s < 0 ? s * 32768 : s * 32767, true);
	}
	const bytes = new Uint8Array(buffer);
	let binary = "";
	for (let i = 0; i < bytes.byteLength; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
}
// Helper to convert URL (such as /assets/aistudio/Dashboard_dex_eeffcbc7.jpg) to base64
async function urlToBase64(url) {
	const res = await fetch(url);
	const blob = await res.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			const result = String(reader.result || "");
			resolve({
				data: result,
				mimeType: blob.type || "image/jpeg"
			});
		};
		reader.onerror = reject;
		reader.readAsDataURL(blob);
	});
}
export const GeminiStudioHub = ({ latestScreenshot, defaultVisualPrompt, onNotify }) => {
	const [activeToolTab, setActiveToolTab] = useState("chatbot");
	// ---------------------------------------------------------------------------
	// 1. Multi-Turn Chatbot State (gemini-4-argon, gemini-3.8-flash, gemini-3.1-flash-lite)
	// ---------------------------------------------------------------------------
	const [chatModel, setChatModel] = useState("gemini-4-argon");
	const [rolePersona, setRolePersona] = useState("xr_architect");
	const [chatMessages, setChatMessages] = useState([{
		id: "welcome-1",
		role: "model",
		text: "Cześć! Jestem Twoim asystentem inżynieryjnym XR/AR w HoloArch Studio. Wybierz model (`gemini-4-argon` do złożonej architektury C# i matematyki 3D, `gemini-3.8-flash` do zadań ogólnych lub `gemini-3.1-flash-lite` do błyskawicznych odpowiedzi) i zapytaj o detekcję płaszczyzn ARKit/ARCore, shadery hologramów lub eksport OBJ/STL.",
		modelUsed: "gemini-4-argon",
		timestamp: "Gotowy"
	}]);
	const [chatInput, setChatInput] = useState("");
	const [isChatLoading, setIsChatLoading] = useState(false);
	const chatScrollRef = useRef(null);
	useEffect(() => {
		if (chatScrollRef.current) {
			chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
		}
	}, [chatMessages, isChatLoading]);
	const handleSendChat = async (customText) => {
		const textToSend = (customText ?? chatInput).trim();
		if (!textToSend || isChatLoading) return;
		const userMsg = {
			id: `u-${Date.now()}`,
			role: "user",
			text: textToSend,
			timestamp: new Date().toLocaleTimeString("pl-PL", {
				hour: "2-digit",
				minute: "2-digit"
			})
		};
		const historyForApi = chatMessages.map((m) => ({
			role: m.role,
			text: m.text
		}));
		setChatMessages((prev) => [...prev, userMsg]);
		if (!customText) setChatInput("");
		setIsChatLoading(true);
		try {
			const response = await fetch("/api/ai/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					model: chatModel,
					rolePersona,
					messages: historyForApi,
					message: textToSend
				})
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Błąd odpowiedzi modelu Gemini");
			}
			setChatMessages((prev) => [...prev, {
				id: `m-${Date.now()}`,
				role: "model",
				text: data.text,
				modelUsed: data.model || chatModel,
				timestamp: new Date().toLocaleTimeString("pl-PL", {
					hour: "2-digit",
					minute: "2-digit"
				})
			}]);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Nie udało się uzyskać odpowiedzi.";
			setChatMessages((prev) => [...prev, {
				id: `err-${Date.now()}`,
				role: "model",
				text: `Wystąpił błąd: ${msg}`,
				modelUsed: chatModel,
				timestamp: "Błąd"
			}]);
		} finally {
			setIsChatLoading(false);
		}
	};
	// ---------------------------------------------------------------------------
	// 2. Image Generation & Editing State (gemini-nano-banana-2.1)
	// ---------------------------------------------------------------------------
	const [imageMode, setImageMode] = useState("create");
	const [imagePrompt, setImagePrompt] = useState(defaultVisualPrompt);
	const [imageAspectRatio, setImageAspectRatio] = useState("16:9");
	const [imageSize, setImageSize] = useState("1K");
	const [useImageSearchGrounding, setUseImageSearchGrounding] = useState(false);
	const [uploadedEditImage, setUploadedEditImage] = useState(null);
	const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
	const [isImageLoading, setIsImageLoading] = useState(false);
	const [imageError, setImageError] = useState(null);
	const handleUploadImageForEdit = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			setUploadedEditImage({
				dataUrl: String(reader.result || ""),
				mimeType: file.type || "image/png",
				name: file.name
			});
			setImageMode("edit_upload");
		};
		reader.readAsDataURL(file);
	};
	const handleRunNanoBananaImage = async () => {
		if (!imagePrompt.trim() || isImageLoading) return;
		setIsImageLoading(true);
		setImageError(null);
		try {
			let base64Image;
			let mimeType = "image/png";
			if (imageMode === "edit_reference") {
				const refData = await urlToBase64("/apps/holoarch_studio/assets/aistudio/Dashboard_dex_eeffcbc7.jpg");
				base64Image = refData.data;
				mimeType = refData.mimeType;
			} else if (imageMode === "edit_upload" && uploadedEditImage) {
				base64Image = uploadedEditImage.dataUrl;
				mimeType = uploadedEditImage.mimeType;
			} else if (imageMode === "edit_3d" && latestScreenshot) {
				base64Image = latestScreenshot.dataUrl;
				mimeType = "image/png";
			}
			const response = await fetch("/api/ai/image", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					prompt: imagePrompt,
					base64Image,
					mimeType,
					aspectRatio: imageAspectRatio,
					imageSize,
					useSearchGrounding: useImageSearchGrounding
				})
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Błąd generowania obrazu");
			}
			setGeneratedImageUrl(data.imageUrl);
			onNotify("Wygenerowano obraz architektoniczny za pomocą gemini-nano-banana-2.1");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Błąd generowania obrazu";
			setImageError(msg);
		} finally {
			setIsImageLoading(false);
		}
	};
	// ---------------------------------------------------------------------------
	// 3. Video Generation & Photo Animation State (gemini-omni-1.1-flash via Interactions API)
	// ---------------------------------------------------------------------------
	const [videoMode, setVideoMode] = useState("animate_photo");
	const [videoPhotoSource, setVideoPhotoSource] = useState("reference_table");
	const [uploadedVideoPhoto, setUploadedVideoPhoto] = useState(null);
	const [videoPrompt, setVideoPrompt] = useState("Smooth cinematic 6DoF camera orbit around the glowing cyan and golden holographic skyscraper complex on the conference table, dynamic sunset particles drifting behind the panoramic room windows, pulsing data network lines on the table surface.");
	const [videoAspectRatio, setVideoAspectRatio] = useState("16:9");
	const [videoDuration, setVideoDuration] = useState("5s");
	const [generatedVideoUrl, setGeneratedVideoUrl] = useState(null);
	const [isVideoLoading, setIsVideoLoading] = useState(false);
	const [videoError, setVideoError] = useState(null);
	const handleUploadPhotoForVideo = (e) => {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = () => {
			setUploadedVideoPhoto({
				dataUrl: String(reader.result || ""),
				mimeType: file.type || "image/jpeg",
				name: file.name
			});
			setVideoMode("animate_photo");
			setVideoPhotoSource("uploaded");
		};
		reader.readAsDataURL(file);
	};
	const handleRunOmniFlashVideo = async () => {
		if (!videoPrompt.trim() || isVideoLoading) return;
		setIsVideoLoading(true);
		setVideoError(null);
		try {
			let base64Image;
			let mimeType = "image/jpeg";
			if (videoMode === "animate_photo") {
				if (videoPhotoSource === "uploaded") {
					if (!uploadedVideoPhoto) {
						throw new Error("Prześlij najpierw zdjęcie z dysku lub wybierz wzorzec stołu AR.");
					}
					base64Image = uploadedVideoPhoto.dataUrl;
					mimeType = uploadedVideoPhoto.mimeType;
				} else if (videoPhotoSource === "reference_table") {
					const refData = await urlToBase64("/apps/holoarch_studio/assets/aistudio/Dashboard_dex_eeffcbc7.jpg");
					base64Image = refData.data;
					mimeType = refData.mimeType;
				} else if (videoPhotoSource === "latest_3d") {
					if (!latestScreenshot) {
						throw new Error("Najpierw wykonaj zrzut ekranu w symulatorze 3D.");
					}
					base64Image = latestScreenshot.dataUrl;
					mimeType = "image/png";
				} else if (videoPhotoSource === "generated_nano") {
					if (!generatedImageUrl) {
						throw new Error("Najpierw wygeneruj obraz w zakładce Kreator Obrazów.");
					}
					base64Image = generatedImageUrl;
					mimeType = "image/png";
				}
			}
			const response = await fetch("/api/ai/video", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					prompt: videoPrompt,
					base64Image,
					mimeType,
					aspectRatio: videoAspectRatio,
					duration: videoDuration
				})
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Błąd generowania wideo w gemini-omni-1.1-flash");
			}
			setGeneratedVideoUrl(data.videoUrl);
			onNotify(`Wygenerowano wideo (${data.aspectRatio}) w modelu gemini-omni-1.1-flash`);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Błąd generowania wideo";
			setVideoError(msg);
		} finally {
			setIsVideoLoading(false);
		}
	};
	// ---------------------------------------------------------------------------
	// 4. Real-Time Voice Conversation State (gemini-3.8-live via WebSocket)
	// ---------------------------------------------------------------------------
	const [isLiveConnected, setIsLiveConnected] = useState(false);
	const [isLiveConnecting, setIsLiveConnecting] = useState(false);
	const [liveError, setLiveError] = useState(null);
	const [liveTranscripts, setLiveTranscripts] = useState([]);
	const [liveTextPrompt, setLiveTextPrompt] = useState("");
	const wsRef = useRef(null);
	const inputAudioCtxRef = useRef(null);
	const outputAudioCtxRef = useRef(null);
	const mediaStreamRef = useRef(null);
	const processorRef = useRef(null);
	const nextStartTimeRef = useRef(0);
	const activeSourcesRef = useRef([]);
	const stopLiveSession = () => {
		if (processorRef.current) {
			try {
				processorRef.current.disconnect();
			} catch {}
			processorRef.current = null;
		}
		if (mediaStreamRef.current) {
			mediaStreamRef.current.getTracks().forEach((t) => t.stop());
			mediaStreamRef.current = null;
		}
		if (inputAudioCtxRef.current) {
			inputAudioCtxRef.current.close().catch(() => {});
			inputAudioCtxRef.current = null;
		}
		activeSourcesRef.current.forEach((src) => {
			try {
				src.stop();
			} catch {}
		});
		activeSourcesRef.current = [];
		if (outputAudioCtxRef.current) {
			outputAudioCtxRef.current.close().catch(() => {});
			outputAudioCtxRef.current = null;
		}
		if (wsRef.current) {
			try {
				wsRef.current.close();
			} catch {}
			wsRef.current = null;
		}
		setIsLiveConnected(false);
		setIsLiveConnecting(false);
	};
	useEffect(() => {
		return () => {
			stopLiveSession();
		};
	}, []);
	const playPcm24kChunk = (base64Pcm) => {
		const outCtx = outputAudioCtxRef.current;
		if (!outCtx) return;
		const binary = atob(base64Pcm);
		const byteLength = binary.length;
		const int16Length = Math.floor(byteLength / 2);
		if (int16Length === 0) return;
		const bytes = new Uint8Array(byteLength);
		for (let i = 0; i < byteLength; i++) {
			bytes[i] = binary.charCodeAt(i);
		}
		const view = new DataView(bytes.buffer);
		const audioBuffer = outCtx.createBuffer(1, int16Length, 24e3);
		const channelData = audioBuffer.getChannelData(0);
		for (let i = 0; i < int16Length; i++) {
			channelData[i] = view.getInt16(i * 2, true) / 32768;
		}
		const source = outCtx.createBufferSource();
		source.buffer = audioBuffer;
		source.connect(outCtx.destination);
		const now = outCtx.currentTime;
		if (nextStartTimeRef.current < now) {
			nextStartTimeRef.current = now + .02;
		}
		source.start(nextStartTimeRef.current);
		nextStartTimeRef.current += audioBuffer.duration;
		activeSourcesRef.current.push(source);
		source.onended = () => {
			activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
		};
	};
	const startLiveSession = async () => {
		if (isLiveConnected || isLiveConnecting) return;
		setIsLiveConnecting(true);
		setLiveError(null);
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: {
				sampleRate: 16e3,
				channelCount: 1,
				echoCancellation: true,
				noiseSuppression: true
			} });
			mediaStreamRef.current = stream;
			const inputCtx = new AudioContext({ sampleRate: 16e3 });
			const outputCtx = new AudioContext({ sampleRate: 24e3 });
			inputAudioCtxRef.current = inputCtx;
			outputAudioCtxRef.current = outputCtx;
			nextStartTimeRef.current = 0;
			const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";
			const ws = new WebSocket(`${wsProtocol}//${window.location.host}/live`);
			wsRef.current = ws;
			ws.onopen = () => {
				const source = inputCtx.createMediaStreamSource(stream);
				const processor = inputCtx.createScriptProcessor(4096, 1, 1);
				processorRef.current = processor;
				processor.onaudioprocess = (e) => {
					if (ws.readyState === WebSocket.OPEN) {
						const floatData = e.inputBuffer.getChannelData(0);
						const base64Audio = float32ToPcm16Base64(floatData);
						ws.send(JSON.stringify({ audio: base64Audio }));
					}
				};
				source.connect(processor);
				processor.connect(inputCtx.destination);
			};
			ws.onmessage = (event) => {
				try {
					const msg = JSON.parse(event.data);
					if (msg.status === "connected") {
						setIsLiveConnected(true);
						setIsLiveConnecting(false);
						onNotify("Połączono głosowo na żywo z modelem gemini-3.8-live");
					} else if (msg.audio) {
						playPcm24kChunk(msg.audio);
					} else if (msg.interrupted) {
						activeSourcesRef.current.forEach((s) => {
							try {
								s.stop();
							} catch {}
						});
						activeSourcesRef.current = [];
						if (outputAudioCtxRef.current) {
							nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
						}
					} else if (msg.inputTranscription) {
						setLiveTranscripts((prev) => [...prev, {
							id: `in-${Date.now()}-${Math.random()}`,
							speaker: "Ty (Mikrofon)",
							text: msg.inputTranscription
						}]);
					} else if (msg.outputTranscription) {
						setLiveTranscripts((prev) => [...prev, {
							id: `out-${Date.now()}-${Math.random()}`,
							speaker: "Gemini 3.8 Live",
							text: msg.outputTranscription
						}]);
					} else if (msg.error) {
						setLiveError(msg.error);
						stopLiveSession();
					}
				} catch {}
			};
			ws.onerror = () => {
				setLiveError("Błąd połączenia WebSocket z serwerem Live API.");
				stopLiveSession();
			};
			ws.onclose = () => {
				stopLiveSession();
			};
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Brak dostępu do mikrofonu lub błąd inicjalizacji audio.";
			setLiveError(msg);
			stopLiveSession();
		}
	};
	const handleSendLiveTextTurn = (e) => {
		e.preventDefault();
		if (!liveTextPrompt.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
			return;
		}
		wsRef.current.send(JSON.stringify({ text: liveTextPrompt.trim() }));
		setLiveTranscripts((prev) => [...prev, {
			id: `txt-${Date.now()}`,
			speaker: "Ty (Mikrofon)",
			text: liveTextPrompt.trim()
		}]);
		setLiveTextPrompt("");
	};
	// ---------------------------------------------------------------------------
	// 5. Google Search Grounding State (gemini-3.8-flash + googleSearch)
	// ---------------------------------------------------------------------------
	const [searchQuery, setSearchQuery] = useState("Najnowsze wsparcie ARCore Depth API oraz ToF dla tabletów i smartfonów Samsung Galaxy S24 / Tab S9 oraz Unity 6 AR Foundation");
	const [searchResultText, setSearchResultText] = useState(null);
	const [searchSources, setSearchSources] = useState([]);
	const [isSearchLoading, setIsSearchLoading] = useState(false);
	const [searchError, setSearchError] = useState(null);
	const handleRunSearchGrounding = async (customQuery) => {
		const q = (customQuery ?? searchQuery).trim();
		if (!q || isSearchLoading) return;
		if (customQuery) setSearchQuery(customQuery);
		setIsSearchLoading(true);
		setSearchError(null);
		try {
			const response = await fetch("/api/ai/search-grounding", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ query: q })
			});
			const data = await response.json();
			if (!response.ok) {
				throw new Error(data.error || "Błąd wyszukiwania Google Search Grounding");
			}
			setSearchResultText(data.text);
			setSearchSources(data.sources || []);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Błąd Google Search Grounding";
			setSearchError(msg);
		} finally {
			setIsSearchLoading(false);
		}
	};
	return /* @__PURE__ */ _jsxDEV("section", {
		id: "gemini-ai-hub",
		className: "space-y-6 pt-4 border-t border-slate-800/80",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-col lg:flex-row lg:items-end justify-between gap-4",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "space-y-1.5",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center gap-2 text-xs text-cyan-400 font-mono",
							children: [
								/* @__PURE__ */ _jsxDEV("span", { children: "Centrum Multimodalne Gemini AI" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 624,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", {
									"aria-hidden": "true",
									children: "·"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 625,
									columnNumber: 13
								}, this),
								/* @__PURE__ */ _jsxDEV("span", { children: "Chatbot · Nano Banana 2.1 · Omni Flash Video · Live 3.8 · Google Search" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 626,
									columnNumber: 13
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 623,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("h2", {
							className: "text-2xl font-bold text-white font-display",
							children: "Studio Sztucznej Inteligencji: Czat, Obrazy, Wideo, Głos na Żywo i Wyszukiwarka Google"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 628,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-sm text-slate-300 max-w-3xl",
							children: [
								"Rozwijaj makiety architektoniczne AR przy użyciu dedykowanych modeli: prowadź rozmowy głosowe na żywo (",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono",
									children: "gemini-3.8-live"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 633,
									columnNumber: 30
								}, this),
								"), generuj i edytuj wizualizacje stołu holograficznego (",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono",
									children: "gemini-nano-banana-2.1"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 634,
									columnNumber: 49
								}, this),
								"), animuj zdjęcia budynków w wideo 16:9 / 9:16 (",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono",
									children: "gemini-omni-1.1-flash"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 635,
									columnNumber: 58
								}, this),
								") oraz weryfikuj dane z Google Search (",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono",
									children: "gemini-3.8-flash"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 636,
									columnNumber: 50
								}, this),
								")."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 631,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 622,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex flex-wrap items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg shrink-0",
					children: [
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setActiveToolTab("chatbot"),
							className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeToolTab === "chatbot" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
							children: [/* @__PURE__ */ _jsxDEV(MessageSquare, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 650,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Czatbot Gemini" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 651,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 642,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setActiveToolTab("image_studio"),
							className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeToolTab === "image_studio" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
							children: [/* @__PURE__ */ _jsxDEV(Wand2, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 662,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Obrazy (Nano Banana 2.1)" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 663,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 654,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setActiveToolTab("video_omni"),
							className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeToolTab === "video_omni" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
							children: [/* @__PURE__ */ _jsxDEV(Film, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 674,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wideo i Animacja Zdjęć" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 675,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 666,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setActiveToolTab("live_voice"),
							className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeToolTab === "live_voice" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
							children: [/* @__PURE__ */ _jsxDEV(Mic, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 686,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Głos na Żywo (Live 3.8)" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 687,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 678,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							onClick: () => setActiveToolTab("search_grounding"),
							className: `flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${activeToolTab === "search_grounding" ? "bg-cyan-500 text-slate-950 font-semibold" : "text-slate-300 hover:text-white"}`,
							children: [/* @__PURE__ */ _jsxDEV(Globe, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 698,
								columnNumber: 13
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Google Search" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 699,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 690,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 641,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 621,
				columnNumber: 7
			}, this),
			activeToolTab === "chatbot" && /* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-base font-semibold text-white flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Bot, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 712,
								columnNumber: 17
							}, this), "Konfiguracja Asystenta Czatowego"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 711,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-400",
							children: "Wybierz model dopasowany do złożoności zadania oraz specjalizację systemową."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 715,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 710,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-3 text-xs",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-slate-300 font-medium mb-1.5",
								children: "Model Gemini (zależnie od złożoności):"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 722,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-2",
								children: [
									{
										id: "gemini-4-argon",
										name: "gemini-4-argon (Złożone zadania)",
										desc: "Zaawansowana architektura C# Unity, matematyka 3D i shadery"
									},
									{
										id: "gemini-3.8-flash",
										name: "gemini-3.8-flash (Zadania ogólne)",
										desc: "Uniwersalny balans jakości i szybkości dla projektów AR"
									},
									{
										id: "gemini-3.1-flash-lite",
										name: "gemini-3.1-flash-lite (Ultraszybki)",
										desc: "Natychmiastowe odpowiedzi i krótkie korekty promptów"
									}
								].map((m) => /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setChatModel(m.id),
									className: `w-full text-left p-2.5 rounded-lg border transition-colors ${chatModel === m.id ? "bg-cyan-500/15 border-cyan-400 text-white" : "bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700"}`,
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "font-mono font-semibold text-xs text-cyan-300",
										children: m.name
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 756,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "text-[11px] text-slate-400 mt-0.5",
										children: m.desc
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 757,
										columnNumber: 23
									}, this)]
								}, m.id, true, {
									fileName: _jsxFileName,
									lineNumber: 743,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 725,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 721,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-slate-300 font-medium mb-1.5",
								children: "Rola systemowa (System Instruction):"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 764,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("select", {
								value: rolePersona,
								onChange: (e) => setRolePersona(e.target.value),
								className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500",
								children: [
									/* @__PURE__ */ _jsxDEV("option", {
										value: "xr_architect",
										children: "Główny Architekt XR/AR (Unity ARKit/ARCore & Czujniki Głębi)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 776,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "shader_engineer",
										children: "Inżynier Shaderów Holograficznych (URP Shader Graph / GLSL)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 779,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("option", {
										value: "prompt_master",
										children: "Ekspert Inżynierii Promptów CAD / BIM / AI"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 782,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 767,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 763,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "pt-2 border-t border-slate-800 space-y-1.5",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-slate-400 block font-medium",
									children: "Szybkie pytania testowe:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 789,
									columnNumber: 17
								}, this), [
									"Napisz shader rozpuszczania (Dissolve) dla przejść między scenami budynków 3D w Unity URP.",
									"Jak odróżnić blat stołu od podłogi w ARFoundation przy użyciu ARPlaneClassification?",
									"Jak zoptymalizować eksport siatki .OBJ i .STL na tabletach z Androidem?"
								].map((q, idx) => /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => handleSendChat(q),
									className: "w-full text-left px-2.5 py-1.5 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800/80 transition-colors",
									children: q
								}, idx, false, {
									fileName: _jsxFileName,
									lineNumber: 795,
									columnNumber: 19
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 788,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 720,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 709,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-8 bg-[#070A10] border border-slate-800 rounded-xl flex flex-col h-[520px] overflow-hidden",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ _jsxDEV("span", {
										className: "font-semibold text-white",
										children: "Wieloturowa Sesja Czatowa"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 810,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										"aria-hidden": "true",
										className: "text-slate-500",
										children: "·"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 811,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ _jsxDEV("span", {
										className: "font-mono text-cyan-400",
										children: chatModel
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 812,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 809,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								onClick: () => setChatMessages([chatMessages[0]]),
								className: "text-slate-400 hover:text-white transition-colors",
								children: "Wyczyść historię"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 814,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 808,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							ref: chatScrollRef,
							className: "flex-1 p-4 space-y-4 overflow-y-auto text-xs sm:text-sm",
							children: [chatMessages.map((msg) => /* @__PURE__ */ _jsxDEV("div", {
								className: `flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`,
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "flex items-center gap-2 text-[11px] text-slate-400 mb-1 font-mono",
									children: [
										/* @__PURE__ */ _jsxDEV("span", { children: msg.role === "user" ? "Ty" : "Asystent Gemini" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 834,
											columnNumber: 21
										}, this),
										msg.modelUsed && /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV("span", {
											"aria-hidden": "true",
											children: "·"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 837,
											columnNumber: 25
										}, this), /* @__PURE__ */ _jsxDEV("span", {
											className: "text-cyan-400",
											children: msg.modelUsed
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 838,
											columnNumber: 25
										}, this)] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 836,
											columnNumber: 23
										}, this),
										/* @__PURE__ */ _jsxDEV("span", {
											"aria-hidden": "true",
											children: "·"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 841,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("span", { children: msg.timestamp }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 842,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 833,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("div", {
									className: `max-w-[85%] rounded-xl px-4 py-3 leading-relaxed whitespace-pre-wrap ${msg.role === "user" ? "bg-cyan-500 text-slate-950 font-medium" : "bg-slate-900 border border-slate-800 text-slate-200"}`,
									children: msg.text
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 844,
									columnNumber: 19
								}, this)]
							}, msg.id, true, {
								fileName: _jsxFileName,
								lineNumber: 827,
								columnNumber: 17
							}, this)), isChatLoading && /* @__PURE__ */ _jsxDEV("div", {
								className: "flex items-center gap-2 text-xs text-cyan-400 font-mono",
								children: [/* @__PURE__ */ _jsxDEV(Loader2, { className: "w-4 h-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 857,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: [
									"Model ",
									chatModel,
									" analizuje zapytanie..."
								] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 858,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 856,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 822,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("form", {
							onSubmit: (e) => {
								e.preventDefault();
								handleSendChat();
							},
							className: "p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: chatInput,
								onChange: (e) => setChatInput(e.target.value),
								placeholder: "Zadaj pytanie o Unity ARKit/ARCore, shadery hologramów, C# lub architekturę...",
								className: "flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 870,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "submit",
								disabled: isChatLoading || !chatInput.trim(),
								className: "px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0",
								children: [/* @__PURE__ */ _jsxDEV(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 882,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wyślij" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 883,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 877,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 863,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 807,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 708,
				columnNumber: 9
			}, this),
			activeToolTab === "image_studio" && /* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-base font-semibold text-white flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Wand2, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 898,
								columnNumber: 17
							}, this), "Generowanie i Edycja Obrazów"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 897,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "text-xs font-mono text-cyan-400",
							children: "gemini-nano-banana-2.1"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 901,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 896,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-3 text-xs",
						children: [
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-slate-300 font-medium mb-1.5",
								children: "Tryb pracy (Nowy obraz lub Edycja istniejącego):"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 906,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-2",
								children: [
									{
										id: "create",
										label: "Utwórz nowy z tekstu"
									},
									{
										id: "edit_reference",
										label: "Edytuj wzorzec stołu AR"
									},
									{
										id: "edit_upload",
										label: "Edytuj własne zdjęcie"
									},
									{
										id: "edit_3d",
										label: "Edytuj zrzut sceny 3D"
									}
								].map((mode) => /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setImageMode(mode.id),
									className: `px-3 py-2 rounded-lg border text-left font-medium transition-colors ${imageMode === mode.id ? "bg-cyan-500/15 border-cyan-400 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"}`,
									children: mode.label
								}, mode.id, false, {
									fileName: _jsxFileName,
									lineNumber: 916,
									columnNumber: 21
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 909,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 905,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ _jsxDEV("p", {
										className: "font-medium text-slate-200 truncate",
										children: uploadedEditImage ? `Załadowano: ${uploadedEditImage.name}` : "Opcjonalnie wgraj zdjęcie z dysku do edycji"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 938,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("p", {
										className: "text-[11px] text-slate-400",
										children: "PNG, JPG lub WebP"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 943,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 937,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("label", {
									className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md cursor-pointer font-medium shrink-0 flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 946,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("span", { children: "Wybierz plik" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 947,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("input", {
											type: "file",
											accept: "image/*",
											onChange: handleUploadImageForEdit,
											className: "hidden"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 948,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 945,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 936,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-slate-300 font-medium mb-1",
								children: "Prompt wizualny lub instrukcja edycji:"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 958,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("textarea", {
								rows: 4,
								value: imagePrompt,
								onChange: (e) => setImagePrompt(e.target.value),
								placeholder: "Opisz hologram budynku, detale architektoniczne, oświetlenie lub co chcesz zmienić na obrazie...",
								className: "w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-cyan-500 leading-relaxed"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 961,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 957,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-300 font-medium mb-1",
									children: "Proporcje obrazu:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 972,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: imageAspectRatio,
									onChange: (e) => setImageAspectRatio(e.target.value),
									className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200",
									children: [
										/* @__PURE__ */ _jsxDEV("option", {
											value: "16:9",
											children: "16:9 (Panorama AR)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 982,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "9:16",
											children: "9:16 (Smartfon Pionowo)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 983,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "1:1",
											children: "1:1 (Kwadrat)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 984,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "4:3",
											children: "4:3 (Tablet)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 985,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "3:4",
											children: "3:4 (Portret)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 986,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 973,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 971,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-300 font-medium mb-1",
									children: "Rozdzielczość:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 991,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: imageSize,
									onChange: (e) => setImageSize(e.target.value),
									className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200",
									children: [
										/* @__PURE__ */ _jsxDEV("option", {
											value: "1K",
											children: "1K (Szybki render)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 997,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "2K",
											children: "2K (Wysoka ostrość detali)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 998,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ _jsxDEV("option", {
											value: "4K",
											children: "4K (Ultra HD Architektura)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 999,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 992,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 990,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 970,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("label", {
								className: "flex items-center justify-between pt-1 cursor-pointer",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "text-slate-300",
									children: "Wzbogać kontekst przez Google Image & Web Search"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1005,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("input", {
									type: "checkbox",
									checked: useImageSearchGrounding,
									onChange: (e) => setUseImageSearchGrounding(e.target.checked),
									className: "w-4 h-4 accent-cyan-500 rounded"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1008,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1004,
								columnNumber: 15
							}, this),
							imageError && /* @__PURE__ */ _jsxDEV("div", {
								className: "p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs",
								children: imageError
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1017,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onClick: handleRunNanoBananaImage,
								disabled: isImageLoading || !imagePrompt.trim(),
								className: "w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2",
								children: isImageLoading ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Loader2, { className: "w-4 h-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1029,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Renderowanie w gemini-nano-banana-2.1..." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1030,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1028,
									columnNumber: 19
								}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1034,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: imageMode === "create" ? "Wygeneruj Obraz Hologramu AR" : "Zastosuj Edycję Obrazu AI" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1035,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1033,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1022,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 904,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 895,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-7 bg-[#070A10] border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[460px]",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between border-b border-slate-800 pb-3",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h4", {
							className: "text-sm font-semibold text-white",
							children: "Podgląd Wygenerowanej Wizualizacji AI"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1049,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-400",
							children: [
								"Model: ",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-cyan-400",
									children: "gemini-nano-banana-2.1"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1053,
									columnNumber: 26
								}, this),
								" ·",
								" ",
								imageAspectRatio,
								" · ",
								imageSize
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1052,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1048,
							columnNumber: 15
						}, this), generatedImageUrl && /* @__PURE__ */ _jsxDEV("a", {
							href: generatedImageUrl,
							download: `HoloArch_NanoBanana_${Date.now()}.png`,
							className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg transition-colors",
							children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1063,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Zapisz obraz PNG" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1064,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1058,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1047,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex-1 flex items-center justify-center py-4",
						children: generatedImageUrl ? /* @__PURE__ */ _jsxDEV("img", {
							src: generatedImageUrl,
							alt: "Wygenerowana wizualizacja hologramu architektonicznego",
							referrerPolicy: "no-referrer",
							className: "max-h-[380px] w-auto rounded-lg border border-slate-800 object-contain shadow-2xl"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1071,
							columnNumber: 17
						}, this) : /* @__PURE__ */ _jsxDEV("div", {
							className: "text-center max-w-md space-y-2 p-6",
							children: [
								/* @__PURE__ */ _jsxDEV(ImageIcon, { className: "w-10 h-10 text-slate-600 mx-auto" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1079,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-sm font-medium text-slate-300",
									children: "Gotowy do generowania lub edycji obrazu"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1080,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-xs text-slate-500",
									children: "Wybierz po lewej stronie tryb utworzenia nowej wizualizacji lub edycji wzorcowego zdjęcia stołu konferencyjnego AR i kliknij przycisk generowania."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1083,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1078,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1069,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1046,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 894,
				columnNumber: 9
			}, this),
			activeToolTab === "video_omni" && /* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ _jsxDEV("h3", {
							className: "text-base font-semibold text-white flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV(Video, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1102,
								columnNumber: 17
							}, this), "Wideo z Tekstu i Animacja Zdjęć"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1101,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("span", {
							className: "text-xs font-mono text-amber-400",
							children: "gemini-omni-1.1-flash"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1105,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1100,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-3 text-xs",
						children: [
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setVideoMode("animate_photo"),
									className: `px-3 py-2 rounded-lg border font-medium transition-colors ${videoMode === "animate_photo" ? "bg-amber-500/15 border-amber-400 text-amber-300" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"}`,
									children: "Animuj Zdjęcie do Wideo"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1110,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("button", {
									onClick: () => setVideoMode("text_to_video"),
									className: `px-3 py-2 rounded-lg border font-medium transition-colors ${videoMode === "text_to_video" ? "bg-cyan-500/15 border-cyan-400 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"}`,
									children: "Generuj Wideo z Tekstu"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1120,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1109,
								columnNumber: 15
							}, this),
							videoMode === "animate_photo" && /* @__PURE__ */ _jsxDEV("div", {
								className: "space-y-2.5 p-3 rounded-lg bg-slate-950 border border-slate-800",
								children: [
									/* @__PURE__ */ _jsxDEV("label", {
										className: "block text-slate-300 font-medium",
										children: "Wybierz zdjęcie startowe do ożywienia (Image-to-Video):"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1134,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("select", {
										value: videoPhotoSource,
										onChange: (e) => setVideoPhotoSource(e.target.value),
										className: "w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200",
										children: [
											/* @__PURE__ */ _jsxDEV("option", {
												value: "reference_table",
												children: "Załączone zdjęcie stołu konferencyjnego AR (Dashboard_dex)"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1150,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "uploaded",
												children: ["Własne przesłane zdjęcie z urządzenia ", uploadedVideoPhoto ? `(${uploadedVideoPhoto.name})` : ""]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 1153,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "latest_3d",
												children: "Ostatni zrzut ekranu z symulatora 3D WebGL"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1156,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ _jsxDEV("option", {
												value: "generated_nano",
												children: "Obraz wygenerowany w Nano Banana 2.1"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 1159,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1137,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center justify-between pt-1",
										children: [/* @__PURE__ */ _jsxDEV("span", {
											className: "text-[11px] text-slate-400 truncate",
											children: uploadedVideoPhoto ? `Wgrano: ${uploadedVideoPhoto.name}` : "Lub prześlij własne zdjęcie budynku / makiety:"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 1165,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("label", {
											className: "px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded cursor-pointer font-medium shrink-0 flex items-center gap-1",
											children: [
												/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1171,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ _jsxDEV("span", { children: "Wgraj zdjęcie" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1172,
													columnNumber: 23
												}, this),
												/* @__PURE__ */ _jsxDEV("input", {
													type: "file",
													accept: "image/*",
													onChange: handleUploadPhotoForVideo,
													className: "hidden"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 1173,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 1170,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1164,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1133,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
								className: "block text-slate-300 font-medium mb-1",
								children: "Opis ruchu kamery, paralaksy i efektów wideo (Prompt):"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1185,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("textarea", {
								rows: 4,
								value: videoPrompt,
								onChange: (e) => setVideoPrompt(e.target.value),
								placeholder: "Opisz ruch kamery wokół hologramu budynku, cząsteczki świetlne za oknami...",
								className: "w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-cyan-500 leading-relaxed"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1188,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1184,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-300 font-medium mb-1",
									children: "Format wideo (Aspect Ratio):"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1199,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: videoAspectRatio,
									onChange: (e) => setVideoAspectRatio(e.target.value),
									className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200",
									children: [/* @__PURE__ */ _jsxDEV("option", {
										value: "16:9",
										children: "16:9 (Poziomy — Landscape)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1207,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("option", {
										value: "9:16",
										children: "9:16 (Pionowy — Portrait Mobile)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1208,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1202,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1198,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("label", {
									className: "block text-slate-300 font-medium mb-1",
									children: "Czas trwania:"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1213,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("select", {
									value: videoDuration,
									onChange: (e) => setVideoDuration(e.target.value),
									className: "w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-slate-200",
									children: [/* @__PURE__ */ _jsxDEV("option", {
										value: "5s",
										children: "5 sekund (Standard)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1219,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("option", {
										value: "10s",
										children: "10 sekund (Rozszerzony)"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1220,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1214,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1212,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1197,
								columnNumber: 15
							}, this),
							videoError && /* @__PURE__ */ _jsxDEV("div", {
								className: "p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs",
								children: videoError
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1226,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("button", {
								onClick: handleRunOmniFlashVideo,
								disabled: isVideoLoading || !videoPrompt.trim(),
								className: "w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2",
								children: isVideoLoading ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Loader2, { className: "w-4 h-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1238,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Generowanie wideo w gemini-omni-1.1-flash (może potrwać ~30-90s)..." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1239,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1237,
									columnNumber: 19
								}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Film, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1243,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", { children: videoMode === "animate_photo" ? "Animuj Zdjęcie do Wideo (Interactions API)" : "Wygeneruj Wideo z Tekstu (Interactions API)" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1244,
									columnNumber: 21
								}, this)] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1242,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1231,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1108,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1099,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-7 bg-[#070A10] border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[460px]",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "flex items-center justify-between border-b border-slate-800 pb-3",
						children: [/* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("h4", {
							className: "text-sm font-semibold text-white",
							children: "Odtwarzacz Wideo AR (Interactions API)"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1258,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-400",
							children: [
								"Model: ",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono text-amber-400",
									children: "gemini-omni-1.1-flash"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1262,
									columnNumber: 26
								}, this),
								" ·",
								" ",
								"Proporcje ",
								videoAspectRatio,
								" · ",
								videoDuration
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1261,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1257,
							columnNumber: 15
						}, this), generatedVideoUrl && /* @__PURE__ */ _jsxDEV("a", {
							href: generatedVideoUrl,
							download: `HoloArch_OmniVideo_${Date.now()}.mp4`,
							className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg transition-colors",
							children: [/* @__PURE__ */ _jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1272,
								columnNumber: 19
							}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Pobierz MP4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1273,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1267,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1256,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("div", {
						className: "flex-1 flex items-center justify-center py-4",
						children: generatedVideoUrl ? /* @__PURE__ */ _jsxDEV("video", {
							src: generatedVideoUrl,
							controls: true,
							autoPlay: true,
							loop: true,
							playsInline: true,
							className: "max-h-[380px] w-auto rounded-lg border border-slate-800 shadow-2xl"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1280,
							columnNumber: 17
						}, this) : /* @__PURE__ */ _jsxDEV("div", {
							className: "text-center max-w-md space-y-2 p-6",
							children: [
								/* @__PURE__ */ _jsxDEV(Film, { className: "w-10 h-10 text-slate-600 mx-auto" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1290,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-sm font-medium text-slate-300",
									children: "Wygeneruj animację przelotu kamery AR wokół makiety"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1291,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-xs text-slate-500",
									children: "Możesz ożywić przesłane zdjęcie stołu konferencyjnego AR, własną fotografię z dysku lub wygenerować film od podstaw na podstawie opisu tekstowego."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1294,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1289,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 1278,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1255,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1098,
				columnNumber: 9
			}, this),
			activeToolTab === "live_voice" && /* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsxDEV("h3", {
								className: "text-base font-semibold text-white flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(Volume2, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1313,
									columnNumber: 17
								}, this), "Konwersacja Głosowa na Żywo (Live API)"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1312,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "text-xs font-mono text-cyan-400",
								children: "gemini-3.8-live"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1316,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1311,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-300 leading-relaxed",
							children: [
								"Połącz się z modelem ",
								/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono",
									children: "gemini-3.8-live"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1320,
									columnNumber: 36
								}, this),
								" przez strumień WebSocket PCM (wejście mikrofonowe 16 kHz, wyjście głosowe 24 kHz) i omawiaj na żywo detale architektoniczne, konfigurację ARKit/ARCore oraz oświetlenie środowiskowe."
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1319,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center space-y-3",
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									className: `w-14 h-14 rounded-full flex items-center justify-center border ${isLiveConnected ? "bg-cyan-500/20 border-cyan-400 text-cyan-300" : "bg-slate-900 border-slate-800 text-slate-400"}`,
									children: isLiveConnected ? /* @__PURE__ */ _jsxDEV(Mic, { className: "w-6 h-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1334,
										columnNumber: 36
									}, this) : /* @__PURE__ */ _jsxDEV(MicOff, { className: "w-6 h-6" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1334,
										columnNumber: 66
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1327,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ _jsxDEV("p", {
										className: "text-sm font-semibold text-white",
										children: isLiveConnected ? "Sesja głosowa aktywna — mów do mikrofonu" : isLiveConnecting ? "Łączenie z serwerem Gemini 3.8 Live..." : "Sesja głosowa rozłączona"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1338,
										columnNumber: 17
									}, this), /* @__PURE__ */ _jsxDEV("p", {
										className: "text-xs text-slate-400 font-mono",
										children: "Głos: Zephyr · Wejście 16kHz PCM · Wyjście 24kHz PCM"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1345,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1337,
									columnNumber: 15
								}, this),
								!isLiveConnected ? /* @__PURE__ */ _jsxDEV("button", {
									onClick: startLiveSession,
									disabled: isLiveConnecting,
									className: "w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2",
									children: isLiveConnecting ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Loader2, { className: "w-4 h-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1358,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Inicjalizacja strumienia audio..." }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1359,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1357,
										columnNumber: 21
									}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Mic, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1363,
										columnNumber: 23
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Rozpocznij Rozmowę Głosową na Żywo" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1364,
										columnNumber: 23
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1362,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1351,
									columnNumber: 17
								}, this) : /* @__PURE__ */ _jsxDEV("button", {
									onClick: stopLiveSession,
									className: "w-full py-2.5 px-4 bg-rose-500 hover:bg-rose-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ _jsxDEV(MicOff, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1373,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Zakończ Połączenie Głosowe" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1374,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1369,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1326,
							columnNumber: 13
						}, this),
						liveError && /* @__PURE__ */ _jsxDEV("div", {
							className: "p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs",
							children: liveError
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1380,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1310,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-7 bg-[#070A10] border border-slate-800 rounded-xl flex flex-col h-[420px] overflow-hidden",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs",
							children: [/* @__PURE__ */ _jsxDEV("span", {
								className: "font-semibold text-white",
								children: "Transkrypcja na żywo i sterowanie sesją Live API"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1388,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "font-mono text-slate-400",
								children: ["Status: ", isLiveConnected ? "ONLINE (24kHz Audio)" : "GOTOWY"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1391,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1387,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex-1 p-4 overflow-y-auto space-y-2.5 text-xs",
							children: liveTranscripts.length === 0 ? /* @__PURE__ */ _jsxDEV("div", {
								className: "h-full flex flex-col items-center justify-center text-center text-slate-500 space-y-1",
								children: [/* @__PURE__ */ _jsxDEV("p", {
									className: "text-slate-300 font-medium",
									children: "Brak zarejestrowanych wypowiedzi"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1399,
									columnNumber: 19
								}, this), /* @__PURE__ */ _jsxDEV("p", { children: "Kliknij „Rozpocznij Rozmowę Głosową na Żywo” i zapytaj głosowo np. o czujniki głębi LiDAR lub paralaksę 6DoF." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1400,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1398,
								columnNumber: 17
							}, this) : liveTranscripts.map((item) => /* @__PURE__ */ _jsxDEV("div", {
								className: "p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80",
								children: [/* @__PURE__ */ _jsxDEV("span", {
									className: "font-mono font-semibold text-cyan-400 mr-2",
									children: [item.speaker, ":"]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1411,
									columnNumber: 21
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "text-slate-200",
									children: item.text
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1414,
									columnNumber: 21
								}, this)]
							}, item.id, true, {
								fileName: _jsxFileName,
								lineNumber: 1407,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1396,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("form", {
							onSubmit: handleSendLiveTextTurn,
							className: "p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2",
							children: [/* @__PURE__ */ _jsxDEV("input", {
								type: "text",
								value: liveTextPrompt,
								onChange: (e) => setLiveTextPrompt(e.target.value),
								disabled: !isLiveConnected,
								placeholder: isLiveConnected ? "Wyślij dodatkowy komunikat tekstowy do aktywnej sesji głosowej Live..." : "Uruchom sesję głosową, aby rozmawiać lub wysyłać komunikaty...",
								className: "flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 disabled:opacity-50"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1424,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("button", {
								type: "submit",
								disabled: !isLiveConnected || !liveTextPrompt.trim(),
								className: "px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold text-xs rounded-lg transition-colors",
								children: "Wyślij do Live"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1436,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1420,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1386,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1309,
				columnNumber: 9
			}, this),
			activeToolTab === "search_grounding" && /* @__PURE__ */ _jsxDEV("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4",
					children: [
						/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsxDEV("h3", {
								className: "text-base font-semibold text-white flex items-center gap-2",
								children: [/* @__PURE__ */ _jsxDEV(Globe, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1456,
									columnNumber: 17
								}, this), "Weryfikacja Danych z Google Search"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1455,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "text-xs font-mono text-cyan-400",
								children: "gemini-3.8-flash"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1459,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1454,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("p", {
							className: "text-xs text-slate-300 leading-relaxed",
							children: "Pobieraj aktualne i zweryfikowane informacje z wyszukiwarki Google (Search Grounding) dotyczące wspieranych urządzeń ARCore, dokumentacji Unity 6 XR oraz parametrów architektonicznych budynków."
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1462,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ _jsxDEV("div", {
							className: "space-y-3 text-xs",
							children: [
								/* @__PURE__ */ _jsxDEV("textarea", {
									rows: 3,
									value: searchQuery,
									onChange: (e) => setSearchQuery(e.target.value),
									placeholder: "Wpisz zapytanie do wyszukiwarki Google...",
									className: "w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-100 focus:outline-none focus:border-cyan-500"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1469,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("button", {
									onClick: () => handleRunSearchGrounding(),
									disabled: isSearchLoading || !searchQuery.trim(),
									className: "w-full py-2.5 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2",
									children: isSearchLoading ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Loader2, { className: "w-4 h-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1484,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Przeszukiwanie Google Search..." }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1485,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1483,
										columnNumber: 19
									}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Globe, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1489,
										columnNumber: 21
									}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wyszukaj z Google Search Grounding" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1490,
										columnNumber: 21
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 1488,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1477,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "pt-2 border-t border-slate-800 space-y-1.5",
									children: [/* @__PURE__ */ _jsxDEV("span", {
										className: "text-slate-400 block font-medium",
										children: "Przykładowe kwerendy:"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 1496,
										columnNumber: 17
									}, this), [
										"Oficjalna lista tabletów Android wspierających Google ARCore Depth API w 2026 roku",
										"Nowości w Unity 6 AR Foundation 6.0 dotyczące okluzji LiDAR i oświetlenia środowiskowego",
										"Najwyższe wieżowce z konstrukcją diagrid na świecie — parametry architektoniczne"
									].map((q, idx) => /* @__PURE__ */ _jsxDEV("button", {
										onClick: () => handleRunSearchGrounding(q),
										className: "w-full text-left px-2.5 py-1.5 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800/80 transition-colors",
										children: q
									}, idx, false, {
										fileName: _jsxFileName,
										lineNumber: 1502,
										columnNumber: 19
									}, this))]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 1495,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1468,
							columnNumber: 13
						}, this),
						searchError && /* @__PURE__ */ _jsxDEV("div", {
							className: "p-3 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs",
							children: searchError
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1514,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1453,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "lg:col-span-7 bg-[#070A10] border border-slate-800 rounded-xl p-5 flex flex-col justify-between min-h-[420px]",
					children: [/* @__PURE__ */ _jsxDEV("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "flex items-center justify-between border-b border-slate-800 pb-3",
							children: [/* @__PURE__ */ _jsxDEV("h4", {
								className: "text-sm font-semibold text-white",
								children: "Raport z Google Search Grounding"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 1523,
								columnNumber: 17
							}, this), /* @__PURE__ */ _jsxDEV("span", {
								className: "text-xs font-mono text-cyan-400",
								children: [searchSources.length, " źródeł WWW"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 1526,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1522,
							columnNumber: 15
						}, this), searchResultText ? /* @__PURE__ */ _jsxDEV("div", {
							className: "text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[280px] overflow-y-auto pr-2",
							children: searchResultText
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1532,
							columnNumber: 17
						}, this) : /* @__PURE__ */ _jsxDEV("div", {
							className: "py-16 text-center text-slate-500 text-xs space-y-1",
							children: [
								/* @__PURE__ */ _jsxDEV(Globe, { className: "w-8 h-8 text-slate-600 mx-auto mb-2" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1537,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", {
									className: "text-slate-300 font-medium",
									children: "Uruchom zapytanie z uziemieniem w Google Search"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1538,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ _jsxDEV("p", { children: "Wynik wraz z klikalnymi linkami źródłowymi pojawi się w tym oknie." }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1541,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 1536,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1521,
						columnNumber: 13
					}, this), searchSources.length > 0 && /* @__PURE__ */ _jsxDEV("div", {
						className: "pt-4 mt-4 border-t border-slate-800 space-y-2",
						children: [/* @__PURE__ */ _jsxDEV("span", {
							className: "text-xs font-semibold text-slate-300 block",
							children: "Zweryfikowane źródła Google Search:"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1550,
							columnNumber: 17
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "flex flex-wrap gap-2",
							children: searchSources.map((src, i) => /* @__PURE__ */ _jsxDEV("a", {
								href: src.uri,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-300 transition-colors max-w-xs truncate",
								children: [/* @__PURE__ */ _jsxDEV(ExternalLink, { className: "w-3 h-3 shrink-0" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1562,
									columnNumber: 23
								}, this), /* @__PURE__ */ _jsxDEV("span", {
									className: "truncate",
									children: src.title
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 1563,
									columnNumber: 23
								}, this)]
							}, i, true, {
								fileName: _jsxFileName,
								lineNumber: 1555,
								columnNumber: 21
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 1553,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 1549,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 1520,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 1452,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 620,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLFdBQVcsUUFBUSxnQkFBZ0I7QUFDbkQsU0FDRSxLQUNBLFVBQ0EsY0FDQSxNQUNBLE9BQ0EsU0FBUyxXQUNULFNBQ0EsZUFDQSxLQUNBLFFBQ0EsTUFDQSxVQUNBLFFBQ0EsT0FDQSxTQUNBLGFBQ0s7Ozs7QUF1QlAsU0FBUyxxQkFBcUIsY0FBb0M7Q0FDaEUsTUFBTSxTQUFTLElBQUksWUFBWSxhQUFhLFNBQVMsQ0FBQztDQUN0RCxNQUFNLE9BQU8sSUFBSSxTQUFTLE1BQU07Q0FDaEMsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLGFBQWEsUUFBUSxLQUFLO0VBQzVDLE1BQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxHQUFHLGFBQWEsRUFBRSxDQUFDO0VBQ25ELEtBQUssU0FBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLElBQUksUUFBUyxJQUFJLE9BQVEsSUFBSTtDQUM1RDtDQUNBLE1BQU0sUUFBUSxJQUFJLFdBQVcsTUFBTTtDQUNuQyxJQUFJLFNBQVM7Q0FDYixLQUFLLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxZQUFZLEtBQUs7RUFDekMsVUFBVSxPQUFPLGFBQWEsTUFBTSxFQUFFO0NBQ3hDO0NBQ0EsT0FBTyxLQUFLLE1BQU07QUFDcEI7O0FBR0EsZUFBZSxZQUFZLEtBQTBEO0NBQ25GLE1BQU0sTUFBTSxNQUFNLE1BQU0sR0FBRztDQUMzQixNQUFNLE9BQU8sTUFBTSxJQUFJLEtBQUs7Q0FDNUIsT0FBTyxJQUFJLFNBQVMsU0FBUyxXQUFXO0VBQ3RDLE1BQU0sU0FBUyxJQUFJLFdBQVc7RUFDOUIsT0FBTyxrQkFBa0I7R0FDdkIsTUFBTSxTQUFTLE9BQU8sT0FBTyxVQUFVLEVBQUU7R0FDekMsUUFBUTtJQUFFLE1BQU07SUFBUSxVQUFVLEtBQUssUUFBUTtHQUFhLENBQUM7RUFDL0Q7RUFDQSxPQUFPLFVBQVU7RUFDakIsT0FBTyxjQUFjLElBQUk7Q0FDM0IsQ0FBQztBQUNIO0FBRUEsT0FBTyxNQUFNLG1CQUFtRCxFQUM5RCxrQkFDQSxxQkFDQSxlQUNJO0NBQ0osTUFBTSxDQUFDLGVBQWUsb0JBQW9CLFNBRXhDLFNBQVM7Ozs7Q0FLWCxNQUFNLENBQUMsV0FBVyxnQkFBZ0IsU0FFaEMsZ0JBQWdCO0NBQ2xCLE1BQU0sQ0FBQyxhQUFhLGtCQUFrQixTQUNwQyxjQUNGO0NBQ0EsTUFBTSxDQUFDLGNBQWMsbUJBQW1CLFNBQXdCLENBQzlEO0VBQ0UsSUFBSTtFQUNKLE1BQU07RUFDTixNQUFNO0VBQ04sV0FBVztFQUNYLFdBQVc7Q0FDYixDQUNGLENBQUM7Q0FDRCxNQUFNLENBQUMsV0FBVyxnQkFBZ0IsU0FBUyxFQUFFO0NBQzdDLE1BQU0sQ0FBQyxlQUFlLG9CQUFvQixTQUFTLEtBQUs7Q0FDeEQsTUFBTSxnQkFBZ0IsT0FBOEIsSUFBSTtDQUV4RCxnQkFBZ0I7RUFDZCxJQUFJLGNBQWMsU0FBUztHQUN6QixjQUFjLFFBQVEsWUFBWSxjQUFjLFFBQVE7RUFDMUQ7Q0FDRixHQUFHLENBQUMsY0FBYyxhQUFhLENBQUM7Q0FFaEMsTUFBTSxpQkFBaUIsT0FBTyxlQUF3QjtFQUNwRCxNQUFNLGNBQWMsY0FBYyxVQUFTLENBQUUsS0FBSztFQUNsRCxJQUFJLENBQUMsY0FBYyxlQUFlO0VBRWxDLE1BQU0sVUFBdUI7R0FDM0IsSUFBSSxLQUFLLEtBQUssSUFBSTtHQUNsQixNQUFNO0dBQ04sTUFBTTtHQUNOLFdBQVcsSUFBSSxLQUFLLENBQUMsQ0FBQyxtQkFBbUIsU0FBUztJQUFFLE1BQU07SUFBVyxRQUFRO0dBQVUsQ0FBQztFQUMxRjtFQUVBLE1BQU0sZ0JBQWdCLGFBQWEsS0FBSyxPQUFPO0dBQUUsTUFBTSxFQUFFO0dBQU0sTUFBTSxFQUFFO0VBQUssRUFBRTtFQUM5RSxpQkFBaUIsU0FBUyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUM7RUFDNUMsSUFBSSxDQUFDLFlBQVksYUFBYSxFQUFFO0VBQ2hDLGlCQUFpQixJQUFJO0VBRXJCLElBQUk7R0FDRixNQUFNLFdBQVcsTUFBTSxNQUFNLGdCQUFnQjtJQUMzQyxRQUFRO0lBQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7SUFDOUMsTUFBTSxLQUFLLFVBQVU7S0FDbkIsT0FBTztLQUNQO0tBQ0EsVUFBVTtLQUNWLFNBQVM7SUFDWCxDQUFDO0dBQ0gsQ0FBQztHQUNELE1BQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztHQUNqQyxJQUFJLENBQUMsU0FBUyxJQUFJO0lBQ2hCLE1BQU0sSUFBSSxNQUFNLEtBQUssU0FBUywrQkFBK0I7R0FDL0Q7R0FFQSxpQkFBaUIsU0FBUyxDQUN4QixHQUFHLE1BQ0g7SUFDRSxJQUFJLEtBQUssS0FBSyxJQUFJO0lBQ2xCLE1BQU07SUFDTixNQUFNLEtBQUs7SUFDWCxXQUFXLEtBQUssU0FBUztJQUN6QixXQUFXLElBQUksS0FBSyxDQUFDLENBQUMsbUJBQW1CLFNBQVM7S0FBRSxNQUFNO0tBQVcsUUFBUTtJQUFVLENBQUM7R0FDMUYsQ0FDRixDQUFDO0VBQ0gsU0FBUyxLQUFjO0dBQ3JCLE1BQU0sTUFBTSxlQUFlLFFBQVEsSUFBSSxVQUFVO0dBQ2pELGlCQUFpQixTQUFTLENBQ3hCLEdBQUcsTUFDSDtJQUNFLElBQUksT0FBTyxLQUFLLElBQUk7SUFDcEIsTUFBTTtJQUNOLE1BQU0sa0JBQWtCO0lBQ3hCLFdBQVc7SUFDWCxXQUFXO0dBQ2IsQ0FDRixDQUFDO0VBQ0gsVUFBVTtHQUNSLGlCQUFpQixLQUFLO0VBQ3hCO0NBQ0Y7Ozs7Q0FLQSxNQUFNLENBQUMsV0FBVyxnQkFBZ0IsU0FDaEMsUUFDRjtDQUNBLE1BQU0sQ0FBQyxhQUFhLGtCQUFrQixTQUFTLG1CQUFtQjtDQUNsRSxNQUFNLENBQUMsa0JBQWtCLHVCQUF1QixTQUM5QyxNQUNGO0NBQ0EsTUFBTSxDQUFDLFdBQVcsZ0JBQWdCLFNBQTZCLElBQUk7Q0FDbkUsTUFBTSxDQUFDLHlCQUF5Qiw4QkFBOEIsU0FBUyxLQUFLO0NBQzVFLE1BQU0sQ0FBQyxtQkFBbUIsd0JBQXdCLFNBSXhDLElBQUk7Q0FDZCxNQUFNLENBQUMsbUJBQW1CLHdCQUF3QixTQUF3QixJQUFJO0NBQzlFLE1BQU0sQ0FBQyxnQkFBZ0IscUJBQXFCLFNBQVMsS0FBSztDQUMxRCxNQUFNLENBQUMsWUFBWSxpQkFBaUIsU0FBd0IsSUFBSTtDQUVoRSxNQUFNLDRCQUE0QixNQUEyQztFQUMzRSxNQUFNLE9BQU8sRUFBRSxPQUFPLFFBQVE7RUFDOUIsSUFBSSxDQUFDLE1BQU07RUFDWCxNQUFNLFNBQVMsSUFBSSxXQUFXO0VBQzlCLE9BQU8sZUFBZTtHQUNwQixxQkFBcUI7SUFDbkIsU0FBUyxPQUFPLE9BQU8sVUFBVSxFQUFFO0lBQ25DLFVBQVUsS0FBSyxRQUFRO0lBQ3ZCLE1BQU0sS0FBSztHQUNiLENBQUM7R0FDRCxhQUFhLGFBQWE7RUFDNUI7RUFDQSxPQUFPLGNBQWMsSUFBSTtDQUMzQjtDQUVBLE1BQU0sMkJBQTJCLFlBQVk7RUFDM0MsSUFBSSxDQUFDLFlBQVksS0FBSyxLQUFLLGdCQUFnQjtFQUMzQyxrQkFBa0IsSUFBSTtFQUN0QixjQUFjLElBQUk7RUFFbEIsSUFBSTtHQUNGLElBQUk7R0FDSixJQUFJLFdBQVc7R0FFZixJQUFJLGNBQWMsa0JBQWtCO0lBQ2xDLE1BQU0sVUFBVSxNQUFNLFlBQVksNkNBQTZDO0lBQy9FLGNBQWMsUUFBUTtJQUN0QixXQUFXLFFBQVE7R0FDckIsT0FBTyxJQUFJLGNBQWMsaUJBQWlCLG1CQUFtQjtJQUMzRCxjQUFjLGtCQUFrQjtJQUNoQyxXQUFXLGtCQUFrQjtHQUMvQixPQUFPLElBQUksY0FBYyxhQUFhLGtCQUFrQjtJQUN0RCxjQUFjLGlCQUFpQjtJQUMvQixXQUFXO0dBQ2I7R0FFQSxNQUFNLFdBQVcsTUFBTSxNQUFNLGlCQUFpQjtJQUM1QyxRQUFRO0lBQ1IsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7SUFDOUMsTUFBTSxLQUFLLFVBQVU7S0FDbkIsUUFBUTtLQUNSO0tBQ0E7S0FDQSxhQUFhO0tBQ2I7S0FDQSxvQkFBb0I7SUFDdEIsQ0FBQztHQUNILENBQUM7R0FFRCxNQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7R0FDakMsSUFBSSxDQUFDLFNBQVMsSUFBSTtJQUNoQixNQUFNLElBQUksTUFBTSxLQUFLLFNBQVMseUJBQXlCO0dBQ3pEO0dBRUEscUJBQXFCLEtBQUssUUFBUTtHQUNsQyxTQUFTLHNFQUFzRTtFQUNqRixTQUFTLEtBQWM7R0FDckIsTUFBTSxNQUFNLGVBQWUsUUFBUSxJQUFJLFVBQVU7R0FDakQsY0FBYyxHQUFHO0VBQ25CLFVBQVU7R0FDUixrQkFBa0IsS0FBSztFQUN6QjtDQUNGOzs7O0NBS0EsTUFBTSxDQUFDLFdBQVcsZ0JBQWdCLFNBQTRDLGVBQWU7Q0FDN0YsTUFBTSxDQUFDLGtCQUFrQix1QkFBdUIsU0FFOUMsaUJBQWlCO0NBQ25CLE1BQU0sQ0FBQyxvQkFBb0IseUJBQXlCLFNBSTFDLElBQUk7Q0FDZCxNQUFNLENBQUMsYUFBYSxrQkFBa0IsU0FDcEMscVBBQ0Y7Q0FDQSxNQUFNLENBQUMsa0JBQWtCLHVCQUF1QixTQUEwQixNQUFNO0NBQ2hGLE1BQU0sQ0FBQyxlQUFlLG9CQUFvQixTQUF1QixJQUFJO0NBQ3JFLE1BQU0sQ0FBQyxtQkFBbUIsd0JBQXdCLFNBQXdCLElBQUk7Q0FDOUUsTUFBTSxDQUFDLGdCQUFnQixxQkFBcUIsU0FBUyxLQUFLO0NBQzFELE1BQU0sQ0FBQyxZQUFZLGlCQUFpQixTQUF3QixJQUFJO0NBRWhFLE1BQU0sNkJBQTZCLE1BQTJDO0VBQzVFLE1BQU0sT0FBTyxFQUFFLE9BQU8sUUFBUTtFQUM5QixJQUFJLENBQUMsTUFBTTtFQUNYLE1BQU0sU0FBUyxJQUFJLFdBQVc7RUFDOUIsT0FBTyxlQUFlO0dBQ3BCLHNCQUFzQjtJQUNwQixTQUFTLE9BQU8sT0FBTyxVQUFVLEVBQUU7SUFDbkMsVUFBVSxLQUFLLFFBQVE7SUFDdkIsTUFBTSxLQUFLO0dBQ2IsQ0FBQztHQUNELGFBQWEsZUFBZTtHQUM1QixvQkFBb0IsVUFBVTtFQUNoQztFQUNBLE9BQU8sY0FBYyxJQUFJO0NBQzNCO0NBRUEsTUFBTSwwQkFBMEIsWUFBWTtFQUMxQyxJQUFJLENBQUMsWUFBWSxLQUFLLEtBQUssZ0JBQWdCO0VBQzNDLGtCQUFrQixJQUFJO0VBQ3RCLGNBQWMsSUFBSTtFQUVsQixJQUFJO0dBQ0YsSUFBSTtHQUNKLElBQUksV0FBVztHQUVmLElBQUksY0FBYyxpQkFBaUI7SUFDakMsSUFBSSxxQkFBcUIsWUFBWTtLQUNuQyxJQUFJLENBQUMsb0JBQW9CO01BQ3ZCLE1BQU0sSUFBSSxNQUFNLGlFQUFpRTtLQUNuRjtLQUNBLGNBQWMsbUJBQW1CO0tBQ2pDLFdBQVcsbUJBQW1CO0lBQ2hDLE9BQU8sSUFBSSxxQkFBcUIsbUJBQW1CO0tBQ2pELE1BQU0sVUFBVSxNQUFNLFlBQVksNkNBQTZDO0tBQy9FLGNBQWMsUUFBUTtLQUN0QixXQUFXLFFBQVE7SUFDckIsT0FBTyxJQUFJLHFCQUFxQixhQUFhO0tBQzNDLElBQUksQ0FBQyxrQkFBa0I7TUFDckIsTUFBTSxJQUFJLE1BQU0saURBQWlEO0tBQ25FO0tBQ0EsY0FBYyxpQkFBaUI7S0FDL0IsV0FBVztJQUNiLE9BQU8sSUFBSSxxQkFBcUIsa0JBQWtCO0tBQ2hELElBQUksQ0FBQyxtQkFBbUI7TUFDdEIsTUFBTSxJQUFJLE1BQU0sc0RBQXNEO0tBQ3hFO0tBQ0EsY0FBYztLQUNkLFdBQVc7SUFDYjtHQUNGO0dBRUEsTUFBTSxXQUFXLE1BQU0sTUFBTSxpQkFBaUI7SUFDNUMsUUFBUTtJQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0lBQzlDLE1BQU0sS0FBSyxVQUFVO0tBQ25CLFFBQVE7S0FDUjtLQUNBO0tBQ0EsYUFBYTtLQUNiLFVBQVU7SUFDWixDQUFDO0dBQ0gsQ0FBQztHQUVELE1BQU0sT0FBTyxNQUFNLFNBQVMsS0FBSztHQUNqQyxJQUFJLENBQUMsU0FBUyxJQUFJO0lBQ2hCLE1BQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxnREFBZ0Q7R0FDaEY7R0FFQSxxQkFBcUIsS0FBSyxRQUFRO0dBQ2xDLFNBQVMsdUJBQXVCLEtBQUssWUFBWSxpQ0FBaUM7RUFDcEYsU0FBUyxLQUFjO0dBQ3JCLE1BQU0sTUFBTSxlQUFlLFFBQVEsSUFBSSxVQUFVO0dBQ2pELGNBQWMsR0FBRztFQUNuQixVQUFVO0dBQ1Isa0JBQWtCLEtBQUs7RUFDekI7Q0FDRjs7OztDQUtBLE1BQU0sQ0FBQyxpQkFBaUIsc0JBQXNCLFNBQVMsS0FBSztDQUM1RCxNQUFNLENBQUMsa0JBQWtCLHVCQUF1QixTQUFTLEtBQUs7Q0FDOUQsTUFBTSxDQUFDLFdBQVcsZ0JBQWdCLFNBQXdCLElBQUk7Q0FDOUQsTUFBTSxDQUFDLGlCQUFpQixzQkFBc0IsU0FFNUMsQ0FBQyxDQUFDO0NBQ0osTUFBTSxDQUFDLGdCQUFnQixxQkFBcUIsU0FBUyxFQUFFO0NBRXZELE1BQU0sUUFBUSxPQUF5QixJQUFJO0NBQzNDLE1BQU0sbUJBQW1CLE9BQTRCLElBQUk7Q0FDekQsTUFBTSxvQkFBb0IsT0FBNEIsSUFBSTtDQUMxRCxNQUFNLGlCQUFpQixPQUEyQixJQUFJO0NBQ3RELE1BQU0sZUFBZSxPQUFtQyxJQUFJO0NBQzVELE1BQU0sbUJBQW1CLE9BQWUsQ0FBQztDQUN6QyxNQUFNLG1CQUFtQixPQUFnQyxDQUFDLENBQUM7Q0FFM0QsTUFBTSx3QkFBd0I7RUFDNUIsSUFBSSxhQUFhLFNBQVM7R0FDeEIsSUFBSTtJQUNGLGFBQWEsUUFBUSxXQUFXO0dBQ2xDLFFBQVEsQ0FFUjtHQUNBLGFBQWEsVUFBVTtFQUN6QjtFQUNBLElBQUksZUFBZSxTQUFTO0dBQzFCLGVBQWUsUUFBUSxVQUFVLENBQUMsQ0FBQyxTQUFTLE1BQU0sRUFBRSxLQUFLLENBQUM7R0FDMUQsZUFBZSxVQUFVO0VBQzNCO0VBQ0EsSUFBSSxpQkFBaUIsU0FBUztHQUM1QixpQkFBaUIsUUFBUSxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztHQUMvQyxpQkFBaUIsVUFBVTtFQUM3QjtFQUNBLGlCQUFpQixRQUFRLFNBQVMsUUFBUTtHQUN4QyxJQUFJO0lBQ0YsSUFBSSxLQUFLO0dBQ1gsUUFBUSxDQUVSO0VBQ0YsQ0FBQztFQUNELGlCQUFpQixVQUFVLENBQUM7RUFDNUIsSUFBSSxrQkFBa0IsU0FBUztHQUM3QixrQkFBa0IsUUFBUSxNQUFNLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztHQUNoRCxrQkFBa0IsVUFBVTtFQUM5QjtFQUNBLElBQUksTUFBTSxTQUFTO0dBQ2pCLElBQUk7SUFDRixNQUFNLFFBQVEsTUFBTTtHQUN0QixRQUFRLENBRVI7R0FDQSxNQUFNLFVBQVU7RUFDbEI7RUFDQSxtQkFBbUIsS0FBSztFQUN4QixvQkFBb0IsS0FBSztDQUMzQjtDQUVBLGdCQUFnQjtFQUNkLGFBQWE7R0FDWCxnQkFBZ0I7RUFDbEI7Q0FDRixHQUFHLENBQUMsQ0FBQztDQUVMLE1BQU0sbUJBQW1CLGNBQXNCO0VBQzdDLE1BQU0sU0FBUyxrQkFBa0I7RUFDakMsSUFBSSxDQUFDLFFBQVE7RUFFYixNQUFNLFNBQVMsS0FBSyxTQUFTO0VBQzdCLE1BQU0sYUFBYSxPQUFPO0VBQzFCLE1BQU0sY0FBYyxLQUFLLE1BQU0sYUFBYSxDQUFDO0VBQzdDLElBQUksZ0JBQWdCLEdBQUc7RUFFdkIsTUFBTSxRQUFRLElBQUksV0FBVyxVQUFVO0VBQ3ZDLEtBQUssSUFBSSxJQUFJLEdBQUcsSUFBSSxZQUFZLEtBQUs7R0FDbkMsTUFBTSxLQUFLLE9BQU8sV0FBVyxDQUFDO0VBQ2hDO0VBQ0EsTUFBTSxPQUFPLElBQUksU0FBUyxNQUFNLE1BQU07RUFDdEMsTUFBTSxjQUFjLE9BQU8sYUFBYSxHQUFHLGFBQWEsSUFBSztFQUM3RCxNQUFNLGNBQWMsWUFBWSxlQUFlLENBQUM7RUFDaEQsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLGFBQWEsS0FBSztHQUNwQyxZQUFZLEtBQUssS0FBSyxTQUFTLElBQUksR0FBRyxJQUFJLElBQUk7RUFDaEQ7RUFFQSxNQUFNLFNBQVMsT0FBTyxtQkFBbUI7RUFDekMsT0FBTyxTQUFTO0VBQ2hCLE9BQU8sUUFBUSxPQUFPLFdBQVc7RUFFakMsTUFBTSxNQUFNLE9BQU87RUFDbkIsSUFBSSxpQkFBaUIsVUFBVSxLQUFLO0dBQ2xDLGlCQUFpQixVQUFVLE1BQU07RUFDbkM7RUFDQSxPQUFPLE1BQU0saUJBQWlCLE9BQU87RUFDckMsaUJBQWlCLFdBQVcsWUFBWTtFQUN4QyxpQkFBaUIsUUFBUSxLQUFLLE1BQU07RUFFcEMsT0FBTyxnQkFBZ0I7R0FDckIsaUJBQWlCLFVBQVUsaUJBQWlCLFFBQVEsUUFBUSxNQUFNLE1BQU0sTUFBTTtFQUNoRjtDQUNGO0NBRUEsTUFBTSxtQkFBbUIsWUFBWTtFQUNuQyxJQUFJLG1CQUFtQixrQkFBa0I7RUFDekMsb0JBQW9CLElBQUk7RUFDeEIsYUFBYSxJQUFJO0VBRWpCLElBQUk7R0FDRixNQUFNLFNBQVMsTUFBTSxVQUFVLGFBQWEsYUFBYSxFQUN2RCxPQUFPO0lBQ0wsWUFBWTtJQUNaLGNBQWM7SUFDZCxrQkFBa0I7SUFDbEIsa0JBQWtCO0dBQ3BCLEVBQ0YsQ0FBQztHQUNELGVBQWUsVUFBVTtHQUV6QixNQUFNLFdBQVcsSUFBSSxhQUFhLEVBQUUsWUFBWSxLQUFNLENBQUM7R0FDdkQsTUFBTSxZQUFZLElBQUksYUFBYSxFQUFFLFlBQVksS0FBTSxDQUFDO0dBQ3hELGlCQUFpQixVQUFVO0dBQzNCLGtCQUFrQixVQUFVO0dBQzVCLGlCQUFpQixVQUFVO0dBRTNCLE1BQU0sYUFBYSxPQUFPLFNBQVMsYUFBYSxXQUFXLFNBQVM7R0FDcEUsTUFBTSxLQUFLLElBQUksVUFBVSxHQUFHLFdBQVcsSUFBSSxPQUFPLFNBQVMsS0FBSyxNQUFNO0dBQ3RFLE1BQU0sVUFBVTtHQUVoQixHQUFHLGVBQWU7SUFDaEIsTUFBTSxTQUFTLFNBQVMsd0JBQXdCLE1BQU07SUFDdEQsTUFBTSxZQUFZLFNBQVMsc0JBQXNCLE1BQU0sR0FBRyxDQUFDO0lBQzNELGFBQWEsVUFBVTtJQUV2QixVQUFVLGtCQUFrQixNQUFNO0tBQ2hDLElBQUksR0FBRyxlQUFlLFVBQVUsTUFBTTtNQUNwQyxNQUFNLFlBQVksRUFBRSxZQUFZLGVBQWUsQ0FBQztNQUNoRCxNQUFNLGNBQWMscUJBQXFCLFNBQVM7TUFDbEQsR0FBRyxLQUFLLEtBQUssVUFBVSxFQUFFLE9BQU8sWUFBWSxDQUFDLENBQUM7S0FDaEQ7SUFDRjtJQUVBLE9BQU8sUUFBUSxTQUFTO0lBQ3hCLFVBQVUsUUFBUSxTQUFTLFdBQVc7R0FDeEM7R0FFQSxHQUFHLGFBQWEsVUFBVTtJQUN4QixJQUFJO0tBQ0YsTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLElBQUk7S0FDakMsSUFBSSxJQUFJLFdBQVcsYUFBYTtNQUM5QixtQkFBbUIsSUFBSTtNQUN2QixvQkFBb0IsS0FBSztNQUN6QixTQUFTLHFEQUFxRDtLQUNoRSxPQUFPLElBQUksSUFBSSxPQUFPO01BQ3BCLGdCQUFnQixJQUFJLEtBQUs7S0FDM0IsT0FBTyxJQUFJLElBQUksYUFBYTtNQUMxQixpQkFBaUIsUUFBUSxTQUFTLE1BQU07T0FDdEMsSUFBSTtRQUNGLEVBQUUsS0FBSztPQUNULFFBQVEsQ0FFUjtNQUNGLENBQUM7TUFDRCxpQkFBaUIsVUFBVSxDQUFDO01BQzVCLElBQUksa0JBQWtCLFNBQVM7T0FDN0IsaUJBQWlCLFVBQVUsa0JBQWtCLFFBQVE7TUFDdkQ7S0FDRixPQUFPLElBQUksSUFBSSxvQkFBb0I7TUFDakMsb0JBQW9CLFNBQVMsQ0FDM0IsR0FBRyxNQUNIO09BQ0UsSUFBSSxNQUFNLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxPQUFPO09BQ3BDLFNBQVM7T0FDVCxNQUFNLElBQUk7TUFDWixDQUNGLENBQUM7S0FDSCxPQUFPLElBQUksSUFBSSxxQkFBcUI7TUFDbEMsb0JBQW9CLFNBQVMsQ0FDM0IsR0FBRyxNQUNIO09BQ0UsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxPQUFPO09BQ3JDLFNBQVM7T0FDVCxNQUFNLElBQUk7TUFDWixDQUNGLENBQUM7S0FDSCxPQUFPLElBQUksSUFBSSxPQUFPO01BQ3BCLGFBQWEsSUFBSSxLQUFLO01BQ3RCLGdCQUFnQjtLQUNsQjtJQUNGLFFBQVEsQ0FFUjtHQUNGO0dBRUEsR0FBRyxnQkFBZ0I7SUFDakIsYUFBYSxnREFBZ0Q7SUFDN0QsZ0JBQWdCO0dBQ2xCO0dBRUEsR0FBRyxnQkFBZ0I7SUFDakIsZ0JBQWdCO0dBQ2xCO0VBQ0YsU0FBUyxLQUFjO0dBQ3JCLE1BQU0sTUFDSixlQUFlLFFBQ1gsSUFBSSxVQUNKO0dBQ04sYUFBYSxHQUFHO0dBQ2hCLGdCQUFnQjtFQUNsQjtDQUNGO0NBRUEsTUFBTSwwQkFBMEIsTUFBdUI7RUFDckQsRUFBRSxlQUFlO0VBQ2pCLElBQUksQ0FBQyxlQUFlLEtBQUssS0FBSyxDQUFDLE1BQU0sV0FBVyxNQUFNLFFBQVEsZUFBZSxVQUFVLE1BQU07R0FDM0Y7RUFDRjtFQUNBLE1BQU0sUUFBUSxLQUFLLEtBQUssVUFBVSxFQUFFLE1BQU0sZUFBZSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0VBQ2xFLG9CQUFvQixTQUFTLENBQzNCLEdBQUcsTUFDSDtHQUNFLElBQUksT0FBTyxLQUFLLElBQUk7R0FDcEIsU0FBUztHQUNULE1BQU0sZUFBZSxLQUFLO0VBQzVCLENBQ0YsQ0FBQztFQUNELGtCQUFrQixFQUFFO0NBQ3RCOzs7O0NBS0EsTUFBTSxDQUFDLGFBQWEsa0JBQWtCLFNBQ3BDLCtIQUNGO0NBQ0EsTUFBTSxDQUFDLGtCQUFrQix1QkFBdUIsU0FBd0IsSUFBSTtDQUM1RSxNQUFNLENBQUMsZUFBZSxvQkFBb0IsU0FBeUIsQ0FBQyxDQUFDO0NBQ3JFLE1BQU0sQ0FBQyxpQkFBaUIsc0JBQXNCLFNBQVMsS0FBSztDQUM1RCxNQUFNLENBQUMsYUFBYSxrQkFBa0IsU0FBd0IsSUFBSTtDQUVsRSxNQUFNLDJCQUEyQixPQUFPLGdCQUF5QjtFQUMvRCxNQUFNLEtBQUssZUFBZSxZQUFXLENBQUUsS0FBSztFQUM1QyxJQUFJLENBQUMsS0FBSyxpQkFBaUI7RUFDM0IsSUFBSSxhQUFhLGVBQWUsV0FBVztFQUMzQyxtQkFBbUIsSUFBSTtFQUN2QixlQUFlLElBQUk7RUFFbkIsSUFBSTtHQUNGLE1BQU0sV0FBVyxNQUFNLE1BQU0sNEJBQTRCO0lBQ3ZELFFBQVE7SUFDUixTQUFTLEVBQUUsZ0JBQWdCLG1CQUFtQjtJQUM5QyxNQUFNLEtBQUssVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUFDO0dBQ25DLENBQUM7R0FDRCxNQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7R0FDakMsSUFBSSxDQUFDLFNBQVMsSUFBSTtJQUNoQixNQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsMkNBQTJDO0dBQzNFO0dBQ0Esb0JBQW9CLEtBQUssSUFBSTtHQUM3QixpQkFBaUIsS0FBSyxXQUFXLENBQUMsQ0FBQztFQUNyQyxTQUFTLEtBQWM7R0FDckIsTUFBTSxNQUFNLGVBQWUsUUFBUSxJQUFJLFVBQVU7R0FDakQsZUFBZSxHQUFHO0VBQ3BCLFVBQVU7R0FDUixtQkFBbUIsS0FBSztFQUMxQjtDQUNGO0NBRUEsT0FDRSx3QkFBQyxXQUFEO0VBQVMsSUFBRztFQUFnQixXQUFVO1lBQXRDO0dBQ0Usd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWY7TUFDRSx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZjtRQUNFLHdCQUFDLFFBQUQsWUFBTSxpQ0FBb0M7Ozs7O1FBQzFDLHdCQUFDLFFBQUQ7U0FBTSxlQUFZO21CQUFPO1FBQU87Ozs7O1FBQ2hDLHdCQUFDLFFBQUQsWUFBTSwwRUFBNkU7Ozs7O09BQ2hGOzs7Ozs7TUFDTCx3QkFBQyxNQUFEO09BQUksV0FBVTtpQkFBNkM7TUFFdkQ7Ozs7O01BQ0osd0JBQUMsS0FBRDtPQUFHLFdBQVU7aUJBQWI7UUFBZ0Q7UUFFN0Isd0JBQUMsUUFBRDtTQUFNLFdBQVU7bUJBQVk7UUFBcUI7Ozs7O1FBQUM7UUFDL0Isd0JBQUMsUUFBRDtTQUFNLFdBQVU7bUJBQVk7UUFBNEI7Ozs7O1FBQUM7UUFDaEQsd0JBQUMsUUFBRDtTQUFNLFdBQVU7bUJBQVk7UUFBMkI7Ozs7O1FBQUM7UUFDaEUsd0JBQUMsUUFBRDtTQUFNLFdBQVU7bUJBQVk7UUFBc0I7Ozs7O1FBQUM7T0FDdkY7Ozs7OztLQUNBOzs7OztjQUdMLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWY7TUFDRSx3QkFBQyxVQUFEO09BQ0UsZUFBZSxpQkFBaUIsU0FBUztPQUN6QyxXQUFXLHFIQUNULGtCQUFrQixZQUNkLDZDQUNBO2lCQUxSLENBUUUsd0JBQUMsZUFBRCxFQUFlLFdBQVUsY0FBZTs7OztpQkFDeEMsd0JBQUMsUUFBRCxZQUFNLGlCQUFvQjs7OztlQUNwQjs7Ozs7O01BRVIsd0JBQUMsVUFBRDtPQUNFLGVBQWUsaUJBQWlCLGNBQWM7T0FDOUMsV0FBVyxxSEFDVCxrQkFBa0IsaUJBQ2QsNkNBQ0E7aUJBTFIsQ0FRRSx3QkFBQyxPQUFELEVBQU8sV0FBVSxjQUFlOzs7O2lCQUNoQyx3QkFBQyxRQUFELFlBQU0sMkJBQThCOzs7O2VBQzlCOzs7Ozs7TUFFUix3QkFBQyxVQUFEO09BQ0UsZUFBZSxpQkFBaUIsWUFBWTtPQUM1QyxXQUFXLHFIQUNULGtCQUFrQixlQUNkLDZDQUNBO2lCQUxSLENBUUUsd0JBQUMsTUFBRCxFQUFNLFdBQVUsY0FBZTs7OztpQkFDL0Isd0JBQUMsUUFBRCxZQUFNLHlCQUE0Qjs7OztlQUM1Qjs7Ozs7O01BRVIsd0JBQUMsVUFBRDtPQUNFLGVBQWUsaUJBQWlCLFlBQVk7T0FDNUMsV0FBVyxxSEFDVCxrQkFBa0IsZUFDZCw2Q0FDQTtpQkFMUixDQVFFLHdCQUFDLEtBQUQsRUFBSyxXQUFVLGNBQWU7Ozs7aUJBQzlCLHdCQUFDLFFBQUQsWUFBTSwwQkFBNkI7Ozs7ZUFDN0I7Ozs7OztNQUVSLHdCQUFDLFVBQUQ7T0FDRSxlQUFlLGlCQUFpQixrQkFBa0I7T0FDbEQsV0FBVyxxSEFDVCxrQkFBa0IscUJBQ2QsNkNBQ0E7aUJBTFIsQ0FRRSx3QkFBQyxPQUFELEVBQU8sV0FBVSxjQUFlOzs7O2lCQUNoQyx3QkFBQyxRQUFELFlBQU0sZ0JBQW1COzs7O2VBQ25COzs7Ozs7S0FDTDs7Ozs7WUFDRjs7Ozs7O0dBS0osa0JBQWtCLGFBQ2pCLHdCQUFDLE9BQUQ7SUFBSyxXQUFVO2NBQWYsQ0FDRSx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmLENBQ0Usd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQWYsQ0FDRSx3QkFBQyxNQUFEO09BQUksV0FBVTtpQkFBZCxDQUNFLHdCQUFDLEtBQUQsRUFBSyxXQUFVLHdCQUF5Qjs7OztpQkFBQyxrQ0FFdkM7Ozs7O2dCQUNKLHdCQUFDLEtBQUQ7T0FBRyxXQUFVO2lCQUF5QjtNQUVuQzs7OztjQUNBOzs7OztlQUVMLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFmO09BQ0Usd0JBQUMsT0FBRCxhQUNFLHdCQUFDLFNBQUQ7UUFBTyxXQUFVO2tCQUEwQztPQUVwRDs7OztpQkFDUCx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFDWjtTQUNDO1VBQ0UsSUFBSTtVQUNKLE1BQU07VUFDTixNQUFNO1NBQ1I7U0FDQTtVQUNFLElBQUk7VUFDSixNQUFNO1VBQ04sTUFBTTtTQUNSO1NBQ0E7VUFDRSxJQUFJO1VBQ0osTUFBTTtVQUNOLE1BQU07U0FDUjtRQUNGLENBQUMsQ0FBQyxLQUFLLE1BQ0wsd0JBQUMsVUFBRDtTQUVFLGVBQ0UsYUFDRSxFQUFFLEVBQ0o7U0FFRixXQUFXLDhEQUNULGNBQWMsRUFBRSxLQUNaLDhDQUNBO21CQVZSLENBYUUsd0JBQUMsT0FBRDtVQUFLLFdBQVU7b0JBQWlELEVBQUU7U0FBVTs7OzttQkFDNUUsd0JBQUMsT0FBRDtVQUFLLFdBQVU7b0JBQXFDLEVBQUU7U0FBVTs7OztpQkFDMUQ7V0FkRCxFQUFFOzs7O2VBY0QsQ0FDVDtPQUNFOzs7O2VBQ0Y7Ozs7O09BRUwsd0JBQUMsT0FBRCxhQUNFLHdCQUFDLFNBQUQ7UUFBTyxXQUFVO2tCQUEwQztPQUVwRDs7OztpQkFDUCx3QkFBQyxVQUFEO1FBQ0UsT0FBTztRQUNQLFdBQVcsTUFDVCxlQUNFLEVBQUUsT0FBTyxLQUNYO1FBRUYsV0FBVTtrQkFQWjtTQVNFLHdCQUFDLFVBQUQ7VUFBUSxPQUFNO29CQUFlO1NBRXJCOzs7OztTQUNSLHdCQUFDLFVBQUQ7VUFBUSxPQUFNO29CQUFrQjtTQUV4Qjs7Ozs7U0FDUix3QkFBQyxVQUFEO1VBQVEsT0FBTTtvQkFBZ0I7U0FFdEI7Ozs7O1FBQ0Y7Ozs7O2VBQ0w7Ozs7O09BRUwsd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQWYsQ0FDRSx3QkFBQyxRQUFEO1NBQU0sV0FBVTttQkFBbUM7UUFBOEI7Ozs7a0JBQ2hGO1NBQ0M7U0FDQTtTQUNBO1FBQ0YsQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUNSLHdCQUFDLFVBQUQ7U0FFRSxlQUFlLGVBQWUsQ0FBQztTQUMvQixXQUFVO21CQUVUO1FBQ0ssR0FMRDs7OztlQUtDLENBQ1QsQ0FDRTs7Ozs7O01BQ0Y7Ozs7O2FBQ0Y7Ozs7O2NBRUwsd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZjtNQUNFLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmLENBQ0Usd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQWY7U0FDRSx3QkFBQyxRQUFEO1VBQU0sV0FBVTtvQkFBMkI7U0FBK0I7Ozs7O1NBQzFFLHdCQUFDLFFBQUQ7VUFBTSxlQUFZO1VBQU8sV0FBVTtvQkFBaUI7U0FBTzs7Ozs7U0FDM0Qsd0JBQUMsUUFBRDtVQUFNLFdBQVU7b0JBQTJCO1NBQWdCOzs7OztRQUN4RDs7Ozs7aUJBQ0wsd0JBQUMsVUFBRDtRQUNFLGVBQWUsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDaEQsV0FBVTtrQkFDWDtPQUVPOzs7O2VBQ0w7Ozs7OztNQUVMLHdCQUFDLE9BQUQ7T0FDRSxLQUFLO09BQ0wsV0FBVTtpQkFGWixDQUlHLGFBQWEsS0FBSyxRQUNqQix3QkFBQyxPQUFEO1FBRUUsV0FBVyxpQkFDVCxJQUFJLFNBQVMsU0FBUyxjQUFjO2tCQUh4QyxDQU1FLHdCQUFDLE9BQUQ7U0FBSyxXQUFVO21CQUFmO1VBQ0Usd0JBQUMsUUFBRCxZQUFPLElBQUksU0FBUyxTQUFTLE9BQU8sa0JBQXdCOzs7OztVQUMzRCxJQUFJLGFBQ0gsZ0RBQ0Usd0JBQUMsUUFBRDtXQUFNLGVBQVk7cUJBQU87VUFBTzs7OztvQkFDaEMsd0JBQUMsUUFBRDtXQUFNLFdBQVU7cUJBQWlCLElBQUk7VUFBZ0I7Ozs7a0JBQ3JEOzs7OztVQUVKLHdCQUFDLFFBQUQ7V0FBTSxlQUFZO3FCQUFPO1VBQU87Ozs7O1VBQ2hDLHdCQUFDLFFBQUQsWUFBTyxJQUFJLFVBQWdCOzs7OztTQUN4Qjs7Ozs7a0JBQ0wsd0JBQUMsT0FBRDtTQUNFLFdBQVcsd0VBQ1QsSUFBSSxTQUFTLFNBQ1QsMkNBQ0E7bUJBR0wsSUFBSTtRQUNGOzs7O2dCQUNGO1VBekJFLElBQUk7Ozs7Y0F5Qk4sQ0FDTixHQUNBLGlCQUNDLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUFmLENBQ0Usd0JBQUMsU0FBRCxFQUFTLFdBQVUsdUJBQXdCOzs7O2tCQUMzQyx3QkFBQyxRQUFEO1NBQU07U0FBTztTQUFVO1FBQTZCOzs7O2dCQUNqRDs7Ozs7ZUFFSjs7Ozs7O01BRUwsd0JBQUMsUUFBRDtPQUNFLFdBQVcsTUFBTTtRQUNmLEVBQUUsZUFBZTtRQUNqQixlQUFlO09BQ2pCO09BQ0EsV0FBVTtpQkFMWixDQU9FLHdCQUFDLFNBQUQ7UUFDRSxNQUFLO1FBQ0wsT0FBTztRQUNQLFdBQVcsTUFBTSxhQUFhLEVBQUUsT0FBTyxLQUFLO1FBQzVDLGFBQVk7UUFDWixXQUFVO09BQ1g7Ozs7aUJBQ0Qsd0JBQUMsVUFBRDtRQUNFLE1BQUs7UUFDTCxVQUFVLGlCQUFpQixDQUFDLFVBQVUsS0FBSztRQUMzQyxXQUFVO2tCQUhaLENBS0Usd0JBQUMsTUFBRCxFQUFNLFdBQVUsY0FBZTs7OztrQkFDL0Isd0JBQUMsUUFBRCxZQUFNLFNBQVk7Ozs7Z0JBQ1o7Ozs7O2VBQ0o7Ozs7OztLQUNIOzs7OztZQUNGOzs7Ozs7R0FNTixrQkFBa0Isa0JBQ2pCLHdCQUFDLE9BQUQ7SUFBSyxXQUFVO2NBQWYsQ0FDRSx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmLENBQ0Usd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQWYsQ0FDRSx3QkFBQyxNQUFEO09BQUksV0FBVTtpQkFBZCxDQUNFLHdCQUFDLE9BQUQsRUFBTyxXQUFVLHdCQUF5Qjs7OztpQkFBQyw4QkFFekM7Ozs7O2dCQUNKLHdCQUFDLFFBQUQ7T0FBTSxXQUFVO2lCQUFrQztNQUE0Qjs7OztjQUMzRTs7Ozs7ZUFFTCx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFBZjtPQUNFLHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxTQUFEO1FBQU8sV0FBVTtrQkFBMEM7T0FFcEQ7Ozs7aUJBQ1Asd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQ1o7U0FDQztVQUFFLElBQUk7VUFBVSxPQUFPO1NBQXVCO1NBQzlDO1VBQUUsSUFBSTtVQUFrQixPQUFPO1NBQTBCO1NBQ3pEO1VBQUUsSUFBSTtVQUFlLE9BQU87U0FBd0I7U0FDcEQ7VUFBRSxJQUFJO1VBQVcsT0FBTztTQUF3QjtRQUNsRCxDQUFDLENBQUMsS0FBSyxTQUNMLHdCQUFDLFVBQUQ7U0FFRSxlQUNFLGFBQ0UsS0FBSyxFQUNQO1NBRUYsV0FBVyx1RUFDVCxjQUFjLEtBQUssS0FDZixpREFDQTttQkFHTCxLQUFLO1FBQ0EsR0FiRCxLQUFLOzs7O2VBYUosQ0FDVDtPQUNFOzs7O2VBQ0Y7Ozs7O09BR0wsd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQWYsQ0FDRSx3QkFBQyxPQUFEO1NBQUssV0FBVTttQkFBZixDQUNFLHdCQUFDLEtBQUQ7VUFBRyxXQUFVO29CQUNWLG9CQUNHLGVBQWUsa0JBQWtCLFNBQ2pDO1NBQ0g7Ozs7bUJBQ0gsd0JBQUMsS0FBRDtVQUFHLFdBQVU7b0JBQTZCO1NBQW9COzs7O2lCQUMzRDs7Ozs7a0JBQ0wsd0JBQUMsU0FBRDtTQUFPLFdBQVU7bUJBQWpCO1VBQ0Usd0JBQUMsUUFBRCxFQUFRLFdBQVUsNEJBQTZCOzs7OztVQUMvQyx3QkFBQyxRQUFELFlBQU0sZUFBa0I7Ozs7O1VBQ3hCLHdCQUFDLFNBQUQ7V0FDRSxNQUFLO1dBQ0wsUUFBTztXQUNQLFVBQVU7V0FDVixXQUFVO1VBQ1g7Ozs7O1NBQ0k7Ozs7O2dCQUNKOzs7Ozs7T0FFTCx3QkFBQyxPQUFELGFBQ0Usd0JBQUMsU0FBRDtRQUFPLFdBQVU7a0JBQXdDO09BRWxEOzs7O2lCQUNQLHdCQUFDLFlBQUQ7UUFDRSxNQUFNO1FBQ04sT0FBTztRQUNQLFdBQVcsTUFBTSxlQUFlLEVBQUUsT0FBTyxLQUFLO1FBQzlDLGFBQVk7UUFDWixXQUFVO09BQ1g7Ozs7ZUFDRTs7Ozs7T0FFTCx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFBZixDQUNFLHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxTQUFEO1NBQU8sV0FBVTttQkFBd0M7UUFBd0I7Ozs7a0JBQ2pGLHdCQUFDLFVBQUQ7U0FDRSxPQUFPO1NBQ1AsV0FBVyxNQUNULG9CQUNFLEVBQUUsT0FBTyxLQUNYO1NBRUYsV0FBVTttQkFQWjtVQVNFLHdCQUFDLFVBQUQ7V0FBUSxPQUFNO3FCQUFPO1VBQTBCOzs7OztVQUMvQyx3QkFBQyxVQUFEO1dBQVEsT0FBTTtxQkFBTztVQUErQjs7Ozs7VUFDcEQsd0JBQUMsVUFBRDtXQUFRLE9BQU07cUJBQU07VUFBcUI7Ozs7O1VBQ3pDLHdCQUFDLFVBQUQ7V0FBUSxPQUFNO3FCQUFNO1VBQW9COzs7OztVQUN4Qyx3QkFBQyxVQUFEO1dBQVEsT0FBTTtxQkFBTTtVQUFxQjs7Ozs7U0FDbkM7Ozs7O2dCQUNMOzs7O2tCQUVMLHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxTQUFEO1NBQU8sV0FBVTttQkFBd0M7UUFBcUI7Ozs7a0JBQzlFLHdCQUFDLFVBQUQ7U0FDRSxPQUFPO1NBQ1AsV0FBVyxNQUFNLGFBQWEsRUFBRSxPQUFPLEtBQTJCO1NBQ2xFLFdBQVU7bUJBSFo7VUFLRSx3QkFBQyxVQUFEO1dBQVEsT0FBTTtxQkFBSztVQUEwQjs7Ozs7VUFDN0Msd0JBQUMsVUFBRDtXQUFRLE9BQU07cUJBQUs7VUFBa0M7Ozs7O1VBQ3JELHdCQUFDLFVBQUQ7V0FBUSxPQUFNO3FCQUFLO1VBQWtDOzs7OztTQUMvQzs7Ozs7Z0JBQ0w7Ozs7Z0JBQ0Y7Ozs7OztPQUVMLHdCQUFDLFNBQUQ7UUFBTyxXQUFVO2tCQUFqQixDQUNFLHdCQUFDLFFBQUQ7U0FBTSxXQUFVO21CQUFpQjtRQUUzQjs7OztrQkFDTix3QkFBQyxTQUFEO1NBQ0UsTUFBSztTQUNMLFNBQVM7U0FDVCxXQUFXLE1BQU0sMkJBQTJCLEVBQUUsT0FBTyxPQUFPO1NBQzVELFdBQVU7UUFDWDs7OztnQkFDSTs7Ozs7O09BRU4sY0FDQyx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFDWjtPQUNFOzs7OztPQUdQLHdCQUFDLFVBQUQ7UUFDRSxTQUFTO1FBQ1QsVUFBVSxrQkFBa0IsQ0FBQyxZQUFZLEtBQUs7UUFDOUMsV0FBVTtrQkFFVCxpQkFDQyxnREFDRSx3QkFBQyxTQUFELEVBQVMsV0FBVSx1QkFBd0I7Ozs7a0JBQzNDLHdCQUFDLFFBQUQsWUFBTSwyQ0FBOEM7Ozs7Z0JBQ3BEOzs7O21CQUVGLGdEQUNFLHdCQUFDLFVBQUQsRUFBVSxXQUFVLFVBQVc7Ozs7a0JBQy9CLHdCQUFDLFFBQUQsWUFDRyxjQUFjLFdBQ1gsaUNBQ0EsNEJBQ0E7Ozs7Z0JBQ047Ozs7O09BRUU7Ozs7O01BQ0w7Ozs7O2FBQ0Y7Ozs7O2NBRUwsd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZixDQUNFLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFmLENBQ0Usd0JBQUMsT0FBRCxhQUNFLHdCQUFDLE1BQUQ7T0FBSSxXQUFVO2lCQUFtQztNQUU3Qzs7OztnQkFDSix3QkFBQyxLQUFEO09BQUcsV0FBVTtpQkFBYjtRQUFzQztRQUM3Qix3QkFBQyxRQUFEO1NBQU0sV0FBVTttQkFBMEI7UUFBNEI7Ozs7O1FBQUM7UUFBRztRQUNoRjtRQUFpQjtRQUFJO09BQ3JCOzs7OztjQUNBOzs7O2dCQUNKLHFCQUNDLHdCQUFDLEtBQUQ7T0FDRSxNQUFNO09BQ04sVUFBVSx1QkFBdUIsS0FBSyxJQUFJLEVBQUU7T0FDNUMsV0FBVTtpQkFIWixDQUtFLHdCQUFDLFVBQUQsRUFBVSxXQUFVLGNBQWU7Ozs7aUJBQ25DLHdCQUFDLFFBQUQsWUFBTSxtQkFBc0I7Ozs7ZUFDM0I7Ozs7O2NBRUY7Ozs7O2VBRUwsd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQ1osb0JBQ0Msd0JBQUMsT0FBRDtPQUNFLEtBQUs7T0FDTCxLQUFJO09BQ0osZ0JBQWU7T0FDZixXQUFVO01BQ1g7Ozs7aUJBRUQsd0JBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQWY7UUFDRSx3QkFBQyxXQUFELEVBQVcsV0FBVSxtQ0FBb0M7Ozs7O1FBQ3pELHdCQUFDLEtBQUQ7U0FBRyxXQUFVO21CQUFxQztRQUUvQzs7Ozs7UUFDSCx3QkFBQyxLQUFEO1NBQUcsV0FBVTttQkFBeUI7UUFHbkM7Ozs7O09BQ0E7Ozs7OztLQUVKOzs7O2FBQ0Y7Ozs7O1lBQ0Y7Ozs7OztHQU1OLGtCQUFrQixnQkFDakIsd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFBZixDQUNFLHdCQUFDLE1BQUQ7T0FBSSxXQUFVO2lCQUFkLENBQ0Usd0JBQUMsT0FBRCxFQUFPLFdBQVUseUJBQTBCOzs7O2lCQUFDLGlDQUUxQzs7Ozs7Z0JBQ0osd0JBQUMsUUFBRDtPQUFNLFdBQVU7aUJBQW1DO01BQTJCOzs7O2NBQzNFOzs7OztlQUVMLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFmO09BQ0Usd0JBQUMsT0FBRDtRQUFLLFdBQVU7a0JBQWYsQ0FDRSx3QkFBQyxVQUFEO1NBQ0UsZUFBZSxhQUFhLGVBQWU7U0FDM0MsV0FBVyw2REFDVCxjQUFjLGtCQUNWLG9EQUNBO21CQUVQO1FBRU87Ozs7a0JBQ1Isd0JBQUMsVUFBRDtTQUNFLGVBQWUsYUFBYSxlQUFlO1NBQzNDLFdBQVcsNkRBQ1QsY0FBYyxrQkFDVixpREFDQTttQkFFUDtRQUVPOzs7O2dCQUNMOzs7Ozs7T0FFSixjQUFjLG1CQUNiLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUFmO1NBQ0Usd0JBQUMsU0FBRDtVQUFPLFdBQVU7b0JBQW1DO1NBRTdDOzs7OztTQUNQLHdCQUFDLFVBQUQ7VUFDRSxPQUFPO1VBQ1AsV0FBVyxNQUNULG9CQUNFLEVBQUUsT0FBTyxLQUtYO1VBRUYsV0FBVTtvQkFYWjtXQWFFLHdCQUFDLFVBQUQ7WUFBUSxPQUFNO3NCQUFrQjtXQUV4Qjs7Ozs7V0FDUix3QkFBQyxVQUFEO1lBQVEsT0FBTTtzQkFBZCxDQUF5QiwwQ0FDZ0IscUJBQXFCLElBQUksbUJBQW1CLEtBQUssS0FBSyxFQUN2Rjs7Ozs7O1dBQ1Isd0JBQUMsVUFBRDtZQUFRLE9BQU07c0JBQVk7V0FFbEI7Ozs7O1dBQ1Isd0JBQUMsVUFBRDtZQUFRLE9BQU07c0JBQWlCO1dBRXZCOzs7OztVQUNGOzs7Ozs7U0FFUix3QkFBQyxPQUFEO1VBQUssV0FBVTtvQkFBZixDQUNFLHdCQUFDLFFBQUQ7V0FBTSxXQUFVO3FCQUNiLHFCQUNHLFdBQVcsbUJBQW1CLFNBQzlCO1VBQ0E7Ozs7b0JBQ04sd0JBQUMsU0FBRDtXQUFPLFdBQVU7cUJBQWpCO1lBQ0Usd0JBQUMsUUFBRCxFQUFRLFdBQVUsNkJBQThCOzs7OztZQUNoRCx3QkFBQyxRQUFELFlBQU0sZ0JBQW1COzs7OztZQUN6Qix3QkFBQyxTQUFEO2FBQ0UsTUFBSzthQUNMLFFBQU87YUFDUCxVQUFVO2FBQ1YsV0FBVTtZQUNYOzs7OztXQUNJOzs7OztrQkFDSjs7Ozs7O1FBQ0Y7Ozs7OztPQUdQLHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxTQUFEO1FBQU8sV0FBVTtrQkFBd0M7T0FFbEQ7Ozs7aUJBQ1Asd0JBQUMsWUFBRDtRQUNFLE1BQU07UUFDTixPQUFPO1FBQ1AsV0FBVyxNQUFNLGVBQWUsRUFBRSxPQUFPLEtBQUs7UUFDOUMsYUFBWTtRQUNaLFdBQVU7T0FDWDs7OztlQUNFOzs7OztPQUVMLHdCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUFmLENBQ0Usd0JBQUMsT0FBRCxhQUNFLHdCQUFDLFNBQUQ7U0FBTyxXQUFVO21CQUF3QztRQUVsRDs7OztrQkFDUCx3QkFBQyxVQUFEO1NBQ0UsT0FBTztTQUNQLFdBQVcsTUFBTSxvQkFBb0IsRUFBRSxPQUFPLEtBQXdCO1NBQ3RFLFdBQVU7bUJBSFosQ0FLRSx3QkFBQyxVQUFEO1VBQVEsT0FBTTtvQkFBTztTQUFrQzs7OzttQkFDdkQsd0JBQUMsVUFBRDtVQUFRLE9BQU07b0JBQU87U0FBd0M7Ozs7aUJBQ3ZEOzs7OztnQkFDTDs7OztrQkFFTCx3QkFBQyxPQUFELGFBQ0Usd0JBQUMsU0FBRDtTQUFPLFdBQVU7bUJBQXdDO1FBQW9COzs7O2tCQUM3RSx3QkFBQyxVQUFEO1NBQ0UsT0FBTztTQUNQLFdBQVcsTUFBTSxpQkFBaUIsRUFBRSxPQUFPLEtBQXFCO1NBQ2hFLFdBQVU7bUJBSFosQ0FLRSx3QkFBQyxVQUFEO1VBQVEsT0FBTTtvQkFBSztTQUEyQjs7OzttQkFDOUMsd0JBQUMsVUFBRDtVQUFRLE9BQU07b0JBQU07U0FBK0I7Ozs7aUJBQzdDOzs7OztnQkFDTDs7OztnQkFDRjs7Ozs7O09BRUosY0FDQyx3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFDWjtPQUNFOzs7OztPQUdQLHdCQUFDLFVBQUQ7UUFDRSxTQUFTO1FBQ1QsVUFBVSxrQkFBa0IsQ0FBQyxZQUFZLEtBQUs7UUFDOUMsV0FBVTtrQkFFVCxpQkFDQyxnREFDRSx3QkFBQyxTQUFELEVBQVMsV0FBVSx1QkFBd0I7Ozs7a0JBQzNDLHdCQUFDLFFBQUQsWUFBTSxzRUFBeUU7Ozs7Z0JBQy9FOzs7O21CQUVGLGdEQUNFLHdCQUFDLE1BQUQsRUFBTSxXQUFVLFVBQVc7Ozs7a0JBQzNCLHdCQUFDLFFBQUQsWUFDRyxjQUFjLGtCQUNYLCtDQUNBLDhDQUNBOzs7O2dCQUNOOzs7OztPQUVFOzs7OztNQUNMOzs7OzthQUNGOzs7OztjQUVMLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFBZixDQUNFLHdCQUFDLE9BQUQsYUFDRSx3QkFBQyxNQUFEO09BQUksV0FBVTtpQkFBbUM7TUFFN0M7Ozs7Z0JBQ0osd0JBQUMsS0FBRDtPQUFHLFdBQVU7aUJBQWI7UUFBc0M7UUFDN0Isd0JBQUMsUUFBRDtTQUFNLFdBQVU7bUJBQTJCO1FBQTJCOzs7OztRQUFDO1FBQUc7UUFBSTtRQUMxRTtRQUFpQjtRQUFJO09BQy9COzs7OztjQUNBOzs7O2dCQUNKLHFCQUNDLHdCQUFDLEtBQUQ7T0FDRSxNQUFNO09BQ04sVUFBVSxzQkFBc0IsS0FBSyxJQUFJLEVBQUU7T0FDM0MsV0FBVTtpQkFIWixDQUtFLHdCQUFDLFVBQUQsRUFBVSxXQUFVLGNBQWU7Ozs7aUJBQ25DLHdCQUFDLFFBQUQsWUFBTSxjQUFpQjs7OztlQUN0Qjs7Ozs7Y0FFRjs7Ozs7ZUFFTCx3QkFBQyxPQUFEO01BQUssV0FBVTtnQkFDWixvQkFDQyx3QkFBQyxTQUFEO09BQ0UsS0FBSztPQUNMO09BQ0E7T0FDQTtPQUNBO09BQ0EsV0FBVTtNQUNYOzs7O2lCQUVELHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmO1FBQ0Usd0JBQUMsTUFBRCxFQUFNLFdBQVUsbUNBQW9DOzs7OztRQUNwRCx3QkFBQyxLQUFEO1NBQUcsV0FBVTttQkFBcUM7UUFFL0M7Ozs7O1FBQ0gsd0JBQUMsS0FBRDtTQUFHLFdBQVU7bUJBQXlCO1FBR25DOzs7OztPQUNBOzs7Ozs7S0FFSjs7OzthQUNGOzs7OztZQUNGOzs7Ozs7R0FNTixrQkFBa0IsZ0JBQ2pCLHdCQUFDLE9BQUQ7SUFBSyxXQUFVO2NBQWYsQ0FDRSx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmO01BQ0Usd0JBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQWYsQ0FDRSx3QkFBQyxNQUFEO1FBQUksV0FBVTtrQkFBZCxDQUNFLHdCQUFDLFNBQUQsRUFBUyxXQUFVLHdCQUF5Qjs7OztrQkFBQyx3Q0FFM0M7Ozs7O2lCQUNKLHdCQUFDLFFBQUQ7UUFBTSxXQUFVO2tCQUFrQztPQUFxQjs7OztlQUNwRTs7Ozs7O01BRUwsd0JBQUMsS0FBRDtPQUFHLFdBQVU7aUJBQWI7UUFBc0Q7UUFDL0Isd0JBQUMsUUFBRDtTQUFNLFdBQVU7bUJBQVk7UUFBcUI7Ozs7O1FBQUM7T0FJdEU7Ozs7OztNQUVILHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmO1FBQ0Usd0JBQUMsT0FBRDtTQUNFLFdBQVcsa0VBQ1Qsa0JBQ0ksaURBQ0E7bUJBR0wsa0JBQWtCLHdCQUFDLEtBQUQsRUFBSyxXQUFVLFVBQVc7Ozs7b0JBQUksd0JBQUMsUUFBRCxFQUFRLFdBQVUsVUFBVzs7Ozs7UUFDM0U7Ozs7O1FBRUwsd0JBQUMsT0FBRDtTQUFLLFdBQVU7bUJBQWYsQ0FDRSx3QkFBQyxLQUFEO1VBQUcsV0FBVTtvQkFDVixrQkFDRyw2Q0FDQSxtQkFDQSwyQ0FDQTtTQUNIOzs7O21CQUNILHdCQUFDLEtBQUQ7VUFBRyxXQUFVO29CQUFtQztTQUU3Qzs7OztpQkFDQTs7Ozs7O1FBRUosQ0FBQyxrQkFDQSx3QkFBQyxVQUFEO1NBQ0UsU0FBUztTQUNULFVBQVU7U0FDVixXQUFVO21CQUVULG1CQUNDLGdEQUNFLHdCQUFDLFNBQUQsRUFBUyxXQUFVLHVCQUF3Qjs7OzttQkFDM0Msd0JBQUMsUUFBRCxZQUFNLG9DQUF1Qzs7OztpQkFDN0M7Ozs7b0JBRUYsZ0RBQ0Usd0JBQUMsS0FBRCxFQUFLLFdBQVUsVUFBVzs7OzttQkFDMUIsd0JBQUMsUUFBRCxZQUFNLHFDQUF3Qzs7OztpQkFDOUM7Ozs7O1FBRUU7Ozs7bUJBRVIsd0JBQUMsVUFBRDtTQUNFLFNBQVM7U0FDVCxXQUFVO21CQUZaLENBSUUsd0JBQUMsUUFBRCxFQUFRLFdBQVUsVUFBVzs7OzttQkFDN0Isd0JBQUMsUUFBRCxZQUFNLDZCQUFnQzs7OztpQkFDaEM7Ozs7OztPQUVQOzs7Ozs7TUFFSixhQUNDLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUNaO01BQ0U7Ozs7O0tBRUo7Ozs7O2NBRUwsd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZjtNQUNFLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmLENBQ0Usd0JBQUMsUUFBRDtRQUFNLFdBQVU7a0JBQTJCO09BRXJDOzs7O2lCQUNOLHdCQUFDLFFBQUQ7UUFBTSxXQUFVO2tCQUFoQixDQUEyQyxZQUNoQyxrQkFBa0IseUJBQXlCLFFBQ2hEOzs7OztlQUNIOzs7Ozs7TUFFTCx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFDWixnQkFBZ0IsV0FBVyxJQUMxQix3QkFBQyxPQUFEO1FBQUssV0FBVTtrQkFBZixDQUNFLHdCQUFDLEtBQUQ7U0FBRyxXQUFVO21CQUE2QjtRQUFtQzs7OztrQkFDN0Usd0JBQUMsS0FBRCxZQUFHLGdIQUdBOzs7O2dCQUNBOzs7OztrQkFFTCxnQkFBZ0IsS0FBSyxTQUNuQix3QkFBQyxPQUFEO1FBRUUsV0FBVTtrQkFGWixDQUlFLHdCQUFDLFFBQUQ7U0FBTSxXQUFVO21CQUFoQixDQUNHLEtBQUssU0FBUSxHQUNWOzs7OztrQkFDTix3QkFBQyxRQUFEO1NBQU0sV0FBVTttQkFBa0IsS0FBSztRQUFXOzs7O2dCQUMvQztVQVBFLEtBQUs7Ozs7Y0FPUCxDQUNOO01BRUE7Ozs7O01BRUwsd0JBQUMsUUFBRDtPQUNFLFVBQVU7T0FDVixXQUFVO2lCQUZaLENBSUUsd0JBQUMsU0FBRDtRQUNFLE1BQUs7UUFDTCxPQUFPO1FBQ1AsV0FBVyxNQUFNLGtCQUFrQixFQUFFLE9BQU8sS0FBSztRQUNqRCxVQUFVLENBQUM7UUFDWCxhQUNFLGtCQUNJLDJFQUNBO1FBRU4sV0FBVTtPQUNYOzs7O2lCQUNELHdCQUFDLFVBQUQ7UUFDRSxNQUFLO1FBQ0wsVUFBVSxDQUFDLG1CQUFtQixDQUFDLGVBQWUsS0FBSztRQUNuRCxXQUFVO2tCQUNYO09BRU87Ozs7ZUFDSjs7Ozs7O0tBQ0g7Ozs7O1lBQ0Y7Ozs7OztHQU1OLGtCQUFrQixzQkFDakIsd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWY7TUFDRSx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLHdCQUFDLE1BQUQ7UUFBSSxXQUFVO2tCQUFkLENBQ0Usd0JBQUMsT0FBRCxFQUFPLFdBQVUsd0JBQXlCOzs7O2tCQUFDLG9DQUV6Qzs7Ozs7aUJBQ0osd0JBQUMsUUFBRDtRQUFNLFdBQVU7a0JBQWtDO09BQXNCOzs7O2VBQ3JFOzs7Ozs7TUFFTCx3QkFBQyxLQUFEO09BQUcsV0FBVTtpQkFBeUM7TUFJbkQ7Ozs7O01BRUgsd0JBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQWY7UUFDRSx3QkFBQyxZQUFEO1NBQ0UsTUFBTTtTQUNOLE9BQU87U0FDUCxXQUFXLE1BQU0sZUFBZSxFQUFFLE9BQU8sS0FBSztTQUM5QyxhQUFZO1NBQ1osV0FBVTtRQUNYOzs7OztRQUVELHdCQUFDLFVBQUQ7U0FDRSxlQUFlLHlCQUF5QjtTQUN4QyxVQUFVLG1CQUFtQixDQUFDLFlBQVksS0FBSztTQUMvQyxXQUFVO21CQUVULGtCQUNDLGdEQUNFLHdCQUFDLFNBQUQsRUFBUyxXQUFVLHVCQUF3Qjs7OzttQkFDM0Msd0JBQUMsUUFBRCxZQUFNLGtDQUFxQzs7OztpQkFDM0M7Ozs7b0JBRUYsZ0RBQ0Usd0JBQUMsT0FBRCxFQUFPLFdBQVUsVUFBVzs7OzttQkFDNUIsd0JBQUMsUUFBRCxZQUFNLHFDQUF3Qzs7OztpQkFDOUM7Ozs7O1FBRUU7Ozs7O1FBRVIsd0JBQUMsT0FBRDtTQUFLLFdBQVU7bUJBQWYsQ0FDRSx3QkFBQyxRQUFEO1VBQU0sV0FBVTtvQkFBbUM7U0FBMkI7Ozs7bUJBQzdFO1VBQ0M7VUFDQTtVQUNBO1NBQ0YsQ0FBQyxDQUFDLEtBQUssR0FBRyxRQUNSLHdCQUFDLFVBQUQ7VUFFRSxlQUFlLHlCQUF5QixDQUFDO1VBQ3pDLFdBQVU7b0JBRVQ7U0FDSyxHQUxEOzs7O2dCQUtDLENBQ1QsQ0FDRTs7Ozs7O09BQ0Y7Ozs7OztNQUVKLGVBQ0Msd0JBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQ1o7TUFDRTs7Ozs7S0FFSjs7Ozs7Y0FFTCx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmLENBQ0Usd0JBQUMsT0FBRDtNQUFLLFdBQVU7Z0JBQWYsQ0FDRSx3QkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLHdCQUFDLE1BQUQ7UUFBSSxXQUFVO2tCQUFtQztPQUU3Qzs7OztpQkFDSix3QkFBQyxRQUFEO1FBQU0sV0FBVTtrQkFBaEIsQ0FDRyxjQUFjLFFBQU8sYUFDbEI7Ozs7O2VBQ0g7Ozs7O2dCQUVKLG1CQUNDLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUNaO01BQ0U7Ozs7aUJBRUwsd0JBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQWY7UUFDRSx3QkFBQyxPQUFELEVBQU8sV0FBVSxzQ0FBdUM7Ozs7O1FBQ3hELHdCQUFDLEtBQUQ7U0FBRyxXQUFVO21CQUE2QjtRQUV2Qzs7Ozs7UUFDSCx3QkFBQyxLQUFELFlBQUcscUVBRUE7Ozs7O09BQ0E7Ozs7O2NBRUo7Ozs7O2VBRUosY0FBYyxTQUFTLEtBQ3RCLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFmLENBQ0Usd0JBQUMsUUFBRDtPQUFNLFdBQVU7aUJBQTZDO01BRXZEOzs7O2dCQUNOLHdCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUNaLGNBQWMsS0FBSyxLQUFLLE1BQ3ZCLHdCQUFDLEtBQUQ7UUFFRSxNQUFNLElBQUk7UUFDVixRQUFPO1FBQ1AsS0FBSTtRQUNKLFdBQVU7a0JBTFosQ0FPRSx3QkFBQyxjQUFELEVBQWMsV0FBVSxtQkFBb0I7Ozs7a0JBQzVDLHdCQUFDLFFBQUQ7U0FBTSxXQUFVO21CQUFZLElBQUk7UUFBWTs7OztnQkFDM0M7VUFSSTs7OztjQVFKLENBQ0o7TUFDRTs7OztjQUNGOzs7OzthQUVKOzs7OztZQUNGOzs7Ozs7RUFFQTs7Ozs7O0FBRWIiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiR2VtaW5pU3R1ZGlvSHViLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQm90LFxuICBEb3dubG9hZCxcbiAgRXh0ZXJuYWxMaW5rLFxuICBGaWxtLFxuICBHbG9iZSxcbiAgSW1hZ2UgYXMgSW1hZ2VJY29uLFxuICBMb2FkZXIyLFxuICBNZXNzYWdlU3F1YXJlLFxuICBNaWMsXG4gIE1pY09mZixcbiAgU2VuZCxcbiAgU3BhcmtsZXMsXG4gIFVwbG9hZCxcbiAgVmlkZW8sXG4gIFZvbHVtZTIsXG4gIFdhbmQyLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgQ2FwdHVyZWRTY3JlZW5zaG90IH0gZnJvbSAnLi4vdHlwZXMvYXJTdHVkaW8nO1xuXG5pbnRlcmZhY2UgR2VtaW5pU3R1ZGlvSHViUHJvcHMge1xuICBsYXRlc3RTY3JlZW5zaG90PzogQ2FwdHVyZWRTY3JlZW5zaG90O1xuICBkZWZhdWx0VmlzdWFsUHJvbXB0OiBzdHJpbmc7XG4gIG9uTm90aWZ5OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmludGVyZmFjZSBDaGF0TWVzc2FnZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHJvbGU6ICd1c2VyJyB8ICdtb2RlbCc7XG4gIHRleHQ6IHN0cmluZztcbiAgbW9kZWxVc2VkPzogc3RyaW5nO1xuICB0aW1lc3RhbXA6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIFNlYXJjaFNvdXJjZSB7XG4gIHVyaTogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xufVxuXG4vLyBIZWxwZXIgdG8gY29udmVydCBGbG9hdDMyQXJyYXkgbWljIGJ1ZmZlciAoMTZrSHopIHRvIGJhc2U2NCAxNi1iaXQgUENNIGxpdHRsZS1lbmRpYW5cbmZ1bmN0aW9uIGZsb2F0MzJUb1BjbTE2QmFzZTY0KGZsb2F0MzJBcnJheTogRmxvYXQzMkFycmF5KTogc3RyaW5nIHtcbiAgY29uc3QgYnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGZsb2F0MzJBcnJheS5sZW5ndGggKiAyKTtcbiAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGZsb2F0MzJBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHMgPSBNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgZmxvYXQzMkFycmF5W2ldKSk7XG4gICAgdmlldy5zZXRJbnQxNihpICogMiwgcyA8IDAgPyBzICogMHg4MDAwIDogcyAqIDB4N2ZmZiwgdHJ1ZSk7XG4gIH1cbiAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShidWZmZXIpO1xuICBsZXQgYmluYXJ5ID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZXMuYnl0ZUxlbmd0aDsgaSsrKSB7XG4gICAgYmluYXJ5ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0pO1xuICB9XG4gIHJldHVybiBidG9hKGJpbmFyeSk7XG59XG5cbi8vIEhlbHBlciB0byBjb252ZXJ0IFVSTCAoc3VjaCBhcyAvYXNzZXRzL2Fpc3R1ZGlvL0Rhc2hib2FyZF9kZXhfZWVmZmNiYzcuanBnKSB0byBiYXNlNjRcbmFzeW5jIGZ1bmN0aW9uIHVybFRvQmFzZTY0KHVybDogc3RyaW5nKTogUHJvbWlzZTx7IGRhdGE6IHN0cmluZzsgbWltZVR5cGU6IHN0cmluZyB9PiB7XG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCk7XG4gIGNvbnN0IGJsb2IgPSBhd2FpdCByZXMuYmxvYigpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFN0cmluZyhyZWFkZXIucmVzdWx0IHx8ICcnKTtcbiAgICAgIHJlc29sdmUoeyBkYXRhOiByZXN1bHQsIG1pbWVUeXBlOiBibG9iLnR5cGUgfHwgJ2ltYWdlL2pwZWcnIH0pO1xuICAgIH07XG4gICAgcmVhZGVyLm9uZXJyb3IgPSByZWplY3Q7XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoYmxvYik7XG4gIH0pO1xufVxuXG5leHBvcnQgY29uc3QgR2VtaW5pU3R1ZGlvSHViOiBSZWFjdC5GQzxHZW1pbmlTdHVkaW9IdWJQcm9wcz4gPSAoe1xuICBsYXRlc3RTY3JlZW5zaG90LFxuICBkZWZhdWx0VmlzdWFsUHJvbXB0LFxuICBvbk5vdGlmeSxcbn0pID0+IHtcbiAgY29uc3QgW2FjdGl2ZVRvb2xUYWIsIHNldEFjdGl2ZVRvb2xUYWJdID0gdXNlU3RhdGU8XG4gICAgJ2NoYXRib3QnIHwgJ2ltYWdlX3N0dWRpbycgfCAndmlkZW9fb21uaScgfCAnbGl2ZV92b2ljZScgfCAnc2VhcmNoX2dyb3VuZGluZydcbiAgPignY2hhdGJvdCcpO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAxLiBNdWx0aS1UdXJuIENoYXRib3QgU3RhdGUgKGdlbWluaS00LWFyZ29uLCBnZW1pbmktMy44LWZsYXNoLCBnZW1pbmktMy4xLWZsYXNoLWxpdGUpXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBbY2hhdE1vZGVsLCBzZXRDaGF0TW9kZWxdID0gdXNlU3RhdGU8XG4gICAgJ2dlbWluaS00LWFyZ29uJyB8ICdnZW1pbmktMy44LWZsYXNoJyB8ICdnZW1pbmktMy4xLWZsYXNoLWxpdGUnXG4gID4oJ2dlbWluaS00LWFyZ29uJyk7XG4gIGNvbnN0IFtyb2xlUGVyc29uYSwgc2V0Um9sZVBlcnNvbmFdID0gdXNlU3RhdGU8J3hyX2FyY2hpdGVjdCcgfCAnc2hhZGVyX2VuZ2luZWVyJyB8ICdwcm9tcHRfbWFzdGVyJz4oXG4gICAgJ3hyX2FyY2hpdGVjdCdcbiAgKTtcbiAgY29uc3QgW2NoYXRNZXNzYWdlcywgc2V0Q2hhdE1lc3NhZ2VzXSA9IHVzZVN0YXRlPENoYXRNZXNzYWdlW10+KFtcbiAgICB7XG4gICAgICBpZDogJ3dlbGNvbWUtMScsXG4gICAgICByb2xlOiAnbW9kZWwnLFxuICAgICAgdGV4dDogJ0N6ZcWbxIchIEplc3RlbSBUd29pbSBhc3lzdGVudGVtIGluxbx5bmllcnlqbnltIFhSL0FSIHcgSG9sb0FyY2ggU3R1ZGlvLiBXeWJpZXJ6IG1vZGVsIChgZ2VtaW5pLTQtYXJnb25gIGRvIHrFgm/FvG9uZWogYXJjaGl0ZWt0dXJ5IEMjIGkgbWF0ZW1hdHlraSAzRCwgYGdlbWluaS0zLjgtZmxhc2hgIGRvIHphZGHFhCBvZ8OzbG55Y2ggbHViIGBnZW1pbmktMy4xLWZsYXNoLWxpdGVgIGRvIGLFgnlza2F3aWN6bnljaCBvZHBvd2llZHppKSBpIHphcHl0YWogbyBkZXRla2NqxJkgcMWCYXN6Y3p5em4gQVJLaXQvQVJDb3JlLCBzaGFkZXJ5IGhvbG9ncmFtw7N3IGx1YiBla3Nwb3J0IE9CSi9TVEwuJyxcbiAgICAgIG1vZGVsVXNlZDogJ2dlbWluaS00LWFyZ29uJyxcbiAgICAgIHRpbWVzdGFtcDogJ0dvdG93eScsXG4gICAgfSxcbiAgXSk7XG4gIGNvbnN0IFtjaGF0SW5wdXQsIHNldENoYXRJbnB1dF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtpc0NoYXRMb2FkaW5nLCBzZXRJc0NoYXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgY2hhdFNjcm9sbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGNoYXRTY3JvbGxSZWYuY3VycmVudCkge1xuICAgICAgY2hhdFNjcm9sbFJlZi5jdXJyZW50LnNjcm9sbFRvcCA9IGNoYXRTY3JvbGxSZWYuY3VycmVudC5zY3JvbGxIZWlnaHQ7XG4gICAgfVxuICB9LCBbY2hhdE1lc3NhZ2VzLCBpc0NoYXRMb2FkaW5nXSk7XG5cbiAgY29uc3QgaGFuZGxlU2VuZENoYXQgPSBhc3luYyAoY3VzdG9tVGV4dD86IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHRleHRUb1NlbmQgPSAoY3VzdG9tVGV4dCA/PyBjaGF0SW5wdXQpLnRyaW0oKTtcbiAgICBpZiAoIXRleHRUb1NlbmQgfHwgaXNDaGF0TG9hZGluZykgcmV0dXJuO1xuXG4gICAgY29uc3QgdXNlck1zZzogQ2hhdE1lc3NhZ2UgPSB7XG4gICAgICBpZDogYHUtJHtEYXRlLm5vdygpfWAsXG4gICAgICByb2xlOiAndXNlcicsXG4gICAgICB0ZXh0OiB0ZXh0VG9TZW5kLFxuICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygncGwtUEwnLCB7IGhvdXI6ICcyLWRpZ2l0JywgbWludXRlOiAnMi1kaWdpdCcgfSksXG4gICAgfTtcblxuICAgIGNvbnN0IGhpc3RvcnlGb3JBcGkgPSBjaGF0TWVzc2FnZXMubWFwKChtKSA9PiAoeyByb2xlOiBtLnJvbGUsIHRleHQ6IG0udGV4dCB9KSk7XG4gICAgc2V0Q2hhdE1lc3NhZ2VzKChwcmV2KSA9PiBbLi4ucHJldiwgdXNlck1zZ10pO1xuICAgIGlmICghY3VzdG9tVGV4dCkgc2V0Q2hhdElucHV0KCcnKTtcbiAgICBzZXRJc0NoYXRMb2FkaW5nKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvYWkvY2hhdCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgbW9kZWw6IGNoYXRNb2RlbCxcbiAgICAgICAgICByb2xlUGVyc29uYSxcbiAgICAgICAgICBtZXNzYWdlczogaGlzdG9yeUZvckFwaSxcbiAgICAgICAgICBtZXNzYWdlOiB0ZXh0VG9TZW5kLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgJ0LFgsSFZCBvZHBvd2llZHppIG1vZGVsdSBHZW1pbmknKTtcbiAgICAgIH1cblxuICAgICAgc2V0Q2hhdE1lc3NhZ2VzKChwcmV2KSA9PiBbXG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogYG0tJHtEYXRlLm5vdygpfWAsXG4gICAgICAgICAgcm9sZTogJ21vZGVsJyxcbiAgICAgICAgICB0ZXh0OiBkYXRhLnRleHQsXG4gICAgICAgICAgbW9kZWxVc2VkOiBkYXRhLm1vZGVsIHx8IGNoYXRNb2RlbCxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCdwbC1QTCcsIHsgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JyB9KSxcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdOaWUgdWRhxYJvIHNpxJkgdXp5c2thxIcgb2Rwb3dpZWR6aS4nO1xuICAgICAgc2V0Q2hhdE1lc3NhZ2VzKChwcmV2KSA9PiBbXG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogYGVyci0ke0RhdGUubm93KCl9YCxcbiAgICAgICAgICByb2xlOiAnbW9kZWwnLFxuICAgICAgICAgIHRleHQ6IGBXeXN0xIVwacWCIGLFgsSFZDogJHttc2d9YCxcbiAgICAgICAgICBtb2RlbFVzZWQ6IGNoYXRNb2RlbCxcbiAgICAgICAgICB0aW1lc3RhbXA6ICdCxYLEhWQnLFxuICAgICAgICB9LFxuICAgICAgXSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzQ2hhdExvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gMi4gSW1hZ2UgR2VuZXJhdGlvbiAmIEVkaXRpbmcgU3RhdGUgKGdlbWluaS1uYW5vLWJhbmFuYS0yLjEpXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBbaW1hZ2VNb2RlLCBzZXRJbWFnZU1vZGVdID0gdXNlU3RhdGU8J2NyZWF0ZScgfCAnZWRpdF9yZWZlcmVuY2UnIHwgJ2VkaXRfdXBsb2FkJyB8ICdlZGl0XzNkJz4oXG4gICAgJ2NyZWF0ZSdcbiAgKTtcbiAgY29uc3QgW2ltYWdlUHJvbXB0LCBzZXRJbWFnZVByb21wdF0gPSB1c2VTdGF0ZShkZWZhdWx0VmlzdWFsUHJvbXB0KTtcbiAgY29uc3QgW2ltYWdlQXNwZWN0UmF0aW8sIHNldEltYWdlQXNwZWN0UmF0aW9dID0gdXNlU3RhdGU8JzE2OjknIHwgJzk6MTYnIHwgJzE6MScgfCAnNDozJyB8ICczOjQnPihcbiAgICAnMTY6OSdcbiAgKTtcbiAgY29uc3QgW2ltYWdlU2l6ZSwgc2V0SW1hZ2VTaXplXSA9IHVzZVN0YXRlPCcxSycgfCAnMksnIHwgJzRLJz4oJzFLJyk7XG4gIGNvbnN0IFt1c2VJbWFnZVNlYXJjaEdyb3VuZGluZywgc2V0VXNlSW1hZ2VTZWFyY2hHcm91bmRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdXBsb2FkZWRFZGl0SW1hZ2UsIHNldFVwbG9hZGVkRWRpdEltYWdlXSA9IHVzZVN0YXRlPHtcbiAgICBkYXRhVXJsOiBzdHJpbmc7XG4gICAgbWltZVR5cGU6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gIH0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2dlbmVyYXRlZEltYWdlVXJsLCBzZXRHZW5lcmF0ZWRJbWFnZVVybF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzSW1hZ2VMb2FkaW5nLCBzZXRJc0ltYWdlTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpbWFnZUVycm9yLCBzZXRJbWFnZUVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZVVwbG9hZEltYWdlRm9yRWRpdCA9IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgIGlmICghZmlsZSkgcmV0dXJuO1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHNldFVwbG9hZGVkRWRpdEltYWdlKHtcbiAgICAgICAgZGF0YVVybDogU3RyaW5nKHJlYWRlci5yZXN1bHQgfHwgJycpLFxuICAgICAgICBtaW1lVHlwZTogZmlsZS50eXBlIHx8ICdpbWFnZS9wbmcnLFxuICAgICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICB9KTtcbiAgICAgIHNldEltYWdlTW9kZSgnZWRpdF91cGxvYWQnKTtcbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJ1bk5hbm9CYW5hbmFJbWFnZSA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWltYWdlUHJvbXB0LnRyaW0oKSB8fCBpc0ltYWdlTG9hZGluZykgcmV0dXJuO1xuICAgIHNldElzSW1hZ2VMb2FkaW5nKHRydWUpO1xuICAgIHNldEltYWdlRXJyb3IobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgbGV0IGJhc2U2NEltYWdlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgbWltZVR5cGUgPSAnaW1hZ2UvcG5nJztcblxuICAgICAgaWYgKGltYWdlTW9kZSA9PT0gJ2VkaXRfcmVmZXJlbmNlJykge1xuICAgICAgICBjb25zdCByZWZEYXRhID0gYXdhaXQgdXJsVG9CYXNlNjQoJy9hc3NldHMvYWlzdHVkaW8vRGFzaGJvYXJkX2RleF9lZWZmY2JjNy5qcGcnKTtcbiAgICAgICAgYmFzZTY0SW1hZ2UgPSByZWZEYXRhLmRhdGE7XG4gICAgICAgIG1pbWVUeXBlID0gcmVmRGF0YS5taW1lVHlwZTtcbiAgICAgIH0gZWxzZSBpZiAoaW1hZ2VNb2RlID09PSAnZWRpdF91cGxvYWQnICYmIHVwbG9hZGVkRWRpdEltYWdlKSB7XG4gICAgICAgIGJhc2U2NEltYWdlID0gdXBsb2FkZWRFZGl0SW1hZ2UuZGF0YVVybDtcbiAgICAgICAgbWltZVR5cGUgPSB1cGxvYWRlZEVkaXRJbWFnZS5taW1lVHlwZTtcbiAgICAgIH0gZWxzZSBpZiAoaW1hZ2VNb2RlID09PSAnZWRpdF8zZCcgJiYgbGF0ZXN0U2NyZWVuc2hvdCkge1xuICAgICAgICBiYXNlNjRJbWFnZSA9IGxhdGVzdFNjcmVlbnNob3QuZGF0YVVybDtcbiAgICAgICAgbWltZVR5cGUgPSAnaW1hZ2UvcG5nJztcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9haS9pbWFnZScsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcHJvbXB0OiBpbWFnZVByb21wdCxcbiAgICAgICAgICBiYXNlNjRJbWFnZSxcbiAgICAgICAgICBtaW1lVHlwZSxcbiAgICAgICAgICBhc3BlY3RSYXRpbzogaW1hZ2VBc3BlY3RSYXRpbyxcbiAgICAgICAgICBpbWFnZVNpemUsXG4gICAgICAgICAgdXNlU2VhcmNoR3JvdW5kaW5nOiB1c2VJbWFnZVNlYXJjaEdyb3VuZGluZyxcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgJ0LFgsSFZCBnZW5lcm93YW5pYSBvYnJhenUnKTtcbiAgICAgIH1cblxuICAgICAgc2V0R2VuZXJhdGVkSW1hZ2VVcmwoZGF0YS5pbWFnZVVybCk7XG4gICAgICBvbk5vdGlmeSgnV3lnZW5lcm93YW5vIG9icmF6IGFyY2hpdGVrdG9uaWN6bnkgemEgcG9tb2PEhSBnZW1pbmktbmFuby1iYW5hbmEtMi4xJyk7XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBtc2cgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogJ0LFgsSFZCBnZW5lcm93YW5pYSBvYnJhenUnO1xuICAgICAgc2V0SW1hZ2VFcnJvcihtc2cpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0ltYWdlTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyAzLiBWaWRlbyBHZW5lcmF0aW9uICYgUGhvdG8gQW5pbWF0aW9uIFN0YXRlIChnZW1pbmktb21uaS0xLjEtZmxhc2ggdmlhIEludGVyYWN0aW9ucyBBUEkpXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBbdmlkZW9Nb2RlLCBzZXRWaWRlb01vZGVdID0gdXNlU3RhdGU8J3RleHRfdG9fdmlkZW8nIHwgJ2FuaW1hdGVfcGhvdG8nPignYW5pbWF0ZV9waG90bycpO1xuICBjb25zdCBbdmlkZW9QaG90b1NvdXJjZSwgc2V0VmlkZW9QaG90b1NvdXJjZV0gPSB1c2VTdGF0ZTxcbiAgICAndXBsb2FkZWQnIHwgJ3JlZmVyZW5jZV90YWJsZScgfCAnbGF0ZXN0XzNkJyB8ICdnZW5lcmF0ZWRfbmFubydcbiAgPigncmVmZXJlbmNlX3RhYmxlJyk7XG4gIGNvbnN0IFt1cGxvYWRlZFZpZGVvUGhvdG8sIHNldFVwbG9hZGVkVmlkZW9QaG90b10gPSB1c2VTdGF0ZTx7XG4gICAgZGF0YVVybDogc3RyaW5nO1xuICAgIG1pbWVUeXBlOiBzdHJpbmc7XG4gICAgbmFtZTogc3RyaW5nO1xuICB9IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt2aWRlb1Byb21wdCwgc2V0VmlkZW9Qcm9tcHRdID0gdXNlU3RhdGUoXG4gICAgJ1Ntb290aCBjaW5lbWF0aWMgNkRvRiBjYW1lcmEgb3JiaXQgYXJvdW5kIHRoZSBnbG93aW5nIGN5YW4gYW5kIGdvbGRlbiBob2xvZ3JhcGhpYyBza3lzY3JhcGVyIGNvbXBsZXggb24gdGhlIGNvbmZlcmVuY2UgdGFibGUsIGR5bmFtaWMgc3Vuc2V0IHBhcnRpY2xlcyBkcmlmdGluZyBiZWhpbmQgdGhlIHBhbm9yYW1pYyByb29tIHdpbmRvd3MsIHB1bHNpbmcgZGF0YSBuZXR3b3JrIGxpbmVzIG9uIHRoZSB0YWJsZSBzdXJmYWNlLidcbiAgKTtcbiAgY29uc3QgW3ZpZGVvQXNwZWN0UmF0aW8sIHNldFZpZGVvQXNwZWN0UmF0aW9dID0gdXNlU3RhdGU8JzE2OjknIHwgJzk6MTYnPignMTY6OScpO1xuICBjb25zdCBbdmlkZW9EdXJhdGlvbiwgc2V0VmlkZW9EdXJhdGlvbl0gPSB1c2VTdGF0ZTwnNXMnIHwgJzEwcyc+KCc1cycpO1xuICBjb25zdCBbZ2VuZXJhdGVkVmlkZW9VcmwsIHNldEdlbmVyYXRlZFZpZGVvVXJsXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNWaWRlb0xvYWRpbmcsIHNldElzVmlkZW9Mb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3ZpZGVvRXJyb3IsIHNldFZpZGVvRXJyb3JdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlVXBsb2FkUGhvdG9Gb3JWaWRlbyA9IChlOiBSZWFjdC5DaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBlLnRhcmdldC5maWxlcz8uWzBdO1xuICAgIGlmICghZmlsZSkgcmV0dXJuO1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIHNldFVwbG9hZGVkVmlkZW9QaG90byh7XG4gICAgICAgIGRhdGFVcmw6IFN0cmluZyhyZWFkZXIucmVzdWx0IHx8ICcnKSxcbiAgICAgICAgbWltZVR5cGU6IGZpbGUudHlwZSB8fCAnaW1hZ2UvanBlZycsXG4gICAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgIH0pO1xuICAgICAgc2V0VmlkZW9Nb2RlKCdhbmltYXRlX3Bob3RvJyk7XG4gICAgICBzZXRWaWRlb1Bob3RvU291cmNlKCd1cGxvYWRlZCcpO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUnVuT21uaUZsYXNoVmlkZW8gPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF2aWRlb1Byb21wdC50cmltKCkgfHwgaXNWaWRlb0xvYWRpbmcpIHJldHVybjtcbiAgICBzZXRJc1ZpZGVvTG9hZGluZyh0cnVlKTtcbiAgICBzZXRWaWRlb0Vycm9yKG51bGwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBiYXNlNjRJbWFnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgbGV0IG1pbWVUeXBlID0gJ2ltYWdlL2pwZWcnO1xuXG4gICAgICBpZiAodmlkZW9Nb2RlID09PSAnYW5pbWF0ZV9waG90bycpIHtcbiAgICAgICAgaWYgKHZpZGVvUGhvdG9Tb3VyY2UgPT09ICd1cGxvYWRlZCcpIHtcbiAgICAgICAgICBpZiAoIXVwbG9hZGVkVmlkZW9QaG90bykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcnplxZtsaWogbmFqcGllcncgemRqxJljaWUgeiBkeXNrdSBsdWIgd3liaWVyeiB3em9yemVjIHN0b8WCdSBBUi4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYmFzZTY0SW1hZ2UgPSB1cGxvYWRlZFZpZGVvUGhvdG8uZGF0YVVybDtcbiAgICAgICAgICBtaW1lVHlwZSA9IHVwbG9hZGVkVmlkZW9QaG90by5taW1lVHlwZTtcbiAgICAgICAgfSBlbHNlIGlmICh2aWRlb1Bob3RvU291cmNlID09PSAncmVmZXJlbmNlX3RhYmxlJykge1xuICAgICAgICAgIGNvbnN0IHJlZkRhdGEgPSBhd2FpdCB1cmxUb0Jhc2U2NCgnL2Fzc2V0cy9haXN0dWRpby9EYXNoYm9hcmRfZGV4X2VlZmZjYmM3LmpwZycpO1xuICAgICAgICAgIGJhc2U2NEltYWdlID0gcmVmRGF0YS5kYXRhO1xuICAgICAgICAgIG1pbWVUeXBlID0gcmVmRGF0YS5taW1lVHlwZTtcbiAgICAgICAgfSBlbHNlIGlmICh2aWRlb1Bob3RvU291cmNlID09PSAnbGF0ZXN0XzNkJykge1xuICAgICAgICAgIGlmICghbGF0ZXN0U2NyZWVuc2hvdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOYWpwaWVydyB3eWtvbmFqIHpyenV0IGVrcmFudSB3IHN5bXVsYXRvcnplIDNELicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBiYXNlNjRJbWFnZSA9IGxhdGVzdFNjcmVlbnNob3QuZGF0YVVybDtcbiAgICAgICAgICBtaW1lVHlwZSA9ICdpbWFnZS9wbmcnO1xuICAgICAgICB9IGVsc2UgaWYgKHZpZGVvUGhvdG9Tb3VyY2UgPT09ICdnZW5lcmF0ZWRfbmFubycpIHtcbiAgICAgICAgICBpZiAoIWdlbmVyYXRlZEltYWdlVXJsKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05hanBpZXJ3IHd5Z2VuZXJ1aiBvYnJheiB3IHpha8WCYWRjZSBLcmVhdG9yIE9icmF6w7N3LicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBiYXNlNjRJbWFnZSA9IGdlbmVyYXRlZEltYWdlVXJsO1xuICAgICAgICAgIG1pbWVUeXBlID0gJ2ltYWdlL3BuZyc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9haS92aWRlbycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcHJvbXB0OiB2aWRlb1Byb21wdCxcbiAgICAgICAgICBiYXNlNjRJbWFnZSxcbiAgICAgICAgICBtaW1lVHlwZSxcbiAgICAgICAgICBhc3BlY3RSYXRpbzogdmlkZW9Bc3BlY3RSYXRpbyxcbiAgICAgICAgICBkdXJhdGlvbjogdmlkZW9EdXJhdGlvbixcbiAgICAgICAgfSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgJ0LFgsSFZCBnZW5lcm93YW5pYSB3aWRlbyB3IGdlbWluaS1vbW5pLTEuMS1mbGFzaCcpO1xuICAgICAgfVxuXG4gICAgICBzZXRHZW5lcmF0ZWRWaWRlb1VybChkYXRhLnZpZGVvVXJsKTtcbiAgICAgIG9uTm90aWZ5KGBXeWdlbmVyb3dhbm8gd2lkZW8gKCR7ZGF0YS5hc3BlY3RSYXRpb30pIHcgbW9kZWx1IGdlbWluaS1vbW5pLTEuMS1mbGFzaGApO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdCxYLEhWQgZ2VuZXJvd2FuaWEgd2lkZW8nO1xuICAgICAgc2V0VmlkZW9FcnJvcihtc2cpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc1ZpZGVvTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyA0LiBSZWFsLVRpbWUgVm9pY2UgQ29udmVyc2F0aW9uIFN0YXRlIChnZW1pbmktMy44LWxpdmUgdmlhIFdlYlNvY2tldClcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IFtpc0xpdmVDb25uZWN0ZWQsIHNldElzTGl2ZUNvbm5lY3RlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0xpdmVDb25uZWN0aW5nLCBzZXRJc0xpdmVDb25uZWN0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xpdmVFcnJvciwgc2V0TGl2ZUVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbGl2ZVRyYW5zY3JpcHRzLCBzZXRMaXZlVHJhbnNjcmlwdHNdID0gdXNlU3RhdGU8XG4gICAgQXJyYXk8eyBpZDogc3RyaW5nOyBzcGVha2VyOiAnVHkgKE1pa3JvZm9uKScgfCAnR2VtaW5pIDMuOCBMaXZlJzsgdGV4dDogc3RyaW5nIH0+XG4gID4oW10pO1xuICBjb25zdCBbbGl2ZVRleHRQcm9tcHQsIHNldExpdmVUZXh0UHJvbXB0XSA9IHVzZVN0YXRlKCcnKTtcblxuICBjb25zdCB3c1JlZiA9IHVzZVJlZjxXZWJTb2NrZXQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaW5wdXRBdWRpb0N0eFJlZiA9IHVzZVJlZjxBdWRpb0NvbnRleHQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgb3V0cHV0QXVkaW9DdHhSZWYgPSB1c2VSZWY8QXVkaW9Db250ZXh0IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IG1lZGlhU3RyZWFtUmVmID0gdXNlUmVmPE1lZGlhU3RyZWFtIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHByb2Nlc3NvclJlZiA9IHVzZVJlZjxTY3JpcHRQcm9jZXNzb3JOb2RlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IG5leHRTdGFydFRpbWVSZWYgPSB1c2VSZWY8bnVtYmVyPigwKTtcbiAgY29uc3QgYWN0aXZlU291cmNlc1JlZiA9IHVzZVJlZjxBdWRpb0J1ZmZlclNvdXJjZU5vZGVbXT4oW10pO1xuXG4gIGNvbnN0IHN0b3BMaXZlU2Vzc2lvbiA9ICgpID0+IHtcbiAgICBpZiAocHJvY2Vzc29yUmVmLmN1cnJlbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHByb2Nlc3NvclJlZi5jdXJyZW50LmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBJZ25vcmVcbiAgICAgIH1cbiAgICAgIHByb2Nlc3NvclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKG1lZGlhU3RyZWFtUmVmLmN1cnJlbnQpIHtcbiAgICAgIG1lZGlhU3RyZWFtUmVmLmN1cnJlbnQuZ2V0VHJhY2tzKCkuZm9yRWFjaCgodCkgPT4gdC5zdG9wKCkpO1xuICAgICAgbWVkaWFTdHJlYW1SZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmIChpbnB1dEF1ZGlvQ3R4UmVmLmN1cnJlbnQpIHtcbiAgICAgIGlucHV0QXVkaW9DdHhSZWYuY3VycmVudC5jbG9zZSgpLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIGlucHV0QXVkaW9DdHhSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICAgIGFjdGl2ZVNvdXJjZXNSZWYuY3VycmVudC5mb3JFYWNoKChzcmMpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNyYy5zdG9wKCk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gSWdub3JlXG4gICAgICB9XG4gICAgfSk7XG4gICAgYWN0aXZlU291cmNlc1JlZi5jdXJyZW50ID0gW107XG4gICAgaWYgKG91dHB1dEF1ZGlvQ3R4UmVmLmN1cnJlbnQpIHtcbiAgICAgIG91dHB1dEF1ZGlvQ3R4UmVmLmN1cnJlbnQuY2xvc2UoKS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgICBvdXRwdXRBdWRpb0N0eFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHdzUmVmLmN1cnJlbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHdzUmVmLmN1cnJlbnQuY2xvc2UoKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBJZ25vcmVcbiAgICAgIH1cbiAgICAgIHdzUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgICBzZXRJc0xpdmVDb25uZWN0ZWQoZmFsc2UpO1xuICAgIHNldElzTGl2ZUNvbm5lY3RpbmcoZmFsc2UpO1xuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHN0b3BMaXZlU2Vzc2lvbigpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBwbGF5UGNtMjRrQ2h1bmsgPSAoYmFzZTY0UGNtOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBvdXRDdHggPSBvdXRwdXRBdWRpb0N0eFJlZi5jdXJyZW50O1xuICAgIGlmICghb3V0Q3R4KSByZXR1cm47XG5cbiAgICBjb25zdCBiaW5hcnkgPSBhdG9iKGJhc2U2NFBjbSk7XG4gICAgY29uc3QgYnl0ZUxlbmd0aCA9IGJpbmFyeS5sZW5ndGg7XG4gICAgY29uc3QgaW50MTZMZW5ndGggPSBNYXRoLmZsb29yKGJ5dGVMZW5ndGggLyAyKTtcbiAgICBpZiAoaW50MTZMZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZUxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlTGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ5dGVzW2ldID0gYmluYXJ5LmNoYXJDb2RlQXQoaSk7XG4gICAgfVxuICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnl0ZXMuYnVmZmVyKTtcbiAgICBjb25zdCBhdWRpb0J1ZmZlciA9IG91dEN0eC5jcmVhdGVCdWZmZXIoMSwgaW50MTZMZW5ndGgsIDI0MDAwKTtcbiAgICBjb25zdCBjaGFubmVsRGF0YSA9IGF1ZGlvQnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW50MTZMZW5ndGg7IGkrKykge1xuICAgICAgY2hhbm5lbERhdGFbaV0gPSB2aWV3LmdldEludDE2KGkgKiAyLCB0cnVlKSAvIDMyNzY4O1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSA9IG91dEN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICBzb3VyY2UuYnVmZmVyID0gYXVkaW9CdWZmZXI7XG4gICAgc291cmNlLmNvbm5lY3Qob3V0Q3R4LmRlc3RpbmF0aW9uKTtcblxuICAgIGNvbnN0IG5vdyA9IG91dEN0eC5jdXJyZW50VGltZTtcbiAgICBpZiAobmV4dFN0YXJ0VGltZVJlZi5jdXJyZW50IDwgbm93KSB7XG4gICAgICBuZXh0U3RhcnRUaW1lUmVmLmN1cnJlbnQgPSBub3cgKyAwLjAyO1xuICAgIH1cbiAgICBzb3VyY2Uuc3RhcnQobmV4dFN0YXJ0VGltZVJlZi5jdXJyZW50KTtcbiAgICBuZXh0U3RhcnRUaW1lUmVmLmN1cnJlbnQgKz0gYXVkaW9CdWZmZXIuZHVyYXRpb247XG4gICAgYWN0aXZlU291cmNlc1JlZi5jdXJyZW50LnB1c2goc291cmNlKTtcblxuICAgIHNvdXJjZS5vbmVuZGVkID0gKCkgPT4ge1xuICAgICAgYWN0aXZlU291cmNlc1JlZi5jdXJyZW50ID0gYWN0aXZlU291cmNlc1JlZi5jdXJyZW50LmZpbHRlcigocykgPT4gcyAhPT0gc291cmNlKTtcbiAgICB9O1xuICB9O1xuXG4gIGNvbnN0IHN0YXJ0TGl2ZVNlc3Npb24gPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKGlzTGl2ZUNvbm5lY3RlZCB8fCBpc0xpdmVDb25uZWN0aW5nKSByZXR1cm47XG4gICAgc2V0SXNMaXZlQ29ubmVjdGluZyh0cnVlKTtcbiAgICBzZXRMaXZlRXJyb3IobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgICBhdWRpbzoge1xuICAgICAgICAgIHNhbXBsZVJhdGU6IDE2MDAwLFxuICAgICAgICAgIGNoYW5uZWxDb3VudDogMSxcbiAgICAgICAgICBlY2hvQ2FuY2VsbGF0aW9uOiB0cnVlLFxuICAgICAgICAgIG5vaXNlU3VwcHJlc3Npb246IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIG1lZGlhU3RyZWFtUmVmLmN1cnJlbnQgPSBzdHJlYW07XG5cbiAgICAgIGNvbnN0IGlucHV0Q3R4ID0gbmV3IEF1ZGlvQ29udGV4dCh7IHNhbXBsZVJhdGU6IDE2MDAwIH0pO1xuICAgICAgY29uc3Qgb3V0cHV0Q3R4ID0gbmV3IEF1ZGlvQ29udGV4dCh7IHNhbXBsZVJhdGU6IDI0MDAwIH0pO1xuICAgICAgaW5wdXRBdWRpb0N0eFJlZi5jdXJyZW50ID0gaW5wdXRDdHg7XG4gICAgICBvdXRwdXRBdWRpb0N0eFJlZi5jdXJyZW50ID0gb3V0cHV0Q3R4O1xuICAgICAgbmV4dFN0YXJ0VGltZVJlZi5jdXJyZW50ID0gMDtcblxuICAgICAgY29uc3Qgd3NQcm90b2NvbCA9IHdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyAnd3NzOicgOiAnd3M6JztcbiAgICAgIGNvbnN0IHdzID0gbmV3IFdlYlNvY2tldChgJHt3c1Byb3RvY29sfS8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0vbGl2ZWApO1xuICAgICAgd3NSZWYuY3VycmVudCA9IHdzO1xuXG4gICAgICB3cy5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IGlucHV0Q3R4LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0cmVhbSk7XG4gICAgICAgIGNvbnN0IHByb2Nlc3NvciA9IGlucHV0Q3R4LmNyZWF0ZVNjcmlwdFByb2Nlc3Nvcig0MDk2LCAxLCAxKTtcbiAgICAgICAgcHJvY2Vzc29yUmVmLmN1cnJlbnQgPSBwcm9jZXNzb3I7XG5cbiAgICAgICAgcHJvY2Vzc29yLm9uYXVkaW9wcm9jZXNzID0gKGUpID0+IHtcbiAgICAgICAgICBpZiAod3MucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgICAgICAgIGNvbnN0IGZsb2F0RGF0YSA9IGUuaW5wdXRCdWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gICAgICAgICAgICBjb25zdCBiYXNlNjRBdWRpbyA9IGZsb2F0MzJUb1BjbTE2QmFzZTY0KGZsb2F0RGF0YSk7XG4gICAgICAgICAgICB3cy5zZW5kKEpTT04uc3RyaW5naWZ5KHsgYXVkaW86IGJhc2U2NEF1ZGlvIH0pKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgc291cmNlLmNvbm5lY3QocHJvY2Vzc29yKTtcbiAgICAgICAgcHJvY2Vzc29yLmNvbm5lY3QoaW5wdXRDdHguZGVzdGluYXRpb24pO1xuICAgICAgfTtcblxuICAgICAgd3Mub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgbXNnID0gSlNPTi5wYXJzZShldmVudC5kYXRhKTtcbiAgICAgICAgICBpZiAobXNnLnN0YXR1cyA9PT0gJ2Nvbm5lY3RlZCcpIHtcbiAgICAgICAgICAgIHNldElzTGl2ZUNvbm5lY3RlZCh0cnVlKTtcbiAgICAgICAgICAgIHNldElzTGl2ZUNvbm5lY3RpbmcoZmFsc2UpO1xuICAgICAgICAgICAgb25Ob3RpZnkoJ1BvxYLEhWN6b25vIGfFgm9zb3dvIG5hIMW8eXdvIHogbW9kZWxlbSBnZW1pbmktMy44LWxpdmUnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG1zZy5hdWRpbykge1xuICAgICAgICAgICAgcGxheVBjbTI0a0NodW5rKG1zZy5hdWRpbyk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtc2cuaW50ZXJydXB0ZWQpIHtcbiAgICAgICAgICAgIGFjdGl2ZVNvdXJjZXNSZWYuY3VycmVudC5mb3JFYWNoKChzKSA9PiB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcy5zdG9wKCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFjdGl2ZVNvdXJjZXNSZWYuY3VycmVudCA9IFtdO1xuICAgICAgICAgICAgaWYgKG91dHB1dEF1ZGlvQ3R4UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgbmV4dFN0YXJ0VGltZVJlZi5jdXJyZW50ID0gb3V0cHV0QXVkaW9DdHhSZWYuY3VycmVudC5jdXJyZW50VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG1zZy5pbnB1dFRyYW5zY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHNldExpdmVUcmFuc2NyaXB0cygocHJldikgPT4gW1xuICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IGBpbi0ke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKX1gLFxuICAgICAgICAgICAgICAgIHNwZWFrZXI6ICdUeSAoTWlrcm9mb24pJyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBtc2cuaW5wdXRUcmFuc2NyaXB0aW9uLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtc2cub3V0cHV0VHJhbnNjcmlwdGlvbikge1xuICAgICAgICAgICAgc2V0TGl2ZVRyYW5zY3JpcHRzKChwcmV2KSA9PiBbXG4gICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogYG91dC0ke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKX1gLFxuICAgICAgICAgICAgICAgIHNwZWFrZXI6ICdHZW1pbmkgMy44IExpdmUnLFxuICAgICAgICAgICAgICAgIHRleHQ6IG1zZy5vdXRwdXRUcmFuc2NyaXB0aW9uLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChtc2cuZXJyb3IpIHtcbiAgICAgICAgICAgIHNldExpdmVFcnJvcihtc2cuZXJyb3IpO1xuICAgICAgICAgICAgc3RvcExpdmVTZXNzaW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvLyBJZ25vcmUgcGFyc2UgZXJyb3JzXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHdzLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgIHNldExpdmVFcnJvcignQsWCxIVkIHBvxYLEhWN6ZW5pYSBXZWJTb2NrZXQgeiBzZXJ3ZXJlbSBMaXZlIEFQSS4nKTtcbiAgICAgICAgc3RvcExpdmVTZXNzaW9uKCk7XG4gICAgICB9O1xuXG4gICAgICB3cy5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgICBzdG9wTGl2ZVNlc3Npb24oKTtcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyOiB1bmtub3duKSB7XG4gICAgICBjb25zdCBtc2cgPVxuICAgICAgICBlcnIgaW5zdGFuY2VvZiBFcnJvclxuICAgICAgICAgID8gZXJyLm1lc3NhZ2VcbiAgICAgICAgICA6ICdCcmFrIGRvc3TEmXB1IGRvIG1pa3JvZm9udSBsdWIgYsWCxIVkIGluaWNqYWxpemFjamkgYXVkaW8uJztcbiAgICAgIHNldExpdmVFcnJvcihtc2cpO1xuICAgICAgc3RvcExpdmVTZXNzaW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbmRMaXZlVGV4dFR1cm4gPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghbGl2ZVRleHRQcm9tcHQudHJpbSgpIHx8ICF3c1JlZi5jdXJyZW50IHx8IHdzUmVmLmN1cnJlbnQucmVhZHlTdGF0ZSAhPT0gV2ViU29ja2V0Lk9QRU4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd3NSZWYuY3VycmVudC5zZW5kKEpTT04uc3RyaW5naWZ5KHsgdGV4dDogbGl2ZVRleHRQcm9tcHQudHJpbSgpIH0pKTtcbiAgICBzZXRMaXZlVHJhbnNjcmlwdHMoKHByZXYpID0+IFtcbiAgICAgIC4uLnByZXYsXG4gICAgICB7XG4gICAgICAgIGlkOiBgdHh0LSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICBzcGVha2VyOiAnVHkgKE1pa3JvZm9uKScsXG4gICAgICAgIHRleHQ6IGxpdmVUZXh0UHJvbXB0LnRyaW0oKSxcbiAgICAgIH0sXG4gICAgXSk7XG4gICAgc2V0TGl2ZVRleHRQcm9tcHQoJycpO1xuICB9O1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyA1LiBHb29nbGUgU2VhcmNoIEdyb3VuZGluZyBTdGF0ZSAoZ2VtaW5pLTMuOC1mbGFzaCArIGdvb2dsZVNlYXJjaClcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGUoXG4gICAgJ05ham5vd3N6ZSB3c3BhcmNpZSBBUkNvcmUgRGVwdGggQVBJIG9yYXogVG9GIGRsYSB0YWJsZXTDs3cgaSBzbWFydGZvbsOzdyBTYW1zdW5nIEdhbGF4eSBTMjQgLyBUYWIgUzkgb3JheiBVbml0eSA2IEFSIEZvdW5kYXRpb24nXG4gICk7XG4gIGNvbnN0IFtzZWFyY2hSZXN1bHRUZXh0LCBzZXRTZWFyY2hSZXN1bHRUZXh0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2VhcmNoU291cmNlcywgc2V0U2VhcmNoU291cmNlc10gPSB1c2VTdGF0ZTxTZWFyY2hTb3VyY2VbXT4oW10pO1xuICBjb25zdCBbaXNTZWFyY2hMb2FkaW5nLCBzZXRJc1NlYXJjaExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VhcmNoRXJyb3IsIHNldFNlYXJjaEVycm9yXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGhhbmRsZVJ1blNlYXJjaEdyb3VuZGluZyA9IGFzeW5jIChjdXN0b21RdWVyeT86IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHEgPSAoY3VzdG9tUXVlcnkgPz8gc2VhcmNoUXVlcnkpLnRyaW0oKTtcbiAgICBpZiAoIXEgfHwgaXNTZWFyY2hMb2FkaW5nKSByZXR1cm47XG4gICAgaWYgKGN1c3RvbVF1ZXJ5KSBzZXRTZWFyY2hRdWVyeShjdXN0b21RdWVyeSk7XG4gICAgc2V0SXNTZWFyY2hMb2FkaW5nKHRydWUpO1xuICAgIHNldFNlYXJjaEVycm9yKG51bGwpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJy9hcGkvYWkvc2VhcmNoLWdyb3VuZGluZycsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHF1ZXJ5OiBxIH0pLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZGF0YS5lcnJvciB8fCAnQsWCxIVkIHd5c3p1a2l3YW5pYSBHb29nbGUgU2VhcmNoIEdyb3VuZGluZycpO1xuICAgICAgfVxuICAgICAgc2V0U2VhcmNoUmVzdWx0VGV4dChkYXRhLnRleHQpO1xuICAgICAgc2V0U2VhcmNoU291cmNlcyhkYXRhLnNvdXJjZXMgfHwgW10pO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgY29uc3QgbXNnID0gZXJyIGluc3RhbmNlb2YgRXJyb3IgPyBlcnIubWVzc2FnZSA6ICdCxYLEhWQgR29vZ2xlIFNlYXJjaCBHcm91bmRpbmcnO1xuICAgICAgc2V0U2VhcmNoRXJyb3IobXNnKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNTZWFyY2hMb2FkaW5nKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBpZD1cImdlbWluaS1haS1odWJcIiBjbGFzc05hbWU9XCJzcGFjZS15LTYgcHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgbGc6aXRlbXMtZW5kIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIHRleHQtY3lhbi00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICA8c3Bhbj5DZW50cnVtIE11bHRpbW9kYWxuZSBHZW1pbmkgQUk8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj7Ctzwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPkNoYXRib3QgwrcgTmFubyBCYW5hbmEgMi4xIMK3IE9tbmkgRmxhc2ggVmlkZW8gwrcgTGl2ZSAzLjggwrcgR29vZ2xlIFNlYXJjaDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1kaXNwbGF5XCI+XG4gICAgICAgICAgICBTdHVkaW8gU3p0dWN6bmVqIEludGVsaWdlbmNqaTogQ3phdCwgT2JyYXp5LCBXaWRlbywgR8WCb3MgbmEgxbt5d28gaSBXeXN6dWtpd2Fya2EgR29vZ2xlXG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIG1heC13LTN4bFwiPlxuICAgICAgICAgICAgUm96d2lqYWogbWFraWV0eSBhcmNoaXRla3Rvbmljem5lIEFSIHByenkgdcW8eWNpdSBkZWR5a293YW55Y2ggbW9kZWxpOiBwcm93YWTFuiByb3ptb3d5XG4gICAgICAgICAgICBnxYJvc293ZSBuYSDFvHl3byAoPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vXCI+Z2VtaW5pLTMuOC1saXZlPC9zcGFuPiksIGdlbmVydWogaSBlZHl0dWpcbiAgICAgICAgICAgIHdpenVhbGl6YWNqZSBzdG/FgnUgaG9sb2dyYWZpY3puZWdvICg8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm9cIj5nZW1pbmktbmFuby1iYW5hbmEtMi4xPC9zcGFuPiksXG4gICAgICAgICAgICBhbmltdWogemRqxJljaWEgYnVkeW5rw7N3IHcgd2lkZW8gMTY6OSAvIDk6MTYgKDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ub1wiPmdlbWluaS1vbW5pLTEuMS1mbGFzaDwvc3Bhbj4pXG4gICAgICAgICAgICBvcmF6IHdlcnlmaWt1aiBkYW5lIHogR29vZ2xlIFNlYXJjaCAoPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vXCI+Z2VtaW5pLTMuOC1mbGFzaDwvc3Bhbj4pLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE5hdmlnYXRpb24gVGFicyBmb3IgdGhlIDUgQUkgVG9vbHMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0xIHAtMSBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBzaHJpbmstMFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRvb2xUYWIoJ2NoYXRib3QnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLW1kIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRvb2xUYWIgPT09ICdjaGF0Ym90J1xuICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNZXNzYWdlU3F1YXJlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkN6YXRib3QgR2VtaW5pPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVG9vbFRhYignaW1hZ2Vfc3R1ZGlvJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICBhY3RpdmVUb29sVGFiID09PSAnaW1hZ2Vfc3R1ZGlvJ1xuICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxXYW5kMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5PYnJhenkgKE5hbm8gQmFuYW5hIDIuMSk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUb29sVGFiKCd2aWRlb19vbW5pJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICBhY3RpdmVUb29sVGFiID09PSAndmlkZW9fb21uaSdcbiAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmlsbSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5XaWRlbyBpIEFuaW1hY2phIFpkasSZxIc8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUb29sVGFiKCdsaXZlX3ZvaWNlJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICBhY3RpdmVUb29sVGFiID09PSAnbGl2ZV92b2ljZSdcbiAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TWljIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkfFgm9zIG5hIMW7eXdvIChMaXZlIDMuOCk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUb29sVGFiKCdzZWFyY2hfZ3JvdW5kaW5nJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1tZCB0cmFuc2l0aW9uLWNvbG9ycyB3aGl0ZXNwYWNlLW5vd3JhcCBzaHJpbmstMCAke1xuICAgICAgICAgICAgICBhY3RpdmVUb29sVGFiID09PSAnc2VhcmNoX2dyb3VuZGluZydcbiAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+R29vZ2xlIFNlYXJjaDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFRBQiAxOiBNVUxUSS1UVVJOIEdFTUlOSSBDSEFUQk9UXG4gICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7YWN0aXZlVG9vbFRhYiA9PT0gJ2NoYXRib3QnICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNCBiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc3BhY2UteS01XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxCb3QgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBLb25maWd1cmFjamEgQXN5c3RlbnRhIEN6YXRvd2Vnb1xuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgV3liaWVyeiBtb2RlbCBkb3Bhc293YW55IGRvIHrFgm/FvG9ub8WbY2kgemFkYW5pYSBvcmF6IHNwZWNqYWxpemFjasSZIHN5c3RlbW93xIUuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtIG1iLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgTW9kZWwgR2VtaW5pICh6YWxlxbxuaWUgb2QgesWCb8W8b25vxZtjaSk6XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIGlkOiAnZ2VtaW5pLTQtYXJnb24nLFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdnZW1pbmktNC1hcmdvbiAoWsWCb8W8b25lIHphZGFuaWEpJyxcbiAgICAgICAgICAgICAgICAgICAgICBkZXNjOiAnWmFhd2Fuc293YW5hIGFyY2hpdGVrdHVyYSBDIyBVbml0eSwgbWF0ZW1hdHlrYSAzRCBpIHNoYWRlcnknLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6ICdnZW1pbmktMy44LWZsYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnZ2VtaW5pLTMuOC1mbGFzaCAoWmFkYW5pYSBvZ8OzbG5lKScsXG4gICAgICAgICAgICAgICAgICAgICAgZGVzYzogJ1VuaXdlcnNhbG55IGJhbGFucyBqYWtvxZtjaSBpIHN6eWJrb8WbY2kgZGxhIHByb2pla3TDs3cgQVInLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgaWQ6ICdnZW1pbmktMy4xLWZsYXNoLWxpdGUnLFxuICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICdnZW1pbmktMy4xLWZsYXNoLWxpdGUgKFVsdHJhc3p5YmtpKScsXG4gICAgICAgICAgICAgICAgICAgICAgZGVzYzogJ05hdHljaG1pYXN0b3dlIG9kcG93aWVkemkgaSBrcsOzdGtpZSBrb3Jla3R5IHByb21wdMOzdycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdLm1hcCgobSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXttLmlkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRDaGF0TW9kZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG0uaWQgYXMgJ2dlbWluaS00LWFyZ29uJyB8ICdnZW1pbmktMy44LWZsYXNoJyB8ICdnZW1pbmktMy4xLWZsYXNoLWxpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCB0ZXh0LWxlZnQgcC0yLjUgcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXRNb2RlbCA9PT0gbS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTUwMC8xNSBib3JkZXItY3lhbi00MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzcwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtc2VtaWJvbGQgdGV4dC14cyB0ZXh0LWN5YW4tMzAwXCI+e20ubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPnttLmRlc2N9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtIG1iLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgUm9sYSBzeXN0ZW1vd2EgKFN5c3RlbSBJbnN0cnVjdGlvbik6XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cm9sZVBlcnNvbmF9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgIHNldFJvbGVQZXJzb25hKFxuICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlIGFzICd4cl9hcmNoaXRlY3QnIHwgJ3NoYWRlcl9lbmdpbmVlcicgfCAncHJvbXB0X21hc3RlcidcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXNsYXRlLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWN5YW4tNTAwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwieHJfYXJjaGl0ZWN0XCI+XG4gICAgICAgICAgICAgICAgICAgIEfFgsOzd255IEFyY2hpdGVrdCBYUi9BUiAoVW5pdHkgQVJLaXQvQVJDb3JlICYgQ3p1am5pa2kgR8WCxJliaSlcbiAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNoYWRlcl9lbmdpbmVlclwiPlxuICAgICAgICAgICAgICAgICAgICBJbsW8eW5pZXIgU2hhZGVyw7N3IEhvbG9ncmFmaWN6bnljaCAoVVJQIFNoYWRlciBHcmFwaCAvIEdMU0wpXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwcm9tcHRfbWFzdGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIEVrc3BlcnQgSW7FvHluaWVyaWkgUHJvbXB0w7N3IENBRCAvIEJJTSAvIEFJXG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBibG9jayBmb250LW1lZGl1bVwiPlN6eWJraWUgcHl0YW5pYSB0ZXN0b3dlOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgJ05hcGlzeiBzaGFkZXIgcm96cHVzemN6YW5pYSAoRGlzc29sdmUpIGRsYSBwcnplasWbxIcgbWnEmWR6eSBzY2VuYW1pIGJ1ZHlua8OzdyAzRCB3IFVuaXR5IFVSUC4nLFxuICAgICAgICAgICAgICAgICAgJ0phayBvZHLDs8W8bmnEhyBibGF0IHN0b8WCdSBvZCBwb2TFgm9naSB3IEFSRm91bmRhdGlvbiBwcnp5IHXFvHljaXUgQVJQbGFuZUNsYXNzaWZpY2F0aW9uPycsXG4gICAgICAgICAgICAgICAgICAnSmFrIHpvcHR5bWFsaXpvd2HEhyBla3Nwb3J0IHNpYXRraSAuT0JKIGkgLlNUTCBuYSB0YWJsZXRhY2ggeiBBbmRyb2lkZW0/JyxcbiAgICAgICAgICAgICAgICBdLm1hcCgocSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVTZW5kQ2hhdChxKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCBweC0yLjUgcHktMS41IHJvdW5kZWQgYmctc2xhdGUtOTUwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCB0ZXh0LVsxMXB4XSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtxfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTggYmctWyMwNzBBMTBdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgZmxleCBmbGV4LWNvbCBoLVs1MjBweF0gb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMyBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+V2llbG90dXJvd2EgU2VzamEgQ3phdG93YTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMFwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LWN5YW4tNDAwXCI+e2NoYXRNb2RlbH08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q2hhdE1lc3NhZ2VzKFtjaGF0TWVzc2FnZXNbMF1dKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFd5Y3p5xZvEhyBoaXN0b3JpxJlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICByZWY9e2NoYXRTY3JvbGxSZWZ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBwLTQgc3BhY2UteS00IG92ZXJmbG93LXktYXV0byB0ZXh0LXhzIHNtOnRleHQtc21cIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y2hhdE1lc3NhZ2VzLm1hcCgobXNnKSA9PiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAga2V5PXttc2cuaWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGZsZXgtY29sICR7XG4gICAgICAgICAgICAgICAgICAgIG1zZy5yb2xlID09PSAndXNlcicgPyAnaXRlbXMtZW5kJyA6ICdpdGVtcy1zdGFydCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbWItMSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e21zZy5yb2xlID09PSAndXNlcicgPyAnVHknIDogJ0FzeXN0ZW50IEdlbWluaSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7bXNnLm1vZGVsVXNlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPsK3PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMFwiPnttc2cubW9kZWxVc2VkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+wrc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnttc2cudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BtYXgtdy1bODUlXSByb3VuZGVkLXhsIHB4LTQgcHktMyBsZWFkaW5nLXJlbGF4ZWQgd2hpdGVzcGFjZS1wcmUtd3JhcCAke1xuICAgICAgICAgICAgICAgICAgICAgIG1zZy5yb2xlID09PSAndXNlcidcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtbWVkaXVtJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMjAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge21zZy50ZXh0fVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICB7aXNDaGF0TG9hZGluZyAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIHRleHQtY3lhbi00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICA8TG9hZGVyMiBjbGFzc05hbWU9XCJ3LTQgaC00IGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Nb2RlbCB7Y2hhdE1vZGVsfSBhbmFsaXp1amUgemFweXRhbmllLi4uPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxmb3JtXG4gICAgICAgICAgICAgIG9uU3VibWl0PXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBoYW5kbGVTZW5kQ2hhdCgpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtOTAwLzkwIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2NoYXRJbnB1dH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldENoYXRJbnB1dChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJaYWRhaiBweXRhbmllIG8gVW5pdHkgQVJLaXQvQVJDb3JlLCBzaGFkZXJ5IGhvbG9ncmFtw7N3LCBDIyBsdWIgYXJjaGl0ZWt0dXLEmS4uLlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHB4LTMuNSBweS0yLjUgdGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItY3lhbi01MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzQ2hhdExvYWRpbmcgfHwgIWNoYXRJbnB1dC50cmltKCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgYmctY3lhbi01MDAgaG92ZXI6YmctY3lhbi00MDAgZGlzYWJsZWQ6b3BhY2l0eS01MCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkIHRleHQteHMgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxTZW5kIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5XecWbbGlqPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgVEFCIDI6IENSRUFURSAmIEVESVQgSU1BR0VTIChnZW1pbmktbmFuby1iYW5hbmEtMi4xKVxuICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAge2FjdGl2ZVRvb2xUYWIgPT09ICdpbWFnZV9zdHVkaW8nICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxXYW5kMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgIEdlbmVyb3dhbmllIGkgRWR5Y2phIE9icmF6w7N3XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi00MDBcIj5nZW1pbmktbmFuby1iYW5hbmEtMi4xPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgZm9udC1tZWRpdW0gbWItMS41XCI+XG4gICAgICAgICAgICAgICAgICBUcnliIHByYWN5IChOb3d5IG9icmF6IGx1YiBFZHljamEgaXN0bmllasSFY2Vnbyk6XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdjcmVhdGUnLCBsYWJlbDogJ1V0d8Ozcnogbm93eSB6IHRla3N0dScgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2VkaXRfcmVmZXJlbmNlJywgbGFiZWw6ICdFZHl0dWogd3pvcnplYyBzdG/FgnUgQVInIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdlZGl0X3VwbG9hZCcsIGxhYmVsOiAnRWR5dHVqIHfFgmFzbmUgemRqxJljaWUnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdlZGl0XzNkJywgbGFiZWw6ICdFZHl0dWogenJ6dXQgc2NlbnkgM0QnIH0sXG4gICAgICAgICAgICAgICAgICBdLm1hcCgobW9kZSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXttb2RlLmlkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZU1vZGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUuaWQgYXMgJ2NyZWF0ZScgfCAnZWRpdF9yZWZlcmVuY2UnIHwgJ2VkaXRfdXBsb2FkJyB8ICdlZGl0XzNkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTIgcm91bmRlZC1sZyBib3JkZXIgdGV4dC1sZWZ0IGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZU1vZGUgPT09IG1vZGUuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi01MDAvMTUgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7bW9kZS5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFVwbG9hZCBpbnB1dCB3aGVuIGVkaXRpbmcgY3VzdG9tIHBob3RvICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTBcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtbWVkaXVtIHRleHQtc2xhdGUtMjAwIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIHt1cGxvYWRlZEVkaXRJbWFnZVxuICAgICAgICAgICAgICAgICAgICAgID8gYFphxYJhZG93YW5vOiAke3VwbG9hZGVkRWRpdEltYWdlLm5hbWV9YFxuICAgICAgICAgICAgICAgICAgICAgIDogJ09wY2pvbmFsbmllIHdncmFqIHpkasSZY2llIHogZHlza3UgZG8gZWR5Y2ppJ31cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+UE5HLCBKUEcgbHViIFdlYlA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgcm91bmRlZC1tZCBjdXJzb3ItcG9pbnRlciBmb250LW1lZGl1bSBzaHJpbmstMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V3liaWVyeiBwbGlrPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVVcGxvYWRJbWFnZUZvckVkaXR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIFByb21wdCB3aXp1YWxueSBsdWIgaW5zdHJ1a2NqYSBlZHljamk6XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezR9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17aW1hZ2VQcm9tcHR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEltYWdlUHJvbXB0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT3Bpc3ogaG9sb2dyYW0gYnVkeW5rdSwgZGV0YWxlIGFyY2hpdGVrdG9uaWN6bmUsIG/Fm3dpZXRsZW5pZSBsdWIgY28gY2hjZXN6IHptaWVuacSHIG5hIG9icmF6aWUuLi5cIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHAtMyB0ZXh0LXNsYXRlLTEwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWN5YW4tNTAwIGxlYWRpbmctcmVsYXhlZFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBmb250LW1lZGl1bSBtYi0xXCI+UHJvcG9yY2plIG9icmF6dTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aW1hZ2VBc3BlY3RSYXRpb31cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgIHNldEltYWdlQXNwZWN0UmF0aW8oXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC52YWx1ZSBhcyAnMTY6OScgfCAnOToxNicgfCAnMToxJyB8ICc0OjMnIHwgJzM6NCdcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHB4LTIuNSBweS0yIHRleHQtc2xhdGUtMjAwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjE2OjlcIj4xNjo5IChQYW5vcmFtYSBBUik8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjk6MTZcIj45OjE2IChTbWFydGZvbiBQaW9ub3dvKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMToxXCI+MToxIChLd2FkcmF0KTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNDozXCI+NDozIChUYWJsZXQpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIzOjRcIj4zOjQgKFBvcnRyZXQpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgZm9udC1tZWRpdW0gbWItMVwiPlJvemR6aWVsY3pvxZvEhzo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aW1hZ2VTaXplfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEltYWdlU2l6ZShlLnRhcmdldC52YWx1ZSBhcyAnMUsnIHwgJzJLJyB8ICc0SycpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTIgdGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMUtcIj4xSyAoU3p5YmtpIHJlbmRlcik8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjJLXCI+MksgKFd5c29rYSBvc3Ryb8WbxIcgZGV0YWxpKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiNEtcIj40SyAoVWx0cmEgSEQgQXJjaGl0ZWt0dXJhKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHQtMSBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICBXemJvZ2HEhyBrb250ZWtzdCBwcnpleiBHb29nbGUgSW1hZ2UgJiBXZWIgU2VhcmNoXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3VzZUltYWdlU2VhcmNoR3JvdW5kaW5nfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRVc2VJbWFnZVNlYXJjaEdyb3VuZGluZyhlLnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNCBoLTQgYWNjZW50LWN5YW4tNTAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAge2ltYWdlRXJyb3IgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtbGcgYmctcm9zZS05NTAvNjAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXJvc2UtMjAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIHtpbWFnZUVycm9yfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSdW5OYW5vQmFuYW5hSW1hZ2V9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzSW1hZ2VMb2FkaW5nIHx8ICFpbWFnZVByb21wdC50cmltKCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBweC00IGJnLWN5YW4tNTAwIGhvdmVyOmJnLWN5YW4tNDAwIGRpc2FibGVkOm9wYWNpdHktNTAgdGV4dC1zbGF0ZS05NTAgZm9udC1zZW1pYm9sZCByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpc0ltYWdlTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxMb2FkZXIyIGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmVuZGVyb3dhbmllIHcgZ2VtaW5pLW5hbm8tYmFuYW5hLTIuMS4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtpbWFnZU1vZGUgPT09ICdjcmVhdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdXeWdlbmVydWogT2JyYXogSG9sb2dyYW11IEFSJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnWmFzdG9zdWogRWR5Y2rEmSBPYnJhenUgQUknfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGJnLVsjMDcwQTEwXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNSBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBtaW4taC1bNDYwcHhdXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTNcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgICAgIFBvZGdsxIVkIFd5Z2VuZXJvd2FuZWogV2l6dWFsaXphY2ppIEFJXG4gICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICBNb2RlbDogPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtY3lhbi00MDBcIj5nZW1pbmktbmFuby1iYW5hbmEtMi4xPC9zcGFuPiDCt3snICd9XG4gICAgICAgICAgICAgICAgICB7aW1hZ2VBc3BlY3RSYXRpb30gwrcge2ltYWdlU2l6ZX1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7Z2VuZXJhdGVkSW1hZ2VVcmwgJiYgKFxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBocmVmPXtnZW5lcmF0ZWRJbWFnZVVybH1cbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkPXtgSG9sb0FyY2hfTmFub0JhbmFuYV8ke0RhdGUubm93KCl9LnBuZ2B9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtY3lhbi0zMDAgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlphcGlzeiBvYnJheiBQTkc8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB5LTRcIj5cbiAgICAgICAgICAgICAge2dlbmVyYXRlZEltYWdlVXJsID8gKFxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17Z2VuZXJhdGVkSW1hZ2VVcmx9XG4gICAgICAgICAgICAgICAgICBhbHQ9XCJXeWdlbmVyb3dhbmEgd2l6dWFsaXphY2phIGhvbG9ncmFtdSBhcmNoaXRla3Rvbmljem5lZ29cIlxuICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtYXgtaC1bMzgwcHhdIHctYXV0byByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwIG9iamVjdC1jb250YWluIHNoYWRvdy0yeGxcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYXgtdy1tZCBzcGFjZS15LTIgcC02XCI+XG4gICAgICAgICAgICAgICAgICA8SW1hZ2VJY29uIGNsYXNzTmFtZT1cInctMTAgaC0xMCB0ZXh0LXNsYXRlLTYwMCBteC1hdXRvXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgR290b3d5IGRvIGdlbmVyb3dhbmlhIGx1YiBlZHljamkgb2JyYXp1XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIFd5YmllcnogcG8gbGV3ZWogc3Ryb25pZSB0cnliIHV0d29yemVuaWEgbm93ZWogd2l6dWFsaXphY2ppIGx1YiBlZHljamlcbiAgICAgICAgICAgICAgICAgICAgd3pvcmNvd2VnbyB6ZGrEmWNpYSBzdG/FgnUga29uZmVyZW5jeWpuZWdvIEFSIGkga2xpa25paiBwcnp5Y2lzayBnZW5lcm93YW5pYS5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBUQUIgMzogR0VORVJBVEUgVklERU8gJiBBTklNQVRFIFBIT1RPIElOVE8gVklERU8gKGdlbWluaS1vbW5pLTEuMS1mbGFzaClcbiAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIHthY3RpdmVUb29sVGFiID09PSAndmlkZW9fb21uaScgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IGJnLXNsYXRlLTkwMC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNSBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPFZpZGVvIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgIFdpZGVvIHogVGVrc3R1IGkgQW5pbWFjamEgWmRqxJnEh1xuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTQwMFwiPmdlbWluaS1vbW5pLTEuMS1mbGFzaDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFZpZGVvTW9kZSgnYW5pbWF0ZV9waG90bycpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0yIHJvdW5kZWQtbGcgYm9yZGVyIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvTW9kZSA9PT0gJ2FuaW1hdGVfcGhvdG8nXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwLzE1IGJvcmRlci1hbWJlci00MDAgdGV4dC1hbWJlci0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEFuaW11aiBaZGrEmWNpZSBkbyBXaWRlb1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFZpZGVvTW9kZSgndGV4dF90b192aWRlbycpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0yIHJvdW5kZWQtbGcgYm9yZGVyIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICAgIHZpZGVvTW9kZSA9PT0gJ3RleHRfdG9fdmlkZW8nXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi01MDAvMTUgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEdlbmVydWogV2lkZW8geiBUZWtzdHVcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge3ZpZGVvTW9kZSA9PT0gJ2FuaW1hdGVfcGhvdG8nICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMi41IHAtMyByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgIFd5YmllcnogemRqxJljaWUgc3RhcnRvd2UgZG8gb8W8eXdpZW5pYSAoSW1hZ2UtdG8tVmlkZW8pOlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZpZGVvUGhvdG9Tb3VyY2V9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICBzZXRWaWRlb1Bob3RvU291cmNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgYXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAndXBsb2FkZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHwgJ3JlZmVyZW5jZV90YWJsZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfCAnbGF0ZXN0XzNkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB8ICdnZW5lcmF0ZWRfbmFubydcbiAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHB4LTIuNSBweS0yIHRleHQtc2xhdGUtMjAwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInJlZmVyZW5jZV90YWJsZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIFphxYLEhWN6b25lIHpkasSZY2llIHN0b8WCdSBrb25mZXJlbmN5am5lZ28gQVIgKERhc2hib2FyZF9kZXgpXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidXBsb2FkZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICBXxYJhc25lIHByemVzxYJhbmUgemRqxJljaWUgeiB1cnrEhWR6ZW5pYSB7dXBsb2FkZWRWaWRlb1Bob3RvID8gYCgke3VwbG9hZGVkVmlkZW9QaG90by5uYW1lfSlgIDogJyd9XG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibGF0ZXN0XzNkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgT3N0YXRuaSB6cnp1dCBla3JhbnUgeiBzeW11bGF0b3JhIDNEIFdlYkdMXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZ2VuZXJhdGVkX25hbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICBPYnJheiB3eWdlbmVyb3dhbnkgdyBOYW5vIEJhbmFuYSAyLjFcbiAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHt1cGxvYWRlZFZpZGVvUGhvdG9cbiAgICAgICAgICAgICAgICAgICAgICAgID8gYFdncmFubzogJHt1cGxvYWRlZFZpZGVvUGhvdG8ubmFtZX1gXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdMdWIgcHJ6ZcWbbGlqIHfFgmFzbmUgemRqxJljaWUgYnVkeW5rdSAvIG1ha2lldHk6J31cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEuNSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQgY3Vyc29yLXBvaW50ZXIgZm9udC1tZWRpdW0gc2hyaW5rLTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XZ3JhaiB6ZGrEmWNpZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e2hhbmRsZVVwbG9hZFBob3RvRm9yVmlkZW99XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBmb250LW1lZGl1bSBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBPcGlzIHJ1Y2h1IGthbWVyeSwgcGFyYWxha3N5IGkgZWZla3TDs3cgd2lkZW8gKFByb21wdCk6XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezR9XG4gICAgICAgICAgICAgICAgICB2YWx1ZT17dmlkZW9Qcm9tcHR9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFZpZGVvUHJvbXB0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT3Bpc3ogcnVjaCBrYW1lcnkgd29rw7PFgiBob2xvZ3JhbXUgYnVkeW5rdSwgY3rEhXN0ZWN6a2kgxZt3aWV0bG5lIHphIG9rbmFtaS4uLlwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcC0zIHRleHQtc2xhdGUtMTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItY3lhbi01MDAgbGVhZGluZy1yZWxheGVkXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgRm9ybWF0IHdpZGVvIChBc3BlY3QgUmF0aW8pOlxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3ZpZGVvQXNwZWN0UmF0aW99XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VmlkZW9Bc3BlY3RSYXRpbyhlLnRhcmdldC52YWx1ZSBhcyAnMTY6OScgfCAnOToxNicpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMi41IHB5LTIgdGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMTY6OVwiPjE2OjkgKFBvemlvbXkg4oCUIExhbmRzY2FwZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjk6MTZcIj45OjE2IChQaW9ub3d5IOKAlCBQb3J0cmFpdCBNb2JpbGUpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgZm9udC1tZWRpdW0gbWItMVwiPkN6YXMgdHJ3YW5pYTo8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dmlkZW9EdXJhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRWaWRlb0R1cmF0aW9uKGUudGFyZ2V0LnZhbHVlIGFzICc1cycgfCAnMTBzJyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBweC0yLjUgcHktMiB0ZXh0LXNsYXRlLTIwMFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCI1c1wiPjUgc2VrdW5kIChTdGFuZGFyZCk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjEwc1wiPjEwIHNla3VuZCAoUm96c3plcnpvbnkpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge3ZpZGVvRXJyb3IgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtbGcgYmctcm9zZS05NTAvNjAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXJvc2UtMjAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIHt2aWRlb0Vycm9yfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSdW5PbW5pRmxhc2hWaWRlb31cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNWaWRlb0xvYWRpbmcgfHwgIXZpZGVvUHJvbXB0LnRyaW0oKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHB4LTQgYmctYW1iZXItNTAwIGhvdmVyOmJnLWFtYmVyLTQwMCBkaXNhYmxlZDpvcGFjaXR5LTUwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQgcm91bmRlZC1sZyB0cmFuc2l0aW9uLWNvbG9ycyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXNWaWRlb0xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8TG9hZGVyMiBjbGFzc05hbWU9XCJ3LTQgaC00IGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmVyb3dhbmllIHdpZGVvIHcgZ2VtaW5pLW9tbmktMS4xLWZsYXNoIChtb8W8ZSBwb3Ryd2HEhyB+MzAtOTBzKS4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8RmlsbSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge3ZpZGVvTW9kZSA9PT0gJ2FuaW1hdGVfcGhvdG8nXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdBbmltdWogWmRqxJljaWUgZG8gV2lkZW8gKEludGVyYWN0aW9ucyBBUEkpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnV3lnZW5lcnVqIFdpZGVvIHogVGVrc3R1IChJbnRlcmFjdGlvbnMgQVBJKSd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgYmctWyMwNzBBMTBdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01IGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIG1pbi1oLVs0NjBweF1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgT2R0d2FyemFjeiBXaWRlbyBBUiAoSW50ZXJhY3Rpb25zIEFQSSlcbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIE1vZGVsOiA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1hbWJlci00MDBcIj5nZW1pbmktb21uaS0xLjEtZmxhc2g8L3NwYW4+IMK3eycgJ31cbiAgICAgICAgICAgICAgICAgIFByb3BvcmNqZSB7dmlkZW9Bc3BlY3RSYXRpb30gwrcge3ZpZGVvRHVyYXRpb259XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAge2dlbmVyYXRlZFZpZGVvVXJsICYmIChcbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgaHJlZj17Z2VuZXJhdGVkVmlkZW9Vcmx9XG4gICAgICAgICAgICAgICAgICBkb3dubG9hZD17YEhvbG9BcmNoX09tbmlWaWRlb18ke0RhdGUubm93KCl9Lm1wNGB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHRleHQteHMgZm9udC1zZW1pYm9sZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtYW1iZXItMzAwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IE1QNDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcHktNFwiPlxuICAgICAgICAgICAgICB7Z2VuZXJhdGVkVmlkZW9VcmwgPyAoXG4gICAgICAgICAgICAgICAgPHZpZGVvXG4gICAgICAgICAgICAgICAgICBzcmM9e2dlbmVyYXRlZFZpZGVvVXJsfVxuICAgICAgICAgICAgICAgICAgY29udHJvbHNcbiAgICAgICAgICAgICAgICAgIGF1dG9QbGF5XG4gICAgICAgICAgICAgICAgICBsb29wXG4gICAgICAgICAgICAgICAgICBwbGF5c0lubGluZVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWF4LWgtWzM4MHB4XSB3LWF1dG8gcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3ctMnhsXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWF4LXctbWQgc3BhY2UteS0yIHAtNlwiPlxuICAgICAgICAgICAgICAgICAgPEZpbG0gY2xhc3NOYW1lPVwidy0xMCBoLTEwIHRleHQtc2xhdGUtNjAwIG14LWF1dG9cIiAvPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICBXeWdlbmVydWogYW5pbWFjasSZIHByemVsb3R1IGthbWVyeSBBUiB3b2vDs8WCIG1ha2lldHlcbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgTW/FvGVzeiBvxbx5d2nEhyBwcnplc8WCYW5lIHpkasSZY2llIHN0b8WCdSBrb25mZXJlbmN5am5lZ28gQVIsIHfFgmFzbsSFIGZvdG9ncmFmacSZIHpcbiAgICAgICAgICAgICAgICAgICAgZHlza3UgbHViIHd5Z2VuZXJvd2HEhyBmaWxtIG9kIHBvZHN0YXcgbmEgcG9kc3Rhd2llIG9waXN1IHRla3N0b3dlZ28uXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgVEFCIDQ6IFJFQUwtVElNRSBWT0lDRSBDT05WRVJTQVRJT05TIChnZW1pbmktMy44LWxpdmUpXG4gICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7YWN0aXZlVG9vbFRhYiA9PT0gJ2xpdmVfdm9pY2UnICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxWb2x1bWUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgS29ud2Vyc2FjamEgR8WCb3Nvd2EgbmEgxbt5d28gKExpdmUgQVBJKVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWN5YW4tNDAwXCI+Z2VtaW5pLTMuOC1saXZlPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIFBvxYLEhWN6IHNpxJkgeiBtb2RlbGVtIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ub1wiPmdlbWluaS0zLjgtbGl2ZTwvc3Bhbj4gcHJ6ZXpcbiAgICAgICAgICAgICAgc3RydW1pZcWEIFdlYlNvY2tldCBQQ00gKHdlasWbY2llIG1pa3JvZm9ub3dlIDE2IGtIeiwgd3lqxZtjaWUgZ8WCb3Nvd2UgMjQga0h6KSBpXG4gICAgICAgICAgICAgIG9tYXdpYWogbmEgxbx5d28gZGV0YWxlIGFyY2hpdGVrdG9uaWN6bmUsIGtvbmZpZ3VyYWNqxJkgQVJLaXQvQVJDb3JlIG9yYXogb8Wbd2lldGxlbmllXG4gICAgICAgICAgICAgIMWbcm9kb3dpc2tvd2UuXG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHRleHQtY2VudGVyIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xNCBoLTE0IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgIGlzTGl2ZUNvbm5lY3RlZFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTUwMC8yMCBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXNMaXZlQ29ubmVjdGVkID8gPE1pYyBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz4gOiA8TWljT2ZmIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPn1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTAuNVwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgICB7aXNMaXZlQ29ubmVjdGVkXG4gICAgICAgICAgICAgICAgICAgID8gJ1Nlc2phIGfFgm9zb3dhIGFrdHl3bmEg4oCUIG3Ds3cgZG8gbWlrcm9mb251J1xuICAgICAgICAgICAgICAgICAgICA6IGlzTGl2ZUNvbm5lY3RpbmdcbiAgICAgICAgICAgICAgICAgICAgPyAnxYHEhWN6ZW5pZSB6IHNlcndlcmVtIEdlbWluaSAzLjggTGl2ZS4uLidcbiAgICAgICAgICAgICAgICAgICAgOiAnU2VzamEgZ8WCb3Nvd2Egcm96xYLEhWN6b25hJ31cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIEfFgm9zOiBaZXBoeXIgwrcgV2VqxZtjaWUgMTZrSHogUENNIMK3IFd5asWbY2llIDI0a0h6IFBDTVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgeyFpc0xpdmVDb25uZWN0ZWQgPyAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17c3RhcnRMaXZlU2Vzc2lvbn1cbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xpdmVDb25uZWN0aW5nfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBweC00IGJnLWN5YW4tNTAwIGhvdmVyOmJnLWN5YW4tNDAwIGRpc2FibGVkOm9wYWNpdHktNTAgdGV4dC1zbGF0ZS05NTAgZm9udC1zZW1pYm9sZCB0ZXh0LXhzIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpc0xpdmVDb25uZWN0aW5nID8gKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIDxMb2FkZXIyIGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5JbmljamFsaXphY2phIHN0cnVtaWVuaWEgYXVkaW8uLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8TWljIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlJvenBvY3puaWogUm96bW93xJkgR8WCb3Nvd8SFIG5hIMW7eXdvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17c3RvcExpdmVTZXNzaW9ufVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSBweC00IGJnLXJvc2UtNTAwIGhvdmVyOmJnLXJvc2UtNDAwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQgdGV4dC14cyByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8TWljT2ZmIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+WmFrb8WEY3ogUG/FgsSFY3plbmllIEfFgm9zb3dlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtsaXZlRXJyb3IgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWxnIGJnLXJvc2UtOTUwLzYwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNDAgdGV4dC1yb3NlLTIwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAge2xpdmVFcnJvcn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGJnLVsjMDcwQTEwXSBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIGZsZXggZmxleC1jb2wgaC1bNDIwcHhdIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTMgYmctc2xhdGUtOTAwLzkwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgVHJhbnNrcnlwY2phIG5hIMW8eXdvIGkgc3Rlcm93YW5pZSBzZXNqxIUgTGl2ZSBBUElcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICBTdGF0dXM6IHtpc0xpdmVDb25uZWN0ZWQgPyAnT05MSU5FICgyNGtIeiBBdWRpbyknIDogJ0dPVE9XWSd9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBwLTQgb3ZlcmZsb3cteS1hdXRvIHNwYWNlLXktMi41IHRleHQteHNcIj5cbiAgICAgICAgICAgICAge2xpdmVUcmFuc2NyaXB0cy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoLWZ1bGwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1jZW50ZXIgdGV4dC1zbGF0ZS01MDAgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMCBmb250LW1lZGl1bVwiPkJyYWsgemFyZWplc3Ryb3dhbnljaCB3eXBvd2llZHppPC9wPlxuICAgICAgICAgICAgICAgICAgPHA+XG4gICAgICAgICAgICAgICAgICAgIEtsaWtuaWog4oCeUm96cG9jem5paiBSb3ptb3fEmSBHxYJvc293xIUgbmEgxbt5d2/igJ0gaSB6YXB5dGFqIGfFgm9zb3dvIG5wLiBvIGN6dWpuaWtpXG4gICAgICAgICAgICAgICAgICAgIGfFgsSZYmkgTGlEQVIgbHViIHBhcmFsYWtzxJkgNkRvRi5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICBsaXZlVHJhbnNjcmlwdHMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1zZW1pYm9sZCB0ZXh0LWN5YW4tNDAwIG1yLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5zcGVha2VyfTpcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntpdGVtLnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSlcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgICBvblN1Ym1pdD17aGFuZGxlU2VuZExpdmVUZXh0VHVybn1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTkwMC85MCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtsaXZlVGV4dFByb21wdH1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldExpdmVUZXh0UHJvbXB0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzTGl2ZUNvbm5lY3RlZH1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj17XG4gICAgICAgICAgICAgICAgICBpc0xpdmVDb25uZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgPyAnV3nFm2xpaiBkb2RhdGtvd3kga29tdW5pa2F0IHRla3N0b3d5IGRvIGFrdHl3bmVqIHNlc2ppIGfFgm9zb3dlaiBMaXZlLi4uJ1xuICAgICAgICAgICAgICAgICAgICA6ICdVcnVjaG9tIHNlc2rEmSBnxYJvc293xIUsIGFieSByb3ptYXdpYcSHIGx1YiB3eXN5xYJhxIcga29tdW5pa2F0eS4uLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOm9wYWNpdHktNTBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0xpdmVDb25uZWN0ZWQgfHwgIWxpdmVUZXh0UHJvbXB0LnRyaW0oKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiBiZy1jeWFuLTUwMCBob3ZlcjpiZy1jeWFuLTQwMCBkaXNhYmxlZDpvcGFjaXR5LTUwIHRleHQtc2xhdGUtOTUwIGZvbnQtc2VtaWJvbGQgdGV4dC14cyByb3VuZGVkLWxnIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFd5xZtsaWogZG8gTGl2ZVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgVEFCIDU6IEdPT0dMRSBTRUFSQ0ggR1JPVU5ESU5HIChnZW1pbmktMy44LWZsYXNoICsgZ29vZ2xlU2VhcmNoKVxuICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAge2FjdGl2ZVRvb2xUYWIgPT09ICdzZWFyY2hfZ3JvdW5kaW5nJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01IHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBXZXJ5ZmlrYWNqYSBEYW55Y2ggeiBHb29nbGUgU2VhcmNoXG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi00MDBcIj5nZW1pbmktMy44LWZsYXNoPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIFBvYmllcmFqIGFrdHVhbG5lIGkgendlcnlmaWtvd2FuZSBpbmZvcm1hY2plIHogd3lzenVraXdhcmtpIEdvb2dsZSAoU2VhcmNoIEdyb3VuZGluZylcbiAgICAgICAgICAgICAgZG90eWN6xIVjZSB3c3BpZXJhbnljaCB1cnrEhWR6ZcWEIEFSQ29yZSwgZG9rdW1lbnRhY2ppIFVuaXR5IDYgWFIgb3JheiBwYXJhbWV0csOzd1xuICAgICAgICAgICAgICBhcmNoaXRla3Rvbmljem55Y2ggYnVkeW5rw7N3LlxuICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV3Bpc3ogemFweXRhbmllIGRvIHd5c3p1a2l3YXJraSBHb29nbGUuLi5cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwLTMgdGV4dC1zbGF0ZS0xMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1jeWFuLTUwMFwiXG4gICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJ1blNlYXJjaEdyb3VuZGluZygpfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1NlYXJjaExvYWRpbmcgfHwgIXNlYXJjaFF1ZXJ5LnRyaW0oKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHB4LTQgYmctY3lhbi01MDAgaG92ZXI6YmctY3lhbi00MDAgZGlzYWJsZWQ6b3BhY2l0eS01MCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2lzU2VhcmNoTG9hZGluZyA/IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxMb2FkZXIyIGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHJ6ZXN6dWtpd2FuaWUgR29vZ2xlIFNlYXJjaC4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPld5c3p1a2FqIHogR29vZ2xlIFNlYXJjaCBHcm91bmRpbmc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGJsb2NrIGZvbnQtbWVkaXVtXCI+UHJ6eWvFgmFkb3dlIGt3ZXJlbmR5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgJ09maWNqYWxuYSBsaXN0YSB0YWJsZXTDs3cgQW5kcm9pZCB3c3BpZXJhasSFY3ljaCBHb29nbGUgQVJDb3JlIERlcHRoIEFQSSB3IDIwMjYgcm9rdScsXG4gICAgICAgICAgICAgICAgICAnTm93b8WbY2kgdyBVbml0eSA2IEFSIEZvdW5kYXRpb24gNi4wIGRvdHljesSFY2Ugb2tsdXpqaSBMaURBUiBpIG/Fm3dpZXRsZW5pYSDFm3JvZG93aXNrb3dlZ28nLFxuICAgICAgICAgICAgICAgICAgJ05hand5xbxzemUgd2llxbxvd2NlIHoga29uc3RydWtjasSFIGRpYWdyaWQgbmEgxZt3aWVjaWUg4oCUIHBhcmFtZXRyeSBhcmNoaXRla3Rvbmljem5lJyxcbiAgICAgICAgICAgICAgICBdLm1hcCgocSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVSdW5TZWFyY2hHcm91bmRpbmcocSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCB0ZXh0LWxlZnQgcHgtMi41IHB5LTEuNSByb3VuZGVkIGJnLXNsYXRlLTk1MCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC1bMTFweF0gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cX1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7c2VhcmNoRXJyb3IgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWxnIGJnLXJvc2UtOTUwLzYwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNDAgdGV4dC1yb3NlLTIwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAge3NlYXJjaEVycm9yfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgYmctWyMwNzBBMTBdIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01IGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIG1pbi1oLVs0MjBweF1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgUmFwb3J0IHogR29vZ2xlIFNlYXJjaCBHcm91bmRpbmdcbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi00MDBcIj5cbiAgICAgICAgICAgICAgICAgIHtzZWFyY2hTb3VyY2VzLmxlbmd0aH0gxbpyw7NkZcWCIFdXV1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge3NlYXJjaFJlc3VsdFRleHQgPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0yMDAgbGVhZGluZy1yZWxheGVkIHdoaXRlc3BhY2UtcHJlLXdyYXAgbWF4LWgtWzI4MHB4XSBvdmVyZmxvdy15LWF1dG8gcHItMlwiPlxuICAgICAgICAgICAgICAgICAge3NlYXJjaFJlc3VsdFRleHR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweS0xNiB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTUwMCB0ZXh0LXhzIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgPEdsb2JlIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1zbGF0ZS02MDAgbXgtYXV0byBtYi0yXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgIFVydWNob20gemFweXRhbmllIHogdXppZW1pZW5pZW0gdyBHb29nbGUgU2VhcmNoXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgV3luaWsgd3JheiB6IGtsaWthbG55bWkgbGlua2FtaSDFunLDs2TFgm93eW1pIHBvamF3aSBzacSZIHcgdHltIG9rbmllLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHtzZWFyY2hTb3VyY2VzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTQgbXQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTMwMCBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgWndlcnlmaWtvd2FuZSDFunLDs2TFgmEgR29vZ2xlIFNlYXJjaDpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAge3NlYXJjaFNvdXJjZXMubWFwKChzcmMsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgICAgICAgaHJlZj17c3JjLnVyaX1cbiAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIuNSBweS0xIHJvdW5kZWQgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXhzIHRleHQtY3lhbi0zMDAgdHJhbnNpdGlvbi1jb2xvcnMgbWF4LXcteHMgdHJ1bmNhdGVcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEV4dGVybmFsTGluayBjbGFzc05hbWU9XCJ3LTMgaC0zIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntzcmMudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9zZWN0aW9uPlxuICApO1xufTtcbiJdfQ==