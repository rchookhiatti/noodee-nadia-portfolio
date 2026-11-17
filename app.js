/**
 * Noodee & Nadia — Student Portfolio Application Logic
 * Anglo Singapore International School (Secondary 3 & Secondary 1)
 * Supports:
 * - Image & PDF Certificate Uploads (with client-side compression & preview)
 * - Open-ended Custom Categories (Dynamic category filter tabs)
 * - Global Year Sourcing & Chronological Sorting
 * - JSON Backup Export / Import
 */

const DEFAULT_DATA = {
  state: {
    activeSister: 'both',  // 'both' | 'noodee' | 'nadia'
    activeYear: 'all',     // 'all' | '2026' | '2025' | '2024' | ...
    yearSort: 'desc',      // 'desc' (Newest first) | 'asc' (Oldest first)
    awardFilter: 'all',    // 'all' | any dynamic category string
    projectFilter: 'all',  // 'all' | any dynamic category string
    editMode: false
  },
  sisters: {
    noodee: {
      id: 'noodee',
      name: 'Noodee',
      level: 'Secondary 3 (Grade 9)',
      curriculum: 'Singapore-Cambridge IGCSE Track',
      tagline: 'STEM Scholar, Analytical Thinker & Student Leader',
      bio: 'A dedicated Secondary 3 student at Anglo Singapore International School with a deep passion for Additional Mathematics, Biomedical Sciences, and trilingual communication. Noodee thrives on collaborative research, debate, and mentoring younger peers.',
      avatar: 'assets/noodee.jpg',
      stats: [
        { value: '4.0 / A*', label: 'Academic GPA' },
        { value: 'HSK 5', label: 'Mandarin Level' },
        { value: '14+', label: 'Honors & Awards' }
      ],
      interests: [
        'Additional Mathematics',
        'Biomedical Chemistry',
        'Model United Nations',
        'Robotics & Python',
        'Badminton Varsity'
      ],
      subjects: [
        {
          name: 'Additional & Extended Mathematics',
          grade: 'A* (96%)',
          percent: 96,
          note: 'Top 5% of cohort; Singapore Math Olympiad Senior Division representative.'
        },
        {
          name: 'Pure Sciences (Physics, Chemistry & Biology)',
          grade: 'A* (94%)',
          percent: 94,
          note: 'Lead student researcher in Sustainable Bioplastics & Water Filtration lab.'
        },
        {
          name: 'First Language English & World Literature',
          grade: 'A (91%)',
          percent: 91,
          note: 'Varsity Debater and Editor for the Secondary School Chronicle.'
        },
        {
          name: 'Computer Science & Algorithmic Thinking',
          grade: 'A* (95%)',
          percent: 95,
          note: 'Proficient in Python data analysis and autonomous sensor programming.'
        }
      ],
      languages: [
        { name: 'English', level: 'C1/C2 Fluent (First Language)' },
        { name: 'Mandarin Chinese', level: 'HSK 5 (Advanced Distinction)' },
        { name: 'Thai', level: 'Native Proficiency' }
      ]
    },
    nadia: {
      id: 'nadia',
      name: 'Nadia',
      level: 'Secondary 1 (Grade 7)',
      curriculum: 'Lower Secondary Singapore Honours Track',
      tagline: 'Young Violinist, Creative Problem Solver & Eco Innovator',
      bio: 'An enthusiastic and curious Secondary 1 student at Anglo Singapore International School who blends strong foundations in Singapore Mathematics with classical violin performance, digital illustration, and environmental stewardship.',
      avatar: 'assets/nadia.jpg',
      stats: [
        { value: 'Distinction', label: 'Honour Roll' },
        { value: 'ABRSM G6', label: 'Violin & Theory' },
        { value: '10+', label: 'Medals & Awards' }
      ],
      interests: [
        'Classical Violin',
        'Singapore Math Olympiad',
        'Digital Illustration',
        'Environmental Club',
        'Competitive Swimming'
      ],
      subjects: [
        {
          name: 'Lower Secondary Singapore Mathematics',
          grade: 'A* (95%)',
          percent: 95,
          note: 'SASMO Gold Medalist; excels in heuristic problem solving and number theory.'
        },
        {
          name: 'Integrated Inquiry Science',
          grade: 'A (92%)',
          percent: 92,
          note: 'Designed a solar-powered classroom micro-garden for the Annual Science Fair.'
        },
        {
          name: 'English Language & Creative Writing',
          grade: 'A* (93%)',
          percent: 93,
          note: '1st Runner-Up in Lower Secondary Storytelling & Poetry Anthology.'
        },
        {
          name: 'Visual Arts & Music Performance',
          grade: 'A* (97%)',
          percent: 97,
          note: 'First Violin section in the Anglo Singapore String Ensemble.'
        }
      ],
      languages: [
        { name: 'English', level: 'Fluent Academic Proficiency' },
        { name: 'Mandarin Chinese', level: 'HSK 4 (Merit Scholar)' },
        { name: 'Thai', level: 'Native Proficiency' }
      ]
    }
  },
  awards: [
    {
      id: 'aw-1',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2026',
      category: 'STEM & Math',
      title: 'SASMO (Singapore & Asian Schools Math Olympiad)',
      result: 'Gold Award — Top 8% Globally',
      issuer: 'Singapore International Mastery Contests Centre (SIMCC)',
      description: 'Achieved Gold standing in the Secondary 3 division, demonstrating advanced algebraic reasoning, combinatorics, and non-routine problem-solving skills.',
      skills: 'Combinatorics, Number Theory, Deductive Proof',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'aw-2',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2026',
      category: 'STEM & Math',
      title: 'SASMO Lower Secondary Mathematics Olympiad',
      result: 'Silver Award — Distinction',
      issuer: 'Singapore International Mastery Contests Centre (SIMCC)',
      description: 'Recognized among top Secondary 1 performers in her first year transitioning from Primary to Lower Secondary competitive mathematics.',
      skills: 'Heuristic Modeling, Spatial Geometry, Logic Puzzles',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'aw-3',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2026',
      category: 'Academic Honours',
      title: 'VANDA International Science Competition',
      result: 'Gold Medal — National Honor Roll',
      issuer: 'VANDA Global Science Committee',
      description: 'Awarded Gold for analytical application of Chemistry and Cellular Biology concepts to real-world environmental challenges.',
      skills: 'Experimental Design, Organic Chemistry, Data Interpretation',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'aw-4',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2026',
      category: 'Arts & Music',
      title: 'ABRSM Grade 6 Violin Practical Assessment',
      result: 'Passed with Distinction (136/150)',
      issuer: 'Associated Board of the Royal Schools of Music (ABRSM)',
      description: 'Performed Baroque, Classical, and 20th-century repertoire with commendation from examiners for tonal warmth and expressive phrasing.',
      skills: 'Solo Performance, Sight-Reading, Musicality',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'aw-5',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Leadership & MUN',
      title: 'Bangkok International Schools Model United Nations (BISMUN)',
      result: 'Best Delegate Commendation — UNEP Committee',
      issuer: 'Anglo Singapore & Partner International Schools',
      description: 'Authored the primary resolution on transboundary plastic waste reduction in ASEAN waterways and led coalition consensus building.',
      skills: 'Public Speaking, Policy Drafting, Diplomacy',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'aw-6',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2025',
      category: 'Academic Honours',
      title: 'Anglo Singapore Principal’s Academic Honour Roll',
      result: 'Overall Academic Excellence — Term 1 & 2',
      issuer: 'Anglo Singapore International School',
      description: 'Maintained above 90% average across Mathematics, Science, English, and Mandarin during her transition into Secondary 1.',
      skills: 'Bilingual Mastery, Consistent Academic Rigor',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'aw-7',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2024',
      category: 'Languages & HSK',
      title: 'HSK Level 5 Chinese Proficiency Test',
      result: 'Distinction (278 / 300 Points)',
      issuer: 'Chinese Testing International (CTI)',
      description: 'Passed HSK Level 5 with high distinction, demonstrating advanced reading comprehension, essay writing, and oral fluency in Mandarin.',
      skills: 'Mandarin Chinese, Translation, Cross-Cultural Communication',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    }
  ],
  ccas: [
    {
      id: 'cca-1',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2026',
      icon: '🏛️',
      role: 'Vice President & Senior Mentor',
      title: 'Student Council & Peer Tutoring Society',
      detail: 'Organizes school-wide cultural days, leads orientation for incoming Secondary 1 students, and coordinates weekly Math & Science peer study clinics.',
      schedule: '2024 – 2026 • 4 hrs/week'
    },
    {
      id: 'cca-2',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2026',
      icon: '🎻',
      role: 'First Violin Section',
      title: 'Anglo Singapore Chamber String Ensemble',
      detail: 'Performs at annual Speech Day concerts, festive showcases, and charity music recitals across Bangkok campuses.',
      schedule: '2025 – 2026 • 3.5 hrs/week'
    },
    {
      id: 'cca-3',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      icon: '🏸',
      role: 'U-15 Girls Doubles Squad',
      title: 'Varsity Badminton Team',
      detail: 'Competes in inter-international school friendly tournaments, fostering discipline, agility, and court strategy.',
      schedule: '2024 – 2026 • 3 hrs/week'
    },
    {
      id: 'cca-4',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2025',
      icon: '🌱',
      role: 'Junior Eco-Ambassador',
      title: 'Green Campus & Sustainability Club',
      detail: 'Designs bilingual visual campaigns for zero-waste lunches and tracks paper recycling metrics across Lower Secondary homerooms.',
      schedule: '2025 – 2026 • 2.5 hrs/week'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      sister: 'both',
      sisterName: 'Noodee & Nadia (Sister Collaboration)',
      year: '2026',
      category: 'Community Service',
      title: '“Read & Spark” Bilingual STEM Picture Books for Rural Schools',
      result: '350+ Books Donated across 4 Provinces',
      issuer: 'Community Service & Literacy Initiative',
      description: 'A joint sister initiative where Noodee wrote accessible science stories in English and Thai while Nadia illustrated every chapter. Together they raised funds to print and donate 350 copies to rural primary libraries.',
      skills: 'Bilingual Storytelling, Book Illustration, Community Fundraising',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'proj-2',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2026',
      category: 'STEM & Research',
      title: 'Biodegradable Packaging Film from Mango Peel Pectin',
      result: '1st Place — Upper Secondary Science Symposium',
      issuer: 'Anglo Singapore Science Department',
      description: 'Investigated tensile strength and soil decomposition rates of pectin-based bioplastics extracted from agricultural fruit waste as an eco-friendly alternative to single-use LDPE wraps.',
      skills: 'Polymer Chemistry, Statistical Analysis, Lab Protocol',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'proj-3',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2026',
      category: 'Creative Arts',
      title: '“Voices of the Chao Phraya” Digital Art & Acoustic Series',
      result: 'Featured in Annual School Arts Exhibition',
      issuer: 'Visual & Performing Arts Showcase',
      description: 'A multimedia portfolio combining 6 digital watercolor illustrations of Bangkok river heritage paired with an original solo violin arrangement recorded in the school auditorium.',
      skills: 'Procreate Digital Painting, Audio Recording, Cultural Research',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    },
    {
      id: 'proj-4',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'STEM & Research',
      title: 'Smart Classroom Air Quality & CO2 Alert Dashboard',
      result: 'Distinction — STEM Maker Fair',
      issuer: 'Computer Science & Robotics Club',
      description: 'Built an IoT sensor node using Python and microcontrollers to monitor PM2.5 and CO2 levels in classrooms, alerting teachers when ventilation is needed to keep students alert.',
      skills: 'Python, IoT Sensors, Data Visualization',
      attachmentData: null,
      attachmentType: null,
      attachmentName: null,
      externalLink: ''
    }
  ]
};

