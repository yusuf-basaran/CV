# Web Sitesi Fiyat Hesaplayıcı — ekleme rehberi

Bu rehber SEO düzenlemelerinden sonraki dosya yapısına göre güncellenmiştir. Tam head ve JSON-LD için SEO-KURULUM.md dosyasını da kullanın. Kaynak CSS/JS değişikliklerinden sonra `npm ci` ve `npm run build` çalıştırarak yayınlanan `.min` dosyalarını güncelleyin.

Güncellenmiş dosyalara entegrasyon yapılmıştır. Aşağıdaki bloklar, aynı değişikliği orijinal sürüme elle uygulamak isteyenler içindir; güncellenmiş index.html içine ikinci kez eklemeyin.

## Değişen dosyalar

- `index.html`: mevcut `</style>` sonrasında CSS/JS bağlantıları; üst çubuğa Hizmetler bağlantısı; Projeler ile Deneyim arasına hesaplayıcı ve teklif formu.
- `css/price-calculator.css`: yeni bölümün düzeni, mevcut CSS değişkenleri ve kart/buton/form sınıflarıyla seçili durumlar, mobil alt toplam kutusu ve yazdırma kuralı.
- `js/price-calculator.js`: tek `CONFIG` nesnesi, veriden üretilen seçenekler, hesaplama, özet/sıfırlama, doğrulama ve e-posta/WhatsApp metinleri.

Mevcut CSS ve uygulama kodu, SEO kapsamında css/site.css ve js/site.js dosyalarına taşınmıştır. Tasarım değişkenleri ve yönetici / Supabase işleyişi korunmuştur. Projelere JS kapalıyken görülen statik bağlantılar eklenmiştir. Yönetici ve proje modallarında değişiklik yapılmamıştır. Yeni harici kütüphane eklenmemiştir.

## HTML — yerleştirilecek yerler

`index.html` içinde `/css/site.min.css` bağlantısından sonra, `</head>` öncesine:

```html
  <!-- Hesaplayıcı: mevcut değişkenleri ve bileşen stillerini kullanır. -->
  <link rel="stylesheet" href="/css/price-calculator.min.css">
  <script src="/js/price-calculator.min.js" defer></script>
```

Üst çubukta `.nav-status` kapanışı ile `.nav-actions` arasına:

```html
      <nav class="services-nav" aria-label="Bölüm menüsü">
        <a class="chip-btn" href="#hizmetler">Hizmetler</a>
      </nav>
```

Projeler bölümünün kapanışından sonra ve `<!-- Deneyim -->` yorumundan önce:

