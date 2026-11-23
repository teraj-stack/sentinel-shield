import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { ShoppingBag, Menu, X, Sparkles, ShieldCheck, Phone, Boxes, Eye, Palette, Sun, Moon } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
export const Header = ({
  cartCount,
  onOpenCart,
  onOpenAudit,
  onOpenAi,
  onOpenInventory,
  isHighContrast = false,
  onToggleHighContrast,
  onOpenThemeStudio,
  activeTheme = "midnight",
  onToggleLightDark,
  crystalCount = 0
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [
    { href: "#o-mnie", label: "O mnie" },
    { href: "#objawy", label: "Objawy" },
    { href: "#akademia-pacjenta", label: "Pierwsza Wizyta", badge: "💎 Gra & Rabat" },
    { href: "#leczenie", label: "Leczenie Laserowe" },
    { href: "#historie-pacjentow", label: "Historie Sukcesu", badge: "Wideo & AI" },
    { href: "#sklep-medyczny", label: "Sklep & E-Usługi", badge: "E-Sklep" },
    { href: "#opinie", label: "Opinie" },
    { href: "#humor-proktologiczny", label: "Humor z Gabinetu", badge: "Żarty" },
    { href: "#faq", label: "FAQ" },
    { href: "#kontakt", label: "Kontakt" }
  ];
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(
      "header",
      {
        id: "header",
        className: `fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? "bg-slate-950/90 backdrop-blur-md border-white/10 shadow-2xl py-3" : "bg-transparent border-transparent py-4"}`,
        children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: "#",
              id: "brand-logo",
              className: "flex items-center gap-2 text-white no-underline group focus:outline-none",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center font-serif text-xl font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform", children: "CML" }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 78,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-serif text-lg font-bold tracking-tight text-slate-100 group-hover:text-indigo-300 transition-colors", children: "Dr Jan Bujok" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 82,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400 font-medium tracking-wide uppercase", children: "Centrum Medycyny Laserowej" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 85,
                    columnNumber: 15
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 81,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 73,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("nav", { className: "hidden lg:flex items-center gap-6", children: navLinks.map((link) => /* @__PURE__ */ jsxDEV(
            "a",
            {
              href: link.href,
              className: "text-xs font-medium text-slate-300 hover:text-indigo-300 transition-colors relative py-1",
              children: [
                link.label,
                link.badge && /* @__PURE__ */ jsxDEV("span", { className: "ml-1.5 px-1.5 py-0.5 text-[9px] font-semibold bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30", children: link.badge }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 101,
                  columnNumber: 19
                }, this)
              ]
            },
            link.href,
            true,
            {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 94,
              columnNumber: 15
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/Header.tsx",
            lineNumber: 92,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: "#mikro-edukacja-laserowa",
                id: "crystal-health-header-badge",
                className: "inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-amber-300 bg-gradient-to-r from-amber-950/80 via-slate-900 to-purple-950/80 border border-amber-500/40 rounded-full transition-all shadow-md hover:scale-105 no-underline",
                title: "Kryształy CrystalHealth - Edukacja Pacjenta i Rabat -150 PLN",
                children: [
                  /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-amber-400 animate-pulse" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 118,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono font-extrabold text-amber-200", children: [
                      "💎 ",
                      crystalCount,
                      "/5"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/Header.tsx",
                      lineNumber: 120,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "hidden sm:block w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-amber-500/30", children: /* @__PURE__ */ jsxDEV(
                      "div",
                      {
                        className: "h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-500",
                        style: { width: `${crystalCount / 5 * 100}%` }
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/Header.tsx",
                        lineNumber: 122,
                        columnNumber: 19
                      },
                      this
                    ) }, void 0, false, {
                      fileName: "/app/applet/src/components/Header.tsx",
                      lineNumber: 121,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 119,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 112,
                columnNumber: 13
              },
              this
            ),
            onToggleLightDark && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onToggleLightDark,
                id: "light-dark-toggle-btn",
                className: `inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all focus:outline-none border ${activeTheme === "light" ? "bg-amber-100 text-amber-900 border-amber-300 shadow-md font-bold" : "bg-slate-900/80 text-slate-200 border-slate-700 hover:border-purple-400"}`,
                title: "Szybkie przełączanie: Jasne / Ciemne Tło",
                "aria-label": "Przełącz motyw Jasne lub Ciemne Tło",
                children: activeTheme === "light" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(Moon, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 145,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Ciemne Tło" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 146,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 144,
                  columnNumber: 19
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(Sun, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 150,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Jasne Tło" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 151,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 149,
                  columnNumber: 19
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 132,
                columnNumber: 15
              },
              this
            ),
            onOpenThemeStudio && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenThemeStudio,
                id: "theme-studio-btn",
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-200 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 hover:from-purple-800 hover:to-indigo-800 border border-purple-400/40 rounded-full transition-all shadow-md focus:outline-none",
                title: "Studio Nakładek Tematycznych, Odcieni i Przycisków 3D",
                children: [
                  /* @__PURE__ */ jsxDEV(Palette, { className: "w-3.5 h-3.5 text-purple-300" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 165,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden lg:inline", children: "Nakładki 3D" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 166,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 159,
                columnNumber: 15
              },
              this
            ),
            onToggleHighContrast && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onToggleHighContrast,
                id: "high-contrast-toggle-btn",
                className: `inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full transition-all focus:outline-none border ${isHighContrast ? "bg-yellow-400 text-black border-yellow-300 shadow-lg shadow-yellow-400/40 font-bold" : "bg-slate-900/80 text-amber-300 hover:text-white border border-amber-500/30 hover:border-amber-400"}`,
                title: "Włącz/Wyłącz tryb wysokiego kontrastu (WCAG 2.1 dla niedowidzących)",
                "aria-label": "Włącz lub wyłącz tryb wysokiego kontrastu",
                children: [
                  /* @__PURE__ */ jsxDEV(Eye, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 183,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden md:inline", children: isHighContrast ? "Wysoki Kontrast: WŁ" : "Kontrast (WCAG)" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 184,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 172,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenAi,
                id: "ai-assistant-btn",
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-purple-200 bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 hover:border-purple-400 rounded-full transition-all shadow-sm focus:outline-none",
                title: "Konsultacja AI & Asystent z trybem wysokiego myślenia",
                children: [
                  /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-purple-400 animate-pulse" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 197,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Asystent AI" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 198,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 191,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenAudit,
                id: "seo-audit-btn",
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-teal-200 bg-teal-950/40 hover:bg-teal-900/60 border border-teal-500/30 hover:border-teal-400 rounded-full transition-all shadow-sm focus:outline-none",
                title: "Audytor SEO, nagłówków H1-H6 i responsywności",
                children: [
                  /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-teal-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 208,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Audytor SEO/H1" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 209,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 202,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenInventory,
                id: "inventory-admin-btn",
                className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-200 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 hover:border-indigo-400 rounded-full transition-all shadow-sm focus:outline-none",
                title: "Zarządzanie magazynem i sklepem (Admin)",
                children: [
                  /* @__PURE__ */ jsxDEV(Boxes, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 219,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden xl:inline", children: "Magazyn" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 220,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 213,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: onOpenCart,
                id: "shopping-cart-btn",
                className: "relative p-2 text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-700/60 rounded-xl transition-all focus:outline-none",
                "aria-label": "Koszyk medyczny",
                title: "Koszyk e-sklepu i konsultacji",
                children: [
                  /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 231,
                    columnNumber: 15
                  }, this),
                  cartCount > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1.5 -right-1.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-slate-950", children: cartCount }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 233,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 224,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: "tel:+48510432361",
                id: "header-phone-cta",
                className: "hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20 border border-indigo-400/30 transition-all hover:scale-[1.02] active:scale-95 no-underline",
                children: [
                  /* @__PURE__ */ jsxDEV(Phone, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 245,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "+48 510 432 361" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 246,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 240,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
                id: "mobile-menu-toggle",
                className: "lg:hidden p-2 text-slate-300 hover:text-white bg-slate-900/60 rounded-xl border border-slate-800 focus:outline-none",
                "aria-label": "Otwórz menu nawigacji",
                children: isMobileMenuOpen ? /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 256,
                  columnNumber: 35
                }, this) : /* @__PURE__ */ jsxDEV(Menu, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/components/Header.tsx",
                  lineNumber: 256,
                  columnNumber: 63
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 250,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Header.tsx",
            lineNumber: 110,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Header.tsx",
          lineNumber: 71,
          columnNumber: 9
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/Header.tsx",
        lineNumber: 63,
        columnNumber: 7
      },
      this
    ),
    isMobileMenuOpen && /* @__PURE__ */ jsxDEV(
      "div",
      {
        id: "mobile-nav-drawer",
        className: "fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-24 pb-8 px-6 flex flex-col justify-between lg:hidden overflow-y-auto",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4", children: [
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold tracking-wider text-indigo-400 uppercase", children: "Menu Kliniki CML" }, void 0, false, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 269,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2", children: navLinks.map((link) => /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: link.href,
                onClick: () => setIsMobileMenuOpen(false),
                className: "py-2.5 text-base font-medium text-slate-200 hover:text-indigo-300 border-b border-slate-900 flex items-center justify-between",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: link.label }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 280,
                    columnNumber: 19
                  }, this),
                  link.badge && /* @__PURE__ */ jsxDEV("span", { className: "text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-sans", children: link.badge }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 282,
                    columnNumber: 21
                  }, this)
                ]
              },
              link.href,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 274,
                columnNumber: 17
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/Header.tsx",
              lineNumber: 272,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Header.tsx",
            lineNumber: 268,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-3 pt-6 border-t border-slate-900", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  setIsMobileMenuOpen(false);
                  onOpenAi();
                },
                className: "w-full py-3 px-4 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-200 font-medium text-sm flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 299,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Zadaj pytanie Asystentowi AI" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 300,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 292,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  setIsMobileMenuOpen(false);
                  onOpenAudit();
                },
                className: "w-full py-3 px-4 rounded-xl bg-teal-950/60 border border-teal-500/40 text-teal-200 font-medium text-sm flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-teal-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 310,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Sprawdź SEO i Nagłówki H1-H6" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 311,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 303,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "a",
              {
                href: "tel:+48510432361",
                className: "w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold text-center text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2",
                children: [
                  /* @__PURE__ */ jsxDEV(Phone, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 318,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Zadzwoń: +48 510 432 361" }, void 0, false, {
                    fileName: "/app/applet/src/components/Header.tsx",
                    lineNumber: 319,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/Header.tsx",
                lineNumber: 314,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Header.tsx",
            lineNumber: 291,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/Header.tsx",
        lineNumber: 264,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Header.tsx",
    lineNumber: 62,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBTaG9wcGluZ0JhZywgTWVudSwgWCwgU3BhcmtsZXMsIFNlYXJjaCwgU2hpZWxkQ2hlY2ssIFBob25lLCBCb3hlcywgRXllLCBQYWxldHRlLCBTdW4sIE1vb24gfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgVGhlbWVJZCB9IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIEhlYWRlclByb3BzIHtcbiAgY2FydENvdW50OiBudW1iZXI7XG4gIG9uT3BlbkNhcnQ6ICgpID0+IHZvaWQ7XG4gIG9uT3BlbkF1ZGl0OiAoKSA9PiB2b2lkO1xuICBvbk9wZW5BaTogKCkgPT4gdm9pZDtcbiAgb25PcGVuSW52ZW50b3J5OiAoKSA9PiB2b2lkO1xuICBpc0hpZ2hDb250cmFzdD86IGJvb2xlYW47XG4gIG9uVG9nZ2xlSGlnaENvbnRyYXN0PzogKCkgPT4gdm9pZDtcbiAgb25PcGVuVGhlbWVTdHVkaW8/OiAoKSA9PiB2b2lkO1xuICBhY3RpdmVUaGVtZT86IFRoZW1lSWQ7XG4gIG9uVG9nZ2xlTGlnaHREYXJrPzogKCkgPT4gdm9pZDtcbiAgY3J5c3RhbENvdW50PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgSGVhZGVyOiBSZWFjdC5GQzxIZWFkZXJQcm9wcz4gPSAoe1xuICBjYXJ0Q291bnQsXG4gIG9uT3BlbkNhcnQsXG4gIG9uT3BlbkF1ZGl0LFxuICBvbk9wZW5BaSxcbiAgb25PcGVuSW52ZW50b3J5LFxuICBpc0hpZ2hDb250cmFzdCA9IGZhbHNlLFxuICBvblRvZ2dsZUhpZ2hDb250cmFzdCxcbiAgb25PcGVuVGhlbWVTdHVkaW8sXG4gIGFjdGl2ZVRoZW1lID0gJ21pZG5pZ2h0JyxcbiAgb25Ub2dnbGVMaWdodERhcmssXG4gIGNyeXN0YWxDb3VudCA9IDAsXG59KSA9PiB7XG4gIGNvbnN0IFtpc1Njcm9sbGVkLCBzZXRJc1Njcm9sbGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzTW9iaWxlTWVudU9wZW4sIHNldElzTW9iaWxlTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5zY3JvbGxZID4gNDApIHtcbiAgICAgICAgc2V0SXNTY3JvbGxlZCh0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldElzU2Nyb2xsZWQoZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGhhbmRsZVNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIGhhbmRsZVNjcm9sbCgpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgaGFuZGxlU2Nyb2xsKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG5hdkxpbmtzID0gW1xuICAgIHsgaHJlZjogJyNvLW1uaWUnLCBsYWJlbDogJ08gbW5pZScgfSxcbiAgICB7IGhyZWY6ICcjb2JqYXd5JywgbGFiZWw6ICdPYmphd3knIH0sXG4gICAgeyBocmVmOiAnI2FrYWRlbWlhLXBhY2plbnRhJywgbGFiZWw6ICdQaWVyd3N6YSBXaXp5dGEnLCBiYWRnZTogJ/Cfko4gR3JhICYgUmFiYXQnIH0sXG4gICAgeyBocmVmOiAnI2xlY3plbmllJywgbGFiZWw6ICdMZWN6ZW5pZSBMYXNlcm93ZScgfSxcbiAgICB7IGhyZWY6ICcjaGlzdG9yaWUtcGFjamVudG93JywgbGFiZWw6ICdIaXN0b3JpZSBTdWtjZXN1JywgYmFkZ2U6ICdXaWRlbyAmIEFJJyB9LFxuICAgIHsgaHJlZjogJyNza2xlcC1tZWR5Y3pueScsIGxhYmVsOiAnU2tsZXAgJiBFLVVzxYJ1Z2knLCBiYWRnZTogJ0UtU2tsZXAnIH0sXG4gICAgeyBocmVmOiAnI29waW5pZScsIGxhYmVsOiAnT3BpbmllJyB9LFxuICAgIHsgaHJlZjogJyNodW1vci1wcm9rdG9sb2dpY3pueScsIGxhYmVsOiAnSHVtb3IgeiBHYWJpbmV0dScsIGJhZGdlOiAnxbthcnR5JyB9LFxuICAgIHsgaHJlZjogJyNmYXEnLCBsYWJlbDogJ0ZBUScgfSxcbiAgICB7IGhyZWY6ICcja29udGFrdCcsIGxhYmVsOiAnS29udGFrdCcgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8aGVhZGVyXG4gICAgICAgIGlkPVwiaGVhZGVyXCJcbiAgICAgICAgY2xhc3NOYW1lPXtgZml4ZWQgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgei01MCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgYm9yZGVyLWIgJHtcbiAgICAgICAgICBpc1Njcm9sbGVkXG4gICAgICAgICAgICA/ICdiZy1zbGF0ZS05NTAvOTAgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXItd2hpdGUvMTAgc2hhZG93LTJ4bCBweS0zJ1xuICAgICAgICAgICAgOiAnYmctdHJhbnNwYXJlbnQgYm9yZGVyLXRyYW5zcGFyZW50IHB5LTQnXG4gICAgICAgIH1gfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIHsvKiBMb2dvICovfVxuICAgICAgICAgIDxhXG4gICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICBpZD1cImJyYW5kLWxvZ29cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC13aGl0ZSBuby11bmRlcmxpbmUgZ3JvdXAgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20taW5kaWdvLTUwMCB2aWEtcHVycGxlLTYwMCB0by1waW5rLTUwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LXNlcmlmIHRleHQteGwgZm9udC1ib2xkIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1pbmRpZ28tNTAwLzIwIGdyb3VwLWhvdmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLXRyYW5zZm9ybVwiPlxuICAgICAgICAgICAgICBDTUxcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VyaWYgdGV4dC1sZyBmb250LWJvbGQgdHJhY2tpbmctdGlnaHQgdGV4dC1zbGF0ZS0xMDAgZ3JvdXAtaG92ZXI6dGV4dC1pbmRpZ28tMzAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgRHIgSmFuIEJ1am9rXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tZWRpdW0gdHJhY2tpbmctd2lkZSB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICBDZW50cnVtIE1lZHljeW55IExhc2Vyb3dlalxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICB7LyogRGVza3RvcCBOYXZpZ2F0aW9uICovfVxuICAgICAgICAgIDxuYXYgY2xhc3NOYW1lPVwiaGlkZGVuIGxnOmZsZXggaXRlbXMtY2VudGVyIGdhcC02XCI+XG4gICAgICAgICAgICB7bmF2TGlua3MubWFwKChsaW5rKSA9PiAoXG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAga2V5PXtsaW5rLmhyZWZ9XG4gICAgICAgICAgICAgICAgaHJlZj17bGluay5ocmVmfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC1pbmRpZ28tMzAwIHRyYW5zaXRpb24tY29sb3JzIHJlbGF0aXZlIHB5LTFcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2xpbmsubGFiZWx9XG4gICAgICAgICAgICAgICAge2xpbmsuYmFkZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWwtMS41IHB4LTEuNSBweS0wLjUgdGV4dC1bOXB4XSBmb250LXNlbWlib2xkIGJnLWluZGlnby01MDAvMjAgdGV4dC1pbmRpZ28tMzAwIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzBcIj5cbiAgICAgICAgICAgICAgICAgICAge2xpbmsuYmFkZ2V9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgICB7LyogQWN0aW9uIEJ1dHRvbnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICB7LyogQ3J5c3RhbEhlYWx0aCBQcm9ncmVzcyBCYWRnZSBCdXR0b24gKi99XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBocmVmPVwiI21pa3JvLWVkdWthY2phLWxhc2Vyb3dhXCJcbiAgICAgICAgICAgICAgaWQ9XCJjcnlzdGFsLWhlYWx0aC1oZWFkZXItYmFkZ2VcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LWJvbGQgdGV4dC1hbWJlci0zMDAgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTk1MC84MCB2aWEtc2xhdGUtOTAwIHRvLXB1cnBsZS05NTAvODAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1tZCBob3ZlcjpzY2FsZS0xMDUgbm8tdW5kZXJsaW5lXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJLcnlzenRhxYJ5IENyeXN0YWxIZWFsdGggLSBFZHVrYWNqYSBQYWNqZW50YSBpIFJhYmF0IC0xNTAgUExOXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1leHRyYWJvbGQgdGV4dC1hbWJlci0yMDBcIj7wn5KOIHtjcnlzdGFsQ291bnR9LzU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaWRkZW4gc206YmxvY2sgdy0xMiBoLTEuNSBiZy1zbGF0ZS04MDAgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTQwMCB0by1hbWJlci0yMDAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAkeyhjcnlzdGFsQ291bnQgLyA1KSAqIDEwMH0lYCB9fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICAgIHsvKiBRdWljayBMaWdodCAvIERhcmsgQmFja2dyb3VuZCBUb2dnbGUgKi99XG4gICAgICAgICAgICB7b25Ub2dnbGVMaWdodERhcmsgJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25Ub2dnbGVMaWdodERhcmt9XG4gICAgICAgICAgICAgICAgaWQ9XCJsaWdodC1kYXJrLXRvZ2dsZS1idG5cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZm9jdXM6b3V0bGluZS1ub25lIGJvcmRlciAke1xuICAgICAgICAgICAgICAgICAgYWN0aXZlVGhlbWUgPT09ICdsaWdodCdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItMTAwIHRleHQtYW1iZXItOTAwIGJvcmRlci1hbWJlci0zMDAgc2hhZG93LW1kIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzgwIHRleHQtc2xhdGUtMjAwIGJvcmRlci1zbGF0ZS03MDAgaG92ZXI6Ym9yZGVyLXB1cnBsZS00MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJTenlia2llIHByemXFgsSFY3phbmllOiBKYXNuZSAvIENpZW1uZSBUxYJvXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiUHJ6ZcWCxIVjeiBtb3R5dyBKYXNuZSBsdWIgQ2llbW5lIFTFgm9cIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2FjdGl2ZVRoZW1lID09PSAnbGlnaHQnID8gKFxuICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgPE1vb24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmlubGluZVwiPkNpZW1uZSBUxYJvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxTdW4gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCI+SmFzbmUgVMWCbzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIFRoZW1lIFN0dWRpbyAzRCBCdXR0b24gKi99XG4gICAgICAgICAgICB7b25PcGVuVGhlbWVTdHVkaW8gJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17b25PcGVuVGhlbWVTdHVkaW99XG4gICAgICAgICAgICAgICAgaWQ9XCJ0aGVtZS1zdHVkaW8tYnRuXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1wdXJwbGUtMjAwIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtOTAwLzYwIHRvLWluZGlnby05MDAvNjAgaG92ZXI6ZnJvbS1wdXJwbGUtODAwIGhvdmVyOnRvLWluZGlnby04MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzQwIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbWQgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIlN0dWRpbyBOYWvFgmFkZWsgVGVtYXR5Y3pueWNoLCBPZGNpZW5pIGkgUHJ6eWNpc2vDs3cgM0RcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFBhbGV0dGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtMzAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gbGc6aW5saW5lXCI+TmFrxYJhZGtpIDNEPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgIHsvKiBIaWdoIENvbnRyYXN0IEFjY2Vzc2liaWxpdHkgTW9kZSBUb2dnbGUgQnV0dG9uICovfVxuICAgICAgICAgICAge29uVG9nZ2xlSGlnaENvbnRyYXN0ICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e29uVG9nZ2xlSGlnaENvbnRyYXN0fVxuICAgICAgICAgICAgICAgIGlkPVwiaGlnaC1jb250cmFzdC10b2dnbGUtYnRuXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIGZvY3VzOm91dGxpbmUtbm9uZSBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgIGlzSGlnaENvbnRyYXN0XG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXllbGxvdy00MDAgdGV4dC1ibGFjayBib3JkZXIteWVsbG93LTMwMCBzaGFkb3ctbGcgc2hhZG93LXllbGxvdy00MDAvNDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvODAgdGV4dC1hbWJlci0zMDAgaG92ZXI6dGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCBob3Zlcjpib3JkZXItYW1iZXItNDAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgIHRpdGxlPVwiV8WCxIVjei9XecWCxIVjeiB0cnliIHd5c29raWVnbyBrb250cmFzdHUgKFdDQUcgMi4xIGRsYSBuaWVkb3dpZHrEhWN5Y2gpXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiV8WCxIVjeiBsdWIgd3nFgsSFY3ogdHJ5YiB3eXNva2llZ28ga29udHJhc3R1XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxFeWUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBtZDppbmxpbmVcIj5cbiAgICAgICAgICAgICAgICAgIHtpc0hpZ2hDb250cmFzdCA/ICdXeXNva2kgS29udHJhc3Q6IFfFgScgOiAnS29udHJhc3QgKFdDQUcpJ31cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIEFJIEFzc2lzdGFudCBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkFpfVxuICAgICAgICAgICAgICBpZD1cImFpLWFzc2lzdGFudC1idG5cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtcHVycGxlLTIwMCBiZy1wdXJwbGUtOTUwLzQwIGhvdmVyOmJnLXB1cnBsZS05MDAvNjAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIGhvdmVyOmJvcmRlci1wdXJwbGUtNDAwIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc20gZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJLb25zdWx0YWNqYSBBSSAmIEFzeXN0ZW50IHogdHJ5YmVtIHd5c29raWVnbyBtecWbbGVuaWFcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lXCI+QXN5c3RlbnQgQUk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFNFTyAmIEhlYWRpbmcgQXVkaXRvciBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkF1ZGl0fVxuICAgICAgICAgICAgICBpZD1cInNlby1hdWRpdC1idG5cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtdGVhbC0yMDAgYmctdGVhbC05NTAvNDAgaG92ZXI6YmctdGVhbC05MDAvNjAgYm9yZGVyIGJvcmRlci10ZWFsLTUwMC8zMCBob3Zlcjpib3JkZXItdGVhbC00MDAgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zbSBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICB0aXRsZT1cIkF1ZHl0b3IgU0VPLCBuYWfFgsOzd2vDs3cgSDEtSDYgaSByZXNwb25zeXdub8WbY2lcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC10ZWFsLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj5BdWR5dG9yIFNFTy9IMTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogSW52ZW50b3J5IC8gU3RvcmUgTWFuYWdlbWVudCBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkludmVudG9yeX1cbiAgICAgICAgICAgICAgaWQ9XCJpbnZlbnRvcnktYWRtaW4tYnRuXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgcHgtMyBweS0xLjUgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWluZGlnby0yMDAgYmctaW5kaWdvLTk1MC80MCBob3ZlcjpiZy1pbmRpZ28tOTAwLzYwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMCBob3Zlcjpib3JkZXItaW5kaWdvLTQwMCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtIGZvY3VzOm91dGxpbmUtbm9uZVwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiWmFyesSFZHphbmllIG1hZ2F6eW5lbSBpIHNrbGVwZW0gKEFkbWluKVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxCb3hlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4geGw6aW5saW5lXCI+TWFnYXp5bjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogU2hvcHBpbmcgQ2FydCBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkNhcnR9XG4gICAgICAgICAgICAgIGlkPVwic2hvcHBpbmctY2FydC1idG5cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBwLTIgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1zbGF0ZS05MDAvNjAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzYwIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgZm9jdXM6b3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIktvc3p5ayBtZWR5Y3pueVwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiS29zenlrIGUtc2tsZXB1IGkga29uc3VsdGFjamlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIHtjYXJ0Q291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEuNSAtcmlnaHQtMS41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1waW5rLTUwMCB0by1yb3NlLTUwMCB0ZXh0LXdoaXRlIHRleHQtWzEwcHhdIGZvbnQtYm9sZCB3LTUgaC01IHJvdW5kZWQtZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS05NTBcIj5cbiAgICAgICAgICAgICAgICAgIHtjYXJ0Q291bnR9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBCb29rIEFwcG9pbnRtZW50IENUQSBCdXR0b24gKi99XG4gICAgICAgICAgICA8YVxuICAgICAgICAgICAgICBocmVmPVwidGVsOis0ODUxMDQzMjM2MVwiXG4gICAgICAgICAgICAgIGlkPVwiaGVhZGVyLXBob25lLWN0YVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1pbmRpZ28tNjAwIHZpYS1wdXJwbGUtNjAwIHRvLWluZGlnby03MDAgaG92ZXI6ZnJvbS1pbmRpZ28tNTAwIGhvdmVyOnRvLWluZGlnby02MDAgcm91bmRlZC14bCBzaGFkb3ctbGcgc2hhZG93LWluZGlnby02MDAvMjAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNDAwLzMwIHRyYW5zaXRpb24tYWxsIGhvdmVyOnNjYWxlLVsxLjAyXSBhY3RpdmU6c2NhbGUtOTUgbm8tdW5kZXJsaW5lXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFBob25lIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+KzQ4IDUxMCA0MzIgMzYxPC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgICB7LyogTW9iaWxlIEhhbWJ1cmdlciBUb2dnbGUgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzTW9iaWxlTWVudU9wZW4oIWlzTW9iaWxlTWVudU9wZW4pfVxuICAgICAgICAgICAgICBpZD1cIm1vYmlsZS1tZW51LXRvZ2dsZVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImxnOmhpZGRlbiBwLTIgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1zbGF0ZS05MDAvNjAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiT3R3w7NyeiBtZW51IG5hd2lnYWNqaVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpc01vYmlsZU1lbnVPcGVuID8gPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+IDogPE1lbnUgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG5cbiAgICAgIHsvKiBNb2JpbGUgRHJhd2VyIE1lbnUgKi99XG4gICAgICB7aXNNb2JpbGVNZW51T3BlbiAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBpZD1cIm1vYmlsZS1uYXYtZHJhd2VyXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNDAgYmctc2xhdGUtOTUwLzk1IGJhY2tkcm9wLWJsdXIteGwgcHQtMjQgcGItOCBweC02IGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIGxnOmhpZGRlbiBvdmVyZmxvdy15LWF1dG9cIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC00XCI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctd2lkZXIgdGV4dC1pbmRpZ28tNDAwIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICBNZW51IEtsaW5pa2kgQ01MXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTJcIj5cbiAgICAgICAgICAgICAge25hdkxpbmtzLm1hcCgobGluaykgPT4gKFxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBrZXk9e2xpbmsuaHJlZn1cbiAgICAgICAgICAgICAgICAgIGhyZWY9e2xpbmsuaHJlZn1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzTW9iaWxlTWVudU9wZW4oZmFsc2UpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHktMi41IHRleHQtYmFzZSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTIwMCBob3Zlcjp0ZXh0LWluZGlnby0zMDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntsaW5rLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIHtsaW5rLmJhZGdlICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTUwMC8yMCB0ZXh0LWluZGlnby0zMDAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzMwIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIHtsaW5rLmJhZGdlfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMyBwdC02IGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNldElzTW9iaWxlTWVudU9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgIG9uT3BlbkFpKCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0zIHB4LTQgcm91bmRlZC14bCBiZy1wdXJwbGUtOTUwLzYwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC80MCB0ZXh0LXB1cnBsZS0yMDAgZm9udC1tZWRpdW0gdGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlphZGFqIHB5dGFuaWUgQXN5c3RlbnRvd2kgQUk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0SXNNb2JpbGVNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgb25PcGVuQXVkaXQoKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTMgcHgtNCByb3VuZGVkLXhsIGJnLXRlYWwtOTUwLzYwIGJvcmRlciBib3JkZXItdGVhbC01MDAvNDAgdGV4dC10ZWFsLTIwMCBmb250LW1lZGl1bSB0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC10ZWFsLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlNwcmF3ZMW6IFNFTyBpIE5hZ8WCw7N3a2kgSDEtSDY8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgaHJlZj1cInRlbDorNDg1MTA0MzIzNjFcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMyBweC00IHJvdW5kZWQteGwgYmctaW5kaWdvLTYwMCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC1jZW50ZXIgdGV4dC1zbSBzaGFkb3ctbGcgc2hhZG93LWluZGlnby02MDAvMzAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UGhvbmUgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlphZHp3b8WEOiArNDggNTEwIDQzMiAzNjE8L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8Lz5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTZFWSxTQWtFTSxVQWxFTjtBQTdFWixTQUFnQixVQUFVLGlCQUFpQjtBQUMzQyxTQUFTLGFBQWEsTUFBTSxHQUFHLFVBQWtCLGFBQWEsT0FBTyxPQUFPLEtBQUssU0FBUyxLQUFLLFlBQVk7QUFpQnBHLGFBQU0sU0FBZ0MsQ0FBQztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsRUFDakI7QUFBQSxFQUNBO0FBQUEsRUFDQSxjQUFjO0FBQUEsRUFDZDtBQUFBLEVBQ0EsZUFBZTtBQUNqQixNQUFNO0FBQ0osUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQVMsS0FBSztBQUNsRCxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixJQUFJLFNBQVMsS0FBSztBQUU5RCxZQUFVLE1BQU07QUFDZCxVQUFNLGVBQWUsTUFBTTtBQUN6QixVQUFJLE9BQU8sVUFBVSxJQUFJO0FBQ3ZCLHNCQUFjLElBQUk7QUFBQSxNQUNwQixPQUFPO0FBQ0wsc0JBQWMsS0FBSztBQUFBLE1BQ3JCO0FBQUEsSUFDRjtBQUNBLFdBQU8saUJBQWlCLFVBQVUsY0FBYyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQ2pFLGlCQUFhO0FBQ2IsV0FBTyxNQUFNLE9BQU8sb0JBQW9CLFVBQVUsWUFBWTtBQUFBLEVBQ2hFLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxXQUFXO0FBQUEsSUFDZixFQUFFLE1BQU0sV0FBVyxPQUFPLFNBQVM7QUFBQSxJQUNuQyxFQUFFLE1BQU0sV0FBVyxPQUFPLFNBQVM7QUFBQSxJQUNuQyxFQUFFLE1BQU0s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LEtBZkg7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFnQkE7QUFBQSxlQXBCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXFCQTtBQUFBLFVBRUEsdUJBQUMsU0FBSSxXQUFVLHNEQUNiO0FBQUE7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxTQUFTLE1BQU07QUFDYixzQ0FBb0IsS0FBSztBQUN6QiwyQkFBUztBQUFBLGdCQUNYO0FBQUEsZ0JBQ0EsV0FBVTtBQUFBLGdCQUVWO0FBQUEseUNBQUMsWUFBUyxXQUFVLDZCQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUE4QztBQUFBLGtCQUM5Qyx1QkFBQyxVQUFLLDRDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQWtDO0FBQUE7QUFBQTtBQUFBLGNBUnBDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQVNBO0FBQUEsWUFFQTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFNBQVMsTUFBTTtBQUNiLHNDQUFvQixLQUFLO0FBQ3pCLDhCQUFZO0FBQUEsZ0JBQ2Q7QUFBQSxnQkFDQSxXQUFVO0FBQUEsZ0JBRVY7QUFBQSx5Q0FBQyxlQUFZLFdBQVUsMkJBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQStDO0FBQUEsa0JBQy9DLHVCQUFDLFVBQUssNENBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBa0M7QUFBQTtBQUFBO0FBQUEsY0FScEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFlBU0E7QUFBQSxZQUVBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBSztBQUFBLGdCQUNMLFdBQVU7QUFBQSxnQkFFVjtBQUFBLHlDQUFDLFNBQU0sV0FBVSxhQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUEyQjtBQUFBLGtCQUMzQix1QkFBQyxVQUFLLHdDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQThCO0FBQUE7QUFBQTtBQUFBLGNBTGhDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU1BO0FBQUEsZUE3QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkE4QkE7QUFBQTtBQUFBO0FBQUEsTUF6REY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBMERBO0FBQUEsT0FwUUo7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXNRQTtBQUVKOyIsIm5hbWVzIjpbXX0=