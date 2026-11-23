#!/usr/bin/env bash
# ==============================================================================
# SENTINEL SHIELD - MASTER BASH LAUNCHER (macOS / Linux)
# Pozwala na uruchamianie modułów pakietu badawczego bezpośrednio z powłoki Bash
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

show_menu() {
    echo "=============================================================================="
    echo "  SENTINEL SHIELD - PAKIET BADAWCZY OFFLINE (BASH LAUNCHER - WCAG 2.1 AAA)"
    echo "=============================================================================="
    echo "  1) Uruchom 1_SENTINEL_AUTORUN_INSTANT_KILLER.sh (Diagnostyka nakładek i RAM)"
    echo "  2) Uruchom 2_SENTINEL_NATIVE_GUI_LAUNCHER.py (Interfejs graficzny Tkinter)"
    echo "  3) Otwórz 3_SENTINEL_OFFLINE_AUTONOMOUS_STANDALONE.html (Aplikacja HTML)"
    echo "  4) Uruchom 5_SENTINEL_4_DEVICE_MESH_LAB_EXERCISE.sh (Symulacja 4 urządzeń)"
    echo "  5) Uruchom 6_SENTINEL_RETRO_100_COPIES_ANCESTOR_FREEZE.py (100 kopii wstecz)"
    echo "  6) Uruchom 7_SENTINEL_ALL_PLUGINS_FREEZE_ALARM_AND_DEFRAG.py (Wtyczki & Defrag)"
    echo "  7) Uruchom 11_SENTINEL_NATIVE_BASH_IMMUNIZER_AND_MALWARE_DEFANGER.sh (Audyt)"
    echo "  8) Wyświetl raport bezpieczeństwa (DOKUMENTACJA_DLA_OSOB_DECYZYJNYCH...md)"
    echo "  9) Wyświetl telemetrię czujników PCI (9_ODCZYTY_CZUJNIKOW_I_PARAMETRY_PCI.json)"
    echo "  0) Wyjście"
    echo "=============================================================================="
}

if [[ $# -gt 0 ]]; then
    CHOICE="$1"
else
    show_menu
    read -r -p "Wybierz opcję [0-9]: " CHOICE
fi

case "$CHOICE" in
    1) bash "$SCRIPT_DIR/1_SENTINEL_AUTORUN_INSTANT_KILLER.sh" ;;
    2) python3 "$SCRIPT_DIR/2_SENTINEL_NATIVE_GUI_LAUNCHER.py" ;;
    3)
        if command -v open >/dev/null 2>&1; then
            open "$SCRIPT_DIR/3_SENTINEL_OFFLINE_AUTONOMOUS_STANDALONE.html"
        elif command -v xdg-open >/dev/null 2>&1; then
            xdg-open "$SCRIPT_DIR/3_SENTINEL_OFFLINE_AUTONOMOUS_STANDALONE.html"
        else
            echo "Ścieżka do pliku HTML: $SCRIPT_DIR/3_SENTINEL_OFFLINE_AUTONOMOUS_STANDALONE.html"
        fi
        ;;
    4) bash "$SCRIPT_DIR/5_SENTINEL_4_DEVICE_MESH_LAB_EXERCISE.sh" ;;
    5) python3 "$SCRIPT_DIR/6_SENTINEL_RETRO_100_COPIES_ANCESTOR_FREEZE.py" ;;
    6) python3 "$SCRIPT_DIR/7_SENTINEL_ALL_PLUGINS_FREEZE_ALARM_AND_DEFRAG.py" ;;
    7) bash "$SCRIPT_DIR/11_SENTINEL_NATIVE_BASH_IMMUNIZER_AND_MALWARE_DEFANGER.sh" ;;
    8) cat "$SCRIPT_DIR/DOKUMENTACJA_DLA_OSOB_DECYZYJNYCH_RAPORT_BEZPIECZENSTWA.md" ;;
    9) cat "$SCRIPT_DIR/9_ODCZYTY_CZUJNIKOW_I_PARAMETRY_PCI.json" ;;
    0) exit 0 ;;
    *) echo "Nieznana opcja: $CHOICE"; exit 1 ;;
esac
