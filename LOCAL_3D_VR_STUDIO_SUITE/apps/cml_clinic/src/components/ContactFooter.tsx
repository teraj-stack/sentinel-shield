import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(true);
  const [status, setStatus] = useState("idle");
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email || !optIn) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("done");
      setEmail("");
    }, 1e3);
  };
  if (status === "done") {
    return /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 p-3.5 rounded-xl bg-teal-950/80 border border-teal-500/40 text-xs text-teal-200 font-semibold animate-fade-in", children: [
      /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-5 h-5 text-teal-400 shrink-0" }, void 0, false, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 23,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: "Dziękujemy! Twój e-mail został pomyślnie dodany do listy biuletynu medycznego." }, void 0, false, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 24,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ContactFooter.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this);
  }
  return /* @__PURE__ */ jsxDEV("form", { onSubmit: handleNewsletterSubmit, className: "flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "email",
          required: true,
          value: email,
          onChange: (e) => setEmail(e.target.value),
          placeholder: "Twój adres e-mail...",
          className: "px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-teal-400 min-w-[240px]"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 32,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("label", { className: "flex items-center gap-1.5 text-[10px] text-slate-400 cursor-pointer", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "checkbox",
            checked: optIn,
            onChange: (e) => setOptIn(e.target.checked),
            className: "rounded bg-slate-900 border-slate-700 text-teal-500 focus:ring-0"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 41,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("span", { children: "Zgadzam się na otrzymywanie porad proktologicznych (RODO)" }, void 0, false, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 47,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 40,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ContactFooter.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "button",
      {
        type: "submit",
        disabled: status === "submitting" || !optIn,
        className: "px-5 py-2.5 h-10 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-teal-600/30 transition-all shrink-0",
        children: [
          /* @__PURE__ */ jsxDEV(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 56,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: status === "submitting" ? "Zapisywanie..." : "Zapisz się" }, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 57,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 51,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ContactFooter.tsx",
    lineNumber: 30,
    columnNumber: 5
  }, this);
};
export const ContactFooter = () => {
  const [formState, setFormState] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => {
      setFormState("sent");
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 1200);
  };
  return /* @__PURE__ */ jsxDEV(
    motion.footer,
    {
      className: "pt-20 pb-10 bg-slate-950 border-t border-slate-800 text-slate-300",
      id: "kontakt",
      initial: { opacity: 0, y: 35 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-lg font-bold text-slate-100 uppercase tracking-wide", children: "Kontakt & Lokalizacja" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 94,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-xs sm:text-sm font-light", children: [
              /* @__PURE__ */ jsxDEV("p", { className: "font-semibold text-indigo-300 text-base", children: "CML – Centrum Medycyny Laserowej" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 98,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-slate-200", children: "Dr Jan Bujok · Chirurg · Proktolog" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 101,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2.5 pt-2", children: [
                /* @__PURE__ */ jsxDEV(MapPin, { className: "w-4 h-4 text-indigo-400 shrink-0 mt-0.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 104,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "ul. Branickiego 10/U6",
                  /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 107,
                    columnNumber: 19
                  }, this),
                  "02-972 Warszawa (Wilanów)"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 105,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 103,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxDEV(Phone, { className: "w-4 h-4 text-indigo-400 shrink-0" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 113,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("a", { href: "tel:+48510432361", className: "hover:text-indigo-300 transition-colors font-semibold", children: "+48 510 432 361" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 114,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 112,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxDEV(Mail, { className: "w-4 h-4 text-indigo-400 shrink-0" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 120,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("a", { href: "mailto:kontakt@mcml.pro", className: "hover:text-indigo-300 transition-colors", children: "kontakt@mcml.pro" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 121,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 119,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 97,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 93,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-lg font-bold text-slate-100 uppercase tracking-wide", children: "Godziny Przyjęć" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 130,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 text-xs sm:text-sm font-light", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxDEV(Clock, { className: "w-4 h-4 text-teal-400 shrink-0 mt-0.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 135,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-medium text-slate-200", children: "Poniedziałek — Piątek" }, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 137,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-xs", children: "08:00 — 18:00" }, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 138,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 136,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 134,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxDEV(Clock, { className: "w-4 h-4 text-teal-400 shrink-0 mt-0.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 143,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "font-medium text-slate-200", children: "Sobota" }, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 145,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-xs", children: "09:00 — 14:00 (Wybrane terminy)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 146,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 144,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 142,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 mt-4", children: "Wizyty realizowane wyłącznie po uprzedniej rezerwacji telefonicznej, internetowej lub zakupie pakietu w e-sklepie." }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 150,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 133,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 129,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", id: "formularz", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-lg font-bold text-slate-100 uppercase tracking-wide", children: "Napisz Wiadomość" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 158,
              columnNumber: 13
            }, this),
            formState === "sent" ? /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-teal-950/60 border border-teal-500/40 text-center space-y-2", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-8 h-8 text-teal-400 mx-auto" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 164,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs font-semibold text-teal-200", children: "Dziękujemy za wiadomość!" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 165,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300", children: "Odpowiemy najszybciej jak to możliwe lub skontaktujemy się telefonicznie." }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 166,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 163,
              columnNumber: 15
            }, this) : /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "space-y-2.5", children: [
              /* @__PURE__ */ jsxDEV(
                "input",
                {
                  type: "text",
                  required: true,
                  placeholder: "Imię i nazwisko",
                  value: formData.name,
                  onChange: (e) => setFormData({ ...formData, name: e.target.value }),
                  className: "w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 172,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "email",
                    required: true,
                    placeholder: "Adres e-mail",
                    value: formData.email,
                    onChange: (e) => setFormData({ ...formData, email: e.target.value }),
                    className: "w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 182,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "tel",
                    placeholder: "Telefon (opcjonalnie)",
                    value: formData.phone,
                    onChange: (e) => setFormData({ ...formData, phone: e.target.value }),
                    className: "w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ContactFooter.tsx",
                    lineNumber: 190,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 181,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "textarea",
                {
                  required: true,
                  rows: 3,
                  placeholder: "Treść zapytania lub opis objawów...",
                  value: formData.message,
                  onChange: (e) => setFormData({ ...formData, message: e.target.value }),
                  className: "w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-indigo-500 resize-none"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 199,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  type: "submit",
                  disabled: formState === "sending",
                  className: "w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all",
                  children: [
                    /* @__PURE__ */ jsxDEV(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/ContactFooter.tsx",
                      lineNumber: 213,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: formState === "sending" ? "Wysyłanie..." : "Wyślij wiadomość" }, void 0, false, {
                      fileName: "/app/applet/src/components/ContactFooter.tsx",
                      lineNumber: 214,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ContactFooter.tsx",
                  lineNumber: 208,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 171,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 157,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 91,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mb-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-center md:text-left", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 mb-1", children: [
              /* @__PURE__ */ jsxDEV(Mail, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 225,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Biuletyn Medyczny CML & Porady Zdrowotne" }, void 0, false, {
                fileName: "/app/applet/src/components/ContactFooter.tsx",
                lineNumber: 226,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 224,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("h4", { className: "font-serif text-lg font-bold text-slate-100", children: "Zapisz się na powiadomienia o profilaktyce i e-usługach" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 228,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-light max-w-xl", children: "Otrzymuj porady dr. Jana Bujoka dotyczące profilaktyki proktologicznej, kodów rabatowych na e-konsultacje oraz aktualizacji oferty. Zero spamu." }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 231,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 223,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(NewsletterForm, {}, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 236,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 222,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-8 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV("p", { children: "© 2026 CML – Centrum Medycyny Laserowej. Dr Jan Bujok. Wszelkie prawa zastrzeżone." }, void 0, false, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 241,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-4 text-[11px]", children: [
            /* @__PURE__ */ jsxDEV("a", { href: "#o-mnie", className: "hover:text-slate-300", children: "Regulamin Usług" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 243,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("a", { href: "#faq", className: "hover:text-slate-300", children: "Polityka Prywatności RODO" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 244,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("a", { href: "#sklep-medyczny", className: "hover:text-slate-300", children: "Sklep & E-Recepty" }, void 0, false, {
              fileName: "/app/applet/src/components/ContactFooter.tsx",
              lineNumber: 245,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ContactFooter.tsx",
            lineNumber: 242,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ContactFooter.tsx",
          lineNumber: 240,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ContactFooter.tsx",
        lineNumber: 90,
        columnNumber: 7
      }, this)
    },
    void 0,
    false,
    {
      fileName: "/app/applet/src/components/ContactFooter.tsx",
      lineNumber: 82,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnRhY3RGb290ZXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFBob25lLCBNYWlsLCBNYXBQaW4sIENsb2NrLCBTZW5kLCBDaGVja0NpcmNsZTIsIFNoaWVsZEFsZXJ0LCBDaGVjayB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24gfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuXG5jb25zdCBOZXdzbGV0dGVyRm9ybTogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbb3B0SW4sIHNldE9wdEluXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc3RhdHVzLCBzZXRTdGF0dXNdID0gdXNlU3RhdGU8J2lkbGUnIHwgJ3N1Ym1pdHRpbmcnIHwgJ2RvbmUnPignaWRsZScpO1xuXG4gIGNvbnN0IGhhbmRsZU5ld3NsZXR0ZXJTdWJtaXQgPSAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghZW1haWwgfHwgIW9wdEluKSByZXR1cm47XG4gICAgc2V0U3RhdHVzKCdzdWJtaXR0aW5nJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRTdGF0dXMoJ2RvbmUnKTtcbiAgICAgIHNldEVtYWlsKCcnKTtcbiAgICB9LCAxMDAwKTtcbiAgfTtcblxuICBpZiAoc3RhdHVzID09PSAnZG9uZScpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwLTMuNSByb3VuZGVkLXhsIGJnLXRlYWwtOTUwLzgwIGJvcmRlciBib3JkZXItdGVhbC01MDAvNDAgdGV4dC14cyB0ZXh0LXRlYWwtMjAwIGZvbnQtc2VtaWJvbGQgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXRlYWwtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgPHNwYW4+RHppxJlrdWplbXkhIFR3w7NqIGUtbWFpbCB6b3N0YcWCIHBvbXnFm2xuaWUgZG9kYW55IGRvIGxpc3R5IGJpdWxldHludSBtZWR5Y3puZWdvLjwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVOZXdzbGV0dGVyU3VibWl0fSBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGdhcC0yIHctZnVsbCBtZDp3LWF1dG8gc2hyaW5rLTBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICB2YWx1ZT17ZW1haWx9XG4gICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJUd8OzaiBhZHJlcyBlLW1haWwuLi5cIlxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMi41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXItc2xhdGUtNTAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItdGVhbC00MDAgbWluLXctWzI0MHB4XVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGN1cnNvci1wb2ludGVyXCI+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgY2hlY2tlZD17b3B0SW59XG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldE9wdEluKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZCBiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXRlYWwtNTAwIGZvY3VzOnJpbmctMFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8c3Bhbj5aZ2FkemFtIHNpxJkgbmEgb3RyenlteXdhbmllIHBvcmFkIHByb2t0b2xvZ2ljem55Y2ggKFJPRE8pPC9zcGFuPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgIGRpc2FibGVkPXtzdGF0dXMgPT09ICdzdWJtaXR0aW5nJyB8fCAhb3B0SW59XG4gICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMi41IGgtMTAgcm91bmRlZC14bCBiZy10ZWFsLTYwMCBob3ZlcjpiZy10ZWFsLTUwMCBkaXNhYmxlZDpvcGFjaXR5LTUwIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgc2hhZG93LWxnIHNoYWRvdy10ZWFsLTYwMC8zMCB0cmFuc2l0aW9uLWFsbCBzaHJpbmstMFwiXG4gICAgICA+XG4gICAgICAgIDxTZW5kIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgPHNwYW4+e3N0YXR1cyA9PT0gJ3N1Ym1pdHRpbmcnID8gJ1phcGlzeXdhbmllLi4uJyA6ICdaYXBpc3ogc2nEmSd9PC9zcGFuPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9mb3JtPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IENvbnRhY3RGb290ZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbZm9ybVN0YXRlLCBzZXRGb3JtU3RhdGVdID0gdXNlU3RhdGU8J2lkbGUnIHwgJ3NlbmRpbmcnIHwgJ3NlbnQnIHwgJ2Vycm9yJz4oJ2lkbGUnKTtcbiAgY29uc3QgW2Zvcm1EYXRhLCBzZXRGb3JtRGF0YV0gPSB1c2VTdGF0ZSh7XG4gICAgbmFtZTogJycsXG4gICAgZW1haWw6ICcnLFxuICAgIHBob25lOiAnJyxcbiAgICBtZXNzYWdlOiAnJyxcbiAgfSk7XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRGb3JtU3RhdGUoJ3NlbmRpbmcnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldEZvcm1TdGF0ZSgnc2VudCcpO1xuICAgICAgc2V0Rm9ybURhdGEoeyBuYW1lOiAnJywgZW1haWw6ICcnLCBwaG9uZTogJycsIG1lc3NhZ2U6ICcnIH0pO1xuICAgIH0sIDEyMDApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG1vdGlvbi5mb290ZXJcbiAgICAgIGNsYXNzTmFtZT1cInB0LTIwIHBiLTEwIGJnLXNsYXRlLTk1MCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwXCJcbiAgICAgIGlkPVwia29udGFrdFwiXG4gICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHk6IDM1IH19XG4gICAgICB3aGlsZUluVmlldz17eyBvcGFjaXR5OiAxLCB5OiAwIH19XG4gICAgICB2aWV3cG9ydD17eyBvbmNlOiB0cnVlLCBtYXJnaW46ICctNjBweCcgfX1cbiAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuNiwgZWFzZTogWzAuMTYsIDEsIDAuMywgMV0gfX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTZ4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMyBnYXAtMTAgbWItMTZcIj5cbiAgICAgICAgICB7LyogQ2xpbmljIENvbnRhY3QgQ29sdW1uICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICBLb250YWt0ICYgTG9rYWxpemFjamFcbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyB0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1saWdodFwiPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtaW5kaWdvLTMwMCB0ZXh0LWJhc2VcIj5cbiAgICAgICAgICAgICAgICBDTUwg4oCTIENlbnRydW0gTWVkeWN5bnkgTGFzZXJvd2VqXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj5EciBKYW4gQnVqb2sgwrcgQ2hpcnVyZyDCtyBQcm9rdG9sb2c8L3A+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yLjUgcHQtMlwiPlxuICAgICAgICAgICAgICAgIDxNYXBQaW4gY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDAgc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIHVsLiBCcmFuaWNraWVnbyAxMC9VNlxuICAgICAgICAgICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgICAgICAgICAwMi05NzIgV2Fyc3phd2EgKFdpbGFuw7N3KVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgPFBob25lIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwidGVsOis0ODUxMDQzMjM2MVwiIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtaW5kaWdvLTMwMCB0cmFuc2l0aW9uLWNvbG9ycyBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICAgICAgICArNDggNTEwIDQzMiAzNjFcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgIDxNYWlsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICA8YSBocmVmPVwibWFpbHRvOmtvbnRha3RAbWNtbC5wcm9cIiBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWluZGlnby0zMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgIGtvbnRha3RAbWNtbC5wcm9cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogT3BlbmluZyBIb3VycyBDb2x1bW4gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQtbGcgZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlXCI+XG4gICAgICAgICAgICAgIEdvZHppbnkgUHJ6eWrEmcSHXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtbGlnaHRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICA8Q2xvY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXRlYWwtNDAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0yMDBcIj5Qb25pZWR6aWHFgmVrIOKAlCBQacSFdGVrPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQteHNcIj4wODowMCDigJQgMTg6MDA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICA8Q2xvY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXRlYWwtNDAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS0yMDBcIj5Tb2JvdGE8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC14c1wiPjA5OjAwIOKAlCAxNDowMCAoV3licmFuZSB0ZXJtaW55KTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTRcIj5cbiAgICAgICAgICAgICAgICBXaXp5dHkgcmVhbGl6b3dhbmUgd3nFgsSFY3puaWUgcG8gdXByemVkbmllaiByZXplcndhY2ppIHRlbGVmb25pY3puZWosIGludGVybmV0b3dlaiBsdWIgemFrdXBpZSBwYWtpZXR1IHcgZS1za2xlcGllLlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIERpcmVjdCBGb3JtIENvbHVtbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiIGlkPVwiZm9ybXVsYXJ6XCI+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICBOYXBpc3ogV2lhZG9tb8WbxIdcbiAgICAgICAgICAgIDwvaDM+XG5cbiAgICAgICAgICAgIHtmb3JtU3RhdGUgPT09ICdzZW50JyA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy10ZWFsLTk1MC82MCBib3JkZXIgYm9yZGVyLXRlYWwtNTAwLzQwIHRleHQtY2VudGVyIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LXRlYWwtNDAwIG14LWF1dG9cIiAvPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXRlYWwtMjAwXCI+RHppxJlrdWplbXkgemEgd2lhZG9tb8WbxIchPC9wPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICBPZHBvd2llbXkgbmFqc3p5YmNpZWogamFrIHRvIG1vxbxsaXdlIGx1YiBza29udGFrdHVqZW15IHNpxJkgdGVsZWZvbmljem5pZS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS0yLjVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkltacSZIGkgbmF6d2lza29cIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLm5hbWV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIG5hbWU6IGUudGFyZ2V0LnZhbHVlIH0pfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMuNSBweS0yIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXItc2xhdGUtNTAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiQWRyZXMgZS1tYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Zvcm1EYXRhLmVtYWlsfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZvcm1EYXRhKHsgLi4uZm9ybURhdGEsIGVtYWlsOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMuNSBweS0yIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgdGV4dC1zbGF0ZS0xMDAgcGxhY2Vob2xkZXItc2xhdGUtNTAwIG91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItaW5kaWdvLTUwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZWxcIlxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRlbGVmb24gKG9wY2pvbmFsbmllKVwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5waG9uZX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBwaG9uZTogZS50YXJnZXQudmFsdWUgfSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zLjUgcHktMiByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIHBsYWNlaG9sZGVyLXNsYXRlLTUwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHJvd3M9ezN9XG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlRyZcWbxIcgemFweXRhbmlhIGx1YiBvcGlzIG9iamF3w7N3Li4uXCJcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtmb3JtRGF0YS5tZXNzYWdlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRGb3JtRGF0YSh7IC4uLmZvcm1EYXRhLCBtZXNzYWdlOiBlLnRhcmdldC52YWx1ZSB9KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zLjUgcHktMiByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIHBsYWNlaG9sZGVyLXNsYXRlLTUwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWluZGlnby01MDAgcmVzaXplLW5vbmVcIlxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtmb3JtU3RhdGUgPT09ICdzZW5kaW5nJ31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0yLjUgcHgtNCByb3VuZGVkLXhsIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCB0ZXh0LXdoaXRlIGZvbnQtc2VtaWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgc2hhZG93LWluZGlnby02MDAvMzAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxTZW5kIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntmb3JtU3RhdGUgPT09ICdzZW5kaW5nJyA/ICdXeXN5xYJhbmllLi4uJyA6ICdXecWbbGlqIHdpYWRvbW/Fm8SHJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNZWRpY2FsIE5ld3NsZXR0ZXIgU2lnbnVwIENvbXBvbmVudCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYi0xMiBwLTYgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXNsYXRlLTkwMCB2aWEtaW5kaWdvLTk1MC80MCB0by1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LXhsIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xIHRleHQtY2VudGVyIG1kOnRleHQtbGVmdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC10ZWFsLTQwMCBtYi0xXCI+XG4gICAgICAgICAgICAgIDxNYWlsIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5CaXVsZXR5biBNZWR5Y3pueSBDTUwgJiBQb3JhZHkgWmRyb3dvdG5lPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LWxnIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICBaYXBpc3ogc2nEmSBuYSBwb3dpYWRvbWllbmlhIG8gcHJvZmlsYWt0eWNlIGkgZS11c8WCdWdhY2hcbiAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbGlnaHQgbWF4LXcteGxcIj5cbiAgICAgICAgICAgICAgT3RyenltdWogcG9yYWR5IGRyLiBKYW5hIEJ1am9rYSBkb3R5Y3rEhWNlIHByb2ZpbGFrdHlraSBwcm9rdG9sb2dpY3puZWosIGtvZMOzdyByYWJhdG93eWNoIG5hIGUta29uc3VsdGFjamUgb3JheiBha3R1YWxpemFjamkgb2ZlcnR5LiBaZXJvIHNwYW11LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPE5ld3NsZXR0ZXJGb3JtIC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGb290ZXIgTGVnYWwgQm90dG9tICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTggYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMCB0ZXh0LWNlbnRlciB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgIDxwPsKpIDIwMjYgQ01MIOKAkyBDZW50cnVtIE1lZHljeW55IExhc2Vyb3dlai4gRHIgSmFuIEJ1am9rLiBXc3plbGtpZSBwcmF3YSB6YXN0cnplxbxvbmUuPC9wPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBnYXAtNCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cIiNvLW1uaWVcIiBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LXNsYXRlLTMwMFwiPlJlZ3VsYW1pbiBVc8WCdWc8L2E+XG4gICAgICAgICAgICA8YSBocmVmPVwiI2ZhcVwiIGNsYXNzTmFtZT1cImhvdmVyOnRleHQtc2xhdGUtMzAwXCI+UG9saXR5a2EgUHJ5d2F0bm/Fm2NpIFJPRE88L2E+XG4gICAgICAgICAgICA8YSBocmVmPVwiI3NrbGVwLW1lZHljem55XCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1zbGF0ZS0zMDBcIj5Ta2xlcCAmIEUtUmVjZXB0eTwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21vdGlvbi5mb290ZXI+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFzQlE7QUF0QlIsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsT0FBTyxNQUFNLFFBQVEsT0FBTyxNQUFNLG9CQUF3QztBQUNuRixTQUFTLGNBQWM7QUFFdkIsTUFBTSxpQkFBMkIsTUFBTTtBQUNyQyxRQUFNLENBQUMsT0FBTyxRQUFRLElBQUksU0FBUyxFQUFFO0FBQ3JDLFFBQU0sQ0FBQyxPQUFPLFFBQVEsSUFBSSxTQUFTLElBQUk7QUFDdkMsUUFBTSxDQUFDLFFBQVEsU0FBUyxJQUFJLFNBQXlDLE1BQU07QUFFM0UsUUFBTSx5QkFBeUIsQ0FBQyxNQUF1QjtBQUNyRCxNQUFFLGVBQWU7QUFDakIsUUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFPO0FBQ3RCLGNBQVUsWUFBWTtBQUN0QixlQUFXLE1BQU07QUFDZixnQkFBVSxNQUFNO0FBQ2hCLGVBQVMsRUFBRTtBQUFBLElBQ2IsR0FBRyxHQUFJO0FBQUEsRUFDVDtBQUVBLE1BQUksV0FBVyxRQUFRO0FBQ3JCLFdBQ0UsdUJBQUMsU0FBSSxXQUFVLHlJQUNiO0FBQUEsNkJBQUMsZ0JBQWEsV0FBVSxvQ0FBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUF5RDtBQUFBLE1BQ3pELHVCQUFDLFVBQUssOEZBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFvRjtBQUFBLFNBRnRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FHQTtBQUFBLEVBRUo7QUFFQSxTQUNFLHVCQUFDLFVBQUssVUFBVSx3QkFBd0IsV0FBVSw2REFDaEQ7QUFBQSwyQkFBQyxTQUFJLFdBQVUseUJBQ2I7QUFBQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBSztBQUFBLFVBQ0wsVUFBUTtB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