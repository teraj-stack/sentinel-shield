# Pakiet Projektów: BM Clinic (`bmclinic.co`), Silnik MedSEO Next.js 15 oraz Sentinel Shield

Kompletne środowisko projektowe obejmujące trzy główne moduły:

1. **[`bmclinic.co/`](./bmclinic.co/README.md)** — Flagowa platforma medyczna **Next.js 15 (App Router, React 19, Tailwind CSS)** dla **BM Clinic**:
   - **4 działy zabiegowe** (*Medycyna Estetyczna, Flebologia, Proktologia, Chirurgia Ogólna*) oraz **8 dedykowanych podstron procedur** (`/procedury/[slug]`),
   - **Cyfrowy Bliźniak 3D Kliniki i Nawigacja Dźwiękowa HRTF dla Osób Niewidomych** (`BmClinicSpatialModel3D.tsx`, standard **WCAG 2.1 AAA**, tabliczki Braille’a, polska synteza mowy TTS),
   - **6-Parametrowy Skaner Diagnostyczny 3D LiDAR** (`BmClinicLidarDiagnosticAnalyzer.tsx` — indeksy `WHI-3D` oraz `CEI`),
   - **Wizualizator Impulsów Światłowodowych 3D Laser 1470 nm / 980 nm** oraz **Widok 3D z 3 Łukowych Okien Kliniki i Otwartego Świetlika Dachowego z Paralaksą** (`BmClinicInitialModulesSuite.tsx`),
   - **Kalkulator Kosztów i Rekonwalescencji**, **Pakiety Pozabiegowe (Post-Care Kits)** oraz **Rezerwacja Wizyt Online 24/7**.
2. **[`MED_SEO_NEXTJS_DATA_ENGINE/`](./MED_SEO_NEXTJS_DATA_ENGINE/README.md)** — Silnik bazodanowy i analityczny **Next.js 15 + SQLite (WAL) + Python RL Trainer**:
   - Ilościowa ocena podstron medycznych w **Google Search (NavBoost, E-E-A-T / PWZ, Core Web Vitals)** oraz **Google AI Overviews (GEO 130–170 słów)**,
   - Wyliczanie sygnału nagrody **Reinforcement Learning (`Agent Reward Signal`)** na podstawie konwersji sprzedażowych i widoczności SEO.
3. **[`LOCAL_3D_VR_STUDIO_SUITE/`](./LOCAL_3D_VR_STUDIO_SUITE/index.html) & Narzędzia Bezpieczeństwa Sentinel Shield** — lokalny pakiet wizualizacji 3D/VR offline oraz skrypty audytu i ochrony środowiska roboczego.
