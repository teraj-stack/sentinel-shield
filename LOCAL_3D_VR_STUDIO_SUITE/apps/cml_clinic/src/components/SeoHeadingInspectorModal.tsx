import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Search,
  Smartphone,
  Tablet,
  Monitor,
  Maximize2,
  FileCode,
  ShieldCheck,
  RefreshCw,
  Copy,
  Check,
  Download,
  Globe
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
export const generateXmlSitemap = (domain = "https://mcml.pro") => {
  const currentDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const appSections = [
    { path: "", priority: "1.0", changefreq: "daily", title: "Strona Główna - Dr Jan Bujok Proktolog" },
    { path: "#o-mnie", priority: "0.9", changefreq: "monthly", title: "O dr. Janie Bujoku" },
    { path: "#objawy", priority: "0.8", changefreq: "weekly", title: "Objawy i Diagnostyka Proktologiczna" },
    { path: "#wizyta", priority: "0.9", changefreq: "weekly", title: "E-Konsultacje & Rezerwacja Wizyty" },
    { path: "#leczenie", priority: "0.9", changefreq: "weekly", title: "Procedury Laserowe LHP, FiLaC, SiLaC" },
    { path: "#historie-pacjentow", priority: "0.9", changefreq: "weekly", title: "Historie Sukcesu Pacjentów (Wideo)" },
    { path: "#sklep-medyczny", priority: "0.85", changefreq: "daily", title: "Sklep Medyczny & E-Recepty" },
    { path: "#opinie", priority: "0.8", changefreq: "weekly", title: "Opinie Pacjentów ZnanyLekarz" },
    { path: "#faq", priority: "0.85", changefreq: "daily", title: "Często Zadawane Pytania (FAQ)" },
    { path: "#kontakt", priority: "0.8", changefreq: "monthly", title: "Kontakt & Lokalizacja Wilanów" }
  ];
  const urlElements = appSections.map(
    (sec) => `  <url>
    <loc>${domain}/${sec.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${sec.changefreq}</changefreq>
    <priority>${sec.priority}</priority>
  </url>`
  ).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};
