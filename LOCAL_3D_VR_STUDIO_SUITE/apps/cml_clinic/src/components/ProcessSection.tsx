import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import { MessageSquare, Stethoscope, CheckCircle, FileText } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
export const ProcessSection = () => {
  const steps = [
    {
      num: "01",
      icon: MessageSquare,
      title: "Wywiad & Objaw",
      desc: "Opisujesz co czujesz własnymi słowami. Dopytuję krótkimi, pomocniczymi pytaniami. Bez oceniania."
    },
    {
      num: "02",
      icon: Stethoscope,
      title: "Krótkie Badanie",
      desc: "Proste badanie w komfortowej pozycji bocznej. Natychmiast przerywam, jeśli poczujesz ból."
    },
    {
      num: "03",
      icon: CheckCircle,
      title: "Weryfikacja Diagnozy",
      desc: "Weryfikuję dotychczasowe rozpoznanie. 90% diagnoz stawianych samodzielnie w sieci bywa błędnych."
    },
    {
      num: "04",
      icon: FileText,
      title: "Wspólny Plan",
      desc: "Przedstawiam możliwości. Laser to jedna z opcji. Decyzję podejmujemy razem po pełnym wyjaśnieniu."
    }
  ];
  return /* @__PURE__ */ jsxDEV(
    motion.section,
    {
      className: "py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto",
      id: "wizyta",
      initial: { opacity: 0, y: 35 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-2xl mx-auto mb-12", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2", children: "Jak wygląda wizyta" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessSection.tsx",
            lineNumber: 43,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-4xl font-normal text-slate-100 mb-4", children: "Od objawu do bezpiecznego planu leczenia" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessSection.tsx",
            lineNumber: 46,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-300 font-light", children: "Każdy krok prowadzę spokojnie, w Twoim indywidualnym tempie. Poniżej znajduje się przebieg wzorcowej konsultacji." }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessSection.tsx",
            lineNumber: 49,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessSection.tsx",
          lineNumber: 42,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: steps.map((step) => {
          const IconComp = step.icon;
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 backdrop-blur-md transition-all relative group flex flex-col justify-between",
              children: /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs font-bold text-indigo-400 tracking-wider", children: [
                    "KROK ",
                    step.num
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessSection.tsx",
                    lineNumber: 64,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-9 h-9 rounded-xl bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-300 group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxDEV(IconComp, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessSection.tsx",
                    lineNumber: 68,
                    columnNumber: 21
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessSection.tsx",
                    lineNumber: 67,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessSection.tsx",
                  lineNumber: 63,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-base text-slate-100 mb-2", children: step.title }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessSection.tsx",
                  lineNumber: 72,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-light leading-relaxed", children: step.desc }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessSection.tsx",
                  lineNumber: 73,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessSection.tsx",
                lineNumber: 62,
                columnNumber: 15
              }, this)
            },
            step.num,
            false,
            {
              fileName: "/app/applet/src/components/ProcessSection.tsx",
              lineNumber: 58,
              columnNumber: 13
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessSection.tsx",
          lineNumber: 54,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/ProcessSection.tsx",
      lineNumber: 34,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2Nlc3NTZWN0aW9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTWVzc2FnZVNxdWFyZSwgU3RldGhvc2NvcGUsIENoZWNrQ2lyY2xlLCBGaWxlVGV4dCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgUHJvY2Vzc1NlY3Rpb246IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBzdGVwcyA9IFtcbiAgICB7XG4gICAgICBudW06ICcwMScsXG4gICAgICBpY29uOiBNZXNzYWdlU3F1YXJlLFxuICAgICAgdGl0bGU6ICdXeXdpYWQgJiBPYmphdycsXG4gICAgICBkZXNjOiAnT3Bpc3VqZXN6IGNvIGN6dWplc3ogd8WCYXNueW1pIHPFgm93YW1pLiBEb3B5dHVqxJkga3LDs3RraW1pLCBwb21vY25pY3p5bWkgcHl0YW5pYW1pLiBCZXogb2NlbmlhbmlhLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBudW06ICcwMicsXG4gICAgICBpY29uOiBTdGV0aG9zY29wZSxcbiAgICAgIHRpdGxlOiAnS3LDs3RraWUgQmFkYW5pZScsXG4gICAgICBkZXNjOiAnUHJvc3RlIGJhZGFuaWUgdyBrb21mb3J0b3dlaiBwb3p5Y2ppIGJvY3puZWouIE5hdHljaG1pYXN0IHByemVyeXdhbSwgamXFm2xpIHBvY3p1amVzeiBiw7NsLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBudW06ICcwMycsXG4gICAgICBpY29uOiBDaGVja0NpcmNsZSxcbiAgICAgIHRpdGxlOiAnV2VyeWZpa2FjamEgRGlhZ25venknLFxuICAgICAgZGVzYzogJ1dlcnlmaWt1asSZIGRvdHljaGN6YXNvd2Ugcm96cG96bmFuaWUuIDkwJSBkaWFnbm96IHN0YXdpYW55Y2ggc2Ftb2R6aWVsbmllIHcgc2llY2kgYnl3YSBixYLEmWRueWNoLicsXG4gICAgfSxcbiAgICB7XG4gICAgICBudW06ICcwNCcsXG4gICAgICBpY29uOiBGaWxlVGV4dCxcbiAgICAgIHRpdGxlOiAnV3Nww7NsbnkgUGxhbicsXG4gICAgICBkZXNjOiAnUHJ6ZWRzdGF3aWFtIG1vxbxsaXdvxZtjaS4gTGFzZXIgdG8gamVkbmEgeiBvcGNqaS4gRGVjeXpqxJkgcG9kZWptdWplbXkgcmF6ZW0gcG8gcGXFgm55bSB3eWphxZtuaWVuaXUuJyxcbiAgICB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPG1vdGlvbi5zZWN0aW9uXG4gICAgICBjbGFzc05hbWU9XCJweS0yMCBweC00IHNtOnB4LTYgbGc6cHgtOCBtYXgtdy02eGwgbXgtYXV0b1wiXG4gICAgICBpZD1cIndpenl0YVwiXG4gICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDM1IH19XG4gICAgICB3aGlsZUluVmlldz17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICB2aWV3cG9ydD17eyBvbmNlOiB0cnVlLCBtYXJnaW46ICctNjBweCcgfX1cbiAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuNiwgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0gfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1heC13LTJ4bCBteC1hdXRvIG1iLTEyXCI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtaW5kaWdvLTQwMCBtYi0yXCI+XG4gICAgICAgICAgSmFrIHd5Z2zEhWRhIHdpenl0YVxuICAgICAgICA8L3A+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQtMnhsIHNtOnRleHQtNHhsIGZvbnQtbm9ybWFsIHRleHQtc2xhdGUtMTAwIG1iLTRcIj5cbiAgICAgICAgICBPZCBvYmphd3UgZG8gYmV6cGllY3puZWdvIHBsYW51IGxlY3plbmlhXG4gICAgICAgIDwvaDI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS0zMDAgZm9udC1saWdodFwiPlxuICAgICAgICAgIEthxbxkeSBrcm9rIHByb3dhZHrEmSBzcG9rb2puaWUsIHcgVHdvaW0gaW5keXdpZHVhbG55bSB0ZW1waWUuIFBvbmnFvGVqIHpuYWpkdWplIHNpxJkgcHJ6ZWJpZWcgd3pvcmNvd2VqIGtvbnN1bHRhY2ppLlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC00XCI+XG4gICAgICAgIHtzdGVwcy5tYXAoKHN0ZXApID0+IHtcbiAgICAgICAgICBjb25zdCBJY29uQ29tcCA9IHN0ZXAuaWNvbjtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e3N0ZXAubnVtfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAgYmFja2Ryb3AtYmx1ci1tZCB0cmFuc2l0aW9uLWFsbCByZWxhdGl2ZSBncm91cCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIHRleHQtaW5kaWdvLTQwMCB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgICBLUk9LIHtzdGVwLm51bX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy05IGgtOSByb3VuZGVkLXhsIGJnLWluZGlnby05NTAvODAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtaW5kaWdvLTMwMCBncm91cC1ob3ZlcjpzY2FsZS0xMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm1cIj5cbiAgICAgICAgICAgICAgICAgICAgPEljb25Db21wIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWJhc2UgdGV4dC1zbGF0ZS0xMDAgbWItMlwiPntzdGVwLnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LWxpZ2h0IGxlYWRpbmctcmVsYXhlZFwiPntzdGVwLmRlc2N9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgPC9tb3Rpb24uc2VjdGlvbj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTBDUTtBQXpDUixTQUFTLGVBQWUsYUFBYSxhQUFhLGdCQUFnQjtBQUNsRSxTQUFTLGNBQWM7QUFFaEIsYUFBTSxpQkFBMkIsTUFBTTtBQUM1QyxRQUFNLFFBQVE7QUFBQSxJQUNaO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQTtBQUFBLE1BQ0UsS0FBSztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxLQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFFQSxTQUNFO0FBQUEsSUFBQyxPQUFPO0FBQUEsSUFBUDtBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1YsSUFBRztBQUFBLE1BQ0gsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHLEdBQUc7QUFBQSxNQUM3QixhQUFhLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBRTtBQUFBLE1BQ2hDLFVBQVUsRUFBRSxNQUFNLE1BQU0sUUFBUSxRQUFRO0FBQUEsTUFDeEMsWUFBWSxFQUFFLFVBQVUsS0FBSyxNQUFNLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxFQUFFO0FBQUEsTUFFckQ7QUFBQSwrQkFBQyxTQUFJLFdBQVUsdUNBQ2I7QUFBQSxpQ0FBQyxPQUFFLFdBQVUsd0VBQXVFLGtDQUFwRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxRQUFHLFdBQVUsbUVBQWtFLHdEQUFoRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxPQUFFLFdBQVUscUNBQW9DLGlJQUFqRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFURjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBVUE7QUFBQSxRQUVBLHVCQUFDLFNBQUksV0FBVSx3REFDWixnQkFBTSxJQUFJLENBQUMsU0FBUztBQUNuQixnQkFBTSxXQUFXLEtBQUs7QUFDdEIsaUJBQ0U7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUVDLFdBQVU7QUFBQSxjQUVWLGlDQUFDLFNBQ0M7QUFBQSx1Q0FBQyxTQUFJLFdBQVUsMENBQ2I7QUFBQSx5Q0FBQyxVQUFLLFdBQVUsOERBQTZEO0FBQUE7QUFBQSxvQkFDckUsS0FBSztBQUFBLHVCQURiO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRUE7QUFBQSxrQkFDQSx1QkFBQyxTQUFJLFdBQVUsK0pBQ2IsaUNBQUMsWUFBUyxXQUFVLGFBQXBCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQThCLEtBRGhDO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRUE7QUFBQSxxQkFORjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQU9BO0FBQUEsZ0JBRUEsdUJBQUMsUUFBRyxXQUFVLCtDQUErQyxlQUFLLFNBQWxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXdFO0FBQUEsZ0JBQ3hFLHVCQUFDLE9BQUUsV0FBVSxxREFBcUQsZUFBSyxRQUF2RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUE0RTtBQUFBLG1CQVg5RTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQVlBO0FBQUE7QUFBQSxZQWZLLEtBQUs7QUFBQSxZQURaO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFpQkE7QUFBQSxRQUVKLENBQUMsS0F2Qkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXdCQTtBQUFBO0FBQUE7QUFBQSxJQTVDRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUE2Q0E7QUFFSjsiLCJuYW1lcyI6W119