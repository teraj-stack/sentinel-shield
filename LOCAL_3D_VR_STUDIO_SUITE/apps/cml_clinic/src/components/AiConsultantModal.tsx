import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"];
import {
  X,
  Send,
  Brain,
  User,
  AlertCircle,
  RefreshCw,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Radio,
  Square,
  CheckCircle2
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
export const AiConsultantModal = ({
  isOpen,
  onClose,
  selectedSymptoms
}) => {
  const [messages, setMessages] = useState([
    {
      id: "init-1",
      sender: "assistant",
      text: "Dzień dobry. Jestem Asystentem AI Centrum Medycyny Laserowej CML (Model Gemini 3.1 Pro z trybem wysokiego myślenia - High Thinking). Mogę odpowiedzieć na Twoje pytania dotyczące objawów proktologicznych, przygotowania do zabiegów laserowych LHP/FiLaC/SiLaC oraz kosztów leczenia. Dostępna jest również pełna obsługa głosowa (Web Speech API) - powiedz lub napisz, co Cię niepokoi.",
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("patient");
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState(null);
  const [isAutoRead, setIsAutoRead] = useState(true);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "pl-PL";
      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };
      recognition.onresult = (event) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInputQuery(currentTranscript);
      };
      recognition.onerror = (event) => {
        console.warn("Speech Recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          setSpeechError("Brak uprawnień do mikrofonu w przeglądarce.");
        } else if (event.error === "no-speech") {
          setSpeechError("Nie wykryto mowy. Spróbuj powtórzyć.");
        } else {
          setSpeechError(`Błąd rozpoznawania mowy: ${event.error}`);
        }
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognitionRef.current = recognition;
    } else {
      setSpeechSupported(false);
    }
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
        }
      }
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  const speakText = (text, msgId) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`~]/g, "").replace(/High Thinking/gi, "Haj Thinkink").replace(/LHP®/gi, "El Ha Pe").replace(/FiLaC®/gi, "Fi Lak").replace(/SiLaC®/gi, "Si Lak");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "pl-PL";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeakingMsgId(msgId);
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);
    window.speechSynthesis.speak(utterance);
  };
  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
    }
  };
  const toggleListening = () => {
    if (!recognitionRef.current) {
      setSpeechError("Twoja przeglądarka nie obsługuje mikrofonu Web Speech API.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        stopSpeaking();
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start speech recognition", err);
      }
    }
  };
  if (!isOpen) return null;
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;
    const userText = inputQuery.trim();
    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);
    stopSpeaking();
    try {
      const res = await fetch("/api/ai/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userText,
          mode,
          symptoms: selectedSymptoms
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Wystąpił błąd serwera.");
      }
      const responseText = data.text || "Brak odpowiedzi od asystenta.";
      const newMsgId = `assistant-${Date.now()}`;
      const assistantMsg = {
        id: newMsgId,
        sender: "assistant",
        text: responseText,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        thinkingLevel: "ThinkingLevel.HIGH (gemini-3.1-pro-preview)"
      };
      setMessages((prev) => [...prev, assistantMsg]);
      if (isAutoRead) {
        speakText(responseText, newMsgId);
      }
    } catch (err) {
      const errorText = `Przepraszamy, nie udało się uzyskać odpowiedzi: ${err.message}. Prosimy o skontaktowanie się z rejestracją CML pod numerem +48 510 432 361.`;
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "assistant",
          text: errorText,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      if (isAutoRead) {
        speakText(errorText, `err-${Date.now()}`);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-fade-in", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl bg-white border border-purple-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[88vh] text-slate-900", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-600/30", children: /* @__PURE__ */ jsxDEV(Brain, { className: "w-5 h-5 text-white animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 255,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 254,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-base sm:text-lg font-bold text-white", children: "Konsultant AI CML (Głosowy Gemini 3.1 Pro)" }, void 0, false, {
              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
              lineNumber: 259,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30", children: "Speech & Thinking" }, void 0, false, {
              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
              lineNumber: 262,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 258,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Głosowa i pisemna konsultacja proktologiczna oraz analiza SEO" }, void 0, false, {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 266,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 257,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 253,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              if (speakingMsgId) stopSpeaking();
              setIsAutoRead(!isAutoRead);
            },
            className: `p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 ${isAutoRead ? "bg-purple-900/60 border-purple-500/40 text-purple-300" : "bg-slate-800 border-slate-700 text-slate-400"}`,
            title: isAutoRead ? "Automatyczne czytanie odpowiedzi WŁĄCZONE" : "WŁĄCZ automatyczne czytanie",
            children: [
              isAutoRead ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 286,
                columnNumber: 29
              }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 286,
                columnNumber: 79
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: isAutoRead ? "Głos AI: On" : "Głos AI: Off" }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 287,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 274,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 border border-slate-700 hover:bg-slate-700",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
              lineNumber: 294,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 290,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 272,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiConsultantModal.tsx",
      lineNumber: 252,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMode("patient"),
            className: `px-3 py-1.5 rounded-xl transition-all font-semibold ${mode === "patient" ? "bg-purple-600 text-white shadow-md shadow-purple-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"}`,
            children: "Konsultacja Medyczna"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 302,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setMode("seo_audit"),
            className: `px-3 py-1.5 rounded-xl transition-all font-semibold ${mode === "seo_audit" ? "bg-purple-600 text-white shadow-md shadow-purple-600/20" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"}`,
            children: "Audytor SEO & Treści"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 312,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 301,
        columnNumber: 11
      }, this),
      selectedSymptoms.length > 0 && /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-semibold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-200 truncate max-w-[220px]", children: [
        selectedSymptoms.length,
        " objawów w kontekście"
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 325,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiConsultantModal.tsx",
      lineNumber: 300,
      columnNumber: 9
    }, this),
    isListening && /* @__PURE__ */ jsxDEV("div", { className: "bg-purple-600 text-white px-4 py-2 text-xs flex items-center justify-between animate-pulse", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 animate-spin text-purple-200" }, void 0, false, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 335,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-bold", children: "Mów teraz do mikrofonu... Wykrywanie głosu pacjenta w języku polskim" }, void 0, false, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 336,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 334,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: toggleListening,
          className: "px-2 py-0.5 rounded bg-white text-purple-900 font-bold text-[10px] uppercase",
          children: "Zatrzymaj"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 338,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiConsultantModal.tsx",
      lineNumber: 333,
      columnNumber: 11
    }, this),
    speechError && /* @__PURE__ */ jsxDEV("div", { className: "bg-amber-50 text-amber-900 border-b border-amber-200 px-4 py-1.5 text-xs flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-medium", children: speechError }, void 0, false, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 349,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("button", { onClick: () => setSpeechError(null), className: "text-amber-700 font-bold text-xs", children: "×" }, void 0, false, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 350,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiConsultantModal.tsx",
      lineNumber: 348,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 overflow-y-auto space-y-4 flex-1 bg-slate-50/50", children: [
      messages.map((msg) => {
        const isSpeakingThis = speakingMsgId === msg.id;
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`,
            children: [
              msg.sender === "assistant" && /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 mt-1 shadow-sm", children: /* @__PURE__ */ jsxDEV(Brain, { className: "w-4 h-4 text-purple-700" }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 368,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 367,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: `max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${msg.sender === "user" ? "bg-purple-600 text-white rounded-br-none" : "bg-white border border-slate-200 text-slate-800 rounded-bl-none"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "whitespace-pre-wrap", children: msg.text }, void 0, false, {
                      fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                      lineNumber: 379,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "mt-2.5 pt-2 border-t border-slate-100/30 flex items-center justify-between gap-2 text-[10px] opacity-75", children: [
                      /* @__PURE__ */ jsxDEV("span", { children: msg.timestamp }, void 0, false, {
                        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                        lineNumber: 382,
                        columnNumber: 21
                      }, this),
                      msg.sender === "assistant" && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: isSpeakingThis ? /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: stopSpeaking,
                          className: "flex items-center gap-1 text-purple-600 font-bold bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200 animate-pulse",
                          children: [
                            /* @__PURE__ */ jsxDEV(Square, { className: "w-3 h-3 fill-current" }, void 0, false, {
                              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                              lineNumber: 391,
                              columnNumber: 29
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: "Zatrzymaj Głos" }, void 0, false, {
                              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                              lineNumber: 392,
                              columnNumber: 29
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                          lineNumber: 387,
                          columnNumber: 27
                        },
                        this
                      ) : /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: () => speakText(msg.text, msg.id),
                          className: "flex items-center gap-1 text-slate-600 hover:text-purple-700 font-semibold bg-slate-100 hover:bg-purple-50 px-2 py-0.5 rounded-lg border border-slate-200 transition-all",
                          children: [
                            /* @__PURE__ */ jsxDEV(Volume2, { className: "w-3 h-3 text-purple-600" }, void 0, false, {
                              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                              lineNumber: 399,
                              columnNumber: 29
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: "Odtwórz Głosowo" }, void 0, false, {
                              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                              lineNumber: 400,
                              columnNumber: 29
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                          lineNumber: 395,
                          columnNumber: 27
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                        lineNumber: 385,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                      lineNumber: 381,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                  lineNumber: 372,
                  columnNumber: 17
                },
                this
              ),
              msg.sender === "user" && /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm", children: /* @__PURE__ */ jsxDEV(User, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 410,
                columnNumber: 21
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 409,
                columnNumber: 19
              }, this)
            ]
          },
          msg.id,
          true,
          {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 362,
            columnNumber: 15
          },
          this
        );
      }),
      isLoading && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 p-4 rounded-2xl bg-white border border-purple-200 max-w-[85%] text-xs text-purple-900 shadow-md", children: [
        /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4 animate-spin text-purple-600" }, void 0, false, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 419,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Model Gemini 3.1 Pro generuje diagnozę medyczną (Tryb High Thinking)..." }, void 0, false, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 420,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 418,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { ref: messagesEndRef }, void 0, false, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 424,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiConsultantModal.tsx",
      lineNumber: 357,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-white border-t border-slate-200 flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSend, className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            onClick: toggleListening,
            className: `p-3 rounded-xl transition-all shadow-md flex items-center justify-center shrink-0 ${isListening ? "bg-red-600 text-white animate-bounce shadow-red-600/40 ring-4 ring-red-200" : "bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200"}`,
            title: isListening ? "Zatrzymaj nagrywanie" : "Mów do mikrofonu (Web Speech API)",
            children: isListening ? /* @__PURE__ */ jsxDEV(MicOff, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
              lineNumber: 441,
              columnNumber: 30
            }, this) : /* @__PURE__ */ jsxDEV(Mic, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/AiConsultantModal.tsx",
              lineNumber: 441,
              columnNumber: 63
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 431,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            value: inputQuery,
            onChange: (e) => setInputQuery(e.target.value),
            placeholder: isListening ? "Słucham... mów do mikrofonu" : mode === "patient" ? "Mów lub napisz doliwości (np. Ból po wypróżnieniu, zalecenia LHP)..." : "Napisz zapytanie SEO...",
            className: "flex-1 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-600 focus:bg-white transition-all font-medium"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 444,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            disabled: isLoading || !inputQuery.trim(),
            className: "px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 transition-all shrink-0",
            children: [
              /* @__PURE__ */ jsxDEV(Send, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 463,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wyślij" }, void 0, false, {
                fileName: "/app/applet/src/components/AiConsultantModal.tsx",
                lineNumber: 464,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 458,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 429,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] text-slate-500 px-1 pt-1 border-t border-slate-100", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3 text-purple-600" }, void 0, false, {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 470,
            columnNumber: 15
          }, this),
          "Rozpoznawanie mowy: ",
          speechSupported ? "Web Speech API Aktywne" : "Tylko klawiatura"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 469,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1 text-amber-700", children: [
          /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-3 h-3" }, void 0, false, {
            fileName: "/app/applet/src/components/AiConsultantModal.tsx",
            lineNumber: 474,
            columnNumber: 15
          }, this),
          "Edukacyjny asystent AI CML"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/AiConsultantModal.tsx",
          lineNumber: 473,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/AiConsultantModal.tsx",
        lineNumber: 468,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/AiConsultantModal.tsx",
      lineNumber: 428,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/AiConsultantModal.tsx",
    lineNumber: 250,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/AiConsultantModal.tsx",
    lineNumber: 249,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFpQ29uc3VsdGFudE1vZGFsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQWlDb25zdWx0YXRpb25NZXNzYWdlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHtcbiAgWCxcbiAgU3BhcmtsZXMsXG4gIFNlbmQsXG4gIEJyYWluLFxuICBVc2VyLFxuICBBbGVydENpcmNsZSxcbiAgUmVmcmVzaEN3LFxuICBNaWMsXG4gIE1pY09mZixcbiAgVm9sdW1lMixcbiAgVm9sdW1lWCxcbiAgUmFkaW8sXG4gIFBsYXksXG4gIFNxdWFyZSxcbiAgQ2hlY2tDaXJjbGUyLFxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5pbnRlcmZhY2UgQWlDb25zdWx0YW50TW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgc2VsZWN0ZWRTeW1wdG9tczogc3RyaW5nW107XG59XG5cbi8vIEdsb2JhbCB3aW5kb3cgZGVjbGFyYXRpb25zIGZvciBXZWIgU3BlZWNoIEFQSVxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBTcGVlY2hSZWNvZ25pdGlvbj86IGFueTtcbiAgICB3ZWJraXRTcGVlY2hSZWNvZ25pdGlvbj86IGFueTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgQWlDb25zdWx0YW50TW9kYWw6IFJlYWN0LkZDPEFpQ29uc3VsdGFudE1vZGFsUHJvcHM+ID0gKHtcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuICBzZWxlY3RlZFN5bXB0b21zLFxufSkgPT4ge1xuICBjb25zdCBbbWVzc2FnZXMsIHNldE1lc3NhZ2VzXSA9IHVzZVN0YXRlPEFpQ29uc3VsdGF0aW9uTWVzc2FnZVtdPihbXG4gICAge1xuICAgICAgaWQ6ICdpbml0LTEnLFxuICAgICAgc2VuZGVyOiAnYXNzaXN0YW50JyxcbiAgICAgIHRleHQ6ICdEemllxYQgZG9icnkuIEplc3RlbSBBc3lzdGVudGVtIEFJIENlbnRydW0gTWVkeWN5bnkgTGFzZXJvd2VqIENNTCAoTW9kZWwgR2VtaW5pIDMuMSBQcm8geiB0cnliZW0gd3lzb2tpZWdvIG15xZtsZW5pYSAtIEhpZ2ggVGhpbmtpbmcpLiBNb2fEmSBvZHBvd2llZHppZcSHIG5hIFR3b2plIHB5dGFuaWEgZG90eWN6xIVjZSBvYmphd8OzdyBwcm9rdG9sb2dpY3pueWNoLCBwcnp5Z290b3dhbmlhIGRvIHphYmllZ8OzdyBsYXNlcm93eWNoIExIUC9GaUxhQy9TaUxhQyBvcmF6IGtvc3p0w7N3IGxlY3plbmlhLiBEb3N0xJlwbmEgamVzdCByw7N3bmllxbwgcGXFgm5hIG9ic8WCdWdhIGfFgm9zb3dhIChXZWIgU3BlZWNoIEFQSSkgLSBwb3dpZWR6IGx1YiBuYXBpc3osIGNvIENpxJkgbmllcG9rb2kuJyxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHsgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JyB9KSxcbiAgICB9LFxuICBdKTtcbiAgY29uc3QgW2lucHV0UXVlcnksIHNldElucHV0UXVlcnldID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbW9kZSwgc2V0TW9kZV0gPSB1c2VTdGF0ZTwncGF0aWVudCcgfCAnc2VvX2F1ZGl0Jz4oJ3BhdGllbnQnKTtcblxuICAvLyBXZWIgU3BlZWNoIEFQSSBTdGF0ZXNcbiAgY29uc3QgW2lzTGlzdGVuaW5nLCBzZXRJc0xpc3RlbmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzcGVlY2hTdXBwb3J0ZWQsIHNldFNwZWVjaFN1cHBvcnRlZF0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3NwZWVjaEVycm9yLCBzZXRTcGVlY2hFcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzQXV0b1JlYWQsIHNldElzQXV0b1JlYWRdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtzcGVha2luZ01zZ0lkLCBzZXRTcGVha2luZ01zZ0lkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHJlY29nbml0aW9uUmVmID0gdXNlUmVmPGFueT4obnVsbCk7XG4gIGNvbnN0IG1lc3NhZ2VzRW5kUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50PihudWxsKTtcblxuICAvLyBBdXRvLXNjcm9sbCB0byBib3R0b20gb2YgY29udmVyc2F0aW9uXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG1lc3NhZ2VzRW5kUmVmLmN1cnJlbnQpIHtcbiAgICAgIG1lc3NhZ2VzRW5kUmVmLmN1cnJlbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG4gICAgfVxuICB9LCBbbWVzc2FnZXMsIGlzTG9hZGluZ10pO1xuXG4gIC8vIEluaXRpYWxpemUgU3BlZWNoIFJlY29nbml0aW9uXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgU3BlZWNoUmVjb2duaXRpb24gPSB3aW5kb3cuU3BlZWNoUmVjb2duaXRpb24gfHwgd2luZG93LndlYmtpdFNwZWVjaFJlY29nbml0aW9uO1xuICAgIGlmIChTcGVlY2hSZWNvZ25pdGlvbikge1xuICAgICAgY29uc3QgcmVjb2duaXRpb24gPSBuZXcgU3BlZWNoUmVjb2duaXRpb24oKTtcbiAgICAgIHJlY29nbml0aW9uLmNvbnRpbnVvdXMgPSBmYWxzZTtcbiAgICAgIHJlY29nbml0aW9uLmludGVyaW1SZXN1bHRzID0gdHJ1ZTtcbiAgICAgIHJlY29nbml0aW9uLmxhbmcgPSAncGwtUEwnO1xuXG4gICAgICByZWNvZ25pdGlvbi5vbnN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICBzZXRJc0xpc3RlbmluZyh0cnVlKTtcbiAgICAgICAgc2V0U3BlZWNoRXJyb3IobnVsbCk7XG4gICAgICB9O1xuXG4gICAgICByZWNvZ25pdGlvbi5vbnJlc3VsdCA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50VHJhbnNjcmlwdCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gZXZlbnQucmVzdWx0SW5kZXg7IGkgPCBldmVudC5yZXN1bHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY3VycmVudFRyYW5zY3JpcHQgKz0gZXZlbnQucmVzdWx0c1tpXVswXS50cmFuc2NyaXB0O1xuICAgICAgICB9XG4gICAgICAgIHNldElucHV0UXVlcnkoY3VycmVudFRyYW5zY3JpcHQpO1xuICAgICAgfTtcblxuICAgICAgcmVjb2duaXRpb24ub25lcnJvciA9IChldmVudDogYW55KSA9PiB7XG4gICAgICAgIGNvbnNvbGUud2FybignU3BlZWNoIFJlY29nbml0aW9uIGVycm9yOicsIGV2ZW50LmVycm9yKTtcbiAgICAgICAgc2V0SXNMaXN0ZW5pbmcoZmFsc2UpO1xuICAgICAgICBpZiAoZXZlbnQuZXJyb3IgPT09ICdub3QtYWxsb3dlZCcpIHtcbiAgICAgICAgICBzZXRTcGVlY2hFcnJvcignQnJhayB1cHJhd25pZcWEIGRvIG1pa3JvZm9udSB3IHByemVnbMSFZGFyY2UuJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuZXJyb3IgPT09ICduby1zcGVlY2gnKSB7XG4gICAgICAgICAgc2V0U3BlZWNoRXJyb3IoJ05pZSB3eWtyeXRvIG1vd3kuIFNwcsOzYnVqIHBvd3TDs3J6ecSHLicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFNwZWVjaEVycm9yKGBCxYLEhWQgcm96cG96bmF3YW5pYSBtb3d5OiAke2V2ZW50LmVycm9yfWApO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZWNvZ25pdGlvbi5vbmVuZCA9ICgpID0+IHtcbiAgICAgICAgc2V0SXNMaXN0ZW5pbmcoZmFsc2UpO1xuICAgICAgfTtcblxuICAgICAgcmVjb2duaXRpb25SZWYuY3VycmVudCA9IHJlY29nbml0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRTcGVlY2hTdXBwb3J0ZWQoZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAocmVjb2duaXRpb25SZWYuY3VycmVudCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlY29nbml0aW9uUmVmLmN1cnJlbnQuc3RvcCgpO1xuICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgfVxuICAgICAgaWYgKCdzcGVlY2hTeW50aGVzaXMnIGluIHdpbmRvdykge1xuICAgICAgICB3aW5kb3cuc3BlZWNoU3ludGhlc2lzLmNhbmNlbCgpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICAvLyBTcGVhayBUZXh0IEZ1bmN0aW9uIHVzaW5nIFNwZWVjaFN5bnRoZXNpc1xuICBjb25zdCBzcGVha1RleHQgPSAodGV4dDogc3RyaW5nLCBtc2dJZDogc3RyaW5nKSA9PiB7XG4gICAgaWYgKCEoJ3NwZWVjaFN5bnRoZXNpcycgaW4gd2luZG93KSkgcmV0dXJuO1xuXG4gICAgd2luZG93LnNwZWVjaFN5bnRoZXNpcy5jYW5jZWwoKTsgLy8gU3RvcCBhbnkgb25nb2luZyBzcGVlY2hcblxuICAgIC8vIFJlbW92ZSBtYXJrZG93biBjb2RlIHRhZ3Mgb3IgYXN0ZXJpc2tzIGZvciBjbGVhbiBzcGVlY2hcbiAgICBjb25zdCBjbGVhblRleHQgPSB0ZXh0XG4gICAgICAucmVwbGFjZSgvWypfI2B+XS9nLCAnJylcbiAgICAgIC5yZXBsYWNlKC9IaWdoIFRoaW5raW5nL2dpLCAnSGFqIFRoaW5raW5rJylcbiAgICAgIC5yZXBsYWNlKC9MSFDCri9naSwgJ0VsIEhhIFBlJylcbiAgICAgIC5yZXBsYWNlKC9GaUxhQ8KuL2dpLCAnRmkgTGFrJylcbiAgICAgIC5yZXBsYWNlKC9TaUxhQ8KuL2dpLCAnU2kgTGFrJyk7XG5cbiAgICBjb25zdCB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlKGNsZWFuVGV4dCk7XG4gICAgdXR0ZXJhbmNlLmxhbmcgPSAncGwtUEwnO1xuICAgIHV0dGVyYW5jZS5yYXRlID0gMS4wO1xuICAgIHV0dGVyYW5jZS5waXRjaCA9IDEuMDtcblxuICAgIHV0dGVyYW5jZS5vbnN0YXJ0ID0gKCkgPT4gc2V0U3BlYWtpbmdNc2dJZChtc2dJZCk7XG4gICAgdXR0ZXJhbmNlLm9uZW5kID0gKCkgPT4gc2V0U3BlYWtpbmdNc2dJZChudWxsKTtcbiAgICB1dHRlcmFuY2Uub25lcnJvciA9ICgpID0+IHNldFNwZWFraW5nTXNnSWQobnVsbCk7XG5cbiAgICB3aW5kb3cuc3BlZWNoU3ludGhlc2lzLnNwZWFrKHV0dGVyYW5jZSk7XG4gIH07XG5cbiAgY29uc3Qgc3RvcFNwZWFraW5nID0gKCkgPT4ge1xuICAgIGlmICgnc3BlZWNoU3ludGhlc2lzJyBpbiB3aW5kb3cpIHtcbiAgICAgIHdpbmRvdy5zcGVlY2hTeW50aGVzaXMuY2FuY2VsKCk7XG4gICAgICBzZXRTcGVha2luZ01zZ0lkKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICAvLyBUb2dnbGUgTWljcm9waG9uZVxuICBjb25zdCB0b2dnbGVMaXN0ZW5pbmcgPSAoKSA9PiB7XG4gICAgaWYgKCFyZWNvZ25pdGlvblJlZi5jdXJyZW50KSB7XG4gICAgICBzZXRTcGVlY2hFcnJvcignVHdvamEgcHJ6ZWdsxIVkYXJrYSBuaWUgb2JzxYJ1Z3VqZSBtaWtyb2ZvbnUgV2ViIFNwZWVjaCBBUEkuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGlzTGlzdGVuaW5nKSB7XG4gICAgICByZWNvZ25pdGlvblJlZi5jdXJyZW50LnN0b3AoKTtcbiAgICAgIHNldElzTGlzdGVuaW5nKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RvcFNwZWFraW5nKCk7XG4gICAgICAgIHJlY29nbml0aW9uUmVmLmN1cnJlbnQuc3RhcnQoKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gc3RhcnQgc3BlZWNoIHJlY29nbml0aW9uJywgZXJyKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGhhbmRsZVNlbmQgPSBhc3luYyAoZT86IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCFpbnB1dFF1ZXJ5LnRyaW0oKSB8fCBpc0xvYWRpbmcpIHJldHVybjtcblxuICAgIGNvbnN0IHVzZXJUZXh0ID0gaW5wdXRRdWVyeS50cmltKCk7XG4gICAgY29uc3QgdXNlck1zZzogQWlDb25zdWx0YXRpb25NZXNzYWdlID0ge1xuICAgICAgaWQ6IGB1c2VyLSR7RGF0ZS5ub3coKX1gLFxuICAgICAgc2VuZGVyOiAndXNlcicsXG4gICAgICB0ZXh0OiB1c2VyVGV4dCxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoW10sIHsgaG91cjogJzItZGlnaXQnLCBtaW51dGU6ICcyLWRpZ2l0JyB9KSxcbiAgICB9O1xuXG4gICAgc2V0TWVzc2FnZXMoKHByZXYpID0+IFsuLi5wcmV2LCB1c2VyTXNnXSk7XG4gICAgc2V0SW5wdXRRdWVyeSgnJyk7XG4gICAgc2V0SXNMb2FkaW5nKHRydWUpO1xuICAgIHN0b3BTcGVha2luZygpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKCcvYXBpL2FpL2NvbnN1bHQnLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHF1ZXJ5OiB1c2VyVGV4dCxcbiAgICAgICAgICBtb2RlLFxuICAgICAgICAgIHN5bXB0b21zOiBzZWxlY3RlZFN5bXB0b21zLFxuICAgICAgICB9KSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzLmpzb24oKTtcblxuICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZXJyb3IgfHwgJ1d5c3TEhXBpxYIgYsWCxIVkIHNlcndlcmEuJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlVGV4dCA9IGRhdGEudGV4dCB8fCAnQnJhayBvZHBvd2llZHppIG9kIGFzeXN0ZW50YS4nO1xuICAgICAgY29uc3QgbmV3TXNnSWQgPSBgYXNzaXN0YW50LSR7RGF0ZS5ub3coKX1gO1xuICAgICAgY29uc3QgYXNzaXN0YW50TXNnOiBBaUNvbnN1bHRhdGlvbk1lc3NhZ2UgPSB7XG4gICAgICAgIGlkOiBuZXdNc2dJZCxcbiAgICAgICAgc2VuZGVyOiAnYXNzaXN0YW50JyxcbiAgICAgICAgdGV4dDogcmVzcG9uc2VUZXh0LFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7IGhvdXI6ICcyLWRpZ2l0JywgbWludXRlOiAnMi1kaWdpdCcgfSksXG4gICAgICAgIHRoaW5raW5nTGV2ZWw6ICdUaGlua2luZ0xldmVsLkhJR0ggKGdlbWluaS0zLjEtcHJvLXByZXZpZXcpJyxcbiAgICAgIH07XG5cbiAgICAgIHNldE1lc3NhZ2VzKChwcmV2KSA9PiBbLi4ucHJldiwgYXNzaXN0YW50TXNnXSk7XG5cbiAgICAgIC8vIEF1dG8gcmVhZCByZXNwb25zZSBpZiBzcGVlY2ggZW5hYmxlZFxuICAgICAgaWYgKGlzQXV0b1JlYWQpIHtcbiAgICAgICAgc3BlYWtUZXh0KHJlc3BvbnNlVGV4dCwgbmV3TXNnSWQpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBjb25zdCBlcnJvclRleHQgPSBgUHJ6ZXByYXN6YW15LCBuaWUgdWRhxYJvIHNpxJkgdXp5c2thxIcgb2Rwb3dpZWR6aTogJHtlcnIubWVzc2FnZX0uIFByb3NpbXkgbyBza29udGFrdG93YW5pZSBzacSZIHogcmVqZXN0cmFjasSFIENNTCBwb2QgbnVtZXJlbSArNDggNTEwIDQzMiAzNjEuYDtcbiAgICAgIHNldE1lc3NhZ2VzKChwcmV2KSA9PiBbXG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIHtcbiAgICAgICAgICBpZDogYGVyci0ke0RhdGUubm93KCl9YCxcbiAgICAgICAgICBzZW5kZXI6ICdhc3Npc3RhbnQnLFxuICAgICAgICAgIHRleHQ6IGVycm9yVGV4dCxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKFtdLCB7IGhvdXI6ICcyLWRpZ2l0JywgbWludXRlOiAnMi1kaWdpdCcgfSksXG4gICAgICAgIH0sXG4gICAgICBdKTtcbiAgICAgIGlmIChpc0F1dG9SZWFkKSB7XG4gICAgICAgIHNwZWFrVGV4dChlcnJvclRleHQsIGBlcnItJHtEYXRlLm5vdygpfWApO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC84MCBiYWNrZHJvcC1ibHVyLW1kIHAtMyBzbTpwLTQgYW5pbWF0ZS1mYWRlLWluXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy0yeGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1wdXJwbGUtMjAwIHJvdW5kZWQtM3hsIHNoYWRvdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgaC1bODh2aF0gdGV4dC1zbGF0ZS05MDBcIj5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgc206cC01IGJnLXNsYXRlLTkwMCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtNjAwLzMwXCI+XG4gICAgICAgICAgICAgIDxCcmFpbiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtd2hpdGUgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1zZXJpZiB0ZXh0LWJhc2Ugc206dGV4dC1sZyBmb250LWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgS29uc3VsdGFudCBBSSBDTUwgKEfFgm9zb3d5IEdlbWluaSAzLjEgUHJvKVxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzlweF0gZm9udC1tb25vIGZvbnQtYm9sZCBiZy1wdXJwbGUtNTAwLzIwIHRleHQtcHVycGxlLTMwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvMzBcIj5cbiAgICAgICAgICAgICAgICAgIFNwZWVjaCAmIFRoaW5raW5nXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICBHxYJvc293YSBpIHBpc2VtbmEga29uc3VsdGFjamEgcHJva3RvbG9naWN6bmEgb3JheiBhbmFsaXphIFNFT1xuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIHsvKiBBdXRvIFJlYWQgVG9nZ2xlICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNwZWFraW5nTXNnSWQpIHN0b3BTcGVha2luZygpO1xuICAgICAgICAgICAgICAgIHNldElzQXV0b1JlYWQoIWlzQXV0b1JlYWQpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIgcm91bmRlZC14bCBib3JkZXIgdGV4dC14cyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICBpc0F1dG9SZWFkXG4gICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTAwLzYwIGJvcmRlci1wdXJwbGUtNTAwLzQwIHRleHQtcHVycGxlLTMwMCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgdGl0bGU9e2lzQXV0b1JlYWQgPyAnQXV0b21hdHljem5lIGN6eXRhbmllIG9kcG93aWVkemkgV8WBxIRDWk9ORScgOiAnV8WBxIRDWiBhdXRvbWF0eWN6bmUgY3p5dGFuaWUnfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXNBdXRvUmVhZCA/IDxWb2x1bWUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz4gOiA8Vm9sdW1lWCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj57aXNBdXRvUmVhZCA/ICdHxYJvcyBBSTogT24nIDogJ0fFgm9zIEFJOiBPZmYnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgYmctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGhvdmVyOmJnLXNsYXRlLTcwMFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNb2RlIFNlbGVjdG9yICYgU3ltcHRvbXMgUGlsbCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIuNSBiZy1zbGF0ZS01MCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRNb2RlKCdwYXRpZW50Jyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgZm9udC1zZW1pYm9sZCAke1xuICAgICAgICAgICAgICAgIG1vZGUgPT09ICdwYXRpZW50J1xuICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTYwMC8yMCdcbiAgICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNjAwIGhvdmVyOnRleHQtc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTIwMC82MCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIEtvbnN1bHRhY2phIE1lZHljem5hXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TW9kZSgnc2VvX2F1ZGl0Jyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgZm9udC1zZW1pYm9sZCAke1xuICAgICAgICAgICAgICAgIG1vZGUgPT09ICdzZW9fYXVkaXQnXG4gICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1wdXJwbGUtNjAwLzIwJ1xuICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtMjAwLzYwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQXVkeXRvciBTRU8gJiBUcmXFm2NpXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtzZWxlY3RlZFN5bXB0b21zLmxlbmd0aCA+IDAgJiYgKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXB1cnBsZS04MDAgYmctcHVycGxlLTEwMCBweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1wdXJwbGUtMjAwIHRydW5jYXRlIG1heC13LVsyMjBweF1cIj5cbiAgICAgICAgICAgICAge3NlbGVjdGVkU3ltcHRvbXMubGVuZ3RofSBvYmphd8OzdyB3IGtvbnRla8WbY2llXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFNwZWVjaCBSZWNvZ25pdGlvbiBBY3RpdmUgSW5kaWNhdG9yIEJhbm5lciAqL31cbiAgICAgICAge2lzTGlzdGVuaW5nICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBweC00IHB5LTIgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW4gdGV4dC1wdXJwbGUtMjAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+TcOzdyB0ZXJheiBkbyBtaWtyb2ZvbnUuLi4gV3lrcnl3YW5pZSBnxYJvc3UgcGFjamVudGEgdyBqxJl6eWt1IHBvbHNraW08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17dG9nZ2xlTGlzdGVuaW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXdoaXRlIHRleHQtcHVycGxlLTkwMCBmb250LWJvbGQgdGV4dC1bMTBweF0gdXBwZXJjYXNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgWmF0cnp5bWFqXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7c3BlZWNoRXJyb3IgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYW1iZXItNTAgdGV4dC1hbWJlci05MDAgYm9yZGVyLWIgYm9yZGVyLWFtYmVyLTIwMCBweC00IHB5LTEuNSB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tZWRpdW1cIj57c3BlZWNoRXJyb3J9PC9zcGFuPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRTcGVlY2hFcnJvcihudWxsKX0gY2xhc3NOYW1lPVwidGV4dC1hbWJlci03MDAgZm9udC1ib2xkIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgw5dcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBNZXNzYWdlIEhpc3RvcnkgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IG92ZXJmbG93LXktYXV0byBzcGFjZS15LTQgZmxleC0xIGJnLXNsYXRlLTUwLzUwXCI+XG4gICAgICAgICAge21lc3NhZ2VzLm1hcCgobXNnKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1NwZWFraW5nVGhpcyA9IHNwZWFraW5nTXNnSWQgPT09IG1zZy5pZDtcblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17bXNnLmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggZ2FwLTMgJHttc2cuc2VuZGVyID09PSAndXNlcicgPyAnanVzdGlmeS1lbmQnIDogJ2p1c3RpZnktc3RhcnQnfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7bXNnLnNlbmRlciA9PT0gJ2Fzc2lzdGFudCcgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQteGwgYmctcHVycGxlLTEwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hyaW5rLTAgbXQtMSBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgPEJyYWluIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BtYXgtdy1bODUlXSBwLTQgcm91bmRlZC0yeGwgdGV4dC14cyBzbTp0ZXh0LXNtIGxlYWRpbmctcmVsYXhlZCBzaGFkb3ctc20gJHtcbiAgICAgICAgICAgICAgICAgICAgbXNnLnNlbmRlciA9PT0gJ3VzZXInXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtYnItbm9uZSdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTgwMCByb3VuZGVkLWJsLW5vbmUnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndoaXRlc3BhY2UtcHJlLXdyYXBcIj57bXNnLnRleHR9PC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMi41IHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTEwMC8zMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgdGV4dC1bMTBweF0gb3BhY2l0eS03NVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57bXNnLnRpbWVzdGFtcH08L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAge21zZy5zZW5kZXIgPT09ICdhc3Npc3RhbnQnICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNTcGVha2luZ1RoaXMgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtzdG9wU3BlYWtpbmd9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1wdXJwbGUtNjAwIGZvbnQtYm9sZCBiZy1wdXJwbGUtNTAgcHgtMiBweS0wLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXB1cnBsZS0yMDAgYW5pbWF0ZS1wdWxzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3F1YXJlIGNsYXNzTmFtZT1cInctMyBoLTMgZmlsbC1jdXJyZW50XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5aYXRyenltYWogR8WCb3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNwZWFrVGV4dChtc2cudGV4dCwgbXNnLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LXNsYXRlLTYwMCBob3Zlcjp0ZXh0LXB1cnBsZS03MDAgZm9udC1zZW1pYm9sZCBiZy1zbGF0ZS0xMDAgaG92ZXI6YmctcHVycGxlLTUwIHB4LTIgcHktMC41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZvbHVtZTIgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXB1cnBsZS02MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk9kdHfDs3J6IEfFgm9zb3dvPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHttc2cuc2VuZGVyID09PSAndXNlcicgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQteGwgYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNocmluay0wIG10LTEgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxVc2VyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuXG4gICAgICAgICAge2lzTG9hZGluZyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHAtNCByb3VuZGVkLTJ4bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXB1cnBsZS0yMDAgbWF4LXctWzg1JV0gdGV4dC14cyB0ZXh0LXB1cnBsZS05MDAgc2hhZG93LW1kXCI+XG4gICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW4gdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+TW9kZWwgR2VtaW5pIDMuMSBQcm8gZ2VuZXJ1amUgZGlhZ25vesSZIG1lZHljem7EhSAoVHJ5YiBIaWdoIFRoaW5raW5nKS4uLjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICA8ZGl2IHJlZj17bWVzc2FnZXNFbmRSZWZ9IC8+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBWb2ljZSAmIElucHV0IENvbnRyb2xzIEZvb3RlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctd2hpdGUgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMCBmbGV4IGZsZXgtY29sIGdhcC0yXCI+XG4gICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e2hhbmRsZVNlbmR9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICB7LyogTWljcm9waG9uZSBXZWIgU3BlZWNoIEJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZUxpc3RlbmluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgc2hhZG93LW1kIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgaXNMaXN0ZW5pbmdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC02MDAgdGV4dC13aGl0ZSBhbmltYXRlLWJvdW5jZSBzaGFkb3ctcmVkLTYwMC80MCByaW5nLTQgcmluZy1yZWQtMjAwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctcHVycGxlLTUwIHRleHQtcHVycGxlLTcwMCBob3ZlcjpiZy1wdXJwbGUtMTAwIGJvcmRlciBib3JkZXItcHVycGxlLTIwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIHRpdGxlPXtpc0xpc3RlbmluZyA/ICdaYXRyenltYWogbmFncnl3YW5pZScgOiAnTcOzdyBkbyBtaWtyb2ZvbnUgKFdlYiBTcGVlY2ggQVBJKSd9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpc0xpc3RlbmluZyA/IDxNaWNPZmYgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+IDogPE1pYyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e2lucHV0UXVlcnl9XG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0SW5wdXRRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtcbiAgICAgICAgICAgICAgICBpc0xpc3RlbmluZ1xuICAgICAgICAgICAgICAgICAgPyAnU8WCdWNoYW0uLi4gbcOzdyBkbyBtaWtyb2ZvbnUnXG4gICAgICAgICAgICAgICAgICA6IG1vZGUgPT09ICdwYXRpZW50J1xuICAgICAgICAgICAgICAgICAgPyAnTcOzdyBsdWIgbmFwaXN6IGRvbGl3b8WbY2kgKG5wLiBCw7NsIHBvIHd5cHLDs8W8bmllbml1LCB6YWxlY2VuaWEgTEhQKS4uLidcbiAgICAgICAgICAgICAgICAgIDogJ05hcGlzeiB6YXB5dGFuaWUgU0VPLi4uJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweC00IHB5LTMgcm91bmRlZC14bCBiZy1zbGF0ZS01MCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXhzIHRleHQtc2xhdGUtOTAwIHBsYWNlaG9sZGVyLXNsYXRlLTQwMCBvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS02MDAgZm9jdXM6Ymctd2hpdGUgdHJhbnNpdGlvbi1hbGwgZm9udC1tZWRpdW1cIlxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZyB8fCAhaW5wdXRRdWVyeS50cmltKCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMyByb3VuZGVkLXhsIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTcwMCBkaXNhYmxlZDpvcGFjaXR5LTQwIHRleHQtd2hpdGUgZm9udC1zZW1pYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LW1kIHNoYWRvdy1wdXJwbGUtNjAwLzIwIHRyYW5zaXRpb24tYWxsIHNocmluay0wXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNlbmQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5XecWbbGlqPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgcHgtMSBwdC0xIGJvcmRlci10IGJvcmRlci1zbGF0ZS0xMDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXB1cnBsZS02MDBcIiAvPlxuICAgICAgICAgICAgICBSb3pwb3puYXdhbmllIG1vd3k6IHtzcGVlY2hTdXBwb3J0ZWQgPyAnV2ViIFNwZWVjaCBBUEkgQWt0eXduZScgOiAnVHlsa28ga2xhd2lhdHVyYSd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LWFtYmVyLTcwMFwiPlxuICAgICAgICAgICAgICA8QWxlcnRDaXJjbGUgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgIEVkdWthY3lqbnkgYXN5c3RlbnQgQUkgQ01MXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUE4UGM7QUE5UGQsU0FBZ0IsVUFBVSxXQUFXLGNBQWM7QUFFbkQ7QUFBQSxFQUNFO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsT0FDSztBQWdCQSxhQUFNLG9CQUFzRCxDQUFDO0FBQUEsRUFDbEU7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsVUFBVSxXQUFXLElBQUksU0FBa0M7QUFBQSxJQUNoRTtBQUFBLE1BQ0UsSUFBSTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sWUFBVyxvQkFBSSxLQUFLLEdBQUUsbUJBQW1CLENBQUMsR0FBRyxFQUFFLE1BQU0sV0FBVyxRQUFRLFVBQVUsQ0FBQztBQUFBLElBQ3JGO0FBQUEsRUFDRixDQUFDO0FBQ0QsUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQVMsRUFBRTtBQUMvQyxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUks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QUFBQTtBQUFBLFVBVjNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVdBO0FBQUEsUUFFQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsVUFBVSxDQUFDLE1BQU0sY0FBYyxFQUFFLE9BQU8sS0FBSztBQUFBLFlBQzdDLGFBQ0UsY0FDSSxnQ0FDQSxTQUFTLFlBQ1QseUVBQ0E7QUFBQSxZQUVOLFdBQVU7QUFBQTtBQUFBLFVBWFo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBWUE7QUFBQSxRQUVBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxVQUFVLGFBQWEsQ0FBQyxXQUFXLEtBQUs7QUFBQSxZQUN4QyxXQUFVO0FBQUEsWUFFVjtBQUFBLHFDQUFDLFFBQUssV0FBVSxpQkFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBOEI7QUFBQSxjQUM5Qix1QkFBQyxVQUFLLHNCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQVk7QUFBQTtBQUFBO0FBQUEsVUFOZDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFPQTtBQUFBLFdBcENGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFxQ0E7QUFBQSxNQUVBLHVCQUFDLFNBQUksV0FBVSxvR0FDYjtBQUFBLCtCQUFDLFVBQUssV0FBVSwyQkFDZDtBQUFBLGlDQUFDLGdCQUFhLFdBQVUsNkJBQXhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWtEO0FBQUEsVUFBRTtBQUFBLFVBQy9CLGtCQUFrQiwyQkFBMkI7QUFBQSxhQUZwRTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBR0E7QUFBQSxRQUNBLHVCQUFDLFVBQUssV0FBVSwwQ0FDZDtBQUFBLGlDQUFDLGVBQVksV0FBVSxhQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFpQztBQUFBLFVBQUU7QUFBQSxhQURyQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBR0E7QUFBQSxXQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFTQTtBQUFBLFNBakRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FrREE7QUFBQSxPQXBPRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBcU9BLEtBdE9GO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0F1T0E7QUFFSjsiLCJuYW1lcyI6W119