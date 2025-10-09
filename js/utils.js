// Helper functions for MujConnects
const $ = (sel) => document.querySelector(sel);

const LS = {
  theme: 'mujc_theme',
  profile: 'mujc_profile',
  messages: (batch) => `mujc_msgs_${batch}`,
};

const BATCHES = [
  { id: '2023-2024', name: 'Batch 2023–2024' },
  { id: '2024-2025', name: 'Batch 2024–2025' },
  { id: '2025-2026', name: 'Batch 2025–2026' },
  { id: '2026-2027', name: 'Batch 2026–2027' },
  { id: '2027-2028', name: 'Batch 2027–2028' },
];

function getProfile() {
  const raw = localStorage.getItem(LS.profile);
  return raw ? JSON.parse(raw) : { displayName: "Nazish", email: "", batchId: "" };
}

function setProfile(p) {
  localStorage.setItem(LS.profile, JSON.stringify(p));
}

function applyTheme(initial) {
  const t = initial || localStorage.getItem(LS.theme) || 'light';
  document.documentElement.classList.toggle('dark', t === 'dark');
  localStorage.setItem(LS.theme, t);
}

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
