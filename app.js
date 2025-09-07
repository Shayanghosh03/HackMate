const sampleSkills = [
  "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Svelte",
  "Node.js", "Express", "Python", "Django", "Flask", "FastAPI",
  "Go", "Rust", "Java", "Spring", "Kotlin", "Swift",
  "MongoDB", "PostgreSQL", "MySQL", "SQLite", "Redis",
  "Tailwind CSS", "CSS", "HTML", "GraphQL", "REST API",
  "AWS", "GCP", "Azure", "Docker", "Kubernetes",
  "Machine Learning", "Deep Learning", "NLP", "Data Science",
  "Figma", "UI/UX", "Product Design", "Project Management"
];

// Brand logos for skills (Devicon & Simple Icons CDNs)
const skillIconUrls = {
  "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "React": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Vue": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  "Svelte": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Express": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "Django": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "Flask": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  "FastAPI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  "Rust": "https://cdn.simpleicons.org/rust/DEA584",
  "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "Spring": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  "Swift": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  "MongoDB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "PostgreSQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "MySQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "SQLite": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "Redis": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "Tailwind CSS": "https://cdn.simpleicons.org/tailwindcss/06B6D4",
  "CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "HTML": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "GraphQL": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "REST API": "https://cdn.simpleicons.org/postman",
  "AWS": "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg",
  "GCP": "https://cdn.simpleicons.org/googlecloud/4285F4",
  "Azure": "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg",
  "Docker": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Kubernetes": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  // Broader categories mapped to well-known tools
  "Machine Learning": "https://cdn.simpleicons.org/scikitlearn",
  "Deep Learning": "https://cdn.simpleicons.org/tensorflow",
  "NLP": "https://cdn.simpleicons.org/spacy",
  "Data Science": "https://cdn.simpleicons.org/pandas",
  "Figma": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  "UI/UX": "https://www.vectorlogo.zone/logos/adobe_xd/adobe_xd-icon.svg",
  "Product Design": "https://cdn.simpleicons.org/sketch",
  "Project Management": "https://cdn.simpleicons.org/trello"
};

