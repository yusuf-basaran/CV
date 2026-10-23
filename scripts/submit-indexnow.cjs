const fs = require('node:fs/promises');
const path = require('node:path');

const origin = 'https://www.yusufbasaran.dev';

function createSubmission(sitemap, key) {
  key = key.trim();
  if (!/^[a-f0-9]{32}$/.test(key)) throw new Error('IndexNow sahiplik anahtarı geçersiz.');
  const urlList = [...sitemap.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(match => match[1].trim());
  if (!urlList.length || urlList.some(value => {
    const url = new URL(value);
    return url.origin !== origin || url.hash || url.search || !url.pathname.endsWith('/');
  })) throw new Error('Sitemap yalnızca ana alan adındaki kalıcı sayfa URL’lerini içermeli.');
  return { host: new URL(origin).hostname, key, keyLocation: `${origin}/indexnow-key.txt`, urlList };
}

async function submitIndexNow({ dryRun = false } = {}) {
  const root = path.resolve(__dirname, '..');
  const [sitemap, key] = await Promise.all([
    fs.readFile(path.join(root, 'sitemap.xml'), 'utf8'),
    fs.readFile(path.join(root, 'indexnow-key.txt'), 'utf8')
  ]);
  const payload = createSubmission(sitemap, key);
  const fetchText = async url => {
    const response = await fetch(url, { signal: AbortSignal.timeout(20000), redirect: 'error' });
    if (response.status !== 200) throw new Error(`${url}: HTTP ${response.status}`);
    return response.text();
  };
  // Canlı yayında doğru sahiplik dosyası ve sayfalar olmadan bildirim yapma.
  if ((await fetchText(payload.keyLocation)).trim() !== payload.key) throw new Error('Canlı IndexNow anahtarı kaynakla eşleşmiyor.');
  for (const url of payload.urlList) {
    const html = await fetchText(url);
    if (!html.includes(`<link rel="canonical" href="${url}">`) || /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
      throw new Error(`${url}: canonical veya indeksleme ayarı uygun değil.`);
    }
  }
  if (dryRun) {
    console.log(`IndexNow kontrolü başarılı: ${payload.urlList.length} URL hazır; bildirim gönderilmedi.`);
    return;
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30000)
  });
  if (![200, 202].includes(response.status)) throw new Error(`IndexNow bildirimi başarısız: HTTP ${response.status}`);
  console.log(`IndexNow: ${payload.urlList.length} URL bildirildi (HTTP ${response.status}). Bu, dizine ekleme veya sıralama garantisi değildir.`);
}

if (require.main === module) {
  submitIndexNow({ dryRun: process.argv.includes('--dry-run') }).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}

module.exports = { createSubmission, submitIndexNow };
