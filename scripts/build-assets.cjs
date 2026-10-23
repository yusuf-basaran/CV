// Yalnızca geliştirme aracı; tarayıcıya yeni bir kütüphane yüklenmez.
const fs = require('node:fs/promises');
const path = require('node:path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');
const { prepareSearchContent } = require('./prepare-search-content.cjs');

(async () => {
  const root = path.resolve(__dirname, '..');
  await prepareSearchContent(root);
  for (const name of ['site', 'price-calculator', 'page-common', 'home-links']) {
    const jsPath = path.join(root, 'js', `${name}.js`);
    const js = await fs.readFile(jsPath, 'utf8');
    const result = await minify(js, {
      compress: true,
      // Inline onclick bağlantıları için global fonksiyon adlarını koru.
      mangle: { toplevel: false },
      format: { comments: false }
    });
    await fs.writeFile(path.join(root, 'js', `${name}.min.js`), result.code + '\n');
    console.log(`${name}: JS ${Buffer.byteLength(js)} → ${Buffer.byteLength(result.code)} bayt`);
  }
  for (const name of ['site', 'price-calculator', 'calculator-page', 'services-page']) {
    const cssPath = path.join(root, 'css', `${name}.css`);
    const css = await fs.readFile(cssPath, 'utf8');
    const output = new CleanCSS({ level: 1, rebase: false }).minify(css);
    if (output.errors.length) throw new Error(output.errors.join('\n'));
    await fs.writeFile(path.join(root, 'css', `${name}.min.css`), output.styles + '\n');
    console.log(`${name}: CSS ${Buffer.byteLength(css)} → ${Buffer.byteLength(output.styles)} bayt`);
  }

  // Vercel'e yalnızca yayın dosyalarını taşı; kaynak ve araçlar dışarıda kalır.
  const publicDir = path.join(root, 'public');
  await fs.rm(publicDir, { recursive: true, force: true });
  const files = [
    'index.html', 'fiyat-hesaplayici/index.html', 'kktc-web-tasarim/index.html', 'profile.jpg', 'profile.webp', 'og-image.jpg', 'favicon.svg',
    'favicon.ico', 'favicon-32x32.png', 'favicon-48x48.png', 'favicon-96x96.png', 'apple-touch-icon.png', 'icon-192.png', 'icon-512.png',
    'robots.txt', 'sitemap.xml', 'site.webmanifest', 'indexnow-key.txt',
    'css/site.min.css', 'css/price-calculator.min.css', 'css/calculator-page.min.css', 'css/services-page.min.css',
    'js/site.min.js', 'js/price-calculator.min.js', 'js/page-common.min.js', 'js/home-links.min.js'
  ];
  for (const file of files) {
    const target = path.join(publicDir, file);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.copyFile(path.join(root, file), target);
  }
  console.log(`public: ${files.length} yayın dosyası hazır`);
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
