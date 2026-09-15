(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");
  var status = document.getElementById("theme-status");
  var key = "fs-theme";

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    var dark = theme === "dark";
    btn.setAttribute("aria-pressed", dark ? "true" : "false");
    btn.textContent = dark ? "Switch to light" : "Switch to dark";
    status.textContent = "Theme: " + theme;
    try { localStorage.setItem(key, theme); } catch (e) {}
  }

  var saved = null;
  try { saved = localStorage.getItem(key); } catch (e) {}
  apply(saved === "dark" || saved === "light" ? saved : "light");

  btn.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
  });
})();
