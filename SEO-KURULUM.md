# SEO — ana sayfa ve ayrı fiyat hesaplayıcı

Ana sayfa canonical adresi https://www.yusufbasaran.dev/, hesaplayıcı canonical adresi https://www.yusufbasaran.dev/fiyat-hesaplayici/ şeklindedir. Her sayfada tek h1, tek canonical ve tekil meta etiketleri bulunur. Her sayfanın kendi canonical adresi vardır; yeni hizmet sayfası https://www.yusufbasaran.dev/kktc-web-tasarim/ adresini kullanır.

## KKTC geneline genişletme — 23 Ekim 2026

Kapsam, kullanıcının isteği doğrultusunda KKTC genelindeki web geliştirme ihtiyaçlarıdır. Ana sayfa kişisel CV kimliğini ve IT destek bilgisini korur; yeni hizmet sayfası web alanına odaklanır. Fiziksel çalışma merkezi Gazimağusa olarak doğru tutulur; başka ilçelerde ofis veya şube iddiası eklenmez. KKTC için uzaktan çalışma anlatılır.

| Sayfa | Odak |
| --- | --- |
| `/` | Yusuf Başaran, KKTC web tasarım, kodlama ve CV/portföy |
| `/kktc-web-tasarim/` | KKTC web tasarım ve kodlama, kurumsal site, özel web yazılımı, API/veritabanı, blog ve portföy, randevu/form, temel SEO ve yayın |
| `/fiyat-hesaplayici/` | KKTC web sitesi yaptırma fiyatları, paketler, sayfa/özellik seçimi ve teklif |

Üç sayfanın başlık, description, keywords, Open Graph ve Twitter metinleri sayfanın amacına göre ayrı düzenlenmiştir. Başlıklar en fazla 60, açıklamalar 150–160 karakterdir. Anahtar kelimeler CV'deki HTML/CSS/JavaScript, REST API, Supabase, GitHub ve Vercel becerileri ile sitede sunulan özelliklerle sınırlandırılmıştır. WordPress/React gibi CV'de olmayan uzmanlıklar, sahte müşteri sayıları veya ajans iddiaları eklenmemiştir.

Yeni sayfada görünür altı hizmet, çalışma süreci, KKTC genelinde uzaktan çalışma bilgisi, gerçek iletişim bağlantıları ve altı soru/yanıt bulunur. CollectionPage, ItemList/Service, Person, BreadcrumbList ve FAQPage verileri bu görünür içerikle eşleşir. Başlangıç ücreti yine CONFIG'ten build sırasında alınır. Yerel arama hacmi aracı bağlı olmadığından hacim, zorluk veya mevcut sıralama için veri iddiası yapılmaz.

