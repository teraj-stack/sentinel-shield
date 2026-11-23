import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { Calculator, ShieldCheck, Check, Sparkles, Calendar, ArrowRight } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
const procedures = [
  {
    id: "LHP",
    name: "Laserowe Leczenie Hemoroidów",
    code: "LHP® (LaserHemorrhoidoPlasty)",
    description: "Bezwycięciowa, małoinwazyjna procedura zamknięcia guzków krwawniczych światłem światłowodu radialnego.",
    basePrice: 3800,
    anesthesiaDefault: "local",
    recommendedDays: "1-2 dni"
  },
  {
    id: "FiLaC",
    name: "Laserowe Zamknięcie Przetoki Odbytu",
    code: "FiLaC® (Fistula-tract Laser Closure)",
    description: "Precyzyjna koagulacja kanału przetoki bez uszkodzenia zwieraczy odbytu.",
    basePrice: 4200,
    anesthesiaDefault: "sedation",
    recommendedDays: "2-3 dni"
  },
  {
    id: "SiLaC",
    name: "Laserowe Usuwanie Torbieli Włosowej",
    code: "SiLaC® (Sinus Laser Closure)",
    description: "Oparta na laserze technika leczenia torbieli kości guzicznej z minimalnym ryzykiem nawrotu.",
    basePrice: 3500,
    anesthesiaDefault: "local",
    recommendedDays: "1-2 dni"
  },
  {
    id: "Fissure",
    name: "Plastyka Laserowa Szczeliny Odbytu",
    code: "Laser Fissurectomy",
    description: "Odbudowa śluzówki i rozluźnienie zwieracza światłem lasera bez bolesnych nacięć.",
    basePrice: 3200,
    anesthesiaDefault: "local",
    recommendedDays: "1 dzień"
  }
];
export const TreatmentCalculator = ({
  onBookConsultation,
  crystalCount = 0
}) => {
  const [selectedProcedure, setSelectedProcedure] = useState(procedures[0]);
  const [severityGrade, setSeverityGrade] = useState("I-II");
  const [anesthesiaType, setAnesthesiaType] = useState("local");
  const [includePostOpKit, setIncludePostOpKit] = useState(true);
  const [includeControlVisits, setIncludeControlVisits] = useState(true);
  const [includeHistopathology, setIncludeHistopathology] = useState(false);
  const crystalDiscount = Math.min(crystalCount * 30, 150);
  const calculateTotal = () => {
    let total = selectedProcedure.basePrice;
    if (severityGrade === "III") total += 600;
    if (severityGrade === "IV") total += 1200;
    if (anesthesiaType === "sedation") total += 800;
    if (includePostOpKit) total += 220;
    if (includeControlVisits) total += 350;
    if (includeHistopathology) total += 250;
    total -= crystalDiscount;
    return Math.max(0, total);
  };
  const totalPrice = calculateTotal();
  return /* @__PURE__ */ jsxDEV("section", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto", id: "kalkulator-zabiegow", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden text-slate-900", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
      lineNumber: 100,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-3", children: [
        /* @__PURE__ */ jsxDEV(Calculator, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 105,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Kalkulator Kosztów & Estymator CML" }, void 0, false, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 106,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
        lineNumber: 104,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-slate-900", children: "Oszacuj Koszt Zabiegu Laserowego" }, void 0, false, {
        fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-600 font-normal mt-2", children: "Sprawdź szacunkową cenę leczenia laserowego (LHP®, FiLaC®, SiLaC®) u dr. Jana Bujoka wraz ze wszystkimi elementami opieki pooperacyjnej." }, void 0, false, {
        fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
        lineNumber: 111,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
      lineNumber: 103,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold uppercase tracking-wider text-purple-800 mb-3 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]", children: "1" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 122,
              columnNumber: 17
            }, this),
            "Wybierz Metodę Laserową:"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 121,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: procedures.map((proc) => {
            const isSelected = selectedProcedure.id === proc.id;
            return /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSelectedProcedure(proc);
                  setAnesthesiaType(proc.anesthesiaDefault);
                },
                className: `p-4 rounded-2xl text-left transition-all border flex flex-col justify-between ${isSelected ? "bg-purple-50/90 border-purple-500 shadow-md shadow-purple-900/10" : "bg-slate-50 border-slate-200 hover:border-slate-300"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs sm:text-sm text-slate-900", children: proc.name }, void 0, false, {
                        fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                        lineNumber: 144,
                        columnNumber: 27
                      }, this),
                      isSelected && /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-purple-600 shrink-0" }, void 0, false, {
                        fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                        lineNumber: 145,
                        columnNumber: 42
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                      lineNumber: 143,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-purple-700 font-bold block mb-2", children: proc.code }, void 0, false, {
                      fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                      lineNumber: 147,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-600 leading-snug line-clamp-2", children: proc.description }, void 0, false, {
                      fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                      lineNumber: 148,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                    lineNumber: 142,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-medium", children: "Cena od:" }, void 0, false, {
                      fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                      lineNumber: 151,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-slate-900", children: [
                      proc.basePrice,
                      " zł"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                      lineNumber: 152,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                    lineNumber: 150,
                    columnNumber: 23
                  }, this)
                ]
              },
              proc.id,
              true,
              {
                fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                lineNumber: 129,
                columnNumber: 21
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 125,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 120,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold uppercase tracking-wider text-purple-800 mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]", children: "2" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 163,
              columnNumber: 17
            }, this),
            "Stopień Zaawansowania Zmian / Złożoność:"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 162,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2", children: [
            { grade: "I-II", label: "Stopień I - II", note: "Standardowy" },
            { grade: "III", label: "Stopień III", note: "+600 zł" },
            { grade: "IV", label: "Stopień IV / Złożony", note: "+1200 zł" }
          ].map((item) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => setSeverityGrade(item.grade),
              className: `py-2.5 px-2 rounded-xl text-center text-xs font-medium transition-all border ${severityGrade === item.grade ? "bg-purple-600 text-white border-purple-600 font-bold shadow" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"}`,
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "block", children: item.label }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 182,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-normal opacity-90 block", children: item.note }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 183,
                  columnNumber: 21
                }, this)
              ]
            },
            item.grade,
            true,
            {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 172,
              columnNumber: 19
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 166,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 161,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold uppercase tracking-wider text-purple-800 mb-2 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]", children: "3" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 192,
              columnNumber: 17
            }, this),
            "Rodzaj Znieczulenia:"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 191,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setAnesthesiaType("local"),
                className: `p-3 rounded-xl text-left border transition-all ${anesthesiaType === "local" ? "bg-purple-50 border-purple-400 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-xs text-slate-900", children: "Znieczulenie Miejscowe" }, void 0, false, {
                    fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                    lineNumber: 205,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-teal-700 font-semibold", children: "W cenie bazowej zabiegu" }, void 0, false, {
                    fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                    lineNumber: 206,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                lineNumber: 196,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setAnesthesiaType("sedation"),
                className: `p-3 rounded-xl text-left border transition-all ${anesthesiaType === "sedation" ? "bg-purple-50 border-purple-400 text-slate-900" : "bg-white border-slate-200 text-slate-600"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-xs text-slate-900", children: "Sedacja Dożylna / Analgosedacja" }, void 0, false, {
                    fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                    lineNumber: 218,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-purple-700 font-semibold", children: "+800 zł (Obecność anestezjologa)" }, void 0, false, {
                    fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                    lineNumber: 219,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                lineNumber: 209,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 195,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 190,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold uppercase tracking-wider text-purple-800 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]", children: "4" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 227,
              columnNumber: 17
            }, this),
            "Opcje Dodatkowe i Pakiet Pooperacyjny:"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 226,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: includePostOpKit,
                  onChange: (e) => setIncludePostOpKit(e.target.checked),
                  className: "w-4 h-4 accent-purple-600 rounded"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 233,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-900 block", children: "Dedykowany Zestaw Ochronny CML" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 240,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-600", children: "Specjalistyczne maści regeneracyjne, czopki i zioła nasiadowe" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 241,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                lineNumber: 239,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 232,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-800 shrink-0", children: "+220 zł" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 244,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 231,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: includeControlVisits,
                  onChange: (e) => setIncludeControlVisits(e.target.checked),
                  className: "w-4 h-4 accent-purple-600 rounded"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 249,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-900 block", children: "Pakiet 2 Kontroli Pooperacyjnych" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 256,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-600", children: "Gwarantowane konsultacje po 7 i 30 dniach u dr. Bujoka" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 257,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                lineNumber: 255,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 248,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-800 shrink-0", children: "+350 zł" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 260,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 247,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("label", { className: "flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 cursor-pointer hover:border-slate-300", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "checkbox",
                  checked: includeHistopathology,
                  onChange: (e) => setIncludeHistopathology(e.target.checked),
                  className: "w-4 h-4 accent-purple-600 rounded"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 265,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-900 block", children: "Badanie Histopatologiczne" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 272,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-600", children: "Weryfikacja laboratoryjna pobranych tkanek" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 273,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                lineNumber: 271,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 264,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-800 shrink-0", children: "+250 zł" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 276,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 263,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 225,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
        lineNumber: 118,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 sticky top-24", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl relative", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4 border-b border-slate-800 pb-4", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 286,
              columnNumber: 19
            }, this),
            "Podsumowanie Wykalkulowane"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 285,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-500/30 text-[10px] font-semibold", children: [
            "Powrót: ~",
            selectedProcedure.recommendedDays
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 289,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 284,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-xs mb-6 text-slate-300", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Wybrany zabieg:" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 296,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-100", children: selectedProcedure.name }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 297,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 295,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Baza opłaty:" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 300,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-slate-200", children: [
              selectedProcedure.basePrice,
              " zł"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 301,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 299,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
              "Złożoność (Stopień ",
              severityGrade,
              "):"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 304,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-slate-200", children: severityGrade === "I-II" ? "0 zł" : severityGrade === "III" ? "+600 zł" : "+1200 zł" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 305,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 303,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Znieczulenie:" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 310,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-slate-200", children: anesthesiaType === "local" ? "Miejscowe (0 zł)" : "Sedacja (+800 zł)" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 311,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 309,
            columnNumber: 17
          }, this),
          includePostOpKit && /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-purple-300", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "+ Dedykowany Zestaw Ochronny:" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 318,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono", children: "220 zł" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 319,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 317,
            columnNumber: 19
          }, this),
          includeControlVisits && /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-purple-300", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "+ Pakiet 2 Kontroli:" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 324,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono", children: "350 zł" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 325,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 323,
            columnNumber: 19
          }, this),
          includeHistopathology && /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-purple-300", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "+ Badanie Histopatologiczne:" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 330,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono", children: "250 zł" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 331,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 329,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-amber-300 font-bold border-t border-slate-800 pt-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-amber-400 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                lineNumber: 338,
                columnNumber: 21
              }, this),
              "Rabat Wyedukowanego Pacjenta (💎 ",
              crystalCount,
              "/5):"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 337,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-amber-300", children: [
              "-",
              crystalDiscount,
              " zł"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 341,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 336,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 294,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950 border border-purple-500/30 text-center mb-6", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-semibold uppercase text-slate-400 block mb-1", children: "Szacowany Koszt Całkowity Zabiegu:" }, void 0, false, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 347,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-100 to-indigo-200", children: [
            totalPrice,
            " PLN"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 350,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "block text-[10px] text-slate-400 mt-1", children: "Możliwość płatności w ratach medycznych (MediRaty od ~110 zł/mc)" }, void 0, false, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 353,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 346,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: "#rezerwacja",
              onClick: () => onBookConsultation && onBookConsultation(),
              className: "w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Calendar, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 365,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Zarezerwuj Konsultację Kwalifikacyjną" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 366,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
                  lineNumber: 367,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 360,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-purple-400 shrink-0 mt-0.5" }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 371,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Ostateczna wycena ustalana jest podczas bezbolesnej konsultacji proktologicznej z dr. Janem Bujokiem po dokładnym badaniu Anoskopowym/Rektoskopowym." }, void 0, false, {
              fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
              lineNumber: 372,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
            lineNumber: 370,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
          lineNumber: 359,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
        lineNumber: 283,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
        lineNumber: 282,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
      lineNumber: 116,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
    lineNumber: 98,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/TreatmentCalculator.tsx",
    lineNumber: 97,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRyZWF0bWVudENhbGN1bGF0b3IudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENhbGN1bGF0b3IsIFNoaWVsZENoZWNrLCBDaGVjaywgU3BhcmtsZXMsIENhbGVuZGFyLCBBcnJvd1JpZ2h0IH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIFByb2NlZHVyZU9wdGlvbiB7XG4gIGlkOiAnTEhQJyB8ICdGaUxhQycgfCAnU2lMYUMnIHwgJ0Zpc3N1cmUnO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgYmFzZVByaWNlOiBudW1iZXI7XG4gIGFuZXN0aGVzaWFEZWZhdWx0OiAnbG9jYWwnIHwgJ3NlZGF0aW9uJztcbiAgcmVjb21tZW5kZWREYXlzOiBzdHJpbmc7XG59XG5cbmNvbnN0IHByb2NlZHVyZXM6IFByb2NlZHVyZU9wdGlvbltdID0gW1xuICB7XG4gICAgaWQ6ICdMSFAnLFxuICAgIG5hbWU6ICdMYXNlcm93ZSBMZWN6ZW5pZSBIZW1vcm9pZMOzdycsXG4gICAgY29kZTogJ0xIUMKuIChMYXNlckhlbW9ycmhvaWRvUGxhc3R5KScsXG4gICAgZGVzY3JpcHRpb246ICdCZXp3eWNpxJljaW93YSwgbWHFgm9pbndhenlqbmEgcHJvY2VkdXJhIHphbWtuacSZY2lhIGd1emvDs3cga3J3YXduaWN6eWNoIMWbd2lhdMWCZW0gxZt3aWF0xYJvd29kdSByYWRpYWxuZWdvLicsXG4gICAgYmFzZVByaWNlOiAzODAwLFxuICAgIGFuZXN0aGVzaWFEZWZhdWx0OiAnbG9jYWwnLFxuICAgIHJlY29tbWVuZGVkRGF5czogJzEtMiBkbmknLFxuICB9LFxuICB7XG4gICAgaWQ6ICdGaUxhQycsXG4gICAgbmFtZTogJ0xhc2Vyb3dlIFphbWtuacSZY2llIFByemV0b2tpIE9kYnl0dScsXG4gICAgY29kZTogJ0ZpTGFDwq4gKEZpc3R1bGEtdHJhY3QgTGFzZXIgQ2xvc3VyZSknLFxuICAgIGRlc2NyaXB0aW9uOiAnUHJlY3l6eWpuYSBrb2FndWxhY2phIGthbmHFgnUgcHJ6ZXRva2kgYmV6IHVzemtvZHplbmlhIHp3aWVyYWN6eSBvZGJ5dHUuJyxcbiAgICBiYXNlUHJpY2U6IDQyMDAsXG4gICAgYW5lc3RoZXNpYURlZmF1bHQ6ICdzZWRhdGlvbicsXG4gICAgcmVjb21tZW5kZWREYXlzOiAnMi0zIGRuaScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ1NpTGFDJyxcbiAgICBuYW1lOiAnTGFzZXJvd2UgVXN1d2FuaWUgVG9yYmllbGkgV8WCb3Nvd2VqJyxcbiAgICBjb2RlOiAnU2lMYUPCriAoU2ludXMgTGFzZXIgQ2xvc3VyZSknLFxuICAgIGRlc2NyaXB0aW9uOiAnT3BhcnRhIG5hIGxhc2VyemUgdGVjaG5pa2EgbGVjemVuaWEgdG9yYmllbGkga2/Fm2NpIGd1emljem5laiB6IG1pbmltYWxueW0gcnl6eWtpZW0gbmF3cm90dS4nLFxuICAgIGJhc2VQcmljZTogMzUwMCxcbiAgICBhbmVzdGhlc2lhRGVmYXVsdDogJ2xvY2FsJyxcbiAgICByZWNvbW1lbmRlZERheXM6ICcxLTIgZG5pJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnRmlzc3VyZScsXG4gICAgbmFtZTogJ1BsYXN0eWthIExhc2Vyb3dhIFN6Y3plbGlueSBPZGJ5dHUnLFxuICAgIGNvZGU6ICdMYXNlciBGaXNzdXJlY3RvbXknLFxuICAgIGRlc2NyaXB0aW9uOiAnT2RidWRvd2EgxZtsdXrDs3draSBpIHJvemx1xbpuaWVuaWUgendpZXJhY3phIMWbd2lhdMWCZW0gbGFzZXJhIGJleiBib2xlc255Y2ggbmFjacSZxIcuJyxcbiAgICBiYXNlUHJpY2U6IDMyMDAsXG4gICAgYW5lc3RoZXNpYURlZmF1bHQ6ICdsb2NhbCcsXG4gICAgcmVjb21tZW5kZWREYXlzOiAnMSBkemllxYQnLFxuICB9LFxuXTtcblxuaW50ZXJmYWNlIFRyZWF0bWVudENhbGN1bGF0b3JQcm9wcyB7XG4gIG9uQm9va0NvbnN1bHRhdGlvbj86ICgpID0+IHZvaWQ7XG4gIGNyeXN0YWxDb3VudD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGNvbnN0IFRyZWF0bWVudENhbGN1bGF0b3I6IFJlYWN0LkZDPFRyZWF0bWVudENhbGN1bGF0b3JQcm9wcz4gPSAoe1xuICBvbkJvb2tDb25zdWx0YXRpb24sXG4gIGNyeXN0YWxDb3VudCA9IDAsXG59KSA9PiB7XG4gIGNvbnN0IFtzZWxlY3RlZFByb2NlZHVyZSwgc2V0U2VsZWN0ZWRQcm9jZWR1cmVdID0gdXNlU3RhdGU8UHJvY2VkdXJlT3B0aW9uPihwcm9jZWR1cmVzWzBdKTtcbiAgY29uc3QgW3NldmVyaXR5R3JhZGUsIHNldFNldmVyaXR5R3JhZGVdID0gdXNlU3RhdGU8J0ktSUknIHwgJ0lJSScgfCAnSVYnPignSS1JSScpO1xuICBjb25zdCBbYW5lc3RoZXNpYVR5cGUsIHNldEFuZXN0aGVzaWFUeXBlXSA9IHVzZVN0YXRlPCdsb2NhbCcgfCAnc2VkYXRpb24nPignbG9jYWwnKTtcbiAgY29uc3QgW2luY2x1ZGVQb3N0T3BLaXQsIHNldEluY2x1ZGVQb3N0T3BLaXRdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtpbmNsdWRlQ29udHJvbFZpc2l0cywgc2V0SW5jbHVkZUNvbnRyb2xWaXNpdHNdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtpbmNsdWRlSGlzdG9wYXRob2xvZ3ksIHNldEluY2x1ZGVIaXN0b3BhdGhvbG9neV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgLy8gQ3J5c3RhbCBEaXNjb3VudCBjYWxjdWxhdGlvbiAoMzAgUExOIHBlciBjcnlzdGFsIHVwIHRvIDE1MCBQTE4pXG4gIGNvbnN0IGNyeXN0YWxEaXNjb3VudCA9IE1hdGgubWluKGNyeXN0YWxDb3VudCAqIDMwLCAxNTApO1xuXG4gIC8vIFByaWNlIENhbGN1bGF0aW9uIExvZ2ljXG4gIGNvbnN0IGNhbGN1bGF0ZVRvdGFsID0gKCkgPT4ge1xuICAgIGxldCB0b3RhbCA9IHNlbGVjdGVkUHJvY2VkdXJlLmJhc2VQcmljZTtcblxuICAgIC8vIFNldmVyaXR5IGFkZG9uXG4gICAgaWYgKHNldmVyaXR5R3JhZGUgPT09ICdJSUknKSB0b3RhbCArPSA2MDA7XG4gICAgaWYgKHNldmVyaXR5R3JhZGUgPT09ICdJVicpIHRvdGFsICs9IDEyMDA7XG5cbiAgICAvLyBBbmVzdGhlc2lhIGFkZG9uXG4gICAgaWYgKGFuZXN0aGVzaWFUeXBlID09PSAnc2VkYXRpb24nKSB0b3RhbCArPSA4MDA7XG5cbiAgICAvLyBBZGRpdGlvbmFsIG9wdGlvbnNcbiAgICBpZiAoaW5jbHVkZVBvc3RPcEtpdCkgdG90YWwgKz0gMjIwO1xuICAgIGlmIChpbmNsdWRlQ29udHJvbFZpc2l0cykgdG90YWwgKz0gMzUwO1xuICAgIGlmIChpbmNsdWRlSGlzdG9wYXRob2xvZ3kpIHRvdGFsICs9IDI1MDtcblxuICAgIC8vIFN1YnRyYWN0IENyeXN0YWwgZGlzY291bnRcbiAgICB0b3RhbCAtPSBjcnlzdGFsRGlzY291bnQ7XG5cbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgdG90YWwpO1xuICB9O1xuXG4gIGNvbnN0IHRvdGFsUHJpY2UgPSBjYWxjdWxhdGVUb3RhbCgpO1xuXG4gIHJldHVybiAoXG4gICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMTYgcHgtNCBzbTpweC02IGxnOnB4LTggbWF4LXctNnhsIG14LWF1dG9cIiBpZD1cImthbGt1bGF0b3ItemFiaWVnb3dcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHNtOnAtMTAgcm91bmRlZC0zeGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LXhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICB7LyogR2xvdyBhY2NlbnQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiB3LTk2IGgtOTYgYmctcHVycGxlLTEwMC82MCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgey8qIFNlY3Rpb24gVGl0bGUgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWF4LXctMnhsIG14LWF1dG8gbWItMTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zLjUgcHktMS41IHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtNTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtMjAwIHRleHQtcHVycGxlLTgwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTNcIj5cbiAgICAgICAgICAgIDxDYWxjdWxhdG9yIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTYwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5LYWxrdWxhdG9yIEtvc3p0w7N3ICYgRXN0eW1hdG9yIENNTDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgIE9zemFjdWogS29zenQgWmFiaWVndSBMYXNlcm93ZWdvXG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS02MDAgZm9udC1ub3JtYWwgbXQtMlwiPlxuICAgICAgICAgICAgU3ByYXdkxbogc3phY3Vua293xIUgY2VuxJkgbGVjemVuaWEgbGFzZXJvd2VnbyAoTEhQwq4sIEZpTGFDwq4sIFNpTGFDwq4pIHUgZHIuIEphbmEgQnVqb2thIHdyYXogemUgd3N6eXN0a2ltaSBlbGVtZW50YW1pIG9waWVraSBwb29wZXJhY3lqbmVqLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtOCBpdGVtcy1zdGFydFwiPlxuICAgICAgICAgIHsvKiBPcHRpb25zIFNlbGVjdGlvbiBDb2x1bW4gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IHNwYWNlLXktNlwiPlxuICAgICAgICAgICAgey8qIFN0ZXAgMTogU2VsZWN0IFByb2NlZHVyZSAqL31cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1wdXJwbGUtODAwIG1iLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTUgaC01IHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bMTBweF1cIj4xPC9zcGFuPlxuICAgICAgICAgICAgICAgIFd5YmllcnogTWV0b2TEmSBMYXNlcm93xIU6XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIHtwcm9jZWR1cmVzLm1hcCgocHJvYykgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkUHJvY2VkdXJlLmlkID09PSBwcm9jLmlkO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17cHJvYy5pZH1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZFByb2NlZHVyZShwcm9jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEFuZXN0aGVzaWFUeXBlKHByb2MuYW5lc3RoZXNpYURlZmF1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQtMnhsIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTUwLzkwIGJvcmRlci1wdXJwbGUtNTAwIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTkwMC8xMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtNTAgYm9yZGVyLXNsYXRlLTIwMCBob3Zlcjpib3JkZXItc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTkwMFwiPntwcm9jLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNTZWxlY3RlZCAmJiA8Q2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS02MDAgc2hyaW5rLTBcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtcHVycGxlLTcwMCBmb250LWJvbGQgYmxvY2sgbWItMlwiPntwcm9jLmNvZGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDAgbGVhZGluZy1zbnVnIGxpbmUtY2xhbXAtMlwiPntwcm9jLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgZm9udC1tZWRpdW1cIj5DZW5hIG9kOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPntwcm9jLmJhc2VQcmljZX0gesWCPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTdGVwIDI6IFNldmVyaXR5IEdyYWRlICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXB1cnBsZS04MDAgbWItMiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNSBoLTUgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVsxMHB4XVwiPjI8L3NwYW4+XG4gICAgICAgICAgICAgICAgU3RvcGllxYQgWmFhd2Fuc293YW5pYSBabWlhbiAvIFrFgm/FvG9ub8WbxIc6XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICB7IGdyYWRlOiAnSS1JSScsIGxhYmVsOiAnU3RvcGllxYQgSSAtIElJJywgbm90ZTogJ1N0YW5kYXJkb3d5JyB9LFxuICAgICAgICAgICAgICAgICAgeyBncmFkZTogJ0lJSScsIGxhYmVsOiAnU3RvcGllxYQgSUlJJywgbm90ZTogJys2MDAgesWCJyB9LFxuICAgICAgICAgICAgICAgICAgeyBncmFkZTogJ0lWJywgbGFiZWw6ICdTdG9waWXFhCBJViAvIFrFgm/FvG9ueScsIG5vdGU6ICcrMTIwMCB6xYInIH0sXG4gICAgICAgICAgICAgICAgXS5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmdyYWRlfVxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2V2ZXJpdHlHcmFkZShpdGVtLmdyYWRlIGFzIGFueSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTIuNSBweC0yIHJvdW5kZWQteGwgdGV4dC1jZW50ZXIgdGV4dC14cyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICBzZXZlcml0eUdyYWRlID09PSBpdGVtLmdyYWRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgYm9yZGVyLXB1cnBsZS02MDAgZm9udC1ib2xkIHNoYWRvdydcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlIHRleHQtc2xhdGUtNzAwIGJvcmRlci1zbGF0ZS0yMDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrXCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW5vcm1hbCBvcGFjaXR5LTkwIGJsb2NrXCI+e2l0ZW0ubm90ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFN0ZXAgMzogQW5lc3RoZXNpYSBDaG9pY2UgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtcHVycGxlLTgwMCBtYi0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtWzEwcHhdXCI+Mzwvc3Bhbj5cbiAgICAgICAgICAgICAgICBSb2R6YWogWm5pZWN6dWxlbmlhOlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFuZXN0aGVzaWFUeXBlKCdsb2NhbCcpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgdGV4dC1sZWZ0IGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICBhbmVzdGhlc2lhVHlwZSA9PT0gJ2xvY2FsJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS01MCBib3JkZXItcHVycGxlLTQwMCB0ZXh0LXNsYXRlLTkwMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZSBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC14cyB0ZXh0LXNsYXRlLTkwMFwiPlpuaWVjenVsZW5pZSBNaWVqc2Nvd2U8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC10ZWFsLTcwMCBmb250LXNlbWlib2xkXCI+VyBjZW5pZSBiYXpvd2VqIHphYmllZ3U8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QW5lc3RoZXNpYVR5cGUoJ3NlZGF0aW9uJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC14bCB0ZXh0LWxlZnQgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGFuZXN0aGVzaWFUeXBlID09PSAnc2VkYXRpb24nXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTUwIGJvcmRlci1wdXJwbGUtNDAwIHRleHQtc2xhdGUtOTAwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXdoaXRlIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXhzIHRleHQtc2xhdGUtOTAwXCI+U2VkYWNqYSBEb8W8eWxuYSAvIEFuYWxnb3NlZGFjamE8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1wdXJwbGUtNzAwIGZvbnQtc2VtaWJvbGRcIj4rODAwIHrFgiAoT2JlY25vxZvEhyBhbmVzdGV6am9sb2dhKTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU3RlcCA0OiBBZGRpdGlvbmFsIE9wdGlvbnMgQ2hlY2tib3hlcyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtcHVycGxlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNSBoLTUgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVsxMHB4XVwiPjQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgT3BjamUgRG9kYXRrb3dlIGkgUGFraWV0IFBvb3BlcmFjeWpueTpcbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMi41IHJvdW5kZWQteGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgY3Vyc29yLXBvaW50ZXIgaG92ZXI6Ym9yZGVyLXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2luY2x1ZGVQb3N0T3BLaXR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0SW5jbHVkZVBvc3RPcEtpdChlLnRhcmdldC5jaGVja2VkKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy00IGgtNCBhY2NlbnQtcHVycGxlLTYwMCByb3VuZGVkXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDAgYmxvY2tcIj5EZWR5a293YW55IFplc3RhdyBPY2hyb25ueSBDTUw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNjAwXCI+U3BlY2phbGlzdHljem5lIG1hxZtjaSByZWdlbmVyYWN5am5lLCBjem9wa2kgaSB6aW/FgmEgbmFzaWFkb3dlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS04MDAgc2hyaW5rLTBcIj4rMjIwIHrFgjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMi41IHJvdW5kZWQteGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgY3Vyc29yLXBvaW50ZXIgaG92ZXI6Ym9yZGVyLXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2luY2x1ZGVDb250cm9sVmlzaXRzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEluY2x1ZGVDb250cm9sVmlzaXRzKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IGFjY2VudC1wdXJwbGUtNjAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMCBibG9ja1wiPlBha2lldCAyIEtvbnRyb2xpIFBvb3BlcmFjeWpueWNoPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTYwMFwiPkd3YXJhbnRvd2FuZSBrb25zdWx0YWNqZSBwbyA3IGkgMzAgZG5pYWNoIHUgZHIuIEJ1am9rYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtODAwIHNocmluay0wXCI+KzM1MCB6xYI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwLTIuNSByb3VuZGVkLXhsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGN1cnNvci1wb2ludGVyIGhvdmVyOmJvcmRlci1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpbmNsdWRlSGlzdG9wYXRob2xvZ3l9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0SW5jbHVkZUhpc3RvcGF0aG9sb2d5KGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTQgaC00IGFjY2VudC1wdXJwbGUtNjAwIHJvdW5kZWRcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMCBibG9ja1wiPkJhZGFuaWUgSGlzdG9wYXRvbG9naWN6bmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNjAwXCI+V2VyeWZpa2FjamEgbGFib3JhdG9yeWpuYSBwb2JyYW55Y2ggdGthbmVrPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS04MDAgc2hyaW5rLTBcIj4rMjUwIHrFgjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFN1bW1hcnkgQ29sdW1uIC8gVG90YWwgQ2FyZCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgc3RpY2t5IHRvcC0yNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0zeGwgYmctc2xhdGUtOTAwIHRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LTJ4bCByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItNFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXB1cnBsZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICBQb2RzdW1vd2FuaWUgV3lrYWxrdWxvd2FuZVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCBiZy10ZWFsLTk1MCB0ZXh0LXRlYWwtMzAwIGJvcmRlciBib3JkZXItdGVhbC01MDAvMzAgdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgUG93csOzdDogfntzZWxlY3RlZFByb2NlZHVyZS5yZWNvbW1lbmRlZERheXN9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzIG1iLTYgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5XeWJyYW55IHphYmllZzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMTAwXCI+e3NlbGVjdGVkUHJvY2VkdXJlLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPkJhemEgb3DFgmF0eTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1zbGF0ZS0yMDBcIj57c2VsZWN0ZWRQcm9jZWR1cmUuYmFzZVByaWNlfSB6xYI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+WsWCb8W8b25vxZvEhyAoU3RvcGllxYQge3NldmVyaXR5R3JhZGV9KTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAge3NldmVyaXR5R3JhZGUgPT09ICdJLUlJJyA/ICcwIHrFgicgOiBzZXZlcml0eUdyYWRlID09PSAnSUlJJyA/ICcrNjAwIHrFgicgOiAnKzEyMDAgesWCJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5abmllY3p1bGVuaWU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHthbmVzdGhlc2lhVHlwZSA9PT0gJ2xvY2FsJyA/ICdNaWVqc2Nvd2UgKDAgesWCKScgOiAnU2VkYWNqYSAoKzgwMCB6xYIpJ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHtpbmNsdWRlUG9zdE9wS2l0ICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtcHVycGxlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4rIERlZHlrb3dhbnkgWmVzdGF3IE9jaHJvbm55Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vXCI+MjIwIHrFgjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2luY2x1ZGVDb250cm9sVmlzaXRzICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHRleHQtcHVycGxlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4rIFBha2lldCAyIEtvbnRyb2xpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vXCI+MzUwIHrFgjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge2luY2x1ZGVIaXN0b3BhdGhvbG9neSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LXB1cnBsZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+KyBCYWRhbmllIEhpc3RvcGF0b2xvZ2ljem5lOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vXCI+MjUwIHrFgjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogQ3J5c3RhbCBEaXNjb3VudCBMaW5lIEl0ZW0gKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgdGV4dC1hbWJlci0zMDAgZm9udC1ib2xkIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgcHQtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICBSYWJhdCBXeWVkdWtvd2FuZWdvIFBhY2plbnRhICjwn5KOIHtjcnlzdGFsQ291bnR9LzUpOlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtYW1iZXItMzAwXCI+LXtjcnlzdGFsRGlzY291bnR9IHrFgjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFRvdGFsIFByaWNlIERpc3BsYXkgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvMzAgdGV4dC1jZW50ZXIgbWItNlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRleHQtc2xhdGUtNDAwIGJsb2NrIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIFN6YWNvd2FueSBLb3N6dCBDYcWCa293aXR5IFphYmllZ3U6XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtM3hsIHNtOnRleHQtNHhsIGZvbnQtc2VyaWYgZm9udC1ib2xkIHRleHQtdHJhbnNwYXJlbnQgYmctY2xpcC10ZXh0IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtMzAwIHZpYS1wdXJwbGUtMTAwIHRvLWluZGlnby0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIHt0b3RhbFByaWNlfSBQTE5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgTW/FvGxpd2/Fm8SHIHDFgmF0bm/Fm2NpIHcgcmF0YWNoIG1lZHljem55Y2ggKE1lZGlSYXR5IG9kIH4xMTAgesWCL21jKVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBocmVmPVwiI3JlemVyd2FjamFcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25Cb29rQ29uc3VsdGF0aW9uICYmIG9uQm9va0NvbnN1bHRhdGlvbigpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTMuNSBweC00IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS02MDAgdG8taW5kaWdvLTYwMCBob3Zlcjpmcm9tLXB1cnBsZS01MDAgaG92ZXI6dG8taW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC14cyBzbTp0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTYwMC8zMCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPENhbGVuZGFyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+WmFyZXplcnd1aiBLb25zdWx0YWNqxJkgS3dhbGlmaWthY3lqbsSFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPEFycm93UmlnaHQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgT3N0YXRlY3puYSB3eWNlbmEgdXN0YWxhbmEgamVzdCBwb2RjemFzIGJlemJvbGVzbmVqIGtvbnN1bHRhY2ppIHByb2t0b2xvZ2ljem5laiB6IGRyLiBKYW5lbSBCdWpva2llbSBwbyBkb2vFgmFkbnltIGJhZGFuaXUgQW5vc2tvcG93eW0vUmVrdG9za29wb3d5bS5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFtR1E7QUFuR1IsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsWUFBWSxhQUFhLE9BQU8sVUFBVSxVQUFVLGtCQUFrQjtBQVkvRSxNQUFNLGFBQWdDO0FBQUEsRUFDcEM7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLEVBQ25CO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElBQ2IsV0FBVztBQUFBLElBQ1gsbUJBQW1CO0FBQUEsSUFDbkIsaUJBQWlCO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsSUFDYixXQUFXO0FBQUEsSUFDWCxtQkFBbUI7QUFBQSxJQUNuQixpQkFBaUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLFdBQVc7QUFBQSxJQUNYLG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQjtBQUFBLEVBQ25CO0FBQ0Y7QUFPTyxhQUFNLHNCQUEwRCxDQUFDO0FBQUEsRUFDdEU7QUFBQSxFQUNBLGVBQWU7QUFDakIsTUFBTTtBQUNKLFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLElBQUksU0FBMEIsV0FBVyxD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