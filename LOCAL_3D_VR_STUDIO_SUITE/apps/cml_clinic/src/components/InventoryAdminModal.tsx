import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import {
  X,
  Package,
  Plus,
  Trash2,
  Edit2,
  Save,
  AlertTriangle,
  Search,
  RefreshCw,
  Boxes,
  DollarSign,
  Tag,
  ShieldCheck
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
export const InventoryAdminModal = ({
  isOpen,
  onClose,
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onResetProducts
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "CML-NEW-" + Math.floor(1e3 + Math.random() * 9e3),
    category: "post_op",
    categoryLabel: "Preparaty Po Zabiegach",
    price: 99,
    originalPrice: 120,
    stock: 25,
    description: "",
    medicalNote: "Skonsultowane z zespołem chirurgicznym CML.",
    badge: "Nowość",
    requiresConsultation: false
  });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  if (!isOpen) return null;
  const totalItems = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    let matchesStock = true;
    if (stockFilter === "low") matchesStock = p.stock > 0 && p.stock <= 10;
    if (stockFilter === "out") matchesStock = p.stock === 0;
    return matchesSearch && matchesCategory && matchesStock;
  });
  const handleStockChange = (product, delta) => {
    const newStock = Math.max(0, product.stock + delta);
    onUpdateProduct({ ...product, stock: newStock });
  };
  const handleDirectStockSet = (product, value) => {
    const val = parseInt(value, 10);
    const newStock = isNaN(val) ? 0 : Math.max(0, val);
    onUpdateProduct({ ...product, stock: newStock });
  };
  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };
  const saveEdit = () => {
    if (editForm) {
      onUpdateProduct(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };
  const handleCreateNew = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const categoryLabels = {
      hygiene: "Higiena & Pielęgnacja",
      post_op: "Pooperacyjne & Regeneracja",
      supplements: "Suplementy & Błonnik",
      skincare: "Dermokosmetyki",
      services: "Usługi & E-Konsultacje",
      packages: "Pakiety Zabiegowe"
    };
    const created = {
      id: newProduct.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      sku: newProduct.sku || `CML-SKU-${Date.now().toString().slice(-4)}`,
      name: newProduct.name,
      category: newProduct.category || "post_op",
      categoryLabel: categoryLabels[newProduct.category || "post_op"] || "Inne",
      price: Number(newProduct.price) || 0,
      originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : void 0,
      stock: Number(newProduct.stock) || 0,
      description: newProduct.description || "Opis produktu medycznego CML.",
      medicalNote: newProduct.medicalNote || "Rekomendowane przez dr. Jana Bujoka.",
      badge: newProduct.badge || void 0,
      requiresConsultation: !!newProduct.requiresConsultation
    };
    onAddProduct(created);
    setIsAddingNew(false);
    setNewProduct({
      name: "",
      sku: "CML-NEW-" + Math.floor(1e3 + Math.random() * 9e3),
      category: "post_op",
      categoryLabel: "Preparaty Po Zabiegach",
      price: 99,
      originalPrice: 120,
      stock: 25,
      description: "",
      medicalNote: "Skonsultowane z zespołem chirurgicznym CML.",
      badge: "Nowość",
      requiresConsultation: false
    });
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[90vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-indigo-950 text-indigo-300 border border-indigo-500/40", children: /* @__PURE__ */ jsxDEV(Boxes, { className: "w-6 h-6 text-indigo-400" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 163,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 162,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-lg font-bold text-slate-100", children: "Magazyn & Zarządzanie Sklepem CML" }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 167,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30", children: "Panel Medyczny" }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 170,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 166,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Kontrola stanów magazynowych, cen, SKU oraz dodawanie e-usług i preparatów" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 174,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 165,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 161,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onResetProducts,
            className: "px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center gap-1.5",
            title: "Przywróć domyślne produkty CML",
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 186,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Resetuj dane" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 187,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 181,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 193,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 189,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 180,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
      lineNumber: 160,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-950/70 border-b border-slate-800 text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(Package, { className: "w-7 h-7 text-indigo-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 201,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[11px]", children: "Suma pozycji SKU" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 203,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-base font-bold text-slate-100", children: [
            products.length,
            " produktów"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 204,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 202,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 200,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(Boxes, { className: "w-7 h-7 text-teal-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 209,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[11px]", children: "Stan magazynowy" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 211,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-base font-bold text-teal-300", children: [
            totalItems,
            " szt. łączności"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 212,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 210,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 208,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(DollarSign, { className: "w-7 h-7 text-amber-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 217,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[11px]", children: "Wartość magazynu" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 219,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-base font-bold text-amber-300", children: [
            totalValue.toLocaleString("pl-PL"),
            " zł"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 220,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 218,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 216,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-7 h-7 text-rose-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 225,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[11px]", children: "Niski stan / Brak" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 227,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-base font-bold text-rose-300", children: [
            lowStockCount,
            " niskie / ",
            outOfStockCount,
            " brak"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 228,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 226,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 224,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
      lineNumber: 199,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-950/40 border-b border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 w-full sm:w-auto flex-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 max-w-sm", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-slate-500 absolute left-3 top-2.5" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 239,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Szukaj po nazwie lub kodzie SKU...",
              value: searchTerm,
              onChange: (e) => setSearchTerm(e.target.value),
              className: "w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 240,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 238,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: categoryFilter,
            onChange: (e) => setCategoryFilter(e.target.value),
            className: "px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 outline-none focus:border-indigo-500",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "all", children: "Wszystkie kategorie" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 254,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "hygiene", children: "Higiena & Pielęgnacja" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 255,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "post_op", children: "Pooperacyjne & Regeneracja" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 256,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "supplements", children: "Suplementy & Błonnik" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 257,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "skincare", children: "Dermokosmetyki" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 258,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "services", children: "E-Konsultacje i Usługi" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 259,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "packages", children: "Pakiety Zabiegowe" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 260,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 249,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: stockFilter,
            onChange: (e) => setStockFilter(e.target.value),
            className: "px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 outline-none focus:border-indigo-500 hidden md:block",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "all", children: "Wszystkie stany" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 268,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "low", children: "Niski stan (≤ 10 szt.)" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 269,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("option", { value: "out", children: "Brak w magazynie (0 szt.)" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 270,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 263,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 237,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsAddingNew(!isAddingNew),
          className: "w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20",
          children: [
            /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 278,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: isAddingNew ? "Anuluj dodawanie" : "Dodaj produkt / e-usługę" }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 279,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 274,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
      lineNumber: 236,
      columnNumber: 9
    }, this),
    isAddingNew && /* @__PURE__ */ jsxDEV("form", { onSubmit: handleCreateNew, className: "p-4 bg-slate-950 border-b border-slate-800 space-y-3 animate-fade-in text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "font-semibold text-indigo-300 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV(Tag, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 287,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Nowa Pozycja w Magazynie i Sklepie CML" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 288,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 286,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Nazwa produktu / usługi" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 293,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              required: true,
              placeholder: "np. Zestaw Ochronny Po Zabiegu SiLaC",
              value: newProduct.name,
              onChange: (e) => setNewProduct({ ...newProduct, name: e.target.value }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 294,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 292,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Kod SKU" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 305,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              required: true,
              value: newProduct.sku,
              onChange: (e) => setNewProduct({ ...newProduct, sku: e.target.value }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 font-mono outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 306,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 304,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Kategoria" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 316,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: newProduct.category,
              onChange: (e) => setNewProduct({ ...newProduct, category: e.target.value }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 outline-none focus:border-indigo-500",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "hygiene", children: "Higiena & Pielęgnacja" }, void 0, false, {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 322,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "post_op", children: "Pooperacyjne & Regeneracja" }, void 0, false, {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 323,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "supplements", children: "Suplementy & Błonnik" }, void 0, false, {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 324,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "skincare", children: "Dermokosmetyki" }, void 0, false, {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 325,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "services", children: "Usługi & E-Konsultacje" }, void 0, false, {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 326,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "packages", children: "Pakiety Zabiegowe" }, void 0, false, {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 327,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 317,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 315,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 291,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Cena brutto (zł)" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 334,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              required: true,
              min: "1",
              value: newProduct.price,
              onChange: (e) => setNewProduct({ ...newProduct, price: Number(e.target.value) }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 335,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 333,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Cena sugerowana (skreślona)" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 346,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              placeholder: "Opcjonalna",
              value: newProduct.originalPrice || "",
              onChange: (e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) || void 0 }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 347,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 345,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Stan magazynowy (szt.)" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 357,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "number",
              required: true,
              min: "0",
              value: newProduct.stock,
              onChange: (e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 358,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 356,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Etykieta (Badge)" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 369,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "np. Bestseller, Nowość",
              value: newProduct.badge || "",
              onChange: (e) => setNewProduct({ ...newProduct, badge: e.target.value }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 370,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 368,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 332,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Krótki opis produktu" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 382,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Właściwości i opis dla pacjenta...",
              value: newProduct.description,
              onChange: (e) => setNewProduct({ ...newProduct, description: e.target.value }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 383,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 381,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-slate-400 mb-1", children: "Wskazówka medyczna lekarska" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 393,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Zalecenia dr. Jana Bujoka...",
              value: newProduct.medicalNote,
              onChange: (e) => setNewProduct({ ...newProduct, medicalNote: e.target.value }),
              className: "w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-100 outline-none focus:border-indigo-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 394,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 392,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 380,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-2", children: [
        /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-2 text-slate-300 cursor-pointer", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "checkbox",
              checked: newProduct.requiresConsultation,
              onChange: (e) => setNewProduct({ ...newProduct, requiresConsultation: e.target.checked }),
              className: "rounded border-slate-700 bg-slate-900 text-indigo-600"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 406,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("span", { children: "Wymaga wcześniejszej stacjonarnej wizyty w klinice" }, void 0, false, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 412,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 405,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            className: "px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxDEV(Save, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 419,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Zapisz w magazynie" }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 420,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 415,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 404,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
      lineNumber: 285,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 overflow-y-auto flex-1 bg-slate-900/40", children: /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-xs text-slate-300 border-collapse", children: [
      /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-slate-800 text-slate-400 font-semibold bg-slate-950/60 uppercase tracking-wider text-[10px]", children: [
        /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "SKU & Nazwa" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 432,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Kategoria" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 433,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "p-3 text-right", children: "Cena" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 434,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "p-3 text-center", children: "Stan Magazynowy" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 435,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "p-3 text-center", children: "Status" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 436,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("th", { className: "p-3 text-right", children: "Akcje" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 437,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 431,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 430,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-800/60", children: [
        filteredProducts.map((p) => {
          const isEditing = editingId === p.id;
          let statusBadge = /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-950 text-teal-300 border border-teal-500/30", children: [
            "Dostępny (",
            p.stock,
            " szt.)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 445,
            columnNumber: 21
          }, this);
          if (p.stock === 0) {
            statusBadge = /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-950 text-rose-300 border border-rose-500/30", children: "Brak na stanie (0 szt.)" }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 452,
              columnNumber: 23
            }, this);
          } else if (p.stock <= 10) {
            statusBadge = /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 text-amber-300 border border-amber-500/30 animate-pulse", children: [
              "Niski stan (",
              p.stock,
              " szt.)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 458,
              columnNumber: 23
            }, this);
          }
          return /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-800/30 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("td", { className: "p-3", children: isEditing && editForm ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: editForm.sku,
                  onChange: (e) => setEditForm({ ...editForm, sku: e.target.value }),
                  className: "w-28 px-2 py-1 bg-slate-950 border border-slate-700 text-slate-100 font-mono text-[11px] rounded"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 470,
                  columnNumber: 29
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  value: editForm.name,
                  onChange: (e) => setEditForm({ ...editForm, name: e.target.value }),
                  className: "w-full px-2 py-1 bg-slate-950 border border-slate-700 text-slate-100 text-xs rounded"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 476,
                  columnNumber: 29
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 469,
              columnNumber: 27
            }, this) : /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[11px] text-indigo-400 font-bold block", children: p.sku }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 485,
                columnNumber: 29
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-100", children: p.name }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 488,
                columnNumber: 29
              }, this),
              p.badge && /* @__PURE__ */ jsxDEV("span", { className: "ml-2 text-[9px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30", children: p.badge }, void 0, false, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 490,
                columnNumber: 31
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 484,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 467,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-slate-400 font-light", children: p.categoryLabel }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 499,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-right", children: isEditing && editForm ? /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "number",
                value: editForm.price,
                onChange: (e) => setEditForm({ ...editForm, price: Number(e.target.value) }),
                className: "w-20 px-2 py-1 bg-slate-950 border border-slate-700 text-slate-100 font-bold text-xs text-right rounded"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 506,
                columnNumber: 27
              },
              this
            ) : /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-slate-100 text-sm", children: [
                p.price,
                " zł"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 514,
                columnNumber: 29
              }, this),
              p.originalPrice && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 line-through block", children: [
                p.originalPrice,
                " zł"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                lineNumber: 516,
                columnNumber: 31
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 513,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 504,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-center", children: /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => handleStockChange(p, -1),
                  className: "w-6 h-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold flex items-center justify-center border border-slate-800",
                  title: "Zmniejsz stan o 1",
                  children: "-"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 527,
                  columnNumber: 27
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "number",
                  value: p.stock,
                  onChange: (e) => handleDirectStockSet(p, e.target.value),
                  className: "w-12 text-center bg-transparent text-slate-100 font-mono font-bold text-xs outline-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 534,
                  columnNumber: 27
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => handleStockChange(p, 1),
                  className: "w-6 h-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold flex items-center justify-center border border-slate-800",
                  title: "Zwiększ stan o 1",
                  children: "+"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 540,
                  columnNumber: 27
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 526,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 525,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-center", children: statusBadge }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 551,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-right", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-end gap-1.5", children: [
              isEditing ? /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: saveEdit,
                  className: "p-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1",
                  title: "Zapisz zmiany",
                  children: /* @__PURE__ */ jsxDEV(Save, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                    lineNumber: 562,
                    columnNumber: 31
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 557,
                  columnNumber: 29
                },
                this
              ) : /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => startEdit(p),
                  className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300",
                  title: "Edytuj dane",
                  children: /* @__PURE__ */ jsxDEV(Edit2, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                    lineNumber: 570,
                    columnNumber: 31
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 565,
                  columnNumber: 29
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => onDeleteProduct(p.id),
                  className: "p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30",
                  title: "Usuń z magazynu",
                  children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                    lineNumber: 579,
                    columnNumber: 29
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
                  lineNumber: 574,
                  columnNumber: 27
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 555,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
              lineNumber: 554,
              columnNumber: 23
            }, this)
          ] }, p.id, true, {
            fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
            lineNumber: 465,
            columnNumber: 21
          }, this);
        }),
        filteredProducts.length === 0 && /* @__PURE__ */ jsxDEV("tr", { children: /* @__PURE__ */ jsxDEV("td", { colSpan: 6, className: "p-8 text-center text-slate-500", children: "Brak produktów spełniających wybrane kryteria wyszukiwania." }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 589,
          columnNumber: 21
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 588,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 440,
        columnNumber: 15
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
      lineNumber: 429,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
      lineNumber: 428,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
      lineNumber: 427,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-teal-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 602,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Wszystkie stany magazynowe synchronizują się na żywo z koszykiem i ofertą kliniki." }, void 0, false, {
          fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
          lineNumber: 603,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 601,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: "Klinika CML · Branickiego 10/U6 Wilanów" }, void 0, false, {
        fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
        lineNumber: 605,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
      lineNumber: 600,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
    lineNumber: 158,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/InventoryAdminModal.tsx",
    lineNumber: 157,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludmVudG9yeUFkbWluTW9kYWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNob3BQcm9kdWN0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgWCxcbiAgUGFja2FnZSxcbiAgUGx1cyxcbiAgVHJhc2gyLFxuICBFZGl0MixcbiAgU2F2ZSxcbiAgQWxlcnRUcmlhbmdsZSxcbiAgQ2hlY2tDaXJjbGUyLFxuICBTZWFyY2gsXG4gIFJlZnJlc2hDdyxcbiAgVHJlbmRpbmdVcCxcbiAgQm94ZXMsXG4gIERvbGxhclNpZ24sXG4gIFRhZyxcbiAgU2hpZWxkQ2hlY2ssXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBJbnZlbnRvcnlBZG1pbk1vZGFsUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIHByb2R1Y3RzOiBTaG9wUHJvZHVjdFtdO1xuICBvblVwZGF0ZVByb2R1Y3Q6IChwcm9kdWN0OiBTaG9wUHJvZHVjdCkgPT4gdm9pZDtcbiAgb25BZGRQcm9kdWN0OiAocHJvZHVjdDogU2hvcFByb2R1Y3QpID0+IHZvaWQ7XG4gIG9uRGVsZXRlUHJvZHVjdDogKHByb2R1Y3RJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblJlc2V0UHJvZHVjdHM6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBJbnZlbnRvcnlBZG1pbk1vZGFsOiBSZWFjdC5GQzxJbnZlbnRvcnlBZG1pbk1vZGFsUHJvcHM+ID0gKHtcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuICBwcm9kdWN0cyxcbiAgb25VcGRhdGVQcm9kdWN0LFxuICBvbkFkZFByb2R1Y3QsXG4gIG9uRGVsZXRlUHJvZHVjdCxcbiAgb25SZXNldFByb2R1Y3RzLFxufSkgPT4ge1xuICBjb25zdCBbc2VhcmNoVGVybSwgc2V0U2VhcmNoVGVybV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtjYXRlZ29yeUZpbHRlciwgc2V0Q2F0ZWdvcnlGaWx0ZXJdID0gdXNlU3RhdGU8c3RyaW5nPignYWxsJyk7XG4gIGNvbnN0IFtzdG9ja0ZpbHRlciwgc2V0U3RvY2tGaWx0ZXJdID0gdXNlU3RhdGU8J2FsbCcgfCAnbG93JyB8ICdvdXQnPignYWxsJyk7XG4gIFxuICAvLyBTdGF0ZSBmb3IgYWRkaW5nIG5ldyBwcm9kdWN0XG4gIGNvbnN0IFtpc0FkZGluZ05ldywgc2V0SXNBZGRpbmdOZXddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbmV3UHJvZHVjdCwgc2V0TmV3UHJvZHVjdF0gPSB1c2VTdGF0ZTxQYXJ0aWFsPFNob3BQcm9kdWN0Pj4oe1xuICAgIG5hbWU6ICcnLFxuICAgIHNrdTogJ0NNTC1ORVctJyArIE1hdGguZmxvb3IoMTAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwKSxcbiAgICBjYXRlZ29yeTogJ3Bvc3Rfb3AnLFxuICAgIGNhdGVnb3J5TGFiZWw6ICdQcmVwYXJhdHkgUG8gWmFiaWVnYWNoJyxcbiAgICBwcmljZTogOTksXG4gICAgb3JpZ2luYWxQcmljZTogMTIwLFxuICAgIHN0b2NrOiAyNSxcbiAgICBkZXNjcmlwdGlvbjogJycsXG4gICAgbWVkaWNhbE5vdGU6ICdTa29uc3VsdG93YW5lIHogemVzcG/FgmVtIGNoaXJ1cmdpY3pueW0gQ01MLicsXG4gICAgYmFkZ2U6ICdOb3dvxZvEhycsXG4gICAgcmVxdWlyZXNDb25zdWx0YXRpb246IGZhbHNlLFxuICB9KTtcblxuICAvLyBTdGF0ZSBmb3IgZWRpdGluZyBleGlzdGluZyBwcm9kdWN0IGlubGluZVxuICBjb25zdCBbZWRpdGluZ0lkLCBzZXRFZGl0aW5nSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlZGl0Rm9ybSwgc2V0RWRpdEZvcm1dID0gdXNlU3RhdGU8U2hvcFByb2R1Y3QgfCBudWxsPihudWxsKTtcblxuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgLy8gU3RhdGlzdGljc1xuICBjb25zdCB0b3RhbEl0ZW1zID0gcHJvZHVjdHMucmVkdWNlKChzdW0sIHApID0+IHN1bSArIHAuc3RvY2ssIDApO1xuICBjb25zdCB0b3RhbFZhbHVlID0gcHJvZHVjdHMucmVkdWNlKChzdW0sIHApID0+IHN1bSArIHAucHJpY2UgKiBwLnN0b2NrLCAwKTtcbiAgY29uc3QgbG93U3RvY2tDb3VudCA9IHByb2R1Y3RzLmZpbHRlcigocCkgPT4gcC5zdG9jayA+IDAgJiYgcC5zdG9jayA8PSAxMCkubGVuZ3RoO1xuICBjb25zdCBvdXRPZlN0b2NrQ291bnQgPSBwcm9kdWN0cy5maWx0ZXIoKHApID0+IHAuc3RvY2sgPT09IDApLmxlbmd0aDtcblxuICAvLyBGaWx0ZXJpbmdcbiAgY29uc3QgZmlsdGVyZWRQcm9kdWN0cyA9IHByb2R1Y3RzLmZpbHRlcigocCkgPT4ge1xuICAgIGNvbnN0IG1hdGNoZXNTZWFyY2ggPVxuICAgICAgcC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoVGVybS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgcC5za3UudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hUZXJtLnRvTG93ZXJDYXNlKCkpO1xuXG4gICAgY29uc3QgbWF0Y2hlc0NhdGVnb3J5ID0gY2F0ZWdvcnlGaWx0ZXIgPT09ICdhbGwnIHx8IHAuY2F0ZWdvcnkgPT09IGNhdGVnb3J5RmlsdGVyO1xuXG4gICAgbGV0IG1hdGNoZXNTdG9jayA9IHRydWU7XG4gICAgaWYgKHN0b2NrRmlsdGVyID09PSAnbG93JykgbWF0Y2hlc1N0b2NrID0gcC5zdG9jayA+IDAgJiYgcC5zdG9jayA8PSAxMDtcbiAgICBpZiAoc3RvY2tGaWx0ZXIgPT09ICdvdXQnKSBtYXRjaGVzU3RvY2sgPSBwLnN0b2NrID09PSAwO1xuXG4gICAgcmV0dXJuIG1hdGNoZXNTZWFyY2ggJiYgbWF0Y2hlc0NhdGVnb3J5ICYmIG1hdGNoZXNTdG9jaztcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlU3RvY2tDaGFuZ2UgPSAocHJvZHVjdDogU2hvcFByb2R1Y3QsIGRlbHRhOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBuZXdTdG9jayA9IE1hdGgubWF4KDAsIHByb2R1Y3Quc3RvY2sgKyBkZWx0YSk7XG4gICAgb25VcGRhdGVQcm9kdWN0KHsgLi4ucHJvZHVjdCwgc3RvY2s6IG5ld1N0b2NrIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURpcmVjdFN0b2NrU2V0ID0gKHByb2R1Y3Q6IFNob3BQcm9kdWN0LCB2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgdmFsID0gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICBjb25zdCBuZXdTdG9jayA9IGlzTmFOKHZhbCkgPyAwIDogTWF0aC5tYXgoMCwgdmFsKTtcbiAgICBvblVwZGF0ZVByb2R1Y3QoeyAuLi5wcm9kdWN0LCBzdG9jazogbmV3U3RvY2sgfSk7XG4gIH07XG5cbiAgY29uc3Qgc3RhcnRFZGl0ID0gKHByb2R1Y3Q6IFNob3BQcm9kdWN0KSA9PiB7XG4gICAgc2V0RWRpdGluZ0lkKHByb2R1Y3QuaWQpO1xuICAgIHNldEVkaXRGb3JtKHsgLi4ucHJvZHVjdCB9KTtcbiAgfTtcblxuICBjb25zdCBzYXZlRWRpdCA9ICgpID0+IHtcbiAgICBpZiAoZWRpdEZvcm0pIHtcbiAgICAgIG9uVXBkYXRlUHJvZHVjdChlZGl0Rm9ybSk7XG4gICAgICBzZXRFZGl0aW5nSWQobnVsbCk7XG4gICAgICBzZXRFZGl0Rm9ybShudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ3JlYXRlTmV3ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIW5ld1Byb2R1Y3QubmFtZSB8fCAhbmV3UHJvZHVjdC5wcmljZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgY2F0ZWdvcnlMYWJlbHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICBoeWdpZW5lOiAnSGlnaWVuYSAmIFBpZWzEmWduYWNqYScsXG4gICAgICBwb3N0X29wOiAnUG9vcGVyYWN5am5lICYgUmVnZW5lcmFjamEnLFxuICAgICAgc3VwcGxlbWVudHM6ICdTdXBsZW1lbnR5ICYgQsWCb25uaWsnLFxuICAgICAgc2tpbmNhcmU6ICdEZXJtb2tvc21ldHlraScsXG4gICAgICBzZXJ2aWNlczogJ1VzxYJ1Z2kgJiBFLUtvbnN1bHRhY2plJyxcbiAgICAgIHBhY2thZ2VzOiAnUGFraWV0eSBaYWJpZWdvd2UnLFxuICAgIH07XG5cbiAgICBjb25zdCBjcmVhdGVkOiBTaG9wUHJvZHVjdCA9IHtcbiAgICAgIGlkOiBuZXdQcm9kdWN0Lm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9cXHMrL2csICctJykucmVwbGFjZSgvW15hLXowLTktXS9nLCAnJyksXG4gICAgICBza3U6IG5ld1Byb2R1Y3Quc2t1IHx8IGBDTUwtU0tVLSR7RGF0ZS5ub3coKS50b1N0cmluZygpLnNsaWNlKC00KX1gLFxuICAgICAgbmFtZTogbmV3UHJvZHVjdC5uYW1lLFxuICAgICAgY2F0ZWdvcnk6IChuZXdQcm9kdWN0LmNhdGVnb3J5IGFzIGFueSkgfHwgJ3Bvc3Rfb3AnLFxuICAgICAgY2F0ZWdvcnlMYWJlbDogY2F0ZWdvcnlMYWJlbHNbbmV3UHJvZHVjdC5jYXRlZ29yeSB8fCAncG9zdF9vcCddIHx8ICdJbm5lJyxcbiAgICAgIHByaWNlOiBOdW1iZXIobmV3UHJvZHVjdC5wcmljZSkgfHwgMCxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IG5ld1Byb2R1Y3Qub3JpZ2luYWxQcmljZSA/IE51bWJlcihuZXdQcm9kdWN0Lm9yaWdpbmFsUHJpY2UpIDogdW5kZWZpbmVkLFxuICAgICAgc3RvY2s6IE51bWJlcihuZXdQcm9kdWN0LnN0b2NrKSB8fCAwLFxuICAgICAgZGVzY3JpcHRpb246IG5ld1Byb2R1Y3QuZGVzY3JpcHRpb24gfHwgJ09waXMgcHJvZHVrdHUgbWVkeWN6bmVnbyBDTUwuJyxcbiAgICAgIG1lZGljYWxOb3RlOiBuZXdQcm9kdWN0Lm1lZGljYWxOb3RlIHx8ICdSZWtvbWVuZG93YW5lIHByemV6IGRyLiBKYW5hIEJ1am9rYS4nLFxuICAgICAgYmFkZ2U6IG5ld1Byb2R1Y3QuYmFkZ2UgfHwgdW5kZWZpbmVkLFxuICAgICAgcmVxdWlyZXNDb25zdWx0YXRpb246ICEhbmV3UHJvZHVjdC5yZXF1aXJlc0NvbnN1bHRhdGlvbixcbiAgICB9O1xuXG4gICAgb25BZGRQcm9kdWN0KGNyZWF0ZWQpO1xuICAgIHNldElzQWRkaW5nTmV3KGZhbHNlKTtcbiAgICBzZXROZXdQcm9kdWN0KHtcbiAgICAgIG5hbWU6ICcnLFxuICAgICAgc2t1OiAnQ01MLU5FVy0nICsgTWF0aC5mbG9vcigxMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDApLFxuICAgICAgY2F0ZWdvcnk6ICdwb3N0X29wJyxcbiAgICAgIGNhdGVnb3J5TGFiZWw6ICdQcmVwYXJhdHkgUG8gWmFiaWVnYWNoJyxcbiAgICAgIHByaWNlOiA5OSxcbiAgICAgIG9yaWdpbmFsUHJpY2U6IDEyMCxcbiAgICAgIHN0b2NrOiAyNSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnJyxcbiAgICAgIG1lZGljYWxOb3RlOiAnU2tvbnN1bHRvd2FuZSB6IHplc3BvxYJlbSBjaGlydXJnaWN6bnltIENNTC4nLFxuICAgICAgYmFkZ2U6ICdOb3dvxZvEhycsXG4gICAgICByZXF1aXJlc0NvbnN1bHRhdGlvbjogZmFsc2UsXG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvODUgYmFja2Ryb3AtYmx1ci1tZCBwLTQgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy01eGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzgwIHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgaC1bOTB2aF1cIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgc206cC01IGJnLXNsYXRlLTk1MCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1pbmRpZ28tOTUwIHRleHQtaW5kaWdvLTMwMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvNDBcIj5cbiAgICAgICAgICAgICAgPEJveGVzIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQtbGcgZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgICBNYWdhenluICYgWmFyesSFZHphbmllIFNrbGVwZW0gQ01MXG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIGJnLWluZGlnby01MDAvMjAgdGV4dC1pbmRpZ28tMzAwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMFwiPlxuICAgICAgICAgICAgICAgICAgUGFuZWwgTWVkeWN6bnlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgS29udHJvbGEgc3RhbsOzdyBtYWdhenlub3d5Y2gsIGNlbiwgU0tVIG9yYXogZG9kYXdhbmllIGUtdXPFgnVnIGkgcHJlcGFyYXTDs3dcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uUmVzZXRQcm9kdWN0c31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiUHJ6eXdyw7PEhyBkb215xZtsbmUgcHJvZHVrdHkgQ01MXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj5SZXNldHVqIGRhbmU8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogSW52ZW50b3J5IFN1bW1hcnkgTWV0cmljcyBLUEkgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBnYXAtMyBwLTQgYmctc2xhdGUtOTUwLzcwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8UGFja2FnZSBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtaW5kaWdvLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdXCI+U3VtYSBwb3p5Y2ppIFNLVTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDBcIj57cHJvZHVjdHMubGVuZ3RofSBwcm9kdWt0w7N3PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8Qm94ZXMgY2xhc3NOYW1lPVwidy03IGgtNyB0ZXh0LXRlYWwtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF1cIj5TdGFuIG1hZ2F6eW5vd3k8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtdGVhbC0zMDBcIj57dG90YWxJdGVtc30gc3p0LiDFgsSFY3pub8WbY2k8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxEb2xsYXJTaWduIGNsYXNzTmFtZT1cInctNyBoLTcgdGV4dC1hbWJlci00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XVwiPldhcnRvxZvEhyBtYWdhenludTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1hbWJlci0zMDBcIj57dG90YWxWYWx1ZS50b0xvY2FsZVN0cmluZygncGwtUEwnKX0gesWCPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTcgaC03IHRleHQtcm9zZS00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XVwiPk5pc2tpIHN0YW4gLyBCcmFrPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LXJvc2UtMzAwXCI+XG4gICAgICAgICAgICAgICAge2xvd1N0b2NrQ291bnR9IG5pc2tpZSAvIHtvdXRPZlN0b2NrQ291bnR9IGJyYWtcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFRvb2xiYXI6IFNlYXJjaCAmIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1zbGF0ZS05NTAvNDAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGdhcC0zIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHctZnVsbCBzbTp3LWF1dG8gZmxleC0xXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXgtMSBtYXgtdy1zbVwiPlxuICAgICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1zbGF0ZS01MDAgYWJzb2x1dGUgbGVmdC0zIHRvcC0yLjVcIiAvPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTenVrYWogcG8gbmF6d2llIGx1YiBrb2R6aWUgU0tVLi4uXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNoVGVybX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaFRlcm0oZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC05IHByLTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXItc2xhdGUtNTAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICB2YWx1ZT17Y2F0ZWdvcnlGaWx0ZXJ9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q2F0ZWdvcnlGaWx0ZXIoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGxcIj5Xc3p5c3RraWUga2F0ZWdvcmllPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJoeWdpZW5lXCI+SGlnaWVuYSAmIFBpZWzEmWduYWNqYTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicG9zdF9vcFwiPlBvb3BlcmFjeWpuZSAmIFJlZ2VuZXJhY2phPC9vcHRpb24+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdXBwbGVtZW50c1wiPlN1cGxlbWVudHkgJiBCxYJvbm5pazwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2tpbmNhcmVcIj5EZXJtb2tvc21ldHlraTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2VydmljZXNcIj5FLUtvbnN1bHRhY2plIGkgVXPFgnVnaTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicGFja2FnZXNcIj5QYWtpZXR5IFphYmllZ293ZTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e3N0b2NrRmlsdGVyfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFN0b2NrRmlsdGVyKGUudGFyZ2V0LnZhbHVlIGFzIGFueSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgb3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwIGhpZGRlbiBtZDpibG9ja1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGxcIj5Xc3p5c3RraWUgc3Rhbnk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxvd1wiPk5pc2tpIHN0YW4gKOKJpCAxMCBzenQuKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwib3V0XCI+QnJhayB3IG1hZ2F6eW5pZSAoMCBzenQuKTwvb3B0aW9uPlxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0FkZGluZ05ldyghaXNBZGRpbmdOZXcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHNtOnctYXV0byBweC00IHB5LTIgcm91bmRlZC14bCBiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBmb250LXNlbWlib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHNoYWRvdy1pbmRpZ28tNjAwLzIwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntpc0FkZGluZ05ldyA/ICdBbnVsdWogZG9kYXdhbmllJyA6ICdEb2RhaiBwcm9kdWt0IC8gZS11c8WCdWfEmSd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQWRkIE5ldyBQcm9kdWN0IEZvcm0gRHJhd2VyICovfVxuICAgICAgICB7aXNBZGRpbmdOZXcgJiYgKFxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVDcmVhdGVOZXd9IGNsYXNzTmFtZT1cInAtNCBiZy1zbGF0ZS05NTAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTMgYW5pbWF0ZS1mYWRlLWluIHRleHQteHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWluZGlnby0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8VGFnIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+Tm93YSBQb3p5Y2phIHcgTWFnYXp5bmllIGkgU2tsZXBpZSBDTUw8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy00IGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMlwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+TmF6d2EgcHJvZHVrdHUgLyB1c8WCdWdpPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm5wLiBaZXN0YXcgT2Nocm9ubnkgUG8gWmFiaWVndSBTaUxhQ1wiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJvZHVjdC5uYW1lfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQcm9kdWN0KHsgLi4ubmV3UHJvZHVjdCwgbmFtZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXItc2xhdGUtNTAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS00MDAgbWItMVwiPktvZCBTS1U8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdQcm9kdWN0LnNrdX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3UHJvZHVjdCh7IC4uLm5ld1Byb2R1Y3QsIHNrdTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0xMDAgZm9udC1tb25vIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS00MDAgbWItMVwiPkthdGVnb3JpYTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e25ld1Byb2R1Y3QuY2F0ZWdvcnl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE5ld1Byb2R1Y3QoeyAuLi5uZXdQcm9kdWN0LCBjYXRlZ29yeTogZS50YXJnZXQudmFsdWUgYXMgYW55IH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMS41IHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMTAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImh5Z2llbmVcIj5IaWdpZW5hICYgUGllbMSZZ25hY2phPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicG9zdF9vcFwiPlBvb3BlcmFjeWpuZSAmIFJlZ2VuZXJhY2phPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic3VwcGxlbWVudHNcIj5TdXBsZW1lbnR5ICYgQsWCb25uaWs8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJza2luY2FyZVwiPkRlcm1va29zbWV0eWtpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2VydmljZXNcIj5Vc8WCdWdpICYgRS1Lb25zdWx0YWNqZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInBhY2thZ2VzXCI+UGFraWV0eSBaYWJpZWdvd2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy00IGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNDAwIG1iLTFcIj5DZW5hIGJydXR0byAoesWCKTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICBtaW49XCIxXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdQcm9kdWN0LnByaWNlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQcm9kdWN0KHsgLi4ubmV3UHJvZHVjdCwgcHJpY2U6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0xMDAgb3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+Q2VuYSBzdWdlcm93YW5hIChza3JlxZtsb25hKTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiT3Bjam9uYWxuYVwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJvZHVjdC5vcmlnaW5hbFByaWNlIHx8ICcnfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQcm9kdWN0KHsgLi4ubmV3UHJvZHVjdCwgb3JpZ2luYWxQcmljZTogTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSB8fCB1bmRlZmluZWQgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0xMDAgb3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+U3RhbiBtYWdhenlub3d5IChzenQuKTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICBtaW49XCIwXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtuZXdQcm9kdWN0LnN0b2NrfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXROZXdQcm9kdWN0KHsgLi4ubmV3UHJvZHVjdCwgc3RvY2s6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0xMDAgb3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+RXR5a2lldGEgKEJhZGdlKTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm5wLiBCZXN0c2VsbGVyLCBOb3dvxZvEh1wiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJvZHVjdC5iYWRnZSB8fCAnJ31cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3UHJvZHVjdCh7IC4uLm5ld1Byb2R1Y3QsIGJhZGdlOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTEwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNsYXRlLTQwMCBtYi0xXCI+S3LDs3RraSBvcGlzIHByb2R1a3R1PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV8WCYcWbY2l3b8WbY2kgaSBvcGlzIGRsYSBwYWNqZW50YS4uLlwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJvZHVjdC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3UHJvZHVjdCh7IC4uLm5ld1Byb2R1Y3QsIGRlc2NyaXB0aW9uOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTEwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNDAwIG1iLTFcIj5Xc2thesOzd2thIG1lZHljem5hIGxla2Fyc2thPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiWmFsZWNlbmlhIGRyLiBKYW5hIEJ1am9rYS4uLlwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17bmV3UHJvZHVjdC5tZWRpY2FsTm90ZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3UHJvZHVjdCh7IC4uLm5ld1Byb2R1Y3QsIG1lZGljYWxOb3RlOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTEwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB0LTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc2xhdGUtMzAwIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgY2hlY2tlZD17bmV3UHJvZHVjdC5yZXF1aXJlc0NvbnN1bHRhdGlvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0TmV3UHJvZHVjdCh7IC4uLm5ld1Byb2R1Y3QsIHJlcXVpcmVzQ29uc3VsdGF0aW9uOiBlLnRhcmdldC5jaGVja2VkIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCBib3JkZXItc2xhdGUtNzAwIGJnLXNsYXRlLTkwMCB0ZXh0LWluZGlnby02MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+V3ltYWdhIHdjemXFm25pZWpzemVqIHN0YWNqb25hcm5laiB3aXp5dHkgdyBrbGluaWNlPC9zcGFuPlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC1sZyBiZy10ZWFsLTYwMCBob3ZlcjpiZy10ZWFsLTUwMCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxTYXZlIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlphcGlzeiB3IG1hZ2F6eW5pZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIEludmVudG9yeSBQcm9kdWN0IFRhYmxlICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBvdmVyZmxvdy15LWF1dG8gZmxleC0xIGJnLXNsYXRlLTkwMC80MFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGJvcmRlci1jb2xsYXBzZVwiPlxuICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgZm9udC1zZW1pYm9sZCBiZy1zbGF0ZS05NTAvNjAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0zXCI+U0tVICYgTmF6d2E8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtM1wiPkthdGVnb3JpYTwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0zIHRleHQtcmlnaHRcIj5DZW5hPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTMgdGV4dC1jZW50ZXJcIj5TdGFuIE1hZ2F6eW5vd3k8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtMyB0ZXh0LWNlbnRlclwiPlN0YXR1czwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0zIHRleHQtcmlnaHRcIj5Ba2NqZTwvdGg+XG4gICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgPHRib2R5IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1zbGF0ZS04MDAvNjBcIj5cbiAgICAgICAgICAgICAgICB7ZmlsdGVyZWRQcm9kdWN0cy5tYXAoKHApID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRWRpdGluZyA9IGVkaXRpbmdJZCA9PT0gcC5pZDtcblxuICAgICAgICAgICAgICAgICAgbGV0IHN0YXR1c0JhZGdlID0gKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCBiZy10ZWFsLTk1MCB0ZXh0LXRlYWwtMzAwIGJvcmRlciBib3JkZXItdGVhbC01MDAvMzBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBEb3N0xJlwbnkgKHtwLnN0b2NrfSBzenQuKVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICBpZiAocC5zdG9jayA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXNCYWRnZSA9IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCBiZy1yb3NlLTk1MCB0ZXh0LXJvc2UtMzAwIGJvcmRlciBib3JkZXItcm9zZS01MDAvMzBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEJyYWsgbmEgc3RhbmllICgwIHN6dC4pXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwLnN0b2NrIDw9IDEwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0JhZGdlID0gKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIGJnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBOaXNraSBzdGFuICh7cC5zdG9ja30gc3p0LilcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e3AuaWR9IGNsYXNzTmFtZT1cImhvdmVyOmJnLXNsYXRlLTgwMC8zMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBTS1UgJiBOYW1lICovfVxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc0VkaXRpbmcgJiYgZWRpdEZvcm0gPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZWRpdEZvcm0uc2t1fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFZGl0Rm9ybSh7IC4uLmVkaXRGb3JtLCBza3U6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0yOCBweC0yIHB5LTEgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMTAwIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSByb3VuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRGb3JtLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEVkaXRGb3JtKHsgLi4uZWRpdEZvcm0sIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTIgcHktMSBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0xMDAgdGV4dC14cyByb3VuZGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtaW5kaWdvLTQwMCBmb250LWJvbGQgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwLnNrdX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTEwMFwiPntwLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwLmJhZGdlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1sLTIgdGV4dC1bOXB4XSBweC0xLjUgcHktMC4yIHJvdW5kZWQgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwLmJhZGdlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIENhdGVnb3J5ICovfVxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTMgdGV4dC1zbGF0ZS00MDAgZm9udC1saWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3AuY2F0ZWdvcnlMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIFByaWNlICovfVxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTMgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzRWRpdGluZyAmJiBlZGl0Rm9ybSA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VkaXRGb3JtLnByaWNlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RWRpdEZvcm0oeyAuLi5lZGl0Rm9ybSwgcHJpY2U6IE51bWJlcihlLnRhcmdldC52YWx1ZSkgfSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0yMCBweC0yIHB5LTEgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMTAwIGZvbnQtYm9sZCB0ZXh0LXhzIHRleHQtcmlnaHQgcm91bmRlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMCB0ZXh0LXNtXCI+e3AucHJpY2V9IHrFgjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cC5vcmlnaW5hbFByaWNlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGxpbmUtdGhyb3VnaCBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cC5vcmlnaW5hbFByaWNlfSB6xYJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBTdG9jayBMZXZlbCBEaXJlY3QgQWRqdXN0ZXIgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMyB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBiZy1zbGF0ZS05NTAgcC0xIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVN0b2NrQ2hhbmdlKHAsIC0xKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTYgaC02IHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTIwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiWm1uaWVqc3ogc3RhbiBvIDFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3Auc3RvY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVEaXJlY3RTdG9ja1NldChwLCBlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0xMiB0ZXh0LWNlbnRlciBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTEwMCBmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVN0b2NrQ2hhbmdlKHAsIDEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNiBoLTYgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMjAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJad2nEmWtzeiBzdGFuIG8gMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBTdGF0dXMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMyB0ZXh0LWNlbnRlclwiPntzdGF0dXNCYWRnZX08L3RkPlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIEFjdGlvbnMgKi99XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMyB0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2lzRWRpdGluZyA/IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtzYXZlRWRpdH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgYmctdGVhbC02MDAgaG92ZXI6YmctdGVhbC01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJaYXBpc3ogem1pYW55XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U2F2ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc3RhcnRFZGl0KHApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRWR5dHVqIGRhbmVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxFZGl0MiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uRGVsZXRlUHJvZHVjdChwLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXJvc2UtOTUwLzYwIGhvdmVyOmJnLXJvc2UtOTAwIHRleHQtcm9zZS0zMDAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC8zMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJVc3XFhCB6IG1hZ2F6eW51XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxUcmFzaDIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuXG4gICAgICAgICAgICAgICAge2ZpbHRlcmVkUHJvZHVjdHMubGVuZ3RoID09PSAwICYmIChcbiAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgPHRkIGNvbFNwYW49ezZ9IGNsYXNzTmFtZT1cInAtOCB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTUwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIEJyYWsgcHJvZHVrdMOzdyBzcGXFgm5pYWrEhWN5Y2ggd3licmFuZSBrcnl0ZXJpYSB3eXN6dWtpd2FuaWEuXG4gICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRm9vdGVyIGluZm8gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTk1MCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC10ZWFsLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Xc3p5c3RraWUgc3RhbnkgbWFnYXp5bm93ZSBzeW5jaHJvbml6dWrEhSBzacSZIG5hIMW8eXdvIHoga29zenlraWVtIGkgb2ZlcnTEhSBrbGluaWtpLjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8c3Bhbj5LbGluaWthIENNTCDCtyBCcmFuaWNraWVnbyAxMC9VNiBXaWxhbsOzdzwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAg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