export const SeoHeadingInspectorModal = ({
  isOpen,
  onClose,
  seoMeta,
  activeDevice,
  onChangeDevice
}) => {
  const [activeTab, setActiveTab] = useState("headings");
  const [copiedXml, setCopiedXml] = useState(false);
  const [headings, setHeadings] = useState([]);
  const [auditStats, setAuditStats] = useState({
    h1Count: 0,
    hasSkippedLevel: false,
    emptyHeadingsCount: 0,
    totalCount: 0,
    scorePercent: 100
  });
  const xmlSitemapContent = generateXmlSitemap();
  const handleCopyXml = () => {
    navigator.clipboard.writeText(xmlSitemapContent);
    setCopiedXml(true);
    setTimeout(() => setCopiedXml(false), 2e3);
  };
  const handleDownloadXml = () => {
    const blob = new Blob([xmlSitemapContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sitemap.xml";
    a.click();
    URL.revokeObjectURL(url);
  };
  const scanDomHeadings = () => {
    const headingElements = Array.from(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );
    const items = [];
    let h1Cnt = 0;
    let hasSkip = false;
    let emptyCnt = 0;
    let prevLevel = 0;
    headingElements.forEach((el, index) => {
      const tagName = el.tagName.toUpperCase();
      const level = parseInt(tagName.replace("H", ""), 10);
      const text = el.innerText.trim();
      if (level === 1) h1Cnt++;
      if (!text) emptyCnt++;
      let isValidOrder = true;
      let issueNote = "";
      if (prevLevel > 0 && level > prevLevel + 1) {
        isValidOrder = false;
        hasSkip = true;
        issueNote = `Pominięto poziom! Przeskok z H${prevLevel} bezpośrednio do H${level}.`;
      }
      items.push({
        tag: tagName,
        text: text || "(Pusty nagłówek)",
        level,
        id: el.id || `heading-${index}`,
        isValidOrder,
        issueNote
      });
      prevLevel = level;
    });
    let score = 100;
    if (h1Cnt === 0) score -= 40;
    else if (h1Cnt > 1) score -= 20;
    if (hasSkip) score -= 25;
    if (emptyCnt > 0) score -= 15 * emptyCnt;
    if (score < 0) score = 0;
    setHeadings(items);
    setAuditStats({
      h1Count: h1Cnt,
      hasSkippedLevel: hasSkip,
      emptyHeadingsCount: emptyCnt,
      totalCount: items.length,
      scorePercent: score
    });
  };
  useEffect(() => {
    if (isOpen) {
      scanDomHeadings();
    }
  }, [isOpen]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 172,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 171,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-lg font-bold text-slate-100", children: "Audytor SEO, Nagłówków (H1-H6) i Responsywności" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 175,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Weryfikacja poprawności struktury HTML, tagów meta oraz podglądu na urządzeniach" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 178,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 174,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 170,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: scanDomHeadings,
            className: "p-2 text-slate-400 hover:text-white bg-slate-800/80 rounded-lg text-xs font-medium flex items-center gap-1",
            title: "Skanuj ponownie",
            children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 190,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "Odśwież" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 191,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 185,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 border border-slate-700",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 198,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 194,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 184,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
      lineNumber: 169,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-800 bg-slate-950/60 px-5 gap-2 pt-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("headings"),
          className: `px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors border-b-2 flex items-center gap-2 ${activeTab === "headings" ? "border-indigo-500 text-indigo-300 bg-slate-900/90" : "border-transparent text-slate-400 hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(FileCode, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 213,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Struktura Nagłówków (",
              headings.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 214,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 205,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("seo"),
          className: `px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors border-b-2 flex items-center gap-2 ${activeTab === "seo" ? "border-teal-500 text-teal-300 bg-slate-900/90" : "border-transparent text-slate-400 hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 225,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Optymalizacja SEO & SERP" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 226,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 217,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("sitemap"),
          className: `px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors border-b-2 flex items-center gap-2 ${activeTab === "sitemap" ? "border-amber-500 text-amber-300 bg-slate-900/90" : "border-transparent text-slate-400 hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Globe, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 237,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Mapa Strony (XML Sitemap)" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 238,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 229,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("responsive"),
          className: `px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-colors border-b-2 flex items-center gap-2 ${activeTab === "responsive" ? "border-purple-500 text-purple-300 bg-slate-900/90" : "border-transparent text-slate-400 hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Monitor, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 249,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Test Responsywności" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 250,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 241,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
      lineNumber: 204,
      columnNumber: 9
    }, this),
    activeTab === "headings" && /* @__PURE__ */ jsxDEV("div", { className: "p-6 overflow-y-auto space-y-6 flex-1", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-4 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-slate-400 block mb-1", children: "Wynik Struktury" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 260,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: `text-2xl font-black ${auditStats.scorePercent >= 80 ? "text-teal-400" : auditStats.scorePercent >= 50 ? "text-amber-400" : "text-rose-400"}`,
              children: [
                auditStats.scorePercent,
                " / 100"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 263,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 259,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-slate-400 block mb-1", children: "Nagłówki H1" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 277,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: `text-xl font-bold flex items-center justify-center gap-1 ${auditStats.h1Count === 1 ? "text-teal-400" : "text-amber-400"}`,
              children: [
                auditStats.h1Count === 1 ? /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 286,
                  columnNumber: 21
                }, this) : /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 288,
                  columnNumber: 21
                }, this),
                auditStats.h1Count,
                " (Zalecane: 1)"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 280,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 276,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-slate-400 block mb-1", children: "Hierarchia (H1-H6)" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 295,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: `text-xs font-semibold flex items-center justify-center gap-1 ${!auditStats.hasSkippedLevel ? "text-teal-400" : "text-rose-400"}`,
              children: !auditStats.hasSkippedLevel ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 305,
                  columnNumber: 23
                }, this),
                "Prawidłowa"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 304,
                columnNumber: 21
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(XCircle, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 310,
                  columnNumber: 23
                }, this),
                "Pominięte poziomy"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 309,
                columnNumber: 21
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 298,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 294,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-slate-400 block mb-1", children: "Puste Nagłówki" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 318,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-bold text-slate-200", children: auditStats.emptyHeadingsCount }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 321,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 317,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 258,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider mb-3", children: "Wykryte Nagłówki w kolejności występowania:" }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 329,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800", children: headings.map((item, i) => {
          const indent = (item.level - 1) * 20;
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              style: { paddingLeft: `${indent}px` },
              className: `py-2 px-3 rounded-lg border text-xs flex items-center justify-between gap-3 ${!item.isValidOrder ? "bg-rose-950/30 border-rose-500/40 text-rose-200" : item.tag === "H1" ? "bg-indigo-950/40 border-indigo-500/40 text-indigo-200 font-bold" : "bg-slate-900/80 border-slate-800 text-slate-200"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 overflow-hidden", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded font-mono text-[10px] font-black bg-slate-800 text-indigo-300", children: item.tag }, void 0, false, {
                    fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                    lineNumber: 348,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "truncate", children: item.text }, void 0, false, {
                    fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                    lineNumber: 351,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 347,
                  columnNumber: 23
                }, this),
                !item.isValidOrder && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-rose-400 font-medium shrink-0 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-3 h-3" }, void 0, false, {
                    fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                    lineNumber: 356,
                    columnNumber: 27
                  }, this),
                  item.issueNote
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 355,
                  columnNumber: 25
                }, this)
              ]
            },
            i,
            true,
            {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 336,
              columnNumber: 21
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 332,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 328,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
      lineNumber: 256,
      columnNumber: 11
    }, this),
    activeTab === "seo" && /* @__PURE__ */ jsxDEV("div", { className: "p-6 overflow-y-auto space-y-6 flex-1", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-slate-400 block mb-1", children: "Podgląd wyniku w Google (SERP Preview):" }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 373,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-emerald-400 font-mono flex items-center gap-1 truncate", children: "https://mcml.pro › dr-jan-bujok-proktologia-laserowa" }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 376,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h4", { className: "text-lg font-normal text-blue-400 hover:underline cursor-pointer", children: seoMeta.title }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 379,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 leading-normal line-clamp-2", children: seoMeta.description }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 382,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 372,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Title (Tytuł strony)" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 391,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px]", children: seoMeta.title }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 392,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 390,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: `px-2 py-1 rounded text-[10px] font-mono font-bold ${seoMeta.title.length >= 30 && seoMeta.title.length <= 70 ? "bg-teal-950 text-teal-300 border border-teal-500/40" : "bg-amber-950 text-amber-300"}`,
              children: [
                seoMeta.title.length,
                " zn. (Optimum: 50-60)"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 394,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 389,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Meta Description (Opis)" }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 407,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[11px] max-w-md line-clamp-1", children: seoMeta.description }, void 0, false, {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 408,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 406,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "span",
            {
              className: `px-2 py-1 rounded text-[10px] font-mono font-bold ${seoMeta.description.length >= 120 && seoMeta.description.length <= 165 ? "bg-teal-950 text-teal-300 border border-teal-500/40" : "bg-amber-950 text-amber-300"}`,
              children: [
                seoMeta.description.length,
                " zn. (Optimum: 120-160)"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 412,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 405,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Ustrukturyzowane Dane Medyczne JSON-LD (MedicalBusiness / Physician):" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 424,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("pre", { className: "p-3 rounded-lg bg-slate-900 border border-slate-800 text-[10px] font-mono text-indigo-300 overflow-x-auto max-h-36", children: seoMeta.structuredDataJson }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 427,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 423,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 388,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
      lineNumber: 370,
      columnNumber: 11
    }, this),
    activeTab === "sitemap" && /* @__PURE__ */ jsxDEV("div", { className: "p-6 overflow-y-auto space-y-6 flex-1", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-amber-500/30", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-amber-400 uppercase tracking-wide block mb-1", children: "Automatyczny Generator XML Sitemap (Google Indexing Protocol)" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 440,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300", children: "Kod sitemap.xml wygenerowany dynamicznie dla sekcji aplikacji CML. Ułatwia indeksację robotom Googlebot." }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 443,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 439,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 shrink-0", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleCopyXml,
              className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all border border-slate-700",
              children: copiedXml ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-teal-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 455,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-teal-300", children: "Skopiowano!" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 456,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 454,
                columnNumber: 21
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 460,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Kopiuj XML" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 461,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 459,
                columnNumber: 21
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 449,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadXml,
              className: "px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-amber-600/30",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 470,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz sitemap.xml" }, void 0, false, {
                  fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                  lineNumber: 471,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
              lineNumber: 466,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 448,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 438,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs text-slate-400 px-1", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Podgląd wygenerowanego pliku sitemap.xml:" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 478,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[11px] text-amber-300 font-semibold", children: "Standard W3C Sitemaps 0.9" }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 479,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 477,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("pre", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-200/90 leading-relaxed overflow-x-auto max-h-96 selection:bg-amber-500 selection:text-black", children: xmlSitemapContent }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 481,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 476,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
      lineNumber: 437,
      columnNumber: 11
    }, this),
    activeTab === "responsive" && /* @__PURE__ */ jsxDEV("div", { className: "p-6 overflow-y-auto space-y-6 flex-1 text-center", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300", children: "Wybierz rozdzielczość, aby zweryfikować układ graficzny, czytelność i zachowanie menu nawigacyjnego:" }, void 0, false, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 491,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onChangeDevice("mobile"),
            className: `px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${activeDevice === "mobile" ? "bg-purple-600 text-white border-purple-400 shadow-lg" : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 504,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Smartfon (375px)" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 505,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 496,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onChangeDevice("tablet"),
            className: `px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${activeDevice === "tablet" ? "bg-purple-600 text-white border-purple-400 shadow-lg" : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Tablet, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 516,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Tablet (768px)" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 517,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 508,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onChangeDevice("desktop"),
            className: `px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${activeDevice === "desktop" ? "bg-purple-600 text-white border-purple-400 shadow-lg" : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Monitor, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 528,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Laptop (1280px)" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 529,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 520,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onChangeDevice("full"),
            className: `px-4 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2 border transition-all ${activeDevice === "full" ? "bg-purple-600 text-white border-purple-400 shadow-lg" : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Maximize2, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 540,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pełna szerokość (100%)" }, void 0, false, {
                fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
                lineNumber: 541,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 532,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 495,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800 text-left text-xs text-slate-400 space-y-2 max-w-lg mx-auto", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200 block", children: "Zasady Responsywności & Dostępności CML:" }, void 0, false, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 546,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("ul", { className: "list-disc pl-4 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("li", { children: "Obszar dotykowy przycisków min. 44x44px na urządzeniach mobilnych." }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 550,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: "Główny stos nagłówkowy skaluje się płynnie za pomocą CSS clamp()." }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 551,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: "Brak horyzontalnego paska przewijania (overflow-x: hidden)." }, void 0, false, {
            fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
            lineNumber: 552,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
          lineNumber: 549,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
        lineNumber: 545,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
      lineNumber: 490,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
    lineNumber: 167,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/SeoHeadingInspectorModal.tsx",
    lineNumber: 166,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlb0hlYWRpbmdJbnNwZWN0b3JNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBIZWFkaW5nQXVkaXRJdGVtLCBTZW9NZXRhU3RhdGUsIFNjcmVlbkRldmljZVByZXZpZXcgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQge1xuICBYLFxuICBDaGVja0NpcmNsZSxcbiAgQWxlcnRUcmlhbmdsZSxcbiAgWENpcmNsZSxcbiAgU2VhcmNoLFxuICBTbWFydHBob25lLFxuICBUYWJsZXQsXG4gIE1vbml0b3IsXG4gIE1heGltaXplMixcbiAgRmlsZUNvZGUsXG4gIFNoaWVsZENoZWNrLFxuICBSZWZyZXNoQ3csXG4gIENvcHksXG4gIENoZWNrLFxuICBEb3dubG9hZCxcbiAgR2xvYmUsXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5cbmludGVyZmFjZSBTZW9IZWFkaW5nSW5zcGVjdG9yTW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgc2VvTWV0YTogU2VvTWV0YVN0YXRlO1xuICBhY3RpdmVEZXZpY2U6IFNjcmVlbkRldmljZVByZXZpZXc7XG4gIG9uQ2hhbmdlRGV2aWNlOiAoZGV2OiBTY3JlZW5EZXZpY2VQcmV2aWV3KSA9PiB2b2lkO1xufVxuXG4vLyBBdXRvbWF0ZWQgWE1MIFNpdGVtYXAgR2VuZXJhdG9yIEhlbHBlclxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlWG1sU2l0ZW1hcCA9IChkb21haW46IHN0cmluZyA9ICdodHRwczovL21jbWwucHJvJyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNwbGl0KCdUJylbMF07XG4gIGNvbnN0IGFwcFNlY3Rpb25zID0gW1xuICAgIHsgcGF0aDogJycsIHByaW9yaXR5OiAnMS4wJywgY2hhbmdlZnJlcTogJ2RhaWx5JywgdGl0bGU6ICdTdHJvbmEgR8WCw7N3bmEgLSBEciBKYW4gQnVqb2sgUHJva3RvbG9nJyB9LFxuICAgIHsgcGF0aDogJyNvLW1uaWUnLCBwcmlvcml0eTogJzAuOScsIGNoYW5nZWZyZXE6ICdtb250aGx5JywgdGl0bGU6ICdPIGRyLiBKYW5pZSBCdWpva3UnIH0sXG4gICAgeyBwYXRoOiAnI29iamF3eScsIHByaW9yaXR5OiAnMC44JywgY2hhbmdlZnJlcTogJ3dlZWtseScsIHRpdGxlOiAnT2JqYXd5IGkgRGlhZ25vc3R5a2EgUHJva3RvbG9naWN6bmEnIH0sXG4gICAgeyBwYXRoOiAnI3dpenl0YScsIHByaW9yaXR5OiAnMC45JywgY2hhbmdlZnJlcTogJ3dlZWtseScsIHRpdGxlOiAnRS1Lb25zdWx0YWNqZSAmIFJlemVyd2FjamEgV2l6eXR5JyB9LFxuICAgIHsgcGF0aDogJyNsZWN6ZW5pZScsIHByaW9yaXR5OiAnMC45JywgY2hhbmdlZnJlcTogJ3dlZWtseScsIHRpdGxlOiAnUHJvY2VkdXJ5IExhc2Vyb3dlIExIUCwgRmlMYUMsIFNpTGFDJyB9LFxuICAgIHsgcGF0aDogJyNoaXN0b3JpZS1wYWNqZW50b3cnLCBwcmlvcml0eTogJzAuOScsIGNoYW5nZWZyZXE6ICd3ZWVrbHknLCB0aXRsZTogJ0hpc3RvcmllIFN1a2Nlc3UgUGFjamVudMOzdyAoV2lkZW8pJyB9LFxuICAgIHsgcGF0aDogJyNza2xlcC1tZWR5Y3pueScsIHByaW9yaXR5OiAnMC44NScsIGNoYW5nZWZyZXE6ICdkYWlseScsIHRpdGxlOiAnU2tsZXAgTWVkeWN6bnkgJiBFLVJlY2VwdHknIH0sXG4gICAgeyBwYXRoOiAnI29waW5pZScsIHByaW9yaXR5OiAnMC44JywgY2hhbmdlZnJlcTogJ3dlZWtseScsIHRpdGxlOiAnT3BpbmllIFBhY2plbnTDs3cgWm5hbnlMZWthcnonIH0sXG4gICAgeyBwYXRoOiAnI2ZhcScsIHByaW9yaXR5OiAnMC44NScsIGNoYW5nZWZyZXE6ICdkYWlseScsIHRpdGxlOiAnQ3rEmXN0byBaYWRhd2FuZSBQeXRhbmlhIChGQVEpJyB9LFxuICAgIHsgcGF0aDogJyNrb250YWt0JywgcHJpb3JpdHk6ICcwLjgnLCBjaGFuZ2VmcmVxOiAnbW9udGhseScsIHRpdGxlOiAnS29udGFrdCAmIExva2FsaXphY2phIFdpbGFuw7N3JyB9LFxuICBdO1xuXG4gIGNvbnN0IHVybEVsZW1lbnRzID0gYXBwU2VjdGlvbnNcbiAgICAubWFwKFxuICAgICAgKHNlYykgPT4gYCAgPHVybD5cbiAgICA8bG9jPiR7ZG9tYWlufS8ke3NlYy5wYXRofTwvbG9jPlxuICAgIDxsYXN0bW9kPiR7Y3VycmVudERhdGV9PC9sYXN0bW9kPlxuICAgIDxjaGFuZ2VmcmVxPiR7c2VjLmNoYW5nZWZyZXF9PC9jaGFuZ2VmcmVxPlxuICAgIDxwcmlvcml0eT4ke3NlYy5wcmlvcml0eX08L3ByaW9yaXR5PlxuICA8L3VybD5gXG4gICAgKVxuICAgIC5qb2luKCdcXG4nKTtcblxuICByZXR1cm4gYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cIlVURi04XCI/PlxuPHVybHNldCB4bWxucz1cImh0dHA6Ly93d3cuc2l0ZW1hcHMub3JnL3NjaGVtYXMvc2l0ZW1hcC8wLjlcIj5cbiR7dXJsRWxlbWVudHN9XG48L3VybHNldD5gO1xufTtcblxuZXhwb3J0IGNvbnN0IFNlb0hlYWRpbmdJbnNwZWN0b3JNb2RhbDogUmVhY3QuRkM8U2VvSGVhZGluZ0luc3BlY3Rvck1vZGFsUHJvcHM+ID0gKHtcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuICBzZW9NZXRhLFxuICBhY3RpdmVEZXZpY2UsXG4gIG9uQ2hhbmdlRGV2aWNlLFxufSkgPT4ge1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8J2hlYWRpbmdzJyB8ICdzZW8nIHwgJ3NpdGVtYXAnIHwgJ3Jlc3BvbnNpdmUnPignaGVhZGluZ3MnKTtcbiAgY29uc3QgW2NvcGllZFhtbCwgc2V0Q29waWVkWG1sXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2hlYWRpbmdzLCBzZXRIZWFkaW5nc10gPSB1c2VTdGF0ZTxIZWFkaW5nQXVkaXRJdGVtW10+KFtdKTtcbiAgY29uc3QgW2F1ZGl0U3RhdHMsIHNldEF1ZGl0U3RhdHNdID0gdXNlU3RhdGUoe1xuICAgIGgxQ291bnQ6IDAsXG4gICAgaGFzU2tpcHBlZExldmVsOiBmYWxzZSxcbiAgICBlbXB0eUhlYWRpbmdzQ291bnQ6IDAsXG4gICAgdG90YWxDb3VudDogMCxcbiAgICBzY29yZVBlcmNlbnQ6IDEwMCxcbiAgfSk7XG5cbiAgY29uc3QgeG1sU2l0ZW1hcENvbnRlbnQgPSBnZW5lcmF0ZVhtbFNpdGVtYXAoKTtcblxuICBjb25zdCBoYW5kbGVDb3B5WG1sID0gKCkgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHhtbFNpdGVtYXBDb250ZW50KTtcbiAgICBzZXRDb3BpZWRYbWwodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRYbWwoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFhtbCA9ICgpID0+IHtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3htbFNpdGVtYXBDb250ZW50XSwgeyB0eXBlOiAnYXBwbGljYXRpb24veG1sJyB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgYS5ocmVmID0gdXJsO1xuICAgIGEuZG93bmxvYWQgPSAnc2l0ZW1hcC54bWwnO1xuICAgIGEuY2xpY2soKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gIH07XG5cbiAgLy8gU2NhbiBIZWFkaW5ncyBmcm9tIERPTSB3aGVuIG1vZGFsIG9wZW5zIG9yIGNvbnRlbnQgdXBkYXRlc1xuICBjb25zdCBzY2FuRG9tSGVhZGluZ3MgPSAoKSA9PiB7XG4gICAgY29uc3QgaGVhZGluZ0VsZW1lbnRzID0gQXJyYXkuZnJvbShcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2gxLCBoMiwgaDMsIGg0LCBoNSwgaDYnKVxuICAgICkgYXMgSFRNTEVsZW1lbnRbXTtcblxuICAgIGNvbnN0IGl0ZW1zOiBIZWFkaW5nQXVkaXRJdGVtW10gPSBbXTtcbiAgICBsZXQgaDFDbnQgPSAwO1xuICAgIGxldCBoYXNTa2lwID0gZmFsc2U7XG4gICAgbGV0IGVtcHR5Q250ID0gMDtcbiAgICBsZXQgcHJldkxldmVsID0gMDtcblxuICAgIGhlYWRpbmdFbGVtZW50cy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHRhZ05hbWUgPSBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgYXMgJ0gxJyB8ICdIMicgfCAnSDMnIHwgJ0g0JyB8ICdINScgfCAnSDYnO1xuICAgICAgY29uc3QgbGV2ZWwgPSBwYXJzZUludCh0YWdOYW1lLnJlcGxhY2UoJ0gnLCAnJyksIDEwKTtcbiAgICAgIGNvbnN0IHRleHQgPSBlbC5pbm5lclRleHQudHJpbSgpO1xuXG4gICAgICBpZiAobGV2ZWwgPT09IDEpIGgxQ250Kys7XG4gICAgICBpZiAoIXRleHQpIGVtcHR5Q250Kys7XG5cbiAgICAgIGxldCBpc1ZhbGlkT3JkZXIgPSB0cnVlO1xuICAgICAgbGV0IGlzc3VlTm90ZSA9ICcnO1xuXG4gICAgICBpZiAocHJldkxldmVsID4gMCAmJiBsZXZlbCA+IHByZXZMZXZlbCArIDEpIHtcbiAgICAgICAgaXNWYWxpZE9yZGVyID0gZmFsc2U7XG4gICAgICAgIGhhc1NraXAgPSB0cnVlO1xuICAgICAgICBpc3N1ZU5vdGUgPSBgUG9taW5pxJl0byBwb3ppb20hIFByemVza29rIHogSCR7cHJldkxldmVsfSBiZXpwb8WbcmVkbmlvIGRvIEgke2xldmVsfS5gO1xuICAgICAgfVxuXG4gICAgICBpdGVtcy5wdXNoKHtcbiAgICAgICAgdGFnOiB0YWdOYW1lLFxuICAgICAgICB0ZXh0OiB0ZXh0IHx8ICcoUHVzdHkgbmFnxYLDs3dlayknLFxuICAgICAgICBsZXZlbCxcbiAgICAgICAgaWQ6IGVsLmlkIHx8IGBoZWFkaW5nLSR7aW5kZXh9YCxcbiAgICAgICAgaXNWYWxpZE9yZGVyLFxuICAgICAgICBpc3N1ZU5vdGUsXG4gICAgICB9KTtcblxuICAgICAgcHJldkxldmVsID0gbGV2ZWw7XG4gICAgfSk7XG5cbiAgICBsZXQgc2NvcmUgPSAxMDA7XG4gICAgaWYgKGgxQ250ID09PSAwKSBzY29yZSAtPSA0MDtcbiAgICBlbHNlIGlmIChoMUNudCA+IDEpIHNjb3JlIC09IDIwO1xuICAgIGlmIChoYXNTa2lwKSBzY29yZSAtPSAyNTtcbiAgICBpZiAoZW1wdHlDbnQgPiAwKSBzY29yZSAtPSAxNSAqIGVtcHR5Q250O1xuICAgIGlmIChzY29yZSA8IDApIHNjb3JlID0gMDtcblxuICAgIHNldEhlYWRpbmdzKGl0ZW1zKTtcbiAgICBzZXRBdWRpdFN0YXRzKHtcbiAgICAgIGgxQ291bnQ6IGgxQ250LFxuICAgICAgaGFzU2tpcHBlZExldmVsOiBoYXNTa2lwLFxuICAgICAgZW1wdHlIZWFkaW5nc0NvdW50OiBlbXB0eUNudCxcbiAgICAgIHRvdGFsQ291bnQ6IGl0ZW1zLmxlbmd0aCxcbiAgICAgIHNjb3JlUGVyY2VudDogc2NvcmUsXG4gICAgfSk7XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoaXNPcGVuKSB7XG4gICAgICBzY2FuRG9tSGVhZGluZ3MoKTtcbiAgICB9XG4gIH0sIFtpc09wZW5dKTtcblxuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei01MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvODUgYmFja2Ryb3AtYmx1ci1tZCBwLTQgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy00eGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHNoYWRvdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgbWF4LWgtWzkwdmhdXCI+XG4gICAgICAgIHsvKiBNb2RhbCBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IGJnLXNsYXRlLTk1MCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctdGVhbC01MDAvMjAgdGV4dC10ZWFsLTQwMCBib3JkZXIgYm9yZGVyLXRlYWwtNTAwLzMwXCI+XG4gICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtc2VyaWYgdGV4dC1sZyBmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgICAgICBBdWR5dG9yIFNFTywgTmFnxYLDs3drw7N3IChIMS1INikgaSBSZXNwb25zeXdub8WbY2lcbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIFdlcnlmaWthY2phIHBvcHJhd25vxZtjaSBzdHJ1a3R1cnkgSFRNTCwgdGFnw7N3IG1ldGEgb3JheiBwb2RnbMSFZHUgbmEgdXJ6xIVkemVuaWFjaFxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17c2NhbkRvbUhlYWRpbmdzfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1zbGF0ZS04MDAvODAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJTa2FudWogcG9ub3duaWVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmlubGluZVwiPk9kxZt3aWXFvDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgYmctc2xhdGUtODAwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1vZGFsIE5hdmlnYXRpb24gVGFicyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgYmctc2xhdGUtOTUwLzYwIHB4LTUgZ2FwLTIgcHQtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignaGVhZGluZ3MnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMi41IHRleHQteHMgZm9udC1zZW1pYm9sZCByb3VuZGVkLXQteGwgdHJhbnNpdGlvbi1jb2xvcnMgYm9yZGVyLWItMiBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiAke1xuICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdoZWFkaW5ncydcbiAgICAgICAgICAgICAgICA/ICdib3JkZXItaW5kaWdvLTUwMCB0ZXh0LWluZGlnby0zMDAgYmctc2xhdGUtOTAwLzkwJ1xuICAgICAgICAgICAgICAgIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxGaWxlQ29kZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlN0cnVrdHVyYSBOYWfFgsOzd2vDs3cgKHtoZWFkaW5ncy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignc2VvJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgcm91bmRlZC10LXhsIHRyYW5zaXRpb24tY29sb3JzIGJvcmRlci1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnc2VvJ1xuICAgICAgICAgICAgICAgID8gJ2JvcmRlci10ZWFsLTUwMCB0ZXh0LXRlYWwtMzAwIGJnLXNsYXRlLTkwMC85MCdcbiAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPHNwYW4+T3B0eW1hbGl6YWNqYSBTRU8gJiBTRVJQPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdzaXRlbWFwJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgcm91bmRlZC10LXhsIHRyYW5zaXRpb24tY29sb3JzIGJvcmRlci1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnc2l0ZW1hcCdcbiAgICAgICAgICAgICAgICA/ICdib3JkZXItYW1iZXItNTAwIHRleHQtYW1iZXItMzAwIGJnLXNsYXRlLTkwMC85MCdcbiAgICAgICAgICAgICAgICA6ICdib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8R2xvYmUgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5NYXBhIFN0cm9ueSAoWE1MIFNpdGVtYXApPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdyZXNwb25zaXZlJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgcm91bmRlZC10LXhsIHRyYW5zaXRpb24tY29sb3JzIGJvcmRlci1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAncmVzcG9uc2l2ZSdcbiAgICAgICAgICAgICAgICA/ICdib3JkZXItcHVycGxlLTUwMCB0ZXh0LXB1cnBsZS0zMDAgYmctc2xhdGUtOTAwLzkwJ1xuICAgICAgICAgICAgICAgIDogJ2JvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNb25pdG9yIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VGVzdCBSZXNwb25zeXdub8WbY2k8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUYWIgMTogSGVhZGluZyBTdHJ1Y3R1cmUgQW5hbHlzaXMgKi99XG4gICAgICAgIHthY3RpdmVUYWIgPT09ICdoZWFkaW5ncycgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IG92ZXJmbG93LXktYXV0byBzcGFjZS15LTYgZmxleC0xXCI+XG4gICAgICAgICAgICB7LyogU2NvcmUgJiBBbGVydCBCYW5uZXJzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy00IGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwIGJsb2NrIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIFd5bmlrIFN0cnVrdHVyeVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC0yeGwgZm9udC1ibGFjayAke1xuICAgICAgICAgICAgICAgICAgICBhdWRpdFN0YXRzLnNjb3JlUGVyY2VudCA+PSA4MFxuICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtdGVhbC00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiBhdWRpdFN0YXRzLnNjb3JlUGVyY2VudCA+PSA1MFxuICAgICAgICAgICAgICAgICAgICAgID8gJ3RleHQtYW1iZXItNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ3RleHQtcm9zZS00MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7YXVkaXRTdGF0cy5zY29yZVBlcmNlbnR9IC8gMTAwXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCBibG9jayBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBOYWfFgsOzd2tpIEgxXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LXhsIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSAke1xuICAgICAgICAgICAgICAgICAgICBhdWRpdFN0YXRzLmgxQ291bnQgPT09IDEgPyAndGV4dC10ZWFsLTQwMCcgOiAndGV4dC1hbWJlci00MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7YXVkaXRTdGF0cy5oMUNvdW50ID09PSAxID8gKFxuICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICB7YXVkaXRTdGF0cy5oMUNvdW50fSAoWmFsZWNhbmU6IDEpXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCBibG9jayBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBIaWVyYXJjaGlhIChIMS1INilcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSAke1xuICAgICAgICAgICAgICAgICAgICAhYXVkaXRTdGF0cy5oYXNTa2lwcGVkTGV2ZWwgPyAndGV4dC10ZWFsLTQwMCcgOiAndGV4dC1yb3NlLTQwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHshYXVkaXRTdGF0cy5oYXNTa2lwcGVkTGV2ZWwgPyAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBQcmF3aWTFgm93YVxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPFhDaXJjbGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIFBvbWluacSZdGUgcG96aW9teVxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTQwMCBibG9jayBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBQdXN0ZSBOYWfFgsOzd2tpXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICB7YXVkaXRTdGF0cy5lbXB0eUhlYWRpbmdzQ291bnR9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogVHJlZSBWaWV3IG9mIFBhZ2UgSGVhZGluZ3MgKi99XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0zMDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTNcIj5cbiAgICAgICAgICAgICAgICBXeWtyeXRlIE5hZ8WCw7N3a2kgdyBrb2xlam5vxZtjaSB3eXN0xJlwb3dhbmlhOlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiBiZy1zbGF0ZS05NTAgcC00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICB7aGVhZGluZ3MubWFwKChpdGVtLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpbmRlbnQgPSAoaXRlbS5sZXZlbCAtIDEpICogMjA7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHBhZGRpbmdMZWZ0OiBgJHtpbmRlbnR9cHhgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHktMiBweC0zIHJvdW5kZWQtbGcgYm9yZGVyIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAhaXRlbS5pc1ZhbGlkT3JkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcm9zZS05NTAvMzAgYm9yZGVyLXJvc2UtNTAwLzQwIHRleHQtcm9zZS0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogaXRlbS50YWcgPT09ICdIMSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctaW5kaWdvLTk1MC80MCBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby0yMDAgZm9udC1ib2xkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvODAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgYmctc2xhdGUtODAwIHRleHQtaW5kaWdvLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS50YWd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntpdGVtLnRleHR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgeyFpdGVtLmlzVmFsaWRPcmRlciAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXJvc2UtNDAwIGZvbnQtbWVkaXVtIHNocmluay0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxBbGVydFRyaWFuZ2xlIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7aXRlbS5pc3N1ZU5vdGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBUYWIgMjogU0VPIE1ldGEgJiBHb29nbGUgU0VSUCBQcmV2aWV3ICovfVxuICAgICAgICB7YWN0aXZlVGFiID09PSAnc2VvJyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgb3ZlcmZsb3cteS1hdXRvIHNwYWNlLXktNiBmbGV4LTFcIj5cbiAgICAgICAgICAgIHsvKiBHb29nbGUgU2VhcmNoIFNuaXBwZXQgU2ltdWxhdGlvbiAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwIGJsb2NrIG1iLTFcIj5cbiAgICAgICAgICAgICAgICBQb2RnbMSFZCB3eW5pa3UgdyBHb29nbGUgKFNFUlAgUHJldmlldyk6XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgaHR0cHM6Ly9tY21sLnBybyDigLogZHItamFuLWJ1am9rLXByb2t0b2xvZ2lhLWxhc2Vyb3dhXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LW5vcm1hbCB0ZXh0LWJsdWUtNDAwIGhvdmVyOnVuZGVybGluZSBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgICAgIHtzZW9NZXRhLnRpdGxlfVxuICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctbm9ybWFsIGxpbmUtY2xhbXAtMlwiPlxuICAgICAgICAgICAgICAgIHtzZW9NZXRhLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE1ldGEgVGFncyBIZWFsdGggQ2hlY2sgTGlzdCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBibG9ja1wiPlRpdGxlIChUeXR1xYIgc3Ryb255KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdXCI+e3Nlb01ldGEudGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTEgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICAgIHNlb01ldGEudGl0bGUubGVuZ3RoID49IDMwICYmIHNlb01ldGEudGl0bGUubGVuZ3RoIDw9IDcwXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctdGVhbC05NTAgdGV4dC10ZWFsLTMwMCBib3JkZXIgYm9yZGVyLXRlYWwtNTAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtzZW9NZXRhLnRpdGxlLmxlbmd0aH0gem4uIChPcHRpbXVtOiA1MC02MClcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBibG9ja1wiPk1ldGEgRGVzY3JpcHRpb24gKE9waXMpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF0gbWF4LXctbWQgbGluZS1jbGFtcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzZW9NZXRhLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTEgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICAgIHNlb01ldGEuZGVzY3JpcHRpb24ubGVuZ3RoID49IDEyMCAmJiBzZW9NZXRhLmRlc2NyaXB0aW9uLmxlbmd0aCA8PSAxNjVcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy10ZWFsLTk1MCB0ZXh0LXRlYWwtMzAwIGJvcmRlciBib3JkZXItdGVhbC01MDAvNDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctYW1iZXItOTUwIHRleHQtYW1iZXItMzAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3Nlb01ldGEuZGVzY3JpcHRpb24ubGVuZ3RofSB6bi4gKE9wdGltdW06IDEyMC0xNjApXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTIwMCBibG9ja1wiPlxuICAgICAgICAgICAgICAgICAgVXN0cnVrdHVyeXpvd2FuZSBEYW5lIE1lZHljem5lIEpTT04tTEQgKE1lZGljYWxCdXNpbmVzcyAvIFBoeXNpY2lhbik6XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWluZGlnby0zMDAgb3ZlcmZsb3cteC1hdXRvIG1heC1oLTM2XCI+XG4gICAgICAgICAgICAgICAgICB7c2VvTWV0YS5zdHJ1Y3R1cmVkRGF0YUpzb259XG4gICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFRhYiAzOiBYTUwgU2l0ZW1hcCBHZW5lcmF0b3IgKi99XG4gICAgICAgIHthY3RpdmVUYWIgPT09ICdzaXRlbWFwJyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgb3ZlcmZsb3cteS1hdXRvIHNwYWNlLXktNiBmbGV4LTFcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtYW1iZXItNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlIGJsb2NrIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIEF1dG9tYXR5Y3pueSBHZW5lcmF0b3IgWE1MIFNpdGVtYXAgKEdvb2dsZSBJbmRleGluZyBQcm90b2NvbClcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgS29kIHNpdGVtYXAueG1sIHd5Z2VuZXJvd2FueSBkeW5hbWljem5pZSBkbGEgc2VrY2ppIGFwbGlrYWNqaSBDTUwuIFXFgmF0d2lhIGluZGVrc2FjasSZIHJvYm90b20gR29vZ2xlYm90LlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvcHlYbWx9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtjb3BpZWRYbWwgPyAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC10ZWFsLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC10ZWFsLTMwMFwiPlNrb3Bpb3dhbm8hPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPENvcHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+S29waXVqIFhNTDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRYbWx9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLWFtYmVyLTYwMCBob3ZlcjpiZy1hbWJlci01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbWQgc2hhZG93LWFtYmVyLTYwMC8zMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBzaXRlbWFwLnhtbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBweC0xXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+UG9kZ2zEhWQgd3lnZW5lcm93YW5lZ28gcGxpa3Ugc2l0ZW1hcC54bWw6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LWFtYmVyLTMwMCBmb250LXNlbWlib2xkXCI+U3RhbmRhcmQgVzNDIFNpdGVtYXBzIDAuOTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgZm9udC1tb25vIHRleHQtYW1iZXItMjAwLzkwIGxlYWRpbmctcmVsYXhlZCBvdmVyZmxvdy14LWF1dG8gbWF4LWgtOTYgc2VsZWN0aW9uOmJnLWFtYmVyLTUwMCBzZWxlY3Rpb246dGV4dC1ibGFja1wiPlxuICAgICAgICAgICAgICAgIHt4bWxTaXRlbWFwQ29udGVudH1cbiAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogVGFiIDQ6IFJlc3BvbnNpdmVuZXNzIFRlc3RlciAqL31cbiAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3Jlc3BvbnNpdmUnICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiBvdmVyZmxvdy15LWF1dG8gc3BhY2UteS02IGZsZXgtMSB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICBXeWJpZXJ6IHJvemR6aWVsY3pvxZvEhywgYWJ5IHp3ZXJ5Zmlrb3dhxIcgdWvFgmFkIGdyYWZpY3pueSwgY3p5dGVsbm/Fm8SHIGkgemFjaG93YW5pZSBtZW51IG5hd2lnYWN5am5lZ286XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlRGV2aWNlKCdtb2JpbGUnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBhY3RpdmVEZXZpY2UgPT09ICdtb2JpbGUnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBib3JkZXItcHVycGxlLTQwMCBzaGFkb3ctbGcnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTMwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TbWFydGZvbiAoMzc1cHgpPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25DaGFuZ2VEZXZpY2UoJ3RhYmxldCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZURldmljZSA9PT0gJ3RhYmxldCdcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIGJvcmRlci1wdXJwbGUtNDAwIHNoYWRvdy1sZydcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtMzAwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxUYWJsZXQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+VGFibGV0ICg3NjhweCk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZURldmljZSgnZGVza3RvcCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZURldmljZSA9PT0gJ2Rlc2t0b3AnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBib3JkZXItcHVycGxlLTQwMCBzaGFkb3ctbGcnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTMwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5MYXB0b3AgKDEyODBweCk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkNoYW5nZURldmljZSgnZnVsbCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZURldmljZSA9PT0gJ2Z1bGwnXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBib3JkZXItcHVycGxlLTQwMCBzaGFkb3ctbGcnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTMwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8TWF4aW1pemUyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBlxYJuYSBzemVyb2tvxZvEhyAoMTAwJSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtbGVmdCB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIHNwYWNlLXktMiBtYXgtdy1sZyBteC1hdXRvXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICBaYXNhZHkgUmVzcG9uc3l3bm/Fm2NpICYgRG9zdMSZcG5vxZtjaSBDTUw6XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cImxpc3QtZGlzYyBwbC00IHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgIDxsaT5PYnN6YXIgZG90eWtvd3kgcHJ6eWNpc2vDs3cgbWluLiA0NHg0NHB4IG5hIHVyesSFZHplbmlhY2ggbW9iaWxueWNoLjwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPkfFgsOzd255IHN0b3MgbmFnxYLDs3drb3d5IHNrYWx1amUgc2nEmSBwxYJ5bm5pZSB6YSBwb21vY8SFIENTUyBjbGFtcCgpLjwvbGk+XG4gICAgICAgICAgICAgICAgPGxpPkJyYWsgaG9yeXpvbnRhbG5lZ28gcGFza2EgcHJ6ZXdpamFuaWEgKG92ZXJmbG93LXg6IGhpZGRlbikuPC9saT5cbiAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUEyS2MsU0FvSU0sVUFwSU47QUEzS2QsU0FBZ0IsVUFBVSxpQkFBaUI7QUFFM0M7QUFBQSxFQUNFO0FB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