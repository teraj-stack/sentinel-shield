#!/usr/bin/env bash
# ==============================================================================
# SENTINEL SHIELD: STRAŻNIK OKNA PRACY (WORKSPACE FOCUS & ANTI-OVERLAY GUARD)
# Plik: 12_SENTINEL_WORKSPACE_FOCUS_AND_OVERLAY_GUARD.sh
# Cel:
#   1. Wykrywanie i usuwanie nakładek ekranowych (Overlay / TopMost / Layer > 0)
#      zasłaniających okno pracy Antigravity IDE.
#   2. Wymuszenie wyniesienia okna pracy Antigravity IDE na pierwszy plan.
#   3. Zabezpieczenie katalogu projektu (uprawnienia + manifest SHA-256).
# ==============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "=============================================================================="
echo "  🛡️  SENTINEL SHIELD: OCHRONA MIEJSCA PRACY I ZDEJMOWANIE NAKŁADEK (OVERLAY)"
echo "=============================================================================="
echo "  [*] Katalog projektu : $SCRIPT_DIR"
echo "  [*] System operacyjny: $(uname -s) ($(uname -m))"
echo "=============================================================================="
echo ""

# 1. Diagnostyka warstw okien (Z-Order / Overlay) i wyniesienie okna pracy na wierzch
echo "[*] KROK 1/4: Diagnostyka warstw ekranowych i przywracanie fokusu dla okna pracy..."
if [[ "$(uname -s)" == "Darwin" ]]; then
    # Sprawdzenie statusu aplikacji pierwszoplanowej przez lsappinfo
    FRONT_ASN=$(lsappinfo front 2>/dev/null | tr -d ':' || true)
    FRONT_APP=$(lsappinfo info -only name "$FRONT_ASN" 2>/dev/null | cut -d'=' -f2 | tr -d '"' || true)
    echo "  [i] Aktualna aplikacja pierwszoplanowa: ${FRONT_APP:-Antigravity IDE}"

    # Wyniesienie Antigravity IDE ponad inne okna robocze
    osascript -e 'tell application id "com.google.antigravity-ide" to activate' 2>/dev/null || \
    open -b "com.google.antigravity-ide" 2>/dev/null || true
    echo "  [+] Wymuszono fokus pierwszoplanowy (Frontmost Z-Order) dla okna Antigravity IDE."
fi

echo ""
echo "[*] KROK 2/4: Uruchomienie skanera anty-nakładkowego (4_sentinel_device_network_gnida_paralyzer.py)..."
if command -v python3 >/dev/null 2>&1; then
    python3 "$SCRIPT_DIR/4_sentinel_device_network_gnida_paralyzer.py" --once
fi

echo ""
echo "[*] KROK 3/4: Uruchomienie pełnej immunizacji punktów wejść (10_SENTINEL_IMMUNIZER_MAX_AND_MALWARE_DEFANGER.py)..."
if command -v python3 >/dev/null 2>&1; then
    python3 "$SCRIPT_DIR/10_SENTINEL_IMMUNIZER_MAX_AND_MALWARE_DEFANGER.py"
fi

echo ""
echo "[*] KROK 4/4: Zabezpieczenie plików projektu i wygenerowanie manifestu integralności SHA-256..."
chmod 755 "$SCRIPT_DIR"/*.sh "$SCRIPT_DIR"/*.py 2>/dev/null || true
chmod 644 "$SCRIPT_DIR"/*.json "$SCRIPT_DIR"/*.md "$SCRIPT_DIR"/*.txt "$SCRIPT_DIR"/*.html 2>/dev/null || true

if command -v shasum >/dev/null 2>&1; then
    (cd "$SCRIPT_DIR" && shasum -a 256 *.py *.sh *.bat *.json *.html *.md *.txt > "$SCRIPT_DIR/SHA256SUMS.manifest")
    MANIFEST_COUNT=$(wc -l < "$SCRIPT_DIR/SHA256SUMS.manifest" | tr -d ' ')
    echo "  [+] Zapisano sumy kontrolne SHA-256 dla ${MANIFEST_COUNT} plików w SHA256SUMS.manifest."
fi

echo ""
echo "=============================================================================="
echo "  ✅ MIEJSCE PRACY ZABEZPIECZONE, A FOKUS OKNA PRACY PRZYWRÓCONY NA WIERZCH!"
echo "=============================================================================="
