# SEO ve meta etiketleri — tam kod ve yerleştirme rehberi

Düzenlemeler index.html ve bağlı dosyalara uygulanmıştır. Bu rehber aynı değişiklikleri elle uygulamak ve ileride güncellemek içindir. Güncellenmiş dosyalara bu blokları ikinci kez yapıştırmayın.

Ana adres her yerde **https://www.yusufbasaran.dev/** seçildi. Mevcut canlı yönlendirmeye uyum sağlandığı için yayın öncesi domain ayarı yapmanız gerekmez. Bu sürüm GitHub ana dalına doğrudan alınmak üzere hazırlanmıştır.

## 1. HTML başlangıcı ve head bloğunun tamamı

`index.html` başlangıcı şöyle kalır:

```html
<!DOCTYPE html>
<html lang="tr" dir="ltr" data-theme="dark">
```

Mevcut `<head>…</head>` bloğunu aşağıdakiyle değiştirin; eski title/meta/JSON-LD etiketlerini ayrıca bırakmayın. Böylece çift tanım oluşmaz.

İstenen başlık 64 karakterdi. 60 sınırını korumak için 56 karakterlik sürüm kullanıldı. Açıklama 156 karakterdir. Kıbrıs ve KKTC bilgileri açıklama, konum ve yapılandırılmış verilerde korunur.

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Tema titremesini önlemek için erken uygula -->
  <script>
    try {
      var t = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      document.documentElement.setAttribute('data-theme', t);
    } catch (e) {}
  </script>

  <!-- İkonlar ve paylaşım görseli kök dizinde tutulur. -->

  <title>Yusuf Başaran | Web Geliştirici &amp; IT Destek | Gazimağusa</title>
  <meta name="description" content="Gazimağusa, KKTC web geliştirici Yusuf Başaran. Kurumsal site, randevu sistemi ve IT destek için özelliklere göre web sitesi fiyatı hesaplayın, teklif alın.">
  <meta name="author" content="Yusuf Başaran">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#0d1117">
  <meta name="color-scheme" content="dark light">
  <meta name="keywords" content="web tasarım Gazimağusa, web sitesi yaptırma KKTC, freelance web geliştirici Kıbrıs, bilgisayar programcısı, IT destek, Bitrix24, HTML CSS JavaScript, Supabase">
  <meta name="geo.placename" content="Gazimağusa, Kıbrıs">
  <link rel="canonical" href="https://www.yusufbasaran.dev/">
  <!-- GOOGLE_SITE_VERIFICATION: Search Console'dan aldığın <meta name="google-site-verification" content="..."> satırını buraya yapıştır -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Paylaşım görseli 1200 × 630 piksel; profile.jpg yerine kullanılır. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Yusuf Başaran">
  <meta property="og:title" content="Yusuf Başaran | Web Geliştirici &amp; IT Destek | Gazimağusa">
  <meta property="og:description" content="Gazimağusa, KKTC web geliştirici Yusuf Başaran. Kurumsal site, randevu sistemi ve IT destek için özelliklere göre web sitesi fiyatı hesaplayın, teklif alın.">
  <meta property="og:url" content="https://www.yusufbasaran.dev/">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:image" content="https://www.yusufbasaran.dev/og-image.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Yusuf Başaran — Gazimağusa, Kıbrıs web geliştirici ve IT destek hizmetleri">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Yusuf Başaran | Web Geliştirici &amp; IT Destek | Gazimağusa">
  <meta name="twitter:description" content="Gazimağusa, KKTC web geliştirici Yusuf Başaran. Kurumsal site, randevu sistemi ve IT destek için özelliklere göre web sitesi fiyatı hesaplayın, teklif alın.">
  <meta name="twitter:image" content="https://www.yusufbasaran.dev/og-image.jpg">
  <meta name="twitter:image:alt" content="Yusuf Başaran — Gazimağusa, Kıbrıs web geliştirici ve IT destek hizmetleri">

  <!-- Statik şema: paket fiyatlarını değiştirirken bu katalog da güncellenir. -->
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.yusufbasaran.dev/#person",
      "name": "Yusuf Başaran",
      "jobTitle": "Web Geliştirici ve IT Destek",
      "url": "https://www.yusufbasaran.dev/",
      "image": "https://www.yusufbasaran.dev/profile.jpg",
      "email": "yusufbasaran63@hotmail.com",
      "telephone": "+905338493063",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Gazimağusa",
        "addressRegion": "KKTC",
        "addressCountry": "CY"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Doğu Akdeniz Üniversitesi"
      },
      "knowsAbout": [
        "HTML",
        "CSS",
        "JavaScript",
        "REST API",
        "Supabase",
        "Bitrix24",
        "Donanım arıza tespiti"
      ],
      "sameAs": [
        "https://github.com/yusuf-basaran"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.yusufbasaran.dev/#website",
      "name": "Yusuf Başaran | Web Geliştirici ve IT Destek",
      "url": "https://www.yusufbasaran.dev/",
      "inLanguage": "tr",
      "publisher": {
        "@id": "https://www.yusufbasaran.dev/#person"
      }
    },
    {
      "@type": [
        "ProfessionalService",
        "Service"
      ],
      "@id": "https://www.yusufbasaran.dev/#web-hizmeti",
      "name": "Web Sitesi Geliştirme Hizmeti",
      "url": "https://www.yusufbasaran.dev/",
      "image": "https://www.yusufbasaran.dev/og-image.jpg",
      "description": "Gazimağusa, KKTC ve Türkiye için web sitesi geliştirme ve IT destek hizmetleri.",
      "email": "yusufbasaran63@hotmail.com",
      "telephone": "+905338493063",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Gazimağusa",
        "addressRegion": "KKTC",
        "addressCountry": "CY"
      },
      "provider": {
        "@id": "https://www.yusufbasaran.dev/#person"
      },
      "founder": {
        "@id": "https://www.yusufbasaran.dev/#person"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Gazimağusa"
        },
        {
          "@type": "Place",
          "name": "KKTC"
        },
        {
          "@type": "Country",
          "name": "Türkiye"
        }
      ],
      "priceRange": "4.000 TL'den başlayan fiyatlar",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Sitesi Paketleri",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Tek Sayfa Tanıtım Sitesi",
            "price": 4000,
            "priceCurrency": "TRY",
            "url": "https://www.yusufbasaran.dev/",
            "description": "Başlangıç paket fiyatıdır. Ek özellikler, aylık bakım ve yıllık alan adı / hosting bedelleri ayrıdır.",
            "itemOffered": {
              "@type": "Service",
              "name": "Tek Sayfa Tanıtım Sitesi",
              "description": "İşinizi tek sayfada tanıtan web sitesi.",
              "provider": {
                "@id": "https://www.yusufbasaran.dev/#person"
              },
              "serviceType": "Web sitesi geliştirme"
            }
          },
          {
            "@type": "Offer",
            "name": "Çok Sayfalı Site (5 sayfaya kadar)",
            "price": 8000,
            "priceCurrency": "TRY",
            "url": "https://www.yusufbasaran.dev/",
            "description": "Başlangıç paket fiyatıdır. Ek özellikler, aylık bakım ve yıllık alan adı / hosting bedelleri ayrıdır.",
            "itemOffered": {
              "@type": "Service",
              "name": "Çok Sayfalı Site (5 sayfaya kadar)",
              "description": "Hizmetlerinizi ayrı sayfalarda anlatan web sitesi.",
              "provider": {
                "@id": "https://www.yusufbasaran.dev/#person"
              },
              "serviceType": "Web sitesi geliştirme"
            }
          },
          {
            "@type": "Offer",
            "name": "Kurumsal Site (10 sayfaya kadar)",
            "price": 13000,
            "priceCurrency": "TRY",
            "url": "https://www.yusufbasaran.dev/",
            "description": "Başlangıç paket fiyatıdır. Ek özellikler, aylık bakım ve yıllık alan adı / hosting bedelleri ayrıdır.",
            "itemOffered": {
              "@type": "Service",
              "name": "Kurumsal Site (10 sayfaya kadar)",
              "description": "Firmanızı ve çalışmalarınızı kapsamlı biçimde tanıtan web sitesi.",
              "provider": {
                "@id": "https://www.yusufbasaran.dev/#person"
              },
              "serviceType": "Web sitesi geliştirme"
            }
          },
          {
            "@type": "Offer",
            "name": "Blog / Haber Sitesi",
            "price": 12000,
            "priceCurrency": "TRY",
            "url": "https://www.yusufbasaran.dev/",
            "description": "Başlangıç paket fiyatıdır. Ek özellikler, aylık bakım ve yıllık alan adı / hosting bedelleri ayrıdır.",
            "itemOffered": {
              "@type": "Service",
              "name": "Blog / Haber Sitesi",
              "description": "Yazı ve haber paylaşımına yönelik web sitesi.",
              "provider": {
                "@id": "https://www.yusufbasaran.dev/#person"
              },
              "serviceType": "Web sitesi geliştirme"
            }
          },
          {
            "@type": "Offer",
            "name": "Özel Web Uygulaması",
            "price": 20000,
            "priceCurrency": "TRY",
            "url": "https://www.yusufbasaran.dev/",
            "description": "Başlangıç paket fiyatıdır. Ek özellikler, aylık bakım ve yıllık alan adı / hosting bedelleri ayrıdır.",
            "itemOffered": {
              "@type": "Service",
              "name": "Özel Web Uygulaması",
              "description": "Yönetim ekranları, kullanıcı yetkileri ve veri saklama ihtiyaçlarına özel uygulama.",
              "provider": {
                "@id": "https://www.yusufbasaran.dev/#person"
              },
              "serviceType": "Web sitesi geliştirme"
            }
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.yusufbasaran.dev/#fiyat-sss",
      "url": "https://www.yusufbasaran.dev/",
      "inLanguage": "tr",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Web sitesi fiyatları neye göre değişir?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fiyat; seçilen temel pakete, sayfa sayısına, tasarım ihtiyaçlarına ve ek özelliklere göre değişir. Hesaplayıcı tahmini bir fiyat aralığı gösterir. Kesin tutar, proje kapsamı netleştikten sonra belirlenir."
          }
        },
        {
          "@type": "Question",
          "name": "Domain ve sunucu ücreti proje fiyatına dahil mi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hayır. Alan adı (domain) ve sunucu / hosting ücretleri yıllık olarak ayrıca ödenir ve tek seferlik proje ücretine dahil değildir. Kesin yıllık tutarlar, istediğiniz alan adı ve altyapı belirlendikten sonra bildirilir."
          }
        },
        {
          "@type": "Question",
          "name": "Web sitesi ne kadar sürede hazırlanır?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Temel paketler için tahmini süre 5–25 iş günüdür. Seçilen ek sayfa ve özellikler hazırlık süresini artırabilir. İçeriklerin teslimi ve proje kapsamı değerlendirildikten sonra çalışma takvimi kesinleştirilir."
          }
        },
        {
          "@type": "Question",
          "name": "Revizyon hakkı var mı?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Revizyon sayısı, kapsamı ve teslimden sonraki düzenlemelerin koşulları kesin teklif hazırlanırken birlikte belirlenir. Başlangıçta kararlaştırılan kapsamı aşan istekler ayrıca fiyatlandırılabilir."
          }
        },
        {
          "@type": "Question",
          "name": "Sitenin yayına alınmasını da yapıyor musunuz?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Evet. Hesaplayıcıdan yayına alma hizmetini seçebilirsiniz. GitHub ve Vercel kurulumu ile alan adı bağlama hizmetleri ayrı kalemlerdir. Alan adı ve hosting sağlayıcılarının yıllık ücretleri ayrıca ödenir."
          }
        },
        {
          "@type": "Question",
          "name": "Web sitesi için nasıl teklif alabilirim?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "İhtiyacınıza uygun paketi ve ek özellikleri seçin. Adınızı ve iletişim bilginizi Teklif Al formuna yazın; e-posta veya WhatsApp ile seçimlerinizi iletin. Listede olmayan ihtiyaçlarınızı da proje açıklamasına ekleyebilirsiniz."
          }
        }
      ]
    }
  ]
}
  </script>
  <!-- SEO_PLACEHOLDER_SOSYAL: Doğrulanmış LinkedIn / diğer profil URL'lerinizi
       Person.sameAs dizisine ekleyin. Örnek: https://www.linkedin.com/in/LINKEDIN_KULLANICI_ADINIZ/
       Bu örnek adres JSON-LD'ye eklenmemiştir; gerçek profilinizle değiştirin. -->

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <noscript><style>.reveal { opacity: 1 !important; transform: none !important; }</style></noscript>

  <link rel="stylesheet" href="/css/site.min.css">
  <!-- Hesaplayıcı: mevcut değişkenleri ve bileşen stillerini kullanır. -->
  <link rel="stylesheet" href="/css/price-calculator.min.css">
  <script src="/js/price-calculator.min.js" defer></script>