Meta keywords Google sıralamasında kullanılmaz; içerikle tutarlı yardımcı bir alan olarak tutulur. Aynı şehir metninden çoğaltılmış sayfalar veya görünmez kelime listeleri oluşturulmaz. [Google'ın meta etiket açıklaması](https://developers.google.com/search/docs/crawling-indexing/special-tags) ve [arama spam politikaları](https://developers.google.com/search/docs/essentials/spam-policies).

Sitemap artık üç gerçek URL içerir; Production sonrası IndexNow bildirimi üçünü de kapsar. Yeni URL için Search Console URL Denetimi kullanıcı hesabından yapılabilir. Yeni sayfanın tam head kodu `kktc-web-tasarim/index.html` içindedir; bir kopyasını başka sayfaya yapıştırmayın.

## Son düzenleme — 23 Ekim 2026

- robots.txt tüm genel arama botlarına açık; Googlebot, Bingbot, DuckDuckBot, Applebot, OAI-SearchBot ve PerplexityBot için izin ayrıca belirginleştirildi. Model eğitimi politikasını değiştiren yeni bir kural eklenmedi. Bir User-Agent ile HTTP 200 almak, gerçek bot IP'lerinin tüm koşullarda erişebileceği garantisi değildir; güvenlik duvarı kapatılmadı.
- Paket fiyatları ve süreleri artık JavaScript olmadan okunabilen, ziyaretçilerin de açabildiği HTML özetinde bulunur. Build bunları CONFIG'ten üretir; statik JSON-LD fiyatı yanlışsa yayın çıktısı hazırlanmaz.
- Ana sayfa ProfilePage ile Person'a bağlanır; hesaplayıcıda Service ve paket kataloğu bulunur. Görünür SSS ile FAQPage metni aynı kalır. Sahte puan, yorum, adres veya sosyal profil eklenmez; FAQ şeması bu tür sitelere Google'da SSS görünümü garantisi vermez.
- Profil fotoğrafı için WebP kaynak ve JPEG yedeği eklendi (yaklaşık 70 KB → 21 KB). CSS/JS küçültme, defer, font swap ve görsel boyutları korunur.
- sitemap'teki üç gerçek sayfanın lastmod tarihi 2026-10-23 olarak güncellendi. Her build'de tarih değiştirilmez; anlamlı içerik değişikliğini yansıtır.
- IndexNow sahiplik dosyası ve Vercel Production başarısından sonra çalışan GitHub Actions bildirimi eklendi. `npm run submit:indexnow -- --dry-run` canlı dosya/canonical kontrolü yapar; normal komut üç URL'yi katılımcı motorlara bildirir. HTTP 200/202 yalnızca alınma/onay bekleme anlamındadır; Google Indexing API veya Google sitemap ping kullanılmaz.
- 23 Ekim kontrolünde alan adının DNS TXT kayıtlarında mevcut bir google-site-verification kaydı görüldü; değiştirilmedi. Search Console oturumu/API erişimi olmadığı için mülkün doğrulanma durumu, sitemap gönderimi ve hesaba özel üretken arama kontrolleri buradan teyit edilemez. DNS kaydının varlığı, hesabın tamamlandığı anlamına gelmez.

Google'ın açıklamasına göre yapay zekâ araması için özel meta etiketleri veya llms.txt gerekli değildir. Bu nedenle sıralama vaat eden ek dosya, görünmez anahtar kelime veya yalnızca botlara sunulan içerik eklenmedi. Kullanıcıya görünen sayfalarda yapay zekâ rozeti veya üretim atfı bulunmaz.

Resmî kaynaklar: [Google arama ve üretken özellikler](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [OpenAI arama botu](https://developers.openai.com/api/docs/bots), [Perplexity botları](https://docs.perplexity.ai/docs/resources/perplexity-crawlers), [IndexNow protokolü](https://www.indexnow.org/documentation).

## Yeni yapıda şemalar ve içerik

- Ana sayfa Person, WebSite ve ProfessionalService/Service düğümlerini içerir. Ana sayfada SSS görünmediği için FAQPage buradan kaldırıldı.
- Ana sayfanın statik OfferCatalog içindeki beş Offer.url alanı yeni hesaplayıcı URL'sidir. Paket ad/fiyat değerleri js/price-calculator.js CONFIG verisiyle kontrol edilir; taşımada değişmedi ve fark bulunmadı.
- Yeni sayfada WebPage, BreadcrumbList (Ana Sayfa > Fiyat Hesaplayıcı) ve FAQPage bulunur. Altı yanıt görünür SSS metniyle birebir aynıdır. FAQPage @id yeni sayfa adresi + #fiyat-sss olarak güncellendi.
- Yeni sayfa başlığı 60 karakter, açıklaması 153 karakterdir. OG/Twitter URL ve metinleri yeni sayfaya özeldir; mevcut 1200×630 /og-image.jpg kullanılır. İkonlar, manifest, fontlar ve theme-color aynıdır.
- Doğrulanmış GitHub sameAs ve LinkedIn placeholder yorumu ana sayfada korunur; uydurma profil URL'si eklenmez.

## Adımlı hesaplayıcı — 21 Ekim 2026

Hesaplayıcı yedi adımlı arayüz kullanır. URL, title, description ve statik WebPage/BreadcrumbList/FAQPage korunur; SSS tüm adımlarda sayfanın altında erişilebilirdir. Fiyatlar, CONFIG ve ana sayfanın statik OfferCatalog verisi değişmez. Sabit alt fiyat çubuğu için ölçülen yükseklik kadar boşluk ayrılır; form ve footer mobilde erişilebilir kalır. Ana sayfanın Supabase, yönetici ve modal kodu değiştirilmez. Yayınlanan sayfalarda yapay zekâya atıf yapan rozet veya ifade bulunmaz.

## İki sayfanın güncel head kodları

Aşağıdaki bloklar mevcut dosyalara uygulanmıştır. Tekrar eklemeyin; gerektiğinde kaynak dosyanın head bloğunu bütünüyle güncelleyin.

### Ana sayfa: index.html

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
    try {
      var conceptCache = JSON.parse(localStorage.getItem('site-concept'));
      if (conceptCache && ['religious', 'national'].includes(conceptCache.family)) {
        document.documentElement.setAttribute('data-occasion-family', conceptCache.family);
      }
    } catch (e) {}
  </script>

  <!-- İkonlar ve paylaşım görseli kök dizinde tutulur. -->

  <title>Yusuf Başaran | KKTC Web Tasarım, Kodlama ve IT Destek</title>
  <meta name="description" content="KKTC genelinde web tasarım ve kodlama: Yusuf Başaran’dan kurumsal site, özel web yazılımı, API ve veritabanı bağlantıları. Fiyat hesaplayın, teklif alın.">
  <meta name="author" content="Yusuf Başaran">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#0d1117">
  <meta name="color-scheme" content="dark light">
  <meta name="keywords" content="Yusuf Başaran, KKTC web tasarım, Kıbrıs web tasarım, Gazimağusa web tasarım, KKTC web sitesi yaptırma, web tasarım ve kodlama, freelance web geliştirici Kıbrıs, kurumsal web sitesi, özel web yazılımı, yönetici paneli, online randevu sistemi, IT destek Gazimağusa, Bitrix24, HTML CSS JavaScript, Supabase">
  <meta name="geo.placename" content="Gazimağusa, Kıbrıs">
  <link rel="canonical" href="https://www.yusufbasaran.dev/">
  <!-- GOOGLE_SITE_VERIFICATION: Search Console'dan aldığın <meta name="google-site-verification" content="..."> satırını buraya yapıştır -->
  <link rel="icon" href="/favicon.ico?v=yb1" type="image/x-icon" sizes="16x16 32x32 48x48">
  <link rel="icon" href="/favicon-32x32.png?v=yb1" type="image/png" sizes="32x32">
  <link rel="icon" href="/favicon-96x96.png?v=yb1" type="image/png" sizes="96x96">
  <link rel="icon" href="/favicon.svg?v=yb1" type="image/svg+xml" sizes="any">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=yb1" sizes="180x180">
  <link rel="manifest" href="/site.webmanifest?v=yb1">

  <!-- Paylaşım görseli 1200 × 630 piksel; profile.jpg yerine kullanılır. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Yusuf Başaran">
  <meta property="og:title" content="Yusuf Başaran | KKTC Web Tasarım, Kodlama ve IT Destek">
  <meta property="og:description" content="KKTC genelinde web tasarım ve kodlama: Yusuf Başaran’dan kurumsal site, özel web yazılımı, API ve veritabanı bağlantıları. Fiyat hesaplayın, teklif alın.">
  <meta property="og:url" content="https://www.yusufbasaran.dev/">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:image" content="https://www.yusufbasaran.dev/og-image.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Yusuf Başaran — Gazimağusa, Kıbrıs web geliştirici ve IT destek hizmetleri">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Yusuf Başaran | KKTC Web Tasarım, Kodlama ve IT Destek">
  <meta name="twitter:description" content="KKTC genelinde web tasarım ve kodlama: Yusuf Başaran’dan kurumsal site, özel web yazılımı, API ve veritabanı bağlantıları. Fiyat hesaplayın, teklif alın.">
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
        "Donanım arıza tespiti",
        "Web tasarım",
        "Web geliştirme",
        "Özel web yazılımı",
        "Teknik SEO",
        "IT destek"
      ],
      "sameAs": [
        "https://github.com/yusuf-basaran"
      ],
      "description": "Gazimağusa, KKTC merkezli freelance web geliştirici; web tasarım, özel web yazılımı ve IT destek alanlarında çalışır."
    },
    {
      "@type": "WebSite",
      "@id": "https://www.yusufbasaran.dev/#website",
      "name": "Yusuf Başaran | Web Geliştirici ve IT Destek",
      "url": "https://www.yusufbasaran.dev/",
      "inLanguage": "tr",
      "publisher": {
        "@id": "https://www.yusufbasaran.dev/#person"
      },
      "alternateName": "Yusuf Başaran",
      "description": "Yusuf Başaran’ın KKTC web tasarım ve kodlama hizmetleri, Gazimağusa merkezli web geliştirme projeleri ve IT destek portföyü."
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
      "description": "Gazimağusa merkezli, KKTC ve Türkiye için web tasarım, kurumsal site, özel web yazılımı, yönetici paneli, randevu sistemi ve IT destek hizmetleri.",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
      },
      "subjectOf": {
        "@id": "https://www.yusufbasaran.dev/kktc-web-tasarim/#webpage"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://www.yusufbasaran.dev/#webpage",
      "url": "https://www.yusufbasaran.dev/",
      "name": "Yusuf Başaran | KKTC Web Tasarım, Kodlama ve IT Destek",
      "description": "KKTC genelinde web tasarım ve kodlama: Yusuf Başaran’dan kurumsal site, özel web yazılımı, API ve veritabanı bağlantıları. Fiyat hesaplayın, teklif alın.",
      "inLanguage": "tr",
      "dateModified": "2026-10-23T18:52:40Z",
      "isPartOf": {
        "@id": "https://www.yusufbasaran.dev/#website"
      },
      "mainEntity": {
        "@id": "https://www.yusufbasaran.dev/#person"
      },
      "about": {
        "@id": "https://www.yusufbasaran.dev/#web-hizmeti"
      }
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
  <link rel="stylesheet" href="/css/site-concepts.min.css">
  <script src="/js/site-concepts.min.js" defer></script>
  <script src="/js/home-links.min.js" defer></script>
</head>
```

### Hesaplayıcı: fiyat-hesaplayici/index.html

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
    try {
      var conceptCache = JSON.parse(localStorage.getItem('site-concept'));
      if (conceptCache && ['religious', 'national'].includes(conceptCache.family)) {
        document.documentElement.setAttribute('data-occasion-family', conceptCache.family);
      }
    } catch (e) {}
  </script>

  <!-- İkonlar ve paylaşım görseli kök dizinde tutulur. -->

  <title>Web Sitesi Yaptırma Fiyatları ve Hesaplayıcı | Yusuf Başaran</title>
  <meta name="description" content="KKTC genelinde web sitesi yaptırma ve web tasarım fiyatlarını hesaplayın. Paket, sayfa ve yazılım özelliklerini seçin; tahmini bütçeyi görün, teklif alın.">
  <meta name="author" content="Yusuf Başaran">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="theme-color" content="#0d1117">
  <meta name="color-scheme" content="dark light">
  <meta name="keywords" content="KKTC web sitesi fiyatları, Kıbrıs web tasarım fiyatları, Gazimağusa web sitesi yaptırma, web sitesi fiyat hesaplayıcı, kurumsal site fiyatı, özel web yazılımı fiyatı, randevu sistemi fiyatı, web tasarım teklifi, alan adı hosting ücretleri, Yusuf Başaran">
  <meta name="geo.placename" content="Gazimağusa, Kıbrıs">
  <link rel="canonical" href="https://www.yusufbasaran.dev/fiyat-hesaplayici/">
  <!-- GOOGLE_SITE_VERIFICATION: Search Console'dan aldığın <meta name="google-site-verification" content="..."> satırını buraya yapıştır -->
  <link rel="icon" href="/favicon.ico?v=yb1" type="image/x-icon" sizes="16x16 32x32 48x48">
  <link rel="icon" href="/favicon-32x32.png?v=yb1" type="image/png" sizes="32x32">
  <link rel="icon" href="/favicon-96x96.png?v=yb1" type="image/png" sizes="96x96">
  <link rel="icon" href="/favicon.svg?v=yb1" type="image/svg+xml" sizes="any">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=yb1" sizes="180x180">
  <link rel="manifest" href="/site.webmanifest?v=yb1">

  <!-- Paylaşım görseli 1200 × 630 piksel; profile.jpg yerine kullanılır. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Yusuf Başaran">
  <meta property="og:title" content="Web Sitesi Yaptırma Fiyatları ve Hesaplayıcı | Yusuf Başaran">
  <meta property="og:description" content="KKTC genelinde web sitesi yaptırma ve web tasarım fiyatlarını hesaplayın. Paket, sayfa ve yazılım özelliklerini seçin; tahmini bütçeyi görün, teklif alın.">
  <meta property="og:url" content="https://www.yusufbasaran.dev/fiyat-hesaplayici/">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:image" content="https://www.yusufbasaran.dev/og-image.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Yusuf Başaran — Gazimağusa, Kıbrıs web geliştirici ve IT destek hizmetleri">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Web Sitesi Yaptırma Fiyatları ve Hesaplayıcı | Yusuf Başaran">
  <meta name="twitter:description" content="KKTC genelinde web sitesi yaptırma ve web tasarım fiyatlarını hesaplayın. Paket, sayfa ve yazılım özelliklerini seçin; tahmini bütçeyi görün, teklif alın.">
  <meta name="twitter:image" content="https://www.yusufbasaran.dev/og-image.jpg">
  <meta name="twitter:image:alt" content="Yusuf Başaran — Gazimağusa, Kıbrıs web geliştirici ve IT destek hizmetleri">

  <!-- Paket fiyatları görünür özetle, SSS yanıtları sayfadaki metinle eşleşir. -->
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.yusufbasaran.dev/fiyat-hesaplayici/#webpage",
      "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
      "name": "Web Sitesi Yaptırma: Özelliğe Göre Fiyat Hesaplayıcı",
      "inLanguage": "tr",
      "isPartOf": {
        "@id": "https://www.yusufbasaran.dev/#website"
      },
      "about": {
        "@id": "https://www.yusufbasaran.dev/#web-hizmeti"
      },
      "breadcrumb": {
        "@id": "https://www.yusufbasaran.dev/fiyat-hesaplayici/#breadcrumb"
      },
      "description": "KKTC genelinde web sitesi yaptırma ve web tasarım fiyatlarını hesaplayın. Paket, sayfa ve yazılım özelliklerini seçin; tahmini bütçeyi görün, teklif alın.",
      "dateModified": "2026-10-23T18:52:40Z",
      "author": {
        "@id": "https://www.yusufbasaran.dev/#person"
      },
      "mainEntity": {
        "@id": "https://www.yusufbasaran.dev/fiyat-hesaplayici/#web-gelistirme"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.yusufbasaran.dev/fiyat-hesaplayici/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Ana Sayfa",
          "item": "https://www.yusufbasaran.dev/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Fiyat Hesaplayıcı",
          "item": "https://www.yusufbasaran.dev/fiyat-hesaplayici/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.yusufbasaran.dev/fiyat-hesaplayici/#fiyat-sss",
      "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
    },
    {
      "@type": "Person",
      "@id": "https://www.yusufbasaran.dev/#person",
      "name": "Yusuf Başaran",
      "url": "https://www.yusufbasaran.dev/",
      "jobTitle": "Web Geliştirici ve IT Destek",
      "email": "yusufbasaran63@hotmail.com",
      "telephone": "+905338493063",
      "sameAs": [
        "https://github.com/yusuf-basaran"
      ]
    },
    {
      "@type": "Service",
      "@id": "https://www.yusufbasaran.dev/fiyat-hesaplayici/#web-gelistirme",
      "name": "Web Sitesi Geliştirme ve Fiyatlandırma",
      "serviceType": "Web sitesi geliştirme",
      "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
      "provider": {
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
      "description": "Paket, sayfa ve ek hizmet seçimine göre tahmini fiyatlandırma. Alan adı ve hosting yıllık ayrıca ödenir; kesin teklif kapsam netleşince verilir.",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Sitesi Paketleri",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Tek Sayfa Tanıtım Sitesi",
            "price": 4000,
            "priceCurrency": "TRY",
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
            "url": "https://www.yusufbasaran.dev/fiyat-hesaplayici/",
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
    }
  ]
}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">


  <link rel="stylesheet" href="/css/site.min.css">
  <link rel="stylesheet" href="/css/site-concepts.min.css">
  <script src="/js/site-concepts.min.js" defer></script>
  <!-- Hesaplayıcı: mevcut değişkenleri ve bileşen stillerini kullanır. -->
  <link rel="stylesheet" href="/css/price-calculator.min.css">
  <link rel="stylesheet" href="/css/calculator-page.min.css">
  <script src="/js/page-common.min.js" defer></script>
  <script src="/js/price-calculator.min.js" defer></script>
</head>
```

## Sitemap — üç gerçek URL

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.yusufbasaran.dev/</loc>
    <lastmod>2026-10-23</lastmod>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://www.yusufbasaran.dev/fiyat-hesaplayici/</loc>
    <lastmod>2026-10-23</lastmod>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://www.yusufbasaran.dev/kktc-web-tasarim/</loc>
    <lastmod>2026-10-23</lastmod>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

Her iki sayfanın son içerik/şema düzenlemesi 2026-10-23 tarihindedir. Anchor URL'ler sitemap'e eklenmez. İleride anlamlı içerik değişikliklerinde gerçek tarih güncellenir.

## Robots

```text
User-agent: *
Allow: /

Sitemap: https://www.yusufbasaran.dev/sitemap.xml
```

Admin ekranları ana sayfadaki modallardır; ayrı admin URL'si yoktur. Bu taşıma için noindex veya robots engeli gerekmez.

## İç bağlantılar ve eski adres

Ana sayfanın üst menüsü, hero butonu, Projeler/Deneyim arasındaki çağrı kartı ve footer yeni sayfaya gerçek /fiyat-hesaplayici/ bağlantısı verir. JavaScript kapalıyken de çalışırlar. Yeni sayfadan / adresine dönüş linkleri vardır.

Ana sayfada id=hizmetler kullanılmaz. Eski /#hizmetler bağlantısı home-links.js aracılığıyla #hizmetler-cta kartına kaydırılır; kullanıcı ana sayfada kalır ve otomatik olarak hesaplayıcı sayfasına gönderilmez. JS kapalıyken bu eski hash eşleştirmesi çalışmaz; gerçek sayfa bağlantısı yine kullanılabilir.

## Yayın ve URL davranışı

Build yeni fiyat-hesaplayici/index.html dosyasını public/fiyat-hesaplayici/index.html olarak kopyalar. CSS/JS yolları kökten başlar; alt sayfada /fiyat-hesaplayici/css gibi yanlış yollar oluşmaz. Yeni sayfa yalnızca site.min.css, price-calculator.min.css, calculator-page.min.css, page-common.min.js ve price-calculator.min.js yükler; Supabase/site.js yüklemez.

vercel.json aynen korunur; trailingSlash ayarı eklenmedi. Yerel sunucuda /fiyat-hesaplayici → /fiyat-hesaplayici/ → 200 çalışır, yönlendirme döngüsü yoktur. Vercel preview derlemesi READY oldu; korumalı içeriğe erişim 403 ile reddedildiği için platform üzerindeki URL testi tamamlanamadı. Üretim yayını sonrasında iki biçimi de kontrol edin. Bir platform ayarı değişikliği gerekirse ayrıca değerlendirilmelidir; mevcut izin olmadan trailingSlash eklenmez.

Vercel Project Settings → Git/Environments bölümünde Production Branch main, Build Command npm run build, Output Directory public olmalı. Deployments'ta doğru main commit'inin Production / Ready olduğunu kontrol edin. Paket fiyatları değişirse CONFIG ve statik OfferCatalog'u; SSS değişirse görünür HTML ve FAQPage'i birlikte güncelleyin.

## Search Console ve Bing

DNS TXT doğrulaması alan adının tamamını kapsar; yeni sayfa için ikinci doğrulama kodu veya meta etiketi gerekmez. Mevcut GOOGLE_SITE_VERIFICATION yorumları gerçek bir doğrulama etiketi değildir. HTML yöntemi seçilirse Google'ın verdiği gerçek satır kullanılmalıdır. Yetkili DNS sağlayıcısı için önceki rapordaki Name.com bulgusu geçerlidir; gerçek güncel nameserver'ları kontrol ederek TXT kaydını doğru panelde yönetin.

Ana dala birleştirme ve Vercel yayını tamamlandıktan sonra:

1. https://www.yusufbasaran.dev/fiyat-hesaplayici/ sayfasını tarayıcıda açın; hesaplayıcı, SSS ve tema/dönüş bağlantılarını kontrol edin.
2. Search Console URL Denetimi'ne bu tam URL'yi girin; Canlı URL'yi test et, ardından Dizine eklenmesini iste seçin.
3. Site Haritaları'nda https://www.yusufbasaran.dev/sitemap.xml adresini yeniden gönderin. Sitemap içinde her iki sayfa görünmelidir.
4. Gerekirse ana sayfayı da URL Denetimi ile yeniden taratın. Birkaç gün sonra Sayfa dizine ekleme/Performans raporlarını kontrol edin.
5. Yeni sayfanın JSON-LD'sini https://search.google.com/test/rich-results ve https://validator.schema.org/ ile kontrol edin. Her şema türü Google'da zengin sonuç oluşturmak zorunda değildir.
6. Bing Webmaster Tools'ta mevcut mülkün sitemap'ini yenileyin; mülk yoksa doğrulanmış Search Console mülkünü içe aktarın.

## Kişisel ikon

`favicon.svg` koyu zemin üzerinde YB monogramının vektör kaynağıdır; beyaz Y ve sitenin mavi vurgu rengindeki B kullanılır. Metin fontuna veya harici kaynağa bağlı değildir. Aynı tasarım ICO (16/32/48), PNG (32/48/96), Apple Touch (180) ve uygulama ikonlarında (192/512) bulunur. Üç sayfa aynı ikonları kullanır; `v=yb1` mevcut tarayıcı önbelleğini yenilemek içindir. Manifest kimliği ve başlangıç URL'si değişmez. Google/Bing'in arama sonucundaki ikonu kendi yeniden tarama takvimlerinde güncellemesi beklenir.

## Yandex Webmaster doğrulaması — 27 Ekim 2026

Kullanıcının Yandex ekranından verdiği HTML dosyası `yandex_78b336ef1242f2e2.html` olarak site köküne eklendi. Build bu dosyayı aynı içerikle public köküne kopyalar. Üretim adresi: https://www.yusufbasaran.dev/yandex_78b336ef1242f2e2.html . Dosya yalnızca Yandex'in istediği doğrulama HTML'ini içerir; site şablonu veya script eklenmez. Bu teknik URL sitemap'e eklenmez ve mevcut sayfa metalarını değiştirmez.

Yayın sonrasında dosya HTTP 200 ile erişilebilir olduğunda kullanıcı Yandex Webmaster'daki HTML file sekmesinde Verify düğmesine basar. Doğrulama dosyasını sonradan silmeyin; Yandex sahipliği tekrar kontrol edebilir. Panelde doğrulama tamamlandıktan sonra sitemap ve üç gerçek sayfa adresi gönderilebilir.

## Profil şeması tarih biçimi — 28 Ekim 2026

Search Console'daki `dateModified` için geçersiz datetime uyarısı düzeltildi. ProfilePage, WebPage ve CollectionPage alanlarında gün/saat/saat dilimi içeren ISO 8601 DateTime kullanılır: `2026-10-23T18:52:40Z`. Bu değer, son anlamlı içerik düzenlemesinin Git commit zamanıdır (`9bf6f68`); biçim düzeltildiği için içerik yeniymiş gibi bugünün tarihi yazılmaz. Sitemap'teki Date biçimli lastmod alanları bu uyarının konusu değildir ve değiştirilmez.

Yeni kontrol `npm run build && npm run test:seo` ile üç yayın sayfasındaki JSON-LD tarih alanlarının saat ve saat dilimi içerdiğini doğrular. İleride tarih güncellenirken aynı biçim kullanılmalıdır. Yayından sonra Search Console → Profil sayfası raporu → ilgili uyarı → Düzeltmeyi doğrula seçilir; sonuç Google yeniden taradıktan sonra değişir.

## Bayram konseptleri

Konseptler yalnızca görünüm değişkenleri ve kutlama bandını etkiler. H1, title/description, canonical, JSON-LD kimlikleri ve tarihler değiştirilmez; fiyatlar ve form mantığı aynı kalır. Standart görünümde bayram bandı gizlidir. CSS ve JavaScript kaynakları üç sayfaya eklenmiştir; diğer sayfalara Supabase SDK veya yönetici kodu yüklenmez. SQL kurulum adımları `KONSEPT-KURULUM.md` içindedir.
