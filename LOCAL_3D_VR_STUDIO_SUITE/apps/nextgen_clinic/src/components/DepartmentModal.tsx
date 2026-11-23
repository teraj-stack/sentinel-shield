import __vite__cjsImport0_react_jsxDevRuntime from "/apps/nextgen_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c2c0e3b9"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/nextgen_clinic/node_modules/.vite/deps/react.js?v=c2c0e3b9"; const useState = __vite__cjsImport1_react["useState"];
import {
  X,
  CheckCircle2,
  Clock,
  Calendar,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight,
  Info
} from "/apps/nextgen_clinic/node_modules/.vite/deps/lucide-react.js?v=93a6f22a";
export const DepartmentModal = ({
  department,
  onClose,
  onBookTreatment,
  lang
}) => {
  if (!department) return null;
  const [activeTab, setActiveTab] = useState("treatments");
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col", children: [
    /* @__PURE__ */ jsxDEV("div", { className: `relative p-6 sm:p-8 bg-gradient-to-r ${department.accentColor} text-white`, children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "absolute top-6 right-6 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors",
          children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/DepartmentModal.tsx",
            lineNumber: 46,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 42,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-w-2xl", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-white", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/DepartmentModal.tsx",
            lineNumber: 51,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: department.badge }, void 0, false, {
            fileName: "/app/applet/src/components/DepartmentModal.tsx",
            lineNumber: 52,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 50,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl sm:text-4xl font-extrabold tracking-tight font-sans", children: lang === "pl" ? department.namePl : department.name }, void 0, false, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 55,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base text-white/90 font-medium", children: department.subtitle }, void 0, false, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 59,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DepartmentModal.tsx",
        lineNumber: 49,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DepartmentModal.tsx",
      lineNumber: 40,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("treatments"),
          className: `px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all ${activeTab === "treatments" ? "bg-white text-sky-800 border-t-2 border-sky-600 shadow-xs" : "text-slate-600 hover:text-slate-900"}`,
          children: lang === "pl" ? "Zabiegi i Cennik" : "Treatments & Pricing"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 67,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("doctors"),
          className: `px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all ${activeTab === "doctors" ? "bg-white text-sky-800 border-t-2 border-sky-600 shadow-xs" : "text-slate-600 hover:text-slate-900"}`,
          children: lang === "pl" ? "Zespół Lekarski" : "Medical Team"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 78,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("tech"),
          className: `px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all ${activeTab === "tech" ? "bg-white text-sky-800 border-t-2 border-sky-600 shadow-xs" : "text-slate-600 hover:text-slate-900"}`,
          children: lang === "pl" ? "Technologia & Standardy" : "Tech & Standards"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 89,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DepartmentModal.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 sm:p-8 overflow-y-auto flex-1 space-y-6", children: [
      activeTab === "treatments" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 font-medium", children: department.fullDesc }, void 0, false, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 107,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-4", children: department.treatments.map((t) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 max-w-xl", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV("h4", { className: "text-base font-bold text-slate-900", children: t.title }, void 0, false, {
                    fileName: "/app/applet/src/components/DepartmentModal.tsx",
                    lineNumber: 119,
                    columnNumber: 25
                  }, this),
                  t.isPopular && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 border border-sky-200", children: lang === "pl" ? "Popularne" : "Popular" }, void 0, false, {
                    fileName: "/app/applet/src/components/DepartmentModal.tsx",
                    lineNumber: 123,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DepartmentModal.tsx",
                  lineNumber: 118,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-600 leading-relaxed", children: t.description }, void 0, false, {
                  fileName: "/app/applet/src/components/DepartmentModal.tsx",
                  lineNumber: 129,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 pt-1 text-[11px] font-semibold text-slate-500", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxDEV(Clock, { className: "w-3.5 h-3.5 text-sky-600" }, void 0, false, {
                      fileName: "/app/applet/src/components/DepartmentModal.tsx",
                      lineNumber: 135,
                      columnNumber: 27
                    }, this),
                    t.durationMinutes,
                    " min"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/DepartmentModal.tsx",
                    lineNumber: 134,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/components/DepartmentModal.tsx",
                    lineNumber: 138,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: t.category }, void 0, false, {
                    fileName: "/app/applet/src/components/DepartmentModal.tsx",
                    lineNumber: 139,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DepartmentModal.tsx",
                  lineNumber: 133,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DepartmentModal.tsx",
                lineNumber: 117,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-black text-slate-900", children: [
                  t.pricePln,
                  " PLN"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DepartmentModal.tsx",
                  lineNumber: 145,
                  columnNumber: 25
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/DepartmentModal.tsx",
                  lineNumber: 144,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      onClose();
                      onBookTreatment(department.id, t.id);
                    },
                    className: "px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs",
                    children: [
                      /* @__PURE__ */ jsxDEV(Calendar, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/DepartmentModal.tsx",
                        lineNumber: 157,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Rezerwuj" : "Book Now" }, void 0, false, {
                        fileName: "/app/applet/src/components/DepartmentModal.tsx",
                        lineNumber: 158,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/DepartmentModal.tsx",
                    lineNumber: 150,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DepartmentModal.tsx",
                lineNumber: 143,
                columnNumber: 21
              }, this)
            ]
          },
          t.id,
          true,
          {
            fileName: "/app/applet/src/components/DepartmentModal.tsx",
            lineNumber: 113,
            columnNumber: 19
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 111,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DepartmentModal.tsx",
        lineNumber: 106,
        columnNumber: 13
      }, this),
      activeTab === "doctors" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: department.doctors.map((doc) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4",
          children: [
            /* @__PURE__ */ jsxDEV(
              "img",
              {
                src: doc.avatar,
                alt: doc.name,
                className: "w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md",
                referrerPolicy: "no-referrer"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/DepartmentModal.tsx",
                lineNumber: 176,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-slate-900", children: doc.name }, void 0, false, {
                fileName: "/app/applet/src/components/DepartmentModal.tsx",
                lineNumber: 184,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-sky-700 font-semibold", children: doc.title }, void 0, false, {
                fileName: "/app/applet/src/components/DepartmentModal.tsx",
                lineNumber: 187,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: doc.specialty }, void 0, false, {
                fileName: "/app/applet/src/components/DepartmentModal.tsx",
                lineNumber: 190,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1 pt-1 text-[11px] font-semibold text-slate-600", children: [
                /* @__PURE__ */ jsxDEV(Award, { className: "w-3.5 h-3.5 text-amber-500" }, void 0, false, {
                  fileName: "/app/applet/src/components/DepartmentModal.tsx",
                  lineNumber: 194,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  doc.experienceYears,
                  " ",
                  lang === "pl" ? "lat doświadczenia" : "years exp."
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DepartmentModal.tsx",
                  lineNumber: 195,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DepartmentModal.tsx",
                lineNumber: 193,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DepartmentModal.tsx",
              lineNumber: 183,
              columnNumber: 21
            }, this)
          ]
        },
        doc.id,
        true,
        {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 172,
          columnNumber: 19
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/DepartmentModal.tsx",
        lineNumber: 170,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/DepartmentModal.tsx",
        lineNumber: 169,
        columnNumber: 13
      }, this),
      activeTab === "tech" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-sky-50/60 border border-sky-200/60 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-sky-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-sky-600" }, void 0, false, {
            fileName: "/app/applet/src/components/DepartmentModal.tsx",
            lineNumber: 209,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Kluczowe Innowacje" : "Key Innovation Standards" }, void 0, false, {
            fileName: "/app/applet/src/components/DepartmentModal.tsx",
            lineNumber: 210,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 208,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: department.features.map((feat, idx) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2 text-xs font-medium text-slate-700", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-500 shrink-0 mt-0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/DepartmentModal.tsx",
            lineNumber: 216,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: feat }, void 0, false, {
            fileName: "/app/applet/src/components/DepartmentModal.tsx",
            lineNumber: 217,
            columnNumber: 23
          }, this)
        ] }, idx, true, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 215,
          columnNumber: 21
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 213,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DepartmentModal.tsx",
        lineNumber: 207,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/DepartmentModal.tsx",
        lineNumber: 206,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DepartmentModal.tsx",
      lineNumber: 102,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs text-slate-500", children: [
        /* @__PURE__ */ jsxDEV(Info, { className: "w-4 h-4 text-sky-600" }, void 0, false, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 230,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Bezpieczne procedury ambulatoryjne z szybkim powrotem do zdrowia." : "Outpatient precision procedures with rapid recovery protocols." }, void 0, false, {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 231,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DepartmentModal.tsx",
        lineNumber: 229,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => {
            onClose();
            onBookTreatment(department.id);
          },
          className: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 text-white text-xs font-bold hover:from-sky-500 hover:to-indigo-500 shadow-md transition-all flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Umów Konsultację" : "Schedule Consultation" }, void 0, false, {
              fileName: "/app/applet/src/components/DepartmentModal.tsx",
              lineNumber: 241,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/DepartmentModal.tsx",
              lineNumber: 242,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/DepartmentModal.tsx",
          lineNumber: 234,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DepartmentModal.tsx",
      lineNumber: 228,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/DepartmentModal.tsx",
    lineNumber: 37,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/DepartmentModal.tsx",
    lineNumber: 34,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlcGFydG1lbnRNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFgsIFxuICBDaGVja0NpcmNsZTIsIFxuICBDbG9jaywgXG4gIFVzZXJDaGVjaywgXG4gIENhbGVuZGFyLCBcbiAgU3BhcmtsZXMsIFxuICBTaGllbGRDaGVjaywgXG4gIEF3YXJkLFxuICBDaGV2cm9uUmlnaHQsXG4gIEluZm9cbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IERlcGFydG1lbnQsIFRyZWF0bWVudCB9IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIERlcGFydG1lbnRNb2RhbFByb3BzIHtcbiAgZGVwYXJ0bWVudDogRGVwYXJ0bWVudCB8IG51bGw7XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uQm9va1RyZWF0bWVudDogKGRlcGFydG1lbnRJZDogc3RyaW5nLCB0cmVhdG1lbnRJZD86IHN0cmluZykgPT4gdm9pZDtcbiAgbGFuZzogJ3BsJyB8ICdlbic7XG59XG5cbmV4cG9ydCBjb25zdCBEZXBhcnRtZW50TW9kYWw6IFJlYWN0LkZDPERlcGFydG1lbnRNb2RhbFByb3BzPiA9ICh7XG4gIGRlcGFydG1lbnQsXG4gIG9uQ2xvc2UsXG4gIG9uQm9va1RyZWF0bWVudCxcbiAgbGFuZ1xufSkgPT4ge1xuICBpZiAoIWRlcGFydG1lbnQpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTwndHJlYXRtZW50cycgfCAnZG9jdG9ycycgfCAndGVjaCc+KCd0cmVhdG1lbnRzJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgc206cC02IGJnLXNsYXRlLTk1MC82MCBiYWNrZHJvcC1ibHVyLW1kIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0yMDBcIj5cbiAgICAgIFxuICAgICAgey8qIE1vZGFsIENhcmQgQ29udGFpbmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgbWF4LXctNHhsIG1heC1oLVs5MHZoXSBiZy13aGl0ZSByb3VuZGVkLTN4bCBzaGFkb3ctMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzgwIG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgIFxuICAgICAgICB7LyogSGVhZGVyIEJhbm5lciB3aXRoIFByaXNtIEFjY2VudCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2ByZWxhdGl2ZSBwLTYgc206cC04IGJnLWdyYWRpZW50LXRvLXIgJHtkZXBhcnRtZW50LmFjY2VudENvbG9yfSB0ZXh0LXdoaXRlYH0+XG4gICAgICAgICAgXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC02IHJpZ2h0LTYgcC0yIHJvdW5kZWQtZnVsbCBiZy1ibGFjay8yMCBob3ZlcjpiZy1ibGFjay80MCB0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG1heC13LTJ4bFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLXdoaXRlLzIwIGJhY2tkcm9wLWJsdXItbWQgdGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntkZXBhcnRtZW50LmJhZGdlfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC0yeGwgc206dGV4dC00eGwgZm9udC1leHRyYWJvbGQgdHJhY2tpbmctdGlnaHQgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gZGVwYXJ0bWVudC5uYW1lUGwgOiBkZXBhcnRtZW50Lm5hbWV9XG4gICAgICAgICAgICA8L2gyPlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSB0ZXh0LXdoaXRlLzkwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgIHtkZXBhcnRtZW50LnN1YnRpdGxlfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGFiIE5hdmlnYXRpb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTYgcHQtMyBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigndHJlYXRtZW50cycpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yLjUgcm91bmRlZC10LXhsIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3RyZWF0bWVudHMnXG4gICAgICAgICAgICAgICAgPyAnYmctd2hpdGUgdGV4dC1za3ktODAwIGJvcmRlci10LTIgYm9yZGVyLXNreS02MDAgc2hhZG93LXhzJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNjAwIGhvdmVyOnRleHQtc2xhdGUtOTAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnWmFiaWVnaSBpIENlbm5paycgOiAnVHJlYXRtZW50cyAmIFByaWNpbmcnfVxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdkb2N0b3JzJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIuNSByb3VuZGVkLXQteGwgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnZG9jdG9ycydcbiAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZSB0ZXh0LXNreS04MDAgYm9yZGVyLXQtMiBib3JkZXItc2t5LTYwMCBzaGFkb3cteHMnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdaZXNww7PFgiBMZWthcnNraScgOiAnTWVkaWNhbCBUZWFtJ31cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigndGVjaCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yLjUgcm91bmRlZC10LXhsIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3RlY2gnXG4gICAgICAgICAgICAgICAgPyAnYmctd2hpdGUgdGV4dC1za3ktODAwIGJvcmRlci10LTIgYm9yZGVyLXNreS02MDAgc2hhZG93LXhzJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNjAwIGhvdmVyOnRleHQtc2xhdGUtOTAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnVGVjaG5vbG9naWEgJiBTdGFuZGFyZHknIDogJ1RlY2ggJiBTdGFuZGFyZHMnfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTW9kYWwgU2Nyb2xsYWJsZSBCb2R5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiBzbTpwLTggb3ZlcmZsb3cteS1hdXRvIGZsZXgtMSBzcGFjZS15LTZcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogVEFCIDE6IFRSRUFUTUVOVFMgKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3RyZWF0bWVudHMnICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICB7ZGVwYXJ0bWVudC5mdWxsRGVzY31cbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIHtkZXBhcnRtZW50LnRyZWF0bWVudHMubWFwKCh0OiBUcmVhdG1lbnQpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAga2V5PXt0LmlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0yeGwgYmctc2xhdGUtNTAgaG92ZXI6Ymctc2xhdGUtMTAwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzgwIHRyYW5zaXRpb24tYWxsIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIG1heC13LXhsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3QudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAge3QuaXNQb3B1bGFyICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1leHRyYWJvbGQgcHgtMiBweS0wLjUgcm91bmRlZC1tZCBiZy1za3ktMTAwIHRleHQtc2t5LTgwMCBib3JkZXIgYm9yZGVyLXNreS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdQb3B1bGFybmUnIDogJ1BvcHVsYXInfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTYwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0LmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTQgcHQtMSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2xvY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3QuZHVyYXRpb25NaW51dGVzfSBtaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0LmNhdGVnb3J5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IHNtOmZsZXgtY29sIGl0ZW1zLWNlbnRlciBzbTppdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIGdhcC0yIGJvcmRlci10IHNtOmJvcmRlci10LTAgcHQtMyBzbTpwdC0wIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dC5wcmljZVBsbn0gUExOXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgb25Cb29rVHJlYXRtZW50KGRlcGFydG1lbnQuaWQsIHQuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctc2t5LTYwMCBob3ZlcjpiZy1za3ktNzAwIHRleHQtd2hpdGUgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3cteHNcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDYWxlbmRhciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ3BsJyA/ICdSZXplcnd1aicgOiAnQm9vayBOb3cnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIFRBQiAyOiBET0NUT1JTICovfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdkb2N0b3JzJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTZcIj5cbiAgICAgICAgICAgICAgICB7ZGVwYXJ0bWVudC5kb2N0b3JzLm1hcCgoZG9jKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGtleT17ZG9jLmlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0yeGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvODAgZmxleCBpdGVtcy1zdGFydCBnYXAtNFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICBzcmM9e2RvYy5hdmF0YXJ9XG4gICAgICAgICAgICAgICAgICAgICAgYWx0PXtkb2MubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgcm91bmRlZC0yeGwgb2JqZWN0LWNvdmVyIGJvcmRlci0yIGJvcmRlci13aGl0ZSBzaGFkb3ctbWRcIlxuICAgICAgICAgICAgICAgICAgICAgIHJlZmVycmVyUG9saWN5PVwibm8tcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZG9jLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2t5LTcwMCBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZG9jLnRpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZG9jLnNwZWNpYWx0eX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHQtMSB0ZXh0LVsxMXB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QXdhcmQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2RvYy5leHBlcmllbmNlWWVhcnN9IHtsYW5nID09PSAncGwnID8gJ2xhdCBkb8Wbd2lhZGN6ZW5pYScgOiAneWVhcnMgZXhwLid9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogVEFCIDM6IFRFQ0ggJiBTVEFOREFSRFMgKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3RlY2gnICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtMnhsIGJnLXNreS01MC82MCBib3JkZXIgYm9yZGVyLXNreS0yMDAvNjAgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtc2t5LTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1za3ktNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ0tsdWN6b3dlIElubm93YWNqZScgOiAnS2V5IElubm92YXRpb24gU3RhbmRhcmRzJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAge2RlcGFydG1lbnQuZmVhdHVyZXMubWFwKChmZWF0LCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMiB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC01MDAgc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZmVhdH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTW9kYWwgRm9vdGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBzbTpwLTYgYmctc2xhdGUtNTAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgIDxJbmZvIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1za3ktNjAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ0JlenBpZWN6bmUgcHJvY2VkdXJ5IGFtYnVsYXRvcnlqbmUgeiBzenlia2ltIHBvd3JvdGVtIGRvIHpkcm93aWEuJyA6ICdPdXRwYXRpZW50IHByZWNpc2lvbiBwcm9jZWR1cmVzIHdpdGggcmFwaWQgcmVjb3ZlcnkgcHJvdG9jb2xzLid9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBvbkNsb3NlKCk7XG4gICAgICAgICAgICAgIG9uQm9va1RyZWF0bWVudChkZXBhcnRtZW50LmlkKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1za3ktNjAwIHRvLWluZGlnby02MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtYm9sZCBob3Zlcjpmcm9tLXNreS01MDAgaG92ZXI6dG8taW5kaWdvLTUwMCBzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ1Vtw7N3IEtvbnN1bHRhY2rEmScgOiAnU2NoZWR1bGUgQ29uc3VsdGF0aW9uJ308L3NwYW4+XG4gICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTZDWTtBQTdDWixTQUFnQixnQkFBZ0I7QUFDaEM7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFD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