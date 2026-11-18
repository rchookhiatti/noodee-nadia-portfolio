/**
 * Noodee & Nadia — Student Portfolio Application Logic
 * Anglo Singapore International School (Secondary 3 & Secondary 1)
 *
 * Persistence Architecture:
 * 1. IndexedDB ('NoodeeNadiaPortfolioDB') — High-capacity browser storage (hundreds of MBs for photos & PDFs)
 * 2. Cloud Sync ('portfolio-data.json' + 'assets/uploads/' on GitHub) — Direct browser-to-GitHub publishing
 *    so changes made on any computer are permanently saved to GitHub Pages for all visitors worldwide.
 */

const GITHUB_REPO_OWNER = 'rchookhiatti';
const GITHUB_REPO_NAME = 'noodee-nadia-portfolio';
const GITHUB_BRANCH = 'main';

const IDB_NAME = 'NoodeeNadiaPortfolioDB';
const IDB_VERSION = 1;
const IDB_STORE = 'portfolioStore';
const IDB_KEY = 'mainData';

const DEFAULT_DATA = {
  state: {
    activeSister: 'both',  // 'both' | 'noodee' | 'nadia'
    activeYear: 'all',     // 'all' | '2026' | '2025' | '2024' | ...
    yearSort: 'desc',      // 'desc' (Newest first) | 'asc' (Oldest first)
    awardFilter: 'all',    // 'all' | any dynamic category string
    projectFilter: 'all',  // 'all' | any dynamic category string
    editMode: false
  },
  sectionVisibility: {
    academics: true,
    awards: true,
    cca: true,
    projects: true
  },
  sectionHeaders: {
    academics: {
      eyebrow: '01 • Academic Excellence & Subject Mastery',
      title: 'Singapore-Cambridge Curriculum & Trilingual Fluency',
      subtitle: 'Rigorous academic grounding across Mathematics, Pure Sciences, Humanities, and trilingual proficiency in English, Mandarin Chinese, and Thai.'
    },
    awards: {
      eyebrow: '02 • Awards, Competitions & Certificates',
      title: 'Academic Olympiads & Distinctions'
    },
    cca: {
      eyebrow: '03 • Co-Curricular Activities (CCA), Sports & Music',
      title: 'Holistic Growth Beyond the Classroom',
      subtitle: 'Active involvement in student governance, orchestral performance, varsity athletics, and environmental clubs at Anglo Singapore International School.'
    },
    projects: {
      eyebrow: '04 • Research Projects, Creative Portfolio & Service',
      title: 'Innovation, Artistry & Community Impact'
    }
  },
  sisters: {
    noodee: {
      id: 'noodee',
      name: 'Noodee',
      level: 'Secondary 3 (Grade 9)',
      curriculum: 'Singapore-Cambridge IGCSE Track',
      tagline: 'STEM Scholar, Analytical Thinker & Student Leader',
      bio: 'A dedicated Secondary 3 student at Anglo Singapore International School with a deep passion for Additional Mathematics, Biomedical Sciences, and trilingual communication. Noodee thrives on collaborative research, debate, and mentoring younger peers.',
      avatar: 'assets/uploads/avatar-noodee.jpg?v=1794969986555',
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
      avatar: 'assets/uploads/avatar-nadia.jpg?v=1794969990725',
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
      id: 'custom-1794970263859',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Piano',
      title: 'Certificate',
      result: 'Piano Grade 7',
      issuer: 'Yamaha Music Foundation',
      description: 'has been successful in Piano Grade 7',
      skills: 'Piano',
      attachmentData: 'assets/uploads/cert-custom-1794970263859.jpg',
      attachmentType: 'image',
      attachmentName: '2025-Piano Grade7.jpg',
      externalLink: ''
    },
    {
      id: 'custom-1794970174011',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Swimming',
      title: 'Certificate of Training - Sea Survival and Basic Water Life Saving',
      result: 'Certificate',
      issuer: 'KIDO Survival Kids Camping',
      description: 'Has successfully completed 25th Sea Survival and Basic Water Life Saving',
      skills: 'Kido Camp',
      attachmentData: 'assets/uploads/cert-custom-1794970174011.jpg',
      attachmentType: 'image',
      attachmentName: '2025-Kido Camp.jpg',
      externalLink: ''
    },
    {
      id: 'custom-1794969978725',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Science',
      title: 'Second Prize - Secondary 1 Science Group Project',
      result: '2nd Place',
      issuer: 'Anglo Singapore',
      description: 'for outstanding work and attaining, Second Prize - Secondary 1 Science Group Project.',
      skills: 'Innovative',
      attachmentData: 'assets/uploads/cert-custom-1794969978725.jpg',
      attachmentType: 'image',
      attachmentName: '2025-Science Second Prize.jpg',
      externalLink: ''
    },
    {
      id: 'custom-1794969784931',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Debate',
      title: 'Certificate of Participation',
      result: 'Volunteer Runner',
      issuer: 'Asia World Schools Debating Chamionship',
      description: 'for an outstanding performance in the 7th ASIA World Schools Debating Championship',
      skills: 'Coordinator',
      attachmentData: 'assets/uploads/cert-custom-1794969784931.jpg',
      attachmentType: 'image',
      attachmentName: '2025-Debate.jpg',
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

let pendingAttachment = {
  data: null,
  type: null,
  name: null
};

let appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
let hasUnsyncedChanges = false;
let editingItemContext = null; // { id, collectionKey } when editing an existing item

/* ==========================================================================
   IndexedDB High-Capacity Storage Engine (Supports large PDFs & Photos)
   ========================================================================== */

function openIDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = indexedDB.open(IDB_NAME, IDB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
}

async function readFromIDB() {
  try {
    const db = await openIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const store = tx.objectStore(IDB_STORE);
      const req = store.get(IDB_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IDB read fallback to localStorage:', e);
    return null;
  }
}

async function writeToIDB(payload) {
  try {
    const db = await openIDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      const store = tx.objectStore(IDB_STORE);
      const req = store.put(payload, IDB_KEY);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IDB write error:', e);
    return false;
  }
}

async function clearIDB() {
  try {
    const db = await openIDB();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(IDB_KEY);
      tx.oncomplete = () => resolve(true);
    });
  } catch (e) {
    return false;
  }
}

async function initializePortfolioData() {
  let remoteData = null;
  try {
    const res = await fetch(`portfolio-data.json?t=${Date.now()}`, { cache: 'no-store' });
    if (res.ok) {
      remoteData = await res.json();
    }
  } catch (e) {
    console.info('Running offline or local file mode.');
  }

  let localData = await readFromIDB();
  if (!localData) {
    try {
      const legacy = localStorage.getItem('noodee_nadia_portfolio_v2');
      if (legacy) {
        localData = JSON.parse(legacy);
        await writeToIDB(localData);
      }
    } catch (e) {}
  }

  if (localData && remoteData) {
    const localTime = localData.updatedAt || 0;
    const remoteTime = remoteData.updatedAt || 0;
    const chosen = localTime >= remoteTime ? localData : remoteData;
    appData = mergeWithDefaults(chosen);
  } else if (localData) {
    appData = mergeWithDefaults(localData);
  } else if (remoteData) {
    appData = mergeWithDefaults(remoteData);
  }

  renderAll();
}

function mergeWithDefaults(source) {
  return {
    ...DEFAULT_DATA,
    ...source,
    sectionVisibility: {
      ...DEFAULT_DATA.sectionVisibility,
      ...(source.sectionVisibility || {})
    },
    sectionHeaders: {
      academics: { ...DEFAULT_DATA.sectionHeaders.academics, ...(source.sectionHeaders?.academics || {}) },
      awards: { ...DEFAULT_DATA.sectionHeaders.awards, ...(source.sectionHeaders?.awards || {}) },
      cca: { ...DEFAULT_DATA.sectionHeaders.cca, ...(source.sectionHeaders?.cca || {}) },
      projects: { ...DEFAULT_DATA.sectionHeaders.projects, ...(source.sectionHeaders?.projects || {}) }
    },
    state: { ...DEFAULT_DATA.state }
  };
}

async function savePortfolioData() {
  const payload = {
    updatedAt: Date.now(),
    sectionVisibility: appData.sectionVisibility,
    sectionHeaders: appData.sectionHeaders,
    sisters: appData.sisters,
    awards: appData.awards,
    ccas: appData.ccas,
    projects: appData.projects
  };

  await writeToIDB(payload);

  try {
    localStorage.setItem('noodee_nadia_portfolio_v2', JSON.stringify(payload));
  } catch (e) {}

  hasUnsyncedChanges = true;
  updateSyncButtonBadge();
}

function updateSyncButtonBadge() {
  const btn = document.getElementById('btn-github-sync');
  if (!btn) return;
  if (hasUnsyncedChanges) {
    btn.innerHTML = '☁️ Save to GitHub ●';
    btn.style.borderColor = 'var(--noodee-primary)';
  } else {
    btn.innerHTML = '☁️ Save to GitHub';
    btn.style.borderColor = '';
  }
}

/* ==========================================================================
   Direct Browser-to-GitHub Cloud Publishing (Works from ANY Computer)
   ========================================================================== */

function openGitHubSyncModal() {
  const savedToken = localStorage.getItem('github_pat_noodee_nadia') || '';
  const tokenInput = document.getElementById('field-github-token');
  if (tokenInput && savedToken) {
    tokenInput.value = savedToken;
  }
  const statusBox = document.getElementById('github-sync-status');
  if (statusBox) {
    statusBox.innerHTML = '';
  }
  document.getElementById('github-sync-modal').classList.add('open');
}

function closeGitHubSyncModal() {
  document.getElementById('github-sync-modal').classList.remove('open');
}

function utf8ToBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

function dataUrlToBase64Content(dataUrl) {
  const commaIdx = dataUrl.indexOf(',');
  return commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : dataUrl;
}

async function uploadFileToGitHubRepo(token, filePath, base64Content, commitMessage, retryCount = 0) {
  const apiUrl = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`;
  let existingSha = null;

  const getRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}&_t=${Date.now()}`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    }
  });

  if (getRes.ok) {
    const fileInfo = await getRes.json();
    existingSha = fileInfo.sha;
  }

  const bodyObj = {
    message: commitMessage,
    content: base64Content,
    branch: GITHUB_BRANCH
  };
  if (existingSha) {
    bodyObj.sha = existingSha;
  }

  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyObj)
  });

  if (!putRes.ok) {
    const errData = await putRes.json().catch(() => ({}));
    if (putRes.status === 409 && retryCount < 3) {
      await new Promise(r => setTimeout(r, 800));
      return uploadFileToGitHubRepo(token, filePath, base64Content, commitMessage, retryCount + 1);
    }
    throw new Error(errData.message || `GitHub API Error (${putRes.status})`);
  }

  return await putRes.json();
}

