import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MessageSquareQuote,
  Sparkles,
  ThumbsUp,
  X,
  Award,
  ArrowRight,
  Pause,
  Play
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion, AnimatePresence } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
const TESTIMONIALS_DATA = [
  {
    id: "t-1",
    name: "Marek K.",
    age: 44,
    location: "Bielsko-Biała",
    procedure: "LHP",
    procedureLabel: "Laserowe Leczenie Hemoroidów LHP®",
    date: "Luty 2026",
    rating: 5,
    headline: "Bałem się zabiegu przez lata, a po 2 dniach wróciłem do pełnej aktywności",
    testimonialText: "Z problemem nawracających hemoroidów III stopnia zmagałem się prawie 6 lat. Unikałem chirurga ze strachu przed bolesną operacją. Dr Jan Bujok zaproponował bezwycięciową metodę laserową LHP. Zabieg w znieczuleniu miejscowym trwał 25 minut. Następnego dnia byłem w domu, a po 48 godzinach pracowałem bez żadnych leków przeciwbólowych. Pełen profesjonalizm i niesamowita ulga.",
    doctorComment: "Zastosowaliśmy światłowód radialny Biolitec 1470nm, co pozwoliło precyzyjnie zamknąć naczynia bez uszkadzania zwieraczy i śluzówki. Efekt anatomiczny idealny.",
    recoveryDays: "2 dni",
    painBefore: 9,
    painAfter: 1,
    verifiedSource: "Weryfikowana wizyta · ZnanyLekarz.pl",
    helpfulCount: 42,
    tags: ["Bez szwów", "Powrót do pracy 48h", "Brak bolesnych opatrunków"]
  },
  {
    id: "t-2",
    name: "Katarzyna W.",
    age: 36,
    location: "Katowice",
    procedure: "FiLaC",
    procedureLabel: "Laserowe Zamknięcie Przetoki FiLaC®",
    date: "Styczeń 2026",
    rating: 5,
    headline: "Oszczędzenie zwieraczy było dla mnie kluczowe – dr Bujok wykonał cud",
    testimonialText: "Diagnoza przetoki odbytu była dla mnie szokiem. Inni chirurdzy straszyli mnie przecięciem zwieraczy i powikłaniami. Dr Bujok wyjaśnił mi metodę FiLaC®. Laser wyczyścił i zamknął kanał przetoki od środka bez wycinania tkanek. Dzisiaj, po 3 miesiącach od kontroli, nie ma żadnego śladu ani nawrotu. Najlepsza klinika proktologiczna na Śląsku!",
    doctorComment: "Przetoka podśluzowa została wykoagulowana elastyczną sondą radialną. Funkcje zwieracza zachowane w 100%.",
    recoveryDays: "3 dni",
    painBefore: 8,
    painAfter: 0,
    verifiedSource: "Potwierdzony pacjent CML",
    helpfulCount: 38,
    tags: ["Ochrona zwieraczy", "Brak ran chirurgicznych", "Pełne wyleczenie"]
  },
  {
    id: "t-3",
    name: "Piotr R.",
    age: 52,
    location: "Cieszyn",
    procedure: "SiLaC",
    procedureLabel: "Laserowe Usuwanie Torbieli SiLaC®",
    date: "Grudzień 2025",
    rating: 5,
    headline: "Szybkie usunięcie torbieli kości guzicznej bez długiego gojenia rany",
    testimonialText: "Tradycyjne operacje torbieli włosowej wiążą się z otwartą raną przez 2 miesiące. Dzięki zabiegowi SiLaC® u dr. Bujoka kanał został zamknięty światłem lasera. Zero sączków, zero sączenia. Rana zagoiła się w tydzień. Polecam każdemu, kto ceni swój czas i brak bólu.",
    doctorComment: "Metoda SiLaC ogranicza nawroty torbieli kości guzicznej z 25% (chirurgia tradycyjna) do poniżej 3%.",
    recoveryDays: "2 dni",
    painBefore: 7,
    painAfter: 1,
    verifiedSource: "Weryfikowana wizyta · Google Reviews",
    helpfulCount: 29,
    tags: ["Niskie ryzyko nawrotu", "Krótka rekonwalescencja", "Zabieg jednodniowy"]
  },
  {
    id: "t-4",
    name: "Ewa M.",
    age: 41,
    location: "Żywiec",
    procedure: "Fissure",
    procedureLabel: "Laserowa Plastyka Szczeliny Odbytu",
    date: "Listopad 2025",
    rating: 5,
    headline: "Koniec z przewlekłym bólem przy wypróżnianiu – dziękuję!",
    testimonialText: "Szczelina odbytu doprowadziła mnie na skraj wyczerpania psychicznego. Każde wypróżnienie to był ból trwający godzinami. Po delikatnym zabiegu laserowym u dr. Jana Bujoka ból ustał dosłownie z dnia na dzień. Żałuję tylko jednego – że nie trafiłam do CML pół roku wcześniej!",
    doctorComment: "Wyeliminowaliśmy skurcz zwieracza wewnętrznego poprzez fotodysrupcję laserową bez nacinania mięśnia.",
    recoveryDays: "1 dzień",
    painBefore: 10,
    painAfter: 0,
    verifiedSource: "Weryfikowana wizyta · ZnanyLekarz.pl",
    helpfulCount: 51,
    tags: ["Natychmiastowa ulga", "Bez nacinania mięśni", "Delikatna procedura"]
  },
  {
    id: "t-5",
    name: "Tomasz B.",
    age: 48,
    location: "Tychy",
    procedure: "LHP",
    procedureLabel: "Laserowe Leczenie Hemoroidów LHP®",
    date: "Styczeń 2026",
    rating: 5,
    headline: "Pełny komfort, empatia i kliniczne podejście na najwyższym poziomie",
    testimonialText: "Wsparcie i empatia dr. Bujoka oraz całego zespołu w CML przerosły moje oczekiwania. Badanie anoskopowe było bezbolesne, a sam zabieg LHP minął błyskawicznie. Bardzo doceniam dedykowany zestaw pooperacyjny oraz bezpośredni kontakt z kliniką po zabiegu.",
    doctorComment: "Zastosowano podwójny promień światłowodu LHP 1470nm przy hemoroidach IV stopnia z resekcją fałdów anodermy.",
    recoveryDays: "3 dni",
    painBefore: 8,
    painAfter: 1,
    verifiedSource: "Potwierdzony pacjent CML",
    helpfulCount: 33,
    tags: ["Struktura IV stopnia", "Stały kontakt z dr. Bujokiem", "Kompleksowy pakiet"]
  }
];
export const PatientTestimonials = () => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [helpfulMap, setHelpfulMap] = useState({});
  const [selectedStoryModal, setSelectedStoryModal] = useState(null);
  const filteredTestimonials = TESTIMONIALS_DATA.filter((t) => {
    if (selectedFilter === "ALL") return true;
    return t.procedure === selectedFilter;
  });
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilter]);
  useEffect(() => {
    if (!isAutoplay || filteredTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6e3);
    return () => clearInterval(interval);
  }, [isAutoplay, filteredTestimonials.length]);
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };
  const handleHelpfulClick = (id, initialCount) => {
    setHelpfulMap((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1
    }));
  };
  const activeItem = filteredTestimonials[currentIndex] || filteredTestimonials[0];
  return /* @__PURE__ */ jsxDEV("section", { className: "py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto", id: "historie-pacjentow", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl relative overflow-hidden text-slate-900", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 w-96 h-96 bg-purple-100/70 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
        lineNumber: 197,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-slate-200 pb-6", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-3", children: [
            /* @__PURE__ */ jsxDEV(MessageSquareQuote, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 203,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Weryfikowane Historie Sukcesu CML" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 204,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 202,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-slate-900", children: "Karuzela Opinii & Relacji Pacjentów" }, void 0, false, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 206,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-600 font-normal mt-1 max-w-xl", children: "Zobacz autentyczne świadectwa osób, które odzyskały komfort życia dzięki mikroinwazyjnym procedurom laserowym dr. Jana Bujoka." }, void 0, false, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 209,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PatientTestimonials.tsx",
          lineNumber: 201,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 shrink-0 shadow-sm", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center p-2 rounded-xl bg-purple-600 text-white font-bold", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-serif", children: "4.98" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 217,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] uppercase font-mono tracking-tighter", children: "/ 5.0" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 218,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 216,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-amber-400 mb-1", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxDEV(Star, { className: "w-4 h-4 fill-amber-400 stroke-amber-500" }, i, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 223,
              columnNumber: 19
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 221,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-800 block", children: "340+ zweryfikowanych zabiegów" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 226,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-500", children: "99.2% pacjentów poleca CML" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 227,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 220,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PatientTestimonials.tsx",
          lineNumber: 215,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200", children: [
          { id: "ALL", label: "Wszystkie Procedury" },
          { id: "LHP", label: "Hemoroidy (LHP®)" },
          { id: "FiLaC", label: "Przetoka (FiLaC®)" },
          { id: "SiLaC", label: "Torbiel (SiLaC®)" },
          { id: "Fissure", label: "Szczelina Odbytu" }
        ].map((tab) => /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedFilter(tab.id),
            className: `px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${selectedFilter === tab.id ? "bg-purple-600 text-white shadow-md shadow-purple-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"}`,
            children: tab.label
          },
          tab.id,
          false,
          {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 242,
            columnNumber: 15
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/PatientTestimonials.tsx",
          lineNumber: 234,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsAutoplay(!isAutoplay),
              className: `p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${isAutoplay ? "bg-purple-50 border-purple-200 text-purple-700" : "bg-white border-slate-200 text-slate-500"}`,
              title: isAutoplay ? "Wstrzymaj autoodtwarzanie" : "Włącz autoodtwarzanie",
              children: [
                isAutoplay ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 267,
                  columnNumber: 29
                }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 267,
                  columnNumber: 65
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] hidden sm:inline", children: isAutoplay ? "Autoplay" : "Pauza" }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 268,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 258,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handlePrev,
              className: "p-2.5 rounded-xl bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-700 transition-all border border-slate-200 shadow-sm",
              "aria-label": "Poprzednia opinia",
              children: /* @__PURE__ */ jsxDEV(ChevronLeft, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 276,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 271,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-600 px-2 font-mono", children: [
            currentIndex + 1,
            " / ",
            filteredTestimonials.length
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 279,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleNext,
              className: "p-2.5 rounded-xl bg-slate-100 hover:bg-purple-600 hover:text-white text-slate-700 transition-all border border-slate-200 shadow-sm",
              "aria-label": "Następna opinia",
              children: /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 288,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 283,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PatientTestimonials.tsx",
          lineNumber: 257,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
        lineNumber: 233,
        columnNumber: 9
      }, this),
      activeItem && /* @__PURE__ */ jsxDEV("div", { className: "relative", children: /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.35, ease: "easeOut" },
          className: "grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 relative shadow-md",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-6 space-y-4", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-md shadow-purple-600/20 shrink-0", children: activeItem.name.slice(0, 2) }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 310,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("h3", { className: "font-bold text-slate-900 text-base", children: activeItem.name }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                      lineNumber: 315,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 font-medium", children: [
                      activeItem.age,
                      " lat · ",
                      activeItem.location
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                      lineNumber: 316,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 314,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 308,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold mb-3", children: [
                  /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-600" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 323,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: activeItem.verifiedSource }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 324,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 322,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-amber-400 mb-3", children: [...Array(activeItem.rating)].map((_, i) => /* @__PURE__ */ jsxDEV(Star, { className: "w-4 h-4 fill-amber-400 stroke-amber-500" }, i, false, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 329,
                  columnNumber: 25
                }, this)) }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 327,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "block text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100/80 px-3 py-1.5 rounded-xl border border-purple-200/60 w-fit mb-2", children: activeItem.procedureLabel }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 333,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400 font-mono block", children: [
                  "Data: ",
                  activeItem.date
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 337,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 307,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 pt-4 border-t border-slate-200/80", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-600 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxDEV(Clock, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                      lineNumber: 344,
                      columnNumber: 25
                    }, this),
                    "Czas powrotu:"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 343,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-slate-900 bg-white px-2 py-0.5 rounded-lg border border-slate-200", children: [
                    "~",
                    activeItem.recoveryDays
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 347,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 342,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-600", children: "Spadek bólu (skala 0-10):" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 353,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200", children: [
                    activeItem.painBefore,
                    "/10 → ",
                    activeItem.painAfter,
                    "/10"
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 354,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 352,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 341,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 306,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 flex flex-col justify-between space-y-4", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("h4", { className: "font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug mb-3", children: [
                  "„",
                  activeItem.headline,
                  "”"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 364,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic mb-4", children: activeItem.testimonialText }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 368,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 mb-4", children: activeItem.tags.map((tag, idx) => /* @__PURE__ */ jsxDEV(
                  "span",
                  {
                    className: "px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-medium flex items-center gap-1 shadow-2xs",
                    children: [
                      /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3 text-purple-600" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                        lineNumber: 379,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: tag }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                        lineNumber: 380,
                        columnNumber: 27
                      }, this)
                    ]
                  },
                  idx,
                  true,
                  {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 375,
                    columnNumber: 25
                  },
                  this
                )) }, void 0, false, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 373,
                  columnNumber: 21
                }, this),
                activeItem.doctorComment && /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs text-slate-800 flex items-start gap-2.5", children: [
                  /* @__PURE__ */ jsxDEV(Award, { className: "w-4 h-4 text-purple-600 shrink-0 mt-0.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 388,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-purple-900 block mb-0.5", children: "Komentarz Kliniczny dr. Jana Bujoka:" }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                      lineNumber: 390,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-700 leading-snug", children: activeItem.doctorComment }, void 0, false, {
                      fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                      lineNumber: 391,
                      columnNumber: 27
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 389,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                  lineNumber: 387,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 363,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleHelpfulClick(activeItem.id, activeItem.helpfulCount),
                    className: "px-3.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-slate-700 hover:text-purple-800 font-medium transition-all flex items-center gap-1.5 shadow-2xs",
                    children: [
                      /* @__PURE__ */ jsxDEV(ThumbsUp, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                        lineNumber: 403,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Pomocna opinia" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                        lineNumber: 404,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "font-bold font-mono text-purple-700", children: [
                        "(",
                        helpfulMap[activeItem.id] ?? activeItem.helpfulCount,
                        ")"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                        lineNumber: 405,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 399,
                    columnNumber: 21
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setSelectedStoryModal(activeItem),
                    className: "px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-all flex items-center gap-1.5 shadow-sm",
                    children: [
                      /* @__PURE__ */ jsxDEV("span", { children: "Zobacz Studium Przypadku" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                        lineNumber: 414,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                        lineNumber: 415,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                    lineNumber: 410,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 398,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 362,
              columnNumber: 17
            }, this)
          ]
        },
        activeItem.id,
        true,
        {
          fileName: "/app/applet/src/components/PatientTestimonials.tsx",
          lineNumber: 297,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
        lineNumber: 296,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
        lineNumber: 295,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-center gap-2 mt-6", children: filteredTestimonials.map((_, idx) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setCurrentIndex(idx),
          className: `h-2.5 rounded-full transition-all ${currentIndex === idx ? "w-8 bg-purple-600" : "w-2.5 bg-slate-300 hover:bg-slate-400"}`,
          "aria-label": `Przejdź do opinii ${idx + 1}`
        },
        idx,
        false,
        {
          fileName: "/app/applet/src/components/PatientTestimonials.tsx",
          lineNumber: 427,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
        lineNumber: 425,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PatientTestimonials.tsx",
      lineNumber: 195,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: selectedStoryModal && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4", children: /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        className: "w-full max-w-2xl bg-white rounded-3xl border border-purple-200 shadow-2xl overflow-hidden p-6 sm:p-8 text-slate-900 relative max-h-[90vh] overflow-y-auto",
        children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedStoryModal(null),
              className: "absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all",
              children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 455,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 451,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider w-fit mb-3", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 459,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Kliniczne Studium Przypadku CML" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 460,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 458,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-xl sm:text-2xl font-bold text-slate-900 mb-2", children: [
            selectedStoryModal.name,
            " — ",
            selectedStoryModal.procedureLabel
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 463,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-500 font-medium mb-4", children: [
            "Wiek: ",
            selectedStoryModal.age,
            " lat · Miejscowość: ",
            selectedStoryModal.location,
            " · ",
            selectedStoryModal.verifiedSource
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 466,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-purple-50 border border-purple-200 mb-6", children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-xs uppercase tracking-wider text-purple-900 mb-1", children: "Podsumowanie Efektu Zabiegowego:" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 471,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-800 leading-relaxed font-medium", children: [
              "„",
              selectedStoryModal.headline,
              "”"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 474,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 470,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed mb-6", children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-slate-900 uppercase tracking-wider text-xs", children: "Pełny Opis Historii Pacjenta:" }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 480,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { children: selectedStoryModal.testimonialText }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 483,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 479,
            columnNumber: 15
          }, this),
          selectedStoryModal.doctorComment && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 mb-6", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2", children: [
              /* @__PURE__ */ jsxDEV(Award, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 489,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Komentarz dr. n. med. Jana Bujoka" }, void 0, false, {
                fileName: "/app/applet/src/components/PatientTestimonials.tsx",
                lineNumber: 490,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 488,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed", children: selectedStoryModal.doctorComment }, void 0, false, {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 492,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 487,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-slate-200 flex justify-end", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedStoryModal(null),
              className: "px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-md transition-all",
              children: "Zamknij Okno"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PatientTestimonials.tsx",
              lineNumber: 497,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/PatientTestimonials.tsx",
            lineNumber: 496,
            columnNumber: 15
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/PatientTestimonials.tsx",
        lineNumber: 445,
        columnNumber: 13
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/PatientTestimonials.tsx",
      lineNumber: 444,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/PatientTestimonials.tsx",
      lineNumber: 442,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PatientTestimonials.tsx",
    lineNumber: 194,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhdGllbnRUZXN0aW1vbmlhbHMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtcbiAgU3RhcixcbiAgQ2hldnJvbkxlZnQsXG4gIENoZXZyb25SaWdodCxcbiAgU2hpZWxkQ2hlY2ssXG4gIENoZWNrQ2lyY2xlMixcbiAgQ2xvY2ssXG4gIEhlYXJ0LFxuICBNZXNzYWdlU3F1YXJlUXVvdGUsXG4gIFNwYXJrbGVzLFxuICBVc2VyQ2hlY2ssXG4gIFRodW1ic1VwLFxuICBYLFxuICBBd2FyZCxcbiAgQXJyb3dSaWdodCxcbiAgUGF1c2UsXG4gIFBsYXksXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGF0aWVudFRlc3RpbW9uaWFsIHtcbiAgaWQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBhZ2U6IG51bWJlcjtcbiAgbG9jYXRpb246IHN0cmluZztcbiAgcHJvY2VkdXJlOiAnTEhQJyB8ICdGaUxhQycgfCAnU2lMYUMnIHwgJ0Zpc3N1cmUnO1xuICBwcm9jZWR1cmVMYWJlbDogc3RyaW5nO1xuICBkYXRlOiBzdHJpbmc7XG4gIHJhdGluZzogbnVtYmVyO1xuICBoZWFkbGluZTogc3RyaW5nO1xuICB0ZXN0aW1vbmlhbFRleHQ6IHN0cmluZztcbiAgZG9jdG9yQ29tbWVudD86IHN0cmluZztcbiAgcmVjb3ZlcnlEYXlzOiBzdHJpbmc7XG4gIHBhaW5CZWZvcmU6IG51bWJlcjsgLy8gMC0xMFxuICBwYWluQWZ0ZXI6IG51bWJlcjsgLy8gMC0xMFxuICB2ZXJpZmllZFNvdXJjZTogc3RyaW5nO1xuICBoZWxwZnVsQ291bnQ6IG51bWJlcjtcbiAgdGFnczogc3RyaW5nW107XG59XG5cbmNvbnN0IFRFU1RJTU9OSUFMU19EQVRBOiBQYXRpZW50VGVzdGltb25pYWxbXSA9IFtcbiAge1xuICAgIGlkOiAndC0xJyxcbiAgICBuYW1lOiAnTWFyZWsgSy4nLFxuICAgIGFnZTogNDQsXG4gICAgbG9jYXRpb246ICdCaWVsc2tvLUJpYcWCYScsXG4gICAgcHJvY2VkdXJlOiAnTEhQJyxcbiAgICBwcm9jZWR1cmVMYWJlbDogJ0xhc2Vyb3dlIExlY3plbmllIEhlbW9yb2lkw7N3IExIUMKuJyxcbiAgICBkYXRlOiAnTHV0eSAyMDI2JyxcbiAgICByYXRpbmc6IDUsXG4gICAgaGVhZGxpbmU6ICdCYcWCZW0gc2nEmSB6YWJpZWd1IHByemV6IGxhdGEsIGEgcG8gMiBkbmlhY2ggd3LDs2NpxYJlbSBkbyBwZcWCbmVqIGFrdHl3bm/Fm2NpJyxcbiAgICB0ZXN0aW1vbmlhbFRleHQ6XG4gICAgICAnWiBwcm9ibGVtZW0gbmF3cmFjYWrEhWN5Y2ggaGVtb3JvaWTDs3cgSUlJIHN0b3BuaWEgem1hZ2HFgmVtIHNpxJkgcHJhd2llIDYgbGF0LiBVbmlrYcWCZW0gY2hpcnVyZ2EgemUgc3RyYWNodSBwcnplZCBib2xlc27EhSBvcGVyYWNqxIUuIERyIEphbiBCdWpvayB6YXByb3Bvbm93YcWCIGJlend5Y2nEmWNpb3fEhSBtZXRvZMSZIGxhc2Vyb3fEhSBMSFAuIFphYmllZyB3IHpuaWVjenVsZW5pdSBtaWVqc2Nvd3ltIHRyd2HFgiAyNSBtaW51dC4gTmFzdMSZcG5lZ28gZG5pYSBiecWCZW0gdyBkb211LCBhIHBvIDQ4IGdvZHppbmFjaCBwcmFjb3dhxYJlbSBiZXogxbxhZG55Y2ggbGVrw7N3IHByemVjaXdiw7Nsb3d5Y2guIFBlxYJlbiBwcm9mZXNqb25hbGl6bSBpIG5pZXNhbW93aXRhIHVsZ2EuJyxcbiAgICBkb2N0b3JDb21tZW50OlxuICAgICAgJ1phc3Rvc293YWxpxZtteSDFm3dpYXTFgm93w7NkIHJhZGlhbG55IEJpb2xpdGVjIDE0NzBubSwgY28gcG96d29sacWCbyBwcmVjeXp5am5pZSB6YW1rbsSFxIcgbmFjenluaWEgYmV6IHVzemthZHphbmlhIHp3aWVyYWN6eSBpIMWbbHV6w7N3a2kuIEVmZWt0IGFuYXRvbWljem55IGlkZWFsbnkuJyxcbiAgICByZWNvdmVyeURheXM6ICcyIGRuaScsXG4gICAgcGFpbkJlZm9yZTogOSxcbiAgICBwYWluQWZ0ZXI6IDEsXG4gICAgdmVyaWZpZWRTb3VyY2U6ICdXZXJ5Zmlrb3dhbmEgd2l6eXRhIMK3IFpuYW55TGVrYXJ6LnBsJyxcbiAgICBoZWxwZnVsQ291bnQ6IDQyLFxuICAgIHRhZ3M6IFsnQmV6IHN6d8OzdycsICdQb3dyw7N0IGRvIHByYWN5IDQ4aCcsICdCcmFrIGJvbGVzbnljaCBvcGF0cnVua8OzdyddLFxuICB9LFxuICB7XG4gICAgaWQ6ICd0LTInLFxuICAgIG5hbWU6ICdLYXRhcnp5bmEgVy4nLFxuICAgIGFnZTogMzYsXG4gICAgbG9jYXRpb246ICdLYXRvd2ljZScsXG4gICAgcHJvY2VkdXJlOiAnRmlMYUMnLFxuICAgIHByb2NlZHVyZUxhYmVsOiAnTGFzZXJvd2UgWmFta25pxJljaWUgUHJ6ZXRva2kgRmlMYUPCricsXG4gICAgZGF0ZTogJ1N0eWN6ZcWEIDIwMjYnLFxuICAgIHJhdGluZzogNSxcbiAgICBoZWFkbGluZTogJ09zemN6xJlkemVuaWUgendpZXJhY3p5IGJ5xYJvIGRsYSBtbmllIGtsdWN6b3dlIOKAkyBkciBCdWpvayB3eWtvbmHFgiBjdWQnLFxuICAgIHRlc3RpbW9uaWFsVGV4dDpcbiAgICAgICdEaWFnbm96YSBwcnpldG9raSBvZGJ5dHUgYnnFgmEgZGxhIG1uaWUgc3pva2llbS4gSW5uaSBjaGlydXJkenkgc3RyYXN6eWxpIG1uaWUgcHJ6ZWNpxJljaWVtIHp3aWVyYWN6eSBpIHBvd2lrxYJhbmlhbWkuIERyIEJ1am9rIHd5amHFm25pxYIgbWkgbWV0b2TEmSBGaUxhQ8KuLiBMYXNlciB3eWN6ecWbY2nFgiBpIHphbWtuxIXFgiBrYW5hxYIgcHJ6ZXRva2kgb2QgxZtyb2RrYSBiZXogd3ljaW5hbmlhIHRrYW5lay4gRHppc2lhaiwgcG8gMyBtaWVzacSFY2FjaCBvZCBrb250cm9saSwgbmllIG1hIMW8YWRuZWdvIMWbbGFkdSBhbmkgbmF3cm90dS4gTmFqbGVwc3phIGtsaW5pa2EgcHJva3RvbG9naWN6bmEgbmEgxZpsxIVza3UhJyxcbiAgICBkb2N0b3JDb21tZW50OlxuICAgICAgJ1ByemV0b2thIHBvZMWbbHV6b3dhIHpvc3RhxYJhIHd5a29hZ3Vsb3dhbmEgZWxhc3R5Y3puxIUgc29uZMSFIHJhZGlhbG7EhS4gRnVua2NqZSB6d2llcmFjemEgemFjaG93YW5lIHcgMTAwJS4nLFxuICAgIHJlY292ZXJ5RGF5czogJzMgZG5pJyxcbiAgICBwYWluQmVmb3JlOiA4LFxuICAgIHBhaW5BZnRlcjogMCxcbiAgICB2ZXJpZmllZFNvdXJjZTogJ1BvdHdpZXJkem9ueSBwYWNqZW50IENNTCcsXG4gICAgaGVscGZ1bENvdW50OiAzOCxcbiAgICB0YWdzOiBbJ09jaHJvbmEgendpZXJhY3p5JywgJ0JyYWsgcmFuIGNoaXJ1cmdpY3pueWNoJywgJ1BlxYJuZSB3eWxlY3plbmllJ10sXG4gIH0sXG4gIHtcbiAgICBpZDogJ3QtMycsXG4gICAgbmFtZTogJ1Bpb3RyIFIuJyxcbiAgICBhZ2U6IDUyLFxuICAgIGxvY2F0aW9uOiAnQ2llc3p5bicsXG4gICAgcHJvY2VkdXJlOiAnU2lMYUMnLFxuICAgIHByb2NlZHVyZUxhYmVsOiAnTGFzZXJvd2UgVXN1d2FuaWUgVG9yYmllbGkgU2lMYUPCricsXG4gICAgZGF0ZTogJ0dydWR6aWXFhCAyMDI1JyxcbiAgICByYXRpbmc6IDUsXG4gICAgaGVhZGxpbmU6ICdTenlia2llIHVzdW5pxJljaWUgdG9yYmllbGkga2/Fm2NpIGd1emljem5laiBiZXogZMWCdWdpZWdvIGdvamVuaWEgcmFueScsXG4gICAgdGVzdGltb25pYWxUZXh0OlxuICAgICAgJ1RyYWR5Y3lqbmUgb3BlcmFjamUgdG9yYmllbGkgd8WCb3Nvd2VqIHdpxIXFvMSFIHNpxJkgeiBvdHdhcnTEhSByYW7EhSBwcnpleiAyIG1pZXNpxIVjZS4gRHppxJlraSB6YWJpZWdvd2kgU2lMYUPCriB1IGRyLiBCdWpva2Ega2FuYcWCIHpvc3RhxYIgemFta25pxJl0eSDFm3dpYXTFgmVtIGxhc2VyYS4gWmVybyBzxIVjemvDs3csIHplcm8gc8SFY3plbmlhLiBSYW5hIHphZ29pxYJhIHNpxJkgdyB0eWR6aWXFhC4gUG9sZWNhbSBrYcW8ZGVtdSwga3RvIGNlbmkgc3fDs2ogY3phcyBpIGJyYWsgYsOzbHUuJyxcbiAgICBkb2N0b3JDb21tZW50OlxuICAgICAgJ01ldG9kYSBTaUxhQyBvZ3JhbmljemEgbmF3cm90eSB0b3JiaWVsaSBrb8WbY2kgZ3V6aWN6bmVqIHogMjUlIChjaGlydXJnaWEgdHJhZHljeWpuYSkgZG8gcG9uacW8ZWogMyUuJyxcbiAgICByZWNvdmVyeURheXM6ICcyIGRuaScsXG4gICAgcGFpbkJlZm9yZTogNyxcbiAgICBwYWluQWZ0ZXI6IDEsXG4gICAgdmVyaWZpZWRTb3VyY2U6ICdXZXJ5Zmlrb3dhbmEgd2l6eXRhIMK3IEdvb2dsZSBSZXZpZXdzJyxcbiAgICBoZWxwZnVsQ291bnQ6IDI5LFxuICAgIHRhZ3M6IFsnTmlza2llIHJ5enlrbyBuYXdyb3R1JywgJ0tyw7N0a2EgcmVrb253YWxlc2NlbmNqYScsICdaYWJpZWcgamVkbm9kbmlvd3knXSxcbiAgfSxcbiAge1xuICAgIGlkOiAndC00JyxcbiAgICBuYW1lOiAnRXdhIE0uJyxcbiAgICBhZ2U6IDQxLFxuICAgIGxvY2F0aW9uOiAnxbt5d2llYycsXG4gICAgcHJvY2VkdXJlOiAnRmlzc3VyZScsXG4gICAgcHJvY2VkdXJlTGFiZWw6ICdMYXNlcm93YSBQbGFzdHlrYSBTemN6ZWxpbnkgT2RieXR1JyxcbiAgICBkYXRlOiAnTGlzdG9wYWQgMjAyNScsXG4gICAgcmF0aW5nOiA1LFxuICAgIGhlYWRsaW5lOiAnS29uaWVjIHogcHJ6ZXdsZWvFgnltIGLDs2xlbSBwcnp5IHd5cHLDs8W8bmlhbml1IOKAkyBkemnEmWt1asSZIScsXG4gICAgdGVzdGltb25pYWxUZXh0OlxuICAgICAgJ1N6Y3plbGluYSBvZGJ5dHUgZG9wcm93YWR6acWCYSBtbmllIG5hIHNrcmFqIHd5Y3plcnBhbmlhIHBzeWNoaWN6bmVnby4gS2HFvGRlIHd5cHLDs8W8bmllbmllIHRvIGJ5xYIgYsOzbCB0cndhasSFY3kgZ29kemluYW1pLiBQbyBkZWxpa2F0bnltIHphYmllZ3UgbGFzZXJvd3ltIHUgZHIuIEphbmEgQnVqb2thIGLDs2wgdXN0YcWCIGRvc8WCb3duaWUgeiBkbmlhIG5hIGR6aWXFhC4gxbthxYJ1asSZIHR5bGtvIGplZG5lZ28g4oCTIMW8ZSBuaWUgdHJhZmnFgmFtIGRvIENNTCBww7PFgiByb2t1IHdjemXFm25pZWohJyxcbiAgICBkb2N0b3JDb21tZW50OlxuICAgICAgJ1d5ZWxpbWlub3dhbGnFm215IHNrdXJjeiB6d2llcmFjemEgd2V3bsSZdHJ6bmVnbyBwb3ByemV6IGZvdG9keXNydXBjasSZIGxhc2Vyb3fEhSBiZXogbmFjaW5hbmlhIG1pxJnFm25pYS4nLFxuICAgIHJlY292ZXJ5RGF5czogJzEgZHppZcWEJyxcbiAgICBwYWluQmVmb3JlOiAxMCxcbiAgICBwYWluQWZ0ZXI6IDAsXG4gICAgdmVyaWZpZWRTb3VyY2U6ICdXZXJ5Zmlrb3dhbmEgd2l6eXRhIMK3IFpuYW55TGVrYXJ6LnBsJyxcbiAgICBoZWxwZnVsQ291bnQ6IDUxLFxuICAgIHRhZ3M6IFsnTmF0eWNobWlhc3Rvd2EgdWxnYScsICdCZXogbmFjaW5hbmlhIG1pxJnFm25pJywgJ0RlbGlrYXRuYSBwcm9jZWR1cmEnXSxcbiAgfSxcbiAge1xuICAgIGlkOiAndC01JyxcbiAgICBuYW1lOiAnVG9tYXN6IEIuJyxcbiAgICBhZ2U6IDQ4LFxuICAgIGxvY2F0aW9uOiAnVHljaHknLFxuICAgIHByb2NlZHVyZTogJ0xIUCcsXG4gICAgcHJvY2VkdXJlTGFiZWw6ICdMYXNlcm93ZSBMZWN6ZW5pZSBIZW1vcm9pZMOzdyBMSFDCricsXG4gICAgZGF0ZTogJ1N0eWN6ZcWEIDIwMjYnLFxuICAgIHJhdGluZzogNSxcbiAgICBoZWFkbGluZTogJ1BlxYJueSBrb21mb3J0LCBlbXBhdGlhIGkga2xpbmljem5lIHBvZGVqxZtjaWUgbmEgbmFqd3nFvHN6eW0gcG96aW9taWUnLFxuICAgIHRlc3RpbW9uaWFsVGV4dDpcbiAgICAgICdXc3BhcmNpZSBpIGVtcGF0aWEgZHIuIEJ1am9rYSBvcmF6IGNhxYJlZ28gemVzcG/FgnUgdyBDTUwgcHJ6ZXJvc8WCeSBtb2plIG9jemVraXdhbmlhLiBCYWRhbmllIGFub3Nrb3Bvd2UgYnnFgm8gYmV6Ym9sZXNuZSwgYSBzYW0gemFiaWVnIExIUCBtaW7EhcWCIGLFgnlza2F3aWN6bmllLiBCYXJkem8gZG9jZW5pYW0gZGVkeWtvd2FueSB6ZXN0YXcgcG9vcGVyYWN5am55IG9yYXogYmV6cG/Fm3JlZG5pIGtvbnRha3QgeiBrbGluaWvEhSBwbyB6YWJpZWd1LicsXG4gICAgZG9jdG9yQ29tbWVudDpcbiAgICAgICdaYXN0b3Nvd2FubyBwb2R3w7NqbnkgcHJvbWllxYQgxZt3aWF0xYJvd29kdSBMSFAgMTQ3MG5tIHByenkgaGVtb3JvaWRhY2ggSVYgc3RvcG5pYSB6IHJlc2VrY2rEhSBmYcWCZMOzdyBhbm9kZXJteS4nLFxuICAgIHJlY292ZXJ5RGF5czogJzMgZG5pJyxcbiAgICBwYWluQmVmb3JlOiA4LFxuICAgIHBhaW5BZnRlcjogMSxcbiAgICB2ZXJpZmllZFNvdXJjZTogJ1BvdHdpZXJkem9ueSBwYWNqZW50IENNTCcsXG4gICAgaGVscGZ1bENvdW50OiAzMyxcbiAgICB0YWdzOiBbJ1N0cnVrdHVyYSBJViBzdG9wbmlhJywgJ1N0YcWCeSBrb250YWt0IHogZHIuIEJ1am9raWVtJywgJ0tvbXBsZWtzb3d5IHBha2lldCddLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IFBhdGllbnRUZXN0aW1vbmlhbHM6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbc2VsZWN0ZWRGaWx0ZXIsIHNldFNlbGVjdGVkRmlsdGVyXSA9IHVzZVN0YXRlPCdBTEwnIHwgJ0xIUCcgfCAnRmlMYUMnIHwgJ1NpTGFDJyB8ICdGaXNzdXJlJz4oJ0FMTCcpO1xuICBjb25zdCBbY3VycmVudEluZGV4LCBzZXRDdXJyZW50SW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtpc0F1dG9wbGF5LCBzZXRJc0F1dG9wbGF5XSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbaGVscGZ1bE1hcCwgc2V0SGVscGZ1bE1hcF0gPSB1c2VTdGF0ZTxSZWNvcmQ8c3RyaW5nLCBudW1iZXI+Pih7fSk7XG4gIGNvbnN0IFtzZWxlY3RlZFN0b3J5TW9kYWwsIHNldFNlbGVjdGVkU3RvcnlNb2RhbF0gPSB1c2VTdGF0ZTxQYXRpZW50VGVzdGltb25pYWwgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBmaWx0ZXJlZFRlc3RpbW9uaWFscyA9IFRFU1RJTU9OSUFMU19EQVRBLmZpbHRlcigodCkgPT4ge1xuICAgIGlmIChzZWxlY3RlZEZpbHRlciA9PT0gJ0FMTCcpIHJldHVybiB0cnVlO1xuICAgIHJldHVybiB0LnByb2NlZHVyZSA9PT0gc2VsZWN0ZWRGaWx0ZXI7XG4gIH0pO1xuXG4gIC8vIFJlc2V0IGN1cnJlbnQgaW5kZXggd2hlbiBmaWx0ZXIgY2hhbmdlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldEN1cnJlbnRJbmRleCgwKTtcbiAgfSwgW3NlbGVjdGVkRmlsdGVyXSk7XG5cbiAgLy8gQXV0b3BsYXkgZnVuY3Rpb25hbGl0eVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNBdXRvcGxheSB8fCBmaWx0ZXJlZFRlc3RpbW9uaWFscy5sZW5ndGggPD0gMSkgcmV0dXJuO1xuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2V0Q3VycmVudEluZGV4KChwcmV2KSA9PiAocHJldiArIDEpICUgZmlsdGVyZWRUZXN0aW1vbmlhbHMubGVuZ3RoKTtcbiAgICB9LCA2MDAwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0sIFtpc0F1dG9wbGF5LCBmaWx0ZXJlZFRlc3RpbW9uaWFscy5sZW5ndGhdKTtcblxuICBjb25zdCBoYW5kbGVOZXh0ID0gKCkgPT4ge1xuICAgIHNldEN1cnJlbnRJbmRleCgocHJldikgPT4gKHByZXYgKyAxKSAlIGZpbHRlcmVkVGVzdGltb25pYWxzLmxlbmd0aCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUHJldiA9ICgpID0+IHtcbiAgICBzZXRDdXJyZW50SW5kZXgoKHByZXYpID0+IChwcmV2IC0gMSArIGZpbHRlcmVkVGVzdGltb25pYWxzLmxlbmd0aCkgJSBmaWx0ZXJlZFRlc3RpbW9uaWFscy5sZW5ndGgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUhlbHBmdWxDbGljayA9IChpZDogc3RyaW5nLCBpbml0aWFsQ291bnQ6IG51bWJlcikgPT4ge1xuICAgIHNldEhlbHBmdWxNYXAoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW2lkXTogKHByZXZbaWRdID8/IGluaXRpYWxDb3VudCkgKyAxLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCBhY3RpdmVJdGVtID0gZmlsdGVyZWRUZXN0aW1vbmlhbHNbY3VycmVudEluZGV4XSB8fCBmaWx0ZXJlZFRlc3RpbW9uaWFsc1swXTtcblxuICByZXR1cm4gKFxuICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInB5LTE2IHB4LTQgc206cHgtNiBsZzpweC04IG1heC13LTZ4bCBteC1hdXRvXCIgaWQ9XCJoaXN0b3JpZS1wYWNqZW50b3dcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHNtOnAtMTAgcm91bmRlZC0zeGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LXhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICB7LyogR2xvdyBiYWNrZ3JvdW5kIGFjY2VudCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHctOTYgaC05NiBiZy1wdXJwbGUtMTAwLzcwIHJvdW5kZWQtZnVsbCBibHVyLTN4bCBwb2ludGVyLWV2ZW50cy1ub25lXCIgLz5cblxuICAgICAgICB7LyogSGVhZGVyIEFyZWEgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1lbmQganVzdGlmeS1iZXR3ZWVuIGdhcC02IG1iLTggYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTIwMCBwYi02XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMuNSBweS0xLjUgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS01MCBib3JkZXIgYm9yZGVyLXB1cnBsZS0yMDAgdGV4dC1wdXJwbGUtODAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItM1wiPlxuICAgICAgICAgICAgICA8TWVzc2FnZVNxdWFyZVF1b3RlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTYwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPldlcnlmaWtvd2FuZSBIaXN0b3JpZSBTdWtjZXN1IENNTDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtc2VyaWYgdGV4dC0yeGwgc206dGV4dC0zeGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgIEthcnV6ZWxhIE9waW5paSAmIFJlbGFjamkgUGFjamVudMOzd1xuICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTYwMCBmb250LW5vcm1hbCBtdC0xIG1heC13LXhsXCI+XG4gICAgICAgICAgICAgIFpvYmFjeiBhdXRlbnR5Y3puZSDFm3dpYWRlY3R3YSBvc8OzYiwga3TDs3JlIG9kenlza2HFgnkga29tZm9ydCDFvHljaWEgZHppxJlraSBtaWtyb2lud2F6eWpueW0gcHJvY2VkdXJvbSBsYXNlcm93eW0gZHIuIEphbmEgQnVqb2thLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJhdGluZyBTdW1tYXJ5IEJveCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC00IHAtMy41IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNocmluay0wIHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTIgcm91bmRlZC14bCBiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZXJpZlwiPjQuOTg8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdXBwZXJjYXNlIGZvbnQtbW9ubyB0cmFja2luZy10aWdodGVyXCI+LyA1LjA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1hbWJlci00MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgIHtbLi4uQXJyYXkoNSldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPFN0YXIga2V5PXtpfSBjbGFzc05hbWU9XCJ3LTQgaC00IGZpbGwtYW1iZXItNDAwIHN0cm9rZS1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS04MDAgYmxvY2tcIj4zNDArIHp3ZXJ5Zmlrb3dhbnljaCB6YWJpZWfDs3c8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwXCI+OTkuMiUgcGFjamVudMOzdyBwb2xlY2EgQ01MPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBDYXRlZ29yeSBGaWx0ZXJzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgbWItOFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0xLjUgYmctc2xhdGUtMTAwIHAtMS41IHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICB7W1xuICAgICAgICAgICAgICB7IGlkOiAnQUxMJywgbGFiZWw6ICdXc3p5c3RraWUgUHJvY2VkdXJ5JyB9LFxuICAgICAgICAgICAgICB7IGlkOiAnTEhQJywgbGFiZWw6ICdIZW1vcm9pZHkgKExIUMKuKScgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ0ZpTGFDJywgbGFiZWw6ICdQcnpldG9rYSAoRmlMYUPCriknIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdTaUxhQycsIGxhYmVsOiAnVG9yYmllbCAoU2lMYUPCriknIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdGaXNzdXJlJywgbGFiZWw6ICdTemN6ZWxpbmEgT2RieXR1JyB9LFxuICAgICAgICAgICAgXS5tYXAoKHRhYikgPT4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXt0YWIuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRGaWx0ZXIodGFiLmlkIGFzIGFueSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMy41IHB5LTIgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkRmlsdGVyID09PSB0YWIuaWRcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTYwMC8yMCdcbiAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtMjAwLzYwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge3RhYi5sYWJlbH1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDYXJvdXNlbCBDb250cm9scyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQXV0b3BsYXkoIWlzQXV0b3BsYXkpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZC14bCBib3JkZXIgdGV4dC14cyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICBpc0F1dG9wbGF5XG4gICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNTAgYm9yZGVyLXB1cnBsZS0yMDAgdGV4dC1wdXJwbGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctd2hpdGUgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIHRpdGxlPXtpc0F1dG9wbGF5ID8gJ1dzdHJ6eW1haiBhdXRvb2R0d2FyemFuaWUnIDogJ1fFgsSFY3ogYXV0b29kdHdhcnphbmllJ31cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2lzQXV0b3BsYXkgPyA8UGF1c2UgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiA6IDxQbGF5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGhpZGRlbiBzbTppbmxpbmVcIj57aXNBdXRvcGxheSA/ICdBdXRvcGxheScgOiAnUGF1emEnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVByZXZ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc2xhdGUtMTAwIGhvdmVyOmJnLXB1cnBsZS02MDAgaG92ZXI6dGV4dC13aGl0ZSB0ZXh0LXNsYXRlLTcwMCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiUG9wcnplZG5pYSBvcGluaWFcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q2hldnJvbkxlZnQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS02MDAgcHgtMiBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAge2N1cnJlbnRJbmRleCArIDF9IC8ge2ZpbHRlcmVkVGVzdGltb25pYWxzLmxlbmd0aH1cbiAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVOZXh0fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTEwMCBob3ZlcjpiZy1wdXJwbGUtNjAwIGhvdmVyOnRleHQtd2hpdGUgdGV4dC1zbGF0ZS03MDAgdHJhbnNpdGlvbi1hbGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIk5hc3TEmXBuYSBvcGluaWFcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNYWluIFRlc3RpbW9uaWFsIENhcmQgRGlzcGxheSAqL31cbiAgICAgICAge2FjdGl2ZUl0ZW0gJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2UgbW9kZT1cIndhaXRcIj5cbiAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICBrZXk9e2FjdGl2ZUl0ZW0uaWR9XG4gICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB4OiAyMCB9fVxuICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeDogMCB9fVxuICAgICAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgeDogLTIwIH19XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4zNSwgZWFzZTogJ2Vhc2VPdXQnIH19XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTYgcC02IHNtOnAtOCByb3VuZGVkLTN4bCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCByZWxhdGl2ZSBzaGFkb3ctbWRcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgey8qIExlZnQgQ29sdW1uOiBQYXRpZW50IFByb2ZpbGUgJiBSYXRpbmdzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBsZzpib3JkZXItYi0wIGxnOmJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgcGItNiBsZzpwYi0wIGxnOnByLTYgc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogQXZhdGFyIEluaXRpYWxzIEJhZGdlICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tcHVycGxlLTYwMCB0by1pbmRpZ28tNjAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtYmFzZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbWQgc2hhZG93LXB1cnBsZS02MDAvMjAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVJdGVtLm5hbWUuc2xpY2UoMCwgMil9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCB0ZXh0LWJhc2VcIj57YWN0aXZlSXRlbS5uYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVJdGVtLmFnZX0gbGF0IMK3IHthY3RpdmVJdGVtLmxvY2F0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtMjAwIHRleHQtZW1lcmFsZC04MDAgdGV4dC1bMTFweF0gZm9udC1zZW1pYm9sZCBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnthY3RpdmVJdGVtLnZlcmlmaWVkU291cmNlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LWFtYmVyLTQwMCBtYi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAge1suLi5BcnJheShhY3RpdmVJdGVtLnJhdGluZyldLm1hcCgoXywgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPFN0YXIga2V5PXtpfSBjbGFzc05hbWU9XCJ3LTQgaC00IGZpbGwtYW1iZXItNDAwIHN0cm9rZS1hbWJlci01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1wdXJwbGUtNzAwIGJnLXB1cnBsZS0xMDAvODAgcHgtMyBweS0xLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXB1cnBsZS0yMDAvNjAgdy1maXQgbWItMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVJdGVtLnByb2NlZHVyZUxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIGJsb2NrXCI+RGF0YToge2FjdGl2ZUl0ZW0uZGF0ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIFBhaW4gJiBSZWNvdmVyeSBNZXRyaWNzICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgcHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwLzgwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTYwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICBDemFzIHBvd3JvdHU6XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMCBiZy13aGl0ZSBweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB+e2FjdGl2ZUl0ZW0ucmVjb3ZlcnlEYXlzfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNjAwXCI+U3BhZGVrIGLDs2x1IChza2FsYSAwLTEwKTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtZW1lcmFsZC03MDAgYmctZW1lcmFsZC01MCBweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZW1lcmFsZC0yMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVJdGVtLnBhaW5CZWZvcmV9LzEwIOKGkiB7YWN0aXZlSXRlbS5wYWluQWZ0ZXJ9LzEwXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFJpZ2h0IENvbHVtbjogRGV0YWlsZWQgUXVvdGUgJiBDb21tZW50YXJ5ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tOCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQtbGcgc206dGV4dC14bCBmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgbGVhZGluZy1zbnVnIG1iLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICDigJ57YWN0aXZlSXRlbS5oZWFkbGluZX3igJ1cbiAgICAgICAgICAgICAgICAgICAgPC9oND5cblxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS03MDAgbGVhZGluZy1yZWxheGVkIGZvbnQtbm9ybWFsIGl0YWxpYyBtYi00XCI+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZUl0ZW0udGVzdGltb25pYWxUZXh0fVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFRhZ3MgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yIG1iLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7YWN0aXZlSXRlbS50YWdzLm1hcCgodGFnLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNzAwIHRleHQtWzExcHhdIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHNoYWRvdy0yeHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3RhZ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBEb2N0b3IgQ29tbWVudGFyeSBCb3ggKi99XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVJdGVtLmRvY3RvckNvbW1lbnQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC0yeGwgYmctcHVycGxlLTUwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTIwMCB0ZXh0LXhzIHRleHQtc2xhdGUtODAwIGZsZXggaXRlbXMtc3RhcnQgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEF3YXJkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNjAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1wdXJwbGUtOTAwIGJsb2NrIG1iLTAuNVwiPktvbWVudGFyeiBLbGluaWN6bnkgZHIuIEphbmEgQnVqb2thOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS03MDAgbGVhZGluZy1zbnVnXCI+e2FjdGl2ZUl0ZW0uZG9jdG9yQ29tbWVudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogRm9vdGVyIEFjdGlvbiBCYXIgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUhlbHBmdWxDbGljayhhY3RpdmVJdGVtLmlkLCBhY3RpdmVJdGVtLmhlbHBmdWxDb3VudCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIGJnLXdoaXRlIGhvdmVyOmJnLXB1cnBsZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBob3Zlcjpib3JkZXItcHVycGxlLTMwMCB0ZXh0LXNsYXRlLTcwMCBob3Zlcjp0ZXh0LXB1cnBsZS04MDAgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctMnhzXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxUaHVtYnNVcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvbW9jbmEgb3BpbmlhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC1wdXJwbGUtNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAoe2hlbHBmdWxNYXBbYWN0aXZlSXRlbS5pZF0gPz8gYWN0aXZlSXRlbS5oZWxwZnVsQ291bnR9KVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkU3RvcnlNb2RhbChhY3RpdmVJdGVtKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTEuNSByb3VuZGVkLXhsIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTcwMCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Wm9iYWN6IFN0dWRpdW0gUHJ6eXBhZGt1PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1JpZ2h0IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIENhcm91c2VsIERvdHMgTmF2aWdhdGlvbiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBtdC02XCI+XG4gICAgICAgICAge2ZpbHRlcmVkVGVzdGltb25pYWxzLm1hcCgoXywgaWR4KSA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRDdXJyZW50SW5kZXgoaWR4KX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaC0yLjUgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID09PSBpZHhcbiAgICAgICAgICAgICAgICAgID8gJ3ctOCBiZy1wdXJwbGUtNjAwJ1xuICAgICAgICAgICAgICAgICAgOiAndy0yLjUgYmctc2xhdGUtMzAwIGhvdmVyOmJnLXNsYXRlLTQwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2BQcnplamTFuiBkbyBvcGluaWkgJHtpZHggKyAxfWB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQ2FzZSBTdHVkeSBNb2RhbCAqL31cbiAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgIHtzZWxlY3RlZFN0b3J5TW9kYWwgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC83MCBiYWNrZHJvcC1ibHVyLXNtIHAtNFwiPlxuICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHNjYWxlOiAxIH19XG4gICAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTUgfX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LTJ4bCBiZy13aGl0ZSByb3VuZGVkLTN4bCBib3JkZXIgYm9yZGVyLXB1cnBsZS0yMDAgc2hhZG93LTJ4bCBvdmVyZmxvdy1oaWRkZW4gcC02IHNtOnAtOCB0ZXh0LXNsYXRlLTkwMCByZWxhdGl2ZSBtYXgtaC1bOTB2aF0gb3ZlcmZsb3cteS1hdXRvXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkU3RvcnlNb2RhbChudWxsKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtNCByaWdodC00IHAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTEwMCBob3ZlcjpiZy1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtMTAwIHRleHQtcHVycGxlLTgwMCB0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdy1maXQgbWItM1wiPlxuICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPktsaW5pY3puZSBTdHVkaXVtIFByenlwYWRrdSBDTUw8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQteGwgc206dGV4dC0yeGwgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRTdG9yeU1vZGFsLm5hbWV9IOKAlCB7c2VsZWN0ZWRTdG9yeU1vZGFsLnByb2NlZHVyZUxhYmVsfVxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGZvbnQtbWVkaXVtIG1iLTRcIj5cbiAgICAgICAgICAgICAgICBXaWVrOiB7c2VsZWN0ZWRTdG9yeU1vZGFsLmFnZX0gbGF0IMK3IE1pZWpzY293b8WbxIc6IHtzZWxlY3RlZFN0b3J5TW9kYWwubG9jYXRpb259IMK3IHtzZWxlY3RlZFN0b3J5TW9kYWwudmVyaWZpZWRTb3VyY2V9XG4gICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1wdXJwbGUtNTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtMjAwIG1iLTZcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQteHMgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtcHVycGxlLTkwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBQb2RzdW1vd2FuaWUgRWZla3R1IFphYmllZ293ZWdvOlxuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtODAwIGxlYWRpbmctcmVsYXhlZCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAg4oCee3NlbGVjdGVkU3RvcnlNb2RhbC5oZWFkbGluZX3igJ1cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IHRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTcwMCBsZWFkaW5nLXJlbGF4ZWQgbWItNlwiPlxuICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS05MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgIFBlxYJueSBPcGlzIEhpc3RvcmlpIFBhY2plbnRhOlxuICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgPHA+e3NlbGVjdGVkU3RvcnlNb2RhbC50ZXN0aW1vbmlhbFRleHR9PC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7c2VsZWN0ZWRTdG9yeU1vZGFsLmRvY3RvckNvbW1lbnQgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMCB0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtODAwIG1iLTZcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1wdXJwbGUtMzAwIHRleHQteHMgZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxBd2FyZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPktvbWVudGFyeiBkci4gbi4gbWVkLiBKYW5hIEJ1am9rYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj57c2VsZWN0ZWRTdG9yeU1vZGFsLmRvY3RvckNvbW1lbnR9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwIGZsZXgganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFN0b3J5TW9kYWwobnVsbCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC01IHB5LTIuNSByb3VuZGVkLXhsIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTcwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1zZW1pYm9sZCBzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIFphbWtuaWogT2tub1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQW9NUTtBQXBNUixTQUFnQixVQUFVLGlCQUFpQjtBQUMzQztBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUNQLFNBQVMsUUFBUSx1QkFBdUI7QUFzQnhDLE1BQU0sb0JBQTBDO0FBQUEsRUFDOUM7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxJQUNMLFVBQVU7QUFBQSxJQUNWLFdBQVc7QUFBQSxJQUNYLGdCQUFnQjtBQUFBLElBQ2hCLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLGlCQUNFO0FBQUEsSUFDRixlQUNFO0FBQUEsSUFDRixjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsSUFDWixXQUFXO0FBQUEsSUFDWCxnQkFBZ0I7QUFBQSxJQUNoQixjQUFjO0FBQUEsSUFDZCxNQUFNLENBQUMsYUFBYSx1QkFBdUIsMkJBQTJCO0FBQUEsRUFDeEU7QUFB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QTtBQUFBLG1CQUVBO0FBQUEsWUFDQSx1QkFBQyxPQUFFLFdBQVUsaUVBQWdFO0FBQUE7QUFBQSxjQUN6RSxtQkFBbUI7QUFBQSxjQUFTO0FBQUEsaUJBRGhDO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxlQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBT0E7QUFBQSxVQUVBLHVCQUFDLFNBQUksV0FBVSxvRUFDYjtBQUFBLG1DQUFDLFFBQUcsV0FBVSw2REFBNEQsNkNBQTFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxZQUNBLHVCQUFDLE9BQUcsNkJBQW1CLG1CQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUF1QztBQUFBLGVBSnpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBS0E7QUFBQSxVQUVDLG1CQUFtQixpQkFDbEIsdUJBQUMsU0FBSSxXQUFVLHdFQUNiO0FBQUEsbUNBQUMsU0FBSSxXQUFVLDJGQUNiO0FBQUEscUNBQUMsU0FBTSxXQUFVLDZCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUEyQztBQUFBLGNBQzNDLHVCQUFDLFVBQUssaURBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBdUM7QUFBQSxpQkFGekM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFHQTtBQUFBLFlBQ0EsdUJBQUMsT0FBRSxXQUFVLDBDQUEwQyw2QkFBbUIsaUJBQTFFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQXdGO0FBQUEsZUFMMUY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFNQTtBQUFBLFVBR0YsdUJBQUMsU0FBSSxXQUFVLG1EQUNiO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTLE1BQU0sc0JBQXNCLElBQUk7QUFBQSxjQUN6QyxXQUFVO0FBQUEsY0FDWDtBQUFBO0FBQUEsWUFIRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFLQSxLQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBT0E7QUFBQTtBQUFBO0FBQUEsTUExREY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBMkRBLEtBNURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0E2REEsS0EvREo7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWlFQTtBQUFBLE9BelRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0EwVEE7QUFFSjsiLCJuYW1lcyI6W119