(function () {
  var T = window.FoundationTheme;
  var btn = document.getElementById("theme-toggle");
  var status = document.getElementById("theme-status");

  T.applyTheme(
    document,
    btn,
    status,
    localStorage,
    T.readStoredTheme(localStorage)
  );

  if (!btn) return;

  btn.addEventListener("click", function () {
    var current = document.documentElement.getAttribute("data-theme");
    T.applyTheme(document, btn, status, localStorage, T.nextTheme(current));
  });
})();