</head>
```

Person düğümündeki `sameAs` gerçek GitHub profilini içerir. Bilinmeyen LinkedIn adresi canlı JSON içine uydurma URL olarak eklenmedi. `SEO_PLACEHOLDER_SOSYAL` yorumundaki örneği kendi gerçek profilinizle değiştirip `sameAs` dizisine ekleyin. Sayfada sosyal bağlantının da görünmesi için `js/site.js` içindeki `SOCIAL_LINKS` dizisinin LinkedIn değerini doldurun ve küçültme komutunu çalıştırın.

Person resmi gerçek portre olan profile.jpg, OG/Twitter resmi ise yeni og-image.jpg dosyasıdır. ProfessionalService ikinci tür olarak Service de taşır; böylece `provider` özelliği doğrudan Person düğümüne bağlanır. Beş paket statik JSON-LD olarak yazılmıştır; tarayıcıda CONFIG nesnesinden türetilmez. Paket fiyatları değişince hem CONFIG hem bu statik katalog güncellenmelidir.

## 2. Hizmetler bağlantısı ve fiyat bölümü

Üst çubuktaki nav bağlantısı:

```html
<nav class="services-nav" aria-label="Bölüm menüsü">
  <a class="chip-btn" href="#hizmetler">Hizmetler</a>
