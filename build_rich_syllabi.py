import re
import json

def format_links(text):
    svg_icon = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
    
    # Replace markdown links [text](url)
    def repl(m):
        t = m.group(1)
        u = m.group(2)
        return f'<a href="{u}" target="_blank" rel="noopener noreferrer" class="rich-drive-link"><span>{t}</span> {svg_icon}</a>'
        
    res = re.sub(r'\[([^\]]+)\]\((https?://[^\)]+)\)', repl, text)
    res = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', res)
    res = re.sub(r'\*([^*]+)\*', r'<em>\1</em>', res)
    res = re.sub(r'`([^`]+)`', r'<code>\1</code>', res)
    return res

def format_drive_link_item(dl_line):
    # Match pattern: * **Prefix**: [Link Text](url) *(Drive Info)*
    m = re.match(r'^\s*(?:\*\s*)?(?:\*\*([^*]+)\*\*:\s*)?\[([^\]]+)\]\((https?://[^\)]+)\)(?:\s*(?:\*\(|\()(.*?)(?:\)\*|\)))?\s*$', dl_line)
    if m:
        prefix = (m.group(1) or '').strip()
        link_text = m.group(2).strip()
        link_url = m.group(3).strip()
        drive_note = (m.group(4) or '').strip().replace('`', '').replace('*', '')
        
        svg_ext = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>'
        svg_folder = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>'
        
        prefix_badge = f'<span class="drive-link-badge">{prefix}</span>' if prefix else ''
        folder_html = f'<div class="drive-folder-loc">{svg_folder} <span>{drive_note}</span></div>' if drive_note else ''
        
        return f'''
        <div class="reading-drive-link-card">
          <div class="drive-link-main">
            {prefix_badge}
            <a href="{link_url}" target="_blank" rel="noopener noreferrer" class="reading-pdf-btn">
              <span class="pdf-btn-title">{link_text}</span>
              <span class="pdf-btn-icon">{svg_ext}</span>
            </a>
          </div>
          {folder_html}
        </div>
        '''
    else:
        return f'<div class="reading-link-item">{format_links(dl_line)}</div>'

def parse_reading_block(block_text):
    lines = [l.strip() for l in block_text.strip().split('\n') if l.strip() and l.strip() != '---' and l.strip() != '--']
    if not lines:
        return ""
        
    first_line = lines[0]
    num_match = re.match(r'^(\d+)\.\s*\*\*([^*]+)\*\*', first_line)
    if num_match:
        index_num = num_match.group(1)
        author_title = num_match.group(2).strip()
    else:
        index_num = ""
        author_title = first_line.replace('*', '').strip()
        
    citation = ""
    status = ""
    drive_links = []
    other_info = []
    
    for l in lines[1:]:
        l_clean = re.sub(r'^[*-]\s*', '', l).strip()
        if l_clean.startswith('**Citation**:'):
            citation = l_clean.replace('**Citation**:', '').strip()
        elif l_clean.startswith('**Status**:'):
            status = l_clean.replace('**Status**:', '').strip()
        elif 'Drive Link' in l_clean or 'drive.google.com' in l_clean or 'Primary Drive' in l_clean or 'Alternative Drive' in l_clean:
            drive_links.append(l_clean)
        else:
            if l_clean and l_clean != '---':
                other_info.append(l_clean)
            
    # Determine status pill
    is_found = 'FOUND' in status or '✅' in status
    is_missing = 'NOT' in status or '❌' in status or 'Could not' in status
    
    if is_found:
        status_html = '<span class="status-pill status-found"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg> Available in Drive</span>'
    elif is_missing:
        status_html = '<span class="status-pill status-missing"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> Not in Drive Folders</span>'
    else:
        status_html = f'<span class="status-pill status-neutral">{format_links(status)}</span>' if status else ''

    links_html = ""
    if drive_links:
        links_list = []
        for dl in drive_links:
            formatted_dl = format_drive_link_item(dl)
            links_list.append(formatted_dl)
        links_html = f'<div class="reading-links-box">{"".join(links_list)}</div>'

    others_html = ""
    if other_info:
        others_list = [f'<li>{format_links(o)}</li>' for o in other_info]
        others_html = f'<ul class="reading-extra-info">{"".join(others_list)}</ul>'

    card_html = f'''
    <div class="reading-entry-card {'has-drive' if is_found else 'missing-drive'}">
      <div class="reading-card-header">
        <div class="reading-author-title">
          {f'<span class="reading-num-badge">#{index_num}</span>' if index_num else ''}
          <h5 class="reading-author-name">{author_title}</h5>
        </div>
        <div class="reading-card-status">
          {status_html}
        </div>
      </div>
      {f'<div class="reading-citation"><span class="citation-label">Citation:</span> {format_links(citation)}</div>' if citation else ''}
      {links_html}
      {others_html}
    </div>
    '''
    return card_html

