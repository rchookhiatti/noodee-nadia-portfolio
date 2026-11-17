/**
 * Noodee & Nadia — Student Portfolio Application Logic
 * Anglo Singapore International School (Secondary 3 & Secondary 1)
 */

const DEFAULT_DATA = {
  state: {
    activeSister: 'both', // 'both' | 'noodee' | 'nadia'
    awardFilter: 'all',   // 'all' | 'Academic' | 'STEM' | 'Arts & Music' | 'Leadership'
    projectFilter: 'all', // 'all' | 'STEM & Research' | 'Community Service' | 'Creative Arts'
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
      category: 'STEM',
      title: 'SASMO (Singapore & Asian Schools Math Olympiad)',
      result: 'Gold Award — Top 8% Globally',
      issuer: 'Singapore International Mastery Contests Centre (SIMCC)',
      description: 'Achieved Gold standing in the Secondary 3 division, demonstrating advanced algebraic reasoning, combinatorics, and non-routine problem-solving skills.',
      skills: 'Combinatorics, Number Theory, Deductive Proof'
    },
    {
      id: 'aw-2',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2026',
      category: 'STEM',
      title: 'SASMO Lower Secondary Mathematics Olympiad',
      result: 'Silver Award — Distinction',
      issuer: 'Singapore International Mastery Contests Centre (SIMCC)',
      description: 'Recognized among top Secondary 1 performers in her first year transitioning from Primary to Lower Secondary competitive mathematics.',
      skills: 'Heuristic Modeling, Spatial Geometry, Logic Puzzles'
    },
    {
      id: 'aw-3',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2026',
      category: 'Academic',
      title: 'VANDA International Science Competition',
      result: 'Gold Medal — National Honor Roll',
      issuer: 'VANDA Global Science Committee',
      description: 'Awarded Gold for analytical application of Chemistry and Cellular Biology concepts to real-world environmental challenges.',
      skills: 'Experimental Design, Organic Chemistry, Data Interpretation'
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
      skills: 'Solo Performance, Sight-Reading, Musicality'
    },
    {
      id: 'aw-5',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Leadership',
      title: 'Bangkok International Schools Model United Nations (BISMUN)',
      result: 'Best Delegate Commendation — UNEP Committee',
      issuer: 'Anglo Singapore & Partner International Schools',
      description: 'Authored the primary resolution on transboundary plastic waste reduction in ASEAN waterways and led coalition consensus building.',
      skills: 'Public Speaking, Policy Drafting, Diplomacy'
    },
    {
      id: 'aw-6',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2025',
      category: 'Academic',
      title: 'Anglo Singapore Principal’s Academic Honour Roll',
      result: 'Overall Academic Excellence — Term 1 & 2',
      issuer: 'Anglo Singapore International School',
      description: 'Maintained above 90% average across Mathematics, Science, English, and Mandarin during her transition into Secondary 1.',
      skills: 'Bilingual Mastery, Consistent Academic Rigor'
    }
  ],
  ccas: [
    {
      id: 'cca-1',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      icon: '🏛️',
      role: 'Vice President & Senior Mentor',
      title: 'Student Council & Peer Tutoring Society',
      detail: 'Organizes school-wide cultural days, leads orientation for incoming Secondary 1 students, and coordinates weekly Math & Science peer study clinics.',
      schedule: '2024 – Present • 4 hrs/week'
    },
    {
      id: 'cca-2',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      icon: '🎻',
      role: 'First Violin Section',
      title: 'Anglo Singapore Chamber String Ensemble',
      detail: 'Performs at annual Speech Day concerts, festive showcases, and charity music recitals across Bangkok campuses.',
      schedule: '2025 – Present • 3.5 hrs/week'
    },
    {
      id: 'cca-3',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      icon: '🏸',
      role: 'U-15 Girls Doubles Squad',
      title: 'Varsity Badminton Team',
      detail: 'Competes in inter-international school friendly tournaments, fostering discipline, agility, and court strategy.',
      schedule: '2024 – Present • 3 hrs/week'
    },
    {
      id: 'cca-4',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      icon: '🌱',
      role: 'Junior Eco-Ambassador',
      title: 'Green Campus & Sustainability Club',
      detail: 'Designs bilingual visual campaigns for zero-waste lunches and tracks paper recycling metrics across Lower Secondary homerooms.',
      schedule: '2025 – Present • 2.5 hrs/week'
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
      skills: 'Bilingual Storytelling, Book Illustration, Community Fundraising'
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
      skills: 'Polymer Chemistry, Statistical Analysis, Lab Protocol'
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
      skills: 'Procreate Digital Painting, Audio Recording, Cultural Research'
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
      skills: 'Python, IoT Sensors, Data Visualization'
    }
  ]
};

// Load state from localStorage or fall back to DEFAULT_DATA
let appData = loadPortfolioData();

function loadPortfolioData() {
  try {
    const saved = localStorage.getItem('noodee_nadia_portfolio_v1');
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
    localStorage.setItem('noodee_nadia_portfolio_v1', JSON.stringify({
      sisters: appData.sisters,
      awards: appData.awards,
      ccas: appData.ccas,
      projects: appData.projects
    }));
  } catch (e) {
    console.warn('Could not save to localStorage.', e);
  }
}

