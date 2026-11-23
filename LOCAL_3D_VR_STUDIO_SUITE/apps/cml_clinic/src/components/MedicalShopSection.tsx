import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import {
  ShoppingCart,
  Plus,
  Check,
  Info,
  Boxes,
  Package,
  AlertCircle,
  Search,
  X,
  Sparkles,
  Droplets,
  ShieldCheck,
  Pill,
  HeartPulse,
  Stethoscope,
  PackageCheck,
  Filter
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
export const MedicalShopSection = ({
  products,
  onAddToCart,
  onOpenCart,
  onOpenInventory
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedProductId, setAddedProductId] = useState(null);
  const categories = [
    { id: "all", label: "Wszystkie", icon: Sparkles },
    { id: "hygiene", label: "Higiena & Pielęgnacja", icon: Droplets },
    { id: "post_op", label: "Pooperacyjne & Regeneracja", icon: ShieldCheck },
    { id: "supplements", label: "Suplementy & Błonnik", icon: Pill },
    { id: "skincare", label: "Dermokosmetyki", icon: HeartPulse },
    { id: "services", label: "E-Konsultacje & Usługi", icon: Stethoscope },
    { id: "packages", label: "Pakiety Zabiegowe", icon: PackageCheck }
  ];
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q) || p.medicalNote.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
  const getCategoryCount = (catId) => {
    if (catId === "all") return products.length;
    return products.filter((p) => p.category === catId).length;
  };
  const handleAdd = (product) => {
    if (product.stock <= 0) return;
    onAddToCart(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1500);
  };
  return /* @__PURE__ */ jsxDEV(
    motion.section,
    {
      className: "py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto",
      id: "sklep-medyczny",
      initial: { opacity: 0, y: 35 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-3xl mx-auto mb-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3", children: [
            /* @__PURE__ */ jsxDEV(ShoppingCart, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 87,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Sklep CML & E-Usługi Medyczne" }, void 0, false, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 88,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 86,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-4xl font-normal text-slate-100 mb-4", children: "Konsultacje, pakiety i preparaty wspierające gojenie" }, void 0, false, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 90,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-300 font-light leading-relaxed mb-4", children: "Zamów bezpiecznie online konsultacje medyczne, kwalifikacje zabiegowe oraz certyfikowane preparaty regeneracyjne po procedurach laserowych." }, void 0, false, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 93,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onOpenInventory,
              className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-indigo-500/40 text-indigo-200 text-xs font-semibold transition-all shadow-md hover:border-indigo-400",
              children: [
                /* @__PURE__ */ jsxDEV(Boxes, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                  lineNumber: 102,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Otwórz Panel Magazynowy & Zarządzanie Sklepem (Admin)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                  lineNumber: 103,
                  columnNumber: 11
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 98,
              columnNumber: 9
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
          lineNumber: 85,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mb-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 border border-indigo-500/30 text-xs sm:text-sm text-slate-300 space-y-3 shadow-xl", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-indigo-300 font-semibold text-sm sm:text-base", children: [
            /* @__PURE__ */ jsxDEV(Info, { className: "w-5 h-5 text-indigo-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 110,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { children: "Zarządzanie Sklepem & Magazyn w Jednej Aplikacji" }, void 0, false, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 111,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 109,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "leading-relaxed", children: [
            /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-100 font-medium", children: "System Magazynowy CML:" }, void 0, false, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 114,
              columnNumber: 11
            }, this),
            " Wszystkie produkty posiadają własny kod SKU, dynamiczną kontrolę ilości sztuk w magazynie oraz statusy dostępności (w tym blokadę zakupu po wyprzedaniu towaru). Klinika może dodawać nowe preparaty, modyfikować ceny i zarządzać stancjami bezpośrednio w panelu administracyjnym."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 113,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-lg bg-slate-950/60 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block mb-0.5", children: "📦 Magazyn SKU" }, void 0, false, {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 118,
                columnNumber: 13
              }, this),
              "Kody produktów, śledzenie ilości sztuk i alerty o niskich stanach (≤ 10 szt.)."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 117,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-lg bg-slate-950/60 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block mb-0.5", children: "⚙️ Dedykowany Panel" }, void 0, false, {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 122,
                columnNumber: 13
              }, this),
              "Lekarz lub menedżer kliniki może edytować ceny, opisy i dodawać usługi bez kodu."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 121,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-lg bg-slate-950/60 border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block mb-0.5", children: "🛒 Żywa Synchronizacja" }, void 0, false, {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 126,
                columnNumber: 13
              }, this),
              "Koszyk natychmiast honoruje dostępność towarową."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 125,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 116,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
          lineNumber: 108,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "max-w-md mx-auto mb-6 relative", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-indigo-400 absolute left-3.5 pointer-events-none" }, void 0, false, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 135,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                placeholder: "Szukaj preparatu, SKU lub e-usługi (np. czopki, LHP, maść)...",
                className: "w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 136,
                columnNumber: 11
              },
              this
            ),
            searchQuery && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setSearchQuery(""),
                className: "absolute right-3 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-all",
                children: /* @__PURE__ */ jsxDEV(X, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                  lineNumber: 148,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 144,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 134,
            columnNumber: 9
          }, this),
          searchQuery && /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 text-center mt-1.5", children: [
            "Znaleziono produktów: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-indigo-300 font-semibold", children: filteredProducts.length }, void 0, false, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 154,
              columnNumber: 35
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 153,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
          lineNumber: 133,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-3 px-1", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 text-xs font-semibold text-indigo-300", children: [
              /* @__PURE__ */ jsxDEV(Filter, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 163,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kategorie preparatów i e-usług medycznych:" }, void 0, false, {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 164,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 162,
              columnNumber: 11
            }, this),
            (selectedCategory !== "all" || searchQuery) && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                },
                className: "text-[11px] font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxDEV(X, { className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 174,
                    columnNumber: 15
                  }, this),
                  "Resetuj filtry"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 167,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 161,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center sm:justify-start gap-2 flex-wrap", children: categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setSelectedCategory(cat.id),
                className: `px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border shadow-sm ${isSelected ? "bg-indigo-600 text-white shadow-indigo-600/30 border-indigo-400 scale-[1.02]" : "bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700 hover:bg-slate-850"}`,
                children: [
                  /* @__PURE__ */ jsxDEV(Icon, { className: `w-3.5 h-3.5 ${isSelected ? "text-white" : "text-indigo-400"}` }, void 0, false, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 196,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: cat.label }, void 0, false, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 197,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: `ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${isSelected ? "bg-indigo-900/80 text-indigo-100 border border-indigo-300/40" : "bg-slate-950 text-slate-400 border border-slate-800"}`,
                      children: count
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 198,
                      columnNumber: 17
                    },
                    this
                  )
                ]
              },
              cat.id,
              true,
              {
                fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                lineNumber: 187,
                columnNumber: 15
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 180,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
          lineNumber: 160,
          columnNumber: 7
        }, this),
        filteredProducts.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 px-4 rounded-2xl bg-slate-900/40 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-10 h-10 text-amber-400 mx-auto mb-3 opacity-80" }, void 0, false, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 216,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-semibold text-slate-200 mb-1", children: "Brak produktów w wybranej kategorii" }, void 0, false, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 217,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 max-w-md mx-auto mb-4", children: "Nie znaleziono preparatów odpowiadających wybranemu filtrowi lub hasłu wyszukiwania." }, void 0, false, {
            fileName: "/app/applet/src/components/MedicalShopSection.tsx",
            lineNumber: 220,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                setSelectedCategory("all");
                setSearchQuery("");
              },
              className: "px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all",
              children: [
                "Pokaż wszystkie produkty (",
                products.length,
                ")"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 223,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
          lineNumber: 215,
          columnNumber: 9
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5", children: filteredProducts.map((product) => {
          const isJustAdded = addedProductId === product.id;
          const isOutOfStock = product.stock <= 0;
          const isLowStock = product.stock > 0 && product.stock <= 10;
          return /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              whileHover: { y: -4 },
              transition: { duration: 0.2 },
              className: `p-5 rounded-2xl bg-slate-900/60 border transition-all flex flex-col justify-between group ${isOutOfStock ? "border-rose-900/50 opacity-80" : "border-slate-800 hover:border-indigo-500/50"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-indigo-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-800", children: product.sku }, void 0, false, {
                        fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                        lineNumber: 255,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-semibold text-slate-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800", children: product.categoryLabel }, void 0, false, {
                        fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                        lineNumber: 258,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 254,
                      columnNumber: 21
                    }, this),
                    product.badge && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 border border-purple-500/40", children: product.badge }, void 0, false, {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 263,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 253,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-base text-slate-100 mb-2 group-hover:text-indigo-200 transition-colors", children: product.name }, void 0, false, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 270,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "mb-3 flex items-center gap-2", children: isOutOfStock ? /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-500/30 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 278,
                      columnNumber: 25
                    }, this),
                    "Brak w magazynie (0 szt.)"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 277,
                    columnNumber: 23
                  }, this) : isLowStock ? /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxDEV(Package, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 283,
                      columnNumber: 25
                    }, this),
                    "Ostatnie sztuki (",
                    product.stock,
                    " szt.)"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 282,
                    columnNumber: 23
                  }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-medium text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded-full border border-teal-500/20", children: [
                    "Dostępność: ",
                    product.stock,
                    " szt."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 287,
                    columnNumber: 23
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 275,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 font-light leading-relaxed mb-3", children: product.description }, void 0, false, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 294,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 leading-normal mb-4", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-medium text-indigo-300 block mb-0.5", children: "Wskazówka medyczna:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 300,
                      columnNumber: 21
                    }, this),
                    product.medicalNote
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 299,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                  lineNumber: 251,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-slate-800 flex items-center justify-between mt-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-baseline gap-2", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-bold text-slate-100", children: [
                        product.price,
                        " zł"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                        lineNumber: 309,
                        columnNumber: 23
                      }, this),
                      product.originalPrice && /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-500 line-through", children: [
                        product.originalPrice,
                        " zł"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                        lineNumber: 311,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 308,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "brutto · fakturowanie medyczne" }, void 0, false, {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 314,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                    lineNumber: 307,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      disabled: isOutOfStock,
                      onClick: () => handleAdd(product),
                      className: `px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${isOutOfStock ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700" : isJustAdded ? "bg-teal-600 text-white border border-teal-400 scale-105" : "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/50 hover:scale-105 active:scale-95"}`,
                      children: isOutOfStock ? /* @__PURE__ */ jsxDEV("span", { children: "Wyprzedane" }, void 0, false, {
                        fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                        lineNumber: 329,
                        columnNumber: 23
                      }, this) : isJustAdded ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                        /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                          lineNumber: 332,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Dodano!" }, void 0, false, {
                          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                          lineNumber: 333,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                        lineNumber: 331,
                        columnNumber: 23
                      }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                        /* @__PURE__ */ jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                          lineNumber: 337,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Do koszyka" }, void 0, false, {
                          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                          lineNumber: 338,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                        lineNumber: 336,
                        columnNumber: 23
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                      lineNumber: 317,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MedicalShopSection.tsx",
                  lineNumber: 306,
                  columnNumber: 17
                }, this)
              ]
            },
            product.id,
            true,
            {
              fileName: "/app/applet/src/components/MedicalShopSection.tsx",
              lineNumber: 241,
              columnNumber: 15
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/MedicalShopSection.tsx",
          lineNumber: 234,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/MedicalShopSection.tsx",
      lineNumber: 77,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1lZGljYWxTaG9wU2VjdGlvbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU2hvcFByb2R1Y3QgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICBTaG9wcGluZ0NhcnQsXG4gIFBsdXMsXG4gIENoZWNrLFxuICBJbmZvLFxuICBCb3hlcyxcbiAgUGFja2FnZSxcbiAgQWxlcnRDaXJjbGUsXG4gIFNlYXJjaCxcbiAgWCxcbiAgU3BhcmtsZXMsXG4gIERyb3BsZXRzLFxuICBTaGllbGRDaGVjayxcbiAgUGlsbCxcbiAgSGVhcnRQdWxzZSxcbiAgU3RldGhvc2NvcGUsXG4gIFBhY2thZ2VDaGVjayxcbiAgRmlsdGVyLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgbW90aW9uIH0gZnJvbSAnbW90aW9uL3JlYWN0JztcblxuaW50ZXJmYWNlIE1lZGljYWxTaG9wU2VjdGlvblByb3BzIHtcbiAgcHJvZHVjdHM6IFNob3BQcm9kdWN0W107XG4gIG9uQWRkVG9DYXJ0OiAocHJvZHVjdDogU2hvcFByb2R1Y3QpID0+IHZvaWQ7XG4gIG9uT3BlbkNhcnQ6ICgpID0+IHZvaWQ7XG4gIG9uT3BlbkludmVudG9yeTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IE1lZGljYWxTaG9wU2VjdGlvbjogUmVhY3QuRkM8TWVkaWNhbFNob3BTZWN0aW9uUHJvcHM+ID0gKHtcbiAgcHJvZHVjdHMsXG4gIG9uQWRkVG9DYXJ0LFxuICBvbk9wZW5DYXJ0LFxuICBvbk9wZW5JbnZlbnRvcnksXG59KSA9PiB7XG4gIGNvbnN0IFtzZWxlY3RlZENhdGVnb3J5LCBzZXRTZWxlY3RlZENhdGVnb3J5XSA9IHVzZVN0YXRlPHN0cmluZz4oJ2FsbCcpO1xuICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IHVzZVN0YXRlPHN0cmluZz4oJycpO1xuICBjb25zdCBbYWRkZWRQcm9kdWN0SWQsIHNldEFkZGVkUHJvZHVjdElkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IGNhdGVnb3JpZXMgPSBbXG4gICAgeyBpZDogJ2FsbCcsIGxhYmVsOiAnV3N6eXN0a2llJywgaWNvbjogU3BhcmtsZXMgfSxcbiAgICB7IGlkOiAnaHlnaWVuZScsIGxhYmVsOiAnSGlnaWVuYSAmIFBpZWzEmWduYWNqYScsIGljb246IERyb3BsZXRzIH0sXG4gICAgeyBpZDogJ3Bvc3Rfb3AnLCBsYWJlbDogJ1Bvb3BlcmFjeWpuZSAmIFJlZ2VuZXJhY2phJywgaWNvbjogU2hpZWxkQ2hlY2sgfSxcbiAgICB7IGlkOiAnc3VwcGxlbWVudHMnLCBsYWJlbDogJ1N1cGxlbWVudHkgJiBCxYJvbm5paycsIGljb246IFBpbGwgfSxcbiAgICB7IGlkOiAnc2tpbmNhcmUnLCBsYWJlbDogJ0Rlcm1va29zbWV0eWtpJywgaWNvbjogSGVhcnRQdWxzZSB9LFxuICAgIHsgaWQ6ICdzZXJ2aWNlcycsIGxhYmVsOiAnRS1Lb25zdWx0YWNqZSAmIFVzxYJ1Z2knLCBpY29uOiBTdGV0aG9zY29wZSB9LFxuICAgIHsgaWQ6ICdwYWNrYWdlcycsIGxhYmVsOiAnUGFraWV0eSBaYWJpZWdvd2UnLCBpY29uOiBQYWNrYWdlQ2hlY2sgfSxcbiAgXTtcblxuICBjb25zdCBmaWx0ZXJlZFByb2R1Y3RzID0gcHJvZHVjdHMuZmlsdGVyKChwKSA9PiB7XG4gICAgY29uc3QgbWF0Y2hlc0NhdGVnb3J5ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PT0gJ2FsbCcgfHwgcC5jYXRlZ29yeSA9PT0gc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBjb25zdCBxID0gc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgY29uc3QgbWF0Y2hlc1NlYXJjaCA9XG4gICAgICAhcSB8fFxuICAgICAgcC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgIHAuZGVzY3JpcHRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fFxuICAgICAgcC5za3UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKSB8fFxuICAgICAgcC5jYXRlZ29yeUxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgIHAubWVkaWNhbE5vdGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKTtcbiAgICByZXR1cm4gbWF0Y2hlc0NhdGVnb3J5ICYmIG1hdGNoZXNTZWFyY2g7XG4gIH0pO1xuXG4gIGNvbnN0IGdldENhdGVnb3J5Q291bnQgPSAoY2F0SWQ6IHN0cmluZykgPT4ge1xuICAgIGlmIChjYXRJZCA9PT0gJ2FsbCcpIHJldHVybiBwcm9kdWN0cy5sZW5ndGg7XG4gICAgcmV0dXJuIHByb2R1Y3RzLmZpbHRlcigocCkgPT4gcC5jYXRlZ29yeSA9PT0gY2F0SWQpLmxlbmd0aDtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGQgPSAocHJvZHVjdDogU2hvcFByb2R1Y3QpID0+IHtcbiAgICBpZiAocHJvZHVjdC5zdG9jayA8PSAwKSByZXR1cm47XG4gICAgb25BZGRUb0NhcnQocHJvZHVjdCk7XG4gICAgc2V0QWRkZWRQcm9kdWN0SWQocHJvZHVjdC5pZCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRBZGRlZFByb2R1Y3RJZChudWxsKSwgMTUwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8bW90aW9uLnNlY3Rpb25cbiAgICAgIGNsYXNzTmFtZT1cInB5LTIwIHB4LTQgc206cHgtNiBsZzpweC04IG1heC13LTZ4bCBteC1hdXRvXCJcbiAgICAgIGlkPVwic2tsZXAtbWVkeWN6bnlcIlxuICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAzNSB9fVxuICAgICAgd2hpbGVJblZpZXc9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgdmlld3BvcnQ9e3sgb25jZTogdHJ1ZSwgbWFyZ2luOiAnLTYwcHgnIH19XG4gICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjYsIGVhc2U6IFswLjE2LCAxLCAwLjMsIDFdIH19XG4gICAgPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYXgtdy0zeGwgbXgtYXV0byBtYi0xMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTk1MC84MCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgdGV4dC1pbmRpZ28tMzAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItM1wiPlxuICAgICAgICAgIDxTaG9wcGluZ0NhcnQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICA8c3Bhbj5Ta2xlcCBDTUwgJiBFLVVzxYJ1Z2kgTWVkeWN6bmU8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBzbTp0ZXh0LTR4bCBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTEwMCBtYi00XCI+XG4gICAgICAgICAgS29uc3VsdGFjamUsIHBha2lldHkgaSBwcmVwYXJhdHkgd3NwaWVyYWrEhWNlIGdvamVuaWVcbiAgICAgICAgPC9oMj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBmb250LWxpZ2h0IGxlYWRpbmctcmVsYXhlZCBtYi00XCI+XG4gICAgICAgICAgWmFtw7N3IGJlenBpZWN6bmllIG9ubGluZSBrb25zdWx0YWNqZSBtZWR5Y3puZSwga3dhbGlmaWthY2plIHphYmllZ293ZSBvcmF6IGNlcnR5Zmlrb3dhbmUgcHJlcGFyYXR5IHJlZ2VuZXJhY3lqbmUgcG8gcHJvY2VkdXJhY2ggbGFzZXJvd3ljaC5cbiAgICAgICAgPC9wPlxuXG4gICAgICAgIHsvKiBBZG1pbiBJbnZlbnRvcnkgUXVpY2sgRW50cnkgQnV0dG9uICovfVxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17b25PcGVuSW52ZW50b3J5fVxuICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODUwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby0yMDAgdGV4dC14cyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1tZCBob3Zlcjpib3JkZXItaW5kaWdvLTQwMFwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94ZXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgIDxzcGFuPk90d8OzcnogUGFuZWwgTWFnYXp5bm93eSAmIFphcnrEhWR6YW5pZSBTa2xlcGVtIChBZG1pbik8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBBcmNoaXRlY3R1cmFsIEV4cGxhbmF0aW9uIENhcmQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTEyIHAtNiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20taW5kaWdvLTk1MC80MCB2aWEtcHVycGxlLTk1MC8zMCB0by1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzMwIHRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBzcGFjZS15LTMgc2hhZG93LXhsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1pbmRpZ28tMzAwIGZvbnQtc2VtaWJvbGQgdGV4dC1zbSBzbTp0ZXh0LWJhc2VcIj5cbiAgICAgICAgICA8SW5mbyBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtaW5kaWdvLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgPGgzPlphcnrEhWR6YW5pZSBTa2xlcGVtICYgTWFnYXp5biB3IEplZG5laiBBcGxpa2Fjamk8L2gzPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTEwMCBmb250LW1lZGl1bVwiPlN5c3RlbSBNYWdhenlub3d5IENNTDo8L3N0cm9uZz4gV3N6eXN0a2llIHByb2R1a3R5IHBvc2lhZGFqxIUgd8WCYXNueSBrb2QgU0tVLCBkeW5hbWljem7EhSBrb250cm9sxJkgaWxvxZtjaSBzenR1ayB3IG1hZ2F6eW5pZSBvcmF6IHN0YXR1c3kgZG9zdMSZcG5vxZtjaSAodyB0eW0gYmxva2FkxJkgemFrdXB1IHBvIHd5cHJ6ZWRhbml1IHRvd2FydSkuIEtsaW5pa2EgbW/FvGUgZG9kYXdhxIcgbm93ZSBwcmVwYXJhdHksIG1vZHlmaWtvd2HEhyBjZW55IGkgemFyesSFZHphxIcgc3RhbmNqYW1pIGJlenBvxZtyZWRuaW8gdyBwYW5lbHUgYWRtaW5pc3RyYWN5am55bS5cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTMgZ2FwLTMgcHQtMiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgYmxvY2sgbWItMC41XCI+8J+TpiBNYWdhenluIFNLVTwvc3Bhbj5cbiAgICAgICAgICAgIEtvZHkgcHJvZHVrdMOzdywgxZtsZWR6ZW5pZSBpbG/Fm2NpIHN6dHVrIGkgYWxlcnR5IG8gbmlza2ljaCBzdGFuYWNoICjiiaQgMTAgc3p0LikuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBibG9jayBtYi0wLjVcIj7impnvuI8gRGVkeWtvd2FueSBQYW5lbDwvc3Bhbj5cbiAgICAgICAgICAgIExla2FyeiBsdWIgbWVuZWTFvGVyIGtsaW5pa2kgbW/FvGUgZWR5dG93YcSHIGNlbnksIG9waXN5IGkgZG9kYXdhxIcgdXPFgnVnaSBiZXoga29kdS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwIGJsb2NrIG1iLTAuNVwiPvCfm5Igxbt5d2EgU3luY2hyb25pemFjamE8L3NwYW4+XG4gICAgICAgICAgICBLb3N6eWsgbmF0eWNobWlhc3QgaG9ub3J1amUgZG9zdMSZcG5vxZvEhyB0b3dhcm93xIUuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBQcm9kdWN0IFNlYXJjaCBCYXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LW1kIG14LWF1dG8gbWItNiByZWxhdGl2ZVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTQwMCBhYnNvbHV0ZSBsZWZ0LTMuNSBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hRdWVyeX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTenVrYWogcHJlcGFyYXR1LCBTS1UgbHViIGUtdXPFgnVnaSAobnAuIGN6b3BraSwgTEhQLCBtYcWbxIcpLi4uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC0xMCBwci05IHB5LTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXItc2xhdGUtNTAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMCBmb2N1czpyaW5nLTEgZm9jdXM6cmluZy1pbmRpZ28tNTAwIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1pbm5lclwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICB7c2VhcmNoUXVlcnkgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWFyY2hRdWVyeSgnJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTMgcC0xIHJvdW5kZWQtZnVsbCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7c2VhcmNoUXVlcnkgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgdGV4dC1jZW50ZXIgbXQtMS41XCI+XG4gICAgICAgICAgICBabmFsZXppb25vIHByb2R1a3TDs3c6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1pbmRpZ28tMzAwIGZvbnQtc2VtaWJvbGRcIj57ZmlsdGVyZWRQcm9kdWN0cy5sZW5ndGh9PC9zdHJvbmc+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENhdGVnb3J5IEZpbHRlciBTZWN0aW9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIG1iLTMgcHgtMVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1pbmRpZ28tMzAwXCI+XG4gICAgICAgICAgICA8RmlsdGVyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5LYXRlZ29yaWUgcHJlcGFyYXTDs3cgaSBlLXVzxYJ1ZyBtZWR5Y3pueWNoOjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7KHNlbGVjdGVkQ2F0ZWdvcnkgIT09ICdhbGwnIHx8IHNlYXJjaFF1ZXJ5KSAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZENhdGVnb3J5KCdhbGwnKTtcbiAgICAgICAgICAgICAgICBzZXRTZWFyY2hRdWVyeSgnJyk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbWVkaXVtIHRleHQtYW1iZXItNDAwIGhvdmVyOnRleHQtYW1iZXItMzAwIHRyYW5zaXRpb24tY29sb3JzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgIFJlc2V0dWogZmlsdHJ5XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNtOmp1c3RpZnktc3RhcnQgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAge2NhdGVnb3JpZXMubWFwKChjYXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IEljb24gPSBjYXQuaWNvbjtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZENhdGVnb3J5ID09PSBjYXQuaWQ7XG4gICAgICAgICAgICBjb25zdCBjb3VudCA9IGdldENhdGVnb3J5Q291bnQoY2F0LmlkKTtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17Y2F0LmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkQ2F0ZWdvcnkoY2F0LmlkKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zLjUgcHktMiByb3VuZGVkLXhsIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXIgc2hhZG93LXNtICR7XG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgdGV4dC13aGl0ZSBzaGFkb3ctaW5kaWdvLTYwMC8zMCBib3JkZXItaW5kaWdvLTQwMCBzY2FsZS1bMS4wMl0nXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC85MCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCBob3ZlcjpiZy1zbGF0ZS04NTAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8SWNvbiBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSAke2lzU2VsZWN0ZWQgPyAndGV4dC13aGl0ZScgOiAndGV4dC1pbmRpZ28tNDAwJ31gfSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntjYXQubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BtbC0wLjUgcHgtMS41IHB5LTAuMiByb3VuZGVkLWZ1bGwgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCAke1xuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTkwMC84MCB0ZXh0LWluZGlnby0xMDAgYm9yZGVyIGJvcmRlci1pbmRpZ28tMzAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTQwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtjb3VudH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFByb2R1Y3QgR3JpZCAqL31cbiAgICAgIHtmaWx0ZXJlZFByb2R1Y3RzLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBweS0xMiBweC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC80MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgIDxBbGVydENpcmNsZSBjbGFzc05hbWU9XCJ3LTEwIGgtMTAgdGV4dC1hbWJlci00MDAgbXgtYXV0byBtYi0zIG9wYWNpdHktODBcIiAvPlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBtYi0xXCI+XG4gICAgICAgICAgICBCcmFrIHByb2R1a3TDs3cgdyB3eWJyYW5laiBrYXRlZ29yaWlcbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbWF4LXctbWQgbXgtYXV0byBtYi00XCI+XG4gICAgICAgICAgICBOaWUgem5hbGV6aW9ubyBwcmVwYXJhdMOzdyBvZHBvd2lhZGFqxIVjeWNoIHd5YnJhbmVtdSBmaWx0cm93aSBsdWIgaGFzxYJ1IHd5c3p1a2l3YW5pYS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICBzZXRTZWxlY3RlZENhdGVnb3J5KCdhbGwnKTtcbiAgICAgICAgICAgICAgc2V0U2VhcmNoUXVlcnkoJycpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgUG9rYcW8IHdzenlzdGtpZSBwcm9kdWt0eSAoe3Byb2R1Y3RzLmxlbmd0aH0pXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC01XCI+XG4gICAgICAgICAge2ZpbHRlcmVkUHJvZHVjdHMubWFwKChwcm9kdWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0p1c3RBZGRlZCA9IGFkZGVkUHJvZHVjdElkID09PSBwcm9kdWN0LmlkO1xuICAgICAgICAgICAgY29uc3QgaXNPdXRPZlN0b2NrID0gcHJvZHVjdC5zdG9jayA8PSAwO1xuICAgICAgICAgICAgY29uc3QgaXNMb3dTdG9jayA9IHByb2R1Y3Quc3RvY2sgPiAwICYmIHByb2R1Y3Quc3RvY2sgPD0gMTA7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAga2V5PXtwcm9kdWN0LmlkfVxuICAgICAgICAgICAgICAgIHdoaWxlSG92ZXI9e3sgeTogLTQgfX1cbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjIgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzYwIGJvcmRlciB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBncm91cCAke1xuICAgICAgICAgICAgICAgICAgaXNPdXRPZlN0b2NrXG4gICAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1yb3NlLTkwMC81MCBvcGFjaXR5LTgwJ1xuICAgICAgICAgICAgICAgICAgICA6ICdib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1pbmRpZ28tNTAwLzUwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIHsvKiBIZWFkZXIgU0tVLCBCYWRnZSAmIENhdGVnb3J5ICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1pbmRpZ28tNDAwIGZvbnQtYm9sZCBiZy1zbGF0ZS05NTAgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3Byb2R1Y3Quc2t1fVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNDAwIGJnLXNsYXRlLTk1MC84MCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5jYXRlZ29yeUxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LmJhZGdlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJvbGQgcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNTAwLzMwIHRvLXBpbmstNTAwLzMwIHRleHQtcHVycGxlLTIwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0LmJhZGdlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogVGl0bGUgKi99XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWJhc2UgdGV4dC1zbGF0ZS0xMDAgbWItMiBncm91cC1ob3Zlcjp0ZXh0LWluZGlnby0yMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAge3Byb2R1Y3QubmFtZX1cbiAgICAgICAgICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBTdG9jayBMZXZlbCBJbmRpY2F0b3IgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAge2lzT3V0T2ZTdG9jayA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1yb3NlLTQwMCBiZy1yb3NlLTk1MC84MCBweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzMwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QWxlcnRDaXJjbGUgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICBCcmFrIHcgbWFnYXp5bmllICgwIHN6dC4pXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApIDogaXNMb3dTdG9jayA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1hbWJlci0zMDAgYmctYW1iZXItOTUwLzgwIHB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGFja2FnZSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9zdGF0bmllIHN6dHVraSAoe3Byb2R1Y3Quc3RvY2t9IHN6dC4pXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbWVkaXVtIHRleHQtdGVhbC0zMDAgYmctdGVhbC05NTAvNjAgcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItdGVhbC01MDAvMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIERvc3TEmXBub8WbxIc6IHtwcm9kdWN0LnN0b2NrfSBzenQuXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBEZXNjcmlwdGlvbiAqL31cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWQgbWItM1wiPlxuICAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgey8qIE1lZGljYWwgTm90ZSAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbGVhZGluZy1ub3JtYWwgbWItNFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bSB0ZXh0LWluZGlnby0zMDAgYmxvY2sgbWItMC41XCI+V3NrYXrDs3drYSBtZWR5Y3puYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHtwcm9kdWN0Lm1lZGljYWxOb3RlfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogUHJpY2UgJiBBZGQgdG8gQ2FydCBGb290ZXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG10LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1iYXNlbGluZSBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwXCI+e3Byb2R1Y3QucHJpY2V9IHrFgjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICB7cHJvZHVjdC5vcmlnaW5hbFByaWNlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS01MDAgbGluZS10aHJvdWdoXCI+e3Byb2R1Y3Qub3JpZ2luYWxQcmljZX0gesWCPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBibG9ja1wiPmJydXR0byDCtyBmYWt0dXJvd2FuaWUgbWVkeWN6bmU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNPdXRPZlN0b2NrfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVBZGQocHJvZHVjdCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgc2hhZG93LW1kICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNPdXRPZlN0b2NrXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAgY3Vyc29yLW5vdC1hbGxvd2VkIGJvcmRlciBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBpc0p1c3RBZGRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctdGVhbC02MDAgdGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXRlYWwtNDAwIHNjYWxlLTEwNSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItaW5kaWdvLTQwMC81MCBob3ZlcjpzY2FsZS0xMDUgYWN0aXZlOnNjYWxlLTk1J1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2lzT3V0T2ZTdG9jayA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XeXByemVkYW5lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApIDogaXNKdXN0QWRkZWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Eb2Rhbm8hPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5EbyBrb3N6eWthPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L21vdGlvbi5zZWN0aW9uPlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBc0ZVLFNBb1BZLFVBcFBaO0FBdEZWLFNBQWdCLGdCQUFnQjtBQUVoQztBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUNQLFNBQVMsY0FBYztBQVNoQixhQUFNLHFCQUF3RCxDQUFDO0FBQUEsRUFDcEU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBQ0osUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSSxTQUFp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