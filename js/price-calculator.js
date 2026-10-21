/* Hesaplayıcı kendi kapsamında çalışır; mevcut proje ve yönetici koduna bağlanmaz. */
(() => {
  'use strict';

  // Fiyat, süre ve yıllık ücret güncellemelerinin tek kaynağı.
  // billing: once = tek seferlik, yearly = yıllık, monthly = aylık.
  const CONFIG = {
    email: 'yusufbasaran63@hotmail.com',
    whatsapp: '905338493063',
    subject: 'Web Sitesi Teklif Talebi',
    upperMultiplier: 1.25,
    maxExtraPages: 100,
    steps: [
      { id: 'packages', title: '1. Temel paket', hint: 'Bir paket seçin. Gösterilen süreye ek hizmetlerin hazırlık süresi eklenir.' },
      { id: 'pages', title: '2. Sayfalar', hint: 'Ana Sayfa dahildir. Diğer sayfaların ayrıntılı hazırlanma ücretleri paket tutarına eklenir.' },
      { id: 'design', title: '3. Tasarım ve arayüz', hint: 'Sitenizin görünümünü ve kullanımını size göre şekillendirelim.' },
      { id: 'features', title: '4. İşlevsellik', hint: 'Ziyaretçilerinizin ve sizin ihtiyaç duyacağınız özellikleri seçin.' },
      { id: 'support', title: '5. Yayın, SEO ve destek', hint: 'İçerik yazımı, Ana Sayfa ve seçtiğiniz diğer sayfaların toplam adediyle hesaplanır. Aylık bakım ayrı gösterilir.' },
      { id: 'annual', title: '6. Yıllık giderler', hint: 'Bu yaklaşık yıllık ücretler proje toplamına dahil değildir.' }
    ],
    items: [
      { id: 'landing', category: 'packages', name: 'Tek Sayfa Tanıtım Sitesi', description: 'İşinizi tek bir sayfada tanıtan, kolay gezilen bir site.', price: 4000, days: 5, billing: 'once' },
      { id: 'multipage', category: 'packages', name: 'Çok Sayfalı Site (5 sayfaya kadar)', description: 'İşinizi ve hizmetlerinizi ayrı sayfalarda anlatan bir site.', price: 8000, days: 10, billing: 'once' },
      { id: 'corporate', category: 'packages', name: 'Kurumsal Site (10 sayfaya kadar)', description: 'Firmanızı, ekibinizi ve çalışmalarınızı kapsamlı biçimde tanıtın.', price: 13000, days: 15, billing: 'once' },
      { id: 'news', category: 'packages', name: 'Blog / Haber Sitesi', description: 'Yazılarınızı ve haberlerinizi düzenli olarak paylaşabileceğiniz bir site.', price: 12000, days: 14, billing: 'once' },
      { id: 'application', category: 'packages', name: 'Özel Web Uygulaması', description: 'Size özel yönetim ekranları, kullanıcı yetkileri ve bilgi saklama yapısı.', price: 20000, days: 25, billing: 'once' },

      { id: 'home', category: 'pages', name: 'Ana Sayfa', description: 'Karşılama alanı, kısa tanıtım ve öne çıkan çalışmalarınız.', price: 0, days: 0, billing: 'once', included: true },
      { id: 'about', category: 'pages', name: 'Hakkımızda', description: 'Hikâyenizi, değerlerinizi ve sizi farklı kılan yönleri anlatın.', price: 600, days: 1, billing: 'once' },
      { id: 'services', category: 'pages', name: 'Hizmetler / Ürünler', description: 'Sunduğunuz hizmetleri veya ürünleri anlaşılır biçimde sergileyin.', price: 800, days: 1, billing: 'once' },
      { id: 'gallery', category: 'pages', name: 'Galeri', description: 'Fotoğraflar büyütülerek incelenir ve kategorilere göre süzülür.', price: 1000, days: 2, billing: 'once' },
      { id: 'blog', category: 'pages', name: 'Blog / Duyurular', description: 'Yazılarınızı, güncel haberlerinizi ve duyurularınızı paylaşın.', price: 1500, days: 3, billing: 'once' },
      { id: 'faq', category: 'pages', name: 'SSS', description: 'Sık sorulan sorulara açılıp kapanan yanıtlarla açıklık getirin.', price: 400, days: 1, billing: 'once' },
      { id: 'contact', category: 'pages', name: 'İletişim + Harita', description: 'Adresinizi, iletişim bilgilerinizi ve haritadaki konumunuzu gösterin.', price: 600, days: 1, billing: 'once' },
      { id: 'pricing', category: 'pages', name: 'Fiyat Listesi / Paketler', description: 'Fiyatlarınızı ve hizmet paketlerinizi kolay karşılaştırılır biçimde sunun.', price: 700, days: 1, billing: 'once' },
      { id: 'reviews', category: 'pages', name: 'Referanslar / Yorumlar', description: 'Müşteri yorumları ve önceki çalışmalarınızla güven verin.', price: 600, days: 1, billing: 'once' },
      { id: 'team', category: 'pages', name: 'Ekip Tanıtımı', description: 'Ekibinizdeki kişileri, görevlerini ve uzmanlıklarını tanıtın.', price: 600, days: 1, billing: 'once' },
      { id: 'extra', category: 'pages', name: 'Ek özel sayfa', description: 'Listede olmayan, ihtiyacınıza özel başka sayfalar ekleyin.', price: 700, days: 1, billing: 'once', quantity: true },

      { id: 'custom-design', category: 'design', name: 'Özel tasarım', description: 'Hazır şablon yerine markanıza özel, sıfırdan bir görünüm hazırlansın.', price: 2500, days: 3, billing: 'once' },
      { id: 'animation', category: 'design', name: 'Animasyonlar ve geçiş efektleri', description: 'Sayfalar ve öğeler arasında yumuşak, ölçülü hareketler kullanılsın.', price: 1000, days: 2, billing: 'once' },
      { id: 'theme', category: 'design', name: 'Karanlık / aydınlık tema geçişi', description: 'Ziyaretçiler açık veya koyu görünümü kendileri seçebilsin.', price: 800, days: 1, billing: 'once' },
      { id: 'branding', category: 'design', name: 'Logo ve renk paleti önerisi', description: 'İşinize uygun bir logo fikri ve uyumlu renk önerileri sunulsun.', price: 1500, days: 2, billing: 'once' },
      { id: 'pwa', category: 'design', name: 'Mobil uygulama gibi hissettiren arayüz', description: 'Siteniz telefonun ana ekranına eklenebilsin, uygulama gibi açılsın.', price: 2000, days: 3, billing: 'once' },

      { id: 'contact-form', category: 'features', name: 'İletişim formu', description: 'Ziyaretçilerinizin yazdığı mesajlar e-posta adresinize iletilsin.', price: 500, days: 1, billing: 'once' },
      { id: 'quick-contact', category: 'features', name: 'WhatsApp / telefon hızlı iletişim butonu', description: 'Ziyaretçileriniz tek dokunuşla sizi arasın veya mesaj yazsın.', price: 250, days: 0, billing: 'once' },
      { id: 'languages', category: 'features', name: 'Çoklu dil desteği', description: 'Siteniz farklı dillerde görüntülenebilsin.', price: 1500, days: 3, billing: 'once' },
      { id: 'search', category: 'features', name: 'Arama ve filtreleme', description: 'Ziyaretçiler aradıkları içeriği kolayca bulup daraltabilsin.', price: 1200, days: 2, billing: 'once' },
      { id: 'membership', category: 'features', name: 'Üyelik / giriş sistemi', description: 'Kullanıcılar hesap oluşturup kendilerine ait alanlara giriş yapabilsin.', price: 3000, days: 4, billing: 'once' },
      { id: 'admin', category: 'features', name: 'Yönetici paneli', description: 'Yazıları, görselleri ve diğer içerikleri kendiniz yönetin.', price: 4000, days: 5, billing: 'once' },
      { id: 'booking', category: 'features', name: 'Online randevu sistemi', description: 'Müşterileriniz uygun gün ve saatleri seçerek randevu alabilsin.', price: 5000, days: 6, billing: 'once' },
      { id: 'database', category: 'features', name: 'Bilgileri güvenle saklama', description: 'Başvurular, üyeler ve diğer bilgiler düzenli olarak saklanıp yönetilsin.', price: 3500, days: 4, billing: 'once' },
      { id: 'api', category: 'features', name: 'Sitenize canlı bilgi ekleme', description: 'Hava durumu, döviz veya harita gibi dış kaynaklı bilgiler gösterilsin.', price: 2000, days: 3, billing: 'once' },
      { id: 'payment', category: 'features', name: 'Online ödeme / sepet altyapısı', description: 'Müşteriler sepet oluşturup ödeme yapabilsin. Ödeme sağlayıcı komisyonu ayrıdır.', price: 8000, days: 8, billing: 'once' },
      { id: 'notifications', category: 'features', name: 'Bildirim / e-posta otomasyonu', description: 'Randevu, sipariş ve benzeri gelişmeler için otomatik mesajlar gönderilsin.', price: 2000, days: 3, billing: 'once' },
      { id: 'export', category: 'features', name: 'Rapor / Excel-PDF dışa aktarma', description: 'Bilgilerinizi raporlayın, Excel veya PDF dosyası olarak indirin.', price: 1500, days: 2, billing: 'once' },

      { id: 'publish', category: 'support', name: 'Yayına alma', description: 'Sitenizin dosyaları GitHub ve Vercel üzerinden yayına hazırlansın.', price: 750, days: 1, billing: 'once' },
      { id: 'domain-setup', category: 'support', name: 'Alan adı bağlama ve güvenli bağlantı kurulumu', description: 'Alan adınız siteye bağlansın ve güvenli bağlantı etkinleştirilsin.', price: 500, days: 0, billing: 'once' },
      { id: 'seo', category: 'support', name: 'Arama motorları için temel düzenleme', description: 'Arama sonuçlarındaki açıklamalar, sayfa listesi ve site hızı düzenlensin.', price: 1200, days: 2, billing: 'once' },
      { id: 'analytics', category: 'support', name: 'Ziyaretçi ve arama takibi kurulumu', description: 'Google Analytics ve Search Console ile ziyaretleri ve aramalardaki görünürlüğü izleyin.', price: 500, days: 0, billing: 'once' },
      { id: 'content', category: 'support', name: 'İçerik yazımı', description: 'Seçtiğiniz her sayfa için işinizi anlatan metinler hazırlansın.', price: 400, days: 1, billing: 'once', perPage: true },
      { id: 'training', category: 'support', name: 'Site yönetimi eğitimi', description: 'Sitenizi nasıl yöneteceğinizi anlatan 1 saatlik oturuma katılın.', price: 500, days: 0, billing: 'once' },
      { id: 'maintenance', category: 'support', name: 'Aylık bakım ve destek paketi', description: 'Düzenli bakım ve ihtiyaç duyduğunuzda destek alın. Proje toplamına eklenmez.', price: 750, days: 0, billing: 'monthly' },

      // Yıllık rakamlar yaklaşık örneklerdir; güncel ücretleri buradan değiştirin.
      { id: 'domain-com', category: 'domain', name: '.com', description: 'Yaygın olarak kullanılan uluslararası alan adı.', price: 600, days: 0, billing: 'yearly' },
      { id: 'domain-comtr', category: 'domain', name: '.com.tr', description: 'Türkiye odaklı işletmeler için alan adı.', price: 400, days: 0, billing: 'yearly' },
      { id: 'domain-net', category: 'domain', name: '.net', description: 'Farklı türde projeler için bir alan adı alternatifi.', price: 700, days: 0, billing: 'yearly' },
      { id: 'domain-org', category: 'domain', name: '.org', description: 'Topluluklar ve kuruluşlar için tercih edilen alan adı.', price: 650, days: 0, billing: 'yearly' },
      { id: 'domain-dev', category: 'domain', name: '.dev', description: 'Yazılım ve teknoloji projeleri için alan adı.', price: 900, days: 0, billing: 'yearly' },
      { id: 'domain-tc', category: 'domain', name: '.tc (KKTC için)', description: 'KKTC odaklı kullanım için tercih edilebilen alan adı.', price: 1500, days: 0, billing: 'yearly' },
      { id: 'domain-other', category: 'domain', name: 'Diğer / özel istek', description: 'İstediğiniz uzantı veya özel alan adı için ücret ayrıca araştırılır.', price: null, days: 0, billing: 'yearly' },
      { id: 'hosting-static', category: 'hosting', name: 'Statik yayın (GitHub Pages / Vercel ücretsiz plan)', description: 'Tanıtım siteleri için ücretsiz plan; planın kullanım sınırları geçerlidir.', price: 0, days: 0, billing: 'yearly' },
      { id: 'hosting-shared', category: 'hosting', name: 'Paylaşımlı hosting', description: 'Sitenizin ortak bir sunucuda barındırılması.', price: 1800, days: 0, billing: 'yearly' },
      { id: 'hosting-vps', category: 'hosting', name: 'VPS / özel sunucu', description: 'Daha fazla kaynak ve özel ayar isteyen projeler için sunucu.', price: 7200, days: 0, billing: 'yearly' },
      { id: 'hosting-supabase', category: 'hosting', name: 'Veritabanı için Supabase planı', description: 'Verilerinizi saklama hizmeti; sitenin yayını ayrıca planlanır. Ücretli plan için örnek tutardır.', price: 12000, days: 0, billing: 'yearly' }
    ]
  };

  const root = document.getElementById('priceCalculator');
  if (!root) return;
  const steps = document.getElementById('calculatorSteps');
  const selections = document.getElementById('calculatorSelections');
  const totals = document.getElementById('calculatorTotals');
  const form = document.getElementById('calculatorQuoteForm');
  const summaryDetails = document.getElementById('calculatorSummaryDetails');
  const dock = document.getElementById('calculatorDock');
  const dockTotals = document.getElementById('calculatorDockTotals');
  const navigation = document.getElementById('calculatorStepNavigation');
  const reviewPanel = document.getElementById('calculatorReviewPanel');
  const previousButton = document.getElementById('calculatorPrev');
  const nextButton = document.getElementById('calculatorNext');
  const overviewButton = document.getElementById('calculatorViewSummary');
  const panels = [];
  const navigationButtons = [];
  const visited = new Set([0]);
  let activeStep = 0;
  // Yalnızca arayüz başlıkları; fiyat ve süreler CONFIG içinde kalır.
  const stepCopy = {
    packages: { label: 'Paket', title: 'Nasıl bir siteye ihtiyacınız var?' },
    pages: { label: 'Sayfalar', title: 'Hangi sayfalar olsun?' },
    design: { label: 'Tasarım', title: 'Siteniz nasıl görünsün?' },
    features: { label: 'Özellikler', title: 'Neler yapabilsin?' },
    support: { label: 'Yayın ve destek', title: 'Yayına hazır hale getirelim.' },
    annual: { label: 'Yıllık giderler', title: 'Yıllık giderleri planlayın.' }
  };
  const flow = [
    ...CONFIG.steps.map(step => ({ ...stepCopy[step.id], id: step.id })),
    { id: 'quote', label: 'Teklif', title: 'Seçimlerinizi gönderin.' }
  ];
  const number = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
  const money = value => `${number.format(value)} TL`;
  const byId = new Map(CONFIG.items.map(item => [item.id, item]));
  const inCategory = category => CONFIG.items.filter(item => item.category === category);
  const defaults = {
    packageId: inCategory('packages')[0].id,
    domain: inCategory('domain')[0].id,
    hosting: inCategory('hosting')[0].id
  };
  const state = { ...defaults, selected: new Set(), extraPages: 0 };
  const controls = new Map();

  // Metinler DOM üzerinden yazılır; form verisi HTML olarak yorumlanmaz.
  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function priceLabel(item) {
    if (item.included) return 'Paketle dahil';
    if (item.category === 'packages') return `${money(item.price)} · ${item.days} iş günü`;
    const unit = item.billing === 'monthly' ? ' / ay (ayrı)' : item.quantity || item.perPage ? ' / sayfa' : '';
    return `+${money(item.price)}${unit}`;
  }

  function addOption(item, grid) {
    const card = node(item.quantity ? 'div' : 'label', 'card calc-option');
    const info = node('span', 'skill-info');
    const title = node('strong', '', item.name);
    title.id = `calc-title-${item.id}`;
    const description = node('span', '', item.description);
    description.id = `calc-description-${item.id}`;
    const price = node('span', 'calc-price', priceLabel(item));
    if (!item.quantity) {
      const input = node('input');
      input.type = item.category === 'packages' ? 'radio' : 'checkbox';
      input.id = `calc-${item.id}`;
      input.name = input.type === 'radio' ? 'calculator-package' : `calculator-${item.id}`;
      input.value = item.id;
      input.setAttribute('aria-describedby', description.id);
      input.checked = item.included || item.id === state.packageId;
      input.disabled = Boolean(item.included);
      card.htmlFor = input.id;
      card.append(input);
      controls.set(item.id, input);
      input.addEventListener('change', () => {
        if (item.category === 'packages') state.packageId = item.id;
        else if (input.checked) state.selected.add(item.id);
        else state.selected.delete(item.id);
        update();
      });
    }
    info.append(title, description, price);
    card.append(info);
    if (item.quantity) {
      const quantity = node('span', 'calc-quantity');
      const minus = node('button', 'btn-icon', '−');
      const plus = node('button', 'btn-icon', '+');
      const input = node('input', 'form-input');
      input.type = 'number';
      input.id = `calc-${item.id}`;
      input.min = '0';
      input.max = String(CONFIG.maxExtraPages);
      input.step = '1';
      input.value = '0';
      input.setAttribute('aria-labelledby', title.id);
      input.setAttribute('aria-describedby', description.id);
      minus.type = plus.type = 'button';
      minus.setAttribute('aria-label', 'Ek özel sayfa sayısını azalt');
      plus.setAttribute('aria-label', 'Ek özel sayfa sayısını artır');
      function setQuantity(value) {
        state.extraPages = Math.min(CONFIG.maxExtraPages, Math.max(0, Math.floor(Number(value) || 0)));
        input.value = String(state.extraPages);
        update();
      }
      minus.addEventListener('click', () => setQuantity(state.extraPages - 1));
      plus.addEventListener('click', () => setQuantity(state.extraPages + 1));
      input.addEventListener('input', () => setQuantity(input.value));
      controls.set(item.id, input);
      controls.set('extra-minus', minus);
      controls.set('extra-plus', plus);
      quantity.append(minus, input, plus);
      info.append(quantity);
    }
    grid.append(card);
  }

  function addAnnualSelect(category, labelText, grid) {
    const group = node('div', 'form-group');
    const label = node('label', '', labelText);
    const select = node('select', 'form-input');
    const description = node('p', 'form-hint calc-annual-description');
    select.id = `calc-${category}`;
    select.name = `calculator-${category}`;
    label.htmlFor = select.id;
    description.id = `${select.id}-description`;
    select.setAttribute('aria-describedby', description.id);
    inCategory(category).forEach(item => {
      const estimate = item.price === null ? 'yaklaşık yıllık ücret: teklif ile netleşir' : `yaklaşık yıllık ücret: ${money(item.price)}/yıl`;
      const option = node('option', '', `${item.name} — ${estimate}`);
      option.value = item.id;
      select.append(option);
    });
    controls.set(category, select);
    controls.set(`${category}-description`, description);
    select.addEventListener('change', () => {
      state[category] = select.value;
      update();
    });
    group.append(label, select, description);
    grid.append(group);
  }

  CONFIG.steps.forEach((step, index) => {
    const panel = node('section', 'card calc-step');
    panel.id = `calculator-step-${step.id}`;
    panel.hidden = index !== 0;
    const heading = node('div', 'calc-panel-heading');
    const title = node('h3', '', stepCopy[step.id].title);
    title.id = `calculator-heading-${step.id}`;
    title.tabIndex = -1;
    panel.setAttribute('aria-labelledby', title.id);
    heading.append(
      node('p', 'calc-panel-eyebrow', `Adım ${index + 1} / ${flow.length}`),
      title
    );
    const count = node('p', 'calc-selection-count');
    count.id = `calculator-count-${step.id}`;
    heading.append(count);
    const fieldset = node('fieldset');
    fieldset.append(node('legend', 'calc-step-hint', step.hint));
    const grid = node('div', 'calc-grid');
    fieldset.append(grid);
    if (step.id === 'annual') {
      addAnnualSelect('domain', 'Alan adı (domain)', grid);
      addAnnualSelect('hosting', 'Sunucu / hosting', grid);
      fieldset.append(node('p', 'calc-annual-note', 'Alan adı (domain) ücreti, seçtiğiniz alan adına göre değişir. Alan adı ve sunucu / hosting ücretleri yıllık olarak ayrıca ödenir ve proje ücretine dahil değildir. Kesin tutarlar, istediğiniz alan adı ve altyapı netleştikten sonra bildirilir.'));
    } else {
      inCategory(step.id).forEach(item => addOption(item, grid));
    }
    panel.append(heading, fieldset);
    steps.append(panel);
    panels.push(panel);
  });
  panels.push(reviewPanel);

  flow.forEach((step, index) => {
    const li = node('li');
    const button = node('button', 'calc-step-button');
    button.type = 'button';
    button.id = `calculator-nav-${step.id}`;
    button.setAttribute('aria-controls', panels[index].id);
    button.setAttribute('aria-label', `${index + 1}. adım: ${step.label}`);
    button.append(node('span', 'calc-step-number', String(index + 1)), node('span', 'calc-step-name', step.label));
    button.addEventListener('click', () => showStep(index));
    li.append(button);
    navigation.append(li);
    navigationButtons.push(button);
  });

  function calculate() {
    const pageCount = inCategory('pages').filter(item => item.included || state.selected.has(item.id)).length + state.extraPages;
    const entries = CONFIG.items.filter(item => item.included || item.id === state.packageId || state.selected.has(item.id) || (item.quantity && state.extraPages > 0)).map(item => {
      const quantity = item.quantity ? state.extraPages : item.perPage ? pageCount : 1;
      return { item, quantity, amount: item.price * quantity, days: item.days * quantity };
    });
    const once = entries.filter(entry => entry.item.billing === 'once');
    const lower = once.reduce((sum, entry) => sum + entry.amount, 0);
    const monthly = entries.filter(entry => entry.item.billing === 'monthly').reduce((sum, entry) => sum + entry.amount, 0);
    const annualItems = [byId.get(state.domain), byId.get(state.hosting)];
    return {
      entries, pageCount, lower, upper: lower * CONFIG.upperMultiplier, monthly,
      days: once.reduce((sum, entry) => sum + entry.days, 0),
      annualItems,
      annual: annualItems.reduce((sum, item) => sum + (item.price ?? 0), 0),
      unknownAnnual: annualItems.some(item => item.price === null)
    };
  }

  function annualText(result) {
    return `yaklaşık ${money(result.annual)} / yıl${result.unknownAnnual ? ' + özel alan adı ücreti (netleşecek)' : ''}`;
  }

  function entryText(entry) {
    const { item, quantity, amount } = entry;
    const count = item.quantity || item.perPage ? ` × ${quantity} sayfa` : '';
    const price = item.included ? 'paketle dahil' : `${money(amount)}${item.billing === 'monthly' ? ' / ay (ayrı)' : ''}`;
    return `${item.name}${count}: ${price}`;
  }

  function update() {
    const result = calculate();
    const amount = node('p', 'calc-total', `${number.format(result.lower)} – ${money(result.upper)}`);
    totals.replaceChildren(
      node('p', 'calc-total-label', 'Tek seferlik proje ücreti'), amount,
      node('p', 'calc-total-line', `Tahmini süre: ${result.days} iş günü`),
      node('p', 'calc-total-line', `Yıllık giderler (ayrı): ${annualText(result)}`),
      node('p', 'calc-total-line', `Aylık bakım (ayrı): ${result.monthly ? `${money(result.monthly)} / ay` : 'seçilmedi'}`)
    );
    dockTotals.replaceChildren(
      node('p', 'calc-dock-price', `${number.format(result.lower)} – ${money(result.upper)}`),
      node('p', 'calc-dock-meta', `Tahmini süre: ${result.days} iş günü`),
      node('p', 'calc-dock-costs', `Yıllık (ayrı): ${annualText(result)}${result.monthly ? ` · Bakım: ${money(result.monthly)} / ay` : ''}`)
    );
    syncStepCounts(result);
    // Özet düğmesi kaldırılınca klavye odağını sıradaki kaleme taşı.
    const focusedId = selections.contains(document.activeElement) ? document.activeElement.dataset.remove : null;
    const previousButtons = [...selections.querySelectorAll('button')];
    const previousIndex = previousButtons.indexOf(document.activeElement);
    selections.replaceChildren();
    result.entries.forEach(entry => {
      const li = node('li');
      const removable = !entry.item.included && entry.item.category !== 'packages';
      const control = node(removable ? 'button' : 'span', `chip-btn${removable ? '' : ' calc-included'}`, `${entryText(entry)}${removable ? ' ×' : ''}`);
      if (removable) {
        control.type = 'button';
        control.dataset.remove = entry.item.id;
        control.setAttribute('aria-label', `${entryText(entry)} — kaldır`);
        control.addEventListener('click', () => {
          if (entry.item.quantity) state.extraPages = 0;
          else state.selected.delete(entry.item.id);
          update();
        });
      }
      li.append(control);
      selections.append(li);
    });
    if (focusedId) {
      const buttons = [...selections.querySelectorAll('button')];
      (buttons.find(button => button.dataset.remove === focusedId) || buttons[Math.min(previousIndex, buttons.length - 1)] || document.getElementById('calculatorReset')).focus({ preventScroll: true });
    }
    CONFIG.items.forEach(item => {
      const input = controls.get(item.id);
      if (!input || item.quantity) return;
      input.checked = item.included || item.id === state.packageId || state.selected.has(item.id);
    });
    controls.get('extra').value = String(state.extraPages);
    controls.get('extra-minus').disabled = state.extraPages === 0;
    controls.get('extra-plus').disabled = state.extraPages === CONFIG.maxExtraPages;
    for (const category of ['domain', 'hosting']) {
      controls.get(category).value = state[category];
      controls.get(`${category}-description`).textContent = byId.get(state[category]).description;
    }
  }

  document.getElementById('calculatorReset').addEventListener('click', () => {
    Object.assign(state, defaults, { extraPages: 0 });
    state.selected.clear();
    update();
    showStep(0);
  });

  function validate() {
    const name = form.elements.name.value.trim();
    const contact = form.elements.contact.value.trim();
    const phone = contact.replace(/[\s().-]/g, '');
    const errors = {
      quoteName: name ? '' : 'Lütfen adınızı ve soyadınızı yazın.',
      quoteContact: !contact ? 'Lütfen e-posta adresinizi veya telefon numaranızı yazın.'
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) || /^\+?\d{10,15}$/.test(phone) ? ''
          : 'Geçerli bir e-posta adresi veya en az 10 haneli telefon numarası yazın.'
    };
    let firstInvalid;
    Object.entries(errors).forEach(([id, message]) => {
      const input = document.getElementById(id);
      const error = document.getElementById(`${id}Error`);
      error.textContent = message;
      error.hidden = !message;
      input.setAttribute('aria-invalid', String(Boolean(message)));
      input.setCustomValidity(message);
      if (message && !firstInvalid) firstInvalid = input;
    });
    const error = document.getElementById('quoteFormError');
    error.hidden = !firstInvalid;
    error.textContent = firstInvalid ? 'Lütfen işaretli alanları kontrol edin. Ad Soyad ve E-posta veya telefon alanları zorunludur.' : '';
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  form.addEventListener('input', event => {
    if (!['quoteName', 'quoteContact'].includes(event.target.id)) return;
    event.target.setCustomValidity('');
    event.target.removeAttribute('aria-invalid');
    document.getElementById(`${event.target.id}Error`).hidden = true;
    document.getElementById('quoteFormError').hidden = true;
  });

  function quoteText() {
    const result = calculate();
    const lines = [
      CONFIG.subject, '',
      `Ad Soyad: ${form.elements.name.value.trim()}`,
      `E-posta veya telefon: ${form.elements.contact.value.trim()}`,
      `İstenen alan adı: ${form.elements.domain.value.trim() || 'Belirtilmedi'}`,
      `Proje açıklaması: ${form.elements.description.value.trim() || 'Belirtilmedi'}`, ''
    ];
    CONFIG.steps.filter(step => step.id !== 'annual').forEach(step => {
      const entries = result.entries.filter(entry => entry.item.category === step.id);
      lines.push(step.title, ...(entries.length ? entries.map(entry => `- ${entryText(entry)}`) : ['- Seçilmedi']), '');
    });
    lines.push(
      `Hazırlanacak sayfa adedi: ${result.pageCount}`,
      `Tek seferlik proje ücreti: ${number.format(result.lower)} – ${money(result.upper)}`,
      `Tahmini süre: ${result.days} iş günü`,
      `Aylık bakım (ayrı): ${result.monthly ? `${money(result.monthly)} / ay` : 'Seçilmedi'}`, '',
      '6. Yıllık giderler (proje toplamına dahil değildir)',
      ...result.annualItems.map(item => `- ${item.name}: ${item.price === null ? 'teklif ile netleşir' : `yaklaşık ${money(item.price)} / yıl`}`),
      `Yıllık giderler (ayrı): ${annualText(result)}`, '',
      steps.querySelector('.calc-annual-note').textContent,
      'Ödeme sağlayıcı komisyonları ve üçüncü taraf hizmet ücretleri ayrıca değerlendirilir.',
      'Bu tahmini bir tekliftir. Kesin fiyat, proje kapsamı netleştikten sonra belirlenir.'
    );
    return lines.join('\n');
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!validate()) return;
    const body = encodeURIComponent(quoteText());
    if (event.submitter?.value === 'whatsapp') {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${body}`, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(CONFIG.subject)}&body=${body}`;
    }
  });

  // Adımlar arasında giderken seçimler ve hesaplama durumu korunur.
  function showStep(index, moveFocus = true) {
    activeStep = Math.max(0, Math.min(flow.length - 1, index));
    visited.add(activeStep);
    panels.forEach((panel, position) => { panel.hidden = position !== activeStep; });
    steps.hidden = activeStep === flow.length - 1;
    navigationButtons.forEach((button, position) => {
      if (position === activeStep) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
      button.dataset.visited = String(visited.has(position));
    });
    const current = flow[activeStep];
    document.getElementById('calculatorProgressText').textContent = `Adım ${activeStep + 1} / ${flow.length} — ${current.label}`;
    const progress = document.getElementById('calculatorProgress');
    progress.setAttribute('aria-valuenow', String(activeStep + 1));
    progress.setAttribute('aria-valuetext', `${activeStep + 1}. adım: ${current.label}`);
    document.getElementById('calculatorProgressFill').style.width = `${(activeStep + 1) / flow.length * 100}%`;
    document.getElementById('calculatorDockStep').textContent = `${activeStep + 1} / ${flow.length}`;
    previousButton.disabled = activeStep === 0;
    nextButton.textContent = activeStep === flow.length - 1 ? 'E-posta ile gönder' : 'Devam et →';
    overviewButton.hidden = activeStep === flow.length - 1;
    const button = navigationButtons[activeStep];
    navigation.parentElement.scrollLeft = Math.max(0, button.offsetLeft - navigation.offsetLeft - navigation.parentElement.clientWidth / 2 + button.offsetWidth / 2);
    if (moveFocus) {
      panels[activeStep].querySelector('h3').focus({ preventScroll: true });
      document.getElementById('calculatorWizard').scrollIntoView({ block: 'start', behavior: 'instant' });
    }
  }

  function syncStepCounts(result) {
    CONFIG.steps.forEach(step => {
      const count = document.getElementById(`calculator-count-${step.id}`);
      if (step.id === 'packages') count.textContent = '1 paket seçili';
      else if (step.id === 'pages') count.textContent = `${result.pageCount} sayfa seçili`;
      else if (step.id === 'annual') count.textContent = 'Proje ücretinden ayrı';
      else {
        const selected = inCategory(step.id).filter(item => state.selected.has(item.id)).length;
        count.textContent = selected ? `${selected} ek hizmet seçili` : 'İsteğe bağlı';
      }
    });
  }

  previousButton.addEventListener('click', () => showStep(activeStep - 1));
  nextButton.addEventListener('click', () => {
    if (activeStep < flow.length - 1) showStep(activeStep + 1);
    else form.requestSubmit(form.querySelector('button[value="email"]'));
  });
  overviewButton.addEventListener('click', () => showStep(flow.length - 1));

  // Alt çubuğun gerçek yüksekliği kadar yer ayır; içerik arkasında kalmasın.
  function reserveDockSpace() {
    document.documentElement.style.setProperty('--calculator-dock-height', `${Math.ceil(dock.getBoundingClientRect().height)}px`);
  }
  summaryDetails.open = true;
  update();
  showStep(0, false);
  root.hidden = false;
  dock.hidden = false;
  reserveDockSpace();
  if ('ResizeObserver' in window) new ResizeObserver(reserveDockSpace).observe(dock);
  else window.addEventListener('resize', reserveDockSpace);
})();
