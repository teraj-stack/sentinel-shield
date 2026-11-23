import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "/apps/cml_clinic/node_modules/.vite/deps/recharts.js?v=d3868ad9";
import { TrendingUp, Award, Clock, ShieldCheck, Activity, BarChart2, PieChart as PieIcon } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
const procedureComparisonData = [
  {
    method: "Laser LHP® (CML)",
    effectiveness: 98.2,
    recurrence: 1.8,
    avgRecoveryDays: 2.5,
    painScore: 1.5
  },
  {
    method: "FiLaC® / SiLaC®",
    effectiveness: 96.5,
    recurrence: 3.2,
    avgRecoveryDays: 3,
    painScore: 2
  },
  {
    method: "Tradycyjna Chirurgia",
    effectiveness: 82,
    recurrence: 14.5,
    avgRecoveryDays: 21,
    painScore: 8.5
  },
  {
    method: "Metoda Barrona (Gumki)",
    effectiveness: 74,
    recurrence: 22,
    avgRecoveryDays: 7,
    painScore: 5.2
  }
];
const recoveryTimelineData = [
  { day: "Dzień 1", laserPain: 3.2, tradPain: 9, laserMobility: 85, tradMobility: 20 },
  { day: "Dzień 2", laserPain: 2.1, tradPain: 8.5, laserMobility: 90, tradMobility: 30 },
  { day: "Dzień 3", laserPain: 1.2, tradPain: 7.8, laserMobility: 95, tradMobility: 40 },
  { day: "Dzień 5", laserPain: 0.5, tradPain: 6, laserMobility: 98, tradMobility: 55 },
  { day: "Dzień 7", laserPain: 0.1, tradPain: 4.2, laserMobility: 100, tradMobility: 70 },
  { day: "Dzień 14", laserPain: 0, tradPain: 2, laserMobility: 100, tradMobility: 85 }
];
const procedureDistributionData = [
  { name: "Hemoroidy (LHP®)", value: 58, color: "#9333ea" },
  { name: "Przetoka (FiLaC®)", value: 22, color: "#0891b2" },
  { name: "Torbiel (SiLaC®)", value: 12, color: "#059669" },
  { name: "Szczelina & Inne", value: 8, color: "#d97706" }
];
const monthlySatisfactionData = [
  { month: "Sty", satisfaction: 98.8, patientCount: 84 },
  { month: "Lut", satisfaction: 99.1, patientCount: 92 },
  { month: "Mar", satisfaction: 98.5, patientCount: 110 },
  { month: "Kwi", satisfaction: 99.4, patientCount: 105 },
  { month: "Maj", satisfaction: 99.6, patientCount: 128 },
  { month: "Cze", satisfaction: 99.8, patientCount: 142 }
];
export const ClinicDashboardCharts = () => {
  const [activeTab, setActiveTab] = useState("effectiveness");
  return /* @__PURE__ */ jsxDEV("div", { className: "mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden text-slate-900", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-80 h-80 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
      lineNumber: 88,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-2", children: [
          /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 94,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Kliniczny Pulpit Analityczny CML" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-xl sm:text-2xl font-bold text-slate-900", children: "Wizualizacja Skuteczności Zabiegów & Rekonwalescencji" }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 97,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-600 font-normal mt-1", children: "Dane statystyczne na podstawie historii ponad 1,500 zabiegów laserowych w klinice dr. Jana Bujoka." }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 100,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shrink-0", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("effectiveness"),
            className: `px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === "effectiveness" ? "bg-purple-600 text-white shadow-md shadow-purple-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"}`,
            children: [
              /* @__PURE__ */ jsxDEV(BarChart2, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
                lineNumber: 115,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Skuteczność %" }, void 0, false, {
                fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
                lineNumber: 116,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 107,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("recovery"),
            className: `px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === "recovery" ? "bg-purple-600 text-white shadow-md shadow-purple-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Clock, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
                lineNumber: 127,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Dynamika Bólu" }, void 0, false, {
                fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
                lineNumber: 128,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 119,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("satisfaction"),
            className: `px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${activeTab === "satisfaction" ? "bg-purple-600 text-white shadow-md shadow-purple-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"}`,
            children: [
              /* @__PURE__ */ jsxDEV(PieIcon, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
                lineNumber: 139,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Zadowolenie & Struktura" }, void 0, false, {
                fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
                lineNumber: 140,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 131,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    activeTab === "effectiveness" && /* @__PURE__ */ jsxDEV(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-2 bg-slate-50 p-5 rounded-2xl border border-slate-200", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Award, { className: "w-4 h-4 text-purple-600" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 151,
            columnNumber: 17
          }, this),
          "Porównanie Skuteczności Zabiegów (% Sukcesu Bez Nawrotów)"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 150,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "h-64 sm:h-72 w-full", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(BarChart, { data: procedureComparisonData, margin: { top: 10, right: 10, left: -10, bottom: 0 }, children: [
          /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 157,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(XAxis, { dataKey: "method", stroke: "#64748b", fontSize: 11, tickLine: false }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 158,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(YAxis, { stroke: "#64748b", fontSize: 11, domain: [0, 100] }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 159,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            Tooltip,
            {
              contentStyle: {
                backgroundColor: "#ffffff",
                borderColor: "#cbd5e1",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#0f172a",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
              },
              formatter: (val) => [`${val}%`, "Skuteczność"]
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
              lineNumber: 160,
              columnNumber: 21
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(Legend, { wrapperStyle: { fontSize: "11px", paddingTop: "10px", color: "#334155" } }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 171,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(Bar, { dataKey: "effectiveness", name: "Skuteczność wyleczenia (%)", fill: "#9333ea", radius: [8, 8, 0, 0] }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 172,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(Bar, { dataKey: "recurrence", name: "Ryzyko nawrotu (%)", fill: "#ef4444", radius: [8, 8, 0, 0] }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 173,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 156,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 155,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 154,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 149,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-4 justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-purple-50 border border-purple-200", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold uppercase text-purple-700 block mb-1", children: "Laser LHP® Skuteczność" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 182,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-3xl font-bold text-slate-900 font-serif", children: "98.2%" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 183,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-600 mt-1", children: "Najwyższy wskaźnik oszczędzenia zwieraczy bez szwów chirurgicznych." }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 184,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 181,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-teal-50 border border-teal-200", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold uppercase text-teal-800 block mb-1", children: "Średni Czas Powrotu Do Pracy" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 188,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-3xl font-bold text-teal-900 font-serif", children: "2.5 Dnia" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 189,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-600 mt-1", children: "W porównaniu do 21 dni po tradycyjnej operacji chirurgicznej." }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 190,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 187,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-amber-50 border border-amber-200", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-bold uppercase text-amber-800 block mb-1", children: "Ból Pooperacyjny (Skala 0-10)" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 194,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-3xl font-bold text-amber-900 font-serif", children: "1.5 / 10" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 195,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-600 mt-1", children: "Tradycyjna operacja wynosi średnio 8.5/10. Pacjenci CML nie wymagają silnych leków." }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 196,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 193,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 180,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
      lineNumber: 148,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
      lineNumber: 147,
      columnNumber: 9
    }, this),
    activeTab === "recovery" && /* @__PURE__ */ jsxDEV(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "space-y-6", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50 p-5 rounded-2xl border border-slate-200", children: [
      /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(Clock, { className: "w-4 h-4 text-cyan-600" }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 208,
          columnNumber: 15
        }, this),
        "Spadek Poziomu Bólu i Wzrost Sprawności w Dniach po Zabiegu"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 207,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "h-64 sm:h-72 w-full", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(AreaChart, { data: recoveryTimelineData, margin: { top: 10, right: 10, left: -10, bottom: 0 }, children: [
        /* @__PURE__ */ jsxDEV("defs", { children: [
          /* @__PURE__ */ jsxDEV("linearGradient", { id: "laserGlow", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxDEV("stop", { offset: "5%", stopColor: "#0891b2", stopOpacity: 0.6 }, void 0, false, {
              fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
              lineNumber: 216,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("stop", { offset: "95%", stopColor: "#0891b2", stopOpacity: 0.05 }, void 0, false, {
              fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
              lineNumber: 217,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 215,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("linearGradient", { id: "tradGlow", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxDEV("stop", { offset: "5%", stopColor: "#f43f5e", stopOpacity: 0.5 }, void 0, false, {
              fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
              lineNumber: 220,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("stop", { offset: "95%", stopColor: "#f43f5e", stopOpacity: 0.05 }, void 0, false, {
              fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
              lineNumber: 221,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 219,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 214,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 224,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(XAxis, { dataKey: "day", stroke: "#64748b", fontSize: 11 }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 225,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(YAxis, { stroke: "#64748b", fontSize: 11, domain: [0, 10] }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 226,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(
          Tooltip,
          {
            contentStyle: {
              backgroundColor: "#ffffff",
              borderColor: "#cbd5e1",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#0f172a",
              boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 227,
            columnNumber: 19
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(Legend, { wrapperStyle: { fontSize: "11px", paddingTop: "10px", color: "#334155" } }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 237,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(Area, { type: "monotone", dataKey: "laserPain", name: "Ból Laser CML (Skala 0-10)", stroke: "#0891b2", fillOpacity: 1, fill: "url(#laserGlow)", strokeWidth: 2.5 }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 238,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV(Area, { type: "monotone", dataKey: "tradPain", name: "Ból Chirurgia Tradycyjna (0-10)", stroke: "#f43f5e", fillOpacity: 1, fill: "url(#tradGlow)", strokeWidth: 2.5 }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 239,
          columnNumber: 19
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 213,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 212,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 211,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-600 mt-3 text-center font-medium", children: "Już w 3. dobie po zabiegu laserowym LHP®/FiLaC® pacjenci oceniają dyskomfort poniżej 1.5 w skali 10-punktowej." }, void 0, false, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 243,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
      lineNumber: 206,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
      lineNumber: 205,
      columnNumber: 9
    }, this),
    activeTab === "satisfaction" && /* @__PURE__ */ jsxDEV(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50 p-5 rounded-2xl border border-slate-200", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(PieIcon, { className: "w-4 h-4 text-emerald-600" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 255,
            columnNumber: 15
          }, this),
          "Struktura Przeprowadzanych Zabiegów (%)"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 254,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "h-56 sm:h-64 w-full flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(PieChart, { children: [
          /* @__PURE__ */ jsxDEV(
            Pie,
            {
              data: procedureDistributionData,
              cx: "50%",
              cy: "50%",
              innerRadius: 55,
              outerRadius: 85,
              paddingAngle: 4,
              dataKey: "value",
              label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
              children: procedureDistributionData.map((entry, index) => /* @__PURE__ */ jsxDEV(Cell, { fill: entry.color }, `cell-${index}`, false, {
                fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
                lineNumber: 272,
                columnNumber: 23
              }, this))
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
              lineNumber: 261,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            Tooltip,
            {
              contentStyle: {
                backgroundColor: "#ffffff",
                borderColor: "#cbd5e1",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#0f172a",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
              }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
              lineNumber: 275,
              columnNumber: 19
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 260,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 259,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 258,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 253,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-50 p-5 rounded-2xl border border-slate-200", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-4 h-4 text-purple-600" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 292,
            columnNumber: 15
          }, this),
          "Wskaźnik Satysfakcji Pacjentów (Ostatnie 6 Miesięcy)"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 291,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "h-56 sm:h-64 w-full", children: /* @__PURE__ */ jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxDEV(LineChart, { data: monthlySatisfactionData, margin: { top: 10, right: 10, left: -20, bottom: 0 }, children: [
          /* @__PURE__ */ jsxDEV(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0" }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 298,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV(XAxis, { dataKey: "month", stroke: "#64748b", fontSize: 11 }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 299,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV(YAxis, { stroke: "#64748b", fontSize: 11, domain: [95, 100] }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 300,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV(
            Tooltip,
            {
              contentStyle: {
                backgroundColor: "#ffffff",
                borderColor: "#cbd5e1",
                borderRadius: "12px",
                fontSize: "12px",
                color: "#0f172a",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
              }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
              lineNumber: 301,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(Line, { type: "monotone", dataKey: "satisfaction", name: "Satysfakcja (%)", stroke: "#9333ea", strokeWidth: 3, dot: { r: 5, fill: "#a855f7" } }, void 0, false, {
            fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
            lineNumber: 311,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 297,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 296,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 295,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 290,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
      lineNumber: 252,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-slate-700 font-medium", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-purple-600" }, void 0, false, {
          fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
          lineNumber: 322,
          columnNumber: 11
        }, this),
        "Wyniki certyfikowane według standardu procedur laserowych dr. Jana Bujoka"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 321,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 font-mono text-[11px]", children: "Gwarancja bezpiecznej metody bez szwów" }, void 0, false, {
        fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
        lineNumber: 325,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
      lineNumber: 320,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ClinicDashboardCharts.tsx",
    lineNumber: 86,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNsaW5pY0Rhc2hib2FyZENoYXJ0cy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgQmFyQ2hhcnQsXG4gIEJhcixcbiAgTGluZUNoYXJ0LFxuICBMaW5lLFxuICBQaWVDaGFydCxcbiAgUGllLFxuICBDZWxsLFxuICBYQXhpcyxcbiAgWUF4aXMsXG4gIENhcnRlc2lhbkdyaWQsXG4gIFRvb2x0aXAsXG4gIExlZ2VuZCxcbiAgUmVzcG9uc2l2ZUNvbnRhaW5lcixcbiAgQXJlYUNoYXJ0LFxuICBBcmVhLFxufSBmcm9tICdyZWNoYXJ0cyc7XG5pbXBvcnQgeyBUcmVuZGluZ1VwLCBBd2FyZCwgQ2xvY2ssIFNoaWVsZENoZWNrLCBBY3Rpdml0eSwgQmFyQ2hhcnQyLCBQaWVDaGFydCBhcyBQaWVJY29uIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbi8vIERhdGEgZm9yIEVmZmVjdGl2ZW5lc3MgJiBSZWNvdmVyeSBDb21wYXJpc29uXG5jb25zdCBwcm9jZWR1cmVDb21wYXJpc29uRGF0YSA9IFtcbiAge1xuICAgIG1ldGhvZDogJ0xhc2VyIExIUMKuIChDTUwpJyxcbiAgICBlZmZlY3RpdmVuZXNzOiA5OC4yLFxuICAgIHJlY3VycmVuY2U6IDEuOCxcbiAgICBhdmdSZWNvdmVyeURheXM6IDIuNSxcbiAgICBwYWluU2NvcmU6IDEuNSxcbiAgfSxcbiAge1xuICAgIG1ldGhvZDogJ0ZpTGFDwq4gLyBTaUxhQ8KuJyxcbiAgICBlZmZlY3RpdmVuZXNzOiA5Ni41LFxuICAgIHJlY3VycmVuY2U6IDMuMixcbiAgICBhdmdSZWNvdmVyeURheXM6IDMuMCxcbiAgICBwYWluU2NvcmU6IDIuMCxcbiAgfSxcbiAge1xuICAgIG1ldGhvZDogJ1RyYWR5Y3lqbmEgQ2hpcnVyZ2lhJyxcbiAgICBlZmZlY3RpdmVuZXNzOiA4Mi4wLFxuICAgIHJlY3VycmVuY2U6IDE0LjUsXG4gICAgYXZnUmVjb3ZlcnlEYXlzOiAyMS4wLFxuICAgIHBhaW5TY29yZTogOC41LFxuICB9LFxuICB7XG4gICAgbWV0aG9kOiAnTWV0b2RhIEJhcnJvbmEgKEd1bWtpKScsXG4gICAgZWZmZWN0aXZlbmVzczogNzQuMCxcbiAgICByZWN1cnJlbmNlOiAyMi4wLFxuICAgIGF2Z1JlY292ZXJ5RGF5czogNy4wLFxuICAgIHBhaW5TY29yZTogNS4yLFxuICB9LFxuXTtcblxuLy8gUGFpbiAmIFJlY292ZXJ5IFByb2dyZXNzIG92ZXIgMTQgZGF5c1xuY29uc3QgcmVjb3ZlcnlUaW1lbGluZURhdGEgPSBbXG4gIHsgZGF5OiAnRHppZcWEIDEnLCBsYXNlclBhaW46IDMuMiwgdHJhZFBhaW46IDkuMCwgbGFzZXJNb2JpbGl0eTogODUsIHRyYWRNb2JpbGl0eTogMjAgfSxcbiAgeyBkYXk6ICdEemllxYQgMicsIGxhc2VyUGFpbjogMi4xLCB0cmFkUGFpbjogOC41LCBsYXNlck1vYmlsaXR5OiA5MCwgdHJhZE1vYmlsaXR5OiAzMCB9LFxuICB7IGRheTogJ0R6aWXFhCAzJywgbGFzZXJQYWluOiAxLjIsIHRyYWRQYWluOiA3LjgsIGxhc2VyTW9iaWxpdHk6IDk1LCB0cmFkTW9iaWxpdHk6IDQwIH0sXG4gIHsgZGF5OiAnRHppZcWEIDUnLCBsYXNlclBhaW46IDAuNSwgdHJhZFBhaW46IDYuMCwgbGFzZXJNb2JpbGl0eTogOTgsIHRyYWRNb2JpbGl0eTogNTUgfSxcbiAgeyBkYXk6ICdEemllxYQgNycsIGxhc2VyUGFpbjogMC4xLCB0cmFkUGFpbjogNC4yLCBsYXNlck1vYmlsaXR5OiAxMDAsIHRyYWRNb2JpbGl0eTogNzAgfSxcbiAgeyBkYXk6ICdEemllxYQgMTQnLCBsYXNlclBhaW46IDAuMCwgdHJhZFBhaW46IDIuMCwgbGFzZXJNb2JpbGl0eTogMTAwLCB0cmFkTW9iaWxpdHk6IDg1IH0sXG5dO1xuXG4vLyBTYXRpc2ZhY3Rpb24gJiBQcm9jZWR1cmUgRGlzdHJpYnV0aW9uXG5jb25zdCBwcm9jZWR1cmVEaXN0cmlidXRpb25EYXRhID0gW1xuICB7IG5hbWU6ICdIZW1vcm9pZHkgKExIUMKuKScsIHZhbHVlOiA1OCwgY29sb3I6ICcjOTMzM2VhJyB9LFxuICB7IG5hbWU6ICdQcnpldG9rYSAoRmlMYUPCriknLCB2YWx1ZTogMjIsIGNvbG9yOiAnIzA4OTFiMicgfSxcbiAgeyBuYW1lOiAnVG9yYmllbCAoU2lMYUPCriknLCB2YWx1ZTogMTIsIGNvbG9yOiAnIzA1OTY2OScgfSxcbiAgeyBuYW1lOiAnU3pjemVsaW5hICYgSW5uZScsIHZhbHVlOiA4LCBjb2xvcjogJyNkOTc3MDYnIH0sXG5dO1xuXG4vLyBIaXN0b3JpY2FsIFBhdGllbnQgU2F0aXNmYWN0aW9uIFJhdGluZyBvdmVyIDYgTW9udGhzXG5jb25zdCBtb250aGx5U2F0aXNmYWN0aW9uRGF0YSA9IFtcbiAgeyBtb250aDogJ1N0eScsIHNhdGlzZmFjdGlvbjogOTguOCwgcGF0aWVudENvdW50OiA4NCB9LFxuICB7IG1vbnRoOiAnTHV0Jywgc2F0aXNmYWN0aW9uOiA5OS4xLCBwYXRpZW50Q291bnQ6IDkyIH0sXG4gIHsgbW9udGg6ICdNYXInLCBzYXRpc2ZhY3Rpb246IDk4LjUsIHBhdGllbnRDb3VudDogMTEwIH0sXG4gIHsgbW9udGg6ICdLd2knLCBzYXRpc2ZhY3Rpb246IDk5LjQsIHBhdGllbnRDb3VudDogMTA1IH0sXG4gIHsgbW9udGg6ICdNYWonLCBzYXRpc2ZhY3Rpb246IDk5LjYsIHBhdGllbnRDb3VudDogMTI4IH0sXG4gIHsgbW9udGg6ICdDemUnLCBzYXRpc2ZhY3Rpb246IDk5LjgsIHBhdGllbnRDb3VudDogMTQyIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgQ2xpbmljRGFzaGJvYXJkQ2hhcnRzOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdlZmZlY3RpdmVuZXNzJyB8ICdyZWNvdmVyeScgfCAnc2F0aXNmYWN0aW9uJz4oJ2VmZmVjdGl2ZW5lc3MnKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMTIgcC02IHNtOnAtOCByb3VuZGVkLTN4bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3cteGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICB7LyogU3VidGxlIEJhY2tncm91bmQgQWNjZW50ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHctODAgaC04MCBiZy1wdXJwbGUtMTAwLzYwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IG1iLTggYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBwYi02XCI+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMy41IHB5LTEuNSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTUwIGJvcmRlciBib3JkZXItcHVycGxlLTIwMCB0ZXh0LXB1cnBsZS04MDAgdGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0yXCI+XG4gICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPktsaW5pY3pueSBQdWxwaXQgQW5hbGl0eWN6bnkgQ01MPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQteGwgc206dGV4dC0yeGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICBXaXp1YWxpemFjamEgU2t1dGVjem5vxZtjaSBaYWJpZWfDs3cgJiBSZWtvbndhbGVzY2VuY2ppXG4gICAgICAgICAgPC9oMz5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS02MDAgZm9udC1ub3JtYWwgbXQtMVwiPlxuICAgICAgICAgICAgRGFuZSBzdGF0eXN0eWN6bmUgbmEgcG9kc3Rhd2llIGhpc3RvcmlpIHBvbmFkIDEsNTAwIHphYmllZ8OzdyBsYXNlcm93eWNoIHcga2xpbmljZSBkci4gSmFuYSBCdWpva2EuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGFiIFNlbGVjdG9yICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYmctc2xhdGUtMTAwIHAtMS41IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNocmluay0wXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdlZmZlY3RpdmVuZXNzJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zLjUgcHktMiByb3VuZGVkLXhsIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41ICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2VmZmVjdGl2ZW5lc3MnXG4gICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTYwMC8yMCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTYwMCBob3Zlcjp0ZXh0LXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS0yMDAvNjAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8QmFyQ2hhcnQyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlNrdXRlY3pub8WbxIcgJTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigncmVjb3ZlcnknKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAncmVjb3ZlcnknXG4gICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTYwMC8yMCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTYwMCBob3Zlcjp0ZXh0LXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS0yMDAvNjAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q2xvY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+RHluYW1pa2EgQsOzbHU8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3NhdGlzZmFjdGlvbicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMy41IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdzYXRpc2ZhY3Rpb24nXG4gICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTYwMC8yMCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTYwMCBob3Zlcjp0ZXh0LXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS0yMDAvNjAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UGllSWNvbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5aYWRvd29sZW5pZSAmIFN0cnVrdHVyYTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFRhYiAxOiBFZmZlY3RpdmVuZXNzIHZzIFRyYWRpdGlvbmFsIFN1cmdlcnkgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnZWZmZWN0aXZlbmVzcycgJiYgKFxuICAgICAgICA8bW90aW9uLmRpdiBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDEwIH19IGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fSBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTMgZ2FwLTZcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMiBiZy1zbGF0ZS01MCBwLTUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtODAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi00IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPEF3YXJkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgICBQb3LDs3duYW5pZSBTa3V0ZWN6bm/Fm2NpIFphYmllZ8OzdyAoJSBTdWtjZXN1IEJleiBOYXdyb3TDs3cpXG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC02NCBzbTpoLTcyIHctZnVsbFwiPlxuICAgICAgICAgICAgICAgIDxSZXNwb25zaXZlQ29udGFpbmVyIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICAgICAgICAgICAgICAgIDxCYXJDaGFydCBkYXRhPXtwcm9jZWR1cmVDb21wYXJpc29uRGF0YX0gbWFyZ2luPXt7IHRvcDogMTAsIHJpZ2h0OiAxMCwgbGVmdDogLTEwLCBib3R0b206IDAgfX0+XG4gICAgICAgICAgICAgICAgICAgIDxDYXJ0ZXNpYW5HcmlkIHN0cm9rZURhc2hhcnJheT1cIjMgM1wiIHN0cm9rZT1cIiNlMmU4ZjBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8WEF4aXMgZGF0YUtleT1cIm1ldGhvZFwiIHN0cm9rZT1cIiM2NDc0OGJcIiBmb250U2l6ZT17MTF9IHRpY2tMaW5lPXtmYWxzZX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPFlBeGlzIHN0cm9rZT1cIiM2NDc0OGJcIiBmb250U2l6ZT17MTF9IGRvbWFpbj17WzAsIDEwMF19IC8+XG4gICAgICAgICAgICAgICAgICAgIDxUb29sdGlwXG4gICAgICAgICAgICAgICAgICAgICAgY29udGVudFN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2NiZDVlMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwZjE3MmEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCAxMHB4IDI1cHggLTVweCByZ2JhKDAsMCwwLDAuMSknLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgZm9ybWF0dGVyPXsodmFsOiBhbnkpID0+IFtgJHt2YWx9JWAsICdTa3V0ZWN6bm/Fm8SHJ119XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxMZWdlbmQgd3JhcHBlclN0eWxlPXt7IGZvbnRTaXplOiAnMTFweCcsIHBhZGRpbmdUb3A6ICcxMHB4JywgY29sb3I6ICcjMzM0MTU1JyB9fSAvPlxuICAgICAgICAgICAgICAgICAgICA8QmFyIGRhdGFLZXk9XCJlZmZlY3RpdmVuZXNzXCIgbmFtZT1cIlNrdXRlY3pub8WbxIcgd3lsZWN6ZW5pYSAoJSlcIiBmaWxsPVwiIzkzMzNlYVwiIHJhZGl1cz17WzgsIDgsIDAsIDBdfSAvPlxuICAgICAgICAgICAgICAgICAgICA8QmFyIGRhdGFLZXk9XCJyZWN1cnJlbmNlXCIgbmFtZT1cIlJ5enlrbyBuYXdyb3R1ICglKVwiIGZpbGw9XCIjZWY0NDQ0XCIgcmFkaXVzPXtbOCwgOCwgMCwgMF19IC8+XG4gICAgICAgICAgICAgICAgICA8L0JhckNoYXJ0PlxuICAgICAgICAgICAgICAgIDwvUmVzcG9uc2l2ZUNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFF1aWNrIE1ldHJpY3MgQ2FyZHMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTQganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXB1cnBsZS01MCBib3JkZXIgYm9yZGVyLXB1cnBsZS0yMDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtcHVycGxlLTcwMCBibG9jayBtYi0xXCI+TGFzZXIgTEhQwq4gU2t1dGVjem5vxZvEhzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgZm9udC1zZXJpZlwiPjk4LjIlPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwIG10LTFcIj5OYWp3ecW8c3p5IHdza2HFum5payBvc3pjesSZZHplbmlhIHp3aWVyYWN6eSBiZXogc3p3w7N3IGNoaXJ1cmdpY3pueWNoLjwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctdGVhbC01MCBib3JkZXIgYm9yZGVyLXRlYWwtMjAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1ib2xkIHVwcGVyY2FzZSB0ZXh0LXRlYWwtODAwIGJsb2NrIG1iLTFcIj7FmnJlZG5pIEN6YXMgUG93cm90dSBEbyBQcmFjeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC10ZWFsLTkwMCBmb250LXNlcmlmXCI+Mi41IERuaWE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDAgbXQtMVwiPlcgcG9yw7N3bmFuaXUgZG8gMjEgZG5pIHBvIHRyYWR5Y3lqbmVqIG9wZXJhY2ppIGNoaXJ1cmdpY3puZWouPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1hbWJlci01MCBib3JkZXIgYm9yZGVyLWFtYmVyLTIwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdGV4dC1hbWJlci04MDAgYmxvY2sgbWItMVwiPkLDs2wgUG9vcGVyYWN5am55IChTa2FsYSAwLTEwKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBmb250LWJvbGQgdGV4dC1hbWJlci05MDAgZm9udC1zZXJpZlwiPjEuNSAvIDEwPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNjAwIG10LTFcIj5UcmFkeWN5am5hIG9wZXJhY2phIHd5bm9zaSDFm3JlZG5pbyA4LjUvMTAuIFBhY2plbmNpIENNTCBuaWUgd3ltYWdhasSFIHNpbG55Y2ggbGVrw7N3LjwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFRhYiAyOiBSZWNvdmVyeSBUaW1lbGluZSAmIFBhaW4gU2NvcmUgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAncmVjb3ZlcnknICYmIChcbiAgICAgICAgPG1vdGlvbi5kaXYgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX0gY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS01MCBwLTUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTgwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItNCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8Q2xvY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNjAwXCIgLz5cbiAgICAgICAgICAgICAgU3BhZGVrIFBvemlvbXUgQsOzbHUgaSBXenJvc3QgU3ByYXdub8WbY2kgdyBEbmlhY2ggcG8gWmFiaWVndVxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC02NCBzbTpoLTcyIHctZnVsbFwiPlxuICAgICAgICAgICAgICA8UmVzcG9uc2l2ZUNvbnRhaW5lciB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPEFyZWFDaGFydCBkYXRhPXtyZWNvdmVyeVRpbWVsaW5lRGF0YX0gbWFyZ2luPXt7IHRvcDogMTAsIHJpZ2h0OiAxMCwgbGVmdDogLTEwLCBib3R0b206IDAgfX0+XG4gICAgICAgICAgICAgICAgICA8ZGVmcz5cbiAgICAgICAgICAgICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwibGFzZXJHbG93XCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNSVcIiBzdG9wQ29sb3I9XCIjMDg5MWIyXCIgc3RvcE9wYWNpdHk9ezAuNn0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI5NSVcIiBzdG9wQ29sb3I9XCIjMDg5MWIyXCIgc3RvcE9wYWNpdHk9ezAuMDV9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cInRyYWRHbG93XCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIwXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiNSVcIiBzdG9wQ29sb3I9XCIjZjQzZjVlXCIgc3RvcE9wYWNpdHk9ezAuNX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI5NSVcIiBzdG9wQ29sb3I9XCIjZjQzZjVlXCIgc3RvcE9wYWNpdHk9ezAuMDV9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvbGluZWFyR3JhZGllbnQ+XG4gICAgICAgICAgICAgICAgICA8L2RlZnM+XG4gICAgICAgICAgICAgICAgICA8Q2FydGVzaWFuR3JpZCBzdHJva2VEYXNoYXJyYXk9XCIzIDNcIiBzdHJva2U9XCIjZTJlOGYwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxYQXhpcyBkYXRhS2V5PVwiZGF5XCIgc3Ryb2tlPVwiIzY0NzQ4YlwiIGZvbnRTaXplPXsxMX0gLz5cbiAgICAgICAgICAgICAgICAgIDxZQXhpcyBzdHJva2U9XCIjNjQ3NDhiXCIgZm9udFNpemU9ezExfSBkb21haW49e1swLCAxMF19IC8+XG4gICAgICAgICAgICAgICAgICA8VG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50U3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyNjYmQ1ZTEnLFxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMGYxNzJhJyxcbiAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDEwcHggMjVweCAtNXB4IHJnYmEoMCwwLDAsMC4xKScsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPExlZ2VuZCB3cmFwcGVyU3R5bGU9e3sgZm9udFNpemU6ICcxMXB4JywgcGFkZGluZ1RvcDogJzEwcHgnLCBjb2xvcjogJyMzMzQxNTUnIH19IC8+XG4gICAgICAgICAgICAgICAgICA8QXJlYSB0eXBlPVwibW9ub3RvbmVcIiBkYXRhS2V5PVwibGFzZXJQYWluXCIgbmFtZT1cIkLDs2wgTGFzZXIgQ01MIChTa2FsYSAwLTEwKVwiIHN0cm9rZT1cIiMwODkxYjJcIiBmaWxsT3BhY2l0eT17MX0gZmlsbD1cInVybCgjbGFzZXJHbG93KVwiIHN0cm9rZVdpZHRoPXsyLjV9IC8+XG4gICAgICAgICAgICAgICAgICA8QXJlYSB0eXBlPVwibW9ub3RvbmVcIiBkYXRhS2V5PVwidHJhZFBhaW5cIiBuYW1lPVwiQsOzbCBDaGlydXJnaWEgVHJhZHljeWpuYSAoMC0xMClcIiBzdHJva2U9XCIjZjQzZjVlXCIgZmlsbE9wYWNpdHk9ezF9IGZpbGw9XCJ1cmwoI3RyYWRHbG93KVwiIHN0cm9rZVdpZHRoPXsyLjV9IC8+XG4gICAgICAgICAgICAgICAgPC9BcmVhQ2hhcnQ+XG4gICAgICAgICAgICAgIDwvUmVzcG9uc2l2ZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS02MDAgbXQtMyB0ZXh0LWNlbnRlciBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICBKdcW8IHcgMy4gZG9iaWUgcG8gemFiaWVndSBsYXNlcm93eW0gTEhQwq4vRmlMYUPCriBwYWNqZW5jaSBvY2VuaWFqxIUgZHlza29tZm9ydCBwb25pxbxlaiAxLjUgdyBza2FsaSAxMC1wdW5rdG93ZWouXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUYWIgMzogU2F0aXNmYWN0aW9uICYgU3RydWN0dXJlIERpc3RyaWJ1dGlvbiAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdzYXRpc2ZhY3Rpb24nICYmIChcbiAgICAgICAgPG1vdGlvbi5kaXYgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAxMCB9fSBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAgfX0gY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtNTAgcC01IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS04MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFBpZUljb24gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNjAwXCIgLz5cbiAgICAgICAgICAgICAgU3RydWt0dXJhIFByemVwcm93YWR6YW55Y2ggWmFiaWVnw7N3ICglKVxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC01NiBzbTpoLTY0IHctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICA8UmVzcG9uc2l2ZUNvbnRhaW5lciB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCI+XG4gICAgICAgICAgICAgICAgPFBpZUNoYXJ0PlxuICAgICAgICAgICAgICAgICAgPFBpZVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXtwcm9jZWR1cmVEaXN0cmlidXRpb25EYXRhfVxuICAgICAgICAgICAgICAgICAgICBjeD1cIjUwJVwiXG4gICAgICAgICAgICAgICAgICAgIGN5PVwiNTAlXCJcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJSYWRpdXM9ezU1fVxuICAgICAgICAgICAgICAgICAgICBvdXRlclJhZGl1cz17ODV9XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdBbmdsZT17NH1cbiAgICAgICAgICAgICAgICAgICAgZGF0YUtleT1cInZhbHVlXCJcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw9eyh7IG5hbWUsIHBlcmNlbnQgfSkgPT4gYCR7bmFtZX0gJHsocGVyY2VudCAqIDEwMCkudG9GaXhlZCgwKX0lYH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3Byb2NlZHVyZURpc3RyaWJ1dGlvbkRhdGEubWFwKChlbnRyeSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8Q2VsbCBrZXk9e2BjZWxsLSR7aW5kZXh9YH0gZmlsbD17ZW50cnkuY29sb3J9IC8+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9QaWU+XG4gICAgICAgICAgICAgICAgICA8VG9vbHRpcFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50U3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogJyNjYmQ1ZTEnLFxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzEycHgnLFxuICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMGYxNzJhJyxcbiAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6ICcwIDEwcHggMjVweCAtNXB4IHJnYmEoMCwwLDAsMC4xKScsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvUGllQ2hhcnQ+XG4gICAgICAgICAgICAgIDwvUmVzcG9uc2l2ZUNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS01MCBwLTUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTgwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItNCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8VHJlbmRpbmdVcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTYwMFwiIC8+XG4gICAgICAgICAgICAgIFdza2HFum5payBTYXR5c2Zha2NqaSBQYWNqZW50w7N3IChPc3RhdG5pZSA2IE1pZXNpxJljeSlcbiAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtNTYgc206aC02NCB3LWZ1bGxcIj5cbiAgICAgICAgICAgICAgPFJlc3BvbnNpdmVDb250YWluZXIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPlxuICAgICAgICAgICAgICAgIDxMaW5lQ2hhcnQgZGF0YT17bW9udGhseVNhdGlzZmFjdGlvbkRhdGF9IG1hcmdpbj17eyB0b3A6IDEwLCByaWdodDogMTAsIGxlZnQ6IC0yMCwgYm90dG9tOiAwIH19PlxuICAgICAgICAgICAgICAgICAgPENhcnRlc2lhbkdyaWQgc3Ryb2tlRGFzaGFycmF5PVwiMyAzXCIgc3Ryb2tlPVwiI2UyZThmMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8WEF4aXMgZGF0YUtleT1cIm1vbnRoXCIgc3Ryb2tlPVwiIzY0NzQ4YlwiIGZvbnRTaXplPXsxMX0gLz5cbiAgICAgICAgICAgICAgICAgIDxZQXhpcyBzdHJva2U9XCIjNjQ3NDhiXCIgZm9udFNpemU9ezExfSBkb21haW49e1s5NSwgMTAwXX0gLz5cbiAgICAgICAgICAgICAgICAgIDxUb29sdGlwXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRTdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiAnI2NiZDVlMScsXG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTJweCcsXG4gICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwZjE3MmEnLFxuICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogJzAgMTBweCAyNXB4IC01cHggcmdiYSgwLDAsMCwwLjEpJyxcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8TGluZSB0eXBlPVwibW9ub3RvbmVcIiBkYXRhS2V5PVwic2F0aXNmYWN0aW9uXCIgbmFtZT1cIlNhdHlzZmFrY2phICglKVwiIHN0cm9rZT1cIiM5MzMzZWFcIiBzdHJva2VXaWR0aD17M30gZG90PXt7IHI6IDUsIGZpbGw6ICcjYTg1NWY3JyB9fSAvPlxuICAgICAgICAgICAgICAgIDwvTGluZUNoYXJ0PlxuICAgICAgICAgICAgICA8L1Jlc3BvbnNpdmVDb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIEZvb3RlciBJbmZvIEJhbm5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNiBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS0yMDAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS02MDAgZ2FwLTJcIj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXNsYXRlLTcwMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTYwMFwiIC8+XG4gICAgICAgICAgV3luaWtpIGNlcnR5Zmlrb3dhbmUgd2VkxYJ1ZyBzdGFuZGFyZHUgcHJvY2VkdXIgbGFzZXJvd3ljaCBkci4gSmFuYSBCdWpva2FcbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBmb250LW1vbm8gdGV4dC1bMTFweF1cIj5Hd2FyYW5jamEgYmV6cGllY3puZWogbWV0b2R5IGJleiBzenfDs3c8L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQXVGTTtBQXZGTixTQUFnQixnQkFBZ0I7QUFDaEM7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBQ1AsU0FBUyxZQUFZLE9BQU8sT0FBTyxhQUFhLFVBQVUsV0FBVyxZQUFZLGVBQWU7QUFDaEcsU0FBUyxjQUFjO0FBR3ZCLE1BQU0sMEJBQTBCO0FBQUEsRUFDOUI7QUFBQSxJQUNFLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxJQUNmLFlBQVk7QUFBQSxJQUNaLGlCQUFpQjtBQUFBLElBQ2pCLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQTtBQUFBLElBQ0UsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLElBQ2YsWUFBWTtBQUFBLElBQ1osaUJBQWlCO0FBQUEsSUFDakIsV0FBVztBQUFBLEVBQ2I7QUFBQSxFQUNBO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsSUFDZixZQUFZO0FBQUEsSUFDWixpQkFBaUI7QUFBQSxJQUNqQixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0E7QUFBQSxJQUNFLFFBQVE7QUFBQSxJQUNSLGVB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