def parse_readings_section(sec_body, paper_code="", is_suggested=False):
    unit_parts = re.split(r'\n###\s+', '\n' + sec_body)
    html_out = []
    nav_pills = []
    
    clean_code = re.sub(r'[^a-zA-Z0-9]', '', paper_code).lower()
    prefix_id = f"sug-{clean_code}" if is_suggested else f"unit-{clean_code}"
    
    for idx, up in enumerate(unit_parts):
        up = up.strip()
        if not up or up == '---':
            continue
        lines = up.split('\n')
        unit_header = lines[0].strip()
        body_text = '\n'.join(lines[1:]).strip()
        
        unit_pill_match = re.match(r'^(Unit\s+[IVX]+)', unit_header, re.I)
        unit_label = unit_pill_match.group(1) if unit_pill_match else (f"Part {idx}" if not is_suggested else f"Ref {idx}")
        unit_slug = f"{prefix_id}-{idx}"
        
        nav_pills.append(f'''<button type="button" class="unit-jump-pill" onclick="document.getElementById('{unit_slug}')?.scrollIntoView({{behavior: 'smooth', block: 'start'}})">{unit_label}</button>''')
        
        items = re.split(r'\n(?=\d+\.\s*\*\*)', '\n' + body_text)
        
        cards_html = []
        for item in items:
            item = item.strip()
            if not item or item == '---':
                continue
            if re.match(r'^\d+\.\s*\*\*', item):
                cards_html.append(parse_reading_block(item))
            else:
                cards_html.append(f'<div class="reading-unit-intro">{format_links(item)}</div>')
                
        html_out.append(f'''
        <div class="readings-unit-group" id="{unit_slug}">
          <div class="readings-unit-header">
            <span class="unit-pill">{"Suggested Reference" if is_suggested else "Unit Readings"}</span>
            <h4 class="readings-unit-title">{unit_header}</h4>
          </div>
          <div class="readings-cards-list">
            {"".join(cards_html)}
          </div>
        </div>
        ''')
        
    pills_bar = ""
    if nav_pills and len(nav_pills) > 1:
        pills_bar = f'''
        <div class="readings-jump-bar">
          <span class="jump-bar-label">Quick Jump:</span>
          <div class="jump-pills-scroll">
            {"".join(nav_pills)}
          </div>
        </div>
        '''
        
    return pills_bar + "".join(html_out)

