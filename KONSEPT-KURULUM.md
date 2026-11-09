# Bayram ve anma günü konseptleri

## Bir defalık kurulum

[Tek parça SQL dosyasını açın](https://raw.githubusercontent.com/yusuf-basaran/CV/main/sql/site-concepts.sql). Bu dosya tablo, yetki, güvenlik politikaları, zaman damgası tetikleyicisi ve otomatik takvimi etkinleştirme işlemlerinin tamamını içerir.

Sitenin bağlı olduğu Supabase projesi `hqauyhneidkjpchjhutb` olduğundan SQL bu projede çalıştırılmalıdır. Mevcut bağlı yönetim hesabının bu projeye erişimi olmadığı için kurulum, kullanıcının seçimiyle SQL Editor üzerinden yapılır; başka bir Supabase projesine veri taşınmaz.

1. [CV projesinin SQL Editor ekranını](https://supabase.com/dashboard/project/hqauyhneidkjpchjhutb/sql/new) açın.
2. [Güncel SQL dosyasının](https://raw.githubusercontent.com/yusuf-basaran/CV/main/sql/site-concepts.sql) tamamını yeni sorguya yapıştırın. Dosya, kullanıcının bildirdiği yönetici giriş adresi `yusufbasarann63@gmail.com` için hazırlanmıştır. Önceki Hotmail adresini içeren sorguyu kullanmayın. Şifre veya gizli API anahtarı gerekmez.
3. **Run** düğmesine basın. Sonuçta tek satır (`id = 1`, `preset = auto`) görünmelidir. Var olan kurulumda da otomatik takvim hemen açılır; panelden ayrıca yayınlama yapmanız gerekmez. Yönetici e-postası bulunamazsa işlem değişiklik yapmadan durur.
4. Sitedeki mevcut yönetici girişini kullanın. Yönetici çubuğunda **Site Konsepti** düğmesini açın. Panel açıksa **Yeniden Kontrol Et** ile yeni kurulumu algılatabilirsiniz.

`Doğrulanmış yönetici hesabı bulunamadı` hatası alınırsa önce bu projenin **Authentication → Users** ekranında `yusufbasarann63@gmail.com` hesabının bulunduğunu ve e-postasının doğrulanmış olduğunu kontrol edin. Kurulum bu kontrol başarısız olduğunda değişiklik yapmadan durur; doğrulama kontrolünü kaldırmayın. Site iletişim adresi `yusufbasaran63@hotmail.com` olarak kalır; giriş hesabı ile iletişim adresi farklıdır.

## Kullanım

Bir konsept seçmek o sayfada özel önizleme başlatır. Bu aşamada veritabanı ve diğer ziyaretçiler etkilenmez. **Vazgeç**, Esc veya pencere dışına tıklamak önizlemeyi iptal eder. **Konsepti Yayınla**, seçimi kaydeder; tüm ziyaretçiler için ana sayfaya, hizmet sayfasına ve fiyat hesaplayıcıya uygulanır. Başka bir tarayıcı da seçimi sunucudan okur. Açık sekmeler görünürken yaklaşık bir dakikada bir yeniler; sayfa açılışında veya sekmeye dönüldüğünde tekrar kontrol edilir.

Panelde Standart/Otomatik, Dinî bayramlar ve özel günler, Millî bayramlar, Anma günleri, Fetih/kurtuluş/tarihî günler ve Toplumsal/kültürel günler olmak üzere altı grup bulunur. Dinî bayramlarda altın tonları; millî bayramlarda kırmızı vurgu ve ay-yıldızlı kutlama bandı kullanılır. Açık/koyu tema tercihi `theme` anahtarında bağımsız kalır. Standart görünüm elle yayınlandığında bayram bandı ve ek renkler 48 saat için kaldırılır.

### Otomatik takvim ve iki günlük süre

Varsayılan seçim **Otomatik takvim**dir. Her özel gün **Türkiye saatiyle (UTC+3) 00.00’da** başlar, **48 saat** gösterilir ve ardından standart görünüm uygulanır. Örneğin 10 Kasım konsepti 10–11 Kasım’da görünür, 12 Kasım 00.00’da kapanır. Ziyaretçinin bilgisayarındaki saat dilimi başlangıcı değiştirmez. Tarih/saat hesabı ziyaretçinin cihaz saatini kullanır.

Türkiye ve KKTC için 75 tarihli özel gün tanımlıdır. Millî bayramlar, anmalar, fetih ve kurtuluş günleri, dinî günler ve toplumsal günlerin tam listesi [Özel Günler Takvimi](OZEL-GUNLER.md) içindedir. Sabit tarihliler her yıl tekrarlanır; Anneler Günü mayısın ikinci, Babalar Günü haziranın üçüncü pazar günü hesaplanır. Ramazan ve Kurban Bayramları, arefeler, Ramazan ve üç aylar başlangıcı, Regaib/Miraç/Berat/Mevlid kandilleri, Kadir Gecesi, Hicrî yılbaşı ve Aşure Günü tarihleri 2026–2030 için aşağıdaki resmî listelerden alınmıştır; her biri yine yalnızca iki gün gösterilir. Aynı yıldaki birden fazla tekrar ayrı ayrı tanımlıdır (örneğin 2027’de iki Miraç Kandili, 2028’de iki Berat Kandili, 2030’da iki Ramazan başlangıcı). Kandillerin geceyi başlatan ilk takvim tarihi esas alınır; gün batımı hesabı yapılmaz. 2031 ve sonrası için yeni dinî gün tarihleri listeye eklenmelidir; tarih tahmini yapılmaz. Genel millî bayram ve Genel anma seçeneklerinin belirli tarihi bulunmadığından bunlar elle yayınlanır. Birden fazla günün iki günlük dönemi çakışırsa bütün etkin günlerin mesajları aynı bantta birlikte gösterilir; hiçbir gün diğerini gizlemez. Ana görselde anmalar, ardından millî bayramlar, dinî günler, tarihî günler ve toplumsal günler sırasıyla önceliklidir. Aynı öncelikte yeni başlayan gün öne çıkar. Her mesaj kendi 48 saatini tamamlayınca kaldırılır; etkin başka gün yoksa standart görünüme dönülür.

| Yıl | Ramazan Bayramı başlangıcı | Kurban Bayramı başlangıcı | Kaynak |
| --- | --- | --- | --- |
| 2026 | 20 Mart | 27 Mayıs | [Diyanet 2026](https://vakithesaplama.diyanet.gov.tr/dinigunler.php?yil=2026) |
| 2027 | 9 Mart | 16 Mayıs | [Diyanet 2027](https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=154) |
| 2028 | 26 Şubat | 5 Mayıs | [Diyanet 2028](https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=185) |
| 2029 | 14 Şubat | 24 Nisan | [Diyanet 2029](https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=186) |
| 2030 | 4 Şubat | 13 Nisan | [Diyanet 2030](https://vakithesaplama.diyanet.gov.tr/icerik.php?icerik=187) |

Yönetici dilerse herhangi bir konsepti elle yayınlayabilir. Elle seçim, **sunucudaki `updated_at` anından itibaren 48 saat** için otomatik takvimin önüne geçer; sonrasında otomatik takvime dönülür. Bu anda özel gün yoksa standart görünüm gösterilir. **Otomatik takvim** yayınlanarak elle seçim hemen iptal edilebilir. Eski kaydın tekrar okunması veya başka bir sayfa açılması süreyi yeniden başlatmaz. Kurulum SQL’i mevcut elle seçimi `auto` yaparak otomatik takvimi hemen etkinleştirir. Günlük kullanımda, kaydedilmiş elle seçim iki günden eskiyse görünümde etkili olmaz. Yeni kurulum varsayılanı da `auto`dur.

Bu işlem ortak tarayıcı kodunda çalışır; cron, açık bir yönetici sekmesi veya veritabanına zamanlanmış yazma gerektirmez. Açık sayfada gece yarısı ve bitiş zamanı için zamanlayıcı bulunur; sekmeye dönüşte ayrıca kontrol edilir. Ağ kesilse de otomatik takvim ve süre sonu uygulanır. Önceki sürümün sunucu zamanı içermeyen önbelleği süresiz bir seçimi geri getirmez. Konseptler CV/PDF çıktısında görünmez.

### Anma günleri

**Site Konsepti → Anma günleri** altında 10 Kasım ve 18 Mart’ın yanında Denktaş, Dr. Fazıl Küçük, 27–28 Ocak, 6 Şubat / Şampiyon Melekler, Erenköy, 17 Ağustos, Gaziler Günü ve 21 Aralık gibi anmalar bulunur. **Fetih, kurtuluş ve tarihî günler** ile **Toplumsal ve kültürel günler** ayrı gruplardır. Genel anma elle yayınlanabilir. Anma konseptleri açık ve koyu temada sade gri tonları, siyah kurdele ve anma mesajları kullanır. 10 Kasım’da 1881–1938 ve 09.05, 18 Mart’ta 1915 vurgusu gösterilir. Önizleme, iptal, yayınlama ve üç sayfada ortak görünüm diğer konseptlerle aynı çalışır.

**Mevcut kurulum için de [güncel SQL dosyasını](sql/site-concepts.sql) CV projesinin SQL Editor ekranında bir kez yeniden çalıştırın.** Eski veritabanı kısıtı yeni konsept kimliklerini kabul etmez. Güncel dosya bütün yeni kimlikler için bu kısıtı yeniler; mevcut yetkilendirmeyi korur ve seçili konsepti `auto` yapar. Otomatik takvim SQL çalıştırıldığında etkinleşir; panelde ayrıca **Konsepti Yayınla** düğmesine basmanız gerekmez. Elle anma yayınlamak isterseniz ilgili seçeneği yayınlayabilirsiniz; bu seçim de 48 saat geçerli olur.

Sayfa içi süslemeler de seçilen konsepti izler: millî bayramlarda ay-yıldızlı Türk bayrakları, KKTC’ye ait kutlama ve tarihî günlerde Türkiye–KKTC bayrakları birlikte; 23 Nisan'da renkli flamalar; 30 Ağustos'ta defne dallı yıldız; dinî günlerde kandiller, hilal ve geometrik motifler; toplumsal günlerde turkuaz tonları ve kalp motifi gösterilir. Bayrak dizisi üst kutunun altında, küçük mühür motifi sayfa sonunda yer alır. Yerel SVG çizimleri ağdan dosya indirmez, hareket etmez, tıklamaları engellemez, ekran okuyucudan ve yazdırma çıktısından gizlenir. Mobilde bayrak dizisinin ortası gösterilir; yatay kayma oluşturmaz. Önizleme ve iptal bu detayları da kapsar. Standart görünümde tamamı kaldırılır; bayram süslemeleri için ek SQL kurulumu gerekmez.

## Güvenlik ve veri yapısı

- `cv_site_concept_settings` tek satır tutar: id, önceden tanımlı konsept kimliği ve sunucunun güncellediği zaman.
- `cv_site_concept_admins` yalnızca SQL ile yetkilendirilen kullanıcı kimliğini tutar. Giriş yapan bir kişi yalnızca kendi yetki satırını okuyabilir; ziyaretçiler bu listeyi okuyamaz ve kullanıcılar kendilerine yetki veremez.
- İki tabloda RLS açıktır. Ziyaretçi yalnızca yayınlanan seçimi okur. Yazma, yetki listesindeki hesaba ve yalnızca `preset` sütununa açıktır. Kimlik, zaman, yeni satır ekleme veya silme yetkisi verilmez.
- Veritabanındaki değer yalnızca bilinen bir kimlik olabilir. Mesajlar tarayıcıdaki sabit yapılandırmadan gelir ve textContent ile yazılır; sunucudan HTML veya CSS çalıştırılmaz.
- Mevcut projects tablosu, Storage, yönetici giriş kodu, proje modalları ve hesaplayıcı mantığı değiştirilmez. Service-role anahtarı tarayıcıya eklenmez.

## Dosyalar ve doğrulama

`js/site-concepts.js` ortak konsept tanımları, güvenli görüntüleme, önbellek ve herkese açık okuma kodudur. Diğer sayfalara Supabase SDK yüklemez. `js/concept-admin.js` yalnızca ana sayfada mevcut Supabase istemcisiyle yönetim yapar. `css/site-concepts.css` mevcut tema değişkenlerini seçili konsepte göre değiştirir; normal görünümü değiştirmez. Build yeni iki JS ve bir CSS kaynağını küçültür ve 30 yayın dosyasını hazırlar.

Kontroller: `npm run build`, `npm run test:seo`, `npm run test:concepts`. İzole PostgreSQL 17 testinde kurulumun çalışması, RLS, anonim ve yetkisiz yazmanın engellenmesi, yalnızca sahibin yayınlayabilmesi, geçersiz değerlerin reddi ve tekrar kurulumun mevcut verileri koruyarak otomatik takvimi etkinleştirmesi doğrulandı. Tarayıcıda ağ istekleri taklit edilerek giriş, önizleme/iptal, üç sayfaya yayın, başka ziyaretçi, tema, mobil, kayıt hatası, standart görünüme dönüş ve çıkış akışı kontrol edildi. Gerçek CV projesindeki SQL kurulumu ve yetkili yayınlama, SQL kullanıcı tarafından çalıştırıldıktan sonra ayrıca doğrulanmalıdır.
