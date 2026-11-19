/**
 * Noodee & Nadia — Student Portfolio Application Logic
 * Anglo Singapore International School (Secondary 3 & Secondary 1)
 *
 * Includes all 6 Showcase Enhancements:
 * 1. Interactive Growth & Milestone Timeline (Chronological Journey)
 * 2. 5-Dimension Holistic Competency Radar Chart (Interactive SVG + Sliders in Edit Mode)
 * 3. Video & Performance Showcase + Activity Photo Memories (Multiple photos & YouTube embeds)
 * 4. Activity Photo Strips inside every Award, CCA, and Project card
 * 5. Future Aspirations & Personal Statement Box on each sister's profile card
 * 6. QR Code Digital Portfolio Dossier Card (for instant mobile scanning on printouts/PDFs)
 */

const GITHUB_REPO_OWNER = 'rchookhiatti';
const GITHUB_REPO_NAME = 'noodee-nadia-portfolio';
const GITHUB_BRANCH = 'main';
const PORTFOLIO_PUBLIC_URL = 'https://rchookhiatti.github.io/noodee-nadia-portfolio/';

const IDB_NAME = 'NoodeeNadiaPortfolioDB';
const IDB_VERSION = 1;
const IDB_STORE = 'portfolioStore';
const IDB_KEY = 'mainData';

const DEFAULT_DATA = {
  state: {
    activeSister: 'both',
    activeYear: 'all',
    yearSort: 'desc',
    awardFilter: 'all',
    projectFilter: 'all',
    editMode: false
  },
  sectionVisibility: {
    academics: true,
    radar: true,
    awards: true,
    cca: true,
    projects: true,
    media: true,
    timeline: true
  },
  sectionHeaders: {
    academics: {
      eyebrow: '01 • Academic Excellence & Subject Mastery',
      title: 'Singapore-Cambridge Curriculum & Trilingual Fluency',
      subtitle: 'Rigorous academic grounding across Mathematics, Pure Sciences, Humanities, and trilingual proficiency in English, Mandarin Chinese, and Thai.'
    },
    radar: {
      eyebrow: 'Holistic Competency Profile',
      title: '5-Dimension Well-Rounded Scholar Radar',
      subtitle: 'Visualizing balanced development across STEM, Global Languages, Performing Arts, Leadership, and Sports & Outdoor Survival.'
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
    },
    media: {
      eyebrow: '05 • Video Performances & Camp Memories',
      title: 'Music Recitals, Debates & Action Snapshots',
      subtitle: 'Watch solo music performances, debate speeches, and behind-the-scenes moments from science labs and leadership camps.'
    },
    timeline: {
      eyebrow: '06 • Chronological Milestone Journey',
      title: 'Continuous Growth & Progression Timeline',
      subtitle: 'Tracking every milestone across academic years from Lower Secondary to Upper Secondary.'
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
      aspirationGoal: 'Future Pathway: Biomedical & Veterinary Sciences / STEM Innovation',
      aspirationQuote: '“I believe scientific curiosity and compassionate leadership can bridge classroom discovery with real-world care for people, animals, and our environment.”',
      avatar: 'assets/uploads/avatar-noodee.jpg?v=1794969986555',
      radarScores: [
        { label: 'STEM & Science', score: 96 },
        { label: 'Languages & Debate', score: 92 },
        { label: 'Music (Piano G7)', score: 94 },
        { label: 'Leadership & NLP', score: 95 },
        { label: 'Sports & Survival', score: 90 }
      ],
      stats: [
        { value: '4.0 / A*', label: 'Academic GPA' },
        { value: 'HSK 5', label: 'Mandarin Level' },
        { value: '14+', label: 'Honors & Awards' }
      ],
      interests: [
        'Additional Mathematics',
        'Biomedical Chemistry',
        'Model United Nations',
        'Piano Grade 7',
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
          note: 'Lead student researcher in Sustainable Bioplastics & Second Prize Science Group Project.'
        },
        {
          name: 'First Language English & World Literature',
          grade: 'A (91%)',
          percent: 91,
          note: 'ASIA World Schools Debating Championship Coordinator & Editor.'
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
      aspirationGoal: 'Future Pathway: Architectural Design, Creative Arts & Sustainability',
      aspirationQuote: '“Whether solving a math puzzle or playing the violin, I love finding harmony between logic, creativity, and caring for our planet.”',
      avatar: 'assets/uploads/avatar-nadia.jpg?v=1794969990725',
      radarScores: [
        { label: 'STEM & Math', score: 94 },
        { label: 'Trilingual Fluency', score: 90 },
        { label: 'Music & Visual Arts', score: 97 },
        { label: 'Eco Leadership', score: 89 },
        { label: 'Swimming & Sports', score: 91 }
      ],
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
          note: 'SASMO Medalist; excels in heuristic problem solving and number theory.'
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
      externalLink: '',
      icon: '🌟',
      role: 'Swimming',
      detail: 'Has successfully completed 25th Sea Survival and Basic Water Life Saving',
      schedule: 'Certificate'
    },
    {
      id: 'custom-1794983113731',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Leadership',
      role: 'Leadership',
      title: 'Certificate Life 101 Program',
      result: 'Certificate',
      schedule: 'Certificate',
      issuer: 'Inside Out',
      description: 'has successfully demonstrated and completed Life 101 Program (Junior NLP Certification)',
      detail: 'has successfully demonstrated and completed Life 101 Program (Junior NLP Certification)',
      skills: 'Problem Solving',
      attachmentData: 'assets/uploads/cert-custom-1794983113731.jpg',
      attachmentType: 'image',
      attachmentName: '2025-Life 101.jpg',
      externalLink: '',
      icon: '🌟'
    },
    {
      id: 'custom-1794971342649',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Leadership',
      title: 'Alpha Leadership Camp',
      result: 'Certificate',
      issuer: 'Inside Out Academy',
      description: 'has successfully demonstrated and completed Alpha Leadership Camp',
      skills: 'Leadership',
      attachmentData: 'assets/uploads/cert-custom-1794971342649.jpg',
      attachmentType: 'image',
      attachmentName: '2025-Inside Out.jpg',
      externalLink: '',
      icon: '🌟',
      role: 'Leadership',
      detail: 'has successfully demonstrated and completed Alpha Leadership Camp',
      schedule: 'Certificate'
    },
    {
      id: 'custom-1794971462275',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'STEM & Research',
      title: 'Certificate Veterinary Camp',
      result: 'Certificate',
      issuer: 'Career Hub',
      description: 'has successfully completed Veterinary Camp',
      skills: 'Leadership',
      attachmentData: 'assets/uploads/cert-custom-1794971462275.jpg',
      attachmentType: 'image',
      attachmentName: '2025-Career Hub.jpg',
      externalLink: '',
      icon: '🌟',
      role: 'STEM & Research',
      detail: 'has successfully completed Veterinary Camp',
      schedule: 'Certificate'
    },
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
      externalLink: '',
      icon: '🌟',
      role: 'Piano',
      detail: 'has been successful in Piano Grade 7',
      schedule: 'Piano Grade 7'
    },
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
  ],
  mediaGallery: [
    {
      id: 'med-1',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Music Recital',
      title: 'Yamaha Piano Grade 7 Performance & Repertoire',
      description: 'Solo piano recital showcasing expressive dynamics and technical mastery for Grade 7 assessment.',
      videoUrl: '',
      photoData: 'assets/uploads/cert-custom-1794970263859.jpg'
    },
    {
      id: 'med-2',
      sister: 'noodee',
      sisterName: 'Noodee (Sec 3)',
      year: '2025',
      category: 'Camp & Leadership',
      title: 'Veterinary Camp & Sea Survival Action Highlights',
      description: 'Hands-on clinical animal care workshop at Career Hub Veterinary Camp and KIDO 25th Sea Survival training.',
      videoUrl: '',
      photoData: 'assets/uploads/cert-custom-1794971462275.jpg'
    },
    {
      id: 'med-3',
      sister: 'nadia',
      sisterName: 'Nadia (Sec 1)',
      year: '2026',
      category: 'Violin & Ensemble',
      title: 'ABRSM Grade 6 Violin Recital & String Ensemble',
      description: 'Classical solo violin performance and Anglo Singapore String Ensemble concert highlights.',
      videoUrl: '',
      photoData: 'assets/uploads/avatar-nadia.jpg?v=1794969990725'
    }
  ]
};

