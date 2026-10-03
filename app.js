// =============================================================================
// HEREWEGO APP CONTROLLER — MINIMAL & DECLUTTERED
// Department of Political Science (North Campus, Delhi University)
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initTabs();
  initBackToTop();
  renderAllViews();
  initCitationHovercards();
});

// -----------------------------------------------------------------------------
// LIVE COUNTDOWN TIMER (Next Assessment Cycle: 9 October 2026)
// -----------------------------------------------------------------------------
function initCountdown() {
  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-mins');
  const secsEl = document.getElementById('cd-secs');

  if (!daysEl || !portalData.upcomingCycle) return;

  const targetDate = new Date(portalData.upcomingCycle.isoTarget).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// -----------------------------------------------------------------------------
// STREAMLINED TAB NAVIGATION (3 ESSENTIAL TABS)
// -----------------------------------------------------------------------------
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const sections = document.querySelectorAll('.view-section');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-view');

      tabButtons.forEach(b => b.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const activeSection = document.getElementById(`view-${targetView}`);
      if (activeSection) {
        activeSection.classList.add('active');
      }

      // Reset any assessment paper filter
      if (targetView === 'assessments') {
        filterAssessments('all');
      }
      if (targetView === 'drives') {
        filterDrivesSection('all');
      }
    });
  });
}

// -----------------------------------------------------------------------------
// RENDER ALL VIEWS
// -----------------------------------------------------------------------------
function renderAllViews() {
  renderAssessmentsView();
  renderDrivesView();
  renderDirectoryView();
  renderArchiveView();
}

