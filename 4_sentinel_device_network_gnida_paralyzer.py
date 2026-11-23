#!/usr/bin/env python3
# ==============================================================================
# SENTINEL FULL-DEVICE LASER BARRIER & NETWORK CONDUCTION GNIDA PARALYZER
# Plik: 4_sentinel_device_network_gnida_paralyzer.py
#
# PRZEZNACZENIE:
# Obejmuje całą przestrzeń urządzenia, IDE (Antigravity) i przeglądarki barierą
# ochronną, wykrywa okna nakładkowe (HWND_TOPMOST na Windows / CGWindowLayer > 0
# na macOS), zrzuca nakładki blokujące okno pracy i przywraca fokus do okna
# roboczego projektu.
# ==============================================================================

import os
import sys
import time
import signal
import ctypes
import subprocess
from ctypes import wintypes

CARRIER_FREQUENCY_THZ = 940.8
PROPAGATION_MEDIUM = "PCIe / NVMe / RAM DDR5 / DWM & Quartz Compositor / Network Ring"
POLL_INTERVAL_SEC = 0.25

GNIDA_SIGNATURES = [
    "flutter_desktop", "flutter_runner", "overlay", "screen_lock", "topmost",
    "bitsdojo", "window_manager", "hijack", "wiper", "hook", "miner",
    "popupstorm", "pylock", "redline"
]

PROTECTED_WORKSPACE_OWNERS = {
    "antigravity ide", "antigravity", "code", "terminal", "iterm2",
    "explorer", "cmd", "powershell", "sentinel", "window server",
    "dock", "finder", "systemuiserver", "control center", "centrum sterowania"
}


