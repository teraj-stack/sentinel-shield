import __vite__cjsImport0_react_jsxDevRuntime from "/apps/nextgen_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c2c0e3b9"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/nextgen_clinic/node_modules/.vite/deps/react.js?v=c2c0e3b9"; const useState = __vite__cjsImport1_react["useState"];
import {
  DEPARTMENTS,
  PRODUCTS
} from "/apps/nextgen_clinic/src/data/clinicData.ts";
import { Navbar } from "/apps/nextgen_clinic/src/components/Navbar.tsx";
import { ParallaxWindowView } from "/apps/nextgen_clinic/src/components/ParallaxWindowView.tsx";
import { DepartmentModal } from "/apps/nextgen_clinic/src/components/DepartmentModal.tsx";
import { ShopDrawer } from "/apps/nextgen_clinic/src/components/ShopDrawer.tsx";
import { BookingModal } from "/apps/nextgen_clinic/src/components/BookingModal.tsx";
import { Footer } from "/apps/nextgen_clinic/src/components/Footer.tsx";
import {
  Activity,
  ShieldAlert,
  Zap,
  ShoppingBag,
  ChevronRight
} from "/apps/nextgen_clinic/node_modules/.vite/deps/lucide-react.js?v=93a6f22a";
export default function App() {
  const [activeTimeOfDay, setActiveTimeOfDay] = useState("noon");
  const [selectedDeptId, setSelectedDeptId] = useState(null);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDeptId, setBookingDeptId] = useState(void 0);
  const [bookingTreatmentId, setBookingTreatmentId] = useState(void 0);
  const [cart, setCart] = useState([]);
  const [lang, setLang] = useState("pl");
  const selectedDepartment = DEPARTMENTS.find((d) => d.id === selectedDeptId) || null;
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map(
          (item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };
  const handleUpdateQuantity = (productId, delta) => {
    setCart(
      (prev) => prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter((item) => item !== null)
    );
  };
  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };
  const handleClearCart = () => {
    setCart([]);
  };
  const handleOpenDepartment = (id) => {
    if (id === "shop") {
      setIsShopOpen(true);
    } else {
      setSelectedDeptId(id);
    }
  };
  const handleOpenBookingForDept = (departmentId, treatmentId) => {
    setBookingDeptId(departmentId);
    setBookingTreatmentId(treatmentId);
    setIsBookingOpen(true);
  };
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-slate-50 font-sans antialiased text-slate-900 selection:bg-sky-500 selection:text-white", children: [
    /* @__PURE__ */ jsxDEV(
      Navbar,
      {
        activeTimeOfDay,
        onSelectTimeOfDay: setActiveTimeOfDay,
        cartCount: totalCartCount,
        onOpenShop: () => setIsShopOpen(true),
        onOpenBooking: () => {
          setBookingDeptId(void 0);
          setBookingTreatmentId(void 0);
          setIsBookingOpen(true);
        },
        lang,
        onToggleLang: () => setLang((l) => l === "pl" ? "en" : "pl"),
        onSelectDepartment: handleOpenDepartment
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 104,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("main", { className: "relative", children: [
      /* @__PURE__ */ jsxDEV(
        ParallaxWindowView,
        {
          departments: DEPARTMENTS,
          activeTimeOfDay,
          selectedDeptId,
          onSelectDepartment: handleOpenDepartment,
          lang
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 121,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("section", { className: "py-20 bg-white border-y border-slate-200/80", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-3xl mx-auto space-y-3", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold uppercase tracking-widest text-sky-700 px-3 py-1 rounded-full bg-sky-50 border border-sky-100", children: lang === "pl" ? "Standardy Kliniczne ISO Class 5" : "ISO Class 5 Clinical Excellence" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 136,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl sm:text-4xl font-black text-slate-900 tracking-tight", children: lang === "pl" ? "Dlaczego Next Generation Clinic?" : "Why Choose Next Generation Clinic?" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 139,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-600 leading-relaxed", children: lang === "pl" ? "Łączymy precyzję lasera diodowego 1470nm z bezbolesnymi protokołami zabiegowymi, dając Ci gwarancję bezpieczeństwa i najwyższego komfortu." : "Uniting 1470nm diode laser precision with pain-free treatment protocols to guarantee maximum safety and rapid recovery." }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 142,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 135,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-sky-300 hover:shadow-xl transition-all space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 154,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 153,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-slate-900", children: lang === "pl" ? "Proktologia Laserowa" : "Laser Proctology" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 156,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-600 leading-relaxed", children: lang === "pl" ? "Protokół LHP® bez cięcia tkanki. Zabieg w znieczuleniu miejscowym pozwala na powrót do domu w dniu zabiegu." : "LHP® protocol without tissue cutting. Local anesthesia enables same-day discharge." }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 159,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleOpenDepartment("proctology"),
                className: "text-xs font-bold text-sky-700 hover:text-sky-800 flex items-center gap-1 pt-2",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Sprawdź cennik proktologii" : "Check Proctology Pricing" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 168,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 169,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 164,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 152,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 hover:shadow-xl transition-all space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 175,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 174,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-slate-900", children: lang === "pl" ? "Chirurgia 3D Laparoskopowa" : "3D Laparoscopic Surgery" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 177,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-600 leading-relaxed", children: lang === "pl" ? "Salę operacyjną z nawiewem laminarnym wspiera wizualizacja 4K 3D i mikrosiatki biologiczne wzmacniające powłoki." : "Laminar flow operating suite backed by 4K 3D visualization and biological tissue reinforcing meshes." }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 180,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleOpenDepartment("surgery"),
                className: "text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 pt-2",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Sprawdź procedury chirurgiczne" : "Explore Surgical Procedures" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 189,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 190,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 185,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 173,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-8 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-xl transition-all space-y-4", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 196,
              columnNumber: 19
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 195,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-slate-900", children: lang === "pl" ? "Flebologia & USG Doppler" : "Phlebology & Doppler USG" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 198,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-600 leading-relaxed", children: lang === "pl" ? "Mapowanie przewlekłej niewydolności żylnej i małoinwazyjne zamykanie żylaków laserem EVLT® 1470nm." : "Mapping of venous insufficiency and minimally invasive EVLT® 1470nm radial laser ablation." }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 201,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleOpenDepartment("phlebology"),
                className: "text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 pt-2",
                children: [
                  /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Sprawdź zabiegi flebologii" : "Explore Phlebology" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 210,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/App.tsx",
                    lineNumber: 211,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 206,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 194,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 150,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 133,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 132,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { className: "py-16 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 225,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 max-w-2xl", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30", children: [
              /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 231,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Oficjalny Sklep Medyczny Kliniki" : "Official Clinic Apothecary Shop" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 232,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 230,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-2xl sm:text-4xl font-extrabold tracking-tight", children: lang === "pl" ? "Dedykowane Wyroby Medyczne & Kompresjoterapia" : "Certified Medical Products & Compression Garments" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 235,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 leading-relaxed", children: lang === "pl" ? "Kup bezpośrednio pończochy uciskowe CCL1/CCL2, opatrunki hydrokoloidowe na blizny oraz preparaty na bazie diosminy zmikronizowanej z dostawą do domu." : "Order CCL1/CCL2 compression wear, hydrocolloid scar dressings, and micronized diosmin supplements directly for home delivery." }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 239,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 229,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsShopOpen(true),
              className: "px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all shrink-0 flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-5 h-5" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 250,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Wejdź do Sklepu" : "Enter Store" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 251,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 246,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 227,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 223,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("section", { className: "py-20 bg-slate-50", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-2xl mx-auto space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold uppercase tracking-widest text-indigo-700", children: lang === "pl" ? "Nasi Eksperci" : "Our Senior Specialists" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 264,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-3xl font-black text-slate-900 tracking-tight", children: lang === "pl" ? "Doświadczony Zespół Lekarski" : "Expert Medical Faculty" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 267,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 263,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: DEPARTMENTS.flatMap((d) => d.doctors).slice(0, 3).map((doc) => /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md space-y-4", children: [
          /* @__PURE__ */ jsxDEV(
            "img",
            {
              src: doc.avatar,
              alt: doc.name,
              className: "w-20 h-20 rounded-2xl object-cover border-2 border-sky-100 shadow-sm",
              referrerPolicy: "no-referrer"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 275,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-extrabold text-slate-900", children: doc.name }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 282,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-sky-700 font-bold", children: doc.title }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 283,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500", children: doc.specialty }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 284,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 281,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600", children: [
            /* @__PURE__ */ jsxDEV("span", { children: [
              doc.experienceYears,
              " ",
              lang === "pl" ? "lat w chirurgii" : "years in surgery"
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 287,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => {
                  setBookingDeptId("proctology");
                  setIsBookingOpen(true);
                },
                className: "text-sky-600 font-bold hover:underline",
                children: lang === "pl" ? "Umów" : "Book"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 288,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 286,
            columnNumber: 19
          }, this)
        ] }, doc.id, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 274,
          columnNumber: 17
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 272,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 261,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 260,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      Footer,
      {
        lang,
        onSelectDepartment: handleOpenDepartment,
        onOpenBooking: () => {
          setBookingDeptId(void 0);
          setBookingTreatmentId(void 0);
          setIsBookingOpen(true);
        }
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 308,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      DepartmentModal,
      {
        department: selectedDepartment,
        onClose: () => setSelectedDeptId(null),
        onBookTreatment: handleOpenBookingForDept,
        lang
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 319,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      ShopDrawer,
      {
        isOpen: isShopOpen,
        onClose: () => setIsShopOpen(false),
        products: PRODUCTS,
        cart,
        onAddToCart: handleAddToCart,
        onUpdateQuantity: handleUpdateQuantity,
        onRemoveFromCart: handleRemoveFromCart,
        onClearCart: handleClearCart,
        lang
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 327,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      BookingModal,
      {
        isOpen: isBookingOpen,
        onClose: () => setIsBookingOpen(false),
        departments: DEPARTMENTS,
        initialDeptId: bookingDeptId,
        initialTreatmentId: bookingTreatmentId,
        lang
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 340,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 101,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIERFUEFSVE1FTlRTLCBcbiAgUFJPRFVDVFMgXG59IGZyb20gJy4vZGF0YS9jbGluaWNEYXRhJztcbmltcG9ydCB7IFxuICBEZXBhcnRtZW50LCBcbiAgUHJvZHVjdCwgXG4gIENhcnRJdGVtLCBcbiAgVGltZU9mRGF5IFxufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IE5hdmJhciB9IGZyb20gJy4vY29tcG9uZW50cy9OYXZiYXInO1xuaW1wb3J0IHsgUGFyYWxsYXhXaW5kb3dWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL1BhcmFsbGF4V2luZG93Vmlldyc7XG5pbXBvcnQgeyBEZXBhcnRtZW50TW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvRGVwYXJ0bWVudE1vZGFsJztcbmltcG9ydCB7IFNob3BEcmF3ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvU2hvcERyYXdlcic7XG5pbXBvcnQgeyBCb29raW5nTW9kYWwgfSBmcm9tICcuL2NvbXBvbmVudHMvQm9va2luZ01vZGFsJztcbmltcG9ydCB7IEZvb3RlciB9IGZyb20gJy4vY29tcG9uZW50cy9Gb290ZXInO1xuaW1wb3J0IHsgXG4gIFNwYXJrbGVzLCBcbiAgQWN0aXZpdHksIFxuICBTaGllbGRBbGVydCwgXG4gIFphcCwgXG4gIFNob3BwaW5nQmFnLCBcbiAgQXdhcmQsIFxuICBDaGVja0NpcmNsZTIsIFxuICBDbG9jaywgXG4gIFBob25lQ2FsbCwgXG4gIENoZXZyb25SaWdodCxcbiAgU2hpZWxkQ2hlY2ssXG4gIFN0ZXRob3Njb3BlLFxuICBIZWFydFB1bHNlXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgW2FjdGl2ZVRpbWVPZkRheSwgc2V0QWN0aXZlVGltZU9mRGF5XSA9IHVzZVN0YXRlPFRpbWVPZkRheT4oJ25vb24nKTtcbiAgY29uc3QgW3NlbGVjdGVkRGVwdElkLCBzZXRTZWxlY3RlZERlcHRJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzU2hvcE9wZW4sIHNldElzU2hvcE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNCb29raW5nT3Blbiwgc2V0SXNCb29raW5nT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtib29raW5nRGVwdElkLCBzZXRCb29raW5nRGVwdElkXSA9IHVzZVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgY29uc3QgW2Jvb2tpbmdUcmVhdG1lbnRJZCwgc2V0Qm9va2luZ1RyZWF0bWVudElkXSA9IHVzZVN0YXRlPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbiAgY29uc3QgW2NhcnQsIHNldENhcnRdID0gdXNlU3RhdGU8Q2FydEl0ZW1bXT4oW10pO1xuICBjb25zdCBbbGFuZywgc2V0TGFuZ10gPSB1c2VTdGF0ZTwncGwnIHwgJ2VuJz4oJ3BsJyk7XG5cbiAgLy8gQWN0aXZlIGRlcGFydG1lbnQgbW9kYWwgZGF0YVxuICBjb25zdCBzZWxlY3RlZERlcGFydG1lbnQgPSBERVBBUlRNRU5UUy5maW5kKChkKSA9PiBkLmlkID09PSBzZWxlY3RlZERlcHRJZCkgfHwgbnVsbDtcblxuICAvLyBDYXJ0IEhhbmRsZXJzXG4gIGNvbnN0IGhhbmRsZUFkZFRvQ2FydCA9IChwcm9kdWN0OiBQcm9kdWN0KSA9PiB7XG4gICAgc2V0Q2FydCgocHJldikgPT4ge1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSBwcmV2LmZpbmQoKGl0ZW0pID0+IGl0ZW0ucHJvZHVjdC5pZCA9PT0gcHJvZHVjdC5pZCk7XG4gICAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgICAgcmV0dXJuIHByZXYubWFwKChpdGVtKSA9PlxuICAgICAgICAgIGl0ZW0ucHJvZHVjdC5pZCA9PT0gcHJvZHVjdC5pZFxuICAgICAgICAgICAgPyB7IC4uLml0ZW0sIHF1YW50aXR5OiBpdGVtLnF1YW50aXR5ICsgMSB9XG4gICAgICAgICAgICA6IGl0ZW1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbLi4ucHJldiwgeyBwcm9kdWN0LCBxdWFudGl0eTogMSB9XTtcbiAgICB9KTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVVcGRhdGVRdWFudGl0eSA9IChwcm9kdWN0SWQ6IHN0cmluZywgZGVsdGE6IG51bWJlcikgPT4ge1xuICAgIHNldENhcnQoKHByZXYpID0+XG4gICAgICBwcmV2XG4gICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5wcm9kdWN0LmlkID09PSBwcm9kdWN0SWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1F0eSA9IGl0ZW0ucXVhbnRpdHkgKyBkZWx0YTtcbiAgICAgICAgICAgIHJldHVybiBuZXdRdHkgPiAwID8geyAuLi5pdGVtLCBxdWFudGl0eTogbmV3UXR5IH0gOiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoaXRlbSk6IGl0ZW0gaXMgQ2FydEl0ZW0gPT4gaXRlbSAhPT0gbnVsbClcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJlbW92ZUZyb21DYXJ0ID0gKHByb2R1Y3RJZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q2FydCgocHJldikgPT4gcHJldi5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ucHJvZHVjdC5pZCAhPT0gcHJvZHVjdElkKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xlYXJDYXJ0ID0gKCkgPT4ge1xuICAgIHNldENhcnQoW10pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZU9wZW5EZXBhcnRtZW50ID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoaWQgPT09ICdzaG9wJykge1xuICAgICAgc2V0SXNTaG9wT3Blbih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0U2VsZWN0ZWREZXB0SWQoaWQpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVPcGVuQm9va2luZ0ZvckRlcHQgPSAoZGVwYXJ0bWVudElkOiBzdHJpbmcsIHRyZWF0bWVudElkPzogc3RyaW5nKSA9PiB7XG4gICAgc2V0Qm9va2luZ0RlcHRJZChkZXBhcnRtZW50SWQpO1xuICAgIHNldEJvb2tpbmdUcmVhdG1lbnRJZCh0cmVhdG1lbnRJZCk7XG4gICAgc2V0SXNCb29raW5nT3Blbih0cnVlKTtcbiAgfTtcblxuICBjb25zdCB0b3RhbENhcnRDb3VudCA9IGNhcnQucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0ucXVhbnRpdHksIDApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctc2xhdGUtNTAgZm9udC1zYW5zIGFudGlhbGlhc2VkIHRleHQtc2xhdGUtOTAwIHNlbGVjdGlvbjpiZy1za3ktNTAwIHNlbGVjdGlvbjp0ZXh0LXdoaXRlXCI+XG4gICAgICBcbiAgICAgIHsvKiBUb3AgTmF2aWdhdGlvbiBCYXIgKi99XG4gICAgICA8TmF2YmFyXG4gICAgICAgIGFjdGl2ZVRpbWVPZkRheT17YWN0aXZlVGltZU9mRGF5fVxuICAgICAgICBvblNlbGVjdFRpbWVPZkRheT17c2V0QWN0aXZlVGltZU9mRGF5fVxuICAgICAgICBjYXJ0Q291bnQ9e3RvdGFsQ2FydENvdW50fVxuICAgICAgICBvbk9wZW5TaG9wPXsoKSA9PiBzZXRJc1Nob3BPcGVuKHRydWUpfVxuICAgICAgICBvbk9wZW5Cb29raW5nPXsoKSA9PiB7XG4gICAgICAgICAgc2V0Qm9va2luZ0RlcHRJZCh1bmRlZmluZWQpO1xuICAgICAgICAgIHNldEJvb2tpbmdUcmVhdG1lbnRJZCh1bmRlZmluZWQpO1xuICAgICAgICAgIHNldElzQm9va2luZ09wZW4odHJ1ZSk7XG4gICAgICAgIH19XG4gICAgICAgIGxhbmc9e2xhbmd9XG4gICAgICAgIG9uVG9nZ2xlTGFuZz17KCkgPT4gc2V0TGFuZyhsID0+IGwgPT09ICdwbCcgPyAnZW4nIDogJ3BsJyl9XG4gICAgICAgIG9uU2VsZWN0RGVwYXJ0bWVudD17aGFuZGxlT3BlbkRlcGFydG1lbnR9XG4gICAgICAvPlxuXG4gICAgICB7LyogSGVybyBQYXJhbGxheCBBcmNoaXRlY3R1cmFsIFdpbmRvdyBHYWxsZXJ5IFNlY3Rpb24gKi99XG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICA8UGFyYWxsYXhXaW5kb3dWaWV3XG4gICAgICAgICAgZGVwYXJ0bWVudHM9e0RFUEFSVE1FTlRTfVxuICAgICAgICAgIGFjdGl2ZVRpbWVPZkRheT17YWN0aXZlVGltZU9mRGF5fVxuICAgICAgICAgIHNlbGVjdGVkRGVwdElkPXtzZWxlY3RlZERlcHRJZH1cbiAgICAgICAgICBvblNlbGVjdERlcGFydG1lbnQ9e2hhbmRsZU9wZW5EZXBhcnRtZW50fVxuICAgICAgICAgIGxhbmc9e2xhbmd9XG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgey8qIENMSU5JQ0FMIEVYQ0VMTEVOQ0UgJiBGRUFUVVJFIEhJR0hMSUdIVFMgU0VDVElPTiAgICAgICAgICAgKi99XG4gICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTIwIGJnLXdoaXRlIGJvcmRlci15IGJvcmRlci1zbGF0ZS0yMDAvODBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHNwYWNlLXktMTZcIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYXgtdy0zeGwgbXgtYXV0byBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXNreS03MDAgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy1za3ktNTAgYm9yZGVyIGJvcmRlci1za3ktMTAwXCI+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnU3RhbmRhcmR5IEtsaW5pY3puZSBJU08gQ2xhc3MgNScgOiAnSVNPIENsYXNzIDUgQ2xpbmljYWwgRXhjZWxsZW5jZSd9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtM3hsIHNtOnRleHQtNHhsIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05MDAgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdEbGFjemVnbyBOZXh0IEdlbmVyYXRpb24gQ2xpbmljPycgOiAnV2h5IENob29zZSBOZXh0IEdlbmVyYXRpb24gQ2xpbmljPyd9XG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1zbGF0ZS02MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgXG4gICAgICAgICAgICAgICAgICA/ICfFgcSFY3p5bXkgcHJlY3l6asSZIGxhc2VyYSBkaW9kb3dlZ28gMTQ3MG5tIHogYmV6Ym9sZXNueW1pIHByb3Rva2/FgmFtaSB6YWJpZWdvd3ltaSwgZGFqxIVjIENpIGd3YXJhbmNqxJkgYmV6cGllY3plxYRzdHdhIGkgbmFqd3nFvHN6ZWdvIGtvbWZvcnR1LidcbiAgICAgICAgICAgICAgICAgIDogJ1VuaXRpbmcgMTQ3MG5tIGRpb2RlIGxhc2VyIHByZWNpc2lvbiB3aXRoIHBhaW4tZnJlZSB0cmVhdG1lbnQgcHJvdG9jb2xzIHRvIGd1YXJhbnRlZSBtYXhpbXVtIHNhZmV0eSBhbmQgcmFwaWQgcmVjb3ZlcnkuJ31cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBGZWF0dXJlIENhcmRzIEdyaWQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTMgZ2FwLThcIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC04IHJvdW5kZWQtM3hsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzgwIGhvdmVyOmJvcmRlci1za3ktMzAwIGhvdmVyOnNoYWRvdy14bCB0cmFuc2l0aW9uLWFsbCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiByb3VuZGVkLTJ4bCBiZy1za3ktMTAwIHRleHQtc2t5LTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUHJva3RvbG9naWEgTGFzZXJvd2EnIDogJ0xhc2VyIFByb2N0b2xvZ3knfVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTYwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnIFxuICAgICAgICAgICAgICAgICAgICA/ICdQcm90b2vDs8WCIExIUMKuIGJleiBjacSZY2lhIHRrYW5raS4gWmFiaWVnIHcgem5pZWN6dWxlbml1IG1pZWpzY293eW0gcG96d2FsYSBuYSBwb3dyw7N0IGRvIGRvbXUgdyBkbml1IHphYmllZ3UuJ1xuICAgICAgICAgICAgICAgICAgICA6ICdMSFDCriBwcm90b2NvbCB3aXRob3V0IHRpc3N1ZSBjdXR0aW5nLiBMb2NhbCBhbmVzdGhlc2lhIGVuYWJsZXMgc2FtZS1kYXkgZGlzY2hhcmdlLid9XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9wZW5EZXBhcnRtZW50KCdwcm9jdG9sb2d5Jyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNreS03MDAgaG92ZXI6dGV4dC1za3ktODAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHB0LTJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ1NwcmF3ZMW6IGNlbm5payBwcm9rdG9sb2dpaScgOiAnQ2hlY2sgUHJvY3RvbG9neSBQcmljaW5nJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtOCByb3VuZGVkLTN4bCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC84MCBob3Zlcjpib3JkZXItdGVhbC0zMDAgaG92ZXI6c2hhZG93LXhsIHRyYW5zaXRpb24tYWxsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtMnhsIGJnLXRlYWwtMTAwIHRleHQtdGVhbC02MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxTaGllbGRBbGVydCBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0NoaXJ1cmdpYSAzRCBMYXBhcm9za29wb3dhJyA6ICczRCBMYXBhcm9zY29waWMgU3VyZ2VyeSd9XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgXG4gICAgICAgICAgICAgICAgICAgID8gJ1NhbMSZIG9wZXJhY3lqbsSFIHogbmF3aWV3ZW0gbGFtaW5hcm55bSB3c3BpZXJhIHdpenVhbGl6YWNqYSA0SyAzRCBpIG1pa3Jvc2lhdGtpIGJpb2xvZ2ljem5lIHd6bWFjbmlhasSFY2UgcG93xYJva2kuJ1xuICAgICAgICAgICAgICAgICAgICA6ICdMYW1pbmFyIGZsb3cgb3BlcmF0aW5nIHN1aXRlIGJhY2tlZCBieSA0SyAzRCB2aXN1YWxpemF0aW9uIGFuZCBiaW9sb2dpY2FsIHRpc3N1ZSByZWluZm9yY2luZyBtZXNoZXMuJ31cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlT3BlbkRlcGFydG1lbnQoJ3N1cmdlcnknKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtdGVhbC03MDAgaG92ZXI6dGV4dC10ZWFsLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwdC0yXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ3BsJyA/ICdTcHJhd2TFuiBwcm9jZWR1cnkgY2hpcnVyZ2ljem5lJyA6ICdFeHBsb3JlIFN1cmdpY2FsIFByb2NlZHVyZXMnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC04IHJvdW5kZWQtM3hsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzgwIGhvdmVyOmJvcmRlci1ibHVlLTMwMCBob3ZlcjpzaGFkb3cteGwgdHJhbnNpdGlvbi1hbGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC0yeGwgYmctYmx1ZS0xMDAgdGV4dC1ibHVlLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0ZsZWJvbG9naWEgJiBVU0cgRG9wcGxlcicgOiAnUGhsZWJvbG9neSAmIERvcHBsZXIgVVNHJ31cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyBcbiAgICAgICAgICAgICAgICAgICAgPyAnTWFwb3dhbmllIHByemV3bGVrxYJlaiBuaWV3eWRvbG5vxZtjaSDFvHlsbmVqIGkgbWHFgm9pbndhenlqbmUgemFteWthbmllIMW8eWxha8OzdyBsYXNlcmVtIEVWTFTCriAxNDcwbm0uJ1xuICAgICAgICAgICAgICAgICAgICA6ICdNYXBwaW5nIG9mIHZlbm91cyBpbnN1ZmZpY2llbmN5IGFuZCBtaW5pbWFsbHkgaW52YXNpdmUgRVZMVMKuIDE0NzBubSByYWRpYWwgbGFzZXIgYWJsYXRpb24uJ31cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlT3BlbkRlcGFydG1lbnQoJ3BobGVib2xvZ3knKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtYmx1ZS03MDAgaG92ZXI6dGV4dC1ibHVlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwdC0yXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ3BsJyA/ICdTcHJhd2TFuiB6YWJpZWdpIGZsZWJvbG9naWknIDogJ0V4cGxvcmUgUGhsZWJvbG9neSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICB7LyogQ0xJTklDIFNIT1AgRU5UUkFOQ0UgQkFOTkVSICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL31cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwicHktMTYgYmctZ3JhZGllbnQtdG8tciBmcm9tLXNsYXRlLTkwMCB2aWEtaW5kaWdvLTk1MCB0by1zbGF0ZS05MDAgdGV4dC13aGl0ZSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICBcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctW3JhZGlhbC1ncmFkaWVudChlbGxpcHNlX2F0X3RvcF9yaWdodCxfdmFyKC0tdHctZ3JhZGllbnQtc3RvcHMpKV0gZnJvbS1hbWJlci01MDAvMTAgdmlhLXRyYW5zcGFyZW50IHRvLXRyYW5zcGFyZW50IHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCByZWxhdGl2ZSB6LTEwIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtOFwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBtYXgtdy0yeGxcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy1hbWJlci01MDAvMjAgdGV4dC1hbWJlci0zMDAgdGV4dC14cyBmb250LWJvbGQgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzBcIj5cbiAgICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntsYW5nID09PSAncGwnID8gJ09maWNqYWxueSBTa2xlcCBNZWR5Y3pueSBLbGluaWtpJyA6ICdPZmZpY2lhbCBDbGluaWMgQXBvdGhlY2FyeSBTaG9wJ308L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBzbTp0ZXh0LTR4bCBmb250LWV4dHJhYm9sZCB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0RlZHlrb3dhbmUgV3lyb2J5IE1lZHljem5lICYgS29tcHJlc2pvdGVyYXBpYScgOiAnQ2VydGlmaWVkIE1lZGljYWwgUHJvZHVjdHMgJiBDb21wcmVzc2lvbiBHYXJtZW50cyd9XG4gICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgICA/ICdLdXAgYmV6cG/Fm3JlZG5pbyBwb8WEY3pvY2h5IHVjaXNrb3dlIENDTDEvQ0NMMiwgb3BhdHJ1bmtpIGh5ZHJva29sb2lkb3dlIG5hIGJsaXpueSBvcmF6IHByZXBhcmF0eSBuYSBiYXppZSBkaW9zbWlueSB6bWlrcm9uaXpvd2FuZWogeiBkb3N0YXfEhSBkbyBkb211LidcbiAgICAgICAgICAgICAgICAgIDogJ09yZGVyIENDTDEvQ0NMMiBjb21wcmVzc2lvbiB3ZWFyLCBoeWRyb2NvbGxvaWQgc2NhciBkcmVzc2luZ3MsIGFuZCBtaWNyb25pemVkIGRpb3NtaW4gc3VwcGxlbWVudHMgZGlyZWN0bHkgZm9yIGhvbWUgZGVsaXZlcnkuJ31cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTaG9wT3Blbih0cnVlKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtOCBweS00IHJvdW5kZWQtMnhsIGJnLWFtYmVyLTUwMCBob3ZlcjpiZy1hbWJlci00MDAgdGV4dC1zbGF0ZS05NTAgZm9udC1ibGFjayB0ZXh0LXNtIHNoYWRvdy14bCBzaGFkb3ctYW1iZXItNTAwLzIwIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBzaHJpbmstMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTaG9wcGluZ0JhZyBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnV2VqZMW6IGRvIFNrbGVwdScgOiAnRW50ZXIgU3RvcmUnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cblxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICB7LyogRE9DVE9SUyBURUFNIENBUk9VU0VMICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovfVxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0yMCBiZy1zbGF0ZS01MFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggc3BhY2UteS0xMlwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1heC13LTJ4bCBteC1hdXRvIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtaW5kaWdvLTcwMFwiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ05hc2kgRWtzcGVyY2knIDogJ091ciBTZW5pb3IgU3BlY2lhbGlzdHMnfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJsYWNrIHRleHQtc2xhdGUtOTAwIHRyYWNraW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnRG/Fm3dpYWRjem9ueSBaZXNww7PFgiBMZWthcnNraScgOiAnRXhwZXJ0IE1lZGljYWwgRmFjdWx0eSd9XG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0zIGdhcC02XCI+XG4gICAgICAgICAgICAgIHtERVBBUlRNRU5UUy5mbGF0TWFwKGQgPT4gZC5kb2N0b3JzKS5zbGljZSgwLCAzKS5tYXAoKGRvYykgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtkb2MuaWR9IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTN4bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC84MCBzaGFkb3ctbWQgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgIHNyYz17ZG9jLmF2YXRhcn1cbiAgICAgICAgICAgICAgICAgICAgYWx0PXtkb2MubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0yMCBoLTIwIHJvdW5kZWQtMnhsIG9iamVjdC1jb3ZlciBib3JkZXItMiBib3JkZXItc2t5LTEwMCBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeT1cIm5vLXJlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtZXh0cmFib2xkIHRleHQtc2xhdGUtOTAwXCI+e2RvYy5uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1za3ktNzAwIGZvbnQtYm9sZFwiPntkb2MudGl0bGV9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2RvYy5zcGVjaWFsdHl9PC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntkb2MuZXhwZXJpZW5jZVllYXJzfSB7bGFuZyA9PT0gJ3BsJyA/ICdsYXQgdyBjaGlydXJnaWknIDogJ3llYXJzIGluIHN1cmdlcnknfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldEJvb2tpbmdEZXB0SWQoJ3Byb2N0b2xvZ3knKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldElzQm9va2luZ09wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNreS02MDAgZm9udC1ib2xkIGhvdmVyOnVuZGVybGluZVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdVbcOzdycgOiAnQm9vayd9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8L21haW4+XG5cbiAgICAgIHsvKiBGb290ZXIgQ29tcG9uZW50ICovfVxuICAgICAgPEZvb3RlclxuICAgICAgICBsYW5nPXtsYW5nfVxuICAgICAgICBvblNlbGVjdERlcGFydG1lbnQ9e2hhbmRsZU9wZW5EZXBhcnRtZW50fVxuICAgICAgICBvbk9wZW5Cb29raW5nPXsoKSA9PiB7XG4gICAgICAgICAgc2V0Qm9va2luZ0RlcHRJZCh1bmRlZmluZWQpO1xuICAgICAgICAgIHNldEJvb2tpbmdUcmVhdG1lbnRJZCh1bmRlZmluZWQpO1xuICAgICAgICAgIHNldElzQm9va2luZ09wZW4odHJ1ZSk7XG4gICAgICAgIH19XG4gICAgICAvPlxuXG4gICAgICB7LyogRGVwYXJ0bWVudCBEZXRhaWwgTW9kYWwgKi99XG4gICAgICA8RGVwYXJ0bWVudE1vZGFsXG4gICAgICAgIGRlcGFydG1lbnQ9e3NlbGVjdGVkRGVwYXJ0bWVudH1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0U2VsZWN0ZWREZXB0SWQobnVsbCl9XG4gICAgICAgIG9uQm9va1RyZWF0bWVudD17aGFuZGxlT3BlbkJvb2tpbmdGb3JEZXB0fVxuICAgICAgICBsYW5nPXtsYW5nfVxuICAgICAgLz5cblxuICAgICAgey8qIENsaW5pYyBTaG9wIERyYXdlciAqL31cbiAgICAgIDxTaG9wRHJhd2VyXG4gICAgICAgIGlzT3Blbj17aXNTaG9wT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNTaG9wT3BlbihmYWxzZSl9XG4gICAgICAgIHByb2R1Y3RzPXtQUk9EVUNUU31cbiAgICAgICAgY2FydD17Y2FydH1cbiAgICAgICAgb25BZGRUb0NhcnQ9e2hhbmRsZUFkZFRvQ2FydH1cbiAgICAgICAgb25VcGRhdGVRdWFudGl0eT17aGFuZGxlVXBkYXRlUXVhbnRpdHl9XG4gICAgICAgIG9uUmVtb3ZlRnJvbUNhcnQ9e2hhbmRsZVJlbW92ZUZyb21DYXJ0fVxuICAgICAgICBvbkNsZWFyQ2FydD17aGFuZGxlQ2xlYXJDYXJ0fVxuICAgICAgICBsYW5nPXtsYW5nfVxuICAgICAgLz5cblxuICAgICAgey8qIEFwcG9pbnRtZW50IEJvb2tpbmcgTW9kYWwgKi99XG4gICAgICA8Qm9va2luZ01vZGFsXG4gICAgICAgIGlzT3Blbj17aXNCb29raW5nT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNCb29raW5nT3BlbihmYWxzZSl9XG4gICAgICAgIGRlcGFydG1lbnRzPXtERVBBUlRNRU5UU31cbiAgICAgICAgaW5pdGlhbERlcHRJZD17Ym9va2luZ0RlcHRJZH1cbiAgICAgICAgaW5pdGlhbFRyZWF0bWVudElkPXtib29raW5nVHJlYXRtZW50SWR9XG4gICAgICAgIGxhbmc9e2xhbmd9XG4gICAgICAvPlxuXG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQXVHTTtBQXZHTixTQUFnQixnQkFBZ0I7QUFDaEM7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLE9BQ0s7QUFPUCxTQUFTLGNBQWM7QUFDdkIsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxjQUFjO0FBQ3ZCO0FBQUEsRUFFRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBS0E7QUFBQSxPQUlLO0FBRVAsd0JBQXdCLE1BQU07QUFDNUIsUUFBTSxDQUFD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