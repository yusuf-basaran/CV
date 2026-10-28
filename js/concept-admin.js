// Konsept yönetimi yalnızca ana sayfadaki mevcut yönetici oturumunu kullanır.
(() => {
  'use strict';
  if (!window.SiteConcepts || typeof supabaseClient === 'undefined') return;
  const client = supabaseClient;
  const concepts = window.SiteConcepts;
  const modal = document.getElementById('conceptModal');
  const openButton = document.getElementById('conceptAdminButton');
  const saveButton = document.getElementById('conceptSave');
  const status = document.getElementById('conceptStatus');
  const reloadButton = document.getElementById('conceptReload');
  const container = document.querySelector('.container');
  const choices = [];
  let selected = concepts.state().preset;
  let authorized = false;
  let busy = false;
  let lastFocus;
  let permissionVersion = 0;

  for (const group of [
    { id: 'normal', name: 'Standart' },
    { id: 'religious', name: 'Dinî bayramlar' },
    { id: 'national', name: 'Millî bayramlar' }
  ]) {
    const fieldset = document.createElement('fieldset');
    fieldset.className = 'concept-group';
    const legend = document.createElement('legend');
    legend.textContent = group.name;
    const grid = document.createElement('div');
    grid.className = 'concept-options-grid';
    for (const preset of concepts.presets.filter(item => item.group === group.id)) {
      const label = document.createElement('label');
      label.className = 'chip-btn concept-option';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'site-concept';
      input.id = `concept-${preset.id}`;
      input.value = preset.id;
      label.htmlFor = input.id;
      const text = document.createElement('span');
      text.textContent = preset.label;
      input.addEventListener('change', () => {
        selected = preset.id;
        concepts.preview(selected);
        syncSelection();
      });
      label.append(input, text);
      grid.append(label);
      choices.push(input);
    }
    fieldset.append(legend, grid);
    document.getElementById('conceptChoices').append(fieldset);
  }

  function syncSelection() {
    const preset = concepts.presets.find(item => item.id === selected);
    choices.forEach(input => { input.checked = input.value === selected; input.disabled = busy; });
    document.getElementById('conceptPreviewTitle').textContent = preset.title || 'Standart görünüm';
    document.getElementById('conceptPreviewMessage').textContent = preset.message || 'Sitenin normal renkleri kullanılır; bayram mesajı gösterilmez.';
    saveButton.disabled = busy || !authorized || !concepts.state().ready || selected === concepts.state().preset;
    saveButton.textContent = busy ? 'Yayınlanıyor…' : 'Konsepti Yayınla';
    reloadButton.disabled = busy;
  }

  async function refreshPermissions() {
    const version = ++permissionVersion;
    try {
      const { data: { user }, error: userError } = await client.auth.getUser();
      if (version !== permissionVersion) return;
      if (userError || !user) {
        authorized = false;
        status.textContent = 'Konsept değiştirmek için yönetici girişi yapın.';
      } else {
        const { data, error } = await client.from('cv_site_concept_admins').select('user_id').eq('user_id', user.id).maybeSingle();
        if (version !== permissionVersion) return;
        authorized = !error && Boolean(data);
        status.textContent = error
          ? 'Konsept kaydı henüz hazır değil. Kurulumdan sonra Yeniden Kontrol Et düğmesini kullanın.'
          : !authorized ? 'Bu hesabın konsept değiştirme yetkisi bulunmuyor.'
            : !concepts.state().ready ? 'Konsept ayarı okunamadı. Yeniden kontrol edin.'
              : 'Yayınladığınız konsept tüm ziyaretçilere ve üç sayfaya uygulanır.';
      }
    } catch (error) {
      authorized = false;
      status.textContent = 'Bağlantı kurulamadı. Yeniden kontrol edin.';
    }
    syncSelection();
  }

  async function reload() {
    reloadButton.disabled = true;
    status.textContent = 'Konsept ayarı kontrol ediliyor…';
    await concepts.load();
    await refreshPermissions();
    reloadButton.disabled = false;
  }

  function close(cancel = true) {
    if (cancel) concepts.cancelPreview();
    modal.hidden = true;
    modal.classList.remove('show');
    container.inert = false;
    if (lastFocus?.isConnected) lastFocus.focus();
  }

  openButton.addEventListener('click', () => {
    lastFocus = document.activeElement;
    selected = concepts.state().preset;
    syncSelection();
    modal.hidden = false;
    modal.classList.add('show');
    container.inert = true;
    choices.find(input => input.checked)?.focus();
    reload();
  });
  modal.querySelectorAll('[data-concept-close]').forEach(button => button.addEventListener('click', () => close()));
  modal.addEventListener('click', event => { if (event.target === modal) close(); });
  reloadButton.addEventListener('click', reload);

  // Yeni modalda klavye odağı dışarı çıkmaz; Esc önizlemeyi iptal eder.
  modal.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); close(); return; }
    if (event.key !== 'Tab') return;
    const elements = [...modal.querySelectorAll('button:not([disabled]), input:not([disabled]), a[href]')].filter(element => element.getClientRects().length);
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  saveButton.addEventListener('click', async () => {
    if (saveButton.disabled) return;
    busy = true;
    syncSelection();
    status.textContent = 'Konsept yayınlanıyor…';
    try {
      const { data: { user }, error: userError } = await client.auth.getUser();
      if (userError || !user) throw new Error('Oturum kapalı.');
      const { data, error } = await client.from('cv_site_concept_settings')
        .update({ preset: selected }).eq('id', 1).select('preset,updated_at').single();
      if (error || data?.preset !== selected) throw new Error('Yayınlanamadı.');
      concepts.acceptPublished(data.preset);
      close(false);
      if (typeof showToast === 'function') showToast('Site konsepti tüm ziyaretçiler için güncellendi.');
    } catch (error) {
      status.textContent = 'Konsept yayınlanamadı. Yönetici oturumunu ve kurulumun tamamlandığını kontrol edip tekrar deneyin.';
    } finally {
      busy = false;
      syncSelection();
    }
  });

  document.addEventListener('site-concept-loaded', () => { if (!modal.hidden && !busy) refreshPermissions(); });
  // Auth callback içinde Supabase sorgusunu bekletme.
  client.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      permissionVersion++;
      authorized = false;
      if (!modal.hidden) close();
      syncSelection();
    } else setTimeout(refreshPermissions, 0);
  });
})();