</nav>
```

Projeler kapanışı ile Deneyim başlangıcı arasındaki fiyat bölümünün güncel tam HTML kodu aşağıdadır. SSS, JavaScript kapalıyken de okunabilmesi için hesaplayıcının gizlenen kökünün dışındadır. Başlık sırası h2 → h3 → h4 şeklindedir. Sayfanın tek h1 başlığı Yusuf Başaran olarak korunur.

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

`js/price-calculator.js` içinde bölüm seçicisi şöyle güncellendi:

```javascript
const section = document.getElementById('hizmetler');
```

`css/price-calculator.css` içindeki eski `#services` seçicilerinin tamamı `#hizmetler` oldu. SSS için eklenen CSS bloğu, mobil medya sorgusundan önce yer alır:

```css
/* Görünür SSSile statik JSON-LD yanıtları birlikte güncellenir. */
#hizmetler .calc-faq { margin-top: 24px; }
#hizmetler .calc-faq > h3 { margin-bottom: 16px; line-height: 1.6; }
#hizmetler .calc-faq-item { margin-bottom: 12px; }
#hizmetler .calc-faq-item:hover { transform: none; }
#hizmetler .calc-faq-item > summary { cursor: pointer; line-height: 1.7; }
#hizmetler .calc-faq-item h4 { display: inline; font: inherit; font-weight: 600; }
#hizmetler .calc-faq-item p { margin-top: 12px; color: var(--ink-soft); font-size: 0.88rem; line-height: 1.8; }
```

