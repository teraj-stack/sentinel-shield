import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { ChevronDown, HelpCircle } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
import { AiFaqArticleAgent } from "/apps/cml_clinic/src/components/AiFaqArticleAgent.tsx";
export const initialFaqData = [
  {
    q: "Jak szybko po zabiegu laserowym (LHP / FiLaC) wrócę do codziennych aktywności?",
    a: "Większość pacjentów wraca do normalnego funkcjonowania domowego w ciągu 1-3 dni po zabiegu. Praca biurowa i lekka aktywność jest zazwyczaj możliwa już po 3-5 dniach. Brak wycięcia tkanek wyklucza bolesną rekonwalescencję znaną z tradycyjnej chirurgii."
  },
  {
    q: "Czy zabieg laserowy jest bolesny?",
    a: "Procedura LHP i FiLaC wykonywana jest w wysoce komfortowym znieczuleniu miejscowym lub sedacji. Odczucia bólowe po zabiegu są minimalne i z łatwością kontrolowane podstawowymi lekami przeciwbólowymi."
  },
  {
    q: "Czym metoda LHP różni się od klasycznej operacji hemoroidów?",
    a: "Klasyczna operacja (np. metodą Milligana-Morgana) polega na wycięciu guzków wraz z pokrywającą je śluzówką, co powoduje rozległą ranę i duży ból. Metoda LHP polega na obkurczeniu guzków od wewnątrz wiązką światła laserowego bez naruszania błony śluzowej i zwieracza."
  },
  {
    q: "Czy badanie proktologiczne podczas pierwszej wizyty boli?",
    a: "Dokładam wszelkich starań, aby badanie było bezbolesne. Odbywa się ono na kozetce w komfortowej pozycji bocznej z użyciem żelu znieczulającego. W przypadku ostrego stanu bólowego badanie jest natychmiast przerywane."
  },
  {
    q: "Jak umówić konsultację i gdzie znajduje się klinika CML?",
    a: "Rezerwacji można dokonać telefonicznie pod numerem +48 510 432 361, online poprzez portal ZnanyLekarz lub wybierając pakiety konsultacyjne w naszym e-sklepie. Klinika mieści się w Warszawie przy ul. Branickiego 10/U6 (Wilanów)."
  }
];
export const FaqSection = () => {
  const [items, setItems] = useState(initialFaqData);
  const [openIndex, setOpenIndex] = useState(0);
  const [showAgentPanel, setShowAgentPanel] = useState(true);
  const handlePublishToFaq = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
    setOpenIndex(0);
  };
  return /* @__PURE__ */ jsxDEV(
    motion.section,
    {
      className: "py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto",
      id: "faq",
      initial: { opacity: 0, y: 35 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center mb-10", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-950 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-indigo-500/30", children: [
            /* @__PURE__ */ jsxDEV(HelpCircle, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/FaqSection.tsx",
              lineNumber: 51,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Baza Wiedzy & Trending SEO" }, void 0, false, {
              fileName: "/app/applet/src/components/FaqSection.tsx",
              lineNumber: 52,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FaqSection.tsx",
            lineNumber: 50,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-4xl font-normal text-slate-100 mb-2", children: "Często Zadawane Pytania (FAQ)" }, void 0, false, {
            fileName: "/app/applet/src/components/FaqSection.tsx",
            lineNumber: 54,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto", children: "Odpowiedzi na najczęstsze wątpliwości pacjentów. Poniżej znajduje się również autonomiczny Agent AI, który generuje artykuły na podstawie słów kluczowych o najwyższym wskaźniku ROI." }, void 0, false, {
            fileName: "/app/applet/src/components/FaqSection.tsx",
            lineNumber: 57,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FaqSection.tsx",
          lineNumber: 49,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 mb-12", children: items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 overflow-hidden transition-all shadow-md",
              children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setOpenIndex(isOpen ? null : idx),
                    className: "w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-slate-100 font-medium text-xs sm:text-sm hover:text-indigo-300 transition-colors focus:outline-none",
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ jsxDEV(HelpCircle, { className: "w-4 h-4 text-indigo-400 shrink-0" }, void 0, false, {
                          fileName: "/app/applet/src/components/FaqSection.tsx",
                          lineNumber: 75,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: item.q }, void 0, false, {
                          fileName: "/app/applet/src/components/FaqSection.tsx",
                          lineNumber: 76,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/FaqSection.tsx",
                        lineNumber: 74,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV(
                        ChevronDown,
                        {
                          className: `w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-400" : ""}`
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/FaqSection.tsx",
                          lineNumber: 78,
                          columnNumber: 17
                        },
                        this
                      )
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/FaqSection.tsx",
                    lineNumber: 70,
                    columnNumber: 15
                  },
                  this
                ),
                isOpen && /* @__PURE__ */ jsxDEV("div", { className: "px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-slate-800/80 animate-fade-in", children: item.a }, void 0, false, {
                  fileName: "/app/applet/src/components/FaqSection.tsx",
                  lineNumber: 86,
                  columnNumber: 17
                }, this)
              ]
            },
            idx,
            true,
            {
              fileName: "/app/applet/src/components/FaqSection.tsx",
              lineNumber: 66,
              columnNumber: 13
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/FaqSection.tsx",
          lineNumber: 62,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV(AiFaqArticleAgent, { onPublishToFaq: handlePublishToFaq }, void 0, false, {
          fileName: "/app/applet/src/components/FaqSection.tsx",
          lineNumber: 96,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/FaqSection.tsx",
      lineNumber: 41,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZhcVNlY3Rpb24udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEZhcUl0ZW0gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBDaGV2cm9uRG93biwgSGVscENpcmNsZSwgU3BhcmtsZXMsIEJvdCB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgQWlGYXFBcnRpY2xlQWdlbnQgfSBmcm9tICcuL0FpRmFxQXJ0aWNsZUFnZW50JztcblxuZXhwb3J0IGNvbnN0IGluaXRpYWxGYXFEYXRhOiBGYXFJdGVtW10gPSBbXG4gIHtcbiAgICBxOiAnSmFrIHN6eWJrbyBwbyB6YWJpZWd1IGxhc2Vyb3d5bSAoTEhQIC8gRmlMYUMpIHdyw7NjxJkgZG8gY29kemllbm55Y2ggYWt0eXdub8WbY2k/JyxcbiAgICBhOiAnV2nEmWtzem/Fm8SHIHBhY2plbnTDs3cgd3JhY2EgZG8gbm9ybWFsbmVnbyBmdW5rY2pvbm93YW5pYSBkb21vd2VnbyB3IGNpxIVndSAxLTMgZG5pIHBvIHphYmllZ3UuIFByYWNhIGJpdXJvd2EgaSBsZWtrYSBha3R5d25vxZvEhyBqZXN0IHphend5Y3phaiBtb8W8bGl3YSBqdcW8IHBvIDMtNSBkbmlhY2guIEJyYWsgd3ljacSZY2lhIHRrYW5layB3eWtsdWN6YSBib2xlc27EhSByZWtvbndhbGVzY2VuY2rEmSB6bmFuxIUgeiB0cmFkeWN5am5laiBjaGlydXJnaWkuJyxcbiAgfSxcbiAge1xuICAgIHE6ICdDenkgemFiaWVnIGxhc2Vyb3d5IGplc3QgYm9sZXNueT8nLFxuICAgIGE6ICdQcm9jZWR1cmEgTEhQIGkgRmlMYUMgd3lrb255d2FuYSBqZXN0IHcgd3lzb2NlIGtvbWZvcnRvd3ltIHpuaWVjenVsZW5pdSBtaWVqc2Nvd3ltIGx1YiBzZWRhY2ppLiBPZGN6dWNpYSBiw7Nsb3dlIHBvIHphYmllZ3Ugc8SFIG1pbmltYWxuZSBpIHogxYJhdHdvxZtjacSFIGtvbnRyb2xvd2FuZSBwb2RzdGF3b3d5bWkgbGVrYW1pIHByemVjaXdiw7Nsb3d5bWkuJyxcbiAgfSxcbiAge1xuICAgIHE6ICdDenltIG1ldG9kYSBMSFAgcsOzxbxuaSBzacSZIG9kIGtsYXN5Y3puZWogb3BlcmFjamkgaGVtb3JvaWTDs3c/JyxcbiAgICBhOiAnS2xhc3ljem5hIG9wZXJhY2phIChucC4gbWV0b2TEhSBNaWxsaWdhbmEtTW9yZ2FuYSkgcG9sZWdhIG5hIHd5Y2nEmWNpdSBndXprw7N3IHdyYXogeiBwb2tyeXdhasSFY8SFIGplIMWbbHV6w7N3a8SFLCBjbyBwb3dvZHVqZSByb3psZWfFgsSFIHJhbsSZIGkgZHXFvHkgYsOzbC4gTWV0b2RhIExIUCBwb2xlZ2EgbmEgb2JrdXJjemVuaXUgZ3V6a8OzdyBvZCB3ZXduxIV0cnogd2nEhXprxIUgxZt3aWF0xYJhIGxhc2Vyb3dlZ28gYmV6IG5hcnVzemFuaWEgYsWCb255IMWbbHV6b3dlaiBpIHp3aWVyYWN6YS4nLFxuICB9LFxuICB7XG4gICAgcTogJ0N6eSBiYWRhbmllIHByb2t0b2xvZ2ljem5lIHBvZGN6YXMgcGllcndzemVqIHdpenl0eSBib2xpPycsXG4gICAgYTogJ0Rva8WCYWRhbSB3c3plbGtpY2ggc3RhcmHFhCwgYWJ5IGJhZGFuaWUgYnnFgm8gYmV6Ym9sZXNuZS4gT2RieXdhIHNpxJkgb25vIG5hIGtvemV0Y2UgdyBrb21mb3J0b3dlaiBwb3p5Y2ppIGJvY3puZWogeiB1xbx5Y2llbSDFvGVsdSB6bmllY3p1bGFqxIVjZWdvLiBXIHByenlwYWRrdSBvc3RyZWdvIHN0YW51IGLDs2xvd2VnbyBiYWRhbmllIGplc3QgbmF0eWNobWlhc3QgcHJ6ZXJ5d2FuZS4nLFxuICB9LFxuICB7XG4gICAgcTogJ0phayB1bcOzd2nEhyBrb25zdWx0YWNqxJkgaSBnZHppZSB6bmFqZHVqZSBzacSZIGtsaW5pa2EgQ01MPycsXG4gICAgYTogJ1JlemVyd2FjamkgbW/FvG5hIGRva29uYcSHIHRlbGVmb25pY3puaWUgcG9kIG51bWVyZW0gKzQ4IDUxMCA0MzIgMzYxLCBvbmxpbmUgcG9wcnpleiBwb3J0YWwgWm5hbnlMZWthcnogbHViIHd5YmllcmFqxIVjIHBha2lldHkga29uc3VsdGFjeWpuZSB3IG5hc3p5bSBlLXNrbGVwaWUuIEtsaW5pa2EgbWllxZtjaSBzacSZIHcgV2Fyc3phd2llIHByenkgdWwuIEJyYW5pY2tpZWdvIDEwL1U2IChXaWxhbsOzdykuJyxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBGYXFTZWN0aW9uOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxGYXFJdGVtW10+KGluaXRpYWxGYXFEYXRhKTtcbiAgY29uc3QgW29wZW5JbmRleCwgc2V0T3BlbkluZGV4XSA9IHVzZVN0YXRlPG51bWJlciB8IG51bGw+KDApO1xuICBjb25zdCBbc2hvd0FnZW50UGFuZWwsIHNldFNob3dBZ2VudFBhbmVsXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIGNvbnN0IGhhbmRsZVB1Ymxpc2hUb0ZhcSA9IChuZXdJdGVtOiBGYXFJdGVtKSA9PiB7XG4gICAgc2V0SXRlbXMoKHByZXYpID0+IFtuZXdJdGVtLCAuLi5wcmV2XSk7XG4gICAgc2V0T3BlbkluZGV4KDApOyAvLyBPcGVuIHRoZSBuZXdseSBhZGRlZCBpdGVtXG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8bW90aW9uLnNlY3Rpb25cbiAgICAgIGNsYXNzTmFtZT1cInB5LTIwIHB4LTQgc206cHgtNiBsZzpweC04IG1heC13LTV4bCBteC1hdXRvXCJcbiAgICAgIGlkPVwiZmFxXCJcbiAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogMzUgfX1cbiAgICAgIHdoaWxlSW5WaWV3PXt7IG9wYWNpdHk6IDEsIHk6IDAgfX1cbiAgICAgIHZpZXdwb3J0PXt7IG9uY2U6IHRydWUsIG1hcmdpbjogJy02MHB4JyB9fVxuICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC42LCBlYXNlOiBbMC4xNiwgMSwgMC4zLCAxXSB9fVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXIgbWItMTBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zLjUgcHktMSByb3VuZGVkLWZ1bGwgYmctaW5kaWdvLTk1MCB0ZXh0LWluZGlnby0zMDAgdGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBtYi0zIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMFwiPlxuICAgICAgICAgIDxIZWxwQ2lyY2xlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgPHNwYW4+QmF6YSBXaWVkenkgJiBUcmVuZGluZyBTRU88L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBzbTp0ZXh0LTR4bCBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTEwMCBtYi0yXCI+XG4gICAgICAgICAgQ3rEmXN0byBaYWRhd2FuZSBQeXRhbmlhIChGQVEpXG4gICAgICAgIDwvaDI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTQwMCBtYXgtdy0yeGwgbXgtYXV0b1wiPlxuICAgICAgICAgIE9kcG93aWVkemkgbmEgbmFqY3rEmXN0c3plIHfEhXRwbGl3b8WbY2kgcGFjamVudMOzdy4gUG9uacW8ZWogem5hamR1amUgc2nEmSByw7N3bmllxbwgYXV0b25vbWljem55IEFnZW50IEFJLCBrdMOzcnkgZ2VuZXJ1amUgYXJ0eWt1xYJ5IG5hIHBvZHN0YXdpZSBzxYLDs3cga2x1Y3pvd3ljaCBvIG5hand5xbxzenltIHdza2HFum5pa3UgUk9JLlxuICAgICAgICA8L3A+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgbWItMTJcIj5cbiAgICAgICAge2l0ZW1zLm1hcCgoaXRlbSwgaWR4KSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNPcGVuID0gb3BlbkluZGV4ID09PSBpZHg7XG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1pbmRpZ28tNTAwLzMwIG92ZXJmbG93LWhpZGRlbiB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbWRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0T3BlbkluZGV4KGlzT3BlbiA/IG51bGwgOiBpZHgpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwLTQgc206cC01IHRleHQtbGVmdCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgdGV4dC1zbGF0ZS0xMDAgZm9udC1tZWRpdW0gdGV4dC14cyBzbTp0ZXh0LXNtIGhvdmVyOnRleHQtaW5kaWdvLTMwMCB0cmFuc2l0aW9uLWNvbG9ycyBmb2N1czpvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgICA8SGVscENpcmNsZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTQwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aXRlbS5xfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Q2hldnJvbkRvd25cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNCBoLTQgdGV4dC1zbGF0ZS00MDAgc2hyaW5rLTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgICAgICAgICAgIGlzT3BlbiA/ICdyb3RhdGUtMTgwIHRleHQtaW5kaWdvLTQwMCcgOiAnJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAge2lzT3BlbiAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC01IHBiLTUgcHQtMSB0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgZm9udC1saWdodCBsZWFkaW5nLXJlbGF4ZWQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmF9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQUkgQWdlbnQgR2VuZXJhdG9yIFBhbmVsIENvbXBvbmVudCAqL31cbiAgICAgIDxBaUZhcUFydGljbGVBZ2VudCBvblB1Ymxpc2hUb0ZhcT17aGFuZGxlUHVibGlzaFRvRmFxfSAvPlxuICAgIDwvbW90aW9uLnNlY3Rpb24+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFrRFU7QUFsRFYsU0FBZ0IsZ0JBQWdCO0FBRWhDLFNBQVMsYUFBYSxrQkFBaUM7QUFDdkQsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMseUJBQXlCO0FBRTNCLGFBQU0saUJBQTRCO0FBQUEsRUFDdkM7QUFBQSxJQUNFLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxFQUNMO0FBQUEsRUFDQTtBQUFBLElBQ0UsR0FBRztBQUFB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