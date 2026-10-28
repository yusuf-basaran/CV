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

  function apply(id, preview = false) {
    const preset = byId.get(id) || byId.get('normal');
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
