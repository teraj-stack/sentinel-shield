import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { Sparkles, TrendingUp, Clock, CheckCircle2, ShieldCheck, Zap, BookOpen, Plus, Loader2 } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
export const AiFaqArticleAgent = ({ onPublishToFaq }) => {
  const [articles, setArticles] = useState([
    {
      id: "article-1",
      q: "Ile kosztuje laserowe leczenie hemoroidów LHP® w Warszawie i czy zabieg jest refundowany?",
      a: "Zabieg LHP® (Laser Hemorrhoidoplasty) w CML u dr. Jana Bujoka kosztuje od 2 800 zł do 3 500 zł w zależności od stopnia zaawansowania (I-IV stopień). Choć NFZ zazwyczaj finansuje jedynie tradycyjne wycięcie chirurgiczne związane z 3-tygodniową bolesną hospitalizacją, zabieg w CML oferuje bezkrwawy powrót do pracy w 2-3 dni bez konieczności L4. W cenę wliczone jest znieczulenie oraz 2 wizyty kontrolne.",
      generatedDate: "27 Lipca 2026 (Cykl #28)",
      trendKeyword: "laserowe leczenie hemoroidów cena warszawa",
      roiScore: "ROI: 96% · Wysoka konwersja",
      monthlySearches: "3,800/msc",
      isPublished: true
    },
    {
      id: "article-2",
      q: "Czy po zabiegu laserowym przetoki FiLaC® grozi mi nietrzymanie stolca?",
      a: "Nie. Główną zaletą precyzyjnej metody FiLaC® jest stuprocentowe oszczędzenie mięśni zwieraczy. W przeciwieństwie do tradycyjnej operacji chirurgicznej z przecięciem tkanki mięśniowej, wiązka promieniowa obkurcza i zamyka kanał przetoki od środka, eliminując ryzyko uszkodzenia zwieraczy.",
      generatedDate: "24 Lipca 2026 (Cykl #27)",
      trendKeyword: "FiLaC przetoka zwieracze ryzyko",
      roiScore: "ROI: 91% · Wysokie zaufanie",
      monthlySearches: "2,100/msc",
      isPublished: true
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("feed");
  const [nextCycleHours, setNextCycleHours] = useState(64);
  const trendingKeywords = [
    { keyword: "laserowe leczenie hemoroidów cena warszawa", volume: "3,800/msc", roi: "96%", difficulty: "Niska (High ROI)" },
    { keyword: "LHP ile dni na L4 po zabiegu", volume: "2,400/msc", roi: "92%", difficulty: "Średnia" },
    { keyword: "przetoka odbytu FiLaC czy boli", volume: "1,950/msc", roi: "89%", difficulty: "Niska" },
    { keyword: "torbiel pilonidalna nawroty SiLaC", volume: "1,700/msc", roi: "88%", difficulty: "Niska" },
    { keyword: "e-konsultacja proktologiczna e-recepta maść", volume: "2,800/msc", roi: "94%", difficulty: "Niska" }
  ];
  const handleGenerateNewArticle = async () => {
    setIsGenerating(true);
    try {
      const randomTrend = trendingKeywords[Math.floor(Math.random() * trendingKeywords.length)];
      const res = await fetch("/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `Wygeneruj artykuł FAQ o najwyższym ROI dla trendu: "${randomTrend.keyword}". Wyjaśnij przewagi leczenia laserowego w CML dr. Jana Bujoka.`,
          mode: "faq_agent"
        })
      });
      const data = await res.json();
      let question = `Jak wygląda leczenie dla zapytania: ${randomTrend.keyword}?`;
      let answer = data.text || "Brak danych od agenta.";
      if (data.text) {
        const qMatch = data.text.match(/PYTANIE:\s*(.*)/i);
        const aMatch = data.text.match(/ODPOWIEDŹ:\s*([\s\S]*?)(?=TREND_KEYWORD:|ESTIMATED_ROI:|$)/i);
        if (qMatch && qMatch[1]) question = qMatch[1].trim();
        if (aMatch && aMatch[1]) answer = aMatch[1].trim();
      }
      const newArt = {
        id: `article-${Date.now()}`,
        q: question,
        a: answer,
        generatedDate: `Dzisiaj (${(/* @__PURE__ */ new Date()).toLocaleDateString("pl-PL")}) - Automatyczny Cykl 3d`,
        trendKeyword: randomTrend.keyword,
        roiScore: `ROI: ${randomTrend.roi} · Max Zysk`,
        monthlySearches: randomTrend.volume,
        isPublished: false
      };
      setArticles((prev) => [newArt, ...prev]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };
  const handlePublish = (art) => {
    onPublishToFaq({ q: art.q, a: art.a });
    setArticles(
      (prev) => prev.map((item) => item.id === art.id ? { ...item, isPublished: true } : item)
    );
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "mt-12 p-6 rounded-3xl bg-slate-900/90 border border-purple-500/30 shadow-2xl relative overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
      fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
      lineNumber: 113,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 text-purple-300 text-xs font-semibold border border-purple-500/30 mb-2", children: [
          /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-purple-400 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 119,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Autonomiczny Agent Content & ROI SEO (Co 3 Dni)" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 120,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 118,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xl sm:text-2xl font-serif text-slate-100 font-semibold", children: "AI Agent Generowania Artykułów & FAQ Trendów" }, void 0, false, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 122,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 font-light mt-1", children: "Agent analizuje zapytania wpisywane w wyszukiwarkę Google przez pacjentów i automatycznie generuje artykuły o najwyższym stopniu zwrotu z inwestycji (ROI)." }, void 0, false, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 125,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleGenerateNewArticle,
          disabled: isGenerating,
          className: "px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/30 shrink-0 disabled:opacity-50",
          children: isGenerating ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Loader2, { className: "w-4 h-4 animate-spin" }, void 0, false, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 138,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Generowanie artykułu AI..." }, void 0, false, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 139,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 137,
            columnNumber: 13
          }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-purple-200" }, void 0, false, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 143,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Wygeneruj cykl teraz (3 dni)" }, void 0, false, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 144,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 142,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 131,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
      lineNumber: 116,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 my-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(Clock, { className: "w-5 h-5 text-purple-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 153,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "Następny Cykl Generowania" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 155,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-purple-300", children: "Za ~2 dni i 16 godzin" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 156,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 154,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(TrendingUp, { className: "w-5 h-5 text-teal-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 161,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "Wskaźnik Trajektorii ROI" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-teal-300", children: "Wyselekcjonowane słowa kluczowe (94% High ROI)" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 164,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 162,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
        lineNumber: 160,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-5 h-5 text-indigo-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 169,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block uppercase font-bold", children: "Weryfikacja Medyczna" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 171,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-indigo-300", children: "Zgodność z technologią LHP / FiLaC CML" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 172,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 170,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
        lineNumber: 168,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
      lineNumber: 151,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-6 border-b border-slate-800 pb-3", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("feed"),
          className: `px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "feed" ? "bg-purple-900/60 text-purple-200 border border-purple-500/40" : "text-slate-400 hover:text-slate-200"}`,
          children: [
            "Wygenerowane Artykuły FAQ (",
            articles.length,
            ")"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 179,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("trends"),
          className: `px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "trends" ? "bg-purple-900/60 text-purple-200 border border-purple-500/40" : "text-slate-400 hover:text-slate-200"}`,
          children: "Monitorowane Słowa Kluczowe & ROI"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 189,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
      lineNumber: 178,
      columnNumber: 7
    }, this),
    activeTab === "feed" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: articles.map((art) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: "p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/30 transition-all",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 text-[10px] font-mono border border-purple-500/30 font-semibold", children: [
                "🔑 ",
                art.trendKeyword
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
                lineNumber: 211,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 text-[10px] font-semibold border border-teal-500/30", children: art.roiScore }, void 0, false, {
                fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
                lineNumber: 214,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: [
                "Ruch: ",
                art.monthlySearches
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
                lineNumber: 217,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 210,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: art.generatedDate }, void 0, false, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 219,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 209,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h4", { className: "font-semibold text-slate-100 text-sm sm:text-base mb-2 flex items-start gap-2", children: [
            /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-4 h-4 text-purple-400 shrink-0 mt-1" }, void 0, false, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 223,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: art.q }, void 0, false, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 224,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 222,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4 pl-6 border-l-2 border-purple-500/30", children: art.a }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 227,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-3 border-t border-slate-900", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400 italic", children: "Wygenerowano automatycznie przez Agent Gemini Pro (3-day cycle engine)" }, void 0, false, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 232,
              columnNumber: 17
            }, this),
            art.isPublished ? /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-teal-400 flex items-center gap-1.5 bg-teal-950/60 px-3 py-1 rounded-lg border border-teal-500/30", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
                lineNumber: 238,
                columnNumber: 21
              }, this),
              "Opublikowano w Sekcji FAQ"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
              lineNumber: 237,
              columnNumber: 19
            }, this) : /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handlePublish(art),
                className: "px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md transition-all",
                children: [
                  /* @__PURE__ */ jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
                    lineNumber: 246,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Dodaj do FAQ na stronie" }, void 0, false, {
                    fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
                    lineNumber: 247,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
                lineNumber: 242,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 231,
            columnNumber: 15
          }, this)
        ]
      },
      art.id,
      true,
      {
        fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
        lineNumber: 205,
        columnNumber: 13
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
      lineNumber: 203,
      columnNumber: 9
    }, this),
    activeTab === "trends" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mb-2", children: "Poniższe frazy kluczowe są nieustannie skanowane przez agenta. Wybierane są pytania o najwyższej marży pacjentów i największej objętości wyszukiwań." }, void 0, false, {
        fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
        lineNumber: 259,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "divide-y divide-slate-800 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-4 p-3 font-semibold text-slate-400 bg-slate-900", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Słowo Kluczowe" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 265,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Wyszukiwania / msc" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 266,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Estymowany Wskaźnik ROI" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 267,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Trudność SEO" }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 268,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 264,
          columnNumber: 13
        }, this),
        trendingKeywords.map((item, idx) => /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-4 p-3 text-slate-200 items-center hover:bg-slate-900/50", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-purple-300 font-medium", children: item.keyword }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 272,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: item.volume }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 273,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-teal-300 font-semibold", children: item.roi }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 274,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: item.difficulty }, void 0, false, {
            fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
            lineNumber: 275,
            columnNumber: 17
          }, this)
        ] }, idx, true, {
          fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
          lineNumber: 271,
          columnNumber: 15
        }, this))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
        lineNumber: 263,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
      lineNumber: 258,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AiFaqArticleAgent.tsx",
    lineNumber: 111,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFpRmFxQXJ0aWNsZUFnZW50LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEZhcUl0ZW0gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBTcGFya2xlcywgVHJlbmRpbmdVcCwgQ2xvY2ssIFJlZnJlc2hDdywgQ2hlY2tDaXJjbGUyLCBTaGllbGRDaGVjaywgWmFwLCBCb29rT3BlbiwgUGx1cywgTG9hZGVyMiB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2VuZXJhdGVkRmFxQXJ0aWNsZSBleHRlbmRzIEZhcUl0ZW0ge1xuICBpZDogc3RyaW5nO1xuICBnZW5lcmF0ZWREYXRlOiBzdHJpbmc7XG4gIHRyZW5kS2V5d29yZDogc3RyaW5nO1xuICByb2lTY29yZTogc3RyaW5nO1xuICBtb250aGx5U2VhcmNoZXM6IHN0cmluZztcbiAgaXNQdWJsaXNoZWQ6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBBaUZhcUFydGljbGVBZ2VudFByb3BzIHtcbiAgb25QdWJsaXNoVG9GYXE6IChuZXdJdGVtOiBGYXFJdGVtKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQWlGYXFBcnRpY2xlQWdlbnQ6IFJlYWN0LkZDPEFpRmFxQXJ0aWNsZUFnZW50UHJvcHM+ID0gKHsgb25QdWJsaXNoVG9GYXEgfSkgPT4ge1xuICBjb25zdCBbYXJ0aWNsZXMsIHNldEFydGljbGVzXSA9IHVzZVN0YXRlPEdlbmVyYXRlZEZhcUFydGljbGVbXT4oW1xuICAgIHtcbiAgICAgIGlkOiAnYXJ0aWNsZS0xJyxcbiAgICAgIHE6ICdJbGUga29zenR1amUgbGFzZXJvd2UgbGVjemVuaWUgaGVtb3JvaWTDs3cgTEhQwq4gdyBXYXJzemF3aWUgaSBjenkgemFiaWVnIGplc3QgcmVmdW5kb3dhbnk/JyxcbiAgICAgIGE6ICdaYWJpZWcgTEhQwq4gKExhc2VyIEhlbW9ycmhvaWRvcGxhc3R5KSB3IENNTCB1IGRyLiBKYW5hIEJ1am9rYSBrb3N6dHVqZSBvZCAyIDgwMCB6xYIgZG8gMyA1MDAgesWCIHcgemFsZcW8bm/Fm2NpIG9kIHN0b3BuaWEgemFhd2Fuc293YW5pYSAoSS1JViBzdG9waWXFhCkuIENob8SHIE5GWiB6YXp3eWN6YWogZmluYW5zdWplIGplZHluaWUgdHJhZHljeWpuZSB3eWNpxJljaWUgY2hpcnVyZ2ljem5lIHp3acSFemFuZSB6IDMtdHlnb2RuaW93xIUgYm9sZXNuxIUgaG9zcGl0YWxpemFjasSFLCB6YWJpZWcgdyBDTUwgb2ZlcnVqZSBiZXprcndhd3kgcG93csOzdCBkbyBwcmFjeSB3IDItMyBkbmkgYmV6IGtvbmllY3pub8WbY2kgTDQuIFcgY2VuxJkgd2xpY3pvbmUgamVzdCB6bmllY3p1bGVuaWUgb3JheiAyIHdpenl0eSBrb250cm9sbmUuJyxcbiAgICAgIGdlbmVyYXRlZERhdGU6ICcyNyBMaXBjYSAyMDI2IChDeWtsICMyOCknLFxuICAgICAgdHJlbmRLZXl3b3JkOiAnbGFzZXJvd2UgbGVjemVuaWUgaGVtb3JvaWTDs3cgY2VuYSB3YXJzemF3YScsXG4gICAgICByb2lTY29yZTogJ1JPSTogOTYlIMK3IFd5c29rYSBrb253ZXJzamEnLFxuICAgICAgbW9udGhseVNlYXJjaGVzOiAnMyw4MDAvbXNjJyxcbiAgICAgIGlzUHVibGlzaGVkOiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdhcnRpY2xlLTInLFxuICAgICAgcTogJ0N6eSBwbyB6YWJpZWd1IGxhc2Vyb3d5bSBwcnpldG9raSBGaUxhQ8KuIGdyb3ppIG1pIG5pZXRyenltYW5pZSBzdG9sY2E/JyxcbiAgICAgIGE6ICdOaWUuIEfFgsOzd27EhSB6YWxldMSFIHByZWN5enlqbmVqIG1ldG9keSBGaUxhQ8KuIGplc3Qgc3R1cHJvY2VudG93ZSBvc3pjesSZZHplbmllIG1pxJnFm25pIHp3aWVyYWN6eS4gVyBwcnplY2l3aWXFhHN0d2llIGRvIHRyYWR5Y3lqbmVqIG9wZXJhY2ppIGNoaXJ1cmdpY3puZWogeiBwcnplY2nEmWNpZW0gdGthbmtpIG1pxJnFm25pb3dlaiwgd2nEhXprYSBwcm9taWVuaW93YSBvYmt1cmN6YSBpIHphbXlrYSBrYW5hxYIgcHJ6ZXRva2kgb2QgxZtyb2RrYSwgZWxpbWludWrEhWMgcnl6eWtvIHVzemtvZHplbmlhIHp3aWVyYWN6eS4nLFxuICAgICAgZ2VuZXJhdGVkRGF0ZTogJzI0IExpcGNhIDIwMjYgKEN5a2wgIzI3KScsXG4gICAgICB0cmVuZEtleXdvcmQ6ICdGaUxhQyBwcnpldG9rYSB6d2llcmFjemUgcnl6eWtvJyxcbiAgICAgIHJvaVNjb3JlOiAnUk9JOiA5MSUgwrcgV3lzb2tpZSB6YXVmYW5pZScsXG4gICAgICBtb250aGx5U2VhcmNoZXM6ICcyLDEwMC9tc2MnLFxuICAgICAgaXNQdWJsaXNoZWQ6IHRydWUsXG4gICAgfSxcbiAgXSk7XG5cbiAgY29uc3QgW2lzR2VuZXJhdGluZywgc2V0SXNHZW5lcmF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdmZWVkJyB8ICd0cmVuZHMnPignZmVlZCcpO1xuICBjb25zdCBbbmV4dEN5Y2xlSG91cnMsIHNldE5leHRDeWNsZUhvdXJzXSA9IHVzZVN0YXRlKDY0KTsgLy8gfjIuNSBkYXlzIGxlZnQgdGlsbCAzLWRheSBjeWNsZVxuXG4gIC8vIEtleXdvcmRzIHRyZW5kIG1hdHJpeFxuICBjb25zdCB0cmVuZGluZ0tleXdvcmRzID0gW1xuICAgIHsga2V5d29yZDogJ2xhc2Vyb3dlIGxlY3plbmllIGhlbW9yb2lkw7N3IGNlbmEgd2Fyc3phd2EnLCB2b2x1bWU6ICczLDgwMC9tc2MnLCByb2k6ICc5NiUnLCBkaWZmaWN1bHR5OiAnTmlza2EgKEhpZ2ggUk9JKScgfSxcbiAgICB7IGtleXdvcmQ6ICdMSFAgaWxlIGRuaSBuYSBMNCBwbyB6YWJpZWd1Jywgdm9sdW1lOiAnMiw0MDAvbXNjJywgcm9pOiAnOTIlJywgZGlmZmljdWx0eTogJ8WacmVkbmlhJyB9LFxuICAgIHsga2V5d29yZDogJ3ByemV0b2thIG9kYnl0dSBGaUxhQyBjenkgYm9saScsIHZvbHVtZTogJzEsOTUwL21zYycsIHJvaTogJzg5JScsIGRpZmZpY3VsdHk6ICdOaXNrYScgfSxcbiAgICB7IGtleXdvcmQ6ICd0b3JiaWVsIHBpbG9uaWRhbG5hIG5hd3JvdHkgU2lMYUMnLCB2b2x1bWU6ICcxLDcwMC9tc2MnLCByb2k6ICc4OCUnLCBkaWZmaWN1bHR5OiAnTmlza2EnIH0sXG4gICAgeyBrZXl3b3JkOiAnZS1rb25zdWx0YWNqYSBwcm9rdG9sb2dpY3puYSBlLXJlY2VwdGEgbWHFm8SHJywgdm9sdW1lOiAnMiw4MDAvbXNjJywgcm9pOiAnOTQlJywgZGlmZmljdWx0eTogJ05pc2thJyB9LFxuICBdO1xuXG4gIC8vIEZ1bmN0aW9uIHRvIHRyaWdnZXIgQUkgZ2VuZXJhdGlvblxuICBjb25zdCBoYW5kbGVHZW5lcmF0ZU5ld0FydGljbGUgPSBhc3luYyAoKSA9PiB7XG4gICAgc2V0SXNHZW5lcmF0aW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICAvLyBQaWNrIGEgcmFuZG9tIGtleXdvcmQgZnJvbSB0cmVuZHMgZm9yIGZyZXNoIGdlbmVyYXRpb25cbiAgICAgIGNvbnN0IHJhbmRvbVRyZW5kID0gdHJlbmRpbmdLZXl3b3Jkc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0cmVuZGluZ0tleXdvcmRzLmxlbmd0aCldO1xuXG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9haS9jb25zdWx0Jywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBxdWVyeTogYFd5Z2VuZXJ1aiBhcnR5a3XFgiBGQVEgbyBuYWp3ecW8c3p5bSBST0kgZGxhIHRyZW5kdTogXCIke3JhbmRvbVRyZW5kLmtleXdvcmR9XCIuIFd5amHFm25paiBwcnpld2FnaSBsZWN6ZW5pYSBsYXNlcm93ZWdvIHcgQ01MIGRyLiBKYW5hIEJ1am9rYS5gLFxuICAgICAgICAgIG1vZGU6ICdmYXFfYWdlbnQnLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGxldCBxdWVzdGlvbiA9IGBKYWsgd3lnbMSFZGEgbGVjemVuaWUgZGxhIHphcHl0YW5pYTogJHtyYW5kb21UcmVuZC5rZXl3b3JkfT9gO1xuICAgICAgbGV0IGFuc3dlciA9IGRhdGEudGV4dCB8fCAnQnJhayBkYW55Y2ggb2QgYWdlbnRhLic7XG5cbiAgICAgIC8vIFBhcnNlIHN0cnVjdHVyZWQgZm9ybWF0IGlmIGF2YWlsYWJsZVxuICAgICAgaWYgKGRhdGEudGV4dCkge1xuICAgICAgICBjb25zdCBxTWF0Y2ggPSBkYXRhLnRleHQubWF0Y2goL1BZVEFOSUU6XFxzKiguKikvaSk7XG4gICAgICAgIGNvbnN0IGFNYXRjaCA9IGRhdGEudGV4dC5tYXRjaCgvT0RQT1dJRUTFuTpcXHMqKFtcXHNcXFNdKj8pKD89VFJFTkRfS0VZV09SRDp8RVNUSU1BVEVEX1JPSTp8JCkvaSk7XG4gICAgICAgIGlmIChxTWF0Y2ggJiYgcU1hdGNoWzFdKSBxdWVzdGlvbiA9IHFNYXRjaFsxXS50cmltKCk7XG4gICAgICAgIGlmIChhTWF0Y2ggJiYgYU1hdGNoWzFdKSBhbnN3ZXIgPSBhTWF0Y2hbMV0udHJpbSgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdBcnQ6IEdlbmVyYXRlZEZhcUFydGljbGUgPSB7XG4gICAgICAgIGlkOiBgYXJ0aWNsZS0ke0RhdGUubm93KCl9YCxcbiAgICAgICAgcTogcXVlc3Rpb24sXG4gICAgICAgIGE6IGFuc3dlcixcbiAgICAgICAgZ2VuZXJhdGVkRGF0ZTogYER6aXNpYWogKCR7bmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ3BsLVBMJyl9KSAtIEF1dG9tYXR5Y3pueSBDeWtsIDNkYCxcbiAgICAgICAgdHJlbmRLZXl3b3JkOiByYW5kb21UcmVuZC5rZXl3b3JkLFxuICAgICAgICByb2lTY29yZTogYFJPSTogJHtyYW5kb21UcmVuZC5yb2l9IMK3IE1heCBaeXNrYCxcbiAgICAgICAgbW9udGhseVNlYXJjaGVzOiByYW5kb21UcmVuZC52b2x1bWUsXG4gICAgICAgIGlzUHVibGlzaGVkOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICAgIHNldEFydGljbGVzKChwcmV2KSA9PiBbbmV3QXJ0LCAuLi5wcmV2XSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzR2VuZXJhdGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVB1Ymxpc2ggPSAoYXJ0OiBHZW5lcmF0ZWRGYXFBcnRpY2xlKSA9PiB7XG4gICAgb25QdWJsaXNoVG9GYXEoeyBxOiBhcnQucSwgYTogYXJ0LmEgfSk7XG4gICAgc2V0QXJ0aWNsZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgoaXRlbSkgPT4gKGl0ZW0uaWQgPT09IGFydC5pZCA/IHsgLi4uaXRlbSwgaXNQdWJsaXNoZWQ6IHRydWUgfSA6IGl0ZW0pKVxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEyIHAtNiByb3VuZGVkLTN4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIHNoYWRvdy0yeGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICB7LyogQmFja2dyb3VuZCBHbG93ICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHctODAgaC04MCBiZy1wdXJwbGUtNjAwLzEwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgey8qIEhlYWRlciBCYWRnZSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTYgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgdGV4dC14cyBmb250LXNlbWlib2xkIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCBtYi0yXCI+XG4gICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkF1dG9ub21pY3pueSBBZ2VudCBDb250ZW50ICYgUk9JIFNFTyAoQ28gMyBEbmkpPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtc2VyaWYgdGV4dC1zbGF0ZS0xMDAgZm9udC1zZW1pYm9sZFwiPlxuICAgICAgICAgICAgQUkgQWdlbnQgR2VuZXJvd2FuaWEgQXJ0eWt1xYLDs3cgJiBGQVEgVHJlbmTDs3dcbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBmb250LWxpZ2h0IG10LTFcIj5cbiAgICAgICAgICAgIEFnZW50IGFuYWxpenVqZSB6YXB5dGFuaWEgd3Bpc3l3YW5lIHcgd3lzenVraXdhcmvEmSBHb29nbGUgcHJ6ZXogcGFjamVudMOzdyBpIGF1dG9tYXR5Y3puaWUgZ2VuZXJ1amUgYXJ0eWt1xYJ5IG8gbmFqd3nFvHN6eW0gc3RvcG5pdSB6d3JvdHUgeiBpbndlc3R5Y2ppIChST0kpLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEFjdGlvbiBidXR0b24gKi99XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVHZW5lcmF0ZU5ld0FydGljbGV9XG4gICAgICAgICAgZGlzYWJsZWQ9e2lzR2VuZXJhdGluZ31cbiAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNjAwIHRvLWluZGlnby02MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNTAwIGhvdmVyOnRvLWluZGlnby01MDAgdGV4dC13aGl0ZSBmb250LXNlbWlib2xkIHRleHQteHMgc206dGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS02MDAvMzAgc2hyaW5rLTAgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgID5cbiAgICAgICAgICB7aXNHZW5lcmF0aW5nID8gKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPExvYWRlcjIgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5HZW5lcm93YW5pZSBhcnR5a3XFgnUgQUkuLi48L3NwYW4+XG4gICAgICAgICAgICA8Lz5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtMjAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+V3lnZW5lcnVqIGN5a2wgdGVyYXogKDMgZG5pKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBBZ2VudCBTdGF0dXMgQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0zIGdhcC0zIG15LTZcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHVycGxlLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGJsb2NrIHVwcGVyY2FzZSBmb250LWJvbGRcIj5OYXN0xJlwbnkgQ3lrbCBHZW5lcm93YW5pYTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXB1cnBsZS0zMDBcIj5aYSB+MiBkbmkgaSAxNiBnb2R6aW48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICA8VHJlbmRpbmdVcCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtdGVhbC00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBibG9jayB1cHBlcmNhc2UgZm9udC1ib2xkXCI+V3NrYcW6bmlrIFRyYWpla3RvcmlpIFJPSTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXRlYWwtMzAwXCI+V3lzZWxla2Nqb25vd2FuZSBzxYJvd2Ega2x1Y3pvd2UgKDk0JSBIaWdoIFJPSSk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LWluZGlnby00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBibG9jayB1cHBlcmNhc2UgZm9udC1ib2xkXCI+V2VyeWZpa2FjamEgTWVkeWN6bmE8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1pbmRpZ28tMzAwXCI+WmdvZG5vxZvEhyB6IHRlY2hub2xvZ2nEhSBMSFAgLyBGaUxhQyBDTUw8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBOYXZpZ2F0aW9uIHN1Yi10YWJzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi02IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdmZWVkJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2ZlZWQnXG4gICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS05MDAvNjAgdGV4dC1wdXJwbGUtMjAwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC80MCdcbiAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAnXG4gICAgICAgICAgfWB9XG4gICAgICAgID5cbiAgICAgICAgICBXeWdlbmVyb3dhbmUgQXJ0eWt1xYJ5IEZBUSAoe2FydGljbGVzLmxlbmd0aH0pXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCd0cmVuZHMnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTEuNSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgYWN0aXZlVGFiID09PSAndHJlbmRzJ1xuICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTAwLzYwIHRleHQtcHVycGxlLTIwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDAnXG4gICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgTW9uaXRvcm93YW5lIFPFgm93YSBLbHVjem93ZSAmIFJPSVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVGFiIENvbnRlbnQ6IEZlZWQgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnZmVlZCcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgIHthcnRpY2xlcy5tYXAoKGFydCkgPT4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e2FydC5pZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC83MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItcHVycGxlLTUwMC8zMCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIG1iLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgdGV4dC1bMTBweF0gZm9udC1tb25vIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIPCflJEge2FydC50cmVuZEtleXdvcmR9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCBiZy10ZWFsLTk1MCB0ZXh0LXRlYWwtMzAwIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgYm9yZGVyIGJvcmRlci10ZWFsLTUwMC8zMFwiPlxuICAgICAgICAgICAgICAgICAgICB7YXJ0LnJvaVNjb3JlfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5SdWNoOiB7YXJ0Lm1vbnRobHlTZWFyY2hlc308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj57YXJ0LmdlbmVyYXRlZERhdGV9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTEwMCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBtYi0yIGZsZXggaXRlbXMtc3RhcnQgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8Qm9va09wZW4gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDAgc2hyaW5rLTAgbXQtMVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2FydC5xfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWQgbWItNCBwbC02IGJvcmRlci1sLTIgYm9yZGVyLXB1cnBsZS01MDAvMzBcIj5cbiAgICAgICAgICAgICAgICB7YXJ0LmF9XG4gICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBpdGFsaWNcIj5cbiAgICAgICAgICAgICAgICAgIFd5Z2VuZXJvd2FubyBhdXRvbWF0eWN6bmllIHByemV6IEFnZW50IEdlbWluaSBQcm8gKDMtZGF5IGN5Y2xlIGVuZ2luZSlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICB7YXJ0LmlzUHVibGlzaGVkID8gKFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtdGVhbC00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBiZy10ZWFsLTk1MC82MCBweC0zIHB5LTEgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXRlYWwtNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICBPcHVibGlrb3dhbm8gdyBTZWtjamkgRkFRXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlUHVibGlzaChhcnQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+RG9kYWogZG8gRkFRIG5hIHN0cm9uaWU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBUYWIgQ29udGVudDogVHJlbmRzICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ3RyZW5kcycgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbWItMlwiPlxuICAgICAgICAgICAgUG9uacW8c3plIGZyYXp5IGtsdWN6b3dlIHPEhSBuaWV1c3Rhbm5pZSBza2Fub3dhbmUgcHJ6ZXogYWdlbnRhLiBXeWJpZXJhbmUgc8SFIHB5dGFuaWEgbyBuYWp3ecW8c3plaiBtYXLFvHkgcGFjamVudMOzdyBpIG5handpxJlrc3plaiBvYmrEmXRvxZtjaSB3eXN6dWtpd2HFhC5cbiAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1zbGF0ZS04MDAgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgb3ZlcmZsb3ctaGlkZGVuIHRleHQteHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtNCBwLTMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTQwMCBiZy1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4+U8WCb3dvIEtsdWN6b3dlPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj5XeXN6dWtpd2FuaWEgLyBtc2M8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPkVzdHltb3dhbnkgV3NrYcW6bmlrIFJPSTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+VHJ1ZG5vxZvEhyBTRU88L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0cmVuZGluZ0tleXdvcmRzLm1hcCgoaXRlbSwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTQgcC0zIHRleHQtc2xhdGUtMjAwIGl0ZW1zLWNlbnRlciBob3ZlcjpiZy1zbGF0ZS05MDAvNTBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1wdXJwbGUtMzAwIGZvbnQtbWVkaXVtXCI+e2l0ZW0ua2V5d29yZH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj57aXRlbS52b2x1bWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtdGVhbC0zMDAgZm9udC1zZW1pYm9sZFwiPntpdGVtLnJvaX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj57aXRlbS5kaWZmaWN1bHR5fTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBZ0hNLFNBd0JNLFVBeEJOO0FBaEhOLFNBQWdCLGdCQUEyQjtBQUUzQyxTQUFTLFVBQVUsWUFBWSxPQUFrQixjQUFjLGFBQWEsS0FBSyxVQUFVLE1BQU0sZUFBZTtBQWdCekcsYUFBTSxvQkFBc0QsQ0FBQyxFQUFFLGVBQWUsTUFBTTtBQUN6RixRQUFNLENBQUMsVUFBVSxXQUFXLElBQUksU0FBZ0M7QUFBQSxJQUM5RDtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osR0FBRztBQUFBLE1BQ0gsR0FBRztBQUFBLE1BQ0gsZUFBZTtBQUFBLE1BQ2YsY0FBYztBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsaUJBQWlCO0FBQUEsTUFDakIsYUFBYTtBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxJQUFJO0FBQUEsTUFDSixHQUFHO0FBQUEsTUFDSCxHQUFHO0FBQUEsTUFDSCxlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNq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