SSS metni değiştirirseniz head içindeki FAQPage cevaplarını da aynı metinle güncelleyin. Revizyon sayısı belirtilmediği için ücretsiz/sınırsız revizyon taahhüdü eklenmedi; koşulların teklifte belirleneceği yazıldı.

## 3. JavaScript kapalıyken görünen statik proje bağlantıları

`projectsGrid` div'inin kapanışından hemen sonra, Projeler section kapanışından önce aşağıdaki bloğu yerleştirin. Eski “Projeleri görmek için JavaScript gerekli” noscript mesajını kaldırın. Başlık ve URL'ler mevcut canlı proje listesinden okunarak yazıldı; proje eklediğinizde bu statik listeyi de güncelleyin.

```html
        <noscript>
          <style>#projectsGrid { display: none; }</style>
          <div class="projects-grid">
            <article class="card">
              <h3 class="card-title">BirlikteBul – Beceri Paylaşım Platformu</h3>
              <a class="ref-action" href="https://github.com/yusuf-basaran/birliktebul">BirlikteBul GitHub deposu</a>
            </article>
            <article class="card">
              <h3 class="card-title">Kriptoskop — Kripto Piyasa Takip Paneli</h3>
              <a class="ref-action" href="https://github.com/yusuf-basaran/kriptoskop">Kriptoskop GitHub deposu</a>
            </article>
            <article class="card">
              <h3 class="card-title">KKTC Yardımlaşma ve Dayanışma Derneği Web Portalı &amp; Yönetim Konsolu</h3>
              <a class="ref-action" href="https://github.com/yusuf-basaran/Dernek/">Dernek web portalının GitHub deposu</a>
            </article>
            <article class="card">
              <h3 class="card-title">Findex — Küresel Eğitim ve Kaynak Arama Motoru</h3>
              <a class="ref-action" href="https://github.com/yusuf-basaran/findex/">Findex GitHub deposu</a>
            </article>
          </div>
        </noscript>
```

