import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { initialPatientStories } from "/apps/cml_clinic/src/data/patientStoriesData.ts";
import { ClinicDashboardCharts } from "/apps/cml_clinic/src/components/ClinicDashboardCharts.tsx";
import {
  Play,
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  ShieldCheck,
  User,
  ChevronRight,
  Loader2,
  Activity,
  Award
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion, AnimatePresence } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
export const PatientSuccessStories = () => {
  const [stories] = useState(initialPatientStories);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeVideoStory, setActiveVideoStory] = useState(null);
  const [activeDetailStory, setActiveDetailStory] = useState(null);
  const [aiUserQuery, setAiUserQuery] = useState("");
  const [aiMatchLoading, setAiMatchLoading] = useState(false);
  const [aiMatchResult, setAiMatchResult] = useState(null);
  const [aiStorySummary, setAiStorySummary] = useState(null);
  const [aiStoryLoadingId, setAiStoryLoadingId] = useState(null);
  const filteredStories = selectedFilter === "all" ? stories : stories.filter((s) => s.procedure === selectedFilter);
  const handleAiMatch = async (e) => {
    e.preventDefault();
    if (!aiUserQuery.trim()) return;
    setAiMatchLoading(true);
    setAiMatchResult(null);
    try {
      const res = await fetch("/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: aiUserQuery,
          mode: "match_story"
        })
      });
      const data = await res.json();
      if (data.text) {
        setAiMatchResult(data.text);
      } else {
        setAiMatchResult("Nie udało się wygenerować rekomendacji. Spróbuj ponownie.");
      }
    } catch (err) {
      console.error(err);
      setAiMatchResult("Wystąpił błąd połączenia z Asystentem AI.");
    } finally {
      setAiMatchLoading(false);
    }
  };
  const handleGenerateStoryAiSummary = async (story) => {
    setAiStoryLoadingId(story.id);
    try {
      const res = await fetch("/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `Przeanalizuj poniższy przypadek pacjenta u dr. Jana Bujoka i wyciągnij kluczowe wnioski medyczne dla kogoś, kto boi się zabiegu:
Imię: ${story.patientName}, Zabieg: ${story.procedureLabel}, Tytuł: ${story.title}
Streszczenie: ${story.summary}
Pełna historia: ${story.fullStory}`,
          mode: "patient"
        })
      });
      const data = await res.json();
      if (data.text) {
        setAiStorySummary({ storyId: story.id, text: data.text });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiStoryLoadingId(null);
    }
  };
  return /* @__PURE__ */ jsxDEV(
    motion.section,
    {
      className: "py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto",
      id: "historie-pacjentow",
      initial: { opacity: 0, y: 35 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-3xl mx-auto mb-12", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-md", children: [
            /* @__PURE__ */ jsxDEV(Award, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
              lineNumber: 113,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Realne Efekty & Relacje Wideo Pacjentów" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
              lineNumber: 114,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 112,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-4xl font-normal text-slate-100 mb-4", children: "Historie Sukcesu & Rekonwalescencja Krok po Kroku" }, void 0, false, {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 116,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base text-slate-300 font-light leading-relaxed", children: "Zobacz, jak pacjenci dr. Jana Bujoka zyskali pełny komfort życia dzięki małoinwazyjnemu leczeniu laserowemu (LHP®, FiLaC®, SiLaC®). Wybierz przypadek lub skorzystaj z Asystenta AI." }, void 0, false, {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 119,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
          lineNumber: 111,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mb-12 p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-indigo-950/50 to-slate-900 border border-purple-500/30 shadow-2xl relative overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" }, void 0, false, {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 126,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-purple-300 font-semibold text-sm sm:text-base mb-2", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-5 h-5 text-purple-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
              lineNumber: 129,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { children: "Dopasuj Historię Pacjenta do Twojej Sytuacji (AI Engine)" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
              lineNumber: 130,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 128,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 font-light mb-4", children: "Opisz po prostu swoje obawy lub sytuację zawodową/życiową (np. „Pracuję przy biurku i boję się bólu po operacji hemoroidów”), a nasz algorytm Gemini AI odnajdzie odpowiedni przypadek kliniczny." }, void 0, false, {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 132,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("form", { onSubmit: handleAiMatch, className: "flex flex-col sm:flex-row gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: aiUserQuery,
                onChange: (e) => setAiUserQuery(e.target.value),
                placeholder: "Wpisz np. obawiam się braku możliwości biegania przez miesiąc...",
                className: "flex-1 px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-purple-500 transition-all"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                lineNumber: 137,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "submit",
                disabled: aiMatchLoading || !aiUserQuery.trim(),
                className: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/25 shrink-0",
                children: aiMatchLoading ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(Loader2, { className: "w-4 h-4 animate-spin" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 151,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Analizowanie..." }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 152,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 150,
                  columnNumber: 15
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 156,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Dopasuj historię" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 157,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 155,
                  columnNumber: 15
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                lineNumber: 144,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 136,
            columnNumber: 9
          }, this),
          aiMatchResult && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              className: "mt-4 p-4 rounded-xl bg-slate-950/90 border border-purple-500/40 text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line relative",
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-2 pb-2 border-b border-purple-500/20", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-purple-300 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 172,
                      columnNumber: 17
                    }, this),
                    "Rekomendacja Asystenta AI dla Twoich Obaw:"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 171,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setAiMatchResult(null),
                      className: "text-slate-400 hover:text-slate-200 text-xs",
                      children: "Zamknij"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 175,
                      columnNumber: 15
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 170,
                  columnNumber: 13
                }, this),
                aiMatchResult
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
              lineNumber: 165,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
          lineNumber: 125,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center gap-2 flex-wrap mb-8", children: [
          { id: "all", label: "Wszystkie historie" },
          { id: "LHP", label: "Hemoroidy (LHP®)" },
          { id: "FiLaC", label: "Przetoka (FiLaC®)" },
          { id: "SiLaC", label: "Torbiel (SiLaC®)" },
          { id: "Szczelina", label: "Szczelina odbytu" }
        ].map((tab) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedFilter(tab.id),
            className: `px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${selectedFilter === tab.id ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400" : "bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700"}`,
            children: tab.label
          },
          tab.id,
          false,
          {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 196,
            columnNumber: 11
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
          lineNumber: 188,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: filteredStories.map((story) => /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            whileHover: { y: -3 },
            className: "p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 backdrop-blur-md transition-all flex flex-col justify-between group shadow-lg",
            children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-4", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-500/40", children: story.procedureLabel }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 222,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30 font-medium", children: [
                      "Rekonwalescencja: ~",
                      story.recoveryDays,
                      " dni"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 225,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 221,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-500 font-mono", children: story.date }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 229,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 220,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    onClick: () => setActiveVideoStory(story),
                    className: "relative rounded-xl overflow-hidden mb-4 aspect-video bg-slate-950 border border-slate-800 cursor-pointer group/vid shadow-md",
                    children: [
                      /* @__PURE__ */ jsxDEV(
                        "img",
                        {
                          src: story.videoPosterUrl,
                          alt: story.patientName,
                          className: "w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500 opacity-80"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                          lineNumber: 237,
                          columnNumber: 17
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 242,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-14 h-14 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white flex items-center justify-center shadow-xl shadow-purple-600/40 transition-transform group-hover/vid:scale-110", children: /* @__PURE__ */ jsxDEV(Play, { className: "w-6 h-6 ml-0.5 fill-white" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 247,
                        columnNumber: 21
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 246,
                        columnNumber: 19
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 245,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-white drop-shadow-md", children: [
                          "Wideo Relacja Pacjenta (",
                          story.videoDuration,
                          ")"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                          lineNumber: 252,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-slate-950/80 text-[10px] text-purple-300 border border-purple-500/30", children: "Otwórz odtwarzacz" }, void 0, false, {
                          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                          lineNumber: 255,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 251,
                        columnNumber: 17
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 233,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs text-slate-400 mb-2", children: [
                  /* @__PURE__ */ jsxDEV(User, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 263,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200", children: story.patientName }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 264,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    "(",
                    story.age,
                    " lat)"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 265,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 266,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 italic", children: story.occupation }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 267,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 262,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-lg font-semibold text-slate-100 mb-3 group-hover:text-purple-200 transition-colors", children: story.title }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 270,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4", children: story.summary }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 274,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 mb-4", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-purple-300 block mb-1 flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 281,
                      columnNumber: 19
                    }, this),
                    "Kluczowa korzyść techniczna:"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 280,
                    columnNumber: 17
                  }, this),
                  story.keyTakeaway
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 279,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 mb-4 text-[11px] text-slate-400", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-semibold text-slate-300", children: "Etapy powrotu do sprawności:" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 289,
                    columnNumber: 17
                  }, this),
                  story.beforeAfterTimeline.slice(0, 3).map((stage, idx) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-purple-400 mt-1 shrink-0" }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 292,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: [
                      /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-200", children: [
                        stage.stage,
                        ":"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 294,
                        columnNumber: 23
                      }, this),
                      " ",
                      stage.note
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 293,
                      columnNumber: 21
                    }, this)
                  ] }, idx, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 291,
                    columnNumber: 19
                  }, this))
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 288,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                lineNumber: 218,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-slate-800 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setActiveDetailStory(story),
                    className: "text-xs font-semibold text-indigo-300 hover:text-indigo-200 flex items-center gap-1 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxDEV("span", { children: "Czytaj pełny przypadek" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 307,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 308,
                        columnNumber: 17
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 303,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleGenerateStoryAiSummary(story),
                    disabled: aiStoryLoadingId === story.id,
                    className: "px-3 py-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 text-[11px] font-medium text-purple-200 flex items-center gap-1.5 transition-all",
                    children: [
                      aiStoryLoadingId === story.id ? /* @__PURE__ */ jsxDEV(Loader2, { className: "w-3 h-3 animate-spin" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 317,
                        columnNumber: 19
                      }, this) : /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3 h-3 text-purple-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 319,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "AI Streszczenie" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 321,
                        columnNumber: 17
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 311,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                lineNumber: 302,
                columnNumber: 13
              }, this),
              aiStorySummary && aiStorySummary.storyId === story.id && /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  className: "mt-4 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-100 leading-relaxed",
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-1 text-purple-300 font-semibold", children: [
                      /* @__PURE__ */ jsxDEV("span", { children: "Wnioski AI z tego przypadku:" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 333,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: () => setAiStorySummary(null),
                          className: "text-[10px] text-purple-400 hover:text-white",
                          children: "Zamknij"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                          lineNumber: 334,
                          columnNumber: 19
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 332,
                      columnNumber: 17
                    }, this),
                    aiStorySummary.text
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                  lineNumber: 327,
                  columnNumber: 15
                },
                this
              )
            ]
          },
          story.id,
          true,
          {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 213,
            columnNumber: 11
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
          lineNumber: 211,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(ClinicDashboardCharts, {}, void 0, false, {
          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
          lineNumber: 349,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { children: activeVideoStory && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md",
            onClick: () => setActiveVideoStory(null),
            children: /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                initial: { scale: 0.9, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.9, opacity: 0 },
                onClick: (e) => e.stopPropagation(),
                className: "bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative overflow-hidden",
                children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setActiveVideoStory(null),
                      className: "absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all z-10",
                      children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 372,
                        columnNumber: 17
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 368,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-purple-400 uppercase tracking-widest", children: activeVideoStory.procedureLabel }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 376,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-xl font-semibold text-slate-100 mt-1", children: [
                      "Relacja Pacjenta: ",
                      activeVideoStory.patientName,
                      " (",
                      activeVideoStory.age,
                      " l.)"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 379,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 375,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800 mb-4 group flex items-center justify-center shadow-inner", children: [
                    /* @__PURE__ */ jsxDEV(
                      "img",
                      {
                        src: activeVideoStory.videoPosterUrl,
                        alt: activeVideoStory.patientName,
                        className: "w-full h-full object-cover opacity-60"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 386,
                        columnNumber: 17
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 391,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute text-center px-4", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center shadow-2xl mb-3 animate-pulse", children: /* @__PURE__ */ jsxDEV(Play, { className: "w-8 h-8 ml-1 fill-white" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 395,
                        columnNumber: 21
                      }, this) }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 394,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-200 font-medium max-w-sm", children: "Symulowany odtwarzacz wideo HD · CML Wywiady Medyczne" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 397,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 393,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-teal-300 font-medium", children: [
                        /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                          lineNumber: 404,
                          columnNumber: 21
                        }, this),
                        "Brak szwów pooperacyjnych · Powrót: ",
                        activeVideoStory.recoveryDays,
                        " dni"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 403,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[11px] text-slate-400", children: activeVideoStory.videoDuration }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 407,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 402,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 385,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed", children: [
                    /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-slate-100 mb-1", children: "Transkrypcja wywiadu pacjenta:" }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 412,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "italic text-slate-400", children: [
                      "„",
                      activeVideoStory.fullStory.slice(0, 260),
                      "...”"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 413,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 411,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                lineNumber: 361,
                columnNumber: 13
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 354,
            columnNumber: 11
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
          lineNumber: 352,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { children: activeDetailStory && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto",
            onClick: () => setActiveDetailStory(null),
            children: /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                initial: { scale: 0.95, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.95, opacity: 0 },
                onClick: (e) => e.stopPropagation(),
                className: "bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8",
                children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setActiveDetailStory(null),
                      className: "absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all",
                      children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 443,
                        columnNumber: 17
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 439,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-3", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-500/30 text-xs font-semibold", children: activeDetailStory.procedureLabel }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 447,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400", children: activeDetailStory.date }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 450,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 446,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-xl sm:text-2xl font-normal text-slate-100 mb-4", children: activeDetailStory.title }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 453,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 text-xs text-slate-300 mb-6 p-3 rounded-xl bg-slate-950 border border-slate-800", children: [
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "Pacjent" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 459,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200", children: activeDetailStory.patientName }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 460,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 458,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "Wiek & Zawód" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 463,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200", children: [
                        activeDetailStory.age,
                        " lat · ",
                        activeDetailStory.occupation
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 464,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 462,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "Okres gojenia" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 469,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-teal-300", children: [
                        activeDetailStory.recoveryDays,
                        " dni"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 470,
                        columnNumber: 19
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 468,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 457,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6", children: /* @__PURE__ */ jsxDEV("p", { children: activeDetailStory.fullStory }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 475,
                    columnNumber: 17
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 474,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950/80 border border-slate-800 mb-6", children: [
                    /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-xs text-purple-300 mb-3 flex items-center gap-1.5 uppercase tracking-wider", children: [
                      /* @__PURE__ */ jsxDEV(Clock, { className: "w-4 h-4" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 481,
                        columnNumber: 19
                      }, this),
                      "Przebieg powrotu do zdrowia (Timeline):"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 480,
                      columnNumber: 17
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5", children: activeDetailStory.beforeAfterTimeline.map((item, idx) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-3 text-xs", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-purple-900/60 text-purple-200 font-mono text-[10px] shrink-0", children: item.stage }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 487,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 leading-normal", children: item.note }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                        lineNumber: 490,
                        columnNumber: 23
                      }, this)
                    ] }, idx, true, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 486,
                      columnNumber: 21
                    }, this)) }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 484,
                      columnNumber: 17
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 479,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setActiveDetailStory(null),
                      className: "px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors",
                      children: "Zamknij historię"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                      lineNumber: 497,
                      columnNumber: 17
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                    lineNumber: 496,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
                lineNumber: 432,
                columnNumber: 13
              },
              this
            )
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
            lineNumber: 425,
            columnNumber: 11
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
          lineNumber: 423,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/PatientSuccessStories.tsx",
      lineNumber: 102,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhdGllbnRTdWNjZXNzU3Rvcmllcy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUGF0aWVudFN0b3J5SXRlbSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGluaXRpYWxQYXRpZW50U3RvcmllcyB9IGZyb20gJy4uL2RhdGEvcGF0aWVudFN0b3JpZXNEYXRhJztcbmltcG9ydCB7IENsaW5pY0Rhc2hib2FyZENoYXJ0cyB9IGZyb20gJy4vQ2xpbmljRGFzaGJvYXJkQ2hhcnRzJztcbmltcG9ydCB7XG4gIFBsYXksXG4gIFgsXG4gIFNwYXJrbGVzLFxuICBDaGVja0NpcmNsZTIsXG4gIENsb2NrLFxuICBTaGllbGRDaGVjayxcbiAgVXNlcixcbiAgSGVhcnQsXG4gIENoZXZyb25SaWdodCxcbiAgU2VuZCxcbiAgTG9hZGVyMixcbiAgSW5mbyxcbiAgQ2FsZW5kYXIsXG4gIEZpbGVUZXh0LFxuICBBY3Rpdml0eSxcbiAgQXdhcmQsXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBQYXRpZW50U3VjY2Vzc1N0b3JpZXM6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbc3Rvcmllc10gPSB1c2VTdGF0ZTxQYXRpZW50U3RvcnlJdGVtW10+KGluaXRpYWxQYXRpZW50U3Rvcmllcyk7XG4gIGNvbnN0IFtzZWxlY3RlZEZpbHRlciwgc2V0U2VsZWN0ZWRGaWx0ZXJdID0gdXNlU3RhdGU8c3RyaW5nPignYWxsJyk7XG4gIGNvbnN0IFthY3RpdmVWaWRlb1N0b3J5LCBzZXRBY3RpdmVWaWRlb1N0b3J5XSA9IHVzZVN0YXRlPFBhdGllbnRTdG9yeUl0ZW0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2FjdGl2ZURldGFpbFN0b3J5LCBzZXRBY3RpdmVEZXRhaWxTdG9yeV0gPSB1c2VTdGF0ZTxQYXRpZW50U3RvcnlJdGVtIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gQUkgTWF0Y2hpbmcgQXNzaXN0YW50IFN0YXRlXG4gIGNvbnN0IFthaVVzZXJRdWVyeSwgc2V0QWlVc2VyUXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbYWlNYXRjaExvYWRpbmcsIHNldEFpTWF0Y2hMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FpTWF0Y2hSZXN1bHQsIHNldEFpTWF0Y2hSZXN1bHRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gQUkgQ2FzZSBBbmFseXNpcyBNb2RhbCAvIFN0YXRlIGZvciBpbmRpdmlkdWFsIHN0b3JpZXNcbiAgY29uc3QgW2FpU3RvcnlTdW1tYXJ5LCBzZXRBaVN0b3J5U3VtbWFyeV0gPSB1c2VTdGF0ZTx7IHN0b3J5SWQ6IHN0cmluZzsgdGV4dDogc3RyaW5nIH0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2FpU3RvcnlMb2FkaW5nSWQsIHNldEFpU3RvcnlMb2FkaW5nSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gRmlsdGVyZWQgU3Rvcmllc1xuICBjb25zdCBmaWx0ZXJlZFN0b3JpZXMgPVxuICAgIHNlbGVjdGVkRmlsdGVyID09PSAnYWxsJ1xuICAgICAgPyBzdG9yaWVzXG4gICAgICA6IHN0b3JpZXMuZmlsdGVyKChzKSA9PiBzLnByb2NlZHVyZSA9PT0gc2VsZWN0ZWRGaWx0ZXIpO1xuXG4gIC8vIEhhbmRsZSBBSSBNYXRjaGluZyBTZWFyY2hcbiAgY29uc3QgaGFuZGxlQWlNYXRjaCA9IGFzeW5jIChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFhaVVzZXJRdWVyeS50cmltKCkpIHJldHVybjtcblxuICAgIHNldEFpTWF0Y2hMb2FkaW5nKHRydWUpO1xuICAgIHNldEFpTWF0Y2hSZXN1bHQobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvYWkvY29uc3VsdCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcXVlcnk6IGFpVXNlclF1ZXJ5LFxuICAgICAgICAgIG1vZGU6ICdtYXRjaF9zdG9yeScsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgaWYgKGRhdGEudGV4dCkge1xuICAgICAgICBzZXRBaU1hdGNoUmVzdWx0KGRhdGEudGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRBaU1hdGNoUmVzdWx0KCdOaWUgdWRhxYJvIHNpxJkgd3lnZW5lcm93YcSHIHJla29tZW5kYWNqaS4gU3Byw7NidWogcG9ub3duaWUuJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICBzZXRBaU1hdGNoUmVzdWx0KCdXeXN0xIVwacWCIGLFgsSFZCBwb8WCxIVjemVuaWEgeiBBc3lzdGVudGVtIEFJLicpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRBaU1hdGNoTG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIEhhbmRsZSBBSSBTdG9yeSBTdW1tYXJ5XG4gIGNvbnN0IGhhbmRsZUdlbmVyYXRlU3RvcnlBaVN1bW1hcnkgPSBhc3luYyAoc3Rvcnk6IFBhdGllbnRTdG9yeUl0ZW0pID0+IHtcbiAgICBzZXRBaVN0b3J5TG9hZGluZ0lkKHN0b3J5LmlkKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goJy9hcGkvYWkvY29uc3VsdCcsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgcXVlcnk6IGBQcnplYW5hbGl6dWogcG9uacW8c3p5IHByenlwYWRlayBwYWNqZW50YSB1IGRyLiBKYW5hIEJ1am9rYSBpIHd5Y2nEhWduaWoga2x1Y3pvd2Ugd25pb3NraSBtZWR5Y3puZSBkbGEga29nb8WbLCBrdG8gYm9pIHNpxJkgemFiaWVndTpcXG5JbWnEmTogJHtzdG9yeS5wYXRpZW50TmFtZX0sIFphYmllZzogJHtzdG9yeS5wcm9jZWR1cmVMYWJlbH0sIFR5dHXFgjogJHtzdG9yeS50aXRsZX1cXG5TdHJlc3pjemVuaWU6ICR7c3Rvcnkuc3VtbWFyeX1cXG5QZcWCbmEgaGlzdG9yaWE6ICR7c3RvcnkuZnVsbFN0b3J5fWAsXG4gICAgICAgICAgbW9kZTogJ3BhdGllbnQnLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gICAgICBpZiAoZGF0YS50ZXh0KSB7XG4gICAgICAgIHNldEFpU3RvcnlTdW1tYXJ5KHsgc3RvcnlJZDogc3RvcnkuaWQsIHRleHQ6IGRhdGEudGV4dCB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0QWlTdG9yeUxvYWRpbmdJZChudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8bW90aW9uLnNlY3Rpb25cbiAgICAgIGNsYXNzTmFtZT1cInB5LTIwIHB4LTQgc206cHgtNiBsZzpweC04IG1heC13LTZ4bCBteC1hdXRvXCJcbiAgICAgIGlkPVwiaGlzdG9yaWUtcGFjamVudG93XCJcbiAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMzUgfX1cbiAgICAgIHdoaWxlSW5WaWV3PXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgIHZpZXdwb3J0PXt7IG9uY2U6IHRydWUsIG1hcmdpbjogJy02MHB4JyB9fVxuICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC42LCBlYXNlOiBbMC4xNiwgMSwgMC4zLCAxXSB9fVxuICAgID5cbiAgICAgIHsvKiBTZWN0aW9uIEV5ZWJyb3cgJiBNYWluIFRpdGxlICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciBtYXgtdy0zeGwgbXgtYXV0byBtYi0xMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zLjUgcHktMS41IHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtOTUwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCB0ZXh0LXB1cnBsZS0zMDAgdGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi00IHNoYWRvdy1tZFwiPlxuICAgICAgICAgIDxBd2FyZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgIDxzcGFuPlJlYWxuZSBFZmVrdHkgJiBSZWxhY2plIFdpZGVvIFBhY2plbnTDs3c8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBzbTp0ZXh0LTR4bCBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTEwMCBtYi00XCI+XG4gICAgICAgICAgSGlzdG9yaWUgU3VrY2VzdSAmIFJla29ud2FsZXNjZW5jamEgS3JvayBwbyBLcm9rdVxuICAgICAgICA8L2gyPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSB0ZXh0LXNsYXRlLTMwMCBmb250LWxpZ2h0IGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgIFpvYmFjeiwgamFrIHBhY2plbmNpIGRyLiBKYW5hIEJ1am9rYSB6eXNrYWxpIHBlxYJueSBrb21mb3J0IMW8eWNpYSBkemnEmWtpIG1hxYJvaW53YXp5am5lbXUgbGVjemVuaXUgbGFzZXJvd2VtdSAoTEhQwq4sIEZpTGFDwq4sIFNpTGFDwq4pLiBXeWJpZXJ6IHByenlwYWRlayBsdWIgc2tvcnp5c3RhaiB6IEFzeXN0ZW50YSBBSS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBBSSBJbnRlcmFjdGl2ZSBTdG9yeSBNYXRjaGVyIENhcmQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTEyIHAtNiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1iciBmcm9tLXB1cnBsZS05NTAvNDAgdmlhLWluZGlnby05NTAvNTAgdG8tc2xhdGUtOTAwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCBzaGFkb3ctMnhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMTIgLXJpZ2h0LTEyIHctNDggaC00OCBiZy1wdXJwbGUtNjAwLzEwIHJvdW5kZWQtZnVsbCBibHVyLTJ4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtcHVycGxlLTMwMCBmb250LXNlbWlib2xkIHRleHQtc20gc206dGV4dC1iYXNlIG1iLTJcIj5cbiAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXB1cnBsZS00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgPGgzPkRvcGFzdWogSGlzdG9yacSZIFBhY2plbnRhIGRvIFR3b2plaiBTeXR1YWNqaSAoQUkgRW5naW5lKTwvaDM+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgZm9udC1saWdodCBtYi00XCI+XG4gICAgICAgICAgT3Bpc3ogcG8gcHJvc3R1IHN3b2plIG9iYXd5IGx1YiBzeXR1YWNqxJkgemF3b2Rvd8SFL8W8eWNpb3fEhSAobnAuIOKAnlByYWN1asSZIHByenkgYml1cmt1IGkgYm9qxJkgc2nEmSBiw7NsdSBwbyBvcGVyYWNqaSBoZW1vcm9pZMOzd+KAnSksIGEgbmFzeiBhbGdvcnl0bSBHZW1pbmkgQUkgb2RuYWpkemllIG9kcG93aWVkbmkgcHJ6eXBhZGVrIGtsaW5pY3pueS5cbiAgICAgICAgPC9wPlxuXG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVBaU1hdGNofSBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGdhcC0yXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICB2YWx1ZT17YWlVc2VyUXVlcnl9XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEFpVXNlclF1ZXJ5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV3Bpc3ogbnAuIG9iYXdpYW0gc2nEmSBicmFrdSBtb8W8bGl3b8WbY2kgYmllZ2FuaWEgcHJ6ZXogbWllc2nEhWMuLi5cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB4LTQgcHktMi41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTEwMCBwbGFjZWhvbGRlci1zbGF0ZS01MDAgb3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgZGlzYWJsZWQ9e2FpTWF0Y2hMb2FkaW5nIHx8ICFhaVVzZXJRdWVyeS50cmltKCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNjAwIHRvLWluZGlnby02MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNTAwIGhvdmVyOnRvLWluZGlnby01MDAgZGlzYWJsZWQ6b3BhY2l0eS01MCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC14cyBzbTp0ZXh0LXNtIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTYwMC8yNSBzaHJpbmstMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAge2FpTWF0Y2hMb2FkaW5nID8gKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIDxMb2FkZXIyIGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5BbmFsaXpvd2FuaWUuLi48L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+RG9wYXN1aiBoaXN0b3JpxJk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgIHsvKiBBSSBSZXN1bHQgUHJlc2VudGF0aW9uICovfVxuICAgICAgICB7YWlNYXRjaFJlc3VsdCAmJiAoXG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMTAgfX1cbiAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtNCBwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvOTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzQwIHRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTIwMCBsZWFkaW5nLXJlbGF4ZWQgd2hpdGVzcGFjZS1wcmUtbGluZSByZWxhdGl2ZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMiBwYi0yIGJvcmRlci1iIGJvcmRlci1wdXJwbGUtNTAwLzIwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1wdXJwbGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBSZWtvbWVuZGFjamEgQXN5c3RlbnRhIEFJIGRsYSBUd29pY2ggT2JhdzpcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWlNYXRjaFJlc3VsdChudWxsKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFphbWtuaWpcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHthaU1hdGNoUmVzdWx0fVxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRmlsdGVyIFRhYnMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIGZsZXgtd3JhcCBtYi04XCI+XG4gICAgICAgIHtbXG4gICAgICAgICAgeyBpZDogJ2FsbCcsIGxhYmVsOiAnV3N6eXN0a2llIGhpc3RvcmllJyB9LFxuICAgICAgICAgIHsgaWQ6ICdMSFAnLCBsYWJlbDogJ0hlbW9yb2lkeSAoTEhQwq4pJyB9LFxuICAgICAgICAgIHsgaWQ6ICdGaUxhQycsIGxhYmVsOiAnUHJ6ZXRva2EgKEZpTGFDwq4pJyB9LFxuICAgICAgICAgIHsgaWQ6ICdTaUxhQycsIGxhYmVsOiAnVG9yYmllbCAoU2lMYUPCriknIH0sXG4gICAgICAgICAgeyBpZDogJ1N6Y3plbGluYScsIGxhYmVsOiAnU3pjemVsaW5hIG9kYnl0dScgfSxcbiAgICAgICAgXS5tYXAoKHRhYikgPT4gKFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIGtleT17dGFiLmlkfVxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRGaWx0ZXIodGFiLmlkKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0xLjUgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWRGaWx0ZXIgPT09IHRhYi5pZFxuICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS02MDAvMzAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC84MCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dGFiLmxhYmVsfVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogR3JpZCBvZiBTdWNjZXNzIFN0b3JpZXMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTZcIj5cbiAgICAgICAge2ZpbHRlcmVkU3Rvcmllcy5tYXAoKHN0b3J5KSA9PiAoXG4gICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgIGtleT17c3RvcnkuaWR9XG4gICAgICAgICAgICB3aGlsZUhvdmVyPXt7IHk6IC0zIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzcwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1wdXJwbGUtNTAwLzQwIGJhY2tkcm9wLWJsdXItbWQgdHJhbnNpdGlvbi1hbGwgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gZ3JvdXAgc2hhZG93LWxnXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7LyogVG9wIEhlYWRlciBpbmZvICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBtYi00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1ib2xkIHB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC80MFwiPlxuICAgICAgICAgICAgICAgICAgICB7c3RvcnkucHJvY2VkdXJlTGFiZWx9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXRlYWwtMzAwIGJnLXRlYWwtOTUwLzYwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci10ZWFsLTUwMC8zMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICBSZWtvbndhbGVzY2VuY2phOiB+e3N0b3J5LnJlY292ZXJ5RGF5c30gZG5pXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+e3N0b3J5LmRhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogVmlkZW8gVGh1bWJuYWlsIFByZXZpZXcgQmFubmVyICovfVxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVmlkZW9TdG9yeShzdG9yeSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgcm91bmRlZC14bCBvdmVyZmxvdy1oaWRkZW4gbWItNCBhc3BlY3QtdmlkZW8gYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGN1cnNvci1wb2ludGVyIGdyb3VwL3ZpZCBzaGFkb3ctbWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgc3JjPXtzdG9yeS52aWRlb1Bvc3RlclVybH1cbiAgICAgICAgICAgICAgICAgIGFsdD17c3RvcnkucGF0aWVudE5hbWV9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIG9iamVjdC1jb3ZlciBncm91cC1ob3Zlci92aWQ6c2NhbGUtMTA1IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTUwMCBvcGFjaXR5LTgwXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1ncmFkaWVudC10by10IGZyb20tc2xhdGUtOTUwIHZpYS1zbGF0ZS05NTAvNDAgdG8tdHJhbnNwYXJlbnRcIiAvPlxuXG4gICAgICAgICAgICAgICAgey8qIFBsYXkgQnV0dG9uIE92ZXJsYXkgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTQgaC0xNCByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTYwMC85MCBob3ZlcjpiZy1wdXJwbGUtNTAwIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LXhsIHNoYWRvdy1wdXJwbGUtNjAwLzQwIHRyYW5zaXRpb24tdHJhbnNmb3JtIGdyb3VwLWhvdmVyL3ZpZDpzY2FsZS0xMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPFBsYXkgY2xhc3NOYW1lPVwidy02IGgtNiBtbC0wLjUgZmlsbC13aGl0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTMgbGVmdC0zIHJpZ2h0LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBkcm9wLXNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICAgICAgICBXaWRlbyBSZWxhY2phIFBhY2plbnRhICh7c3RvcnkudmlkZW9EdXJhdGlvbn0pXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTk1MC84MCB0ZXh0LVsxMHB4XSB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAgICAgIE90d8Ozcnogb2R0d2FyemFjelxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogUGF0aWVudCBNZXRhICYgVGl0bGUgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtYi0yXCI+XG4gICAgICAgICAgICAgICAgPFVzZXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+e3N0b3J5LnBhdGllbnROYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj4oe3N0b3J5LmFnZX0gbGF0KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgaXRhbGljXCI+e3N0b3J5Lm9jY3VwYXRpb259PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0xMDAgbWItMyBncm91cC1ob3Zlcjp0ZXh0LXB1cnBsZS0yMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICB7c3RvcnkudGl0bGV9XG4gICAgICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIGZvbnQtbGlnaHQgbGVhZGluZy1yZWxheGVkIG1iLTRcIj5cbiAgICAgICAgICAgICAgICB7c3Rvcnkuc3VtbWFyeX1cbiAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgIHsvKiBLZXkgTWVkaWNhbCBUYWtlYXdheSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtYi00XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXB1cnBsZS0zMDAgYmxvY2sgbWItMSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIEtsdWN6b3dhIGtvcnp5xZvEhyB0ZWNobmljem5hOlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB7c3Rvcnkua2V5VGFrZWF3YXl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBUaW1lbGluZSBwcmV2aWV3IHN0ZXBzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IG1iLTQgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDBcIj5FdGFweSBwb3dyb3R1IGRvIHNwcmF3bm/Fm2NpOjwvZGl2PlxuICAgICAgICAgICAgICAgIHtzdG9yeS5iZWZvcmVBZnRlclRpbWVsaW5lLnNsaWNlKDAsIDMpLm1hcCgoc3RhZ2UsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTQwMCBtdC0xIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntzdGFnZS5zdGFnZX06PC9zdHJvbmc+IHtzdGFnZS5ub3RlfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIENhcmQgQWN0aW9uIEZvb3RlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlRGV0YWlsU3Rvcnkoc3RvcnkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LWluZGlnby0zMDAgaG92ZXI6dGV4dC1pbmRpZ28tMjAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuPkN6eXRhaiBwZcWCbnkgcHJ6eXBhZGVrPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlR2VuZXJhdGVTdG9yeUFpU3VtbWFyeShzdG9yeSl9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2FpU3RvcnlMb2FkaW5nSWQgPT09IHN0b3J5LmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQtbGcgYmctcHVycGxlLTk1MC82MCBob3ZlcjpiZy1wdXJwbGUtOTAwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCB0ZXh0LVsxMXB4XSBmb250LW1lZGl1bSB0ZXh0LXB1cnBsZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7YWlTdG9yeUxvYWRpbmdJZCA9PT0gc3RvcnkuaWQgPyAoXG4gICAgICAgICAgICAgICAgICA8TG9hZGVyMiBjbGFzc05hbWU9XCJ3LTMgaC0zIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8c3Bhbj5BSSBTdHJlc3pjemVuaWU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBBSSBDdXN0b20gU3RvcnkgU3VtbWFyeSBEcmF3ZXIgQm94IGlmIGdlbmVyYXRlZCAqL31cbiAgICAgICAgICAgIHthaVN0b3J5U3VtbWFyeSAmJiBhaVN0b3J5U3VtbWFyeS5zdG9yeUlkID09PSBzdG9yeS5pZCAmJiAoXG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBoZWlnaHQ6IDAgfX1cbiAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIGhlaWdodDogJ2F1dG8nIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtNCBwLTMuNSByb3VuZGVkLXhsIGJnLXB1cnBsZS05NTAvNDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIHRleHQteHMgdGV4dC1wdXJwbGUtMTAwIGxlYWRpbmctcmVsYXhlZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0xIHRleHQtcHVycGxlLTMwMCBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Xbmlvc2tpIEFJIHogdGVnbyBwcnp5cGFka3U6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBaVN0b3J5U3VtbWFyeShudWxsKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1wdXJwbGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBaYW1rbmlqXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7YWlTdG9yeVN1bW1hcnkudGV4dH1cbiAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBSZWNoYXJ0cyBBbmFseXRpY3MgRGFzaGJvYXJkIGZvciBQcm9jZWR1cmUgRWZmZWN0aXZlbmVzcyAqL31cbiAgICAgIDxDbGluaWNEYXNoYm9hcmRDaGFydHMgLz5cblxuICAgICAgey8qIFZpZGVvIFBsYXllciBNb2RhbCAqL31cbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIHthY3RpdmVWaWRlb1N0b3J5ICYmIChcbiAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1zbGF0ZS05NTAvODAgYmFja2Ryb3AtYmx1ci1tZFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVWaWRlb1N0b3J5KG51bGwpfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgc2NhbGU6IDAuOSwgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiAxLCBvcGFjaXR5OiAxIH19XG4gICAgICAgICAgICAgIGV4aXQ9e3sgc2NhbGU6IDAuOSwgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtM3hsIG1heC13LTJ4bCB3LWZ1bGwgcC02IHNoYWRvdy0yeGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVZpZGVvU3RvcnkobnVsbCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTQgcmlnaHQtNCBwLTIgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTk1MC84MCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCB6LTEwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1iLTRcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXB1cnBsZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdFwiPlxuICAgICAgICAgICAgICAgICAge2FjdGl2ZVZpZGVvU3RvcnkucHJvY2VkdXJlTGFiZWx9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTEwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICBSZWxhY2phIFBhY2plbnRhOiB7YWN0aXZlVmlkZW9TdG9yeS5wYXRpZW50TmFtZX0gKHthY3RpdmVWaWRlb1N0b3J5LmFnZX0gbC4pXG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFNpbXVsYXRlZCBJbnRlcmFjdGl2ZSBWaWRlbyBTY3JlZW4gKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgcm91bmRlZC0yeGwgb3ZlcmZsb3ctaGlkZGVuIGFzcGVjdC12aWRlbyBiZy1ibGFjayBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBtYi00IGdyb3VwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1pbm5lclwiPlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz17YWN0aXZlVmlkZW9TdG9yeS52aWRlb1Bvc3RlclVybH1cbiAgICAgICAgICAgICAgICAgIGFsdD17YWN0aXZlVmlkZW9TdG9yeS5wYXRpZW50TmFtZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIG9wYWNpdHktNjBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLWdyYWRpZW50LXRvLXQgZnJvbS1ibGFjay84MCB2aWEtdHJhbnNwYXJlbnQgdG8tYmxhY2svMjBcIiAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0ZXh0LWNlbnRlciBweC00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTYgaC0xNiBteC1hdXRvIHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LTJ4bCBtYi0zIGFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgICAgICAgICAgPFBsYXkgY2xhc3NOYW1lPVwidy04IGgtOCBtbC0xIGZpbGwtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMjAwIGZvbnQtbWVkaXVtIG1heC13LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIFN5bXVsb3dhbnkgb2R0d2FyemFjeiB3aWRlbyBIRCDCtyBDTUwgV3l3aWFkeSBNZWR5Y3puZVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tNCBsZWZ0LTQgcmlnaHQtNCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBiZy1zbGF0ZS05NTAvODAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXRlYWwtMzAwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxBY3Rpdml0eSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIEJyYWsgc3p3w7N3IHBvb3BlcmFjeWpueWNoIMK3IFBvd3LDs3Q6IHthY3RpdmVWaWRlb1N0b3J5LnJlY292ZXJ5RGF5c30gZG5pXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj57YWN0aXZlVmlkZW9TdG9yeS52aWRlb0R1cmF0aW9ufTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0xMDAgbWItMVwiPlRyYW5za3J5cGNqYSB3eXdpYWR1IHBhY2plbnRhOjwvcD5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJpdGFsaWMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIOKAnnthY3RpdmVWaWRlb1N0b3J5LmZ1bGxTdG9yeS5zbGljZSgwLCAyNjApfS4uLuKAnVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICApfVxuICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgIHsvKiBEZXRhaWwgU3RvcnkgRnVsbCBUZXh0IE1vZGFsICovfVxuICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAge2FjdGl2ZURldGFpbFN0b3J5ICYmIChcbiAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1zbGF0ZS05NTAvODUgYmFja2Ryb3AtYmx1ci1tZCBvdmVyZmxvdy15LWF1dG9cIlxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlRGV0YWlsU3RvcnkobnVsbCl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBzY2FsZTogMC45NSwgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiAxLCBvcGFjaXR5OiAxIH19XG4gICAgICAgICAgICAgIGV4aXQ9e3sgc2NhbGU6IDAuOTUsIG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IGUuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLTN4bCBtYXgtdy0yeGwgdy1mdWxsIHAtNiBzbTpwLTggc2hhZG93LTJ4bCByZWxhdGl2ZSBteS04XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZURldGFpbFN0b3J5KG51bGwpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC00IHJpZ2h0LTQgcC0yIHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS05NTAvODAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbWItM1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIHRleHQteHMgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgICAgICAge2FjdGl2ZURldGFpbFN0b3J5LnByb2NlZHVyZUxhYmVsfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+e2FjdGl2ZURldGFpbFN0b3J5LmRhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtbm9ybWFsIHRleHQtc2xhdGUtMTAwIG1iLTRcIj5cbiAgICAgICAgICAgICAgICB7YWN0aXZlRGV0YWlsU3RvcnkudGl0bGV9XG4gICAgICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG1iLTYgcC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrIHRleHQtWzEwcHhdXCI+UGFjamVudDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDBcIj57YWN0aXZlRGV0YWlsU3RvcnkucGF0aWVudE5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBibG9jayB0ZXh0LVsxMHB4XVwiPldpZWsgJiBaYXfDs2Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVEZXRhaWxTdG9yeS5hZ2V9IGxhdCDCtyB7YWN0aXZlRGV0YWlsU3Rvcnkub2NjdXBhdGlvbn1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgYmxvY2sgdGV4dC1bMTBweF1cIj5Pa3JlcyBnb2plbmlhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXRlYWwtMzAwXCI+e2FjdGl2ZURldGFpbFN0b3J5LnJlY292ZXJ5RGF5c30gZG5pPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNCB0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWQgbWItNlwiPlxuICAgICAgICAgICAgICAgIDxwPnthY3RpdmVEZXRhaWxTdG9yeS5mdWxsU3Rvcnl9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogVGltZWxpbmUgbGlzdCAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgbWItNlwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQteHMgdGV4dC1wdXJwbGUtMzAwIG1iLTMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIFByemViaWVnIHBvd3JvdHUgZG8gemRyb3dpYSAoVGltZWxpbmUpOlxuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICAgICAge2FjdGl2ZURldGFpbFN0b3J5LmJlZm9yZUFmdGVyVGltZWxpbmUubWFwKChpdGVtLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1wdXJwbGUtOTAwLzYwIHRleHQtcHVycGxlLTIwMCBmb250LW1vbm8gdGV4dC1bMTBweF0gc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnN0YWdlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLW5vcm1hbFwiPntpdGVtLm5vdGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVEZXRhaWxTdG9yeShudWxsKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMi41IHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCBmb250LXNlbWlib2xkIHRleHQteHMgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFphbWtuaWogaGlzdG9yacSZXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgIDwvbW90aW9uLnNlY3Rpb24+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFnSFUsU0FxQ0ksVUFyQ0o7QUFoSFYsU0FBZ0IsZ0JBQWdCO0FBRWhDLFNBQVMsNkJBQTZCO0FBQ3RDLFNBQVMsNkJBQTZCO0FBQ3RDO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUVBO0FBQUEsRUFJQTtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBQ1AsU0FBUyxRQUFRLHVCQUF1QjtBQUVqQyxhQUFNLHdCQUFrQyxNQUFNO0FBQ25ELFFBQU0sQ0FBQyxPQUFPLElBQUksU0FBNkIscUJBQXFCO0FBQ3BFLFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLElBQUksU0FBaUIsS0FBSztBQUNsRSxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixJQUFJLFNBQWtDLElBQUk7QUFDdEYsUUFBTSxDQUFDLG1CQUFtQixvQkFBb0IsSUFBSSxTQUFrQyxJQUFJO0FBR3hGLFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEVBQUU7QUFDakQsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFTLEtBQUs7QUFDMUQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBd0IsSUFBSTtBQUd0RSxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJLFNBQW1ELElBQUk7QUFDbkcsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSSxTQUF3QixJQUFJO0FBRzVFLFFBQU0sa0JBQ0osbUJBQW1CLFFBQ2YsVUFDQSxRQUFRLE9BQU8sQ0FBQyxNQUFN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