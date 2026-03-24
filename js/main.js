// ── Active nav link on scroll ─────────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove('active'));
        const active = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => observer.observe(s));


// ── Color shuffle ─────────────────────────────────────────────────────────────
const DEFAULT_COLORS = {
  '--bg':          '#0f0f11',
  '--bg-card':     '#18181c',
  '--border':      '#2a2a30',
  '--text':        '#e4e4e8',
  '--text-muted':  '#888892',
  '--accent':      '#7c6af7',
  '--accent-soft': '#7c6af720',
};

// Curated accent palettes: [accent, bg, bg-card, border, text, text-muted]
const PALETTES = [
  { accent: '#f97316', bg: '#0f0e0c', bgCard: '#1a1713', border: '#2e2a24', text: '#f0ece6', textMuted: '#8a8070' }, // orange / warm dark
  { accent: '#22d3ee', bg: '#090f11', bgCard: '#121c1f', border: '#1f3038', text: '#dff4f8', textMuted: '#6a9aaa' }, // cyan / deep sea
  { accent: '#a3e635', bg: '#0d110a', bgCard: '#161c10', border: '#242e18', text: '#e8f0d8', textMuted: '#7a9060' }, // lime / matrix
  { accent: '#f43f5e', bg: '#110a0d', bgCard: '#1c1215', border: '#301820', text: '#f8dde3', textMuted: '#a06070' }, // rose / neon
  { accent: '#818cf8', bg: '#0b0b14', bgCard: '#13131e', border: '#21213a', text: '#e0e0f8', textMuted: '#7070a0' }, // indigo / midnight
  { accent: '#fbbf24', bg: '#110f0a', bgCard: '#1c1a10', border: '#302c18', text: '#f8f0d8', textMuted: '#a09060' }, // amber / golden
  { accent: '#34d399', bg: '#090f0d', bgCard: '#121f18', border: '#1a3028', text: '#d8f8ee', textMuted: '#60a080' }, // emerald / forest
  { accent: '#e879f9', bg: '#100b11', bgCard: '#1a121c', border: '#2c1e30', text: '#f4d8f8', textMuted: '#906098' }, // fuchsia / neon purple
  { accent: '#fb923c', bg: '#100d09', bgCard: '#1c1510', border: '#301f18', text: '#f8e8d8', textMuted: '#a07860' }, // deep orange / ember
  { accent: '#38bdf8', bg: '#090d11', bgCard: '#11181f', border: '#1a2a38', text: '#d8eef8', textMuted: '#608098' }, // sky / blueprint
];

function applyPalette(p) {
  const root = document.documentElement;
  root.style.setProperty('--accent',      p.accent);
  root.style.setProperty('--accent-soft', p.accent + '20');
  root.style.setProperty('--bg',          p.bg);
  root.style.setProperty('--bg-card',     p.bgCard);
  root.style.setProperty('--border',      p.border);
  root.style.setProperty('--text',        p.text);
  root.style.setProperty('--text-muted',  p.textMuted);
}

function applyDefaults() {
  const root = document.documentElement;
  Object.entries(DEFAULT_COLORS).forEach(([prop, val]) => root.style.setProperty(prop, val));
}

let lastIndex = -1;

document.getElementById('btn-shuffle').addEventListener('click', () => {
  let idx;
  do { idx = Math.floor(Math.random() * PALETTES.length); } while (idx === lastIndex);
  lastIndex = idx;
  applyPalette(PALETTES[idx]);
});

document.getElementById('btn-reset').addEventListener('click', () => {
  lastIndex = -1;
  applyDefaults();
});
