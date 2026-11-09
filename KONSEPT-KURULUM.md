# Bayram ve anma günü konseptleri

## Bir defalık kurulum

Sitenin bağlı olduğu Supabase projesi `hqauyhneidkjpchjhutb` olduğundan SQL bu projede çalıştırılmalıdır. Mevcut bağlı yönetim hesabının bu projeye erişimi olmadığı için kurulum, kullanıcının seçimiyle SQL Editor üzerinden yapılır; başka bir Supabase projesine veri taşınmaz.

1. [CV projesinin SQL Editor ekranını](https://supabase.com/dashboard/project/hqauyhneidkjpchjhutb/sql/new) açın.
2. [Güncel SQL dosyasının](https://raw.githubusercontent.com/yusuf-basaran/CV/main/sql/site-concepts.sql) tamamını yeni sorguya yapıştırın. Dosya, kullanıcının bildirdiği yönetici giriş adresi `yusufbasarann63@gmail.com` için hazırlanmıştır. Önceki Hotmail adresini içeren sorguyu kullanmayın. Şifre veya gizli API anahtarı gerekmez.
3. **Run** düğmesine basın. Sonuçta tek satır (`id = 1`, `preset = auto`) görünmelidir. Var olan kurulumda daha önce seçilen konsept korunur. Yönetici e-postası bulunamazsa işlem değişiklik yapmadan durur.
4. Sitedeki mevcut yönetici girişini kullanın. Yönetici çubuğunda **Site Konsepti** düğmesini açın. Panel açıksa **Yeniden Kontrol Et** ile yeni kurulumu algılatabilirsiniz.

`Doğrulanmış yönetici hesabı bulunamadı` hatası alınırsa önce bu projenin **Authentication → Users** ekranında `yusufbasarann63@gmail.com` hesabının bulunduğunu ve e-postasının doğrulanmış olduğunu kontrol edin. Kurulum bu kontrol başarısız olduğunda değişiklik yapmadan durur; doğrulama kontrolünü kaldırmayın. Site iletişim adresi `yusufbasaran63@hotmail.com` olarak kalır; giriş hesabı ile iletişim adresi farklıdır.

## Kullanım

Bir konsept seçmek o sayfada özel önizleme başlatır. Bu aşamada veritabanı ve diğer ziyaretçiler etkilenmez. **Vazgeç**, Esc veya pencere dışına tıklamak önizlemeyi iptal eder. **Konsepti Yayınla**, seçimi kaydeder; tüm ziyaretçiler için ana sayfaya, hizmet sayfasına ve fiyat hesaplayıcıya uygulanır. Başka bir tarayıcı da seçimi sunucudan okur. Açık sekmeler görünürken yaklaşık bir dakikada bir yeniler; sayfa açılışında veya sekmeye dönüldüğünde tekrar kontrol edilir.

Seçenekler: Otomatik takvim, Standart görünüm, Ramazan Bayramı, Kurban Bayramı, genel millî bayram, 23 Nisan, 19 Mayıs, 20 Temmuz (KKTC), 30 Ağustos, 29 Ekim ve 15 Kasım (KKTC). Dinî bayramlarda altın tonları; millî bayramlarda kırmızı vurgu ve ay-yıldızlı kutlama bandı kullanılır. Açık/koyu tema tercihi `theme` anahtarında bağımsız kalır. Standart görünüm elle yayınlandığında bayram bandı ve ek renkler 48 saat için kaldırılır.

### Otomatik takvim ve iki günlük süre

Varsayılan seçim **Otomatik takvim**dir. Her özel gün **Türkiye saatiyle (UTC+3) 00.00’da** başlar, **48 saat** gösterilir ve ardından standart görünüm uygulanır. Örneğin 10 Kasım konsepti 10–11 Kasım’da görünür, 12 Kasım 00.00’da kapanır. Ziyaretçinin bilgisayarındaki saat dilimi başlangıcı değiştirmez. Tarih/saat hesabı ziyaretçinin cihaz saatini kullanır.

23 Nisan, 19 Mayıs, 20 Temmuz, 30 Ağustos, 29 Ekim, 10 Kasım, 15 Kasım ve 18 Mart her yıl otomatik tekrarlanır. Ramazan ve Kurban Bayramı başlangıçları 2026–2030 için aşağıdaki resmî listelerden alınmıştır; her biri yine yalnızca iki gün gösterilir. 2031 ve sonrası için yeni dinî bayram tarihleri listeye eklenmelidir; tarih tahmini yapılmaz. Genel millî bayram ve Genel anma seçeneklerinin belirli tarihi bulunmadığından bunlar elle yayınlanır. İki özel gün çakışırsa daha yeni başlayan gün önceliklidir; iki günlük bir dönem bittiğinde başka bir özel gün başlamışsa sıradaki konsept gösterilir.

| Yıl | Ramazan Bayramı başlangıcı | Kurban Bayramı başlangıcı | Kaynak |
| --- | --- | --- | --- |
| 2026 | 20 Mart | 27 Mayıs | [Diyanet 2026](https://vakithesaplama.diyanet.gov.tr/dinigunler.php?yil=2026) |
| 2027 | 9 Mart | 16 Mayıs | [Diyanet 2027](https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=154) |
| 2028 | 26 Şubat | 5 Mayıs | [Diyanet 2028](https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=185) |
| 2029 | 14 Şubat | 24 Nisan | [Diyanet 2029](https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=186) |
| 2030 | 4 Şubat | 13 Nisan | [Diyanet 2030](https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=187) |

Yönetici dilerse herhangi bir konsepti elle yayınlayabilir. Elle seçim, **sunucudaki `updated_at` anından itibaren 48 saat** için otomatik takvimin önüne geçer; sonrasında otomatik takvime dönülür. Bu anda özel gün yoksa standart görünüm gösterilir. **Otomatik takvim** yayınlanarak elle seçim hemen iptal edilebilir. Eski kaydın tekrar okunması veya başka bir sayfa açılması süreyi yeniden başlatmaz. Mevcut kurulumda kayıtlı seçim korunur ancak iki günden eskiyse görünümde etkili olmaz; kurulumun `normal` varsayılanı yeni kurulumlar için `auto` olarak güncellenmiştir.

Bu işlem ortak tarayıcı kodunda çalışır; cron, açık bir yönetici sekmesi veya veritabanına zamanlanmış yazma gerektirmez. Açık sayfada gece yarısı ve bitiş zamanı için zamanlayıcı bulunur; sekmeye dönüşte ayrıca kontrol edilir. Ağ kesilse de otomatik takvim ve süre sonu uygulanır. Önceki sürümün sunucu zamanı içermeyen önbelleği süresiz bir seçimi geri getirmez. Konseptler CV/PDF çıktısında görünmez.

### Anma günleri

**Site Konsepti → Anma günleri** altında **10 Kasım · Atatürk’ü Anma**, **18 Mart · Şehitleri Anma** ve **Genel anma** seçenekleri bulunur. Anma konseptleri açık ve koyu temada sade gri tonları, siyah kurdele ve anma mesajları kullanır. 10 Kasım’da 1881–1938 ve 09.05, 18 Mart’ta 1915 vurgusu gösterilir. Önizleme, iptal, yayınlama ve üç sayfada ortak görünüm diğer konseptlerle aynı çalışır.

**Mevcut kurulum için de [güncel SQL dosyasını](sql/site-concepts.sql) CV projesinin SQL Editor ekranında bir kez yeniden çalıştırın.** Eski veritabanı kısıtı yeni konsept kimliklerini kabul etmez. Güncel dosya bu kısıtı yeniler; seçili konsepti ve mevcut yetkilendirmeyi korur. Otomatik kullanım için panelde **Otomatik takvim** seçeneğini yayınlayın. Elle anma yayınlamak isterseniz ilgili seçeneği yayınlayabilirsiniz; bu seçim de 48 saat geçerli olur.

Sayfa içi süslemeler de seçilen konsepti izler: millî bayramlarda ay-yıldızlı Türk bayrakları, 20 Temmuz ve 15 Kasım'da Türkiye–KKTC bayrakları birlikte; 23 Nisan'da renkli flamalar; 30 Ağustos'ta defne dallı yıldız; dinî bayramlarda kandiller, hilal ve geometrik motifler gösterilir. Bayrak dizisi üst kutunun altında, küçük mühür motifi sayfa sonunda yer alır. Yerel SVG çizimleri ağdan dosya indirmez, hareket etmez, tıklamaları engellemez, ekran okuyucudan ve yazdırma çıktısından gizlenir. Mobilde bayrak dizisinin ortası gösterilir; yatay kayma oluşturmaz. Önizleme ve iptal bu detayları da kapsar. Standart görünümde tamamı kaldırılır; bayram süslemeleri için ek SQL kurulumu gerekmez.

## Güvenlik ve veri yapısı

- `cv_site_concept_settings` tek satır tutar: id, önceden tanımlı konsept kimliği ve sunucunun güncellediği zaman.
- `cv_site_concept_admins` yalnızca SQL ile yetkilendirilen kullanıcı kimliğini tutar. Giriş yapan bir kişi yalnızca kendi yetki satırını okuyabilir; ziyaretçiler bu listeyi okuyamaz ve kullanıcılar kendilerine yetki veremez.
- İki tabloda RLS açıktır. Ziyaretçi yalnızca yayınlanan seçimi okur. Yazma, yetki listesindeki hesaba ve yalnızca `preset` sütununa açıktır. Kimlik, zaman, yeni satır ekleme veya silme yetkisi verilmez.
- Veritabanındaki değer yalnızca bilinen bir kimlik olabilir. Mesajlar tarayıcıdaki sabit yapılandırmadan gelir ve textContent ile yazılır; sunucudan HTML veya CSS çalıştırılmaz.
- Mevcut projects tablosu, Storage, yönetici giriş kodu, proje modalları ve hesaplayıcı mantığı değiştirilmez. Service-role anahtarı tarayıcıya eklenmez.

## Dosyalar ve doğrulama

`js/site-concepts.js` ortak konsept tanımları, güvenli görüntüleme, önbellek ve herkese açık okuma kodudur. Diğer sayfalara Supabase SDK yüklemez. `js/concept-admin.js` yalnızca ana sayfada mevcut Supabase istemcisiyle yönetim yapar. `css/site-concepts.css` mevcut tema değişkenlerini seçili konsepte göre değiştirir; normal görünümü değiştirmez. Build yeni iki JS ve bir CSS kaynağını küçültür ve 30 yayın dosyasını hazırlar.

Kontroller: `npm run build`, `npm run test:seo`, `npm run test:concepts`. İzole PostgreSQL 17 testinde kurulumun çalışması, RLS, anonim ve yetkisiz yazmanın engellenmesi, yalnızca sahibin yayınlayabilmesi, geçersiz değerlerin reddi ve tekrar kurulumda aktif seçimin korunması doğrulandı. Tarayıcıda ağ istekleri taklit edilerek giriş, önizleme/iptal, üç sayfaya yayın, başka ziyaretçi, tema, mobil, kayıt hatası, standart görünüme dönüş ve çıkış akışı kontrol edildi. Gerçek CV projesindeki SQL kurulumu ve yetkili yayınlama, SQL kullanıcı tarafından çalıştırıldıktan sonra ayrıca doğrulanmalıdır.
