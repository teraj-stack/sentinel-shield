import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import { Zap, ShieldCheck } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
export const treatmentsData = [
  {
    id: "lhp",
    h: "LHP® – Laserowe leczenie hemoroidów",
    p: "Zamknięcie guzków krwawniczych światłem lasera od wewnątrz pod kontrolą USG. Bez cięcia tkanki, bez bolesnych szwów, zachowanie anatomicznej poduszeczki odbytniczej.",
    badge: "Standard CML",
    recoveryTime: "1-3 dni powrót do aktywności"
  },
  {
    id: "filac",
    h: "FiLaC® – Laserowe zamykanie przetok",
    p: "Precyzyjna koagulacja laserowa promieniście emitującym światłowodem włókna przetoki odbytu z bezwzględnym oszczędzeniem mięśni zwieraczy.",
    badge: "Bezinwazyjne",
    recoveryTime: "Szybkie gojenie"
  },
  {
    id: "silac",
    h: "SiLaC® – Torbiel pilonidalna (ogonowa)",
    p: "Ablacja laserowa torbieli krzyżowo-guzicznej. Alternatywa dla rozległych wycięć chirurgicznych wymagających wielomiesięcznego gojenia rany.",
    badge: "Innowacja",
    recoveryTime: "Minimalna blizna"
  },
  {
    id: "szczelina",
    h: "Szczelina odbytu – leczenie zachowawcze & laserowe",
    p: "Charakteryzuje się ostrym kłującym bólem i jasną krwią. Wzmocnione leczenie maściami relaksującymi zwieracz lub małoinwazyjne uwolnienie skurczu.",
    badge: "Ulga w bólu",
    recoveryTime: "Natychmiastowy komfort"
  },
  {
    id: "faldy",
    h: "Fałdy brzeżne & plastyka odbytu",
    p: "Chirurgiczna oraz laserowa plastyka fałdów skóry brzeżnej po przebytych zakrzepach lub ciążach w celu przywrócenia higieny i estetyki.",
    badge: "Estetyka & Higiena",
    recoveryTime: "Zabieg jednodniowy"
  },
  {
    id: "dysbioza",
    h: "Dysbioza & flora jelitowa w proktologii",
    p: "Problem często opisywany błędnie w internecie. Oferuję racjonalne omówienie stanu jelit oparte wyłącznie na dowodach medycznych (EBM).",
    badge: "Diagnostyka EBM",
    recoveryTime: "Terapia celowana"
  }
];
export const TreatmentsSection = () => {
  return /* @__PURE__ */ jsxDEV(
    motion.section,
    {
      className: "py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto",
      id: "leczenie",
      initial: { opacity: 0, y: 35 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-3xl mx-auto mb-12", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2", children: "Możliwości leczenia" }, void 0, false, {
            fileName: "/app/applet/src/components/TreatmentsSection.tsx",
            lineNumber: 62,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-4xl font-normal text-slate-100 mb-4", children: "Zaawansowane leczenie laserowe i proktologiczne" }, void 0, false, {
            fileName: "/app/applet/src/components/TreatmentsSection.tsx",
            lineNumber: 65,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm sm:text-base text-slate-300 font-light leading-relaxed", children: "Łączę innowacje technologiczne z indywidualnym podejściem. Przez 16 lat pracy nie widziałem dwóch identycznych przypadków — każdy zabieg dostosowuję do Twojej anatomii." }, void 0, false, {
            fileName: "/app/applet/src/components/TreatmentsSection.tsx",
            lineNumber: 68,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TreatmentsSection.tsx",
          lineNumber: 61,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: treatmentsData.map((item) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 backdrop-blur-md transition-all hover:-translate-y-1 flex flex-col justify-between",
            children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                    lineNumber: 82,
                    columnNumber: 19
                  }, this) }, void 0, false, {
                    fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                    lineNumber: 81,
                    columnNumber: 17
                  }, this),
                  item.badge && /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30", children: item.badge }, void 0, false, {
                    fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                    lineNumber: 85,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                  lineNumber: 80,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("h3", { className: "font-semibold text-base text-slate-100 mb-2", children: item.h }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                  lineNumber: 91,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-light leading-relaxed mb-4", children: item.p }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                  lineNumber: 92,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                lineNumber: 79,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-medium text-teal-300", children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                  lineNumber: 96,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: item.recoveryTime }, void 0, false, {
                  fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                  lineNumber: 97,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TreatmentsSection.tsx",
                lineNumber: 95,
                columnNumber: 13
              }, this)
            ]
          },
          item.id,
          true,
          {
            fileName: "/app/applet/src/components/TreatmentsSection.tsx",
            lineNumber: 75,
            columnNumber: 11
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/TreatmentsSection.tsx",
          lineNumber: 73,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/TreatmentsSection.tsx",
      lineNumber: 53,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRyZWF0bWVudHNTZWN0aW9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVHJlYXRtZW50SXRlbSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IFphcCwgU2hpZWxkQ2hlY2ssIEFjdGl2aXR5LCBIZWFydFB1bHNlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IG1vdGlvbiB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBjb25zdCB0cmVhdG1lbnRzRGF0YTogVHJlYXRtZW50SXRlbVtdID0gW1xuICB7XG4gICAgaWQ6ICdsaHAnLFxuICAgIGg6ICdMSFDCriDigJMgTGFzZXJvd2UgbGVjemVuaWUgaGVtb3JvaWTDs3cnLFxuICAgIHA6ICdaYW1rbmnEmWNpZSBndXprw7N3IGtyd2F3bmljenljaCDFm3dpYXTFgmVtIGxhc2VyYSBvZCB3ZXduxIV0cnogcG9kIGtvbnRyb2zEhSBVU0cuIEJleiBjacSZY2lhIHRrYW5raSwgYmV6IGJvbGVzbnljaCBzenfDs3csIHphY2hvd2FuaWUgYW5hdG9taWN6bmVqIHBvZHVzemVjemtpIG9kYnl0bmljemVqLicsXG4gICAgYmFkZ2U6ICdTdGFuZGFyZCBDTUwnLFxuICAgIHJlY292ZXJ5VGltZTogJzEtMyBkbmkgcG93csOzdCBkbyBha3R5d25vxZtjaScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2ZpbGFjJyxcbiAgICBoOiAnRmlMYUPCriDigJMgTGFzZXJvd2UgemFteWthbmllIHByemV0b2snLFxuICAgIHA6ICdQcmVjeXp5am5hIGtvYWd1bGFjamEgbGFzZXJvd2EgcHJvbWllbmnFm2NpZSBlbWl0dWrEhWN5bSDFm3dpYXTFgm93b2RlbSB3xYLDs2tuYSBwcnpldG9raSBvZGJ5dHUgeiBiZXp3emdsxJlkbnltIG9zemN6xJlkemVuaWVtIG1pxJnFm25pIHp3aWVyYWN6eS4nLFxuICAgIGJhZGdlOiAnQmV6aW53YXp5am5lJyxcbiAgICByZWNvdmVyeVRpbWU6ICdTenlia2llIGdvamVuaWUnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdzaWxhYycsXG4gICAgaDogJ1NpTGFDwq4g4oCTIFRvcmJpZWwgcGlsb25pZGFsbmEgKG9nb25vd2EpJyxcbiAgICBwOiAnQWJsYWNqYSBsYXNlcm93YSB0b3JiaWVsaSBrcnp5xbxvd28tZ3V6aWN6bmVqLiBBbHRlcm5hdHl3YSBkbGEgcm96bGVnxYJ5Y2ggd3ljacSZxIcgY2hpcnVyZ2ljem55Y2ggd3ltYWdhasSFY3ljaCB3aWVsb21pZXNpxJljem5lZ28gZ29qZW5pYSByYW55LicsXG4gICAgYmFkZ2U6ICdJbm5vd2FjamEnLFxuICAgIHJlY292ZXJ5VGltZTogJ01pbmltYWxuYSBibGl6bmEnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdzemN6ZWxpbmEnLFxuICAgIGg6ICdTemN6ZWxpbmEgb2RieXR1IOKAkyBsZWN6ZW5pZSB6YWNob3dhd2N6ZSAmIGxhc2Vyb3dlJyxcbiAgICBwOiAnQ2hhcmFrdGVyeXp1amUgc2nEmSBvc3RyeW0ga8WCdWrEhWN5bSBiw7NsZW0gaSBqYXNuxIUga3J3acSFLiBXem1vY25pb25lIGxlY3plbmllIG1hxZtjaWFtaSByZWxha3N1asSFY3ltaSB6d2llcmFjeiBsdWIgbWHFgm9pbndhenlqbmUgdXdvbG5pZW5pZSBza3VyY3p1LicsXG4gICAgYmFkZ2U6ICdVbGdhIHcgYsOzbHUnLFxuICAgIHJlY292ZXJ5VGltZTogJ05hdHljaG1pYXN0b3d5IGtvbWZvcnQnLFxuICB9LFxuICB7XG4gICAgaWQ6ICdmYWxkeScsXG4gICAgaDogJ0ZhxYJkeSBicnplxbxuZSAmIHBsYXN0eWthIG9kYnl0dScsXG4gICAgcDogJ0NoaXJ1cmdpY3puYSBvcmF6IGxhc2Vyb3dhIHBsYXN0eWthIGZhxYJkw7N3IHNrw7NyeSBicnplxbxuZWogcG8gcHJ6ZWJ5dHljaCB6YWtyemVwYWNoIGx1YiBjacSFxbxhY2ggdyBjZWx1IHByenl3csOzY2VuaWEgaGlnaWVueSBpIGVzdGV0eWtpLicsXG4gICAgYmFkZ2U6ICdFc3RldHlrYSAmIEhpZ2llbmEnLFxuICAgIHJlY292ZXJ5VGltZTogJ1phYmllZyBqZWRub2RuaW93eScsXG4gIH0sXG4gIHtcbiAgICBpZDogJ2R5c2Jpb3phJyxcbiAgICBoOiAnRHlzYmlvemEgJiBmbG9yYSBqZWxpdG93YSB3IHByb2t0b2xvZ2lpJyxcbiAgICBwOiAnUHJvYmxlbSBjesSZc3RvIG9waXN5d2FueSBixYLEmWRuaWUgdyBpbnRlcm5lY2llLiBPZmVydWrEmSByYWNqb25hbG5lIG9tw7N3aWVuaWUgc3RhbnUgamVsaXQgb3BhcnRlIHd5xYLEhWN6bmllIG5hIGRvd29kYWNoIG1lZHljem55Y2ggKEVCTSkuJyxcbiAgICBiYWRnZTogJ0RpYWdub3N0eWthIEVCTScsXG4gICAgcmVjb3ZlcnlUaW1lOiAnVGVyYXBpYSBjZWxvd2FuYScsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgVHJlYXRtZW50c1NlY3Rpb246IFJlYWN0LkZDID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxtb3Rpb24uc2VjdGlvblxuICAgICAgY2xhc3NOYW1lPVwicHktMjAgcHgtNCBzbTpweC02IGxnOnB4LTggbWF4LXctNnhsIG14LWF1dG9cIlxuICAgICAgaWQ9XCJsZWN6ZW5pZVwiXG4gICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDM1IH19XG4gICAgICB3aGlsZUluVmlldz17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICB2aWV3cG9ydD17eyBvbmNlOiB0cnVlLCBtYXJnaW46ICctNjBweCcgfX1cbiAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuNiwgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0gfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1heC13LTN4bCBteC1hdXRvIG1iLTEyXCI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtaW5kaWdvLTQwMCBtYi0yXCI+XG4gICAgICAgICAgTW/FvGxpd2/Fm2NpIGxlY3plbmlhXG4gICAgICAgIDwvcD5cbiAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtc2VyaWYgdGV4dC0yeGwgc206dGV4dC00eGwgZm9udC1ub3JtYWwgdGV4dC1zbGF0ZS0xMDAgbWItNFwiPlxuICAgICAgICAgIFphYXdhbnNvd2FuZSBsZWN6ZW5pZSBsYXNlcm93ZSBpIHByb2t0b2xvZ2ljem5lXG4gICAgICAgIDwvaDI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gc206dGV4dC1iYXNlIHRleHQtc2xhdGUtMzAwIGZvbnQtbGlnaHQgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgxYHEhWN6xJkgaW5ub3dhY2plIHRlY2hub2xvZ2ljem5lIHogaW5keXdpZHVhbG55bSBwb2RlasWbY2llbS4gUHJ6ZXogMTYgbGF0IHByYWN5IG5pZSB3aWR6aWHFgmVtIGR3w7NjaCBpZGVudHljem55Y2ggcHJ6eXBhZGvDs3cg4oCUIGthxbxkeSB6YWJpZWcgZG9zdG9zb3d1asSZIGRvIFR3b2plaiBhbmF0b21paS5cbiAgICAgICAgPC9wPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNVwiPlxuICAgICAgICB7dHJlYXRtZW50c0RhdGEubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItaW5kaWdvLTUwMC81MCBiYWNrZHJvcC1ibHVyLW1kIHRyYW5zaXRpb24tYWxsIGhvdmVyOi10cmFuc2xhdGUteS0xIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBtYi0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQtbGcgYmctaW5kaWdvLTk1MC84MCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvMzAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1pbmRpZ28tNDAwXCI+XG4gICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtpdGVtLmJhZGdlICYmIChcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgYmctaW5kaWdvLTUwMC8yMCB0ZXh0LWluZGlnby0zMDAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzMwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtpdGVtLmJhZGdlfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtYmFzZSB0ZXh0LXNsYXRlLTEwMCBtYi0yXCI+e2l0ZW0uaH08L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbGlnaHQgbGVhZGluZy1yZWxheGVkIG1iLTRcIj57aXRlbS5wfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtWzExcHhdIGZvbnQtbWVkaXVtIHRleHQtdGVhbC0zMDBcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2l0ZW0ucmVjb3ZlcnlUaW1lfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvbW90aW9uLnNlY3Rpb24+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUE2RFE7QUEzRFIsU0FBUyxLQUFLLG1CQUF5QztBQUN2RCxTQUFTLGNBQWM7QUFFaEIsYUFBTSxpQkFBa0M7QUFBQSxFQUM3QztBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsT0FBTztBQUFBLElBQ1AsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osR0FBRztBQUFBLElBQ0gsR0FB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