```html
      <!-- Web Sitesi Fiyat Hesaplayıcı -->
      <section id="hizmetler" aria-labelledby="servicesTitle">
        <h2 class="section-title" id="servicesTitle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"></rect><path d="M8 6h8M8 10h2m4 0h2M8 14h2m4 0h2M8 18h2m4 0h2"></path></svg>
          <span>Web Sitesi Yaptırma: Özelliğe Göre Fiyat Hesaplayıcı</span>
        </h2>
        <p class="calc-intro">İhtiyacınıza uygun paketi ve ek hizmetleri seçin, tahmini bütçenizi hemen görün. Her sayfa size özel ve ayrıntılı olarak hazırlanır.</p>
        <noscript><p class="about-card">Fiyat hesaplayıcı için JavaScript’i etkinleştirin. Teklif için <a class="ref-action" href="mailto:yusufbasaran63@hotmail.com">e-posta gönderebilirsiniz.</a></p></noscript>
        <div id="priceCalculator" hidden>
          <!-- Adımlar ve tüm seçenekler tek JS yapılandırmasından üretilir. -->
          <div id="calculatorSteps"></div>
          <div class="calc-summary-slot">
            <aside class="card calc-summary" id="calculatorSummary" aria-labelledby="calculatorSummaryTitle">
              <h3 class="card-title" id="calculatorSummaryTitle">Tahmini teklifiniz</h3>
              <div id="calculatorTotals" role="status" aria-live="polite" aria-atomic="true"></div>
              <details class="calc-summary-details" id="calculatorSummaryDetails" open>
                <summary>Seçim özeti ve notlar</summary>
                <p class="form-hint">Ek kalemleri kaldırmak için üzerlerine tıklayın. Temel paketi 1. adımdan değiştirebilirsiniz.</p>
                <ul class="calc-selection-list" id="calculatorSelections" aria-label="Seçilen kalemler"></ul>
                <button type="button" class="action-btn" id="calculatorReset">Seçimleri Sıfırla</button>
                <p class="calc-note">Bu tahmini bir tekliftir. Kesin fiyat, proje kapsamı netleştikten sonra belirlenir.</p>
                <p class="calc-note">Aradığınız özellik listede yoksa bana yazın, özel teklif hazırlayayım.</p>
              </details>
            </aside>
          </div>
          <form class="card calc-quote" id="calculatorQuoteForm" aria-labelledby="calculatorQuoteTitle" novalidate>
            <h3 class="card-title" id="calculatorQuoteTitle">Teklif Al</h3>
            <p class="calc-note">Seçimleriniz ve aşağıdaki bilgiler e-posta veya WhatsApp mesajına eklenir. Göndermeden önce mesajı gözden geçirebilirsiniz.</p>
            <div class="calc-grid">
              <div class="form-group">
                <label for="quoteName">Ad Soyad (zorunlu)</label>
                <input class="form-input" id="quoteName" name="name" autocomplete="name" maxlength="120" required aria-describedby="quoteNameError">
                <p class="calc-error" id="quoteNameError" hidden></p>
              </div>
              <div class="form-group">
                <label for="quoteContact">E-posta veya telefon (zorunlu)</label>
                <input class="form-input" id="quoteContact" name="contact" autocomplete="email" maxlength="160" required aria-describedby="quoteContactError" placeholder="E-posta adresiniz veya telefonunuz">
                <p class="calc-error" id="quoteContactError" hidden></p>
              </div>
            </div>
            <div class="form-group">
              <label for="quoteDomain">İstediğiniz alan adı (isteğe bağlı)</label>
              <input class="form-input" id="quoteDomain" name="domain" maxlength="253" autocapitalize="none" spellcheck="false" placeholder="ornekfirma.com">
            </div>
            <div class="form-group">
              <label for="quoteDescription">Projenizi kısaca anlatın (isteğe bağlı)</label>
              <textarea class="form-textarea" id="quoteDescription" name="description" maxlength="3000" rows="4"></textarea>
            </div>
            <p class="calc-error" id="quoteFormError" role="alert" hidden></p>
            <div class="calc-actions">
              <button class="action-btn" type="submit" name="channel" value="email">E-posta ile Teklif Al</button>
              <button class="action-btn" type="submit" name="channel" value="whatsapp">WhatsApp ile gönder</button>
            </div>
          </form>
        </div>
        <article class="calc-faq" id="fiyat-sss" aria-labelledby="priceFaqTitle">
          <h3 class="card-title" id="priceFaqTitle">Web sitesi yaptırma hakkında sık sorulan sorular</h3>
          <details class="card calc-faq-item">
            <summary><h4>Web sitesi fiyatları neye göre değişir?</h4></summary>
            <p>Fiyat; seçilen temel pakete, sayfa sayısına, tasarım ihtiyaçlarına ve ek özelliklere göre değişir. Hesaplayıcı tahmini bir fiyat aralığı gösterir. Kesin tutar, proje kapsamı netleştikten sonra belirlenir.</p>
          </details>
          <details class="card calc-faq-item">
            <summary><h4>Domain ve sunucu ücreti proje fiyatına dahil mi?</h4></summary>
            <p>Hayır. Alan adı (domain) ve sunucu / hosting ücretleri yıllık olarak ayrıca ödenir ve tek seferlik proje ücretine dahil değildir. Kesin yıllık tutarlar, istediğiniz alan adı ve altyapı belirlendikten sonra bildirilir.</p>
          </details>
          <details class="card calc-faq-item">
            <summary><h4>Web sitesi ne kadar sürede hazırlanır?</h4></summary>
            <p>Temel paketler için tahmini süre 5–25 iş günüdür. Seçilen ek sayfa ve özellikler hazırlık süresini artırabilir. İçeriklerin teslimi ve proje kapsamı değerlendirildikten sonra çalışma takvimi kesinleştirilir.</p>
          </details>
          <details class="card calc-faq-item">
            <summary><h4>Revizyon hakkı var mı?</h4></summary>
            <p>Revizyon sayısı, kapsamı ve teslimden sonraki düzenlemelerin koşulları kesin teklif hazırlanırken birlikte belirlenir. Başlangıçta kararlaştırılan kapsamı aşan istekler ayrıca fiyatlandırılabilir.</p>
          </details>
          <details class="card calc-faq-item">
            <summary><h4>Sitenin yayına alınmasını da yapıyor musunuz?</h4></summary>
            <p>Evet. Hesaplayıcıdan yayına alma hizmetini seçebilirsiniz. GitHub ve Vercel kurulumu ile alan adı bağlama hizmetleri ayrı kalemlerdir. Alan adı ve hosting sağlayıcılarının yıllık ücretleri ayrıca ödenir.</p>
          </details>
          <details class="card calc-faq-item">
            <summary><h4>Web sitesi için nasıl teklif alabilirim?</h4></summary>
            <p>İhtiyacınıza uygun paketi ve ek özellikleri seçin. Adınızı ve iletişim bilginizi Teklif Al formuna yazın; e-posta veya WhatsApp ile seçimlerinizi iletin. Listede olmayan ihtiyaçlarınızı da proje açıklamasına ekleyebilirsiniz.</p>
          </details>
        </article>
      </section>
```

