const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const vm = require('node:vm');

async function browserFixture(initialPreset = 'normal', options = {}) {
  const source = await fs.readFile(path.join(__dirname, '../js/site-concepts.js'), 'utf8');
  const elements = new Map();
  const storage = new Map(options.cached ? [['site-concept', JSON.stringify(options.cached)]] : []);
  const listeners = {};
  const windowListeners = {};
  const timers = new Map();
  let now = Date.parse(options.now || '2026-01-05T12:00:00+03:00');
  let remoteUpdatedAt = options.updatedAt === undefined ? new Date(now).toISOString() : options.updatedAt;
  let offline = options.offline || false;
  let remotePreset = initialPreset;
  class ClockDate extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
    static now() { return now; }
  }
  const document = {
    documentElement: { dataset: {} }, hidden: false,
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, { hidden: true, textContent: '' });
      return elements.get(id);
    },
    addEventListener(type, callback) { listeners[type] = callback; }, dispatchEvent() {}
  };
  const context = {
    window: { addEventListener(type, callback) { windowListeners[type] = callback; } }, document, Date: ClockDate,
    localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    AbortSignal, setInterval() {},
    setTimeout(callback, delay) { const id = {}; timers.set(id, { callback, at: now + delay }); return id; },
    clearTimeout(id) { timers.delete(id); },
    fetch: async () => { if (offline) throw new Error('offline'); return { ok: true, json: async () => [{ preset: remotePreset, updated_at: remoteUpdatedAt }] }; }
  };
  vm.runInNewContext(source, context);
  const concepts = context.window.SiteConcepts;
  await concepts.load();
  return {
    concepts, elements, storage, document,
    timestamp: () => new Date(now).toISOString(),
    remote: (value, timestamp = new Date(now).toISOString()) => { remotePreset = value; remoteUpdatedAt = timestamp; },
    offline: value => { offline = value; },
    async advance(timestamp) {
      now = Date.parse(timestamp);
      for (const [id, timer] of [...timers]) if (timer.at <= now) { timers.delete(id); timer.callback(); }
    },
    visibility: () => listeners.visibilitychange(),
    storageEvent: cached => windowListeners.storage({key: 'site-concept', newValue: JSON.stringify(cached)})
  };
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
  concepts.acceptPublished('normal', '2026-01-05T09:00:00Z');
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
  assert.equal(concepts.state().preset, 'auto');
  assert.equal(document.documentElement.dataset.occasionFamily, undefined);
  assert.equal(storage.has('site-concept'), false);
});

test('SQL kısıtı, arayüzdeki tüm konseptleri kapsar', async () => {
  const { concepts } = await browserFixture();
  const sql = await fs.readFile(path.join(__dirname, '../sql/site-concepts.sql'), 'utf8');
  const values = sql.match(/check \(preset in \(([^)]+)\)\)/)[1].match(/'([^']+)'/g).map(value => value.slice(1, -1));
  assert.deepEqual(Array.from(concepts.presets, preset => preset.id), values);
});

