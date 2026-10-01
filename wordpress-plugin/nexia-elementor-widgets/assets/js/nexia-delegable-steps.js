(function () {
  "use strict";

  var reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function run(list) {
    var steps = Array.prototype.slice.call(
      list.querySelectorAll(".nexia-delegable-steps__step")
    );
    if (!steps.length) return;

    if (reducedMotion) {
      steps.forEach(function (s) {
        s.classList.add("is-done");
      });
      list.closest(".nexia-delegable-steps").classList.add("is-alldone");
      return;
    }

    var root = list.closest(".nexia-delegable-steps");
    var timer = null;

    function clearSteps() {
      steps.forEach(function (s) {
        s.classList.remove("is-active", "is-done");
      });
      root.classList.remove("is-alldone");
    }

    function tick(idx) {
      if (idx > 0) {
        steps[idx - 1].classList.remove("is-active");
        steps[idx - 1].classList.add("is-done");
      }
      if (idx >= steps.length) {
        root.classList.add("is-alldone");
        timer = setTimeout(function () {
          clearSteps();
          timer = setTimeout(function () {
            tick(0);
          }, 500);
        }, 2800);
        return;
      }
      steps[idx].classList.add("is-active");
      timer = setTimeout(function () {
        tick(idx + 1);
      }, 950);
    }

    timer = setTimeout(function () {
      tick(0);
    }, 600);
  }

  function boot() {
    var lists = document.querySelectorAll(
      ".nexia-delegable-steps__steps:not(.nexia-steps-observed)"
    );
    if (!lists.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            run(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    lists.forEach(function (el) {
      el.classList.add("nexia-steps-observed");
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
