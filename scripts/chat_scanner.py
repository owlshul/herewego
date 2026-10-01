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
  python3 scripts/chat_scanner.py --recent 20
  python3 scripts/chat_scanner.py --proof "Moiz tundawala"
  python3 scripts/chat_scanner.py --validate
"""

import os
import sys
import glob
import zipfile
import re
import subprocess
from datetime import datetime

SCRATCH_DIR = "/Users/apple/.gemini/antigravity-cli/brain/e0a5a62f-ab9b-4eec-9c63-b8d53761ea35/scratch"
PROJECT_DIR = "/Users/apple/Downloads/Code Projects/herewego"
DOWNLOADS_DIR = "/Users/apple/Downloads"

def find_all_chat_sources():
    sources = set()
    search_dirs = [SCRATCH_DIR, PROJECT_DIR, DOWNLOADS_DIR]
    for d in search_dirs:
        if not os.path.exists(d):
            continue
        for root, dirs, files in os.walk(d):
            # Avoid deep nesting into node_modules or .git
            if any(part.startswith('.') and part != '.gemini' for part in root.split(os.sep)):
                continue
            for f in files:
                path = os.path.join(root, f)
                if f.endswith(".zip") and any(k in f.lower() for k in ["chat", "whatsapp", "core", "maps"]):
                    sources.add(path)
                elif f.endswith(".txt") and any(k in f.lower() for k in ["chat", "whatsapp"]):
                    sources.add(path)
    return sorted(list(sources))

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
            except Exception:
                pass
        elif path.endswith(".txt"):
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as fp:
                    res = scan_text(fp.readlines(), base, query, date_filter, sender_filter)
                    all_results.extend(res)
            except Exception:
                pass

    return all_results

def parse_whatsapp_line(line):
    # Match patterns like:
    # [01/10/26, 4:28:33 PM] ~ Radha sharma: for preventive detention :
    # 8/5/26, 8:48 PM - +91 96965 33151: ACCUMULATION & LEGITIMACY
    m1 = re.match(r'\[?(\d{1,2}/\d{1,2}/\d{2,4},\s*\d{1,2}:\d{2}(?::\d{2})?\s*(?:[AP]M|[ap]m)?)\]?\s*[-:]?\s*([^:]+):\s*(.*)', line)
    if m1:
        date_str, sender, msg = m1.group(1), m1.group(2).strip(), m1.group(3).strip()
        return date_str, sender, msg
    return None, None, line.strip()

def export_proof(query):
    results = search_chats(query=query)
    if not results:
        print(f"No messages found for query: '{query}'")
        return
    print(f"\n--- Found {len(results)} matches for '{query}'. Generating proof snippets ---\n")
    for src, line in results[:5]:
        dt, sender, msg = parse_whatsapp_line(line)
        # determine chat name
        chat_name = "WhatsApp Chat"
        if "Unfiltered" in src:
            chat_name = "WhatsApp: MAPS | M.A. Political Science (Unfiltered)"
        elif "North" in src:
            chat_name = "WhatsApp: North Campus Core Papers (2026-2028)"
        elif "South" in src:
            chat_name = "WhatsApp: South campus (Department of Political Science 2026-2028) 🎓"
        
        snippet = f"""proof: {{
  sender: "{sender or 'Student'}",
  chat: "{chat_name}",
  date: "{dt or '1 Oct 2026'}",
  quote: "{msg.replace('\"', '\\\"')}"
}}"""
        print(snippet)
        print("-" * 50)

def show_recent(count=20):
    sources = find_all_chat_sources()
    all_lines = []
    for path in sources:
        base = os.path.basename(path)
        if path.endswith(".zip"):
            try:
                with zipfile.ZipFile(path, "r") as z:
                    for name in z.namelist():
                        if name.endswith(".txt"):
                            lines = z.read(name).decode("utf-8", errors="ignore").splitlines()
                            for l in lines:
                                if l.strip():
                                    all_lines.append((f"{base}", l))
            except Exception:
                pass
        elif path.endswith(".txt"):
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as fp:
                    for l in fp:
                        if l.strip():
                            all_lines.append((base, l))
            except Exception:
                pass

    print(f"\n--- Showing last {count} messages across chat files ---")
    for src, line in all_lines[-count:]:
        print(f"[{src}] {line.strip()[:140]}")

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

    if "--recent" in sys.argv:
        cnt = 25
        idx = sys.argv.index("--recent")
        if idx + 1 < len(sys.argv) and sys.argv[idx + 1].isdigit():
            cnt = int(sys.argv[idx + 1])
        show_recent(cnt)
        return

    if "--proof" in sys.argv:
        idx = sys.argv.index("--proof")
        if idx + 1 < len(sys.argv):
            export_proof(sys.argv[idx + 1])
            return

    date_filter = None
    query = None
    sender_filter = None

    if "--today" in sys.argv:
        date_filter = "1/10/26"

    for i, arg in enumerate(sys.argv):
        if arg == "--date" and i + 1 < len(sys.argv):
            date_filter = sys.argv[i + 1]
        elif arg == "--query" and i + 1 < len(sys.argv):
            query = sys.argv[i + 1]
        elif arg == "--sender" and i + 1 < len(sys.argv):
            sender_filter = sys.argv[i + 1]
        elif not arg.startswith("--") and i > 0 and sys.argv[i-1] not in ["--date", "--query", "--sender", "--recent", "--proof"]:
            query = arg

    results = search_chats(query, date_filter, sender_filter)
    print(f"Found {len(results)} matching messages:")
    for src, line in results[:80]:
        print(f"[{src}] {line.strip()[:160]}")
    if len(results) > 80:
        print(f"... and {len(results) - 80} more.")

if __name__ == "__main__":
    main()
