# Rejestr Umiejętności Projektowych 3D / VI (Dla Niewidomych) / Liquid Glass UI oraz Zbudowanych Aplikacji

**Data trwałego zapisu na dysku (Non-Volatile SSD):** `2026-11-06 02:30 CET`  
**System:** macOS `27.0.1` (`Build 26A434`) · Apple M1 Pro (16-core GPU `G13X`, Metal 4 `382.5.3`, sterownik `AGXG13X` `360.34.5`)

---

## 1. Zapisane Ustawienia Edytora (`.vscode/settings.json`)
Plik: `/Users/krzysztofjarzyna/.gemini/antigravity/scratch/sentinel_shield/.vscode/settings.json`
```json
{
    "workbench.editor.enablePreviewFromQuickOpen": true,
    "files.autoSave": "afterDelay"
}
```

---

## 2. Zainstalowane Umiejętności Projektowe (Skills) — Lokalnie i Globalnie

1. **Nawigacja Przestrzenna 3D dla Niewidomych (VI) po Klinice & Cyfrowe Bliźniaki 3D (`spatial-3d-vi-clinic-navigation`)**
   - Lokalizacja Workspace: `.agents/skills/spatial-3d-vi-clinic-navigation/SKILL.md`
   - Lokalizacja Globalna: `~/.gemini/config/skills/spatial-3d-vi-clinic-navigation/SKILL.md`
   - Dokumentacja techniczna i kod HRTF/A*: `.agents/skills/spatial-3d-vi-clinic-navigation/references/vi-spatial-audio-and-routing.md`
   - Zakres:
     - Model 3D kliniki (WebGL / Three.js `r186` / React Three Fiber) z widokiem 1st-person POV pacjenta oraz rzutem izometrycznym.
     - Dźwięk przestrzenny 3D HRTF (`AudioContext` + `PannerNode` `HRTF`) dla latarni dźwiękowych (audio beacons) przy drzwiach gabinetów oraz ostrzeżeń przed przeszkodami i schodami.
     - Orientacja zegarowa (godziny 1–12) i metryczna/krokowa z syntezą mowy TTS PL/EN i `aria-live="assertive"`.
     - Wzorce haptyczne (`navigator.vibrate` / CoreHaptics) oraz tryb wysokiego kontrastu **WCAG 2.1 AAA** dla słabowidzących.

2. **Liquid Glass UI Kit, Spatial HUD & Wielowarstwowe Ikony/Sceny 3D (`liquid-glass-and-3d-ui-design`)**
   - Lokalizacja Workspace: `.agents/skills/liquid-glass-and-3d-ui-design/SKILL.md`
   - Lokalizacja Globalna: `~/.gemini/config/skills/liquid-glass-and-3d-ui-design/SKILL.md`
   - Receptury CSS i shadery Three.js: `.agents/skills/liquid-glass-and-3d-ui-design/references/liquid-glass-css-and-threejs-materials.md`
   - Zakres (zgodnie z 5 obrazami referencyjnymi zapisanymi w `referencje_ui_3d/`):
     - **Liquid Glass UI Kit:** kapsułowe przyciski, przełączniki i karty-teczki z potrójnym obrysem refrakcyjnym (`inset` specular highlights) i kolorową poświatą kaustyczną (`caustic drop-shadow`).
     - **Spatial HUD (*Antarctica*):** pełnoekranowe sceny 3D z wycinanym paskiem nawigacji (*liquid notch*), mapami warstwicowymi SVG i pływającymi kartami ze szkła.
     - **Sceny Hero i Warstwowe Bryły 3D (*COCO*, Tarcza 4-warstwowa, Chmura z orbitującymi wstęgami ze szkła):** materiały `THREE.MeshPhysicalMaterial` (`transmission: 0.86`, `ior: 1.46`, `thickness: 1.4`, `clearcoat: 1.0`) oraz neonowy rdzeń akcentowy (`#B8FF01`).

---

## 3. Zinwentaryzowane Narzędzia i Aplikacje Użytkownika

### A. Katalog `~/Pictures/Apps` (`/Users/krzysztofjarzyna/Pictures/Apps`)
1. **`HoloArch AR — Kreator Promptów i Symulator Unity AR-kopia.webarchive`** (`25.3 MB`)
   - Moduły: `HoloArchScene.tsx` (Zero-GC render loop, 3 klastry wysokościowców `Alpha Spire`, `Core Sync Neural Nexus`, `Orbital Twin`, stół AR z mapą świata, detekcja LiDAR), `proceduralTextures.ts` (Zero-404 HTML5 Canvas), `UnifiedSpatialModelComposer.tsx`, `PromptWorkbenchModal.tsx`, `BottomControlDock.tsx`, `ResourceMonitorPanel.tsx`, `InteractiveGlassPanelWidget.tsx`, `FullScreenModelViewerModal.tsx`.