## 4. Görseller

İlk ekrandaki portre tembel yüklenmez. Mevcut img etiketi:

```html
<img class="avatar-img" width="124" height="124" src="/profile.jpg" alt="Gazimağusa web geliştirici Yusuf Başaran’ın portresi" decoding="async" fetchpriority="high">
```

`js/site.js` içinde proje kartı şablonunda:

```javascript
<img src="${escapeHtml(imgSrc)}"
     alt="${escapeHtml(p.title)} proje görseli"
     class="project-img" width="400" height="150"
     loading="lazy" decoding="async">
```

Yönetici modalındaki önizleme:

```html
<img id="projImgPreview" class="upload-preview"
     alt="Yönetim panelinde seçilen proje görselinin önizlemesi"
     width="400" height="225" loading="lazy" decoding="async">
```

Aşağıdaki dosyalar oluşturuldu; placeholder değildir ve site köküne yüklenmelidir:

| Dosya | Boyut / kullanım |
| --- | --- |
| og-image.jpg | 1200×630, paylaşım kartı |
| favicon.svg | Mevcut dünya simgesinin SVG dosyası |
| favicon-32x32.png | 32×32 favicon |
| apple-touch-icon.png | 180×180 Apple ikonu |
| icon-192.png | 192×192 manifest ikonu |
| icon-512.png | 512×512 manifest ikonu |

Paylaşım kartında Yusuf Başaran, Web Geliştirici & IT Destek, Gazimağusa/Kıbrıs ve site adresi bulunur. Değiştirmek isterseniz aynı adla 1200×630 JPEG yükleyin; isim değişirse OG, Twitter ve JSON-LD görsel URL'lerini de güncelleyin. Sosyal uygulamalar eski görseli önbellekte tutabilir.

## 5. robots.txt — site köküne

```text
User-agent: *
Allow: /

Sitemap: https://www.yusufbasaran.dev/sitemap.xml
```

Tüm botlara izin verilir. CSS, JS ve görseller engellenmez. robots.txt güvenlik/yönetici yetkilendirmesi sağlamaz; mevcut Supabase yetki akışı aynen sürer.

## 6. sitemap.xml — site köküne

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.yusufbasaran.dev/</loc>
    <lastmod>2026-10-18</lastmod>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

Tek sayfa olduğu için yalnızca ana URL listelendi. `#hizmetler` ve `#fiyat-sss` gibi anchor'lar ayrı sayfa olarak eklenmedi. `lastmod` bu düzenlemenin tarihidir; anlamlı içerik değişikliklerinde gerçek tarihle güncelleyin. `changefreq` bir ipucudur, tarama sıklığı garantisi değildir.

## 7. site.webmanifest — site köküne

```json
{
  "id": "/",
  "name": "Yusuf Başaran | Web Geliştirici ve IT Destek",
  "short_name": "Yusuf Başaran",
  "lang": "tr",
  "start_url": "/",
  "scope": "/",
  "display": "standalone",
  "background_color": "#0d1117",
  "theme_color": "#0d1117",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    }
  ]
}
```

Manifest ve ikonlar site kimliğini tanımlar; çevrimdışı çalışma eklenmedi.

## 8. Mevcut ana adres ve otomatik Vercel yayını

Ana adres **https://www.yusufbasaran.dev/** olarak mevcut çalışan Vercel ayarıyla aynı tutuldu. Www'suz adresin www'ya mevcut kalıcı HTTP 308 yönlendirmesi korunur. Böylece ek domain ayarı gerekmez ve yönlendirme döngüsü oluşmaz.

