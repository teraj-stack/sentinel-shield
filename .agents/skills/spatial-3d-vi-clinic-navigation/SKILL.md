---
name: spatial-3d-vi-clinic-navigation
description: >-
  Use this skill when designing or building websites and applications featuring 3D spatial models,
  interactive architectural digital twins, VR/AR/WebXR environments, or indoor navigation and
  wayfinding systems for blind and visually impaired (VI) patients (e.g., navigating a medical clinic
  using 3D spatial audio beacons, haptic cues, voice guidance, and accessible 3D HUD interfaces).
---

# 3D Spatial Modeling & Visually Impaired (VI) Clinic Wayfinding Skill

This skill guides the architecture, UX/UI design, and engineering of 3D spatial web/mobile applications and accessible indoor navigation systems (szczególnie dla pacjentów niewidomych i słabowidzących poruszających się po klinice lub budynku użyteczności publicznej).

## 1. Core Architectural Pillars

When building a 3D clinic model or spatial navigation app, implement two synchronized layers:

1. **Visual 3D Digital Twin Layer (WebGL / Three.js / React Three Fiber / RealityKit)**
   - **Modular Clinic Geometry**: Distinct semantic zones (Recepcja, Korytarz Główny, Gabinety Lekarskie, Winda, Schody, Toalety Dostępne, Strefa Oczekiwania) with clear tactile/visual color coding and extruded 3D floorplans.
   - **Camera Modes**:
     - *First-Person Patient POV (1st Person VI Simulation)*: Eye-level camera (`y = 1.65m`) moving smoothly along the navigation spline with obstacle proximity indicators.
     - *Isometric / Topographic 3D Overview*: Orbiting studio camera showing the entire clinic floor, active route spline, audio beacon radii, and patient position.
2. **Non-Visual Spatial Accessibility Layer (VI — Visually Impaired Engine)**
   - **Semantic Wayfinding Graph**: Nodes (doors, intersections, elevators, landmarks, tactile paving junctions) and weighted edges (distance in meters, surface type, hazard level, door type).
   - **3D Spatial Audio Beacons (HRTF)**: Every active waypoint and destination emits a distinct 3D-positioned sound using Web Audio API `PannerNode` (`panningModel = 'HRTF'`).
   - **Multi-Sensory Feedback Loop**: Combines **Spatial Audio** + **Voice Synthesis (TTS / ARIA-Live)** + **Tactile Haptics** + **High-Contrast Low-Vision HUD**.

---

## 2. Designing for Blind & Visually Impaired (VI) Patients in a Clinic

Always include the following accessibility mechanisms in any clinic navigation prototype or production app:

### A. Navigation Routing & Obstacle Safety
- **Safe-Corridor Routing (A* with Accessibility Weights)**:
  - Penalize stairs (`weight: Infinity` when elevator-only/mobility mode is active), narrow passages, or temporary obstacles.
  - Snap routes to **tactile paving paths (ścieżki naprowadzające / guzki uwagi)** and wall-handrail lines (prowadzenie wzdłuż ściany po prawej/lewej stronie).
- **Clock-Face & Metric Orientation**:
  - Give instructions in both **meters/steps** and **clock-face directions** (np. *„Idź prosto 6 metrów (ok. 8 kroków). Drzwi do Gabinetu Okulistycznego 104 znajdują się na godzinie 2”*).

### B. 3D Spatial Audio System (HRTF Sonar & Beacons)
- **Destination Beacon**: Warm harmonic ping (e.g., `528 Hz` + `792 Hz` soft sine/marimba pulse) positioned at the exact `(x, y, z)` coordinates of the target clinic room door. Repetition rate increases gently as the patient approaches (`< 2m`).
- **Path Confirmation Tick**: Subtle woody click every `1.0m` along the correct vector so the user knows they are centered in the corridor.
- **Hazard / Obstacle Warning**: Low-frequency spatial hum (`180 Hz` binaural warning) positioned at the coordinates of an obstacle, open door, or staircase edge.

### C. Haptic & Tactile Interaction Patterns
- **Directional Haptics** (`navigator.vibrate` / CoreHaptics):
  - Turn Left: `[80, 40, 180]` ms pulse.
  - Turn Right: `[180, 40, 80]` ms pulse.
  - Obstacle Ahead / Stop: `[250, 80, 250, 80, 250]` ms urgent pattern.
  - Arrived at Room Door: `[100, 60, 100, 60, 400]` ms confirmation chime.
- **Large Tactile Screen Zones (Screen-Free Gesture Mode)**:
  - Allow blind users to operate the app without looking at the screen:
    - **Single Tap anywhere**: Repeat current voice instruction + distance to next turn.
    - **Swipe Left / Right**: Cycle destination room (with instant TTS readout).
    - **Double Tap**: Start / Pause active audio-haptic guidance.
    - **Two-Finger Long Press**: Emergency Reception / Assistant Call (*Wezwij asystenta medycznego*).

### D. Low-Vision (Słabowidzący) High-Contrast & Liquid Glass Mode
- Provide a one-click toggle between:
  1. **Studio 3D Liquid Glass Mode** (aesthetic showcase with translucent HUD, topographic contours, and 3D layered icons), and
  2. **VI High-Contrast WCAG AAA Mode** (black `#05070A` background, neon yellow `#FFE600` & electric cyan `#00F5D4` pathways, minimum `24px` bold typography, and `7:1+` contrast ratio).

---

## 3. Integration with Existing Studio Apps (`~/Pictures/Apps`)

