# Yayın teşhisi ve Search Console hazırlığı

Kontrol tarihi: 18 Ekim 2026. İnceleme önce kaynak dosyaları ve yayın ayarları değiştirilmeden yapıldı; kullanıcının istediği npm ci ve build yalnızca bağımlılıkları ve üretilen çıktıları yeniledi.

## Teşhis ve kanıt

- Çalışılan dal main; başlangıçta çalışma ağacı temiz ve origin/main ile aynıydı.
- Son commit: 2485e0f — Add website price calculator, local SEO and working Vercel deployment.
- PR #1 MERGED durumunda; 18 Ekim 2026 15:59:21 UTC tarihinde squash merge yapılmış. Feature dalı hâlâ listelenebilir; bu değişikliklerin main'de bulunmadığını göstermez. Feature ile main arasında index.html, build script'i ve vercel.json farkı yoktu.
- Önceki başarısız önizlemenin somut hatası STATIC_BUILD_NO_OUT_DIR: `No Output Directory named "public" found after the Build completed. Configure the Output Directory in your Project Settings. Alternatively, configure vercel.json#outputDirectory.`
- Bu eski hata main'deki build script'inde daha önce giderilmiş. Kontrolde son production yayını dpl_2i1gdyATbbvF75q4GG6XraikiASm, commit 2485e0f için READY idi.
- Hem https://www.yusufbasaran.dev/ hem https://yusufbasaran.dev/ adresinden indirilen HTML, yerel public/index.html ile bayt düzeyinde aynıydı. Başlangıç SHA-256: 30732bed49ea2c9e83c6699fc97b1df7f085485c0cf1e85970b1e0814c50c08a.
- Canlı kaynakta yeni title/description, OG görseli, JSON-LD ve id="hizmetler" bölümü vardı. Yeni tarayıcı oturumunda fiyat hesaplayıcı görünür, toplam 4.000–5.000 TL ve proje sayısı 4 idi; JavaScript hatası yoktu.

**Sonuç:** Eski başarısız deploy'un nedeni eksik public çıktısıydı; mevcut kaynak ve canlı yayında bu hata tekrarlanmadı. Bu kontrolde “canlıda eski meta ve eksik Hizmetler” durumu gözlenmedi. Kullanıcının tarayıcısında eski içerik görülmesinin önbellek veya eski önizleme adresiyle ilgili olduğu bu verilerle kesinleştirilemez. Önce gizli pencerede tam üretim adresi açılarak ve Ctrl+Shift+R ile yeniden yüklenerek karşılaştırılabilir; mevcut build'e kanıtsız bir değişiklik yapılmadı.

## Build ne yapıyor?

package.json içindeki `build`, `node scripts/build-assets.cjs` çalıştırır. Script, site ve hesaplayıcı CSS/JS kaynaklarını küçültür. Global JavaScript fonksiyon adları korunur. Sonra üretilmiş public dizinini temizleyip yalnızca gerekli 15 yayın dosyasını buraya kopyalar. Vercel buildCommand `npm run build`, outputDirectory `public` değerlerini kullanır.

`npm ci && npm run build` exit code 0 ile tamamlandı:

```text
added 12 packages
> build
> node scripts/build-assets.cjs
site: JS 25934 → 17346 bayt; CSS 26021 → 20044 bayt
price-calculator: JS 27735 → 19944 bayt; CSS 5343 → 4511 bayt
public: 15 yayın dosyası hazır
```

Hata mesajı yoktu. Public içeriği eksiksizdi:

```text
public/index.html
public/css/site.min.css
public/css/price-calculator.min.css
public/js/site.min.js
public/js/price-calculator.min.js
public/profile.jpg
public/og-image.jpg
public/favicon.svg
public/favicon-32x32.png
public/apple-touch-icon.png
public/icon-192.png
public/icon-512.png
public/site.webmanifest
public/robots.txt
public/sitemap.xml
```

HTML'nin yerel src/href yolları, OG görseli ve manifest ikonları public içinde bulundu. Dış CDN/font/Supabase görselleri yerel dosya olarak beklenmez. Kök canonical adresi index.html'e karşılık gelir.

