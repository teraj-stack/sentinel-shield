import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import {
  Sparkles,
  Award,
  CheckCircle2,
  ShieldCheck,
  BrainCircuit,
  FileText,
  Copy,
  Check,
  Stethoscope,
  Smile,
  Zap,
  Gift
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion, AnimatePresence } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
const CRYSTALS_INFO = [
  {
    id: 1,
    name: "Kryształ Precyzyjnego Słownictwa",
    moduleTitle: "Moduł 1: Opisywanie Objawów",
    description: "Nauczyłeś/aś się odróżniać rodzaje bólu i krwawienia oraz jak zwięźle przedstawić dolegliwości.",
    icon: "💎"
  },
  {
    id: 2,
    name: "Kryształ Przygotowania i Higieny",
    moduleTitle: "Moduł 2: Przygotowanie Bez Stresu",
    description: "Poznałeś/aś fakty o braku potrzeby przeczyszczeń i komforcie higieny osobistej.",
    icon: "💎"
  },
  {
    id: 3,
    name: "Kryształ Przebiegu Badania",
    moduleTitle: "Moduł 3: Przebieg Anoskopii",
    description: "Wiesz, jak wygląda badanie na boku z żelem znieczulającym w jednorazowych spodenkach.",
    icon: "💎"
  },
  {
    id: 4,
    name: "Kryształ Bezpieczeństwa",
    moduleTitle: "Moduł 4: Odmityzowanie Lęku",
    description: "Rozumiałeś/aś dlaczego szybka diagnoza to bezpieczeństwo zdrowotne i brak wstydu.",
    icon: "💎"
  },
  {
    id: 5,
    name: "Kryształ Ściągawki Wywiadu",
    moduleTitle: "Moduł 5: Karta Wyedukowanego Pacjenta",
    description: "Skonfigurowałeś/aś własną ściągawkę objawów, co skraca wywiad wstępny w gabinecie.",
    icon: "💎"
  }
];
export const ProctologyEducationGame = ({ onCollectCrystal }) => {
  const [collectedCrystals, setCollectedCrystals] = useState([1]);
  const [activeTab, setActiveTab] = useState(1);
  const [isCopiedVoucher, setIsCopiedVoucher] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [symptomMatchAnswers, setSymptomMatchAnswers] = useState({});
  const [isModule1Completed, setIsModule1Completed] = useState(false);
  const [revealedMyths, setRevealedMyths] = useState([]);
  const [currentWalkthroughStep, setCurrentWalkthroughStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [patientSummary, setPatientSummary] = useState({
    mainIssue: "Ból i pieczenie przy wypróżnieniu",
    duration: "od 3 miesięcy",
    bleeding: "Świeża krew na papierze toaletowym",
    priorTreatments: "Stosowanie maści bez recepty bez poprawy"
  });
  const unlockCrystal = (crystalId) => {
    if (!collectedCrystals.includes(crystalId)) {
      const updated = [...collectedCrystals, crystalId];
      setCollectedCrystals(updated);
      if (onCollectCrystal) {
        onCollectCrystal(crystalId);
      }
      if (updated.length === 5) {
        setShowCertificateModal(true);
      }
    }
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText("WYEDUKOWANY-CML-150");
    setIsCopiedVoucher(true);
    setTimeout(() => setIsCopiedVoucher(false), 3e3);
  };
  const isAllCrystalsCollected = collectedCrystals.length === 5;
  return /* @__PURE__ */ jsxDEV("section", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto", id: "akademia-pacjenta", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 sm:p-10 rounded-3xl bg-slate-900 text-white border border-purple-500/30 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
        lineNumber: 131,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3", children: [
            /* @__PURE__ */ jsxDEV(BrainCircuit, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 138,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Gra Edukacyjna & Win-Win dla Pacjenta" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 139,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 137,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-slate-100", children: "Akademia Wyedukowanego Pacjenta CML" }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 141,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed", children: [
            "Odmityzowujemy pierwszą wizytę proktologiczną! Poznaj przebieg badania, naucz się opisywać objawy i zbierz ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300 font-bold", children: "5 Kryształów Edukacyjnych" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 145,
              columnNumber: 122
            }, this),
            ". Dzięki Twojemu przygotowaniu rozmowa w gabinecie potrwa krócej – w nagrodę otrzymasz ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "rabat 150 zł" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 146,
              columnNumber: 100
            }, this),
            " na wizytę!"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 144,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
          lineNumber: 136,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950/80 border border-purple-500/40 shadow-inner flex flex-col items-center justify-center shrink-0 min-w-[240px]", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 153,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Twoje Kryształy CML" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 154,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 152,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 my-2", children: [1, 2, 3, 4, 5].map((id) => {
            const isCollected = collectedCrystals.includes(id);
            return /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => unlockCrystal(id),
                className: `w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${isCollected ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30 scale-105 border border-amber-300" : "bg-slate-800 text-slate-600 border border-slate-700 hover:border-purple-400 opacity-60"}`,
                title: isCollected ? `Kryształ #${id} zdobyty!` : `Kliknij moduł #${id}, aby odblokować`,
                children: isCollected ? "💎" : "🔒"
              },
              id,
              false,
              {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 160,
                columnNumber: 19
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 156,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-amber-300", children: [
            collectedCrystals.length,
            " / 5 Zbioru (",
            Math.round(collectedCrystals.length / 5 * 100),
            "%)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 175,
            columnNumber: 13
          }, this),
          isAllCrystalsCollected ? /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setShowCertificateModal(true),
              className: "mt-2 text-[11px] font-bold text-emerald-400 underline hover:text-emerald-300 flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsxDEV(Gift, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 183,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Certyfikat & Rabat -150 zł" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 184,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 179,
              columnNumber: 15
            },
            this
          ) : /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 mt-1", children: "Zbierz 5, by odebrać rabat na wizytę" }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 187,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
          lineNumber: 151,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 my-6", children: [
        { id: 1, title: "1. Opis Objawów", icon: FileText },
        { id: 2, title: "2. Mity & Higiena", icon: ShieldCheck },
        { id: 3, title: "3. Przebieg Anoskopii", icon: Stethoscope },
        { id: 4, title: "4. Brak Wstydu & Stresu", icon: Smile },
        { id: 5, title: "5. Ściągawka do Gabinetu", icon: CheckCircle2 }
      ].map((tab) => {
        const Icon = tab.icon;
        const isUnlocked = collectedCrystals.includes(tab.id);
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab(tab.id),
            className: `px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${activeTab === tab.id ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30" : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Icon, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 213,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: tab.title }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 214,
                columnNumber: 17
              }, this),
              isUnlocked && /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 text-xs", children: "💎" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 215,
                columnNumber: 32
              }, this)
            ]
          },
          tab.id,
          true,
          {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 204,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
        lineNumber: 193,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/70 p-6 sm:p-8 rounded-2xl border border-slate-800 relative", children: [
        activeTab === 1 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-white font-serif flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(FileText, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 229,
                  columnNumber: 21
                }, this),
                "Moduł 1: Jak Precyzyjnie Opisać Swoje Objawy?"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 228,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-1", children: "Większość pacjentów krępuje się używać odpowiednich słów. Oto precyzyjny słownik, dzięki któremu lekarz natychmiast zrozumie Twój problem." }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 232,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 227,
              columnNumber: 17
            }, this),
            !collectedCrystals.includes(1) && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => unlockCrystal(1),
                className: "px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-amber-500/30 transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Odbierz Kryształ #1" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 241,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "💎" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 242,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 237,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 226,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-xs uppercase tracking-wider text-purple-400 mb-2", children: "🩸 Krwawienie z odbytu:" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 250,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("ul", { className: "text-xs text-slate-300 space-y-2", children: [
                /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 255,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDEV("strong", { children: "Świeża, jaskrawoczerwona krew:" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 256,
                      columnNumber: 29
                    }, this),
                    " Najczęściej hemoroidy lub szczelina (krew na papierze lub kapiąca do muszli)."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 256,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 254,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold", children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 259,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDEV("strong", { children: "Ciemna krew lub z skrzepami:" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 260,
                      columnNumber: 29
                    }, this),
                    " Wymaga szybszej oceny wnętrza kanału."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 260,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 258,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold", children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 263,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDEV("strong", { children: "Zależność:" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 264,
                      columnNumber: 29
                    }, this),
                    " Zauważ, czy występuje wyłącznie podczas wypróżnienia, czy również na bieliznie."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 264,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 262,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 253,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 249,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-xs uppercase tracking-wider text-purple-400 mb-2", children: "⚡ Ból i Dyskomfort:" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 270,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("ul", { className: "text-xs text-slate-300 space-y-2", children: [
                /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 275,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDEV("strong", { children: "Ból palący / piekący po wypróżnieniu:" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 276,
                      columnNumber: 29
                    }, this),
                    " Często szczelina odbytu (może trwać od 15 min do 3h)."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 276,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 274,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400 font-bold", children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 279,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDEV("strong", { children: "Ból tętniący / narastający ciągle:" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 280,
                      columnNumber: 29
                    }, this),
                    " Podejrzenie ropnia lub zakrzepu brzeżnego."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 280,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 278,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("li", { className: "flex items-start gap-2", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold", children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 283,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    /* @__PURE__ */ jsxDEV("strong", { children: "Uczucie rozpierania / ciała obcego:" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 284,
                      columnNumber: 29
                    }, this),
                    " Wypadający guzek krwawniczy (hemoroid)."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 284,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 282,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 273,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 269,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 248,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-purple-950/40 border border-purple-500/30", children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-xs text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 293,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Szybki Trening Opisu: Odpowiedz na 3 pytania przed wizytą" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 294,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 292,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-xs", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 mb-1", children: "1. Jak długo trwają dolegliwości?" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 298,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    className: "w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200",
                    onChange: (e) => setSymptomMatchAnswers({ ...symptomMatchAnswers, d: e.target.value }),
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "", children: "Wybierz przedział czasu..." }, void 0, false, {
                        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                        lineNumber: 305,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "kilka-dni", children: "Kilka dni (ostry stan)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                        lineNumber: 306,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "1-3-miesiace", children: "1 - 3 miesiące" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                        lineNumber: 307,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "powyzej-roku", children: "Powyżej 1 roku (przewlekłe)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                        lineNumber: 308,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 299,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 297,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 mb-1", children: "2. Kiedy ból jest najbardziej nasilony?" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 313,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    className: "w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200",
                    onChange: (e) => setSymptomMatchAnswers({ ...symptomMatchAnswers, p: e.target.value }),
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "", children: "Wybierz moment..." }, void 0, false, {
                        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                        lineNumber: 320,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "w-trakcie", children: "W trakcie wypróżnienia" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                        lineNumber: 321,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "po-wyproznieniu", children: "Do kilku godzin po wypróżnieniu" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                        lineNumber: 322,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "przy-siedzeniu", children: "Podczas siedzenia lub chodzenia" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                        lineNumber: 323,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 314,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 312,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 296,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400", children: "Wypełnienie pomaga ustrukturyzować wywiad." }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 329,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    setIsModule1Completed(true);
                    unlockCrystal(1);
                  },
                  className: "px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "Potwierdzam Opanowanie Modułu 1" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 339,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "💎" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 340,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 332,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 328,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 291,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
          lineNumber: 225,
          columnNumber: 13
        }, this),
        activeTab === 2 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-white font-serif flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 353,
                  columnNumber: 21
                }, this),
                "Moduł 2: Przygotowanie i Higiena – Rozbijamy Mity!"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 352,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-1", children: "Wielu pacjentów odwleka wizytę ze strachu przed skomplikowanym lub bolesnym przygotowaniem. Oto brutalne fakty." }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 356,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 351,
              columnNumber: 17
            }, this),
            !collectedCrystals.includes(2) && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => unlockCrystal(2),
                className: "px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-amber-500/30 transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Odbierz Kryształ #2" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 365,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "💎" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 366,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 361,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 350,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            {
              id: 1,
              myth: "MIT: „Muszę być na czczo i głodzić się przed wizytą”",
              fact: "FAKT: Do pierwszej konsultacji proktologicznej i anoskopii NIE trzeba być na czczo! Możesz zjeść lekki posiłek i pić wodę."
            },
            {
              id: 2,
              myth: "MIT: „Muszę wykonać bolesną wlewkę lub lewatywę”",
              fact: "FAKT: Standardowe badanie anoskopowe ocenia odcinek 5-8 cm. Zwykłe wypróżnienie rano w dniu wizyty jest całkowicie wystarczające."
            },
            {
              id: 3,
              myth: "MIT: „Lekarz będzie mnie oceniał lub wstydził się mojej budowy”",
              fact: "FAKT: Dla dr. Jana Bujoka to codzienny zabieg medyczny. Zapewniamy jednorazowe spodenki z wycięciem i pełne poszanowanie intymności."
            }
          ].map((item) => {
            const isRevealed = revealedMyths.includes(item.id);
            return /* @__PURE__ */ jsxDEV(
              "div",
              {
                onClick: () => {
                  if (!isRevealed) setRevealedMyths([...revealedMyths, item.id]);
                },
                className: `p-4 rounded-xl border transition-all cursor-pointer ${isRevealed ? "bg-slate-900 border-emerald-500/50" : "bg-slate-900/60 border-slate-800 hover:border-purple-500/40"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase tracking-wider font-bold text-rose-400 block mb-1", children: item.myth }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 403,
                    columnNumber: 23
                  }, this),
                  isRevealed ? /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-emerald-300 font-medium leading-relaxed mt-2 border-t border-slate-800 pt-2", children: item.fact }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 407,
                    columnNumber: 25
                  }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-purple-300 font-bold block mt-3 underline", children: "Kliknij, aby poznać FAKT i rozbić mit →" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 411,
                    columnNumber: 25
                  }, this)
                ]
              },
              item.id,
              true,
              {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 392,
                columnNumber: 21
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 372,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => unlockCrystal(2),
              className: "px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5",
              children: /* @__PURE__ */ jsxDEV("span", { children: "Poznałem Zasady Przygotowania (Odbierz 💎 #2)" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 425,
                columnNumber: 19
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 421,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 420,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
          lineNumber: 349,
          columnNumber: 13
        }, this),
        activeTab === 3 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-white font-serif flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Stethoscope, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 437,
                  columnNumber: 21
                }, this),
                "Moduł 3: Przebieg Wizyty Krok po Kroku (Co się dzieje w gabinecie?)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 436,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-1", children: "Zobacz dokładnie, jak wygląda 15 minut w gabinecie dr. Jana Bujoka. Zero zaskoczenia!" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 440,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 435,
              columnNumber: 17
            }, this),
            !collectedCrystals.includes(3) && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => unlockCrystal(3),
                className: "px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-amber-500/30 transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Odbierz Kryształ #3" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 449,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "💎" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 450,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 445,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 434,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-3", children: [
            { title: "1. Wywiad Lekarski", time: "3-5 minut", desc: "Rozmowa o objawach, zebranie historii zdrowotnej w przyjaznej atmosferze." },
            { title: "2. Przygotowanie", time: "1 minuta", desc: "Przebranie się w jednorazowe spodenki badaniowe w prywatnej łazience." },
            { title: "3. Anoskopia", time: "60-90 sekund", desc: "Badanie na lewym boku. Używamy żelu z lidokainą (znieczulenie)." },
            { title: "4. Plan Leczenia", time: "5 minut", desc: "Przedstawienie rekomendacji (np. kwalifikacja do laseroterapii LHP)." }
          ].map((step, idx) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setCurrentWalkthroughStep(idx),
              className: `p-3.5 rounded-xl border text-left transition-all ${currentWalkthroughStep === idx ? "bg-purple-900/60 border-purple-400 text-white shadow-lg" : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"}`,
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-purple-300 font-bold block", children: [
                  "KROK 0",
                  idx + 1,
                  " (",
                  step.time,
                  ")"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 472,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold block text-slate-100 my-1", children: step.title }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 473,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-300 block line-clamp-2", children: step.desc }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 474,
                  columnNumber: 21
                }, this)
              ]
            },
            idx,
            true,
            {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 463,
              columnNumber: 19
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 456,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-purple-500/30 text-xs text-slate-200 flex items-start gap-3", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 481,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-white text-sm mb-1", children: "Gwarancja Komfortu w CML:" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 483,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "leading-relaxed text-slate-300", children: "Badanie anoskopowe wykonywane przez dr. Jana Bujoka jest nieinwazyjne i trwa zaledwie ponad minutę. Używamy ultracienkich, sterylnych wzierników oraz obfitej ilości żelu znieczulającego. Większość pacjentów przyznaje po badaniu: „To było o wiele łatwiejsze, niż sobie wyobrażałem!”." }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 486,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 482,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 480,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => unlockCrystal(3),
              className: "px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5",
              children: /* @__PURE__ */ jsxDEV("span", { children: "Zrozumiałem Przebieg Anoskopii (Odbierz 💎 #3)" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 497,
                columnNumber: 19
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 493,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 492,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
          lineNumber: 433,
          columnNumber: 13
        }, this),
        activeTab === 4 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-white font-serif flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Smile, { className: "w-5 h-5 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 509,
                  columnNumber: 21
                }, this),
                "Moduł 4: Odmityzowanie Lęku i Wstydu (Szybki Quiz)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 508,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-1", children: "Zdać mini-quiz z wiedzy o bezpieczeństwie proktologicznym i odbierz kolejny Kryształ!" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 512,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 507,
              columnNumber: 17
            }, this),
            !collectedCrystals.includes(4) && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => unlockCrystal(4),
                className: "px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-amber-500/30 transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Odbierz Kryształ #4" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 521,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "💎" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 522,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 517,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 506,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-slate-200", children: "Pytanie 1: Dlaczego wczesna konsultacja proktologiczna jest kluczowa?" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 529,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setQuizAnswers({ ...quizAnswers, 1: 1 }),
                    className: `p-2 rounded-lg border text-left transition-all ${quizAnswers[1] === 1 ? "bg-emerald-950 border-emerald-400 text-emerald-200" : "bg-slate-800 border-slate-700 text-slate-300"}`,
                    children: "A) Pozwala wykluczyć groźne powikłania i natychmiast uśmierzyć ból."
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 533,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setQuizAnswers({ ...quizAnswers, 1: 2 }),
                    className: `p-2 rounded-lg border text-left transition-all ${quizAnswers[1] === 2 ? "bg-rose-950 border-rose-400 text-rose-200" : "bg-slate-800 border-slate-700 text-slate-300"}`,
                    children: "B) Nie ma znaczenia, choroba sama przejdzie po maściach."
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 541,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 532,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 528,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-bold text-slate-200", children: "Pytanie 2: Czy metody laserowe (LHP/FiLaC) wymagają wycinania tkanek i bolesnych ran?" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 553,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setQuizAnswers({ ...quizAnswers, 2: 1 }),
                    className: `p-2 rounded-lg border text-left transition-all ${quizAnswers[2] === 1 ? "bg-emerald-950 border-emerald-400 text-emerald-200" : "bg-slate-800 border-slate-700 text-slate-300"}`,
                    children: "A) NIE! Laser zamyka naczynia od środka bez wycinania i szwów."
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 557,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setQuizAnswers({ ...quizAnswers, 2: 2 }),
                    className: `p-2 rounded-lg border text-left transition-all ${quizAnswers[2] === 2 ? "bg-rose-950 border-rose-400 text-rose-200" : "bg-slate-800 border-slate-700 text-slate-300"}`,
                    children: "B) TAK, to tradycyjna wycinająca operacja skalpelem."
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 565,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 556,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 552,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 527,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                setQuizSubmitted(true);
                unlockCrystal(4);
              },
              className: "px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5",
              children: /* @__PURE__ */ jsxDEV("span", { children: "Zatwierdź Odpowiedzi (Odbierz 💎 #4)" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 585,
                columnNumber: 19
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 578,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 577,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
          lineNumber: 505,
          columnNumber: 13
        }, this),
        activeTab === 5 && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-white font-serif flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 597,
                  columnNumber: 21
                }, this),
                "Moduł 5: Generator Ściągawki Wywiadu dla dr. Jana Bujoka"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 596,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-1", children: "Uzupełnij 3 krótkie pola. Wygenerowaną ściągawkę możesz zabrać na wizytę lub przesłać podczas rejestracji online!" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 600,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 595,
              columnNumber: 17
            }, this),
            !collectedCrystals.includes(5) && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => unlockCrystal(5),
                className: "px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-amber-500/30 transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Odbierz Kryształ #5" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 609,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "💎" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 610,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 605,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 594,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 mb-1 font-semibold", children: "Główny objaw (np. krwawienie, guzek, ból):" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 618,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: patientSummary.mainIssue,
                  onChange: (e) => setPatientSummary({ ...patientSummary, mainIssue: e.target.value }),
                  className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:border-purple-500 outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 619,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 617,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 mb-1 font-semibold", children: "Czas trwania (np. 2 tygodnie, 6 miesięcy):" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 628,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: patientSummary.duration,
                  onChange: (e) => setPatientSummary({ ...patientSummary, duration: e.target.value }),
                  className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:border-purple-500 outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 629,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 627,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-300 mb-1 font-semibold", children: "Dotychczasowe próby leczenia (np. maści, czopki):" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 638,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: patientSummary.priorTreatments,
                  onChange: (e) => setPatientSummary({ ...patientSummary, priorTreatments: e.target.value }),
                  className: "w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:border-purple-500 outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 639,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 637,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 616,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-purple-500/40 text-xs text-slate-200 relative", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-purple-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Award, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 652,
                  columnNumber: 21
                }, this),
                "Karta Wyedukowanego Pacjenta CML (Gotowa do gabinetu):"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 651,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/40", children: "Oszczędność czasu wywiadu: ~60%" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 655,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 650,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-slate-300 font-mono text-[11px]", children: [
              /* @__PURE__ */ jsxDEV("p", { children: [
                "• ",
                /* @__PURE__ */ jsxDEV("strong", { children: "Główny problem:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 660,
                  columnNumber: 24
                }, this),
                " ",
                patientSummary.mainIssue
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 660,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { children: [
                "• ",
                /* @__PURE__ */ jsxDEV("strong", { children: "Czas trwania:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 661,
                  columnNumber: 24
                }, this),
                " ",
                patientSummary.duration
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 661,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { children: [
                "• ",
                /* @__PURE__ */ jsxDEV("strong", { children: "Dotychczas leczono:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 662,
                  columnNumber: 24
                }, this),
                " ",
                patientSummary.priorTreatments
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 662,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 659,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 649,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center pt-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400", children: "Ukończenie tego modułu odblokowuje Ostatni Kryształ #5!" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 667,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  unlockCrystal(5);
                },
                className: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center gap-2",
                children: [
                  /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-slate-950" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 676,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Zakończ Edukację & Odbierz Rabat -150 zł 💎" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 677,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 670,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 666,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
          lineNumber: 593,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
        lineNumber: 222,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
      lineNumber: 129,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: showCertificateModal && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4", children: /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        className: "w-full max-w-xl bg-slate-900 rounded-3xl border-2 border-amber-400/60 shadow-2xl p-6 sm:p-8 text-white relative overflow-hidden",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 696,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-center space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30 font-bold", children: "💎" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 699,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2", children: [
                /* @__PURE__ */ jsxDEV(Award, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 705,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Oficjalny Certyfikat Pacjenta CML" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 706,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 704,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-2xl font-bold text-slate-100", children: "Gratulacje! Jesteś Wyedukowanym Pacjentem" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 708,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed", children: [
                "Zebrałeś/aś komplet ",
                /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: "5 Kryształów Edukacyjnych" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 712,
                  columnNumber: 41
                }, this),
                ". Rozumiesz przebieg pierwszej wizyty, anoskopii oraz zasady opisywania objawów."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 711,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 703,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-950 border border-purple-500/40 text-left space-y-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-purple-300 uppercase tracking-wider block", children: "🤝 Korzyść Systemu Win-Win (Dla Ciebie i Lekarza):" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 718,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-emerald-400 block mb-0.5", children: "Dla Pacjenta:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 723,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "Wizyta tańsza o 150 zł, zero lęku, pełna znajomość badania." }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 724,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 722,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-800", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-indigo-400 block mb-0.5", children: "Dla dr. Jana Bujoka:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 727,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "Krótszy wywiad wstępny i szybsze przejście do precyzyjnego leczenia." }, void 0, false, {
                    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                    lineNumber: 728,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 726,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 721,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 717,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-purple-500/20 to-indigo-500/20 border border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-mono tracking-wider text-amber-300 block", children: "Twój Dedykowany Kod Rabatowy:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 736,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xl font-bold text-white tracking-widest", children: "WYEDUKOWANY-CML-150" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 737,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                lineNumber: 735,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleCopyCode,
                  className: "px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-md",
                  children: [
                    isCopiedVoucher ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-950" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 743,
                      columnNumber: 40
                    }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4 text-slate-950" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 743,
                      columnNumber: 89
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: isCopiedVoucher ? "Skopiowano!" : "Skopiuj Kod" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                      lineNumber: 744,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 739,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 734,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-2 flex flex-col sm:flex-row items-center justify-center gap-3", children: [
              /* @__PURE__ */ jsxDEV(
                "a",
                {
                  href: "tel:+48510432361",
                  className: "w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-lg text-center no-underline",
                  children: "Zarezerwuj Wizytę z Rabatem (-150 zł)"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 749,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setShowCertificateModal(false),
                  className: "w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all",
                  children: "Zamknij Okno"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
                  lineNumber: 755,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
              lineNumber: 748,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
            lineNumber: 698,
            columnNumber: 15
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
        lineNumber: 689,
        columnNumber: 13
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
      lineNumber: 688,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
      lineNumber: 686,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ProctologyEducationGame.tsx",
    lineNumber: 128,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2N0b2xvZ3lFZHVjYXRpb25HYW1lLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBTcGFya2xlcyxcbiAgQXdhcmQsXG4gIENoZWNrQ2lyY2xlMixcbiAgU2hpZWxkQ2hlY2ssXG4gIEJyYWluQ2lyY3VpdCxcbiAgSGVscENpcmNsZSxcbiAgQ2xvY2ssXG4gIEhlYXJ0LFxuICBGaWxlVGV4dCxcbiAgQ29weSxcbiAgQ2hlY2ssXG4gIENoZXZyb25SaWdodCxcbiAgRmxhbWUsXG4gIFVzZXJDaGVjayxcbiAgU3RldGhvc2NvcGUsXG4gIFNtaWxlLFxuICBaYXAsXG4gIEdpZnQsXG4gIEFsZXJ0Q2lyY2xlLFxuICBMb2NrLFxuICBSb3RhdGVDY3csXG4gIFNwYXJrbGUsXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbmludGVyZmFjZSBDcnlzdGFsSXRlbSB7XG4gIGlkOiBudW1iZXI7XG4gIG5hbWU6IHN0cmluZztcbiAgbW9kdWxlVGl0bGU6IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgaWNvbjogc3RyaW5nO1xufVxuXG5jb25zdCBDUllTVEFMU19JTkZPOiBDcnlzdGFsSXRlbVtdID0gW1xuICB7XG4gICAgaWQ6IDEsXG4gICAgbmFtZTogJ0tyeXN6dGHFgiBQcmVjeXp5am5lZ28gU8WCb3duaWN0d2EnLFxuICAgIG1vZHVsZVRpdGxlOiAnTW9kdcWCIDE6IE9waXN5d2FuaWUgT2JqYXfDs3cnLFxuICAgIGRlc2NyaXB0aW9uOiAnTmF1Y3p5xYJlxZsvYcWbIHNpxJkgb2Ryw7PFvG5pYcSHIHJvZHphamUgYsOzbHUgaSBrcndhd2llbmlhIG9yYXogamFrIHp3acSZxbpsZSBwcnplZHN0YXdpxIcgZG9sZWdsaXdvxZtjaS4nLFxuICAgIGljb246ICfwn5KOJyxcbiAgfSxcbiAge1xuICAgIGlkOiAyLFxuICAgIG5hbWU6ICdLcnlzenRhxYIgUHJ6eWdvdG93YW5pYSBpIEhpZ2llbnknLFxuICAgIG1vZHVsZVRpdGxlOiAnTW9kdcWCIDI6IFByenlnb3Rvd2FuaWUgQmV6IFN0cmVzdScsXG4gICAgZGVzY3JpcHRpb246ICdQb3puYcWCZcWbL2HFmyBmYWt0eSBvIGJyYWt1IHBvdHJ6ZWJ5IHByemVjenlzemN6ZcWEIGkga29tZm9yY2llIGhpZ2llbnkgb3NvYmlzdGVqLicsXG4gICAgaWNvbjogJ/Cfko4nLFxuICB9LFxuICB7XG4gICAgaWQ6IDMsXG4gICAgbmFtZTogJ0tyeXN6dGHFgiBQcnplYmllZ3UgQmFkYW5pYScsXG4gICAgbW9kdWxlVGl0bGU6ICdNb2R1xYIgMzogUHJ6ZWJpZWcgQW5vc2tvcGlpJyxcbiAgICBkZXNjcmlwdGlvbjogJ1dpZXN6LCBqYWsgd3lnbMSFZGEgYmFkYW5pZSBuYSBib2t1IHogxbxlbGVtIHpuaWVjenVsYWrEhWN5bSB3IGplZG5vcmF6b3d5Y2ggc3BvZGVua2FjaC4nLFxuICAgIGljb246ICfwn5KOJyxcbiAgfSxcbiAge1xuICAgIGlkOiA0LFxuICAgIG5hbWU6ICdLcnlzenRhxYIgQmV6cGllY3plxYRzdHdhJyxcbiAgICBtb2R1bGVUaXRsZTogJ01vZHXFgiA0OiBPZG1pdHl6b3dhbmllIEzEmWt1JyxcbiAgICBkZXNjcmlwdGlvbjogJ1JvenVtaWHFgmXFmy9hxZsgZGxhY3plZ28gc3p5YmthIGRpYWdub3phIHRvIGJlenBpZWN6ZcWEc3R3byB6ZHJvd290bmUgaSBicmFrIHdzdHlkdS4nLFxuICAgIGljb246ICfwn5KOJyxcbiAgfSxcbiAge1xuICAgIGlkOiA1LFxuICAgIG5hbWU6ICdLcnlzenRhxYIgxZpjacSFZ2F3a2kgV3l3aWFkdScsXG4gICAgbW9kdWxlVGl0bGU6ICdNb2R1xYIgNTogS2FydGEgV3llZHVrb3dhbmVnbyBQYWNqZW50YScsXG4gICAgZGVzY3JpcHRpb246ICdTa29uZmlndXJvd2HFgmXFmy9hxZsgd8WCYXNuxIUgxZtjacSFZ2F3a8SZIG9iamF3w7N3LCBjbyBza3JhY2Egd3l3aWFkIHdzdMSZcG55IHcgZ2FiaW5lY2llLicsXG4gICAgaWNvbjogJ/Cfko4nLFxuICB9LFxuXTtcblxuaW50ZXJmYWNlIFByb2N0b2xvZ3lFZHVjYXRpb25HYW1lUHJvcHMge1xuICBvbkNvbGxlY3RDcnlzdGFsPzogKGNyeXN0YWxJZDogbnVtYmVyKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgUHJvY3RvbG9neUVkdWNhdGlvbkdhbWU6IFJlYWN0LkZDPFByb2N0b2xvZ3lFZHVjYXRpb25HYW1lUHJvcHM+ID0gKHsgb25Db2xsZWN0Q3J5c3RhbCB9KSA9PiB7XG4gIGNvbnN0IFtjb2xsZWN0ZWRDcnlzdGFscywgc2V0Q29sbGVjdGVkQ3J5c3RhbHNdID0gdXNlU3RhdGU8bnVtYmVyW10+KFsxXSk7IC8vIFN0YXJ0IHdpdGggMSB1bmxvY2tlZCBvciAwXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTxudW1iZXI+KDEpO1xuICBjb25zdCBbaXNDb3BpZWRWb3VjaGVyLCBzZXRJc0NvcGllZFZvdWNoZXJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd0NlcnRpZmljYXRlTW9kYWwsIHNldFNob3dDZXJ0aWZpY2F0ZU1vZGFsXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBJbnRlcmFjdGl2ZSBzdGF0ZSBmb3IgTW9kdWxlIDEgKFN5bXB0b20gTWF0Y2hpbmcpXG4gIGNvbnN0IFtzeW1wdG9tTWF0Y2hBbnN3ZXJzLCBzZXRTeW1wdG9tTWF0Y2hBbnN3ZXJzXSA9IHVzZVN0YXRlPFJlY29yZDxzdHJpbmcsIHN0cmluZz4+KHt9KTtcbiAgY29uc3QgW2lzTW9kdWxlMUNvbXBsZXRlZCwgc2V0SXNNb2R1bGUxQ29tcGxldGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBJbnRlcmFjdGl2ZSBzdGF0ZSBmb3IgTW9kdWxlIDIgKE15dGhzIHZzIEZhY3RzKVxuICBjb25zdCBbcmV2ZWFsZWRNeXRocywgc2V0UmV2ZWFsZWRNeXRoc10gPSB1c2VTdGF0ZTxudW1iZXJbXT4oW10pO1xuXG4gIC8vIEludGVyYWN0aXZlIHN0YXRlIGZvciBNb2R1bGUgMyAoU3RlcCBXYWxrdGhyb3VnaClcbiAgY29uc3QgW2N1cnJlbnRXYWxrdGhyb3VnaFN0ZXAsIHNldEN1cnJlbnRXYWxrdGhyb3VnaFN0ZXBdID0gdXNlU3RhdGUoMCk7XG5cbiAgLy8gSW50ZXJhY3RpdmUgc3RhdGUgZm9yIE1vZHVsZSA0IChRdWl6KVxuICBjb25zdCBbcXVpekFuc3dlcnMsIHNldFF1aXpBbnN3ZXJzXSA9IHVzZVN0YXRlPFJlY29yZDxudW1iZXIsIG51bWJlcj4+KHt9KTtcbiAgY29uc3QgW3F1aXpTdWJtaXR0ZWQsIHNldFF1aXpTdWJtaXR0ZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIEludGVyYWN0aXZlIHN0YXRlIGZvciBNb2R1bGUgNSAoQ2hlYXQgU2hlZXQgQnVpbGRlcilcbiAgY29uc3QgW3BhdGllbnRTdW1tYXJ5LCBzZXRQYXRpZW50U3VtbWFyeV0gPSB1c2VTdGF0ZSh7XG4gICAgbWFpbklzc3VlOiAnQsOzbCBpIHBpZWN6ZW5pZSBwcnp5IHd5cHLDs8W8bmllbml1JyxcbiAgICBkdXJhdGlvbjogJ29kIDMgbWllc2nEmWN5JyxcbiAgICBibGVlZGluZzogJ8Wad2llxbxhIGtyZXcgbmEgcGFwaWVyemUgdG9hbGV0b3d5bScsXG4gICAgcHJpb3JUcmVhdG1lbnRzOiAnU3Rvc293YW5pZSBtYcWbY2kgYmV6IHJlY2VwdHkgYmV6IHBvcHJhd3knLFxuICB9KTtcblxuICBjb25zdCB1bmxvY2tDcnlzdGFsID0gKGNyeXN0YWxJZDogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFjb2xsZWN0ZWRDcnlzdGFscy5pbmNsdWRlcyhjcnlzdGFsSWQpKSB7XG4gICAgICBjb25zdCB1cGRhdGVkID0gWy4uLmNvbGxlY3RlZENyeXN0YWxzLCBjcnlzdGFsSWRdO1xuICAgICAgc2V0Q29sbGVjdGVkQ3J5c3RhbHModXBkYXRlZCk7XG4gICAgICBpZiAob25Db2xsZWN0Q3J5c3RhbCkge1xuICAgICAgICBvbkNvbGxlY3RDcnlzdGFsKGNyeXN0YWxJZCk7XG4gICAgICB9XG4gICAgICBpZiAodXBkYXRlZC5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgc2V0U2hvd0NlcnRpZmljYXRlTW9kYWwodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlDb2RlID0gKCkgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KCdXWUVEVUtPV0FOWS1DTUwtMTUwJyk7XG4gICAgc2V0SXNDb3BpZWRWb3VjaGVyKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SXNDb3BpZWRWb3VjaGVyKGZhbHNlKSwgMzAwMCk7XG4gIH07XG5cbiAgY29uc3QgaXNBbGxDcnlzdGFsc0NvbGxlY3RlZCA9IGNvbGxlY3RlZENyeXN0YWxzLmxlbmd0aCA9PT0gNTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTE2IHB4LTQgc206cHgtNiBsZzpweC04IG1heC13LTZ4bCBteC1hdXRvXCIgaWQ9XCJha2FkZW1pYS1wYWNqZW50YVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgc206cC0xMCByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAgdGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvMzAgc2hhZG93LTJ4bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgey8qIEJhY2tncm91bmQgRGVjb3JhdGl2ZSBHbG93ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMjQgLXJpZ2h0LTI0IHctOTYgaC05NiBiZy1wdXJwbGUtNjAwLzIwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtYm90dG9tLTI0IC1sZWZ0LTI0IHctOTYgaC05NiBiZy1pbmRpZ28tNjAwLzIwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICB7LyogVG9wIEhlYWRlciBCYWRnZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGxnOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTYgcGItOCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMuNSBweS0xLjUgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNTAwLzIwIHRvLWluZGlnby01MDAvMjAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzMwIHRleHQtcHVycGxlLTMwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTNcIj5cbiAgICAgICAgICAgICAgPEJyYWluQ2lyY3VpdCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5HcmEgRWR1a2FjeWpuYSAmIFdpbi1XaW4gZGxhIFBhY2plbnRhPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgQWthZGVtaWEgV3llZHVrb3dhbmVnbyBQYWNqZW50YSBDTUxcbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMSBtYXgtdy0yeGwgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIE9kbWl0eXpvd3VqZW15IHBpZXJ3c3rEhSB3aXp5dMSZIHByb2t0b2xvZ2ljem7EhSEgUG96bmFqIHByemViaWVnIGJhZGFuaWEsIG5hdWN6IHNpxJkgb3Bpc3l3YcSHIG9iamF3eSBpIHpiaWVyeiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZm9udC1ib2xkXCI+NSBLcnlzenRhxYLDs3cgRWR1a2FjeWpueWNoPC9zcGFuPi4gXG4gICAgICAgICAgICAgIER6acSZa2kgVHdvamVtdSBwcnp5Z290b3dhbml1IHJvem1vd2EgdyBnYWJpbmVjaWUgcG90cndhIGtyw7NjZWog4oCTIHcgbmFncm9kxJkgb3RyenltYXN6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+cmFiYXQgMTUwIHrFgjwvc3Bhbj4gbmEgd2l6eXTEmSFcbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBHYW1pZmljYXRpb24gQ3J5c3RhbCBUcmFja2VyIEJveCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzQwIHNoYWRvdy1pbm5lciBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaHJpbmstMCBtaW4tdy1bMjQwcHhdXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTEgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Ud29qZSBLcnlzenRhxYJ5IENNTDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBteS0yXCI+XG4gICAgICAgICAgICAgIHtbMSwgMiwgMywgNCwgNV0ubWFwKChpZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQ29sbGVjdGVkID0gY29sbGVjdGVkQ3J5c3RhbHMuaW5jbHVkZXMoaWQpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17aWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVubG9ja0NyeXN0YWwoaWQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTkgaC05IHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1sZyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgIGlzQ29sbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1iciBmcm9tLWFtYmVyLTQwMCB0by1hbWJlci02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LWFtYmVyLTUwMC8zMCBzY2FsZS0xMDUgYm9yZGVyIGJvcmRlci1hbWJlci0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS02MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgaG92ZXI6Ym9yZGVyLXB1cnBsZS00MDAgb3BhY2l0eS02MCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPXtpc0NvbGxlY3RlZCA/IGBLcnlzenRhxYIgIyR7aWR9IHpkb2J5dHkhYCA6IGBLbGlrbmlqIG1vZHXFgiAjJHtpZH0sIGFieSBvZGJsb2tvd2HEh2B9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc0NvbGxlY3RlZCA/ICfwn5KOJyA6ICfwn5SSJ31cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTMwMFwiPlxuICAgICAgICAgICAgICB7Y29sbGVjdGVkQ3J5c3RhbHMubGVuZ3RofSAvIDUgWmJpb3J1ICh7TWF0aC5yb3VuZCgoY29sbGVjdGVkQ3J5c3RhbHMubGVuZ3RoIC8gNSkgKiAxMDApfSUpXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICB7aXNBbGxDcnlzdGFsc0NvbGxlY3RlZCA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dDZXJ0aWZpY2F0ZU1vZGFsKHRydWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTIgdGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDAgdW5kZXJsaW5lIGhvdmVyOnRleHQtZW1lcmFsZC0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPEdpZnQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogQ2VydHlmaWthdCAmIFJhYmF0IC0xNTAgesWCPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIG10LTFcIj5aYmllcnogNSwgYnkgb2RlYnJhxIcgcmFiYXQgbmEgd2l6eXTEmTwvc3Bhbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUYWIgTmF2aWdhdGlvbiBNb2R1bGVzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMiBteS02XCI+XG4gICAgICAgICAge1tcbiAgICAgICAgICAgIHsgaWQ6IDEsIHRpdGxlOiAnMS4gT3BpcyBPYmphd8OzdycsIGljb246IEZpbGVUZXh0IH0sXG4gICAgICAgICAgICB7IGlkOiAyLCB0aXRsZTogJzIuIE1pdHkgJiBIaWdpZW5hJywgaWNvbjogU2hpZWxkQ2hlY2sgfSxcbiAgICAgICAgICAgIHsgaWQ6IDMsIHRpdGxlOiAnMy4gUHJ6ZWJpZWcgQW5vc2tvcGlpJywgaWNvbjogU3RldGhvc2NvcGUgfSxcbiAgICAgICAgICAgIHsgaWQ6IDQsIHRpdGxlOiAnNC4gQnJhayBXc3R5ZHUgJiBTdHJlc3UnLCBpY29uOiBTbWlsZSB9LFxuICAgICAgICAgICAgeyBpZDogNSwgdGl0bGU6ICc1LiDFmmNpxIVnYXdrYSBkbyBHYWJpbmV0dScsIGljb246IENoZWNrQ2lyY2xlMiB9LFxuICAgICAgICAgIF0ubWFwKCh0YWIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IEljb24gPSB0YWIuaWNvbjtcbiAgICAgICAgICAgIGNvbnN0IGlzVW5sb2NrZWQgPSBjb2xsZWN0ZWRDcnlzdGFscy5pbmNsdWRlcyh0YWIuaWQpO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17dGFiLmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYih0YWIuaWQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09IHRhYi5pZFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtNjAwLzMwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAvODAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6Ymctc2xhdGUtNzAwIGhvdmVyOnRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAvNjAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3RhYi50aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAge2lzVW5sb2NrZWQgJiYgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgdGV4dC14c1wiPvCfko48L3NwYW4+fVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUYWIgQ29udGVudCBEaXNwbGF5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC83MCBwLTYgc206cC04IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgey8qIE1PRFVMRSAxOiBIb3cgdG8gRGVzY3JpYmUgU3ltcHRvbXMgKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gMSAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtc2VyaWYgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgTW9kdcWCIDE6IEphayBQcmVjeXp5am5pZSBPcGlzYcSHIFN3b2plIE9iamF3eT9cbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgV2nEmWtzem/Fm8SHIHBhY2plbnTDs3cga3LEmXB1amUgc2nEmSB1xbx5d2HEhyBvZHBvd2llZG5pY2ggc8WCw7N3LiBPdG8gcHJlY3l6eWpueSBzxYJvd25paywgZHppxJlraSBrdMOzcmVtdSBsZWthcnogbmF0eWNobWlhc3QgenJvenVtaWUgVHfDs2ogcHJvYmxlbS5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IWNvbGxlY3RlZENyeXN0YWxzLmluY2x1ZGVzKDEpICYmIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdW5sb2NrQ3J5c3RhbCgxKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1hbWJlci01MDAvMjAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvNDAgdGV4dC1hbWJlci0zMDAgdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaHJpbmstMCBob3ZlcjpiZy1hbWJlci01MDAvMzAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5PZGJpZXJ6IEtyeXN6dGHFgiAjMTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+8J+Sjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTeW1wdG9tIERlc2NyaXB0aW9ucyBUYWJsZSBHcmlkICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXhzIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LXB1cnBsZS00MDAgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICDwn6m4IEtyd2F3aWVuaWUgeiBvZGJ5dHU6XG4gICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PHN0cm9uZz7FmndpZcW8YSwgamFza3Jhd29jemVyd29uYSBrcmV3Ojwvc3Ryb25nPiBOYWpjesSZxZtjaWVqIGhlbW9yb2lkeSBsdWIgc3pjemVsaW5hIChrcmV3IG5hIHBhcGllcnplIGx1YiBrYXBpxIVjYSBkbyBtdXN6bGkpLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LWJvbGRcIj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PHN0cm9uZz5DaWVtbmEga3JldyBsdWIgeiBza3J6ZXBhbWk6PC9zdHJvbmc+IFd5bWFnYSBzenlic3plaiBvY2VueSB3bsSZdHJ6YSBrYW5hxYJ1Ljwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkXCI+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxzdHJvbmc+WmFsZcW8bm/Fm8SHOjwvc3Ryb25nPiBaYXV3YcW8LCBjenkgd3lzdMSZcHVqZSB3ecWCxIVjem5pZSBwb2RjemFzIHd5cHLDs8W8bmllbmlhLCBjenkgcsOzd25pZcW8IG5hIGJpZWxpem5pZS48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC14cyB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1wdXJwbGUtNDAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAg4pqhIELDs2wgaSBEeXNrb21mb3J0OlxuICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjxzdHJvbmc+QsOzbCBwYWzEhWN5IC8gcGlla8SFY3kgcG8gd3lwcsOzxbxuaWVuaXU6PC9zdHJvbmc+IEN6xJlzdG8gc3pjemVsaW5hIG9kYnl0dSAobW/FvGUgdHJ3YcSHIG9kIDE1IG1pbiBkbyAzaCkuPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNDAwIGZvbnQtYm9sZFwiPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj48c3Ryb25nPkLDs2wgdMSZdG5pxIVjeSAvIG5hcmFzdGFqxIVjeSBjacSFZ2xlOjwvc3Ryb25nPiBQb2RlanJ6ZW5pZSByb3BuaWEgbHViIHpha3J6ZXB1IGJyemXFvG5lZ28uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LWJvbGRcIj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+PHN0cm9uZz5VY3p1Y2llIHJvenBpZXJhbmlhIC8gY2lhxYJhIG9iY2Vnbzo8L3N0cm9uZz4gV3lwYWRhasSFY3kgZ3V6ZWsga3J3YXduaWN6eSAoaGVtb3JvaWQpLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBJbnRlcmFjdGl2ZSBNaW5pIFRhc2sgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctcHVycGxlLTk1MC80MCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvMzBcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQteHMgdGV4dC1wdXJwbGUtMzAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+U3p5YmtpIFRyZW5pbmcgT3Bpc3U6IE9kcG93aWVkeiBuYSAzIHB5dGFuaWEgcHJ6ZWQgd2l6eXTEhTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+MS4gSmFrIGTFgnVnbyB0cndhasSFIGRvbGVnbGl3b8WbY2k/PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBwLTIgdGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFN5bXB0b21NYXRjaEFuc3dlcnMoeyAuLi5zeW1wdG9tTWF0Y2hBbnN3ZXJzLCBkOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5XeWJpZXJ6IHByemVkemlhxYIgY3phc3UuLi48L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwia2lsa2EtZG5pXCI+S2lsa2EgZG5pIChvc3RyeSBzdGFuKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIxLTMtbWllc2lhY2VcIj4xIC0gMyBtaWVzacSFY2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicG93eXplai1yb2t1XCI+UG93ecW8ZWogMSByb2t1IChwcnpld2xla8WCZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIG1iLTFcIj4yLiBLaWVkeSBiw7NsIGplc3QgbmFqYmFyZHppZWogbmFzaWxvbnk/PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC1sZyBwLTIgdGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFN5bXB0b21NYXRjaEFuc3dlcnMoeyAuLi5zeW1wdG9tTWF0Y2hBbnN3ZXJzLCBwOiBlLnRhcmdldC52YWx1ZSB9KVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5XeWJpZXJ6IG1vbWVudC4uLjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJ3LXRyYWtjaWVcIj5XIHRyYWtjaWUgd3lwcsOzxbxuaWVuaWE8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicG8td3lwcm96bmllbml1XCI+RG8ga2lsa3UgZ29kemluIHBvIHd5cHLDs8W8bmllbml1PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInByenktc2llZHplbml1XCI+UG9kY3phcyBzaWVkemVuaWEgbHViIGNob2R6ZW5pYTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgV3lwZcWCbmllbmllIHBvbWFnYSB1c3RydWt0dXJ5em93YcSHIHd5d2lhZC5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHNldElzTW9kdWxlMUNvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB1bmxvY2tDcnlzdGFsKDEpO1xuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1wdXJwbGUtNjAwIGhvdmVyOmJnLXB1cnBsZS03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC14cyB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbWQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvdHdpZXJkemFtIE9wYW5vd2FuaWUgTW9kdcWCdSAxPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7wn5KOPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBNT0RVTEUgMjogTXl0aHMgdnMgRmFjdHMgJiBQcmVwYXJhdGlvbiAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAyICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1zZXJpZiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICBNb2R1xYIgMjogUHJ6eWdvdG93YW5pZSBpIEhpZ2llbmEg4oCTIFJvemJpamFteSBNaXR5IVxuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICBXaWVsdSBwYWNqZW50w7N3IG9kd2xla2Egd2l6eXTEmSB6ZSBzdHJhY2h1IHByemVkIHNrb21wbGlrb3dhbnltIGx1YiBib2xlc255bSBwcnp5Z290b3dhbmllbS4gT3RvIGJydXRhbG5lIGZha3R5LlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHshY29sbGVjdGVkQ3J5c3RhbHMuaW5jbHVkZXMoMikgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB1bmxvY2tDcnlzdGFsKDIpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLWFtYmVyLTUwMC8yMCBib3JkZXIgYm9yZGVyLWFtYmVyLTQwMC80MCB0ZXh0LWFtYmVyLTMwMCB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNocmluay0wIGhvdmVyOmJnLWFtYmVyLTUwMC8zMCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk9kYmllcnogS3J5c3p0YcWCICMyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7wn5KOPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIE15dGhzIENhcmRzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgICAgICAgbXl0aDogJ01JVDog4oCeTXVzesSZIGJ5xIcgbmEgY3pjem8gaSBnxYJvZHppxIcgc2nEmSBwcnplZCB3aXp5dMSF4oCdJyxcbiAgICAgICAgICAgICAgICAgICAgZmFjdDogJ0ZBS1Q6IERvIHBpZXJ3c3plaiBrb25zdWx0YWNqaSBwcm9rdG9sb2dpY3puZWogaSBhbm9za29waWkgTklFIHRyemViYSBiecSHIG5hIGN6Y3pvISBNb8W8ZXN6IHpqZcWbxIcgbGVra2kgcG9zacWCZWsgaSBwacSHIHdvZMSZLicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgICAgICAgICAgbXl0aDogJ01JVDog4oCeTXVzesSZIHd5a29uYcSHIGJvbGVzbsSFIHdsZXdrxJkgbHViIGxld2F0eXfEmeKAnScsXG4gICAgICAgICAgICAgICAgICAgIGZhY3Q6ICdGQUtUOiBTdGFuZGFyZG93ZSBiYWRhbmllIGFub3Nrb3Bvd2Ugb2NlbmlhIG9kY2luZWsgNS04IGNtLiBad3lrxYJlIHd5cHLDs8W8bmllbmllIHJhbm8gdyBkbml1IHdpenl0eSBqZXN0IGNhxYJrb3dpY2llIHd5c3RhcmN6YWrEhWNlLicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgICAgICAgICAgbXl0aDogJ01JVDog4oCeTGVrYXJ6IGLEmWR6aWUgbW5pZSBvY2VuaWHFgiBsdWIgd3N0eWR6acWCIHNpxJkgbW9qZWogYnVkb3d54oCdJyxcbiAgICAgICAgICAgICAgICAgICAgZmFjdDogJ0ZBS1Q6IERsYSBkci4gSmFuYSBCdWpva2EgdG8gY29kemllbm55IHphYmllZyBtZWR5Y3pueS4gWmFwZXduaWFteSBqZWRub3Jhem93ZSBzcG9kZW5raSB6IHd5Y2nEmWNpZW0gaSBwZcWCbmUgcG9zemFub3dhbmllIGludHltbm/Fm2NpLicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0ubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc1JldmVhbGVkID0gcmV2ZWFsZWRNeXRocy5pbmNsdWRlcyhpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1JldmVhbGVkKSBzZXRSZXZlYWxlZE15dGhzKFsuLi5yZXZlYWxlZE15dGhzLCBpdGVtLmlkXSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzUmV2ZWFsZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTAwIGJvcmRlci1lbWVyYWxkLTUwMC81MCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzYwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXB1cnBsZS01MDAvNDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZm9udC1ib2xkIHRleHQtcm9zZS00MDAgYmxvY2sgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0ubXl0aH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAge2lzUmV2ZWFsZWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZW1lcmFsZC0zMDAgZm9udC1tZWRpdW0gbGVhZGluZy1yZWxheGVkIG10LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBwdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLmZhY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1wdXJwbGUtMzAwIGZvbnQtYm9sZCBibG9jayBtdC0zIHVuZGVybGluZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBLbGlrbmlqLCBhYnkgcG96bmHEhyBGQUtUIGkgcm96YmnEhyBtaXQg4oaSXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgcHQtMlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVubG9ja0NyeXN0YWwoMil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC14cyB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbWQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UG96bmHFgmVtIFphc2FkeSBQcnp5Z290b3dhbmlhIChPZGJpZXJ6IPCfko4gIzIpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogTU9EVUxFIDM6IFdhbGt0aHJvdWdoIG9mIHRoZSBGaXJzdCBWaXNpdCAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAzICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1zZXJpZiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8U3RldGhvc2NvcGUgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgTW9kdcWCIDM6IFByemViaWVnIFdpenl0eSBLcm9rIHBvIEtyb2t1IChDbyBzacSZIGR6aWVqZSB3IGdhYmluZWNpZT8pXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIFpvYmFjeiBkb2vFgmFkbmllLCBqYWsgd3lnbMSFZGEgMTUgbWludXQgdyBnYWJpbmVjaWUgZHIuIEphbmEgQnVqb2thLiBaZXJvIHphc2tvY3plbmlhIVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHshY29sbGVjdGVkQ3J5c3RhbHMuaW5jbHVkZXMoMykgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB1bmxvY2tDcnlzdGFsKDMpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLWFtYmVyLTUwMC8yMCBib3JkZXIgYm9yZGVyLWFtYmVyLTQwMC80MCB0ZXh0LWFtYmVyLTMwMCB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNocmluay0wIGhvdmVyOmJnLWFtYmVyLTUwMC8zMCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPk9kYmllcnogS3J5c3p0YcWCICMzPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj7wn5KOPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFN0ZXAgVGltZWxpbmUgQ29udHJvbHMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtNCBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgICAgICB7IHRpdGxlOiAnMS4gV3l3aWFkIExla2Fyc2tpJywgdGltZTogJzMtNSBtaW51dCcsIGRlc2M6ICdSb3ptb3dhIG8gb2JqYXdhY2gsIHplYnJhbmllIGhpc3RvcmlpIHpkcm93b3RuZWogdyBwcnp5amF6bmVqIGF0bW9zZmVyemUuJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0aXRsZTogJzIuIFByenlnb3Rvd2FuaWUnLCB0aW1lOiAnMSBtaW51dGEnLCBkZXNjOiAnUHJ6ZWJyYW5pZSBzacSZIHcgamVkbm9yYXpvd2Ugc3BvZGVua2kgYmFkYW5pb3dlIHcgcHJ5d2F0bmVqIMWCYXppZW5jZS4nIH0sXG4gICAgICAgICAgICAgICAgICB7IHRpdGxlOiAnMy4gQW5vc2tvcGlhJywgdGltZTogJzYwLTkwIHNla3VuZCcsIGRlc2M6ICdCYWRhbmllIG5hIGxld3ltIGJva3UuIFXFvHl3YW15IMW8ZWx1IHogbGlkb2thaW7EhSAoem5pZWN6dWxlbmllKS4nIH0sXG4gICAgICAgICAgICAgICAgICB7IHRpdGxlOiAnNC4gUGxhbiBMZWN6ZW5pYScsIHRpbWU6ICc1IG1pbnV0JywgZGVzYzogJ1ByemVkc3Rhd2llbmllIHJla29tZW5kYWNqaSAobnAuIGt3YWxpZmlrYWNqYSBkbyBsYXNlcm90ZXJhcGlpIExIUCkuJyB9LFxuICAgICAgICAgICAgICAgIF0ubWFwKChzdGVwLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEN1cnJlbnRXYWxrdGhyb3VnaFN0ZXAoaWR4KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zLjUgcm91bmRlZC14bCBib3JkZXIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgY3VycmVudFdhbGt0aHJvdWdoU3RlcCA9PT0gaWR4XG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTAwLzYwIGJvcmRlci1wdXJwbGUtNDAwIHRleHQtd2hpdGUgc2hhZG93LWxnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1wdXJwbGUtMzAwIGZvbnQtYm9sZCBibG9ja1wiPktST0sgMHtpZHggKyAxfSAoe3N0ZXAudGltZX0pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCBibG9jayB0ZXh0LXNsYXRlLTEwMCBteS0xXCI+e3N0ZXAudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBibG9jayBsaW5lLWNsYW1wLTJcIj57c3RlcC5kZXNjfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQWN0aXZlIFN0ZXAgRGV0YWlsIEJhbm5lciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgZmxleCBpdGVtcy1zdGFydCBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWVtZXJhbGQtNDAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZSB0ZXh0LXNtIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgR3dhcmFuY2phIEtvbWZvcnR1IHcgQ01MOlxuICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxlYWRpbmctcmVsYXhlZCB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICBCYWRhbmllIGFub3Nrb3Bvd2Ugd3lrb255d2FuZSBwcnpleiBkci4gSmFuYSBCdWpva2EgamVzdCBuaWVpbndhenlqbmUgaSB0cndhIHphbGVkd2llIHBvbmFkIG1pbnV0xJkuIFXFvHl3YW15IHVsdHJhY2llbmtpY2gsIHN0ZXJ5bG55Y2ggd3ppZXJuaWvDs3cgb3JheiBvYmZpdGVqIGlsb8WbY2kgxbxlbHUgem5pZWN6dWxhasSFY2Vnby4gV2nEmWtzem/Fm8SHIHBhY2plbnTDs3cgcHJ6eXpuYWplIHBvIGJhZGFuaXU6IOKAnlRvIGJ5xYJvIG8gd2llbGUgxYJhdHdpZWpzemUsIG5pxbwgc29iaWUgd3lvYnJhxbxhxYJlbSHigJ0uXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHVubG9ja0NyeXN0YWwoMyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXhzIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1tZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5acm96dW1pYcWCZW0gUHJ6ZWJpZWcgQW5vc2tvcGlpIChPZGJpZXJ6IPCfko4gIzMpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogTU9EVUxFIDQ6IERlLXN0aWdtYXRpemF0aW9uIFF1aXogKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gNCAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtc2VyaWYgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPFNtaWxlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICBNb2R1xYIgNDogT2RtaXR5em93YW5pZSBMxJlrdSBpIFdzdHlkdSAoU3p5YmtpIFF1aXopXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIFpkYcSHIG1pbmktcXVpeiB6IHdpZWR6eSBvIGJlenBpZWN6ZcWEc3R3aWUgcHJva3RvbG9naWN6bnltIGkgb2RiaWVyeiBrb2xlam55IEtyeXN6dGHFgiFcbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IWNvbGxlY3RlZENyeXN0YWxzLmluY2x1ZGVzKDQpICYmIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdW5sb2NrQ3J5c3RhbCg0KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1hbWJlci01MDAvMjAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvNDAgdGV4dC1hbWJlci0zMDAgdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaHJpbmstMCBob3ZlcjpiZy1hbWJlci01MDAvMzAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5PZGJpZXJ6IEtyeXN6dGHFgiAjNDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+8J+Sjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICBQeXRhbmllIDE6IERsYWN6ZWdvIHdjemVzbmEga29uc3VsdGFjamEgcHJva3RvbG9naWN6bmEgamVzdCBrbHVjem93YT9cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UXVpekFuc3dlcnMoeyAuLi5xdWl6QW5zd2VycywgMTogMSB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZC1sZyBib3JkZXIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWl6QW5zd2Vyc1sxXSA9PT0gMSA/ICdiZy1lbWVyYWxkLTk1MCBib3JkZXItZW1lcmFsZC00MDAgdGV4dC1lbWVyYWxkLTIwMCcgOiAnYmctc2xhdGUtODAwIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBBKSBQb3p3YWxhIHd5a2x1Y3p5xIcgZ3JvxbpuZSBwb3dpa8WCYW5pYSBpIG5hdHljaG1pYXN0IHXFm21pZXJ6ecSHIGLDs2wuXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UXVpekFuc3dlcnMoeyAuLi5xdWl6QW5zd2VycywgMTogMiB9KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZC1sZyBib3JkZXIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWl6QW5zd2Vyc1sxXSA9PT0gMiA/ICdiZy1yb3NlLTk1MCBib3JkZXItcm9zZS00MDAgdGV4dC1yb3NlLTIwMCcgOiAnYmctc2xhdGUtODAwIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBCKSBOaWUgbWEgem5hY3plbmlhLCBjaG9yb2JhIHNhbWEgcHJ6ZWpkemllIHBvIG1hxZtjaWFjaC5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgIFB5dGFuaWUgMjogQ3p5IG1ldG9keSBsYXNlcm93ZSAoTEhQL0ZpTGFDKSB3eW1hZ2FqxIUgd3ljaW5hbmlhIHRrYW5layBpIGJvbGVzbnljaCByYW4/XG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1aXpBbnN3ZXJzKHsgLi4ucXVpekFuc3dlcnMsIDI6IDEgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQtbGcgYm9yZGVyIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVpekFuc3dlcnNbMl0gPT09IDEgPyAnYmctZW1lcmFsZC05NTAgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0yMDAnIDogJ2JnLXNsYXRlLTgwMCBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgQSkgTklFISBMYXNlciB6YW15a2EgbmFjenluaWEgb2QgxZtyb2RrYSBiZXogd3ljaW5hbmlhIGkgc3p3w7N3LlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFF1aXpBbnN3ZXJzKHsgLi4ucXVpekFuc3dlcnMsIDI6IDIgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQtbGcgYm9yZGVyIHRleHQtbGVmdCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVpekFuc3dlcnNbMl0gPT09IDIgPyAnYmctcm9zZS05NTAgYm9yZGVyLXJvc2UtNDAwIHRleHQtcm9zZS0yMDAnIDogJ2JnLXNsYXRlLTgwMCBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgQikgVEFLLCB0byB0cmFkeWN5am5hIHd5Y2luYWrEhWNhIG9wZXJhY2phIHNrYWxwZWxlbS5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kIHB0LTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHNldFF1aXpTdWJtaXR0ZWQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHVubG9ja0NyeXN0YWwoNCk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctYW1iZXItNjAwIGhvdmVyOmJnLWFtYmVyLTcwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LXhzIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1tZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5aYXR3aWVyZMW6IE9kcG93aWVkemkgKE9kYmllcnog8J+SjiAjNCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBNT0RVTEUgNTogUGF0aWVudCBDaGVhdCBTaGVldCBHZW5lcmF0b3IgKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gNSAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtc2VyaWYgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIE1vZHXFgiA1OiBHZW5lcmF0b3IgxZpjacSFZ2F3a2kgV3l3aWFkdSBkbGEgZHIuIEphbmEgQnVqb2thXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIFV6dXBlxYJuaWogMyBrcsOzdGtpZSBwb2xhLiBXeWdlbmVyb3dhbsSFIMWbY2nEhWdhd2vEmSBtb8W8ZXN6IHphYnJhxIcgbmEgd2l6eXTEmSBsdWIgcHJ6ZXPFgmHEhyBwb2RjemFzIHJlamVzdHJhY2ppIG9ubGluZSFcbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7IWNvbGxlY3RlZENyeXN0YWxzLmluY2x1ZGVzKDUpICYmIChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdW5sb2NrQ3J5c3RhbCg1KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1hbWJlci01MDAvMjAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvNDAgdGV4dC1hbWJlci0zMDAgdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaHJpbmstMCBob3ZlcjpiZy1hbWJlci01MDAvMzAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5PZGJpZXJ6IEtyeXN6dGHFgiAjNTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+8J+Sjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBGb3JtIElucHV0ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTQgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS0zMDAgbWItMSBmb250LXNlbWlib2xkXCI+R8WCw7N3bnkgb2JqYXcgKG5wLiBrcndhd2llbmllLCBndXplaywgYsOzbCk6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwYXRpZW50U3VtbWFyeS5tYWluSXNzdWV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGF0aWVudFN1bW1hcnkoeyAuLi5wYXRpZW50U3VtbWFyeSwgbWFpbklzc3VlOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHAtMi41IHRleHQtc2xhdGUtMjAwIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwIG91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTMwMCBtYi0xIGZvbnQtc2VtaWJvbGRcIj5DemFzIHRyd2FuaWEgKG5wLiAyIHR5Z29kbmllLCA2IG1pZXNpxJljeSk6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwYXRpZW50U3VtbWFyeS5kdXJhdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQYXRpZW50U3VtbWFyeSh7IC4uLnBhdGllbnRTdW1tYXJ5LCBkdXJhdGlvbjogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBwLTIuNSB0ZXh0LXNsYXRlLTIwMCBmb2N1czpib3JkZXItcHVycGxlLTUwMCBvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWQ6Y29sLXNwYW4tMlwiPlxuICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtMzAwIG1iLTEgZm9udC1zZW1pYm9sZFwiPkRvdHljaGN6YXNvd2UgcHLDs2J5IGxlY3plbmlhIChucC4gbWHFm2NpLCBjem9wa2kpOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17cGF0aWVudFN1bW1hcnkucHJpb3JUcmVhdG1lbnRzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhdGllbnRTdW1tYXJ5KHsgLi4ucGF0aWVudFN1bW1hcnksIHByaW9yVHJlYXRtZW50czogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgcm91bmRlZC14bCBwLTIuNSB0ZXh0LXNsYXRlLTIwMCBmb2N1czpib3JkZXItcHVycGxlLTUwMCBvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEdlbmVyYXRlZCBDYXJkIFByZXZpZXcgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC80MCB0ZXh0LXhzIHRleHQtc2xhdGUtMjAwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtcHVycGxlLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1bMTFweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8QXdhcmQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIEthcnRhIFd5ZWR1a293YW5lZ28gUGFjamVudGEgQ01MIChHb3Rvd2EgZG8gZ2FiaW5ldHUpOlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQgYmctZW1lcmFsZC05NTAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwXCI+XG4gICAgICAgICAgICAgICAgICAgIE9zemN6xJlkbm/Fm8SHIGN6YXN1IHd5d2lhZHU6IH42MCVcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMSB0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm8gdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgIDxwPuKAoiA8c3Ryb25nPkfFgsOzd255IHByb2JsZW06PC9zdHJvbmc+IHtwYXRpZW50U3VtbWFyeS5tYWluSXNzdWV9PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+4oCiIDxzdHJvbmc+Q3phcyB0cndhbmlhOjwvc3Ryb25nPiB7cGF0aWVudFN1bW1hcnkuZHVyYXRpb259PC9wPlxuICAgICAgICAgICAgICAgICAgPHA+4oCiIDxzdHJvbmc+RG90eWNoY3phcyBsZWN6b25vOjwvc3Ryb25nPiB7cGF0aWVudFN1bW1hcnkucHJpb3JUcmVhdG1lbnRzfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcHQtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICBVa2/FhGN6ZW5pZSB0ZWdvIG1vZHXFgnUgb2RibG9rb3d1amUgT3N0YXRuaSBLcnlzenRhxYIgIzUhXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdW5sb2NrQ3J5c3RhbCg1KTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAgdG8tYW1iZXItNjAwIGhvdmVyOmZyb20tYW1iZXItNDAwIGhvdmVyOnRvLWFtYmVyLTUwMCB0ZXh0LXNsYXRlLTk1MCBmb250LWJvbGQgdGV4dC14cyB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbGcgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2xhdGUtOTUwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlpha2/FhGN6IEVkdWthY2rEmSAmIE9kYmllcnogUmFiYXQgLTE1MCB6xYIg8J+Sjjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogV2luLVdpbiBFZHVjYXRpb25hbCBDZXJ0aWZpY2F0ZSBNb2RhbCAqL31cbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIHtzaG93Q2VydGlmaWNhdGVNb2RhbCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzgwIGJhY2tkcm9wLWJsdXItbWQgcC00XCI+XG4gICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjkgfX1cbiAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxLCBzY2FsZTogMSB9fVxuICAgICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjkgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LXhsIGJnLXNsYXRlLTkwMCByb3VuZGVkLTN4bCBib3JkZXItMiBib3JkZXItYW1iZXItNDAwLzYwIHNoYWRvdy0yeGwgcC02IHNtOnAtOCB0ZXh0LXdoaXRlIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHsvKiBDb25mZXR0aSBHbG93IEJhY2tncm91bmQgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgcmlnaHQtMCB3LTgwIGgtODAgYmctYW1iZXItNTAwLzEwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNiBoLTE2IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tYW1iZXItNDAwIHRvLWFtYmVyLTYwMCB0ZXh0LXNsYXRlLTk1MCBteC1hdXRvIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtM3hsIHNoYWRvdy1sZyBzaGFkb3ctYW1iZXItNTAwLzMwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAg8J+SjlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy1hbWJlci00MDAvMTAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvMzAgdGV4dC1hbWJlci0zMDAgdGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEF3YXJkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+T2ZpY2phbG55IENlcnR5ZmlrYXQgUGFjamVudGEgQ01MPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgR3JhdHVsYWNqZSEgSmVzdGXFmyBXeWVkdWtvd2FueW0gUGFjamVudGVtXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYXgtdy1tZCBteC1hdXRvIG10LTEgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIFplYnJhxYJlxZsvYcWbIGtvbXBsZXQgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ib2xkXCI+NSBLcnlzenRhxYLDs3cgRWR1a2FjeWpueWNoPC9zcGFuPi4gUm96dW1pZXN6IHByemViaWVnIHBpZXJ3c3plaiB3aXp5dHksIGFub3Nrb3BpaSBvcmF6IHphc2FkeSBvcGlzeXdhbmlhIG9iamF3w7N3LlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFdpbi1XaW4gVmFsdWUgUHJvcG9zaXRpb24gQm94ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDAgdGV4dC1sZWZ0IHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1wdXJwbGUtMzAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICDwn6SdIEtvcnp5xZvEhyBTeXN0ZW11IFdpbi1XaW4gKERsYSBDaWViaWUgaSBMZWthcnphKTpcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1lbWVyYWxkLTQwMCBibG9jayBtYi0wLjVcIj5EbGEgUGFjamVudGE6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+V2l6eXRhIHRhxYRzemEgbyAxNTAgesWCLCB6ZXJvIGzEmWt1LCBwZcWCbmEgem5ham9tb8WbxIcgYmFkYW5pYS48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtaW5kaWdvLTQwMCBibG9jayBtYi0wLjVcIj5EbGEgZHIuIEphbmEgQnVqb2thOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPktyw7N0c3p5IHd5d2lhZCB3c3TEmXBueSBpIHN6eWJzemUgcHJ6ZWrFm2NpZSBkbyBwcmVjeXp5am5lZ28gbGVjemVuaWEuPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFByb21vIENvZGUgVm91Y2hlciBCb3ggKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTUwMC8yMCB2aWEtcHVycGxlLTUwMC8yMCB0by1pbmRpZ28tNTAwLzIwIGJvcmRlciBib3JkZXItYW1iZXItNDAwLzUwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtbW9ubyB0cmFja2luZy13aWRlciB0ZXh0LWFtYmVyLTMwMCBibG9ja1wiPlR3w7NqIERlZHlrb3dhbnkgS29kIFJhYmF0b3d5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQteGwgZm9udC1ib2xkIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZXN0XCI+V1lFRFVLT1dBTlktQ01MLTE1MDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5Q29kZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgcm91bmRlZC14bCBiZy1hbWJlci00MDAgaG92ZXI6YmctYW1iZXItMzAwIHRleHQtc2xhdGUtOTUwIGZvbnQtYm9sZCB0ZXh0LXhzIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hyaW5rLTAgc2hhZG93LW1kXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2lzQ29waWVkVm91Y2hlciA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC05NTBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1zbGF0ZS05NTBcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2lzQ29waWVkVm91Y2hlciA/ICdTa29waW93YW5vIScgOiAnU2tvcGl1aiBLb2QnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICBocmVmPVwidGVsOis0ODUxMDQzMjM2MVwiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBzbTp3LWF1dG8gcHgtNiBweS0zIHJvdW5kZWQteGwgYmctcHVycGxlLTYwMCBob3ZlcjpiZy1wdXJwbGUtNTAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQteHMgdHJhbnNpdGlvbi1hbGwgc2hhZG93LWxnIHRleHQtY2VudGVyIG5vLXVuZGVybGluZVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIFphcmV6ZXJ3dWogV2l6eXTEmSB6IFJhYmF0ZW0gKC0xNTAgesWCKVxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93Q2VydGlmaWNhdGVNb2RhbChmYWxzZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBzbTp3LWF1dG8gcHgtNSBweS0zIHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCBmb250LXNlbWlib2xkIHRleHQteHMgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBaYW1rbmlqIE9rbm9cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQWtJUTtBQWxJUixTQUFnQixnQkFBZ0I7QUFDaEM7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBSUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBSUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUtLO0FBQ1AsU0FBUyxRQUFRLHVCQUF1QjtBQVV4QyxNQUFNLGdCQUErQjtBQUFBLEVBQ25DO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixhQUFhO0FBQUEsSUFDYixhQUFhO0FBQUEsSUFDYixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLGFBQWE7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLE1BQU07QUFB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