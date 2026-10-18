// Yalnızca geliştirme aracı; tarayıcıya yeni bir kütüphane yüklenmez.
const fs = require('node:fs/promises');
const path = require('node:path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');

(async () => {
  const root = path.resolve(__dirname, '..');
  for (const name of ['site', 'price-calculator']) {
    const jsPath = path.join(root, 'js', `${name}.js`);
    const js = await fs.readFile(jsPath, 'utf8');
    const result = await minify(js, {
      compress: true,
      // Inline onclick bağlantıları için global fonksiyon adlarını koru.
      mangle: { toplevel: false },
      format: { comments: false }
    });
    await fs.writeFile(path.join(root, 'js', `${name}.min.js`), result.code + '\n');

    const cssPath = path.join(root, 'css', `${name}.css`);
    const css = await fs.readFile(cssPath, 'utf8');
    const output = new CleanCSS({ level: 1, rebase: false }).minify(css);
    if (output.errors.length) throw new Error(output.errors.join('\n'));
    await fs.writeFile(path.join(root, 'css', `${name}.min.css`), output.styles + '\n');
    console.log(`${name}: JS ${Buffer.byteLength(js)} → ${Buffer.byteLength(result.code)} bayt; CSS ${Buffer.byteLength(css)} → ${Buffer.byteLength(output.styles)} bayt`);
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