async function handlePublishToGitHub(event) {
  event.preventDefault();
  const tokenInput = document.getElementById('field-github-token');
  const rememberCheck = document.getElementById('field-remember-token');
  const statusBox = document.getElementById('github-sync-status');
  const submitBtn = document.getElementById('btn-confirm-github-sync');

  const token = (tokenInput.value || '').trim();
  if (!token) {
    alert('Please enter your GitHub Personal Access Token.');
    return;
  }

  if (rememberCheck && rememberCheck.checked) {
    localStorage.setItem('github_pat_noodee_nadia', token);
  } else {
    localStorage.removeItem('github_pat_noodee_nadia');
  }

  submitBtn.disabled = true;
  submitBtn.innerText = '⏳ Uploading to GitHub...';
  statusBox.innerHTML = `<div style="padding:0.75rem; background:var(--surface-subtle); border-radius:8px; font-size:0.84rem; color:var(--text-primary);">Uploading profile photos, PDFs, and portfolio data directly to <strong>${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}</strong>...</div>`;

  try {
    for (const sisterKey of ['noodee', 'nadia']) {
      const s = appData.sisters[sisterKey];
      if (s && s.avatar && s.avatar.startsWith('data:image/')) {
        const filePath = `assets/uploads/avatar-${sisterKey}.jpg`;
        statusBox.innerHTML = `<div style="padding:0.75rem; background:var(--surface-subtle); border-radius:8px; font-size:0.84rem;">Uploading ${s.name}'s profile photo to GitHub (<code>${filePath}</code>)...</div>`;
        await uploadFileToGitHubRepo(
          token,
          filePath,
          dataUrlToBase64Content(s.avatar),
          `Update ${s.name} profile photo via web portfolio`
        );
        s.avatar = `${filePath}?v=${Date.now()}`;
      }
    }

    const collections = [
      { key: 'awards', list: appData.awards },
      { key: 'projects', list: appData.projects }
    ];

    for (const col of collections) {
      for (const item of col.list) {
        if (item.attachmentData && item.attachmentData.startsWith('data:')) {
          const ext = item.attachmentType === 'pdf' ? 'pdf' : 'jpg';
          const safeId = String(item.id).replace(/[^a-zA-Z0-9_-]/g, '');
          const filePath = `assets/uploads/cert-${safeId}.${ext}`;
          statusBox.innerHTML = `<div style="padding:0.75rem; background:var(--surface-subtle); border-radius:8px; font-size:0.84rem;">Uploading certificate for <strong>${item.title}</strong> to GitHub (<code>${filePath}</code>)...</div>`;
          await uploadFileToGitHubRepo(
            token,
            filePath,
            dataUrlToBase64Content(item.attachmentData),
            `Upload certificate (${ext.toUpperCase()}) for ${item.title}`
          );
          item.attachmentData = filePath;
        }
      }
    }

    const payload = {
      updatedAt: Date.now(),
      sectionVisibility: appData.sectionVisibility,
      sectionHeaders: appData.sectionHeaders,
      sisters: appData.sisters,
      awards: appData.awards,
      ccas: appData.ccas,
      projects: appData.projects
    };

    statusBox.innerHTML = `<div style="padding:0.75rem; background:var(--surface-subtle); border-radius:8px; font-size:0.84rem;">Saving master <code>portfolio-data.json</code> to GitHub...</div>`;
    await uploadFileToGitHubRepo(
      token,
      'portfolio-data.json',
      utf8ToBase64(JSON.stringify(payload, null, 2)),
      'Update portfolio data via web interface'
    );

    await writeToIDB(payload);
    hasUnsyncedChanges = false;
    updateSyncButtonBadge();
    renderAll();

    statusBox.innerHTML = `
      <div style="padding:0.9rem; background:hsl(150, 45%, 93%); border:1px solid hsl(152, 40%, 72%); border-radius:8px; font-size:0.85rem; color:hsl(152, 55%, 22%);">
        ✅ <strong>Successfully published to GitHub!</strong><br/>
        All photos, PDF certificates, CCA items, projects, and section settings are now permanently stored in your GitHub repository.
      </div>
    `;
  } catch (err) {
    statusBox.innerHTML = `
      <div style="padding:0.9rem; background:hsl(0, 70%, 95%); border:1px solid hsl(0, 60%, 80%); border-radius:8px; font-size:0.85rem; color:hsl(0, 65%, 35%);">
        ❌ <strong>Publish failed:</strong> ${err.message}<br/>
        Please check that your GitHub Token has <code>repo</code> or <code>Contents: Read &amp; write</code> permission for <code>${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}</code>.
      </div>
    `;
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = '☁️ Publish All Changes to GitHub Now';
  }
}