Vercel API'sinde explicit team kapsamıyla domain yönetimi 403 döndürdüğü için hesap ayarı değiştirilmedi; kod mevcut çalışan altyapıya uyarlandı. 308 ve 301 arama motorları açısından kalıcı yönlendirmelerdir. Mevcut domain düzeyi yönlendirmesi bulunmadığında aşağıdaki host kuralı aynı yönde 301 uygular; mevcut durumda domain düzeyindeki 308 önce çalışır.

Önizleme yayını ilk derlemede STATIC_BUILD_NO_OUT_DIR hatası verdi. Build script'i artık yalnızca gerekli 15 dosyayı public dizinine kopyalar; Vercel bu klasörü yayınlar. Kaynak kod, node_modules ve rehberler yayın klasörüne alınmaz.

vercel.json dosyasının tamamı:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "public",
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        { "type": "host", "value": "yusufbasaran\\.dev" }
      ],
      "destination": "https://www.yusufbasaran.dev/:path*",
      "statusCode": 301
    }
  ]
}
```

Kontrol komutları:

```bash
curl -I https://www.yusufbasaran.dev/
curl -I https://yusufbasaran.dev/
```

Beklenti: www adresinde 200; www'suz adreste www'ya yönlendirme. Canonical, OG, sitemap ve JSON-LD aynı www adresini kullanır. Preview adresleri bu host kuralına dahil değildir.

Kaynak: [Vercel domain yönlendirmeleri](https://vercel.com/docs/domains/working-with-domains/deploying-and-redirecting).

## 9. Küçültme ve script sırası

Mevcut uzun inline CSS ve JS kodları okunabilir kaynak dosyalarına taşındı:

- css/site.css → css/site.min.css
- css/price-calculator.css → css/price-calculator.min.css
- js/site.js → js/site.min.js
- js/price-calculator.js → js/price-calculator.min.js

HTML yalnızca .min sürümlerini yükler. Hesaplayıcı head'de defer ile yüklenir ve Supabase'e bağımlı değildir. Body sonundaki mevcut Supabase ve site kodu sırası aşağıdaki gibidir:

```html
  <!-- Defer sırası: önce Supabase, sonra ona bağlı mevcut site kodu.
       npm üzerindeki son kararlı 2.x sürümüne sabitlendi: 2.118.0. -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.118.0" defer></script>

  <script src="/js/site.min.js" defer></script>
```

**Erken tema script'i bilinçli istisnadır:** kısa inline script, sayfa boyanmadan önce temayı uygular. Inline klasik script'te defer çalışmaz. Bu kodu dışarıya taşıyıp defer vermek tema titremesine yol açabileceğinden mevcut davranış korundu. JSON-LD de çalıştırılan JS değil, statik veridir.

Font bağlantısı zaten `display=swap` parametresini içerir ve Google Fonts / gstatic preconnect'leri korunur. Font ailesi, renk değişkenleri ve mevcut kart/buton stilleri değiştirilmedi.

Küçültülmüş dosyalar hazırdır. Vercel otomatik derlemesinde npm run build çalışır ve public klasörü yayınlanır. Kaynak dosyaları değiştirdikten sonra yeniden üretmek için:

```bash
npm ci
npm run build
```

Build script’i public klasörünü yeniden oluşturur ve yalnızca yayın dosyalarını buraya kopyalar. Terser ve CleanCSS yalnızca geliştirme bağımlılıklarıdır; tarayıcıya ek kütüphane yüklenmez. Global fonksiyon adları korunarak inline onclick bağlantılarının bozulması önlenir. `package.json`, kilit dosyası ve build script'i pakette bulunur.

Dört CSS/JS dosyasının kaynak toplamı yaklaşık 107 KB, yayın sürümlerinin toplamı yaklaşık 83 KB'dir (sıkıştırma öncesi). Sunucu gzip/Brotli aktarımı bu değerlerden farklı olur.

## 10. WebP önerisi ve Core Web Vitals

Portreyi ve proje ekran görüntülerini uygun kalitede WebP/AVIF'e çevirebilirsiniz. Örnek WebP komutu:

```bash
cwebp -q 82 profile.jpg -o profile.webp
```

Uyumluluk için portreyi picture içinde kullanabilirsiniz; WebP dosyasını oluşturmadan source eklemeyin:

```html
<picture>
  <source srcset="/profile.webp" type="image/webp">
  <img class="avatar-img" src="/profile.jpg"
       alt="Gazimağusa web geliştirici Yusuf Başaran’ın portresi"
       width="124" height="124" decoding="async" fetchpriority="high">
