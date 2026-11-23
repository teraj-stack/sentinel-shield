import __vite__cjsImport0_react_jsxDevRuntime from "/apps/nextgen_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c2c0e3b9"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import {
  Building2,
  PhoneCall,
  Calendar,
  ShoppingBag,
  Sun,
  Moon,
  Sunrise,
  Sunset
} from "/apps/nextgen_clinic/node_modules/.vite/deps/lucide-react.js?v=93a6f22a";
export const Navbar = ({
  activeTimeOfDay,
  onSelectTimeOfDay,
  cartCount,
  onOpenShop,
  onOpenBooking,
  lang,
  onToggleLang,
  onSelectDepartment
}) => {
  const times = [
    { id: "dawn", label: lang === "pl" ? "Świt" : "Dawn", icon: /* @__PURE__ */ jsxDEV(Sunrise, { className: "w-3.5 h-3.5" }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 38,
      columnNumber: 65
    }, this) },
    { id: "noon", label: lang === "pl" ? "Dzień" : "Noon", icon: /* @__PURE__ */ jsxDEV(Sun, { className: "w-3.5 h-3.5" }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 39,
      columnNumber: 66
    }, this) },
    { id: "golden", label: lang === "pl" ? "Złota godzina" : "Golden", icon: /* @__PURE__ */ jsxDEV(Sunset, { className: "w-3.5 h-3.5" }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 40,
      columnNumber: 78
    }, this) },
    { id: "twilight", label: lang === "pl" ? "Zmierzch" : "Twilight", icon: /* @__PURE__ */ jsxDEV(Moon, { className: "w-3.5 h-3.5" }, void 0, false, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 41,
      columnNumber: 77
    }, this) }
  ];
  return /* @__PURE__ */ jsxDEV("header", { className: "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-slate-200/80 shadow-xs", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between h-20", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 cursor-pointer group", onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }), children: [
      /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-sky-600 via-indigo-600 to-teal-400 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300", children: [
        /* @__PURE__ */ jsxDEV(Building2, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 52,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-300 blur-[1px] animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 54,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 51,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl font-black tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 bg-clip-text text-transparent uppercase font-sans", children: "Next Generation" }, void 0, false, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 58,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200/60 uppercase tracking-wider", children: "Clinic" }, void 0, false, {
            fileName: "/app/applet/src/components/Navbar.tsx",
            lineNumber: 61,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 57,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] font-medium text-slate-500 tracking-wider uppercase", children: lang === "pl" ? "Proktologia • Chirurgia • Flebologia" : "Proctology • Surgery • Phlebology" }, void 0, false, {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 65,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 56,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 50,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("nav", { className: "hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onSelectDepartment("proctology"),
          className: "px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-white hover:shadow-xs transition-all",
          children: lang === "pl" ? "Proktologia" : "Proctology"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 73,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onSelectDepartment("surgery"),
          className: "px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-white hover:shadow-xs transition-all",
          children: lang === "pl" ? "Chirurgia" : "Surgery"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 79,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onSelectDepartment("phlebology"),
          className: "px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-white hover:shadow-xs transition-all",
          children: lang === "pl" ? "Flebologia" : "Phlebology"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 85,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onSelectDepartment("shop"),
          className: "px-3.5 py-1.5 rounded-xl text-xs font-semibold text-amber-700 bg-amber-50/80 border border-amber-200/60 hover:bg-amber-100 transition-all flex items-center gap-1.5",
          children: [
            /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-3.5 h-3.5 text-amber-600" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 95,
              columnNumber: 15
            }, this),
            lang === "pl" ? "Sklep Medyczny" : "Clinic Shop"
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 91,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 72,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/60", children: times.map((t) => /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onSelectTimeOfDay(t.id),
          title: `${t.label} Lighting`,
          className: `flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${activeTimeOfDay === t.id ? "bg-white text-indigo-900 shadow-xs border border-indigo-100 font-semibold" : "text-slate-500 hover:text-slate-800"}`,
          children: [
            t.icon,
            /* @__PURE__ */ jsxDEV("span", { children: t.label }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 117,
              columnNumber: 19
            }, this)
          ]
        },
        t.id,
        true,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 106,
          columnNumber: 17
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/Navbar.tsx",
        lineNumber: 104,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onToggleLang,
          className: "px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/60 text-xs font-bold text-slate-700 transition-colors",
          children: lang.toUpperCase()
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 123,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onOpenShop,
          className: "relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/60 text-slate-700 transition-all flex items-center justify-center",
          title: "Open Medical Store",
          children: [
            /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-4 h-4 text-slate-700" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 136,
              columnNumber: 15
            }, this),
            cartCount > 0 && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-[20px] px-1 text-[11px] font-bold text-white bg-rose-500 rounded-full border-2 border-white animate-bounce", children: cartCount }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 138,
              columnNumber: 17
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 131,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "a",
        {
          href: "tel:+48221234567",
          className: "hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/60 text-xs font-semibold text-slate-800 transition-colors",
          children: [
            /* @__PURE__ */ jsxDEV(PhoneCall, { className: "w-3.5 h-3.5 text-sky-600" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 149,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "+48 22 123 45 67" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 150,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 145,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onOpenBooking,
          className: "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-sky-600/20 active:scale-95 transition-all",
          children: [
            /* @__PURE__ */ jsxDEV(Calendar, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 158,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: lang === "pl" ? "Umów wizytę" : "Book Visit" }, void 0, false, {
              fileName: "/app/applet/src/components/Navbar.tsx",
              lineNumber: 159,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/Navbar.tsx",
          lineNumber: 154,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Navbar.tsx",
      lineNumber: 101,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Navbar.tsx",
    lineNumber: 47,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Navbar.tsx",
    lineNumber: 46,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Navbar.tsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk5hdmJhci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBCdWlsZGluZzIsIFxuICBQaG9uZUNhbGwsIFxuICBDYWxlbmRhciwgXG4gIFNob3BwaW5nQmFnLCBcbiAgU3VuLCBcbiAgTW9vbiwgXG4gIFN1bnJpc2UsIFxuICBTdW5zZXQsXG4gIFNwYXJrbGVzLFxuICBDaGV2cm9uRG93blxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgVGltZU9mRGF5IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgTmF2YmFyUHJvcHMge1xuICBhY3RpdmVUaW1lT2ZEYXk6IFRpbWVPZkRheTtcbiAgb25TZWxlY3RUaW1lT2ZEYXk6ICh0aW1lOiBUaW1lT2ZEYXkpID0+IHZvaWQ7XG4gIGNhcnRDb3VudDogbnVtYmVyO1xuICBvbk9wZW5TaG9wOiAoKSA9PiB2b2lkO1xuICBvbk9wZW5Cb29raW5nOiAoKSA9PiB2b2lkO1xuICBsYW5nOiAncGwnIHwgJ2VuJztcbiAgb25Ub2dnbGVMYW5nOiAoKSA9PiB2b2lkO1xuICBvblNlbGVjdERlcGFydG1lbnQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgTmF2YmFyOiBSZWFjdC5GQzxOYXZiYXJQcm9wcz4gPSAoe1xuICBhY3RpdmVUaW1lT2ZEYXksXG4gIG9uU2VsZWN0VGltZU9mRGF5LFxuICBjYXJ0Q291bnQsXG4gIG9uT3BlblNob3AsXG4gIG9uT3BlbkJvb2tpbmcsXG4gIGxhbmcsXG4gIG9uVG9nZ2xlTGFuZyxcbiAgb25TZWxlY3REZXBhcnRtZW50XG59KSA9PiB7XG4gIGNvbnN0IHRpbWVzOiB7IGlkOiBUaW1lT2ZEYXk7IGxhYmVsOiBzdHJpbmc7IGljb246IFJlYWN0LlJlYWN0Tm9kZSB9W10gPSBbXG4gICAgeyBpZDogJ2Rhd24nLCBsYWJlbDogbGFuZyA9PT0gJ3BsJyA/ICfFmndpdCcgOiAnRGF3bicsIGljb246IDxTdW5yaXNlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gfSxcbiAgICB7IGlkOiAnbm9vbicsIGxhYmVsOiBsYW5nID09PSAncGwnID8gJ0R6aWXFhCcgOiAnTm9vbicsIGljb246IDxTdW4gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiB9LFxuICAgIHsgaWQ6ICdnb2xkZW4nLCBsYWJlbDogbGFuZyA9PT0gJ3BsJyA/ICdaxYJvdGEgZ29kemluYScgOiAnR29sZGVuJywgaWNvbjogPFN1bnNldCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IH0sXG4gICAgeyBpZDogJ3R3aWxpZ2h0JywgbGFiZWw6IGxhbmcgPT09ICdwbCcgPyAnWm1pZXJ6Y2gnIDogJ1R3aWxpZ2h0JywgaWNvbjogPE1vb24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGhlYWRlciBjbGFzc05hbWU9XCJmaXhlZCB0b3AtMCBsZWZ0LTAgcmlnaHQtMCB6LTUwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBiZy13aGl0ZS83MCBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAvODAgc2hhZG93LXhzXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGgtMjBcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogQnJhbmQgTG9nbyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIGN1cnNvci1wb2ludGVyIGdyb3VwXCIgb25DbGljaz17KCkgPT4gd2luZG93LnNjcm9sbFRvKHsgdG9wOiAwLCBiZWhhdmlvcjogJ3Ntb290aCcgfSl9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB3LTExIGgtMTEgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by10ciBmcm9tLXNreS02MDAgdmlhLWluZGlnby02MDAgdG8tdGVhbC00MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LXNreS01MDAvMjAgZ3JvdXAtaG92ZXI6c2NhbGUtMTA1IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTMwMFwiPlxuICAgICAgICAgICAgICA8QnVpbGRpbmcyIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPlxuICAgICAgICAgICAgICB7LyogUHJpc20gcmVmcmFjdGlvbiBzcGFya2xlIHBvaW50ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtcmlnaHQtMSB3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1jeWFuLTMwMCBibHVyLVsxcHhdIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYmxhY2sgdHJhY2tpbmctdGlnaHQgYmctZ3JhZGllbnQtdG8tciBmcm9tLXNsYXRlLTkwMCB2aWEtaW5kaWdvLTk1MCB0by1zbGF0ZS04MDAgYmctY2xpcC10ZXh0IHRleHQtdHJhbnNwYXJlbnQgdXBwZXJjYXNlIGZvbnQtc2Fuc1wiPlxuICAgICAgICAgICAgICAgICAgTmV4dCBHZW5lcmF0aW9uXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc2t5LTEwMCB0ZXh0LXNreS04MDAgYm9yZGVyIGJvcmRlci1za3ktMjAwLzYwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgQ2xpbmljXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS01MDAgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUHJva3RvbG9naWEg4oCiIENoaXJ1cmdpYSDigKIgRmxlYm9sb2dpYScgOiAnUHJvY3RvbG9neSDigKIgU3VyZ2VyeSDigKIgUGhsZWJvbG9neSd9XG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFF1aWNrIERlcGFydG1lbnQgTmF2aWdhdGlvbiBMaW5rcyAqL31cbiAgICAgICAgICA8bmF2IGNsYXNzTmFtZT1cImhpZGRlbiBtZDpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBiZy1zbGF0ZS0xMDAvODAgcC0xLjUgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvNjBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TZWxlY3REZXBhcnRtZW50KCdwcm9jdG9sb2d5Jyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNzAwIGhvdmVyOnRleHQtc2xhdGUtOTAwIGhvdmVyOmJnLXdoaXRlIGhvdmVyOnNoYWRvdy14cyB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1Byb2t0b2xvZ2lhJyA6ICdQcm9jdG9sb2d5J31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdERlcGFydG1lbnQoJ3N1cmdlcnknKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAgaG92ZXI6Ymctd2hpdGUgaG92ZXI6c2hhZG93LXhzIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnQ2hpcnVyZ2lhJyA6ICdTdXJnZXJ5J31cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdERlcGFydG1lbnQoJ3BobGVib2xvZ3knKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAgaG92ZXI6Ymctd2hpdGUgaG92ZXI6c2hhZG93LXhzIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnRmxlYm9sb2dpYScgOiAnUGhsZWJvbG9neSd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TZWxlY3REZXBhcnRtZW50KCdzaG9wJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1hbWJlci03MDAgYmctYW1iZXItNTAvODAgYm9yZGVyIGJvcmRlci1hbWJlci0yMDAvNjAgaG92ZXI6YmctYW1iZXItMTAwIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci02MDBcIiAvPlxuICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdTa2xlcCBNZWR5Y3pueScgOiAnQ2xpbmljIFNob3AnfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9uYXY+XG5cbiAgICAgICAgICB7LyogQ29udHJvbHMgJiBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNtOmdhcC0zXCI+XG5cbiAgICAgICAgICAgIHsvKiBUaW1lIG9mIERheSBMaWdodGluZyBTZWxlY3RvciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIGxnOmZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJnLXNsYXRlLTEwMCBwLTEgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC82MFwiPlxuICAgICAgICAgICAgICB7dGltZXMubWFwKCh0KSA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXt0LmlkfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25TZWxlY3RUaW1lT2ZEYXkodC5pZCl9XG4gICAgICAgICAgICAgICAgICB0aXRsZT17YCR7dC5sYWJlbH0gTGlnaHRpbmdgfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtMi41IHB5LTEgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRpbWVPZkRheSA9PT0gdC5pZFxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXdoaXRlIHRleHQtaW5kaWdvLTkwMCBzaGFkb3cteHMgYm9yZGVyIGJvcmRlci1pbmRpZ28tMTAwIGZvbnQtc2VtaWJvbGQnXG4gICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7dC5pY29ufVxuICAgICAgICAgICAgICAgICAgPHNwYW4+e3QubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogTGFuZ3VhZ2UgU3dpdGNoICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvblRvZ2dsZUxhbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS0xMDAgaG92ZXI6Ymctc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzYwIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNzAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhbmcudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogU2hvcCBDYXJ0IEJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25PcGVuU2hvcH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicmVsYXRpdmUgcC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS0xMDAgaG92ZXI6Ymctc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzYwIHRleHQtc2xhdGUtNzAwIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJPcGVuIE1lZGljYWwgU3RvcmVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXNsYXRlLTcwMFwiIC8+XG4gICAgICAgICAgICAgIHtjYXJ0Q291bnQgPiAwICYmIChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEuNSAtcmlnaHQtMS41IGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG1pbi13LVsyMHB4XSBoLVsyMHB4XSBweC0xIHRleHQtWzExcHhdIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGJnLXJvc2UtNTAwIHJvdW5kZWQtZnVsbCBib3JkZXItMiBib3JkZXItd2hpdGUgYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgICAgICAgIHtjYXJ0Q291bnR9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBQaG9uZSBRdWljayBDYWxsICovfVxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgaHJlZj1cInRlbDorNDgyMjEyMzQ1NjdcIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoaWRkZW4gc206ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtMTAwIGhvdmVyOmJnLXNsYXRlLTIwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMC82MCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UGhvbmVDYWxsIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2t5LTYwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPis0OCAyMiAxMjMgNDUgNjc8L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG5cbiAgICAgICAgICAgIHsvKiBCb29rIEFwcG9pbnRtZW50IENUQSBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uT3BlbkJvb2tpbmd9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTQgcHktMi41IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXNreS02MDAgdmlhLWluZGlnby02MDAgdG8tc2t5LTcwMCBob3Zlcjpmcm9tLXNreS01MDAgaG92ZXI6dG8taW5kaWdvLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIHNoYWRvdy1tZCBzaGFkb3ctc2t5LTYwMC8yMCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q2FsZW5kYXIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj57bGFuZyA9PT0gJ3BsJyA/ICdVbcOzdyB3aXp5dMSZJyA6ICdCb29rIFZpc2l0J308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBcUNnRTtBQXBDaEU7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BR0s7QUFjQSxhQUFNLFNBQWdDLENBQUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxF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