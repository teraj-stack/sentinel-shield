import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { initialShopProducts } from "/apps/cml_clinic/src/data/shopData.ts";
import { DynamicHead } from "/apps/cml_clinic/src/components/DynamicHead.tsx";
import { Header } from "/apps/cml_clinic/src/components/Header.tsx";
import { HeroSection } from "/apps/cml_clinic/src/components/HeroSection.tsx";
import { VirtualClinicTour } from "/apps/cml_clinic/src/components/VirtualClinicTour.tsx";
import { AboutSection } from "/apps/cml_clinic/src/components/AboutSection.tsx";
import { SymptomsSection } from "/apps/cml_clinic/src/components/SymptomsSection.tsx";
import { ProctologyEducationGame } from "/apps/cml_clinic/src/components/ProctologyEducationGame.tsx";
import { ProcessSection } from "/apps/cml_clinic/src/components/ProcessSection.tsx";
import { TreatmentsSection } from "/apps/cml_clinic/src/components/TreatmentsSection.tsx";
import { AnimatedMicroLearning } from "/apps/cml_clinic/src/components/AnimatedMicroLearning.tsx";
import { TreatmentCalculator } from "/apps/cml_clinic/src/components/TreatmentCalculator.tsx";
import { PatientSuccessStories } from "/apps/cml_clinic/src/components/PatientSuccessStories.tsx";
import { PatientTestimonials } from "/apps/cml_clinic/src/components/PatientTestimonials.tsx";
import { MedicalShopSection } from "/apps/cml_clinic/src/components/MedicalShopSection.tsx";
import { CartModal } from "/apps/cml_clinic/src/components/CartModal.tsx";
import { InventoryAdminModal } from "/apps/cml_clinic/src/components/InventoryAdminModal.tsx";
import { SeoHeadingInspectorModal } from "/apps/cml_clinic/src/components/SeoHeadingInspectorModal.tsx";
import { AiConsultantModal } from "/apps/cml_clinic/src/components/AiConsultantModal.tsx";
import { ThemeStudioModal } from "/apps/cml_clinic/src/components/ThemeStudioModal.tsx";
import { FloatingChatWidget } from "/apps/cml_clinic/src/components/FloatingChatWidget.tsx";
import { ProctologyHumorSection } from "/apps/cml_clinic/src/components/ProctologyHumorSection.tsx";
import { ReviewsSection } from "/apps/cml_clinic/src/components/ReviewsSection.tsx";
import { FaqSection } from "/apps/cml_clinic/src/components/FaqSection.tsx";
import { ContactFooter } from "/apps/cml_clinic/src/components/ContactFooter.tsx";
import { ShieldCheck, Monitor, Sparkles, Boxes } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
export default function App() {
  const [activeTheme, setActiveTheme] = useState("midnight");
  const [activeShade, setActiveShade] = useState("standard");
  const [active3dDepth, setActive3dDepth] = useState("intense");
  const [isThemeStudioOpen, setIsThemeStudioOpen] = useState(false);
  useEffect(() => {
    Array.from(document.body.classList).filter((cls) => cls.startsWith("theme-")).forEach((cls) => document.body.classList.remove(cls));
    if (activeTheme) {
      document.body.classList.add(`theme-${activeTheme}`);
    }
    return () => {
      if (activeTheme) {
        document.body.classList.remove(`theme-${activeTheme}`);
      }
    };
  }, [activeTheme]);
  useEffect(() => {
    Array.from(document.body.classList).filter((cls) => cls.startsWith("shade-")).forEach((cls) => document.body.classList.remove(cls));
    if (activeShade) {
      document.body.classList.add(`shade-${activeShade}`);
    }
    return () => {
      if (activeShade) {
        document.body.classList.remove(`shade-${activeShade}`);
      }
    };
  }, [activeShade]);
  useEffect(() => {
    Array.from(document.body.classList).filter((cls) => cls.startsWith("depth-")).forEach((cls) => document.body.classList.remove(cls));
    if (active3dDepth) {
      document.body.classList.add(`depth-${active3dDepth}`);
    }
    return () => {
      if (active3dDepth) {
        document.body.classList.remove(`depth-${active3dDepth}`);
      }
    };
  }, [active3dDepth]);
  const [isHighContrast, setIsHighContrast] = useState(false);
  useEffect(() => {
    if (isHighContrast) {
      document.documentElement.classList.add("high-contrast");
      document.body.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
      document.body.classList.remove("high-contrast");
    }
    return () => {
      document.documentElement.classList.remove("high-contrast");
      document.body.classList.remove("high-contrast");
    };
  }, [isHighContrast]);
  const handleToggleHighContrast = () => {
    setIsHighContrast((prev) => !prev);
  };
  const [products, setProducts] = useState(initialShopProducts);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [collectedCrystals, setCollectedCrystals] = useState([1]);
  const handleCollectCrystal = (crystalId) => {
    setCollectedCrystals((prev) => {
      if (prev.includes(crystalId)) return prev;
      return [...prev, crystalId];
    });
  };
  const [isAuditOpen, setIsAuditOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState("full");
  const [seoMeta, setSeoMeta] = useState({
    title: "CML – Centrum Medycyny Laserowej | Dr Jan Bujok | Proktologia Warszawa Wilanów",
    description: "Dr Jan Bujok – specjalista chirurgii ogólnej i proktolog. Laserowe leczenie hemoroidów LHP, przetok FiLaC, torbieli pilonidalnej SiLaC oraz e-konsultacje. Warszawa Wilanów, 16 lat doświadczenia.",
    keywords: "dr jan bujok, proktolog warszawa, laserowe leczenie hemoroidów, LHP, FiLaC, SiLaC, centrum medycyny laserowej, e-konsultacja proktologiczna, proktologia wilanow",
    ogTitle: "CML – Centrum Medycyny Laserowej | Dr Jan Bujok",
    ogDescription: "Zaawansowane, bezbolesne leczenie proktologiczne laserem. Zadbaj o zdrowie z dr. Janem Bujokiem w Warszawie na Wilanowie.",
    ogType: "website",
    canonicalUrl: "https://mcml.pro",
    structuredDataJson: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "Physician"],
      name: "Centrum Medycyny Laserowej CML - Dr Jan Bujok",
      description: "Specjalistyczna klinika chirurgii i laserowego leczenia schorzeń proktologicznych.",
      medicalSpecialty: ["Proctology", "GeneralSurgery", "LaserSurgery"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "ul. Branickiego 10/U6",
        addressLocality: "Warszawa",
        postalCode: "02-972",
        addressCountry: "PL"
      },
      telephone: "+48 510 432 361",
      priceRange: "$$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "312"
      }
    }, null, 2)
  });
  const handleUpdateProduct = (updated) => {
    setProducts(
      (prev) => prev.map((p) => p.id === updated.id ? updated : p)
    );
  };
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };
  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };
  const handleAddToCart = (product) => {
    if (product.stock <= 0) return;
    setCartItems((prev) => {
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
    setCartItems(
      (prev) => prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };
  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };
  const handleClearCart = () => {
    setCartItems([]);
  };
  const handleToggleSymptom = (tag) => {
    setSelectedSymptoms(
      (prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getDeviceFrameWidthClass = () => {
    switch (previewDevice) {
      case "mobile":
        return "max-w-[375px] mx-auto border-x border-purple-500/50 my-6 rounded-3xl shadow-2xl overflow-hidden ring-8 ring-slate-900";
      case "tablet":
        return "max-w-[768px] mx-auto border-x border-purple-500/50 my-6 rounded-2xl shadow-2xl overflow-hidden ring-8 ring-slate-900";
      case "desktop":
        return "max-w-[1280px] mx-auto border-x border-purple-500/30 my-4 shadow-2xl";
      default:
        return "w-full";
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "min-h-screen bg-[#0a0712] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white relative", children: [
    /* @__PURE__ */ jsxDEV(DynamicHead, { seo: seoMeta }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 255,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-2 bg-slate-950/90 border border-slate-800 p-1.5 rounded-2xl shadow-2xl backdrop-blur-md", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsInventoryOpen(true),
          className: "px-3 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/40 text-indigo-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm",
          title: "Zarządzanie magazynem i stanami towarowymi sklepu",
          children: [
            /* @__PURE__ */ jsxDEV(Boxes, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 264,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Magazyn Sklepowy" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 265,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 259,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsAuditOpen(true),
          className: "px-3 py-1.5 rounded-xl bg-teal-950/80 hover:bg-teal-900 border border-teal-500/40 text-teal-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm",
          title: "Otwórz Audytor SEO, Nagłówków H1-H6 oraz Responsywności",
          children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-teal-400" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 273,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Audyt SEO / H1" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 274,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 268,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsAiOpen(true),
          className: "px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm",
          title: "Skonsultuj się z Asystentem AI z trybem wysokiego myślenia",
          children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-purple-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 282,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Asystent AI" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 283,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 277,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 258,
      columnNumber: 7
    }, this),
    previewDevice !== "full" && /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-950/90 border-b border-purple-500/40 px-4 py-2 text-center text-xs text-purple-200 flex items-center justify-center gap-3 sticky top-0 z-50 backdrop-blur-md", children: [
      /* @__PURE__ */ jsxDEV(Monitor, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 290,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: [
        "Aktywny podgląd symulacji urządzenia:",
        " ",
        /* @__PURE__ */ jsxDEV("strong", { className: "uppercase font-mono", children: previewDevice }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 293,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 291,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setPreviewDevice("full"),
          className: "px-2 py-0.5 rounded bg-purple-800 text-white font-bold text-[10px]",
          children: "Przywróć 100%"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 295,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 289,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: `transition-all duration-300 ${getDeviceFrameWidthClass()}`, children: [
      /* @__PURE__ */ jsxDEV(
        Header,
        {
          cartCount: totalCartCount,
          onOpenCart: () => setIsCartOpen(true),
          onOpenAudit: () => setIsAuditOpen(true),
          onOpenAi: () => setIsAiOpen(true),
          onOpenInventory: () => setIsInventoryOpen(true),
          isHighContrast,
          onToggleHighContrast: handleToggleHighContrast,
          onOpenThemeStudio: () => setIsThemeStudioOpen(true),
          activeTheme,
          onToggleLightDark: () => setActiveTheme((prev) => prev === "light" ? "midnight" : "light"),
          crystalCount: collectedCrystals.length
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 307,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("main", { children: [
        /* @__PURE__ */ jsxDEV(HeroSection, { onOpenAi: () => setIsAiOpen(true) }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 323,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(VirtualClinicTour, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 324,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(AboutSection, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 325,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          SymptomsSection,
          {
            selectedSymptoms,
            onToggleSymptomTag: handleToggleSymptom,
            onCollectCrystal: handleCollectCrystal
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 326,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          ProctologyEducationGame,
          {
            onCollectCrystal: () => handleCollectCrystal(3)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 331,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(ProcessSection, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 334,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(TreatmentsSection, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 335,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          AnimatedMicroLearning,
          {
            onCollectCrystal: handleCollectCrystal,
            isCrystalCollected: collectedCrystals.includes(2)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 336,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          TreatmentCalculator,
          {
            onBookConsultation: () => setIsAiOpen(true),
            crystalCount: collectedCrystals.length
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 340,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(PatientSuccessStories, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 344,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(PatientTestimonials, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 345,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          MedicalShopSection,
          {
            products,
            onAddToCart: handleAddToCart,
            onOpenCart: () => setIsCartOpen(true),
            onOpenInventory: () => setIsInventoryOpen(true)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 346,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(ReviewsSection, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 352,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(ProctologyHumorSection, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 353,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(FaqSection, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 354,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 322,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(ContactFooter, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 358,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 305,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      CartModal,
      {
        isOpen: isCartOpen,
        onClose: () => setIsCartOpen(false),
        cartItems,
        onUpdateQuantity: handleUpdateQuantity,
        onRemoveItem: handleRemoveItem,
        onClearCart: handleClearCart
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 362,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      InventoryAdminModal,
      {
        isOpen: isInventoryOpen,
        onClose: () => setIsInventoryOpen(false),
        products,
        onUpdateProduct: handleUpdateProduct,
        onAddProduct: handleAddProduct,
        onDeleteProduct: handleDeleteProduct,
        onResetProducts: () => setProducts(initialShopProducts)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 371,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      SeoHeadingInspectorModal,
      {
        isOpen: isAuditOpen,
        onClose: () => setIsAuditOpen(false),
        seoMeta,
        activeDevice: previewDevice,
        onChangeDevice: setPreviewDevice
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 381,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      AiConsultantModal,
      {
        isOpen: isAiOpen,
        onClose: () => setIsAiOpen(false),
        selectedSymptoms
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 389,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      ThemeStudioModal,
      {
        isOpen: isThemeStudioOpen,
        onClose: () => setIsThemeStudioOpen(false),
        activeTheme,
        onChangeTheme: setActiveTheme,
        activeShade,
        onChangeShade: setActiveShade,
        active3dDepth,
        onChange3dDepth: setActive3dDepth
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 395,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(FloatingChatWidget, { onOpenAiConsultant: () => setIsAiOpen(true) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 407,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 253,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICBTaG9wUHJvZHVjdCxcbiAgQ2FydEl0ZW0sXG4gIFNlb01ldGFTdGF0ZSxcbiAgU2NyZWVuRGV2aWNlUHJldmlldyxcbiAgVGhlbWVJZCxcbiAgU2hhZGVWYXJpYW50LFxuICBEZXB0aDNETW9kZSxcbn0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBpbml0aWFsU2hvcFByb2R1Y3RzIH0gZnJvbSAnLi9kYXRhL3Nob3BEYXRhJztcbmltcG9ydCB7IER5bmFtaWNIZWFkIH0gZnJvbSAnLi9jb21wb25lbnRzL0R5bmFtaWNIZWFkJztcbmltcG9ydCB7IEhlYWRlciB9IGZyb20gJy4vY29tcG9uZW50cy9IZWFkZXInO1xuaW1wb3J0IHsgSGVyb1NlY3Rpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvSGVyb1NlY3Rpb24nO1xuaW1wb3J0IHsgVmlydHVhbENsaW5pY1RvdXIgfSBmcm9tICcuL2NvbXBvbmVudHMvVmlydHVhbENsaW5pY1RvdXInO1xuaW1wb3J0IHsgQWJvdXRTZWN0aW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL0Fib3V0U2VjdGlvbic7XG5pbXBvcnQgeyBTeW1wdG9tc1NlY3Rpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvU3ltcHRvbXNTZWN0aW9uJztcbmltcG9ydCB7IFByb2N0b2xvZ3lFZHVjYXRpb25HYW1lIH0gZnJvbSAnLi9jb21wb25lbnRzL1Byb2N0b2xvZ3lFZHVjYXRpb25HYW1lJztcbmltcG9ydCB7IFByb2Nlc3NTZWN0aW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL1Byb2Nlc3NTZWN0aW9uJztcbmltcG9ydCB7IFRyZWF0bWVudHNTZWN0aW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL1RyZWF0bWVudHNTZWN0aW9uJztcbmltcG9ydCB7IEFuaW1hdGVkTWljcm9MZWFybmluZyB9IGZyb20gJy4vY29tcG9uZW50cy9BbmltYXRlZE1pY3JvTGVhcm5pbmcnO1xuaW1wb3J0IHsgVHJlYXRtZW50Q2FsY3VsYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9UcmVhdG1lbnRDYWxjdWxhdG9yJztcbmltcG9ydCB7IFBhdGllbnRTdWNjZXNzU3RvcmllcyB9IGZyb20gJy4vY29tcG9uZW50cy9QYXRpZW50U3VjY2Vzc1N0b3JpZXMnO1xuaW1wb3J0IHsgUGF0aWVudFRlc3RpbW9uaWFscyB9IGZyb20gJy4vY29tcG9uZW50cy9QYXRpZW50VGVzdGltb25pYWxzJztcbmltcG9ydCB7IE1lZGljYWxTaG9wU2VjdGlvbiB9IGZyb20gJy4vY29tcG9uZW50cy9NZWRpY2FsU2hvcFNlY3Rpb24nO1xuaW1wb3J0IHsgQ2FydE1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL0NhcnRNb2RhbCc7XG5pbXBvcnQgeyBJbnZlbnRvcnlBZG1pbk1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL0ludmVudG9yeUFkbWluTW9kYWwnO1xuaW1wb3J0IHsgU2VvSGVhZGluZ0luc3BlY3Rvck1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL1Nlb0hlYWRpbmdJbnNwZWN0b3JNb2RhbCc7XG5pbXBvcnQgeyBBaUNvbnN1bHRhbnRNb2RhbCB9IGZyb20gJy4vY29tcG9uZW50cy9BaUNvbnN1bHRhbnRNb2RhbCc7XG5pbXBvcnQgeyBUaGVtZVN0dWRpb01vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL1RoZW1lU3R1ZGlvTW9kYWwnO1xuaW1wb3J0IHsgRmxvYXRpbmdDaGF0V2lkZ2V0IH0gZnJvbSAnLi9jb21wb25lbnRzL0Zsb2F0aW5nQ2hhdFdpZGdldCc7XG5pbXBvcnQgeyBQcm9jdG9sb2d5SHVtb3JTZWN0aW9uIH0gZnJvbSAnLi9jb21wb25lbnRzL1Byb2N0b2xvZ3lIdW1vclNlY3Rpb24nO1xuaW1wb3J0IHsgUmV2aWV3c1NlY3Rpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvUmV2aWV3c1NlY3Rpb24nO1xuaW1wb3J0IHsgRmFxU2VjdGlvbiB9IGZyb20gJy4vY29tcG9uZW50cy9GYXFTZWN0aW9uJztcbmltcG9ydCB7IENvbnRhY3RGb290ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvQ29udGFjdEZvb3Rlcic7XG5pbXBvcnQgeyBTaGllbGRDaGVjaywgTW9uaXRvciwgU3BhcmtsZXMsIEJveGVzIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xuICAvLyBUaGVtZSAmIDNEIE5ha8WCYWRraSBTdGF0ZVxuICBjb25zdCBbYWN0aXZlVGhlbWUsIHNldEFjdGl2ZVRoZW1lXSA9IHVzZVN0YXRlPFRoZW1lSWQ+KCdtaWRuaWdodCcpO1xuICBjb25zdCBbYWN0aXZlU2hhZGUsIHNldEFjdGl2ZVNoYWRlXSA9IHVzZVN0YXRlPFNoYWRlVmFyaWFudD4oJ3N0YW5kYXJkJyk7XG4gIGNvbnN0IFthY3RpdmUzZERlcHRoLCBzZXRBY3RpdmUzZERlcHRoXSA9IHVzZVN0YXRlPERlcHRoM0RNb2RlPignaW50ZW5zZScpO1xuICBjb25zdCBbaXNUaGVtZVN0dWRpb09wZW4sIHNldElzVGhlbWVTdHVkaW9PcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBTeW5jIGJvZHkgdGhlbWUsIHNoYWRlLCBkZXB0aCwgYW5kIGNvbnRyYXN0IGNsYXNzZXMgc2FmZWx5IHdpdGhvdXQgY29uZmxpY3RzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgQXJyYXkuZnJvbShkb2N1bWVudC5ib2R5LmNsYXNzTGlzdClcbiAgICAgIC5maWx0ZXIoKGNscykgPT4gY2xzLnN0YXJ0c1dpdGgoJ3RoZW1lLScpKVxuICAgICAgLmZvckVhY2goKGNscykgPT4gZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuXG4gICAgaWYgKGFjdGl2ZVRoZW1lKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoYHRoZW1lLSR7YWN0aXZlVGhlbWV9YCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhY3RpdmVUaGVtZSkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoYHRoZW1lLSR7YWN0aXZlVGhlbWV9YCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2FjdGl2ZVRoZW1lXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBBcnJheS5mcm9tKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0KVxuICAgICAgLmZpbHRlcigoY2xzKSA9PiBjbHMuc3RhcnRzV2l0aCgnc2hhZGUtJykpXG4gICAgICAuZm9yRWFjaCgoY2xzKSA9PiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoY2xzKSk7XG5cbiAgICBpZiAoYWN0aXZlU2hhZGUpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChgc2hhZGUtJHthY3RpdmVTaGFkZX1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFjdGl2ZVNoYWRlKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShgc2hhZGUtJHthY3RpdmVTaGFkZX1gKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbYWN0aXZlU2hhZGVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIEFycmF5LmZyb20oZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QpXG4gICAgICAuZmlsdGVyKChjbHMpID0+IGNscy5zdGFydHNXaXRoKCdkZXB0aC0nKSlcbiAgICAgIC5mb3JFYWNoKChjbHMpID0+IGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShjbHMpKTtcblxuICAgIGlmIChhY3RpdmUzZERlcHRoKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoYGRlcHRoLSR7YWN0aXZlM2REZXB0aH1gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGFjdGl2ZTNkRGVwdGgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGBkZXB0aC0ke2FjdGl2ZTNkRGVwdGh9YCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2FjdGl2ZTNkRGVwdGhdKTtcblxuICAvLyBIaWdoIENvbnRyYXN0IEFjY2Vzc2liaWxpdHkgTW9kZSBTdGF0ZSAmIFN5bmNcbiAgY29uc3QgW2lzSGlnaENvbnRyYXN0LCBzZXRJc0hpZ2hDb250cmFzdF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNIaWdoQ29udHJhc3QpIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoaWdoLWNvbnRyYXN0Jyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2hpZ2gtY29udHJhc3QnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZ2gtY29udHJhc3QnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaC1jb250cmFzdCcpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGlnaC1jb250cmFzdCcpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdoaWdoLWNvbnRyYXN0Jyk7XG4gICAgfTtcbiAgfSwgW2lzSGlnaENvbnRyYXN0XSk7XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlSGlnaENvbnRyYXN0ID0gKCkgPT4ge1xuICAgIHNldElzSGlnaENvbnRyYXN0KChwcmV2KSA9PiAhcHJldik7XG4gIH07XG5cbiAgLy8gTWFzdGVyIEludmVudG9yeSAmIFNob3AgUHJvZHVjdCBTdGF0ZVxuICBjb25zdCBbcHJvZHVjdHMsIHNldFByb2R1Y3RzXSA9IHVzZVN0YXRlPFNob3BQcm9kdWN0W10+KGluaXRpYWxTaG9wUHJvZHVjdHMpO1xuICBjb25zdCBbaXNJbnZlbnRvcnlPcGVuLCBzZXRJc0ludmVudG9yeU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFN0YXRlIGZvciBFLUNvbW1lcmNlIENhcnRcbiAgY29uc3QgW2NhcnRJdGVtcywgc2V0Q2FydEl0ZW1zXSA9IHVzZVN0YXRlPENhcnRJdGVtW10+KFtdKTtcbiAgY29uc3QgW2lzQ2FydE9wZW4sIHNldElzQ2FydE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIFN0YXRlIGZvciBTeW1wdG9tIERpYWdub3N0aWMgVGFnc1xuICBjb25zdCBbc2VsZWN0ZWRTeW1wdG9tcywgc2V0U2VsZWN0ZWRTeW1wdG9tc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xuXG4gIC8vIENyeXN0YWxIZWFsdGggR2FtaWZpY2F0aW9uIFN0YXRlXG4gIGNvbnN0IFtjb2xsZWN0ZWRDcnlzdGFscywgc2V0Q29sbGVjdGVkQ3J5c3RhbHNdID0gdXNlU3RhdGU8bnVtYmVyW10+KFsxXSk7XG5cbiAgY29uc3QgaGFuZGxlQ29sbGVjdENyeXN0YWwgPSAoY3J5c3RhbElkOiBudW1iZXIpID0+IHtcbiAgICBzZXRDb2xsZWN0ZWRDcnlzdGFscygocHJldikgPT4ge1xuICAgICAgaWYgKHByZXYuaW5jbHVkZXMoY3J5c3RhbElkKSkgcmV0dXJuIHByZXY7XG4gICAgICByZXR1cm4gWy4uLnByZXYsIGNyeXN0YWxJZF07XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gU3RhdGUgZm9yIEluc3BlY3RvciAmIEFJIE1vZGFsc1xuICBjb25zdCBbaXNBdWRpdE9wZW4sIHNldElzQXVkaXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzQWlPcGVuLCBzZXRJc0FpT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gUmVzcG9uc2l2ZSBkZXZpY2Ugc2ltdWxhdG9yIHByZXZpZXcgbW9kZVxuICBjb25zdCBbcHJldmlld0RldmljZSwgc2V0UHJldmlld0RldmljZV0gPSB1c2VTdGF0ZTxTY3JlZW5EZXZpY2VQcmV2aWV3PignZnVsbCcpO1xuXG4gIC8vIER5bmFtaWMgU0VPIE1ldGFkYXRhXG4gIGNvbnN0IFtzZW9NZXRhLCBzZXRTZW9NZXRhXSA9IHVzZVN0YXRlPFNlb01ldGFTdGF0ZT4oe1xuICAgIHRpdGxlOiAnQ01MIOKAkyBDZW50cnVtIE1lZHljeW55IExhc2Vyb3dlaiB8IERyIEphbiBCdWpvayB8IFByb2t0b2xvZ2lhIFdhcnN6YXdhIFdpbGFuw7N3JyxcbiAgICBkZXNjcmlwdGlvbjogJ0RyIEphbiBCdWpvayDigJMgc3BlY2phbGlzdGEgY2hpcnVyZ2lpIG9nw7NsbmVqIGkgcHJva3RvbG9nLiBMYXNlcm93ZSBsZWN6ZW5pZSBoZW1vcm9pZMOzdyBMSFAsIHByemV0b2sgRmlMYUMsIHRvcmJpZWxpIHBpbG9uaWRhbG5laiBTaUxhQyBvcmF6IGUta29uc3VsdGFjamUuIFdhcnN6YXdhIFdpbGFuw7N3LCAxNiBsYXQgZG/Fm3dpYWRjemVuaWEuJyxcbiAgICBrZXl3b3JkczogJ2RyIGphbiBidWpvaywgcHJva3RvbG9nIHdhcnN6YXdhLCBsYXNlcm93ZSBsZWN6ZW5pZSBoZW1vcm9pZMOzdywgTEhQLCBGaUxhQywgU2lMYUMsIGNlbnRydW0gbWVkeWN5bnkgbGFzZXJvd2VqLCBlLWtvbnN1bHRhY2phIHByb2t0b2xvZ2ljem5hLCBwcm9rdG9sb2dpYSB3aWxhbm93JyxcbiAgICBvZ1RpdGxlOiAnQ01MIOKAkyBDZW50cnVtIE1lZHljeW55IExhc2Vyb3dlaiB8IERyIEphbiBCdWpvaycsXG4gICAgb2dEZXNjcmlwdGlvbjogJ1phYXdhbnNvd2FuZSwgYmV6Ym9sZXNuZSBsZWN6ZW5pZSBwcm9rdG9sb2dpY3puZSBsYXNlcmVtLiBaYWRiYWogbyB6ZHJvd2llIHogZHIuIEphbmVtIEJ1am9raWVtIHcgV2Fyc3phd2llIG5hIFdpbGFub3dpZS4nLFxuICAgIG9nVHlwZTogJ3dlYnNpdGUnLFxuICAgIGNhbm9uaWNhbFVybDogJ2h0dHBzOi8vbWNtbC5wcm8nLFxuICAgIHN0cnVjdHVyZWREYXRhSnNvbjogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgJ0Bjb250ZXh0JzogJ2h0dHBzOi8vc2NoZW1hLm9yZycsXG4gICAgICAnQHR5cGUnOiBbJ01lZGljYWxCdXNpbmVzcycsICdQaHlzaWNpYW4nXSxcbiAgICAgIG5hbWU6ICdDZW50cnVtIE1lZHljeW55IExhc2Vyb3dlaiBDTUwgLSBEciBKYW4gQnVqb2snLFxuICAgICAgZGVzY3JpcHRpb246ICdTcGVjamFsaXN0eWN6bmEga2xpbmlrYSBjaGlydXJnaWkgaSBsYXNlcm93ZWdvIGxlY3plbmlhIHNjaG9yemXFhCBwcm9rdG9sb2dpY3pueWNoLicsXG4gICAgICBtZWRpY2FsU3BlY2lhbHR5OiBbJ1Byb2N0b2xvZ3knLCAnR2VuZXJhbFN1cmdlcnknLCAnTGFzZXJTdXJnZXJ5J10sXG4gICAgICBhZGRyZXNzOiB7XG4gICAgICAgICdAdHlwZSc6ICdQb3N0YWxBZGRyZXNzJyxcbiAgICAgICAgc3RyZWV0QWRkcmVzczogJ3VsLiBCcmFuaWNraWVnbyAxMC9VNicsXG4gICAgICAgIGFkZHJlc3NMb2NhbGl0eTogJ1dhcnN6YXdhJyxcbiAgICAgICAgcG9zdGFsQ29kZTogJzAyLTk3MicsXG4gICAgICAgIGFkZHJlc3NDb3VudHJ5OiAnUEwnLFxuICAgICAgfSxcbiAgICAgIHRlbGVwaG9uZTogJys0OCA1MTAgNDMyIDM2MScsXG4gICAgICBwcmljZVJhbmdlOiAnJCQkJyxcbiAgICAgIGFnZ3JlZ2F0ZVJhdGluZzoge1xuICAgICAgICAnQHR5cGUnOiAnQWdncmVnYXRlUmF0aW5nJyxcbiAgICAgICAgcmF0aW5nVmFsdWU6ICc1LjAnLFxuICAgICAgICByZXZpZXdDb3VudDogJzMxMicsXG4gICAgICB9LFxuICAgIH0sIG51bGwsIDIpLFxuICB9KTtcblxuICAvLyBQcm9kdWN0IEludmVudG9yeSBBZG1pbiBIYW5kbGVyc1xuICBjb25zdCBoYW5kbGVVcGRhdGVQcm9kdWN0ID0gKHVwZGF0ZWQ6IFNob3BQcm9kdWN0KSA9PiB7XG4gICAgc2V0UHJvZHVjdHMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4gKHAuaWQgPT09IHVwZGF0ZWQuaWQgPyB1cGRhdGVkIDogcCkpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZGRQcm9kdWN0ID0gKG5ld1Byb2R1Y3Q6IFNob3BQcm9kdWN0KSA9PiB7XG4gICAgc2V0UHJvZHVjdHMoKHByZXYpID0+IFtuZXdQcm9kdWN0LCAuLi5wcmV2XSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlUHJvZHVjdCA9IChwcm9kdWN0SWQ6IHN0cmluZykgPT4ge1xuICAgIHNldFByb2R1Y3RzKChwcmV2KSA9PiBwcmV2LmZpbHRlcigocCkgPT4gcC5pZCAhPT0gcHJvZHVjdElkKSk7XG4gIH07XG5cbiAgLy8gQ2FydCBvcGVyYXRpb25zXG4gIGNvbnN0IGhhbmRsZUFkZFRvQ2FydCA9IChwcm9kdWN0OiBTaG9wUHJvZHVjdCkgPT4ge1xuICAgIGlmIChwcm9kdWN0LnN0b2NrIDw9IDApIHJldHVybjtcbiAgICBzZXRDYXJ0SXRlbXMoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gcHJldi5maW5kKChpdGVtKSA9PiBpdGVtLnByb2R1Y3QuaWQgPT09IHByb2R1Y3QuaWQpO1xuICAgICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgIHJldHVybiBwcmV2Lm1hcCgoaXRlbSkgPT5cbiAgICAgICAgICBpdGVtLnByb2R1Y3QuaWQgPT09IHByb2R1Y3QuaWRcbiAgICAgICAgICAgID8geyAuLi5pdGVtLCBxdWFudGl0eTogaXRlbS5xdWFudGl0eSArIDEgfVxuICAgICAgICAgICAgOiBpdGVtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gWy4uLnByZXYsIHsgcHJvZHVjdCwgcXVhbnRpdHk6IDEgfV07XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVXBkYXRlUXVhbnRpdHkgPSAocHJvZHVjdElkOiBzdHJpbmcsIGRlbHRhOiBudW1iZXIpID0+IHtcbiAgICBzZXRDYXJ0SXRlbXMoKHByZXYpID0+XG4gICAgICBwcmV2XG4gICAgICAgIC5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICBpZiAoaXRlbS5wcm9kdWN0LmlkID09PSBwcm9kdWN0SWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1F0eSA9IGl0ZW0ucXVhbnRpdHkgKyBkZWx0YTtcbiAgICAgICAgICAgIHJldHVybiBuZXdRdHkgPiAwID8geyAuLi5pdGVtLCBxdWFudGl0eTogbmV3UXR5IH0gOiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcihCb29sZWFuKSBhcyBDYXJ0SXRlbVtdXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZW1vdmVJdGVtID0gKHByb2R1Y3RJZDogc3RyaW5nKSA9PiB7XG4gICAgc2V0Q2FydEl0ZW1zKChwcmV2KSA9PiBwcmV2LmZpbHRlcigoaXRlbSkgPT4gaXRlbS5wcm9kdWN0LmlkICE9PSBwcm9kdWN0SWQpKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbGVhckNhcnQgPSAoKSA9PiB7XG4gICAgc2V0Q2FydEl0ZW1zKFtdKTtcbiAgfTtcblxuICAvLyBTeW1wdG9tcyBTZWxlY3Rpb24gVG9nZ2xlXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZVN5bXB0b20gPSAodGFnOiBzdHJpbmcpID0+IHtcbiAgICBzZXRTZWxlY3RlZFN5bXB0b21zKChwcmV2KSA9PlxuICAgICAgcHJldi5pbmNsdWRlcyh0YWcpID8gcHJldi5maWx0ZXIoKHQpID0+IHQgIT09IHRhZykgOiBbLi4ucHJldiwgdGFnXVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgdG90YWxDYXJ0Q291bnQgPSBjYXJ0SXRlbXMucmVkdWNlKChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0ucXVhbnRpdHksIDApO1xuXG4gIC8vIFJlc3BvbnNpdmUgZGV2aWNlIGNvbnRhaW5lciB3cmFwcGVyIHN0eWxpbmdcbiAgY29uc3QgZ2V0RGV2aWNlRnJhbWVXaWR0aENsYXNzID0gKCkgPT4ge1xuICAgIHN3aXRjaCAocHJldmlld0RldmljZSkge1xuICAgICAgY2FzZSAnbW9iaWxlJzpcbiAgICAgICAgcmV0dXJuICdtYXgtdy1bMzc1cHhdIG14LWF1dG8gYm9yZGVyLXggYm9yZGVyLXB1cnBsZS01MDAvNTAgbXktNiByb3VuZGVkLTN4bCBzaGFkb3ctMnhsIG92ZXJmbG93LWhpZGRlbiByaW5nLTggcmluZy1zbGF0ZS05MDAnO1xuICAgICAgY2FzZSAndGFibGV0JzpcbiAgICAgICAgcmV0dXJuICdtYXgtdy1bNzY4cHhdIG14LWF1dG8gYm9yZGVyLXggYm9yZGVyLXB1cnBsZS01MDAvNTAgbXktNiByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIG92ZXJmbG93LWhpZGRlbiByaW5nLTggcmluZy1zbGF0ZS05MDAnO1xuICAgICAgY2FzZSAnZGVza3RvcCc6XG4gICAgICAgIHJldHVybiAnbWF4LXctWzEyODBweF0gbXgtYXV0byBib3JkZXIteCBib3JkZXItcHVycGxlLTUwMC8zMCBteS00IHNoYWRvdy0yeGwnO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuICd3LWZ1bGwnO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIGJnLVsjMGEwNzEyXSB0ZXh0LXNsYXRlLTEwMCBmb250LXNhbnMgYW50aWFsaWFzZWQgc2VsZWN0aW9uOmJnLWluZGlnby01MDAgc2VsZWN0aW9uOnRleHQtd2hpdGUgcmVsYXRpdmVcIj5cbiAgICAgIHsvKiBEeW5hbWljIE1ldGEgSGVhZCBNYW5hZ2VtZW50ICovfVxuICAgICAgPER5bmFtaWNIZWFkIHNlbz17c2VvTWV0YX0gLz5cblxuICAgICAgey8qIEZsb2F0aW5nIEluc3BlY3RvciwgSW52ZW50b3J5ICYgQUkgQmFyIG9uIERlc2t0b3AgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGJvdHRvbS00IHJpZ2h0LTQgei00MCBoaWRkZW4gc206ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYmctc2xhdGUtOTUwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtMS41IHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgYmFja2Ryb3AtYmx1ci1tZFwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNJbnZlbnRvcnlPcGVuKHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctaW5kaWdvLTk1MC84MCBob3ZlcjpiZy1pbmRpZ28tOTAwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby0yMDAgdGV4dC14cyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zbVwiXG4gICAgICAgICAgdGl0bGU9XCJaYXJ6xIVkemFuaWUgbWFnYXp5bmVtIGkgc3RhbmFtaSB0b3dhcm93eW1pIHNrbGVwdVwiXG4gICAgICAgID5cbiAgICAgICAgICA8Qm94ZXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgIDxzcGFuPk1hZ2F6eW4gU2tsZXBvd3k8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0F1ZGl0T3Blbih0cnVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXRlYWwtOTUwLzgwIGhvdmVyOmJnLXRlYWwtOTAwIGJvcmRlciBib3JkZXItdGVhbC01MDAvNDAgdGV4dC10ZWFsLTIwMCB0ZXh0LXhzIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtXCJcbiAgICAgICAgICB0aXRsZT1cIk90d8OzcnogQXVkeXRvciBTRU8sIE5hZ8WCw7N3a8OzdyBIMS1INiBvcmF6IFJlc3BvbnN5d25vxZtjaVwiXG4gICAgICAgID5cbiAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXRlYWwtNDAwXCIgLz5cbiAgICAgICAgICA8c3Bhbj5BdWR5dCBTRU8gLyBIMTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQWlPcGVuKHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctcHVycGxlLTk1MC84MCBob3ZlcjpiZy1wdXJwbGUtOTAwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC80MCB0ZXh0LXB1cnBsZS0yMDAgdGV4dC14cyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zbVwiXG4gICAgICAgICAgdGl0bGU9XCJTa29uc3VsdHVqIHNpxJkgeiBBc3lzdGVudGVtIEFJIHogdHJ5YmVtIHd5c29raWVnbyBtecWbbGVuaWFcIlxuICAgICAgICA+XG4gICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgIDxzcGFuPkFzeXN0ZW50IEFJPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRGV2aWNlIEZyYW1lIFNpbXVsYXRpb24gQmFubmVyIGlmIG5vdCBmdWxsIHNjcmVlbiAqL31cbiAgICAgIHtwcmV2aWV3RGV2aWNlICE9PSAnZnVsbCcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXB1cnBsZS05NTAvOTAgYm9yZGVyLWIgYm9yZGVyLXB1cnBsZS01MDAvNDAgcHgtNCBweS0yIHRleHQtY2VudGVyIHRleHQteHMgdGV4dC1wdXJwbGUtMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0zIHN0aWNreSB0b3AtMCB6LTUwIGJhY2tkcm9wLWJsdXItbWRcIj5cbiAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICBBa3R5d255IHBvZGdsxIVkIHN5bXVsYWNqaSB1cnrEhWR6ZW5pYTp7JyAnfVxuICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ1cHBlcmNhc2UgZm9udC1tb25vXCI+e3ByZXZpZXdEZXZpY2V9PC9zdHJvbmc+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFByZXZpZXdEZXZpY2UoJ2Z1bGwnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctcHVycGxlLTgwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCB0ZXh0LVsxMHB4XVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgUHJ6eXdyw7PEhyAxMDAlXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIE1haW4gQXBwbGljYXRpb24gQ29udGFpbmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9e2B0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtnZXREZXZpY2VGcmFtZVdpZHRoQ2xhc3MoKX1gfT5cbiAgICAgICAgey8qIE5hdmlnYXRpb24gQmFyICovfVxuICAgICAgICA8SGVhZGVyXG4gICAgICAgICAgY2FydENvdW50PXt0b3RhbENhcnRDb3VudH1cbiAgICAgICAgICBvbk9wZW5DYXJ0PXsoKSA9PiBzZXRJc0NhcnRPcGVuKHRydWUpfVxuICAgICAgICAgIG9uT3BlbkF1ZGl0PXsoKSA9PiBzZXRJc0F1ZGl0T3Blbih0cnVlKX1cbiAgICAgICAgICBvbk9wZW5BaT17KCkgPT4gc2V0SXNBaU9wZW4odHJ1ZSl9XG4gICAgICAgICAgb25PcGVuSW52ZW50b3J5PXsoKSA9PiBzZXRJc0ludmVudG9yeU9wZW4odHJ1ZSl9XG4gICAgICAgICAgaXNIaWdoQ29udHJhc3Q9e2lzSGlnaENvbnRyYXN0fVxuICAgICAgICAgIG9uVG9nZ2xlSGlnaENvbnRyYXN0PXtoYW5kbGVUb2dnbGVIaWdoQ29udHJhc3R9XG4gICAgICAgICAgb25PcGVuVGhlbWVTdHVkaW89eygpID0+IHNldElzVGhlbWVTdHVkaW9PcGVuKHRydWUpfVxuICAgICAgICAgIGFjdGl2ZVRoZW1lPXthY3RpdmVUaGVtZX1cbiAgICAgICAgICBvblRvZ2dsZUxpZ2h0RGFyaz17KCkgPT4gc2V0QWN0aXZlVGhlbWUoKHByZXYpID0+IChwcmV2ID09PSAnbGlnaHQnID8gJ21pZG5pZ2h0JyA6ICdsaWdodCcpKX1cbiAgICAgICAgICBjcnlzdGFsQ291bnQ9e2NvbGxlY3RlZENyeXN0YWxzLmxlbmd0aH1cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogUGFnZSBTZWN0aW9ucyAqL31cbiAgICAgICAgPG1haW4+XG4gICAgICAgICAgPEhlcm9TZWN0aW9uIG9uT3BlbkFpPXsoKSA9PiBzZXRJc0FpT3Blbih0cnVlKX0gLz5cbiAgICAgICAgICA8VmlydHVhbENsaW5pY1RvdXIgLz5cbiAgICAgICAgICA8QWJvdXRTZWN0aW9uIC8+XG4gICAgICAgICAgPFN5bXB0b21zU2VjdGlvblxuICAgICAgICAgICAgc2VsZWN0ZWRTeW1wdG9tcz17c2VsZWN0ZWRTeW1wdG9tc31cbiAgICAgICAgICAgIG9uVG9nZ2xlU3ltcHRvbVRhZz17aGFuZGxlVG9nZ2xlU3ltcHRvbX1cbiAgICAgICAgICAgIG9uQ29sbGVjdENyeXN0YWw9e2hhbmRsZUNvbGxlY3RDcnlzdGFsfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFByb2N0b2xvZ3lFZHVjYXRpb25HYW1lXG4gICAgICAgICAgICBvbkNvbGxlY3RDcnlzdGFsPXsoKSA9PiBoYW5kbGVDb2xsZWN0Q3J5c3RhbCgzKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxQcm9jZXNzU2VjdGlvbiAvPlxuICAgICAgICAgIDxUcmVhdG1lbnRzU2VjdGlvbiAvPlxuICAgICAgICAgIDxBbmltYXRlZE1pY3JvTGVhcm5pbmdcbiAgICAgICAgICAgIG9uQ29sbGVjdENyeXN0YWw9e2hhbmRsZUNvbGxlY3RDcnlzdGFsfVxuICAgICAgICAgICAgaXNDcnlzdGFsQ29sbGVjdGVkPXtjb2xsZWN0ZWRDcnlzdGFscy5pbmNsdWRlcygyKX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxUcmVhdG1lbnRDYWxjdWxhdG9yXG4gICAgICAgICAgICBvbkJvb2tDb25zdWx0YXRpb249eygpID0+IHNldElzQWlPcGVuKHRydWUpfVxuICAgICAgICAgICAgY3J5c3RhbENvdW50PXtjb2xsZWN0ZWRDcnlzdGFscy5sZW5ndGh9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UGF0aWVudFN1Y2Nlc3NTdG9yaWVzIC8+XG4gICAgICAgICAgPFBhdGllbnRUZXN0aW1vbmlhbHMgLz5cbiAgICAgICAgICA8TWVkaWNhbFNob3BTZWN0aW9uXG4gICAgICAgICAgICBwcm9kdWN0cz17cHJvZHVjdHN9XG4gICAgICAgICAgICBvbkFkZFRvQ2FydD17aGFuZGxlQWRkVG9DYXJ0fVxuICAgICAgICAgICAgb25PcGVuQ2FydD17KCkgPT4gc2V0SXNDYXJ0T3Blbih0cnVlKX1cbiAgICAgICAgICAgIG9uT3BlbkludmVudG9yeT17KCkgPT4gc2V0SXNJbnZlbnRvcnlPcGVuKHRydWUpfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFJldmlld3NTZWN0aW9uIC8+XG4gICAgICAgICAgPFByb2N0b2xvZ3lIdW1vclNlY3Rpb24gLz5cbiAgICAgICAgICA8RmFxU2VjdGlvbiAvPlxuICAgICAgICA8L21haW4+XG5cbiAgICAgICAgey8qIEZvb3RlciAmIExvY2F0aW9uIEZvcm0gKi99XG4gICAgICAgIDxDb250YWN0Rm9vdGVyIC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE1vZGFscyAmIERyYXdlcnMgKi99XG4gICAgICA8Q2FydE1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNDYXJ0T3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNDYXJ0T3BlbihmYWxzZSl9XG4gICAgICAgIGNhcnRJdGVtcz17Y2FydEl0ZW1zfVxuICAgICAgICBvblVwZGF0ZVF1YW50aXR5PXtoYW5kbGVVcGRhdGVRdWFudGl0eX1cbiAgICAgICAgb25SZW1vdmVJdGVtPXtoYW5kbGVSZW1vdmVJdGVtfVxuICAgICAgICBvbkNsZWFyQ2FydD17aGFuZGxlQ2xlYXJDYXJ0fVxuICAgICAgLz5cblxuICAgICAgPEludmVudG9yeUFkbWluTW9kYWxcbiAgICAgICAgaXNPcGVuPXtpc0ludmVudG9yeU9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzSW52ZW50b3J5T3BlbihmYWxzZSl9XG4gICAgICAgIHByb2R1Y3RzPXtwcm9kdWN0c31cbiAgICAgICAgb25VcGRhdGVQcm9kdWN0PXtoYW5kbGVVcGRhdGVQcm9kdWN0fVxuICAgICAgICBvbkFkZFByb2R1Y3Q9e2hhbmRsZUFkZFByb2R1Y3R9XG4gICAgICAgIG9uRGVsZXRlUHJvZHVjdD17aGFuZGxlRGVsZXRlUHJvZHVjdH1cbiAgICAgICAgb25SZXNldFByb2R1Y3RzPXsoKSA9PiBzZXRQcm9kdWN0cyhpbml0aWFsU2hvcFByb2R1Y3RzKX1cbiAgICAgIC8+XG5cbiAgICAgIDxTZW9IZWFkaW5nSW5zcGVjdG9yTW9kYWxcbiAgICAgICAgaXNPcGVuPXtpc0F1ZGl0T3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNBdWRpdE9wZW4oZmFsc2UpfVxuICAgICAgICBzZW9NZXRhPXtzZW9NZXRhfVxuICAgICAgICBhY3RpdmVEZXZpY2U9e3ByZXZpZXdEZXZpY2V9XG4gICAgICAgIG9uQ2hhbmdlRGV2aWNlPXtzZXRQcmV2aWV3RGV2aWNlfVxuICAgICAgLz5cblxuICAgICAgPEFpQ29uc3VsdGFudE1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNBaU9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzQWlPcGVuKGZhbHNlKX1cbiAgICAgICAgc2VsZWN0ZWRTeW1wdG9tcz17c2VsZWN0ZWRTeW1wdG9tc31cbiAgICAgIC8+XG5cbiAgICAgIDxUaGVtZVN0dWRpb01vZGFsXG4gICAgICAgIGlzT3Blbj17aXNUaGVtZVN0dWRpb09wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzVGhlbWVTdHVkaW9PcGVuKGZhbHNlKX1cbiAgICAgICAgYWN0aXZlVGhlbWU9e2FjdGl2ZVRoZW1lfVxuICAgICAgICBvbkNoYW5nZVRoZW1lPXtzZXRBY3RpdmVUaGVtZX1cbiAgICAgICAgYWN0aXZlU2hhZGU9e2FjdGl2ZVNoYWRlfVxuICAgICAgICBvbkNoYW5nZVNoYWRlPXtzZXRBY3RpdmVTaGFkZX1cbiAgICAgICAgYWN0aXZlM2REZXB0aD17YWN0aXZlM2REZXB0aH1cbiAgICAgICAgb25DaGFuZ2UzZERlcHRoPXtzZXRBY3RpdmUzZERlcHRofVxuICAgICAgLz5cblxuICAgICAgey8qIEZsb2F0aW5nIExpdmUgQ2hhdCBXaWRnZXQgKi99XG4gICAgICA8RmxvYXRpbmdDaGF0V2lkZ2V0IG9uT3BlbkFpQ29uc3VsdGFudD17KCkgPT4gc2V0SXNBaU9wZW4odHJ1ZSl9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQThQTTtBQTlQTixTQUFnQixVQUFVLGlCQUFpQjtBQVUzQyxTQUFTLDJCQUEyQjtBQUNwQyxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLGNBQWM7QUFDdkIsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyx5QkFBeUI7QUFDbEMsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyx1QkFBdUI7QUFDaEMs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