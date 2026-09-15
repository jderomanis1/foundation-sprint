// Minimal Node smoke test for theme toggle helpers (no DOM framework).
function nextTheme(current) {
  return current === "dark" ? "light" : "dark";
}
let failed = 0;
function assert(cond, msg) { if (!cond) { console.error("FAIL:", msg); failed++; } else { console.log("PASS:", msg); } }
assert(nextTheme("light") === "dark", "light -> dark");
assert(nextTheme("dark") === "light", "dark -> light");
if (failed) process.exit(1);
console.log("OK");