function getSkillIconHTML(skill) {
  const url = skillIconUrls[skill];
  // Fallback chains for brands that sometimes block/redirect
  const altChains = {
    'AWS': [ 'https://cdn.simpleicons.org/amazonwebservices/FF9900' ],
    'Azure': [ 'https://cdn.simpleicons.org/microsoftazure/0078D4' ],
    'UI/UX': [ 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg', 'https://cdn.simpleicons.org/adobexd/FF61F6' ]
  };
  if (url) {
    const fallbacks = altChains[skill] ? altChains[skill].join('|') : '';
    const onerr = fallbacks
      ? `onerror="(function(img){var f=img.getAttribute('data-fallback');if(!f)return;var a=f.split('|');img.onerror=null;img.src=a.shift();img.setAttribute('data-fallback',a.join('|'));})(this)"`
      : '';
    return `<img src="${url}" alt="${skill} logo" loading="lazy" ${fallbacks?`data-fallback='${fallbacks}'`:''} ${onerr}>`;
  }
  // Fallback: small inline code-bracket glyph
  return `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 4, 3 12, 8 20"></polyline><polyline points="16 4, 21 12, 16 20"></polyline></svg>`;
}

const sampleProfiles = [
  {
    id: "p1",
    name: "Aisha Khan",
    email: "aisha@example.com",
    organization: "IIT Delhi",
    location: "Delhi, IN",
    linkedin: "",
    github: "",
    skills: ["React", "Node.js", "Tailwind CSS", "PostgreSQL"],
    readme: "Front-end focused full-stack dev. Loves building polished UX."
  },
  {
    id: "p2",
    name: "Rahul Mehta",
    email: "rahul@example.com",
    organization: "BITS Pilani",
    location: "Hyderabad, IN",
    linkedin: "",
    github: "",
    skills: ["Python", "FastAPI", "MongoDB", "Docker"],
    readme: "Backend engineer with API and data modeling expertise."
  },
  {
    id: "p3",
    name: "Sara Lee",
    email: "sara@example.com",
    organization: "NUS",
    location: "Singapore",
    linkedin: "",
    github: "",
    skills: ["Machine Learning", "NLP", "Python", "AWS"],
    readme: "ML practitioner focusing on NLP and model serving."
  }
];

const sampleTeams = [
  {
    id: "t1",
    name: "Dev Dynamos",
    lookingFor: ["React", "Tailwind CSS"],
    location: "Remote",
    description: "Frontend help for realtime collab tool.",
    members: ["Akash", "Meera"]
  },
  {
    id: "t2",
    name: "Data Sprinters",
    lookingFor: ["FastAPI", "PostgreSQL"],
    location: "Bengaluru, IN",
    description: "Need backend lead to scale APIs.",
    members: ["Liang", "Pooja", "Tom"]
  },
  {
    id: "t3",
    name: "Visioneers",
    lookingFor: ["Machine Learning", "AWS"],
    location: "Remote",
    description: "Computer vision app for accessibility.",
    members: ["Chloe"]
  }
];

// ---- API integration ----
const API_BASE = (window.API_BASE || 'https://hackmate-rgv7.onrender.com');
// Socket.IO client (lazy)
let socket = null;
let windowFocused = true;
window.addEventListener('focus', () => { windowFocused = true; });
window.addEventListener('blur', () => { windowFocused = false; });
const unreadByRoom = new Map();
// Track recent sent messages per room to avoid double-adding when server echoes
const recentSent = new Map(); // roomId -> [{ text, ts }]
function rememberSent(roomId, text, ts) {
  try {
    const list = recentSent.get(roomId) || [];
    list.push({ text, ts });
    const now = Date.now();
    const trimmed = list.filter(it => now - it.ts < 12000).slice(-10);
    recentSent.set(roomId, trimmed);
  } catch {}
}
function wasRecentlySent(roomId, text, ts) {
  try {
    const list = recentSent.get(roomId) || [];
    const idx = list.findIndex(it => it.text === text && Math.abs((ts || Date.now()) - it.ts) < 12000);
    if (idx >= 0) { list.splice(idx, 1); recentSent.set(roomId, list); return true; }
    return false;
  } catch { return false; }
}

function isChatOpenForRoom(roomId) {
  try {
    const modal = document.getElementById('chatModal');
    if (!modal || modal.classList.contains('hidden')) return false;
    const ctx = state.chatContext;
    if (!ctx) return false;
    const cur = `${ctx.type}:${ctx.targetId}`;
    return cur === roomId;
  } catch { return false; }
}

function requestNotifyPermission() {
  try {
    if (!('Notification' in window)) return;
    if (Notification.permission === 'default') {
      Notification.requestPermission().catch(()=>{});
    }
  } catch {}
}

function badgeForRoom(roomId) {
  try {
    const parts = String(roomId || '').split(':');
    if (parts.length < 2) return null;
    const [type, id] = parts;
    return document.querySelector(`[data-action="chat"][data-type="${type}"][data-id="${id}"]`);
  } catch { return null; }
}

function setUnread(roomId, count) {
  try {
    if (!roomId) return;
    if (count <= 0) unreadByRoom.delete(roomId); else unreadByRoom.set(roomId, count);
    const btn = badgeForRoom(roomId);
    if (!btn) return;
    let b = btn.querySelector('.badge-unread');
    if (count > 0) {
      if (!b) {
        b = document.createElement('span');
        b.className = 'badge-unread absolute -top-2 -right-2 rounded-full bg-rose-500 text-white text-[10px] leading-none px-1.5 py-0.5 border border-white/20 shadow';
        btn.appendChild(b);
      }
      b.textContent = String(count);
    } else if (b) {
      b.remove();
    }
  } catch {}
}

function incUnread(roomId) {
  const c = unreadByRoom.get(roomId) || 0;
  setUnread(roomId, c + 1);
}

function getPref(key, defVal) { try { const v = localStorage.getItem(key); if (v == null) return defVal; return v === '1'; } catch { return defVal; } }
function setPref(key, val) { try { localStorage.setItem(key, val ? '1' : '0'); } catch {} }

function showBrowserNotification({ title, body, tag }) {
  try {
  if (!getPref('hm_notify_enabled', true)) return false;
    if (!('Notification' in window)) return false;
    if (Notification.permission !== 'granted') return false;
    const n = new Notification(title || 'New message', { body: body || '', tag: tag || undefined });
    n.onclick = () => { try { window.focus(); } catch {} };
    return true;
  } catch { return false; }
}

function ensureToastContainer() {
  let c = document.getElementById('toastContainer');
  if (!c) {
    c = document.createElement('div');
    c.id = 'toastContainer';
    c.className = 'fixed right-4 bottom-4 z-[60] space-y-2';
    document.body.appendChild(c);
  }
  return c;
}

function showToast(msg) {
  try {
    const c = ensureToastContainer();
    const t = document.createElement('div');
    t.className = 'rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm text-white shadow';
    t.style.transition = 'opacity .25s ease';
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(()=> t.remove(), 260); }, 3500);
  } catch {}
}

