#!/usr/bin/env python3
"""
scripts/chat_scanner.py
======================
Fast WhatsApp & Telegram Chat Scanner & Site Data Helper for herewego.
Allows instantaneous search across all archived and freshly downloaded chats
without running slow browser engines or manual unzipping.

Usage:
  python3 scripts/chat_scanner.py --today
  python3 scripts/chat_scanner.py --query "skinner"
  python3 scripts/chat_scanner.py --query "emergency" --date "10/1/26"
  python3 scripts/chat_scanner.py --sender "70666 08751"
  python3 scripts/chat_scanner.py --validate
"""

import os
import sys
import glob
import zipfile
import subprocess
from datetime import datetime

SCRATCH_DIR = "/Users/apple/.gemini/antigravity-cli/brain/e0a5a62f-ab9b-4eec-9c63-b8d53761ea35/scratch"
PROJECT_DIR = "/Users/apple/Downloads/Code Projects/herewego"

def find_all_chat_sources():
    sources = []
    # Search zip files and raw txt files in scratch
    for root, dirs, files in os.walk(SCRATCH_DIR):
        for f in files:
            path = os.path.join(root, f)
            if f.endswith(".zip") or (f.endswith(".txt") and "chat" in f.lower()):
                sources.append(path)
    return sources

def scan_text(lines, source_name, query=None, date_filter=None, sender_filter=None):
    results = []
    for line in lines:
        if date_filter and date_filter not in line:
            continue
        if sender_filter and sender_filter.lower() not in line.lower():
            continue
        if query and query.lower() not in line.lower():
            continue
        results.append((source_name, line))
    return results

def search_chats(query=None, date_filter=None, sender_filter=None):
    sources = find_all_chat_sources()
    all_results = []

    for path in sources:
        base = os.path.basename(path)
        if path.endswith(".zip"):
            try:
                with zipfile.ZipFile(path, "r") as z:
                    for name in z.namelist():
                        if name.endswith(".txt"):
                            content = z.read(name).decode("utf-8", errors="ignore")
                            res = scan_text(content.splitlines(), f"{base} -> {name}", query, date_filter, sender_filter)
                            all_results.extend(res)
            except Exception as e:
                pass
        elif path.endswith(".txt"):
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as fp:
                    res = scan_text(fp.readlines(), base, query, date_filter, sender_filter)
                    all_results.extend(res)
            except Exception:
                pass

    return all_results

def validate_site():
    print("Validating site JS files...")
    res1 = subprocess.run(["node", "-c", os.path.join(PROJECT_DIR, "data.js")], capture_output=True, text=True)
    res2 = subprocess.run(["node", "-c", os.path.join(PROJECT_DIR, "app.js")], capture_output=True, text=True)
    if res1.returncode == 0 and res2.returncode == 0:
        print("✅ data.js and app.js syntax is 100% clean and valid!")
        return True
    else:
        print("❌ Syntax Error:", res1.stderr, res2.stderr)
        return False

def main():
    if "--validate" in sys.argv:
        validate_site()
        return

    date_filter = None
    query = None
    sender_filter = None

    if "--today" in sys.argv:
        # Default today format in WhatsApp: 10/1/26 or 1/10/26
        date_filter = "10/1/26"

    for i, arg in enumerate(sys.argv):
        if arg == "--date" and i + 1 < len(sys.argv):
            date_filter = sys.argv[i + 1]
        elif arg == "--query" and i + 1 < len(sys.argv):
            query = sys.argv[i + 1]
        elif arg == "--sender" and i + 1 < len(sys.argv):
            sender_filter = sys.argv[i + 1]

    results = search_chats(query, date_filter, sender_filter)
    print(f"Found {len(results)} matching messages:")
    for src, line in results[:80]:
        print(f"[{src}] {line.strip()[:160]}")
    if len(results) > 80:
        print(f"... and {len(results) - 80} more.")

if __name__ == "__main__":
    main()
