/**
 * Lavonne ecosystem — mobile, regular scroll.
 *
 * - Each image zooms out slightly as you scroll past it (eased, so it glides
 *   rather than tracking the finger 1:1).
 * - The rule under each number draws down as its copy scrolls up.
 * - Each text block reveals once when it comes into view: the number and
 *   title words rise out of a mask, the eyebrow's tracking settles, and the
 *   body fades in from a soft blur.
 */
(function () {
  "use strict";

  // How quickly the eased zoom catches up with the scroll position (0–1).
  var EASE = 0.14;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  // Wrap each word of the title in a mask so it can rise into place. Spaces
  // stay as plain text nodes so the line breaks exactly as before.
  function splitWords(el, start) {
    var index = start;

    Array.prototype.slice.call(el.childNodes).forEach(function (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        index = splitWords(node, index);
        return;
      }
      if (node.nodeType !== Node.TEXT_NODE) return;

      var frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach(function (part) {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        var outer = document.createElement("span");
        var inner = document.createElement("span");
        outer.className = "eco-word";
        inner.textContent = part;
        inner.style.setProperty("--i", index + 1); // number goes first, at 0
        outer.appendChild(inner);
        frag.appendChild(outer);
        index += 1;
      });
      node.parentNode.replaceChild(frag, node);
    });

    return index;
  }

  function initEcosystem(root) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    var items = Array.prototype.slice.call(root.querySelectorAll(".eco-item")).map(function (item) {
      return {
        media: item.querySelector(".eco-item__media"),
        img: item.querySelector(".eco-item__media img"),
        text: item.querySelector(".eco-item__text"),
        line: item.querySelector(".eco-item__line"),
        zoom: null,
        visible: true,
      };
    });
    var zoomFrom = parseFloat(getComputedStyle(root).getPropertyValue("--eco-zoom-from")) || 1.14;
    var running = false;

    // --- Text reveal ------------------------------------------------------

    items.forEach(function (item) {
      var title = item.text.querySelector(".eco-item__title");
      var words = title ? splitWords(title, 0) : 0;
      item.text.style.setProperty("--eco-words", words);
    });

    root.classList.add("is-enhanced");

    if ("IntersectionObserver" in window) {
      var revealer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-in");
            revealer.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
      );
      items.forEach(function (item) {
        revealer.observe(item.text);
      });

      // Only animate items that are on (or near) screen.
      var watcher = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            items.forEach(function (item) {
              if (item.media === entry.target || item.text === entry.target) {
                item.visible = entry.isIntersecting;
              }
            });
          });
          requestTick();
        },
        { rootMargin: "25% 0px" }
      );
      items.forEach(function (item) {
        watcher.observe(item.media);
        watcher.observe(item.text);
      });
    } else {
      items.forEach(function (item) {
        item.text.classList.add("is-in");
      });
    }

    // --- Scroll-linked zoom + rule ---------------------------------------

    function tick() {
      running = false;
      if (reduce.matches) return;

      var vh = window.innerHeight;
      var moving = false;

      items.forEach(function (item) {
        if (!item.visible) return;

        // 0 when the image's top enters the bottom of the viewport,
        // 1 when its bottom leaves the top.
        var m = item.media.getBoundingClientRect();
        var p = clamp((vh - m.top) / (vh + m.height), 0, 1);
        var target = zoomFrom - (zoomFrom - 1) * p;

        if (item.zoom === null) item.zoom = target;
        item.zoom += (target - item.zoom) * EASE;
        if (Math.abs(target - item.zoom) < 0.0004) {
          item.zoom = target;
        } else {
          moving = true;
        }
        item.img.style.setProperty("--eco-zoom", item.zoom.toFixed(4));

        // The rule draws from when the copy enters the screen until its
        // bottom is 90% of the way down, so it is complete at rest.
        var t = item.text.getBoundingClientRect();
        var start = vh;
        var end = vh * 0.9 - t.height;
        var line = clamp((start - t.top) / (start - end), 0, 1);
        item.line.style.setProperty("--eco-line", line.toFixed(4));
      });

      if (moving) requestTick();
    }

    function requestTick() {
      if (running) return;
      running = true;
      window.requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    tick();
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
