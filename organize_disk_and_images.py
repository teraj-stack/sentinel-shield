#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Porządkowanie dysku twardego:
1. Usunięcie zrzutów ekranu (Zrzut ekranu / Screenshot / Screen Shot) oraz duplikatów folderów *-kopia*.
2. Posegregowanie wszystkich obrazów według klucza:
   - Budynki
   - Aplikacja
   - Ikony
   - Wnętrza
   wraz z deduplikacją po sumie kontrolnej SHA-256.
"""

import os
import sys
import shutil
import hashlib
import json

PICTURES_DIR = "/Users/krzysztofjarzyna/Pictures"
DOWNLOADS_DIR = "/Users/krzysztofjarzyna/Downloads"
DESKTOP_DIR = "/Users/krzysztofjarzyna/Desktop"

TARGET_CATEGORIES = {
    "Budynki": os.path.join(PICTURES_DIR, "Budynki"),
    "Aplikacja": os.path.join(PICTURES_DIR, "Aplikacja"),
    "Ikony": os.path.join(PICTURES_DIR, "Ikony"),
    "Wnętrza": os.path.join(PICTURES_DIR, "Wnętrza"),
}

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".heic", ".svg", ".ico", ".icns", ".bmp", ".tiff"}

# Istniejące podkatalogi w ~/Pictures przypisane do 4 głównych kategorii
EXISTING_FOLDER_MAP = {
    "buildings": "Budynki",
    "cities": "Budynki",
    "mobile app": "Aplikacja",
    "dashboard": "Aplikacja",
    "Apps": "Aplikacja",
    "ikony": "Ikony",
    "IKONY2": "Ikony",
    "glass": "Ikony",
    "glasss": "Ikony",
    "future": "Ikony",
    "BM clinic": "Wnętrza",
    "desing of clinic": "Wnętrza",
    "doszyński": "Wnętrza",
    "doszyński": "Wnętrza",
    "Paralexa outdoor of clinic:view in windows": "Wnętrza",
}

KEYWORDS_IKONY = [
    "icon", "ikona", "ikony", "logo", "isometric", "3d illustration", "3d rendering",
    "shield", "badge", "symbol", "vector", "sculpture", "glass", "chrome hand",
    "sphere", "cube", "orb", "button", "coin", "token", "avatar", "sticker",
    "emoji", "sculpt", "prisma", "vlastimil", "beránek", "beranek", "on the wing",
    "innocence", "shirazeh", "3d_", "qrcode", "qr_code",
]

KEYWORDS_APLIKACJA = [
    "ui", "ux", "app", "dashboard", "website", "web design", "mockup", "figma",
    "фигм", "dribbble", "heimaux", "interface", "mobile", "header", "footer",
    "portfolio", "banner", "poster", "презентац", "powerpoint", "ai studio",
    "holoarch", "parallax3d", "vortexvr", "bot", "agent", "trading", "clyhealth",
    "core medicine", "voice assistant", "dark mode", "glassmorphism", "ad variation",
    "utm ", "data breach", "koddpa", "microsoft 365", "toss", "fristal", "game news",
    "hiking", "household energy", "casino", "aistudio", "creator studio", "obrazek apple creator studio",
    "uploaded_image", "design award", "apinny", "magnific", "gogoro", "styleframes",
    "leaky gut", "bauchfett", "ositree", "prebiotic", "raphalx", "product look",
]

KEYWORDS_WNETRZA = [
    "interior", "wnętrz", "wnetrz", "clinic", "klinik", "lobby", "room", "pokój",
    "pokoj", "salon", "bedroom", "kitchen", "bathroom", "furniture", "meble",
    "sofa", "chair", "table", "ceiling", "corridor", "korytarz", "gabinet",
    "recepcja", "reception", "surgery", "hospital", "covet house", "lovegrove",
    "w_narożniku", "w_narozniku", "pomieszczenia", "window", "indoors", "inside",
    "biuro", "apartment", "penthouse", "loft", "dining", "lounge",
]

KEYWORDS_BUDYNKI = [
    "tower", "skyscraper", "building", "arch", "architecture", "architect", "facade",
    "exterior", "city", "cities", "plaza", "center", "centre", "complex", "supertall",
    "megatall", "high rise", "high-rise", "storey", "floors", "tallest", "urban",
    "cbd", "headquarters", "hotel", "pavilion", "bridge", "stadium", "museum",
    "airport", "station", "condo", "residential", "commercial", "shenzhen", "shanghai",
    "chongqing", "beijing", "dubai", "new york", "seoul", "tokyo", "london", "paris",
    "warsaw", "spire", "minsk", "tel aviv", "baku", "doha", "miami", "chicago",
    "atlanta", "vancouver", "toronto", "melbourne", "sydney", "frankfurt", "vienna",
    "taiwan", "hangzhou", "nanning", "zhuhai", "wuxi", "dalian", "haikou", "ningbo",
    "karachi", "colombo", "moscow", "lakhta", "zaha hadid", "foster", "aedas", "som",
    "kpf", "mad architects", "nikken", "gmp", "henn", "dewan", "asymptote",
    "wolkenkrabber", "grattacieli", "torre", "bâtiment", "batiment", "здани",
    "建筑", "大厦", "中心", "타워", "건축", "wijk", "kempinski", "st_regis", "damac",
    "al hamra", "wasl", "one central", "barangaroo", "yongsan", "citic", "sunac",
]


def sha256_file(path):
    h = hashlib.sha256()
    try:
        with open(path, "rb") as f:
            while True:
                chunk = f.read(65536)
                if not chunk:
                    break
                h.update(chunk)
        return h.hexdigest()
    except Exception:
        return None


def is_screenshot(filename):
    low = filename.lower()
    if any(k in low for k in ["zrzut ekranu", "zrzut_ekranu", "screenshot", "screen shot"]):
        return True
    return False


def classify_image(filename, source_hint=""):
    low = filename.lower()
    if any(k in low for k in KEYWORDS_WNETRZA):
        return "Wnętrza"
    if any(k in low for k in KEYWORDS_IKONY):
        return "Ikony"
    if any(k in low for k in KEYWORDS_APLIKACJA):
        return "Aplikacja"
    if any(k in low for k in KEYWORDS_BUDYNKI):
        return "Budynki"
    if source_hint == "Downloads":
        # W Downloads znajdują się głównie kolekcje wieżowców i architektury z Pinterest
        return "Budynki"
    return "Aplikacja"


def safe_move_into_category(src_path, category, seen_hashes, stats):
    if not os.path.isfile(src_path):
        return
    file_hash = sha256_file(src_path)
    if file_hash and file_hash in seen_hashes:
        # Duplikat identycznego obrazu -> usuwamy nadmiarową kopię
        try:
            os.remove(src_path)
            stats["duplicates_removed"] += 1
        except Exception:
            pass
        return

    dest_dir = TARGET_CATEGORIES[category]
    os.makedirs(dest_dir, exist_ok=True)
    base = os.path.basename(src_path)
    dest_path = os.path.join(dest_dir, base)

    if os.path.abspath(src_path) == os.path.abspath(dest_path):
        if file_hash:
            seen_hashes[file_hash] = dest_path
        stats["sorted_counts"][category] += 1
        return

    if os.path.exists(dest_path):
        existing_hash = sha256_file(dest_path)
        if existing_hash == file_hash:
            try:
                os.remove(src_path)
                stats["duplicates_removed"] += 1
            except Exception:
                pass
            if file_hash:
                seen_hashes[file_hash] = dest_path
            return
        name_part, ext_part = os.path.splitext(base)
        idx = 2
        while os.path.exists(dest_path):
            dest_path = os.path.join(dest_dir, f"{name_part}_{idx}{ext_part}")
            idx += 1

    try:
        shutil.move(src_path, dest_path)
        if file_hash:
            seen_hashes[file_hash] = dest_path
        stats["sorted_counts"][category] += 1
    except Exception as e:
        stats["errors"].append(f"{src_path}: {e}")


def main():
    stats = {
        "screenshots_removed": [],
        "duplicate_sentinel_folders_removed": 0,
        "duplicates_removed": 0,
        "html_sidecars_removed": 0,
        "sorted_counts": {k: 0 for k in TARGET_CATEGORIES},
        "errors": [],
    }

    for cat_dir in TARGET_CATEGORIES.values():
        os.makedirs(cat_dir, exist_ok=True)

    seen_hashes = {}
    hash_to_category = {}
    name_to_category = {}

    # 1. Usuwamy zrzuty ekranu (Zrzut ekranu / Screenshot) w Pictures, Downloads, Desktop
    for root_dir in [PICTURES_DIR, DOWNLOADS_DIR, DESKTOP_DIR]:
        if not os.path.exists(root_dir):
            continue
        for dp, dn, fn in os.walk(root_dir):
            # Nie wchodzimy do Xcode_27.1, .venv, Photos Library, .tmp.driveupload
            dn[:] = [
                d for d in dn
                if d not in {"Xcode_27.1", ".venv", ".tmp.driveupload", ".tmp.drivedownload", "frejmy", "Prokurator"}
                and not d.endswith(".photoslibrary")
            ]
            for f in fn:
                full_p = os.path.join(dp, f)
                if is_screenshot(f):
                    try:
                        os.remove(full_p)
                        stats["screenshots_removed"].append(full_p)
                    except Exception as e:
                        stats["errors"].append(f"Screenshot remove {full_p}: {e}")

    # 2. Przenosimy obrazy z istniejących podkatalogów tematycznych w ~/Pictures do 4 głównych folderów:
    #    Budynki, Aplikacja, Ikony, Wnętrza
    for folder_name, target_cat in EXISTING_FOLDER_MAP.items():
        folder_path = os.path.join(PICTURES_DIR, folder_name)
        if not os.path.isdir(folder_path):
            continue
        for dp, dn, fn in os.walk(folder_path):
            dn[:] = [d for d in dn if not d.endswith(".photoslibrary")]
            for f in fn:
                full_p = os.path.join(dp, f)
                ext = os.path.splitext(f)[1].lower()
                if ext in IMAGE_EXTS:
                    h = sha256_file(full_p)
                    if h:
                        hash_to_category[h] = target_cat
                    name_to_category[f] = target_cat
                    safe_move_into_category(full_p, target_cat, seen_hashes, stats)
                elif f == ".DS_Store":
                    try:
                        os.remove(full_p)
                    except Exception:
                        pass

        # Usuwamy puste podkatalogi po przeniesieniu obrazów
        for dp, dn, fn in os.walk(folder_path, topdown=False):
            try:
                if not os.listdir(dp):
                    os.rmdir(dp)
            except Exception:
                pass

    # 3. Przenosimy obrazy z podkatalogów Apple Creator Studio i UploadedImages_* w ~/Pictures
    for item in os.listdir(PICTURES_DIR):
        item_p = os.path.join(PICTURES_DIR, item)
        if os.path.isdir(item_p) and (item.startswith("Obrazek Apple Creator Studio") or item.startswith("UploadedImages_")):
            for dp, dn, fn in os.walk(item_p, topdown=False):
                for f in fn:
                    full_p = os.path.join(dp, f)
                    ext = os.path.splitext(f)[1].lower()
                    if ext in IMAGE_EXTS:
                        cat = hash_to_category.get(sha256_file(full_p)) or classify_image(f, "Pictures")
                        safe_move_into_category(full_p, cat, seen_hashes, stats)
                    elif f == ".DS_Store":
                        try:
                            os.remove(full_p)
                        except Exception:
                            pass
                try:
                    if not os.listdir(dp):
                        os.rmdir(dp)
                except Exception:
                    pass

    # 4. Segregujemy luźne obrazy z głównego katalogu ~/Pictures
    for item in os.listdir(PICTURES_DIR):
        full_p = os.path.join(PICTURES_DIR, item)
        if not os.path.isfile(full_p):
            continue
        ext = os.path.splitext(item)[1].lower()
        if ext in IMAGE_EXTS:
            h = sha256_file(full_p)
            cat = (
                hash_to_category.get(h)
                or name_to_category.get(item)
                or classify_image(item, "Pictures")
            )
            safe_move_into_category(full_p, cat, seen_hashes, stats)
        elif ext == ".html" and item.split(".")[0].isdigit():
            try:
                os.remove(full_p)
                stats["html_sidecars_removed"] += 1
            except Exception:
                pass

    # 5. Segregujemy obrazy z ~/Downloads (w tym ~/Downloads/obrazy, ~/Downloads/pinter, ~/Downloads/Archiwum 2)
    downloads_image_Lock_dirs = [
        DOWNLOADS_DIR,
        os.path.join(DOWNLOADS_DIR, "obrazy"),
        os.path.join(DOWNLOADS_DIR, "pinter"),
        os.path.join(DOWNLOADS_DIR, "Archiwum 2"),
    ]
    for ddir in downloads_image_Lock_dirs:
        if not os.path.isdir(ddir):
            continue
        for item in os.listdir(ddir):
            full_p = os.path.join(ddir, item)
            if not os.path.isfile(full_p):
                continue
            ext = os.path.splitext(item)[1].lower()
            if ext in IMAGE_EXTS:
                h = sha256_file(full_p)
                cat = (
                    hash_to_category.get(h)
                    or name_to_category.get(item)
                    or classify_image(item, "Downloads")
                )
                safe_move_into_category(full_p, cat, seen_hashes, stats)
            elif ext == ".html" and item.split(".")[0].replace("-", "").isdigit():
                try:
                    os.remove(full_p)
                    stats["html_sidecars_removed"] += 1
                except Exception:
                    pass

        if ddir != DOWNLOADS_DIR:
            try:
                # Usuń .DS_Store jeśli to jedyny plik
                ds = os.path.join(ddir, ".DS_Store")
                if os.path.exists(ds) and len(os.listdir(ddir)) == 1:
                    os.remove(ds)
                if not os.listdir(ddir):
                    os.rmdir(ddir)
            except Exception:
                pass

    # 6. Porządkujemy powielone pakiety *-kopia* w ~/Downloads i ~/Pictures (zachowując oryginały)
    for root_dir in [DOWNLOADS_DIR, PICTURES_DIR]:
        for item in os.listdir(root_dir):
            full_p = os.path.join(root_dir, item)
            if os.path.isdir(full_p) and (
                "SENTINEL_SHIELD_KOMPLETNY_PAKIET_BADAWCZY_OFFLINE-kopia" in item
                or "SENTINEL_WSZYSTKIE_SKRYPTY_UBOJU_OFFLINE" in item and "-kopia" in item
                or "SENTINEL_SYSTEM_IMMUNIZATION_BUNDLE_" in item and (" 2" in item or " 3" in item or "(1)" in item)
            ):
                try:
                    shutil.rmtree(full_p)
                    stats["duplicate_sentinel_folders_removed"] += 1
                except Exception as e:
                    stats["errors"].append(f"Folder remove {full_p}: {e}")

    report_path = "/Users/krzysztofjarzyna/.gemini/antigravity/scratch/sentinel_shield/cleanup_report.json"
    with open(report_path, "w") as f:
        json.dump(stats, f, indent=2, ensure_ascii=False)

    print("=== PODSUMOWANIE PORZĄDKOWANIA DYSKU ===")
    print(f"Usunięte zrzuty ekranu: {len(stats['screenshots_removed'])}")
    for s in stats["screenshots_removed"]:
        print(f"  - {s}")
    print(f"Usunięte zduplikowane obrazy (identyczne SHA-256): {stats['duplicates_removed']}")
    print(f"Usunięte pliki pomocnicze Pinterest (.html): {stats['html_sidecars_removed']}")
    print(f"Usunięte powielone katalogi *-kopia*: {stats['duplicate_sentinel_folders_removed']}")
    print("Posegregowane unikalne obrazy w ~/Pictures:")
    for k, v in stats["sorted_counts"].items():
        actual_count = len([x for x in os.listdir(TARGET_CATEGORIES[k]) if not x.startswith(".")])
        print(f"  - {k} ({TARGET_CATEGORIES[k]}): {actual_count} plików")
    print(f"Błędy: {len(stats['errors'])}")


if __name__ == "__main__":
    main()