</picture>
```

Proje ekran görüntülerini görüntülendikleri boyuta yakın boyutlarda ve mümkünse 2× çözünürlüklü alternatiflerle yayınlayın. Supabase'e yüklenen dosyanın URL'sini veritabanında değiştirirken mevcut yönetici akışını kullanın; bu SEO çalışması veritabanına yazmadı. OG görselini sosyal platformlarla uyum için JPEG bırakın.

Saha verisinde 75. yüzdelik dilim için hedefler:

- **LCP ≤ 2,5 sn:** ilk ekrandaki portreyi lazy yapmayın; kritik CSS, font ve görsel aktarımını küçük tutun.
- **INP ≤ 200 ms:** uzun JS işleri ve ağır animasyonlardan kaçının; mobilde seçim/accordion tepkilerini izleyin.
- **CLS ≤ 0,1:** görsel boyutlarını koruyun; projeler ve fontlar yüklenirken yer değiştirmeleri ölçün. Dinamik proje listesinin gerçek yüksekliği değiştiği için kalan kaymalar canlı ölçümle değerlendirilmelidir.

PageSpeed Insights, Search Console Core Web Vitals ve gerçek ziyaretçi verisiyle yayın sonrası ölçün. Yerel tarayıcı kontrolleri saha puanı veya sıralama garantisi değildir. Arama motoruna bildirim için sitemap.xml URL'sini Google Search Console ve Bing Webmaster Tools'a ekleyin.

## 11. Doğrulama ve güncelleme notları

Chromium tarayıcısında şu kontroller geçti:

- Tek h1; 56 karakter title ve 156 karakter description; gerekli meta etiketlerinin tekil olması.
- Canonical/OG/sitemap/şema URL tutarlılığı; statik beş paket, Person bağlantıları ve altı SSS yanıtının HTML ile birebir aynı olması.
- İkon ve OG dosya boyutları; görsellerde alt, width/height ve doğru lazy yükleme; CSS/JS dosyalarında 404 olmaması.
- JavaScript kapalıyken dört statik GitHub proje bağlantısı ve görünür/çalışan SSS.
- 320, 390, 680 ve 1280 px genişlikte yatay taşma olmaması.
- Küçültülmüş sürümde beş paket ve 32 ek kalemin fiyatı, birleşik fiyat/süre, aylık-yıllık ayrımı, sıfırlama ve klavye odağı.
- Form doğrulaması ve Türkçe karakterlerle aynı e-posta/WhatsApp metni; mevcut proje listesi, Beceriler filtresi ve modallar.

Supabase uygulama kodu kaynak dosyaya taşındı; fonksiyon akışı değiştirilmedi. Yalnızca proje görsellerine decoding="async" eklendi. Gerçek yönetici girişi, proje yükleme veya veri yazma/silme yapılmadı.

Yayından sonra [Schema Markup Validator](https://validator.schema.org/) ve [Google Rich Results Test](https://search.google.com/test/rich-results) ile canlı URL'yi de kontrol edin. FAQ şeması içeriği tanımlar; kişisel sitelerde Google'ın FAQ zengin sonucunu göstermesi beklenmemelidir. Social meta önizlemesi ve www yönlendirmesi de canlı ortamda son kez doğrulanmalıdır.

Fiyatları değiştirirken CONFIG ve statik OfferCatalog'u; SSS yanıtlarını değiştirirken görünür HTML ve FAQPage'i birlikte güncelleyin. Bilinmeyen profil placeholder'ını gerçek URL ile doldurmadıkça JSON içine eklemeyin. Sitemap lastmod değerini yalnızca anlamlı değişiklik olduğunda değiştirin.

## Search Console doğrulama hazırlığı

Head içine GOOGLE_SITE_VERIFICATION yorum placeholder’ı eklendi. Gerçek doğrulama kodu eklenmedi. Alan adı mülkü ve DNS TXT yöntemi için bu yorumu değiştirmeniz gerekmez. Yalnızca URL öneki + HTML etiketi yöntemini seçerseniz Google’ın verdiği gerçek meta satırını yorum yerine ekleyin ve yeniden yayınlayın. Tam teşhis ve numaralı Google/Bing adımları YAYIN-TESHIS-VE-SEARCH-CONSOLE.md dosyasındadır.
