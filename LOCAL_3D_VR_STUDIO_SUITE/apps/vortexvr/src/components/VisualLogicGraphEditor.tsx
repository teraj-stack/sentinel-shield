const React = __vite__cjsImport0_react; const useRef = __vite__cjsImport0_react["useRef"]; const useState = __vite__cjsImport0_react["useState"];const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"]; const _Fragment = __vite__cjsImport2_react_jsxDevRuntime["Fragment"];import __vite__cjsImport0_react from "/apps/vortexvr/node_modules/.vite/deps/react.js?v=adc20043";
import { Plus, Trash2, Maximize2, Minimize2, GitBranch, Play, LayoutGrid } from "/apps/vortexvr/node_modules/.vite/deps/lucide-react.js?v=867ef266";
var _jsxFileName = "/app/applet/src/components/VisualLogicGraphEditor.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/apps/vortexvr/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=adc20043";
const NODE_WIDTH = 248;
const NODE_HEIGHT = 152;
export const VisualLogicGraphEditor = ({ lang, logicNodes, setLogicNodes, objects, selectedObjectId, isExpandedSubView, setIsExpandedSubView, onTriggerNodeCascade }) => {
	const canvasRef = useRef(null);
	// Dragging a node card position
	const [draggingNodeId, setDraggingNodeId] = useState(null);
	const [dragOffset, setDragOffset] = useState({
		x: 0,
		y: 0
	});
	// Dragging a new dependency wire between nodes
	const [wireDrag, setWireDrag] = useState(null);
	const [hoveredTargetNodeId, setHoveredTargetNodeId] = useState(null);
	const [statusHint, setStatusHint] = useState(lang === "pl" ? "Przeciągnij linię z portu wyjściowego (WYJ ●) jednego węzła do portu wejściowego (● WEJ) kolejnego węzła, aby utworzyć zależność wyzwalacza." : "Drag a wire from a node Output port (OUT ●) to another node Input port (● IN) to link event-trigger dependencies.");
	// Convert client pointer coordinates to canvas-relative coordinates
	const getCanvasCoords = (clientX, clientY) => {
		const rect = canvasRef.current?.getBoundingClientRect();
		if (!rect) return {
			x: 0,
			y: 0
		};
		return {
			x: clientX - rect.left + (canvasRef.current?.scrollLeft || 0),
			y: clientY - rect.top + (canvasRef.current?.scrollTop || 0)
		};
	};
	// Output port coordinates (Right edge center of node card)
	const getOutputPortCoords = (node) => ({
		x: (node.position?.x ?? 40) + NODE_WIDTH,
		y: (node.position?.y ?? 30) + NODE_HEIGHT / 2
	});
	// Input port coordinates (Left edge center of node card)
	const getInputPortCoords = (node) => ({
		x: node.position?.x ?? 40,
		y: (node.position?.y ?? 30) + NODE_HEIGHT / 2
	});
	// Start dragging a node card to reposition it
	const handleNodeHeaderPointerDown = (e, node) => {
		e.stopPropagation();
		const coords = getCanvasCoords(e.clientX, e.clientY);
		setDraggingNodeId(node.id);
		setDragOffset({
			x: coords.x - (node.position?.x ?? 40),
			y: coords.y - (node.position?.y ?? 30)
		});
	};
	// Start dragging a connection line from an Output port
	const handleStartWireDrag = (e, sourceNode) => {
		e.stopPropagation();
		e.preventDefault();
		const port = getOutputPortCoords(sourceNode);
		const coords = getCanvasCoords(e.clientX, e.clientY);
		setWireDrag({
			fromNodeId: sourceNode.id,
			startX: port.x,
			startY: port.y,
			currX: coords.x,
			currY: coords.y
		});
	};
	// Pointer move across the graph canvas
	const handleCanvasPointerMove = (e) => {
		if (!draggingNodeId && !wireDrag) return;
		const coords = getCanvasCoords(e.clientX, e.clientY);
		if (draggingNodeId) {
			const nextX = Math.max(12, Math.min(1300, Math.round(coords.x - dragOffset.x)));
			const nextY = Math.max(12, Math.min(720, Math.round(coords.y - dragOffset.y)));
			setLogicNodes((prev) => prev.map((n) => n.id === draggingNodeId ? {
				...n,
				position: {
					x: nextX,
					y: nextY
				}
			} : n));
		}
		if (wireDrag) {
			setWireDrag((prev) => prev ? {
				...prev,
				currX: coords.x,
				currY: coords.y
			} : null);
		}
	};
	// Complete wire connection onto a target node's Input port or card
	const completeWireConnection = (targetNodeId) => {
		if (!wireDrag) return;
		const { fromNodeId } = wireDrag;
		if (fromNodeId === targetNodeId) {
			setWireDrag(null);
			return;
		}
		setLogicNodes((prev) => prev.map((n) => {
			if (n.id !== targetNodeId) return n;
			const existingDeps = n.dependsOnIds || [];
			if (existingDeps.includes(fromNodeId)) return n;
			return {
				...n,
				dependsOnIds: [...existingDeps, fromNodeId]
			};
		}));
		const fromNode = logicNodes.find((n) => n.id === fromNodeId);
		const toNode = logicNodes.find((n) => n.id === targetNodeId);
		setStatusHint(lang === "pl" ? `Połączono zależność: [${fromNode?.name || fromNodeId}] ➔ [${toNode?.name || targetNodeId}]` : `Connected dependency: [${fromNode?.name || fromNodeId}] ➔ [${toNode?.name || targetNodeId}]`);
		setWireDrag(null);
		setHoveredTargetNodeId(null);
	};
	const handleCanvasPointerUp = () => {
		if (wireDrag && hoveredTargetNodeId) {
			completeWireConnection(hoveredTargetNodeId);
		}
		setDraggingNodeId(null);
		setWireDrag(null);
		setHoveredTargetNodeId(null);
	};
	// Remove a dependency wire between two nodes
	const handleRemoveConnection = (fromId, toId) => {
		setLogicNodes((prev) => prev.map((n) => n.id === toId ? {
			...n,
			dependsOnIds: (n.dependsOnIds || []).filter((id) => id !== fromId)
		} : n));
		setStatusHint(lang === "pl" ? "Usunięto połączenie zależności między węzłami." : "Removed dependency wire between nodes.");
	};
	// Add a new LogicNode onto the visual canvas
	const handleAddNode = () => {
		const idx = logicNodes.length;
		const col = idx % 3;
		const row = Math.floor(idx / 3);
		const newId = `rule_${Date.now().toString(36)}`;
		const prevNodeId = logicNodes.length > 0 ? logicNodes[logicNodes.length - 1].id : undefined;
		const newNode = {
			id: newId,
			name: lang === "pl" ? `Węzeł #${idx + 1}` : `Logic Node #${idx + 1}`,
			targetObjectId: selectedObjectId || "ALL",
			event: idx % 2 === 0 ? "OnGrabClick" : "OnGaze",
			action: idx % 2 === 0 ? "AwardPoints100" : "PulseEmissive",
			enabled: true,
			position: {
				x: 36 + col * 310,
				y: 28 + row * 185
			},
			dependsOnIds: prevNodeId ? [prevNodeId] : []
		};
		setLogicNodes((prev) => [...prev, newNode]);
		setStatusHint(lang === "pl" ? `Dodano "${newNode.name}" i połączono z poprzednim węzłem. Przeciągnij węzły lub przepnij linie.` : `Added "${newNode.name}". Drag nodes to arrange or drag ports to rewire dependencies.`);
	};
	// Auto-arrange nodes cleanly in topological columns
	const handleAutoLayout = () => {
		setLogicNodes((prev) => prev.map((n, idx) => {
			const col = idx % 3;
			const row = Math.floor(idx / 3);
			return {
				...n,
				position: {
					x: 36 + col * 315,
					y: 28 + row * 185
				}
			};
		}));
	};
	// Build cubic Bezier SVG path string between two points
	const buildBezierPath = (x1, y1, x2, y2) => {
		const dx = Math.max(60, Math.abs(x2 - x1) * .5);
		return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
	};
	// Collect all active dependency edges across logicNodes
	const edges = [];
	logicNodes.forEach((toNode) => {
		(toNode.dependsOnIds || []).forEach((fromId) => {
			const fromNode = logicNodes.find((n) => n.id === fromId);
			if (fromNode) {
				const outPt = getOutputPortCoords(fromNode);
				const inPt = getInputPortCoords(toNode);
				edges.push({
					fromNode,
					toNode,
					x1: outPt.x,
					y1: outPt.y,
					x2: inPt.x,
					y2: inPt.y
				});
			}
		});
	});
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "flex flex-col w-full h-full select-none",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-slate-800 text-xs",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV("span", {
						className: "font-semibold text-white flex items-center gap-1.5",
						children: [/* @__PURE__ */ _jsxDEV(GitBranch, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 293,
							columnNumber: 13
						}, this), lang === "pl" ? "Wizualny Edytor Połączeń i Zależności Węzłów (Drag & Drop)" : "Visual Node Dependency & Trigger Connection Editor"]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 292,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("span", {
						className: "hidden md:inline text-slate-400 font-mono text-[11px]",
						children: [
							"· ",
							logicNodes.length,
							" ",
							lang === "pl" ? "węzłów" : "nodes",
							" · ",
							edges.length,
							" ",
							lang === "pl" ? "połączeń" : "wires"
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 298,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 291,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: handleAddNode,
							className: "flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors whitespace-nowrap shrink-0",
							children: [/* @__PURE__ */ _jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 310,
								columnNumber: 13
							}, this), lang === "pl" ? "Dodaj Węzeł Logiki" : "Add Logic Node"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 305,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: handleAutoLayout,
							className: "flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors whitespace-nowrap shrink-0",
							title: lang === "pl" ? "Automatyczne rozmieszczenie siatki" : "Auto-arrange nodes",
							children: [/* @__PURE__ */ _jsxDEV(LayoutGrid, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 320,
								columnNumber: 13
							}, this), lang === "pl" ? "Uporządkuj Graf" : "Auto-Layout"]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 314,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ _jsxDEV("button", {
							type: "button",
							onClick: () => setIsExpandedSubView(!isExpandedSubView),
							className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 font-medium transition-colors whitespace-nowrap shrink-0",
							children: isExpandedSubView ? /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Minimize2, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 331,
								columnNumber: 17
							}, this), lang === "pl" ? "Zwiń do Doku 3D" : "Dock View"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 330,
								columnNumber: 15
							}, this) : /* @__PURE__ */ _jsxDEV(_Fragment, { children: [/* @__PURE__ */ _jsxDEV(Maximize2, { className: "w-3.5 h-3.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 336,
								columnNumber: 17
							}, this), lang === "pl" ? "Pełny Widok Grafu (Sub-View)" : "Full Graph Sub-View"] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 335,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 324,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 304,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 290,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				ref: canvasRef,
				onPointerMove: handleCanvasPointerMove,
				onPointerUp: handleCanvasPointerUp,
				className: `relative w-full overflow-auto rounded-xl bg-slate-950 border border-slate-800 ${isExpandedSubView ? "h-[calc(100vh-230px)] min-h-[480px]" : "h-[230px]"}`,
				style: {
					backgroundImage: "radial-gradient(circle, rgba(148, 163, 184, 0.16) 1px, transparent 1px)",
					backgroundSize: "20px 20px"
				},
				children: /* @__PURE__ */ _jsxDEV("div", {
					className: "relative min-w-[1050px] min-h-[460px] w-full h-full",
					children: [/* @__PURE__ */ _jsxDEV("svg", {
						className: "absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible",
						children: [
							/* @__PURE__ */ _jsxDEV("defs", { children: [/* @__PURE__ */ _jsxDEV("linearGradient", {
								id: "wireGrad",
								x1: "0%",
								y1: "0%",
								x2: "100%",
								y2: "0%",
								children: [/* @__PURE__ */ _jsxDEV("stop", {
									offset: "0%",
									stopColor: "#F59E0B"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 363,
									columnNumber: 17
								}, this), /* @__PURE__ */ _jsxDEV("stop", {
									offset: "100%",
									stopColor: "#38BDF8"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 364,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 362,
								columnNumber: 15
							}, this), /* @__PURE__ */ _jsxDEV("marker", {
								id: "arrowHead",
								viewBox: "0 0 10 10",
								refX: "7",
								refY: "5",
								markerWidth: "6",
								markerHeight: "6",
								orient: "auto-start-reverse",
								children: /* @__PURE__ */ _jsxDEV("path", {
									d: "M 0 1 L 10 5 L 0 9 z",
									fill: "#38BDF8"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 375,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 366,
								columnNumber: 15
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 361,
								columnNumber: 13
							}, this),
							edges.map((edge) => {
								const pathData = buildBezierPath(edge.x1, edge.y1, edge.x2, edge.y2);
								const midX = (edge.x1 + edge.x2) / 2;
								const midY = (edge.y1 + edge.y2) / 2;
								const isRecentlyTriggered = edge.fromNode.lastTriggeredAt && Date.now() - edge.fromNode.lastTriggeredAt < 2e3;
								return /* @__PURE__ */ _jsxDEV("g", {
									className: "pointer-events-auto",
									children: [
										/* @__PURE__ */ _jsxDEV("path", {
											d: pathData,
											fill: "none",
											stroke: "transparent",
											strokeWidth: 14,
											className: "cursor-pointer",
											onClick: () => handleRemoveConnection(edge.fromNode.id, edge.toNode.id)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 391,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("path", {
											d: pathData,
											fill: "none",
											stroke: isRecentlyTriggered ? "#10B981" : "url(#wireGrad)",
											strokeWidth: isRecentlyTriggered ? 3.5 : 2.5,
											markerEnd: "url(#arrowHead)"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 400,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("path", {
											d: pathData,
											fill: "none",
											stroke: "#FFFBEB",
											strokeWidth: 1.5,
											strokeDasharray: "5 9",
											opacity: .75
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 408,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("g", {
											transform: `translate(${midX}, ${midY})`,
											className: "cursor-pointer group",
											onClick: () => handleRemoveConnection(edge.fromNode.id, edge.toNode.id),
											children: [/* @__PURE__ */ _jsxDEV("circle", {
												r: 9,
												fill: "#0F172A",
												stroke: "#475569",
												strokeWidth: 1.5,
												className: "group-hover:fill-rose-600 group-hover:stroke-rose-400 transition-colors"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 422,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("text", {
												textAnchor: "middle",
												dy: "3.5",
												fill: "#E2E8F0",
												fontSize: "11",
												fontFamily: "monospace",
												children: "×"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 429,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 417,
											columnNumber: 19
										}, this)
									]
								}, `${edge.fromNode.id}->${edge.toNode.id}`, true, {
									fileName: _jsxFileName,
									lineNumber: 389,
									columnNumber: 17
								}, this);
							}),
							wireDrag && /* @__PURE__ */ _jsxDEV("path", {
								d: buildBezierPath(wireDrag.startX, wireDrag.startY, wireDrag.currX, wireDrag.currY),
								fill: "none",
								stroke: "#F59E0B",
								strokeWidth: 2.5,
								strokeDasharray: "6 4",
								markerEnd: "url(#arrowHead)"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 445,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 360,
						columnNumber: 11
					}, this), logicNodes.map((node, index) => {
						const posX = node.position?.x ?? 36 + index % 3 * 310;
						const posY = node.position?.y ?? 28 + Math.floor(index / 3) * 180;
						const isTargetHovered = hoveredTargetNodeId === node.id;
						const isRecentlyFired = node.lastTriggeredAt && Date.now() - node.lastTriggeredAt < 1800;
						return /* @__PURE__ */ _jsxDEV("div", {
							onPointerEnter: () => {
								if (wireDrag && wireDrag.fromNodeId !== node.id) {
									setHoveredTargetNodeId(node.id);
								}
							},
							onPointerLeave: () => {
								if (hoveredTargetNodeId === node.id) {
									setHoveredTargetNodeId(null);
								}
							},
							onPointerUp: () => {
								if (wireDrag && wireDrag.fromNodeId !== node.id) {
									completeWireConnection(node.id);
								}
							},
							style: {
								width: `${NODE_WIDTH}px`,
								height: `${NODE_HEIGHT}px`,
								transform: `translate3d(${posX}px, ${posY}px, 0)`
							},
							className: `absolute top-0 left-0 z-20 rounded-xl bg-slate-900/95 border transition-shadow flex flex-col justify-between p-3 text-xs shadow-xl ${isRecentlyFired ? "border-emerald-400 ring-2 ring-emerald-400/40" : isTargetHovered ? "border-sky-400 ring-2 ring-sky-400/40" : node.enabled ? "border-slate-700 hover:border-amber-500/70" : "border-slate-800 opacity-60"}`,
							children: [
								/* @__PURE__ */ _jsxDEV("div", {
									onPointerUp: (e) => {
										e.stopPropagation();
										if (wireDrag && wireDrag.fromNodeId !== node.id) {
											completeWireConnection(node.id);
										}
									},
									title: lang === "pl" ? "Port Wejściowy (Upuść tutaj linię z poprzedniego węzła)" : "Dependency Input Port (Drop wire here)",
									className: `absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-crosshair transition-transform ${isTargetHovered ? "bg-sky-400 border-white scale-125" : (node.dependsOnIds || []).length > 0 ? "bg-sky-500 border-slate-950" : "bg-slate-800 border-slate-500 hover:border-sky-400"}`,
									children: /* @__PURE__ */ _jsxDEV("span", { className: "w-2 h-2 rounded-full bg-white" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 523,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 503,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									onPointerDown: (e) => handleStartWireDrag(e, node),
									title: lang === "pl" ? "Port Wyjściowy (Przeciągnij linię do kolejnego węzła)" : "Trigger Output Port (Drag wire to another node)",
									className: "absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-500 hover:bg-amber-400 border-2 border-slate-950 flex items-center justify-center cursor-crosshair hover:scale-125 transition-transform",
									children: /* @__PURE__ */ _jsxDEV("span", { className: "w-2 h-2 rounded-full bg-slate-950" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 536,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 527,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									onPointerDown: (e) => handleNodeHeaderPointerDown(e, node),
									className: "flex items-center justify-between gap-1.5 pb-1.5 border-b border-slate-800 cursor-move",
									children: [/* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1.5 min-w-0",
										children: [/* @__PURE__ */ _jsxDEV("input", {
											type: "checkbox",
											checked: node.enabled,
											onPointerDown: (e) => e.stopPropagation(),
											onChange: () => setLogicNodes((prev) => prev.map((r) => r.id === node.id ? {
												...r,
												enabled: !r.enabled
											} : r)),
											className: "accent-amber-500 cursor-pointer"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 545,
											columnNumber: 21
										}, this), /* @__PURE__ */ _jsxDEV("input", {
											type: "text",
											value: node.name,
											onPointerDown: (e) => e.stopPropagation(),
											onChange: (e) => setLogicNodes((prev) => prev.map((r) => r.id === node.id ? {
												...r,
												name: e.target.value
											} : r)),
											className: "bg-transparent font-semibold text-white truncate w-32 focus:outline-none focus:bg-slate-950 rounded px-1"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 558,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 544,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("div", {
										className: "flex items-center gap-1 shrink-0",
										children: [onTriggerNodeCascade && /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onPointerDown: (e) => e.stopPropagation(),
											onClick: () => onTriggerNodeCascade(node.id),
											title: lang === "pl" ? "Przetestuj kaskadę wyzwalacza" : "Test trigger cascade",
											className: "p-1 rounded bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-300",
											children: /* @__PURE__ */ _jsxDEV(Play, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 586,
												columnNumber: 25
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 575,
											columnNumber: 23
										}, this), /* @__PURE__ */ _jsxDEV("button", {
											type: "button",
											onPointerDown: (e) => e.stopPropagation(),
											onClick: () => setLogicNodes((prev) => prev.filter((r) => r.id !== node.id).map((r) => ({
												...r,
												dependsOnIds: (r.dependsOnIds || []).filter((d) => d !== node.id)
											}))),
											className: "p-1 rounded hover:bg-rose-950 text-slate-400 hover:text-rose-400",
											title: lang === "pl" ? "Usuń węzeł" : "Delete node",
											children: /* @__PURE__ */ _jsxDEV(Trash2, { className: "w-3 h-3" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 607,
												columnNumber: 23
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 589,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 573,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 540,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "space-y-1.5 my-1",
									children: [
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between gap-1 text-[11px]",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "text-slate-400 shrink-0",
												children: lang === "pl" ? "Obiekt:" : "Actor:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 615,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("select", {
												value: node.targetObjectId,
												onPointerDown: (e) => e.stopPropagation(),
												onChange: (e) => setLogicNodes((prev) => prev.map((r) => r.id === node.id ? {
													...r,
													targetObjectId: e.target.value
												} : r)),
												className: "w-36 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-200 truncate",
												children: [/* @__PURE__ */ _jsxDEV("option", {
													value: "ALL",
													children: lang === "pl" ? "Wszystkie obiekty (ALL)" : "All Scene Actors"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 632,
													columnNumber: 23
												}, this), objects.map((o) => /* @__PURE__ */ _jsxDEV("option", {
													value: o.id,
													children: o.name
												}, o.id, false, {
													fileName: _jsxFileName,
													lineNumber: 636,
													columnNumber: 25
												}, this))]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 618,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 614,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between gap-1 text-[11px]",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "text-amber-400 font-mono shrink-0",
												children: "IF:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 644,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("select", {
												value: node.event,
												onPointerDown: (e) => e.stopPropagation(),
												onChange: (e) => setLogicNodes((prev) => prev.map((r) => r.id === node.id ? {
													...r,
													event: e.target.value
												} : r)),
												className: "w-36 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-amber-300 font-mono",
												children: [
													/* @__PURE__ */ _jsxDEV("option", {
														value: "OnGrabClick",
														children: "OnGrabClick"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 659,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "OnGaze",
														children: "OnGazeFocus"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 660,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "OnProximity",
														children: "OnProximity"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 661,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "OnTimer5s",
														children: "OnTimer5s"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 662,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 645,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 643,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ _jsxDEV("div", {
											className: "flex items-center justify-between gap-1 text-[11px]",
											children: [/* @__PURE__ */ _jsxDEV("span", {
												className: "text-emerald-400 font-mono shrink-0",
												children: "DO:"
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 667,
												columnNumber: 21
											}, this), /* @__PURE__ */ _jsxDEV("select", {
												value: node.action,
												onPointerDown: (e) => e.stopPropagation(),
												onChange: (e) => setLogicNodes((prev) => prev.map((r) => r.id === node.id ? {
													...r,
													action: e.target.value
												} : r)),
												className: "w-36 px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-emerald-300 font-mono",
												children: [
													/* @__PURE__ */ _jsxDEV("option", {
														value: "AwardPoints100",
														children: "AwardPoints100"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 682,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "ToggleTurboSpin",
														children: "ToggleTurboSpin"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 683,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "TeleportToCenter",
														children: "TeleportToCenter"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 684,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "PulseEmissive",
														children: "PulseEmissive"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 685,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ _jsxDEV("option", {
														value: "UnlockAchievement",
														children: "UnlockAchievement"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 686,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 668,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 666,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 613,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ _jsxDEV("div", {
									className: "pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400",
									children: [/* @__PURE__ */ _jsxDEV("span", { children: [
										"IN: ",
										(node.dependsOnIds || []).length,
										" ",
										(node.dependsOnIds || []).length > 0 ? lang === "pl" ? "(Zależny)" : "(Chained)" : lang === "pl" ? "(Główny)" : "(Root)"
									] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 693,
										columnNumber: 19
									}, this), /* @__PURE__ */ _jsxDEV("span", {
										className: "text-amber-400/90",
										children: lang === "pl" ? "Przeciągnij WYJ ● ➔" : "Drag OUT ● ➔"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 703,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 692,
									columnNumber: 17
								}, this)
							]
						}, node.id, true, {
							fileName: _jsxFileName,
							lineNumber: 470,
							columnNumber: 15
						}, this);
					})]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 358,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 345,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400",
				children: [/* @__PURE__ */ _jsxDEV("span", {
					className: "truncate",
					children: statusHint
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 715,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("span", {
					className: "font-mono text-slate-500",
					children: lang === "pl" ? "Kliknij × na linii, aby rozłączyć zależność" : "Click × on any wire to disconnect"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 716,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 714,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 288,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,eyJtYXBwaW5ncyI6IkFBQUEsT0FBTyxTQUFTLFFBQVEsZ0JBQWdCO0FBUXhDLFNBQ0UsTUFDQSxRQUVBLFdBQ0EsV0FDQSxXQUNBLE1BRUEsa0JBQ0s7OztBQWFQLE1BQU0sYUFBYTtBQUNuQixNQUFNLGNBQWM7QUFFcEIsT0FBTyxNQUFNLDBCQUFpRSxFQUM1RSxNQUNBLFlBQ0EsZUFDQSxTQUNBLGtCQUNBLG1CQUNBLHNCQUNBLDJCQUNJO0NBQ0osTUFBTSxZQUFZLE9BQThCLElBQUk7O0NBR3BELE1BQU0sQ0FBQyxnQkFBZ0IscUJBQXFCLFNBQXdCLElBQUk7Q0FDeEUsTUFBTSxDQUFDLFlBQVksaUJBQWlCLFNBQW1DO0VBQUUsR0FBRztFQUFHLEdBQUc7Q0FBRSxDQUFDOztDQUdyRixNQUFNLENBQUMsVUFBVSxlQUFlLFNBTXRCLElBQUk7Q0FFZCxNQUFNLENBQUMscUJBQXFCLDBCQUEwQixTQUF3QixJQUFJO0NBQ2xGLE1BQU0sQ0FBQyxZQUFZLGlCQUFpQixTQUNsQyxTQUFTLE9BQ0wsaUpBQ0EsbUhBQ047O0NBR0EsTUFBTSxtQkFBbUIsU0FBaUIsWUFBb0I7RUFDNUQsTUFBTSxPQUFPLFVBQVUsU0FBUyxzQkFBc0I7RUFDdEQsSUFBSSxDQUFDLE1BQU0sT0FBTztHQUFFLEdBQUc7R0FBRyxHQUFHO0VBQUU7RUFDL0IsT0FBTztHQUNMLEdBQUcsVUFBVSxLQUFLLFFBQVEsVUFBVSxTQUFTLGNBQWM7R0FDM0QsR0FBRyxVQUFVLEtBQUssT0FBTyxVQUFVLFNBQVMsYUFBYTtFQUMzRDtDQUNGOztDQUdBLE1BQU0sdUJBQXVCLFVBQXFCO0VBQ2hELElBQUksS0FBSyxVQUFVLEtBQUssTUFBTTtFQUM5QixJQUFJLEtBQUssVUFBVSxLQUFLLE1BQU0sY0FBYztDQUM5Qzs7Q0FHQSxNQUFNLHNCQUFzQixVQUFxQjtFQUMvQyxHQUFHLEtBQUssVUFBVSxLQUFLO0VBQ3ZCLElBQUksS0FBSyxVQUFVLEtBQUssTUFBTSxjQUFjO0NBQzlDOztDQUdBLE1BQU0sK0JBQ0osR0FDQSxTQUNHO0VBQ0gsRUFBRSxnQkFBZ0I7RUFDbEIsTUFBTSxTQUFTLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxPQUFPO0VBQ25ELGtCQUFrQixLQUFLLEVBQUU7RUFDekIsY0FBYztHQUNaLEdBQUcsT0FBTyxLQUFLLEtBQUssVUFBVSxLQUFLO0dBQ25DLEdBQUcsT0FBTyxLQUFLLEtBQUssVUFBVSxLQUFLO0VBQ3JDLENBQUM7Q0FDSDs7Q0FHQSxNQUFNLHVCQUNKLEdBQ0EsZUFDRztFQUNILEVBQUUsZ0JBQWdCO0VBQ2xCLEVBQUUsZUFBZTtFQUNqQixNQUFNLE9BQU8sb0JBQW9CLFVBQVU7RUFDM0MsTUFBTSxTQUFTLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxPQUFPO0VBQ25ELFlBQVk7R0FDVixZQUFZLFdBQVc7R0FDdkIsUUFBUSxLQUFLO0dBQ2IsUUFBUSxLQUFLO0dBQ2IsT0FBTyxPQUFPO0dBQ2QsT0FBTyxPQUFPO0VBQ2hCLENBQUM7Q0FDSDs7Q0FHQSxNQUFNLDJCQUEyQixNQUEwQjtFQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsVUFBVTtFQUNsQyxNQUFNLFNBQVMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLE9BQU87RUFFbkQsSUFBSSxnQkFBZ0I7R0FDbEIsTUFBTSxRQUFRLEtBQUssSUFBSSxJQUFJLEtBQUssSUFBSSxNQUFNLEtBQUssTUFBTSxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztHQUM5RSxNQUFNLFFBQVEsS0FBSyxJQUFJLElBQUksS0FBSyxJQUFJLEtBQUssS0FBSyxNQUFNLE9BQU8sSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDO0dBQzdFLGVBQWUsU0FDYixLQUFLLEtBQUssTUFDUixFQUFFLE9BQU8saUJBQWlCO0lBQUUsR0FBRztJQUFHLFVBQVU7S0FBRSxHQUFHO0tBQU8sR0FBRztJQUFNO0dBQUUsSUFBSSxDQUN6RSxDQUNGO0VBQ0Y7RUFFQSxJQUFJLFVBQVU7R0FDWixhQUFhLFNBQ1gsT0FBTztJQUFFLEdBQUc7SUFBTSxPQUFPLE9BQU87SUFBRyxPQUFPLE9BQU87R0FBRSxJQUFJLElBQ3pEO0VBQ0Y7Q0FDRjs7Q0FHQSxNQUFNLDBCQUEwQixpQkFBeUI7RUFDdkQsSUFBSSxDQUFDLFVBQVU7RUFDZixNQUFNLEVBQUUsZUFBZTtFQUN2QixJQUFJLGVBQWUsY0FBYztHQUMvQixZQUFZLElBQUk7R0FDaEI7RUFDRjtFQUVBLGVBQWUsU0FDYixLQUFLLEtBQUssTUFBTTtHQUNkLElBQUksRUFBRSxPQUFPLGNBQWMsT0FBTztHQUNsQyxNQUFNLGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQztHQUN4QyxJQUFJLGFBQWEsU0FBUyxVQUFVLEdBQUcsT0FBTztHQUM5QyxPQUFPO0lBQ0wsR0FBRztJQUNILGNBQWMsQ0FBQyxHQUFHLGNBQWMsVUFBVTtHQUM1QztFQUNGLENBQUMsQ0FDSDtFQUVBLE1BQU0sV0FBVyxXQUFXLE1BQU0sTUFBTSxFQUFFLE9BQU8sVUFBVTtFQUMzRCxNQUFNLFNBQVMsV0FBVyxNQUFNLE1BQU0sRUFBRSxPQUFPLFlBQVk7RUFDM0QsY0FDRSxTQUFTLE9BQ0wseUJBQXlCLFVBQVUsUUFBUSxXQUFXLE9BQU8sUUFBUSxRQUFRLGFBQWEsS0FDMUYsMEJBQTBCLFVBQVUsUUFBUSxXQUFXLE9BQU8sUUFBUSxRQUFRLGFBQWEsRUFDakc7RUFDQSxZQUFZLElBQUk7RUFDaEIsdUJBQXVCLElBQUk7Q0FDN0I7Q0FFQSxNQUFNLDhCQUE4QjtFQUNsQyxJQUFJLFlBQVkscUJBQXFCO0dBQ25DLHVCQUF1QixtQkFBbUI7RUFDNUM7RUFDQSxrQkFBa0IsSUFBSTtFQUN0QixZQUFZLElBQUk7RUFDaEIsdUJBQXVCLElBQUk7Q0FDN0I7O0NBR0EsTUFBTSwwQkFBMEIsUUFBZ0IsU0FBaUI7RUFDL0QsZUFBZSxTQUNiLEtBQUssS0FBSyxNQUNSLEVBQUUsT0FBTyxPQUNMO0dBQ0UsR0FBRztHQUNILGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFDLENBQUUsUUFBUSxPQUFPLE9BQU8sTUFBTTtFQUNuRSxJQUNBLENBQ04sQ0FDRjtFQUNBLGNBQ0UsU0FBUyxPQUNMLG1EQUNBLHdDQUNOO0NBQ0Y7O0NBR0EsTUFBTSxzQkFBc0I7RUFDMUIsTUFBTSxNQUFNLFdBQVc7RUFDdkIsTUFBTSxNQUFNLE1BQU07RUFDbEIsTUFBTSxNQUFNLEtBQUssTUFBTSxNQUFNLENBQUM7RUFDOUIsTUFBTSxRQUFRLFFBQVEsS0FBSyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7RUFDNUMsTUFBTSxhQUFhLFdBQVcsU0FBUyxJQUFJLFdBQVcsV0FBVyxTQUFTLEVBQUUsQ0FBQyxLQUFLO0VBRWxGLE1BQU0sVUFBcUI7R0FDekIsSUFBSTtHQUNKLE1BQ0UsU0FBUyxPQUNMLFVBQVUsTUFBTSxNQUNoQixlQUFlLE1BQU07R0FDM0IsZ0JBQWdCLG9CQUFvQjtHQUNwQyxPQUFPLE1BQU0sTUFBTSxJQUFJLGdCQUFnQjtHQUN2QyxRQUFRLE1BQU0sTUFBTSxJQUFJLG1CQUFtQjtHQUMzQyxTQUFTO0dBQ1QsVUFBVTtJQUNSLEdBQUcsS0FBSyxNQUFNO0lBQ2QsR0FBRyxLQUFLLE1BQU07R0FDaEI7R0FDQSxjQUFjLGFBQWEsQ0FBQyxVQUFVLElBQUksQ0FBQztFQUM3QztFQUVBLGVBQWUsU0FBUyxDQUFDLEdBQUcsTUFBTSxPQUFPLENBQUM7RUFDMUMsY0FDRSxTQUFTLE9BQ0wsV0FBVyxRQUFRLEtBQUssNEVBQ3hCLFVBQVUsUUFBUSxLQUFLLCtEQUM3QjtDQUNGOztDQUdBLE1BQU0seUJBQXlCO0VBQzdCLGVBQWUsU0FDYixLQUFLLEtBQUssR0FBRyxRQUFRO0dBQ25CLE1BQU0sTUFBTSxNQUFNO0dBQ2xCLE1BQU0sTUFBTSxLQUFLLE1BQU0sTUFBTSxDQUFDO0dBQzlCLE9BQU87SUFDTCxHQUFHO0lBQ0gsVUFBVTtLQUNSLEdBQUcsS0FBSyxNQUFNO0tBQ2QsR0FBRyxLQUFLLE1BQU07SUFDaEI7R0FDRjtFQUNGLENBQUMsQ0FDSDtDQUNGOztDQUdBLE1BQU0sbUJBQW1CLElBQVksSUFBWSxJQUFZLE9BQWU7RUFDMUUsTUFBTSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssSUFBSSxLQUFLLEVBQUUsSUFBSSxFQUFHO0VBQy9DLE9BQU8sS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHO0NBQ3RFOztDQUdBLE1BQU0sUUFPQSxDQUFDO0NBRVAsV0FBVyxTQUFTLFdBQVc7RUFDN0IsQ0FBQyxPQUFPLGdCQUFnQixDQUFDLEVBQUMsQ0FBRSxTQUFTLFdBQVc7R0FDOUMsTUFBTSxXQUFXLFdBQVcsTUFBTSxNQUFNLEVBQUUsT0FBTyxNQUFNO0dBQ3ZELElBQUksVUFBVTtJQUNaLE1BQU0sUUFBUSxvQkFBb0IsUUFBUTtJQUMxQyxNQUFNLE9BQU8sbUJBQW1CLE1BQU07SUFDdEMsTUFBTSxLQUFLO0tBQ1Q7S0FDQTtLQUNBLElBQUksTUFBTTtLQUNWLElBQUksTUFBTTtLQUNWLElBQUksS0FBSztLQUNULElBQUksS0FBSztJQUNYLENBQUM7R0FDSDtFQUNGLENBQUM7Q0FDSCxDQUFDO0NBRUQsT0FDRSx3QkFBQyxPQUFEO0VBQUssV0FBVTtZQUFmO0dBRUUsd0JBQUMsT0FBRDtJQUFLLFdBQVU7Y0FBZixDQUNFLHdCQUFDLE9BQUQ7S0FBSyxXQUFVO2VBQWYsQ0FDRSx3QkFBQyxRQUFEO01BQU0sV0FBVTtnQkFBaEIsQ0FDRSx3QkFBQyxXQUFELEVBQVcsV0FBVSx5QkFBMEI7Ozs7Z0JBQzlDLFNBQVMsT0FDTiwrREFDQSxvREFDQTs7Ozs7ZUFDTix3QkFBQyxRQUFEO01BQU0sV0FBVTtnQkFBaEI7T0FBd0U7T0FDbkUsV0FBVztPQUFPO09BQUUsU0FBUyxPQUFPLFdBQVc7T0FBUTtPQUFJLE1BQU07T0FBUTtPQUMzRSxTQUFTLE9BQU8sYUFBYTtNQUMxQjs7Ozs7YUFDSDs7Ozs7Y0FFTCx3QkFBQyxPQUFEO0tBQUssV0FBVTtlQUFmO01BQ0Usd0JBQUMsVUFBRDtPQUNFLE1BQUs7T0FDTCxTQUFTO09BQ1QsV0FBVTtpQkFIWixDQUtFLHdCQUFDLE1BQUQsRUFBTSxXQUFVLGNBQWU7Ozs7aUJBQzlCLFNBQVMsT0FBTyx1QkFBdUIsZ0JBQ2xDOzs7Ozs7TUFFUix3QkFBQyxVQUFEO09BQ0UsTUFBSztPQUNMLFNBQVM7T0FDVCxXQUFVO09BQ1YsT0FBTyxTQUFTLE9BQU8sdUNBQXVDO2lCQUpoRSxDQU1FLHdCQUFDLFlBQUQsRUFBWSxXQUFVLDJCQUE0Qjs7OztpQkFDakQsU0FBUyxPQUFPLG9CQUFvQixhQUMvQjs7Ozs7O01BRVIsd0JBQUMsVUFBRDtPQUNFLE1BQUs7T0FDTCxlQUFlLHFCQUFxQixDQUFDLGlCQUFpQjtPQUN0RCxXQUFVO2lCQUVULG9CQUNDLGdEQUNFLHdCQUFDLFdBQUQsRUFBVyxXQUFVLGNBQWU7Ozs7aUJBQ25DLFNBQVMsT0FBTyxvQkFBb0IsV0FDckM7Ozs7a0JBRUYsZ0RBQ0Usd0JBQUMsV0FBRCxFQUFXLFdBQVUsY0FBZTs7OztpQkFDbkMsU0FBUyxPQUFPLGlDQUFpQyxxQkFDbEQ7Ozs7O01BRUU7Ozs7O0tBQ0w7Ozs7O1lBQ0Y7Ozs7OztHQUdMLHdCQUFDLE9BQUQ7SUFDRSxLQUFLO0lBQ0wsZUFBZTtJQUNmLGFBQWE7SUFDYixXQUFXLGlGQUNULG9CQUFvQix3Q0FBd0M7SUFFOUQsT0FBTztLQUNMLGlCQUNFO0tBQ0YsZ0JBQWdCO0lBQ2xCO2NBRUEsd0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZixDQUVFLHdCQUFDLE9BQUQ7TUFBSyxXQUFVO2dCQUFmO09BQ0Usd0JBQUMsUUFBRCxhQUNFLHdCQUFDLGtCQUFEO1FBQWdCLElBQUc7UUFBVyxJQUFHO1FBQUssSUFBRztRQUFLLElBQUc7UUFBTyxJQUFHO2tCQUEzRCxDQUNFLHdCQUFDLFFBQUQ7U0FBTSxRQUFPO1NBQUssV0FBVTtRQUFXOzs7O2tCQUN2Qyx3QkFBQyxRQUFEO1NBQU0sUUFBTztTQUFPLFdBQVU7UUFBVzs7OztnQkFDM0I7Ozs7O2lCQUNoQix3QkFBQyxVQUFEO1FBQ0UsSUFBRztRQUNILFNBQVE7UUFDUixNQUFLO1FBQ0wsTUFBSztRQUNMLGFBQVk7UUFDWixjQUFhO1FBQ2IsUUFBTztrQkFFUCx3QkFBQyxRQUFEO1NBQU0sR0FBRTtTQUF1QixNQUFLO1FBQVc7Ozs7O09BQ3pDOzs7O2VBQ0o7Ozs7O09BR0wsTUFBTSxLQUFLLFNBQVM7UUFDbkIsTUFBTSxXQUFXLGdCQUFnQixLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssSUFBSSxLQUFLLEVBQUU7UUFDbkUsTUFBTSxRQUFRLEtBQUssS0FBSyxLQUFLLE1BQU07UUFDbkMsTUFBTSxRQUFRLEtBQUssS0FBSyxLQUFLLE1BQU07UUFDbkMsTUFBTSxzQkFDSixLQUFLLFNBQVMsbUJBQ2QsS0FBSyxJQUFJLElBQUksS0FBSyxTQUFTLGtCQUFrQjtRQUUvQyxPQUNFLHdCQUFDLEtBQUQ7U0FBa0QsV0FBVTttQkFBNUQ7VUFFRSx3QkFBQyxRQUFEO1dBQ0UsR0FBRztXQUNILE1BQUs7V0FDTCxRQUFPO1dBQ1AsYUFBYTtXQUNiLFdBQVU7V0FDVixlQUFlLHVCQUF1QixLQUFLLFNBQVMsSUFBSSxLQUFLLE9BQU8sRUFBRTtVQUN2RTs7Ozs7VUFFRCx3QkFBQyxRQUFEO1dBQ0UsR0FBRztXQUNILE1BQUs7V0FDTCxRQUFRLHNCQUFzQixZQUFZO1dBQzFDLGFBQWEsc0JBQXNCLE1BQU07V0FDekMsV0FBVTtVQUNYOzs7OztVQUVELHdCQUFDLFFBQUQ7V0FDRSxHQUFHO1dBQ0gsTUFBSztXQUNMLFFBQU87V0FDUCxhQUFhO1dBQ2IsaUJBQWdCO1dBQ2hCLFNBQVM7VUFDVjs7Ozs7VUFFRCx3QkFBQyxLQUFEO1dBQ0UsV0FBVyxhQUFhLEtBQUssSUFBSSxLQUFLO1dBQ3RDLFdBQVU7V0FDVixlQUFlLHVCQUF1QixLQUFLLFNBQVMsSUFBSSxLQUFLLE9BQU8sRUFBRTtxQkFIeEUsQ0FLRSx3QkFBQyxVQUFEO1lBQ0UsR0FBRztZQUNILE1BQUs7WUFDTCxRQUFPO1lBQ1AsYUFBYTtZQUNiLFdBQVU7V0FDWDs7OztxQkFDRCx3QkFBQyxRQUFEO1lBQ0UsWUFBVztZQUNYLElBQUc7WUFDSCxNQUFLO1lBQ0wsVUFBUztZQUNULFlBQVc7c0JBQ1o7V0FFSzs7OzttQkFDTDs7Ozs7O1NBQ0Y7V0FsREssR0FBRyxLQUFLLFNBQVMsR0FBRyxJQUFJLEtBQUssT0FBTzs7OztlQWtEekM7T0FFUCxDQUFDO09BR0EsWUFDQyx3QkFBQyxRQUFEO1FBQ0UsR0FBRyxnQkFDRCxTQUFTLFFBQ1QsU0FBUyxRQUNULFNBQVMsT0FDVCxTQUFTLEtBQ1g7UUFDQSxNQUFLO1FBQ0wsUUFBTztRQUNQLGFBQWE7UUFDYixpQkFBZ0I7UUFDaEIsV0FBVTtPQUNYOzs7OztNQUVBOzs7OztlQUdKLFdBQVcsS0FBSyxNQUFNLFVBQVU7TUFDL0IsTUFBTSxPQUFPLEtBQUssVUFBVSxLQUFLLEtBQU0sUUFBUSxJQUFLO01BQ3BELE1BQU0sT0FBTyxLQUFLLFVBQVUsS0FBSyxLQUFLLEtBQUssTUFBTSxRQUFRLENBQUMsSUFBSTtNQUM5RCxNQUFNLGtCQUFrQix3QkFBd0IsS0FBSztNQUNyRCxNQUFNLGtCQUNKLEtBQUssbUJBQW1CLEtBQUssSUFBSSxJQUFJLEtBQUssa0JBQWtCO01BRTlELE9BQ0Usd0JBQUMsT0FBRDtPQUVFLHNCQUFzQjtRQUNwQixJQUFJLFlBQVksU0FBUyxlQUFlLEtBQUssSUFBSTtTQUMvQyx1QkFBdUIsS0FBSyxFQUFFO1FBQ2hDO09BQ0Y7T0FDQSxzQkFBc0I7UUFDcEIsSUFBSSx3QkFBd0IsS0FBSyxJQUFJO1NBQ25DLHVCQUF1QixJQUFJO1FBQzdCO09BQ0Y7T0FDQSxtQkFBbUI7UUFDakIsSUFBSSxZQUFZLFNBQVMsZUFBZSxLQUFLLElBQUk7U0FDL0MsdUJBQXVCLEtBQUssRUFBRTtRQUNoQztPQUNGO09BQ0EsT0FBTztRQUNMLE9BQU8sR0FBRyxXQUFXO1FBQ3JCLFFBQVEsR0FBRyxZQUFZO1FBQ3ZCLFdBQVcsZUFBZSxLQUFLLE1BQU0sS0FBSztPQUM1QztPQUNBLFdBQVcsc0lBQ1Qsa0JBQ0ksa0RBQ0Esa0JBQ0EsMENBQ0EsS0FBSyxVQUNMLCtDQUNBO2lCQTdCUjtRQWlDRSx3QkFBQyxPQUFEO1NBQ0UsY0FBYyxNQUFNO1VBQ2xCLEVBQUUsZ0JBQWdCO1VBQ2xCLElBQUksWUFBWSxTQUFTLGVBQWUsS0FBSyxJQUFJO1dBQy9DLHVCQUF1QixLQUFLLEVBQUU7VUFDaEM7U0FDRjtTQUNBLE9BQ0UsU0FBUyxPQUNMLDREQUNBO1NBRU4sV0FBVyxrSkFDVCxrQkFDSSx1Q0FDQyxLQUFLLGdCQUFnQixDQUFDLEVBQUMsQ0FBRSxTQUFTLElBQ25DLGdDQUNBO21CQUdOLHdCQUFDLFFBQUQsRUFBTSxXQUFVLGdDQUFpQzs7Ozs7UUFDOUM7Ozs7O1FBR0wsd0JBQUMsT0FBRDtTQUNFLGdCQUFnQixNQUFNLG9CQUFvQixHQUFHLElBQUk7U0FDakQsT0FDRSxTQUFTLE9BQ0wsMERBQ0E7U0FFTixXQUFVO21CQUVWLHdCQUFDLFFBQUQsRUFBTSxXQUFVLG9DQUFxQzs7Ozs7UUFDbEQ7Ozs7O1FBR0wsd0JBQUMsT0FBRDtTQUNFLGdCQUFnQixNQUFNLDRCQUE0QixHQUFHLElBQUk7U0FDekQsV0FBVTttQkFGWixDQUlFLHdCQUFDLE9BQUQ7VUFBSyxXQUFVO29CQUFmLENBQ0Usd0JBQUMsU0FBRDtXQUNFLE1BQUs7V0FDTCxTQUFTLEtBQUs7V0FDZCxnQkFBZ0IsTUFBTSxFQUFFLGdCQUFnQjtXQUN4QyxnQkFDRSxlQUFlLFNBQ2IsS0FBSyxLQUFLLE1BQ1IsRUFBRSxPQUFPLEtBQUssS0FBSztZQUFFLEdBQUc7WUFBRyxTQUFTLENBQUMsRUFBRTtXQUFRLElBQUksQ0FDckQsQ0FDRjtXQUVGLFdBQVU7VUFDWDs7OztvQkFDRCx3QkFBQyxTQUFEO1dBQ0UsTUFBSztXQUNMLE9BQU8sS0FBSztXQUNaLGdCQUFnQixNQUFNLEVBQUUsZ0JBQWdCO1dBQ3hDLFdBQVcsTUFDVCxlQUFlLFNBQ2IsS0FBSyxLQUFLLE1BQ1IsRUFBRSxPQUFPLEtBQUssS0FBSztZQUFFLEdBQUc7WUFBRyxNQUFNLEVBQUUsT0FBTztXQUFNLElBQUksQ0FDdEQsQ0FDRjtXQUVGLFdBQVU7VUFDWDs7OztrQkFDRTs7Ozs7bUJBRUwsd0JBQUMsT0FBRDtVQUFLLFdBQVU7b0JBQWYsQ0FDRyx3QkFDQyx3QkFBQyxVQUFEO1dBQ0UsTUFBSztXQUNMLGdCQUFnQixNQUFNLEVBQUUsZ0JBQWdCO1dBQ3hDLGVBQWUscUJBQXFCLEtBQUssRUFBRTtXQUMzQyxPQUNFLFNBQVMsT0FDTCxrQ0FDQTtXQUVOLFdBQVU7cUJBRVYsd0JBQUMsTUFBRCxFQUFNLFdBQVUsVUFBVzs7Ozs7VUFDckI7Ozs7b0JBRVYsd0JBQUMsVUFBRDtXQUNFLE1BQUs7V0FDTCxnQkFBZ0IsTUFBTSxFQUFFLGdCQUFnQjtXQUN4QyxlQUNFLGVBQWUsU0FDYixLQUNHLFFBQVEsTUFBTSxFQUFFLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FDL0IsS0FBSyxPQUFPO1lBQ1gsR0FBRztZQUNILGVBQWUsRUFBRSxnQkFBZ0IsQ0FBQyxFQUFDLENBQUUsUUFDbEMsTUFBTSxNQUFNLEtBQUssRUFDcEI7V0FDRixFQUFFLENBQ047V0FFRixXQUFVO1dBQ1YsT0FBTyxTQUFTLE9BQU8sZUFBZTtxQkFFdEMsd0JBQUMsUUFBRCxFQUFRLFdBQVUsVUFBVzs7Ozs7VUFDdkI7Ozs7a0JBQ0w7Ozs7O2lCQUNGOzs7Ozs7UUFHTCx3QkFBQyxPQUFEO1NBQUssV0FBVTttQkFBZjtVQUNFLHdCQUFDLE9BQUQ7V0FBSyxXQUFVO3FCQUFmLENBQ0Usd0JBQUMsUUFBRDtZQUFNLFdBQVU7c0JBQ2IsU0FBUyxPQUFPLFlBQVk7V0FDekI7Ozs7cUJBQ04sd0JBQUMsVUFBRDtZQUNFLE9BQU8sS0FBSztZQUNaLGdCQUFnQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hDLFdBQVcsTUFDVCxlQUFlLFNBQ2IsS0FBSyxLQUFLLE1BQ1IsRUFBRSxPQUFPLEtBQUssS0FDVjthQUFFLEdBQUc7YUFBRyxnQkFBZ0IsRUFBRSxPQUFPO1lBQU0sSUFDdkMsQ0FDTixDQUNGO1lBRUYsV0FBVTtzQkFaWixDQWNFLHdCQUFDLFVBQUQ7YUFBUSxPQUFNO3VCQUNYLFNBQVMsT0FBTyw0QkFBNEI7WUFDdkM7Ozs7c0JBQ1AsUUFBUSxLQUFLLE1BQ1osd0JBQUMsVUFBRDthQUFtQixPQUFPLEVBQUU7dUJBQ3pCLEVBQUU7WUFDRyxHQUZLLEVBQUU7Ozs7bUJBRVAsQ0FDVCxDQUNLOzs7OzttQkFDTDs7Ozs7O1VBRUwsd0JBQUMsT0FBRDtXQUFLLFdBQVU7cUJBQWYsQ0FDRSx3QkFBQyxRQUFEO1lBQU0sV0FBVTtzQkFBb0M7V0FBUzs7OztxQkFDN0Qsd0JBQUMsVUFBRDtZQUNFLE9BQU8sS0FBSztZQUNaLGdCQUFnQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hDLFdBQVcsTUFDVCxlQUFlLFNBQ2IsS0FBSyxLQUFLLE1BQ1IsRUFBRSxPQUFPLEtBQUssS0FDVjthQUFFLEdBQUc7YUFBRyxPQUFPLEVBQUUsT0FBTztZQUFzQixJQUM5QyxDQUNOLENBQ0Y7WUFFRixXQUFVO3NCQVpaO2FBY0Usd0JBQUMsVUFBRDtjQUFRLE9BQU07d0JBQWM7YUFBbUI7Ozs7O2FBQy9DLHdCQUFDLFVBQUQ7Y0FBUSxPQUFNO3dCQUFTO2FBQW1COzs7OzthQUMxQyx3QkFBQyxVQUFEO2NBQVEsT0FBTTt3QkFBYzthQUFtQjs7Ozs7YUFDL0Msd0JBQUMsVUFBRDtjQUFRLE9BQU07d0JBQVk7YUFBaUI7Ozs7O1lBQ3JDOzs7OzttQkFDTDs7Ozs7O1VBRUwsd0JBQUMsT0FBRDtXQUFLLFdBQVU7cUJBQWYsQ0FDRSx3QkFBQyxRQUFEO1lBQU0sV0FBVTtzQkFBc0M7V0FBUzs7OztxQkFDL0Qsd0JBQUMsVUFBRDtZQUNFLE9BQU8sS0FBSztZQUNaLGdCQUFnQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hDLFdBQVcsTUFDVCxlQUFlLFNBQ2IsS0FBSyxLQUFLLE1BQ1IsRUFBRSxPQUFPLEtBQUssS0FDVjthQUFFLEdBQUc7YUFBRyxRQUFRLEVBQUUsT0FBTztZQUF1QixJQUNoRCxDQUNOLENBQ0Y7WUFFRixXQUFVO3NCQVpaO2FBY0Usd0JBQUMsVUFBRDtjQUFRLE9BQU07d0JBQWlCO2FBQXNCOzs7OzthQUNyRCx3QkFBQyxVQUFEO2NBQVEsT0FBTTt3QkFBa0I7YUFBdUI7Ozs7O2FBQ3ZELHdCQUFDLFVBQUQ7Y0FBUSxPQUFNO3dCQUFtQjthQUF3Qjs7Ozs7YUFDekQsd0JBQUMsVUFBRDtjQUFRLE9BQU07d0JBQWdCO2FBQXFCOzs7OzthQUNuRCx3QkFBQyxVQUFEO2NBQVEsT0FBTTt3QkFBb0I7YUFBeUI7Ozs7O1lBQ3JEOzs7OzttQkFDTDs7Ozs7O1NBQ0Y7Ozs7OztRQUdMLHdCQUFDLE9BQUQ7U0FBSyxXQUFVO21CQUFmLENBQ0Usd0JBQUMsUUFBRDtVQUFNO1dBQ0UsS0FBSyxnQkFBZ0IsQ0FBQyxFQUFDLENBQUU7VUFBUTtXQUNyQyxLQUFLLGdCQUFnQixDQUFDLEVBQUMsQ0FBRSxTQUFTLElBQ2hDLFNBQVMsT0FDUCxjQUNBLGNBQ0YsU0FBUyxPQUNULGFBQ0E7U0FDQTs7OzttQkFDTix3QkFBQyxRQUFEO1VBQU0sV0FBVTtvQkFDYixTQUFTLE9BQU8sd0JBQXdCO1NBQ3JDOzs7O2lCQUNIOzs7Ozs7T0FDRjtTQTVPRSxLQUFLOzs7O2FBNE9QO0tBRVQsQ0FBQyxDQUNFOzs7Ozs7R0FDRjs7Ozs7R0FHTCx3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmLENBQ0Usd0JBQUMsUUFBRDtLQUFNLFdBQVU7ZUFBWTtJQUFpQjs7OztjQUM3Qyx3QkFBQyxRQUFEO0tBQU0sV0FBVTtlQUNiLFNBQVMsT0FDTixnREFDQTtJQUNBOzs7O1lBQ0g7Ozs7OztFQUNGOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJWaXN1YWxMb2dpY0dyYXBoRWRpdG9yLnRzeCJdLCJ2ZXJzaW9uIjozLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7XG4gIExhbmd1YWdlLFxuICBMb2dpY05vZGUsXG4gIFNjZW5lT2JqZWN0LFxuICBUcmlnZ2VyQWN0aW9uLFxuICBUcmlnZ2VyRXZlbnQsXG59IGZyb20gJy4uL3R5cGVzL3ZyJztcbmltcG9ydCB7XG4gIFBsdXMsXG4gIFRyYXNoMixcbiAgWmFwLFxuICBNYXhpbWl6ZTIsXG4gIE1pbmltaXplMixcbiAgR2l0QnJhbmNoLFxuICBQbGF5LFxuICBMaW5rMk9mZixcbiAgTGF5b3V0R3JpZCxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIFZpc3VhbExvZ2ljR3JhcGhFZGl0b3JQcm9wcyB7XG4gIGxhbmc6IExhbmd1YWdlO1xuICBsb2dpY05vZGVzOiBMb2dpY05vZGVbXTtcbiAgc2V0TG9naWNOb2RlczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248TG9naWNOb2RlW10+PjtcbiAgb2JqZWN0czogU2NlbmVPYmplY3RbXTtcbiAgc2VsZWN0ZWRPYmplY3RJZDogc3RyaW5nIHwgbnVsbDtcbiAgaXNFeHBhbmRlZFN1YlZpZXc6IGJvb2xlYW47XG4gIHNldElzRXhwYW5kZWRTdWJWaWV3OiAoZXhwYW5kZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIG9uVHJpZ2dlck5vZGVDYXNjYWRlPzogKG5vZGVJZDogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5jb25zdCBOT0RFX1dJRFRIID0gMjQ4O1xuY29uc3QgTk9ERV9IRUlHSFQgPSAxNTI7XG5cbmV4cG9ydCBjb25zdCBWaXN1YWxMb2dpY0dyYXBoRWRpdG9yOiBSZWFjdC5GQzxWaXN1YWxMb2dpY0dyYXBoRWRpdG9yUHJvcHM+ID0gKHtcbiAgbGFuZyxcbiAgbG9naWNOb2RlcyxcbiAgc2V0TG9naWNOb2RlcyxcbiAgb2JqZWN0cyxcbiAgc2VsZWN0ZWRPYmplY3RJZCxcbiAgaXNFeHBhbmRlZFN1YlZpZXcsXG4gIHNldElzRXhwYW5kZWRTdWJWaWV3LFxuICBvblRyaWdnZXJOb2RlQ2FzY2FkZSxcbn0pID0+IHtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gRHJhZ2dpbmcgYSBub2RlIGNhcmQgcG9zaXRpb25cbiAgY29uc3QgW2RyYWdnaW5nTm9kZUlkLCBzZXREcmFnZ2luZ05vZGVJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2RyYWdPZmZzZXQsIHNldERyYWdPZmZzZXRdID0gdXNlU3RhdGU8eyB4OiBudW1iZXI7IHk6IG51bWJlciB9Pih7IHg6IDAsIHk6IDAgfSk7XG5cbiAgLy8gRHJhZ2dpbmcgYSBuZXcgZGVwZW5kZW5jeSB3aXJlIGJldHdlZW4gbm9kZXNcbiAgY29uc3QgW3dpcmVEcmFnLCBzZXRXaXJlRHJhZ10gPSB1c2VTdGF0ZTx7XG4gICAgZnJvbU5vZGVJZDogc3RyaW5nO1xuICAgIHN0YXJ0WDogbnVtYmVyO1xuICAgIHN0YXJ0WTogbnVtYmVyO1xuICAgIGN1cnJYOiBudW1iZXI7XG4gICAgY3Vyclk6IG51bWJlcjtcbiAgfSB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IFtob3ZlcmVkVGFyZ2V0Tm9kZUlkLCBzZXRIb3ZlcmVkVGFyZ2V0Tm9kZUlkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc3RhdHVzSGludCwgc2V0U3RhdHVzSGludF0gPSB1c2VTdGF0ZTxzdHJpbmc+KFxuICAgIGxhbmcgPT09ICdwbCdcbiAgICAgID8gJ1ByemVjacSFZ25paiBsaW5pxJkgeiBwb3J0dSB3eWrFm2Npb3dlZ28gKFdZSiDil48pIGplZG5lZ28gd8SZesWCYSBkbyBwb3J0dSB3ZWrFm2Npb3dlZ28gKOKXjyBXRUopIGtvbGVqbmVnbyB3xJl6xYJhLCBhYnkgdXR3b3J6ecSHIHphbGXFvG5vxZvEhyB3eXp3YWxhY3phLidcbiAgICAgIDogJ0RyYWcgYSB3aXJlIGZyb20gYSBub2RlIE91dHB1dCBwb3J0IChPVVQg4pePKSB0byBhbm90aGVyIG5vZGUgSW5wdXQgcG9ydCAo4pePIElOKSB0byBsaW5rIGV2ZW50LXRyaWdnZXIgZGVwZW5kZW5jaWVzLidcbiAgKTtcblxuICAvLyBDb252ZXJ0IGNsaWVudCBwb2ludGVyIGNvb3JkaW5hdGVzIHRvIGNhbnZhcy1yZWxhdGl2ZSBjb29yZGluYXRlc1xuICBjb25zdCBnZXRDYW52YXNDb29yZHMgPSAoY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCByZWN0ID0gY2FudmFzUmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICghcmVjdCkgcmV0dXJuIHsgeDogMCwgeTogMCB9O1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjbGllbnRYIC0gcmVjdC5sZWZ0ICsgKGNhbnZhc1JlZi5jdXJyZW50Py5zY3JvbGxMZWZ0IHx8IDApLFxuICAgICAgeTogY2xpZW50WSAtIHJlY3QudG9wICsgKGNhbnZhc1JlZi5jdXJyZW50Py5zY3JvbGxUb3AgfHwgMCksXG4gICAgfTtcbiAgfTtcblxuICAvLyBPdXRwdXQgcG9ydCBjb29yZGluYXRlcyAoUmlnaHQgZWRnZSBjZW50ZXIgb2Ygbm9kZSBjYXJkKVxuICBjb25zdCBnZXRPdXRwdXRQb3J0Q29vcmRzID0gKG5vZGU6IExvZ2ljTm9kZSkgPT4gKHtcbiAgICB4OiAobm9kZS5wb3NpdGlvbj8ueCA/PyA0MCkgKyBOT0RFX1dJRFRILFxuICAgIHk6IChub2RlLnBvc2l0aW9uPy55ID8/IDMwKSArIE5PREVfSEVJR0hUIC8gMixcbiAgfSk7XG5cbiAgLy8gSW5wdXQgcG9ydCBjb29yZGluYXRlcyAoTGVmdCBlZGdlIGNlbnRlciBvZiBub2RlIGNhcmQpXG4gIGNvbnN0IGdldElucHV0UG9ydENvb3JkcyA9IChub2RlOiBMb2dpY05vZGUpID0+ICh7XG4gICAgeDogbm9kZS5wb3NpdGlvbj8ueCA/PyA0MCxcbiAgICB5OiAobm9kZS5wb3NpdGlvbj8ueSA/PyAzMCkgKyBOT0RFX0hFSUdIVCAvIDIsXG4gIH0pO1xuXG4gIC8vIFN0YXJ0IGRyYWdnaW5nIGEgbm9kZSBjYXJkIHRvIHJlcG9zaXRpb24gaXRcbiAgY29uc3QgaGFuZGxlTm9kZUhlYWRlclBvaW50ZXJEb3duID0gKFxuICAgIGU6IFJlYWN0LlBvaW50ZXJFdmVudCxcbiAgICBub2RlOiBMb2dpY05vZGVcbiAgKSA9PiB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBjb29yZHMgPSBnZXRDYW52YXNDb29yZHMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIHNldERyYWdnaW5nTm9kZUlkKG5vZGUuaWQpO1xuICAgIHNldERyYWdPZmZzZXQoe1xuICAgICAgeDogY29vcmRzLnggLSAobm9kZS5wb3NpdGlvbj8ueCA/PyA0MCksXG4gICAgICB5OiBjb29yZHMueSAtIChub2RlLnBvc2l0aW9uPy55ID8/IDMwKSxcbiAgICB9KTtcbiAgfTtcblxuICAvLyBTdGFydCBkcmFnZ2luZyBhIGNvbm5lY3Rpb24gbGluZSBmcm9tIGFuIE91dHB1dCBwb3J0XG4gIGNvbnN0IGhhbmRsZVN0YXJ0V2lyZURyYWcgPSAoXG4gICAgZTogUmVhY3QuUG9pbnRlckV2ZW50LFxuICAgIHNvdXJjZU5vZGU6IExvZ2ljTm9kZVxuICApID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBwb3J0ID0gZ2V0T3V0cHV0UG9ydENvb3Jkcyhzb3VyY2VOb2RlKTtcbiAgICBjb25zdCBjb29yZHMgPSBnZXRDYW52YXNDb29yZHMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIHNldFdpcmVEcmFnKHtcbiAgICAgIGZyb21Ob2RlSWQ6IHNvdXJjZU5vZGUuaWQsXG4gICAgICBzdGFydFg6IHBvcnQueCxcbiAgICAgIHN0YXJ0WTogcG9ydC55LFxuICAgICAgY3Vyclg6IGNvb3Jkcy54LFxuICAgICAgY3Vyclk6IGNvb3Jkcy55LFxuICAgIH0pO1xuICB9O1xuXG4gIC8vIFBvaW50ZXIgbW92ZSBhY3Jvc3MgdGhlIGdyYXBoIGNhbnZhc1xuICBjb25zdCBoYW5kbGVDYW52YXNQb2ludGVyTW92ZSA9IChlOiBSZWFjdC5Qb2ludGVyRXZlbnQpID0+IHtcbiAgICBpZiAoIWRyYWdnaW5nTm9kZUlkICYmICF3aXJlRHJhZykgcmV0dXJuO1xuICAgIGNvbnN0IGNvb3JkcyA9IGdldENhbnZhc0Nvb3JkcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XG5cbiAgICBpZiAoZHJhZ2dpbmdOb2RlSWQpIHtcbiAgICAgIGNvbnN0IG5leHRYID0gTWF0aC5tYXgoMTIsIE1hdGgubWluKDEzMDAsIE1hdGgucm91bmQoY29vcmRzLnggLSBkcmFnT2Zmc2V0LngpKSk7XG4gICAgICBjb25zdCBuZXh0WSA9IE1hdGgubWF4KDEyLCBNYXRoLm1pbig3MjAsIE1hdGgucm91bmQoY29vcmRzLnkgLSBkcmFnT2Zmc2V0LnkpKSk7XG4gICAgICBzZXRMb2dpY05vZGVzKChwcmV2KSA9PlxuICAgICAgICBwcmV2Lm1hcCgobikgPT5cbiAgICAgICAgICBuLmlkID09PSBkcmFnZ2luZ05vZGVJZCA/IHsgLi4ubiwgcG9zaXRpb246IHsgeDogbmV4dFgsIHk6IG5leHRZIH0gfSA6IG5cbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAod2lyZURyYWcpIHtcbiAgICAgIHNldFdpcmVEcmFnKChwcmV2KSA9PlxuICAgICAgICBwcmV2ID8geyAuLi5wcmV2LCBjdXJyWDogY29vcmRzLngsIGN1cnJZOiBjb29yZHMueSB9IDogbnVsbFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQ29tcGxldGUgd2lyZSBjb25uZWN0aW9uIG9udG8gYSB0YXJnZXQgbm9kZSdzIElucHV0IHBvcnQgb3IgY2FyZFxuICBjb25zdCBjb21wbGV0ZVdpcmVDb25uZWN0aW9uID0gKHRhcmdldE5vZGVJZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCF3aXJlRHJhZykgcmV0dXJuO1xuICAgIGNvbnN0IHsgZnJvbU5vZGVJZCB9ID0gd2lyZURyYWc7XG4gICAgaWYgKGZyb21Ob2RlSWQgPT09IHRhcmdldE5vZGVJZCkge1xuICAgICAgc2V0V2lyZURyYWcobnVsbCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0TG9naWNOb2RlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChuKSA9PiB7XG4gICAgICAgIGlmIChuLmlkICE9PSB0YXJnZXROb2RlSWQpIHJldHVybiBuO1xuICAgICAgICBjb25zdCBleGlzdGluZ0RlcHMgPSBuLmRlcGVuZHNPbklkcyB8fCBbXTtcbiAgICAgICAgaWYgKGV4aXN0aW5nRGVwcy5pbmNsdWRlcyhmcm9tTm9kZUlkKSkgcmV0dXJuIG47XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ubixcbiAgICAgICAgICBkZXBlbmRzT25JZHM6IFsuLi5leGlzdGluZ0RlcHMsIGZyb21Ob2RlSWRdLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgY29uc3QgZnJvbU5vZGUgPSBsb2dpY05vZGVzLmZpbmQoKG4pID0+IG4uaWQgPT09IGZyb21Ob2RlSWQpO1xuICAgIGNvbnN0IHRvTm9kZSA9IGxvZ2ljTm9kZXMuZmluZCgobikgPT4gbi5pZCA9PT0gdGFyZ2V0Tm9kZUlkKTtcbiAgICBzZXRTdGF0dXNIaW50KFxuICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICA/IGBQb8WCxIVjem9ubyB6YWxlxbxub8WbxIc6IFske2Zyb21Ob2RlPy5uYW1lIHx8IGZyb21Ob2RlSWR9XSDinpQgWyR7dG9Ob2RlPy5uYW1lIHx8IHRhcmdldE5vZGVJZH1dYFxuICAgICAgICA6IGBDb25uZWN0ZWQgZGVwZW5kZW5jeTogWyR7ZnJvbU5vZGU/Lm5hbWUgfHwgZnJvbU5vZGVJZH1dIOKelCBbJHt0b05vZGU/Lm5hbWUgfHwgdGFyZ2V0Tm9kZUlkfV1gXG4gICAgKTtcbiAgICBzZXRXaXJlRHJhZyhudWxsKTtcbiAgICBzZXRIb3ZlcmVkVGFyZ2V0Tm9kZUlkKG51bGwpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNhbnZhc1BvaW50ZXJVcCA9ICgpID0+IHtcbiAgICBpZiAod2lyZURyYWcgJiYgaG92ZXJlZFRhcmdldE5vZGVJZCkge1xuICAgICAgY29tcGxldGVXaXJlQ29ubmVjdGlvbihob3ZlcmVkVGFyZ2V0Tm9kZUlkKTtcbiAgICB9XG4gICAgc2V0RHJhZ2dpbmdOb2RlSWQobnVsbCk7XG4gICAgc2V0V2lyZURyYWcobnVsbCk7XG4gICAgc2V0SG92ZXJlZFRhcmdldE5vZGVJZChudWxsKTtcbiAgfTtcblxuICAvLyBSZW1vdmUgYSBkZXBlbmRlbmN5IHdpcmUgYmV0d2VlbiB0d28gbm9kZXNcbiAgY29uc3QgaGFuZGxlUmVtb3ZlQ29ubmVjdGlvbiA9IChmcm9tSWQ6IHN0cmluZywgdG9JZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0TG9naWNOb2RlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChuKSA9PlxuICAgICAgICBuLmlkID09PSB0b0lkXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIC4uLm4sXG4gICAgICAgICAgICAgIGRlcGVuZHNPbklkczogKG4uZGVwZW5kc09uSWRzIHx8IFtdKS5maWx0ZXIoKGlkKSA9PiBpZCAhPT0gZnJvbUlkKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA6IG5cbiAgICAgIClcbiAgICApO1xuICAgIHNldFN0YXR1c0hpbnQoXG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gJ1VzdW5pxJl0byBwb8WCxIVjemVuaWUgemFsZcW8bm/Fm2NpIG1pxJlkenkgd8SZesWCYW1pLidcbiAgICAgICAgOiAnUmVtb3ZlZCBkZXBlbmRlbmN5IHdpcmUgYmV0d2VlbiBub2Rlcy4nXG4gICAgKTtcbiAgfTtcblxuICAvLyBBZGQgYSBuZXcgTG9naWNOb2RlIG9udG8gdGhlIHZpc3VhbCBjYW52YXNcbiAgY29uc3QgaGFuZGxlQWRkTm9kZSA9ICgpID0+IHtcbiAgICBjb25zdCBpZHggPSBsb2dpY05vZGVzLmxlbmd0aDtcbiAgICBjb25zdCBjb2wgPSBpZHggJSAzO1xuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoaWR4IC8gMyk7XG4gICAgY29uc3QgbmV3SWQgPSBgcnVsZV8ke0RhdGUubm93KCkudG9TdHJpbmcoMzYpfWA7XG4gICAgY29uc3QgcHJldk5vZGVJZCA9IGxvZ2ljTm9kZXMubGVuZ3RoID4gMCA/IGxvZ2ljTm9kZXNbbG9naWNOb2Rlcy5sZW5ndGggLSAxXS5pZCA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG5ld05vZGU6IExvZ2ljTm9kZSA9IHtcbiAgICAgIGlkOiBuZXdJZCxcbiAgICAgIG5hbWU6XG4gICAgICAgIGxhbmcgPT09ICdwbCdcbiAgICAgICAgICA/IGBXxJl6ZcWCICMke2lkeCArIDF9YFxuICAgICAgICAgIDogYExvZ2ljIE5vZGUgIyR7aWR4ICsgMX1gLFxuICAgICAgdGFyZ2V0T2JqZWN0SWQ6IHNlbGVjdGVkT2JqZWN0SWQgfHwgJ0FMTCcsXG4gICAgICBldmVudDogaWR4ICUgMiA9PT0gMCA/ICdPbkdyYWJDbGljaycgOiAnT25HYXplJyxcbiAgICAgIGFjdGlvbjogaWR4ICUgMiA9PT0gMCA/ICdBd2FyZFBvaW50czEwMCcgOiAnUHVsc2VFbWlzc2l2ZScsXG4gICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgeDogMzYgKyBjb2wgKiAzMTAsXG4gICAgICAgIHk6IDI4ICsgcm93ICogMTg1LFxuICAgICAgfSxcbiAgICAgIGRlcGVuZHNPbklkczogcHJldk5vZGVJZCA/IFtwcmV2Tm9kZUlkXSA6IFtdLFxuICAgIH07XG5cbiAgICBzZXRMb2dpY05vZGVzKChwcmV2KSA9PiBbLi4ucHJldiwgbmV3Tm9kZV0pO1xuICAgIHNldFN0YXR1c0hpbnQoXG4gICAgICBsYW5nID09PSAncGwnXG4gICAgICAgID8gYERvZGFubyBcIiR7bmV3Tm9kZS5uYW1lfVwiIGkgcG/FgsSFY3pvbm8geiBwb3ByemVkbmltIHfEmXrFgmVtLiBQcnplY2nEhWduaWogd8SZesWCeSBsdWIgcHJ6ZXBuaWogbGluaWUuYFxuICAgICAgICA6IGBBZGRlZCBcIiR7bmV3Tm9kZS5uYW1lfVwiLiBEcmFnIG5vZGVzIHRvIGFycmFuZ2Ugb3IgZHJhZyBwb3J0cyB0byByZXdpcmUgZGVwZW5kZW5jaWVzLmBcbiAgICApO1xuICB9O1xuXG4gIC8vIEF1dG8tYXJyYW5nZSBub2RlcyBjbGVhbmx5IGluIHRvcG9sb2dpY2FsIGNvbHVtbnNcbiAgY29uc3QgaGFuZGxlQXV0b0xheW91dCA9ICgpID0+IHtcbiAgICBzZXRMb2dpY05vZGVzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKG4sIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBjb2wgPSBpZHggJSAzO1xuICAgICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKGlkeCAvIDMpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLm4sXG4gICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgIHg6IDM2ICsgY29sICogMzE1LFxuICAgICAgICAgICAgeTogMjggKyByb3cgKiAxODUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcblxuICAvLyBCdWlsZCBjdWJpYyBCZXppZXIgU1ZHIHBhdGggc3RyaW5nIGJldHdlZW4gdHdvIHBvaW50c1xuICBjb25zdCBidWlsZEJlemllclBhdGggPSAoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGR4ID0gTWF0aC5tYXgoNjAsIE1hdGguYWJzKHgyIC0geDEpICogMC41KTtcbiAgICByZXR1cm4gYE0gJHt4MX0gJHt5MX0gQyAke3gxICsgZHh9ICR7eTF9LCAke3gyIC0gZHh9ICR7eTJ9LCAke3gyfSAke3kyfWA7XG4gIH07XG5cbiAgLy8gQ29sbGVjdCBhbGwgYWN0aXZlIGRlcGVuZGVuY3kgZWRnZXMgYWNyb3NzIGxvZ2ljTm9kZXNcbiAgY29uc3QgZWRnZXM6IHtcbiAgICBmcm9tTm9kZTogTG9naWNOb2RlO1xuICAgIHRvTm9kZTogTG9naWNOb2RlO1xuICAgIHgxOiBudW1iZXI7XG4gICAgeTE6IG51bWJlcjtcbiAgICB4MjogbnVtYmVyO1xuICAgIHkyOiBudW1iZXI7XG4gIH1bXSA9IFtdO1xuXG4gIGxvZ2ljTm9kZXMuZm9yRWFjaCgodG9Ob2RlKSA9PiB7XG4gICAgKHRvTm9kZS5kZXBlbmRzT25JZHMgfHwgW10pLmZvckVhY2goKGZyb21JZCkgPT4ge1xuICAgICAgY29uc3QgZnJvbU5vZGUgPSBsb2dpY05vZGVzLmZpbmQoKG4pID0+IG4uaWQgPT09IGZyb21JZCk7XG4gICAgICBpZiAoZnJvbU5vZGUpIHtcbiAgICAgICAgY29uc3Qgb3V0UHQgPSBnZXRPdXRwdXRQb3J0Q29vcmRzKGZyb21Ob2RlKTtcbiAgICAgICAgY29uc3QgaW5QdCA9IGdldElucHV0UG9ydENvb3Jkcyh0b05vZGUpO1xuICAgICAgICBlZGdlcy5wdXNoKHtcbiAgICAgICAgICBmcm9tTm9kZSxcbiAgICAgICAgICB0b05vZGUsXG4gICAgICAgICAgeDE6IG91dFB0LngsXG4gICAgICAgICAgeTE6IG91dFB0LnksXG4gICAgICAgICAgeDI6IGluUHQueCxcbiAgICAgICAgICB5MjogaW5QdC55LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgdy1mdWxsIGgtZnVsbCBzZWxlY3Qtbm9uZVwiPlxuICAgICAgey8qIFRvcCBUb29sYmFyIG9mIFZpc3VhbCBHcmFwaCBFZGl0b3IgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcGItMi41IG1iLTIuNSBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHRleHQteHNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICA8R2l0QnJhbmNoIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgPyAnV2l6dWFsbnkgRWR5dG9yIFBvxYLEhWN6ZcWEIGkgWmFsZcW8bm/Fm2NpIFfEmXrFgsOzdyAoRHJhZyAmIERyb3ApJ1xuICAgICAgICAgICAgICA6ICdWaXN1YWwgTm9kZSBEZXBlbmRlbmN5ICYgVHJpZ2dlciBDb25uZWN0aW9uIEVkaXRvcid9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBtZDppbmxpbmUgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICDCtyB7bG9naWNOb2Rlcy5sZW5ndGh9IHtsYW5nID09PSAncGwnID8gJ3fEmXrFgsOzdycgOiAnbm9kZXMnfSDCtyB7ZWRnZXMubGVuZ3RofXsnICd9XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdwb8WCxIVjemXFhCcgOiAnd2lyZXMnfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQWRkTm9kZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB4LTMgcHktMS41IHJvdW5kZWQtbGcgYmctYW1iZXItNTAwIGhvdmVyOmJnLWFtYmVyLTQwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tY29sb3JzIHdoaXRlc3BhY2Utbm93cmFwIHNocmluay0wXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdEb2RhaiBXxJl6ZcWCIExvZ2lraScgOiAnQWRkIExvZ2ljIE5vZGUnfVxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBdXRvTGF5b3V0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMi41IHB5LTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgICAgdGl0bGU9e2xhbmcgPT09ICdwbCcgPyAnQXV0b21hdHljem5lIHJvem1pZXN6Y3plbmllIHNpYXRraScgOiAnQXV0by1hcnJhbmdlIG5vZGVzJ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TGF5b3V0R3JpZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnVXBvcnrEhWRrdWogR3JhZicgOiAnQXV0by1MYXlvdXQnfVxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0V4cGFuZGVkU3ViVmlldyghaXNFeHBhbmRlZFN1YlZpZXcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1hbWJlci0zMDAgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgd2hpdGVzcGFjZS1ub3dyYXAgc2hyaW5rLTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0V4cGFuZGVkU3ViVmlldyA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8TWluaW1pemUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdad2nFhCBkbyBEb2t1IDNEJyA6ICdEb2NrIFZpZXcnfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgPE1heGltaXplMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUGXFgm55IFdpZG9rIEdyYWZ1IChTdWItVmlldyknIDogJ0Z1bGwgR3JhcGggU3ViLVZpZXcnfVxuICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBJbnRlcmFjdGl2ZSBCbHVlcHJpbnQgQ2FudmFzICovfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAgICAgb25Qb2ludGVyTW92ZT17aGFuZGxlQ2FudmFzUG9pbnRlck1vdmV9XG4gICAgICAgIG9uUG9pbnRlclVwPXtoYW5kbGVDYW52YXNQb2ludGVyVXB9XG4gICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHctZnVsbCBvdmVyZmxvdy1hdXRvIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwICR7XG4gICAgICAgICAgaXNFeHBhbmRlZFN1YlZpZXcgPyAnaC1bY2FsYygxMDB2aC0yMzBweCldIG1pbi1oLVs0ODBweF0nIDogJ2gtWzIzMHB4XSdcbiAgICAgICAgfWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZEltYWdlOlxuICAgICAgICAgICAgJ3JhZGlhbC1ncmFkaWVudChjaXJjbGUsIHJnYmEoMTQ4LCAxNjMsIDE4NCwgMC4xNikgMXB4LCB0cmFuc3BhcmVudCAxcHgpJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogJzIwcHggMjBweCcsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbWluLXctWzEwNTBweF0gbWluLWgtWzQ2MHB4XSB3LWZ1bGwgaC1mdWxsXCI+XG4gICAgICAgICAgey8qIFNWRyBMYXllciBmb3IgQmV6aWVyIERlcGVuZGVuY3kgV2lyZXMgKi99XG4gICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgcG9pbnRlci1ldmVudHMtbm9uZSB6LTEwIG92ZXJmbG93LXZpc2libGVcIj5cbiAgICAgICAgICAgIDxkZWZzPlxuICAgICAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJ3aXJlR3JhZFwiIHgxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIwJVwiPlxuICAgICAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjAlXCIgc3RvcENvbG9yPVwiI0Y1OUUwQlwiIC8+XG4gICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMTAwJVwiIHN0b3BDb2xvcj1cIiMzOEJERjhcIiAvPlxuICAgICAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICAgICAgICA8bWFya2VyXG4gICAgICAgICAgICAgICAgaWQ9XCJhcnJvd0hlYWRcIlxuICAgICAgICAgICAgICAgIHZpZXdCb3g9XCIwIDAgMTAgMTBcIlxuICAgICAgICAgICAgICAgIHJlZlg9XCI3XCJcbiAgICAgICAgICAgICAgICByZWZZPVwiNVwiXG4gICAgICAgICAgICAgICAgbWFya2VyV2lkdGg9XCI2XCJcbiAgICAgICAgICAgICAgICBtYXJrZXJIZWlnaHQ9XCI2XCJcbiAgICAgICAgICAgICAgICBvcmllbnQ9XCJhdXRvLXN0YXJ0LXJldmVyc2VcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0gMCAxIEwgMTAgNSBMIDAgOSB6XCIgZmlsbD1cIiMzOEJERjhcIiAvPlxuICAgICAgICAgICAgICA8L21hcmtlcj5cbiAgICAgICAgICAgIDwvZGVmcz5cblxuICAgICAgICAgICAgey8qIEV4aXN0aW5nIERlcGVuZGVuY3kgQ29ubmVjdGlvbnMgKi99XG4gICAgICAgICAgICB7ZWRnZXMubWFwKChlZGdlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHBhdGhEYXRhID0gYnVpbGRCZXppZXJQYXRoKGVkZ2UueDEsIGVkZ2UueTEsIGVkZ2UueDIsIGVkZ2UueTIpO1xuICAgICAgICAgICAgICBjb25zdCBtaWRYID0gKGVkZ2UueDEgKyBlZGdlLngyKSAvIDI7XG4gICAgICAgICAgICAgIGNvbnN0IG1pZFkgPSAoZWRnZS55MSArIGVkZ2UueTIpIC8gMjtcbiAgICAgICAgICAgICAgY29uc3QgaXNSZWNlbnRseVRyaWdnZXJlZCA9XG4gICAgICAgICAgICAgICAgZWRnZS5mcm9tTm9kZS5sYXN0VHJpZ2dlcmVkQXQgJiZcbiAgICAgICAgICAgICAgICBEYXRlLm5vdygpIC0gZWRnZS5mcm9tTm9kZS5sYXN0VHJpZ2dlcmVkQXQgPCAyMDAwO1xuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGcga2V5PXtgJHtlZGdlLmZyb21Ob2RlLmlkfS0+JHtlZGdlLnRvTm9kZS5pZH1gfSBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICB7LyogSW52aXNpYmxlIHdpZGVyIHN0cm9rZSBmb3IgZWFzeSBjbGlja2luZyAqL31cbiAgICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgIGQ9e3BhdGhEYXRhfVxuICAgICAgICAgICAgICAgICAgICBmaWxsPVwibm9uZVwiXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cInRyYW5zcGFyZW50XCJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezE0fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZUNvbm5lY3Rpb24oZWRnZS5mcm9tTm9kZS5pZCwgZWRnZS50b05vZGUuaWQpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIHsvKiBNYWluIHZpc2libGUgQmV6aWVyIGN1cnZlICovfVxuICAgICAgICAgICAgICAgICAgPHBhdGhcbiAgICAgICAgICAgICAgICAgICAgZD17cGF0aERhdGF9XG4gICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPXtpc1JlY2VudGx5VHJpZ2dlcmVkID8gJyMxMEI5ODEnIDogJ3VybCgjd2lyZUdyYWQpJ31cbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9e2lzUmVjZW50bHlUcmlnZ2VyZWQgPyAzLjUgOiAyLjV9XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlckVuZD1cInVybCgjYXJyb3dIZWFkKVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgey8qIEFuaW1hdGVkIHNpZ25hbCBmbG93IG92ZXJsYXkgKi99XG4gICAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgICBkPXtwYXRoRGF0YX1cbiAgICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCIjRkZGQkVCXCJcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PVwiNSA5XCJcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eT17MC43NX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICB7LyogTWlkcG9pbnQgRGlzY29ubmVjdCBCdXR0b24gKi99XG4gICAgICAgICAgICAgICAgICA8Z1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09e2B0cmFuc2xhdGUoJHttaWRYfSwgJHttaWRZfSlgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciBncm91cFwiXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVJlbW92ZUNvbm5lY3Rpb24oZWRnZS5mcm9tTm9kZS5pZCwgZWRnZS50b05vZGUuaWQpfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgICAgICAgICAgcj17OX1cbiAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwiIzBGMTcyQVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiIzQ3NTU2OVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJncm91cC1ob3ZlcjpmaWxsLXJvc2UtNjAwIGdyb3VwLWhvdmVyOnN0cm9rZS1yb3NlLTQwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEFuY2hvcj1cIm1pZGRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgZHk9XCIzLjVcIlxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCIjRTJFOEYwXCJcbiAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZT1cIjExXCJcbiAgICAgICAgICAgICAgICAgICAgICBmb250RmFtaWx5PVwibW9ub3NwYWNlXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIMOXXG4gICAgICAgICAgICAgICAgICAgIDwvdGV4dD5cbiAgICAgICAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cblxuICAgICAgICAgICAgey8qIExpdmUgV2lyZSBCZWluZyBEcmFnZ2VkIGJ5IFVzZXIgKi99XG4gICAgICAgICAgICB7d2lyZURyYWcgJiYgKFxuICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgIGQ9e2J1aWxkQmV6aWVyUGF0aChcbiAgICAgICAgICAgICAgICAgIHdpcmVEcmFnLnN0YXJ0WCxcbiAgICAgICAgICAgICAgICAgIHdpcmVEcmFnLnN0YXJ0WSxcbiAgICAgICAgICAgICAgICAgIHdpcmVEcmFnLmN1cnJYLFxuICAgICAgICAgICAgICAgICAgd2lyZURyYWcuY3VycllcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICBzdHJva2U9XCIjRjU5RTBCXCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD17Mi41fVxuICAgICAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheT1cIjYgNFwiXG4gICAgICAgICAgICAgICAgbWFya2VyRW5kPVwidXJsKCNhcnJvd0hlYWQpXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9zdmc+XG5cbiAgICAgICAgICB7LyogTG9naWNOb2RlIENhcmRzIExheWVyICovfVxuICAgICAgICAgIHtsb2dpY05vZGVzLm1hcCgobm9kZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBvc1ggPSBub2RlLnBvc2l0aW9uPy54ID8/IDM2ICsgKGluZGV4ICUgMykgKiAzMTA7XG4gICAgICAgICAgICBjb25zdCBwb3NZID0gbm9kZS5wb3NpdGlvbj8ueSA/PyAyOCArIE1hdGguZmxvb3IoaW5kZXggLyAzKSAqIDE4MDtcbiAgICAgICAgICAgIGNvbnN0IGlzVGFyZ2V0SG92ZXJlZCA9IGhvdmVyZWRUYXJnZXROb2RlSWQgPT09IG5vZGUuaWQ7XG4gICAgICAgICAgICBjb25zdCBpc1JlY2VudGx5RmlyZWQgPVxuICAgICAgICAgICAgICBub2RlLmxhc3RUcmlnZ2VyZWRBdCAmJiBEYXRlLm5vdygpIC0gbm9kZS5sYXN0VHJpZ2dlcmVkQXQgPCAxODAwO1xuXG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtub2RlLmlkfVxuICAgICAgICAgICAgICAgIG9uUG9pbnRlckVudGVyPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAod2lyZURyYWcgJiYgd2lyZURyYWcuZnJvbU5vZGVJZCAhPT0gbm9kZS5pZCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRIb3ZlcmVkVGFyZ2V0Tm9kZUlkKG5vZGUuaWQpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25Qb2ludGVyTGVhdmU9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChob3ZlcmVkVGFyZ2V0Tm9kZUlkID09PSBub2RlLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldEhvdmVyZWRUYXJnZXROb2RlSWQobnVsbCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBvblBvaW50ZXJVcD17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHdpcmVEcmFnICYmIHdpcmVEcmFnLmZyb21Ob2RlSWQgIT09IG5vZGUuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGVXaXJlQ29ubmVjdGlvbihub2RlLmlkKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICB3aWR0aDogYCR7Tk9ERV9XSURUSH1weGAsXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IGAke05PREVfSEVJR0hUfXB4YCxcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7cG9zWH1weCwgJHtwb3NZfXB4LCAwKWAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgei0yMCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85NSBib3JkZXIgdHJhbnNpdGlvbi1zaGFkb3cgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcC0zIHRleHQteHMgc2hhZG93LXhsICR7XG4gICAgICAgICAgICAgICAgICBpc1JlY2VudGx5RmlyZWRcbiAgICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWVtZXJhbGQtNDAwIHJpbmctMiByaW5nLWVtZXJhbGQtNDAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICA6IGlzVGFyZ2V0SG92ZXJlZFxuICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItc2t5LTQwMCByaW5nLTIgcmluZy1za3ktNDAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICA6IG5vZGUuZW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICA/ICdib3JkZXItc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1hbWJlci01MDAvNzAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1zbGF0ZS04MDAgb3BhY2l0eS02MCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsvKiBMRUZUIElOUFVUIFBPUlQgKERlcGVuZGVuY3kgSW4gU29ja2V0KSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBvblBvaW50ZXJVcD17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHdpcmVEcmFnICYmIHdpcmVEcmFnLmZyb21Ob2RlSWQgIT09IG5vZGUuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVdpcmVDb25uZWN0aW9uKG5vZGUuaWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgdGl0bGU9e1xuICAgICAgICAgICAgICAgICAgICBsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnUG9ydCBXZWrFm2Npb3d5IChVcHXFm8SHIHR1dGFqIGxpbmnEmSB6IHBvcHJ6ZWRuaWVnbyB3xJl6xYJhKSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdEZXBlbmRlbmN5IElucHV0IFBvcnQgKERyb3Agd2lyZSBoZXJlKSdcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIC1sZWZ0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHctNiBoLTYgcm91bmRlZC1mdWxsIGJvcmRlci0yIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGN1cnNvci1jcm9zc2hhaXIgdHJhbnNpdGlvbi10cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgICAgICAgaXNUYXJnZXRIb3ZlcmVkXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2t5LTQwMCBib3JkZXItd2hpdGUgc2NhbGUtMTI1J1xuICAgICAgICAgICAgICAgICAgICAgIDogKG5vZGUuZGVwZW5kc09uSWRzIHx8IFtdKS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2t5LTUwMCBib3JkZXItc2xhdGUtOTUwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCBib3JkZXItc2xhdGUtNTAwIGhvdmVyOmJvcmRlci1za3ktNDAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFJJR0hUIE9VVFBVVCBQT1JUIChEcmFnIFdpcmUgT3V0IFNvY2tldCkgKi99XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IGhhbmRsZVN0YXJ0V2lyZURyYWcoZSwgbm9kZSl9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17XG4gICAgICAgICAgICAgICAgICAgIGxhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdQb3J0IFd5asWbY2lvd3kgKFByemVjacSFZ25paiBsaW5pxJkgZG8ga29sZWpuZWdvIHfEmXrFgmEpJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ1RyaWdnZXIgT3V0cHV0IFBvcnQgKERyYWcgd2lyZSB0byBhbm90aGVyIG5vZGUpJ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXJpZ2h0LTMgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHctNiBoLTYgcm91bmRlZC1mdWxsIGJnLWFtYmVyLTUwMCBob3ZlcjpiZy1hbWJlci00MDAgYm9yZGVyLTIgYm9yZGVyLXNsYXRlLTk1MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBjdXJzb3ItY3Jvc3NoYWlyIGhvdmVyOnNjYWxlLTEyNSB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctc2xhdGUtOTUwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBEcmFnZ2FibGUgTm9kZSBIZWFkZXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IGhhbmRsZU5vZGVIZWFkZXJQb2ludGVyRG93bihlLCBub2RlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMS41IHBiLTEuNSBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGN1cnNvci1tb3ZlXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e25vZGUuZW5hYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExvZ2ljTm9kZXMoKHByZXYpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByZXYubWFwKChyKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuaWQgPT09IG5vZGUuaWQgPyB7IC4uLnIsIGVuYWJsZWQ6ICFyLmVuYWJsZWQgfSA6IHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhY2NlbnQtYW1iZXItNTAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtub2RlLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TG9naWNOb2RlcygocHJldikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldi5tYXAoKHIpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5pZCA9PT0gbm9kZS5pZCA/IHsgLi4uciwgbmFtZTogZS50YXJnZXQudmFsdWUgfSA6IHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy10cmFuc3BhcmVudCBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgdHJ1bmNhdGUgdy0zMiBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ymctc2xhdGUtOTUwIHJvdW5kZWQgcHgtMVwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICB7b25UcmlnZ2VyTm9kZUNhc2NhZGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblRyaWdnZXJOb2RlQ2FzY2FkZShub2RlLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ1ByemV0ZXN0dWoga2Fza2FkxJkgd3l6d2FsYWN6YSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdUZXN0IHRyaWdnZXIgY2FzY2FkZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGJnLWVtZXJhbGQtNTAwLzIwIGhvdmVyOmJnLWVtZXJhbGQtNTAwLzQwIHRleHQtZW1lcmFsZC0zMDBcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExvZ2ljTm9kZXMoKHByZXYpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChyKSA9PiByLmlkICE9PSBub2RlLmlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoKHIpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5yLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwZW5kc09uSWRzOiAoci5kZXBlbmRzT25JZHMgfHwgW10pLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGQpID0+IGQgIT09IG5vZGUuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSByb3VuZGVkIGhvdmVyOmJnLXJvc2UtOTUwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtcm9zZS00MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPXtsYW5nID09PSAncGwnID8gJ1VzdcWEIHfEmXplxYInIDogJ0RlbGV0ZSBub2RlJ31cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogTm9kZSBCb2R5OiBUYXJnZXQgQWN0b3IsIFRyaWdnZXIgRXZlbnQgJiBBY3Rpb24gU2VsZWN0b3JzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgbXktMVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTEgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdPYmlla3Q6JyA6ICdBY3RvcjonfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bm9kZS50YXJnZXRPYmplY3RJZH1cbiAgICAgICAgICAgICAgICAgICAgICBvblBvaW50ZXJEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRMb2dpY05vZGVzKChwcmV2KSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2Lm1hcCgocikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByLmlkID09PSBub2RlLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHsgLi4uciwgdGFyZ2V0T2JqZWN0SWQ6IGUudGFyZ2V0LnZhbHVlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogclxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMzYgcHgtMS41IHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTIwMCB0cnVuY2F0ZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQUxMXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdXc3p5c3RraWUgb2JpZWt0eSAoQUxMKScgOiAnQWxsIFNjZW5lIEFjdG9ycyd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAge29iamVjdHMubWFwKChvKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIGtleT17by5pZH0gdmFsdWU9e28uaWR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7by5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0xIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNDAwIGZvbnQtbW9ubyBzaHJpbmstMFwiPklGOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtub2RlLmV2ZW50fVxuICAgICAgICAgICAgICAgICAgICAgIG9uUG9pbnRlckRvd249eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldExvZ2ljTm9kZXMoKHByZXYpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByZXYubWFwKChyKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuaWQgPT09IG5vZGUuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geyAuLi5yLCBldmVudDogZS50YXJnZXQudmFsdWUgYXMgVHJpZ2dlckV2ZW50IH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogclxuICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMzYgcHgtMS41IHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LWFtYmVyLTMwMCBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk9uR3JhYkNsaWNrXCI+T25HcmFiQ2xpY2s8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiT25HYXplXCI+T25HYXplRm9jdXM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiT25Qcm94aW1pdHlcIj5PblByb3hpbWl0eTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJPblRpbWVyNXNcIj5PblRpbWVyNXM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTEgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LW1vbm8gc2hyaW5rLTBcIj5ETzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bm9kZS5hY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgb25Qb2ludGVyRG93bj17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0TG9naWNOb2RlcygocHJldikgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldi5tYXAoKHIpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgci5pZCA9PT0gbm9kZS5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB7IC4uLnIsIGFjdGlvbjogZS50YXJnZXQudmFsdWUgYXMgVHJpZ2dlckFjdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTM2IHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1lbWVyYWxkLTMwMCBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkF3YXJkUG9pbnRzMTAwXCI+QXdhcmRQb2ludHMxMDA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVG9nZ2xlVHVyYm9TcGluXCI+VG9nZ2xlVHVyYm9TcGluPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlRlbGVwb3J0VG9DZW50ZXJcIj5UZWxlcG9ydFRvQ2VudGVyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlB1bHNlRW1pc3NpdmVcIj5QdWxzZUVtaXNzaXZlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlVubG9ja0FjaGlldmVtZW50XCI+VW5sb2NrQWNoaWV2ZW1lbnQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBGb290ZXI6IERlcGVuZGVuY3kgU3RhdHVzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMSBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICBJTjogeyhub2RlLmRlcGVuZHNPbklkcyB8fCBbXSkubGVuZ3RofXsnICd9XG4gICAgICAgICAgICAgICAgICAgIHsobm9kZS5kZXBlbmRzT25JZHMgfHwgW10pLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgICA/IGxhbmcgPT09ICdwbCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJyhaYWxlxbxueSknXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICcoQ2hhaW5lZCknXG4gICAgICAgICAgICAgICAgICAgICAgOiBsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICAgICAgPyAnKEfFgsOzd255KSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICcoUm9vdCknfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDAvOTBcIj5cbiAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUHJ6ZWNpxIVnbmlqIFdZSiDil48g4p6UJyA6ICdEcmFnIE9VVCDil48g4p6UJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQm90dG9tIFN0YXR1cyAmIERlcGVuZGVuY3kgSW5zdHJ1Y3Rpb24gQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj57c3RhdHVzSGludH08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICA/ICdLbGlrbmlqIMOXIG5hIGxpbmlpLCBhYnkgcm96xYLEhWN6ecSHIHphbGXFvG5vxZvEhydcbiAgICAgICAgICAgIDogJ0NsaWNrIMOXIG9uIGFueSB3aXJlIHRvIGRpc2Nvbm5lY3QnfVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=