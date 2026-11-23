import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"];
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CheckCircle, ArrowRight } from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
export const CartModal = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  if (!isOpen) return null;
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckedOut(true);
    setTimeout(() => {
      onClearCart();
    }, 4e3);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-md bg-slate-950 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto", children: [
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-5 h-5 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-lg font-semibold text-slate-100", children: "Koszyk Usług i Produktów" }, void 0, false, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 50,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/CartModal.tsx",
              lineNumber: 58,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 54,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CartModal.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      isCheckedOut ? /* @__PURE__ */ jsxDEV("div", { className: "py-12 text-center space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxDEV(CheckCircle, { className: "w-8 h-8" }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 65,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 64,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "font-serif text-xl font-bold text-slate-100", children: "Zamówienie Zostało Przyjęte!" }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 67,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed max-w-xs mx-auto", children: [
          "Dziękujemy, ",
          patientName,
          ". Potwierdzenie oraz e-recepta/instrukcje zostały wysłane na adres ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-indigo-300", children: patientEmail }, void 0, false, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 71,
            columnNumber: 109
          }, this),
          "."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 70,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-500 pt-4", children: "W razie pytań prosimy o kontakt pod numerem: +48 510 432 361." }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 73,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              setIsCheckedOut(false);
              onClose();
            },
            className: "mt-6 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-xs shadow-lg",
            children: "Zamknij okno"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 76,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CartModal.tsx",
        lineNumber: 63,
        columnNumber: 13
      }, this) : cartItems.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "py-16 text-center space-y-3", children: [
        /* @__PURE__ */ jsxDEV(ShoppingBag, { className: "w-12 h-12 text-slate-700 mx-auto" }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 88,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm font-medium text-slate-400", children: "Twój koszyk jest pusty." }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 89,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-600 max-w-xs mx-auto", children: "Wybierz e-konsultację, pakiet zabiegowy lub preparaty pozabiegowe ze sklepu." }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 90,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CartModal.tsx",
        lineNumber: 87,
        columnNumber: 13
      }, this) : /* @__PURE__ */ jsxDEV("div", { className: "divide-y divide-slate-800/80 my-4", children: cartItems.map((item) => /* @__PURE__ */ jsxDEV("div", { className: "py-3.5 flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-semibold uppercase tracking-wider text-indigo-400", children: item.product.categoryLabel }, void 0, false, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 99,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-semibold text-slate-200 mt-0.5", children: item.product.name }, void 0, false, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 102,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 mt-1 font-medium", children: [
            item.product.price,
            " zł x ",
            item.quantity,
            " =",
            " ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-100 font-bold", children: [
              item.product.price * item.quantity,
              " zł"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/CartModal.tsx",
              lineNumber: 107,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 105,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 98,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center rounded-lg bg-slate-900 border border-slate-800", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onUpdateQuantity(item.product.id, -1),
                className: "p-1 text-slate-400 hover:text-white",
                children: /* @__PURE__ */ jsxDEV(Minus, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/CartModal.tsx",
                  lineNumber: 119,
                  columnNumber: 25
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CartModal.tsx",
                lineNumber: 115,
                columnNumber: 23
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 text-xs font-bold text-slate-200", children: item.quantity }, void 0, false, {
              fileName: "/app/applet/src/components/CartModal.tsx",
              lineNumber: 121,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => onUpdateQuantity(item.product.id, 1),
                className: "p-1 text-slate-400 hover:text-white",
                children: /* @__PURE__ */ jsxDEV(Plus, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/CartModal.tsx",
                  lineNumber: 126,
                  columnNumber: 25
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/CartModal.tsx",
                lineNumber: 122,
                columnNumber: 23
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 114,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => onRemoveItem(item.product.id),
              className: "p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors",
              title: "Usuń pozycję",
              children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/CartModal.tsx",
                lineNumber: 135,
                columnNumber: 23
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/CartModal.tsx",
              lineNumber: 130,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 113,
          columnNumber: 19
        }, this)
      ] }, item.product.id, true, {
        fileName: "/app/applet/src/components/CartModal.tsx",
        lineNumber: 97,
        columnNumber: 17
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/components/CartModal.tsx",
        lineNumber: 95,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CartModal.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this),
    !isCheckedOut && cartItems.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "pt-4 border-t border-slate-800 space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-sm font-semibold text-slate-100", children: [
        /* @__PURE__ */ jsxDEV("span", { children: "Suma zamówienia:" }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 148,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xl text-indigo-300 font-bold", children: [
          totalPrice,
          " zł"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 149,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CartModal.tsx",
        lineNumber: 147,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleCheckoutSubmit, className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 font-medium", children: "Dane pacjenta do realizacji:" }, void 0, false, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 153,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            required: true,
            placeholder: "Imię i Nazwisko",
            value: patientName,
            onChange: (e) => setPatientName(e.target.value),
            className: "w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 outline-none focus:border-indigo-500"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 154,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "email",
            required: true,
            placeholder: "Adres e-mail",
            value: patientEmail,
            onChange: (e) => setPatientEmail(e.target.value),
            className: "w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 outline-none focus:border-indigo-500"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 162,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "tel",
            required: true,
            placeholder: "Numer telefonu",
            value: patientPhone,
            onChange: (e) => setPatientPhone(e.target.value),
            className: "w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 outline-none focus:border-indigo-500"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 170,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-start gap-2 text-[10px] text-slate-400 leading-normal", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-teal-400 shrink-0 mt-0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 180,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Zamówienie realizowane pod nadzorem medycznym CML. E-konsultacje odbywają się po telefonicznym ustaleniu dogodnego terminu." }, void 0, false, {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 181,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/CartModal.tsx",
          lineNumber: 179,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            className: "w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2",
            children: [
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Potwierdzam zamówienie (",
                totalPrice,
                " zł)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/CartModal.tsx",
                lineNumber: 190,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/CartModal.tsx",
                lineNumber: 191,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/CartModal.tsx",
            lineNumber: 186,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/CartModal.tsx",
        lineNumber: 152,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/CartModal.tsx",
      lineNumber: 146,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/CartModal.tsx",
    lineNumber: 44,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/CartModal.tsx",
    lineNumber: 43,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhcnRNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQ2FydEl0ZW0gfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBYLCBUcmFzaDIsIFBsdXMsIE1pbnVzLCBTaG9wcGluZ0JhZywgU2hpZWxkQ2hlY2ssIENoZWNrQ2lyY2xlLCBBcnJvd1JpZ2h0IH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcblxuaW50ZXJmYWNlIENhcnRNb2RhbFByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICBjYXJ0SXRlbXM6IENhcnRJdGVtW107XG4gIG9uVXBkYXRlUXVhbnRpdHk6IChwcm9kdWN0SWQ6IHN0cmluZywgZGVsdGE6IG51bWJlcikgPT4gdm9pZDtcbiAgb25SZW1vdmVJdGVtOiAocHJvZHVjdElkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uQ2xlYXJDYXJ0OiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgQ2FydE1vZGFsOiBSZWFjdC5GQzxDYXJ0TW9kYWxQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2UsXG4gIGNhcnRJdGVtcyxcbiAgb25VcGRhdGVRdWFudGl0eSxcbiAgb25SZW1vdmVJdGVtLFxuICBvbkNsZWFyQ2FydCxcbn0pID0+IHtcbiAgY29uc3QgW2lzQ2hlY2tlZE91dCwgc2V0SXNDaGVja2VkT3V0XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3BhdGllbnROYW1lLCBzZXRQYXRpZW50TmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwYXRpZW50RW1haWwsIHNldFBhdGllbnRFbWFpbF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtwYXRpZW50UGhvbmUsIHNldFBhdGllbnRQaG9uZV0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHRvdGFsUHJpY2UgPSBjYXJ0SXRlbXMucmVkdWNlKFxuICAgIChzdW0sIGl0ZW0pID0+IHN1bSArIGl0ZW0ucHJvZHVjdC5wcmljZSAqIGl0ZW0ucXVhbnRpdHksXG4gICAgMFxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUNoZWNrb3V0U3VibWl0ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRJc0NoZWNrZWRPdXQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBvbkNsZWFyQ2FydCgpO1xuICAgIH0sIDQwMDApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBqdXN0aWZ5LWVuZCBiZy1zbGF0ZS05NTAvODAgYmFja2Ryb3AtYmx1ci1zbSBhbmltYXRlLWZhZGUtaW5cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIG1heC13LW1kIGJnLXNsYXRlLTk1MCBib3JkZXItbCBib3JkZXItc2xhdGUtODAwIGgtZnVsbCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzaGFkb3ctMnhsIHAtNiBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFNob3BwaW5nQmFnIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cImZvbnQtc2VyaWYgdGV4dC1sZyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMTAwXCI+XG4gICAgICAgICAgICAgICAgS29zenlrIFVzxYJ1ZyBpIFByb2R1a3TDs3dcbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtpc0NoZWNrZWRPdXQgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LTEyIHRleHQtY2VudGVyIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTYgaC0xNiByb3VuZGVkLWZ1bGwgYmctdGVhbC01MDAvMjAgdGV4dC10ZWFsLTQwMCBib3JkZXIgYm9yZGVyLXRlYWwtNTAwLzQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUgY2xhc3NOYW1lPVwidy04IGgtOFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgIFphbcOzd2llbmllIFpvc3RhxYJvIFByenlqxJl0ZSFcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWQgbWF4LXcteHMgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgIER6acSZa3VqZW15LCB7cGF0aWVudE5hbWV9LiBQb3R3aWVyZHplbmllIG9yYXogZS1yZWNlcHRhL2luc3RydWtjamUgem9zdGHFgnkgd3lzxYJhbmUgbmEgYWRyZXMgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWluZGlnby0zMDBcIj57cGF0aWVudEVtYWlsfTwvc3Ryb25nPi5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTUwMCBwdC00XCI+XG4gICAgICAgICAgICAgICAgVyByYXppZSBweXRhxYQgcHJvc2lteSBvIGtvbnRha3QgcG9kIG51bWVyZW06ICs0OCA1MTAgNDMyIDM2MS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0SXNDaGVja2VkT3V0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIG9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTYgcHgtNiBweS0yLjUgcm91bmRlZC14bCBiZy1pbmRpZ28tNjAwIHRleHQtd2hpdGUgZm9udC1tZWRpdW0gdGV4dC14cyBzaGFkb3ctbGdcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgWmFta25paiBva25vXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSA6IGNhcnRJdGVtcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LTE2IHRleHQtY2VudGVyIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8U2hvcHBpbmdCYWcgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHRleHQtc2xhdGUtNzAwIG14LWF1dG9cIiAvPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwXCI+VHfDs2oga29zenlrIGplc3QgcHVzdHkuPC9wPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwIG1heC13LXhzIG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICBXeWJpZXJ6IGUta29uc3VsdGFjasSZLCBwYWtpZXQgemFiaWVnb3d5IGx1YiBwcmVwYXJhdHkgcG96YWJpZWdvd2UgemUgc2tsZXB1LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkaXZpZGUteSBkaXZpZGUtc2xhdGUtODAwLzgwIG15LTRcIj5cbiAgICAgICAgICAgICAge2NhcnRJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aXRlbS5wcm9kdWN0LmlkfSBjbGFzc05hbWU9XCJweS0zLjUgZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgdGV4dC1pbmRpZ28tNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0ucHJvZHVjdC5jYXRlZ29yeUxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0yMDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAge2l0ZW0ucHJvZHVjdC5uYW1lfVxuICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMSBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnByb2R1Y3QucHJpY2V9IHrFgiB4IHtpdGVtLnF1YW50aXR5fSA9eycgJ31cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTEwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLnByb2R1Y3QucHJpY2UgKiBpdGVtLnF1YW50aXR5fSB6xYJcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVXBkYXRlUXVhbnRpdHkoaXRlbS5wcm9kdWN0LmlkLCAtMSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1pbnVzIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgdGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0yMDBcIj57aXRlbS5xdWFudGl0eX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25VcGRhdGVRdWFudGl0eShpdGVtLnByb2R1Y3QuaWQsIDEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25SZW1vdmVJdGVtKGl0ZW0ucHJvZHVjdC5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgdGV4dC1yb3NlLTQwMCBob3Zlcjp0ZXh0LXJvc2UtMzAwIGhvdmVyOmJnLXJvc2UtOTUwLzQwIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXN1xYQgcG96eWNqxJlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZvb3RlciAvIENoZWNrb3V0IEZvcm0gKi99XG4gICAgICAgIHshaXNDaGVja2VkT3V0ICYmIGNhcnRJdGVtcy5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICA8c3Bhbj5TdW1hIHphbcOzd2llbmlhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bCB0ZXh0LWluZGlnby0zMDAgZm9udC1ib2xkXCI+e3RvdGFsUHJpY2V9IHrFgjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlQ2hlY2tvdXRTdWJtaXR9IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1lZGl1bVwiPkRhbmUgcGFjamVudGEgZG8gcmVhbGl6YWNqaTo8L3A+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiSW1pxJkgaSBOYXp3aXNrb1wiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3BhdGllbnROYW1lfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGF0aWVudE5hbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJBZHJlcyBlLW1haWxcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtwYXRpZW50RW1haWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQYXRpZW50RW1haWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGVsXCJcbiAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiTnVtZXIgdGVsZWZvbnVcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtwYXRpZW50UGhvbmV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQYXRpZW50UGhvbmUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLWluZGlnby01MDBcIlxuICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgZmxleCBpdGVtcy1zdGFydCBnYXAtMiB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBsZWFkaW5nLW5vcm1hbFwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtdGVhbC00MDAgc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgIFphbcOzd2llbmllIHJlYWxpem93YW5lIHBvZCBuYWR6b3JlbSBtZWR5Y3pueW0gQ01MLiBFLWtvbnN1bHRhY2plIG9kYnl3YWrEhSBzacSZIHBvIHRlbGVmb25pY3pueW0gdXN0YWxlbml1IGRvZ29kbmVnbyB0ZXJtaW51LlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0zIHB4LTQgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20taW5kaWdvLTYwMCB0by1wdXJwbGUtNjAwIGhvdmVyOmZyb20taW5kaWdvLTUwMCBob3Zlcjp0by1wdXJwbGUtNTAwIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LXhzIHNoYWRvdy14bCBzaGFkb3ctaW5kaWdvLTYwMC8zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb3R3aWVyZHphbSB6YW3Ds3dpZW5pZSAoe3RvdGFsUHJpY2V9IHrFgik8L3NwYW4+XG4gICAgICAgICAgICAgICAgPEFycm93UmlnaHQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFnRGM7QUFoRGQsU0FBZ0IsZ0JBQWdCO0FBRWhDLFNBQVMsR0FBRyxRQUFRLE1BQU0sT0FBTyxhQUFhLGFBQWEsYUFBYSxrQkFBa0I7QUFXbkYsYUFBTSxZQUFzQyxDQUFDO0FBQUEsRUFDbEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBUyxLQUFLO0FBQ3RELFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEVBQUU7QUFDakQsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQVMsRUFBRTtBQUNuRCxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBUyxFQUFFO0FBRW5ELE1BQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsUUFBTSxhQUFhLFVBQVU7QUFBQSxJQUMzQixDQUFDLEtBQUssU0FBUyxNQUFNLEtBQUssUUFBUSxRQUFRLEtBQUs7QUFBQSxJQUMvQztBQUFBLEVBQ0Y7QUFFQSxRQUFNLHVCQUF1QixDQUFDLE1BQXVCO0FBQ25ELE1BQUUsZUFBZTtBQUNqQixvQkFBZ0IsSUFBSTtBQUNwQixlQUFXLE1BQU07QUFDZixrQkFBWTtBQUFBLElBQ2QsR0FBRyxHQUFJO0FBQUEsRUFDVDtBQUVBLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLHdGQUNiLGlDQUFDLFNBQUksV0FBVSw4SEFFYjtBQUFBLDJCQUFDLFNBQ0M7QUFBQSw2QkFBQyxTQUFJLFdBQVUsb0VBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsMkJB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