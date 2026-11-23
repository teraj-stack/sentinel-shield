import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { Smile, Sparkles, RefreshCw, ThumbsUp, Loader2, Plus, Quote } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
export const initialJokes = [
  {
    id: "joke-1",
    title: "Piekący Interes na Zebraniu",
    category: "Gabinety & Konsultacje",
    content: "Pacjent przychodzi do dr. Jana Bujoka z przejętą miną:\n— Panie doktorze, mam ogromny kłopot ze swoim interesem. Od tygodnia tak piecze, że nie jestem w stanie wysiedzieć na żadnym zebraniu!\nDr Bujok pyta rzeczowo:\n— Urologicznie czy proktologicznie?\nPacjent z powagą odpowiada:\n— Proktologicznie, panie doktorze! Chodzi o ten siedzący interes z tyłu!",
    likes: 42,
    author: "Anegdota z Gabinetu #1"
  },
  {
    id: "joke-2",
    title: "Zamknięcie Uciążliwego Interesu",
    category: "Laser LHP®",
    content: "Dwóch znajomych rozmawia w poczekalni CML w Wilanowie:\n— Co cię tu sprowadza?\n— A, idę do dr. Bujoka na laserowe LHP®. Trzeba wreszcie raz a dobrze zamknąć ten uciążliwy, nawracający interes!",
    likes: 38,
    author: "Rozmowa z Poczekalni"
  },
  {
    id: "joke-3",
    title: "Zyski z Nowego Interesu",
    category: "Po Zabiegu",
    content: "Pacjent wstał z fotela po 20-minutowym bezbolesnym zabiegu laserowym i pyta z uśmiechem:\n— Panie doktorze, a kiedy ten interes zacznie przynosić zyski w postaci normalnego siadania?\nDr Bujok odpowiada:\n— Już od jutra! Twój interes jest całkowicie zregenerowany, bezkrwawy i gotowy do pracy!",
    likes: 51,
    author: "Kliniczne Pogawędki"
  },
  {
    id: "joke-4",
    title: "Telefoniczne Zgłoszenie Problemów",
    category: "Rejestracja CML",
    content: "Dzwoni telefon w rejestracji CML:\n— Dzień dobry, chciałem pilnie zgłosić awarię interesu!\nRejestratorka dopytuje:\n— Zgłasza Pan problem urologiczny czy proktologiczny?\n— Proktologiczny! Ten interes z tyłu odmawia współpracy przy siedzeniu w fotelu!",
    likes: 29,
    author: "Anegdota z Rejestracji"
  },
  {
    id: "joke-5",
    title: "Laserowe Naświetlenie Interesu",
    category: "Procedura FiLaC®",
    content: "Przed zabiegiem przetoki metodą FiLaC® pacjent dopytuje dr. Bujoka:\n— Doktorze, czy ten laser nie uszkodzi mego interesu?\nDr Bujok uspokaja:\n— Skądże! Wiązka światłowodowa zamyka wyłącznie kanał przetoki od środka, oszczędzając zwieracze. Twój interes będzie bezpieczny jak w banku!",
    likes: 33,
    author: "Rozmowa Przedoperacyjna"
  }
];
export const ProctologyHumorSection = () => {
  const [jokes, setJokes] = useState(initialJokes);
  const [activeJokeIndex, setActiveJokeIndex] = useState(0);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [userJokeText, setUserJokeText] = useState("");
  const [userJokeTitle, setUserJokeTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const currentJoke = jokes[activeJokeIndex] || jokes[0];
  const handleNextRandom = () => {
    let nextIdx = Math.floor(Math.random() * jokes.length);
    if (nextIdx === activeJokeIndex) {
      nextIdx = (activeJokeIndex + 1) % jokes.length;
    }
    setActiveJokeIndex(nextIdx);
  };
  const handleLike = (id) => {
    setJokes(
      (prev) => prev.map((j) => j.id === id ? { ...j, likes: j.likes + 1 } : j)
    );
  };
  const handleGenerateAiJoke = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch("/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: 'Wygeneruj nową śmieszną anegdotę z gabinetu proktologa, w której pacjent używa słowa "interes" zamiast "odbyt".',
          mode: "proctology_jokes"
        })
      });
      const data = await res.json();
      const content = data.text || 'Pacjent przychodzi do gabinetu i mówi: "Doktorze, mój siedzący interes wymaga natychmiastowego laserowania!"';
      const newJokeItem = {
        id: `ai-joke-${Date.now()}`,
        title: "Generowany AI Humor z Gabinetu",
        category: "Anegdota Gemini AI",
        content,
        likes: 12,
        author: "Asystent AI Dr. Bujoka"
      };
      setJokes((prev) => [newJokeItem, ...prev]);
      setActiveJokeIndex(0);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };
  const handleAddUserJoke = (e) => {
    e.preventDefault();
    if (!userJokeText || !userJokeTitle) return;
    const newJoke = {
      id: `user-joke-${Date.now()}`,
      title: userJokeTitle,
      category: "Propozycja Pacjenta",
      content: userJokeText,
      likes: 1,
      author: "Wpis Pacjenta CML"
    };
    setJokes((prev) => [newJoke, ...prev]);
    setActiveJokeIndex(0);
    setUserJokeText("");
    setUserJokeTitle("");
    setShowAddForm(false);
  };
  return /* @__PURE__ */ jsxDEV("section", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto", id: "humor-proktologiczny", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/80 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-amber-500/30", children: [
        /* @__PURE__ */ jsxDEV(Smile, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
          fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
          lineNumber: 138,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Gabinet z Uśmiechem · Kultura Słowa" }, void 0, false, {
          fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
          lineNumber: 139,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-4xl font-normal text-slate-100 mb-3", children: "Humor Proktologiczny: Zasada „Siedzącego Interesu”" }, void 0, false, {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 141,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed", children: [
        "W naszej klinice szanujemy poczucie komfortu pacjentów. Przyjęła się u nas sympatyczna zasada: zamiast skrępowania i używania słów anatomicznych, rozmawiamy z uśmiechem o ",
        /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-300 font-semibold", children: "„interesie z tyłu”" }, void 0, false, {
          fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
          lineNumber: 145,
          columnNumber: 182
        }, this),
        "!"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 144,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
      lineNumber: 136,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl overflow-hidden mb-8 card-3d-tilt", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-10 -right-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "p-3 rounded-2xl bg-amber-950 text-amber-300 border border-amber-500/30", children: /* @__PURE__ */ jsxDEV(Quote, { className: "w-6 h-6 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 157,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 156,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] uppercase font-bold text-amber-400 block tracking-wider", children: currentJoke.category }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 160,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-bold text-slate-100 font-serif", children: currentJoke.title }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 163,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 159,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
          lineNumber: 155,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 italic", children: [
          "Zgłoszone przez: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-200", children: currentJoke.author }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 170,
            columnNumber: 30
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
          lineNumber: 169,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 154,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "my-6 min-h-[140px] flex items-center", children: /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base text-slate-200 font-light leading-relaxed whitespace-pre-line border-l-4 border-amber-500/50 pl-4 py-1", children: currentJoke.content }, void 0, false, {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 176,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 175,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => handleLike(currentJoke.id),
            className: "inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-200 text-xs font-semibold transition-all group",
            children: [
              /* @__PURE__ */ jsxDEV(ThumbsUp, { className: "w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 187,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Polub ten żart (",
                currentJoke.likes,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 188,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 183,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleGenerateAiJoke,
              disabled: isGeneratingAi,
              className: "btn-3d btn-3d-cyan px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5",
              children: isGeneratingAi ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Loader2, { className: "w-4 h-4 animate-spin" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                  lineNumber: 199,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Generowanie Gemini AI..." }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                  lineNumber: 200,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 198,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                  lineNumber: 204,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wygeneruj Nowy Żart AI" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                  lineNumber: 205,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 203,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 192,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleNextRandom,
              className: "btn-3d btn-3d-gold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                  lineNumber: 214,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Losuj Następna Anegdotę" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                  lineNumber: 215,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 210,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
          lineNumber: 191,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 182,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8", children: jokes.map((j, idx) => {
      const isActive = idx === activeJokeIndex;
      return /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveJokeIndex(idx),
          className: `p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${isActive ? "bg-amber-950/40 border-amber-500 shadow-lg ring-1 ring-amber-500/40" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-amber-400 font-semibold block mb-1", children: j.category }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 236,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-slate-100 mb-2 line-clamp-1", children: j.title }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 239,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 line-clamp-2 font-light leading-relaxed", children: j.content }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 242,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 235,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500", children: [
              /* @__PURE__ */ jsxDEV("span", { children: [
                "❤️ ",
                j.likes,
                " polubień"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 248,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-medium", children: "Czytaj więcej →" }, void 0, false, {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 249,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 247,
              columnNumber: 15
            }, this)
          ]
        },
        j.id,
        true,
        {
          fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
          lineNumber: 226,
          columnNumber: 13
        },
        this
      );
    }) }, void 0, false, {
      fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
      lineNumber: 222,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "text-center", children: !showAddForm ? /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setShowAddForm(true),
        className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all shadow-md",
        children: [
          /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 263,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dodaj Własny Żart z Motywem „Interesu”!" }, void 0, false, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 264,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 259,
        columnNumber: 11
      },
      this
    ) : /* @__PURE__ */ jsxDEV(
      "form",
      {
        onSubmit: handleAddUserJoke,
        className: "p-6 rounded-2xl bg-slate-900 border border-amber-500/30 text-left space-y-4 max-w-xl mx-auto shadow-2xl",
        children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-slate-100 text-sm flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Smile, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 272,
              columnNumber: 15
            }, this),
            "Dodaj zabawny dialog proktologiczny"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 271,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-xs text-slate-400 block mb-1", children: "Tytuł Anegdoty:" }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 277,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                required: true,
                value: userJokeTitle,
                onChange: (e) => setUserJokeTitle(e.target.value),
                placeholder: "np. Interes po Laserze LHP...",
                className: "w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-amber-400"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 278,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 276,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "text-xs text-slate-400 block mb-1", children: 'Treść Żartu (Pamiętaj o słowie "Interes"):' }, void 0, false, {
              fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
              lineNumber: 289,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "textarea",
              {
                required: true,
                rows: 3,
                value: userJokeText,
                onChange: (e) => setUserJokeText(e.target.value),
                placeholder: "Wpisz treść anegdoty...",
                className: "w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 outline-none focus:border-amber-400"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 292,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 288,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: () => setShowAddForm(false),
                className: "px-4 py-2 text-xs text-slate-400 hover:text-slate-200",
                children: "Anuluj"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 303,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "submit",
                className: "btn-3d btn-3d-gold px-5 py-2 rounded-xl text-xs",
                children: "Opublikuj Anegdotę"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
                lineNumber: 311,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
            lineNumber: 302,
            columnNumber: 13
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
        lineNumber: 267,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
      lineNumber: 257,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ProctologyHumorSection.tsx",
    lineNumber: 134,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2N0b2xvZ3lIdW1vclNlY3Rpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFNtaWxlLCBTcGFya2xlcywgUmVmcmVzaEN3LCBUaHVtYnNVcCwgTWVzc2FnZUNpcmNsZSwgSGVhcnRIYW5kc2hha2UsIFNoaWVsZENoZWNrLCBMb2FkZXIyLCBQbHVzLCBRdW90ZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSm9rZUl0ZW0ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBjYXRlZ29yeTogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG4gIGxpa2VzOiBudW1iZXI7XG4gIGF1dGhvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgaW5pdGlhbEpva2VzOiBKb2tlSXRlbVtdID0gW1xuICB7XG4gICAgaWQ6ICdqb2tlLTEnLFxuICAgIHRpdGxlOiAnUGlla8SFY3kgSW50ZXJlcyBuYSBaZWJyYW5pdScsXG4gICAgY2F0ZWdvcnk6ICdHYWJpbmV0eSAmIEtvbnN1bHRhY2plJyxcbiAgICBjb250ZW50OiAnUGFjamVudCBwcnp5Y2hvZHppIGRvIGRyLiBKYW5hIEJ1am9rYSB6IHByemVqxJl0xIUgbWluxIU6XFxu4oCUIFBhbmllIGRva3RvcnplLCBtYW0gb2dyb21ueSBrxYJvcG90IHplIHN3b2ltIGludGVyZXNlbS4gT2QgdHlnb2RuaWEgdGFrIHBpZWN6ZSwgxbxlIG5pZSBqZXN0ZW0gdyBzdGFuaWUgd3lzaWVkemllxIcgbmEgxbxhZG55bSB6ZWJyYW5pdSFcXG5EciBCdWpvayBweXRhIHJ6ZWN6b3dvOlxcbuKAlCBVcm9sb2dpY3puaWUgY3p5IHByb2t0b2xvZ2ljem5pZT9cXG5QYWNqZW50IHogcG93YWfEhSBvZHBvd2lhZGE6XFxu4oCUIFByb2t0b2xvZ2ljem5pZSwgcGFuaWUgZG9rdG9yemUhIENob2R6aSBvIHRlbiBzaWVkesSFY3kgaW50ZXJlcyB6IHR5xYJ1IScsXG4gICAgbGlrZXM6IDQyLFxuICAgIGF1dGhvcjogJ0FuZWdkb3RhIHogR2FiaW5ldHUgIzEnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdqb2tlLTInLFxuICAgIHRpdGxlOiAnWmFta25pxJljaWUgVWNpxIXFvGxpd2VnbyBJbnRlcmVzdScsXG4gICAgY2F0ZWdvcnk6ICdMYXNlciBMSFDCricsXG4gICAgY29udGVudDogJ0R3w7NjaCB6bmFqb215Y2ggcm96bWF3aWEgdyBwb2N6ZWthbG5pIENNTCB3IFdpbGFub3dpZTpcXG7igJQgQ28gY2nEmSB0dSBzcHJvd2FkemE/XFxu4oCUIEEsIGlkxJkgZG8gZHIuIEJ1am9rYSBuYSBsYXNlcm93ZSBMSFDCri4gVHJ6ZWJhIHdyZXN6Y2llIHJheiBhIGRvYnJ6ZSB6YW1rbsSFxIcgdGVuIHVjacSFxbxsaXd5LCBuYXdyYWNhasSFY3kgaW50ZXJlcyEnLFxuICAgIGxpa2VzOiAzOCxcbiAgICBhdXRob3I6ICdSb3ptb3dhIHogUG9jemVrYWxuaScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2pva2UtMycsXG4gICAgdGl0bGU6ICdaeXNraSB6IE5vd2VnbyBJbnRlcmVzdScsXG4gICAgY2F0ZWdvcnk6ICdQbyBaYWJpZWd1JyxcbiAgICBjb250ZW50OiAnUGFjamVudCB3c3RhxYIgeiBmb3RlbGEgcG8gMjAtbWludXRvd3ltIGJlemJvbGVzbnltIHphYmllZ3UgbGFzZXJvd3ltIGkgcHl0YSB6IHXFm21pZWNoZW06XFxu4oCUIFBhbmllIGRva3RvcnplLCBhIGtpZWR5IHRlbiBpbnRlcmVzIHphY3puaWUgcHJ6eW5vc2nEhyB6eXNraSB3IHBvc3RhY2kgbm9ybWFsbmVnbyBzaWFkYW5pYT9cXG5EciBCdWpvayBvZHBvd2lhZGE6XFxu4oCUIEp1xbwgb2QganV0cmEhIFR3w7NqIGludGVyZXMgamVzdCBjYcWCa293aWNpZSB6cmVnZW5lcm93YW55LCBiZXprcndhd3kgaSBnb3Rvd3kgZG8gcHJhY3khJyxcbiAgICBsaWtlczogNTEsXG4gICAgYXV0aG9yOiAnS2xpbmljem5lIFBvZ2F3xJlka2knLFxuICB9LFxuICB7XG4gICAgaWQ6ICdqb2tlLTQnLFxuICAgIHRpdGxlOiAnVGVsZWZvbmljem5lIFpnxYJvc3plbmllIFByb2JsZW3Ds3cnLFxuICAgIGNhdGVnb3J5OiAnUmVqZXN0cmFjamEgQ01MJyxcbiAgICBjb250ZW50OiAnRHp3b25pIHRlbGVmb24gdyByZWplc3RyYWNqaSBDTUw6XFxu4oCUIER6aWXFhCBkb2JyeSwgY2hjaWHFgmVtIHBpbG5pZSB6Z8WCb3NpxIcgYXdhcmnEmSBpbnRlcmVzdSFcXG5SZWplc3RyYXRvcmthIGRvcHl0dWplOlxcbuKAlCBaZ8WCYXN6YSBQYW4gcHJvYmxlbSB1cm9sb2dpY3pueSBjenkgcHJva3RvbG9naWN6bnk/XFxu4oCUIFByb2t0b2xvZ2ljem55ISBUZW4gaW50ZXJlcyB6IHR5xYJ1IG9kbWF3aWEgd3Nww7PFgnByYWN5IHByenkgc2llZHplbml1IHcgZm90ZWx1IScsXG4gICAgbGlrZXM6IDI5LFxuICAgIGF1dGhvcjogJ0FuZWdkb3RhIHogUmVqZXN0cmFjamknLFxuICB9LFxuICB7XG4gICAgaWQ6ICdqb2tlLTUnLFxuICAgIHRpdGxlOiAnTGFzZXJvd2UgTmHFm3dpZXRsZW5pZSBJbnRlcmVzdScsXG4gICAgY2F0ZWdvcnk6ICdQcm9jZWR1cmEgRmlMYUPCricsXG4gICAgY29udGVudDogJ1ByemVkIHphYmllZ2llbSBwcnpldG9raSBtZXRvZMSFIEZpTGFDwq4gcGFjamVudCBkb3B5dHVqZSBkci4gQnVqb2thOlxcbuKAlCBEb2t0b3J6ZSwgY3p5IHRlbiBsYXNlciBuaWUgdXN6a29kemkgbWVnbyBpbnRlcmVzdT9cXG5EciBCdWpvayB1c3Bva2FqYTpcXG7igJQgU2vEhWTFvGUhIFdpxIV6a2EgxZt3aWF0xYJvd29kb3dhIHphbXlrYSB3ecWCxIVjem5pZSBrYW5hxYIgcHJ6ZXRva2kgb2QgxZtyb2RrYSwgb3N6Y3rEmWR6YWrEhWMgendpZXJhY3plLiBUd8OzaiBpbnRlcmVzIGLEmWR6aWUgYmV6cGllY3pueSBqYWsgdyBiYW5rdSEnLFxuICAgIGxpa2VzOiAzMyxcbiAgICBhdXRob3I6ICdSb3ptb3dhIFByemVkb3BlcmFjeWpuYScsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgUHJvY3RvbG9neUh1bW9yU2VjdGlvbjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtqb2tlcywgc2V0Sm9rZXNdID0gdXNlU3RhdGU8Sm9rZUl0ZW1bXT4oaW5pdGlhbEpva2VzKTtcbiAgY29uc3QgW2FjdGl2ZUpva2VJbmRleCwgc2V0QWN0aXZlSm9rZUluZGV4XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBbaXNHZW5lcmF0aW5nQWksIHNldElzR2VuZXJhdGluZ0FpXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3VzZXJKb2tlVGV4dCwgc2V0VXNlckpva2VUZXh0XSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3VzZXJKb2tlVGl0bGUsIHNldFVzZXJKb2tlVGl0bGVdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc2hvd0FkZEZvcm0sIHNldFNob3dBZGRGb3JtXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBjdXJyZW50Sm9rZSA9IGpva2VzW2FjdGl2ZUpva2VJbmRleF0gfHwgam9rZXNbMF07XG5cbiAgY29uc3QgaGFuZGxlTmV4dFJhbmRvbSA9ICgpID0+IHtcbiAgICBsZXQgbmV4dElkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGpva2VzLmxlbmd0aCk7XG4gICAgaWYgKG5leHRJZHggPT09IGFjdGl2ZUpva2VJbmRleCkge1xuICAgICAgbmV4dElkeCA9IChhY3RpdmVKb2tlSW5kZXggKyAxKSAlIGpva2VzLmxlbmd0aDtcbiAgICB9XG4gICAgc2V0QWN0aXZlSm9rZUluZGV4KG5leHRJZHgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUxpa2UgPSAoaWQ6IHN0cmluZykgPT4ge1xuICAgIHNldEpva2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKGopID0+IChqLmlkID09PSBpZCA/IHsgLi4uaiwgbGlrZXM6IGoubGlrZXMgKyAxIH0gOiBqKSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUdlbmVyYXRlQWlKb2tlID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldElzR2VuZXJhdGluZ0FpKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCgnL2FwaS9haS9jb25zdWx0Jywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgaGVhZGVyczogeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICBxdWVyeTogJ1d5Z2VuZXJ1aiBub3fEhSDFm21pZXN6bsSFIGFuZWdkb3TEmSB6IGdhYmluZXR1IHByb2t0b2xvZ2EsIHcga3TDs3JlaiBwYWNqZW50IHXFvHl3YSBzxYJvd2EgXCJpbnRlcmVzXCIgemFtaWFzdCBcIm9kYnl0XCIuJyxcbiAgICAgICAgICBtb2RlOiAncHJvY3RvbG9neV9qb2tlcycsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkYXRhLnRleHQgfHwgJ1BhY2plbnQgcHJ6eWNob2R6aSBkbyBnYWJpbmV0dSBpIG3Ds3dpOiBcIkRva3RvcnplLCBtw7NqIHNpZWR6xIVjeSBpbnRlcmVzIHd5bWFnYSBuYXR5Y2htaWFzdG93ZWdvIGxhc2Vyb3dhbmlhIVwiJztcblxuICAgICAgY29uc3QgbmV3Sm9rZUl0ZW06IEpva2VJdGVtID0ge1xuICAgICAgICBpZDogYGFpLWpva2UtJHtEYXRlLm5vdygpfWAsXG4gICAgICAgIHRpdGxlOiAnR2VuZXJvd2FueSBBSSBIdW1vciB6IEdhYmluZXR1JyxcbiAgICAgICAgY2F0ZWdvcnk6ICdBbmVnZG90YSBHZW1pbmkgQUknLFxuICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICBsaWtlczogMTIsXG4gICAgICAgIGF1dGhvcjogJ0FzeXN0ZW50IEFJIERyLiBCdWpva2EnLFxuICAgICAgfTtcblxuICAgICAgc2V0Sm9rZXMoKHByZXYpID0+IFtuZXdKb2tlSXRlbSwgLi4ucHJldl0pO1xuICAgICAgc2V0QWN0aXZlSm9rZUluZGV4KDApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0dlbmVyYXRpbmdBaShmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUFkZFVzZXJKb2tlID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXVzZXJKb2tlVGV4dCB8fCAhdXNlckpva2VUaXRsZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgbmV3Sm9rZTogSm9rZUl0ZW0gPSB7XG4gICAgICBpZDogYHVzZXItam9rZS0ke0RhdGUubm93KCl9YCxcbiAgICAgIHRpdGxlOiB1c2VySm9rZVRpdGxlLFxuICAgICAgY2F0ZWdvcnk6ICdQcm9wb3p5Y2phIFBhY2plbnRhJyxcbiAgICAgIGNvbnRlbnQ6IHVzZXJKb2tlVGV4dCxcbiAgICAgIGxpa2VzOiAxLFxuICAgICAgYXV0aG9yOiAnV3BpcyBQYWNqZW50YSBDTUwnLFxuICAgIH07XG5cbiAgICBzZXRKb2tlcygocHJldikgPT4gW25ld0pva2UsIC4uLnByZXZdKTtcbiAgICBzZXRBY3RpdmVKb2tlSW5kZXgoMCk7XG4gICAgc2V0VXNlckpva2VUZXh0KCcnKTtcbiAgICBzZXRVc2VySm9rZVRpdGxlKCcnKTtcbiAgICBzZXRTaG93QWRkRm9ybShmYWxzZSk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0xNiBweC00IHNtOnB4LTYgbGc6cHgtOCBtYXgtdy01eGwgbXgtYXV0b1wiIGlkPVwiaHVtb3ItcHJva3RvbG9naWN6bnlcIj5cbiAgICAgIHsvKiBTZWN0aW9uIEhlYWRlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0xLjUgcm91bmRlZC1mdWxsIGJnLWFtYmVyLTk1MC84MCB0ZXh0LWFtYmVyLTMwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIG1iLTMgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzBcIj5cbiAgICAgICAgICA8U21pbGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgPHNwYW4+R2FiaW5ldCB6IFXFm21pZWNoZW0gwrcgS3VsdHVyYSBTxYJvd2E8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBzbTp0ZXh0LTR4bCBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTEwMCBtYi0zXCI+XG4gICAgICAgICAgSHVtb3IgUHJva3RvbG9naWN6bnk6IFphc2FkYSDigJ5TaWVkesSFY2VnbyBJbnRlcmVzdeKAnVxuICAgICAgICA8L2gyPlxuICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS00MDAgbWF4LXctMnhsIG14LWF1dG8gbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgVyBuYXN6ZWoga2xpbmljZSBzemFudWplbXkgcG9jenVjaWUga29tZm9ydHUgcGFjamVudMOzdy4gUHJ6eWrEmcWCYSBzacSZIHUgbmFzIHN5bXBhdHljem5hIHphc2FkYTogemFtaWFzdCBza3LEmXBvd2FuaWEgaSB1xbx5d2FuaWEgc8WCw7N3IGFuYXRvbWljem55Y2gsIHJvem1hd2lhbXkgeiB1xZttaWVjaGVtIG8gPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTMwMCBmb250LXNlbWlib2xkXCI+4oCeaW50ZXJlc2llIHogdHnFgnXigJ08L3N0cm9uZz4hXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBKb2tlIENhcmQgd2l0aCAzRCBUYWN0aWxlIFN0eWxpbmcgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHAtNiBzbTpwLTggcm91bmRlZC0zeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIHNoYWRvdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIG1iLTggY2FyZC0zZC10aWx0XCI+XG4gICAgICAgIHsvKiBCYWNrZ3JvdW5kIFN1YnRsZSBHbG93ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMTAgLXJpZ2h0LTEwIHctNjAgaC02MCBiZy1hbWJlci01MDAvMTAgcm91bmRlZC1mdWxsIGJsdXItM3hsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHBiLTYgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLTJ4bCBiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzBcIj5cbiAgICAgICAgICAgICAgPFF1b3RlIGNsYXNzTmFtZT1cInctNiBoLTYgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdXBwZXJjYXNlIGZvbnQtYm9sZCB0ZXh0LWFtYmVyLTQwMCBibG9jayB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgIHtjdXJyZW50Sm9rZS5jYXRlZ29yeX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBzbTp0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMCBmb250LXNlcmlmXCI+XG4gICAgICAgICAgICAgICAge2N1cnJlbnRKb2tlLnRpdGxlfVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGl0YWxpY1wiPlxuICAgICAgICAgICAgWmfFgm9zem9uZSBwcnplejogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMFwiPntjdXJyZW50Sm9rZS5hdXRob3J9PC9zdHJvbmc+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogSm9rZSBDb250ZW50IERpc3BsYXkgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXktNiBtaW4taC1bMTQwcHhdIGZsZXggaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSBzbTp0ZXh0LWJhc2UgdGV4dC1zbGF0ZS0yMDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWQgd2hpdGVzcGFjZS1wcmUtbGluZSBib3JkZXItbC00IGJvcmRlci1hbWJlci01MDAvNTAgcGwtNCBweS0xXCI+XG4gICAgICAgICAgICB7Y3VycmVudEpva2UuY29udGVudH1cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDYXJkIEFjdGlvbnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVMaWtlKGN1cnJlbnRKb2tlLmlkKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMjAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBncm91cFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFRodW1ic1VwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDAgZ3JvdXAtaG92ZXI6c2NhbGUtMTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlBvbHViIHRlbiDFvGFydCAoe2N1cnJlbnRKb2tlLmxpa2VzfSk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUdlbmVyYXRlQWlKb2tlfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNHZW5lcmF0aW5nQWl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi0zZCBidG4tM2QtY3lhbiBweC00IHB5LTIuNSByb3VuZGVkLXhsIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpc0dlbmVyYXRpbmdBaSA/IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPExvYWRlcjIgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+R2VuZXJvd2FuaWUgR2VtaW5pIEFJLi4uPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5XeWdlbmVydWogTm93eSDFu2FydCBBSTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU5leHRSYW5kb219XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi0zZCBidG4tM2QtZ29sZCBweC01IHB5LTIuNSByb3VuZGVkLXhsIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Mb3N1aiBOYXN0xJlwbmEgQW5lZ2RvdMSZPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBHcmlkIG9mIEFsbCBKb2tlcyBUaHVtYm5haWxzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy0zIGdhcC00IG1iLThcIj5cbiAgICAgICAge2pva2VzLm1hcCgoaiwgaWR4KSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IGFjdGl2ZUpva2VJbmRleDtcbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBrZXk9e2ouaWR9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZUpva2VJbmRleChpZHgpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTQgcm91bmRlZC0yeGwgdGV4dC1sZWZ0IGJvcmRlciB0cmFuc2l0aW9uLWFsbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiAke1xuICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAvNDAgYm9yZGVyLWFtYmVyLTUwMCBzaGFkb3ctbGcgcmluZy0xIHJpbmctYW1iZXItNTAwLzQwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzYwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1hbWJlci00MDAgZm9udC1zZW1pYm9sZCBibG9jayBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICB7ai5jYXRlZ29yeX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwIG1iLTIgbGluZS1jbGFtcC0xXCI+XG4gICAgICAgICAgICAgICAgICB7ai50aXRsZX1cbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxpbmUtY2xhbXAtMiBmb250LWxpZ2h0IGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAge2ouY29udGVudH1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+4p2k77iPIHtqLmxpa2VzfSBwb2x1YmllxYQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1tZWRpdW1cIj5Denl0YWogd2nEmWNlaiDihpI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKTtcbiAgICAgICAgfSl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEFkZCBVc2VyJ3MgT3duIFwiSW50ZXJlc1wiIEpva2UgVHJpZ2dlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgeyFzaG93QWRkRm9ybSA/IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93QWRkRm9ybSh0cnVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC01IHB5LTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItYW1iZXItNTAwLzQwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgdGV4dC14cyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1tZFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Eb2RhaiBXxYJhc255IMW7YXJ0IHogTW90eXdlbSDigJ5JbnRlcmVzdeKAnSE8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgIG9uU3VibWl0PXtoYW5kbGVBZGRVc2VySm9rZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvMzAgdGV4dC1sZWZ0IHNwYWNlLXktNCBtYXgtdy14bCBteC1hdXRvIHNoYWRvdy0yeGxcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS0xMDAgdGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8U21pbGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgIERvZGFqIHphYmF3bnkgZGlhbG9nIHByb2t0b2xvZ2ljem55XG4gICAgICAgICAgICA8L2g0PlxuXG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBibG9jayBtYi0xXCI+VHl0dcWCIEFuZWdkb3R5OjwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIHZhbHVlPXt1c2VySm9rZVRpdGxlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXNlckpva2VUaXRsZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJucC4gSW50ZXJlcyBwbyBMYXNlcnplIExIUC4uLlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgb3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1hbWJlci00MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGJsb2NrIG1iLTFcIj5cbiAgICAgICAgICAgICAgICBUcmXFm8SHIMW7YXJ0dSAoUGFtacSZdGFqIG8gc8WCb3dpZSBcIkludGVyZXNcIik6XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgcm93cz17M31cbiAgICAgICAgICAgICAgICB2YWx1ZT17dXNlckpva2VUZXh0fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VXNlckpva2VUZXh0KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIldwaXN6IHRyZcWbxIcgYW5lZ2RvdHkuLi5cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItYW1iZXItNDAwXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kIGdhcC0zIHB0LTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dBZGRGb3JtKGZhbHNlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBBbnVsdWpcbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi0zZCBidG4tM2QtZ29sZCBweC01IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIE9wdWJsaWt1aiBBbmVnZG90xJlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUF5SVUsU0E0RE0sVUE1RE47QUF6SVYsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsT0FBTyxVQUFVLFdBQVcsVUFBc0QsU0FBUyxNQUFNLGFBQWE7QUFZaEgsYUFBTSxlQUEyQjtBQUFBLEVBQ3RDO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEs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