.gitignore yalnızca node_modules/ ve public/ içerir. Public build sırasında üretildiği için bu normaldir. Dört .min.css/.min.js dosyası Git tarafından takip edilir; dışlanmıyor. Kaynaklar ve build bağımlılıkları yayın klasörüne kopyalanmaz.

## Bu kontrolde değişen dosyalar

- **index.html:** npm kayıtlarından doğrulanmış son kararlı 2.x sürümü olan @supabase/supabase-js@2.118.0 CDN bağlantısına sabitlendi. Defer ve bağımlılık sırası korundu. Google doğrulaması için yalnızca aşağıdaki yorum eklendi; gerçek meta veya uydurma kod yok:

```html
<!-- GOOGLE_SITE_VERIFICATION: Search Console'dan aldığın <meta name="google-site-verification" content="..."> satırını buraya yapıştır -->
```

- **SEO-KURULUM.md:** Tam head/script örnekleri sabit CDN sürümü ve doğrulama yorumuyla eşitlendi. DNS doğrulamasında HTML meta gerekmediği açıklandı.
- **YAYIN-TESHIS-VE-SEARCH-CONSOLE.md:** Bu teşhis, kontrol listeleri ve Google/Bing rehberi eklendi.

Build script'i, hesaplayıcı kodu, site JavaScript'i, CSS, package dosyaları ve vercel.json değiştirilmedi. sitemap.xml geçerli XML; tek loc https://www.yusufbasaran.dev/ ve lastmod bugünün tarihi 2026-10-18 idi, değiştirilmedi. robots.txt tüm botlara Allow: / verir ve doğru sitemap satırını içerir, değiştirilmedi.

Person.sameAs yalnızca doğrulanmış GitHub adresini içerir: https://github.com/yusuf-basaran. LinkedIn placeholder yorumu aynen korundu; gerçek LinkedIn profil adresi istenmiştir. Doğrulanmadan yeni sosyal URL eklenmedi.

Yönetici girişi ve proje ekleme arayüzleri aynı HTML içindeki modallardır; ayrı admin sayfası/URL yok. Bu nedenle robots veya noindex değişikliği yapılmadı. Modal görünürlüğü indekslemeye karşı bir güvenlik mekanizması değildir; mevcut Supabase yetkilendirmesi değiştirilmedi.

## Sonraki doğrulama

Değişiklikten sonra `npm run build` tekrar exit code 0 ile bitti. Sabit CDN isteği ve Supabase /rest/v1/projects sorgusu 200 döndü; 4 proje yüklendi. Hesaplayıcıda Çok Sayfalı Site + Yönetici paneli seçimi 12.000–15.000 TL üretti. Yönetici/proje modallarının açılması ve Escape ile kapanması, mobil taşma olmaması kontrol edildi. Gerçek yönetici girişi veya veri yazma/silme işlemi yapılmadı. Google doğrulama meta etiketi sayısı 0; yorum placeholder sayısı 1 idi. Kaynak uygulama/hesaplayıcı dosyaları değişmedi.

## Vercel ayarlarını kontrol etme

1. Vercel'de **cv** projesini açın. **Project Settings → Git** altında doğru deponun **yusuf-basaran/CV**, **Production Branch** değerinin **main** olduğunu kontrol edin. Arayüz sürümüne göre Production Branch, **Environments → Production → Branch Tracking** altında bulunabilir. Kontrolde production yayınının main commit'inden üretildiği doğrulandı.
2. **Project Settings → Build & Development Settings** (bazı arayüzlerde **Build and Deployment**) içinde Framework **Other**, Root Directory depo kökü, Build Command **npm run build**, Output Directory **public** olmalı. vercel.json bu iki değeri zaten açıkça tanımlar; çelişen dashboard override'ı kullanmayın.
3. **Deployments** içinde son **Production** kaydını açın. Branch **main**, commit son GitHub main commit'i ve durum **Ready** olmalı. Build Logs'ta npm kurulumu, build ve `public: 15 yayın dosyası hazır` satırını arayın. Error/Cancelled durumunda eski başarılı yayın hizmet vermeye devam edebilir; sadece push yapılması yeni sürümün yayımlandığını kanıtlamaz.
4. Gerekirse son doğru commit'in deployment menüsünde **Redeploy** seçilebilir. Mevcut kontrolde build ve production yayını çalıştığından ayar değiştirmek gerekmedi.
5. **Domains** içinde www.yusufbasaran.dev bu üretim yayınına bağlı olmalı. Mevcut domain ayarında www'suz adres www'ya 308 ile kalıcı yönlenir; vercel.json aynı yönde 301 yedek kuralı içerir. Domain düzeyindeki kural önce çalışabilir. Yönü tersine çevirmeyin.

