const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { createSubmission, submitIndexNow } = require('../scripts/submit-indexnow.cjs');
const { prepareSearchContent, readCalculatorPackages } = require('../scripts/prepare-search-content.cjs');

const root = path.resolve(__dirname, '..');
const origin = 'https://www.yusufbasaran.dev';
const key = 'a'.repeat(32);

test('IndexNow sadece sitemap içindeki kalıcı ana alan adı URL’lerini gönderir', () => {
  const payload = createSubmission(`<urlset><url><loc>${origin}/</loc></url></urlset>`, key);
  assert.deepEqual(payload.urlList, [`${origin}/`]);
  assert.equal(payload.keyLocation, `${origin}/indexnow-key.txt`);
  for (const url of ['http://www.yusufbasaran.dev/', 'https://yusufbasaran.dev/', `${origin}/#hizmetler`, `${origin}/?tracking=1`, 'https://example.com/']) {
    assert.throws(() => createSubmission(`<loc>${url}</loc>`, key));
  }
  assert.throws(() => createSubmission('<urlset/>', key));
  assert.throws(() => createSubmission(`<loc>${origin}/</loc>`, 'invalid'));
});

test('Yanlış sahiplik dosyasında hiçbir bildirim gönderilmez', async t => {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push([url, options]);
    return new Response('wrong-key');
  });
  await assert.rejects(submitIndexNow(), /anahtarı kaynakla eşleşmiyor/);
  assert.equal(calls.length, 1);
  assert.ok(calls.every(([, options]) => !options.method));
});

test('Sahiplik ve canonical doğrulandıktan sonra üç URL tek bildirimde gönderilir', async t => {
  const actualKey = (await fs.readFile(path.join(root, 'indexnow-key.txt'), 'utf8')).trim();
  let posted;
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    if (options.method === 'POST') {
      posted = JSON.parse(options.body);
      assert.equal(url, 'https://api.indexnow.org/indexnow');
      return new Response('', { status: 202 });
    }
    return new Response(url.endsWith('/indexnow-key.txt') ? actualKey : `<link rel="canonical" href="${url}">`);
  });
  await submitIndexNow();
  assert.deepEqual(posted.urlList, [`${origin}/`, `${origin}/fiyat-hesaplayici/`, `${origin}/kktc-web-tasarim/`]);
});

test('CONFIG ile statik JSON-LD fiyatları uyuşmazsa build durur', async t => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'cv-search-'));
  t.after(() => fs.rm(temp, { recursive: true, force: true }));
  await fs.mkdir(path.join(temp, 'js'));
  await fs.copyFile(path.join(root, 'js/price-calculator.js'), path.join(temp, 'js/price-calculator.js'));
  const home = await fs.readFile(path.join(root, 'index.html'), 'utf8');
  await fs.writeFile(path.join(temp, 'index.html'), home.replace('"price": 4000', '"price": 9999'));
  await assert.rejects(prepareSearchContent(temp), /JSON-LD paket fiyatlarını CONFIG ile eşitleyin/);
});

test('Build çıktısı beş paketi script dışında fiyat ve süreleriyle içerir', async () => {
  const packages = await readCalculatorPackages(root);
  const html = (await fs.readFile(path.join(root, 'public/fiyat-hesaplayici/index.html'), 'utf8'))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  assert.equal((html.match(/class="card calc-package-card"/g) || []).length, packages.length);
  for (const item of packages) {
    assert.ok(html.includes(`${new Intl.NumberFormat('tr-TR').format(item.price)} TL başlangıç fiyatı`));
    assert.ok(html.includes(`Tahmini süre: ${item.days} iş günü`));
  }
});

test('JSON-LD tarih alanları saat ve saat dilimi içeren DateTime kullanır', async () => {
  const dateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
  const dateProperties = new Set(['dateCreated', 'dateModified', 'datePublished']);
  for (const file of ['index.html', 'fiyat-hesaplayici/index.html', 'kktc-web-tasarim/index.html']) {
    const html = await fs.readFile(path.join(root, 'public', file), 'utf8');
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    let datesChecked = 0;
    function checkDates(value) {
      if (!value || typeof value !== 'object') return;
      for (const [property, entry] of Object.entries(value)) {
        if (dateProperties.has(property)) {
          assert.match(entry, dateTime, `${file}: ${property} saat ve saat dilimi içermeli.`);
          assert.ok(Number.isFinite(Date.parse(entry)), `${file}: ${property} geçerli bir tarih olmalı.`);
          datesChecked++;
        } else checkDates(entry);
      }
    }
    checkDates(schema);
    assert.ok(datesChecked > 0, `${file}: şema tarihi kontrol edilmeli.`);
  }
});
