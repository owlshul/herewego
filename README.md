# herewego 🏛️
> *“Ah shit, here we go again.”* — Carl "CJ" Johnson, *GTA San Andreas*

The unofficial portal for **MA Political Science, North Campus, University of Delhi (Batch 2026–2028)**.  
Built to permanently settle WhatsApp syllabus disputes, sort internal assessment dates, organize reading links, and host central Google Drive repositories.

Designed with high fidelity after the beloved **Obsidian "Primary" Theme** by Cecilia May — featuring warm retro paper tones, tactile buttons, signature callouts, and seamless Light/Dark themes.

---

## 🌟 Key Features

1. **Tests & Assessment Hub (Current Primacy)**:
   - **Upcoming Cycle: Friday, 9 October 2026**:
     - **CC-102 DPII** (Prof. Ujjwal Kumar Singh · 20M CA · Unit 1 & Unit 4 · *Unit 2 strictly excluded notice*).
     - **CC-101 KTPP** (Dr. Ningthoujam Koiremba Singh · 40M CA · 2 Qs × 20M · Theories of Interpretation & Rousseau Social Contract).
     - **CC-103 IR** (24M IA · Status: Details awaited · Constructivism reference readings).
   - **Concluded Archive**: Preserves readings and syllabus records from the 25 September 2026 cycle.
   - **Direct Google Drive Links**: 1-click links for every prescribed book, translation, and chapter.
2. **Master Google Drive Repositories**:
   - North Campus Central Readings Drive (CR Sujal Vishwakarma)
   - DPII Dedicated Drive (Dr. Garima Das)
   - Master Semester 1 All-in-One Drive
3. **Who's Who Directory**:
   - Class Representatives with 1-tap WhatsApp chat and phone call buttons.
   - Core Faculty syllabus mapping.
4. **WhatsApp Verification & Citation Log**:
   - Dispute-resolution engine quoting verified CR and professor messages with exact timestamps and 1-click "Copy Citation" buttons for WhatsApp groups.
5. **Obsidian "Primary" Theme Design**:
   - Light mode: Warm cream/parchment (`#FAF8F5`).
   - Dark mode: Warm espresso/cocoa (`#191614`).
   - Iconic callout styles (`[!IMPORTANT]`, `[!WARNING]`, `[!NOTE]`, `[!TL;DR]`).
   - Global fast search (`/` hotkey).

---

## 🚀 Running Locally

To view the website in your browser:

### Option 1: Double-click
Simply double click `index.html` to open it directly in Chrome, Safari, or Brave.

### Option 2: Local HTTP Server (Recommended)
Run using Python's built-in web server:
```bash
cd "/Users/apple/Downloads/Code Projects/herewego"
python3 -m http.server 8080
```
Open **`http://localhost:8080`** in your browser.

---

## 🌐 Free 1-Click Deployment

Because `herewego` is built as a zero-dependency static web application, it can be hosted 100% for free with custom domain support on:

1. **GitHub Pages**:
   - Create a new GitHub repository named `herewego`.
   - Push this folder:
     ```bash
     git init
     git add .
     git commit -m "feat: initial herewego release"
     git branch -M main
     git remote add origin <your-repo-url>
     git push -u origin main
     ```
   - Go to **Settings → Pages → Source: Deploy from branch `main`**.
2. **Cloudflare Pages / Vercel / Netlify**:
   - Drag and drop this folder directly into the Cloudflare Pages or Netlify dashboard.

---

## 📝 Updating Data

All content is managed in **`data.js`**:
- To add a new announcement: append an object to `portalData.announcements`.
- To update test dates or marks: edit `portalData.upcomingCycle`.
- To add a new reading: add a title and Google Drive link under the respective paper's `readings` list.
- To add a verified citation: add an entry to `portalData.verificationLog`.

You can also run `python3 sync_from_markdown.py` to compare against your latest Obsidian notes.
