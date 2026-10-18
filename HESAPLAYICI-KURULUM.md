# Web Sitesi Fiyat Hesaplayıcı — ayrı sayfa kurulumu

Hesaplayıcı artık **/fiyat-hesaplayici/** adresindedir. Kaynak dosya `fiyat-hesaplayici/index.html`, üretim adresi https://www.yusufbasaran.dev/fiyat-hesaplayici/ şeklindedir. Ana sayfaya eski tam hesaplayıcı bloğunu tekrar eklemeyin.

## Sayfa ve dosya yapısı

- `index.html`: Projeler ile Deneyim arasında `#hizmetler-cta` çağrı kartı; üst menüde Fiyat Hesapla, hero ve footer'da gerçek sayfa bağlantıları.
- `fiyat-hesaplayici/index.html`: tek h1, giriş, hesaplayıcı/form ve aynı altı soruluk SSS. Ana Sayfa bağlantıları, tema düğmesi ve footer.
- `js/price-calculator.js`: CONFIG, fiyat/süre hesaplaması, özet, sıfırlama, doğrulama ve e-posta/WhatsApp gönderimi **değişmedi**.
- `js/site.js`: ana sayfanın tema, Supabase proje listesi, yönetici ve modal kodu **değişmedi**.
- `js/page-common.js`: yalnızca ayrı sayfanın tema ve yıl kodu; Supabase bağımlılığı yok.
- `js/home-links.js`: eski `/#hizmetler` hash'ini `#hizmetler-cta` konumuna kaydırır. Ana sayfaya `id="hizmetler"` veya boş çapa eklenmez.
- `css/site.css`: aynı değişkenler/kart/buton/form stilleri; ortak üst çubuk kuralları ve ana sayfa CTA yazdırma kuralı.
- `css/price-calculator.css`: hesaplayıcının `#hizmetler` kapsamındaki kuralları.
- `css/calculator-page.css`: yalnızca `.calculator-page` kapsamındaki 960 px genişlik ve sayfa yerleşimi.

## Stil kapsamı incelemesi

price-calculator.css; adım ve seçenek kartlarını, iki/tek sütunlu seçenek ızgarasını, seçili/focus durumlarını, adet alanını, yıllık gider notlarını, toplam/özet listesini, teklif formunu/hatalarını, SSS'yi ve 680 px altındaki sabit alt kutuyu düzenler. Üst çubuğu etkileyen `.top-bar:has(.services-nav)` ve mobil `.services-nav` kuralları buradan site.css'e taşındı. Print sırasında çağrı kartı ve services-nav ortak CSS'te gizlenir. Ayrı hesaplayıcı sayfasının tamamını gizleyen eski print kuralı kaldırıldı; hesaplayıcı sayfasında toplam kutusu yazdırırken normal akışa döner.

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

Masaüstünde (900 px ve üstü) seçenek/adımlar solda, toplam kutusu sağda sticky durumdadır. 681–899 px aralığında akış tek ana sütundur. Seçenek kartları masaüstünde iki, 680 px ve altında bir sütundur. Mobil alt kutunun hesaplama ve görünürlük mantığı değişmedi. Yeni sayfaya özel alt boşluk, form ve dönüş linkinin kutunun arkasında kalmadan kaydırılabilmesini sağlar.

Ana sayfa çağrı kartı CV/PDF çıktısında gizlenir. Yeni sayfada içerik görünür kalır; toplam kutusu sabitlenmez.

## Fiyat değiştirme

Tüm fiyat ve süreler js/price-calculator.js içindeki CONFIG nesnesindedir. Para biçimi tr-TR, üst sınır toplam × 1,25, aylık ve yıllık ücretler proje toplamından ayrıdır. İçerik yazımı seçili sayfa adediyle, ek özel sayfa adedi kendi birim ücretiyle çarpılır. Bu kurallar taşıma sırasında değiştirilmedi.

Ana sayfa JSON-LD OfferCatalog paket fiyatları CONFIG ile aynı olmalıdır. Kontrol edilen fiyatlar sırasıyla 4.000, 8.000, 13.000, 12.000 ve 20.000 TL'dir; fark yoktur. Fiyat değiştirince statik kataloğu da güncelleyin. Tekliflerin url alanı yeni hesaplayıcı sayfasını gösterir.

## Build ve yayın çıktısı

```bash
npm ci
npm run build
python -m http.server 8002 --directory public
```

Build; 4 JavaScript ve 3 CSS kaynağını küçültür, public klasörünü yeniden üretir ve aşağıdaki 19 dosyayı kopyalar. Yeni HTML ve sayfa-common kaynaklarının .min sürümleri dahil edilmiştir.

```text
public/apple-touch-icon.png
public/css/calculator-page.min.css
public/css/price-calculator.min.css
public/css/site.min.css
public/favicon-32x32.png
public/favicon.svg
public/fiyat-hesaplayici/index.html
public/icon-192.png
public/icon-512.png
public/index.html
public/js/home-links.min.js
public/js/page-common.min.js
public/js/price-calculator.min.js
public/js/site.min.js
public/og-image.jpg
public/profile.jpg
public/robots.txt
public/site.webmanifest
public/sitemap.xml
```

package.json build komutu değişmedi: `node scripts/build-assets.cjs`. Kaynakları değiştirdikten sonra build çalıştırın; üretilmiş min dosyalarını elle düzenlemeyin. public Git'e eklenmez; Vercel build sırasında üretir.

vercel.json değiştirilmedi: buildCommand npm run build, outputDirectory public ve www'suz → www yönlendirmesi korunur. trailingSlash ayarı eklenmedi. Yerel klasör/index yapısında /fiyat-hesaplayici bir yönlendirmeyle /fiyat-hesaplayici/ adresine, bu adres ise doğrudan 200'e çıkar. Ana bağlantılar canonical olan sondaki eğik çizgili adresi kullanır.

## Dal ve birleştirme

Çalışma dalı `feat/standalone-price-calculator`. Ana dal bu taşıma için otomatik birleştirilmez. Dalı göndermek ve PR açmak için:

```bash
git switch feat/standalone-price-calculator
npm run build
git push -u origin feat/standalone-price-calculator
gh pr create --base main --head feat/standalone-price-calculator
```

PR'da dosyaları ve Vercel preview sonucunu kontrol ettikten sonra GitHub'da Merge seçin. Vercel Deployments'ta main commit'i için Production / Ready durumunu doğrulayın. Search Console'da yeni URL'yi denetleyip dizine eklenmesini isteyin ve iki URL içeren sitemap'i yeniden gönderin.

## Kontrol kapsamı

İki sayfada gerçek linkler/dosya yolları, tek h1/canonical, yinelenmeyen meta, taşınmış FAQ ve paket fiyatlarının CONFIG ile eşleşmesi; hesaplayıcı seçimi/form/payload, 375 px alt kutusu, tema/yıl, JS kapalı kullanım ve ana sayfa proje/modal akışları kontrol edilir. Gerçek e-posta/WhatsApp gönderimi veya Supabase veri yazma/silme yapılmaz.