let pendingAttachment = {
  data: null,
  type: null,
  name: null
};

let pendingActivityPhotos = []; // Array of compressed image data URLs for activity memories
let appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
let hasUnsyncedChanges = false;
let editingItemContext = null; // { id, collectionKey }
let draggedCardPayload = null; // { id, fromCollection }
let isAdminUnlocked = false;   // Default: Read-Only Visitor Mode (true only after Parent Login)
let activeSessionToken = '';   // Verified GitHub PAT for the active parent session

/* ==========================================================================
   Parent Admin Authentication (Read-Only by Default for Public Visitors)
   ========================================================================== */

function openParentLoginModal() {
  const modal = document.getElementById('parent-login-modal');
  const tokenInput = document.getElementById('field-parent-token');
  const savedHint = document.getElementById('parent-saved-token-hint');
  const forgetBtn = document.getElementById('btn-forget-saved-token');
  const statusBox = document.getElementById('parent-login-status');
  const rememberCheck = document.getElementById('field-parent-remember');

  const savedToken = localStorage.getItem('github_pat_noodee_nadia') || '';
  if (tokenInput) {
    tokenInput.value = savedToken;
  }
  if (savedHint) {
    savedHint.style.display = savedToken ? 'block' : 'none';
  }
  if (forgetBtn) {
    forgetBtn.style.display = savedToken ? 'inline-block' : 'none';
  }
  if (rememberCheck) {
    rememberCheck.checked = Boolean(savedToken) || true;
  }
  if (statusBox) {
    statusBox.innerHTML = '';
  }
  if (modal) {
    modal.classList.add('open');
  }
}

function closeParentLoginModal() {
  const modal = document.getElementById('parent-login-modal');
  if (modal) modal.classList.remove('open');
}

function forgetSavedGitHubToken() {
  localStorage.removeItem('github_pat_noodee_nadia');
  activeSessionToken = '';
  const tokenInput = document.getElementById('field-parent-token');
  const savedHint = document.getElementById('parent-saved-token-hint');
  const forgetBtn = document.getElementById('btn-forget-saved-token');
  const statusBox = document.getElementById('parent-login-status');
  if (tokenInput) tokenInput.value = '';
  if (savedHint) savedHint.style.display = 'none';
  if (forgetBtn) forgetBtn.style.display = 'none';
  if (statusBox) {
    statusBox.innerHTML = `<div style="padding:0.65rem 0.85rem; background:var(--surface-subtle); border-radius:8px; font-size:0.82rem; color:var(--text-secondary);">Saved GitHub Token has been cleared from this browser.</div>`;
  }
}

