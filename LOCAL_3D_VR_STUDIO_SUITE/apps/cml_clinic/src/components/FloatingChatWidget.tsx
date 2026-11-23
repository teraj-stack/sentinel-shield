import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { MessageSquare, X, Bot } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion, AnimatePresence } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
export const FloatingChatWidget = ({ onOpenAiConsultant }) => {
  const [showTooltip, setShowTooltip] = useState(true);
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto", children: [
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: showTooltip && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 10 },
        className: "relative p-4 rounded-2xl bg-slate-900/95 border border-purple-500/40 shadow-2xl backdrop-blur-md max-w-xs text-xs text-slate-100 group",
        children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: (e) => {
                e.stopPropagation();
                setShowTooltip(false);
              },
              className: "absolute top-2 right-2 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors",
              title: "Zamknij podpowiedź",
              children: /* @__PURE__ */ jsxDEV(X, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
                lineNumber: 31,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
              lineNumber: 23,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-teal-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
              lineNumber: 35,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-purple-300 text-[11px] uppercase tracking-wider flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(Bot, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
                lineNumber: 37,
                columnNumber: 17
              }, this),
              "Dr Jan Bujok · Asystent AI"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
              lineNumber: 36,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
            lineNumber: 34,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 font-light leading-relaxed cursor-pointer", onClick: onOpenAiConsultant, children: [
            "Dzień dobry! Masz pytania dotyczące zabiegów LHP®, FiLaC® lub przygotowania do wizyty? ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-300 hover:underline", children: "Porozmawiaj z Asystentem AI" }, void 0, false, {
              fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
              lineNumber: 43,
              columnNumber: 102
            }, this),
            "."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
            lineNumber: 42,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-teal-400 font-medium", children: "Odpowiedź w 2 sekundy" }, void 0, false, {
              fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
              lineNumber: 47,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("button", { onClick: onOpenAiConsultant, className: "text-purple-300 font-semibold hover:text-white flex items-center gap-0.5", children: "Rozpocznij czat →" }, void 0, false, {
              fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
              lineNumber: 48,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
            lineNumber: 46,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
        lineNumber: 17,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
      lineNumber: 15,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      motion.button,
      {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
        onClick: onOpenAiConsultant,
        className: "relative p-4 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-2xl shadow-purple-600/50 border border-purple-400/50 flex items-center justify-center group",
        title: "Otwórz czat na żywo z Asystentem AI CML",
        "aria-label": "Otwórz czat z Asystentem AI",
        children: [
          /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1 -right-1 flex h-3.5 w-3.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" }, void 0, false, {
              fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
              lineNumber: 66,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "relative inline-flex rounded-full h-3.5 w-3.5 bg-teal-500 border border-slate-900" }, void 0, false, {
              fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
              lineNumber: 67,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
            lineNumber: 65,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(MessageSquare, { className: "w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" }, void 0, false, {
            fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
            lineNumber: 70,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
        lineNumber: 57,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/FloatingChatWidget.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZsb2F0aW5nQ2hhdFdpZGdldC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWVzc2FnZVNxdWFyZSwgU3BhcmtsZXMsIFgsIFVzZXJDaGVjaywgQm90IH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnbW90aW9uL3JlYWN0JztcblxuaW50ZXJmYWNlIEZsb2F0aW5nQ2hhdFdpZGdldFByb3BzIHtcbiAgb25PcGVuQWlDb25zdWx0YW50OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgRmxvYXRpbmdDaGF0V2lkZ2V0OiBSZWFjdC5GQzxGbG9hdGluZ0NoYXRXaWRnZXRQcm9wcz4gPSAoeyBvbk9wZW5BaUNvbnN1bHRhbnQgfSkgPT4ge1xuICBjb25zdCBbc2hvd1Rvb2x0aXAsIHNldFNob3dUb29sdGlwXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tNiByaWdodC02IHotNDAgZmxleCBmbGV4LWNvbCBpdGVtcy1lbmQgZ2FwLTMgcG9pbnRlci1ldmVudHMtYXV0b1wiPlxuICAgICAgey8qIEZsb2F0aW5nIFRvb2x0aXAgTWVzc2FnZSAqL31cbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIHtzaG93VG9vbHRpcCAmJiAoXG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOSwgeTogMTAgfX1cbiAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEsIHk6IDAgfX1cbiAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOSwgeTogMTAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTUgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzQwIHNoYWRvdy0yeGwgYmFja2Ryb3AtYmx1ci1tZCBtYXgtdy14cyB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIGdyb3VwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBzZXRTaG93VG9vbHRpcChmYWxzZSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTIgcC0xIHJvdW5kZWQtZnVsbCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgIHRpdGxlPVwiWmFta25paiBwb2Rwb3dpZWTFulwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTEuNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy10ZWFsLTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXB1cnBsZS0zMDAgdGV4dC1bMTFweF0gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPEJvdCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIERyIEphbiBCdWpvayDCtyBBc3lzdGVudCBBSVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWQgY3Vyc29yLXBvaW50ZXJcIiBvbkNsaWNrPXtvbk9wZW5BaUNvbnN1bHRhbnR9PlxuICAgICAgICAgICAgICBEemllxYQgZG9icnkhIE1hc3ogcHl0YW5pYSBkb3R5Y3rEhWNlIHphYmllZ8OzdyBMSFDCriwgRmlMYUPCriBsdWIgcHJ6eWdvdG93YW5pYSBkbyB3aXp5dHk/IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwIGhvdmVyOnVuZGVybGluZVwiPlBvcm96bWF3aWFqIHogQXN5c3RlbnRlbSBBSTwvc3Ryb25nPi5cbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC10ZWFsLTQwMCBmb250LW1lZGl1bVwiPk9kcG93aWVkxbogdyAyIHNla3VuZHk8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25PcGVuQWlDb25zdWx0YW50fSBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZm9udC1zZW1pYm9sZCBob3Zlcjp0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0wLjVcIj5cbiAgICAgICAgICAgICAgICBSb3pwb2N6bmlqIGN6YXQg4oaSXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICApfVxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgIHsvKiBNYWluIEZsb2F0aW5nIFRyaWdnZXIgQnV0dG9uICovfVxuICAgICAgPG1vdGlvbi5idXR0b25cbiAgICAgICAgd2hpbGVIb3Zlcj17eyBzY2FsZTogMS4wNSB9fVxuICAgICAgICB3aGlsZVRhcD17eyBzY2FsZTogMC45NSB9fVxuICAgICAgICBvbkNsaWNrPXtvbk9wZW5BaUNvbnN1bHRhbnR9XG4gICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHAtNCByb3VuZGVkLWZ1bGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS02MDAgdmlhLWluZGlnby02MDAgdG8tcHVycGxlLTcwMCBob3Zlcjpmcm9tLXB1cnBsZS01MDAgaG92ZXI6dG8taW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy0yeGwgc2hhZG93LXB1cnBsZS02MDAvNTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdyb3VwXCJcbiAgICAgICAgdGl0bGU9XCJPdHfDs3J6IGN6YXQgbmEgxbx5d28geiBBc3lzdGVudGVtIEFJIENNTFwiXG4gICAgICAgIGFyaWEtbGFiZWw9XCJPdHfDs3J6IGN6YXQgeiBBc3lzdGVudGVtIEFJXCJcbiAgICAgID5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xIC1yaWdodC0xIGZsZXggaC0zLjUgdy0zLjVcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhbmltYXRlLXBpbmcgYWJzb2x1dGUgaW5saW5lLWZsZXggaC1mdWxsIHctZnVsbCByb3VuZGVkLWZ1bGwgYmctdGVhbC00MDAgb3BhY2l0eS03NVwiPjwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBpbmxpbmUtZmxleCByb3VuZGVkLWZ1bGwgaC0zLjUgdy0zLjUgYmctdGVhbC01MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDBcIj48L3NwYW4+XG4gICAgICAgIDwvc3Bhbj5cblxuICAgICAgICA8TWVzc2FnZVNxdWFyZSBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtd2hpdGUgZ3JvdXAtaG92ZXI6cm90YXRlLTEyIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMFwiIC8+XG4gICAgICA8L21vdGlvbi5idXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUE4QmM7QUE5QmQsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsZUFBeUIsR0FBYyxXQUFXO0FBQzNELFNBQVMsUUFBUSx1QkFBdUI7QUFNakMsYUFBTSxxQkFBd0QsQ0FBQyxFQUFFLG1CQUFtQixNQUFNO0FBQy9GLFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLElBQUk7QUFFbkQsU0FDRSx1QkFBQyxTQUFJLFdBQVUsaUZBRWI7QUFBQSwyQkFBQyxtQkFDRSx5QkFDQztBQUFBLE1BQUMsT0FBTztBQUFBLE1BQVA7QUFBQSxRQUNDLFNBQVMsRUFBRSxTQUFTLEdBQUcsT0FBTyxLQUFLLEdBQUcsR0FBRztBQUFBLFFBQ3pDLFNBQVMsRUFBRSxTQUFTLEdBQUcsT0FBTyxHQUFHLEdBQUcsRUFBRTtBQUFBLFFBQ3RDLE1BQU0sRUFBRSxTQUFTLEdBQUcsT0FBTyxLQUFLLEdBQUcsR0FBRztBQUFBLFFBQ3RDLFdBQVU7QUFBQSxRQUVWO0FBQUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVMsQ0FBQyxNQUFNO0FBQ2Qsa0JBQUUsZ0JBQWdCO0FBQ2xCLCtCQUFlLEtBQUs7QUFBQSxjQUN0QjtBQUFBLGNBQ0EsV0FBVTtBQUFBLGNBQ1YsT0FBTTtBQUFBLGNBRU4saUNBQUMsS0FBRSxXQUFVLGlCQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTJCO0FBQUE7QUFBQSxZQVI3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFTQTtBQUFBLFVBRUEsdUJBQUMsU0FBSSxXQUFVLGtDQUNiO0FBQUEsbUNBQUMsVUFBSyxXQUFVLG9EQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFpRTtBQUFBLFlBQ2pFLHVCQUFDLFVBQUssV0FBVSw4RkFDZDtBQUFBLHFDQUFDLE9BQUksV0FBVSxpQ0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE2QztBQUFBLGNBQUU7QUFBQSxpQkFEakQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLGVBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFNQTtBQUFBLFVBRUEsdUJBQUMsT0FBRSxXQUFVLDREQUEyRCxTQUFTLG9CQUFvQjtBQUFBO0FBQUEsWUFDWix1QkFBQyxZQUFPLFdBQVUsbUNBQWtDLDJDQUFwRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUErRTtBQUFBLFlBQVM7QUFBQSxlQURqTDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFFQSx1QkFBQyxTQUFJLFdBQVUsb0dBQ2I7QUFBQSxtQ0FBQyxVQUFLLFdBQVUsNkJBQTRCLHFDQUE1QztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFpRTtBQUFBLFlBQ2pFLHVCQUFDLFlBQU8sU0FBUyxvQkFBb0IsV0FBVSw0RUFBMkUsaUNBQTFIO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxlQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBS0E7QUFBQTtBQUFBO0FBQUEsTUFsQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBbUNBLEtBckNKO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F1Q0E7QUFBQSxJQUdBO0FBQUEsTUFBQyxPQUFPO0FBQUEsTUFBUDtBQUFBLFFBQ0MsWUFBWSxFQUFFLE9BQU8sS0FBSztBQUFBLFFBQzFCLFVBQVUsRUFBRSxPQUFPLEtBQUs7QUFBQSxRQUN4QixTQUFTO0FBQUEsUUFDVCxXQUFVO0FBQUEsUUFDVixPQUFNO0FBQUEsUUFDTixjQUFXO0FBQUEsUUFFWDtBQUFBLGlDQUFDLFVBQUssV0FBVSw2Q0FDZDtBQUFBLG1DQUFDLFVBQUssV0FBVSx5RkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBc0c7QUFBQSxZQUN0Ryx1QkFBQyxVQUFLLFdBQVUsdUZBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQW9HO0FBQUEsZUFGdEc7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBRUEsdUJBQUMsaUJBQWMsV0FBVSxnRkFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBc0c7QUFBQTtBQUFBO0FBQUEsTUFieEc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBY0E7QUFBQSxPQTFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMkRBO0FBRUo7IiwibmFtZXMiOltdfQ==