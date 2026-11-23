import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import { ArrowRight, Shield, Award, Calendar, Sparkles, PhoneCall } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
export const HeroSection = ({ onOpenAi }) => {
  return /* @__PURE__ */ jsxDEV(
    motion.section,
    {
      className: "relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 overflow-hidden",
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none -z-10" }, void 0, false, {
          fileName: "/app/applet/src/components/HeroSection.tsx",
          lineNumber: 18,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6 shadow-md", children: [
          /* @__PURE__ */ jsxDEV(Award, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 22,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dr Jan Bujok · Chirurg · Proktolog Laserowy · Warszawa Wilanów" }, void 0, false, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 23,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HeroSection.tsx",
          lineNumber: 21,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-slate-100 max-w-4xl mb-6 tracking-tight text-balance", children: [
          "To normalne, że czujesz ",
          /* @__PURE__ */ jsxDEV("em", { className: "italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-100 font-serif", children: "stres" }, void 0, false, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 28,
            columnNumber: 33
          }, this),
          ".",
          /* @__PURE__ */ jsxDEV("br", { className: "hidden sm:inline" }, void 0, false, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 29,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-2xl sm:text-4xl lg:text-5xl font-light text-slate-300 block mt-2", children: "Specjalistyczne leczenie proktologiczne bez bólu i skrępowania." }, void 0, false, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 30,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HeroSection.tsx",
          lineNumber: 27,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-lg text-slate-300 font-light max-w-2xl mb-8 leading-relaxed", children: "Spokojnie. Najpierw porozmawiamy. Potem zdecydujemy razem, co dalej. Innowacyjne, minimalnie inwazyjne procedury laserowe (LHP, FiLaC, SiLaC) w bezstresowej atmosferze." }, void 0, false, {
          fileName: "/app/applet/src/components/HeroSection.tsx",
          lineNumber: 36,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12", children: [
          /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: "#objawy",
              id: "hero-symptoms-btn",
              className: "inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-xl shadow-xl shadow-indigo-600/25 border border-indigo-400/40 transition-all hover:scale-105 active:scale-95 no-underline",
              children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Zacznijmy rozmowę (Objawy)" }, void 0, false, {
                  fileName: "/app/applet/src/components/HeroSection.tsx",
                  lineNumber: 47,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/HeroSection.tsx",
                  lineNumber: 48,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 42,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: "#sklep-medyczny",
              id: "hero-shop-btn",
              className: "inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-500 rounded-xl transition-all hover:scale-105 no-underline",
              children: /* @__PURE__ */ jsxDEV("span", { children: "E-Sklep & Pakiety" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 56,
                columnNumber: 11
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 51,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onOpenAi,
              id: "hero-ai-btn",
              className: "inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-purple-200 bg-purple-950/50 hover:bg-purple-900/70 border border-purple-500/40 rounded-xl transition-all hover:scale-105 focus:outline-none",
              children: [
                /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/HeroSection.tsx",
                  lineNumber: 64,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Zapytaj AI o zabiegi" }, void 0, false, {
                  fileName: "/app/applet/src/components/HeroSection.tsx",
                  lineNumber: 65,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 59,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HeroSection.tsx",
          lineNumber: 41,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl w-full text-left", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV(Shield, { className: "w-5 h-5 text-indigo-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 72,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-slate-200", children: "16+ Lat Praktyki" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 74,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400", children: "Specjalista chirurgii" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 75,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 73,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 71,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV(Award, { className: "w-5 h-5 text-purple-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 80,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-slate-200", children: "3000+ Zabiegów" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 82,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400", children: "Technikami laserowymi" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 83,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 81,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 79,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV(Calendar, { className: "w-5 h-5 text-teal-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 88,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-slate-200", children: "5.0 / 5 Ocena" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 90,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400", children: "312+ opinii ZnanyLekarz" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 91,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 89,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 87,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV(PhoneCall, { className: "w-5 h-5 text-indigo-300 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 96,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-semibold text-slate-200", children: "Szybkie Terminy" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 98,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400", children: "Konsultacje & E-recepta" }, void 0, false, {
                fileName: "/app/applet/src/components/HeroSection.tsx",
                lineNumber: 99,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/HeroSection.tsx",
              lineNumber: 97,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/HeroSection.tsx",
            lineNumber: 95,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/HeroSection.tsx",
          lineNumber: 70,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/HeroSection.tsx",
      lineNumber: 11,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlcm9TZWN0aW9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXJyb3dSaWdodCwgU2hpZWxkLCBBd2FyZCwgQ2FsZW5kYXIsIFNwYXJrbGVzLCBQaG9uZUNhbGwgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSAnbW90aW9uL3JlYWN0JztcblxuaW50ZXJmYWNlIEhlcm9TZWN0aW9uUHJvcHMge1xuICBvbk9wZW5BaTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IEhlcm9TZWN0aW9uOiBSZWFjdC5GQzxIZXJvU2VjdGlvblByb3BzPiA9ICh7IG9uT3BlbkFpIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8bW90aW9uLnNlY3Rpb25cbiAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIG1pbi1oLVs5MHZoXSBmbGV4IGZsZXgtY29sIGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciB0ZXh0LWNlbnRlciBweC00IHNtOnB4LTYgbGc6cHgtOCBwdC0yNCBwYi0xNiBvdmVyZmxvdy1oaWRkZW5cIlxuICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAzMCB9fVxuICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjcsIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdIH19XG4gICAgPlxuICAgICAgey8qIEJhY2tncm91bmQgYW1iaWVudCBnbG93ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS8zIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMiB3LVs1MDBweF0gaC1bNTAwcHhdIGJnLWdyYWRpZW50LXRvLXRyIGZyb20taW5kaWdvLTYwMC8xNSB2aWEtcHVycGxlLTYwMC8xMCB0by10ZWFsLTUwMC8xMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZSAtei0xMFwiIC8+XG5cbiAgICAgIHsvKiBEb2N0b3IgJiBMb2NhdGlvbiBFeWVicm93ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMy41IHB5LTEuNSByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTk1MC82MCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgdGV4dC1pbmRpZ28tMzAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy13aWRlIHVwcGVyY2FzZSBtYi02IHNoYWRvdy1tZFwiPlxuICAgICAgICA8QXdhcmQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgPHNwYW4+RHIgSmFuIEJ1am9rIMK3IENoaXJ1cmcgwrcgUHJva3RvbG9nIExhc2Vyb3d5IMK3IFdhcnN6YXdhIFdpbGFuw7N3PC9zcGFuPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIEgxIFRpdGxlICovfVxuICAgICAgPGgxIGNsYXNzTmFtZT1cImZvbnQtc2VyaWYgdGV4dC0zeGwgc206dGV4dC01eGwgbGc6dGV4dC02eGwgZm9udC1ub3JtYWwgbGVhZGluZy1bMS4xMl0gdGV4dC1zbGF0ZS0xMDAgbWF4LXctNHhsIG1iLTYgdHJhY2tpbmctdGlnaHQgdGV4dC1iYWxhbmNlXCI+XG4gICAgICAgIFRvIG5vcm1hbG5lLCDFvGUgY3p1amVzeiA8ZW0gY2xhc3NOYW1lPVwiaXRhbGljIHRleHQtdHJhbnNwYXJlbnQgYmctY2xpcC10ZXh0IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tMzAwIHZpYS1wdXJwbGUtMzAwIHRvLWluZGlnby0xMDAgZm9udC1zZXJpZlwiPnN0cmVzPC9lbT4uXG4gICAgICAgIDxiciBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCIgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0yeGwgc206dGV4dC00eGwgbGc6dGV4dC01eGwgZm9udC1saWdodCB0ZXh0LXNsYXRlLTMwMCBibG9jayBtdC0yXCI+XG4gICAgICAgICAgU3BlY2phbGlzdHljem5lIGxlY3plbmllIHByb2t0b2xvZ2ljem5lIGJleiBiw7NsdSBpIHNrcsSZcG93YW5pYS5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9oMT5cblxuICAgICAgey8qIFN1YnRpdGxlICovfVxuICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWxnIHRleHQtc2xhdGUtMzAwIGZvbnQtbGlnaHQgbWF4LXctMnhsIG1iLTggbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgIFNwb2tvam5pZS4gTmFqcGllcncgcG9yb3ptYXdpYW15LiBQb3RlbSB6ZGVjeWR1amVteSByYXplbSwgY28gZGFsZWouIElubm93YWN5am5lLCBtaW5pbWFsbmllIGlud2F6eWpuZSBwcm9jZWR1cnkgbGFzZXJvd2UgKExIUCwgRmlMYUMsIFNpTGFDKSB3IGJlenN0cmVzb3dlaiBhdG1vc2ZlcnplLlxuICAgICAgPC9wPlxuXG4gICAgICB7LyogQ2FsbCB0byBBY3Rpb25zICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTMgc206Z2FwLTQgbWItMTJcIj5cbiAgICAgICAgPGFcbiAgICAgICAgICBocmVmPVwiI29iamF3eVwiXG4gICAgICAgICAgaWQ9XCJoZXJvLXN5bXB0b21zLWJ0blwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTYgcHktMy41IHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHZpYS1wdXJwbGUtNjAwIHRvLWluZGlnby03MDAgaG92ZXI6ZnJvbS1pbmRpZ28tNTAwIGhvdmVyOnRvLWluZGlnby02MDAgcm91bmRlZC14bCBzaGFkb3cteGwgc2hhZG93LWluZGlnby02MDAvMjUgYm9yZGVyIGJvcmRlci1pbmRpZ28tNDAwLzQwIHRyYW5zaXRpb24tYWxsIGhvdmVyOnNjYWxlLTEwNSBhY3RpdmU6c2NhbGUtOTUgbm8tdW5kZXJsaW5lXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuPlphY3puaWpteSByb3ptb3fEmSAoT2JqYXd5KTwvc3Bhbj5cbiAgICAgICAgICA8QXJyb3dSaWdodCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgPC9hPlxuXG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj1cIiNza2xlcC1tZWR5Y3pueVwiXG4gICAgICAgICAgaWQ9XCJoZXJvLXNob3AtYnRuXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNiBweS0zLjUgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTIwMCBiZy1zbGF0ZS05MDAvODAgaG92ZXI6Ymctc2xhdGUtODAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzgwIGhvdmVyOmJvcmRlci1zbGF0ZS01MDAgcm91bmRlZC14bCB0cmFuc2l0aW9uLWFsbCBob3ZlcjpzY2FsZS0xMDUgbm8tdW5kZXJsaW5lXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuPkUtU2tsZXAgJiBQYWtpZXR5PC9zcGFuPlxuICAgICAgICA8L2E+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkFpfVxuICAgICAgICAgIGlkPVwiaGVyby1haS1idG5cIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC01IHB5LTMuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtcHVycGxlLTIwMCBiZy1wdXJwbGUtOTUwLzUwIGhvdmVyOmJnLXB1cnBsZS05MDAvNzAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzQwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgaG92ZXI6c2NhbGUtMTA1IGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgIDxzcGFuPlphcHl0YWogQUkgbyB6YWJpZWdpPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUXVpY2sgVHJ1c3QgSGlnaGxpZ2h0cyBHcmlkICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIG1kOmdyaWQtY29scy00IGdhcC0zIG1heC13LTR4bCB3LWZ1bGwgdGV4dC1sZWZ0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgYmFja2Ryb3AtYmx1ci1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPjE2KyBMYXQgUHJha3R5a2k8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5TcGVjamFsaXN0YSBjaGlydXJnaWk8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC81MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCBiYWNrZHJvcC1ibHVyLXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgPEF3YXJkIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wdXJwbGUtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDBcIj4zMDAwKyBaYWJpZWfDs3c8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5UZWNobmlrYW1pIGxhc2Vyb3d5bWk8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC81MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMC84MCBiYWNrZHJvcC1ibHVyLXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgPENhbGVuZGFyIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC10ZWFsLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+NS4wIC8gNSBPY2VuYTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPjMxMisgb3BpbmlpIFpuYW55TGVrYXJ6PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgYmFja2Ryb3AtYmx1ci1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgIDxQaG9uZUNhbGwgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby0zMDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPlN6eWJraWUgVGVybWlueTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPktvbnN1bHRhY2plICYgRS1yZWNlcHRhPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9tb3Rpb24uc2VjdGlvbj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQWlCTTtBQWhCTixTQUFTLFlBQVksUUFBUSxPQUFPLFVBQVUsVUFBVSxpQkFBaUI7QUFDekUsU0FBUyxjQUFjO0FBTWhCLGFBQU0sY0FBMEMsQ0FBQyxFQUFFLFNBQVMsTUFBTTtBQUN2RSxTQUNFO0FBQUEsSUFBQyxPQUFPO0FBQUEsSUFBUDtBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1YsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHLEdBQUc7QUFBQSxNQUM3QixTQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBRTtBQUFBLE1BQzVCLFlBQVksRUFBRSxVQUFVLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsRUFBRTtBQUFBLE1BR3JEO0FBQUEsK0JBQUMsU0FBSSxXQUFVLDJNQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBdU47QUFBQSxRQUd2Tix1QkFBQyxTQUFJLFdBQVUsdUxBQ2I7QUFBQSxpQ0FBQyxTQUFNLFdBQVUsaUNBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQStDO0FBQUEsVUFDL0MsdUJBQUMsVUFBSyw4RUFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFvRTtBQUFBLGFBRnRFO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQTtBQUFBLFFBR0EsdUJBQUMsUUFBRyxX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