## Canlı kontrol listesi

1. https://www.yusufbasaran.dev/#hizmetler adresinde Hizmetler ve hesaplayıcı görünmeli; paket değişince toplam güncellenmeli.
2. Sayfa kaynağında yeni title, description, https://www.yusufbasaran.dev/og-image.jpg ve application/ld+json bulunmalı. Google yorumu, doğrulama yapılana kadar gerçek meta etiketi değildir.
3. https://yusufbasaran.dev/ www adresine kalıcı yönlenmeli; döngü olmamalı.
4. https://www.yusufbasaran.dev/robots.txt ve https://www.yusufbasaran.dev/sitemap.xml 200 ile açılmalı.

## BENİM ELLE YAPACAKLARIM

1. **Google Search Console:** https://search.google.com/search-console → **Mülk ekle → Alan adı** seçin. `yusufbasaran.dev` yazın; https veya www eklemeyin. Google'ın verdiği gerçek `google-site-verification=...` TXT değerini kopyalayın.
2. **DNS TXT kaydı:** DNS Vercel'deyse **Vercel → Domains → yusufbasaran.dev → DNS Records → Add**: Type **TXT**, Name boş veya **@**, Value Google'dan kopyalanan gerçek metin. **Bu kontrolde yetkili DNS sunucuları ns1bcp.name.com, ns2dqx.name.com, ns3cqz.name.com ve ns4cfn.name.com çıktı. Mevcut durumda kaydı Name.com'un DNS panelinde eklemelisiniz.** Siteyi Vercel'de barındırmak DNS'in de Vercel'de olduğu anlamına gelmez. E-posta gibi diğer DNS kayıtlarını veya nameserver'ları değiştirmeyin. Sonra Search Console'da **Doğrula**'ya basın. Yayılma dakikalar–saatler sürebilir.
3. **Alternatif HTML yöntemi:** **URL öneki** mülkü olarak `https://www.yusufbasaran.dev/` ekleyin, **HTML etiketi** yöntemini seçin. Google'ın verdiği tam meta satırını index.html'deki GOOGLE_SITE_VERIFICATION yorumu yerine ekleyip build/deploy yapın. **Alan adı + DNS TXT yöntemini kullanacaksanız bu HTML değişikliği gerekmez.**
4. Tarayıcıda https://www.yusufbasaran.dev/sitemap.xml açılıyor mu kontrol edin. **Search Console → Site Haritaları** alanına `sitemap.xml` yazıp **Gönder** seçin; durum **Başarılı** olmalı. Alan adı mülkünde arayüz tam URL istiyorsa `https://www.yusufbasaran.dev/sitemap.xml` yazın.
5. **URL Denetimi** çubuğuna `https://www.yusufbasaran.dev/` yazın; gerekirse **Canlı URL'yi test et**, ardından **Dizine eklenmesini iste** seçin. Büyük içerik değişikliklerinden sonra tekrarlayın. Bu işlem anında indeksleme garantisi vermez.
6. Birkaç gün sonra **Sayfa dizine ekleme** ve **Performans** raporlarını kontrol edin. JSON-LD'yi https://search.google.com/test/rich-results adresinde canlı URL ile test edin. Person/WebSite gibi her şema türünün Google'da bir zengin sonuç üretmesi gerekmez; genel şema doğrulaması için https://validator.schema.org/ kullanılabilir.
7. **Bing Webmaster Tools:** https://www.bing.com/webmasters → **Google Search Console'dan içe aktar** ile doğrulanmış siteyi ekleyin. İçe aktarma ekranında Google hesabınızla yetkiyi kendiniz verin.

Google/Bing hesabınıza giriş yapılmadı, uydurma doğrulama kodu üretilmedi ve TXT kaydı eklenmedi. Bunlar gerçek Google kodu ve hesap yetkilendirmesi gerektirir.
