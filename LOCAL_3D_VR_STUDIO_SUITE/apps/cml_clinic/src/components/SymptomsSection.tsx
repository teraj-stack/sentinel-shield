import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { HelpCircle, ChevronDown, CheckCircle2, Search, BrainCircuit, ArrowRight } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
const COLLOQUIAL_MAPPINGS = [
  {
    colloquialTerms: ["guzek", "kulka", "fałd", "coś wypada", "miękkie zgrubienie"],
    medicalTerm: "Choroba hemoroidalna (Guzki krwawnicze ICD-10 I84)",
    explanation: "Powiększone guzki krwawnicze wypadające podczas parcia na stolec. Wymagają oceny stopnia zaawansowania (I-IV).",
    procedure: "Laserowa Hemoroidoplastyka (LHP®)",
    tagToAdd: "Wypadająca zmiana cofająca się"
  },
  {
    colloquialTerms: ["krew", "papier", "podcieranie", "krople", "muszla", "plamienie"],
    medicalTerm: "Krwawienie z kanału odbytu (Świeża krew w stolcu)",
    explanation: "Jasnoczerwona krew na papierze oznacza pęknięty guzek krwawniczy lub mikrouraz anodermy.",
    procedure: "Anoskopia + Laseroterapie LHP® / Fissure",
    tagToAdd: "Jasnoczerwona (świeża) blood"
  },
  {
    colloquialTerms: ["pieczenie", "pęknięcie", "ostry ból", "szczypanie", "żyletki", "kłucie po stolcu"],
    medicalTerm: "Szczelina odbytu (Fissura ani ICD-10 K60)",
    explanation: "Uporczywy, palący ból pojawiający się podczas lub po wypróżnieniu wynikający ze skurczu zwieracza.",
    procedure: "Laserowa Plastyka Szczeliny Odbytu",
    tagToAdd: "Piekący"
  },
  {
    colloquialTerms: ["sączenie", "ropa", "dziurka", "wyciek", "plamienie bielizny", "wilgoć"],
    medicalTerm: "Przetoka odbytu (Fistula ani ICD-10 K60.4)",
    explanation: "Patologiczny kanał z wysiękiem ropnym łączący kryptę odbytu ze skórą. Wymaga ochrony zwieraczy.",
    procedure: "Laserowe Zamknięcie Przetoki FiLaC®",
    tagToAdd: "Ropna / podbarwiona krwią"
  },
  {
    colloquialTerms: ["swędzenie", "świąd", "pieczenie w nocy", "drapanie", "świąd skóry"],
    medicalTerm: "Przewlekły Świąd Odbytu (Pruritus ani / Anodermitis)",
    explanation: "Stan zapalny skóry anodermy wynikający z mikrowycieków śluzu lub podrażnienia chemicznego.",
    procedure: "Konsultacja + leczenie anodermy",
    tagToAdd: "Nocne wybudzanie"
  },
  {
    colloquialTerms: ["twarda kulka", "nagle bolesna", "fioletowy guzek", "siny guzek", "zakrzep"],
    medicalTerm: "Zakrzepica splotu przyodbytowego (Guzek brzeżny)",
    explanation: "Nagły, silny ból i wyczuwalny twardy sinawy guzek na brzegu odbytu powstał po wysiłku.",
    procedure: "Nacięcie/Ewakacja zakrzepu w znieczuleniu",
    tagToAdd: "Twarde, bardzo bolesne zgrubienie"
  },
  {
    colloquialTerms: ["torbiel", "kość guziczna", "ogonowa", "ropa na plecach", "szpara pośladkowa"],
    medicalTerm: "Torbiel włosowa / kości guzicznej (Sinus pilonidalis)",
    explanation: "Zatoka w szparze pośladkowej z gromadzącą się treścią ropną i włosową.",
    procedure: "Laserowa Ablacja Torbieli SiLaC®",
    tagToAdd: "Nawraca od miesięcy"
  }
];
export const symptomsData = [
  {
    id: "bol",
    icon: "⚡",
    title: "Ból i dyskomfort",
    groups: [
      {
        question: "Jak odczuwalny jest ten ból?",
        tags: ["Gniotący / ściskający", "Skurczowy", "Piekący", "Kłujący", "Dyskomfort w miednicy"]
      },
      {
        question: "Kiedy najczęściej się pojawia?",
        tags: ["Przy wypróżnianiu", "Po wypróżnianiu (utrzymuje się godzinami)", "Stale / przy siedzeniu"]
      }
    ]
  },
  {
    id: "krwawienie",
    icon: "🩸",
    title: "Krwawienie z odbytu",
    groups: [
      {
        question: "Jaki kolor i gdzie się pojawia?",
        tags: ["Jasnoczerwona (świeża) blood", "Ciemnoczerwona", "Na papierze toaletowym", "W muszli klozetowej", "Na stolcu", "Wymieszana ze stolcem"]
      }
    ]
  },
  {
    id: "swiad",
    icon: "✦",
    title: "Świąd okolicy odbytu",
    groups: [
      {
        question: "Gdzie dokładnie odczuwasz świąd?",
        tags: ["Na zewnątrz (skóra wokół)", "Głębiej w kanale odbytu", "Trudno precyzyjnie określić"]
      },
      {
        question: "Nasilenie w ciągu dnia:",
        tags: ["Nocne wybudzanie", "Po wysiłku / spoceniu", "Po wypróżnieniu"]
      }
    ]
  },
  {
    id: "pieczenie",
    icon: "🔥",
    title: "Pieczenie i podrażnienie",
    groups: [
      {
        question: "Kiedy pieczenie jest najsilniejsze?",
        tags: ["Tuż po wypróżnieniu", "Całodzienne przy chodzeniu", "Wieczorem", "Po ostrych potrawach lub alkoholu"]
      }
    ]
  },
  {
    id: "guzek",
    icon: "◉",
    title: "Guzek lub zgrubienie",
    groups: [
      {
        question: "Co wyczuwasz przy dotyku?",
        tags: ["Miękki, niebolesny guzek", "Twarde, bardzo bolesne zgrubienie", "Wypadająca zmiana cofająca się", "Bolesny obrzękbrzegu odbytu"]
      },
      {
        question: "Od jak dawna występuje?",
        tags: ["Nagle od kilku dni", "Od wielu tygodni", "Nawraca od miesięcy"]
      }
    ]
  },
  {
    id: "wyciek",
    icon: "◍",
    title: "Wyciek / wilgotność",
    groups: [
      {
        question: "Jaki charakter ma wydzielina?",
        tags: ["Śluzowa przeźroczysta", "Ropna / podbarwiona krwią", "Ślady stolca na bieliźnie", "Uporczywa wilgotność skin"]
      }
    ]
  }
];
export const SymptomsSection = ({
  selectedSymptoms,
  onToggleSymptomTag,
  onCollectCrystal
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const matchedSuggestions = searchQuery.trim().length >= 2 ? COLLOQUIAL_MAPPINGS.filter(
    (m) => m.colloquialTerms.some((term) => term.toLowerCase().includes(searchQuery.toLowerCase().trim())) || m.medicalTerm.toLowerCase().includes(searchQuery.toLowerCase().trim())
  ) : [];
  return /* @__PURE__ */ jsxDEV(
    motion.section,
    {
      className: "py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto",
      id: "objawy",
      initial: { opacity: 0, y: 35 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-3xl mx-auto mb-10", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2", children: "Od czego zaczynamy?" }, void 0, false, {
            fileName: "/app/applet/src/components/SymptomsSection.tsx",
            lineNumber: 178,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-4xl font-normal text-slate-100 mb-4", children: "Najczęściej to ja zadaję pierwsze pytanie" }, void 0, false, {
            fileName: "/app/applet/src/components/SymptomsSection.tsx",
            lineNumber: 181,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base text-slate-300 font-light leading-relaxed", children: "Nie musisz wiedzieć, jak nazwać problem medycznie. Wpisz w poniższą wyszukiwarkę potoczne słowa (np. „guzek”, „krew przy podcieraniu”, „pieczenie”), a nasz inteligentny tłumacz podpowie Ci diagnozę kliniczną." }, void 0, false, {
            fileName: "/app/applet/src/components/SymptomsSection.tsx",
            lineNumber: 184,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SymptomsSection.tsx",
          lineNumber: 177,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "max-w-2xl mx-auto mb-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV(Search, { className: "w-5 h-5 text-indigo-400 absolute left-4 top-1/2 -translate-y-1/2" }, void 0, false, {
              fileName: "/app/applet/src/components/SymptomsSection.tsx",
              lineNumber: 192,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: searchQuery,
                onChange: (e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.length >= 3 && onCollectCrystal) {
                    onCollectCrystal(1);
                  }
                },
                placeholder: "Wpisz potocznie swój problem (np. guzek, krew, pieczenie, swędzenie, ropa)...",
                className: "w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900/90 border border-indigo-500/40 text-slate-100 placeholder-slate-400 text-xs sm:text-sm shadow-xl focus:border-indigo-400 focus:outline-none transition-all"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/SymptomsSection.tsx",
                lineNumber: 193,
                columnNumber: 11
              },
              this
            ),
            searchQuery && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setSearchQuery(""),
                className: "absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white",
                children: "Wyczyść"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/SymptomsSection.tsx",
                lineNumber: 206,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SymptomsSection.tsx",
            lineNumber: 191,
            columnNumber: 9
          }, this),
          searchQuery.trim().length >= 2 && /* @__PURE__ */ jsxDEV("div", { className: "mt-3 p-4 rounded-2xl bg-slate-900 border border-indigo-500/50 shadow-2xl space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs border-b border-slate-800 pb-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-indigo-300 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(BrainCircuit, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 220,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Rekomendacja Medyczna CML (",
                  matchedSuggestions.length,
                  " dopasowań):"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 221,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SymptomsSection.tsx",
                lineNumber: 219,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400", children: "Tłumacz języka potocznego" }, void 0, false, {
                fileName: "/app/applet/src/components/SymptomsSection.tsx",
                lineNumber: 223,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SymptomsSection.tsx",
              lineNumber: 218,
              columnNumber: 13
            }, this),
            matchedSuggestions.length > 0 ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: matchedSuggestions.map((match, i) => /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white text-xs sm:text-sm", children: match.medicalTerm }, void 0, false, {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 231,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 text-[10px] font-mono shrink-0", children: match.procedure }, void 0, false, {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 232,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SymptomsSection.tsx",
                lineNumber: 230,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300", children: match.explanation }, void 0, false, {
                fileName: "/app/applet/src/components/SymptomsSection.tsx",
                lineNumber: 236,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 flex justify-end", children: /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    if (!selectedSymptoms.includes(match.tagToAdd)) {
                      onToggleSymptomTag(match.tagToAdd);
                    }
                    if (onCollectCrystal) onCollectCrystal(1);
                  },
                  className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${selectedSymptoms.includes(match.tagToAdd) ? "bg-emerald-600 text-white" : "bg-indigo-600 hover:bg-indigo-500 text-white"}`,
                  children: selectedSymptoms.includes(match.tagToAdd) ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-white" }, void 0, false, {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 254,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Objaw Zapisany" }, void 0, false, {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 255,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SymptomsSection.tsx",
                    lineNumber: 253,
                    columnNumber: 27
                  }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "+ Dodaj objaw do opisu" }, void 0, false, {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 259,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 260,
                      columnNumber: 29
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SymptomsSection.tsx",
                    lineNumber: 258,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 239,
                  columnNumber: 23
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/components/SymptomsSection.tsx",
                lineNumber: 238,
                columnNumber: 21
              }, this)
            ] }, i, true, {
              fileName: "/app/applet/src/components/SymptomsSection.tsx",
              lineNumber: 229,
              columnNumber: 19
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/SymptomsSection.tsx",
              lineNumber: 227,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 py-2", children: "Nie znaleziono ścisłego dopasowania dla tej frazy. Wybierz odpowiedni kafel z poniższej listy obszarów." }, void 0, false, {
              fileName: "/app/applet/src/components/SymptomsSection.tsx",
              lineNumber: 269,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SymptomsSection.tsx",
            lineNumber: 217,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SymptomsSection.tsx",
          lineNumber: 190,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: symptomsData.map((item, index) => {
          const isOpen = activeCardIndex === index;
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setActiveCardIndex(isOpen ? null : index),
              className: `p-5 rounded-2xl transition-all cursor-pointer border ${isOpen ? "bg-slate-900/90 border-indigo-500/60 shadow-xl shadow-indigo-500/10" : "bg-slate-900/40 hover:bg-slate-900/70 border-slate-800/80 hover:border-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-2xl p-2 rounded-xl bg-slate-950/80 border border-slate-800", children: item.icon }, void 0, false, {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 292,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-base text-slate-100", children: item.title }, void 0, false, {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 295,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SymptomsSection.tsx",
                    lineNumber: 291,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    ChevronDown,
                    {
                      className: `w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180 text-indigo-400" : ""}`
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 297,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 290,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-2 font-light", children: isOpen ? "Kliknij, aby zwinąć" : "Kliknij, aby zobaczyć pytania diagnostyczne" }, void 0, false, {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 304,
                  columnNumber: 15
                }, this),
                isOpen && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-4 border-t border-slate-800 space-y-4 animate-fade-in", onClick: (e) => e.stopPropagation(), children: item.groups.map((group, idx) => /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-medium text-indigo-300 italic flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxDEV(HelpCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 313,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: group.question }, void 0, false, {
                      fileName: "/app/applet/src/components/SymptomsSection.tsx",
                      lineNumber: 314,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/SymptomsSection.tsx",
                    lineNumber: 312,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1.5", children: group.tags.map((tag) => {
                    const isSelected = selectedSymptoms.includes(tag);
                    return /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: () => onToggleSymptomTag(tag),
                        className: `px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 focus:outline-none ${isSelected ? "bg-indigo-600 text-white border border-indigo-400 shadow-md" : "bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-slate-600"}`,
                        children: [
                          isSelected && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3 text-white" }, void 0, false, {
                            fileName: "/app/applet/src/components/SymptomsSection.tsx",
                            lineNumber: 329,
                            columnNumber: 46
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: tag }, void 0, false, {
                            fileName: "/app/applet/src/components/SymptomsSection.tsx",
                            lineNumber: 330,
                            columnNumber: 31
                          }, this)
                        ]
                      },
                      tag,
                      true,
                      {
                        fileName: "/app/applet/src/components/SymptomsSection.tsx",
                        lineNumber: 320,
                        columnNumber: 29
                      },
                      this
                    );
                  }) }, void 0, false, {
                    fileName: "/app/applet/src/components/SymptomsSection.tsx",
                    lineNumber: 316,
                    columnNumber: 23
                  }, this)
                ] }, idx, true, {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 311,
                  columnNumber: 21
                }, this)) }, void 0, false, {
                  fileName: "/app/applet/src/components/SymptomsSection.tsx",
                  lineNumber: 309,
                  columnNumber: 17
                }, this)
              ]
            },
            item.id,
            true,
            {
              fileName: "/app/applet/src/components/SymptomsSection.tsx",
              lineNumber: 281,
              columnNumber: 13
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/SymptomsSection.tsx",
          lineNumber: 277,
          columnNumber: 7
        }, this),
        selectedSymptoms.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "mt-8 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-center", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-medium text-indigo-200 mb-2", children: [
            "Zaznaczone objawy do omówienia (",
            selectedSymptoms.length,
            "):"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SymptomsSection.tsx",
            lineNumber: 346,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap justify-center gap-1.5", children: selectedSymptoms.map((s) => /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded-full bg-indigo-900/60 text-indigo-200 text-xs border border-indigo-500/30", children: s }, s, false, {
            fileName: "/app/applet/src/components/SymptomsSection.tsx",
            lineNumber: 351,
            columnNumber: 15
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/SymptomsSection.tsx",
            lineNumber: 349,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SymptomsSection.tsx",
          lineNumber: 345,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-center text-xs text-slate-500 mt-6 font-light", children: "Warto przemyśleć te kwestie przed wizytą. Ułatwia to komunikację i pozwala skupić się od razu na rzetelnej diagnostyce." }, void 0, false, {
          fileName: "/app/applet/src/components/SymptomsSection.tsx",
          lineNumber: 359,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/SymptomsSection.tsx",
      lineNumber: 169,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN5bXB0b21zU2VjdGlvbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3ltcHRvbUl0ZW0gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBIZWxwQ2lyY2xlLCBDaGV2cm9uRG93biwgQ2hlY2tDaXJjbGUyLCBTZWFyY2gsIEJyYWluQ2lyY3VpdCwgQXJyb3dSaWdodCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuXG5pbnRlcmZhY2UgQ29sbG9xdWlhbE1hcHBpbmcge1xuICBjb2xsb3F1aWFsVGVybXM6IHN0cmluZ1tdO1xuICBtZWRpY2FsVGVybTogc3RyaW5nO1xuICBleHBsYW5hdGlvbjogc3RyaW5nO1xuICBwcm9jZWR1cmU6IHN0cmluZztcbiAgdGFnVG9BZGQ6IHN0cmluZztcbn1cblxuY29uc3QgQ09MTE9RVUlBTF9NQVBQSU5HUzogQ29sbG9xdWlhbE1hcHBpbmdbXSA9IFtcbiAge1xuICAgIGNvbGxvcXVpYWxUZXJtczogWydndXplaycsICdrdWxrYScsICdmYcWCZCcsICdjb8WbIHd5cGFkYScsICdtacSZa2tpZSB6Z3J1YmllbmllJ10sXG4gICAgbWVkaWNhbFRlcm06ICdDaG9yb2JhIGhlbW9yb2lkYWxuYSAoR3V6a2kga3J3YXduaWN6ZSBJQ0QtMTAgSTg0KScsXG4gICAgZXhwbGFuYXRpb246ICdQb3dpxJlrc3pvbmUgZ3V6a2kga3J3YXduaWN6ZSB3eXBhZGFqxIVjZSBwb2RjemFzIHBhcmNpYSBuYSBzdG9sZWMuIFd5bWFnYWrEhSBvY2VueSBzdG9wbmlhIHphYXdhbnNvd2FuaWEgKEktSVYpLicsXG4gICAgcHJvY2VkdXJlOiAnTGFzZXJvd2EgSGVtb3JvaWRvcGxhc3R5a2EgKExIUMKuKScsXG4gICAgdGFnVG9BZGQ6ICdXeXBhZGFqxIVjYSB6bWlhbmEgY29mYWrEhWNhIHNpxJknLFxuICB9LFxuICB7XG4gICAgY29sbG9xdWlhbFRlcm1zOiBbJ2tyZXcnLCAncGFwaWVyJywgJ3BvZGNpZXJhbmllJywgJ2tyb3BsZScsICdtdXN6bGEnLCAncGxhbWllbmllJ10sXG4gICAgbWVkaWNhbFRlcm06ICdLcndhd2llbmllIHoga2FuYcWCdSBvZGJ5dHUgKMWad2llxbxhIGtyZXcgdyBzdG9sY3UpJyxcbiAgICBleHBsYW5hdGlvbjogJ0phc25vY3plcndvbmEga3JldyBuYSBwYXBpZXJ6ZSBvem5hY3phIHDEmWtuacSZdHkgZ3V6ZWsga3J3YXduaWN6eSBsdWIgbWlrcm91cmF6IGFub2Rlcm15LicsXG4gICAgcHJvY2VkdXJlOiAnQW5vc2tvcGlhICsgTGFzZXJvdGVyYXBpZSBMSFDCriAvIEZpc3N1cmUnLFxuICAgIHRhZ1RvQWRkOiAnSmFzbm9jemVyd29uYSAoxZt3aWXFvGEpIGJsb29kJyxcbiAgfSxcbiAge1xuICAgIGNvbGxvcXVpYWxUZXJtczogWydwaWVjemVuaWUnLCAncMSZa25pxJljaWUnLCAnb3N0cnkgYsOzbCcsICdzemN6eXBhbmllJywgJ8W8eWxldGtpJywgJ2vFgnVjaWUgcG8gc3RvbGN1J10sXG4gICAgbWVkaWNhbFRlcm06ICdTemN6ZWxpbmEgb2RieXR1IChGaXNzdXJhIGFuaSBJQ0QtMTAgSzYwKScsXG4gICAgZXhwbGFuYXRpb246ICdVcG9yY3p5d3ksIHBhbMSFY3kgYsOzbCBwb2phd2lhasSFY3kgc2nEmSBwb2RjemFzIGx1YiBwbyB3eXByw7PFvG5pZW5pdSB3eW5pa2FqxIVjeSB6ZSBza3VyY3p1IHp3aWVyYWN6YS4nLFxuICAgIHByb2NlZHVyZTogJ0xhc2Vyb3dhIFBsYXN0eWthIFN6Y3plbGlueSBPZGJ5dHUnLFxuICAgIHRhZ1RvQWRkOiAnUGlla8SFY3knLFxuICB9LFxuICB7XG4gICAgY29sbG9xdWlhbFRlcm1zOiBbJ3PEhWN6ZW5pZScsICdyb3BhJywgJ2R6aXVya2EnLCAnd3ljaWVrJywgJ3BsYW1pZW5pZSBiaWVsaXpueScsICd3aWxnb8SHJ10sXG4gICAgbWVkaWNhbFRlcm06ICdQcnpldG9rYSBvZGJ5dHUgKEZpc3R1bGEgYW5pIElDRC0xMCBLNjAuNCknLFxuICAgIGV4cGxhbmF0aW9uOiAnUGF0b2xvZ2ljem55IGthbmHFgiB6IHd5c2nEmWtpZW0gcm9wbnltIMWCxIVjesSFY3kga3J5cHTEmSBvZGJ5dHUgemUgc2vDs3LEhS4gV3ltYWdhIG9jaHJvbnkgendpZXJhY3p5LicsXG4gICAgcHJvY2VkdXJlOiAnTGFzZXJvd2UgWmFta25pxJljaWUgUHJ6ZXRva2kgRmlMYUPCricsXG4gICAgdGFnVG9BZGQ6ICdSb3BuYSAvIHBvZGJhcndpb25hIGtyd2nEhScsXG4gIH0sXG4gIHtcbiAgICBjb2xsb3F1aWFsVGVybXM6IFsnc3fEmWR6ZW5pZScsICfFm3dpxIVkJywgJ3BpZWN6ZW5pZSB3IG5vY3knLCAnZHJhcGFuaWUnLCAnxZt3acSFZCBza8OzcnknXSxcbiAgICBtZWRpY2FsVGVybTogJ1ByemV3bGVrxYJ5IMWad2nEhWQgT2RieXR1IChQcnVyaXR1cyBhbmkgLyBBbm9kZXJtaXRpcyknLFxuICAgIGV4cGxhbmF0aW9uOiAnU3RhbiB6YXBhbG55IHNrw7NyeSBhbm9kZXJteSB3eW5pa2FqxIVjeSB6IG1pa3Jvd3ljaWVrw7N3IMWbbHV6dSBsdWIgcG9kcmHFvG5pZW5pYSBjaGVtaWN6bmVnby4nLFxuICAgIHByb2NlZHVyZTogJ0tvbnN1bHRhY2phICsgbGVjemVuaWUgYW5vZGVybXknLFxuICAgIHRhZ1RvQWRkOiAnTm9jbmUgd3lidWR6YW5pZScsXG4gIH0sXG4gIHtcbiAgICBjb2xsb3F1aWFsVGVybXM6IFsndHdhcmRhIGt1bGthJywgJ25hZ2xlIGJvbGVzbmEnLCAnZmlvbGV0b3d5IGd1emVrJywgJ3NpbnkgZ3V6ZWsnLCAnemFrcnplcCddLFxuICAgIG1lZGljYWxUZXJtOiAnWmFrcnplcGljYSBzcGxvdHUgcHJ6eW9kYnl0b3dlZ28gKEd1emVrIGJyemXFvG55KScsXG4gICAgZXhwbGFuYXRpb246ICdOYWfFgnksIHNpbG55IGLDs2wgaSB3eWN6dXdhbG55IHR3YXJkeSBzaW5hd3kgZ3V6ZWsgbmEgYnJ6ZWd1IG9kYnl0dSBwb3dzdGHFgiBwbyB3eXNpxYJrdS4nLFxuICAgIHByb2NlZHVyZTogJ05hY2nEmWNpZS9Fd2FrYWNqYSB6YWtyemVwdSB3IHpuaWVjenVsZW5pdScsXG4gICAgdGFnVG9BZGQ6ICdUd2FyZGUsIGJhcmR6byBib2xlc25lIHpncnViaWVuaWUnLFxuICB9LFxuICB7XG4gICAgY29sbG9xdWlhbFRlcm1zOiBbJ3RvcmJpZWwnLCAna2/Fm8SHIGd1emljem5hJywgJ29nb25vd2EnLCAncm9wYSBuYSBwbGVjYWNoJywgJ3N6cGFyYSBwb8WbbGFka293YSddLFxuICAgIG1lZGljYWxUZXJtOiAnVG9yYmllbCB3xYJvc293YSAvIGtvxZtjaSBndXppY3puZWogKFNpbnVzIHBpbG9uaWRhbGlzKScsXG4gICAgZXhwbGFuYXRpb246ICdaYXRva2EgdyBzenBhcnplIHBvxZtsYWRrb3dlaiB6IGdyb21hZHrEhWPEhSBzacSZIHRyZcWbY2nEhSByb3BuxIUgaSB3xYJvc293xIUuJyxcbiAgICBwcm9jZWR1cmU6ICdMYXNlcm93YSBBYmxhY2phIFRvcmJpZWxpIFNpTGFDwq4nLFxuICAgIHRhZ1RvQWRkOiAnTmF3cmFjYSBvZCBtaWVzacSZY3knLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IHN5bXB0b21zRGF0YTogU3ltcHRvbUl0ZW1bXSA9IFtcbiAge1xuICAgIGlkOiAnYm9sJyxcbiAgICBpY29uOiAn4pqhJyxcbiAgICB0aXRsZTogJ0LDs2wgaSBkeXNrb21mb3J0JyxcbiAgICBncm91cHM6IFtcbiAgICAgIHtcbiAgICAgICAgcXVlc3Rpb246ICdKYWsgb2RjenV3YWxueSBqZXN0IHRlbiBiw7NsPycsXG4gICAgICAgIHRhZ3M6IFsnR25pb3TEhWN5IC8gxZtjaXNrYWrEhWN5JywgJ1NrdXJjem93eScsICdQaWVrxIVjeScsICdLxYJ1asSFY3knLCAnRHlza29tZm9ydCB3IG1pZWRuaWN5J10sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBxdWVzdGlvbjogJ0tpZWR5IG5hamN6xJnFm2NpZWogc2nEmSBwb2phd2lhPycsXG4gICAgICAgIHRhZ3M6IFsnUHJ6eSB3eXByw7PFvG5pYW5pdScsICdQbyB3eXByw7PFvG5pYW5pdSAodXRyenltdWplIHNpxJkgZ29kemluYW1pKScsICdTdGFsZSAvIHByenkgc2llZHplbml1J10sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBpZDogJ2tyd2F3aWVuaWUnLFxuICAgIGljb246ICfwn6m4JyxcbiAgICB0aXRsZTogJ0tyd2F3aWVuaWUgeiBvZGJ5dHUnLFxuICAgIGdyb3VwczogW1xuICAgICAge1xuICAgICAgICBxdWVzdGlvbjogJ0pha2kga29sb3IgaSBnZHppZSBzacSZIHBvamF3aWE/JyxcbiAgICAgICAgdGFnczogWydKYXNub2N6ZXJ3b25hICjFm3dpZcW8YSkgYmxvb2QnLCAnQ2llbW5vY3plcndvbmEnLCAnTmEgcGFwaWVyemUgdG9hbGV0b3d5bScsICdXIG11c3psaSBrbG96ZXRvd2VqJywgJ05hIHN0b2xjdScsICdXeW1pZXN6YW5hIHplIHN0b2xjZW0nXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGlkOiAnc3dpYWQnLFxuICAgIGljb246ICfinKYnLFxuICAgIHRpdGxlOiAnxZp3acSFZCBva29saWN5IG9kYnl0dScsXG4gICAgZ3JvdXBzOiBbXG4gICAgICB7XG4gICAgICAgIHF1ZXN0aW9uOiAnR2R6aWUgZG9rxYJhZG5pZSBvZGN6dXdhc3ogxZt3acSFZD8nLFxuICAgICAgICB0YWdzOiBbJ05hIHpld27EhXRyeiAoc2vDs3JhIHdva8OzxYIpJywgJ0fFgsSZYmllaiB3IGthbmFsZSBvZGJ5dHUnLCAnVHJ1ZG5vIHByZWN5enlqbmllIG9rcmXFm2xpxIcnXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHF1ZXN0aW9uOiAnTmFzaWxlbmllIHcgY2nEhWd1IGRuaWE6JyxcbiAgICAgICAgdGFnczogWydOb2NuZSB3eWJ1ZHphbmllJywgJ1BvIHd5c2nFgmt1IC8gc3BvY2VuaXUnLCAnUG8gd3lwcsOzxbxuaWVuaXUnXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGlkOiAncGllY3plbmllJyxcbiAgICBpY29uOiAn8J+UpScsXG4gICAgdGl0bGU6ICdQaWVjemVuaWUgaSBwb2RyYcW8bmllbmllJyxcbiAgICBncm91cHM6IFtcbiAgICAgIHtcbiAgICAgICAgcXVlc3Rpb246ICdLaWVkeSBwaWVjemVuaWUgamVzdCBuYWpzaWxuaWVqc3plPycsXG4gICAgICAgIHRhZ3M6IFsnVHXFvCBwbyB3eXByw7PFvG5pZW5pdScsICdDYcWCb2R6aWVubmUgcHJ6eSBjaG9kemVuaXUnLCAnV2llY3pvcmVtJywgJ1BvIG9zdHJ5Y2ggcG90cmF3YWNoIGx1YiBhbGtvaG9sdSddLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgaWQ6ICdndXplaycsXG4gICAgaWNvbjogJ+KXiScsXG4gICAgdGl0bGU6ICdHdXplayBsdWIgemdydWJpZW5pZScsXG4gICAgZ3JvdXBzOiBbXG4gICAgICB7XG4gICAgICAgIHF1ZXN0aW9uOiAnQ28gd3ljenV3YXN6IHByenkgZG90eWt1PycsXG4gICAgICAgIHRhZ3M6IFsnTWnEmWtraSwgbmllYm9sZXNueSBndXplaycsICdUd2FyZGUsIGJhcmR6byBib2xlc25lIHpncnViaWVuaWUnLCAnV3lwYWRhasSFY2Egem1pYW5hIGNvZmFqxIVjYSBzacSZJywgJ0JvbGVzbnkgb2JyesSZa2JyemVndSBvZGJ5dHUnXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHF1ZXN0aW9uOiAnT2QgamFrIGRhd25hIHd5c3TEmXB1amU/JyxcbiAgICAgICAgdGFnczogWydOYWdsZSBvZCBraWxrdSBkbmknLCAnT2Qgd2llbHUgdHlnb2RuaScsICdOYXdyYWNhIG9kIG1pZXNpxJljeSddLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgaWQ6ICd3eWNpZWsnLFxuICAgIGljb246ICfil40nLFxuICAgIHRpdGxlOiAnV3ljaWVrIC8gd2lsZ290bm/Fm8SHJyxcbiAgICBncm91cHM6IFtcbiAgICAgIHtcbiAgICAgICAgcXVlc3Rpb246ICdKYWtpIGNoYXJha3RlciBtYSB3eWR6aWVsaW5hPycsXG4gICAgICAgIHRhZ3M6IFsnxZpsdXpvd2EgcHJ6ZcW6cm9jenlzdGEnLCAnUm9wbmEgLyBwb2RiYXJ3aW9uYSBrcndpxIUnLCAnxZpsYWR5IHN0b2xjYSBuYSBiaWVsacW6bmllJywgJ1Vwb3Jjenl3YSB3aWxnb3Rub8WbxIcgc2tpbiddLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXTtcblxuaW50ZXJmYWNlIFN5bXB0b21zU2VjdGlvblByb3BzIHtcbiAgc2VsZWN0ZWRTeW1wdG9tczogc3RyaW5nW107XG4gIG9uVG9nZ2xlU3ltcHRvbVRhZzogKHRhZzogc3RyaW5nKSA9PiB2b2lkO1xuICBvbkNvbGxlY3RDcnlzdGFsPzogKGNyeXN0YWxJZDogbnVtYmVyKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgU3ltcHRvbXNTZWN0aW9uOiBSZWFjdC5GQzxTeW1wdG9tc1NlY3Rpb25Qcm9wcz4gPSAoe1xuICBzZWxlY3RlZFN5bXB0b21zLFxuICBvblRvZ2dsZVN5bXB0b21UYWcsXG4gIG9uQ29sbGVjdENyeXN0YWwsXG59KSA9PiB7XG4gIGNvbnN0IFthY3RpdmVDYXJkSW5kZXgsIHNldEFjdGl2ZUNhcmRJbmRleF0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPigwKTtcbiAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZTxzdHJpbmc+KCcnKTtcblxuICBjb25zdCBtYXRjaGVkU3VnZ2VzdGlvbnMgPSBzZWFyY2hRdWVyeS50cmltKCkubGVuZ3RoID49IDJcbiAgICA/IENPTExPUVVJQUxfTUFQUElOR1MuZmlsdGVyKChtKSA9PlxuICAgICAgICBtLmNvbGxvcXVpYWxUZXJtcy5zb21lKCh0ZXJtKSA9PiB0ZXJtLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKS50cmltKCkpKSB8fFxuICAgICAgICBtLm1lZGljYWxUZXJtLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKS50cmltKCkpXG4gICAgICApXG4gICAgOiBbXTtcblxuICByZXR1cm4gKFxuICAgIDxtb3Rpb24uc2VjdGlvblxuICAgICAgY2xhc3NOYW1lPVwicHktMjAgcHgtNCBzbTpweC02IGxnOnB4LTggbWF4LXctNnhsIG14LWF1dG9cIlxuICAgICAgaWQ9XCJvYmphd3lcIlxuICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAzNSB9fVxuICAgICAgd2hpbGVJblZpZXc9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgdmlld3BvcnQ9e3sgb25jZTogdHJ1ZSwgbWFyZ2luOiAnLTYwcHgnIH19XG4gICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjYsIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdIH19XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYXgtdy0zeGwgbXgtYXV0byBtYi0xMFwiPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LWluZGlnby00MDAgbWItMlwiPlxuICAgICAgICAgIE9kIGN6ZWdvIHphY3p5bmFteT9cbiAgICAgICAgPC9wPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBzbTp0ZXh0LTR4bCBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTEwMCBtYi00XCI+XG4gICAgICAgICAgTmFqY3rEmcWbY2llaiB0byBqYSB6YWRhasSZIHBpZXJ3c3plIHB5dGFuaWVcbiAgICAgICAgPC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWJhc2UgdGV4dC1zbGF0ZS0zMDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICBOaWUgbXVzaXN6IHdpZWR6aWXEhywgamFrIG5hendhxIcgcHJvYmxlbSBtZWR5Y3puaWUuIFdwaXN6IHcgcG9uacW8c3rEhSB3eXN6dWtpd2Fya8SZIHBvdG9jem5lIHPFgm93YSAobnAuIOKAnmd1emVr4oCdLCDigJ5rcmV3IHByenkgcG9kY2llcmFuaXXigJ0sIOKAnnBpZWN6ZW5pZeKAnSksIGEgbmFzeiBpbnRlbGlnZW50bnkgdMWCdW1hY3ogcG9kcG93aWUgQ2kgZGlhZ25vesSZIGtsaW5pY3puxIUuXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogU21hcnQgU2VhcmNoIEJhciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctMnhsIG14LWF1dG8gbWItMTBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDAgYWJzb2x1dGUgbGVmdC00IHRvcC0xLzIgLXRyYW5zbGF0ZS15LTEvMlwiIC8+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNoUXVlcnl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHtcbiAgICAgICAgICAgICAgc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUubGVuZ3RoID49IDMgJiYgb25Db2xsZWN0Q3J5c3RhbCkge1xuICAgICAgICAgICAgICAgIG9uQ29sbGVjdENyeXN0YWwoMSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldwaXN6IHBvdG9jem5pZSBzd8OzaiBwcm9ibGVtIChucC4gZ3V6ZWssIGtyZXcsIHBpZWN6ZW5pZSwgc3fEmWR6ZW5pZSwgcm9wYSkuLi5cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHBsLTEyIHByLTEyIHB5LTMuNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzQwIHRleHQtc2xhdGUtMTAwIHBsYWNlaG9sZGVyLXNsYXRlLTQwMCB0ZXh0LXhzIHNtOnRleHQtc20gc2hhZG93LXhsIGZvY3VzOmJvcmRlci1pbmRpZ28tNDAwIGZvY3VzOm91dGxpbmUtbm9uZSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICB7c2VhcmNoUXVlcnkgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWFyY2hRdWVyeSgnJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTQgdG9wLTEvMiAtdHJhbnNsYXRlLXktMS8yIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBXeWN6ecWbxIdcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTZWFyY2ggU3VnZ2VzdGlvbnMgKi99XG4gICAgICAgIHtzZWFyY2hRdWVyeS50cmltKCkubGVuZ3RoID49IDIgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBwLTQgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC81MCBzaGFkb3ctMnhsIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtaW5kaWdvLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPEJyYWluQ2lyY3VpdCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UmVrb21lbmRhY2phIE1lZHljem5hIENNTCAoe21hdGNoZWRTdWdnZXN0aW9ucy5sZW5ndGh9IGRvcGFzb3dhxYQpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlTFgnVtYWN6IGrEmXp5a2EgcG90b2N6bmVnbzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7bWF0Y2hlZFN1Z2dlc3Rpb25zLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAge21hdGNoZWRTdWdnZXN0aW9ucy5tYXAoKG1hdGNoLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgdGV4dC14cyBzbTp0ZXh0LXNtXCI+e21hdGNoLm1lZGljYWxUZXJtfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge21hdGNoLnByb2NlZHVyZX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwXCI+e21hdGNoLmV4cGxhbmF0aW9ufTwvcD5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZFN5bXB0b21zLmluY2x1ZGVzKG1hdGNoLnRhZ1RvQWRkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVG9nZ2xlU3ltcHRvbVRhZyhtYXRjaC50YWdUb0FkZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQ29sbGVjdENyeXN0YWwpIG9uQ29sbGVjdENyeXN0YWwoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU3ltcHRvbXMuaW5jbHVkZXMobWF0Y2gudGFnVG9BZGQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC02MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZFN5bXB0b21zLmluY2x1ZGVzKG1hdGNoLnRhZ1RvQWRkKSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk9iamF3IFphcGlzYW55PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+KyBEb2RhaiBvYmphdyBkbyBvcGlzdTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXJyb3dSaWdodCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIHB5LTJcIj5cbiAgICAgICAgICAgICAgICBOaWUgem5hbGV6aW9ubyDFm2Npc8WCZWdvIGRvcGFzb3dhbmlhIGRsYSB0ZWogZnJhenkuIFd5Ymllcnogb2Rwb3dpZWRuaSBrYWZlbCB6IHBvbmnFvHN6ZWogbGlzdHkgb2JzemFyw7N3LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICB7c3ltcHRvbXNEYXRhLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBjb25zdCBpc09wZW4gPSBhY3RpdmVDYXJkSW5kZXggPT09IGluZGV4O1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlQ2FyZEluZGV4KGlzT3BlbiA/IG51bGwgOiBpbmRleCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNSByb3VuZGVkLTJ4bCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICBpc09wZW5cbiAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTkwMC85MCBib3JkZXItaW5kaWdvLTUwMC82MCBzaGFkb3cteGwgc2hhZG93LWluZGlnby01MDAvMTAnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNDAgaG92ZXI6Ymctc2xhdGUtOTAwLzcwIGJvcmRlci1zbGF0ZS04MDAvODAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC0yeGwgcC0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLmljb259XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWJhc2UgdGV4dC1zbGF0ZS0xMDBcIj57aXRlbS50aXRsZX08L2gzPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxDaGV2cm9uRG93blxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy00IGgtNCB0ZXh0LXNsYXRlLTQwMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSAke1xuICAgICAgICAgICAgICAgICAgICBpc09wZW4gPyAncm90YXRlLTE4MCB0ZXh0LWluZGlnby00MDAnIDogJydcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMiBmb250LWxpZ2h0XCI+XG4gICAgICAgICAgICAgICAge2lzT3BlbiA/ICdLbGlrbmlqLCBhYnkgendpbsSFxIcnIDogJ0tsaWtuaWosIGFieSB6b2JhY3p5xIcgcHl0YW5pYSBkaWFnbm9zdHljem5lJ31cbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIHtpc09wZW4gJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS00IGFuaW1hdGUtZmFkZS1pblwiIG9uQ2xpY2s9eyhlKSA9PiBlLnN0b3BQcm9wYWdhdGlvbigpfT5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmdyb3Vwcy5tYXAoKGdyb3VwLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWluZGlnby0zMDAgaXRhbGljIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxIZWxwQ2lyY2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntncm91cC5xdWVzdGlvbn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2dyb3VwLnRhZ3MubWFwKCh0YWcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkU3ltcHRvbXMuaW5jbHVkZXModGFnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVG9nZ2xlU3ltcHRvbVRhZyh0YWcpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgZm9jdXM6b3V0bGluZS1ub25lICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1pbmRpZ28tNDAwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvODAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc1NlbGVjdGVkICYmIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXdoaXRlXCIgLz59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dGFnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2Rpdj5cblxuICAgICAge3NlbGVjdGVkU3ltcHRvbXMubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtOCBwLTQgcm91bmRlZC14bCBiZy1pbmRpZ28tOTUwLzQwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1pbmRpZ28tMjAwIG1iLTJcIj5cbiAgICAgICAgICAgIFphem5hY3pvbmUgb2JqYXd5IGRvIG9tw7N3aWVuaWEgKHtzZWxlY3RlZFN5bXB0b21zLmxlbmd0aH0pOlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGp1c3RpZnktY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIHtzZWxlY3RlZFN5bXB0b21zLm1hcCgocykgPT4gKFxuICAgICAgICAgICAgICA8c3BhbiBrZXk9e3N9IGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtZnVsbCBiZy1pbmRpZ28tOTAwLzYwIHRleHQtaW5kaWdvLTIwMCB0ZXh0LXhzIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMFwiPlxuICAgICAgICAgICAgICAgIHtzfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIG10LTYgZm9udC1saWdodFwiPlxuICAgICAgICBXYXJ0byBwcnplbXnFm2xlxIcgdGUga3dlc3RpZSBwcnplZCB3aXp5dMSFLiBVxYJhdHdpYSB0byBrb211bmlrYWNqxJkgaSBwb3p3YWxhIHNrdXBpxIcgc2nEmSBvZCByYXp1IG5hIHJ6ZXRlbG5laiBkaWFnbm9zdHljZS5cbiAgICAgIDwvcD5cbiAgICA8L21v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