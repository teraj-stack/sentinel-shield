import __vite__cjsImport0_react_jsxDevRuntime from "/apps/nextgen_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c2c0e3b9"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/nextgen_clinic/node_modules/.vite/deps/react.js?v=c2c0e3b9"; const useEffect = __vite__cjsImport1_react["useEffect"]; const useState = __vite__cjsImport1_react["useState"];
import {
  Activity,
  ShieldAlert,
  Zap,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  Sun
} from "/apps/nextgen_clinic/node_modules/.vite/deps/lucide-react.js?v=93a6f22a";
export const ParallaxWindowView = ({
  departments,
  activeTimeOfDay,
  selectedDeptId,
  onSelectDepartment,
  lang
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 20,
        y: (e.clientY / innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const getTimeStyle = () => {
    switch (activeTimeOfDay) {
      case "dawn":
        return {
          skyGradient: "from-amber-100 via-sky-200 to-indigo-300",
          sunGlow: "bg-amber-300/40",
          cityTint: "brightness-105 contrast-95 sepia-[0.1]",
          ambientLight: "from-amber-50/20 via-sky-50/10 to-transparent",
          prismOpacity: "opacity-70"
        };
      case "golden":
        return {
          skyGradient: "from-orange-200 via-amber-300 to-indigo-400",
          sunGlow: "bg-orange-400/50",
          cityTint: "brightness-100 contrast-105 hue-rotate-[-10deg]",
          ambientLight: "from-amber-100/30 via-orange-50/20 to-transparent",
          prismOpacity: "opacity-90"
        };
      case "twilight":
        return {
          skyGradient: "from-slate-800 via-indigo-900 to-sky-950",
          sunGlow: "bg-indigo-500/30",
          cityTint: "brightness-75 contrast-125 saturate-125",
          ambientLight: "from-indigo-900/20 via-slate-900/10 to-transparent",
          prismOpacity: "opacity-60"
        };
      case "noon":
      default:
        return {
          skyGradient: "from-sky-100 via-blue-50 to-indigo-100",
          sunGlow: "bg-white/60",
          cityTint: "brightness-100 contrast-100",
          ambientLight: "from-sky-50/30 via-white/20 to-transparent",
          prismOpacity: "opacity-80"
        };
    }
  };
  const timeTheme = getTimeStyle();
  const backgroundParallaxY = scrollY * 0.35 + mousePos.y * 0.5;
  const backgroundParallaxX = mousePos.x * 0.8;
  const floatingIconsY1 = scrollY * -0.22 + mousePos.y * -0.8;
  const floatingIconsY2 = scrollY * -0.15 + mousePos.y * 0.6;
  const floatingIconsY3 = scrollY * -0.32 + mousePos.y * -1.2;
  return /* @__PURE__ */ jsxDEV("div", { className: "relative min-h-[140vh] w-full overflow-hidden bg-slate-950 text-slate-800 select-none", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 right-0 h-64 z-20 pointer-events-none overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-sky-200/40 via-white/10 to-transparent backdrop-blur-[2px]" }, void 0, false, {
        fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full flex justify-around opacity-30", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "h-full w-px bg-gradient-to-b from-slate-200 via-slate-400 to-transparent shadow-sm",
          style: { transform: `rotate(${(i - 3.5) * 8}deg)` }
        },
        i,
        false,
        {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 122,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
        lineNumber: 120,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute -top-20 left-1/4 w-96 h-[600px] bg-gradient-to-b from-white/30 via-cyan-100/10 to-transparent blur-2xl transform -rotate-12 pointer-events-none transition-all duration-700",
          style: { opacity: activeTimeOfDay === "twilight" ? 0.15 : 0.6 }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 131,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute -top-20 right-1/4 w-96 h-[600px] bg-gradient-to-b from-white/30 via-sky-100/10 to-transparent blur-2xl transform rotate-12 pointer-events-none transition-all duration-700",
          style: { opacity: activeTimeOfDay === "twilight" ? 0.15 : 0.6 }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 135,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative w-full h-[120vh] flex flex-col justify-between", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 h-full flex flex-col", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center z-30 pt-4 pb-8 space-y-2 max-w-3xl mx-auto", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-sky-900 text-xs font-semibold shadow-xs", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-sky-600 animate-spin", style: { animationDuration: "6s" } }, void 0, false, {
            fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
            lineNumber: 155,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Innowacyjna Medycyna Jutra" : "Tomorrow’s Precision Medical Care" }, void 0, false, {
            fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
            lineNumber: 156,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 154,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h1", { className: "text-4xl sm:text-6xl font-black tracking-tight text-slate-900 font-sans uppercase drop-shadow-xs", children: [
          "Next Generation ",
          /* @__PURE__ */ jsxDEV("span", { className: "bg-gradient-to-r from-sky-600 via-indigo-600 to-teal-500 bg-clip-text text-transparent", children: "Clinic" }, void 0, false, {
            fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
            lineNumber: 161,
            columnNumber: 31
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 160,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base text-slate-600 font-medium max-w-2xl mx-auto", children: lang === "pl" ? "Przestrzeń taktylna i otwarta. Poznaj nasze wyspecjalizowane pody: proktologia, chirurgia, flebologia oraz sklep medyczny." : "A bright, tactile space. Explore our specialized pods: proctology, surgery, phlebology, and medical shop." }, void 0, false, {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 164,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
        lineNumber: 153,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 grid grid-cols-3 gap-6 sm:gap-12 md:gap-16 items-stretch my-4 z-20", children: [1, 2, 3].map((windowIndex) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "relative rounded-3xl border-4 border-white/80 shadow-2xl overflow-hidden bg-slate-900 flex flex-col justify-between group",
          style: {
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 15px rgba(255, 255, 255, 0.4)"
          },
          children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-0 w-full h-[150%] -top-[25%] transition-transform duration-75 ease-out",
                style: {
                  transform: `translate3d(${backgroundParallaxX}px, ${backgroundParallaxY}px, 0px)`
                },
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 bg-gradient-to-b ${timeTheme.skyGradient} transition-all duration-700` }, void 0, false, {
                    fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                    lineNumber: 192,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "div",
                    {
                      className: `absolute top-12 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full ${timeTheme.sunGlow} blur-xl`
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                      lineNumber: 195,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-16 left-0 right-0 h-32 bg-white/20 blur-xl rounded-full transform -rotate-3 animate-pulse" }, void 0, false, {
                    fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                    lineNumber: 200,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: `absolute bottom-0 left-0 right-0 h-2/3 bg-cover bg-bottom opacity-85 transition-all duration-700 ${timeTheme.cityTint}`, children: /* @__PURE__ */ jsxDEV(
                    "img",
                    {
                      src: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1600&auto=format&fit=crop&q=80",
                      alt: "Panorama miasta",
                      className: "w-full h-full object-cover object-bottom mix-blend-overlay opacity-90",
                      referrerPolicy: "no-referrer"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                      lineNumber: 204,
                      columnNumber: 21
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                    lineNumber: 203,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: `absolute inset-0 bg-gradient-to-tr from-cyan-300/10 via-indigo-300/10 to-pink-300/10 ${timeTheme.prismOpacity} mix-blend-soft-light` }, void 0, false, {
                    fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                    lineNumber: 213,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 185,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/10 pointer-events-none z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 217,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 bottom-0 w-12 bg-white/10 backdrop-blur-[1px] transform skew-x-12 pointer-events-none z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 218,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 p-4 text-center", children: /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-md text-slate-800 border border-white/80 shadow-xs", children: windowIndex === 1 ? lang === "pl" ? "Widok Wschodni" : "East View" : windowIndex === 2 ? lang === "pl" ? "Główne Atrium" : "Central Atrium" : lang === "pl" ? "Widok Zachodni" : "West View" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 222,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 221,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 p-4 text-center mt-auto", children: /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-700 bg-white/60 backdrop-blur-md px-3 py-1 rounded-xl border border-white/70", children: [
              /* @__PURE__ */ jsxDEV(Sun, { className: "w-3 h-3 text-sky-600" }, void 0, false, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 230,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Światło naturalne 100%" : "100% Natural Light" }, void 0, false, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 231,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 229,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 228,
              columnNumber: 17
            }, this)
          ]
        },
        windowIndex,
        true,
        {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 175,
          columnNumber: 15
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
        lineNumber: 172,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
      lineNumber: 150,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
      lineNumber: 147,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none z-30", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute top-1/3 left-[12%] transition-transform duration-100 ease-out flex items-center justify-center p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-sky-200/80 shadow-lg text-sky-600",
          style: { transform: `translate3d(0, ${floatingIconsY1}px, 0)` },
          children: [
            /* @__PURE__ */ jsxDEV(Activity, { className: "w-6 h-6 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 256,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-1 rounded-2xl bg-sky-400/20 blur-md -z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 257,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 252,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute top-1/4 left-[38%] transition-transform duration-100 ease-out flex items-center justify-center p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-teal-200/80 shadow-lg text-teal-600",
          style: { transform: `translate3d(0, ${floatingIconsY2}px, 0)` },
          children: [
            /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 265,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-1 rounded-2xl bg-teal-400/20 blur-md -z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 266,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 261,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute top-1/3 right-[32%] transition-transform duration-100 ease-out flex items-center justify-center p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-blue-200/80 shadow-lg text-blue-600",
          style: { transform: `translate3d(0, ${floatingIconsY3}px, 0)` },
          children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 274,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-1 rounded-2xl bg-blue-400/20 blur-md -z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 275,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 270,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "absolute top-1/4 right-[12%] transition-transform duration-100 ease-out flex items-center justify-center p-3 rounded-2xl bg-white/80 backdrop-blur-md border border-amber-200/80 shadow-lg text-amber-600",
          style: { transform: `translate3d(0, ${floatingIconsY1 * 1.2}px, 0)` },
          children: [
            /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 283,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-1 rounded-2xl bg-amber-400/20 blur-md -z-10" }, void 0, false, {
              fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
              lineNumber: 284,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 279,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1/2 left-10 w-72 h-72 rounded-full bg-gradient-to-tr from-sky-300/10 via-teal-300/15 to-indigo-300/10 blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
        lineNumber: 288,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2/3 right-10 w-80 h-80 rounded-full bg-gradient-to-tr from-amber-200/15 via-rose-300/10 to-sky-300/10 blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
        lineNumber: 289,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
      lineNumber: 249,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative z-40 bg-gradient-to-b from-transparent via-slate-100/90 to-slate-100 pb-20 pt-10 border-t border-slate-200/60 backdrop-blur-xs", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-10 space-y-2", children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight", children: lang === "pl" ? "Podesty Specjalistyczne & Sklep" : "Specialized Pedestals & Store" }, void 0, false, {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 303,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-600 max-w-xl mx-auto", children: lang === "pl" ? "Wybierz podest na sali, aby przejść do wybranej dziedziny medycznej lub wejść do sklepu clinic shop." : "Select a pedestal in the hall to enter your preferred medical field or visit the clinic shop." }, void 0, false, {
          fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
          lineNumber: 306,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
        lineNumber: 302,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8", children: departments.map((dept) => {
        const isSelected = selectedDeptId === dept.id;
        const renderIcon = () => {
          switch (dept.id) {
            case "proctology":
              return /* @__PURE__ */ jsxDEV(Activity, { className: "w-8 h-8 text-sky-600" }, void 0, false, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 321,
                columnNumber: 45
              }, this);
            case "surgery":
              return /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-8 h-8 text-teal-600" }, void 0, false, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 322,
                columnNumber: 42
              }, this);
            case "phlebology":
              return /* @__PURE__ */ jsxDEV(Zap, { className: "w-8 h-8 text-blue-600" }, void 0, false, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 323,
                columnNumber: 45
              }, this);
            case "shop":
              return /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-8 h-8 text-amber-600" }, void 0, false, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 324,
                columnNumber: 39
              }, this);
            default:
              return /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-8 h-8 text-indigo-600" }, void 0, false, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 325,
                columnNumber: 35
              }, this);
          }
        };
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => onSelectDepartment(dept.id),
            className: `group relative rounded-3xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${isSelected ? "bg-white ring-4 ring-sky-500/30 shadow-2xl scale-[1.03] border-2 border-sky-400" : "bg-white/90 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 border border-slate-200/80"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-6", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200", children: dept.badge }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 342,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-slate-50 group-hover:bg-sky-50 transition-colors text-slate-400 group-hover:text-sky-600", children: /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 346,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 345,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 341,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "relative py-8 flex flex-col items-center justify-center my-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-50 to-white shadow-lg border border-slate-200/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300", children: [
                  renderIcon(),
                  /* @__PURE__ */ jsxDEV("div", { className: `absolute -inset-2 rounded-3xl bg-gradient-to-r ${dept.accentColor} opacity-0 group-hover:opacity-25 blur-lg transition-opacity duration-300 -z-10` }, void 0, false, {
                    fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                    lineNumber: 358,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 354,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "relative mt-3 w-28 h-8 rounded-full bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400/80 shadow-md border-t border-white flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-20 h-2 rounded-full bg-white/60 blur-[1px]" }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 363,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 362,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "w-32 h-3 rounded-full bg-slate-900/10 blur-sm mt-1" }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 366,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 351,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-4 border-t border-slate-100 text-left space-y-1.5", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors", children: lang === "pl" ? dept.namePl : dept.name }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 372,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 line-clamp-2 leading-relaxed", children: dept.shortDesc }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 375,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 371,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-5 pt-3 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:translate-x-1 transition-transform", children: [
                /* @__PURE__ */ jsxDEV("span", { children: dept.id === "shop" ? lang === "pl" ? "Otwórz Sklep" : "Open Store" : lang === "pl" ? "Poznaj Szczegóły" : "Explore Division" }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 382,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-base font-bold", children: "→" }, void 0, false, {
                  fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                  lineNumber: 383,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
                lineNumber: 381,
                columnNumber: 19
              }, this)
            ]
          },
          dept.id,
          true,
          {
            fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
            lineNumber: 330,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
        lineNumber: 314,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
      lineNumber: 300,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
      lineNumber: 298,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ParallaxWindowView.tsx",
    lineNumber: 109,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhcmFsbGF4V2luZG93Vmlldy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgQWN0aXZpdHksIFxuICBTaGllbGRBbGVydCwgXG4gIFphcCwgXG4gIFNob3BwaW5nQmFnLCBcbiAgU3BhcmtsZXMsIFxuICBFeWUsIFxuICBBcnJvd1VwUmlnaHQsXG4gIFN1bixcbiAgQ29tcGFzcyxcbiAgQ2hlY2tDaXJjbGUyLFxuICBNYXhpbWl6ZTJcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IERlcGFydG1lbnQsIFRpbWVPZkRheSB9IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIFBhcmFsbGF4V2luZG93Vmlld1Byb3BzIHtcbiAgZGVwYXJ0bWVudHM6IERlcGFydG1lbnRbXTtcbiAgYWN0aXZlVGltZU9mRGF5OiBUaW1lT2ZEYXk7XG4gIHNlbGVjdGVkRGVwdElkOiBzdHJpbmcgfCBudWxsO1xuICBvblNlbGVjdERlcGFydG1lbnQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBsYW5nOiAncGwnIHwgJ2VuJztcbn1cblxuZXhwb3J0IGNvbnN0IFBhcmFsbGF4V2luZG93VmlldzogUmVhY3QuRkM8UGFyYWxsYXhXaW5kb3dWaWV3UHJvcHM+ID0gKHtcbiAgZGVwYXJ0bWVudHMsXG4gIGFjdGl2ZVRpbWVPZkRheSxcbiAgc2VsZWN0ZWREZXB0SWQsXG4gIG9uU2VsZWN0RGVwYXJ0bWVudCxcbiAgbGFuZ1xufSkgPT4ge1xuICBjb25zdCBbc2Nyb2xsWSwgc2V0U2Nyb2xsWV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW21vdXNlUG9zLCBzZXRNb3VzZVBvc10gPSB1c2VTdGF0ZSh7IHg6IDAsIHk6IDAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVTY3JvbGwgPSAoKSA9PiB7XG4gICAgICBzZXRTY3JvbGxZKHdpbmRvdy5zY3JvbGxZKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlTW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgaW5uZXJXaWR0aCwgaW5uZXJIZWlnaHQgfSA9IHdpbmRvdztcbiAgICAgIHNldE1vdXNlUG9zKHtcbiAgICAgICAgeDogKGUuY2xpZW50WCAvIGlubmVyV2lkdGggLSAwLjUpICogMjAsXG4gICAgICAgIHk6IChlLmNsaWVudFkgLyBpbm5lckhlaWdodCAtIDAuNSkgKiAyMCxcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBoYW5kbGVTY3JvbGwpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIC8vIFRpbWUgb2YgRGF5IEJhY2tncm91bmQgU3R5bGluZyBmb3IgdGhlIE91dGRvb3IgU2t5bGluZSB2aXNpYmxlIGJlaGluZCB3aW5kb3dzXG4gIGNvbnN0IGdldFRpbWVTdHlsZSA9ICgpID0+IHtcbiAgICBzd2l0Y2ggKGFjdGl2ZVRpbWVPZkRheSkge1xuICAgICAgY2FzZSAnZGF3bic6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2t5R3JhZGllbnQ6ICdmcm9tLWFtYmVyLTEwMCB2aWEtc2t5LTIwMCB0by1pbmRpZ28tMzAwJyxcbiAgICAgICAgICBzdW5HbG93OiAnYmctYW1iZXItMzAwLzQwJyxcbiAgICAgICAgICBjaXR5VGludDogJ2JyaWdodG5lc3MtMTA1IGNvbnRyYXN0LTk1IHNlcGlhLVswLjFdJyxcbiAgICAgICAgICBhbWJpZW50TGlnaHQ6ICdmcm9tLWFtYmVyLTUwLzIwIHZpYS1za3ktNTAvMTAgdG8tdHJhbnNwYXJlbnQnLFxuICAgICAgICAgIHByaXNtT3BhY2l0eTogJ29wYWNpdHktNzAnXG4gICAgICAgIH07XG4gICAgICBjYXNlICdnb2xkZW4nOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNreUdyYWRpZW50OiAnZnJvbS1vcmFuZ2UtMjAwIHZpYS1hbWJlci0zMDAgdG8taW5kaWdvLTQwMCcsXG4gICAgICAgICAgc3VuR2xvdzogJ2JnLW9yYW5nZS00MDAvNTAnLFxuICAgICAgICAgIGNpdHlUaW50OiAnYnJpZ2h0bmVzcy0xMDAgY29udHJhc3QtMTA1IGh1ZS1yb3RhdGUtWy0xMGRlZ10nLFxuICAgICAgICAgIGFtYmllbnRMaWdodDogJ2Zyb20tYW1iZXItMTAwLzMwIHZpYS1vcmFuZ2UtNTAvMjAgdG8tdHJhbnNwYXJlbnQnLFxuICAgICAgICAgIHByaXNtT3BhY2l0eTogJ29wYWNpdHktOTAnXG4gICAgICAgIH07XG4gICAgICBjYXNlICd0d2lsaWdodCc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2t5R3JhZGllbnQ6ICdmcm9tLXNsYXRlLTgwMCB2aWEtaW5kaWdvLTkwMCB0by1za3ktOTUwJyxcbiAgICAgICAgICBzdW5HbG93OiAnYmctaW5kaWdvLTUwMC8zMCcsXG4gICAgICAgICAgY2l0eVRpbnQ6ICdicmlnaHRuZXNzLTc1IGNvbnRyYXN0LTEyNSBzYXR1cmF0ZS0xMjUnLFxuICAgICAgICAgIGFtYmllbnRMaWdodDogJ2Zyb20taW5kaWdvLTkwMC8yMCB2aWEtc2xhdGUtOTAwLzEwIHRvLXRyYW5zcGFyZW50JyxcbiAgICAgICAgICBwcmlzbU9wYWNpdHk6ICdvcGFjaXR5LTYwJ1xuICAgICAgICB9O1xuICAgICAgY2FzZSAnbm9vbic6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNreUdyYWRpZW50OiAnZnJvbS1za3ktMTAwIHZpYS1ibHVlLTUwIHRvLWluZGlnby0xMDAnLFxuICAgICAgICAgIHN1bkdsb3c6ICdiZy13aGl0ZS82MCcsXG4gICAgICAgICAgY2l0eVRpbnQ6ICdicmlnaHRuZXNzLTEwMCBjb250cmFzdC0xMDAnLFxuICAgICAgICAgIGFtYmllbnRMaWdodDogJ2Zyb20tc2t5LTUwLzMwIHZpYS13aGl0ZS8yMCB0by10cmFuc3BhcmVudCcsXG4gICAgICAgICAgcHJpc21PcGFjaXR5OiAnb3BhY2l0eS04MCdcbiAgICAgICAgfTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdGltZVRoZW1lID0gZ2V0VGltZVN0eWxlKCk7XG5cbiAgLy8gUGFyYWxsYXggT2Zmc2V0c1xuICAvLyAxLiBCYWNrZ3JvdW5kIG91dGRvb3Igc2t5bGluZSBzY3JvbGxzIGRvd24gc2xvd2VyIGluc2lkZSB3aW5kb3cgY2xpcHNcbiAgY29uc3QgYmFja2dyb3VuZFBhcmFsbGF4WSA9IHNjcm9sbFkgKiAwLjM1ICsgbW91c2VQb3MueSAqIDAuNTtcbiAgY29uc3QgYmFja2dyb3VuZFBhcmFsbGF4WCA9IG1vdXNlUG9zLnggKiAwLjg7XG5cbiAgLy8gMi4gRmxvYXRpbmcgaWNvbnMvcmVmcmFjdGlvbnMgbW92ZSBhdCBpbmRlcGVuZGVudCBsYXllciBzcGVlZHNcbiAgY29uc3QgZmxvYXRpbmdJY29uc1kxID0gc2Nyb2xsWSAqIC0wLjIyICsgbW91c2VQb3MueSAqIC0wLjg7XG4gIGNvbnN0IGZsb2F0aW5nSWNvbnNZMiA9IHNjcm9sbFkgKiAtMC4xNSArIG1vdXNlUG9zLnkgKiAwLjY7XG4gIGNvbnN0IGZsb2F0aW5nSWNvbnNZMyA9IHNjcm9sbFkgKiAtMC4zMiArIG1vdXNlUG9zLnkgKiAtMS4yO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtaW4taC1bMTQwdmhdIHctZnVsbCBvdmVyZmxvdy1oaWRkZW4gYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtODAwIHNlbGVjdC1ub25lXCI+XG4gICAgICBcbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICB7LyogMS4gT1BFTiBDRUlMSU5HIEFSQ0hJVEVDVFVSRSBMQVlFUiAoXCJaZGVqbWlqIHN1Zml0XCIpICAgICAgKi99XG4gICAgICB7LyogSGlnaCBnbGFzcyByb29mIHJpYnMsIHNreWxpZ2h0cywgc3RydWN0dXJhbCBzdGVlbCB0cnVzc2VzICovfVxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgaC02NCB6LTIwIHBvaW50ZXItZXZlbnRzLW5vbmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIHsvKiBPdmVyaGVhZCBTa3lsaWdodCBBcGVydHVyZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC14LTAgdG9wLTAgaC00OCBiZy1ncmFkaWVudC10by1iIGZyb20tc2t5LTIwMC80MCB2aWEtd2hpdGUvMTAgdG8tdHJhbnNwYXJlbnQgYmFja2Ryb3AtYmx1ci1bMnB4XVwiIC8+XG4gICAgICAgIFxuICAgICAgICB7LyogQXJjaGl0ZWN0dXJhbCBSb29mIFN0ZWVsICYgR2xhc3MgVHJ1c3NlcyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIHctZnVsbCBtYXgtdy03eGwgaC1mdWxsIGZsZXgganVzdGlmeS1hcm91bmQgb3BhY2l0eS0zMFwiPlxuICAgICAgICAgIHtbMSwgMiwgMywgNCwgNSwgNl0ubWFwKChpKSA9PiAoXG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBrZXk9e2l9IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgdy1weCBiZy1ncmFkaWVudC10by1iIGZyb20tc2xhdGUtMjAwIHZpYS1zbGF0ZS00MDAgdG8tdHJhbnNwYXJlbnQgc2hhZG93LXNtXCIgXG4gICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogYHJvdGF0ZSgkeyhpIC0gMy41KSAqIDh9ZGVnKWAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTb2Z0IE92ZXJoZWFkIFN1bmxpZ2h0IEJlYW1zIGZpbHRlcmluZyBpbnRvIHRoZSBvcGVuIGNsaW5pYyBoYWxsICovfVxuICAgICAgICA8ZGl2IFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMjAgbGVmdC0xLzQgdy05NiBoLVs2MDBweF0gYmctZ3JhZGllbnQtdG8tYiBmcm9tLXdoaXRlLzMwIHZpYS1jeWFuLTEwMC8xMCB0by10cmFuc3BhcmVudCBibHVyLTJ4bCB0cmFuc2Zvcm0gLXJvdGF0ZS0xMiBwb2ludGVyLWV2ZW50cy1ub25lIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTcwMFwiXG4gICAgICAgICAgc3R5bGU9e3sgb3BhY2l0eTogYWN0aXZlVGltZU9mRGF5ID09PSAndHdpbGlnaHQnID8gMC4xNSA6IDAuNiB9fVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IFxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMjAgcmlnaHQtMS80IHctOTYgaC1bNjAwcHhdIGJnLWdyYWRpZW50LXRvLWIgZnJvbS13aGl0ZS8zMCB2aWEtc2t5LTEwMC8xMCB0by10cmFuc3BhcmVudCBibHVyLTJ4bCB0cmFuc2Zvcm0gcm90YXRlLTEyIHBvaW50ZXItZXZlbnRzLW5vbmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwXCJcbiAgICAgICAgICBzdHlsZT17eyBvcGFjaXR5OiBhY3RpdmVUaW1lT2ZEYXkgPT09ICd0d2lsaWdodCcgPyAwLjE1IDogMC42IH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cblxuXG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgey8qIDIuIFNQQUNFRCBXSU5ET1dTIFdJVEggU0NST0xMIFBBUkFMTEFYIENJVFkgU0tZTElORSAgICAgICovfVxuICAgICAgey8qIFwiT2tuYSBuaWUgcG93aW5ueSBzacSZIHN0eWthxIcsIGFieSB1enlza2HEhyB3acSZa3N6xIUgcHJ6ZXN0cnplxYRcIiAqL31cbiAgICAgIHsvKiBcIk9icmF6IHBvd2luaWVuIHByemVzdXdhxIcgc2nEmSB0eWxrbyB6YSBva25hbWkuLi5cIiAgICAgICAgKi99XG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgaC1bMTIwdmhdIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgIFxuICAgICAgICB7LyogTWFpbiBBcmNoaXRlY3R1cmFsIFdpbmRvdyBHYWxsZXJ5IENvbnRhaW5lciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgbWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggcHQtMjggaC1mdWxsIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogSGVhZGVyIFR5cG9ncmFwaHkgb3ZlciBzcGFjZSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHotMzAgcHQtNCBwYi04IHNwYWNlLXktMiBtYXgtdy0zeGwgbXgtYXV0b1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy13aGl0ZS84MCBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzgwIHRleHQtc2t5LTkwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgc2hhZG93LXhzXCI+XG4gICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNreS02MDAgYW5pbWF0ZS1zcGluXCIgc3R5bGU9e3sgYW5pbWF0aW9uRHVyYXRpb246ICc2cycgfX0gLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnSW5ub3dhY3lqbmEgTWVkeWN5bmEgSnV0cmEnIDogJ1RvbW9ycm934oCZcyBQcmVjaXNpb24gTWVkaWNhbCBDYXJlJ308L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIE1haW4gVGl0bGUgYXMgZXhwbGljaXRseSByZXF1ZXN0ZWQ6IFwiTkVYVCBHRU5FUkFUSU9OIENMSU5JQ1wiICovfVxuICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtNHhsIHNtOnRleHQtNnhsIGZvbnQtYmxhY2sgdHJhY2tpbmctdGlnaHQgdGV4dC1zbGF0ZS05MDAgZm9udC1zYW5zIHVwcGVyY2FzZSBkcm9wLXNoYWRvdy14c1wiPlxuICAgICAgICAgICAgICBOZXh0IEdlbmVyYXRpb24gPHNwYW4gY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXNreS02MDAgdmlhLWluZGlnby02MDAgdG8tdGVhbC01MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnRcIj5DbGluaWM8L3NwYW4+XG4gICAgICAgICAgICA8L2gxPlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSB0ZXh0LXNsYXRlLTYwMCBmb250LW1lZGl1bSBtYXgtdy0yeGwgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyBcbiAgICAgICAgICAgICAgICA/ICdQcnplc3RyemXFhCB0YWt0eWxuYSBpIG90d2FydGEuIFBvem5haiBuYXN6ZSB3eXNwZWNqYWxpem93YW5lIHBvZHk6IHByb2t0b2xvZ2lhLCBjaGlydXJnaWEsIGZsZWJvbG9naWEgb3JheiBza2xlcCBtZWR5Y3pueS4nIFxuICAgICAgICAgICAgICAgIDogJ0EgYnJpZ2h0LCB0YWN0aWxlIHNwYWNlLiBFeHBsb3JlIG91ciBzcGVjaWFsaXplZCBwb2RzOiBwcm9jdG9sb2d5LCBzdXJnZXJ5LCBwaGxlYm9sb2d5LCBhbmQgbWVkaWNhbCBzaG9wLid9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogV0lORE9XIEZSQU1FUyAmIFBJTExBUlMgR1JJRCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXgtMSBncmlkIGdyaWQtY29scy0zIGdhcC02IHNtOmdhcC0xMiBtZDpnYXAtMTYgaXRlbXMtc3RyZXRjaCBteS00IHotMjBcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAge1sxLCAyLCAzXS5tYXAoKHdpbmRvd0luZGV4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAga2V5PXt3aW5kb3dJbmRleH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSByb3VuZGVkLTN4bCBib3JkZXItNCBib3JkZXItd2hpdGUvODAgc2hhZG93LTJ4bCBvdmVyZmxvdy1oaWRkZW4gYmctc2xhdGUtOTAwIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGdyb3VwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAyNXB4IDUwcHggLTEycHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgaW5zZXQgMCAwIDE1cHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpJ1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL31cbiAgICAgICAgICAgICAgICB7LyogUEFSQUxMQVggQ0lUWSBTS1lMSU5FIElOU0lERSBUSElTIFdJTkRPVyBGUkFNRSBPTkxZICovfVxuICAgICAgICAgICAgICAgIHsvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovfVxuICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLVsxNTAlXSAtdG9wLVsyNSVdIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTc1IGVhc2Utb3V0XCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7YmFja2dyb3VuZFBhcmFsbGF4WH1weCwgJHtiYWNrZ3JvdW5kUGFyYWxsYXhZfXB4LCAwcHgpYFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7LyogU2t5IEJhc2UgR3JhZGllbnQgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YGFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tYiAke3RpbWVUaGVtZS5za3lHcmFkaWVudH0gdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwYH0gLz5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIFN1biAvIExpZ2h0IFNvdXJjZSBkaXNrIGluc2lkZSB3aW5kb3cgc2t5ICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgdG9wLTEyIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgdy00OCBoLTQ4IHJvdW5kZWQtZnVsbCAke3RpbWVUaGVtZS5zdW5HbG93fSBibHVyLXhsYH0gXG4gICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICB7LyogU29mdCBEcmlmdGluZyBDbG91ZHMgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xNiBsZWZ0LTAgcmlnaHQtMCBoLTMyIGJnLXdoaXRlLzIwIGJsdXIteGwgcm91bmRlZC1mdWxsIHRyYW5zZm9ybSAtcm90YXRlLTMgYW5pbWF0ZS1wdWxzZVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBSZWFsaXN0aWMgUGFub3JhbWljIENpdHkgU2lsaG91ZXR0ZSBJbWFnZSBMYXllciAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgYm90dG9tLTAgbGVmdC0wIHJpZ2h0LTAgaC0yLzMgYmctY292ZXIgYmctYm90dG9tIG9wYWNpdHktODUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzAwICR7dGltZVRoZW1lLmNpdHlUaW50fWB9PlxuICAgICAgICAgICAgICAgICAgICA8aW1nIFxuICAgICAgICAgICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTE5NTAxMDI1MjY0LTY1YmExNWE4MjM5MD93PTE2MDAmYXV0bz1mb3JtYXQmZml0PWNyb3AmcT04MFwiIFxuICAgICAgICAgICAgICAgICAgICAgIGFsdD1cIlBhbm9yYW1hIG1pYXN0YVwiIFxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIG9iamVjdC1ib3R0b20gbWl4LWJsZW5kLW92ZXJsYXkgb3BhY2l0eS05MFwiXG4gICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFNvZnQgUHJpc20gU3BlY3RyYWwgUmVmbGVjdGlvbiBGbGFyZXMgaW5zaWRlIFdpbmRvdyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10ciBmcm9tLWN5YW4tMzAwLzEwIHZpYS1pbmRpZ28tMzAwLzEwIHRvLXBpbmstMzAwLzEwICR7dGltZVRoZW1lLnByaXNtT3BhY2l0eX0gbWl4LWJsZW5kLXNvZnQtbGlnaHRgfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFdpbmRvdyBBcmNoaXRlY3R1cmFsIEdsYXNzIFJlZmxlY3Rpb24gT3ZlcmxheSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctZ3JhZGllbnQtdG8tdHIgZnJvbS13aGl0ZS8yMCB2aWEtdHJhbnNwYXJlbnQgdG8td2hpdGUvMTAgcG9pbnRlci1ldmVudHMtbm9uZSB6LTEwXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgYm90dG9tLTAgdy0xMiBiZy13aGl0ZS8xMCBiYWNrZHJvcC1ibHVyLVsxcHhdIHRyYW5zZm9ybSBza2V3LXgtMTIgcG9pbnRlci1ldmVudHMtbm9uZSB6LTEwXCIgLz5cblxuICAgICAgICAgICAgICAgIHsvKiBTdWJ0bGUgV2luZG93IEZyYW1lIExhYmVsICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0yMCBwLTQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXN0IHB4LTIuNSBweS0xIHJvdW5kZWQtZnVsbCBiZy13aGl0ZS83MCBiYWNrZHJvcC1ibHVyLW1kIHRleHQtc2xhdGUtODAwIGJvcmRlciBib3JkZXItd2hpdGUvODAgc2hhZG93LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgIHt3aW5kb3dJbmRleCA9PT0gMSA/IChsYW5nID09PSAncGwnID8gJ1dpZG9rIFdzY2hvZG5pJyA6ICdFYXN0IFZpZXcnKSA6IHdpbmRvd0luZGV4ID09PSAyID8gKGxhbmcgPT09ICdwbCcgPyAnR8WCw7N3bmUgQXRyaXVtJyA6ICdDZW50cmFsIEF0cml1bScpIDogKGxhbmcgPT09ICdwbCcgPyAnV2lkb2sgWmFjaG9kbmknIDogJ1dlc3QgVmlldycpfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFN1YnRsZSBHbGFzcyBCb3R0b20gTGFiZWwgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTIwIHAtNCB0ZXh0LWNlbnRlciBtdC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtWzExcHhdIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNzAwIGJnLXdoaXRlLzYwIGJhY2tkcm9wLWJsdXItbWQgcHgtMyBweS0xIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci13aGl0ZS83MFwiPlxuICAgICAgICAgICAgICAgICAgICA8U3VuIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1za3ktNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnxZp3aWF0xYJvIG5hdHVyYWxuZSAxMDAlJyA6ICcxMDAlIE5hdHVyYWwgTGlnaHQnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5cblxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIHsvKiAzLiBJTkRFUEVOREVOVCBGTE9BVElORyBJQ09OUyAmIFBSSVNNIFJFRlJBQ1RJT05TICAgICAgICAgKi99XG4gICAgICB7LyogXCJJa29ueSByw7N3bmllxbwgcG93aW5ueSBwcnplc3V3YcSHIHNpxJkgbmllemFsZcW8bmllLi4uXCIgICAgICAqL31cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcG9pbnRlci1ldmVudHMtbm9uZSB6LTMwXCI+XG4gICAgICAgIFxuICAgICAgICB7LyogRmxvYXRpbmcgUHJpc20gQ3J5c3RhbCAxIChQcm9jdG9sb2d5IExhc2VyIFN5bWJvbCkgKi99XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEvMyBsZWZ0LVsxMiVdIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTEwMCBlYXNlLW91dCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTMgcm91bmRlZC0yeGwgYmctd2hpdGUvODAgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXNreS0yMDAvODAgc2hhZG93LWxnIHRleHQtc2t5LTYwMFwiXG4gICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwgJHtmbG9hdGluZ0ljb25zWTF9cHgsIDApYCB9fVxuICAgICAgICA+XG4gICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctNiBoLTYgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtaW5zZXQtMSByb3VuZGVkLTJ4bCBiZy1za3ktNDAwLzIwIGJsdXItbWQgLXotMTBcIiAvPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRmxvYXRpbmcgUHJpc20gQ3J5c3RhbCAyIChTdXJnZXJ5IFNoaWVsZCkgKi99XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEvNCBsZWZ0LVszOCVdIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTEwMCBlYXNlLW91dCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTMgcm91bmRlZC0yeGwgYmctd2hpdGUvODAgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXRlYWwtMjAwLzgwIHNoYWRvdy1sZyB0ZXh0LXRlYWwtNjAwXCJcbiAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke2Zsb2F0aW5nSWNvbnNZMn1weCwgMClgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtaW5zZXQtMSByb3VuZGVkLTJ4bCBiZy10ZWFsLTQwMC8yMCBibHVyLW1kIC16LTEwXCIgLz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZsb2F0aW5nIFByaXNtIENyeXN0YWwgMyAoUGhsZWJvbG9neSBWYXNjdWxhciBXYXZlKSAqL31cbiAgICAgICAgPGRpdiBcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS8zIHJpZ2h0LVszMiVdIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTEwMCBlYXNlLW91dCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTMgcm91bmRlZC0yeGwgYmctd2hpdGUvODAgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLWJsdWUtMjAwLzgwIHNoYWRvdy1sZyB0ZXh0LWJsdWUtNjAwXCJcbiAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke2Zsb2F0aW5nSWNvbnNZM31weCwgMClgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWluc2V0LTEgcm91bmRlZC0yeGwgYmctYmx1ZS00MDAvMjAgYmx1ci1tZCAtei0xMFwiIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGbG9hdGluZyBQcmlzbSBDcnlzdGFsIDQgKENsaW5pYyBTaG9wIEJhc2tldCkgKi99XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEvNCByaWdodC1bMTIlXSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0xMDAgZWFzZS1vdXQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0zIHJvdW5kZWQtMnhsIGJnLXdoaXRlLzgwIGJhY2tkcm9wLWJsdXItbWQgYm9yZGVyIGJvcmRlci1hbWJlci0yMDAvODAgc2hhZG93LWxnIHRleHQtYW1iZXItNjAwXCJcbiAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLCAke2Zsb2F0aW5nSWNvbnNZMSAqIDEuMn1weCwgMClgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtaW5zZXQtMSByb3VuZGVkLTJ4bCBiZy1hbWJlci00MDAvMjAgYmx1ci1tZCAtei0xMFwiIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTY2F0dGVyZWQgU29mdCBQcmlzbSBSYWluYm93IFJlZnJhY3Rpb24gUmF5cyBhY3Jvc3MgdGhlIHJvb20gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEvMiBsZWZ0LTEwIHctNzIgaC03MiByb3VuZGVkLWZ1bGwgYmctZ3JhZGllbnQtdG8tdHIgZnJvbS1za3ktMzAwLzEwIHZpYS10ZWFsLTMwMC8xNSB0by1pbmRpZ28tMzAwLzEwIGJsdXItM3hsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yLzMgcmlnaHQtMTAgdy04MCBoLTgwIHJvdW5kZWQtZnVsbCBiZy1ncmFkaWVudC10by10ciBmcm9tLWFtYmVyLTIwMC8xNSB2aWEtcm9zZS0zMDAvMTAgdG8tc2t5LTMwMC8xMCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgPC9kaXY+XG5cblxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIHsvKiA0LiBUQUNUSUxFIEZMT09SICYgSU5URVJBQ1RJVkUgUEVERVNUQUxTIChUQUJMRVMpIFNFQ1RJT04gKi99XG4gICAgICB7LyogUHJvY3RvbG9neSwgU3VyZ2VyeSwgUGhsZWJvbG9neSwgYW5kIFNob3AgU3RvcmUgRW50cmFuY2UgICovfVxuICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei00MCBiZy1ncmFkaWVudC10by1iIGZyb20tdHJhbnNwYXJlbnQgdmlhLXNsYXRlLTEwMC85MCB0by1zbGF0ZS0xMDAgcGItMjAgcHQtMTAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMC82MCBiYWNrZHJvcC1ibHVyLXhzXCI+XG4gICAgICAgIFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04XCI+XG4gICAgICAgICAgXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYi0xMCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCBmb250LWV4dHJhYm9sZCB0ZXh0LXNsYXRlLTkwMCBmb250LXNhbnMgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUG9kZXN0eSBTcGVjamFsaXN0eWN6bmUgJiBTa2xlcCcgOiAnU3BlY2lhbGl6ZWQgUGVkZXN0YWxzICYgU3RvcmUnfVxuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS02MDAgbWF4LXcteGwgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJ1xuICAgICAgICAgICAgICAgID8gJ1d5YmllcnogcG9kZXN0IG5hIHNhbGksIGFieSBwcnplasWbxIcgZG8gd3licmFuZWogZHppZWR6aW55IG1lZHljem5laiBsdWIgd2VqxZvEhyBkbyBza2xlcHUgY2xpbmljIHNob3AuJ1xuICAgICAgICAgICAgICAgIDogJ1NlbGVjdCBhIHBlZGVzdGFsIGluIHRoZSBoYWxsIHRvIGVudGVyIHlvdXIgcHJlZmVycmVkIG1lZGljYWwgZmllbGQgb3IgdmlzaXQgdGhlIGNsaW5pYyBzaG9wLid9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogNCBJTlRFUkFDVElWRSBQRURFU1RBTFMgKFRBQkxFUykgR1JJRCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTYgbGc6Z2FwLThcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAge2RlcGFydG1lbnRzLm1hcCgoZGVwdCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWREZXB0SWQgPT09IGRlcHQuaWQ7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICBjb25zdCByZW5kZXJJY29uID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoZGVwdC5pZCkge1xuICAgICAgICAgICAgICAgICAgY2FzZSAncHJvY3RvbG9neSc6IHJldHVybiA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LXNreS02MDBcIiAvPjtcbiAgICAgICAgICAgICAgICAgIGNhc2UgJ3N1cmdlcnknOiByZXR1cm4gPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC10ZWFsLTYwMFwiIC8+O1xuICAgICAgICAgICAgICAgICAgY2FzZSAncGhsZWJvbG9neSc6IHJldHVybiA8WmFwIGNsYXNzTmFtZT1cInctOCBoLTggdGV4dC1ibHVlLTYwMFwiIC8+O1xuICAgICAgICAgICAgICAgICAgY2FzZSAnc2hvcCc6IHJldHVybiA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LWFtYmVyLTYwMFwiIC8+O1xuICAgICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtaW5kaWdvLTYwMFwiIC8+O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGtleT17ZGVwdC5pZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0RGVwYXJ0bWVudChkZXB0LmlkKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGdyb3VwIHJlbGF0aXZlIHJvdW5kZWQtM3hsIHAtNiB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgY3Vyc29yLXBvaW50ZXIgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gJHtcbiAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCBcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZSByaW5nLTQgcmluZy1za3ktNTAwLzMwIHNoYWRvdy0yeGwgc2NhbGUtWzEuMDNdIGJvcmRlci0yIGJvcmRlci1za3ktNDAwJyBcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZS85MCBob3ZlcjpiZy13aGl0ZSBob3ZlcjpzaGFkb3cteGwgaG92ZXI6LXRyYW5zbGF0ZS15LTEuNSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC84MCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIFRvcCBCYWRnZSAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTZcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgYmctc2xhdGUtMTAwIHRleHQtc2xhdGUtNzAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2RlcHQuYmFkZ2V9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctc2xhdGUtNTAgZ3JvdXAtaG92ZXI6Ymctc2t5LTUwIHRyYW5zaXRpb24tY29sb3JzIHRleHQtc2xhdGUtNDAwIGdyb3VwLWhvdmVyOnRleHQtc2t5LTYwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1VwUmlnaHQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogM0QgVmlzdWFsIFBlZGVzdGFsIC8gVGFibGUgSWxsdXN0cmF0aW9uICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBweS04IGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHsvKiBGbG9hdGluZyBIb2xvZ3JhcGhpYyBJY29uIG9uIFBlZGVzdGFsICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgdy0xNiBoLTE2IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXRyIGZyb20tc2xhdGUtNTAgdG8td2hpdGUgc2hhZG93LWxnIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzgwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdyb3VwLWhvdmVyOnNjYWxlLTExMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVySWNvbigpfVxuICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBQcmlzbSBMaWdodCBCZWFtIEVtaXNzaW9uIGZyb20gUGVkZXN0YWwgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSAtaW5zZXQtMiByb3VuZGVkLTN4bCBiZy1ncmFkaWVudC10by1yICR7ZGVwdC5hY2NlbnRDb2xvcn0gb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMjUgYmx1ci1sZyB0cmFuc2l0aW9uLW9wYWNpdHkgZHVyYXRpb24tMzAwIC16LTEwYH0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFBIWVNJQ0FMIFBFREVTVEFMIC8gVEFCTEUgU1RBTkQgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgbXQtMyB3LTI4IGgtOCByb3VuZGVkLWZ1bGwgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXNsYXRlLTIwMCB2aWEtc2xhdGUtMzAwIHRvLXNsYXRlLTQwMC84MCBzaGFkb3ctbWQgYm9yZGVyLXQgYm9yZGVyLXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIwIGgtMiByb3VuZGVkLWZ1bGwgYmctd2hpdGUvNjAgYmx1ci1bMXB4XVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7LyogUGVkZXN0YWwgU2hhZG93IG9uIEZsb29yICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMzIgaC0zIHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS05MDAvMTAgYmx1ci1zbSBtdC0xXCIgLz5cblxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBEZXBhcnRtZW50IENvbnRlbnQgSW5mbyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS0xMDAgdGV4dC1sZWZ0IHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBncm91cC1ob3Zlcjp0ZXh0LXNreS03MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/IGRlcHQubmFtZVBsIDogZGVwdC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGxpbmUtY2xhbXAtMiBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7ZGVwdC5zaG9ydERlc2N9XG4gICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogQWN0aW9uIENUQSBUYWcgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgcHQtMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2t5LTcwMCBncm91cC1ob3Zlcjp0cmFuc2xhdGUteC0xIHRyYW5zaXRpb24tdHJhbnNmb3JtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntkZXB0LmlkID09PSAnc2hvcCcgPyAobGFuZyA9PT0gJ3BsJyA/ICdPdHfDs3J6IFNrbGVwJyA6ICdPcGVuIFN0b3JlJykgOiAobGFuZyA9PT0gJ3BsJyA/ICdQb3puYWogU3pjemVnw7PFgnknIDogJ0V4cGxvcmUgRGl2aXNpb24nKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGRcIj7ihpI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG5c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