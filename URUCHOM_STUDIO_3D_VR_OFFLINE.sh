#!/bin/zsh
# ==============================================================================
# SENTINEL 3D & VR SPATIAL STUDIO — SKRYPT URUCHOMIENIOWY 100% OFFLINE
# Uruchamia lokalny serwer HTTP na 127.0.0.1:8765 i otwiera aplikację w Safari.
# ==============================================================================

SUITE_DIR="/Users/krzysztofjarzyna/.gemini/antigravity/scratch/sentinel_shield/LOCAL_3D_VR_STUDIO_SUITE"
SERVER_SCRIPT="/Users/krzysztofjarzyna/.gemini/antigravity/scratch/sentinel_shield/LOCAL_3D_VR_STUDIO_SUITE/server_3d_vr_suite.py"
PORT=8765

echo "[+] Sprawdzanie serwera lokalnego Sentinel 3D & VR Suite na porcie ${PORT}..."
if ! /usr/sbin/lsof -iTCP:${PORT} -sTCP:LISTEN >/dev/null 2>&1; then
  echo "[+] Uruchamianie serwera lokalnego: ${SERVER_SCRIPT}"
  /usr/bin/nohup /usr/bin/python3 "${SERVER_SCRIPT}" "${PORT}" >/tmp/sentinel_3d_vr_server.log 2>&1 &
  /bin/sleep 1
else
  echo "[+] Serwer już działa na 127.0.0.1:${PORT}"
fi

echo "[+] Otwieranie aplikacji 3D & VR w przeglądarce Safari..."
/usr/bin/open -a "/Applications/Safari.app" "http://127.0.0.1:${PORT}/"

