# Web Sitesi Fiyat Hesaplayıcı — ayrı sayfa kurulumu

Hesaplayıcı artık **/fiyat-hesaplayici/** adresindedir. Kaynak dosya `fiyat-hesaplayici/index.html`, üretim adresi https://www.yusufbasaran.dev/fiyat-hesaplayici/ şeklindedir. Ana sayfaya eski tam hesaplayıcı bloğunu tekrar eklemeyin.

## Sayfa ve dosya yapısı

- `index.html`: Projeler ile Deneyim arasında `#hizmetler-cta` çağrı kartı; üst menüde Fiyat Hesapla, hero ve footer'da gerçek sayfa bağlantıları.
- `fiyat-hesaplayici/index.html`: tek h1, giriş, hesaplayıcı/form ve aynı altı soruluk SSS. Ana Sayfa bağlantıları, tema düğmesi ve footer.
- `js/price-calculator.js`: yedi adımın oluşturulması, gezinme ve sabit alt çubuğun güncellenmesi. CONFIG, fiyat/süre kuralları, doğrulama ve e-posta/WhatsApp mesajı korunur.
- `js/site.js`: ana sayfanın tema, Supabase proje listesi, yönetici ve modal kodu **değişmedi**.
- `js/page-common.js`: yalnızca ayrı sayfanın tema ve yıl kodu; Supabase bağımlılığı yok.
- `js/home-links.js`: eski `/#hizmetler` hash'ini `#hizmetler-cta` konumuna kaydırır. Ana sayfaya `id="hizmetler"` veya boş çapa eklenmez.
- `css/site.css`: aynı değişkenler/kart/buton/form stilleri; ortak üst çubuk kuralları ve ana sayfa CTA yazdırma kuralı.
- `css/price-calculator.css`: hesaplayıcının `#hizmetler` kapsamındaki kuralları.
- `css/calculator-page.css`: yalnızca `.calculator-page` kapsamındaki 1080 px genişlik ve sayfa yerleşimi.

## Stil kapsamı incelemesi

price-calculator.css; yedi adımlı gezinmeyi, ilerleme göstergesini, büyük seçim kartlarını, iki/tek sütunlu seçenek ızgarasını, seçili/focus durumlarını, adet alanını, yıllık gider notlarını, özeti, teklif formunu/hatalarını, SSS'yi ve tüm ekranlarda sabit fiyat çubuğunu düzenler. Kurallar #hizmetler kapsamında kalır. Ortak üst çubuk kuralları site.css'tedir; ana sayfanın görünümü ve kaynakları değişmez.

site.js içindeki tema/yıl işlemleri doğrudan Supabase kullanmaz; fakat dosyanın başında window.supabase.createClient çağrıldığı için dosyanın tamamı Supabase gerektirir. Yeni sayfaya bu nedenle site.js, Supabase CDN'i, proje kodu veya yönetici modalları yüklenmez.

## Yeni sayfanın kaynak bağlantıları

Head içinde sırasıyla:

```html
<link rel="stylesheet" href="/css/site.min.css">
<link rel="stylesheet" href="/css/price-calculator.min.css">
<link rel="stylesheet" href="/css/calculator-page.min.css">
<script src="/js/page-common.min.js" defer></script>
<script src="/js/price-calculator.min.js" defer></script>
```

Tema titremesini önleyen erken inline script ana sayfadakiyle aynıdır. İki sayfa da localStorage içindeki `theme` anahtarını kullanır. Yeni sayfanın içeriğinde reveal sınıfı yoktur.

Ana sayfa yalnızca site.min.css, home-links.min.js ve mevcut Supabase/site.min.js kaynaklarını yükler. Hesaplayıcı CSS/JS dosyaları ana sayfadan çıkarılmıştır.

## Korunan HTML kimlikleri

Hesaplayıcı ve SSS yeni sayfada `<section id="hizmetler">` içindedir. priceCalculator, calculatorSteps, calculatorSummary, calculatorTotals, calculatorSelections, calculatorSummaryDetails, calculatorReset, calculatorQuoteForm, tüm quote alanları ve fiyat-sss korunmuştur. Form ve SSS HTML'i aynı şekilde taşındı; yeni sayfa başlığı h1 oldu, adım başlıkları için öncesine bir h2 eklendi. JavaScript kapalıyken e-posta yedeği ve native details SSS erişilebilir; ana sayfadaki gerçek linkler çalışır.

## Yerleşim ve yazdırma

Her seferinde tek adım görünür: Paket, Sayfalar, Tasarım, Özellikler, Yayın ve destek, Yıllık giderler, Teklif. Geri / Devam et düğmeleri veya numaralı adım düğmeleriyle geçiş yapılır; seçimler korunur. Özeti gör düğmesi son adıma gider. Son adımda seçilen kalemler ve iletişim formu bulunur; ek kalemler özetten kaldırılabilir, seçimler sıfırlanabilir.

Seçenek kartları 760 px üzerinde iki, altında bir sütundur. Kartın tamamı tıklanabilir; yerel radio/checkbox kontrolleri, büyük dokunma hedefleri ve klavye odak stilleri kullanılır. Aktif adım aria-current ile, ilerleme ve toplamlar canlı bölgeyle bildirilir. Adım değişince odak yeni başlığa taşınır.

Proje fiyat aralığı, süre ve ayrı yıllık/aylık ücretler masaüstünde ve mobilde ekranın altında görünür. ResizeObserver gerçek çubuk yüksekliğini ölçerek sayfanın altına boşluk ayırır; form ve dönüş bağlantısı çubuğun arkasında kalmaz. Ana sayfa çağrı kartı CV/PDF çıktısında gizlenir; hesaplayıcı sayfasında sabit çubuk ve adım gezinmesi yazdırılmaz.

## Fiyat değiştirme

Tüm fiyat ve süreler js/price-calculator.js içindeki CONFIG nesnesindedir. Para biçimi tr-TR, üst sınır toplam × 1,25, aylık ve yıllık ücretler proje toplamından ayrıdır. İçerik yazımı seçili sayfa adediyle, ek özel sayfa adedi kendi birim ücretiyle çarpılır. Bu kurallar taşıma sırasında değiştirilmedi.

Ana sayfa JSON-LD OfferCatalog paket fiyatları CONFIG ile aynı olmalıdır. Kontrol edilen fiyatlar sırasıyla 4.000, 8.000, 13.000, 12.000 ve 20.000 TL'dir; fark yoktur. Fiyat değiştirince her iki sayfanın statik JSON-LD kataloğunu da güncelleyin. Build, katalog ücretleri CONFIG ile uyuşmazsa durur. Görünür paket özeti ve ana sayfadaki başlangıç fiyatı CONFIG verisinden otomatik güncellenir. Tekliflerin url alanı yeni hesaplayıcı sayfasını gösterir.

## Build ve yayın çıktısı

```bash
npm ci
npm run build
python -m http.server 8002 --directory public
```

Build; 4 JavaScript ve 4 CSS kaynağını küçültür, public klasörünü yeniden üretir ve aşağıdaki 26 dosyayı kopyalar. Yeni HTML ve sayfa-common kaynaklarının .min sürümleri dahil edilmiştir.

```text
public/apple-touch-icon.png
public/css/calculator-page.min.css
public/css/price-calculator.min.css
public/css/site.min.css
public/css/services-page.min.css
public/favicon-32x32.png
public/favicon-48x48.png
public/favicon-96x96.png
public/favicon.ico
public/favicon.svg
public/fiyat-hesaplayici/index.html
public/kktc-web-tasarim/index.html
public/icon-192.png
public/icon-512.png
public/index.html
public/js/home-links.min.js
public/js/page-common.min.js
public/js/price-calculator.min.js
public/js/site.min.js
public/og-image.jpg
public/profile.jpg
public/profile.webp
public/indexnow-key.txt
public/robots.txt
public/site.webmanifest
public/sitemap.xml
```

package.json build komutu değişmedi: `node scripts/build-assets.cjs`. Kaynakları değiştirdikten sonra build çalıştırın; üretilmiş min dosyalarını elle düzenlemeyin. public Git'e eklenmez; Vercel build sırasında üretir.

vercel.json değiştirilmedi: buildCommand npm run build, outputDirectory public ve www'suz → www yönlendirmesi korunur. trailingSlash ayarı eklenmedi. Yerel klasör/index yapısında /fiyat-hesaplayici bir yönlendirmeyle /fiyat-hesaplayici/ adresine, bu adres ise doğrudan 200'e çıkar. Ana bağlantılar canonical olan sondaki eğik çizgili adresi kullanır.

## Yayın

Kullanıcının doğrudan yayın isteğiyle değişiklikler main dalına gönderilir; Vercel bu dalı otomatik derler. Build Command `npm run build`, Output Directory `public` olarak kalır. Yeni arayüz ek kütüphane veya hizmet gerektirmez.

## Kontrol sonuçları — 21 Ekim 2026

Yedi adım, geri/ileri ve doğrudan gezinme, seçimlerin korunması, fiyat aralığı/süre hesabı, aylık/yıllık ücretlerin ayrılması, özetten kaldırma ve sıfırlama kontrol edilir. Örnek kapsam: Çok Sayfalı Site + Hakkımızda + Galeri + 2 özel sayfa + Özel tasarım + İletişim formu + 5 sayfa içerik yazımı = 16.000–20.000 TL, 24 iş günü. Bakım 750 TL/ay ve seçilen .dev/paylaşımlı hosting 2.700 TL/yıl ayrıca gösterilir.

320, 375 ve 768 px ekranlarda sabit çubuk, yatay taşma, erişilebilir form/footer; ortak tema, ana sayfa Supabase proje listesi ve modallar; tek h1/canonical/meta, kaynak yolları ve görünür SSS/JSON-LD uyumu kontrol edilir. E-posta/WhatsApp aynı mesajı üretir; gerçek mesaj gönderilmez ve Supabase verisi değiştirilmez. CONFIG ve fiyat/süre/mesaj/doğrulama fonksiyonları önceki sürümle karşılaştırılır. site.js değiştirilmez.

## Arama erişimi — 23 Ekim 2026

Hesaplayıcının altında yerel HTML details öğesiyle açılan beş paketlik bir karşılaştırma özeti vardır. Fiyatlar ve süreler `scripts/prepare-search-content.cjs` tarafından CONFIG'ten alınır. Kaynak HTML ve public çıktısı aynı metni içerir; JavaScript çalıştırmayan ziyaretçiler ve botlar paketleri, yıllık ücret açıklamasını ve SSS'yi okuyabilir. Bu içerik yalnızca botlara gösterilmez.

Tarayıcıdaki CONFIG, fiyatlama, adım sistemi ve gönderim işlevleri değiştirilmemiştir. Ana sayfanın profilinde 21 KB WebP ve JPEG yedeği kullanılır; diğer görseller ve Supabase kodu korunur. SEO değişikliklerinin doğrulaması `npm run build && npm run test:seo` ile yapılır.

`indexnow-key.txt`, alan adı sahipliğinin IndexNow tarafından sınanabilmesi için yayınlanan bir metin dosyasıdır; Google doğrulama kodu değildir. Vercel Production yayını başarılı olduktan sonra `.github/workflows/indexnow.yml`, `npm run submit:indexnow` komutunu çalıştırır. Bu komut canlı sahiplik dosyasını ve canonical URL'leri kontrol eder, sitemap'teki üç adresi tek istekte bildirir. Bildirim alınması dizine eklenme anlamına gelmez. Aynı komut çok sık veya her sayfa ziyaretinde çalıştırılmaz.

## KKTC hizmet sayfası

`/kktc-web-tasarim/`, CV'deki web becerilerine dayanan hizmetleri KKTC geneli için anlatır. Ana sayfanın menü/çağrı kartı/footer'ından, hesaplayıcının footer'ından erişilir. Bu sayfa hesaplayıcının yerini almaz; fiyat seçimleri `/fiyat-hesaplayici/` içinde kalır. Bağımsız sayfa yalnızca `site.min.css`, `services-page.min.css` ve tema/yıl için `page-common.min.js` kullanır. Proje, Supabase ve yönetici kodu yüklenmez.

Yeni sayfanın başlangıç fiyatı da CONFIG'ten üretilir. Hesaplayıcı yapılandırması, fiyatlama, form ve adımlı akış değiştirilmemiştir. Üç canonical URL birbirinden ayrıdır; IndexNow bildirimi sitemap'teki üçünü içerir.