function beep() {
  try {
  if (!getPref('hm_sound_enabled', true)) return;
    const Ctx = window.AudioContext || window.webkitAudioContext; if (!Ctx) return;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine'; o.frequency.value = 880; // A5
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
    o.start(); o.stop(ctx.currentTime + 0.2);
  } catch {}
}

function getSocket() {
  if (socket) return socket;
  try {
    if (typeof io === 'undefined') {
      console.error('[chat] Socket.IO client not loaded');
      return null;
    }
  const CHAT_BASE = (typeof window !== 'undefined' && window.CHAT_BASE) ? window.CHAT_BASE : API_BASE;
  try { console.log('[chat] connecting to', CHAT_BASE); } catch {}
    socket = io(CHAT_BASE, { transports: ['websocket', 'polling'] });
    socket.on('connect', () => { try { console.log('[chat] connected', socket.id); } catch {} });
    socket.on('connect_error', (e) => { try { console.error('[chat] connect_error', e && e.message); } catch {} });
    socket.on('disconnect', (r) => { try { console.warn('[chat] disconnected', r); } catch {} });
  } catch (e) { try { console.error('[chat] socket create error', e); } catch {} }
  return socket;
}
function getToken() { try { return localStorage.getItem('hm_token') || ''; } catch { return ''; } }
function setAuth(token, user) { try { if (token) localStorage.setItem('hm_token', token); if (user) localStorage.setItem('hm_user', JSON.stringify(user)); } catch {} }
async function apiFetch(path, opts = {}) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...opts, headers });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).message || res.statusText);
  return res.json();
}

let remoteProfiles = null;
let remoteTeams = null;

async function loadRemoteData() {
  try {
    const [users, teams] = await Promise.all([
      apiFetch('/api/users').catch(() => null),
      apiFetch('/api/teams').catch(() => null),
    ]);
    if (Array.isArray(users)) {
      remoteProfiles = users.map((u) => ({
        id: String(u._id || u.id || u.email),
        name: u.name,
        email: u.email,
        organization: u.organization || '',
        location: typeof u.location === 'string' ? u.location : '',
        linkedin: u.linkedin || '',
        github: u.github || '',
        skills: u.skills || [],
        readme: u.bio || ''
      }));
    }
    if (Array.isArray(teams)) {
      remoteTeams = teams.map((t) => ({
        id: t.id || t._id,
        name: t.name,
        lookingFor: t.lookingFor || [],
        location: t.location || 'Remote',
        description: t.description || '',
        members: Array.isArray(t.members) ? t.members.map(m => m.name || 'Member') : []
      }));
    }
  } catch {}
}

function getProfiles() { return remoteProfiles && remoteProfiles.length ? remoteProfiles : sampleProfiles; }
function getTeams() { return remoteTeams && remoteTeams.length ? remoteTeams : sampleTeams; }

