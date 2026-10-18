# SEO — ana sayfa ve ayrı fiyat hesaplayıcı

Ana sayfa canonical adresi https://www.yusufbasaran.dev/, hesaplayıcı canonical adresi https://www.yusufbasaran.dev/fiyat-hesaplayici/ şeklindedir. Her sayfada tek h1, tek canonical ve tekil meta etiketleri bulunur. İki sayfayı aynı canonical'a yönlendirmeyin.

## Yeni yapıda şemalar ve içerik

- Ana sayfa Person, WebSite ve ProfessionalService/Service düğümlerini içerir. Ana sayfada SSS görünmediği için FAQPage buradan kaldırıldı.
- Ana sayfanın statik OfferCatalog içindeki beş Offer.url alanı yeni hesaplayıcı URL'sidir. Paket ad/fiyat değerleri js/price-calculator.js CONFIG verisiyle kontrol edilir; taşımada değişmedi ve fark bulunmadı.
- Yeni sayfada WebPage, BreadcrumbList (Ana Sayfa > Fiyat Hesaplayıcı) ve FAQPage bulunur. Altı yanıt görünür SSS metniyle birebir aynıdır. FAQPage @id yeni sayfa adresi + #fiyat-sss olarak güncellendi.
- Yeni sayfa başlığı 60 karakter, açıklaması 153 karakterdir. OG/Twitter URL ve metinleri yeni sayfaya özeldir; mevcut 1200×630 /og-image.jpg kullanılır. İkonlar, manifest, fontlar ve theme-color aynıdır.
- Doğrulanmış GitHub sameAs ve LinkedIn placeholder yorumu ana sayfada korunur; uydurma profil URL'si eklenmez.

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
  <!-- SEO_PLACEHOLDER_SOSYAL: Doğrulanmış LinkedIn / diğer profil URL'lerinizi
       Person.sameAs dizisine ekleyin. Örnek: https://www.linkedin.com/in/LINKEDIN_KULLANICI_ADINIZ/
       Bu örnek adres JSON-LD'ye eklenmemiştir; gerçek profilinizle değiştirin. -->

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">

  <noscript><style>.reveal { opacity: 1 !important; transform: none !important; }</style></noscript>

  <link rel="stylesheet" href="/css/site.min.css">
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
  </script>

  <!-- İkonlar ve paylaşım görseli kök dizinde tutulur. -->

  <title>Web Sitesi Yaptırma Fiyatları ve Hesaplayıcı | Yusuf Başaran</title>
  <meta name="description" content="Gazimağusa ve KKTC için web sitesi fiyatını özelliklere göre hesaplayın. Paket, sayfa ve ek hizmetleri seçin; tahmini bütçenizi görün, hemen teklif alın.">
  <meta name="author" content="Yusuf Başaran">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="theme-color" content="#0d1117">
  <meta name="color-scheme" content="dark light">
  <meta name="keywords" content="web tasarım Gazimağusa, web sitesi yaptırma KKTC, freelance web geliştirici Kıbrıs, bilgisayar programcısı, IT destek, Bitrix24, HTML CSS JavaScript, Supabase">
  <meta name="geo.placename" content="Gazimağusa, Kıbrıs">
  <link rel="canonical" href="https://www.yusufbasaran.dev/fiyat-hesaplayici/">
  <!-- GOOGLE_SITE_VERIFICATION: Search Console'dan aldığın <meta name="google-site-verification" content="..."> satırını buraya yapıştır -->
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Paylaşım görseli 1200 × 630 piksel; profile.jpg yerine kullanılır. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Yusuf Başaran">
  <meta property="og:title" content="Web Sitesi Yaptırma Fiyatları ve Hesaplayıcı | Yusuf Başaran">
  <meta property="og:description" content="Gazimağusa ve KKTC için web sitesi fiyatını özelliklere göre hesaplayın. Paket, sayfa ve ek hizmetleri seçin; tahmini bütçenizi görün, hemen teklif alın.">
  <meta property="og:url" content="https://www.yusufbasaran.dev/fiyat-hesaplayici/">
  <meta property="og:locale" content="tr_TR">
  <meta property="og:image" content="https://www.yusufbasaran.dev/og-image.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Yusuf Başaran — Gazimağusa, Kıbrıs web geliştirici ve IT destek hizmetleri">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Web Sitesi Yaptırma Fiyatları ve Hesaplayıcı | Yusuf Başaran">
  <meta name="twitter:description" content="Gazimağusa ve KKTC için web sitesi fiyatını özelliklere göre hesaplayın. Paket, sayfa ve ek hizmetleri seçin; tahmini bütçenizi görün, hemen teklif alın.">
  <meta name="twitter:image" content="https://www.yusufbasaran.dev/og-image.jpg">
  <meta name="twitter:image:alt" content="Yusuf Başaran — Gazimağusa, Kıbrıs web geliştirici ve IT destek hizmetleri">

  <!-- Görünür SSS bu sayfadadır; paket kataloğu ana sayfada kalır. -->
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
    }
  ]
}
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">


  <link rel="stylesheet" href="/css/site.min.css">
  <!-- Hesaplayıcı: mevcut değişkenleri ve bileşen stillerini kullanır. -->
  <link rel="stylesheet" href="/css/price-calculator.min.css">
  <link rel="stylesheet" href="/css/calculator-page.min.css">
  <script src="/js/page-common.min.js" defer></script>
  <script src="/js/price-calculator.min.js" defer></script>
</head>
```

## Sitemap — iki gerçek URL

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.yusufbasaran.dev/</loc>
    <lastmod>2026-10-18</lastmod>
    <changefreq>monthly</changefreq>
  </url>
  <url>
    <loc>https://www.yusufbasaran.dev/fiyat-hesaplayici/</loc>
    <lastmod>2026-10-18</lastmod>
    <changefreq>monthly</changefreq>
  </url>
</urlset>
```

Ana sayfa ve yeni sayfa için lastmod 2026-10-18 (bu düzenlemenin tarihi). Anchor URL'ler sitemap'e eklenmez. İleride anlamlı içerik değişikliklerinde gerçek tarih güncellenir.

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

vercel.json aynen korunur; trailingSlash ayarı eklenmedi. Yerel sunucuda /fiyat-hesaplayici → /fiyat-hesaplayici/ → 200 çalışır, yönlendirme döngüsü yoktur. Vercel preview ve üretim yayını sonrasında iki biçimi de kontrol edin. Bir platform ayarı değişikliği gerekirse ayrıca değerlendirilmelidir; mevcut izin olmadan trailingSlash eklenmez.

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