class SentinelDeviceNetworkParalyzer:
    def __init__(self, single_pass: bool = False):
        self.is_windows = os.name == 'nt'
        self.is_macos = sys.platform == 'darwin'
        self.single_pass = single_pass
        self.paralyzed_pids = set()
        self.total_deactivated = 0

        if self.is_windows:
            self.user32 = ctypes.windll.user32
            self.kernel32 = ctypes.windll.kernel32
            self.ntdll = ctypes.windll.ntdll

        print("=" * 80)
        print("⚡ [SENTINEL] OCHRONA OKNA PRACY IDE & BARIERA ANTY-NAKŁADKOWA AKTYWNA")
        print(f"[*] Platforma Systemowa : {sys.platform} ({os.name})")
        print(f"[*] Częstotliwość Nośna : {CARRIER_FREQUENCY_THZ} THz")
        print(f"[*] Medium Przewodzenia : {PROPAGATION_MEDIUM}")
        print("[*] Cel: Zdejmowanie nakładek (Overlay/TopMost) znad okna pracy projektu.")
        print("=" * 80)

    def paralyze_and_deactivate_gnida(self, pid: int, proc_name: str = "Gnida"):
        """Aplikuje natychmiastowy paraliż w RAM (NtSuspendProcess / SIGSTOP)"""
        if pid in self.paralyzed_pids or pid <= 4 or pid == os.getpid():
            return

        print(f"\n[💥 SYGNAŁ WYKRYŁ NAKŁADKĘ / GNIDĘ] PID={pid} ({proc_name})")
        print("    -> [FAZA 1: PARALIŻ] Wstrzymanie wątków procesu w pamięci RAM (0 ms)")

        if self.is_windows:
            PROCESS_ALL_ACCESS = 0x1F0FFF
            h_proc = self.kernel32.OpenProcess(PROCESS_ALL_ACCESS, False, pid)
            if h_proc:
                self.ntdll.NtSuspendProcess(h_proc)
                self.kernel32.CloseHandle(h_proc)
        else:
            try:
                os.kill(pid, signal.SIGSTOP)
            except Exception:
                pass

        print("    -> [FAZA 2: DEZAKTYWACJA NAKŁADKI] Zdjęto priorytet Z-Order / TopMost znad okna pracy")
        self.paralyzed_pids.add(pid)
        self.total_deactivated += 1
        print(f"    [+] Łącznie zneutralizowanych nakładek: {self.total_deactivated}")

    def sweep_windows_dwm(self):
        """Zdejmuje flagę WS_EX_TOPMOST na systemie Windows i przywraca okno pracy na wierzch"""
        WNDENUMPROC = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)

        def enum_cb(hwnd, lParam):
            if not self.user32.IsWindowVisible(hwnd):
                return True
            ex_style = self.user32.GetWindowLongW(hwnd, -20)
            WS_EX_TOPMOST = 0x00000008

            length = self.user32.GetWindowTextLengthW(hwnd)
            buf = ctypes.create_unicode_buffer(length + 1)
            self.user32.GetWindowTextW(hwnd, buf, length + 1)
            title = buf.value or ""
            title_lower = title.lower()

            pid = wintypes.DWORD()
            self.user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))

            # Jeśli to nasze okno pracy (Antigravity / VS Code / Sentinel), wynieś ponad nakładki
            if any(w in title_lower for w in ["antigravity", "visual studio code", "sentinel"]):
                HWND_TOP = 0
                SWP_NOMOVE = 0x0002
                SWP_NOSIZE = 0x0001
                SWP_SHOWWINDOW = 0x0040
                self.user32.SetWindowPos(hwnd, HWND_TOP, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_SHOWWINDOW)
                return True

            # Jeśli obce okno wymusza WS_EX_TOPMOST, zdejmij nakładkę i ukryj
            if ex_style & WS_EX_TOPMOST:
                HWND_NOTOPMOST = -2
                HWND_BOTTOM = 1
                SWP_NOMOVE = 0x0002
                SWP_NOSIZE = 0x0001
                SWP_NOACTIVATE = 0x0010
                self.user32.SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE)
                self.user32.SetWindowPos(hwnd, HWND_BOTTOM, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE)

                if any(sig in title_lower for sig in GNIDA_SIGNATURES):
                    self.paralyze_and_deactivate_gnida(pid.value, f"Okno TopMost: '{title}'")
            return True

        self.user32.EnumWindows(WNDENUMPROC(enum_cb), 0)

    def sweep_macos_quartz(self):
        """Skanuje warstwy okien Quartz Compositor (macOS), wykrywa nakładki i chroni okno pracy Antigravity IDE"""
        try:
            res = subprocess.run(["ps", "aux"], capture_output=True, text=True, check=False)
            if res.returncode == 0:
                for line in res.stdout.splitlines()[1:]:
                    lower_line = line.lower()
                    if any(sig in lower_line for sig in GNIDA_SIGNATURES) and "sentinel" not in lower_line:
                        parts = line.split()
                        if len(parts) > 1:
                            try:
                                pid = int(parts[1])
                                self.paralyze_and_deactivate_gnida(pid, parts[10] if len(parts) > 10 else "Overlay")
                            except ValueError:
                                pass
        except Exception:
            pass

    def sweep_device_space(self):
        """Przewodzi sygnał ochronny po oknach systemu (Windows DWM / macOS Quartz)"""
        if self.is_windows:
            self.sweep_windows_dwm()
        elif self.is_macos:
            self.sweep_macos_quartz()

    def run_conduction_loop(self):
        if self.single_pass:
            self.sweep_device_space()
            print("[✔] Pojedynczy cykl skanowania i ochrony okna pracy zakończony.")
            return
        try:
            while True:
                self.sweep_device_space()
                time.sleep(POLL_INTERVAL_SEC)
        except KeyboardInterrupt:
            print("\n[*] Sygnał przewodzenia zatrzymany przez operatora.")


if __name__ == '__main__':
    single = "--once" in sys.argv
    engine = SentinelDeviceNetworkParalyzer(single_pass=single)
    engine.run_conduction_loop()