## CSS — yeni dosyanın tamamı

`css` klasörü oluşturup aşağıdaki kodu `css/price-calculator.css` olarak kaydedin. Mevcut CSS değişkenlerini veya stillerini değiştirmeyin. Kaydettikten sonra npm run build ile .min.css sürümünü yenileyin.

```css
/* Mevcut renkler, kartlar, butonlar ve form sınıfları korunur. */
.top-bar:has(.services-nav) { flex-wrap: wrap; gap: 10px; }
#hizmetler { scroll-margin-top: 150px; }
#hizmetler .section-title > span { min-width: 0; }
#hizmetler [hidden] { display: none !important; }
#hizmetler .calc-intro, #hizmetler .calc-note {
  color: var(--ink-soft); font-size: 0.88rem; line-height: 1.7; margin-bottom: 16px;
}
#hizmetler .calc-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
#hizmetler .calc-step { margin-bottom: 12px; }
#hizmetler .calc-step > summary, #hizmetler .calc-summary-details > summary {
  cursor: pointer; font-weight: 600; line-height: 1.6; padding: 4px 0;
}
#hizmetler .calc-step > summary h3 { display: inline; font: inherit; }
#hizmetler .calc-step[open] > summary { margin-bottom: 14px; }
#hizmetler .calc-step fieldset { border: 0; min-width: 0; }
#hizmetler .calc-step legend { margin-bottom: 12px; font-size: 0.85rem; color: var(--ink-soft); line-height: 1.7; }
#hizmetler .calc-option { display: flex; gap: 12px; align-items: flex-start; cursor: pointer; min-width: 0; }
#hizmetler .calc-option:has(input:checked) { border-color: var(--accent); background: var(--accent-glow); }
#hizmetler .calc-option:focus-within { outline: 2px solid var(--accent); outline-offset: 2px; }
#hizmetler .calc-option input[type="radio"], #hizmetler .calc-option input[type="checkbox"] {
  margin-top: 4px; accent-color: var(--accent); flex-shrink: 0; width: 18px; height: 18px;
}
#hizmetler .skill-info { min-width: 0; overflow-wrap: anywhere; }
#hizmetler .calc-option .calc-price { color: var(--accent); font-weight: 600; margin-top: 8px; }
#hizmetler .calc-quantity { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
#hizmetler .calc-quantity .btn-icon { flex-shrink: 0; font: inherit; min-width: 44px; min-height: 44px; }
#hizmetler .calc-quantity input { width: 76px; text-align: center; padding: 10px 4px; }
#hizmetler .calc-annual-note { margin-top: 16px; border-left: 3px solid var(--accent); padding-left: 14px; color: var(--ink); line-height: 1.8; font-size: 0.9rem; }
#hizmetler select { color-scheme: dark; }
[data-theme="light"] #hizmetler select { color-scheme: light; }
#hizmetler .calc-annual-description { min-height: 3em; }
#hizmetler .calc-summary-slot { margin: 20px 0; }
#hizmetler .calc-summary:hover, #hizmetler .calc-step:hover, #hizmetler .calc-quote:hover { transform: none; }
#hizmetler .calc-total { font-family: 'Outfit', sans-serif; font-size: clamp(1.4rem, 4vw, 1.9rem); color: var(--accent); margin: 8px 0; }
#hizmetler .calc-total-label { font-size: 0.78rem; color: var(--ink-soft); margin-top: 10px; }
#hizmetler .calc-total-line { font-size: 0.85rem; line-height: 1.65; color: var(--ink-soft); }
#hizmetler .calc-summary-details { margin-top: 10px; }
#hizmetler .calc-selection-list { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0 16px; }
#hizmetler .calc-selection-list .chip-btn { white-space: normal; text-align: left; font-family: inherit; min-height: 44px; overflow-wrap: anywhere; }
#hizmetler .calc-selection-list .calc-included { cursor: default; }
#hizmetler .calc-summary .calc-note { margin: 12px 0 0; }
#hizmetler .calc-quote > h3 { margin-bottom: 12px; }
#hizmetler .calc-actions { display: flex; flex-wrap: wrap; gap: 10px; }
#hizmetler .calc-actions > button { flex: 1 1 200px; max-width: none; }
#hizmetler .calc-error { color: var(--danger); font-size: 0.85rem; line-height: 1.6; margin: 6px 0 12px; }
#hizmetler [aria-invalid="true"] { border-color: var(--danger); }
#hizmetler :is(.form-input, .form-textarea):focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

/* Görünür SSS ile statik JSON-LD yanıtları birlikte güncellenir. */
#hizmetler .calc-faq { margin-top: 24px; }
#hizmetler .calc-faq > h3 { margin-bottom: 16px; line-height: 1.6; }
#hizmetler .calc-faq-item { margin-bottom: 12px; }
#hizmetler .calc-faq-item:hover { transform: none; }
#hizmetler .calc-faq-item > summary { cursor: pointer; line-height: 1.7; }
#hizmetler .calc-faq-item h4 { display: inline; font: inherit; font-weight: 600; }
#hizmetler .calc-faq-item p { margin-top: 12px; color: var(--ink-soft); font-size: 0.88rem; line-height: 1.8; }

@media (max-width: 680px) {
  .services-nav { order: 3; flex-basis: 100%; text-align: center; }
  #hizmetler .calc-grid { grid-template-columns: minmax(0, 1fr); }
  #hizmetler .calc-step, #hizmetler .calc-quote { padding: 16px; }
  #hizmetler:has(.calc-mobile-active) { padding-bottom: 260px; }
  #hizmetler .calc-mobile-active .calc-summary {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
    margin: 0; padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
    max-height: 65vh; max-height: 65dvh; overflow-y: auto;
    background: var(--bg); border-radius: var(--radius) var(--radius) 0 0;
  }
  #hizmetler .calc-mobile-active .calc-summary-slot { min-height: 220px; }
  #hizmetler .calc-total { margin: 4px 0; }
  #hizmetler .calc-total-label { margin-top: 4px; }
  #hizmetler :is(input, textarea, select, button, summary, a) { scroll-margin-top: 150px; scroll-margin-bottom: 260px; }
}

/* CV / PDF çıktısında mevcut özgeçmiş akışı korunur. */
@media print { #hizmetler, .services-nav { display: none !important; } }
```

