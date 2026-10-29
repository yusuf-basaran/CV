const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');

async function browserFixture(initialPreset = 'normal') {
  const source = await fs.readFile(path.join(__dirname, '../js/site-concepts.js'), 'utf8');
  const elements = new Map();
  const storage = new Map();
  let remotePreset = initialPreset;
  const document = {
    documentElement: { dataset: {} }, hidden: false,
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, { hidden: true, textContent: '' });
      return elements.get(id);
    },
    addEventListener() {}, dispatchEvent() {}
  };
  const context = {
    window: { addEventListener() {} }, document,
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    AbortSignal, setInterval() {},
    fetch: async () => ({ ok: true, json: async () => [{ preset: remotePreset }] })
  };
  vm.runInNewContext(source, context);
  const concepts = context.window.SiteConcepts;
  await concepts.load();
  return { concepts, elements, storage, document, remote: value => { remotePreset = value; } };
}

test('Önizleme yayınlanan seçimi veya tarayıcıdaki kaydı değiştirmez; iptal geri döner', async () => {
  const { concepts, storage, document } = await browserFixture('october29');
  concepts.preview('ramazan');
  assert.equal(document.documentElement.dataset.occasionFamily, 'religious');
  assert.equal(concepts.state().preset, 'october29');
  assert.equal(JSON.parse(storage.get('site-concept')).preset, 'october29');
  concepts.cancelPreview();
  assert.equal(document.documentElement.dataset.occasion, 'october29');
});

test('Standart görünüm bayram rengini ve mesajını tamamen kaldırır', async () => {
  const { concepts, elements, document } = await browserFixture('kurban');
  assert.equal(elements.get('occasionBanner').hidden, false);
  assert.equal(elements.get('occasionDecorations').hidden, false);
  concepts.acceptPublished('normal');
  assert.equal(elements.get('occasionBanner').hidden, true);
  for (const id of ['occasionDecorations', 'occasionSymbol', 'occasionFooterMark']) {
    assert.equal(elements.get(id).hidden, true);
    assert.equal(elements.get(id).innerHTML, '');
  }
  assert.equal(document.documentElement.dataset.occasionFamily, undefined);
  assert.equal(document.documentElement.dataset.occasion, undefined);
});

test('Sunucudan tanımsız konsept veya HTML gelirse çalıştırılmaz ve kaydedilmez', async () => {
  const { concepts, document, storage } = await browserFixture('<img src=x onerror=alert(1)>');
  assert.equal(concepts.state().ready, false);
  assert.equal(concepts.state().preset, 'normal');
  assert.equal(document.documentElement.dataset.occasionFamily, undefined);
  assert.equal(storage.has('site-concept'), false);
});

test('SQL kısıtı, arayüzdeki tüm konseptleri kapsar', async () => {
  const { concepts } = await browserFixture();
  const sql = await fs.readFile(path.join(__dirname, '../sql/site-concepts.sql'), 'utf8');
  const values = sql.match(/check \(preset in \(([^)]+)\)\)/)[1].match(/'([^']+)'/g).map(value => value.slice(1, -1));
  assert.deepEqual(Array.from(concepts.presets, preset => preset.id), values);
});