async function verifyGitHubTokenWriteAccess(token) {
  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}?_t=${Date.now()}`, {
    cache: 'no-store',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github+json'
    }
  });
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Invalid or expired GitHub Token (HTTP 401). Please check your token.');
    }
    throw new Error(`Unable to verify token with GitHub (HTTP ${res.status}).`);
  }
  const repoData = await res.json();
  if (!repoData.permissions || repoData.permissions.push !== true) {
    throw new Error('This token does not have write/push permission for rchookhiatti/noodee-nadia-portfolio.');
  }
  return true;
}

async function handleParentLoginSubmit(event) {
  event.preventDefault();
  const tokenInput = document.getElementById('field-parent-token');
  const rememberCheck = document.getElementById('field-parent-remember');
  const statusBox = document.getElementById('parent-login-status');
  const submitBtn = document.getElementById('btn-confirm-parent-login');

  const token = (tokenInput?.value || '').trim();
  if (!token) {
    alert('Please enter your GitHub Personal Access Token.');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.innerText = '⏳ Verifying with GitHub...';
  statusBox.innerHTML = `<div style="padding:0.7rem 0.9rem; background:var(--surface-subtle); border-radius:8px; font-size:0.83rem; color:var(--text-secondary);">Verifying repository write access with GitHub...</div>`;

  try {
    await verifyGitHubTokenWriteAccess(token);

    activeSessionToken = token;
    if (rememberCheck && rememberCheck.checked) {
      localStorage.setItem('github_pat_noodee_nadia', token);
    } else {
      localStorage.removeItem('github_pat_noodee_nadia');
    }

    enterAdminMode();
    closeParentLoginModal();
  } catch (err) {
    statusBox.innerHTML = `
      <div style="padding:0.75rem 0.9rem; background:hsl(0, 75%, 96%); border:1px solid hsl(0, 60%, 82%); border-radius:8px; font-size:0.83rem; color:hsl(0, 65%, 36%);">
        <strong>❌ Access Denied:</strong> ${err.message}
      </div>
    `;
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = '🔓 Unlock Admin Mode';
  }
}

function enterAdminMode() {
  isAdminUnlocked = true;
  document.body.classList.add('admin-mode');
  updateSyncButtonBadge();
  renderAll();
}

function exitAdminMode(forgetToken = false) {
  if (hasUnsyncedChanges) {
    const proceed = confirm(
      'You have unsynced edits on this browser that have not been saved to GitHub yet.\n\nClick OK to lock Admin Mode anyway (your local edits stay saved on this browser until you click "☁️ Save to GitHub"), or Cancel to save to GitHub first.'
    );
    if (!proceed) return;
  }

  isAdminUnlocked = false;
  appData.state.editMode = false;
  document.body.classList.remove('admin-mode');
  document.body.classList.remove('edit-mode');

  const editBtn = document.getElementById('btn-toggle-edit');
  if (editBtn) {
    editBtn.classList.remove('btn-edit-active');
    editBtn.innerHTML = '✎ Customize Text & Photos';
  }

  if (forgetToken) {
    activeSessionToken = '';
    localStorage.removeItem('github_pat_noodee_nadia');
  } else {
    activeSessionToken = '';
  }

  renderAll();
}

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
  const mergedSisters = {
    noodee: {
      ...DEFAULT_DATA.sisters.noodee,
      ...(source.sisters?.noodee || {}),
      radarScores: source.sisters?.noodee?.radarScores || DEFAULT_DATA.sisters.noodee.radarScores
    },
    nadia: {
      ...DEFAULT_DATA.sisters.nadia,
      ...(source.sisters?.nadia || {}),
      radarScores: source.sisters?.nadia?.radarScores || DEFAULT_DATA.sisters.nadia.radarScores
    }
  };

  return {
    ...DEFAULT_DATA,
    ...source,
    sisters: mergedSisters,
    mediaGallery: source.mediaGallery || DEFAULT_DATA.mediaGallery,
    sectionVisibility: {
      ...DEFAULT_DATA.sectionVisibility,
      ...(source.sectionVisibility || {})
    },
    sectionHeaders: {
      academics: { ...DEFAULT_DATA.sectionHeaders.academics, ...(source.sectionHeaders?.academics || {}) },
      radar: { ...DEFAULT_DATA.sectionHeaders.radar, ...(source.sectionHeaders?.radar || {}) },
      awards: { ...DEFAULT_DATA.sectionHeaders.awards, ...(source.sectionHeaders?.awards || {}) },
      cca: { ...DEFAULT_DATA.sectionHeaders.cca, ...(source.sectionHeaders?.cca || {}) },
      projects: { ...DEFAULT_DATA.sectionHeaders.projects, ...(source.sectionHeaders?.projects || {}) },
      media: { ...DEFAULT_DATA.sectionHeaders.media, ...(source.sectionHeaders?.media || {}) },
      timeline: { ...DEFAULT_DATA.sectionHeaders.timeline, ...(source.sectionHeaders?.timeline || {}) }
    },
    state: { ...DEFAULT_DATA.state }
  };
}

async function savePortfolioData() {
  if (!isAdminUnlocked) return;
  const payload = {
    updatedAt: Date.now(),
    sectionVisibility: appData.sectionVisibility,
    sectionHeaders: appData.sectionHeaders,
    sisters: appData.sisters,
    awards: appData.awards,
    ccas: appData.ccas,
    projects: appData.projects,
    mediaGallery: appData.mediaGallery
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
   Drag & Drop / Move Card Between Sections 02 (awards), 03 (ccas), 04 (projects)
   ========================================================================== */

function normalizeItemForTargetSection(item, fromCollection, toCollection) {
  const copy = JSON.parse(JSON.stringify(item));

  if (toCollection === 'ccas') {
    copy.icon = copy.icon || '🌟';
    copy.role = copy.role || copy.category || 'Member';
    copy.detail = copy.detail || copy.description || '';
    copy.schedule = copy.schedule || copy.result || `${copy.year || '2026'} • Anglo Singapore CCA`;
    copy.category = copy.category || copy.role;
    copy.description = copy.description || copy.detail;
    copy.result = copy.result || copy.schedule;
  } else {
    copy.category = copy.category || copy.role || (toCollection === 'awards' ? 'Academic Honours' : 'STEM & Research');
    copy.description = copy.description || copy.detail || '';
    copy.result = copy.result || copy.schedule || 'Certificate';
    copy.issuer = (copy.issuer && copy.issuer.length > 2) ? copy.issuer : 'Anglo Singapore International School';
    copy.skills = copy.skills || copy.category;
  }

  return copy;
}

async function movePortfolioItem(itemId, fromCollection, toCollection) {
  if (!isAdminUnlocked) return;
  if (!toCollection || fromCollection === toCollection) return;

  const sourceList = appData[fromCollection] || [];
  const idx = sourceList.findIndex(x => x.id === itemId);
  if (idx === -1) return;

  const [item] = sourceList.splice(idx, 1);
  const converted = normalizeItemForTargetSection(item, fromCollection, toCollection);

  if (!appData[toCollection]) appData[toCollection] = [];
  appData[toCollection].unshift(converted);

  await savePortfolioData();
  renderAll();
}

function handleCardDragStart(event, itemId, fromCollection) {
  if (!isAdminUnlocked) {
    event.preventDefault();
    return;
  }
  draggedCardPayload = { id: itemId, fromCollection: fromCollection };
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', JSON.stringify(draggedCardPayload));
  }
  const cardEl = event.currentTarget;
  setTimeout(() => {
    if (cardEl) cardEl.classList.add('dragging');
  }, 0);
}

function handleCardDragEnd(event) {
  if (event.currentTarget) {
    event.currentTarget.classList.remove('dragging');
  }
  document.querySelectorAll('.dropzone-section').forEach(sec => sec.classList.remove('drag-over'));
}

function handleSectionDragOver(event, targetCollection) {
  if (!isAdminUnlocked) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
  const secEl = event.currentTarget;
  if (secEl && !secEl.classList.contains('drag-over')) {
    secEl.classList.add('drag-over');
  }
}

function handleSectionDragLeave(event) {
  const secEl = event.currentTarget;
  if (secEl && !secEl.contains(event.relatedTarget)) {
    secEl.classList.remove('drag-over');
  }
}

async function handleSectionDrop(event, targetCollection) {
  if (!isAdminUnlocked) return;
  event.preventDefault();
  const secEl = event.currentTarget;
  if (secEl) secEl.classList.remove('drag-over');

  let payload = draggedCardPayload;
  if (!payload && event.dataTransfer) {
    try {
      payload = JSON.parse(event.dataTransfer.getData('text/plain'));
    } catch (e) {}
  }

  if (!payload || !payload.id || !payload.fromCollection) return;
  draggedCardPayload = null;

  if (payload.fromCollection !== targetCollection) {
    await movePortfolioItem(payload.id, payload.fromCollection, targetCollection);
  }
}

/* ==========================================================================
   Direct Browser-to-GitHub Cloud Publishing (Works from ANY Computer)
   ========================================================================== */

function openGitHubSyncModal() {
  if (!isAdminUnlocked) {
    openParentLoginModal();
    return;
  }
  const savedToken = activeSessionToken || localStorage.getItem('github_pat_noodee_nadia') || '';
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
  statusBox.innerHTML = `<div style="padding:0.75rem; background:var(--surface-subtle); border-radius:8px; font-size:0.84rem; color:var(--text-primary);">Uploading profile photos, PDFs, activity photos, and portfolio data directly to <strong>${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}</strong>...</div>`;

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
      { key: 'awards', list: appData.awards || [] },
      { key: 'ccas', list: appData.ccas || [] },
      { key: 'projects', list: appData.projects || [] }
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

        // Upload any additional activity photos attached to this card
        if (Array.isArray(item.activityPhotos)) {
          for (let pIdx = 0; pIdx < item.activityPhotos.length; pIdx++) {
            const pData = item.activityPhotos[pIdx];
            if (pData && pData.startsWith('data:image/')) {
              const safeId = String(item.id).replace(/[^a-zA-Z0-9_-]/g, '');
              const photoPath = `assets/uploads/act-${safeId}-${pIdx}.jpg`;
              statusBox.innerHTML = `<div style="padding:0.75rem; background:var(--surface-subtle); border-radius:8px; font-size:0.84rem;">Uploading activity photo #${pIdx + 1} for <strong>${item.title}</strong>...</div>`;
              await uploadFileToGitHubRepo(
                token,
                photoPath,
                dataUrlToBase64Content(pData),
                `Upload activity photo for ${item.title}`
              );
              item.activityPhotos[pIdx] = photoPath;
            }
          }
        }
      }
    }

    // Upload any new photos in mediaGallery
    for (const med of (appData.mediaGallery || [])) {
      if (med.photoData && med.photoData.startsWith('data:image/')) {
        const safeId = String(med.id).replace(/[^a-zA-Z0-9_-]/g, '');
        const medPath = `assets/uploads/media-${safeId}.jpg`;
        statusBox.innerHTML = `<div style="padding:0.75rem; background:var(--surface-subtle); border-radius:8px; font-size:0.84rem;">Uploading showcase photo for <strong>${med.title}</strong>...</div>`;
        await uploadFileToGitHubRepo(
          token,
          medPath,
          dataUrlToBase64Content(med.photoData),
          `Upload media showcase photo for ${med.title}`
        );
        med.photoData = medPath;
      }
    }

    const payload = {
      updatedAt: Date.now(),
      sectionVisibility: appData.sectionVisibility,
      sectionHeaders: appData.sectionHeaders,
      sisters: appData.sisters,
      awards: appData.awards,
      ccas: appData.ccas,
      projects: appData.projects,
      mediaGallery: appData.mediaGallery
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
        All photos, PDF certificates, radar scores, videos, and timeline milestones are now permanently stored on GitHub Pages.
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
  renderMediaGallery();
  renderTimeline();
}

