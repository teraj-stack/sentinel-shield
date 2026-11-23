import __vite__cjsImport0_react_jsxDevRuntime from "/apps/nextgen_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c2c0e3b9"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Sparkles
} from "/apps/nextgen_clinic/node_modules/.vite/deps/lucide-react.js?v=93a6f22a";
export const Footer = ({
  lang,
  onSelectDepartment,
  onOpenBooking
}) => {
  return /* @__PURE__ */ jsxDEV("footer", { className: "bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md", children: /* @__PURE__ */ jsxDEV(Building2, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 35,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 34,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-black tracking-tight text-white uppercase", children: [
              "Next Generation ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-sky-400", children: "Clinic" }, void 0, false, {
                fileName: "/app/applet/src/components/Footer.tsx",
                lineNumber: 39,
                columnNumber: 35
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 38,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 uppercase font-semibold", children: "Medycyna Przyszłości" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 41,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 37,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 33,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 leading-relaxed", children: lang === "pl" ? "Nowoczesna klinika medyczna łącząca zaawansowaną diagnostykę z mało-inwazyjną chirurgią laserową i flebologią." : "State-of-the-art medical clinic uniting advanced diagnostics with minimally invasive laser surgery and phlebology." }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 47,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs text-emerald-400 font-medium", children: [
          /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-emerald-500" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 54,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "Certyfikat ISO 9001:2015 Medical" : "ISO 9001:2015 Medical Certified" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 55,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 53,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 32,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold uppercase tracking-wider text-white", children: lang === "pl" ? "Specjalizacje" : "Specializations" }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 61,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2 text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("button", { onClick: () => onSelectDepartment("proctology"), className: "hover:text-sky-400 transition-colors", children: lang === "pl" ? "Proktologia Laserowa" : "Laser Proctology" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 66,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 65,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("button", { onClick: () => onSelectDepartment("surgery"), className: "hover:text-sky-400 transition-colors", children: lang === "pl" ? "Chirurgia Ogólna i Estetyczna" : "General & Aesthetic Surgery" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 71,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 70,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("button", { onClick: () => onSelectDepartment("phlebology"), className: "hover:text-sky-400 transition-colors", children: lang === "pl" ? "Flebologia i USG Doppler" : "Phlebology & Doppler USG" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 76,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 75,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("li", { children: /* @__PURE__ */ jsxDEV("button", { onClick: () => onSelectDepartment("shop"), className: "hover:text-amber-400 transition-colors", children: lang === "pl" ? "Sklep Medyczny (Apothecary)" : "Clinic Apothecary Store" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 81,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 80,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 64,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 60,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold uppercase tracking-wider text-white", children: lang === "pl" ? "Kontakt & Godziny" : "Contact & Hours" }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(MapPin, { className: "w-4 h-4 text-sky-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 95,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Al. Jerozolimskie 180, 02-486 Warszawa" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 96,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 94,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Phone, { className: "w-4 h-4 text-sky-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 99,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "+48 22 123 45 67 / +48 600 100 200" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 100,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 98,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Mail, { className: "w-4 h-4 text-sky-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 103,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "rejestracja@nextgenclinic.pl" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 104,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 102,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "flex items-center gap-2 pt-1 text-slate-300", children: [
            /* @__PURE__ */ jsxDEV(Clock, { className: "w-4 h-4 text-amber-400 shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 107,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Pon - Pt: 08:00 - 20:00, Sob: 09:00 - 15:00" }, void 0, false, {
              fileName: "/app/applet/src/components/Footer.tsx",
              lineNumber: 108,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 106,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 93,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 89,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 116,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: lang === "pl" ? "E-Rejestracja 24/7" : "24/7 E-Registration" }, void 0, false, {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 117,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 115,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: lang === "pl" ? "Szybka rezerwacja terminów bez oczekiwania na linii." : "Instant visit booking without holding on the line." }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 119,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onOpenBooking,
            className: "w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md transition-colors",
            children: lang === "pl" ? "Umów Wizytę Teraz" : "Book Appointment"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Footer.tsx",
            lineNumber: 122,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 114,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Footer.tsx",
      lineNumber: 29,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4", children: [
      /* @__PURE__ */ jsxDEV("p", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " Next Generation Clinic Sp. z o.o. Wszystkie prawa zastrzeżone."
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 134,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxDEV("a", { href: "#", className: "hover:text-slate-300 transition-colors", children: "Polityka Prywatności" }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 136,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#", className: "hover:text-slate-300 transition-colors", children: "Regulamin Usług" }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 137,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("a", { href: "#", className: "hover:text-slate-300 transition-colors", children: "Standardy RODO" }, void 0, false, {
          fileName: "/app/applet/src/components/Footer.tsx",
          lineNumber: 138,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Footer.tsx",
        lineNumber: 135,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Footer.tsx",
      lineNumber: 133,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Footer.tsx",
    lineNumber: 26,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Footer.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvb3Rlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBCdWlsZGluZzIsIFxuICBNYXBQaW4sIFxuICBQaG9uZSwgXG4gIE1haWwsIFxuICBDbG9jaywgXG4gIFNoaWVsZCwgXG4gIFNwYXJrbGVzLFxuICBFeHRlcm5hbExpbmtcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIEZvb3RlclByb3BzIHtcbiAgbGFuZzogJ3BsJyB8ICdlbic7XG4gIG9uU2VsZWN0RGVwYXJ0bWVudDogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uT3BlbkJvb2tpbmc6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBGb290ZXI6IFJlYWN0LkZDPEZvb3RlclByb3BzPiA9ICh7XG4gIGxhbmcsXG4gIG9uU2VsZWN0RGVwYXJ0bWVudCxcbiAgb25PcGVuQm9va2luZ1xufSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtMzAwIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgcHQtMTYgcGItMTJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gcHgtNCBzbTpweC02IGxnOnB4LTggc3BhY2UteS0xMlwiPlxuICAgICAgICBcbiAgICAgICAgey8qIE1haW4gRm9vdGVyIEdyaWQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtNCBnYXAtOFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBDb2x1bW4gMTogQnJhbmQgSW5mbyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXRyIGZyb20tc2t5LTUwMCB0by1pbmRpZ28tNjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgZm9udC1ib2xkIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICAgIDxCdWlsZGluZzIgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIHVwcGVyY2FzZVwiPlxuICAgICAgICAgICAgICAgICAgTmV4dCBHZW5lcmF0aW9uIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMFwiPkNsaW5pYzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIE1lZHljeW5hIFByenlzesWCb8WbY2lcbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnXG4gICAgICAgICAgICAgICAgPyAnTm93b2N6ZXNuYSBrbGluaWthIG1lZHljem5hIMWCxIVjesSFY2EgemFhd2Fuc293YW7EhSBkaWFnbm9zdHlrxJkgeiBtYcWCby1pbndhenlqbsSFIGNoaXJ1cmdpxIUgbGFzZXJvd8SFIGkgZmxlYm9sb2dpxIUuJ1xuICAgICAgICAgICAgICAgIDogJ1N0YXRlLW9mLXRoZS1hcnQgbWVkaWNhbCBjbGluaWMgdW5pdGluZyBhZHZhbmNlZCBkaWFnbm9zdGljcyB3aXRoIG1pbmltYWxseSBpbnZhc2l2ZSBsYXNlciBzdXJnZXJ5IGFuZCBwaGxlYm9sb2d5Lid9XG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNTAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2xhbmcgPT09ICdwbCcgPyAnQ2VydHlmaWthdCBJU08gOTAwMToyMDE1IE1lZGljYWwnIDogJ0lTTyA5MDAxOjIwMTUgTWVkaWNhbCBDZXJ0aWZpZWQnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIENvbHVtbiAyOiBEaXZpc2lvbnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdTcGVjamFsaXphY2plJyA6ICdTcGVjaWFsaXphdGlvbnMnfVxuICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdERlcGFydG1lbnQoJ3Byb2N0b2xvZ3knKX0gY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1za3ktNDAwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdQcm9rdG9sb2dpYSBMYXNlcm93YScgOiAnTGFzZXIgUHJvY3RvbG9neSd9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0RGVwYXJ0bWVudCgnc3VyZ2VyeScpfSBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LXNreS00MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0NoaXJ1cmdpYSBPZ8OzbG5hIGkgRXN0ZXR5Y3puYScgOiAnR2VuZXJhbCAmIEFlc3RoZXRpYyBTdXJnZXJ5J31cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25TZWxlY3REZXBhcnRtZW50KCdwaGxlYm9sb2d5Jyl9IGNsYXNzTmFtZT1cImhvdmVyOnRleHQtc2t5LTQwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnRmxlYm9sb2dpYSBpIFVTRyBEb3BwbGVyJyA6ICdQaGxlYm9sb2d5ICYgRG9wcGxlciBVU0cnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdERlcGFydG1lbnQoJ3Nob3AnKX0gY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1hbWJlci00MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1NrbGVwIE1lZHljem55IChBcG90aGVjYXJ5KScgOiAnQ2xpbmljIEFwb3RoZWNhcnkgU3RvcmUnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDb2x1bW4gMzogQ29udGFjdCAmIEhvdXJzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnS29udGFrdCAmIEdvZHppbnknIDogJ0NvbnRhY3QgJiBIb3Vycyd9XG4gICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxNYXBQaW4gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkFsLiBKZXJvem9saW1za2llIDE4MCwgMDItNDg2IFdhcnN6YXdhPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPFBob25lIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1za3ktNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj4rNDggMjIgMTIzIDQ1IDY3IC8gKzQ4IDYwMCAxMDAgMjAwPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPE1haWwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPnJlamVzdHJhY2phQG5leHRnZW5jbGluaWMucGw8L3NwYW4+XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHQtMSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb24gLSBQdDogMDg6MDAgLSAyMDowMCwgU29iOiAwOTowMCAtIDE1OjAwPC9zcGFuPlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBDb2x1bW4gNDogUXVpY2sgQWN0aW9uIEJveCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS04MDAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAvODAgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZSB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57bGFuZyA9PT0gJ3BsJyA/ICdFLVJlamVzdHJhY2phIDI0LzcnIDogJzI0LzcgRS1SZWdpc3RyYXRpb24nfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdTenlia2EgcmV6ZXJ3YWNqYSB0ZXJtaW7Ds3cgYmV6IG9jemVraXdhbmlhIG5hIGxpbmlpLicgOiAnSW5zdGFudCB2aXNpdCBib29raW5nIHdpdGhvdXQgaG9sZGluZyBvbiB0aGUgbGluZS4nfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbk9wZW5Cb29raW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMiByb3VuZGVkLXhsIGJnLXNreS02MDAgaG92ZXI6Ymctc2t5LTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIHNoYWRvdy1tZCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1Vtw7N3IFdpenl0xJkgVGVyYXonIDogJ0Jvb2sgQXBwb2ludG1lbnQnfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEJvdHRvbSBMZWdhbCBiYXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtOCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTUwMCBnYXAtNFwiPlxuICAgICAgICAgIDxwPsKpIHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IE5leHQgR2VuZXJhdGlvbiBDbGluaWMgU3AuIHogby5vLiBXc3p5c3RraWUgcHJhd2EgemFzdHJ6ZcW8b25lLjwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTRcIj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1zbGF0ZS0zMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5Qb2xpdHlrYSBQcnl3YXRub8WbY2k8L2E+XG4gICAgICAgICAgICA8YSBocmVmPVwiI1wiIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtc2xhdGUtMzAwIHRyYW5zaXRpb24tY29sb3JzXCI+UmVndWxhbWluIFVzxYJ1ZzwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1zbGF0ZS0zMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5TdGFuZGFyZHkgUk9ETzwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZm9vdGVyPlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBa0NnQjtBQWpDaEI7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FFSztBQVFBLGFBQU0sU0FBZ0MsQ0FBQztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFNO0FBQ0osU0FDRSx1QkFBQyxZQUFPLFdBQVUscUVBQ2hCLGlDQUFDLFNBQUksV0FBVSxxREFHYjtBQUFBLDJCQUFDLFNBQUksV0FBVSx5Q0FHYjtBQUFBLDZCQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsaUNBQUMsU0FBSSxXQUFVLHFJQUNiLGlDQUFDLGFBQVUsV0FBVSxhQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUErQixLQURqQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQSx1QkFBQyxTQUNDO0FBQUEsbUNBQUMsVUFBSyxXQUFVLDBEQUF5RDtB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