import __vite__cjsImport0_react_jsxDevRuntime from "/apps/nextgen_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c2c0e3b9"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/nextgen_clinic/node_modules/.vite/deps/react.js?v=c2c0e3b9"; const useState = __vite__cjsImport1_react["useState"];
import {
  X,
  Calendar as CalendarIcon,
  CheckCircle2
} from "/apps/nextgen_clinic/node_modules/.vite/deps/lucide-react.js?v=93a6f22a";
export const BookingModal = ({
  isOpen,
  onClose,
  departments,
  initialDeptId,
  initialTreatmentId,
  lang
}) => {
  if (!isOpen) return null;
  const [deptId, setDeptId] = useState(initialDeptId || "proctology");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("2026-08-10");
  const [time, setTime] = useState("10:00");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const activeDept = departments.find((d) => d.id === deptId) || departments[0];
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 bg-gradient-to-r from-sky-700 via-indigo-700 to-teal-600 text-white flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(CalendarIcon, { className: "w-6 h-6 text-sky-200" }, void 0, false, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 63,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold tracking-tight", children: lang === "pl" ? "Rezerwacja Wizyty Medycznej" : "Medical Visit Booking" }, void 0, false, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 64,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 62,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors",
          children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 73,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 69,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/BookingModal.tsx",
      lineNumber: 61,
      columnNumber: 9
    }, this),
    isSuccess ? /* @__PURE__ */ jsxDEV("div", { className: "p-10 text-center space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce", children: /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-10 h-10" }, void 0, false, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 80,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 79,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("h4", { className: "text-2xl font-black text-slate-900", children: lang === "pl" ? "Wizyta Zarezerwowana!" : "Appointment Booked!" }, void 0, false, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 82,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-600", children: lang === "pl" ? "Potwierdzenie wraz ze wskazówkami przygotowawczymi zostało wysłane na podany adres e-mail oraz SMS." : "Confirmation with preparation guide has been sent to your email and phone." }, void 0, false, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 85,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/BookingModal.tsx",
      lineNumber: 78,
      columnNumber: 11
    }, this) : /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "p-6 space-y-4 max-h-[80vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-700 mb-1", children: lang === "pl" ? "Wybierz Dziedzinę" : "Select Division" }, void 0, false, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 96,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: deptId,
            onChange: (e) => setDeptId(e.target.value),
            className: "w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500",
            children: departments.filter((d) => d.id !== "shop").map((d) => /* @__PURE__ */ jsxDEV("option", { value: d.id, children: lang === "pl" ? d.namePl : d.name }, d.id, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 105,
              columnNumber: 19
            }, this))
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 99,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 95,
        columnNumber: 13
      }, this),
      activeDept.doctors.length > 0 && /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-700 mb-1", children: lang === "pl" ? "Lekarz Specjalista" : "Specialist Doctor" }, void 0, false, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 115,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV(
          "select",
          {
            value: doctorId,
            onChange: (e) => setDoctorId(e.target.value),
            className: "w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500",
            children: [
              /* @__PURE__ */ jsxDEV("option", { value: "", children: lang === "pl" ? "Najbliższy wolny termin (Dowolny)" : "First available" }, void 0, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 123,
                columnNumber: 19
              }, this),
              activeDept.doctors.map((doc) => /* @__PURE__ */ jsxDEV("option", { value: doc.id, children: [
                doc.name,
                " (",
                doc.title,
                ")"
              ] }, doc.id, true, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 125,
                columnNumber: 21
              }, this))
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 118,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 114,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-700 mb-1", children: lang === "pl" ? "Data Wizyty" : "Visit Date" }, void 0, false, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 136,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "date",
              required: true,
              value: date,
              onChange: (e) => setDate(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 139,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 135,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-700 mb-1", children: lang === "pl" ? "Godzina" : "Time" }, void 0, false, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 149,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: time,
              onChange: (e) => setTime(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800",
              children: ["08:30", "09:15", "10:00", "11:30", "13:00", "15:15", "16:45", "18:00"].map((t) => /* @__PURE__ */ jsxDEV("option", { value: t, children: t }, t, false, {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 158,
                columnNumber: 21
              }, this))
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 152,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 148,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 134,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-2", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-700 mb-1", children: lang === "pl" ? "Imię i Nazwisko Pacjenta" : "Full Patient Name" }, void 0, false, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 167,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              required: true,
              placeholder: "Jan Kowalski",
              value: patientName,
              onChange: (e) => setPatientName(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 170,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 166,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-700 mb-1", children: lang === "pl" ? "Telefon" : "Phone" }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 182,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "tel",
                required: true,
                placeholder: "+48 600 000 000",
                value: patientPhone,
                onChange: (e) => setPatientPhone(e.target.value),
                className: "w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 185,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 181,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-700 mb-1", children: "E-mail" }, void 0, false, {
              fileName: "/app/applet/src/components/BookingModal.tsx",
              lineNumber: 196,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "email",
                required: true,
                placeholder: "pacjent@med.pl",
                value: patientEmail,
                onChange: (e) => setPatientEmail(e.target.value),
                className: "w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/BookingModal.tsx",
                lineNumber: 199,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/BookingModal.tsx",
            lineNumber: 195,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 180,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/BookingModal.tsx",
        lineNumber: 165,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          className: "w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-700 text-white text-xs font-bold shadow-md hover:from-sky-500 hover:to-indigo-500 transition-all",
          children: lang === "pl" ? "Potwierdzam Rezerwację" : "Confirm Visit Booking"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/BookingModal.tsx",
          lineNumber: 211,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/BookingModal.tsx",
      lineNumber: 92,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/BookingModal.tsx",
    lineNumber: 58,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/BookingModal.tsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJvb2tpbmdNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFgsIFxuICBDYWxlbmRhciBhcyBDYWxlbmRhckljb24sIFxuICBDbG9jaywgXG4gIFVzZXIsIFxuICBQaG9uZSwgXG4gIE1haWwsIFxuICBDaGVja0NpcmNsZTIsIFxuICBTaGllbGRDaGVjaywgXG4gIFNwYXJrbGVzXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBEZXBhcnRtZW50IH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5pbnRlcmZhY2UgQm9va2luZ01vZGFsUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIGRlcGFydG1lbnRzOiBEZXBhcnRtZW50W107XG4gIGluaXRpYWxEZXB0SWQ/OiBzdHJpbmc7XG4gIGluaXRpYWxUcmVhdG1lbnRJZD86IHN0cmluZztcbiAgbGFuZzogJ3BsJyB8ICdlbic7XG59XG5cbmV4cG9ydCBjb25zdCBCb29raW5nTW9kYWw6IFJlYWN0LkZDPEJvb2tpbmdNb2RhbFByb3BzPiA9ICh7XG4gIGlzT3BlbixcbiAgb25DbG9zZSxcbiAgZGVwYXJ0bWVudHMsXG4gIGluaXRpYWxEZXB0SWQsXG4gIGluaXRpYWxUcmVhdG1lbnRJZCxcbiAgbGFuZ1xufSkgPT4ge1xuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgW2RlcHRJZCwgc2V0RGVwdElkXSA9IHVzZVN0YXRlKGluaXRpYWxEZXB0SWQgfHwgJ3Byb2N0b2xvZ3knKTtcbiAgY29uc3QgW2RvY3RvcklkLCBzZXREb2N0b3JJZF0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtkYXRlLCBzZXREYXRlXSA9IHVzZVN0YXRlKCcyMDI2LTA4LTEwJyk7XG4gIGNvbnN0IFt0aW1lLCBzZXRUaW1lXSA9IHVzZVN0YXRlKCcxMDowMCcpO1xuICBjb25zdCBbcGF0aWVudE5hbWUsIHNldFBhdGllbnROYW1lXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3BhdGllbnRQaG9uZSwgc2V0UGF0aWVudFBob25lXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3BhdGllbnRFbWFpbCwgc2V0UGF0aWVudEVtYWlsXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW25vdGVzLCBzZXROb3Rlc10gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtpc1N1Y2Nlc3MsIHNldElzU3VjY2Vzc10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgYWN0aXZlRGVwdCA9IGRlcGFydG1lbnRzLmZpbmQoKGQpID0+IGQuaWQgPT09IGRlcHRJZCkgfHwgZGVwYXJ0bWVudHNbMF07XG5cbiAgY29uc3QgaGFuZGxlU3VibWl0ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRJc1N1Y2Nlc3ModHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRJc1N1Y2Nlc3MoZmFsc2UpO1xuICAgICAgb25DbG9zZSgpO1xuICAgIH0sIDI1MDApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHNtOnAtNiBiZy1zbGF0ZS05NTAvNjAgYmFja2Ryb3AtYmx1ci1tZCBhbmltYXRlLWluIGZhZGUtaW4gZHVyYXRpb24tMjAwXCI+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIG1heC13LXhsIGJnLXdoaXRlIHJvdW5kZWQtM3hsIHNoYWRvdy0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIFxuICAgICAgICB7LyogTW9kYWwgSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiBiZy1ncmFkaWVudC10by1yIGZyb20tc2t5LTcwMCB2aWEtaW5kaWdvLTcwMCB0by10ZWFsLTYwMCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxDYWxlbmRhckljb24gY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LXNreS0yMDBcIiAvPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRyYWNraW5nLXRpZ2h0XCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1JlemVyd2FjamEgV2l6eXR5IE1lZHljem5laicgOiAnTWVkaWNhbCBWaXNpdCBCb29raW5nJ31cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtZnVsbCBiZy1ibGFjay8yMCBob3ZlcjpiZy1ibGFjay80MCB0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2lzU3VjY2VzcyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMTAgdGV4dC1jZW50ZXIgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTYgaC0xNiByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC0xMDAgdGV4dC1lbWVyYWxkLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBteC1hdXRvIGFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0xMCBoLTEwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnV2l6eXRhIFphcmV6ZXJ3b3dhbmEhJyA6ICdBcHBvaW50bWVudCBCb29rZWQhJ31cbiAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNjAwXCI+XG4gICAgICAgICAgICAgIHtsYW5nID09PSAncGwnIFxuICAgICAgICAgICAgICAgID8gJ1BvdHdpZXJkemVuaWUgd3JheiB6ZSB3c2thesOzd2thbWkgcHJ6eWdvdG93YXdjenltaSB6b3N0YcWCbyB3eXPFgmFuZSBuYSBwb2RhbnkgYWRyZXMgZS1tYWlsIG9yYXogU01TLicgXG4gICAgICAgICAgICAgICAgOiAnQ29uZmlybWF0aW9uIHdpdGggcHJlcGFyYXRpb24gZ3VpZGUgaGFzIGJlZW4gc2VudCB0byB5b3VyIGVtYWlsIGFuZCBwaG9uZS4nfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInAtNiBzcGFjZS15LTQgbWF4LWgtWzgwdmhdIG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogRGVwYXJ0bWVudCBTZWxlY3Rpb24gKi99XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ1d5YmllcnogRHppZWR6aW7EmScgOiAnU2VsZWN0IERpdmlzaW9uJ31cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtkZXB0SWR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXREZXB0SWQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDAgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctc2t5LTUwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7ZGVwYXJ0bWVudHMuZmlsdGVyKGQgPT4gZC5pZCAhPT0gJ3Nob3AnKS5tYXAoKGQpID0+IChcbiAgICAgICAgICAgICAgICAgIDxvcHRpb24ga2V5PXtkLmlkfSB2YWx1ZT17ZC5pZH0+XG4gICAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gZC5uYW1lUGwgOiBkLm5hbWV9XG4gICAgICAgICAgICAgICAgICA8L29wdGlvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIERvY3RvciBTZWxlY3Rpb24gKi99XG4gICAgICAgICAgICB7YWN0aXZlRGVwdC5kb2N0b3JzLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdMZWthcnogU3BlY2phbGlzdGEnIDogJ1NwZWNpYWxpc3QgRG9jdG9yJ31cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtkb2N0b3JJZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0RG9jdG9ySWQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMCBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1za3ktNTAwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+e2xhbmcgPT09ICdwbCcgPyAnTmFqYmxpxbxzenkgd29sbnkgdGVybWluIChEb3dvbG55KScgOiAnRmlyc3QgYXZhaWxhYmxlJ308L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIHthY3RpdmVEZXB0LmRvY3RvcnMubWFwKChkb2MpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e2RvYy5pZH0gdmFsdWU9e2RvYy5pZH0+XG4gICAgICAgICAgICAgICAgICAgICAge2RvYy5uYW1lfSAoe2RvYy50aXRsZX0pXG4gICAgICAgICAgICAgICAgICAgIDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIERhdGUgJiBUaW1lICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0zXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0RhdGEgV2l6eXR5JyA6ICdWaXNpdCBEYXRlJ31cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImRhdGVcIlxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtkYXRlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXREYXRlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgIHtsYW5nID09PSAncGwnID8gJ0dvZHppbmEnIDogJ1RpbWUnfVxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3RpbWV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFRpbWUoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge1snMDg6MzAnLCAnMDk6MTUnLCAnMTA6MDAnLCAnMTE6MzAnLCAnMTM6MDAnLCAnMTU6MTUnLCAnMTY6NDUnLCAnMTg6MDAnXS5tYXAoKHQpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3R9IHZhbHVlPXt0fT57dH08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUGF0aWVudCBJbmZvICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcHQtMlwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdJbWnEmSBpIE5hendpc2tvIFBhY2plbnRhJyA6ICdGdWxsIFBhdGllbnQgTmFtZSd9XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkphbiBLb3dhbHNraVwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17cGF0aWVudE5hbWV9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhdGllbnROYW1lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS04MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS03MDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICB7bGFuZyA9PT0gJ3BsJyA/ICdUZWxlZm9uJyA6ICdQaG9uZSd9XG4gICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZWxcIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIis0OCA2MDAgMDAwIDAwMFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtwYXRpZW50UGhvbmV9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGF0aWVudFBob25lKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTUwIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTgwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTcwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgIEUtbWFpbFxuICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInBhY2plbnRAbWVkLnBsXCJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3BhdGllbnRFbWFpbH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQYXRpZW50RW1haWwoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtNTAgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtODAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0zIG10LTQgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tc2t5LTYwMCB2aWEtaW5kaWdvLTYwMCB0by1za3ktNzAwIHRleHQtd2hpdGUgdGV4dC14cyBmb250LWJvbGQgc2hhZG93LW1kIGhvdmVyOmZyb20tc2t5LTUwMCBob3Zlcjp0by1pbmRpZ28tNTAwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xhbmcgPT09ICdwbCcgPyAnUG90d2llcmR6YW0gUmV6ZXJ3YWNqxJknIDogJ0NvbmZpcm0gVmlzaXQgQm9va2luZyd9XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgKX1cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUE4RFk7QUE5RFosU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBS1o7QUFBQSxPQUdLO0FBWUEsYUFBTSxlQUE0QyxDQUFDO0FBQUEsRUFDeEQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFFBQU0sQ0FBQyxRQUFRLFNBQVMsSUFBSSxTQUFTLGlCQUFpQixZQUFZO0FBQ2xFLFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUFTLEVBQUU7QUFDM0MsUUFBTSxDQUFDLE1BQU0sT0FBTyxJQUFJLFNBQVMsWUFBWTtBQUM3QyxRQUFNLENBQUMsTUFBTSxPQUFPLElBQUksU0FBUyxPQUFPO0FBQ3hDLFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEVBQUU7QUFDakQsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQVMsRUFBRTtBQUNuRCxRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBUyxFQUFFO0FBQ25ELFFBQU0sQ0FBQyxPQUFPLFFBQVEsSUFBSSxTQUFTLEVBQUU7QUFDckMsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQVMsS0FBSztBQUVoRCxRQUFNLGFBQWEsWUFBWSxLQUFLLENBQUMsTUFBTSxFQUFFLE9BQU8sTUFBTSxLQUFLLFlBQVksQ0FBQztBQUU1RSxRQUFNLGVBQWUsQ0FBQyxNQUF1QjtBQUMzQyxNQUFFLGVBQWU7QUFDakIsaUJBQWEsSUFBSTtBQUNqQixlQUFXLE1BQU07QUFDZixtQkFBYSxLQUFLO0FBQ2xCLGNBQVE7QUFBQSxJQUNWLEdBQUcsSUFBSTtBQUFBLEVBQ1Q7QUFFQSxTQUNFLHVCQUFDLFNBQUksV0FBVSxtSUFFYixpQ0FBQyxTQUFJLFdBQVUsb0dBR2I7QUFBQSwyQkFBQyxTQUFJLFdBQVUsNkdBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsMkJBQ2I7QUFBQSwrQkFBQyxnQkFBYSxXQUFVLDBCQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQStDO0FBQUEsUUFDL0MsdUJBQUMsUUFBRyxXQUFVLG9DQUNYLG1CQUFTLE9BQU8sZ0NBQWdDLDJCQURuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFLQTtBQUFBLE1BRUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFNBQVM7QUFBQSxVQUNULFdBQVU7QUFBQSxVQUVWLGlDQUFDLEtBQUUsV0FBVSxhQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXVCO0FBQUE7QUFBQSxRQUp6QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLQTtBQUFBLFNBYkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWNBO0FBQUEsSUFFQyxZQUNDLHVCQUFDLFNBQUksV0FBVSw4QkFDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSxrSEFDYixpQ0FBQyxnQkFBYSxXQUFVLGVBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBb0MsS0FEdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFDQSx1QkFBQyxRQUFHLFdBQVUsc0NBQ1gsbUJBQVMsT0FBTywwQkFBMEIseUJBRDdDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLE1BQ0EsdUJBQUMsT0FBRSxXQUFVLDBCQUNWLG1CQUFTLE9BQ04sd0dBQ0EsZ0ZBSE47QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlBO0FBQUEsU0FYRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBWUEsSUFFQSx1QkFBQyxVQUFLLFVBQVUsY0FBYyxXQUFVLDhDQUd0QztBQUFBLDZCQUFDLFNBQ0M7QUFBQSwrQkFBQyxXQUFNLFdBQVUsK0NBQ2QsbUJBQVMsT0FBTyxzQkFBc0IscUJBRHpDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0E7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE9BQU87QUFBQSxZQUNQLFVBQVUsQ0FBQyxNQUFNLFVBQVUsRUFBRSxPQUFPLEtBQUs7QUFBQSxZQUN6QyxXQUFVO0FBQUEsWUFFVCxzQkFBWSxPQUFPLE9BQUssRUFBRSxPQUFPLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFDN0MsdUJBQUMsWUFBa0IsT0FBTyxFQUFFLElBQ3pCLG1CQUFTLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFEbkIsRUFBRSxJQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUEsQ0FDRDtBQUFBO0FBQUEsVUFUSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFVQTtBQUFBLFdBZEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWVBO0FBQUEsTUFHQyxXQUFXLFFBQVEsU0FBUyxLQUMzQix1QkFBQyxTQUNDO0FBQUEsK0JBQUMsV0FBTSxXQUFVLCtDQUNkLG1CQUFTLE9BQU8sdUJBQXVCLHVCQUQxQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxPQUFPO0FBQUEsWUFDUCxVQUFVLENBQUMsTUFBTSxZQUFZLEVBQUUsT0FBTyxLQUFLO0FBQUEsWUFDM0MsV0FBVTtBQUFBLFlBRVY7QUFBQSxxQ0FBQyxZQUFPLE9BQU0sSUFBSSxtQkFBUyxPQUFPLHNDQUFzQyxxQkFBeEU7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBMEY7QUFBQSxjQUN6RixXQUFXLFFBQVEsSUFBSSxDQUFDLFFBQ3ZCLHVCQUFDLFlBQW9CLE9BQU8sSUFBSSxJQUM3QjtBQUFBLG9CQUFJO0FBQUEsZ0JBQUs7QUFBQSxnQkFBRyxJQUFJO0FBQUEsZ0JBQU07QUFBQSxtQkFEWixJQUFJLElBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRUEsQ0FDRDtBQUFBO0FBQUE7QUFBQSxVQVZIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVdBO0FBQUEsV0FmRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBZ0JBO0FBQUEsTUFJRix1QkFBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQSwrQkFBQyxTQUNDO0FBQUEsaUNBQUMsV0FBTSxXQUFVLCtDQUNkLG1CQUFTLE9BQU8sZ0JBQWdCLGdCQURuQztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsVUFDQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsVUFBUTtBQUFBLGNBQ1IsT0FBTztBQUFBLGNBQ1AsVUFBVSxDQUFDLE1BQU0sUUFBUSxFQUFFLE9BQU8sS0FBSztBQUFBLGNBQ3ZDLFdBQVU7QUFBQTtBQUFBLFlBTFo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBTUE7QUFBQSxhQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFXQTtBQUFBLFFBRUEsdUJBQUMsU0FDQztBQUFBLGlDQUFDLFdBQU0sV0FBVSwrQ0FDZCxtQkFBUyxPQUFPLFlBQVksVUFEL0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE9BQU87QUFBQSxjQUNQLFVBQVUsQ0FBQyxNQUFNLFFBQVEsRUFBRSxPQUFPLEtBQUs7QUFBQSxjQUN2QyxXQUFVO0FBQUEsY0FFVCxXQUFDLFNBQVMsU0FBUyxTQUFTLFNBQVMsU0FBUyxTQUFTLFNBQVMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUM3RSx1QkFBQyxZQUFlLE9BQU8sR0FBSSxlQUFkLEdBQWI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBNkIsQ0FDOUI7QUFBQTtBQUFBLFlBUEg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBUUE7QUFBQSxhQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFhQTtBQUFBLFdBM0JGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUE0QkE7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVSxrQkFDYjtBQUFBLCtCQUFDLFNBQ0M7QUFBQSxpQ0FBQyxXQUFNLFdBQVUsK0NBQ2QsbUJBQVMsT0FBTyw2QkFBNkIsdUJBRGhEO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxNQUFLO0FBQUEsY0FDTCxVQUFRO0FBQUEsY0FDUixhQUFZO0FBQUEsY0FDWixPQUFPO0FBQUEsY0FDUCxVQUFVLENBQUMsTUFBTSxlQUFlLEVBQUUsT0FBTyxLQUFLO0FBQUEsY0FDOUMsV0FBVTtBQUFBO0FBQUEsWUFOWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFPQTtBQUFBLGFBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVlBO0FBQUEsUUFFQSx1QkFBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQSxpQ0FBQyxTQUNDO0FBQUEsbUNBQUMsV0FBTSxXQUFVLCtDQUNkLG1CQUFTLE9BQU8sWUFBWSxXQUQvQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsWUFDQTtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLE1BQUs7QUFBQSxnQkFDTCxVQUFRO0FBQUEsZ0JBQ1IsYUFBWTtBQUFBLGdCQUNaLE9BQU87QUFBQSxnQkFDUCxVQUFVLENBQUMsTUFBTSxnQkFBZ0IsRUFBRSxPQUFPLEtBQUs7QUFBQSxnQkFDL0MsV0FBVTtBQUFBO0FBQUEsY0FOWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFPQTtBQUFBLGVBWEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFZQTtBQUFBLFVBRUEsdUJBQUMsU0FDQztBQUFBLG1DQUFDLFdBQU0sV0FBVSwrQ0FBOEMsc0JBQS9EO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxZQUNBO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBSztBQUFBLGdCQUNMLFVBQVE7QUFBQSxnQkFDUixhQUFZO0FBQUEsZ0JBQ1osT0FBTztBQUFBLGdCQUNQLFVBQVUsQ0FBQyxNQUFNLGdCQUFnQixFQUFFLE9BQU8sS0FBSztBQUFBLGdCQUMvQyxXQUFVO0FBQUE7QUFBQSxjQU5aO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQU9BO0FBQUEsZUFYRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQVlBO0FBQUEsYUEzQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQTRCQTtBQUFBLFdBM0NGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUE0Q0E7QUFBQSxNQUVBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxNQUFLO0FBQUEsVUFDTCxXQUFVO0FBQUEsVUFFVCxtQkFBUyxPQUFPLDJCQUEyQjtBQUFBO0FBQUEsUUFKOUM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS0E7QUFBQSxTQTVIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBOEhBO0FBQUEsT0FoS0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQW1LQSxLQXJLRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBc0tBO0FBRUo7IiwibmFtZXMiOltdfQ==