/* ==========================================================================
   Year Sourcing & Dynamic Category Helpers
   ========================================================================== */

function getAllYearsWithCounts() {
  const activeSister = appData.state.activeSister;
  const allItems = [...appData.awards, ...appData.projects, ...(appData.ccas || [])];
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
  renderCCAs();
  renderProjects();
}

function setYearSortOrder(sortVal) {
  appData.state.yearSort = sortVal;
  renderAwards();
  renderCCAs();
  renderProjects();
}

function renderDynamicCategoryChips(collectionKey, containerId, activeFilterKey, handlerName) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = appData[collectionKey] || [];
  const categories = Array.from(new Set(items.map(i => (i.category || '').trim()).filter(Boolean)));
  const currentActive = appData.state[activeFilterKey];

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
    'Robotics & Coding',
    'Piano',
    'Swimming',
    'Science',
    'Debate'
  ]);

  [...appData.awards, ...appData.projects].forEach(item => {
    if (item.category) allCats.add(item.category.trim());
  });

  datalist.innerHTML = Array.from(allCats)
    .map(c => `<option value="${c.replace(/"/g, '&quot;')}"></option>`)
    .join('');
}

/* ==========================================================================
   Section Headers & Section Visibility Controls (Show / Hide Sections 1-4)
   ========================================================================== */