2. **`Parallax3D - Przestrzenne Zdjęcia 3D.webarchive`** (`14.2 MB`)
   - Moduły: `ThreeCanvas.tsx` (deformacja siatki 3D wg mapy głębi, ruchy kadru: *Okrąg, Kołysanie, Ósemka 3D, Oddech, Pion, Myszka, Auto-rotate*), `depthEstimator.ts` (`Float32Array`), `DepthEditorModal.tsx`, `videoRecorder.ts` (eksport pętli WebM 30 FPS), `proceduralImages.ts`.
3. **`VortexVR Studio & Enterprise Hub.webarchive`** (`17.3 MB`)
   - Moduły: `VrViewport3D.tsx` (scena *Stacja Helios*, obiekty Drag & Drop: Łazik XR, Wieżyczka, Portal VR, Kryształ, Baza Hab, Dron 6-DoF, import `.OBJ/.GLTF`, tryb VR Split), `VisualLogicGraphEditor.tsx` (wizualny graf logiki `WEJ ●` / `WYJ ●`), `AiStudioAndDocsPanel.tsx`, `RentalCalendarAndFleet.tsx`, `CrmAdminWarehouseHub.tsx`, `InteractiveTutorialGuide.tsx`, `cryptoE2E.ts` (`AES-256-GCM`), `pdfExport.ts`.
4. **Katalog `Paralexa outdoor of clinic:view in windows`** (`26 plików, ~65 MB`)
   - Rendery 2K widoków za oknami kliniki (różne pory dnia, refleksy słoneczne, głęboka perspektywa) pod tryb `window_parallax`.

### B. Aplikacja z Otwartej Karty Przeglądarki (`cef19369-40d6-4ee3-abc9-58f2ebc219b8`)
- **Adres URL:** `https://aistudio.google.com/apps/cef19369-40d6-4ee3-abc9-58f2ebc219b8?showPreview=true&showAssistant=true&appParams=software-guide`
- **Tytuł:** **Free 3D Image Converter & 6-Parametrowy Analizator Kliniczny 3D/LiDAR**
- **Kluczowe moduły:**
  - `src/components/ThreePhotogrammetryViewer.tsx` (symulator 8 etapów fotogrametrii SfM/MVS w WebGL)
  - `src/components/ClinicalDiagnosticAnalyzer.tsx` (**6-Parametrowy Analizator Gojenia Ran i Zaostrzeń Niewydolności Krążenia**):
    1. `colorSpectrumIndexRYB` — Kolor (Spektrum RYB: Ziarnina / Włóknik / Martwica)
    2. `lidarDepthVolumeMm` — Skan LiDAR (Głębokość ubytku w $\text{mm}$ / Objętość obrzęku w $\text{cm}^3$)
    3. `huePerfusionIndex` — Barwa i Nasycenie Tkankowe (Perfuzja i Sinica)
    4. `surfaceSmoothness` — Gładkość Powierzchni Skanowanego Modelu ($R_a$ w $\mu\text{m}$)
    5. `edgeCurvatureContraction` — Krzywizna i Kontrakcja Brzegów Ubytku
    6. `specularMoistureIndex` — Refleksyjność i Wilgotność Powierzchni (Wysięk)
    - Wyliczanie indeksów **WHI 3D** i **CEI**, wizualizacja 3D WebGL w 3 trybach, wykres radarowy 6-osiowy, oś czasu oraz eksport dokumentacji pacjenta (`PAC-2026-0419`) do **JSON i CSV (UTF-8 BOM)**.
  - `src/components/SoftwareComparator.tsx`, `SoftwareDecisionWizard.tsx`, `PhotogrammetryPrinciplesView.tsx`, `PhotographyPlanner.tsx`, `TroubleshootingGuide.tsx`.

### C. Pozostałe Powiązane Aplikacje w `~/Downloads`
- **`paralexa.webarchive` / `My Google AI Studiso App.webarchive` (*Next Generation Clinic — Proktologia • Chirurgia • Flebologia*):** `ParallaxWindowView.tsx`, `DepartmentModal.tsx`, `BookingModal.tsx`, `ShopDrawer.tsx`, `clinicData.ts`.
- **`CML – Centrum Medycyny Laserowej | Dr Jan Bujok`:** `VirtualClinicTour.tsx`, `TreatmentCalculator.tsx`, `ClinicDashboardCharts.tsx`, `ProctologyEducationGame.tsx`, `AiConsultantModal.tsx`.
- **`My Googles AI Studio App.webarchive`:** `LidarDepthHistogram.tsx`, `ThreeDHeadVisualizer.tsx`, `CameraStream.tsx`, `DiagnosticConsole.tsx`, `FlutterMobileIntegration.tsx`.
- **`HoloArch AR Studio — Generator Promptów i Symulator Hologramów 3D.webarchive` (`4b7b1a85-d2a7-4576-baeb-81b5fef5cf0d`):** `LuxurySpatialDeck.tsx`, `HologramViewport3D.tsx`, `GeminiStudioHub.tsx`, `StudioExtensionsHub.tsx`, `GoogleDriveWorkspacePanel.tsx`.

