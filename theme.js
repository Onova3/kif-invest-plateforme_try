// Light or dark mode: follows the device, unless the visitor chooses. Runs before paint to avoid a flash.
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("kif-theme"); } catch (e) {}
  if (saved === "dark" || saved === "light") root.dataset.theme = saved;
  function isDark() {
    return root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  }
  document.addEventListener("DOMContentLoaded", function () {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "bascule";
    function label() {
      var dark = isDark();
      b.textContent = dark ? "Mode clair" : "Mode sombre";
      b.setAttribute("aria-pressed", String(dark));
    }
    b.addEventListener("click", function () {
      root.dataset.theme = isDark() ? "light" : "dark";
      try { localStorage.setItem("kif-theme", root.dataset.theme); } catch (e) {}
      label();
    });
    label();
    document.body.appendChild(b);
  });
})();
