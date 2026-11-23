import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Activity,
  Award
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
const MICRO_LEARNING_DATA = [
  {
    id: "LHP",
    title: "LHP® – Laserowe Leczenie Hemoroidów",
    subtitle: "Obkurczanie guzków krwawniczych światłowodem radialnym 1470 nm",
    wavelength: "1470 nm (Laser Diodowy Biolitec)",
    durationSec: 12,
    steps: [
      {
        title: "Krok 1: Wprowadzenie mikrosondy",
        description: "Światłowód radialny jest delikatnie wsuwany do wnętrza guzka bez jakiegokolwiek wycinania tkanki czy śluzówki.",
        laserPower: "0 W (Stan spoczynku)"
      },
      {
        title: "Krok 2: Emisja energii laserowej 360°",
        description: "Wiązka światła podgrzewa ściany naczynia od środka, powodując natychmiastową koagulację gałęzi tętniczych.",
        laserPower: "12 W (Impulsy kontrolowane)"
      },
      {
        title: "Krok 3: Obkurczenie i zapadnięcie tkanki",
        description: "Guzek zmniejsza się o 70-80% natychmiast, a w ciągu 2-3 tygodni ulega całkowitej zwłókniającej regresji.",
        laserPower: "0 W (Regeneracja)"
      }
    ],
    clinicalHighlights: [
      "Brak ran, szwów i bolesnych opatrunków",
      "Ochrona zwieracza odbytu w 100%",
      "Powrót do codziennej aktywności w 24-48 godzin"
    ]
  },
  {
    id: "FiLaC",
    title: "FiLaC® – Zamknięcie Przetoki Odbytu",
    subtitle: "Termiczna obliteracja kanału przetoki sondą elastyczną",
    wavelength: "1470 nm Radial 360°",
    durationSec: 12,
    steps: [
      {
        title: "Krok 1: Wprowadzenie elastycznej sondy FiLaC",
        description: "Sonda zostaje wprowadzona od ujścia zewnętrznego przez cały kanał przetoki aż do wnętrza odbytu.",
        laserPower: "0 W (Pozycjonowanie)"
      },
      {
        title: "Krok 2: Wycofywanie z jednoczesnym naświetlaniem",
        description: "Podczas powolnego wycofywania sondy, światło lasera niszczy nabłonek przetoki i zamyka jej światło.",
        laserPower: "13 W (Kontrolowana ablacja)"
      },
      {
        title: "Krok 3: Całkowite obkurczenie kanału",
        description: "Tkanki ulegają zapadnięciu i zrostowi. Mięsień zwieracz pozostaje nietknięty.",
        laserPower: "0 W (Zrost tkankowy)"
      }
    ],
    clinicalHighlights: [
      "Zero ryzyka nietrzymania stolca (zwieracze nienaruszone)",
      "Bez wycinania rozległych ubytków skórnych",
      "Minimalny ból pooperacyjny"
    ]
  },
  {
    id: "SiLaC",
    title: "SiLaC® – Ablacja Torbieli Włosowej",
    subtitle: "Niski stopień inwazyjności w leczeniu torbieli kości guzicznej",
    wavelength: "1470 nm Dual Ring",
    durationSec: 12,
    steps: [
      {
        title: "Krok 1: Oczyszczenie zatoki torbieli",
        description: "Zatoka zostaje opróżniona z włosów i treści zapalnej przez mikrootwór.",
        laserPower: "0 W (Przygotowanie)"
      },
      {
        title: "Krok 2: Naświetlanie jam torbieli",
        description: "Światło lasera sterylizuje jamę i powoduje zwęglenie oraz zrost ścian torbieli od wewnątrz.",
        laserPower: "10 W (Sterylizacja termiczna)"
      },
      {
        title: "Krok 3: Szybkie gojenie bez otwartej rany",
        description: "Skóra nie wymaga rozległego wycinania. Brak uciążliwego, kilkumiesięcznego opatrywania rany.",
        laserPower: "0 W (Gojenie)"
      }
    ],
    clinicalHighlights: [
      "Spadek ryzyka nawrotu z 25% do poniżej 3%",
      "Brak wielotygodniowej otwartej rany",
      "Idealny efekt kosmetyczny w okolicy krzyżowej"
    ]
  }
];
export const AnimatedMicroLearning = ({
  onCollectCrystal,
  isCrystalCollected = false
}) => {
  const [selectedTech, setSelectedTech] = useState("LHP");
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [animProgress, setAnimProgress] = useState(0);
  const activeData = MICRO_LEARNING_DATA.find((d) => d.id === selectedTech) || MICRO_LEARNING_DATA[0];
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setAnimProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isPlaying]);
  useEffect(() => {
    if (animProgress < 33) {
      setCurrentStepIndex(0);
    } else if (animProgress < 66) {
      setCurrentStepIndex(1);
    } else {
      setCurrentStepIndex(2);
    }
  }, [animProgress]);
  const activeStep = activeData.steps[currentStepIndex] || activeData.steps[0];
  return /* @__PURE__ */ jsxDEV("section", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto", id: "mikro-edukacja-laserowa", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6 sm:p-10 rounded-3xl bg-slate-900 border border-purple-500/30 text-white shadow-2xl relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
      lineNumber: 171,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-purple-400 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 177,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Interaktywne Mikronauczanie CSS / Fizyka Lasera" }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 178,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 176,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-slate-100", children: "Jak Działa Laser Diodowy 1470 nm?" }, void 0, false, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 180,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed", children: "Zobacz symulację w czasie rzeczywistym. Zrozumienie fizyki światła eliminuje lęk przed zabiegiem i wyjaśnia, dlaczego tkanki goją się bez bolesnych ran." }, void 0, false, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 183,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
        lineNumber: 175,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "shrink-0", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onCollectCrystal && onCollectCrystal(2),
          className: `px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border flex items-center gap-2 ${isCrystalCollected ? "bg-amber-500/20 border-amber-400/40 text-amber-300" : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 198,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: isCrystalCollected ? "Kryształ Mikroedukacji Zdobyty! 💎" : "Zrozumiałem Działanie -> Odbierz 💎" }, void 0, false, {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 199,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 190,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
        lineNumber: 189,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
      lineNumber: 174,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 my-6", children: MICRO_LEARNING_DATA.map((tech) => /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => {
          setSelectedTech(tech.id);
          setAnimProgress(0);
          setCurrentStepIndex(0);
        },
        className: `px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${selectedTech === tech.id ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-600/30" : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700"}`,
        children: [
          /* @__PURE__ */ jsxDEV(Zap, { className: `w-3.5 h-3.5 ${selectedTech === tech.id ? "text-amber-300" : "text-purple-400"}` }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 220,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: tech.title.split("–")[0] }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 221,
            columnNumber: 15
          }, this)
        ]
      },
      tech.id,
      true,
      {
        fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
        lineNumber: 207,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
      lineNumber: 205,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-purple-500/30 relative flex flex-col items-center justify-between min-h-[360px] overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-full flex items-center justify-between text-xs mb-4", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[11px] text-purple-300 bg-purple-950/80 px-2.5 py-1 rounded-lg border border-purple-500/30 font-bold", children: [
            "Moc: ",
            activeStep.laserPower
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 232,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[11px] text-slate-400", children: [
            "Długość fali: ",
            activeData.wavelength
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 235,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 231,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative w-full h-48 flex items-center justify-center my-4", children: /* @__PURE__ */ jsxDEV("div", { className: "absolute w-56 h-32 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-br from-rose-950/30 via-slate-900 to-purple-950/30 opacity-80" }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 245,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              className: "absolute h-3 rounded-full bg-slate-300 border border-slate-100 z-10 flex items-center justify-end pr-1 shadow-md",
              animate: {
                width: currentStepIndex === 0 ? "40px" : currentStepIndex === 1 ? "120px" : "90px",
                x: currentStepIndex === 0 ? -40 : currentStepIndex === 1 ? 0 : 20
              },
              transition: { duration: 0.8, ease: "easeInOut" },
              children: /* @__PURE__ */ jsxDEV("div", { className: "w-2 h-2 rounded-full bg-amber-300 animate-ping" }, void 0, false, {
                fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
                lineNumber: 256,
                columnNumber: 19
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 248,
              columnNumber: 17
            },
            this
          ),
          currentStepIndex === 1 && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              initial: { scale: 0.5, opacity: 0.2 },
              animate: { scale: [1, 1.4, 1], opacity: [0.6, 0.9, 0.6] },
              transition: { repeat: Infinity, duration: 1 },
              className: "absolute w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 blur-md opacity-80 z-0 pointer-events-none"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 261,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              className: "rounded-full border-2 border-purple-400/80 flex items-center justify-center font-mono text-[9px] font-bold text-white z-20",
              animate: {
                width: currentStepIndex === 0 ? "110px" : currentStepIndex === 1 ? "85px" : "55px",
                height: currentStepIndex === 0 ? "110px" : currentStepIndex === 1 ? "85px" : "55px",
                backgroundColor: currentStepIndex === 0 ? "rgba(225, 29, 72, 0.25)" : currentStepIndex === 1 ? "rgba(168, 85, 247, 0.4)" : "rgba(16, 185, 129, 0.3)",
                borderColor: currentStepIndex === 0 ? "#f43f5e" : currentStepIndex === 1 ? "#c084fc" : "#34d399"
              },
              transition: { duration: 0.8, ease: "easeInOut" },
              children: [
                currentStepIndex === 0 && "Tkanka przed laserem",
                currentStepIndex === 1 && "Impuls 1470nm ⚡",
                currentStepIndex === 2 && "Obkurczony guzek ✓"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 270,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 243,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 241,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full space-y-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setIsPlaying(!isPlaying),
                  className: "p-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white transition-all",
                  children: isPlaying ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
                    lineNumber: 305,
                    columnNumber: 34
                  }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
                    lineNumber: 305,
                    columnNumber: 70
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
                  lineNumber: 301,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    setAnimProgress(0);
                    setCurrentStepIndex(0);
                  },
                  className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all",
                  title: "Zrestartuj symulację",
                  children: /* @__PURE__ */ jsxDEV(RotateCcw, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
                    lineNumber: 315,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
                  lineNumber: 307,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 300,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[11px] text-amber-300 font-bold", children: activeStep.title }, void 0, false, {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 319,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 299,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1.5 bg-slate-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "h-full bg-gradient-to-r from-purple-500 to-amber-400 transition-all duration-300",
              style: { width: `${animProgress}%` }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 326,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 325,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 298,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
        lineNumber: 229,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1", children: activeData.subtitle }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 337,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-xl sm:text-2xl font-bold text-slate-100", children: activeStep.title }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 340,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-normal", children: activeStep.description }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 343,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 336,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Award, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 351,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Dlaczego Ta Metoda Jest Złotym Standardem CML?" }, void 0, false, {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 352,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 350,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-1.5 text-xs text-slate-200", children: activeData.clinicalHighlights.map((hl, i) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 357,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: hl }, void 0, false, {
              fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
              lineNumber: 358,
              columnNumber: 21
            }, this)
          ] }, i, true, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 356,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
            lineNumber: 354,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 349,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 italic", children: "Dr n. med. Jan Bujok używa wyłącznie certyfikowanych laserów niemieckiej marki Biolitec z patentem światłowodów kulistych 360°." }, void 0, false, {
          fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
          lineNumber: 364,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
        lineNumber: 335,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
      lineNumber: 227,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
    lineNumber: 169,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/AnimatedMicroLearning.tsx",
    lineNumber: 168,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFuaW1hdGVkTWljcm9MZWFybmluZy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBaYXAsXG4gIFBsYXksXG4gIFBhdXNlLFxuICBSb3RhdGVDY3csXG4gIFNwYXJrbGVzLFxuICBDaGVja0NpcmNsZTIsXG4gIFNoaWVsZENoZWNrLFxuICBBY3Rpdml0eSxcbiAgTGF5ZXJzLFxuICBBd2FyZCxcbiAgQXJyb3dSaWdodCxcbiAgSW5mbyxcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnbW90aW9uL3JlYWN0JztcblxuaW50ZXJmYWNlIFByb2NlZHVyZUFuaW1hdGlvbiB7XG4gIGlkOiAnTEhQJyB8ICdGaUxhQycgfCAnU2lMYUMnO1xuICB0aXRsZTogc3RyaW5nO1xuICBzdWJ0aXRsZTogc3RyaW5nO1xuICB3YXZlbGVuZ3RoOiBzdHJpbmc7XG4gIGR1cmF0aW9uU2VjOiBudW1iZXI7XG4gIHN0ZXBzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGxhc2VyUG93ZXI6IHN0cmluZztcbiAgfVtdO1xuICBjbGluaWNhbEhpZ2hsaWdodHM6IHN0cmluZ1tdO1xufVxuXG5jb25zdCBNSUNST19MRUFSTklOR19EQVRBOiBQcm9jZWR1cmVBbmltYXRpb25bXSA9IFtcbiAge1xuICAgIGlkOiAnTEhQJyxcbiAgICB0aXRsZTogJ0xIUMKuIOKAkyBMYXNlcm93ZSBMZWN6ZW5pZSBIZW1vcm9pZMOzdycsXG4gICAgc3VidGl0bGU6ICdPYmt1cmN6YW5pZSBndXprw7N3IGtyd2F3bmljenljaCDFm3dpYXTFgm93b2RlbSByYWRpYWxueW0gMTQ3MCBubScsXG4gICAgd2F2ZWxlbmd0aDogJzE0NzAgbm0gKExhc2VyIERpb2Rvd3kgQmlvbGl0ZWMpJyxcbiAgICBkdXJhdGlvblNlYzogMTIsXG4gICAgc3RlcHM6IFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdLcm9rIDE6IFdwcm93YWR6ZW5pZSBtaWtyb3NvbmR5JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICfFmndpYXTFgm93w7NkIHJhZGlhbG55IGplc3QgZGVsaWthdG5pZSB3c3V3YW55IGRvIHduxJl0cnphIGd1emthIGJleiBqYWtpZWdva29sd2llayB3eWNpbmFuaWEgdGthbmtpIGN6eSDFm2x1esOzd2tpLicsXG4gICAgICAgIGxhc2VyUG93ZXI6ICcwIFcgKFN0YW4gc3BvY3p5bmt1KScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0tyb2sgMjogRW1pc2phIGVuZXJnaWkgbGFzZXJvd2VqIDM2MMKwJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdXacSFemthIMWbd2lhdMWCYSBwb2Rncnpld2EgxZtjaWFueSBuYWN6eW5pYSBvZCDFm3JvZGthLCBwb3dvZHVqxIVjIG5hdHljaG1pYXN0b3fEhSBrb2FndWxhY2rEmSBnYcWCxJl6aSB0xJl0bmljenljaC4nLFxuICAgICAgICBsYXNlclBvd2VyOiAnMTIgVyAoSW1wdWxzeSBrb250cm9sb3dhbmUpJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnS3JvayAzOiBPYmt1cmN6ZW5pZSBpIHphcGFkbmnEmWNpZSB0a2Fua2knLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0d1emVrIHptbmllanN6YSBzacSZIG8gNzAtODAlIG5hdHljaG1pYXN0LCBhIHcgY2nEhWd1IDItMyB0eWdvZG5pIHVsZWdhIGNhxYJrb3dpdGVqIHp3xYLDs2tuaWFqxIVjZWogcmVncmVzamkuJyxcbiAgICAgICAgbGFzZXJQb3dlcjogJzAgVyAoUmVnZW5lcmFjamEpJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBjbGluaWNhbEhpZ2hsaWdodHM6IFtcbiAgICAgICdCcmFrIHJhbiwgc3p3w7N3IGkgYm9sZXNueWNoIG9wYXRydW5rw7N3JyxcbiAgICAgICdPY2hyb25hIHp3aWVyYWN6YSBvZGJ5dHUgdyAxMDAlJyxcbiAgICAgICdQb3dyw7N0IGRvIGNvZHppZW5uZWogYWt0eXdub8WbY2kgdyAyNC00OCBnb2R6aW4nLFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ0ZpTGFDJyxcbiAgICB0aXRsZTogJ0ZpTGFDwq4g4oCTIFphbWtuacSZY2llIFByemV0b2tpIE9kYnl0dScsXG4gICAgc3VidGl0bGU6ICdUZXJtaWN6bmEgb2JsaXRlcmFjamEga2FuYcWCdSBwcnpldG9raSBzb25kxIUgZWxhc3R5Y3puxIUnLFxuICAgIHdhdmVsZW5ndGg6ICcxNDcwIG5tIFJhZGlhbCAzNjDCsCcsXG4gICAgZHVyYXRpb25TZWM6IDEyLFxuICAgIHN0ZXBzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnS3JvayAxOiBXcHJvd2FkemVuaWUgZWxhc3R5Y3puZWogc29uZHkgRmlMYUMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NvbmRhIHpvc3RhamUgd3Byb3dhZHpvbmEgb2QgdWrFm2NpYSB6ZXduxJl0cnpuZWdvIHByemV6IGNhxYJ5IGthbmHFgiBwcnpldG9raSBhxbwgZG8gd27EmXRyemEgb2RieXR1LicsXG4gICAgICAgIGxhc2VyUG93ZXI6ICcwIFcgKFBvenljam9ub3dhbmllKScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0tyb2sgMjogV3ljb2Z5d2FuaWUgeiBqZWRub2N6ZXNueW0gbmHFm3dpZXRsYW5pZW0nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1BvZGN6YXMgcG93b2xuZWdvIHd5Y29meXdhbmlhIHNvbmR5LCDFm3dpYXTFgm8gbGFzZXJhIG5pc3pjenkgbmFixYJvbmVrIHByemV0b2tpIGkgemFteWthIGplaiDFm3dpYXTFgm8uJyxcbiAgICAgICAgbGFzZXJQb3dlcjogJzEzIFcgKEtvbnRyb2xvd2FuYSBhYmxhY2phKScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0tyb2sgMzogQ2HFgmtvd2l0ZSBvYmt1cmN6ZW5pZSBrYW5hxYJ1JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUa2Fua2kgdWxlZ2FqxIUgemFwYWRuacSZY2l1IGkgenJvc3Rvd2kuIE1pxJlzaWXFhCB6d2llcmFjeiBwb3pvc3RhamUgbmlldGtuacSZdHkuJyxcbiAgICAgICAgbGFzZXJQb3dlcjogJzAgVyAoWnJvc3QgdGthbmtvd3kpJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBjbGluaWNhbEhpZ2hsaWdodHM6IFtcbiAgICAgICdaZXJvIHJ5enlrYSBuaWV0cnp5bWFuaWEgc3RvbGNhICh6d2llcmFjemUgbmllbmFydXN6b25lKScsXG4gICAgICAnQmV6IHd5Y2luYW5pYSByb3psZWfFgnljaCB1Ynl0a8OzdyBza8Ozcm55Y2gnLFxuICAgICAgJ01pbmltYWxueSBiw7NsIHBvb3BlcmFjeWpueScsXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGlkOiAnU2lMYUMnLFxuICAgIHRpdGxlOiAnU2lMYUPCriDigJMgQWJsYWNqYSBUb3JiaWVsaSBXxYJvc293ZWonLFxuICAgIHN1YnRpdGxlOiAnTmlza2kgc3RvcGllxYQgaW53YXp5am5vxZtjaSB3IGxlY3plbml1IHRvcmJpZWxpIGtvxZtjaSBndXppY3puZWonLFxuICAgIHdhdmVsZW5ndGg6ICcxNDcwIG5tIER1YWwgUmluZycsXG4gICAgZHVyYXRpb25TZWM6IDEyLFxuICAgIHN0ZXBzOiBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnS3JvayAxOiBPY3p5c3pjemVuaWUgemF0b2tpIHRvcmJpZWxpJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdaYXRva2Egem9zdGFqZSBvcHLDs8W8bmlvbmEgeiB3xYJvc8OzdyBpIHRyZcWbY2kgemFwYWxuZWogcHJ6ZXogbWlrcm9vdHfDs3IuJyxcbiAgICAgICAgbGFzZXJQb3dlcjogJzAgVyAoUHJ6eWdvdG93YW5pZSknLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdLcm9rIDI6IE5hxZt3aWV0bGFuaWUgamFtIHRvcmJpZWxpJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICfFmndpYXTFgm8gbGFzZXJhIHN0ZXJ5bGl6dWplIGphbcSZIGkgcG93b2R1amUgenfEmWdsZW5pZSBvcmF6IHpyb3N0IMWbY2lhbiB0b3JiaWVsaSBvZCB3ZXduxIV0cnouJyxcbiAgICAgICAgbGFzZXJQb3dlcjogJzEwIFcgKFN0ZXJ5bGl6YWNqYSB0ZXJtaWN6bmEpJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnS3JvayAzOiBTenlia2llIGdvamVuaWUgYmV6IG90d2FydGVqIHJhbnknLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1Nrw7NyYSBuaWUgd3ltYWdhIHJvemxlZ8WCZWdvIHd5Y2luYW5pYS4gQnJhayB1Y2nEhcW8bGl3ZWdvLCBraWxrdW1pZXNpxJljem5lZ28gb3BhdHJ5d2FuaWEgcmFueS4nLFxuICAgICAgICBsYXNlclBvd2VyOiAnMCBXIChHb2plbmllKScsXG4gICAgICB9LFxuICAgIF0sXG4gICAgY2xpbmljYWxIaWdobGlnaHRzOiBbXG4gICAgICAnU3BhZGVrIHJ5enlrYSBuYXdyb3R1IHogMjUlIGRvIHBvbmnFvGVqIDMlJyxcbiAgICAgICdCcmFrIHdpZWxvdHlnb2RuaW93ZWogb3R3YXJ0ZWogcmFueScsXG4gICAgICAnSWRlYWxueSBlZmVrdCBrb3NtZXR5Y3pueSB3IG9rb2xpY3kga3J6ecW8b3dlaicsXG4gICAgXSxcbiAgfSxcbl07XG5cbmludGVyZmFjZSBBbmltYXRlZE1pY3JvTGVhcm5pbmdQcm9wcyB7XG4gIG9uQ29sbGVjdENyeXN0YWw/OiAoY3J5c3RhbElkOiBudW1iZXIpID0+IHZvaWQ7XG4gIGlzQ3J5c3RhbENvbGxlY3RlZD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjb25zdCBBbmltYXRlZE1pY3JvTGVhcm5pbmc6IFJlYWN0LkZDPEFuaW1hdGVkTWljcm9MZWFybmluZ1Byb3BzPiA9ICh7XG4gIG9uQ29sbGVjdENyeXN0YWwsXG4gIGlzQ3J5c3RhbENvbGxlY3RlZCA9IGZhbHNlLFxufSkgPT4ge1xuICBjb25zdCBbc2VsZWN0ZWRUZWNoLCBzZXRTZWxlY3RlZFRlY2hdID0gdXNlU3RhdGU8J0xIUCcgfCAnRmlMYUMnIHwgJ1NpTGFDJz4oJ0xIUCcpO1xuICBjb25zdCBbaXNQbGF5aW5nLCBzZXRJc1BsYXlpbmddID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtjdXJyZW50U3RlcEluZGV4LCBzZXRDdXJyZW50U3RlcEluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbYW5pbVByb2dyZXNzLCBzZXRBbmltUHJvZ3Jlc3NdID0gdXNlU3RhdGUoMCk7IC8vIDAgdG8gMTAwXG5cbiAgY29uc3QgYWN0aXZlRGF0YSA9IE1JQ1JPX0xFQVJOSU5HX0RBVEEuZmluZCgoZCkgPT4gZC5pZCA9PT0gc2VsZWN0ZWRUZWNoKSB8fCBNSUNST19MRUFSTklOR19EQVRBWzBdO1xuXG4gIC8vIEFuaW1hdGlvbiBMb29wIFRpbWVyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1BsYXlpbmcpIHJldHVybjtcblxuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2V0QW5pbVByb2dyZXNzKChwcmV2KSA9PiB7XG4gICAgICAgIGlmIChwcmV2ID49IDEwMCkge1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcmV2ICsgMjtcbiAgICAgIH0pO1xuICAgIH0sIDIwMCk7XG5cbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0sIFtpc1BsYXlpbmddKTtcblxuICAvLyBVcGRhdGUgY3VycmVudCBzdGVwIGluZGV4IGJhc2VkIG9uIHByb2dyZXNzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGFuaW1Qcm9ncmVzcyA8IDMzKSB7XG4gICAgICBzZXRDdXJyZW50U3RlcEluZGV4KDApO1xuICAgIH0gZWxzZSBpZiAoYW5pbVByb2dyZXNzIDwgNjYpIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwSW5kZXgoMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldEN1cnJlbnRTdGVwSW5kZXgoMik7XG4gICAgfVxuICB9LCBbYW5pbVByb2dyZXNzXSk7XG5cbiAgY29uc3QgYWN0aXZlU3RlcCA9IGFjdGl2ZURhdGEuc3RlcHNbY3VycmVudFN0ZXBJbmRleF0gfHwgYWN0aXZlRGF0YS5zdGVwc1swXTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTE2IHB4LTQgc206cHgtNiBsZzpweC04IG1heC13LTZ4bCBteC1hdXRvXCIgaWQ9XCJtaWtyby1lZHVrYWNqYS1sYXNlcm93YVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgc206cC0xMCByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIHRleHQtd2hpdGUgc2hhZG93LTJ4bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgey8qIEdsb3cgQWNjZW50ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTEvMyB3LTk2IGgtOTYgYmctcHVycGxlLTYwMC8xNSByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgey8qIFNlY3Rpb24gSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWQ6aXRlbXMtZW5kIGp1c3RpZnktYmV0d2VlbiBnYXAtNiBwYi02IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMy41IHB5LTEuNSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTUwMC8yMCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvMzAgdGV4dC1wdXJwbGUtMzAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItM1wiPlxuICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5JbnRlcmFrdHl3bmUgTWlrcm9uYXVjemFuaWUgQ1NTIC8gRml6eWthIExhc2VyYTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtc2VyaWYgdGV4dC0yeGwgc206dGV4dC0zeGwgZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgIEphayBEemlhxYJhIExhc2VyIERpb2Rvd3kgMTQ3MCBubT9cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMSBtYXgtdy0yeGwgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIFpvYmFjeiBzeW11bGFjasSZIHcgY3phc2llIHJ6ZWN6eXdpc3R5bS4gWnJvenVtaWVuaWUgZml6eWtpIMWbd2lhdMWCYSBlbGltaW51amUgbMSZayBwcnplZCB6YWJpZWdpZW0gaSB3eWphxZtuaWEsIGRsYWN6ZWdvIHRrYW5raSBnb2rEhSBzacSZIGJleiBib2xlc255Y2ggcmFuLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENyeXN0YWwgUmV3YXJkIEFjdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNocmluay0wXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ29sbGVjdENyeXN0YWwgJiYgb25Db2xsZWN0Q3J5c3RhbCgyKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yLjUgcm91bmRlZC0yeGwgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yICR7XG4gICAgICAgICAgICAgICAgaXNDcnlzdGFsQ29sbGVjdGVkXG4gICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci01MDAvMjAgYm9yZGVyLWFtYmVyLTQwMC80MCB0ZXh0LWFtYmVyLTMwMCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAgdG8tYW1iZXItNjAwIGhvdmVyOmZyb20tYW1iZXItNDAwIGhvdmVyOnRvLWFtYmVyLTUwMCB0ZXh0LXNsYXRlLTk1MCBzaGFkb3ctbGcgc2hhZG93LWFtYmVyLTUwMC8yMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2lzQ3J5c3RhbENvbGxlY3RlZCA/ICdLcnlzenRhxYIgTWlrcm9lZHVrYWNqaSBaZG9ieXR5ISDwn5KOJyA6ICdacm96dW1pYcWCZW0gRHppYcWCYW5pZSAtPiBPZGJpZXJ6IPCfko4nfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGVjaCBTZWxlY3RvciBUYWJzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMiBteS02XCI+XG4gICAgICAgICAge01JQ1JPX0xFQVJOSU5HX0RBVEEubWFwKCh0ZWNoKSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17dGVjaC5pZH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkVGVjaCh0ZWNoLmlkKTtcbiAgICAgICAgICAgICAgICBzZXRBbmltUHJvZ3Jlc3MoMCk7XG4gICAgICAgICAgICAgICAgc2V0Q3VycmVudFN0ZXBJbmRleCgwKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRlY2ggPT09IHRlY2guaWRcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBib3JkZXItcHVycGxlLTQwMCBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS02MDAvMzAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAvODAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ymctc2xhdGUtNzAwIGJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT17YHctMy41IGgtMy41ICR7c2VsZWN0ZWRUZWNoID09PSB0ZWNoLmlkID8gJ3RleHQtYW1iZXItMzAwJyA6ICd0ZXh0LXB1cnBsZS00MDAnfWB9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPnt0ZWNoLnRpdGxlLnNwbGl0KCfigJMnKVswXX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1haW4gSW50ZXJhY3RpdmUgU3RhZ2UgJiBEZXNjcmlwdGlvbiBHcmlkICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC04IGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgIHsvKiBMZWZ0IENvbHVtbjogSW50ZXJhY3RpdmUgQW5pbWF0ZWQgQ2FudmFzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNiBiZy1zbGF0ZS05NTAgcC02IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCByZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWluLWgtWzM2MHB4XSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgIHsvKiBUb3AgQmFyIFN0YXR1cyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIG1iLTRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtcHVycGxlLTMwMCBiZy1wdXJwbGUtOTUwLzgwIHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIE1vYzoge2FjdGl2ZVN0ZXAubGFzZXJQb3dlcn1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICBExYJ1Z2/Fm8SHIGZhbGk6IHthY3RpdmVEYXRhLndhdmVsZW5ndGh9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogSW50ZXJhY3RpdmUgQW5pbWF0ZWQgVmlzdWFsIENvbnRhaW5lciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIGgtNDggZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgbXktNFwiPlxuICAgICAgICAgICAgICB7LyogVGlzc3VlIENhbnZhcyBSZXByZXNlbnRhdGlvbiAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB3LTU2IGgtMzIgcm91bmRlZC0zeGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgIHsvKiBBbmF0b21pY2FsIHRpc3N1ZSBsYXllciBiYWNrZ3JvdW5kICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by1iciBmcm9tLXJvc2UtOTUwLzMwIHZpYS1zbGF0ZS05MDAgdG8tcHVycGxlLTk1MC8zMCBvcGFjaXR5LTgwXCIgLz5cblxuICAgICAgICAgICAgICAgIHsvKiBMYXNlciBmaWJlciBwcm9iZSAqL31cbiAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaC0zIHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS0xMDAgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBwci0xIHNoYWRvdy1tZFwiXG4gICAgICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiBjdXJyZW50U3RlcEluZGV4ID09PSAwID8gJzQwcHgnIDogY3VycmVudFN0ZXBJbmRleCA9PT0gMSA/ICcxMjBweCcgOiAnOTBweCcsXG4gICAgICAgICAgICAgICAgICAgIHg6IGN1cnJlbnRTdGVwSW5kZXggPT09IDAgPyAtNDAgOiBjdXJyZW50U3RlcEluZGV4ID09PSAxID8gMCA6IDIwLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuOCwgZWFzZTogJ2Vhc2VJbk91dCcgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWFtYmVyLTMwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBQdWxzaW5nIExhc2VyIExpZ2h0IEVtaXNzaW9uIDM2MMKwICovfVxuICAgICAgICAgICAgICAgIHtjdXJyZW50U3RlcEluZGV4ID09PSAxICYmIChcbiAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgc2NhbGU6IDAuNSwgb3BhY2l0eTogMC4yIH19XG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgc2NhbGU6IFsxLCAxLjQsIDFdLCBvcGFjaXR5OiBbMC42LCAwLjksIDAuNl0gfX1cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyByZXBlYXQ6IEluZmluaXR5LCBkdXJhdGlvbjogMSB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB3LTI4IGgtMjggcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNTAwIHZpYS1waW5rLTUwMCB0by1hbWJlci00MDAgYmx1ci1tZCBvcGFjaXR5LTgwIHotMCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIHsvKiBOb2RlIC8gVmVzc2VsIFNocmlua2FnZSBSZXByZXNlbnRhdGlvbiAqL31cbiAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci1wdXJwbGUtNDAwLzgwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIHotMjBcIlxuICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY3VycmVudFN0ZXBJbmRleCA9PT0gMCA/ICcxMTBweCcgOiBjdXJyZW50U3RlcEluZGV4ID09PSAxID8gJzg1cHgnIDogJzU1cHgnLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGN1cnJlbnRTdGVwSW5kZXggPT09IDAgPyAnMTEwcHgnIDogY3VycmVudFN0ZXBJbmRleCA9PT0gMSA/ICc4NXB4JyA6ICc1NXB4JyxcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOlxuICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTdGVwSW5kZXggPT09IDBcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ3JnYmEoMjI1LCAyOSwgNzIsIDAuMjUpJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBjdXJyZW50U3RlcEluZGV4ID09PSAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdyZ2JhKDE2OCwgODUsIDI0NywgMC40KSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ3JnYmEoMTYsIDE4NSwgMTI5LCAwLjMpJyxcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6XG4gICAgICAgICAgICAgICAgICAgICAgY3VycmVudFN0ZXBJbmRleCA9PT0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnI2Y0M2Y1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogY3VycmVudFN0ZXBJbmRleCA9PT0gMVxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnI2MwODRmYydcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJyMzNGQzOTknLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuOCwgZWFzZTogJ2Vhc2VJbk91dCcgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Y3VycmVudFN0ZXBJbmRleCA9PT0gMCAmJiAnVGthbmthIHByemVkIGxhc2VyZW0nfVxuICAgICAgICAgICAgICAgICAge2N1cnJlbnRTdGVwSW5kZXggPT09IDEgJiYgJ0ltcHVscyAxNDcwbm0g4pqhJ31cbiAgICAgICAgICAgICAgICAgIHtjdXJyZW50U3RlcEluZGV4ID09PSAyICYmICdPYmt1cmN6b255IGd1emVrIOKckyd9XG4gICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUGxheWJhY2sgQ29udHJvbHMgJiBQcm9ncmVzcyBCYXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBzcGFjZS15LTIgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzUGxheWluZyghaXNQbGF5aW5nKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1wdXJwbGUtNjAwIGhvdmVyOmJnLXB1cnBsZS01MDAgdGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc1BsYXlpbmcgPyA8UGF1c2UgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiA6IDxQbGF5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldEFuaW1Qcm9ncmVzcygwKTtcbiAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50U3RlcEluZGV4KDApO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlpyZXN0YXJ0dWogc3ltdWxhY2rEmVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxSb3RhdGVDY3cgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1hbWJlci0zMDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlU3RlcC50aXRsZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBQcm9ncmVzcyBMaW5lICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTEuNSBiZy1zbGF0ZS04MDAgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTUwMCB0by1hbWJlci00MDAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHthbmltUHJvZ3Jlc3N9JWAgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJpZ2h0IENvbHVtbjogU3RlcCBFeHBsYW5hdGlvbnMgJiBDbGluaWNhbCBWYWx1ZSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTYgc3BhY2UteS01XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtcHVycGxlLTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgYmxvY2sgbWItMVwiPlxuICAgICAgICAgICAgICAgIHthY3RpdmVEYXRhLnN1YnRpdGxlfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQteGwgc206dGV4dC0yeGwgZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVN0ZXAudGl0bGV9XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBtdC0yIGxlYWRpbmctcmVsYXhlZCBmb250LW5vcm1hbFwiPlxuICAgICAgICAgICAgICAgIHthY3RpdmVTdGVwLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIENsaW5pY2FsIEhpZ2hsaWdodHMgQm94ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctcHVycGxlLTk1MC80MCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvMzAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXB1cnBsZS0zMDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8QXdhcmQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+RGxhY3plZ28gVGEgTWV0b2RhIEplc3QgWsWCb3R5bSBTdGFuZGFyZGVtIENNTD88L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSB0ZXh0LXhzIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAge2FjdGl2ZURhdGEuY2xpbmljYWxIaWdobGlnaHRzLm1hcCgoaGwsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2l9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntobH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGl0YWxpY1wiPlxuICAgICAgICAgICAgICBEciBuLiBtZWQuIEphbiBCdWpvayB1xbx5d2Egd3nFgsSFY3puaWUgY2VydHlmaWtvd2FueWNoIGxhc2Vyw7N3IG5pZW1pZWNraWVqIG1hcmtpIEJpb2xpdGVjIHogcGF0ZW50ZW0gxZt3aWF0xYJvd29kw7N3IGt1bGlzdHljaCAzNjDCsC5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUEwS1E7QUExS1IsU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0M7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFFQTtBQUFBLE9BR0s7QUFDUCxTQUFTLGNBQStCO0FBZ0J4QyxNQUFNLHNCQUE0QztBQUFBLEVBQ2hEO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxNQUNBO0FBQUEsUUFDRSxPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxRQUNFLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUFBLElBQ0Esb0JBQW9CO0FBQUEsTUFDbEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1As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