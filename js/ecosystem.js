/**
 * Lavonne ecosystem — mobile.
 *
 * Same interaction as the live site: the section pins while you scroll
 * through it, each scroll step swaps in the next slide, and the connector
 * after the current number fills as you progress towards the next one.
 */
(function () {
  "use strict";

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function initEcosystem(root) {
    var panel = root.querySelector(".eco__panel");
    var images = Array.prototype.slice.call(root.querySelectorAll(".eco__img"));
    var slides = Array.prototype.slice.call(root.querySelectorAll(".eco__slide"));
    var nums = Array.prototype.slice.call(root.querySelectorAll(".eco__num"));
    var fills = Array.prototype.slice.call(root.querySelectorAll(".eco__connector-fill"));
    var count = slides.length;
    var active = -1;
    var queued = false;

    root.style.setProperty("--eco-count", count);

    // Scroll distance spent on each slide (the track minus the pinned panel).
    function stepSize() {
      return (root.offsetHeight - panel.offsetHeight) / count;
    }

    function setActive(index) {
      active = index;

      slides.forEach(function (slide, i) {
        var on = i === index;
        slide.classList.toggle("is-active", on);
        slide.setAttribute("aria-hidden", on ? "false" : "true");
      });

      images.forEach(function (img, i) {
        img.classList.toggle("is-active", i === index);
      });

      nums.forEach(function (num, i) {
        num.classList.toggle("is-reached", i <= index);
        if (i === index) {
          num.setAttribute("aria-current", "step");
        } else {
          num.removeAttribute("aria-current");
        }
      });
    }

    function update() {
      queued = false;

      var step = stepSize();
      if (step <= 0) return;

      var top = parseFloat(getComputedStyle(panel).top) || 0;
      var scrolled = top - root.getBoundingClientRect().top;
      var progress = clamp(scrolled / step, 0, count);
      var index = Math.min(Math.floor(progress), count - 1);

      fills.forEach(function (fill, i) {
        fill.style.transform = "scaleY(" + clamp(progress - i, 0, 1) + ")";
      });

      if (index !== active) setActive(index);
    }

    function requestUpdate() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    }

    // Tapping a number scrolls to the start of that slide's step.
    nums.forEach(function (num, i) {
      num.addEventListener("click", function () {
        var top = parseFloat(getComputedStyle(panel).top) || 0;
        var trackTop = root.getBoundingClientRect().top + window.pageYOffset - top;
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({
          // +1 lands just inside the step so rounding never shows the previous slide.
          top: trackTop + i * stepSize() + 1,
          behavior: reduce ? "auto" : "smooth",
        });
      });
    });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  function init() {
    var roots = document.querySelectorAll("[data-ecosystem]");
    Array.prototype.forEach.call(roots, initEcosystem);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
