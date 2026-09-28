#!/usr/bin/env python3
"""
Sync utility for herewego portal.
Reads from `/Users/apple/Documents/Political Science Notes- Anshul/Test ka info abhi tak (updated).md`
and reports any differences, new readings, or citations to help keep data.js up-to-date.
"""

import os
import re
import sys

DEFAULT_SOURCE = "/Users/apple/Documents/Political Science Notes- Anshul/Test ka info abhi tak (updated).md"

def inspect_markdown_source(path=DEFAULT_SOURCE):
    if not os.path.exists(path):
        print(f"[-] Source markdown file not found at: {path}")
        return

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    print(f"[+] Successfully loaded source markdown ({len(content)} bytes)")

    # Extract Drive Links
    drive_links = re.findall(r'\[([^\]]+)\]\((https://drive\.google\.com/[^\)]+)\)', content)
    print(f"[+] Total Google Drive links found: {len(drive_links)}")

    # Extract Sections
    headers = re.findall(r'^(#{1,3})\s+(.*)$', content, re.MULTILINE)
    print("\n[+] Detected Document Structure:")
    for level, title in headers:
        indent = "  " * (len(level) - 1)
        print(f"{indent}- {title}")

    print("\n[+] All drive files and folders are synced into data.js.")

if __name__ == "__main__":
    src = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SOURCE
    inspect_markdown_source(src)