Always maintain compatibility with the user's established Three.js (`r186`) + React + Tailwind v4 architecture found in `/Users/krzysztofjarzyna/Pictures/Apps`:

1. **HoloArch AR (`HoloArchScene.tsx`, `UnifiedSpatialModelComposer.tsx`, `proceduralTextures.ts`)**:
   - **Zero-GC Render Loop**: Pre-allocate `THREE.Vector3`, `THREE.Vector2`, `THREE.Object3D`, and `THREE.Raycaster` at module scope outside `requestAnimationFrame`.
   - **Zero-404 Procedural Canvas Textures**: Generate floor grids, LiDAR scanlines, HUD panels, and tactile paving maps via HTML5 2D Canvas (`createLiDARPlaneGridTexture`, `createFloatingHudTexture`) with `PMREMGenerator` + `RoomEnvironment`.
   - **Camera Presets**: Support smooth damped transitions between `overview`, `tabletop_close` (BIM), `window_parallax` (widok z okien kliniki), and `floor_lidar` (1st-person LiDAR/VI view).
2. **Parallax3D & Clinic Window Views (`Paralexa outdoor of clinic:view in windows`, `ThreeCanvas.tsx`, `depthEstimator.ts`)**:
   - Use `Float32Array` depth maps and vertex displacement shaders to render realistic 3D parallax views looking out of clinic windows (using the 2K renders in `Paralexa outdoor of clinic:view in windows`) with motion trajectories (*Okrąg*, *Kołysanie*, *Ósemka 3D*, *Oddech*, *Myszka*) and `captureStream(30)` WebM video loop export.
3. **VortexVR Studio (`VrViewport3D.tsx`, `VisualLogicGraphEditor.tsx`, `InteractiveTutorialGuide.tsx`)**:
   - Support drag-and-drop 3D actor placement, visual node-wire trigger graphs (`WEJ ●` / `WYJ ●` — e.g., connecting a proximity sensor node to an audio beacon or door opener), interactive coachmark tutorials, and AES-256-GCM E2EE state export.
4. **Free 3D Image Converter & 6-Parameter LiDAR Clinical Diagnostic Analyzer (`cef19369-40d6-4ee3-abc9-58f2ebc219b8` — `ThreePhotogrammetryViewer.tsx`, `ClinicalDiagnosticAnalyzer.tsx`)**:
   - **Photogrammetry 3D Stage Simulator**: 8-stage SfM/MVS pipeline visualization (Camera Orbit Rig, Sparse Point Cloud, Dense Cloud, Wireframe Mesh, Textured Model) + Shoot Calculator & Software Matcher.
   - **6-Parameter 3D/LiDAR Clinical Wound & Circulatory Insufficiency Analyzer**:
     1. `colorSpectrumIndexRYB` — Kolor (Spektrum RYB: Ziarnina / Włóknik / Martwica),
     2. `lidarDepthVolumeMm` — Skan LiDAR (Głębokość ubytku w $\text{mm}$ / Objętość obrzęku w $\text{cm}^3$),
     3. `huePerfusionIndex` — Barwa i Nasycenie Tkankowe (Perfuzja obwodowa vs. sinica zastoinowa),
     4. `surfaceSmoothness` — Gładkość Powierzchni modelu 3D ($R_a$ w $\mu\text{m}$: chropowate dno owrzodzenia vs. szklista napięta skóra w obrzęku),
     5. `edgeCurvatureContraction` — Krzywizna i Kontrakcja Brzegów Ubytku,
     6. `specularMoistureIndex` — Refleksyjność i Wilgotność Powierzchni (Wysięk).
   - **Indices & Medical Export**: Computes **WHI 3D** (Indeks Gojenia Rany) and **CEI** (Indeks Zaostrzenia Niewydolności Krążenia), renders 3 WebGL modes (Model Barwny Tkanki, Mapa Głębokości LiDAR, Siatka Mikrotekstury $R_a$), 6-axis Radar Chart, longitudinal timeline, and exports UTF-8 BOM CSV / JSON medical records (`PAC-2026-0419`).
5. **Next Generation Clinic & CML (`VirtualClinicTour.tsx`, `ParallaxWindowView.tsx`, `LidarDepthHistogram.tsx`, `ThreeDHeadVisualizer.tsx`)**:
   - Combine virtual clinic tours (Proktologia • Chirurgia • Flebologia, time-of-day lighting *Świt / Dzień / Zmierzch / Noc*) and LiDAR depth histograms with the VI blind-patient spatial audio navigation system.

---

## 4. Implementation Workflow

1. **Define the Clinic Spatial Graph & 3D Scene**:
   - Use the reference implementation in [vi-spatial-audio-and-routing.md](./references/vi-spatial-audio-and-routing.md) to set up the 3D clinic floorplan, A* accessible router, HRTF `PannerNode` audio engine, and Polish/English TTS voice narrator.
2. **Apply Liquid Glass & Layered 3D UI**:
   - Pair this skill with `liquid-glass-and-3d-ui-design` so that HUD controls, room cards, and 3D security/medical badges match the tactile Liquid Glass aesthetic while maintaining large tap targets (`min 56x56px`).
3. **Validation Checklist**:
   - Verify keyboard/screen-reader navigation (`Tab`, `Space`, `Enter`, `aria-live="assertive"` announcements).
   - Verify that 3D audio panning updates continuously as the patient's position and heading (`yaw` angle) change in the 3D scene.
   - Verify WCAG 2.1 AAA compliance (zero strobe/flashing effects, `prefers-reduced-motion` support).

