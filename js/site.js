// ------------------------------------------------------------
    // Yapılandırma
    // ------------------------------------------------------------
    const SUPABASE_URL = 'https://hqauyhneidkjpchjhutb.supabase.co';
    // Anon key tarayıcıda görünür olmak ZORUNDADIR; güvenlik RLS politikalarına bağlıdır.
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYXV5aG5laWRranBjaGpodXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMzc2NjIsImV4cCI6MjEwNjcxMzY2Mn0.XmAwz3BRDyN2iAxvQTCLehevdfeoR04dOxKxDxpwEXg';

    // Dolu olan linkler hero bölümünde chip olarak görünür. Boş bırakılanlar gösterilmez.
    const SOCIAL_LINKS = [
      { label: 'GitHub',   url: 'https://github.com/yusuf-basaran' },
      { label: 'LinkedIn', url: '' }    // örn: 'https://www.linkedin.com/in/kullaniciadin'
    ];

    const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    let isAdmin = false;   // Sadece arayüz bayrağı; asıl yetki kontrolü Supabase RLS'te olmalı.
    let projects = [];

    // ------------------------------------------------------------
    // Yardımcılar
    // ------------------------------------------------------------
    function escapeHtml(str) {
      return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Sadece http(s) linklerine izin ver (javascript:, data: vb. engellenir)
    function safeUrl(u) {
      if (!u) return '';
      try {
        const x = new URL(u, location.origin);
        return (x.protocol === 'https:' || x.protocol === 'http:') ? x.href : '';
      } catch (e) { return ''; }
    }

    function findProject(id) {
      return projects.find(p => String(p.id) === String(id));
    }

    let toastTimeout;
    function showToast(msg) {
      const toast = document.getElementById('toast');
      document.getElementById('toastMsg').textContent = msg;
      toast.classList.add('show');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
    }

    // ------------------------------------------------------------
    // Tema
    // ------------------------------------------------------------
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const root = document.documentElement;

    function getPreferredTheme() {
      try {
        const stored = localStorage.getItem('theme');
        if (stored) return stored;
      } catch (e) {}
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      try { localStorage.setItem('theme', theme); } catch (e) {}
      if (theme === 'light') {
        themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
      } else {
        themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
      }
    }

    themeToggle.addEventListener('click', () => {
      applyTheme((root.getAttribute('data-theme') || 'dark') === 'dark' ? 'light' : 'dark');
    });
    applyTheme(getPreferredTheme());

    // ------------------------------------------------------------
    // İletişim menüleri / kopyalama / vCard
    // ------------------------------------------------------------
    async function copyToClipboard(text, message) {
      try {
        await navigator.clipboard.writeText(text);
        showToast(message);
      } catch (e) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); showToast(message); }
        catch (err) { showToast('Kopyalanamadı, elle seçip kopyalayın.'); }
        ta.remove();
      }
    }

    function toggleMenu(wrapperId, menuId, btnId, e) {
      e.stopPropagation();
      const wrapper = document.getElementById(wrapperId);
      const menu = document.getElementById(menuId);
      const btn = document.getElementById(btnId);
      const isOpen = menu.classList.contains('show');
      closeAllMenus();
      if (!isOpen) {
        menu.classList.add('show');
        wrapper.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    }

    function closeAllMenus() {
      document.querySelectorAll('.dropdown-menu').forEach(m => m.classList.remove('show'));
      document.querySelectorAll('.dropdown-wrapper').forEach(w => w.classList.remove('active'));
      document.querySelectorAll('.dropdown-wrapper > button').forEach(b => b.setAttribute('aria-expanded', 'false'));
    }

    function handleCopyText(text, message, e) {
      e.stopPropagation();
      copyToClipboard(text, message);
      closeAllMenus();
    }

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown-wrapper')) closeAllMenus();
    });

    function downloadVCard() {
      const vcardData = [
        'BEGIN:VCARD', 'VERSION:3.0',
        'N:Başaran;Yusuf;;;', 'FN:Yusuf Başaran',
        'TITLE:IT / Bilgi İşlem',
        'TEL;TYPE=CELL:+905338493063',
        'EMAIL;TYPE=INTERNET:yusufbasaran63@hotmail.com',
        'URL:https://yusufbasaran.dev/',
        'ADR;TYPE=HOME:;;Gazimağusa;Kıbrıs;;;',
        'END:VCARD'
      ].join('\r\n');

      const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Yusuf_Basaran_IT.vcf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast('Kartvizit indirildi!');
    }

    // Sosyal linkler (dolu olanlar)
    (function renderSocialLinks() {
      const wrap = document.getElementById('contactChips');
      SOCIAL_LINKS.forEach(s => {
        const href = safeUrl(s.url);
        if (!href) return;
        const a = document.createElement('a');
        a.className = 'chip-btn';
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = s.label;
        wrap.appendChild(a);
      });
    })();

    // ------------------------------------------------------------
    // Beceri filtresi
    // ------------------------------------------------------------
    function filterSkills(category, btn) {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      if (btn) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      }
      document.querySelectorAll('.skill-card').forEach(card => {
        card.style.display = (category === 'all' || card.getAttribute('data-cat') === category) ? 'flex' : 'none';
      });
    }

    // ------------------------------------------------------------
    // Projeler
    // ------------------------------------------------------------
    const FALLBACK_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%231B211E' width='400' height='200'/%3E%3Ctext fill='%2364748b' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18'%3EYusuf Ba%C5%9Faran Proje%3C/text%3E%3C/svg%3E";

    function setGridMessage(text, cls) {
      const grid = document.getElementById('projectsGrid');
      grid.innerHTML = '';
      const div = document.createElement('div');
      div.className = 'projects-msg' + (cls ? ' ' + cls : '');
      div.textContent = text;
      grid.appendChild(div);
    }

    async function loadProjectsFromSupabase() {
      try {
        const { data, error } = await supabaseClient
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        projects = data || [];
        renderProjects();
      } catch (err) {
        console.error('Supabase hatası:', err);
        setGridMessage('Projeler yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.', 'error');
      }
    }

    // Kısa kart özeti; tam açıklama yerel details denetimiyle erişilebilir kalır.
    // Yeni veya düzenlenen projeler de veritabanı değişikliği gerektirmeden aynı düzeni kullanır.
    function projectDescriptionHtml(description) {
      const text = String(description || '').trim();
      if (text.length <= 200) return `<p class="project-desc">${escapeHtml(text)}</p>`;
      const firstSentence = text.match(/^.{40,}?[.!?](?=\s|$)/u)?.[0];
      const excerpt = text.slice(0, 180).replace(/\s+\S*$/u, '').trimEnd();
      const summary = firstSentence && firstSentence.length <= 200 ? firstSentence : excerpt + '…';
      return `<p class="project-desc">${escapeHtml(summary)}</p>
        <details class="project-details"><summary>Proje ayrıntıları</summary><p>${escapeHtml(text)}</p></details>`;
    }

    function renderProjects() {
      const grid = document.getElementById('projectsGrid');
      const displayList = isAdmin ? projects : projects.filter(p => p.visible !== false);

      if (displayList.length === 0) {
        setGridMessage('Şu anda listelenecek proje bulunmamaktadır.', 'empty');
        return;
      }

      grid.innerHTML = '';

      displayList.forEach(p => {
        const card = document.createElement('article');
        card.className = 'project-card' + (p.visible === false ? ' is-hidden' : '');

        const imgSrc = safeUrl(p.img) || FALLBACK_IMG;
        const tagsHtml = (Array.isArray(p.tags) ? p.tags : []).map(t => `<span class="project-tag">${escapeHtml(String(t).trim())}</span>`).join('');
        const gh = safeUrl(p.github);
        const dm = safeUrl(p.demo);

        const gitBtn = (gh && p.show_github !== false) ? `
          <a href="${escapeHtml(gh)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="${escapeHtml(p.title)} — GitHub">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>GitHub</span>
          </a>` : '';

        const demoBtn = (dm && p.show_demo !== false) ? `
          <a href="${escapeHtml(dm)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="${escapeHtml(p.title)} — Canlı İncele">Canlı İncele</a>` : '';

        const pid = escapeHtml(String(p.id));

        card.innerHTML = `
          <div class="project-img-box">
            <img src="${escapeHtml(imgSrc)}" alt="${escapeHtml(p.title)} proje görseli" class="project-img" width="400" height="150" loading="lazy" decoding="async">
            ${p.visible === false ? '<span class="project-badge-hidden">GİZLİ</span>' : ''}
          </div>
          <div class="project-body">
            <div class="project-tags">${tagsHtml}</div>
            <h3 class="project-title">${escapeHtml(p.title)}</h3>
            ${projectDescriptionHtml(p.description)}
            <div class="project-links">${gitBtn}${demoBtn}</div>
          </div>
          <div class="admin-card-controls">
            <button class="btn-ctrl ${p.visible === false ? 'active-state' : ''}" data-action="visibility" data-id="${pid}">
              ${p.visible === false ? '🕶️ Aç' : '👁️ Gizle'}
            </button>
            <button class="btn-ctrl ${p.show_github === false ? 'active-state' : ''}" data-action="github" data-id="${pid}">Git</button>
            <button class="btn-ctrl ${p.show_demo === false ? 'active-state' : ''}" data-action="demo" data-id="${pid}">Demo</button>
            <button class="btn-ctrl" data-action="edit" data-id="${pid}">✏️ Düzenle</button>
            <button class="btn-ctrl danger" data-action="delete" data-id="${pid}">🗑️ Sil</button>
          </div>
        `;

        // Görsel yüklenemezse yedek görsel (inline onerror yerine)
        const img = card.querySelector('.project-img');
        img.addEventListener('error', () => { if (img.src !== FALLBACK_IMG) img.src = FALLBACK_IMG; }, { once: true });

        grid.appendChild(card);
      });
    }

    // Yönetici butonları: tek bir olay dinleyicisi (inline onclick + kimlik tipi hatalarını önler)
    document.getElementById('projectsGrid').addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn || !isAdmin) return;
      const p = findProject(btn.dataset.id);
      if (!p) return;

      const action = btn.dataset.action;
      if (action === 'edit') return openEditProjectModal(p.id);
      if (action === 'delete') return deleteProject(p.id);
      if (action === 'visibility') return updateProjectField(p, { visible: p.visible === false }, (p.visible === false) ? 'Proje açıldı.' : 'Proje gizlendi.');
      if (action === 'github') return updateProjectField(p, { show_github: p.show_github === false }, 'Ayar güncellendi.');
      if (action === 'demo') return updateProjectField(p, { show_demo: p.show_demo === false }, 'Ayar güncellendi.');
    });

    async function updateProjectField(p, fields, okMsg) {
      const { error } = await supabaseClient.from('projects').update(fields).eq('id', p.id);
      if (error) {
        console.error(error);
        showToast('Güncelleme başarısız: ' + error.message);
        return;
      }
      Object.assign(p, fields);
      renderProjects();
      showToast(okMsg);
    }

    // ------------------------------------------------------------
    // Görsel yükleme (Supabase Storage)
    // ------------------------------------------------------------
    const IMAGE_BUCKET = 'project-images';
    const MAX_IMAGE_MB = 5;
    const ALLOWED_IMAGE_TYPES = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' };
    let selectedImageFile = null;
    let previewObjectUrl = null;

    function handleImageSelected(input) {
      const file = input.files && input.files[0];
      if (!file) return;

      if (!ALLOWED_IMAGE_TYPES[file.type]) {
        alert('Sadece PNG, JPG, WEBP veya GIF yükleyebilirsiniz.');
        input.value = '';
        return;
      }
      if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
        alert('Görsel en fazla ' + MAX_IMAGE_MB + ' MB olabilir.');
        input.value = '';
        return;
      }

      selectedImageFile = file;
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
      previewObjectUrl = URL.createObjectURL(file);

      const prev = document.getElementById('projImgPreview');
      prev.src = previewObjectUrl;
      prev.classList.add('show');
      document.getElementById('projImgFileName').textContent = file.name;
      document.getElementById('btnClearImg').style.display = 'inline-flex';
    }

    function clearImageSelection() {
      selectedImageFile = null;
      if (previewObjectUrl) { URL.revokeObjectURL(previewObjectUrl); previewObjectUrl = null; }
      document.getElementById('projImgFile').value = '';
      const prev = document.getElementById('projImgPreview');
      prev.removeAttribute('src');
      prev.classList.remove('show');
      document.getElementById('projImgFileName').textContent = 'Dosya seçilmedi';
      document.getElementById('btnClearImg').style.display = 'none';
    }

    // Düzenlerken mevcut görseli önizleme olarak göster
    function showExistingImagePreview(url) {
      clearImageSelection();
      const safe = safeUrl(url);
      if (!safe) return;
      const prev = document.getElementById('projImgPreview');
      prev.src = safe;
      prev.classList.add('show');
      document.getElementById('projImgFileName').textContent = 'Mevcut görsel';
    }

    async function uploadSelectedImage() {
      const ext = ALLOWED_IMAGE_TYPES[selectedImageFile.type];
      const path = (crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2)) + '.' + ext;

      const { error } = await supabaseClient.storage
        .from(IMAGE_BUCKET)
        .upload(path, selectedImageFile, { contentType: selectedImageFile.type, cacheControl: '31536000', upsert: false });
      if (error) throw new Error('Görsel yüklenemedi: ' + error.message);

      const { data } = supabaseClient.storage.from(IMAGE_BUCKET).getPublicUrl(path);
      return data.publicUrl;
    }

    async function handleSaveProject(e) {
      e.preventDefault();
      const saveBtn = document.getElementById('btnSave');
      saveBtn.disabled = true;
      saveBtn.textContent = selectedImageFile ? 'Görsel yükleniyor...' : 'Kaydediliyor...';

      const id = document.getElementById('editProjectId').value;
      const tagsRaw = document.getElementById('projTags').value.trim();

      let imgUrl = safeUrl(document.getElementById('projImg').value.trim());
      if (selectedImageFile) {
        try {
          imgUrl = await uploadSelectedImage();   // dosya seçildiyse linkten önceliklidir
        } catch (err) {
          console.error(err);
          alert(err.message);
          saveBtn.disabled = false;
          saveBtn.textContent = 'Kaydet';
          return;
        }
        saveBtn.textContent = 'Kaydediliyor...';
      }

      const payload = {
        title: document.getElementById('projTitle').value.trim(),
        description: document.getElementById('projDesc').value.trim(),
        img: imgUrl,
        github: safeUrl(document.getElementById('projGithub').value.trim()),
        demo: safeUrl(document.getElementById('projDemo').value.trim()),
        tags: tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : ['Yazılım'],
        visible: document.getElementById('checkVisible').checked,
        show_github: document.getElementById('checkGithub').checked,
        show_demo: document.getElementById('checkDemo').checked
      };

      try {
        if (id) {
          const existing = findProject(id);
          const { error } = await supabaseClient.from('projects').update(payload).eq('id', existing ? existing.id : id);
          if (error) throw error;
          showToast('Proje güncellendi!');
        } else {
          const { error } = await supabaseClient.from('projects').insert([payload]);
          if (error) throw error;
          showToast('Yeni proje eklendi!');
        }
        closeProjectModal();
        await loadProjectsFromSupabase();
      } catch (err) {
        console.error(err);
        alert('Kaydetme hatası: ' + err.message);
      } finally {
        saveBtn.disabled = false;
        saveBtn.textContent = 'Kaydet';
      }
    }

    async function deleteProject(id) {
      if (!confirm('Bu projeyi kalıcı olarak silmek istiyor musunuz?')) return;
      const { error } = await supabaseClient.from('projects').delete().eq('id', id);
      if (error) {
        alert('Silme hatası: ' + error.message);
        return;
      }
      showToast('Proje silindi.');
      await loadProjectsFromSupabase();
    }

    // ------------------------------------------------------------
    // Modallar (Esc ile kapanır, odak geri verilir)
    // ------------------------------------------------------------
    let lastFocused = null;

    function openModal(modalId, focusId) {
      lastFocused = document.activeElement;
      document.getElementById(modalId).classList.add('show');
      if (focusId) setTimeout(() => { const el = document.getElementById(focusId); if (el) el.focus(); }, 60);
    }

    function closeModal(modalId) {
      document.getElementById(modalId).classList.remove('show');
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function openAddProjectModal() {
      document.getElementById('editProjectId').value = '';
      document.getElementById('projectForm').reset();
      clearImageSelection();
      document.getElementById('modalTitle').textContent = 'Yeni Proje Ekle';
      document.getElementById('checkVisible').checked = true;
      document.getElementById('checkGithub').checked = true;
      document.getElementById('checkDemo').checked = true;
      openModal('projectModal', 'projTitle');
    }

    function openEditProjectModal(id) {
      const p = findProject(id);
      if (!p) return;

      document.getElementById('editProjectId').value = p.id;
      document.getElementById('projTitle').value = p.title || '';
      document.getElementById('projDesc').value = p.description || '';
      document.getElementById('projImg').value = p.img || '';
      showExistingImagePreview(p.img);
      document.getElementById('projGithub').value = p.github || '';
      document.getElementById('projDemo').value = p.demo || '';
      document.getElementById('projTags').value = (p.tags || []).join(', ');
      document.getElementById('checkVisible').checked = p.visible !== false;
      document.getElementById('checkGithub').checked = p.show_github !== false;
      document.getElementById('checkDemo').checked = p.show_demo !== false;

      document.getElementById('modalTitle').textContent = 'Projeyi Düzenle';
      openModal('projectModal', 'projTitle');
    }

    function closeProjectModal() { closeModal('projectModal'); }

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      closeAllMenus();
      ['loginModal', 'projectModal'].forEach(id => {
        if (document.getElementById(id).classList.contains('show')) closeModal(id);
      });
    });

    // ------------------------------------------------------------
    // Yönetici girişi (Supabase Auth)
    // ------------------------------------------------------------
    let secretClickCount = 0;
    let secretClickTimer;
    document.getElementById('avatarWrapper').addEventListener('click', () => {
      secretClickCount++;
      clearTimeout(secretClickTimer);
      secretClickTimer = setTimeout(() => { secretClickCount = 0; }, 2000);
      if (secretClickCount >= 5) {
        secretClickCount = 0;
        openLoginModal();
      }
    });

    function openLoginModal() {
      if (isAdmin) {
        showToast('Zaten giriş yapmış durumdasınız.');
        return;
      }
      openModal('loginModal', 'loginEmail');
    }

    function closeLoginModal() { closeModal('loginModal'); }

    async function handleAdminLogin(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPass').value;
      const btn = document.getElementById('btnLogin');

      btn.disabled = true;
      btn.textContent = 'Kontrol ediliyor...';

      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

      btn.disabled = false;
      btn.textContent = 'Giriş Yap';

      if (error) {
        alert('Giriş başarısız: ' + error.message);
        return;
      }
      document.getElementById('loginPass').value = '';
      closeLoginModal();
      enableAdminMode();
      showToast('Yönetici girişi başarılı!');
    }

    async function checkAuthSession() {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) enableAdminMode();
    }

    function enableAdminMode() {
      isAdmin = true;
      document.body.classList.add('admin-mode');
      document.getElementById('adminBar').classList.add('active');
      renderProjects();
    }

    async function logoutAdmin() {
      await supabaseClient.auth.signOut();
      isAdmin = false;
      document.body.classList.remove('admin-mode');
      document.getElementById('adminBar').classList.remove('active');
      renderProjects();
      showToast('Yönetici oturumu kapatıldı.');
    }

    // ------------------------------------------------------------
    // Başlatma
    // ------------------------------------------------------------
    document.getElementById('yearNow').textContent = new Date().getFullYear();
    checkAuthSession();
    loadProjectsFromSupabase();

    // Scroll
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
      scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
    function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

    // Reveal animasyonu (IntersectionObserver yoksa her şeyi göster)
    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      revealEls.forEach(el => observer.observe(el));
    } else {
      revealEls.forEach(el => el.classList.add('active'));
    }
