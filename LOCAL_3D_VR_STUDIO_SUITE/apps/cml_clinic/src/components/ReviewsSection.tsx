import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import { Star } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
export const reviewsData = [
  {
    text: "Świetny lekarz z ogromnym zaangażowaniem. Szczegółowo wyjaśnia problem, tłumaczy dokładnie każdy krok leczenia laserowego LHP i pozostaje w pełnym kontakcie po wizycie.",
    a: "Agata M.",
    m: "Konsultacja proktologiczna · Styczeń 2026",
    rating: 5
  },
  {
    text: "W bardzo trudnej i stresującej sytuacji doktor Jan Bujok pozwolił mi poczuć spokój. Dzięki trafnej diagnozie poczułem, że jest światło w tunelu. Przeprowadzony zabieg był bezbolesny.",
    a: "Igor S.",
    m: "Konsultacja chirurgiczna · Maj 2025",
    rating: 5
  },
  {
    text: "Rzeczowo wyjaśnia schorzenia, bez zbędnego żargonu i z najwyższym szacunkiem. Pacjent czuje się w klinice w pełni zaopiekowany i bezpieczny.",
    a: "Marcin K.",
    m: "Zabieg LHP · Marzec 2026",
    rating: 5
  },
  {
    text: "Polecam z całego serca za empatyczne podejście, szczegółowe wyjaśnienia procedury FiLaC oraz bezcenne wsparcie w okresie rekonwalescencji.",
    a: "Wiktoria P.",
    m: "Konsultacja + Zabieg · Wrzesień 2025",
    rating: 5
  }
];
export const ReviewsSection = () => {
  return /* @__PURE__ */ jsxDEV(
    motion.section,
    {
      className: "py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto",
      id: "opinie",
      initial: { opacity: 0, y: 35 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-center max-w-2xl mx-auto mb-10", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2", children: "Opinie pacjentów" }, void 0, false, {
            fileName: "/app/applet/src/components/ReviewsSection.tsx",
            lineNumber: 44,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-4xl font-normal text-slate-100 mb-4", children: "Co mówią moi pacjenci" }, void 0, false, {
            fileName: "/app/applet/src/components/ReviewsSection.tsx",
            lineNumber: 47,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 shadow-md", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-amber-400", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxDEV(Star, { className: "w-4 h-4 fill-amber-400" }, i, false, {
              fileName: "/app/applet/src/components/ReviewsSection.tsx",
              lineNumber: 54,
              columnNumber: 15
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/ReviewsSection.tsx",
              lineNumber: 52,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-slate-100", children: "5.0 / 5" }, void 0, false, {
              fileName: "/app/applet/src/components/ReviewsSection.tsx",
              lineNumber: 57,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 border-l border-slate-700 pl-3", children: "312+ weryfikowanych opinii · ZnanyLekarz.pl" }, void 0, false, {
              fileName: "/app/applet/src/components/ReviewsSection.tsx",
              lineNumber: 58,
              columnNumber: 11
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ReviewsSection.tsx",
            lineNumber: 51,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ReviewsSection.tsx",
          lineNumber: 43,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: reviewsData.map((item, idx) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 backdrop-blur-md flex flex-col justify-between",
            children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-amber-400 mb-3", children: [...Array(item.rating)].map((_, i) => /* @__PURE__ */ jsxDEV(Star, { className: "w-3.5 h-3.5 fill-amber-400" }, i, false, {
                  fileName: "/app/applet/src/components/ReviewsSection.tsx",
                  lineNumber: 73,
                  columnNumber: 19
                }, this)) }, void 0, false, {
                  fileName: "/app/applet/src/components/ReviewsSection.tsx",
                  lineNumber: 71,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 font-light italic leading-relaxed mb-4", children: [
                  "„",
                  item.text,
                  "”"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ReviewsSection.tsx",
                  lineNumber: 76,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ReviewsSection.tsx",
                lineNumber: 70,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-200", children: item.a }, void 0, false, {
                  fileName: "/app/applet/src/components/ReviewsSection.tsx",
                  lineNumber: 82,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-500 font-mono", children: item.m }, void 0, false, {
                  fileName: "/app/applet/src/components/ReviewsSection.tsx",
                  lineNumber: 83,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ReviewsSection.tsx",
                lineNumber: 81,
                columnNumber: 13
              }, this)
            ]
          },
          idx,
          true,
          {
            fileName: "/app/applet/src/components/ReviewsSection.tsx",
            lineNumber: 66,
            columnNumber: 11
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/ReviewsSection.tsx",
          lineNumber: 64,
          columnNumber: 7
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/ReviewsSection.tsx",
      lineNumber: 35,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJldmlld3NTZWN0aW9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgVGVzdGltb25pYWxJdGVtIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgU3RhciwgTWVzc2FnZVNxdWFyZSB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgcmV2aWV3c0RhdGE6IFRlc3RpbW9uaWFsSXRlbVtdID0gW1xuICB7XG4gICAgdGV4dDogJ8Wad2lldG55IGxla2FyeiB6IG9ncm9tbnltIHphYW5nYcW8b3dhbmllbS4gU3pjemVnw7PFgm93byB3eWphxZtuaWEgcHJvYmxlbSwgdMWCdW1hY3p5IGRva8WCYWRuaWUga2HFvGR5IGtyb2sgbGVjemVuaWEgbGFzZXJvd2VnbyBMSFAgaSBwb3pvc3RhamUgdyBwZcWCbnltIGtvbnRha2NpZSBwbyB3aXp5Y2llLicsXG4gICAgYTogJ0FnYXRhIE0uJyxcbiAgICBtOiAnS29uc3VsdGFjamEgcHJva3RvbG9naWN6bmEgwrcgU3R5Y3plxYQgMjAyNicsXG4gICAgcmF0aW5nOiA1LFxuICB9LFxuICB7XG4gICAgdGV4dDogJ1cgYmFyZHpvIHRydWRuZWogaSBzdHJlc3VqxIVjZWogc3l0dWFjamkgZG9rdG9yIEphbiBCdWpvayBwb3p3b2xpxYIgbWkgcG9jenXEhyBzcG9rw7NqLiBEemnEmWtpIHRyYWZuZWogZGlhZ25vemllIHBvY3p1xYJlbSwgxbxlIGplc3QgxZt3aWF0xYJvIHcgdHVuZWx1LiBQcnplcHJvd2Fkem9ueSB6YWJpZWcgYnnFgiBiZXpib2xlc255LicsXG4gICAgYTogJ0lnb3IgUy4nLFxuICAgIG06ICdLb25zdWx0YWNqYSBjaGlydXJnaWN6bmEgwrcgTWFqIDIwMjUnLFxuICAgIHJhdGluZzogNSxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdSemVjem93byB3eWphxZtuaWEgc2Nob3J6ZW5pYSwgYmV6IHpixJlkbmVnbyDFvGFyZ29udSBpIHogbmFqd3nFvHN6eW0gc3phY3Vua2llbS4gUGFjamVudCBjenVqZSBzacSZIHcga2xpbmljZSB3IHBlxYJuaSB6YW9waWVrb3dhbnkgaSBiZXpwaWVjem55LicsXG4gICAgYTogJ01hcmNpbiBLLicsXG4gICAgbTogJ1phYmllZyBMSFAgwrcgTWFyemVjIDIwMjYnLFxuICAgIHJhdGluZzogNSxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdQb2xlY2FtIHogY2HFgmVnbyBzZXJjYSB6YSBlbXBhdHljem5lIHBvZGVqxZtjaWUsIHN6Y3plZ8OzxYJvd2Ugd3lqYcWbbmllbmlhIHByb2NlZHVyeSBGaUxhQyBvcmF6IGJlemNlbm5lIHdzcGFyY2llIHcgb2tyZXNpZSByZWtvbndhbGVzY2VuY2ppLicsXG4gICAgYTogJ1dpa3RvcmlhIFAuJyxcbiAgICBtOiAnS29uc3VsdGFjamEgKyBaYWJpZWcgwrcgV3J6ZXNpZcWEIDIwMjUnLFxuICAgIHJhdGluZzogNSxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBSZXZpZXdzU2VjdGlvbjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPG1vdGlvbi5zZWN0aW9uXG4gICAgICBjbGFzc05hbWU9XCJweS0yMCBweC00IHNtOnB4LTYgbGc6cHgtOCBtYXgtdy02eGwgbXgtYXV0b1wiXG4gICAgICBpZD1cIm9waW5pZVwiXG4gICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDM1IH19XG4gICAgICB3aGlsZUluVmlldz17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICB2aWV3cG9ydD17eyBvbmNlOiB0cnVlLCBtYXJnaW46ICctNjBweCcgfX1cbiAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuNiwgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0gfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIG1heC13LTJ4bCBteC1hdXRvIG1iLTEwXCI+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IHRleHQtaW5kaWdvLTQwMCBtYi0yXCI+XG4gICAgICAgICAgT3BpbmllIHBhY2plbnTDs3dcbiAgICAgICAgPC9wPlxuICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LTJ4bCBzbTp0ZXh0LTR4bCBmb250LW5vcm1hbCB0ZXh0LXNsYXRlLTEwMCBtYi00XCI+XG4gICAgICAgICAgQ28gbcOzd2nEhSBtb2kgcGFjamVuY2lcbiAgICAgICAgPC9oMj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBweC00IHB5LTIgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3ctbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtYW1iZXItNDAwXCI+XG4gICAgICAgICAgICB7Wy4uLkFycmF5KDUpXS5tYXAoKF8sIGkpID0+IChcbiAgICAgICAgICAgICAgPFN0YXIga2V5PXtpfSBjbGFzc05hbWU9XCJ3LTQgaC00IGZpbGwtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwXCI+NS4wIC8gNTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGJvcmRlci1sIGJvcmRlci1zbGF0ZS03MDAgcGwtM1wiPlxuICAgICAgICAgICAgMzEyKyB3ZXJ5Zmlrb3dhbnljaCBvcGluaWkgwrcgWm5hbnlMZWthcnoucGxcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICB7cmV2aWV3c0RhdGEubWFwKChpdGVtLCBpZHgpID0+IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvNjAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCBiYWNrZHJvcC1ibHVyLW1kIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtYW1iZXItNDAwIG1iLTNcIj5cbiAgICAgICAgICAgICAgICB7Wy4uLkFycmF5KGl0ZW0ucmF0aW5nKV0ubWFwKChfLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8U3RhciBrZXk9e2l9IGNsYXNzTmFtZT1cInctMy41IGgtMy41IGZpbGwtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBmb250LWxpZ2h0IGl0YWxpYyBsZWFkaW5nLXJlbGF4ZWQgbWItNFwiPlxuICAgICAgICAgICAgICAgIOKAnntpdGVtLnRleHR94oCdXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMjAwXCI+e2l0ZW0uYX08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPntpdGVtLm19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC9tb3Rpb24uc2VjdGlvbj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTJDUTtBQXpDUixTQUFTLFlBQTJCO0FBQ3BDLFNBQVMsY0FBYztBQUVoQixhQUFNLGNBQWlDO0FBQUEsRUFDNUM7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILFFBQVE7QUFBQSxFQUNWO0FBQ0Y7QUFFTyxhQUFNLGlCQUEyQixNQUFNO0FBQzVDLFNBQ0U7QUFBQSxJQUFDLE9BQU87QUFBQSxJQUFQO0FBQUEsTUFDQyxXQUFVO0FBQUEsTUFDVixJQUFHO0FBQUEsTUFDSCxTQUFTLEVBQUUsU0FBUyxHQUFHLEdBQUcsR0FBRztBQUFBLE1BQzdCLGFBQWEsRUFBRSxTQUFTLEdBQUcsR0FBRyxFQUFFO0FBQUEsTUFDaEMsVUFBVSxFQUFFLE1BQU0sTUFBTSxRQUFRLFFBQVE7QUFBQSxNQUN4QyxZQUFZLEVBQUUsVUFBVSxLQUFLLE1BQU0sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEVBQUU7QUFBQSxNQUVyRDtBQUFBLCtCQUFDLFNBQUksV0FBVSx1Q0FDYjtBQUFBLGlDQUFDLE9BQUUsV0FBVSx3RUFBdUUsZ0NBQXBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBLHVCQUFDLFFBQUcsV0FBVSxtRUFBa0UscUNBQWhGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUVBLHVCQUFDLFNBQUksV0FBVSx3R0FDYjtBQUFBLG1DQUFDLFNBQUksV0FBVSwwQ0FDWixXQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxNQUNyQix1QkFBQyxRQUFhLFdBQVUsNEJBQWIsR0FBWDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFpRCxDQUNsRCxLQUhIO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBSUE7QUFBQSxZQUNBLHVCQUFDLFVBQUssV0FBVSxvQ0FBbUMsdUJBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTBEO0FBQUEsWUFDMUQsdUJBQUMsVUFBSyxXQUFVLHlEQUF3RCwyREFBeEU7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFFQTtBQUFBLGVBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFVQTtBQUFBLGFBbEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFtQkE7QUFBQSxRQUVBLHVCQUFDLFNBQUksV0FBVSx5Q0FDWixzQkFBWSxJQUFJLENBQUMsTUFBTSxRQUN0QjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBRUMsV0FBVTtBQUFBLFlBRVY7QUFBQSxxQ0FBQyxTQUNDO0FBQUEsdUNBQUMsU0FBSSxXQUFVLCtDQUNaLFdBQUMsR0FBRyxNQUFNLEtBQUssTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsTUFDL0IsdUJBQUMsUUFBYSxXQUFVLGdDQUFiLEdBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBcUQsQ0FDdEQsS0FISDtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUlBO0FBQUEsZ0JBQ0EsdUJBQUMsT0FBRSxXQUFVLDRFQUEyRTtBQUFBO0FBQUEsa0JBQ3BGLEtBQUs7QUFBQSxrQkFBSztBQUFBLHFCQURkO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRUE7QUFBQSxtQkFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQVNBO0FBQUEsY0FFQSx1QkFBQyxTQUFJLFdBQVUsK0VBQ2I7QUFBQSx1Q0FBQyxVQUFLLFdBQVUsZ0NBQWdDLGVBQUssS0FBckQ7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFBdUQ7QUFBQSxnQkFDdkQsdUJBQUMsVUFBSyxXQUFVLHdDQUF3QyxlQUFLLEtBQTdEO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQStEO0FBQUEsbUJBRmpFO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBR0E7QUFBQTtBQUFBO0FBQUEsVUFqQks7QUFBQSxVQURQO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFtQkEsQ0FDRCxLQXRCSDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBdUJBO0FBQUE7QUFBQTtBQUFBLElBcERGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXFEQTtBQUVKOyIsIm5hbWVzIjpbXX0=