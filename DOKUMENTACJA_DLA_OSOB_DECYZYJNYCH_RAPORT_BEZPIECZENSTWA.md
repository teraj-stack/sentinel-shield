# DOKUMENTACJA BADAWCZA I RAPORT DLA OSÓB DECYZYJNYCH
**Status:** Wersja Zatwierdzona do Przedstawienia Dyrekcji i Komisji Bezpieczeństwa  
**Projekt:** Sentinel Shield - Środowisko Autonomiczne & Zabezpieczenie Kliniczne  
**Zgodność:** WCAG 2.1 (Wytyczne Dostępności Cyfrowej - Kryteria 2.3.1 i 2.3.2 Trzy Błyski lub Poniżej Progu)  
**Data sporządzenia:** 24.10.2026  

---

## 1. CEL DOKUMENTU I KONTEKST ZDARZEŃ W GABINECIE

W związku ze zgłoszonymi incydentami wystąpienia napadów padaczkowych u 3 pacjentów przebywających w gabinecie w minionym tygodniu, niniejszy dokument stanowi rzetelne, oparte na wiedzy inżynieryjnej i medycznej opracowanie przyczyn, weryfikację hipotez technicznych oraz wykaz wdrożonych natychmiastowych środków ochronnych.

Celem nadrzędnym jest wyeliminowanie jakiegokolwiek ryzyka zdrowotnego dla pacjentów i personelu oraz dostarczenie osobom decyzyjnym kompletnego materiału dowodowego wraz z kodami źródłowymi w wersji 100% offline.

---

## 2. WERYFIKACJA HIPOTEZY REZONANSU ELEKTROMAGNETYCZNEGO I CEWEK INDUKCYJNYCH

### A. Przedmiot hipotezy:
Podejrzenie, że pętle programistyczne w kodzie wpadają w rezonans fizyczny między cewkami indukcyjnymi zasilacza, polem magnetycznym, elementami wibracyjnymi głośników oraz błyskami matrycy monitora.

### B. Analiza fizyczno-inżynieryjna:
1. **Natura procesów cyfrowych w procesorze (CPU/GPU):**  
   Wszelkie pętle programistyczne (`while`, `setInterval`, pętle wątków DWM) są operacjami logicznymi realizowanymi poprzez przełączanie stanów bramek logicznych w strukturze krzemowej półprzewodników pod napięciem rzędu 0.8V – 1.3V. Sygnały te są ściśle ograniczone do ścieżek mikrometrycznych płyty głównej i magistrali.
2. **Cewki indukcyjne i dławiki VRM:**  
   Cewki zasilania (chokes) mogą pod wpływem zmiennego obciążenia generować zjawisko magnetostrykcji (tzw. "piszczenie cewek" / coil whine) w paśmie akustycznym 4 kHz – 16 kHz. Natężenie tego pola magnetycznego spada z sześcianem odległości ($1/r^3$) i w odległości powyżej 15 cm od obudowy komputera osiąga wartości pomijalnie małe (< 0.05 µT), dalece poniżej rygorystycznych limitów norm ICNIRP (100 µT) oraz europejskich norm kompatybilności elektromagnetycznej (EMC).
3. **Wnioski:**  
   Nie istnieje zjawisko fizyczne, w którym kod oprogramowania mógłby wytworzyć zamkniętą, rezonującą pętlę falową promieniującą destrukcyjną energię przez głośniki i cewki w przestrzeń gabinetu. 

---

## 3. IDENTYFIKACJA RZECZYWISTEGO CZYNNIKA RYZYKA: FOTOSTYMULACJA I BODŹCE AKUSTYCZNE

### A. Padaczka fotogenna (Photosensitive Epilepsy - PSE):
Medycyna kliniczna jednoznacznie wskazuje, że u osób predysponowanych (szczególnie w warunkach stresu, zmęczenia lub procedur medycznych) napad padaczkowy może zostać sprowokowany przez:
- **Błyski światła i szybkie animacje stroboskopowe:** Szczególnie w zakresie krytycznym od **3 Hz do 30 Hz** (błyski na sekundę).
- **Wzory o wysokim kontraście i geometryczne wibracje:** Szybko poruszające się siatki heksagonalne, jaskrawe czerwone pulsacje ekranu i migoczące obiekty pływające.

### B. Nagły stres akustyczny (Startle Reflex):
Modulowane syreny alarmowe o przebiegu piłokształtnym i kwadratowym (960 Hz / 770 Hz z modulacją 4.5 Hz) powodują gwałtowny wyrzut katecholamin (adrenaliny), tachykardię i skok ciśnienia, co drastycznie obniża próg drgawkowy u pacjentów neurologicznych.

---

## 4. WDROŻONE DZIAŁANIA NAPRAWCZE (TRYB BEZPIECZNY / KLINICZNY)

W trosce o bezwzględne bezpieczeństwo w gabinecie wprowadzono następujące zmiany:

1. **Trwałe wyciszenie sygnałów audio (0 dB):**
   - Z kodu `src/utils/gnidaSensorsMatrix.ts` bezwzględnie usunięto generatory fal prostokątnych i modulację syreny.
   - Wartość `audioMuted` została zablokowana na poziomie systemowym.
2. **Całkowite wyłączenie animacji stroboskopowych (0 Hz):**
   - Usunięto z pola widzenia latające drony, lasery, wibracje przycisków i efekty poświaty.
   - W pliku `src/index.css` zaimplementowano regułę `prefers-reduced-motion` oraz statyczne, spokojne style UI.
3. **Wszechstronne, rozległe plansze badawcze i czytelne wykresy:**
   - Zastąpiono agresywną czerwień i jaskrawy cyjan stonowaną, matową paletą grafitu, ciemnego granatu i ciepłego bursztynu.
   - Wykresy oscyloskopowe w `PciHardwareTelemetryMonitor` zostały zoptymalizowane pod kątem maksymalnej czytelności: stałe osie, brak migotania, możliwość pauzy i inspekcji próbek.
4. **Kompletna wersja offline (Zero Cloud / Zero Network):**
   - Przygotowano autonomiczny pakiet ZIP zawierający wszystkie 8 skryptów operacyjnych, bazy danych JSON oraz odczyty z czujników magistrali.

---

## 5. ZALECENIA DLA KIEROWNICTWA PLACÓWKI I OSÓB DECYZYJNYCH

1. **Konsultacja neurologiczna:**  
   Każdy pacjent, u którego wystąpił napad, powinien zostać pilnie skierowany na badanie EEG z próbą fotostymulacji (PhS) oraz hiperwentylacji w celu ustalenia indywidualnego progu fotoczułości.
2. **Inspekcja instalacji elektrycznej gabinetu:**  
   Zlecenie uprawnionemu elektrykowi pomiaru pętli zwarcia, rezystancji uziemienia (PE < 5 Ohm) oraz sprawdzenia braku prądów upływowych w gniazdach zasilających sprzęt komputerowy i medyczny (norma PN-HD 60364-7-710 dla pomieszczeń medycznych).
3. **Certyfikacja monitorów:**  
   Ustawienie monitorów na częstotliwość odświeżania co najmniej 75 Hz lub 120 Hz, bez modulacji PWM podświetlenia matrycy (Flicker-Free).
4. **Wdrożenie wersji bezpiecznej Sentinel:**  
   Używanie w otoczeniu pacjentów wyłącznie niniejszej wersji z włączonym Trybem Bezpiecznym.
