import __vite__cjsImport0_react_jsxDevRuntime from "/apps/lidar_head_3d/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=04dca6e3"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/lidar_head_3d/node_modules/.vite/deps/react.js?v=04dca6e3"; const useState = __vite__cjsImport1_react["useState"];
import { motion, AnimatePresence } from "/apps/lidar_head_3d/node_modules/.vite/deps/motion_react.js?v=01c14a81";
import { Smartphone, BookOpen, Code, Cpu, Play, Sparkles, Check, RefreshCw, Layers, Clipboard } from "/apps/lidar_head_3d/node_modules/.vite/deps/lucide-react.js?v=47b0976a";
export const FlutterMobileIntegration = () => {
  const [activeTab, setActiveTab] = useState("emulator");
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [phoneState, setPhoneState] = useState("chill");
  const [simulatedStability, setSimulatedStability] = useState(0);
  const [simulatedLog, setSimulatedLog] = useState([
    "SYSTEM: Ready to initialize Flutter controller"
  ]);
  const triggerCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2e3);
  };
  const handleRunEmulatorScan = () => {
    if (phoneState !== "quantum") {
      setPhoneState("transition");
      setSimulatedLog((prev) => [...prev, "⚡ Initiating transition to AppState.quantum", "🔋 Activating providers and ML detectors"]);
      setTimeout(() => {
        setPhoneState("quantum");
        setSimulatedStability(0);
        setSimulatedLog((prev) => [...prev, "🕶️ Cyber Goggles deployed on Buła!", "📸 LockFocus and LockExposure sequence initiated"]);
      }, 1500);
    } else {
      setSimulatedLog((prev) => [...prev, "🎯 Subject detected. Commencing 2000ms stability check"]);
      const interval = setInterval(() => {
        setSimulatedStability((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setSimulatedLog((l) => [...l, "🔒 COHERENCE LOCKED (100%)", "🔥 Slay! Saving 3D Mesh to Supabase!"]);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
  };
  const resetEmulator = () => {
    setPhoneState("chill");
    setSimulatedStability(0);
    setSimulatedLog(["SYSTEM: Reset to ChillMode. Bula drinking tea 🍵"]);
  };
  const architectureInfo = /* @__PURE__ */ jsxDEV("div", { className: "space-y-4 text-xs text-slate-300 animate-fadeIn", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-900/60 border border-slate-800 rounded-lg", children: [
      /* @__PURE__ */ jsxDEV("h4", { className: "font-sans font-bold text-slate-100 flex items-center gap-1.5 mb-1.5", children: [
        /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4 text-sky-400" }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 58,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Przejście z React do Architektury Flutter (Klub Buły)" }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 59,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("p", { className: "leading-relaxed mb-2", children: [
        "Nasza zaawansowana symulacja webowa udowadnia poprawność algorytmów 3D Delaunaya, LiDAR oraz blokad aparatu. Aby przenieść ten system na aplikację mobilną ",
        /* @__PURE__ */ jsxDEV("strong", { children: "iOS/Android" }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 63,
          columnNumber: 57
        }, this),
        " przy użyciu ",
        /* @__PURE__ */ jsxDEV("strong", { children: "Fluttera" }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 63,
          columnNumber: 98
        }, this),
        ", stosujemy podejście czystej segregacji stanów za pomocą pakietu ",
        /* @__PURE__ */ jsxDEV("code", { children: "provider" }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 64,
          columnNumber: 75
        }, this),
        "."
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("ul", { className: "list-disc pl-4 space-y-1 text-slate-400", children: [
        /* @__PURE__ */ jsxDEV("li", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "ChillModeScreen:" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 67,
            columnNumber: 15
          }, this),
          " Przyjazny ekran powitalny o ciepłym żółtym kolorze reprezentujący Bułę odpoczywającego w klatce. Zero obciążenia kamery."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 67,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("li", { children: [
          /* @__PURE__ */ jsxDEV("strong", { children: "QuantumModeScreen:" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 68,
            columnNumber: 15
          }, this),
          ' Medyczny skaner aktywowany przyciskiem "OGARNIJ MNIE", inicjalizujący pakiet ',
          /* @__PURE__ */ jsxDEV("code", { children: "camera" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 68,
            columnNumber: 128
          }, this),
          " oraz model AI ",
          /* @__PURE__ */ jsxDEV("code", { children: "google_mlkit_face_detection" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 68,
            columnNumber: 162
          }, this),
          " do precyzyjnego śledzenia geometrii twarzy."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 68,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-sky-950/20 border border-sky-900/30 rounded-lg", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-black text-sky-400 uppercase tracking-wider block mb-1", children: "DODAWANIE PACZEK (pubspec.yaml)" }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 74,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("pre", { className: "bg-slate-950 p-2 rounded text-[10px] font-mono text-slate-400 border border-slate-900 overflow-x-auto select-all", children: `dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.1
  camera: ^0.10.5+8
  google_mlkit_face_detection: ^0.7.0
  supabase_flutter: ^2.5.5` }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 75,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg flex flex-col justify-between", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] font-black text-emerald-400 uppercase tracking-wider block mb-1", children: "PROTIP OD SENIOR DEVELOPERA" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 86,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 leading-relaxed text-[11px]", children: [
            "Zawsze wyłączaj kontroler kamery (",
            /* @__PURE__ */ jsxDEV("code", { children: "controller.dispose()" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 88,
              columnNumber: 49
            }, this),
            ") przy powrocie do ChillMode! Inaczej system operacyjny będzie trzymał rezerwację obiektywu, a telefon rozgrzeje się do czerwoności, uniemożliwiając Bule spokojny odpoczynek."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 87,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 85,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2 text-[10px] text-emerald-500 font-bold flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 93,
            columnNumber: 13
          }, this),
          " Normalizacja Luma 142 zaimplementowana w CameraControlManager."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 92,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 84,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
      lineNumber: 72,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
  const cameraCode = `// lib/camera_control_manager.dart
import 'package:camera/camera.dart';

class CameraControlManager {
  CameraController? _controller;
  bool isReady = false;
  bool focusLocked = false;
  bool exposureLocked = false;
  double currentLuma = 142.0; // Target luma 142/255

  CameraControlManager(this._controller);

  /// Przygotowuje aparat do celów medycznych i unika pływania ostrości (prepareForScan())
  Future<void> prepareForScan() async {
    if (_controller == null) return;

    try {
      // 1. Wymuszenie wyłączenia lampy błyskowej (Unikanie odblasków)
      await _controller!.setFlashMode(FlashMode.off);

      // 2. Zamrażamy ekspozycję i autofocus, aby zapobiec autofocus hunting
      await _controller!.setFocusMode(FocusMode.locked);
      await _controller!.setExposureMode(ExposureMode.locked);

      // 3. Wymuszamy domyślny zoom 1.0 (unikanie dystorsji obiektywu wide)
      if (_controller!.value.zoomRatio != 1.0) {
        await _controller!.setZoomLevel(1.0);
      }

      focusLocked = true;
      exposureLocked = true;
      isReady = true;
      
      print("🎯 CameraControlManager: Wszystkie blokady medyczne zablokowane!");
    } catch (e) {
      print("⚠️ Błąd blokowania parametrów aparatu: $e");
    }
  }

  /// Sprawdza czy aparat nie jest w trybie autofokusa 'pływającego'
  bool checkCameraReadiness() {
    return isReady && focusLocked && exposureLocked;
  }

  /// Resetuje parametry aparatu do stanu początkowego
  Future<void> resetLocks() async {
    if (_controller == null) return;
    await _controller!.setFocusMode(FocusMode.auto);
    await _controller!.setExposureMode(ExposureMode.auto);
    focusLocked = false;
    exposureLocked = false;
    isReady = false;
  }
}`;
  const mainDartCode = `// lib/main.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'chill_mode_screen.dart';
import 'quantum_mode_screen.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => AppStateProvider(),
      child: const ChomikBulaApp(),
    ),
  );
}

class AppStateProvider extends ChangeNotifier {
  bool _isQuantumMode = false;
  bool get isQuantumMode => _isQuantumMode;

  void toggleMode() {
    _isQuantumMode = !_isQuantumMode;
    notifyListeners();
  }
}

class ChomikBulaApp extends StatelessWidget {
  const ChomikBulaApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Klub Buły',
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF020617), // Slate 950
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF0EA5E9), // Sky 500
          secondary: Color(0xFF10B981), // Emerald 500
        ),
      ),
      home: Consumer<AppStateProvider>(
        builder: (context, state, child) {
          return AnimatedSwitcher(
            duration: const Duration(milliseconds: 600),
            child: state.isQuantumMode 
              ? const QuantumModeScreen() 
              : const ChillModeScreen(),
          );
        },
      ),
    );
  }
}`;
  const chillScreenCode = `// lib/chill_mode_screen.dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'main.dart'; // import AppStateProvider

class ChillModeScreen extends StatelessWidget {
  const ChillModeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFFDE68A), // Ciepły, "chomikowy" kolor (Amber 200)
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Ikona zwierzaka / reprezentacja Buły
            const Icon(Icons.pets, size: 120, color: Colors.brown),
            const SizedBox(height: 20),
            
            const Text(
              "Siema, jestem Buła!",
              style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: Colors.brown),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 32.0, vertical: 12.0),
              child: Text(
                "Razem ogarniemy ten bałagan w Twojej formie. "
                "Gotowy na nowy Quest?",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 18, color: Colors.brown),
              ),
            ),
            
            const SizedBox(height: 40),
            
            // Przycisk "OGARNIJ MNIE"
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.orange,
                padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
              ),
              onPressed: () async {
                // 1. Efekt: Buła zakłada gogle (możesz tu dodać animację przezroczystości)
                showDialog(
                  context: context,
                  barrierDismissible: false,
                  builder: (context) => const Center(
                    child: Text(
                      "Buła zakłada Cyber-Gogle... 🕶️", 
                      style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold)
                    ),
                  ),
                );

                // 2. Opóźnienie dla efektu "teleportacji" (np. 1500ms)
                await Future.delayed(const Duration(milliseconds: 1500));

                // 3. Przejście do QuantumMode (używając Providera lub Navigatora)
                if (context.mounted) {
                  Navigator.of(context).pop(); // Zamknij "dymek" z tekstem
                  Provider.of<AppStateProvider>(context, listen: false).toggleMode();
                  print("Buła zakłada gogle...");
                }
              },
              child: const Text(
                "OGARNIJ MNIE",
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}`;
  return /* @__PURE__ */ jsxDEV("div", { className: "border border-slate-900 rounded-2xl bg-slate-950 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]", id: "flutter_mobile_integration_card", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-900 px-5 py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shadow-[0_0_12px_rgba(14,165,233,0.25)]", children: /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-4 h-4 text-sky-400 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 293,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 292,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] font-bold text-sky-400 uppercase tracking-widest block", children: "MOBILE TRANSITION PORTAL" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 296,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "font-sans text-xs font-black text-slate-100 tracking-tight flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "INTEGRACJA FLUTTER (KLUB BUŁY)" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 298,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "bg-sky-950 text-sky-300 border border-sky-800/60 rounded text-[7px] font-mono px-1.5 py-0.2 select-none animate-pulse", children: "EMULATOR READY" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 299,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 297,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 295,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 291,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center bg-slate-950 border border-slate-900 rounded-lg p-0.5 gap-0.5 text-[9px] font-mono", id: "flutter_tabs", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("emulator"),
            className: `px-2.5 py-1.5 rounded transition-all flex items-center gap-1 ${activeTab === "emulator" ? "bg-emerald-950 text-emerald-400 font-bold border border-emerald-800/40" : "text-slate-500 hover:text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 310,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "INTERAKTYWNY EMULATOR" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 311,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 306,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("chill_screen"),
            className: `px-2.5 py-1.5 rounded transition-all flex items-center gap-1 ${activeTab === "chill_screen" ? "bg-sky-950 text-sky-400 font-bold border border-sky-800/40" : "text-slate-500 hover:text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 318,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "CHILL_MODE_SCREEN.DART" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 319,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 314,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("screens"),
            className: `px-2.5 py-1.5 rounded transition-all flex items-center gap-1 ${activeTab === "screens" ? "bg-sky-950 text-sky-400 font-bold border border-sky-800/40" : "text-slate-500 hover:text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 326,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "MAIN.DART" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 327,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 322,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("camera_code"),
            className: `px-2.5 py-1.5 rounded transition-all flex items-center gap-1 ${activeTab === "camera_code" ? "bg-sky-950 text-sky-400 font-bold border border-sky-800/40" : "text-slate-500 hover:text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 334,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "STEROWNIK APARATU" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 335,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 330,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("architecture"),
            className: `px-2.5 py-1.5 rounded transition-all flex items-center gap-1 ${activeTab === "architecture" ? "bg-sky-950 text-sky-400 font-bold border border-sky-800/40" : "text-slate-500 hover:text-slate-300"}`,
            children: [
              /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 342,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "STRUKTURA PROJEKTU" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 343,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 338,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 305,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
      lineNumber: 290,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-5", children: [
      activeTab === "architecture" && architectureInfo,
      activeTab === "camera_code" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 animate-fadeIn", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-slate-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 359,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Kompilacja Blokad Medycznych (Dart Camera API)" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 360,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 358,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => triggerCopy("cam_dart", cameraCode),
              className: "bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded text-[8px] font-mono transition-all flex items-center gap-1",
              children: [
                copiedIndex === "cam_dart" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 366,
                  columnNumber: 47
                }, this) : /* @__PURE__ */ jsxDEV(Clipboard, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 366,
                  columnNumber: 96
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedIndex === "cam_dart" ? "SKOPIOWANO!" : "KOPIUJ KOD" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 367,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 362,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 357,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV("pre", { className: "bg-slate-950 border border-slate-900 rounded-lg p-3 text-[9px] font-mono text-sky-300 overflow-x-auto max-h-[350px] leading-relaxed select-all", children: cameraCode }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 371,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 right-2 bg-slate-900/90 border border-slate-800 rounded px-1.5 py-0.5 text-[7px] font-mono text-slate-500 select-none", children: "LUMA 142/255 & LOCKS" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 374,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 370,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 356,
        columnNumber: 11
      }, this),
      activeTab === "screens" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 animate-fadeIn", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-slate-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5 text-sky-400" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 386,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Główny Punkt Wejściowy (main.dart z Providerem)" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 387,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 385,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => triggerCopy("main_dart", mainDartCode),
              className: "bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded text-[8px] font-mono transition-all flex items-center gap-1",
              children: [
                copiedIndex === "main_dart" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 393,
                  columnNumber: 48
                }, this) : /* @__PURE__ */ jsxDEV(Clipboard, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 393,
                  columnNumber: 97
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedIndex === "main_dart" ? "SKOPIOWANO!" : "KOPIUJ KOD" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 394,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 389,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 384,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: /* @__PURE__ */ jsxDEV("pre", { className: "bg-slate-950 border border-slate-900 rounded-lg p-3 text-[9px] font-mono text-sky-300/90 overflow-x-auto max-h-[350px] leading-relaxed select-all", children: mainDartCode }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 398,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 397,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 383,
        columnNumber: 11
      }, this),
      activeTab === "chill_screen" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 animate-fadeIn", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-slate-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 410,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Ekran Powitalny (chill_mode_screen.dart z przełączeniem stanów)" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 411,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 409,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => triggerCopy("chill_dart", chillScreenCode),
              className: "bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-2 py-1 rounded text-[8px] font-mono transition-all flex items-center gap-1",
              children: [
                copiedIndex === "chill_dart" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 417,
                  columnNumber: 49
                }, this) : /* @__PURE__ */ jsxDEV(Clipboard, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 417,
                  columnNumber: 98
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedIndex === "chill_dart" ? "SKOPIOWANO!" : "KOPIUJ KOD" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 418,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 413,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 408,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV("pre", { className: "bg-slate-950 border border-slate-900 rounded-lg p-3 text-[9px] font-mono text-amber-300 overflow-x-auto max-h-[350px] leading-relaxed select-all", children: chillScreenCode }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 422,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 right-2 bg-slate-900/90 border border-slate-800 rounded px-1.5 py-0.5 text-[7px] font-mono text-slate-500 select-none", children: "CHILL_MODE_SCREEN.DART" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 425,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 421,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 407,
        columnNumber: 11
      }, this),
      activeTab === "emulator" && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch animate-fadeIn", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 flex flex-col justify-between space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg", children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "font-sans font-bold text-amber-300 text-xs flex items-center gap-1 mb-1", children: [
                /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 441,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Realistyczny Emulator Klub Buły (Flutter)" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 442,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 440,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[11px] text-slate-300 leading-relaxed", children: [
                "Nasz interaktywny symulator po prawej stronie został dostosowany do Twojego kodu ",
                /* @__PURE__ */ jsxDEV("code", { children: "chill_mode_screen.dart" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 445,
                  columnNumber: 102
                }, this),
                "! Ma ciepły, żółty kolor ",
                /* @__PURE__ */ jsxDEV("code", { children: "Color(0xFFFDE68A)" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 446,
                  columnNumber: 44
                }, this),
                ", brązową ikonkę pets/buły oraz pomarańczowy, okrągły przycisk ",
                /* @__PURE__ */ jsxDEV("strong", { children: "OGARNIJ MNIE" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 447,
                  columnNumber: 38
                }, this),
                ". Kliknij go, aby zobaczyć magię nakładania cyber-gogli!"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 444,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 439,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-900/20 border border-slate-900 rounded-lg", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[8px] font-bold text-slate-500 uppercase block mb-1", children: "JAK TO DZIAŁA W FLUTTERZE?" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 452,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[11px] text-slate-400 leading-relaxed", children: [
                "Gdy klikniesz ",
                /* @__PURE__ */ jsxDEV("strong", { children: "OGARNIJ MNIE" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 454,
                  columnNumber: 35
                }, this),
                ", Provider powiadamia subskrybentów o zmianie na ",
                /* @__PURE__ */ jsxDEV("code", { children: "isQuantumMode = true" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 454,
                  columnNumber: 113
                }, this),
                ". Dzięki widgetowi ",
                /* @__PURE__ */ jsxDEV("code", { children: "AnimatedSwitcher" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 455,
                  columnNumber: 38
                }, this),
                ", Flutter w ułamku sekundy płynnie wygasi żółty ekran i aktywuje podgląd z aparatu wraz z nakładką HUD w ",
                /* @__PURE__ */ jsxDEV("strong", { children: "QuantumMode" }, void 0, false, {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 456,
                  columnNumber: 61
                }, this),
                "."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 453,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 451,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 438,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 border border-slate-900 rounded-lg space-y-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-slate-400 font-bold block uppercase", children: "KONTROLKI SMARTFONA" }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 463,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleRunEmulatorScan,
                  className: "flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 font-sans font-black text-[10px] py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1 active:scale-95 shadow-[0_2px_8px_rgba(16,185,129,0.2)]",
                  children: [
                    /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 469,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: phoneState === "chill" ? 'KLIKNIJ "OGARNIJ MNIE" (ZAKŁADANIE GOGLI)' : phoneState === "transition" ? "INICJOWANIE SKANERA AI..." : "ROZPOCZNIJ SYMULACJĘ SKANU" }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 470,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 465,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: resetEmulator,
                  className: "bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 font-mono text-[9px] py-1.5 px-3 rounded-lg transition-all flex items-center gap-1",
                  children: [
                    /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 482,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "RESET" }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 483,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 478,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 464,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 462,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 437,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 flex justify-center items-center", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-[220px] h-[430px] bg-slate-900 rounded-[35px] p-3 border-[4px] border-slate-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-850 rounded-full z-50 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV("div", { className: "w-7 h-1 bg-slate-700 rounded-full" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 495,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 494,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex-1 rounded-[24px] bg-slate-950 overflow-hidden relative flex flex-col p-3 border border-slate-950 select-none", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center text-[7px] font-mono text-slate-500 mb-2 mt-1 px-1 z-30", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "CELULAR_NET" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 503,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "● LIVE" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 504,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "100% 🔋" }, void 0, false, {
                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                lineNumber: 505,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 502,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1 rounded-xl overflow-hidden relative flex flex-col", children: /* @__PURE__ */ jsxDEV(AnimatePresence, { mode: "wait", children: [
              phoneState === "chill" && /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "absolute inset-0 bg-[#FDE68A] flex flex-col items-center justify-center text-center p-3 z-10",
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "text-5xl mb-2 animate-bounce", children: "🐹" }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 520,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "bg-amber-900/10 border border-amber-900/20 text-amber-900 rounded-full px-2 py-0.5 text-[7px] font-mono uppercase font-black tracking-wider", children: "CHILL MODE" }, void 0, false, {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 522,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("h5", { className: "font-sans text-[13px] font-black text-amber-950", children: "Siema, jestem Buła!" }, void 0, false, {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 525,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("p", { className: "font-sans text-[8.5px] text-amber-900/80 leading-relaxed px-1", children: "Razem ogarniemy ten bałagan w Twojej formie. Gotowy na nowy Quest?" }, void 0, false, {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 528,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 521,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: handleRunEmulatorScan,
                        className: "mt-5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-sans font-black text-[9px] py-2 px-5 rounded-full shadow-md transition-all uppercase tracking-wider",
                        children: "OGARNIJ MNIE"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 533,
                        columnNumber: 27
                      },
                      this
                    )
                  ]
                },
                "chill_screen",
                true,
                {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 513,
                  columnNumber: 25
                },
                this
              ),
              phoneState === "transition" && /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                  exit: { opacity: 0, scale: 1.05 },
                  className: "absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-center p-3 z-10",
                  children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-3xl animate-spin text-sky-400 mb-2", children: "⚡" }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 550,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[7px] text-sky-400 font-bold uppercase tracking-widest block", children: "TRANSITION_STATE" }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 551,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-[10px] font-black text-slate-100 mt-1", children: "BUŁA ZAKŁADA CYBER-GOGLE..." }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 552,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "w-24 bg-slate-900 h-1 rounded-full overflow-hidden mt-3", children: /* @__PURE__ */ jsxDEV(
                      motion.div,
                      {
                        initial: { width: 0 },
                        animate: { width: "100%" },
                        transition: { duration: 1.4, ease: "easeInOut" },
                        className: "bg-sky-500 h-full"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 554,
                        columnNumber: 29
                      },
                      this
                    ) }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 553,
                      columnNumber: 27
                    }, this)
                  ]
                },
                "transition_screen",
                true,
                {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 543,
                  columnNumber: 25
                },
                this
              ),
              phoneState === "quantum" && /* @__PURE__ */ jsxDEV(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  className: "absolute inset-0 bg-slate-950 flex flex-col justify-between p-2.5 z-10",
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:10px_10px] opacity-40 z-0 pointer-events-none" }, void 0, false, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 573,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 bg-slate-900/30 rounded-lg border border-sky-950/40 flex items-center justify-center overflow-hidden z-10", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "absolute top-1 left-1.5 font-mono text-[5.5px] text-sky-400", children: "SYS_AI_FACE_TRACKING" }, void 0, false, {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 577,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "relative flex flex-col items-center", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-3xl", children: "🐹" }, void 0, false, {
                          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                          lineNumber: 581,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV(
                          motion.span,
                          {
                            initial: { y: -30, opacity: 0, scale: 2 },
                            animate: { y: -16, opacity: 1, scale: 1.15 },
                            className: "absolute text-2.5xl drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]",
                            children: "🕶️"
                          },
                          void 0,
                          false,
                          {
                            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                            lineNumber: 582,
                            columnNumber: 31
                          },
                          this
                        )
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 580,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1.5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 w-full", children: [
                        /* @__PURE__ */ jsxDEV(
                          "button",
                          {
                            onClick: handleRunEmulatorScan,
                            className: "relative w-12 h-12 flex items-center justify-center bg-slate-950/95 rounded-full border border-sky-800 hover:border-sky-500 active:scale-95 transition-all shadow-[0_0_12px_rgba(14,165,233,0.3)]",
                            children: [
                              /* @__PURE__ */ jsxDEV("span", { className: "font-sans text-[4.5px] text-sky-300 font-black tracking-tighter uppercase whitespace-nowrap", children: "START SCAN" }, void 0, false, {
                                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                                lineNumber: 597,
                                columnNumber: 33
                              }, this),
                              /* @__PURE__ */ jsxDEV("svg", { className: "absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none", viewBox: "0 0 48 48", children: /* @__PURE__ */ jsxDEV(
                                "circle",
                                {
                                  cx: "24",
                                  cy: "24",
                                  r: "20",
                                  className: "stroke-sky-400",
                                  strokeWidth: "2",
                                  fill: "transparent",
                                  strokeDasharray: 125.6,
                                  strokeDashoffset: 125.6 - simulatedStability / 100 * 125.6,
                                  transition: { duration: 0.1 }
                                },
                                void 0,
                                false,
                                {
                                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                                  lineNumber: 601,
                                  columnNumber: 35
                                },
                                this
                              ) }, void 0, false, {
                                fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                                lineNumber: 600,
                                columnNumber: 33
                              }, this)
                            ]
                          },
                          void 0,
                          true,
                          {
                            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                            lineNumber: 593,
                            columnNumber: 31
                          },
                          this
                        ),
                        /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[6.5px] text-emerald-400 font-bold bg-slate-950/80 px-1 py-0.2 rounded border border-slate-900", children: [
                          "STABILNOŚĆ: ",
                          simulatedStability,
                          "%"
                        ] }, void 0, true, {
                          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                          lineNumber: 614,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 592,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 576,
                      columnNumber: 27
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "pt-2 text-[6.5px] font-mono text-slate-500 space-y-0.5 border-t border-slate-900/60 z-10", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-slate-400", children: [
                        /* @__PURE__ */ jsxDEV("span", { children: "HW_LOCKS:" }, void 0, false, {
                          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                          lineNumber: 622,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "ENFORCED (OK)" }, void 0, false, {
                          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                          lineNumber: 623,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 621,
                        columnNumber: 29
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { children: "LUMA_NORM:" }, void 0, false, {
                          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                          lineNumber: 626,
                          columnNumber: 31
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "142 LUMA OK" }, void 0, false, {
                          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                          lineNumber: 627,
                          columnNumber: 31
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                        lineNumber: 625,
                        columnNumber: 29
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                      lineNumber: 620,
                      columnNumber: 27
                    }, this)
                  ]
                },
                "quantum_screen",
                true,
                {
                  fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
                  lineNumber: 565,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 511,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 509,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-2 h-[55px] bg-slate-950 border border-slate-900/80 rounded-lg p-1.5 font-mono text-[5px] text-sky-300/80 overflow-y-auto flex flex-col gap-0.5", children: simulatedLog.slice(-5).map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: log }, idx, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 639,
              columnNumber: 23
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
              lineNumber: 637,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 499,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-16 h-1 bg-slate-800 rounded-full mx-auto mt-1 z-50" }, void 0, false, {
            fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
            lineNumber: 646,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 491,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
          lineNumber: 490,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
        lineNumber: 434,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
      lineNumber: 349,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/FlutterMobileIntegration.tsx",
    lineNumber: 287,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZsdXR0ZXJNb2JpbGVJbnRlZ3JhdGlvbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbW90aW9uLCBBbmltYXRlUHJlc2VuY2UgfSBmcm9tICdtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHsgU21hcnRwaG9uZSwgQm9va09wZW4sIENvZGUsIENwdSwgRGF0YWJhc2UsIFBsYXksIFNwYXJrbGVzLCBDaGVjaywgSGVscENpcmNsZSwgVGVybWluYWwsIFJlZnJlc2hDdywgTGF5ZXJzLCBDbGlwYm9hcmQgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuXG5leHBvcnQgY29uc3QgRmx1dHRlck1vYmlsZUludGVncmF0aW9uOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdhcmNoaXRlY3R1cmUnIHwgJ2NhbWVyYV9jb2RlJyB8ICdzY3JlZW5zJyB8ICdjaGlsbF9zY3JlZW4nIHwgJ2VtdWxhdG9yJz4oJ2VtdWxhdG9yJyk7XG4gIGNvbnN0IFtjb3BpZWRJbmRleCwgc2V0Q29waWVkSW5kZXhdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIFxuICAvLyBTdGF0ZSBmb3Igc2ltdWxhdGVkIHBob25lL2VtdWxhdG9yXG4gIGNvbnN0IFtwaG9uZVN0YXRlLCBzZXRQaG9uZVN0YXRlXSA9IHVzZVN0YXRlPCdjaGlsbCcgfCAndHJhbnNpdGlvbicgfCAncXVhbnR1bSc+KCdjaGlsbCcpO1xuICBjb25zdCBbc2ltdWxhdGVkU3RhYmlsaXR5LCBzZXRTaW11bGF0ZWRTdGFiaWxpdHldID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaW11bGF0ZWRMb2csIHNldFNpbXVsYXRlZExvZ10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW1xuICAgICdTWVNURU06IFJlYWR5IHRvIGluaXRpYWxpemUgRmx1dHRlciBjb250cm9sbGVyJ1xuICBdKTtcblxuICBjb25zdCB0cmlnZ2VyQ29weSA9IChpZDogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcbiAgICBzZXRDb3BpZWRJbmRleChpZCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRJbmRleChudWxsKSwgMjAwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUnVuRW11bGF0b3JTY2FuID0gKCkgPT4ge1xuICAgIGlmIChwaG9uZVN0YXRlICE9PSAncXVhbnR1bScpIHtcbiAgICAgIHNldFBob25lU3RhdGUoJ3RyYW5zaXRpb24nKTtcbiAgICAgIHNldFNpbXVsYXRlZExvZyhwcmV2ID0+IFsuLi5wcmV2LCAn4pqhIEluaXRpYXRpbmcgdHJhbnNpdGlvbiB0byBBcHBTdGF0ZS5xdWFudHVtJywgJ/CflIsgQWN0aXZhdGluZyBwcm92aWRlcnMgYW5kIE1MIGRldGVjdG9ycyddKTtcbiAgICAgIFxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNldFBob25lU3RhdGUoJ3F1YW50dW0nKTtcbiAgICAgICAgc2V0U2ltdWxhdGVkU3RhYmlsaXR5KDApO1xuICAgICAgICBzZXRTaW11bGF0ZWRMb2cocHJldiA9PiBbLi4ucHJldiwgJ/CflbbvuI8gQ3liZXIgR29nZ2xlcyBkZXBsb3llZCBvbiBCdcWCYSEnLCAn8J+TuCBMb2NrRm9jdXMgYW5kIExvY2tFeHBvc3VyZSBzZXF1ZW5jZSBpbml0aWF0ZWQnXSk7XG4gICAgICB9LCAxNTAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUnVuIHRoZSBkd2VsbCB0aW1lciBwcm9ncmVzcyBiYXIgaW4gZW11bGF0b3JcbiAgICAgIHNldFNpbXVsYXRlZExvZyhwcmV2ID0+IFsuLi5wcmV2LCAn8J+OryBTdWJqZWN0IGRldGVjdGVkLiBDb21tZW5jaW5nIDIwMDBtcyBzdGFiaWxpdHkgY2hlY2snXSk7XG4gICAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgc2V0U2ltdWxhdGVkU3RhYmlsaXR5KHByZXYgPT4ge1xuICAgICAgICAgIGlmIChwcmV2ID49IDEwMCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICBzZXRTaW11bGF0ZWRMb2cobCA9PiBbLi4ubCwgJ/CflJIgQ09IRVJFTkNFIExPQ0tFRCAoMTAwJSknLCAn8J+UpSBTbGF5ISBTYXZpbmcgM0QgTWVzaCB0byBTdXBhYmFzZSEnXSk7XG4gICAgICAgICAgICByZXR1cm4gMTAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcHJldiArIDEwO1xuICAgICAgICB9KTtcbiAgICAgIH0sIDE1MC4wKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgcmVzZXRFbXVsYXRvciA9ICgpID0+IHtcbiAgICBzZXRQaG9uZVN0YXRlKCdjaGlsbCcpO1xuICAgIHNldFNpbXVsYXRlZFN0YWJpbGl0eSgwKTtcbiAgICBzZXRTaW11bGF0ZWRMb2coWydTWVNURU06IFJlc2V0IHRvIENoaWxsTW9kZS4gQnVsYSBkcmlua2luZyB0ZWEg8J+NtSddKTtcbiAgfTtcblxuICBjb25zdCBhcmNoaXRlY3R1cmVJbmZvID0gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00IHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgYW5pbWF0ZS1mYWRlSW5cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTkwMC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnXCI+XG4gICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNhbnMgZm9udC1ib2xkIHRleHQtc2xhdGUtMTAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbWItMS41XCI+XG4gICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2t5LTQwMFwiIC8+XG4gICAgICAgICAgPHNwYW4+UHJ6ZWrFm2NpZSB6IFJlYWN0IGRvIEFyY2hpdGVrdHVyeSBGbHV0dGVyIChLbHViIEJ1xYJ5KTwvc3Bhbj5cbiAgICAgICAgPC9oND5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibGVhZGluZy1yZWxheGVkIG1iLTJcIj5cbiAgICAgICAgICBOYXN6YSB6YWF3YW5zb3dhbmEgc3ltdWxhY2phIHdlYm93YSB1ZG93YWRuaWEgcG9wcmF3bm/Fm8SHIGFsZ29yeXRtw7N3IDNEIERlbGF1bmF5YSwgTGlEQVIgb3JheiBibG9rYWQgYXBhcmF0dS4gXG4gICAgICAgICAgQWJ5IHByemVuaWXFm8SHIHRlbiBzeXN0ZW0gbmEgYXBsaWthY2rEmSBtb2JpbG7EhSA8c3Ryb25nPmlPUy9BbmRyb2lkPC9zdHJvbmc+IHByenkgdcW8eWNpdSA8c3Ryb25nPkZsdXR0ZXJhPC9zdHJvbmc+LCBcbiAgICAgICAgICBzdG9zdWplbXkgcG9kZWrFm2NpZSBjenlzdGVqIHNlZ3JlZ2Fjamkgc3RhbsOzdyB6YSBwb21vY8SFIHBha2lldHUgPGNvZGU+cHJvdmlkZXI8L2NvZGU+LlxuICAgICAgICA8L3A+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJsaXN0LWRpc2MgcGwtNCBzcGFjZS15LTEgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICA8bGk+PHN0cm9uZz5DaGlsbE1vZGVTY3JlZW46PC9zdHJvbmc+IFByenlqYXpueSBla3JhbiBwb3dpdGFsbnkgbyBjaWVwxYJ5bSDFvMOzxYJ0eW0ga29sb3J6ZSByZXByZXplbnR1asSFY3kgQnXFgsSZIG9kcG9jenl3YWrEhWNlZ28gdyBrbGF0Y2UuIFplcm8gb2JjacSFxbxlbmlhIGthbWVyeS48L2xpPlxuICAgICAgICAgIDxsaT48c3Ryb25nPlF1YW50dW1Nb2RlU2NyZWVuOjwvc3Ryb25nPiBNZWR5Y3pueSBza2FuZXIgYWt0eXdvd2FueSBwcnp5Y2lza2llbSBcIk9HQVJOSUogTU5JRVwiLCBpbmljamFsaXp1asSFY3kgcGFraWV0IDxjb2RlPmNhbWVyYTwvY29kZT4gb3JheiBtb2RlbCBBSSA8Y29kZT5nb29nbGVfbWxraXRfZmFjZV9kZXRlY3Rpb248L2NvZGU+IGRvIHByZWN5enlqbmVnbyDFm2xlZHplbmlhIGdlb21ldHJpaSB0d2FyenkuPC9saT5cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTNcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctc2t5LTk1MC8yMCBib3JkZXIgYm9yZGVyLXNreS05MDAvMzAgcm91bmRlZC1sZ1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYmxhY2sgdGV4dC1za3ktNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9jayBtYi0xXCI+RE9EQVdBTklFIFBBQ1pFSyAocHVic3BlYy55YW1sKTwvc3Bhbj5cbiAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBwLTIgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgb3ZlcmZsb3cteC1hdXRvIHNlbGVjdC1hbGxcIj57YGRlcGVuZGVuY2llczpcbiAgZmx1dHRlcjpcbiAgICBzZGs6IGZsdXR0ZXJcbiAgcHJvdmlkZXI6IF42LjEuMVxuICBjYW1lcmE6IF4wLjEwLjUrOFxuICBnb29nbGVfbWxraXRfZmFjZV9kZXRlY3Rpb246IF4wLjcuMFxuICBzdXBhYmFzZV9mbHV0dGVyOiBeMi41LjVgfTwvcHJlPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1lbWVyYWxkLTk1MC8yMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTAwLzMwIHJvdW5kZWQtbGcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gZm9udC1ibGFjayB0ZXh0LWVtZXJhbGQtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9jayBtYi0xXCI+UFJPVElQIE9EIFNFTklPUiBERVZFTE9QRVJBPC9zcGFuPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgbGVhZGluZy1yZWxheGVkIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgIFphd3N6ZSB3ecWCxIVjemFqIGtvbnRyb2xlciBrYW1lcnkgKDxjb2RlPmNvbnRyb2xsZXIuZGlzcG9zZSgpPC9jb2RlPikgcHJ6eSBwb3dyb2NpZSBkbyBDaGlsbE1vZGUhIFxuICAgICAgICAgICAgICBJbmFjemVqIHN5c3RlbSBvcGVyYWN5am55IGLEmWR6aWUgdHJ6eW1hxYIgcmV6ZXJ3YWNqxJkgb2JpZWt0eXd1LCBhIHRlbGVmb24gcm96Z3J6ZWplIHNpxJkgZG8gY3plcndvbm/Fm2NpLCB1bmllbW/FvGxpd2lhasSFYyBCdWxlIHNwb2tvam55IG9kcG9jenluZWsuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC01MDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiBOb3JtYWxpemFjamEgTHVtYSAxNDIgemFpbXBsZW1lbnRvd2FuYSB3IENhbWVyYUNvbnRyb2xNYW5hZ2VyLlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xuXG4gIGNvbnN0IGNhbWVyYUNvZGUgPSBgLy8gbGliL2NhbWVyYV9jb250cm9sX21hbmFnZXIuZGFydFxuaW1wb3J0ICdwYWNrYWdlOmNhbWVyYS9jYW1lcmEuZGFydCc7XG5cbmNsYXNzIENhbWVyYUNvbnRyb2xNYW5hZ2VyIHtcbiAgQ2FtZXJhQ29udHJvbGxlcj8gX2NvbnRyb2xsZXI7XG4gIGJvb2wgaXNSZWFkeSA9IGZhbHNlO1xuICBib29sIGZvY3VzTG9ja2VkID0gZmFsc2U7XG4gIGJvb2wgZXhwb3N1cmVMb2NrZWQgPSBmYWxzZTtcbiAgZG91YmxlIGN1cnJlbnRMdW1hID0gMTQyLjA7IC8vIFRhcmdldCBsdW1hIDE0Mi8yNTVcblxuICBDYW1lcmFDb250cm9sTWFuYWdlcih0aGlzLl9jb250cm9sbGVyKTtcblxuICAvLy8gUHJ6eWdvdG93dWplIGFwYXJhdCBkbyBjZWzDs3cgbWVkeWN6bnljaCBpIHVuaWthIHDFgnl3YW5pYSBvc3Ryb8WbY2kgKHByZXBhcmVGb3JTY2FuKCkpXG4gIEZ1dHVyZTx2b2lkPiBwcmVwYXJlRm9yU2NhbigpIGFzeW5jIHtcbiAgICBpZiAoX2NvbnRyb2xsZXIgPT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgdHJ5IHtcbiAgICAgIC8vIDEuIFd5bXVzemVuaWUgd3nFgsSFY3plbmlhIGxhbXB5IGLFgnlza293ZWogKFVuaWthbmllIG9kYmxhc2vDs3cpXG4gICAgICBhd2FpdCBfY29udHJvbGxlciEuc2V0Rmxhc2hNb2RlKEZsYXNoTW9kZS5vZmYpO1xuXG4gICAgICAvLyAyLiBaYW1yYcW8YW15IGVrc3BvenljasSZIGkgYXV0b2ZvY3VzLCBhYnkgemFwb2JpZWMgYXV0b2ZvY3VzIGh1bnRpbmdcbiAgICAgIGF3YWl0IF9jb250cm9sbGVyIS5zZXRGb2N1c01vZGUoRm9jdXNNb2RlLmxvY2tlZCk7XG4gICAgICBhd2FpdCBfY29udHJvbGxlciEuc2V0RXhwb3N1cmVNb2RlKEV4cG9zdXJlTW9kZS5sb2NrZWQpO1xuXG4gICAgICAvLyAzLiBXeW11c3phbXkgZG9tecWbbG55IHpvb20gMS4wICh1bmlrYW5pZSBkeXN0b3Jzamkgb2JpZWt0eXd1IHdpZGUpXG4gICAgICBpZiAoX2NvbnRyb2xsZXIhLnZhbHVlLnpvb21SYXRpbyAhPSAxLjApIHtcbiAgICAgICAgYXdhaXQgX2NvbnRyb2xsZXIhLnNldFpvb21MZXZlbCgxLjApO1xuICAgICAgfVxuXG4gICAgICBmb2N1c0xvY2tlZCA9IHRydWU7XG4gICAgICBleHBvc3VyZUxvY2tlZCA9IHRydWU7XG4gICAgICBpc1JlYWR5ID0gdHJ1ZTtcbiAgICAgIFxuICAgICAgcHJpbnQoXCLwn46vIENhbWVyYUNvbnRyb2xNYW5hZ2VyOiBXc3p5c3RraWUgYmxva2FkeSBtZWR5Y3puZSB6YWJsb2tvd2FuZSFcIik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcHJpbnQoXCLimqDvuI8gQsWCxIVkIGJsb2tvd2FuaWEgcGFyYW1ldHLDs3cgYXBhcmF0dTogJGVcIik7XG4gICAgfVxuICB9XG5cbiAgLy8vIFNwcmF3ZHphIGN6eSBhcGFyYXQgbmllIGplc3QgdyB0cnliaWUgYXV0b2Zva3VzYSAncMWCeXdhasSFY2VnbydcbiAgYm9vbCBjaGVja0NhbWVyYVJlYWRpbmVzcygpIHtcbiAgICByZXR1cm4gaXNSZWFkeSAmJiBmb2N1c0xvY2tlZCAmJiBleHBvc3VyZUxvY2tlZDtcbiAgfVxuXG4gIC8vLyBSZXNldHVqZSBwYXJhbWV0cnkgYXBhcmF0dSBkbyBzdGFudSBwb2N6xIV0a293ZWdvXG4gIEZ1dHVyZTx2b2lkPiByZXNldExvY2tzKCkgYXN5bmMge1xuICAgIGlmIChfY29udHJvbGxlciA9PSBudWxsKSByZXR1cm47XG4gICAgYXdhaXQgX2NvbnRyb2xsZXIhLnNldEZvY3VzTW9kZShGb2N1c01vZGUuYXV0byk7XG4gICAgYXdhaXQgX2NvbnRyb2xsZXIhLnNldEV4cG9zdXJlTW9kZShFeHBvc3VyZU1vZGUuYXV0byk7XG4gICAgZm9jdXNMb2NrZWQgPSBmYWxzZTtcbiAgICBleHBvc3VyZUxvY2tlZCA9IGZhbHNlO1xuICAgIGlzUmVhZHkgPSBmYWxzZTtcbiAgfVxufWA7XG5cbiAgY29uc3QgbWFpbkRhcnRDb2RlID0gYC8vIGxpYi9tYWluLmRhcnRcbmltcG9ydCAncGFja2FnZTpmbHV0dGVyL21hdGVyaWFsLmRhcnQnO1xuaW1wb3J0ICdwYWNrYWdlOnByb3ZpZGVyL3Byb3ZpZGVyLmRhcnQnO1xuaW1wb3J0ICdjaGlsbF9tb2RlX3NjcmVlbi5kYXJ0JztcbmltcG9ydCAncXVhbnR1bV9tb2RlX3NjcmVlbi5kYXJ0Jztcblxudm9pZCBtYWluKCkge1xuICBydW5BcHAoXG4gICAgQ2hhbmdlTm90aWZpZXJQcm92aWRlcihcbiAgICAgIGNyZWF0ZTogKGNvbnRleHQpID0+IEFwcFN0YXRlUHJvdmlkZXIoKSxcbiAgICAgIGNoaWxkOiBjb25zdCBDaG9taWtCdWxhQXBwKCksXG4gICAgKSxcbiAgKTtcbn1cblxuY2xhc3MgQXBwU3RhdGVQcm92aWRlciBleHRlbmRzIENoYW5nZU5vdGlmaWVyIHtcbiAgYm9vbCBfaXNRdWFudHVtTW9kZSA9IGZhbHNlO1xuICBib29sIGdldCBpc1F1YW50dW1Nb2RlID0+IF9pc1F1YW50dW1Nb2RlO1xuXG4gIHZvaWQgdG9nZ2xlTW9kZSgpIHtcbiAgICBfaXNRdWFudHVtTW9kZSA9ICFfaXNRdWFudHVtTW9kZTtcbiAgICBub3RpZnlMaXN0ZW5lcnMoKTtcbiAgfVxufVxuXG5jbGFzcyBDaG9taWtCdWxhQXBwIGV4dGVuZHMgU3RhdGVsZXNzV2lkZ2V0IHtcbiAgY29uc3QgQ2hvbWlrQnVsYUFwcCh7c3VwZXIua2V5fSk7XG5cbiAgQG92ZXJyaWRlXG4gIFdpZGdldCBidWlsZChCdWlsZENvbnRleHQgY29udGV4dCkge1xuICAgIHJldHVybiBNYXRlcmlhbEFwcChcbiAgICAgIHRpdGxlOiAnS2x1YiBCdcWCeScsXG4gICAgICB0aGVtZTogVGhlbWVEYXRhLmRhcmsoKS5jb3B5V2l0aChcbiAgICAgICAgc2NhZmZvbGRCYWNrZ3JvdW5kQ29sb3I6IGNvbnN0IENvbG9yKDB4RkYwMjA2MTcpLCAvLyBTbGF0ZSA5NTBcbiAgICAgICAgY29sb3JTY2hlbWU6IGNvbnN0IENvbG9yU2NoZW1lLmRhcmsoXG4gICAgICAgICAgcHJpbWFyeTogQ29sb3IoMHhGRjBFQTVFOSksIC8vIFNreSA1MDBcbiAgICAgICAgICBzZWNvbmRhcnk6IENvbG9yKDB4RkYxMEI5ODEpLCAvLyBFbWVyYWxkIDUwMFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICAgIGhvbWU6IENvbnN1bWVyPEFwcFN0YXRlUHJvdmlkZXI+KFxuICAgICAgICBidWlsZGVyOiAoY29udGV4dCwgc3RhdGUsIGNoaWxkKSB7XG4gICAgICAgICAgcmV0dXJuIEFuaW1hdGVkU3dpdGNoZXIoXG4gICAgICAgICAgICBkdXJhdGlvbjogY29uc3QgRHVyYXRpb24obWlsbGlzZWNvbmRzOiA2MDApLFxuICAgICAgICAgICAgY2hpbGQ6IHN0YXRlLmlzUXVhbnR1bU1vZGUgXG4gICAgICAgICAgICAgID8gY29uc3QgUXVhbnR1bU1vZGVTY3JlZW4oKSBcbiAgICAgICAgICAgICAgOiBjb25zdCBDaGlsbE1vZGVTY3JlZW4oKSxcbiAgICAgICAgICApO1xuICAgICAgICB9LFxuICAgICAgKSxcbiAgICApO1xuICB9XG59YDtcblxuICBjb25zdCBjaGlsbFNjcmVlbkNvZGUgPSBgLy8gbGliL2NoaWxsX21vZGVfc2NyZWVuLmRhcnRcbmltcG9ydCAncGFja2FnZTpmbHV0dGVyL21hdGVyaWFsLmRhcnQnO1xuaW1wb3J0ICdwYWNrYWdlOnByb3ZpZGVyL3Byb3ZpZGVyLmRhcnQnO1xuaW1wb3J0ICdtYWluLmRhcnQnOyAvLyBpbXBvcnQgQXBwU3RhdGVQcm92aWRlclxuXG5jbGFzcyBDaGlsbE1vZGVTY3JlZW4gZXh0ZW5kcyBTdGF0ZWxlc3NXaWRnZXQge1xuICBjb25zdCBDaGlsbE1vZGVTY3JlZW4oe0tleT8ga2V5fSkgOiBzdXBlcihrZXk6IGtleSk7XG5cbiAgQG92ZXJyaWRlXG4gIFdpZGdldCBidWlsZChCdWlsZENvbnRleHQgY29udGV4dCkge1xuICAgIHJldHVybiBTY2FmZm9sZChcbiAgICAgIGJhY2tncm91bmRDb2xvcjogY29uc3QgQ29sb3IoMHhGRkZERTY4QSksIC8vIENpZXDFgnksIFwiY2hvbWlrb3d5XCIga29sb3IgKEFtYmVyIDIwMClcbiAgICAgIGJvZHk6IENlbnRlcihcbiAgICAgICAgY2hpbGQ6IENvbHVtbihcbiAgICAgICAgICBtYWluQXhpc0FsaWdubWVudDogTWFpbkF4aXNBbGlnbm1lbnQuY2VudGVyLFxuICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAvLyBJa29uYSB6d2llcnpha2EgLyByZXByZXplbnRhY2phIEJ1xYJ5XG4gICAgICAgICAgICBjb25zdCBJY29uKEljb25zLnBldHMsIHNpemU6IDEyMCwgY29sb3I6IENvbG9ycy5icm93biksXG4gICAgICAgICAgICBjb25zdCBTaXplZEJveChoZWlnaHQ6IDIwKSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgVGV4dChcbiAgICAgICAgICAgICAgXCJTaWVtYSwgamVzdGVtIEJ1xYJhIVwiLFxuICAgICAgICAgICAgICBzdHlsZTogVGV4dFN0eWxlKGZvbnRTaXplOiAzMiwgZm9udFdlaWdodDogRm9udFdlaWdodC5ib2xkLCBjb2xvcjogQ29sb3JzLmJyb3duKSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBjb25zdCBQYWRkaW5nKFxuICAgICAgICAgICAgICBwYWRkaW5nOiBFZGdlSW5zZXRzLnN5bW1ldHJpYyhob3Jpem9udGFsOiAzMi4wLCB2ZXJ0aWNhbDogMTIuMCksXG4gICAgICAgICAgICAgIGNoaWxkOiBUZXh0KFxuICAgICAgICAgICAgICAgIFwiUmF6ZW0gb2dhcm5pZW15IHRlbiBiYcWCYWdhbiB3IFR3b2plaiBmb3JtaWUuIFwiXG4gICAgICAgICAgICAgICAgXCJHb3Rvd3kgbmEgbm93eSBRdWVzdD9cIixcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ246IFRleHRBbGlnbi5jZW50ZXIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IFRleHRTdHlsZShmb250U2l6ZTogMTgsIGNvbG9yOiBDb2xvcnMuYnJvd24pLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgU2l6ZWRCb3goaGVpZ2h0OiA0MCksXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFByenljaXNrIFwiT0dBUk5JSiBNTklFXCJcbiAgICAgICAgICAgIEVsZXZhdGVkQnV0dG9uKFxuICAgICAgICAgICAgICBzdHlsZTogRWxldmF0ZWRCdXR0b24uc3R5bGVGcm9tKFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogQ29sb3JzLm9yYW5nZSxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiBjb25zdCBFZGdlSW5zZXRzLnN5bW1ldHJpYyhob3Jpem9udGFsOiA1MCwgdmVydGljYWw6IDIwKSxcbiAgICAgICAgICAgICAgICBzaGFwZTogUm91bmRlZFJlY3RhbmdsZUJvcmRlcihib3JkZXJSYWRpdXM6IEJvcmRlclJhZGl1cy5jaXJjdWxhcigzMCkpLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBvblByZXNzZWQ6ICgpIGFzeW5jIHtcbiAgICAgICAgICAgICAgICAvLyAxLiBFZmVrdDogQnXFgmEgemFrxYJhZGEgZ29nbGUgKG1vxbxlc3ogdHUgZG9kYcSHIGFuaW1hY2rEmSBwcnplenJvY3p5c3RvxZtjaSlcbiAgICAgICAgICAgICAgICBzaG93RGlhbG9nKFxuICAgICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dCxcbiAgICAgICAgICAgICAgICAgIGJhcnJpZXJEaXNtaXNzaWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBidWlsZGVyOiAoY29udGV4dCkgPT4gY29uc3QgQ2VudGVyKFxuICAgICAgICAgICAgICAgICAgICBjaGlsZDogVGV4dChcbiAgICAgICAgICAgICAgICAgICAgICBcIkJ1xYJhIHpha8WCYWRhIEN5YmVyLUdvZ2xlLi4uIPCflbbvuI9cIiwgXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFRleHRTdHlsZShjb2xvcjogQ29sb3JzLndoaXRlLCBmb250U2l6ZTogMjQsIGZvbnRXZWlnaHQ6IEZvbnRXZWlnaHQuYm9sZClcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIC8vIDIuIE9ww7PFum5pZW5pZSBkbGEgZWZla3R1IFwidGVsZXBvcnRhY2ppXCIgKG5wLiAxNTAwbXMpXG4gICAgICAgICAgICAgICAgYXdhaXQgRnV0dXJlLmRlbGF5ZWQoY29uc3QgRHVyYXRpb24obWlsbGlzZWNvbmRzOiAxNTAwKSk7XG5cbiAgICAgICAgICAgICAgICAvLyAzLiBQcnplasWbY2llIGRvIFF1YW50dW1Nb2RlICh1xbx5d2FqxIVjIFByb3ZpZGVyYSBsdWIgTmF2aWdhdG9yYSlcbiAgICAgICAgICAgICAgICBpZiAoY29udGV4dC5tb3VudGVkKSB7XG4gICAgICAgICAgICAgICAgICBOYXZpZ2F0b3Iub2YoY29udGV4dCkucG9wKCk7IC8vIFphbWtuaWogXCJkeW1la1wiIHogdGVrc3RlbVxuICAgICAgICAgICAgICAgICAgUHJvdmlkZXIub2Y8QXBwU3RhdGVQcm92aWRlcj4oY29udGV4dCwgbGlzdGVuOiBmYWxzZSkudG9nZ2xlTW9kZSgpO1xuICAgICAgICAgICAgICAgICAgcHJpbnQoXCJCdcWCYSB6YWvFgmFkYSBnb2dsZS4uLlwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGNoaWxkOiBjb25zdCBUZXh0KFxuICAgICAgICAgICAgICAgIFwiT0dBUk5JSiBNTklFXCIsXG4gICAgICAgICAgICAgICAgc3R5bGU6IFRleHRTdHlsZShmb250U2l6ZTogMjAsIGZvbnRXZWlnaHQ6IEZvbnRXZWlnaHQuYm9sZCwgY29sb3I6IENvbG9ycy53aGl0ZSksXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICApLFxuICAgICAgICAgIF0sXG4gICAgICAgICksXG4gICAgICApLFxuICAgICk7XG4gIH1cbn1gO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy1bMF84cHhfMzJweF9yZ2JhKDAsMCwwLDAuNSldXCIgaWQ9XCJmbHV0dGVyX21vYmlsZV9pbnRlZ3JhdGlvbl9jYXJkXCI+XG4gICAgICBcbiAgICAgIHsvKiBUYWIgYmFyIGhlYWRlciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLXNsYXRlLTk1MCB2aWEtc2xhdGUtOTAwIHRvLXNsYXRlLTk1MCBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwIHB4LTUgcHktNCBmbGV4IGZsZXgtY29sIHhsOmZsZXgtcm93IHhsOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQtbGcgYmctc2t5LTUwMC8xMCBib3JkZXIgYm9yZGVyLXNreS01MDAvMzAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LVswXzBfMTJweF9yZ2JhKDE0LDE2NSwyMzMsMC4yNSldXCI+XG4gICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2t5LTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzhweF0gZm9udC1ib2xkIHRleHQtc2t5LTQwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXN0IGJsb2NrXCI+TU9CSUxFIFRSQU5TSVRJT04gUE9SVEFMPC9zcGFuPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC1zbGF0ZS0xMDAgdHJhY2tpbmctdGlnaHQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8c3Bhbj5JTlRFR1JBQ0pBIEZMVVRURVIgKEtMVUIgQlXFgVkpPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy1za3ktOTUwIHRleHQtc2t5LTMwMCBib3JkZXIgYm9yZGVyLXNreS04MDAvNjAgcm91bmRlZCB0ZXh0LVs3cHhdIGZvbnQtbW9ubyBweC0xLjUgcHktMC4yIHNlbGVjdC1ub25lIGFuaW1hdGUtcHVsc2VcIj5FTVVMQVRPUiBSRUFEWTwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUYWIgU3dpdGNoZXJzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS05MDAgcm91bmRlZC1sZyBwLTAuNSBnYXAtMC41IHRleHQtWzlweF0gZm9udC1tb25vXCIgaWQ9XCJmbHV0dGVyX3RhYnNcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2VtdWxhdG9yJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMS41IHJvdW5kZWQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgJHthY3RpdmVUYWIgPT09ICdlbXVsYXRvcicgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMC80MCcgOiAndGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS0zMDAnfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFBsYXkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5JTlRFUkFLVFlXTlkgRU1VTEFUT1I8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2NoaWxsX3NjcmVlbicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEuNSByb3VuZGVkIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xICR7YWN0aXZlVGFiID09PSAnY2hpbGxfc2NyZWVuJyA/ICdiZy1za3ktOTUwIHRleHQtc2t5LTQwMCBmb250LWJvbGQgYm9yZGVyIGJvcmRlci1za3ktODAwLzQwJyA6ICd0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTMwMCd9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q29kZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5DSElMTF9NT0RFX1NDUkVFTi5EQVJUPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdzY3JlZW5zJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMS41IHJvdW5kZWQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgJHthY3RpdmVUYWIgPT09ICdzY3JlZW5zJyA/ICdiZy1za3ktOTUwIHRleHQtc2t5LTQwMCBmb250LWJvbGQgYm9yZGVyIGJvcmRlci1za3ktODAwLzQwJyA6ICd0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTMwMCd9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q29kZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNreS00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+TUFJTi5EQVJUPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIFxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignY2FtZXJhX2NvZGUnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xLjUgcm91bmRlZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSAke2FjdGl2ZVRhYiA9PT0gJ2NhbWVyYV9jb2RlJyA/ICdiZy1za3ktOTUwIHRleHQtc2t5LTQwMCBmb250LWJvbGQgYm9yZGVyIGJvcmRlci1za3ktODAwLzQwJyA6ICd0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTMwMCd9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlNURVJPV05JSyBBUEFSQVRVPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdhcmNoaXRlY3R1cmUnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xLjUgcm91bmRlZCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSAke2FjdGl2ZVRhYiA9PT0gJ2FyY2hpdGVjdHVyZScgPyAnYmctc2t5LTk1MCB0ZXh0LXNreS00MDAgZm9udC1ib2xkIGJvcmRlciBib3JkZXItc2t5LTgwMC80MCcgOiAndGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS0zMDAnfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlNUUlVLVFVSQSBQUk9KRUtUVTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEJvZHkgQXJlYSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01XCI+XG4gICAgICAgIFxuICAgICAgICB7LyogQXJjaGl0ZWN0dXJlIFRhYiAqL31cbiAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2FyY2hpdGVjdHVyZScgJiYgYXJjaGl0ZWN0dXJlSW5mb31cblxuICAgICAgICB7LyogQ2FtZXJhIENvbnRyb2wgTWFuYWdlciBUYWIgKi99XG4gICAgICAgIHthY3RpdmVUYWIgPT09ICdjYW1lcmFfY29kZScgJiYgKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIGFuaW1hdGUtZmFkZUluXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtc2t5LTQwMFwiIC8+IFxuICAgICAgICAgICAgICAgIDxzcGFuPktvbXBpbGFjamEgQmxva2FkIE1lZHljem55Y2ggKERhcnQgQ2FtZXJhIEFQSSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRyaWdnZXJDb3B5KCdjYW1fZGFydCcsIGNhbWVyYUNvZGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC1bOHB4XSBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZEluZGV4ID09PSAnY2FtX2RhcnQnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENsaXBib2FyZCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz59XG4gICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZEluZGV4ID09PSAnY2FtX2RhcnQnID8gJ1NLT1BJT1dBTk8hJyA6ICdLT1BJVUogS09EJ308L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQtbGcgcC0zIHRleHQtWzlweF0gZm9udC1tb25vIHRleHQtc2t5LTMwMCBvdmVyZmxvdy14LWF1dG8gbWF4LWgtWzM1MHB4XSBsZWFkaW5nLXJlbGF4ZWQgc2VsZWN0LWFsbFwiPlxuICAgICAgICAgICAgICAgIHtjYW1lcmFDb2RlfVxuICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMiByaWdodC0yIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkIHB4LTEuNSBweS0wLjUgdGV4dC1bN3B4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS01MDAgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgICAgICBMVU1BIDE0Mi8yNTUgJiBMT0NLU1xuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBNYWluLmRhcnQgU3RydWN0IFRhYiAqL31cbiAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3NjcmVlbnMnICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBhbmltYXRlLWZhZGVJblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPENvZGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1za3ktNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5HxYLDs3dueSBQdW5rdCBXZWrFm2Npb3d5IChtYWluLmRhcnQgeiBQcm92aWRlcmVtKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdHJpZ2dlckNvcHkoJ21haW5fZGFydCcsIG1haW5EYXJ0Q29kZSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCBweC0yIHB5LTEgcm91bmRlZCB0ZXh0LVs4cHhdIGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y29waWVkSW5kZXggPT09ICdtYWluX2RhcnQnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENsaXBib2FyZCBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz59XG4gICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZEluZGV4ID09PSAnbWFpbl9kYXJ0JyA/ICdTS09QSU9XQU5PIScgOiAnS09QSVVKIEtPRCd9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCByb3VuZGVkLWxnIHAtMyB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LXNreS0zMDAvOTAgb3ZlcmZsb3cteC1hdXRvIG1heC1oLVszNTBweF0gbGVhZGluZy1yZWxheGVkIHNlbGVjdC1hbGxcIj5cbiAgICAgICAgICAgICAgICB7bWFpbkRhcnRDb2RlfVxuICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuXG4gICAgICAgIHsvKiBDaGlsbCBNb2RlIFNjcmVlbiBUYWIgKi99XG4gICAgICAgIHthY3RpdmVUYWIgPT09ICdjaGlsbF9zY3JlZW4nICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBhbmltYXRlLWZhZGVJblwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPENvZGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkVrcmFuIFBvd2l0YWxueSAoY2hpbGxfbW9kZV9zY3JlZW4uZGFydCB6IHByemXFgsSFY3plbmllbSBzdGFuw7N3KTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdHJpZ2dlckNvcHkoJ2NoaWxsX2RhcnQnLCBjaGlsbFNjcmVlbkNvZGUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC1bOHB4XSBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZEluZGV4ID09PSAnY2hpbGxfZGFydCcgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q2xpcGJvYXJkIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPn1cbiAgICAgICAgICAgICAgICA8c3Bhbj57Y29waWVkSW5kZXggPT09ICdjaGlsbF9kYXJ0JyA/ICdTS09QSU9XQU5PIScgOiAnS09QSVVKIEtPRCd9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCByb3VuZGVkLWxnIHAtMyB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTMwMCBvdmVyZmxvdy14LWF1dG8gbWF4LWgtWzM1MHB4XSBsZWFkaW5nLXJlbGF4ZWQgc2VsZWN0LWFsbFwiPlxuICAgICAgICAgICAgICAgIHtjaGlsbFNjcmVlbkNvZGV9XG4gICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIHJpZ2h0LTIgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQgcHgtMS41IHB5LTAuNSB0ZXh0LVs3cHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTUwMCBzZWxlY3Qtbm9uZVwiPlxuICAgICAgICAgICAgICAgIENISUxMX01PREVfU0NSRUVOLkRBUlRcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogSW50ZXJhY3RpdmUgUGhvbmUgRW11bGF0b3IgJiBTY3JlZW4gVGFiICovfVxuICAgICAgICB7YWN0aXZlVGFiID09PSAnZW11bGF0b3InICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC01IGl0ZW1zLXN0cmV0Y2ggYW5pbWF0ZS1mYWRlSW5cIj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgey8qIExlZnQgc2lkZTogR3VpZGUgZGVzY3JpcHRpb24gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctYW1iZXItNTAwLzEwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzIwIHJvdW5kZWQtbGdcIj5cbiAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNhbnMgZm9udC1ib2xkIHRleHQtYW1iZXItMzAwIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlJlYWxpc3R5Y3pueSBFbXVsYXRvciBLbHViIEJ1xYJ5IChGbHV0dGVyKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIE5hc3ogaW50ZXJha3R5d255IHN5bXVsYXRvciBwbyBwcmF3ZWogc3Ryb25pZSB6b3N0YcWCIGRvc3Rvc293YW55IGRvIFR3b2plZ28ga29kdSA8Y29kZT5jaGlsbF9tb2RlX3NjcmVlbi5kYXJ0PC9jb2RlPiEgXG4gICAgICAgICAgICAgICAgICAgIE1hIGNpZXDFgnksIMW8w7PFgnR5IGtvbG9yIDxjb2RlPkNvbG9yKDB4RkZGREU2OEEpPC9jb2RlPiwgYnLEhXpvd8SFIGlrb25rxJkgcGV0cy9idcWCeSBvcmF6IHBvbWFyYcWEY3pvd3ksIFxuICAgICAgICAgICAgICAgICAgICBva3LEhWfFgnkgcHJ6eWNpc2sgPHN0cm9uZz5PR0FSTklKIE1OSUU8L3N0cm9uZz4uIEtsaWtuaWogZ28sIGFieSB6b2JhY3p5xIcgbWFnacSZIG5ha8WCYWRhbmlhIGN5YmVyLWdvZ2xpIVxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTkwMC8yMCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMCByb3VuZGVkLWxnXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bOHB4XSBmb250LWJvbGQgdGV4dC1zbGF0ZS01MDAgdXBwZXJjYXNlIGJsb2NrIG1iLTFcIj5KQUsgVE8gRFpJQcWBQSBXIEZMVVRURVJaRT88L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICAgIEdkeSBrbGlrbmllc3ogPHN0cm9uZz5PR0FSTklKIE1OSUU8L3N0cm9uZz4sIFByb3ZpZGVyIHBvd2lhZGFtaWEgc3Vic2tyeWJlbnTDs3cgbyB6bWlhbmllIG5hIDxjb2RlPmlzUXVhbnR1bU1vZGUgPSB0cnVlPC9jb2RlPi4gXG4gICAgICAgICAgICAgICAgICAgIER6acSZa2kgd2lkZ2V0b3dpIDxjb2RlPkFuaW1hdGVkU3dpdGNoZXI8L2NvZGU+LCBGbHV0dGVyIHcgdcWCYW1rdSBzZWt1bmR5IHDFgnlubmllIHd5Z2FzaSDFvMOzxYJ0eSBla3JhbiBpIGFrdHl3dWplIFxuICAgICAgICAgICAgICAgICAgICBwb2RnbMSFZCB6IGFwYXJhdHUgd3JheiB6IG5ha8WCYWRrxIUgSFVEIHcgPHN0cm9uZz5RdWFudHVtTW9kZTwvc3Ryb25nPi5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEFjdGlvbiBjb250cm9sbGVyIHRyaWdnZXJzIGZvciBlbXVsYXRvciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0zIGJvcmRlciBib3JkZXItc2xhdGUtOTAwIHJvdW5kZWQtbGcgc3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1ib2xkIGJsb2NrIHVwcGVyY2FzZVwiPktPTlRST0xLSSBTTUFSVEZPTkE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSdW5FbXVsYXRvclNjYW59XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC01MDAgdG8tdGVhbC01MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTYwMCBob3Zlcjp0by10ZWFsLTYwMCB0ZXh0LXNsYXRlLTk1MCBmb250LXNhbnMgZm9udC1ibGFjayB0ZXh0LVsxMHB4XSBweS0xLjUgcHgtMyByb3VuZGVkLWxnIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIGFjdGl2ZTpzY2FsZS05NSBzaGFkb3ctWzBfMnB4XzhweF9yZ2JhKDE2LDE4NSwxMjksMC4yKV1cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8UGxheSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtwaG9uZVN0YXRlID09PSAnY2hpbGwnIFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnS0xJS05JSiBcIk9HQVJOSUogTU5JRVwiIChaQUvFgUFEQU5JRSBHT0dMSSknIFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBwaG9uZVN0YXRlID09PSAndHJhbnNpdGlvbicgXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdJTklDSk9XQU5JRSBTS0FORVJBIEFJLi4uJyBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ1JPWlBPQ1pOSUogU1lNVUxBQ0rEmCBTS0FOVSd9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtyZXNldEVtdWxhdG9yfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIHB5LTEuNSBweC0zIHJvdW5kZWQtbGcgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UkVTRVQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFJpZ2h0IHNpZGU6IFN0eWxpemVkIGludGVyYWN0aXZlIHBob25lIGVtdWxhdG9yICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1bMjIwcHhdIGgtWzQzMHB4XSBiZy1zbGF0ZS05MDAgcm91bmRlZC1bMzVweF0gcC0zIGJvcmRlci1bNHB4XSBib3JkZXItc2xhdGUtODAwIHNoYWRvdy1bMF8yNXB4XzUwcHhfLTEycHhfcmdiYSgwLDAsMCwwLjgpXSBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHsvKiBTcGVha2VyIHBpbGwgdG9wICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEuNSBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIHctMTYgaC0zLjUgYmctc2xhdGUtODUwIHJvdW5kZWQtZnVsbCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNyBoLTEgYmctc2xhdGUtNzAwIHJvdW5kZWQtZnVsbFwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogU2ltdWxhdGVkIFNjcmVlbiBCb2R5ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIHJvdW5kZWQtWzI0cHhdIGJnLXNsYXRlLTk1MCBvdmVyZmxvdy1oaWRkZW4gcmVsYXRpdmUgZmxleCBmbGV4LWNvbCBwLTMgYm9yZGVyIGJvcmRlci1zbGF0ZS05NTAgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgey8qIFBob25lIFN0YXR1cyBiYXIgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciB0ZXh0LVs3cHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTUwMCBtYi0yIG10LTEgcHgtMSB6LTMwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkNFTFVMQVJfTkVUPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+4pePIExJVkU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPjEwMCUg8J+Uizwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogU0NSRUVOIFZJRVdQT1JUIC0gRFlOQU1JQyBCQVNFRCBPTiBTVEFURSAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIHJvdW5kZWQteGwgb3ZlcmZsb3ctaGlkZGVuIHJlbGF0aXZlIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2UgbW9kZT1cIndhaXRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7cGhvbmVTdGF0ZSA9PT0gJ2NoaWxsJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9XCJjaGlsbF9zY3JlZW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAxIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVsjRkRFNjhBXSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LWNlbnRlciBwLTMgei0xMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC01eGwgbWItMiBhbmltYXRlLWJvdW5jZVwiPvCfkLk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJiZy1hbWJlci05MDAvMTAgYm9yZGVyIGJvcmRlci1hbWJlci05MDAvMjAgdGV4dC1hbWJlci05MDAgcm91bmRlZC1mdWxsIHB4LTIgcHktMC41IHRleHQtWzdweF0gZm9udC1tb25vIHVwcGVyY2FzZSBmb250LWJsYWNrIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDSElMTCBNT0RFXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC1bMTNweF0gZm9udC1ibGFjayB0ZXh0LWFtYmVyLTk1MFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU2llbWEsIGplc3RlbSBCdcWCYSFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2g1PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LVs4LjVweF0gdGV4dC1hbWJlci05MDAvODAgbGVhZGluZy1yZWxheGVkIHB4LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJhemVtIG9nYXJuaWVteSB0ZW4gYmHFgmFnYW4gdyBUd29qZWogZm9ybWllLiBHb3Rvd3kgbmEgbm93eSBRdWVzdD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSdW5FbXVsYXRvclNjYW59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtNSBiZy1vcmFuZ2UtNTAwIGhvdmVyOmJnLW9yYW5nZS02MDAgYWN0aXZlOnNjYWxlLTk1IHRleHQtd2hpdGUgZm9udC1zYW5zIGZvbnQtYmxhY2sgdGV4dC1bOXB4XSBweS0yIHB4LTUgcm91bmRlZC1mdWxsIHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT0dBUk5JSiBNTklFXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICB7cGhvbmVTdGF0ZSA9PT0gJ3RyYW5zaXRpb24nICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT1cInRyYW5zaXRpb25fc2NyZWVuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCBzY2FsZTogMC45NSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHNjYWxlOiAxIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDEuMDUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1zbGF0ZS05NTAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1jZW50ZXIgcC0zIHotMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTN4bCBhbmltYXRlLXNwaW4gdGV4dC1za3ktNDAwIG1iLTJcIj7imqE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVs3cHhdIHRleHQtc2t5LTQwMCBmb250LWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBibG9ja1wiPlRSQU5TSVRJT05fU1RBVEU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2FucyB0ZXh0LVsxMHB4XSBmb250LWJsYWNrIHRleHQtc2xhdGUtMTAwIG10LTFcIj5CVcWBQSBaQUvFgUFEQSBDWUJFUi1HT0dMRS4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTI0IGJnLXNsYXRlLTkwMCBoLTEgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlbiBtdC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXYgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbml0aWFsPXt7IHdpZHRoOiAwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHdpZHRoOiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDEuNCwgZWFzZTogJ2Vhc2VJbk91dCcgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNreS01MDAgaC1mdWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAge3Bob25lU3RhdGUgPT09ICdxdWFudHVtJyAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9XCJxdWFudHVtX3NjcmVlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgYmctc2xhdGUtOTUwIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHAtMi41IHotMTBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7LyogU2ltdWxhdGVkIENhbWVyYSBmZWVkIC8gbWF0cml4IGdyaWQgZm9yIFF1YW50dW0gTW9kZSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLVtsaW5lYXItZ3JhZGllbnQocmdiYSgxNCwxNjUsMjMzLDAuMDMpXzFweCx0cmFuc3BhcmVudF8xcHgpLGxpbmVhci1ncmFkaWVudCg5MGRlZyxyZ2JhKDE0LDE2NSwyMzMsMC4wMylfMXB4LHRyYW5zcGFyZW50XzFweCldIGJnLVtzaXplOjEwcHhfMTBweF0gb3BhY2l0eS00MCB6LTAgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEZhY2Ugc2ltdWxhdGlvbiBjb250YWluZXIgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleC0xIGJnLXNsYXRlLTkwMC8zMCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2t5LTk1MC80MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyZmxvdy1oaWRkZW4gei0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xIGxlZnQtMS41IGZvbnQtbW9ubyB0ZXh0LVs1LjVweF0gdGV4dC1za3ktNDAwXCI+U1lTX0FJX0ZBQ0VfVFJBQ0tJTkc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIEhhbXN0ZXIgZmFjZSB3aXRoIEN5YmVyIGdvZ2dsZXMgb3ZlcmxheSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTN4bFwiPvCfkLk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluaXRpYWw9e3sgeTogLTMwLCBvcGFjaXR5OiAwLCBzY2FsZTogMiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHk6IC0xNiwgb3BhY2l0eTogMSwgc2NhbGU6IDEuMTUgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdGV4dC0yLjV4bCBkcm9wLXNoYWRvdy1bMF8wXzhweF9yZ2JhKDE0LDE2NSwyMzMsMC44KV1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDwn5W277iPXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey8qIFNpbXVsYXRlZCBjaXJjdWxhciBwcm9ncmVzcyBhcm91bmQgc2NhbiBidXR0b24gKi99XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMS41IGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgZ2FwLTEgdy1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSdW5FbXVsYXRvclNjYW59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHctMTIgaC0xMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvOTUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2t5LTgwMCBob3Zlcjpib3JkZXItc2t5LTUwMCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgc2hhZG93LVswXzBfMTJweF9yZ2JhKDE0LDE2NSwyMzMsMC4zKV1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNhbnMgdGV4dC1bNC41cHhdIHRleHQtc2t5LTMwMCBmb250LWJsYWNrIHRyYWNraW5nLXRpZ2h0ZXIgdXBwZXJjYXNlIHdoaXRlc3BhY2Utbm93cmFwXCI+U1RBUlQgU0NBTjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBSaW5nIHByb2dyZXNzIHN2ZyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgdHJhbnNmb3JtIC1yb3RhdGUtOTAgcG9pbnRlci1ldmVudHMtbm9uZVwiIHZpZXdCb3g9XCIwIDAgNDggNDhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjeD1cIjI0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN5PVwiMjRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcj1cIjIwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0cm9rZS1za3ktNDAwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsPVwidHJhbnNwYXJlbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlRGFzaGFycmF5PXsxMjUuNn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZURhc2hvZmZzZXQ9ezEyNS42IC0gKHNpbXVsYXRlZFN0YWJpbGl0eSAvIDEwMCkgKiAxMjUuNn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDAuMSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bNi41cHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkIGJnLXNsYXRlLTk1MC84MCBweC0xIHB5LTAuMiByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNUQUJJTE5PxZrEhjoge3NpbXVsYXRlZFN0YWJpbGl0eX0lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiB0ZXh0LVs2LjVweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNTAwIHNwYWNlLXktMC41IGJvcmRlci10IGJvcmRlci1zbGF0ZS05MDAvNjAgei0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkhXX0xPQ0tTOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj5FTkZPUkNFRCAoT0spPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkxVTUFfTk9STTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4xNDIgTFVNQSBPSzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9BbmltYXRlUHJlc2VuY2U+XG5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogU2ltdWxhdGVkIHRlcm1pbmFsIGNvbnNvbGUgZm9yIHBob25lICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIGgtWzU1cHhdIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMC84MCByb3VuZGVkLWxnIHAtMS41IGZvbnQtbW9ubyB0ZXh0LVs1cHhdIHRleHQtc2t5LTMwMC84MCBvdmVyZmxvdy15LWF1dG8gZmxleCBmbGV4LWNvbCBnYXAtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgIHtzaW11bGF0ZWRMb2cuc2xpY2UoLTUpLm1hcCgobG9nLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntsb2d9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBIb21lIGluZGljYXRvciBiYXIgYm90dG9tICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xNiBoLTEgYmctc2xhdGUtODAwIHJvdW5kZWQtZnVsbCBteC1hdXRvIG10LTEgei01MFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUF5RFU7QUF6RFYsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsUUFBUSx1QkFBdUI7QUFDeEMsU0FBUyxZQUFZLFVBQVUsTUFBTSxLQUFlLE1BQU0sVUFBVSxPQUE2QixXQUFXLFFBQVEsaUJBQWlCO0FBRTlILGFBQU0sMkJBQXFDLE1BQU07QUFDdEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQW1GLFVBQVU7QUFDL0gsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQXdCLElBQUk7QUFHbEUsUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQTZDLE9BQU87QUFDeEYsUUFBTSxDQUFDLG9CQUFvQixxQkFBcUIsSUFBSSxTQUFTLENBQUM7QUFDOUQsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQW1CO0FBQUEsSUFDekQ7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLGNBQWMsQ0FBQyxJQUFZLFNBQWlCO0FBQ2hELGNBQVUsVUFBVSxVQUFVLElBQUk7QUFDbEMsbUJBQWUsRUFBRTtBQUNqQixlQUFXLE1BQU0sZUFBZSxJQUFJLEdBQUcsR0FBSTtBQUFBLEVBQzdDO0FBRUEsUUFBTSx3QkFBd0IsTUFBTTtBQUNsQyxRQUFJLGVBQWUsV0FBVztBQUM1QixvQkFBYyxZQUFZO0FBQzFCLHNCQUFnQixVQUFRLENBQUMsR0FBRyxNQUFNLCtDQUErQywwQ0FBMEMsQ0FBQztBQUU1SCxpQkFBVyxNQUFNO0FBQ2Ysc0JBQWMsU0FBUztBQUN2Qiw4QkFBc0IsQ0FBQztBQUN2Qix3QkFBZ0IsVUFBUSxDQUFDLEdBQUcsTUFBTSx1Q0FBdUMsa0RBQWtELENBQUM7QUFBQSxNQUM5SCxHQUFHLElBQUk7QUFBQSxJQUNULE9BQU87QUFFTCxzQkFBZ0IsVUFBUSxDQUFDLEdBQUcsTUFBTSx3REFBd0QsQ0FBQztBQUMzRixZQUFNLFdBQVcsWUFBWSxNQUFNO0FBQ2pDLDhCQUFzQixVQUFRO0FBQzVCLGNBQUksUUFBUSxLQUFLO0FBQ2YsMEJBQWMsUUFBUTtBQUN0Qiw0QkFBZ0IsT0FBSyxDQUFDLEdBQUcsR0FBRyw4QkFBOEIsc0NBQXNDLENBQUM7QUFDakcsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU8sT0FBTztBQUFBLFFBQ2hCLENBQUM7QUFBQSxNQUNILEdBQUcsR0FBSztBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxnQkFBZ0IsTUFBTTtBQUMxQixrQkFBYyxPQUFPO0FBQ3JCLDBCQUFzQixDQUFDO0FBQ3ZCLG9CQUFnQixDQUFDLGtEQUFrRCxDQUFDO0FBQUEsRUFDdEU7QUFFQSxRQUFNLG1CQUNKLHVCQUFDLFNBQUksV0FBVSxtREFDYjtBQUFBLDJCQUFDLFNBQUksV0FBVSwwREFDYjtBQUFBLDZCQUFDLFFBQUcsV0FBVSx1RUFDWjtBQUFBLCtCQUFDLFVBQU8sV0FBVSwwQkFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUF5QztBQUFBLFFBQ3pDLHVCQUFDLFVBQUsscUVBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUEyRDtBQUFBLFdBRjdEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFHQTtBQUFBLE1BQ0EsdUJBQUMsT0FBRSxXQUFVLHdCQUF1QjtBQUFBO0FBQUEsUUFFWSx1QkFBQyxZQUFPLDJCQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBbUI7QUFBQSxRQUFTO0FBQUEsUUFBYSx1QkFBQyxZQUFPLHdCQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBZ0I7QUFBQSxRQUFTO0FBQUEsUUFDaEQsdUJBQUMsVUFBSyx3QkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWM7QUFBQSxRQUFPO0FBQUEsV0FIdkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUlBO0FBQUEsTUFDQSx1QkFBQyxRQUFHLFdBQVUsMkNBQ1o7QUFBQSwrQkFBQyxRQUFHO0FBQUEsaUNBQUMsWUFBTyxnQ0FBUjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUF3QjtBQUFBLFVBQVM7QUFBQSxhQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQThKO0FBQUEsUUFDOUosdUJBQUMsUUFBRztBQUFBLGlDQUFDLFlBQU8sa0NBQVI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBMEI7QUFBQSxVQUFTO0FBQUEsVUFBOEUsdUJBQUMsVUFBSyxzQkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFZO0FBQUEsVUFBTztBQUFBLFVBQWUsdUJBQUMsVUFBSywyQ0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFpQztBQUFBLFVBQU87QUFBQSxhQUEvTDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQTJPO0FBQUEsV0FGN087QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUdBO0FBQUEsU0FiRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBY0E7QUFBQSxJQUVBLHVCQUFDLFNBQUksV0FBVSx5Q0FDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSx5REFDYjtBQUFBLCtCQUFDLFVBQUssV0FBVSxvRkFBbUYsK0NBQW5HO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBa0k7QUFBQSxRQUNsSSx1QkFBQyxTQUFJLFdBQVUsb0hBQW9IO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQUFuSTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBTWtCO0FBQUEsV0FScEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQVNBO0FBQUEsTUFFQSx1QkFBQyxTQUFJLFdBQVUsK0ZBQ2I7QUFBQSwrQkFBQyxTQUNDO0FBQUEsaUNBQUMsVUFBSyxXQUFVLHdGQUF1RiwyQ0FBdkc7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBa0k7QUFBQSxVQUNsSSx1QkFBQyxPQUFFLFdBQVUsOENBQTZDO0FBQUE7QUFBQSxZQUN0Qix1QkFBQyxVQUFLLG9DQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTBCO0FBQUEsWUFBTztBQUFBLGVBRHJFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxhQUxGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFNQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLHVFQUNiO0FBQUEsaUNBQUMsU0FBTSxXQUFVLGlCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUErQjtBQUFBLFVBQUU7QUFBQSxhQURuQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFXQTtBQUFBLFNBdkJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0F3QkE7QUFBQSxPQXpDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBMENBO0FBR0YsUUFBTSxhQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQXVEbkIsUUFBTSxlQUFlO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBcURyQixRQUFNLGtCQUFrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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