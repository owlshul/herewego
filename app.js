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

  container.innerHTML = papers.map(paper => {
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
      <div class="syllabus-header-row">
        <h4 class="section-subheading syllabus-subheading">
          ${syllabusCit ? `
            <button type="button" class="proof-qmark citation-trigger" ${syllabusCitAttrs} title="Hover to view WhatsApp proof" aria-label="View WhatsApp syllabus proof">?</button>
          ` : ''}
          <span>Syllabus</span>
        </h4>
        ${paper.syllabusPdf ? `
          <button type="button" class="btn-syllabus-pdf-chip" onclick="openPdfModal('${escapeJsString(paper.syllabusPdf)}', '${escapeJsString(paper.code)}: ${escapeJsString(paper.name)} — Official Syllabus')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            <span>Official Syllabus PDF</span>
          </button>
        ` : ''}
      </div>
    `;

    // Syllabus Clean List with direct Readings/Drives toggle button
    const syllabusHtml = paper.syllabusTopics.map((unit, uIdx) => {
      const unitKey = `${paper.id}-u${uIdx}`;
      const hasDrives = unit.drives && unit.drives.length > 0;
      const hasItems = unit.items && unit.items.length > 0;
      const hasReadings = hasDrives || hasItems || unit.readingsNote;

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

          ${hasReadings ? `
            <button type="button" class="btn-toggle-readings" onclick="toggleUnitReadings('${unitKey}')" id="btn-toggle-${unitKey}" aria-expanded="false">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              <span>Readings / Drives</span>
              <span class="toggle-arrow">▾</span>
            </button>
          ` : ''}

          ${hasReadings ? `
            <div class="unit-readings-panel" id="panel-${unitKey}" style="display: none;">
              ${unit.readingsNote ? `
                <div class="unit-readings-note">
                  <svg class="fallback-icon-svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  <span>${escapeHtml(unit.readingsNote)}</span>
                </div>
              ` : ''}

              ${hasItems ? `
                <div class="clean-reading-list">
                  ${unit.items.map(r => `
                    <div class="reading-row">
                      <div class="reading-info">
                        <span class="reading-type-label">${escapeHtml(r.type || 'Reading')}:</span>
                        <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="reading-link">
                          <span>${escapeHtml(r.title)}</span>
                        </a>
                        <span class="reading-author-meta">${escapeHtml(r.author)}</span>
                        ${r.scope ? `<span class="reading-scope-note">(${escapeHtml(r.scope)})</span>` : ''}
                      </div>
                      <div class="reading-actions">
                        <a href="${r.url}" target="_blank" rel="noopener noreferrer" class="btn-open-drive">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                          Drive
                        </a>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : ''}

              ${hasDrives ? `
                <div class="folder-rows-list" style="margin-top: 6px;">
                  ${unit.drives.map(f => `
                    <a href="${f.url}" target="_blank" rel="noopener noreferrer" class="drive-link-row">
                      <svg class="drive-link-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                      <span class="drive-link-label">${escapeHtml(f.name)}${f.scope ? `<span class="drive-link-scope"> · ${escapeHtml(f.scope)}</span>` : ''}</span>
                      <svg class="drive-link-ext" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

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
          ${syllabusHeaderHtml}
          ${syllabusHtml}
          ${footnoteHtml}
        </div>
      </article>
    `;
  }).join('');
}

// 2. Master Drives & Important Links View
function renderDrivesView() {
  const container = document.getElementById('drives-grid-container');
  if (!container) return;

  container.innerHTML = portalData.masterDrives.map(drive => {
    const isPdf = !!drive.isPdf;
    const actionHtml = isPdf ? `
      <div class="drive-box-actions">
        <button type="button" class="btn-drive-main btn-drive-embed" onclick="openPdfModal('${escapeJsString(drive.url)}', '${escapeJsString(drive.name)}')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          <span>View Embedded</span>
        </button>
        <a href="${drive.url}" target="_blank" rel="noopener noreferrer" class="btn-drive-sub" title="Open PDF in new tab" aria-label="Open PDF in new tab">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      </div>
    ` : `
      <a href="${drive.url}" target="_blank" rel="noopener noreferrer" class="btn-drive-main">
        <span>${escapeHtml(drive.btnText || 'Open Link')}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
      </a>
    `;

    return `
      <div class="drive-box${isPdf ? ' drive-box--pdf' : ''}">
        <div>
          <span class="pill" style="margin-bottom: 6px; display: inline-block;">${drive.badge}</span>
          <h3 class="drive-box-title">${escapeHtml(drive.name)}</h3>
          <p class="drive-box-curator">${drive.curatorLabel || 'Curator'}: <strong>${escapeHtml(drive.curators)}</strong></p>
          <p class="drive-box-desc">${escapeHtml(drive.description)}</p>
        </div>
        ${actionHtml}
      </div>
    `;
  }).join('');
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

// 4. Directory View (CRs with WhatsApp only + Etiquette Notice + Faculty by Paper)
function renderDirectoryView() {
  const crContainer = document.getElementById('crs-container');
  const coreFacultyContainer = document.getElementById('core-faculty-container');
  const sbcContainer = document.getElementById('sbc-container');
  const dseContainer = document.getElementById('dse-container');

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
// -----------------------------------------------------------------------------
function toggleUnitReadings(unitKey) {
  const panel = document.getElementById(`panel-${unitKey}`);
  const btn = document.getElementById(`btn-toggle-${unitKey}`);
  if (!panel) return;

  const isHidden = panel.style.display === 'none';
  if (isHidden) {
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
// EMBEDDED PDF MODAL VIEWER
// -----------------------------------------------------------------------------
function openPdfModal(url, title) {
  const modal = document.getElementById('pdf-modal');
  const frame = document.getElementById('pdf-modal-frame');
  const titleEl = document.getElementById('pdf-modal-title');
  const extLink = document.getElementById('pdf-modal-external');
  const fallbackLink = document.getElementById('pdf-modal-fallback-link');

  if (!modal || !frame) return;

  if (titleEl) titleEl.textContent = title || 'Official Syllabus PDF';
  frame.src = url;
  if (extLink) extLink.href = url;
  if (fallbackLink) fallbackLink.href = url;

  modal.classList.add('pdf-modal--visible');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePdfModal() {
  const modal = document.getElementById('pdf-modal');
  const frame = document.getElementById('pdf-modal-frame');
  if (!modal) return;

  modal.classList.remove('pdf-modal--visible');
  modal.setAttribute('aria-hidden', 'true');
  if (frame) frame.src = '';
  document.body.style.overflow = '';
}

// Global ESC key listener to close PDF modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePdfModal();
  }
});

