const React = __vite__cjsImport0_react; const useRef = __vite__cjsImport0_react["useRef"];const _jsxDEV = __vite__cjsImport3_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/apps/parallax3d/node_modules/.vite/deps/react.js?v=b44980a7";
import { Upload, Sparkles, Layers, RefreshCw, Maximize2 } from "/apps/parallax3d/node_modules/.vite/deps/lucide-react.js?v=eff26b65";
import { PRESET_IMAGES } from "/apps/parallax3d/src/utils/proceduralImages.ts";
var _jsxFileName = "/app/applet/src/components/TopBar.tsx";
import __vite__cjsImport3_react_jsxDevRuntime from "/apps/parallax3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=b44980a7";
export const TopBar = ({ currentPresetId, onSelectPreset, onUploadImage, onUploadDepthMap, isAiAnalyzing, onRunAiAnalysis, aiAnalysis, zenMode, onToggleZenMode }) => {
	const fileInputRef = useRef(null);
	const depthInputRef = useRef(null);
	return /* @__PURE__ */ _jsxDEV("header", {
		className: "absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-none text-zinc-200 select-none",
		children: [
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-md",
					children: "3D"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 36,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", { children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxDEV("h1", {
						className: "text-sm font-semibold tracking-wide text-white",
						children: "Parallax3D"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 41,
						columnNumber: 13
					}, this), /* @__PURE__ */ _jsxDEV("span", {
						className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700/60",
						children: "Three.js PBR"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 42,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 40,
					columnNumber: 11
				}, this), /* @__PURE__ */ _jsxDEV("p", {
					className: "text-[11px] text-zinc-400 hidden sm:block",
					children: "Przestrzenne zdjęcia z przesuwającym się kadrem"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 39,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 35,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "hidden lg:flex items-center gap-1.5 bg-zinc-900 p-1 rounded-xl border border-zinc-800",
				children: PRESET_IMAGES.map((p) => {
					const isActive = currentPresetId === p.id;
					return /* @__PURE__ */ _jsxDEV("button", {
						onClick: () => onSelectPreset(p.id),
						className: `px-2.5 py-1 text-xs font-medium rounded-lg transition ${isActive ? "bg-zinc-800 text-white shadow-sm border border-zinc-700" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850"}`,
						children: p.category
					}, p.id, false, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 13
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ _jsxDEV("input", {
						ref: fileInputRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => {
							if (e.target.files && e.target.files[0]) {
								onUploadImage(e.target.files[0]);
							}
						}
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 75,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("input", {
						ref: depthInputRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => {
							if (e.target.files && e.target.files[0]) {
								onUploadDepthMap(e.target.files[0]);
							}
						}
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => fileInputRef.current?.click(),
						className: "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm",
						title: "Wgraj własne zdjęcie z dysku",
						children: [/* @__PURE__ */ _jsxDEV(Upload, { className: "w-3.5 h-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 104,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wgraj Zdjęcie" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 105,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 99,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: onRunAiAnalysis,
						disabled: isAiAnalyzing,
						className: `hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition ${isAiAnalyzing ? "bg-zinc-800 text-zinc-500 border-zinc-800 cursor-wait" : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700"}`,
						title: "Analiza głębi kadru i optymalizacja przez Gemini AI",
						children: [isAiAnalyzing ? /* @__PURE__ */ _jsxDEV(RefreshCw, { className: "w-3.5 h-3.5 animate-spin text-indigo-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 13
						}, this) : /* @__PURE__ */ _jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 122,
							columnNumber: 13
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: isAiAnalyzing ? "Analiza AI..." : "Analiza AI" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 124,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 109,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: () => depthInputRef.current?.click(),
						className: "hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 transition",
						title: "Wgraj opcjonalną dedykowaną mapę głębi (np. z iPhone Portrait)",
						children: [/* @__PURE__ */ _jsxDEV(Layers, { className: "w-3.5 h-3.5 text-zinc-400" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 133,
							columnNumber: 11
						}, this), /* @__PURE__ */ _jsxDEV("span", { children: "Wgraj Mapę" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 134,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 128,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ _jsxDEV("button", {
						onClick: onToggleZenMode,
						className: "p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition",
						title: zenMode ? "Pokaż panele" : "Tryb pełnego widoku",
						children: /* @__PURE__ */ _jsxDEV(Maximize2, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 143,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 138,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 73,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 33,
		columnNumber: 5
	}, this);
};

//# sourceMappingURL=data:application/json;base64,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b250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBVcGxvYWQsIFNwYXJrbGVzLCBMYXllcnMsIEV5ZSwgUmVmcmVzaEN3LCBNYXhpbWl6ZTIgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgUFJFU0VUX0lNQUdFUyB9IGZyb20gJy4uL3V0aWxzL3Byb2NlZHVyYWxJbWFnZXMnO1xuaW1wb3J0IHsgQUlEZXB0aEFuYWx5c2lzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgVG9wQmFyUHJvcHMge1xuICBjdXJyZW50UHJlc2V0SWQ6IHN0cmluZztcbiAgb25TZWxlY3RQcmVzZXQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblVwbG9hZEltYWdlOiAoZmlsZTogRmlsZSkgPT4gdm9pZDtcbiAgb25VcGxvYWREZXB0aE1hcDogKGZpbGU6IEZpbGUpID0+IHZvaWQ7XG4gIGlzQWlBbmFseXppbmc6IGJvb2xlYW47XG4gIG9uUnVuQWlBbmFseXNpczogKCkgPT4gdm9pZDtcbiAgYWlBbmFseXNpczogQUlEZXB0aEFuYWx5c2lzIHwgbnVsbDtcbiAgemVuTW9kZTogYm9vbGVhbjtcbiAgb25Ub2dnbGVaZW5Nb2RlOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgVG9wQmFyOiBSZWFjdC5GQzxUb3BCYXJQcm9wcz4gPSAoe1xuICBjdXJyZW50UHJlc2V0SWQsXG4gIG9uU2VsZWN0UHJlc2V0LFxuICBvblVwbG9hZEltYWdlLFxuICBvblVwbG9hZERlcHRoTWFwLFxuICBpc0FpQW5hbHl6aW5nLFxuICBvblJ1bkFpQW5hbHlzaXMsXG4gIGFpQW5hbHlzaXMsXG4gIHplbk1vZGUsXG4gIG9uVG9nZ2xlWmVuTW9kZSxcbn0pID0+IHtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBkZXB0aElucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuXG4gIHJldHVybiAoXG4gICAgPGhlYWRlciBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTAgcmlnaHQtMCB6LTQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC00IHB5LTMgYmctemluYy05NTAvOTAgYm9yZGVyLWIgYm9yZGVyLXppbmMtODAwLzgwIGJhY2tkcm9wLWJsdXItbm9uZSB0ZXh0LXppbmMtMjAwIHNlbGVjdC1ub25lXCI+XG4gICAgICB7LyogQnJhbmQgJiBUaXRsZSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTggaC04IHJvdW5kZWQtbGcgYmctZ3JhZGllbnQtdG8tYnIgZnJvbS1pbmRpZ28tNTAwIHRvLXZpb2xldC02MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1zbSBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAzRFxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LXNlbWlib2xkIHRyYWNraW5nLXdpZGUgdGV4dC13aGl0ZVwiPlBhcmFsbGF4M0Q8L2gxPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy16aW5jLTgwMCB0ZXh0LXppbmMtNDAwIGJvcmRlciBib3JkZXItemluYy03MDAvNjBcIj5cbiAgICAgICAgICAgICAgVGhyZWUuanMgUEJSXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC16aW5jLTQwMCBoaWRkZW4gc206YmxvY2tcIj5cbiAgICAgICAgICAgIFByemVzdHJ6ZW5uZSB6ZGrEmWNpYSB6IHByemVzdXdhasSFY3ltIHNpxJkga2FkcmVtXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUHJlc2V0IFNlbGVjdG9yICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gbGc6ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBiZy16aW5jLTkwMCBwLTEgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXppbmMtODAwXCI+XG4gICAgICAgIHtQUkVTRVRfSU1BR0VTLm1hcCgocCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gY3VycmVudFByZXNldElkID09PSBwLmlkO1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17cC5pZH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TZWxlY3RQcmVzZXQocC5pZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHRleHQteHMgZm9udC1tZWRpdW0gcm91bmRlZC1sZyB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICAgICAgaXNBY3RpdmVcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXppbmMtODAwIHRleHQtd2hpdGUgc2hhZG93LXNtIGJvcmRlciBib3JkZXItemluYy03MDAnXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXppbmMtNDAwIGhvdmVyOnRleHQtemluYy0yMDAgaG92ZXI6YmctemluYy04NTAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7cC5jYXRlZ29yeX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgey8qIEhpZGRlbiBpbnB1dHMgKi99XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW5cIlxuICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmZpbGVzICYmIGUudGFyZ2V0LmZpbGVzWzBdKSB7XG4gICAgICAgICAgICAgIG9uVXBsb2FkSW1hZ2UoZS50YXJnZXQuZmlsZXNbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHJlZj17ZGVwdGhJbnB1dFJlZn1cbiAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuXCJcbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5maWxlcyAmJiBlLnRhcmdldC5maWxlc1swXSkge1xuICAgICAgICAgICAgICBvblVwbG9hZERlcHRoTWFwKGUudGFyZ2V0LmZpbGVzWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICAvPlxuXG4gICAgICAgIHsvKiBVcGxvYWQgVXNlciBQaG90byAqL31cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLWxnIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHRyYW5zaXRpb24gc2hhZG93LXNtXCJcbiAgICAgICAgICB0aXRsZT1cIldncmFqIHfFgmFzbmUgemRqxJljaWUgeiBkeXNrdVwiXG4gICAgICAgID5cbiAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICA8c3Bhbj5XZ3JhaiBaZGrEmWNpZTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgey8qIEFJIERlcHRoIEFuYWx5c2lzICovfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17b25SdW5BaUFuYWx5c2lzfVxuICAgICAgICAgIGRpc2FibGVkPXtpc0FpQW5hbHl6aW5nfVxuICAgICAgICAgIGNsYXNzTmFtZT17YGhpZGRlbiBzbTpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIuNSBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uICR7XG4gICAgICAgICAgICBpc0FpQW5hbHl6aW5nXG4gICAgICAgICAgICAgID8gJ2JnLXppbmMtODAwIHRleHQtemluYy01MDAgYm9yZGVyLXppbmMtODAwIGN1cnNvci13YWl0J1xuICAgICAgICAgICAgICA6ICdiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCB0ZXh0LXppbmMtMzAwIGJvcmRlci16aW5jLTcwMCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgICB0aXRsZT1cIkFuYWxpemEgZ8WCxJliaSBrYWRydSBpIG9wdHltYWxpemFjamEgcHJ6ZXogR2VtaW5pIEFJXCJcbiAgICAgICAgPlxuICAgICAgICAgIHtpc0FpQW5hbHl6aW5nID8gKFxuICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBhbmltYXRlLXNwaW4gdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8c3Bhbj57aXNBaUFuYWx5emluZyA/ICdBbmFsaXphIEFJLi4uJyA6ICdBbmFsaXphIEFJJ308L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIHsvKiBDdXN0b20gRGVwdGggVXBsb2FkICovfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gZGVwdGhJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlbiBtZDpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIuNSBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSByb3VuZGVkLWxnIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIHRleHQtemluYy0zMDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCB0cmFuc2l0aW9uXCJcbiAgICAgICAgICB0aXRsZT1cIldncmFqIG9wY2pvbmFsbsSFIGRlZHlrb3dhbsSFIG1hcMSZIGfFgsSZYmkgKG5wLiB6IGlQaG9uZSBQb3J0cmFpdClcIlxuICAgICAgICA+XG4gICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXppbmMtNDAwXCIgLz5cbiAgICAgICAgICA8c3Bhbj5XZ3JhaiBNYXDEmTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgey8qIFplbiBNb2RlIHRvZ2dsZSAqL31cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e29uVG9nZ2xlWmVuTW9kZX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIHRleHQtemluYy00MDAgaG92ZXI6dGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXppbmMtODAwIHRyYW5zaXRpb25cIlxuICAgICAgICAgIHRpdGxlPXt6ZW5Nb2RlID8gJ1Bva2HFvCBwYW5lbGUnIDogJ1RyeWIgcGXFgm5lZ28gd2lkb2t1J31cbiAgICAgICAgPlxuICAgICAgICAgIDxNYXhpbWl6ZTIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9oZWFkZXI+XG4gICk7XG59O1xuIl19