function setYearSortOrder(sortVal) {
  appData.state.yearSort = sortVal;
  renderAwards();
  renderCCAs();
  renderProjects();
  renderMediaGallery();
  renderTimeline();
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
   Section Headers & Section Visibility Controls (Show / Hide All Sections)
   ========================================================================== */

function renderSectionHeadersAndVisibility() {
  const editable = appData.state.editMode;
  const vis = appData.sectionVisibility || DEFAULT_DATA.sectionVisibility;
  const headers = appData.sectionHeaders || DEFAULT_DATA.sectionHeaders;

  ['academics', 'radar', 'awards', 'cca', 'projects', 'media', 'timeline'].forEach(secKey => {
    const secEl = document.getElementById(secKey);
    if (!secEl) return;

    const isVisible = vis[secKey] !== false;
    if (!isVisible && !editable) {
      secEl.style.display = 'none';
    } else {
      secEl.style.display = '';
      secEl.style.opacity = (!isVisible && editable) ? '0.45' : '1';
    }

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

    const toggleBtn = document.getElementById(`btn-vis-${secKey}`);
    if (toggleBtn) {
      toggleBtn.style.display = editable ? 'inline-flex' : 'none';
      toggleBtn.innerHTML = isVisible ? '👁️ Hide Section' : '👁️‍🗨️ Show Section';
    }
  });
}

function updateSectionHeader(secKey, field, val) {
  if (!isAdminUnlocked) return;
  if (!appData.sectionHeaders) appData.sectionHeaders = JSON.parse(JSON.stringify(DEFAULT_DATA.sectionHeaders));
  if (!appData.sectionHeaders[secKey]) appData.sectionHeaders[secKey] = {};
  appData.sectionHeaders[secKey][field] = val.trim();
  savePortfolioData();
}

function toggleSectionVisibility(secKey) {
  if (!isAdminUnlocked) return;
  if (!appData.sectionVisibility) appData.sectionVisibility = { ...DEFAULT_DATA.sectionVisibility };
  appData.sectionVisibility[secKey] = appData.sectionVisibility[secKey] === false ? true : false;
  savePortfolioData();
  renderSectionHeadersAndVisibility();
}

/* ==========================================================================
   Rendering Functions (Including 6 New Showcase Features)
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
              ${isAdminUnlocked ? `
                <label class="avatar-upload-btn" for="avatar-input-${s.id}" title="Upload custom photo for ${s.name}">
                  <span>📷 Change Photo</span>
                  <input type="file" id="avatar-input-${s.id}" accept="image/*" style="display:none" onchange="handleAvatarUpload('${s.id}', event)" />
                </label>
              ` : ''}
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

          <!-- Feature 5: Future Aspirations & Personal Statement -->
          <div class="aspiration-box asp-${s.id}">
            <div class="aspiration-goal">
              <span>🎯</span>
              <span ${editable} onblur="updateSisterField('${s.id}', 'aspirationGoal', this.innerText)">${s.aspirationGoal || 'Future Aspiration & Pathway'}</span>
            </div>
            <div class="aspiration-quote" ${editable} onblur="updateSisterField('${s.id}', 'aspirationQuote', this.innerText)">
              ${s.aspirationQuote || '“Committed to lifelong curiosity, leadership, and making a positive impact.”'}
            </div>
          </div>

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

/* Feature 2: 5-Dimension Holistic Competency Radar Chart */
function buildRadarSVG(scores, sisterId) {
  const size = 300;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 95;
  const dims = scores && scores.length === 5 ? scores : DEFAULT_DATA.sisters[sisterId].radarScores;

  const strokeColor = sisterId === 'noodee' ? 'hsl(14, 72%, 56%)' : 'hsl(212, 68%, 52%)';
  const fillColor = sisterId === 'noodee' ? 'hsla(14, 72%, 56%, 0.24)' : 'hsla(212, 68%, 52%, 0.24)';

  const angleFor = (i) => (Math.PI * 2 * i) / 5 - Math.PI / 2;
  const ptFor = (i, rRatio) => {
    const a = angleFor(i);
    return [cx + maxR * rRatio * Math.cos(a), cy + maxR * rRatio * Math.sin(a)];
  };

  // Concentric pentagon rings
  const rings = [0.25, 0.5, 0.75, 1.0].map(ratio => {
    const pts = [0, 1, 2, 3, 4].map(i => ptFor(i, ratio).join(',')).join(' ');
    return `<polygon points="${pts}" fill="none" stroke="hsl(35, 25%, 86%)" stroke-width="1" />`;
  }).join('');

  // Axis lines
  const axes = [0, 1, 2, 3, 4].map(i => {
    const [x, y] = ptFor(i, 1.0);
    return `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="hsl(35, 25%, 84%)" stroke-width="1" stroke-dasharray="3,3" />`;
  }).join('');

  // Data polygon
  const dataPoints = dims.map((d, i) => {
    const val = Math.max(20, Math.min(100, Number(d.score) || 85)) / 100;
    return ptFor(i, val);
  });
  const polyPointsStr = dataPoints.map(p => p.join(',')).join(' ');

  // Dots and labels
  const dotsAndLabels = dims.map((d, i) => {
    const [dx, dy] = dataPoints[i];
    const [lx, ly] = ptFor(i, 1.27);
    const anchor = Math.abs(lx - cx) < 12 ? 'middle' : (lx > cx ? 'start' : 'end');
    return `
      <circle cx="${dx}" cy="${dy}" r="4.5" fill="${strokeColor}" stroke="#fff" stroke-width="1.5" />
      <text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" font-size="10.5" font-weight="700" fill="hsl(222, 38%, 18%)">
        ${d.label} (${d.score}%)
      </text>
    `;
  }).join('');

  return `
    <svg viewBox="0 0 ${size} ${size}" width="100%" height="100%" role="img" aria-label="${sisterId} 5-Dimension Competency Radar">
      ${rings}
      ${axes}
      <polygon points="${polyPointsStr}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="2.5" />
      ${dotsAndLabels}
    </svg>
  `;
}

function renderRadarSection() {
  const container = document.getElementById('radar-grid');
  if (!container) return;

  const active = appData.state.activeSister;
  const editable = appData.state.editMode;

  const list = active === 'both'
    ? [appData.sisters.noodee, appData.sisters.nadia]
    : [appData.sisters[active]];

  container.className = `radar-section-grid ${list.length === 1 ? 'single-focus' : ''}`;

  container.innerHTML = list.map(s => {
    const dims = s.radarScores || DEFAULT_DATA.sisters[s.id].radarScores;
    return `
      <div class="radar-card" id="radar-card-${s.id}">
        <div style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span class="switch-dot dot-${s.id}"></span>
            <h3 style="font-family:var(--font-serif); font-size:1.25rem;">${s.name} — 5-Pillar Balance</h3>
          </div>
          <span class="owner-badge owner-${s.id}">${s.level}</span>
        </div>

        <div class="radar-svg-wrap" id="radar-svg-${s.id}">
          ${buildRadarSVG(dims, s.id)}
        </div>

        ${editable ? `
          <div class="radar-Sliders">
            ${dims.map((d, idx) => `
              <div class="radar-slider-item">
                <label style="font-weight:700; display:flex; justify-content:space-between;">
                  <span contenteditable="true" onblur="updateRadarLabel('${s.id}', ${idx}, this.innerText)">${d.label}</span>
                  <span>${d.score}%</span>
                </label>
                <input type="range" min="50" max="100" value="${d.score}" oninput="updateRadarScore('${s.id}', ${idx}, this.value)" style="accent-color: var(--${s.id}-primary); cursor:pointer;" />
              </div>
            `).join('')}
          </div>
        ` : `
          <p style="font-size:0.82rem; color:var(--text-secondary); text-align:center; margin-top:0.25rem;">
            Balanced excellence across STEM, Trilingual Communication, Music/Arts, Leadership &amp; Athletics.
          </p>
        `}
      </div>
    `;
  }).join('');
}

function updateRadarScore(sisterId, idx, val) {
  if (!isAdminUnlocked || !appData.sisters[sisterId]?.radarScores?.[idx]) return;
  appData.sisters[sisterId].radarScores[idx].score = Number(val);
  savePortfolioData();
  renderRadarSection();
}

function updateRadarLabel(sisterId, idx, val) {
  if (!isAdminUnlocked || !appData.sisters[sisterId]?.radarScores?.[idx]) return;
  appData.sisters[sisterId].radarScores[idx].label = val.trim();
  savePortfolioData();
  renderRadarSection();
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
  let html = '';
  if (item.attachmentData && item.attachmentType === 'image') {
    html += `
      <div class="card-attachment-preview">
        <img src="${item.attachmentData}" alt="${item.title} Certificate" loading="lazy" />
      </div>
    `;
  } else if (item.attachmentData && item.attachmentType === 'pdf') {
    html += `
      <div class="card-pdf-badge">
        <span>📄</span>
        <span>PDF Certificate Attached: ${item.attachmentName || 'Certificate.pdf'}</span>
      </div>
    `;
  }

  // Feature 4: Activity Action Photos Strip inside any card
  if (Array.isArray(item.activityPhotos) && item.activityPhotos.length > 0) {
    html += `
      <div class="activity-photos-strip" style="margin-bottom:0.85rem;">
        ${item.activityPhotos.map((pUrl, idx) => `
          <img src="${pUrl}" alt="Activity memory ${idx + 1}" class="activity-photo-thumb" loading="lazy" />
        `).join('')}
      </div>
    `;
  }

  if (item.videoUrl) {
    html += `
      <div class="card-pdf-badge" style="background:var(--brand-gold-soft);">
        <span>🎬</span>
        <span>Performance / Activity Video Attached</span>
      </div>
    `;
  } else if (item.externalLink) {
    html += `
      <div class="card-pdf-badge">
        <span>🔗</span>
        <span>External Certificate / Document Link Attached</span>
      </div>
    `;
  }
  return html;
}

function renderCardToolbar(item, currentCollection) {
  if (!isAdminUnlocked) return '';
  return `
    <div class="card-toolbar" onclick="event.stopPropagation();">
      <select class="card-move-select" onchange="movePortfolioItem('${item.id}', '${currentCollection}', this.value)" title="Move this item to another section">
        <option value="" selected disabled>⇄ Move to Section...</option>
        ${currentCollection !== 'awards' ? '<option value="awards">→ 02 • Awards & Certificates</option>' : ''}
        ${currentCollection !== 'ccas' ? '<option value="ccas">→ 03 • CCA, Sports & Music</option>' : ''}
        ${currentCollection !== 'projects' ? '<option value="projects">→ 04 • Projects & Service</option>' : ''}
      </select>
      <div class="card-btn-group">
        <button type="button" class="card-tool-btn" onclick="openEditItemModal('${item.id}', '${currentCollection}')" title="Edit this item">
          ✎ Edit
        </button>
        <button type="button" class="card-tool-btn btn-del" onclick="deletePortfolioItem('${item.id}', '${currentCollection}')" title="Delete this item">
          🗑️
        </button>
      </div>
    </div>
  `;
}

function renderAwards() {
  renderDynamicCategoryChips('awards', 'award-filters', 'awardFilter', 'setAwardFilter');

  const container = document.getElementById('awards-grid');
  const activeSister = appData.state.activeSister;
  const activeYear = appData.state.activeYear;
  const categoryFilter = appData.state.awardFilter;

  const filtered = sortItemsByYear((appData.awards || []).filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesYear = activeYear === 'all' || String(item.year) === String(activeYear);
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSister && matchesYear && matchesCat;
  }));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--surface-card); border-radius: var(--radius-md); border: 1px dashed var(--border-strong); color: var(--text-secondary);">
        ${isAdminUnlocked
          ? 'No awards match the selected filter — or drag &amp; drop a card here to move it into <strong>02 • Awards &amp; Certificates</strong>.'
          : 'No awards recorded for the selected year or filter.'}
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article
      class="portfolio-card ${isAdminUnlocked ? 'draggable-card' : ''}"
      id="award-card-${item.id}"
      draggable="${isAdminUnlocked ? 'true' : 'false'}"
      ${isAdminUnlocked ? `ondragstart="handleCardDragStart(event, '${item.id}', 'awards')" ondragend="handleCardDragEnd(event)"` : ''}
      onclick="openCertificateModal('${item.id}', 'awards')"
    >
      <div>
        <div class="card-top-meta">
          <span class="owner-badge owner-${item.sister}">
            <span>●</span> ${item.sisterName}
          </span>
          <span class="year-badge" ${isAdminUnlocked ? 'title="Drag card to another section"' : ''}>${isAdminUnlocked ? '⠿ ' : ''}📅 ${item.year}</span>
        </div>
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        ${renderCardAttachmentSnippet(item)}
      </div>
      <div>
        <div class="card-bottom">
          <span class="award-Result">🏆 ${item.result}</span>
          <span class="card-action-link">View Certificate →</span>
        </div>
        ${renderCardToolbar(item, 'awards')}
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
        ${isAdminUnlocked
          ? 'No CCA activities for this filter — drag &amp; drop any card from Section 02 or 04 here, or click "+ Add CCA Activity".'
          : 'No co-curricular activities recorded for the selected year or filter.'}
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article
      class="cca-card ${isAdminUnlocked ? 'draggable-card' : ''}"
      id="cca-card-${item.id}"
      draggable="${isAdminUnlocked ? 'true' : 'false'}"
      ${isAdminUnlocked ? `ondragstart="handleCardDragStart(event, '${item.id}', 'ccas')" ondragend="handleCardDragEnd(event)"` : ''}
      style="position: relative; display: flex; flex-direction: column; justify-content: space-between;"
      onclick="openCertificateModal('${item.id}', 'ccas')"
    >
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem;">
          <div class="cca-icon-box">${item.icon || '🌟'}</div>
          <div style="display: flex; align-items: center; gap: 0.35rem; flex-wrap: wrap; justify-content: flex-end;">
            <span class="owner-badge owner-${item.sister}">${item.sisterName}</span>
            <span class="year-badge" ${isAdminUnlocked ? 'title="Drag card to another section"' : ''}>${isAdminUnlocked ? '⠿ ' : ''}${item.year || '2026'}</span>
          </div>
        </div>
        <div class="cca-role">${item.role || item.category || 'Member'}</div>
        <h3 class="cca-title">${item.title}</h3>
        <p class="cca-detail">${item.detail || item.description || ''}</p>
        ${renderCardAttachmentSnippet(item)}
      </div>
      <div>
        <div class="cca-schedule">
          <span>${item.schedule || item.result || 'Anglo Singapore CCA'}</span>
          <span style="color: var(--active-accent);">View Details →</span>
        </div>
        ${renderCardToolbar(item, 'ccas')}
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

  const filtered = sortItemsByYear((appData.projects || []).filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesYear = activeYear === 'all' || String(item.year) === String(activeYear);
    const matchesCat = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSister && matchesYear && matchesCat;
  }));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--surface-card); border-radius: var(--radius-md); border: 1px dashed var(--border-strong); color: var(--text-secondary);">
        ${isAdminUnlocked
          ? 'No projects match the selected filter — drag &amp; drop any card here, or click "+ Add Project / Service".'
          : 'No projects recorded for the selected year or filter.'}
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article
      class="portfolio-card ${isAdminUnlocked ? 'draggable-card' : ''}"
      id="project-card-${item.id}"
      draggable="${isAdminUnlocked ? 'true' : 'false'}"
      ${isAdminUnlocked ? `ondragstart="handleCardDragStart(event, '${item.id}', 'projects')" ondragend="handleCardDragEnd(event)"` : ''}
      onclick="openCertificateModal('${item.id}', 'projects')"
    >
      <div>
        <div class="card-top-meta">
          <span class="owner-badge owner-${item.sister}">
            <span>✦</span> ${item.sisterName}
          </span>
          <span class="year-badge" ${isAdminUnlocked ? 'title="Drag card to another section"' : ''}>${isAdminUnlocked ? '⠿ ' : ''}📅 ${item.year}</span>
        </div>
        <div class="card-category">${item.category}</div>
        <h3 class="card-title">${item.title}</h3>
        <p class="card-desc">${item.description}</p>
        ${renderCardAttachmentSnippet(item)}
      </div>
      <div>
        <div class="card-bottom">
          <span class="award-Result">✨ ${item.result}</span>
          <span class="card-action-link">View Details →</span>
        </div>
        ${renderCardToolbar(item, 'projects')}
      </div>
    </article>
  `).join('');
}

/* Feature 3 & 4: Video Performances & Activity Photo Memories Showcase (Section 05) */
function convertToYouTubeEmbed(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
}

function renderMediaGallery() {
  const container = document.getElementById('media-grid');
  if (!container) return;

  const activeSister = appData.state.activeSister;
  const activeYear = appData.state.activeYear;

  const filtered = sortItemsByYear((appData.mediaGallery || []).filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesYear = activeYear === 'all' || !item.year || String(item.year) === String(activeYear);
    return matchesSister && matchesYear;
  }));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2.5rem; background: var(--surface-card); border-radius: var(--radius-md); border: 1px dashed var(--border-strong); color: var(--text-secondary);">
        ${isAdminUnlocked
          ? 'No video performances or photo memories for this filter yet. Click "+ Add Video / Photo Memory" to showcase recitals, sports, or camp snapshots!'
          : 'No video performances or activity photos recorded for the selected year.'}
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const ytEmbed = convertToYouTubeEmbed(item.videoUrl);
    let mediaBoxHtml = '';
    if (ytEmbed) {
      mediaBoxHtml = `<div class="media-embed-box"><iframe src="${ytEmbed}" title="${item.title}" allowfullscreen loading="lazy"></iframe></div>`;
    } else if (item.photoData) {
      mediaBoxHtml = `<div class="media-embed-box"><img src="${item.photoData}" alt="${item.title}" loading="lazy" /></div>`;
    } else {
      mediaBoxHtml = `<div class="media-embed-box" style="display:flex;align-items:center;justify-content:center;color:#fff;font-size:2rem;">🎬 📸</div>`;
    }

    return `
      <article class="media-card" id="media-card-${item.id}">
        <div>
          ${mediaBoxHtml}
          <div class="media-body">
            <div class="card-top-meta">
              <span class="owner-badge owner-${item.sister}">${item.sisterName}</span>
              <span class="year-badge">📅 ${item.year || '2026'}</span>
            </div>
            <div class="card-category">${item.category || 'Showcase'}</div>
            <h3 class="card-title" style="font-size:1.12rem;">${item.title}</h3>
            <p class="card-desc" style="margin-bottom:0.5rem;">${item.description || ''}</p>
            ${item.videoUrl && !ytEmbed ? `<a href="${item.videoUrl}" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.78rem; margin-top:0.4rem;">🎬 Watch Video Link ↗</a>` : ''}
          </div>
        </div>
        ${isAdminUnlocked ? `
          <div style="padding: 0 1.4rem 1.1rem;">
            <div class="card-toolbar">
              <span style="font-size:0.74rem; color:var(--text-muted); font-weight:600;">📸 Media &amp; Performance</span>
              <div class="card-btn-group">
                <button type="button" class="card-tool-btn btn-del" onclick="deleteMediaItem('${item.id}')" title="Delete this memory">🗑️</button>
              </div>
            </div>
          </div>
        ` : ''}
      </article>
    `;
  }).join('');
}

function openAddMediaModal() {
  if (!isAdminUnlocked) return;
  pendingAttachment = { data: null, type: null, name: null };
  const form = document.getElementById('add-media-form');
  if (form) form.reset();
  const statusEl = document.getElementById('media-file-status');
  if (statusEl) statusEl.innerHTML = '';
  document.getElementById('add-media-modal').classList.add('open');
}

function closeAddMediaModal() {
  document.getElementById('add-media-modal').classList.remove('open');
}

function handleMediaPhotoSelect(event) {
  const file = event.target.files?.[0];
  const statusEl = document.getElementById('media-file-status');
  if (!file) return;
  compressImageFile(file, (compressedUrl) => {
    pendingAttachment = { data: compressedUrl, type: 'image', name: file.name };
    if (statusEl) {
      statusEl.innerHTML = `<span class="file-preview-pill">📸 Photo Ready: ${file.name}</span>`;
    }
  });
}

async function handleAddMediaSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const sister = form.sister.value;
  const sisterMap = {
    noodee: 'Noodee (Sec 3)',
    nadia: 'Nadia (Sec 1)',
    both: 'Noodee & Nadia (Sister Collaboration)'
  };

  const newEntry = {
    id: 'med-' + Date.now(),
    sister: sister,
    sisterName: sisterMap[sister],
    year: form.year.value.trim() || '2026',
    category: form.category.value.trim() || 'Performance & Activity',
    title: form.title.value.trim(),
    description: form.description.value.trim(),
    videoUrl: form.videoUrl.value.trim(),
    photoData: pendingAttachment.data || null
  };

  if (!appData.mediaGallery) appData.mediaGallery = [];
  appData.mediaGallery.unshift(newEntry);
  await savePortfolioData();
  closeAddMediaModal();
  renderMediaGallery();
}

async function deleteMediaItem(id) {
  if (!isAdminUnlocked) return;
  if (!confirm('Remove this video/photo memory?')) return;
  appData.mediaGallery = (appData.mediaGallery || []).filter(x => x.id !== id);
  await savePortfolioData();
  renderMediaGallery();
}

/* Feature 1: Interactive Growth & Milestone Timeline (Section 06) */
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  const activeSister = appData.state.activeSister;
  const activeYear = appData.state.activeYear;

  const combined = [
    ...(appData.awards || []).map(x => ({ ...x, _col: 'awards', _badge: '🏆 Award' })),
    ...(appData.ccas || []).map(x => ({ ...x, _col: 'ccas', _badge: '🌟 CCA' })),
    ...(appData.projects || []).map(x => ({ ...x, _col: 'projects', _badge: '✨ Project' }))
  ].filter(item => {
    const matchesSister = activeSister === 'both' || item.sister === activeSister || item.sister === 'both';
    const matchesYear = activeYear === 'all' || String(item.year || '2026') === String(activeYear);
    return matchesSister && matchesYear;
  });

  const groups = {};
  combined.forEach(item => {
    const yr = String(item.year || '2026').trim();
    if (!groups[yr]) groups[yr] = [];
    groups[yr].push(item);
  });

  const dir = appData.state.yearSort === 'asc' ? 1 : -1;
  const years = Object.keys(groups).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }) * dir);

  if (years.length === 0) {
    container.innerHTML = `<p style="color:var(--text-secondary);">No timeline milestones match the selected filter.</p>`;
    return;
  }

  container.innerHTML = years.map(yr => `
    <div class="timeline-year-group">
      <div class="timeline-year-marker">
        <span>📅 Academic Year ${yr}</span>
        <span style="font-size:0.75rem; opacity:0.85;">(${groups[yr].length} Milestones)</span>
      </div>
      <div class="timeline-items-row">
        ${groups[yr].map(item => `
          <div class="timeline-mini-card" onclick="openCertificateModal('${item.id}', '${item._col}')">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
              <span class="owner-badge owner-${item.sister}">${item.sisterName}</span>
              <span style="font-size:0.72rem; font-weight:700; color:var(--text-muted);">${item._badge} • ${item.category || item.role || ''}</span>
            </div>
            <h4 style="font-family:var(--font-serif); font-size:1.02rem; margin-bottom:0.25rem;">${item.title}</h4>
            <p style="font-size:0.8rem; color:var(--text-secondary);">${item.result || item.schedule || ''}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

/* Feature 6: QR Code Generator for Digital Portfolio Card */
function renderQRCodeCard() {
  const qrImg = document.getElementById('portfolio-qr-img');
  if (!qrImg) return;
  const encodedUrl = encodeURIComponent(PORTFOLIO_PUBLIC_URL);
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&margin=4&data=${encodedUrl}`;
}

function renderAll() {
  renderSectionHeadersAndVisibility();
  renderYearSourcingBar();
  renderHeroCards();
  renderAcademics();
  renderRadarSection();
  renderAwards();
  renderCCAs();
  renderProjects();
  renderMediaGallery();
  renderTimeline();
  renderQRCodeCard();
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
  const list = appData[collectionKey] || [];
  const item = list.find(x => x.id === itemId);
  if (!item) return;

  if (appData.state.editMode) {
    openEditItemModal(itemId, collectionKey);
    return;
  }

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

  let activityPhotosModalHtml = '';
  if (Array.isArray(item.activityPhotos) && item.activityPhotos.length > 0) {
    activityPhotosModalHtml = `
      <div style="margin: 1rem 0; text-align: left;">
        <strong style="display:block; font-size:0.75rem; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.4rem;">📸 Activity &amp; Camp Action Photos</strong>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.6rem;">
          ${item.activityPhotos.map(pUrl => `<img src="${pUrl}" alt="Activity photo" style="width:100%; height:120px; object-fit:cover; border-radius:8px; border:1px solid var(--border-subtle);" />`).join('')}
        </div>
      </div>
    `;
  }

  let videoEmbedHtml = '';
  const ytEmbed = convertToYouTubeEmbed(item.videoUrl);
  if (ytEmbed) {
    videoEmbedHtml = `
      <div class="media-embed-box" style="border-radius:10px; margin: 1rem 0;">
        <iframe src="${ytEmbed}" title="${item.title} Video" allowfullscreen></iframe>
      </div>
    `;
  } else if (item.videoUrl) {
    videoEmbedHtml = `
      <div style="margin-bottom: 1rem;">
        <a href="${item.videoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="font-size:0.82rem;">
          🎬 Watch Performance / Activity Video ↗
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

  const headingText = item.result || item.schedule || 'Certificate of Achievement';
  const descText = item.description || item.detail || '';
  const catText = item.category || item.role || 'Co-Curricular';

  content.innerHTML = `
    <div class="modal-header">
      <div>
        <span class="owner-badge owner-${item.sister}" style="margin-bottom: 0.5rem;">${item.sisterName} • ${item.year || '2026'}</span>
        <h3 style="font-family: var(--font-serif); font-size: 1.5rem;">${item.title}</h3>
      </div>
      <button type="button" class="modal-close" onclick="closeDetailModal()" aria-label="Close modal">✕</button>
    </div>

    <div class="certificate-preview">
      <div class="cert-school">Anglo Singapore International School • Portfolio Record</div>
      <div class="cert-heading">${headingText}</div>
      <div class="cert-recipient">Awarded to ${item.sisterName}</div>
      <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.25rem;">
        ${descText}
      </p>

      ${attachmentViewerHtml}
      ${videoEmbedHtml}
      ${activityPhotosModalHtml}
      ${externalLinkHtml}

      <div class="cert-meta-grid">
        <div>
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Issuing Organization</strong>
          <span>${item.issuer || 'Anglo Singapore International School'}</span>
        </div>
        <div>
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Academic Year &amp; Category</strong>
          <span>${item.year || '2026'} • ${catText}</span>
        </div>
        <div style="grid-column: 1 / -1;">
          <strong style="display:block; font-size:0.74rem; color:var(--text-muted); text-transform:uppercase;">Key Competencies Demonstrated</strong>
          <span>${item.skills || 'Academic Excellence, Critical Thinking, Presentation'}</span>
        </div>
      </div>
    </div>

    ${isAdminUnlocked ? `
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" style="font-size: 0.82rem;" onclick="closeDetailModal(); openEditItemModal('${item.id}', '${collectionKey}')">
            ✎ Edit Text / Move Section
          </button>
          <label class="btn btn-outline" style="font-size: 0.8rem; cursor: pointer;">
            📎 Replace Certificate
            <input type="file" accept="image/*,.pdf,application/pdf" style="display:none" onchange="attachFileToExistingItem('${item.id}', '${collectionKey}', event)" />
          </label>
          <label class="btn btn-outline" style="font-size: 0.8rem; cursor: pointer;">
            📸 + Add Action Photos
            <input type="file" accept="image/*" multiple style="display:none" onchange="attachActivityPhotosToExistingItem('${item.id}', '${collectionKey}', event)" />
          </label>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn btn-outline" style="color: hsl(0, 65%, 45%); border-color: hsl(0, 50%, 82%); font-size: 0.8rem;" onclick="deletePortfolioItem('${item.id}', '${collectionKey}')">
            🗑️ Delete
          </button>
          <button type="button" class="btn btn-outline" onclick="closeDetailModal()">Close</button>
        </div>
      </div>
    ` : `
      <div style="display: flex; justify-content: flex-end;">
        <button type="button" class="btn btn-outline" onclick="closeDetailModal()">Close</button>
      </div>
    `}
  `;

  modal.classList.add('open');
}

function closeDetailModal() {
  document.getElementById('detail-modal').classList.remove('open');
}

function openAddModal(defaultSection = 'awards') {
  if (!isAdminUnlocked) return;
  editingItemContext = null;
  pendingAttachment = { data: null, type: null, name: null };
  pendingActivityPhotos = [];

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
  const actPreviewEl = document.getElementById('activity-photos-status');
  if (actPreviewEl) actPreviewEl.innerHTML = '';

  updateCategoryDatalist();
  document.getElementById('add-modal').classList.add('open');
}

function openEditItemModal(itemId, collectionKey) {
  if (!isAdminUnlocked) return;
  const list = appData[collectionKey] || [];
  const item = list.find(x => x.id === itemId);
  if (!item) return;

  editingItemContext = { id: itemId, collectionKey: collectionKey };
  pendingAttachment = {
    data: item.attachmentData || null,
    type: item.attachmentType || null,
    name: item.attachmentName || null
  };
  pendingActivityPhotos = Array.isArray(item.activityPhotos) ? [...item.activityPhotos] : [];

  const form = document.getElementById('add-achievement-form');
  if (!form) return;

  document.getElementById('add-modal-title').innerText = '✎ Edit Item / Move Section';
  document.getElementById('btn-submit-achievement').innerText = '✓ Save Changes';

  form.sister.value = item.sister || 'noodee';
  form.sectionType.value = collectionKey;
  handleSectionTypeChange(collectionKey);

  if (collectionKey === 'ccas') {
    form.category.value = item.role || item.category || '';
    form.year.value = item.year || '2026';
    form.title.value = item.title || '';
    form.result.value = item.schedule || item.result || '';
    form.issuer.value = item.icon || '🌟';
    form.description.value = item.detail || item.description || '';
    form.skills.value = item.skills || '';
    if (form.externalLink) form.externalLink.value = item.externalLink || '';
    if (form.videoUrl) form.videoUrl.value = item.videoUrl || '';
  } else {
    form.category.value = item.category || item.role || '';
    form.year.value = item.year || '2026';
    form.title.value = item.title || '';
    form.result.value = item.result || item.schedule || '';
    form.issuer.value = item.issuer || '';
    form.description.value = item.description || item.detail || '';
    form.skills.value = item.skills || '';
    if (form.externalLink) form.externalLink.value = item.externalLink || '';
    if (form.videoUrl) form.videoUrl.value = item.videoUrl || '';
  }

  const previewEl = document.getElementById('attachment-file-status');
  if (previewEl) {
    if (pendingAttachment.data) {
      previewEl.innerHTML = `<span class="file-preview-pill">📎 Current certificate attached (${pendingAttachment.name || pendingAttachment.type})</span>`;
    } else {
      previewEl.innerHTML = '';
    }
  }

  const actPreviewEl = document.getElementById('activity-photos-status');
  if (actPreviewEl) {
    if (pendingActivityPhotos.length > 0) {
      actPreviewEl.innerHTML = `<span class="file-preview-pill">📸 ${pendingActivityPhotos.length} Action Photo(s) attached</span>`;
    } else {
      actPreviewEl.innerHTML = '';
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
    if (resLabel) resLabel.innerText = 'Schedule / Achievement / Duration';
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

function handleActivityPhotosSelect(event) {
  const files = Array.from(event.target.files || []);
  const statusEl = document.getElementById('activity-photos-status');
  if (!files.length) return;

  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      compressImageFile(file, (compressedUrl) => {
        pendingActivityPhotos.push(compressedUrl);
        if (statusEl) {
          statusEl.innerHTML = `<span class="file-preview-pill">📸 ${pendingActivityPhotos.length} Action Photo(s) Ready</span>`;
        }
      });
    }
  });
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

function attachActivityPhotosToExistingItem(itemId, collectionKey, event) {
  const files = Array.from(event.target.files || []);
  if (!files.length) return;
  const list = appData[collectionKey] || [];
  const item = list.find(x => x.id === itemId);
  if (!item) return;
  if (!Array.isArray(item.activityPhotos)) item.activityPhotos = [];

  let processed = 0;
  files.forEach(file => {
    if (file.type.startsWith('image/')) {
      compressImageFile(file, async (compressedUrl) => {
        item.activityPhotos.push(compressedUrl);
        processed++;
        if (processed === files.length) {
          await savePortfolioData();
          renderAll();
          openCertificateModal(itemId, collectionKey);
        }
      });
    }
  });
}

async function deletePortfolioItem(itemId, collectionKey) {
  if (!isAdminUnlocked) return;
  if (!confirm('Remove this item from the portfolio?')) return;
  appData[collectionKey] = (appData[collectionKey] || []).filter(x => x.id !== itemId);
  await savePortfolioData();
  closeDetailModal();
  renderAll();
}

async function handleAddAchievement(event) {
  event.preventDefault();
  if (!isAdminUnlocked) return;
  const form = event.target;
  const sectionType = form.sectionType.value; // 'awards' | 'ccas' | 'projects'
  const sister = form.sister.value;
  const sisterMap = {
    noodee: 'Noodee (Sec 3)',
    nadia: 'Nadia (Sec 1)',
    both: 'Noodee & Nadia (Sister Collaboration)'
  };

  let itemId = 'custom-' + Date.now();
  let originalIndex = -1;
  let sameCollection = false;

  if (editingItemContext) {
    itemId = editingItemContext.id;
    const oldCol = editingItemContext.collectionKey;
    sameCollection = (oldCol === sectionType);
    const oldList = appData[oldCol] || [];
    originalIndex = oldList.findIndex(x => x.id === itemId);
    if (originalIndex !== -1) {
      oldList.splice(originalIndex, 1);
    }
  }

  let newEntry;
  if (sectionType === 'ccas') {
    const iconVal = form.issuer.value.trim();
    newEntry = {
      id: itemId,
      sister: sister,
      sisterName: sisterMap[sister],
      year: form.year.value.trim() || '2026',
      icon: (iconVal && iconVal.length <= 4) ? iconVal : '🌟',
      issuer: (iconVal && iconVal.length > 4) ? iconVal : 'Anglo Singapore International School',
      role: form.category.value.trim() || 'Member',
      category: form.category.value.trim() || 'Co-Curricular',
      title: form.title.value.trim(),
      detail: form.description.value.trim(),
      description: form.description.value.trim(),
      schedule: form.result.value.trim() || `${form.year.value.trim() || '2026'} • Anglo Singapore CCA`,
      result: form.result.value.trim() || 'Active Member',
      skills: form.skills.value.trim() || 'Leadership & Teamwork',
      attachmentData: pendingAttachment.data,
      attachmentType: pendingAttachment.type,
      attachmentName: pendingAttachment.name,
      activityPhotos: pendingActivityPhotos,
      videoUrl: form.videoUrl ? form.videoUrl.value.trim() : '',
      externalLink: form.externalLink ? form.externalLink.value.trim() : ''
    };
  } else {
    const customCategory = form.category.value.trim() || 'Academic Honours';
    newEntry = {
      id: itemId,
      sister: sister,
      sisterName: sisterMap[sister],
      year: form.year.value.trim() || '2026',
      category: customCategory,
      role: customCategory,
      title: form.title.value.trim(),
      result: form.result.value.trim(),
      schedule: form.result.value.trim(),
      issuer: form.issuer.value.trim() || 'Anglo Singapore International School',
      description: form.description.value.trim(),
      detail: form.description.value.trim(),
      skills: form.skills.value.trim() || 'Academic & Co-Curricular Excellence',
      attachmentData: pendingAttachment.data,
      attachmentType: pendingAttachment.type,
      attachmentName: pendingAttachment.name,
      activityPhotos: pendingActivityPhotos,
      videoUrl: form.videoUrl ? form.videoUrl.value.trim() : '',
      externalLink: form.externalLink ? form.externalLink.value.trim() : ''
    };
  }

  if (!appData[sectionType]) appData[sectionType] = [];
  if (sameCollection && originalIndex !== -1) {
    appData[sectionType].splice(originalIndex, 0, newEntry);
  } else {
    appData[sectionType].unshift(newEntry);
  }

  await savePortfolioData();
  form.reset();
  pendingAttachment = { data: null, type: null, name: null };
  pendingActivityPhotos = [];
  editingItemContext = null;
  closeAddModal();
  renderAll();
}

/* Inline Editing & Custom Avatar Upload */
async function toggleEditMode() {
  if (!isAdminUnlocked) {
    openParentLoginModal();
    return;
  }
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
  if (!isAdminUnlocked || !appData.sisters[sisterId]) return;
  appData.sisters[sisterId][field] = value.trim();
  savePortfolioData();
}

function updateStat(sisterId, idx, field, value) {
  if (!isAdminUnlocked || !appData.sisters[sisterId]?.stats[idx]) return;
  appData.sisters[sisterId].stats[idx][field] = value.trim();
  savePortfolioData();
}

function updateInterestTag(sisterId, idx, value) {
  if (!isAdminUnlocked || !appData.sisters[sisterId]?.interests) return;
  appData.sisters[sisterId].interests[idx] = value.trim();
  savePortfolioData();
}

function removeInterestTag(sisterId, idx) {
  if (!isAdminUnlocked || !appData.sisters[sisterId]?.interests) return;
  appData.sisters[sisterId].interests.splice(idx, 1);
  savePortfolioData();
  renderHeroCards();
}

function addInterestTag(sisterId) {
  if (!isAdminUnlocked) return;
  const newTag = prompt('Enter new interest or skill tag:');
  if (!newTag || !newTag.trim()) return;
  appData.sisters[sisterId].interests.push(newTag.trim());
  savePortfolioData();
  renderHeroCards();
}

function updateSubject(sisterId, idx, field, value) {
  if (!isAdminUnlocked || !appData.sisters[sisterId]?.subjects[idx]) return;
  appData.sisters[sisterId].subjects[idx][field] = value.trim();
  savePortfolioData();
}

function addSubject(sisterId) {
  if (!isAdminUnlocked) return;
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
  if (!isAdminUnlocked) return;
  if (!confirm('Remove this subject?')) return;
  appData.sisters[sisterId].subjects.splice(idx, 1);
  savePortfolioData();
  renderAcademics();
}

function updateLanguage(sisterId, idx, field, value) {
  if (!isAdminUnlocked || !appData.sisters[sisterId]?.languages[idx]) return;
  appData.sisters[sisterId].languages[idx][field] = value.trim();
  savePortfolioData();
}

function handleAvatarUpload(sisterId, event) {
  if (!isAdminUnlocked) return;
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
  if (!isAdminUnlocked) return;
  const dataStr = JSON.stringify({
    updatedAt: Date.now(),
    sectionVisibility: appData.sectionVisibility,
    sectionHeaders: appData.sectionHeaders,
    sisters: appData.sisters,
    awards: appData.awards,
    ccas: appData.ccas,
    projects: appData.projects,
    mediaGallery: appData.mediaGallery
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
  if (!isAdminUnlocked) return;
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
  if (!isAdminUnlocked) return;
  if (confirm('Reset local changes on this browser back to the latest published version on GitHub?')) {
    await clearIDB();
    localStorage.removeItem('noodee_nadia_portfolio_v2');
    document.body.classList.remove('edit-mode');
    hasUnsyncedChanges = false;
    updateSyncButtonBadge();
    await initializePortfolioData();
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await initializePortfolioData();

  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });

  // Optional shortcut: visiting ?admin=1 opens the Parent Login verification modal (never auto-unlocks)
  const params = new URLSearchParams(window.location.search);
  if (params.get('admin') === '1') {
    openParentLoginModal();
  }
});
