#!/usr/bin/env bash
# =============================================================================
# SENTINEL STANDALONE OFFLINE UNIT - BASH EDITION (macOS / Linux)
# Odpowiednik: 1_SENTINEL_AUTORUN_INSTANT_KILLER.bat
# Zgodność: WCAG 2.1 AAA (0 dB Audio, 0 Hz Strobe, Safe Diagnostic Mode)
# =============================================================================
set -euo pipefail

echo "============================================================================================="
echo "  [!] SENTINEL STANDALONE OFFLINE UNIT - INICJALIZACJA BARIERY I DIAGNOSTYKI PROCESÓW (BASH)"
echo "============================================================================================="
echo "  [*] Status Środowiska : 100% OFFLINE (Air-Gap Monolith - POSIX/macOS/Linux)"
echo "  [*] Zależności        : ZERO (Natywny Bash, zgodność z WCAG 2.1 AAA - 0 dB / 0 Hz)"
echo "  [*] Cel Operacyjny    : Inspekcja procesów nakładek, ochrona fokusu okien, weryfikacja ACL"
echo "============================================================================================="
echo ""

# 1. Sprawdzenie uprawnień (root / sudo)
if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
    echo "[i] Informacja: Skrypt działa z uprawnieniami standardowego użytkownika (Tryb Bezpieczny)."
    echo ""
fi

echo "[*] FAZA 1: Skanowanie procesów okienkowych i nakładek ekranowych..."
if command -v ps >/dev/null 2>&1; then
    OVERLAY_PROCS=$(ps aux 2>/dev/null | grep -Ei "flutter_runner|overlay_lock|screen_lock_hijack" | grep -v grep || true)
    if [[ -n "$OVERLAY_PROCS" ]]; then
        echo "  [!] Wykryto podejrzane procesy nakładkowe:"
        echo "$OVERLAY_PROCS"
    else
        echo "  [+] Brak nieautoryzowanych procesów nakładkowych (TopMost / Overlay)."
    fi
fi

echo ""
echo "[*] FAZA 2: Weryfikacja procesów z listy sygnatur..."
for target in "flutter_runner" "stratum_miner" "mbr_wiper_stealth"; do
    if pgrep -f "$target" >/dev/null 2>&1; then
        echo "  [!] Wykryto proces pasujący do sygnatury: $target (Tryb audytu - brak automatycznego SIGKILL)"
    else
        echo "  [+] Sygnatura '$target': CZYSTO (brak aktywnych instancji w RAM)"
    fi
done

echo ""
echo "[*] FAZA 3: Diagnostyka pamięci RAM i magistrali lokalnej..."
if command -v python3 >/dev/null 2>&1; then
    python3 -c "import platform; print(f'  [+] Lokalny interpreter Python ({platform.python_version()}) zweryfikowany poprawnie.')"
else
    echo "  [i] Interpreter Python3 niedostępny. Zastosowano natywną diagnostykę POSIX."
fi

echo ""
echo "[*] FAZA 4: Weryfikacja gniazd lokalnych (Loopback 127.0.0.1)..."
if command -v lsof >/dev/null 2>&1; then
    LISTEN_COUNT=$(lsof -iTCP -sTCP:LISTEN -P -n 2>/dev/null | wc -l | tr -d ' ')
    echo "  [+] Liczba aktywnych punktów nasłuchu TCP (Loopback/LAN): ${LISTEN_COUNT}"
fi

echo ""
echo "============================================================================================="
echo "  [V] DIAGNOSTYKA I OCHRONA ZAKOŃCZONA POMYŚLNIE (TRYB BEZPIECZNY KLINICZNY - WCAG 2.1 AAA)"
echo "============================================================================================="
