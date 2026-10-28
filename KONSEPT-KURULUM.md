# Dinî ve millî bayram konseptleri

## Bir defalık kurulum

Sitenin bağlı olduğu Supabase projesi `hqauyhneidkjpchjhutb` olduğundan SQL bu projede çalıştırılmalıdır. Mevcut bağlı yönetim hesabının bu projeye erişimi olmadığı için kurulum, kullanıcının seçimiyle SQL Editor üzerinden yapılır; başka bir Supabase projesine veri taşınmaz.

1. [CV projesinin SQL Editor ekranını](https://supabase.com/dashboard/project/hqauyhneidkjpchjhutb/sql/new) açın.
2. `sql/site-concepts.sql` dosyasının tamamını yeni sorguya yapıştırın. Dosya `yusufbasaran63@hotmail.com` hesabına göre hazırlanmıştır; sitede yönetici girişinde başka e-posta kullanılıyorsa iki e-posta satırını o adresle değiştirin. Şifre veya gizli API anahtarı gerekmez.
3. **Run** düğmesine basın. Sonuçta tek satır (`id = 1`, `preset = normal`) görünmelidir. Var olan kurulumda daha önce seçilen konsept korunur. Yönetici e-postası bulunamazsa işlem değişiklik yapmadan durur.
4. Sitedeki mevcut yönetici girişini kullanın. Yönetici çubuğunda **Site Konsepti** düğmesini açın. Panel açıksa **Yeniden Kontrol Et** ile yeni kurulumu algılatabilirsiniz.

## Kullanım

Bir konsept seçmek o sayfada özel önizleme başlatır. Bu aşamada veritabanı ve diğer ziyaretçiler etkilenmez. **Vazgeç**, Esc veya pencere dışına tıklamak önizlemeyi iptal eder. **Konsepti Yayınla**, seçimi kaydeder; tüm ziyaretçiler için ana sayfaya, hizmet sayfasına ve fiyat hesaplayıcıya uygulanır. Başka bir tarayıcı da seçimi sunucudan okur. Açık sekmeler görünürken yaklaşık bir dakikada bir yeniler; sayfa açılışında veya sekmeye dönüldüğünde tekrar kontrol edilir.

Seçenekler: Standart görünüm, Ramazan Bayramı, Kurban Bayramı, genel millî bayram, 23 Nisan, 19 Mayıs, 20 Temmuz (KKTC), 30 Ağustos, 29 Ekim ve 15 Kasım (KKTC). Dinî bayramlarda altın tonları; millî bayramlarda kırmızı vurgu ve ay-yıldızlı kutlama bandı kullanılır. Açık/koyu tema tercihi `theme` anahtarında bağımsız kalır. Standart görünüm yayınlandığında bayram bandı ve ek renkler tamamen kaldırılır.

Konsept seçimi elle yapılır; otomatik takvim veya bitiş tarihi yoktur. Bayram sonrasında Standart görünümü yayınlayın. Konseptler CV/PDF çıktısında görünmez.

## Güvenlik ve veri yapısı

- `cv_site_concept_settings` tek satır tutar: id, önceden tanımlı konsept kimliği ve sunucunun güncellediği zaman.
- `cv_site_concept_admins` yalnızca SQL ile yetkilendirilen kullanıcı kimliğini tutar. Giriş yapan bir kişi yalnızca kendi yetki satırını okuyabilir; ziyaretçiler bu listeyi okuyamaz ve kullanıcılar kendilerine yetki veremez.
- İki tabloda RLS açıktır. Ziyaretçi yalnızca yayınlanan seçimi okur. Yazma, yetki listesindeki hesaba ve yalnızca `preset` sütununa açıktır. Kimlik, zaman, yeni satır ekleme veya silme yetkisi verilmez.
- Veritabanındaki değer yalnızca bilinen bir kimlik olabilir. Mesajlar tarayıcıdaki sabit yapılandırmadan gelir ve textContent ile yazılır; sunucudan HTML veya CSS çalıştırılmaz.
- Mevcut projects tablosu, Storage, yönetici giriş kodu, proje modalları ve hesaplayıcı mantığı değiştirilmez. Service-role anahtarı tarayıcıya eklenmez.

## Dosyalar ve doğrulama

`js/site-concepts.js` ortak konsept tanımları, güvenli görüntüleme, önbellek ve herkese açık okuma kodudur. Diğer sayfalara Supabase SDK yüklemez. `js/concept-admin.js` yalnızca ana sayfada mevcut Supabase istemcisiyle yönetim yapar. `css/site-concepts.css` mevcut tema değişkenlerini seçili konsepte göre değiştirir; normal görünümü değiştirmez. Build yeni iki JS ve bir CSS kaynağını küçültür ve 30 yayın dosyasını hazırlar.

Kontroller: `npm run build`, `npm run test:seo`, `npm run test:concepts`. İzole PostgreSQL 17 testinde kurulumun çalışması, RLS, anonim ve yetkisiz yazmanın engellenmesi, yalnızca sahibin yayınlayabilmesi, geçersiz değerlerin reddi ve tekrar kurulumda aktif seçimin korunması doğrulandı. Tarayıcıda ağ istekleri taklit edilerek giriş, önizleme/iptal, üç sayfaya yayın, başka ziyaretçi, tema, mobil, kayıt hatası, standart görünüme dönüş ve çıkış akışı kontrol edildi. Gerçek CV projesindeki SQL kurulumu ve yetkili yayınlama, SQL kullanıcı tarafından çalıştırıldıktan sonra ayrıca doğrulanmalıdır.