function renderSectionHeadersAndVisibility() {
  const editable = appData.state.editMode;
  const vis = appData.sectionVisibility || { academics: true, awards: true, cca: true, projects: true };
  const headers = appData.sectionHeaders || DEFAULT_DATA.sectionHeaders;

  ['academics', 'awards', 'cca', 'projects'].forEach(secKey => {
    const secEl = document.getElementById(secKey);
    if (!secEl) return;

    const isVisible = vis[secKey] !== false;
    // If hidden and not in edit mode, hide the entire section
    if (!isVisible && !editable) {
      secEl.style.display = 'none';
    } else {
      secEl.style.display = '';
      secEl.style.opacity = (!isVisible && editable) ? '0.45' : '1';
    }

    // Update header text and make editable in Edit Mode
    const eyebrowEl = document.getElementById(`sec-eyebrow-${secKey}`);
    const titleEl = document.getElementById(`sec-title-${secKey}`);
    const subEl = document.getElementById(`sec-sub-${secKey}`);

    if (eyebrowEl && headers[secKey]?.eyebrow) {
      eyebrowEl.innerText = headers[secKey].eyebrow;
      eyebrowEl.contentEditable = editable ? 'true' : 'false';
    }
    if (titleEl && headers[secKey]?.title) {
      titleEl.innerText = headers[secKey].title;
      titleEl.contentEditable = editable ? 'true' : 'false';
    }
    if (subEl && headers[secKey]?.subtitle) {
      subEl.innerText = headers[secKey].subtitle;
      subEl.contentEditable = editable ? 'true' : 'false';
    }

    // Update visibility toggle button in Edit Mode
    const toggleBtn = document.getElementById(`btn-vis-${secKey}`);
    if (toggleBtn) {
      toggleBtn.style.display = editable ? 'inline-flex' : 'none';
      toggleBtn.innerHTML = isVisible ? '👁️ Hide Section' : '👁️‍🗨️ Show Section';
    }
  });
}

function updateSectionHeader(secKey, field, val) {
  if (!appData.sectionHeaders) appData.sectionHeaders = JSON.parse(JSON.stringify(DEFAULT_DATA.sectionHeaders));
  if (!appData.sectionHeaders[secKey]) appData.sectionHeaders[secKey] = {};
  appData.sectionHeaders[secKey][field] = val.trim();
  savePortfolioData();
}