// 1. Upcoming Assessments View (Decluttered with minimalist reading lines)
// 1. Upcoming Assessments View (Strict sequential structure per user directive:
// Code/Title -> Meta (Date, Pattern, Faculty) -> Callout Note -> Syllabus -> Readings & Drive Links (Broad folders, Subfolders, Exact readings))
function renderAssessmentsView() {
  const container = document.getElementById('assessments-container');
  if (!container) return;

  const papers = portalData.upcomingCycle.papers;

  const corePapersHtml = papers.map(paper => {
    // Important Strategy Warning Callout
    const warn = paper.warningCallout;
    const warnAttrs = warn && warn.citation ? `
      data-citation-sender="${escapeHtml(warn.citation.sender)}"
      data-citation-date="${escapeHtml(warn.citation.date)}"
      data-citation-source="${escapeHtml(warn.citation.source)}"
      data-citation-quote="${escapeHtml(warn.citation.quote)}"
    ` : '';

    const warningCalloutHtml = warn ? `
      <div class="callout" data-callout="warning" style="margin: 0 0 12px 0;">
        <div class="callout-title">
          <span>⚠️ ${escapeHtml(warn.title || 'Important Strategy Warning')}</span>
          ${warn.citation ? ` <button type="button" class="proof-qmark citation-trigger" ${warnAttrs} title="View WhatsApp verification" aria-label="View WhatsApp verification">?</button>` : ''}
        </div>
        <div class="callout-body">
          <p style="margin: 0; font-size: 0.88rem; line-height: 1.45;">${escapeHtml(warn.text)}</p>
        </div>
      </div>
    ` : '';

    // Footnote Note in italics (e.g. Unit II exclusion)
    const fn = paper.footnoteNote;
    const fnAttrs = fn && fn.citation ? `
      data-citation-sender="${escapeHtml(fn.citation.sender)}"
      data-citation-date="${escapeHtml(fn.citation.date)}"
      data-citation-source="${escapeHtml(fn.citation.source)}"
      data-citation-quote="${escapeHtml(fn.citation.quote)}"
    ` : '';

    const footnoteHtml = fn ? `
      <p class="syllabus-footnote-line">
        <em>*Note: ${escapeHtml(fn.text)}</em>${fn.citation ? ` <button type="button" class="proof-qmark citation-trigger" ${fnAttrs} title="View WhatsApp verification" aria-label="View WhatsApp verification">?</button>` : ''}
      </p>
    ` : '';

    // Syllabus Citation & Header (? in front of Syllabus only)
    const syllabusCit = paper.syllabusCitation;
    const syllabusCitAttrs = syllabusCit ? `
      data-citation-sender="${escapeHtml(syllabusCit.sender)}"
      data-citation-date="${escapeHtml(syllabusCit.date)}"
      data-citation-source="${escapeHtml(syllabusCit.source)}"
      data-citation-quote="${escapeHtml(syllabusCit.quote)}"
    ` : '';

    const syllabusHeaderHtml = `
      <h4 class="section-subheading syllabus-subheading clickable-syllabus-title"
          onclick="navigateToSyllabusCard('${escapeJsString(paper.code)}')"
          title="Click to view official syllabus PDF in Drives & Links section">
        ${syllabusCit ? `
          <button type="button" class="proof-qmark citation-trigger" ${syllabusCitAttrs} title="Hover to view WhatsApp proof" aria-label="View WhatsApp syllabus proof" onclick="event.stopPropagation()">?</button>
        ` : ''}
        <span>Syllabus</span>
        <svg class="syllabus-redirect-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </h4>
    `;

    // Syllabus Clean List with Dual Readings Blocks (Syllabus Prescribed + Faculty Mentions with Proofs)
    const syllabusHtml = paper.syllabusTopics.map((unit, uIdx) => {
      const unitKey = `${paper.id}-u${uIdx}`;
      const hasDrives = unit.drives && unit.drives.length > 0;
      const classReadingsList = unit.classReadings || unit.items || [];
      const hasClassReadings = classReadingsList.length > 0 || hasDrives || unit.classReadingsNote || unit.readingsNote;
      const hasSyllabusReadings = unit.syllabusReadings && unit.syllabusReadings.length > 0;

      return `
        <div class="syllabus-item-group">
          <div class="syllabus-unit-title-row">
            <span class="syllabus-unit-title">${unit.unit ? `${escapeHtml(unit.unit)}: ` : ''}${escapeHtml(unit.unitTitle)}</span>
          </div>

          <ul class="clean-topics-list">
            ${unit.topics.map(t => {
              const text = typeof t === 'object' && t !== null ? t.text : t;
              return `
                <li class="clean-topic-row">
                  <span>${escapeHtml(text)}</span>
                </li>
              `;
            }).join('')}
          </ul>

          <!-- Action Buttons Row (3 Blocks: Prof suggested readings, Official syllabus readings, Drive for the unit) -->
          <div class="unit-actions-row">
            ${hasClassReadings ? `
              <button type="button" class="btn-toggle-readings btn-toggle-faculty" onclick="toggleUnitClassReadings('${unitKey}')" id="btn-toggle-cls-${unitKey}" aria-expanded="false" title="View professor suggested readings and student WhatsApp chat proofs">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                <span>Prof suggested readings (${classReadingsList.length})</span>
                <span class="toggle-arrow">▾</span>
              </button>
            ` : ''}

            ${hasSyllabusReadings ? `
              <button type="button" class="btn-toggle-readings btn-toggle-syllabus" onclick="toggleUnitSyllabusReadings('${unitKey}')" id="btn-toggle-syl-${unitKey}" aria-expanded="false" title="View official DU syllabus prescribed readings for this topic">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                <span>Official syllabus readings (${unit.syllabusReadings.length})</span>
                <span class="toggle-arrow">▾</span>
              </button>
            ` : ''}

            ${hasDrives ? `
              <button type="button" class="btn-toggle-readings btn-toggle-drive" onclick="toggleUnitDrive('${unitKey}')" id="btn-toggle-drv-${unitKey}" aria-expanded="false" title="View exact Drive folders for this unit">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                <span>Drive for the unit (${unit.drives.length})</span>
                <span class="toggle-arrow">▾</span>
              </button>
            ` : ''}
          </div>

          <!-- Panel 1: Professor Suggested Readings (Faculty References & Class Discussions) -->
          ${hasClassReadings ? `
            <div class="unit-readings-panel unit-panel-faculty" id="panel-cls-${unitKey}" style="display: none;">
              ${(unit.classReadingsNote || unit.readingsNote) ? `
                <div class="unit-readings-note">
                  <svg class="fallback-icon-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  <span>${escapeHtml(unit.classReadingsNote || unit.readingsNote)}</span>
                  ${unit.classReadingsDriveUrl ? `
                    <a href="${unit.classReadingsDriveUrl}" target="_blank" rel="noopener noreferrer" class="unit-note-drive-link" style="margin-left: 6px; font-weight: 600; text-decoration: underline; color: var(--accent-color, #0284c7); display: inline-flex; align-items: center; gap: 3px;" title="Open Unit 4 Google Drive">
                      <span>[Open Unit 4 Google Drive]</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  ` : ''}
                </div>
              ` : ''}

              ${classReadingsList.length > 0 ? `
                <div class="clean-reading-list">
                  ${classReadingsList.map(r => `
                    <div class="reading-row">
                      <div class="reading-info">
                        <div class="reading-primary-line">
                          ${r.author ? `<span class="reading-writer-name">${escapeHtml(r.author)}</span> <span class="reading-sep">—</span> ` : ''}
                          ${r.url ? `
                            <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="reading-link">
                              <span>${escapeHtml(r.title)}</span>
                            </a>
                          ` : `
                            <span class="reading-link reading-link--no-url" style="color: var(--text-heading); font-weight: var(--font-medium);">
                              <span>${escapeHtml(r.title)}</span>
                            </span>
                          `}
                        </div>
                        ${(r.description || r.scope) ? `
                          <div class="reading-desc-line">${escapeHtml(r.description || r.scope)}</div>
                        ` : ''}

                        ${r.proof ? `
                          <div class="proof-single-line">
                            <span class="proof-byline">${escapeHtml(r.proof.sender)}, ${escapeHtml(r.proof.chat)}, ${escapeHtml(r.proof.date)}</span>
                            ${r.proof.quote ? `<span class="proof-quote-inline">: “${escapeHtml(r.proof.quote)}”</span>` : ''}
                          </div>
                        ` : ''}
                      </div>
                      ${r.url ? `
                        <div class="reading-actions">
                          <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-open-drive">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            Drive
                          </a>
                        </div>
                      ` : `
                        <div class="reading-actions">
                          <span class="badge-source-note" style="font-size: 0.72rem; color: var(--text-muted); opacity: 0.85; padding: 2px 6px; border: 1px dashed var(--border-color); border-radius: 4px;">Referenced in Class</span>
                        </div>
                      `}
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              <!-- Collective WhatsApp Verification Proofs & Sources at the end -->
              ${(unit.classSources || (unit.classProofs && unit.classProofs.length > 0)) ? `
                <div class="collective-proofs-wrap">
                  ${unit.classSources ? `
                    <div class="proofs-sources-byline">
                      <span class="proofs-sources-label">Sources:</span>
                      <span class="proofs-sources-names">${escapeHtml(unit.classSources)}</span>
                    </div>
                  ` : ''}
                  ${(unit.classProofs && unit.classProofs.length > 0) ? `
                    <div class="proofs-header-title">Chat Verification Proof:</div>
                    ${unit.classProofs.map(p => `
                      <div class="proof-single-line">
                        <span class="proof-byline">${escapeHtml(p.sender)}, ${escapeHtml(p.chat)}, ${escapeHtml(p.date)}</span>${p.quote ? `<span class="proof-quote-inline">: “${escapeHtml(p.quote)}”</span>` : ''}
                      </div>
                    `).join('')}
                  ` : ''}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Panel 2: Official Syllabus Prescribed Readings (clean list, no extra tags or bright badges) -->
          ${hasSyllabusReadings ? `
            <div class="unit-readings-panel unit-panel-syllabus" id="panel-syl-${unitKey}" style="display: none;">
              <ul class="clean-syllabus-readings-list">
                ${unit.syllabusReadings.map(r => `
                  <li class="syllabus-reading-item">
                    <span class="reading-bullet">•</span>
                    <div class="reading-text-wrap">
                      <span class="reading-author-name">${escapeHtml(r.author)}:</span>
                      ${r.url ? `
                        <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="syllabus-reading-link" title="Open Drive Link">
                          <span>${escapeHtml(r.title)}</span>
                          <svg class="reading-drive-icon" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      ` : `
                        <span class="reading-title-text">${escapeHtml(r.title)}</span>
                      `}
                    </div>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Panel 3: Dedicated Drive for the Unit (Exact subfolders across CR, Prof, and Archive drives) -->
          ${hasDrives ? `
            <div class="unit-readings-panel unit-panel-drive" id="panel-drv-${unitKey}" style="display: none;">
              <div class="folder-rows-list">
                ${unit.drives.map(f => `
                  <a href="${f.url}" target="_blank" rel="noopener noreferrer" class="drive-link-row">
                    <svg class="drive-link-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                    <span class="drive-link-label">${escapeHtml(f.name)}${f.scope ? `<span class="drive-link-scope"> · ${escapeHtml(f.scope)}</span>` : ''}</span>
                    <svg class="drive-link-ext" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Class Notes Gallery (e.g. Abhilasha & Diksha notes for PS-CC 102)
    const gallery = paper.classNotesGallery;
    const galleryHtml = gallery ? `
      <section class="class-notes-uncertainty-block" aria-label="Class Notes and Reading Clarification">
        <div class="uncertainty-header">
          <div class="uncertainty-title-wrap">
            <svg class="uncertainty-title-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <h4 class="uncertainty-heading">${escapeHtml(gallery.title)}</h4>
          </div>
          <p class="uncertainty-subtext">${escapeHtml(gallery.attendeeNotice)}</p>
        </div>

        <div class="notes-boxes-container">
          ${gallery.contributors.map((c, cIdx) => `
            <details class="notes-student-box" id="notes-box-${c.id}" open>
              <summary class="notes-box-summary">
                <div class="notes-summary-left">
                  <span class="notes-student-name">${escapeHtml(c.name)}’s Tracked Readings</span>
                  <span class="pill pill-attendee-badge">${escapeHtml(c.badge)}</span>
                  <span class="notes-summary-count">${escapeHtml(c.summary)}</span>
                </div>
                <span class="notes-summary-arrow">▾</span>
              </summary>

              <div class="notes-box-body">
                <!-- Credits & Context -->
                <div class="notes-credit-row">
                  <div class="notes-credit-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </div>
                  <div class="notes-credit-info">
                    <span class="notes-credit-by">Readings tracked during class by <strong>${escapeHtml(c.name)}</strong></span>
                    <span class="notes-credit-context">${escapeHtml(c.notesContext)}</span>
                  </div>
                </div>

                <!-- Note Pages Grid -->
                <div class="notes-thumbnails-grid">
                  ${c.pages.map((p) => `
                    <div class="note-thumb-card">
                      <div class="note-thumb-img-wrap" onclick="openNoteZoom('${escapeJsString(p.src)}', '${escapeJsString(p.title)}', '${escapeJsString(c.badge)}', '${escapeJsString(p.caption)}')" role="button" tabindex="0" title="Click to enlarge" aria-label="Click to zoom ${escapeHtml(p.title)}">
                        <img src="${escapeHtml(p.src)}" alt="${escapeHtml(p.title)}" class="note-thumb-img" loading="lazy" />
                        <div class="note-thumb-overlay">
                          <span class="btn-thumb-zoom">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                            <span>View / Zoom</span>
                          </span>
                        </div>
                      </div>
                      <div class="note-thumb-meta">
                        <div class="note-thumb-title">${escapeHtml(p.title)}</div>
                        <div class="note-thumb-caption">${escapeHtml(p.caption)}</div>
                        <button type="button" class="btn-note-zoom-direct" onclick="openNoteZoom('${escapeJsString(p.src)}', '${escapeJsString(p.title)}', '${escapeJsString(c.badge)}', '${escapeJsString(p.caption)}')">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </details>
          `).join('')}
        </div>

        <!-- Footnotes & Humor Line below the boxes -->
        <div class="uncertainty-footer-notes">
          <p class="uncertainty-disclaimer">
            <em>*Note: ${escapeHtml(gallery.attendeeNotice)} ${escapeHtml(gallery.errorDisclaimer)}</em>
          </p>
          <p class="uncertainty-humor">
            <span class="humor-glyph">🗿</span>
            <span>${escapeHtml(gallery.humorNote)}</span>
          </p>
        </div>
      </section>
    ` : '';

    return `
      <article class="paper-entry" data-paper-code="${paper.code}">
        <div class="paper-header">
          <div class="paper-title-wrap">
            <h3 class="paper-title">
              <span class="code">${paper.code}:</span> ${paper.name}
            </h3>
            <div class="paper-meta-strip">
              <span class="meta-item"><strong>Date:</strong> <span class="hide-mobile">Friday, </span>9 Oct<span class="hide-mobile">ober</span> 2026</span>
              <span class="meta-dot">·</span>
              <span class="meta-item"><strong>Pattern:</strong> ${paper.pattern || 'Not notified yet'}</span>
              <span class="meta-dot">·</span>
              <span class="meta-item"><strong>Faculty:</strong> ${paper.faculty}</span>
            </div>
          </div>
        </div>

        <div class="syllabus-clean-wrap">
          ${warningCalloutHtml}
          ${syllabusHeaderHtml}
          ${syllabusHtml}
          ${footnoteHtml}
          ${galleryHtml}
        </div>
      </article>
    `;
  }).join('');

    // Skill-Based Course (SBC) Internal Assessment Card
    let sbcHtml = '';
    const sbc = portalData.sbcAssessment;
    if (sbc) {
      const sbcCit = sbc.citation;
      const sbcCitAttrs = sbcCit ? `
        data-citation-sender="${escapeHtml(sbcCit.sender)}"
        data-citation-date="${escapeHtml(sbcCit.date)}"
        data-citation-source="${escapeHtml(sbcCit.source)}"
        data-citation-quote="${escapeHtml(sbcCit.quote)}"
      ` : '';

      sbcHtml = `
        <article class="paper-entry sbc-paper-entry" data-paper-code="PS-SBC 01 sbc">
          <div class="sbc-badge-row">
            <span class="pill pill-sbc">Skill-Based Course (SBC)</span>
            <span class="status-pill status-found" style="font-size: 0.74rem;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              Due: ${escapeHtml(sbc.deadlineFormatted)}
            </span>
          </div>

          <div class="paper-header" style="margin-top: 10px;">
            <div class="paper-title-wrap">
              <h3 class="paper-title">
                <span class="code">${escapeHtml(sbc.code)}:</span> ${escapeHtml(sbc.name)}
              </h3>
              <div class="paper-meta-strip">
                <span class="meta-item"><strong>Due Date:</strong> ${escapeHtml(sbc.deadlineFormatted)}</span>
                <span class="meta-dot">·</span>
                <span class="meta-item"><strong>Marks:</strong> ${escapeHtml(sbc.totalMarks)} Marks</span>
                <span class="meta-dot">·</span>
                <span class="meta-item"><strong>Length:</strong> ${escapeHtml(sbc.pageRequirement)}</span>
                <span class="meta-dot">·</span>
                <span class="meta-item"><strong>Submission:</strong> ${escapeHtml(sbc.submissionMode)}</span>
                <span class="meta-dot">·</span>
                <span class="meta-item"><strong>Faculty:</strong> ${escapeHtml(sbc.faculty)}</span>
              </div>
            </div>
          </div>

          <!-- Assignment Prompt Card -->
          <div class="sbc-prompt-card">
            <div class="sbc-prompt-header">
              <div style="display: flex; align-items: center; gap: 8px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
                <strong>Internal Assessment Assignment Topic (Handwritten Assignment)</strong>
              </div>
              ${sbcCit ? `<button type="button" class="proof-qmark citation-trigger" ${sbcCitAttrs} title="View WhatsApp Notice Proof" aria-label="View WhatsApp Notice Proof">?</button>` : ''}
            </div>

            <div class="sbc-topic-box">
              <div class="sbc-topic-en">
                <span class="sbc-lang-tag">English</span>
                <p class="sbc-question-text">“${escapeHtml(sbc.topicEnglish)}”</p>
              </div>
              <div class="sbc-topic-hi">
                <span class="sbc-lang-tag">हिन्दी (Hindi)</span>
                <p class="sbc-question-text">“${escapeHtml(sbc.topicHindi)}”</p>
              </div>
            </div>

            <div class="sbc-guidelines-box">
              <h5 class="sbc-guidelines-title">Submission Instructions &amp; Checklist:</h5>
              <ul class="sbc-guidelines-list">
                <li><strong>Strictly Handwritten:</strong> Write the assignment by hand (length: <strong>7 to 8 pages</strong>).</li>
                <li><strong>Weightage:</strong> Total <strong>12 Marks</strong>.</li>
                <li><strong>Submission:</strong> Scan your handwritten sheets into a clean single PDF and upload it to <strong>Google Classroom</strong>.</li>
                <li><strong>Deadline:</strong> <strong>Tuesday, 20 October 2026</strong>.</li>
              </ul>
            </div>
          </div>
        </article>
      `;
    }

    container.innerHTML = corePapersHtml + sbcHtml;
  }

// 2. Master Drives & Important Links View (Categorized)
function renderDrivesView() {
  const container = document.getElementById('drives-grid-container');
  if (!container) return;

  const sections = portalData.drivesSections || [];

  const categoryIcons = {
    drives: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
    syllabi: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
    portals: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"></path></svg>`
  };

  container.innerHTML = sections.map(section => `
    <div class="drives-category-group" id="cat-${section.categoryId}">
      <div class="drives-category-header">
        <h3 class="drives-category-title">
          ${categoryIcons[section.categoryId] || ''}
          <span>${escapeHtml(section.categoryTitle)}</span>
        </h3>
        <p class="drives-category-desc">${escapeHtml(section.categoryDesc)}</p>
      </div>
      <div class="drives-clean-grid">
        ${section.items.map(drive => {
          if (drive.isSyllabusText) {
            return `
              <div class="drive-box drive-box--syllabus" id="${drive.id}" data-paper-code="${drive.paperCode || ''}" style="grid-column: 1 / -1;">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                  <div>
                    <span class="pill" style="margin-bottom: 6px; display: inline-block;">${drive.badge}</span>
                    <h3 class="drive-box-title" style="margin-bottom: 4px;">${escapeHtml(drive.name)}</h3>
                    <p class="drive-box-curator">${drive.curatorLabel || 'Curator'}: <strong>${escapeHtml(drive.curators)}</strong></p>
                  </div>
                  <button type="button" class="btn-drive-main btn-syllabus-reader" id="btn-fs-${drive.id}" onclick="openSyllabusModal('${escapeJsString(drive.paperCode)}')" style="width: auto;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6"></path><path d="M10 14L21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
                    <span>Read Full Syllabus &amp; Drive Readings</span>
                  </button>
                </div>
              </div>
            `;
          }

          const isPdf = !!drive.isPdf;
          const actionHtml = `
            <a href="${drive.url}" target="_blank" rel="noopener noreferrer" class="btn-drive-main">
              <span>${escapeHtml(drive.btnText || 'Open Link')}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          `;

          return `
            <div class="drive-box" id="${drive.id}" data-paper-code="${drive.paperCode || ''}">
              <div>
                <span class="pill" style="margin-bottom: 6px; display: inline-block;">${drive.badge}</span>
                <h3 class="drive-box-title">${escapeHtml(drive.name)}</h3>
                <p class="drive-box-curator">${drive.curatorLabel || 'Curator'}: <strong>${escapeHtml(drive.curators)}</strong></p>
                ${drive.description ? `<p class="drive-box-desc">${escapeHtml(drive.description)}</p>` : ''}
              </div>
              ${actionHtml}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `).join('');
}




// 3. Merged Announcements & Verified Citations View
function renderMergedNoticesView() {
  const container = document.getElementById('notices-feed-container');
  if (!container) return;

  container.innerHTML = portalData.verifiedAnnouncements.map(notice => {
    const rawCitation = `[Verified Notice] ${notice.title} | Source: ${notice.sender} (${notice.date}) — "${notice.exactQuote}"`;

    return `
      <div class="notice-card" data-priority="${notice.priority}">
        <div class="notice-top-meta">
          <span class="pill">${notice.date}</span>
          <span class="pill">${notice.type.toUpperCase()}</span>
        </div>
        <h3 class="notice-title">${escapeHtml(notice.title)}</h3>
        <div class="notice-source">
          Verified from: <strong>${escapeHtml(notice.sender)}</strong> in <em>${escapeHtml(notice.source)}</em>
        </div>
        <p class="notice-summary">${escapeHtml(notice.summary)}</p>

        <div class="citation-box">
          "${escapeHtml(notice.exactQuote)}"
        </div>

        <div class="notice-footer">
          <div class="notice-tags">
            ${notice.tags.map(t => `<span class="pill" style="font-size: 0.7rem;">${t}</span>`).join('')}
          </div>
          <button class="btn-citation-copy" onclick="copyToClipboard('${escapeJsString(rawCitation)}', 'Verification citation copied!')" title="Copy exact proof for WhatsApp">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy Citation</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// 4. Directory View (Portal Curator + CRs with WhatsApp only + Etiquette Notice + Faculty by Paper)
function renderDirectoryView() {
  const curatorContainer = document.getElementById('curator-container');
  const crContainer = document.getElementById('crs-container');
  const coreFacultyContainer = document.getElementById('core-faculty-container');
  const sbcContainer = document.getElementById('sbc-container');
  const dseContainer = document.getElementById('dse-container');

  // Portal Curator ("Me / Batman") Card
  if (curatorContainer && portalData.directory.curator) {
    const curator = portalData.directory.curator;
    curatorContainer.innerHTML = `
      <div class="curator-card">
        <div class="curator-card-left">
          <div class="curator-name">${escapeHtml(curator.name)}</div>
          <div class="curator-role">${escapeHtml(curator.role)}</div>
          <p class="curator-note">${escapeHtml(curator.note)}</p>
        </div>
        <div class="curator-card-right">
          <a href="${curator.waUrl}" target="_blank" rel="noopener noreferrer" class="btn-wa-only">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.077-1.119-.059-.42-.136-.935-.316-1.574-.755-.837-.577-1.396-1.428-1.583-1.688-.187-.26-.395-.572-.395-.898 0-.327.172-.489.233-.559.062-.07.135-.088.18-.088s.09.002.128.006c.041.004.097-.015.151.117.057.136.194.474.211.51.018.036.029.077.006.124-.023.045-.034.074-.068.113-.035.039-.073.088-.105.118-.035.035-.072.074-.031.144.041.07.182.301.39.488.269.24.496.314.566.349.07.035.112.029.153-.018.042-.047.178-.207.226-.278.048-.07.095-.059.16-.035.065.024.414.195.485.231.07.035.118.053.136.083.018.03.018.423-.126.828z"/></svg>
            <span>Message on WhatsApp</span>
          </a>
        </div>
      </div>
    `;
  }

  // CR Cards (WhatsApp Only)
  if (crContainer) {
    crContainer.innerHTML = portalData.directory.crs.map(cr => `
      <div class="cr-clean-card">
        <div class="cr-clean-name">${escapeHtml(cr.name)}</div>
        <div class="cr-clean-role">${escapeHtml(cr.role)}</div>
        <div class="cr-clean-phone">${cr.phone}</div>
        <a href="https://wa.me/${cr.cleanPhone}" target="_blank" rel="noopener noreferrer" class="btn-wa-only">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.311.045-.698.077-1.119-.059-.42-.136-.935-.316-1.574-.755-.837-.577-1.396-1.428-1.583-1.688-.187-.26-.395-.572-.395-.898 0-.327.172-.489.233-.559.062-.07.135-.088.18-.088s.09.002.128.006c.041.004.097-.015.151.117.057.136.194.474.211.51.018.036.029.077.006.124-.023.045-.034.074-.068.113-.035.039-.073.088-.105.118-.035.035-.072.074-.031.144.041.07.182.301.39.488.269.24.496.314.566.349.07.035.112.029.153-.018.042-.047.178-.207.226-.278.048-.07.095-.059.16-.035.065.024.414.195.485.231.07.035.118.053.136.083.018.03.018.423-.126.828z"/></svg>
          <span>Message on WhatsApp</span>
        </a>
      </div>
    `).join('');
  }

  // Core Faculty Grouped by Paper
  if (coreFacultyContainer) {
    coreFacultyContainer.innerHTML = portalData.directory.corePapers.map(paper => `
      <div class="faculty-paper-group">
        <h4 class="faculty-paper-title">${paper.code}: ${paper.title}</h4>
        <div class="faculty-venue-tag">Venue: ${paper.venue}</div>
        <div class="faculty-table-wrap">
          <table class="clean-faculty-table">
            <thead>
              <tr>
                <th style="width: 32%;">Professor / Instructor</th>
                <th style="width: 48%;">Assigned Topic / Unit</th>
                <th style="width: 20%;">Current Status</th>
              </tr>
            </thead>
            <tbody>
              ${paper.facultyList.map(f => `
                <tr>
                  <td class="fac-name">${escapeHtml(f.name)}</td>
                  <td>${escapeHtml(f.topic)}</td>
                  <td><span class="pill" style="font-size: 0.7rem;">${escapeHtml(f.status)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `).join('');
  }

  // SBC Course
  if (sbcContainer) {
    const sbc = portalData.directory.sbcCourse;
    sbcContainer.innerHTML = `
      <div style="background: var(--bg-surface); border: 1px solid var(--border-card); border-radius: var(--radius-s); padding: 14px;">
        <h4 style="color: var(--text-heading); margin-bottom: 4px;">${sbc.code}: ${sbc.title}</h4>
        <p style="font-size: 0.88rem; color: var(--text-muted);">
          Faculty: <strong>${sbc.faculty.join(', ')}</strong>
        </p>
      </div>
    `;
  }

  // DSE Optional Groups
  if (dseContainer) {
    dseContainer.innerHTML = portalData.directory.dseGroups.map(grp => `
      <div style="margin-bottom: var(--space-m);">
        <h4 style="margin-bottom: 8px; color: var(--text-heading); font-size: 0.95rem;">${grp.groupName}</h4>
        <div class="dse-grid">
          ${grp.courses.map(c => `
            <div class="dse-card">
              <div class="dse-code">${c.code}</div>
              <div class="dse-title">${c.title}</div>
              <div class="dse-fac">${c.faculty}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}

// 5. Concluded Archive View (Clean & Compact)
function renderArchiveView() {
  const container = document.getElementById('archive-container');
  if (!container) return;

  const cycle = portalData.concludedCycle;

  container.innerHTML = `
    <div style="margin-bottom: var(--space-m);">
      <h3 style="font-size: 1.1rem; color: var(--text-heading);">Held On: ${cycle.heldOn}</h3>
      <p style="font-size: 0.85rem; color: var(--text-muted);">${cycle.summary}</p>
    </div>
  ` + cycle.papers.map(p => `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-card); border-radius: var(--radius-s); padding: 14px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
        <h4 style="color: var(--text-heading);">${p.code}: ${p.name}</h4>
        <span class="pill">${p.pattern}</span>
      </div>
      <p style="font-size: 0.84rem; color: var(--text-muted); margin-bottom: 8px;"><strong>Syllabus:</strong> ${p.syllabus}</p>
      <div class="clean-reading-list">
        ${p.readings.map(r => `
          <div class="reading-row">
            <div class="reading-info">
              <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="reading-link">${escapeHtml(r.title)}</a>
              <span class="reading-author-meta">${escapeHtml(r.author)}</span>
              ${r.note ? `<span class="reading-type-badge">${escapeHtml(r.note)}</span>` : ''}
            </div>
            <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-open-drive">Drive</a>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

// -----------------------------------------------------------------------------
// FILTER PAPERS IN ASSESSMENTS VIEW
// -----------------------------------------------------------------------------
function filterAssessments(filter) {
  const chips = document.querySelectorAll('.chip');
  chips.forEach(c => c.classList.remove('active'));

  const activeChip = Array.from(chips).find(c => c.getAttribute('data-filter') === filter);
  if (activeChip) activeChip.classList.add('active');

  const cards = document.querySelectorAll('#assessments-container .paper-entry');
  cards.forEach(card => {
    const code = card.getAttribute('data-paper-code').toLowerCase();
    if (filter === 'all' || code.includes(filter.toLowerCase())) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// -----------------------------------------------------------------------------
// SEARCH ENGINE
// -----------------------------------------------------------------------------
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    performSearch(query);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
    if (e.key === 'Escape' && document.activeElement === searchInput) {
      searchInput.value = '';
      searchInput.blur();
      performSearch('');
    }
  });
}

function performSearch(query) {
  const searchResultsView = document.getElementById('view-search-results');
  const resultsContainer = document.getElementById('search-results-container');
  const mainViews = document.querySelectorAll('.view-section:not(#view-search-results)');
  const noResultsEl = document.getElementById('no-results');

  if (!query) {
    if (searchResultsView) searchResultsView.classList.remove('active');
    noResultsEl.classList.remove('visible');
    const activeTabBtn = document.querySelector('.tab-btn.active');
    const target = activeTabBtn ? activeTabBtn.getAttribute('data-view') : 'assessments';
    const section = document.getElementById(`view-${target}`);
    if (section) section.classList.add('active');
    return;
  }

  mainViews.forEach(v => v.classList.remove('active'));
  searchResultsView.classList.add('active');

  const matchedReadings = [];
  const matchedNotices = [];

  portalData.upcomingCycle.papers.forEach(p => {
    if (p.broadFolders) {
      p.broadFolders.forEach(bf => {
        if (bf.name.toLowerCase().includes(query) || (bf.scope && bf.scope.toLowerCase().includes(query))) {
          matchedReadings.push({ title: bf.name, author: bf.scope || 'Broad Drive Folder', url: bf.url, paper: p.code, type: 'Broad Folder' });
        }
      });
    }
    if (p.readings) {
      p.readings.forEach(sec => {
        if (sec.subfolders) {
          sec.subfolders.forEach(sf => {
            if (sf.name.toLowerCase().includes(query) || (sf.scope && sf.scope.toLowerCase().includes(query))) {
              matchedReadings.push({ title: sf.name, author: sf.scope || 'Topic Subfolder', url: sf.url, paper: p.code, type: 'Subfolder' });
            }
          });
        }
        sec.items.forEach(item => {
          if (item.title.toLowerCase().includes(query) || item.author.toLowerCase().includes(query)) {
            matchedReadings.push({ ...item, paper: p.code });
          }
        });
      });
    }
  });

  portalData.verifiedAnnouncements.forEach(n => {
    if (n.title.toLowerCase().includes(query) || n.exactQuote.toLowerCase().includes(query) || n.sender.toLowerCase().includes(query)) {
      matchedNotices.push(n);
    }
  });

  const totalHits = matchedReadings.length + matchedNotices.length;

  if (totalHits === 0) {
    resultsContainer.innerHTML = '';
    noResultsEl.classList.add('visible');
    return;
  }

  noResultsEl.classList.remove('visible');

  resultsContainer.innerHTML = `
    <div style="margin-bottom: var(--space-m); font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">
      Found <strong>${totalHits}</strong> matches for "<strong>${escapeHtml(query)}</strong>"
    </div>

    ${matchedReadings.length > 0 ? `
      <div style="margin-bottom: var(--space-l);">
        <h4 style="margin-bottom: 8px; color: var(--accent);">Matched Readings (${matchedReadings.length})</h4>
        <div class="clean-reading-list">
          ${matchedReadings.map(r => `
            <div class="reading-row">
              <div class="reading-info">
                <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="reading-link">${highlight(r.title, query)}</a>
                <span class="reading-author-meta">${highlight(r.author, query)}</span>
                <span class="reading-type-badge">${r.paper}</span>
              </div>
              <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-open-drive">Drive</a>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${matchedNotices.length > 0 ? `
      <div style="margin-bottom: var(--space-l);">
        <h4 style="margin-bottom: 8px; color: var(--color-orange);">Verified Notices & Citations (${matchedNotices.length})</h4>
        ${matchedNotices.map(n => `
          <div class="notice-card" style="margin-bottom: 8px;">
            <div class="notice-title" style="font-size: 1rem;">${highlight(n.title, query)}</div>
            <div class="citation-box" style="margin: 6px 0;">"${highlight(n.exactQuote, query)}"</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">By: ${highlight(n.sender, query)} (${n.date})</div>
          </div>
        `).join('')}
      </div>
    ` : ''}
  `;
}

// -----------------------------------------------------------------------------
// UTILITIES & CLIPBOARD
// -----------------------------------------------------------------------------
function copyToClipboard(text, successMsg = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => showToast(successMsg));
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg);
    } catch (err) {
      console.error(err);
    }
    document.body.removeChild(textArea);
  }
}

function showToast(msg) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function escapeJsString(str) {
  if (!str) return '';
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '');
}

function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return escapeHtml(text).replace(regex, '<mark style="background: var(--color-powder-brown-bg); color: var(--text-heading); border-radius: 2px; padding: 0 2px;">$1</mark>');
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// -----------------------------------------------------------------------------
// WHATSAPP CITATION HOVERCARD CONTROLLER
// -----------------------------------------------------------------------------
function initCitationHovercards() {
  const hovercard = document.getElementById('citation-hovercard');
  if (!hovercard) return;

  const dateEl = document.getElementById('hc-date');
  const senderEl = document.getElementById('hc-sender');
  const quoteEl = document.getElementById('hc-quote');
  const sourceEl = document.getElementById('hc-source');

  let activeTrigger = null;
  let hideTimeout = null;

  function show(trigger) {
    if (hideTimeout) clearTimeout(hideTimeout);
    activeTrigger = trigger;

    const sender = trigger.getAttribute('data-citation-sender') || 'CR / Official Announcement';
    const date = trigger.getAttribute('data-citation-date') || '';
    const quote = trigger.getAttribute('data-citation-quote') || '';
    const source = trigger.getAttribute('data-citation-source') || 'WhatsApp Core Group';

    if (senderEl) senderEl.textContent = sender;
    if (dateEl) dateEl.textContent = date;
    if (quoteEl) quoteEl.textContent = `“${quote}”`;
    if (sourceEl) sourceEl.textContent = `Source: ${source}`;

    hovercard.classList.add('visible');
    hovercard.setAttribute('aria-hidden', 'false');

    positionHovercard(trigger);
  }

  function hide() {
    hideTimeout = setTimeout(() => {
      hovercard.classList.remove('visible');
      hovercard.setAttribute('aria-hidden', 'true');
      activeTrigger = null;
    }, 120);
  }

  function positionHovercard(trigger) {
    const rect = trigger.getBoundingClientRect();
    const cardRect = hovercard.getBoundingClientRect();
    const padding = 12;

    let left = rect.left + (rect.width / 2) - (cardRect.width / 2);
    if (left < padding) left = padding;
    if (left + cardRect.width > window.innerWidth - padding) {
      left = window.innerWidth - cardRect.width - padding;
    }

    let top = rect.top - cardRect.height - 8;
    if (top < 10) {
      top = rect.bottom + 8;
    }

    hovercard.style.left = `${left}px`;
    hovercard.style.top = `${top}px`;
  }

  document.addEventListener('mouseover', (e) => {
    const trigger = e.target.closest('.citation-trigger');
    if (trigger && trigger.hasAttribute('data-citation-quote')) {
      show(trigger);
    }
  });

  document.addEventListener('mouseout', (e) => {
    const trigger = e.target.closest('.citation-trigger');
    if (trigger) {
      hide();
    }
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.citation-trigger');
    if (trigger && trigger.hasAttribute('data-citation-quote')) {
      if (activeTrigger === trigger && hovercard.classList.contains('visible')) {
        hide();
      } else {
        show(trigger);
      }
    } else if (!hovercard.contains(e.target)) {
      hovercard.classList.remove('visible');
      hovercard.setAttribute('aria-hidden', 'true');
      activeTrigger = null;
    }
  });

  hovercard.addEventListener('mouseenter', () => {
    if (hideTimeout) clearTimeout(hideTimeout);
  });
  hovercard.addEventListener('mouseleave', () => {
    hide();
  });
}

// -----------------------------------------------------------------------------
// TOGGLE UNIT READINGS / DRIVES IN SYLLABUS SECTION
// Mutual exclusivity: Tapping any toggle opens it and closes previous sibling panels
// -----------------------------------------------------------------------------
function closeUnitPanel(type, unitKey) {
  const panelId = type ? `panel-${type}-${unitKey}` : `panel-${unitKey}`;
  const btnId = type ? `btn-toggle-${type}-${unitKey}` : `btn-toggle-${unitKey}`;
  const panel = document.getElementById(panelId);
  const btn = document.getElementById(btnId);
  if (panel) {
    panel.style.display = 'none';
  }
  if (btn) {
    btn.classList.remove('active');
    btn.setAttribute('aria-expanded', 'false');
    const arrow = btn.querySelector('.toggle-arrow');
    if (arrow) arrow.textContent = '▾';
  }
}

function toggleUnitReadings(unitKey) {
  const panel = document.getElementById(`panel-${unitKey}`);
  const btn = document.getElementById(`btn-toggle-${unitKey}`);
  if (!panel) return;

  const isHidden = panel.style.display === 'none';
  if (isHidden) {
    closeUnitPanel('cls', unitKey);
    closeUnitPanel('syl', unitKey);
    closeUnitPanel('drv', unitKey);

    panel.style.display = 'block';
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      const arrow = btn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = '▴';
    }
  } else {
    panel.style.display = 'none';
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      const arrow = btn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = '▾';
    }
  }
}

function toggleUnitSyllabusReadings(unitKey) {
  const panel = document.getElementById(`panel-syl-${unitKey}`);
  const btn = document.getElementById(`btn-toggle-syl-${unitKey}`);
  if (!panel) return;

  const isHidden = panel.style.display === 'none';
  if (isHidden) {
    closeUnitPanel('cls', unitKey);
    closeUnitPanel('drv', unitKey);
    closeUnitPanel('', unitKey);

    panel.style.display = 'block';
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      const arrow = btn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = '▴';
    }
  } else {
    panel.style.display = 'none';
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      const arrow = btn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = '▾';
    }
  }
}

function toggleUnitClassReadings(unitKey) {
  const panel = document.getElementById(`panel-cls-${unitKey}`);
  const btn = document.getElementById(`btn-toggle-cls-${unitKey}`);
  if (!panel) return;

  const isHidden = panel.style.display === 'none';
  if (isHidden) {
    closeUnitPanel('syl', unitKey);
    closeUnitPanel('drv', unitKey);
    closeUnitPanel('', unitKey);

    panel.style.display = 'block';
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      const arrow = btn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = '▴';
    }
  } else {
    panel.style.display = 'none';
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      const arrow = btn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = '▾';
    }
  }
}

function toggleUnitDrive(unitKey) {
  const panel = document.getElementById(`panel-drv-${unitKey}`);
  const btn = document.getElementById(`btn-toggle-drv-${unitKey}`);
  if (!panel) return;

  const isHidden = panel.style.display === 'none';
  if (isHidden) {
    closeUnitPanel('cls', unitKey);
    closeUnitPanel('syl', unitKey);
    closeUnitPanel('', unitKey);

    panel.style.display = 'block';
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      const arrow = btn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = '▴';
    }
  } else {
    panel.style.display = 'none';
    if (btn) {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      const arrow = btn.querySelector('.toggle-arrow');
      if (arrow) arrow.textContent = '▾';
    }
  }
}

// -----------------------------------------------------------------------------
// SYLLABUS & READINGS READER MODAL (EXPANDED BIGGER WINDOW OVERLAY)
// -----------------------------------------------------------------------------
function openSyllabusModal(paperCode) {
  const modal = document.getElementById('syllabus-reader-modal');
  const titleEl = document.getElementById('syllabus-reader-title');
  const contentEl = document.getElementById('syllabus-reader-content');

  if (!modal || !contentEl) return;

  const syllabusHtml = (portalData.fullSyllabi && portalData.fullSyllabi[paperCode]) || (typeof courseSyllabiData !== 'undefined' && courseSyllabiData[paperCode]) || '<p>Syllabus content unavailable.</p>';
  
  if (titleEl) {
    const paperNames = {
      'PS-CC 101': 'Key Texts in Political Philosophy',
      'PS-CC 102': 'Democracy & Political Institutions in India',
      'PS-CC 103': 'Theories of International Relations',
      'PS-CC 104': 'Security Studies',
      'PS-SBC 01': 'Elections & Electoral Analysis'
    };
    const paperName = paperNames[paperCode] || '';
    if (paperName) {
      titleEl.innerHTML = `<span class="reader-code-badge">${escapeHtml(paperCode)}:</span> <span class="reader-paper-title">${escapeHtml(paperName)}</span>`;
    } else {
      titleEl.textContent = paperCode ? `${paperCode} — Official Syllabus` : 'Official Course Syllabus';
    }
  }

  contentEl.innerHTML = `<div class="full-syllabus-body">${syllabusHtml}</div>`;
  contentEl.scrollTop = 0;
  
  modal.style.display = 'flex';
  void modal.offsetWidth; // force reflow for CSS transition
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeSyllabusModal() {
  const modal = document.getElementById('syllabus-reader-modal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  setTimeout(() => {
    modal.style.display = 'none';
  }, 250);
}

// -----------------------------------------------------------------------------
// CLASS NOTES ZOOM / LIGHTBOX MODAL
// -----------------------------------------------------------------------------
const allNotesGalleryItems = [
  {
    src: 'assets/notes/abhilasha-1.jpeg',
    title: 'Abhilasha · Page 1: Tracked Readings for Unit 1 & Unit 4',
    badge: 'Class Attendee',
    caption: 'Unit 1: Granville Austin, Pitkin, Bhargava, Baxi · Unit 4: Dicey, Sekhri, Gautam Bhatia, Baxi, Moiz Tundawala'
  },
  {
    src: 'assets/notes/abhilasha-2.jpeg',
    title: 'Abhilasha · Page 2: Extended Readings Tracking',
    badge: 'Class Attendee',
    caption: 'Post-colonial legal perspectives & course reading themes'
  },
  {
    src: 'assets/notes/diksha-1.jpeg',
    title: 'Diksha · Page 1: Unit 1(b) & Unit 1(c) Tracked Readings',
    badge: 'Class Attendee',
    caption: 'Granville Austin (Cornerstone Ch 1, 2, 3, 13; Working a Democratic Constitution pp. 53-54), Hanna Pitkin, Upendra Baxi, Rajiv Bhargava, Gautam Bhatia'
  },
  {
    src: 'assets/notes/diksha-2.jpeg',
    title: 'Diksha · Page 2: Unit 4(a) Tracked Readings',
    badge: 'Class Attendee',
    caption: 'A.V. Dicey, Upendra Baxi, Moiz Tundawala, criminal law decolonization citations'
  }
];

let currentNoteIndex = 0;

function openNoteZoom(src, title, badge, caption) {
  const modal = document.getElementById('notes-zoom-modal');
  if (!modal) return;

  const idx = allNotesGalleryItems.findIndex(item => item.src === src);
  if (idx !== -1) {
    currentNoteIndex = idx;
  }

  updateNoteZoomDisplay();

  modal.style.display = 'flex';
  void modal.offsetWidth; // force reflow for CSS transition
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function updateNoteZoomDisplay() {
  const item = allNotesGalleryItems[currentNoteIndex];
  if (!item) return;

  const titleEl = document.getElementById('notes-zoom-title');
  const badgeEl = document.getElementById('notes-zoom-badge');
  const captionEl = document.getElementById('notes-zoom-caption');
  const imgEl = document.getElementById('notes-zoom-img');
  const rawLinkEl = document.getElementById('notes-zoom-raw-link');
  const counterEl = document.getElementById('notes-zoom-counter');

  if (titleEl) titleEl.textContent = item.title;
  if (badgeEl) badgeEl.textContent = item.badge;
  if (captionEl) captionEl.textContent = item.caption;
  if (imgEl) {
    imgEl.src = item.src;
    imgEl.alt = item.title;
  }
  if (rawLinkEl) rawLinkEl.href = item.src;
  if (counterEl) counterEl.textContent = `${currentNoteIndex + 1} / ${allNotesGalleryItems.length}`;
}

function navigateNoteZoom(direction) {
  const total = allNotesGalleryItems.length;
  currentNoteIndex = (currentNoteIndex + direction + total) % total;
  updateNoteZoomDisplay();
}

function closeNoteZoom() {
  const modal = document.getElementById('notes-zoom-modal');
  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  setTimeout(() => {
    modal.style.display = 'none';
  }, 250);
}

// Close modal on Escape key press & arrows for note zoom
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSyllabusModal();
    closeNoteZoom();
  } else if (e.key === 'ArrowRight') {
    const modal = document.getElementById('notes-zoom-modal');
    if (modal && modal.classList.contains('open')) navigateNoteZoom(1);
  } else if (e.key === 'ArrowLeft') {
    const modal = document.getElementById('notes-zoom-modal');
    if (modal && modal.classList.contains('open')) navigateNoteZoom(-1);
  }
});

// -----------------------------------------------------------------------------
// REDIRECT TO SYLLABUS IN DRIVES SECTION & POP OPEN READER MODAL
// -----------------------------------------------------------------------------
function navigateToSyllabusCard(paperCode) {
  const drivesTab = document.querySelector('.tab-btn[data-view="drives"]');
  if (drivesTab) drivesTab.click();

  setTimeout(() => {
    let targetCard = document.querySelector(`.drive-box[data-paper-code="${paperCode}"]`);
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetCard.classList.add('pulse-card-highlight');
      setTimeout(() => {
        targetCard.classList.remove('pulse-card-highlight');
      }, 2200);
    }
    openSyllabusModal(paperCode);
  }, 120);
}

// -----------------------------------------------------------------------------
// FILTER DRIVES HORIZONTAL CATEGORY SECTIONS
// -----------------------------------------------------------------------------
function filterDrivesSection(filterId) {
  const chips = document.querySelectorAll('#drives-sub-filters .chip');
  chips.forEach(chip => {
    if (chip.getAttribute('data-dfilter') === filterId) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  const container = document.getElementById('drives-grid-container');
  if (container) {
    if (filterId === 'all') {
      container.classList.remove('drives-single-col');
    } else {
      container.classList.add('drives-single-col');
    }
  }

  const categoryGroups = document.querySelectorAll('.drives-category-group');
  categoryGroups.forEach(group => {
    if (filterId === 'all') {
      group.classList.remove('hidden');
    } else {
      if (group.id === `cat-${filterId}`) {
        group.classList.remove('hidden');
      } else {
        group.classList.add('hidden');
      }
    }
  });
}
