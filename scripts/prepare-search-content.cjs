const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

// Yalnızca depodaki CONFIG okunur; tarayıcı veya ağ kodu çalıştırılmaz.
async function readCalculatorPackages(root) {
  const source = await fs.readFile(path.join(root, 'js/price-calculator.js'), 'utf8');
  const boundary = source.indexOf('  const root =');
  if (boundary < 0) throw new Error('Hesaplayıcı CONFIG sınırı bulunamadı.');
  const config = vm.runInNewContext(`${source.slice(0, boundary)}return CONFIG;})();`, {}, { timeout: 1000 });
  return Array.from(config.items).filter(item => item.category === 'packages');
}

function replaceBlock(html, name, content) {
  const pattern = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!pattern.test(html)) throw new Error(`${name} içerik alanı bulunamadı.`);
  return html.replace(pattern, (_, start, end) => `${start}\n${content}\n          ${end}`);
}

async function prepareSearchContent(root) {
  const packages = await readCalculatorPackages(root);
  const money = value => `${new Intl.NumberFormat('tr-TR').format(value)} TL`;
  for (const file of ['index.html', 'fiyat-hesaplayici/index.html']) {
    const filename = path.join(root, file);
    let html = await fs.readFile(filename, 'utf8');
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    const catalog = schema['@graph'].find(item => item.hasOfferCatalog).hasOfferCatalog;
    // Statik JSON-LD fiyatları yanlış bilgiyle yayına çıkmasın.
    if (catalog.itemListElement.length !== packages.length || packages.some((item, index) => Number(catalog.itemListElement[index].price) !== item.price)) {
      throw new Error(`${file}: JSON-LD paket fiyatlarını CONFIG ile eşitleyin.`);
    }
    if (file === 'index.html') {
      html = replaceBlock(html, 'SERVICE_START_PRICE', `          <p class="hero-intro">Başlangıç paketleri ${money(Math.min(...packages.map(item => item.price)))}’den başlar. Ek özellikler, aylık bakım ve yıllık alan adı / hosting bedelleri ayrıca hesaplanır.</p>`);
    } else {
      const cards = packages.map(item => `            <article class="card calc-package-card">
              <h3>${escapeHtml(item.name)}</h3>
              <p>${escapeHtml(item.description)}</p>
              <p class="calc-package-price">${money(item.price)} başlangıç fiyatı</p>
              <p>Tahmini süre: ${item.days} iş günü</p>
            </article>`).join('\n');
      html = replaceBlock(html, 'PACKAGE_GUIDE', `          <div class="calc-grid">\n${cards}\n          </div>`);
    }
    await fs.writeFile(filename, html);
  }
  // Hizmet sayfasının başlangıç ücreti de aynı yapılandırmadan gelir.
  const servicesPath = path.join(root, 'kktc-web-tasarim/index.html');
  const servicesHtml = await fs.readFile(servicesPath, 'utf8');
  await fs.writeFile(servicesPath, replaceBlock(servicesHtml, 'SERVICE_START_PRICE',
    `          <p>Web sitesi paketleri ${money(Math.min(...packages.map(item => item.price)))}’den başlar. Bu tutar temel geliştirme ücretidir; ek özellikler, aylık bakım ve yıllık alan adı / hosting bedelleri ayrıca hesaplanır.</p>`));
}

module.exports = { prepareSearchContent, readCalculatorPackages };