## JavaScript — yeni dosyanın tamamı

`js` klasörü oluşturup aşağıdaki kodu `js/price-calculator.js` olarak kaydedin. Mevcut Supabase script bloğuna eklemeyin; yukarıdaki `defer` bağlantısı, npm run build ile üretilen .min.js sürümünü bağımsız yükler.

```javascript
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
  const section = document.getElementById('hizmetler');
  const steps = document.getElementById('calculatorSteps');
  const selections = document.getElementById('calculatorSelections');
  const totals = document.getElementById('calculatorTotals');
  const form = document.getElementById('calculatorQuoteForm');
  const summaryDetails = document.getElementById('calculatorSummaryDetails');
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
      const quantity = node('div', 'calc-quantity');
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
    const details = node('details', 'card calc-step');
    details.id = `calculator-step-${step.id}`;
    details.open = index === 0;
    const summary = node('summary');
    summary.append(node('h3', '', step.title));
    const fieldset = node('fieldset');
    fieldset.append(node('legend', '', step.hint));
    const grid = node('div', 'calc-grid');
    fieldset.append(grid);
    if (step.id === 'annual') {
      addAnnualSelect('domain', 'Alan adı (domain)', grid);
      addAnnualSelect('hosting', 'Sunucu / hosting', grid);
      fieldset.append(node('p', 'calc-annual-note', 'Alan adı (domain) ücreti, seçtiğiniz alan adına göre değişir. Alan adı ve sunucu / hosting ücretleri yıllık olarak ayrıca ödenir ve proje ücretine dahil değildir. Kesin tutarlar, istediğiniz alan adı ve altyapı netleştikten sonra bildirilir.'));
    } else {
      inCategory(step.id).forEach(item => addOption(item, grid));
    }
    details.append(summary, fieldset);
    steps.append(details);
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

  // Mobilde yalnızca Hizmetler görünürken sabitle; diğer CV bölümlerini örtme.
  const mobile = window.matchMedia('(max-width: 680px)');
  let sectionVisible = false;
  function syncDock() {
    root.classList.toggle('calc-mobile-active', mobile.matches && sectionVisible);
  }
  function syncViewport() {
    summaryDetails.open = !mobile.matches;
    syncDock();
  }
  mobile.addEventListener('change', syncViewport);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      sectionVisible = entries[0].isIntersecting;
      syncDock();
    }).observe(section);
  } else {
    const checkVisibility = () => {
      const rect = section.getBoundingClientRect();
      sectionVisible = rect.top < window.innerHeight && rect.bottom > 0;
      syncDock();
    };
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);
    checkVisibility();
  }
  syncViewport();
  update();
  root.hidden = false;
})();
```

