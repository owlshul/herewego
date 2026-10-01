#!/usr/bin/env python3
"""
scripts/gdrive_api.py
=====================
Fast Google Drive API utility using official Google Drive API v3.
Replaces rclone completely and avoids shared quota / rate-limiting issues.

Connects directly via centralized authentication vault:
/Users/apple/.credentials/auth_manager.py using account 'kmc' (2317162@kmc.du.ac.in).

Usage:
  python3 scripts/gdrive_api.py list --folder-id <FOLDER_ID>
  python3 scripts/gdrive_api.py search --name "WhatsApp"
  python3 scripts/gdrive_api.py download --file-id <FILE_ID> --output-dir <DIR>
  python3 scripts/gdrive_api.py sync-chats --output-dir <DIR>
"""

import os
import sys
import io
import argparse

sys.path.append("/Users/apple/.credentials")
try:
    from auth_manager import get_service
except ImportError:
    print("Error: Could not import auth_manager from /Users/apple/.credentials")
    sys.exit(1)

from googleapiclient.http import MediaIoBaseDownload

def get_drive():
    return get_service("kmc", "drive", "v3")

def list_folder(folder_id, indent=0):
    drive = get_drive()
    q = f"'{folder_id}' in parents and trashed = false"
    res = drive.files().list(
        q=q,
        supportsAllDrives=True,
        includeItemsFromAllDrives=True,
        fields="files(id, name, mimeType, webViewLink, size)"
    ).execute()
    files = res.get("files", [])
    for f in files:
        prefix = "  " * indent
        is_folder = f["mimeType"] == "application/vnd.google-apps.folder"
        marker = "📁" if is_folder else "📄"
        print(f"{prefix}{marker} {f['name']} (ID: {f['id']})")
    return files

def search_files(name_query, mime_type=None, limit=20):
    drive = get_drive()
    q_parts = [f"name contains '{name_query}'", "trashed = false"]
    if mime_type:
        q_parts.append(f"mimeType = '{mime_type}'")
    q = " and ".join(q_parts)
    res = drive.files().list(
        q=q,
        pageSize=limit,
        supportsAllDrives=True,
        includeItemsFromAllDrives=True,
        fields="files(id, name, mimeType, webViewLink, size)"
    ).execute()
    return res.get("files", [])

def download_file(file_id, dest_path):
    drive = get_drive()
    meta = drive.files().get(fileId=file_id, fields="name").execute()
    file_name = meta.get("name", file_id)
    if os.path.isdir(dest_path):
        target_file = os.path.join(dest_path, file_name)
    else:
        target_file = dest_path

    os.makedirs(os.path.dirname(os.path.abspath(target_file)), exist_ok=True)
    request = drive.files().get_media(fileId=file_id)
    with io.FileIO(target_file, "wb") as fh:
        downloader = MediaIoBaseDownload(fh, request)
        done = False
        while not done:
            status, done = downloader.next_chunk()
            if status:
                print(f"Downloading {file_name}: {int(status.progress() * 100)}%", end="\r")
    print(f"\n✓ Downloaded: {target_file}")
    return target_file

def sync_whatsapp_chats(output_dir):
    print(f"Syncing WhatsApp chats to {output_dir} via official Google Drive API...")
    files = search_files("WhatsApp", mime_type="application/zip", limit=10)
    downloaded = []
    for f in files:
        print(f"Found: {f['name']} ({f['id']})")
        target = os.path.join(output_dir, f["name"])
        if not os.path.exists(target):
            download_file(f["id"], target)
            downloaded.append(target)
        else:
            print(f"  Already exists locally: {target}")
    return downloaded

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Official Google Drive API Helper")
    subparsers = parser.add_subparsers(dest="cmd")

    list_p = subparsers.add_parser("list")
    list_p.add_argument("--folder-id", required=True, help="Google Drive Folder ID")

    search_p = subparsers.add_parser("search")
    search_p.add_argument("--name", required=True, help="Name substring to search")
    search_p.add_argument("--limit", type=int, default=20)

    down_p = subparsers.add_parser("download")
    down_p.add_argument("--file-id", required=True)
    down_p.add_argument("--out", required=True, help="Destination file or dir")

    sync_p = subparsers.add_parser("sync-chats")
    sync_p.add_argument("--out", default="/Users/apple/.gemini/antigravity-cli/brain/e0a5a62f-ab9b-4eec-9c63-b8d53761ea35/scratch/chats")

    args = parser.parse_args()
    if args.cmd == "list":
        list_folder(args.folder_id)
    elif args.cmd == "search":
        results = search_files(args.name, limit=args.limit)
        for r in results:
            print(f"{r['id']} | {r['mimeType']} | {r['name']}")
    elif args.cmd == "download":
        download_file(args.file_id, args.out)
    elif args.cmd == "sync-chats":
        sync_whatsapp_chats(args.out)
    else:
        parser.print_help()