/* ==========================================================================
   Rendering Functions
   ========================================================================== */

function setSisterView(sisterKey) {
  appData.state.activeSister = sisterKey;
  document.body.setAttribute('data-sister', sisterKey);

  // Update switcher buttons
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
    const isNoodee = s.id === 'noodee';
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

function renderAwards() {
  const container = document.getElementById('awards-grid');
  const activeSister = appData.state.activeSister;
  const categoryFilter = appData.state.awardFilter;

  const filtered = appData.awards.filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSister && matchesCat;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--surface-card); border-radius: var(--radius-md); border: 1px dashed var(--border-strong); color: var(--text-secondary);">
        No awards match the selected filter. Click another category or add a new achievement.
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
          <span class="year-badge">${item.year}</span>
        </div>
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
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
  const container = document.getElementById('projects-grid');
  const activeSister = appData.state.activeSister;
  const categoryFilter = appData.state.projectFilter;

  const filtered = appData.projects.filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSister && matchesCat;
  });

  container.innerHTML = filtered.map(item => `
    <article class="portfolio-card" id="project-card-${item.id}" onclick="openCertificateModal('${item.id}', 'projects')">
      <div>
        <div class="card-top-meta">
          <span class="owner-badge owner-${item.sister}">
            <span>✦</span> ${item.sisterName}
          </span>
          <span class="year-badge">${item.year}</span>
        </div>
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
      </div>
      <div class="card-bottom">
        <span class="award-Result">✨ ${item.result}</span>
        <span class="card-action-link">Project Details →</span>
      </div>
    </article>
  `).join('');
}

function renderAll() {
  renderHeroCards();
  renderAcademics();
  renderAwards();
  renderCCAs();
  renderProjects();
}

/* ==========================================================================
   Interactive Filters, Modals & Edit Mode
   ========================================================================== */

function setAwardFilter(category, btnEl) {
  appData.state.awardFilter = category;
  document.querySelectorAll('#award-filters .filter-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderAwards();
}

function setProjectFilter(category, btnEl) {
  appData.state.projectFilter = category;
  document.querySelectorAll('#project-filters .filter-chip').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
  renderProjects();
}

function openCertificateModal(itemId, collectionKey) {
  if (appData.state.editMode) return; // Avoid triggering modal while editing inline text
  const list = appData[collectionKey] || [];
  const item = list.find(x => x.id === itemId);
  if (!item) return;

  const modal = document.getElementById('detail-modal');
  const content = document.getElementById('detail-modal-body');

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="owner-badge owner-${item.sister}" style="margin-bottom: 0.5rem;">${item.sisterName}</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem;">${item.title}</h3>
      </div>
      <button type="button" class="modal-close" onclick="closeDetailModal()" aria-label="Close modal">✕</button>
    </div>

    <div class="certificate-preview">
      <div class="cert-school">Anglo Singapore International School • Portfolio Record</div>
      <div class="cert-heading">${item.result}</div>
      <div class="cert-recipient">Awarded to ${item.sisterName}</div>
      <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 460px; margin: 0 auto 1.25rem;">
        ${item.description}
      </p>
      <div class="cert-meta-grid">
        <div>
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Issuing Organization</strong>
          <span>${item.issuer || 'Anglo Singapore International School'}</span>
        </div>
        <div>
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Academic Year & Domain</strong>
          <span>${item.year} • ${item.category}</span>
        </div>
        <div style="grid-column: 1 / -1;">
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Key Competencies Demonstrated</strong>
          <span>${item.skills || 'Academic Excellence, Critical Thinking, Presentation'}</span>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
      <button type="button" class="btn btn-outline" onclick="closeDetailModal()">Close</button>
    </div>
  `;

  modal.classList.add('open');
}

function closeDetailModal() {
  document.getElementById('detail-modal').classList.remove('open');
}

function openAddModal() {
  document.getElementById('add-modal').classList.add('open');
}

function closeAddModal() {
  document.getElementById('add-modal').classList.remove('open');
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

  const newEntry = {
    id: 'custom-' + Date.now(),
    sister: sister,
    sisterName: sisterMap[sister],
    year: form.year.value.trim() || '2026',
    category: form.category.value,
    title: form.title.value.trim(),
    result: form.result.value.trim(),
    issuer: form.issuer.value.trim() || 'Anglo Singapore International School',
    description: form.description.value.trim(),
    skills: form.skills.value.trim() || 'Academic & Co-Curricular Excellence'
  };

  if (sectionType === 'awards') {
    appData.awards.unshift(newEntry);
    renderAwards();
  } else {
    appData.projects.unshift(newEntry);
    renderProjects();
  }

  savePortfolioData();
  form.reset();
  closeAddModal();
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
  const reader = new FileReader();
  reader.onload = function(e) {
    appData.sisters[sisterId].avatar = e.target.result;
    savePortfolioData();
    renderHeroCards();
  };
  reader.readAsDataURL(file);
}

function resetDefaultData() {
  if (confirm('Reset all portfolio text and custom items back to the original Anglo Singapore template?')) {
    localStorage.removeItem('noodee_nadia_portfolio_v1');
    appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
    document.body.classList.remove('edit-mode');
    setSisterView('both');
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });
});
