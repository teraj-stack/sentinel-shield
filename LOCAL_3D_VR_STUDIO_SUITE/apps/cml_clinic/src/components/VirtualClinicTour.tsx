import __vite__cjsImport0_react_jsxDevRuntime from "/apps/cml_clinic/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c9064d4e"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/apps/cml_clinic/node_modules/.vite/deps/react.js?v=c9064d4e"; const useState = __vite__cjsImport1_react["useState"]; const useRef = __vite__cjsImport1_react["useRef"];
import { Canvas, useFrame } from "/apps/cml_clinic/node_modules/.vite/deps/@react-three_fiber.js?v=8480e34e";
import { OrbitControls, Html, PerspectiveCamera } from "/apps/cml_clinic/node_modules/.vite/deps/@react-three_drei.js?v=25c945ae";
import {
  Compass,
  RotateCcw,
  Zap,
  ShieldCheck,
  Eye,
  Sparkles,
  Award,
  Sun,
  Moon,
  Activity,
  CheckCircle2,
  X
} from "/apps/cml_clinic/node_modules/.vite/deps/lucide-react.js?v=a655c9d7";
import { motion, AnimatePresence } from "/apps/cml_clinic/node_modules/.vite/deps/motion_react.js?v=8f268df7";
const HOTSPOTS = [
  {
    id: "laser",
    title: "Stacja Laserowa Biolitec® LHP®/FiLaC®",
    subtitle: "Niemiecki Diodowy Laser Medyczny 1470 nm",
    position: [-1.8, 1.3, -1.2],
    description: "Najnowocześniejszy generator laserowy wyzwalający elastyczną falę światłowodową. Pozwala na bezkrwawe zamknięcie naczyń i przetok z mikronową precyzją.",
    badge: "Sprzęt Główny",
    highlights: ["Gwarancja oszczędzenia zwieraczy", "Brak ran i szwów", "Światłowód radialny 360°"]
  },
  {
    id: "chair",
    title: "Ergonomiczny Fotel Zabiegowy",
    subtitle: "W pełni regulowany fotel proktologiczny",
    position: [1.2, 1.1, -0.5],
    description: "Specjalistyczny fotel z elektryczną regulacją pozycji ginekologiczno-proktologicznej. Zapewnia pełen dyskretny komfort pacjenta podczas badania i zabiegu.",
    badge: "Komfort Pacjenta",
    highlights: ["Aseptyczne pokrycie hybrydowe", "Szybka zmiana pozycji", "Oświetlenie bezcieniowe"]
  },
  {
    id: "anoscopy",
    title: "Wideo-Anoskop Diagnostyczny HD",
    subtitle: "System obrazowania tkanek w wysokiej rozdzielczości",
    position: [-0.2, 1.4, -2.6],
    description: "Kamera kliniczna umożliwiająca pacjentowi opcjonalne zobaczenie stopnia zaawansowania guzków lub przetoki na żywo przed podjęciem decyzji o leczeniu.",
    badge: "Diagnostyka HD",
    highlights: ["Powiększenie 30x", "Rejestracja cyfrowa", "Bezbolesny kaniulowany wziernik"]
  },
  {
    id: "sterilization",
    title: "Strefa Aseptyczna & Autoklaw Klasy B",
    subtitle: "Najwyższy standard higieny chirurgicznej",
    position: [2.3, 1.5, -2.4],
    description: "Rygorystyczne przestrzeganie standardów sterylizacji narzędzi i światłowodów jednorazowego użytku. Bezpieczeństwo biologiczne na poziomie bloku operacyjnego.",
    badge: "Bezpieczeństwo",
    highlights: ["Autoklaw medyczny Euroklav", "Narzędzia jednorazowego użytku", "Dezynfekcja UV-C"]
  }
];
function LaserUnitMesh({ onSelect }) {
  const laserRef = useRef(null);
  useFrame((state) => {
    if (laserRef.current) {
      const t = state.clock.getElapsedTime();
      laserRef.current.position.y = 0 + Math.sin(t * 2) * 0.015;
    }
  });
  return /* @__PURE__ */ jsxDEV("group", { ref: laserRef, position: [-1.8, 0, -1.2], onClick: onSelect, children: [
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.4, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.6, 0.7, 0.5] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#f8fafc", roughness: 0.2, metalness: 0.1 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 93,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 91,
      columnNumber: 7
    }, this),
    [-0.25, 0.25].map(
      (x, i) => [-0.2, 0.2].map((z, j) => /* @__PURE__ */ jsxDEV("mesh", { position: [x, 0.06, z], rotation: [Math.PI / 2, 0, 0], children: [
        /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.06, 0.06, 0.05, 16] }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 99,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#334155" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 100,
          columnNumber: 13
        }, this)
      ] }, `${i}-${j}`, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 98,
        columnNumber: 11
      }, this))
    ),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.9, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.5, 0.3, 0.4] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 106,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#0f172a", roughness: 0.3, metalness: 0.8 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 107,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 105,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.92, 0.21], rotation: [-0.2, 0, 0], children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [0.38, 0.22] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 111,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#38bdf8" }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 112,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 110,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0.22, 1.15, 0], children: [
      /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.015, 0.015, 0.5, 16] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 116,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#a855f7", metalness: 0.9 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 117,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("pointLight", { position: [0.22, 1.4, 0], color: "#a855f7", intensity: 2, distance: 1.5 }, void 0, false, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0.22, 1.4, 0], children: [
      /* @__PURE__ */ jsxDEV("sphereGeometry", { args: [0.03, 16, 16] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#d8b4fe" }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 124,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 122,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
    lineNumber: 89,
    columnNumber: 5
  }, this);
}
function ExaminationChairMesh({ onSelect }) {
  return /* @__PURE__ */ jsxDEV("group", { position: [1.2, 0, -0.5], rotation: [0, -Math.PI / 6, 0], onClick: onSelect, children: [
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.15, 0], children: [
      /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.4, 0.45, 0.3, 32] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 136,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#64748b", metalness: 0.8, roughness: 0.2 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 137,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 135,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.45, 0], children: [
      /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.12, 0.12, 0.3, 32] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 141,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#94a3b8", metalness: 0.9 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 142,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 140,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.7, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.8, 0.12, 0.7] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#7e22ce", roughness: 0.4 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 147,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 145,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 1.05, -0.3], rotation: [0.3, 0, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.75, 0.7, 0.1] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 151,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#6b21a8", roughness: 0.4 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [-0.25, 0.55, 0.4], rotation: [-0.2, 0, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.22, 0.4, 0.1] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 156,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#7e22ce", roughness: 0.4 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 157,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 155,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0.25, 0.55, 0.4], rotation: [-0.2, 0, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.22, 0.4, 0.1] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 160,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#7e22ce", roughness: 0.4 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 161,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 159,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
    lineNumber: 133,
    columnNumber: 5
  }, this);
}
function DoctorDeskMesh({ onSelect }) {
  return /* @__PURE__ */ jsxDEV("group", { position: [-0.2, 0, -2.6], onClick: onSelect, children: [
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.75, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [1.6, 0.06, 0.8] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 173,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#e2e8f0", roughness: 0.3 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 174,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 172,
      columnNumber: 7
    }, this),
    [-0.7, 0.7].map(
      (x, i) => [-0.3, 0.3].map((z, j) => /* @__PURE__ */ jsxDEV("mesh", { position: [x, 0.375, z], children: [
        /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.025, 0.025, 0.75, 16] }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 180,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#475569", metalness: 0.8 }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 181,
          columnNumber: 13
        }, this)
      ] }, `leg-${i}-${j}`, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 179,
        columnNumber: 11
      }, this))
    ),
    /* @__PURE__ */ jsxDEV("mesh", { position: [-0.3, 0.82, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.38, 0.02, 0.28] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 187,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#1e293b" }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 188,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 186,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [-0.3, 0.96, -0.12], rotation: [-0.2, 0, 0], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.38, 0.26, 0.02] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 191,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#0284c7" }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 192,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 190,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0.3, 1.15, -0.1], children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.5, 0.35, 0.03] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 196,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#0f172a" }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 197,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 195,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0.3, 1.15, -0.08], children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [0.46, 0.31] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 200,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshBasicMaterial", { color: "#38bdf8" }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 201,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 199,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0.3, 0.85, -0.1], children: [
      /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.03, 0.08, 0.25, 16] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 204,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#64748b", metalness: 0.9 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 205,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 203,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
    lineNumber: 170,
    columnNumber: 5
  }, this);
}
function RoomEnvironment({ lightMode }) {
  return /* @__PURE__ */ jsxDEV("group", { children: [
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [7, 7] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 217,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#f1f5f9", roughness: 0.15, metalness: 0.05 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 218,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 216,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0, 2, -3.2], children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [7, 4] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 223,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#f8fafc", roughness: 0.4 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 224,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 222,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [-3.2, 2, 0], rotation: [0, Math.PI / 2, 0], children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [7, 4] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 229,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#f8fafc", roughness: 0.4 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 230,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 228,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("mesh", { position: [3.2, 2, 0], rotation: [0, -Math.PI / 2, 0], children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [7, 4] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 235,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("meshPhysicalMaterial", { color: "#e2e8f0", transmission: 0.6, opacity: 0.8, transparent: true, roughness: 0.1 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 236,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 234,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("group", { position: [0, 2.7, -3.18], children: /* @__PURE__ */ jsxDEV("mesh", { children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [2.2, 0.6, 0.04] }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 242,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#ffffff", roughness: 0.2 }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 243,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 241,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 240,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("group", { position: [0.5, 3.2, -0.8], children: [
      /* @__PURE__ */ jsxDEV("mesh", { children: [
        /* @__PURE__ */ jsxDEV("cylinderGeometry", { args: [0.4, 0.45, 0.12, 32] }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 250,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#ffffff", metalness: 0.5 }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 251,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 249,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV(
        "spotLight",
        {
          position: [0, -0.1, 0],
          angle: 0.6,
          penumbra: 0.4,
          intensity: lightMode === "surgical" ? 8 : lightMode === "day" ? 4 : 2,
          color: lightMode === "surgical" ? "#f0f9ff" : "#ffffff"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 253,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 248,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
    lineNumber: 214,
    columnNumber: 5
  }, this);
}
function HotspotPin({
  hotspot,
  isSelected,
  onClick
}) {
  const pinRef = useRef(null);
  useFrame((state) => {
    if (pinRef.current) {
      const t = state.clock.getElapsedTime();
      pinRef.current.position.y = hotspot.position[1] + Math.sin(t * 3) * 0.05;
    }
  });
  return /* @__PURE__ */ jsxDEV("group", { ref: pinRef, position: hotspot.position, children: /* @__PURE__ */ jsxDEV(Html, { center: true, distanceFactor: 8, children: /* @__PURE__ */ jsxDEV(
    "button",
    {
      onClick: (e) => {
        e.stopPropagation();
        onClick();
      },
      className: `group relative flex items-center justify-center p-2 rounded-full transition-all duration-300 ${isSelected ? "bg-purple-600 text-white scale-125 shadow-lg shadow-purple-600/50 ring-4 ring-purple-300/40" : "bg-white/90 text-purple-700 hover:bg-purple-600 hover:text-white shadow-md border border-purple-200"}`,
      children: [
        /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 298,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "absolute left-full ml-2 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-slate-700", children: hotspot.title }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 299,
          columnNumber: 11
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 287,
      columnNumber: 9
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
    lineNumber: 286,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
    lineNumber: 285,
    columnNumber: 5
  }, this);
}
export const VirtualClinicTour = () => {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0]);
  const [lightMode, setLightMode] = useState("day");
  const [cameraPreset, setCameraPreset] = useState([0, 2.2, 4.2]);
  const [autoRotate, setAutoRotate] = useState(true);
  const setPresetView = (preset) => {
    setAutoRotate(false);
    if (preset === "main") {
      setCameraPreset([0, 2.2, 4.2]);
      setActiveHotspot(null);
    } else if (preset === "laser") {
      setCameraPreset([-1.8, 1.8, 0.8]);
      setActiveHotspot(HOTSPOTS[0]);
    } else if (preset === "chair") {
      setCameraPreset([1.5, 1.8, 1.2]);
      setActiveHotspot(HOTSPOTS[1]);
    } else if (preset === "desk") {
      setCameraPreset([-0.2, 1.8, -1]);
      setActiveHotspot(HOTSPOTS[2]);
    }
  };
  return /* @__PURE__ */ jsxDEV("section", { className: "py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto", id: "spacer-3d", children: /* @__PURE__ */ jsxDEV("div", { className: "rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden relative text-slate-900", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-semibold uppercase tracking-wider mb-2", children: [
          /* @__PURE__ */ jsxDEV(Compass, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 339,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Interaktywny Spacer 3D Po Gabinecie CML" }, void 0, false, {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 340,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 338,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "font-serif text-2xl sm:text-3xl font-bold text-slate-900", children: "Wirtualna Wizyta w Gabinecie Laserowym Dr. Jana Bujoka" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 342,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-600 font-normal mt-1", children: "Przekonaj się osobiście, w jak nowoczesnych i komfortowych warunkach przeprowadzamy bezbolesne zabiegi LHP®, FiLaC® i SiLaC®." }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 345,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 337,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setPresetView("main"),
            className: "px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-purple-400 text-slate-700 hover:text-purple-700 text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxDEV(RotateCcw, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 356,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pełny Widok" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 357,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 352,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setPresetView("laser"),
            className: "px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-purple-400 text-slate-700 hover:text-purple-700 text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 363,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Laser LHP®" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 364,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 359,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setPresetView("chair"),
            className: "px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-purple-400 text-slate-700 hover:text-purple-700 text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-purple-600" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 370,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Fotel Zabiegowy" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 371,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 366,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 351,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 336,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "h-[480px] sm:h-[540px] w-full relative bg-gradient-to-b from-slate-100 to-slate-200", children: [
      /* @__PURE__ */ jsxDEV(Canvas, { children: [
        /* @__PURE__ */ jsxDEV(PerspectiveCamera, { makeDefault: true, position: cameraPreset, fov: 50 }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 379,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          OrbitControls,
          {
            enablePan: true,
            enableZoom: true,
            maxPolarAngle: Math.PI / 2 - 0.05,
            minDistance: 1.8,
            maxDistance: 6.5,
            autoRotate,
            autoRotateSpeed: 0.8
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 380,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("ambientLight", { intensity: lightMode === "day" ? 0.9 : lightMode === "surgical" ? 1.2 : 0.3 }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 391,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "directionalLight",
          {
            position: [4, 5, 3],
            intensity: lightMode === "day" ? 1.2 : 0.4,
            castShadow: true
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 392,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("pointLight", { position: [-2, 3, 2], intensity: 0.6, color: "#e0e7ff" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 397,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(RoomEnvironment, { lightMode }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 400,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(LaserUnitMesh, { onSelect: () => setActiveHotspot(HOTSPOTS[0]) }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 403,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(ExaminationChairMesh, { onSelect: () => setActiveHotspot(HOTSPOTS[1]) }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 404,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(DoctorDeskMesh, { onSelect: () => setActiveHotspot(HOTSPOTS[2]) }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 405,
          columnNumber: 13
        }, this),
        HOTSPOTS.map((hotspot) => /* @__PURE__ */ jsxDEV(
          HotspotPin,
          {
            hotspot,
            isSelected: activeHotspot?.id === hotspot.id,
            onClick: () => setActiveHotspot(hotspot)
          },
          hotspot.id,
          false,
          {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 409,
            columnNumber: 15
          },
          this
        ))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 378,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-4 left-4 z-10 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-white/90 backdrop-blur-md border border-slate-200/80 p-1.5 rounded-2xl shadow-lg flex items-center gap-1 text-xs", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setLightMode("day"),
              className: `p-2 rounded-xl transition-all ${lightMode === "day" ? "bg-purple-600 text-white font-bold" : "text-slate-600 hover:text-slate-900"}`,
              title: "Światło Dienne",
              children: /* @__PURE__ */ jsxDEV(Sun, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 428,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
              lineNumber: 421,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setLightMode("surgical"),
              className: `p-2 rounded-xl transition-all ${lightMode === "surgical" ? "bg-purple-600 text-white font-bold" : "text-slate-600 hover:text-slate-900"}`,
              title: "Tryb Zabiegowy Bezcieniowy",
              children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 437,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
              lineNumber: 430,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setLightMode("night"),
              className: `p-2 rounded-xl transition-all ${lightMode === "night" ? "bg-purple-600 text-white font-bold" : "text-slate-600 hover:text-slate-900"}`,
              title: "Światło Kameralne",
              children: /* @__PURE__ */ jsxDEV(Moon, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 446,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
              lineNumber: 439,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 420,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setAutoRotate(!autoRotate),
            className: `px-3 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-semibold shadow-lg transition-all flex items-center gap-1.5 ${autoRotate ? "text-purple-700 border-purple-300" : "text-slate-600"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Compass, { className: `w-3.5 h-3.5 ${autoRotate ? "animate-spin" : ""}` }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 456,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: autoRotate ? "Obrót Włączony" : "Pauza Obrrotu" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 457,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
            lineNumber: 450,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 419,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900/85 backdrop-blur-md text-white text-[11px] px-4 py-2 rounded-full shadow-xl border border-slate-700 flex items-center gap-2 pointer-events-none", children: [
        /* @__PURE__ */ jsxDEV(Eye, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 463,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Użyj myszki lub dotyku, aby przybliżać i obracać widok 3D. Klikaj fioletowe punkty." }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 464,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 462,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(AnimatePresence, { children: activeHotspot && /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0, y: 20, scale: 0.95 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: 20, scale: 0.95 },
          className: "absolute bottom-4 right-4 z-20 w-80 sm:w-96 bg-white border border-purple-200 rounded-2xl shadow-2xl p-5 text-slate-900",
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wide", children: activeHotspot.badge }, void 0, false, {
                  fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                  lineNumber: 478,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("h4", { className: "font-serif text-lg font-bold text-slate-900 mt-1", children: activeHotspot.title }, void 0, false, {
                  fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                  lineNumber: 481,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-purple-700 font-medium", children: activeHotspot.subtitle }, void 0, false, {
                  fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                  lineNumber: 482,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 477,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setActiveHotspot(null),
                  className: "p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100",
                  children: /* @__PURE__ */ jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                    lineNumber: 488,
                    columnNumber: 21
                  }, this)
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                  lineNumber: 484,
                  columnNumber: 19
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
              lineNumber: 476,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-600 leading-relaxed mb-3", children: activeHotspot.description }, void 0, false, {
              fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
              lineNumber: 492,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 pt-2 border-t border-slate-100", children: activeHotspot.highlights.map((item, idx) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[11px] text-slate-700", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-600 shrink-0" }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 497,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: item }, void 0, false, {
                fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
                lineNumber: 498,
                columnNumber: 23
              }, this)
            ] }, idx, true, {
              fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
              lineNumber: 496,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
              lineNumber: 494,
              columnNumber: 17
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 470,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 468,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 377,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium", children: [
        /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-purple-600 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 510,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Diody Biolitec® 1470 nm" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 511,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 509,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium", children: [
        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-teal-600 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 514,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Sterylne Pakiety Zabiegowe" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 515,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 513,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium", children: [
        /* @__PURE__ */ jsxDEV(Award, { className: "w-4 h-4 text-amber-600 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 518,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Certyfikat Dr. Jan Bujok" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 519,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 517,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 font-medium", children: [
        /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-indigo-600 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 522,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Bezbolesna Wideo-Anoskopia" }, void 0, false, {
          fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
          lineNumber: 523,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
        lineNumber: 521,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
      lineNumber: 508,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
    lineNumber: 334,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/VirtualClinicTour.tsx",
    lineNumber: 333,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpcnR1YWxDbGluaWNUb3VyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZVJlZiwgU3VzcGVuc2UgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBDYW52YXMsIHVzZUZyYW1lIH0gZnJvbSAnQHJlYWN0LXRocmVlL2ZpYmVyJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMsIEh0bWwsIEZsb2F0LCBQZXJzcGVjdGl2ZUNhbWVyYSwgVGV4dCB9IGZyb20gJ0ByZWFjdC10aHJlZS9kcmVpJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7XG4gIENvbXBhc3MsXG4gIE1heGltaXplMixcbiAgUm90YXRlQ2N3LFxuICBaYXAsXG4gIFNoaWVsZENoZWNrLFxuICBFeWUsXG4gIEluZm8sXG4gIFNwYXJrbGVzLFxuICBBd2FyZCxcbiAgQ2hldnJvblJpZ2h0LFxuICBTdW4sXG4gIE1vb24sXG4gIEFjdGl2aXR5LFxuICBDaGVja0NpcmNsZTIsXG4gIFgsXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ21vdGlvbi9yZWFjdCc7XG5cbi8vIEhvdHNwb3QgSW50ZXJmYWNlXG5pbnRlcmZhY2UgSG90c3BvdEluZm8ge1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBzdWJ0aXRsZTogc3RyaW5nO1xuICBwb3NpdGlvbjogW251bWJlciwgbnVtYmVyLCBudW1iZXJdO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBiYWRnZTogc3RyaW5nO1xuICBoaWdobGlnaHRzOiBzdHJpbmdbXTtcbn1cblxuY29uc3QgSE9UU1BPVFM6IEhvdHNwb3RJbmZvW10gPSBbXG4gIHtcbiAgICBpZDogJ2xhc2VyJyxcbiAgICB0aXRsZTogJ1N0YWNqYSBMYXNlcm93YSBCaW9saXRlY8KuIExIUMKuL0ZpTGFDwq4nLFxuICAgIHN1YnRpdGxlOiAnTmllbWllY2tpIERpb2Rvd3kgTGFzZXIgTWVkeWN6bnkgMTQ3MCBubScsXG4gICAgcG9zaXRpb246IFstMS44LCAxLjMsIC0xLjJdLFxuICAgIGRlc2NyaXB0aW9uOiAnTmFqbm93b2N6ZcWbbmllanN6eSBnZW5lcmF0b3IgbGFzZXJvd3kgd3l6d2FsYWrEhWN5IGVsYXN0eWN6bsSFIGZhbMSZIMWbd2lhdMWCb3dvZG93xIUuIFBvendhbGEgbmEgYmV6a3J3YXdlIHphbWtuacSZY2llIG5hY3p5xYQgaSBwcnpldG9rIHogbWlrcm9ub3fEhSBwcmVjeXpqxIUuJyxcbiAgICBiYWRnZTogJ1NwcnrEmXQgR8WCw7N3bnknLFxuICAgIGhpZ2hsaWdodHM6IFsnR3dhcmFuY2phIG9zemN6xJlkemVuaWEgendpZXJhY3p5JywgJ0JyYWsgcmFuIGkgc3p3w7N3JywgJ8Wad2lhdMWCb3fDs2QgcmFkaWFsbnkgMzYwwrAnXSxcbiAgfSxcbiAge1xuICAgIGlkOiAnY2hhaXInLFxuICAgIHRpdGxlOiAnRXJnb25vbWljem55IEZvdGVsIFphYmllZ293eScsXG4gICAgc3VidGl0bGU6ICdXIHBlxYJuaSByZWd1bG93YW55IGZvdGVsIHByb2t0b2xvZ2ljem55JyxcbiAgICBwb3NpdGlvbjogWzEuMiwgMS4xLCAtMC41XSxcbiAgICBkZXNjcmlwdGlvbjogJ1NwZWNqYWxpc3R5Y3pueSBmb3RlbCB6IGVsZWt0cnljem7EhSByZWd1bGFjasSFIHBvenljamkgZ2luZWtvbG9naWN6bm8tcHJva3RvbG9naWN6bmVqLiBaYXBld25pYSBwZcWCZW4gZHlza3JldG55IGtvbWZvcnQgcGFjamVudGEgcG9kY3phcyBiYWRhbmlhIGkgemFiaWVndS4nLFxuICAgIGJhZGdlOiAnS29tZm9ydCBQYWNqZW50YScsXG4gICAgaGlnaGxpZ2h0czogWydBc2VwdHljem5lIHBva3J5Y2llIGh5YnJ5ZG93ZScsICdTenlia2Egem1pYW5hIHBvenljamknLCAnT8Wbd2lldGxlbmllIGJlemNpZW5pb3dlJ10sXG4gIH0sXG4gIHtcbiAgICBpZDogJ2Fub3Njb3B5JyxcbiAgICB0aXRsZTogJ1dpZGVvLUFub3Nrb3AgRGlhZ25vc3R5Y3pueSBIRCcsXG4gICAgc3VidGl0bGU6ICdTeXN0ZW0gb2JyYXpvd2FuaWEgdGthbmVrIHcgd3lzb2tpZWogcm96ZHppZWxjem/Fm2NpJyxcbiAgICBwb3NpdGlvbjogWy0wLjIsIDEuNCwgLTIuNl0sXG4gICAgZGVzY3JpcHRpb246ICdLYW1lcmEga2xpbmljem5hIHVtb8W8bGl3aWFqxIVjYSBwYWNqZW50b3dpIG9wY2pvbmFsbmUgem9iYWN6ZW5pZSBzdG9wbmlhIHphYXdhbnNvd2FuaWEgZ3V6a8OzdyBsdWIgcHJ6ZXRva2kgbmEgxbx5d28gcHJ6ZWQgcG9kasSZY2llbSBkZWN5emppIG8gbGVjemVuaXUuJyxcbiAgICBiYWRnZTogJ0RpYWdub3N0eWthIEhEJyxcbiAgICBoaWdobGlnaHRzOiBbJ1Bvd2nEmWtzemVuaWUgMzB4JywgJ1JlamVzdHJhY2phIGN5ZnJvd2EnLCAnQmV6Ym9sZXNueSBrYW5pdWxvd2FueSB3emllcm5payddLFxuICB9LFxuICB7XG4gICAgaWQ6ICdzdGVyaWxpemF0aW9uJyxcbiAgICB0aXRsZTogJ1N0cmVmYSBBc2VwdHljem5hICYgQXV0b2tsYXcgS2xhc3kgQicsXG4gICAgc3VidGl0bGU6ICdOYWp3ecW8c3p5IHN0YW5kYXJkIGhpZ2llbnkgY2hpcnVyZ2ljem5laicsXG4gICAgcG9zaXRpb246IFsyLjMsIDEuNSwgLTIuNF0sXG4gICAgZGVzY3JpcHRpb246ICdSeWdvcnlzdHljem5lIHByemVzdHJ6ZWdhbmllIHN0YW5kYXJkw7N3IHN0ZXJ5bGl6YWNqaSBuYXJ6xJlkemkgaSDFm3dpYXTFgm93b2TDs3cgamVkbm9yYXpvd2VnbyB1xbx5dGt1LiBCZXpwaWVjemXFhHN0d28gYmlvbG9naWN6bmUgbmEgcG96aW9taWUgYmxva3Ugb3BlcmFjeWpuZWdvLicsXG4gICAgYmFkZ2U6ICdCZXpwaWVjemXFhHN0d28nLFxuICAgIGhpZ2hsaWdodHM6IFsnQXV0b2tsYXcgbWVkeWN6bnkgRXVyb2tsYXYnLCAnTmFyesSZZHppYSBqZWRub3Jhem93ZWdvIHXFvHl0a3UnLCAnRGV6eW5mZWtjamEgVVYtQyddLFxuICB9LFxuXTtcblxuLy8gLS0tIDNEIFJPT00gQ09NUE9ORU5UUyAtLS1cblxuLy8gMS4gQmlvbGl0ZWMgTGFzZXIgVW5pdFxuZnVuY3Rpb24gTGFzZXJVbml0TWVzaCh7IG9uU2VsZWN0IH06IHsgb25TZWxlY3Q6ICgpID0+IHZvaWQgfSkge1xuICBjb25zdCBsYXNlclJlZiA9IHVzZVJlZjxUSFJFRS5Hcm91cD4obnVsbCk7XG5cbiAgdXNlRnJhbWUoKHN0YXRlKSA9PiB7XG4gICAgaWYgKGxhc2VyUmVmLmN1cnJlbnQpIHtcbiAgICAgIC8vIHN1YnRsZSBwdWxzaW5nIGxpZ2h0IGVmZmVjdFxuICAgICAgY29uc3QgdCA9IHN0YXRlLmNsb2NrLmdldEVsYXBzZWRUaW1lKCk7XG4gICAgICBsYXNlclJlZi5jdXJyZW50LnBvc2l0aW9uLnkgPSAwICsgTWF0aC5zaW4odCAqIDIpICogMC4wMTU7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxncm91cCByZWY9e2xhc2VyUmVmfSBwb3NpdGlvbj17Wy0xLjgsIDAsIC0xLjJdfSBvbkNsaWNrPXtvblNlbGVjdH0+XG4gICAgICB7LyogVHJvbGxleSBiYXNlICovfVxuICAgICAgPG1lc2ggcG9zaXRpb249e1swLCAwLjQsIDBdfT5cbiAgICAgICAgPGJveEdlb21ldHJ5IGFyZ3M9e1swLjYsIDAuNywgMC41XX0gLz5cbiAgICAgICAgPG1lc2hTdGFuZGFyZE1hdGVyaWFsIGNvbG9yPVwiI2Y4ZmFmY1wiIHJvdWdobmVzcz17MC4yfSBtZXRhbG5lc3M9ezAuMX0gLz5cbiAgICAgIDwvbWVzaD5cbiAgICAgIHsvKiBXaGVlbHMgKi99XG4gICAgICB7Wy0wLjI1LCAwLjI1XS5tYXAoKHgsIGkpID0+XG4gICAgICAgIFstMC4yLCAwLjJdLm1hcCgoeiwgaikgPT4gKFxuICAgICAgICAgIDxtZXNoIGtleT17YCR7aX0tJHtqfWB9IHBvc2l0aW9uPXtbeCwgMC4wNiwgel19IHJvdGF0aW9uPXtbTWF0aC5QSSAvIDIsIDAsIDBdfT5cbiAgICAgICAgICAgIDxjeWxpbmRlckdlb21ldHJ5IGFyZ3M9e1swLjA2LCAwLjA2LCAwLjA1LCAxNl19IC8+XG4gICAgICAgICAgICA8bWVzaFN0YW5kYXJkTWF0ZXJpYWwgY29sb3I9XCIjMzM0MTU1XCIgLz5cbiAgICAgICAgICA8L21lc2g+XG4gICAgICAgICkpXG4gICAgICApfVxuICAgICAgey8qIE1haW4gTGFzZXIgQ29uc29sZSAqL31cbiAgICAgIDxtZXNoIHBvc2l0aW9uPXtbMCwgMC45LCAwXX0+XG4gICAgICAgIDxib3hHZW9tZXRyeSBhcmdzPXtbMC41LCAwLjMsIDAuNF19IC8+XG4gICAgICAgIDxtZXNoU3RhbmRhcmRNYXRlcmlhbCBjb2xvcj1cIiMwZjE3MmFcIiByb3VnaG5lc3M9ezAuM30gbWV0YWxuZXNzPXswLjh9IC8+XG4gICAgICA8L21lc2g+XG4gICAgICB7LyogR2xvd2luZyBTY3JlZW4gKi99XG4gICAgICA8bWVzaCBwb3NpdGlvbj17WzAsIDAuOTIsIDAuMjFdfSByb3RhdGlvbj17Wy0wLjIsIDAsIDBdfT5cbiAgICAgICAgPHBsYW5lR2VvbWV0cnkgYXJncz17WzAuMzgsIDAuMjJdfSAvPlxuICAgICAgICA8bWVzaEJhc2ljTWF0ZXJpYWwgY29sb3I9XCIjMzhiZGY4XCIgLz5cbiAgICAgIDwvbWVzaD5cbiAgICAgIHsvKiBMYXNlciBGaWJlciBTdGFuZCAmIEdsb3dpbmcgQ2FibGUgKi99XG4gICAgICA8bWVzaCBwb3NpdGlvbj17WzAuMjIsIDEuMTUsIDBdfT5cbiAgICAgICAgPGN5bGluZGVyR2VvbWV0cnkgYXJncz17WzAuMDE1LCAwLjAxNSwgMC41LCAxNl19IC8+XG4gICAgICAgIDxtZXNoU3RhbmRhcmRNYXRlcmlhbCBjb2xvcj1cIiNhODU1ZjdcIiBtZXRhbG5lc3M9ezAuOX0gLz5cbiAgICAgIDwvbWVzaD5cbiAgICAgIHsvKiBGaWJlciB0aXAgbGlnaHQgKi99XG4gICAgICA8cG9pbnRMaWdodCBwb3NpdGlvbj17WzAuMjIsIDEuNCwgMF19IGNvbG9yPVwiI2E4NTVmN1wiIGludGVuc2l0eT17Mn0gZGlzdGFuY2U9ezEuNX0gLz5cbiAgICAgIHsvKiBHbG93aW5nIEZpYmVyIFRpcCAqL31cbiAgICAgIDxtZXNoIHBvc2l0aW9uPXtbMC4yMiwgMS40LCAwXX0+XG4gICAgICAgIDxzcGhlcmVHZW9tZXRyeSBhcmdzPXtbMC4wMywgMTYsIDE2XX0gLz5cbiAgICAgICAgPG1lc2hCYXNpY01hdGVyaWFsIGNvbG9yPVwiI2Q4YjRmZVwiIC8+XG4gICAgICA8L21lc2g+XG4gICAgPC9ncm91cD5cbiAgKTtcbn1cblxuLy8gMi4gUHJvY3RvbG9neSBFeGFtaW5hdGlvbiBDaGFpclxuZnVuY3Rpb24gRXhhbWluYXRpb25DaGFpck1lc2goeyBvblNlbGVjdCB9OiB7IG9uU2VsZWN0OiAoKSA9PiB2b2lkIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8Z3JvdXAgcG9zaXRpb249e1sxLjIsIDAsIC0wLjVdfSByb3RhdGlvbj17WzAsIC1NYXRoLlBJIC8gNiwgMF19IG9uQ2xpY2s9e29uU2VsZWN0fT5cbiAgICAgIHsvKiBIeWRyYXVsaWMgQmFzZSAqL31cbiAgICAgIDxtZXNoIHBvc2l0aW9uPXtbMCwgMC4xNSwgMF19PlxuICAgICAgICA8Y3lsaW5kZXJHZW9tZXRyeSBhcmdzPXtbMC40LCAwLjQ1LCAwLjMsIDMyXX0gLz5cbiAgICAgICAgPG1lc2hTdGFuZGFyZE1hdGVyaWFsIGNvbG9yPVwiIzY0NzQ4YlwiIG1ldGFsbmVzcz17MC44fSByb3VnaG5lc3M9ezAuMn0gLz5cbiAgICAgIDwvbWVzaD5cbiAgICAgIHsvKiBNYWluIENvbHVtbiAqL31cbiAgICAgIDxtZXNoIHBvc2l0aW9uPXtbMCwgMC40NSwgMF19PlxuICAgICAgICA8Y3lsaW5kZXJHZW9tZXRyeSBhcmdzPXtbMC4xMiwgMC4xMiwgMC4zLCAzMl19IC8+XG4gICAgICAgIDxtZXNoU3RhbmRhcmRNYXRlcmlhbCBjb2xvcj1cIiM5NGEzYjhcIiBtZXRhbG5lc3M9ezAuOX0gLz5cbiAgICAgIDwvbWVzaD5cbiAgICAgIHsvKiBTZWF0IEN1c2hpb24gKi99XG4gICAgICA8bWVzaCBwb3NpdGlvbj17WzAsIDAuNywgMF19PlxuICAgICAgICA8Ym94R2VvbWV0cnkgYXJncz17WzAuOCwgMC4xMiwgMC43XX0gLz5cbiAgICAgICAgPG1lc2hTdGFuZGFyZE1hdGVyaWFsIGNvbG9yPVwiIzdlMjJjZVwiIHJvdWdobmVzcz17MC40fSAvPlxuICAgICAgPC9tZXNoPlxuICAgICAgey8qIEJhY2tyZXN0IGFuZ2xlZCAqL31cbiAgICAgIDxtZXNoIHBvc2l0aW9uPXtbMCwgMS4wNSwgLTAuM119IHJvdGF0aW9uPXtbMC4zLCAwLCAwXX0+XG4gICAgICAgIDxib3hHZW9tZXRyeSBhcmdzPXtbMC43NSwgMC43LCAwLjFdfSAvPlxuICAgICAgICA8bWVzaFN0YW5kYXJkTWF0ZXJpYWwgY29sb3I9XCIjNmIyMWE4XCIgcm91Z2huZXNzPXswLjR9IC8+XG4gICAgICA8L21lc2g+XG4gICAgICB7LyogTGVnIFJlc3RzICovfVxuICAgICAgPG1lc2ggcG9zaXRpb249e1stMC4yNSwgMC41NSwgMC40XX0gcm90YXRpb249e1stMC4yLCAwLCAwXX0+XG4gICAgICAgIDxib3hHZW9tZXRyeSBhcmdzPXtbMC4yMiwgMC40LCAwLjFdfSAvPlxuICAgICAgICA8bWVzaFN0YW5kYXJkTWF0ZXJpYWwgY29sb3I9XCIjN2UyMmNlXCIgcm91Z2huZXNzPXswLjR9IC8+XG4gICAgICA8L21lc2g+XG4gICAgICA8bWVzaCBwb3NpdGlvbj17WzAuMjUsIDAuNTUsIDAuNF19IHJvdGF0aW9uPXtbLTAuMiwgMCwgMF19PlxuICAgICAgICA8Ym94R2VvbWV0cnkgYXJncz17WzAuMjIsIDAuNCwgMC4xXX0gLz5cbiAgICAgICAgPG1lc2hTdGFuZGFyZE1hdGVyaWFsIGNvbG9yPVwiIzdlMjJjZVwiIHJvdWdobmVzcz17MC40fSAvPlxuICAgICAgPC9tZXNoPlxuICAgIDwvZ3JvdXA+XG4gICk7XG59XG5cbi8vIDMuIERvY3RvcidzIERlc2sgJiBEaWFnbm9zdGljIFN0YXRpb25cbmZ1bmN0aW9uIERvY3RvckRlc2tNZXNoKHsgb25TZWxlY3QgfTogeyBvblNlbGVjdDogKCkgPT4gdm9pZCB9KSB7XG4gIHJldHVybiAoXG4gICAgPGdyb3VwIHBvc2l0aW9uPXtbLTAuMiwgMCwgLTIuNl19IG9uQ2xpY2s9e29uU2VsZWN0fT5cbiAgICAgIHsvKiBUYWJsZSBUb3AgKi99XG4gICAgICA8bWVzaCBwb3NpdGlvbj17WzAsIDAuNzUsIDBdfT5cbiAgICAgICAgPGJveEdlb21ldHJ5IGFyZ3M9e1sxLjYsIDAuMDYsIDAuOF19IC8+XG4gICAgICAgIDxtZXNoU3RhbmRhcmRNYXRlcmlhbCBjb2xvcj1cIiNlMmU4ZjBcIiByb3VnaG5lc3M9ezAuM30gLz5cbiAgICAgIDwvbWVzaD5cbiAgICAgIHsvKiBNZXRhbCBMZWdzICovfVxuICAgICAge1stMC43LCAwLjddLm1hcCgoeCwgaSkgPT5cbiAgICAgICAgWy0wLjMsIDAuM10ubWFwKCh6LCBqKSA9PiAoXG4gICAgICAgICAgPG1lc2gga2V5PXtgbGVnLSR7aX0tJHtqfWB9IHBvc2l0aW9uPXtbeCwgMC4zNzUsIHpdfT5cbiAgICAgICAgICAgIDxjeWxpbmRlckdlb21ldHJ5IGFyZ3M9e1swLjAyNSwgMC4wMjUsIDAuNzUsIDE2XX0gLz5cbiAgICAgICAgICAgIDxtZXNoU3RhbmRhcmRNYXRlcmlhbCBjb2xvcj1cIiM0NzU1NjlcIiBtZXRhbG5lc3M9ezAuOH0gLz5cbiAgICAgICAgICA8L21lc2g+XG4gICAgICAgICkpXG4gICAgICApfVxuICAgICAgey8qIE1lZGljYWwgTGFwdG9wIC8gRGlhZ25vc3RpYyBNb25pdG9yICovfVxuICAgICAgPG1lc2ggcG9zaXRpb249e1stMC4zLCAwLjgyLCAwXX0+XG4gICAgICAgIDxib3hHZW9tZXRyeSBhcmdzPXtbMC4zOCwgMC4wMiwgMC4yOF19IC8+XG4gICAgICAgIDxtZXNoU3RhbmRhcmRNYXRlcmlhbCBjb2xvcj1cIiMxZTI5M2JcIiAvPlxuICAgICAgPC9tZXNoPlxuICAgICAgPG1lc2ggcG9zaXRpb249e1stMC4zLCAwLjk2LCAtMC4xMl19IHJvdGF0aW9uPXtbLTAuMiwgMCwgMF19PlxuICAgICAgICA8Ym94R2VvbWV0cnkgYXJncz17WzAuMzgsIDAuMjYsIDAuMDJdfSAvPlxuICAgICAgICA8bWVzaFN0YW5kYXJkTWF0ZXJpYWwgY29sb3I9XCIjMDI4NGM3XCIgLz5cbiAgICAgIDwvbWVzaD5cbiAgICAgIHsvKiBBbm9zY29weSBEaXNwbGF5IE1vbml0b3IgKi99XG4gICAgICA8bWVzaCBwb3NpdGlvbj17WzAuMywgMS4xNSwgLTAuMV19PlxuICAgICAgICA8Ym94R2VvbWV0cnkgYXJncz17WzAuNSwgMC4zNSwgMC4wM119IC8+XG4gICAgICAgIDxtZXNoU3RhbmRhcmRNYXRlcmlhbCBjb2xvcj1cIiMwZjE3MmFcIiAvPlxuICAgICAgPC9tZXNoPlxuICAgICAgPG1lc2ggcG9zaXRpb249e1swLjMsIDEuMTUsIC0wLjA4XX0+XG4gICAgICAgIDxwbGFuZUdlb21ldHJ5IGFyZ3M9e1swLjQ2LCAwLjMxXX0gLz5cbiAgICAgICAgPG1lc2hCYXNpY01hdGVyaWFsIGNvbG9yPVwiIzM4YmRmOFwiIC8+XG4gICAgICA8L21lc2g+XG4gICAgICA8bWVzaCBwb3NpdGlvbj17WzAuMywgMC44NSwgLTAuMV19PlxuICAgICAgICA8Y3lsaW5kZXJHZW9tZXRyeSBhcmdzPXtbMC4wMywgMC4wOCwgMC4yNSwgMTZdfSAvPlxuICAgICAgICA8bWVzaFN0YW5kYXJkTWF0ZXJpYWwgY29sb3I9XCIjNjQ3NDhiXCIgbWV0YWxuZXNzPXswLjl9IC8+XG4gICAgICA8L21lc2g+XG4gICAgPC9ncm91cD5cbiAgKTtcbn1cblxuLy8gNC4gQ2FiaW5ldCBXYWxscywgRmxvb3IgJiBPdmVyaGVhZCBTdXJnaWNhbCBMYW1wXG5mdW5jdGlvbiBSb29tRW52aXJvbm1lbnQoeyBsaWdodE1vZGUgfTogeyBsaWdodE1vZGU6ICdkYXknIHwgJ25pZ2h0JyB8ICdzdXJnaWNhbCcgfSkge1xuICByZXR1cm4gKFxuICAgIDxncm91cD5cbiAgICAgIHsvKiBGbG9vciAqL31cbiAgICAgIDxtZXNoIHBvc2l0aW9uPXtbMCwgMCwgMF19IHJvdGF0aW9uPXtbLU1hdGguUEkgLyAyLCAwLCAwXX0+XG4gICAgICAgIDxwbGFuZUdlb21ldHJ5IGFyZ3M9e1s3LCA3XX0gLz5cbiAgICAgICAgPG1lc2hTdGFuZGFyZE1hdGVyaWFsIGNvbG9yPVwiI2YxZjVmOVwiIHJvdWdobmVzcz17MC4xNX0gbWV0YWxuZXNzPXswLjA1fSAvPlxuICAgICAgPC9tZXNoPlxuXG4gICAgICB7LyogQmFjayBXYWxsICovfVxuICAgICAgPG1lc2ggcG9zaXRpb249e1swLCAyLCAtMy4yXX0+XG4gICAgICAgIDxwbGFuZUdlb21ldHJ5IGFyZ3M9e1s3LCA0XX0gLz5cbiAgICAgICAgPG1lc2hTdGFuZGFyZE1hdGVyaWFsIGNvbG9yPVwiI2Y4ZmFmY1wiIHJvdWdobmVzcz17MC40fSAvPlxuICAgICAgPC9tZXNoPlxuXG4gICAgICB7LyogTGVmdCBXYWxsICovfVxuICAgICAgPG1lc2ggcG9zaXRpb249e1stMy4yLCAyLCAwXX0gcm90YXRpb249e1swLCBNYXRoLlBJIC8gMiwgMF19PlxuICAgICAgICA8cGxhbmVHZW9tZXRyeSBhcmdzPXtbNywgNF19IC8+XG4gICAgICAgIDxtZXNoU3RhbmRhcmRNYXRlcmlhbCBjb2xvcj1cIiNmOGZhZmNcIiByb3VnaG5lc3M9ezAuNH0gLz5cbiAgICAgIDwvbWVzaD5cblxuICAgICAgey8qIFJpZ2h0IEdsYXNzIFdpbmRvdyBXYWxsICovfVxuICAgICAgPG1lc2ggcG9zaXRpb249e1szLjIsIDIsIDBdfSByb3RhdGlvbj17WzAsIC1NYXRoLlBJIC8gMiwgMF19PlxuICAgICAgICA8cGxhbmVHZW9tZXRyeSBhcmdzPXtbNywgNF19IC8+XG4gICAgICAgIDxtZXNoUGh5c2ljYWxNYXRlcmlhbCBjb2xvcj1cIiNlMmU4ZjBcIiB0cmFuc21pc3Npb249ezAuNn0gb3BhY2l0eT17MC44fSB0cmFuc3BhcmVudCByb3VnaG5lc3M9ezAuMX0gLz5cbiAgICAgIDwvbWVzaD5cblxuICAgICAgey8qIENNTCBMb2dvIFBhbmVsIG9uIEJhY2sgV2FsbCAqL31cbiAgICAgIDxncm91cCBwb3NpdGlvbj17WzAsIDIuNywgLTMuMThdfT5cbiAgICAgICAgPG1lc2g+XG4gICAgICAgICAgPGJveEdlb21ldHJ5IGFyZ3M9e1syLjIsIDAuNiwgMC4wNF19IC8+XG4gICAgICAgICAgPG1lc2hTdGFuZGFyZE1hdGVyaWFsIGNvbG9yPVwiI2ZmZmZmZlwiIHJvdWdobmVzcz17MC4yfSAvPlxuICAgICAgICA8L21lc2g+XG4gICAgICA8L2dyb3VwPlxuXG4gICAgICB7LyogT3ZlcmhlYWQgU3VyZ2ljYWwgTGFtcCAqL31cbiAgICAgIDxncm91cCBwb3NpdGlvbj17WzAuNSwgMy4yLCAtMC44XX0+XG4gICAgICAgIDxtZXNoPlxuICAgICAgICAgIDxjeWxpbmRlckdlb21ldHJ5IGFyZ3M9e1swLjQsIDAuNDUsIDAuMTIsIDMyXX0gLz5cbiAgICAgICAgICA8bWVzaFN0YW5kYXJkTWF0ZXJpYWwgY29sb3I9XCIjZmZmZmZmXCIgbWV0YWxuZXNzPXswLjV9IC8+XG4gICAgICAgIDwvbWVzaD5cbiAgICAgICAgPHNwb3RMaWdodFxuICAgICAgICAgIHBvc2l0aW9uPXtbMCwgLTAuMSwgMF19XG4gICAgICAgICAgYW5nbGU9ezAuNn1cbiAgICAgICAgICBwZW51bWJyYT17MC40fVxuICAgICAgICAgIGludGVuc2l0eT17bGlnaHRNb2RlID09PSAnc3VyZ2ljYWwnID8gOCA6IGxpZ2h0TW9kZSA9PT0gJ2RheScgPyA0IDogMn1cbiAgICAgICAgICBjb2xvcj17bGlnaHRNb2RlID09PSAnc3VyZ2ljYWwnID8gJyNmMGY5ZmYnIDogJyNmZmZmZmYnfVxuICAgICAgICAvPlxuICAgICAgPC9ncm91cD5cbiAgICA8L2dyb3VwPlxuICApO1xufVxuXG4vLyAzRCBIb3RzcG90IFBpbiBNYXJrZXJcbmZ1bmN0aW9uIEhvdHNwb3RQaW4oe1xuICBob3RzcG90LFxuICBpc1NlbGVjdGVkLFxuICBvbkNsaWNrLFxufToge1xuICBob3RzcG90OiBIb3RzcG90SW5mbztcbiAgaXNTZWxlY3RlZDogYm9vbGVhbjtcbiAgb25DbGljazogKCkgPT4gdm9pZDtcbn0pIHtcbiAgY29uc3QgcGluUmVmID0gdXNlUmVmPFRIUkVFLkdyb3VwPihudWxsKTtcblxuICB1c2VGcmFtZSgoc3RhdGUpID0+IHtcbiAgICBpZiAocGluUmVmLmN1cnJlbnQpIHtcbiAgICAgIGNvbnN0IHQgPSBzdGF0ZS5jbG9jay5nZXRFbGFwc2VkVGltZSgpO1xuICAgICAgcGluUmVmLmN1cnJlbnQucG9zaXRpb24ueSA9IGhvdHNwb3QucG9zaXRpb25bMV0gKyBNYXRoLnNpbih0ICogMykgKiAwLjA1O1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIChcbiAgICA8Z3JvdXAgcmVmPXtwaW5SZWZ9IHBvc2l0aW9uPXtob3RzcG90LnBvc2l0aW9ufT5cbiAgICAgIDxIdG1sIGNlbnRlciBkaXN0YW5jZUZhY3Rvcj17OH0+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIG9uQ2xpY2soKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGNsYXNzTmFtZT17YGdyb3VwIHJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMiByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwICR7XG4gICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBzY2FsZS0xMjUgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtNjAwLzUwIHJpbmctNCByaW5nLXB1cnBsZS0zMDAvNDAnXG4gICAgICAgICAgICAgIDogJ2JnLXdoaXRlLzkwIHRleHQtcHVycGxlLTcwMCBob3ZlcjpiZy1wdXJwbGUtNjAwIGhvdmVyOnRleHQtd2hpdGUgc2hhZG93LW1kIGJvcmRlciBib3JkZXItcHVycGxlLTIwMCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LWZ1bGwgbWwtMiBweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMC85MCB0ZXh0LXdoaXRlIHRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgd2hpdGVzcGFjZS1ub3dyYXAgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBwb2ludGVyLWV2ZW50cy1ub25lIHNoYWRvdy14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAge2hvdHNwb3QudGl0bGV9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvSHRtbD5cbiAgICA8L2dyb3VwPlxuICApO1xufVxuXG5leHBvcnQgY29uc3QgVmlydHVhbENsaW5pY1RvdXI6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbYWN0aXZlSG90c3BvdCwgc2V0QWN0aXZlSG90c3BvdF0gPSB1c2VTdGF0ZTxIb3RzcG90SW5mbyB8IG51bGw+KEhPVFNQT1RTWzBdKTtcbiAgY29uc3QgW2xpZ2h0TW9kZSwgc2V0TGlnaHRNb2RlXSA9IHVzZVN0YXRlPCdkYXknIHwgJ25pZ2h0JyB8ICdzdXJnaWNhbCc+KCdkYXknKTtcbiAgY29uc3QgW2NhbWVyYVByZXNldCwgc2V0Q2FtZXJhUHJlc2V0XSA9IHVzZVN0YXRlPFtudW1iZXIsIG51bWJlciwgbnVtYmVyXT4oWzAsIDIuMiwgNC4yXSk7XG4gIGNvbnN0IFthdXRvUm90YXRlLCBzZXRBdXRvUm90YXRlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuXG4gIC8vIENhbWVyYSBwcmVzZXQgaGFuZGxlclxuICBjb25zdCBzZXRQcmVzZXRWaWV3ID0gKHByZXNldDogJ21haW4nIHwgJ2xhc2VyJyB8ICdjaGFpcicgfCAnZGVzaycpID0+IHtcbiAgICBzZXRBdXRvUm90YXRlKGZhbHNlKTtcbiAgICBpZiAocHJlc2V0ID09PSAnbWFpbicpIHtcbiAgICAgIHNldENhbWVyYVByZXNldChbMCwgMi4yLCA0LjJdKTtcbiAgICAgIHNldEFjdGl2ZUhvdHNwb3QobnVsbCk7XG4gICAgfSBlbHNlIGlmIChwcmVzZXQgPT09ICdsYXNlcicpIHtcbiAgICAgIHNldENhbWVyYVByZXNldChbLTEuOCwgMS44LCAwLjhdKTtcbiAgICAgIHNldEFjdGl2ZUhvdHNwb3QoSE9UU1BPVFNbMF0pO1xuICAgIH0gZWxzZSBpZiAocHJlc2V0ID09PSAnY2hhaXInKSB7XG4gICAgICBzZXRDYW1lcmFQcmVzZXQoWzEuNSwgMS44LCAxLjJdKTtcbiAgICAgIHNldEFjdGl2ZUhvdHNwb3QoSE9UU1BPVFNbMV0pO1xuICAgIH0gZWxzZSBpZiAocHJlc2V0ID09PSAnZGVzaycpIHtcbiAgICAgIHNldENhbWVyYVByZXNldChbLTAuMiwgMS44LCAtMS4wXSk7XG4gICAgICBzZXRBY3RpdmVIb3RzcG90KEhPVFNQT1RTWzJdKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJweS0xMiBweC00IHNtOnB4LTYgbGc6cHgtOCBtYXgtdy03eGwgbXgtYXV0b1wiIGlkPVwic3BhY2VyLTNkXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQtM3hsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHNoYWRvdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIHJlbGF0aXZlIHRleHQtc2xhdGUtOTAwXCI+XG4gICAgICAgIHsvKiBUb3AgSW5mbyBCYXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHNtOnAtNiBiZy1zbGF0ZS01MCBib3JkZXItYiBib3JkZXItc2xhdGUtMjAwIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtODAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgbWItMlwiPlxuICAgICAgICAgICAgICA8Q29tcGFzcyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS02MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5JbnRlcmFrdHl3bnkgU3BhY2VyIDNEIFBvIEdhYmluZWNpZSBDTUw8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQtMnhsIHNtOnRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICBXaXJ0dWFsbmEgV2l6eXRhIHcgR2FiaW5lY2llIExhc2Vyb3d5bSBEci4gSmFuYSBCdWpva2FcbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS02MDAgZm9udC1ub3JtYWwgbXQtMVwiPlxuICAgICAgICAgICAgICBQcnpla29uYWogc2nEmSBvc29iacWbY2llLCB3IGphayBub3dvY3plc255Y2ggaSBrb21mb3J0b3d5Y2ggd2FydW5rYWNoIHByemVwcm93YWR6YW15IGJlemJvbGVzbmUgemFiaWVnaSBMSFDCriwgRmlMYUPCriBpIFNpTGFDwq4uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUXVpY2sgUHJlc2V0IEJ1dHRvbnMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UHJlc2V0VmlldygnbWFpbicpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGhvdmVyOmJvcmRlci1wdXJwbGUtNDAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOnRleHQtcHVycGxlLTcwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvbi1hbGwgc2hhZG93LXNtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Um90YXRlQ2N3IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+UGXFgm55IFdpZG9rPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFByZXNldFZpZXcoJ2xhc2VyJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgaG92ZXI6Ym9yZGVyLXB1cnBsZS00MDAgdGV4dC1zbGF0ZS03MDAgaG92ZXI6dGV4dC1wdXJwbGUtNzAwIHRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc20gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+TGFzZXIgTEhQwq48L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UHJlc2V0VmlldygnY2hhaXInKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBob3Zlcjpib3JkZXItcHVycGxlLTQwMCB0ZXh0LXNsYXRlLTcwMCBob3Zlcjp0ZXh0LXB1cnBsZS03MDAgdGV4dC14cyBmb250LXNlbWlib2xkIHRyYW5zaXRpb24tYWxsIHNoYWRvdy1zbSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTYwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkZvdGVsIFphYmllZ293eTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogM0QgQ2FudmFzIEFyZWEgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC1bNDgwcHhdIHNtOmgtWzU0MHB4XSB3LWZ1bGwgcmVsYXRpdmUgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXNsYXRlLTEwMCB0by1zbGF0ZS0yMDBcIj5cbiAgICAgICAgICA8Q2FudmFzPlxuICAgICAgICAgICAgPFBlcnNwZWN0aXZlQ2FtZXJhIG1ha2VEZWZhdWx0IHBvc2l0aW9uPXtjYW1lcmFQcmVzZXR9IGZvdj17NTB9IC8+XG4gICAgICAgICAgICA8T3JiaXRDb250cm9sc1xuICAgICAgICAgICAgICBlbmFibGVQYW49e3RydWV9XG4gICAgICAgICAgICAgIGVuYWJsZVpvb209e3RydWV9XG4gICAgICAgICAgICAgIG1heFBvbGFyQW5nbGU9e01hdGguUEkgLyAyIC0gMC4wNX1cbiAgICAgICAgICAgICAgbWluRGlzdGFuY2U9ezEuOH1cbiAgICAgICAgICAgICAgbWF4RGlzdGFuY2U9ezYuNX1cbiAgICAgICAgICAgICAgYXV0b1JvdGF0ZT17YXV0b1JvdGF0ZX1cbiAgICAgICAgICAgICAgYXV0b1JvdGF0ZVNwZWVkPXswLjh9XG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICB7LyogTGlnaHRzICovfVxuICAgICAgICAgICAgPGFtYmllbnRMaWdodCBpbnRlbnNpdHk9e2xpZ2h0TW9kZSA9PT0gJ2RheScgPyAwLjkgOiBsaWdodE1vZGUgPT09ICdzdXJnaWNhbCcgPyAxLjIgOiAwLjN9IC8+XG4gICAgICAgICAgICA8ZGlyZWN0aW9uYWxMaWdodFxuICAgICAgICAgICAgICBwb3NpdGlvbj17WzQsIDUsIDNdfVxuICAgICAgICAgICAgICBpbnRlbnNpdHk9e2xpZ2h0TW9kZSA9PT0gJ2RheScgPyAxLjIgOiAwLjR9XG4gICAgICAgICAgICAgIGNhc3RTaGFkb3dcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8cG9pbnRMaWdodCBwb3NpdGlvbj17Wy0yLCAzLCAyXX0gaW50ZW5zaXR5PXswLjZ9IGNvbG9yPVwiI2UwZTdmZlwiIC8+XG5cbiAgICAgICAgICAgIHsvKiBSb29tIE1lc2ggKi99XG4gICAgICAgICAgICA8Um9vbUVudmlyb25tZW50IGxpZ2h0TW9kZT17bGlnaHRNb2RlfSAvPlxuXG4gICAgICAgICAgICB7LyogSW50ZXJhY3RpdmUgTWVzaGVzICovfVxuICAgICAgICAgICAgPExhc2VyVW5pdE1lc2ggb25TZWxlY3Q9eygpID0+IHNldEFjdGl2ZUhvdHNwb3QoSE9UU1BPVFNbMF0pfSAvPlxuICAgICAgICAgICAgPEV4YW1pbmF0aW9uQ2hhaXJNZXNoIG9uU2VsZWN0PXsoKSA9PiBzZXRBY3RpdmVIb3RzcG90KEhPVFNQT1RTWzFdKX0gLz5cbiAgICAgICAgICAgIDxEb2N0b3JEZXNrTWVzaCBvblNlbGVjdD17KCkgPT4gc2V0QWN0aXZlSG90c3BvdChIT1RTUE9UU1syXSl9IC8+XG5cbiAgICAgICAgICAgIHsvKiAzRCBQaW5zICovfVxuICAgICAgICAgICAge0hPVFNQT1RTLm1hcCgoaG90c3BvdCkgPT4gKFxuICAgICAgICAgICAgICA8SG90c3BvdFBpblxuICAgICAgICAgICAgICAgIGtleT17aG90c3BvdC5pZH1cbiAgICAgICAgICAgICAgICBob3RzcG90PXtob3RzcG90fVxuICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWQ9e2FjdGl2ZUhvdHNwb3Q/LmlkID09PSBob3RzcG90LmlkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZUhvdHNwb3QoaG90c3BvdCl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L0NhbnZhcz5cblxuICAgICAgICAgIHsvKiBGbG9hdGluZyBDYW52YXMgT3ZlcmxheSBDb250cm9scyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC00IGxlZnQtNCB6LTEwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlLzkwIGJhY2tkcm9wLWJsdXItbWQgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAvODAgcC0xLjUgcm91bmRlZC0yeGwgc2hhZG93LWxnIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldExpZ2h0TW9kZSgnZGF5Jyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQteGwgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGxpZ2h0TW9kZSA9PT0gJ2RheScgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCLFmndpYXTFgm8gRGllbm5lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxTdW4gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TGlnaHRNb2RlKCdzdXJnaWNhbCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBsaWdodE1vZGUgPT09ICdzdXJnaWNhbCcgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJUcnliIFphYmllZ293eSBCZXpjaWVuaW93eVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0TGlnaHRNb2RlKCduaWdodCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMiByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBsaWdodE1vZGUgPT09ICduaWdodCcgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS02MDAgaG92ZXI6dGV4dC1zbGF0ZS05MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCLFmndpYXTFgm8gS2FtZXJhbG5lXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxNb29uIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEF1dG9Sb3RhdGUoIWF1dG9Sb3RhdGUpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTIgcm91bmRlZC0yeGwgYmctd2hpdGUvOTAgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICBhdXRvUm90YXRlID8gJ3RleHQtcHVycGxlLTcwMCBib3JkZXItcHVycGxlLTMwMCcgOiAndGV4dC1zbGF0ZS02MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q29tcGFzcyBjbGFzc05hbWU9e2B3LTMuNSBoLTMuNSAke2F1dG9Sb3RhdGUgPyAnYW5pbWF0ZS1zcGluJyA6ICcnfWB9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPnthdXRvUm90YXRlID8gJ09icsOzdCBXxYLEhWN6b255JyA6ICdQYXV6YSBPYnJyb3R1J308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBJbnRlcmFjdGlvbiBJbnN0cnVjdGlvbiBwaWxsICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTQgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiB6LTEwIGJnLXNsYXRlLTkwMC84NSBiYWNrZHJvcC1ibHVyLW1kIHRleHQtd2hpdGUgdGV4dC1bMTFweF0gcHgtNCBweS0yIHJvdW5kZWQtZnVsbCBzaGFkb3cteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VcW8eWogbXlzemtpIGx1YiBkb3R5a3UsIGFieSBwcnp5YmxpxbxhxIcgaSBvYnJhY2HEhyB3aWRvayAzRC4gS2xpa2FqIGZpb2xldG93ZSBwdW5rdHkuPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEFjdGl2ZSBIb3RzcG90IE1vZGFsIC8gRmxvYXRpbmcgRHJhd2VyICovfVxuICAgICAgICAgIDxBbmltYXRlUHJlc2VuY2U+XG4gICAgICAgICAgICB7YWN0aXZlSG90c3BvdCAmJiAoXG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLCB5OiAyMCwgc2NhbGU6IDAuOTUgfX1cbiAgICAgICAgICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHk6IDAsIHNjYWxlOiAxIH19XG4gICAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwLCB5OiAyMCwgc2NhbGU6IDAuOTUgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tNCByaWdodC00IHotMjAgdy04MCBzbTp3LTk2IGJnLXdoaXRlIGJvcmRlciBib3JkZXItcHVycGxlLTIwMCByb3VuZGVkLTJ4bCBzaGFkb3ctMnhsIHAtNSB0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0yIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS0xMDAgdGV4dC1wdXJwbGUtODAwIHRleHQtWzEwcHhdIGZvbnQtYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHthY3RpdmVIb3RzcG90LmJhZGdlfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXNlcmlmIHRleHQtbGcgZm9udC1ib2xkIHRleHQtc2xhdGUtOTAwIG10LTFcIj57YWN0aXZlSG90c3BvdC50aXRsZX08L2g0PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXB1cnBsZS03MDAgZm9udC1tZWRpdW1cIj57YWN0aXZlSG90c3BvdC5zdWJ0aXRsZX08L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlSG90c3BvdChudWxsKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQtbGcgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS03MDAgaG92ZXI6Ymctc2xhdGUtMTAwXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS02MDAgbGVhZGluZy1yZWxheGVkIG1iLTNcIj57YWN0aXZlSG90c3BvdC5kZXNjcmlwdGlvbn08L3A+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTEwMFwiPlxuICAgICAgICAgICAgICAgICAge2FjdGl2ZUhvdHNwb3QuaGlnaGxpZ2h0cy5tYXAoKGl0ZW0sIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTYwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2l0ZW19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQm90dG9tIEZlYXR1cmUgQmFkZ2VzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1zbGF0ZS01MCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwIGdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTMgdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcC0yLjUgcm91bmRlZC14bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTgwMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTYwMCBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5EaW9keSBCaW9saXRlY8KuIDE0NzAgbm08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwLTIuNSByb3VuZGVkLXhsIGJnLXdoaXRlIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtODAwIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXRlYWwtNjAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlN0ZXJ5bG5lIFBha2lldHkgWmFiaWVnb3dlPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcC0yLjUgcm91bmRlZC14bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTgwMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgPEF3YXJkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci02MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+Q2VydHlmaWthdCBEci4gSmFuIEJ1am9rPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcC0yLjUgcm91bmRlZC14bCBiZy13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTgwMCBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNjAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkJlemJvbGVzbmEgV2lkZW8tQW5vc2tvcGlhPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTJGUTtBQTNGUixTQUFnQixVQUFVLGNBQXdCO0FBQ2xELFNBQVMsUUFBUSxnQkFBZ0I7QUFDakMsU0FBUyxlQUFlLE1BQWEseUJBQStCO0FBRXBFO0FBQUEsRUFDRTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQUNQLFNBQVMsUUFBUSx1QkFBdUI7QUFheEMsTUFBTSxXQUEwQjtBQUFBLEVBQzlCO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixVQUFVLENBQUMsTUFBTSxLQUFLLElBQUk7QUFBQSxJQUMxQixhQUFhO0FBQUEsSUFDYixPQUFPO0FBQUEsSUFDUCxZQUFZLENBQUMsb0NBQW9DLG9CQUFvQiwwQkFBMEI7QUFBQSxFQUNqRztBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLFVBQVUsQ0FBQyxLQUFLLEtBQUssSUFBSTtBQUFBLElBQ3pCLGFBQWE7QUFBQSxJQUNiLE9BQU87QUFBQSxJQUNQLFlBQVksQ0FBQyxpQ0FBaUMseUJBQXlCLHlCQUF5QjtBQUFBLEVBQ2xHO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsVUFBVSxDQUFDLE1BQU0sS0FBSyxJQUFJO0FBQUEsSUFDMUIsYUFBYTtBQUFBLElBQ2IsT0FB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