// Pending attachment state during modal form creation
let pendingAttachment = {
  data: null,
  type: null, // 'image' | 'pdf'
  name: null
};

// Load state from localStorage or fall back to DEFAULT_DATA
let appData = loadPortfolioData();

function loadPortfolioData() {
  try {
    const saved = localStorage.getItem('noodee_nadia_portfolio_v2');
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_DATA,
        ...parsed,
        state: { ...DEFAULT_DATA.state }
      };
    }
  } catch (e) {
    console.warn('Could not read localStorage, using defaults.', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function savePortfolioData() {
  try {
    localStorage.setItem('noodee_nadia_portfolio_v2', JSON.stringify({
      sisters: appData.sisters,
      awards: appData.awards,
      ccas: appData.ccas,
      projects: appData.projects
    }));
  } catch (e) {
    alert('Storage limit reached in browser! Consider using smaller PDF/Image files or linking via Google Drive URL.');
    console.warn('Could not save to localStorage.', e);
  }
}

/* ==========================================================================
   Year Sourcing & Dynamic Category Helpers
   ========================================================================== */

function getAllYearsWithCounts() {
  const activeSister = appData.state.activeSister;
  const allItems = [...appData.awards, ...appData.projects];
  const counts = {};
  let total = 0;

  allItems.forEach(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    if (!matchesSister) return;
    const yr = String(item.year || '2026').trim();
    counts[yr] = (counts[yr] || 0) + 1;
    total++;
  });

  const sortedYears = Object.keys(counts).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  return { sortedYears, counts, total };
}

function sortItemsByYear(items) {
  const dir = appData.state.yearSort === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const ya = String(a.year || '');
    const yb = String(b.year || '');
    return ya.localeCompare(yb, undefined, { numeric: true }) * dir;
  });
}

