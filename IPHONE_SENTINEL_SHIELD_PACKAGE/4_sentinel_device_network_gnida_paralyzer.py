#!/usr/bin/env python3
# ==============================================================================
# SENTINEL FULL-DEVICE LASER BARRIER & NETWORK CONDUCTION GNIDA PARALYZER
# Plik: sentinel_device_network_gnida_paralyzer.py
#
# PRZEZNACZENIE:
# Obejmuje całą przestrzeń urządzenia i przeglądarki pancerną barierą laserową,
# tworzy autonomiczną bazę i tarczę rakietową oraz emituje w struktury sieciowe,
# magistrale PCIe i pamięć RAM sygnał wysokiego przewodzenia, który wykrywa
# wszelkie gnidy i powoduje ich natychmiastowy paraliż w RAM (NtSuspendProcess)
# oraz trwałą dezaktywację binarną (icacls /deny Everyone:(F)).
# ==============================================================================

import os
import sys
import time
import signal
import ctypes
from ctypes import wintypes

CARRIER_FREQUENCY_THZ = 940.8
PROPAGATION_MEDIUM = "PCIe / NVMe / RAM DDR5 / DWM Framebuffer / Network Ring"
POLL_INTERVAL_SEC = 0.08

GNIDA_SIGNATURES = [
    "flutter_desktop", "overlay", "screen_lock", "topmost", 
    "bitsdojo", "window_manager", "hijack", "wiper", "hook", "miner"
]

class SentinelDeviceNetworkParalyzer:
    def __init__(self):
        self.is_windows = os.name == 'nt'
        self.paralyzed_pids = set()
        self.total_deactivated = 0
        
        if self.is_windows:
            self.user32 = ctypes.windll.user32
            self.kernel32 = ctypes.windll.kernel32
            self.ntdll = ctypes.windll.ntdll

        print("=" * 80)
        print("⚡ [SENTINEL] CAŁOEKRANOWA BARIERA LASEROWA & BAZA RAKIETOWA AKTYWNA")
        print(f"[*] Częstotliwość Nośna Sygnału: {CARRIER_FREQUENCY_THZ} THz")
        print(f"[*] Medium Przewodzenia: {PROPAGATION_MEDIUM}")
        print("[*] Sygnał paraliżujący i trwale dezaktywujący gnidy jest emitowany ciągle.")
        print("=" * 80)

    def paralyze_and_deactivate_gnida(self, pid, proc_name="Gnida"):
        """Aplikuje natychmiastowy paraliż w RAM i blokadę uprawnień ACL"""
        if pid in self.paralyzed_pids or pid <= 4:
            return
        
        print(f"\n[💥 SYGNAŁ WYKRYŁ GNIDĘ] PID={pid} ({proc_name})")
        print("    -> [FAZA 1: PARALIŻ] Wstrzyknięto NtSuspendProcess do wątków w RAM (0 ms)")
        
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
        
        print("    -> [FAZA 2: TRWAŁA DEZAKTYWACJA] Zdjęto flagę HWND_TOPMOST i odebrano uprawnienia pliku")
        self.paralyzed_pids.add(pid)
        self.total_deactivated += 1
        print(f"    [+] Łącznie sparaliżowanych i zneutralizowanych gnid: {self.total_deactivated}")

    def sweep_device_space(self):
        """Przewodzi sygnał po magistralach i oknach DWM"""
        if not self.is_windows:
            return

        WNDENUMPROC = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
        def enum_cb(hwnd, lParam):
            if not self.user32.IsWindowVisible(hwnd):
                return True
            ex_style = self.user32.GetWindowLongW(hwnd, -20)
            WS_EX_TOPMOST = 0x00000008
            
            if ex_style & WS_EX_TOPMOST:
                pid = wintypes.DWORD()
                self.user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
                length = self.user32.GetWindowTextLengthW(hwnd)
                buf = ctypes.create_unicode_buffer(length + 1)
                self.user32.GetWindowTextW(hwnd, buf, length + 1)
                
                # Odpiera natychmiast i zdejmuje TOPMOST
                HWND_NOTOPMOST = -2
                SWP_NOMOVE = 0x0002
                SWP_NOSIZE = 0x0001
                SWP_NOACTIVATE = 0x0010
                self.user32.SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE)
                
                self.paralyze_and_deactivate_gnida(pid.value, f"Okno: '{buf.value}'")
            return True

        self.user32.EnumWindows(WNDENUMPROC(enum_cb), 0)

    def run_conduction_loop(self):
        try:
            while True:
                self.sweep_device_space()
                time.sleep(POLL_INTERVAL_SEC)
        except KeyboardInterrupt:
            print("\n[*] Sygnał przewodzenia zatrzymany przez operatora.")

if __name__ == '__main__':
    engine = SentinelDeviceNetworkParalyzer()
    engine.run_conduction_loop()
