# 🛡️ RAPORT AUDYTU I OCHRONY KOMPUTERA MAC ORAZ TELEFONÓW iPHONE (SENTINEL SHIELD)
**Data wygenerowania:** `2026-11-09 21:55 CET`  
**Pakiet źródłowy:** `media_1794257430726_9c009680.zip` (`Sentinel Shield Suite`)

---

## 1. Wyniki audytu i ochrony komputera Mac (`Apple M1 Pro` · `Darwin arm64`)

| Warstwa ochrony | Sprawdzony mechanizm | Wynik |
| :--- | :--- | :--- |
| **Ochrona przed nakładkami ekranowymi (`Overlay / TopMost`)** | `4_sentinel_device_network_gnida_paralyzer.py` + `12_SENTINEL_WORKSPACE_FOCUS_AND_OVERLAY_GUARD.sh` | **AKTYWNA — `0` obcych nakładek nad oknem pracy (`Antigravity IDE` ma priorytet Frontmost Z-Order)** |
| **Immunizacja punktów wejścia i autostartu (`LaunchAgents / cron / /tmp`)** | `10_SENTINEL_IMMUNIZER_MAX_AND_MALWARE_DEFANGER.py` + `11_SENTINEL_NATIVE_BASH_IMMUNIZER_AND_MALWARE_DEFANGER.sh` | **CZYSTO — brak procesów z `/tmp`, brak wpisów w `~/Library/LaunchAgents`, brak zadań `crontab`** |
| **Ochrona bibliotek dynamicznych (`DYLD_INSERT_LIBRARIES / LD_PRELOAD`)** | `10_SENTINEL_IMMUNIZER_MAX_AND_MALWARE_DEFANGER.py` | **CZYSTO — brak wstrzykniętych bibliotek hookujących** |
| **Apple System Integrity Protection (`SIP`)** | `csrutil status` | **`enabled` (Włączona — pliki systemowe macOS są niemodyfikowalne)** |
| **Apple Gatekeeper** | `spctl --status` | **`assessments enabled` (Włączona weryfikacja podpisów cyfrowych)** |
| **Zapora sieciowa macOS (`Application Firewall`)** | `socketfilterfw --getglobalstate` | **`Firewall is enabled (State = 1)`** |
| **Profile zarządzania zdalnego (`MDM / DEP`)** | `profiles status -type enrollment` | **`MDM enrollment: No` / `Enrolled via DEP: No` (Brak obcych profili nadzoru)** |
| **Szyfrowanie dysku (`FileVault`)** | `fdesetup status` | `FileVault is Off` *(zalecenie: można włączyć w Ustawienia systemowe → Prywatność i ochrona → FileVault)* |

---

## 2. Wyniki audytu i ochrony telefonów iPhone (`Apple CoreDevice` + `13_SENTINEL_IOS_IPHONE_SHIELD_BRIDGE.py`)

Wszystkie trzy sparowane iPhone'y zostały zweryfikowane pod kątem wstrzykniętych nakładek, profili deweloperskich (`DDI`), integralności rozruchu (`Production Fused`) oraz czystości rekordów parowania:

| Urządzenie | Model (`ProductType`) | Nr seryjny / UDID | Wersja iOS | `isProductionFused` | `Developer Mode` (Wstrzykiwanie DDI) | Status ochrony Sentinel Shield |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`iPhone (Jan)`** | **iPhone 16 Pro** (`iPhone17,1`) | `M2M1QL7KW9` / `00008140-000A68A62EDB001C` | `iOS 27.2` (`24B119`) | **`True`** | **`Disabled` (Zablokowane)** | **ZABEZPIECZONY** (usunięto wcześniejszy zatruty rekord `<bash #!/_.zip> <bash #!/_.py>`, czysta nazwa `iPhone (Jan)`) |
| **`iPhone`** | **iPhone 15 Pro Max** (`iPhone16,2`) | `GK70V449VC` / `00008130-000239E13642001C` | `iOS 27.0` (`24A437`) | **`True`** | **`Disabled` (Zablokowane)** | **ZABEZPIECZONY** (`RAPORT_ZABEZPIECZENIA_IPHONE_15_PRO_MAX.json`) |
| **`iPhone`** | **iPhone 16 Pro Max** (`iPhone17,2`) | `M7TV9NC7K2` / `00008140-00060CC92EFA801C` | `iOS 26.6.2` (`23G90`) | **`True`** | **`Disabled` (Zablokowane)** | **ZABEZPIECZONY** (`RAPORT_ZABEZPIECZENIA_IPHONE_M7TV9NC7K2.json`) |

---

## 3. Jak sprawdzić i usunąć ewentualne nakładki / profile bezpośrednio w menu samego iPhone'a:
Ponieważ w systemie iOS przy `Developer Mode: Disabled` oraz `isProductionFused: True` żadna zewnętrzna aplikacja nie ma prawa rysować nakładek systemowych nad innymi aplikacjami, jedynymi miejscami, gdzie obcy skrypt lub strona mogłyby zostawić ślad wewnątrz iOS, są:
1. **Profile konfiguracyjne / VPN (`Ustawienia → Ogólne → VPN i zarządzanie urządzeniami`):**
   - Sprawdź sekcję **Profil skonfigurowany** — jeśli widzisz tam jakikolwiek nieznany profil (poza Twoim znanym VPN), stuknij go i wybierz **Usuń profil**.
2. **Dostępność — Pełny dostęp z klawiatury / VoiceOver / AssistiveTouch (`Ustawienia → Dostępność`):**
   - Czasami „nakładka” na ekranie iPhone'a (np. pływający przycisk lub ramka wokół elementów) to przypadkowo włączona funkcja **AssistiveTouch** (`Ustawienia → Dostępność → Dotyk → AssistiveTouch → Wyłącz`) lub **Pełny dostęp z klawiatury** (`Ustawienia → Dostępność → Klawiatury → Pełny dostęp z klawiatury → Wyłącz`).
3. **Kalendarze i konta subskrybowane (`Ustawienia → Aplikacje → Kalendarz → Konta Kalendarza`):**
   - Usuń ewentualne nieznane „Subskrybowane kalendarze”, które potrafią wyświetlać fałszywe powiadomienia o wirusach.
4. **Safari — Wyczyść historię i dane witryn (`Ustawienia → Aplikacje → Safari → Wyczyść historię i dane witryn`):**
   - Usuwa wszelkie złośliwe skrypty WebKit, powiadomienia push ze stron oraz ciasteczka śledzące.