function toggleSectionVisibility(secKey) {
  if (!appData.sectionVisibility) appData.sectionVisibility = { academics: true, awards: true, cca: true, projects: true };
  appData.sectionVisibility[secKey] = appData.sectionVisibility[secKey] === false ? true : false;
  savePortfolioData();
  renderSectionHeadersAndVisibility();
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
            ${s.interests.map((tag, tIdx) => `
              <span class="interest-tag">
                <span ${editable} onblur="updateInterestTag('${s.id}', ${tIdx}, this.innerText)">${tag}</span>
                ${appData.state.editMode ? `<button type="button" onclick="removeInterestTag('${s.id}', ${tIdx})" style="margin-left:4px; color:hsl(0,65%,45%); font-weight:700;" title="Remove tag">×</button>` : ''}
              </span>
            `).join('')}
            ${appData.state.editMode ? `<button type="button" class="interest-tag" style="border-style:dashed; color:var(--active-accent);" onclick="addInterestTag('${s.id}')">+ Add Tag</button>` : ''}
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
        <span class="curriculum-tag" ${editable} onblur="updateSisterField('${s.id}', 'curriculum', this.innerText)">${s.curriculum}</span>
      </div>

      <div class="subject-list">
        ${s.subjects.map((sub, idx) => `
          <div class="subject-item" style="position: relative;">
            <div class="subject-top">
              <span class="subject-name" ${editable} onblur="updateSubject('${s.id}', ${idx}, 'name', this.innerText)">${sub.name}</span>
              <div style="display:flex; align-items:center; gap:0.4rem;">
                <span class="subject-grade" ${editable} onblur="updateSubject('${s.id}', ${idx}, 'grade', this.innerText)">${sub.grade}</span>
                ${appData.state.editMode ? `<button type="button" onclick="deleteSubject('${s.id}', ${idx})" style="color:hsl(0,65%,45%); font-size:0.8rem; font-weight:700; padding:0 4px;" title="Delete subject">🗑️</button>` : ''}
              </div>
            </div>
            <div class="progress-track">
              <div class="progress-fill fill-${s.id}" style="width: ${sub.percent}%"></div>
            </div>
            <p class="subject-note" ${editable} onblur="updateSubject('${s.id}', ${idx}, 'note', this.innerText)">${sub.note}</p>
          </div>
        `).join('')}
        ${appData.state.editMode ? `
          <button type="button" class="btn btn-outline" style="width:100%; border-style:dashed;" onclick="addSubject('${s.id}')">
            + Add Subject for ${s.name}
          </button>
        ` : ''}
      </div>

      <div class="language-strip">
        <div class="language-strip-title">Trilingual Mastery (Anglo Singapore Benchmark)</div>
        <div class="language-badges">
          ${s.languages.map((lang, lIdx) => `
            <div class="lang-badge">
              <span class="lang-name" ${editable} onblur="updateLanguage('${s.id}', ${lIdx}, 'name', this.innerText)">${lang.name}</span>
              <span class="lang-level" ${editable} onblur="updateLanguage('${s.id}', ${lIdx}, 'level', this.innerText)">${lang.level}</span>
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
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span class="year-badge">📅 ${item.year}</span>
            <button type="button" class="btn-outline" style="padding:0.15rem 0.45rem; border-radius:6px; font-size:0.74rem;" onclick="event.stopPropagation(); openEditItemModal('${item.id}', 'awards')" title="Edit this item">✎</button>
            <button type="button" class="btn-outline" style="padding:0.15rem 0.45rem; border-radius:6px; font-size:0.74rem; color:hsl(0,65%,45%);" onclick="event.stopPropagation(); deletePortfolioItem('${item.id}', 'awards')" title="Delete this item">🗑️</button>
          </div>
        </div>
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        ${renderCardAttachmentSnippet(item)}
      </div>
      <div class="card-bottom">
        <span class="award-Result">🏆 ${item.result}</span>
        <span class="card-action-link">View / Edit →</span>
      </div>
    </article>
  `).join('');
}

function renderCCAs() {
  const container = document.getElementById('cca-grid');
  const activeSister = appData.state.activeSister;
  const activeYear = appData.state.activeYear;

  const filtered = sortItemsByYear((appData.ccas || []).filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesYear = activeYear === 'all' || !item.year || String(item.year) === String(activeYear);
    return matchesSister && matchesYear;
  }));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; background: var(--surface-card); border-radius: var(--radius-md); border: 1px dashed var(--border-strong); color: var(--text-secondary);">
        No CCA activities for this filter. Click "+ Add CCA Activity" to add one.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article class="cca-card" id="cca-card-${item.id}" style="position: relative; cursor: pointer;" onclick="openEditItemModal('${item.id}', 'ccas')">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
        <div class="cca-icon-box">${item.icon || '🌟'}</div>
        <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; justify-content: flex-end;">
          <span class="owner-badge owner-${item.sister}">${item.sisterName}</span>
          <button type="button" class="btn-outline" style="padding:0.15rem 0.45rem; border-radius:6px; font-size:0.74rem;" onclick="event.stopPropagation(); openEditItemModal('${item.id}', 'ccas')" title="Edit CCA">✎</button>
          <button type="button" class="btn-outline" style="padding:0.15rem 0.45rem; border-radius:6px; font-size:0.74rem; color:hsl(0,65%,45%);" onclick="event.stopPropagation(); deletePortfolioItem('${item.id}', 'ccas')" title="Delete CCA">🗑️</button>
        </div>
      </div>
      <div class="cca-role">${item.role || item.category || 'Member'}</div>
      <h3 class="cca-title">${item.title}</h3>
      <p class="cca-detail">${item.detail || item.description || ''}</p>
      <div class="cca-schedule">
        <span>${item.schedule || item.year || '2026'}</span>
        <span style="color: var(--active-accent);">Edit CCA →</span>
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
        No projects match the selected Year (${activeYear === 'all' ? 'All' : activeYear}) or Category filter. Click "+ Add Project" to add one.
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
          <div style="display:flex; align-items:center; gap:0.4rem;">
            <span class="year-badge">📅 ${item.year}</span>
            <button type="button" class="btn-outline" style="padding:0.15rem 0.45rem; border-radius:6px; font-size:0.74rem;" onclick="event.stopPropagation(); openEditItemModal('${item.id}', 'projects')" title="Edit Project">✎</button>
            <button type="button" class="btn-outline" style="padding:0.15rem 0.45rem; border-radius:6px; font-size:0.74rem; color:hsl(0,65%,45%);" onclick="event.stopPropagation(); deletePortfolioItem('${item.id}', 'projects')" title="Delete Project">🗑️</button>
          </div>
        </div>
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        ${renderCardAttachmentSnippet(item)}
      </div>
      <div class="card-bottom">
        <span class="award-Result">✨ ${item.result}</span>
        <span class="card-action-link">View / Edit →</span>
      </div>
    </article>
  `).join('');
}

function renderAll() {
  renderSectionHeadersAndVisibility();
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
      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button type="button" class="btn btn-outline" style="font-size: 0.8rem;" onclick="closeDetailModal(); openEditItemModal('${item.id}', '${collectionKey}')">
          ✎ Edit Details
        </button>
        <label class="btn btn-outline" style="font-size: 0.8rem; cursor: pointer;">
          📎 Attach / Replace Photo or PDF
          <input type="file" accept="image/*,.pdf,application/pdf" style="display:none" onchange="attachFileToExistingItem('${item.id}', '${collectionKey}', event)" />
        </label>
      </div>
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

/* Open Add / Edit Modal (Supports Awards [02], CCA [03], and Projects [04]) */
function openAddModal(defaultSection = 'awards') {
  editingItemContext = null;
  pendingAttachment = { data: null, type: null, name: null };

  const form = document.getElementById('add-achievement-form');
  if (form) form.reset();

  const modalTitle = document.getElementById('add-modal-title');
  if (modalTitle) modalTitle.innerText = 'Add New Award, CCA Activity, or Project';

  const submitBtn = document.getElementById('btn-submit-achievement');
  if (submitBtn) submitBtn.innerText = 'Save to Portfolio';

  const sectionSelect = document.getElementById('field-section');
  if (sectionSelect) {
    sectionSelect.value = defaultSection;
    handleSectionTypeChange(defaultSection);
  }

  const activeSister = appData.state.activeSister;
  const sisterSelect = document.getElementById('field-sister');
  if (sisterSelect && (activeSister === 'noodee' || activeSister === 'nadia')) {
    sisterSelect.value = activeSister;
  }

  const previewEl = document.getElementById('attachment-file-status');
  if (previewEl) previewEl.innerHTML = '';

  updateCategoryDatalist();
  document.getElementById('add-modal').classList.add('open');
}

function openEditItemModal(itemId, collectionKey) {
  const list = appData[collectionKey] || [];
  const item = list.find(x => x.id === itemId);
  if (!item) return;

  editingItemContext = { id: itemId, collectionKey: collectionKey };
  pendingAttachment = {
    data: item.attachmentData || null,
    type: item.attachmentType || null,
    name: item.attachmentName || null
  };

  const form = document.getElementById('add-achievement-form');
  if (!form) return;

  document.getElementById('add-modal-title').innerText = '✎ Edit Portfolio Item';
  document.getElementById('btn-submit-achievement').innerText = 'Update Item';

  form.sister.value = item.sister || 'noodee';
  form.sectionType.value = collectionKey;
  handleSectionTypeChange(collectionKey);

  if (collectionKey === 'ccas') {
    form.category.value = item.role || '';
    form.year.value = item.year || '2026';
    form.title.value = item.title || '';
    form.result.value = item.schedule || '';
    form.issuer.value = item.icon || '🌟';
    form.description.value = item.detail || '';
    form.skills.value = '';
    if (form.externalLink) form.externalLink.value = '';
  } else {
    form.category.value = item.category || '';
    form.year.value = item.year || '2026';
    form.title.value = item.title || '';
    form.result.value = item.result || '';
    form.issuer.value = item.issuer || '';
    form.description.value = item.description || '';
    form.skills.value = item.skills || '';
    if (form.externalLink) form.externalLink.value = item.externalLink || '';
  }

  const previewEl = document.getElementById('attachment-file-status');
  if (previewEl) {
    if (pendingAttachment.data) {
      previewEl.innerHTML = `<span class="file-preview-pill">📎 Current file attached (${pendingAttachment.name || pendingAttachment.type})</span>`;
    } else {
      previewEl.innerHTML = '';
    }
  }

  updateCategoryDatalist();
  document.getElementById('add-modal').classList.add('open');
}

function handleSectionTypeChange(secVal) {
  const catLabel = document.getElementById('label-field-category');
  const resLabel = document.getElementById('label-field-result');
  const issLabel = document.getElementById('label-field-issuer');
  const catInput = document.getElementById('field-category');
  const resInput = document.getElementById('field-result');
  const issInput = document.getElementById('field-issuer');

  if (secVal === 'ccas') {
    if (catLabel) catLabel.innerText = 'Role / Position in CCA or Club';
    if (catInput) catInput.placeholder = 'e.g., Vice President, First Violin, Varsity Squad...';
    if (resLabel) resLabel.innerText = 'Schedule / Duration';
    if (resInput) resInput.placeholder = 'e.g., 2025 – 2026 • 3 hrs/week';
    if (issLabel) issLabel.innerText = 'Icon Emoji (Optional)';
    if (issInput) issInput.placeholder = 'e.g., 🎻, 🏸, 🏛️, 🌱, 🏊‍♀️, 🎹';
  } else {
    if (catLabel) catLabel.innerText = 'Category (Open-Ended: Type Any or Select)';
    if (catInput) catInput.placeholder = 'e.g., STEM & Math, Piano, Swimming, Coding, Debate...';
    if (resLabel) resLabel.innerText = 'Result / Distinction Achieved';
    if (resInput) resInput.placeholder = 'e.g., Gold Award / 1st Place / Distinction';
    if (issLabel) issLabel.innerText = 'Issuing Body / Organization';
    if (issInput) issInput.placeholder = 'e.g., Anglo Singapore / SIMCC / ABRSM';
  }
}

function closeAddModal() {
  editingItemContext = null;
  document.getElementById('add-modal').classList.remove('open');
}

function compressImageFile(file, callback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 1400;
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
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
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
    if (file.size > 25 * 1024 * 1024) {
      alert('PDF file is larger than 25 MB. Please choose a PDF under 25 MB or paste a Google Drive link.');
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
        statusEl.innerHTML = `<span class="file-preview-pill">📄 PDF Ready: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>`;
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
        statusEl.innerHTML = `<span class="file-preview-pill">🖼️ Image Ready: ${file.name}</span>`;
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
    if (file.size > 25 * 1024 * 1024) {
      alert('PDF file is larger than 25 MB.');
      return;
    }
    const reader = new FileReader();
    reader.onload = async function(e) {
      item.attachmentData = e.target.result;
      item.attachmentType = 'pdf';
      item.attachmentName = file.name;
      await savePortfolioData();
      renderAll();
      openCertificateModal(itemId, collectionKey);
    };
    reader.readAsDataURL(file);
  } else if (file.type.startsWith('image/')) {
    compressImageFile(file, async (compressedDataUrl) => {
      item.attachmentData = compressedDataUrl;
      item.attachmentType = 'image';
      item.attachmentName = file.name;
      await savePortfolioData();
      renderAll();
      openCertificateModal(itemId, collectionKey);
    });
  }
}

async function deletePortfolioItem(itemId, collectionKey) {
  if (!confirm('Remove this item from the portfolio?')) return;
  appData[collectionKey] = (appData[collectionKey] || []).filter(x => x.id !== itemId);
  await savePortfolioData();
  closeDetailModal();
  renderAll();
}

async function handleAddAchievement(event) {
  event.preventDefault();
  const form = event.target;
  const sectionType = form.sectionType.value; // 'awards' | 'ccas' | 'projects'
  const sister = form.sister.value;
  const sisterMap = {
    noodee: 'Noodee (Sec 3)',
    nadia: 'Nadia (Sec 1)',
    both: 'Noodee & Nadia (Sister Collaboration)'
  };

  // If editing an existing item, remove it from its old collection if sectionType changed
  let itemId = 'custom-' + Date.now();
  if (editingItemContext) {
    itemId = editingItemContext.id;
    const oldCol = editingItemContext.collectionKey;
    appData[oldCol] = (appData[oldCol] || []).filter(x => x.id !== itemId);
  }

  if (sectionType === 'ccas') {
    const ccaEntry = {
      id: itemId,
      sister: sister,
      sisterName: sisterMap[sister],
      year: form.year.value.trim() || '2026',
      icon: form.issuer.value.trim() || '🌟',
      role: form.category.value.trim() || 'Member',
      title: form.title.value.trim(),
      detail: form.description.value.trim(),
      schedule: form.result.value.trim() || `${form.year.value.trim() || '2026'} • Anglo Singapore CCA`
    };
    if (!appData.ccas) appData.ccas = [];
    appData.ccas.unshift(ccaEntry);
  } else {
    const customCategory = form.category.value.trim() || 'Academic Honours';
    const newEntry = {
      id: itemId,
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
  }

  await savePortfolioData();
  form.reset();
  pendingAttachment = { data: null, type: null, name: null };
  editingItemContext = null;
  closeAddModal();
  renderAll();
}

/* Inline Editing & Custom Avatar Upload */
async function toggleEditMode() {
  appData.state.editMode = !appData.state.editMode;
  document.body.classList.toggle('edit-mode', appData.state.editMode);

  const btn = document.getElementById('btn-toggle-edit');
  if (appData.state.editMode) {
    btn.classList.add('btn-edit-active');
    btn.innerHTML = '✓ Save & Exit Edit';
  } else {
    btn.classList.remove('btn-edit-active');
    btn.innerHTML = '✎ Customize Text & Photos';
    await savePortfolioData();
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

function updateInterestTag(sisterId, idx, value) {
  if (!appData.sisters[sisterId]?.interests) return;
  appData.sisters[sisterId].interests[idx] = value.trim();
  savePortfolioData();
}

function removeInterestTag(sisterId, idx) {
  if (!appData.sisters[sisterId]?.interests) return;
  appData.sisters[sisterId].interests.splice(idx, 1);
  savePortfolioData();
  renderHeroCards();
}

function addInterestTag(sisterId) {
  const newTag = prompt('Enter new interest or skill tag:');
  if (!newTag || !newTag.trim()) return;
  appData.sisters[sisterId].interests.push(newTag.trim());
  savePortfolioData();
  renderHeroCards();
}

function updateSubject(sisterId, idx, field, value) {
  if (!appData.sisters[sisterId]?.subjects[idx]) return;
  appData.sisters[sisterId].subjects[idx][field] = value.trim();
  savePortfolioData();
}

function addSubject(sisterId) {
  const name = prompt('Subject Name (e.g., Physics, Mandarin Chinese):');
  if (!name || !name.trim()) return;
  const grade = prompt('Grade / Score (e.g., A* (95%)):', 'A* (95%)') || 'A*';
  const note = prompt('Short description or achievement in this subject:', 'Consistent academic distinction.') || '';
  appData.sisters[sisterId].subjects.push({
    name: name.trim(),
    grade: grade.trim(),
    percent: 95,
    note: note.trim()
  });
  savePortfolioData();
  renderAcademics();
}

function deleteSubject(sisterId, idx) {
  if (!confirm('Remove this subject?')) return;
  appData.sisters[sisterId].subjects.splice(idx, 1);
  savePortfolioData();
  renderAcademics();
}

function updateLanguage(sisterId, idx, field, value) {
  if (!appData.sisters[sisterId]?.languages[idx]) return;
  appData.sisters[sisterId].languages[idx][field] = value.trim();
  savePortfolioData();
}

function handleAvatarUpload(sisterId, event) {
  const file = event.target.files?.[0];
  if (!file) return;
  compressImageFile(file, async (compressedDataUrl) => {
    appData.sisters[sisterId].avatar = compressedDataUrl;
    await savePortfolioData();
    renderHeroCards();
  });
}

/* Export / Import Portfolio Data Backup */
function exportPortfolioBackup() {
  const dataStr = JSON.stringify({
    updatedAt: Date.now(),
    sectionVisibility: appData.sectionVisibility,
    sectionHeaders: appData.sectionHeaders,
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
  reader.onload = async function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.sisters && imported.awards) {
        appData = mergeWithDefaults(imported);
        await savePortfolioData();
        renderAll();
        alert('Portfolio backup restored to this computer! Click "☁️ Save to GitHub" if you want to publish it to GitHub Pages.');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (err) {
      alert('Could not parse backup JSON file.');
    }
  };
  reader.readAsText(file);
}

async function resetDefaultData() {
  if (confirm('Reset local changes on this browser back to the latest published version on GitHub?')) {
    await clearIDB();
    localStorage.removeItem('noodee_nadia_portfolio_v2');
    document.body.classList.remove('edit-mode');
    hasUnsyncedChanges = false;
    updateSyncButtonBadge();
    await initializePortfolioData();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializePortfolioData();

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });
});
