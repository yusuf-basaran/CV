// Bayram ve anma konseptleri tüm sayfalarda çalışır; Supabase SDK gerektirmez.
(() => {
  'use strict';
  const PRESETS = Object.freeze([
    {"id": "auto", "group": "normal", "label": "Otomatik takvim", "title": "Otomatik takvim", "message": "Özel günlerde ilgili konsept iki gün gösterilir; diğer günlerde standart görünüm kullanılır.", "family": ""},
    {"id": "normal", "group": "normal", "label": "Standart görünüm", "title": "", "message": "", "family": ""},
    {"id": "ramazan", "group": "religious", "label": "Ramazan Bayramı", "title": "Ramazan Bayramınız kutlu olsun.", "message": "Sevdiklerinizle birlikte huzurlu, sağlıklı ve güzel bir bayram dilerim.", "family": "religious"},
    {"id": "kurban", "group": "religious", "label": "Kurban Bayramı", "title": "Kurban Bayramınız kutlu olsun.", "message": "Paylaşmanın ve dayanışmanın çoğaldığı, huzurlu bir bayram dilerim.", "family": "religious"},
    {"id": "national", "group": "national", "label": "Millî bayram", "title": "Millî bayramımız kutlu olsun.", "message": "Birlik ve beraberlik içinde nice güzel bayramlara.", "family": "national"},
    {"id": "april23", "group": "national", "label": "23 Nisan", "title": "23 Nisan Ulusal Egemenlik ve Çocuk Bayramımız kutlu olsun.", "message": "Çocukların umutla ve mutlulukla büyüdüğü yarınlara.", "family": "national", "date": "04-23"},
    {"id": "may19", "group": "national", "label": "19 Mayıs", "title": "19 Mayıs Atatürk’ü Anma, Gençlik ve Spor Bayramımız kutlu olsun.", "message": "Geleceğe inançla, gençliğin enerjisiyle.", "family": "national", "date": "05-19"},
    {"id": "july20", "group": "national", "label": "20 Temmuz · KKTC", "title": "20 Temmuz Barış ve Özgürlük Bayramımız kutlu olsun.", "message": "Barış, özgürlük ve dayanışma içinde nice yıllara.", "family": "national", "date": "07-20", "region": "kktc"},
    {"id": "august30", "group": "national", "label": "30 Ağustos", "title": "30 Ağustos Zafer Bayramımız kutlu olsun.", "message": "Bağımsızlığımızı ve ortak geleceğimizi gururla kutluyoruz.", "family": "national", "date": "08-30"},
    {"id": "october29", "group": "national", "label": "29 Ekim", "title": "29 Ekim Cumhuriyet Bayramımız kutlu olsun.", "message": "Cumhuriyetimizin ışığında nice güzel yarınlara.", "family": "national", "date": "10-29"},
    {"id": "november15", "group": "national", "label": "15 Kasım · KKTC", "title": "15 Kasım KKTC Cumhuriyet Bayramı kutlu olsun.", "message": "Birlik ve beraberlik içinde nice yıllara.", "family": "national", "date": "11-15", "region": "kktc"},
    {"id": "memorial", "group": "remembrance", "label": "Genel anma", "title": "Saygı ve rahmetle anıyoruz.", "message": "Kaybettiklerimizin hatırasını saygıyla yaşatıyoruz.", "family": "remembrance"},
    {"id": "november10", "group": "remembrance", "label": "10 Kasım · Atatürk’ü Anma", "title": "Atatürk’ü saygı, sevgi ve özlemle anıyoruz.", "message": "10 Kasım · 09.05 — Cumhuriyetimizin kurucusu Gazi Mustafa Kemal Atatürk’ün aziz hatırasına.", "family": "remembrance", "date": "11-10"},
    {"id": "march18", "group": "remembrance", "label": "18 Mart · Şehitleri Anma", "title": "Çanakkale şehitlerimizi saygı ve rahmetle anıyoruz.", "message": "18 Mart Şehitleri Anma Günü ve Çanakkale Deniz Zaferi — Vatan uğruna hayatını kaybeden tüm kahramanlarımızın aziz hatırasına.", "family": "remembrance", "date": "03-18"},
    {"id": "ramadanStart", "group": "religious", "label": "Ramazan başlangıcı", "title": "Hoş geldin Ramazan.", "message": "Paylaşmanın, dayanışmanın ve huzurun çoğaldığı bir Ramazan dilerim.", "family": "religious"},
    {"id": "threeMonths", "group": "religious", "label": "Üç ayların başlangıcı", "title": "Üç aylarımız hayırlı olsun.", "message": "Bu mübarek günlerin huzura, iyiliğe ve dayanışmaya vesile olmasını dilerim.", "family": "religious"},
    {"id": "regaib", "group": "religious", "label": "Regaib Kandili", "title": "Regaib Kandiliniz mübarek olsun.", "message": "Dualarınızın kabul olduğu, huzurlu bir kandil dilerim.", "family": "religious"},
    {"id": "mirac", "group": "religious", "label": "Miraç Kandili", "title": "Miraç Kandiliniz mübarek olsun.", "message": "Bu mübarek gecenin gönüllere huzur ve umut getirmesini dilerim.", "family": "religious"},
    {"id": "berat", "group": "religious", "label": "Berat Kandili", "title": "Berat Kandiliniz mübarek olsun.", "message": "Bağışlanma, iyilik ve kardeşlik duygularının güçlendiği bir gece dilerim.", "family": "religious"},
    {"id": "kadir", "group": "religious", "label": "Kadir Gecesi", "title": "Kadir Geceniz mübarek olsun.", "message": "Bu mübarek gecenin barışa, huzura ve iyiliğe vesile olmasını dilerim.", "family": "religious"},
    {"id": "mevlid", "group": "religious", "label": "Mevlid Kandili", "title": "Mevlid Kandiliniz mübarek olsun.", "message": "Sevgi, merhamet ve güzel ahlakın hayatımıza ışık tutmasını dilerim.", "family": "religious"},
    {"id": "hijri", "group": "religious", "label": "Hicrî yılbaşı", "title": "Hicrî yeni yılımız hayırlı olsun.", "message": "Yeni yılın sağlık, barış ve huzur getirmesini dilerim.", "family": "religious"},
    {"id": "ashura", "group": "religious", "label": "Aşure Günü", "title": "Aşure Günü hayırlara vesile olsun.", "message": "Paylaşmanın, birliğin ve dayanışmanın değerini hatırlıyoruz.", "family": "religious"},
    {"id": "ramazanEve", "group": "religious", "label": "Ramazan Bayramı arefesi", "title": "Hayırlı arefeler.", "message": "Bayrama sağlık, huzur ve sevdiklerimizle birlikte ulaşmayı dilerim.", "family": "religious"},
    {"id": "kurbanEve", "group": "religious", "label": "Kurban Bayramı arefesi", "title": "Hayırlı arefeler.", "message": "Paylaşma ve dayanışma duygularıyla huzurlu bir bayram dilerim.", "family": "religious"},
    {"id": "may1", "group": "national", "label": "1 Mayıs · Emek ve Dayanışma", "title": "1 Mayıs Emek ve Dayanışma Günü kutlu olsun.", "message": "Emeğiyle hayatımıza değer katan herkese saygıyla.", "family": "community", "date": "05-01"},
    {"id": "august1", "group": "national", "label": "1 Ağustos · KKTC / Kıbrıs’ın Fethi", "title": "1 Ağustos Toplumsal Direniş Bayramı kutlu olsun.", "message": "Kıbrıs’ın fethini, Türk Mukavemet Teşkilatı’nın ve Güvenlik Kuvvetleri Komutanlığının kuruluşunu anıyor; barış ve huzur diliyoruz.", "family": "national", "date": "08-01", "region": "kktc"},
    {"id": "january13", "group": "remembrance", "label": "13 Ocak · Rauf Denktaş", "title": "Rauf Raif Denktaş’ı saygı ve rahmetle anıyoruz.", "message": "KKTC Kurucu Cumhurbaşkanının hatırasını saygıyla yaşatıyoruz.", "family": "remembrance", "date": "01-13", "region": "kktc"},
    {"id": "january15", "group": "remembrance", "label": "15 Ocak · Dr. Fazıl Küçük", "title": "Dr. Fazıl Küçük’ü saygı ve rahmetle anıyoruz.", "message": "Kıbrıs Türk halkının liderinin hatırasını saygıyla yaşatıyoruz.", "family": "remembrance", "date": "01-15", "region": "kktc"},
    {"id": "january27", "group": "remembrance", "label": "27–28 Ocak · KKTC Direnişini Anma", "title": "27–28 Ocak direnişinde hayatını kaybedenleri anıyoruz.", "message": "Kıbrıs Türk halkının özgürlük mücadelesinde yaşamını yitirenleri saygı ve rahmetle anıyoruz.", "family": "remembrance", "date": "01-27", "region": "kktc"},
    {"id": "february6", "group": "remembrance", "label": "6 Şubat · Depremde Kaybettiklerimizi Anma", "title": "6 Şubat depremlerinde kaybettiklerimizi rahmetle anıyoruz.", "message": "Türkiye’de ve Kıbrıs’ta acısını paylaştığımız tüm ailelerin yanındayız; hayatını kaybeden Şampiyon Melekleri de sevgi ve özlemle anıyoruz.", "family": "remembrance", "date": "02-06"},
    {"id": "march12", "group": "remembrance", "label": "12 Mart · İstiklâl Marşı’nın Kabulü", "title": "İstiklâl Marşı’mızın kabulünü gururla hatırlıyoruz.", "message": "Mehmet Akif Ersoy’u ve bağımsızlık mücadelemizin tüm kahramanlarını saygı ve rahmetle anıyoruz.", "family": "remembrance", "date": "03-12"},
    {"id": "july15", "group": "remembrance", "label": "15 Temmuz · Demokrasi ve Millî Birlik", "title": "15 Temmuz Demokrasi ve Millî Birlik Günü.", "message": "Demokrasi uğruna hayatını kaybedenleri saygı ve rahmetle anıyor, gazilerimize şükranlarımızı sunuyoruz.", "family": "remembrance", "date": "07-15"},
    {"id": "august8", "group": "remembrance", "label": "8 Ağustos · Erenköy Direnişi", "title": "Erenköy Direnişi’nin kahramanlarını saygıyla anıyoruz.", "message": "Şehitlerimizi rahmetle anıyor, gazilerimize ve özgürlük mücadelesine emek verenlere şükranlarımızı sunuyoruz.", "family": "remembrance", "date": "08-08", "region": "kktc"},
    {"id": "august17", "group": "remembrance", "label": "17 Ağustos · Depremi Anma", "title": "17 Ağustos depreminde kaybettiklerimizi rahmetle anıyoruz.", "message": "Acıları unutmayarak afetlere karşı hazırlık ve dayanışmanın önemini hatırlıyoruz.", "family": "remembrance", "date": "08-17"},
    {"id": "september19", "group": "remembrance", "label": "19 Eylül · Gaziler Günü", "title": "Gazilerimize saygı ve minnetle.", "message": "Vatanımız için fedakârlık gösteren gazilerimize şükranlarımızı sunuyor, ebediyete intikal edenleri rahmetle anıyoruz.", "family": "remembrance", "date": "09-19"},
    {"id": "december21", "group": "remembrance", "label": "21 Aralık · KKTC Millî Mücadele ve Şehitler", "title": "Kıbrıs Türk halkının şehitlerini saygı ve rahmetle anıyoruz.", "message": "21–25 Aralık Millî Mücadele ve Şehitler Haftası vesilesiyle kaybettiklerimizin hatırasını yaşatıyoruz.", "family": "remembrance", "date": "12-21", "region": "kktc"},
    {"id": "february13", "group": "historical", "label": "13 Şubat · Kıbrıs Türk Federe Devleti", "title": "Kıbrıs Türk Federe Devleti’nin kuruluşunu hatırlıyoruz.", "message": "13 Şubat 1975’in yıl dönümünde Kıbrıs Türk halkının tarihine emek verenleri saygıyla anıyoruz.", "family": "national", "date": "02-13", "region": "kktc"},
    {"id": "april29", "group": "historical", "label": "29 Nisan · Kût’ül Amâre Zaferi", "title": "Kût’ül Amâre Zaferi’nin yıl dönümü kutlu olsun.", "message": "Tarihimizin bu önemli gününde mücadele eden kahramanlarımızı saygı ve rahmetle anıyoruz.", "family": "national", "date": "04-29"},
    {"id": "may29", "group": "historical", "label": "29 Mayıs · İstanbul’un Fethi", "title": "İstanbul’un fethinin yıl dönümü kutlu olsun.", "message": "29 Mayıs 1453’ü ve tarihimizin bu dönüm noktasını saygıyla hatırlıyoruz.", "family": "national", "date": "05-29"},
    {"id": "july1", "group": "historical", "label": "1 Temmuz · Denizcilik ve Kabotaj", "title": "Denizcilik ve Kabotaj Bayramı kutlu olsun.", "message": "Denizlerimizde emek veren herkese güvenli ve huzurlu yarınlar dilerim.", "family": "national", "date": "07-01"},
    {"id": "july24", "group": "historical", "label": "24 Temmuz · Lozan Antlaşması", "title": "Lozan Barış Antlaşması’nın yıl dönümü.", "message": "Bağımsızlığımız ve barış için emek verenleri saygıyla hatırlıyoruz.", "family": "national", "date": "07-24"},
    {"id": "august26", "group": "historical", "label": "26 Ağustos · Malazgirt / Büyük Taarruz", "title": "Malazgirt Zaferi ve Büyük Taarruz’un yıl dönümü.", "message": "1071 Malazgirt Zaferi’ni ve 1922 Büyük Taarruz’un başlangıcını hatırlıyor, kahramanlarımızı saygı ve rahmetle anıyoruz.", "family": "national", "date": "08-26"},
    {"id": "september9", "group": "historical", "label": "9 Eylül · İzmir’in Kurtuluşu", "title": "İzmir’in kurtuluşunun yıl dönümü kutlu olsun.", "message": "9 Eylül 1922’nin kahramanlarını saygı ve minnetle anıyoruz.", "family": "national", "date": "09-09"},
    {"id": "september13", "group": "historical", "label": "13 Eylül · Sakarya Zaferi", "title": "Sakarya Zaferi’nin yıl dönümü kutlu olsun.", "message": "Bağımsızlık mücadelemizin kahramanlarını saygı ve minnetle anıyoruz.", "family": "national", "date": "09-13"},
    {"id": "october6", "group": "historical", "label": "6 Ekim · İstanbul’un Kurtuluşu", "title": "İstanbul’un kurtuluşunun yıl dönümü kutlu olsun.", "message": "6 Ekim 1923’ü ve Millî Mücadele’nin kahramanlarını saygıyla hatırlıyoruz.", "family": "national", "date": "10-06"},
    {"id": "october11", "group": "historical", "label": "11 Ekim · Mudanya Mütarekesi", "title": "Mudanya Mütarekesi’nin yıl dönümü.", "message": "Bağımsızlık mücadelemizde barışa giden bu önemli adımı saygıyla hatırlıyoruz.", "family": "national", "date": "10-11"},
    {"id": "october13", "group": "historical", "label": "13 Ekim · Ankara’nın Başkent Oluşu", "title": "Ankara’nın başkent oluşunun yıl dönümü kutlu olsun.", "message": "Cumhuriyetimizin başkentine ve ortak geleceğimize sevgiyle.", "family": "national", "date": "10-13"},
    {"id": "december27", "group": "historical", "label": "27 Aralık · Atatürk’ün Ankara’ya Gelişi", "title": "Atatürk’ün Ankara’ya gelişini saygıyla hatırlıyoruz.", "message": "27 Aralık 1919’un yıl dönümünde Millî Mücadele’ye emek veren herkesi minnetle anıyoruz.", "family": "national", "date": "12-27"},
    {"id": "newyear", "group": "community", "label": "1 Ocak · Yeni Yıl", "title": "Mutlu yıllar.", "message": "Yeni yılın Türkiye’ye, Kıbrıs’a ve tüm dünyaya sağlık, huzur ve mutluluk getirmesini dilerim.", "family": "community", "date": "01-01"},
    {"id": "february14", "group": "community", "label": "14 Şubat · Sevgililer Günü", "title": "Sevgiyle nice güzel günlere.", "message": "Hayatımıza değer katan tüm sevgi bağlarının güçlendiği bir gün dilerim.", "family": "community", "date": "02-14"},
    {"id": "march8", "group": "community", "label": "8 Mart · Dünya Kadınlar Günü", "title": "8 Mart Dünya Kadınlar Günü kutlu olsun.", "message": "Kadınların eşit, özgür ve güvenli bir yaşam sürmesi dileğiyle.", "family": "community", "date": "03-08"},
    {"id": "march14", "group": "community", "label": "14 Mart · Tıp Bayramı", "title": "14 Mart Tıp Bayramı kutlu olsun.", "message": "Sağlığımız için emek veren tüm hekimlere ve sağlık çalışanlarına teşekkür ederim.", "family": "community", "date": "03-14"},
    {"id": "nowruz", "group": "community", "label": "21 Mart · Nevruz", "title": "Nevruz Bayramı kutlu olsun.", "message": "Baharın yenilenme, barış ve umut getirmesini dilerim.", "family": "community", "date": "03-21"},
    {"id": "forests", "group": "community", "label": "21 Mart · Orman Günü", "title": "Ormanlarımızı ve geleceğimizi birlikte koruyalım.", "message": "Dünya Ormancılık Günü’nde doğaya ve yaşama sahip çıkmanın önemini hatırlıyoruz.", "family": "community", "date": "03-21"},
    {"id": "water", "group": "community", "label": "22 Mart · Dünya Su Günü", "title": "Suyun değerini birlikte koruyalım.", "message": "Dünya Su Günü’nde temiz suya erişim ve bilinçli tüketim için sorumluluğumuzu hatırlıyoruz.", "family": "community", "date": "03-22"},
    {"id": "theatre", "group": "community", "label": "27 Mart · Dünya Tiyatro Günü", "title": "Dünya Tiyatro Günü kutlu olsun.", "message": "Sahneye, sanata ve hayatımıza dokunan tüm sanat emekçilerine sevgiyle.", "family": "community", "date": "03-27"},
    {"id": "autism", "group": "community", "label": "2 Nisan · Otizm Farkındalık", "title": "Farklılıklarımızla birlikte güçlüyüz.", "message": "Otizm farkındalığı, eşit fırsatlar ve kapsayıcı bir yaşam için yan yanayız.", "family": "community", "date": "04-02"},
    {"id": "health", "group": "community", "label": "7 Nisan · Dünya Sağlık Günü", "title": "Sağlıklı bir gelecek için birlikte.", "message": "Dünya Sağlık Günü’nde herkes için erişilebilir sağlık hizmetlerinin önemini hatırlıyoruz.", "family": "community", "date": "04-07"},
    {"id": "police", "group": "community", "label": "10 Nisan · Polis Haftası", "title": "Güvenliğimiz için emek verenlere teşekkürler.", "message": "Türk Polis Teşkilatının kuruluş yıl dönümünde görevini özveriyle yapan tüm emniyet çalışanlarına saygıyla.", "family": "community", "date": "04-10"},
    {"id": "environment", "group": "community", "label": "5 Haziran · Dünya Çevre Günü", "title": "Yaşanabilir bir gelecek için doğayı koruyalım.", "message": "Dünya Çevre Günü’nde Türkiye’nin ve Kıbrıs’ın doğal güzelliklerine birlikte sahip çıkıyoruz.", "family": "community", "date": "06-05"},
    {"id": "peace", "group": "community", "label": "1 Eylül · Barış Günü", "title": "Barışın ve dayanışmanın çoğaldığı yarınlara.", "message": "Türkiye’de, Kıbrıs’ta ve tüm dünyada huzurlu bir yaşam diliyoruz.", "family": "community", "date": "09-01"},
    {"id": "cleanAir", "group": "community", "label": "7 Eylül · Temiz Hava Günü", "title": "Temiz hava, sağlıklı bir gelecek.", "message": "Uluslararası Temiz Hava Günü’nde doğaya ve sağlığımıza birlikte sahip çıkıyoruz.", "family": "community", "date": "09-07"},
    {"id": "language", "group": "community", "label": "26 Eylül · Türk Dil Bayramı", "title": "Türk Dil Bayramı kutlu olsun.", "message": "Türkçemizin zenginliğini, kültürümüzü ve ortak anlatım gücümüzü yaşatıyoruz.", "family": "community", "date": "09-26"},
    {"id": "tourism", "group": "community", "label": "27 Eylül · Dünya Turizm Günü", "title": "Dünya Turizm Günü kutlu olsun.", "message": "Türkiye’nin ve Kıbrıs’ın kültürünü, doğasını ve misafirperverliğini dünyayla paylaşan herkese teşekkürler.", "family": "community", "date": "09-27"},
    {"id": "olderPeople", "group": "community", "label": "1 Ekim · Yaşlılar Günü", "title": "Büyüklerimize sevgi ve saygıyla.", "message": "Deneyimleriyle hayatımıza değer katan büyüklerimizin sağlıklı ve huzurlu yaşaması dileğiyle.", "family": "community", "date": "10-01"},
    {"id": "animals", "group": "community", "label": "4 Ekim · Hayvanları Koruma", "title": "Tüm canlılara sevgi ve saygıyla.", "message": "Hayvanları Koruma Günü’nde yaşamı paylaştığımız dostlarımızın haklarını hatırlıyoruz.", "family": "community", "date": "10-04"},
    {"id": "worldTeachers", "group": "community", "label": "5 Ekim · Dünya Öğretmenler Günü", "title": "Dünya Öğretmenler Günü kutlu olsun.", "message": "Geleceğe ışık tutan tüm öğretmenlere saygı ve teşekkürlerimle.", "family": "community", "date": "10-05"},
    {"id": "redCrescent", "group": "community", "label": "29 Ekim · Kızılay Haftası Başlangıcı", "title": "Dayanışmanın ve iyiliğin yanındayız.", "message": "Kızılay Haftası vesilesiyle ihtiyaç sahiplerine destek olan tüm gönüllülere teşekkürler.", "family": "community", "date": "10-29"},
    {"id": "diabetes", "group": "community", "label": "14 Kasım · Dünya Diyabet Günü", "title": "Sağlıklı yaşam için farkındalık.", "message": "Dünya Diyabet Günü’nde erken tanının, düzenli kontrolün ve dayanışmanın önemini hatırlıyoruz.", "family": "community", "date": "11-14"},
    {"id": "childRights", "group": "community", "label": "20 Kasım · Çocuk Hakları", "title": "Her çocuğa güvenli ve umut dolu bir gelecek.", "message": "Dünya Çocuk Hakları Günü’nde çocukların eğitim, sağlık, korunma ve oyun haklarını hatırlıyoruz.", "family": "community", "date": "11-20"},
    {"id": "teachers", "group": "community", "label": "24 Kasım · Öğretmenler Günü", "title": "Öğretmenler Günü kutlu olsun.", "message": "Türkiye’de ve Kıbrıs’ta geleceğe ışık tutan tüm öğretmenlere saygı ve teşekkürlerimle.", "family": "community", "date": "11-24"},
    {"id": "disability", "group": "community", "label": "3 Aralık · Dünya Engelliler Günü", "title": "Erişilebilir ve eşit bir yaşam için birlikte.", "message": "Engelleri birlikte kaldırıyor, herkes için eşit katılımın önemini hatırlıyoruz.", "family": "community", "date": "12-03"},
    {"id": "miners", "group": "community", "label": "4 Aralık · Dünya Madenciler Günü", "title": "Madencilerimize saygı ve teşekkürle.", "message": "Zorlu koşullarda emek veren madencilerimize güvenli çalışma koşulları diliyor, hayatını kaybedenleri rahmetle anıyoruz.", "family": "community", "date": "12-04"},
    {"id": "womenVote", "group": "community", "label": "5 Aralık · Kadınların Seçme ve Seçilme Hakkı", "title": "Kadınların eşit temsilini ve haklarını savunuyoruz.", "message": "Türk kadınlarına milletvekili seçme ve seçilme hakkı tanınmasının yıl dönümünü hatırlıyoruz.", "family": "community", "date": "12-05"},
    {"id": "humanRights", "group": "community", "label": "10 Aralık · İnsan Hakları Günü", "title": "Herkes için insan onuruna yakışır bir yaşam.", "message": "İnsan Hakları Günü’nde eşitliği, özgürlüğü ve adaleti birlikte savunuyoruz.", "family": "community", "date": "12-10"},
    {"id": "localGoods", "group": "community", "label": "12 Aralık · Tutum ve Yerli Malı Haftası", "title": "Üretime, emeğe ve bilinçli tüketime değer veriyoruz.", "message": "Tutum, Yatırım ve Türk Malları Haftası’nın başlangıcında kaynaklarımızı özenle kullanmayı hatırlıyoruz.", "family": "community", "date": "12-12"},
    {"id": "mothers", "group": "community", "label": "Anneler Günü", "title": "Anneler Günü kutlu olsun.", "message": "Sevgisi ve emeğiyle hayatımıza dokunan tüm annelere teşekkür ediyor, aramızdan ayrılan anneleri özlemle anıyoruz.", "family": "community", "rule": {"month": 5, "weekday": 0, "nth": 2}},
    {"id": "fathers", "group": "community", "label": "Babalar Günü", "title": "Babalar Günü kutlu olsun.", "message": "Sevgisi ve emeğiyle hayatımıza değer katan tüm babalara teşekkür ediyor, aramızdan ayrılan babaları özlemle anıyoruz.", "family": "community", "rule": {"month": 6, "weekday": 0, "nth": 3}}
  ]);
  const byId = new Map(PRESETS.map(preset => [preset.id, preset]));
  const CACHE_KEY = 'site-concept';
  const API_URL = 'https://hqauyhneidkjpchjhutb.supabase.co';
  const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxYXV5aG5laWRranBjaGpodXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTExMzc2NjIsImV4cCI6MjEwNjcxMzY2Mn0.XmAwz3BRDyN2iAxvQTCLehevdfeoR04dOxKxDxpwEXg';
  const root = document.documentElement;
  const banner = document.getElementById('occasionBanner');
  const DURATION = 48 * 60 * 60 * 1000;
  // Diyanet'in yıllık listeleri; kaynaklar KONSEPT-KURULUM.md içinde.
  const RELIGIOUS_DATES = {
    "2026": {
      "ramazan": "03-20",
      "kurban": "05-27",
      "mirac": "01-15",
      "berat": "02-02",
      "ramadanStart": "02-19",
      "kadir": "03-16",
      "hijri": "06-16",
      "ashura": "06-25",
      "mevlid": "08-24",
      "threeMonths": "12-10",
      "regaib": "12-10",
      "ramazanEve": "03-19",
      "kurbanEve": "05-26"
    },
    "2027": {
      "ramazan": "03-09",
      "kurban": "05-16",
      "mirac": [
        "01-04",
        "12-24"
      ],
      "berat": "01-22",
      "ramadanStart": "02-08",
      "kadir": "03-05",
      "hijri": "06-06",
      "ashura": "06-15",
      "mevlid": "08-13",
      "threeMonths": "11-29",
      "regaib": "12-02",
      "ramazanEve": "03-08",
      "kurbanEve": "05-15"
    },
    "2028": {
      "ramazan": "02-26",
      "kurban": "05-05",
      "mirac": "12-13",
      "berat": [
        "01-11",
        "12-30"
      ],
      "ramadanStart": "01-28",
      "kadir": "02-22",
      "hijri": "05-25",
      "ashura": "06-03",
      "mevlid": "08-02",
      "threeMonths": "11-18",
      "regaib": "11-23",
      "ramazanEve": "02-25",
      "kurbanEve": "05-04"
    },
    "2029": {
      "ramazan": "02-14",
      "kurban": "04-24",
      "mirac": "12-02",
      "berat": "12-20",
      "ramadanStart": "01-16",
      "kadir": "02-10",
      "hijri": "05-14",
      "ashura": "05-23",
      "mevlid": "07-23",
      "threeMonths": "11-07",
      "regaib": "11-08",
      "ramazanEve": "02-13",
      "kurbanEve": "04-23"
    },
    "2030": {
      "ramazan": "02-04",
      "kurban": "04-13",
      "mirac": "11-22",
      "berat": "12-09",
      "ramadanStart": [
        "01-05",
        "12-26"
      ],
      "kadir": "01-30",
      "hijri": "05-03",
      "ashura": "05-12",
      "mevlid": "07-12",
      "threeMonths": "10-28",
      "regaib": "10-31",
      "ramazanEve": "02-03",
      "kurbanEve": "04-12"
    }
  };
  let savedPreset = 'auto';
  let updatedAt = null;
  let ready = false;
  let previewing = false;
  let loading;
  let artworkPreset;
  let rolloverTimer;

  // Çizimler yerel ve sabittir; sunucudan HTML alınmaz.
  const star = '<path d="m0-10 2.25 6.9h7.25L3.63 1.18l2.24 6.91L0 3.82l-5.87 4.27 2.24-6.91-5.87-4.28h7.25Z" fill="currentColor"/>';
  const moon = '<path d="M8-23a24 24 0 1 0 0 46A20 20 0 0 1 8-23Z" fill="currentColor"/>';
  const lantern = '<path d="M0-36v12m-7 6 7-6 7 6m-18 0h22L9 10l-9 8-9-8Zm-3 0h28M-9 10H9M-4-18-3 10m7-28L3 10M0 18v7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M-4-9h8v13h-8Z" fill="currentColor" opacity=".2"/>';
  const rosette = '<path d="m0-25 7 9 11-2-2 11 9 7-9 7 2 11-11-2-7 9-7-9-11 2 2-11-9-7 9-7-2-11 11 2Z" fill="none" stroke="currentColor" stroke-width="1.2"/><circle r="15" fill="none" stroke="currentColor" opacity=".4"/>';

  function svg(content, viewBox = '0 0 960 112') {
    const alignment = viewBox === '0 0 960 112' ? 'xMidYMin slice' : 'xMidYMid meet';
    return `<svg viewBox="${viewBox}" preserveAspectRatio="${alignment}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">${content}</svg>`;
  }

  function flag(country, x, y, width = 66) {
    const cyprus = country === 'kktc';
    const ground = cyprus ? '#fff' : '#e30a17';
    const ink = cyprus ? '#e30a17' : '#fff';
    return `<svg x="${x}" y="${y}" width="${width}" height="${width * 2 / 3}" viewBox="0 0 120 80" data-occasion-flag="${country}">
      <path fill="${ground}" d="M0 0h120v80H0Z"/>
      ${cyprus ? '<path fill="#e30a17" d="M0 8h120v9H0Zm0 55h120v9H0Z"/>' : ''}
      <circle cx="45" cy="40" r="20" fill="${ink}"/><circle cx="50" cy="40" r="16" fill="${ground}"/>
      <g transform="translate(70 40) rotate(-18)" color="${ink}">${star}</g>
    </svg>`;
  }

  function nationalArtwork(preset) {
    const local = preset.region === 'kktc';
    const flags = [92, 220, 348, 476, 604, 732, 860].map((x, index) => {
      const y = 15 + 25 * Math.sin((index / 6) * Math.PI);
      const country = local && index % 2 === 1 ? 'kktc' : 'tr';
      return `<path d="M${x} ${y}v9" stroke="currentColor" opacity=".5"/>${flag(country, x - 33, y + 9)}`;
    }).join('');
    const pennants = preset.id === 'april23' ? [156, 284, 412, 540, 668, 796].map((x, index) =>
      `<path d="m${x - 13} 38h26l-13 26Z" fill="${['#38bdf8', '#f59e0b', '#e30a17'][index % 3]}"/>`).join('') : '';
    const emblem = preset.id === 'august30' ? `<path d="M-12 20Q-42-1-23-25M12 20Q42-1 23-25M-25-13l-10-4m9 15-12-2m15 13-11 2m59-24 10-4M26-2l12-2M23 9l11 2" fill="none" stroke="currentColor" stroke-width="2"/>${star}` : star;
    return {
      band: svg(`<path d="M0 0Q480 88 960 0" fill="none" stroke="currentColor" opacity=".3"/>${flags}${pennants}`),
      symbol: svg(`${flag('tr', 8, local ? 8 : 19, 66)}${local ? flag('kktc', 26, 43, 62) : ''}`, '0 0 96 92'),
      seal: svg(`<path d="M0 36h95m130 0h95" stroke="currentColor" opacity=".25"/><g transform="translate(160 36)">${emblem}</g>`, '0 0 320 72')
    };
  }

  function religiousArtwork(preset) {
    const ornaments = [100, 340, 620, 860].map((x, index) => {
      const y = index === 0 || index === 3 ? 54 : 76;
      return `<path d="M${x} 0v${y - 36}" stroke="currentColor" opacity=".3"/><g transform="translate(${x} ${y})">${lantern}</g>`;
    }).join('');
    const center = preset.id === 'kurban' ? `${rosette}<g transform="scale(.45)">${moon}</g>` : `${moon}<g transform="translate(25 -13) scale(.65)">${star}</g>`;
    return {
      band: svg(`<path d="M0 8Q240 75 480 8Q720 75 960 8" fill="none" stroke="currentColor" opacity=".25"/>${ornaments}<g transform="translate(480 55)">${center}</g><g transform="translate(370 64) scale(.4)">${star}</g><g transform="translate(590 64) scale(.4)">${star}</g>`),
      symbol: svg(`<g transform="translate(42 43)">${center}</g>`, '0 0 90 86'),
      seal: svg(`<path d="M0 36h95m130 0h95" stroke="currentColor" opacity=".25"/><g transform="translate(160 36)">${rosette}<g transform="scale(.45)">${moon}</g></g>`, '0 0 320 72')
    };
  }

  function communityArtwork() {
    const heart = '<path d="M0 22C-48-7-20-39 0-16C20-39 48-7 0 22Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>';
    return {
      band: svg(`<path d="M140 56h190m300 0h190" stroke="currentColor" opacity=".2"/><g transform="translate(480 55)">${heart}</g>`),
      symbol: svg(`<g transform="translate(45 43)">${heart}</g>`, '0 0 90 86'),
      seal: svg(`<path d="M0 36h100m120 0h100" stroke="currentColor" opacity=".2"/><g transform="translate(160 36) scale(.7)">${heart}</g>`, '0 0 320 72')
    };
  }

  function remembranceArtwork(preset) {
    const ribbon = '<path d="M-13-12C-23-43 23-43 13-12L-11 31l-3-12-12 1L3-15c8-14-8-14-6 0L26 20l-12-1-3 12Z" fill="#18181b" stroke="#a1a1aa" stroke-width="1.5" stroke-linejoin="round"/>';
    const inscription = preset.id === 'november10' ? '1881 — 1938 · 09.05' : preset.id === 'march18' ? '18 MART · 1915' : 'SAYGIYLA ANIYORUZ';
    return {
      band: svg(`<path d="M100 56h230m300 0h230" stroke="currentColor" opacity=".2"/><text x="480" y="62" text-anchor="middle" fill="currentColor" font-family="sans-serif" font-size="16" letter-spacing="3">${inscription}</text>`),
      symbol: svg(`<g transform="translate(45 43)">${ribbon}</g>`, '0 0 90 86'),
      seal: svg(`<path d="M0 36h110m100 0h110" stroke="currentColor" opacity=".2"/><g transform="translate(160 36) scale(.7)">${ribbon}</g>`, '0 0 320 72')
    };
  }

  function renderArtwork(preset) {
    if (artworkPreset === preset.id) return;
    artworkPreset = preset.id;
    const artwork = preset.family === 'community' ? communityArtwork()
      : preset.family === 'remembrance' ? remembranceArtwork(preset)
      : preset.family === 'national' ? nationalArtwork(preset) : religiousArtwork(preset);
    for (const [id, content] of [['occasionDecorations', artwork.band], ['occasionSymbol', artwork.symbol], ['occasionFooterMark', artwork.seal]]) {
      const element = document.getElementById(id);
      if (!element) continue;
      element.hidden = !preset.family;
      element.innerHTML = preset.family ? content : '';
    }
  }

  function automatic(now = Date.now()) {
    // Takvim Türkiye saati (UTC+3) kullanır; ziyaretçinin saat dilimi etkilemez.
    const year = new Date(now + 3 * 60 * 60 * 1000).getUTCFullYear();
    const active = [];
    for (const calendarYear of [year - 1, year]) {
      for (const preset of PRESETS) {
        let dates = preset.date || RELIGIOUS_DATES[calendarYear]?.[preset.id];
        if (preset.rule) {
          const { month, weekday, nth } = preset.rule;
          const first = new Date(Date.UTC(calendarYear, month - 1, 1)).getUTCDay();
          const day = 1 + (weekday - first + 7) % 7 + (nth - 1) * 7;
          dates = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
        for (const date of Array.isArray(dates) ? dates : dates ? [dates] : []) {
          const start = Date.parse(`${calendarYear}-${date}T00:00:00+03:00`);
          const expiresAt = start + DURATION;
          if (now >= start && now < expiresAt) active.push({ preset: preset.id, start, expiresAt });
        }
      }
    }
    // Anma görünümü önceliklidir; diğer etkin günler de mesajda yer alır.
    const priority = id => {
      const preset = byId.get(id);
      return preset.family === 'remembrance' ? 5 : preset.group === 'national' ? 4
        : preset.family === 'religious' ? 3 : preset.group === 'historical' ? 2 : 1;
    };
    active.sort((a, b) => priority(b.preset) - priority(a.preset) || b.start - a.start || a.preset.localeCompare(b.preset));
    return {
      preset: active[0]?.preset || 'normal',
      expiresAt: active.length ? Math.min(...active.map(item => item.expiresAt)) : null,
      activePresets: [...new Set(active.map(item => item.preset))]
    };
  }

  function state() {
    const now = Date.now();
    const start = typeof updatedAt === 'string' ? Date.parse(updatedAt) : NaN;
    const manual = savedPreset !== 'auto' && start <= now && now < start + DURATION;
    const current = manual ? { preset: savedPreset, expiresAt: start + DURATION, activePresets: [savedPreset] } : automatic(now);
    return { ready, preset: manual ? savedPreset : 'auto', effectivePreset: current.preset, expiresAt: current.expiresAt, activePresets: current.activePresets };
  }

  function refresh() {
    if (previewing) return;
    const current = state();
    apply(current.effectivePreset, false, current.activePresets.slice(1));
    clearTimeout(rolloverTimer);
    const now = Date.now();
    const day = DURATION / 2;
    const nextMidnight = (Math.floor((now + 3 * 60 * 60 * 1000) / day) + 1) * day - 3 * 60 * 60 * 1000;
    rolloverTimer = setTimeout(refresh, Math.max(1, Math.min(current.expiresAt || Infinity, nextMidnight) - now));
  }

  function apply(id, preview = false, additional = []) {
    if (id === 'auto') {
      const current = automatic();
      id = current.preset;
      additional = current.activePresets.slice(1);
    }
    const preset = byId.get(id) || byId.get('normal');
    renderArtwork(preset);
    if (preset.family) {
      root.dataset.occasionFamily = preset.family;
      root.dataset.occasion = preset.id;
    } else {
      delete root.dataset.occasionFamily;
      delete root.dataset.occasion;
    }
    if (!banner) return;
    banner.hidden = !preset.family;
    document.getElementById('occasionTitle').textContent = preset.title;
    document.getElementById('occasionMessage').textContent = [preset.message, ...additional.map(id => {
      const other = byId.get(id);
      return `${other.label} — ${other.title} ${other.message}`;
    })].join('\n\n');
    document.getElementById('occasionLabel').textContent = preset.label;
    document.getElementById('occasionPreview').hidden = !preview;
  }

  function remember(id, timestamp) {
    const preset = byId.get(id) || byId.get('normal');
    savedPreset = preset.id;
    updatedAt = typeof timestamp === 'string' && Number.isFinite(Date.parse(timestamp)) ? timestamp : null;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ preset: preset.id, updatedAt }));
    } catch (error) {}
    refresh();
  }

  function acceptPublished(id, timestamp) {
    previewing = false;
    ready = true;
    remember(id, timestamp);
    document.dispatchEvent(new CustomEvent('site-concept-loaded', { detail: { ready, preset: savedPreset } }));
  }

  async function load() {
    if (loading) return loading;
    loading = (async () => {
      try {
        const response = await fetch(`${API_URL}/rest/v1/cv_site_concept_settings?id=eq.1&select=preset,updated_at`, {
          headers: { apikey: API_KEY, Authorization: `Bearer ${API_KEY}` },
          cache: 'no-store', signal: AbortSignal.timeout(8000)
        });
        if (!response.ok) throw new Error('Konsept okunamadı.');
        const rows = await response.json();
        if (!Array.isArray(rows) || rows.length !== 1 || !byId.has(rows[0].preset)) throw new Error('Konsept ayarı geçersiz.');
        ready = true;
        remember(rows[0].preset, rows[0].updated_at);
      } catch (error) {
        ready = false;
        // Bağlantı sorunu, proje listesini veya hesaplayıcıyı etkilemez.
      } finally {
        loading = null;
        refresh();
        document.dispatchEvent(new CustomEvent('site-concept-loaded', { detail: { ready, preset: savedPreset } }));
      }
      return { ready, preset: savedPreset };
    })();
    return loading;
  }

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cached && byId.has(cached.preset)) { savedPreset = cached.preset; updatedAt = cached.updatedAt; }
  } catch (error) {}
  refresh();

  window.SiteConcepts = Object.freeze({
    presets: PRESETS,
    load,
    acceptPublished,
    state,
    preview(id) { previewing = true; apply(id, true); },
    cancelPreview() { previewing = false; refresh(); }
  });
  window.addEventListener('storage', event => {
    if (event.key !== CACHE_KEY) return;
    try {
      const cached = JSON.parse(event.newValue);
      if (cached && byId.has(cached.preset)) {
        savedPreset = cached.preset;
        updatedAt = cached.updatedAt;
        refresh();
      }
    } catch (error) {}
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !previewing) { refresh(); load(); }
  });
  setInterval(() => { if (!document.hidden && !previewing) { refresh(); load(); } }, 60000);
  load();
})();
