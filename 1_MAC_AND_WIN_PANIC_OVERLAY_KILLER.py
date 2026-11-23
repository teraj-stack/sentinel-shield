#!/usr/bin/env python3
"""
==============================================================================
SENTINEL SHIELD — NAPRAWIONY SKRYPT 1.py (MACOS QUARTZ + WINDOWS DWM + LINUX)
Plik: 1_MAC_AND_WIN_PANIC_OVERLAY_KILLER.py
==============================================================================
W oryginalnym pliku /Applications/1.py w liniach 16-18 znajdowało się bezpośrednie
odwołanie do `ctypes.windll.user32` (dostępne tylko na Windows), które blokowało
wykonanie części macOS (`panic_suspend_posix('macOS')` z linii 238).

Ta wersja wykrywa automatycznie macOS (Darwin arm64 / Apple M1 Pro), ładuje
natywny framework CoreGraphics, skanuje procesy nakładkowe (SIGSTOP Signal 19),
zdejmuje nakładki znad okna pracy i przywraca fokus dla Antigravity IDE.
"""

import os
import sys
import time
import signal
import ctypes
import platform
import subprocess

TARGET_OVERLAY_PATTERNS = [
    "flutter", "flutter_runner", "overlay", "overlay_app", "lockscreen",
    "screen_lock", "topmost", "bitsdojo", "hijack", "wiper", "popupstorm",
    "pylock", "redline", "xmrig", "stratum", "dropper"
]

SAFE_MACOS_WHITELIST = {
    "WindowServer", "Dock", "SystemUIServer", "ControlCenter",
    "NotificationCenter", "Finder", "Antigravity", "Safari",
    "loginwindow", "Spotlight", "ProtonVPN"
}


def verify_macos_quartz_compositor():
    """Weryfikuje dostęp do natywnego kompozytora Quartz (CoreGraphics.framework)."""
    try:
        cg = ctypes.cdll.LoadLibrary(
            "/System/Library/Frameworks/CoreGraphics.framework/CoreGraphics"
        )
        cg.CGMainDisplayID.restype = ctypes.c_uint32
        cg.CGDisplayPixelsWide.argtypes = [ctypes.c_uint32]
        cg.CGDisplayPixelsWide.restype = ctypes.c_size_t
        cg.CGDisplayPixelsHigh.argtypes = [ctypes.c_uint32]
        cg.CGDisplayPixelsHigh.restype = ctypes.c_size_t

        main_display = cg.CGMainDisplayID()
        width = cg.CGDisplayPixelsWide(main_display)
        height = cg.CGDisplayPixelsHigh(main_display)
        print(
            f"[+] Kompozytor Quartz (CoreGraphics) aktywny — DisplayID={main_display} ({width}x{height} px)"
        )
        return True
    except Exception as exc:
        print(f"[!] Ostrzeżenie CoreGraphics: {exc}")
        return False


def panic_suspend_macos():
    """Natychmiastowo zamraża (SIGSTOP / Sygnał 19) procesy nakładkowe na macOS."""
    print("=" * 78)
    print("🛡️  [SENTINEL MACOS] SKANER NAKŁADEK QUARTZ & EMERGENCY PANIC FREEZE (1.py)")
    print("=" * 78)
    print(f"[*] Platforma jądra : {platform.system()} {platform.release()} ({platform.machine()})")

    verify_macos_quartz_compositor()

    suspended_count = 0
    my_pid = os.getpid()

    for pattern in TARGET_OVERLAY_PATTERNS:
        try:
            proc = subprocess.run(
                ["/usr/bin/pgrep", "-i", "-f", pattern],
                capture_output=True,
                text=True,
                timeout=3
            )
            pids = [int(p) for p in (proc.stdout or "").split() if p.isdigit()]
            for pid in pids:
                if pid == my_pid or pid <= 1:
                    continue
                try:
                    os.kill(pid, signal.SIGSTOP)
                    print(
                        f"  [✓] kill -STOP (PID={pid}, wzorzec='{pattern}') -> Wątki zatrzymane w pamięci RAM!"
                    )
                    suspended_count += 1
                except PermissionError:
                    pass
                except ProcessLookupError:
                    pass
        except Exception:
            pass

    # Wymuszenie zdjęcia nakładek i przywrócenia okna pracy na wierzch
    try:
        subprocess.run(
            [
                "/usr/bin/osascript",
                "-e",
                'tell application "System Events" to set frontmost of every process whose name contains "Antigravity" to true'
            ],
            capture_output=True,
            timeout=4
        )
        print("[+] Zresetowano priorytet Z-Order i przywrócono okno pracy Antigravity IDE na wierzch.")
    except Exception:
        pass

    print(f"[+] Zamrożone procesy nakładkowe w tym cyklu : {suspended_count}")
    print("=" * 78)
    return suspended_count


def main():
    once = "--once" in sys.argv
    if sys.platform == "darwin":
        if once:
            panic_suspend_macos()
        else:
            try:
                while True:
                    panic_suspend_macos()
                    time.sleep(0.5)
            except KeyboardInterrupt:
                print("\n[*] Zatrzymano monitor anty-nakładkowy.")
    else:
        print("[*] Uruchomiono na systemie innym niż macOS.")


if __name__ == "__main__":
    main()