function renderYearSourcingBar() {
  const chipContainer = document.getElementById('year-sourcing-chips');
  if (!chipContainer) return;

  const { sortedYears, counts, total } = getAllYearsWithCounts();
  const activeYear = appData.state.activeYear;

  let html = `
    <button type="button" class="year-chip ${activeYear === 'all' ? 'active' : ''}" onclick="setYearFilter('all')">
      <span>All Years</span>
      <span class="year-count">${total}</span>
    </button>
  `;

  sortedYears.forEach(yr => {
    const isAct = activeYear === yr ? 'active' : '';
    html += `
      <button type="button" class="year-chip ${isAct}" onclick="setYearFilter('${yr}')">
        <span>${yr}</span>
        <span class="year-count">${counts[yr]}</span>
      </button>
    `;
  });

  chipContainer.innerHTML = html;
}

function setYearFilter(yearStr) {
  appData.state.activeYear = yearStr;
  renderYearSourcingBar();
  renderAwards();
  renderProjects();
}

function setYearSortOrder(sortVal) {
  appData.state.yearSort = sortVal;
  renderAwards();
  renderProjects();
}

function renderDynamicCategoryChips(collectionKey, containerId, activeFilterKey, handlerName) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = appData[collectionKey] || [];
  const categories = Array.from(new Set(items.map(i => (i.category || '').trim()).filter(Boolean)));
  const currentActive = appData.state[activeFilterKey];

  // Reset to 'all' if the active category no longer exists
  if (currentActive !== 'all' && !categories.includes(currentActive)) {
    appData.state[activeFilterKey] = 'all';
  }

  const allLabel = collectionKey === 'awards' ? 'All Awards' : 'All Projects';

  let html = `
    <button type="button" class="filter-chip ${appData.state[activeFilterKey] === 'all' ? 'active' : ''}" onclick="${handlerName}('all')">
      ${allLabel}
    </button>
  `;

  categories.forEach(cat => {
    const isAct = appData.state[activeFilterKey] === cat ? 'active' : '';
    const escapedCat = cat.replace(/'/g, "\\'");
    html += `
      <button type="button" class="filter-chip ${isAct}" onclick="${handlerName}('${escapedCat}')">
        ${cat}
      </button>
    `;
  });

  container.innerHTML = html;

  // Also update datalist in the Add Achievement modal so custom categories autocomplete
  updateCategoryDatalist();
}

