import __vite__cjsImport0_react_jsxDevRuntime from "/apps/nextgen_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c2c0e3b9"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/nextgen_clinic/node_modules/.vite/deps/react.js?v=c2c0e3b9"; const useState = __vite__cjsImport1_react["useState"];
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  Search,
  CreditCard
} from "/apps/nextgen_clinic/node_modules/.vite/deps/lucide-react.js?v=93a6f22a";
export const ShopDrawer = ({
  isOpen,
  onClose,
  products,
  cart,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  lang
}) => {
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState("catalog");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [orderComplete, setOrderComplete] = useState(false);
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === "all" || p.category === selectedCategory;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const handleCheckout = () => {
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setOrderComplete(false);
      onClose();
    }, 2500);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        onClick: onClose,
        className: "absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ShopDrawer.tsx",
        lineNumber: 71,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-y-0 right-0 max-w-full flex pl-10", children: /* @__PURE__ */ jsxDEV("div", { className: "w-screen max-w-xl bg-white shadow-2xl flex flex-col border-l border-slate-200", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-6 bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-white flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-white/20 backdrop-blur-md", children: /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-6 h-6 text-white" }, void 0, false, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 84,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 83,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-black tracking-tight font-sans", children: lang === "pl" ? "Sklep Medyczny Next Gen" : "Next Gen Clinic Shop" }, void 0, false, {
              fileName: "/app/applet/src/components/ShopDrawer.tsx",
              lineNumber: 87,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-white/80 font-medium", children: lang === "pl" ? "Kompresjoterapia • Pielęgnacja pooperacyjna • Suplementacja" : "Compression Wear • Post-Op Care • Supplements" }, void 0, false, {
              fileName: "/app/applet/src/components/ShopDrawer.tsx",
              lineNumber: 90,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 86,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 82,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/ShopDrawer.tsx",
              lineNumber: 100,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 96,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ShopDrawer.tsx",
        lineNumber: 81,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("catalog"),
            className: `px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all ${activeTab === "catalog" ? "bg-white text-slate-900 border-t-2 border-amber-500 shadow-xs" : "text-slate-500 hover:text-slate-800"}`,
            children: lang === "pl" ? "Katalog Produktów" : "Product Catalog"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 106,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("cart"),
            className: `relative px-4 py-2.5 rounded-t-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === "cart" ? "bg-white text-slate-900 border-t-2 border-amber-500 shadow-xs" : "text-slate-500 hover:text-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Twój Koszyk" : "Your Cart" }, void 0, false, {
                fileName: "/app/applet/src/components/ShopDrawer.tsx",
                lineNumber: 125,
                columnNumber: 15
              }, this),
              cartItemCount > 0 && /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold", children: cartItemCount }, void 0, false, {
                fileName: "/app/applet/src/components/ShopDrawer.tsx",
                lineNumber: 127,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 117,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ShopDrawer.tsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: orderComplete ? /* @__PURE__ */ jsxDEV("div", { className: "h-full flex flex-col items-center justify-center text-center space-y-4 p-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce", children: /* @__PURE__ */ jsxDEV(Check, { className: "w-8 h-8" }, void 0, false, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 140,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 139,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-2xl font-black text-slate-900", children: lang === "pl" ? "Zamówienie Przyjęte!" : "Order Confirmed!" }, void 0, false, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 142,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 max-w-xs", children: lang === "pl" ? "Dziękujemy! Otrzymasz natychmiastowe potwierdzenie na e-mail z numerem przesyłki." : "Thank you! You will receive immediate email confirmation with shipping tracking." }, void 0, false, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 145,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ShopDrawer.tsx",
        lineNumber: 138,
        columnNumber: 15
      }, this) : activeTab === "catalog" ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-3" }, void 0, false, {
              fileName: "/app/applet/src/components/ShopDrawer.tsx",
              lineNumber: 156,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: lang === "pl" ? "Szukaj wyrobów medycznych..." : "Search medical items...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ShopDrawer.tsx",
                lineNumber: 157,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 155,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1.5 text-xs", children: [
            { id: "all", label: lang === "pl" ? "Wszystkie" : "All" },
            { id: "vascular", label: lang === "pl" ? "Kompresja" : "Vascular" },
            { id: "post-op", label: lang === "pl" ? "Pooperacyjne" : "Post-Op" },
            { id: "supplements", label: lang === "pl" ? "Suplementy" : "Supplements" }
          ].map((cat) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedCategory(cat.id),
              className: `px-3 py-1 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat.id ? "bg-amber-500 text-white shadow-xs" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
              children: cat.label
            },
            cat.id,
            false,
            {
              fileName: "/app/applet/src/components/ShopDrawer.tsx",
              lineNumber: 173,
              columnNumber: 23
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 166,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 154,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 gap-4", children: filteredProducts.map((p) => {
          const inCart = cart.find((i) => i.product.id === p.id);
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-md transition-all flex gap-4",
              children: [
                /* @__PURE__ */ jsxDEV(
                  "img",
                  {
                    src: p.image,
                    alt: p.name,
                    className: "w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0",
                    referrerPolicy: "no-referrer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 198,
                    columnNumber: 25
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "flex-1 space-y-1", children: [
                  p.badge && /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-800", children: p.badge }, void 0, false, {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 207,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-slate-900 leading-snug", children: p.name }, void 0, false, {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 212,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-500 line-clamp-2", children: p.description }, void 0, false, {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 216,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "pt-2 flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-black text-slate-900", children: [
                      p.price,
                      " PLN"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ShopDrawer.tsx",
                      lineNumber: 221,
                      columnNumber: 29
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: () => onAddToCart(p),
                        className: `px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${inCart ? "bg-emerald-600 text-white" : "bg-amber-500 hover:bg-amber-600 text-white shadow-xs"}`,
                        children: inCart ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                          /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/components/ShopDrawer.tsx",
                            lineNumber: 235,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: [
                            "(",
                            inCart.quantity,
                            ")"
                          ] }, void 0, true, {
                            fileName: "/app/applet/src/components/ShopDrawer.tsx",
                            lineNumber: 236,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/ShopDrawer.tsx",
                          lineNumber: 234,
                          columnNumber: 33
                        }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                          /* @__PURE__ */ jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
                            fileName: "/app/applet/src/components/ShopDrawer.tsx",
                            lineNumber: 240,
                            columnNumber: 35
                          }, this),
                          /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Dodaj" : "Add" }, void 0, false, {
                            fileName: "/app/applet/src/components/ShopDrawer.tsx",
                            lineNumber: 241,
                            columnNumber: 35
                          }, this)
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/ShopDrawer.tsx",
                          lineNumber: 239,
                          columnNumber: 33
                        }, this)
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/ShopDrawer.tsx",
                        lineNumber: 225,
                        columnNumber: 29
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 220,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ShopDrawer.tsx",
                  lineNumber: 205,
                  columnNumber: 25
                }, this)
              ]
            },
            p.id,
            true,
            {
              fileName: "/app/applet/src/components/ShopDrawer.tsx",
              lineNumber: 194,
              columnNumber: 23
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 189,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ShopDrawer.tsx",
        lineNumber: 152,
        columnNumber: 15
      }, this) : (
        /* CART VIEW */
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: cart.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 space-y-3", children: [
          /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-12 h-12 text-slate-300 mx-auto" }, void 0, false, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 257,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-bold text-slate-500", children: lang === "pl" ? "Koszyk jest pusty" : "Your cart is empty" }, void 0, false, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 258,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setActiveTab("catalog"),
              className: "px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-xs",
              children: lang === "pl" ? "Przeglądaj Produkty" : "Browse Catalog"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ShopDrawer.tsx",
              lineNumber: 261,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 256,
          columnNumber: 19
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: cart.map((item) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxDEV(
                  "img",
                  {
                    src: item.product.image,
                    alt: item.product.name,
                    className: "w-12 h-12 rounded-xl object-cover border border-slate-200",
                    referrerPolicy: "no-referrer"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 276,
                    columnNumber: 27
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-slate-900 line-clamp-1", children: item.product.name }, void 0, false, {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 283,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-black text-amber-700", children: [
                    item.product.price,
                    " PLN"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 286,
                    columnNumber: 29
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ShopDrawer.tsx",
                  lineNumber: 282,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ShopDrawer.tsx",
                lineNumber: 275,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center rounded-lg bg-white border border-slate-200 p-0.5", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => onUpdateQuantity(item.product.id, -1),
                      className: "p-1 hover:bg-slate-100 rounded-md text-slate-600",
                      children: /* @__PURE__ */ jsxDEV(Minus, { className: "w-3 h-3" }, void 0, false, {
                        fileName: "/app/applet/src/components/ShopDrawer.tsx",
                        lineNumber: 298,
                        columnNumber: 31
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ShopDrawer.tsx",
                      lineNumber: 294,
                      columnNumber: 29
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { className: "px-2 text-xs font-extrabold text-slate-800", children: item.quantity }, void 0, false, {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 300,
                    columnNumber: 29
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => onUpdateQuantity(item.product.id, 1),
                      className: "p-1 hover:bg-slate-100 rounded-md text-slate-600",
                      children: /* @__PURE__ */ jsxDEV(Plus, { className: "w-3 h-3" }, void 0, false, {
                        fileName: "/app/applet/src/components/ShopDrawer.tsx",
                        lineNumber: 307,
                        columnNumber: 31
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ShopDrawer.tsx",
                      lineNumber: 303,
                      columnNumber: 29
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ShopDrawer.tsx",
                  lineNumber: 293,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => onRemoveFromCart(item.product.id),
                    className: "p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg",
                    children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-4 h-4" }, void 0, false, {
                      fileName: "/app/applet/src/components/ShopDrawer.tsx",
                      lineNumber: 315,
                      columnNumber: 29
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ShopDrawer.tsx",
                    lineNumber: 311,
                    columnNumber: 27
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ShopDrawer.tsx",
                lineNumber: 292,
                columnNumber: 25
              }, this)
            ]
          },
          item.product.id,
          true,
          {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 271,
            columnNumber: 23
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 269,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 254,
          columnNumber: 15
        }, this)
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/ShopDrawer.tsx",
        lineNumber: 135,
        columnNumber: 11
      }, this),
      activeTab === "cart" && cart.length > 0 && !orderComplete && /* @__PURE__ */ jsxDEV("div", { className: "p-6 bg-slate-50 border-t border-slate-200 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-bold text-slate-600", children: [
          /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Dostawa Medyczna" : "Medical Shipping" }, void 0, false, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 331,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-600 font-extrabold", children: lang === "pl" ? "GRATIS" : "FREE" }, void 0, false, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 332,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 330,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-base font-black text-slate-900", children: [
          /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Suma Razem" : "Total" }, void 0, false, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 336,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl text-amber-600", children: [
            cartTotal,
            " PLN"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 337,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ShopDrawer.tsx",
          lineNumber: 335,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleCheckout,
            className: "w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white text-xs font-extrabold shadow-lg shadow-amber-500/20 active:scale-98 transition-all flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsxDEV(CreditCard, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/ShopDrawer.tsx",
                lineNumber: 344,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Szybkie Zamówienie Medyczne" : "Instant Medical Checkout" }, void 0, false, {
                fileName: "/app/applet/src/components/ShopDrawer.tsx",
                lineNumber: 345,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ShopDrawer.tsx",
            lineNumber: 340,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ShopDrawer.tsx",
        lineNumber: 329,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ShopDrawer.tsx",
      lineNumber: 78,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ShopDrawer.tsx",
      lineNumber: 77,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ShopDrawer.tsx",
    lineNumber: 68,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNob3BEcmF3ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBYLCBcbiAgU2hvcHBpbmdCYWcsIFxuICBQbHVzLCBcbiAgTWludXMsIFxuICBUcmFzaDIsIFxuICBDaGVjaywgXG4gIFNoaWVsZENoZWNrLCBcbiAgVHJ1Y2ssIFxuICBTdGFyLFxuICBTZWFyY2gsXG4gIEZpbHRlcixcbiAgQ3JlZGl0Q2FyZFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgUHJvZHVjdCwgQ2FydEl0ZW0gfSBmcm9tICcuLi90eXBlcyc7XG5cbmludGVyZmFjZSBTaG9wRHJhd2VyUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIHByb2R1Y3RzOiBQcm9kdWN0W107XG4gIGNhcnQ6IENhcnRJdGVtW107XG4gIG9uQWRkVG9DYXJ0OiAocHJvZHVjdDogUHJvZHVjdCkgPT4gdm9pZDtcbiAgb25VcGRhdGVRdWFudGl0eTogKHByb2R1Y3RJZDogc3RyaW5nLCBkZWx0YTogbnVtYmVyKSA9PiB2b2lkO1xuICBvblJlbW92ZUZyb21DYXJ0OiAocHJvZHVjdElkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ2xlYXJDYXJ0OiAoKSA9PiB2b2lkO1xuICBsYW5nOiAncGwnIHwgJ2VuJztcbn1cblxuZXhwb3J0IGNvbnN0IFNob3BEcmF3ZXI6IFJlYWN0LkZDPFNob3BEcmF3ZXJQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2UsXG4gIHByb2R1Y3RzLFxuICBjYXJ0LFxuICBvbkFkZFRvQ2FydCxcbiAgb25VcGRhdGVRdWFudGl0eSxcbiAgb25SZW1vdmVGcm9tQ2FydCxcbiAgb25DbGVhckNhcnQsXG4gIGxhbmdcbn0pID0+IHtcbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTwnY2F0YWxvZycgfCAnY2FydCc+KCdjYXRhbG9nJyk7XG4gIGNvbnN0IFtzZWxlY3RlZENhdGVnb3J5LCBzZXRTZWxlY3RlZENhdGVnb3J5XSA9IHVzZVN0YXRlPHN0cmluZz4oJ2FsbCcpO1xuICBjb25zdCBbc2VhcmNoUXVlcnksIHNldFNlYXJjaFF1ZXJ5XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW29yZGVyQ29tcGxldGUsIHNldE9yZGVyQ29tcGxldGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGZpbHRlcmVkUHJvZHVjdHMgPSBwcm9kdWN0cy5maWx0ZXIoKHApID0+IHtcbiAgICBjb25zdCBtYXRjaGVzQ2F0ID0gc2VsZWN0ZWRDYXRlZ29yeSA9PT0gJ2FsbCcgfHwgcC5jYXRlZ29yeSA9PT0gc2VsZWN0ZWRDYXRlZ29yeTtcbiAgICBjb25zdCBtYXRjaGVzUXVlcnkgPSBwLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKSB8fCBcbiAgICAgICAgICAgICAgICAgICAgICAgICBwLmRlc2NyaXB0aW9uLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoUXVlcnkudG9Mb3dlckNhc2UoKSk7XG4gICAgcmV0dXJuIG1hdGNoZXNDYXQgJiYgbWF0Y2hlc1F1ZXJ5O1xuICB9KTtcblxuICBjb25zdCBjYXJ0VG90YWwgPSBjYXJ0LnJlZHVjZSgoc3VtLCBpdGVtKSA9PiBzdW0gKyBpdGVtLnByb2R1Y3QucHJpY2UgKiBpdGVtLnF1YW50aXR5LCAwKTtcbiAgY29uc3QgY2FydEl0ZW1Db3VudCA9IGNhcnQucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0ucXVhbnRpdHksIDApO1xuXG4gIGNvbnN0IGhhbmRsZUNoZWNrb3V0ID0gKCkgPT4ge1xuICAgIHNldE9yZGVyQ29tcGxldGUodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBvbkNsZWFyQ2FydCgpO1xuICAgICAgc2V0T3JkZXJDb21wbGV0ZShmYWxzZSk7XG4gICAgICBvbkNsb3NlKCk7XG4gICAgfSwgMjUwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIFxuICAgICAgey8qIERhcmsgT3ZlcmxheSBCYWNrZHJvcCAqL31cbiAgICAgIDxkaXYgXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctc2xhdGUtOTUwLzYwIGJhY2tkcm9wLWJsdXIteHMgdHJhbnNpdGlvbi1vcGFjaXR5IGR1cmF0aW9uLTMwMFwiIFxuICAgICAgLz5cblxuICAgICAgey8qIERyYXdlciBTbGlkZS1vdmVyIFBhbmVsICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBtYXgtdy1mdWxsIGZsZXggcGwtMTBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LXNjcmVlbiBtYXgtdy14bCBiZy13aGl0ZSBzaGFkb3ctMnhsIGZsZXggZmxleC1jb2wgYm9yZGVyLWwgYm9yZGVyLXNsYXRlLTIwMFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBEcmF3ZXIgSGVhZGVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAgdmlhLXJvc2UtNTAwIHRvLWluZGlnby02MDAgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy13aGl0ZS8yMCBiYWNrZHJvcC1ibHVyLW1kXCI+XG4gICAgICAgICAgICAgICAgPFNob3BwaW5nQmFnIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC13aGl0ZVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdHJhY2tpbmctdGlnaHQgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdTa2xlcCBNZWR5Y3pueSBOZXh0IEdlbicgOiAnTmV4dCBHZW4gQ2xpbmljIFNob3AnfVxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXdoaXRlLzgwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdLb21wcmVzam90ZXJhcGlhIOKAoiBQaWVsxJlnbmFjamEgcG9vcGVyYWN5am5hIOKAoiBTdXBsZW1lbnRhY2phJyA6ICdDb21wcmVzc2lvbiBXZWFyIOKAoiBQb3N0LU9wIENhcmUg4oCiIFN1cHBsZW1lbnRzJ31cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtZnVsbCBiZy1ibGFjay8yMCBob3ZlcjpiZy1ibGFjay80MCB0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDYXRhbG9nIHZzIENhcnQgVGFicyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBiZy1zbGF0ZS01MCBweC02IHB0LTMgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdjYXRhbG9nJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMi41IHJvdW5kZWQtdC14bCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2NhdGFsb2cnXG4gICAgICAgICAgICAgICAgICA/ICdiZy13aGl0ZSB0ZXh0LXNsYXRlLTkwMCBib3JkZXItdC0yIGJvcmRlci1hbWJlci01MDAgc2hhZG93LXhzJ1xuICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdLYXRhbG9nIFByb2R1a3TDs3cnIDogJ1Byb2R1Y3QgQ2F0YWxvZyd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2NhcnQnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcHgtNCBweS0yLjUgcm91bmRlZC10LXhsIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yICR7XG4gICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnY2FydCdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlIHRleHQtc2xhdGUtOTAwIGJvcmRlci10LTIgYm9yZGVyLWFtYmVyLTUwMCBzaGFkb3cteHMnXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ1R3w7NqIEtvc3p5aycgOiAnWW91ciBDYXJ0J308L3NwYW4+XG4gICAgICAgICAgICAgIHtjYXJ0SXRlbUNvdW50ID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctYW1iZXItNTAwIHRleHQtd2hpdGUgdGV4dC1bMTBweF0gZm9udC1leHRyYWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIHtjYXJ0SXRlbUNvdW50fVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERyYXdlciBDb250ZW50ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LXktYXV0byBwLTYgc3BhY2UteS02XCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHtvcmRlckNvbXBsZXRlID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtZnVsbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWNlbnRlciBzcGFjZS15LTQgcC04XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTE2IGgtMTYgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtMTAwIHRleHQtZW1lcmFsZC02MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTggaC04XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnWmFtw7N3aWVuaWUgUHJ6eWrEmXRlIScgOiAnT3JkZXIgQ29uZmlybWVkISd9XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIG1heC13LXhzXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyBcbiAgICAgICAgICAgICAgICAgICAgPyAnRHppxJlrdWplbXkhIE90cnp5bWFzeiBuYXR5Y2htaWFzdG93ZSBwb3R3aWVyZHplbmllIG5hIGUtbWFpbCB6IG51bWVyZW0gcHJ6ZXN5xYJraS4nIFxuICAgICAgICAgICAgICAgICAgICA6ICdUaGFuayB5b3UhIFlvdSB3aWxsIHJlY2VpdmUgaW1tZWRpYXRlIGVtYWlsIGNvbmZpcm1hdGlvbiB3aXRoIHNoaXBwaW5nIHRyYWNraW5nLid9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBhY3RpdmVUYWIgPT09ICdjYXRhbG9nJyA/IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7LyogU2VhcmNoICYgQ2F0ZWdvcnkgRmlsdGVyICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTZWFyY2ggY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNsYXRlLTQwMCBhYnNvbHV0ZSBsZWZ0LTMgdG9wLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2xhbmcgPT09ICdwbCcgPyAnU3p1a2FqIHd5cm9iw7N3IG1lZHljem55Y2guLi4nIDogJ1NlYXJjaCBtZWRpY2FsIGl0ZW1zLi4uJ31cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoUXVlcnl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHBsLTkgcHItNCBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtMTAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHRleHQteHMgZm9udC1tZWRpdW0gZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLWFtYmVyLTUwMFwiXG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMS41IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAge1tcbiAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnYWxsJywgbGFiZWw6IGxhbmcgPT09ICdwbCcgPyAnV3N6eXN0a2llJyA6ICdBbGwnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Zhc2N1bGFyJywgbGFiZWw6IGxhbmcgPT09ICdwbCcgPyAnS29tcHJlc2phJyA6ICdWYXNjdWxhcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAncG9zdC1vcCcsIGxhYmVsOiBsYW5nID09PSAncGwnID8gJ1Bvb3BlcmFjeWpuZScgOiAnUG9zdC1PcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnc3VwcGxlbWVudHMnLCBsYWJlbDogbGFuZyA9PT0gJ3BsJyA/ICdTdXBsZW1lbnR5JyA6ICdTdXBwbGVtZW50cycgfSxcbiAgICAgICAgICAgICAgICAgICAgXS5tYXAoKGNhdCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Y2F0LmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRDYXRlZ29yeShjYXQuaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xIHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRDYXRlZ29yeSA9PT0gY2F0LmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItNTAwIHRleHQtd2hpdGUgc2hhZG93LXhzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTEwMCB0ZXh0LXNsYXRlLTYwMCBob3ZlcjpiZy1zbGF0ZS0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y2F0LmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFByb2R1Y3QgR3JpZCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgIHtmaWx0ZXJlZFByb2R1Y3RzLm1hcCgocCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbkNhcnQgPSBjYXJ0LmZpbmQoKGkpID0+IGkucHJvZHVjdC5pZCA9PT0gcC5pZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3AuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvODAgaG92ZXI6Ymctd2hpdGUgaG92ZXI6c2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGZsZXggZ2FwLTRcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtwLmltYWdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e3AubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0yMCBoLTIwIHJvdW5kZWQteGwgb2JqZWN0LWNvdmVyIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3AuYmFkZ2UgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1leHRyYWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHB4LTIgcHktMC41IHJvdW5kZWQtbWQgYmctYW1iZXItMTAwIHRleHQtYW1iZXItODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cC5iYWRnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGxlYWRpbmctc251Z1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgbGluZS1jbGFtcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3AuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cC5wcmljZX0gUExOXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25BZGRUb0NhcnQocCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluQ2FydCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1hbWJlci01MDAgaG92ZXI6YmctYW1iZXItNjAwIHRleHQtd2hpdGUgc2hhZG93LXhzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2luQ2FydCA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPih7aW5DYXJ0LnF1YW50aXR5fSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnRG9kYWonIDogJ0FkZCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAvKiBDQVJUIFZJRVcgKi9cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICB7Y2FydC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTEyIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHRleHQtc2xhdGUtMzAwIG14LWF1dG9cIiAvPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0tvc3p5ayBqZXN0IHB1c3R5JyA6ICdZb3VyIGNhcnQgaXMgZW1wdHknfVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2NhdGFsb2cnKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1hbWJlci01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3cteHNcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUHJ6ZWdsxIVkYWogUHJvZHVrdHknIDogJ0Jyb3dzZSBDYXRhbG9nJ31cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgICAge2NhcnQubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLnByb2R1Y3QuaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC0yeGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcmM9e2l0ZW0ucHJvZHVjdC5pbWFnZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHQ9e2l0ZW0ucHJvZHVjdC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMTIgaC0xMiByb3VuZGVkLXhsIG9iamVjdC1jb3ZlciBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k9XCJuby1yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIGxpbmUtY2xhbXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0ucHJvZHVjdC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRleHQtYW1iZXItNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5wcm9kdWN0LnByaWNlfSBQTE5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciByb3VuZGVkLWxnIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHAtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25VcGRhdGVRdWFudGl0eShpdGVtLnByb2R1Y3QuaWQsIC0xKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSBob3ZlcjpiZy1zbGF0ZS0xMDAgcm91bmRlZC1tZCB0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1pbnVzIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgdGV4dC14cyBmb250LWV4dHJhYm9sZCB0ZXh0LXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0ucXVhbnRpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVXBkYXRlUXVhbnRpdHkoaXRlbS5wcm9kdWN0LmlkLCAxKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMSBob3ZlcjpiZy1zbGF0ZS0xMDAgcm91bmRlZC1tZCB0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblJlbW92ZUZyb21DYXJ0KGl0ZW0ucHJvZHVjdC5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgdGV4dC1yb3NlLTUwMCBob3ZlcjpiZy1yb3NlLTUwIHJvdW5kZWQtbGdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBEcmF3ZXIgRm9vdGVyIENoZWNrb3V0IEJhciAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnY2FydCcgJiYgY2FydC5sZW5ndGggPiAwICYmICFvcmRlckNvbXBsZXRlICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IGJnLXNsYXRlLTUwIGJvcmRlci10IGJvcmRlci1zbGF0ZS0yMDAgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnRG9zdGF3YSBNZWR5Y3puYScgOiAnTWVkaWNhbCBTaGlwcGluZyd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC02MDAgZm9udC1leHRyYWJvbGRcIj57bGFuZyA9PT0gJ3BsJyA/ICdHUkFUSVMnIDogJ0ZSRUUnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1iYXNlIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ3BsJyA/ICdTdW1hIFJhemVtJyA6ICdUb3RhbCd9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgdGV4dC1hbWJlci02MDBcIj57Y2FydFRvdGFsfSBQTE48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDaGVja291dH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMyByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItNTAwIHZpYS1vcmFuZ2UtNTAwIHRvLWFtYmVyLTYwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1leHRyYWJvbGQgc2hhZG93LWxnIHNoYWRvdy1hbWJlci01MDAvMjAgYWN0aXZlOnNjYWxlLTk4IHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxDcmVkaXRDYXJkIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ1N6eWJraWUgWmFtw7N3aWVuaWUgTWVkeWN6bmUnIDogJ0luc3RhbnQgTWVkaWNhbCBDaGVja291dCd9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQXNFTSxTQW1LMEIsVUFuSzFCO0FBdEVOLFNBQWdCLGdCQUFnQjtBQUNoQztBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBSUE7QUFBQSxFQUVBO0FBQUEsT0FDSztBQWVBLGFBQU0sYUFBd0MsQ0FBQztBQUFBLEVBQ3BEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEs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