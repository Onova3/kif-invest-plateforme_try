// Scroll reveal, gentle landscape depth and a reading progress bar. Decorative only.
(function () {
  var root = document.documentElement;
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (calm || !("IntersectionObserver" in window)) return;
  root.classList.add("js");

  var targets = document.querySelectorAll("main section, main .tuile, main .carte, main .card, main .action, main > h1, main > p");
  // Once revealed, drop the reveal classes so hover effects work normally.
  function show(el) {
    el.classList.add("vu");
    setTimeout(function () { el.classList.remove("apparait"); el.style.removeProperty("--d"); }, 1300);
  }
  var seen = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { show(e.target); seen.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  targets.forEach(function (el) {
    var siblings = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.setProperty("--d", Math.min(siblings, 4) * 0.08 + "s");
    el.classList.add("apparait");
    seen.observe(el);
  });
  document.querySelectorAll(".frise").forEach(function (f) {
    Array.prototype.forEach.call(f.children, function (li, i) { li.style.setProperty("--n", i); });
    seen.observe(f);
  });

  // Safety net: nothing stays hidden, even if the browser throttles the observer.
  function reveal() {
    document.querySelectorAll(".apparait:not(.vu), .frise:not(.vu)").forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight) show(el);
    });
  }
  setTimeout(reveal, 1500);
  window.addEventListener("scroll", function () { setTimeout(reveal, 400); }, { passive: true });

  var bar = document.createElement("div");
  bar.className = "progression";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  var layers = document.querySelectorAll(".couche");
  var ticking = false;
  function draw() {
    var y = window.scrollY;
    var max = root.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    layers.forEach(function (l) {
      l.style.transform = "translateY(" + y * parseFloat(l.dataset.v) + "px)";
    });
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(draw); }
  }, { passive: true });
  draw();
})();
