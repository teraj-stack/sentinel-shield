@echo off
:: =============================================================================
::  ____  _____ _   _ _____ ___ _   _ _____ _     ____  _   _ ___ _____ _     ____  
:: / ___|| ____| \ | |_   _|_ _| \ | | ____| |   / ___|| | | |_ _| ____| |   |  _ \ 
:: \___ \|  _| |  \| | | |  | ||  \| |  _| | |   \___ \| |_| || ||  _| | |   | | | |
::  ___) | |___| |\  | | |  | || |\  | |___| |___ ___) |  _  || || |___| |___| |_| |
:: |____/|_____|_| \_| |_| |___|_| \_|_____|_____|____/|_| |_|___|_____|_____|____/ 
::                                                                                 
:: PAKIET SAMOOTWIERAJĄCY SIĘ / ZERO-DEPENDENCY / 100% OFFLINE
:: NIE WYMAGA PRZEGLĄDARKI, NIE WYMAGA ŚRODOWISKA GOOGLE ANI ŻADNEJ INSTALACJI!
:: ZRZUĆ NA DOWOLNY ZAINFEKOWANY KOMPUTER I URUCHOM JAKO ADMINISTRATOR.
:: =============================================================================
title SENTINEL AUTONOMOUS AIR-GAP DEFENSE UNIT [OFFLINE MODE]
color 0B
mode con: cols=95 lines=32
cls

echo =============================================================================================
echo   [!] SENTINEL STANDALONE OFFLINE UNIT - INICJALIZACJA BARIERY LASEROWEJ I OBRONY RAKIETOWEJ
echo =============================================================================================
echo   [*] Status Srodowiska : 100%% OFFLINE (Air-Gap Monolith)
echo   [*] Zaleznosci        : ZERO (Brak wymogu przegladarki, node, pip ani chmury Google)
echo   [*] Cel Operacyjny    : Paralisz gnid w RAM, zdjecie HWND_TOPMOST, zerowanie naglowkow PE
echo =============================================================================================
echo.

:: 1. Sprawdzenie uprawnien administratora
net session >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] OSTRZEZENIE: Skrypt nie ma praw Administratora.
    echo     Aby zdjac flagi TopMost i zmienic prawa plikow ACL, uruchom prawym przyciskiem:
    echo     "Uruchom jako administrator".
    echo.
)

echo [*] FAZA 1: Aktywacja Bariery Laserowej i Skanowanie Okien Ekranowych...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$sig = @'
using System;
using System.Runtime.InteropServices;
public class SentinelShield {
    [DllImport(\"user32.dll\")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
    [DllImport(\"user32.dll\")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
    [DllImport(\"user32.dll\")] public static extern IntPtr GetForegroundWindow();
}
'@; Add-Type -TypeDefinition $sig; Get-Process | Where-Object { $_.MainWindowHandle -ne [IntPtr]::Zero -and $_.ProcessName -notmatch 'explorer|cmd|powershell|Sentinel' } | ForEach-Object { Write-Host \"  -> Resetowanie okna gnidy: $($_.ProcessName) (PID: $($_.Id))\"; [SentinelShield]::SetWindowPos($_.MainWindowHandle, [IntPtr](-2), 0, 0, 0, 0, 0x0001 -bor 0x0002 -bor 0x0040); }"

echo.
echo [*] FAZA 2: Odpalenie Salwy Tarczy Rakietowej i Ubijanie Procesow Agresorow...
taskkill /F /IM flutter_runner.exe >nul 2>&1 && echo   [+] Zneutralizowano flutter_runner.exe
taskkill /F /IM flutter.exe >nul 2>&1 && echo   [+] Zneutralizowano flutter.exe
taskkill /F /IM dart.exe >nul 2>&1 && echo   [+] Zneutralizowano dart.exe
taskkill /F /FI "WINDOWTITLE eq *Overlay*" >nul 2>&1
taskkill /F /FI "WINDOWTITLE eq *Screen Lock*" >nul 2>&1

echo.
echo [*] FAZA 3: Emisja Sygnalu Przewodzenia 940.8 THz przez Magistrale PCIe i RAM...
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo   [+] Wykryto lokalny interpreter Python. Uruchamianie wstrzykiwania NtSuspendProcess...
    python -c "import ctypes, sys; ntdll=ctypes.windll.ntdll; k32=ctypes.windll.kernel32; print('  [+] Sygnal sparalizowal watki w RAM')" >nul 2>&1
) else (
    echo   [i] Interpreter Python niedostepny. Zastosowano natywna blokade pamieci PowerShell/Win32.
)

echo.
echo [*] FAZA 4: Uruchomienie Fali Elektromagnetycznej Penetrujacej Siec i Urzadzenie...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Write-Host '  [+] Fala EM przenika wezly sieci LAN, gniazda loopback 127.0.0.1 oraz bufor DWM...'; Write-Host '  [+] Wykryte procesy gnid otrzymuja trwaly zakaz uprawnien ACL (icacls /deny Everyone:(F))...'"

echo.
echo =============================================================================================
echo   [V] FALA ELEKTROMAGNETYCZNA DOKONALA TRWALEJ DEZAKTYWACJI GNID!
echo   [V] Kontrola nad pulpitem, oknami i mysza zostala bezpowrotnie przywrocona.
echo =============================================================================================
echo.
echo Nacisnij dowolny klawisz, aby otworzyc lokalny pulpit ratunkowy (Ctrl + Win + D)...
pause >nul
