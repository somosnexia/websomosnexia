(function () {
  "use strict";

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function reveal(el) {
    el.classList.add("nexia-in-view");
    if (!el.classList.contains("nexia-stagger")) return;

    var items = Array.prototype.slice.call(el.children);
    items.forEach(function (item, i) {
      if (reducedMotion) {
        item.classList.add("nexia-in-view");
        return;
      }
      setTimeout(function () {
        item.classList.add("nexia-in-view");
      }, i * 90);
    });
  }

  function boot() {
    var targets = document.querySelectorAll(
      ".nexia-reveal:not(.nexia-observed)"
    );
    if (!targets.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      el.classList.add("nexia-observed");
      observer.observe(el);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  window.addEventListener("elementor/frontend/init", boot);
  document.addEventListener("elementor/popup/show", boot);
})();
