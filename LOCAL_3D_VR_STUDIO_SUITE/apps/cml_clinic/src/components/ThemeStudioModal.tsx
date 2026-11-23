import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { Palette, Sparkles, X, Check, Layers, Zap, Eye, Sliders, Box } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion, AnimatePresence } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
export const themeOptions = [
  {
    id: "midnight",
    name: "Midnight Luxury 3D",
    description: "Ciemno-grafitowy motyw z trójwymiarową głębią fioletu i złota. Standardowy wygląd CML.",
    primaryColor: "#a855f7",
    accentColor: "#f59e0b",
    bgGradient: "from-slate-950 via-slate-900 to-indigo-950",
    cardBg: "bg-slate-900/90",
    badge: "Domyślna Głębia",
    btn3dClass: "btn-3d-purple"
  },
  {
    id: "emerald",
    name: "Medyczny Szmaragd 3D",
    description: "Aura czystości i szmaragdowej medycyny z trójwymiarowymi akcentami miętowo-złotymi.",
    primaryColor: "#10b981",
    accentColor: "#34d399",
    bgGradient: "from-emerald-950 via-slate-900 to-teal-950",
    cardBg: "bg-emerald-950/70",
    badge: "Medyczny Szmaragd",
    btn3dClass: "btn-3d-emerald"
  },
  {
    id: "royal",
    name: "Królewski Fiolet 3D",
    description: "Luksusowy odcień ametystu, różowego złota i trójwymiarowego połysku laserowego.",
    primaryColor: "#c084fc",
    accentColor: "#f472b6",
    bgGradient: "from-purple-950 via-slate-900 to-fuchsia-950",
    cardBg: "bg-purple-950/70",
    badge: "Luksus & Hologram",
    btn3dClass: "btn-3d-purple"
  },
  {
    id: "cyber",
    name: "Cyber Laser 3D",
    description: "Futurystyczna nakładka neonowo-błękitna zainspirowana precyzyjną wiązką lasera LHP®.",
    primaryColor: "#06b6d4",
    accentColor: "#38bdf8",
    bgGradient: "from-cyan-950 via-slate-900 to-sky-950",
    cardBg: "bg-cyan-950/70",
    badge: "Laser Neon 3D",
    btn3dClass: "btn-3d-cyan"
  },
  {
    id: "light",
    name: "Kliniczny Jasny WCAG",
    description: "Czysta, szpitalna jasność o wysokim kontraście i czytelności dla pacjentów seniorów.",
    primaryColor: "#2563eb",
    accentColor: "#059669",
    bgGradient: "from-slate-100 via-slate-50 to-white",
    cardBg: "bg-white",
    badge: "Jasny WCAG",
    btn3dClass: "btn-3d-gold"
  }
];
export const ThemeStudioModal = ({
  isOpen,
  onClose,
  activeTheme,
  onChangeTheme,
  activeShade,
  onChangeShade,
  active3dDepth,
  onChange3dDepth
}) => {
  const [clicked3dBtn, setClicked3dBtn] = useState(null);
  if (!isOpen) return null;
  const handleTest3dClick = (btnName) => {
    setClicked3dBtn(btnName);
    setTimeout(() => setClicked3dBtn(null), 800);
  };
  return /* @__PURE__ */ jsxDEV(AnimatePresence, { children: /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md", children: /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 20 },
      className: "relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl bg-slate-900 border border-purple-500/40 shadow-2xl flex flex-col",
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/90 shrink-0", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-purple-950 text-purple-300 border border-purple-500/30", children: /* @__PURE__ */ jsxDEV(Palette, { className: "w-6 h-6 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 107,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 106,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold uppercase tracking-widest text-purple-400 block", children: "CML Studio Nakładek Tematycznych & Animacji 3D" }, void 0, false, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 110,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-serif text-slate-100 font-bold", children: "Wybór Motywu, Odcieni i Przyciski 3D" }, void 0, false, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 113,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 109,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
            lineNumber: 105,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onClose,
              className: "p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors",
              children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 123,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 119,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
          lineNumber: 104,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-6 overflow-y-auto space-y-8 flex-1", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 133,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-slate-200 uppercase tracking-wider", children: "1. Nakładki Tematyczne (Visual Themes)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 134,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 132,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400", children: "Dostępne: 5 wariantów" }, void 0, false, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 138,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 131,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: themeOptions.map((t) => {
              const isSelected = activeTheme === t.id;
              return /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => onChangeTheme(t.id),
                  className: `p-4 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between group ${isSelected ? "bg-slate-950 border-purple-500 ring-2 ring-purple-500/30 shadow-xl" : "bg-slate-950/60 border-slate-800 hover:border-slate-700"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between mb-3", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-950 text-purple-300 border border-purple-500/30", children: t.badge }, void 0, false, {
                        fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                        lineNumber: 155,
                        columnNumber: 25
                      }, this),
                      isSelected && /* @__PURE__ */ jsxDEV("span", { className: "p-1 rounded-full bg-purple-600 text-white", children: /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                        lineNumber: 160,
                        columnNumber: 29
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                        lineNumber: 159,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                      lineNumber: 154,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-slate-100 text-sm mb-1", children: t.name }, void 0, false, {
                      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                      lineNumber: 165,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-light mb-4 leading-relaxed", children: t.description }, void 0, false, {
                      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                      lineNumber: 166,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-3 border-t border-slate-900", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full border border-slate-700", style: { backgroundColor: t.primaryColor }, title: "Główny Kolor" }, void 0, false, {
                        fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                        lineNumber: 172,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full border border-slate-700", style: { backgroundColor: t.accentColor }, title: "Akcent" }, void 0, false, {
                        fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                        lineNumber: 173,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 ml-auto uppercase font-mono", children: t.id }, void 0, false, {
                        fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                        lineNumber: 174,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                      lineNumber: 171,
                      columnNumber: 23
                    }, this)
                  ]
                },
                t.id,
                true,
                {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 145,
                  columnNumber: 21
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 141,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-6 border-t border-slate-800", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxDEV(Sliders, { className: "w-4 h-4 text-teal-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 187,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-slate-200 uppercase tracking-wider", children: "2. Warianty Odcieni & Nasycenia (Shade Variants)" }, void 0, false, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 188,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 186,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
              { id: "standard", name: "Standard", desc: "Naturalne nasycenie" },
              { id: "pastel", name: "Soft Pastel", desc: "Miękkie pastele medyczne" },
              { id: "luxury", name: "Luxury High-Contrast", desc: "Głęboki kontrast premium" },
              { id: "neon", name: "Neon Laser Glow", desc: "Jaskrawe promieniowanie" }
            ].map((s) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onChangeShade(s.id),
                className: `p-3 rounded-xl border text-left transition-all ${activeShade === s.id ? "bg-teal-950/80 border-teal-500 text-teal-200 font-semibold" : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold block mb-0.5", children: s.name }, void 0, false, {
                    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                    lineNumber: 209,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-light", children: s.desc }, void 0, false, {
                    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                    lineNumber: 210,
                    columnNumber: 21
                  }, this)
                ]
              },
              s.id,
              true,
              {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 200,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 193,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
            lineNumber: 185,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-6 border-t border-slate-800", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Box, { className: "w-4 h-4 text-amber-400 animate-bounce" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 220,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-slate-200 uppercase tracking-wider", children: "3. Trójwymiarowe Przyciski 3D & Głębokość (Tactile 3D Buttons)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 221,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 219,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400", children: "Głębia 3D:" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 227,
                  columnNumber: 19
                }, this),
                ["subtle", "intense", "extreme"].map((d) => /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => onChange3dDepth(d),
                    className: `px-2.5 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${active3dDepth === d ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-400 hover:text-slate-200"}`,
                    children: d
                  },
                  d,
                  false,
                  {
                    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                    lineNumber: 229,
                    columnNumber: 21
                  },
                  this
                ))
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 226,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 218,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-6", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300", children: "Wypróbuj trójwymiarowe kliknięcie poniższych przycisków 3D z efektem ugięcia i trójwymiarowego cienia:" }, void 0, false, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 246,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleTest3dClick("purple"),
                      className: "btn-3d btn-3d-purple px-5 py-3 rounded-2xl text-xs w-full flex items-center justify-center gap-2 shadow-lg",
                      children: [
                        /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
                          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                          lineNumber: 257,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Laser LHP® 3D" }, void 0, false, {
                          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                          lineNumber: 258,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                      lineNumber: 253,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: ".btn-3d-purple" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                    lineNumber: 260,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 252,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleTest3dClick("emerald"),
                      className: "btn-3d btn-3d-emerald px-5 py-3 rounded-2xl text-xs w-full flex items-center justify-center gap-2 shadow-lg",
                      children: [
                        /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4" }, void 0, false, {
                          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                          lineNumber: 269,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "E-Rezerwacja 3D" }, void 0, false, {
                          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                          lineNumber: 270,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                      lineNumber: 265,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: ".btn-3d-emerald" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                    lineNumber: 272,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 264,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleTest3dClick("cyan"),
                      className: "btn-3d btn-3d-cyan px-5 py-3 rounded-2xl text-xs w-full flex items-center justify-center gap-2 shadow-lg",
                      children: [
                        /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false, {
                          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                          lineNumber: 281,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Konsultacja AI 3D" }, void 0, false, {
                          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                          lineNumber: 282,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                      lineNumber: 277,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: ".btn-3d-cyan" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                    lineNumber: 284,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 276,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleTest3dClick("gold"),
                      className: "btn-3d btn-3d-gold px-5 py-3 rounded-2xl text-xs w-full flex items-center justify-center gap-2 shadow-lg",
                      children: [
                        /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
                          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                          lineNumber: 293,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Kup Produkt 3D" }, void 0, false, {
                          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                          lineNumber: 294,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                      lineNumber: 289,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: ".btn-3d-gold" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                    lineNumber: 296,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                  lineNumber: 288,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 250,
                columnNumber: 17
              }, this),
              clicked3dBtn && /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-purple-950/60 border border-purple-500/30 text-center text-xs text-purple-200 font-semibold animate-bounce", children: [
                "✨ Kliknięto trójwymiarowy przycisk 3D (",
                clicked3dBtn,
                ")! Efekt ugięcia & trójwymiarowego cienia aktywowany."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
                lineNumber: 301,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 245,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
            lineNumber: 217,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
          lineNumber: 128,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between shrink-0 text-xs", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
            "Aktualnie aktywna nakładka: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-300 font-mono uppercase", children: activeTheme }, void 0, false, {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 312,
              columnNumber: 43
            }, this),
            " (",
            activeShade,
            ")"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
            lineNumber: 311,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onClose,
              className: "btn-3d btn-3d-purple px-6 py-2 rounded-xl text-xs text-white",
              children: "Zapisz Ustawienia Studio"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
              lineNumber: 315,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
          lineNumber: 310,
          columnNumber: 11
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
      lineNumber: 97,
      columnNumber: 9
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
    lineNumber: 96,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/ThemeStudioModal.tsx",
    lineNumber: 95,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRoZW1lU3R1ZGlvTW9kYWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFBhbGV0dGUsIFNwYXJrbGVzLCBYLCBDaGVjaywgTGF5ZXJzLCBaYXAsIEV5ZSwgU2xpZGVycywgQm94IH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFRoZW1lSWQsIFNoYWRlVmFyaWFudCwgRGVwdGgzRE1vZGUsIFRoZW1lQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuXG5pbnRlcmZhY2UgVGhlbWVTdHVkaW9Nb2RhbFByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBhY3RpdmVUaGVtZTogVGhlbWVJZDtcbiAgb25DaGFuZ2VUaGVtZTogKHRoZW1lOiBUaGVtZUlkKSA9PiB2b2lkO1xuICBhY3RpdmVTaGFkZTogU2hhZGVWYXJpYW50O1xuICBvbkNoYW5nZVNoYWRlOiAoc2hhZGU6IFNoYWRlVmFyaWFudCkgPT4gdm9pZDtcbiAgYWN0aXZlM2REZXB0aDogRGVwdGgzRE1vZGU7XG4gIG9uQ2hhbmdlM2REZXB0aDogKGRlcHRoOiBEZXB0aDNETW9kZSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IHRoZW1lT3B0aW9uczogVGhlbWVDb25maWdbXSA9IFtcbiAge1xuICAgIGlkOiAnbWlkbmlnaHQnLFxuICAgIG5hbWU6ICdNaWRuaWdodCBMdXh1cnkgM0QnLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2llbW5vLWdyYWZpdG93eSBtb3R5dyB6IHRyw7Nqd3ltaWFyb3fEhSBnxYLEmWJpxIUgZmlvbGV0dSBpIHrFgm90YS4gU3RhbmRhcmRvd3kgd3lnbMSFZCBDTUwuJyxcbiAgICBwcmltYXJ5Q29sb3I6ICcjYTg1NWY3JyxcbiAgICBhY2NlbnRDb2xvcjogJyNmNTllMGInLFxuICAgIGJnR3JhZGllbnQ6ICdmcm9tLXNsYXRlLTk1MCB2aWEtc2xhdGUtOTAwIHRvLWluZGlnby05NTAnLFxuICAgIGNhcmRCZzogJ2JnLXNsYXRlLTkwMC85MCcsXG4gICAgYmFkZ2U6ICdEb215xZtsbmEgR8WCxJliaWEnLFxuICAgIGJ0bjNkQ2xhc3M6ICdidG4tM2QtcHVycGxlJyxcbiAgfSxcbiAge1xuICAgIGlkOiAnZW1lcmFsZCcsXG4gICAgbmFtZTogJ01lZHljem55IFN6bWFyYWdkIDNEJyxcbiAgICBkZXNjcmlwdGlvbjogJ0F1cmEgY3p5c3RvxZtjaSBpIHN6bWFyYWdkb3dlaiBtZWR5Y3lueSB6IHRyw7Nqd3ltaWFyb3d5bWkgYWtjZW50YW1pIG1pxJl0b3dvLXrFgm90eW1pLicsXG4gICAgcHJpbWFyeUNvbG9yOiAnIzEwYjk4MScsXG4gICAgYWNjZW50Q29sb3I6ICcjMzRkMzk5JyxcbiAgICBiZ0dyYWRpZW50OiAnZnJvbS1lbWVyYWxkLTk1MCB2aWEtc2xhdGUtOTAwIHRvLXRlYWwtOTUwJyxcbiAgICBjYXJkQmc6ICdiZy1lbWVyYWxkLTk1MC83MCcsXG4gICAgYmFkZ2U6ICdNZWR5Y3pueSBTem1hcmFnZCcsXG4gICAgYnRuM2RDbGFzczogJ2J0bi0zZC1lbWVyYWxkJyxcbiAgfSxcbiAge1xuICAgIGlkOiAncm95YWwnLFxuICAgIG5hbWU6ICdLcsOzbGV3c2tpIEZpb2xldCAzRCcsXG4gICAgZGVzY3JpcHRpb246ICdMdWtzdXNvd3kgb2RjaWXFhCBhbWV0eXN0dSwgcsOzxbxvd2VnbyB6xYJvdGEgaSB0csOzand5bWlhcm93ZWdvIHBvxYJ5c2t1IGxhc2Vyb3dlZ28uJyxcbiAgICBwcmltYXJ5Q29sb3I6ICcjYzA4NGZjJyxcbiAgICBhY2NlbnRDb2xvcjogJyNmNDcyYjYnLFxuICAgIGJnR3JhZGllbnQ6ICdmcm9tLXB1cnBsZS05NTAgdmlhLXNsYXRlLTkwMCB0by1mdWNoc2lhLTk1MCcsXG4gICAgY2FyZEJnOiAnYmctcHVycGxlLTk1MC83MCcsXG4gICAgYmFkZ2U6ICdMdWtzdXMgJiBIb2xvZ3JhbScsXG4gICAgYnRuM2RDbGFzczogJ2J0bi0zZC1wdXJwbGUnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdjeWJlcicsXG4gICAgbmFtZTogJ0N5YmVyIExhc2VyIDNEJyxcbiAgICBkZXNjcmlwdGlvbjogJ0Z1dHVyeXN0eWN6bmEgbmFrxYJhZGthIG5lb25vd28tYsWCxJlraXRuYSB6YWluc3Bpcm93YW5hIHByZWN5enlqbsSFIHdpxIV6a8SFIGxhc2VyYSBMSFDCri4nLFxuICAgIHByaW1hcnlDb2xvcjogJyMwNmI2ZDQnLFxuICAgIGFjY2VudENvbG9yOiAnIzM4YmRmOCcsXG4gICAgYmdHcmFkaWVudDogJ2Zyb20tY3lhbi05NTAgdmlhLXNsYXRlLTkwMCB0by1za3ktOTUwJyxcbiAgICBjYXJkQmc6ICdiZy1jeWFuLTk1MC83MCcsXG4gICAgYmFkZ2U6ICdMYXNlciBOZW9uIDNEJyxcbiAgICBidG4zZENsYXNzOiAnYnRuLTNkLWN5YW4nLFxuICB9LFxuICB7XG4gICAgaWQ6ICdsaWdodCcsXG4gICAgbmFtZTogJ0tsaW5pY3pueSBKYXNueSBXQ0FHJyxcbiAgICBkZXNjcmlwdGlvbjogJ0N6eXN0YSwgc3pwaXRhbG5hIGphc25vxZvEhyBvIHd5c29raW0ga29udHJhxZtjaWUgaSBjenl0ZWxub8WbY2kgZGxhIHBhY2plbnTDs3cgc2VuaW9yw7N3LicsXG4gICAgcHJpbWFyeUNvbG9yOiAnIzI1NjNlYicsXG4gICAgYWNjZW50Q29sb3I6ICcjMDU5NjY5JyxcbiAgICBiZ0dyYWRpZW50OiAnZnJvbS1zbGF0ZS0xMDAgdmlhLXNsYXRlLTUwIHRvLXdoaXRlJyxcbiAgICBjYXJkQmc6ICdiZy13aGl0ZScsXG4gICAgYmFkZ2U6ICdKYXNueSBXQ0FHJyxcbiAgICBidG4zZENsYXNzOiAnYnRuLTNkLWdvbGQnLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IFRoZW1lU3R1ZGlvTW9kYWw6IFJlYWN0LkZDPFRoZW1lU3R1ZGlvTW9kYWxQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2UsXG4gIGFjdGl2ZVRoZW1lLFxuICBvbkNoYW5nZVRoZW1lLFxuICBhY3RpdmVTaGFkZSxcbiAgb25DaGFuZ2VTaGFkZSxcbiAgYWN0aXZlM2REZXB0aCxcbiAgb25DaGFuZ2UzZERlcHRoLFxufSkgPT4ge1xuICBjb25zdCBbY2xpY2tlZDNkQnRuLCBzZXRDbGlja2VkM2RCdG5dID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGhhbmRsZVRlc3QzZENsaWNrID0gKGJ0bk5hbWU6IHN0cmluZykgPT4ge1xuICAgIHNldENsaWNrZWQzZEJ0bihidG5OYW1lKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldENsaWNrZWQzZEJ0bihudWxsKSwgODAwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTQgYmctc2xhdGUtOTUwLzgwIGJhY2tkcm9wLWJsdXItbWRcIj5cbiAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1LCB5OiAyMCB9fVxuICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgc2NhbGU6IDEsIHk6IDAgfX1cbiAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1LCB5OiAyMCB9fVxuICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBtYXgtdy00eGwgbWF4LWgtWzkwdmhdIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzQwIHNoYWRvdy0yeGwgZmxleCBmbGV4LWNvbFwiXG4gICAgICAgID5cbiAgICAgICAgICB7LyogSGVhZGVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJnLXNsYXRlLTk1MC85MCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQtMnhsIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMFwiPlxuICAgICAgICAgICAgICAgIDxQYWxldHRlIGNsYXNzTmFtZT1cInctNiBoLTYgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtcHVycGxlLTQwMCBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgQ01MIFN0dWRpbyBOYWvFgmFkZWsgVGVtYXR5Y3pueWNoICYgQW5pbWFjamkgM0RcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1zZXJpZiB0ZXh0LXNsYXRlLTEwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIFd5YsOzciBNb3R5d3UsIE9kY2llbmkgaSBQcnp5Y2lza2kgM0RcbiAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBCb2R5ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IG92ZXJmbG93LXktYXV0byBzcGFjZS15LTggZmxleC0xXCI+XG4gICAgICAgICAgICB7LyogU2VjdGlvbiAxOiBUaGVtZXMgU2VsZWN0aW9uICovfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgICAxLiBOYWvFgmFka2kgVGVtYXR5Y3puZSAoVmlzdWFsIFRoZW1lcylcbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPkRvc3TEmXBuZTogNSB3YXJpYW50w7N3PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICB7dGhlbWVPcHRpb25zLm1hcCgodCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGFjdGl2ZVRoZW1lID09PSB0LmlkO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17dC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZVRoZW1lKHQuaWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLTJ4bCB0ZXh0LWxlZnQgYm9yZGVyIHRyYW5zaXRpb24tYWxsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBncm91cCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXB1cnBsZS01MDAgcmluZy0yIHJpbmctcHVycGxlLTUwMC8zMCBzaGFkb3cteGwnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt0LmJhZGdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzU2VsZWN0ZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTEgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTEwMCB0ZXh0LXNtIG1iLTFcIj57dC5uYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LWxpZ2h0IG1iLTQgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogVmlzdWFsIENvbG9yIFBhbGV0dGUgU3dhdGNoZXMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiB0LnByaW1hcnlDb2xvciB9fSB0aXRsZT1cIkfFgsOzd255IEtvbG9yXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCIgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiB0LmFjY2VudENvbG9yIH19IHRpdGxlPVwiQWtjZW50XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIG1sLWF1dG8gdXBwZXJjYXNlIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7dC5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU2VjdGlvbiAyOiBTaGFkZSBWYXJpYW50cyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItNFwiPlxuICAgICAgICAgICAgICAgIDxTbGlkZXJzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC10ZWFsLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgMi4gV2FyaWFudHkgT2RjaWVuaSAmIE5hc3ljZW5pYSAoU2hhZGUgVmFyaWFudHMpXG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0zXCI+XG4gICAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdzdGFuZGFyZCcsIG5hbWU6ICdTdGFuZGFyZCcsIGRlc2M6ICdOYXR1cmFsbmUgbmFzeWNlbmllJyB9LFxuICAgICAgICAgICAgICAgICAgeyBpZDogJ3Bhc3RlbCcsIG5hbWU6ICdTb2Z0IFBhc3RlbCcsIGRlc2M6ICdNacSZa2tpZSBwYXN0ZWxlIG1lZHljem5lJyB9LFxuICAgICAgICAgICAgICAgICAgeyBpZDogJ2x1eHVyeScsIG5hbWU6ICdMdXh1cnkgSGlnaC1Db250cmFzdCcsIGRlc2M6ICdHxYLEmWJva2kga29udHJhc3QgcHJlbWl1bScgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICduZW9uJywgbmFtZTogJ05lb24gTGFzZXIgR2xvdycsIGRlc2M6ICdKYXNrcmF3ZSBwcm9taWVuaW93YW5pZScgfSxcbiAgICAgICAgICAgICAgICBdLm1hcCgocykgPT4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBrZXk9e3MuaWR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlU2hhZGUocy5pZCBhcyBTaGFkZVZhcmlhbnQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC14bCBib3JkZXIgdGV4dC1sZWZ0IHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU2hhZGUgPT09IHMuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXRlYWwtOTUwLzgwIGJvcmRlci10ZWFsLTUwMCB0ZXh0LXRlYWwtMjAwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIGJsb2NrIG1iLTAuNVwiPntzLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LWxpZ2h0XCI+e3MuZGVzY308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNlY3Rpb24gMzogSW50ZXJhY3RpdmUgM0QgQnV0dG9ucyAmIEFuaW1hdGlvbnMgU2hvd2Nhc2UgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTYgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPEJveCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgMy4gVHLDs2p3eW1pYXJvd2UgUHJ6eWNpc2tpIDNEICYgR8WCxJlib2tvxZvEhyAoVGFjdGlsZSAzRCBCdXR0b25zKVxuICAgICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5HxYLEmWJpYSAzRDo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICB7KFsnc3VidGxlJywgJ2ludGVuc2UnLCAnZXh0cmVtZSddIGFzIERlcHRoM0RNb2RlW10pLm1hcCgoZCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlM2REZXB0aChkKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkLW1kIHRleHQtWzEwcHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZTNkRGVwdGggPT09IGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwIHRleHQtYmxhY2snXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtkfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU2hvd2Nhc2UgM0QgQnV0dG9ucyBHcmlkICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS02XCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgV3lwcsOzYnVqIHRyw7Nqd3ltaWFyb3dlIGtsaWtuacSZY2llIHBvbmnFvHN6eWNoIHByenljaXNrw7N3IDNEIHogZWZla3RlbSB1Z2nEmWNpYSBpIHRyw7Nqd3ltaWFyb3dlZ28gY2llbmlhOlxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtNFwiPlxuICAgICAgICAgICAgICAgICAgey8qIFB1cnBsZSAzRCBCdXR0b24gKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUZXN0M2RDbGljaygncHVycGxlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLTNkIGJ0bi0zZC1wdXJwbGUgcHgtNSBweS0zIHJvdW5kZWQtMnhsIHRleHQteHMgdy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHNoYWRvdy1sZ1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+TGFzZXIgTEhQwq4gM0Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBmb250LW1vbm9cIj4uYnRuLTNkLXB1cnBsZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogRW1lcmFsZCAzRCBCdXR0b24gKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUZXN0M2RDbGljaygnZW1lcmFsZCcpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi0zZCBidG4tM2QtZW1lcmFsZCBweC01IHB5LTMgcm91bmRlZC0yeGwgdGV4dC14cyB3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RS1SZXplcndhY2phIDNEPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+LmJ0bi0zZC1lbWVyYWxkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBDeWFuIDNEIEJ1dHRvbiAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRlc3QzZENsaWNrKCdjeWFuJyl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLTNkIGJ0bi0zZC1jeWFuIHB4LTUgcHktMyByb3VuZGVkLTJ4bCB0ZXh0LXhzIHctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbGdcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Lb25zdWx0YWNqYSBBSSAzRDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPi5idG4tM2QtY3lhbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogR29sZCAzRCBCdXR0b24gKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUZXN0M2RDbGljaygnZ29sZCcpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi0zZCBidG4tM2QtZ29sZCBweC01IHB5LTMgcm91bmRlZC0yeGwgdGV4dC14cyB3LWZ1bGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5LdXAgUHJvZHVrdCAzRDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPi5idG4tM2QtZ29sZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge2NsaWNrZWQzZEJ0biAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXB1cnBsZS05NTAvNjAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIHRleHQtY2VudGVyIHRleHQteHMgdGV4dC1wdXJwbGUtMjAwIGZvbnQtc2VtaWJvbGQgYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgICAgICAgICAg4pyoIEtsaWtuacSZdG8gdHLDs2p3eW1pYXJvd3kgcHJ6eWNpc2sgM0QgKHtjbGlja2VkM2RCdG59KSEgRWZla3QgdWdpxJljaWEgJiB0csOzand5bWlhcm93ZWdvIGNpZW5pYSBha3R5d293YW55LlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBGb290ZXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBiZy1zbGF0ZS05NTAvOTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHNocmluay0wIHRleHQteHNcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIEFrdHVhbG5pZSBha3R5d25hIG5ha8WCYWRrYTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZm9udC1tb25vIHVwcGVyY2FzZVwiPnthY3RpdmVUaGVtZX08L3N0cm9uZz4gKHthY3RpdmVTaGFkZX0pXG4gICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLTNkIGJ0bi0zZC1wdXJwbGUgcHgtNiBweS0yIHJvdW5kZWQteGwgdGV4dC14cyB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgWmFwaXN6IFVzdGF3aWVuaWEgU3R1ZGlvXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUEwR2dCO0FBMUdoQixTQUFnQixnQkFBZ0I7QUFDaEMsU0FBUyxTQUFTLFVBQVUsR0FBRyxPQUFPLFFBQVEsS0FBSyxLQUFLLFNBQVMsV0FBVztBQUU1RSxTQUFTLFFBQVEsdUJBQXVCO0FBYWpDLGFBQU0sZUFBOEI7QUFBQSxFQUN6QztBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sYUFBYTtBQUFBLElB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