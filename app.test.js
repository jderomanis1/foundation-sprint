const assert = require("assert");
const T = require("./theme.js");

function memoryStorage() {
  const data = {};
  return {
    getItem(k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
    setItem(k, v) { data[k] = String(v); },
    _data: data
  };
}

function fakeDoc() {
  const attrs = {};
  return {
    documentElement: {
      setAttribute(name, value) { attrs[name] = value; },
      getAttribute(name) { return attrs[name] || null; }
    }
  };
}

function fakeEl() {
  return { textContent: "", attrs: {}, setAttribute(k, v) { this.attrs[k] = v; } };
}

let failed = 0;
function check(name, fn) {
  try {
    fn();
    console.log("PASS:", name);
  } catch (e) {
    failed++;
    console.error("FAIL:", name, e.message);
  }
}

check("nextTheme light -> dark", () => assert.strictEqual(T.nextTheme("light"), "dark"));
check("nextTheme dark -> light", () => assert.strictEqual(T.nextTheme("dark"), "light"));
check("normalize invalid -> light", () => assert.strictEqual(T.normalizeTheme("nope"), "light"));
check("localStorage round-trip", () => {
  const s = memoryStorage();
  T.writeStoredTheme(s, "dark");
  assert.strictEqual(T.readStoredTheme(s), "dark");
});
check("invalid stored falls back to light", () => {
  const s = memoryStorage();
  s.setItem(T.KEY, "purple");
  assert.strictEqual(T.readStoredTheme(s), "light");
});
check("applyTheme sets DOM + storage", () => {
  const doc = fakeDoc();
  const btn = fakeEl();
  const status = fakeEl();
  const s = memoryStorage();
  T.applyTheme(doc, btn, status, s, "dark");
  assert.strictEqual(doc.documentElement.getAttribute("data-theme"), "dark");
  assert.strictEqual(btn.attrs["aria-pressed"], "true");
  assert.strictEqual(btn.textContent, "Switch to light");
  assert.strictEqual(status.textContent, "Theme: dark");
  assert.strictEqual(s.getItem(T.KEY), "dark");
});

if (failed) process.exit(1);
console.log("OK");