## Fiyat ve süre güncelleme

Tüm ticari değerler `js/price-calculator.js` dosyasının başındaki `CONFIG` içindedir. Her kalemde `id`, `category`, `name`, `description`, `price`, `days` ve `billing` alanları bulunur.

- `price`: TL cinsinden sayı; nokta ile binlik ayırıcı yazmayın. Örneğin 12500.
- `days`: hazırlama için ilave iş günü. Paketler temel süreyi, ek hizmetler buna eklenecek süreyi belirtir. Ek hizmet süreleri tahmini varsayımlardır; kendi iş akışınıza göre güncelleyin.
- `billing`: `once` tek seferlik; `yearly` yıllık; `monthly` aylık.
- `perPage: true`: içerik ücretini ve süresini seçili toplam sayfa adediyle çarpar. Ana Sayfa, seçili sayfalar ve ek özel sayfa adedi sayılır.
- `quantity: true`: ek özel sayfa adediyle çarpılır. 0–100 aralığı `maxExtraPages` ile değiştirilebilir.
- `price: null`: özel alan adının fiyatı henüz belli değil. Bilinen yıllık ücretin yanında “özel alan adı ücreti (netleşecek)” gösterilir; ücretsiz varsayılmaz.

İlk paket, `.com` ve ücretsiz statik yayın varsayılan seçilir. Ana Sayfa her pakette dahildir. İsteğe bağlı sayfa hazırlama kalemleri, verilen fiyat listesi doğrultusunda paket ücretine eklenir. Paket adındaki sayfa sınırı otomatik ek sayfa seçmez veya indirim uygulamaz; nihai kapsam teklif sırasında netleştirilir.