test('Anma konseptleri sunucudan yüklenir ve kutlama süsleri yerine kurdele gösterir', async () => {
  for (const id of ['memorial', 'november10', 'march18']) {
    const { concepts, elements, document, storage } = await browserFixture(id);
    assert.equal(concepts.state().ready, true);
    assert.equal(document.documentElement.dataset.occasionFamily, 'remembrance');
    assert.equal(document.documentElement.dataset.occasion, id);
    assert.equal(elements.get('occasionBanner').hidden, false);
    assert.match(elements.get('occasionTitle').textContent, /anıyoruz/);
    assert.doesNotMatch(elements.get('occasionTitle').textContent, /kutlu/);
    assert.match(elements.get('occasionSymbol').innerHTML, /#18181b/);
    assert.doesNotMatch(elements.get('occasionDecorations').innerHTML, /data-occasion-flag/);
    assert.equal(JSON.parse(storage.get('site-concept')).preset, id);
    if (id === 'november10') {
      assert.match(elements.get('occasionMessage').textContent, /09\.05/);
      assert.match(elements.get('occasionDecorations').innerHTML, /1881 — 1938/);
    }
    concepts.acceptPublished('normal', '2026-01-05T09:00:00Z');
    assert.equal(elements.get('occasionBanner').hidden, true);
    assert.equal(elements.get('occasionSymbol').innerHTML, '');
    assert.equal(document.documentElement.dataset.occasionFamily, undefined);
  }
});

test('Bayramdan anma önizlemesine geçiş iptal edilir; yayınlanan anma sonraki okumada korunur', async () => {
  const { concepts, elements, storage, document, remote } = await browserFixture('october29');
  concepts.preview('november10');
  assert.match(elements.get('occasionSymbol').innerHTML, /#18181b/);
  assert.equal(JSON.parse(storage.get('site-concept')).preset, 'october29');
  concepts.cancelPreview();
  assert.equal(document.documentElement.dataset.occasionFamily, 'national');
  assert.match(elements.get('occasionSymbol').innerHTML, /data-occasion-flag="tr"/);
  concepts.acceptPublished('november10', '2026-01-05T09:00:00Z');
  remote('november10');
  await concepts.load();
  assert.equal(concepts.state().preset, 'november10');
  assert.equal(document.documentElement.dataset.occasionFamily, 'remembrance');
  assert.equal(elements.get('occasionPreview').hidden, true);
});

test('10 Kasım Türkiye saatinde açılır, iki gün kalır ve açık sayfada çevrimdışı kapanır', async () => {
  const fixture = await browserFixture('auto', {now: '2026-11-09T20:59:59.999Z'});
  assert.equal(fixture.concepts.state().effectivePreset, 'normal');
  fixture.offline(true);
  await fixture.advance('2026-11-09T21:00:00.000Z');
  assert.equal(fixture.document.documentElement.dataset.occasion, 'november10');
  assert.equal(fixture.concepts.state().expiresAt, Date.parse('2026-11-12T00:00:00+03:00'));
  await fixture.advance('2026-11-11T20:59:59.999Z');
  assert.equal(fixture.concepts.state().effectivePreset, 'november10');
  await fixture.advance('2026-11-11T21:00:00.000Z');
  assert.equal(fixture.concepts.state().effectivePreset, 'normal');
  assert.equal(fixture.elements.get('occasionBanner').hidden, true);
  assert.equal(fixture.elements.get('occasionSymbol').innerHTML, '');
  assert.equal(fixture.document.documentElement.dataset.occasionFamily, undefined);
  await fixture.concepts.load();
  assert.equal(fixture.concepts.state().ready, false);
  assert.equal(fixture.elements.get('occasionBanner').hidden, true);
});

test('Bütün sabit tarihli bayram ve anmalar her yıl yalnızca iki gün gösterilir', async () => {
  const dates = [['march18','03-18'],['april23','04-23'],['may19','05-19'],['july20','07-20'],['august30','08-30'],['october29','10-29'],['november10','11-10'],['november15','11-15']];
  for (const year of [2026, 2027, 2028, 2031]) for (const [preset, date] of dates) {
    const start = Date.parse(`${year}-${date}T00:00:00+03:00`);
    const fixture = await browserFixture('auto', {now: new Date(start).toISOString()});
    assert.equal(fixture.concepts.state().effectivePreset, preset, `${year} ${preset}`);
    await fixture.advance(new Date(start + 48 * 60 * 60 * 1000 - 1).toISOString());
    assert.equal(fixture.concepts.state().effectivePreset, preset);
    await fixture.advance(new Date(start + 48 * 60 * 60 * 1000).toISOString());
    // 2026'da 18 Mart bittiği anda Ramazan Bayramı başlar.
    assert.equal(fixture.concepts.state().effectivePreset, year === 2026 && preset === 'march18' ? 'ramazan' : 'normal');
  }
});

test('Dinî bayramlar 2026–2030 Diyanet tarihlerinde başlar; yıl bazında değişir', async () => {
  for (const [year, ramazan, kurban] of [[2026,'03-20','05-27'],[2027,'03-09','05-16'],[2028,'02-26','05-05'],[2029,'02-14','04-24'],[2030,'02-04','04-13']]) {
    for (const [preset, date] of [['ramazan',ramazan],['kurban',kurban]]) {
      const start = Date.parse(`${year}-${date}T00:00:00+03:00`);
      const fixture = await browserFixture('auto', {now: new Date(start).toISOString()});
      assert.equal(fixture.concepts.state().effectivePreset, preset);
      await fixture.advance(new Date(start + 48 * 60 * 60 * 1000).toISOString());
      assert.equal(fixture.concepts.state().effectivePreset, 'normal');
    }
  }
});

test('Elle yayınlanan seçim sunucu zamanından 48 saat sonra biter; tekrar okuma süreyi uzatmaz', async () => {
  const fixture = await browserFixture('memorial');
  fixture.remote('memorial', fixture.timestamp());
  await fixture.advance('2026-01-07T11:59:59.999+03:00');
  await fixture.concepts.load();
  assert.equal(fixture.concepts.state().effectivePreset, 'memorial');
  await fixture.advance('2026-01-07T12:00:00+03:00');
  assert.equal(fixture.concepts.state().preset, 'auto');
  assert.equal(fixture.concepts.state().effectivePreset, 'normal');
  await fixture.concepts.load();
  assert.equal(fixture.elements.get('occasionBanner').hidden, true);
});

test('Eski veya tarihsiz önbellek, eski sunucu seçimi ve ağ kesintisi otomatik takvimi engellemez', async () => {
  for (const updatedAt of [undefined, null, 'geçersiz', '2026-10-01T12:00:00Z', '2027-01-01T12:00:00Z']) {
    const fixture = await browserFixture('october29', {
      now: '2026-11-10T12:00:00+03:00', offline: true,
      cached: {preset: 'october29', updatedAt, savedAt: Date.parse('2026-11-10T09:00:00Z')}
    });
    assert.equal(fixture.document.documentElement.dataset.occasion, 'november10');
    fixture.offline(false);
    fixture.remote('october29', updatedAt === undefined ? null : updatedAt);
    await fixture.concepts.load();
    assert.equal(fixture.concepts.state().effectivePreset, 'november10');
  }
});

test('İki günlük sınır önizlemeyi bozmaz; iptal, sekmeye dönüş ve depolama olayı güncel takvimi uygular', async () => {
  const fixture = await browserFixture('auto', {now: '2026-11-11T23:59:59+03:00'});
  fixture.concepts.preview('ramazan');
  await fixture.advance('2026-11-12T00:00:00+03:00');
  assert.equal(fixture.document.documentElement.dataset.occasion, 'ramazan');
  fixture.concepts.cancelPreview();
  assert.equal(fixture.elements.get('occasionBanner').hidden, true);
  fixture.storageEvent({preset:'memorial', updatedAt: fixture.timestamp()});
  assert.equal(fixture.document.documentElement.dataset.occasion, 'memorial');
  fixture.remote('auto');
  fixture.storageEvent({preset:'auto', updatedAt: fixture.timestamp()});
  assert.equal(fixture.elements.get('occasionBanner').hidden, true);
  await fixture.advance('2027-11-10T10:00:00+03:00');
  fixture.visibility();
  assert.equal(fixture.document.documentElement.dataset.occasion, 'november10');
});

test('Çakışan tarihlerde yeni başlayan gün önceliklidir; elle seçimin bitmesi takvimi geri getirir', async () => {
  const fixture = await browserFixture('auto', {now:'2029-04-23T12:00:00+03:00'});
  assert.equal(fixture.concepts.state().effectivePreset, 'april23');
  await fixture.advance('2029-04-24T00:00:00+03:00');
  assert.equal(fixture.concepts.state().effectivePreset, 'kurban');
  const manual = await browserFixture('memorial', {now:'2026-11-10T12:00:00+03:00',updatedAt:'2026-11-08T12:00:01+03:00'});
  assert.equal(manual.concepts.state().effectivePreset, 'memorial');
  await manual.advance('2026-11-10T12:00:01+03:00');
  assert.equal(manual.concepts.state().effectivePreset, 'november10');
  await manual.advance('2026-11-12T00:00:00+03:00');
  assert.equal(manual.elements.get('occasionBanner').hidden, true);
});
