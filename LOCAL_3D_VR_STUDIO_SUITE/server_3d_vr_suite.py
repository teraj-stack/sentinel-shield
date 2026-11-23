#!/usr/bin/env python3
"""
Sentinel 3D & VR Local Offline Suite HTTP Server
Obsługuje główne Studio 3D/VR/VI/LiDAR oraz wszystkie 7 wyodrębnionych aplikacji Vite/React/Three.js
w 100% lokalnie z dysku twardego na porcie 127.0.0.1:8765.
"""
import os
import re
import sys
import mimetypes
import urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
HOST = "127.0.0.1"
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765

VITE_CLIENT_JS = b"""// Sentinel Offline Vite Client Stub
const sheets = new Map();
export function createHotContext(ownerPath) {
  return {
    accept() {},
    acceptExports() {},
    dispose() {},
    prune() {},
    invalidate() {},
    on() {},
    off() {},
    send() {},
    data: {}
  };
}
export function updateStyle(id, content) {
  let style = sheets.get(id);
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('data-vite-dev-id', id);
    document.head.appendChild(style);
    sheets.set(id, style);
  }
  style.textContent = content;
}
export function removeStyle(id) {
  const style = sheets.get(id);
  if (style) {
    style.remove();
    sheets.delete(id);
  }
}
export function injectQuery(url) {
  return url;
}
"""


class Sentinel3DVRRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT_DIR, **kwargs)

    def log_message(self, fmt, *args):
        # Zwięzłe logowanie lokalne
        sys.stdout.write(f"[Sentinel-3D-Server] {self.address_string()} - {fmt % args}\n")
        sys.stdout.flush()

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def _resolve_local_file(self, raw_path):
        parsed = urllib.parse.urlsplit(raw_path)
        clean_path = urllib.parse.unquote(parsed.path)

        # Direct hit on Vite client stub
        if clean_path.endswith("/@vite/client") or clean_path == "/@vite/client":
            return ("__VITE_CLIENT__", None)

        rel = clean_path.lstrip("/")
        candidate = os.path.join(ROOT_DIR, rel)

        if os.path.isdir(candidate):
            index_candidate = os.path.join(candidate, "index.html")
            if os.path.isfile(index_candidate):
                return ("FILE", index_candidate)

        if os.path.isfile(candidate):
            return ("FILE", candidate)

        # Fallback: check Referer header if an app requested a root-relative path (/src/..., /assets/..., etc.)
        referer = self.headers.get("Referer", "")
        m = re.search(r"/apps/([a-zA-Z0-9_-]+)/", referer)
        if m:
            app_slug = m.group(1)
            app_candidate = os.path.join(ROOT_DIR, "apps", app_slug, rel)
            if os.path.isfile(app_candidate):
                return ("FILE", app_candidate)

        return (None, None)

    def _detect_content_type(self, file_path, first_bytes):
        ext = os.path.splitext(file_path)[1].lower()
        if ext in (".js", ".mjs", ".ts", ".tsx", ".jsx"):
            return "application/javascript; charset=utf-8"

        # Vite dev modules (.css or .json?import compiled into ES modules)
        head_str = first_bytes[:120].decode("utf-8", "ignore").lstrip()
        if head_str.startswith((
            "import ",
            "import{",
            "export ",
            "const ",
            "var ",
            "let ",
            "// Sentinel Offline"
        )):
            return "application/javascript; charset=utf-8"

        if ext == ".html":
            return "text/html; charset=utf-8"
        if ext == ".css":
            return "text/css; charset=utf-8"
        if ext == ".json":
            return "application/json; charset=utf-8"
        if ext == ".svg":
            return "image/svg+xml"
        if ext == ".png":
            return "image/png"
        if ext in (".jpg", ".jpeg"):
            return "image/jpeg"
        if ext == ".webp":
            return "image/webp"

        guessed, _ = mimetypes.guess_type(file_path)
        return guessed or "application/octet-stream"

    def do_HEAD(self):
        self._handle_request(send_body=False)

    def do_GET(self):
        self._handle_request(send_body=True)

    def _handle_request(self, send_body=True):
        kind, target = self._resolve_local_file(self.path)

        if kind == "__VITE_CLIENT__":
            self.send_response(200)
            self.send_header("Content-Type", "application/javascript; charset=utf-8")
            self.send_header("Content-Length", str(len(VITE_CLIENT_JS)))
            self.end_headers()
            if send_body:
                self.wfile.write(VITE_CLIENT_JS)
            return

        if kind == "FILE" and target and os.path.isfile(target):
            with open(target, "rb") as f:
                data = f.read()
            ctype = self._detect_content_type(target, data[:160])
            self.send_response(200)
            self.send_header("Content-Type", ctype)
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            if send_body:
                self.wfile.write(data)
            return

        self.send_response(404)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        msg = f"404 Not Found (Local Offline Mode): {self.path}".encode("utf-8")
        self.send_header("Content-Length", str(len(msg)))
        self.end_headers()
        if send_body:
            self.wfile.write(msg)


if __name__ == "__main__":
    HTTPServer.allow_reuse_address = True
    httpd = HTTPServer((HOST, PORT), Sentinel3DVRRequestHandler)
    print(f"======================================================================")
    print(f" SENTINEL 3D & VR LOCAL SUITE SERVER AKTYWNY (100% OFFLINE)")
    print(f" Katalog główny : {ROOT_DIR}")
    print(f" Adres lokalny  : http://{HOST}:{PORT}/")
    print(f"======================================================================")
    sys.stdout.flush()
    httpd.serve_forever()