def parse_full_syllabus(md_path, paper_code, is_cc101_or_103=False):
    with open(md_path, 'r', encoding='utf-8') as f:
        text = f.read()

    # Filter Drive 2 from 101/103
    if is_cc101_or_103:
        lines = []
        for l in text.split('\n'):
            if '1gL9IVzLxIhe4BSoghS_FbXaAT6qkcTjZ' in l or 'Drive 2: CC-102' in l:
                continue
            lines.append(l)
        text = '\n'.join(lines)

    # Split by ## Section
    sections = re.split(r'\n##\s+', text)
    header_raw = sections[0].strip()
    
    header_lines = [l.strip() for l in header_raw.split('\n') if l.strip() and l.strip() != '---']
    title_line = header_lines[0].replace('#', '').strip()
    
    drive_folder_links = []
    for l in header_lines:
        if 'drive.google.com' in l:
            drive_folder_links.append(format_links(l.replace('*', '').strip()))
            
    clean_code = re.sub(r'[^a-zA-Z0-9]', '', paper_code).lower()
    
    has_suggested = any('suggested readings' in s.lower() for s in sections[1:])
    
    hero_html = f'''
    <div class="syllabus-hero-banner">
      <div class="syllabus-hero-top">
        <div class="hero-top-badges">
          <span class="syllabus-code-badge">{paper_code}</span>
          <span class="syllabus-sub-badge">MA Pol Sci · Semester 1</span>
        </div>
        <h2 class="syllabus-main-title">{title_line}</h2>
        <div class="syllabus-meta-strip">
          <span class="meta-tag"><strong>Credits:</strong> 4</span>
          <span class="meta-dot">·</span>
          <span class="meta-tag"><strong>Duration:</strong> 4 hrs / week</span>
          <span class="meta-dot">·</span>
          <span class="meta-tag"><strong>Evaluation:</strong> Internal Assessment + Final Exam</span>
        </div>
      </div>

      <div class="syllabus-quick-nav-strip">
        <button type="button" class="quick-nav-btn" onclick="document.getElementById('sec-content-{clean_code}')?.scrollIntoView({{behavior: 'smooth', block: 'start'}})">
          <span>📚</span> <span>Course Units</span>
        </button>
        <button type="button" class="quick-nav-btn" onclick="document.getElementById('sec-essential-{clean_code}')?.scrollIntoView({{behavior: 'smooth', block: 'start'}})">
          <span>📖</span> <span>Essential Readings</span>
        </button>
        {f"""<button type="button" class="quick-nav-btn" onclick="document.getElementById('sec-suggested-{clean_code}')?.scrollIntoView({{behavior: 'smooth', block: 'start'}})">
          <span>📑</span> <span>Suggested Readings</span>
        </button>""" if has_suggested else ""}
      </div>

      {f"""
      <div class="syllabus-master-drives-bar">
        <div class="drives-bar-title">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          <span>Course Drive Repositories:</span>
        </div>
        <div class="drives-bar-links">
          {"".join([f'<div class="master-drive-btn">{d}</div>' for d in drive_folder_links])}
        </div>
      </div>
      """ if drive_folder_links else ""}
    </div>
    '''
    
    body_sections_html = []
    
    for sec in sections[1:]:
        sec = sec.strip()
        if not sec:
            continue
        lines = sec.split('\n')
        sec_title = lines[0].strip()
        sec_content_lines = [l.strip() for l in lines[1:] if l.strip() and l.strip() != '---']
        sec_content = '\n'.join(sec_content_lines).strip()
        sec_lower = sec_title.lower()
        
        # User instruction: Remove course objectives, course learning outcomes, and facilitating section
        if 'objective' in sec_lower or 'learning outcome' in sec_lower or 'outcomes' in sec_lower or 'facilitat' in sec_lower:
            continue
        elif 'content' in sec_lower or 'structure' in sec_lower:
            unit_blocks = re.split(r'\n(?=\*\s*\*\*Unit|\*\s*Unit)', '\n' + sec_content)
            unit_cards_html = []
            for ub in unit_blocks:
                ub = ub.strip()
                if not ub or ub == '---':
                    continue
                ub_lines = [l for l in ub.split('\n') if l.strip() and l.strip() != '---']
                u_header = ub_lines[0].replace('*', '').strip()
                sub_topics = [re.sub(r'^[*\s-]+', '', subl).strip() for subl in ub_lines[1:] if subl.strip() and subl.strip() != '---']
                topics_html = "".join([f'<li class="unit-topic-item">{format_links(st)}</li>' for st in sub_topics if st])
                unit_cards_html.append(f'''
                <div class="content-unit-item">
                  <h4 class="content-unit-header">{u_header}</h4>
                  {f'<ul class="unit-topics-sublist">{topics_html}</ul>' if topics_html else ''}
                </div>
                ''')
            body_sections_html.append(f'''
            <div class="syllabus-section-card content-card" id="sec-content-{clean_code}">
              <div class="section-card-header">
                <div class="sec-icon sec-icon-book">📚</div>
                <div>
                  <h3 class="section-card-title">Course Content &amp; Unit Breakdown</h3>
                  <p class="section-card-subtitle">Official syllabus units and key thematic areas.</p>
                </div>
              </div>
              <div class="section-card-body">
                <div class="content-units-grid">
                  {"".join(unit_cards_html)}
                </div>
              </div>
            </div>
            ''')
        elif 'essential readings' in sec_lower:
            readings_html = parse_readings_section(sec_content, paper_code=paper_code, is_suggested=False)
            body_sections_html.append(f'''
            <div class="syllabus-section-card readings-section-card" id="sec-essential-{clean_code}">
              <div class="section-card-header">
                <div class="sec-icon sec-icon-folder">📖</div>
                <div>
                  <h3 class="section-card-title">{sec_title}</h3>
                  <p class="section-card-subtitle">Prescribed essential readings mapped directly to verified Google Drive PDFs.</p>
                </div>
              </div>
              <div class="section-card-body">
                {readings_html}
              </div>
            </div>
            ''')
        elif 'suggested readings' in sec_lower:
            suggested_html = parse_readings_section(sec_content, paper_code=paper_code, is_suggested=True)
            body_sections_html.append(f'''
            <div class="syllabus-section-card readings-section-card suggested-readings-card" id="sec-suggested-{clean_code}">
              <div class="section-card-header">
                <div class="sec-icon sec-icon-folder">📑</div>
                <div>
                  <h3 class="section-card-title">{sec_title}</h3>
                  <p class="section-card-subtitle">Additional reference books &amp; curated materials.</p>
                </div>
              </div>
              <div class="section-card-body">
                {suggested_html}
              </div>
            </div>
            ''')
        else:
            # Any other section not explicitly recognized is skipped to prevent boilerplate
            continue

    bottom_bar_html = f'''
    <div class="syllabus-bottom-bar">
      <button type="button" class="btn-syllabus-top" onclick="document.getElementById('syllabus-reader-content')?.scrollTo({{top: 0, behavior: 'smooth'}})">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
        <span>Back to Top</span>
      </button>
      <button type="button" class="btn-syllabus-close" onclick="closeSyllabusModal()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        <span>Close Syllabus</span>
      </button>
    </div>
    '''

    full_html = f'''
    <div class="rich-syllabus-wrapper">
      {hero_html}
      <div class="syllabus-body-sections">
        {"".join(body_sections_html)}
      </div>
      {bottom_bar_html}
    </div>
    '''
    return full_html

cc1_path = '/Users/apple/Desktop/MA_PolSci_Exam_Readings/CC1_Key_Texts_in_Political_Philosophy_Readings.md'
cc2_path = '/Users/apple/Desktop/MA_PolSci_Exam_Readings/CC2_Democracy_and_Political_Institutions_Readings.md'
cc3_path = '/Users/apple/Desktop/MA_PolSci_Exam_Readings/CC3_Theories_of_International_Relations_Readings.md'

rich_data = {
    'PS-CC 101': parse_full_syllabus(cc1_path, paper_code='PS-CC 101', is_cc101_or_103=True),
    'PS-CC 102': parse_full_syllabus(cc2_path, paper_code='PS-CC 102', is_cc101_or_103=False),
    'PS-CC 103': parse_full_syllabus(cc3_path, paper_code='PS-CC 103', is_cc101_or_103=True)
}

js_content = 'const courseSyllabiData = ' + json.dumps(rich_data, indent=2, ensure_ascii=False) + ';\n\nif (typeof portalData !== "undefined") {\n  portalData.fullSyllabi = courseSyllabiData;\n}\n'

with open('syllabi_data.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('Rich syllabi_data.js regenerated cleanly without objectives, outcomes, or facilitating sections!')