Üst fiyat sınırı toplam × 1,25 olarak hesaplanır. Küsurat oluşursa Türkçe sayı biçimiyle korunur. Aylık bakım ve yıllık giderler bu çarpana ve proje toplamına girmez. Aylık bakım, yıllık gider toplamına da eklenmez.

## Kontrol ve kullanım notları

- Siteye yüklerken `index.html` ile birlikte `css` ve `js` klasörlerini de yükleyin. Bu rehber dosyasını yayınlamanız gerekmez.
- Alan adı ve hosting fiyatları yaklaşık örneklerdir. Güncel sağlayıcı ücretleri, kur, vergi ve alan adının özel fiyatı değişebilir; yayın öncesi CONFIG değerlerini güncelleyin.
- Bilgileri güvenle saklama kalemi Supabase bağlantısının kurulum ücretidir; yıllık Supabase planı ayrı hizmet bedelidir. Tek hosting seçici, bütün altyapı bileşenlerinin otomatik olarak yeterli olduğu anlamına gelmez.
- `mailto:` cihazdaki e-posta uygulamasını açar; e-postayı kullanıcı gönderir. Yerel e-posta uygulaması tanımlı değilse WhatsApp seçeneği kullanılabilir. Çok uzun mesajlarda cihazın e-posta bağlantısı sınırı etkili olabilir.
- Mobil toplam kutusu yalnızca Hizmetler görünürken sabitlenir. “Seçim özeti ve notlar” açılarak kalemler kaldırılabilir; diğer CV bölümlerinde alt kutu sabit kalmaz.
- Sıfırlama, hesaplayıcı seçimlerini varsayılana döndürür; yazılmış iletişim bilgilerini silmez.
- Hesaplayıcı CV/PDF çıktısında gizlenir; mevcut özgeçmiş akışı korunur.
- Bu sürüm GitHub’daki feat/web-price-calculator-seo dalında teslim edilir. Ana dala alınmadan önce SEO-KURULUM.md içindeki Vercel yönlendirme adımlarını uygulayın. Canlı domain ayarları değiştirilmemiştir.

## Doğrulama

Chromium tarayıcısında Playwright ile aşağıdakiler doğrulandı:

- Beş temel paketin fiyatı ve iş günü; 32 tek seferlik ek kalemin fiyatı.
- Çoklu seçim, ek sayfa adedi ve sayfa başına içerik yazımının birlikte hesaplanması. Örnek birleşik seçim: 16.000–20.000 TL, 24 iş günü; yıllık 2.700 TL ve aylık 750 TL ayrı.
- Özetten kalem kaldırma, klavye odağının korunması, sınır dışı sayfa adetleri ve varsayılanlara sıfırlama.
- Boş/yalnızca boşluk içeren zorunlu alanlar, hatalı iletişim bilgisi, telefon biçimi ve Türkçe hata mesajları.
- Türkçe karakterler, özel işaretler ve satır sonlarıyla e-posta/WhatsApp metinlerinin aynı olması; doğru alıcı, konu ve encodeURIComponent kodlaması. E-posta bağlantısının açılış isteği kontrol edildi; gerçek mesaj gönderilmedi.
- 320, 375, 390 ve 680 px ekranlarda yatay taşma olmaması, mobil kutunun ekran altına sabitlenmesi, klavyeyle açılıp kapanması ve Hizmetler dışına çıkınca sabitlemenin kalkması.
- Açık/koyu tema, CV/PDF çıktısında hesaplayıcının gizlenmesi, Beceriler filtresinin çalışması.
- Canlı Supabase proje listesinin yüklenmesi; yönetici ve proje modallarının açılıp Escape ile kapanması. Yönetici hesabıyla gerçek giriş, dosya yükleme veya veri yazma/silme işlemi yapılmadı.
- SEO öncesindeki uygulama koduyla js/site.js karşılaştırıldı; yalnızca proje görsellerine decoding="async" eklenmiştir. CSS değişkenleri kaynak site.css dosyasında korunmuştur. Tarayıcıda JavaScript çalışma hatası görülmedi.

Ayrıca `node --check js/price-calculator.js` ve `git diff --check` geçti. Test araçları siteye veya teslim paketine eklenmedi.