function updateCategoryDatalist() {
  const datalist = document.getElementById('category-suggestions');
  if (!datalist) return;

  const allCats = new Set([
    'STEM & Math',
    'Academic Honours',
    'Arts & Music',
    'Leadership & MUN',
    'Sports & Athletics',
    'Languages & HSK',
    'STEM & Research',
    'Community Service',
    'Creative Arts',
    'Robotics & Coding'
  ]);

  [...appData.awards, ...appData.projects].forEach(item => {
    if (item.category) allCats.add(item.category.trim());
  });

  datalist.innerHTML = Array.from(allCats)
    .map(c => `<option value="${c.replace(/"/g, '&quot;')}"></option>`)
    .join('');
}

/* ==========================================================================
   Rendering Functions
   ========================================================================== */

function setSisterView(sisterKey) {
  appData.state.activeSister = sisterKey;
  document.body.setAttribute('data-sister', sisterKey);

  document.querySelectorAll('.switch-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === sisterKey);
  });

  renderAll();
}

function renderHeroCards() {
  const container = document.getElementById('sisters-hero-grid');
  const active = appData.state.activeSister;
  const editable = appData.state.editMode ? 'contenteditable="true"' : '';

  const list = active === 'both'
    ? [appData.sisters.noodee, appData.sisters.nadia]
    : [appData.sisters[active]];

  container.className = `sisters-grid ${list.length === 1 ? 'single-focus' : ''}`;

  container.innerHTML = list.map(s => {
    const otherSisterLabel = active === s.id
      ? 'Show Both Sisters'
      : `Explore ${s.name}'s Full Portfolio →`;
    const nextAction = active === s.id ? 'both' : s.id;

    return `
      <article class="sister-card card-${s.id}" id="profile-card-${s.id}">
        <div>
          <div class="sister-card-top">
            <div class="avatar-wrapper">
              <img src="${s.avatar}" alt="${s.name} Portrait" id="avatar-img-${s.id}" />
              <label class="avatar-upload-btn" for="avatar-input-${s.id}" title="Upload custom photo for ${s.name}">
                <span>📷 Change Photo</span>
                <input type="file" id="avatar-input-${s.id}" accept="image/*" style="display:none" onchange="handleAvatarUpload('${s.id}', event)" />
              </label>
            </div>
            <div class="sister-meta">
              <span class="grade-pill pill-${s.id}">
                <span>●</span>
                <span ${editable} onblur="updateSisterField('${s.id}', 'level', this.innerText)">${s.level}</span>
              </span>
              <h2 class="sister-name" ${editable} onblur="updateSisterField('${s.id}', 'name', this.innerText)">${s.name}</h2>
              <p class="sister-tagline" ${editable} onblur="updateSisterField('${s.id}', 'tagline', this.innerText)">${s.tagline}</p>
            </div>
          </div>

          <p class="sister-bio" ${editable} onblur="updateSisterField('${s.id}', 'bio', this.innerText)">${s.bio}</p>

          <div class="sister-QuickStats">
            ${s.stats.map((st, idx) => `
              <div class="stat-box">
                <div class="stat-value" ${editable} onblur="updateStat('${s.id}', ${idx}, 'value', this.innerText)">${st.value}</div>
                <div class="stat-label" ${editable} onblur="updateStat('${s.id}', ${idx}, 'label', this.innerText)">${st.label}</div>
              </div>
            `).join('')}
          </div>

          <div class="sister-tags">
            ${s.interests.map(tag => `<span class="interest-tag">${tag}</span>`).join('')}
          </div>
        </div>

        <div class="sister-card-footer">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">
            🏫 Anglo Singapore International School
          </span>
          <button type="button" class="focus-btn focus-btn-${s.id}" id="btn-focus-${s.id}" onclick="setSisterView('${nextAction}')">
            ${otherSisterLabel}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function renderAcademics() {
  const container = document.getElementById('academics-grid');
  const active = appData.state.activeSister;
  const editable = appData.state.editMode ? 'contenteditable="true"' : '';

  const list = active === 'both'
    ? [appData.sisters.noodee, appData.sisters.nadia]
    : [appData.sisters[active]];

  container.className = `academics-grid ${list.length === 1 ? 'single-focus' : ''}`;

  container.innerHTML = list.map(s => `
    <div class="academic-panel" id="academic-panel-${s.id}">
      <div class="panel-header">
        <div class="panel-student-title">
          <span class="switch-dot dot-${s.id}"></span>
          <h3>${s.name} — ${s.level}</h3>
        </div>
        <span class="curriculum-tag">${s.curriculum}</span>
      </div>

      <div class="subject-list">
        ${s.subjects.map((sub, idx) => `
          <div class="subject-item">
            <div class="subject-top">
              <span class="subject-name" ${editable} onblur="updateSubject('${s.id}', ${idx}, 'name', this.innerText)">${sub.name}</span>
              <span class="subject-grade" ${editable} onblur="updateSubject('${s.id}', ${idx}, 'grade', this.innerText)">${sub.grade}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill fill-${s.id}" style="width: ${sub.percent}%"></div>
            </div>
            <p class="subject-note" ${editable} onblur="updateSubject('${s.id}', ${idx}, 'note', this.innerText)">${sub.note}</p>
          </div>
        `).join('')}
      </div>

      <div class="language-strip">
        <div class="language-strip-title">Trilingual Mastery (Anglo Singapore Benchmark)</div>
        <div class="language-badges">
          ${s.languages.map(lang => `
            <div class="lang-badge">
              <span class="lang-name">${lang.name}</span>
              <span class="lang-level">${lang.level}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderCardAttachmentSnippet(item) {
  if (item.attachmentData && item.attachmentType === 'image') {
    return `
      <div class="card-attachment-preview">
        <img src="${item.attachmentData}" alt="${item.title} Certificate" loading="lazy" />
      </div>
    `;
  }
  if (item.attachmentData && item.attachmentType === 'pdf') {
    return `
      <div class="card-pdf-badge">
        <span>📄</span>
        <span>PDF Certificate Attached: ${item.attachmentName || 'Certificate.pdf'}</span>
      </div>
    `;
  }
  if (item.externalLink) {
    return `
      <div class="card-pdf-badge">
        <span>🔗</span>
        <span>External Certificate / Document Link Attached</span>
      </div>
    `;
  }
  return '';
}

function renderAwards() {
  renderDynamicCategoryChips('awards', 'award-filters', 'awardFilter', 'setAwardFilter');

  const container = document.getElementById('awards-grid');
  const activeSister = appData.state.activeSister;
  const activeYear = appData.state.activeYear;
  const categoryFilter = appData.state.awardFilter;

  const filtered = sortItemsByYear(appData.awards.filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesYear = activeYear === 'all' || String(item.year) === String(activeYear);
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSister && matchesYear && matchesCat;
  }));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--surface-card); border-radius: var(--radius-md); border: 1px dashed var(--border-strong); color: var(--text-secondary);">
        No awards match the selected Year (${activeYear === 'all' ? 'All' : activeYear}) or Category filter. Try selecting "All Years" or click "+ Add Achievement".
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article class="portfolio-card" id="award-card-${item.id}" onclick="openCertificateModal('${item.id}', 'awards')">
      <div>
        <div class="card-top-meta">
          <span class="owner-badge owner-${item.sister}">
            <span>●</span> ${item.sisterName}
          </span>
          <span class="year-badge">📅 ${item.year}</span>
        </div>
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        ${renderCardAttachmentSnippet(item)}
      </div>
      <div class="card-bottom">
        <span class="award-Result">🏆 ${item.result}</span>
        <span class="card-action-link">View Certificate →</span>
      </div>
    </article>
  `).join('');
}

function renderCCAs() {
  const container = document.getElementById('cca-grid');
  const activeSister = appData.state.activeSister;

  const filtered = appData.ccas.filter(item => {
    return activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
  });

  container.innerHTML = filtered.map(item => `
    <article class="cca-card" id="cca-card-${item.id}">
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div class="cca-icon-box">${item.icon}</div>
        <span class="owner-badge owner-${item.sister}">${item.sisterName}</span>
      </div>
      <div class="cca-role">${item.role}</div>
      <h3 class="cca-title">${item.title}</h3>
      <p class="cca-detail">${item.detail}</p>
      <div class="cca-schedule">
        <span>${item.schedule}</span>
        <span>Anglo Singapore CCA</span>
      </div>
    </article>
  `).join('');
}

function renderProjects() {
  renderDynamicCategoryChips('projects', 'project-filters', 'projectFilter', 'setProjectFilter');

  const container = document.getElementById('projects-grid');
  const activeSister = appData.state.activeSister;
  const activeYear = appData.state.activeYear;
  const categoryFilter = appData.state.projectFilter;

  const filtered = sortItemsByYear(appData.projects.filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesYear = activeYear === 'all' || String(item.year) === String(activeYear);
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSister && matchesYear && matchesCat;
  }));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--surface-card); border-radius: var(--radius-md); border: 1px dashed var(--border-strong); color: var(--text-secondary);">
        No projects match the selected Year (${activeYear === 'all' ? 'All' : activeYear}) or Category filter.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article class="portfolio-card" id="project-card-${item.id}" onclick="openCertificateModal('${item.id}', 'projects')">
      <div>
        <div class="card-top-meta">
          <span class="owner-badge owner-${item.sister}">
            <span>✦</span> ${item.sisterName}
          </span>
          <span class="year-badge">📅 ${item.year}</span>
        </div>
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        ${renderCardAttachmentSnippet(item)}
      </div>
      <div class="card-bottom">
        <span class="award-Result">✨ ${item.result}</span>
        <span class="card-action-link">Project &amp; Files →</span>
      </div>
    </article>
  `).join('');
}

function renderAll() {
  renderYearSourcingBar();
  renderHeroCards();
  renderAcademics();
  renderAwards();
  renderCCAs();
  renderProjects();
}

/* ==========================================================================
   Interactive Filters, Certificate Viewer Modal & File Upload
   ========================================================================== */

function setAwardFilter(category) {
  appData.state.awardFilter = category;
  renderAwards();
}

function setProjectFilter(category) {
  appData.state.projectFilter = category;
  renderProjects();
}

function openCertificateModal(itemId, collectionKey) {
  if (appData.state.editMode) return;
  const list = appData[collectionKey] || [];
  const item = list.find(x => x.id === itemId);
  if (!item) return;

  const modal = document.getElementById('detail-modal');
  const content = document.getElementById('detail-modal-body');

  let attachmentViewerHtml = '';
  if (item.attachmentData && item.attachmentType === 'image') {
    attachmentViewerHtml = `
      <div class="cert-attachment-viewer">
        <img src="${item.attachmentData}" alt="${item.title} Certificate" />
      </div>
      <div style="margin-bottom: 1rem;">
        <a href="${item.attachmentData}" download="${item.attachmentName || 'certificate.jpg'}" class="btn btn-outline" style="font-size:0.8rem;">
          ⬇️ Download Certificate Image
        </a>
      </div>
    `;
  } else if (item.attachmentData && item.attachmentType === 'pdf') {
    attachmentViewerHtml = `
      <div class="cert-attachment-viewer">
        <iframe src="${item.attachmentData}" title="${item.title} PDF Certificate"></iframe>
      </div>
      <div style="margin-bottom: 1rem;">
        <a href="${item.attachmentData}" download="${item.attachmentName || 'certificate.pdf'}" class="btn btn-primary" style="font-size:0.8rem;">
          📄 Download / Open PDF (${item.attachmentName || 'certificate.pdf'})
        </a>
      </div>
    `;
  }

  let externalLinkHtml = '';
  if (item.externalLink) {
    externalLinkHtml = `
      <div style="margin-bottom: 1rem;">
        <a href="${item.externalLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size:0.82rem;">
          🔗 Open Full Certificate / Document Link ↗
        </a>
      </div>
    `;
  }

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="owner-badge owner-${item.sister}" style="margin-bottom: 0.5rem;">${item.sisterName} • ${item.year}</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem;">${item.title}</h3>
      </div>
      <button type="button" class="modal-close" onclick="closeDetailModal()" aria-label="Close modal">✕</button>
    </div>

    <div class="certificate-preview">
      <div class="cert-school">Anglo Singapore International School • Portfolio Record</div>
      <div class="cert-heading">${item.result}</div>
      <div class="cert-recipient">Awarded to ${item.sisterName}</div>
      <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.25rem;">
        ${item.description}
      </p>

      ${attachmentViewerHtml}
      ${externalLinkHtml}

      <div class="cert-meta-grid">
        <div>
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Issuing Organization</strong>
          <span>${item.issuer || 'Anglo Singapore International School'}</span>
        </div>
        <div>
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Academic Year &amp; Category</strong>
          <span>${item.year} • ${item.category}</span>
        </div>
        <div style="grid-column: 1 / -1;">
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Key Competencies Demonstrated</strong>
          <span>${item.skills || 'Academic Excellence, Critical Thinking, Presentation'}</span>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
      <label class="btn btn-outline" style="font-size: 0.8rem; cursor: pointer;">
        📎 Attach / Replace Photo or PDF
        <input type="file" accept="image/*,.pdf,application/pdf" style="display:none" onchange="attachFileToExistingItem('${item.id}', '${collectionKey}', event)" />
      </label>
      <div style="display: flex; gap: 0.5rem;">
        <button type="button" class="btn btn-outline" style="color: hsl(0, 65%, 45%); border-color: hsl(0, 50%, 82%); font-size: 0.8rem;" onclick="deletePortfolioItem('${item.id}', '${collectionKey}')">
          🗑️ Delete
        </button>
        <button type="button" class="btn btn-primary" onclick="closeDetailModal()">Done</button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeDetailModal() {
  document.getElementById('detail-modal').classList.remove('open');
}

function openAddModal() {
  pendingAttachment = { data: null, type: null, name: null };
  const previewEl = document.getElementById('attachment-file-status');
  if (previewEl) previewEl.innerHTML = '';
  updateCategoryDatalist();
  document.getElementById('add-modal').classList.add('open');
}

function closeAddModal() {
  document.getElementById('add-modal').classList.remove('open');
}

/* Compress image client-side so multiple certificates fit cleanly in localStorage */
function compressImageFile(file, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1200;
      let width = img.width;
      let height = img.height;
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function handleCertificateFileSelect(event) {
  const file = event.target.files?.[0];
  const statusEl = document.getElementById('attachment-file-status');
  if (!file) return;

  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    if (file.size > 3.5 * 1024 * 1024) {
      alert('PDF file is larger than 3.5 MB. For large PDFs, please paste a Google Drive link in the External Link field below, or choose a smaller PDF.');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      pendingAttachment = {
        data: e.target.result,
        type: 'pdf',
        name: file.name
      };
      if (statusEl) {
        statusEl.innerHTML = `<span class="file-preview-pill">📄 Ready to attach: ${file.name}</span>`;
      }
    };
    reader.readAsDataURL(file);
  } else if (file.type.startsWith('image/')) {
    compressImageFile(file, (compressedDataUrl) => {
      pendingAttachment = {
        data: compressedDataUrl,
        type: 'image',
        name: file.name
      };
      if (statusEl) {
        statusEl.innerHTML = `<span class="file-preview-pill">🖼️ Image ready: ${file.name}</span>`;
      }
    });
  } else {
    alert('Please select an Image (.jpg, .png, .webp) or a PDF (.pdf) file.');
  }
}

function attachFileToExistingItem(itemId, collectionKey, event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const list = appData[collectionKey] || [];
  const item = list.find(x => x.id === itemId);
  if (!item) return;

  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    if (file.size > 3.5 * 1024 * 1024) {
      alert('PDF file is larger than 3.5 MB. Please use a compressed PDF or paste a Google Drive link.');
      return;
    }
    const reader = new FileReader();
    reader.onload = function(e) {
      item.attachmentData = e.target.result;
      item.attachmentType = 'pdf';
      item.attachmentName = file.name;
      savePortfolioData();
      renderAll();
      openCertificateModal(itemId, collectionKey);
    };
    reader.readAsDataURL(file);
  } else if (file.type.startsWith('image/')) {
    compressImageFile(file, (compressedDataUrl) => {
      item.attachmentData = compressedDataUrl;
      item.attachmentType = 'image';
      item.attachmentName = file.name;
      savePortfolioData();
      renderAll();
      openCertificateModal(itemId, collectionKey);
    });
  }
}

function deletePortfolioItem(itemId, collectionKey) {
  if (!confirm('Remove this item from the portfolio?')) return;
  appData[collectionKey] = (appData[collectionKey] || []).filter(x => x.id !== itemId);
  savePortfolioData();
  closeDetailModal();
  renderAll();
}

function handleAddAchievement(event) {
  event.preventDefault();
  const form = event.target;
  const sectionType = form.sectionType.value; // 'awards' or 'projects'
  const sister = form.sister.value;
  const sisterMap = {
    noodee: 'Noodee (Sec 3)',
    nadia: 'Nadia (Sec 1)',
    both: 'Noodee & Nadia (Sister Collaboration)'
  };

  const customCategory = form.category.value.trim() || 'Academic Honours';

  const newEntry = {
    id: 'custom-' + Date.now(),
    sister: sister,
    sisterName: sisterMap[sister],
    year: form.year.value.trim() || '2026',
    category: customCategory,
    title: form.title.value.trim(),
    result: form.result.value.trim(),
    issuer: form.issuer.value.trim() || 'Anglo Singapore International School',
    description: form.description.value.trim(),
    skills: form.skills.value.trim() || 'Academic & Co-Curricular Excellence',
    attachmentData: pendingAttachment.data,
    attachmentType: pendingAttachment.type,
    attachmentName: pendingAttachment.name,
    externalLink: form.externalLink ? form.externalLink.value.trim() : ''
  };

  if (sectionType === 'awards') {
    appData.awards.unshift(newEntry);
  } else {
    appData.projects.unshift(newEntry);
  }

  savePortfolioData();
  form.reset();
  pendingAttachment = { data: null, type: null, name: null };
  closeAddModal();
  renderAll();
}

/* Inline Editing & Custom Avatar Upload */
function toggleEditMode() {
  appData.state.editMode = !appData.state.editMode;
  document.body.classList.toggle('edit-mode', appData.state.editMode);

  const btn = document.getElementById('btn-toggle-edit');
  if (appData.state.editMode) {
    btn.classList.add('btn-edit-active');
    btn.innerHTML = '✓ Save & Exit Edit';
  } else {
    btn.classList.remove('btn-edit-active');
    btn.innerHTML = '✎ Customize Text & Photos';
    savePortfolioData();
  }
  renderAll();
}

function updateSisterField(sisterId, field, value) {
  if (!appData.sisters[sisterId]) return;
  appData.sisters[sisterId][field] = value.trim();
  savePortfolioData();
}

function updateStat(sisterId, idx, field, value) {
  if (!appData.sisters[sisterId]?.stats[idx]) return;
  appData.sisters[sisterId].stats[idx][field] = value.trim();
  savePortfolioData();
}

function updateSubject(sisterId, idx, field, value) {
  if (!appData.sisters[sisterId]?.subjects[idx]) return;
  appData.sisters[sisterId].subjects[idx][field] = value.trim();
  savePortfolioData();
}

function handleAvatarUpload(sisterId, event) {
  const file = event.target.files?.[0];
  if (!file) return;
  compressImageFile(file, (compressedDataUrl) => {
    appData.sisters[sisterId].avatar = compressedDataUrl;
    savePortfolioData();
    renderHeroCards();
  });
}

/* Export / Import Portfolio Data Backup */
function exportPortfolioBackup() {
  const dataStr = JSON.stringify({
    sisters: appData.sisters,
    awards: appData.awards,
    ccas: appData.ccas,
    projects: appData.projects
  }, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `noodee-nadia-portfolio-backup-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importPortfolioBackup(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.sisters && imported.awards) {
        appData.sisters = imported.sisters;
        appData.awards = imported.awards;
        appData.ccas = imported.ccas || appData.ccas;
        appData.projects = imported.projects || appData.projects;
        savePortfolioData();
        renderAll();
        alert('Portfolio backup restored successfully!');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (err) {
      alert('Could not parse backup JSON file.');
    }
  };
  reader.readAsText(file);
}

function resetDefaultData() {
  if (confirm('Reset all portfolio text and custom items back to the original Anglo Singapore template?')) {
    localStorage.removeItem('noodee_nadia_portfolio_v2');
    appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    document.body.classList.remove('edit-mode');
    setSisterView('both');
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });
});
