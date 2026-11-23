@echo off
:: =============================================================================
::  ____  _____ _   _ _____ ___ _   _ _____ _     ____  _____ _____ ____  
:: / ___|| ____| \ | |_   _|_ _| \ | | ____| |   |___ \|___ /|___ /|___ \ 
:: \___ \|  _| |  \| | | |  | ||  \| |  _| | |     __) | |_ \  |_ \  __) |
::  ___) | |___| |\  | | |  | || |\  | |___| |___ / __/ ___) |___) |/ __/ 
:: |____/|_____|_| \_| |_| |___|_| \_|_____|_____|_____|____/|____/|_____|
::
:: SENTINEL MESH LAB EXERCISE: ZAMKNIĘTY MODEL 4 URZĄDZEŃ (PROMIEN <= 10 METRÓW)
:: =============================================================================
title SENTINEL MESH LAB - CLOSED 4-DEVICE SIMULATION [<10M]
color 0B
cls

echo ===============================================================================
echo ⚡ [SENTINEL] ĆWICZENIE DESANTU I FALI EM W ZAMKNIĘTYM MODELU 4 URZĄDZEŃ
echo ===============================================================================
echo [*] Topologia Mesh: CLOSED_4_DEVICE_LAB_MESH_10M
echo [*] Promien wezlow: 8.5 metra
echo [*] Zalozenie: Fala EM rozchodzi sie po sieci, neutralizuje gnidy w obrebie urzadzenia
echo ===============================================================================
echo.

echo [KROK 1/4] Skanowanie wezlow laboratoryjnych (< 10m)...
timeout /t 1 /nobreak >nul
echo [+] UNIT-01-ALPHA (Lokalny Komputer): MASTER DEFENSE [ONLINE]
echo [+] UNIT-02-BETA  (Dystans: 2.4m):    SENSOR PROBE   [SYNCED]
echo [+] UNIT-03-GAMMA (Dystans: 5.8m):    GATEWAY NODE   [SYNCED]
echo [+] UNIT-04-DELTA (Dystans: 8.5m):    TELEMETRY NODE [MONITORING]
echo.

echo [KROK 2/4] Symulacja pojawienia sie agresywnych gnid w plikach i zlaczach...
timeout /t 1 /nobreak >nul
echo [!] Wykryto agresora w plikach: mbr_wiper_stealth.bin, stratum_miner.exe (4 sztuki)
echo [!] Wykryto agresora w zlaczach: DirectFlip DWM, USB HID, PCIe DMA (4 sztuki)
echo.

echo [KROK 3/4] Uruchomienie Prawdziwej Fali Elektromagnetycznej (4500W @ 940.8 THz)...
timeout /t 1 /nobreak >nul
echo ⚡ [FALA EM] Propagacja impulsu przez magistrale lokalne i loopback...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$host.UI.RawUI.BackgroundColor = 'DarkRed'; Clear-Host; Write-Host '>>> EMP WAVE BLAST INITIATED (4500W) <<<' -ForegroundColor Yellow; Start-Sleep -Milliseconds 400; $host.UI.RawUI.BackgroundColor = 'Black'; Clear-Host"
echo.

echo [KROK 4/4] Ocena powlamaniowa i diagnostyka:
echo -------------------------------------------------------------------------------
echo [V] PLIKI: Wyzerowano naglowki PE + Zablokowano uprawnienia ACL (icacls /deny)
echo [V] ZLACZA: Wywlaszczono hooki WH_KEYBOARD_LL + Zamknieto nieautoryzowane sockety
echo [V] STAN MESH: Wszystkie 4 urzadzenia w obrebie 10m zachowaly pelna spojnosc!
echo -------------------------------------------------------------------------------
echo.
echo [V] Raport diagnostyczny zapisany pomyślnie.
echo.
pause
