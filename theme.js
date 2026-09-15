(function (root) {
  var KEY = "fs-theme";

  function nextTheme(current) {
    return current === "dark" ? "light" : "dark";
  }

  function normalizeTheme(value) {
    return value === "dark" || value === "light" ? value : "light";
  }

  function readStoredTheme(storage) {
    try {
      return normalizeTheme(storage.getItem(KEY));
    } catch (e) {
      return "light";
    }
  }

  function writeStoredTheme(storage, theme) {
    try {
      storage.setItem(KEY, theme);
    } catch (e) {}
  }

  function applyTheme(doc, btn, statusEl, storage, theme) {
    var t = normalizeTheme(theme);
    doc.documentElement.setAttribute("data-theme", t);
    var dark = t === "dark";
    if (btn) {
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
      btn.textContent = dark ? "Switch to light" : "Switch to dark";
    }
    if (statusEl) {
      statusEl.textContent = "Theme: " + t;
    }
    writeStoredTheme(storage, t);
    return t;
  }

  var api = {
    KEY: KEY,
    nextTheme: nextTheme,
    normalizeTheme: normalizeTheme,
    readStoredTheme: readStoredTheme,
    writeStoredTheme: writeStoredTheme,
    applyTheme: applyTheme
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  } else {
    root.FoundationTheme = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this);