const state = {
  tab: "teammate",
  selectedSkills: new Set(),
  locationFilter: "",
  chatContext: null,
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function init() {
  // Perf: simple runtime signal for slow devices; can be overridden by localStorage
  try {
    const userPref = localStorage.getItem('hm_perf_low');
    const low = userPref === '1' || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    if (low) document.documentElement.classList.add('perf-low');
  } catch {}

  bindTabs();
  bindFilters();
  bindNavLinks();
  bindSearchPanel();
  bindTeamFinder();
  // Defer non-critical work to next frames to keep first paint smooth
  requestIdleCallbackSafe(() => renderSkills());
  setupDM();
  // Load data without blocking render
  loadRemoteData().finally(() => {
    requestAnimationFrame(() => {
      applyFilters();
      renderSuggestions();
      setupScrollReveal();
    });
  });
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Start hero typewriter after first frame
  requestAnimationFrame(() => startTypewriter());
}

function requestIdleCallbackSafe(cb) {
  if ('requestIdleCallback' in window) return window.requestIdleCallback(cb, { timeout: 300 });
  return setTimeout(cb, 0);
}

function bindTabs() {
  const tabTeammate = $("#tabTeammate");
  const tabTeam = $("#tabTeam");
  tabTeammate.addEventListener("click", () => {
    state.tab = "teammate";
    tabTeammate.classList.add("active");
    tabTeam.classList.remove("active");
    applyFilters();
  });
  tabTeam.addEventListener("click", () => {
    state.tab = "team";
    tabTeam.classList.add("active");
    tabTeammate.classList.remove("active");
    applyFilters();
  });
}

function bindFilters() {
  $("#skillSearch").addEventListener("input", renderSkills);
  $("#locationFilter").addEventListener("input", (e) => {
    state.locationFilter = e.target.value.toLowerCase();
    applyFilters();
  });
}

function bindNavLinks() {
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const hash = a.getAttribute('href');
      if (!hash || hash === '#') return;
      if (hash === '#search') {
        e.preventDefault();
        showSearchPanel();
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', hash);
        return;
      }
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', hash);
      }
    });
  });
}
// ---------- Team Finder (simple localStorage demo) ----------
function bindTeamFinder() {
  const form = document.getElementById('teamFinderForm');
  const list = document.getElementById('teamFinderList');
  const empty = document.getElementById('teamFinderEmpty');
  if (!form || !list) return;

  function getEntries() {
    try { return JSON.parse(localStorage.getItem('hm_team_finder') || '[]'); } catch { return []; }
  }
  function setEntries(arr) {
    localStorage.setItem('hm_team_finder', JSON.stringify(arr));
  }
  function render() {
    const entries = getEntries();
    list.innerHTML = '';
    empty.classList.toggle('hidden', entries.length > 0);
    entries.forEach((e, i) => {
      const card = document.createElement('article');
      card.className = 'card reveal in-view';
      card.style.setProperty('--reveal-delay', `${Math.min(i * 60, 360)}ms`);
  const rid = `tf-${String(e.name||'anon').toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;
  card.innerHTML = `
        <div class="card-body">
          <div class="flex items-start justify-between gap-3">
            <div>
              <h4 class="font-semibold">${e.name}</h4>
              <p class="text-xs text-slate-400">${e.availability || '—'}</p>
            </div>
            <span class="badge">Candidate</span>
          </div>
          <p class="mt-3 text-sm text-slate-300"><strong>Skills:</strong> ${e.skills || '—'}</p>
          ${e.interests ? `<p class="mt-2 text-sm text-slate-300"><strong>Interests:</strong> ${e.interests}</p>` : ''}
          <div class="mt-4 flex items-center justify-end gap-2">
            <button data-idx="${i}" class="rounded-md bg-rose-500/20 px-3 py-1.5 text-sm text-rose-200 hover:bg-rose-500/30" data-action="delete">Remove</button>
          </div>
        </div>`;
      // No DM button for local-only candidate entries
      card.querySelector('[data-action="delete"]').addEventListener('click', () => {
        const cur = getEntries();
        cur.splice(i, 1);
        setEntries(cur);
        render();
      });
      list.appendChild(card);
    });
  }

  // initial render
  render();

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const entry = {
      name: document.getElementById('tfName').value.trim(),
      skills: document.getElementById('tfSkills').value.trim(),
      interests: document.getElementById('tfInterests').value.trim(),
      availability: document.getElementById('tfAvailability').value,
    };
    if (!entry.name || !entry.skills) return;

    const token = getToken();
    if (token) {
      try {
        await apiFetch('/api/teams', {
          method: 'POST',
          body: JSON.stringify({
            name: entry.name,
            description: entry.interests,
            location: 'Remote',
            lookingFor: entry.skills.split(',').map(s=>s.trim()).filter(Boolean)
          })
        });
        // refresh remote teams on success
        remoteTeams = await apiFetch('/api/teams').catch(() => remoteTeams);
      } catch {
        // fallback to local entry list on failure
        const entries = getEntries(); entries.unshift(entry); setEntries(entries);
      }
    } else {
      // not logged in: keep local-only demo
      const entries = getEntries(); entries.unshift(entry); setEntries(entries);
    }

    form.reset();
    render();
    applyFilters();
    const section = document.getElementById('team-finder');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  const clearBtn = document.getElementById('tfClear');
  clearBtn?.addEventListener('click', () => {
    localStorage.removeItem('hm_team_finder');
    render();
  });
}

function bindSearchPanel() {
  const closeBtn = document.getElementById('closeSearchPanel');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      hideSearchPanel();
      const home = document.getElementById('home');
      if (home) home.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', '#home');
    });
  }
}

function showSearchPanel() {
  const section = document.getElementById('search');
  if (!section) return;
  section.classList.remove('hidden');
  // Ensure tabs are bound/active and results render
  applyFilters();
  const input = document.getElementById('skillSearch');
  if (input) input.focus();
}

function hideSearchPanel() {
  const section = document.getElementById('search');
  if (!section) return;
  section.classList.add('hidden');
}

function renderSkills() {
  const list = $("#skillsList");
  const term = $("#skillSearch").value.toLowerCase();
  // Perf: reuse and build in a fragment to avoid layout thrash
  const frag = document.createDocumentFragment();
  list.textContent = "";
  sampleSkills
    .filter((s) => s.toLowerCase().includes(term))
    .slice(0, 40) // cap to 40 to keep DOM light
    .forEach((skill) => {
      const item = document.createElement("div");
      item.className = "skill-item";
      const checked = state.selectedSkills.has(skill);
    item.innerHTML = `
        <div class="skill-left">
      <div class="skill-icon" aria-hidden="true">${getSkillIconHTML(skill)}</div>
          <span>${skill}</span>
        </div>
        <button class="skill-check ${checked ? 'selected' : ''}" aria-label="${checked ? 'Deselect' : 'Select'} ${skill}">✓</button>
      `;
      item.querySelector('.skill-check').addEventListener("click", (e) => { e.stopPropagation(); toggleSkill(skill); });
      item.addEventListener("click", () => toggleSkill(skill));
      frag.appendChild(item);
    });
  list.appendChild(frag);
  renderSelectedChips();
}

function toggleSkill(skill) {
  if (state.selectedSkills.has(skill)) state.selectedSkills.delete(skill);
  else state.selectedSkills.add(skill);
  renderSkills();
  applyFilters();
}

function renderSelectedChips() {
  const container = $("#selectedSkills");
  container.innerHTML = "";
  if (state.selectedSkills.size === 0) {
    const hint = document.createElement("p");
    hint.className = "text-xs text-slate-400";
    hint.textContent = "No skills selected";
    container.appendChild(hint);
    return;
  }
  [...state.selectedSkills].forEach((skill) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.innerHTML = `${skill} <button aria-label="Remove ${skill}">✕</button>`;
    chip.querySelector("button").addEventListener("click", () => {
      state.selectedSkills.delete(skill);
      renderSkills();
      applyFilters();
    });
    container.appendChild(chip);
  });
}

function applyFilters() {
  const resultsGrid = $("#resultsGrid");
  const emptyState = $("#emptyState");
  // Perf: avoid large innerHTML churn; reuse grid element content via textContent reset
  resultsGrid.textContent = "";

  const skills = [...state.selectedSkills];
  const hasSkills = (arr) => skills.every((s) => arr.includes(s));

  if (state.tab === "teammate") {
    const filtered = (remoteProfiles && remoteProfiles.length ? remoteProfiles : sampleProfiles).filter((p) =>
      (!state.locationFilter || String(p.location || '').toLowerCase().includes(state.locationFilter)) &&
      (skills.length === 0 || hasSkills(p.skills))
    );
    filtered.forEach((p) => resultsGrid.appendChild(renderProfileCard(p)));
    emptyState.classList.toggle("hidden", filtered.length !== 0);
  } else {
    const filtered = (remoteTeams && remoteTeams.length ? remoteTeams : sampleTeams).filter((t) =>
      (!state.locationFilter || t.location.toLowerCase().includes(state.locationFilter)) &&
      (skills.length === 0 || hasSkills(t.lookingFor))
    );
    filtered.forEach((t) => resultsGrid.appendChild(renderTeamCard(t)));
    emptyState.classList.toggle("hidden", filtered.length !== 0);
  }

  // Stagger animation for newly rendered cards if grid is visible
  try { staggerGridReveal(resultsGrid); } catch {}
  // Reapply unread badges after rendering (buttons may have been recreated)
  // DM-only: no passive joins or unread badge handling here
}

function renderSuggestions() {
  const grid = document.getElementById('suggestionsGrid');
  if (!grid) return;
  grid.textContent = '';
  (remoteProfiles && remoteProfiles.length ? remoteProfiles : sampleProfiles).slice(0, 3).forEach((p) => grid.appendChild(renderProfileCard(p)));
}

function renderProfileCard(p) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-body">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500 grid place-items-center text-slate-900">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12 12c2.761 0 5-2.462 5-5.5S14.761 1 12 1 7 3.462 7 6.5 9.239 12 12 12zm0 2c-4.418 0-8 2.91-8 6.5 0 .828.672 1.5 1.5 1.5h13c.828 0 1.5-.672 1.5-1.5 0-3.59-3.582-6.5-8-6.5z"/>
            </svg>
          </div>
          <div>
            <h4 class="font-semibold">${p.name}</h4>
            <p class="text-xs text-slate-400">${[p.organization, p.location].filter(Boolean).join(' • ')}</p>
          </div>
        </div>
        <span class="badge">Profile</span>
      </div>
      <p class="mt-3 text-sm text-slate-300">${p.readme}</p>
      <div class="mt-3 flex flex-wrap gap-2">
        ${p.skills.map((s) => `<span class="badge">${s}</span>`).join("")}
      </div>
      <div class="mt-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <a href="mailto:${p.email}" class="text-xs text-cyan-300 hover:underline">${p.email}</a>
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="text-xs text-cyan-300 hover:underline">GitHub</a>` : ''}
          ${p.linkedin ? `<a href="${p.linkedin}" target="_blank" rel="noopener" class="text-xs text-cyan-300 hover:underline">LinkedIn</a>` : ''}
        </div>
        <button class="relative rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/15" data-action="chat" data-type="profile" data-id="${p.id}" data-name="${p.name}">Chat</button>
      </div>
    </div>
  `;
  card.querySelector('[data-action="chat"]').addEventListener("click", () => openDM(p.id, p.name));
  return card;
}

function renderTeamCard(t) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="card-body">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h4 class="font-semibold">${t.name}</h4>
          <p class="text-xs text-slate-400">${t.location} • ${t.members.length} member${t.members.length>1?"s":""}</p>
        </div>
        <span class="badge">Team</span>
      </div>
      <p class="mt-3 text-sm text-slate-300">${t.description}</p>
      <div class="mt-3 flex flex-wrap gap-2">
        ${t.lookingFor.map((s) => `<span class="badge">Needs: ${s}</span>`).join("")}
      </div>
  <!-- Team chat removed in DM-only mode -->
    </div>
  `;
  return card;
}

let currentDM = null; // { peerId, peerName, roomId }
function setupDM() {
  $("#closeChat").addEventListener("click", closeChat);
  $("#sendBtn").addEventListener("click", sendDM);
  $("#messageInput").addEventListener("keydown", (e) => { if (e.key === "Enter") sendDM(); });
}

function openDM(peerId, peerName) {
  const me = JSON.parse(localStorage.getItem('hm_user')||'null');
  const meId = me && (me._id || me.id);
  if (!meId) { showToast('Please log in to start a chat.'); return; }
  currentDM = null;
  $("#chatWith").textContent = peerName;
  $("#chatSub").textContent = 'Direct message';
  $("#messages").innerHTML = "";
  $("#chatModal").classList.remove("hidden");
  $("#chatModal").classList.add("flex");
  void $("#chatModal").offsetHeight;
  $("#chatModal").classList.add("show");
  $("#messageInput").focus();

  const [x, y] = [String(meId), String(peerId)].sort();
  const roomId = `dm:${x}|${y}`;
  currentDM = { peerId: String(peerId), peerName, roomId };

  try {
    const sock = getSocket();
    if (!sock) { showToast('Realtime connection is offline.'); return; }
    requestNotifyPermission();
  sock.emit('dm:join', { me: meId, peerId, userName: me.name || 'Guest' }, (info) => {
      try {
        const sub = document.getElementById('chatSub');
    if (info && sub) sub.textContent = `DM • members: ${info.members || 1}`;
    try { console.log('[dm] joined room', info?.roomId, 'me=', meId, 'peer=', peerId); } catch {}
      } catch {}
    });
    // Load last 50 messages from server history
    fetch(`${API_BASE}/api/dm/history?me=${encodeURIComponent(meId)}&peerId=${encodeURIComponent(peerId)}&limit=50`)
      .then(r => r.json())
      .then(arr => {
        try {
          if (Array.isArray(arr)) {
            const selfName = me.name || 'Me';
            const box = document.getElementById('messages');
            box.innerHTML = '';
            arr.forEach(m => {
              const ts = m.ts ? new Date(m.ts).getTime() : Date.now();
              const fromSelf = (m.userName === selfName);
              addChatMessage({ text: m.text, fromSelf, system: false, userName: m.userName || 'Guest', ts });
            });
          }
        } catch {}
      })
      .catch((e)=>{ try { console.error('[dm] history error', e); } catch {} });
    // Ensure clean listeners per session
    sock.off('dm:message');
    sock.on('dm:message', (m) => {
      if (!currentDM) return;
      if (!m || m.roomId !== currentDM.roomId || !m.text) return;
      // Since server no longer echoes to sender, only render incoming
      const fromSelf = false;
      if (!wasRecentlySent(currentDM.roomId, m.text, m.ts || Date.now())) {
        addChatMessage({ text: m.text, fromSelf, system: false, userName: m.userName || 'Guest', ts: m.ts || Date.now() });
      }
      if (!fromSelf) {
        const shouldNotify = !windowFocused || !document.hasFocus();
        if (shouldNotify) {
          const shown = showBrowserNotification({ title: `${m.userName || 'New message'}`, body: String(m.text||'').slice(0,80), tag: currentDM.roomId });
          if (!shown) showToast(`${m.userName || 'New message'}: ${String(m.text||'').slice(0,80)}`);
        }
        beep();
      }
    });
  } catch {}
}

function closeChat() {
  const modal = $("#chatModal");
  modal.classList.remove("show");
  // Wait for transition to end to hide flex container to avoid jump
  setTimeout(() => { modal.classList.add("hidden"); modal.classList.remove("flex"); }, 300);
}

function sendDM() {
  const input = $("#messageInput");
  const text = input.value.trim();
  const fileInput = $("#attachmentInput");
  if (!text && !fileInput.files.length) return;

  if (text) {
    const now = Date.now();
    try {
      const sock = getSocket();
      const me = JSON.parse(localStorage.getItem('hm_user')||'null');
      const meId = me && (me._id || me.id);
      if (sock && currentDM && meId) {
  const roomId = currentDM.roomId;
        const selfName = me.name || 'Me';
        addChatMessage({ text, fromSelf: true, system: false, userName: selfName, ts: now });
        rememberSent(roomId, text, now);
        try { console.log('[dm] send', { roomId, text, to: currentDM.peerId }); } catch {}
        sock.emit('dm:message', { me: meId, peerId: currentDM.peerId, text, userName: selfName, ts: now }, (ack) => {
          try {
            if (!ack || ack.ok !== true) {
              showToast('Message not saved');
              console.error('[dm] send ack error', ack);
            }
          } catch {}
        });
      }
    } catch {}
  }
  if (fileInput.files.length) {
    const file = fileInput.files[0];
    addChatMessage({ attachment: file.name, fromSelf: true });
    fileInput.value = "";
  }
  input.value = "";
}

// system messages not used in DM-only mode

function addChatMessage({ text = "", attachment = null, fromSelf = false, system = false, userName = '', ts = null }) {
  const container = $("#messages");
  const row = document.createElement("div");
  row.className = `flex ${fromSelf ? "justify-end" : "justify-start"}`;
  const bubble = document.createElement("div");
  bubble.className = `max-w-[75%] rounded-xl px-3 py-2 text-sm ${
    system ? "bg-white/5 text-slate-300" : fromSelf ? "bg-cyan-500/20 text-cyan-100" : "bg-fuchsia-500/20 text-fuchsia-100"
  } border border-white/10`;
  if (text) {
    const maybeLink = linkify(text);
    bubble.innerHTML = maybeLink;
  }
  if (attachment) {
    const att = document.createElement("div");
    att.className = "mt-1 text-xs text-slate-300";
    att.innerHTML = `📎 ${attachment}`;
    bubble.appendChild(att);
  }
  if (!system) {
    const meta = document.createElement('div');
    meta.className = `mt-1 text-[10px] ${fromSelf ? 'text-cyan-200/70' : 'text-fuchsia-200/70'}`;
    const when = ts ? new Date(ts) : new Date();
    const hh = String(when.getHours()).padStart(2,'0');
    const mm = String(when.getMinutes()).padStart(2,'0');
    const who = fromSelf ? (userName || 'You') : (userName || 'Guest');
    meta.textContent = `${who} • ${hh}:${mm}`;
    bubble.appendChild(meta);
  }
  row.appendChild(bubble);
  container.appendChild(row);
  // animate message
  bubble.classList.add('msg-pop');
  container.scrollTop = container.scrollHeight;
}

function linkify(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" class="underline text-cyan-300">${url}</a>`);
}

document.addEventListener("DOMContentLoaded", init);

// ---------- Scroll reveal ----------
function setupScrollReveal() {
  // Mark reveal targets
  try {
    const hero = document.querySelector('#home > div.text-center');
    if (hero) hero.classList.add('reveal');
    const suggestionCards = document.getElementById('suggestionsGrid');
  const results = document.getElementById('resultsGrid');
  if (results) results.classList.add('reveal');
  const sections = [document.getElementById('search'), document.getElementById('about'), document.getElementById('features'), document.getElementById('team-finder'), suggestionCards, results];
    sections.filter(Boolean).forEach((el) => el.classList.add('reveal'));
  } catch {}

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const t = entry.target;
        t.classList.add('in-view');
        // Stagger children if it's a grid of cards
        if (t.id === 'suggestionsGrid' || t.id === 'resultsGrid') {
          // Perf: limit staggering to first 12 children
          const kids = Array.prototype.slice.call(t.children, 0, 12);
          kids.forEach((child, i) => {
            child.style.setProperty('--reveal-delay', `${Math.min(i * 60, 360)}ms`);
            child.classList.add('reveal', 'in-view');
          });
        }
        io.unobserve(t);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

function staggerGridReveal(grid) {
  if (!grid) return;
  const rect = grid.getBoundingClientRect();
  const inViewport = rect.top < (window.innerHeight || document.documentElement.clientHeight);
  if (!inViewport) return; // IO will handle when it enters
  [...grid.children].forEach((child, i) => {
    child.style.setProperty('--reveal-delay', `${Math.min(i * 60, 360)}ms`);
    child.classList.add('reveal', 'in-view');
  });
}

// ---------- Typewriter ----------
function startTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const phrases = [
    'Find your perfect hackathon partner.',
    'Hack together. Build smarter. Win bigger.',
    'Collaboration starts here.',
    'From lone coder to winning team – with HackMate.'
  ];
  const perfLow = document.documentElement.classList.contains('perf-low');
  const typeDelay = perfLow ? 18 : 28; // ms per char
  const holdDelay = 1400; // pause on full line
  const eraseDelay = perfLow ? 14 : 20;
  let pi = 0, i = 0, dir = 1; // dir: 1 typing, -1 deleting

  function step() {
    const text = phrases[pi];
    if (dir === 1) {
      i++;
      el.textContent = text.slice(0, i);
      if (i === text.length) {
        setTimeout(() => { dir = -1; step(); }, holdDelay);
      } else {
        setTimeout(step, typeDelay);
      }
    } else {
      i--;
      el.textContent = text.slice(0, Math.max(i, 0));
      if (i <= 0) {
        dir = 1; pi = (pi + 1) % phrases.length;
        setTimeout(step, typeDelay);
      } else {
        setTimeout(step, eraseDelay);
      }
    }
  }
  // Initial seed
  el.textContent = phrases[0];
  i = phrases[0].length;
  setTimeout(() => { dir = -1; step(); }, holdDelay);
}

// (notification toggles removed from UI; notifications and sound are enabled by default)