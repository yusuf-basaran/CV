// Bayram konsepti tüm sayfalarda çalışır; Supabase SDK gerektirmez.
(() => {
  'use strict';
  const PRESETS = Object.freeze([
    { id: 'normal', group: 'normal', label: 'Standart görünüm', title: '', message: '', family: '' },
    { id: 'ramazan', group: 'religious', label: 'Ramazan Bayramı', title: 'Ramazan Bayramınız kutlu olsun.', message: 'Sevdiklerinizle birlikte huzurlu, sağlıklı ve güzel bir bayram dilerim.', family: 'religious' },
    { id: 'kurban', group: 'religious', label: 'Kurban Bayramı', title: 'Kurban Bayramınız kutlu olsun.', message: 'Paylaşmanın ve dayanışmanın çoğaldığı, huzurlu bir bayram dilerim.', family: 'religious' },
    { id: 'national', group: 'national', label: 'Millî bayram', title: 'Millî bayramımız kutlu olsun.', message: 'Birlik ve beraberlik içinde nice güzel bayramlara.', family: 'national' },
    { id: 'april23', group: 'national', label: '23 Nisan', title: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramımız kutlu olsun.', message: 'Çocukların umutla ve mutlulukla büyüdüğü yarınlara.', family: 'national' },
    { id: 'may19', group: 'national', label: '19 Mayıs', title: '19 Mayıs Atatürk’ü Anma, Gençlik ve Spor Bayramımız kutlu olsun.', message: 'Geleceğe inançla, gençliğin enerjisiyle.', family: 'national' },
    { id: 'july20', group: 'national', label: '20 Temmuz · KKTC', title: '20 Temmuz Barış ve Özgürlük Bayramımız kutlu olsun.', message: 'Barış, özgürlük ve dayanışma içinde nice yıllara.', family: 'national' },
    { id: 'august30', group: 'national', label: '30 Ağustos', title: '30 Ağustos Zafer Bayramımız kutlu olsun.', message: 'Bağımsızlığımızı ve ortak geleceğimizi gururla kutluyoruz.', family: 'national' },
    { id: 'october29', group: 'national', label: '29 Ekim', title: '29 Ekim Cumhuriyet Bayramımız kutlu olsun.', message: 'Cumhuriyetimizin ışığında nice güzel yarınlara.', family: 'national' },
    { id: 'november15', group: 'national', label: '15 Kasım · KKTC', title: '15 Kasım KKTC Cumhuriyet Bayramı kutlu olsun.', message: 'Birlik ve beraberlik içinde nice yıllara.', family: 'national' }
  ]);
  const byId = new Map(PRESETS.map(preset => [preset.id, preset]));
  const CACHE_KEY = 'site-concept';
  const API_URL = 'https://hqauyhneidkjpchjhutb.supabase.co';
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYXV5aG5laWRranBjaGpodXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMzc2NjIsImV4cCI6MjEwNjcxMzY2Mn0.XmAwz3BRDyN2iAxvQTCLehevdfeoR04dOxKxDxpwEXg';
  const root = document.documentElement;
  const banner = document.getElementById('occasionBanner');
  let savedPreset = 'normal';
  let ready = false;
  let previewing = false;
  let loading;
  let artworkPreset;

  // Çizimler yerel ve sabittir; sunucudan HTML alınmaz.
  const star = '<path d="m0-10 2.25 6.9h7.25L3.63 1.18l2.24 6.91L0 3.82l-5.87 4.27 2.24-6.91-5.87-4.28h7.25Z" fill="currentColor"/>';
  const moon = '<path d="M8-23a24 24 0 1 0 0 46A20 20 0 0 1 8-23Z" fill="currentColor"/>';
  const lantern = '<path d="M0-36v12m-7 6 7-6 7 6m-18 0h22L9 10l-9 8-9-8Zm-3 0h28M-9 10H9M-4-18-3 10m7-28L3 10M0 18v7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M-4-9h8v13h-8Z" fill="currentColor" opacity=".2"/>';
  const rosette = '<path d="m0-25 7 9 11-2-2 11 9 7-9 7 2 11-11-2-7 9-7-9-11 2 2-11-9-7 9-7-2-11 11 2Z" fill="none" stroke="currentColor" stroke-width="1.2"/><circle r="15" fill="none" stroke="currentColor" opacity=".4"/>';

  function svg(content, viewBox = '0 0 960 112') {
    const alignment = viewBox === '0 0 960 112' ? 'xMidYMin slice' : 'xMidYMid meet';
    return `<svg viewBox="${viewBox}" preserveAspectRatio="${alignment}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${content}</svg>`;
  }

  function flag(country, x, y, width = 66) {
    const cyprus = country === 'kktc';
    const ground = cyprus ? '#fff' : '#e30a17';
    const ink = cyprus ? '#e30a17' : '#fff';
    return `<svg x="${x}" y="${y}" width="${width}" height="${width * 2 / 3}" viewBox="0 0 120 80" data-occasion-flag="${country}">
      <path fill="${ground}" d="M0 0h120v80H0Z"/>
      ${cyprus ? '<path fill="#e30a17" d="M0 8h120v9H0Zm0 55h120v9H0Z"/>' : ''}
      <circle cx="45" cy="40" r="20" fill="${ink}"/><circle cx="50" cy="40" r="16" fill="${ground}"/>
      <g transform="translate(70 40) rotate(-18)" color="${ink}">${star}</g>
    </svg>`;
  }

  function nationalArtwork(preset) {
    const local = ['july20', 'november15'].includes(preset.id);
    const flags = [92, 220, 348, 476, 604, 732, 860].map((x, index) => {
      const y = 15 + 25 * Math.sin((index / 6) * Math.PI);
      const country = local && index % 2 === 1 ? 'kktc' : 'tr';
      return `<path d="M${x} ${y}v9" stroke="currentColor" opacity=".5"/>${flag(country, x - 33, y + 9)}`;
    }).join('');
    const pennants = preset.id === 'april23' ? [156, 284, 412, 540, 668, 796].map((x, index) =>
      `<path d="m${x - 13} 38h26l-13 26Z" fill="${['#38bdf8', '#f59e0b', '#e30a17'][index % 3]}"/>`).join('') : '';
    const emblem = preset.id === 'august30' ? `<path d="M-12 20Q-42-1-23-25M12 20Q42-1 23-25M-25-13l-10-4m9 15-12-2m15 13-11 2m59-24 10-4M26-2l12-2M23 9l11 2" fill="none" stroke="currentColor" stroke-width="2"/>${star}` : star;
    return {
      band: svg(`<path d="M0 0Q480 88 960 0" fill="none" stroke="currentColor" opacity=".3"/>${flags}${pennants}`),
      symbol: svg(`${flag('tr', 8, local ? 8 : 19, 66)}${local ? flag('kktc', 26, 43, 62) : ''}`, '0 0 96 92'),
      seal: svg(`<path d="M0 36h95m130 0h95" stroke="currentColor" opacity=".25"/><g transform="translate(160 36)">${emblem}</g>`, '0 0 320 72')
    };
  }

  function religiousArtwork(preset) {
    const ornaments = [100, 340, 620, 860].map((x, index) => {
      const y = index === 0 || index === 3 ? 54 : 76;
      return `<path d="M${x} 0v${y - 36}" stroke="currentColor" opacity=".3"/><g transform="translate(${x} ${y})">${lantern}</g>`;
    }).join('');
    const center = preset.id === 'kurban' ? `${rosette}<g transform="scale(.45)">${moon}</g>` : `${moon}<g transform="translate(25 -13) scale(.65)">${star}</g>`;
    return {
      band: svg(`<path d="M0 8Q240 75 480 8Q720 75 960 8" fill="none" stroke="currentColor" opacity=".25"/>${ornaments}<g transform="translate(480 55)">${center}</g><g transform="translate(370 64) scale(.4)">${star}</g><g transform="translate(590 64) scale(.4)">${star}</g>`),
      symbol: svg(`<g transform="translate(42 43)">${center}</g>`, '0 0 90 86'),
      seal: svg(`<path d="M0 36h95m130 0h95" stroke="currentColor" opacity=".25"/><g transform="translate(160 36)">${rosette}<g transform="scale(.45)">${moon}</g></g>`, '0 0 320 72')
    };
  }

  function renderArtwork(preset) {
    if (artworkPreset === preset.id) return;
    artworkPreset = preset.id;
    const artwork = preset.family === 'national' ? nationalArtwork(preset) : religiousArtwork(preset);
    for (const [id, content] of [['occasionDecorations', artwork.band], ['occasionSymbol', artwork.symbol], ['occasionFooterMark', artwork.seal]]) {
      const element = document.getElementById(id);
      if (!element) continue;
      element.hidden = !preset.family;
      element.innerHTML = preset.family ? content : '';
    }
  }

  function apply(id, preview = false) {
    const preset = byId.get(id) || byId.get('normal');
    renderArtwork(preset);
    if (preset.family) {
      root.dataset.occasionFamily = preset.family;
      root.dataset.occasion = preset.id;
    } else {
      delete root.dataset.occasionFamily;
      delete root.dataset.occasion;
    }
    if (!banner) return;
    banner.hidden = !preset.family;
    document.getElementById('occasionTitle').textContent = preset.title;
    document.getElementById('occasionMessage').textContent = preset.message;
    document.getElementById('occasionLabel').textContent = preset.label;
    document.getElementById('occasionPreview').hidden = !preview;
  }

  function remember(id) {
    const preset = byId.get(id) || byId.get('normal');
    savedPreset = preset.id;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ preset: preset.id, family: preset.family, savedAt: Date.now() }));
    } catch (error) {}
    if (!previewing) apply(preset.id);
  }

  function acceptPublished(id) {
    previewing = false;
    ready = true;
    remember(id);
    document.dispatchEvent(new CustomEvent('site-concept-loaded', { detail: { ready, preset: savedPreset } }));
  }

  async function load() {
    if (loading) return loading;
    loading = (async () => {
      try {
        const response = await fetch(`${API_URL}/rest/v1/cv_site_concept_settings?id=eq.1&select=preset,updated_at`, {
          headers: { apikey: API_KEY, Authorization: `Bearer ${API_KEY}` },
          cache: 'no-store', signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) throw new Error('Konsept okunamadı.');
        const rows = await response.json();
        if (!Array.isArray(rows) || rows.length !== 1 || !byId.has(rows[0].preset)) throw new Error('Konsept ayarı geçersiz.');
        ready = true;
        remember(rows[0].preset);
      } catch (error) {
        ready = false;
        // Bağlantı sorunu, proje listesini veya hesaplayıcıyı etkilemez.
      } finally {
        loading = null;
        document.dispatchEvent(new CustomEvent('site-concept-loaded', { detail: { ready, preset: savedPreset } }));
      }
      return { ready, preset: savedPreset };
    })();
    return loading;
  }

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && byId.has(cached.preset)) savedPreset = cached.preset;
  } catch (error) {}
  apply(savedPreset);

  window.SiteConcepts = Object.freeze({
    presets: PRESETS,
    load,
    acceptPublished,
    state: () => ({ ready, preset: savedPreset }),
    preview(id) { previewing = true; apply(id, true); },
    cancelPreview() { previewing = false; apply(savedPreset); }
  });
  window.addEventListener('storage', event => {
    if (event.key !== CACHE_KEY) return;
    try {
      const cached = JSON.parse(event.newValue);
      if (cached && byId.has(cached.preset)) {
        savedPreset = cached.preset;
        if (!previewing) apply(savedPreset);
      }
    } catch (error) {}
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !previewing) load();
  });
  setInterval(() => { if (!document.hidden && !previewing) load(); }, 60000);
  load();
})();
