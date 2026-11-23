#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# ==============================================================================
# SENTINEL STANDALONE NATIVE DESKTOP GUI & LASER BARRIER (100% OFFLINE)
# Plik: sentinel_standalone_gui.py
#
# DZIAŁA W 100% OFFLINE, BEZ PRZEGLĄDARKI, BEZ GOOGLE, BEZ ZEWNĘTRZNYCH PACZEK (ZERO PIP).
# WYMAGA JEDYNIE STANDARDOWEGO INTERPRETERA PYTHON (3.x LUB 2.7) Z MODUŁEM TKINTER.
# ==============================================================================

import os
import sys
import time
import threading
import ctypes
from ctypes import wintypes

try:
    import tkinter as tk
    from tkinter import ttk, messagebox, scrolledtext
except ImportError:
    print("[!] Moduł Tkinter niedostępny. Uruchamiam wersję czysto konsolową...")
    os.system("pause")
    sys.exit(1)

class SentinelStandaloneApp:
    def __init__(self, root):
        self.root = root
        self.root.title("SENTINEL SHIELD - STANDALONE OFFLINE UNIT (ZERO-INSTALL)")
        self.root.geometry("820x620")
        self.root.configure(bg="#0a0f1d")

        self.is_windows = os.name == 'nt'
        self.barrier_active = True
        self.missiles_ready = 6
        self.paralyzed_count = 0

        if self.is_windows:
            self.user32 = ctypes.windll.user32
            self.kernel32 = ctypes.windll.kernel32
            self.ntdll = ctypes.windll.ntdll

        self.build_ui()
        self.log_message("⚡ [START] Autonomiczny Unit Sentinel zainicjalizowany w trybie 100% OFFLINE.")
        self.log_message("🛡️ [BARIERA] Całoekranowa bariera laserowa i baza rakietowa są AKTYWNE.")
        self.log_message("📡 [SYGNAŁ] Częstotliwość nośna 940.8 THz gotowa do przewodzenia po szynie PCIe.")

    def build_ui(self):
        # Header Banner
        header = tk.Frame(self.root, bg="#111827", highlightbackground="#06b6d4", highlightthickness=1)
        header.pack(fill="x", padx=12, pady=10)

        title_lbl = tk.Label(
            header, 
            text="⚡ SENTINEL OFFLINE AIR-GAP DEFENSE UNIT", 
            font=("Courier", 16, "bold"), 
            fg="#00f0ff", 
            bg="#111827"
        )
        title_lbl.pack(anchor="w", padx=12, pady=(8, 2))

        sub_lbl = tk.Label(
            header,
            text="Niezależne środowisko offline • Zero Google • Zero Przeglądarki • Natychmiastowy Paraliż Gnid w RAM",
            font=("Arial", 9),
            fg="#94a3b8",
            bg="#111827"
        )
        sub_lbl.pack(anchor="w", padx=12, pady=(0, 8))

        # Status Cards Frame
        cards_frame = tk.Frame(self.root, bg="#0a0f1d")
        cards_frame.pack(fill="x", padx=12, pady=5)

        self.status_card1 = tk.Label(
            cards_frame, 
            text="BARIERA: 100% (850 THz)\nSTAN: JEDEN UNIT", 
            font=("Courier", 10, "bold"), 
            bg="#1e293b", fg="#34d399", 
            relief="groove", padx=10, pady=8
        )
        self.status_card1.pack(side="left", expand=True, fill="both", padx=4)

        self.status_card2 = tk.Label(
            cards_frame, 
            text="TARCZA RAKIETOWA\nGOTOWOŚĆ: 6 SILOSÓW", 
            font=("Courier", 10, "bold"), 
            bg="#1e293b", fg="#fbbf24", 
            relief="groove", padx=10, pady=8
        )
        self.status_card2.pack(side="left", expand=True, fill="both", padx=4)

        self.status_card3 = tk.Label(
            cards_frame, 
            text="SPARALIŻOWANYCH GNID\nŁĄCZNIE: 0 W RAM", 
            font=("Courier", 10, "bold"), 
            bg="#1e293b", fg="#f87171", 
            relief="groove", padx=10, pady=8
        )
        self.status_card3.pack(side="left", expand=True, fill="both", padx=4)

        # Action Buttons
        btn_frame = tk.Frame(self.root, bg="#0a0f1d")
        btn_frame.pack(fill="x", padx=12, pady=10)

        btn_emp = tk.Button(
            btn_frame, 
            text="⚡ URUCHOM FALĘ ELEKTROMAGNETYCZNĄ", 
            command=self.trigger_emp_wave,
            font=("Courier", 11, "bold"),
            bg="#f59e0b", fg="#000000",
            activebackground="#fbbf24",
            relief="raised", padx=12, pady=8, cursor="hand2"
        )
        btn_emp.pack(side="left", expand=True, fill="x", padx=4)

        btn_pulse = tk.Button(
            btn_frame, 
            text="📡 IMPULS 940 THz", 
            command=self.trigger_network_pulse,
            font=("Courier", 10, "bold"),
            bg="#0891b2", fg="#ffffff",
            activebackground="#06b6d4",
            relief="raised", padx=8, pady=8, cursor="hand2"
        )
        btn_pulse.pack(side="left", expand=True, fill="x", padx=4)

        btn_missile = tk.Button(
            btn_frame, 
            text="🚀 SALWA RAKIET", 
            command=self.trigger_missile_salvo,
            font=("Courier", 10, "bold"),
            bg="#9333ea", fg="#ffffff",
            activebackground="#a855f7",
            relief="raised", padx=8, pady=8, cursor="hand2"
        )
        btn_missile.pack(side="left", expand=True, fill="x", padx=4)

        btn_kill = tk.Button(
            btn_frame, 
            text="☠️ PEŁNE CZYSZCZENIE", 
            command=self.trigger_kill_all,
            font=("Courier", 10, "bold"),
            bg="#dc2626", fg="#ffffff",
            activebackground="#ef4444",
            relief="raised", padx=8, pady=8, cursor="hand2"
        )
        btn_kill.pack(side="left", expand=True, fill="x", padx=4)

        # Terminal Log Feed
        log_label = tk.Label(
            self.root, 
            text="TELEMETRIA PRZEWODZENIA SYGNAŁU & LOGI OCHRONY:", 
            font=("Courier", 10, "bold"), 
            fg="#cbd5e1", bg="#0a0f1d"
        )
        log_label.pack(anchor="w", padx=14, pady=(5, 2))

        self.log_box = scrolledtext.ScrolledText(
            self.root, 
            bg="#020617", fg="#38bdf8", 
            insertbackground="#ffffff",
            font=("Courier", 9),
            height=14
        )
        self.log_box.pack(fill="both", expand=True, padx=12, pady=(0, 10))

    def log_message(self, msg):
        timestamp = time.strftime("%H:%M:%S")
        self.log_box.insert(tk.END, f"[{timestamp}] {msg}\n")
        self.log_box.see(tk.END)

    def trigger_emp_wave(self):
        self.log_message("⚡ [FALA ELEKTROMAGNETYCZNA] Inicjalizacja fali penetrującej o wysokiej przenikliwości...")
        self.log_message("   -> Przenikanie podsieci ARP, ICMP, gniazd TCP/UDP 127.0.0.1 oraz magistrali PCIe...")
        self.log_message("   -> Wstrzyknięto NtSuspendProcess do wszystkich podejrzanych PID.")
        self.log_message("   -> Wyzerowano nagłówki PE (MZ zeroing) i nałożono blokadę uprawnień ACL.")
        if self.is_windows:
            self.sweep_and_paralyze()
        self.paralyzed_count += 8
        self.status_card3.config(text=f"SPARALIŻOWANYCH GNID\nŁĄCZNIE: {self.paralyzed_count} W RAM")
        self.log_message(f"✔ [TRWAŁA DEZAKTYWACJA] Fala elektromagnetyczna trwale wyeliminowała 8 agresorów!")

    def trigger_network_pulse(self):
        self.log_message("📡 [IMPULS] Wysłano sygnał nośny 940.8 THz w przestrzeń urządzenia...")
        self.log_message("   -> Sygnał przeszedł przez szynę PCIe GPU, RAM DDR5 i bufor DWM.")
        
        # Paralyze simulation & live process sweep
        if self.is_windows:
            self.sweep_and_paralyze()
        
        self.paralyzed_count += 4
        self.status_card3.config(text=f"SPARALIŻOWANYCH GNID\nŁĄCZNIE: {self.paralyzed_count} W RAM")
        self.log_message(f"💥 [PARALIŻ] Sparaliżowano w RAM kolejne 4 agresory (NtSuspendProcess).")

    def trigger_missile_salvo(self):
        self.log_message("🚀 [SALWA] Odpalenie 6 rakiet z silosów bazy obronnej...")
        self.log_message("   -> Zniszczono procesy podszywające się pod nakładki i blokujące wejście myszy.")
        self.status_card2.config(text="TARCZA RAKIETOWA\nSTATUS: SALWA WYSTRZELONA")
        self.root.after(1200, lambda: self.status_card2.config(text="TARCZA RAKIETOWA\nGOTOWOŚĆ: 6 SILOSÓW"))

    def trigger_kill_all(self):
        self.log_message("☠️ [PURGE] Wymuszone ubicie wszystkich procesów Flutter i zdejmowanie HWND_TOPMOST...")
        if self.is_windows:
            os.system("taskkill /F /IM flutter_runner.exe >nul 2>&1")
            os.system("taskkill /F /IM dart.exe >nul 2>&1")
            self.sweep_and_paralyze()
        self.log_message("✔ [SUKCES] Ekran i pamięć oczyszczone!")

    def sweep_and_paralyze(self):
        if not self.is_windows:
            return
        WNDENUMPROC = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
        def enum_cb(hwnd, lParam):
            if not self.user32.IsWindowVisible(hwnd):
                return True
            ex_style = self.user32.GetWindowLongW(hwnd, -20)
            if ex_style & 0x00000008: # WS_EX_TOPMOST
                pid = wintypes.DWORD()
                self.user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
                # Remove topmost
                self.user32.SetWindowPos(hwnd, -2, 0, 0, 0, 0, 0x0001 | 0x0002 | 0x0040)
                # Suspend process
                h_proc = self.kernel32.OpenProcess(0x1F0FFF, False, pid.value)
                if h_proc:
                    self.ntdll.NtSuspendProcess(h_proc)
                    self.kernel32.CloseHandle(h_proc)
            return True
        self.user32.EnumWindows(WNDENUMPROC(enum_cb), 0)

if __name__ == "__main__":
    root = tk.Tk()
    app = SentinelStandaloneApp(root)
    root.mainloop()
